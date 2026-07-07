export const lesson0908 = {
  "id": "9.8",
  "moduleId": "m09",
  "order": 8,
  "title": "Troubleshooting de políticas com logs, contadores e packet capture",
  "subtitle": "Como diagnosticar bloqueios e permissões indevidas usando método, matriz de fluxo, logs, contadores, tabela de estado, NAT, WAF, cloud flow logs e captura de pacotes.",
  "duration": "120–185 min",
  "estimatedStudyTimeMinutes": 185,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 285,
  "tags": [
    "firewall",
    "acl",
    "troubleshooting",
    "logs",
    "packet capture",
    "tcpdump",
    "flow logs",
    "NAT",
    "WAF",
    "cloud firewall",
    "SIEM",
    "observabilidade",
    "p1-07",
    "firewall-lab-v2-final"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.1",
      "title": "Por que firewalls existem",
      "reason": "Troubleshooting de política depende de saber qual problema o firewall deve resolver."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.2",
      "title": "ACLs, regras e ordem de processamento",
      "reason": "Grande parte das falhas vem de ordem de regra, shadowing e deny implícito."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.3",
      "title": "Firewalls stateless vs stateful",
      "reason": "É necessário diferenciar bloqueio de ida, retorno e estado de conexão."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.5",
      "title": "NAT, port forwarding e publicação controlada",
      "reason": "Muitos incidentes de conectividade envolvem DNAT, SNAT, PAT e rota de retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.8",
      "title": "Troubleshooting HTTP com curl, navegador, logs e traces",
      "reason": "Políticas modernas frequentemente afetam tráfego HTTP/HTTPS e APIs."
    }
  ],
  "objectives": [
    "Construir um método repetível para diagnosticar políticas de tráfego sem tentativa e erro.",
    "Separar problemas de DNS, rota, ACL, firewall stateful, NAT, WAF, load balancer, TLS e aplicação.",
    "Usar logs, contadores, flow logs, tabela de estado e packet capture como evidências complementares.",
    "Interpretar sintomas como timeout, connection refused, reset, 403, 502, 503 e 504.",
    "Documentar a causa raiz e propor correção mínima, reversível e auditável."
  ],
  "learningOutcomes": [
    "Dado um fluxo origem-destino-porta, o aluno conseguirá montar uma matriz de investigação.",
    "Dado um bloqueio, o aluno conseguirá escolher onde coletar evidência primeiro.",
    "Dado um log de firewall/WAF/cloud, o aluno conseguirá diferenciar allow, deny, drop, reset e timeout.",
    "Dado um pcap simples, o aluno conseguirá reconhecer SYN sem SYN-ACK, RST, retransmissão e resposta assimétrica.",
    "Dado um cenário cloud, o aluno conseguirá verificar security group, NACL/NSG, rota, NAT Gateway, firewall e flow logs."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h3>Motivação</h3><p>Em redes corporativas, quando uma aplicação “não conecta”, o primeiro impulso costuma ser culpar o firewall. Às vezes o firewall realmente bloqueia. Em outras, o problema está em DNS, rota, NAT, porta errada, backend indisponível, certificado, WAF, health check, proxy, balanceador ou aplicação.</p><p>O objetivo desta aula é transformar troubleshooting em investigação técnica. Em vez de abrir portas no escuro, você aprenderá a seguir evidências: matriz de fluxo, logs, contadores, tabela de estado, flow logs, packet capture e testes controlados.</p><div class=\"callout callout--warning\"><strong>Regra profissional:</strong> nunca resolva troubleshooting de firewall com “libera any-any só para testar” em produção. Isso pode virar exceção permanente, mascarar a causa raiz e criar exposição crítica.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h3>História</h3><p>No começo das redes IP, diagnosticar conectividade era basicamente verificar cabo, IP, rota e ping. Com firewalls, NAT, VPNs, proxies, WAFs, balanceadores e cloud, o caminho deixou de ser uma linha reta. Hoje um pacote pode atravessar security group, NACL, route table, NAT Gateway, firewall central, WAF, API Gateway, service mesh e backend.</p><p>Por isso, operações maduras criaram práticas como matriz de comunicação, change management, logs centralizados, flow logs, packet capture sob demanda, SIEM, observabilidade e runbooks. A habilidade moderna não é apenas saber criar uma regra: é provar por que uma regra funciona ou não funciona.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h3>Problema</h3><p>O problema central é que sintomas parecidos podem ter causas muito diferentes. Um <code>timeout</code> pode ser firewall drop, rota ausente, backend fora, security group negando, NACL bloqueando retorno, NAT sem rota de volta ou conexão sendo descartada por um IPS. Um <code>403</code> pode ser aplicação, WAF, API Gateway, política de autorização ou CORS.</p><table class=\"data-table\"><thead><tr><th>Sintoma</th><th>Possíveis causas</th><th>Evidência útil</th></tr></thead><tbody><tr><td>Timeout</td><td>Drop silencioso, rota ausente, retorno bloqueado, backend sem resposta</td><td>Flow logs, contadores, pcap, traceroute autorizado</td></tr><tr><td>Connection refused</td><td>Host alcançado, mas porta fechada ou serviço parado</td><td><code>ss</code>/<code>netstat</code>, logs do serviço, pcap com RST</td></tr><tr><td>Reset</td><td>Firewall/IPS resetando, aplicação encerrando, proxy rejeitando</td><td>Packet capture nos dois lados e logs do intermediário</td></tr><tr><td>403</td><td>WAF, API Gateway, aplicação, IAM, CORS</td><td>Logs HTTP, request ID, regra acionada</td></tr><tr><td>502/503/504</td><td>Proxy/LB sem backend saudável, timeout upstream, rota interna</td><td>Health checks, logs do LB/proxy/backend</td></tr></tbody></table></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h3>Evolução</h3><p>O troubleshooting evoluiu de testes simples de conectividade para correlação distribuída. Primeiro verificávamos IP, máscara e gateway. Depois vieram ACLs e NAT. Em seguida, firewalls stateful passaram a exigir análise de estado. Em ambientes web, WAFs e proxies passaram a alterar respostas. Em cloud, a investigação passou a incluir security groups, NACLs/NSGs, route tables, firewalls gerenciados, endpoints privados e flow logs.</p><p>Hoje, o bom diagnóstico combina camadas: DNS, rota, TCP/UDP, TLS, HTTP, política, identidade, aplicação e observabilidade. A pergunta deixou de ser “a porta está aberta?” e passou a ser “qual controle tomou qual decisão, com qual regra, em qual ponto do caminho?”.</p></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h3>Conceito</h3><p><strong>Troubleshooting de política de tráfego</strong> é o processo de verificar, com evidências, se um fluxo autorizado passa pelo caminho esperado e se um fluxo não autorizado é bloqueado no ponto correto.</p><div class=\"definition-box\"><p><strong>Fluxo</strong> é a combinação mínima de origem, destino, protocolo, porta, direção, aplicação, identidade operacional, justificativa e criticidade. Sem isso, a investigação vira palpite.</p></div><p>Uma política não deve ser analisada como uma regra isolada. Ela precisa ser interpretada dentro do caminho completo: origem, DNS, rota, NAT, firewall, state table, proxy/WAF, load balancer, backend e retorno.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h3>Funcionamento interno</h3><p>Quando um cliente tenta acessar um serviço, vários controles podem tomar decisões antes do backend responder. Um firewall stateless avalia pacote por pacote. Um firewall stateful consulta a tabela de estado. Um NAT cria ou consulta tradução. Um WAF interpreta HTTP. Um load balancer verifica health check. Um cloud firewall aplica regra de rede. Um security group permite retorno automaticamente, enquanto uma NACL exige regra explícita de ida e volta.</p><ol class=\"flow-list\"><li>O cliente resolve o nome para um endereço.</li><li>A máquina escolhe rota e gateway.</li><li>O pacote cruza controles de origem, subnet e borda.</li><li>Firewalls avaliam ACLs, zonas, estado e NAT.</li><li>Proxies/WAFs avaliam host, path, header, método, body e reputação.</li><li>Load balancers encaminham para backends saudáveis.</li><li>O backend responde e o retorno precisa seguir caminho permitido.</li><li>Logs, contadores e capturas registram partes diferentes dessa jornada.</li></ol></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h3>Arquitetura</h3><p>Em uma arquitetura corporativa madura, troubleshooting não depende de acesso improvisado. Cada zona e controle deve ter plano de evidência: logs habilitados, horário sincronizado por NTP, identificadores de requisição, contadores por regra, flow logs, métricas de health check e possibilidade controlada de packet capture.</p><table class=\"comparison-table\"><thead><tr><th>Ponto</th><th>O que comprova</th><th>Limitação</th></tr></thead><tbody><tr><td>Log de firewall</td><td>Regra, ação, origem, destino, porta, zona e horário</td><td>Pode não mostrar payload ou causa da aplicação</td></tr><tr><td>Contador de regra</td><td>Se a regra está recebendo hits</td><td>Não prova que a aplicação respondeu corretamente</td></tr><tr><td>Flow log cloud</td><td>Aceite/rejeição em interfaces e subnets</td><td>Pode ser agregado e atrasado</td></tr><tr><td>Packet capture</td><td>Pacotes reais, flags TCP, retransmissões e RST</td><td>Exige ponto correto de captura e cuidado com dados sensíveis</td></tr><tr><td>Log de WAF/API Gateway</td><td>Regra HTTP, path, método, status e request ID</td><td>Não substitui log de rede nem log da aplicação</td></tr></tbody></table></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h3>Analogia</h3><p>Imagine investigar por que uma encomenda não chegou. Você não começa derrubando todas as portas do prédio. Você verifica o endereço, a portaria, a autorização de entrada, o registro da transportadora, a câmera, o elevador, a assinatura de recebimento e o caminho de retorno.</p><p>Em redes é igual: DNS é o endereço, rota é o caminho, firewall é a portaria, NAT é a tradução de nomes, WAF é a revista do conteúdo, load balancer é a distribuição interna, logs são registros e packet capture é a filmagem do pacote passando.</p></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h3>Exemplo simples</h3><p>Um usuário diz que não consegue acessar <code>https://app.exemplo.local</code>. O diagnóstico básico começa com perguntas objetivas: o nome resolve? A porta 443 conecta? O certificado responde? O status HTTP aparece? O erro é igual de outra rede?</p><pre><code>nslookup app.exemplo.local\ncurl -vkI https://app.exemplo.local\nTest-NetConnection app.exemplo.local -Port 443</code></pre><p>Se DNS falha, não faz sentido mexer no firewall. Se TCP conecta, mas HTTP retorna 403, provavelmente a investigação está em WAF, proxy, API Gateway, aplicação ou autorização.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h3>Exemplo empresarial</h3><p>Uma aplicação de RH na DMZ precisa acessar uma API interna na zona de aplicações. A matriz aprovada diz: origem <code>rh-dmz-subnet</code>, destino <code>api-rh-interna</code>, TCP/8443, justificativa “consulta cadastral”, dono “RH Tech”, validade “12 meses”.</p><p>O acesso falha com timeout. O analista verifica a regra no firewall, vê contador sem incremento e descobre que a rota da DMZ aponta para outro firewall, não para o firewall onde a regra foi criada. A causa raiz não era porta fechada, mas caminho incorreto. Abrir mais regras não resolveria.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h3>Exemplo em cloud</h3><p>Em cloud, um backend privado não acessa uma API externa. O security group permite saída, mas o flow log mostra rejeição na NACL de retorno. Em outro caso, a NACL permite, mas a route table da subnet privada não aponta para NAT Gateway. Em um terceiro caso, a rota existe, mas o firewall central bloqueia e registra deny por categoria.</p><p>Por isso o troubleshooting cloud precisa seguir a cadeia: DNS, route table, security group, NACL/NSG, NAT Gateway, firewall gerenciado, endpoint privado, load balancer, health check e flow logs.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h3>Exemplo em DevSecOps</h3><p>Em DevSecOps, troubleshooting de política deve virar artefato versionado. A equipe pode manter matrizes em YAML, regras em Terraform, testes automatizados de exposição, validação de portas proibidas e pipelines que impedem <code>0.0.0.0/0</code> em administração.</p><p>Quando há incidente, o pull request da regra, a justificativa, o dono, a validade e os logs do período precisam ser recuperáveis. O objetivo é evitar a cultura de “abre agora e depois a gente vê”.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h3>Exemplo em Segurança</h3><p>Para Segurança da Informação, troubleshooting não é apenas restaurar conectividade. É confirmar se o fluxo restaurado é legítimo, mínimo, monitorado e coerente com a arquitetura. Durante um incidente, logs de deny podem indicar tentativa de movimento lateral; contadores crescendo em regra incomum podem indicar varredura; e um pcap pode revelar exfiltração, beaconing ou protocolo inesperado.</p><div class=\"callout callout--security\"><strong>Visão defensiva:</strong> uma regra que “resolve” indisponibilidade mas permite tráfego amplo pode transformar um incidente operacional em incidente de segurança.</div></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h3>Diagrama SVG</h3>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1200 620\" role=\"img\" aria-labelledby=\"m09l08-title m09l08-desc\">\n  <title id=\"m09l08-title\">Troubleshooting de política de tráfego com evidências</title>\n  <desc id=\"m09l08-desc\">Fluxo de investigação usando cliente, DNS, rota, firewall, NAT, WAF, load balancer, backend, logs, contadores e packet capture.</desc>\n  <defs>\n    <marker id=\"m09l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n      <path class=\"svg-flow\" d=\"M0,0 L0,6 L9,3 z\"></path>\n    </marker>\n  </defs>\n  <rect class=\"svg-zone\" x=\"30\" y=\"40\" width=\"170\" height=\"520\" rx=\"16\"></rect>\n  <text class=\"svg-label\" x=\"115\" y=\"72\" text-anchor=\"middle\">Origem</text>\n  <rect class=\"svg-node svg-node--client\" x=\"55\" y=\"125\" width=\"120\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"115\" y=\"155\" text-anchor=\"middle\">Cliente</text>\n  <text class=\"svg-label svg-label--small\" x=\"115\" y=\"178\" text-anchor=\"middle\">curl / browser</text>\n  <rect class=\"svg-node svg-node--server\" x=\"55\" y=\"310\" width=\"120\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"115\" y=\"340\" text-anchor=\"middle\">DNS</text>\n  <text class=\"svg-label svg-label--small\" x=\"115\" y=\"363\" text-anchor=\"middle\">nome → IP</text>\n\n  <rect class=\"svg-zone\" x=\"235\" y=\"40\" width=\"210\" height=\"520\" rx=\"16\"></rect>\n  <text class=\"svg-label\" x=\"340\" y=\"72\" text-anchor=\"middle\">Caminho</text>\n  <rect class=\"svg-node svg-node--router\" x=\"280\" y=\"125\" width=\"120\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"340\" y=\"155\" text-anchor=\"middle\">Rota</text>\n  <text class=\"svg-label svg-label--small\" x=\"340\" y=\"178\" text-anchor=\"middle\">gateway / tabela</text>\n  <rect class=\"svg-node svg-node--firewall\" x=\"280\" y=\"310\" width=\"120\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"340\" y=\"340\" text-anchor=\"middle\">Firewall</text>\n  <text class=\"svg-label svg-label--small\" x=\"340\" y=\"363\" text-anchor=\"middle\">policy / state</text>\n\n  <rect class=\"svg-zone\" x=\"480\" y=\"40\" width=\"260\" height=\"520\" rx=\"16\"></rect>\n  <text class=\"svg-label\" x=\"610\" y=\"72\" text-anchor=\"middle\">Publicação</text>\n  <rect class=\"svg-node svg-node--cloud\" x=\"520\" y=\"120\" width=\"180\" height=\"75\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"610\" y=\"151\" text-anchor=\"middle\">NAT / LB</text>\n  <text class=\"svg-label svg-label--small\" x=\"610\" y=\"174\" text-anchor=\"middle\">DNAT, SNAT, health</text>\n  <rect class=\"svg-node svg-node--security\" x=\"520\" y=\"310\" width=\"180\" height=\"75\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"610\" y=\"340\" text-anchor=\"middle\">WAF / Proxy</text>\n  <text class=\"svg-label svg-label--small\" x=\"610\" y=\"363\" text-anchor=\"middle\">headers / rules</text>\n\n  <rect class=\"svg-zone\" x=\"775\" y=\"40\" width=\"175\" height=\"520\" rx=\"16\"></rect>\n  <text class=\"svg-label\" x=\"862\" y=\"72\" text-anchor=\"middle\">Destino</text>\n  <rect class=\"svg-node svg-node--server\" x=\"805\" y=\"175\" width=\"115\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"862\" y=\"205\" text-anchor=\"middle\">Backend</text>\n  <text class=\"svg-label svg-label--small\" x=\"862\" y=\"228\" text-anchor=\"middle\">porta / app</text>\n  <rect class=\"svg-node svg-node--server\" x=\"805\" y=\"370\" width=\"115\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"862\" y=\"400\" text-anchor=\"middle\">Banco</text>\n  <text class=\"svg-label svg-label--small\" x=\"862\" y=\"423\" text-anchor=\"middle\">privado</text>\n\n  <rect class=\"svg-zone\" x=\"985\" y=\"40\" width=\"185\" height=\"520\" rx=\"16\"></rect>\n  <text class=\"svg-label\" x=\"1077\" y=\"72\" text-anchor=\"middle\">Evidências</text>\n  <rect class=\"svg-node svg-node--security\" x=\"1015\" y=\"125\" width=\"125\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"1077\" y=\"155\" text-anchor=\"middle\">Logs</text>\n  <text class=\"svg-label svg-label--small\" x=\"1077\" y=\"178\" text-anchor=\"middle\">allow / deny</text>\n  <rect class=\"svg-node svg-node--security\" x=\"1015\" y=\"275\" width=\"125\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"1077\" y=\"305\" text-anchor=\"middle\">Contadores</text>\n  <text class=\"svg-label svg-label--small\" x=\"1077\" y=\"328\" text-anchor=\"middle\">hits / drops</text>\n  <rect class=\"svg-node svg-node--security\" x=\"1015\" y=\"425\" width=\"125\" height=\"70\" rx=\"12\"></rect>\n  <text class=\"svg-label\" x=\"1077\" y=\"455\" text-anchor=\"middle\">Capture</text>\n  <text class=\"svg-label svg-label--small\" x=\"1077\" y=\"478\" text-anchor=\"middle\">tcpdump / pcap</text>\n\n  <path class=\"svg-flow svg-flow--request animated-flow\" d=\"M175 160 H280\" marker-end=\"url(#m09l08-arrow)\"></path>\n  <path class=\"svg-flow svg-flow--request animated-flow\" d=\"M400 160 H520\" marker-end=\"url(#m09l08-arrow)\"></path>\n  <path class=\"svg-flow svg-flow--request animated-flow\" d=\"M700 160 C750 160 760 210 805 210\" marker-end=\"url(#m09l08-arrow)\"></path>\n  <path class=\"svg-flow svg-flow--blocked\" d=\"M400 345 H520\" marker-end=\"url(#m09l08-arrow)\"></path>\n  <path class=\"svg-flow svg-flow--response\" d=\"M920 210 C965 210 965 160 1015 160\" marker-end=\"url(#m09l08-arrow)\"></path>\n  <path class=\"svg-flow svg-flow--response\" d=\"M700 350 H1015\" marker-end=\"url(#m09l08-arrow)\"></path>\n  <text class=\"svg-badge\" x=\"240\" y=\"145\">1 DNS/rota</text>\n  <text class=\"svg-badge\" x=\"430\" y=\"145\">2 policy/state</text>\n  <text class=\"svg-badge\" x=\"720\" y=\"195\">3 backend</text>\n  <text class=\"svg-badge\" x=\"910\" y=\"145\">4 evidência</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h3>Laboratório</h3><p>Neste laboratório, você construirá um runbook de troubleshooting para políticas de tráfego. O foco é diagnosticar de forma segura, coletando evidências antes de alterar regras.</p></section>\n<div class=\"content-card\" data-enhancement=\"p1-07-9.8\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h3>Exercícios</h3><p>Os exercícios reforçam a leitura de sintomas, a escolha da evidência correta e a separação entre problemas de rede, política, NAT, WAF e aplicação.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h3>Desafio</h3><p>Você receberá um cenário com uma API inacessível intermitentemente e deverá produzir causa provável, evidências necessárias, correção mínima e plano de validação.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h3>Solução comentada</h3><p>A solução comentada demonstra como conduzir a investigação sem abrir permissões amplas, preservando segurança, rastreabilidade e governança.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h3>Resumo</h3><p>Troubleshooting de políticas exige método. Primeiro defina o fluxo. Depois verifique nome, rota, porta, estado, NAT, regra, WAF, backend e retorno. Use logs, contadores, flow logs e packet capture para provar onde o pacote parou ou foi transformado.</p><p>O profissional maduro não pergunta apenas “liberou?”. Ele pergunta: qual regra permitiu ou bloqueou, em qual controle, com qual evidência, para qual fluxo, por quanto tempo e com qual risco?</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h3>Próximo tema</h3><p>Na próxima aula, você estudará <strong>Governança de regras: revisão, exceções e policy as code</strong>. A pergunta deixará de ser apenas técnica e passará a ser operacional: como impedir que regras temporárias, exceções e aberturas emergenciais virem dívida de segurança permanente?</p></section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula fica no ponto de operação entre rede, segurança, cloud, SRE, DevSecOps e resposta a incidentes.",
    "previousConcepts": [
      "IPv4",
      "roteamento",
      "TCP/UDP",
      "NAT/PAT",
      "HTTP/HTTPS",
      "WAF",
      "ACL",
      "stateful firewall",
      "security groups",
      "NACLs"
    ],
    "nextConcepts": [
      "governança de regras",
      "policy as code",
      "firewall lifecycle",
      "exceções temporárias",
      "auditoria de exposição"
    ]
  },
  "protocolFields": [
    {
      "field": "5-tuple",
      "meaning": "Origem, destino, protocolo, porta de origem e porta de destino que identificam um fluxo."
    },
    {
      "field": "TCP flags",
      "meaning": "SYN, SYN-ACK, ACK, FIN e RST ajudam a entender onde a conexão parou."
    },
    {
      "field": "Rule ID",
      "meaning": "Identificador da regra que permitiu ou bloqueou o tráfego."
    },
    {
      "field": "Action",
      "meaning": "Ação registrada: allow, deny, drop, reject, reset, inspect ou log-only."
    },
    {
      "field": "NAT translation",
      "meaning": "Endereços e portas antes e depois da tradução."
    },
    {
      "field": "State table entry",
      "meaning": "Registro de conexão em firewall stateful ou controle equivalente."
    },
    {
      "field": "Request ID",
      "meaning": "Identificador para correlacionar logs HTTP, WAF, gateway e backend."
    },
    {
      "field": "Flow log decision",
      "meaning": "Aceite ou rejeição em camada de rede em cloud."
    }
  ],
  "packetFlow": [
    "Definir origem, destino, protocolo, porta, aplicação, horário e usuário afetado.",
    "Validar DNS e resolução de nome.",
    "Validar rota de ida e caminho esperado até o controle de segurança.",
    "Testar TCP/UDP de forma controlada a partir da origem correta.",
    "Verificar logs e contadores na primeira política do caminho.",
    "Verificar state table e NAT quando houver retorno, PAT, DNAT ou publicação.",
    "Verificar WAF, proxy, load balancer e health checks quando o fluxo for HTTP/HTTPS.",
    "Coletar packet capture no ponto correto quando logs forem inconclusivos.",
    "Comparar evidências de origem, intermediário e destino.",
    "Aplicar correção mínima, validar e documentar rollback."
  ],
  "deepDive": {
    "title": "Como interpretar evidências sem cair em armadilhas",
    "topics": [
      {
        "title": "Log ausente não prova permissão",
        "body": "Se o pacote não chegou ao firewall que você está olhando, o problema pode estar antes: rota, outro firewall, security group, NACL, endpoint errado ou DNS."
      },
      {
        "title": "Contador incrementando não prova sucesso",
        "body": "Uma regra com hits pode estar permitindo a ida, mas o retorno pode estar bloqueado. Também pode existir reset, timeout de backend ou falha em TLS/HTTP."
      },
      {
        "title": "Packet capture em um ponto só pode enganar",
        "body": "Capturar apenas na origem mostra tentativa. Capturar apenas no destino mostra chegada. Capturas em dois pontos ajudam a provar perda, tradução, assimetria e reset por intermediário."
      },
      {
        "title": "Timeout não é diagnóstico",
        "body": "Timeout é sintoma. A causa pode ser drop, perda, rota, backend parado, política de retorno, NAT, health check, proxy ou filtragem silenciosa."
      }
    ]
  },
  "commonMistakes": [
    "Abrir any-any para testar e esquecer a regra ativa.",
    "Investigar firewall antes de confirmar DNS, rota e destino correto.",
    "Confiar em ping para diagnosticar serviço TCP/HTTPS.",
    "Ignorar porta efêmera e fluxo de retorno em controles stateless.",
    "Olhar logs no firewall errado em ambientes com rota assimétrica.",
    "Não sincronizar horário entre logs, SIEM, WAF e aplicação.",
    "Coletar packet capture com tokens, cookies e payload sensível sem sanitização.",
    "Tratar 403 de WAF como se fosse problema de porta bloqueada.",
    "Confundir security group stateful com NACL stateless.",
    "Não documentar a causa raiz após resolver a urgência."
  ],
  "troubleshooting": {
    "method": "Fluxo → sintoma → hipótese → evidência → ponto de controle → teste → correção mínima → validação → documentação.",
    "checks": [
      {
        "symptom": "Nome não resolve",
        "check": "Verificar DNS autoritativo, cache, split-horizon e sufixo de busca.",
        "tools": [
          "nslookup",
          "dig",
          "Resolve-DnsName"
        ]
      },
      {
        "symptom": "Timeout TCP",
        "check": "Verificar rota, ACL, state table, NAT, security group, NACL e flow logs.",
        "tools": [
          "curl -v",
          "nc -vz",
          "Test-NetConnection",
          "flow logs",
          "firewall logs"
        ]
      },
      {
        "symptom": "Connection refused",
        "check": "Verificar se serviço escuta na porta e se LB aponta para backend saudável.",
        "tools": [
          "ss -lntp",
          "netstat",
          "health check logs",
          "tcpdump"
        ]
      },
      {
        "symptom": "RST",
        "check": "Comparar pcap nos dois lados para identificar quem enviou reset.",
        "tools": [
          "tcpdump",
          "Wireshark",
          "firewall session logs"
        ]
      },
      {
        "symptom": "403",
        "check": "Verificar WAF, API Gateway, autorização, CORS e regra HTTP acionada.",
        "tools": [
          "curl -v",
          "WAF logs",
          "request ID",
          "application logs"
        ]
      },
      {
        "symptom": "502/503/504",
        "check": "Verificar proxy, upstream, health check, timeout, rota interna e backend.",
        "tools": [
          "LB logs",
          "proxy logs",
          "APM",
          "traces"
        ]
      }
    ],
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "nc -vz api.lab.local 443\nTest-NetConnection api.lab.local -Port 443\ncurl -vkI https://api.lab.local/health",
        "purpose": "Testar transporte",
        "expectedObservation": "Timeout/refused/TLS/HTTP interpretado.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "ss -tulpen | grep 443 || netstat -ano | findstr 443\njournalctl -u nginx --since \"10 minutes ago\"",
        "purpose": "Ver listener no destino",
        "expectedObservation": "Serviço validado.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "show access-lists\nsudo iptables -vnL\nsudo nft list ruleset",
        "purpose": "Contadores de regra",
        "expectedObservation": "Controle correto identificado.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "sudo tcpdump -nn -i any \"host api.lab.local and tcp port 443\" -c 30\nsudo tshark -r evidencia.pcap -Y \"tcp.flags.syn==1 || tcp.flags.reset==1\"",
        "purpose": "Packet capture",
        "expectedObservation": "Flags e retransmissões interpretadas.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "curl -vkI https://api.lab.local/health -H \"X-Request-ID: lab-9-8-001\"",
        "purpose": "Correlacionar WAF/API",
        "expectedObservation": "Camada 7 separada.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Troubleshooting de políticas com logs, contadores e packet capture.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "Qual é o 5-tuple do fluxo e em qual horário ele falhou?",
      "Qual controle tomou a decisão e qual evidência prova isso?",
      "A falha está na ida, no retorno, no estado, no NAT, no WAF ou no backend?"
    ],
    "decisionTree": [
      {
        "if": "Sem hits na regra",
        "then": "Verificar ponto de aplicação, direção, rota e origem real do fluxo."
      },
      {
        "if": "Allow existe mas aplicação falha",
        "then": "Separar transporte, TLS, WAF, backend e autorização."
      },
      {
        "if": "Retorno falha",
        "then": "Verificar state table, NACL/ACL stateless, portas efêmeras e caminho assimétrico."
      },
      {
        "if": "Regra ampla aparece",
        "then": "Substituir por matriz mínima com owner, validade, log e rollback."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Liberar origem 0.0.0.0/0 para administração como teste rápido.",
      "Desativar WAF ou firewall inteiro para descobrir se o problema some.",
      "Criar regra temporária sem validade e sem dono.",
      "Guardar pcaps com credenciais ou tokens em diretórios compartilhados.",
      "Ignorar logs de deny durante incidente de segurança.",
      "Confundir conectividade restaurada com segurança validada."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição acidental por regra ampla criada durante troubleshooting.",
        "description": "Risco relacionado à aula 9.8 — Troubleshooting de políticas com logs, contadores e packet capture.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Usar change control e expiração automática de exceções."
      },
      {
        "name": "Bypass de WAF por backend público liberado para teste.",
        "description": "Risco relacionado à aula 9.8 — Troubleshooting de políticas com logs, contadores e packet capture.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Aplicar policy as code para bloquear padrões perigosos."
      },
      {
        "name": "Vazamento de token em curl verbose, logs e pcaps.",
        "description": "Risco relacionado à aula 9.8 — Troubleshooting de políticas com logs, contadores e packet capture.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Criar runbooks de evidência por tecnologia."
      },
      {
        "name": "Movimento lateral facilitado por exceção sem expiração.",
        "description": "Risco relacionado à aula 9.8 — Troubleshooting de políticas com logs, contadores e packet capture.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisar regras criadas durante incidentes."
      },
      {
        "name": "Egress irrestrito usado para C2 ou exfiltração.",
        "description": "Risco relacionado à aula 9.8 — Troubleshooting de políticas com logs, contadores e packet capture.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Usar captures filtrados e criptografar armazenamento de evidências."
      },
      {
        "name": "Regra shadowed escondendo bloqueios ou permissões reais.",
        "description": "Risco relacionado à aula 9.8 — Troubleshooting de políticas com logs, contadores e packet capture.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Correlacionar logs de firewall, WAF, proxy, cloud e aplicação."
      }
    ],
    "mitigations": [
      "Usar change control e expiração automática de exceções.",
      "Aplicar policy as code para bloquear padrões perigosos.",
      "Criar runbooks de evidência por tecnologia.",
      "Revisar regras criadas durante incidentes.",
      "Usar captures filtrados e criptografar armazenamento de evidências.",
      "Correlacionar logs de firewall, WAF, proxy, cloud e aplicação."
    ],
    "goodPractices": [
      "Validar hipótese com evidência antes de alterar política.",
      "Usar janela controlada, registro de mudança, dono, justificativa e rollback.",
      "Preferir correção mínima em vez de ampliar origem, destino ou porta.",
      "Habilitar logs em regras críticas e enviar ao SIEM.",
      "Manter NTP e timezone padronizados para correlação de logs.",
      "Sanitizar Authorization, cookies, tokens, payloads e IPs sensíveis ao compartilhar evidências.",
      "Capturar pacotes somente com autorização e escopo definido.",
      "Converter aprendizado de incidente em runbook e teste preventivo."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Usar change control e expiração automática de exceções.",
      "Aplicar policy as code para bloquear padrões perigosos.",
      "Criar runbooks de evidência por tecnologia.",
      "Revisar regras criadas durante incidentes.",
      "Usar captures filtrados e criptografar armazenamento de evidências.",
      "Correlacionar logs de firewall, WAF, proxy, cloud e aplicação."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.8",
    "title": "Troubleshooting com matriz de fluxo, logs, contadores, state table e packet capture",
    "labType": "troubleshooting",
    "objective": "Diagnosticar bloqueios/permissões indevidas com método reproduzível e evidências antes de alterar regras.",
    "scenario": "API apresenta timeout para uma origem e 403 para outra.",
    "topology": "Cliente -> firewall/NAT -> WAF/LB -> backend -> logs/contadores/pcap/SIEM.",
    "architecture": "Cada controle produz evidência parcial; conclusão vem da correlação.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "curl",
      "nc/Test-NetConnection",
      "tcpdump/tshark",
      "ss/netstat",
      "show access-lists",
      "iptables/nft",
      "flow logs sintéticos"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não aplique mudanças em produção sem change, janela, backup e rollback.",
      "Não use any-any como solução de troubleshooting.",
      "Sanitize IPs, tokens, cookies, payloads e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir fluxo e horário",
        "instruction": "Preencha 5-tuple, usuário, horário e sintoma.",
        "expectedOutput": "Escopo claro.",
        "evidence": "Fluxo reproduzível.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Matriz de fluxo."
      },
      {
        "number": 2,
        "title": "Testar transporte",
        "instruction": "Teste porta e HTTP/TLS.",
        "expectedOutput": "Timeout/refused/TLS/HTTP interpretado.",
        "evidence": "Saída sanitizada.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "nc -vz api.lab.local 443\nTest-NetConnection api.lab.local -Port 443\ncurl -vkI https://api.lab.local/health"
      },
      {
        "number": 3,
        "title": "Ver listener no destino",
        "instruction": "Valide backend se autorizado.",
        "expectedOutput": "Serviço validado.",
        "evidence": "Listener/log backend.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "ss -tulpen | grep 443 || netstat -ano | findstr 443\njournalctl -u nginx --since \"10 minutes ago\""
      },
      {
        "number": 4,
        "title": "Contadores de regra",
        "instruction": "Veja hits em Cisco/Linux/firewall.",
        "expectedOutput": "Controle correto identificado.",
        "evidence": "Regra com hit ou ausência.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "show access-lists\nsudo iptables -vnL\nsudo nft list ruleset"
      },
      {
        "number": 5,
        "title": "Logs/state table",
        "instruction": "Classifique allow/deny/drop/reset/timeout/no-state.",
        "expectedOutput": "Causa provável.",
        "evidence": "Análise de logs.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "Tabela log | decisão | hipótese."
      },
      {
        "number": 6,
        "title": "Packet capture",
        "instruction": "Capture SYN/SYN-ACK/RST.",
        "expectedOutput": "Flags e retransmissões interpretadas.",
        "evidence": "PCAP sanitizado.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "sudo tcpdump -nn -i any \"host api.lab.local and tcp port 443\" -c 30\nsudo tshark -r evidencia.pcap -Y \"tcp.flags.syn==1 || tcp.flags.reset==1\""
      },
      {
        "number": 7,
        "title": "Correlacionar WAF/API",
        "instruction": "Use request ID.",
        "expectedOutput": "Camada 7 separada.",
        "evidence": "Correlação cliente/WAF/backend.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "curl -vkI https://api.lab.local/health -H \"X-Request-ID: lab-9-8-001\""
      },
      {
        "number": 8,
        "title": "Detectar shadowing/amplitude",
        "instruction": "Revise regras e exceções.",
        "expectedOutput": "Correção de menor privilégio.",
        "evidence": "Achado de política.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "Encontrar regra sombreada ou any-any sem dono."
      },
      {
        "number": 9,
        "title": "Correção mínima",
        "instruction": "Descreva mudança proposta.",
        "expectedOutput": "Sem regra ampla.",
        "evidence": "Plano de correção.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Change: causa, regra, alteração, teste, rollback."
      },
      {
        "number": 10,
        "title": "RCA sanitizado",
        "instruction": "Finalize linha do tempo e evidências.",
        "expectedOutput": "Aprendizado organizacional.",
        "evidence": "RCA final.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "RCA: impacto, causa, evidências, correção, prevenção."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "5-tuple e horário",
        "expected": "Origem, destino, porta, protocolo e horário.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Teste transporte",
        "expected": "Resultado de porta interpretado.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "command": "nc -vz api.lab.local 443"
      },
      {
        "check": "Logs/contadores",
        "expected": "Regra com hit ou ausência explicada.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Pcap/trace",
        "expected": "SYN/SYN-ACK/RST/timeout interpretado.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Correção mínima",
        "expected": "Sem any-any e com rollback.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Sem log no firewall",
        "probableCause": "Fluxo não passa por ele ou logging off.",
        "howToConfirm": "Rota/flow logs.",
        "fix": "Coletar no ponto certo/habilitar log."
      },
      {
        "symptom": "Allow no firewall e 502",
        "probableCause": "Problema após firewall.",
        "howToConfirm": "Request ID e logs HTTP.",
        "fix": "Investigar LB/backend."
      },
      {
        "symptom": "SYN sem SYN-ACK",
        "probableCause": "Drop, rota de retorno ou backend indisponível.",
        "howToConfirm": "Captura nos dois lados.",
        "fix": "Corrigir controle/rota/backend."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Matriz de fluxo",
      "nc/Test-NetConnection/curl",
      "Listener",
      "Contadores",
      "Logs/state table",
      "PCAP",
      "Request ID",
      "RCA"
    ],
    "questions": [
      "Por que timeout não é diagnóstico?",
      "Quando pcap é melhor que log?"
    ],
    "challenge": "Diagnostique timeout e 403 sem abrir any-any.",
    "solution": "Separe rede e L7; colete 5-tuple, logs, pcap, request ID e aplique correção mínima."
  },
  "mentorQuestions": [
    "Qual evidência provaria que o pacote chegou ao firewall correto?",
    "Qual diferença operacional existe entre timeout, refused, reset e 403?",
    "Como você provaria que uma regra temporária não abriu tráfego além do necessário?",
    {
      "type": "diagnóstico",
      "question": "Que evidência provaria que o firewall tomou a decisão correta neste cenário?",
      "hints": [
        "Pense em log, contador, state table, flow log ou packet capture.",
        "Separe ida, retorno e camada de aplicação."
      ],
      "expectedIdeas": [
        "matriz de fluxo",
        "log de regra",
        "contador",
        "state table",
        "pcap",
        "rollback"
      ],
      "explanation": "Firewall profissional é operado por evidências, não por palpites."
    }
  ],
  "quiz": [
    {
      "question": "Por que ping não é suficiente para diagnosticar uma falha HTTPS?",
      "options": [
        "Porque ICMP testa outro protocolo e não prova TCP/443, TLS, WAF nem aplicação",
        "Porque ping sempre usa TCP 443",
        "Porque ping testa certificado",
        "Porque ping valida CORS"
      ],
      "answer": 0,
      "explanation": "ICMP pode estar bloqueado ou permitido independentemente do serviço real. HTTPS envolve TCP/TLS/HTTP e intermediários."
    },
    {
      "question": "Um SYN sai da origem, mas não há SYN-ACK. Qual hipótese é plausível?",
      "options": [
        "CORS inválido",
        "Drop no caminho, rota de retorno ausente ou destino sem resposta",
        "JWT expirado",
        "Header HSTS ausente"
      ],
      "answer": 1,
      "explanation": "Sem SYN-ACK, o problema está antes da camada HTTP: caminho, política, retorno ou destino."
    },
    {
      "question": "Uma regra com contador incrementando prova que a aplicação funciona?",
      "options": [
        "Sim, sempre",
        "Não; prova apenas que tráfego bateu na regra",
        "Sim, se for TCP",
        "Sim, se houver NAT"
      ],
      "answer": 1,
      "explanation": "Contador mostra hit de regra, não sucesso de backend, TLS, HTTP ou aplicação."
    },
    {
      "question": "Em cloud, qual controle costuma ser stateless e exige atenção ao retorno?",
      "options": [
        "Security group",
        "NACL/NSG equivalente stateless",
        "JWT",
        "HSTS"
      ],
      "answer": 1,
      "explanation": "NACLs são frequentemente stateless e exigem regras compatíveis para ida e retorno."
    },
    {
      "question": "403 em uma API pública aponta mais provavelmente para qual camada?",
      "options": [
        "DNS físico",
        "WAF/API Gateway/aplicação/autorização",
        "Cabo rompido",
        "ARP local"
      ],
      "answer": 1,
      "explanation": "403 é resposta HTTP; a investigação deve olhar WAF, gateway, autorização e aplicação."
    },
    {
      "question": "Qual prática é mais segura durante troubleshooting?",
      "options": [
        "Abrir any-any para testar",
        "Desabilitar WAF inteiro",
        "Coletar evidência, alterar o mínimo necessário e documentar rollback",
        "Remover todos os logs para reduzir ruído"
      ],
      "answer": 2,
      "explanation": "Troubleshooting profissional preserva segurança, rastreabilidade e reversibilidade."
    }
  ],
  "flashcards": [
    {
      "front": "O que é matriz de fluxo?",
      "back": "Documento que define origem, destino, protocolo, porta, direção, justificativa, dono, validade e criticidade do tráfego."
    },
    {
      "front": "O que um contador de regra prova?",
      "back": "Prova que tráfego atingiu aquela regra, mas não prova sucesso da aplicação."
    },
    {
      "front": "O que packet capture ajuda a ver?",
      "back": "Pacotes reais, flags TCP, retransmissões, RST, ausência de resposta e efeitos de NAT."
    },
    {
      "front": "Timeout é causa raiz?",
      "back": "Não. Timeout é sintoma; a causa pode estar em rota, política, NAT, retorno, backend ou filtragem silenciosa."
    },
    {
      "front": "Por que logs precisam de horário sincronizado?",
      "back": "Sem NTP/timezone consistente, correlacionar firewall, WAF, proxy, cloud e aplicação fica inseguro."
    },
    {
      "front": "Qual risco de usar -k ou --insecure?",
      "back": "Ignorar validação TLS pode esconder MITM, certificado errado e problemas reais de cadeia de confiança."
    }
  ],
  "exercises": [
    {
      "title": "Classifique sintomas",
      "prompt": "Classifique timeout, refused, reset, 403 e 504 por camada provável e evidência inicial.",
      "expectedAnswer": "Timeout/rede-política-rota; refused/host-serviço; reset/firewall-aplicação; 403/WAF-autorização; 504/proxy-upstream-timeout."
    },
    {
      "title": "Monte uma matriz",
      "prompt": "Crie matriz para usuário acessar portal HTTPS em DMZ e portal acessar API interna TCP/8443.",
      "expectedAnswer": "Deve conter origem, destino, porta, direção, zona, dono, justificativa, validade, logs e rollback."
    },
    {
      "title": "Interprete uma captura",
      "prompt": "Explique o que significa ver SYN, retransmissões e nenhum SYN-ACK.",
      "expectedAnswer": "Indica ausência de resposta TCP; investigar drop, rota, retorno, destino ou controle intermediário."
    },
    {
      "title": "Evite uma má correção",
      "prompt": "Por que liberar 0.0.0.0/0 para RDP durante teste é perigoso?",
      "expectedAnswer": "Expõe administração à internet, pode ser explorado rapidamente e pode virar exceção esquecida."
    },
    {
      "id": "ex-9.8-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "API de pedidos inacessível a partir de um job interno",
    "scenario": "Um job em subnet privada precisa chamar https://api-pedidos.empresa.local/v1/status. O job recebe timeout. O time de aplicação afirma que a API está saudável. O firewall mostra zero hits na regra esperada. O security group permite saída TCP/443. A NACL foi alterada ontem. A route table aponta para firewall central antes do NAT Gateway.",
    "tasks": [
      "Listar hipóteses em ordem de probabilidade.",
      "Definir evidências necessárias.",
      "Propor testes seguros.",
      "Apontar correção mínima provável.",
      "Definir validação e rollback."
    ],
    "constraints": [
      "Não usar any-any.",
      "Não desativar firewall ou WAF.",
      "Não expor backend diretamente.",
      "Sanitizar logs e tokens."
    ]
  },
  "commentedSolution": {
    "summary": "A hipótese mais forte é que o tráfego não está chegando ao firewall da regra esperada ou está sendo bloqueado antes, possivelmente por NACL/rota alterada.",
    "steps": [
      "Confirmar DNS do endpoint e IP resolvido a partir do job.",
      "Executar teste TCP/443 a partir da origem real.",
      "Verificar route table: se o caminho vai ao firewall central, a regra esperada precisa estar nesse ponto ou a rota deve ser corrigida.",
      "Verificar NACL de ida e retorno, incluindo portas efêmeras.",
      "Consultar flow logs da interface/subnet no horário exato.",
      "Se o firewall esperado tem zero hits, não criar regra ampla nele; primeiro provar por onde o tráfego passa.",
      "Corrigir rota ou NACL mínima conforme evidência, validar com curl e logs, e registrar rollback."
    ],
    "why": "A ausência de hits na regra esperada é uma evidência forte de caminho incorreto ou bloqueio anterior. A alteração recente de NACL é pista relevante, mas deve ser provada com flow logs e teste de retorno."
  },
  "glossary": [
    {
      "term": "Flow log",
      "definition": "Registro de fluxos aceitos ou rejeitados em interfaces, subnets ou controles cloud."
    },
    {
      "term": "Packet capture",
      "definition": "Captura de pacotes reais para análise de flags, tráfego, retransmissões e respostas."
    },
    {
      "term": "Rule counter",
      "definition": "Contador que indica quantas vezes uma regra foi acionada."
    },
    {
      "term": "State table",
      "definition": "Tabela de conexões mantida por firewall stateful."
    },
    {
      "term": "RST",
      "definition": "Flag TCP usada para encerrar ou rejeitar uma conexão abruptamente."
    },
    {
      "term": "Timeout",
      "definition": "Sintoma em que não há resposta dentro do tempo esperado; não é causa raiz por si só."
    },
    {
      "term": "Correlation ID",
      "definition": "Identificador usado para rastrear uma requisição entre sistemas e logs."
    },
    {
      "term": "Shadowing",
      "definition": "Situação em que uma regra anterior impede que uma regra posterior seja aplicada."
    }
  ],
  "references": [
    "Cisco — fundamentos de ACL, logs e troubleshooting de conectividade",
    "AWS/Azure/GCP — documentação de flow logs, security groups/NSGs, NACLs e firewalls gerenciados",
    "Wireshark — análise de TCP, retransmissões e resets",
    "OWASP — logging, monitoring e segurança de APIs",
    "NIST — princípios de monitoramento, auditoria e controle de acesso em redes"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e incident response",
      "reason": "Logs, traces, métricas e runbooks aparecem como prática operacional em plataforma."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Autorização e auditoria",
      "reason": "403, API Gateway e logs de autorização dependem de identidade e política."
    }
  ],
  "progressRules": {
    "requiredToComplete": [
      "readContent",
      "completeLab",
      "passQuiz",
      "submitChallenge"
    ],
    "minimumQuizScore": 70,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "9.9"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "labMarkedDone",
        "practicalExerciseDone"
      ]
    }
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
