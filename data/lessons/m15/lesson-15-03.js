export const lesson1503 = {
  "id": "15.3",
  "moduleId": "m15",
  "order": 3,
  "title": "Troubleshooting físico, LAN, VLAN e camada 2",
  "subtitle": "Como diagnosticar cabo, porta, negociação, VLAN, trunk, tabela MAC, STP, loops e sintomas de LAN antes de culpar DNS, firewall ou aplicação — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "180-240 min",
  "estimatedStudyTimeMinutes": 240,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "troubleshooting",
    "camada 1",
    "camada 2",
    "Ethernet",
    "LAN",
    "VLAN",
    "trunk",
    "802.1Q",
    "STP",
    "MAC address table",
    "ARP",
    "DHCP",
    "switching",
    "segurança",
    "SOC",
    "caso real",
    "hipótese-evidência",
    "runbook",
    "war room",
    "RCA"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.1",
      "title": "Mentalidade de troubleshooting profissional",
      "reason": "A mentalidade profissional de troubleshooting define hipótese, escopo e evidência."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "title": "Coleta de evidências, baseline e linha do tempo",
      "reason": "A coleta de evidências, baseline e timeline é base para não alterar camada 2 sem controle."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m03",
      "reason": "Esta aula assume compreensão conceitual de quadros Ethernet, endereços MAC, VLANs e domínios de broadcast."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.3",
      "title": "Hardening de Switches, Roteadores, Firewalls, APs e Hosts",
      "reason": "Hardening de switches e equipamentos de rede ajuda a diferenciar falha operacional de exposição insegura."
    }
  ],
  "objectives": [
    "Diagnosticar problemas físicos e de porta usando evidências e contadores.",
    "Diferenciar falha de access VLAN, trunk, native VLAN e VLAN não permitida.",
    "Interpretar aprendizado MAC, flooding, MAC flapping e sintomas de loop.",
    "Usar STP como fonte de evidência para topologia e bloqueios.",
    "Relacionar falhas de DHCP, ARP e gateway com causas de Layer 2.",
    "Definir mitigação segura e rollback para incidentes LAN.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um host sem DHCP, o aluno cria uma sequência de validação L1/L2 antes de culpar o servidor.",
    "Dado um trunk com falha parcial, o aluno identifica VLAN ausente, native VLAN inconsistente ou STP bloqueando caminho.",
    "Dado MAC flapping, o aluno relaciona sintomas a loop, redundância incorreta ou equipamento indevido.",
    "Dado erro intermitente em um andar, o aluno separa hipótese física, VLAN, trunk, STP e capacidade.",
    "Dado um evento de segurança L2, o aluno propõe controles defensivos sem interromper produção desnecessariamente.",
    "Dado o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Quando uma rede corporativa “cai”, muita gente corre diretamente para DNS, firewall, cloud ou aplicação. Mas uma quantidade enorme de incidentes começa em algo mais básico: cabo, porta, negociação, VLAN errada, trunk mal configurado, loop, tempestade de broadcast, tabela MAC instável ou STP bloqueando o caminho esperado.</p>\n  <p>Camada 2 é perigosa porque parece simples. Ela não tem o glamour de Kubernetes, Zero Trust ou BGP, mas é o chão onde muitos ambientes ainda se apoiam: estações, impressoras, telefones IP, access points, switches de acesso, uplinks, servidores locais, hypervisors, storage, firewalls e links entre racks.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um analista que ignora Layer 1 e Layer 2 pode passar horas investigando DNS ou aplicação quando a causa era uma porta em err-disable, uma VLAN não permitida no trunk, um cabo ruim ou uma mudança de STP.</div>\n  <p>A motivação desta aula é formar um raciocínio profissional para troubleshooting físico, LAN, VLAN e camada 2. Você vai aprender a olhar para sintomas aparentemente confusos e transformá-los em perguntas verificáveis.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n\n  <p>As primeiras redes locais corporativas eram pequenas e frequentemente compartilhavam o mesmo meio físico. Com o crescimento das empresas, switches substituíram hubs, VLANs separaram domínios de broadcast, trunks permitiram transportar múltiplas VLANs entre switches e Spanning Tree Protocol surgiu como mecanismo de sobrevivência contra loops de camada 2.</p>\n  <p>Essa evolução resolveu vários problemas, mas criou novas classes de falhas. Agora uma estação pode estar fisicamente conectada, mas logicamente presa na VLAN errada. Um uplink pode estar ativo, mas sem transportar a VLAN necessária. Um loop pode derrubar uma rede inteira sem nenhum servidor ter falhado. Um erro de duplex pode deixar o link “up”, porém terrivelmente lento.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Hubs:</strong> meio compartilhado, colisões e baixa segmentação.</div><div class=\"timeline-item\"><strong>Switches:</strong> aprendizado MAC, domínios de colisão separados e encaminhamento seletivo.</div><div class=\"timeline-item\"><strong>VLANs:</strong> separação lógica de domínios de broadcast.</div><div class=\"timeline-item\"><strong>Trunks:</strong> transporte de múltiplas VLANs por um mesmo enlace.</div><div class=\"timeline-item\"><strong>STP/RSTP:</strong> prevenção de loops em topologias redundantes.</div></div>\n  <p>Hoje, mesmo em ambientes cloud e DevSecOps, esse conhecimento continua importante: escritórios, datacenters, firewalls físicos, access points, SD-WAN appliances, switches de borda, links dedicados e laboratórios ainda dependem de Ethernet, VLANs e portas bem configuradas.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema técnico desta aula é diagnosticar falhas em que o cabo pode estar conectado, o LED pode estar aceso, o IP pode existir, mas a comunicação ainda falha ou fica instável.</p>\n  <p>Alguns sintomas típicos:</p>\n  <ul>\n    <li>host não recebe DHCP em uma sala específica;</li>\n    <li>usuários de uma VLAN acessam a internet, mas não acessam servidores internos;</li>\n    <li>um access point sobe, mas clientes entram na VLAN errada;</li>\n    <li>um trunk entre switches não carrega determinada VLAN;</li>\n    <li>rede fica lenta em rajadas e depois volta;</li>\n    <li>MAC address muda de porta repetidamente;</li>\n    <li>porta entra em err-disable após conectar um equipamento;</li>\n    <li>um link aparece up, mas com muitos CRC, drops ou colisões;</li>\n    <li>STP bloqueia um caminho inesperado;</li>\n    <li>broadcast, multicast ou unknown unicast consomem a LAN.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha:</strong> “link up” não significa “rede saudável”. Link up só indica que existe sinal suficiente para a camada física negociar algum estado. Não prova VLAN, trunk, STP, MAC learning, ARP, DHCP ou política correta.</div>\n\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: VLAN de atendimento sem DHCP e MAC flapping no switch de acesso</h3>\n  <p><strong>Sintoma observado:</strong> Usuários de uma sala não recebem IP ou recebem APIPA; alguns telefones IP reiniciam e o switch registra MAC flapping.</p>\n  <p><strong>Impacto operacional:</strong> Atendimento ao cliente interrompido e risco de loop ou conexão indevida entre switches.</p>\n  <p><strong>Fluxo esperado:</strong> Host → porta access → VLAN → trunk → gateway/SVI → relay DHCP → servidor DHCP</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>07:40: mudança física na sala</li><li>08:05: primeiros APIPA</li><li>08:12: alertas de MAC flapping</li><li>08:18: DHCP sem novas concessões na VLAN</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Access VLAN errada</td><td>Host cai em VLAN sem DHCP</td><td>show interfaces switchport</td><td>Alta</td></tr><tr><td>Trunk sem VLAN</td><td>VLAN não atravessa uplink</td><td>show interfaces trunk</td><td>Alta</td></tr><tr><td>Loop/MAC flapping</td><td>MAC muda entre portas</td><td>show mac address-table / logs STP</td><td>Alta</td></tr><tr><td>DHCP relay</td><td>Discover não chega ao servidor</td><td>show ip helper / captura DHCP</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n\n  <p>O troubleshooting de LAN evolui de uma checagem visual para uma investigação orientada por camadas e evidências. O profissional maduro não começa perguntando “qual comando eu rodo?”, mas sim “em qual ponto do fluxo a comunicação deixa de corresponder ao baseline?”.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Nível</th><th>Foco</th><th>Risco</th><th>Maturidade esperada</th></tr></thead>\n    <tbody>\n      <tr><td>Físico</td><td>Cabo, patch panel, transceiver, speed, duplex, energia, PoE.</td><td>Trocar peças sem registrar evidência.</td><td>Verificar estado, contadores e histórico da porta.</td></tr>\n      <tr><td>Porta</td><td>Modo access/trunk, VLAN nativa, VLAN permitida, err-disable.</td><td>Alterar VLAN em produção sem rollback.</td><td>Comparar configuração esperada e efetiva.</td></tr>\n      <tr><td>Comutação</td><td>MAC address table, flooding, aging, flapping.</td><td>Confundir MAC learning com ARP.</td><td>Seguir origem, destino e porta aprendida.</td></tr>\n      <tr><td>Controle L2</td><td>STP, loops, root bridge, bloqueios e convergência.</td><td>Desligar proteções para “resolver rápido”.</td><td>Entender topologia e evitar loops.</td></tr>\n      <tr><td>Integração</td><td>DHCP, ARP, gateway, firewall, Wi-Fi, hypervisor e cloud edge.</td><td>Culpar camada errada.</td><td>Relacionar L2 com L3 e serviços.</td></tr>\n    </tbody>\n  </table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Troubleshooting físico e de camada 2</strong> é o processo de validar se o meio físico, a porta, a VLAN, a tabela MAC, o domínio de broadcast e os mecanismos de prevenção de loop estão funcionando conforme a topologia esperada.</p>\n  <p>Para esta aula, pense em cinco perguntas centrais:</p>\n  <ol>\n    <li>O meio físico está íntegro e negociou corretamente?</li>\n    <li>A porta está no modo correto: access ou trunk?</li>\n    <li>A VLAN esperada existe, está ativa e é transportada onde precisa?</li>\n    <li>O switch aprende o MAC do host na porta correta e na VLAN correta?</li>\n    <li>Existe loop, bloqueio STP, flapping, flooding excessivo ou tempestade de broadcast?</li>\n  </ol>\n  <p>Camada 2 trabalha com quadros Ethernet, endereços MAC, VLAN tags, aprendizado, flooding seletivo e decisão local de encaminhamento. Ela não “roteia” entre redes. Quando o tráfego precisa sair da VLAN, entra a camada 3 por meio de gateway, roteador, firewall ou SVI.</p>\n  <div class=\"callout callout--info\"><strong>Ligação com aulas anteriores:</strong> esta aula depende de Ethernet, ARP, VLAN, switching e STP vistos nos fundamentos de Redes. Ela também prepara as aulas 15.4 e 15.7, porque muitos problemas de IP e firewall começam com uma base L2 incorreta.</div>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Um switch Ethernet aprende endereços MAC observando o endereço de origem dos quadros que entram em suas portas. Se um quadro chega pela porta Gi1/0/10 com MAC de origem <code>AA:AA:AA:AA:AA:AA</code> na VLAN 20, o switch registra que aquele MAC está alcançável por essa porta e por essa VLAN.</p>\n  <p>Quando precisa encaminhar um quadro, o switch consulta a tabela MAC:</p>\n  <ul>\n    <li>se conhece o MAC de destino naquela VLAN, encaminha pela porta aprendida;</li>\n    <li>se não conhece, faz flooding dentro da VLAN;</li>\n    <li>se o destino é broadcast, replica dentro do domínio de broadcast;</li>\n    <li>se há tag 802.1Q, interpreta a VLAN marcada no trunk;</li>\n    <li>se a porta é access, trata o quadro como pertencente à VLAN configurada naquela porta.</li>\n  </ul>\n  <p>Quando existe redundância física, links paralelos podem criar loop. Como Ethernet não possui TTL como IP, quadros podem circular indefinidamente. O STP escolhe caminhos ativos e bloqueia enlaces redundantes para impedir loops. Isso protege a rede, mas também significa que uma mudança de topologia pode alterar o caminho de forma inesperada.</p>\n  <p>Os contadores de interface são evidências fundamentais: CRC, input errors, output drops, late collisions, runts, giants, flaps e resets ajudam a diferenciar cabo ruim, óptica defeituosa, congestionamento, duplex mismatch, MTU incorreta ou hardware instável.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura LAN típica possui camadas funcionais:</p>\n  <ul>\n    <li><strong>Acesso:</strong> onde ficam usuários, impressoras, telefones IP, APs e câmeras.</li>\n    <li><strong>Distribuição:</strong> onde VLANs são agregadas, políticas são aplicadas e redundância é organizada.</li>\n    <li><strong>Core:</strong> camada de alto desempenho para interligação entre blocos, datacenter e borda.</li>\n    <li><strong>Borda:</strong> firewalls, roteadores, SD-WAN, links externos, VPN e saída para cloud.</li>\n    <li><strong>Serviços locais:</strong> DHCP, DNS, autenticação, NTP, controladoras Wi-Fi e monitoramento.</li>\n  </ul>\n  <p>Em troubleshooting, você precisa mapear o caminho real: host → tomada → patch panel → switch de acesso → trunk/uplink → distribuição/core → gateway → firewall → destino. Um erro em qualquer ponto pode parecer problema de aplicação.</p>\n  <div class=\"callout callout--tip\"><strong>Regra prática:</strong> antes de investigar L7, confirme L1/L2 no caminho afetado. Sem isso, você pode desperdiçar tempo analisando sintomas de camadas superiores causados por perda, flapping ou VLAN incorreta.</div>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Pense em um prédio corporativo. O cabo é o corredor físico. A porta do switch é a porta da sala. A VLAN é o crachá que define a qual setor a pessoa pertence. O trunk é um elevador que transporta pessoas de vários setores, desde que cada uma esteja identificada corretamente. O switch é a recepção que aprende onde cada pessoa costuma estar.</p>\n  <p>Se alguém está no andar certo, mas com crachá errado, ele pode entrar em salas indevidas ou não acessar seu próprio setor. Se o elevador não aceita determinado crachá, aquela pessoa nunca chega ao destino. Se duas rotas de corredores criam um ciclo sem controle, as pessoas podem ficar andando em círculos. O STP é a sinalização que fecha um corredor redundante para evitar caos.</p>\n  <p>O técnico amador olha apenas se a porta está aberta. O profissional pergunta: a pessoa está no prédio certo, no setor certo, com crachá certo, usando elevador certo, e o mapa do prédio está consistente?</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Um usuário conecta o notebook em uma tomada de rede e não recebe IP por DHCP. O impulso inicial pode ser reiniciar o notebook ou culpar o servidor DHCP. Um troubleshooting melhor seguiria:</p>\n  <ol>\n    <li>verificar se a interface do notebook está ativa;</li>\n    <li>verificar cabo, tomada e link na porta do switch;</li>\n    <li>confirmar em qual porta física a tomada termina;</li>\n    <li>validar se a porta está na VLAN correta;</li>\n    <li>verificar se a VLAN existe e está ativa no switch;</li>\n    <li>confirmar se o uplink transporta essa VLAN;</li>\n    <li>checar se o switch aprende o MAC do notebook;</li>\n    <li>validar se DHCP broadcast chega ao relay ou servidor;</li>\n    <li>comparar com outro ponto de rede no mesmo andar.</li>\n  </ol>\n  <p>Se o MAC aparece na VLAN 30, mas o usuário deveria estar na VLAN 20, a falha não é DHCP: é VLAN de acesso incorreta.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em uma empresa com matriz e filial, usuários de um andar inteiro relatam lentidão e quedas intermitentes. O monitoramento mostra perda em rajadas, mas servidores continuam saudáveis. A investigação encontra muitos erros CRC em um uplink entre switch de acesso e distribuição, além de mudanças frequentes de STP.</p>\n  <p>Uma abordagem profissional separa hipóteses:</p>\n  <ul>\n    <li><strong>Hipótese física:</strong> cabo, fibra, transceiver ou patch cord com erro.</li>\n    <li><strong>Hipótese de configuração:</strong> trunk não carrega todas as VLANs ou native VLAN inconsistente.</li>\n    <li><strong>Hipótese de loop:</strong> switch não gerenciado conectado em sala criou caminho redundante.</li>\n    <li><strong>Hipótese de capacidade:</strong> uplink saturado gerando drops.</li>\n    <li><strong>Hipótese de STP:</strong> root bridge inesperado ou reconvergência frequente.</li>\n  </ul>\n  <p>A solução não é sair trocando configuração. Primeiro coleta-se contadores, logs de interface, topologia, tabela MAC, eventos STP e baseline de tráfego. Só depois vem mitigação controlada.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Cloud reduz a quantidade de troubleshooting físico visível, mas não elimina Layer 2 do mundo real. O acesso de uma empresa à cloud pode passar por switch local, firewall, SD-WAN, roteador, link dedicado, cross-connect e equipamentos de provedor. Um erro de VLAN em handoff de link dedicado pode impedir uma conexão privada com a cloud mesmo quando BGP, firewall e rotas parecem corretamente planejados.</p>\n  <p>Exemplo: uma conexão dedicada com a cloud não estabelece sessão BGP. Antes de culpar ASN, senha MD5, rota ou provedor cloud, o time precisa confirmar se o circuito físico está up, se a VLAN do handoff está correta, se há tag esperada, se o equipamento local recebe quadros, se existem erros na interface e se a documentação do circuito bate com a configuração.</p>\n  <p>O aprendizado do Módulo 14 continua aqui: VPN, Direct Connect, ExpressRoute, Interconnect e peering podem falhar por causas locais de L1/L2 antes de qualquer problema de roteamento cloud.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>DevSecOps também depende de LAN. Um runner de pipeline em datacenter local pode perder acesso ao registry, ao repositório Git ou ao cluster Kubernetes porque sua porta foi movida para VLAN errada. Um hypervisor pode ficar sem acesso à storage network porque um trunk deixou de permitir a VLAN de storage. Uma mudança automatizada pode aplicar template de switch incorreto e derrubar uma filial.</p>\n  <p>Boas práticas para DevSecOps em camada 2 incluem:</p>\n  <ul>\n    <li>versionar templates de configuração de switch;</li>\n    <li>usar revisão por pares antes de mudar VLANs e trunks;</li>\n    <li>manter inventário de portas, patch panels e VLANs;</li>\n    <li>validar mudanças com janela, rollback e plano de teste;</li>\n    <li>monitorar eventos de interface, STP, MAC flapping e err-disable;</li>\n    <li>transformar incidentes recorrentes em controles preventivos.</li>\n  </ul>\n  <p>O objetivo não é automatizar erro mais rápido. É automatizar com evidência, validação e segurança.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Camada 2 também é superfície de ataque e de erro operacional. Uma porta access em VLAN errada pode expor rede administrativa. Um trunk indevido em porta de usuário pode permitir tráfego de VLANs não esperadas. Um switch não gerenciado conectado embaixo da mesa pode criar loop ou ampliar domínio de broadcast. Um rogue DHCP pode entregar gateway malicioso. Um ARP spoofing pode tentar desviar tráfego local.</p>\n  <p>Controles defensivos comuns incluem:</p>\n  <ul>\n    <li>desabilitar portas não usadas;</li>\n    <li>usar VLANs de acesso explícitas;</li>\n    <li>evitar trunks em portas de usuário;</li>\n    <li>usar BPDU Guard em portas de acesso quando aplicável;</li>\n    <li>usar DHCP Snooping, Dynamic ARP Inspection e port security onde fizer sentido operacional;</li>\n    <li>monitorar MAC flapping, mudanças STP e tempestades de broadcast;</li>\n    <li>integrar eventos de switching ao SIEM.</li>\n  </ul>\n  <div class=\"callout callout--security\"><strong>Visão defensiva:</strong> troubleshooting de L2 não deve ensinar “como atacar”, mas sim como reconhecer sintomas de erro, abuso ou configuração insegura e como restaurar uma postura segura.</div>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama abaixo mostra uma investigação de LAN partindo do host até o gateway, com pontos de evidência em camada física, VLAN, trunk, tabela MAC, STP e serviços auxiliares.</p>\n  <div class=\"diagram-container\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 1040 560\" role=\"img\" aria-labelledby=\"diag1503title diag1503desc\">\n      <title id=\"diag1503title\">Troubleshooting físico, LAN, VLAN e camada 2</title>\n      <desc id=\"diag1503desc\">Fluxo de investigação de host, cabo, switch de acesso, trunk, distribuição, gateway, DHCP e SIEM.</desc>\n      <defs>\n        <marker id=\"arrow1503\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n      </defs>\n      <rect x=\"30\" y=\"210\" width=\"130\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--client\" />\n      <text x=\"95\" y=\"244\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n      <text x=\"95\" y=\"268\" text-anchor=\"middle\" class=\"svg-small\">NIC / MAC</text>\n      <rect x=\"205\" y=\"210\" width=\"130\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--physical\" />\n      <text x=\"270\" y=\"244\" text-anchor=\"middle\" class=\"svg-label\">Cabo</text>\n      <text x=\"270\" y=\"268\" text-anchor=\"middle\" class=\"svg-small\">CRC / link</text>\n      <rect x=\"380\" y=\"185\" width=\"160\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n      <text x=\"460\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">Switch acesso</text>\n      <text x=\"460\" y=\"246\" text-anchor=\"middle\" class=\"svg-small\">access VLAN 20</text>\n      <text x=\"460\" y=\"270\" text-anchor=\"middle\" class=\"svg-small\">MAC table</text>\n      <text x=\"460\" y=\"294\" text-anchor=\"middle\" class=\"svg-small\">err-disable?</text>\n      <rect x=\"590\" y=\"185\" width=\"160\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--network\" />\n      <text x=\"670\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">Distribuição</text>\n      <text x=\"670\" y=\"246\" text-anchor=\"middle\" class=\"svg-small\">trunk 802.1Q</text>\n      <text x=\"670\" y=\"270\" text-anchor=\"middle\" class=\"svg-small\">VLAN permitida</text>\n      <text x=\"670\" y=\"294\" text-anchor=\"middle\" class=\"svg-small\">STP estado</text>\n      <rect x=\"805\" y=\"210\" width=\"150\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--gateway\" />\n      <text x=\"880\" y=\"244\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n      <text x=\"880\" y=\"268\" text-anchor=\"middle\" class=\"svg-small\">SVI / firewall</text>\n      <rect x=\"390\" y=\"390\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--service\" />\n      <text x=\"460\" y=\"420\" text-anchor=\"middle\" class=\"svg-label\">DHCP</text>\n      <text x=\"460\" y=\"442\" text-anchor=\"middle\" class=\"svg-small\">lease / relay</text>\n      <rect x=\"600\" y=\"390\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n      <text x=\"670\" y=\"420\" text-anchor=\"middle\" class=\"svg-label\">SIEM/NMS</text>\n      <text x=\"670\" y=\"442\" text-anchor=\"middle\" class=\"svg-small\">logs / traps</text>\n      <rect x=\"590\" y=\"50\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--warning\" />\n      <text x=\"670\" y=\"80\" text-anchor=\"middle\" class=\"svg-label\">Loop?</text>\n      <text x=\"670\" y=\"102\" text-anchor=\"middle\" class=\"svg-small\">broadcast storm</text>\n      <line x1=\"160\" y1=\"250\" x2=\"205\" y2=\"250\" class=\"svg-link\" marker-end=\"url(#arrow1503)\" />\n      <line x1=\"335\" y1=\"250\" x2=\"380\" y2=\"250\" class=\"svg-link\" marker-end=\"url(#arrow1503)\" />\n      <line x1=\"540\" y1=\"250\" x2=\"590\" y2=\"250\" class=\"svg-link\" marker-end=\"url(#arrow1503)\" />\n      <line x1=\"750\" y1=\"250\" x2=\"805\" y2=\"250\" class=\"svg-link\" marker-end=\"url(#arrow1503)\" />\n      <line x1=\"460\" y1=\"315\" x2=\"460\" y2=\"390\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1503)\" />\n      <line x1=\"670\" y1=\"315\" x2=\"670\" y2=\"390\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1503)\" />\n      <line x1=\"670\" y1=\"120\" x2=\"670\" y2=\"185\" class=\"svg-link svg-link--danger\" marker-end=\"url(#arrow1503)\" />\n      <circle cx=\"270\" cy=\"250\" r=\"18\" class=\"svg-pulse\" />\n      <text x=\"270\" y=\"256\" text-anchor=\"middle\" class=\"svg-small\">1</text>\n      <circle cx=\"460\" cy=\"250\" r=\"18\" class=\"svg-pulse\" />\n      <text x=\"460\" y=\"256\" text-anchor=\"middle\" class=\"svg-small\">2</text>\n      <circle cx=\"670\" cy=\"250\" r=\"18\" class=\"svg-pulse\" />\n      <text x=\"670\" y=\"256\" text-anchor=\"middle\" class=\"svg-small\">3</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratório\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula é um diagnóstico guiado de LAN. Você vai montar uma investigação de uma falha em que usuários de uma VLAN não recebem IP e alguns switches registram MAC flapping. O foco é método: coletar evidências antes de alterar configuração.</p>\n\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> VLAN de atendimento sem DHCP e MAC flapping no switch de acesso. <strong>Causa provável a ser comprovada ou descartada:</strong> Porta configurada na VLAN errada, trunk sem VLAN permitida, loop físico ou mini-switch não autorizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios reforçam a leitura de sintomas de camada física e camada 2. Responda conectando cada sintoma a uma hipótese e a uma evidência que poderia confirmá-la.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio é desenhar um plano de investigação para um andar inteiro com falha intermitente, distinguindo problema físico, VLAN, trunk, STP, loop, DHCP e gateway.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra como ordenar a investigação por impacto e por risco, começando com evidências não destrutivas e avançando para mitigação controlada.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Nesta aula, você aprendeu que falhas físicas e de camada 2 podem gerar sintomas parecidos com problemas de DNS, firewall, aplicação ou cloud. Link up não basta; é preciso verificar qualidade física, VLAN, trunk, MAC learning, STP e serviços auxiliares.</p>\n  <ul>\n    <li>contadores de interface revelam erros físicos e congestionamento;</li>\n    <li>porta access errada coloca o host no domínio lógico errado;</li>\n    <li>trunk sem VLAN permitida quebra comunicação entre switches;</li>\n    <li>MAC flapping sugere loop, redundância errada ou caminho instável;</li>\n    <li>STP protege contra loops, mas pode bloquear caminhos inesperados;</li>\n    <li>DHCP falhando pode ser sintoma de VLAN ou trunk, não do servidor;</li>\n    <li>segurança em L2 exige portas desabilitadas, trunks controlados e eventos monitorados;</li>\n    <li>troubleshooting profissional preserva evidências antes de mudar produção.</li>\n  </ul>\n\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Porta configurada na VLAN errada, trunk sem VLAN permitida, loop físico ou mini-switch não autorizado..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, <strong>15.4 — Troubleshooting IPv4, rotas, gateway e ICMP</strong>, você vai subir uma camada e investigar endereçamento, máscara, gateway, ARP, tabela de rotas, ICMP, roteamento local e caminhos entre subnets.</p>\n\n</section>"
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
      "IEEE 802.1Q",
      "STP",
      "RSTP",
      "ARP",
      "DHCP",
      "LLDP",
      "CDP",
      "SNMP",
      "Syslog"
    ],
    "relatedConcepts": [
      "Access port",
      "Trunk",
      "Native VLAN",
      "Allowed VLAN list",
      "MAC address table",
      "Flooding",
      "Broadcast domain",
      "STP root bridge",
      "BPDU",
      "Err-disable",
      "CRC",
      "Duplex mismatch",
      "Port security",
      "DHCP Snooping",
      "Dynamic ARP Inspection"
    ],
    "ports": [
      "Não aplicável diretamente a TCP/UDP; foco em portas físicas e lógicas de switch"
    ]
  },
  "lab": {
    "id": "lab-15.3",
    "title": "Caso guiado: VLAN de atendimento sem DHCP e MAC flapping no switch de acesso",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Usuários de uma sala não recebem IP ou recebem APIPA; alguns telefones IP reiniciam e o switch registra MAC flapping. Impacto: Atendimento ao cliente interrompido e risco de loop ou conexão indevida entre switches. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Host → porta access → VLAN → trunk → gateway/SVI → relay DHCP → servidor DHCP",
    "architecture": "Arquitetura investigada: Host → porta access → VLAN → trunk → gateway/SVI → relay DHCP → servidor DHCP. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
    "prerequisites": [
      "Ambiente de laboratório, simulação, Packet Tracer/GNS3/cloud de teste ou execução conceitual autorizada.",
      "Conhecimento dos módulos anteriores de Redes, Segurança e Cloud.",
      "Não alterar produção sem aprovação, janela, backup e rollback."
    ],
    "tools": [
      "Editor de texto para dossiê",
      "Planilha para matriz hipótese-evidência",
      "Windows PowerShell/CMD",
      "Linux terminal",
      "Wireshark ou tcpdump quando aplicável",
      "Logs de firewall/LB/DNS/cloud/SIEM quando disponíveis",
      "Terminal Linux",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "180-240 min",
    "cost": "zero se executado como simulação/local; baixo ou cloud-pago se reproduzido em provedor. Em cloud, remover recursos ao final.",
    "safetyNotes": [
      "Executar somente em ambiente autorizado.",
      "Não abrir regras amplas nem desativar controles como atalho.",
      "Preservar logs e evidências antes de mudanças.",
      "Sanitizar dados sensíveis em capturas e prints.",
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir escopo físico",
        "instruction": "Liste sala, tomadas, portas de switch, patch panel e usuários afetados.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Mapa físico mínimo.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Verificar estado da porta",
        "instruction": "Confira link, speed/duplex, erros, drops e última mudança de estado.",
        "command": "show interfaces status; show interfaces switchport; show interfaces trunk; show mac address-table dynamic; show spanning-tree vlan 30",
        "expectedOutput": "Evidência física sem trocar cabos aleatoriamente.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Validar VLAN de acesso",
        "instruction": "Compare configuração esperada da porta com padrão da sala.",
        "command": "ipconfig /all; arp -a; ping <gateway-da-vlan>",
        "expectedOutput": "Access VLAN correta ou divergência documentada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Validar trunk",
        "instruction": "Confirme se a VLAN passa pelo uplink até o gateway/relay.",
        "command": "ip addr; ip route; sudo tcpdump -ni <iface> \"arp or port 67 or port 68\"",
        "expectedOutput": "Trunk permitindo VLAN afetada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Analisar MAC flapping",
        "instruction": "Identifique MAC, portas envolvidas e frequência.",
        "command": "ip addr; ip route; sudo tcpdump -ni <iface> \"arp or port 67 or port 68\"",
        "expectedOutput": "Evidência de loop, equipamento indevido ou topologia errada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Observar DHCP",
        "instruction": "Capture Discover/Offer ou verifique logs do relay/servidor.",
        "command": "ip addr; ip route; sudo tcpdump -ni <iface> \"arp or port 67 or port 68\"",
        "expectedOutput": "Ponto onde o DHCP some.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Aplicar correção mínima",
        "instruction": "Corrija uma variável: VLAN, trunk, loop ou relay, com rollback.",
        "command": "ip addr; ip route; sudo tcpdump -ni <iface> \"arp or port 67 or port 68\"",
        "expectedOutput": "Correção controlada e validada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Criar RCA",
        "instruction": "Explique causa, detecção tardia, prevenção com port-security/BPDU guard/documentação.",
        "command": "ip addr; ip route; sudo tcpdump -ni <iface> \"arp or port 67 or port 68\"",
        "expectedOutput": "RCA com ação preventiva.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Cliente recebe IP correto",
        "command": "ipconfig /all ou ip addr",
        "expected": "IP da VLAN, gateway e DNS esperados.",
        "ifFails": "Volte à VLAN, trunk e relay DHCP."
      },
      {
        "check": "Sem MAC flapping",
        "command": "show logging | include MACFLAP|SPANTREE",
        "expected": "Ausência de novos eventos após correção.",
        "ifFails": "Inspecionar loop físico e dispositivos não autorizados."
      },
      {
        "check": "Gateway responde",
        "command": "ping <gateway-da-vlan>",
        "expected": "Resposta estável e ARP correto.",
        "ifFails": "Verificar SVI, ACL local e VLAN."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Porta up, mas sem IP",
        "probableCause": "VLAN errada ou trunk bloqueando VLAN",
        "howToConfirm": "Comparar switchport e trunk",
        "fix": "Corrigir VLAN/trunk conforme padrão aprovado."
      },
      {
        "symptom": "MAC aparece em duas portas",
        "probableCause": "Loop físico ou bridge não autorizada",
        "howToConfirm": "Tabela MAC e logs STP",
        "fix": "Isolar porta suspeita com mudança aprovada."
      },
      {
        "symptom": "DHCP funciona em outra sala",
        "probableCause": "Problema local de VLAN/caminho",
        "howToConfirm": "Comparar caminho afetado/não afetado",
        "fix": "Corrigir diferença específica, não reiniciar servidor DHCP."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "Mapa porta-tomada",
      "show interfaces status",
      "show interfaces trunk",
      "tabela MAC",
      "logs STP/MAC flapping",
      "captura DHCP",
      "validação pós-correção"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Monte um runbook para diagnosticar “sem IP na VLAN 30” sem reiniciar o servidor DHCP e sem trocar cabos às cegas.",
    "solution": "A investigação começa no caminho L2: porta, VLAN, trunk, STP e MAC. Só depois de provar que o Discover chega ao relay/servidor faz sentido culpar DHCP. A causa raiz deve explicar por que só aquela sala/VLAN falhou."
  },
  "exercises": [
    {
      "id": "ex15.3.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.3.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.3.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.3.p1.1",
      "type": "diagnóstico",
      "q": "No caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso”, qual atitude é mais profissional antes de alterar configuração?",
      "opts": [
        "Coletar evidências ligadas às hipóteses principais",
        "Reiniciar todos os equipamentos do caminho",
        "Liberar any-any temporariamente sem registro",
        "Apagar caches e logs para começar limpo"
      ],
      "a": 0,
      "exp": "A alteração deve vir depois de evidência suficiente, com escopo e rollback.",
      "difficulty": "intermediário",
      "topic": "método"
    },
    {
      "id": "q15.3.p1.2",
      "type": "evidência",
      "q": "O que diferencia evidência de opinião durante um incidente?",
      "opts": [
        "Evidência pode ser verificada por log, comando, métrica, captura ou configuração",
        "Evidência é a hipótese defendida pelo profissional mais experiente",
        "Evidência é qualquer relato de usuário",
        "Evidência é sempre um print de tela"
      ],
      "a": 0,
      "exp": "Relatos são importantes, mas evidência técnica precisa ser verificável e interpretada no contexto.",
      "difficulty": "iniciante",
      "topic": "evidência"
    },
    {
      "id": "q15.3.p1.3",
      "type": "segurança",
      "q": "Por que uma mitigação emergencial deve ter escopo, expiração e rollback?",
      "opts": [
        "Para evitar que uma exceção temporária vire risco permanente",
        "Para deixar a mudança mais lenta sem benefício",
        "Porque toda mitigação deve desligar logs",
        "Porque rollback só é necessário em cloud"
      ],
      "a": 0,
      "exp": "Mudanças emergenciais sem governança tendem a virar dívida operacional e vulnerabilidade.",
      "difficulty": "intermediário",
      "topic": "mitigação"
    },
    {
      "id": "q15.3.p1.4",
      "type": "RCA",
      "q": "Uma boa RCA deve conter:",
      "opts": [
        "Causa sustentada por evidências, fatores contribuintes e ações preventivas",
        "Apenas o comando que resolveu",
        "O nome da pessoa culpada",
        "Todos os logs brutos sem interpretação"
      ],
      "a": 0,
      "exp": "RCA transforma incidente em aprendizado operacional e melhoria do sistema.",
      "difficulty": "intermediário",
      "topic": "RCA"
    },
    {
      "question": "Qual é a primeira interpretação correta de uma porta em estado link up?",
      "options": [
        "A aplicação está saudável",
        "DNS está correto",
        "Existe estado físico negociado, mas ainda é preciso validar L2 e camadas superiores",
        "O firewall está liberando tráfego"
      ],
      "correctAnswer": 2,
      "explanation": "Link up é apenas uma evidência física inicial, não prova VLAN, trunk, MAC learning ou serviço."
    },
    {
      "question": "Um trunk não transporta a VLAN 20. Qual sintoma é plausível?",
      "options": [
        "Hosts dessa VLAN podem funcionar localmente, mas falhar ao cruzar switches",
        "Todos os protocolos TCP deixam de existir",
        "O cabo necessariamente fica down",
        "O DNS público muda automaticamente"
      ],
      "correctAnswer": 0,
      "explanation": "Se a VLAN não atravessa o trunk, a comunicação dessa VLAN entre switches falha mesmo com link físico ativo."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.3.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.3.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.3.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.3.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.3.p1.5",
      "front": "O que uma RCA não deve ser?",
      "back": "Não deve ser caça a culpados nem lista de comandos; deve explicar causa, fatores contribuintes e prevenção.",
      "tags": [
        "RCA",
        "postmortem"
      ],
      "difficulty": "iniciante"
    }
  ],
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual parte do caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” é sintoma e qual parte ainda é apenas hipótese?",
      "hints": [
        "Separe o que foi observado do que foi inferido.",
        "Procure frases que parecem causa sem evidência."
      ],
      "expectedIdeas": [
        "sintoma observável",
        "hipótese",
        "evidência",
        "escopo"
      ],
      "explanation": "A maturidade de troubleshooting começa quando o aluno para de tratar hipótese como fato."
    },
    {
      "type": "diagnóstico",
      "question": "Qual evidência você coletaria primeiro para reduzir mais incerteza nesse caso?",
      "hints": [
        "Prefira evidência não destrutiva.",
        "Escolha algo que diferencie duas hipóteses fortes."
      ],
      "expectedIdeas": [
        "comando",
        "log",
        "métrica",
        "captura",
        "comparação afetado/não afetado"
      ],
      "explanation": "A primeira evidência deve separar caminhos de investigação, não apenas gerar mais dados."
    },
    {
      "type": "cenário real",
      "question": "Que mitigação temporária reduz impacto sem aumentar demais o risco de segurança?",
      "hints": [
        "Evite any-any.",
        "Defina escopo, expiração, monitoramento e rollback."
      ],
      "expectedIdeas": [
        "mitigação limitada",
        "aprovação",
        "rollback",
        "monitoramento",
        "menor privilégio"
      ],
      "explanation": "Incidentes pressionam por atalhos; o profissional reduz impacto preservando controle."
    }
  ],
  "challenge": {
    "title": "Desafio P1 — VLAN de atendimento sem DHCP e MAC flapping no switch de acesso",
    "scenario": "Usuários de uma sala não recebem IP ou recebem APIPA; alguns telefones IP reiniciam e o switch registra MAC flapping.",
    "tasks": [
      "Montar problem statement.",
      "Construir matriz afetado/não afetado.",
      "Criar matriz hipótese-evidência.",
      "Executar ou simular comandos e coleta de logs.",
      "Definir mitigação com rollback.",
      "Produzir RCA com ações preventivas."
    ],
    "constraints": [
      "Não assumir causa sem evidência.",
      "Não usar mudança ampla como primeira resposta.",
      "Toda conclusão deve apontar para comando, log, métrica, captura ou configuração.",
      "Toda mitigação deve ter escopo e rollback."
    ],
    "expectedDeliverables": [
      "Dossiê do incidente",
      "Matriz hipótese-evidência",
      "Linha do tempo",
      "Plano de validação",
      "RCA",
      "Runbook atualizado"
    ],
    "gradingRubric": [
      {
        "criterion": "Escopo e problem statement",
        "points": 15,
        "description": "Delimita afetados, serviço, janela e sintoma sem causa prematura."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Liga hipóteses a evidências verificáveis e interpreta resultados corretamente."
      },
      {
        "criterion": "Mitigação segura",
        "points": 20,
        "description": "Reduz impacto sem criar exposição ampla, com rollback e monitoramento."
      },
      {
        "criterion": "RCA",
        "points": 25,
        "description": "Explica causa, fatores contribuintes e prevenção com dono e critério de aceite."
      },
      {
        "criterion": "Comunicação",
        "points": 15,
        "description": "Comunica impacto, estado e próximas ações com clareza."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A investigação começa no caminho L2: porta, VLAN, trunk, STP e MAC. Só depois de provar que o Discover chega ao relay/servidor faz sentido culpar DHCP. A causa raiz deve explicar por que só aquela sala/VLAN falhou.",
    "steps": [
      "Começar pelo sintoma observável e escopo.",
      "Desenhar o fluxo esperado.",
      "Priorizar hipóteses que explicam afetado e não afetado.",
      "Coletar evidências não destrutivas.",
      "Tomar decisão com base em evidência.",
      "Mitigar com escopo e rollback.",
      "Validar recuperação.",
      "Produzir RCA e ações preventivas."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar várias correções ao mesmo tempo.",
        "whyItIsWrong": "Pode recuperar o serviço, mas destrói a capacidade de saber a causa e cria risco de regressão."
      },
      {
        "answer": "Liberar tráfego amplo sem evidência.",
        "whyItIsWrong": "Aumenta superfície de ataque e transforma incidente operacional em risco de segurança."
      },
      {
        "answer": "Encerrar após o serviço voltar.",
        "whyItIsWrong": "Sem RCA e prevenção, a falha tende a voltar."
      }
    ],
    "finalAnswer": "A resposta correta para “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Access port",
      "shortDefinition": "Porta associada a uma VLAN de acesso.",
      "longDefinition": "Porta de switch normalmente usada por host final, onde quadros sem tag são classificados em uma VLAN configurada.",
      "example": "Porta de notebook configurada como access VLAN 20.",
      "relatedTerms": [
        "VLAN",
        "Switch"
      ],
      "relatedLessons": [
        "15.3"
      ]
    },
    {
      "term": "Trunk",
      "shortDefinition": "Enlace que transporta múltiplas VLANs.",
      "longDefinition": "Porta ou enlace que carrega tráfego de várias VLANs, geralmente com marcação IEEE 802.1Q.",
      "example": "Uplink entre switch de acesso e distribuição transportando VLANs 20, 30 e 99.",
      "relatedTerms": [
        "802.1Q",
        "Native VLAN"
      ],
      "relatedLessons": [
        "15.3",
        "14.8"
      ]
    },
    {
      "term": "MAC flapping",
      "shortDefinition": "MAC alternando entre portas.",
      "longDefinition": "Evento em que o mesmo endereço MAC é aprendido alternadamente em portas diferentes, sugerindo loop, caminho instável ou equipamento intermediário indevido.",
      "example": "O MAC de um host aparece ora na Gi1/0/10, ora no uplink Gi1/0/48.",
      "relatedTerms": [
        "loop",
        "STP"
      ],
      "relatedLessons": [
        "15.3",
        "13.7"
      ]
    },
    {
      "term": "STP",
      "shortDefinition": "Protocolo de prevenção de loop L2.",
      "longDefinition": "Spanning Tree Protocol calcula uma topologia lógica sem loops em redes Ethernet com enlaces redundantes.",
      "example": "STP bloqueia um uplink redundante para evitar tempestade de broadcast.",
      "relatedTerms": [
        "BPDU",
        "Root bridge"
      ],
      "relatedLessons": [
        "15.3"
      ]
    },
    {
      "term": "CRC error",
      "shortDefinition": "Erro de integridade de quadro.",
      "longDefinition": "Erro detectado na verificação de integridade do quadro Ethernet, frequentemente associado a problemas físicos ou de enlace.",
      "example": "A interface apresenta muitos CRC após troca de patch cord ruim.",
      "relatedTerms": [
        "Camada 1",
        "Interface errors"
      ],
      "relatedLessons": [
        "15.3"
      ]
    },
    {
      "term": "Native VLAN",
      "shortDefinition": "VLAN associada a tráfego sem tag em trunk.",
      "longDefinition": "Em alguns desenhos 802.1Q, é a VLAN usada para quadros não marcados em uma porta trunk, devendo ser tratada com cuidado para evitar inconsistência e exposição.",
      "example": "Trunk com native VLAN diferente nas duas pontas gera comportamento inesperado.",
      "relatedTerms": [
        "Trunk",
        "802.1Q"
      ],
      "relatedLessons": [
        "15.3",
        "12.7"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.3"
      ]
    },
    {
      "term": "Matriz hipótese-evidência",
      "shortDefinition": "Tabela que conecta hipóteses a evidências verificáveis.",
      "longDefinition": "Ferramenta de troubleshooting usada para priorizar testes, evitar achismo e registrar por que uma hipótese foi confirmada ou descartada.",
      "example": "Hipótese DNS deve apontar para evidências como resolvedor usado, resposta autoritativa, TTL e diferença entre origens.",
      "relatedTerms": [
        "evidência",
        "diagnóstico",
        "linha do tempo"
      ],
      "relatedLessons": [
        "15.1",
        "15.2",
        "15.3"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de explicar causa, fatores contribuintes, impacto, detecção, resposta e ações preventivas após um incidente.",
      "example": "Uma RCA madura não culpa pessoas; ela melhora processo, monitoramento, automação e validação.",
      "relatedTerms": [
        "postmortem",
        "runbook",
        "ação preventiva"
      ],
      "relatedLessons": [
        "15.12"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Troubleshoot Switch Port and Interface Problems",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-6500-series-switches/12027-53.html",
      "note": "Referência para investigação de problemas de porta, interface e contadores."
    },
    {
      "type": "official-doc",
      "title": "Troubleshoot STP Problems and Related Design Considerations",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/10556-16.html",
      "note": "Referência sobre STP, loops, design e problemas como duplex mismatch."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1Q-2018",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/ieee/802.1Q/6844/",
      "note": "Padrão de bridged networks, VLAN bridges e operação relacionada a VLANs."
    },
    {
      "type": "official-doc",
      "title": "Configure Inter-VLAN Routing with Catalyst Switches",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/inter-vlan-routing/41260-189.html",
      "note": "Inclui recomendações de troubleshooting como verificação de VLAN assignment e MAC address table."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 15.2 — Coleta de evidências, baseline e linha do tempo",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15/lesson-15-02",
      "note": "Base metodológica para esta aula."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting físico, LAN, VLAN e camada 2\".",
      "Preservar evidências antes de aplicar mudanças destrutivas ou rollback.",
      "Usar menor privilégio, segmentação e escopo explícito em qualquer teste prático.",
      "Registrar comandos, horários, origem, destino, resultado esperado e resultado observado.",
      "Transformar aprendizados em checklist, runbook, teste automatizado ou melhoria de monitoramento."
    ],
    "badPractices": [
      "Liberar any-any, desativar firewall, ignorar TLS ou remover controles sem evidência e aprovação.",
      "Executar vários ajustes ao mesmo tempo e depois não saber qual ação mudou o sintoma.",
      "Apagar caches, reiniciar serviços ou rotacionar logs antes de coletar evidências.",
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir mitigação com causa raiz.",
      "Confundir correlação temporal com prova de causalidade.",
      "Testar a partir de uma origem que não representa os usuários afetados.",
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar troubleshooting profissional, evidências, hipóteses, testes controlados, RCA e comunicação de incidentes com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Exceção emergencial permanente",
        "description": "No caso “VLAN de atendimento sem DHCP e MAC flapping no switch de acesso”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting físico, LAN, VLAN e camada 2",
              "description": "Em Troubleshooting físico, LAN, VLAN e camada 2, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
              "defensiveExplanation": "O risco aparece quando comandos, PCAPs, logs, métricas, rotas, DNS, firewall e mudanças recentes não são correlacionados em uma linha do tempo única.",
              "mitigation": "Coletar evidências mínimas antes de alterar, registrar horário/fonte/comando, testar uma hipótese por vez, manter plano de rollback, validar regressão e transformar achados recorrentes em runbooks."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Alertar mudanças emergenciais sem expiração.",
      "Correlacionar logs de rede, identidade, cloud e aplicação durante a janela do incidente.",
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
    ],
    "hardening": [
      "Padronizar runbooks de coleta antes de mudança.",
      "Exigir revisão pós-incidente com ações preventivas rastreáveis.",
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Detectar aumento súbito de regras temporárias, bypass TLS, queda de logs ou tráfego fora do baseline.",
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.3."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Usuários de uma sala não recebem IP ou recebem APIPA; alguns telefones IP reiniciam e o switch registra MAC flapping.",
      "Impacto: Atendimento ao cliente interrompido e risco de loop ou conexão indevida entre switches.",
      "Causa provável a validar: Porta configurada na VLAN errada, trunk sem VLAN permitida, loop físico ou mini-switch não autorizado.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting físico, LAN, VLAN e camada 2.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Quem é afetado e quem não é afetado?",
      "Qual hipótese explica melhor todos os sintomas sem contradizer evidências?",
      "Que evidência confirmaria ou negaria a hipótese mais provável?",
      "A mitigação proposta preserva segurança, logs e rollback?",
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 15.3?"
    ],
    "commands": [
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status; show interfaces switchport; show interfaces trunk; show mac address-table dynamic; show spanning-tree vlan 30",
        "purpose": "Validar porta, VLAN, trunk, tabela MAC e STP.",
        "expectedObservation": "Porta up, VLAN correta, trunk permitindo VLAN e ausência de flapping.",
        "interpretation": "Divergência em qualquer ponto explica falha antes de culpar servidor DHCP."
      },
      {
        "platform": "Windows",
        "command": "ipconfig /all; arp -a; ping <gateway-da-vlan>",
        "purpose": "Confirmar se cliente recebeu IP, gateway e consegue alcançar camada 3.",
        "expectedObservation": "IP correto da VLAN, gateway e ARP do gateway.",
        "interpretation": "APIPA ou gateway ausente aponta para DHCP/VLAN antes de rota."
      },
      {
        "platform": "Linux",
        "command": "ip addr; ip route; sudo tcpdump -ni <iface> \"arp or port 67 or port 68\"",
        "purpose": "Observar DHCP Discover/Offer e ARP.",
        "expectedObservation": "Discover saindo e Offer voltando.",
        "interpretation": "Discover sem Offer indica perda no caminho até DHCP ou relay."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Access VLAN errada” está com prioridade Alta e a evidência necessária é “show interfaces switchport”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Trunk sem VLAN” está com prioridade Alta e a evidência necessária é “show interfaces trunk”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Loop/MAC flapping” está com prioridade Alta e a evidência necessária é “show mac address-table / logs STP”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “DHCP relay” está com prioridade Média e a evidência necessária é “show ip helper / captura DHCP”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A evidência contradiz a hipótese favorita",
        "then": "Não force a conclusão. Atualize a matriz, registre a hipótese descartada e avance para a próxima explicação compatível com os sintomas."
      },
      {
        "if": "A mitigação proposta amplia acesso, desativa controle ou apaga evidência",
        "then": "Pausar, documentar risco, obter aprovação formal, reduzir escopo e definir rollback antes de agir."
      }
    ]
  },
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
      "15.4"
    ]
  },
  "diagnosticCase": {
    "title": "VLAN de atendimento sem DHCP e MAC flapping no switch de acesso",
    "symptom": "Usuários de uma sala não recebem IP ou recebem APIPA; alguns telefones IP reiniciam e o switch registra MAC flapping.",
    "businessImpact": "Atendimento ao cliente interrompido e risco de loop ou conexão indevida entre switches.",
    "likelyRootCause": "Porta configurada na VLAN errada, trunk sem VLAN permitida, loop físico ou mini-switch não autorizado.",
    "timeline": [
      "07:40: mudança física na sala",
      "08:05: primeiros APIPA",
      "08:12: alertas de MAC flapping",
      "08:18: DHCP sem novas concessões na VLAN"
    ],
    "expectedFlow": "Host → porta access → VLAN → trunk → gateway/SVI → relay DHCP → servidor DHCP",
    "hypothesisMatrix": [
      {
        "hypothesis": "Access VLAN errada",
        "why": "Host cai em VLAN sem DHCP",
        "evidence": "show interfaces switchport",
        "priority": "Alta"
      },
      {
        "hypothesis": "Trunk sem VLAN",
        "why": "VLAN não atravessa uplink",
        "evidence": "show interfaces trunk",
        "priority": "Alta"
      },
      {
        "hypothesis": "Loop/MAC flapping",
        "why": "MAC muda entre portas",
        "evidence": "show mac address-table / logs STP",
        "priority": "Alta"
      },
      {
        "hypothesis": "DHCP relay",
        "why": "Discover não chega ao servidor",
        "evidence": "show ip helper / captura DHCP",
        "priority": "Média"
      }
    ],
    "requiredArtifacts": [
      "problem statement",
      "escopo afetado/não afetado",
      "mapa do fluxo",
      "matriz hipótese-evidência",
      "comandos/logs/capturas",
      "decisão",
      "mitigação",
      "validação",
      "RCA"
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    }
  ]
};
