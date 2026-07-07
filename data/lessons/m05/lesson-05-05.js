export const lesson0505 = {
  "id": "5.5",
  "moduleId": "m05",
  "order": 5,
  "title": "Prefixos comuns na prática: /24 a /32",
  "subtitle": "Como escolher, interpretar e auditar os prefixos IPv4 mais usados em redes reais, de LANs /24 até hosts /32 e enlaces /31.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 235,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "cidr",
    "prefixos",
    "/24",
    "/25",
    "/26",
    "/27",
    "/28",
    "/29",
    "/30",
    "/31",
    "/32",
    "ipam",
    "firewall",
    "cloud",
    "devsecops",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "reason": "A aula 5.1 explicou por que subnetting existe e como ele resolve problemas de escala, organização e segurança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.2",
      "reason": "A aula 5.2 ensinou CIDR, máscara e quantidade de hosts, base para comparar prefixos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.3",
      "reason": "A aula 5.3 ensinou rede, broadcast, primeiro host e último host."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.4",
      "reason": "A aula 5.4 ensinou o método do bloco mágico para calcular rapidamente os limites de uma sub-rede."
    }
  ],
  "objectives": [
    "Reconhecer rapidamente os prefixos IPv4 mais usados em redes reais, de /24 a /32.",
    "Relacionar cada prefixo com máscara decimal, endereços totais e hosts úteis tradicionais.",
    "Explicar quando usar /24, /25, /26, /27, /28, /29, /30, /31 e /32.",
    "Diferenciar prefixos para LAN, VLAN, DMZ, Wi-Fi, enlace ponto a ponto, loopback e rota específica.",
    "Entender exceções operacionais de /31 e /32 sem confundir com redes comuns de usuários.",
    "Aplicar menor privilégio em firewall, VPN, cloud e allowlists usando prefixos adequados.",
    "Evitar escolhas perigosas como /16 por preguiça, /24 para tudo, /30 em cloud sem necessidade ou /32 sem documentação."
  ],
  "learningOutcomes": [
    "Dado um prefixo entre /24 e /32, o aluno identifica máscara, capacidade e uso típico.",
    "Dado um cenário de VLAN, o aluno escolhe um prefixo coerente com número de hosts e crescimento.",
    "Dado um enlace ponto a ponto, o aluno explica quando /30 ou /31 faz sentido.",
    "Dada uma regra de firewall, o aluno avalia se o CIDR está amplo demais ou específico demais.",
    "Dado um plano de cloud, o aluno reconhece reservas adicionais e evita dimensionamento no limite."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n\n<p>Depois de aprender CIDR, rede, broadcast, hosts e bloco mágico, você começa a perceber que muitos ambientes reais usam sempre alguns prefixos repetidos. Uma VLAN de usuários costuma aparecer como <code>/24</code>. Uma pequena DMZ pode aparecer como <code>/28</code>. Um enlace ponto a ponto pode aparecer como <code>/30</code> ou <code>/31</code>. Uma rota extremamente específica pode aparecer como <code>/32</code>.</p>\n<p>O problema é que decorar esses prefixos sem entender o contexto cria decisões ruins. Um <code>/24</code> pode ser confortável demais e desperdiçar endereços. Um <code>/29</code> pode parecer eficiente, mas não suportar crescimento. Um <code>/32</code> pode ser perfeito para liberar um host específico no firewall, mas péssimo se aplicado como se fosse uma rede de usuários.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> prefixos comuns são atalhos operacionais. Eles aceleram desenho, troubleshooting e firewall, mas só são seguros quando você entende capacidade, uso típico, exceções e impacto em segurança.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n\n<p>No início das redes IPv4, a divisão classful criava blocos grandes e rígidos. Com a evolução para CIDR e subnetting, administradores passaram a escolher prefixos sob medida. Na prática, alguns tamanhos se tornaram muito comuns porque equilibram simplicidade e capacidade.</p>\n<p>O <code>/24</code> ficou popular porque é simples de ler: a rede geralmente termina no terceiro octeto, o último octeto varia de 0 a 255, e há até 254 hosts úteis na regra tradicional. Isso combina bem com muitas LANs pequenas e médias. Porém, com o crescimento de segurança, Wi-Fi corporativo, IoT, cloud e DevSecOps, redes muito planas se tornaram menos desejáveis.</p>\n<p>Prefixos menores como <code>/26</code>, <code>/27</code>, <code>/28</code> e <code>/29</code> ganharam força em DMZs, redes de infraestrutura, segmentos de gerenciamento, laboratórios, VPNs e ambientes cloud. Prefixos como <code>/30</code>, <code>/31</code> e <code>/32</code> aparecem em rotas, loopbacks, túneis, interfaces virtuais, allowlists e enlaces ponto a ponto.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n\n<p>O problema operacional não é calcular um prefixo isolado. O problema é escolher o prefixo errado para o cenário. Quando isso acontece, o erro aparece meses depois como falta de IP, sobreposição de VPN, firewall amplo demais, DHCP mal dimensionado, sub-rede cloud sem espaço para crescimento ou rede de visitantes misturada com rede interna.</p>\n<table class=\"data-table\"><thead><tr><th>Escolha ruim</th><th>Por que parece boa</th><th>Problema real</th><th>Consequência</th></tr></thead><tbody>\n<tr><td><code>/24</code> para tudo</td><td>Fácil de ler e configurar</td><td>Pode criar redes grandes demais</td><td>Mais broadcast, menor isolamento e desperdício</td></tr>\n<tr><td><code>/29</code> no limite</td><td>Parece econômico</td><td>Não sobra espaço para crescimento</td><td>Mudança emergencial de endereçamento</td></tr>\n<tr><td><code>/16</code> em allowlist</td><td>Evita abrir chamados futuros</td><td>Permite milhares de endereços sem necessidade</td><td>Violação de menor privilégio</td></tr>\n<tr><td><code>/32</code> sem documentação</td><td>Muito específico</td><td>Pode virar exceção invisível</td><td>Firewall difícil de auditar</td></tr>\n<tr><td><code>/30</code> usado cegamente</td><td>Tradicional para ponto a ponto</td><td>Pode desperdiçar endereços em ambientes que suportam /31</td><td>Plano menos eficiente</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema central:</strong> o prefixo correto não é apenas matemática. Ele depende de função da rede, número de hosts, crescimento, segurança, operação, cloud, rotas e documentação.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n\n<p>A evolução natural do planejamento IPv4 passa por quatro fases. Primeiro, redes grandes e simples, geralmente <code>/24</code>, porque eram fáceis de operar. Depois, segmentação por função: usuários, servidores, voz, Wi-Fi, impressoras, convidados e gerenciamento. Em seguida, segmentação por segurança, com firewalls, ACLs, NAC e políticas entre redes. Por fim, ambientes híbridos e cloud exigem que cada bloco seja pensado também contra sobreposição, rotas, VPNs e reservas do provedor.</p>\n<table class=\"comparison-table\"><thead><tr><th>Fase</th><th>Como se planejava</th><th>Limitação</th><th>Prática moderna</th></tr></thead><tbody>\n<tr><td>Rede simples</td><td>Um <code>/24</code> para todos</td><td>Rede plana</td><td>Segmentar por função</td></tr>\n<tr><td>Segmentação básica</td><td>VLANs com prefixos parecidos</td><td>Crescimento pouco previsto</td><td>IPAM e capacidade planejada</td></tr>\n<tr><td>Segurança</td><td>Firewall entre segmentos críticos</td><td>Regras amplas demais</td><td>Menor privilégio por CIDR</td></tr>\n<tr><td>Cloud/híbrido</td><td>Blocos privados reutilizados sem controle</td><td>Sobreposição em VPN/peering</td><td>Plano global de endereçamento</td></tr>\n</tbody></table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n\n<p>Um <strong>prefixo comum</strong> é um tamanho de rede que aparece com frequência porque resolve um tipo de problema recorrente. Ele não é obrigatório, mas serve como padrão mental para desenho e troubleshooting.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> prefixos comuns de <code>/24</code> a <code>/32</code> representam blocos cada vez menores. Quanto maior o número do prefixo, mais bits de rede existem e menos endereços restam para hosts.</div>\n<table class=\"data-table\"><thead><tr><th>Prefixo</th><th>Máscara</th><th>Endereços totais</th><th>Hosts úteis tradicionais</th><th>Uso típico</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td><code>255.255.255.0</code></td><td>256</td><td>254</td><td>LAN/VLAN comum</td></tr>\n<tr><td><code>/25</code></td><td><code>255.255.255.128</code></td><td>128</td><td>126</td><td>VLAN média</td></tr>\n<tr><td><code>/26</code></td><td><code>255.255.255.192</code></td><td>64</td><td>62</td><td>Departamento, laboratório, Wi-Fi segmentado</td></tr>\n<tr><td><code>/27</code></td><td><code>255.255.255.224</code></td><td>32</td><td>30</td><td>Servidores, infraestrutura, pequena DMZ</td></tr>\n<tr><td><code>/28</code></td><td><code>255.255.255.240</code></td><td>16</td><td>14</td><td>DMZ pequena, rede de gerenciamento</td></tr>\n<tr><td><code>/29</code></td><td><code>255.255.255.248</code></td><td>8</td><td>6</td><td>Pequeno bloco de appliances</td></tr>\n<tr><td><code>/30</code></td><td><code>255.255.255.252</code></td><td>4</td><td>2</td><td>Enlace ponto a ponto clássico</td></tr>\n<tr><td><code>/31</code></td><td><code>255.255.255.254</code></td><td>2</td><td>2 em uso ponto a ponto específico</td><td>Enlace ponto a ponto moderno quando suportado</td></tr>\n<tr><td><code>/32</code></td><td><code>255.255.255.255</code></td><td>1</td><td>1 host/rota específica</td><td>Host específico, loopback, rota, allowlist</td></tr>\n</tbody></table>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n\n<p>Internamente, todos os prefixos de <code>/24</code> a <code>/32</code> continuam sendo apenas divisões dos 32 bits do IPv4. A diferença está em quantos bits ficam para host. Em <code>/24</code>, sobram 8 bits de host. Em <code>/25</code>, sobram 7. Em <code>/26</code>, sobram 6. Esse padrão segue até <code>/32</code>, onde não sobra nenhum bit variável para host.</p>\n<table class=\"data-table\"><thead><tr><th>Prefixo</th><th>Bits de host</th><th>Cálculo total</th><th>Total</th><th>Hosts tradicionais</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td>8</td><td><code>2^8</code></td><td>256</td><td>254</td></tr>\n<tr><td><code>/25</code></td><td>7</td><td><code>2^7</code></td><td>128</td><td>126</td></tr>\n<tr><td><code>/26</code></td><td>6</td><td><code>2^6</code></td><td>64</td><td>62</td></tr>\n<tr><td><code>/27</code></td><td>5</td><td><code>2^5</code></td><td>32</td><td>30</td></tr>\n<tr><td><code>/28</code></td><td>4</td><td><code>2^4</code></td><td>16</td><td>14</td></tr>\n<tr><td><code>/29</code></td><td>3</td><td><code>2^3</code></td><td>8</td><td>6</td></tr>\n<tr><td><code>/30</code></td><td>2</td><td><code>2^2</code></td><td>4</td><td>2</td></tr>\n<tr><td><code>/31</code></td><td>1</td><td><code>2^1</code></td><td>2</td><td>caso especial ponto a ponto</td></tr>\n<tr><td><code>/32</code></td><td>0</td><td><code>2^0</code></td><td>1</td><td>host/rota específica</td></tr>\n</tbody></table>\n<p>A regra tradicional <code>hosts úteis = 2^bits_de_host - 2</code> desconta endereço de rede e broadcast. Porém, <code>/31</code> e <code>/32</code> são exceções operacionais: <code>/31</code> pode ser usado em enlaces ponto a ponto em equipamentos compatíveis, e <code>/32</code> representa um único endereço, muito comum em rotas, loopbacks e regras específicas.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n\n<p>Na arquitetura real, prefixos não vivem isolados. Eles aparecem junto com VLANs, gateways, DHCP, firewall, roteadores, VRFs, NAT, VPN, cloud e observabilidade. Um prefixo define o tamanho do domínio IPv4 daquele segmento; a VLAN separa a Camada 2; o gateway conecta o segmento a outras redes; o firewall controla o tráfego permitido.</p>\n<table class=\"comparison-table\"><thead><tr><th>Prefixo</th><th>Arquitetura comum</th><th>Vantagem</th><th>Cuidado</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td>VLAN de usuários</td><td>Simples e espaçoso</td><td>Não usar como desculpa para rede plana</td></tr>\n<tr><td><code>/26</code></td><td>Departamento ou Wi-Fi por andar</td><td>Segmentação melhor</td><td>Planejar crescimento</td></tr>\n<tr><td><code>/28</code></td><td>DMZ pequena ou gestão</td><td>Reduz exposição</td><td>Não dimensionar sem folga</td></tr>\n<tr><td><code>/30</code></td><td>Roteador a roteador</td><td>Clássico e compatível</td><td>Pode desperdiçar quando /31 é suportado</td></tr>\n<tr><td><code>/32</code></td><td>Loopback, rota específica, allowlist</td><td>Precisão máxima</td><td>Exige documentação e automação</td></tr>\n</tbody></table>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n\n<p>Imagine que você administra um prédio corporativo. Um <code>/24</code> é como reservar um andar inteiro para uma equipe. É confortável, mas talvez desperdice espaço. Um <code>/28</code> é como reservar uma sala pequena para um time específico. É eficiente, mas precisa caber no crescimento esperado. Um <code>/32</code> é como liberar acesso a uma única mesa específica.</p>\n<p>A analogia ajuda, mas tem limite: em redes, o tamanho do bloco também afeta broadcast, roteamento, firewall, DHCP, logs, NAT, VPN e cloud. Não é apenas espaço físico; é domínio operacional e de segurança.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n\n<p>Em casa, seu roteador provavelmente usa algo parecido com <code>192.168.1.0/24</code>. Isso permite endereços como <code>192.168.1.1</code> para o gateway, <code>192.168.1.10</code> para notebook, <code>192.168.1.20</code> para celular e assim por diante.</p>\n<p>Para uma casa, <code>/24</code> é simples e normalmente sobra muito espaço. Mas imagine uma empresa com visitantes, impressoras, câmeras, servidores, notebooks pessoais e dispositivos de laboratório. Colocar tudo em um único <code>/24</code> pode até funcionar, mas não é uma boa arquitetura de segurança.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n\n<p>Uma empresa pode usar prefixos diferentes por função:</p>\n<table class=\"data-table\"><thead><tr><th>Segmento</th><th>Prefixo</th><th>Motivo</th><th>Política esperada</th></tr></thead><tbody>\n<tr><td>Usuários administrativo</td><td><code>10.10.10.0/24</code></td><td>Muitos notebooks e crescimento</td><td>Acesso controlado a serviços internos</td></tr>\n<tr><td>Servidores internos</td><td><code>10.10.20.0/26</code></td><td>Menos hosts, maior controle</td><td>Firewall restritivo</td></tr>\n<tr><td>DMZ</td><td><code>10.10.30.0/28</code></td><td>Poucos serviços expostos</td><td>Permitir apenas portas necessárias</td></tr>\n<tr><td>Gerenciamento</td><td><code>10.10.40.0/28</code></td><td>Switches, firewalls, controladoras</td><td>Acesso apenas por bastion/VPN</td></tr>\n<tr><td>Links entre roteadores</td><td><code>10.10.255.0/30</code></td><td>Dois endpoints por enlace</td><td>Roteamento e monitoramento</td></tr>\n</tbody></table>\n<p>Perceba que o prefixo é parte do desenho. Ele não substitui firewall, autenticação, logs, gestão de vulnerabilidades ou monitoramento.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n\n<p>Em cloud, prefixos aparecem em VPC, VNet, subnets, route tables, security groups, NSGs, NAT gateways, private endpoints, clusters Kubernetes e links híbridos. O cuidado principal é não criar blocos que sobreponham redes locais, VPNs, outras contas ou outras regiões.</p>\n<p>Outro detalhe importante: provedores de cloud podem reservar endereços dentro de cada subnet. Portanto, o número de hosts realmente disponíveis pode ser menor que a regra tradicional. Uma subnet muito pequena pode ficar sem espaço para load balancer, endpoints, nós de cluster, appliances, gateways ou crescimento automático.</p>\n<div class=\"callout callout--warning\"><strong>Boa prática em cloud:</strong> não dimensione subnets no limite. Considere reservas do provedor, autoscaling, endpoints privados, crescimento regional, peering e integração híbrida.</div>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n\n<p>Em DevSecOps, prefixos comuns aparecem em Terraform, Ansible, Helm charts, manifestos de CNI, pipelines de validação e políticas de firewall como código. Um erro de CIDR em um pull request pode liberar acesso demais, quebrar deploy, gerar sobreposição com VPN ou impedir que workloads conversem.</p>\n<p>Um pipeline maduro pode validar se uma nova subnet cloud não sobrepõe blocos existentes, se uma regra de firewall não usa <code>0.0.0.0/0</code> indevidamente, se um CIDR está documentado no IPAM e se o prefixo suporta a capacidade esperada.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n\n<p>Segurança em IPv4 depende muito de prefixos bem escolhidos. Uma allowlist <code>/32</code> libera exatamente um host. Uma allowlist <code>/24</code> libera até 256 endereços totais. Uma regra <code>10.0.0.0/8</code> pode liberar milhões de endereços privados. A diferença de risco é enorme.</p>\n<table class=\"risk-table\"><thead><tr><th>Cenário</th><th>Escolha perigosa</th><th>Melhor abordagem</th><th>Controle complementar</th></tr></thead><tbody>\n<tr><td>Acesso administrativo</td><td>Liberar <code>10.0.0.0/8</code></td><td>Liberar bastion <code>/32</code> ou subnet de gestão pequena</td><td>MFA, VPN, logs, PAM</td></tr>\n<tr><td>DMZ</td><td>Usar <code>/24</code> sem necessidade</td><td>Usar <code>/28</code> ou prefixo calculado</td><td>Firewall e WAF</td></tr>\n<tr><td>Cloud SG/NSG</td><td><code>0.0.0.0/0</code> em porta sensível</td><td>CIDR mínimo necessário</td><td>Revisão por IaC e alerta</td></tr>\n<tr><td>VPN site-to-site</td><td>Blocos sobrepostos</td><td>Plano global de endereçamento</td><td>IPAM e change management</td></tr>\n</tbody></table>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n\n<svg class=\"lesson-svg\" viewBox=\"0 0 960 430\" role=\"img\" aria-labelledby=\"m05l05-title m05l05-desc\">\n<title id=\"m05l05-title\">Prefixos IPv4 comuns de /24 a /32</title>\n<desc id=\"m05l05-desc\">Diagrama comparando prefixos comuns, capacidade e usos típicos em LAN, DMZ, links ponto a ponto e regras específicas.</desc>\n<defs><marker id=\"m05l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"35\" y=\"35\" width=\"890\" height=\"355\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"60\" y=\"70\" class=\"svg-label\">Quanto maior o prefixo, menor o bloco</text>\n<g class=\"svg-node svg-node--client\"><rect x=\"70\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"96\" y=\"137\" class=\"svg-label\">/24</text><text x=\"92\" y=\"164\" class=\"svg-label--small\">254 hosts</text><text x=\"92\" y=\"187\" class=\"svg-label--small\">LAN comum</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"245\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"271\" y=\"137\" class=\"svg-label\">/26</text><text x=\"267\" y=\"164\" class=\"svg-label--small\">62 hosts</text><text x=\"267\" y=\"187\" class=\"svg-label--small\">segmento</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"420\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"446\" y=\"137\" class=\"svg-label\">/28</text><text x=\"442\" y=\"164\" class=\"svg-label--small\">14 hosts</text><text x=\"442\" y=\"187\" class=\"svg-label--small\">DMZ pequena</text></g>\n<g class=\"svg-node svg-node--router\"><rect x=\"595\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"621\" y=\"137\" class=\"svg-label\">/30 ou /31</text><text x=\"617\" y=\"164\" class=\"svg-label--small\">enlace</text><text x=\"617\" y=\"187\" class=\"svg-label--small\">ponto a ponto</text></g>\n<g class=\"svg-node svg-node--security\"><rect x=\"770\" y=\"105\" width=\"120\" height=\"92\" rx=\"14\"></rect><text x=\"795\" y=\"137\" class=\"svg-label\">/32</text><text x=\"790\" y=\"164\" class=\"svg-label--small\">1 host</text><text x=\"790\" y=\"187\" class=\"svg-label--small\">rota/allowlist</text></g>\n<line x1=\"220\" y1=\"151\" x2=\"245\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<line x1=\"395\" y1=\"151\" x2=\"420\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<line x1=\"570\" y1=\"151\" x2=\"595\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<line x1=\"745\" y1=\"151\" x2=\"770\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"85\" y=\"245\" width=\"790\" height=\"82\" rx=\"14\"></rect><text x=\"110\" y=\"278\" class=\"svg-label\">Escolha de prefixo = capacidade + crescimento + segurança + rotas + documentação</text><text x=\"110\" y=\"306\" class=\"svg-label--small\">Nunca escolha CIDR apenas porque é fácil de lembrar. Valide função, hosts, reservas, cloud, VPN, firewall e IPAM.</text></g>\n</svg>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Prática equivalente</h2>\n<p><strong>Aula 5.5 convertida para prática equivalente</strong></p>\n<p>O conteúdo desta aula é melhor fixado por cálculo guiado, diagnóstico, matriz ou desafio curto. O laboratório independente foi removido para evitar atividade artificial e concentrar a execução pesada nos quatro labs integradores do M05.</p>\n<div class=\"callout callout--mentor\"><strong>Política v2.0:</strong> esta aula não mantém laboratório independente. A fixação acontece por exercícios, desafio, solução comentada e pelos quatro labs integradores do M05.</div>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam a leitura rápida de prefixos, máscaras, hosts úteis e usos típicos de <code>/24</code> a <code>/32</code>.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio pede que você revise um plano de endereçamento com prefixos inadequados e proponha uma versão mais segura, econômica e auditável.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como justificar cada prefixo sem depender de decoração cega.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Você aprendeu que prefixos comuns são ferramentas de desenho e operação. <code>/24</code> é confortável para LANs, <code>/26</code> e <code>/27</code> ajudam em segmentações menores, <code>/28</code> e <code>/29</code> aparecem em DMZs e appliances, <code>/30</code> e <code>/31</code> são usados em ponto a ponto, e <code>/32</code> representa um único endereço. A escolha correta depende de função, capacidade, crescimento, segurança, cloud, rotas e documentação.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você vai estudar <strong>VLSM: sub-redes de tamanhos diferentes</strong>. Em vez de dividir tudo em blocos iguais, você aprenderá a entregar o tamanho certo para cada departamento, serviço ou segmento.</p>\n</section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula consolida os prefixos IPv4 mais usados antes de entrar em VLSM e planejamento corporativo.",
    "previousConcepts": [
      "CIDR",
      "máscara",
      "bits de host",
      "rede",
      "broadcast",
      "bloco mágico",
      "hosts úteis"
    ],
    "nextConcepts": [
      "VLSM",
      "endereçamento corporativo",
      "IPAM",
      "Packet Tracer",
      "subnetting para cloud e segurança"
    ],
    "realWorldUseCases": [
      "dimensionar VLANs",
      "criar subnets cloud",
      "revisar firewall",
      "planejar DMZ",
      "definir enlaces ponto a ponto",
      "criar allowlists específicas",
      "auditar VPN e rotas"
    ]
  },
  "protocolFields": [
    {
      "field": "Prefixo CIDR",
      "meaning": "Quantidade de bits de rede no endereço IPv4.",
      "example": "/27"
    },
    {
      "field": "Máscara decimal",
      "meaning": "Representação decimal do prefixo.",
      "example": "255.255.255.224"
    },
    {
      "field": "Bits de host",
      "meaning": "Quantidade de bits restantes para endereços dentro da rede.",
      "example": "5 bits em /27"
    },
    {
      "field": "Endereços totais",
      "meaning": "Quantidade total de endereços no bloco.",
      "example": "32 em /27"
    },
    {
      "field": "Hosts úteis tradicionais",
      "meaning": "Total menos rede e broadcast em redes comuns.",
      "example": "30 em /27"
    },
    {
      "field": "Uso típico",
      "meaning": "Função operacional mais comum para aquele prefixo.",
      "example": "/32 para host específico"
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Levantar requisito",
      "description": "Identificar quantos hosts, gateways, reservas, appliances e crescimento são esperados."
    },
    {
      "step": 2,
      "title": "Escolher prefixo candidato",
      "description": "Comparar /24 a /32 com capacidade e função do segmento."
    },
    {
      "step": 3,
      "title": "Validar segurança",
      "description": "Verificar se o bloco está amplo demais para firewall, DMZ, VPN ou allowlist."
    },
    {
      "step": 4,
      "title": "Validar operação",
      "description": "Checar DHCP, gateway, reservas, IPAM, monitoramento e documentação."
    },
    {
      "step": 5,
      "title": "Validar cloud/híbrido",
      "description": "Checar reservas do provedor, sobreposição, peering, VPN e crescimento."
    },
    {
      "step": 6,
      "title": "Documentar decisão",
      "description": "Registrar prefixo, motivo, capacidade, uso, dono, ambiente e política associada."
    }
  ],
  "deepDive": {
    "title": "Como escolher prefixo sem cair em decoração cega",
    "points": [
      "Comece pelo requisito de hosts reais, não pelo prefixo que você gosta.",
      "Adicione margem de crescimento, mas não use margem como desculpa para blocos enormes.",
      "Separe função de segurança: usuário, servidor, DMZ, gestão, IoT, convidado e laboratório não devem cair no mesmo domínio por conveniência.",
      "Em cloud, considere reservas automáticas e crescimento de recursos gerenciados.",
      "Em firewall, escolha o menor CIDR que representa a necessidade real.",
      "Em VLSM, aloque primeiro as maiores redes e depois as menores para evitar fragmentação."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Usar /24 para tudo.",
      "impact": "Desperdício, rede plana e políticas amplas.",
      "fix": "Escolher prefixo conforme função, capacidade e segurança."
    },
    {
      "mistake": "Confundir /32 com uma pequena rede comum.",
      "impact": "Erro em gateway, DHCP e troubleshooting.",
      "fix": "Tratar /32 como host/rota específica, não como LAN de usuários."
    },
    {
      "mistake": "Aplicar hosts úteis tradicionais em /31 sem contexto.",
      "impact": "Achar que /31 não serve para nada.",
      "fix": "Entender que /31 é caso especial para ponto a ponto quando suportado."
    },
    {
      "mistake": "Dimensionar cloud subnet no limite.",
      "impact": "Falta de IP para recursos gerenciados ou autoscaling.",
      "fix": "Considerar reservas do provedor e crescimento."
    },
    {
      "mistake": "Liberar CIDR amplo em firewall por conveniência.",
      "impact": "Aumento da superfície de ataque.",
      "fix": "Usar menor privilégio, revisão e automação de política."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "DHCP esgota endereços em uma VLAN",
      "Firewall libera mais hosts que o esperado",
      "Subnet cloud fica sem IP durante autoscaling",
      "VPN não sobe por sobreposição de CIDR",
      "Rota específica /32 resolve um host mas não uma rede inteira"
    ],
    "method": [
      "Coletar requisito de hosts e crescimento",
      "Identificar prefixo atual",
      "Calcular capacidade total e útil",
      "Comparar com reservas, gateways e DHCP",
      "Verificar regras de firewall e rotas",
      "Checar sobreposição com cloud/VPN",
      "Registrar proposta corrigida no IPAM"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print",
        "purpose": "Ver IP, máscara, gateway e rotas locais."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver prefixo da interface e rotas."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief && show running-config | include ip address",
        "purpose": "Ver endereços e máscaras configurados."
      },
      {
        "platform": "Linux opcional",
        "command": "ipcalc 192.168.10.0/27",
        "purpose": "Validar rede, broadcast e hosts com ferramenta auxiliar."
      },
      {
        "platform": "Cloud/IaC",
        "command": "terraform plan",
        "purpose": "Revisar mudanças de CIDR antes de aplicar."
      }
    ],
    "evidenceToCollect": [
      "CIDR atual",
      "máscara",
      "uso do segmento",
      "número de hosts",
      "reservas",
      "gateway",
      "pool DHCP",
      "regras de firewall",
      "rotas",
      "sobreposições conhecidas"
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Liberar blocos amplos para evitar chamados",
      "Tratar IP privado como sinônimo de seguro",
      "Criar subnets cloud pequenas demais",
      "Misturar redes de convidados com redes internas",
      "Deixar exceções /32 sem dono e validade"
    ],
    "vulnerabilities": [
      {
        "name": "exposição excessiva por CIDR amplo",
        "description": "Risco relacionado à aula 5.5 — Prefixos comuns na prática: /24 a /32.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "segmentação"
      },
      {
        "name": "movimento lateral em rede plana",
        "description": "Risco relacionado à aula 5.5 — Prefixos comuns na prática: /24 a /32.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "firewall por função"
      },
      {
        "name": "sobreposição que força NAT de emergência",
        "description": "Risco relacionado à aula 5.5 — Prefixos comuns na prática: /24 a /32.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAC"
      },
      {
        "name": "regras órfãs de firewall",
        "description": "Risco relacionado à aula 5.5 — Prefixos comuns na prática: /24 a /32.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM"
      },
      {
        "name": "falta de rastreabilidade em IPAM",
        "description": "Risco relacionado à aula 5.5 — Prefixos comuns na prática: /24 a /32.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "revisão de IaC"
      }
    ],
    "mitigations": [
      "segmentação",
      "firewall por função",
      "NAC",
      "IPAM",
      "revisão de IaC",
      "logs",
      "SIEM",
      "expiração de exceções",
      "bastion e PAM para administração"
    ],
    "goodPractices": [
      "Usar menor CIDR possível em allowlists",
      "Separar gestão, usuários, servidores, IoT e convidados",
      "Documentar dono e finalidade de cada prefixo",
      "Validar sobreposição antes de VPN ou peering",
      "Revisar regras amplas como /16, /8 e 0.0.0.0/0",
      "Automatizar validação de CIDR em IaC"
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
      "segmentação",
      "firewall por função",
      "NAC",
      "IPAM",
      "revisão de IaC",
      "logs",
      "SIEM",
      "expiração de exceções",
      "bastion e PAM para administração"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    {
      "question": "Por que /24 é comum, mas nem sempre é a melhor escolha?",
      "expectedAnswer": "Porque é simples e oferece 254 hosts úteis tradicionais, mas pode ser amplo demais para segurança, broadcast e organização."
    },
    {
      "question": "Quando /32 é útil?",
      "expectedAnswer": "Quando se quer representar um único host, rota específica, loopback ou allowlist muito restritiva."
    },
    {
      "question": "Por que /31 não segue a fórmula tradicional de hosts úteis?",
      "expectedAnswer": "Porque pode ser usado como caso especial em enlaces ponto a ponto, onde os dois endereços representam endpoints."
    }
  ],
  "quiz": [
    {
      "id": "q5-5-1",
      "question": "Quantos hosts úteis tradicionais existem em um /24?",
      "options": [
        "256",
        "255",
        "254",
        "128"
      ],
      "answer": "254",
      "explanation": "/24 tem 8 bits de host, 256 endereços totais e, na regra tradicional, 254 hosts úteis."
    },
    {
      "id": "q5-5-2",
      "question": "Qual prefixo representa exatamente um endereço IPv4?",
      "options": [
        "/30",
        "/31",
        "/32",
        "/29"
      ],
      "answer": "/32",
      "explanation": "/32 fixa todos os 32 bits e representa um único endereço."
    },
    {
      "id": "q5-5-3",
      "question": "Qual prefixo é clássico para enlaces ponto a ponto com dois hosts úteis tradicionais?",
      "options": [
        "/24",
        "/28",
        "/30",
        "/32"
      ],
      "answer": "/30",
      "explanation": "/30 tem 4 endereços totais e 2 hosts úteis tradicionais."
    },
    {
      "id": "q5-5-4",
      "question": "Qual é um risco de liberar 10.0.0.0/8 em firewall?",
      "options": [
        "Bloquear hosts demais",
        "Permitir um bloco privado enorme",
        "Representar apenas um host",
        "Eliminar necessidade de logs"
      ],
      "answer": "Permitir um bloco privado enorme",
      "explanation": "10.0.0.0/8 cobre milhões de endereços privados e normalmente é amplo demais."
    },
    {
      "id": "q5-5-5",
      "question": "Qual prefixo costuma ser razoável para uma pequena DMZ com poucos serviços, dependendo do crescimento?",
      "options": [
        "/8",
        "/28",
        "/32",
        "/1"
      ],
      "answer": "/28",
      "explanation": "/28 oferece 16 endereços totais e 14 hosts úteis tradicionais, comum em pequenos segmentos controlados."
    },
    {
      "id": "q5-5-6",
      "question": "Em cloud, por que não dimensionar subnets exatamente no limite?",
      "options": [
        "Porque CIDR não funciona em cloud",
        "Porque provedores podem reservar IPs e workloads podem crescer",
        "Porque /32 sempre é obrigatório",
        "Porque gateway não existe em cloud"
      ],
      "answer": "Porque provedores podem reservar IPs e workloads podem crescer",
      "explanation": "Cloud costuma ter reservas internas e crescimento dinâmico, então é preciso margem."
    }
  ],
  "flashcards": [
    {
      "front": "/24",
      "back": "Máscara 255.255.255.0, 256 endereços totais, 254 hosts úteis tradicionais; comum em LAN/VLAN."
    },
    {
      "front": "/26",
      "back": "64 endereços totais, 62 hosts úteis tradicionais; útil para segmentos menores."
    },
    {
      "front": "/28",
      "back": "16 endereços totais, 14 hosts úteis tradicionais; comum em DMZ pequena ou gestão."
    },
    {
      "front": "/30",
      "back": "4 endereços totais, 2 hosts úteis tradicionais; clássico para ponto a ponto."
    },
    {
      "front": "/31",
      "back": "2 endereços; caso especial para ponto a ponto quando suportado."
    },
    {
      "front": "/32",
      "back": "Um único endereço; usado em rota específica, loopback ou allowlist."
    }
  ],
  "exercises": [
    {
      "id": "ex5-5-1",
      "prompt": "Complete a tabela: /24, /25, /26, /27, /28, /29, /30, /31 e /32 com máscara e capacidade.",
      "expectedAnswer": "Tabela coerente com máscaras e totais de endereços."
    },
    {
      "id": "ex5-5-2",
      "prompt": "Escolha um prefixo para 50 hosts com margem moderada e justifique.",
      "expectedAnswer": "/26 pode atender 62 hosts úteis tradicionais; /25 pode ser escolhido se a margem for maior."
    },
    {
      "id": "ex5-5-3",
      "prompt": "Explique por que /32 é adequado para uma allowlist de bastion.",
      "expectedAnswer": "Porque libera exatamente um endereço, seguindo menor privilégio."
    },
    {
      "id": "ex5-5-4",
      "prompt": "Compare /30 e /31 para enlace ponto a ponto.",
      "expectedAnswer": "/30 é clássico e compatível; /31 economiza endereços quando ambos os lados suportam."
    },
    {
      "id": "ex5.5.v2-final-pratica-equivalente",
      "type": "prático",
      "prompt": "Produza uma evidência curta do aprendizado desta aula: cálculo, tabela, matriz de decisão, desenho lógico ou explicação de troubleshooting relacionada ao tema.",
      "expectedAnswer": "A resposta deve conter artefato verificável, como tabela de sub-redes, cálculo de bloco, matriz de requisitos, justificativa de prefixo ou diagnóstico de erro comum.",
      "explanation": "Na versão v2.0, esta aula usa prática equivalente no lugar de laboratório independente para evitar laboratório genérico e concentrar execução nos labs integradores do módulo."
    }
  ],
  "challenge": {
    "title": "Revisar prefixos de uma empresa pequena",
    "scenario": "Uma empresa propôs /24 para DMZ com 5 servidores, /29 para Wi-Fi de 80 visitantes, /16 para acesso administrativo e /32 para cada servidor de aplicação em regras específicas. Revise o plano.",
    "tasks": [
      "Identificar escolhas inadequadas",
      "Propor prefixos melhores",
      "Justificar capacidade e segurança",
      "Sugerir controles complementares",
      "Registrar riscos residuais"
    ],
    "deliverables": [
      "Tabela revisada",
      "Justificativa por segmento",
      "Riscos",
      "Mitigações",
      "Observações de cloud/VPN"
    ],
    "rubric": [
      "Capacidade correta",
      "Menor privilégio",
      "Clareza de justificativa",
      "Consideração de crescimento",
      "Consistência com IPAM e firewall"
    ],
    "expectedDeliverables": [
      "Evidência prática equivalente em vez de lab independente"
    ]
  },
  "commentedSolution": {
    "summary": "A DMZ com 5 servidores provavelmente não precisa de /24; /28 pode ser suficiente com margem. Wi-Fi com 80 visitantes não cabe em /29; /25 ou /24 pode ser necessário conforme crescimento. Acesso administrativo via /16 é amplo demais; bastion /32 ou subnet pequena de gestão é melhor. Regras /32 para servidores podem ser boas, desde que documentadas e automatizadas.",
    "steps": [
      "Calcule a capacidade real de cada prefixo.",
      "Compare hosts atuais e crescimento esperado.",
      "Avalie se o prefixo amplia superfície de ataque.",
      "Use /32 para hosts específicos quando o requisito for exatamente um host.",
      "Use segmentos menores para DMZ e gestão, com margem documentada.",
      "Registre o plano no IPAM e vincule regras de firewall a donos e validade."
    ],
    "finalAnswer": "O plano corrigido deve trocar o /29 do Wi-Fi por um bloco maior, reduzir o /24 da DMZ se não houver crescimento que justifique, substituir o /16 administrativo por acesso via bastion ou subnet de gestão restrita e manter /32 apenas com documentação e expiração quando for exceção."
  },
  "glossary": [
    {
      "term": "/24",
      "definition": "Prefixo IPv4 com 8 bits de host, comum em LANs e VLANs."
    },
    {
      "term": "/30",
      "definition": "Prefixo com 4 endereços totais e 2 hosts úteis tradicionais, comum em ponto a ponto clássico."
    },
    {
      "term": "/31",
      "definition": "Prefixo especial com 2 endereços usado em ponto a ponto quando suportado."
    },
    {
      "term": "/32",
      "definition": "Prefixo que representa exatamente um endereço IPv4."
    },
    {
      "term": "Allowlist",
      "definition": "Lista de origens permitidas, frequentemente expressa por IP ou CIDR."
    },
    {
      "term": "Menor privilégio",
      "definition": "Princípio de conceder apenas o acesso estritamente necessário."
    }
  ],
  "references": [
    {
      "title": "RFC 4632 — Classless Inter-domain Routing",
      "type": "standard",
      "note": "Base conceitual de CIDR."
    },
    {
      "title": "RFC 3021 — Using 31-Bit Prefixes on IPv4 Point-to-Point Links",
      "type": "standard",
      "note": "Referência sobre uso de /31 em enlaces ponto a ponto."
    },
    {
      "title": "Cisco — IP Addressing and Subnetting for New Users",
      "type": "vendor-doc",
      "note": "Referência operacional sobre subnetting IPv4."
    },
    {
      "title": "Documentação de VPC/VNet do provedor cloud usado no laboratório",
      "type": "cloud-doc",
      "note": "Validar reservas e limitações específicas do provedor."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud networking",
      "reason": "Subnets cloud e IaC usam CIDR diretamente."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso administrativo",
      "reason": "Allowlists e bastions dependem de prefixos bem definidos."
    }
  ],
  "progressRules": {
    "markCompleteWhen": [
      "contentRead",
      "labReviewed",
      "quizPassed",
      "challengeSubmitted"
    ],
    "minimumQuizScore": 70,
    "requiredInteractions": [
      "diagramViewed",
      "flashcardsReviewed",
      "mentorQuestionsAnswered"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "practicalExerciseDone",
        "exerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.6"
    ]
  }
};
