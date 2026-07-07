export const lesson1103 = {
  "id": "11.3",
  "moduleId": "m11",
  "order": 3,
  "title": "Rota default, gateway de último recurso e falhas de saída",
  "subtitle": "Como diagnosticar default route ausente, gateway errado, split tunnel, Internet quebrada e tráfego privado indo pelo caminho indevido.",
  "duration": "105-145 min",
  "estimatedStudyTimeMinutes": 145,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 245,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "rota default",
    "gateway",
    "0.0.0.0/0",
    "next hop",
    "firewall",
    "cloud",
    "troubleshooting",
    "segurança",
    "devsecops",
    "default route",
    "gateway de último recurso",
    "split tunnel",
    "internet gateway",
    "nat gateway"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.1",
      "reason": "A aula 11.1 explica por que roteamento existe, gateway, next hop, roteamento entre redes e rota de retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "reason": "A aula 11.2 ensina tabela de rotas e longest prefix match, base necessária para entender por que 0.0.0.0/0 só vence quando nada mais específico existe."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Gateway padrão no host é a manifestação prática da rota default em estações e servidores."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "O entendimento de prefixos e CIDR é indispensável para interpretar a rota 0.0.0.0/0."
    }
  ],
  "objectives": [
    "Explicar o que é uma rota padrão e por que ela usa o prefixo 0.0.0.0/0.",
    "Diferenciar rota default, gateway padrão, gateway de último recurso, rota específica e next hop.",
    "Aplicar longest prefix match para demonstrar por que a rota default é a opção menos específica.",
    "Interpretar rota default em Windows, Linux, Cisco IOS, firewalls e cloud route tables.",
    "Identificar problemas causados por ausência de rota default, rota default errada, múltiplas rotas default e falta de rota de retorno.",
    "Relacionar rota default com segurança, saída para Internet, NAT, inspeção, exfiltração, cloud e DevSecOps."
  ],
  "learningOutcomes": [
    "Dado um host com rota default, o aluno explica para onde destinos desconhecidos serão enviados.",
    "Dada uma tabela com rotas específicas e 0.0.0.0/0, o aluno escolhe corretamente a rota usada para cada destino.",
    "Dado um problema de conectividade para Internet, o aluno verifica IP, máscara, gateway, ARP, rota default, DNS e firewall sem confundir sintomas.",
    "Dado um desenho cloud, o aluno diferencia rota default para Internet Gateway, NAT Gateway, firewall e VPN.",
    "Dada uma alteração de IaC, o aluno identifica risco de rota default indevida ou saída sem inspeção."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Até agora você aprendeu que uma tabela de rotas pode conter vários caminhos e que o equipamento escolhe a rota mais específica. Mas uma rede real também precisa responder a uma pergunta muito prática: para onde enviar um pacote quando não existe nenhuma rota específica para o destino?</p><p>Quando você acessa um site na Internet, o seu computador normalmente não possui uma rota individual para aquele servidor. Ele não sabe uma rota específica para cada IP público do mundo. Em vez disso, ele usa uma rota genérica: <code>0.0.0.0/0</code>. Essa é a rota padrão, também chamada em muitos contextos de gateway de último recurso.</p><div class=\"callout callout--problem\"><strong>Ideia central:</strong> a rota default não é a rota mais forte. Ela é a rota mais genérica. Ela só é usada quando nenhuma rota mais específica combina com o destino.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>À medida que redes IP cresceram, tornou-se inviável configurar em cada host uma rota para todas as redes possíveis. A rota default surgiu como uma forma simples de dizer: se você não conhece o destino, entregue a um equipamento mais preparado para decidir.</p><p>Em redes domésticas, esse equipamento costuma ser o roteador do provedor. Em empresas, pode ser um firewall, roteador de borda, proxy, SD-WAN, core de rede ou appliance de segurança. Em cloud, pode ser um NAT Gateway, Internet Gateway, firewall gerenciado, Transit Gateway, VPN Gateway ou rota para peering.</p><p>A ideia permaneceu simples ao longo do tempo, mas o impacto operacional cresceu. Uma rota default errada pode deixar uma empresa sem Internet, expor workloads privados, quebrar VPNs, causar caminho assimétrico ou desviar tráfego que deveria passar por inspeção.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>Sem rota default, um dispositivo só consegue alcançar redes diretamente conectadas ou destinos para os quais exista uma rota explícita. Isso pode ser suficiente para um roteador interno muito restrito, mas não para um notebook, servidor, firewall de borda ou subnet de cloud que precise acessar muitos destinos externos.</p><p>Por outro lado, uma rota default ampla demais também é perigosa. Ela pode enviar tráfego sensível para a Internet, contornar firewall, permitir exfiltração, criar saída não monitorada ou mascarar ausência de rotas específicas.</p><div class=\"callout callout--warning\"><strong>Erro comum:</strong> diagnosticar “sem Internet” como problema de DNS antes de verificar se existe rota default e se o gateway responde na rede local.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><p>A rota default evoluiu de uma configuração simples em hosts para um elemento central de arquitetura. Hoje ela aparece em sistemas operacionais, roteadores, firewalls, roteamento dinâmico, cloud, Kubernetes, VPNs e infraestrutura como código.</p><table class=\"data-table\"><thead><tr><th>Contexto</th><th>Rota default típica</th><th>Cuidado principal</th></tr></thead><tbody><tr><td>Rede doméstica</td><td><code>0.0.0.0/0 via 192.168.1.1</code></td><td>Gateway precisa estar ativo e no mesmo enlace</td></tr><tr><td>Servidor corporativo</td><td>Firewall ou roteador de segmento</td><td>Saída deve passar por inspeção</td></tr><tr><td>Subnet privada cloud</td><td>NAT Gateway ou firewall</td><td>Evitar exposição pública direta</td></tr><tr><td>Subnet pública cloud</td><td>Internet Gateway</td><td>Combinar com firewall/security group</td></tr><tr><td>Roteador interno</td><td>Core, borda ou SD-WAN</td><td>Evitar loops e caminhos assimétricos</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p><strong>Rota padrão</strong> é uma rota que combina com qualquer destino IPv4. Em CIDR, ela é representada por <code>0.0.0.0/0</code>. O prefixo <code>/0</code> significa que nenhum bit do destino precisa coincidir; portanto, todos os endereços IPv4 combinam com essa rota.</p><div class=\"definition-box\"><strong>Gateway de último recurso:</strong> nome comum para o próximo salto usado quando a tabela de rotas não possui nenhuma rota mais específica para o destino.</div><p>É importante separar termos. A rota default é a entrada <code>0.0.0.0/0</code>. O gateway padrão é o next hop dessa rota em um host. O next hop é o equipamento para onde o pacote será enviado. A interface de saída é por onde o frame sairá depois que a decisão de rota for feita.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><ol class=\"flow-list\"><li>Uma aplicação tenta se comunicar com um IPv4 de destino.</li><li>O sistema consulta a tabela de rotas.</li><li>Primeiro procura rotas específicas, como <code>10.10.20.0/24</code>, <code>172.16.0.0/16</code> ou <code>192.168.1.0/24</code>.</li><li>Se alguma rota mais específica combina, ela vence por longest prefix match.</li><li>Se nenhuma rota específica combina, o sistema verifica se existe <code>0.0.0.0/0</code>.</li><li>Se existir, o pacote é enviado ao next hop da rota default.</li><li>Se o next hop estiver na rede local, o host usa ARP para descobrir o MAC do gateway.</li><li>O frame Ethernet sai com MAC de destino do gateway, mas o IP de destino continua sendo o destino final.</li><li>O gateway recebe o pacote e consulta a própria tabela de rotas.</li><li>Se não existir rota default nem rota específica, o pacote é descartado ou gera erro ICMP, dependendo do cenário.</li></ol><div class=\"callout callout--security\"><strong>Detalhe defensivo:</strong> a rota default cria alcance. Firewall, proxy, NAT, EDR, IDS, DNS filtering e logs determinam se esse alcance será controlado.</div></section><section class=\"lesson-section lesson-section--internals\"><h2>P1-08 — Default route não é “a rota principal”</h2>\n    <p>A rota default, representada por <code>0.0.0.0/0</code>, é o caminho usado quando nenhuma rota mais específica se aplica. Ela é essencial para acesso à Internet e destinos desconhecidos, mas é perigoso tratá-la como uma solução universal.</p>\n    <p>Em troubleshooting, a pergunta correta não é “existe gateway?”. A pergunta correta é: para este destino específico, existe rota mais específica? Se não existe, a default deve ser usada? O gateway default sabe encaminhar esse destino? O retorno existe? A política permite?</p>\n    <div class=\"callout callout--warning\"><strong>Armadilha comum:</strong> adicionar default route em um servidor para resolver acesso pontual. Isso pode desviar tráfego sensível para Internet, firewall errado ou NAT não monitorado.</div>\n  </section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Em uma arquitetura bem desenhada, a rota default não é colocada automaticamente em todos os lugares. Ela deve ser coerente com a função do segmento. Uma estação de trabalho normalmente precisa de rota default para sair da LAN. Um servidor em uma DMZ pode precisar de default para firewall. Um banco de dados privado talvez não deva ter default para Internet, mas apenas rotas específicas para aplicação, backup, monitoramento e administração.</p><table class=\"comparison-table\"><thead><tr><th>Elemento</th><th>Rota default comum</th><th>Quando usar com cuidado</th></tr></thead><tbody><tr><td>Host usuário</td><td>Gateway da VLAN</td><td>Redes com captive portal, proxy ou NAC</td></tr><tr><td>Servidor interno</td><td>Firewall interno</td><td>Ambientes que exigem egress control</td></tr><tr><td>Banco de dados</td><td>Frequentemente sem Internet direta</td><td>Evitar exfiltração e acesso indevido</td></tr><tr><td>Subnet pública</td><td>Internet Gateway</td><td>Exposição pública precisa ser intencional</td></tr><tr><td>Subnet privada</td><td>NAT Gateway ou firewall</td><td>Saída precisa ser monitorada</td></tr></tbody></table></section><section class=\"lesson-section lesson-section--architecture\"><h2>Onde a rota default aparece</h2>\n    <table class=\"comparison-table\"><thead><tr><th>Ambiente</th><th>Default típica</th><th>Uso correto</th><th>Risco</th></tr></thead><tbody>\n      <tr><td>Host doméstico</td><td><code>0.0.0.0/0 via roteador Wi-Fi</code></td><td>Acesso geral à Internet</td><td>Gateway errado quebra tudo fora da LAN</td></tr>\n      <tr><td>Servidor corporativo</td><td>Firewall ou roteador de borda</td><td>Saída controlada e logs</td><td>Bypass de proxy/firewall</td></tr>\n      <tr><td>VPN split tunnel</td><td>Default local + rotas privadas via túnel</td><td>Evitar enviar toda Internet pela VPN</td><td>Rota privada ausente vaza tentativa pelo caminho errado</td></tr>\n      <tr><td>Cloud subnet privada</td><td>NAT Gateway ou firewall</td><td>Atualizações e APIs externas sem expor entrada</td><td>Custo e saída sem inspeção se apontar para alvo errado</td></tr>\n    </tbody></table>\n  </section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em uma empresa grande com vários departamentos. Para salas conhecidas, você recebe instruções específicas: financeiro fica no terceiro andar, segurança no segundo, datacenter na sala técnica. Mas se você precisa entregar algo para um destino que ninguém conhece, existe uma recepção central: entregue lá, e a recepção decide o próximo passo.</p><p>A rota default é essa recepção. Ela não é o destino final e não conhece necessariamente tudo no primeiro momento, mas é o próximo lugar para onde enviar o que você não sabe encaminhar localmente.</p><div class=\"callout\"><strong>Limite da analogia:</strong> em redes, cada recepção também possui sua própria tabela de rotas. Se ela também não souber para onde enviar e não tiver rota default, a entrega falha.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Um notebook possui IP <code>192.168.1.50/24</code> e gateway <code>192.168.1.1</code>. A tabela contém uma rota local para <code>192.168.1.0/24</code> e uma rota default para <code>0.0.0.0/0 via 192.168.1.1</code>.</p><p>Se o notebook acessa <code>192.168.1.80</code>, usa a rota local e faz ARP para o próprio host. Se acessa <code>8.8.8.8</code>, nenhuma rota mais específica existe, então usa a rota default e faz ARP para o gateway <code>192.168.1.1</code>.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Em uma empresa, a VLAN de usuários pode ter default para um firewall de borda. A VLAN de servidores pode ter default para um firewall interno. A rede de backup pode não ter Internet e possuir apenas rotas específicas para storage e monitoramento. A rede de gerência pode ter default para um firewall administrativo com MFA, bastion e logs.</p><p>Esse desenho reduz blast radius. Mesmo que uma máquina seja comprometida, a rota default dela define quais caminhos estão disponíveis antes da aplicação de firewall e controles adicionais. Por isso, roteamento é parte da arquitetura de segurança, não apenas de conectividade.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em cloud, a rota default costuma aparecer em route tables associadas a subnets. Uma subnet pública pode ter <code>0.0.0.0/0 -> Internet Gateway</code>. Uma subnet privada pode ter <code>0.0.0.0/0 -> NAT Gateway</code> para saída sem entrada pública direta. Uma subnet sensível pode ter <code>0.0.0.0/0 -> firewall gerenciado</code> ou não ter rota default para Internet.</p><p>O erro clássico é copiar uma route table pública para uma subnet que deveria ser privada. Outro erro comum é criar <code>0.0.0.0/0</code> para NAT sem logs, sem egress filtering e sem inspeção, permitindo saída ampla de cargas sensíveis.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em IaC, rota default aparece como recurso de route table. Um pull request pode adicionar uma rota <code>0.0.0.0/0</code> para um gateway. Isso parece simples, mas muda profundamente o comportamento de saída de toda a subnet.</p><p>Um pipeline maduro deve validar se a rota default aponta para o controle correto, se a subnet é pública ou privada, se existe inspeção, se a mudança afeta produção, se há tag de dono, se o plano passa por policy as code e se a alteração é refletida em IPAM e documentação.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Do ponto de vista defensivo, a rota default é uma das decisões mais importantes de egress. Ela determina para onde o tráfego desconhecido ou externo será enviado. Em incidentes, analistas frequentemente precisam descobrir se uma máquina comprometida possuía saída para Internet, por qual gateway, com quais logs e com quais filtros.</p><table class=\"risk-table\"><thead><tr><th>Risco</th><th>Sintoma</th><th>Mitigação</th></tr></thead><tbody><tr><td>Default para Internet sem inspeção</td><td>Saída ampla e poucos logs</td><td>Firewall, proxy, NAT com logs e egress filtering</td></tr><tr><td>Default errada</td><td>Sem Internet ou caminho inesperado</td><td>Validar next hop, ARP e route table</td></tr><tr><td>Múltiplas defaults</td><td>Tráfego alterna por interface inesperada</td><td>Métrica, prioridade e desenho documentado</td></tr><tr><td>Sem rota de retorno</td><td>Pacote sai, resposta não volta</td><td>Validar caminho bidirecional</td></tr><tr><td>Default em rede sensível</td><td>Banco ou servidor crítico com saída externa</td><td>Rotas específicas e menor privilégio de rede</td></tr></tbody></table></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2><p>O diagrama mostra que a rota default só é usada quando as rotas específicas não combinam com o destino.</p><svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m11l03-title m11l03-desc\"><title id=\"m11l03-title\">Rota default e gateway de último recurso</title><desc id=\"m11l03-desc\">Host consulta tabela de rotas. Destinos locais usam rota específica. Destinos desconhecidos usam 0.0.0.0/0 para o gateway de último recurso.</desc><defs><marker id=\"m11l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path class=\"svg-flow\" d=\"M0,0 L0,6 L9,3 z\"></path></marker></defs><rect class=\"svg-zone\" x=\"40\" y=\"40\" width=\"900\" height=\"470\" rx=\"18\"></rect><rect class=\"svg-node svg-node--client\" x=\"80\" y=\"210\" width=\"150\" height=\"95\" rx=\"14\"></rect><text class=\"svg-label\" x=\"155\" y=\"245\" text-anchor=\"middle\">Host</text><text class=\"svg-label svg-label--small\" x=\"155\" y=\"270\" text-anchor=\"middle\">192.168.1.50/24</text><rect class=\"svg-node svg-node--router\" x=\"310\" y=\"100\" width=\"300\" height=\"300\" rx=\"14\"></rect><text class=\"svg-label\" x=\"460\" y=\"135\" text-anchor=\"middle\">Tabela de rotas</text><text class=\"svg-label svg-label--small\" x=\"335\" y=\"180\">192.168.1.0/24 → local</text><text class=\"svg-label svg-label--small\" x=\"335\" y=\"225\">10.10.0.0/16 → VPN</text><text class=\"svg-label svg-label--small\" x=\"335\" y=\"270\">172.16.50.0/24 → túnel</text><text class=\"svg-label svg-label--small\" x=\"335\" y=\"315\">0.0.0.0/0 → 192.168.1.1</text><rect class=\"svg-badge\" x=\"500\" y=\"295\" width=\"90\" height=\"34\" rx=\"12\"></rect><text class=\"svg-label svg-label--small\" x=\"545\" y=\"317\" text-anchor=\"middle\">último recurso</text><rect class=\"svg-node svg-node--firewall\" x=\"705\" y=\"120\" width=\"160\" height=\"90\" rx=\"14\"></rect><text class=\"svg-label\" x=\"785\" y=\"155\" text-anchor=\"middle\">Gateway</text><text class=\"svg-label svg-label--small\" x=\"785\" y=\"180\" text-anchor=\"middle\">192.168.1.1</text><rect class=\"svg-node svg-node--cloud\" x=\"705\" y=\"320\" width=\"160\" height=\"90\" rx=\"14\"></rect><text class=\"svg-label\" x=\"785\" y=\"355\" text-anchor=\"middle\">Internet</text><text class=\"svg-label svg-label--small\" x=\"785\" y=\"380\" text-anchor=\"middle\">destinos desconhecidos</text><path class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l03-arrow)\" d=\"M230 255 C260 255 280 255 310 255\"></path><path class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l03-arrow)\" d=\"M610 315 C650 270 675 210 705 170\"></path><path class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l03-arrow)\" d=\"M785 210 C785 250 785 285 785 320\"></path><text class=\"svg-label svg-label--small\" x=\"490\" y=\"455\" text-anchor=\"middle\">Se nenhuma rota específica vencer, 0.0.0.0/0 envia ao gateway padrão.</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>Neste laboratório, você vai identificar a rota default em Windows, Linux e Cisco/Packet Tracer, validar o next hop, testar ARP para o gateway e diferenciar falha de rota default, falha de DNS e falha de aplicação.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios treinam leitura de <code>0.0.0.0/0</code>, escolha por longest prefix match e diagnóstico de conectividade externa.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá três tabelas de rotas com defaults diferentes e deverá explicar qual tráfego sai por qual gateway, onde há risco e como corrigir o desenho.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como validar rota default, next hop, ARP, métrica, rota específica, retorno e controles de segurança.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>A rota default <code>0.0.0.0/0</code> é a rota usada quando nenhuma rota mais específica existe. Ela é essencial para acesso a destinos desconhecidos, mas também é uma decisão crítica de segurança. Um bom diagnóstico verifica rota default, gateway, ARP, DNS, ICMP, firewall, NAT, logs e rota de retorno.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você estudará <strong>rotas estáticas e rotas flutuantes</strong>, entendendo quando configurar caminhos manualmente, como criar contingência e quais riscos surgem em ambientes corporativos.</p></section>"
  },
  "networkContext": {
    "whereItAppears": [
      "notebooks",
      "servidores",
      "roteadores",
      "firewalls",
      "switches camada 3",
      "VPNs",
      "SD-WAN",
      "route tables de cloud",
      "containers",
      "Kubernetes nodes"
    ],
    "dependsOn": [
      "IPv4",
      "CIDR",
      "tabela de rotas",
      "longest prefix match",
      "ARP",
      "gateway",
      "ICMP",
      "NAT",
      "firewall"
    ],
    "doesNotSolve": [
      "autorização",
      "criptografia",
      "DNS",
      "inspeção de conteúdo",
      "proteção contra malware",
      "controle de identidade",
      "rota de retorno automaticamente"
    ]
  },
  "protocolFields": [
    {
      "field": "Destination 0.0.0.0/0",
      "meaning": "Prefixo que combina com qualquer destino IPv4.",
      "securityNote": "Pode criar saída ampla; deve apontar para gateway controlado."
    },
    {
      "field": "Gateway/Next hop",
      "meaning": "Próximo salto para destinos sem rota específica.",
      "securityNote": "Next hop errado pode desviar tráfego, contornar inspeção ou derrubar conectividade."
    },
    {
      "field": "Interface de saída",
      "meaning": "Interface usada para alcançar o next hop.",
      "securityNote": "Múltiplas interfaces podem criar vazamento ou caminho inesperado."
    },
    {
      "field": "Metric/Priority",
      "meaning": "Critério de desempate quando há mais de uma rota default aplicável.",
      "securityNote": "Métrica incorreta pode preferir rede insegura, VPN errada ou link não monitorado."
    },
    {
      "field": "Route source",
      "meaning": "Origem da rota default: manual, DHCP, VPN, protocolo dinâmico ou cloud.",
      "securityNote": "Rotas aprendidas por DHCP/VPN podem alterar o caminho de saída do host."
    },
    {
      "field": "Return path",
      "meaning": "Caminho necessário para que a resposta volte ao emissor.",
      "securityNote": "Sem retorno, o tráfego parece sair, mas a sessão falha ou fica assimétrica."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Aplicação define destino",
      "description": "O host tenta acessar um IP que não pertence à rede local."
    },
    {
      "step": 2,
      "name": "Consulta da tabela",
      "description": "O sistema procura rotas específicas para o destino."
    },
    {
      "step": 3,
      "name": "Nenhuma rota mais específica vence",
      "description": "Como não há correspondência melhor, a rota 0.0.0.0/0 é selecionada."
    },
    {
      "step": 4,
      "name": "Next hop escolhido",
      "description": "O gateway padrão da rota default é identificado."
    },
    {
      "step": 5,
      "name": "ARP para o gateway",
      "description": "O host resolve o MAC do gateway, não o MAC do destino final."
    },
    {
      "step": 6,
      "name": "Encaminhamento",
      "description": "O frame sai para o gateway com IP de destino final preservado."
    },
    {
      "step": 7,
      "name": "Decisão no gateway",
      "description": "O gateway consulta a própria tabela de rotas e continua o encaminhamento."
    },
    {
      "step": 8,
      "name": "Resposta precisa voltar",
      "description": "O destino ou os roteadores intermediários precisam ter caminho de retorno."
    }
  ],
  "deepDive": {
    "title": "Por que 0.0.0.0/0 combina com tudo?",
    "sections": [
      {
        "heading": "CIDR /0",
        "text": "Em CIDR, o número após a barra indica quantos bits do endereço precisam coincidir. Em /0, zero bits precisam coincidir. Logo, qualquer IPv4 pertence a 0.0.0.0/0."
      },
      {
        "heading": "Default não vence rota específica",
        "text": "Se existe 10.0.0.0/8, 10.20.0.0/16 ou 10.20.30.0/24, essas rotas vencem a default para destinos dentro delas."
      },
      {
        "heading": "Múltiplas rotas default",
        "text": "Sistemas podem ter mais de uma default, por exemplo Wi-Fi, cabo e VPN. Métrica, prioridade e política definem qual será usada."
      },
      {
        "heading": "Default em roteadores",
        "text": "Em roteadores Cisco, gateway de último recurso pode aparecer como rota estática default ou rota aprendida dinamicamente. Em ambos os casos, deve ser coerente com o desenho."
      }
    ],
    "operationalImpact": [
      "Default route errada derruba tudo que não é local e pode parecer falha de DNS, proxy ou aplicação.",
      "Ambientes com VPN split tunnel precisam documentar quais prefixos usam túnel e quais usam default local.",
      "Servidores críticos devem ter default route revisada com segurança, observabilidade e dono do caminho."
    ],
    "financialImpact": [
      "Em cloud, default route por NAT Gateway, firewall gerenciado ou appliance de inspeção pode gerar custo por hora e por tráfego.",
      "Default route para caminho inter-região ou link dedicado pode aumentar custo de tráfego sem necessidade.",
      "Falhas de default route aumentam tempo de indisponibilidade e esforço de times de rede, segurança, sistemas e cloud."
    ],
    "securityImpact": [
      "Default route ampla pode permitir saída não monitorada de servidores sensíveis.",
      "Default route errada pode contornar firewall central, proxy corporativo ou inspeção de tráfego.",
      "Em incidentes, default route e NAT de saída ajudam a entender exfiltração, callback e caminho de C2 em análise defensiva."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que rota default é sempre usada primeiro.",
      "impact": "Diagnóstico errado quando uma rota específica está desviando tráfego.",
      "correction": "Aplicar longest prefix match antes de culpar a default."
    },
    {
      "mistake": "Confundir gateway com DNS.",
      "impact": "Trocar DNS não corrige ausência de rota para fora da rede.",
      "correction": "Testar IP externo antes de testar nome."
    },
    {
      "mistake": "Configurar default em subnet sensível sem necessidade.",
      "impact": "Aumenta possibilidade de saída indevida e exfiltração.",
      "correction": "Usar rotas específicas e egress control."
    },
    {
      "mistake": "Ignorar métrica em hosts com VPN.",
      "impact": "Tráfego pode sair pela interface errada.",
      "correction": "Verificar route print, ip route e política da VPN."
    },
    {
      "mistake": "Validar apenas ida.",
      "impact": "O pacote sai, mas a resposta não retorna.",
      "correction": "Validar rota de retorno, firewall stateful e logs."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Sem Internet, mas rede local funciona.",
      "Apenas destinos privados falham com VPN ativa.",
      "Servidor responde internamente, mas não acessa atualizações externas.",
      "Tráfego sai por gateway diferente do desenho.",
      "Cloud subnet privada não acessa repositórios externos."
    ],
    "diagnosticQuestions": [
      "Existe default route?",
      "Ela aponta para gateway alcançável?",
      "Há rota mais específica para o destino?",
      "A VPN injeta ou remove default?",
      "A política de saída permite o fluxo?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "route print | findstr \"0.0.0.0\"",
        "purpose": "Encontrar rota default no Windows.",
        "expectedObservation": "Linhas 0.0.0.0 aparecem com gateway e interface.",
        "interpretation": "Gateway ausente ou métrica inesperada explica falha de saída."
      },
      {
        "platform": "PowerShell",
        "command": "Get-NetRoute -DestinationPrefix 0.0.0.0/0 | Format-Table",
        "purpose": "Ver default route com interface e métrica.",
        "expectedObservation": "DestinationPrefix, NextHop, RouteMetric e InterfaceAlias aparecem.",
        "interpretation": "Compare métricas quando há Wi-Fi, Ethernet e VPN."
      },
      {
        "platform": "Linux",
        "command": "ip route show default",
        "purpose": "Ver rota default no Linux.",
        "expectedObservation": "default via GATEWAY dev INTERFACE.",
        "interpretation": "Sem default, destinos não locais dependem de rotas específicas."
      },
      {
        "platform": "Linux",
        "command": "ip route get 8.8.8.8",
        "purpose": "Ver saída efetiva para Internet.",
        "expectedObservation": "via/dev/src aparecem.",
        "interpretation": "Confirma gateway e endereço de origem usados."
      },
      {
        "platform": "Windows",
        "command": "tracert 8.8.8.8",
        "purpose": "Observar primeiro salto para Internet.",
        "expectedObservation": "Primeiro salto costuma ser gateway default.",
        "interpretation": "Primeiro salto inesperado indica VPN, métrica ou rota diferente."
      },
      {
        "platform": "PowerShell",
        "command": "Test-NetConnection 8.8.8.8 -Port 443 -TraceRoute",
        "purpose": "Separar caminho IP de porta TCP.",
        "expectedObservation": "TraceRoute e TcpTestSucceeded aparecem.",
        "interpretation": "Falha TCP com rota IP pode indicar firewall/proxy."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route 0.0.0.0",
        "purpose": "Ver gateway de último recurso no roteador.",
        "expectedObservation": "Gateway of last resort ou rota S* aparece.",
        "interpretation": "Sem gateway de último recurso, destinos desconhecidos serão descartados."
      },
      {
        "platform": "Cisco IOS",
        "command": "show running-config | include ^ip route 0.0.0.0",
        "purpose": "Localizar default route estática.",
        "expectedObservation": "Linha ip route 0.0.0.0 0.0.0.0 NEXT-HOP aparece.",
        "interpretation": "Confirme se o next hop é alcançável e correto."
      },
      {
        "platform": "Cloud",
        "command": "aws ec2 describe-route-tables --filters Name=route.destination-cidr-block,Values=0.0.0.0/0",
        "purpose": "Auditar default routes em AWS.",
        "expectedObservation": "Rotas 0.0.0.0/0 e targets aparecem.",
        "interpretation": "Verifique se subnet privada aponta para NAT/firewall, não IGW direto."
      }
    ],
    "decisionTree": [
      {
        "if": "Não existe default route e o destino não é local",
        "then": "Adicionar default em laboratório ou criar rota específica conforme desenho."
      },
      {
        "if": "Default existe, mas gateway não responde",
        "then": "Verificar IP/máscara, VLAN, ARP, interface e conectividade local."
      },
      {
        "if": "VPN ativa muda saída",
        "then": "Comparar route print/ip route antes e depois da VPN."
      },
      {
        "if": "Internet falha, mas IP privado funciona",
        "then": "Testar default route, proxy, DNS externo, firewall e NAT."
      },
      {
        "if": "Cloud privada não sai para Internet",
        "then": "Validar route table, NAT/firewall, SG/NACL e custo/limpeza."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar rota default somente quando necessária.",
      "Apontar default de subnets privadas para NAT ou firewall controlado.",
      "Registrar mudanças de rota em IaC, IPAM e CMDB.",
      "Monitorar flow logs, firewall logs e DNS logs para saída externa.",
      "Revisar defaults em hosts com VPN e múltiplas interfaces.",
      "Validar rota de retorno em mudanças de rede.",
      "Aplicar egress filtering em workloads sensíveis."
    ],
    "badPractices": [
      "Colocar 0.0.0.0/0 para Internet Gateway em subnet sensível.",
      "Permitir saída ampla sem logs.",
      "Usar default para mascarar falta de desenho de rotas específicas.",
      "Ignorar caminhos assimétricos.",
      "Copiar route tables entre ambientes sem revisar impacto.",
      "Tratar conectividade como autorização."
    ],
    "vulnerabilities": [
      {
        "name": "exfiltração por saída ampla",
        "description": "Risco relacionado à aula 11.3 — Rota padrão e gateway de último recurso.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "egress firewall"
      },
      {
        "name": "bypass de firewall por rota incorreta",
        "description": "Risco relacionado à aula 11.3 — Rota padrão e gateway de último recurso.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAT com logs"
      },
      {
        "name": "caminho assimétrico quebrando inspeção stateful",
        "description": "Risco relacionado à aula 11.3 — Rota padrão e gateway de último recurso.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "proxy corporativo"
      },
      {
        "name": "rota default maliciosa via DHCP/VPN",
        "description": "Risco relacionado à aula 11.3 — Rota padrão e gateway de último recurso.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DNS filtering"
      },
      {
        "name": "exposição pública acidental em cloud",
        "description": "Risco relacionado à aula 11.3 — Rota padrão e gateway de último recurso.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "flow logs"
      },
      {
        "name": "falta de logs de egress",
        "description": "Risco relacionado à aula 11.3 — Rota padrão e gateway de último recurso.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "policy as code"
      }
    ],
    "mitigations": [
      "egress firewall",
      "NAT com logs",
      "proxy corporativo",
      "DNS filtering",
      "flow logs",
      "policy as code",
      "revisão de rota default em pull request",
      "segmentação por zona",
      "rotas específicas para redes sensíveis",
      "alertas para criação de 0.0.0.0/0"
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
      "egress firewall",
      "NAT com logs",
      "proxy corporativo",
      "DNS filtering",
      "flow logs",
      "policy as code",
      "revisão de rota default em pull request",
      "segmentação por zona",
      "rotas específicas para redes sensíveis",
      "alertas para criação de 0.0.0.0/0"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-11.3",
    "title": "Diagnóstico de rota default, gateway errado e split tunnel",
    "labType": "troubleshooting",
    "objective": "Diagnosticar rota default ausente, gateway errado e influência de VPN/split tunnel usando Windows, Linux, Cisco e cloud.",
    "scenario": "Um usuário acessa a rede local, mas não acessa Internet. Outro usuário, com VPN ativa, acessa Internet, mas não acessa uma rede privada. Você precisa provar se o problema é default route, rota específica, DNS, firewall ou serviço.",
    "topology": "Host Windows/Linux -> gateway local -> Internet; opcional: túnel VPN com rotas privadas e roteador Cisco/Packet Tracer.",
    "architecture": "A rota default é usada para destinos desconhecidos. Rotas privadas mais específicas devem vencer a default quando houver VPN ou rede corporativa.",
    "prerequisites": [
      "11.1 roteamento",
      "11.2 tabela de rotas",
      "4.5 gateway padrão",
      "6.2 portas e sockets"
    ],
    "tools": [
      "Windows",
      "PowerShell",
      "Linux",
      "Cisco Packet Tracer/GNS3 opcional",
      "Cloud CLI opcional"
    ],
    "estimatedTimeMinutes": 65,
    "cost": "zero",
    "safetyNotes": [
      "Não remova a rota default da máquina principal fora de laboratório.",
      "Prefira VM, Packet Tracer ou análise antes/depois.",
      "Não publique rotas internas reais em evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar default no Windows",
        "instruction": "Identifique gateway, interface e métrica.",
        "command": "route print | findstr \"0.0.0.0\"",
        "expectedOutput": "Linha 0.0.0.0/0 com gateway e interface.",
        "explanation": "Confirma se há default route e qual gateway será usado."
      },
      {
        "number": 2,
        "title": "Coletar default no Linux",
        "instruction": "Liste a rota default.",
        "command": "ip route show default",
        "expectedOutput": "default via <gateway> dev <interface>.",
        "explanation": "Sem essa rota, destinos fora das rotas específicas falham."
      },
      {
        "number": 3,
        "title": "Provar saída efetiva",
        "instruction": "Veja qual gateway será usado para Internet.",
        "command": "ip route get 8.8.8.8",
        "expectedOutput": "via/dev/src para o destino.",
        "explanation": "Mostra a decisão real, não apenas a tabela completa."
      },
      {
        "number": 4,
        "title": "Separar rota de DNS",
        "instruction": "Teste IP antes de nome.",
        "command": "ping 8.8.8.8 && nslookup exemplo.com",
        "expectedOutput": "Ping IP e resolução DNS documentados.",
        "explanation": "Se IP funciona e nome falha, o problema é DNS, não default route."
      },
      {
        "number": 5,
        "title": "Testar porta e caminho",
        "instruction": "Teste porta TCP com traceroute aproximado.",
        "command": "Test-NetConnection 8.8.8.8 -Port 443 -TraceRoute",
        "expectedOutput": "TcpTestSucceeded e saltos.",
        "explanation": "Ajuda a separar rota de firewall/proxy."
      },
      {
        "number": 6,
        "title": "Ver default no roteador",
        "instruction": "No Cisco/Packet Tracer, confirme gateway de último recurso.",
        "command": "show ip route 0.0.0.0",
        "expectedOutput": "S* 0.0.0.0/0 ou gateway of last resort.",
        "explanation": "Roteador sem default descarta destinos desconhecidos."
      },
      {
        "number": 7,
        "title": "Comparar antes/depois da VPN",
        "instruction": "Colete rotas antes e depois da VPN/split tunnel.",
        "command": "route print > rotas-antes.txt && route print > rotas-depois-vpn.txt",
        "expectedOutput": "Dois arquivos para comparação.",
        "explanation": "Rotas privadas mais específicas devem aparecer quando a VPN sobe."
      },
      {
        "number": 8,
        "title": "Auditar default em cloud",
        "instruction": "Se usar cloud, liste route tables com 0.0.0.0/0.",
        "command": "aws ec2 describe-route-tables --filters Name=route.destination-cidr-block,Values=0.0.0.0/0",
        "expectedOutput": "Targets como igw, nat, firewall ou transit gateway.",
        "explanation": "Subnets privadas devem evitar saída direta por IGW."
      },
      {
        "number": 9,
        "title": "Produzir RCA",
        "instruction": "Escreva causa, evidência, correção e teste de regressão.",
        "artifact": "RCA sanitizado com quatro seções: sintoma, hipótese descartada, causa raiz e validação.",
        "expectedOutput": "RCA curto e auditável.",
        "explanation": "Roteamento profissional exige evidência e não apenas tentativa."
      }
    ],
    "expectedResult": "O aluno identifica default route, separa rota de DNS/firewall, entende split tunnel e produz RCA com evidência.",
    "validation": [
      {
        "check": "Default route existe",
        "command": "ip route show default || route print | findstr \"0.0.0.0\"",
        "expected": "Gateway default documentado.",
        "ifFails": "Criar rota default apenas em laboratório ou revisar DHCP/gateway."
      },
      {
        "check": "Gateway é alcançável",
        "command": "ping <gateway>",
        "expected": "Resposta ou evidência alternativa de ARP/conectividade.",
        "ifFails": "Verificar VLAN, máscara, cabo, Wi-Fi ou firewall local."
      },
      {
        "check": "DNS separado de rota",
        "command": "ping 8.8.8.8 && nslookup exemplo.com",
        "expected": "Diferença entre IP e nome documentada.",
        "ifFails": "Investigar DNS se IP funciona."
      },
      {
        "check": "VPN/split tunnel documentado",
        "command": "route print",
        "expected": "Rotas privadas específicas ou default via túnel identificadas.",
        "ifFails": "Revisar configuração do cliente VPN."
      },
      {
        "check": "Cloud sem exposição indevida",
        "command": "aws ec2 describe-route-tables",
        "expected": "Target de default coerente com tipo da subnet.",
        "ifFails": "Corrigir associação ou target da route table."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Rede local funciona, Internet não.",
        "probableCause": "Default route ausente ou gateway errado.",
        "howToConfirm": "ip route show default/route print.",
        "fix": "Corrigir DHCP/gateway ou rota default no laboratório."
      },
      {
        "symptom": "Com VPN, rede privada falha.",
        "probableCause": "Rota específica ausente no split tunnel.",
        "howToConfirm": "Comparar rotas antes/depois da VPN.",
        "fix": "Adicionar prefixo privado no túnel."
      },
      {
        "symptom": "IP externo funciona, nome não.",
        "probableCause": "DNS, não rota default.",
        "howToConfirm": "ping IP e nslookup.",
        "fix": "Corrigir resolvedor, split DNS ou política DNS."
      },
      {
        "symptom": "Cloud privada não acessa repositórios.",
        "probableCause": "Route table sem NAT/firewall ou SG/NACL bloqueando.",
        "howToConfirm": "Auditar route table e logs.",
        "fix": "Adicionar NAT/firewall e regra de saída aprovada."
      }
    ],
    "improvements": [
      "Criar variação com duas default routes e métricas diferentes.",
      "Adicionar cenário de proxy corporativo.",
      "Adicionar cloud NAT Gateway com estimativa de custo e limpeza.",
      "Comparar full tunnel e split tunnel."
    ],
    "evidenceToCollect": [
      "route print ou ip route",
      "ip route get 8.8.8.8",
      "traceroute/tracert",
      "Teste DNS vs IP",
      "show ip route 0.0.0.0",
      "comparação antes/depois da VPN",
      "RCA sanitizado"
    ],
    "questions": [
      "Quando a default é usada?",
      "Por que rota mais específica vence a default?",
      "Como default route pode causar bypass de firewall?",
      "Como separar problema de DNS de problema de rota?"
    ],
    "challenge": "Monte dois cenários: um com default route ausente e outro com split tunnel incompleto. Para cada um, indique sintoma, comando de prova, correção e teste de regressão.",
    "solution": "Default ausente quebra destinos sem rota específica. Split tunnel incompleto envia rede privada pelo caminho errado ou default local. A correção deve ser feita com rota adequada, política coerente e validação por comando antes/depois."
  },
  "mentorQuestions": [
    "Se 0.0.0.0/0 combina com tudo, por que ela não vence uma rota /24?",
    "Por que um host faz ARP para o gateway quando acessa um IP público?",
    "Em uma subnet privada de cloud, qual é a diferença prática entre default para NAT Gateway e default para Internet Gateway?"
  ],
  "quiz": [
    {
      "question": "O que representa 0.0.0.0/0 em uma tabela de rotas?",
      "options": [
        "Somente a rede local",
        "Qualquer destino IPv4",
        "Somente endereços privados",
        "Somente o gateway"
      ],
      "answer": 1,
      "explanation": "/0 significa que nenhum bit precisa coincidir, portanto qualquer destino IPv4 combina."
    },
    {
      "question": "Quando a rota default é usada?",
      "options": [
        "Sempre antes das demais",
        "Somente quando nenhuma rota mais específica combina",
        "Somente para DNS",
        "Somente para ARP"
      ],
      "answer": 1,
      "explanation": "Longest prefix match faz rotas específicas vencerem a default."
    },
    {
      "question": "Um host acessa 8.8.8.8 usando gateway 192.168.1.1. Para qual MAC ele envia o primeiro frame?",
      "options": [
        "MAC do 8.8.8.8",
        "MAC do DNS",
        "MAC do gateway 192.168.1.1",
        "Broadcast sempre"
      ],
      "answer": 2,
      "explanation": "Para destino remoto, o host envia o frame ao MAC do gateway."
    },
    {
      "question": "Qual risco existe em uma subnet sensível com default direta para Internet?",
      "options": [
        "Nenhum, porque IP privado é seguro",
        "Exfiltração e saída sem inspeção",
        "ARP deixa de funcionar",
        "DNS fica sempre bloqueado"
      ],
      "answer": 1,
      "explanation": "Rota default para Internet pode permitir saída ampla se não houver controles."
    },
    {
      "question": "Se IP externo responde, mas nomes não resolvem, o problema mais provável é:",
      "options": [
        "Rota default obrigatoriamente errada",
        "DNS ou política de resolução",
        "Máscara sempre errada",
        "Cabo desconectado"
      ],
      "answer": 1,
      "explanation": "Conectividade por IP indica que a rota pode estar funcionando; a falha pode estar em DNS."
    },
    {
      "question": "Em hosts com VPN, por que é importante observar métricas de rotas default?",
      "options": [
        "Porque a métrica pode mudar a interface de saída",
        "Porque métrica define endereço MAC",
        "Porque métrica substitui DNS",
        "Porque métrica desativa ARP"
      ],
      "answer": 0,
      "explanation": "Múltiplas defaults podem existir; métrica/prioridade influencia qual saída será preferida."
    }
  ],
  "flashcards": [
    {
      "front": "O que é rota default?",
      "back": "A rota 0.0.0.0/0 usada quando nenhuma rota mais específica combina com o destino."
    },
    {
      "front": "O que significa /0?",
      "back": "Zero bits de rede precisam coincidir; portanto qualquer IPv4 combina."
    },
    {
      "front": "Rota default vence uma /24?",
      "back": "Não. A /24 é mais específica e vence por longest prefix match."
    },
    {
      "front": "Gateway padrão e rota default são a mesma coisa?",
      "back": "Não exatamente. A rota default é a entrada 0.0.0.0/0; o gateway padrão é o next hop dela em um host."
    },
    {
      "front": "Qual MAC é usado para destino remoto?",
      "back": "O MAC do gateway/next hop local, resolvido via ARP."
    },
    {
      "front": "Qual risco de default em subnet privada sensível?",
      "back": "Saída ampla, exfiltração, bypass de inspeção e aumento do blast radius."
    }
  ],
  "exercises": [
    {
      "title": "Identificando default",
      "prompt": "Em uma tabela com 192.168.10.0/24 local e 0.0.0.0/0 via 192.168.10.1, explique por onde sai um pacote para 1.1.1.1.",
      "expectedAnswer": "Sai pela rota default via 192.168.10.1, pois não há rota mais específica para 1.1.1.1."
    },
    {
      "title": "Longest prefix match",
      "prompt": "Tabela: 10.0.0.0/8 via A, 10.20.0.0/16 via B, 0.0.0.0/0 via C. Qual rota é usada para 10.20.30.40?",
      "expectedAnswer": "10.20.0.0/16 via B, pois é a rota mais específica aplicável."
    },
    {
      "title": "Diagnóstico",
      "prompt": "Gateway responde, 8.8.8.8 responde, mas www.exemplo.com não. Qual é a hipótese inicial?",
      "expectedAnswer": "Problema de DNS, proxy ou política de resolução, não necessariamente rota default."
    },
    {
      "title": "Cloud",
      "prompt": "Explique a diferença entre 0.0.0.0/0 para Internet Gateway e 0.0.0.0/0 para NAT Gateway em uma subnet.",
      "expectedAnswer": "IGW tende a permitir caminho público conforme plataforma e controles; NAT permite saída de subnets privadas sem entrada direta iniciada da Internet."
    },
    {
      "id": "ex11.3.p1.1",
      "type": "diagnóstico",
      "prompt": "Um host pinga o gateway, mas não pinga 8.8.8.8. Liste a primeira evidência de rota que você coletaria.",
      "expectedAnswer": "route print no Windows ou ip route show default/ip route get 8.8.8.8 no Linux.",
      "explanation": "A evidência confirma se existe default route e qual gateway será usado."
    },
    {
      "id": "ex11.3.p1.2",
      "type": "segurança",
      "prompt": "Por que apontar default route de servidor diretamente para Internet pode ser perigoso?",
      "expectedAnswer": "Pode contornar firewall/proxy, reduzir inspeção e permitir saída não monitorada.",
      "explanation": "Default route define caminho de destinos desconhecidos e afeta controles de segurança."
    }
  ],
  "challenge": {
    "title": "Auditoria de rota default",
    "scenario": "Você recebeu três segmentos: usuários, servidores de aplicação e banco de dados. Todos possuem rota default para Internet via firewall. A equipe de segurança suspeita que o banco não deveria ter saída ampla.",
    "tasks": [
      "Definir se cada segmento precisa de rota default.",
      "Indicar para onde a default deve apontar quando existir.",
      "Propor rotas específicas para o banco.",
      "Listar logs e controles mínimos de egress.",
      "Explicar como validar rota de retorno e ausência de bypass."
    ],
    "rubric": [
      "Identifica que banco pode não precisar de default ampla.",
      "Mantém saída de usuários e aplicações sob inspeção.",
      "Propõe rotas específicas para backup, monitoramento e aplicação.",
      "Inclui firewall/proxy/NAT/logs/policy as code.",
      "Valida conectividade bidirecional e caminhos assimétricos."
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desafio",
    "steps": [
      "Usuários normalmente precisam de default, mas ela deve apontar para firewall/proxy corporativo com logs.",
      "Servidores de aplicação podem precisar de saída controlada para updates, APIs ou filas, preferencialmente via firewall/NAT com egress filtering.",
      "Bancos de dados raramente devem ter default ampla; prefira rotas específicas para aplicação, backup, administração e monitoramento.",
      "Se o banco precisar sair, use controle explícito: proxy, firewall, DNS filtering, allowlist mínima e logs.",
      "A validação deve incluir route table, flow logs, firewall logs, teste de ida e retorno e revisão de rotas mais específicas."
    ],
    "keyTakeaway": "Rota default é conveniência operacional, mas em segmentos sensíveis ela precisa ser justificada, controlada e monitorada."
  },
  "glossary": [
    {
      "term": "Rota default",
      "definition": "Entrada 0.0.0.0/0 usada quando nenhuma rota mais específica existe."
    },
    {
      "term": "Gateway padrão",
      "definition": "Next hop da rota default em um host."
    },
    {
      "term": "Gateway de último recurso",
      "definition": "Nome comum para o caminho usado quando o destino não possui rota específica."
    },
    {
      "term": "0.0.0.0/0",
      "definition": "Prefixo CIDR que combina com qualquer destino IPv4."
    },
    {
      "term": "Next hop",
      "definition": "Próximo equipamento para onde o pacote será encaminhado."
    },
    {
      "term": "Egress control",
      "definition": "Controle e monitoramento da saída de tráfego de uma rede ou workload."
    }
  ],
  "references": [
    {
      "title": "Redes e Network v2.0 — Módulo 4",
      "description": "Base de IPv4, gateway, ICMP e troubleshooting."
    },
    {
      "title": "Redes e Network v2.0 — Módulo 5",
      "description": "CIDR, subnetting e planejamento de endereçamento."
    },
    {
      "title": "Redes e Network v2.0 — Aula 6.2",
      "description": "Tabela de rotas e longest prefix match."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "reason": "Route tables e default routes devem ser versionadas e revisadas por pipeline."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso administrativo e bastion",
      "reason": "Subnets sensíveis sem default ampla normalmente exigem acesso administrativo controlado por bastion, IAM e MFA."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "Ler todas as seções de conteúdo",
      "Concluir laboratório lab-11.3",
      "Acertar pelo menos 70% do quiz",
      "Responder ao desafio com justificativa de segurança"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "11.4"
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
