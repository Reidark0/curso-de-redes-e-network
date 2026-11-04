export const lesson0202 = {
  "id": "2.2",
  "moduleId": "m02",
  "order": 2,
  "title": "Encapsulamento, desencapsulamento e PDUs",
  "subtitle": "Como dados de aplicação viram segmentos, pacotes, quadros e bits — e por que isso muda o troubleshooting.",
  "duration": "70-100 min",
  "estimatedStudyTimeMinutes": 100,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Quando o navegador envia uma requisição, ela não sai pelo cabo como “página web”. Cada camada acrescenta o que precisa (portas, endereços IP, endereços MAC) e, no fim, tudo vira sinal elétrico, luz ou rádio. Esse processo é o <strong>encapsulamento</strong>; o inverso, no destino, é o <strong>desencapsulamento</strong>. É ele que explica o que você vê no Wireshark e no tcpdump, o que um switch, roteador ou firewall consegue inspecionar e por que VPNs mexem com MTU, MSS e fragmentação.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um sistema interno falha apenas quando acessado pela VPN. O DNS resolve, o TCP conecta às vezes, mas uploads grandes falham. Sem entender encapsulamento, alguém culpa “a aplicação”. Com encapsulamento, você passa a suspeitar de MTU, overhead da VPN, fragmentação, MSS ou bloqueio do ICMP de que o Path MTU Discovery precisa.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Dados de aplicação (uma string JSON, uma requisição HTTP, um arquivo) não dizem, sozinhos, como atravessar a rede. Cada camada acrescenta a informação que falta:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem transporte:</strong> o destino não sabe qual processo ou porta deve receber a conversa.</li>\n    <li><strong>Sem rede:</strong> não há endereço lógico para encaminhar entre redes.</li>\n    <li><strong>Sem enlace:</strong> não há entrega local ao próximo salto.</li>\n    <li><strong>Sem física:</strong> não há transmissão real pelo cabo, fibra ou rádio.</li>\n    <li><strong>Sem desencapsulamento:</strong> o destino não consegue remover as informações de cada camada e entregar só os dados úteis à aplicação.</li>\n  </ul>\n  <p>Por isso a falha pode estar em qualquer envelope: o segmento não chega à porta certa, o pacote é descartado por falta de rota ou por firewall, o quadro cai na VLAN errada ou é corrompido por erro físico, ou um pacote maior que a MTU do caminho some enquanto os pequenos passam.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p><strong>Encapsulamento</strong> é o processo no qual os dados de uma camada superior recebem informações adicionais para serem tratados pela camada inferior: quase sempre um <strong>cabeçalho</strong>, na frente, e às vezes um <strong>trailer</strong>, no fim. Na Ethernet, o trailer é o FCS (Frame Check Sequence), de 4 bytes, que permite detectar quadros corrompidos. <strong>Desencapsulamento</strong> é o inverso: o destino valida, interpreta e remove essas informações camada por camada até entregar os dados à aplicação.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> PDU (Protocol Data Unit) é a unidade de dados tratada por uma camada específica. O nome varia conforme a literatura; o uso mais comum é <em>segmento</em> para TCP e <em>datagrama</em> para UDP.</div>\n  <div class=\"responsive-table\"><table class=\"data-table comparison-table\">\n    <thead><tr><th>Camada</th><th>PDU comum</th><th>Informação adicionada</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>Aplicação</td><td>Dados</td><td>Mensagem da aplicação</td><td>HTTP request, consulta DNS, payload JSON</td></tr>\n      <tr><td>Transporte</td><td>Segmento ou datagrama</td><td>Portas, estado, controle de fluxo ou checksum</td><td>TCP 443, UDP 53</td></tr>\n      <tr><td>Rede</td><td>Pacote</td><td>IP de origem, IP de destino, TTL, protocolo</td><td>IPv4 ou IPv6</td></tr>\n      <tr><td>Enlace</td><td>Quadro</td><td>MAC de origem, MAC de destino, EtherType, FCS</td><td>Ethernet</td></tr>\n      <tr><td>Física</td><td>Bits/sinais</td><td>Codificação física no meio</td><td>Cobre, fibra ou rádio</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Chamar toda PDU de pacote.</strong> O diagnóstico passa a misturar quadro, pacote e segmento. Use “pacote” para a camada de rede e “PDU” como termo genérico.</li>\n      <li><strong>Achar que o MAC de destino é o do servidor final.</strong> O IP é fim a fim; o MAC é do próximo salto. Fora da LAN, é normalmente o MAC do gateway local.</li>\n      <li><strong>Confundir encapsulamento com criptografia.</strong> Encapsular acrescenta contexto; cifrar esconde conteúdo.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Acompanhe um navegador enviando uma requisição a <code>https://intranet.exemplo.local</code>, com o nome já resolvido e a conexão já estabelecida:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação cria dados:</strong> por exemplo, uma requisição HTTP.</li>\n    <li><strong>Transporte adiciona portas:</strong> porta de origem, porta de destino e checksum; o TCP também acrescenta sequência e estado.</li>\n    <li><strong>Rede adiciona endereços IP:</strong> origem, destino e informações para roteamento, como TTL.</li>\n    <li><strong>Enlace adiciona endereços locais:</strong> MAC de origem e MAC do próximo salto, que pode ser o destino local ou o gateway.</li>\n    <li><strong>Física transmite sinais:</strong> o quadro vira sinais elétricos, luz ou rádio.</li>\n    <li><strong>Destino desencapsula:</strong> a placa recebe os bits, valida o quadro, entrega o pacote IP, que entrega o segmento à porta correta, e a aplicação interpreta os dados.</li>\n  </ol>\n  <p>No caminho, cada equipamento lê só o envelope de que precisa: o roteador encaminha pelo cabeçalho IP sem entender o HTML; o switch encaminha pelo MAC sem entender o IP (salvo recursos avançados). Por isso ferramentas diferentes enxergam partes diferentes da mesma comunicação.</p>\n\n  <h3>Quanto cada envelope ocupa: MTU e MSS</h3>\n  <p>A <strong>MTU</strong> (Maximum Transmission Unit) é o maior pacote que uma interface transmite sem fragmentar: 1500 bytes na Ethernet comum, contados a partir do cabeçalho IP. O <strong>MSS</strong> (Maximum Segment Size) é o maior volume de dados que o TCP põe num segmento; cada lado anuncia o seu no SYN.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Parte</th><th>Bytes</th></tr></thead>\n    <tbody>\n      <tr><td>Cabeçalho Ethernet + FCS</td><td>14 + 4 (fora da MTU)</td></tr>\n      <tr><td>Cabeçalho IPv4 sem opções</td><td>20 (IPv6: 40)</td></tr>\n      <tr><td>Cabeçalho TCP sem opções</td><td>20 (UDP: 8)</td></tr>\n      <tr><td>MSS com MTU 1500, IPv4 e TCP</td><td>1500 − 20 − 20 = 1460</td></tr>\n    </tbody>\n  </table></div>\n  <p><strong>Túneis somam envelopes.</strong> Uma VPN ou overlay põe o pacote inteiro dentro de outro. GRE acrescenta 24 bytes (IPv4 externo de 20 + GRE de 4): sobre um link de 1500, o pacote interno só pode ter 1476. VXLAN acrescenta 50 bytes (Ethernet, IP e UDP externos + VXLAN), por isso overlays costumam usar MTU 1450. IPsec e WireGuard têm overhead que varia com o modo e os algoritmos.</p>\n  <p><strong>Quando o pacote não cabe:</strong> sem o bit DF (Don't Fragment), o roteador IPv4 fragmenta o pacote, com custo de desempenho. Com o DF ligado, o roteador descarta o pacote e devolve um ICMP “Fragmentation Needed” (tipo 3, código 4) com a MTU suportada, e a origem reduz o tamanho. Isso é o <strong>Path MTU Discovery (PMTUD)</strong>. Se um firewall bloqueia esse ICMP, a origem nunca descobre o limite: login e páginas pequenas passam, uploads grandes travam. As correções usuais são ajustar a MTU do túnel ou fazer <strong>MSS clamping</strong>: o roteador ou concentrador VPN reescreve o MSS do SYN para um valor que caiba (ex.: 1436 num túnel GRE de 1476).</p>\n\n  <h3>O que você vê numa captura</h3>\n  <p>O Wireshark mostra o desencapsulamento de fora para dentro: <code>Frame</code> (metadados da captura), <code>Ethernet II</code> (MACs; EtherType 0x0800 = IPv4), <code>Internet Protocol Version 4</code> (IPs, TTL; protocolo 6 = TCP), <code>Transmission Control Protocol</code> (portas, sequência, flags) e, por fim, <code>TLS</code> ou <code>HTTP</code>. Ao capturar no próprio host, o <em>offloading</em> da placa calcula checksums e divide segmentos depois da captura: checksums “incorretos” e segmentos maiores que a MTU não são, necessariamente, o que trafegou no fio.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>O encapsulamento se refaz a cada salto. O host monta todos os envelopes e entrega o quadro ao gateway. O roteador desencapsula o quadro recebido, lê o pacote IP, decide o próximo salto, decrementa o TTL e monta um <strong>novo quadro</strong> para o enlace seguinte. Resultado: os MACs mudam a cada salto, e os IPs de origem e destino seguem iguais de ponta a ponta (salvo NAT).</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Componente</th><th>O que examina</th><th>O que decide ou faz</th></tr></thead>\n    <tbody>\n      <tr><td>Switch</td><td>Quadro (MAC)</td><td>Porta de saída dentro da LAN</td></tr>\n      <tr><td>Roteador</td><td>Pacote (IP)</td><td>Próximo salto; troca o quadro a cada enlace</td></tr>\n      <tr><td>Firewall</td><td>IP, porta e estado; alguns também a aplicação</td><td>Permitir ou bloquear o fluxo</td></tr>\n      <tr><td>Tags, VPN e overlay</td><td>O pacote ou quadro inteiro</td><td>Acrescenta uma tag (VLAN 802.1Q) ou encapsula tudo em outro pacote (PPPoE, GRE, IPsec, VXLAN, WireGuard)</td></tr>\n      <tr><td>Cloud</td><td>Interfaces virtuais, overlays e políticas</td><td>Encaminha sobre infraestrutura física que o cliente não vê</td></tr>\n    </tbody>\n  </table></div>\n  <p>Firewalls modernos, proxies e service meshes atuam em várias camadas ao mesmo tempo; a tabela mostra o mínimo que cada um precisa ler.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense em uma carta enviada por uma empresa. O texto é o dado da aplicação. A carta entra num envelope com o destinatário, depois num malote, depois numa caixa, depois num caminhão; cada embalagem é lida por pessoas diferentes no caminho. O destinatário faz o inverso e não lê a etiqueta do caminhão como parte da carta, assim como a aplicação não recebe cabeçalhos Ethernet ou IP como conteúdo.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> na rede, cada roteador descarta a “caixa” (o quadro) e monta outra para o próximo trecho, e alguns equipamentos abrem várias embalagens ao mesmo tempo.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Do seu notebook (192.168.1.20) você abre um site que resolve para 203.0.113.10. A aplicação cria a requisição. O TCP usa uma porta de origem temporária (ex.: 51514) e a porta de destino 443. O IP usa 192.168.1.20 como origem e 203.0.113.10 como destino. O quadro (Ethernet no cabo, 802.11 no Wi-Fi) usa o MAC da sua placa como origem e o MAC do gateway 192.168.1.1 como destino, porque o servidor está fora da sua rede. O meio transforma tudo em sinais.</p>\n  <p>Se o site não abre, cada camada gera uma hipótese diferente: Wi-Fi desconectado, sem IP, gateway incorreto, DNS falhando, porta 443 bloqueada, certificado inválido ou aplicação fora. O encapsulamento mostra onde procurar.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Um usuário acessa um sistema financeiro interno passando por switch de acesso, switch de distribuição, firewall interno, balanceador, proxy, servidor de aplicação e banco de dados. Em cada trecho, um envelope diferente é examinado: o firewall pode liberar IP e porta e o WAF bloquear a requisição de aplicação; o switch pode encaminhar certo e uma VLAN errada pôr o host no segmento incorreto; o roteador pode ter rota e a VPN causar problema de MTU. Diagnosticar é reconhecer qual envelope cada componente inspeciona.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, a instância tem uma interface virtual numa subnet, com route tables e security groups ou NSGs, e pode passar por NAT Gateway, load balancer, firewall gerenciado ou private endpoint. Por baixo, o provedor usa overlays sobre infraestrutura física compartilhada, invisíveis para você. O que você observa são partes desse encapsulamento: flow logs, packet capture da VPC/VNet e logs de load balancer e firewall.</p>\n  <p>No Kubernetes, um pacote pode atravessar Pod, interface virtual, bridge, CNI, overlay, node, Service, kube-proxy e ingress. Se o CNI usa overlay (ex.: VXLAN), a MTU dos pods precisa descontar esse overhead; senão, os sintomas da VPN aparecem dentro do cluster. Service mesh com mTLS acrescenta mais um envelope.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>Segurança depende de saber em qual envelope cada controle atua. Liberar TCP 443 num firewall de camada 4 não diz nada sobre o conteúdo HTTPS que passa por ali. Um WAF inspeciona a aplicação, mas não corrige uma rota insegura. O TLS cifra os dados da aplicação, mas os cabeçalhos IP e TCP ficam fora dele: IPs, portas, tamanhos e horários continuam visíveis para quem observa o caminho. Uma VPN protege o túnel, mas carrega dentro dele qualquer tráfego que a política permitir, inclusive tráfego que contorna controles intermediários.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <p>O diagrama abaixo mostra a ideia central: a mensagem da aplicação desce pela pilha, ganha cabeçalhos e vira uma PDU diferente em cada grupo de camadas; no destino, o processo é invertido.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"m02l02-title m02l02-desc\">\n    <title id=\"m02l02-title\">Encapsulamento e desencapsulamento no Modelo OSI</title>\n    <desc id=\"m02l02-desc\">Cliente encapsula dados em segmento, pacote, quadro e bits; servidor desencapsula na ordem inversa.</desc>\n    <defs>\n      <marker id=\"m02l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"40\" width=\"250\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"165\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Origem: encapsula</text>\n\n    <rect x=\"670\" y=\"40\" width=\"250\" height=\"420\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"795\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Destino: desencapsula</text>\n\n    <rect x=\"90\" y=\"105\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"165\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n\n    <rect x=\"90\" y=\"170\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"165\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Segmento TCP/UDP</text>\n\n    <rect x=\"90\" y=\"235\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--router\" />\n    <text x=\"165\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pacote IP</text>\n\n    <rect x=\"90\" y=\"300\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--switch\" />\n    <text x=\"165\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quadro Ethernet</text>\n\n    <rect x=\"90\" y=\"365\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"165\" y=\"394\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bits / Sinais</text>\n\n    <line x1=\"165\" y1=\"151\" x2=\"165\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"216\" x2=\"165\" y2=\"235\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"281\" x2=\"165\" y2=\"300\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"165\" y1=\"346\" x2=\"165\" y2=\"365\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <rect x=\"355\" y=\"210\" width=\"250\" height=\"100\" rx=\"18\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"480\" y=\"245\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n    <text x=\"480\" y=\"276\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Switches, roteadores, firewalls</text>\n\n    <line x1=\"240\" y1=\"388\" x2=\"355\" y2=\"280\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"605\" y1=\"280\" x2=\"720\" y2=\"388\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <rect x=\"720\" y=\"365\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"795\" y=\"394\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bits / Sinais</text>\n\n    <rect x=\"720\" y=\"300\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--switch\" />\n    <text x=\"795\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Quadro Ethernet</text>\n\n    <rect x=\"720\" y=\"235\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--router\" />\n    <text x=\"795\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pacote IP</text>\n\n    <rect x=\"720\" y=\"170\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"795\" y=\"199\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Segmento TCP/UDP</text>\n\n    <rect x=\"720\" y=\"105\" width=\"150\" height=\"46\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"795\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dados</text>\n\n    <line x1=\"795\" y1=\"365\" x2=\"795\" y2=\"346\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"300\" x2=\"795\" y2=\"281\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"235\" x2=\"795\" y2=\"216\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n    <line x1=\"795\" y1=\"170\" x2=\"795\" y2=\"151\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l02-arrow)\" />\n\n    <text x=\"480\" y=\"360\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">PDU muda conforme a camada: dados → segmento → pacote → quadro → bits</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Modelo mental:</strong> cada camada recebe a PDU de cima, acrescenta seu contexto e entrega para baixo; no destino, cada camada remove o que entende e passa o resto para cima.</li>\n    <li><strong>PDUs:</strong> dados, segmento (TCP) ou datagrama (UDP), pacote, quadro e bits. Chamar tudo de “pacote” tira a precisão do diagnóstico.</li>\n    <li><strong>Cada equipamento lê parte do envelope:</strong> o switch lê o quadro; o roteador lê o pacote e refaz o quadro a cada salto.</li>\n    <li><strong>Túneis somam cabeçalhos</strong> e reduzem a MTU efetiva; com o ICMP do PMTUD bloqueado, pacotes grandes somem e os pequenos passam.</li>\n    <li><strong>Segurança:</strong> o TLS esconde o conteúdo, não os metadados; capturas são evidência sensível.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, Camada 1 — Física: bits no fio, luz e rádio, você verá como os bits do fim da pilha viram sinais no cobre, na fibra e no rádio, e quais limites cada meio impõe.</p>\n</section>\n"
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
        "command": "ping 8.8.8.8\nping -f -l 1472 8.8.8.8\ntracert 8.8.8.8\nTest-NetConnection example.com -Port 443\nnetsh interface ipv4 show subinterfaces",
        "purpose": "Observar alcance, caminho, porta e MTU. O ping com -f (não fragmentar) e -l 1472 gera um pacote IP de 1500 bytes (1472 + 8 de ICMP + 20 de IP).",
        "expectedObservation": "Respostas ICMP quando permitidas, rota até o destino, porta 443 conectável, MTU por interface e resposta ao ping de 1472 se o caminho suporta 1500.",
        "interpretation": "Se o ping de 1472 com -f falha e valores menores passam, a MTU do caminho é menor que 1500: reduza o -l até achar o limite. Se a porta conecta mas uploads falham, considere MTU, proxy, TLS ou aplicação."
      },
      {
        "platform": "Linux",
        "command": "ip link\nip route\ntracepath example.com\nping -M do -s 1472 example.com\ncurl -v https://example.com",
        "purpose": "Ver MTU local, rota, PMTU estimada, teste de tamanho com DF ligado (-M do) e a conexão HTTP/TLS.",
        "expectedObservation": "Interfaces com MTU, rota default, caminho com PMTU estimada, ping de 1472 respondido e negociação HTTP/TLS básica.",
        "interpretation": "Se o ping de 1472 com -M do falha e um menor passa, há limite de MTU no caminho; tracepath indica onde a PMTU cai; curl mostra em que etapa a conexão falha."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces\nshow ip interface brief\nshow ip route\nshow access-lists",
        "purpose": "Ver estado e MTU das interfaces, erros, rotas e ACLs que podem descartar tráfego.",
        "expectedObservation": "Interfaces up/up com a MTU esperada, poucos erros, rotas esperadas e ACLs coerentes.",
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
      "Validar MTU/MSS em VPNs e links críticos."
    ],
    "badPractices": [
      "Liberar porta 443 e assumir que todo conteúdo é seguro.",
      "Compartilhar capturas com cookies, tokens e dados pessoais.",
      "Criar túneis sem monitoramento e sem política de egress.",
      "Bloquear ICMP indiscriminadamente e quebrar o PMTUD e diagnósticos úteis."
    ],
    "commonErrors": [
      "Confundir encapsulamento com criptografia.",
      "Achar que VPN resolve autorização.",
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
      "Documentar túneis e overlays",
      "Controlar egress para impedir túneis não autorizados",
      "Manter visibilidade de metadados relevantes"
    ],
    "detectionIdeas": [
      "Aumento de tráfego encapsulado inesperado",
      "Túneis não autorizados",
      "Retransmissões TCP anormais",
      "Falhas de conexão apenas com payloads grandes",
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
      "question": "O que é encapsulamento em redes?",
      "options": [
        "Remover cabeçalhos no destino para entregar os dados à aplicação",
        "Adicionar informações de camada aos dados recebidos da camada superior",
        "Criptografar o tráfego para que ninguém leia o conteúdo",
        "Dividir os dados em pedaços menores para caberem na MTU"
      ],
      "answer": 1,
      "explanation": "Encapsular é acrescentar cabeçalhos (e às vezes trailers) para a camada inferior tratar os dados. Remover cabeçalhos no destino é desencapsulamento; cifrar é criptografia; dividir por tamanho é segmentação ou fragmentação.",
      "topic": "encapsulamento",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q2.2.2",
      "question": "Qual associação está mais correta?",
      "options": [
        "Segmento = camada de rede",
        "Pacote = camada de transporte",
        "Quadro = camada de enlace",
        "Datagrama UDP = camada de enlace"
      ],
      "answer": 2,
      "explanation": "Quadro é a PDU da camada 2 (ex.: Ethernet). Pacote é da camada de rede; segmento TCP e datagrama UDP são da camada de transporte.",
      "topic": "pdu",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q2.2.3",
      "question": "Um acesso via VPN funciona para páginas pequenas, mas falha em uploads grandes. Qual hipótese deve ser considerada?",
      "options": [
        "Overhead do túnel e MTU efetiva menor",
        "DNS resolvendo o portal para o IP errado",
        "Credencial da VPN expirada",
        "Porta 443 bloqueada no firewall"
      ],
      "answer": 0,
      "explanation": "Se páginas pequenas carregam, DNS, credencial e porta 443 funcionam. A VPN acrescenta cabeçalhos e reduz a MTU efetiva: pacotes grandes passam a ser fragmentados ou descartados.",
      "topic": "mtu",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q2.2.4",
      "question": "Por que um arquivo PCAP deve ser tratado como sensível?",
      "options": [
        "Porque apaga logs do firewall",
        "Porque sempre contém senhas descriptografadas",
        "Porque não pode ser aberto offline",
        "Pode conter tokens, cookies, IPs internos e payloads"
      ],
      "answer": 3,
      "explanation": "Capturas podem conter dados sensíveis e metadados relevantes. Devem ser coletadas e compartilhadas com controle.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q2.2.5",
      "question": "Em tráfego para um servidor fora da LAN, o endereço MAC de destino do quadro local normalmente é de quem?",
      "options": [
        "Do servidor final na internet",
        "Do gateway local",
        "Do switch de acesso",
        "Do servidor DNS configurado"
      ],
      "answer": 1,
      "explanation": "O quadro é entregue ao próximo salto local, que para destinos fora da LAN é o gateway. O IP de destino continua sendo o do servidor final; o switch encaminha o quadro, mas não é o destinatário.",
      "topic": "ethernet",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q2.2.7",
      "question": "Num túnel, pacotes pequenos passam e pacotes grandes somem sem erro. O firewall do caminho bloqueia todo ICMP. Qual mecanismo provavelmente foi quebrado?",
      "options": [
        "Resolução ARP do gateway",
        "Three-way handshake do TCP",
        "Path MTU Discovery (PMTUD)",
        "Resolução DNS do destino"
      ],
      "answer": 2,
      "explanation": "O PMTUD depende do ICMP “Fragmentation Needed” para avisar a origem de que o pacote com DF não cabe. Sem ele, a origem segue mandando pacotes grandes demais, que são descartados. ARP, handshake e DNS falhariam também para pacotes pequenos.",
      "topic": "mtu",
      "difficulty": "intermediário",
      "type": "diagnóstico"
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
      "id": "fc2.2.7",
      "front": "O que é MSS e quanto vale com MTU 1500?",
      "back": "Maximum Segment Size: o maior volume de dados TCP por segmento. Com MTU 1500 e cabeçalhos IPv4 e TCP sem opções: 1500 − 20 − 20 = 1460 bytes.",
      "tags": [
        "tcp",
        "mtu"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex2.2.1",
      "type": "conceitual",
      "prompt": "Descreva o encapsulamento de uma requisição HTTPS do seu notebook até o meio físico, citando a PDU e uma informação adicionada em cada camada. Depois diga o que o servidor faz ao receber.",
      "expectedAnswer": "Dados (requisição HTTP) → segmento TCP (porta de origem temporária, porta de destino 443) → pacote IP (IP de origem e destino, TTL) → quadro Ethernet (MAC de origem e MAC do gateway, FCS) → bits/sinais. O servidor desencapsula na ordem inversa: valida o quadro, lê o pacote, entrega o segmento à porta 443 e a aplicação interpreta os dados.",
      "explanation": "A resposta deve mostrar a direção do processo, o nome correto de cada PDU e que o destino remove cada cabeçalho antes de entregar os dados."
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
      "id": "ex2.2.5",
      "type": "cálculo",
      "prompt": "Um cluster passa a usar overlay VXLAN, que acrescenta 50 bytes, sobre uma rede física com MTU 1500. Qual MTU os pods devem usar e o que acontece se ficarem com 1500?",
      "expectedAnswer": "1450 (1500 − 50). Com 1500, pacotes internos grandes não cabem no pacote externo: são fragmentados ou descartados. Pings e requisições pequenas funcionam, mas transferências grandes falham ou ficam lentas.",
      "explanation": "É o mesmo raciocínio da VPN: cada envelope extra reduz o espaço útil."
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
      "Confirmar se a falha ocorre só pela VPN.",
      "Comparar arquivos pequenos e grandes.",
      "Verificar logs da aplicação para limite de upload ou timeout.",
      "Verificar logs de VPN e firewall, inclusive ICMP descartado.",
      "Consultar a MTU das interfaces e o tipo de túnel.",
      "Testar a PMTU com tracepath ou ping com DF (ex.: ping -f -l 1472 no Windows, ping -M do -s 1472 no Linux), quando permitido.",
      "Avaliar MSS clamping ou ajuste de MTU em janela controlada, com rollback.",
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
      "longDefinition": "Permite que dados de aplicação sejam transportados pelas camadas inferiores, cada uma acrescentando cabeçalho, trailer ou metadados.",
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
      "longDefinition": "O receptor valida e remove o que cada camada acrescentou até entregar os dados à aplicação.",
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
      "longDefinition": "Protocol Data Unit: nome genérico para segmento, datagrama, pacote ou quadro.",
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
      "longDefinition": "Maximum Transmission Unit limita o tamanho do pacote transportável em uma interface ou caminho. Túneis reduzem a MTU efetiva, e o MSS do TCP é a MTU menos os cabeçalhos IP e TCP.",
      "example": "Ethernet comum usa MTU 1500 (MSS 1460 com IPv4 e TCP); um túnel GRE reduz a MTU efetiva para 1476.",
      "relatedTerms": [
        "MSS",
        "fragmentação",
        "PMTUD",
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
      "longDefinition": "Cabeçalhos, trailers e metadados não são conteúdo útil da aplicação, mas a comunicação depende deles.",
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
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência para o cabeçalho IPv4, TTL e o bit DF."
    },
    {
      "type": "rfc",
      "title": "RFC 1191 — Path MTU Discovery",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc1191",
      "note": "Como a origem descobre a MTU do caminho usando o ICMP Fragmentation Needed."
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
