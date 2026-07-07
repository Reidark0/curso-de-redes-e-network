export const lesson0502 = {
  "id": "5.2",
  "moduleId": "m05",
  "order": 2,
  "title": "CIDR, máscara e quantidade de hosts",
  "subtitle": "Como transformar prefixos CIDR em máscara decimal, bits de rede, bits de host, endereços totais e hosts utilizáveis.",
  "duration": "95-135 min",
  "estimatedStudyTimeMinutes": 135,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 230,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "cidr",
    "máscara",
    "hosts",
    "binário",
    "endereçamento",
    "segurança",
    "cloud",
    "devsecops",
    "ipam"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "reason": "A aula 5.1 explicou por que subnetting existe e por que CIDR é usado para criar sub-redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.2",
      "reason": "A estrutura de octetos e os 32 bits do IPv4 são necessários para entender prefixos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.3",
      "reason": "Máscara e CIDR foram introduzidos como separação entre rede e host."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "Endereço de rede, hosts e broadcast dependem da quantidade de bits de host."
    }
  ],
  "objectives": [
    "Explicar o que significa um prefixo CIDR como /24, /26, /30, /31 e /32.",
    "Converter prefixos comuns em máscaras decimais pontuadas.",
    "Calcular bits de rede e bits de host a partir de um prefixo.",
    "Calcular quantidade total de endereços usando 2 elevado aos bits de host.",
    "Calcular hosts utilizáveis tradicionais usando 2 elevado aos bits de host menos 2.",
    "Entender exceções e contextos especiais como /31, /32 e reservas adicionais em provedores cloud.",
    "Relacionar tamanho de sub-rede com segurança, custo, crescimento, firewall, DHCP, IPAM e troubleshooting."
  ],
  "learningOutcomes": [
    "Dado um prefixo CIDR, o aluno identifica quantos bits são de rede e quantos são de host.",
    "Dado um prefixo comum, o aluno reconhece a máscara decimal correspondente.",
    "Dado um CIDR, o aluno calcula endereços totais e hosts úteis tradicionais.",
    "Dado um cenário corporativo, o aluno escolhe um prefixo adequado ao número de hosts e crescimento esperado.",
    "Dado um erro de dimensionamento, o aluno explica impactos em DHCP, firewall, cloud, VPN e operação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Na aula anterior, você viu por que subnetting existe. Agora começa a parte que normalmente assusta: CIDR, máscara e quantidade de hosts. O erro comum é tentar decorar uma tabela enorme. O objetivo desta aula é o oposto: fazer você entender o mecanismo para que a tabela deixe de parecer mágica.</p>\n<p>Quando alguém diz <code>192.168.10.0/24</code>, <code>10.20.30.0/27</code> ou <code>172.16.5.8/30</code>, essa pessoa está comunicando duas coisas ao mesmo tempo: o endereço base e quantos bits pertencem à parte de rede. A partir disso, conseguimos descobrir o tamanho do bloco, quantos endereços existem, quantos hosts podem ser usados e qual é a escala adequada para aquele segmento.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> sem dominar CIDR e quantidade de hosts, você não consegue planejar DHCP, VLANs, subnets cloud, VPNs, firewalls, links ponto a ponto, IPAM ou troubleshooting de endereçamento com segurança.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>No começo das redes IPv4, muita coisa era ensinada pelo modelo classful: Classe A, Classe B e Classe C. Um endereço começado por determinados valores indicava uma máscara padrão. Isso parecia simples, mas desperdiçava endereços e dificultava roteamento eficiente. Organizações recebiam blocos grandes demais ou precisavam de múltiplos blocos desconexos.</p>\n<p>O CIDR, Classless Inter-Domain Routing, trouxe uma forma mais flexível de escrever redes. Em vez de depender de classes fixas, passamos a indicar explicitamente a quantidade de bits da rede: <code>/8</code>, <code>/16</code>, <code>/24</code>, <code>/27</code>, <code>/30</code> e assim por diante. Isso permitiu agregação de rotas, alocação mais eficiente e planejamento granular.</p>\n<p>Hoje, CIDR é linguagem universal de redes. Ele aparece em roteadores, firewalls, Linux, Windows, Kubernetes, Terraform, AWS VPC, Azure VNet, Google VPC, VPNs, proxies, SIEM, listas de permissão e documentação IPAM. Por isso, entender CIDR não é detalhe acadêmico; é alfabetização operacional em redes modernas.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema que esta aula resolve é a tradução entre notações. Humanos gostam de ver <code>/24</code> e <code>255.255.255.0</code>; computadores operam com bits. Se você não consegue traduzir entre prefixo, máscara e bits de host, todo cálculo de subnetting vira chute.</p>\n<table class=\"data-table\"><thead><tr><th>Notação</th><th>O que comunica</th><th>Risco se for mal entendida</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td>24 bits de rede e 8 bits de host</td><td>Assumir que sempre comporta qualquer quantidade de hosts</td></tr>\n<tr><td><code>255.255.255.0</code></td><td>Máscara decimal equivalente a /24</td><td>Ver como quatro números soltos, sem entender bits</td></tr>\n<tr><td><code>/26</code></td><td>26 bits de rede e 6 bits de host</td><td>Esquecer que cada bloco tem 64 endereços totais</td></tr>\n<tr><td><code>/30</code></td><td>30 bits de rede e 2 bits de host</td><td>Usar para LAN com vários hosts e ficar sem endereços</td></tr>\n<tr><td><code>/32</code></td><td>Um único endereço específico</td><td>Confundir host route com uma sub-rede para hosts</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema real:</strong> um CIDR errado pode criar DHCP insuficiente, rotas incorretas, sobreposição com VPN, exposição excessiva em firewall, subnets cloud pequenas demais ou falha intermitente difícil de diagnosticar.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>O aprendizado de subnetting normalmente evolui em quatro fases. Primeiro, o aluno reconhece que IPv4 tem 32 bits. Depois, entende que o CIDR informa quantos desses bits são de rede. Em seguida, calcula quantos bits sobram para hosts. Por fim, usa isso para decidir o tamanho correto de uma sub-rede.</p>\n<ol class=\"flow-list\"><li><strong>IPv4 como 32 bits:</strong> todo endereço possui quatro octetos de 8 bits.</li><li><strong>CIDR como corte:</strong> o prefixo define quantos bits pertencem à rede.</li><li><strong>Bits de host:</strong> <code>32 - prefixo</code> informa quantos bits sobram para endereços dentro do bloco.</li><li><strong>Total de endereços:</strong> <code>2^bits_de_host</code> calcula o tamanho do bloco.</li><li><strong>Hosts úteis tradicionais:</strong> <code>2^bits_de_host - 2</code> desconta rede e broadcast em redes IPv4 tradicionais.</li><li><strong>Aplicação arquitetural:</strong> o prefixo passa a ser escolhido por função, crescimento, segurança, DHCP, rotas e cloud.</li></ol>\n<p>A evolução mais importante é sair da memorização e chegar à decisão consciente: escolher prefixo é escolher capacidade, controle, custo e risco.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>CIDR</strong> é a notação que indica quantos bits do IPv4 pertencem à parte de rede. Um endereço como <code>192.168.10.0/26</code> informa que os primeiros 26 bits identificam a rede e os 6 bits restantes identificam posições dentro daquela sub-rede.</p>\n<div class=\"definition-box\"><strong>Fórmula base:</strong> <code>bits de host = 32 - prefixo</code>. Depois, <code>endereços totais = 2^bits_de_host</code>. Em IPv4 tradicional com rede e broadcast, <code>hosts utilizáveis = 2^bits_de_host - 2</code>.</div>\n<table class=\"comparison-table\"><thead><tr><th>Prefixo</th><th>Máscara</th><th>Bits de host</th><th>Endereços totais</th><th>Hosts úteis tradicionais</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td><code>255.255.255.0</code></td><td>8</td><td>256</td><td>254</td></tr>\n<tr><td><code>/25</code></td><td><code>255.255.255.128</code></td><td>7</td><td>128</td><td>126</td></tr>\n<tr><td><code>/26</code></td><td><code>255.255.255.192</code></td><td>6</td><td>64</td><td>62</td></tr>\n<tr><td><code>/27</code></td><td><code>255.255.255.224</code></td><td>5</td><td>32</td><td>30</td></tr>\n<tr><td><code>/28</code></td><td><code>255.255.255.240</code></td><td>4</td><td>16</td><td>14</td></tr>\n<tr><td><code>/29</code></td><td><code>255.255.255.248</code></td><td>3</td><td>8</td><td>6</td></tr>\n<tr><td><code>/30</code></td><td><code>255.255.255.252</code></td><td>2</td><td>4</td><td>2</td></tr>\n<tr><td><code>/31</code></td><td><code>255.255.255.254</code></td><td>1</td><td>2</td><td>especial em ponto a ponto</td></tr>\n<tr><td><code>/32</code></td><td><code>255.255.255.255</code></td><td>0</td><td>1</td><td>um host/rota específica</td></tr>\n</tbody></table>\n<p>A tabela é útil, mas a fórmula é mais importante. Quem domina a fórmula entende qualquer prefixo.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Uma máscara IPv4 é uma sequência de bits 1 seguida por bits 0. Os bits 1 indicam a parte de rede; os bits 0 indicam a parte de host. Por isso uma máscara válida tradicional tem os 1 agrupados à esquerda e os 0 agrupados à direita.</p>\n<p>Exemplo com <code>/26</code>: são 26 bits 1 e 6 bits 0. Em binário, a máscara fica <code>11111111.11111111.11111111.11000000</code>. Convertendo para decimal, temos <code>255.255.255.192</code>. Como existem 6 bits de host, o bloco possui <code>2^6 = 64</code> endereços totais.</p>\n<table class=\"data-table\"><thead><tr><th>Octeto binário</th><th>Valor decimal</th><th>Significado</th></tr></thead><tbody>\n<tr><td><code>11111111</code></td><td>255</td><td>Octeto totalmente de rede</td></tr>\n<tr><td><code>10000000</code></td><td>128</td><td>1 bit de rede dentro do octeto</td></tr>\n<tr><td><code>11000000</code></td><td>192</td><td>2 bits de rede dentro do octeto</td></tr>\n<tr><td><code>11100000</code></td><td>224</td><td>3 bits de rede dentro do octeto</td></tr>\n<tr><td><code>11110000</code></td><td>240</td><td>4 bits de rede dentro do octeto</td></tr>\n<tr><td><code>11111000</code></td><td>248</td><td>5 bits de rede dentro do octeto</td></tr>\n<tr><td><code>11111100</code></td><td>252</td><td>6 bits de rede dentro do octeto</td></tr>\n<tr><td><code>11111110</code></td><td>254</td><td>7 bits de rede dentro do octeto</td></tr>\n<tr><td><code>11111111</code></td><td>255</td><td>8 bits de rede dentro do octeto</td></tr>\n</tbody></table>\n<div class=\"callout\"><strong>Raciocínio essencial:</strong> o CIDR não “muda” o IP. Ele muda a forma como o host interpreta quais bits identificam a rede e quais bits identificam posições dentro daquela rede.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Na arquitetura de redes, o prefixo define fronteiras lógicas. Essas fronteiras afetam gateways, rotas, DHCP, firewall, NAT, VPN, cloud, observabilidade e capacidade. Um <code>/24</code> pode ser excelente para uma VLAN de usuários. Um <code>/28</code> pode ser suficiente para uma DMZ pequena. Um <code>/30</code> pode ser usado em link ponto a ponto tradicional. Um <code>/32</code> pode representar uma rota para um host específico.</p>\n<table class=\"comparison-table\"><thead><tr><th>Escolha de prefixo</th><th>Impacto arquitetural</th><th>Exemplo</th></tr></thead><tbody>\n<tr><td>Prefixo curto, como <code>/16</code></td><td>Bloco grande, muita capacidade, risco de política ampla</td><td>VPC/VNet corporativa ou agregação de rotas</td></tr>\n<tr><td>Prefixo médio, como <code>/24</code></td><td>Segmento comum para LAN/VLAN</td><td>Usuários de um andar ou departamento</td></tr>\n<tr><td>Prefixo menor em hosts, como <code>/28</code></td><td>Sub-rede pequena e controlada</td><td>DMZ, appliances, serviços restritos</td></tr>\n<tr><td>Prefixo ponto a ponto, como <code>/30</code> ou <code>/31</code></td><td>Pouquíssimos endereços</td><td>Links entre roteadores, dependendo do suporte</td></tr>\n<tr><td><code>/32</code></td><td>Identidade de um único host ou rota exata</td><td>Loopback de roteador, allowlist específica, rota host</td></tr>\n</tbody></table>\n<p>Uma arquitetura madura não escolhe CIDR apenas pela quantidade atual de máquinas. Ela considera crescimento, reservas, alta disponibilidade, endereços de gateway, DHCP, IPAM, monitoramento, cloud provider, troubleshooting e segurança.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em um prédio com 32 posições numeradas. O CIDR é como dizer quantas posições fazem parte do endereço do prédio e quantas ficam para apartamentos internos. Se você reserva muitas posições para identificar o prédio, sobram poucos apartamentos. Se reserva poucas posições para o prédio, sobra muito espaço interno, mas você cria menos prédios separados.</p>\n<p>Um <code>/24</code> é como um prédio com muitos apartamentos. Um <code>/28</code> é um bloco menor, com poucas unidades. Um <code>/32</code> é como apontar para uma única sala específica. A troca é sempre a mesma: mais divisão significa menos espaço dentro de cada divisão.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> redes não são prédios físicos. Em redes, a máscara é aplicada bit a bit, e decisões de rota, gateway, broadcast e políticas dependem desses bits, não de uma placa visual na porta.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Você tem <code>192.168.10.0/26</code>. O prefixo é 26. Como IPv4 tem 32 bits, sobram <code>32 - 26 = 6</code> bits de host. O total de endereços é <code>2^6 = 64</code>. Em IPv4 tradicional, dois endereços são reservados: um para rede e um para broadcast. Logo, existem <code>64 - 2 = 62</code> hosts úteis.</p>\n<table class=\"data-table\"><thead><tr><th>Campo</th><th>Valor</th></tr></thead><tbody>\n<tr><td>Bloco</td><td><code>192.168.10.0/26</code></td></tr>\n<tr><td>Máscara</td><td><code>255.255.255.192</code></td></tr>\n<tr><td>Bits de rede</td><td>26</td></tr>\n<tr><td>Bits de host</td><td>6</td></tr>\n<tr><td>Endereços totais</td><td>64</td></tr>\n<tr><td>Hosts úteis tradicionais</td><td>62</td></tr>\n</tbody></table>\n<p>Ainda não estamos calculando rede, primeiro host, último host e broadcast detalhadamente. Isso será aprofundado na aula 5.3. Aqui, o foco é descobrir o tamanho do bloco e a capacidade.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Uma empresa precisa criar uma VLAN para impressoras. Hoje existem 18 impressoras, mas o time prevê crescimento para 26 dispositivos, incluindo impressoras novas e leitores de crachá. Um <code>/28</code> teria 16 endereços totais e 14 hosts úteis tradicionais; seria pequeno demais. Um <code>/27</code> tem 32 endereços totais e 30 hosts úteis, podendo atender ao cenário com pouca folga. Um <code>/26</code> tem 62 hosts úteis, mas talvez seja exagerado para esse segmento.</p>\n<p>Perceba que a escolha não é apenas matemática. Se impressoras são críticas, talvez seja necessário reservar IPs para gateways redundantes, monitoramento, DHCP reservation, SNMP, appliances de impressão e crescimento. Se a rede usa alta disponibilidade, o gateway virtual e endereços de infraestrutura também entram no planejamento.</p>\n<div class=\"callout\"><strong>Decisão madura:</strong> escolher <code>/27</code> pode ser bom para um grupo pequeno e controlado; escolher <code>/26</code> pode ser prudente se houver crescimento real. O erro é escolher sem inventário, sem reserva e sem política.</div>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, CIDR aparece em VPCs, VNets e subnets. Um bloco como <code>10.40.0.0/16</code> pode ser a rede principal de uma VPC. Dentro dela, você cria subnets como <code>10.40.1.0/24</code> para workloads privados, <code>10.40.10.0/24</code> para bancos, <code>10.40.100.0/24</code> para serviços compartilhados e assim por diante.</p>\n<p>O planejamento precisa considerar que provedores cloud costumam reservar alguns endereços dentro de cada subnet para infraestrutura da plataforma. Portanto, a fórmula <code>2^bits_de_host - 2</code> explica o IPv4 tradicional, mas a capacidade real em cloud pode ser menor por reservas do provedor. Isso é crítico em subnets pequenas.</p>\n<table class=\"data-table\"><thead><tr><th>Erro em cloud</th><th>Impacto</th></tr></thead><tbody>\n<tr><td>Criar subnet pequena demais</td><td>Workloads não escalam, nodes não recebem IP, pods/ENIs esgotam capacidade</td></tr>\n<tr><td>Sobrepor CIDR com filial ou VPN</td><td>Peering, VPN e roteamento híbrido ficam problemáticos</td></tr>\n<tr><td>Usar bloco amplo sem segmentação</td><td>Security groups e rotas ficam permissivos demais</td></tr>\n<tr><td>Não reservar espaço futuro</td><td>Expansão exige migração complexa</td></tr>\n</tbody></table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, CIDR aparece em Terraform, Helm charts, manifestos Kubernetes, políticas de rede, runners self-hosted, allowlists de CI/CD, proxies e ambientes efêmeros. Um pipeline pode criar uma subnet, publicar regras de firewall, configurar rotas e aplicar uma política baseada em CIDR. Um erro de prefixo vira erro de infraestrutura.</p>\n<p>Exemplo: um módulo Terraform recebe uma variável <code>private_subnet_cidr = \"10.20.8.0/28\"</code>. Parece suficiente para poucos servidores, mas se a arquitetura depois incluir autoscaling, endpoints privados, NAT, appliances, bancos gerenciados e IPs reservados pelo provedor, a subnet pode ficar pequena. O problema aparece como falha de provisionamento, não como “erro de matemática”.</p>\n<div class=\"callout callout--security\"><strong>Visão DevSecOps:</strong> CIDR deve ser validado em revisão de código, documentação, testes de política, checagem de sobreposição e revisão de segurança. Infra como código não elimina erro de rede; ela automatiza tanto o acerto quanto o erro.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Em segurança, CIDR define escopo. Uma regra permitindo <code>10.0.0.0/8</code> é muito diferente de uma regra permitindo <code>10.10.20.15/32</code>. A primeira libera um universo enorme de endereços privados; a segunda libera um host específico. A diferença entre prefixos pode ser a diferença entre controle preciso e exposição lateral.</p>\n<table class=\"risk-table\"><thead><tr><th>Uso de CIDR</th><th>Risco</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td><code>0.0.0.0/0</code> em regra de entrada</td><td>Exposição para qualquer origem IPv4</td><td>Restringir por origem necessária, VPN, WAF, bastion ou acesso privado</td></tr>\n<tr><td><code>10.0.0.0/8</code> em allowlist interna</td><td>Permissão ampla demais em redes privadas</td><td>Usar sub-redes específicas e revisar necessidade real</td></tr>\n<tr><td><code>/24</code> para serviço sensível</td><td>Muitos hosts autorizados sem necessidade</td><td>Preferir <code>/32</code>, sub-rede dedicada ou identidade forte quando possível</td></tr>\n<tr><td>Subnets sem documentação</td><td>Logs e alertas sem contexto</td><td>Manter IPAM, tags, CMDB, owners e propósito</td></tr>\n</tbody></table>\n<p>Uma boa regra de firewall não começa com “qual IP funciona?”. Ela começa com: qual origem precisa acessar, por qual porta, por qual identidade, por quanto tempo e com qual monitoramento?</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama abaixo mostra a relação entre prefixo, bits de host e quantidade de endereços. Observe que cada bit de host dobrado aumenta a capacidade.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 620\" role=\"img\" aria-labelledby=\"m05l02-title m05l02-desc\">\n<title id=\"m05l02-title\">CIDR, bits de host e quantidade de hosts</title>\n<desc id=\"m05l02-desc\">Diagrama mostra prefixos IPv4 comuns, seus bits de host, quantidade total de endereços e hosts utilizáveis tradicionais.</desc>\n<defs><marker id=\"m05l02-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"40\" y=\"38\" width=\"900\" height=\"78\" rx=\"16\" class=\"svg-node svg-node--router\"></rect>\n<text x=\"490\" y=\"74\" text-anchor=\"middle\" class=\"svg-label\">IPv4 sempre possui 32 bits</text>\n<text x=\"490\" y=\"100\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Prefixo CIDR = bits de rede | 32 - prefixo = bits de host</text>\n<rect x=\"70\" y=\"170\" width=\"170\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n<text x=\"155\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">/24</text>\n<text x=\"155\" y=\"234\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">8 bits host</text>\n<text x=\"155\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">256 totais</text>\n<text x=\"155\" y=\"286\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">254 úteis</text>\n<rect x=\"290\" y=\"170\" width=\"170\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n<text x=\"375\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">/26</text>\n<text x=\"375\" y=\"234\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">6 bits host</text>\n<text x=\"375\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">64 totais</text>\n<text x=\"375\" y=\"286\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">62 úteis</text>\n<rect x=\"510\" y=\"170\" width=\"170\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n<text x=\"595\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">/28</text>\n<text x=\"595\" y=\"234\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4 bits host</text>\n<text x=\"595\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">16 totais</text>\n<text x=\"595\" y=\"286\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">14 úteis</text>\n<rect x=\"730\" y=\"170\" width=\"170\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect>\n<text x=\"815\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">/30</text>\n<text x=\"815\" y=\"234\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">2 bits host</text>\n<text x=\"815\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4 totais</text>\n<text x=\"815\" y=\"286\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">2 úteis</text>\n<path d=\"M 155 322 L 375 322 L 595 322 L 815 322\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#m05l02-arrow)\"></path>\n<text x=\"490\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Prefixo maior → menos bits de host → sub-rede menor</text>\n<rect x=\"80\" y=\"410\" width=\"820\" height=\"120\" rx=\"16\" class=\"svg-zone\"></rect>\n<text x=\"490\" y=\"446\" text-anchor=\"middle\" class=\"svg-label\">Fórmula operacional</text>\n<text x=\"490\" y=\"478\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bits de host = 32 - prefixo</text>\n<text x=\"490\" y=\"506\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">endereços totais = 2^bits_de_host</text>\n<text x=\"490\" y=\"534\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">hosts úteis tradicionais = 2^bits_de_host - 2</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório integrador</h2>\n<p>Esta aula agora abriga o <strong>Lab integrador 1 do M05</strong>: cálculo manual de sub-redes com validação. Ele substitui pequenos labs dispersos e cria uma base prática verificável para todo o módulo.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam a conversão entre prefixo, máscara e quantidade de hosts. Faça sem calculadora na primeira tentativa para treinar o raciocínio binário.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio coloca você como responsável por escolher prefixos para diferentes segmentos. A resposta correta não será apenas o cálculo: você deverá justificar capacidade, crescimento e risco.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostrará como raciocinar a partir da necessidade de hosts, escolher o menor prefixo aceitável e avaliar folga operacional.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>CIDR informa quantos bits são de rede. Como IPv4 tem 32 bits, os bits de host são calculados com <code>32 - prefixo</code>. A quantidade total de endereços é <code>2^bits_de_host</code>. Em IPv4 tradicional, hosts utilizáveis são <code>2^bits_de_host - 2</code>, descontando rede e broadcast.</p>\n<p>A lição operacional é simples: prefixo maior cria sub-redes menores. Prefixo menor cria blocos maiores. Uma escolha madura considera capacidade, crescimento, segurança, cloud, DHCP, rotas, IPAM e troubleshooting.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, estudaremos <strong>Rede, broadcast, primeiro e último host</strong>. Agora que você sabe calcular o tamanho do bloco, aprenderá a encontrar onde cada sub-rede começa, onde termina e quais endereços podem ser atribuídos.</p>\n</section>"
  },
  "networkContext": {
    "scope": "Cálculo de capacidade de sub-redes IPv4 a partir de prefixos CIDR e máscaras.",
    "layers": [
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "relatedLessons": [
      "0.2",
      "4.2",
      "4.3",
      "4.4",
      "4.10",
      "5.1"
    ],
    "typicalSymptoms": [
      "subnet pequena demais",
      "DHCP esgotado",
      "CIDR amplo demais",
      "erro de máscara",
      "rota incorreta",
      "allowlist permissiva",
      "sobreposição de blocos",
      "subnet cloud sem capacidade"
    ]
  },
  "protocolFields": [
    {
      "name": "CIDR Prefix",
      "description": "Número de bits usados para identificar a parte de rede, como /24 ou /27."
    },
    {
      "name": "Subnet Mask",
      "description": "Máscara decimal pontuada equivalente ao prefixo CIDR."
    },
    {
      "name": "Network Bits",
      "description": "Quantidade de bits 1 na máscara."
    },
    {
      "name": "Host Bits",
      "description": "Quantidade de bits 0 na máscara, calculada por 32 menos o prefixo."
    },
    {
      "name": "Total Addresses",
      "description": "Quantidade total de endereços no bloco, calculada por 2 elevado aos bits de host."
    },
    {
      "name": "Usable Hosts",
      "description": "Quantidade tradicional de hosts atribuíveis em IPv4, normalmente total menos rede e broadcast."
    },
    {
      "name": "Special Prefix /31",
      "description": "Prefixo especial usado em alguns enlaces ponto a ponto, sem o modelo tradicional de rede e broadcast."
    },
    {
      "name": "Host Route /32",
      "description": "Prefixo que representa um único endereço IPv4."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Prefixo é recebido",
      "description": "O engenheiro lê um bloco como 192.168.10.0/27."
    },
    {
      "step": 2,
      "title": "Bits de rede são identificados",
      "description": "O /27 informa que 27 bits pertencem à rede."
    },
    {
      "step": 3,
      "title": "Bits de host são calculados",
      "description": "IPv4 possui 32 bits, então 32 - 27 = 5 bits de host."
    },
    {
      "step": 4,
      "title": "Capacidade total é calculada",
      "description": "Com 5 bits de host, existem 2^5 = 32 endereços totais."
    },
    {
      "step": 5,
      "title": "Hosts úteis tradicionais são estimados",
      "description": "32 - 2 = 30 hosts úteis em IPv4 tradicional."
    },
    {
      "step": 6,
      "title": "Capacidade é comparada com a necessidade",
      "description": "O tamanho é comparado com hosts atuais, crescimento, reservas e regras do ambiente."
    },
    {
      "step": 7,
      "title": "Decisão é documentada",
      "description": "A escolha do prefixo é registrada em IPAM, IaC, diagrama, firewall e escopo DHCP."
    }
  ],
  "deepDive": {
    "title": "Por que menos 2? E quando não é tão simples?",
    "points": [
      "Em uma sub-rede IPv4 tradicional, o primeiro endereço identifica a rede e o último endereço é o broadcast dirigido da sub-rede.",
      "Por isso, a conta clássica para hosts utilizáveis é 2^bits_de_host - 2.",
      "Em /30, existem 4 endereços totais e 2 hosts úteis tradicionais, por isso ele foi muito usado em links ponto a ponto.",
      "Em /31, há apenas dois endereços, mas ele pode ser usado em links ponto a ponto em equipamentos que suportam esse modelo, evitando desperdício.",
      "Em /32, não existe uma sub-rede para hosts; existe um único endereço, usado como rota de host, loopback de roteador ou regra específica.",
      "Em cloud, provedores podem reservar endereços adicionais dentro da subnet, então a capacidade prática pode ser menor que a fórmula tradicional."
    ],
    "mentalModel": "CIDR é um controle deslizante: mover para a direita aumenta a quantidade de bits de rede e reduz a quantidade de bits de host. Mais precisão normalmente significa menos capacidade dentro de cada sub-rede."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que /24 sempre é a escolha segura",
      "impact": "Pode desperdiçar espaço e criar políticas amplas demais.",
      "fix": "Escolher prefixo com base em hosts, crescimento, reservas, segurança e contexto."
    },
    {
      "mistake": "Confundir endereços totais com hosts utilizáveis",
      "impact": "Planejamento superestima capacidade e DHCP pode esgotar.",
      "fix": "Separar total de endereços, rede, broadcast e reservas adicionais."
    },
    {
      "mistake": "Ignorar /31 e /32",
      "impact": "Desperdício em links ponto a ponto ou confusão em rotas específicas.",
      "fix": "Entender que /31 e /32 são usos especiais, não redes comuns de usuários."
    },
    {
      "mistake": "Usar CIDR amplo em firewall por conveniência",
      "impact": "Aumenta superfície de ataque e movimento lateral.",
      "fix": "Aplicar menor escopo viável, com justificativa e revisão."
    },
    {
      "mistake": "Planejar cloud como se fosse LAN local",
      "impact": "Subnets pequenas podem falhar por reservas do provedor e escala de workloads.",
      "fix": "Consultar reservas da plataforma e planejar folga."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "DHCP sem endereços disponíveis",
      "Host configurado mas não comunica corretamente",
      "Regra de firewall libera mais origens que o esperado",
      "Peering/VPN não sobe por conflito de endereços"
    ],
    "diagnosticQuestions": [
      "Verificar escopo DHCP, leases ativos, exclusões, reservas e quantidade de hosts úteis.",
      "Comparar IP, máscara, gateway, rota local e ARP do gateway.",
      "Calcular quantidade de endereços incluídos e mapear ativos dentro do bloco.",
      "Comparar blocos de filiais, cloud, laboratório, parceiros e VPN."
    ],
    "decisionTree": [
      {
        "if": "DHCP sem endereços disponíveis",
        "then": "Aumentar subnet quando possível, reduzir reservas indevidas ou criar nova sub-rede planejada."
      },
      {
        "if": "Host configurado mas não comunica corretamente",
        "then": "Padronizar configuração via DHCP ou corrigir máscara manual."
      },
      {
        "if": "Regra de firewall libera mais origens que o esperado",
        "then": "Trocar por prefixos mais específicos e revisar necessidade real."
      },
      {
        "if": "Peering/VPN não sobe por conflito de endereços",
        "then": "Reendereçar, usar NAT específico ou redesenhar plano IP."
      }
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup exemplo.local",
        "purpose": "Coletar configuração local, rotas e resolução DNS.",
        "expectedObservation": "IP, gateway, DNS e rotas coerentes com o cenário.",
        "interpretation": "Falhas nessa etapa indicam problemas de base antes da aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Escolher prefixos com base em necessidade real e crescimento previsto.",
      "Usar CIDRs específicos em firewall, security groups e ACLs.",
      "Documentar owner, propósito e criticidade de cada bloco no IPAM.",
      "Validar sobreposição antes de criar VPC, VNet, VPN ou filial.",
      "Revisar allowlists amplas e substituir por blocos menores sempre que viável.",
      "Considerar reservas de cloud, gateways redundantes e endereços de infraestrutura."
    ],
    "badPractices": [
      "Usar 0.0.0.0/0 por conveniência em regra de entrada.",
      "Liberar 10.0.0.0/8 internamente sem necessidade.",
      "Criar subnets cloud pequenas demais para workloads elásticos.",
      "Misturar ambientes sensíveis e não sensíveis no mesmo CIDR sem controle.",
      "Não registrar decisões de prefixo em IPAM ou IaC."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição excessiva por regras amplas.",
        "description": "Risco relacionado à aula 5.2 — CIDR, máscara e quantidade de hosts.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Princípio do menor escopo de rede."
      },
      {
        "name": "Movimento lateral facilitado por segmentação grosseira.",
        "description": "Risco relacionado à aula 5.2 — CIDR, máscara e quantidade de hosts.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de CIDR em change management e pull requests de IaC."
      },
      {
        "name": "Falhas de disponibilidade por esgotamento de endereços.",
        "description": "Risco relacionado à aula 5.2 — CIDR, máscara e quantidade de hosts.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Validação automatizada contra sobreposição."
      },
      {
        "name": "Roteamento incorreto por sobreposição de CIDR.",
        "description": "Risco relacionado à aula 5.2 — CIDR, máscara e quantidade de hosts.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM atualizado e integrado com CMDB quando possível."
      },
      {
        "name": "Dificuldade forense por documentação ruim.",
        "description": "Risco relacionado à aula 5.2 — CIDR, máscara e quantidade de hosts.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação por função, criticidade e zona de segurança."
      }
    ],
    "mitigations": [
      "Princípio do menor escopo de rede.",
      "Revisão de CIDR em change management e pull requests de IaC.",
      "Validação automatizada contra sobreposição.",
      "IPAM atualizado e integrado com CMDB quando possível.",
      "Segmentação por função, criticidade e zona de segurança.",
      "Monitoramento de uso de IP e alerta de esgotamento de subnets."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Princípio do menor escopo de rede.",
      "Revisão de CIDR em change management e pull requests de IaC.",
      "Validação automatizada contra sobreposição.",
      "IPAM atualizado e integrado com CMDB quando possível.",
      "Segmentação por função, criticidade e zona de segurança.",
      "Monitoramento de uso de IP e alerta de esgotamento de subnets."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-5.2",
    "labType": "calculo",
    "title": "Lab integrador 1 — Cálculo de sub-redes com validação manual",
    "objective": "Calcular sub-redes IPv4 manualmente, validar rede, broadcast, hosts úteis, máscara e bloco sem depender cegamente de calculadora.",
    "scenario": "Você recebeu o bloco 192.168.40.0/24 e precisa entregar sub-redes para usuários, servidores, impressoras e visitantes usando /26. Depois, deve validar um cenário /27 e explicar o raciocínio.",
    "topology": "Laboratório lógico: bloco IPv4 /24 dividido em sub-redes menores; sem necessidade de Packet Tracer nesta etapa.",
    "architecture": "Planejamento manual de endereçamento usado antes de configurar roteador, DHCP, firewall, IPAM ou cloud route tables.",
    "prerequisites": [
      "Aulas 4.2, 4.3, 4.4 e 5.1 concluídas ou revisadas.",
      "Papel, planilha ou editor de texto para registrar cálculos."
    ],
    "tools": [
      "Calculadora simples opcional",
      "Planilha opcional",
      "ipcalc opcional no Linux",
      "PowerShell opcional para registrar tabela"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Use blocos privados de laboratório. Não altere redes reais de produção.",
      "Não publique endereços reais de empresa nos entregáveis."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir o bloco base",
        "instruction": "Registre o bloco recebido e identifique quantos endereços totais existem em um /24.",
        "calculation": "192.168.40.0/24 possui 8 bits de host: 2^8 = 256 endereços totais.",
        "expectedOutput": "Bloco base documentado como 192.168.40.0 a 192.168.40.255.",
        "explanation": "Antes de dividir, você precisa saber o tamanho do espaço disponível."
      },
      {
        "number": 2,
        "title": "Calcular o tamanho do /26",
        "instruction": "Determine quantos bits de host restam em /26 e quantos endereços existem por sub-rede.",
        "calculation": "/26 deixa 6 bits de host: 2^6 = 64 endereços totais; hosts úteis tradicionais = 62.",
        "expectedOutput": "Cada /26 avança de 64 em 64 no último octeto.",
        "explanation": "O incremento do bloco é a base do cálculo: 0, 64, 128, 192."
      },
      {
        "number": 3,
        "title": "Montar as quatro sub-redes /26",
        "instruction": "Crie uma tabela com rede, primeiro host, último host, broadcast e gateway sugerido.",
        "artifact": "Tabela: 192.168.40.0/26, 192.168.40.64/26, 192.168.40.128/26 e 192.168.40.192/26.",
        "expectedOutput": "Quatro linhas completas, sem sobreposição e sem pular broadcast.",
        "explanation": "Esta tabela vira a fonte de verdade para Packet Tracer, DHCP, firewall e documentação."
      },
      {
        "number": 4,
        "title": "Validar a faixa da primeira sub-rede",
        "instruction": "Calcule manualmente a primeira rede /26.",
        "calculation": "Rede 192.168.40.0; primeiro host 192.168.40.1; último host 192.168.40.62; broadcast 192.168.40.63.",
        "expectedOutput": "Faixa correta da primeira sub-rede.",
        "explanation": "O broadcast é sempre o último endereço do bloco."
      },
      {
        "number": 5,
        "title": "Validar a faixa da segunda sub-rede",
        "instruction": "Calcule a segunda rede /26 começando no próximo bloco.",
        "calculation": "Rede 192.168.40.64; primeiro host 192.168.40.65; último host 192.168.40.126; broadcast 192.168.40.127.",
        "expectedOutput": "Faixa correta da segunda sub-rede.",
        "explanation": "O próximo bloco começa imediatamente depois do broadcast anterior."
      },
      {
        "number": 6,
        "title": "Conferir com ferramenta opcional",
        "instruction": "Use uma ferramenta apenas para conferir, não para substituir o raciocínio.",
        "command": "ipcalc 192.168.40.0/26\nipcalc 192.168.40.64/26",
        "expectedOutput": "Network, HostMin, HostMax e Broadcast compatíveis com a tabela manual.",
        "explanation": "Ferramentas ajudam a detectar erro, mas o profissional precisa explicar o cálculo."
      },
      {
        "number": 7,
        "title": "Resolver um caso /27",
        "instruction": "Calcule em qual bloco cai o IP 192.168.40.77/27.",
        "calculation": "/27 tem blocos de 32: 0, 32, 64, 96. O IP 77 cai no bloco 64–95.",
        "expectedOutput": "Rede 192.168.40.64, primeiro host .65, último host .94, broadcast .95.",
        "explanation": "Este passo testa se o aluno sabe encontrar o bloco correto de um host qualquer."
      },
      {
        "number": 8,
        "title": "Criar checklist de validação manual",
        "instruction": "Registre as regras que você usará para não errar em cálculos futuros.",
        "artifact": "Checklist: prefixo, bits de host, tamanho do bloco, rede, broadcast, hosts, gateway, sobreposição.",
        "expectedOutput": "Checklist final anexado ao entregável.",
        "explanation": "Subnetting bom é repetível e auditável."
      }
    ],
    "expectedResult": "Tabela manual completa para /26, caso resolvido de /27 e checklist de validação reutilizável.",
    "validation": [
      {
        "check": "As quatro redes /26 cobrem todo o /24 sem sobrepor",
        "method": "Comparar início e broadcast de cada bloco",
        "expected": "0–63, 64–127, 128–191, 192–255",
        "ifFails": "Recalcular o tamanho do bloco."
      },
      {
        "check": "Cada rede tem 62 hosts úteis tradicionais",
        "method": "2^(32-prefixo)-2",
        "expected": "62 para /26",
        "ifFails": "Revisar bits de host."
      },
      {
        "check": "O caso /27 está correto",
        "method": "Localizar bloco de 32 que contém .77",
        "expected": "192.168.40.64/27",
        "ifFails": "Listar os blocos /27 desde zero."
      },
      {
        "check": "Gateway não usa rede nem broadcast",
        "method": "Verificar gateway sugerido em cada sub-rede",
        "expected": "Gateway dentro da faixa útil",
        "ifFails": "Trocar gateway para primeiro ou último host útil."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Broadcast calculado como primeiro endereço do próximo bloco",
        "probableCause": "Confundir início do próximo bloco com broadcast atual.",
        "howToConfirm": "Subtrair 1 do início do próximo bloco.",
        "fix": "Recalcular usando bloco atual: início + tamanho - 1."
      },
      {
        "symptom": "Host útil inclui endereço de rede",
        "probableCause": "Esquecer que o primeiro endereço identifica a rede.",
        "howToConfirm": "Comparar com a linha Network do ipcalc.",
        "fix": "Usar o endereço seguinte como primeiro host."
      },
      {
        "symptom": "Sobreposição entre sub-redes",
        "probableCause": "Incremento errado no último octeto.",
        "howToConfirm": "Verificar se o início de uma rede é menor ou igual ao broadcast anterior.",
        "fix": "Recalcular incremento: 256 - valor do octeto da máscara."
      }
    ],
    "improvements": [
      "Repetir o cálculo com /25, /27 e /28.",
      "Criar uma planilha que calcule automaticamente, mas mostre as fórmulas.",
      "Comparar cálculo manual com ipcalc, subnetcalc ou ferramenta IPAM."
    ],
    "evidenceToCollect": [
      "Tabela /26 completa",
      "Cálculo do caso /27",
      "Checklist de validação",
      "Print ou saída opcional do ipcalc",
      "Resumo de erros encontrados e corrigidos"
    ],
    "questions": [
      "Por que /26 gera quatro sub-redes dentro de um /24?",
      "Qual é a diferença entre endereço total e host útil?",
      "Por que o gateway não deve ser rede nem broadcast?"
    ],
    "challenge": "Calcule 192.168.40.144/28 e explique rede, broadcast e hosts úteis sem usar ferramenta externa primeiro.",
    "solution": "Em /28, o bloco tem 16 endereços. Os blocos são 0, 16, 32, 48, 64, 80, 96, 112, 128, 144. Logo 192.168.40.144/28 tem rede .144, hosts .145–.158 e broadcast .159."
  },
  "mentorQuestions": [
    "Se uma subnet precisa suportar 50 hosts, por que /26 é mais adequado que /27?",
    "Por que uma regra de firewall com /32 é mais específica que uma regra com /24?",
    "Em que situações a fórmula 2^bits_de_host - 2 precisa ser interpretada com cuidado?"
  ],
  "quiz": [
    {
      "question": "Em um IPv4 /26, quantos bits sobram para hosts?",
      "options": [
        "4",
        "5",
        "6",
        "8"
      ],
      "answer": "6",
      "explanation": "IPv4 possui 32 bits. 32 - 26 = 6 bits de host."
    },
    {
      "question": "Quantos endereços totais existem em um /27?",
      "options": [
        "16",
        "30",
        "32",
        "64"
      ],
      "answer": "32",
      "explanation": "/27 deixa 5 bits de host. 2^5 = 32 endereços totais."
    },
    {
      "question": "Qual máscara corresponde a /28?",
      "options": [
        "255.255.255.224",
        "255.255.255.240",
        "255.255.255.248",
        "255.255.255.252"
      ],
      "answer": "255.255.255.240",
      "explanation": "/28 significa 4 bits de rede no último octeto: 11110000 = 240."
    },
    {
      "question": "Em IPv4 tradicional, por que subtraímos 2 dos endereços totais?",
      "options": [
        "Por causa do DNS e do gateway",
        "Porque rede e broadcast não são hosts atribuíveis",
        "Porque DHCP sempre reserva dois endereços",
        "Porque switches precisam de dois IPs"
      ],
      "answer": "Porque rede e broadcast não são hosts atribuíveis",
      "explanation": "O primeiro endereço identifica a rede e o último representa o broadcast da sub-rede."
    },
    {
      "question": "O que um /32 representa normalmente?",
      "options": [
        "Uma rede com 254 hosts",
        "Um único endereço específico",
        "Uma rede de dois hosts tradicionais",
        "Uma máscara inválida"
      ],
      "answer": "Um único endereço específico",
      "explanation": "/32 tem zero bits de host e representa exatamente um endereço."
    },
    {
      "question": "Qual é o risco de usar CIDR amplo demais em uma allowlist?",
      "options": [
        "Reduzir o TTL",
        "Liberar origens desnecessárias",
        "Impedir ARP",
        "Desativar broadcast"
      ],
      "answer": "Liberar origens desnecessárias",
      "explanation": "Um bloco amplo inclui mais endereços do que o necessário e aumenta exposição."
    }
  ],
  "flashcards": [
    {
      "front": "O que significa /24?",
      "back": "24 bits de rede e 8 bits de host em um IPv4 de 32 bits."
    },
    {
      "front": "Fórmula dos bits de host",
      "back": "bits de host = 32 - prefixo CIDR."
    },
    {
      "front": "Endereços totais de um /26",
      "back": "32 - 26 = 6; 2^6 = 64 endereços totais."
    },
    {
      "front": "Hosts úteis tradicionais de um /28",
      "back": "32 - 28 = 4; 2^4 = 16; 16 - 2 = 14 hosts úteis."
    },
    {
      "front": "O que é /32?",
      "back": "Um prefixo que representa um único endereço IPv4."
    },
    {
      "front": "Por que CIDR importa em segurança?",
      "back": "Porque define o escopo de regras, allowlists, rotas e políticas de acesso."
    }
  ],
  "exercises": [
    {
      "id": "ex-5.2-1",
      "prompt": "Calcule bits de host, endereços totais e hosts úteis tradicionais para /25.",
      "expectedAnswer": "7 bits de host, 128 endereços totais, 126 hosts úteis tradicionais."
    },
    {
      "id": "ex-5.2-2",
      "prompt": "Qual é a máscara decimal de /27?",
      "expectedAnswer": "255.255.255.224."
    },
    {
      "id": "ex-5.2-3",
      "prompt": "Uma VLAN precisa suportar 28 dispositivos. /28 é suficiente? Justifique.",
      "expectedAnswer": "Não. /28 tem 14 hosts úteis tradicionais. /27 tem 30 e seria o menor prefixo tradicional suficiente, sem considerar reservas adicionais."
    },
    {
      "id": "ex-5.2-4",
      "prompt": "Explique por que 10.0.0.0/8 em uma allowlist pode ser perigoso.",
      "expectedAnswer": "Porque libera um bloco privado enorme, potencialmente incluindo redes e hosts que não deveriam ter acesso."
    }
  ],
  "challenge": {
    "title": "Escolha prefixos para segmentos reais",
    "scenario": "Você precisa planejar três segmentos: Administração com 42 hosts, Impressoras com 18 hosts e DMZ com 6 hosts. Considere crescimento de 25% e escolha prefixos adequados.",
    "tasks": [
      "Calcular a necessidade aproximada após crescimento.",
      "Escolher o menor prefixo tradicional viável para cada segmento.",
      "Indicar endereços totais e hosts úteis de cada prefixo.",
      "Explicar onde deixaria folga e onde seria mais restritivo por segurança.",
      "Apontar cuidados de cloud ou firewall se esses blocos fossem usados em ambiente híbrido."
    ],
    "rubric": [
      "Cálculo correto de capacidade por prefixo.",
      "Justificativa de crescimento e reservas.",
      "Uso de menor escopo viável para segmentos sensíveis.",
      "Menção a DHCP, gateway, firewall e IPAM.",
      "Comentário sobre sobreposição e reservas cloud."
    ]
  },
  "commentedSolution": {
    "summary": "Administração com 42 hosts cresce para cerca de 53; /26 oferece 62 hosts úteis e é adequado com folga limitada. Impressoras com 18 hosts crescem para cerca de 23; /27 oferece 30 hosts úteis. DMZ com 6 hosts cresce para cerca de 8; /28 oferece 14 hosts úteis e permite alguma reserva sem abrir demais o segmento.",
    "steps": [
      "Administração: 42 x 1,25 = 52,5, arredondando para 53. /27 tem 30, insuficiente. /26 tem 62, suficiente.",
      "Impressoras: 18 x 1,25 = 22,5, arredondando para 23. /28 tem 14, insuficiente. /27 tem 30, suficiente.",
      "DMZ: 6 x 1,25 = 7,5, arredondando para 8. /29 tem 6, insuficiente no modelo tradicional. /28 tem 14, suficiente.",
      "A DMZ deve ter regras mais restritivas, logs melhores e menor escopo de acesso, mesmo que o prefixo ainda comporte alguns hosts extras.",
      "A decisão final deve ser registrada em IPAM, escopos DHCP/reservas, firewall, diagrama e IaC se houver cloud."
    ],
    "pitfalls": [
      "Escolher /24 para todos os segmentos por comodidade.",
      "Ignorar crescimento e reservas de gateway/serviços.",
      "Usar /29 para a DMZ sem perceber que 6 hosts úteis não comportam crescimento.",
      "Não diferenciar capacidade tradicional de reservas específicas em cloud."
    ]
  },
  "glossary": [
    {
      "term": "CIDR",
      "definition": "Notação que indica quantos bits de um endereço IP pertencem à parte de rede."
    },
    {
      "term": "Prefixo",
      "definition": "Número após a barra, como /24, que indica a quantidade de bits de rede."
    },
    {
      "term": "Máscara de sub-rede",
      "definition": "Representação decimal ou binária que separa bits de rede e bits de host."
    },
    {
      "term": "Bits de host",
      "definition": "Bits que sobram para endereços dentro da sub-rede."
    },
    {
      "term": "Hosts utilizáveis",
      "definition": "Quantidade de endereços normalmente atribuíveis a interfaces em uma sub-rede IPv4 tradicional."
    },
    {
      "term": "/32",
      "definition": "Prefixo que representa exatamente um endereço IPv4."
    }
  ],
  "references": [
    {
      "title": "Curso Redes e Network v2.0 — Módulo 4",
      "type": "internal",
      "note": "Base de IPv4, máscara, rede, broadcast, gateway e troubleshooting."
    },
    {
      "title": "Curso Redes e Network v2.0 — Aula 5.1",
      "type": "internal",
      "note": "Motivação e problema resolvido por subnetting."
    },
    {
      "title": "RFC 4632 — Classless Inter-domain Routing",
      "type": "standard",
      "note": "Referência histórica e técnica sobre CIDR."
    },
    {
      "title": "RFC 3021 — Using 31-Bit Prefixes on IPv4 Point-to-Point Links",
      "type": "standard",
      "note": "Uso especial de /31 em enlaces ponto a ponto."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud Networking",
      "reason": "CIDR é base para VPCs, VNets, subnets privadas, públicas e roteamento híbrido."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Allowlists por CIDR aparecem em políticas de acesso, integração e exposição de serviços."
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
    "minimumQuizScore": 70,
    "minimumFlashcardsReviewed": 5,
    "requiresNotes": true,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.3"
    ]
  }
};
