export const lesson0310 = {
  "id": "3.10",
  "moduleId": "m03",
  "order": 10,
  "title": "Revisão prática: do frame ao gateway",
  "subtitle": "Como juntar Ethernet, MAC, switch, broadcast, ARP, VLAN, STP e segurança em um fluxo real de diagnóstico.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 225,
  "tags": [
    "redes",
    "ethernet",
    "camada 2",
    "mac",
    "switch",
    "arp",
    "vlan",
    "stp",
    "gateway",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.1",
      "reason": "É necessário entender Ethernet como base da LAN."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP conecta IPv4 ao MAC do próximo salto local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs definem o domínio de broadcast do fluxo local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.9",
      "reason": "A revisão inclui controles defensivos de Camada 2."
    }
  ],
  "objectives": [
    "Revisar o caminho de um frame Ethernet do host até o gateway.",
    "Relacionar MAC, ARP, switch, VLAN, broadcast, STP e controles defensivos em um único raciocínio.",
    "Criar uma matriz de diagnóstico para problemas de rede local.",
    "Separar falhas de Camada 2 de falhas de IP, DNS, TLS, HTTP e aplicação.",
    "Preparar o aluno para o Módulo 4, onde IPv4 e endereçamento serão aprofundados."
  ],
  "learningOutcomes": [
    "Dado um host sem acesso ao gateway, o aluno identifica evidências de L1, L2 e L3 em ordem.",
    "Dado um endereço IPv4 de destino, o aluno decide se o MAC necessário é do destino local ou do gateway.",
    "Dado um switch com VLANs, o aluno explica quais broadcasts ficam contidos e onde precisa haver roteamento.",
    "Dado um incidente de LAN, o aluno lista riscos e controles defensivos de L2.",
    "Dado um mini-cenário corporativo, o aluno entrega mapa físico, lógico, tabela de evidências e plano de mitigação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Imagine um chamado aparentemente simples: um usuário está conectado por cabo, tem IP, mas não acessa o sistema interno. O primeiro impulso costuma ser culpar DNS, firewall, internet, proxy ou aplicação. Porém, antes de qualquer pacote IP chegar ao roteador, existe uma pergunta local: o host conseguiu construir e entregar um frame Ethernet ao próximo salto correto?</p><p>Esta revisão existe para consolidar o Módulo 3 em um raciocínio único. Ethernet não é uma lista de termos isolados. MAC, frame, switch, flooding, broadcast, ARP, VLAN, STP e segurança L2 formam uma cadeia. Quando uma parte falha, o sintoma pode aparecer como lentidão, perda de acesso, IP duplicado, gateway inacessível, queda de telefonia, indisponibilidade de impressoras ou alertas de segurança.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> se você não entende o caminho do frame até o gateway, pode tratar um problema de ARP como DNS, um problema de VLAN como firewall, um loop de L2 como lentidão genérica ou uma porta física exposta como incidente de aplicação.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>A Ethernet nasceu para permitir comunicação local entre computadores. No início, redes compartilhavam o mesmo meio e sofriam com colisões. A evolução para switches reduziu colisões e trouxe aprendizado MAC, forwarding seletivo e separação por portas. Depois, VLANs permitiram dividir logicamente domínios de broadcast. STP surgiu para permitir redundância sem loops destrutivos. Controles como port security, DHCP snooping, Dynamic ARP Inspection, BPDU Guard e 802.1X surgiram porque conectividade local também virou superfície de ataque.</p><p>Essa evolução mostra um padrão: cada solução resolveu um problema e criou novas responsabilidades operacionais. Switches melhoraram a LAN, mas exigiram entender tabela MAC. VLANs organizaram broadcast, mas exigiram trunks e roteamento inter-VLAN. STP reduziu loops, mas exige desenho consciente. Segurança L2 reduziu riscos, mas precisa de inventário, logs e processos.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema central desta revisão é unir peças que muitas vezes são estudadas separadamente. Na prática, o host não envia um pacote IP nu pelo cabo. Ele encapsula dados em um frame Ethernet, define MAC de origem e destino, usa ARP quando precisa descobrir o MAC do próximo salto, entrega o frame ao switch, depende da VLAN correta e espera que a topologia não tenha loops ou bloqueios indevidos.</p><ul class=\"flow-list\"><li><strong>Sem MAC correto:</strong> o frame não chega ao destino local correto.</li><li><strong>Sem ARP coerente:</strong> o host não sabe qual MAC usar para o IP local ou gateway.</li><li><strong>Sem VLAN correta:</strong> o broadcast de ARP pode nunca chegar ao gateway esperado.</li><li><strong>Sem STP saudável:</strong> loops ou portas bloqueadas indevidamente podem causar indisponibilidade.</li><li><strong>Sem controles defensivos:</strong> portas físicas, ARP e tabela MAC podem ser abusados ou gerar risco operacional.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A revisão do Módulo 3 pode ser vista como uma linha de evolução da LAN: primeiro, o meio Ethernet entrega quadros; depois, endereços MAC identificam interfaces locais; switches aprendem e encaminham; broadcast resolve descobertas locais; ARP liga IPv4 a MAC; VLANs reduzem o domínio de broadcast; STP protege contra loops; e controles defensivos reduzem risco.</p><table class=\"data-table comparison-table\"><thead><tr><th>Etapa</th><th>Problema resolvido</th><th>Nova responsabilidade</th></tr></thead><tbody><tr><td>Ethernet</td><td>Entrega local de quadros</td><td>Entender frames e meio físico</td></tr><tr><td>Switch</td><td>Reduzir colisões e encaminhar por MAC</td><td>Monitorar tabela MAC e flooding</td></tr><tr><td>ARP</td><td>Descobrir MAC para um IPv4 local</td><td>Validar cache, gateway e inconsistências</td></tr><tr><td>VLAN</td><td>Separar domínios de broadcast</td><td>Configurar access, trunk e roteamento inter-VLAN</td></tr><tr><td>STP</td><td>Evitar loops de L2</td><td>Planejar root bridge e proteger portas</td></tr><tr><td>Controles L2</td><td>Reduzir abuso local</td><td>Manter inventário, logs e exceções</td></tr></tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>A revisão prática do Módulo 3 é o método de acompanhar a vida de um frame Ethernet desde o host até o gateway ou destino local, validando cada decisão: qual é a VLAN, qual é o IP de destino, o destino está na mesma rede, qual MAC deve ser usado, o switch aprendeu a porta correta, existe flooding, há loop, há controle bloqueando a porta e quais evidências confirmam ou negam cada hipótese.</p><div class=\"definition-box\"><strong>Definição:</strong> diagnosticar do frame ao gateway é verificar se a entrega local de Camada 2 está correta antes de culpar camadas superiores como DNS, TLS, HTTP, autenticação ou aplicação.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<ol class=\"flow-list\"><li>O host calcula se o destino IPv4 está na mesma rede ou fora dela.</li><li>Se o destino for local, o MAC necessário é o do próprio destino; se for remoto, o MAC necessário é o do gateway.</li><li>O host consulta o cache ARP. Se não houver entrada válida, envia ARP Request em broadcast dentro da VLAN.</li><li>O switch recebe o frame, aprende o MAC de origem e encaminha conforme sua tabela MAC.</li><li>Se o destino for broadcast ou MAC desconhecido, o switch faz flooding dentro da VLAN.</li><li>Se houver trunk, apenas VLANs permitidas devem atravessar o enlace.</li><li>STP deve impedir loops bloqueando caminhos redundantes quando necessário.</li><li>Controles defensivos podem permitir, negar, alertar ou colocar a porta em quarentena.</li></ol>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura corporativa, o fluxo do frame envolve host, NIC, cabo ou rádio, switch de acesso, VLAN, uplink, switch de distribuição, gateway ou firewall e, depois disso, roteamento de Camada 3. O erro comum é desenhar apenas IPs e firewalls, ignorando portas físicas, VLANs, trunks, STP, ARP e tabela MAC.</p><ul><li><strong>Componentes:</strong> host, NIC, switch, VLAN, trunk, gateway, firewall e logs.</li><li><strong>Pontos de falha:</strong> porta errada, cabo, VLAN incorreta, trunk sem VLAN, ARP inconsistente, loop, MAC flapping e controle de acesso.</li><li><strong>Dependências:</strong> Camada 1 funcional, Camada 2 coerente e Camada 3 configurada.</li></ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em um prédio corporativo. O IP é o número do departamento que você quer alcançar. O MAC é a mesa ou crachá local onde a entrega imediata precisa acontecer. O switch é a recepção do andar, que aprende onde cada pessoa está sentada. A VLAN é uma área separada do prédio. O gateway é a saída para outro prédio. O STP é a regra que evita dois corredores redundantes criarem circulação infinita de pessoas.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não transportam envelopes físicos. Switches aprendem dinamicamente, ARP expira, VLANs são tags lógicas e STP tem estados formais. A analogia serve para o raciocínio, não substitui o funcionamento técnico.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, seu notebook quer acessar a interface do roteador em <code>192.168.1.1</code>. Ele precisa saber o MAC do roteador. Se não houver entrada ARP, envia um ARP Request em broadcast. O roteador responde com seu MAC. O notebook monta um frame Ethernet com MAC de destino do roteador e envia ao switch ou AP integrado.</p><p>Se você trocar o roteador, a entrada ARP antiga pode ficar temporariamente incorreta. Se o Wi-Fi isola clientes, alguns broadcasts podem não chegar a outros dispositivos. Se houver um cabo ruim, o problema pode parecer IP, mas a causa é física.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, um usuário na VLAN 10 tenta acessar um servidor na VLAN 30. O primeiro salto não é o servidor: é o gateway da VLAN 10. O host usa ARP para descobrir o MAC do gateway, entrega o frame ao switch, o switch encaminha pela porta correta, o gateway roteia para a VLAN 30 e políticas de firewall podem ser aplicadas.</p><p>Se a porta do usuário estiver na VLAN errada, o ARP pode buscar um gateway que não existe naquele domínio. Se um trunk não permite a VLAN 10, o broadcast não atravessa. Se STP bloqueou um uplink de forma inesperada, o caminho pode falhar. Se DAI bloquear uma resposta ARP legítima por falta de DHCP snooping correto, haverá sintoma de gateway inacessível.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, muitos detalhes clássicos de Camada 2 são abstraídos pelo provedor. Mesmo assim, o raciocínio continua útil: uma VM tem NIC virtual, sub-rede, gateway virtual, route table e controles de segurança. Em ambientes híbridos, datacenter, switches, VLANs, trunks e ARP continuam existindo até o ponto de conexão com VPN, Direct Connect, ExpressRoute ou appliance.</p><p>Quando um workload on-premises não acessa a cloud, a causa pode estar antes da VPN: VLAN errada, gateway local inacessível, ARP inconsistente, porta física com erro ou caminho de switch instável.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Runners self-hosted, registries internos, clusters Kubernetes on-premises e appliances de segurança dependem de uma LAN estável. Um pipeline que falha ao puxar imagem de container pode parecer problema de token, DNS ou registry. Mas, antes de investigar aplicação, vale validar se o host alcança o gateway, se a VLAN está correta, se há perda local e se o switch vê o MAC na porta esperada.</p><p>Na automação, essa revisão vira checklist operacional: inventário de portas, VLANs declaradas, IPAM consistente, logs de switch, exceções documentadas e testes de conectividade por camada.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Em segurança, o fluxo do frame ao gateway ajuda a separar incidente de rede local de incidente de aplicação. Um alerta de ARP inconsistente exige evidências de cache ARP, tabela MAC, porta de switch, DHCP snooping e logs. Um alerta de MAC flapping exige investigar loops, redundância, virtualização, docking stations, APs e comportamento anômalo.</p><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Evidência</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>ARP inconsistente</td><td>Gateway com MAC alternando</td><td>Perda, desvio ou interceptação local</td><td>DAI, DHCP snooping, monitoramento e TLS</td></tr><tr><td>MAC flapping</td><td>Mesmo MAC em portas diferentes</td><td>Instabilidade e forwarding incorreto</td><td>Investigar loop, virtualização e STP</td></tr><tr><td>Trunk permissivo</td><td>VLANs demais em uplink</td><td>Exposição lateral e erro operacional</td><td>Allowed VLANs mínimas e revisão</td></tr><tr><td>Porta aberta</td><td>Dispositivo desconhecido</td><td>Acesso indevido à LAN</td><td>802.1X/NAC, port security e quarentena</td></tr></tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1040 600\" role=\"img\" aria-labelledby=\"m03l10-title m03l10-desc\">\n<title id=\"m03l10-title\">Revisão prática: do frame ao gateway</title>\n<desc id=\"m03l10-desc\">Fluxo didático mostrando um host encapsulando dados em frame Ethernet, consultando ARP, passando pelo switch, VLAN, STP e chegando ao gateway.</desc>\n<defs><marker id=\"m03l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n<rect x=\"40\" y=\"120\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"120\" y=\"153\" text-anchor=\"middle\" class=\"svg-label\">Host</text><text x=\"120\" y=\"179\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP + MAC + ARP</text>\n<rect x=\"300\" y=\"112\" width=\"180\" height=\"98\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"390\" y=\"148\" text-anchor=\"middle\" class=\"svg-label\">Switch acesso</text><text x=\"390\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table</text><text x=\"390\" y=\"196\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN 10</text>\n<rect x=\"565\" y=\"112\" width=\"180\" height=\"98\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"655\" y=\"148\" text-anchor=\"middle\" class=\"svg-label\">Distribuição</text><text x=\"655\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">trunk + STP</text><text x=\"655\" y=\"196\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">allowed VLANs</text>\n<rect x=\"840\" y=\"120\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"920\" y=\"153\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"920\" y=\"179\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">próximo salto</text>\n<line x1=\"200\" y1=\"160\" x2=\"300\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"480\" y1=\"160\" x2=\"565\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"745\" y1=\"160\" x2=\"840\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l10-arrow)\"/>\n<rect x=\"55\" y=\"300\" width=\"220\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"165\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Evidências no host</text><text x=\"165\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">arp -a · ipconfig · ping</text>\n<rect x=\"315\" y=\"300\" width=\"220\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"425\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Evidências no switch</text><text x=\"425\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table · VLAN · STP</text>\n<rect x=\"575\" y=\"300\" width=\"220\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"685\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Controles L2</text><text x=\"685\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DAI · snooping · BPDU Guard</text>\n<rect x=\"835\" y=\"300\" width=\"170\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"920\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text><text x=\"920\" y=\"356\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota + firewall</text>\n<line x1=\"165\" y1=\"300\" x2=\"120\" y2=\"202\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"425\" y1=\"300\" x2=\"390\" y2=\"210\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"685\" y1=\"300\" x2=\"655\" y2=\"210\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<line x1=\"920\" y1=\"300\" x2=\"920\" y2=\"202\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m03l10-arrow)\"/>\n<rect x=\"180\" y=\"465\" width=\"700\" height=\"74\" rx=\"14\" class=\"svg-zone\"/><text x=\"530\" y=\"496\" text-anchor=\"middle\" class=\"svg-label\">Pergunta da revisão</text><text x=\"530\" y=\"522\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O frame chegou ao gateway certo? Se não chegou, em qual evidência a hipótese quebrou?</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório final do Módulo 3 é um mini-projeto de diagnóstico. Você irá criar uma matriz do caminho do frame até o gateway, coletar evidências seguras e produzir um relatório técnico sanitizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios verificam se você consegue transformar conceitos em diagnóstico: identificar MAC correto, gateway esperado, domínio de broadcast, VLAN envolvida, risco de loop e controle defensivo adequado.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio final simula uma filial com usuários, impressoras, visitantes, AP, switch de acesso, uplink trunk e firewall/gateway. Você deverá mapear o fluxo e propor correções seguras.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra o raciocínio esperado: começar por evidências locais, validar VLAN e ARP, confirmar tabela MAC, verificar STP e somente depois avançar para IP, DNS ou aplicação.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> antes do IP atravessar redes, o frame precisa chegar corretamente ao próximo salto local.</li><li><strong>O que lembrar:</strong> MAC, ARP, switch, VLAN, STP e controles L2 formam a base da LAN.</li><li><strong>Erro comum:</strong> culpar DNS ou firewall antes de validar gateway, ARP e VLAN.</li><li><strong>Uso real:</strong> troubleshooting, desenho de LAN, hardening, SOC/NOC e documentação.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>No próximo módulo, você aprofundará IPv4 e endereçamento. Agora que entende como o frame chega ao gateway, faz sentido estudar como o host decide se um destino está na mesma rede, como máscaras funcionam, como gateway padrão é escolhido e como endereçamento errado quebra a comunicação.</p>\n</section>"
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
      "IPv4",
      "ICMP",
      "DHCP"
    ],
    "dependsOn": [
      "Ethernet",
      "MAC",
      "Switch",
      "ARP",
      "VLAN",
      "STP"
    ],
    "enables": [
      "IPv4",
      "Gateway padrão",
      "Roteamento",
      "Troubleshooting profissional",
      "Segurança de LAN"
    ]
  },
  "deepDive": {
    "mentalModel": "Siga o frame até o gateway: destino local ou remoto, MAC necessário, ARP, switch, VLAN, STP, controles e evidências.",
    "keyTerms": [
      "frame",
      "MAC",
      "ARP",
      "gateway",
      "VLAN",
      "STP",
      "broadcast",
      "tabela MAC"
    ],
    "limitations": [
      "O modelo não substitui captura de tráfego ou logs reais.",
      "Cloud pública abstrai muitos detalhes de L2.",
      "Alguns ambientes usam virtualização e overlays que mudam a visibilidade."
    ],
    "whenToUse": [
      "Falha de acesso ao gateway.",
      "Suspeita de VLAN incorreta.",
      "MAC flapping ou ARP inconsistente.",
      "Mapeamento de LAN.",
      "Análise defensiva de portas e switches."
    ],
    "whenNotToUse": [
      "Quando a evidência já mostra erro puramente de aplicação.",
      "Quando não há autorização para coletar dados da rede.",
      "Quando mudanças em switch podem causar indisponibilidade sem janela."
    ],
    "operationalImpact": [
      "Exige inventário de portas, VLANs e uplinks.",
      "Melhora troubleshooting, mas demanda disciplina de documentação.",
      "Controles como NAC e DAI precisam de implantação gradual."
    ],
    "financialImpact": [
      "Pode exigir switches gerenciáveis, licenças NAC, ferramentas de monitoramento e tempo de equipe.",
      "Reduz custo de indisponibilidade e investigação longa."
    ],
    "securityImpact": [
      "Reduz movimento lateral e abuso local.",
      "Aumenta visibilidade de portas, MACs, ARP e VLANs.",
      "Exige cuidado com logs e evidências sensíveis."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que VLAN é firewall.",
      "whyItHappens": "VLAN separa broadcast e parece isolamento completo.",
      "consequence": "Tráfego inter-VLAN pode ficar permitido sem política adequada.",
      "correction": "Use VLAN para segmentação L2 e firewall/ACL para política de acesso."
    },
    {
      "mistake": "Culpar DNS antes de testar gateway.",
      "whyItHappens": "DNS é uma causa comum de falha de acesso por nome.",
      "consequence": "Perde-se tempo quando o problema é ARP, VLAN ou gateway.",
      "correction": "Valide IP, máscara, gateway, ARP e ping local antes de DNS."
    },
    {
      "mistake": "Limpar cache ARP e declarar problema resolvido.",
      "whyItHappens": "A limpeza pode mascarar temporariamente o sintoma.",
      "consequence": "A causa raiz volta depois.",
      "correction": "Colete evidências de switch, ARP, DHCP, VLAN e logs."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Gateway não responde.",
      "ARP incompleto ou inconsistente.",
      "MAC flapping.",
      "Host na VLAN errada.",
      "Broadcast storm.",
      "Acesso intermitente a serviços locais."
    ],
    "diagnosticQuestions": [
      "O host tem IP, máscara e gateway coerentes?",
      "O MAC do gateway aparece no cache ARP?",
      "O switch vê o MAC do host na porta esperada?",
      "A porta está na VLAN correta?",
      "O trunk permite a VLAN?",
      "STP bloqueou alguma porta crítica?",
      "Há controles L2 bloqueando a comunicação?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && arp -a && ping <gateway> && tracert <destino>",
        "purpose": "Ver configuração local, cache ARP e alcance ao gateway.",
        "expectedObservation": "Gateway configurado, entrada ARP para gateway e resposta de ping quando ICMP permitido.",
        "interpretation": "Se gateway não responde e ARP está incompleto, investigar L2 antes de DNS."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ip neigh && ping -c 4 <gateway>",
        "purpose": "Ver endereço, rota default, vizinhos ARP e conectividade local.",
        "expectedObservation": "default via correto e vizinho ARP em estado válido.",
        "interpretation": "Estado FAILED/INCOMPLETE aponta para problema local ou bloqueio."
      },
      {
        "platform": "Cisco IOS",
        "command": "show mac address-table dynamic\nshow vlan brief\nshow interfaces trunk\nshow spanning-tree\nshow arp",
        "purpose": "Validar tabela MAC, VLANs, trunks, STP e ARP no equipamento.",
        "expectedObservation": "MACs nas portas esperadas, VLAN permitida no trunk e STP estável.",
        "interpretation": "MAC flapping, VLAN ausente ou porta bloqueada explicam muitos sintomas de LAN."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não pinga gateway e ARP está incompleto",
        "then": "Verificar cabo/Wi-Fi, VLAN da porta, trunk, gateway ativo e controles L2."
      },
      {
        "if": "MAC do gateway muda repetidamente",
        "then": "Investigar alta disponibilidade legítima, IP duplicado, ARP inconsistente e logs de switch."
      },
      {
        "if": "Mesmo MAC aparece em portas diferentes",
        "then": "Investigar loop, virtualização, docking, AP bridge ou anomalia."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar portas, VLANs, uplinks e gateways.",
      "Desabilitar portas não usadas ou colocá-las em VLAN de quarentena.",
      "Usar 802.1X/NAC quando viável.",
      "Habilitar DHCP snooping, DAI, BPDU Guard e storm control com planejamento.",
      "Sanitizar evidências antes de compartilhar relatórios."
    ],
    "badPractices": [
      "Usar uma rede plana para todos os ativos.",
      "Deixar trunks permitindo todas as VLANs sem necessidade.",
      "Confiar apenas em firewall de borda.",
      "Investigar incidentes mexendo em switch sem janela ou autorização.",
      "Publicar MACs, IPs e topologia em documentos abertos."
    ],
    "commonErrors": [
      "Confundir isolamento de broadcast com autorização.",
      "Não correlacionar ARP com tabela MAC.",
      "Ignorar STP em redes redundantes.",
      "Tratar MAC como identidade forte."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição lateral em LAN plana",
        "description": "Todos os ativos compartilham o mesmo domínio local.",
        "defensiveExplanation": "Facilita descoberta, broadcast excessivo e alcance lateral.",
        "mitigation": "VLANs, firewall intersegmento, NAC, monitoramento e menor privilégio."
      },
      {
        "name": "ARP inconsistente",
        "description": "Associações IP-MAC instáveis ou suspeitas.",
        "defensiveExplanation": "Pode indicar erro operacional, HA mal entendido ou tentativa de desvio local.",
        "mitigation": "DAI, DHCP snooping, logs, segmentação e investigação controlada."
      }
    ],
    "monitoring": [
      "MAC flapping.",
      "Portas novas ativas.",
      "Mudança de gateway MAC.",
      "Broadcast incomum.",
      "Eventos de STP.",
      "Bloqueios de DAI/NAC."
    ],
    "hardening": [
      "Port security seletivo.",
      "802.1X/NAC.",
      "BPDU Guard em portas de acesso.",
      "Root Guard onde aplicável.",
      "Allowed VLANs restritas em trunks.",
      "Storm control."
    ],
    "detectionIdeas": [
      "Correlacionar logs de switch, DHCP, ARP, NAC, firewall e EDR.",
      "Alertar para MACs novos em portas críticas.",
      "Monitorar crescimento de broadcast e MAC moves."
    ]
  },
  "protocolFields": [
    {
      "field": "Destination MAC",
      "size": "48 bits",
      "purpose": "Identificar o próximo destino local do frame.",
      "securityObservation": "Pode apontar para gateway, destino local ou broadcast; inconsistências merecem investigação."
    },
    {
      "field": "Source MAC",
      "size": "48 bits",
      "purpose": "Identificar a interface que originou o frame naquele enlace.",
      "securityObservation": "Não deve ser tratado como identidade forte, pois pode mudar ou ser falsificado em alguns cenários."
    },
    {
      "field": "VLAN Tag 802.1Q",
      "size": "32 bits",
      "purpose": "Carregar VLAN ID em enlaces trunk.",
      "securityObservation": "Trunks permissivos ampliam superfície de erro e exposição."
    },
    {
      "field": "ARP Sender/Target",
      "size": "variável",
      "purpose": "Associar IPv4 e MAC na rede local.",
      "securityObservation": "ARP não autentica nativamente a veracidade da associação."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Decide se o destino é local ou remoto.",
      "detail": "Compara IP e máscara; se remoto, usa gateway.",
      "possibleFailure": "Máscara ou gateway incorreto."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Consulta cache ARP.",
      "detail": "Procura MAC do destino local ou gateway.",
      "possibleFailure": "Entrada ausente, stale, failed ou inconsistente."
    },
    {
      "step": 3,
      "actor": "Switch",
      "action": "Aprende MAC de origem e encaminha o frame.",
      "detail": "Usa tabela MAC por VLAN.",
      "possibleFailure": "MAC flapping, flooding ou porta errada."
    },
    {
      "step": 4,
      "actor": "Infraestrutura L2",
      "action": "Aplica VLAN, trunk e STP.",
      "detail": "Limita broadcast e evita loops.",
      "possibleFailure": "VLAN ausente no trunk, STP bloqueando caminho ou loop."
    },
    {
      "step": 5,
      "actor": "Gateway",
      "action": "Recebe o frame local e processa o pacote IP.",
      "detail": "A partir daqui começa o roteamento para outras redes.",
      "possibleFailure": "Gateway errado, firewall local ou rota ausente."
    }
  ],
  "lab": {
    "id": "lab-3.10",
    "title": "Mini-projeto: do frame Ethernet ao gateway",
    "labType": "security",
    "objective": "Construir um relatório técnico que explique e valide o caminho local de um host até o gateway, com foco em Ethernet, MAC, ARP, switch, VLAN, STP e controles defensivos.",
    "scenario": "Você está revisando uma LAN pequena antes de avançar para IPv4. O objetivo é documentar o fluxo local sem executar ações ofensivas e sem alterar equipamentos de produção.",
    "topology": "Host -> switch de acesso -> trunk/uplink -> gateway/firewall -> outras redes",
    "architecture": "Rede local com ao menos um host, gateway padrão, domínio de broadcast, switch ou AP e possibilidade de VLAN lógica.",
    "prerequisites": [
      "Ter concluído as aulas 3.1 a 3.9.",
      "Ter autorização para coletar informações no próprio ambiente ou usar laboratório controlado.",
      "Não executar ataques, spoofing, flooding ou varreduras agressivas."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Comandos ipconfig, arp, ping, tracert, ip, ip neigh",
      "Opcional: acesso read-only a switch Cisco/Packet Tracer",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero",
    "safetyNotes": [
      "Não altere configurações de switch em ambiente real sem autorização.",
      "Não execute ARP spoofing, MAC flooding, loops físicos ou ataques de broadcast.",
      "Remova IPs públicos, MACs completos, nomes internos e topologia sensível antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar configuração local",
        "instruction": "Colete IP, máscara, gateway e interface ativa.",
        "command": "ipconfig /all  # Windows\nip addr && ip route  # Linux",
        "expectedOutput": "Configuração local com gateway padrão identificado.",
        "explanation": "Sem IP, máscara e gateway coerentes, o diagnóstico de L2/L3 fica incompleto."
      },
      {
        "number": 2,
        "title": "Validar ARP do gateway",
        "instruction": "Verifique se existe associação IP-MAC para o gateway.",
        "command": "arp -a  # Windows\nip neigh  # Linux",
        "expectedOutput": "Entrada para o gateway com MAC correspondente.",
        "explanation": "O host precisa do MAC do gateway para falar com redes externas."
      },
      {
        "number": 3,
        "title": "Testar alcance local",
        "instruction": "Teste conectividade com o gateway e registre resultado.",
        "command": "ping <gateway>",
        "expectedOutput": "Respostas quando ICMP for permitido.",
        "explanation": "Falha aqui sugere investigar camada física, VLAN, ARP, controle local ou gateway."
      },
      {
        "number": 4,
        "title": "Mapear hipótese de switch/VLAN",
        "instruction": "Descreva em texto qual porta, VLAN e caminho você acredita que o frame percorre. Se tiver Packet Tracer ou acesso read-only, valide com comandos Cisco.",
        "command": "show mac address-table dynamic\nshow vlan brief\nshow interfaces trunk\nshow spanning-tree",
        "expectedOutput": "MACs nas portas esperadas, VLAN correta e STP estável.",
        "explanation": "Essa etapa conecta a visão do host com a visão do switch."
      },
      {
        "number": 5,
        "title": "Construir matriz de evidências",
        "instruction": "Monte tabela com camada, hipótese, evidência, comando, interpretação e próximo passo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz de diagnóstico do frame ao gateway.",
        "explanation": "O objetivo é raciocínio estruturado, não volume de comandos."
      },
      {
        "number": 6,
        "title": "Sanitizar e entregar relatório",
        "instruction": "Remova dados sensíveis e escreva uma conclusão técnica.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório sanitizado com fluxo, riscos, evidências e próximos passos.",
        "explanation": "Documentação segura é parte da prática profissional."
      }
    ],
    "expectedResult": "O aluno deve entregar uma matriz explicando como o frame sai do host, qual MAC é usado, como ARP entra no fluxo, qual papel do switch/VLAN/STP e quais controles defensivos são relevantes.",
    "validation": [
      {
        "check": "Gateway identificado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão coerente com a rede local.",
        "ifFails": "Revisar configuração IP, DHCP, interface ativa e VLAN."
      },
      {
        "check": "ARP do gateway presente",
        "command": "arp -a ou ip neigh",
        "expected": "Entrada IP-MAC do gateway ou estado válido.",
        "ifFails": "Testar ping ao gateway e investigar L2."
      },
      {
        "check": "Raciocínio de VLAN documentado",
        "command": "show vlan brief / documentação lógica",
        "expected": "VLAN do host e gateway explicadas.",
        "ifFails": "Revisar porta access, trunk e domínio de broadcast."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Gateway não responde",
        "probableCause": "VLAN errada, ARP incompleto, cabo/Wi-Fi, controle L2 ou gateway fora.",
        "howToConfirm": "Comparar IP/gateway, ARP, porta, VLAN e logs.",
        "fix": "Corrigir causa específica sem liberar regras amplas."
      },
      {
        "symptom": "MAC do gateway muda",
        "probableCause": "HA legítima, IP duplicado ou inconsistência ARP.",
        "howToConfirm": "Ver logs, tabela MAC, ARP e desenho de alta disponibilidade.",
        "fix": "Documentar HA ou investigar anomalia com controles defensivos."
      },
      {
        "symptom": "Broadcast elevado",
        "probableCause": "Loop, ARP excessivo, rede plana ou storm.",
        "howToConfirm": "Logs de switch, STP, counters e monitoramento.",
        "fix": "Corrigir loop, ajustar STP e storm control."
      }
    ],
    "improvements": [
      "Refazer o lab em Packet Tracer com dois switches e duas VLANs.",
      "Adicionar firewall inter-VLAN no desenho.",
      "Criar checklist padronizado para chamados de gateway inacessível.",
      "Comparar o mesmo fluxo em rede cabeada e Wi-Fi."
    ],
    "evidenceToCollect": [
      "IP/máscara/gateway sanitizados",
      "Entrada ARP do gateway sanitizada",
      "Mapa físico/lógico simplificado",
      "Tabela de hipóteses e evidências",
      "Riscos e controles defensivos"
    ],
    "questions": [
      "Por que o host usa o MAC do gateway para destinos remotos?",
      "O que muda quando o destino está na mesma VLAN?",
      "Como VLAN limita broadcast?",
      "Por que STP pode bloquear um caminho aparentemente bom?"
    ],
    "challenge": "Mapeie uma filial pequena com usuários, impressoras e visitantes, explicando o caminho do frame ao gateway e os controles L2 mínimos.",
    "solution": "A solução deve separar VLANs por função, identificar gateway por VLAN, restringir trunks, usar STP planejado, proteger portas de acesso, coletar logs e documentar evidências sem expor dados sensíveis."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o frame precisa chegar ao gateway antes de qualquer roteamento para outra rede acontecer?",
      "hints": [
        "Pense na diferença entre entrega local e entrega entre redes.",
        "Pense em MAC de destino."
      ],
      "expectedIdeas": [
        "próximo salto",
        "MAC do gateway",
        "ARP",
        "Camada 2 antes da Camada 3"
      ],
      "explanation": "O host entrega localmente ao gateway; só depois o roteador encaminha o pacote para outras redes."
    },
    {
      "type": "diagnóstico",
      "question": "Um host tem IP e DNS, mas não pinga o gateway. Quais evidências você coleta antes de culpar DNS?",
      "hints": [
        "ARP",
        "VLAN",
        "porta de switch",
        "cabo/Wi-Fi"
      ],
      "expectedIdeas": [
        "ipconfig/ip route",
        "arp -a/ip neigh",
        "porta/VLAN",
        "ping gateway",
        "logs do switch"
      ],
      "explanation": "DNS é irrelevante se o gateway local nem é alcançado."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer separar visitantes, usuários e servidores. Que partes do Módulo 3 entram no desenho?",
      "hints": [
        "VLAN",
        "gateway",
        "firewall",
        "portas de acesso",
        "trunks"
      ],
      "expectedIdeas": [
        "segmentação",
        "domínios de broadcast",
        "inter-VLAN controlado",
        "802.1X/NAC",
        "logs"
      ],
      "explanation": "VLANs separam broadcast; políticas precisam de firewall/ACL e controles L2."
    }
  ],
  "quiz": [
    {
      "id": "q3.10.1",
      "type": "conceito",
      "q": "Para acessar um destino fora da rede local, qual MAC normalmente aparece como destino no frame Ethernet inicial?",
      "opts": [
        "MAC do gateway padrão",
        "MAC do servidor remoto",
        "MAC do DNS público",
        "MAC de broadcast sempre"
      ],
      "a": 0,
      "exp": "Para destinos remotos, o host entrega o frame local ao gateway padrão.",
      "difficulty": "iniciante",
      "topic": "gateway"
    },
    {
      "id": "q3.10.2",
      "type": "diagnóstico",
      "q": "Se o ARP para o gateway fica INCOMPLETE/FAILED, qual hipótese deve ser investigada cedo?",
      "opts": [
        "Problema local de L2, VLAN, cabo, Wi-Fi ou gateway",
        "Erro de senha do usuário no sistema",
        "Certificado TLS expirado",
        "CORS da aplicação"
      ],
      "a": 0,
      "exp": "Sem ARP resolvido para o gateway, o problema ocorre antes de TLS, HTTP e aplicação.",
      "difficulty": "iniciante-intermediário",
      "topic": "ARP"
    },
    {
      "id": "q3.10.3",
      "type": "segurança",
      "q": "Qual afirmação sobre VLAN está correta?",
      "opts": [
        "VLAN separa domínio de broadcast, mas não substitui firewall",
        "VLAN criptografa automaticamente todo tráfego",
        "VLAN elimina necessidade de gateway",
        "VLAN impede qualquer ataque de L2"
      ],
      "a": 0,
      "exp": "VLAN segmenta L2, mas política entre segmentos exige roteamento controlado, firewall/ACL e monitoramento.",
      "difficulty": "iniciante",
      "topic": "VLAN"
    },
    {
      "id": "q3.10.4",
      "type": "troubleshooting",
      "q": "MAC flapping normalmente indica o quê?",
      "opts": [
        "O mesmo MAC aparecendo em portas diferentes",
        "DNS lento",
        "Senha incorreta",
        "Base64 mal codificado"
      ],
      "a": 0,
      "exp": "MAC flapping é evidência típica de movimento do mesmo MAC entre portas, podendo indicar loop, virtualização ou anomalia.",
      "difficulty": "intermediário",
      "topic": "switch"
    },
    {
      "id": "q3.10.5",
      "type": "arquitetura",
      "q": "Qual tecnologia evita loops em topologias Ethernet redundantes?",
      "opts": [
        "STP/RSTP",
        "Base64",
        "HTTP 403",
        "NAT"
      ],
      "a": 0,
      "exp": "STP/RSTP calcula caminhos e bloqueia portas para evitar loops de L2.",
      "difficulty": "iniciante",
      "topic": "STP"
    },
    {
      "id": "q3.10.6",
      "type": "segurança",
      "q": "Qual controle ajuda a validar associações ARP usando base confiável de DHCP snooping?",
      "opts": [
        "Dynamic ARP Inspection",
        "Tracert",
        "UTF-8",
        "HTTP Keep-Alive"
      ],
      "a": 0,
      "exp": "DAI usa informações confiáveis para reduzir respostas ARP indevidas, quando corretamente planejado.",
      "difficulty": "intermediário",
      "topic": "DAI"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.10.1",
      "front": "Para destinos remotos, qual MAC o host usa?",
      "back": "O MAC do gateway padrão, porque a entrega inicial é local.",
      "tags": [
        "gateway",
        "mac"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.10.2",
      "front": "VLAN substitui firewall?",
      "back": "Não. VLAN separa broadcast; firewall/ACL aplica política entre redes.",
      "tags": [
        "vlan",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.10.3",
      "front": "O que é MAC flapping?",
      "back": "O mesmo MAC aparecendo em portas diferentes em curto intervalo.",
      "tags": [
        "switch",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.10.4",
      "front": "Por que ARP é crítico?",
      "back": "Porque resolve IPv4 para MAC dentro da rede local.",
      "tags": [
        "arp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.10.5",
      "front": "O que STP evita?",
      "back": "Loops de Camada 2 e broadcast storms em topologias redundantes.",
      "tags": [
        "stp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.10.6",
      "front": "Qual é a pergunta central da revisão?",
      "back": "O frame chegou ao próximo salto correto? Se não, em qual evidência o fluxo quebrou?",
      "tags": [
        "revisão"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.10.1",
      "type": "conceitual",
      "prompt": "Explique por que um host usa o MAC do gateway para acessar um servidor remoto.",
      "expectedAnswer": "Porque o servidor remoto não está no domínio local; o host entrega o frame ao gateway, que roteia o pacote.",
      "explanation": "MAC é usado para entrega local; IP é usado para endereçamento entre redes."
    },
    {
      "id": "ex3.10.2",
      "type": "diagnóstico",
      "prompt": "Um host não pinga o gateway e o ARP está incompleto. Liste quatro hipóteses.",
      "expectedAnswer": "Cabo/Wi-Fi, VLAN errada, gateway fora, porta bloqueada por controle L2, trunk sem VLAN, STP/loop ou firewall local bloqueando ICMP em cenário específico.",
      "explanation": "A falha acontece antes de DNS e aplicação."
    },
    {
      "id": "ex3.10.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma rede com VLAN de usuários, servidores e visitantes, indicando onde o gateway e o firewall entram.",
      "expectedAnswer": "Cada VLAN tem domínio de broadcast próprio; o gateway/firewall faz roteamento inter-VLAN e política de acesso.",
      "explanation": "VLAN segmenta L2; política é aplicada no ponto de roteamento/controle."
    },
    {
      "id": "ex3.10.4",
      "type": "segurança",
      "prompt": "Monte uma matriz com três riscos L2, evidências e mitigação.",
      "expectedAnswer": "Ex.: ARP inconsistente -> ARP/logs -> DAI; porta aberta -> MAC novo/NAC -> 802.1X; loop -> STP/logs/broadcast -> BPDU Guard/storm control.",
      "explanation": "O objetivo é conectar risco, detecção e controle."
    }
  ],
  "challenge": {
    "title": "Mini-projeto final do Módulo 3: do frame ao gateway",
    "scenario": "Uma filial possui usuários cabeados, Wi-Fi corporativo, rede de visitantes, impressoras e um firewall que atua como gateway das VLANs. Há reclamações de lentidão e alguns hosts não alcançam o gateway.",
    "tasks": [
      "Criar mapa físico e lógico simplificado.",
      "Explicar o caminho do frame de um usuário até o gateway.",
      "Listar evidências para validar ARP, MAC table, VLAN e STP.",
      "Identificar riscos de L2 e controles mínimos.",
      "Produzir conclusão técnica sanitizada."
    ],
    "constraints": [
      "Não executar ataque ou varredura agressiva.",
      "Não alterar switch real sem autorização.",
      "Separar hipótese de evidência.",
      "Não expor MACs/IPs completos no relatório final."
    ],
    "expectedDeliverables": [
      "Mapa físico/lógico",
      "Matriz de diagnóstico",
      "Tabela de riscos e controles",
      "Plano de validação",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Fluxo técnico correto",
        "points": 30,
        "description": "Explica destino local/remoto, ARP, MAC, switch, VLAN, STP e gateway."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Usa comandos e observações coerentes sem extrapolar conclusões."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Propõe controles defensivos adequados e preserva dados sensíveis."
      },
      {
        "criterion": "Clareza operacional",
        "points": 20,
        "description": "Organiza hipóteses, riscos e próximos passos sem mudanças perigosas."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa identificando o domínio local do host. Se o destino for remoto, o frame deve ir ao gateway. Em seguida validamos ARP, MAC table, VLAN, trunk e STP. Só depois avançamos para IP, DNS, TLS, HTTP ou aplicação.",
    "steps": [
      "Registrar IP, máscara e gateway.",
      "Verificar ARP do gateway.",
      "Validar se o switch aprende o MAC do host na porta correta.",
      "Confirmar VLAN da porta e VLAN permitida no trunk.",
      "Verificar STP, loops e eventos de MAC flapping.",
      "Listar controles defensivos e evidências sanitizadas.",
      "Escrever conclusão com causa provável e próximos passos."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar tudo no firewall para testar.",
        "whyItIsWrong": "Se o problema é ARP, VLAN ou STP, mudar firewall não resolve e pode criar risco."
      },
      {
        "answer": "Achar que ping no gateway falhando é DNS.",
        "whyItIsWrong": "DNS nem entra no fluxo se o gateway local não é alcançado."
      },
      {
        "answer": "Usar VLAN como único controle de segurança.",
        "whyItIsWrong": "VLAN separa broadcast, mas não substitui política de acesso e monitoramento."
      }
    ],
    "finalAnswer": "Uma resposta madura valida o caminho local primeiro: host configurado, ARP coerente, switch aprendendo MAC, VLAN correta, trunk permitido, STP estável, gateway acessível e controles L2 aplicados sem quebrar a operação."
  },
  "glossary": [
    {
      "term": "Próximo salto",
      "shortDefinition": "Dispositivo local para o qual o host entrega o frame quando precisa alcançar outra rede.",
      "longDefinition": "Normalmente é o gateway padrão da sub-rede. O host precisa do MAC desse dispositivo para enviar o frame Ethernet inicial.",
      "example": "Para acessar 8.8.8.8, o notebook envia o frame ao MAC do roteador local.",
      "relatedTerms": [
        "gateway",
        "ARP",
        "MAC"
      ],
      "relatedLessons": [
        "2.5",
        "3.5",
        "4.1"
      ]
    },
    {
      "term": "Fluxo do frame ao gateway",
      "shortDefinition": "Raciocínio que acompanha a entrega local até o gateway.",
      "longDefinition": "Inclui IP/máscara, ARP, MAC, switch, VLAN, STP e controles L2.",
      "example": "Usado para diagnosticar por que um host não alcança o gateway.",
      "relatedTerms": [
        "Ethernet",
        "switch",
        "VLAN"
      ],
      "relatedLessons": [
        "3.1",
        "3.7"
      ]
    },
    {
      "term": "Matriz de diagnóstico",
      "shortDefinition": "Tabela que organiza hipótese, evidência, comando, interpretação e próximo passo.",
      "longDefinition": "Ajuda a evitar conclusões precipitadas e documentar troubleshooting profissional.",
      "example": "Hipótese: VLAN errada; evidência: porta em VLAN 20, host espera VLAN 10.",
      "relatedTerms": [
        "troubleshooting",
        "evidência"
      ],
      "relatedLessons": [
        "2.8",
        "15.1"
      ]
    },
    {
      "term": "Controle L2",
      "shortDefinition": "Mecanismo defensivo aplicado na camada de enlace ou acesso.",
      "longDefinition": "Inclui port security, 802.1X/NAC, DAI, DHCP snooping, BPDU Guard e storm control.",
      "example": "BPDU Guard em portas de usuário reduz risco de switch indevido causar loop.",
      "relatedTerms": [
        "NAC",
        "DAI",
        "BPDU Guard"
      ],
      "relatedLessons": [
        "3.9"
      ]
    },
    {
      "term": "Relatório sanitizado",
      "shortDefinition": "Documento técnico que remove dados sensíveis antes de compartilhamento.",
      "longDefinition": "Evita expor IPs, MACs completos, nomes internos, topologia e controles em detalhes desnecessários.",
      "example": "Trocar 192.168.10.23 por host usuário A e mascarar MAC completo.",
      "relatedTerms": [
        "evidência",
        "segurança"
      ],
      "relatedLessons": [
        "2.9",
        "16.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/",
      "note": "Referência conceitual para Ethernet."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1Q VLAN Tagging",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/",
      "note": "Referência conceitual para VLANs."
    },
    {
      "type": "rfc",
      "title": "RFC 826 — An Ethernet Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência histórica do ARP."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "IPv4 e endereçamento serão aprofundados no próximo módulo."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m08",
      "lesson": "infra-hibrida",
      "reason": "Runners e clusters on-premises dependem de LAN, VLANs e gateways corretos."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m01",
      "lesson": "controles-de-acesso",
      "reason": "NAC, 802.1X e segmentação se conectam a identidade de dispositivo e usuário."
    }
  ],
  "progressRules": {
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "anyOf": [
          "quizScoreAtLeast",
          "checklistDone"
        ]
      },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "4.1"
    ]
  }
};
