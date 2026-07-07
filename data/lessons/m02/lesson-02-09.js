export const lesson0209 = {
  "id": "2.9",
  "moduleId": "m02",
  "order": 9,
  "title": "OSI aplicado à cibersegurança",
  "subtitle": "Como usar as camadas OSI para organizar ameaças, controles, evidências, detecção e mitigação sem cair em respostas genéricas.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 215,
  "tags": [
    "redes",
    "modelo osi",
    "cibersegurança",
    "blue team",
    "defesa em profundidade",
    "detecção",
    "mitigação",
    "logs",
    "soc",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "É necessário entender o Modelo OSI como linguagem de diagnóstico e arquitetura."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "Encapsulamento e PDUs ajudam a localizar onde controles e evidências aparecem."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.3-2.7",
      "reason": "As camadas física, enlace, rede, transporte e superiores foram apresentadas individualmente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.8",
      "reason": "A aula 2.8 ensinou troubleshooting por camadas, base para investigação defensiva."
    }
  ],
  "objectives": [
    "Aplicar o Modelo OSI como mapa mental de segurança defensiva.",
    "Relacionar cada camada a riscos, controles, logs, evidências e mitigações.",
    "Diferenciar controles preventivos, detectivos e corretivos por camada.",
    "Evitar conclusões genéricas como 'bloquear no firewall' sem entender onde está o risco.",
    "Construir uma matriz defensiva por camadas para ambiente corporativo ou cloud.",
    "Estabelecer limites éticos e seguros para laboratórios de cibersegurança em redes."
  ],
  "learningOutcomes": [
    "Dado um cenário de incidente, o aluno identifica camadas envolvidas e evidências esperadas.",
    "Dado um controle de segurança, o aluno explica em qual camada atua e o que ele não resolve.",
    "Dado um risco, o aluno propõe mitigação defensiva sem criar instruções ofensivas perigosas.",
    "Dado um fluxo web, o aluno separa risco de enlace, IP, porta, TLS, HTTP, sessão, identidade e aplicação.",
    "Dado um ambiente cloud ou DevSecOps, o aluno monta uma matriz de segurança por camadas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Em Segurança da Informação, é comum ouvir recomendações genéricas: \"coloque um firewall\", \"bloqueie a porta\", \"use criptografia\", \"segmente a rede\", \"olhe os logs\". Todas podem estar corretas em algum contexto, mas nenhuma substitui uma pergunta mais importante: <strong>em qual camada o risco aparece e em qual camada o controle realmente atua?</strong></p><p>O Modelo OSI ajuda a organizar essa conversa. Um cabo conectado em uma sala pública cria risco físico. Um switch sem controle de porta cria risco de enlace. Uma rota ampla cria risco de alcance IP. Uma porta exposta cria risco de transporte. Um TLS mal validado cria risco de apresentação. Um token em log cria risco de sessão e aplicação. Um erro 403 não é o mesmo problema que uma porta TCP filtrada.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> um analista recebe alerta de acesso suspeito a uma API interna. A porta 443 está aberta, o certificado é válido, o usuário autenticou via SSO e a aplicação retornou 200. Sem pensar por camadas, alguém pode dizer que \"a rede permitiu\". Com o OSI aplicado à segurança, a análise separa conectividade, criptografia, sessão, identidade, autorização, logs de aplicação e política de negócio.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>Historicamente, segurança de redes começou muito focada em perímetro: roteadores, filtros, ACLs e firewalls separavam \"dentro\" e \"fora\". Esse modelo ajudou, mas criou uma visão limitada. Se algo estava dentro da rede, muitas organizações confiavam demais. Com malware, notebooks móveis, VPN, Wi-Fi, cloud, SaaS, APIs e trabalho remoto, a fronteira ficou menos clara.</p><p>A defesa moderna evoluiu para camadas: segurança física, controle de acesso à rede, segmentação, roteamento controlado, firewalls stateful, inspeção TLS quando apropriada, WAF, autenticação forte, autorização, monitoramento, SIEM, EDR, DLP, IAM e Zero Trust. O OSI não resolve segurança sozinho, mas fornece um mapa para entender onde cada controle funciona e onde ele não funciona.</p><p>Essa evolução também mudou o trabalho do SOC e dos times de plataforma. Um incidente moderno raramente pertence a uma única camada. Um acesso indevido pode envolver DNS, proxy, TLS, token, API gateway, IAM, aplicação e logs. A maturidade está em correlacionar evidências sem confundir uma camada com outra.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>O problema técnico é que riscos, controles e evidências ficam distribuídos. Um firewall pode bloquear porta, mas não entende regra de negócio. TLS protege confidencialidade em trânsito, mas não impede um usuário autorizado de acessar dados demais. VLAN separa domínio de broadcast, mas não substitui autenticação. WAF pode filtrar padrões de ataque web, mas não corrige lógica insegura da aplicação.</p><ul class=\"flow-list\"><li><strong>Risco mal localizado:</strong> tratar erro de autorização como problema de firewall.</li><li><strong>Controle superestimado:</strong> achar que NAT, VPN ou VLAN resolvem segurança por si só.</li><li><strong>Evidência incompleta:</strong> olhar apenas log de rede e ignorar IAM, aplicação ou endpoint.</li><li><strong>Resposta arriscada:</strong> liberar acesso amplo para \"testar\" e esquecer de remover.</li><li><strong>Investigação fraca:</strong> não preservar horário, origem, destino, usuário, serviço, camada e hipótese.</li></ul><p>Aplicar OSI à cibersegurança reduz esse problema porque força a pergunta: qual camada está envolvida, qual evidência comprova, qual controle atua ali e qual risco continua existindo acima ou abaixo?</p></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><p>A segurança saiu de uma visão centrada em perímetro para uma visão de defesa em profundidade, identidade, observabilidade e resposta orientada por evidências.</p><table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Foco principal</th><th>Limitação</th><th>Evolução</th></tr></thead><tbody><tr><td>Perímetro simples</td><td>Bloquear entrada externa com roteador/firewall.</td><td>Confiança excessiva na rede interna.</td><td>Segmentação, controle interno e logs.</td></tr><tr><td>Segmentação</td><td>Separar redes por função, VLAN, subnet e firewall.</td><td>Não resolve identidade, aplicação ou dados.</td><td>Menor privilégio, IAM e políticas por contexto.</td></tr><tr><td>Criptografia em trânsito</td><td>TLS, VPN e túneis.</td><td>Protege transporte, mas pode esconder tráfego malicioso e não resolve autorização.</td><td>Inspeção adequada, validação de certificado, mTLS e observabilidade.</td></tr><tr><td>Cloud e DevSecOps</td><td>Rede como código, security groups, WAF, IAM, logs e pipelines.</td><td>Configuração errada escala rápido.</td><td>Policy as Code, revisão, detecção contínua e automação segura.</td></tr><tr><td>Zero Trust</td><td>Verificação contínua de identidade, dispositivo, contexto e política.</td><td>Não elimina fundamentos de rede; depende deles.</td><td>Integração entre rede, identidade, endpoint, aplicação e dados.</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p><strong>OSI aplicado à cibersegurança</strong> é o uso das camadas como mapa de raciocínio para posicionar riscos, controles, evidências e responsabilidades. Não significa que todo produto de segurança pertence a uma única camada. Significa que você sabe explicar onde ele atua com mais força e o que ele não cobre.</p><div class=\"definition-box\"><strong>Definição:</strong> aplicar OSI à segurança é relacionar cada camada da comunicação a ameaças defensivamente descritas, controles preventivos, controles detectivos, logs, evidências, impactos e mitigações, sem confundir conectividade com autorização nem criptografia com segurança completa.</div><p>O valor principal é reduzir pensamento mágico. Firewall não substitui patch. TLS não substitui autorização. VPN não substitui menor privilégio. VLAN não substitui IAM. WAF não substitui validação de entrada no código. O OSI ajuda a mostrar essas fronteiras.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><p>Por dentro, uma análise defensiva por camadas segue um ciclo repetível: identificar ativo, fluxo, camada, risco, evidência, controle, lacuna e ação. A cada camada, você pergunta o que pode falhar, como detectar, como mitigar e que evidência comprova.</p><ol class=\"flow-list\"><li><strong>Ativo e fluxo:</strong> quem fala com quem, por qual caminho, usando qual serviço.</li><li><strong>Camada física:</strong> acesso físico, rack, porta, cabo, rádio, sinal, energia e ambiente.</li><li><strong>Camada de enlace:</strong> MAC, VLAN, switchport, loop, ARP, domínio de broadcast e controle de porta.</li><li><strong>Camada de rede:</strong> IP, subnet, rota, gateway, ACL, reachability e logs de fluxo.</li><li><strong>Camada de transporte:</strong> porta, protocolo, estado, listener, firewall stateful e exposição de serviço.</li><li><strong>Camadas superiores:</strong> TLS, sessão, cookie, token, HTTP, API, autenticação, autorização e lógica de negócio.</li><li><strong>Correlação:</strong> comparar logs de firewall, proxy, WAF, aplicação, IAM, endpoint e SIEM.</li><li><strong>Resposta:</strong> mitigar com menor privilégio, mudança controlada, evidência preservada e rollback.</li></ol></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Em uma arquitetura corporativa, o OSI aplicado à segurança aparece como defesa em profundidade. Não é uma pilha de produtos, mas uma pilha de responsabilidades.</p><ul><li><strong>Camada 1:</strong> controle físico de salas, racks, cabeamento, APs e energia.</li><li><strong>Camada 2:</strong> segmentação local, VLAN, port security, 802.1X/NAC, proteção contra loops e controle de ARP.</li><li><strong>Camada 3:</strong> roteamento, subnets, ACLs, security groups, NACLs e logs de fluxo.</li><li><strong>Camada 4:</strong> firewall stateful, regras por porta, exposição de listeners e controle de egress.</li><li><strong>Camadas 5 e 6:</strong> sessão, TLS, certificados, mTLS, validade, trust store e proteção de tokens.</li><li><strong>Camada 7:</strong> WAF, API gateway, autenticação, autorização, validação de entrada, logs e regras de negócio.</li></ul><p>Uma arquitetura segura combina controles. O erro comum é colocar todos os controles em uma única camada e acreditar que isso cobre o restante.</p></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em um prédio corporativo. A Camada 1 é a porta física, a sala, o crachá e a câmera. A Camada 2 é o andar e a rede local onde você se conecta. A Camada 3 é o caminho entre prédios. A Camada 4 é a porta específica de uma sala. As camadas superiores são a conversa, o idioma, a identidade, a autorização e a regra do negócio.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não são prédios. Pacotes podem ser encapsulados, roteados, filtrados, criptografados e processados por múltiplos serviços invisíveis. A analogia serve para entender que segurança precisa de várias barreiras, mas não substitui análise técnica.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Em casa, você conecta um notebook ao Wi-Fi. A segurança começa no físico: alguém consegue acessar seu roteador? Depois vem rádio: a rede Wi-Fi usa senha forte e criptografia adequada? Depois vem IP: o notebook recebe endereço correto? Depois transporte: quais portas estão abertas no roteador ou nos dispositivos? Depois aplicação: o painel do roteador usa senha padrão? Há atualização de firmware?</p><p>Esse exemplo mostra que \"colocar senha no Wi-Fi\" é importante, mas não cobre tudo. Um roteador com senha de administração padrão continua perigoso mesmo com Wi-Fi protegido.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Em uma empresa, um servidor financeiro precisa ser acessado apenas por estações autorizadas e por uma aplicação específica. A camada física exige rack controlado. A camada 2 exige VLAN de servidores. A camada 3 exige rotas e ACLs controladas. A camada 4 exige liberar apenas portas necessárias. As camadas superiores exigem TLS, autenticação forte, autorização por perfil, logs de auditoria e monitoramento de comportamento.</p><p>Se uma estação comprometida consegue alcançar lateralmente o servidor, a falha pode estar em várias camadas: rede plana, ACL ampla, firewall interno ausente, credenciais reaproveitadas, aplicação sem autorização granular ou logs insuficientes.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em cloud, a camada física é abstraída pelo provedor, mas não desaparece: regiões, zonas, disponibilidade e responsabilidade compartilhada continuam importando. A camada 2 geralmente é abstraída. A camada 3 aparece em VPC/VNet, subnets, route tables e peering. A camada 4 aparece em security groups, NSGs, firewalls e load balancers. As camadas superiores aparecem em TLS, API Gateway, WAF, IAM, tokens, policies e logs de auditoria.</p><p>Um bucket privado acessado indevidamente pode não ser falha de rede. Pode ser política IAM ampla. Uma VM exposta na internet pode ser erro de security group. Um serviço inacessível por private endpoint pode ser DNS privado, rota, NSG ou identidade. O OSI ajuda a separar essas hipóteses.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em DevSecOps, o OSI ajuda a revisar pipelines e plataformas. Um runner self-hosted precisa de rede de saída controlada, DNS, acesso a registries, TLS validado, secrets protegidos, tokens de curta duração e autorização mínima. Terraform pode criar rotas, security groups, load balancers e endpoints. Kubernetes pode criar Services, Ingress, NetworkPolicies e service accounts.</p><p>O risco é automatizar insegurança. Uma regra ampla em IaC pode abrir muitas portas em segundos. Um token em log pode expor sessão. Um certificado mal validado pode permitir interceptação. Um pipeline que ignora falhas de TLS pode baixar artefatos de origem errada. Por isso, segurança por camadas também precisa entrar em revisão de código, policy as code e observabilidade.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Um alerta do SIEM indica tráfego incomum de uma estação para um servidor interno. A análise por camadas evita respostas precipitadas. Na Camada 2, você verifica VLAN, MAC e switchport. Na Camada 3, origem, destino, subnet, rota e logs de fluxo. Na Camada 4, porta, estado e volume. Na Camada 6, TLS e certificado. Na Camada 7, URI, método, usuário, token, status code e payload permitido.</p><table class=\"data-table risk-table\"><thead><tr><th>Camada</th><th>Risco defensivo</th><th>Evidência</th><th>Mitigação</th></tr></thead><tbody><tr><td>1 Física</td><td>Acesso não autorizado a porta, rack ou AP.</td><td>Inventário, câmera, controle de acesso, link up inesperado.</td><td>Controle físico, desativar portas, NAC e auditoria.</td></tr><tr><td>2 Enlace</td><td>Movimento lateral em LAN plana, ARP indevido, VLAN incorreta.</td><td>Tabela MAC, ARP, logs de switch, alertas NAC.</td><td>Segmentação, 802.1X, DHCP snooping, inspeção ARP e VLANs corretas.</td></tr><tr><td>3 Rede</td><td>Alcance IP indevido entre segmentos.</td><td>Flow logs, rotas, ACLs, traceroute autorizado.</td><td>Rotas mínimas, ACLs, security groups e revisão de peering.</td></tr><tr><td>4 Transporte</td><td>Portas expostas e egress irrestrito.</td><td>Firewall logs, listeners, conexões estabelecidas.</td><td>Firewall stateful, allowlist, controle de saída e monitoramento.</td></tr><tr><td>5-7 Superiores</td><td>Token vazado, TLS fraco, WAF bypass conceitual, autorização falha.</td><td>Logs de aplicação, WAF, IAM, proxy, status HTTP.</td><td>MFA, menor privilégio, TLS correto, validação de entrada, WAF e logs.</td></tr></tbody></table></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2><svg class=\"lesson-svg\" viewBox=\"0 0 980 620\" role=\"img\" aria-labelledby=\"m02l09-title m02l09-desc\"><title id=\"m02l09-title\">OSI aplicado à cibersegurança</title><desc id=\"m02l09-desc\">Mapa de segurança por camadas mostrando riscos, controles e evidências de camada física até aplicação.</desc><defs><marker id=\"m02l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs><rect x=\"40\" y=\"45\" width=\"220\" height=\"90\" rx=\"16\" class=\"svg-node svg-node--attacker\"/><text x=\"150\" y=\"82\" text-anchor=\"middle\" class=\"svg-label\">Risco</text><text x=\"150\" y=\"108\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">origem, vetor, impacto</text><line x1=\"260\" y1=\"90\" x2=\"355\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l09-arrow)\"/><rect x=\"355\" y=\"20\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--security\"/><text x=\"490\" y=\"54\" text-anchor=\"middle\" class=\"svg-label\">7 Aplicação: WAF, authz, logs</text><rect x=\"355\" y=\"82\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node\"/><text x=\"490\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">6 Apresentação: TLS, certificados</text><rect x=\"355\" y=\"144\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node\"/><text x=\"490\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">5 Sessão: token, cookie, contexto</text><rect x=\"355\" y=\"206\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--firewall\"/><text x=\"490\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">4 Transporte: portas, estado</text><rect x=\"355\" y=\"268\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--router\"/><text x=\"490\" y=\"302\" text-anchor=\"middle\" class=\"svg-label\">3 Rede: rotas, ACLs, flow logs</text><rect x=\"355\" y=\"330\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\"/><text x=\"490\" y=\"364\" text-anchor=\"middle\" class=\"svg-label\">2 Enlace: VLAN, MAC, NAC</text><rect x=\"355\" y=\"392\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node\"/><text x=\"490\" y=\"426\" text-anchor=\"middle\" class=\"svg-label\">1 Física: rack, cabo, rádio</text><line x1=\"625\" y1=\"420\" x2=\"735\" y2=\"420\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l09-arrow)\"/><line x1=\"735\" y1=\"420\" x2=\"735\" y2=\"52\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l09-arrow)\"/><rect x=\"700\" y=\"25\" width=\"235\" height=\"115\" rx=\"16\" class=\"svg-node svg-node--cloud\"/><text x=\"817\" y=\"62\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text><text x=\"817\" y=\"88\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs + pacotes + eventos</text><text x=\"817\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede + IAM + aplicação</text><rect x=\"90\" y=\"500\" width=\"800\" height=\"80\" rx=\"18\" class=\"svg-boundary\"/><text x=\"490\" y=\"532\" text-anchor=\"middle\" class=\"svg-label\">Defesa em profundidade</text><text x=\"490\" y=\"560\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cada camada reduz risco, gera evidência e possui limites. Segurança madura combina camadas, não aposta tudo em uma só.</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório é defensivo e conceitual-prático. Você criará uma matriz de segurança por camadas para um fluxo web interno, relacionando riscos, evidências e controles sem executar ataque, varredura agressiva ou teste não autorizado.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios treinam o posicionamento correto de riscos e controles por camada, evitando respostas genéricas.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá um cenário de API interna com suspeita de acesso indevido e deverá construir uma matriz defensiva por camadas, com evidências, mitigação e limites éticos.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução mostra como separar conectividade, criptografia, sessão, identidade, autorização e aplicação antes de propor mudança.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><ul><li><strong>Ideia central:</strong> OSI ajuda a organizar segurança por riscos, controles e evidências.</li><li><strong>O que lembrar:</strong> nenhum controle isolado resolve todas as camadas.</li><li><strong>Erro comum:</strong> tratar firewall, VPN, VLAN ou TLS como solução completa.</li><li><strong>Uso real:</strong> arquitetura, SOC, cloud, DevSecOps, auditoria, incidentes e revisão de mudanças.</li><li><strong>Segurança:</strong> laboratórios devem ser defensivos, autorizados, sanitizados e limitados.</li></ul></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, faremos a revisão prática do Modelo OSI. Você consolidará camadas, PDUs, equipamentos, protocolos, comandos, segurança e troubleshooting em um exercício final antes de avançar para Ethernet, MAC, switches e ARP.</p></section>"
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
      "DNS",
      "OIDC",
      "SAML"
    ],
    "dependsOn": [
      "modelo OSI",
      "encapsulamento",
      "troubleshooting por camadas",
      "TCP/UDP",
      "TLS",
      "HTTP"
    ],
    "enables": [
      "segurança de redes",
      "blue team",
      "cloud security",
      "DevSecOps",
      "Zero Trust",
      "resposta a incidentes"
    ]
  },
  "protocolFields": [
    {
      "field": "MAC/IP/Porta/URI/Usuário",
      "size": "camadas diferentes",
      "purpose": "Separar identidade técnica de enlace, rede, transporte e aplicação.",
      "securityObservation": "Misturar esses campos gera investigações frágeis e controles no lugar errado."
    },
    {
      "field": "Source/Destination",
      "size": "varia por camada",
      "purpose": "Identificar origem e destino em MAC, IP, porta e aplicação.",
      "securityObservation": "Origem IP não é identidade de usuário; precisa correlação com IAM e aplicação."
    },
    {
      "field": "Status/Action",
      "size": "log/evento",
      "purpose": "Indicar permitido, bloqueado, negado, falhou ou autenticou.",
      "securityObservation": "Um allow de firewall não significa autorização de negócio."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Usuário/host",
      "action": "Inicia acesso ao serviço.",
      "detail": "Há risco físico, endpoint e rede local antes da aplicação.",
      "possibleFailure": "Host não autorizado conectado a porta ou Wi-Fi inadequado."
    },
    {
      "step": 2,
      "actor": "Rede local e roteamento",
      "action": "Entrega tráfego até o destino ou próximo controle.",
      "detail": "VLAN, subnet, rota, ACL e flow logs indicam alcance.",
      "possibleFailure": "Rota ampla ou segmentação insuficiente permite acesso lateral."
    },
    {
      "step": 3,
      "actor": "Firewall/load balancer",
      "action": "Avalia protocolo, porta, estado e destino.",
      "detail": "Pode permitir TCP/443 sem entender autorização da aplicação.",
      "possibleFailure": "Regra muito ampla ou ausência de logs."
    },
    {
      "step": 4,
      "actor": "TLS/WAF/API",
      "action": "Negocia criptografia, aplica políticas e encaminha requisição.",
      "detail": "Certificado, host, URI, headers, método e payload viram evidências.",
      "possibleFailure": "TLS fraco, WAF ausente, token exposto ou validação incompleta."
    },
    {
      "step": 5,
      "actor": "Aplicação/IAM",
      "action": "Autentica, autoriza, executa regra de negócio e registra evento.",
      "detail": "Usuário, escopo, role, status HTTP e audit logs completam a análise.",
      "possibleFailure": "Autorização excessiva ou logs insuficientes."
    }
  ],
  "deepDive": {
    "mentalModel": "Segurança por camadas não é empilhar ferramentas; é saber qual risco cada camada reduz, qual evidência ela gera e quais riscos permanecem.",
    "keyTerms": [
      "defesa em profundidade",
      "controle preventivo",
      "controle detectivo",
      "controle corretivo",
      "evidência",
      "menor privilégio",
      "correlação",
      "limite ético"
    ],
    "limitations": [
      "O OSI é modelo conceitual e nem todo controle cabe perfeitamente em uma camada.",
      "Produtos modernos como WAF, proxy, EDR, ZTNA e SASE cruzam várias camadas.",
      "Camadas não substituem análise de risco, governança, IAM, desenvolvimento seguro e resposta a incidentes."
    ],
    "whenToUse": [
      "Ao planejar arquitetura defensiva.",
      "Ao revisar mudança de firewall, rota, WAF ou IAM.",
      "Ao investigar alerta de SOC.",
      "Ao montar playbook de troubleshooting ou incidente.",
      "Ao explicar controles para times diferentes."
    ],
    "whenNotToUse": [
      "Como checklist mecânico que ignora contexto.",
      "Para justificar testes sem autorização.",
      "Para concluir que uma camada está segura sem evidência.",
      "Para substituir modelagem de ameaças e análise de impacto."
    ],
    "operationalImpact": [
      "Exige documentação de fluxos, donos, controles e fontes de log.",
      "Melhora comunicação entre NOC, SOC, rede, cloud, DevSecOps e aplicação.",
      "Reduz mudanças emergenciais sem causa provável."
    ],
    "financialImpact": [
      "Controles em múltiplas camadas podem gerar custo de appliances, serviços cloud, logs e equipe.",
      "Logs de flow, WAF, proxy e aplicação aumentam custo de armazenamento e SIEM.",
      "Falhas de arquitetura podem custar mais em incidentes do que controles planejados."
    ],
    "securityImpact": [
      "Reduz movimento lateral, exposição indevida e pontos cegos.",
      "Ajuda a detectar lacunas entre conectividade, identidade e autorização.",
      "Evita falsa sensação de segurança em controles isolados."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que firewall resolve autorização de aplicação.",
      "whyItHappens": "Firewall é um controle conhecido e visível.",
      "consequence": "Usuário ou serviço autorizado na rede pode acessar dados além do necessário.",
      "correction": "Combinar firewall com autenticação, autorização, logs e validação na aplicação."
    },
    {
      "mistake": "Confundir VPN com ambiente seguro.",
      "whyItHappens": "VPN cria túnel criptografado e parece resolver tudo.",
      "consequence": "Acesso amplo à rede interna aumenta movimento lateral se credencial ou dispositivo for comprometido.",
      "correction": "Aplicar segmentação, MFA, postura de dispositivo, menor privilégio e logs."
    },
    {
      "mistake": "Dizer que TLS impede vazamento de dados.",
      "whyItHappens": "TLS protege tráfego em trânsito.",
      "consequence": "Dados podem vazar por autorização fraca, logs, endpoint ou aplicação.",
      "correction": "Usar TLS como uma camada, não como controle único."
    },
    {
      "mistake": "Coletar evidências sem sanitização.",
      "whyItHappens": "Pressa durante incidente ou troubleshooting.",
      "consequence": "IPs internos, tokens, cookies, usuários e topologia podem ser expostos.",
      "correction": "Mascarar dados sensíveis antes de compartilhar."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Alerta de tráfego incomum",
      "Porta aberta sem dono claro",
      "API acessível por origem inesperada",
      "Usuário autenticado com acesso indevido",
      "WAF bloqueando requisições legítimas",
      "Logs contraditórios entre firewall e aplicação"
    ],
    "diagnosticQuestions": [
      "Qual ativo e fluxo estão envolvidos?",
      "A evidência pertence a qual camada?",
      "Existe controle preventivo nessa camada?",
      "Existe log confiável?",
      "O controle reduz risco ou apenas desloca o problema?",
      "A mudança proposta preserva menor privilégio?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print",
        "purpose": "Coletar evidências de configuração local e rota.",
        "expectedObservation": "IP, gateway, DNS e rotas compatíveis com a rede esperada.",
        "interpretation": "Camadas 3 e parte da investigação de alcance."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection exemplo.interno -Port 443",
        "purpose": "Validar alcance TCP autorizado a um serviço.",
        "expectedObservation": "TcpTestSucceeded True ou False.",
        "interpretation": "Evidência de transporte; não prova autenticação ou autorização."
      },
      {
        "platform": "Linux",
        "command": "ip addr; ip route; ss -tulpen",
        "purpose": "Ver interfaces, rotas e portas locais em escuta.",
        "expectedObservation": "Interfaces ativas, rota default e listeners conhecidos.",
        "interpretation": "Ajuda a separar Camada 3 e Camada 4."
      },
      {
        "platform": "Linux",
        "command": "curl -vkI https://exemplo.interno",
        "purpose": "Observar TLS, HTTP status e headers de forma controlada.",
        "expectedObservation": "Handshake TLS, certificado, status HTTP e headers.",
        "interpretation": "Evidência de camadas 6 e 7, sem testar exploração."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status; show vlan brief; show ip route; show access-lists",
        "purpose": "Coletar estado físico, VLAN, roteamento e filtros.",
        "expectedObservation": "Portas, VLANs, rotas e ACLs coerentes com o desenho aprovado.",
        "interpretation": "Evidências de camadas 1, 2 e 3/4."
      }
    ],
    "decisionTree": [
      {
        "if": "Não há link físico ou porta esperada está down",
        "then": "Investigar Camada 1 antes de firewall ou aplicação."
      },
      {
        "if": "Link existe, mas VLAN/MAC/ARP estão incoerentes",
        "then": "Investigar Camada 2, controle de porta e segmentação."
      },
      {
        "if": "Alcance IP existe, mas porta não responde",
        "then": "Investigar Camada 4, firewall, listener e caminho de retorno."
      },
      {
        "if": "Porta responde, mas TLS falha",
        "then": "Investigar Camada 6, certificado, trust store, SNI e proxy."
      },
      {
        "if": "TLS e HTTP funcionam, mas usuário recebe 401/403",
        "then": "Investigar sessão, autenticação, autorização e IAM."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Mapear fluxos críticos por camada.",
      "Aplicar menor privilégio em rede, portas, identidade e aplicação.",
      "Usar logs de rede, proxy, WAF, IAM e aplicação de forma correlacionada.",
      "Sanitizar evidências antes de compartilhar.",
      "Documentar exceções e revisar periodicamente.",
      "Tratar controles como complementares, não substitutos."
    ],
    "badPractices": [
      "Liberar any-any para testar e esquecer a regra.",
      "Achar que VPN torna todo acesso confiável.",
      "Usar TLS sem validar certificado corretamente.",
      "Confiar apenas em logs de firewall para concluir autorização.",
      "Compartilhar PCAP, tokens ou prints com dados sensíveis.",
      "Executar testes ofensivos fora de ambiente autorizado."
    ],
    "commonErrors": [
      "Confundir autenticação com autorização.",
      "Confundir conectividade TCP com aplicação saudável.",
      "Confundir criptografia com confidencialidade total do dado.",
      "Confundir segmentação com controle de identidade.",
      "Tratar cloud security group como WAF."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana e movimento lateral",
        "description": "Segmentos internos amplos permitem que um comprometimento alcance muitos ativos.",
        "defensiveExplanation": "O risco aparece principalmente em camadas 2, 3 e 4, mas o impacto chega à aplicação e aos dados.",
        "mitigation": "Segmentação, ACLs, firewall interno, autenticação forte, logs e revisão de fluxos."
      },
      {
        "name": "Exposição de porta sem dono",
        "description": "Serviços em escuta ficam acessíveis sem justificativa, documentação ou monitoramento.",
        "defensiveExplanation": "A presença de uma porta aberta não diz se o serviço é seguro; apenas mostra superfície de ataque.",
        "mitigation": "Inventário, allowlist, firewall stateful, hardening, monitoramento e remoção de serviços desnecessários."
      },
      {
        "name": "Token ou cookie em log",
        "description": "Dados de sessão podem aparecer em logs de aplicação, proxy ou debugging.",
        "defensiveExplanation": "O problema está em camadas superiores e pode existir mesmo com TLS correto.",
        "mitigation": "Redação de logs, rotação de tokens, expiração curta, escopos mínimos e revisão de logging."
      },
      {
        "name": "Confiança excessiva em VPN",
        "description": "Usuários remotos ganham acesso amplo após autenticação no túnel.",
        "defensiveExplanation": "VPN protege o transporte, mas não substitui autorização granular.",
        "mitigation": "MFA, postura de dispositivo, segmentação, ZTNA quando adequado, logs e menor privilégio."
      }
    ],
    "monitoring": [
      "Flow logs por origem/destino/porta",
      "Logs de firewall e proxy",
      "Logs de WAF e API Gateway",
      "Logs de autenticação e autorização",
      "Eventos de switch/NAC",
      "Métricas de tráfego incomum",
      "Alertas de endpoint e EDR"
    ],
    "hardening": [
      "Desativar portas físicas não usadas",
      "Aplicar 802.1X/NAC onde aplicável",
      "Restringir rotas e security groups",
      "Controlar egress",
      "Usar TLS validado",
      "Proteger tokens e cookies",
      "Aplicar least privilege em IAM e aplicação"
    ],
    "detectionIdeas": [
      "Conexões laterais incomuns",
      "Novos listeners em servidores",
      "Acessos a portas administrativas",
      "Aumento de 401/403/5xx",
      "Fluxos para destinos raros",
      "Mudanças em ACL/security group",
      "Uso anômalo de token ou sessão"
    ]
  },
  "lab": {
    "id": "lab-2.9",
    "title": "Matriz defensiva OSI para um fluxo web interno",
    "labType": "cloud",
    "objective": "Construir uma matriz de segurança por camadas para um fluxo HTTPS interno, identificando riscos, evidências, controles e mitigação sem executar atividade ofensiva.",
    "scenario": "Uma empresa possui uma API interna acessada por usuários corporativos. Você deve avaliar defensivamente o fluxo do ponto de vista de rede, transporte, TLS, sessão, aplicação e IAM.",
    "topology": "Usuário corporativo -> rede local/VPN -> firewall/security group -> load balancer/API gateway/WAF -> aplicação -> IAM/logs",
    "architecture": "Fluxo HTTPS com controles distribuídos em várias camadas: segmentação, roteamento, firewall, TLS, WAF, autenticação, autorização e logs.",
    "prerequisites": [
      "Ter estudado as aulas 2.1 a 2.8.",
      "Usar apenas ambiente próprio, autorizado ou um cenário desenhado em papel.",
      "Não executar varredura, exploração ou teste contra terceiros."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Terminal Windows ou Linux para exemplos locais",
      "Opcional: documentação de rede própria sanitizada",
      "Opcional: Cisco Packet Tracer para desenho conceitual"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não teste controles em redes de terceiros.",
      "Não capture pacotes contendo credenciais reais.",
      "Não cole tokens, cookies, IPs públicos sensíveis ou nomes internos em locais compartilhados.",
      "Use dados fictícios quando documentar o laboratório.",
      "O objetivo é defesa, análise e arquitetura, não exploração.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir o fluxo",
        "instruction": "Descreva o fluxo de forma simples: quem acessa qual serviço, por qual caminho e com qual protocolo.",
        "command": "Exemplo: usuario-corporativo -> vpn -> firewall -> api-gateway -> app-financeiro HTTPS/443",
        "expectedOutput": "Uma linha de fluxo com origem, caminho, destino e serviço.",
        "explanation": "Sem fluxo definido, a análise por camadas fica genérica demais."
      },
      {
        "number": 2,
        "title": "Criar a matriz OSI",
        "instruction": "Monte uma tabela com colunas: camada, risco, evidência, controle atual, lacuna e mitigação.",
        "command": "Camada | Risco | Evidência | Controle | Lacuna | Mitigação",
        "expectedOutput": "Tabela vazia pronta para preenchimento.",
        "explanation": "A matriz transforma segurança em raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Preencher camadas 1 e 2",
        "instruction": "Liste riscos físicos e de enlace, como porta exposta, AP indevido, VLAN errada ou ausência de controle de porta.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Riscos e controles de Camada 1 e 2 documentados.",
        "explanation": "A segurança começa antes do IP: acesso físico e enlace influenciam o restante."
      },
      {
        "number": 4,
        "title": "Preencher camadas 3 e 4",
        "instruction": "Liste riscos de alcance IP, rotas amplas, security groups permissivos, portas expostas e egress irrestrito.",
        "command": "Windows: Test-NetConnection exemplo.interno -Port 443\nLinux: ip route && ss -tulpen",
        "expectedOutput": "Evidências locais ou exemplos fictícios de rota, listener e porta.",
        "explanation": "Camadas 3 e 4 mostram quem consegue alcançar qual destino e por qual porta."
      },
      {
        "number": 5,
        "title": "Preencher camadas 5, 6 e 7",
        "instruction": "Liste riscos de sessão, TLS, tokens, cookies, HTTP, API, WAF, autenticação e autorização.",
        "command": "curl -vkI https://exemplo.interno  # apenas em ambiente autorizado",
        "expectedOutput": "Status HTTP, headers e observações sobre TLS quando aplicável.",
        "explanation": "Porta aberta não prova segurança; as camadas superiores decidem identidade, autorização e lógica."
      },
      {
        "number": 6,
        "title": "Adicionar fontes de log",
        "instruction": "Para cada camada, indique onde a evidência apareceria: switch, firewall, flow logs, WAF, proxy, IAM, aplicação, SIEM ou EDR.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Coluna de evidências enriquecida com fontes de log.",
        "explanation": "Defesa madura depende de correlação entre camadas."
      },
      {
        "number": 7,
        "title": "Priorizar lacunas",
        "instruction": "Classifique lacunas por impacto e probabilidade: alta, média ou baixa.",
        "command": "Alta | Média | Baixa",
        "expectedOutput": "Lista priorizada de riscos defensivos.",
        "explanation": "Nem todo risco tem o mesmo impacto. Priorização evita desperdício e mudanças perigosas."
      },
      {
        "number": 8,
        "title": "Sanitizar o relatório",
        "instruction": "Remova ou mascare IPs sensíveis, nomes internos, usuários, tokens, cookies e detalhes de topologia antes de compartilhar.",
        "command": "Exemplo: 10.10.23.15 -> 10.x.x.15; usuario.real -> usuario.exemplo",
        "expectedOutput": "Relatório sem dados sensíveis.",
        "explanation": "Evidência mal compartilhada pode virar vazamento."
      }
    ],
    "expectedResult": "Uma matriz defensiva OSI completa para um fluxo HTTPS, com riscos, evidências, controles, lacunas, mitigação e dados sanitizados.",
    "validation": [
      {
        "check": "A matriz cobre todas as camadas",
        "command": "Revisar se há linhas para 1 a 7",
        "expected": "Todas as camadas possuem pelo menos um risco e um controle.",
        "ifFails": "Revisite o fluxo e inclua riscos físicos, enlace, rede, transporte e aplicação."
      },
      {
        "check": "Controles não foram superestimados",
        "command": "Perguntar: este controle resolve o que não resolve?",
        "expected": "Cada controle possui limite documentado.",
        "ifFails": "Adicionar coluna de limitações."
      },
      {
        "check": "Evidências estão sanitizadas",
        "command": "Procurar IPs, tokens, cookies, usuários reais e nomes internos",
        "expected": "Nenhum dado sensível exposto.",
        "ifFails": "Mascarar antes de compartilhar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "A matriz ficou genérica",
        "probableCause": "Fluxo não foi definido com origem, destino e serviço.",
        "howToConfirm": "Verificar se há uma linha clara de fluxo.",
        "fix": "Definir um único serviço e um caminho principal."
      },
      {
        "symptom": "Tudo foi colocado na Camada 7",
        "probableCause": "Foco excessivo em aplicação e pouca atenção a rede.",
        "howToConfirm": "Verificar se camadas 1 a 4 estão vazias.",
        "fix": "Adicionar controles de física, enlace, rota, porta e firewall."
      },
      {
        "symptom": "A solução proposta é só liberar firewall",
        "probableCause": "Confusão entre conectividade e autorização.",
        "howToConfirm": "Checar se TLS, sessão, IAM e aplicação foram analisados.",
        "fix": "Separar porta aberta de autorização de negócio."
      }
    ],
    "improvements": [
      "Adicionar diagrama do fluxo com zonas de segurança.",
      "Criar checklist de revisão de mudança para firewall/security group.",
      "Relacionar a matriz com alertas do SIEM.",
      "Criar playbook de investigação por camadas.",
      "Adicionar política de retenção e sanitização de evidências."
    ],
    "evidenceToCollect": [
      "Fluxo sanitizado",
      "Matriz OSI",
      "Lista de controles por camada",
      "Lacunas priorizadas",
      "Fontes de log",
      "Plano de mitigação",
      "Checklist de sanitização"
    ],
    "questions": [
      "Qual controle está sendo superestimado?",
      "Que risco existe acima da camada do firewall?",
      "Que evidência prova autorização e não apenas conectividade?",
      "Que log você precisaria para correlacionar rede e identidade?"
    ],
    "challenge": "Escolha um serviço interno fictício e produza uma matriz OSI defensiva com pelo menos uma lacuna e uma mitigação por camada.",
    "solution": "Uma boa solução separa físico, enlace, rede, transporte, TLS, sessão e aplicação; descreve evidências por camada; evita ações ofensivas; aplica menor privilégio; e sanitiza dados antes de compartilhar."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta dizer que um serviço está seguro porque usa HTTPS?",
      "hints": [
        "Pense no que TLS protege.",
        "Pense em autorização, aplicação, endpoint e logs."
      ],
      "expectedIdeas": [
        "TLS protege transporte",
        "não garante autorização",
        "não valida regra de negócio",
        "não impede token vazado em log"
      ],
      "explanation": "HTTPS é essencial, mas é uma camada. Segurança exige controles adicionais."
    },
    {
      "type": "diagnóstico",
      "question": "Um firewall permitiu TCP/443 e o usuário recebeu HTTP 403. Em qual camada você investigaria a seguir?",
      "hints": [
        "A porta abriu.",
        "403 geralmente indica aplicação/autorização."
      ],
      "expectedIdeas": [
        "camada 7",
        "autorização",
        "IAM",
        "WAF",
        "logs de aplicação"
      ],
      "explanation": "A conectividade de transporte funcionou. A investigação deve subir para HTTP, identidade e autorização."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa usa VPN para acesso remoto, mas usuários conectados conseguem alcançar muitos servidores internos. Qual é o risco e quais camadas entram na mitigação?",
      "hints": [
        "VPN protege túnel, mas não limita tudo sozinha.",
        "Pense em segmentação e menor privilégio."
      ],
      "expectedIdeas": [
        "movimento lateral",
        "camadas 3 e 4",
        "IAM",
        "NAC",
        "ZTNA",
        "logs",
        "menor privilégio"
      ],
      "explanation": "VPN é uma camada de acesso, não uma autorização ampla para toda a rede interna."
    }
  ],
  "quiz": [
    {
      "id": "q2.9.1",
      "type": "conceito",
      "q": "O que significa aplicar o Modelo OSI à cibersegurança?",
      "opts": [
        "Usar as camadas para localizar riscos, controles e evidências",
        "Substituir todos os controles por firewall",
        "Ignorar aplicação e olhar apenas pacotes",
        "Tratar OSI como implementação literal da internet"
      ],
      "a": 0,
      "exp": "O OSI é usado como mapa mental para organizar riscos, controles, logs e mitigação por camada.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q2.9.2",
      "type": "segurança",
      "q": "Por que VPN não deve ser tratada como solução completa de segurança?",
      "opts": [
        "Porque VPN nunca usa criptografia",
        "Porque VPN protege o túnel, mas não substitui segmentação, autorização e logs",
        "Porque VPN só funciona em camada física",
        "Porque VPN elimina necessidade de MFA"
      ],
      "a": 1,
      "exp": "VPN pode proteger transporte/acesso, mas ainda exige menor privilégio, controle de destino, identidade e monitoramento.",
      "difficulty": "iniciante-intermediário",
      "topic": "vpn"
    },
    {
      "id": "q2.9.3",
      "type": "diagnóstico",
      "q": "Se TCP/443 conecta, TLS é válido, mas a API retorna 403, qual hipótese é mais forte?",
      "opts": [
        "Falha de autorização ou política de aplicação",
        "Cabo rompido",
        "Ausência total de IP",
        "Porta física desligada"
      ],
      "a": 0,
      "exp": "403 é uma resposta de aplicação/autorização. Camadas inferiores já deram evidência de funcionamento básico.",
      "difficulty": "iniciante-intermediário",
      "topic": "camada 7"
    },
    {
      "id": "q2.9.4",
      "type": "comparação",
      "q": "Qual controle está mais ligado à Camada 2?",
      "opts": [
        "VLAN e 802.1X/NAC",
        "HTTP status code",
        "JWT scope",
        "Certificado TLS"
      ],
      "a": 0,
      "exp": "VLAN e 802.1X/NAC atuam fortemente no enlace/acesso local.",
      "difficulty": "iniciante",
      "topic": "camada 2"
    },
    {
      "id": "q2.9.5",
      "type": "cloud",
      "q": "Em cloud, security groups e NSGs atuam principalmente em qual tipo de controle?",
      "opts": [
        "Controle de alcance por rede/porta",
        "Validação de regra de negócio",
        "Codificação Unicode",
        "Controle físico do rack do provedor"
      ],
      "a": 0,
      "exp": "Security groups/NSGs controlam principalmente tráfego por origem, destino, protocolo e porta.",
      "difficulty": "iniciante-intermediário",
      "topic": "cloud"
    },
    {
      "id": "q2.9.6",
      "type": "ética",
      "q": "Qual prática é correta ao compartilhar evidências de investigação?",
      "opts": [
        "Sanitizar IPs sensíveis, tokens, cookies, usuários e topologia",
        "Publicar PCAP completo em chat público",
        "Copiar cookies reais para relatório",
        "Executar testes ofensivos para demonstrar risco sem autorização"
      ],
      "a": 0,
      "exp": "Evidências devem ser úteis, mas protegidas. Sanitização reduz vazamento de informação sensível.",
      "difficulty": "iniciante",
      "topic": "ética"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.9.1",
      "front": "O que é defesa em profundidade?",
      "back": "Uso combinado de controles em várias camadas para reduzir risco, gerar evidência e limitar impacto.",
      "tags": [
        "segurança",
        "osi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.9.2",
      "front": "Firewall substitui autorização de aplicação?",
      "back": "Não. Firewall controla tráfego por rede/porta/política, mas autorização de negócio pertence às camadas superiores.",
      "tags": [
        "firewall",
        "autorização"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.9.3",
      "front": "TLS resolve todos os problemas de segurança?",
      "back": "Não. TLS protege comunicação em trânsito, mas não corrige autorização, lógica insegura, token vazado ou endpoint comprometido.",
      "tags": [
        "tls",
        "segurança"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.9.4",
      "front": "Qual evidência mostra alcance em Camada 3/4?",
      "back": "Rotas, flow logs, firewall logs, Test-NetConnection, ss/netstat e registros de conexão permitida ou bloqueada.",
      "tags": [
        "evidências",
        "camada 4"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc2.9.5",
      "front": "Por que sanitizar evidências?",
      "back": "Para evitar exposição de IPs, usuários, tokens, cookies, nomes internos, topologia e detalhes sensíveis.",
      "tags": [
        "ética",
        "evidências"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.9.6",
      "front": "Qual erro comum envolve VPN?",
      "back": "Achar que estar conectado à VPN significa autorização ampla para a rede interna inteira.",
      "tags": [
        "vpn",
        "zero trust"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.9.1",
      "type": "classificação",
      "prompt": "Classifique os controles: VLAN, TLS, WAF, security group, 802.1X e autorização RBAC por camada principal.",
      "expectedAnswer": "VLAN e 802.1X: Camada 2; security group: Camadas 3/4; TLS: Camada 6; WAF e RBAC/autorização: Camada 7, embora alguns controles cruzem camadas.",
      "explanation": "A classificação ajuda a entender onde o controle atua e o que ele não cobre."
    },
    {
      "id": "ex2.9.2",
      "type": "diagnóstico",
      "prompt": "Uma API retorna 401 para um usuário. Liste três hipóteses que não são problemas de firewall.",
      "expectedAnswer": "Token ausente ou expirado, usuário não autenticado, clock skew afetando token, configuração de IdP, cookie/sessão inválida ou client_id incorreto.",
      "explanation": "401 é evidência de autenticação, não de queda física ou porta bloqueada."
    },
    {
      "id": "ex2.9.3",
      "type": "segurança",
      "prompt": "Explique por que NAT não deve ser vendido como controle de segurança completo.",
      "expectedAnswer": "NAT altera endereçamento e pode ocultar endereços internos, mas não define autorização, validação de aplicação, hardening, detecção ou menor privilégio.",
      "explanation": "NAT pode fazer parte da arquitetura, mas não substitui firewall, IAM e controles de aplicação."
    },
    {
      "id": "ex2.9.4",
      "type": "arquitetura",
      "prompt": "Monte uma matriz curta com uma evidência e uma mitigação para Camadas 2, 3, 4 e 7 em um serviço web interno.",
      "expectedAnswer": "C2: tabela MAC/VLAN -> segmentação/NAC; C3: flow logs/rotas -> ACLs/security groups; C4: firewall logs/listeners -> allowlist de portas; C7: WAF/app logs/status HTTP -> autenticação, autorização e validação de entrada.",
      "explanation": "A matriz mostra que controles e evidências se complementam."
    }
  ],
  "challenge": {
    "title": "Matriz defensiva OSI para API interna",
    "scenario": "Uma API interna de RH é acessada por usuários corporativos via HTTPS. Houve suspeita de acesso indevido a dados de funcionários, mas ainda não está claro se o problema está em rede, autenticação, autorização ou aplicação.",
    "tasks": [
      "Mapear o fluxo em camadas OSI.",
      "Identificar pelo menos um risco por camada.",
      "Indicar uma evidência por camada.",
      "Propor mitigação defensiva sem testes ofensivos.",
      "Indicar quais dados devem ser sanitizados no relatório."
    ],
    "constraints": [
      "Não executar exploração.",
      "Não usar dados reais de usuários.",
      "Não propor regra any-any.",
      "Não tratar HTTPS como segurança completa.",
      "Separar autenticação de autorização."
    ],
    "expectedDeliverables": [
      "Matriz OSI defensiva",
      "Diagrama simples do fluxo",
      "Lista de evidências",
      "Plano de mitigação priorizado",
      "Checklist de sanitização"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta por camadas",
        "points": 25,
        "description": "Riscos e controles posicionados de forma coerente."
      },
      {
        "criterion": "Evidências úteis",
        "points": 25,
        "description": "Logs e comandos indicados sem dados sensíveis."
      },
      {
        "criterion": "Mitigação defensiva",
        "points": 25,
        "description": "Controles proporcionais, sem instrução ofensiva."
      },
      {
        "criterion": "Clareza e sanitização",
        "points": 25,
        "description": "Relatório compreensível e sem exposição de informações sensíveis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa separando o que é alcance de rede, o que é porta, o que é TLS, o que é sessão, o que é autenticação e o que é autorização. Em seguida, identifica fontes de evidência e controles por camada.",
    "steps": [
      "Descrever o fluxo usuário -> rede -> firewall -> API gateway/WAF -> aplicação -> IAM.",
      "Listar riscos físicos e de acesso local.",
      "Mapear segmentação, rotas e portas expostas.",
      "Validar TLS, headers, status HTTP e logs de WAF.",
      "Separar autenticação de autorização e revisar escopos/roles.",
      "Sanitizar evidências e priorizar mitigação."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar todo o tráfego para testar.",
        "whyItIsWrong": "Aumenta risco e não identifica causa raiz."
      },
      {
        "answer": "A culpa é da rede porque a API é remota.",
        "whyItIsWrong": "A evidência pode estar em autorização ou aplicação."
      },
      {
        "answer": "HTTPS garante que não houve acesso indevido.",
        "whyItIsWrong": "HTTPS protege transporte, mas não impede abuso de autorização."
      }
    ],
    "finalAnswer": "A matriz deve mostrar controles por camada: física e enlace protegendo acesso local; rede e transporte limitando alcance; TLS protegendo trânsito; WAF/API gateway filtrando requisições; IAM e aplicação controlando autenticação, autorização e logs. A mitigação deve priorizar menor privilégio, logs correlacionados, revisão de políticas e sanitização de evidências."
  },
  "glossary": [
    {
      "term": "Defesa em profundidade",
      "shortDefinition": "Estratégia que combina controles em várias camadas.",
      "longDefinition": "Modelo defensivo em que diferentes controles reduzem risco, detectam abuso e limitam impacto em pontos distintos da arquitetura.",
      "example": "VLAN, firewall, TLS, WAF, IAM e logs trabalhando juntos.",
      "relatedTerms": [
        "menor privilégio",
        "segmentação",
        "controle detectivo"
      ],
      "relatedLessons": [
        "2.9",
        "9.1",
        "13.1"
      ]
    },
    {
      "term": "Controle preventivo",
      "shortDefinition": "Controle que tenta impedir um evento indesejado.",
      "longDefinition": "Mecanismo desenhado para reduzir a chance de ocorrência de um risco, como firewall, MFA, ACL ou validação de entrada.",
      "example": "Security group permitindo apenas TCP/443 de origem autorizada.",
      "relatedTerms": [
        "mitigação",
        "hardening"
      ],
      "relatedLessons": [
        "2.9",
        "9.2"
      ]
    },
    {
      "term": "Controle detectivo",
      "shortDefinition": "Controle que ajuda a identificar evento suspeito ou falha.",
      "longDefinition": "Fonte de visibilidade que gera logs, alertas ou métricas para investigação, como SIEM, flow logs, WAF logs e audit logs.",
      "example": "Alerta de WAF para aumento incomum de bloqueios 403.",
      "relatedTerms": [
        "SIEM",
        "evidência",
        "monitoramento"
      ],
      "relatedLessons": [
        "2.9",
        "13.4"
      ]
    },
    {
      "term": "Menor privilégio",
      "shortDefinition": "Conceder apenas o acesso necessário.",
      "longDefinition": "Princípio de reduzir permissões, rotas, portas, escopos e privilégios ao mínimo necessário para a função.",
      "example": "Permitir que um serviço acesse apenas a API necessária, e não toda a rede interna.",
      "relatedTerms": [
        "IAM",
        "Zero Trust",
        "segmentação"
      ],
      "relatedLessons": [
        "2.9",
        "10.7"
      ]
    },
    {
      "term": "Evidência sanitizada",
      "shortDefinition": "Evidência útil sem dados sensíveis expostos.",
      "longDefinition": "Registro, print, log ou relatório com dados como tokens, usuários, IPs sensíveis e nomes internos mascarados antes de compartilhamento.",
      "example": "Trocar usuario.real@empresa por usuario.exemplo e mascarar parte do IP.",
      "relatedTerms": [
        "logs",
        "ética",
        "incidente"
      ],
      "relatedLessons": [
        "2.8",
        "2.9"
      ]
    },
    {
      "term": "Correlação de logs",
      "shortDefinition": "Combinar evidências de múltiplas fontes.",
      "longDefinition": "Prática de cruzar eventos de rede, firewall, proxy, WAF, IAM, aplicação e endpoint para entender um fluxo ou incidente.",
      "example": "Correlacionar allow do firewall, 403 do WAF e falha de autorização no IAM.",
      "relatedTerms": [
        "SIEM",
        "SOC",
        "observabilidade"
      ],
      "relatedLessons": [
        "2.9",
        "13.7"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual do Modelo OSI."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.8",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Troubleshooting por camadas como base para investigação defensiva."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aprofunda autenticação, autorização, OIDC, SAML, tokens e Zero Trust."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Relaciona controles de rede com IaC, pipelines, Kubernetes e policy as code."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "módulos de IaC, Kubernetes e observabilidade",
      "lesson": "referência cruzada",
      "reason": "Segurança por camadas precisa ser aplicada em Terraform, Kubernetes, pipelines e logs."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "módulos de autenticação e autorização",
      "lesson": "referência cruzada",
      "reason": "Camadas superiores dependem de identidade, sessão, token, autorização e auditoria."
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
      "2.10"
    ]
  }
};
