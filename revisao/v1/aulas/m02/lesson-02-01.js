export const lesson0201 = {
  "id": "2.1",
  "moduleId": "m02",
  "order": 1,
  "title": "Por que o Modelo OSI existe",
  "subtitle": "Como um modelo de camadas transforma redes complexas em diagnóstico, arquitetura, documentação e comunicação entre times.",
  "duration": "65-90 min",
  "estimatedStudyTimeMinutes": 90,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Imagine um chamado: <em>“o sistema não abre”</em>. A frase é vaga demais para agir. O cabo pode estar desconectado, o Wi-Fi fraco, o host sem IP, o gateway errado, o DNS sem resolver, a porta TCP bloqueada, o certificado TLS inválido, a aplicação fora do ar ou a autenticação negada.</p>\n  <p>O Modelo OSI divide esse problema em partes menores, cada uma com responsabilidade própria. Com ele, você diagnostica falhas, documenta, desenha arquitetura e conversa com outros times usando o mesmo mapa.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o SOC vê tentativas de conexão falhando para um serviço interno. Redes diz que há rota. Segurança diz que o firewall não bloqueou. Aplicação diz que o serviço está no ar. Sem um modelo por camadas, cada time fala uma língua e o diagnóstico fica lento.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Antes da padronização, cada fabricante criava protocolos e vocabulário próprios, e equipamentos de marcas diferentes conversavam mal. A ISO criou o OSI como <strong>modelo de referência</strong> para descrever como sistemas abertos se comunicam e dividir responsabilidades. A internet acabou implementada sobre a pilha TCP/IP, mas o vocabulário do OSI ficou: “problema de camada 2”, “bloqueio na camada 4” e “controle de camada 7” são termos usados por redes, segurança, cloud, fabricantes e certificações.</p>\n  <p>Sem esse modelo, qualquer falha vira “problema de rede”. Só que um problema de DNS é diferente de um problema de cabo, uma porta TCP bloqueada é diferente de senha incorreta e um certificado inválido é diferente de firewall bloqueando. Com o mesmo rótulo para tudo, o time:</p>\n  <ul>\n    <li>aciona a equipe errada e perde tempo;</li>\n    <li>reinicia coisas sem necessidade e deixa de coletar evidências;</li>\n    <li>compra link, appliance ou licença quando a causa está em outra camada;</li>\n    <li>toma decisões de segurança baseadas em suposições vagas.</li>\n  </ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> o Modelo OSI é um modelo conceitual de referência, com sete camadas, que descreve as responsabilidades da comunicação entre sistemas, do sinal físico até a aplicação. Ele serve para explicar, diagnosticar e documentar redes; não é um protocolo que roda nos equipamentos.</div>\n  <p>Cada camada responde a uma pergunta diferente:</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Camada</th><th>Nome</th><th>Pergunta principal</th><th>Exemplos mentais</th></tr></thead>\n    <tbody>\n      <tr><td>7</td><td>Aplicação</td><td>Que serviço o usuário ou sistema está usando?</td><td>HTTP, DNS, API, SMTP, autenticação na aplicação</td></tr>\n      <tr><td>6</td><td>Apresentação</td><td>Como os dados são representados, codificados ou protegidos?</td><td>UTF-8, JSON, TLS conceitualmente, compressão</td></tr>\n      <tr><td>5</td><td>Sessão</td><td>Como a conversa é estabelecida, mantida ou retomada?</td><td>Sessões, estado, tokens, negociação</td></tr>\n      <tr><td>4</td><td>Transporte</td><td>Qual porta, conexão ou fluxo transporta os dados?</td><td>TCP, UDP, portas, handshake, retransmissão</td></tr>\n      <tr><td>3</td><td>Rede</td><td>Como o pacote chega a outra rede?</td><td>IP, roteamento, gateway, TTL</td></tr>\n      <tr><td>2</td><td>Enlace</td><td>Como há entrega local no mesmo enlace?</td><td>Ethernet, MAC, switch, VLAN, ARP</td></tr>\n      <tr><td>1</td><td>Física</td><td>Como bits viram sinais no meio?</td><td>Cobre, fibra, rádio, conectores, potência, ruído</td></tr>\n    </tbody>\n  </table>\n  <h3>OSI × TCP/IP</h3>\n  <p>A internet usa a pilha TCP/IP, que tem menos camadas e agrupa responsabilidades que o OSI separa:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>TCP/IP</th><th>Camadas OSI equivalentes</th><th>Exemplos</th></tr></thead>\n    <tbody>\n      <tr><td>Aplicação</td><td>7, 6 e 5</td><td>HTTP, DNS, TLS, SMTP</td></tr>\n      <tr><td>Transporte</td><td>4</td><td>TCP, UDP</td></tr>\n      <tr><td>Internet</td><td>3</td><td>IPv4, IPv6, ICMP</td></tr>\n      <tr><td>Acesso à rede</td><td>2 e 1</td><td>Ethernet, Wi-Fi, ARP, cabo, fibra</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout warning\"><strong>Limites do modelo:</strong> o OSI não é a implementação exata da internet. Nem todo protocolo cabe em uma camada só (o TLS aparece na camada 6 “conceitualmente”, mas roda sobre TCP e é acionado pela aplicação), e firewalls, load balancers, proxies e WAFs operam em várias camadas. Use o OSI como mapa de perguntas, não como substituto da documentação do protocolo (RFCs, documentação oficial) nem como motivo para encerrar a investigação só porque uma camada parece suspeita.</div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Ao enviar dados, cada camada adiciona ou interpreta as informações de que precisa para cumprir sua responsabilidade e oferece um serviço à camada de cima:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação:</strong> o navegador, cliente de API ou serviço cria uma mensagem com significado para a aplicação.</li>\n    <li><strong>Apresentação:</strong> os dados são codificados, serializados e, se for o caso, comprimidos ou protegidos.</li>\n    <li><strong>Sessão:</strong> a comunicação mantém contexto, estado, autenticação ou continuidade lógica, quando aplicável.</li>\n    <li><strong>Transporte:</strong> TCP ou UDP organiza fluxos e portas, com confiabilidade (TCP) ou entrega sem conexão (UDP).</li>\n    <li><strong>Rede:</strong> o IP permite sair da rede local e atravessar roteadores até outra rede.</li>\n    <li><strong>Enlace:</strong> Ethernet, Wi-Fi ou outro enlace entrega quadros localmente, com endereços e regras do domínio local.</li>\n    <li><strong>Física:</strong> os bits viram sinais elétricos, luz ou rádio.</li>\n  </ol>\n  <p>No destino, a leitura é inversa: sinal vira bits, bits viram quadro, o quadro contém o pacote, o pacote contém o segmento e o segmento contém os dados da aplicação. A aula 2.2 aprofunda isso com encapsulamento, desencapsulamento e PDUs.</p>\n  <p>No diagnóstico, transforme cada camada em uma pergunta com evidência e vá do básico para o específico, sem pular etapas: a primeira evidência que falha aponta a camada provável.</p>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Decorar as camadas sem aplicar:</strong> associe cada uma a uma pergunta, uma evidência e um ponto de falha.</li>\n      <li><strong>Chamar qualquer falha de “problema de rede”:</strong> o time errado é acionado e o diagnóstico atrasa.</li>\n      <li><strong>Tratar ping como prova de saúde:</strong> ele só mostra alcance ICMP; não valida porta, TLS, HTTP, autenticação nem autorização. E o ICMP pode estar bloqueado enquanto TCP/443 funciona.</li>\n      <li><strong>Forçar todo produto em uma camada:</strong> proxies, WAFs, load balancers e service mesh são multicamada.</li>\n    </ul>\n  </div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura real, o OSI ajuda a localizar componentes, evidências e pontos de falha:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Camada 1:</strong> cabos, fibra, rádio, energia, portas físicas, SFPs e interferência.</li>\n    <li><strong>Camada 2:</strong> switches, VLANs, tabela MAC, ARP e domínio de broadcast.</li>\n    <li><strong>Camada 3:</strong> roteadores, gateways, tabelas de rota e subnets.</li>\n    <li><strong>Camada 4:</strong> portas TCP/UDP, firewalls stateful, load balancers L4 e health checks.</li>\n    <li><strong>Camadas 5 a 7:</strong> TLS, HTTP, DNS, autenticação, proxy, WAF, APIs e regras de aplicação.</li>\n  </ul>\n  <p>Em cloud, os mesmos papéis aparecem como VPC/VNet, subnet, route table, security group, NSG, load balancer, private endpoint, NAT gateway, firewall gerenciado, DNS privado e WAF. O caminho físico fica abstraído, mas o OSI continua separando overlay, rota, política e aplicação. Em DevSecOps, aparecem em Terraform, Kubernetes Services, Ingress, NetworkPolicy, service mesh e testes automatizados de conectividade.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense no envio de uma encomenda. A camada física é a estrada, o veículo e a energia que movem a entrega. A camada de enlace é a entrega dentro do bairro ou prédio. A camada de rede escolhe cidades e rotas. A camada de transporte decide se a entrega exige confirmação. As camadas superiores cuidam do idioma do documento, da conversa e do serviço final.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes reais não são perfeitamente lineares; protocolos e equipamentos podem misturar camadas.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Você abre um site no notebook. O cabo ou Wi-Fi precisa funcionar. O notebook precisa falar com o gateway local. O IP precisa alcançar o servidor. A porta TCP 443 precisa abrir. O TLS precisa negociar. O HTTP precisa enviar a requisição. O servidor precisa responder. Se a página não abre, o OSI permite perguntar: em qual etapa a evidência quebra?</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Um usuário não acessa o ERP. O suporte verifica interface e IP (camadas 1 a 3). Redes verifica VLAN, switch, rota e firewall (2 a 4). Segurança verifica bloqueios, logs e política. Aplicação verifica o status do serviço e a autenticação (7). O OSI não resolve o problema sozinho, mas divide as responsabilidades e evita que todos investiguem a mesma coisa sem ordem.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud e DevSecOps</h2>\n  <p>Uma VM não acessa um banco privado. Na camada 3, pode ser subnet ou route table. Na camada 4, um security group ou NSG bloqueando a porta. Na camada 7, endpoint errado, string de conexão incorreta ou autenticação negada. Alcançar a porta não significa ter permissão para usar o banco: conectividade não é autorização.</p>\n  <p>O mesmo vale para um pipeline que falha ao publicar uma imagem no registry interno. O runner resolve o nome? Tem rota? A porta 443 abre? O TLS é confiável? A API do registry responde? O token tem permissão? Separar essas perguntas evita tratar erro de autorização como falha de rede, ou bloqueio de porta como falha de credencial.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>Segurança usa o OSI para aplicar defesa em profundidade: um controle em cada camada, para que a falha de um não exponha tudo.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Camada</th><th>Risco</th><th>Como aparece</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>1</td><td>Acesso físico indevido</td><td>Porta de rede exposta em área pública</td><td>NAC, bloqueio de portas, racks protegidos</td></tr>\n      <tr><td>2</td><td>Abuso local</td><td>ARP suspeito (ARP spoofing), VLAN indevida, MAC desconhecido</td><td>Port security, segmentação, monitoramento</td></tr>\n      <tr><td>3</td><td>Rota indevida</td><td>Subnets sensíveis alcançáveis sem necessidade</td><td>Rotas mínimas, ACLs, revisão de arquitetura</td></tr>\n      <tr><td>4</td><td>Porta exposta</td><td>Serviço escutando em porta não aprovada</td><td>Firewall, hardening, inventário de portas</td></tr>\n      <tr><td>7</td><td>Falha de aplicação</td><td>Bypass de autenticação, abuso de API, payload malicioso</td><td>WAF, validação de entrada, autenticação forte, políticas de API, logs</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m02l01-title m02l01-desc\">\n    <title id=\"m02l01-title\">Modelo OSI como pilha de diagnóstico</title>\n    <desc id=\"m02l01-desc\">Diagrama mostrando as sete camadas do Modelo OSI e como elas conectam sintomas, evidências e controles de segurança.</desc>\n    <defs>\n      <marker id=\"m02l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"70\" y=\"40\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"220\" y=\"73\" text-anchor=\"middle\" class=\"svg-label\">7 Aplicação — HTTP, DNS, API</text>\n    <rect x=\"70\" y=\"100\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"220\" y=\"133\" text-anchor=\"middle\" class=\"svg-label\">6 Apresentação — formato, TLS, encoding</text>\n    <rect x=\"70\" y=\"160\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"220\" y=\"193\" text-anchor=\"middle\" class=\"svg-label\">5 Sessão — estado e continuidade</text>\n    <rect x=\"70\" y=\"220\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"220\" y=\"253\" text-anchor=\"middle\" class=\"svg-label\">4 Transporte — TCP, UDP, portas</text>\n    <rect x=\"70\" y=\"280\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"220\" y=\"313\" text-anchor=\"middle\" class=\"svg-label\">3 Rede — IP, rota, gateway</text>\n    <rect x=\"70\" y=\"340\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"220\" y=\"373\" text-anchor=\"middle\" class=\"svg-label\">2 Enlace — MAC, switch, VLAN, ARP</text>\n    <rect x=\"70\" y=\"400\" width=\"300\" height=\"52\" rx=\"10\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"220\" y=\"433\" text-anchor=\"middle\" class=\"svg-label\">1 Física — cabo, fibra, rádio, sinal</text>\n\n    <rect x=\"555\" y=\"75\" width=\"300\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"705\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Sintoma</text>\n    <text x=\"705\" y=\"135\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">“o sistema não abre”</text>\n    <text x=\"705\" y=\"160\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">não é diagnóstico</text>\n\n    <rect x=\"555\" y=\"225\" width=\"300\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"705\" y=\"258\" text-anchor=\"middle\" class=\"svg-label\">Evidências por camada</text>\n    <text x=\"705\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link, IP, rota, porta, TLS, HTTP</text>\n    <text x=\"705\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs, métricas e capturas</text>\n\n    <rect x=\"555\" y=\"375\" width=\"300\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"705\" y=\"410\" text-anchor=\"middle\" class=\"svg-label\">Hipótese responsável</text>\n    <text x=\"705\" y=\"438\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">não pule etapas</text>\n\n    <line x1=\"370\" y1=\"250\" x2=\"555\" y2=\"130\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <line x1=\"705\" y1=\"185\" x2=\"705\" y2=\"225\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <line x1=\"705\" y1=\"335\" x2=\"705\" y2=\"375\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l01-arrow)\"></line>\n    <text x=\"490\" y=\"495\" text-anchor=\"middle\" class=\"svg-label\">O OSI não é decoração: é um mapa para transformar sintoma em evidência e evidência em hipótese.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Modelo mental:</strong> use o OSI como mapa de perguntas. Cada camada responde uma pergunta diferente; quando uma evidência falha, a hipótese fica mais precisa.</li>\n    <li><strong>Sete camadas:</strong> Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação, cada uma com uma responsabilidade.</li>\n    <li><strong>Sintoma não é diagnóstico:</strong> evidência por camada reduz suposições e direciona o time certo.</li>\n    <li><strong>Conectividade não é autorização:</strong> ping ou porta aberta não provam que a aplicação funciona nem que o acesso é permitido.</li>\n    <li><strong>Limitação:</strong> o OSI é conceitual; a internet usa TCP/IP (4 camadas) e muitos produtos operam em várias camadas.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 2.2, você vai ver encapsulamento, desencapsulamento e PDUs: como os dados descem e sobem pela pilha, ganhando cabeçalhos, endereços e controles em cada camada.</p>\n</section>\n"
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
      "Validar TLS e certificados."
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
      "question": "Qual é a principal utilidade prática do Modelo OSI?",
      "options": [
        "Substituir TCP/IP na internet moderna",
        "Organizar responsabilidades de comunicação em camadas",
        "Criptografar conexões HTTP automaticamente",
        "Aumentar a velocidade física do cabo"
      ],
      "answer": 1,
      "explanation": "O OSI é um modelo de referência que organiza responsabilidades e ajuda no ensino, documentação e troubleshooting.",
      "topic": "modelo osi",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.1.7",
      "question": "No modelo TCP/IP de quatro camadas, onde ficam as responsabilidades que o OSI separa nas camadas 5 (Sessão), 6 (Apresentação) e 7 (Aplicação)?",
      "options": [
        "Na camada de Transporte",
        "Divididas entre Internet e Transporte",
        "Todas na camada de Aplicação",
        "Na camada de Acesso à rede"
      ],
      "answer": 2,
      "explanation": "O TCP/IP agrupa sessão, apresentação e aplicação em uma única camada de Aplicação (HTTP, DNS, TLS). Transporte equivale à camada 4, Internet à 3 e Acesso à rede às camadas 2 e 1.",
      "topic": "osi x tcp/ip",
      "difficulty": "iniciante-intermediário",
      "type": "comparação"
    },
    {
      "id": "q2.1.3",
      "question": "Por que ping bem-sucedido não prova que uma aplicação web está funcionando?",
      "options": [
        "Porque ICMP/alcance não valida porta TCP, TLS, HTTP, autenticação ou aplicação",
        "Porque ping testa apenas DNS",
        "Porque ping sempre usa camada 7",
        "Porque ping só funciona em redes sem roteador"
      ],
      "answer": 0,
      "explanation": "Ping pode indicar algum alcance ICMP, mas não valida os mecanismos de transporte e aplicação necessários para um serviço web.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "comparação"
    },
    {
      "id": "q2.1.4",
      "question": "Qual é um exemplo de defesa em profundidade usando a lógica do OSI?",
      "options": [
        "Usar apenas NAT como segurança",
        "Desativar logs para reduzir ruído",
        "Liberar any-any para simplificar diagnóstico",
        "Proteger físico, segmentar rede, restringir portas e autenticar aplicação"
      ],
      "answer": 3,
      "explanation": "Defesa em profundidade distribui controles por camadas, reduzindo dependência de um único mecanismo.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q2.1.5",
      "question": "Em cloud, uma VM alcança a porta do banco, mas recebe erro de permissão. Qual distinção o OSI ajuda a fazer?",
      "options": [
        "Todo erro de banco é camada 1",
        "Conectividade não é o mesmo que autorização",
        "Security group substitui IAM",
        "DNS sempre é a causa"
      ],
      "answer": 1,
      "explanation": "A porta aberta indica conectividade de transporte, mas permissão depende de identidade, política e aplicação.",
      "topic": "cloud",
      "difficulty": "intermediário",
      "type": "cloud"
    },
    {
      "id": "q2.1.6",
      "question": "Qual afirmação sobre OSI está correta?",
      "options": [
        "Todo produto moderno atua em uma única camada",
        "O OSI elimina a necessidade de logs",
        "O OSI é um modelo conceitual; componentes reais podem operar em várias camadas",
        "O OSI torna desnecessário entender TCP/IP"
      ],
      "answer": 2,
      "explanation": "O OSI é uma referência. Firewalls, proxies, WAFs e load balancers podem atuar em múltiplas camadas.",
      "topic": "limitações",
      "difficulty": "intermediário",
      "type": "arquitetura"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.1.1",
      "front": "O que é o Modelo OSI?",
      "back": "Um modelo conceitual de referência com sete camadas (Física, Enlace, Rede, Transporte, Sessão, Apresentação e Aplicação) usado para organizar as responsabilidades da comunicação em rede.",
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
