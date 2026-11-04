export const lesson0505 = {
  "id": "5.5",
  "moduleId": "m05",
  "order": 5,
  "title": "Prefixos comuns na prática: /24 a /32",
  "subtitle": "Como escolher, interpretar e auditar os prefixos IPv4 mais usados, de LANs /24 até hosts /32 e enlaces /31.",
  "duration": "75-110 min",
  "estimatedStudyTimeMinutes": 110,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n\n<p>Na prática, poucos prefixos aparecem o tempo todo: <code>/24</code> em VLANs de usuários, <code>/28</code> em DMZs pequenas, <code>/30</code> ou <code>/31</code> em enlaces entre roteadores e <code>/32</code> em rotas e regras de firewall para um único host. Reconhecer esses tamanhos de cabeça acelera desenho, troubleshooting e revisão de firewall.</p>\n<p>Decorar sem entender, porém, gera decisões ruins. Um <code>/24</code> confortável demais vira rede plana e desperdiça endereços. Um <code>/29</code> econômico não comporta o crescimento. Um <code>/32</code> é perfeito para liberar um host no firewall, mas não serve como rede de usuários. Por isso, cada prefixo precisa vir ligado à capacidade, ao uso típico, às exceções e ao risco.</p>\n\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n\n<p>O <code>/24</code> virou padrão porque é fácil de ler: a máscara termina no terceiro octeto e o último octeto vai de 0 a 255, com 254 hosts úteis. Quando as redes passaram a ser segmentadas por função e por segurança, e a se conectar com cloud e VPN, o \"<code>/24</code> para tudo\" deixou de servir.</p>\n<p>O problema operacional não é calcular um prefixo, e sim escolher o prefixo errado para o cenário. O erro aparece meses depois: falta de IP, DHCP esgotado, sobreposição de VPN, firewall amplo demais, subnet cloud sem espaço ou visitantes misturados com a rede interna.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Escolha ruim</th><th>Por que parece boa</th><th>Problema real</th><th>Consequência</th></tr></thead><tbody>\n<tr><td><code>/24</code> para tudo</td><td>Fácil de ler e configurar</td><td>Redes grandes demais</td><td>Mais broadcast, menor isolamento e desperdício</td></tr>\n<tr><td><code>/29</code> no limite</td><td>Parece econômico</td><td>Não sobra espaço para crescimento</td><td>Mudança emergencial de endereçamento</td></tr>\n<tr><td><code>/16</code> em allowlist</td><td>Evita chamados futuros</td><td>Libera 65.536 endereços sem necessidade</td><td>Violação de menor privilégio</td></tr>\n<tr><td><code>/32</code> sem documentação</td><td>Muito específico</td><td>Vira exceção invisível</td><td>Firewall difícil de auditar</td></tr>\n<tr><td><code>/32</code> usado como rede de usuários</td><td>Parece \"uma rede bem pequena\"</td><td>Só existe o próprio endereço: sem gateway nem DHCP</td><td>Erro de gateway, DHCP e troubleshooting</td></tr>\n<tr><td><code>/30</code> usado cegamente</td><td>Tradicional para ponto a ponto</td><td>Desperdiça endereços onde <code>/31</code> é suportado</td><td>Plano menos eficiente</td></tr>\n</tbody></table></div>\n\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n\n<p>Um <strong>prefixo comum</strong> é um tamanho de rede que se repete porque resolve um problema recorrente. Ele não é obrigatório: é um ponto de partida para desenho e troubleshooting.</p>\n<div class=\"definition-box\"><strong>Regra base:</strong> quanto maior o número do prefixo, mais bits de rede existem e menos endereços restam para hosts. Cada bit a mais divide o bloco ao meio.</div>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Prefixo</th><th>Máscara</th><th>Bits de host</th><th>Endereços totais</th><th>Hosts úteis tradicionais</th><th>Uso típico</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td><code>255.255.255.0</code></td><td>8</td><td><code>2^8</code> = 256</td><td>254</td><td>LAN/VLAN comum</td></tr>\n<tr><td><code>/25</code></td><td><code>255.255.255.128</code></td><td>7</td><td><code>2^7</code> = 128</td><td>126</td><td>VLAN média</td></tr>\n<tr><td><code>/26</code></td><td><code>255.255.255.192</code></td><td>6</td><td><code>2^6</code> = 64</td><td>62</td><td>Departamento, laboratório, Wi-Fi segmentado</td></tr>\n<tr><td><code>/27</code></td><td><code>255.255.255.224</code></td><td>5</td><td><code>2^5</code> = 32</td><td>30</td><td>Servidores, infraestrutura, pequena DMZ</td></tr>\n<tr><td><code>/28</code></td><td><code>255.255.255.240</code></td><td>4</td><td><code>2^4</code> = 16</td><td>14</td><td>DMZ pequena, rede de gerenciamento</td></tr>\n<tr><td><code>/29</code></td><td><code>255.255.255.248</code></td><td>3</td><td><code>2^3</code> = 8</td><td>6</td><td>Pequeno bloco de appliances</td></tr>\n<tr><td><code>/30</code></td><td><code>255.255.255.252</code></td><td>2</td><td><code>2^2</code> = 4</td><td>2</td><td>Enlace ponto a ponto clássico</td></tr>\n<tr><td><code>/31</code></td><td><code>255.255.255.254</code></td><td>1</td><td><code>2^1</code> = 2</td><td>2, só em enlace ponto a ponto (caso especial)</td><td>Enlace ponto a ponto moderno, quando os dois lados suportam</td></tr>\n<tr><td><code>/32</code></td><td><code>255.255.255.255</code></td><td>0</td><td><code>2^0</code> = 1</td><td>1, o próprio host</td><td>Host específico, loopback, rota, allowlist</td></tr>\n</tbody></table></div>\n\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n\n<p>Todos os prefixos de <code>/24</code> a <code>/32</code> são divisões dos 32 bits do IPv4: bits de host = 32 − prefixo, e endereços totais = <code>2^bits_de_host</code>. Em <code>/24</code> sobram 8 bits de host; em <code>/32</code>, nenhum. Como cada passo divide o bloco ao meio, um <code>/24</code> contém dois <code>/25</code>, quatro <code>/26</code>, oito <code>/27</code> e dezesseis <code>/28</code>.</p>\n<p>A regra tradicional <code>hosts úteis = 2^bits_de_host - 2</code> desconta o endereço de rede (o primeiro) e o broadcast (o último). Há duas exceções operacionais:</p>\n<ul>\n<li><strong><code>/31</code>:</strong> a fórmula daria 2 − 2 = 0, e quem a aplica sem contexto acha que o prefixo não serve. Num enlace ponto a ponto não há outros hosts para receber broadcast, e a RFC 3021 permite usar os dois endereços, um por ponta, se os dois equipamentos suportarem.</li>\n<li><strong><code>/32</code>:</strong> fixa os 32 bits e representa um único endereço. Não é rede de usuários (não tem gateway nem faixa de DHCP): serve para loopbacks, rotas para um host e regras de firewall.</li>\n</ul>\n\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>Arquitetura</h2>\n\n<p>O prefixo define o tamanho do domínio IPv4 do segmento; a VLAN separa a Camada 2; o gateway liga o segmento às outras redes; o firewall decide que tráfego passa entre eles. Quando uma regra usa o CIDR do segmento, todos os hosts do bloco herdam a mesma permissão, então o tamanho do prefixo também é uma decisão de segurança.</p>\n<h3>Como escolher um prefixo</h3>\n<ol>\n<li><strong>Levante o requisito:</strong> hosts atuais + IPs reservados (gateway, appliances, DHCP, provedor cloud) + crescimento esperado.</li>\n<li><strong>Escolha o menor bloco que comporta esse total com folga</strong>, sem usar a margem como desculpa para um bloco enorme.</li>\n<li><strong>Separe por função de segurança:</strong> usuários, servidores, DMZ, gestão, IoT, convidados e laboratório não dividem prefixo por conveniência.</li>\n<li><strong>Em cloud ou rede híbrida,</strong> confira sobreposição com outras VPCs/VNets, sites, VPNs e peerings.</li>\n<li><strong>Documente no IPAM:</strong> prefixo, finalidade, capacidade, dono, ambiente e política associada.</li>\n</ol>\n\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n\n<p>Imagine que você administra um prédio corporativo. Um <code>/24</code> é como reservar um andar inteiro para uma equipe: confortável, mas talvez com espaço sobrando. Um <code>/28</code> é como reservar uma sala pequena para um time específico: eficiente, desde que caiba o crescimento esperado. Um <code>/32</code> é como liberar acesso a uma única mesa.</p>\n<p>Limite da analogia: em rede, o tamanho do bloco também define quem recebe broadcast e até onde uma regra de firewall alcança.</p>\n\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n\n<p>Em casa, seu roteador provavelmente usa algo como <code>192.168.1.0/24</code>: <code>192.168.1.1</code> para o gateway, <code>192.168.1.10</code> para o notebook, <code>192.168.1.20</code> para o celular e assim por diante.</p>\n<p>Para uma casa, <code>/24</code> é simples e sobra muito espaço. Numa empresa com visitantes, impressoras, câmeras, servidores, notebooks pessoais e dispositivos de laboratório, colocar tudo num único <code>/24</code> até funciona, mas deixa todos no mesmo domínio, sem nenhum ponto de controle entre eles.</p>\n\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n\n<p>Uma empresa pode usar prefixos diferentes por função:</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Segmento</th><th>Prefixo</th><th>Motivo</th><th>Política esperada</th></tr></thead><tbody>\n<tr><td>Usuários do administrativo</td><td><code>10.10.10.0/24</code></td><td>Muitos notebooks e crescimento</td><td>Acesso controlado a serviços internos</td></tr>\n<tr><td>Servidores internos</td><td><code>10.10.20.0/26</code></td><td>Menos hosts, maior controle</td><td>Firewall restritivo</td></tr>\n<tr><td>DMZ</td><td><code>10.10.30.0/28</code></td><td>Poucos serviços expostos</td><td>Permitir apenas portas necessárias</td></tr>\n<tr><td>Gerenciamento</td><td><code>10.10.40.0/28</code></td><td>Switches, firewalls, controladoras</td><td>Acesso apenas por bastion/VPN</td></tr>\n<tr><td>Links entre roteadores</td><td><code>10.10.255.0/30</code></td><td>Dois endpoints por enlace</td><td>Roteamento e monitoramento</td></tr>\n</tbody></table></div>\n<p>O prefixo é parte do desenho, mas não substitui firewall, autenticação, logs nem monitoramento.</p>\n\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2>\n\n<p>Em cloud, prefixos aparecem em VPCs/VNets, subnets, route tables, security groups, NSGs, endpoints privados e clusters Kubernetes. Dois cuidados são específicos:</p>\n<ul>\n<li><strong>Reservas do provedor:</strong> AWS e Azure reservam 5 endereços em cada subnet (os quatro primeiros e o último). Numa subnet <code>/28</code> sobram 16 − 5 = 11 IPs, e não os 14 da regra tradicional. Load balancers, endpoints privados e nós de cluster também consomem IPs da subnet. Por isso <code>/30</code> não serve em subnet cloud: a AWS aceita no mínimo <code>/28</code> e o Azure, <code>/29</code>.</li>\n<li><strong>Sobreposição:</strong> o bloco da VPC/VNet não pode colidir com redes locais, VPNs, outras contas ou regiões com que ela precise conversar.</li>\n</ul>\n<div class=\"callout warning\"><strong>Boa prática em cloud:</strong> não dimensione subnets no limite. Considere as reservas do provedor, autoscaling, endpoints privados e integração híbrida.</div>\n\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>Exemplo em DevSecOps</h2>\n\n<p>Em Terraform, Ansible ou Helm, um CIDR é só uma string num pull request, e uma edição pequena muda muito: trocar a origem de uma regra de <code>10.20.8.15/32</code> para <code>10.20.0.0/16</code> faz o número de endereços permitidos passar de 1 para 65.536. Por isso, um pipeline maduro valida automaticamente se a nova subnet sobrepõe blocos existentes, se alguma regra usa <code>0.0.0.0/0</code> indevidamente, se o CIDR está registrado no IPAM e se o prefixo comporta a capacidade esperada.</p>\n\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>Exemplo em Segurança</h2>\n\n<p>Em allowlists, o prefixo é o tamanho da porta aberta. Um <code>/32</code> libera exatamente um host. Um <code>/24</code> libera 256 endereços. Uma regra com <code>10.0.0.0/8</code> libera 16.777.216 endereços privados, inclusive qualquer host interno comprometido.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Cenário</th><th>Escolha perigosa</th><th>Melhor abordagem</th><th>Controle complementar</th></tr></thead><tbody>\n<tr><td>Acesso administrativo</td><td>Liberar <code>10.0.0.0/8</code></td><td>Liberar o bastion <code>/32</code> ou uma subnet de gestão pequena</td><td>MFA, VPN, logs, PAM</td></tr>\n<tr><td>DMZ</td><td>Usar <code>/24</code> sem necessidade</td><td>Usar <code>/28</code> ou o prefixo calculado pela demanda</td><td>Firewall e WAF</td></tr>\n<tr><td>Cloud SG/NSG</td><td><code>0.0.0.0/0</code> em porta sensível</td><td>CIDR mínimo necessário</td><td>Revisão por IaC e alerta</td></tr>\n<tr><td>VPN site-to-site</td><td>Blocos sobrepostos</td><td>Plano global de endereçamento</td><td>IPAM e change management</td></tr>\n</tbody></table></div>\n\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2>\n\n<svg class=\"lesson-svg\" viewBox=\"0 0 960 430\" role=\"img\" aria-labelledby=\"m05l05-title m05l05-desc\">\n<title id=\"m05l05-title\">Prefixos IPv4 comuns de /24 a /32</title>\n<desc id=\"m05l05-desc\">Diagrama comparando prefixos comuns, capacidade e usos típicos em LAN, DMZ, links ponto a ponto e regras específicas.</desc>\n<defs><marker id=\"m05l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"35\" y=\"35\" width=\"890\" height=\"355\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"60\" y=\"70\" class=\"svg-label\">Quanto maior o prefixo, menor o bloco</text>\n<g class=\"svg-node svg-node--client\"><rect x=\"70\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"96\" y=\"137\" class=\"svg-label\">/24</text><text x=\"92\" y=\"164\" class=\"svg-label--small\">254 hosts</text><text x=\"92\" y=\"187\" class=\"svg-label--small\">LAN comum</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"245\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"271\" y=\"137\" class=\"svg-label\">/26</text><text x=\"267\" y=\"164\" class=\"svg-label--small\">62 hosts</text><text x=\"267\" y=\"187\" class=\"svg-label--small\">segmento</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"420\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"446\" y=\"137\" class=\"svg-label\">/28</text><text x=\"442\" y=\"164\" class=\"svg-label--small\">14 hosts</text><text x=\"442\" y=\"187\" class=\"svg-label--small\">DMZ pequena</text></g>\n<g class=\"svg-node svg-node--router\"><rect x=\"595\" y=\"105\" width=\"150\" height=\"92\" rx=\"14\"></rect><text x=\"621\" y=\"137\" class=\"svg-label\">/30 ou /31</text><text x=\"617\" y=\"164\" class=\"svg-label--small\">enlace</text><text x=\"617\" y=\"187\" class=\"svg-label--small\">ponto a ponto</text></g>\n<g class=\"svg-node svg-node--security\"><rect x=\"770\" y=\"105\" width=\"120\" height=\"92\" rx=\"14\"></rect><text x=\"795\" y=\"137\" class=\"svg-label\">/32</text><text x=\"790\" y=\"164\" class=\"svg-label--small\">1 host</text><text x=\"790\" y=\"187\" class=\"svg-label--small\">rota/allowlist</text></g>\n<line x1=\"220\" y1=\"151\" x2=\"245\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<line x1=\"395\" y1=\"151\" x2=\"420\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<line x1=\"570\" y1=\"151\" x2=\"595\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<line x1=\"745\" y1=\"151\" x2=\"770\" y2=\"151\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l05-arrow)\"></line>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"85\" y=\"245\" width=\"790\" height=\"82\" rx=\"14\"></rect><text x=\"110\" y=\"278\" class=\"svg-label\">Escolha de prefixo = capacidade + crescimento + segurança + rotas + documentação</text><text x=\"110\" y=\"306\" class=\"svg-label--small\">Nunca escolha CIDR apenas porque é fácil de lembrar. Valide função, hosts, reservas, cloud, VPN, firewall e IPAM.</text></g>\n</svg>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul>\n<li>Cada bit a mais no prefixo divide o bloco ao meio: <code>/24</code> = 256 endereços, <code>/25</code> = 128 … <code>/32</code> = 1.</li>\n<li>Hosts úteis = <code>2^(32 − prefixo) − 2</code>, exceto <code>/31</code> (2 usáveis em ponto a ponto, RFC 3021) e <code>/32</code> (um único host).</li>\n<li>Usos típicos: <code>/24</code>–<code>/25</code> VLANs de usuários; <code>/26</code>–<code>/27</code> departamentos e servidores; <code>/28</code>–<code>/29</code> DMZ, gestão e appliances; <code>/30</code>–<code>/31</code> enlaces; <code>/32</code> host, loopback, rota e allowlist.</li>\n<li>Escolha pelo requisito (hosts + reservas + crescimento) e depois valide segurança, sobreposição e registro no IPAM.</li>\n<li>Em firewall, use o menor CIDR que cobre a necessidade: um <code>/16</code> libera 65.536 origens; um <code>/32</code>, uma.</li>\n</ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Na próxima aula, você vai estudar <strong>VLSM: sub-redes de tamanhos diferentes</strong>. Em vez de dividir tudo em blocos iguais, você vai entregar a cada departamento, serviço ou segmento o prefixo do tamanho certo, usando os tamanhos desta aula.</p>\n</section>\n"
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
  "troubleshooting": {
    "symptoms": [
      "DHCP esgota endereços em uma VLAN",
      "Firewall libera mais hosts que o esperado",
      "Subnet cloud fica sem IP durante autoscaling",
      "VPN não sobe por sobreposição de CIDR",
      "Rota específica /32 resolve um host, mas não a rede inteira"
    ],
    "diagnosticQuestions": [
      "Quantos hosts, IPs reservados (gateway, DHCP, provedor cloud) e crescimento o segmento tem?",
      "O prefixo configurado nas interfaces é o mesmo documentado no IPAM?",
      "O CIDR da regra ou da rota cobre exatamente o necessário, nem mais nem menos?"
    ],
    "commands": [
      {
        "platform": "Windows (cmd)",
        "command": "ipconfig /all && route print",
        "purpose": "Ver IP, máscara, gateway e rotas.",
        "expectedObservation": "Máscara como 255.255.255.192.",
        "interpretation": "255.255.255.192 = /26. Máscara diferente da documentada faz o host calcular a rede errada."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver prefixo da interface e rotas.",
        "expectedObservation": "inet 10.10.20.5/26 e a rota 10.10.20.0/26 dev eth0.",
        "interpretation": "A rota conectada mostra a rede calculada a partir do prefixo."
      },
      {
        "platform": "Cisco IOS",
        "command": "show running-config | include ip address",
        "purpose": "Ver IPs e máscaras configurados (o show ip interface brief não mostra a máscara).",
        "expectedObservation": "ip address 10.10.255.1 255.255.255.252",
        "interpretation": ".252 = /30; .254 seria /31."
      },
      {
        "platform": "Linux (opcional)",
        "command": "ipcalc 192.168.10.0/27",
        "purpose": "Validar rede, broadcast e hosts.",
        "expectedObservation": "HostMin 192.168.10.1, HostMax 192.168.10.30, Broadcast 192.168.10.31, Hosts/Net 30.",
        "interpretation": "/27 = 32 endereços, 30 úteis."
      },
      {
        "platform": "Cloud/IaC",
        "command": "terraform plan",
        "purpose": "Revisar mudanças de CIDR antes de aplicar.",
        "expectedObservation": "cidr_block com o valor antigo e o novo.",
        "interpretation": "Confira se o novo CIDR não ficou amplo demais nem sobreposto."
      }
    ],
    "decisionTree": [
      {
        "if": "O DHCP esgotou e o pool ocupa quase toda a faixa útil",
        "then": "o prefixo é pequeno demais: aumente o bloco (ex.: /26 para /25) ou divida o segmento."
      },
      {
        "if": "A subnet cloud ficou sem IP antes do previsto",
        "then": "desconte as 5 reservas do provedor e os IPs de load balancers, endpoints e nós de cluster."
      },
      {
        "if": "O firewall libera origens demais",
        "then": "compare o CIDR da regra com as origens reais nos logs e reduza para /32 ou para a subnet exata."
      },
      {
        "if": "A VPN ou o peering não sobe",
        "then": "procure sobreposição entre os blocos dos dois lados; renumere ou use NAT documentado."
      },
      {
        "if": "Uma rota /32 alcança um host, mas não os vizinhos dele",
        "then": "o /32 cobre só aquele endereço; roteie o prefixo da sub-rede inteira."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Menor CIDR possível em allowlists (ex.: /32 para um bastion)",
      "Prefixos separados para gestão, usuários, servidores, IoT e convidados",
      "Dono, finalidade e validade de cada prefixo e de cada exceção /32 registrados no IPAM",
      "Checar sobreposição antes de VPN ou peering"
    ],
    "badPractices": [
      "Liberar /16 ou /8 para evitar chamados futuros",
      "Tratar IP privado como sinônimo de seguro",
      "Misturar convidados e rede interna no mesmo prefixo"
    ],
    "vulnerabilities": [
      {
        "name": "CIDR amplo demais",
        "description": "Origem /16 numa regra de SSH: 65.536 endereços onde só um precisa de acesso.",
        "defensiveExplanation": "Compare a regra com as origens que aparecem nos logs.",
        "mitigation": "Reduzir para /32 ou para a subnet de gestão."
      },
      {
        "name": "Rede plana",
        "description": "Usuários, câmeras e servidores no mesmo /24, sem firewall entre eles.",
        "defensiveExplanation": "Um host comprometido alcança todos os outros sem passar por controle.",
        "mitigation": "Prefixos por função, firewall entre segmentos e NAC."
      },
      {
        "name": "Sobreposição de blocos",
        "description": "VPC e rede local com o mesmo bloco quebram VPN e peering.",
        "defensiveExplanation": "O NAT de emergência esconde a origem real e dificulta correlacionar logs.",
        "mitigation": "Plano global no IPAM; checar sobreposição antes de criar VPC, VPN ou peering."
      },
      {
        "name": "Regras /32 órfãs",
        "description": "A exceção feita para um host desativado libera quem herdar aquele IP.",
        "defensiveExplanation": "Sem dono e validade, ninguém sabe se a regra ainda é necessária.",
        "mitigation": "Dono, expiração e revisão periódica de cada exceção."
      }
    ],
    "monitoring": [
      "Uso por regra nos logs de firewall: regra ampla usada por poucas origens deve ter o CIDR reduzido",
      "Ocupação dos pools de DHCP e das subnets cloud"
    ],
    "hardening": [
      "Validação automática de CIDR em IaC (sobreposição, 0.0.0.0/0, capacidade)",
      "Expiração automática de exceções de firewall"
    ],
    "detectionIdeas": [
      "Alertar quando uma mudança de firewall ou security group introduz origem /16, /8 ou 0.0.0.0/0"
    ]
  },
  "mentorQuestions": [
    {
      "type": "raciocínio",
      "question": "Por que /24 é comum, mas nem sempre é a melhor escolha?",
      "expectedIdeas": [
        "É simples de ler e tem 254 hosts úteis.",
        "Pode ser amplo demais: mais broadcast, menos isolamento, regras de firewall mais amplas."
      ]
    },
    {
      "type": "raciocínio",
      "question": "Quando /32 é útil, e por que ele não serve como rede de usuários?",
      "expectedIdeas": [
        "Representa um único host: loopback, rota de host, allowlist restritiva.",
        "Não sobra endereço para gateway nem para DHCP."
      ]
    },
    {
      "type": "raciocínio",
      "question": "Por que /31 não segue a fórmula tradicional de hosts úteis?",
      "expectedIdeas": [
        "A fórmula daria 2 − 2 = 0.",
        "Em ponto a ponto não há broadcast necessário: a RFC 3021 permite usar os dois endereços, se os dois lados suportarem."
      ]
    },
    {
      "type": "raciocínio",
      "question": "Uma aplicação tem 40 servidores e uma regra /32 para cada um no firewall. Quando faz sentido trocar por uma regra com o prefixo da subnet?",
      "hints": [
        "Quem mais está nessa subnet?"
      ],
      "expectedIdeas": [
        "Se a subnet só tem esses servidores, o prefixo dela dá o mesmo acesso e é mais fácil de auditar.",
        "Se tem outros hosts, o prefixo libera demais: mantenha os /32, gerados por automação e com dono."
      ]
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
      "answer": 2,
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
      "answer": 2,
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
      "answer": 2,
      "explanation": "/30 tem 4 endereços totais e 2 hosts úteis tradicionais."
    },
    {
      "id": "q5-5-4",
      "question": "Qual é um risco de liberar 10.0.0.0/8 em firewall?",
      "options": [
        "Bloquear hosts demais",
        "Permitir um bloco privado enorme",
        "Representar apenas um host",
        "Funcionar apenas para endereços públicos"
      ],
      "answer": 1,
      "explanation": "10.0.0.0/8 cobre 16.777.216 endereços privados, inclusive qualquer host interno comprometido; quase sempre é amplo demais."
    },
    {
      "id": "q5-5-5",
      "question": "Qual prefixo costuma ser razoável para uma pequena DMZ com poucos serviços, dependendo do crescimento?",
      "options": [
        "/24",
        "/28",
        "/30",
        "/32"
      ],
      "answer": 1,
      "explanation": "/28 tem 14 hosts úteis: cabe uma DMZ pequena com folga. /24 desperdiça e amplia a exposição; /30 e /32 não comportam vários servidores."
    },
    {
      "id": "q5-5-6",
      "question": "Em cloud, por que não dimensionar subnets exatamente no limite?",
      "options": [
        "Porque subnets cloud não aceitam prefixos maiores que /24",
        "Porque provedores podem reservar IPs e workloads podem crescer",
        "Porque o provedor cobra por endereço não utilizado",
        "Porque o gateway da subnet fica fora do bloco"
      ],
      "answer": 1,
      "explanation": "AWS e Azure reservam 5 endereços em cada subnet, e load balancers, endpoints e autoscaling consomem mais IPs; por isso é preciso margem."
    },
    {
      "id": "q5-5-7",
      "question": "Uma VLAN precisa de 50 hosts hoje, com crescimento moderado. Qual é o menor bloco que atende com alguma folga?",
      "options": [
        "/27",
        "/28",
        "/24",
        "/26"
      ],
      "answer": 3,
      "explanation": "/26 tem 62 hosts úteis: folga de 12. /27 (30) e /28 (14) não cabem; /24 atende, mas é muito maior que o necessário."
    },
    {
      "id": "q5-5-8",
      "question": "Num enlace ponto a ponto configurado com /31 em equipamentos compatíveis, quantos endereços podem ser atribuídos às interfaces?",
      "options": [
        "2, um para cada ponta do enlace",
        "0, porque 2^1 − 2 = 0",
        "1, porque o outro endereço é o broadcast",
        "4, como no /30"
      ],
      "answer": 0,
      "explanation": "No /31 ponto a ponto (RFC 3021) não há endereço de rede nem de broadcast separados: os dois endereços são usados, um por ponta."
    }
  ],
  "flashcards": [
    {
      "front": "/25",
      "back": "Máscara 255.255.255.128, 128 endereços, 126 hosts úteis; metade de um /24, para VLANs médias."
    },
    {
      "front": "/26",
      "back": "Máscara 255.255.255.192, 64 endereços, 62 hosts úteis; departamento, laboratório ou Wi-Fi por andar."
    },
    {
      "front": "/27",
      "back": "Máscara 255.255.255.224, 32 endereços, 30 hosts úteis; servidores e infraestrutura."
    },
    {
      "front": "/28",
      "back": "Máscara 255.255.255.240, 16 endereços, 14 hosts úteis; DMZ pequena ou gestão."
    },
    {
      "front": "/29",
      "back": "Máscara 255.255.255.248, 8 endereços, 6 hosts úteis; pequeno bloco de appliances."
    },
    {
      "front": "/31",
      "back": "2 endereços, ambos usáveis em enlace ponto a ponto (RFC 3021), se os dois lados suportarem."
    },
    {
      "front": "Fórmula de hosts úteis",
      "back": "2^(32 − prefixo) − 2 (desconta rede e broadcast); não se aplica a /31 nem a /32."
    },
    {
      "front": "Subnet /28 na AWS ou no Azure",
      "back": "16 − 5 reservados pelo provedor = 11 IPs utilizáveis, e não 14."
    }
  ],
  "exercises": [
    {
      "id": "ex5-5-1",
      "type": "cálculo",
      "prompt": "Complete a tabela de /24 a /32 com máscara, endereços totais e hosts úteis.",
      "expectedAnswer": "/24 255.255.255.0, 256/254; /25 .128, 128/126; /26 .192, 64/62; /27 .224, 32/30; /28 .240, 16/14; /29 .248, 8/6; /30 .252, 4/2; /31 .254, 2 (ambos usáveis em ponto a ponto); /32 .255, 1 (o próprio host)."
    },
    {
      "id": "ex5-5-2",
      "type": "dimensionamento",
      "prompt": "Escolha um prefixo para 50 hosts com margem moderada e justifique.",
      "expectedAnswer": "/26: 62 hosts úteis atendem 50 com folga de 12. /27 (30) não cabe. /25 (126) se a previsão de crescimento passar de 62."
    },
    {
      "id": "ex5-5-4",
      "type": "comparação",
      "prompt": "Compare /30 e /31 para enlace ponto a ponto. Quantos endereços cada opção consome em 100 enlaces?",
      "expectedAnswer": "/30: 4 endereços, 2 úteis, compatível com qualquer equipamento; 100 enlaces consomem 400 endereços. /31: 2 endereços, ambos usados (RFC 3021), exige suporte dos dois lados; 100 enlaces consomem 200."
    },
    {
      "id": "ex5-5-5",
      "type": "firewall",
      "prompt": "Uma regra permite SSH de 10.20.0.0/16 para o servidor 10.30.5.10. Só o bastion 10.20.8.15 precisa desse acesso. Reescreva origem e destino da regra e diga quantos endereços de origem deixam de ter acesso.",
      "expectedAnswer": "Origem 10.20.8.15/32, destino 10.30.5.10/32, porta 22. O /16 tinha 65.536 endereços; com o /32 fica 1, então 65.535 deixam de ter acesso. Isso é menor privilégio: a regra libera exatamente o que é necessário."
    },
    {
      "id": "ex5-5-6",
      "type": "cloud",
      "prompt": "Você criou na AWS a subnet 10.0.1.0/28 para 14 instâncias. Quantos IPs estão realmente disponíveis e o que você faria?",
      "expectedAnswer": "16 − 5 reservados pela AWS = 11 IPs: as 14 instâncias não cabem. Use /27 (32 − 5 = 27 IPs), que comporta as 14 com folga para crescimento e outros recursos."
    }
  ],
  "challenge": {
    "title": "Revisar prefixos de uma empresa pequena",
    "scenario": "Uma empresa propôs /24 para uma DMZ com 5 servidores, /29 para um Wi-Fi de 80 visitantes, /16 para acesso administrativo e /32 para cada servidor de aplicação em regras específicas. Revise o plano.",
    "tasks": [
      "Identificar escolhas inadequadas",
      "Propor prefixos melhores",
      "Justificar capacidade e segurança",
      "Sugerir controles complementares",
      "Registrar riscos residuais"
    ],
    "expectedDeliverables": [
      "Tabela revisada (segmento, prefixo atual, prefixo proposto, hosts úteis)",
      "Justificativa por segmento",
      "Riscos e mitigações",
      "Observações de cloud/VPN, se o plano for reproduzido em cloud"
    ],
    "gradingRubric": [
      "Capacidade correta",
      "Menor privilégio",
      "Clareza de justificativa",
      "Consideração de crescimento",
      "Consistência com IPAM e firewall"
    ]
  },
  "commentedSolution": {
    "reasoning": "DMZ: 5 servidores + gateway = 6 endereços; um /29 (6 úteis) fica no limite, e /28 (14) dá folga sem o desperdício do /24 (254). Wi-Fi: 80 visitantes não cabem em /29 (6) nem em /26 (62); /25 (126) é o menor bloco que atende. Administrativo: /16 libera 65.536 origens; use o /32 do bastion ou uma subnet de gestão pequena. Regras /32 por servidor seguem o menor privilégio, desde que tenham dono e validade.",
    "steps": [
      "Calcule a capacidade real de cada prefixo.",
      "Compare com hosts atuais, IPs reservados e crescimento.",
      "Avalie se o prefixo amplia a superfície de ataque.",
      "Registre o plano no IPAM e vincule as regras de firewall a donos e validade."
    ],
    "commonMistakes": [
      "Reduzir a DMZ para /29 sem contar o gateway: 6 úteis para 6 endereços necessários, sem folga.",
      "Trocar o Wi-Fi para /26: 62 hosts úteis não comportam 80 visitantes.",
      "Trocar o /16 administrativo por um /24 de usuários: continua liberando 254 origens que não precisam do acesso."
    ],
    "finalAnswer": "DMZ /28; Wi-Fi /25 (ou /24 com previsão de crescimento); acesso administrativo pelo /32 do bastion ou por uma subnet de gestão restrita; /32 dos servidores mantidos com documentação, dono e expiração."
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
    },
    {
      "term": "IPAM",
      "definition": "Gestão de endereços IP: inventário de prefixos com finalidade, capacidade, dono e uso de cada bloco."
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
      "title": "Documentação de subnets do provedor cloud (ex.: Amazon VPC User Guide e Azure Virtual Network FAQ)",
      "type": "cloud-doc",
      "note": "Confirmar as reservas de endereços e os tamanhos mínimo e máximo de subnet do provedor usado."
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
