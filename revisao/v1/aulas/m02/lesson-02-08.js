export const lesson0208 = {
  "id": "2.8",
  "moduleId": "m02",
  "order": 8,
  "title": "Diagnóstico por camadas: método prático de troubleshooting",
  "subtitle": "Como transformar sintomas vagos em hipóteses testáveis com o Modelo OSI, comandos e evidências bem interpretadas.",
  "duration": "115-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "modelo osi",
    "troubleshooting",
    "diagnóstico",
    "evidências",
    "camadas",
    "cloud",
    "devsecops",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como ferramenta de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento e PDUs, base para entender onde cada evidência aparece."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.3-2.7",
      "reason": "As aulas anteriores detalharam as camadas física, enlace, rede, transporte e superiores."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "A aula 1.9 apresentou comandos iniciais como ipconfig, ping, arp, tracert e nslookup."
    }
  ],
  "objectives": [
    "Aplicar o Modelo OSI como método prático de troubleshooting.",
    "Diferenciar sintoma, hipótese, evidência, interpretação e ação corretiva.",
    "Escolher comandos adequados para cada camada sem executar testes invasivos.",
    "Separar falhas de física, enlace, rede, transporte, TLS, sessão, aplicação, autenticação e autorização.",
    "Registrar evidências de forma útil, segura e sanitizada.",
    "Evitar mudanças sem causa provável comprovada."
  ],
  "learningOutcomes": [
    "Dado um sintoma vago, o aluno cria uma matriz de investigação por camadas.",
    "Dado um conjunto de outputs, o aluno identifica a camada provável da falha.",
    "Dado um problema de aplicação, o aluno evita concluir que é rede apenas com base em ping ou porta.",
    "Dado um cenário cloud ou DevSecOps, o aluno separa rede, política, TLS, identidade e aplicação.",
    "Dado um incidente, o aluno coleta evidências com escopo e sanitização."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\"A rede está lenta\" ou \"o sistema não abre\" não é diagnóstico. A mesma frase pode esconder cabo ruim, VLAN errada, rota ausente, DNS falhando, porta bloqueada, TLS quebrado, WAF negando, token expirado, uma aplicação respondendo erro 500 ou só uma expectativa incorreta do usuário.</p>\n  <p>O diagnóstico por camadas transforma essa reclamação vaga em uma investigação organizada: em vez de rodar comandos aleatórios, você percorre a pilha OSI coletando uma evidência por camada.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma aplicação interna \"não abre\" para um usuário remoto. O ping para o gateway funciona, o DNS resolve e a porta 443 responde, mas o navegador mostra erro de certificado. Quem testa só conectividade IP conclui que \"está tudo certo\". Quem olha por camadas vê que a falha está acima do transporte, na camada de apresentação (TLS).</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Sintomas parecidos nascem em camadas diferentes. O usuário vê \"não funciona\"; você precisa separar falha de meio físico, domínio de broadcast, rota, porta, sessão, certificado, payload, autenticação e autorização. Em cloud e Zero Trust, uma falha de identidade pode parecer rede, e uma falha de rede pode parecer aplicação.</p>\n  <p>Sem método, o troubleshooting vira tentativa e erro: um técnico troca o cabo, outro reinicia o roteador, outro libera o firewall, outro culpa o DNS. O Modelo OSI não é a implementação literal da internet, mas virou a linguagem operacional que evita isso, porque cada camada tem sintomas, ferramentas, logs, responsáveis e riscos próprios.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem ordem:</strong> comandos isolados, sem hipótese; um resultado bom em um comando não prova que o resto funciona.</li>\n    <li><strong>Sem evidência:</strong> a equipe muda firewall, DNS ou aplicação sem provar onde está a falha.</li>\n    <li><strong>Sem separação por camadas:</strong> um HTTP 403 é confundido com queda de rede, e uma rota ausente, com problema de aplicação.</li>\n    <li><strong>Sem visão do caminho:</strong> olhar só o host perde as evidências de firewall, proxy, WAF, cloud e IAM.</li>\n    <li><strong>Sem documentação:</strong> a próxima pessoa repete a investigação do zero.</li>\n  </ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> diagnosticar por camadas é usar o Modelo OSI como roteiro de troubleshooting: mapear o sintoma para possíveis falhas em cada camada, coletar evidências específicas, interpretar os resultados e avançar somente quando a camada anterior estiver validada ou descartada.</div>\n  <p>Na prática, você responde em ordem: existe sinal? enlace? IP e rota? transporte? sessão? os dados estão representados corretamente (TLS, formato)? a aplicação entende e autoriza a requisição? Mantenha separadas as cinco peças do raciocínio:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Peça</th><th>O que é</th><th>Exemplo</th></tr></thead><tbody>\n    <tr><td>Sintoma</td><td>Comportamento observado; ainda não é causa.</td><td>\"O portal retorna 403.\"</td></tr>\n    <tr><td>Hipótese</td><td>Causa possível, a testar.</td><td>\"O WAF bloqueia a origem via VPN.\"</td></tr>\n    <tr><td>Evidência</td><td>Dado de comando, log, métrica ou observação.</td><td>Log do WAF com a regra que negou a requisição às 10:42.</td></tr>\n    <tr><td>Interpretação</td><td>O que a evidência confirma ou descarta, e em qual camada.</td><td>\"TCP/443 conecta; a negação é na Camada 7.\"</td></tr>\n    <tr><td>Ação corretiva</td><td>Menor mudança que trata a causa, com validação e rollback.</td><td>Ajustar só aquela regra do WAF e testar de novo.</td></tr>\n  </tbody></table></div>\n  <p>Enquanto as evidências sustentam uma explicação, você tem a <strong>causa provável</strong>; a <strong>causa raiz</strong> é a origem que, corrigida, impede a falha de voltar. Uma mudança ampla (liberar tudo, reiniciar tudo) pode sumir com o sintoma e esconder a causa raiz. E alguns problemas atravessam várias camadas ao mesmo tempo: o roteiro organiza a busca, não garante uma camada só.</p>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>\"O ping respondeu, a rede está ok\":</strong> ping testa só parte da conectividade; teste a camada do sintoma (porta, TLS, aplicação).</li>\n      <li><strong>Liberar firewall antes de provar bloqueio:</strong> amplia a superfície de ataque e muitas vezes não resolve; prove com origem, destino, porta, horário, regra e log.</li>\n      <li><strong>Confundir DNS com conectividade IP:</strong> usuários acessam nomes; trocar rota ou firewall não resolve falha de resolução.</li>\n      <li><strong>Compartilhar outputs sem sanitizar:</strong> na pressa do ticket, vazam tokens, IPs internos e nomes sensíveis.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Escolha primeiro a direção. <strong>Bottom-up</strong> (da Camada 1 para cima) serve para falhas amplas, como uma filial inteira sem acesso. <strong>Top-down</strong> (da aplicação para baixo) serve quando há um erro de aplicação claro: HTTP 401/403/500 ou erro de certificado. Começar pela camada \"errada\" atrasa, mas não invalida o diagnóstico se você seguir o método.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Defina o sintoma:</strong> quem falha, de onde, para qual destino, desde quando e com qual mensagem? Relato incompleto leva a investigação para o lugar errado.</li>\n    <li><strong>Identifique o escopo:</strong> um usuário, uma VLAN, uma filial, uma aplicação, um provedor ou todos?</li>\n    <li><strong>Valide camada por camada</strong> (tabela abaixo), interpretando cada resultado: comando sem interpretação gera falsa confiança.</li>\n    <li><strong>Defina a ação corretiva mínima:</strong> altere configuração só com hipótese forte e plano de rollback.</li>\n    <li><strong>Registre as evidências:</strong> comando, horário, origem, destino, resultado, interpretação e hipótese descartada. Isso melhora tickets, handoffs entre times e o pós-incidente.</li>\n  </ol>\n  <div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Camada</th><th>O que verificar</th><th>Comandos típicos</th><th>Cuidado com a evidência</th></tr></thead><tbody>\n    <tr><td>1 Física</td><td>Link, sinal, Wi-Fi, cabo, fibra, transceptor, energia, velocidade negociada, erros físicos.</td><td>Status da interface; <code>show ip interface brief</code> (up/up).</td><td>Revela localização, portas e topologia.</td></tr>\n    <tr><td>2 Enlace</td><td>MAC, ARP, VLAN, switch, trunk, domínio de broadcast, gateway local.</td><td><code>arp -a</code>, <code>ip neigh</code>, <code>show arp</code>.</td><td>MACs e VLANs são dados internos.</td></tr>\n    <tr><td>3 Rede</td><td>IP, máscara, gateway, rota, NAT, TTL, caminho de ida e de retorno.</td><td><code>ipconfig /all</code>, <code>ip addr</code>, <code>ip route</code>, <code>ping</code>, <code>tracert</code>/<code>traceroute</code>.</td><td>Sanitize rotas e IPs internos.</td></tr>\n    <tr><td>4 Transporte</td><td>Porta, listener, handshake TCP, UDP, firewall stateful, timeout, reset.</td><td><code>Test-NetConnection &lt;host&gt; -Port 443</code>, <code>nc -vz &lt;host&gt; 443</code>, <code>ss</code>.</td><td>Teste só portas do escopo autorizado.</td></tr>\n    <tr><td>5-7 Superiores</td><td>TLS, certificado, HTTP, sessão, token, payload, WAF, API, autenticação, autorização; DNS como serviço de que a aplicação depende.</td><td><code>nslookup</code>/<code>dig</code>, <code>curl -Iv https://&lt;host&gt;</code>, logs de proxy, WAF e IAM.</td><td>Headers, cookies e tokens podem conter segredos.</td></tr>\n  </tbody></table></div>\n  <p>Num fluxo corporativo (notebook, Wi-Fi, switch, firewall, VPN, proxy, DNS, balanceador, WAF, API gateway, servidor, banco, IAM), uma falha em qualquer etapa gera o mesmo sintoma final; a tabela põe cada evidência no lugar certo.</p>\n  <div class=\"callout\"><strong>Quando não seguir o roteiro inteiro:</strong> com evidência inequívoca e urgente (ex.: cabo rompido confirmado), corrija. O método também não justifica varreduras sem autorização nem deve atrasar uma mitigação emergencial já definida.</div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense em entregar um documento em um prédio corporativo: primeiro você precisa de uma rua transitável (meio físico), depois entrar no prédio (enlace local), achar o endereço certo (IP), o andar e a sala (porta e serviço) e, por fim, a pessoa certa, que aceita o documento no formato esperado (sessão, apresentação, aplicação e autorização). Se a rua está bloqueada, não adianta discutir o formato do documento.</p>\n  <div class=\"callout warning\"><strong>Limite da analogia:</strong> redes não são lineares; há caminhos assimétricos, NAT, túneis, proxies, cache e serviços distribuídos, e só a evidência técnica decide.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Seu notebook Windows não abre <code>https://portal.example.com</code>. Diagnóstico bottom-up, com a saída de cada passo e o que ela prova:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Camada</th><th>Comando</th><th>Saída observada</th><th>Interpretação</th></tr></thead><tbody>\n    <tr><td>1-2</td><td>Status do Wi-Fi</td><td>Conectado, sinal bom</td><td>Há link.</td></tr>\n    <tr><td>3</td><td><code>ipconfig /all</code></td><td><code>IPv4 Address: 192.168.1.20</code>, <code>Default Gateway: 192.168.1.1</code>, DNS configurado</td><td>Configuração local coerente.</td></tr>\n    <tr><td>2-3</td><td><code>ping 192.168.1.1</code></td><td><code>Reply from 192.168.1.1: bytes=32 time=2ms TTL=64</code></td><td>Rede local e gateway funcionam.</td></tr>\n    <tr><td>DNS</td><td><code>nslookup portal.example.com</code></td><td><code>Address: 203.0.113.10</code></td><td>O nome resolve.</td></tr>\n    <tr><td>4</td><td><code>Test-NetConnection portal.example.com -Port 443</code></td><td><code>TcpTestSucceeded : True</code></td><td>A porta aceita conexão.</td></tr>\n    <tr><td>6-7</td><td><code>curl -I https://portal.example.com</code></td><td><code>HTTP/1.1 403 Forbidden</code></td><td>TLS negociou e o servidor negou: aplicação ou política, não rede.</td></tr>\n  </tbody></table></div>\n  <p>A primeira linha com falha indica onde investigar. Se o gateway respondesse e o <code>nslookup</code> retornasse <code>Non-existent domain</code>, o problema seria resolução de nomes, não camada física; se o TCP conectasse e o curl mostrasse erro de certificado, a falha estaria no TLS.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Um usuário da filial não acessa o ERP. Primeiro defina o escopo: é um usuário ou a filial inteira? Depois valide, em ordem, Wi-Fi/cabo, VLAN, gateway, rota via WAN, firewall, porta do ERP, certificado, autenticação no IdP e autorização no sistema.</p>\n  <p>O mesmo sintoma pode ter causas bem diferentes: cabo rompido, VLAN errada, rota estática ausente, regra de firewall expirada, certificado do ERP vencido, IdP indisponível ou perfil de acesso removido. O método testa cada hipótese separadamente, em vez de apostar em uma.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud e DevSecOps</h2>\n  <p>Em cloud, as camadas viram configuração: VPC/VNet, subnets, route tables, security groups/NSGs, NAT gateway, load balancer, private endpoint, DNS privado, TLS, WAF e IAM. Um serviço pode estar saudável no load balancer e inacessível porque o security group bloqueia a origem, ou aceitar TCP/443 e falhar por certificado, host header ou autorização. Sem cabos visíveis, as evidências são IaC, flow logs, métricas do load balancer, logs do WAF e audit logs.</p>\n  <p>Numa pipeline que não baixa uma imagem de container, a ordem é a mesma: o runner tem rede? resolve o DNS do registry? alcança a rota? abre TCP/443? valida o TLS (a CA corporativa está no trust store)? o proxy exige variável de ambiente? autentica e tem autorização no namespace? Sem esse roteiro, alguém libera firewall quando o problema é token expirado, ou troca o token quando é DNS privado.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>Um pico de tráfego pode ser backup legítimo, exfiltração, DDoS, loop, varredura interna ou uma aplicação em retry. Cada hipótese deixa evidências em camadas diferentes (volume e destinos nos flow logs, resets TCP, erros de aplicação), e o método evita bloquear tráfego antes de provar qual é o caso.</p>\n  <p>O mesmo raciocínio separa falha, ataque e controle funcionando: um 403 vindo do WAF pode ser a política de segurança fazendo o seu trabalho, não algo a \"consertar\". Para isso, correlacione logs de rede, aplicação, IAM e endpoint com origem, destino e horário; alertas isolados, sem esse contexto, deixam a investigação lenta ou inconclusiva.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m02l08-title m02l08-desc\">\n    <title id=\"m02l08-title\">Diagnóstico por camadas OSI</title>\n    <desc id=\"m02l08-desc\">Fluxo de diagnóstico que sobe da camada física até a aplicação, coletando evidências e descartando hipóteses.</desc>\n    <defs>\n      <marker id=\"m02l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n    </defs>\n    <rect x=\"40\" y=\"40\" width=\"250\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"165\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Sintoma</text>\n    <text x=\"165\" y=\"94\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">\"Aplicação não abre\"</text>\n\n    <rect x=\"370\" y=\"25\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"57\" text-anchor=\"middle\" class=\"svg-label\">7 Aplicação</text>\n    <rect x=\"370\" y=\"80\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">6 Apresentação/TLS</text>\n    <rect x=\"370\" y=\"135\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"167\" text-anchor=\"middle\" class=\"svg-label\">5 Sessão</text>\n    <rect x=\"370\" y=\"190\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"222\" text-anchor=\"middle\" class=\"svg-label\">4 Transporte/portas</text>\n    <rect x=\"370\" y=\"245\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"277\" text-anchor=\"middle\" class=\"svg-label\">3 Rede/IP/rotas</text>\n    <rect x=\"370\" y=\"300\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"332\" text-anchor=\"middle\" class=\"svg-label\">2 Enlace/MAC/VLAN</text>\n    <rect x=\"370\" y=\"355\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"387\" text-anchor=\"middle\" class=\"svg-label\">1 Física/sinal/link</text>\n\n    <line x1=\"290\" y1=\"75\" x2=\"370\" y2=\"380\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l08-arrow)\" />\n    <line x1=\"620\" y1=\"380\" x2=\"740\" y2=\"380\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l08-arrow)\" />\n    <line x1=\"740\" y1=\"380\" x2=\"740\" y2=\"50\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l08-arrow)\" />\n\n    <rect x=\"710\" y=\"25\" width=\"230\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"825\" y=\"60\" text-anchor=\"middle\" class=\"svg-label\">Evidência</text>\n    <text x=\"825\" y=\"84\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">comando + resultado</text>\n    <text x=\"825\" y=\"106\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">+ interpretação</text>\n\n    <rect x=\"80\" y=\"455\" width=\"820\" height=\"70\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"490\" y=\"485\" text-anchor=\"middle\" class=\"svg-label\">Regra do método</text>\n    <text x=\"490\" y=\"510\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Não pule para a solução: formule hipótese, colete evidência, interprete, descarte e só então altere configuração.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2><ul><li><strong>Modelo mental:</strong> investigação científica aplicada: o sintoma vira hipótese, a hipótese exige evidência, a evidência precisa de interpretação e a ação corretiva precisa de validação e rollback.</li><li><strong>Direção:</strong> bottom-up para falhas amplas; top-down para erro de aplicação claro (401, 403, certificado).</li><li><strong>O que lembrar:</strong> um teste bem-sucedido em uma camada não prova que as superiores funcionam.</li><li><strong>Erro comum:</strong> dizer \"a rede está ok\" porque o ping respondeu, ou liberar firewall sem provar bloqueio.</li><li><strong>Segurança:</strong> teste dentro do escopo autorizado e sanitize tokens, cookies e IPs internos antes de compartilhar.</li></ul></section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2><p>Na aula 2.9, OSI aplicado à cibersegurança, você usará as mesmas camadas para organizar riscos, controles, logs e detecção, sempre dentro de limites éticos de investigação.</p></section>\n"
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
      "DNS",
      "TLS",
      "HTTP"
    ],
    "dependsOn": [
      "representação digital",
      "meios físicos",
      "equipamentos",
      "métricas",
      "comandos básicos",
      "Modelo OSI"
    ],
    "enables": [
      "troubleshooting profissional",
      "NOC",
      "SOC",
      "cloud operations",
      "DevSecOps",
      "resposta a incidentes"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Aplicação não abre",
      "Ping funciona, mas sistema falha",
      "DNS resolve, mas navegador mostra erro",
      "Porta abre, mas HTTP retorna 403",
      "VPN conecta, mas serviço interno não responde"
    ],
    "diagnosticQuestions": [
      "Qual é a origem e o destino?",
      "Afeta todos ou apenas alguns?",
      "Desde quando?",
      "O que mudou?",
      "Qual camada possui a primeira evidência de falha?",
      "Há logs de firewall, proxy, WAF, aplicação ou IAM?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Coletar IP, máscara, gateway, DNS e interface.",
        "expectedObservation": "Interface ativa com endereço coerente.",
        "interpretation": "Sem IP ou sem gateway indica problema antes de culpar aplicação."
      },
      {
        "platform": "Windows",
        "command": "ping <gateway>",
        "purpose": "Testar alcance local; em seguida rode tracert <destino> para ver o caminho IP básico (no Windows PowerShell 5.1 o operador && não existe, então rode um comando por vez).",
        "expectedObservation": "Gateway responde e caminho progride.",
        "interpretation": "Falha no gateway aponta para rede local; falha adiante pode ser rota, firewall ou destino."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection <host> -Port 443",
        "purpose": "Testar transporte TCP para serviço específico.",
        "expectedObservation": "TcpTestSucceeded True quando a porta aceita conexão.",
        "interpretation": "Porta aberta não prova TLS, HTTP ou autenticação."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ip neigh",
        "purpose": "Ver interface, rotas e vizinhos ARP/ND.",
        "expectedObservation": "Endereço, rota default e vizinho do gateway.",
        "interpretation": "Ausência de rota ou vizinho indica falha em camada 2/3."
      },
      {
        "platform": "Linux",
        "command": "curl -Iv https://<host>",
        "purpose": "Observar DNS, conexão TCP, TLS e headers HTTP (-I pede só os cabeçalhos; -v mostra os detalhes da conexão e do TLS).",
        "expectedObservation": "Etapas de conexão, certificado e status HTTP.",
        "interpretation": "Permite separar transporte, TLS e aplicação."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Validar interfaces em equipamento de rede; em seguida rode show ip route e show arp (o IOS executa um comando por vez).",
        "expectedObservation": "Interfaces up/up, rota esperada na tabela e ARP coerente com o gateway.",
        "interpretation": "Ajuda a localizar falha em enlace ou rede."
      }
    ],
    "decisionTree": [
      {
        "if": "Sem link ou Wi-Fi instável",
        "then": "Investigar Camada 1 antes de DNS, firewall ou aplicação."
      },
      {
        "if": "Gateway local não responde",
        "then": "Verificar IP, máscara, VLAN, ARP, switch, firewall local ou gateway."
      },
      {
        "if": "DNS não resolve, mas IP responde",
        "then": "Investigar DNS, sufixo, servidor recursivo, zona privada ou split-horizon."
      },
      {
        "if": "TCP não conecta, mas rota existe",
        "then": "Investigar firewall, listener, security group, NAT, ACL ou serviço parado."
      },
      {
        "if": "TCP conecta, mas TLS falha",
        "then": "Investigar certificado, CA, SNI, proxy TLS ou inspeção corporativa."
      },
      {
        "if": "TLS funciona, mas HTTP retorna 401/403",
        "then": "Investigar autenticação, autorização, token, WAF ou política de aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Definir escopo e autorização antes de testar.",
      "Coletar evidências mínimas necessárias.",
      "Sanitizar IPs, tokens, cookies e nomes internos.",
      "Registrar horário, origem, destino e comando executado.",
      "Evitar mudanças amplas sem hipótese forte e rollback."
    ],
    "badPractices": [
      "Executar varreduras fora de escopo.",
      "Abrir regra any-any para testar.",
      "Compartilhar prints com secrets.",
      "Ignorar logs de segurança.",
      "Confundir política negando acesso com falha de rede."
    ],
    "commonErrors": [
      "Tratar 403 como indisponibilidade.",
      "Tratar ICMP bloqueado como host offline.",
      "Tratar porta aberta como aplicação funcional.",
      "Tratar NAT como controle de segurança suficiente."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de evidências sensíveis",
        "description": "Outputs podem conter IPs internos, domínios, cookies, tokens e headers.",
        "defensiveExplanation": "Evidências são úteis para diagnóstico e também para adversários.",
        "mitigation": "Sanitização, controle de acesso ao ticket e retenção adequada."
      },
      {
        "name": "Mudança permissiva sem causa comprovada",
        "description": "Liberar regras amplas para resolver rapidamente um sintoma.",
        "defensiveExplanation": "Pode transformar incidente operacional em risco de segurança.",
        "mitigation": "Menor privilégio, janela de mudança, rollback e revisão."
      }
    ],
    "monitoring": [
      "Logs de firewall/proxy/WAF",
      "Métricas de perda, latência e disponibilidade",
      "Logs de DNS",
      "Eventos de IAM",
      "Logs de aplicação e API gateway"
    ],
    "hardening": [
      "Segmentação",
      "Regras específicas",
      "NAC/802.1X",
      "TLS correto",
      "Observabilidade centralizada",
      "Runbooks de troubleshooting"
    ],
    "detectionIdeas": [
      "Aumento de resets TCP",
      "Erros TLS concentrados",
      "Picos de 401/403",
      "DNS NXDOMAIN anormal",
      "Conexões laterais incomuns",
      "Alterações recentes de rota ou firewall"
    ]
  },
  "lab": {
    "id": "lab-2.8",
    "title": "Matriz de troubleshooting por camadas",
    "labType": "cloud",
    "objective": "Construir uma investigação organizada para um problema de acesso HTTPS, separando evidências por camada OSI.",
    "scenario": "Um usuário relata que não consegue acessar um portal interno ou externo. Você deve criar uma matriz de diagnóstico sem executar varreduras agressivas e sem expor dados sensíveis.",
    "topology": "Host do aluno -> rede local -> gateway -> internet/VPN/cloud -> serviço HTTPS.",
    "architecture": "Fluxo com camadas física, enlace, rede, transporte, TLS, sessão e aplicação.",
    "prerequisites": [
      "Ter concluído as aulas 2.1 a 2.7.",
      "Ter terminal Windows PowerShell ou Linux.",
      "Usar apenas alvos próprios, públicos e autorizados."
    ],
    "tools": [
      "PowerShell",
      "Terminal Linux",
      "curl",
      "ping",
      "traceroute/tracert",
      "nslookup/dig",
      "opcional: navegador"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras de portas fora de escopo.",
      "Não colete cookies, tokens ou dados pessoais.",
      "Sanitize nomes internos e IPs antes de compartilhar evidências.",
      "Use um site público ou ambiente próprio para testes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir sintoma e escopo",
        "instruction": "Escreva origem, destino, horário, erro observado e quem é afetado.",
        "expectedOutput": "Sintoma descrito em termos técnicos mínimos.",
        "explanation": "Sem escopo, qualquer comando pode ser irrelevante."
      },
      {
        "number": 2,
        "title": "Coletar configuração local",
        "instruction": "Verifique IP, gateway e DNS.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route",
        "expectedOutput": "Interface ativa, IP válido, gateway e DNS identificados.",
        "explanation": "Problemas locais invalidam testes de camadas superiores."
      },
      {
        "number": 3,
        "title": "Testar alcance local",
        "instruction": "Teste o gateway local.",
        "command": "ping <gateway>",
        "expectedOutput": "Respostas do gateway ou evidência de bloqueio/indisponibilidade.",
        "explanation": "Se nem o gateway responde, investigue camada 1/2/3 local."
      },
      {
        "number": 4,
        "title": "Testar resolução de nomes",
        "instruction": "Resolva o nome do serviço.",
        "command": "Windows: nslookup <host>\nLinux: dig <host> ou nslookup <host>",
        "expectedOutput": "Endereço IP ou erro de resolução.",
        "explanation": "DNS é dependência frequente de acesso a aplicações."
      },
      {
        "number": 5,
        "title": "Testar caminho IP",
        "instruction": "Observe o caminho até o destino, respeitando limitações de ICMP.",
        "command": "Windows: tracert <host>\nLinux: traceroute <host> ou tracepath <host>",
        "expectedOutput": "Saltos ou interrupções parciais.",
        "explanation": "Traceroute ajuda, mas firewalls podem ocultar saltos."
      },
      {
        "number": 6,
        "title": "Testar transporte",
        "instruction": "Teste porta do serviço.",
        "command": "Windows: Test-NetConnection <host> -Port 443\nLinux: nc -vz <host> 443 ou curl -Iv https://<host>",
        "expectedOutput": "Conexão TCP aceita ou falha clara.",
        "explanation": "A porta responde não significa que TLS e aplicação funcionam."
      },
      {
        "number": 7,
        "title": "Testar TLS e aplicação",
        "instruction": "Use curl para observar certificado, negociação e status HTTP.",
        "command": "curl -Iv https://<host>",
        "expectedOutput": "Informações de TLS e status HTTP.",
        "explanation": "Agora você separa Camada 4 de Camadas 6/7."
      },
      {
        "number": 8,
        "title": "Montar matriz final",
        "instruction": "Preencha uma tabela com camada, evidência, interpretação, hipótese descartada e próximo passo.",
        "expectedOutput": "Matriz OSI de diagnóstico.",
        "explanation": "O valor do lab está na interpretação, não apenas nos comandos."
      }
    ],
    "expectedResult": "Uma matriz de troubleshooting por camadas contendo sintoma, escopo, comandos, resultados, interpretação, hipóteses descartadas e ação recomendada.",
    "validation": [
      {
        "check": "A matriz possui evidência por camada relevante",
        "command": "Revisão manual",
        "expected": "Pelo menos camadas 1/2/3/4/6/7 analisadas quando aplicável.",
        "ifFails": "Volte aos passos e inclua evidência, não apenas opinião."
      },
      {
        "check": "Evidências foram sanitizadas",
        "command": "Revisão manual",
        "expected": "Sem tokens, cookies, dados pessoais ou domínios internos sensíveis.",
        "ifFails": "Remova ou masque informações antes de compartilhar."
      },
      {
        "check": "Conclusão não pula etapas",
        "command": "Revisão manual",
        "expected": "Ação corretiva ligada à evidência coletada.",
        "ifFails": "Reescreva a conclusão separando hipótese e prova."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Ping falha para destino externo",
        "probableCause": "ICMP bloqueado ou indisponibilidade real.",
        "howToConfirm": "Testar TCP/443 e DNS antes de concluir.",
        "fix": "Interpretar ICMP como evidência limitada."
      },
      {
        "symptom": "curl retorna erro de certificado",
        "probableCause": "CA não confiável, certificado expirado ou interceptação TLS.",
        "howToConfirm": "Observar detalhes do certificado e comparar com navegador.",
        "fix": "Corrigir cadeia de confiança, SNI, certificado ou proxy corporativo."
      },
      {
        "symptom": "HTTP 403",
        "probableCause": "Política, WAF, autorização ou origem bloqueada.",
        "howToConfirm": "Ver logs de aplicação/WAF/IAM e headers de resposta.",
        "fix": "Ajustar política específica após validação."
      }
    ],
    "improvements": [
      "Adicionar captura Wireshark em laboratório próprio.",
      "Transformar a matriz em template de ticket ou runbook por tipo de sintoma."
    ],
    "evidenceToCollect": [
      "Descrição do sintoma",
      "Origem e destino sanitizados",
      "IP/gateway/DNS",
      "Resultado DNS",
      "Resultado TCP",
      "Status TLS/HTTP",
      "Conclusão por camada"
    ],
    "questions": [
      "Qual foi a primeira camada com evidência de falha?",
      "Qual hipótese foi descartada?",
      "O que você não consegue provar com os dados coletados?",
      "Que evidência exigiria acesso a logs corporativos?"
    ],
    "challenge": "Monte uma matriz para o caso: usuário acessa o portal via VPN, o DNS resolve, TCP/443 conecta, mas curl -Iv mostra 'SSL certificate problem: unable to get local issuer certificate'.",
    "solution": "As Camadas 1 a 4 funcionam; a falha está no TLS (Camada 6): o cliente não consegue ligar o certificado recebido a uma CA confiável. Hipóteses: o servidor envia a cadeia incompleta ou um proxy de inspeção TLS corporativo apresenta um certificado cuja CA não está no trust store do cliente. Compare o emissor mostrado pelo curl com o do navegador e com o visto de outra rede. Corrija a cadeia, o certificado ou o trust store; desligar a validação (curl -k) só esconde o problema, e mexer em firewall ou rota não faz sentido."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que ping sozinho não prova que uma aplicação está funcionando?",
      "hints": [
        "Pense nas camadas acima da rede.",
        "Pense em porta, TLS, HTTP e autorização."
      ],
      "expectedIdeas": [
        "ICMP",
        "TCP",
        "TLS",
        "HTTP",
        "sessão",
        "autorização"
      ],
      "explanation": "Ping testa alcance limitado. Aplicações dependem de várias camadas adicionais."
    },
    {
      "type": "diagnóstico",
      "question": "DNS resolve e TCP/443 conecta, mas o serviço retorna 401. Qual camada você investigaria?",
      "hints": [
        "401 é código HTTP.",
        "Pense em autenticação."
      ],
      "expectedIdeas": [
        "camada 7",
        "aplicação",
        "autenticação",
        "token",
        "sessão"
      ],
      "explanation": "A conectividade básica parece existir; o foco deve ir para aplicação/identidade."
    },
    {
      "type": "cenário real",
      "question": "Uma equipe quer liberar any-any para testar. Como você responderia tecnicamente?",
      "hints": [
        "Pense em risco e evidência.",
        "Pense em teste mínimo."
      ],
      "expectedIdeas": [
        "menor privilégio",
        "evidência",
        "origem",
        "destino",
        "porta",
        "rollback"
      ],
      "explanation": "Mudanças amplas aumentam risco. O teste deve ser específico e justificado por evidência."
    }
  ],
  "quiz": [
    {
      "id": "q2.8.7",
      "question": "Por IP, Test-NetConnection 10.20.0.15 -Port 443 retorna TcpTestSucceeded : True, mas pelo nome o portal não abre e nslookup retorna Non-existent domain. O que investigar primeiro?",
      "options": [
        "A regra de firewall para a porta 443.",
        "A resolução de nomes: servidor DNS configurado, sufixo, zona privada ou split-horizon.",
        "A rota default do cliente.",
        "O certificado TLS do portal."
      ],
      "answer": 1,
      "explanation": "Por IP o transporte funciona, então rota e firewall já foram validados. A falha está na resolução do nome, e trocar rota ou firewall não a resolve.",
      "topic": "dns",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.8.2",
      "question": "Ping para o servidor responde, mas TCP/443 falha. Qual camada deve ser investigada com mais foco?",
      "options": [
        "Física: cabo ou sinal Wi-Fi.",
        "Transporte: firewall, listener ou NAT na porta 443.",
        "Apresentação: certificado TLS.",
        "Aplicação: autorização no IAM."
      ],
      "answer": 1,
      "explanation": "O ping prova alcance IP, então física e rede funcionam. Com a porta falhando, firewall, NAT ou listener são as hipóteses fortes; TLS e IAM nem chegam a ser testados sem a conexão TCP.",
      "topic": "camada 4",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.8.3",
      "question": "Por que evidências de troubleshooting precisam ser sanitizadas?",
      "options": [
        "Porque podem conter IPs internos, tokens, cookies, domínios e informações de topologia.",
        "Porque comandos de rede nunca geram informação útil.",
        "Porque logs não têm valor técnico.",
        "Porque sanitizar impede qualquer diagnóstico."
      ],
      "answer": 0,
      "explanation": "Evidências podem ajudar o diagnóstico e também revelar dados sensíveis.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q2.8.4",
      "question": "TCP/443 conecta e curl mostra erro de certificado. Qual hipótese é mais provável?",
      "options": [
        "Rota ausente para o servidor.",
        "Porta 443 bloqueada no firewall.",
        "Falha em TLS (camada de apresentação), como certificado expirado ou CA não confiável.",
        "VLAN errada no switch de acesso."
      ],
      "answer": 2,
      "explanation": "Se o TCP conectou, VLAN, rota e porta já funcionaram; a falha aparece na negociação ou validação do TLS.",
      "topic": "tls",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q2.8.5",
      "question": "Qual afirmação é correta?",
      "options": [
        "Porta aberta não prova aplicação saudável.",
        "HTTP 403 prova cabo ruim.",
        "DNS funcionando prova autorização correta.",
        "Traceroute completo prova TLS válido."
      ],
      "answer": 0,
      "explanation": "Cada teste valida apenas parte da comunicação.",
      "topic": "interpretação",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q2.8.6",
      "question": "Qual comando no Windows testa conectividade TCP com uma porta específica?",
      "options": [
        "Test-NetConnection <host> -Port 443",
        "arp -a",
        "ipconfig /all",
        "nslookup <host>"
      ],
      "answer": 0,
      "explanation": "Test-NetConnection com -Port testa uma porta TCP específica (TcpTestSucceeded). arp -a mostra vizinhos da Camada 2, ipconfig /all a configuração IP e nslookup a resolução de nomes.",
      "topic": "comandos",
      "difficulty": "iniciante",
      "type": "comando"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.8.1",
      "front": "O que é sintoma?",
      "back": "É o comportamento observado, como 'não acessa', 'lento' ou 'erro 403'. Ainda não é causa.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.2",
      "front": "O que é evidência?",
      "back": "Resultado coletado por comando, log, métrica ou observação que sustenta ou descarta uma hipótese.",
      "tags": [
        "evidência"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.7",
      "front": "Ping sem resposta prova que o host está fora do ar?",
      "back": "Não. Muitos firewalls bloqueiam ICMP. Teste o DNS e a porta do serviço (ex.: TCP/443) antes de concluir.",
      "tags": [
        "icmp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.4",
      "front": "HTTP 401 x HTTP 403: o que cada um indica?",
      "back": "401: autenticação ausente ou inválida (credencial, token). 403: o servidor entendeu e recusou por autorização, política, WAF ou origem bloqueada. Nenhum dos dois indica falha de rede.",
      "tags": [
        "http",
        "iam"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.5",
      "front": "Bottom-up ou top-down: quando usar cada um?",
      "back": "Bottom-up (da física para a aplicação) em falhas amplas, como uma filial inteira sem acesso. Top-down (da aplicação para baixo) quando há erro de aplicação claro, como 403 ou erro de certificado.",
      "tags": [
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.8",
      "front": "Causa provável x causa raiz",
      "back": "Causa provável é a explicação mais sustentada pelas evidências até agora. Causa raiz é a origem que, corrigida, impede a falha de voltar. Uma mudança ampla pode sumir com o sintoma e esconder a causa raiz.",
      "tags": [
        "método"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.8.1",
      "type": "conceitual",
      "prompt": "Classifique cada item como sintoma, hipótese, evidência, interpretação ou ação corretiva: (a) 'o portal não abre desde as 9h'; (b) 'talvez o certificado tenha vencido'; (c) curl mostra 'SSL certificate problem: certificate has expired'; (d) 'o TCP conecta, então a falha está no TLS'; (e) renovar o certificado, testar de novo e manter o rollback definido.",
      "expectedAnswer": "(a) sintoma; (b) hipótese; (c) evidência; (d) interpretação; (e) ação corretiva.",
      "explanation": "Separar as cinco peças evita tratar um palpite como prova e alterar configuração antes de ter evidência."
    },
    {
      "id": "ex2.8.5",
      "type": "comando/output",
      "prompt": "Saídas coletadas a partir da subnet do usuário: ping <gateway> responde; tracert progride até o destino; Test-NetConnection <host> -Port 443 retorna TcpTestSucceeded : False. O mesmo teste a partir de outra subnet retorna True. Qual é a primeira camada com evidência de falha, qual a hipótese mais forte e qual o próximo passo?",
      "expectedAnswer": "Camadas 1 a 3 estão validadas; a primeira falha é na Camada 4. Como de outra subnet a porta responde, o serviço está no ar: a hipótese forte é firewall, ACL ou security group filtrando essa origem. Próximo passo: consultar o log do firewall com origem, destino, porta e horário, sem abrir regra ampla.",
      "explanation": "Comparar origens afetadas e não afetadas separa 'serviço parado' de 'origem bloqueada'."
    },
    {
      "id": "ex2.8.4",
      "type": "segurança",
      "prompt": "Você vai anexar a um ticket externo este trecho de saída do curl -v: 'Connected to erp.interno.corp (10.20.0.15) port 443', '> Cookie: session=8f3a91c2...', '< HTTP/1.1 403 Forbidden'. O que você mascara e o que mantém?",
      "expectedAnswer": "Mascarar o cookie de sessão (funciona como credencial), o nome de host interno e o IP interno. Manter a porta 443 e o status 403, que são a evidência útil para o diagnóstico.",
      "explanation": "Evidência sanitizada continua útil para o diagnóstico sem revelar superfície de ataque."
    }
  ],
  "challenge": {
    "title": "Investigue uma falha sem pular camadas",
    "scenario": "Uma pipeline em runner self-hosted não consegue publicar artefatos em um registry HTTPS. O runner tem IP, DNS resolve, TCP/443 conecta, mas o upload falha com 403.",
    "tasks": [
      "Montar matriz por camadas.",
      "Indicar evidências já disponíveis.",
      "Listar hipóteses prováveis.",
      "Definir próximos logs a consultar.",
      "Propor ação corretiva mínima."
    ],
    "constraints": [
      "Não liberar any-any.",
      "Não expor tokens em evidências.",
      "Não executar varreduras fora do escopo.",
      "Assumir ambiente corporativo com proxy/WAF/IAM."
    ],
    "expectedDeliverables": [
      "Matriz OSI",
      "Lista de hipóteses",
      "Plano de coleta de logs",
      "Ação mínima e rollback"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta por camadas",
        "points": 30,
        "description": "Distingue DNS, TCP, TLS, HTTP, WAF e autorização."
      },
      {
        "criterion": "Evidências e hipóteses",
        "points": 30,
        "description": "Não conclui sem dados e não pula para firewall."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "Protege tokens, escopo e menor privilégio."
      },
      {
        "criterion": "Ação recomendada",
        "points": 20,
        "description": "Propõe correção específica e reversível."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Como DNS resolve e TCP/443 conecta, a falha provavelmente não está em camada física, enlace, rede ou transporte básico. O status 403 indica negação na camada de aplicação ou política, possivelmente WAF, registry, IAM, escopo do token, projeto/namespace ou origem não autorizada.",
    "steps": [
      "Registrar origem, destino, horário e mensagem.",
      "Confirmar DNS e TCP/443.",
      "Observar TLS e status HTTP com curl sem expor token.",
      "Consultar logs do proxy/WAF/API gateway/registry.",
      "Validar token, escopo, projeto, namespace e política.",
      "Aplicar menor ajuste possível e testar novamente.",
      "Registrar rollback."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar any-any no firewall.",
        "whyItIsWrong": "Não há evidência de bloqueio de transporte; 403 sugere política de aplicação/autorização."
      },
      {
        "answer": "Trocar DNS.",
        "whyItIsWrong": "DNS já resolve, então essa hipótese está enfraquecida."
      },
      {
        "answer": "Reiniciar o switch.",
        "whyItIsWrong": "Camadas inferiores não apresentam evidência de falha."
      }
    ],
    "finalAnswer": "A investigação deve focar em HTTP/WAF/IAM/registry: token, escopo, grupo, origem permitida, política do registry, logs do WAF/proxy e regras específicas. A ação corretiva deve ser específica, auditável e reversível."
  },
  "glossary": [
    {
      "term": "Sintoma",
      "shortDefinition": "Comportamento observado pelo usuário ou sistema.",
      "longDefinition": "É a manifestação do problema, não a causa. Exemplo: 'portal não abre'.",
      "example": "HTTP 403 é sintoma de negação, não prova falha de rede.",
      "relatedTerms": [
        "hipótese",
        "evidência"
      ],
      "relatedLessons": [
        "2.8"
      ]
    },
    {
      "term": "Hipótese",
      "shortDefinition": "Causa possível que precisa ser testada.",
      "longDefinition": "Uma explicação provisória para o sintoma, validada ou descartada por evidências.",
      "example": "Firewall bloqueando é hipótese; log de bloqueio é evidência.",
      "relatedTerms": [
        "troubleshooting"
      ],
      "relatedLessons": [
        "2.8"
      ]
    },
    {
      "term": "Evidência",
      "shortDefinition": "Dado coletado por comando, log, métrica ou observação.",
      "longDefinition": "Resultado usado para sustentar ou descartar uma hipótese.",
      "example": "TcpTestSucceeded True é evidência de que a porta TCP respondeu.",
      "relatedTerms": [
        "logs",
        "métricas"
      ],
      "relatedLessons": [
        "2.8"
      ]
    },
    {
      "term": "Bottom-up",
      "shortDefinition": "Diagnóstico que começa nas camadas inferiores.",
      "longDefinition": "Começa por física/enlace e sobe até aplicação.",
      "example": "Útil quando muitos usuários de uma rede estão sem acesso.",
      "relatedTerms": [
        "top-down"
      ],
      "relatedLessons": [
        "2.8"
      ]
    },
    {
      "term": "Top-down",
      "shortDefinition": "Diagnóstico que começa na aplicação.",
      "longDefinition": "Começa pelo erro visível de aplicação e desce quando necessário.",
      "example": "Útil quando há HTTP 401/403/500 bem definido.",
      "relatedTerms": [
        "bottom-up"
      ],
      "relatedLessons": [
        "2.8"
      ]
    },
    {
      "term": "Runbook",
      "shortDefinition": "Procedimento documentado para operação ou incidente.",
      "longDefinition": "Guia reutilizável com passos, comandos, interpretação, escalonamento e rollback.",
      "example": "Runbook de acesso HTTPS por camadas.",
      "relatedTerms": [
        "troubleshooting",
        "operação"
      ],
      "relatedLessons": [
        "2.8",
        "15.1"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Fundamentos de bits, sinais, protocolos, métricas e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Fundamentos de redes, equipamentos, métricas e comandos iniciais."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 2 aulas 2.1 a 2.7",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para aplicar o método por camadas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operações",
      "lesson": "logs, métricas e traces",
      "reason": "Troubleshooting por camadas se integra a observabilidade, incident response e runbooks."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação e Autorização",
      "lesson": "tokens, sessões e políticas",
      "reason": "Muitos sintomas de aplicação são falhas de identidade, não de rede."
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
      "2.9"
    ]
  }
};
