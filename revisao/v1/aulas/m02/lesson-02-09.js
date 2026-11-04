export const lesson0209 = {
  "id": "2.9",
  "moduleId": "m02",
  "order": 9,
  "title": "OSI aplicado à cibersegurança",
  "subtitle": "Como usar as camadas OSI para posicionar riscos, controles, evidências e mitigação sem cair em respostas genéricas.",
  "duration": "125-175 min",
  "estimatedStudyTimeMinutes": 175,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2><p>\"Coloque um firewall\", \"bloqueie a porta\", \"use criptografia\", \"segmente a rede\": essas recomendações podem estar certas, mas nenhuma responde à pergunta que importa: <strong>em qual camada o risco aparece e em qual camada o controle realmente atua?</strong></p><p>Cada camada tem riscos próprios. Um cabo conectado em uma sala pública é risco físico. Um switch sem controle de porta é risco de enlace. Uma rota ampla é risco de alcance IP. Uma porta exposta é risco de transporte. Um TLS mal validado é risco de apresentação. Um token gravado em log é risco de sessão e aplicação. E um erro 403 não é o mesmo problema que uma porta TCP filtrada.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> um analista recebe alerta de acesso suspeito a uma API interna. A porta 443 está aberta, o certificado é válido, o usuário autenticou via SSO e a aplicação retornou 200. Sem pensar por camadas, alguém conclui que \"a rede permitiu\". Com o OSI aplicado à segurança, você separa conectividade, criptografia, sessão, identidade, autorização, logs de aplicação e política de negócio, e descobre que a pergunta certa é se aquele usuário deveria ver aqueles dados.</div></section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2><p>A segurança de redes nasceu focada em perímetro: roteadores, ACLs e firewalls separavam \"dentro\" e \"fora\", e o que estava dentro recebia confiança demais. Com notebooks móveis, VPN, Wi-Fi, cloud, SaaS, APIs e trabalho remoto, essa fronteira deixou de ser clara. Por isso a defesa passou a ser feita em camadas (defesa em profundidade, segmentação, IAM e, mais tarde, Zero Trust, que verifica identidade, dispositivo e contexto a cada acesso, mas continua dependendo dos fundamentos de rede).</p><p>O resultado é que riscos, controles e evidências ficam distribuídos por várias camadas, e um incidente raramente pertence a uma só. Um acesso indevido pode envolver DNS, proxy, TLS, token, API gateway, IAM, aplicação e logs. Sem um mapa, aparecem cinco erros típicos:</p><ul class=\"flow-list\"><li><strong>Risco mal localizado:</strong> tratar erro de autorização como problema de firewall.</li><li><strong>Controle superestimado:</strong> achar que NAT, VPN ou VLAN resolvem segurança por si só.</li><li><strong>Evidência incompleta:</strong> olhar apenas log de rede e ignorar IAM, aplicação ou endpoint.</li><li><strong>Resposta arriscada:</strong> liberar acesso amplo para \"testar\" e esquecer de remover.</li><li><strong>Investigação fraca:</strong> não preservar horário, origem, destino, usuário, serviço, camada e hipótese.</li></ul><p>Aplicar o OSI à segurança força quatro perguntas: qual camada está envolvida, qual evidência comprova, qual controle atua ali e qual risco continua existindo acima ou abaixo dela?</p></section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2><div class=\"definition-box\"><strong>Definição:</strong> aplicar o OSI à segurança é relacionar cada camada da comunicação a riscos, controles, logs, evidências e mitigações, sem confundir conectividade com autorização nem criptografia com segurança completa.</div><p>Nenhum produto pertence a uma única camada: você precisa saber onde ele atua com mais força e o que não cobre.</p><h3>Três tipos de controle</h3><ul><li><strong>Preventivo:</strong> tenta impedir o evento. Ex.: ACL, security group, 802.1X, MFA, validação de entrada.</li><li><strong>Detectivo:</strong> gera visibilidade para identificar o evento. Ex.: flow logs, logs de firewall e WAF, audit logs, alertas do SIEM.</li><li><strong>Corretivo:</strong> age depois do evento para conter o dano e restaurar o estado seguro. Ex.: desativar a porta, revogar o token, remover a regra ampla, aplicar patch.</li></ul><p>O mesmo produto pode ter mais de um papel: um WAF bloqueia uma requisição (preventivo) e registra o bloqueio (detectivo).</p><h3>O que cada controle não resolve</h3><div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Controle</th><th>Camada principal</th><th>O que faz</th><th>O que não resolve</th></tr></thead><tbody><tr><td>VLAN</td><td>2</td><td>Separa domínios de broadcast.</td><td>Não substitui autenticação nem IAM.</td></tr><tr><td>Firewall / security group</td><td>3 e 4</td><td>Permite ou bloqueia por origem, destino, protocolo, porta e estado.</td><td>Não entende regra de negócio nem autorização; não substitui patch. Security group não é WAF.</td></tr><tr><td>NAT</td><td>3</td><td>Altera o endereçamento e pode ocultar endereços internos.</td><td>Não define autorização, hardening, detecção nem menor privilégio.</td></tr><tr><td>VPN</td><td>Túnel (3/4)</td><td>Protege o transporte do acesso remoto.</td><td>Não substitui menor privilégio nem segmentação: acesso amplo depois do túnel favorece movimento lateral.</td></tr><tr><td>TLS</td><td>6</td><td>Protege os dados em trânsito.</td><td>Não impede um usuário autorizado de acessar dados demais, nem vazamento por token em log, endpoint ou aplicação. Também pode esconder tráfego malicioso dos controles de rede (daí a inspeção TLS, quando apropriada).</td></tr><tr><td>WAF</td><td>7</td><td>Filtra padrões de ataque web.</td><td>Não corrige lógica insegura nem substitui validação de entrada no código.</td></tr></tbody></table></div><div class=\"callout warning\"><strong>Erro comum: autenticação × autorização.</strong> Autenticação responde \"quem é você\"; autorização, \"o que você pode fazer\". Em HTTP, 401 indica falha de autenticação (credencial ou token ausente, expirado ou inválido); 403 indica que a identidade foi reconhecida, mas não tem permissão. Os dois vêm da Camada 7 (aplicação, API gateway ou WAF, que também responde 403 ao bloquear uma requisição), não de um firewall de porta: confira nos logs quem gerou a resposta.</div><div class=\"callout\"><strong>Limites do modelo:</strong> o OSI é conceitual, e produtos como WAF, proxy, EDR, ZTNA e SASE cruzam várias camadas. Use-o como mapa, não como checklist mecânico: ele não substitui modelagem de ameaças, não justifica teste sem autorização e não prova, sem evidência, que uma camada está segura.</div></section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2><p>A análise defensiva por camadas segue um ciclo repetível: <strong>ativo → fluxo → camada → risco → evidência → controle → lacuna → ação</strong>. Primeiro você define quem fala com quem, por qual caminho e com qual serviço. Depois, em cada camada, pergunta o que pode falhar, como detectar, como mitigar e que evidência comprova. Por fim, correlaciona os logs e responde com menor privilégio, mudança controlada, evidência preservada e rollback.</p><p>Num acesso HTTPS interno, o pedido passa por <strong>porta de switch ou Wi-Fi → VLAN, rota e ACL → firewall ou load balancer → TLS, WAF e API gateway → aplicação e IAM</strong>. Cada etapa deixa a própria evidência: eventos de NAC, flow logs, allow/deny por porta, certificado e URI, audit log com usuário, role e status HTTP. O firewall pode permitir TCP/443 sem saber nada da autorização, e é na última etapa que a regra de negócio é decidida.</p><h3>Cada camada identifica uma coisa diferente</h3><p>MAC identifica a interface; IP, o host; porta, o serviço; URI, o recurso; usuário e token, a identidade. Misturar esses campos gera investigação frágil e controle no lugar errado. Duas regras práticas:</p><ul><li><strong>Origem IP não é identidade de usuário:</strong> para saber quem acessou, correlacione com IAM e logs de aplicação.</li><li><strong>Um allow do firewall não é autorização de negócio:</strong> ele só diz que a porta estava liberada para aquela origem.</li></ul></section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2><p>Em uma arquitetura corporativa, o OSI aplicado à segurança aparece como defesa em profundidade: uma pilha de responsabilidades, não de produtos. A matriz abaixo é a ferramenta central da aula; o laboratório e o desafio pedem que você monte uma igual para um fluxo concreto.</p><div class=\"responsive-table\"><table class=\"data-table risk-table\"><thead><tr><th>Camada</th><th>Risco típico</th><th>Preventivo</th><th>Detectivo (evidência)</th><th>Corretivo</th></tr></thead><tbody><tr><td>1 Física</td><td>Acesso não autorizado a sala, rack, porta, cabo ou AP; falha de energia ou de ambiente.</td><td>Controle físico de salas e racks; desativar portas não usadas.</td><td>Inventário, câmera, controle de acesso, link up inesperado.</td><td>Desativar a porta, remover o AP indevido, auditar o acesso.</td></tr><tr><td>2 Enlace</td><td>Movimento lateral em LAN plana, VLAN incorreta, ARP indevido, loop.</td><td>VLANs corretas, port security, 802.1X/NAC, DHCP snooping, inspeção ARP, proteção contra loops.</td><td>Tabela MAC, ARP, logs de switch, alertas de NAC.</td><td>Desativar a porta ou mover o host para uma VLAN de quarentena via NAC.</td></tr><tr><td>3 Rede</td><td>Alcance IP indevido entre segmentos; rota ou peering amplo demais.</td><td>Rotas mínimas, subnets, ACLs, security groups, NACLs, revisão de peering.</td><td>Flow logs, tabela de rotas, ACLs, traceroute autorizado.</td><td>Remover a rota ou o peering, restringir ACL/security group, isolar a subnet.</td></tr><tr><td>4 Transporte</td><td>Porta exposta sem dono, listener desconhecido, regra ampla sem log, egress irrestrito.</td><td>Firewall stateful, allowlist de portas, controle de egress.</td><td>Logs de firewall, listeners, conexões estabelecidas.</td><td>Fechar a porta, remover a regra ampla, desligar o serviço desnecessário.</td></tr><tr><td>5 e 6 Sessão e apresentação</td><td>Token ou cookie vazado; TLS fraco ou sem validação de certificado.</td><td>TLS com certificado validado, mTLS, trust store controlada, tokens de curta duração.</td><td>Logs de proxy e TLS, uso anômalo de token ou sessão.</td><td>Revogar a sessão ou o token, trocar o certificado.</td></tr><tr><td>7 Aplicação</td><td>Autorização falha, bypass de WAF (conceitual), lógica insegura.</td><td>WAF, API gateway, MFA, autorização por perfil, validação de entrada.</td><td>Logs de aplicação, WAF, IAM e status HTTP (401/403/5xx).</td><td>Revogar o acesso, corrigir a política de autorização, aplicar patch.</td></tr></tbody></table></div><p>O erro comum é concentrar os controles em uma única camada e acreditar que isso cobre o restante. Lembre também que controle detectivo tem custo: flow logs, logs de WAF, proxy e aplicação aumentam o armazenamento e a conta do SIEM. Priorize os fluxos críticos.</p></section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2><p>Pense em um prédio corporativo. A Camada 1 é a porta física, a sala, o crachá e a câmera. A Camada 2 é o andar e a rede local onde você se conecta. A Camada 3 é o caminho entre prédios. A Camada 4 é a porta específica de uma sala. As camadas superiores são a conversa, o idioma, a identidade, a autorização e a regra do negócio. Ter o crachá do prédio não dá acesso a todas as salas, assim como ter a porta 443 liberada não dá acesso a todos os dados.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em rede, pacotes são encapsulados, criptografados e processados por serviços invisíveis; a analogia mostra só que são necessárias várias barreiras.</div></section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2><p>Em casa, você conecta um notebook ao Wi-Fi. A segurança começa no físico: alguém consegue mexer no seu roteador? Depois vem o rádio: a rede Wi-Fi usa senha forte e criptografia adequada? Depois o IP: o notebook recebe o endereço correto? Depois o transporte: quais portas estão abertas no roteador ou nos dispositivos? Por fim, a aplicação: o painel do roteador usa senha padrão? O firmware está atualizado?</p><p>\"Colocar senha no Wi-Fi\" é importante, mas não cobre tudo: um roteador com senha de administração padrão continua perigoso mesmo com o Wi-Fi protegido.</p></section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2><p>Um servidor financeiro deve ser acessado apenas por estações autorizadas e por uma aplicação específica. A camada física exige rack controlado. A Camada 2 exige VLAN de servidores. A Camada 3 exige rotas e ACLs controladas. A Camada 4 exige liberar apenas as portas necessárias. As camadas superiores exigem TLS, autenticação forte, autorização por perfil, logs de auditoria e monitoramento de comportamento.</p><p>Se uma estação comprometida consegue alcançar o servidor lateralmente, a falha pode estar em várias camadas ao mesmo tempo: rede plana, ACL ampla, firewall interno ausente, credenciais reaproveitadas, aplicação sem autorização granular ou logs insuficientes.</p></section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2><p>Em cloud, a camada física é abstraída pelo provedor, mas não desaparece: regiões, zonas, disponibilidade e responsabilidade compartilhada continuam importando. A Camada 2 geralmente é abstraída. A Camada 3 aparece em VPC/VNet, subnets, route tables e peering. A Camada 4 aparece em security groups, NSGs, firewalls e load balancers. As camadas superiores aparecem em TLS, API Gateway, WAF, IAM, tokens, policies e logs de auditoria.</p><p>O OSI ajuda a separar as hipóteses. Um bucket privado acessado indevidamente pode não ser falha de rede, e sim política IAM ampla. Uma VM exposta na internet pode ser erro de security group. Um serviço inacessível por private endpoint pode ser DNS privado, rota, NSG ou identidade.</p></section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>Exemplo em DevSecOps</h2><p>Um runner self-hosted de pipeline precisa de saída de rede controlada, DNS, acesso aos registries, TLS validado, secrets protegidos, tokens de curta duração e autorização mínima. Terraform pode criar rotas, security groups, load balancers e endpoints; Kubernetes pode criar Services, Ingress, NetworkPolicies e service accounts.</p><p>O risco é automatizar a insegurança. Uma regra ampla em IaC abre muitas portas em segundos. Um token em log expõe a sessão. Um certificado mal validado permite interceptação, e um pipeline que ignora falhas de TLS pode baixar artefatos de origem errada. Por isso, a segurança por camadas também entra em revisão de código, policy as code e observabilidade.</p></section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>Exemplo em Segurança</h2><p>Um alerta do SIEM indica tráfego incomum de uma estação para um servidor interno. Em vez de bloquear tudo às pressas, você percorre as camadas e anota a evidência de cada uma:</p><ul><li><strong>Camada 2:</strong> VLAN, MAC e switchport da estação.</li><li><strong>Camada 3:</strong> origem, destino, subnet, rota e flow logs.</li><li><strong>Camada 4:</strong> porta, estado e volume das conexões.</li><li><strong>Camada 6:</strong> TLS e certificado.</li><li><strong>Camada 7:</strong> URI, método, usuário, token, status code e se o payload é permitido.</li></ul><p>Se a Camada 4 mostra conexões a uma porta administrativa que a estação nunca usou, a resposta é corretiva e proporcional (restringir a regra ou isolar a estação), com a evidência preservada antes da mudança. Se tudo até a Camada 6 é normal e o problema é o volume de dados lidos por um usuário válido, a investigação é de autorização, não de rede.</p></section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama SVG</h2><svg class=\"lesson-svg\" viewBox=\"0 0 980 620\" role=\"img\" aria-labelledby=\"m02l09-title m02l09-desc\"><title id=\"m02l09-title\">OSI aplicado à cibersegurança</title><desc id=\"m02l09-desc\">Mapa de segurança por camadas mostrando riscos, controles e evidências de camada física até aplicação.</desc><defs><marker id=\"m02l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs><rect x=\"40\" y=\"45\" width=\"220\" height=\"90\" rx=\"16\" class=\"svg-node svg-node--attacker\"/><text x=\"150\" y=\"82\" text-anchor=\"middle\" class=\"svg-label\">Risco</text><text x=\"150\" y=\"108\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">origem, vetor, impacto</text><line x1=\"260\" y1=\"90\" x2=\"355\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l09-arrow)\"/><rect x=\"355\" y=\"20\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--security\"/><text x=\"490\" y=\"54\" text-anchor=\"middle\" class=\"svg-label\">7 Aplicação: WAF, authz, logs</text><rect x=\"355\" y=\"82\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node\"/><text x=\"490\" y=\"116\" text-anchor=\"middle\" class=\"svg-label\">6 Apresentação: TLS, certificados</text><rect x=\"355\" y=\"144\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node\"/><text x=\"490\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">5 Sessão: token, cookie, contexto</text><rect x=\"355\" y=\"206\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--firewall\"/><text x=\"490\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">4 Transporte: portas, estado</text><rect x=\"355\" y=\"268\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--router\"/><text x=\"490\" y=\"302\" text-anchor=\"middle\" class=\"svg-label\">3 Rede: rotas, ACLs, flow logs</text><rect x=\"355\" y=\"330\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--switch\"/><text x=\"490\" y=\"364\" text-anchor=\"middle\" class=\"svg-label\">2 Enlace: VLAN, MAC, NAC</text><rect x=\"355\" y=\"392\" width=\"270\" height=\"55\" rx=\"12\" class=\"svg-node\"/><text x=\"490\" y=\"426\" text-anchor=\"middle\" class=\"svg-label\">1 Física: rack, cabo, rádio</text><line x1=\"625\" y1=\"420\" x2=\"735\" y2=\"420\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l09-arrow)\"/><line x1=\"735\" y1=\"420\" x2=\"735\" y2=\"52\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l09-arrow)\"/><rect x=\"700\" y=\"25\" width=\"235\" height=\"115\" rx=\"16\" class=\"svg-node svg-node--cloud\"/><text x=\"817\" y=\"62\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text><text x=\"817\" y=\"88\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs + pacotes + eventos</text><text x=\"817\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede + IAM + aplicação</text><rect x=\"90\" y=\"500\" width=\"800\" height=\"80\" rx=\"18\" class=\"svg-boundary\"/><text x=\"490\" y=\"532\" text-anchor=\"middle\" class=\"svg-label\">Defesa em profundidade</text><text x=\"490\" y=\"560\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cada camada reduz risco, gera evidência e possui limites. Segurança madura combina camadas, não aposta tudo em uma só.</text></svg></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2><ul><li><strong>Ideia central:</strong> segurança por camadas não é empilhar ferramentas; é saber qual risco cada camada reduz, qual evidência ela gera e quais riscos permanecem.</li><li><strong>Como aplicar:</strong> para cada fluxo, monte a matriz camada → risco → controle preventivo, detectivo e corretivo → evidência → lacuna.</li><li><strong>O que lembrar:</strong> conectividade não é autorização. Firewall, VPN, VLAN, NAT e TLS resolvem só parte do problema; 401 e 403 apontam para identidade e aplicação.</li><li><strong>Uso real:</strong> arquitetura, revisão de mudança, investigação de alerta do SOC e playbooks de incidente.</li><li><strong>Limite ético:</strong> só ambiente próprio ou autorizado, e evidências sanitizadas antes de compartilhar.</li></ul></section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2><p>A próxima aula é a revisão prática do Modelo OSI: você vai consolidar camadas, PDUs, equipamentos, protocolos, comandos, segurança e troubleshooting em um exercício final antes de avançar para Ethernet, MAC, switches e ARP.</p></section>\n"
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
        "interpretation": "Evidência de camadas 6 e 7, sem testar exploração. O -k ignora a validação do certificado: use-o só para ver o restante da resposta; para saber se o certificado é válido, rode sem -k."
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
        "if": "Enlace está coerente, mas não há alcance IP até o destino",
        "then": "Investigar Camada 3: rota, gateway, ACL, security group e flow logs."
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
      "Documentar exceções e revisar periodicamente."
    ],
    "badPractices": [
      "Liberar any-any para testar e esquecer a regra.",
      "Usar TLS sem validar certificado corretamente.",
      "Confiar apenas em logs de firewall para concluir autorização.",
      "Compartilhar PCAP, tokens ou prints com dados sensíveis.",
      "Executar testes ofensivos fora de ambiente autorizado."
    ],
    "commonErrors": [
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
        "description": "Usuários remotos ganham acesso amplo após autenticação no túnel; se a credencial ou o dispositivo for comprometido, o atacante herda esse alcance.",
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
      "Usar apenas ambiente próprio, autorizado ou um cenário desenhado em papel."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Terminal Windows ou Linux para exemplos locais",
      "Opcional: documentação de rede própria sanitizada",
      "Opcional: Cisco Packet Tracer para desenho conceitual"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varredura, exploração ou teste de controles contra redes de terceiros.",
      "Não capture pacotes com credenciais reais; documente com dados fictícios.",
      "Não cole tokens, cookies, IPs públicos sensíveis ou nomes internos em locais compartilhados."
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
        "instruction": "Monte uma tabela com colunas: camada, risco, evidência, controle atual, tipo do controle (P = preventivo, D = detectivo, C = corretivo), lacuna e mitigação.",
        "command": "Camada | Risco | Evidência | Controle | Tipo (P/D/C) | Lacuna | Mitigação",
        "expectedOutput": "Tabela vazia pronta para preenchimento.",
        "explanation": "A matriz transforma segurança em raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Preencher camadas 1 e 2",
        "instruction": "Liste riscos físicos e de enlace, como porta exposta, AP indevido, VLAN errada ou ausência de controle de porta.",
        "expectedOutput": "Riscos e controles de Camada 1 e 2 documentados.",
        "explanation": "A segurança começa antes do IP: acesso físico e enlace influenciam o restante.",
        "command": "Exemplo de linha: 2 Enlace | porta de switch em sala de reunião sem 802.1X | logs de switch/NAC | VLAN de usuários | P | sem autenticação de dispositivo | 802.1X/NAC"
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
        "command": "curl -vkI https://exemplo.interno  # apenas em ambiente autorizado; sem -k, um certificado inválido faz o teste falhar",
        "expectedOutput": "Status HTTP, headers e observações sobre TLS quando aplicável.",
        "explanation": "Porta aberta não prova segurança; as camadas superiores decidem identidade, autorização e lógica."
      },
      {
        "number": 6,
        "title": "Adicionar fontes de log",
        "instruction": "Para cada camada, indique onde a evidência apareceria: switch, firewall, flow logs, WAF, proxy, IAM, aplicação, SIEM ou EDR.",
        "expectedOutput": "Coluna de evidências enriquecida com fontes de log.",
        "explanation": "Defesa madura depende de correlação entre camadas.",
        "command": "Exemplo: Camada 3 -> flow logs; Camada 4 -> logs de firewall; Camada 7 -> logs de WAF, aplicação e IAM"
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
      "Adicionar ao fluxo um diagrama com zonas de segurança.",
      "Relacionar a matriz com alertas do SIEM e transformá-la em playbook de investigação por camadas.",
      "Criar checklist de revisão de mudança para firewall/security group."
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
      "question": "O log do firewall mostra allow para TCP/443 da estação 10.20.5.14 ao servidor de RH e, no mesmo minuto, a aplicação registra HTTP 200 para o usuário usuario.exemplo. Isso prova que usuario.exemplo tinha autorização para ver aqueles dados? Que evidências você correlacionaria?",
      "hints": [
        "O que um allow de firewall realmente diz?",
        "Origem IP é o mesmo que identidade de usuário?"
      ],
      "expectedIdeas": [
        "allow de firewall só prova que a porta estava liberada",
        "IP de origem não identifica o usuário; 200 não prova autorização de negócio",
        "correlacionar IAM (role, escopo), audit log da aplicação e logs de WAF/proxy",
        "conferir se os registros acessados combinam com a função do usuário"
      ],
      "explanation": "Firewall e status 200 são evidências de conectividade e de atendimento. Autorização de negócio só se confirma nas camadas superiores, cruzando identidade, papel e registros acessados."
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
      "id": "q2.9.7",
      "question": "Depois de um alerta de uso anômalo de token, a equipe revoga a sessão do usuário e força nova autenticação. Que tipo de controle é esse e em que camada ele atua?",
      "options": [
        "Preventivo, na Camada 4",
        "Corretivo, nas camadas de sessão e aplicação",
        "Detectivo, na Camada 2",
        "Preventivo, na Camada 1"
      ],
      "answer": 1,
      "explanation": "Revogar a sessão age depois do evento para conter o dano: é corretivo. Token e sessão pertencem às camadas superiores (5 a 7).",
      "topic": "tipos de controle",
      "difficulty": "iniciante-intermediário",
      "type": "conceito"
    },
    {
      "id": "q2.9.2",
      "question": "Por que VPN não deve ser tratada como solução completa de segurança?",
      "options": [
        "Porque VPN nunca usa criptografia",
        "Porque VPN protege o túnel, mas não substitui segmentação, autorização e logs",
        "Porque VPN só funciona em camada física",
        "Porque VPN elimina necessidade de MFA"
      ],
      "answer": 1,
      "explanation": "VPN pode proteger transporte/acesso, mas ainda exige menor privilégio, controle de destino, identidade e monitoramento.",
      "topic": "vpn",
      "difficulty": "iniciante-intermediário",
      "type": "segurança"
    },
    {
      "id": "q2.9.3",
      "question": "Se TCP/443 conecta, TLS é válido, mas a API retorna 403, qual hipótese é mais forte?",
      "options": [
        "Falha de autorização ou política de aplicação",
        "Cabo rompido",
        "Ausência total de IP",
        "Porta física desligada"
      ],
      "answer": 0,
      "explanation": "403 é uma resposta de aplicação/autorização. Camadas inferiores já deram evidência de funcionamento básico.",
      "topic": "camada 7",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.9.4",
      "question": "Qual controle está mais ligado à Camada 2?",
      "options": [
        "VLAN e 802.1X/NAC",
        "HTTP status code",
        "JWT scope",
        "Certificado TLS"
      ],
      "answer": 0,
      "explanation": "VLAN e 802.1X/NAC atuam fortemente no enlace/acesso local.",
      "topic": "camada 2",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q2.9.5",
      "question": "Em cloud, security groups e NSGs atuam principalmente em qual tipo de controle?",
      "options": [
        "Controle de alcance por rede/porta",
        "Validação de regra de negócio",
        "Codificação Unicode",
        "Controle físico do rack do provedor"
      ],
      "answer": 0,
      "explanation": "Security groups/NSGs controlam principalmente tráfego por origem, destino, protocolo e porta.",
      "topic": "cloud",
      "difficulty": "iniciante-intermediário",
      "type": "cloud"
    },
    {
      "id": "q2.9.8",
      "question": "Você vai anexar a um chamado interno a saída de curl -v de uma API da empresa. O que deve ser mascarado antes?",
      "options": [
        "Nada, porque o chamado é interno",
        "Apenas o status HTTP da resposta",
        "Cabeçalhos com token ou cookie de sessão, usuários reais e nomes internos",
        "Somente o certificado público do servidor"
      ],
      "answer": 2,
      "explanation": "Token e cookie permitem reutilizar a sessão, e usuários e nomes internos revelam a topologia. Evidência compartilhada, mesmo internamente, deve ser sanitizada.",
      "topic": "ética",
      "difficulty": "iniciante",
      "type": "ética"
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
      "id": "fc2.9.7",
      "front": "O que é controle corretivo? Dê um exemplo.",
      "back": "Controle que age depois do evento para conter o dano e restaurar o estado seguro. Ex.: desativar a porta do switch, revogar um token, remover uma regra ampla.",
      "tags": [
        "controles",
        "osi"
      ],
      "difficulty": "iniciante"
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
      "id": "ex2.9.5",
      "type": "classificação",
      "prompt": "Classifique cada controle como preventivo, detectivo ou corretivo e indique a camada principal: 802.1X na porta do switch; flow logs da VPC; revogação de um token vazado; allowlist de portas no firewall; alerta de aumento de 403 no WAF; remoção de uma rota de peering ampla.",
      "expectedAnswer": "802.1X: preventivo, Camada 2. Flow logs: detectivo, Camada 3. Revogar token: corretivo, camadas de sessão/aplicação. Allowlist de portas: preventivo, Camada 4. Alerta de 403 no WAF: detectivo, Camada 7. Remover rota de peering: corretivo, Camada 3.",
      "explanation": "O tipo depende do momento em que o controle age: antes (impede), durante/depois (mostra) ou depois (contém e restaura)."
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
      },
      {
        "answer": "Anexar ao relatório logs e prints com tokens, cookies e usuários reais.",
        "whyItIsWrong": "A pressa do incidente vira vazamento: mascare dados sensíveis antes de compartilhar."
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
      "term": "Controle corretivo",
      "shortDefinition": "Controle que age depois do evento para conter e restaurar.",
      "longDefinition": "Mecanismo ou ação que reduz o dano de um evento já ocorrido e devolve o ambiente a um estado seguro.",
      "example": "Revogar a sessão de um usuário após alerta de uso anômalo de token.",
      "relatedTerms": [
        "controle preventivo",
        "controle detectivo",
        "resposta a incidentes"
      ],
      "relatedLessons": [
        "2.9"
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
