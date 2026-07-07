export const lesson0207 = {
  "id": "2.7",
  "moduleId": "m02",
  "order": 7,
  "title": "Camadas 5, 6 e 7 — Sessão, Apresentação e Aplicação",
  "subtitle": "Onde a comunicação deixa de ser apenas entrega de pacotes e passa a envolver sessões, formatos, criptografia, protocolos de aplicação, APIs e experiência do usuário.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 205,
  "tags": [
    "redes",
    "modelo osi",
    "camada 5",
    "camada 6",
    "camada 7",
    "sessão",
    "apresentação",
    "aplicação",
    "http",
    "tls",
    "dns",
    "api",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como método de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou encapsulamento, desencapsulamento e PDUs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.6",
      "reason": "A aula 2.6 explicou TCP, UDP, portas e conexões, que sustentam muitos protocolos de aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.3",
      "reason": "A aula 0.3 explicou codificações como UTF-8 e Base64, essenciais para entender apresentação de dados."
    }
  ],
  "objectives": [
    "Explicar o papel das Camadas 5, 6 e 7 no Modelo OSI.",
    "Diferenciar sessão, apresentação e aplicação sem decorar nomes vazios.",
    "Relacionar TLS, codificação, serialização, HTTP, DNS, APIs e autenticação com as camadas superiores.",
    "Diagnosticar quando a rede funciona, mas a aplicação, o certificado, o formato ou a sessão falha.",
    "Entender riscos de segurança em TLS, headers, cookies, tokens, dados codificados, logs e APIs.",
    "Coletar evidências defensivas de aplicação com comandos seguros e interpretação por camadas."
  ],
  "learningOutcomes": [
    "Dado um erro de acesso a sistema, o aluno separa falha de TCP, TLS, HTTP, DNS, autenticação e autorização.",
    "Dado um output de curl ou navegador, o aluno identifica evidências de camada de aplicação e apresentação.",
    "Dado um token, cookie ou payload Base64, o aluno entende que representação não significa proteção criptográfica.",
    "Dado um cenário de API em cloud, o aluno explica o papel de DNS, TCP, TLS, HTTP, gateway, sessão e identidade.",
    "Dado um alerta de segurança, o aluno sabe procurar evidências em logs de aplicação, proxy, WAF e IAM sem executar ataques."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Até agora você subiu a pilha: bits viram sinais, sinais viram frames, frames carregam pacotes IP, pacotes IP carregam segmentos TCP ou datagramas UDP, e portas entregam o tráfego ao serviço certo. Mas, no trabalho real, muitos incidentes começam depois disso. O ping responde, a rota existe, a porta 443 abre, o TLS até começa, mas o usuário vê erro de login, certificado inválido, JSON malformado, HTTP 500, CORS bloqueando a aplicação, cookie ausente ou token recusado.</p>\n  <p>As Camadas 5, 6 e 7 ajudam a organizar essa parte superior da comunicação. Elas representam sessão, apresentação e aplicação: manutenção de contexto, formato dos dados, criptografia, compressão, serialização, protocolos de aplicação e interação direta com serviços.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma API interna está inacessível para uma pipeline. O host resolve DNS, conecta em TCP/443 e recebe resposta do servidor, mas a pipeline falha com erro de certificado ou resposta HTTP 401. Se você parar na Camada 4, concluirá errado que \"a rede está funcionando\". Ela pode estar funcionando, mas o problema real está em TLS, sessão, autenticação, autorização, formato do payload ou política de aplicação.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>O Modelo OSI separou comunicação em camadas para reduzir confusão entre problemas diferentes. Nas camadas inferiores, o foco é transportar bits, frames, pacotes e segmentos. Nas camadas superiores, o foco muda: como manter uma conversa lógica, como representar dados de forma compreensível e como a aplicação define comandos, respostas e erros.</p>\n  <p>Na prática da internet, as camadas 5, 6 e 7 do OSI nem sempre aparecem como componentes separados. Muitos protocolos combinam funções. TLS, por exemplo, pode ser visto como parte da apresentação por criptografar e negociar parâmetros de segurança, mas na pilha TCP/IP ele fica entre transporte e aplicação. HTTP é aplicação, mas também carrega sessão por cookies, autenticação por headers, negociação de formato por Content-Type e comportamento de cache.</p>\n  <p>Com web, APIs, SSO, microserviços, cloud e DevSecOps, as camadas superiores ficaram ainda mais importantes. Hoje, boa parte dos incidentes não é \"cabo desconectado\" nem \"rota ausente\"; é certificado expirado, token inválido, política de CORS, payload em encoding errado, header ausente, cookie mal configurado, WAF bloqueando ou API gateway negando autorização.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>Sem separar sessão, apresentação e aplicação, diagnósticos ficam rasos. O técnico testa ping, testa porta e declara \"rede ok\". O desenvolvedor diz \"é problema de rede\". O time de segurança vê 403 ou 401 e acha que é indisponibilidade. O time de IAM vê login falhando e culpa DNS. Cada área usa uma linguagem diferente para sintomas parecidos.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sessão:</strong> quem está conversando, por quanto tempo, com qual contexto, cookie, token, estado ou negociação?</li>\n    <li><strong>Apresentação:</strong> os dados estão no formato certo, codificados corretamente, criptografados, comprimidos ou serializados como esperado?</li>\n    <li><strong>Aplicação:</strong> o protocolo de aplicação entende a requisição, o endpoint existe, o método é aceito e a resposta tem significado?</li>\n    <li><strong>Segurança:</strong> o certificado é confiável, o token é válido, a política permite, o WAF não bloqueou e os logs confirmam?</li>\n  </ul>\n  <p>Essas camadas não substituem IP, TCP ou UDP. Elas dependem deles. Porém, elas explicam por que \"consegui conectar\" não significa \"o sistema funcionou\".</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>As camadas superiores evoluíram de protocolos simples e texto claro para aplicações distribuídas, criptografia obrigatória, formatos estruturados, autenticação federada e inspeção de segurança.</p>\n  <table class=\"data-table comparison-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody>\n    <tr><td>Protocolos simples</td><td>Serviços enviavam comandos e respostas em texto ou formatos simples.</td><td>Pouca segurança, pouca padronização e pouca observabilidade.</td><td>HTTP, SMTP, DNS, SSH e outros protocolos mais estruturados.</td></tr>\n    <tr><td>Web inicial</td><td>HTTP sem criptografia era comum e sessões eram mantidas por cookies.</td><td>Dados podiam ser interceptados e sessões roubadas.</td><td>HTTPS/TLS como padrão operacional.</td></tr>\n    <tr><td>APIs modernas</td><td>JSON, REST, gRPC, tokens, headers e gateways viraram rotina.</td><td>Erros de contrato e autenticação podem parecer falha de rede.</td><td>OpenAPI, API gateways, observabilidade e validação automática.</td></tr>\n    <tr><td>Identidade federada</td><td>SSO, SAML, OAuth2 e OIDC usam redirecionamentos, tokens e sessões.</td><td>Depende de DNS, TLS, relógio, cookies, claims e políticas corretas.</td><td>Zero Trust, conditional access, workload identity e federation.</td></tr>\n    <tr><td>Segurança de aplicação</td><td>WAF, proxy, logs e SIEM analisam requisições e respostas.</td><td>Bloqueios podem ser mal interpretados como indisponibilidade.</td><td>Detecção contextual, policy as code e resposta automatizada.</td></tr>\n  </tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>No Modelo OSI, as Camadas 5, 6 e 7 representam funções próximas ao usuário e à aplicação.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> a Camada 5 organiza sessões e contexto de comunicação; a Camada 6 trata representação, codificação, compressão e criptografia dos dados; a Camada 7 define os protocolos e regras de interação usados diretamente pelas aplicações.</div>\n  <p>Na internet real, essas funções muitas vezes se misturam. HTTP pode carregar dados JSON em UTF-8, usar TLS para criptografia, manter sessão com cookie, enviar token em header Authorization e responder códigos como 200, 301, 401, 403, 404 ou 500. O valor do OSI aqui não é forçar uma fronteira perfeita, mas ensinar a perguntar: em que nível o problema aparece?</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Considere um acesso HTTPS a uma API. Várias funções superiores aparecem em sequência.</p>\n  <ol class=\"flow-list\">\n    <li>O cliente resolve o nome da API usando DNS.</li>\n    <li>O cliente estabelece TCP com a porta de destino, normalmente 443.</li>\n    <li>O cliente inicia TLS, valida certificado, negocia parâmetros e estabelece canal criptografado.</li>\n    <li>A aplicação envia uma requisição HTTP com método, caminho, headers, corpo e Content-Type.</li>\n    <li>O servidor interpreta o formato do corpo, por exemplo JSON em UTF-8.</li>\n    <li>O servidor valida sessão, cookie, token, claim, escopo ou política de acesso.</li>\n    <li>A aplicação executa lógica de negócio e responde com código, headers e payload.</li>\n    <li>Proxy, WAF, API gateway e logs podem registrar, transformar, bloquear ou enriquecer a transação.</li>\n  </ol>\n  <p>Uma falha em qualquer ponto muda o tipo de evidência. Certificado expirado não é falha de roteamento. HTTP 401 não é porta fechada. JSON inválido não é problema de cabo. Erro de CORS não é ausência de internet. Essa separação reduz retrabalho entre redes, segurança, plataforma e desenvolvimento.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura moderna, as camadas superiores aparecem em muitos componentes além do servidor final.</p>\n  <ul>\n    <li><strong>Navegador ou cliente:</strong> monta requisição, mantém cookies, valida certificado e interpreta resposta.</li>\n    <li><strong>Proxy corporativo:</strong> registra, filtra, autentica ou inspeciona tráfego conforme política.</li>\n    <li><strong>WAF:</strong> avalia padrões de requisição e pode bloquear tráfego de aplicação.</li>\n    <li><strong>Load balancer:</strong> termina TLS, distribui tráfego e realiza health checks.</li>\n    <li><strong>API gateway:</strong> valida rotas, quotas, tokens, headers e versões de API.</li>\n    <li><strong>IdP/IAM:</strong> emite tokens, valida sessão e aplica políticas de acesso.</li>\n    <li><strong>Aplicação:</strong> interpreta método, path, payload, regras de negócio e autorização.</li>\n  </ul>\n  <p>Em cloud, esses elementos podem ser serviços gerenciados. Em DevSecOps, eles viram configuração declarativa em Terraform, Helm, Kubernetes Ingress, Gateway API, annotations, secrets, certificados e policies.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Imagine uma reunião corporativa. As camadas inferiores são o prédio, a sala, a porta e a entrega das pessoas ao local correto. A Camada 5 é a organização da reunião: quem participa, quando começa, quando termina e qual contexto está mantido. A Camada 6 é o idioma, o formato dos documentos e a criptografia das mensagens. A Camada 7 é a pauta, as regras da conversa e as decisões tomadas.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes reais, essas funções podem se misturar. TLS, HTTP, cookies, tokens e aplicação não ficam sempre em caixas isoladas. A analogia ajuda a separar responsabilidades, mas o diagnóstico precisa olhar evidências concretas.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Você abre um site no navegador. O DNS resolve o nome, o TCP conecta na porta 443 e o TLS valida o certificado. Depois disso, o navegador envia uma requisição HTTP. O servidor responde HTML, CSS, JavaScript ou JSON. Se o certificado estiver vencido, o navegador alerta antes de confiar no canal. Se o servidor responder 404, a rede funcionou, mas o recurso não foi encontrado. Se responder 401, a aplicação exige autenticação. Se responder 500, há erro interno no serviço.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, o usuário acessa um portal interno. O tráfego passa por proxy, firewall, load balancer, WAF, aplicação e provedor de identidade. O usuário reclama que \"a rede caiu\". O analista verifica que TCP/443 estabelece, TLS está válido, mas o WAF bloqueou a requisição por header ausente ou payload fora do padrão. O problema é de camada de aplicação/política, não de cabo, rota ou porta.</p>\n  <p>Essa distinção muda a equipe envolvida, a evidência coletada e a solução. Talvez seja necessário ajustar uma regra de WAF, corrigir o cliente, renovar certificado, ajustar cookie SameSite, sincronizar relógio do IdP ou revisar escopos de token.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, um acesso a API pode passar por DNS gerenciado, CDN, WAF, load balancer, API gateway, serviço de identidade, service mesh e backend em container. A VPC/VNet, subnets e security groups podem estar corretos, mas a API falha por certificado errado, domínio não incluído no SAN, rota de API ausente, authorizer mal configurado, token sem claim ou payload maior que o limite do gateway.</p>\n  <p>Cloud também aumenta custo e operação nas camadas superiores. Logs de WAF, API gateway, load balancer e aplicação consomem armazenamento. TLS gerenciado, certificados, inspeção e observabilidade reduzem risco, mas exigem desenho, governança e automação.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em pipelines, as camadas superiores aparecem quando um runner acessa registry, API de cloud, Vault, GitHub, Kubernetes API Server ou um endpoint interno. A conexão TCP pode abrir, mas o job falha por certificado não confiável, proxy corporativo, token expirado, escopo insuficiente, JSON inválido, erro 429 de rate limit ou política de admission controller.</p>\n  <p>Por isso, pipelines maduros validam certificados, registram respostas HTTP, não imprimem tokens, usam secrets corretamente, monitoram códigos de resposta e distinguem erro de rede de erro de autenticação. Este tema se conecta diretamente ao curso Infraestrutura Moderna, Platform Engineering e DevSecOps, especialmente em pipelines, Kubernetes, Ingress, secrets e observabilidade.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Nas camadas superiores, muitos riscos são invisíveis para testes simples de conectividade. Um serviço pode estar acessível e ainda assim inseguro por aceitar TLS fraco, expor headers sensíveis, registrar tokens em log, permitir sessão sem expiração, aceitar CORS amplo, não validar Content-Type, retornar erros verbosos ou confiar em Base64 como se fosse criptografia.</p>\n  <table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n    <tr><td>Certificado inválido</td><td>Erro TLS, alerta no navegador ou falha em pipeline</td><td>Interrupção ou risco de interceptação</td><td>Inventário, renovação automática, validação de cadeia e monitoramento</td></tr>\n    <tr><td>Token em log</td><td>Headers Authorization ou cookies gravados sem sanitização</td><td>Roubo de sessão ou acesso indevido</td><td>Mascaramento, DLP, menor privilégio e rotação</td></tr>\n    <tr><td>WAF mal calibrado</td><td>Bloqueios 403 ou bypass de payloads perigosos</td><td>Indisponibilidade ou exposição</td><td>Modo monitorado, tuning, testes controlados e revisão de regras</td></tr>\n    <tr><td>CORS permissivo</td><td>Origins amplas e credenciais permitidas indevidamente</td><td>Exposição de dados em contexto web</td><td>Origins explícitas, revisão de credenciais e testes defensivos</td></tr>\n  </tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m02l07-title m02l07-desc\">\n    <title id=\"m02l07-title\">Camadas 5, 6 e 7 no acesso a uma API HTTPS</title>\n    <desc id=\"m02l07-desc\">O diagrama mostra cliente, TLS, sessão, formato de dados, HTTP, API gateway, identidade e aplicação.</desc>\n    <defs>\n      <marker id=\"m02l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"130\" width=\"160\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"120\" y=\"165\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"120\" y=\"192\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cookie/token</text>\n    <text x=\"120\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">requisição HTTP</text>\n    <rect x=\"280\" y=\"75\" width=\"160\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"360\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Camada 6</text>\n    <text x=\"360\" y=\"132\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TLS / formato</text>\n    <rect x=\"280\" y=\"190\" width=\"160\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"360\" y=\"223\" text-anchor=\"middle\" class=\"svg-label\">Camada 5</text>\n    <text x=\"360\" y=\"247\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sessão / contexto</text>\n    <rect x=\"525\" y=\"130\" width=\"185\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"617\" y=\"165\" text-anchor=\"middle\" class=\"svg-label\">WAF / API Gateway</text>\n    <text x=\"617\" y=\"192\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">headers, rota, quota</text>\n    <text x=\"617\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">validação de token</text>\n    <rect x=\"790\" y=\"130\" width=\"155\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"867\" y=\"165\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"867\" y=\"192\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">HTTP / JSON</text>\n    <text x=\"867\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">regra de negócio</text>\n    <line x1=\"200\" y1=\"180\" x2=\"280\" y2=\"112\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <line x1=\"200\" y1=\"190\" x2=\"280\" y2=\"225\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <line x1=\"440\" y1=\"183\" x2=\"525\" y2=\"183\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <line x1=\"710\" y1=\"183\" x2=\"790\" y2=\"183\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l07-arrow)\"></line>\n    <rect x=\"70\" y=\"330\" width=\"840\" height=\"150\" rx=\"18\" class=\"content-card\"></rect>\n    <text x=\"490\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Perguntas de diagnóstico nas camadas superiores</text>\n    <text x=\"110\" y=\"400\" class=\"svg-label svg-label--small\">Camada 5: a sessão existe, expirou ou perdeu contexto?</text>\n    <text x=\"110\" y=\"428\" class=\"svg-label svg-label--small\">Camada 6: TLS, codificação, compressão ou serialização estão corretos?</text>\n    <text x=\"110\" y=\"456\" class=\"svg-label svg-label--small\">Camada 7: método, path, header, payload, status HTTP e autorização fazem sentido?</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a separação entre sessão, apresentação, aplicação, identidade e transporte.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você investigará um cenário em que uma aplicação responde na porta 443, mas usuários e pipelines falham por motivos diferentes: certificado, token, rota de API, payload e política.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como separar evidências: TCP conecta, TLS negocia, HTTP responde, sessão existe, formato é aceito e autorização é concedida.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> as Camadas 5, 6 e 7 organizam sessão, representação dos dados e aplicação.</li>\n    <li><strong>O que lembrar:</strong> porta aberta não prova TLS válido, payload correto, sessão ativa ou autorização.</li>\n    <li><strong>Erro comum:</strong> chamar qualquer erro HTTP, TLS ou autenticação de \"problema de rede\".</li>\n    <li><strong>Uso real:</strong> diagnóstico de sites, APIs, SSO, WAF, proxies, gateways, pipelines e aplicações cloud.</li>\n    <li><strong>Segurança:</strong> tokens, cookies, certificados, headers e logs precisam ser tratados como evidências sensíveis.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você aplicará o Modelo OSI como método prático de troubleshooting. Em vez de estudar camada por camada isoladamente, você seguirá um fluxo de diagnóstico completo: física, enlace, rede, transporte, sessão, apresentação e aplicação.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 5",
      "Camada 6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Aplicação"
    ],
    "relatedProtocols": [
      "HTTP",
      "HTTPS",
      "TLS",
      "DNS",
      "SMTP",
      "SSH",
      "SAML",
      "OIDC",
      "OAuth2",
      "gRPC"
    ],
    "dependsOn": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "TCP",
      "UDP",
      "portas",
      "UTF-8",
      "Base64"
    ],
    "enables": [
      "APIs",
      "web",
      "SSO",
      "WAF",
      "API Gateway",
      "proxy",
      "observabilidade",
      "IAM",
      "DevSecOps"
    ]
  },
  "protocolFields": [
    {
      "field": "HTTP Method",
      "size": "variável",
      "purpose": "Indicar ação desejada, como GET, POST, PUT ou DELETE.",
      "securityObservation": "Método inesperado pode indicar erro de cliente, contrato quebrado ou tentativa indevida."
    },
    {
      "field": "HTTP Status Code",
      "size": "3 dígitos",
      "purpose": "Informar resultado da requisição, como 200, 301, 401, 403, 404 ou 500.",
      "securityObservation": "401 e 403 são evidências de autenticação/autorização, não necessariamente falha de rede."
    },
    {
      "field": "Content-Type",
      "size": "header variável",
      "purpose": "Indicar o formato do corpo, como application/json ou text/html.",
      "securityObservation": "Formato incorreto pode quebrar validação ou abrir risco se a aplicação confiar demais no cliente."
    },
    {
      "field": "Authorization",
      "size": "header variável",
      "purpose": "Transportar credenciais ou tokens quando usado.",
      "securityObservation": "Nunca deve ser exposto em logs, prints, tickets ou evidências não sanitizadas."
    },
    {
      "field": "TLS Certificate Subject/SAN",
      "size": "variável",
      "purpose": "Vincular certificado a nomes de domínio esperados.",
      "securityObservation": "Nome incorreto, cadeia inválida ou expiração causam falhas e riscos de confiança."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Estabelece transporte e inicia TLS.",
      "detail": "TCP/443 funciona, mas ainda falta validar certificado e negociar parâmetros.",
      "possibleFailure": "Certificado expirado, CA não confiável, SNI incorreto ou inspeção corporativa mal configurada."
    },
    {
      "step": 2,
      "actor": "Cliente",
      "action": "Monta requisição de aplicação.",
      "detail": "Define método, URL, headers, cookies, token, Content-Type e corpo.",
      "possibleFailure": "Header ausente, payload inválido, encoding errado ou token expirado."
    },
    {
      "step": 3,
      "actor": "Gateway/WAF",
      "action": "Aplica política de aplicação.",
      "detail": "Pode validar rota, quota, assinatura, token, tamanho e padrões de payload.",
      "possibleFailure": "Bloqueio 403, rate limit 429, rota não publicada ou regra mal calibrada."
    },
    {
      "step": 4,
      "actor": "Aplicação",
      "action": "Processa sessão, identidade e regra de negócio.",
      "detail": "Retorna status HTTP e payload de resposta.",
      "possibleFailure": "401, 403, 404, 409, 422, 500 ou erro de contrato."
    }
  ],
  "deepDive": {
    "mentalModel": "As camadas superiores explicam significado. TCP entrega bytes a uma porta; TLS protege o canal; encoding define como bytes viram texto; HTTP define método, headers e resposta; sessão e identidade definem contexto e permissão.",
    "keyTerms": [
      "sessão",
      "TLS",
      "certificado",
      "encoding",
      "serialização",
      "HTTP",
      "header",
      "cookie",
      "token",
      "API gateway",
      "WAF"
    ],
    "limitations": [
      "OSI não descreve perfeitamente a pilha TCP/IP real.",
      "TLS não garante que a aplicação é segura.",
      "HTTP 200 não garante que o resultado de negócio está correto.",
      "Base64 não é criptografia.",
      "Token válido não significa autorização para todas as ações."
    ],
    "whenToUse": [
      "Ao diagnosticar sites, APIs e SSO.",
      "Ao investigar erro HTTP, TLS ou autenticação.",
      "Ao revisar logs de proxy, WAF, gateway e aplicação.",
      "Ao desenhar pipelines que acessam serviços internos.",
      "Ao separar responsabilidade entre redes, segurança, plataforma e desenvolvimento."
    ],
    "whenNotToUse": [
      "Não usar camadas superiores para ignorar evidências de camada física, enlace, rede ou transporte.",
      "Não declarar problema de aplicação antes de testar DNS, rota, porta e TLS.",
      "Não publicar evidências com tokens, cookies ou dados pessoais."
    ],
    "operationalImpact": [
      "Exige correlação entre logs de rede, proxy, WAF, IAM e aplicação.",
      "Aumenta necessidade de documentação de endpoints, certificados, headers e contratos de API.",
      "Troubleshooting exige acesso a múltiplas equipes e ferramentas."
    ],
    "financialImpact": [
      "WAF, API gateway, logs, certificados gerenciados e observabilidade podem gerar custo recorrente em cloud.",
      "Erros em camadas superiores podem causar indisponibilidade sem consumo anormal de rede, dificultando detecção simples.",
      "Logs detalhados aumentam custo de armazenamento e retenção."
    ],
    "securityImpact": [
      "Tokens, cookies e certificados passam a ser ativos sensíveis.",
      "WAF e proxy ajudam a reduzir risco, mas não substituem autenticação, autorização e validação na aplicação.",
      "Erros verbosos podem revelar detalhes internos."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que TCP/443 aberto prova que a aplicação está funcionando.",
      "whyItHappens": "O teste de porta é mais simples que validar TLS, HTTP e autenticação.",
      "consequence": "Incidentes são fechados cedo demais e voltam sem solução.",
      "correction": "Validar também certificado, status HTTP, headers, payload e logs de aplicação."
    },
    {
      "mistake": "Confundir Base64 com criptografia.",
      "whyItHappens": "O texto codificado parece ilegível para humanos.",
      "consequence": "Segredos podem ser expostos em repositórios, logs ou tickets.",
      "correction": "Tratar Base64 como representação, não proteção."
    },
    {
      "mistake": "Tratar 401 e 403 como queda de rede.",
      "whyItHappens": "O usuário vê falha e reporta indisponibilidade genérica.",
      "consequence": "O time errado investiga por muito tempo.",
      "correction": "401 indica autenticação; 403 indica autorização ou política negada."
    },
    {
      "mistake": "Ignorar certificado em pipeline com opção insecure.",
      "whyItHappens": "A opção resolve rápido o erro de TLS.",
      "consequence": "Cria risco de confiança e pode mascarar interceptação ou configuração incorreta.",
      "correction": "Corrigir CA, cadeia, SAN, SNI e renovação do certificado."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Porta abre, mas navegador mostra erro de certificado.",
      "curl retorna 401, 403, 404, 500 ou 502.",
      "Pipeline falha em registry ou API com erro TLS.",
      "Aplicação funciona no navegador, mas falha no script.",
      "Usuário autentica, mas não acessa recurso."
    ],
    "diagnosticQuestions": [
      "DNS resolve para o destino esperado?",
      "TCP conecta na porta correta?",
      "TLS valida certificado e nome?",
      "Qual código HTTP retorna?",
      "Headers e Content-Type estão corretos?",
      "Token, cookie ou sessão estão válidos?",
      "WAF, proxy ou API gateway registrou bloqueio?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection exemplo.com -Port 443",
        "purpose": "Validar conectividade TCP até a porta 443.",
        "expectedObservation": "TcpTestSucceeded True quando a conexão TCP abre.",
        "interpretation": "Se falhar, investigar transporte antes de TLS/HTTP."
      },
      {
        "platform": "Windows",
        "command": "curl.exe -I https://exemplo.com",
        "purpose": "Observar headers e status HTTP sem baixar o corpo completo.",
        "expectedObservation": "Status HTTP e headers de resposta.",
        "interpretation": "Ajuda a diferenciar HTTP 200, 301, 401, 403, 404 e 500."
      },
      {
        "platform": "Linux",
        "command": "curl -vkI https://exemplo.com",
        "purpose": "Ver detalhes de TLS e headers HTTP em diagnóstico controlado.",
        "expectedObservation": "Negociação TLS, certificado apresentado e status HTTP.",
        "interpretation": "Use -k apenas para diagnóstico; não transforme em prática operacional."
      },
      {
        "platform": "Linux",
        "command": "openssl s_client -connect exemplo.com:443 -servername exemplo.com </dev/null",
        "purpose": "Inspecionar certificado e cadeia TLS.",
        "expectedObservation": "Certificado, validade, subject, issuer e verificação.",
        "interpretation": "Erro de certificado é camada de apresentação/segurança, não necessariamente rota."
      },
      {
        "platform": "Cisco IOS",
        "command": "show logging | include SSL|HTTP|AUTH|DENY",
        "purpose": "Buscar evidências em equipamentos que registram inspeção, proxy ou negação.",
        "expectedObservation": "Eventos relacionados a sessão, aplicação ou bloqueios.",
        "interpretation": "A disponibilidade de logs depende do equipamento e configuração."
      }
    ],
    "decisionTree": [
      {
        "if": "TCP/443 não conecta",
        "then": "Voltar para Camada 3/4: rota, firewall, listener ou ACL."
      },
      {
        "if": "TCP conecta, mas TLS falha",
        "then": "Verificar certificado, SNI, cadeia, validade, CA e inspeção corporativa."
      },
      {
        "if": "TLS funciona, mas HTTP retorna 401",
        "then": "Investigar autenticação, token, sessão ou credenciais."
      },
      {
        "if": "HTTP retorna 403",
        "then": "Investigar autorização, WAF, API gateway, escopo, grupo ou política."
      },
      {
        "if": "HTTP retorna 500",
        "then": "Coletar logs da aplicação, backend, dependências e correlação por request ID."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Validar certificados e não ignorar erros TLS em produção.",
      "Sanitizar tokens, cookies, headers e payloads antes de anexar evidências.",
      "Usar HTTPS com configurações modernas e renovação automatizada.",
      "Registrar request IDs e eventos úteis sem vazar segredos.",
      "Aplicar menor privilégio em tokens, escopos e sessões."
    ],
    "badPractices": [
      "Usar curl -k como solução permanente.",
      "Armazenar tokens em logs, tickets ou prints.",
      "Aceitar qualquer origem CORS sem justificativa.",
      "Expor erros internos detalhados para usuários finais.",
      "Confiar apenas em WAF sem corrigir a aplicação."
    ],
    "commonErrors": [
      "Confundir encoding com criptografia.",
      "Tratar 403 como indisponibilidade genérica.",
      "Não correlacionar logs de WAF, IAM e aplicação.",
      "Não controlar expiração e rotação de certificados."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de token em logs",
        "description": "Headers, cookies ou payloads sensíveis aparecem em logs ou evidências.",
        "defensiveExplanation": "O risco é roubo de sessão ou reuso indevido de credenciais.",
        "mitigation": "Mascaramento, retenção mínima, rotação, DLP e menor privilégio."
      },
      {
        "name": "TLS mal validado",
        "description": "Clientes ignoram validação de certificado ou aceitam CA incorreta.",
        "defensiveExplanation": "Isso enfraquece a garantia de identidade do servidor.",
        "mitigation": "Corrigir cadeia, SNI, SAN, CA corporativa e automação de renovação."
      },
      {
        "name": "CORS permissivo",
        "description": "Aplicação permite origins amplas e credenciais indevidas.",
        "defensiveExplanation": "Pode ampliar exposição em aplicações web.",
        "mitigation": "Origins explícitas, revisão de credenciais e testes defensivos."
      },
      {
        "name": "Erro verboso",
        "description": "Aplicação retorna stack trace, query, path interno ou segredo em resposta.",
        "defensiveExplanation": "Detalhes internos ajudam reconhecimento por terceiros.",
        "mitigation": "Mensagens genéricas ao usuário e logs detalhados apenas em ambiente protegido."
      }
    ],
    "monitoring": [
      "Logs de WAF, proxy, gateway, aplicação e IAM.",
      "Taxa de 401, 403, 404, 429 e 5xx.",
      "Falhas TLS e certificados próximos do vencimento.",
      "Uso anormal de tokens ou sessões."
    ],
    "hardening": [
      "TLS moderno e certificados gerenciados.",
      "Headers de segurança adequados.",
      "Validação de entrada e Content-Type.",
      "Sessões com expiração e proteção de cookies.",
      "Rate limiting e autenticação forte."
    ],
    "detectionIdeas": [
      "Aumento de 401 pode indicar credenciais expiradas ou tentativa indevida.",
      "Aumento de 403 pode indicar mudança de política, WAF ou abuso.",
      "Picos de 5xx podem indicar falha de backend.",
      "Erros TLS em massa podem indicar certificado expirado."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma porta aberta não significa que a aplicação está saudável?",
      "hints": [
        "Pense no que vem depois do TCP.",
        "TLS, HTTP e autenticação ainda podem falhar."
      ],
      "expectedIdeas": [
        "transporte",
        "TLS",
        "HTTP",
        "sessão",
        "autorização"
      ],
      "explanation": "Camada 4 entrega bytes ao serviço; as camadas superiores dão significado, segurança, formato e autorização."
    },
    {
      "type": "diagnóstico",
      "question": "Um curl retorna 403. Quais hipóteses você testaria antes de culpar roteamento?",
      "hints": [
        "403 é resposta de aplicação/política.",
        "Procure WAF, API gateway e autorização."
      ],
      "expectedIdeas": [
        "WAF",
        "permissão",
        "escopo",
        "token",
        "política",
        "logs"
      ],
      "explanation": "Se há 403, algum componente de aplicação respondeu. Isso é diferente de timeout ou porta fechada."
    },
    {
      "type": "cenário real",
      "question": "Uma pipeline acessa uma API interna e falha por certificado. Como você explicaria isso para redes, plataforma e segurança?",
      "hints": [
        "Separe TCP de TLS.",
        "Pense em CA, SAN, SNI e renovação."
      ],
      "expectedIdeas": [
        "TCP funciona",
        "TLS falha",
        "cadeia de confiança",
        "certificado",
        "automação"
      ],
      "explanation": "A explicação correta evita liberar regras desnecessárias de firewall e direciona a correção para certificado/confiança."
    }
  ],
  "quiz": [
    {
      "id": "q2.7.1",
      "type": "conceito",
      "q": "Qual é a melhor descrição para as camadas superiores do OSI no diagnóstico prático?",
      "opts": [
        "Elas tratam sessão, representação dos dados e protocolos de aplicação.",
        "Elas substituem TCP e UDP.",
        "Elas são usadas apenas em redes sem fio.",
        "Elas só servem para cabeamento."
      ],
      "a": 0,
      "exp": "Sessão, apresentação e aplicação ajudam a organizar contexto, formato, TLS, HTTP, APIs e erros de aplicação.",
      "difficulty": "iniciante",
      "topic": "modelo osi"
    },
    {
      "id": "q2.7.2",
      "type": "diagnóstico",
      "q": "TCP/443 conecta, mas o navegador alerta certificado expirado. Onde investigar primeiro?",
      "opts": [
        "Camada física",
        "Camada de apresentação/TLS",
        "ARP",
        "Gateway padrão"
      ],
      "a": 1,
      "exp": "A conectividade TCP existe; o erro aponta para validação de certificado/TLS.",
      "difficulty": "iniciante-intermediário",
      "topic": "tls"
    },
    {
      "id": "q2.7.3",
      "type": "segurança",
      "q": "Por que Base64 não deve ser tratado como proteção de segredo?",
      "opts": [
        "Porque é apenas uma representação reversível de bytes/texto.",
        "Porque só funciona em roteadores Cisco.",
        "Porque exige fibra óptica.",
        "Porque bloqueia DNS."
      ],
      "a": 0,
      "exp": "Base64 codifica; não criptografa nem protege confidencialidade.",
      "difficulty": "iniciante",
      "topic": "encoding"
    },
    {
      "id": "q2.7.4",
      "type": "cenário",
      "q": "Uma API retorna HTTP 401. Qual hipótese é mais provável?",
      "opts": [
        "Falha de autenticação ou credencial ausente/expirada.",
        "Cabo desconectado necessariamente.",
        "TTL zerado necessariamente.",
        "Switch sem tabela MAC necessariamente."
      ],
      "a": 0,
      "exp": "401 está ligado a autenticação. A rede pode estar entregando a resposta normalmente.",
      "difficulty": "iniciante",
      "topic": "http"
    },
    {
      "id": "q2.7.5",
      "type": "comparação",
      "q": "Qual diferença prática entre 401 e 403?",
      "opts": [
        "401 aponta autenticação; 403 aponta autorização ou política negada.",
        "401 é Camada 1; 403 é Camada 2.",
        "401 só ocorre em UDP; 403 só em ICMP.",
        "Não existe diferença."
      ],
      "a": 0,
      "exp": "Essa distinção ajuda a acionar IAM, aplicação ou política correta.",
      "difficulty": "iniciante-intermediário",
      "topic": "status http"
    },
    {
      "id": "q2.7.6",
      "type": "devsecops",
      "q": "Em uma pipeline, usar curl -k permanentemente para resolver erro TLS é uma má prática porque:",
      "opts": [
        "Ignora validação de certificado e pode mascarar problema de confiança.",
        "Aumenta automaticamente a banda da rede.",
        "Desativa TCP.",
        "Remove a necessidade de autenticação forte."
      ],
      "a": 0,
      "exp": "-k deve ser usado apenas em diagnóstico controlado. A correção real é ajustar confiança/certificado.",
      "difficulty": "intermediário",
      "topic": "pipeline"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.7.1",
      "front": "O que a Camada 5 representa no OSI?",
      "back": "Sessão e contexto de comunicação, como manutenção de estado, login, cookies e continuidade lógica da conversa.",
      "tags": [
        "osi",
        "sessão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.2",
      "front": "O que a Camada 6 representa?",
      "back": "Apresentação dos dados: codificação, serialização, compressão e criptografia, como UTF-8, JSON e TLS.",
      "tags": [
        "osi",
        "apresentação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.3",
      "front": "O que a Camada 7 representa?",
      "back": "Protocolos e regras de aplicação, como HTTP, DNS, SMTP, SSH, APIs e códigos de resposta.",
      "tags": [
        "osi",
        "aplicação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.4",
      "front": "Porta 443 aberta garante aplicação funcionando?",
      "back": "Não. Ainda podem falhar TLS, HTTP, sessão, autenticação, autorização, WAF ou backend.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.5",
      "front": "Base64 é criptografia?",
      "back": "Não. É codificação/representação textual de bytes e pode ser revertida facilmente.",
      "tags": [
        "segurança",
        "encoding"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.7.6",
      "front": "HTTP 403 normalmente indica o quê?",
      "back": "Acesso negado por autorização, WAF, API gateway ou política, mesmo que a aplicação esteja respondendo.",
      "tags": [
        "http",
        "segurança"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.7.1",
      "type": "conceitual",
      "prompt": "Explique por que um erro de certificado não deve ser tratado como simples falha de roteamento.",
      "expectedAnswer": "Porque a conexão pode chegar ao servidor e abrir TCP/443, mas a validação de identidade/confiança em TLS falha na camada de apresentação/segurança.",
      "explanation": "Roteamento leva ao destino; certificado valida confiança e identidade."
    },
    {
      "id": "ex2.7.2",
      "type": "diagnóstico",
      "prompt": "Classifique os sintomas: timeout TCP, certificado expirado, HTTP 401, JSON inválido e HTTP 500.",
      "expectedAnswer": "Timeout TCP: transporte/rede; certificado expirado: apresentação/TLS; 401: autenticação; JSON inválido: apresentação/aplicação; 500: aplicação/backend.",
      "explanation": "A classificação orienta a equipe e evidência correta."
    },
    {
      "id": "ex2.7.3",
      "type": "segurança",
      "prompt": "Liste três cuidados ao anexar evidências de curl em um ticket.",
      "expectedAnswer": "Remover tokens/cookies, ocultar dados pessoais, evitar payloads sensíveis, mascarar headers Authorization, manter request ID se necessário.",
      "explanation": "Evidência técnica pode conter credenciais e dados protegidos."
    },
    {
      "id": "ex2.7.4",
      "type": "cloud",
      "prompt": "Uma API em cloud retorna 403 atrás de um API Gateway. Cite quatro hipóteses.",
      "expectedAnswer": "Token sem escopo, authorizer negando, WAF bloqueando, rota não permitida, API key ausente, resource policy negando origem ou método não autorizado.",
      "explanation": "403 indica resposta de política/aplicação, não simples falha de link."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de API que conecta, mas não autentica",
    "scenario": "Uma aplicação interna acessada por navegador funciona para alguns usuários, mas falha para uma pipeline. TCP/443 conecta, DNS resolve e o certificado parece válido no navegador. A pipeline recebe 401 ou erro TLS dependendo do ambiente.",
    "tasks": [
      "Criar uma matriz por camada para TCP, TLS, HTTP, sessão, token e autorização.",
      "Listar evidências que devem ser coletadas sem vazar segredo.",
      "Separar hipóteses de redes, plataforma, segurança, IAM e aplicação.",
      "Propor correções seguras sem usar bypass permanente de TLS."
    ],
    "constraints": [
      "Não usar tokens reais no relatório.",
      "Não recomendar curl -k como solução permanente.",
      "Não atribuir causa única sem evidência.",
      "Incluir pelo menos uma hipótese de certificado e uma de IAM."
    ],
    "expectedDeliverables": [
      "Matriz por camada",
      "Lista de comandos seguros",
      "Tabela de hipóteses",
      "Plano de validação",
      "Riscos de segurança"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação por camadas",
        "points": 30,
        "description": "Diferencia transporte, TLS, HTTP, sessão, autenticação e autorização."
      },
      {
        "criterion": "Segurança das evidências",
        "points": 25,
        "description": "Remove tokens, cookies e dados sensíveis."
      },
      {
        "criterion": "Hipóteses completas",
        "points": 25,
        "description": "Inclui certificado, token, escopo, WAF, gateway e aplicação."
      },
      {
        "criterion": "Correção operacional",
        "points": 20,
        "description": "Propõe correções sustentáveis e não bypasses frágeis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O primeiro passo é não confundir conectividade com sucesso de aplicação. Se TCP conecta, o problema pode estar acima. Se TLS falha apenas na pipeline, pode haver CA ausente, SNI, proxy corporativo ou cadeia não instalada no ambiente do runner. Se retorna 401, é autenticação; se retorna 403, autorização ou política. Logs de gateway, WAF, IAM e aplicação devem ser correlacionados por request ID.",
    "steps": [
      "Validar DNS e TCP/443.",
      "Validar TLS com SNI e cadeia de confiança.",
      "Coletar status HTTP e headers sanitizados.",
      "Verificar se a pipeline envia token correto sem expor o valor.",
      "Correlacionar logs de IAM, WAF, API gateway e aplicação.",
      "Corrigir CA/certificado, escopos, audience, rota ou política conforme evidência."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar any-any no firewall.",
        "whyItIsWrong": "A porta já conecta; ampliar firewall não resolve TLS, token ou autorização e aumenta risco."
      },
      {
        "answer": "Usar curl -k para sempre.",
        "whyItIsWrong": "Ignora validação TLS e transforma um diagnóstico em vulnerabilidade operacional."
      },
      {
        "answer": "Dizer que 401 é problema de rede.",
        "whyItIsWrong": "401 é resposta de aplicação/autenticação; a rede entregou a resposta."
      }
    ],
    "finalAnswer": "A solução correta separa evidências: transporte funciona, TLS deve ser validado, HTTP deve ser interpretado, autenticação deve ser confirmada sem expor segredo, autorização deve ser verificada por escopos/políticas e logs devem ser correlacionados. A correção provável será CA/certificado no runner, ajuste de token/escopo/audience, regra de WAF/gateway ou configuração da aplicação."
  },
  "glossary": [
    {
      "term": "Sessão",
      "shortDefinition": "Contexto lógico mantido entre cliente e serviço.",
      "longDefinition": "Pode envolver cookies, tokens, identificadores, tempo de expiração e estado de autenticação.",
      "example": "Um login web mantém sessão para evitar pedir credenciais a cada clique.",
      "relatedTerms": [
        "cookie",
        "token",
        "estado"
      ],
      "relatedLessons": [
        "2.7",
        "8.4",
        "10.6"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo usado para proteger comunicação, validar identidade do servidor e criptografar dados em trânsito.",
      "longDefinition": "TLS negocia parâmetros, usa certificados e cria canal seguro para protocolos como HTTP.",
      "example": "HTTPS normalmente é HTTP sobre TLS.",
      "relatedTerms": [
        "certificado",
        "HTTPS",
        "CA"
      ],
      "relatedLessons": [
        "2.7",
        "8.3",
        "8.4"
      ]
    },
    {
      "term": "HTTP status code",
      "shortDefinition": "Código que indica o resultado de uma requisição HTTP.",
      "longDefinition": "Códigos como 200, 301, 401, 403, 404 e 500 ajudam a diagnosticar aplicação e política.",
      "example": "403 indica acesso negado, não necessariamente rede indisponível.",
      "relatedTerms": [
        "HTTP",
        "API",
        "WAF"
      ],
      "relatedLessons": [
        "2.7",
        "8.1"
      ]
    },
    {
      "term": "Content-Type",
      "shortDefinition": "Header que indica o formato do corpo da mensagem.",
      "longDefinition": "Ajuda cliente e servidor a interpretar dados como JSON, HTML, texto ou binário.",
      "example": "application/json indica corpo JSON.",
      "relatedTerms": [
        "JSON",
        "header",
        "encoding"
      ],
      "relatedLessons": [
        "0.3",
        "2.7",
        "8.2"
      ]
    },
    {
      "term": "WAF",
      "shortDefinition": "Firewall de aplicação web que inspeciona requisições HTTP/HTTPS.",
      "longDefinition": "Pode bloquear padrões suspeitos, impor regras e gerar logs de camada de aplicação.",
      "example": "Um WAF pode retornar 403 para uma requisição que viola política.",
      "relatedTerms": [
        "HTTP",
        "proxy",
        "segurança"
      ],
      "relatedLessons": [
        "2.7",
        "9.6"
      ]
    },
    {
      "term": "API Gateway",
      "shortDefinition": "Componente que publica, roteia, protege e observa APIs.",
      "longDefinition": "Pode validar tokens, limites, rotas, headers e transformar requisições.",
      "example": "Uma rota não publicada no gateway pode retornar 404 mesmo com backend saudável.",
      "relatedTerms": [
        "API",
        "OIDC",
        "WAF"
      ],
      "relatedLessons": [
        "2.7",
        "8.7"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 0.3: ASCII, Unicode, UTF-8 e Base64",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para entender codificação e representação."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Aula 2.6: Camada 4 — Transporte",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para portas e conexões antes das camadas superiores."
    },
    {
      "type": "rfc",
      "title": "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc8446",
      "note": "Referência moderna de TLS."
    },
    {
      "type": "rfc",
      "title": "RFC 9110 — HTTP Semantics",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9110",
      "note": "Referência para semântica HTTP."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m08",
      "lesson": "kubernetes-ingress-secrets",
      "reason": "Ingress, certificados, secrets e gateways dependem de TLS e HTTP."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m03",
      "lesson": "oidc-saml-sessoes",
      "reason": "OIDC, SAML, tokens e sessões dependem de HTTP, TLS, cookies e redirecionamentos."
    },
    {
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.x",
      "reason": "HTTP, HTTPS, TLS, proxies e APIs serão aprofundados no Módulo 8."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "2.8"
    ]
  }
};
