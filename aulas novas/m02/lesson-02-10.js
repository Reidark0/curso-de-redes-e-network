export const lesson0210 = {
  "id": "2.10",
  "moduleId": "m02",
  "order": 10,
  "title": "Revisão prática do Modelo OSI",
  "subtitle": "As sete camadas como método de diagnóstico e segurança, e a ponte para Ethernet, MAC, switches e ARP.",
  "duration": "60-85 min",
  "estimatedStudyTimeMinutes": 85,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 220,
  "tags": [
    "redes",
    "modelo osi",
    "troubleshooting",
    "revisão",
    "segurança",
    "cloud",
    "devsecops",
    "ethernet",
    "arp",
    "switches"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1-2.9",
      "reason": "Esta aula consolida todas as aulas anteriores do Módulo 2."
    }
  ],
  "objectives": [
    "Revisar o Modelo OSI como ferramenta prática, não como memorização.",
    "Relacionar camadas, PDUs, protocolos, equipamentos, comandos e evidências.",
    "Construir uma matriz OSI de troubleshooting e segurança.",
    "Diferenciar falhas de rede, transporte, TLS, aplicação, sessão, identidade e autorização.",
    "Preparar o aluno para Ethernet, MAC, switches, VLANs e ARP no Módulo 3."
  ],
  "learningOutcomes": [
    "Dado um sintoma, o aluno identifica camadas prováveis e evidências necessárias.",
    "Dado um fluxo web, o aluno descreve encapsulamento e controles por camada.",
    "Dado um alerta de segurança, o aluno separa risco físico, enlace, rede, transporte e aplicação.",
    "Dado um chamado, o aluno produz relatório técnico sanitizado com matriz OSI."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2><p>Depois de estudar o Modelo OSI camada por camada, a pergunta que importa não é se você decorou a ordem das sete camadas, e sim: <strong>você consegue usar o modelo para diagnosticar um problema real sem se perder?</strong></p><p>“O sistema caiu”, “a rede está lenta”, “a VPN não funciona”, “o firewall está bloqueando”: essas frases são sintomas, não diagnósticos. O OSI transforma cada uma em perguntas técnicas: há link físico? Há endereço? Há rota? Há porta aberta? Há TLS? Há resposta HTTP? Há sessão? Há autorização?</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário remoto resolve DNS, abre conexão TCP/443, negocia TLS, recebe HTTP 403, e o chamado chega como “problema de rede”. Com o OSI, você prova que rede e transporte estão funcionando e que a falha provável está em autorização, sessão, política de aplicação ou IAM.</div></section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2><p>Decorar “Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação” não ajuda se você não sabe o que observar em cada camada. Sem esse uso prático:</p><ul class=\"flow-list\"><li><strong>Sem método:</strong> o diagnóstico vira tentativa e erro.</li><li><strong>Sem evidência:</strong> a hipótese vira opinião.</li><li><strong>Sem separação de camadas:</strong> erro de autenticação vira “problema de rede”.</li><li><strong>Sem noção de PDU:</strong> você não entende o que aparece no Wireshark.</li><li><strong>Sem segurança por camadas:</strong> firewall, TLS, VLAN e IAM parecem controles equivalentes.</li></ul><p>A meta desta revisão é um roteiro fixo: <strong>sintoma → camada provável → evidência → comando ou log → interpretação → próximo teste → ação segura</strong>.</p></section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2><div class=\"definition-box\"><strong>Definição:</strong> revisar o OSI na prática é usar as sete camadas como matriz de raciocínio: mapear um fluxo real em camadas, identificar as PDUs, coletar evidências, separar rede de aplicação e propor ações seguras.</div><p>O teste é este: olhar para “cliente acessa aplicação web interna” e descrever o caminho de cima para baixo, com o que pode falhar em cada etapa.</p><div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Etapa</th><th>O que acontece</th><th>Falha possível</th></tr></thead><tbody><tr><td>1. Aplicação (cliente)</td><td>HTTP, DNS ou API gera os dados (payload) e o contexto: sessão, token.</td><td>Erro de aplicação, sessão expirada, autorização negada.</td></tr><tr><td>2. Transporte</td><td>Encapsula em TCP ou UDP: portas, handshake, estado e retransmissão.</td><td>Timeout, reset, porta fechada, bloqueio de firewall stateful.</td></tr><tr><td>3. Rede</td><td>Encapsula em IP e escolhe a rota: IP, gateway, TTL.</td><td>Rota ausente, gateway incorreto, rota de retorno inexistente.</td></tr><tr><td>4. Enlace</td><td>Entrega em frames locais: MAC, ARP, VLAN, switch.</td><td>ARP incorreto, VLAN errada, loop, tabela MAC instável.</td></tr><tr><td>5. Física</td><td>Cobre, fibra ou rádio transportam os bits.</td><td>Cabo, interferência, SNR baixo, link flap, erro físico.</td></tr></tbody></table></div><p>No servidor, o caminho se inverte (desencapsulamento). Em cada camada a identidade de “quem fala com quem” muda: MAC na 2, IP na 3, porta na 4, URI e usuário na 7. Por isso <strong>IP não é usuário e porta aberta não é autorização</strong>.</p></section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2><p>A revisão usa uma matriz fixa. Para cada camada, responda: o que ela entrega, o que pode falhar, que evidência observar e qual o próximo teste.</p><div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Camada</th><th>PDU</th><th>O que verificar</th><th>Componentes típicos</th><th>Evidência / comando</th></tr></thead><tbody><tr><td>1 Física</td><td>bits</td><td>Sinal, link, energia, cabo, fibra, rádio, interface ativa.</td><td>Cabo, fibra, AP, porta do switch.</td><td>Link da interface; <code>show interfaces status</code>.</td></tr><tr><td>2 Enlace</td><td>quadro (frame)</td><td>MAC, VLAN, ARP, tabela MAC, domínio de broadcast coerente.</td><td>Switch, AP, VLAN, controle de porta.</td><td>ARP para o gateway; <code>show mac address-table</code>, <code>show arp</code>.</td></tr><tr><td>3 Rede</td><td>pacote</td><td>IP, máscara, gateway, rota, TTL e retorno.</td><td>Roteador, subnet, ACL, NAT, VPN, peering, private endpoint.</td><td><code>ip addr</code>, <code>ip route</code>, <code>ping &lt;gateway&gt;</code>, <code>traceroute</code>/<code>tracert</code>, <code>show ip route</code>, flow logs.</td></tr><tr><td>4 Transporte</td><td>segmento</td><td>Porta, listener, handshake, estado, timeout ou reset.</td><td>Firewall stateful, balanceador.</td><td><code>Test-NetConnection &lt;host&gt; -Port 443</code>, logs de firewall.</td></tr><tr><td>5 Sessão</td><td>dados</td><td>Sessão, cookie, token, contexto e validade.</td><td>Aplicação, IAM.</td><td>Logs de aplicação e de IAM.</td></tr><tr><td>6 Apresentação</td><td>dados</td><td>Encoding, serialização, compressão, TLS e certificado válidos.</td><td>Terminação TLS (balanceador, proxy, servidor).</td><td><code>curl -v https://&lt;host&gt;</code> (handshake e certificado).</td></tr><tr><td>7 Aplicação</td><td>dados</td><td>DNS, HTTP (método, status), payload, regra de negócio, autenticação, autorização.</td><td>Proxy, WAF, API gateway, aplicação, IAM.</td><td><code>nslookup</code>/<code>dig &lt;nome&gt;</code>, status HTTP, logs de aplicação.</td></tr></tbody></table></div><p>A ordem não precisa ser sempre de baixo para cima: comece onde a evidência é mais forte, mas não pule conclusões. HTTP 403 é diferente de porta filtrada. Falha de handshake TLS é diferente de rota ausente. Ping bloqueado não significa que o serviço está fora: muitos firewalls filtram ICMP e deixam a porta do serviço aberta.</p><p>Na Camada 7, separe os dois status mais confundidos: <strong>401</strong> indica que faltam credenciais válidas (autenticação); <strong>403</strong> indica que o servidor entendeu o pedido e recusou (autorização ou política). Nos dois casos o fluxo já atravessou rede, transporte e, em HTTPS, o TLS.</p><div class=\"callout warning\"><strong>Erros comuns:</strong><ul><li><strong>Achar que ping prova que a aplicação funciona.</strong> Ping é evidência limitada de Camada 3/ICMP; falhas de porta, TLS, HTTP ou autenticação passam despercebidas.</li><li><strong>Chamar HTTP 403 de bloqueio de rede.</strong> O usuário só vê que “não acessou”, e o time mexe no firewall sem necessidade.</li></ul></div><div class=\"callout\"><strong>Limites do modelo:</strong> o OSI é conceitual e protocolos reais podem atravessar mais de uma camada (o TLS é o exemplo clássico). Nenhum comando prova ausência de problema: cada um prova só uma parte do fluxo. Cloud e produtos gerenciados escondem camadas, mas não eliminam seus efeitos.</div></section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2><p>Um único acesso a uma aplicação interna pode atravessar notebook, Wi-Fi, switch, roteador, firewall, VPN, proxy, balanceador, WAF, API gateway, serviço, banco e IAM. Cada componente e cada transição entre camadas pode gerar um sintoma diferente. Para cada caixa do desenho, pergunte: o que ela decide, que log gera, que risco reduz e que risco fica fora do seu escopo.</p><p>Essa mesma lógica vira a <strong>matriz de segurança</strong>: o OSI organiza a defesa em profundidade, com controles complementares em cada camada.</p><div class=\"responsive-table\"><table class=\"data-table risk-table\"><thead><tr><th>Camada</th><th>Risco</th><th>Evidência</th><th>Mitigação</th></tr></thead><tbody><tr><td>1</td><td>Porta física exposta.</td><td>Inventário, switchport, local físico.</td><td>Controle físico de racks, desativar portas, NAC.</td></tr><tr><td>2</td><td>ARP/VLAN/loop mal controlado.</td><td>Tabela MAC, ARP, logs de switch.</td><td>802.1X, port security, segmentação, monitoramento de ARP, STP, documentação.</td></tr><tr><td>3</td><td>Alcance IP amplo demais.</td><td>Rotas, flow logs, traceroute.</td><td>Subnets, ACLs, firewall, menor privilégio.</td></tr><tr><td>4</td><td>Porta exposta sem necessidade.</td><td>Listeners, logs de firewall, conexão TCP.</td><td>Fechar portas, firewall stateful com regras restritivas, egress controlado.</td></tr><tr><td>5-7</td><td>Token, TLS, HTTP, autorização e dados.</td><td>WAF, IAM, logs de aplicação, auditoria.</td><td>MFA, RBAC, validação, logging, WAF, correção de código.</td></tr></tbody></table></div></section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2><p>Em casa, seu notebook não abre um site. Investigue por camadas: o Wi-Fi está conectado? Há IP e gateway? O ping para o roteador responde? O DNS resolve? A conexão TCP/443 abre? O certificado é válido? Falha só um site ou todos?</p><p>“A internet caiu” é uma frase incompleta: pode ser Wi-Fi fraco, DHCP ausente, DNS errado, rota do provedor, firewall local, TLS inválido ou erro do próprio site. Cada resposta acima elimina ou confirma uma dessas hipóteses.</p></section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2><p>Um usuário não acessa um sistema interno. Cada time fala a sua língua: rede valida VLAN, IP, rota, firewall e porta; segurança valida política, VPN, proxy, logs e segmentação; identidade valida grupo, MFA e token; aplicação valida status HTTP, logs de backend e autorização. O OSI é o vocabulário comum que aponta todos para o mesmo fluxo.</p><p>Com ele, ninguém culpa ninguém sem prova. Se há TCP estabelecido e HTTP 403, a hipótese de bloqueio de firewall perde força. Se não há ARP para o gateway, não faz sentido investigar token. Se o DNS resolve para um IP público errado, não adianta reiniciar a aplicação.</p></section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2><p>Uma aplicação privada em cloud pode envolver VPC/VNet, subnet, route table, security group ou NSG, NACL, NAT gateway, load balancer, private endpoint, DNS privado, TLS, API gateway, WAF e IAM. Um erro de acesso pode estar em qualquer um: rota, security group, DNS privado, certificado, listener do load balancer, health check, regra do WAF, autorização IAM ou a própria aplicação. O OSI evita chamar tudo de “problema da cloud”: ele separa conectividade, transporte, segurança de borda, identidade e aplicação.</p><div class=\"callout warning\"><strong>Custo:</strong> investigar errado em cloud custa dinheiro. NAT gateways, firewalls gerenciados, flow logs, tráfego entre zonas e ambientes temporários esquecidos aumentam a fatura. Teste com escopo mínimo antes de provisionar mais recursos.</div></section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>Exemplo em DevSecOps</h2><p>Pipelines usam a rede para clonar repositórios, baixar imagens de registries, chamar scanners e APIs cloud e aplicar IaC. Quando um job falha com timeout, siga a matriz antes de mexer em código ou infraestrutura: resolver o nome, testar rota, testar porta, validar proxy e egress firewall, validar TLS, validar token e escopo de permissão. Em Kubernetes, a mesma lógica passa por DNS interno, Service, EndpointSlice, NetworkPolicy, Ingress, TLS Secret e aplicação.</p></section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2><svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"osi-review-title osi-review-desc\"><title id=\"osi-review-title\">Revisão prática do Modelo OSI</title><desc id=\"osi-review-desc\">Mapa visual conectando camadas OSI, PDUs, evidências, comandos e preparação para Ethernet, MAC, switches e ARP.</desc><defs><marker id=\"m02l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs><rect x=\"40\" y=\"55\" width=\"200\" height=\"390\" rx=\"18\" class=\"svg-zone\"/><text x=\"140\" y=\"85\" text-anchor=\"middle\" class=\"svg-label\">Modelo OSI</text><rect x=\"70\" y=\"105\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--server\"/><text x=\"140\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">7 Aplicação</text><rect x=\"70\" y=\"150\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--security\"/><text x=\"140\" y=\"173\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">6 Apresentação</text><rect x=\"70\" y=\"195\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--cloud\"/><text x=\"140\" y=\"218\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">5 Sessão</text><rect x=\"70\" y=\"240\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--firewall\"/><text x=\"140\" y=\"263\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4 Transporte</text><rect x=\"70\" y=\"285\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--router\"/><text x=\"140\" y=\"308\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">3 Rede</text><rect x=\"70\" y=\"330\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--switch\"/><text x=\"140\" y=\"353\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">2 Enlace</text><rect x=\"70\" y=\"375\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--client\"/><text x=\"140\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">1 Física</text><rect x=\"315\" y=\"70\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node\"/><text x=\"425\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Pergunta certa</text><text x=\"425\" y=\"125\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Qual camada tem evidência?</text><rect x=\"315\" y=\"220\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"425\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">Matriz de diagnóstico</text><text x=\"425\" y=\"275\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sintoma → hipótese → teste</text><rect x=\"315\" y=\"370\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--cloud\"/><text x=\"425\" y=\"400\" text-anchor=\"middle\" class=\"svg-label\">Matriz de segurança</text><text x=\"425\" y=\"425\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Risco → controle → log</text><rect x=\"650\" y=\"80\" width=\"260\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"780\" y=\"110\" text-anchor=\"middle\" class=\"svg-label\">Próximo módulo</text><text x=\"780\" y=\"137\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ethernet, MAC, Switches e ARP</text><rect x=\"650\" y=\"235\" width=\"260\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"780\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Próximos fundamentos</text><text x=\"780\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Frames, VLAN, ARP e tabela MAC</text><rect x=\"650\" y=\"385\" width=\"260\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--firewall\"/><text x=\"780\" y=\"415\" text-anchor=\"middle\" class=\"svg-label\">Uso profissional</text><text x=\"780\" y=\"442\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Troubleshooting e Blue Team</text><line x1=\"240\" y1=\"250\" x2=\"315\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"240\" y1=\"250\" x2=\"315\" y2=\"260\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"240\" y1=\"250\" x2=\"315\" y2=\"410\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"535\" y1=\"110\" x2=\"650\" y2=\"120\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"535\" y1=\"260\" x2=\"650\" y2=\"278\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"535\" y1=\"410\" x2=\"650\" y2=\"428\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l10-arrow)\"/></svg><p>O diagrama resume a revisão: das camadas para três usos (a pergunta certa, a matriz de diagnóstico e a matriz de segurança) e daí para o Módulo 3, que aprofunda a Camada 2: frames, MAC, switches, VLAN e ARP.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2><ul><li><strong>Modelo mental:</strong> o OSI é uma escada de perguntas; cada degrau tem PDU, sintomas, evidências, comandos, riscos e controles próprios.</li><li><strong>Roteiro:</strong> sintoma → camada provável → evidência → comando ou log → interpretação → próximo teste → ação segura.</li><li><strong>Separe as camadas:</strong> ping prova pouco; porta aberta não é autorização; 401 é autenticação e 403 é autorização, com a rede já funcionando.</li><li><strong>Erro comum:</strong> chamar tudo de problema de rede, ou tudo de problema de aplicação, e liberar acesso amplo sem evidência.</li><li><strong>Segurança:</strong> defesa em profundidade por camada, e evidências sanitizadas antes de compartilhar.</li></ul></section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2><p>A próxima aula, <strong>Ethernet: a base da rede local cabeada</strong>, abre o Módulo 3 e aprofunda a Camada 2 que você acabou de localizar no OSI: frames Ethernet, endereços MAC e como o switch aprende MACs por porta.</p></section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 5",
      "Camada 6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "ARP",
      "IPv4",
      "ICMP",
      "TCP",
      "UDP",
      "TLS",
      "HTTP",
      "DNS"
    ],
    "dependsOn": [
      "Módulo 0",
      "Módulo 1",
      "Aulas 2.1 a 2.9"
    ],
    "enables": [
      "Ethernet",
      "MAC",
      "Switching",
      "ARP",
      "VLAN",
      "Troubleshooting profissional",
      "Segurança de redes"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Sem link",
      "IP ausente",
      "Gateway inacessível",
      "DNS falha",
      "Porta TCP não conecta",
      "TLS falha",
      "HTTP 401/403/500",
      "Usuário autenticado sem autorização"
    ],
    "diagnosticQuestions": [
      "Qual camada já foi comprovada?",
      "Qual evidência existe?",
      "Que hipótese ainda não foi testada?",
      "O teste é autorizado e seguro?",
      "Há logs suficientes?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\nping <gateway>\ntracert <destino>\nnslookup <nome>\nTest-NetConnection <host> -Port 443",
        "purpose": "Coletar evidências iniciais de camadas 2 a 7 (Test-NetConnection roda no PowerShell).",
        "expectedObservation": "IP, gateway, caminho, DNS e porta testados de forma ordenada.",
        "interpretation": "Rode um comando por vez e ligue cada resultado a uma camada; um ping que falha não encerra a investigação."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\nping -c 4 <gateway>\ntraceroute <destino>\ndig <nome>\ncurl -vkI https://<host>",
        "purpose": "Coletar configuração, rota, DNS, transporte, TLS e HTTP.",
        "expectedObservation": "Evidências de conectividade e aplicação.",
        "interpretation": "Um status HTTP no curl prova que as camadas inferiores chegaram até a aplicação. O -k ignora a validação do certificado: para confirmar que ele é válido, repita sem -k."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status\nshow mac address-table\nshow arp\nshow ip route\nshow access-lists",
        "purpose": "Observar interface, MAC, ARP, rota e políticas.",
        "expectedObservation": "Interfaces ativas, tabelas coerentes e regras documentadas.",
        "interpretation": "Útil para confirmar onde o tráfego deveria passar."
      }
    ],
    "decisionTree": [
      {
        "if": "Não há link físico",
        "then": "Investigar Camada 1 antes de IP, DNS ou aplicação."
      },
      {
        "if": "Gateway não responde e ARP falha",
        "then": "Investigar Camada 2: VLAN, switchport, cabo ou ARP."
      },
      {
        "if": "DNS resolve e porta TCP conecta, mas HTTP retorna 403",
        "then": "Investigar autorização, sessão, IAM ou aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar evidências por camada.",
      "Sanitizar IPs públicos, nomes internos, tokens e usuários antes de compartilhar.",
      "Testar hipóteses com menor impacto possível.",
      "Separar conectividade de autorização.",
      "Usar logs de rede, aplicação e identidade de forma correlacionada."
    ],
    "badPractices": [
      "Liberar any-any para testar.",
      "Copiar PCAP com tokens sem sanitização.",
      "Concluir causa sem evidência.",
      "Tratar VPN, firewall, TLS ou VLAN como solução completa."
    ],
    "commonErrors": [
      "Confundir porta aberta com aplicação saudável.",
      "Confundir autenticação com autorização.",
      "Ignorar rota de retorno.",
      "Ignorar horário e fuso dos logs."
    ],
    "vulnerabilities": [
      {
        "name": "Mudança permissiva por diagnóstico fraco",
        "description": "Quando a equipe libera tráfego amplo para resolver um sintoma sem entender a camada real.",
        "defensiveExplanation": "O risco é criar exposição persistente e difícil de auditar.",
        "mitigation": "Testes controlados, mudança temporária documentada, rollback e validação por camada."
      }
    ],
    "monitoring": [
      "Flow logs",
      "Firewall logs",
      "WAF logs",
      "DNS logs",
      "IAM audit logs",
      "Application logs",
      "Switch logs"
    ],
    "hardening": [
      "Segmentação",
      "Menor privilégio",
      "Controle de egress",
      "NAC/802.1X",
      "MFA",
      "TLS bem validado",
      "Logs com retenção adequada"
    ],
    "detectionIdeas": [
      "Conexões laterais incomuns",
      "Falhas repetidas de autorização",
      "Portas novas expostas",
      "Mudanças de rota",
      "Aumento de resets TCP",
      "Erros HTTP anormais"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que decorar as sete camadas é insuficiente para trabalhar com redes e segurança?",
      "hints": [
        "Pense em evidência.",
        "Pense em troubleshooting."
      ],
      "expectedIdeas": [
        "camadas como método",
        "hipótese",
        "teste",
        "interpretação",
        "ação segura"
      ],
      "explanation": "O valor do OSI está em organizar investigação e comunicação técnica."
    },
    {
      "type": "diagnóstico",
      "question": "Em cloud, o security group libera TCP/443 e o health check do load balancer está verde, mas usuários que chegam pela VPN recebem timeout. Quais camadas e componentes você investigaria, e por quê?",
      "hints": [
        "O health check sai de outra origem.",
        "Timeout não é resposta da aplicação."
      ],
      "expectedIdeas": [
        "camadas 3 e 4",
        "rota de retorno para a faixa da VPN",
        "route table e NACL",
        "DNS privado resolvendo para o IP certo",
        "logs de VPN e flow logs"
      ],
      "explanation": "O health check prova que o serviço responde para a origem dele, não para a faixa da VPN. Timeout aponta para caminho (rota, retorno, NACL, firewall) ou DNS, não para autorização."
    },
    {
      "type": "cenário real",
      "question": "Como você apresentaria uma conclusão OSI para rede, segurança e aplicação sem culpar uma equipe indevidamente?",
      "hints": [
        "Use evidências.",
        "Separe camadas."
      ],
      "expectedIdeas": [
        "relatório sanitizado",
        "matriz",
        "evidência por camada",
        "próximo teste"
      ],
      "explanation": "Comunicação técnica deve ser baseada em evidências e próximos passos claros."
    }
  ],
  "quiz": [
    {
      "id": "q2.10.7",
      "question": "O ping para o servidor da aplicação falha, mas Test-NetConnection <host> -Port 443 retorna sucesso. Qual conclusão é mais correta?",
      "options": [
        "O servidor está fora do ar",
        "O ICMP provavelmente está filtrado; o serviço está alcançável",
        "Há uma rota ausente entre cliente e servidor",
        "O cabo do servidor está com defeito"
      ],
      "answer": 1,
      "explanation": "Muitos firewalls filtram ICMP e deixam a porta do serviço aberta. Se o TCP/443 conecta, rota e enlace funcionam até o servidor; ping é evidência limitada de Camada 3/ICMP.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.10.2",
      "question": "Um serviço retorna HTTP 403. O que isso indica mais diretamente?",
      "options": [
        "Bloqueio do firewall na porta 443",
        "Falha no handshake TLS",
        "Rota de retorno ausente",
        "A aplicação recebeu o pedido e o recusou por autorização ou política"
      ],
      "answer": 3,
      "explanation": "Para existir um status HTTP, a conexão TCP (e o TLS, em HTTPS) já funcionou. O 403 é resposta de Camada 7: o servidor entendeu o pedido e recusou por autorização ou política.",
      "topic": "camada 7",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.10.8",
      "question": "O gateway não responde ao ping e o host não tem entrada ARP para ele. Por onde começar a investigação?",
      "options": [
        "Camada 2: VLAN, switchport, cabo ou ARP",
        "Camada 7: token e sessão do usuário",
        "Camada 4: porta do serviço no gateway",
        "Camada 6: certificado TLS do gateway"
      ],
      "answer": 0,
      "explanation": "Sem ARP resolvido, o host não consegue entregar frames ao gateway. Investigue o enlace (e o físico) antes de rota, DNS ou aplicação.",
      "topic": "enlace",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.10.4",
      "question": "Qual conjunto está mais associado à Camada 2?",
      "options": [
        "MAC, frame, switch e VLAN",
        "IP, rota e TTL",
        "TCP, UDP e portas",
        "HTTP, cookie e JSON"
      ],
      "answer": 0,
      "explanation": "MAC, frame, switch e VLAN pertencem ao raciocínio de enlace.",
      "topic": "enlace",
      "difficulty": "iniciante",
      "type": "arquitetura"
    },
    {
      "id": "q2.10.5",
      "question": "Em cloud, um security group permitindo TCP/443 prova que a aplicação autorizou o usuário?",
      "options": [
        "Sim, porta 443 aberta garante autorização",
        "Sim, desde que haja TLS",
        "Sim, se o DNS resolver",
        "Não: prova só que o controle permite o tráfego TCP/443"
      ],
      "answer": 3,
      "explanation": "Security group é controle de rede/transporte. Ele não substitui a autenticação e a autorização da aplicação.",
      "topic": "cloud",
      "difficulty": "intermediário",
      "type": "cloud"
    },
    {
      "id": "q2.10.6",
      "question": "Qual é uma boa sequência mental para um chamado vago?",
      "options": [
        "Começar sempre pela Camada 1 e só subir depois de verificar cada camada por completo",
        "Liberar temporariamente o firewall para ver se o problema some",
        "Sintoma, hipótese, evidência, teste seguro, interpretação e próximo passo",
        "Rodar todos os comandos disponíveis e analisar as saídas no final"
      ],
      "answer": 2,
      "explanation": "Esse roteiro reduz tentativa e erro e evita mudanças arriscadas. A ordem das camadas é flexível: comece onde a evidência é mais forte.",
      "topic": "método",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.10.7",
      "front": "HTTP 401 x HTTP 403: qual a diferença?",
      "back": "401: faltam credenciais válidas (autenticação). 403: o servidor entendeu e recusou (autorização ou política). Nos dois, rede e transporte (e TLS, em HTTPS) já funcionaram.",
      "tags": [
        "http",
        "diagnóstico"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.10.3",
      "front": "Qual PDU é típica da Camada 2?",
      "back": "Frame/quadro Ethernet.",
      "tags": [
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.10.4",
      "front": "Qual PDU é típica da Camada 3?",
      "back": "Pacote IP.",
      "tags": [
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.10.5",
      "front": "Porta aberta significa autorização?",
      "back": "Não. Significa apenas que existe caminho de transporte até um serviço ou controle.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.10.6",
      "front": "O que sanitizar em evidências?",
      "back": "Tokens, senhas, usuários, IPs sensíveis, nomes internos e dados de negócio.",
      "tags": [
        "evidência"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.10.8",
      "front": "Por que curl -vkI não serve para validar o certificado?",
      "back": "O -k (--insecure) ignora a validação do certificado: o status HTTP aparece mesmo com certificado inválido. Para testar o certificado, rode sem -k.",
      "tags": [
        "tls",
        "comandos"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.10.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre sintoma, hipótese e evidência em um chamado de rede.",
      "expectedAnswer": "Sintoma é o que foi observado; hipótese é uma explicação possível; evidência é o dado que confirma ou enfraquece a hipótese.",
      "explanation": "Essa separação é a base do troubleshooting por camadas."
    },
    {
      "id": "ex2.10.2",
      "type": "diagnóstico",
      "prompt": "Classifique: DNS resolve, TCP conecta, TLS é válido e HTTP retorna 401.",
      "expectedAnswer": "Camadas inferiores e TLS funcionam; investigar autenticação/sessão nas camadas superiores.",
      "explanation": "401 aponta para autenticação, não para link físico ou rota."
    },
    {
      "id": "ex2.10.4",
      "type": "arquitetura",
      "prompt": "Crie uma matriz simples com três camadas, evidência e controle para um acesso web interno.",
      "expectedAnswer": "Exemplo: camada 3 route/flow log/firewall; camada 4 porta/listener/firewall stateful; camada 7 HTTP status/app log/WAF ou IAM.",
      "explanation": "A resposta deve conectar camada, evidência e controle."
    }
  ],
  "challenge": {
    "title": "Diagnóstico OSI final: aplicação interna inacessível",
    "scenario": "Parte dos usuários remotos relata que uma aplicação interna não abre corretamente. Alguns recebem timeout, outros recebem HTTP 403. A aplicação fica atrás de VPN, firewall, load balancer, TLS e autenticação corporativa.",
    "tasks": [
      "Criar matriz OSI por camada.",
      "Separar os usuários por sintoma.",
      "Definir evidências necessárias.",
      "Indicar comandos e logs seguros.",
      "Propor próximos passos sem liberar acesso amplo."
    ],
    "constraints": [
      "Não executar varredura agressiva.",
      "Não coletar credenciais ou tokens.",
      "Não alterar firewall sem evidência.",
      "Sanitizar o relatório."
    ],
    "expectedDeliverables": [
      "Matriz OSI",
      "Diagrama do fluxo",
      "Lista de evidências",
      "Hipóteses por grupo de usuários",
      "Plano de ação seguro"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta de camadas",
        "points": 30,
        "description": "Diferencia timeout, TCP, TLS, HTTP e autorização."
      },
      {
        "criterion": "Evidências e comandos",
        "points": 25,
        "description": "Propõe testes seguros e relevantes."
      },
      {
        "criterion": "Segurança e sanitização",
        "points": 25,
        "description": "Evita exposição de dados e mudanças permissivas."
      },
      {
        "criterion": "Clareza do relatório",
        "points": 20,
        "description": "Entrega conclusão objetiva e próximos passos."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos os usuários por sintoma. Timeout pode envolver rede, rota, firewall, VPN, DNS ou transporte. HTTP 403 mostra que o fluxo chegou até a aplicação ou controle de aplicação e foi negado por política, autorização ou sessão. Não se deve tratar ambos como a mesma falha.",
    "steps": [
      "Listar origem, destino, horário e sintoma.",
      "Criar matriz OSI por grupo de usuários.",
      "Testar DNS, rota, porta, TLS e HTTP de forma segura.",
      "Coletar logs de VPN, firewall, load balancer, WAF, IAM e aplicação.",
      "Separar timeout de 403.",
      "Propor correções específicas por evidência."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar any-any no firewall.",
        "whyItIsWrong": "Cria risco amplo e não resolve necessariamente autorização ou aplicação."
      },
      {
        "answer": "Dizer que 403 é problema de rede.",
        "whyItIsWrong": "403 é resposta HTTP e indica camada superior."
      },
      {
        "answer": "Ignorar usuários que recebem timeout.",
        "whyItIsWrong": "Timeout pode indicar problema real de rede, VPN, rota ou firewall para parte dos usuários."
      }
    ],
    "finalAnswer": "A solução correta separa os sintomas: timeout deve ser investigado nas camadas 3/4 e caminho VPN/firewall, enquanto HTTP 403 deve ser investigado em sessão, IAM, autorização, WAF ou aplicação. O relatório deve conter evidências por camada e não recomendar liberações amplas sem prova."
  },
  "glossary": [
    {
      "term": "Matriz OSI",
      "shortDefinition": "Tabela que relaciona cada camada a perguntas, evidências, testes e controles.",
      "longDefinition": "Ferramenta de troubleshooting e segurança usada para organizar investigação por camada.",
      "example": "Camada 4: testar TCP/443 com Test-NetConnection ou curl.",
      "relatedTerms": [
        "troubleshooting",
        "evidência"
      ],
      "relatedLessons": [
        "2.1",
        "2.8",
        "2.10"
      ]
    },
    {
      "term": "Evidência",
      "shortDefinition": "Dado observável que apoia ou enfraquece uma hipótese.",
      "longDefinition": "Pode ser comando, log, captura, métrica, status HTTP, evento IAM ou configuração.",
      "example": "HTTP 403 é evidência de resposta de aplicação/autorização.",
      "relatedTerms": [
        "hipótese",
        "log"
      ],
      "relatedLessons": [
        "1.9",
        "2.8"
      ]
    },
    {
      "term": "Hipótese",
      "shortDefinition": "Explicação possível para um sintoma.",
      "longDefinition": "Deve ser testável e associada a uma camada ou componente.",
      "example": "A hipótese é que o DNS privado está resolvendo para IP errado.",
      "relatedTerms": [
        "diagnóstico"
      ],
      "relatedLessons": [
        "2.8"
      ]
    },
    {
      "term": "Sanitização",
      "shortDefinition": "Remoção ou mascaramento de dados sensíveis antes de compartilhar evidências.",
      "longDefinition": "Protege tokens, senhas, IPs sensíveis, usuários e topologia interna.",
      "example": "Substituir nomes reais por host-A e rede-interna-X.",
      "relatedTerms": [
        "segurança",
        "evidência"
      ],
      "relatedLessons": [
        "2.9"
      ]
    },
    {
      "term": "PDU",
      "shortDefinition": "Unidade de dados de protocolo em uma camada.",
      "longDefinition": "Dados, segmento, pacote, quadro e bits são formas de PDU em camadas diferentes.",
      "example": "Na Camada 2, a PDU é o frame Ethernet.",
      "relatedTerms": [
        "encapsulamento"
      ],
      "relatedLessons": [
        "2.2"
      ]
    },
    {
      "term": "Defesa em profundidade",
      "shortDefinition": "Uso combinado de controles em múltiplas camadas.",
      "longDefinition": "A segurança não depende de um único controle, mas de controles complementares.",
      "example": "VLAN, firewall, TLS, WAF, IAM e logs atuando juntos.",
      "relatedTerms": [
        "segurança por camadas"
      ],
      "relatedLessons": [
        "2.9"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aulas 2.1 a 2.9 são pré-requisitos diretos desta revisão."
    },
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Open Systems Interconnection Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual do modelo OSI."
    },
    {
      "type": "rfc",
      "title": "RFC 9110 — HTTP Semantics",
      "organization": "IETF",
      "url": "",
      "note": "Útil para diferenciar status HTTP de problemas de rede."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e troubleshooting",
      "lesson": "referência futura",
      "reason": "A matriz OSI se conecta a runbooks, SLOs, logs e incident response."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação e autorização",
      "lesson": "referência futura",
      "reason": "HTTP 401/403, sessão, token e escopo dependem de IAM e autorização."
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
      "3.1"
    ]
  }
};
