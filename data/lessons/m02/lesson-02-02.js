export const lesson0202 = {
  "id": "2.2",
  "moduleId": "m02",
  "order": 2,
  "title": "Encapsulamento, desencapsulamento e PDUs",
  "subtitle": "Como dados de aplicação viram segmentos, pacotes, quadros e bits — e por que isso muda completamente o troubleshooting.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 200,
  "tags": [
    "redes",
    "modelo osi",
    "encapsulamento",
    "pdu",
    "wireshark",
    "tcp",
    "ip",
    "ethernet",
    "mtu",
    "vpn",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 explicou por que o Modelo OSI existe e como usar camadas como linguagem de diagnóstico."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "reason": "É necessário entender bits, bytes, protocolos e pensamento em camadas."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m01",
      "reason": "É necessário reconhecer dispositivos, topologias, equipamentos e comandos básicos de diagnóstico."
    }
  ],
  "objectives": [
    "Explicar o que é encapsulamento e desencapsulamento.",
    "Diferenciar dados, segmento, datagrama, pacote, quadro e bits.",
    "Entender por que cada camada adiciona cabeçalhos, trailers ou metadados.",
    "Relacionar PDUs com Wireshark, tcpdump, firewalls, roteadores e switches.",
    "Explicar como VPNs, overlays e cloud podem adicionar encapsulamentos extras.",
    "Identificar riscos de segurança e troubleshooting ligados a MTU, overhead e captura de pacotes."
  ],
  "learningOutcomes": [
    "Dado um fluxo HTTP, o aluno consegue descrever as PDUs envolvidas desde aplicação até camada física.",
    "Dado um print de captura, o aluno entende por que há cabeçalhos Ethernet, IP, TCP/UDP e aplicação.",
    "Dado um problema de VPN com pacotes grandes, o aluno considera overhead, MTU e MSS como hipóteses.",
    "Dado um equipamento de rede, o aluno identifica quais PDUs ele provavelmente inspeciona.",
    "Dado um relatório de evidências, o aluno usa nomes precisos para dados, segmento, pacote e quadro."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Na aula anterior, você viu por que o Modelo OSI existe: ele ajuda a dividir a comunicação em responsabilidades. Agora vem a pergunta prática: quando uma aplicação envia uma mensagem, como essa mensagem realmente atravessa as camadas? Ela não sai do navegador diretamente como “página web” pelo cabo. Ela é transformada, organizada, empacotada, endereçada, enquadrada e finalmente convertida em sinais físicos.</p>\n  <p>Encapsulamento é o processo que permite que uma mensagem de aplicação ganhe informações de transporte, rede e enlace antes de viajar. Desencapsulamento é o processo inverso no destino. Esse mecanismo aparece em Wireshark, tcpdump, firewalls, roteadores, VPNs, proxies, MTU, MSS, fragmentação, logs de rede e troubleshooting.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um sistema interno falha apenas quando acessado pela VPN. O DNS resolve, o TCP conecta às vezes, mas uploads grandes falham. Sem entender encapsulamento, alguém pode culpar “a aplicação”. Com encapsulamento, você começa a suspeitar de MTU, overhead da VPN, fragmentação, MSS ou bloqueio de ICMP necessário para Path MTU Discovery.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Redes modernas não nasceram como uma única camada mágica. O crescimento da comunicação entre computadores exigiu separação de responsabilidades. Um programa precisava falar com outro programa, mas também era necessário identificar portas, hosts, redes, interfaces locais e sinais físicos. Cada camada passou a adicionar informações próprias para cumprir sua parte do trabalho.</p>\n  <p>Essa ideia de “envelopar” dados não é exclusiva do Modelo OSI. Ela aparece na pilha TCP/IP real. Uma mensagem HTTP, por exemplo, pode ser carregada por TCP, encapsulada em IP, transportada dentro de um quadro Ethernet e convertida em bits no meio físico. Em redes modernas, ainda podem existir camadas adicionais: VLAN, PPPoE, GRE, IPsec, VXLAN, WireGuard, TLS, HTTP/2, HTTP/3 e service mesh.</p>\n  <p>A história prática do encapsulamento é a história da interoperabilidade. Um switch não precisa entender o conteúdo da aplicação para encaminhar um quadro. Um roteador não precisa entender o HTML da página para encaminhar um pacote IP. Um firewall de camada 4 pode avaliar porta e estado sem interpretar toda a aplicação. Essa separação torna a rede escalável, mas também cria pontos de falha e investigação em várias camadas.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema é que dados de aplicação, sozinhos, não dizem como devem atravessar a rede. Uma string JSON, uma requisição HTTP ou um arquivo enviado por um cliente não possuem, por si só, todas as informações necessárias para chegar ao destino correto. A rede precisa saber qual processo deve receber os dados, qual host é destino, qual próximo salto deve ser usado, qual endereço local de enlace entrega o quadro e como transformar tudo em sinal físico.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem transporte:</strong> o destino não sabe qual processo ou porta deve receber a conversa.</li>\n    <li><strong>Sem rede:</strong> não há endereço lógico para encaminhamento entre redes.</li>\n    <li><strong>Sem enlace:</strong> não há entrega local no próximo salto.</li>\n    <li><strong>Sem física:</strong> não há transmissão real pelo cabo, fibra ou rádio.</li>\n    <li><strong>Sem desencapsulamento:</strong> o destino não consegue remover as informações de cada camada e entregar apenas os dados úteis à aplicação.</li>\n  </ul>\n  <p>Em troubleshooting, ignorar isso leva a diagnósticos rasos. Um pacote pode sair da aplicação, mas morrer no transporte. Pode passar pelo transporte, mas ser descartado por rota. Pode chegar ao roteador, mas não sair pela interface correta. Pode sair pela interface, mas ser bloqueado por firewall, VLAN, MTU ou erro físico.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>O encapsulamento evoluiu junto com a necessidade de transportar dados por redes cada vez mais heterogêneas. A lógica básica permaneceu: cada camada adiciona contexto para que a camada inferior consiga fazer seu trabalho.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Comunicação local simples</td><td>Máquinas próximas trocavam dados em meios compartilhados.</td><td>Pouca escala e pouca separação de responsabilidades.</td><td>Quadros de enlace e endereçamento local.</td></tr>\n      <tr><td>Redes interconectadas</td><td>Hosts passaram a precisar falar com redes diferentes.</td><td>Endereço local não bastava para atravessar redes.</td><td>Pacotes IP e roteamento.</td></tr>\n      <tr><td>Aplicações múltiplas</td><td>Um host passou a executar vários serviços ao mesmo tempo.</td><td>Era necessário identificar processos e fluxos.</td><td>Portas TCP/UDP e conexões.</td></tr>\n      <tr><td>Segurança e túneis</td><td>VPNs e overlays encapsulam pacotes dentro de outros pacotes.</td><td>Aumentam overhead e podem causar problemas de MTU.</td><td>Controle de MSS, PMTUD, observabilidade e desenho cuidadoso.</td></tr>\n      <tr><td>Cloud e SDN</td><td>Redes virtuais usam overlays, tags, políticas e abstrações.</td><td>O caminho físico fica menos visível ao operador.</td><td>Ferramentas de flow logs, traces e diagnóstico por camadas.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p><strong>Encapsulamento</strong> é o processo no qual dados de uma camada superior recebem informações adicionais, geralmente cabeçalhos e às vezes trailers, para serem tratados pela camada inferior. <strong>Desencapsulamento</strong> é o processo inverso: o destino remove e interpreta essas informações camada por camada até entregar os dados à aplicação.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> PDU, Protocol Data Unit, é a unidade de dados tratada por uma camada específica. Em termos práticos: dados na aplicação, segmento ou datagrama na camada de transporte, pacote na camada de rede, quadro na camada de enlace e bits na camada física.</div>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Camada</th><th>PDU comum</th><th>Informação adicionada</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>Aplicação</td><td>Dados</td><td>Mensagem da aplicação</td><td>HTTP request, consulta DNS, payload JSON</td></tr>\n      <tr><td>Transporte</td><td>Segmento ou datagrama</td><td>Portas, estado, controle de fluxo ou checksum</td><td>TCP 443, UDP 53</td></tr>\n      <tr><td>Rede</td><td>Pacote</td><td>IP de origem, IP de destino, TTL, protocolo</td><td>IPv4 ou IPv6</td></tr>\n      <tr><td>Enlace</td><td>Quadro</td><td>MAC de origem, MAC de destino, EtherType, FCS</td><td>Ethernet</td></tr>\n      <tr><td>Física</td><td>Bits/sinais</td><td>Codificação física no meio</td><td>Cobre, fibra ou rádio</td></tr>\n    </tbody>\n  </table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Imagine um navegador acessando <code>https://intranet.exemplo.local</code>. Antes de qualquer conteúdo aparecer, várias decisões acontecem. O nome precisa ser resolvido, a conexão precisa ser estabelecida, o TLS precisa ser negociado, a requisição precisa ser enviada e a resposta precisa voltar. Aqui, vamos simplificar para o envio de uma mensagem depois que o destino já foi determinado.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação cria dados:</strong> a aplicação monta uma mensagem, por exemplo uma requisição HTTP.</li>\n    <li><strong>Transporte adiciona portas:</strong> TCP ou UDP adiciona informações como porta de origem, porta de destino, sequência, checksum e estado, quando aplicável.</li>\n    <li><strong>Rede adiciona endereços IP:</strong> o IP indica origem, destino e informações para roteamento.</li>\n    <li><strong>Enlace adiciona endereços locais:</strong> Ethernet adiciona MAC de origem e MAC do próximo salto, que pode ser o destino local ou o gateway.</li>\n    <li><strong>Física transmite sinais:</strong> o quadro vira sinais elétricos, luz ou rádio.</li>\n    <li><strong>Equipamentos intermediários processam parte do envelope:</strong> switches olham enlace, roteadores olham IP, firewalls podem olhar transporte e aplicação, dependendo do tipo.</li>\n    <li><strong>Destino desencapsula:</strong> a placa recebe bits, valida quadro, entrega pacote IP, entrega segmento à porta correta e a aplicação interpreta os dados.</li>\n  </ol>\n  <p>Um ponto essencial: cada camada normalmente não precisa entender todo o conteúdo das camadas superiores. Um roteador encaminha pelo cabeçalho IP. Ele não precisa entender a página HTML. Um switch encaminha pelo MAC. Ele não precisa entender IP, salvo recursos avançados. Essa separação explica por que ferramentas diferentes enxergam partes diferentes da comunicação.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura real, encapsulamento aparece em cada salto. O host encapsula para enviar ao gateway. O switch encaminha quadros dentro da LAN. O roteador remove o quadro recebido, olha o pacote IP e cria um novo quadro para o próximo enlace. A aplicação final só recebe os dados depois que as camadas inferiores validam e removem seus próprios cabeçalhos.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> monta dados, transporte, IP, enlace e sinal.</li>\n    <li><strong>Switch:</strong> opera principalmente com quadros e endereços MAC.</li>\n    <li><strong>Roteador:</strong> usa o pacote IP para decidir próximo salto, mas troca o quadro a cada enlace.</li>\n    <li><strong>Firewall:</strong> pode avaliar IP, porta, estado, aplicação e política.</li>\n    <li><strong>VPN:</strong> pode encapsular um pacote inteiro dentro de outro pacote.</li>\n    <li><strong>Cloud:</strong> pode adicionar overlays, tags, políticas e virtualização de rede.</li>\n  </ul>\n  <p>Esse detalhe será muito importante quando estudarmos Ethernet, ARP, IPv4, TCP, UDP, DNS, HTTP, TLS, VPN, firewalls e cloud networking.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma carta enviada por uma empresa. O texto da carta é o dado da aplicação. A carta entra em um envelope com destinatário específico. Depois pode ir para um malote interno, depois para uma caixa de transporte, depois para um caminhão. Cada embalagem tem uma função e pode ser lida por pessoas diferentes no caminho.</p>\n  <p>O destinatário faz o caminho inverso: recebe a caixa, abre o malote, abre o envelope e finalmente lê a carta. Ele não interpreta a etiqueta do caminhão como parte do texto da carta. Da mesma forma, a aplicação não deve receber cabeçalhos Ethernet ou IP como se fossem conteúdo da mensagem.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, o processo é extremamente rápido, automatizado e pode envolver validações, checksums, fragmentação, retransmissão, criptografia, túneis e políticas. Além disso, alguns equipamentos inspecionam mais de uma “embalagem” ao mesmo tempo.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>No seu notebook, você acessa um site. A aplicação cria uma requisição. O TCP usa uma porta de origem temporária e a porta de destino 443. O IP usa o endereço do seu notebook e o IP do servidor. O Ethernet usa o MAC da sua placa e o MAC do gateway local, porque o servidor provavelmente está fora da sua rede. O Wi-Fi ou cabo transforma tudo em sinais.</p>\n  <p>Se o site não abre, cada camada gera uma hipótese diferente: Wi-Fi desconectado, sem IP, gateway incorreto, DNS falhando, porta 443 bloqueada, certificado inválido ou aplicação fora. Encapsulamento permite entender onde procurar.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um usuário acessa um sistema financeiro interno. O tráfego pode sair da estação, passar por switch de acesso, switch de distribuição, firewall interno, balanceador, proxy, servidor de aplicação e banco de dados. Em cada trecho, diferentes cabeçalhos e políticas podem ser relevantes.</p>\n  <p>Um firewall pode liberar IP e porta, mas o WAF pode bloquear a requisição de aplicação. Um switch pode encaminhar corretamente, mas uma VLAN errada pode colocar o host no segmento incorreto. Um roteador pode ter rota, mas uma VPN pode adicionar overhead e causar problema de MTU. A análise precisa reconhecer qual “envelope” está sendo inspecionado por cada componente.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, o encapsulamento fica ainda mais importante porque muita coisa é virtualizada. Uma instância tem uma interface virtual, está em uma subnet, usa route tables, security groups ou NSGs, talvez passe por NAT Gateway, Load Balancer, firewall gerenciado ou private endpoint.</p>\n  <p>Além disso, provedores podem usar overlays internos para entregar redes virtuais sobre infraestrutura física compartilhada. O operador nem sempre vê o caminho físico, mas continua precisando entender pacote, porta, fluxo, política e logs. Flow logs, packet capture de VNet/VPC, load balancer logs e firewall logs são formas de observar partes desse encapsulamento.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, encapsulamento aparece em pipelines que acessam registries, APIs, clusters Kubernetes e provedores cloud. Um runner pode falhar ao baixar uma imagem não porque a credencial está errada, mas porque DNS, proxy, TLS, rota, firewall ou MTU estão falhando.</p>\n  <p>No Kubernetes, um pacote pode atravessar Pod, interface virtual, bridge, CNI, overlay, node, service, kube-proxy, ingress controller e load balancer. Cada etapa adiciona ou interpreta informações. NetworkPolicy, service mesh, mTLS e proxies laterais também podem modificar a forma como o tráfego é transportado e observado.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Segurança depende de entender o que está encapsulado e em qual camada o controle atua. Um firewall de rede pode permitir TCP 443, mas isso não significa que qualquer conteúdo HTTPS seja seguro. Um WAF pode inspecionar camada de aplicação, mas não corrige rota insegura. TLS protege conteúdo, mas não oculta todos os metadados. VPN protege um túnel, mas pode carregar tráfego indesejado se a política for fraca.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Confundir porta liberada com aplicação segura</td><td>Firewall permite 443 sem inspeção adequada</td><td>Tráfego malicioso pode usar canal permitido</td><td>WAF, proxy, inspeção, logs e validação de identidade</td></tr>\n      <tr><td>Overhead de túnel ignorado</td><td>VPN adiciona cabeçalhos e reduz MTU efetiva</td><td>Falhas intermitentes e perda de pacotes grandes</td><td>Ajuste de MTU/MSS, PMTUD, testes e documentação</td></tr>\n      <tr><td>Coleta insegura de pacotes</td><td>PCAP contém tokens, cookies ou dados pessoais</td><td>Vazamento de credenciais e dados sensíveis</td><td>Sanitização, autorização, escopo mínimo e armazenamento seguro</td></tr>\n      <tr><td>Túnel indevido</td><td>Pacotes encapsulados contornam controles esperados</td><td>Perda de visibilidade e movimento lateral</td><td>Política de egress, detecção de túneis, inspeção e segmentação</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama abaixo mostra a ideia central: a mensagem da aplicação desce pela pilha, ganha cabeçalhos e vira uma PDU diferente em cada grupo de camadas; no destino, o processo é invertido.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"m02l02-title m02l02-desc\">\n    <title id=\"m02l02-title\">Encapsulamento e desencapsulamento no Modelo OSI</title>\n    <desc id=\"m02l02-desc\">Cliente encapsula dados em segmento, pacote, quadro e bits; servidor desencapsula na ordem inversa.</desc>\n    <defs>\n      <marker id=\"m02l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"40\" width=\"250\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"165\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Origem: encapsula</text>\n\n    <rect x=\"670\" y=\"40\" width=\"250\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"795\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Destino: desencapsula</text>\n\n    <rect x=\"90\" y=\"105\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"165\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n\n    <rect x=\"90\" y=\"170\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"165\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Segmento TCP/UDP</text>\n\n    <rect x=\"90\" y=\"235\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--router\" />\n    <text x=\"165\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pacote IP</text>\n\n    <rect x=\"90\" y=\"300\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--switch\" />\n    <text x=\"165\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quadro Ethernet</text>\n\n    <rect x=\"90\" y=\"365\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"165\" y=\"394\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bits / Sinais</text>\n\n    <line x1=\"165\" y1=\"151\" x2=\"165\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"216\" x2=\"165\" y2=\"235\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"281\" x2=\"165\" y2=\"300\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"346\" x2=\"165\" y2=\"365\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <rect x=\"355\" y=\"210\" width=\"250\" height=\"100\" rx=\"18\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"480\" y=\"245\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n    <text x=\"480\" y=\"276\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Switches, roteadores, firewalls</text>\n\n    <line x1=\"240\" y1=\"388\" x2=\"355\" y2=\"280\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"605\" y1=\"280\" x2=\"720\" y2=\"388\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <rect x=\"720\" y=\"365\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"795\" y=\"394\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bits / Sinais</text>\n\n    <rect x=\"720\" y=\"300\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--switch\" />\n    <text x=\"795\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quadro Ethernet</text>\n\n    <rect x=\"720\" y=\"235\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--router\" />\n    <text x=\"795\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pacote IP</text>\n\n    <rect x=\"720\" y=\"170\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"795\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Segmento TCP/UDP</text>\n\n    <rect x=\"720\" y=\"105\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"795\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n\n    <line x1=\"795\" y1=\"365\" x2=\"795\" y2=\"346\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"300\" x2=\"795\" y2=\"281\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"235\" x2=\"795\" y2=\"216\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"170\" x2=\"795\" y2=\"151\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <text x=\"480\" y=\"360\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">PDU muda conforme a camada: dados → segmento → pacote → quadro → bits</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam conversão entre sintoma, camada, PDU e evidência. A meta é parar de dizer apenas “pacote” para tudo e começar a usar a palavra certa no contexto certo.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário de falha em VPN com upload grande. Sua tarefa será explicar como o encapsulamento ajuda a investigar a causa, quais evidências coletar e quais hipóteses descartar.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostrará como raciocinar por PDUs, overhead e pontos de inspeção, evitando conclusões apressadas.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> encapsulamento adiciona informações de camada para transportar dados; desencapsulamento remove essas informações no destino.</li>\n    <li><strong>O que lembrar:</strong> dados, segmento/datagrama, pacote, quadro e bits são nomes de PDUs em contextos diferentes.</li>\n    <li><strong>Erro comum:</strong> chamar tudo de pacote e perder a precisão do diagnóstico.</li>\n    <li><strong>Uso real:</strong> Wireshark, firewalls, roteadores, VPNs, cloud, Kubernetes e troubleshooting dependem dessa lógica.</li>\n    <li><strong>Segurança:</strong> cada camada expõe metadados, controles e riscos diferentes.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará a Camada 1 — Física: bits no fio, luz e rádio. Agora que você entende que dados viram bits e sinais no fim da pilha, vamos analisar com mais precisão o papel da camada física no Modelo OSI.</p>\n</section>"
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
      "TLS",
      "IPsec",
      "VXLAN"
    ],
    "dependsOn": [
      "Modelo OSI",
      "protocolo",
      "bits e bytes",
      "topologia",
      "equipamentos de rede",
      "diagnóstico inicial"
    ],
    "enables": [
      "Wireshark",
      "tcpdump",
      "análise de firewall",
      "MTU",
      "MSS",
      "fragmentação",
      "VPN",
      "cloud networking",
      "Kubernetes networking"
    ]
  },
  "deepDive": {
    "mentalModel": "Cada camada recebe uma unidade de dados da camada superior, adiciona seu próprio contexto e entrega para a camada inferior. No destino, cada camada remove o contexto que entende e entrega o restante para cima.",
    "keyTerms": [
      "encapsulamento",
      "desencapsulamento",
      "PDU",
      "cabeçalho",
      "trailer",
      "overhead",
      "MTU",
      "MSS",
      "fragmentação",
      "túnel"
    ],
    "limitations": [
      "O nome da PDU varia conforme literatura e contexto; segmento costuma ser usado para TCP e datagrama para UDP.",
      "Nem todo produto respeita fronteiras rígidas de camada; firewalls modernos, proxies e service meshes são multicamada.",
      "Capturas em hosts podem mostrar offloading da placa de rede e confundir checksums ou tamanhos aparentes.",
      "Em cloud, parte do encapsulamento físico e overlay é invisível ao cliente."
    ],
    "whenToUse": [
      "Ao analisar capturas de tráfego.",
      "Ao explicar o caminho de uma requisição.",
      "Ao investigar problemas de VPN, MTU, fragmentação e desempenho.",
      "Ao documentar quais controles inspecionam quais camadas.",
      "Ao ensinar TCP/IP, Ethernet, IP, TLS, VPN e firewalls."
    ],
    "whenNotToUse": [
      "Como substituto de documentação específica de protocolo.",
      "Para assumir que todo tráfego visível no host é idêntico ao tráfego no fio.",
      "Para ignorar logs de aplicação e identidade quando o problema está acima da rede."
    ],
    "operationalImpact": [
      "Aumenta precisão de diagnóstico e comunicação entre times.",
      "Ajuda a explicar por que um equipamento vê apenas parte do fluxo.",
      "Exige cuidado com MTU, túneis, overlays e captura de evidências.",
      "Melhora documentação de caminhos críticos."
    ],
    "financialImpact": [
      "Evita compra desnecessária de banda quando o problema é overhead, MTU ou política.",
      "Captura e armazenamento de pacotes podem ter custo operacional e de segurança.",
      "Em cloud, appliances, NAT, firewall, load balancer e tráfego entre zonas podem gerar custos adicionais.",
      "Túneis e overlays mal planejados podem aumentar consumo de CPU, latência e suporte."
    ],
    "securityImpact": [
      "Ajuda a definir controles por camada.",
      "Mostra que metadados podem continuar visíveis mesmo com conteúdo criptografado.",
      "Explica riscos de túneis que contornam inspeção.",
      "Exige sanitização de PCAPs e logs antes de compartilhamento."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Chamar toda PDU de pacote.",
      "whyItHappens": "No uso informal, pacote virou palavra genérica.",
      "consequence": "O diagnóstico perde precisão ao misturar quadro Ethernet, pacote IP e segmento TCP.",
      "correction": "Use 'pacote' para camada de rede quando for importante ser preciso; use PDU como termo genérico."
    },
    {
      "mistake": "Achar que o MAC de destino é sempre o servidor final.",
      "whyItHappens": "O aluno mistura endereço IP fim a fim com endereço MAC do próximo salto.",
      "consequence": "Erro ao interpretar ARP, gateway e capturas Ethernet.",
      "correction": "Em tráfego para fora da LAN, o MAC de destino normalmente é o do gateway local."
    },
    {
      "mistake": "Ignorar overhead de VPN.",
      "whyItHappens": "A VPN é vista apenas como 'conexão segura'.",
      "consequence": "Falhas intermitentes, fragmentação e uploads quebrados.",
      "correction": "Calcule overhead, valide MTU/MSS e teste com evidências."
    },
    {
      "mistake": "Confundir criptografia com desaparecimento de metadados.",
      "whyItHappens": "TLS protege conteúdo, mas não elimina todo cabeçalho de rede.",
      "consequence": "Falsa sensação de privacidade ou segurança total.",
      "correction": "Separe conteúdo criptografado de metadados de IP, porta, tamanho, tempo e destino."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Upload grande falha pela VPN",
      "Site abre parcialmente",
      "Ping funciona mas HTTPS falha",
      "Captura mostra retransmissões TCP",
      "Aplicação funciona localmente mas falha em cloud",
      "Firewall libera porta mas aplicação não responde"
    ],
    "diagnosticQuestions": [
      "Qual PDU está sendo observada: quadro, pacote, segmento ou dado de aplicação?",
      "Existe túnel, VPN, proxy ou overlay adicionando overhead?",
      "O caminho altera MTU efetiva?",
      "O problema ocorre com pacotes pequenos e grandes?",
      "O firewall inspeciona camada 3, 4 ou 7?",
      "Há retransmissões, fragmentação ou ICMP bloqueado?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ping 8.8.8.8\ntracert 8.8.8.8\nTest-NetConnection example.com -Port 443\nnetsh interface ipv4 show subinterfaces",
        "purpose": "Observar alcance, caminho, porta e MTU configurada nas interfaces.",
        "expectedObservation": "Respostas ICMP quando permitidas, rota até o destino, porta 443 conectável e MTU por interface.",
        "interpretation": "Se porta conecta mas uploads falham, considere camadas superiores, MTU, proxy, TLS ou aplicação."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip route\ntracepath example.com\ncurl -v https://example.com",
        "purpose": "Ver MTU local, rota, estimativa de PMTU e detalhes de conexão HTTP/TLS.",
        "expectedObservation": "Interfaces com MTU, rota default, caminho e negociação HTTP/TLS básica.",
        "interpretation": "tracepath pode sugerir limite de MTU; curl mostra onde a conexão falha."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces\nshow ip interface brief\nshow ip route\nshow access-lists",
        "purpose": "Ver estado de interfaces, erros, rotas e políticas que podem descartar tráfego.",
        "expectedObservation": "Interfaces up/up, poucos erros, rotas esperadas e ACLs coerentes.",
        "interpretation": "Erros físicos, rota ausente ou ACL incorreta mudam a hipótese por camada."
      }
    ],
    "decisionTree": [
      {
        "if": "Pacotes pequenos funcionam e grandes falham",
        "then": "Investigar MTU, MSS, fragmentação, VPN, túnel e bloqueio de ICMP."
      },
      {
        "if": "Ping funciona mas porta TCP falha",
        "then": "Investigar camada 4, firewall, rota assimétrica ou serviço parado."
      },
      {
        "if": "Porta TCP conecta mas aplicação retorna erro",
        "then": "Investigar TLS, HTTP, proxy, autenticação, autorização e logs de aplicação."
      },
      {
        "if": "Captura mostra ARP sem resposta",
        "then": "Investigar enlace local, VLAN, gateway, interface ou segurança de switch."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Nomear evidências pela camada e PDU corretas.",
      "Sanitizar PCAPs antes de compartilhar.",
      "Documentar túneis, overlays e pontos de inspeção.",
      "Aplicar controles em múltiplas camadas.",
      "Validar MTU/MSS em VPNs e links críticos."
    ],
    "badPractices": [
      "Liberar porta 443 e assumir que todo conteúdo é seguro.",
      "Compartilhar capturas com cookies, tokens e dados pessoais.",
      "Criar túneis sem monitoramento e sem política de egress.",
      "Ignorar logs de firewall, proxy e aplicação.",
      "Bloquear ICMP indiscriminadamente e quebrar diagnósticos úteis."
    ],
    "commonErrors": [
      "Confundir encapsulamento com criptografia.",
      "Achar que VPN resolve autorização.",
      "Misturar MAC de próximo salto com IP de destino final.",
      "Ignorar overhead de overlays em cloud e Kubernetes."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de dados em captura",
        "description": "Capturas podem conter tokens, cookies, nomes internos, IPs, payloads e dados pessoais.",
        "defensiveExplanation": "PCAP é evidência sensível e deve ser tratado como material restrito.",
        "mitigation": "Coletar mínimo necessário, sanitizar, criptografar armazenamento e controlar acesso."
      },
      {
        "name": "Túnel sem governança",
        "description": "Encapsular tráfego em VPN ou overlay pode reduzir visibilidade de controles intermediários.",
        "defensiveExplanation": "O túnel pode carregar tráfego permitido e indevido dentro do mesmo envelope.",
        "mitigation": "Políticas de egress, inspeção adequada, logs, segmentação e revisão de arquitetura."
      },
      {
        "name": "Falsa segurança por porta",
        "description": "Permitir apenas portas conhecidas não garante que o conteúdo seja benigno.",
        "defensiveExplanation": "Camada 4 não entende todo o significado da camada 7.",
        "mitigation": "Combinar firewall, proxy, WAF, identidade, observabilidade e validação de aplicação."
      }
    ],
    "monitoring": [
      "Flow logs",
      "Firewall logs",
      "Proxy/WAF logs",
      "NetFlow/IPFIX",
      "Capturas controladas",
      "Métricas de MTU, retransmissão e perda",
      "Logs de VPN"
    ],
    "hardening": [
      "Reduzir superfícies expostas",
      "Documentar túneis",
      "Controlar egress",
      "Aplicar menor privilégio de rede",
      "Criptografar tráfego sensível",
      "Manter visibilidade de metadados relevantes"
    ],
    "detectionIdeas": [
      "Aumento de tráfego encapsulado inesperado",
      "Retransmissões TCP anormais",
      "Falhas de conexão apenas com payloads grandes",
      "Destinos externos incomuns",
      "Túneis não autorizados",
      "Queda de PMTU percebida"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que dados de aplicação não podem simplesmente ser enviados pelo cabo sem encapsulamento?",
      "hints": [
        "Pense em porta, IP, MAC e sinal físico.",
        "Pense em quem precisa tomar decisão no caminho."
      ],
      "expectedIdeas": [
        "endereçamento",
        "processo de destino",
        "roteamento",
        "entrega local",
        "meio físico"
      ],
      "explanation": "A aplicação não possui todo o contexto necessário para transporte, roteamento, enlace e transmissão física."
    },
    {
      "type": "diagnóstico",
      "question": "Um ping pequeno funciona, mas upload grande pela VPN falha. Que hipótese ligada a encapsulamento deve aparecer?",
      "hints": [
        "Pense em overhead.",
        "Pense em MTU e MSS."
      ],
      "expectedIdeas": [
        "VPN adiciona cabeçalhos",
        "MTU efetiva menor",
        "fragmentação",
        "PMTUD",
        "MSS clamp"
      ],
      "explanation": "Túneis adicionam encapsulamento extra e podem reduzir o tamanho útil transportável."
    },
    {
      "type": "cenário real",
      "question": "Um firewall libera TCP 443. Isso prova que a aplicação HTTPS é segura e funcional?",
      "hints": [
        "Camada 4 não interpreta tudo.",
        "Pense em TLS, HTTP, identidade e aplicação."
      ],
      "expectedIdeas": [
        "porta não garante conteúdo",
        "precisa logs de camada 7",
        "TLS",
        "WAF",
        "autenticação",
        "autorização"
      ],
      "explanation": "Liberação de porta é apenas uma evidência de transporte/política; não garante segurança ou saúde da aplicação."
    }
  ],
  "quiz": [
    {
      "id": "q2.2.1",
      "type": "conceito",
      "q": "O que é encapsulamento em redes?",
      "opts": [
        "Adicionar informações de camada a dados recebidos da camada superior",
        "Criptografar obrigatoriamente todo tráfego",
        "Trocar IP por MAC permanentemente",
        "Transformar Wi-Fi em cabo"
      ],
      "a": 0,
      "exp": "Encapsulamento adiciona cabeçalhos/trailers ou contexto de uma camada para permitir o tratamento pela camada inferior.",
      "difficulty": "iniciante",
      "topic": "encapsulamento"
    },
    {
      "id": "q2.2.2",
      "type": "comparação",
      "q": "Qual associação está mais correta?",
      "opts": [
        "Quadro = camada de enlace",
        "Pacote = camada física",
        "Bits = camada de aplicação",
        "Segmento = camada de rede"
      ],
      "a": 0,
      "exp": "Quadro é a PDU típica de camada 2/enlace, como Ethernet.",
      "difficulty": "iniciante",
      "topic": "pdu"
    },
    {
      "id": "q2.2.3",
      "type": "diagnóstico",
      "q": "Um acesso via VPN funciona para páginas pequenas, mas falha em uploads grandes. Qual hipótese deve ser considerada?",
      "opts": [
        "Overhead de túnel e MTU efetiva menor",
        "ASCII sempre incompatível",
        "Switch sem tabela ARP",
        "Senha do usuário sempre expirada"
      ],
      "a": 0,
      "exp": "VPN adiciona encapsulamento extra. Isso pode causar problemas de MTU/MSS e fragmentação em tráfego maior.",
      "difficulty": "intermediário",
      "topic": "mtu"
    },
    {
      "id": "q2.2.4",
      "type": "segurança",
      "q": "Por que um arquivo PCAP deve ser tratado como sensível?",
      "opts": [
        "Pode conter tokens, cookies, IPs internos e payloads",
        "Porque sempre contém senhas descriptografadas",
        "Porque não pode ser aberto offline",
        "Porque apaga logs do firewall"
      ],
      "a": 0,
      "exp": "Capturas podem conter dados sensíveis e metadados relevantes. Devem ser coletadas e compartilhadas com controle.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q2.2.5",
      "type": "arquitetura",
      "q": "Em tráfego para um servidor fora da LAN, o endereço MAC de destino do quadro local normalmente é de quem?",
      "opts": [
        "Do gateway local",
        "Do servidor final na internet",
        "Do DNS público",
        "Do usuário autenticado"
      ],
      "a": 0,
      "exp": "O quadro Ethernet entrega ao próximo salto local. Para destinos fora da LAN, esse próximo salto costuma ser o gateway.",
      "difficulty": "intermediário",
      "topic": "ethernet"
    },
    {
      "id": "q2.2.6",
      "type": "comando",
      "q": "Qual comando Linux ajuda a observar a MTU das interfaces?",
      "opts": [
        "ip link",
        "whoami",
        "mkdir",
        "cat /etc/hostname apenas"
      ],
      "a": 0,
      "exp": "ip link mostra interfaces e informações como MTU.",
      "difficulty": "iniciante",
      "topic": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.2.1",
      "front": "O que é PDU?",
      "back": "Protocol Data Unit: unidade de dados tratada por uma camada específica.",
      "tags": [
        "osi",
        "pdu"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.2.2",
      "front": "Qual PDU costuma ser associada à camada 2?",
      "back": "Quadro, como um quadro Ethernet.",
      "tags": [
        "ethernet",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.2.3",
      "front": "Qual PDU costuma ser associada à camada 3?",
      "back": "Pacote, como um pacote IPv4 ou IPv6.",
      "tags": [
        "ip",
        "camada 3"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.2.4",
      "front": "VPN reduz MTU por quê?",
      "back": "Porque adiciona cabeçalhos extras ao encapsular tráfego dentro de outro tráfego.",
      "tags": [
        "vpn",
        "mtu"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.2.5",
      "front": "TLS elimina todos os metadados?",
      "back": "Não. TLS protege conteúdo, mas IPs, portas, tamanhos e tempos ainda podem ser observáveis em muitos cenários.",
      "tags": [
        "tls",
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.2.6",
      "front": "MAC de destino local é sempre o servidor final?",
      "back": "Não. Para tráfego fora da LAN, normalmente é o MAC do gateway local.",
      "tags": [
        "mac",
        "gateway"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.2.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre encapsulamento e desencapsulamento.",
      "expectedAnswer": "Encapsulamento adiciona informações de camada aos dados para permitir transporte; desencapsulamento remove e interpreta essas informações no destino.",
      "explanation": "A resposta deve mencionar direção do processo e responsabilidade de camadas."
    },
    {
      "id": "ex2.2.2",
      "type": "classificação",
      "prompt": "Classifique: Ethernet frame, IPv4 packet, TCP segment e HTTP request.",
      "expectedAnswer": "Ethernet frame = enlace; IPv4 packet = rede; TCP segment = transporte; HTTP request = aplicação.",
      "explanation": "A classificação ajuda a usar vocabulário preciso em captura e troubleshooting."
    },
    {
      "id": "ex2.2.3",
      "type": "diagnóstico",
      "prompt": "Um firewall L4 libera TCP 443, mas a aplicação retorna HTTP 403. O problema está necessariamente na rede?",
      "expectedAnswer": "Não. TCP 443 pode estar liberado, mas HTTP 403 indica resposta de aplicação/autorização/política em camada superior.",
      "explanation": "Porta aberta não garante autorização ou sucesso da aplicação."
    },
    {
      "id": "ex2.2.4",
      "type": "segurança",
      "prompt": "Liste três informações sensíveis que podem aparecer em uma captura de tráfego.",
      "expectedAnswer": "Tokens, cookies, IPs internos, nomes de hosts, payloads, URLs, headers, dados pessoais ou metadados de conexão.",
      "explanation": "Capturas devem ser tratadas como evidência sensível."
    }
  ],
  "challenge": {
    "title": "Diagnosticar falha de upload grande via VPN",
    "scenario": "Usuários remotos acessam um portal interno pela VPN. Login funciona, páginas pequenas carregam, mas upload de arquivos acima de alguns megabytes falha ou fica intermitente.",
    "tasks": [
      "Criar hipóteses por camada.",
      "Explicar onde entra encapsulamento extra.",
      "Listar evidências a coletar.",
      "Indicar riscos de segurança na coleta.",
      "Propor próximos passos sem alterar produção às cegas."
    ],
    "constraints": [
      "Não capturar dados sensíveis sem autorização.",
      "Não mudar MTU global sem janela e rollback.",
      "Separar evidência de suposição.",
      "Considerar aplicação, VPN, firewall e rede."
    ],
    "expectedDeliverables": [
      "Matriz de camadas",
      "Lista de comandos",
      "Plano de coleta",
      "Hipóteses priorizadas",
      "Recomendação de mitigação"
    ],
    "gradingRubric": [
      {
        "criterion": "Precisão conceitual",
        "points": 25,
        "description": "Usa corretamente PDU, MTU, overhead, pacote, quadro e segmento."
      },
      {
        "criterion": "Diagnóstico por evidência",
        "points": 25,
        "description": "Propõe testes e logs adequados antes de concluir."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "Trata capturas e logs como evidências sensíveis."
      },
      {
        "criterion": "Aplicabilidade operacional",
        "points": 20,
        "description": "Propõe ações realistas, reversíveis e documentadas."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Explica para redes, segurança, aplicação e gestão."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Como páginas pequenas funcionam, conectividade básica, DNS, autenticação inicial e parte da aplicação provavelmente estão operacionais. A falha em uploads grandes aponta para tamanho de payload, timeout, inspeção, limite de aplicação ou problema de MTU/MSS causado por encapsulamento da VPN.",
    "steps": [
      "Confirmar se falha ocorre só pela VPN.",
      "Comparar arquivos pequenos e grandes.",
      "Verificar logs da aplicação para limite de upload ou timeout.",
      "Verificar logs de VPN e firewall.",
      "Consultar MTU de interfaces e tipo de túnel.",
      "Testar PMTU/tracepath quando permitido.",
      "Avaliar ajuste de MSS clamp ou MTU em janela controlada.",
      "Documentar evidências e sanitizar dados."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Aumentar a banda da internet",
        "whyItIsWrong": "O sintoma não aponta inicialmente para falta de banda, mas para falha específica com tamanho/encapsulamento."
      },
      {
        "answer": "Culpar a aplicação sem logs",
        "whyItIsWrong": "A aplicação pode estar envolvida, mas a hipótese de MTU/VPN precisa ser verificada."
      },
      {
        "answer": "Desativar a VPN",
        "whyItIsWrong": "Remove segurança e não resolve a causa de forma aceitável."
      }
    ],
    "finalAnswer": "A hipótese principal é interação entre upload grande, overhead da VPN, MTU/MSS e possível bloqueio de fragmentação ou PMTUD. A solução deve coletar evidências em VPN, firewall, host e aplicação, proteger dados sensíveis e aplicar ajuste controlado se confirmado."
  },
  "glossary": [
    {
      "term": "Encapsulamento",
      "shortDefinition": "Processo de adicionar informações de camada a dados recebidos da camada superior.",
      "longDefinition": "É o mecanismo que permite que dados de aplicação sejam transportados por camadas inferiores, recebendo cabeçalhos, trailers ou metadados conforme necessário.",
      "example": "HTTP é carregado por TCP, que é carregado por IP, que é carregado por Ethernet.",
      "relatedTerms": [
        "PDU",
        "cabeçalho",
        "túnel"
      ],
      "relatedLessons": [
        "2.1",
        "2.2",
        "6.1",
        "10.1"
      ]
    },
    {
      "term": "Desencapsulamento",
      "shortDefinition": "Processo de remover e interpretar informações de camada no destino.",
      "longDefinition": "O receptor valida e remove informações adicionadas por cada camada até entregar os dados corretos à aplicação.",
      "example": "A placa recebe quadro Ethernet, entrega pacote IP, que entrega segmento TCP, que entrega dados HTTP.",
      "relatedTerms": [
        "encapsulamento",
        "PDU"
      ],
      "relatedLessons": [
        "2.2"
      ]
    },
    {
      "term": "PDU",
      "shortDefinition": "Unidade de dados de uma camada de protocolo.",
      "longDefinition": "Protocol Data Unit é o nome genérico para dados tratados por uma camada, como segmento, pacote ou quadro.",
      "example": "Um quadro Ethernet é uma PDU de camada 2.",
      "relatedTerms": [
        "segmento",
        "pacote",
        "quadro"
      ],
      "relatedLessons": [
        "2.2"
      ]
    },
    {
      "term": "MTU",
      "shortDefinition": "Maior unidade que pode ser transmitida em um enlace sem fragmentação naquele contexto.",
      "longDefinition": "Maximum Transmission Unit limita o tamanho de dados transportáveis em uma interface ou caminho. Túneis podem reduzir a MTU efetiva.",
      "example": "Ethernet comum frequentemente usa MTU 1500, mas VPNs podem reduzir o valor útil.",
      "relatedTerms": [
        "MSS",
        "fragmentação",
        "VPN"
      ],
      "relatedLessons": [
        "2.2",
        "10.2",
        "15.4"
      ]
    },
    {
      "term": "Overhead",
      "shortDefinition": "Dados extras necessários para controle, endereçamento, segurança ou transporte.",
      "longDefinition": "Cabeçalhos, trailers e metadados não são o conteúdo útil da aplicação, mas são necessários para a comunicação funcionar.",
      "example": "Cabeçalhos IPsec adicionam overhead a uma VPN.",
      "relatedTerms": [
        "encapsulamento",
        "MTU"
      ],
      "relatedLessons": [
        "0.4",
        "2.2"
      ]
    },
    {
      "term": "Túnel",
      "shortDefinition": "Técnica de encapsular tráfego dentro de outro tráfego.",
      "longDefinition": "VPNs e overlays carregam pacotes internos dentro de pacotes externos para criar conectividade lógica sobre outra rede.",
      "example": "Uma VPN site-to-site pode transportar pacotes privados dentro de pacotes públicos criptografados.",
      "relatedTerms": [
        "VPN",
        "overlay",
        "encapsulamento"
      ],
      "relatedLessons": [
        "10.1",
        "14.6"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base conceitual do Modelo OSI."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre bit, byte, throughput e overhead."
    },
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para quadros Ethernet e camada de enlace."
    },
    {
      "type": "rfc",
      "title": "Internet Protocol",
      "organization": "IETF",
      "url": "",
      "note": "Referência conceitual para pacotes IP."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes Networking",
      "lesson": "CNI, Services e Ingress",
      "reason": "Kubernetes usa encapsulamento, overlays e políticas de rede que dependem deste conceito."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Federação e protocolos de identidade",
      "lesson": "OIDC/SAML sobre HTTP/TLS",
      "reason": "Protocolos de identidade trafegam dentro de camadas de transporte, segurança e aplicação."
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
      "2.3"
    ]
  }
};
