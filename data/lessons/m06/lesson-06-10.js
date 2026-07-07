export const lesson0610 = {
  "id": "6.10",
  "moduleId": "m06",
  "order": 10,
  "title": "Revisão prática: diagnosticar fluxo de aplicação ponta a ponta",
  "subtitle": "Consolide TCP, UDP, portas, sockets, DNS, IP, rota, NAT, firewall, TLS, logs e aplicação em um método único para diagnosticar serviços corporativos de ponta a ponta.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "ligação/revisão",
  "xp": 285,
  "tags": [
    "redes",
    "tcp",
    "udp",
    "portas",
    "sockets",
    "troubleshooting",
    "nat",
    "firewall",
    "tls",
    "wireshark",
    "tcpdump",
    "cloud",
    "devsecops",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "A revisão depende do papel da camada de transporte entre IP e aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "É preciso entender como fluxos chegam ao processo correto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "O diagnóstico TCP depende de SYN, ACK, FIN, RST e estados."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.4",
      "title": "TCP: confiabilidade, janela, retransmissão e congestionamento",
      "reason": "Problemas de desempenho exigem entender perda, RTT, MSS, janela e retransmissão."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.5",
      "title": "UDP: simplicidade, latência e aplicações em tempo real",
      "reason": "Nem todo fluxo tem handshake ou confirmação de entrega."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "Muitos problemas reais estão em NAT, estado, retorno e política."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.8",
      "title": "Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark",
      "reason": "A revisão usa as ferramentas de diagnóstico estudadas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.9",
      "title": "Segurança em transporte: exposição, scans, TLS e hardening",
      "reason": "O fluxo só é aceitável se estiver seguro, logado e governado."
    }
  ],
  "objectives": [
    "Construir um método ponta a ponta para diagnosticar um fluxo de aplicação.",
    "Separar falhas de DNS, IP, rota, porta, processo, firewall, NAT, TLS e aplicação.",
    "Interpretar sintomas como timeout, refused, reset, filtered, handshake incompleto e erro TLS.",
    "Correlacionar evidências de cliente, servidor, firewall, load balancer, cloud, captura e logs.",
    "Criar uma matriz de fluxo segura com origem, destino, protocolo, porta, dono, justificativa, logs e validade.",
    "Preparar a transição para HTTP, HTTPS, proxies, APIs e camada de aplicação."
  ],
  "learningOutcomes": [
    "Aplicar uma checklist operacional para diagnosticar uma aplicação indisponível.",
    "Usar comandos de Windows, Linux e captura para provar onde o fluxo falha.",
    "Diferenciar conectividade de transporte de saúde da aplicação.",
    "Identificar quando a falha está em DNS, rota, firewall, NAT, TLS ou aplicação.",
    "Documentar evidências de forma segura e reproduzível.",
    "Propor correções sem abrir regras excessivas ou quebrar controles de segurança."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Quando uma aplicação falha, é comum alguém dizer: <em>“a rede está fora”</em>. Mas, em ambientes reais, a falha pode estar no DNS, no IP, na rota, no gateway, no firewall, no NAT, no listener, na porta errada, no TLS, no certificado, no load balancer, no WAF, no container, no health check ou na própria aplicação.</p>\n  <p>Esta aula final do Módulo 6 transforma tudo que você aprendeu sobre transporte em um método prático. A pergunta deixa de ser “deu ping?” e passa a ser: <strong>qual evidência prova que o fluxo saiu da origem, chegou ao destino correto, encontrou o processo correto, passou pelos controles corretos, negociou segurança corretamente e recebeu resposta da aplicação?</strong></p>\n  <div class='callout'><strong>Ideia central:</strong> diagnosticar ponta a ponta é seguir o fluxo do nome ao processo: DNS → IP → rota → porta → estado → NAT/firewall → TLS → aplicação → logs.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No início das redes corporativas, muitos diagnósticos eram feitos com poucos testes: <code>ping</code>, <code>telnet</code> em uma porta e alguma inspeção manual no servidor. Isso funcionava em ambientes simples, com poucos firewalls, pouco NAT e aplicações monolíticas.</p>\n  <p>Com cloud, containers, load balancers, service discovery, TLS obrigatório, WAFs, proxies, VPNs, egress controlado e Zero Trust, o caminho de uma requisição ficou muito mais longo. Uma conexão de aplicação pode atravessar DNS interno, NAT Gateway, firewall stateful, proxy, load balancer, ingress controller, service mesh, NetworkPolicy e pods efêmeros.</p>\n  <p>Por isso, o troubleshooting moderno precisa ser metódico e baseado em evidências. A pessoa de redes, segurança, plataforma ou DevSecOps precisa falar a mesma língua: origem, destino, protocolo, porta, estado, política, certificado, logs e dono do serviço.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O principal problema é que sintomas parecidos têm causas diferentes. Um timeout pode ser firewall, rota, NAT, serviço parado, DNS errado, caminho assimétrico, blackhole, security group, NACL, proxy ou aplicação saturada. Um <em>connection refused</em> pode significar que o host respondeu, mas nada escuta naquela porta. Um erro TLS pode esconder conectividade boa com certificado inválido ou SNI incorreto.</p>\n  <p>Outro problema é o conserto perigoso: abrir <code>0.0.0.0/0</code>, liberar qualquer porta, desativar TLS, desligar firewall ou ignorar logs. Isso pode fazer o teste funcionar, mas aumenta a superfície de ataque e cria dívida operacional.</p>\n  <div class='callout callout--problem'><strong>Problema real:</strong> sem método, equipes corrigem no escuro. Sem evidência, a discussão vira opinião. Sem segurança, o “conserto” pode virar incidente.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>O diagnóstico evoluiu de testes isolados para observabilidade correlacionada. Hoje, um fluxo precisa ser analisado no cliente, no resolvedor DNS, na rota, no firewall, no NAT, no load balancer, no host, no container, no TLS e na aplicação.</p>\n  <p>Ferramentas como <code>ss</code>, <code>netstat</code>, <code>tcpdump</code>, Wireshark, <code>curl</code>, <code>Test-NetConnection</code>, logs de firewall, flow logs de cloud, métricas de load balancer e traces de aplicação se complementam. Nenhuma delas sozinha prova tudo.</p>\n  <p>A evolução madura é transformar troubleshooting em runbook, matriz de fluxo, automação de validação, monitoramento contínuo e revisão por mudança. O diagnóstico deixa de depender de heróis e passa a fazer parte da engenharia da plataforma.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Um fluxo de aplicação ponta a ponta é a combinação de uma intenção de comunicação com uma sequência de traduções e decisões técnicas: nome vira IP; IP precisa de rota; rota atravessa gateways; política permite ou bloqueia; NAT pode traduzir; transporte usa porta; servidor precisa escutar; TLS pode validar identidade; aplicação precisa responder.</p>\n  <table class='comparison-table'>\n    <thead><tr><th>Camada de evidência</th><th>Pergunta</th><th>Exemplo de prova</th></tr></thead>\n    <tbody>\n      <tr><td>DNS</td><td>O nome resolve para o IP esperado?</td><td><code>dig</code>, <code>nslookup</code>, <code>Resolve-DnsName</code>.</td></tr>\n      <tr><td>IP/rota</td><td>Existe caminho até o destino?</td><td><code>ip route get</code>, <code>route print</code>, <code>traceroute</code>.</td></tr>\n      <tr><td>Transporte</td><td>A porta responde?</td><td><code>ss</code>, <code>netstat</code>, <code>Test-NetConnection</code>, <code>nc</code>.</td></tr>\n      <tr><td>Firewall/NAT</td><td>A política permite ida e retorno?</td><td>Logs de allow/deny, tabela de estado, flow logs.</td></tr>\n      <tr><td>TLS</td><td>O canal criptográfico é válido?</td><td><code>openssl s_client</code>, <code>curl -v</code>, certificado e SNI.</td></tr>\n      <tr><td>Aplicação</td><td>O serviço responde corretamente?</td><td>Status HTTP, logs, health check e métricas.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Internamente, o cliente começa com uma intenção: acessar um nome e uma porta. O sistema consulta DNS, escolhe uma rota, seleciona IP e porta de origem, cria um socket e tenta enviar SYN, datagrama UDP ou requisição de aplicação.</p>\n  <p>No caminho, cada componente toma uma decisão. O firewall avalia política e estado; NAT traduz endereço/porta; load balancer escolhe backend; host verifica se há processo em escuta; TLS valida nome e certificado; aplicação aplica autenticação, autorização e lógica de negócio.</p>\n  <ol class='flow-list'>\n    <li>Resolver nome para IP esperado.</li>\n    <li>Escolher rota e interface de saída.</li>\n    <li>Iniciar conexão TCP ou enviar datagrama UDP.</li>\n    <li>Atravessar firewall, NAT, proxy ou load balancer.</li>\n    <li>Chegar ao listener correto no servidor ou workload.</li>\n    <li>Negociar TLS quando aplicável.</li>\n    <li>Receber resposta da aplicação.</li>\n    <li>Correlacionar logs para confirmar o caminho real.</li>\n  </ol>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura corporativa moderna, o fluxo raramente vai direto do cliente ao servidor. Ele pode atravessar DNS corporativo, proxy, firewall de borda, NAT Gateway, load balancer, WAF, service mesh, ingress controller, NetworkPolicy e múltiplas zonas de segurança.</p>\n  <p>Por isso, a arquitetura precisa documentar não apenas IPs e portas, mas também dono do serviço, finalidade, origem permitida, destino, protocolo, porta, autenticação, TLS, logs, retenção, criticidade, janela de validade da exceção e procedimento de rollback.</p>\n  <div class='definition-box'><strong>Regra prática:</strong> um fluxo aprovado deve ser necessário, mínimo, documentado, monitorado e reversível.</div>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine que uma pessoa quer entregar um documento em um prédio corporativo. DNS é descobrir o endereço do prédio. Roteamento é chegar ao prédio. Firewall é a portaria. NAT é quando a portaria registra a visita com outro número de crachá. Porta é a sala específica. Processo é a pessoa que atende naquela sala. TLS é conferir o crachá e a identidade. Logs são o livro de entrada e saída.</p>\n  <p>A entrega só é bem-sucedida se todas as etapas funcionarem. Chegar ao prédio não prova que a sala existe. Entrar na portaria não prova que a pessoa certa atendeu. Ter crachá não prova autorização para aquele documento.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você tenta acessar <code>https://app.exemplo.local</code>. O nome resolve para <code>10.20.30.40</code>. A rota aponta para o gateway correto. O teste de porta mostra <code>443/TCP</code> aberto. O <code>curl -v</code> mostra certificado válido. Mesmo assim a aplicação retorna HTTP 503.</p>\n  <p>Nesse caso, rede e transporte podem estar funcionando. O problema provavelmente está no backend, health check, aplicação, banco, fila ou dependência interna. O diagnóstico correto evita culpar a rede sem evidência.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma filial não acessa o ERP na matriz. O DNS resolve para o IP correto, mas o <code>traceroute</code> mostra caminho pela VPN secundária. O teste TCP na porta 443 expira. Logs do firewall mostram deny porque a rota flutuante entrou, mas a regra foi criada apenas para o link principal.</p>\n  <p>A correção não é liberar tudo. A correção é ajustar política para o caminho de contingência, validar rota de retorno, registrar a mudança, testar failover e atualizar o runbook.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Uma aplicação em uma subnet privada precisa consumir uma API externa. DNS resolve, rota default aponta para NAT Gateway, security group permite saída 443/TCP, mas a NACL bloqueia portas efêmeras de retorno. O cliente vê timeout.</p>\n  <p>Esse é um exemplo clássico em cloud: a porta de destino parece liberada, mas o retorno precisa ser permitido conforme o modelo de controle usado. SGs costumam ser stateful; NACLs são stateless. O diagnóstico exige conhecer ambos.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Um pipeline cria um serviço Kubernetes, um Ingress e uma NetworkPolicy. O serviço passa no teste local, mas falha em homologação. O DNS do Ingress resolve, o load balancer responde, o TLS está válido, mas a NetworkPolicy bloqueia o tráfego do namespace do ingress controller para os pods.</p>\n  <p>Em DevSecOps, o ideal é transformar esse aprendizado em teste automatizado: validação de DNS, porta, TLS, policy, health check, logs e rollback no próprio pipeline.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Durante uma revisão defensiva, a equipe encontra SSH público, banco de dados exposto internamente para subnets de usuários e uma API com TLS válido, mas sem autenticação forte. O scan por si só mostra portas; a análise de risco mostra impacto.</p>\n  <p>A solução segura envolve reduzir origem, mover banco para rede privada, exigir bastion/JIT para administração, ativar logs, revisar certificados, usar mTLS onde fizer sentido e criar policy as code para impedir regressão.</p>\n  <div class='callout callout--security'><strong>Limite ético:</strong> testes ativos, scans e capturas só devem ser feitos em ambientes próprios, laboratório ou escopo formalmente autorizado.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama SVG — fluxo de aplicação ponta a ponta</h2>\n  <svg class='lesson-svg' viewBox='0 0 960 460' role='img' aria-labelledby='m06l10-title m06l10-desc'>\n    <title id='m06l10-title'>Diagnóstico ponta a ponta de fluxo de aplicação</title>\n    <desc id='m06l10-desc'>Cliente resolve DNS, segue rota, atravessa firewall e NAT, chega ao load balancer, negocia TLS e alcança aplicação, com logs e SIEM registrando evidências.</desc>\n    <defs>\n      <marker id='m06l10-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='30' y='40' width='130' height='70' rx='12' class='svg-node svg-node--client'></rect>\n    <text x='95' y='70' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='95' y='94' text-anchor='middle' class='svg-label svg-label--small'>curl / app / browser</text>\n    <rect x='210' y='40' width='130' height='70' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='275' y='70' text-anchor='middle' class='svg-label'>DNS</text>\n    <text x='275' y='94' text-anchor='middle' class='svg-label svg-label--small'>nome → IP</text>\n    <rect x='390' y='40' width='130' height='70' rx='12' class='svg-node svg-node--router'></rect>\n    <text x='455' y='70' text-anchor='middle' class='svg-label'>Rota</text>\n    <text x='455' y='94' text-anchor='middle' class='svg-label svg-label--small'>gateway / next hop</text>\n    <rect x='570' y='40' width='130' height='70' rx='12' class='svg-node svg-node--firewall'></rect>\n    <text x='635' y='70' text-anchor='middle' class='svg-label'>Firewall/NAT</text>\n    <text x='635' y='94' text-anchor='middle' class='svg-label svg-label--small'>policy + estado</text>\n    <rect x='750' y='40' width='150' height='70' rx='12' class='svg-node svg-node--cloud'></rect>\n    <text x='825' y='70' text-anchor='middle' class='svg-label'>LB / Serviço</text>\n    <text x='825' y='94' text-anchor='middle' class='svg-label svg-label--small'>443/TCP + TLS</text>\n    <path d='M160 75 H210' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l10-arrow)'></path>\n    <path d='M340 75 H390' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l10-arrow)'></path>\n    <path d='M520 75 H570' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l10-arrow)'></path>\n    <path d='M700 75 H750' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m06l10-arrow)'></path>\n    <rect x='90' y='180' width='170' height='80' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='175' y='212' text-anchor='middle' class='svg-label'>Evidências locais</text>\n    <text x='175' y='238' text-anchor='middle' class='svg-label svg-label--small'>ss, netstat, tcpdump</text>\n    <rect x='330' y='180' width='170' height='80' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='415' y='212' text-anchor='middle' class='svg-label'>Evidências rede</text>\n    <text x='415' y='238' text-anchor='middle' class='svg-label svg-label--small'>traceroute, mtr, flow logs</text>\n    <rect x='570' y='180' width='170' height='80' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='655' y='212' text-anchor='middle' class='svg-label'>Evidências controle</text>\n    <text x='655' y='238' text-anchor='middle' class='svg-label svg-label--small'>allow/deny, NAT, TLS</text>\n    <rect x='330' y='330' width='310' height='70' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='485' y='360' text-anchor='middle' class='svg-label'>SIEM / Runbook / Matriz de fluxo</text>\n    <text x='485' y='384' text-anchor='middle' class='svg-label svg-label--small'>correlação, dono, justificativa, logs e ação</text>\n    <path d='M175 260 C210 310 300 340 330 360' class='svg-flow svg-flow--response' marker-end='url(#m06l10-arrow)'></path>\n    <path d='M415 260 V330' class='svg-flow svg-flow--response' marker-end='url(#m06l10-arrow)'></path>\n    <path d='M655 260 C620 310 570 340 640 360' class='svg-flow svg-flow--response' marker-end='url(#m06l10-arrow)'></path>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>O laboratório final do módulo simula uma aplicação indisponível. Você irá diagnosticar por camadas: DNS, rota, porta, processo, firewall/NAT, TLS, logs e aplicação. O foco é evidência defensiva e documentação, não exploração.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios reforçam interpretação de sintomas e escolha da próxima evidência: quando usar DNS, quando usar rota, quando capturar pacote, quando olhar logs e quando envolver aplicação.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário com uma aplicação crítica falhando intermitentemente e deverá montar um runbook de diagnóstico, matriz de fluxo e plano de correção segura.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada demonstra como cruzar evidências sem pular etapas e sem abrir controles de forma insegura.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Diagnóstico ponta a ponta exige método. DNS correto não prova rota; rota correta não prova porta; porta aberta não prova TLS; TLS válido não prova aplicação; aplicação respondendo não prova segurança.</p>\n  <p>O profissional maduro coleta evidências em cada ponto, correlaciona logs, respeita controles e propõe mudanças mínimas, documentadas e reversíveis.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>No próximo módulo, você estudará <strong>HTTP, HTTPS, proxies e APIs</strong>. Depois de entender IP, roteamento, DNS e transporte, ficará mais fácil compreender o que acontece dentro de uma requisição web real.</p>\n</section>\n"
  },
  "networkContext": {
    "whereItFits": "Revisão integradora da camada de transporte aplicada ao diagnóstico de aplicações corporativas.",
    "before": "O estudante já estudou IPv4, subnetting, roteamento, DNS, DHCP, NTP, TCP, UDP, portas, NAT, firewall stateful e hardening.",
    "after": "A aula prepara o próximo módulo sobre HTTP, HTTPS, proxies, APIs, TLS em profundidade e camada de aplicação.",
    "dependsOn": [
      "m04",
      "m06",
      "m07",
      "8.1",
      "8.2",
      "8.3",
      "8.4",
      "8.5",
      "8.6",
      "8.7",
      "8.8",
      "8.9"
    ]
  },
  "protocolFields": [
    {
      "name": "Nome/FQDN",
      "description": "Identidade lógica usada pela aplicação antes de virar IP."
    },
    {
      "name": "IP de origem",
      "description": "Endereço do cliente, pod, VM, host ou NAT de saída."
    },
    {
      "name": "Porta de origem",
      "description": "Porta efêmera usada para correlacionar conexão e logs."
    },
    {
      "name": "IP de destino",
      "description": "Servidor, VIP, load balancer, endpoint privado ou NAT público."
    },
    {
      "name": "Porta de destino",
      "description": "Serviço esperado, como 443/TCP, 53/UDP ou 5432/TCP."
    },
    {
      "name": "Protocolo",
      "description": "TCP, UDP ou fluxo encapsulado/terminado por proxy, LB ou service mesh."
    },
    {
      "name": "Estado",
      "description": "LISTEN, SYN-SENT, ESTABLISHED, TIME-WAIT, timeout, refused, reset ou filtered."
    },
    {
      "name": "TLS/SNI",
      "description": "Nome apresentado, certificado, cadeia, versão, cifra e autenticação mútua quando houver."
    },
    {
      "name": "Log/decisão",
      "description": "Allow, deny, NAT translation, health check, erro de aplicação ou falha de autenticação."
    }
  ],
  "packetFlow": [
    "Cliente resolve o nome para um IP esperado.",
    "Sistema escolhe rota e interface de saída.",
    "Cliente cria socket com porta efêmera e protocolo definido.",
    "Firewall, NAT, proxy ou load balancer aplica política e registra estado.",
    "Servidor ou workload precisa ter processo escutando no IP e porta corretos.",
    "TCP completa handshake ou UDP envia datagrama sem confirmação nativa.",
    "TLS negocia identidade e criptografia quando aplicável.",
    "Aplicação responde e logs confirmam o resultado ponta a ponta."
  ],
  "deepDive": {
    "title": "A diferença entre sintoma, evidência e causa raiz",
    "content": "Sintoma é o que o usuário percebe: aplicação lenta, erro 503, timeout ou login falhando. Evidência é algo observável e reproduzível: DNS aponta para IP errado, SYN sem SYN-ACK, firewall deny, certificado expirado ou backend unhealthy. Causa raiz é a explicação que conecta evidências suficientes ao problema real. Troubleshooting profissional evita declarar causa raiz com base em um único sintoma.",
    "questions": [
      "Qual evidência provaria que o problema não é DNS?",
      "Qual evidência provaria que a porta está aberta mas a aplicação está quebrada?",
      "Por que logs de firewall e aplicação precisam de horário sincronizado?"
    ]
  },
  "commonMistakes": [
    "Concluir que a rede está boa apenas porque ping responde.",
    "Concluir que a aplicação está boa apenas porque a porta 443 abre.",
    "Ignorar DNS e testar apenas IP.",
    "Não verificar se o serviço escuta no IP/interface correta.",
    "Abrir regras amplas para testar e esquecer de reverter.",
    "Confundir erro TLS com falha de rota.",
    "Não considerar caminho assimétrico ou rota de retorno.",
    "Capturar pacotes com dados sensíveis sem sanitização.",
    "Não correlacionar logs de firewall, load balancer, sistema e aplicação."
  ],
  "troubleshooting": {
    "symptoms": [
      "Timeout ao acessar aplicação.",
      "Connection refused.",
      "TCP reset após handshake.",
      "Erro de certificado ou TLS handshake failure.",
      "UDP sem resposta aparente.",
      "Aplicação responde 502, 503 ou 504.",
      "Funciona de uma origem, falha de outra.",
      "Funciona por IP, falha por nome."
    ],
    "questions": [
      "O nome resolve para o IP esperado na origem afetada?",
      "A rota escolhida é a esperada?",
      "Existe processo escutando no destino?",
      "A política permite origem, destino, protocolo e porta?",
      "Há NAT ou LB alterando endereço, porta ou caminho?",
      "O TLS valida o nome usado pelo cliente?",
      "Os logs mostram allow, deny, reset, timeout ou erro de backend?"
    ],
    "tools": [
      "Windows: ipconfig /all, route print, Resolve-DnsName, Test-NetConnection, netstat -ano, Get-NetTCPConnection, pktmon.",
      "Linux: ip addr, ip route get, resolvectl, dig, ss -tulpen, curl -v, nc -vz, tcpdump, mtr.",
      "Cisco/firewall: show ip route, show access-lists, show conn/session, show nat translations, show logging.",
      "Cloud: flow logs, route tables, security groups/NSGs/NACLs, load balancer target health, WAF logs e métricas."
    ],
    "safeWorkflow": [
      "Definir origem, destino, protocolo, porta e horário do teste.",
      "Validar DNS e rota antes de transporte.",
      "Testar porta e capturar estado TCP/UDP.",
      "Consultar logs de controles no mesmo intervalo de tempo.",
      "Validar TLS e aplicação sem desativar controles permanentes.",
      "Documentar evidência, hipótese, teste, resultado e próxima ação."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup exemplo.local",
        "purpose": "Coletar configuração local, rotas e resolução DNS.",
        "expectedObservation": "IP, gateway, DNS e rotas coerentes com o cenário.",
        "interpretation": "Falhas nessa etapa indicam problemas de base antes da aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Executar testes ativos apenas em escopo autorizado.",
      "Usar matriz de fluxo mínima e revisada.",
      "Registrar logs de allow/deny, NAT, LB, TLS, sistema e aplicação.",
      "Sanitizar IPs públicos, tokens, cookies, payloads e dados pessoais antes de compartilhar evidências.",
      "Validar TLS sem desativar validação em produção como solução permanente.",
      "Reverter exceções temporárias e registrar validade de mudanças."
    ],
    "badPractices": [
      "Abrir 0.0.0.0/0 para resolver incidente sem aprovação.",
      "Desativar firewall, TLS ou autenticação para 'testar rápido'.",
      "Compartilhar PCAP contendo credenciais, cookies ou dados sensíveis.",
      "Fazer scan fora do escopo permitido.",
      "Ignorar logs por falta de NTP ou retenção."
    ],
    "attacksAndRisks": [
      "Exposição acidental de serviços administrativos.",
      "Varredura externa descobrindo portas sem dono.",
      "Egress amplo permitindo exfiltração.",
      "MITM em fluxos sem TLS ou com validação fraca.",
      "Bypass de firewall por rota assimétrica ou regra temporária esquecida.",
      "Investigação comprometida por logs sem horário confiável."
    ],
    "mitigations": [
      "Segmentação por origem/destino/porta/identidade.",
      "TLS/mTLS onde adequado.",
      "Bastion, JIT e MFA para administração.",
      "Policy as code para regras de rede e exposição.",
      "Observabilidade e alertas para mudanças de superfície.",
      "Runbooks e evidências padronizadas para incidentes."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Revisão prática: diagnosticar fluxo de aplicação ponta a ponta",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Segmentação por origem/destino/porta/identidade.",
      "TLS/mTLS onde adequado.",
      "Bastion, JIT e MFA para administração.",
      "Policy as code para regras de rede e exposição.",
      "Observabilidade e alertas para mudanças de superfície.",
      "Runbooks e evidências padronizadas para incidentes."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-6.10",
    "title": "Diagnóstico ponta a ponta de uma aplicação",
    "labType": "cloud",
    "objective": "Diagnosticar uma falha simulada de aplicação seguindo DNS, rota, porta, processo, firewall/NAT, TLS, logs e resposta da aplicação.",
    "scenario": "Laboratório O laboratório final do módulo simula uma aplicação indisponível. Você irá diagnosticar por camadas: DNS, rota, porta, processo, firewall/NAT, TLS, logs e aplicação. O foco é evidência defensiva e documentação, não exploração.",
    "topology": "Cliente Windows ou Linux, resolvedor DNS, gateway/firewall/NAT, servidor ou VM/container com serviço HTTP/HTTPS, e coletor de logs opcional.",
    "architecture": "O cliente acessa app.corp.local:443. A requisição depende de DNS, rota até o gateway, política TCP/443, NAT ou LB, processo em escuta, TLS válido e backend saudável.",
    "prerequisites": [
      "Ambiente próprio ou laboratório autorizado.",
      "Windows com PowerShell ou Linux com iproute2, dig, curl, ss e tcpdump.",
      "Opcional: Wireshark, Packet Tracer, VM local, container HTTP simples ou serviço de teste controlado.",
      "Não capturar tráfego de terceiros nem dados sensíveis."
    ],
    "tools": [
      "Wireshark",
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Docker local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 180,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir o fluxo esperado",
        "instruction": "Registre origem, FQDN, IP esperado, protocolo, porta, horário do teste, dono e justificativa.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você tem um escopo claro para evitar testes aleatórios.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Validar DNS",
        "instruction": "Use dig/nslookup/Resolve-DnsName para confirmar se o nome resolve para o IP esperado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "O nome retorna o IP correto ou a divergência já é identificada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Validar rota",
        "instruction": "Use ip route get, route print, traceroute/tracert ou mtr para observar caminho e gateway.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "A origem escolhe a rota esperada para chegar ao destino.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Validar porta",
        "instruction": "Teste TCP com Test-NetConnection, nc ou curl -v. Para UDP, use ferramenta específica da aplicação e logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você identifica aberto, recusado, filtrado, timeout ou reset.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Validar processo no servidor",
        "instruction": "No host controlado, use ss -tulpen, netstat -ano ou equivalente para confirmar listener e bind.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "O processo correto escuta na porta e IP esperados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Capturar evidência controlada",
        "instruction": "Use tcpdump/Wireshark com filtro restrito por host e porta, evitando payload sensível.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você observa SYN/SYN-ACK/ACK, RST, retransmissões ou ausência de resposta.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Consultar controles intermediários",
        "instruction": "Verifique logs de firewall, NAT, LB, SG/NSG/NACL, WAF, proxy ou NetworkPolicy.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Os controles mostram allow, deny, timeout, reset, health check ou ausência de tráfego.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Validar TLS e aplicação",
        "instruction": "Use curl -v ou openssl s_client para TLS e analise status de aplicação, headers e logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você separa erro de transporte de erro TLS ou aplicação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Produzir conclusão",
        "instruction": "Escreva hipótese, evidências, causa provável, correção mínima segura e validação pós-correção.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "O relatório permite ação sem abrir controles excessivos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, você terá um diagnóstico reproduzível e seguro do fluxo, com evidências por camada e uma recomendação de correção mínima.",
    "validation": [
      {
        "check": "DNS validado com evidência.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "DNS validado com evidência.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Rota e gateway documentados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Rota e gateway documentados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Porta e estado de conexão testados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Porta e estado de conexão testados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Listener/processo confirmado quando há acesso ao destino.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Listener/processo confirmado quando há acesso ao destino.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Logs de controle correlacionados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Logs de controle correlacionados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "TLS e aplicação separados do transporte.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "TLS e aplicação separados do transporte.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Relatório sanitizado e acionável.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Relatório sanitizado e acionável.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se DNS divergir, teste resolvedores diferentes e cache.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se rota for inesperada, verifique VPN, default route e route tables cloud.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se SYN não recebe resposta, procure firewall, rota de retorno ou serviço indisponível.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se recebe RST, verifique se há listener e se a aplicação aceita a conexão.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se TLS falhar, valide SNI, SAN, cadeia, validade e versão.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se HTTP retorna 503, olhe backend, health check, aplicação e dependências.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Transformar a checklist em runbook corporativo.",
      "Automatizar testes de porta/TLS em pipeline e monitoramento.",
      "Criar dashboards com DNS, LB, firewall, aplicação e certificados.",
      "Usar policy as code para impedir regras amplas e exceções sem validade.",
      "Padronizar anexos de evidência sanitizada para incidentes."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Revisão prática: diagnosticar fluxo de aplicação ponta a ponta” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Aplicação crítica indisponível após mudança de rede",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns."
  },
  "mentorQuestions": [
    "Qual é a primeira evidência que você coletaria quando uma aplicação falha apenas para uma filial?",
    "Como você diferenciaria timeout por firewall de aplicação parada?",
    "Por que abrir uma regra ampla durante incidente pode dificultar descobrir a causa raiz?"
  ],
  "quiz": [
    {
      "question": "Qual sequência representa melhor um diagnóstico ponta a ponta?",
      "options": [
        "Ping, reiniciar servidor, liberar firewall",
        "DNS, rota, porta, processo, controles, TLS, aplicação e logs",
        "Somente scan de portas",
        "Somente olhar o dashboard"
      ],
      "answer": 1,
      "explanation": "O método completo separa camadas e coleta evidências em cada etapa."
    },
    {
      "question": "Connection refused normalmente indica que:",
      "options": [
        "O host respondeu, mas a porta/processo recusou",
        "DNS está sempre errado",
        "A rota nunca existe",
        "TLS está sempre inválido"
      ],
      "answer": 0,
      "explanation": "Refused sugere resposta ativa, frequentemente sem listener ou serviço recusando conexão."
    },
    {
      "question": "Uma porta 443 aberta prova que a aplicação está saudável?",
      "options": [
        "Sim, sempre",
        "Não; prova apenas parte da conectividade de transporte",
        "Sim, se DNS resolver",
        "Sim, se ping responder"
      ],
      "answer": 1,
      "explanation": "A aplicação pode falhar em TLS, autenticação, backend ou lógica mesmo com a porta aberta."
    },
    {
      "question": "Em UDP, por que o troubleshooting é mais difícil?",
      "options": [
        "Porque UDP não usa IP",
        "Porque não há handshake nativo confirmando conexão",
        "Porque UDP nunca passa por firewall",
        "Porque UDP não tem portas"
      ],
      "answer": 1,
      "explanation": "Sem handshake, ausência de resposta pode significar bloqueio, perda, timeout ou aplicação silenciosa."
    },
    {
      "question": "Qual prática é mais segura durante incidente?",
      "options": [
        "Abrir 0.0.0.0/0 sem registro",
        "Desativar TLS temporariamente sem rollback",
        "Aplicar mudança mínima, documentada, com validade e logs",
        "Apagar logs antigos"
      ],
      "answer": 2,
      "explanation": "Mudanças devem ser mínimas, auditáveis e reversíveis."
    },
    {
      "question": "Se DNS resolve corretamente, rota existe e TCP conecta, mas TLS falha, a próxima evidência deve focar em:",
      "options": [
        "Máscara de rede",
        "Certificado, SNI, cadeia, validade e versão/cifra",
        "ARP spoofing",
        "DHCP lease"
      ],
      "answer": 1,
      "explanation": "Nesse estágio, transporte funcionou e a falha está na negociação TLS ou identidade."
    }
  ],
  "flashcards": [
    {
      "front": "O que é diagnóstico ponta a ponta?",
      "back": "Método que acompanha o fluxo do nome ao processo, validando DNS, rota, transporte, controles, TLS, aplicação e logs."
    },
    {
      "front": "O que timeout pode significar?",
      "back": "Firewall, rota ausente, NAT, serviço parado, caminho assimétrico, perda ou controle intermediário sem resposta."
    },
    {
      "front": "O que connection refused sugere?",
      "back": "O destino respondeu ativamente, mas não há serviço aceitando naquela porta ou a aplicação recusou."
    },
    {
      "front": "Por que ping não basta?",
      "back": "ICMP não prova DNS, porta, TCP/UDP, TLS, autenticação ou saúde da aplicação."
    },
    {
      "front": "Por que correlacionar logs por horário?",
      "back": "Para conectar teste, decisão de firewall/NAT/LB, evento do sistema e resposta da aplicação."
    },
    {
      "front": "O que uma matriz de fluxo deve conter?",
      "back": "Origem, destino, protocolo, porta, dono, justificativa, logs, criticidade e validade."
    }
  ],
  "exercises": [
    {
      "title": "Classifique sintomas",
      "prompt": "Associe timeout, refused, reset e erro TLS às causas prováveis e à próxima evidência a coletar."
    },
    {
      "title": "Monte uma checklist",
      "prompt": "Crie uma checklist curta para diagnosticar app.exemplo.local:443 a partir de uma estação corporativa."
    },
    {
      "title": "Matriz de fluxo",
      "prompt": "Escreva uma matriz de fluxo para um frontend que acessa API 443/TCP e banco 5432/TCP em rede privada."
    },
    {
      "title": "Evidência sanitizada",
      "prompt": "Liste quais dados devem ser removidos antes de compartilhar uma captura ou log em um chamado."
    }
  ],
  "challenge": {
    "title": "Aplicação crítica indisponível após mudança de rede",
    "scenario": "Após uma mudança, usuários da filial não conseguem acessar https://erp.corp.local. Usuários da matriz acessam normalmente. DNS retorna 10.80.20.50 para todos. Da filial, traceroute passa pela VPN secundária. Test-NetConnection em 443 expira. Logs do firewall mostram deny para origem 10.30.40.0/24 no caminho secundário. O load balancer não registra tentativa da filial.",
    "tasks": [
      "Identificar a camada provável da falha.",
      "Listar evidências já disponíveis.",
      "Definir quais testes adicionais faria.",
      "Propor correção mínima segura.",
      "Atualizar a matriz de fluxo e o runbook de failover."
    ],
    "rubric": [
      "Reconhece que DNS está consistente, mas caminho/política de contingência falha.",
      "Usa logs do firewall como evidência forte de bloqueio antes do LB.",
      "Não propõe liberar qualquer origem; propõe regra específica para a filial no caminho secundário.",
      "Inclui validação pós-correção com TCP, TLS, logs e aplicação.",
      "Atualiza documentação para failover futuro."
    ]
  },
  "commentedSolution": {
    "summary": "O problema provável está na política do caminho secundário da VPN, não no DNS, nem no load balancer, nem inicialmente na aplicação.",
    "steps": [
      "DNS retorna o mesmo IP para matriz e filial, então DNS não é a causa principal aparente.",
      "A matriz acessa normalmente, então o serviço e o LB estão operacionais para pelo menos uma origem.",
      "A filial segue pela VPN secundária, mostrando mudança de caminho.",
      "O teste TCP/443 expira e o firewall registra deny antes do tráfego chegar ao LB.",
      "A correção mínima é permitir origem 10.30.40.0/24 para destino 10.80.20.50 TCP/443 no caminho secundário, com logs e justificativa.",
      "Após correção, validar Test-NetConnection/curl, logs de firewall allow, logs do LB, TLS e resposta HTTP do ERP.",
      "Atualizar matriz de fluxo, runbook de failover e teste automatizado de contingência."
    ]
  },
  "glossary": [
    {
      "term": "Fluxo ponta a ponta",
      "definition": "Comunicação completa entre origem e aplicação, incluindo nome, rota, transporte, controles, TLS, aplicação e resposta."
    },
    {
      "term": "Sintoma",
      "definition": "Comportamento observado, como timeout, erro 503 ou falha de TLS."
    },
    {
      "term": "Evidência",
      "definition": "Dado observável usado para provar ou descartar hipóteses."
    },
    {
      "term": "Causa raiz",
      "definition": "Explicação fundamental que conecta evidências suficientes ao problema real."
    },
    {
      "term": "Runbook",
      "definition": "Procedimento operacional padronizado para diagnóstico e resposta."
    },
    {
      "term": "Matriz de fluxo",
      "definition": "Documento que define origem, destino, protocolo, porta, dono, justificativa, logs e validade de comunicação."
    },
    {
      "term": "Rota de retorno",
      "definition": "Caminho usado pela resposta para voltar ao cliente."
    },
    {
      "term": "Evidência sanitizada",
      "definition": "Log, captura ou print removendo dados sensíveis antes de compartilhamento."
    }
  ],
  "references": [
    {
      "title": "RFC 793 — Transmission Control Protocol",
      "type": "rfc",
      "note": "Base conceitual do TCP clássico."
    },
    {
      "title": "RFC 768 — User Datagram Protocol",
      "type": "rfc",
      "note": "Base conceitual do UDP."
    },
    {
      "title": "RFC 8446 — TLS 1.3",
      "type": "rfc",
      "note": "Base conceitual para TLS moderno."
    },
    {
      "title": "Wireshark User's Guide",
      "type": "guide",
      "note": "Referência para análise de pacotes em laboratório."
    },
    {
      "title": "CIS Controls — Network Infrastructure Management",
      "type": "framework",
      "note": "Boas práticas de inventário, configuração segura e monitoramento."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Módulo de observabilidade e pipelines",
      "reason": "Runbooks e validações de conectividade devem virar testes automatizados e dashboards."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Autenticação entre serviços",
      "reason": "TLS, mTLS e autorização entre serviços complementam diagnóstico de transporte."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 7",
      "reason": "DNS, NTP, logs e observabilidade são dependências do diagnóstico confiável."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "diagram",
      "lab",
      "challenge",
      "solution",
      "summary"
    ],
    "minimumQuizScore": 70,
    "requiredLabValidation": true,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "7.1"
    ],
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "anyOf": [
          "quizScoreAtLeast",
          "checklistDone"
        ]
      }
  }
};
