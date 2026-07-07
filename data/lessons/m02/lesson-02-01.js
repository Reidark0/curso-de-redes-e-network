export const lesson0201 = {
  "id": "2.1",
  "moduleId": "m02",
  "order": 1,
  "title": "Por que o Modelo OSI existe",
  "subtitle": "Como um modelo de camadas transforma redes complexas em diagnóstico, arquitetura, documentação e comunicação entre times.",
  "duration": "80-115 min",
  "estimatedStudyTimeMinutes": 115,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "modelo osi",
    "camadas",
    "troubleshooting",
    "arquitetura",
    "segurança",
    "diagnóstico",
    "tcp/ip",
    "wireshark",
    "fundamentos"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "reason": "O Modelo OSI depende de bits, sinais, protocolos, métricas e pensamento em camadas vistos no Módulo 0."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m01",
      "reason": "É necessário entender dispositivos, topologias, meios, equipamentos, métricas e diagnóstico inicial antes de organizar esses elementos em camadas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "A aula 0.8 introduziu pensamento em camadas como método mental de troubleshooting."
    }
  ],
  "objectives": [
    "Explicar por que o Modelo OSI existe e que problema ele tenta resolver.",
    "Diferenciar modelo conceitual de implementação real de protocolo.",
    "Listar as sete camadas do OSI e a responsabilidade central de cada uma.",
    "Usar o OSI como linguagem comum entre suporte, redes, segurança, cloud e DevSecOps.",
    "Aplicar raciocínio por camadas em um diagnóstico inicial sem pular etapas.",
    "Reconhecer limitações do OSI e sua relação com o modelo TCP/IP."
  ],
  "learningOutcomes": [
    "Dado um sintoma de rede, o aluno consegue associá-lo a uma ou mais camadas prováveis.",
    "Dado um diagrama simples, o aluno identifica onde aparecem físico, enlace, rede, transporte e aplicação.",
    "Dado um chamado ambíguo, o aluno formula perguntas por camada antes de concluir a causa.",
    "Dado um cenário corporativo, o aluno usa OSI para documentar responsabilidades e evidências.",
    "Dado um problema de segurança, o aluno diferencia controle físico, segmentação, firewall, TLS e autenticação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine um chamado: <em>“o sistema não abre”</em>. Para o usuário, a frase parece suficiente. Para quem trabalha com redes, segurança, cloud ou DevSecOps, ela é vaga demais. O cabo pode estar desconectado, o Wi-Fi pode estar fraco, o host pode estar sem IP, o gateway pode estar errado, o DNS pode não resolver, a porta TCP pode estar bloqueada, o certificado TLS pode estar inválido, a aplicação pode estar fora ou a autenticação pode ter falhado.</p>\n  <p>O Modelo OSI existe para evitar que uma rede complexa seja tratada como uma massa única. Ele oferece uma forma de dividir o problema em partes menores, cada uma com responsabilidade própria. Isso melhora troubleshooting, documentação, arquitetura, comunicação entre times e análise de segurança.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o SOC vê tentativas de conexão falhando para um serviço interno. O time de redes diz que há rota. O time de segurança diz que o firewall não bloqueou. O time de aplicação diz que o serviço está no ar. Sem um modelo por camadas, cada time usa uma linguagem diferente e o diagnóstico fica lento.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Antes da padronização ampla das redes, muitos fabricantes criavam soluções próprias. Equipamentos, protocolos e aplicações nem sempre conversavam bem entre si. O crescimento das redes exigiu uma linguagem comum para explicar comunicação, dividir responsabilidades e permitir interoperabilidade.</p>\n  <p>O Modelo OSI, desenvolvido no contexto da ISO, foi criado como modelo de referência para descrever como sistemas abertos poderiam se comunicar. Embora a internet real tenha se consolidado principalmente sobre a pilha TCP/IP, o OSI permaneceu extremamente útil como ferramenta pedagógica e operacional. Ele não é apenas uma lista para decorar; é um mapa mental para enxergar onde cada mecanismo atua.</p>\n  <p>Hoje, quando alguém fala em “problema de camada 2”, “bloqueio na camada 4”, “falha de aplicação” ou “controle de camada 7”, está usando a linguagem conceitual herdada desse modelo. O OSI virou vocabulário comum entre redes, segurança, suporte, cloud, fabricantes e certificações.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>Sem um modelo de referência, qualquer falha vira “problema de rede”. Isso é perigoso. Um problema de DNS é diferente de um problema de cabo. Uma porta TCP bloqueada é diferente de senha incorreta. Um certificado inválido é diferente de firewall bloqueando. Se todos esses casos recebem o mesmo rótulo, o time perde tempo, reinicia coisas desnecessárias e deixa de coletar evidências importantes.</p>\n  <ul class=\"flow-list\">\n    <li><strong>O que quebra sem esse conceito:</strong> a análise fica desorganizada e os times culpam uns aos outros.</li>\n    <li><strong>Que confusão ele evita:</strong> separar sinal físico, quadro Ethernet, IP, porta, sessão, formato de dados e aplicação.</li>\n    <li><strong>Que escala ele permite:</strong> comunicar problemas de forma padronizada em ambientes grandes.</li>\n    <li><strong>Que risco reduz:</strong> decisões de segurança baseadas em suposições vagas.</li>\n    <li><strong>Que risco pode criar:</strong> decorar camadas sem entender que a implementação real nem sempre encaixa perfeitamente no modelo.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução do pensamento de redes passou de soluções proprietárias e análise informal para modelos de referência, pilhas reais de protocolo, troubleshooting por evidência e observabilidade moderna.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Redes proprietárias</td><td>Cada fabricante tinha seus mecanismos e vocabulário.</td><td>Baixa interoperabilidade e diagnóstico difícil.</td><td>Modelos de referência e padrões abertos.</td></tr>\n      <tr><td>Modelo OSI</td><td>Divide a comunicação em sete camadas conceituais.</td><td>Nem todo protocolo real segue fronteiras perfeitas.</td><td>Uso como linguagem de diagnóstico e ensino.</td></tr>\n      <tr><td>TCP/IP</td><td>Pilha prática usada na internet.</td><td>Tem menos camadas conceituais e mistura responsabilidades.</td><td>Comparação OSI/TCP-IP para operação real.</td></tr>\n      <tr><td>Cloud e SDN</td><td>Redes virtuais, políticas, overlays e automação.</td><td>O caminho físico fica abstraído.</td><td>OSI continua útil para separar físico, overlay, rota, política e aplicação.</td></tr>\n      <tr><td>Observabilidade moderna</td><td>Logs, métricas, traces, SIEM, NetFlow e APM.</td><td>Volume alto de sinais e correlação complexa.</td><td>Diagnóstico por camadas com evidências de múltiplas fontes.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>O Modelo OSI é um modelo conceitual de sete camadas usado para descrever responsabilidades envolvidas na comunicação entre sistemas. Ele organiza a comunicação desde o sinal físico até a aplicação percebida pelo usuário.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> o Modelo OSI é uma referência em camadas que ajuda a explicar, diagnosticar e documentar comunicação em rede, separando responsabilidades como transmissão física, endereçamento local, roteamento, transporte, sessão, apresentação e aplicação.</div>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Camada</th><th>Nome</th><th>Pergunta principal</th><th>Exemplos mentais</th></tr></thead>\n    <tbody>\n      <tr><td>7</td><td>Aplicação</td><td>Que serviço o usuário ou sistema está usando?</td><td>HTTP, DNS, API, SMTP, autenticação na aplicação</td></tr>\n      <tr><td>6</td><td>Apresentação</td><td>Como os dados são representados, codificados ou protegidos?</td><td>UTF-8, JSON, TLS conceitualmente, compressão</td></tr>\n      <tr><td>5</td><td>Sessão</td><td>Como a conversa é estabelecida, mantida ou retomada?</td><td>Sessões, estado, tokens, negociação</td></tr>\n      <tr><td>4</td><td>Transporte</td><td>Qual porta, conexão ou fluxo transporta os dados?</td><td>TCP, UDP, portas, handshake, retransmissão</td></tr>\n      <tr><td>3</td><td>Rede</td><td>Como o pacote chega a outra rede?</td><td>IP, roteamento, gateway, TTL</td></tr>\n      <tr><td>2</td><td>Enlace</td><td>Como há entrega local no mesmo enlace?</td><td>Ethernet, MAC, switch, VLAN, ARP</td></tr>\n      <tr><td>1</td><td>Física</td><td>Como bits viram sinais no meio?</td><td>Cobre, fibra, rádio, conectores, potência, ruído</td></tr>\n    </tbody>\n  </table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O OSI funciona como uma decomposição mental da comunicação. Ao enviar dados, cada camada adiciona ou interpreta informações necessárias para cumprir sua responsabilidade. Ao receber, o processo é invertido.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação:</strong> o navegador, cliente de API ou serviço cria uma mensagem com significado para a aplicação.</li>\n    <li><strong>Apresentação:</strong> os dados são codificados, serializados, possivelmente comprimidos ou protegidos.</li>\n    <li><strong>Sessão:</strong> a comunicação mantém contexto, estado, autenticação ou continuidade lógica quando aplicável.</li>\n    <li><strong>Transporte:</strong> TCP ou UDP organiza fluxos, portas, confiabilidade ou entrega sem conexão.</li>\n    <li><strong>Rede:</strong> IP permite sair da rede local e atravessar roteadores até outra rede.</li>\n    <li><strong>Enlace:</strong> Ethernet, Wi-Fi ou outro enlace entrega quadros localmente usando endereços e regras do domínio local.</li>\n    <li><strong>Física:</strong> os bits são transmitidos como sinais elétricos, luz ou rádio.</li>\n  </ol>\n  <p>No destino, ocorre a leitura inversa: sinal vira bits, bits viram quadro, quadro contém pacote, pacote contém segmento, segmento contém dados de aplicação. Essa ideia será aprofundada na aula 2.2 com encapsulamento, desencapsulamento e PDUs.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura real, o OSI ajuda a localizar componentes, evidências e pontos de falha.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Camada 1:</strong> cabos, fibra, rádio, energia, portas físicas, SFPs e interferência.</li>\n    <li><strong>Camada 2:</strong> switches, VLANs, MAC table, ARP e domínio de broadcast.</li>\n    <li><strong>Camada 3:</strong> roteadores, gateways, tabelas de rota, subnets e security routing.</li>\n    <li><strong>Camada 4:</strong> portas TCP/UDP, firewalls stateful, load balancers L4 e health checks.</li>\n    <li><strong>Camadas 5 a 7:</strong> TLS, HTTP, DNS, autenticação, proxy, WAF, APIs e regras de aplicação.</li>\n  </ul>\n  <p>Em cloud, esses elementos aparecem como VPC/VNet, subnet, route table, security group, NSG, load balancer, private endpoint, NAT gateway, firewall gerenciado, DNS privado e WAF. Em DevSecOps, aparecem em Terraform, Kubernetes Services, Ingress, NetworkPolicy, service mesh e testes automatizados de conectividade.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense no envio de uma encomenda. A camada física é a estrada, o veículo e a energia para mover a entrega. A camada de enlace é a entrega dentro do bairro ou prédio. A camada de rede é o sistema que escolhe cidades e rotas. A camada de transporte controla se a entrega exige confirmação. As camadas superiores cuidam do idioma do documento, da conversa e do serviço final.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes reais não são perfeitamente lineares. Protocolos podem misturar responsabilidades, criptografia pode atravessar conceitos de várias camadas, e equipamentos modernos podem operar em múltiplas camadas ao mesmo tempo.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Você abre um site no notebook. O cabo ou Wi-Fi precisa funcionar. O notebook precisa falar com o gateway local. O IP precisa alcançar o servidor. A porta TCP 443 precisa abrir. O TLS precisa negociar. O HTTP precisa enviar a requisição. O servidor precisa responder. Se a página não abre, o OSI permite perguntar: em qual etapa a evidência quebra?</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um usuário não acessa o ERP. O suporte verifica a interface e o IP. Redes verifica VLAN, switch, rota e firewall. Segurança verifica bloqueios, logs e política. O time de aplicação verifica status do serviço e autenticação. O Modelo OSI não resolve o problema sozinho, mas organiza a divisão de responsabilidades e evita que todos investiguem a mesma coisa de forma desordenada.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, uma VM não acessa um banco privado. Camada 3 pode envolver subnet e route table. Camada 4 pode envolver security group ou NSG bloqueando a porta. Camada 7 pode envolver endpoint errado, string de conexão incorreta ou autenticação negada. O OSI ajuda a separar conectividade de autorização: conseguir alcançar a porta não significa ter permissão para usar o banco.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Um pipeline falha ao publicar uma imagem no registry interno. O runner tem DNS? Tem rota? A porta 443 abre? O TLS é confiável? A API do registry responde? O token tem permissão? Cada pergunta vive em uma camada mental diferente. Isso evita que um erro de autorização seja tratado como rede, ou que um bloqueio de porta seja tratado como falha de credencial.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Segurança usa o OSI para aplicar defesa em profundidade. Controle físico protege portas e racks. Controles de enlace reduzem riscos de VLAN indevida e ARP spoofing. Camada 3 segmenta redes. Camada 4 restringe portas. Camada 7 aplica autenticação, WAF, validação de entrada e políticas de API.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Camada</th><th>Risco</th><th>Como aparece</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>1</td><td>Acesso físico indevido</td><td>Porta de rede exposta em área pública</td><td>NAC, bloqueio de portas, racks protegidos</td></tr>\n      <tr><td>2</td><td>Abuso local</td><td>ARP suspeito, VLAN indevida, MAC desconhecido</td><td>Port security, segmentação, monitoramento</td></tr>\n      <tr><td>3</td><td>Rota indevida</td><td>Subnets sensíveis alcançáveis sem necessidade</td><td>Rotas mínimas, ACLs, revisão de arquitetura</td></tr>\n      <tr><td>4</td><td>Porta exposta</td><td>Serviço escutando em porta não aprovada</td><td>Firewall, hardening, inventário de portas</td></tr>\n      <tr><td>7</td><td>Falha de aplicação</td><td>Bypass de autenticação, abuso de API, payload malicioso</td><td>WAF, validação, autenticação forte, logs</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l01-title m02l01-desc\">\n    <title id=\"m02l01-title\">Modelo OSI como pilha de diagnóstico</title>\n    <desc id=\"m02l01-desc\">Diagrama mostrando as sete camadas do Modelo OSI e como elas conectam sintomas, evidências e controles de segurança.</desc>\n    <defs>\n      <marker id=\"m02l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"70\" y=\"40\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"220\" y=\"73\" text-anchor=\"middle\" class=\"svg-label\">7 Aplicação — HTTP, DNS, API</text>\n    <rect x=\"70\" y=\"100\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"220\" y=\"133\" text-anchor=\"middle\" class=\"svg-label\">6 Apresentação — formato, TLS, encoding</text>\n    <rect x=\"70\" y=\"160\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"220\" y=\"193\" text-anchor=\"middle\" class=\"svg-label\">5 Sessão — estado e continuidade</text>\n    <rect x=\"70\" y=\"220\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"220\" y=\"253\" text-anchor=\"middle\" class=\"svg-label\">4 Transporte — TCP, UDP, portas</text>\n    <rect x=\"70\" y=\"280\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"220\" y=\"313\" text-anchor=\"middle\" class=\"svg-label\">3 Rede — IP, rota, gateway</text>\n    <rect x=\"70\" y=\"340\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"220\" y=\"373\" text-anchor=\"middle\" class=\"svg-label\">2 Enlace — MAC, switch, VLAN, ARP</text>\n    <rect x=\"70\" y=\"400\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"220\" y=\"433\" text-anchor=\"middle\" class=\"svg-label\">1 Física — cabo, fibra, rádio, sinal</text>\n\n    <rect x=\"555\" y=\"75\" width=\"300\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"705\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Sintoma</text>\n    <text x=\"705\" y=\"135\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">“o sistema não abre”</text>\n    <text x=\"705\" y=\"160\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">não é diagnóstico</text>\n\n    <rect x=\"555\" y=\"225\" width=\"300\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"705\" y=\"258\" text-anchor=\"middle\" class=\"svg-label\">Evidências por camada</text>\n    <text x=\"705\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link, IP, rota, porta, TLS, HTTP</text>\n    <text x=\"705\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs, métricas e capturas</text>\n\n    <rect x=\"555\" y=\"375\" width=\"300\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"705\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">Hipótese responsável</text>\n    <text x=\"705\" y=\"438\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">não pule etapas</text>\n\n    <line x1=\"370\" y1=\"250\" x2=\"555\" y2=\"130\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <line x1=\"705\" y1=\"185\" x2=\"705\" y2=\"225\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <line x1=\"705\" y1=\"335\" x2=\"705\" y2=\"375\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <text x=\"490\" y=\"495\" text-anchor=\"middle\" class=\"svg-label\">O OSI não é decoração: é um mapa para transformar sintoma em evidência e evidência em hipótese.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam classificação por camada e evitam o erro comum de chamar tudo de “rede”.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um chamado corporativo ambíguo e deverá criar uma árvore de investigação por camadas, indicando evidências, comandos, times envolvidos e riscos de segurança.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como sair do sintoma genérico e construir hipótese responsável por camadas.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> o Modelo OSI divide a comunicação em responsabilidades para facilitar entendimento, documentação e diagnóstico.</li>\n    <li><strong>O que lembrar:</strong> sintoma não é diagnóstico; evidência por camada reduz suposições.</li>\n    <li><strong>Erro comum:</strong> decorar as sete camadas sem saber aplicá-las em troubleshooting real.</li>\n    <li><strong>Uso real:</strong> suporte, redes, segurança, cloud e DevSecOps usam linguagem de camadas para localizar falhas.</li>\n    <li><strong>Limitação:</strong> OSI é modelo conceitual; a internet real usa TCP/IP e muitos produtos misturam funções.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você vai estudar encapsulamento, desencapsulamento e PDUs. Agora que sabe por que o OSI existe, o próximo passo é entender como dados descem e sobem pela pilha, ganhando cabeçalhos, endereços e controles em cada etapa.</p>\n</section>"
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
      "IPv6",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "bits",
      "sinais físicos",
      "protocolos",
      "métricas",
      "diagnóstico inicial",
      "dispositivos de rede"
    ],
    "enables": [
      "encapsulamento",
      "Wireshark",
      "troubleshooting por camadas",
      "segurança de redes",
      "modelo TCP/IP",
      "firewalls",
      "cloud networking"
    ]
  },
  "deepDive": {
    "mentalModel": "Use o OSI como mapa de perguntas. Cada camada responde uma pergunta diferente. Quando uma evidência falha, a hipótese fica mais precisa.",
    "keyTerms": [
      "modelo de referência",
      "camada",
      "serviço de camada",
      "encapsulamento",
      "PDU",
      "troubleshooting por camadas",
      "defesa em profundidade"
    ],
    "limitations": [
      "O OSI não é a implementação exata da internet moderna.",
      "Nem todo protocolo encaixa perfeitamente em uma única camada.",
      "Equipamentos como firewalls, load balancers, proxies e WAFs podem operar em múltiplas camadas.",
      "Criptografia, identidade e sessão podem atravessar fronteiras conceituais."
    ],
    "whenToUse": [
      "Ao ensinar redes.",
      "Ao diagnosticar falhas complexas.",
      "Ao documentar arquitetura.",
      "Ao explicar responsabilidades entre times.",
      "Ao mapear controles de segurança por profundidade."
    ],
    "whenNotToUse": [
      "Como substituto de documentação real de protocolo.",
      "Para discutir detalhes de implementação sem consultar RFCs ou documentação oficial.",
      "Para encerrar investigação apenas porque uma camada parece suspeita."
    ],
    "operationalImpact": [
      "Melhora comunicação entre times.",
      "Reduz tentativa e erro.",
      "Exige disciplina na coleta de evidências.",
      "Ajuda a priorizar troubleshooting do básico para o específico."
    ],
    "financialImpact": [
      "Reduz tempo de indisponibilidade quando aplicado corretamente.",
      "Evita compras desnecessárias de link, appliance ou licenças quando a causa está em outra camada.",
      "Pode exigir investimento em ferramentas de observabilidade para coletar evidências por camada."
    ],
    "securityImpact": [
      "Apoia defesa em profundidade.",
      "Ajuda a separar conectividade de autorização.",
      "Evita falsa sensação de segurança baseada apenas em firewall de perímetro.",
      "Melhora investigação ao associar logs, fluxos e sintomas a camadas."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Decorar as sete camadas sem aplicar em diagnóstico.",
      "whyItHappens": "Muitos cursos apresentam OSI como lista de memorização.",
      "consequence": "O aluno sabe repetir nomes, mas não sabe investigar falhas reais.",
      "correction": "Sempre associe cada camada a uma pergunta, uma evidência e um ponto de falha."
    },
    {
      "mistake": "Chamar qualquer falha de aplicação de problema de rede.",
      "whyItHappens": "Para o usuário, tudo que depende da rede parece rede.",
      "consequence": "O time errado é acionado e o diagnóstico atrasa.",
      "correction": "Separe físico, enlace, rede, transporte, apresentação, sessão e aplicação."
    },
    {
      "mistake": "Achar que ping bem-sucedido prova que o sistema está funcionando.",
      "whyItHappens": "Ping é um teste fácil e rápido.",
      "consequence": "Ignora porta, TLS, HTTP, autenticação e autorização.",
      "correction": "Use ping apenas como uma evidência de alcance ICMP, não como prova de saúde de aplicação."
    },
    {
      "mistake": "Forçar todo produto moderno em uma camada única.",
      "whyItHappens": "O modelo é apresentado como caixas rígidas.",
      "consequence": "Confusão ao analisar proxies, WAF, load balancers e service mesh.",
      "correction": "Use OSI como referência conceitual e reconheça componentes multicamada."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Sistema não abre",
      "Ping falha",
      "Nome não resolve",
      "Porta não conecta",
      "Página abre parcialmente",
      "VPN conecta mas serviço não responde",
      "Aplicação retorna erro de autenticação"
    ],
    "diagnosticQuestions": [
      "A interface física ou Wi-Fi está ativa?",
      "O host recebeu IP, máscara, gateway e DNS?",
      "O gateway responde?",
      "O destino é alcançável por IP?",
      "A porta TCP/UDP necessária está aberta?",
      "O nome DNS resolve para o IP esperado?",
      "TLS, proxy, WAF ou autenticação estão envolvidos?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && ping <gateway> && tracert <destino> && nslookup <nome>",
        "purpose": "Coletar evidências iniciais de configuração, alcance, caminho e DNS.",
        "expectedObservation": "IP válido, gateway definido, rota com saltos coerentes e DNS resolvendo.",
        "interpretation": "Falhas em etapas diferentes sugerem camadas diferentes."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ping -c 4 <gateway> && traceroute <destino> && dig <nome>",
        "purpose": "Observar interfaces, rota padrão, alcance, caminho e resolução DNS.",
        "expectedObservation": "Interface UP, rota default, respostas do gateway e resolução coerente.",
        "interpretation": "Ausência de rota ou DNS incoerente direciona a investigação."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow interfaces status\nshow mac address-table\nshow ip route",
        "purpose": "Ver estado de interfaces, camada 2 e camada 3 em equipamentos de rede.",
        "expectedObservation": "Interfaces up/up, MACs aprendidos e rotas coerentes.",
        "interpretation": "Interface down, ausência de MAC ou rota ausente indicam camadas prováveis de falha."
      }
    ],
    "decisionTree": [
      {
        "if": "Interface está down",
        "then": "Investigue camada física: cabo, porta, Wi-Fi, SFP, energia ou driver."
      },
      {
        "if": "Interface tem IP, mas gateway não responde",
        "then": "Investigue enlace local, VLAN, ARP, switch, firewall local ou gateway."
      },
      {
        "if": "Gateway responde, mas destino por IP não",
        "then": "Investigue rota, firewall, ACL, VPN ou indisponibilidade remota."
      },
      {
        "if": "Destino por IP responde, mas nome falha",
        "then": "Investigue DNS, search suffix, split DNS ou DNS privado."
      },
      {
        "if": "Porta conecta, mas aplicação nega acesso",
        "then": "Investigue TLS, autenticação, autorização, sessão ou aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar controles por camada.",
      "Coletar evidências antes de alterar configuração.",
      "Separar conectividade de autenticação e autorização.",
      "Aplicar defesa em profundidade em vez de depender de um único controle.",
      "Sanitizar diagramas e evidências antes de compartilhar."
    ],
    "badPractices": [
      "Liberar any-any porque o diagnóstico está difícil.",
      "Tratar ping como prova de acesso autorizado.",
      "Ignorar camada física e enlace em incidentes internos.",
      "Expor diagramas completos com IPs, nomes e caminhos sensíveis.",
      "Culpar DNS ou firewall sem evidência."
    ],
    "commonErrors": [
      "Confundir camada 3 com camada 4.",
      "Confundir conexão TCP com login bem-sucedido.",
      "Achar que TLS resolve autorização.",
      "Achar que NAT é controle de segurança completo."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana com controles apenas na borda",
        "description": "Quando só o perímetro é protegido, um comprometimento interno pode alcançar muitos sistemas.",
        "defensiveExplanation": "O OSI ajuda a distribuir controles: físico, enlace, rede, transporte e aplicação.",
        "mitigation": "Segmentação, firewall interno, NAC, autenticação forte, logs e menor privilégio."
      },
      {
        "name": "Exposição de serviço em camada 4 sem controle em camada 7",
        "description": "Uma porta aberta pode permitir acesso ao serviço se não houver autenticação, autorização e validação adequadas.",
        "defensiveExplanation": "Abrir porta é diferente de controlar uso seguro da aplicação.",
        "mitigation": "Firewall mínimo, autenticação forte, WAF quando aplicável, logs e revisão de permissões."
      },
      {
        "name": "Diagnóstico com evidências sensíveis expostas",
        "description": "Prints de IPs, nomes internos e rotas podem revelar arquitetura para pessoas não autorizadas.",
        "defensiveExplanation": "Evidência técnica também é informação sensível.",
        "mitigation": "Sanitização, classificação da informação e compartilhamento apenas com times autorizados."
      }
    ],
    "monitoring": [
      "Logs de firewall e proxy por porta e aplicação.",
      "NetFlow ou equivalente para fluxos de camada 3/4.",
      "Alertas de mudanças de rota, VLAN ou DNS.",
      "Métricas de disponibilidade por camada.",
      "SIEM correlacionando eventos de endpoint, rede e aplicação."
    ],
    "hardening": [
      "Desabilitar portas físicas não usadas.",
      "Documentar VLANs, subnets, rotas e regras.",
      "Aplicar menor privilégio em regras de firewall.",
      "Validar TLS e certificados.",
      "Usar autenticação e autorização fortes na aplicação."
    ],
    "detectionIdeas": [
      "Aumento de conexões laterais internas.",
      "Portas novas expostas sem change request.",
      "Resolução DNS para destinos incomuns.",
      "Mudanças de gateway ou ARP inesperadas.",
      "Erros de TLS ou autenticação em massa."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o Modelo OSI continua útil mesmo que a internet real use TCP/IP?",
      "hints": [
        "Pense em linguagem comum.",
        "Pense em diagnóstico, não apenas implementação."
      ],
      "expectedIdeas": [
        "modelo conceitual",
        "diagnóstico",
        "comunicação entre times",
        "camadas",
        "evidência"
      ],
      "explanation": "O OSI é útil porque organiza responsabilidades e perguntas, mesmo quando a implementação real não segue fronteiras perfeitas."
    },
    {
      "type": "diagnóstico",
      "question": "Um host pinga o gateway, mas não abre um site por nome. Quais camadas você investigaria primeiro?",
      "hints": [
        "Gateway responde, então a camada local tem alguma evidência positiva.",
        "Nome por domínio envolve DNS."
      ],
      "expectedIdeas": [
        "camada 3 parcialmente ok",
        "DNS",
        "camada 7",
        "porta",
        "proxy"
      ],
      "explanation": "O próximo foco seria DNS e depois transporte/aplicação. Ping no gateway não prova que DNS, TCP/443 ou HTTP funcionam."
    },
    {
      "type": "cenário real",
      "question": "Em uma reunião de incidente, como você usaria OSI para evitar que todos culpem “a rede”?",
      "hints": [
        "Pense em evidências por camada.",
        "Pense em responsáveis e logs."
      ],
      "expectedIdeas": [
        "matriz de evidências",
        "camada provável",
        "logs",
        "comandos",
        "responsabilidade",
        "hipótese"
      ],
      "explanation": "Você pode transformar o sintoma em perguntas por camada, listar evidências já coletadas e direcionar o próximo teste ao ponto mais provável."
    }
  ],
  "quiz": [
    {
      "id": "q2.1.1",
      "type": "conceito",
      "q": "Qual é a principal utilidade prática do Modelo OSI?",
      "opts": [
        "Substituir TCP/IP na internet moderna",
        "Organizar responsabilidades de comunicação em camadas",
        "Criptografar conexões HTTP automaticamente",
        "Aumentar a velocidade física do cabo"
      ],
      "a": 1,
      "exp": "O OSI é um modelo de referência que organiza responsabilidades e ajuda no ensino, documentação e troubleshooting.",
      "difficulty": "iniciante",
      "topic": "modelo osi"
    },
    {
      "id": "q2.1.2",
      "type": "diagnóstico",
      "q": "Um cabo desconectado ou sinal Wi‑Fi inexistente está mais associado a qual camada?",
      "opts": [
        "Camada 1 — Física",
        "Camada 4 — Transporte",
        "Camada 6 — Apresentação",
        "Camada 7 — Aplicação"
      ],
      "a": 0,
      "exp": "A camada física trata do meio, sinal, conectores, rádio, fibra, cobre e energia de transmissão.",
      "difficulty": "iniciante",
      "topic": "camada física"
    },
    {
      "id": "q2.1.3",
      "type": "comparação",
      "q": "Por que ping bem-sucedido não prova que uma aplicação web está funcionando?",
      "opts": [
        "Porque ping testa apenas DNS",
        "Porque ICMP/alcance não valida porta TCP, TLS, HTTP, autenticação ou aplicação",
        "Porque ping sempre usa camada 7",
        "Porque ping só funciona em redes sem roteador"
      ],
      "a": 1,
      "exp": "Ping pode indicar algum alcance ICMP, mas não valida os mecanismos de transporte e aplicação necessários para um serviço web.",
      "difficulty": "iniciante-intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q2.1.4",
      "type": "segurança",
      "q": "Qual é um exemplo de defesa em profundidade usando a lógica do OSI?",
      "opts": [
        "Usar apenas NAT como segurança",
        "Proteger físico, segmentar rede, restringir portas e autenticar aplicação",
        "Liberar any-any para simplificar diagnóstico",
        "Desativar logs para reduzir ruído"
      ],
      "a": 1,
      "exp": "Defesa em profundidade distribui controles por camadas, reduzindo dependência de um único mecanismo.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q2.1.5",
      "type": "cloud",
      "q": "Em cloud, uma VM alcança a porta do banco, mas recebe erro de permissão. Qual distinção o OSI ajuda a fazer?",
      "opts": [
        "Conectividade não é o mesmo que autorização",
        "Todo erro de banco é camada 1",
        "Security group substitui IAM",
        "DNS sempre é a causa"
      ],
      "a": 0,
      "exp": "A porta aberta indica conectividade de transporte, mas permissão depende de identidade, política e aplicação.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q2.1.6",
      "type": "arquitetura",
      "q": "Qual afirmação sobre OSI está correta?",
      "opts": [
        "Todo produto moderno atua em uma única camada",
        "O OSI é um modelo conceitual; componentes reais podem operar em várias camadas",
        "O OSI elimina a necessidade de logs",
        "O OSI torna desnecessário entender TCP/IP"
      ],
      "a": 1,
      "exp": "O OSI é uma referência. Firewalls, proxies, WAFs e load balancers podem atuar em múltiplas camadas.",
      "difficulty": "intermediário",
      "topic": "limitações"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.1.1",
      "front": "O que é o Modelo OSI?",
      "back": "Um modelo conceitual de sete camadas usado para organizar responsabilidades da comunicação em rede.",
      "tags": [
        "osi",
        "camadas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.2",
      "front": "Qual camada trata de cabo, fibra, rádio e sinal?",
      "back": "Camada 1 — Física.",
      "tags": [
        "camada 1"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.3",
      "front": "Qual camada trata de MAC, switch, VLAN e ARP?",
      "back": "Camada 2 — Enlace.",
      "tags": [
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.4",
      "front": "Qual camada trata de IP, roteamento e gateway?",
      "back": "Camada 3 — Rede.",
      "tags": [
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.5",
      "front": "Qual camada trata de TCP, UDP e portas?",
      "back": "Camada 4 — Transporte.",
      "tags": [
        "camada 4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.1.6",
      "front": "Qual erro comum o OSI ajuda a evitar?",
      "back": "Chamar qualquer falha de “problema de rede” sem evidência por camada.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante-intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.1.1",
      "type": "classificação",
      "prompt": "Classifique os itens em camadas prováveis: cabo desconectado, MAC address, rota default, porta TCP 443, erro HTTP 403.",
      "expectedAnswer": "Cabo: camada 1; MAC: camada 2; rota default: camada 3; TCP 443: camada 4; HTTP 403: camada 7/aplicação/autorização.",
      "explanation": "A classificação ajuda a não misturar conectividade física, enlace, rede, transporte e aplicação."
    },
    {
      "id": "ex2.1.2",
      "type": "diagnóstico",
      "prompt": "Um usuário diz que o sistema não abre. Liste cinco perguntas por camadas antes de culpar firewall.",
      "expectedAnswer": "A interface está ativa? O host tem IP/gateway/DNS? O gateway responde? O nome resolve? A porta do serviço conecta? O TLS/HTTP retorna qual erro?",
      "explanation": "O firewall pode ser uma causa, mas a análise deve coletar evidências antes."
    },
    {
      "id": "ex2.1.3",
      "type": "segurança",
      "prompt": "Explique por que abrir uma porta no firewall não resolve uma falha de autenticação.",
      "expectedAnswer": "Firewall atua em conectividade/política de tráfego. Autenticação pertence à aplicação/identidade. Se a porta já conecta e a falha é login, o problema está em credenciais, token, IAM, sessão ou autorização.",
      "explanation": "Conectividade e autorização são dimensões diferentes."
    },
    {
      "id": "ex2.1.4",
      "type": "arquitetura",
      "prompt": "Escolha um serviço que você usa no trabalho e descreva uma evidência de camada 1, 2/3, 4 e 7.",
      "expectedAnswer": "Resposta variável: deve conter evidência física ou Wi‑Fi, IP/rota, porta e resposta de aplicação.",
      "explanation": "O exercício força a aplicar o modelo a uma situação real."
    }
  ],
  "challenge": {
    "title": "Transforme um chamado genérico em investigação por camadas",
    "scenario": "Um usuário remoto conectado por VPN diz: “não consigo acessar o sistema financeiro”. O sistema usa HTTPS em um endereço interno e autenticação corporativa.",
    "tasks": [
      "Criar uma tabela com as sete camadas OSI.",
      "Indicar uma pergunta de diagnóstico por camada.",
      "Indicar um comando, log ou evidência por camada quando aplicável.",
      "Separar conectividade, DNS, TLS, aplicação e autorização.",
      "Apontar riscos de segurança e cuidados ao compartilhar evidências."
    ],
    "constraints": [
      "Não assumir que o firewall é a causa sem evidência.",
      "Não executar testes contra sistemas sem autorização.",
      "Sanitizar IPs, nomes internos e usuários no relatório.",
      "Explicar o próximo time a ser acionado com base na primeira evidência de falha."
    ],
    "expectedDeliverables": [
      "Tabela OSI de diagnóstico",
      "Hipótese inicial",
      "Evidências necessárias",
      "Riscos e sanitização",
      "Próximo passo recomendado"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta das camadas",
        "points": 30,
        "description": "Classifica sintomas e evidências sem misturar camada 3, 4 e 7."
      },
      {
        "criterion": "Qualidade das evidências",
        "points": 30,
        "description": "Indica comandos, logs ou observações coerentes para cada etapa."
      },
      {
        "criterion": "Raciocínio de segurança",
        "points": 20,
        "description": "Inclui sanitização, autorização e cuidado com dados sensíveis."
      },
      {
        "criterion": "Próximo passo acionável",
        "points": 20,
        "description": "Define hipótese e encaminhamento baseado em evidência."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O primeiro passo é não aceitar o sintoma como diagnóstico. Um usuário remoto adiciona variáveis: conexão física/local, internet, VPN, rota interna, DNS privado, porta HTTPS, TLS, proxy, aplicação e IAM.",
    "steps": [
      "Confirmar se o usuário tem conectividade local e internet.",
      "Confirmar se a VPN está conectada e recebeu rotas/DNS internos.",
      "Testar resolução do nome interno.",
      "Testar alcance do IP ou serviço pela porta 443, se autorizado.",
      "Observar erro TLS/HTTP ou mensagem de autenticação.",
      "Verificar logs de VPN, firewall, proxy, aplicação ou IAM conforme a primeira falha.",
      "Sanitizar evidências antes de compartilhar."
    ],
    "commonWrongAnswers": [
      {
        "answer": "É firewall, libera tudo.",
        "whyItIsWrong": "Não há evidência de que a falha está em camada 4/política. Liberar any-any cria risco grave."
      },
      {
        "answer": "Se a VPN conectou, a aplicação obrigatoriamente deveria abrir.",
        "whyItIsWrong": "VPN conectada não prova rota, DNS, porta, TLS, autorização ou aplicação saudável."
      },
      {
        "answer": "Se ping falha, o servidor está fora.",
        "whyItIsWrong": "ICMP pode ser bloqueado, enquanto TCP/443 pode funcionar."
      }
    ],
    "finalAnswer": "Uma resposta madura cria uma matriz por camada. Se a VPN está conectada, mas DNS interno não resolve, investigue DNS/split DNS. Se DNS resolve e TCP/443 não conecta, investigue rota, firewall, security policy ou disponibilidade do serviço. Se TCP/443 conecta e HTTP retorna 401/403, investigue autenticação/autorização/IAM."
  },
  "glossary": [
    {
      "term": "Modelo OSI",
      "shortDefinition": "Modelo conceitual de sete camadas para descrever comunicação em rede.",
      "longDefinition": "Referência que organiza responsabilidades desde sinal físico até aplicação, útil para ensino, documentação, troubleshooting e segurança.",
      "example": "Usar camada 3 para discutir roteamento e camada 4 para discutir portas TCP/UDP.",
      "relatedTerms": [
        "camada",
        "TCP/IP",
        "PDU",
        "encapsulamento"
      ],
      "relatedLessons": [
        "0.8",
        "1.9",
        "2.2"
      ]
    },
    {
      "term": "Camada",
      "shortDefinition": "Bloco conceitual com uma responsabilidade específica na comunicação.",
      "longDefinition": "Cada camada oferece serviços à camada acima e depende da camada abaixo, ainda que implementações reais possam misturar funções.",
      "example": "A camada de transporte oferece comunicação por portas para aplicações.",
      "relatedTerms": [
        "serviço de camada",
        "encapsulamento"
      ],
      "relatedLessons": [
        "2.1",
        "2.2"
      ]
    },
    {
      "term": "TCP/IP",
      "shortDefinition": "Pilha prática de protocolos usada na internet.",
      "longDefinition": "Modelo de comunicação da internet, geralmente descrito em camadas como acesso à rede, internet, transporte e aplicação.",
      "example": "IP na camada de internet, TCP na camada de transporte e HTTP na aplicação.",
      "relatedTerms": [
        "IP",
        "TCP",
        "UDP",
        "HTTP"
      ],
      "relatedLessons": [
        "2.1",
        "2.2",
        "6.1"
      ]
    },
    {
      "term": "Troubleshooting por camadas",
      "shortDefinition": "Método de diagnóstico que testa hipóteses respeitando responsabilidades de cada camada.",
      "longDefinition": "Forma de investigar falhas coletando evidências de físico, enlace, rede, transporte e aplicação antes de concluir causa.",
      "example": "Verificar link, IP, gateway, DNS, porta e HTTP em ordem.",
      "relatedTerms": [
        "evidência",
        "hipótese",
        "diagnóstico"
      ],
      "relatedLessons": [
        "0.8",
        "1.9",
        "2.8"
      ]
    },
    {
      "term": "Defesa em profundidade",
      "shortDefinition": "Estratégia de segurança com controles distribuídos em várias camadas.",
      "longDefinition": "Em vez de depender de um único controle, aplica proteções físicas, lógicas, de rede, transporte, aplicação e identidade.",
      "example": "Port security, segmentação, firewall, TLS, WAF e MFA atuando juntos.",
      "relatedTerms": [
        "segmentação",
        "firewall",
        "WAF",
        "IAM"
      ],
      "relatedLessons": [
        "2.1",
        "9.1",
        "13.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Open Systems Interconnection Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual histórica do Modelo OSI."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 0 Aula 0.8",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Pensamento em camadas antes do Modelo OSI formal."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 1 Aula 1.9",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Diagnóstico inicial com comandos básicos que serão organizados por camadas."
    },
    {
      "type": "rfc",
      "title": "RFC 1122 — Requirements for Internet Hosts",
      "organization": "IETF",
      "url": "",
      "note": "Útil para comparar pilha TCP/IP real com modelos conceituais."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos de troubleshooting",
      "reason": "Pipelines, runners e plataformas internas dependem de diagnóstico por camadas quando falham ao acessar registries, APIs e clusters."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "fundamentos de autenticação e autorização",
      "reason": "O OSI ajuda a separar conectividade de falhas de identidade, sessão, token e autorização."
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
      "2.2"
    ]
  }
};
