export const lesson0306 = {
  "id": "3.6",
  "moduleId": "m03",
  "order": 6,
  "title": "Cache ARP e troubleshooting de rede local",
  "subtitle": "Como interpretar, validar e usar a tabela ARP para diagnosticar falhas locais sem confundir Camada 2, Camada 3, DNS e aplicação.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 215,
  "tags": [
    "redes",
    "ethernet",
    "arp",
    "cache arp",
    "troubleshooting",
    "camada 2",
    "camada 3",
    "gateway",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "É necessário entender ARP Request, ARP Reply e a função do ARP na resolução IPv4 para MAC."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.5",
      "reason": "A aula depende do entendimento de IP, gateway, rota e próximo salto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula usa comandos básicos de diagnóstico como ping, arp, ipconfig, tracert e nslookup."
    }
  ],
  "objectives": [
    "Explicar por que existe cache ARP e qual problema ele resolve.",
    "Interpretar entradas ARP dinâmicas, estáticas, incompletas e suspeitas.",
    "Diagnosticar falhas locais envolvendo gateway, IP duplicado, VLAN incorreta, MAC inconsistente e cache desatualizado.",
    "Usar comandos seguros em Windows, Linux e Cisco IOS para coletar evidências de ARP.",
    "Relacionar cache ARP com segurança defensiva, monitoramento e mitigação de riscos de Camada 2."
  ],
  "learningOutcomes": [
    "Dada uma tabela ARP, o aluno identifica o MAC do gateway e avalia se a associação é coerente.",
    "Dado um sintoma de rede local, o aluno monta uma sequência de verificação sem culpar DNS ou aplicação cedo demais.",
    "Dado um IP duplicado ou MAC flapping, o aluno descreve evidências esperadas e possíveis causas.",
    "Dado um ambiente corporativo, o aluno propõe controles defensivos para reduzir risco de ARP spoofing e rede plana.",
    "Dado um relatório de troubleshooting, o aluno sabe quais evidências sanitizar antes de compartilhar."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Imagine que um usuário abre chamado dizendo: “a internet caiu”. O computador possui IP, máscara, gateway e DNS. O Wi-Fi aparece conectado. O cabo está encaixado. Mesmo assim, o usuário não consegue acessar sistemas internos nem sites externos. Se você testar apenas DNS ou aplicação, pode perder a causa real: o host talvez não consiga entregar frames ao gateway porque a associação IP-MAC local está ausente, errada, duplicada ou instável.</p>\n<p>O cache ARP parece um detalhe pequeno, mas é uma das evidências mais úteis para diagnosticar rede local. Ele mostra quais endereços IPv4 o host conseguiu resolver para MAC dentro da LAN. Quando o cache está coerente, o host consegue montar frames para o próximo salto. Quando está incoerente, incompleto ou muda de forma estranha, aparecem sintomas como conexão intermitente, gateway inacessível, lentidão local, IP duplicado, conflito de VLAN e suspeita defensiva de manipulação de Camada 2.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um notebook consegue obter IP por DHCP, mas alterna entre momentos em que pinga o gateway e momentos em que falha. O cache ARP mostra o mesmo IP do gateway associado a MACs diferentes ao longo do tempo. Isso é evidência forte de erro operacional, IP duplicado, gateway redundante mal entendido ou possível abuso de ARP.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>ARP foi criado para evitar tabelas manuais de IP para MAC em redes IPv4 sobre Ethernet. Porém, resolver o MAC a cada pacote seria ineficiente. Cada consulta ARP usa broadcast, consome processamento nos hosts da VLAN e adiciona latência antes do envio. Por isso, sistemas operacionais passaram a manter uma tabela temporária: o cache ARP.</p>\n<p>Em redes pequenas, o cache ARP é quase invisível. Em redes corporativas, ele se torna parte do troubleshooting. Administradores consultam a tabela ARP em hosts, switches, roteadores e firewalls para entender se um endereço foi resolvido, por qual MAC, em qual interface, em qual VLAN e com que estabilidade. Em ambientes com alta disponibilidade, firewalls redundantes, HSRP/VRRP, clusters e virtualização, o cache ARP também ajuda a diferenciar comportamento esperado de comportamento suspeito.</p>\n<p>A evolução trouxe controles adicionais: DHCP snooping, Dynamic ARP Inspection, port security, 802.1X/NAC, segmentação por VLAN, logs de switch, monitoramento de MAC flapping e criptografia ponta a ponta. Esses controles não substituem o entendimento do ARP; eles dependem dele.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema técnico é que a rede local precisa equilibrar eficiência e correção. Sem cache, todo envio para o gateway exigiria broadcast ARP repetido. Com cache, o host ganha velocidade, mas também passa a depender de uma informação temporária que pode expirar, ficar incompleta, ser sobrescrita ou indicar conflito.</p>\n<ul class=\"flow-list\"><li><strong>Eficiência:</strong> guardar IP-MAC reduz broadcasts repetidos.</li><li><strong>Atualização:</strong> entradas precisam expirar porque dispositivos mudam de porta, NIC, VM, VLAN ou gateway.</li><li><strong>Diagnóstico:</strong> uma entrada ausente ou incompleta indica que a resolução local falhou.</li><li><strong>Instabilidade:</strong> o mesmo IP associado a MACs diferentes pode ser normal em HA, mas também pode indicar conflito ou abuso.</li><li><strong>Segurança:</strong> ARP não autentica nativamente respostas, então a tabela deve ser interpretada com contexto.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>O tratamento do cache ARP evoluiu conforme as redes deixaram de ser pequenas LANs e passaram a envolver VLANs, switches gerenciáveis, virtualização, firewalls redundantes e cloud híbrida.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>Prática moderna</th></tr></thead><tbody>\n<tr><td>ARP manual/estático</td><td>Associações podiam ser fixadas manualmente.</td><td>Difícil de manter e propenso a erro.</td><td>Uso raro, apenas em casos muito específicos e documentados.</td></tr>\n<tr><td>Cache ARP dinâmico</td><td>Host aprende e guarda IP-MAC por tempo limitado.</td><td>Não valida identidade do respondente.</td><td>Monitoramento e controles de switch.</td></tr>\n<tr><td>Switches gerenciáveis</td><td>MAC table, ARP table em L3 e logs ajudam a correlacionar porta, VLAN e MAC.</td><td>Exige documentação e acesso operacional.</td><td>Inventário, NAC, port security e alertas.</td></tr>\n<tr><td>Alta disponibilidade</td><td>Gateways virtuais podem usar MAC virtual.</td><td>MAC mudando pode parecer suspeito sem contexto.</td><td>Documentar HSRP, VRRP, clusters e VIPs.</td></tr>\n<tr><td>Cloud/virtualização</td><td>O provedor ou hypervisor abstrai parte da Camada 2.</td><td>O aluno vê menos ARP diretamente.</td><td>Entender ENI, próximo salto, route table e overlays.</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Cache ARP</strong> é a tabela local que armazena associações temporárias entre endereços IPv4 e endereços MAC resolvidos por ARP. Em vez de perguntar em broadcast toda vez que precisa falar com o gateway ou com outro host da mesma rede, o sistema consulta essa tabela.</p>\n<div class=\"definition-box\"><strong>Definição prática:</strong> cache ARP é a memória temporária do host sobre “qual MAC corresponde a qual IPv4 nesta rede local”. Ele acelera a comunicação, reduz broadcast e vira evidência de troubleshooting.</div>\n<p>Uma entrada ARP pode ser dinâmica, quando aprendida automaticamente, ou estática, quando configurada manualmente. Pode aparecer completa, quando há IP e MAC, ou incompleta, quando o host tentou resolver mas não recebeu resposta. O significado exato varia por sistema operacional, mas o raciocínio é o mesmo: a tabela revela o estado da resolução local.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>O funcionamento interno começa quando uma aplicação gera tráfego para um IP. A pilha de rede decide se o destino está na mesma sub-rede ou se precisa do gateway. Depois, verifica se já existe associação IP-MAC no cache ARP.</p>\n<ol class=\"flow-list\"><li>Aplicação ou sistema gera tráfego para um IP.</li><li>A pilha IP escolhe o próximo salto: destino local ou gateway.</li><li>O sistema consulta o cache ARP pelo IP do próximo salto.</li><li>Se há entrada válida, monta o frame Ethernet com aquele MAC.</li><li>Se não há entrada, envia ARP Request em broadcast.</li><li>Enquanto espera resposta, a entrada pode aparecer como incompleta.</li><li>Ao receber ARP Reply, o sistema atualiza o cache.</li><li>A entrada expira após um tempo ou pode ser substituída por nova evidência.</li></ol>\n<p>Essa mecânica explica por que limpar o cache ARP às vezes “resolve” temporariamente um problema, mas raramente resolve a causa raiz. Se a causa é IP duplicado, VLAN errada, loop, ataque conceitual de ARP spoofing, gateway em HA mal documentado ou switch instável, a entrada problemática pode voltar.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura corporativa, cache ARP existe em hosts, servidores, appliances, roteadores, firewalls, switches L3, balanceadores e hypervisors. Cada equipamento observa o mundo local do seu ponto de vista. Por isso, troubleshooting maduro correlaciona várias tabelas: ARP no host, tabela MAC no switch, ARP no gateway, DHCP lease, logs de NAC e documentação de VLAN.</p>\n<ul><li><strong>Host:</strong> mostra se conseguiu resolver o MAC do gateway.</li><li><strong>Switch L2:</strong> mostra em qual porta o MAC aparece.</li><li><strong>Gateway/firewall:</strong> mostra quais IPs foram resolvidos em cada interface ou VLAN.</li><li><strong>DHCP:</strong> ajuda a confirmar quem deveria usar determinado IP.</li><li><strong>NAC/802.1X:</strong> relaciona identidade, porta, MAC e política.</li><li><strong>SIEM/NMS:</strong> correlaciona mudanças, flaps e alertas.</li></ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine uma portaria que guarda uma lista temporária: “o ramal 101 corresponde à mesa da Ana”, “o ramal 102 corresponde à mesa do Bruno”. Em vez de perguntar a todo o escritório onde está cada pessoa a cada entrega, o mensageiro consulta a lista. Isso economiza tempo. Mas se alguém muda de mesa, se duas pessoas usam o mesmo ramal ou se alguém informa um local falso, a entrega pode ir para o lugar errado.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não têm pessoas conscientes confirmando identidade. ARP é automático, local e sem autenticação nativa. Por isso, a analogia ajuda a entender cache, mas não representa bem o risco técnico de respostas falsas ou conflitos.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, seu notebook tem IP <code>192.168.1.50</code> e gateway <code>192.168.1.1</code>. Quando você acessa um site, o destino final não está na sua LAN. O notebook precisa enviar o pacote ao roteador. Para isso, consulta o cache ARP procurando o MAC de <code>192.168.1.1</code>. Se não encontrar, pergunta em broadcast. Após receber resposta, guarda a associação por algum tempo.</p>\n<p>Se o cache ARP não tiver o gateway, e o ARP Request não receber resposta, você pode ter cabo desconectado, Wi-Fi isolado, VLAN errada, gateway desligado, firewall local incomum ou problema físico. Se o gateway aparece com MAC diferente a cada minuto, é necessário investigar contexto antes de concluir: pode ser HA legítimo, troca de equipamento, IP duplicado ou comportamento suspeito.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, uma estação da VLAN administrativa não acessa o ERP interno. O analista coleta <code>ipconfig /all</code>, <code>arp -a</code>, ping para o gateway e evidência do switch. A tabela ARP mostra o gateway resolvido, mas o switch mostra o MAC do gateway em porta inesperada. Isso muda o diagnóstico: talvez o problema não esteja no ERP, nem no DNS, mas em cabeamento, VLAN, porta de acesso, trunk, loop ou equipamento conectado indevidamente.</p>\n<p>Em outro caso, uma impressora com IP fixo entra em conflito com uma reserva DHCP. Usuários alternam entre imprimir e falhar. O cache ARP em máquinas diferentes mostra o mesmo IP associado a MACs diferentes. A evidência aponta para conflito de IP, e não para “driver de impressora ruim”.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud pública, o provedor abstrai muitos detalhes de Ethernet e ARP. Você normalmente não enxerga broadcast ARP como em uma LAN física. Mesmo assim, o modelo mental continua útil: instâncias possuem interfaces virtuais, há próximo salto, route tables, gateways, appliances virtuais, balanceadores e controles de segurança. Em ambientes híbridos, firewalls virtuais e appliances podem manter tabelas ARP dentro de segmentos conectados.</p>\n<p>O erro comum é tentar aplicar cegamente comandos de LAN física em cloud. A investigação deve usar as evidências do provedor: tabela de rotas, security groups/NSGs, flow logs, interfaces, subnets, NACLs, peering, private endpoints e logs do appliance. A pergunta continua semelhante: “qual é o próximo salto e a camada local consegue entregá-lo?”</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, problemas de ARP podem aparecer indiretamente em runners self-hosted, clusters Kubernetes on-premises, ambientes de virtualização, bridges Docker, redes de laboratório, appliances de segurança e pipelines que acessam registries internos. Um pipeline pode falhar ao baixar imagem não porque o registry caiu, mas porque o runner perdeu conectividade local com gateway ou DNS por falha de Camada 2.</p>\n<p>Em automação, IaC e troubleshooting como código, é útil coletar evidências de forma padronizada: IP, rota, vizinhos ARP, DNS, porta TCP, TLS e resposta HTTP. Essa sequência evita mudanças perigosas, como liberar firewall ou trocar DNS, antes de provar que a LAN e o gateway estão funcionando.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Do ponto de vista defensivo, cache ARP é uma fonte de evidência e também uma área de risco. ARP não autentica nativamente respostas, então um ambiente sem segmentação e sem controles de switch pode ser vulnerável a manipulações locais. A aula não ensina ataque; o foco é reconhecer sinais, reduzir impacto e usar controles preventivos e detectivos.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Sinal defensivo</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>ARP spoofing conceitual</td><td>MAC do gateway muda sem janela planejada.</td><td>Intercepção local ou negação de serviço.</td><td>Dynamic ARP Inspection, DHCP snooping, 802.1X, segmentação e monitoramento.</td></tr>\n<tr><td>IP duplicado</td><td>Mesmo IP associado a MACs diferentes.</td><td>Conectividade intermitente.</td><td>DHCP controlado, reservas, inventário e alerta de conflito.</td></tr>\n<tr><td>MAC flapping</td><td>MAC aparece alternando portas.</td><td>Instabilidade e possível loop.</td><td>Verificar cabeamento, trunks, loops, STP e equipamentos indevidos.</td></tr>\n<tr><td>Evidência sensível</td><td>Prints de ARP expõem IPs, MACs e gateways.</td><td>Vazamento de topologia.</td><td>Sanitizar evidências antes de compartilhar.</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1040 460\" role=\"img\" aria-labelledby=\"arp-cache-title arp-cache-desc\">\n  <title id=\"arp-cache-title\">Cache ARP e troubleshooting de rede local</title>\n  <desc id=\"arp-cache-desc\">Um host consulta o cache ARP antes de enviar frames ao gateway. A investigação correlaciona cache ARP, tabela MAC do switch e ARP do gateway.</desc>\n  <defs><marker id=\"m03l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n  <rect x=\"40\" y=\"78\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"130\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n  <text x=\"130\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Consulta cache ARP</text>\n  <rect x=\"300\" y=\"60\" width=\"200\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"400\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Cache ARP</text>\n  <text x=\"400\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1 → bb:bb</text>\n  <text x=\"400\" y=\"145\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dinâmica / expira</text>\n  <text x=\"400\" y=\"170\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">incompleta = investigar</text>\n  <rect x=\"590\" y=\"78\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"680\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n  <text x=\"680\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MAC table / porta</text>\n  <rect x=\"840\" y=\"78\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"925\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"925\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ARP / rota</text>\n  <line x1=\"220\" y1=\"122\" x2=\"300\" y2=\"122\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m03l06-arrow)\" />\n  <line x1=\"500\" y1=\"122\" x2=\"590\" y2=\"122\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l06-arrow)\" />\n  <line x1=\"770\" y1=\"122\" x2=\"840\" y2=\"122\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m03l06-arrow)\" />\n  <rect x=\"90\" y=\"280\" width=\"860\" height=\"98\" rx=\"14\" class=\"svg-zone\" />\n  <text x=\"520\" y=\"312\" text-anchor=\"middle\" class=\"svg-label\">Matriz de evidências</text>\n  <text x=\"520\" y=\"340\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Host: arp -a / ip neigh → Switch: show mac address-table → Gateway: show arp → DHCP/NAC/SIEM</text>\n  <text x=\"520\" y=\"365\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Se o MAC muda sem contexto, investigue HA, IP duplicado, VLAN, loop ou abuso defensivo de ARP</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>Neste laboratório, você irá coletar evidências de cache ARP no seu computador, identificar o gateway, gerar tráfego leve, observar a entrada ARP e montar uma pequena matriz de diagnóstico. Não execute spoofing, varredura agressiva ou alteração de configuração em rede que não é sua.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam interpretação: entrada incompleta, gateway com MAC inesperado, IP duplicado, MAC flapping e separação entre falha de ARP, rota, DNS e aplicação.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você receberá um cenário de rede local instável. Sua tarefa será montar um plano de investigação defensivo, coletar evidências mínimas, preservar dados sensíveis e propor mitigação sem executar ações ofensivas.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como interpretar a tabela ARP junto com rota, tabela MAC do switch, DHCP, NAC e contexto de alta disponibilidade. O objetivo é ensinar raciocínio, não decorar comando.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li><strong>Ideia central:</strong> cache ARP guarda associações temporárias IP-MAC para reduzir broadcast e acelerar comunicação local.</li><li><strong>O que lembrar:</strong> ausência, incompletude ou mudança inesperada no cache são evidências de investigação.</li><li><strong>Erro comum:</strong> limpar cache ARP e considerar o problema resolvido sem investigar a causa raiz.</li><li><strong>Uso real:</strong> diagnóstico de gateway, IP duplicado, VLAN, MAC flapping, loop e riscos de Camada 2.</li><li><strong>Segurança:</strong> correlacione ARP com switch, DHCP, NAC e logs; sanitize evidências.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você estudará VLANs como segmentação de Camada 2. Isso é consequência direta do que vimos: broadcast, ARP e cache ARP ficam limitados ao domínio de broadcast. Para reduzir ruído, risco lateral e confusão operacional, redes modernas usam VLANs para separar grupos lógicos antes de aplicar roteamento e políticas.</p>\n</section>"
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
      "ARP",
      "IPv4",
      "ICMP",
      "DHCP",
      "802.1Q"
    ],
    "dependsOn": [
      "Frame Ethernet",
      "Endereço MAC",
      "ARP",
      "Gateway",
      "Tabela MAC"
    ],
    "enables": [
      "Troubleshooting de LAN",
      "Diagnóstico de gateway",
      "Detecção defensiva de IP duplicado",
      "Preparação para VLANs"
    ]
  },
  "protocolFields": [
    {
      "field": "Protocol Address",
      "size": "32 bits no IPv4",
      "purpose": "Endereço IPv4 que será associado a um MAC.",
      "securityObservation": "O mesmo IPv4 aparecendo com MACs diferentes exige contexto: HA, troca planejada, conflito ou abuso."
    },
    {
      "field": "Hardware Address",
      "size": "48 bits em Ethernet",
      "purpose": "Endereço MAC associado ao IP resolvido.",
      "securityObservation": "MAC pode ser falsificado; não deve ser tratado como identidade forte sozinho."
    },
    {
      "field": "State/Type",
      "size": "varia por sistema",
      "purpose": "Indicar se a entrada é dinâmica, estática, incompleta, reachable, stale ou failed.",
      "securityObservation": "Estados incompletos ou flapping recorrente indicam problema local ou comportamento suspeito."
    },
    {
      "field": "Interface",
      "size": "varia por sistema",
      "purpose": "Indicar por qual interface a associação foi aprendida.",
      "securityObservation": "Entrada em interface inesperada pode indicar rota, VPN, bridge ou configuração incorreta."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Precisa enviar tráfego para um IP.",
      "detail": "A pilha IP escolhe destino local ou gateway como próximo salto.",
      "possibleFailure": "Máscara incorreta faz o host procurar ARP para destino errado ou usar gateway indevido."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Consulta cache ARP.",
      "detail": "Se a entrada IP-MAC está válida, usa o MAC diretamente no frame.",
      "possibleFailure": "Entrada antiga, incompleta ou inconsistente causa falha local ou intermitência."
    },
    {
      "step": 3,
      "actor": "Host",
      "action": "Envia ARP Request se não houver entrada.",
      "detail": "Broadcast alcança a VLAN local.",
      "possibleFailure": "VLAN errada, isolamento Wi-Fi, gateway fora ou broadcast bloqueado impedem resposta."
    },
    {
      "step": 4,
      "actor": "Gateway ou destino local",
      "action": "Responde com ARP Reply.",
      "detail": "O host atualiza o cache e passa a enviar frames unicast.",
      "possibleFailure": "Resposta de MAC inesperado exige correlação com switch, DHCP, NAC e HA."
    },
    {
      "step": 5,
      "actor": "Analista",
      "action": "Correlaciona evidências.",
      "detail": "Compara ARP do host, MAC table do switch, ARP do gateway, DHCP e logs.",
      "possibleFailure": "Concluir apenas com uma evidência pode levar a diagnóstico incorreto."
    }
  ],
  "deepDive": {
    "mentalModel": "Cache ARP é uma fotografia temporária do mapa IP-MAC local. Ele não prova identidade por si só; prova o que aquele host acredita naquele momento sobre o próximo salto local.",
    "keyTerms": [
      "cache ARP",
      "entrada dinâmica",
      "entrada estática",
      "entrada incompleta",
      "MAC flapping",
      "IP duplicado",
      "gateway"
    ],
    "limitations": [
      "Não autentica identidade.",
      "Não atravessa roteadores.",
      "Pode ser abstraído em cloud.",
      "Pode mudar por HA legítimo.",
      "Não substitui logs de switch, DHCP ou NAC."
    ],
    "whenToUse": [
      "Quando o host não alcança gateway.",
      "Quando há intermitência local.",
      "Quando suspeita de IP duplicado.",
      "Quando precisa correlacionar porta, VLAN, MAC e IP.",
      "Quando investiga risco defensivo de Camada 2."
    ],
    "whenNotToUse": [
      "Como única prova de identidade.",
      "Para diagnosticar erro de aplicação sem validar camadas superiores.",
      "Para justificar mudanças amplas sem correlação.",
      "Como substituto de inventário e documentação."
    ],
    "operationalImpact": [
      "Ajuda a reduzir tempo de diagnóstico local.",
      "Exige interpretação com contexto de VLAN, HA e DHCP.",
      "Pode revelar inconsistências de inventário.",
      "Limpar cache pode mascarar problema recorrente."
    ],
    "financialImpact": [
      "Ferramentas básicas são gratuitas, mas switches gerenciáveis, NAC e SIEM têm custo.",
      "Falhas de L2 podem gerar indisponibilidade e horas de troubleshooting.",
      "Documentação e inventário reduzem custo operacional recorrente."
    ],
    "securityImpact": [
      "Ajuda a detectar sinais de abuso local.",
      "Exige sanitização porque expõe topologia.",
      "Precisa de controles complementares como DAI, DHCP snooping e 802.1X."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que ARP resolve nomes como DNS.",
      "whyItHappens": "Ambos parecem transformar um identificador em outro.",
      "consequence": "O analista culpa DNS quando a falha está antes, na entrega local ao gateway.",
      "correction": "DNS resolve nome para IP; ARP resolve IP local ou gateway para MAC."
    },
    {
      "mistake": "Limpar cache ARP e declarar o incidente encerrado.",
      "whyItHappens": "O teste pode voltar a funcionar temporariamente.",
      "consequence": "A causa raiz permanece e o problema retorna.",
      "correction": "Limpar cache é teste controlado, não solução definitiva."
    },
    {
      "mistake": "Tratar MAC como identidade forte.",
      "whyItHappens": "MAC parece único e fixo.",
      "consequence": "Políticas baseadas só em MAC são frágeis.",
      "correction": "Use MAC como evidência, não como autenticação suficiente."
    },
    {
      "mistake": "Ignorar contexto de alta disponibilidade.",
      "whyItHappens": "MAC do gateway mudando parece sempre suspeito.",
      "consequence": "Falsos positivos e diagnósticos errados.",
      "correction": "Documente HSRP/VRRP, clusters e MAC virtual esperado."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host não pinga gateway.",
      "Conectividade local intermitente.",
      "Mesmo IP aparece com MACs diferentes.",
      "Entrada ARP incompleta ou failed.",
      "MAC flapping em switch.",
      "Usuários dizem que DNS ou internet caiu, mas gateway falha."
    ],
    "diagnosticQuestions": [
      "O host tem IP, máscara e gateway coerentes?",
      "O gateway aparece no cache ARP?",
      "O MAC do gateway corresponde ao esperado?",
      "O switch vê esse MAC em qual porta e VLAN?",
      "Há DHCP lease ou reserva para esse IP?",
      "Existe HA que explique MAC virtual ou mudança planejada?",
      "Há alertas de loop, flapping, port security ou DAI?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\narp -a\nping <gateway>\nroute print",
        "purpose": "Ver configuração local, cache ARP, alcance do gateway e rota default.",
        "expectedObservation": "Gateway configurado, entrada ARP para o gateway e rota default coerente.",
        "interpretation": "Se o gateway não aparece no ARP após ping, investigue Camada 2, gateway, VLAN ou isolamento."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\nip neigh\nping -c 4 <gateway>",
        "purpose": "Ver interface, rota, vizinhos ARP/NDP e conectividade local.",
        "expectedObservation": "Entrada REACHABLE/STALE para o gateway após tráfego.",
        "interpretation": "FAILED/INCOMPLETE indica falha de resolução local ou ausência de resposta."
      },
      {
        "platform": "Cisco IOS",
        "command": "show arp\nshow mac address-table\nshow interfaces status\nshow vlan brief",
        "purpose": "Correlacionar IP-MAC, MAC-porta, estado físico e VLAN.",
        "expectedObservation": "MAC do host/gateway em porta e VLAN esperadas.",
        "interpretation": "MAC em porta inesperada, flapping ou VLAN errada muda a hipótese."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não pinga gateway e não há entrada ARP do gateway",
        "then": "Verificar cabo/Wi-Fi, VLAN, IP/máscara, gateway ativo e isolamento local."
      },
      {
        "if": "Entrada ARP do gateway muda entre MACs sem documentação de HA",
        "then": "Correlacionar com switch, DHCP/NAC e logs; investigar conflito ou abuso defensivo."
      },
      {
        "if": "Gateway responde, mas sites por nome falham",
        "then": "ARP provavelmente não é causa principal; avançar para DNS e camadas superiores."
      },
      {
        "if": "MAC aparece alternando portas no switch",
        "then": "Investigar loop, equipamento indevido, virtualização, trunk ou MAC flapping."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Segmentar redes para reduzir domínio de broadcast.",
      "Habilitar DHCP snooping e Dynamic ARP Inspection quando suportado.",
      "Usar 802.1X/NAC em portas de acesso críticas.",
      "Monitorar MAC flapping e mudanças inesperadas de gateway.",
      "Sanitizar prints e PCAPs antes de compartilhar."
    ],
    "badPractices": [
      "Rede plana com muitos hosts sem controle.",
      "Portas físicas ativas em áreas públicas.",
      "Políticas baseadas apenas em MAC.",
      "Ignorar alertas de MAC flapping.",
      "Compartilhar tabela ARP completa em chamados externos sem sanitização."
    ],
    "commonErrors": [
      "Confundir ARP com DNS.",
      "Achar que NAT ou firewall resolve risco de ARP local.",
      "Limpar cache como solução permanente.",
      "Ignorar HA legítimo e gerar falso positivo."
    ],
    "vulnerabilities": [
      {
        "name": "Manipulação de ARP em LAN",
        "description": "ARP não autentica nativamente respostas, permitindo risco conceitual de associação indevida IP-MAC em redes locais vulneráveis.",
        "defensiveExplanation": "O foco defensivo é detectar mudança anormal, limitar o domínio de broadcast e aplicar controles de switch.",
        "mitigation": "Dynamic ARP Inspection, DHCP snooping, port security, 802.1X/NAC, segmentação e monitoramento."
      },
      {
        "name": "IP duplicado",
        "description": "Dois ativos usando o mesmo IP podem causar alternância de MAC no cache.",
        "defensiveExplanation": "A evidência aparece como intermitência e MACs diferentes para o mesmo IP.",
        "mitigation": "DHCP centralizado, reservas, inventário, alertas e documentação."
      }
    ],
    "monitoring": [
      "Alertas de MAC flapping.",
      "Mudanças no MAC do gateway.",
      "Eventos de DAI/DHCP snooping.",
      "Conflitos de IP em DHCP/NAC.",
      "Aumento anormal de broadcast ARP."
    ],
    "hardening": [
      "Desativar portas não usadas.",
      "Aplicar VLANs por função.",
      "Configurar controles de switch compatíveis.",
      "Documentar gateways virtuais e MACs esperados.",
      "Coletar logs de infraestrutura de acesso."
    ],
    "detectionIdeas": [
      "Comparar ARP de múltiplos hosts com tabela MAC do switch.",
      "Verificar se o MAC do gateway aparece em porta inesperada.",
      "Correlacionar horários de falha com mudanças, loops ou alertas.",
      "Usar PCAP apenas em ambiente autorizado e sanitizar evidências."
    ]
  },
  "lab": {
    "id": "lab-3.6",
    "title": "Investigando cache ARP de forma defensiva",
    "labType": "security",
    "objective": "Coletar e interpretar evidências de cache ARP para diagnosticar conectividade local com o gateway.",
    "scenario": "Você é chamado para investigar uma estação que às vezes não acessa sistemas internos. Antes de culpar DNS, firewall ou aplicação, você precisa validar a resolução local para o gateway.",
    "topology": "Host do aluno -> switch/AP -> gateway da rede local -> demais redes/Internet",
    "architecture": "Uma LAN simples com host final, domínio de broadcast, gateway e possível switch ou roteador doméstico/corporativo.",
    "prerequisites": [
      "Ter permissão para executar comandos no próprio computador.",
      "Conhecer o gateway local ou estar autorizado a consultá-lo.",
      "Não executar spoofing, varredura agressiva ou alteração de rede."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Opcional: acesso somente leitura a switch Cisco em laboratório",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Execute apenas na sua máquina ou em laboratório autorizado.",
      "Não altere ARP de terceiros.",
      "Não capture tráfego sensível sem autorização.",
      "Sanitize IPs públicos, MACs e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar configuração local",
        "instruction": "Colete IP, máscara, gateway e interface usada.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route",
        "expectedOutput": "Endereço IPv4, máscara/prefixo, gateway padrão e interface ativa.",
        "explanation": "Sem IP, máscara e gateway coerentes, a análise de ARP fica sem contexto."
      },
      {
        "number": 2,
        "title": "Consultar cache ARP antes do teste",
        "instruction": "Liste as entradas ARP atuais e procure o gateway.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Tabela com IPs locais associados a MACs ou estados como REACHABLE/STALE/INCOMPLETE.",
        "explanation": "A tabela mostra o que o host acredita sobre IPs e MACs locais naquele momento."
      },
      {
        "number": 3,
        "title": "Gerar tráfego leve para o gateway",
        "instruction": "Envie poucos pings para o gateway para provocar resolução ARP se necessário.",
        "command": "Windows: ping <gateway>\nLinux: ping -c 4 <gateway>",
        "expectedOutput": "Respostas do gateway ou falha explícita.",
        "explanation": "Após tráfego, espera-se que o cache contenha entrada para o gateway se a LAN local estiver funcionando."
      },
      {
        "number": 4,
        "title": "Consultar cache ARP depois do teste",
        "instruction": "Liste novamente a tabela ARP e compare com a coleta anterior.",
        "command": "Windows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Entrada do gateway associada a um MAC ou estado de falha/incompleto.",
        "explanation": "Mudanças entre antes e depois ajudam a entender se o host conseguiu resolver o próximo salto."
      },
      {
        "number": 5,
        "title": "Montar matriz de evidências",
        "instruction": "Crie uma tabela com interface, IP local, gateway, MAC do gateway, resultado do ping e interpretação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz curta e sanitizada de evidências.",
        "explanation": "Troubleshooting profissional precisa de evidência organizada, não apenas prints soltos."
      },
      {
        "number": 6,
        "title": "Opcional em laboratório Cisco",
        "instruction": "Se tiver acesso autorizado, correlacione ARP e tabela MAC no switch/gateway.",
        "command": "show arp\nshow mac address-table\nshow interfaces status\nshow vlan brief",
        "expectedOutput": "MACs em portas e VLANs esperadas.",
        "explanation": "A correlação entre host, switch e gateway fortalece ou corrige a hipótese."
      }
    ],
    "expectedResult": "O aluno deve identificar o gateway, verificar se há entrada ARP para ele, interpretar o estado da entrada e escrever uma hipótese técnica curta.",
    "validation": [
      {
        "check": "Gateway configurado",
        "command": "ipconfig /all ou ip route",
        "expected": "Gateway padrão presente e coerente com a rede local.",
        "ifFails": "Revisar DHCP, configuração manual, VPN e interface ativa."
      },
      {
        "check": "Entrada ARP do gateway",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a MAC ou estado interpretável.",
        "ifFails": "Gerar ping leve ao gateway e repetir; se continuar incompleto, investigar L1/L2/gateway."
      },
      {
        "check": "Relatório sanitizado",
        "command": "Revisão manual",
        "expected": "Sem IP público, nome interno sensível ou MAC completo desnecessário.",
        "ifFails": "Mascarar dados antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Entrada do gateway não aparece",
        "probableCause": "Nenhum tráfego recente, gateway inacessível, VLAN errada, cabo/Wi-Fi ou isolamento.",
        "howToConfirm": "Pingue o gateway e verifique IP, máscara e interface ativa.",
        "fix": "Corrigir conectividade local antes de investigar DNS ou aplicação."
      },
      {
        "symptom": "Entrada aparece como INCOMPLETE ou FAILED",
        "probableCause": "ARP Request não recebeu resposta.",
        "howToConfirm": "Verificar gateway, VLAN, link físico, isolamento Wi-Fi e switch.",
        "fix": "Escalar para validação de Camada 1/2 e gateway."
      },
      {
        "symptom": "MAC do gateway muda",
        "probableCause": "HA legítimo, troca planejada, IP duplicado ou abuso local.",
        "howToConfirm": "Comparar com documentação, switch, DHCP, NAC e logs.",
        "fix": "Documentar HA ou mitigar conflito/risco com controles de rede."
      },
      {
        "symptom": "Gateway responde, mas DNS falha",
        "probableCause": "ARP local está funcional; problema está em DNS ou camadas superiores.",
        "howToConfirm": "Testar nslookup/dig e acesso por IP quando apropriado.",
        "fix": "Avançar no diagnóstico por camadas."
      }
    ],
    "improvements": [
      "Adicionar coleta de tabela MAC do switch em laboratório.",
      "Comparar resultados antes e depois de trocar de Wi-Fi para cabo.",
      "Criar checklist padrão de evidências L2/L3.",
      "Adicionar observação autorizada no Wireshark com filtro arp."
    ],
    "evidenceToCollect": [
      "IP/máscara/gateway sanitizados",
      "Tabela ARP antes e depois",
      "Resultado de ping ao gateway",
      "Interface usada",
      "Hipótese técnica",
      "Limites da evidência"
    ],
    "questions": [
      "O gateway aparece no cache ARP?",
      "A entrada é coerente com o ambiente?",
      "O MAC muda sem explicação?",
      "Há diferença entre falha local e falha de DNS?",
      "Que evidências seriam necessárias no switch?"
    ],
    "challenge": "Monte um relatório de uma página explicando como você diferenciaria falha de ARP, IP duplicado, VLAN errada e DNS indisponível.",
    "solution": "A solução deve começar por IP/máscara/gateway, consultar ARP, testar gateway, correlacionar com switch/DHCP/NAC quando possível e só depois avançar para DNS e aplicação. IP duplicado tende a aparecer como MAC variável para o mesmo IP; VLAN errada tende a impedir alcance ao gateway correto; DNS falha com gateway funcional; falha de ARP aparece como entrada ausente/incompleta para o próximo salto."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o cache ARP existe se o host poderia enviar ARP Request toda vez?",
      "hints": [
        "Pense em broadcast.",
        "Pense em eficiência e latência."
      ],
      "expectedIdeas": [
        "reduzir broadcast",
        "ganhar eficiência",
        "guardar associação temporária",
        "evitar consulta repetida"
      ],
      "explanation": "O cache reduz custo operacional da LAN, mas precisa expirar porque a rede muda."
    },
    {
      "type": "diagnóstico",
      "question": "Um host não pinga o gateway e a tabela ARP não mostra o IP do gateway. O que isso sugere?",
      "hints": [
        "Pense antes de DNS.",
        "Pense em Camada 1, 2 e gateway local."
      ],
      "expectedIdeas": [
        "falha local",
        "VLAN errada",
        "gateway inacessível",
        "cabo/Wi-Fi",
        "máscara/gateway incorretos"
      ],
      "explanation": "Sem resolver o MAC do gateway, o problema ocorre antes de DNS e aplicação."
    },
    {
      "type": "cenário real",
      "question": "O MAC do gateway muda durante o dia. Como investigar sem assumir ataque imediatamente?",
      "hints": [
        "Pense em HA.",
        "Pense em documentação e correlação."
      ],
      "expectedIdeas": [
        "verificar HSRP/VRRP",
        "consultar switch",
        "DHCP/NAC/logs",
        "janela de mudança",
        "IP duplicado"
      ],
      "explanation": "Mudança de MAC pode ser legítima em alta disponibilidade, mas precisa de contexto e evidência."
    }
  ],
  "quiz": [
    {
      "id": "q3.6.1",
      "type": "conceito",
      "q": "Qual é a função principal do cache ARP?",
      "opts": [
        "Guardar associações temporárias entre IPv4 e MAC na rede local",
        "Resolver nomes DNS para IPs públicos",
        "Criptografar frames Ethernet",
        "Substituir a tabela de rotas"
      ],
      "a": 0,
      "exp": "Cache ARP guarda associações IP-MAC aprendidas localmente para reduzir broadcast e acelerar comunicação.",
      "difficulty": "iniciante",
      "topic": "cache ARP"
    },
    {
      "id": "q3.6.2",
      "type": "diagnóstico",
      "q": "Um host não pinga o gateway e a entrada ARP do gateway fica incompleta. Qual hipótese é mais coerente?",
      "opts": [
        "Falha de resolução local para o gateway",
        "Erro HTTP 500 no servidor",
        "Senha incorreta no sistema",
        "Certificado TLS expirado"
      ],
      "a": 0,
      "exp": "Entrada incompleta indica que o host tentou resolver o MAC e não recebeu resposta ARP.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q3.6.3",
      "type": "segurança",
      "q": "Por que MAC não deve ser tratado como identidade forte?",
      "opts": [
        "Porque pode ser alterado ou falsificado em alguns contextos",
        "Porque MAC só existe em HTTP",
        "Porque MAC substitui certificado digital",
        "Porque MAC é sempre público na internet"
      ],
      "a": 0,
      "exp": "MAC é evidência local útil, mas não autenticação forte por si só.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q3.6.4",
      "type": "comparação",
      "q": "Se o gateway responde ao ping, mas nomes de sites não resolvem, qual camada deve ser investigada em seguida?",
      "opts": [
        "DNS/camada de aplicação ou serviço de nomes",
        "Camada física obrigatoriamente",
        "Troca de cabo sempre",
        "ARP spoofing certamente"
      ],
      "a": 0,
      "exp": "Se o gateway responde, a resolução local provavelmente funcionou; o próximo passo pode ser DNS.",
      "difficulty": "iniciante",
      "topic": "camadas"
    },
    {
      "id": "q3.6.5",
      "type": "cenário",
      "q": "O mesmo IP aparece com dois MACs diferentes em coletas próximas. Qual ação é adequada?",
      "opts": [
        "Correlacionar com DHCP, switch, NAC e documentação de HA",
        "Ignorar sempre",
        "Apagar todos os switches",
        "Concluir imediatamente que é DNS"
      ],
      "a": 0,
      "exp": "MAC variável para o mesmo IP precisa de contexto: HA, troca, IP duplicado ou abuso local.",
      "difficulty": "intermediário",
      "topic": "investigação"
    },
    {
      "id": "q3.6.6",
      "type": "comando",
      "q": "Qual comando em Linux mostra vizinhos ARP/NDP?",
      "opts": [
        "ip neigh",
        "route print",
        "show arp",
        "net user"
      ],
      "a": 0,
      "exp": "Em Linux moderno, ip neigh mostra entradas de vizinhança, incluindo ARP para IPv4.",
      "difficulty": "iniciante",
      "topic": "Linux"
    }
  ],
  "flashcards": [
    {
      "id": "fc3.6.1",
      "front": "O que é cache ARP?",
      "back": "Tabela temporária que associa IPv4 a MAC na rede local.",
      "tags": [
        "arp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.6.2",
      "front": "Entrada ARP incompleta sugere o quê?",
      "back": "O host tentou resolver o MAC, mas não recebeu resposta ARP válida.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.6.3",
      "front": "Limpar cache ARP resolve causa raiz?",
      "back": "Normalmente não. É teste ou mitigação temporária; a causa deve ser investigada.",
      "tags": [
        "operação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.6.4",
      "front": "MAC do gateway mudando sempre é ataque?",
      "back": "Não. Pode ser HA, troca planejada, IP duplicado ou comportamento suspeito. Exige correlação.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc3.6.5",
      "front": "Qual comando Windows lista cache ARP?",
      "back": "arp -a.",
      "tags": [
        "windows"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc3.6.6",
      "front": "Qual controle ajuda a mitigar manipulação ARP em switches?",
      "back": "Dynamic ARP Inspection, normalmente combinado com DHCP snooping.",
      "tags": [
        "hardening"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex3.6.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre DNS e ARP usando um exemplo de acesso a um site.",
      "expectedAnswer": "DNS resolve nome para IP; ARP resolve o IP do próximo salto local, normalmente o gateway, para MAC.",
      "explanation": "O acesso a site pode depender de ambos, mas em camadas diferentes."
    },
    {
      "id": "ex3.6.2",
      "type": "diagnóstico",
      "prompt": "Um host tem gateway configurado, mas a entrada ARP do gateway aparece como incompleta. Liste três hipóteses.",
      "expectedAnswer": "Gateway indisponível, VLAN errada, problema físico/Wi-Fi, máscara/gateway incorretos, isolamento ou bloqueio local.",
      "explanation": "A falha ocorre antes de DNS e aplicação."
    },
    {
      "id": "ex3.6.3",
      "type": "segurança",
      "prompt": "Liste três evidências que você coletaria antes de afirmar que há manipulação ARP.",
      "expectedAnswer": "ARP de múltiplos hosts, tabela MAC do switch, DHCP/NAC, logs de DAI/port security, documentação de HA e janela de mudança.",
      "explanation": "Uma única tabela ARP pode gerar falso positivo."
    },
    {
      "id": "ex3.6.4",
      "type": "arquitetura",
      "prompt": "Por que VLANs ajudam a reduzir o impacto de problemas com ARP?",
      "expectedAnswer": "Porque limitam o domínio de broadcast e reduzem o número de hosts alcançados por ARP dentro de um segmento.",
      "explanation": "VLAN não autentica ARP, mas reduz escopo e facilita controle."
    }
  ],
  "challenge": {
    "title": "Investigue intermitência local sem culpar DNS cedo demais",
    "scenario": "Uma equipe relata que o sistema interno fica inacessível de forma intermitente. O gateway às vezes responde, às vezes não. Dois analistas anteriores limparam cache ARP e disseram que resolveu, mas o problema voltou.",
    "tasks": [
      "Criar uma sequência de diagnóstico por camadas.",
      "Definir evidências mínimas no host, switch, gateway e DHCP/NAC.",
      "Explicar como diferenciar IP duplicado, VLAN errada, HA legítimo e abuso ARP defensivo.",
      "Propor mitigação sem ações ofensivas."
    ],
    "constraints": [
      "Não executar spoofing.",
      "Não derrubar portas sem aprovação.",
      "Sanitizar evidências.",
      "Não alterar firewall antes de provar a camada local."
    ],
    "expectedDeliverables": [
      "Matriz de evidências",
      "Hipóteses priorizadas",
      "Plano de validação",
      "Riscos e mitigação",
      "Resumo executivo para gestor"
    ],
    "gradingRubric": [
      {
        "criterion": "Sequência por camadas",
        "points": 25,
        "description": "Valida IP, gateway, ARP, switch e só depois DNS/aplicação."
      },
      {
        "criterion": "Correlação de evidências",
        "points": 25,
        "description": "Usa host, switch, gateway, DHCP/NAC e documentação."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 25,
        "description": "Inclui mitigação sem instruções ofensivas."
      },
      {
        "criterion": "Clareza operacional",
        "points": 25,
        "description": "Entrega relatório claro, sanitizado e acionável."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O erro comum é confundir sintoma com causa. Se o gateway falha intermitentemente, DNS e aplicação podem ser vítimas, não causa. A investigação deve começar pela configuração local e pela resolução do próximo salto.",
    "steps": [
      "Coletar IP, máscara, gateway e interface.",
      "Consultar ARP antes/depois de pingar o gateway.",
      "Comparar MAC do gateway com documentação e outros hosts.",
      "Consultar switch para MAC table, VLAN e flapping.",
      "Consultar DHCP/NAC para conflito de IP ou troca de ativo.",
      "Verificar HA legítimo antes de classificar como suspeito.",
      "Propor correção: documentação, segmentação, DAI, DHCP snooping, port security, 802.1X e correção de conflito."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar DNS imediatamente.",
        "whyItIsWrong": "DNS não explica gateway inacessível ou ARP incompleto."
      },
      {
        "answer": "Limpar cache ARP como solução final.",
        "whyItIsWrong": "Pode mascarar a causa raiz e o problema retorna."
      },
      {
        "answer": "Assumir ataque sem verificar HA.",
        "whyItIsWrong": "Gateways redundantes podem usar MAC virtual ou mudança legítima."
      }
    ],
    "finalAnswer": "A resposta correta é tratar cache ARP como evidência local temporária, correlacioná-la com switch, gateway, DHCP/NAC e documentação, e só então propor correção operacional ou controle defensivo."
  },
  "glossary": [
    {
      "term": "Cache ARP",
      "shortDefinition": "Tabela temporária de associações IPv4-MAC.",
      "longDefinition": "Estrutura mantida por hosts e equipamentos para reutilizar resoluções ARP sem novo broadcast a cada comunicação.",
      "example": "192.168.10.1 associado a bb:bb:bb:bb:bb:bb.",
      "relatedTerms": [
        "ARP",
        "MAC",
        "gateway"
      ],
      "relatedLessons": [
        "3.5",
        "3.6",
        "3.7"
      ]
    },
    {
      "term": "Entrada incompleta",
      "shortDefinition": "Estado em que a resolução ARP ainda não obteve MAC.",
      "longDefinition": "Indica que o host tentou resolver um IP local ou gateway, mas ainda não recebeu resposta válida.",
      "example": "ip neigh mostra INCOMPLETE para o gateway.",
      "relatedTerms": [
        "ARP Request",
        "troubleshooting"
      ],
      "relatedLessons": [
        "3.5",
        "3.6"
      ]
    },
    {
      "term": "MAC flapping",
      "shortDefinition": "Mesmo MAC alternando entre portas de switch.",
      "longDefinition": "Pode indicar loop, equipamento conectado indevidamente, virtualização, trunk incorreto ou instabilidade.",
      "example": "Switch registra o MAC do gateway em portas diferentes.",
      "relatedTerms": [
        "switch",
        "tabela MAC"
      ],
      "relatedLessons": [
        "3.3",
        "3.6",
        "3.8"
      ]
    },
    {
      "term": "IP duplicado",
      "shortDefinition": "Dois dispositivos usando o mesmo endereço IP.",
      "longDefinition": "Causa intermitência porque hosts podem alternar a associação ARP para MACs diferentes.",
      "example": "192.168.10.50 aparece com dois MACs distintos.",
      "relatedTerms": [
        "DHCP",
        "ARP"
      ],
      "relatedLessons": [
        "3.6",
        "4.0"
      ]
    },
    {
      "term": "Dynamic ARP Inspection",
      "shortDefinition": "Controle de switch para validar ARP em redes Ethernet.",
      "longDefinition": "Recurso que usa informações confiáveis, geralmente do DHCP snooping, para bloquear respostas ARP inconsistentes.",
      "example": "Switch bloqueia ARP Reply não autorizado.",
      "relatedTerms": [
        "DHCP snooping",
        "port security"
      ],
      "relatedLessons": [
        "3.6",
        "3.9"
      ]
    },
    {
      "term": "Gateway virtual",
      "shortDefinition": "Endereço gateway representado por mecanismo de alta disponibilidade.",
      "longDefinition": "Em protocolos como HSRP/VRRP, hosts usam um gateway lógico que pode estar ativo em equipamentos diferentes.",
      "example": "MAC virtual do gateway muda após failover planejado.",
      "relatedTerms": [
        "HA",
        "VRRP",
        "HSRP"
      ],
      "relatedLessons": [
        "3.6",
        "11.0"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 826 — An Ethernet Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência clássica do ARP."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 3.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula anterior sobre ARP Request e ARP Reply."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1X e controles de acesso em LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para autenticação de acesso em redes cabeadas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e automação",
      "lesson": "a definir",
      "reason": "Troubleshooting padronizado pode virar runbook automatizado e coleta de evidências em pipelines/ops."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Identidade de dispositivos e acesso condicional",
      "lesson": "a definir",
      "reason": "MAC sozinho não é identidade forte; NAC e 802.1X relacionam dispositivo, usuário e política."
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
      "3.7"
    ]
  }
};
