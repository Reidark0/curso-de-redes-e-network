export const lesson0208 = {
  "id": "2.8",
  "moduleId": "m02",
  "order": 8,
  "title": "Diagnóstico por camadas: método prático de troubleshooting",
  "subtitle": "Como transformar sintomas vagos em hipóteses testáveis usando o Modelo OSI, comandos, evidências e interpretação correta.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Em suporte, SOC, infraestrutura, cloud e DevSecOps, uma das frases mais perigosas é: <strong>\"a rede está lenta\"</strong>. Ela parece simples, mas não é diagnóstico. Pode significar cabo ruim, VLAN errada, rota ausente, DNS falhando, porta bloqueada, TLS quebrado, WAF negando, token expirado, aplicação em erro 500 ou simplesmente expectativa incorreta do usuário.</p>\n  <p>O método de diagnóstico por camadas transforma uma reclamação vaga em uma investigação organizada. Em vez de testar comandos aleatórios, você sobe ou desce a pilha OSI coletando evidências. Primeiro verifica se existe link e sinal. Depois verifica enlace local. Depois IP e rota. Depois transporte e portas. Depois sessão, apresentação e aplicação.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma aplicação interna \"não abre\" para um usuário remoto. O ping para o gateway funciona, DNS resolve, a porta 443 responde, mas o navegador mostra erro de certificado. Se você testar apenas conectividade IP, dirá que está tudo certo. Se você olhar por camadas, verá que a falha está acima do transporte, provavelmente na camada de apresentação/TLS.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Antes de modelos de camadas se tornarem comuns, troubleshooting era frequentemente feito por tentativa e erro. Um técnico verificava cabo, outro reiniciava roteador, outro liberava firewall, outro culpava DNS. Algumas vezes funcionava; muitas vezes gerava mudanças sem evidência, indisponibilidade maior e falsa conclusão.</p>\n  <p>O Modelo OSI não virou a implementação literal da internet, mas virou uma linguagem operacional. Ele permite que times diferentes conversem: física, enlace, rede, transporte, sessão, apresentação e aplicação. Essa separação é útil porque cada camada tem sintomas, ferramentas, logs, responsáveis e riscos diferentes.</p>\n  <p>Com cloud, VPN, Zero Trust, proxies, WAF, API gateways, Kubernetes, microserviços e IAM, o diagnóstico ficou mais complexo. Um fluxo moderno passa por rede local, Wi-Fi, NAT, provedor, VPN, balanceador, firewall, DNS privado, TLS, identidade, autorização e aplicação. Sem método, o profissional se perde. Com camadas, ele cria hipóteses testáveis.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que sintomas parecidos podem nascer em camadas diferentes. O usuário vê apenas \"não funciona\". O profissional precisa separar falha de meio físico, domínio de broadcast, rota, porta, sessão, certificado, payload, autenticação e autorização.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem método:</strong> comandos são executados sem ordem e as conclusões ficam baseadas em intuição.</li>\n    <li><strong>Sem evidência:</strong> a equipe muda firewall, DNS ou aplicação sem provar onde está a falha.</li>\n    <li><strong>Sem separação por camadas:</strong> um HTTP 403 pode ser confundido com queda de rede, e uma rota ausente pode ser confundida com problema de aplicação.</li>\n    <li><strong>Sem documentação:</strong> a próxima pessoa começa do zero e repete a investigação.</li>\n  </ul>\n  <p>Diagnóstico por camadas resolve esse problema ao impor uma sequência mental: formular hipótese, coletar evidência, interpretar o resultado, descartar causas e avançar para a próxima camada.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>O troubleshooting evoluiu de inspeção física e comandos isolados para investigação orientada por evidências, observabilidade e correlação entre camadas.</p>\n  <table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Evolução</th></tr></thead><tbody>\n    <tr><td>Tentativa e erro</td><td>Reiniciar equipamento, trocar cabo, liberar regra e testar de novo.</td><td>Pode mascarar a causa raiz e criar risco operacional.</td><td>Checklist por camada e coleta de evidências antes de alterar.</td></tr>\n    <tr><td>Comandos isolados</td><td>Executar ping, nslookup ou tracert sem hipótese clara.</td><td>Resultado correto em um comando não prova que tudo funciona.</td><td>Interpretação por camada e correlação entre comandos.</td></tr>\n    <tr><td>Logs locais</td><td>Olhar apenas no host ou servidor.</td><td>Perde evidências de firewall, proxy, WAF, cloud e IAM.</td><td>Observabilidade distribuída, SIEM, métricas, traces e logs centralizados.</td></tr>\n    <tr><td>Cloud e Zero Trust</td><td>Fluxos passam por políticas, identidades e serviços gerenciados.</td><td>Falhas de identidade podem parecer rede; falhas de rede podem parecer aplicação.</td><td>Diagnóstico por camadas + política + identidade + telemetria.</td></tr>\n  </tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Diagnóstico por camadas é um método de troubleshooting que usa o Modelo OSI como roteiro para investigar falhas de comunicação de forma ordenada.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> diagnosticar por camadas significa mapear um sintoma para possíveis falhas em cada camada, coletar evidências específicas, interpretar os resultados e avançar somente quando a camada anterior estiver suficientemente validada ou descartada.</div>\n  <p>O objetivo não é decorar sete nomes. O objetivo é raciocinar: existe sinal? existe enlace? existe IP? existe rota? existe transporte? existe sessão? os dados estão representados corretamente? a aplicação entende e autoriza a requisição?</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Um método prático pode seguir dois sentidos. No <strong>bottom-up</strong>, você começa pela Camada 1 e sobe. No <strong>top-down</strong>, você começa pela aplicação e desce. Em incidentes reais, o melhor caminho depende do sintoma.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Defina o sintoma:</strong> quem falha, de onde, para qual destino, desde quando e com qual mensagem?</li>\n    <li><strong>Identifique o escopo:</strong> afeta um usuário, uma VLAN, uma filial, uma aplicação, um provedor ou todos?</li>\n    <li><strong>Valide Camada 1:</strong> link, sinal, Wi-Fi, cabo, fibra, energia, velocidade negociada e erros físicos.</li>\n    <li><strong>Valide Camada 2:</strong> MAC, ARP, VLAN, switch, domínio de broadcast e gateway local.</li>\n    <li><strong>Valide Camada 3:</strong> IP, máscara, gateway, rota, TTL, caminho e retorno.</li>\n    <li><strong>Valide Camada 4:</strong> porta, listener, firewall stateful, TCP handshake, UDP, NAT e timeout.</li>\n    <li><strong>Valide Camadas 5-7:</strong> TLS, certificado, HTTP, DNS de aplicação, sessão, token, payload, WAF, autenticação e autorização.</li>\n    <li><strong>Registre evidências:</strong> comando, horário, origem, destino, resultado, interpretação e hipótese descartada.</li>\n  </ol>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, um fluxo raramente passa apenas por dois hosts. Pode envolver notebook, Wi-Fi, switch, firewall, VPN, proxy, DNS, balanceador, WAF, API gateway, servidor, banco de dados e IAM. O diagnóstico por camadas ajuda a colocar cada evidência no lugar certo.</p>\n  <ul>\n    <li><strong>Camada física:</strong> cabo, rádio, fibra, porta, energia, transceptor e sinal.</li>\n    <li><strong>Camada de enlace:</strong> VLAN, MAC, ARP, switch, trunk e domínio de broadcast.</li>\n    <li><strong>Camada de rede:</strong> IP, máscara, gateway, rota, NAT, TTL e caminho.</li>\n    <li><strong>Camada de transporte:</strong> TCP, UDP, portas, handshake, estado e timeout.</li>\n    <li><strong>Camadas superiores:</strong> TLS, HTTP, DNS de aplicação, sessão, token, API, WAF e autorização.</li>\n  </ul>\n  <p>Essa arquitetura também mostra pontos de falha: um problema em qualquer etapa pode gerar o mesmo sintoma final para o usuário.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em entregar um documento em um prédio corporativo. Primeiro você precisa de uma rua transitável. Depois precisa entrar no prédio. Depois encontrar o andar. Depois a sala. Depois a pessoa certa. Depois confirmar que ela aceita o documento e que o conteúdo está no formato esperado.</p>\n  <p>Na rede, a rua é o meio físico, o prédio local é o enlace, o endereço do prédio é IP, o andar e a sala lembram portas e serviços, e o conteúdo aceito pela pessoa lembra aplicação, sessão e autorização.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não são lineares como uma entrega física. Existem caminhos assimétricos, NAT, túneis, proxies, criptografia, políticas, cache e serviços distribuídos. A analogia ajuda a organizar o raciocínio, mas não substitui evidência técnica.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Seu notebook não acessa um site. Um diagnóstico por camadas poderia ser:</p>\n  <ol class=\"flow-list\">\n    <li>Verificar se o Wi-Fi está conectado e com sinal adequado.</li>\n    <li>Verificar se recebeu IP, máscara, gateway e DNS.</li>\n    <li>Ping para o gateway local.</li>\n    <li>Resolver o nome com DNS.</li>\n    <li>Testar conexão TCP/443.</li>\n    <li>Usar navegador ou <code>curl -I</code> para observar HTTP/TLS.</li>\n  </ol>\n  <p>Se o gateway responde, mas nomes não resolvem, o problema não é camada física. Se nomes resolvem e TCP conecta, mas HTTP retorna 403, a falha provavelmente está na camada de aplicação ou política.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um usuário da filial não acessa o ERP. O método por camadas evita conclusões precipitadas. Primeiro verifica se o problema é de um usuário ou da filial inteira. Depois valida Wi-Fi/cabo, VLAN, gateway, rota via WAN, firewall, porta do ERP, certificado, autenticação no IdP e autorização no sistema.</p>\n  <p>O mesmo sintoma pode ter causas distintas: cabo rompido, VLAN errada, rota estática ausente, regra de firewall expirada, certificado do ERP vencido, IdP indisponível ou perfil de acesso removido. O método separa cada hipótese.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, o diagnóstico por camadas aparece em VPC/VNet, subnets, route tables, security groups, NSGs, NAT gateway, load balancer, private endpoint, DNS privado, TLS, WAF e IAM. Um serviço pode estar saudável no load balancer, mas inacessível porque o security group bloqueia origem. Ou pode aceitar TCP/443, mas falhar por certificado, host header ou autorização.</p>\n  <p>A cloud aumenta a importância da documentação: muitas camadas são definidas por configuração e política, não por cabos visíveis. IaC, logs de fluxo, métricas de load balancer, WAF logs e audit logs ajudam a transformar arquitetura invisível em evidência.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Uma pipeline falha ao baixar uma imagem de container. Diagnóstico por camadas separa: o runner tem rede? resolve DNS do registry? alcança a rota? abre TCP/443? valida TLS? autentica no registry? tem autorização para aquele namespace? o proxy exige variável de ambiente? o certificado corporativo foi instalado no trust store?</p>\n  <p>Sem camadas, alguém pode liberar firewall desnecessariamente quando o problema real é token expirado. Ou pode trocar token quando o problema real é DNS privado. DevSecOps exige evidências antes de alterar infraestrutura, secrets ou políticas.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, diagnóstico por camadas reduz impacto e evita respostas erradas. Um pico de tráfego pode ser backup legítimo, exfiltração, DDoS, loop, varredura interna ou aplicação em retry. Cada hipótese aparece em camadas e evidências diferentes.</p>\n  <table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n    <tr><td>Coleta excessiva de evidências</td><td>Prints com IPs, tokens, cookies e nomes internos.</td><td>Vazamento de informação sensível.</td><td>Sanitizar evidências e limitar compartilhamento.</td></tr>\n    <tr><td>Conclusão precipitada</td><td>Bloquear tráfego sem provar a camada afetada.</td><td>Indisponibilidade e falso positivo.</td><td>Usar hipótese, evidência e validação por camada.</td></tr>\n    <tr><td>Firewall permissivo como correção</td><td>Regra any-any para \"testar\".</td><td>Aumento de superfície de ataque.</td><td>Teste controlado, janela, rollback e menor privilégio.</td></tr>\n    <tr><td>Logs sem contexto</td><td>Alertas isolados sem origem, destino, horário e camada.</td><td>Investigação lenta ou inconclusiva.</td><td>Correlacionar rede, aplicação, IAM e endpoint.</td></tr>\n  </tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m02l08-title m02l08-desc\">\n    <title id=\"m02l08-title\">Diagnóstico por camadas OSI</title>\n    <desc id=\"m02l08-desc\">Fluxo de diagnóstico que sobe da camada física até a aplicação, coletando evidências e descartando hipóteses.</desc>\n    <defs>\n      <marker id=\"m02l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n    </defs>\n    <rect x=\"40\" y=\"40\" width=\"250\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"165\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Sintoma</text>\n    <text x=\"165\" y=\"94\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">\"Aplicação não abre\"</text>\n\n    <rect x=\"370\" y=\"25\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"57\" text-anchor=\"middle\" class=\"svg-label\">7 Aplicação</text>\n    <rect x=\"370\" y=\"80\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">6 Apresentação/TLS</text>\n    <rect x=\"370\" y=\"135\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"167\" text-anchor=\"middle\" class=\"svg-label\">5 Sessão</text>\n    <rect x=\"370\" y=\"190\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"222\" text-anchor=\"middle\" class=\"svg-label\">4 Transporte/portas</text>\n    <rect x=\"370\" y=\"245\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"277\" text-anchor=\"middle\" class=\"svg-label\">3 Rede/IP/rotas</text>\n    <rect x=\"370\" y=\"300\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"332\" text-anchor=\"middle\" class=\"svg-label\">2 Enlace/MAC/VLAN</text>\n    <rect x=\"370\" y=\"355\" width=\"250\" height=\"50\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"495\" y=\"387\" text-anchor=\"middle\" class=\"svg-label\">1 Física/sinal/link</text>\n\n    <line x1=\"290\" y1=\"75\" x2=\"370\" y2=\"380\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l08-arrow)\" />\n    <line x1=\"620\" y1=\"380\" x2=\"740\" y2=\"380\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l08-arrow)\" />\n    <line x1=\"740\" y1=\"380\" x2=\"740\" y2=\"50\" class=\"svg-flow animated-flow\" marker-end=\"url(#m02l08-arrow)\" />\n\n    <rect x=\"710\" y=\"25\" width=\"230\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"825\" y=\"60\" text-anchor=\"middle\" class=\"svg-label\">Evidência</text>\n    <text x=\"825\" y=\"84\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">comando + resultado</text>\n    <text x=\"825\" y=\"106\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">+ interpretação</text>\n\n    <rect x=\"80\" y=\"455\" width=\"820\" height=\"70\" rx=\"16\" class=\"svg-boundary\" />\n    <text x=\"490\" y=\"485\" text-anchor=\"middle\" class=\"svg-label\">Regra do método</text>\n    <text x=\"490\" y=\"510\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Não pule para a solução: formule hipótese, colete evidência, interprete, descarte e só então altere configuração.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório constrói uma matriz de troubleshooting por camadas para um problema realista de acesso a serviço web. Você coletará evidências sem executar varreduras agressivas e sem expor dados sensíveis.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios treinam classificação de sintomas, escolha de comandos e interpretação de evidências.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá sintomas mistos de uma aplicação corporativa e deverá montar um plano de investigação por camadas, sem alterar configuração antes de coletar evidências.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução mostra como uma investigação madura evita saltar para firewall, DNS ou aplicação sem prova.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><ul><li><strong>Ideia central:</strong> troubleshooting por camadas transforma sintomas vagos em hipóteses testáveis.</li><li><strong>O que lembrar:</strong> um teste bem-sucedido em uma camada não prova que as camadas superiores funcionam.</li><li><strong>Erro comum:</strong> dizer \"a rede está ok\" só porque o ping respondeu.</li><li><strong>Uso real:</strong> suporte, NOC, SOC, cloud, DevSecOps, incidentes, mudanças e auditoria.</li><li><strong>Segurança:</strong> evidências devem ser coletadas com escopo, autorização e sanitização.</li></ul></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você aplicará o Modelo OSI especificamente à cibersegurança. Veremos como cada camada possui riscos, controles, logs, técnicas de detecção e limites éticos de investigação.</p></section>"
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
  "protocolFields": [
    {
      "field": "Evidência de Camada 1",
      "size": "variável",
      "purpose": "Indicar link, sinal, velocidade negociada, erros físicos ou Wi-Fi instável.",
      "securityObservation": "Evidências físicas podem revelar localização, portas e topologia interna."
    },
    {
      "field": "Evidência de Camada 3",
      "size": "variável",
      "purpose": "Mostrar IP, gateway, rota, TTL e caminho.",
      "securityObservation": "Rotas e IPs internos devem ser sanitizados em relatórios externos."
    },
    {
      "field": "Evidência de Camada 4",
      "size": "variável",
      "purpose": "Mostrar porta aberta, handshake, timeout, reset ou bloqueio stateful.",
      "securityObservation": "Teste de portas deve respeitar autorização e escopo."
    },
    {
      "field": "Evidência de Camada 7",
      "size": "variável",
      "purpose": "Mostrar status HTTP, header, erro de aplicação, WAF, autenticação ou autorização.",
      "securityObservation": "Headers, cookies e tokens podem conter segredos."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Usuário ou sistema",
      "action": "Relata sintoma",
      "detail": "O relato deve ser convertido em origem, destino, horário, serviço, erro e escopo.",
      "possibleFailure": "Sintoma incompleto leva a investigação errada."
    },
    {
      "step": 2,
      "actor": "Analista",
      "action": "Escolhe direção do diagnóstico",
      "detail": "Bottom-up para falhas amplas; top-down para erros claros de aplicação.",
      "possibleFailure": "Começar pela camada errada pode atrasar, mas não invalida se houver método."
    },
    {
      "step": 3,
      "actor": "Ferramentas",
      "action": "Coletam evidências por camada",
      "detail": "ipconfig, ip, ping, arp, traceroute, Test-NetConnection, ss, curl, logs e métricas.",
      "possibleFailure": "Comando sem interpretação gera falsa confiança."
    },
    {
      "step": 4,
      "actor": "Equipe técnica",
      "action": "Define ação corretiva mínima",
      "detail": "Só alterar configuração depois de hipótese forte e plano de rollback.",
      "possibleFailure": "Mudança ampla pode resolver sintoma e esconder causa raiz."
    }
  ],
  "deepDive": {
    "mentalModel": "Troubleshooting por camadas é uma investigação científica aplicada: sintoma vira hipótese; hipótese exige evidência; evidência precisa de interpretação; ação corretiva precisa de validação e rollback.",
    "keyTerms": [
      "sintoma",
      "hipótese",
      "evidência",
      "interpretação",
      "causa provável",
      "causa raiz",
      "rollback",
      "escopo",
      "matriz OSI"
    ],
    "limitations": [
      "OSI é modelo conceitual, não implementação perfeita da internet.",
      "Alguns problemas atravessam várias camadas ao mesmo tempo.",
      "Ping bloqueado não prova indisponibilidade.",
      "Porta aberta não prova aplicação saudável.",
      "HTTP 403 não prova falha de rede."
    ],
    "whenToUse": [
      "Incidentes de conectividade.",
      "Falhas de aplicação com suspeita de rede.",
      "Mudanças de firewall, proxy, VPN, cloud ou DNS.",
      "Troubleshooting entre times de rede, segurança e desenvolvimento."
    ],
    "whenNotToUse": [
      "Quando já existe evidência inequívoca e urgente de falha específica, como cabo rompido confirmado.",
      "Para justificar varreduras sem autorização.",
      "Como burocracia que atrasa mitigação emergencial já definida."
    ],
    "operationalImpact": [
      "Reduz retrabalho e conflitos entre equipes.",
      "Melhora qualidade de tickets e handoffs.",
      "Exige disciplina de documentação.",
      "Facilita pós-incidente e base de conhecimento."
    ],
    "financialImpact": [
      "Evita compra desnecessária de banda ou appliances.",
      "Reduz tempo médio de resolução.",
      "Diminui mudanças indevidas que causam indisponibilidade.",
      "Em cloud, ajuda a evitar custos por tráfego, NAT ou logs mal interpretados."
    ],
    "securityImpact": [
      "Evita regras permissivas sem evidência.",
      "Melhora detecção de abuso por camada.",
      "Reduz exposição de evidências sensíveis.",
      "Ajuda a diferenciar falha, ataque e política de segurança funcionando."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Dizer que a rede está ok porque o ping respondeu.",
      "whyItHappens": "Ping testa apenas parte da conectividade e pode não representar o serviço real.",
      "consequence": "Problemas de TCP, TLS, HTTP, sessão e autorização são ignorados.",
      "correction": "Testar a camada adequada ao sintoma, incluindo porta, TLS e aplicação."
    },
    {
      "mistake": "Liberar firewall antes de provar bloqueio.",
      "whyItHappens": "Firewall é culpado frequente em ambientes corporativos.",
      "consequence": "Aumenta superfície de ataque e pode não resolver a falha.",
      "correction": "Coletar evidência de origem, destino, porta, horário, regra e log."
    },
    {
      "mistake": "Confundir DNS com conectividade IP.",
      "whyItHappens": "Usuários acessam nomes, não IPs.",
      "consequence": "Trocas de rota ou firewall não resolvem falha de resolução.",
      "correction": "Separar resolução de nomes, rota, porta e aplicação."
    },
    {
      "mistake": "Compartilhar outputs com tokens, IPs internos e nomes sensíveis.",
      "whyItHappens": "Pressa em abrir ticket ou pedir ajuda.",
      "consequence": "Vazamento de informações úteis para ataque.",
      "correction": "Sanitizar evidências antes de compartilhar."
    }
  ],
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
        "command": "ping <gateway> && tracert <destino>",
        "purpose": "Testar alcance local e caminho IP básico.",
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
        "purpose": "Observar DNS, conexão TCP, TLS e headers HTTP.",
        "expectedObservation": "Etapas de conexão, certificado e status HTTP.",
        "interpretation": "Permite separar transporte, TLS e aplicação."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief && show ip route && show arp",
        "purpose": "Validar interfaces, rotas e resolução local em equipamento de rede.",
        "expectedObservation": "Interfaces up/up, rota esperada e ARP coerente.",
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
      "Use um site público ou ambiente próprio para testes.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir sintoma e escopo",
        "instruction": "Escreva origem, destino, horário, erro observado e quem é afetado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
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
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
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
      "Criar runbook por tipo de sintoma.",
      "Integrar logs de firewall, WAF e aplicação.",
      "Transformar a matriz em template de ticket."
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
    "challenge": "Monte uma matriz para o caso: usuário acessa portal via VPN, DNS resolve, TCP/443 conecta, mas navegador retorna 403.",
    "solution": "A Camada 4 parece funcional. A investigação deve seguir para TLS, HTTP, WAF, sessão, identidade e autorização. Verifique headers, logs do WAF/API gateway, token/cookie, grupo de acesso, origem via VPN e política. Não faz sentido liberar firewall any-any sem evidência."
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
      "id": "q2.8.1",
      "type": "conceito",
      "q": "O que significa diagnosticar por camadas?",
      "opts": [
        "Investigar comunicação usando hipóteses e evidências organizadas pelo Modelo OSI.",
        "Sempre começar liberando firewall.",
        "Usar apenas ping e nslookup.",
        "Decorar os nomes das sete camadas sem aplicar."
      ],
      "a": 0,
      "exp": "O método usa camadas como roteiro de investigação.",
      "difficulty": "iniciante",
      "topic": "método"
    },
    {
      "id": "q2.8.2",
      "type": "diagnóstico",
      "q": "Ping para o servidor responde, mas TCP/443 falha. Qual camada deve ser investigada com mais foco?",
      "opts": [
        "Transporte/firewall/listener.",
        "Somente física.",
        "Somente encoding UTF-8.",
        "Somente autorização IAM."
      ],
      "a": 0,
      "exp": "Se há alcance IP, mas a porta falha, transporte, firewall, NAT ou listener são hipóteses fortes.",
      "difficulty": "intermediário",
      "topic": "camada 4"
    },
    {
      "id": "q2.8.3",
      "type": "segurança",
      "q": "Por que evidências de troubleshooting precisam ser sanitizadas?",
      "opts": [
        "Porque podem conter IPs internos, tokens, cookies, domínios e informações de topologia.",
        "Porque comandos de rede nunca geram informação útil.",
        "Porque logs não têm valor técnico.",
        "Porque sanitizar impede qualquer diagnóstico."
      ],
      "a": 0,
      "exp": "Evidências podem ajudar o diagnóstico e também revelar dados sensíveis.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q2.8.4",
      "type": "cenário",
      "q": "TCP/443 conecta e curl mostra erro de certificado. Qual hipótese é mais provável?",
      "opts": [
        "Falha em TLS/camada de apresentação.",
        "Cabo desconectado.",
        "Switch sem energia.",
        "Máscara IP sempre errada."
      ],
      "a": 0,
      "exp": "A conexão TCP ocorreu; a falha aparece na negociação/validação TLS.",
      "difficulty": "intermediário",
      "topic": "tls"
    },
    {
      "id": "q2.8.5",
      "type": "comparação",
      "q": "Qual afirmação é correta?",
      "opts": [
        "Porta aberta não prova aplicação saudável.",
        "HTTP 403 prova cabo ruim.",
        "DNS funcionando prova autorização correta.",
        "Traceroute completo prova TLS válido."
      ],
      "a": 0,
      "exp": "Cada teste valida apenas parte da comunicação.",
      "difficulty": "iniciante",
      "topic": "interpretação"
    },
    {
      "id": "q2.8.6",
      "type": "comando",
      "q": "Qual comando no Windows testa conectividade TCP com uma porta específica?",
      "opts": [
        "Test-NetConnection <host> -Port 443",
        "arp -a",
        "ipconfig /flushdns",
        "route print somente"
      ],
      "a": 0,
      "exp": "Test-NetConnection permite testar uma porta TCP específica.",
      "difficulty": "iniciante",
      "topic": "comandos"
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
      "id": "fc2.8.3",
      "front": "Porta TCP aberta prova aplicação saudável?",
      "back": "Não. Prova apenas que houve resposta na camada de transporte; TLS, HTTP, sessão e autorização ainda podem falhar.",
      "tags": [
        "camada 4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.4",
      "front": "HTTP 401 indica o quê?",
      "back": "Problema de autenticação ou credencial ausente/inválida, não necessariamente falha de rede.",
      "tags": [
        "http",
        "iam"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.5",
      "front": "O que é bottom-up troubleshooting?",
      "back": "Método que começa nas camadas inferiores, como física/enlace, e sobe até aplicação.",
      "tags": [
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.8.6",
      "front": "Por que evitar any-any como teste?",
      "back": "Porque aumenta a superfície de ataque e pode mascarar a causa real. O teste deve ser específico e reversível.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.8.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre sintoma, hipótese e evidência.",
      "expectedAnswer": "Sintoma é o problema observado; hipótese é uma causa possível; evidência é dado coletado para sustentar ou descartar a hipótese.",
      "explanation": "Essa separação evita conclusões precipitadas."
    },
    {
      "id": "ex2.8.2",
      "type": "diagnóstico",
      "prompt": "Um usuário resolve DNS e conecta em TCP/443, mas recebe HTTP 403. Liste três hipóteses prováveis.",
      "expectedAnswer": "WAF bloqueando, autorização negada, origem não permitida, token/cookie inválido ou política de aplicação.",
      "explanation": "O problema aparece acima de TCP."
    },
    {
      "id": "ex2.8.3",
      "type": "comando/output",
      "prompt": "Qual comando você usaria no Linux para observar TLS e headers HTTP de um site?",
      "expectedAnswer": "curl -Iv https://<host>",
      "explanation": "O -I pede headers e o -v mostra detalhes de conexão/TLS."
    },
    {
      "id": "ex2.8.4",
      "type": "segurança",
      "prompt": "Cite três dados que devem ser mascarados em evidências compartilhadas externamente.",
      "expectedAnswer": "Tokens, cookies, IPs internos, nomes de host internos, domínios privados, usuários e headers sensíveis.",
      "explanation": "Evidências podem revelar superfície de ataque."
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
