export const lesson1504 = {
  "id": "15.4",
  "moduleId": "m15",
  "order": 4,
  "title": "Troubleshooting IPv4, rotas, gateway e ICMP",
  "subtitle": "Como diagnosticar conectividade IPv4 usando endereçamento, máscara, ARP, gateway, tabela de rotas, ICMP, rota de retorno e evidências de firewall — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "180-240 min",
  "estimatedStudyTimeMinutes": 240,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "troubleshooting",
    "IPv4",
    "gateway",
    "rotas",
    "ICMP",
    "ping",
    "traceroute",
    "ARP",
    "máscara",
    "rota de retorno",
    "NAT",
    "firewall",
    "cloud networking",
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
      "reason": "A mentalidade profissional de troubleshooting define hipótese, escopo, mitigação e RCA."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "title": "Coleta de evidências, baseline e linha do tempo",
      "reason": "Coleta de evidências, baseline e linha do tempo são necessários para interpretar sintomas IPv4 sem adivinhação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.3",
      "title": "Troubleshooting físico, LAN, VLAN e camada 2",
      "reason": "Muitos problemas IPv4 começam com ARP, VLAN ou camada 2 incorreta."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m04",
      "reason": "Esta aula assume os fundamentos de IPv4, máscara, gateway, ICMP e troubleshooting de endereçamento."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "Subnetting e planejamento de prefixos são necessários para diagnosticar redes e rotas."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m11",
      "reason": "Roteamento, tabela de rotas e rota default são base para troubleshooting de caminho."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "title": "Route tables, Internet Gateway, NAT Gateway e UDR",
      "reason": "Route tables, NAT Gateway e UDR em cloud são extensões práticas do troubleshooting IPv4."
    }
  ],
  "objectives": [
    "Diagnosticar endereçamento IPv4, máscara, gateway e escopo local/remoto.",
    "Validar ARP para gateway e diferenciar falha L2 de falha L3.",
    "Interpretar tabela de rotas, rota default, rota mais específica e next hop.",
    "Usar ICMP, ping e traceroute como evidências, não como conclusões isoladas.",
    "Identificar rota de retorno, NAT, firewall stateful e assimetria.",
    "Montar uma matriz hipótese-evidência para falhas IPv4 corporativas e cloud.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um host sem acesso externo, o aluno identifica se a causa provável está em IP, máscara, gateway, ARP ou rota.",
    "Dado traceroute incompleto, o aluno diferencia bloqueio de ICMP, perda real e firewall intermediário.",
    "Dado um túnel VPN up sem tráfego, o aluno valida rotas, prefixos, retorno, NAT e política.",
    "Dado um problema cloud, o aluno analisa route table, security group, NACL, NAT e flow logs.",
    "Dado um incidente, o aluno propõe mitigação mínima com rollback sem abrir tráfego amplo.",
    "Dado o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n  <p>Quando um usuário diz “não consigo acessar o sistema”, uma das tentações mais comuns é pular direto para DNS, firewall, aplicação ou cloud. Mas, antes de perguntar se o servidor caiu, o profissional de redes precisa responder perguntas mais fundamentais: o host tem um IPv4 válido? A máscara faz sentido? O gateway está correto? O host consegue resolver o endereço MAC do gateway? Existe rota para o destino? Existe rota de retorno? O ICMP está indicando algo ou está sendo filtrado?</p>\n  <p>IPv4, rotas, gateway e ICMP formam a espinha dorsal do diagnóstico de conectividade. Eles aparecem em quase todo incidente: estação sem acesso, servidor isolado, VPN que conecta mas não trafega, subnet cloud sem saída, rota assimétrica, NAT mal aplicado, gateway errado, ACL bloqueando retorno ou aplicação inacessível entre redes.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> ping falhando não significa automaticamente “rede fora”. Ping bem-sucedido também não significa aplicação saudável. ICMP é uma evidência, não uma conclusão.</div>\n  <p>A motivação desta aula é ensinar você a transformar sintomas de conectividade IPv4 em uma investigação organizada, segura e reproduzível.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n  <p>O IPv4 nasceu para permitir comunicação entre redes diferentes em sistemas de comunicação por pacotes. A ideia central era simples e poderosa: cada host teria um endereço lógico, roteadores encaminhariam datagramas entre redes e protocolos auxiliares ajudariam a sinalizar erros ou condições de caminho.</p>\n  <p>Com o crescimento das redes corporativas, surgiram subnets, máscaras, gateways padrão, rotas estáticas, protocolos dinâmicos, NAT, firewalls e VPNs. Isso aumentou escala e flexibilidade, mas também aumentou as possibilidades de falha: endereços duplicados, máscara incorreta, gateway ausente, rota mais específica inesperada, retorno por caminho diferente, ICMP bloqueado ou NAT aplicado antes da política certa.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>IPv4:</strong> endereços lógicos e datagramas entre redes.</div><div class=\"timeline-item\"><strong>Subnetting:</strong> divisão de redes em blocos menores.</div><div class=\"timeline-item\"><strong>Gateway padrão:</strong> saída local para destinos fora da subnet.</div><div class=\"timeline-item\"><strong>Roteamento:</strong> escolha de caminho entre redes.</div><div class=\"timeline-item\"><strong>ICMP:</strong> mensagens de erro, eco e diagnóstico de caminho.</div><div class=\"timeline-item\"><strong>NAT/firewalls/cloud:</strong> tradução, política e abstração tornam o diagnóstico mais complexo.</div></div>\n  <p>Hoje, mesmo em cloud, Kubernetes e Zero Trust, a pergunta continua a mesma: existe um caminho de ida e volta permitido entre origem e destino?</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema técnico desta aula é diagnosticar falhas de conectividade IPv4 quando a camada física e a camada 2 parecem saudáveis, mas a comunicação ainda não funciona.</p>\n  <p>Sintomas típicos:</p>\n  <ul>\n    <li>host tem IP, mas não acessa nada fora da rede local;</li>\n    <li>host acessa o gateway, mas não alcança servidores remotos;</li>\n    <li>algumas subnets comunicam, outras não;</li>\n    <li>VPN estabelece túnel, mas nenhum tráfego passa;</li>\n    <li>ping funciona para IP, mas aplicação TCP falha;</li>\n    <li>traceroute para em um salto específico;</li>\n    <li>rota default está ausente ou aponta para gateway incorreto;</li>\n    <li>máscara errada faz o host tratar destino remoto como local;</li>\n    <li>ACL, firewall ou security group bloqueia ICMP e confunde o diagnóstico;</li>\n    <li>rota de ida existe, mas rota de retorno não existe.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha:</strong> troubleshooting IPv4 não é “dar ping no Google”. Em ambiente corporativo, você precisa testar o caminho correto, do ponto correto, com origem correta e interpretação correta.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente</h3>\n  <p><strong>Sintoma observado:</strong> Uma aplicação em subnet privada recebe requisições de outra rede, mas o cliente vê timeout; ping ao gateway local funciona.</p>\n  <p><strong>Impacto operacional:</strong> Time de aplicação culpa firewall, time de rede culpa servidor, e a janela de mudança se aproxima do fim.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente remoto → roteador/firewall → subnet do servidor → gateway local → rota de retorno → cliente</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>13:00: nova subnet criada</li><li>13:20: rota para destino adicionada</li><li>13:35: teste de ping local OK</li><li>13:40: timeout de ponta a ponta</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Máscara/gateway errado</td><td>Servidor escolhe caminho local incorreto</td><td>ip addr/ip route/ipconfig</td><td>Alta</td></tr><tr><td>Rota de retorno ausente</td><td>Resposta sai por caminho errado</td><td>route print/show ip route</td><td>Alta</td></tr><tr><td>Rota mais específica indevida</td><td>Longest prefix match desvia fluxo</td><td>tabela de rotas</td><td>Alta</td></tr><tr><td>ICMP bloqueado</td><td>Ping engana ou falha por política</td><td>teste TCP/flow log</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n  <p>O troubleshooting IPv4 evolui de testes isolados para análise de fluxo. Em vez de perguntar apenas “responde ping?”, o profissional pergunta: “qual é o fluxo esperado, qual tabela decide o próximo salto, qual política permite ou bloqueia, e como o retorno volta?”.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Estágio</th><th>Foco</th><th>Erro comum</th><th>Maturidade esperada</th></tr></thead>\n    <tbody>\n      <tr><td>Endereço local</td><td>IP, máscara, gateway, DNS, interface.</td><td>Assumir que IP recebido por DHCP está correto.</td><td>Comparar com baseline e escopo da subnet.</td></tr>\n      <tr><td>Vizinho local</td><td>ARP e gateway.</td><td>Culpar roteamento quando ARP para gateway falha.</td><td>Validar camada 2/ARP antes de rotas externas.</td></tr>\n      <tr><td>Roteamento</td><td>Tabela local, rota default, rotas específicas.</td><td>Ignorar rota mais específica.</td><td>Identificar next hop escolhido para cada destino.</td></tr>\n      <tr><td>Caminho</td><td>Traceroute, TTL, saltos e filtragem.</td><td>Interpretar ausência de resposta ICMP como queda definitiva.</td><td>Separar bloqueio de ICMP de perda real de tráfego.</td></tr>\n      <tr><td>Retorno</td><td>Rota de volta, NAT, firewall stateful e assimetria.</td><td>Testar só a ida.</td><td>Validar ida e retorno com logs e fluxos.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Troubleshooting IPv4</strong> é o processo de verificar se uma origem possui endereçamento correto, consegue alcançar o gateway, possui rota adequada até o destino, recebe retorno pelo caminho esperado e não é bloqueada por políticas intermediárias.</p>\n  <p>O raciocínio central pode ser resumido em sete perguntas:</p>\n  <ol>\n    <li>A interface correta está ativa e com IPv4 esperado?</li>\n    <li>A máscara coloca a origem na subnet correta?</li>\n    <li>O gateway padrão pertence à mesma subnet da origem?</li>\n    <li>O host consegue resolver o MAC do gateway via ARP?</li>\n    <li>A tabela de rotas escolhe o next hop esperado?</li>\n    <li>O caminho intermediário permite o tráfego de ida?</li>\n    <li>O destino sabe voltar para a origem, diretamente ou por rota/NAT/firewall stateful?</li>\n  </ol>\n  <div class=\"callout callout--info\"><strong>Ligação com aulas anteriores:</strong> esta aula depende de subnetting, ARP, NAT, roteamento, firewall e coleta de evidências. Revise Redes módulos de IPv4 e a aula 15.2 antes de usar os métodos em produção.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Quando uma origem IPv4 tenta falar com um destino, ela primeiro decide se o destino está na mesma subnet. Essa decisão é feita combinando o IP local, a máscara e o IP de destino. Se o destino parece local, o host tenta ARP diretamente para o destino. Se o destino parece remoto, o host procura uma rota e normalmente envia o quadro Ethernet para o MAC do gateway.</p>\n  <p>Essa pequena decisão explica muitos incidentes. Se a máscara estiver errada, o host pode tentar ARP para um destino remoto e nunca enviar ao gateway. Se o gateway estiver fora da subnet, o host pode não conseguir usá-lo. Se houver uma rota mais específica, o tráfego pode sair por uma interface inesperada. Se o firewall permitir a ida, mas o retorno seguir outro caminho, uma sessão stateful pode quebrar.</p>\n  <p>ICMP entra como protocolo de controle e diagnóstico. Echo Request e Echo Reply sustentam o ping. Mensagens como Destination Unreachable, Time Exceeded e Fragmentation Needed podem indicar bloqueios, ausência de rota, TTL expirado ou problema de MTU. Porém, muitos ambientes filtram ICMP, então a ausência de resposta deve ser interpretada com cuidado.</p>\n  <table class=\"comparison-table\"><thead><tr><th>Elemento</th><th>Função interna</th><th>Falha típica</th></tr></thead><tbody><tr><td>Máscara</td><td>Define o que é local versus remoto.</td><td>Destino remoto tratado como local.</td></tr><tr><td>Gateway</td><td>Next hop para fora da subnet.</td><td>Gateway ausente, errado ou inalcançável por ARP.</td></tr><tr><td>Tabela de rotas</td><td>Seleciona rota por maior especificidade.</td><td>Rota default ausente ou rota específica errada.</td></tr><tr><td>ICMP</td><td>Sinaliza eco, erro e condições de caminho.</td><td>Filtragem confundida com indisponibilidade.</td></tr><tr><td>Rota de retorno</td><td>Permite resposta ao endereço de origem.</td><td>Assimetria, NAT incorreto ou rota ausente.</td></tr></tbody></table>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Em uma arquitetura corporativa, o troubleshooting IPv4 raramente envolve apenas um host e um roteador. O caminho pode passar por switch, SVI, firewall, roteador WAN, SD-WAN, VPN, NAT, cloud route table, security group, load balancer, Kubernetes ingress e serviço final.</p>\n  <p>Uma arquitetura de diagnóstico precisa representar:</p>\n  <ul>\n    <li><strong>origem:</strong> IP, máscara, gateway, interface, VLAN e rota local;</li>\n    <li><strong>primeiro salto:</strong> ARP para gateway, SVI, roteador ou firewall;</li>\n    <li><strong>caminho intermediário:</strong> rotas, ACLs, NAT, túneis, route tables e firewalls;</li>\n    <li><strong>destino:</strong> IP, porta, subnet, firewall local e rota de retorno;</li>\n    <li><strong>observabilidade:</strong> logs de firewall, flow logs, traceroute, capturas, métricas e auditoria de mudanças.</li>\n  </ul>\n  <div class=\"callout callout--tip\"><strong>Prática profissional:</strong> sempre desenhe o fluxo com origem, destino, protocolo, porta, rota de ida e rota de volta. Sem isso, troubleshooting vira adivinhação.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em uma entrega de encomenda em uma cidade. O IP de origem é o endereço do remetente. O IP de destino é o endereço do destinatário. A máscara é a regra que diz se o destinatário mora no mesmo bairro ou em outro bairro. O gateway é a saída do bairro para o resto da cidade.</p>\n  <p>Se você acha que o destinatário está no seu bairro, tenta entregar diretamente. Se ele está em outro bairro, você leva a encomenda até a saída correta. Se a saída está errada, a encomenda não sai. Se existe uma rua bloqueada, o caminho para. Se o destinatário recebe a encomenda mas não sabe responder, você não recebe confirmação.</p>\n  <p>ICMP é como uma placa ou mensagem do caminho: “destino inalcançável”, “tempo excedido”, “precisa fragmentar”, “cheguei”. Mas algumas cidades bloqueiam essas placas por política; nesse caso, a ausência de mensagem não prova sozinha que a estrada não existe.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine um notebook com:</p>\n  <pre><code>IP:       192.168.10.25\nMáscara:  255.255.255.0\nGateway:  192.168.10.1\nDestino:  192.168.20.10</code></pre>\n  <p>O notebook calcula que 192.168.20.10 está fora da rede 192.168.10.0/24. Então ele procura o gateway 192.168.10.1, resolve o MAC desse gateway via ARP e envia o pacote para ele. Se o ARP para 192.168.10.1 falhar, o problema está antes de qualquer rota remota.</p>\n  <p>Agora imagine que a máscara foi configurada como 255.255.0.0. O notebook pode concluir que 192.168.20.10 está “local” e tentar ARP diretamente para ele. O pacote nunca chega ao gateway. Esse é um exemplo clássico de falha causada por máscara incorreta.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, usuários da VLAN 120 não conseguem acessar o sistema financeiro na VLAN 210. A VLAN 120 tem gateway em um firewall, a VLAN 210 tem servidores protegidos por ACL e o tráfego esperado é TCP 443.</p>\n  <p>Um troubleshooting profissional não começa alterando regra de firewall. Ele valida:</p>\n  <ol>\n    <li>host da VLAN 120 tem IP, máscara e gateway corretos?</li>\n    <li>host alcança o gateway?</li>\n    <li>gateway tem rota para a VLAN 210?</li>\n    <li>servidor da VLAN 210 tem rota de retorno para a VLAN 120?</li>\n    <li>firewall registra allow, deny, drop ou session timeout?</li>\n    <li>há NAT indevido entre redes internas?</li>\n    <li>ICMP é bloqueado, mas TCP 443 funciona?</li>\n  </ol>\n  <p>Esse exemplo mostra que ping é útil, mas insuficiente. O teste final deve representar o fluxo real: origem correta, destino correto, protocolo correto e porta correta.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-em-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em cloud, o mesmo raciocínio aparece em route tables, subnets privadas, NAT Gateway, security groups, NACLs, private endpoints e VPNs. Uma instância em subnet privada pode ter IP correto e ainda assim não sair para a internet se a route table não apontar para NAT Gateway, se o security group bloquear egress ou se a NACL bloquear retorno efêmero.</p>\n  <p>Outro caso comum: uma VPC/VNet tem VPN com o datacenter. O túnel está up, mas a aplicação não comunica. Possíveis causas incluem CIDR sobreposto, rota propagada ausente, prefixo não anunciado por BGP, security group sem permissão, firewall on-premises sem rota de retorno ou DNS resolvendo para IP público em vez de privado.</p>\n  <div class=\"callout callout--cloud\"><strong>Cloud não elimina IPv4:</strong> ela abstrai parte da infraestrutura, mas ainda exige endereçamento, rota, gateway, política, retorno e observabilidade.</div>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-em-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, falhas IPv4 podem nascer em código de infraestrutura. Um pull request altera uma route table, remove rota para NAT, troca CIDR de uma subnet, cria security group permissivo demais ou aponta um endpoint para subnet errada. O incidente aparece como falha de aplicação, mas a causa está em IaC.</p>\n  <p>Por isso, pipelines maduros devem validar:</p>\n  <ul>\n    <li>CIDR não sobreposto;</li>\n    <li>gateway e route tables coerentes;</li>\n    <li>rotas de ida e retorno documentadas;</li>\n    <li>fluxos permitidos por menor privilégio;</li>\n    <li>mudanças de rede com plano de rollback;</li>\n    <li>testes sintéticos após deploy;</li>\n    <li>logs e métricas habilitados antes da publicação.</li>\n  </ul>\n  <p>Essa aula se conecta ao curso de Infraestrutura, Platform Engineering e DevSecOps, especialmente aos módulos de IaC, pipelines e automação segura.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-em-segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Em segurança, troubleshooting IPv4 tem duas dimensões: restaurar conectividade legítima e evitar abrir caminhos indevidos. Uma regra criada para “testar rápido” pode liberar uma subnet inteira, contornar segmentação ou permitir movimento lateral.</p>\n  <p>Boas práticas defensivas incluem:</p>\n  <ul>\n    <li>testar com origem e destino específicos;</li>\n    <li>evitar liberar qualquer origem para qualquer destino;</li>\n    <li>registrar mudança temporária com prazo de expiração;</li>\n    <li>validar rota de retorno sem criar bypass;</li>\n    <li>usar logs para confirmar fluxo permitido ou negado;</li>\n    <li>preservar evidência para RCA e auditoria;</li>\n    <li>reverter exceções após mitigação.</li>\n  </ul>\n  <div class=\"callout callout--security\"><strong>Regra de ouro:</strong> em incidente de conectividade, não transforme troubleshooting em exceção permanente de segurança.</div>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama abaixo mostra o caminho mental da investigação IPv4: origem, ARP/gateway, rotas, políticas, destino, retorno e evidências.</p>\n  <div class=\"diagram-container\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"ipv4TroubleshootingTitle ipv4TroubleshootingDesc\">\n      <title id=\"ipv4TroubleshootingTitle\">Fluxo de troubleshooting IPv4</title>\n      <desc id=\"ipv4TroubleshootingDesc\">Diagrama com host de origem, gateway, roteamento, firewall, destino, retorno e observabilidade.</desc>\n      <defs>\n        <marker id=\"arrow1504\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"170\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"115\" y=\"78\" text-anchor=\"middle\" class=\"svg-label\">Origem</text>\n      <text x=\"115\" y=\"105\" text-anchor=\"middle\" class=\"svg-small\">IP/máscara/gateway</text>\n      <rect x=\"245\" y=\"40\" width=\"160\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--accent\"></rect>\n      <text x=\"325\" y=\"78\" text-anchor=\"middle\" class=\"svg-label\">ARP</text>\n      <text x=\"325\" y=\"105\" text-anchor=\"middle\" class=\"svg-small\">MAC do gateway</text>\n      <rect x=\"450\" y=\"40\" width=\"170\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"535\" y=\"78\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n      <text x=\"535\" y=\"105\" text-anchor=\"middle\" class=\"svg-small\">SVI/roteador/firewall</text>\n      <rect x=\"675\" y=\"40\" width=\"230\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--accent\"></rect>\n      <text x=\"790\" y=\"78\" text-anchor=\"middle\" class=\"svg-label\">Roteamento</text>\n      <text x=\"790\" y=\"105\" text-anchor=\"middle\" class=\"svg-small\">rota específica/default</text>\n      <line x1=\"200\" y1=\"88\" x2=\"245\" y2=\"88\" class=\"svg-link\" marker-end=\"url(#arrow1504)\"></line>\n      <line x1=\"405\" y1=\"88\" x2=\"450\" y2=\"88\" class=\"svg-link\" marker-end=\"url(#arrow1504)\"></line>\n      <line x1=\"620\" y1=\"88\" x2=\"675\" y2=\"88\" class=\"svg-link\" marker-end=\"url(#arrow1504)\"></line>\n      <rect x=\"80\" y=\"210\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--warning\"></rect>\n      <text x=\"175\" y=\"248\" text-anchor=\"middle\" class=\"svg-label\">Políticas</text>\n      <text x=\"175\" y=\"275\" text-anchor=\"middle\" class=\"svg-small\">ACL/firewall/SG/NACL</text>\n      <rect x=\"385\" y=\"210\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"480\" y=\"248\" text-anchor=\"middle\" class=\"svg-label\">Destino</text>\n      <text x=\"480\" y=\"275\" text-anchor=\"middle\" class=\"svg-small\">serviço/subnet/firewall local</text>\n      <rect x=\"690\" y=\"210\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--warning\"></rect>\n      <text x=\"785\" y=\"248\" text-anchor=\"middle\" class=\"svg-label\">Retorno</text>\n      <text x=\"785\" y=\"275\" text-anchor=\"middle\" class=\"svg-small\">rota/NAT/assimetria</text>\n      <line x1=\"790\" y1=\"135\" x2=\"790\" y2=\"210\" class=\"svg-link\" marker-end=\"url(#arrow1504)\"></line>\n      <line x1=\"690\" y1=\"257\" x2=\"575\" y2=\"257\" class=\"svg-link\" marker-end=\"url(#arrow1504)\"></line>\n      <line x1=\"385\" y1=\"257\" x2=\"270\" y2=\"257\" class=\"svg-link\" marker-end=\"url(#arrow1504)\"></line>\n      <path d=\"M175 210 C175 160, 115 160, 115 135\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1504)\"></path>\n      <rect x=\"150\" y=\"380\" width=\"660\" height=\"80\" rx=\"18\" class=\"svg-node svg-node--evidence\"></rect>\n      <text x=\"480\" y=\"413\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n      <text x=\"480\" y=\"440\" text-anchor=\"middle\" class=\"svg-small\">ip route • arp • ping • traceroute • flow logs • firewall logs • captura • auditoria</text>\n      <line x1=\"480\" y1=\"305\" x2=\"480\" y2=\"380\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1504)\"></line>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratório\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um diagnóstico estruturado de conectividade IPv4. Você vai montar uma matriz de evidências para separar problema de IP/máscara, gateway, ARP, rota, firewall, ICMP filtrado, NAT e rota de retorno.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente. <strong>Causa provável a ser comprovada ou descartada:</strong> Rota de retorno ausente, rota mais específica incorreta, máscara errada ou assimetria por firewall/NAT.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam cálculo de escopo local/remoto, interpretação de gateway, rota mais específica, ICMP e rota de retorno.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio propõe um incidente em que usuários acessam alguns destinos, mas não outros, enquanto ping e traceroute geram sinais contraditórios. Seu trabalho é construir uma investigação sem liberar tráfego de forma ampla.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como ordenar hipóteses: primeiro endereçamento, depois gateway/ARP, em seguida tabela de rotas, caminho, política, retorno e somente então ajustes controlados.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Nesta aula, você aprendeu que troubleshooting IPv4 é análise de caminho, não apenas execução de ping. O objetivo é provar se a origem sabe para onde enviar, se o gateway está acessível, se a rota escolhida é correta, se políticas permitem o fluxo e se o retorno existe.</p>\n  <ul>\n    <li>máscara decide se o destino é local ou remoto;</li>\n    <li>gateway precisa estar alcançável na subnet local;</li>\n    <li>ARP para o gateway é evidência crítica antes de culpar roteamento externo;</li>\n    <li>rota mais específica vence rota default;</li>\n    <li>ICMP ajuda, mas pode ser filtrado;</li>\n    <li>traceroute indica pistas, não verdades absolutas;</li>\n    <li>rota de retorno é tão importante quanto rota de ida;</li>\n    <li>mudanças de firewall e rota precisam de escopo, justificativa e rollback.</li>\n  </ul>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Rota de retorno ausente, rota mais específica incorreta, máscara errada ou assimetria por firewall/NAT..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>15.5 — Troubleshooting DNS profissional</strong>, você vai investigar resolução de nomes, cache, autoridade, recursão, split-horizon, DNS privado e falhas que parecem aplicação mas começam no nome.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3",
      "Camada 4"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte"
    ],
    "relatedProtocols": [
      "IPv4",
      "ARP",
      "ICMP",
      "TCP",
      "UDP",
      "OSPF",
      "BGP",
      "IPsec",
      "DHCP"
    ],
    "relatedConcepts": [
      "Máscara de rede",
      "Gateway padrão",
      "Rota default",
      "Rota mais específica",
      "Next hop",
      "TTL",
      "Traceroute",
      "Rota de retorno",
      "Rota assimétrica",
      "NAT",
      "Firewall stateful",
      "MTU",
      "PMTUD"
    ],
    "ports": [
      "ICMP não usa porta TCP/UDP",
      "TCP/443 como exemplo de validação de aplicação",
      "UDP/33434+ em implementações clássicas de traceroute",
      "UDP/500 e UDP/4500 em VPN IPsec como contexto futuro"
    ]
  },
  "lab": {
    "id": "lab-15.4",
    "title": "Caso guiado: Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Uma aplicação em subnet privada recebe requisições de outra rede, mas o cliente vê timeout; ping ao gateway local funciona. Impacto: Time de aplicação culpa firewall, time de rede culpa servidor, e a janela de mudança se aproxima do fim. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente remoto → roteador/firewall → subnet do servidor → gateway local → rota de retorno → cliente",
    "architecture": "Arquitetura investigada: Cliente remoto → roteador/firewall → subnet do servidor → gateway local → rota de retorno → cliente. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "180-240 min",
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Executar somente em ambiente autorizado.",
      "Não abrir regras amplas nem desativar controles como atalho.",
      "Preservar logs e evidências antes de mudanças.",
      "Sanitizar dados sensíveis em capturas e prints.",
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Confirmar endereçamento",
        "instruction": "Registre IP, máscara, gateway e rede esperada na origem e no destino.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Tabela de endereçamento.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Decidir local versus remoto",
        "instruction": "Calcule se o destino deveria ser local ou via gateway.",
        "command": "ipconfig /all; route print; tracert <destino>; Test-NetConnection <destino> -Port 443",
        "expectedOutput": "Decisão de encaminhamento esperada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Consultar rota efetiva",
        "instruction": "Use route print/ip route get/show ip route para ver o próximo salto real.",
        "command": "ip addr; ip route get <destino>; traceroute <destino>; ss -tulpen",
        "expectedOutput": "Next-hop efetivo documentado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Testar ida",
        "instruction": "Traceroute/mtr a partir da origem com protocolo apropriado.",
        "command": "show ip route <prefixo>; show access-lists; traceroute <destino> source <interface>",
        "expectedOutput": "Evidência do caminho de ida.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Testar retorno",
        "instruction": "Repita a partir do destino ou valide flow logs/sessões.",
        "command": "show ip route <prefixo>; show access-lists; traceroute <destino> source <interface>",
        "expectedOutput": "Evidência do caminho de volta.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Comparar rotas específicas",
        "instruction": "Procure prefixos mais específicos que ganham do default.",
        "command": "show ip route <prefixo>; show access-lists; traceroute <destino> source <interface>",
        "expectedOutput": "Longest prefix match validado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Validar política intermediária",
        "instruction": "Correlacione ACL/firewall com a tupla do fluxo.",
        "command": "show ip route <prefixo>; show access-lists; traceroute <destino> source <interface>",
        "expectedOutput": "Permissão ou bloqueio identificado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Aplicar correção mínima",
        "instruction": "Adicionar/corrigir rota específica ou rota de retorno com aprovação e rollback.",
        "command": "show ip route <prefixo>; show access-lists; traceroute <destino> source <interface>",
        "expectedOutput": "Fluxo validado após correção.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Rota efetiva correta",
        "command": "ip route get <destino> ou route print",
        "expected": "Next-hop esperado.",
        "ifFails": "Corrigir máscara, gateway ou rota específica."
      },
      {
        "check": "Retorno confirmado",
        "command": "teste reverso ou flow logs",
        "expected": "Pacotes de resposta voltam pelo caminho esperado.",
        "ifFails": "Adicionar rota de retorno ou corrigir assimetria."
      },
      {
        "check": "Serviço validado",
        "command": "Test-NetConnection/curl",
        "expected": "Conexão TCP ou resposta HTTP esperada.",
        "ifFails": "Separar problema de rede de aplicação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Ping gateway funciona, aplicação não",
        "probableCause": "Gateway local OK não prova caminho remoto",
        "howToConfirm": "Testar destino real e retorno",
        "fix": "Validar rota e política ponta a ponta."
      },
      {
        "symptom": "Traceroute para no firewall",
        "probableCause": "Firewall não responde ICMP ou bloqueia",
        "howToConfirm": "Consultar logs e testar TCP",
        "fix": "Não concluir bloqueio só por traceroute incompleto."
      },
      {
        "symptom": "Rota default existe",
        "probableCause": "Rota mais específica ganha",
        "howToConfirm": "Ver tabela completa e ip route get",
        "fix": "Remover/corrigir prefixo mais específico."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "ipconfig/ip addr",
      "route print/ip route get",
      "show ip route",
      "traceroute/mtr",
      "flow logs",
      "teste TCP",
      "plano de rollback"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Diagnostique um timeout entre 10.20.30.10 e 172.16.5.20 quando ambos pingam seus gateways, mas a aplicação não abre.",
    "solution": "A solução correta valida decisão de rota em cada ponta. Se a ida chega e a volta sai por outro caminho, a sessão quebra em firewall/NAT. Corrigir a rota de retorno ou a assimetria resolve sem liberar regras amplas."
  },
  "exercises": [
    {
      "id": "ex15.4.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.4.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.4.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.4.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.4.p1.2",
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
      "id": "q15.4.p1.3",
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
      "id": "q15.4.p1.4",
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
      "question": "Um host 192.168.10.25/24 tenta acessar 192.168.20.10. Qual decisão inicial ele deve tomar?",
      "options": [
        "Tentar ARP diretamente para 192.168.20.10",
        "Enviar ao gateway, pois o destino está fora da subnet /24",
        "Ignorar a máscara e consultar DNS",
        "Usar broadcast para todas as VLANs"
      ],
      "correctAnswer": 1,
      "explanation": "Com máscara /24, 192.168.20.10 está em outra rede, então o host envia ao gateway."
    },
    {
      "question": "Qual problema uma máscara ampla demais pode causar?",
      "options": [
        "O host pode tratar destino remoto como local e tentar ARP indevidamente",
        "O DNS passa a usar TCP sempre",
        "O gateway muda de MAC automaticamente",
        "ICMP deixa de existir"
      ],
      "correctAnswer": 0,
      "explanation": "Máscara incorreta altera a decisão local/remoto e pode impedir envio ao gateway."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.4.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.4.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.4.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.4.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.4.p1.5",
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
      "question": "Qual parte do caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente",
    "scenario": "Uma aplicação em subnet privada recebe requisições de outra rede, mas o cliente vê timeout; ping ao gateway local funciona.",
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
    "reasoning": "A solução correta valida decisão de rota em cada ponta. Se a ida chega e a volta sai por outro caminho, a sessão quebra em firewall/NAT. Corrigir a rota de retorno ou a assimetria resolve sem liberar regras amplas.",
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
    "finalAnswer": "A resposta correta para “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Gateway padrão",
      "shortDefinition": "Próximo salto para redes remotas.",
      "longDefinition": "Endereço local usado por um host para enviar tráfego destinado a redes fora da subnet local quando não existe rota mais específica.",
      "example": "Um notebook 192.168.10.25/24 usa 192.168.10.1 como gateway para acessar 192.168.20.10.",
      "relatedTerms": [
        "Rota default",
        "Next hop"
      ],
      "relatedLessons": [
        "15.4",
        "14.4"
      ]
    },
    {
      "term": "Rota default",
      "shortDefinition": "Rota usada quando nenhuma rota mais específica existe.",
      "longDefinition": "Entrada de roteamento normalmente representada como 0.0.0.0/0, direcionando tráfego desconhecido para um next hop padrão.",
      "example": "Uma subnet privada cloud usa 0.0.0.0/0 apontando para NAT Gateway.",
      "relatedTerms": [
        "Route table",
        "NAT Gateway"
      ],
      "relatedLessons": [
        "15.4",
        "14.4"
      ]
    },
    {
      "term": "Rota mais específica",
      "shortDefinition": "Prefixo mais preciso para um destino.",
      "longDefinition": "Critério pelo qual uma rota com prefixo mais longo tem prioridade sobre uma rota mais ampla que também combina com o destino.",
      "example": "10.10.50.0/24 vence 10.10.0.0/16 para destino 10.10.50.25.",
      "relatedTerms": [
        "Longest prefix match",
        "Next hop"
      ],
      "relatedLessons": [
        "15.4"
      ]
    },
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de controle e mensagens de erro do IP.",
      "longDefinition": "Internet Control Message Protocol transporta mensagens como echo request/reply, destination unreachable e time exceeded, apoiando diagnóstico e controle de condições do caminho.",
      "example": "Ping usa ICMP Echo Request e Echo Reply.",
      "relatedTerms": [
        "Ping",
        "Traceroute",
        "TTL"
      ],
      "relatedLessons": [
        "15.4"
      ]
    },
    {
      "term": "Traceroute",
      "shortDefinition": "Ferramenta para inferir saltos do caminho.",
      "longDefinition": "Técnica que explora TTL e respostas intermediárias para revelar, parcialmente, o caminho até um destino.",
      "example": "Traceroute para em um firewall que não responde ICMP Time Exceeded.",
      "relatedTerms": [
        "TTL",
        "ICMP"
      ],
      "relatedLessons": [
        "15.4"
      ]
    },
    {
      "term": "Rota de retorno",
      "shortDefinition": "Caminho usado pela resposta para voltar à origem.",
      "longDefinition": "Conjunto de rotas, políticas e traduções que permite que a resposta de um destino alcance novamente o endereço de origem da conexão.",
      "example": "Servidor cloud recebe pacote via VPN, mas responde pela internet por falta de rota para o prefixo on-premises.",
      "relatedTerms": [
        "Assimetria",
        "NAT",
        "Firewall stateful"
      ],
      "relatedLessons": [
        "15.4",
        "14.8"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.4"
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
        "15.4"
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
      "type": "standard",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc791.html",
      "note": "Especificação base do Internet Protocol IPv4."
    },
    {
      "type": "standard",
      "title": "RFC 792 — Internet Control Message Protocol",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc792.html",
      "note": "Especificação base do ICMP."
    },
    {
      "type": "official-doc",
      "title": "Understand the Ping and Traceroute Commands",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/ios-nx-os-software/ios-software-releases-121-mainline/12778-ping-traceroute.html",
      "note": "Referência operacional sobre ping e traceroute."
    },
    {
      "type": "official-doc",
      "title": "Troubleshooting TCP/IP",
      "organization": "Cisco",
      "url": "https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1907.html",
      "note": "Referência para ferramentas e raciocínio de troubleshooting IP."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 15.3 — Troubleshooting físico, LAN, VLAN e camada 2",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15/lesson-15-03",
      "note": "Pré-requisito direto para separar falhas L2 de L3."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting IPv4, rotas, gateway e ICMP\".",
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
        "description": "No caso “Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting IPv4, rotas, gateway e ICMP",
              "description": "Em Troubleshooting IPv4, rotas, gateway e ICMP, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.4."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Uma aplicação em subnet privada recebe requisições de outra rede, mas o cliente vê timeout; ping ao gateway local funciona.",
      "Impacto: Time de aplicação culpa firewall, time de rede culpa servidor, e a janela de mudança se aproxima do fim.",
      "Causa provável a validar: Rota de retorno ausente, rota mais específica incorreta, máscara errada ou assimetria por firewall/NAT.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting IPv4, rotas, gateway e ICMP.",
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
      "Qual evidência comprova o entendimento da aula 15.4?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all; route print; tracert <destino>; Test-NetConnection <destino> -Port 443",
        "purpose": "Ver IP, máscara, gateway, rotas e teste TCP.",
        "expectedObservation": "Rota escolhida e resultado de conectividade.",
        "interpretation": "Ping local não prova retorno nem aplicação."
      },
      {
        "platform": "Linux",
        "command": "ip addr; ip route get <destino>; traceroute <destino>; ss -tulpen",
        "purpose": "Ver decisão de rota do kernel e serviço local.",
        "expectedObservation": "Next-hop real para o destino e serviço ouvindo.",
        "interpretation": "ip route get mostra a decisão efetiva, não a rota que você imaginava."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route <prefixo>; show access-lists; traceroute <destino> source <interface>",
        "purpose": "Validar longest prefix match, ACL e caminho com origem controlada.",
        "expectedObservation": "Rota específica, next-hop e eventual bloqueio.",
        "interpretation": "Origem do teste muda o resultado e evita conclusão errada."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Máscara/gateway errado” está com prioridade Alta e a evidência necessária é “ip addr/ip route/ipconfig”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Rota de retorno ausente” está com prioridade Alta e a evidência necessária é “route print/show ip route”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Rota mais específica indevida” está com prioridade Alta e a evidência necessária é “tabela de rotas”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “ICMP bloqueado” está com prioridade Média e a evidência necessária é “teste TCP/flow log”",
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
      "15.5"
    ]
  },
  "diagnosticCase": {
    "title": "Servidor alcança o gateway, mas não responde a outra rede por rota de retorno ausente",
    "symptom": "Uma aplicação em subnet privada recebe requisições de outra rede, mas o cliente vê timeout; ping ao gateway local funciona.",
    "businessImpact": "Time de aplicação culpa firewall, time de rede culpa servidor, e a janela de mudança se aproxima do fim.",
    "likelyRootCause": "Rota de retorno ausente, rota mais específica incorreta, máscara errada ou assimetria por firewall/NAT.",
    "timeline": [
      "13:00: nova subnet criada",
      "13:20: rota para destino adicionada",
      "13:35: teste de ping local OK",
      "13:40: timeout de ponta a ponta"
    ],
    "expectedFlow": "Cliente remoto → roteador/firewall → subnet do servidor → gateway local → rota de retorno → cliente",
    "hypothesisMatrix": [
      {
        "hypothesis": "Máscara/gateway errado",
        "why": "Servidor escolhe caminho local incorreto",
        "evidence": "ip addr/ip route/ipconfig",
        "priority": "Alta"
      },
      {
        "hypothesis": "Rota de retorno ausente",
        "why": "Resposta sai por caminho errado",
        "evidence": "route print/show ip route",
        "priority": "Alta"
      },
      {
        "hypothesis": "Rota mais específica indevida",
        "why": "Longest prefix match desvia fluxo",
        "evidence": "tabela de rotas",
        "priority": "Alta"
      },
      {
        "hypothesis": "ICMP bloqueado",
        "why": "Ping engana ou falha por política",
        "evidence": "teste TCP/flow log",
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
