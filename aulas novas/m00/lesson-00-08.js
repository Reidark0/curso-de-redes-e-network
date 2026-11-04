export const lesson0008 = {
  "id": "0.8",
  "moduleId": "m00",
  "order": 8,
  "title": "Como pensar em camadas",
  "subtitle": "O método mental que separa problema físico, endereçamento, transporte, aplicação, identidade e segurança sem transformar troubleshooting em adivinhação.",
  "duration": "65-90 min",
  "estimatedStudyTimeMinutes": 90,
  "difficulty": "iniciante",
  "type": "ligação",
  "xp": 140,
  "tags": [
    "fundamentos",
    "camadas",
    "modelo osi",
    "tcp/ip",
    "troubleshooting",
    "arquitetura",
    "segurança",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "É necessário entender que toda comunicação digital começa com informação representada em bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "Pensar em camadas exige reconhecer que existe uma base física carregando os sinais."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.6",
      "reason": "Latência, perda, throughput e jitter ajudam a diferenciar falhas de caminho, capacidade e aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.7",
      "reason": "Protocolos são contratos; o pensamento em camadas organiza esses contratos por responsabilidade."
    }
  ],
  "objectives": [
    "Explicar por que pensar em camadas reduz confusão em redes, cloud, segurança e DevSecOps.",
    "Diferenciar camada física, enlace, rede, transporte, aplicação, identidade e políticas de segurança em um diagnóstico.",
    "Entender que modelos em camadas são mapas mentais, não a realidade completa do pacote.",
    "Aplicar uma sequência simples de troubleshooting em camadas antes de culpar DNS, firewall ou aplicação.",
    "Preparar o aluno para o Módulo 1 e para o Modelo OSI do Módulo 2."
  ],
  "learningOutcomes": [
    "Dado um sintoma como 'não acessa o sistema', o aluno consegue separar hipóteses por camada antes de executar comandos aleatórios.",
    "Dado um desenho de arquitetura, o aluno consegue apontar onde entram cabo, Wi-Fi, switch, IP, rota, porta, TLS, HTTP, identidade e autorização.",
    "Dado um erro de pipeline, API ou cloud, o aluno consegue diferenciar falha de rede, falha de protocolo, falha de autenticação e falha de permissão.",
    "Dado um incidente de segurança, o aluno consegue organizar evidências de pacotes, fluxos, logs, identidade e política."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Um usuário abre chamado dizendo: <strong>\"o sistema não funciona\"</strong>. Isso pode ser notebook sem Wi-Fi, cabo ruim, IP errado, gateway ausente, DNS quebrado, porta bloqueada, TLS inválido, proxy exigindo autenticação, API fora do ar, token expirado, usuário sem permissão ou regra de WAF bloqueando a requisição.\n  </p>\n  <p>\n    Sem método, você pula de hipótese em hipótese: testa DNS, culpa o firewall, reinicia o serviço, troca o cabo, altera uma regra. Às vezes acerta por sorte. Em empresas, cloud e segurança, essa tentativa e erro custa tempo, aumenta o risco e pode mascarar incidentes.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> uma aplicação interna está inacessível. O ping para o servidor responde, mas o login falha. Um analista conclui que \"a rede está funcionando\"; outro, que \"é problema de senha\". O diagnóstico em camadas mostra que o ping testa só uma parte pequena do caminho: o login ainda depende de DNS, rota, porta, TLS, HTTP, sessão, provedor de identidade, token, autorização e aplicação.\n  </div>\n  <p>\n    Pensar em camadas é subir uma escada de perguntas: o sinal chega? O enlace está ativo? Existe endereço? Existe rota? A porta responde? O protocolo negocia? A aplicação entende? A identidade é válida? A política permite? É esse método que você vai usar no Modelo OSI, no TCP/IP, em cloud networking, em IAM e no troubleshooting profissional.\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    Uma comunicação real atravessa muitas responsabilidades ao mesmo tempo. Um simples acesso a <code>https://sistema.empresa.local</code> pode envolver Wi-Fi, switch, VLAN, ARP, IP, roteamento, NAT, firewall, DNS, TCP, TLS, HTTP, cookie, token, sessão, banco de dados e autorização.\n  </p>\n  <p>\n    Se tudo isso vira \"a rede\", o diagnóstico fica impreciso. Você troca o DNS quando a falha é TLS, libera o firewall quando a falha é autorização, culpa o usuário quando o problema é rota, ou abre uma porta perigosa quando bastava corrigir um cabeçalho no proxy.\n  </p>\n  <p>\n    Modelos em camadas existem para dividir essa complexidade em responsabilidades, e é por isso que equipes diferentes conseguem trabalhar em partes diferentes do problema: o fabricante da placa de rede não precisa implementar HTTP, e o desenvolvedor da API não precisa lidar com o sinal elétrico no cabo. Com camadas, cada hipótese é testada no lugar certo e com a evidência adequada.\n  </p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> pensamento em camadas é um modelo mental de arquitetura e troubleshooting que organiza protocolos, componentes e evidências por responsabilidade, sem misturar problemas físicos, lógicos, de aplicação, de identidade e de segurança.\n  </div>\n  <p>\n    Cada camada responde a uma pergunta diferente. A física: existe sinal? O enlace: há comunicação local? A rede: existe endereçamento e caminho? O transporte: há conversa entre processos (portas)? A aplicação: a mensagem faz sentido? Acima disso, identidade e segurança perguntam quem é o solicitante, o que ele pode fazer e como isso será registrado.\n  </p>\n  <h3>Modelos são mapas, não o pacote real</h3>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Modelo</th><th>Para que serve</th><th>Limitação</th></tr></thead>\n      <tbody>\n        <tr><td>Modelo OSI</td><td>Separar responsabilidades em sete camadas; ótimo para ensino e troubleshooting</td><td>Nem todo protocolo real se encaixa perfeitamente</td></tr>\n        <tr><td>Pilha TCP/IP</td><td>Representar a internet real; ótima para a operação</td><td>Menos detalhada didaticamente</td></tr>\n        <tr><td>Camadas operacionais (identidade, política, observabilidade, automação)</td><td>Cobrir os problemas que acontecem acima do transporte, comuns em cloud, DevSecOps e segurança</td><td>Exigem visão interdisciplinar</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    Nenhum desses modelos é a realidade completa. Alguns componentes atuam em várias camadas ao mesmo tempo, como proxies, firewalls de próxima geração, WAFs e service meshes. E as camadas ajudam a pensar, mas não substituem logs, captura de tráfego, métricas e documentação: não force todo problema moderno a caber no OSI nem use o modelo para ignorar uma evidência direta.\n  </p>\n  <div class=\"callout warning\">\n    <strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Achar que ping bem-sucedido prova que o sistema funciona.</strong> Ping é rápido, mas não testa porta, TLS, HTTP, autenticação, autorização nem a aplicação. Use-o como evidência parcial e continue subindo.</li>\n      <li><strong>Culpar o DNS por qualquer falha de acesso.</strong> DNS aparece em muitos sintomas, mas o problema pode ser firewall, TLS, token ou aplicação. Teste a resolução e depois valide porta, certificado, HTTP e logs.</li>\n      <li><strong>Confundir autenticação com autorização.</strong> Autenticação verifica quem é o usuário; autorização decide o que ele pode fazer. Em HTTP, 401 costuma indicar credencial ausente ou inválida; 403 indica que o servidor entendeu o pedido e recusou a ação, o que, para um usuário já autenticado, aponta para autorização.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Na comunicação real, os dados são <strong>encapsulados</strong>: cada camada acrescenta as informações de que precisa para cumprir sua responsabilidade. No destino, o processo acontece no sentido inverso (desencapsulamento). Num acesso HTTPS:\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação:</strong> o navegador monta uma requisição HTTP.</li>\n    <li><strong>Segurança/aplicação:</strong> TLS protege a conversa e valida o certificado.</li>\n    <li><strong>Transporte:</strong> TCP identifica as portas e controla a sessão.</li>\n    <li><strong>Rede:</strong> IP define origem, destino e caminho entre redes.</li>\n    <li><strong>Enlace:</strong> Ethernet ou Wi-Fi entrega ao próximo salto local.</li>\n    <li><strong>Física:</strong> cobre, fibra ou rádio carregam os sinais.</li>\n    <li><strong>Identidade e política:</strong> acima da aplicação, tokens, claims e regras decidem o acesso.</li>\n  </ol>\n  <p>\n    Camadas não são gavetas isoladas: elas se influenciam. Um proxy pode mexer no HTTP. Um firewall pode bloquear o TCP. Um problema físico pode gerar retransmissões. Um certificado TLS inválido pode impedir a aplicação de começar. Uma política de identidade pode negar acesso mesmo com todo o caminho de rede saudável.\n  </p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>\n    Num desenho de arquitetura, um acesso corporativo típico vira uma pilha de responsabilidades: dispositivo do usuário, rede local, borda, rede interna ou cloud, balanceador, serviço, identidade, autorização, logs e monitoramento. Para localizar cada componente:\n  </p>\n  <ul>\n    <li><strong>Físicos:</strong> cabo, rádio, switch, roteador, AP, link WAN.</li>\n    <li><strong>Lógicos:</strong> VLAN, sub-rede, rota, NAT, firewall, DNS.</li>\n    <li><strong>Transporte/aplicação:</strong> porta, sessão, TLS, HTTP, API, proxy.</li>\n    <li><strong>Segurança:</strong> WAF, EDR, SIEM, IAM, MFA, policy engine, logs.</li>\n  </ul>\n  <p>Qualquer um deles pode quebrar, bloquear, atrasar, alterar ou registrar a comunicação.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense na entrega de um documento numa empresa. Precisa existir uma estrada até o prédio; o entregador precisa achar o endereço; na recepção, alguém verifica se ele pode entrar; no andar certo, ele procura a sala; quem recebe confere se o documento é válido e se o pedido faz sentido; por fim, a empresa registra a entrega.\n  </p>\n  <p>\n    Cada etapa é uma camada. Estrada não substitui autorização. Endereço correto não garante permissão. Identidade válida não garante que o documento esteja correto. Registro de entrega não prova que o conteúdo era legítimo.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> em redes, as camadas agem em milissegundos e se sobrepõem (encapsulamento, criptografia, cache, proxies), o que nenhuma entrega física reproduz.\n  </div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Seu notebook não abre um site. Em vez de alterar o DNS sem motivo, suba as camadas em ordem e só avance quando a anterior estiver confirmada:\n  </p>\n  <table class=\"data-table\">\n    <thead><tr><th>Pergunta</th><th>Camada aproximada</th><th>Ferramenta</th></tr></thead>\n    <tbody>\n      <tr><td>Estou conectado ao meio?</td><td>Física/enlace</td><td>Ícone de rede, status da interface</td></tr>\n      <tr><td>Tenho IP e gateway?</td><td>Rede</td><td><code>ipconfig</code>, <code>ip addr</code>, <code>ip route</code></td></tr>\n      <tr><td>O nome resolve?</td><td>Aplicação/serviço essencial</td><td><code>nslookup</code>, <code>dig</code></td></tr>\n      <tr><td>A porta responde?</td><td>Transporte</td><td><code>Test-NetConnection</code>, <code>curl -v</code></td></tr>\n      <tr><td>O TLS negocia?</td><td>Segurança/aplicação</td><td><code>curl -v</code> (mostra o handshake e o certificado)</td></tr>\n      <tr><td>A aplicação aceita?</td><td>Aplicação/identidade</td><td>Status HTTP, logs, token, sessão</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Um usuário remoto acessa um sistema financeiro. O caminho pode envolver VPN ou ZTNA, DNS interno, firewall, proxy, balanceador, TLS, aplicação, Active Directory ou provedor de identidade, autorização por grupo e logs no SIEM. Quando ele reclama, cada equipe enxerga só uma parte.\n  </p>\n  <p>\n    As camadas viram uma linguagem comum: rede valida rota, perda, latência e firewall; segurança valida logs, política e bloqueios; identidade valida autenticação, MFA, grupos e claims; aplicação valida status HTTP, sessão, permissões e backend; plataforma valida ingress, service, pod, health check e DNS interno. Use essa divisão para escalar com evidência, nunca para empurrar o problema para outra equipe sem ter validado a sua camada.\n  </p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>\n    Em cloud, falhas muito diferentes aparecem para o usuário como \"não acessa\". A causa pode estar em route table, security group, NSG, DNS privado, endpoint privado, NAT Gateway, load balancer, certificado, WAF, API Gateway, IAM ou política da aplicação. Os nomes parecem os da rede tradicional, mas cada serviço tem regras e evidências próprias.\n  </p>\n  <p>\n    Exemplo: uma VM em subnet privada precisa chamar uma API externa. Se não há rota para o NAT, o tráfego nem sai. Se o security group nega a saída, a conexão falha. Se o DNS resolve para o endpoint privado errado, o tráfego vai por outro caminho. Se o TLS falha, a porta pode até abrir, mas a aplicação não negocia. Se a API retorna 403, a rede funcionou e a autorização negou.\n  </p>\n  <div class=\"callout callout--security\">\n    <strong>Regra prática:</strong> em cloud, conectividade, exposição e permissão são coisas diferentes. Abrir caminho de rede não concede acesso legítimo; uma negação de IAM não significa que a rede esteja quebrada.\n  </div>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>\n    Um pipeline que publica uma imagem num registry pode falhar em várias camadas: o runner não resolve o DNS do registry; o firewall bloqueia a porta 443; o proxy exige configuração; o TLS falha por CA ausente; o registry rejeita a autenticação; a política nega push para aquela tag; o scanner bloqueia por vulnerabilidade crítica. Tudo aparece como \"falha de pipeline\", mas são problemas diferentes.\n  </p>\n  <p>\n    Identificar a camada evita correções ruins, como colocar um segredo estático no pipeline quando o problema era a audience do OIDC incorreta, ou liberar saída irrestrita quando bastava configurar o proxy.\n  </p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>\n    Um controle numa camada não substitui os das outras. TLS protege a confidencialidade em trânsito, mas não decide autorização. Firewall reduz exposição, mas não corrige senha fraca. MFA reduz o risco de credencial roubada, mas não corrige servidor exposto. Segmentação reduz movimento lateral, mas não substitui patching e monitoramento.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Erro comum</th><th>Confusão de camada</th><th>Risco</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Achar que NAT é firewall</td><td>Endereçamento vs política</td><td>Exposição acidental</td><td>Usar regras explícitas, logs e menor privilégio</td></tr>\n      <tr><td>Achar que VPN autoriza tudo</td><td>Caminho vs permissão</td><td>Acesso lateral amplo</td><td>ZTNA, segmentação, IAM e auditoria</td></tr>\n      <tr><td>Achar que HTTPS valida o usuário</td><td>Criptografia vs identidade</td><td>Aplicação exposta com sessão fraca</td><td>Autenticação, autorização e gestão de sessão</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m00l08-title m00l08-desc\">\n    <title id=\"m00l08-title\">Pensamento em camadas aplicado ao troubleshooting</title>\n    <desc id=\"m00l08-desc\">Diagrama em pilha mostrando física, enlace, rede, transporte, aplicação, identidade, política e observabilidade.</desc>\n    <defs>\n      <marker id=\"m00l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"80\" y=\"400\" width=\"820\" height=\"48\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"490\" y=\"430\" text-anchor=\"middle\" class=\"svg-label\">Física: sinal, cabo, fibra, rádio, energia, interferência</text>\n    <rect x=\"110\" y=\"345\" width=\"760\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"490\" y=\"375\" text-anchor=\"middle\" class=\"svg-label\">Enlace: Ethernet, Wi-Fi, MAC, VLAN, quadro local</text>\n    <rect x=\"140\" y=\"290\" width=\"700\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"490\" y=\"320\" text-anchor=\"middle\" class=\"svg-label\">Rede: IP, rota, gateway, sub-rede, caminho</text>\n    <rect x=\"170\" y=\"235\" width=\"640\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Transporte: TCP, UDP, portas, sessão, timeout</text>\n    <rect x=\"200\" y=\"180\" width=\"580\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"490\" y=\"210\" text-anchor=\"middle\" class=\"svg-label\">Aplicação: DNS, HTTP, TLS, API, erro, payload</text>\n    <rect x=\"230\" y=\"125\" width=\"520\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"490\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">Identidade e autorização: usuário, token, claims, grupos</text>\n    <rect x=\"260\" y=\"70\" width=\"460\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"490\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Política e observabilidade: WAF, logs, SIEM, auditoria</text>\n    <line x1=\"930\" y1=\"425\" x2=\"930\" y2=\"92\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l08-arrow)\" />\n    <text x=\"925\" y=\"260\" text-anchor=\"end\" class=\"svg-label svg-label--small\">subir hipóteses</text>\n    <line x1=\"50\" y1=\"92\" x2=\"50\" y2=\"425\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l08-arrow)\" />\n    <text x=\"55\" y=\"260\" class=\"svg-label svg-label--small\">descer para validar base</text>\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> não trate \"rede\" como caixa preta. Transforme cada sintoma em perguntas por responsabilidade: meio, enlace, endereço, rota, porta, protocolo, aplicação, identidade, política e evidência.</li>\n    <li><strong>Como funciona:</strong> cada camada encapsula os dados da camada de cima; as camadas se influenciam, e modelos como OSI e TCP/IP são mapas, não a realidade completa.</li>\n    <li><strong>O que lembrar:</strong> conectividade, protocolo, identidade, autorização e aplicação são coisas diferentes (ping respondendo não prova que o HTTPS funciona; 401 não é o mesmo que 403).</li>\n    <li><strong>Erro comum:</strong> usar o teste de uma camada para concluir sobre todas as outras.</li>\n    <li><strong>Uso real:</strong> troubleshooting, cloud, DevSecOps, IAM, SOC, arquitetura e resposta a incidentes.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    No Laboratório integrador do Módulo 0, você vai aplicar bits, codificação, sinais, métricas, protocolos e camadas a evidências reais, registrando o que cada comando prova e o que ele não prova.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Modelo mental preparatório para todas as camadas OSI"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IPv4",
      "TCP",
      "UDP",
      "DNS",
      "TLS",
      "HTTP",
      "OIDC"
    ],
    "dependsOn": [
      "bits",
      "sinais físicos",
      "latência",
      "largura de banda",
      "throughput",
      "protocolo"
    ],
    "enables": [
      "Modelo OSI",
      "troubleshooting estruturado",
      "arquitetura de redes",
      "cloud networking",
      "segurança em camadas"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Usuário diz que o sistema não abre",
      "API retorna timeout",
      "Login funciona mas acesso é negado",
      "Pipeline não consegue publicar artefato",
      "Aplicação funciona na rede local mas falha via VPN"
    ],
    "diagnosticQuestions": [
      "Existe link físico ou associação Wi-Fi?",
      "O host recebeu IP, máscara, gateway e DNS?",
      "O nome resolve para o destino esperado?",
      "Existe rota até o destino?",
      "A porta está acessível?",
      "TLS negocia com certificado válido?",
      "A aplicação retorna código de erro?",
      "A identidade foi autenticada?",
      "A autorização permite a ação?",
      "Há logs correlacionáveis?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\nroute print\nnslookup sistema.empresa.local\nTest-NetConnection sistema.empresa.local -Port 443",
        "purpose": "Coletar evidências de interface, rota, DNS e porta TCP.",
        "expectedObservation": "IP válido, gateway, DNS, rota e teste de porta coerente.",
        "interpretation": "Se DNS falha, investigue resolução. Se porta falha, investigue rota, firewall ou serviço. Se porta abre, suba para TLS/HTTP/aplicação."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\ndig sistema.empresa.local\ncurl -v https://sistema.empresa.local",
        "purpose": "Coletar evidências de endereço, rota, DNS, TLS e HTTP.",
        "expectedObservation": "Interface com IP, rota default, DNS resolvendo e resposta HTTP/TLS interpretável.",
        "interpretation": "curl -v mostra em qual etapa a conversa falha: resolução, conexão, TLS ou HTTP. Não use -k (--insecure) no diagnóstico: ele desliga a validação do certificado e esconde justamente a falha de TLS."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow ip route\nshow access-lists",
        "purpose": "Verificar estado de interfaces, rotas e políticas básicas no caminho.",
        "expectedObservation": "Interfaces up/up, rota esperada e ACL sem bloqueio indevido.",
        "interpretation": "Se rede e ACL estão corretas, a falha pode estar acima: transporte, TLS, aplicação ou identidade."
      }
    ],
    "decisionTree": [
      {
        "if": "Não há link físico ou Wi-Fi associado",
        "then": "Investigue camada física/enlace antes de DNS ou aplicação."
      },
      {
        "if": "Há IP, mas não há gateway ou rota default",
        "then": "Corrija configuração de rede antes de testar aplicação."
      },
      {
        "if": "DNS resolve, mas porta 443 não conecta",
        "then": "Investigue rota, firewall, security group, proxy ou serviço parado."
      },
      {
        "if": "Porta conecta, mas TLS falha",
        "then": "Investigue certificado, SNI, CA, inspeção TLS ou versão incompatível."
      },
      {
        "if": "HTTP responde 401",
        "then": "Investigue autenticação: credencial ausente ou inválida, token expirado, sessão ou provedor de identidade."
      },
      {
        "if": "HTTP responde 403",
        "then": "O servidor entendeu o pedido e recusou a ação: com o usuário já autenticado, investigue grupos, claims, papéis e políticas de autorização; confira também regras de WAF ou política que bloqueiam por origem."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Aplicar defesa em profundidade em múltiplas camadas.",
      "Registrar evidências de rede, aplicação, identidade e política com correlação temporal.",
      "Separar conectividade, autenticação e autorização nos diagnósticos.",
      "Documentar fluxos permitidos, portas, protocolos, identidades e responsáveis.",
      "Usar menor privilégio em rede, cloud e IAM."
    ],
    "badPractices": [
      "Abrir tráfego any-any para resolver chamado sem diagnóstico.",
      "Desativar validação TLS ou WAF sem plano de reversão.",
      "Coletar logs sem mascarar segredos."
    ],
    "commonErrors": [
      "Confundir bloqueio de firewall com bloqueio de IAM.",
      "Confundir token expirado com falha de rede.",
      "Confundir perda física com lentidão de aplicação.",
      "Confundir erro 403 com indisponibilidade."
    ],
    "vulnerabilities": [
      {
        "name": "Falsa sensação de segurança por camada única",
        "description": "A organização implementa um controle, como firewall ou TLS, e assume que isso cobre todos os riscos.",
        "defensiveExplanation": "Um controle protege uma responsabilidade específica, mas não substitui autenticação, autorização, hardening, logs e monitoramento.",
        "mitigation": "Defesa em profundidade, revisão de arquitetura, logs correlacionados e testes por camada."
      },
      {
        "name": "Liberação excessiva durante troubleshooting",
        "description": "Para resolver um incidente rapidamente, alguém libera tráfego amplo sem entender a camada da falha.",
        "defensiveExplanation": "A correção pode criar exposição lateral e permanecer esquecida.",
        "mitigation": "Mudanças temporárias com expiração, aprovação, evidência, logging e revisão pós-incidente."
      }
    ],
    "monitoring": [
      "Fluxos negados em firewall ou security group",
      "Erros TLS",
      "Códigos HTTP 401/403/404/429/5xx",
      "Falhas de autenticação e autorização",
      "Mudanças em regras de rede e IAM",
      "Aumento de tentativas laterais entre segmentos"
    ],
    "hardening": [
      "Segmentar redes por função",
      "Restringir portas e origens",
      "Aplicar TLS moderno",
      "Usar IAM com menor privilégio",
      "Ativar logs em pontos de controle",
      "Definir runbooks de troubleshooting em camadas"
    ],
    "detectionIdeas": [
      "Correlacionar falhas de conexão com mudanças de firewall",
      "Correlacionar 403 com alterações de grupo ou policy",
      "Comparar perda/jitter com erros de aplicação",
      "Alertar para mudanças que abrem tráfego amplo"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que modelos em camadas ajudam mais no diagnóstico do que uma lista solta de comandos?",
      "hints": [
        "Pense em hipótese e evidência.",
        "Pense em responsabilidades diferentes."
      ],
      "expectedIdeas": [
        "organização",
        "redução de tentativa e erro",
        "separação de responsabilidades",
        "comunicação entre equipes"
      ],
      "explanation": "Comandos sem modelo mental podem gerar dados sem interpretação. Camadas ajudam a saber o que cada comando confirma ou não confirma."
    },
    {
      "type": "diagnóstico",
      "question": "Uma aplicação abre normalmente na rede do escritório, mas falha quando o mesmo usuário está na VPN. Quais camadas mudam entre os dois caminhos e por onde você começaria?",
      "hints": [
        "O usuário, a senha e a aplicação são os mesmos.",
        "Pense no que a VPN altera: DNS, rota e políticas no caminho."
      ],
      "expectedIdeas": [
        "DNS interno resolvido pela VPN",
        "rota até a rede da aplicação",
        "firewall ou segmentação da VPN/ZTNA",
        "política de acesso por grupo",
        "teste de porta e TLS a partir da VPN",
        "logs da VPN e do firewall"
      ],
      "explanation": "Como identidade e aplicação são as mesmas nos dois casos, a diferença está no caminho. Compare DNS, rota, porta e políticas da VPN antes de mexer na aplicação ou nas credenciais."
    },
    {
      "type": "cenário real",
      "question": "Em cloud, uma VM privada não acessa uma API externa. Quais camadas você verificaria antes de pedir liberação ampla de firewall?",
      "hints": [
        "Pense em DNS, rota, NAT, security group e proxy.",
        "Pense em porta e TLS."
      ],
      "expectedIdeas": [
        "DNS",
        "route table",
        "NAT",
        "security group",
        "porta 443",
        "TLS",
        "proxy",
        "logs"
      ],
      "explanation": "Liberação ampla é arriscada. O diagnóstico em camadas busca evidência do ponto exato da falha."
    }
  ],
  "quiz": [
    {
      "id": "q0.8.1",
      "question": "Qual é a melhor descrição de pensamento em camadas?",
      "options": [
        "Um método para organizar responsabilidades e evidências de comunicação",
        "Uma lista fixa de comandos que deve ser executada sempre na mesma ordem",
        "Uma regra para começar todo diagnóstico pela camada de aplicação",
        "Um modelo que descreve exatamente os cabeçalhos de cada pacote real"
      ],
      "answer": 0,
      "explanation": "Camadas são um modelo mental para separar responsabilidades e investigar com evidências. Não são uma receita fixa de comandos nem uma descrição exata dos pacotes reais.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.8.2",
      "question": "Ping para um servidor responde, mas o site HTTPS não abre. O que é correto concluir?",
      "options": [
        "Toda a aplicação está saudável",
        "Há alguma conectividade, mas ainda é preciso testar porta, TLS e aplicação",
        "DNS obrigatoriamente está quebrado",
        "O problema só pode ser físico"
      ],
      "answer": 1,
      "explanation": "Ping é uma evidência limitada. HTTP/TLS pode falhar mesmo com ICMP funcionando.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.8.3",
      "question": "Qual frase representa melhor defesa em profundidade?",
      "options": [
        "Um firewall substitui IAM",
        "HTTPS substitui autorização",
        "Controles diferentes protegem responsabilidades diferentes",
        "VPN torna segmentação desnecessária"
      ],
      "answer": 2,
      "explanation": "Defesa em profundidade usa camadas complementares, não substituições perigosas.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.8.4",
      "question": "Uma API retorna 403. Qual hipótese deve ser considerada antes de alterar rota ou firewall?",
      "options": [
        "Cabo rompido entre o usuário e o switch",
        "Autorização: policy, grupo, claim ou permissão",
        "Rota ausente até a sub-rede da API",
        "Security group bloqueando a porta 443"
      ],
      "answer": 1,
      "explanation": "Um 403 é uma resposta HTTP: a requisição atravessou cabo, rota e security group e chegou a um controle de aplicação ou política, que a negou. Por isso a hipótese inicial é autorização.",
      "topic": "cloud",
      "difficulty": "iniciante",
      "type": "cloud"
    },
    {
      "id": "q0.8.5",
      "question": "Por que o modelo OSI é útil mesmo que a internet real use a pilha TCP/IP?",
      "options": [
        "Porque é um mapa didático para separar responsabilidades",
        "Porque todos os pacotes carregam exatamente sete cabeçalhos OSI",
        "Porque substitui documentação de rede",
        "Porque descreve exatamente como os sistemas operacionais implementam a pilha"
      ],
      "answer": 0,
      "explanation": "O OSI é muito útil como modelo pedagógico e de diagnóstico, mesmo quando a implementação real não encaixa perfeitamente em sete camadas rígidas.",
      "topic": "modelos",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.8.6",
      "question": "Um usuário recebe 401 em uma API; outro, já autenticado, recebe 403 na mesma API. Qual leitura é a mais adequada?",
      "options": [
        "Os dois casos indicam falha de rede entre cliente e API",
        "401 indica falta de permissão e 403 indica token ausente",
        "Os dois códigos significam que o serviço está indisponível",
        "401 aponta para autenticação; 403 aponta para autorização"
      ],
      "answer": 3,
      "explanation": "401 costuma indicar credencial ausente ou inválida (autenticação). 403 indica que o servidor entendeu o pedido e recusou a ação; para um usuário já autenticado, isso aponta para autorização. Em ambos os casos a rede entregou a requisição.",
      "topic": "identidade",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.8.7",
      "question": "Num acesso HTTPS, qual sequência descreve o encapsulamento, da aplicação até o meio físico?",
      "options": [
        "TCP, HTTP, IP, TLS, Ethernet/Wi-Fi, sinal",
        "HTTP, IP, TLS, TCP, Ethernet/Wi-Fi, sinal",
        "HTTP, TLS, TCP, IP, Ethernet/Wi-Fi, sinal",
        "Ethernet/Wi-Fi, IP, TCP, TLS, HTTP, sinal"
      ],
      "answer": 2,
      "explanation": "A requisição HTTP é protegida pelo TLS, carregada pelo TCP (portas), endereçada pelo IP, entregue ao próximo salto por Ethernet ou Wi-Fi e transmitida como sinal. No destino, o caminho inverso é o desencapsulamento.",
      "topic": "encapsulamento",
      "difficulty": "iniciante",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.8.1",
      "front": "O que significa pensar em camadas?",
      "back": "Separar uma comunicação em responsabilidades testáveis, como meio físico, enlace, rede, transporte, aplicação, identidade e política.",
      "tags": [
        "camadas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.6",
      "front": "A porta 443 conecta, mas o TLS falha. Onde investigar?",
      "back": "Certificado (validade, nome, CA confiável), SNI, inspeção TLS no caminho ou versão incompatível. A rede até a porta já funcionou.",
      "tags": [
        "troubleshooting",
        "tls"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.3",
      "front": "Qual é a diferença entre autenticação e autorização?",
      "back": "Autenticação verifica quem é o usuário ou sistema. Autorização decide o que essa identidade pode fazer.",
      "tags": [
        "iam",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.4",
      "front": "Por que camadas ajudam em cloud?",
      "back": "Porque cloud separa rota, security group, DNS, endpoint, load balancer, WAF, API e IAM, cada um com evidências próprias.",
      "tags": [
        "cloud"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.5",
      "front": "O que é defesa em profundidade?",
      "back": "Uso de controles complementares em várias camadas para reduzir risco caso um controle falhe ou seja insuficiente.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.8.7",
      "front": "Por que dizemos que modelos em camadas são mapas, não a realidade?",
      "back": "Porque nem todo protocolo se encaixa perfeitamente e alguns componentes, como proxies, firewalls de próxima geração, WAFs e service meshes, atuam em várias camadas ao mesmo tempo.",
      "tags": [
        "modelos"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.8.1",
      "type": "conceitual",
      "prompt": "Explique por que 'a rede está lenta' não é diagnóstico suficiente.",
      "expectedAnswer": "Porque lentidão pode vir de latência, perda, throughput, DNS, proxy, TLS, servidor, banco, aplicação, identidade ou endpoint. É preciso separar hipóteses por camada e coletar evidências.",
      "explanation": "Termos vagos não apontam causa. Camadas transformam sintoma em perguntas testáveis."
    },
    {
      "id": "ex0.8.2",
      "type": "diagnóstico",
      "prompt": "Um usuário acessa uma aplicação, faz login, mas recebe 403. Liste três evidências que você coletaria.",
      "expectedAnswer": "Logs da aplicação, logs do provedor de identidade, grupos/claims/permissões do usuário, rota da requisição e código HTTP completo com horário de correlação.",
      "explanation": "A tela de login e autenticação indicam que o foco inicial deve subir para autorização e aplicação."
    },
    {
      "id": "ex0.8.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma pilha simples para acesso a uma API cloud contendo rede, transporte, TLS, HTTP, API Gateway e IAM.",
      "expectedAnswer": "Uma resposta adequada mostra cliente, DNS/rede/rota, TCP 443, TLS, HTTP, API Gateway, validação de token/IAM e backend.",
      "explanation": "O objetivo é visualizar responsabilidades, não desenhar todos os detalhes do provedor."
    }
  ],
  "challenge": {
    "title": "Runbook de primeira resposta em camadas",
    "scenario": "Sua equipe recebe chamados frequentes de 'sistema fora'. Cada analista testa uma coisa diferente e as escalas para rede, segurança, plataforma e aplicação ficam confusas.",
    "tasks": [
      "Criar um checklist com pelo menos seis camadas",
      "Definir uma pergunta por camada",
      "Definir uma evidência ou comando por camada",
      "Indicar quando escalar para rede, segurança, IAM, plataforma ou aplicação",
      "Definir quais dados não devem ser expostos nos prints ou logs"
    ],
    "constraints": [
      "Não usar testes ofensivos",
      "Não pedir liberação ampla de firewall como primeira ação",
      "Separar autenticação de autorização",
      "Incluir pelo menos um ponto de cloud e um ponto de segurança"
    ],
    "expectedDeliverables": [
      "Checklist em camadas",
      "Tabela de evidências",
      "Critério de escalonamento",
      "Cuidados de segurança e privacidade"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta de camadas",
        "points": 30,
        "description": "O checklist diferencia meio, rede, transporte, aplicação, identidade e política."
      },
      {
        "criterion": "Evidências verificáveis",
        "points": 30,
        "description": "Cada hipótese possui comando, log ou fonte de evidência."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "Evita exposição de segredos e mudanças perigosas sem autorização."
      },
      {
        "criterion": "Aplicabilidade corporativa",
        "points": 20,
        "description": "O runbook pode ser usado por NOC, SOC, suporte, plataforma e aplicação."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução deve começar definindo que 'sistema fora' é sintoma, não causa. Em seguida, organiza o diagnóstico em camadas para evitar saltos lógicos.",
    "steps": [
      "Validar interface, link ou Wi-Fi",
      "Validar IP, gateway e DNS",
      "Validar resolução do nome",
      "Validar rota e porta",
      "Validar TLS e HTTP",
      "Validar autenticação",
      "Validar autorização",
      "Correlacionar logs de aplicação, IAM, proxy, WAF e firewall",
      "Registrar evidências e escalar com contexto"
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar any-any no firewall para testar",
        "whyItIsWrong": "Cria risco e não identifica a camada exata da falha."
      },
      {
        "answer": "Dizer que não é rede porque ping responde",
        "whyItIsWrong": "Ping não valida portas, TLS, HTTP, aplicação ou identidade."
      },
      {
        "answer": "Redefinir senha quando há erro 403",
        "whyItIsWrong": "403 tende a indicar autorização, não necessariamente autenticação."
      }
    ],
    "finalAnswer": "Um runbook adequado separa link/interface, IP/rota, DNS, porta/transporte, TLS/HTTP, aplicação, autenticação, autorização e logs. Cada etapa tem evidência própria e critérios claros de escalonamento."
  },
  "glossary": [
    {
      "term": "Camada",
      "shortDefinition": "Responsabilidade lógica em um modelo de comunicação.",
      "longDefinition": "Uma camada agrupa funções parecidas para facilitar arquitetura, interoperabilidade e troubleshooting.",
      "example": "A camada de transporte lida com portas e comunicação entre processos.",
      "relatedTerms": [
        "modelo OSI",
        "TCP/IP",
        "encapsulamento"
      ],
      "relatedLessons": [
        "0.8",
        "2.1"
      ]
    },
    {
      "term": "Encapsulamento",
      "shortDefinition": "Processo de colocar dados de uma camada dentro da estrutura da camada inferior.",
      "longDefinition": "Quando uma mensagem de aplicação passa pela pilha, cada camada adiciona informações necessárias para sua responsabilidade.",
      "example": "HTTP é carregado por TLS/TCP/IP/Ethernet em muitos acessos web.",
      "relatedTerms": [
        "pacote",
        "quadro",
        "segmento"
      ],
      "relatedLessons": [
        "0.8",
        "2.4"
      ]
    },
    {
      "term": "Troubleshooting em camadas",
      "shortDefinition": "Método de diagnóstico que testa hipóteses por responsabilidade.",
      "longDefinition": "Evita conclusões precipitadas ao separar sintomas físicos, lógicos, de transporte, aplicação, identidade e política.",
      "example": "Testar IP, DNS, porta, TLS e HTTP em sequência.",
      "relatedTerms": [
        "evidência",
        "hipótese"
      ],
      "relatedLessons": [
        "0.8",
        "15.1"
      ]
    },
    {
      "term": "Defesa em profundidade",
      "shortDefinition": "Uso de controles complementares em várias camadas.",
      "longDefinition": "Uma falha em um controle não deve expor completamente o ambiente, porque outros controles reduzem impacto.",
      "example": "Segmentação, firewall, TLS, MFA, autorização e logs atuando juntos.",
      "relatedTerms": [
        "segurança em camadas",
        "menor privilégio"
      ],
      "relatedLessons": [
        "0.8",
        "13.1"
      ]
    },
    {
      "term": "Autorização",
      "shortDefinition": "Decisão sobre o que uma identidade pode fazer.",
      "longDefinition": "Depois de autenticar quem é o usuário ou sistema, a autorização verifica permissões, grupos, claims, papéis e políticas.",
      "example": "Usuário logado recebe 403 por não pertencer ao grupo correto.",
      "relatedTerms": [
        "autenticação",
        "IAM",
        "claims"
      ],
      "relatedLessons": [
        "0.8"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 0, aulas 0.1 a 0.7",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Fundamentos necessários para o pensamento em camadas."
    },
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Open Systems Interconnection Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual clássica para o modelo OSI."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "O pensamento em camadas será usado em CI/CD, Kubernetes, proxies, ingress e observabilidade."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Autenticação, autorização, claims e políticas são camadas modernas acima da conectividade."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "base",
      "reason": "Pipelines, containers e Kubernetes exigem separar rede, plataforma, API, identidade e política."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "base",
      "reason": "A aula diferencia conectividade, autenticação e autorização, base para IAM."
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
      "0.9"
    ]
  }
};
