export const lesson0008 = {
  "id": "0.8",
  "moduleId": "m00",
  "order": 8,
  "title": "Como pensar em camadas",
  "subtitle": "O método mental que separa problema físico, endereçamento, transporte, aplicação, identidade e segurança sem transformar troubleshooting em adivinhação.",
  "duration": "55-80 min",
  "estimatedStudyTimeMinutes": 80,
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
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Imagine que um usuário abre chamado dizendo: <strong>\"o sistema não funciona\"</strong>. Essa frase pode significar dezenas de coisas: notebook sem Wi-Fi, cabo ruim, IP errado, gateway ausente, DNS quebrado, porta bloqueada, TLS inválido, proxy exigindo autenticação, API fora do ar, token expirado, usuário sem permissão ou regra de WAF bloqueando a requisição.\n  </p>\n  <p>\n    Sem um método, o técnico pula de hipótese em hipótese: testa DNS, culpa firewall, reinicia serviço, troca cabo, limpa cache, altera regra, pede para o usuário tentar de novo. Às vezes acerta por sorte. Em ambientes corporativos, cloud e segurança, esse tipo de tentativa custa tempo, aumenta risco e pode mascarar incidentes.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> uma aplicação interna está inacessível. O ping para o servidor responde, mas o login falha. Um analista iniciante conclui que \"a rede está funcionando\". Outro conclui que \"é problema de senha\". Um diagnóstico em camadas mostra que ping só testa uma parte pequena do caminho; login depende de DNS, rota, porta, TLS, HTTP, sessão, provedor de identidade, token, autorização e aplicação.\n  </div>\n  <p>\n    Pensar em camadas é criar uma escada mental. Você não precisa decorar tudo de uma vez. Você aprende a perguntar: o sinal chega? O enlace está ativo? Existe endereço? Existe rota? A porta responde? O protocolo negocia? A aplicação entende? A identidade é válida? A política permite? Esse método prepara você para o Modelo OSI, TCP/IP, cloud networking, IAM e troubleshooting profissional.\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    Redes cresceram a partir de várias tecnologias diferentes: enlaces físicos, protocolos de fabricantes, sistemas operacionais, aplicações e padrões abertos. À medida que a comunicação ficou mais complexa, tornou-se difícil explicar tudo como uma única coisa chamada \"rede\". Era preciso dividir responsabilidades.\n  </p>\n  <p>\n    Modelos em camadas surgiram para organizar essa complexidade. O modelo OSI ficou famoso como referência didática e conceitual. A pilha TCP/IP se tornou a base prática da internet. Em ambientes modernos, ainda adicionamos camadas operacionais acima da aplicação: identidade, autorização, políticas, observabilidade, automação, supply chain e governança.\n  </p>\n  <p>\n    A história importante aqui não é decorar sete nomes. É entender por que modelos em camadas existem: eles permitem que equipes diferentes trabalhem em partes diferentes do problema. Um fabricante de placa de rede não precisa implementar HTTP. Um desenvolvedor de API não precisa manipular sinal elétrico no cabo. Um analista de segurança pode investigar logs de identidade sem ignorar evidências de rede.\n  </p>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema central é que uma comunicação real atravessa muitas responsabilidades ao mesmo tempo. Um simples acesso a <code>https://sistema.empresa.local</code> pode envolver Wi-Fi, switch, VLAN, ARP, IP, roteamento, NAT, firewall, DNS, TCP, TLS, HTTP, cookie, token, sessão, banco de dados e autorização.\n  </p>\n  <p>\n    Se tudo isso for tratado como \"a rede\", o diagnóstico fica impreciso. Você pode trocar DNS quando a falha é TLS. Pode liberar firewall quando a falha é autorização. Pode culpar o usuário quando o problema é rota. Pode abrir uma porta perigosa quando bastava corrigir um cabeçalho no proxy.\n  </p>\n  <ul>\n    <li><strong>Sem camadas:</strong> os sintomas se misturam e o troubleshooting vira tentativa.</li>\n    <li><strong>Com camadas:</strong> cada hipótese é testada no lugar certo, com evidência adequada.</li>\n    <li><strong>Em segurança:</strong> camadas ajudam a separar conectividade, autenticação, autorização e detecção.</li>\n    <li><strong>Em cloud:</strong> camadas evitam confundir route table, security group, DNS privado, load balancer e IAM.</li>\n  </ul>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    A ideia de camadas evoluiu de modelos rígidos para modelos práticos de diagnóstico. O OSI é excelente para ensinar responsabilidades. O TCP/IP é excelente para entender a internet real. Em empresas modernas, adicionamos camadas de plataforma, identidade e segurança porque muitos problemas acontecem acima do transporte.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como ajuda</th><th>Limitação</th><th>Uso prático</th></tr></thead>\n    <tbody>\n      <tr><td>Ver tudo como \"rede\"</td><td>É simples no começo</td><td>Mistura causas diferentes</td><td>Serve apenas para conversas superficiais</td></tr>\n      <tr><td>Modelo OSI</td><td>Separa responsabilidades em sete camadas</td><td>Nem todo protocolo real encaixa perfeitamente</td><td>Ótimo para ensino e troubleshooting</td></tr>\n      <tr><td>Pilha TCP/IP</td><td>Representa melhor a internet prática</td><td>Menos detalhada didaticamente</td><td>Ótima para operação real</td></tr>\n      <tr><td>Camadas modernas</td><td>Incluem identidade, política, observabilidade e automação</td><td>Exigem visão interdisciplinar</td><td>Essenciais para cloud, DevSecOps e segurança</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Pensar em camadas significa dividir uma comunicação complexa em responsabilidades menores, testáveis e explicáveis. Cada camada responde a uma pergunta diferente. A camada física pergunta se existe sinal. A camada de enlace pergunta se há comunicação local. A camada de rede pergunta se existe endereçamento e caminho. A camada de transporte pergunta se há conversa entre processos. A camada de aplicação pergunta se a mensagem faz sentido. Camadas modernas de identidade e segurança perguntam quem é o solicitante, o que ele pode fazer e como isso será registrado.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> pensamento em camadas é um modelo mental de arquitetura e troubleshooting que organiza protocolos, componentes e evidências por responsabilidade, evitando misturar problemas físicos, lógicos, de aplicação, identidade e segurança.\n  </div>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    Em uma comunicação real, dados são encapsulados. A aplicação produz uma mensagem. O transporte adiciona informações para identificar processos e controlar a conversa. A rede adiciona endereços para atravessar caminhos. O enlace prepara a entrega local. A camada física transforma tudo em sinal. No destino, o processo ocorre no sentido inverso.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação:</strong> o navegador monta uma requisição HTTP.</li>\n    <li><strong>Segurança/aplicação:</strong> TLS protege a conversa e valida certificado.</li>\n    <li><strong>Transporte:</strong> TCP identifica portas e controla sessão.</li>\n    <li><strong>Rede:</strong> IP define origem, destino e caminho entre redes.</li>\n    <li><strong>Enlace:</strong> Ethernet ou Wi-Fi entrega para o próximo salto local.</li>\n    <li><strong>Física:</strong> cobre, fibra ou rádio carregam sinais.</li>\n    <li><strong>Identidade e política:</strong> acima da aplicação, tokens, claims e regras decidem acesso.</li>\n  </ol>\n  <p>\n    O ponto mais importante: camadas não são gavetas isoladas. Elas se influenciam. Um proxy pode mexer em HTTP. Um firewall pode bloquear TCP. Um problema físico pode gerar retransmissões. Um certificado TLS pode impedir a aplicação de começar. Uma política de identidade pode negar acesso mesmo quando todo o caminho de rede está saudável.\n  </p>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Em arquitetura, pensar em camadas ajuda a desenhar sistemas compreensíveis. Um acesso corporativo típico pode ser visto como uma pilha de responsabilidades: dispositivo do usuário, rede local, borda, rede interna ou cloud, balanceador, serviço, identidade, autorização, logs e monitoramento.\n  </p>\n  <ul>\n    <li><strong>Componentes físicos:</strong> cabo, rádio, switch, roteador, AP, link WAN.</li>\n    <li><strong>Componentes lógicos:</strong> VLAN, sub-rede, rota, NAT, firewall, DNS.</li>\n    <li><strong>Componentes de transporte/aplicação:</strong> porta, sessão, TLS, HTTP, API, proxy.</li>\n    <li><strong>Componentes de segurança:</strong> WAF, EDR, SIEM, IAM, MFA, policy engine, logs.</li>\n    <li><strong>Pontos de falha:</strong> qualquer camada pode quebrar, bloquear, atrasar, alterar ou registrar a comunicação.</li>\n  </ul>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Pense em uma entrega de documento dentro de uma empresa. Primeiro, precisa existir uma estrada até o prédio. Depois, o entregador precisa encontrar o endereço correto. Na recepção, alguém verifica se ele pode entrar. No andar certo, ele procura a sala. A pessoa que recebe verifica se o documento é válido e se a solicitação faz sentido. Por fim, a empresa registra a entrega.\n  </p>\n  <p>\n    Cada etapa é uma camada. Estrada não substitui autorização. Endereço correto não garante permissão. Identidade válida não garante que o documento esteja correto. Registro de entrega não prova que o conteúdo era legítimo.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> em redes, as camadas podem acontecer muito rapidamente, em paralelo, com encapsulamento, criptografia, cache, proxies e automação. A analogia ajuda a pensar em responsabilidades, mas não representa todos os detalhes técnicos do pacote real.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Seu notebook não abre um site. Pensando em camadas, você não começa alterando o DNS sem motivo. Primeiro verifica se o Wi-Fi está conectado. Depois verifica se recebeu IP. Depois testa gateway. Depois testa resolução de nomes. Depois testa conexão na porta. Depois observa TLS/HTTP. Por fim, analisa login, sessão e erro da aplicação.\n  </p>\n  <table class=\"data-table\">\n    <thead><tr><th>Pergunta</th><th>Camada aproximada</th><th>Ferramenta</th></tr></thead>\n    <tbody>\n      <tr><td>Estou conectado ao meio?</td><td>Física/enlace</td><td>Ícone de rede, status da interface</td></tr>\n      <tr><td>Tenho IP e gateway?</td><td>Rede</td><td><code>ipconfig</code>, <code>ip addr</code>, <code>ip route</code></td></tr>\n      <tr><td>O nome resolve?</td><td>Aplicação/serviço essencial</td><td><code>nslookup</code>, <code>dig</code></td></tr>\n      <tr><td>A porta responde?</td><td>Transporte</td><td><code>Test-NetConnection</code>, <code>curl -v</code></td></tr>\n      <tr><td>A aplicação aceita?</td><td>Aplicação/identidade</td><td>Status HTTP, logs, token, sessão</td></tr>\n    </tbody>\n  </table>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, um usuário remoto acessa um sistema financeiro. O caminho pode envolver VPN ou ZTNA, DNS interno, firewall, proxy, balanceador, TLS, aplicação, Active Directory ou provedor de identidade, autorização por grupo e logs em SIEM. Se o usuário reclama de falha, cada equipe pode enxergar apenas uma parte.\n  </p>\n  <p>\n    O pensamento em camadas cria uma linguagem comum. A equipe de rede valida rota, perda, latência e firewall. A equipe de segurança valida logs, política e bloqueios. A equipe de identidade valida autenticação, MFA, grupos e claims. A equipe da aplicação valida status HTTP, sessão, permissões e backend. A equipe de plataforma valida ingress, service, pod, health check e DNS interno.\n  </p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, muitas falhas parecem iguais para o usuário: \"não acessa\". Mas a causa pode estar em uma route table, security group, NSG, DNS privado, endpoint privado, NAT Gateway, load balancer, certificado, WAF, API Gateway, IAM ou política da aplicação.\n  </p>\n  <p>\n    Um exemplo: uma VM em subnet privada precisa chamar uma API externa. Se não há rota para NAT, o tráfego nem sai. Se o security group nega saída, a conexão falha. Se o DNS resolve para endpoint privado errado, vai para outro caminho. Se TLS falha, a porta pode até abrir, mas a aplicação não negocia. Se a API retorna 403, a rede funcionou, mas a autorização negou.\n  </p>\n  <div class=\"callout callout--security\">\n    <strong>Regra prática:</strong> em cloud, conectividade, exposição e permissão são coisas diferentes. Abrir caminho de rede não significa conceder acesso legítimo; negar IAM não significa que a rede esteja quebrada.\n  </div>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Um pipeline que publica uma imagem em um registry pode falhar em várias camadas. O runner pode não resolver o DNS do registry. O firewall pode bloquear a porta 443. O proxy pode exigir configuração. TLS pode falhar por CA ausente. O registry pode rejeitar autenticação. A política pode negar push para aquela tag. O scanner pode bloquear por vulnerabilidade crítica. Tudo aparece como falha de pipeline, mas não é o mesmo problema.\n  </p>\n  <p>\n    Pensar em camadas evita correções ruins, como colocar segredo estático no pipeline quando o problema era OIDC audience incorreta, ou liberar saída irrestrita quando bastava configurar proxy. Em DevSecOps, camadas conectam rede, plataforma, identidade, supply chain e política como partes de um mesmo fluxo controlado.\n  </p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Em Segurança da Informação, camadas ajudam tanto na defesa quanto na investigação. Um controle em uma camada não substitui controles nas outras. TLS protege confidencialidade em trânsito, mas não decide autorização. Firewall reduz exposição, mas não corrige senha fraca. MFA reduz risco de credencial roubada, mas não corrige servidor exposto. Segmentação reduz movimento lateral, mas não substitui patching e monitoramento.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Erro comum</th><th>Confusão de camada</th><th>Risco</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Achar que ping prova que sistema funciona</td><td>Rede vs aplicação</td><td>Ignorar TLS, HTTP, login e autorização</td><td>Testar porta, protocolo e logs de aplicação</td></tr>\n      <tr><td>Achar que NAT é firewall</td><td>Endereçamento vs política</td><td>Exposição acidental</td><td>Usar regras explícitas, logs e menor privilégio</td></tr>\n      <tr><td>Achar que VPN autoriza tudo</td><td>Caminho vs permissão</td><td>Acesso lateral amplo</td><td>ZTNA, segmentação, IAM e auditoria</td></tr>\n      <tr><td>Achar que HTTPS valida usuário</td><td>Criptografia vs identidade</td><td>Aplicação exposta com sessão fraca</td><td>Autenticação, autorização e gestão de sessão</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m00l08-title m00l08-desc\">\n    <title id=\"m00l08-title\">Pensamento em camadas aplicado ao troubleshooting</title>\n    <desc id=\"m00l08-desc\">Diagrama em pilha mostrando física, enlace, rede, transporte, aplicação, identidade, política e observabilidade.</desc>\n    <defs>\n      <marker id=\"m00l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"80\" y=\"400\" width=\"820\" height=\"48\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"490\" y=\"430\" text-anchor=\"middle\" class=\"svg-label\">Física: sinal, cabo, fibra, rádio, energia, interferência</text>\n    <rect x=\"110\" y=\"345\" width=\"760\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"490\" y=\"375\" text-anchor=\"middle\" class=\"svg-label\">Enlace: Ethernet, Wi-Fi, MAC, VLAN, quadro local</text>\n    <rect x=\"140\" y=\"290\" width=\"700\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"490\" y=\"320\" text-anchor=\"middle\" class=\"svg-label\">Rede: IP, rota, gateway, sub-rede, caminho</text>\n    <rect x=\"170\" y=\"235\" width=\"640\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Transporte: TCP, UDP, portas, sessão, timeout</text>\n    <rect x=\"200\" y=\"180\" width=\"580\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"490\" y=\"210\" text-anchor=\"middle\" class=\"svg-label\">Aplicação: DNS, HTTP, TLS, API, erro, payload</text>\n    <rect x=\"230\" y=\"125\" width=\"520\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"490\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">Identidade e autorização: usuário, token, claims, grupos</text>\n    <rect x=\"260\" y=\"70\" width=\"460\" height=\"48\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"490\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Política e observabilidade: WAF, logs, SIEM, auditoria</text>\n    <line x1=\"930\" y1=\"425\" x2=\"930\" y2=\"92\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l08-arrow)\" />\n    <text x=\"925\" y=\"260\" text-anchor=\"end\" class=\"svg-label svg-label--small\">subir hipóteses</text>\n    <line x1=\"50\" y1=\"92\" x2=\"50\" y2=\"425\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l08-arrow)\" />\n    <text x=\"55\" y=\"260\" class=\"svg-label svg-label--small\">descer para validar base</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios treinam classificação. O objetivo não é decorar camadas, mas aprender a transformar sintomas vagos em perguntas testáveis.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio coloca você no papel de analista que precisa organizar um incidente de acesso a sistema interno sem confundir conectividade, autenticação, autorização e aplicação.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra como priorizar evidências. O mais importante é evitar conclusões grandes a partir de testes pequenos, como achar que ping bem-sucedido prova que uma aplicação está saudável.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> camadas são um método para organizar responsabilidades e evidências.</li>\n    <li><strong>O que lembrar:</strong> conectividade, protocolo, identidade, autorização e aplicação são coisas diferentes.</li>\n    <li><strong>Erro comum:</strong> usar um teste de uma camada para concluir sobre todas as outras.</li>\n    <li><strong>Uso real:</strong> troubleshooting, cloud, DevSecOps, IAM, SOC, arquitetura e resposta a incidentes.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    A próxima aula será o laboratório integrador do Módulo 0. Você irá reunir representação digital, bits, codificação, métricas, sinais, protocolos e camadas em uma análise prática. Depois, a revisão do Módulo 0 fechará a base antes de entrar em Fundamentos de Redes no Módulo 1 e Modelo OSI no Módulo 2.\n  </p>\n</section>"
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
  "deepDive": {
    "mentalModel": "Não trate 'rede' como uma caixa preta. Transforme cada sintoma em uma pergunta por responsabilidade: meio, enlace, endereço, rota, porta, protocolo, aplicação, identidade, política e evidência.",
    "keyTerms": [
      "camada",
      "encapsulamento",
      "desencapsulamento",
      "pilha",
      "responsabilidade",
      "evidência",
      "hipótese"
    ],
    "limitations": [
      "Modelos em camadas simplificam a realidade e nem sempre representam exatamente como uma implementação funciona.",
      "Alguns componentes atuam em múltiplas camadas, como proxies, firewalls de próxima geração, service meshes e WAFs.",
      "Camadas ajudam a pensar, mas não substituem logs, captura de tráfego, métricas e documentação."
    ],
    "whenToUse": [
      "Ao investigar chamados vagos como 'sistema fora', 'internet lenta' ou 'login não funciona'.",
      "Ao desenhar arquitetura de rede, cloud, plataforma ou IAM.",
      "Ao explicar incidentes para equipes diferentes.",
      "Ao criar checklists de operação e resposta a incidentes."
    ],
    "whenNotToUse": [
      "Não use camadas como dogma para ignorar evidências diretas.",
      "Não force todo problema moderno a caber perfeitamente no OSI.",
      "Não use o modelo para empurrar responsabilidade para outra equipe sem validação."
    ],
    "operationalImpact": [
      "Melhora a triagem de incidentes e reduz tentativa e erro.",
      "Exige documentação de caminhos, dependências, portas, DNS, identidade e políticas.",
      "Facilita comunicação entre rede, segurança, plataforma, cloud e aplicação."
    ],
    "financialImpact": [
      "Diagnóstico melhor reduz tempo de indisponibilidade e evita compras erradas de banda, appliances ou licenças.",
      "Em cloud, evita liberar recursos caros ou abrir arquiteturas inseguras por diagnóstico incorreto.",
      "Exige investimento em observabilidade, logs e treinamento."
    ],
    "securityImpact": [
      "Ajuda a aplicar defesa em profundidade.",
      "Evita confundir criptografia com autorização ou conectividade com permissão.",
      "Melhora investigação de movimento lateral, exfiltração, bloqueios e falhas de identidade."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que ping bem-sucedido prova que o sistema funciona.",
      "whyItHappens": "Ping é fácil e dá resposta rápida.",
      "consequence": "Ignora portas, TLS, HTTP, autenticação, autorização e aplicação.",
      "correction": "Use ping apenas como evidência parcial de conectividade e continue subindo as camadas."
    },
    {
      "mistake": "Culpar DNS para qualquer falha de acesso.",
      "whyItHappens": "DNS aparece em muitos sintomas.",
      "consequence": "Perde tempo quando o problema é firewall, TLS, token ou aplicação.",
      "correction": "Teste resolução, mas depois valide porta, certificado, HTTP e logs."
    },
    {
      "mistake": "Confundir autenticação com autorização.",
      "whyItHappens": "Ambas aparecem no login.",
      "consequence": "Usuário autenticado pode continuar sem acesso e o diagnóstico fica errado.",
      "correction": "Separe quem é o usuário de quais ações ele pode executar."
    },
    {
      "mistake": "Tratar cloud networking como rede tradicional simples.",
      "whyItHappens": "Termos como subnet, rota e firewall parecem familiares.",
      "consequence": "Ignora security groups, identidade, endpoints privados, load balancers e políticas gerenciadas.",
      "correction": "Mapeie camadas cloud específicas e evidências de cada serviço."
    }
  ],
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
        "command": "ip addr\nip route\ndig sistema.empresa.local\ncurl -vk https://sistema.empresa.local",
        "purpose": "Coletar evidências de endereço, rota, DNS, TLS e HTTP.",
        "expectedObservation": "Interface com IP, rota default, DNS resolvendo e resposta HTTP/TLS interpretável.",
        "interpretation": "curl -v mostra em qual etapa a conversa falha: resolução, conexão, TLS ou HTTP."
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
        "if": "HTTP responde 401 ou 403",
        "then": "Investigue autenticação, token, sessão, grupos e autorização."
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
      "Assumir que VPN significa autorização ampla.",
      "Assumir que HTTPS torna uma aplicação segura por completo.",
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
      "question": "Um usuário consegue abrir a tela de login, autentica com sucesso, mas recebe 403. Você começaria por cabo, DNS, firewall ou autorização?",
      "hints": [
        "A tela abriu.",
        "A autenticação funcionou.",
        "403 indica negação de acesso pela aplicação ou política."
      ],
      "expectedIdeas": [
        "autorização",
        "grupos",
        "claims",
        "permissão",
        "logs da aplicação/IAM"
      ],
      "explanation": "A conectividade básica e parte da aplicação funcionaram. O foco inicial deve ser autorização, sem ignorar logs correlacionados."
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
      "type": "conceito",
      "q": "Qual é a melhor descrição de pensamento em camadas?",
      "opts": [
        "Um método para organizar responsabilidades e evidências de comunicação",
        "Uma regra que substitui todos os comandos de diagnóstico",
        "Uma técnica para sempre culpar o firewall",
        "Um modelo usado apenas por fabricantes de hardware"
      ],
      "a": 0,
      "exp": "Camadas são um modelo mental para separar responsabilidades e investigar com evidências.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q0.8.2",
      "type": "diagnóstico",
      "q": "Ping para um servidor responde, mas o site HTTPS não abre. O que é correto concluir?",
      "opts": [
        "Toda a aplicação está saudável",
        "Há alguma conectividade, mas ainda é preciso testar porta, TLS e aplicação",
        "DNS obrigatoriamente está quebrado",
        "O problema só pode ser físico"
      ],
      "a": 1,
      "exp": "Ping é uma evidência limitada. HTTP/TLS pode falhar mesmo com ICMP funcionando.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q0.8.3",
      "type": "segurança",
      "q": "Qual frase representa melhor defesa em profundidade?",
      "opts": [
        "Um firewall substitui IAM",
        "HTTPS substitui autorização",
        "Controles diferentes protegem responsabilidades diferentes",
        "VPN torna segmentação desnecessária"
      ],
      "a": 2,
      "exp": "Defesa em profundidade usa camadas complementares, não substituições perigosas.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q0.8.4",
      "type": "cloud",
      "q": "Uma API retorna 403. Qual hipótese deve ser considerada antes de alterar rota ou firewall?",
      "opts": [
        "Autorização, policy, grupo, claim ou permissão",
        "Cabo rompido no datacenter do usuário",
        "Máscara de rede sempre errada",
        "Velocidade do monitor"
      ],
      "a": 0,
      "exp": "403 normalmente indica que a requisição chegou a algum controle de aplicação ou política, mas foi negada.",
      "difficulty": "iniciante",
      "topic": "cloud"
    },
    {
      "id": "q0.8.5",
      "type": "comparação",
      "q": "Por que o modelo OSI é útil mesmo que a internet real use a pilha TCP/IP?",
      "opts": [
        "Porque é um mapa didático para separar responsabilidades",
        "Porque todos os pacotes carregam exatamente sete cabeçalhos OSI",
        "Porque substitui documentação de rede",
        "Porque elimina necessidade de logs"
      ],
      "a": 0,
      "exp": "O OSI é muito útil como modelo pedagógico e de diagnóstico, mesmo quando a implementação real não encaixa perfeitamente em sete camadas rígidas.",
      "difficulty": "iniciante",
      "topic": "modelos"
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
      "id": "fc0.8.2",
      "front": "Ping bem-sucedido prova que a aplicação funciona?",
      "back": "Não. Ele indica alguma conectividade, mas não valida porta, TLS, HTTP, autenticação, autorização ou lógica da aplicação.",
      "tags": [
        "troubleshooting"
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
