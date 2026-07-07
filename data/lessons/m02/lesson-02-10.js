export const lesson0210 = {
  "id": "2.10",
  "moduleId": "m02",
  "order": 10,
  "title": "Revisão prática do Modelo OSI",
  "subtitle": "Consolidação das sete camadas como método de diagnóstico, arquitetura, segurança e preparação para Ethernet, MAC, switches e ARP.",
  "duration": "80-115 min",
  "estimatedStudyTimeMinutes": 115,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Depois de estudar o Modelo OSI camada por camada, a pergunta mais importante não é se você decorou a ordem das sete camadas. A pergunta profissional é: <strong>você consegue usar esse modelo para diagnosticar um problema real sem se perder?</strong></p><p>Em uma ocorrência comum, alguém diz: “o sistema caiu”, “a rede está lenta”, “a VPN não funciona”, “o site não abre”, “o usuário não acessa a API” ou “o firewall está bloqueando”. Essas frases são sintomas, não diagnósticos. A revisão prática do Modelo OSI existe para transformar frases vagas em perguntas técnicas: há link físico? Há endereço? Há rota? Há porta aberta? Há TLS? Há resposta HTTP? Há sessão? Há autorização?</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário remoto consegue resolver DNS, abre conexão TCP/443, negocia TLS, recebe HTTP 403 e mesmo assim o chamado chega como “problema de rede”. Com o Modelo OSI, você prova que a rede e o transporte podem estar funcionando e que a falha provavelmente está em autorização, sessão, política de aplicação ou IAM.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>O Modelo OSI surgiu como tentativa de padronizar a comunicação entre sistemas diferentes. Mesmo que a internet real tenha se consolidado em torno do conjunto TCP/IP, o OSI permaneceu extremamente útil como linguagem comum de ensino, documentação e troubleshooting.</p><p>Na prática corporativa, o OSI virou uma ferramenta de comunicação entre equipes. O time de rede fala de link, VLAN, IP, rota e porta. O time de segurança fala de controles, logs, WAF, VPN, identidade e detecção. O time de aplicação fala de HTTP, sessão, payload, erro 500 e regra de negócio. O time de cloud fala de VPC/VNet, subnet, route table, security group, load balancer e private endpoint. O OSI ajuda todos esses grupos a apontarem para o mesmo fluxo sem misturar conceitos.</p><p>Essa revisão fecha o módulo porque você já viu a motivação do modelo, o encapsulamento, as camadas individuais e a aplicação em troubleshooting e cibersegurança. Agora o foco é consolidar o raciocínio para que, no Módulo 3, Ethernet, MAC, switches e ARP tenham um lugar claro dentro da arquitetura.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>O problema técnico desta revisão é que muitos alunos aprendem o OSI como memorização, mas não como ferramenta. Decorar “Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação” não ajuda se o aluno não souber o que observar em cada camada.</p><ul class=\"flow-list\"><li><strong>Sem método:</strong> o diagnóstico vira tentativa e erro.</li><li><strong>Sem evidência:</strong> uma hipótese vira opinião.</li><li><strong>Sem separação de camadas:</strong> erro de autenticação vira “problema de rede”.</li><li><strong>Sem noção de PDU:</strong> o aluno não entende o que aparece no Wireshark.</li><li><strong>Sem segurança por camadas:</strong> firewall, TLS, VLAN e IAM são tratados como se fossem controles equivalentes.</li></ul><p>O objetivo é criar um roteiro mental: sintoma → camada provável → evidência → comando ou log → interpretação → próximo teste → ação segura.</p></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><p>A maturidade no uso do OSI evolui de memorização para análise integrada. A tabela mostra essa evolução.</p><table class=\"data-table comparison-table\"><thead><tr><th>Estágio</th><th>Como o aluno pensa</th><th>Limitação</th><th>Evolução desejada</th></tr></thead><tbody><tr><td>Decorar camadas</td><td>Repete nomes em ordem.</td><td>Não diagnostica falhas reais.</td><td>Associar cada camada a evidências.</td></tr><tr><td>Associar protocolos</td><td>HTTP na aplicação, TCP no transporte, IP na rede.</td><td>Ainda pode confundir sintoma com causa.</td><td>Criar hipóteses testáveis.</td></tr><tr><td>Usar comandos</td><td>Executa ping, traceroute, curl, nslookup.</td><td>Comando sem interpretação pode enganar.</td><td>Interpretar resultado por camada.</td></tr><tr><td>Correlacionar evidências</td><td>Combina endpoint, rede, firewall, DNS, TLS, HTTP, IAM e aplicação.</td><td>Exige disciplina e documentação.</td><td>Gerar relatório técnico e plano de ação.</td></tr><tr><td>Aplicar em segurança</td><td>Relaciona risco, controle, log e mitigação por camada.</td><td>Exige limites éticos e autorização.</td><td>Defesa em profundidade e investigação defensiva.</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p><strong>Revisão prática do Modelo OSI</strong> é o processo de usar as sete camadas como uma matriz de raciocínio para entender comunicação, localizar falhas, explicar riscos, escolher controles e preparar documentação técnica.</p><div class=\"definition-box\"><strong>Definição:</strong> nesta aula, revisar o OSI não significa recitar camadas. Significa demonstrar que você consegue mapear um fluxo real em camadas, identificar PDUs, coletar evidências, separar rede de aplicação e propor ações seguras.</div><p>O resultado esperado é que você consiga olhar para um fluxo “cliente acessa aplicação web interna” e descrever: bits no meio físico, frames Ethernet, endereços MAC, pacote IP, portas TCP, TLS, HTTP, sessão, token, autorização e logs.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><p>O raciocínio interno da revisão usa uma matriz fixa. Para cada camada, você deve responder quatro perguntas: o que ela entrega, o que pode falhar, qual evidência observar e qual próximo teste faz sentido.</p><ol class=\"flow-list\"><li><strong>Camada 1:</strong> há sinal, link, rádio, energia, cabo, fibra ou interface ativa?</li><li><strong>Camada 2:</strong> há frame, MAC, VLAN, ARP, tabela MAC e domínio de broadcast coerente?</li><li><strong>Camada 3:</strong> há IP, máscara, gateway, rota, TTL e retorno?</li><li><strong>Camada 4:</strong> há porta, listener, handshake, estado, timeout ou reset?</li><li><strong>Camada 5:</strong> há sessão, cookie, token, contexto e validade?</li><li><strong>Camada 6:</strong> há encoding, serialização, compressão, TLS e certificado válidos?</li><li><strong>Camada 7:</strong> há DNS, HTTP, método, status, payload, regra de negócio, autenticação e autorização?</li></ol><p>A ordem não precisa ser sempre de baixo para cima. Em incidentes reais, você pode começar onde há evidência mais forte. O importante é não pular conclusões. Um HTTP 403 é diferente de porta filtrada. Um TLS handshake failure é diferente de rota ausente. Um ping bloqueado não significa necessariamente que o serviço está fora.</p></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Dentro de uma arquitetura corporativa moderna, o OSI aparece como mapa transversal. Um único acesso a uma aplicação interna pode atravessar notebook, Wi-Fi, switch, roteador, firewall, VPN, proxy, balanceador, WAF, API gateway, serviço, banco, IAM e logs.</p><ul><li><strong>Camada física e enlace:</strong> acesso local, cabo, rádio, switch, VLAN, AP e controle de porta.</li><li><strong>Camada de rede:</strong> subnet, rota, gateway, ACL, NAT, peering, VPN e private endpoint.</li><li><strong>Camada de transporte:</strong> TCP, UDP, porta, estado e balanceamento.</li><li><strong>Camadas superiores:</strong> TLS, HTTP, DNS, sessão, token, API, IAM, aplicação e logs.</li><li><strong>Pontos de falha:</strong> cada transição entre camadas e cada equipamento intermediário pode gerar sintoma diferente.</li></ul><p>Arquiteturalmente, uma boa revisão OSI não desenha apenas “caixinhas”. Ela conecta caixinhas a perguntas: o que este componente decide? Que log ele gera? Que risco ele reduz? Que risco continua fora do escopo?</p></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em uma entrega corporativa. A Camada 1 é a estrada e o veículo existirem. A Camada 2 é o endereço local dentro de um condomínio ou prédio. A Camada 3 é a rota entre cidades. A Camada 4 é saber qual porta de atendimento recebe o pacote. As camadas superiores são idioma, formulário, autenticação do recebedor, autorização para retirar e regra interna da empresa.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não são entregas físicas perfeitas. Pacotes podem ser fragmentados, retransmitidos, roteados por caminhos diferentes, encapsulados em túneis e bloqueados por políticas automáticas. A analogia ajuda a organizar o pensamento, mas não substitui campos técnicos, logs e comandos.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Em casa, seu notebook não abre um site. Uma investigação por camadas poderia seguir assim: verificar se o Wi-Fi está conectado; confirmar IP e gateway; testar ping para o roteador; testar DNS; testar conexão TCP/443; testar navegador; observar certificado; verificar se apenas um site falha ou todos falham.</p><p>Esse exemplo mostra por que “internet caiu” é uma frase incompleta. Pode ser Wi-Fi fraco, DHCP ausente, DNS errado, rota do provedor, firewall local, TLS inválido ou erro do próprio site. O OSI transforma o sintoma em trilha de investigação.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Em uma empresa, um usuário não acessa um sistema interno. O time de rede valida VLAN, IP, rota, firewall e porta. O time de segurança valida política, VPN, proxy, logs e segmentação. O time de identidade valida grupo, MFA e token. O time da aplicação valida status HTTP, logs de backend e autorização.</p><p>A revisão prática do OSI evita que todos culpem todos. Se há TCP estabelecido e HTTP 403, a hipótese de bloqueio de firewall perde força. Se não há ARP para o gateway, não faz sentido investigar token. Se o DNS resolve para IP público errado, não adianta reiniciar a aplicação. A camada certa economiza tempo e reduz mudanças arriscadas.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em cloud, o OSI continua útil, mesmo com muitos detalhes abstraídos. Uma aplicação privada pode envolver VPC/VNet, subnet, route table, security group ou NSG, NACL, NAT gateway, load balancer, private endpoint, DNS privado, TLS, API gateway, WAF, IAM e logs.</p><p>Um erro de acesso pode estar em rota, security group, DNS privado, certificado, listener do load balancer, health check, regra WAF, autorização IAM ou aplicação. O OSI ajuda a não chamar tudo de “problema da cloud”. Ele separa conectividade, transporte, segurança de borda, identidade e aplicação.</p><div class=\"callout callout--warning\"><strong>Custo:</strong> em cloud, investigar errado pode gerar custos. Criar NAT gateways, firewalls gerenciados, flow logs, tráfego entre zonas e ambientes temporários sem limpeza pode aumentar a fatura. A revisão OSI ajuda a testar com escopo mínimo antes de provisionar mais recursos.</div></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em DevSecOps, pipelines dependem de rede para clonar repositórios, baixar imagens, acessar registries, falar com scanners, publicar artefatos, chamar APIs cloud e aplicar IaC. Quando um pipeline falha com timeout, pode ser DNS, proxy, egress firewall, TLS, porta, credencial, permissão ou API fora.</p><p>A revisão OSI orienta troubleshooting de pipeline: resolver nome, testar rota, testar porta, validar proxy, validar TLS, validar token, validar escopo de permissão e só então alterar código ou infraestrutura. Em Kubernetes, a mesma lógica aparece em DNS interno, Service, EndpointSlice, NetworkPolicy, Ingress, TLS Secret e aplicação.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Em segurança, o OSI organiza defesa em profundidade. Na Camada 1, controle físico e racks. Na Camada 2, NAC, 802.1X, port security, VLAN e monitoramento de ARP. Na Camada 3, segmentação, rotas, ACLs e flow logs. Na Camada 4, firewall stateful e exposição de portas. Nas camadas superiores, TLS, WAF, autenticação, autorização, logs de aplicação e proteção de dados.</p><table class=\"data-table risk-table\"><thead><tr><th>Camada</th><th>Risco</th><th>Evidência</th><th>Mitigação</th></tr></thead><tbody><tr><td>1</td><td>Porta física exposta.</td><td>Inventário, switchport, local físico.</td><td>Controle físico, desativar portas, NAC.</td></tr><tr><td>2</td><td>ARP/VLAN/loop mal controlado.</td><td>Tabela MAC, ARP, logs de switch.</td><td>Segmentação, inspeção defensiva, STP, documentação.</td></tr><tr><td>3</td><td>Alcance IP amplo demais.</td><td>Rotas, flow logs, traceroute.</td><td>Subnets, ACLs, firewall, menor privilégio.</td></tr><tr><td>4</td><td>Porta exposta sem necessidade.</td><td>Listeners, firewall logs, conexão TCP.</td><td>Fechar portas, regras restritivas, egress controlado.</td></tr><tr><td>5-7</td><td>Token, TLS, HTTP, autorização e dados.</td><td>WAF, IAM, aplicação, auditoria.</td><td>MFA, RBAC, validação, logging, WAF, correção de código.</td></tr></tbody></table></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2><svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"osi-review-title osi-review-desc\"><title id=\"osi-review-title\">Revisão prática do Modelo OSI</title><desc id=\"osi-review-desc\">Mapa visual conectando camadas OSI, PDUs, evidências, comandos e preparação para Ethernet, MAC, switches e ARP.</desc><defs><marker id=\"m02l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs><rect x=\"40\" y=\"55\" width=\"200\" height=\"390\" rx=\"18\" class=\"svg-zone\"/><text x=\"140\" y=\"85\" text-anchor=\"middle\" class=\"svg-label\">Modelo OSI</text><rect x=\"70\" y=\"105\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--server\"/><text x=\"140\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">7 Aplicação</text><rect x=\"70\" y=\"150\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--security\"/><text x=\"140\" y=\"173\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">6 Apresentação</text><rect x=\"70\" y=\"195\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--cloud\"/><text x=\"140\" y=\"218\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">5 Sessão</text><rect x=\"70\" y=\"240\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--firewall\"/><text x=\"140\" y=\"263\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4 Transporte</text><rect x=\"70\" y=\"285\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--router\"/><text x=\"140\" y=\"308\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">3 Rede</text><rect x=\"70\" y=\"330\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--switch\"/><text x=\"140\" y=\"353\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">2 Enlace</text><rect x=\"70\" y=\"375\" width=\"140\" height=\"35\" rx=\"8\" class=\"svg-node svg-node--client\"/><text x=\"140\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">1 Física</text><rect x=\"315\" y=\"70\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node\"/><text x=\"425\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Pergunta certa</text><text x=\"425\" y=\"125\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Qual camada tem evidência?</text><rect x=\"315\" y=\"220\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\"/><text x=\"425\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">Matriz de diagnóstico</text><text x=\"425\" y=\"275\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sintoma → hipótese → teste</text><rect x=\"315\" y=\"370\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--cloud\"/><text x=\"425\" y=\"400\" text-anchor=\"middle\" class=\"svg-label\">Matriz de segurança</text><text x=\"425\" y=\"425\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Risco → controle → log</text><rect x=\"650\" y=\"80\" width=\"260\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--switch\"/><text x=\"780\" y=\"110\" text-anchor=\"middle\" class=\"svg-label\">Próximo módulo</text><text x=\"780\" y=\"137\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ethernet, MAC, Switches e ARP</text><rect x=\"650\" y=\"235\" width=\"260\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--router\"/><text x=\"780\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Próximos fundamentos</text><text x=\"780\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Frames, VLAN, ARP e tabela MAC</text><rect x=\"650\" y=\"385\" width=\"260\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--firewall\"/><text x=\"780\" y=\"415\" text-anchor=\"middle\" class=\"svg-label\">Uso profissional</text><text x=\"780\" y=\"442\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Troubleshooting e Blue Team</text><line x1=\"240\" y1=\"250\" x2=\"315\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"240\" y1=\"250\" x2=\"315\" y2=\"260\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"240\" y1=\"250\" x2=\"315\" y2=\"410\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"535\" y1=\"110\" x2=\"650\" y2=\"120\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"535\" y1=\"260\" x2=\"650\" y2=\"278\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l10-arrow)\"/><line x1=\"535\" y1=\"410\" x2=\"650\" y2=\"428\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l10-arrow)\"/></svg><p>O diagrama resume o objetivo da revisão: sair de uma lista decorada de camadas e chegar a um método profissional de investigação, arquitetura e segurança. O próximo módulo mergulha na Camada 2, onde frames, MAC, switches, VLAN e ARP deixam de ser palavras soltas e passam a ser mecanismos observáveis.</p></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios reforçam produção ativa: classificar camadas, interpretar sintomas, escolher comandos, diferenciar causa provável de evidência insuficiente e construir respostas técnicas.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>O desafio final simula um chamado empresarial: uma aplicação interna está inacessível para parte dos usuários. Você deve montar uma análise por camadas, propor testes seguros, indicar logs necessários e explicar quando encaminhar para rede, segurança, identidade ou aplicação.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada não entrega apenas uma resposta final. Ela mostra como raciocinar: começar pelo sintoma, separar hipóteses por camada, coletar evidências mínimas, evitar mudanças amplas e documentar a conclusão.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><ul><li><strong>Ideia central:</strong> OSI é uma ferramenta prática de diagnóstico, arquitetura e segurança, não apenas uma lista para decorar.</li><li><strong>O que lembrar:</strong> cada camada tem perguntas, evidências, comandos, riscos e controles próprios.</li><li><strong>Erro comum:</strong> chamar tudo de problema de rede ou tudo de problema de aplicação.</li><li><strong>Uso real:</strong> troubleshooting, SOC, cloud, DevSecOps, documentação, revisão de mudança e resposta a incidente.</li><li><strong>Próxima ponte:</strong> o Módulo 3 aprofunda Camada 2 com Ethernet, MAC, switches, VLANs e ARP.</li></ul></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>O próximo módulo é <strong>Ethernet, MAC, Switches e ARP</strong>. Agora que você sabe localizar a Camada 2 no Modelo OSI, vamos estudar como a comunicação local realmente funciona: frames Ethernet, endereços MAC, tabela MAC do switch, broadcast, ARP, VLANs, loops e riscos defensivos em redes locais.</p></section>"
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
  "protocolFields": [
    {
      "field": "PDU por camada",
      "size": "varia",
      "purpose": "Diferenciar dados, segmento, pacote, quadro e bits.",
      "securityObservation": "Confundir PDU leva a controles no lugar errado."
    },
    {
      "field": "Origem e destino",
      "size": "MAC, IP, porta, URI ou usuário",
      "purpose": "Identificar origem/destino em cada camada.",
      "securityObservation": "IP não é usuário; porta aberta não é autorização."
    },
    {
      "field": "Status e evidência",
      "size": "log/evento",
      "purpose": "Separar permitido, bloqueado, falhou, autenticou ou negou.",
      "securityObservation": "Eventos precisam de correlação entre camadas."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Gera dados de aplicação.",
      "detail": "HTTP, DNS ou API cria payload e contexto.",
      "possibleFailure": "Erro de aplicação, sessão expirada ou autorização negada."
    },
    {
      "step": 2,
      "actor": "Transporte",
      "action": "Encapsula em TCP ou UDP.",
      "detail": "Portas, handshake, estado e retransmissão entram no diagnóstico.",
      "possibleFailure": "Timeout, reset, porta fechada ou firewall stateful."
    },
    {
      "step": 3,
      "actor": "Rede",
      "action": "Encapsula em IP e escolhe rota.",
      "detail": "IP, gateway, TTL e rota definem alcance.",
      "possibleFailure": "Rota ausente, gateway incorreto ou retorno inexistente."
    },
    {
      "step": 4,
      "actor": "Enlace",
      "action": "Entrega em frames locais.",
      "detail": "MAC, ARP, VLAN e switch entram em cena.",
      "possibleFailure": "ARP incorreto, VLAN errada, loop ou tabela MAC instável."
    },
    {
      "step": 5,
      "actor": "Física",
      "action": "Transmite sinais.",
      "detail": "Cobre, fibra ou rádio transportam bits.",
      "possibleFailure": "Cabo, sinal, interferência, SNR, link flap ou erro físico."
    }
  ],
  "deepDive": {
    "mentalModel": "O Modelo OSI é uma escada de perguntas. Cada degrau possui sintomas, evidências, comandos, riscos, controles e limitações.",
    "keyTerms": [
      "camada",
      "PDU",
      "evidência",
      "hipótese",
      "controle",
      "mitigação",
      "troubleshooting",
      "defesa em profundidade"
    ],
    "limitations": [
      "O OSI é conceitual; protocolos reais podem atravessar mais de uma camada.",
      "Nem todo comando prova ausência de problema; muitos provam apenas uma parte do fluxo.",
      "Cloud e produtos modernos abstraem camadas, mas não eliminam seus efeitos."
    ],
    "whenToUse": [
      "Chamados de rede ou aplicação.",
      "Investigação de segurança.",
      "Revisão de arquitetura.",
      "Desenho de cloud networking.",
      "Criação de playbooks e runbooks."
    ],
    "whenNotToUse": [
      "Como decoreba sem evidência.",
      "Como desculpa para culpar outra equipe.",
      "Como substituto de logs reais, métricas e documentação."
    ],
    "operationalImpact": [
      "Melhora triagem e reduz retrabalho entre equipes.",
      "Exige documentação, padronização de evidências e disciplina de mudança."
    ],
    "financialImpact": [
      "Reduz tempo de indisponibilidade e evita compras equivocadas de banda, appliances ou serviços cloud.",
      "Pode exigir ferramentas de observabilidade, flow logs e retenção de logs."
    ],
    "securityImpact": [
      "Aumenta maturidade defensiva por camadas.",
      "Reduz mudanças permissivas feitas sem hipótese e sem evidência."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Decorar OSI sem saber diagnosticar.",
      "whyItHappens": "O modelo costuma ser ensinado como lista.",
      "consequence": "O aluno não sabe o que coletar em incidentes reais.",
      "correction": "Associar cada camada a sintomas, comandos, logs e controles."
    },
    {
      "mistake": "Achar que ping prova que a aplicação funciona.",
      "whyItHappens": "Ping é fácil de executar.",
      "consequence": "Falhas de porta, TLS, HTTP ou autenticação passam despercebidas.",
      "correction": "Usar ping apenas como evidência limitada de camada 3/ICMP."
    },
    {
      "mistake": "Chamar HTTP 403 de bloqueio de rede.",
      "whyItHappens": "O usuário vê apenas que não conseguiu acessar.",
      "consequence": "O time altera firewall sem necessidade.",
      "correction": "Interpretar 403 como resposta de camada de aplicação/autorização."
    }
  ],
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
        "command": "ipconfig /all && ping <gateway> && tracert <destino> && nslookup <nome> && Test-NetConnection <host> -Port 443",
        "purpose": "Coletar evidências iniciais de camadas 2 a 7.",
        "expectedObservation": "IP, gateway, caminho, DNS e porta testados de forma ordenada.",
        "interpretation": "Cada resultado deve ser ligado a uma camada e não usado isoladamente."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ping -c 4 <gateway> && traceroute <destino> && dig <nome> && curl -vkI https://<host>",
        "purpose": "Coletar configuração, rota, DNS, transporte, TLS e HTTP.",
        "expectedObservation": "Evidências de conectividade e aplicação.",
        "interpretation": "curl com HTTP status prova que camadas inferiores já chegaram até a aplicação."
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
      "question": "Se TCP/443 conecta, TLS é válido e HTTP retorna 403, qual camada você investigaria primeiro?",
      "hints": [
        "403 é resposta da aplicação.",
        "Conectividade já chegou longe."
      ],
      "expectedIdeas": [
        "aplicação",
        "autorização",
        "sessão",
        "IAM",
        "grupos"
      ],
      "explanation": "A rede pode estar funcionando; a falha provável está nas camadas superiores."
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
      "id": "q2.10.1",
      "type": "conceito",
      "q": "Qual é o principal objetivo prático do Modelo OSI no troubleshooting?",
      "opts": [
        "Decorar nomes de camadas",
        "Organizar hipóteses, evidências e testes por camada",
        "Substituir o TCP/IP",
        "Eliminar a necessidade de logs"
      ],
      "a": 1,
      "exp": "O OSI é útil como método de investigação e comunicação técnica.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q2.10.2",
      "type": "diagnóstico",
      "q": "Um serviço retorna HTTP 403. O que isso indica mais diretamente?",
      "opts": [
        "Cabo desconectado",
        "Rota sempre ausente",
        "Resposta de aplicação/autorização",
        "Falha obrigatória de ARP"
      ],
      "a": 2,
      "exp": "HTTP 403 é uma resposta da camada de aplicação relacionada a autorização/política.",
      "difficulty": "iniciante-intermediário",
      "topic": "camada 7"
    },
    {
      "id": "q2.10.3",
      "type": "segurança",
      "q": "Qual prática é mais segura ao compartilhar evidências de diagnóstico?",
      "opts": [
        "Enviar PCAP bruto com tokens",
        "Sanitizar dados sensíveis",
        "Liberar any-any para testar",
        "Ignorar horário dos logs"
      ],
      "a": 1,
      "exp": "Evidências devem ser úteis, mas não expor tokens, usuários ou topologia sensível.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q2.10.4",
      "type": "arquitetura",
      "q": "Qual conjunto está mais associado à Camada 2?",
      "opts": [
        "MAC, frame, switch e VLAN",
        "IP, rota e TTL",
        "TCP, UDP e portas",
        "HTTP, cookie e JSON"
      ],
      "a": 0,
      "exp": "MAC, frame, switch e VLAN pertencem ao raciocínio de enlace.",
      "difficulty": "iniciante",
      "topic": "enlace"
    },
    {
      "id": "q2.10.5",
      "type": "cloud",
      "q": "Em cloud, um security group permitindo TCP/443 prova que a aplicação autorizou o usuário?",
      "opts": [
        "Sim, porta 443 garante autorização",
        "Não, isso prova apenas permissão de tráfego na camada de rede/transporte do controle",
        "Sim, se houver TLS",
        "Sim, se o DNS resolver"
      ],
      "a": 1,
      "exp": "Security group não substitui autenticação/autorização de aplicação.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q2.10.6",
      "type": "diagnóstico",
      "q": "Qual é uma boa sequência mental para um chamado vago?",
      "opts": [
        "Liberar firewall, reiniciar servidor, encerrar chamado",
        "Sintoma, hipótese, evidência, teste seguro, interpretação e próximo passo",
        "Pular direto para Wireshark sempre",
        "Assumir que é DNS"
      ],
      "a": 1,
      "exp": "Essa sequência reduz tentativa e erro e evita mudanças arriscadas.",
      "difficulty": "iniciante",
      "topic": "método"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.10.1",
      "front": "Qual é o maior erro ao aprender OSI?",
      "back": "Decorar camadas sem associá-las a evidências, sintomas e testes.",
      "tags": [
        "osi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.10.2",
      "front": "HTTP 403 aponta mais para qual área?",
      "back": "Aplicação, autorização, sessão, IAM ou política, não necessariamente rede.",
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
      "id": "ex2.10.3",
      "type": "segurança",
      "prompt": "Liste três riscos de compartilhar evidências sem sanitização.",
      "expectedAnswer": "Expor tokens, topologia interna, IPs, usuários, nomes de sistemas e dados sensíveis.",
      "explanation": "Evidência precisa ser útil e segura."
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
