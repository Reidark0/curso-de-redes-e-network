export const lesson1506 = {
  "id": "15.6",
  "moduleId": "m15",
  "order": 6,
  "title": "Troubleshooting TCP, UDP, portas e serviços",
  "subtitle": "Como diagnosticar timeout, refused, reset, UDP sem resposta, portas, processos, load balancers e saúde real de serviços — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "180-240 min",
  "estimatedStudyTimeMinutes": 240,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "troubleshooting",
    "TCP",
    "UDP",
    "portas",
    "serviços",
    "SYN",
    "RST",
    "timeout",
    "netcat",
    "ss",
    "tcpdump",
    "load balancer",
    "health check",
    "firewall stateful",
    "cloud networking",
    "DevSecOps",
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
      "reason": "Define método, hipóteses, escopo, mitigação e RCA."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Ensina coleta de evidências, baseline e linha do tempo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.4",
      "reason": "TCP e UDP dependem de IPv4, rota, gateway e retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.5",
      "reason": "A investigação de serviço normalmente começa após DNS resolver corretamente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.6",
      "reason": "Load balancers, health checks e TLS interferem diretamente no diagnóstico de serviços publicados."
    }
  ],
  "objectives": [
    "Diferenciar timeout, connection refused, reset, porta aberta e falha de aplicação.",
    "Interpretar o handshake TCP como evidência de transporte e caminho de retorno.",
    "Diagnosticar UDP com testes de aplicação, captura e logs, sem esperar handshake inexistente.",
    "Validar se o processo escuta no IP e porta corretos no host, container ou backend.",
    "Relacionar firewall stateful, NAT, load balancer e health check com sintomas de transporte.",
    "Criar uma matriz origem-destino-protocolo-porta-evidência para RCA e prevenção.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um timeout em TCP/443, o aluno propõe hipóteses distintas para descarte, retorno quebrado, firewall, LB e backend.",
    "Dado um RST imediato, o aluno diferencia porta fechada, reset por serviço, reset por firewall e reset por proxy.",
    "Dado UDP sem resposta, o aluno escolhe teste de protocolo e evidência adequada em vez de concluir bloqueio automaticamente.",
    "Dado um serviço ativo localmente, o aluno verifica binding, porta, interface e política antes de culpar a rede.",
    "Dado um HTTP 503 em load balancer, o aluno valida health check, target group, porta real, SG/NSG e logs.",
    "Dado o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Depois que o nome resolve e o IP parece alcançável, muitos incidentes continuam sem solução porque o problema real está na camada de transporte ou no próprio serviço. É aqui que aparecem frases como: “o servidor responde ping, mas a aplicação não abre”, “a porta está liberada, mas dá timeout”, “funciona via TCP, mas falha via UDP”, “o balanceador está saudável, mas o backend recusa conexão” ou “o firewall não está bloqueando, porém o cliente recebe reset”.</p>\n  <p>A motivação desta aula é ensinar você a diagnosticar <strong>TCP, UDP, portas e serviços</strong> sem confundir sintomas parecidos. Ping não prova que TCP/443 funciona. Porta aberta não prova que a aplicação está saudável. Conexão aceita não prova que o protocolo de aplicação respondeu corretamente. UDP sem resposta não significa necessariamente bloqueio. Reset não é igual a timeout. E “porta liberada” pode significar coisas diferentes para rede, firewall, sistema operacional, serviço, proxy, load balancer e Kubernetes.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> em troubleshooting profissional, a pergunta não é apenas “a porta está aberta?”. A pergunta correta é: <em>qual origem, qual destino, qual protocolo de transporte, qual porta, qual estado da conexão, qual resposta do serviço, qual caminho de retorno, qual política stateful e qual evidência confirma isso?</em></div>\n  <p>Em cibersegurança, essa aula também é essencial. Muitas investigações de indisponibilidade, exfiltração, beaconing, varredura interna, bloqueios de egress e falso positivo de firewall dependem de entender bem o comportamento de TCP, UDP e portas.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>A internet foi construída com uma separação importante: o IP entrega datagramas entre hosts, mas diferentes aplicações precisam conversar de formas diferentes. Algumas precisam de conexão confiável, ordenação, retransmissão e controle de fluxo. Outras precisam de mensagens simples, rápidas, com baixa sobrecarga e tolerância a perda. Por isso surgiram protocolos de transporte como TCP e UDP.</p>\n  <p>O TCP se consolidou como transporte confiável para aplicações como HTTP, SSH, SMTP, bancos de dados e muitos protocolos corporativos. Ele criou a ideia de conexão, handshake, estados, confirmação, retransmissão, janela e encerramento. O UDP, por outro lado, manteve uma proposta mínima: enviar mensagens entre aplicações com pouco mecanismo no transporte, deixando confiabilidade, controle de perda ou confirmação para a aplicação quando necessário.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>IP:</strong> entrega datagramas entre redes, sem saber qual aplicação está ouvindo.</div><div class=\"timeline-item\"><strong>Portas:</strong> permitem distinguir serviços diferentes no mesmo host.</div><div class=\"timeline-item\"><strong>TCP:</strong> adiciona conexão, confiabilidade, estados e controle.</div><div class=\"timeline-item\"><strong>UDP:</strong> oferece datagramas simples, usado por DNS, VoIP, streaming, QUIC e telemetria.</div><div class=\"timeline-item\"><strong>Cloud e Kubernetes:</strong> adicionam load balancers, health checks, proxies, NAT, service meshes e políticas dinâmicas.</div></div>\n  <p>O troubleshooting moderno precisa interpretar essa história no ambiente atual: um pacote TCP pode atravessar firewall stateful, NAT, proxy, WAF, load balancer, ingress controller e sidecar antes de chegar ao processo. Um datagrama UDP pode ser descartado sem resposta visível. Um serviço pode aceitar conexão e falhar apenas depois do handshake de aplicação.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema desta aula é diagnosticar quando a camada 3 ou DNS aparentemente funcionam, mas o serviço continua inacessível, instável ou respondendo incorretamente.</p>\n  <p>Sintomas comuns:</p>\n  <ul>\n    <li>o IP responde ping, mas TCP/443 dá timeout;</li>\n    <li>o cliente recebe <code>connection refused</code> imediatamente;</li>\n    <li>o handshake TCP completa, mas a aplicação retorna erro;</li>\n    <li>o firewall registra <code>allow</code>, mas o serviço não responde;</li>\n    <li>o load balancer aponta backend unhealthy;</li>\n    <li>o cliente recebe TCP reset após alguns segundos;</li>\n    <li>UDP/53, UDP/500 ou UDP/4500 não retorna resposta;</li>\n    <li>um serviço escuta em <code>127.0.0.1</code>, mas não em <code>0.0.0.0</code> ou no IP da interface;</li>\n    <li>a aplicação funciona localmente, mas não por NAT, proxy, LB ou Ingress;</li>\n    <li>o serviço está escutando, porém a resposta vem de uma versão antiga ou instância errada.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha:</strong> “porta aberta” pode significar apenas que algum componente respondeu ao handshake. Isso não garante que o serviço correto, na versão correta, no backend correto, com protocolo correto, esteja saudável.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset</h3>\n  <p><strong>Sintoma observado:</strong> O FQDN resolve e o destino responde ping, mas a aplicação falha: de alguns clientes dá timeout; no servidor local aparece connection refused.</p>\n  <p><strong>Impacto operacional:</strong> Equipes discutem firewall, mas parte da falha está no serviço ouvindo na interface errada e parte em política intermediária.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente → DNS → rota → firewall/LB → porta TCP/UDP → processo → resposta</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>11:00: nova versão mudou bind address</li><li>11:05: health check passa no localhost</li><li>11:10: clientes externos recebem timeout</li><li>11:20: conexão local recebe refused</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Serviço não escuta</td><td>Refused local</td><td>ss/netstat/Get-NetTCPConnection</td><td>Alta</td></tr><tr><td>Binding errado</td><td>Escuta em 127.0.0.1, não em 0.0.0.0/IP privado</td><td>ss -lntp</td><td>Alta</td></tr><tr><td>Firewall bloqueia</td><td>Timeout remoto</td><td>logs/flow/session table</td><td>Alta</td></tr><tr><td>UDP sem resposta</td><td>Não há handshake</td><td>tcpdump/timeout controlado</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>O troubleshooting de transporte amadurece quando você deixa de usar um único teste e passa a montar uma cadeia de evidências. O caminho profissional é separar conectividade IP, resolução de nomes, transporte, política, processo local, protocolo de aplicação e observabilidade.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Nível</th><th>Pergunta madura</th><th>Evidência típica</th><th>Erro comum</th></tr></thead>\n    <tbody>\n      <tr><td>IP</td><td>O destino é roteável e há retorno?</td><td>Rota, traceroute, flow logs.</td><td>Assumir que ping bloqueado significa host fora.</td></tr>\n      <tr><td>Porta TCP</td><td>O SYN recebe SYN-ACK, RST ou nada?</td><td>pcap, tcpdump, netcat, logs de firewall.</td><td>Chamar timeout e refused de mesma coisa.</td></tr>\n      <tr><td>Porta UDP</td><td>A aplicação responde ou há ICMP/timeout?</td><td>consulta específica, pcap, log do servidor.</td><td>Esperar handshake em UDP.</td></tr>\n      <tr><td>Serviço local</td><td>Há processo escutando no IP e porta corretos?</td><td><code>ss</code>, <code>netstat</code>, systemd, container logs.</td><td>Ver serviço ativo, mas escutando só em loopback.</td></tr>\n      <tr><td>Política</td><td>Firewall, SG/NSG, NACL, proxy ou LB permitem ida e volta?</td><td>logs allow/deny, regras efetivas, flow logs.</td><td>Validar apenas inbound e esquecer outbound/retorno.</td></tr>\n      <tr><td>Aplicação</td><td>O protocolo esperado respondeu de forma válida?</td><td><code>curl</code>, headers, status code, logs da aplicação.</td><td>Confundir conexão TCP com aplicação saudável.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Troubleshooting TCP, UDP, portas e serviços</strong> é o processo de provar, por evidência, se uma aplicação consegue estabelecer comunicação no protocolo de transporte esperado e se o serviço correto responde conforme o protocolo de aplicação.</p>\n  <p>Essa investigação separa alguns estados fundamentais:</p>\n  <ul>\n    <li><strong>Porta fechada:</strong> o destino ou algum equipamento responde ativamente recusando, normalmente com RST em TCP ou ICMP em alguns cenários UDP.</li>\n    <li><strong>Timeout:</strong> o cliente não recebe resposta útil no tempo esperado. Pode ser descarte silencioso, caminho de retorno quebrado, firewall, perda, serviço travado ou backend inacessível.</li>\n    <li><strong>Conexão estabelecida:</strong> no TCP, o handshake ocorreu, mas isso ainda não prova saúde de aplicação.</li>\n    <li><strong>Reset:</strong> uma das pontas encerrou abruptamente a conexão TCP. Pode ser serviço, firewall, proxy, LB ou aplicação.</li>\n    <li><strong>UDP sem resposta:</strong> pode ser normal para alguns protocolos ou indicar bloqueio/perda; exige teste específico da aplicação.</li>\n    <li><strong>Serviço errado:</strong> há algo escutando na porta, mas não é a aplicação/protocolo esperado.</li>\n  </ul>\n  <div class=\"callout callout--info\"><strong>Regra profissional:</strong> diagnostique por tupla: origem, IP origem, porta origem, destino, IP destino, porta destino, protocolo, horário, caminho, política e resposta observada.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>No TCP, a conexão normalmente começa com o handshake de três etapas: SYN, SYN-ACK e ACK. Se o cliente envia SYN e recebe SYN-ACK, há pelo menos um caminho funcional de ida e volta até um componente que aceita aquela porta. Se recebe RST, alguém recusou ativamente. Se não recebe nada, há timeout: o pacote pode ter sido descartado no caminho, o retorno pode estar quebrado ou o destino pode não responder.</p>\n  <p>Depois do handshake, entram dados de aplicação. Em HTTPS, por exemplo, ainda haverá negociação TLS e depois HTTP. Portanto, uma captura pode mostrar TCP estabelecido e, ainda assim, a aplicação falhar por certificado, SNI, versão TLS, autenticação, rota no proxy, header, backend errado ou erro interno.</p>\n  <p>No UDP, não existe conexão no transporte. O cliente envia um datagrama e espera que a aplicação responda se o protocolo tiver resposta. DNS normalmente responde; syslog pode não responder; streaming e VoIP podem tolerar perdas; QUIC cria sua própria lógica sobre UDP. Por isso, testar UDP exige falar o protocolo certo ou observar pacotes e logs.</p>\n  <p>Portas são identificadores de serviço no transporte. O mesmo host pode ter SSH em TCP/22, HTTPS em TCP/443, DNS em UDP/TCP 53 e uma aplicação interna em TCP/8443. Firewalls stateful acompanham estados de conexão; firewalls stateless avaliam pacotes de forma mais isolada. NAT altera endereços e portas, exigindo atenção à tradução e ao caminho de retorno.</p>\n  <div class=\"callout callout--warning\"><strong>Detalhe crítico:</strong> em Linux, um processo escutando em <code>127.0.0.1:8080</code> só aceita conexões locais. Para aceitar de outras máquinas, precisa escutar no IP da interface ou em <code>0.0.0.0</code>, desde que políticas permitam.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Em uma arquitetura corporativa moderna, um teste de porta raramente vai direto do cliente ao processo. O fluxo pode passar por DNS, proxy corporativo, firewall, NAT, roteador, VPN, security group, load balancer, WAF, ingress controller, service mesh, sidecar, kube-proxy e finalmente pelo container ou processo.</p>\n  <p>Para diagnosticar, divida a arquitetura em pontos de observação:</p>\n  <ol>\n    <li><strong>Origem:</strong> cliente, IP, porta efêmera, interface, DNS usado e rota.</li>\n    <li><strong>Controle local:</strong> firewall do host, EDR, proxy, tabela de rotas e cache.</li>\n    <li><strong>Rede intermediária:</strong> ACL, firewall, NAT, VPN, LB, WAF, SG/NSG/NACL e logs.</li>\n    <li><strong>Destino:</strong> IP correto, porta correta, processo escutando, backlog, CPU, memória, limites e logs.</li>\n    <li><strong>Aplicação:</strong> protocolo, TLS, autenticação, versão, rota interna, dependências e health checks.</li>\n  </ol>\n  <p>Essa visão evita a frase perigosa “a rede está ok” sem prova. Rede, transporte e aplicação só estão ok quando cada trecho tem evidência coerente com a hipótese.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Imagine um prédio empresarial. O endereço do prédio é o IP. O nome do prédio no mapa é o DNS. A porta da sala é a porta TCP/UDP. O recepcionista é o firewall ou load balancer. O funcionário dentro da sala é o serviço.</p>\n  <p>Se você chega ao endereço, isso não significa que a sala está aberta. Se a porta da sala abre, isso não significa que o funcionário certo está lá. Se alguém atende, isso não significa que ele entende o idioma correto. Se ninguém responde, talvez a porta esteja trancada, talvez o recepcionista tenha barrado, talvez você esteja no prédio errado, talvez o funcionário esteja em reunião, talvez o elevador de volta esteja quebrado.</p>\n  <div class=\"callout callout--info\"><strong>Tradução técnica:</strong> ping é chegar ao prédio; TCP handshake é abrir a porta; TLS/HTTP é conversar no idioma correto; log da aplicação é confirmar que o funcionário certo atendeu.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Um usuário diz que não consegue acessar <code>https://portal.lab.local</code>. O DNS resolve para <code>10.10.20.50</code>. O ping responde. Mesmo assim, o navegador dá erro de timeout.</p>\n  <p>Uma investigação amadora diria: “ping responde, então não é rede”. Uma investigação profissional faz a cadeia:</p>\n  <ol>\n    <li>Confirmar resolução DNS para o IP esperado.</li>\n    <li>Testar TCP/443 a partir da mesma origem.</li>\n    <li>Ver se o SYN recebe SYN-ACK, RST ou nada.</li>\n    <li>Validar regras de firewall entre origem e destino.</li>\n    <li>Ver no servidor se há processo escutando em <code>0.0.0.0:443</code> ou no IP correto.</li>\n    <li>Testar TLS e HTTP com ferramenta adequada.</li>\n    <li>Correlacionar horário com logs do serviço.</li>\n  </ol>\n  <p>Resultado: o serviço estava ativo, mas escutava apenas em <code>127.0.0.1:443</code>. Localmente funcionava; remotamente nunca aceitaria conexão. A correção não era rota nem DNS, mas binding do serviço.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Uma aplicação financeira interna fica indisponível para uma filial. O datacenter central registra tráfego chegando no firewall, mas a filial recebe timeout. O time de rede diz que a regra está permitida. O time de servidores diz que o serviço está de pé. O time de aplicação diz que não recebeu requisições.</p>\n  <p>O troubleshooting maduro monta uma matriz:</p>\n  <ul>\n    <li>origem da filial → firewall: tráfego chega;</li>\n    <li>firewall → servidor: SYN encaminhado;</li>\n    <li>servidor → firewall: SYN-ACK sai por rota alternativa;</li>\n    <li>firewall stateful: não vê retorno no mesmo caminho e descarta estado;</li>\n    <li>cliente: timeout.</li>\n  </ul>\n  <p>A causa não era porta fechada. Era <strong>roteamento assimétrico</strong> em um fluxo TCP stateful. A solução envolveu corrigir rota de retorno, registrar evidência em RCA e criar teste preventivo para mudanças de rota.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Uma API em cloud está atrás de um Application Load Balancer. O DNS resolve corretamente. O certificado TLS é válido. O cliente recebe HTTP 503. O erro não é DNS nem necessariamente firewall.</p>\n  <p>A investigação verifica:</p>\n  <ol>\n    <li>listener do load balancer em TCP/443;</li>\n    <li>regra do listener para o target group correto;</li>\n    <li>health check usado pelo LB;</li>\n    <li>security group do LB permitindo entrada dos clientes;</li>\n    <li>security group dos backends permitindo tráfego vindo do LB;</li>\n    <li>porta real do container ou VM;</li>\n    <li>logs do LB e da aplicação;</li>\n    <li>código de resposta do backend no health check.</li>\n  </ol>\n  <p>Resultado: o target group esperava health check em <code>/health</code> na porta 8080, mas a aplicação passou a expor <code>/ready</code>. O LB ficou sem targets saudáveis e retornava 503. A correção foi alinhar contrato de health check, pipeline e documentação.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, problemas de TCP/UDP e portas devem ser prevenidos antes de produção. Pipelines podem validar se uma aplicação realmente expõe a porta declarada, se o container escuta no endereço correto, se o readiness probe corresponde ao endpoint real, se o manifesto Kubernetes publica o Service na porta correta e se a política de rede permite apenas fluxos necessários.</p>\n  <p>Exemplos de controles:</p>\n  <ul>\n    <li>teste automatizado que sobe o container e valida porta de escuta;</li>\n    <li>teste de contrato para health check;</li>\n    <li>policy as code bloqueando <code>0.0.0.0/0</code> em portas administrativas;</li>\n    <li>validação de Security Group/NSG no pull request;</li>\n    <li>teste sintético pós-deploy a partir de origem semelhante ao usuário real;</li>\n    <li>rollback automático quando LB health check falha após mudança.</li>\n  </ul>\n  <div class=\"callout callout--success\"><strong>Boa prática:</strong> transformar descobertas de troubleshooting em testes de pipeline. O incidente de hoje deve virar controle preventivo amanhã.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Em segurança, portas e serviços são parte da superfície de ataque. Um serviço de administração exposto em TCP/22, TCP/3389, TCP/5985 ou TCP/8443 pode ser legítimo em rede interna controlada, mas perigoso se exposto à internet ou a segmentos amplos. Ao mesmo tempo, durante um incidente, abrir temporariamente “qualquer origem para qualquer destino” para testar conectividade cria risco real.</p>\n  <p>Um troubleshooting seguro deve:</p>\n  <ul>\n    <li>testar apenas sistemas autorizados;</li>\n    <li>evitar varredura agressiva em produção;</li>\n    <li>registrar origem, destino, porta, horário e justificativa;</li>\n    <li>preferir janelas controladas para mudanças;</li>\n    <li>usar regras temporárias com expiração;</li>\n    <li>correlacionar logs de conexão com SIEM;</li>\n    <li>não confundir “porta aberta” com “serviço seguro”.</li>\n  </ul>\n  <p>Também é importante para detecção: muitos malwares usam conexões TCP persistentes, beaconing periódico, UDP para evasão ou portas incomuns para C2. Flow logs e logs de firewall ajudam a identificar padrões, mas precisam ser interpretados com contexto de aplicação.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra a cadeia de investigação: cliente, DNS resolvido, transporte TCP/UDP, políticas, load balancer, serviço, logs e hipóteses de resposta.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Diagrama de troubleshooting TCP UDP portas e serviços\">\n    <svg viewBox=\"0 0 980 560\" class=\"network-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-15-6-content-diagram-1-title svg-15-6-content-diagram-1-desc\">\n      <title id=\"svg-15-6-content-diagram-1-title\">Troubleshooting TCP, UDP, portas e serviços</title>\n      <desc id=\"svg-15-6-content-diagram-1-desc\">Diagrama pedagógico da aula 15.6, Troubleshooting TCP, UDP, portas e serviços, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-tcpudp\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-marker\" />\n        </marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n      <text x=\"110\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Cliente</text>\n      <text x=\"110\" y=\"102\" text-anchor=\"middle\" class=\"svg-caption\">origem + porta efêmera</text>\n\n      <rect x=\"250\" y=\"40\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--dns\" />\n      <text x=\"325\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">DNS OK?</text>\n      <text x=\"325\" y=\"102\" text-anchor=\"middle\" class=\"svg-caption\">nome → IP</text>\n\n      <rect x=\"465\" y=\"40\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--transport\" />\n      <text x=\"550\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">TCP/UDP</text>\n      <text x=\"550\" y=\"102\" text-anchor=\"middle\" class=\"svg-caption\">SYN, RST, timeout</text>\n\n      <rect x=\"700\" y=\"40\" width=\"220\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--policy\" />\n      <text x=\"810\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Políticas</text>\n      <text x=\"810\" y=\"102\" text-anchor=\"middle\" class=\"svg-caption\">FW · SG · NSG · NAT</text>\n\n      <rect x=\"130\" y=\"210\" width=\"200\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--lb\" />\n      <text x=\"230\" y=\"246\" text-anchor=\"middle\" class=\"svg-title\">LB / Proxy / WAF</text>\n      <text x=\"230\" y=\"273\" text-anchor=\"middle\" class=\"svg-caption\">listener + health check</text>\n\n      <rect x=\"420\" y=\"210\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--server\" />\n      <text x=\"515\" y=\"246\" text-anchor=\"middle\" class=\"svg-title\">Servidor</text>\n      <text x=\"515\" y=\"273\" text-anchor=\"middle\" class=\"svg-caption\">processo escutando?</text>\n\n      <rect x=\"700\" y=\"210\" width=\"200\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--app\" />\n      <text x=\"800\" y=\"246\" text-anchor=\"middle\" class=\"svg-title\">Aplicação</text>\n      <text x=\"800\" y=\"273\" text-anchor=\"middle\" class=\"svg-caption\">TLS · HTTP · protocolo</text>\n\n      <rect x=\"55\" y=\"395\" width=\"185\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"147\" y=\"427\" text-anchor=\"middle\" class=\"svg-title\">pcap</text>\n      <text x=\"147\" y=\"452\" text-anchor=\"middle\" class=\"svg-caption\">SYN/SYN-ACK/RST</text>\n\n      <rect x=\"300\" y=\"395\" width=\"185\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"392\" y=\"427\" text-anchor=\"middle\" class=\"svg-title\">logs</text>\n      <text x=\"392\" y=\"452\" text-anchor=\"middle\" class=\"svg-caption\">firewall · LB · app</text>\n\n      <rect x=\"545\" y=\"395\" width=\"185\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"637\" y=\"427\" text-anchor=\"middle\" class=\"svg-title\">métricas</text>\n      <text x=\"637\" y=\"452\" text-anchor=\"middle\" class=\"svg-caption\">latência · erros · fila</text>\n\n      <rect x=\"790\" y=\"395\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--siem\" />\n      <text x=\"865\" y=\"427\" text-anchor=\"middle\" class=\"svg-title\">RCA</text>\n      <text x=\"865\" y=\"452\" text-anchor=\"middle\" class=\"svg-caption\">causa + prevenção</text>\n\n      <line x1=\"190\" y1=\"85\" x2=\"250\" y2=\"85\" class=\"svg-link\" marker-end=\"url(#arrow-tcpudp)\" />\n      <line x1=\"400\" y1=\"85\" x2=\"465\" y2=\"85\" class=\"svg-link\" marker-end=\"url(#arrow-tcpudp)\" />\n      <line x1=\"635\" y1=\"85\" x2=\"700\" y2=\"85\" class=\"svg-link\" marker-end=\"url(#arrow-tcpudp)\" />\n      <path d=\"M810 130 C810 170, 230 170, 230 210\" class=\"svg-link\" marker-end=\"url(#arrow-tcpudp)\" />\n      <line x1=\"330\" y1=\"258\" x2=\"420\" y2=\"258\" class=\"svg-link\" marker-end=\"url(#arrow-tcpudp)\" />\n      <line x1=\"610\" y1=\"258\" x2=\"700\" y2=\"258\" class=\"svg-link\" marker-end=\"url(#arrow-tcpudp)\" />\n      <path d=\"M515 305 C515 345, 392 345, 392 395\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-tcpudp)\" />\n      <path d=\"M550 130 C550 345, 147 345, 147 395\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-tcpudp)\" />\n      <path d=\"M800 305 C800 350, 637 350, 637 395\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-tcpudp)\" />\n      <line x1=\"730\" y1=\"435\" x2=\"790\" y2=\"435\" class=\"svg-link\" marker-end=\"url(#arrow-tcpudp)\" />\n      <text x=\"490\" y=\"525\" text-anchor=\"middle\" class=\"svg-caption\">Diagnóstico maduro separa DNS, transporte, política, processo local, aplicação e evidências.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um dossiê de investigação de serviço. Você vai analisar um incidente em que o DNS resolve corretamente e o destino é roteável, mas o acesso ao serviço falha de formas diferentes: timeout, refused, reset, UDP sem resposta e erro de aplicação.</p>\n  <p>O objetivo é construir uma matriz de evidências que separe transporte, política, processo local e aplicação.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset. <strong>Causa provável a ser comprovada ou descartada:</strong> Combinação de serviço bindado em localhost, health check errado, firewall stateful e portas diferentes entre cliente e LB/backend.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam interpretação de handshake TCP, UDP, portas, estado de firewall, binding de serviço, load balancer e diferença entre conectividade e saúde de aplicação.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio apresenta uma API publicada por load balancer que alterna entre timeout, reset e HTTP 503 conforme origem. Você deverá montar uma hipótese por evidência e propor correção segura.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como separar SYN sem resposta, RST, conexão estabelecida, falha TLS, health check quebrado, backend errado e política stateful incompleta.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Nesta aula, você aprendeu que troubleshooting de portas e serviços não é apenas testar “aberto ou fechado”. É interpretar comportamento de transporte e aplicação com evidências.</p>\n  <ul>\n    <li>TCP usa conexão e estados; UDP não tem handshake no transporte;</li>\n    <li>timeout, refused e reset apontam para hipóteses diferentes;</li>\n    <li>porta aberta não prova aplicação saudável;</li>\n    <li>serviço ativo pode estar escutando no endereço errado;</li>\n    <li>firewall stateful depende de caminho de ida e volta coerente;</li>\n    <li>load balancers adicionam listener, target group, health check e logs;</li>\n    <li>troubleshooting seguro evita liberações amplas e mudanças sem rollback;</li>\n    <li>cada incidente deve virar teste preventivo, runbook ou guardrail.</li>\n  </ul>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Combinação de serviço bindado em localhost, health check errado, firewall stateful e portas diferentes entre cliente e LB/backend..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>15.7 — Troubleshooting firewall, ACL, NAT e políticas</strong>, você vai aprofundar o diagnóstico dos componentes que mais interferem no tráfego TCP/UDP: regras, ordem, estado, tradução, retorno, logs e exceções temporárias.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 4",
      "Camada 7",
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Transporte",
      "Aplicação",
      "Internet"
    ],
    "relatedProtocols": [
      "TCP",
      "UDP",
      "ICMP",
      "DNS",
      "TLS",
      "HTTP",
      "QUIC",
      "IPsec",
      "SSH",
      "SMTP"
    ],
    "relatedConcepts": [
      "Handshake",
      "SYN",
      "SYN-ACK",
      "ACK",
      "RST",
      "FIN",
      "Timeout",
      "Porta",
      "Socket",
      "Listen",
      "Binding",
      "Porta efêmera",
      "Stateful firewall",
      "NAT",
      "Load balancer",
      "Health check",
      "Backlog",
      "Rota de retorno"
    ],
    "ports": [
      "TCP/22",
      "TCP/80",
      "TCP/443",
      "UDP/TCP 53",
      "UDP/123",
      "UDP/500",
      "UDP/4500",
      "TCP/5432",
      "TCP/3306",
      "TCP/8080",
      "TCP/8443"
    ]
  },
  "lab": {
    "id": "lab-15.6",
    "title": "Caso guiado: DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "O FQDN resolve e o destino responde ping, mas a aplicação falha: de alguns clientes dá timeout; no servidor local aparece connection refused. Impacto: Equipes discutem firewall, mas parte da falha está no serviço ouvindo na interface errada e parte em política intermediária. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente → DNS → rota → firewall/LB → porta TCP/UDP → processo → resposta",
    "architecture": "Arquitetura investigada: Cliente → DNS → rota → firewall/LB → porta TCP/UDP → processo → resposta. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
      "Docker local opcional",
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
        "title": "Definir a tupla",
        "instruction": "Registre origem, destino, protocolo, porta, ambiente e horário.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Tupla 5-tuple documentada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Classificar sintoma",
        "instruction": "Separe timeout, refused, reset, TLS error e erro HTTP.",
        "command": "Test-NetConnection app.empresa.local -Port 8443; netstat -ano | findstr :8443; Get-NetTCPConnection -LocalPort 8443",
        "expectedOutput": "Sintoma técnico preciso.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Verificar listener",
        "instruction": "No destino/backend, confirme porta, processo e bind address.",
        "command": "ss -lntup; curl -v telnet://app.empresa.local:8443; sudo tcpdump -ni any host <cliente> and port 8443",
        "expectedOutput": "Serviço escutando no IP correto.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Testar do próprio host",
        "instruction": "Teste localhost, IP privado e FQDN para separar binding e rede.",
        "command": "Verificar health checks, listener frontend/backend, sessão stateful e logs deny/drop",
        "expectedOutput": "Diferença entre local e remoto.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Capturar pacotes",
        "instruction": "Observe SYN, SYN-ACK, RST ou ausência de resposta.",
        "command": "Verificar health checks, listener frontend/backend, sessão stateful e logs deny/drop",
        "expectedOutput": "Evidência de transporte.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Validar firewall/LB",
        "instruction": "Correlacione logs e health checks com a mesma tupla.",
        "command": "Verificar health checks, listener frontend/backend, sessão stateful e logs deny/drop",
        "expectedOutput": "Política e balanceador coerentes.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Corrigir uma variável",
        "instruction": "Ajuste bind, listener, regra ou health check, não tudo ao mesmo tempo.",
        "command": "Verificar health checks, listener frontend/backend, sessão stateful e logs deny/drop",
        "expectedOutput": "Correção isolada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Documentar RCA",
        "instruction": "Explique por que o monitoramento não detectou o binding errado.",
        "command": "Verificar health checks, listener frontend/backend, sessão stateful e logs deny/drop",
        "expectedOutput": "Ação preventiva para health checks reais.",
        "explanation": "Este passo obriga o aluno a transformar o caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Listener correto",
        "command": "ss -lntup/netstat",
        "expected": "Porta escutando no IP esperado.",
        "ifFails": "Corrigir configuração da aplicação."
      },
      {
        "check": "Handshake completo",
        "command": "tcpdump/Wireshark",
        "expected": "SYN, SYN-ACK, ACK.",
        "ifFails": "Investigar firewall, host ou rota."
      },
      {
        "check": "Health check representativo",
        "command": "Painel do LB",
        "expected": "Checagem usa mesma porta/caminho relevante.",
        "ifFails": "Ajustar health check para refletir usuário real."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Connection refused",
        "probableCause": "Host respondeu RST por ausência de listener",
        "howToConfirm": "tcpdump mostra RST",
        "fix": "Subir serviço ou corrigir bind."
      },
      {
        "symptom": "Timeout",
        "probableCause": "Pacote some ou resposta bloqueada",
        "howToConfirm": "logs e captura nos dois lados",
        "fix": "Corrigir política/caminho/retorno."
      },
      {
        "symptom": "UDP inconclusivo",
        "probableCause": "UDP não tem handshake",
        "howToConfirm": "Usar logs de aplicação e captura",
        "fix": "Validar payload/resposta, não só porta."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "tupla do fluxo",
      "ss/netstat",
      "Test-NetConnection/curl",
      "tcpdump/Wireshark",
      "logs de firewall",
      "health check LB",
      "config de bind"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Explique por que “porta fechada”, “serviço fora”, “firewall bloqueando” e “aplicação quebrada” não são a mesma coisa.",
    "solution": "A resposta profissional usa o comportamento do TCP: refused/RST indica resposta ativa sem listener ou rejeição; timeout indica ausência de resposta; handshake completo desloca a análise para TLS/HTTP/aplicação. Listener e logs intermediários fecham o diagnóstico."
  },
  "exercises": [
    {
      "id": "ex15.6.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.6.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.6.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.6.p1.1",
      "type": "diagnóstico",
      "q": "No caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.6.p1.2",
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
      "id": "q15.6.p1.3",
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
      "id": "q15.6.p1.4",
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
      "question": "Qual evidência indica que um handshake TCP inicial foi aceito?",
      "options": [
        "SYN seguido de SYN-ACK",
        "Ping respondendo",
        "DNS com resposta A",
        "HTTP 404"
      ],
      "correctAnswer": 0,
      "explanation": "SYN seguido de SYN-ACK indica que algum componente aceitou iniciar a conexão TCP."
    },
    {
      "question": "O que um RST TCP normalmente indica em troubleshooting?",
      "options": [
        "Recusa ou encerramento ativo da conexão",
        "DNS inexistente",
        "TTL expirado no DNS",
        "Sempre perda física"
      ],
      "correctAnswer": 0,
      "explanation": "RST é uma resposta ativa de reset; pode vir do host, serviço, firewall, proxy ou LB."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.6.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.6.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.6.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.6.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.6.p1.5",
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
      "question": "Qual parte do caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset",
    "scenario": "O FQDN resolve e o destino responde ping, mas a aplicação falha: de alguns clientes dá timeout; no servidor local aparece connection refused.",
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
    "reasoning": "A resposta profissional usa o comportamento do TCP: refused/RST indica resposta ativa sem listener ou rejeição; timeout indica ausência de resposta; handshake completo desloca a análise para TLS/HTTP/aplicação. Listener e logs intermediários fecham o diagnóstico.",
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
    "finalAnswer": "A resposta correta para “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Handshake TCP",
      "shortDefinition": "Sequência inicial de estabelecimento de conexão TCP.",
      "longDefinition": "Processo normalmente composto por SYN, SYN-ACK e ACK, usado para iniciar uma conexão TCP entre cliente e servidor.",
      "example": "Cliente envia SYN para TCP/443 e recebe SYN-ACK do servidor ou load balancer.",
      "relatedTerms": [
        "SYN",
        "SYN-ACK",
        "ACK"
      ],
      "relatedLessons": [
        "15.6"
      ]
    },
    {
      "term": "RST",
      "shortDefinition": "Reset TCP.",
      "longDefinition": "Flag usada para recusar ou encerrar abruptamente uma conexão TCP.",
      "example": "Uma porta fechada pode responder com RST ao SYN do cliente.",
      "relatedTerms": [
        "Connection refused",
        "Firewall"
      ],
      "relatedLessons": [
        "15.6",
        "15.7"
      ]
    },
    {
      "term": "Timeout",
      "shortDefinition": "Ausência de resposta útil no tempo esperado.",
      "longDefinition": "Sintoma no qual o cliente não recebe resposta dentro do período de espera, podendo indicar descarte, perda, retorno quebrado ou serviço travado.",
      "example": "SYN enviado repetidas vezes sem SYN-ACK ou RST.",
      "relatedTerms": [
        "Firewall",
        "Rota de retorno"
      ],
      "relatedLessons": [
        "15.4",
        "15.6"
      ]
    },
    {
      "term": "Socket em listen",
      "shortDefinition": "Processo escutando em IP, porta e protocolo.",
      "longDefinition": "Combinação de endereço, porta e protocolo na qual uma aplicação aguarda conexões ou datagramas.",
      "example": "nginx escutando em 0.0.0.0:443/tcp.",
      "relatedTerms": [
        "Binding",
        "Porta"
      ],
      "relatedLessons": [
        "15.6"
      ]
    },
    {
      "term": "Porta efêmera",
      "shortDefinition": "Porta temporária usada pelo cliente.",
      "longDefinition": "Porta de origem escolhida temporariamente pelo sistema operacional para conexões de saída.",
      "example": "Cliente 10.1.1.10:51544 acessa servidor 10.2.2.20:443.",
      "relatedTerms": [
        "NAT",
        "Tupla"
      ],
      "relatedLessons": [
        "15.6",
        "15.7"
      ]
    },
    {
      "term": "Health check",
      "shortDefinition": "Teste de saúde usado para decidir se backend recebe tráfego.",
      "longDefinition": "Verificação executada por load balancer, orquestrador ou monitoramento para validar se um serviço está apto a receber requisições.",
      "example": "LB consulta /ready na porta 8080 e remove backends que retornam erro.",
      "relatedTerms": [
        "Load Balancer",
        "Readiness"
      ],
      "relatedLessons": [
        "14.6",
        "15.6"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.6"
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
        "15.6"
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
      "title": "RFC 9293 — Transmission Control Protocol (TCP)",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc9293.html",
      "note": "Especificação atual do TCP e seus estados fundamentais."
    },
    {
      "type": "standard",
      "title": "RFC 768 — User Datagram Protocol",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc768.html",
      "note": "Definição clássica do UDP como transporte por datagramas com mecanismo mínimo."
    },
    {
      "type": "standard",
      "title": "RFC 8085 — UDP Usage Guidelines",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/info/rfc8085/",
      "note": "Diretrizes modernas para uso responsável de UDP."
    },
    {
      "type": "registry",
      "title": "Service Name and Transport Protocol Port Number Registry",
      "organization": "IANA",
      "url": "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml",
      "note": "Registro oficial de nomes de serviços e portas de transporte."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 14.6 — Load Balancers, health checks, TLS e publicação de serviços",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m14/lesson-14-06",
      "note": "Base conceitual para diagnóstico de serviços publicados por load balancer."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting TCP, UDP, portas e serviços\".",
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
        "description": "No caso “DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting TCP, UDP, portas e serviços",
              "description": "Em Troubleshooting TCP, UDP, portas e serviços, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.6."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O FQDN resolve e o destino responde ping, mas a aplicação falha: de alguns clientes dá timeout; no servidor local aparece connection refused.",
      "Impacto: Equipes discutem firewall, mas parte da falha está no serviço ouvindo na interface errada e parte em política intermediária.",
      "Causa provável a validar: Combinação de serviço bindado em localhost, health check errado, firewall stateful e portas diferentes entre cliente e LB/backend.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting TCP, UDP, portas e serviços.",
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
      "Qual evidência comprova o entendimento da aula 15.6?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection app.empresa.local -Port 8443; netstat -ano | findstr :8443; Get-NetTCPConnection -LocalPort 8443",
        "purpose": "Comparar teste remoto e serviço local.",
        "expectedObservation": "Estado da porta, PID e sucesso/falha TCP.",
        "interpretation": "Refused indica host alcançado sem listener; timeout sugere caminho/política/perda."
      },
      {
        "platform": "Linux",
        "command": "ss -lntup; curl -v telnet://app.empresa.local:8443; sudo tcpdump -ni any host <cliente> and port 8443",
        "purpose": "Ver listener, teste TCP e pacotes chegando.",
        "expectedObservation": "Bind address, SYN/SYN-ACK/RST ou ausência de resposta.",
        "interpretation": "Pacote chegando com RST aponta para host; SYN sem resposta aponta para firewall/perda."
      },
      {
        "platform": "Load Balancer/Firewall",
        "command": "Verificar health checks, listener frontend/backend, sessão stateful e logs deny/drop",
        "purpose": "Validar componentes intermediários.",
        "expectedObservation": "Portas consistentes e backends saudáveis.",
        "interpretation": "LB pode estar saudável em uma porta e clientes usando outra."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Serviço não escuta” está com prioridade Alta e a evidência necessária é “ss/netstat/Get-NetTCPConnection”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Binding errado” está com prioridade Alta e a evidência necessária é “ss -lntp”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Firewall bloqueia” está com prioridade Alta e a evidência necessária é “logs/flow/session table”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “UDP sem resposta” está com prioridade Média e a evidência necessária é “tcpdump/timeout controlado”",
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
      "15.7"
    ]
  },
  "diagnosticCase": {
    "title": "DNS e rota funcionam, mas a porta alterna entre timeout, refused e reset",
    "symptom": "O FQDN resolve e o destino responde ping, mas a aplicação falha: de alguns clientes dá timeout; no servidor local aparece connection refused.",
    "businessImpact": "Equipes discutem firewall, mas parte da falha está no serviço ouvindo na interface errada e parte em política intermediária.",
    "likelyRootCause": "Combinação de serviço bindado em localhost, health check errado, firewall stateful e portas diferentes entre cliente e LB/backend.",
    "timeline": [
      "11:00: nova versão mudou bind address",
      "11:05: health check passa no localhost",
      "11:10: clientes externos recebem timeout",
      "11:20: conexão local recebe refused"
    ],
    "expectedFlow": "Cliente → DNS → rota → firewall/LB → porta TCP/UDP → processo → resposta",
    "hypothesisMatrix": [
      {
        "hypothesis": "Serviço não escuta",
        "why": "Refused local",
        "evidence": "ss/netstat/Get-NetTCPConnection",
        "priority": "Alta"
      },
      {
        "hypothesis": "Binding errado",
        "why": "Escuta em 127.0.0.1, não em 0.0.0.0/IP privado",
        "evidence": "ss -lntp",
        "priority": "Alta"
      },
      {
        "hypothesis": "Firewall bloqueia",
        "why": "Timeout remoto",
        "evidence": "logs/flow/session table",
        "priority": "Alta"
      },
      {
        "hypothesis": "UDP sem resposta",
        "why": "Não há handshake",
        "evidence": "tcpdump/timeout controlado",
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
