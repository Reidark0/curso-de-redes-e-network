export const lesson0506 = {
  "id": "5.6",
  "moduleId": "m05",
  "order": 6,
  "title": "VLSM: sub-redes de tamanhos diferentes",
  "subtitle": "Como dividir um bloco IPv4 em sub-redes de tamanhos variados, alocando primeiro as maiores demandas, evitando sobreposição e criando um plano eficiente, seguro e auditável.",
  "duration": "105-145 min",
  "estimatedStudyTimeMinutes": 145,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 240,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "vlsm",
    "cidr",
    "ipam",
    "endereçamento",
    "planejamento",
    "vlan",
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
      "reason": "A aula 5.1 explicou por que subnetting existe e por que uma rede plana é ruim operacionalmente e em segurança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.2",
      "reason": "A aula 5.2 ensinou CIDR, máscara e quantidade de hosts."
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
      "reason": "A aula 5.4 ensinou o método do bloco mágico, essencial para calcular limites rapidamente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.5",
      "reason": "A aula 5.5 apresentou prefixos comuns de /24 a /32 e seus usos típicos."
    }
  ],
  "objectives": [
    "Explicar por que VLSM existe e qual limitação ele resolve em relação a sub-redes de tamanho fixo.",
    "Entender a diferença entre FLSM e VLSM.",
    "Ordenar demandas por quantidade de hosts antes de alocar blocos IPv4.",
    "Escolher o menor prefixo que atende cada segmento com margem coerente.",
    "Alocar sub-redes sem sobreposição, respeitando rede, hosts e broadcast.",
    "Documentar um plano de VLSM com função, VLAN, gateway, DHCP, reservas e política de firewall.",
    "Relacionar VLSM com IPAM, cloud, VPN, DevSecOps, segurança e troubleshooting."
  ],
  "learningOutcomes": [
    "Dado um bloco base e várias demandas, o aluno calcula sub-redes VLSM em ordem correta.",
    "Dado um plano VLSM, o aluno identifica sobreposição, desperdício e prefixos insuficientes.",
    "Dado um cenário empresarial, o aluno propõe sub-redes por função e justifica o prefixo escolhido.",
    "Dado um desenho cloud ou VPN, o aluno avalia se há risco de sobreposição de CIDR.",
    "Dado um incidente de rede, o aluno usa a documentação VLSM para acelerar diagnóstico e contenção."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Até agora, você aprendeu a calcular uma sub-rede individual: prefixo, máscara, rede, broadcast, primeiro host e último host. Isso é essencial, mas em redes reais raramente todos os departamentos têm o mesmo tamanho. Uma VLAN de usuários pode precisar de 120 hosts, a rede de servidores pode precisar de 50, a DMZ pode precisar de 14, a rede de gerenciamento pode precisar de 10 e um enlace entre roteadores pode precisar de apenas 2 endereços.</p>\n<p>Se você dividir tudo no mesmo tamanho, vai desperdiçar muitos endereços. Se escolher blocos pequenos demais, vai faltar IP. Se alocar blocos sem método, pode criar sobreposição. O VLSM existe para resolver exatamente esse problema: distribuir blocos IPv4 de tamanhos diferentes dentro de um bloco maior.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> VLSM transforma subnetting em planejamento. Você deixa de calcular uma rede isolada e passa a desenhar um espaço de endereçamento completo, eficiente, documentado e alinhado à operação.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Antes do CIDR e do VLSM, muitas redes seguiam divisões rígidas. O modelo classful separava blocos em classes e dificultava o uso eficiente do espaço IPv4. Depois, com o crescimento da Internet e das redes corporativas, ficou claro que endereços IPv4 seriam desperdiçados se todos recebessem blocos grandes demais.</p>\n<p>O CIDR permitiu representar redes com prefixos flexíveis, como <code>/26</code>, <code>/27</code> e <code>/28</code>. O VLSM levou essa flexibilidade para dentro de um bloco: em vez de dividir um <code>/24</code> em quatro redes iguais <code>/26</code>, por exemplo, você pode dividir em uma <code>/25</code>, uma <code>/26</code>, uma <code>/27</code>, uma <code>/28</code> e ainda preservar espaço para expansão.</p>\n<p>Com o tempo, VLSM virou prática essencial em redes corporativas, roteamento, WAN, laboratórios Cisco, cloud, VPNs, IPAM e desenho de ambientes segmentados por segurança.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>Imagine que você recebeu o bloco <code>192.168.10.0/24</code> e precisa atender quatro áreas: Usuários com até 100 hosts, Servidores com até 50 hosts, DMZ com até 14 hosts e Gerência com até 6 hosts. Se você dividir tudo em quatro blocos iguais <code>/26</code>, cada rede terá 62 hosts úteis. Isso atende servidores, DMZ e gerência, mas não atende usuários. Se dividir tudo em dois <code>/25</code>, atende usuários, mas desperdiça muito para segmentos pequenos.</p>\n<table class=\"data-table\"><thead><tr><th>Segmento</th><th>Demanda</th><th>Erro comum</th><th>Consequência</th></tr></thead><tbody>\n<tr><td>Usuários</td><td>100 hosts</td><td>Alocar <code>/26</code></td><td>Faltam endereços</td></tr>\n<tr><td>Servidores</td><td>50 hosts</td><td>Alocar <code>/25</code></td><td>Desperdício desnecessário</td></tr>\n<tr><td>DMZ</td><td>14 hosts</td><td>Alocar <code>/24</code></td><td>Superfície ampla e difícil de auditar</td></tr>\n<tr><td>Gerência</td><td>6 hosts</td><td>Alocar depois sem espaço contíguo</td><td>Fragmentação e retrabalho</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema central:</strong> sem VLSM, você tende a escolher blocos iguais demais, grandes demais ou pequenos demais. Em todos os casos, a rede fica menos eficiente e mais difícil de manter.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do planejamento IPv4 normalmente passa por três níveis. Primeiro vem o endereçamento simples, em que todos usam redes parecidas. Depois vem o subnetting fixo, também chamado de FLSM, em que um bloco é dividido em partes iguais. Por fim vem o VLSM, no qual cada segmento recebe um tamanho coerente com sua necessidade.</p>\n<table class=\"comparison-table\"><thead><tr><th>Modelo</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th></tr></thead><tbody>\n<tr><td>Rede plana</td><td>Um bloco grande para quase tudo</td><td>Simples no início</td><td>Péssimo para segurança, escala e operação</td></tr>\n<tr><td>FLSM</td><td>Sub-redes de mesmo tamanho</td><td>Cálculo previsível</td><td>Desperdício quando demandas variam</td></tr>\n<tr><td>VLSM</td><td>Sub-redes de tamanhos diferentes</td><td>Eficiência e precisão</td><td>Exige método, documentação e validação</td></tr>\n</tbody></table>\n<p>O VLSM não elimina a necessidade de firewall, VLANs, NAC ou monitoramento. Ele apenas permite que o plano de endereçamento represente melhor a função e o tamanho de cada segmento.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>VLSM</strong> significa <em>Variable Length Subnet Mask</em>, ou máscara de sub-rede de tamanho variável. A ideia é simples: dentro de um bloco maior, você cria sub-redes com prefixos diferentes conforme a necessidade de cada segmento.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> VLSM é a técnica de dividir um bloco IPv4 em sub-redes de tamanhos diferentes, usando prefixos diferentes, para reduzir desperdício e atender demandas variadas.</div>\n<p>O princípio mais importante é: <strong>alocar primeiro as maiores redes</strong>. Isso evita que blocos pequenos ocupem posições que depois impediriam a criação de blocos maiores.</p>\n<table class=\"data-table\"><thead><tr><th>Demanda</th><th>Prefixo candidato</th><th>Hosts úteis tradicionais</th><th>Comentário</th></tr></thead><tbody>\n<tr><td>100 hosts</td><td><code>/25</code></td><td>126</td><td>Atende com margem</td></tr>\n<tr><td>50 hosts</td><td><code>/26</code></td><td>62</td><td>Atende com margem pequena</td></tr>\n<tr><td>14 hosts</td><td><code>/28</code></td><td>14</td><td>Atende no limite tradicional</td></tr>\n<tr><td>6 hosts</td><td><code>/29</code></td><td>6</td><td>Atende no limite tradicional</td></tr>\n</tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>O VLSM não muda o funcionamento do IPv4. O pacote continua contendo IP de origem, IP de destino, TTL e demais campos. O que muda é o planejamento dos blocos e das máscaras aplicadas em interfaces, rotas, DHCP, firewalls e documentação.</p>\n<ol class=\"flow-list\">\n<li><strong>Comece pelo bloco base:</strong> por exemplo, <code>192.168.10.0/24</code>.</li>\n<li><strong>Liste as demandas:</strong> usuários, servidores, DMZ, gerência, enlaces, Wi-Fi, IoT e convidados.</li>\n<li><strong>Ordene da maior para a menor:</strong> isso reduz risco de fragmentação.</li>\n<li><strong>Escolha o menor prefixo que atende cada demanda:</strong> considerando hosts, gateway, reservas e crescimento.</li>\n<li><strong>Aloque a primeira rede no início do bloco:</strong> respeitando o tamanho do bloco.</li>\n<li><strong>Aloque a próxima rede no primeiro endereço livre alinhado:</strong> sem invadir o bloco anterior.</li>\n<li><strong>Calcule rede, primeiro host, último host e broadcast:</strong> para cada segmento.</li>\n<li><strong>Documente gateway, DHCP, reservas, VLAN e política:</strong> VLSM sem documentação vira dívida técnica.</li>\n</ol>\n<div class=\"callout\"><strong>Regra prática:</strong> VLSM é menos sobre decorar e mais sobre ordenar, alocar, validar e documentar.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura real, o VLSM fica no centro do desenho lógico. Ele conversa com VLANs, gateways, escopos DHCP, regras de firewall, rotas, NAT, VPN, cloud, IPAM e monitoramento.</p>\n<table class=\"data-table\"><thead><tr><th>Componente</th><th>Relação com VLSM</th><th>Exemplo</th></tr></thead><tbody>\n<tr><td>VLAN</td><td>Normalmente cada VLAN recebe uma sub-rede</td><td>VLAN 10 = <code>192.168.10.0/25</code></td></tr>\n<tr><td>Gateway</td><td>Deve estar dentro da sub-rede</td><td><code>192.168.10.1</code></td></tr>\n<tr><td>DHCP</td><td>Pool deve respeitar rede, broadcast, gateway e reservas</td><td><code>.20</code> a <code>.120</code></td></tr>\n<tr><td>Firewall</td><td>Políticas usam CIDR das sub-redes</td><td>Usuários <code>/25</code> para Servidores <code>/26</code></td></tr>\n<tr><td>IPAM</td><td>Registra dono, função, status e crescimento</td><td>Segmento de DMZ reservado</td></tr>\n<tr><td>Cloud/VPN</td><td>Evita sobreposição e facilita rotas</td><td>VPC, VNet, peering e túnel site-to-site</td></tr>\n</tbody></table>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em um prédio comercial com salas de tamanhos diferentes. O departamento de atendimento precisa de uma sala grande. A equipe de servidores precisa de uma sala média. A sala de equipamentos de rede é pequena. A sala de visitantes é separada por segurança. Seria ruim entregar salas idênticas para todos: algumas ficariam lotadas, outras ficariam vazias.</p>\n<p>O VLSM é como projetar a planta desse prédio: você mede a necessidade de cada área, coloca as salas maiores primeiro e reserva espaços menores depois. O objetivo não é apenas caber todo mundo, mas caber com organização, circulação, controle de acesso e espaço para manutenção.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> em redes, as divisões precisam respeitar alinhamento binário. Você não pode cortar blocos IPv4 em qualquer ponto arbitrário.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Você tem <code>192.168.10.0/24</code> e precisa atender:</p>\n<ul>\n<li>Usuários: 100 hosts;</li>\n<li>Servidores: 50 hosts;</li>\n<li>DMZ: 14 hosts;</li>\n<li>Gerência: 6 hosts.</li>\n</ul>\n<p>Ordenando do maior para o menor:</p>\n<table class=\"data-table\"><thead><tr><th>Segmento</th><th>Hosts necessários</th><th>Prefixo</th><th>Rede</th><th>Hosts utilizáveis</th><th>Broadcast</th></tr></thead><tbody>\n<tr><td>Usuários</td><td>100</td><td><code>/25</code></td><td><code>192.168.10.0</code></td><td><code>.1</code> a <code>.126</code></td><td><code>.127</code></td></tr>\n<tr><td>Servidores</td><td>50</td><td><code>/26</code></td><td><code>192.168.10.128</code></td><td><code>.129</code> a <code>.190</code></td><td><code>.191</code></td></tr>\n<tr><td>DMZ</td><td>14</td><td><code>/28</code></td><td><code>192.168.10.192</code></td><td><code>.193</code> a <code>.206</code></td><td><code>.207</code></td></tr>\n<tr><td>Gerência</td><td>6</td><td><code>/29</code></td><td><code>192.168.10.208</code></td><td><code>.209</code> a <code>.214</code></td><td><code>.215</code></td></tr>\n</tbody></table>\n<p>Depois da gerência, ainda sobra espaço de <code>192.168.10.216</code> até <code>192.168.10.255</code> para crescimento ou novas redes menores, respeitando alinhamento.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, VLSM aparece quando cada área tem tamanho e criticidade diferentes. Usuários de escritório podem receber uma rede maior. Servidores internos recebem uma rede média. Câmeras, impressoras e IoT devem ficar em segmentos separados. Administração de switches, firewalls e hypervisors deve ficar em rede de gerenciamento restrita.</p>\n<p>Um plano empresarial bom não documenta apenas a rede. Ele documenta função, dono, VLAN, gateway, DHCP, reservas, criticidade, política de firewall, logs esperados e crescimento. Isso facilita auditoria, troubleshooting e resposta a incidentes.</p>\n<div class=\"callout callout--security\"><strong>Segurança:</strong> VLSM ajuda a representar separação lógica, mas a separação real depende de VLAN, roteamento, firewall, ACL, NAC, autenticação e monitoramento.</div>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, VLSM aparece no desenho de VPCs, VNets e subnets. Você pode ter uma subnet pública pequena para load balancers, uma subnet privada maior para aplicações, uma subnet isolada para bancos e outra para ferramentas de gestão. Cada uma precisa de tamanho coerente com escalabilidade, reservas do provedor e rotas.</p>\n<p>Cloud adiciona um cuidado especial: provedores podem reservar endereços dentro de cada subnet. Portanto, uma subnet que parece suficiente no cálculo clássico pode ficar apertada na prática. Além disso, blocos sobrepostos entre cloud, datacenter e VPN podem impedir peering, rotas e integrações futuras.</p>\n<table class=\"data-table\"><thead><tr><th>Subnet cloud</th><th>Uso típico</th><th>Cuidado</th></tr></thead><tbody>\n<tr><td>Pública</td><td>Load balancer, NAT gateway, bastion</td><td>Exposição e security groups</td></tr>\n<tr><td>Privada app</td><td>Aplicações e workers</td><td>Escala horizontal</td></tr>\n<tr><td>Banco</td><td>Serviços de dados</td><td>Rotas restritas e backups</td></tr>\n<tr><td>Gestão</td><td>Ferramentas administrativas</td><td>Acesso mínimo e logs</td></tr>\n</tbody></table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, VLSM aparece em Terraform, módulos de rede, ambientes dev/hml/prod, clusters Kubernetes, runners self-hosted, subnets de build, redes de observabilidade e políticas de acesso. Um erro de CIDR em IaC pode ser replicado automaticamente para vários ambientes.</p>\n<p>Uma boa pipeline deve validar se os blocos não se sobrepõem, se o prefixo não está amplo demais para a função, se security groups não usam <code>0.0.0.0/0</code> desnecessariamente e se o plano respeita padrões corporativos.</p>\n<div class=\"callout\"><strong>Boas práticas DevSecOps:</strong> versionar o plano de endereçamento, revisar mudanças de CIDR em pull request, usar validação automática e documentar intenção, não apenas valores.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Em segurança, VLSM permite reduzir escopo de regras. Em vez de liberar um <code>/24</code> inteiro para acesso administrativo, você pode liberar uma subnet de gestão menor ou até hosts específicos com <code>/32</code>. Em vez de misturar usuários e servidores na mesma rede, você separa segmentos e aplica políticas entre eles.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Sobreposição</td><td>VPN ou cloud com CIDR igual ao datacenter</td><td>IPAM e planejamento global</td></tr>\n<tr><td>Escopo amplo</td><td>Firewall permite <code>/16</code> por comodidade</td><td>Menor privilégio por sub-rede</td></tr>\n<tr><td>Segmentação falsa</td><td>Sub-redes diferentes sem controle entre elas</td><td>Firewall, ACL e monitoramento</td></tr>\n<tr><td>Documentação ausente</td><td>Ninguém sabe quem usa cada bloco</td><td>IPAM, dono e lifecycle</td></tr>\n<tr><td>Crescimento ignorado</td><td>Subnets cloud ficam sem IP</td><td>Margem planejada e testes de escala</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m05l06-title m05l06-desc\">\n<title id=\"m05l06-title\">VLSM dividindo um /24 em sub-redes de tamanhos diferentes</title>\n<desc id=\"m05l06-desc\">Diagrama mostrando o bloco 192.168.10.0/24 dividido em uma rede /25, uma /26, uma /28, uma /29 e espaço reservado.</desc>\n<defs><marker id=\"m05l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"35\" y=\"35\" width=\"910\" height=\"430\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"60\" y=\"70\" class=\"svg-label\">Bloco base: 192.168.10.0/24</text>\n<g class=\"svg-node svg-node--client\"><rect x=\"70\" y=\"115\" width=\"390\" height=\"78\" rx=\"14\"></rect><text x=\"95\" y=\"146\" class=\"svg-label\">Usuários — /25</text><text x=\"95\" y=\"174\" class=\"svg-label--small\">192.168.10.0 - 192.168.10.127</text></g>\n<g class=\"svg-node svg-node--server\"><rect x=\"480\" y=\"115\" width=\"230\" height=\"78\" rx=\"14\"></rect><text x=\"505\" y=\"146\" class=\"svg-label\">Servidores — /26</text><text x=\"505\" y=\"174\" class=\"svg-label--small\">.128 - .191</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"730\" y=\"115\" width=\"150\" height=\"78\" rx=\"14\"></rect><text x=\"755\" y=\"146\" class=\"svg-label\">DMZ — /28</text><text x=\"755\" y=\"174\" class=\"svg-label--small\">.192 - .207</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"70\" y=\"235\" width=\"190\" height=\"78\" rx=\"14\"></rect><text x=\"95\" y=\"266\" class=\"svg-label\">Gerência — /29</text><text x=\"95\" y=\"294\" class=\"svg-label--small\">.208 - .215</text></g>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"285\" y=\"235\" width=\"310\" height=\"78\" rx=\"14\"></rect><text x=\"310\" y=\"266\" class=\"svg-label\">Reservado para crescimento</text><text x=\"310\" y=\"294\" class=\"svg-label--small\">.216 - .255 com alinhamento</text></g>\n<g class=\"svg-node svg-node--security\"><rect x=\"620\" y=\"235\" width=\"260\" height=\"78\" rx=\"14\"></rect><text x=\"645\" y=\"266\" class=\"svg-label\">Políticas e IPAM</text><text x=\"645\" y=\"294\" class=\"svg-label--small\">VLAN, gateway, DHCP, firewall</text></g>\n<line x1=\"460\" y1=\"154\" x2=\"480\" y2=\"154\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l06-arrow)\"></line>\n<line x1=\"710\" y1=\"154\" x2=\"730\" y2=\"154\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l06-arrow)\"></line>\n<line x1=\"260\" y1=\"274\" x2=\"285\" y2=\"274\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l06-arrow)\"></line>\n<line x1=\"595\" y1=\"274\" x2=\"620\" y2=\"274\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m05l06-arrow)\"></line>\n<text x=\"70\" y=\"380\" class=\"svg-label\">Método: maior demanda primeiro → menor prefixo suficiente → próximo bloco livre alinhado → documentação.</text>\n<text x=\"70\" y=\"412\" class=\"svg-label--small\">VLSM evita desperdício, mas exige validação contra sobreposição, crescimento, reservas e políticas de segurança.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório integrador</h2>\n<p>Esta aula agora abriga o <strong>Lab integrador 3 do M05</strong>: VLSM corporativo com departamentos, capacidade, política e decisão arquitetural.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam ordenação por demanda, escolha de prefixo, cálculo de limites e identificação de erros em planos VLSM.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio pede que você desenhe um plano VLSM para uma empresa pequena com usuários, servidores, DMZ, gerência, convidados e enlaces.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra a ordem correta de alocação e explica por que cada prefixo foi escolhido.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Você aprendeu que VLSM permite dividir um bloco IPv4 em sub-redes de tamanhos diferentes. O método correto é listar requisitos, ordenar da maior para a menor demanda, escolher o menor prefixo suficiente, alocar blocos sem sobreposição, calcular rede/hosts/broadcast e documentar VLAN, gateway, DHCP, reservas, firewall e dono do segmento.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você vai estudar <strong>Planejamento de endereçamento corporativo</strong>, usando VLSM como base para criar um plano mais amplo, padronizado, versionável e seguro.</p>\n</section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula conecta o cálculo de subnetting ao planejamento real de múltiplas redes dentro de um bloco IPv4.",
    "previousConcepts": [
      "CIDR",
      "máscara",
      "rede",
      "broadcast",
      "hosts úteis",
      "bloco mágico",
      "prefixos comuns"
    ],
    "nextConcepts": [
      "planejamento corporativo",
      "IPAM",
      "endereçamento por função",
      "Packet Tracer",
      "cloud e segurança"
    ],
    "realWorldUseCases": [
      "dividir um /24 entre departamentos",
      "planejar VLANs",
      "criar subnets cloud",
      "dimensionar DMZ",
      "evitar sobreposição em VPN",
      "documentar IPAM",
      "revisar firewall por CIDR"
    ]
  },
  "protocolFields": [
    {
      "field": "Bloco base",
      "meaning": "Rede maior que será subdividida em blocos menores.",
      "example": "192.168.10.0/24"
    },
    {
      "field": "Demanda de hosts",
      "meaning": "Quantidade de endereços necessários para cada segmento.",
      "example": "100 hosts para usuários"
    },
    {
      "field": "Prefixo VLSM",
      "meaning": "Prefixo escolhido para atender uma demanda específica.",
      "example": "/25 para até 126 hosts úteis tradicionais"
    },
    {
      "field": "Rede alocada",
      "meaning": "Endereço inicial da sub-rede atribuída ao segmento.",
      "example": "192.168.10.128/26"
    },
    {
      "field": "Broadcast",
      "meaning": "Último endereço do bloco em redes IPv4 tradicionais.",
      "example": "192.168.10.191"
    },
    {
      "field": "Espaço reservado",
      "meaning": "Faixa não usada imediatamente, mantida para crescimento ou novas sub-redes.",
      "example": "192.168.10.216-255"
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Coletar requisitos",
      "description": "Levantar segmentos, número de hosts, gateways, reservas, crescimento e criticidade."
    },
    {
      "step": 2,
      "title": "Ordenar demandas",
      "description": "Colocar as maiores redes primeiro para reduzir fragmentação."
    },
    {
      "step": 3,
      "title": "Escolher prefixos",
      "description": "Selecionar o menor prefixo que atende cada demanda com margem coerente."
    },
    {
      "step": 4,
      "title": "Alocar blocos",
      "description": "Usar o primeiro espaço livre alinhado para cada sub-rede, sem sobrepor blocos."
    },
    {
      "step": 5,
      "title": "Calcular limites",
      "description": "Registrar rede, primeiro host, último host e broadcast de cada segmento."
    },
    {
      "step": 6,
      "title": "Associar operação",
      "description": "Definir VLAN, gateway, DHCP, reservas, rotas, firewall e dono."
    },
    {
      "step": 7,
      "title": "Validar segurança e crescimento",
      "description": "Verificar sobreposição, CIDR amplo, cloud, VPN e expansão futura."
    }
  ],
  "deepDive": {
    "title": "Por que alocar maiores redes primeiro?",
    "points": [
      "Blocos maiores exigem alinhamentos maiores. Se você ocupa o início do bloco com redes pequenas, pode não sobrar uma faixa contígua alinhada para a rede grande.",
      "Ordenar da maior para a menor transforma um problema confuso em uma fila de alocação previsível.",
      "A escolha do prefixo deve considerar hosts reais, gateway, reservas, crescimento e particularidades de cloud.",
      "VLSM eficiente não significa usar todos os endereços até o limite; significa equilibrar eficiência, margem e clareza operacional.",
      "A documentação é parte do desenho. Um VLSM matematicamente correto, mas não documentado, tende a causar incidentes depois."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Alocar sub-redes pequenas primeiro.",
      "impact": "Fragmenta o bloco e pode impedir a criação de sub-redes maiores.",
      "fix": "Ordenar demandas da maior para a menor antes de alocar."
    },
    {
      "mistake": "Escolher prefixo no limite absoluto.",
      "impact": "Qualquer crescimento exige redesenho.",
      "fix": "Adicionar margem coerente, sem exagerar em CIDR amplo."
    },
    {
      "mistake": "Ignorar gateway, reservas e DHCP.",
      "impact": "A quantidade real de hosts disponíveis fica menor que a esperada.",
      "fix": "Planejar gateway, reservas estáticas, pool DHCP e endereços de infraestrutura."
    },
    {
      "mistake": "Criar blocos sobrepostos.",
      "impact": "Rotas ambíguas, falhas de VPN, tráfego indo para o destino errado e troubleshooting difícil.",
      "fix": "Validar cada rede contra o bloco anterior e usar IPAM."
    },
    {
      "mistake": "Achar que VLSM é controle de segurança suficiente.",
      "impact": "Sub-redes podem se comunicar livremente se não houver política entre elas.",
      "fix": "Aplicar firewall, ACL, NAC, segmentação e monitoramento."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host recebe IP aparentemente correto, mas gateway está fora da sub-rede.",
      "Duas VLANs usam faixas que se sobrepõem.",
      "VPN conecta, mas tráfego vai para rota errada.",
      "DHCP entrega IP dentro de broadcast ou fora do intervalo planejado.",
      "Firewall libera CIDR maior que o segmento real.",
      "Subnets cloud ficam sem endereços antes do previsto."
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver IP, máscara, gateway e DHCP recebido."
      },
      {
        "platform": "Windows",
        "command": "route print",
        "purpose": "Ver rotas e identificar prefixos que podem conflitar."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver endereços, prefixos e rotas locais."
      },
      {
        "platform": "Linux",
        "command": "ipcalc 192.168.10.128/26",
        "purpose": "Validar rede, broadcast e hosts de uma sub-rede."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Ver interfaces, IPs e status operacional."
      },
      {
        "platform": "Cisco IOS",
        "command": "show running-config | section interface",
        "purpose": "Auditar IPs configurados nas interfaces."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route",
        "purpose": "Ver rotas e prefixos anunciados ou conectados."
      }
    ],
    "method": [
      "Confirmar o bloco base.",
      "Listar todas as sub-redes planejadas.",
      "Validar se cada sub-rede começa em endereço alinhado ao tamanho do bloco.",
      "Checar rede, primeiro host, último host e broadcast.",
      "Comparar gateway e pool DHCP com os limites da sub-rede.",
      "Procurar sobreposição com outras VLANs, VPNs, cloud e rotas.",
      "Registrar evidências sanitizadas antes de alterar produção."
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
    "goodPractices": [
      "Usar VLSM para reduzir escopo de redes por função.",
      "Documentar dono, função, criticidade e política de firewall de cada sub-rede.",
      "Validar sobreposição antes de criar VPN, peering ou conexão híbrida.",
      "Aplicar menor privilégio em regras de firewall baseadas em CIDR.",
      "Manter redes de gestão pequenas, monitoradas e com acesso controlado.",
      "Usar IPAM como fonte de verdade."
    ],
    "badPractices": [
      "Usar blocos enormes por conveniência.",
      "Criar redes no limite sem margem de crescimento.",
      "Misturar usuários, servidores, IoT, convidados e gestão no mesmo plano sem separação.",
      "Permitir tráfego entre sub-redes apenas porque os blocos foram criados.",
      "Reutilizar CIDR privado sem checar VPN e cloud.",
      "Deixar exceções /32 sem dono e validade."
    ],
    "vulnerabilities": [
      {
        "name": "Superfície de ataque ampliada por CIDR amplo.",
        "description": "Risco relacionado à aula 5.6 — VLSM: sub-redes de tamanhos diferentes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall ou ACL entre segmentos."
      },
      {
        "name": "Movimentação lateral facilitada por segmentação sem política.",
        "description": "Risco relacionado à aula 5.6 — VLSM: sub-redes de tamanhos diferentes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM e revisão por mudança."
      },
      {
        "name": "Conflito de rotas por sobreposição.",
        "description": "Risco relacionado à aula 5.6 — VLSM: sub-redes de tamanhos diferentes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Validação automatizada em IaC."
      },
      {
        "name": "Exposição acidental em cloud por subnet pública mal dimensionada.",
        "description": "Risco relacionado à aula 5.6 — VLSM: sub-redes de tamanhos diferentes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs de roteamento, firewall e DHCP."
      },
      {
        "name": "Falha de auditoria por documentação incompleta.",
        "description": "Risco relacionado à aula 5.6 — VLSM: sub-redes de tamanhos diferentes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAC/802.1X para controlar quem entra em cada segmento."
      }
    ],
    "mitigations": [
      "Firewall ou ACL entre segmentos.",
      "IPAM e revisão por mudança.",
      "Validação automatizada em IaC.",
      "Logs de roteamento, firewall e DHCP.",
      "NAC/802.1X para controlar quem entra em cada segmento.",
      "Revisão periódica de CIDRs permitidos."
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
      "Firewall ou ACL entre segmentos.",
      "IPAM e revisão por mudança.",
      "Validação automatizada em IaC.",
      "Logs de roteamento, firewall e DHCP.",
      "NAC/802.1X para controlar quem entra em cada segmento.",
      "Revisão periódica de CIDRs permitidos."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-5.6",
    "labType": "architecture",
    "title": "Lab integrador 3 — VLSM corporativo com departamentos",
    "objective": "Planejar VLSM para uma empresa com departamentos de tamanhos diferentes, evitando desperdício, sobreposição e falta de crescimento.",
    "scenario": "Uma filial recebeu 10.20.30.0/24 e precisa atender Administração, Vendas, Suporte, Servidores, Gestão de rede e Visitantes. Cada grupo possui necessidade diferente de hosts e risco diferente.",
    "topology": "Filial com roteador/firewall central, VLANs por departamento, DHCP por escopo e regras entre sub-redes.",
    "architecture": "VLSM aplicado a VLANs corporativas: maiores redes primeiro, depois redes menores, com reserva para crescimento e documentação IPAM.",
    "prerequisites": [
      "Aulas 5.1 a 5.5 revisadas.",
      "Entender prefixo, host útil, rede, broadcast e bloco mágico."
    ],
    "tools": [
      "Planilha ou editor de texto",
      "Calculadora simples",
      "Packet Tracer opcional",
      "ipcalc opcional"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Use blocos privados de laboratório.",
      "Não copie plano real de empresa sem sanitizar."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Levantar requisitos",
        "instruction": "Liste departamentos, hosts atuais e crescimento previsto.",
        "artifact": "Vendas 70, Administração 35, Visitantes 30, Suporte 18, Servidores 10, Gestão 6.",
        "expectedOutput": "Tabela de requisitos ordenável.",
        "explanation": "VLSM começa por necessidade, não por prefixo."
      },
      {
        "number": 2,
        "title": "Ordenar do maior para o menor",
        "instruction": "Ordene as redes por quantidade de hosts necessários.",
        "analysisTask": "Vendas, Administração, Visitantes, Suporte, Servidores, Gestão.",
        "expectedOutput": "Lista em ordem decrescente.",
        "explanation": "Alocar os maiores blocos primeiro reduz fragmentação e erro."
      },
      {
        "number": 3,
        "title": "Escolher prefixos mínimos",
        "instruction": "Escolha o menor prefixo que comporta cada grupo com folga.",
        "calculation": "70 hosts -> /25; 35 hosts -> /26; 30 hosts -> /27; 18 hosts -> /27; 10 hosts -> /28; 6 hosts -> /29.",
        "expectedOutput": "Prefixo definido para cada grupo.",
        "explanation": "Sempre considerar hosts úteis e crescimento operacional."
      },
      {
        "number": 4,
        "title": "Alocar Vendas",
        "instruction": "Aloque a maior rede no início do /24.",
        "calculation": "10.20.30.0/25: hosts .1–.126, broadcast .127.",
        "expectedOutput": "Vendas documentada com gateway sugerido 10.20.30.1.",
        "explanation": "O /25 consome metade do /24."
      },
      {
        "number": 5,
        "title": "Alocar Administração",
        "instruction": "Aloque o próximo bloco livre alinhado.",
        "calculation": "10.20.30.128/26: hosts .129–.190, broadcast .191.",
        "expectedOutput": "Administração documentada com gateway sugerido .129.",
        "explanation": "Depois do /25, o próximo bloco livre começa em .128."
      },
      {
        "number": 6,
        "title": "Alocar Visitantes e Suporte",
        "instruction": "Use dois /27 no espaço restante.",
        "calculation": "Visitantes 10.20.30.192/27 hosts .193–.222 broadcast .223; Suporte 10.20.30.224/27 hosts .225–.254 broadcast .255.",
        "expectedOutput": "Dois /27 alocados sem sobreposição.",
        "explanation": "Neste desenho, o /24 ficou totalmente consumido antes de servidores/gestão."
      },
      {
        "number": 7,
        "title": "Detectar o problema de capacidade",
        "instruction": "Verifique se ainda há espaço para Servidores e Gestão.",
        "analysisTask": "O plano inicial não comporta todas as redes dentro de 10.20.30.0/24 com as folgas definidas.",
        "expectedOutput": "Risco registrado: bloco /24 insuficiente ou requisitos precisam ser ajustados.",
        "explanation": "Um bom lab VLSM também ensina quando dizer que o bloco não cabe."
      },
      {
        "number": 8,
        "title": "Propor correção arquitetural",
        "instruction": "Escolha uma alternativa: solicitar /23, reduzir folgas, separar visitantes em outro bloco ou mover servidores para bloco dedicado.",
        "artifact": "Recomendação: solicitar 10.20.30.0/23 ou reservar bloco separado para servidores/gestão.",
        "expectedOutput": "Decisão justificada com impacto operacional e de segurança.",
        "explanation": "Planejamento profissional não força uma solução matematicamente frágil."
      },
      {
        "number": 9,
        "title": "Criar matriz de política",
        "instruction": "Defina fluxos permitidos entre departamentos.",
        "artifact": "Visitantes -> Internet somente; Usuários -> Servidores portas necessárias; Gestão -> infraestrutura; Servidores -> logs/DNS/NTP.",
        "expectedOutput": "Matriz de fluxos por origem, destino, porta e justificativa.",
        "explanation": "Subnetting cria fronteira; firewall define o que cruza a fronteira."
      },
      {
        "number": 10,
        "title": "Registrar evidências IPAM",
        "instruction": "Monte o registro final com status, dono, finalidade, gateway, DHCP e observações.",
        "artifact": "Tabela IPAM sanitizada do plano VLSM.",
        "expectedOutput": "Plano rastreável e auditável.",
        "explanation": "Sem documentação, VLSM vira dívida operacional."
      }
    ],
    "expectedResult": "Plano VLSM completo ou decisão técnica justificada demonstrando que o /24 é insuficiente para os requisitos com folga.",
    "validation": [
      {
        "check": "Redes ordenadas por tamanho",
        "method": "Conferir ordem de alocação",
        "expected": "Maiores primeiro",
        "ifFails": "Reordenar requisitos."
      },
      {
        "check": "Prefixos comportam hosts úteis",
        "method": "Calcular 2^(bits host)-2",
        "expected": "Cada departamento cabe no prefixo escolhido",
        "ifFails": "Escolher prefixo maior."
      },
      {
        "check": "Sem sobreposição",
        "method": "Comparar rede e broadcast de cada bloco",
        "expected": "Nenhum intervalo cruza outro",
        "ifFails": "Refazer alocação."
      },
      {
        "check": "Capacidade total validada",
        "method": "Somar blocos alocados",
        "expected": "Plano cabe ou limitação é documentada",
        "ifFails": "Registrar risco e alternativa."
      },
      {
        "check": "Matriz de fluxos existe",
        "method": "Verificar origem, destino, porta, justificativa",
        "expected": "Fluxos mínimos documentados",
        "ifFails": "Adicionar política por sub-rede."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O plano não cabe no /24",
        "probableCause": "Requisitos e folgas maiores que o bloco disponível.",
        "howToConfirm": "Somar tamanhos de blocos alocados.",
        "fix": "Solicitar bloco maior, reduzir escopo ou segmentar em outro bloco."
      },
      {
        "symptom": "Dois departamentos usam a mesma faixa",
        "probableCause": "Alocação fora de alinhamento.",
        "howToConfirm": "Comparar rede/broadcast.",
        "fix": "Realocar respeitando tamanho do bloco."
      },
      {
        "symptom": "Visitantes conseguem acessar servidores no desenho",
        "probableCause": "Subnetting feito sem matriz de firewall.",
        "howToConfirm": "Revisar fluxos permitidos.",
        "fix": "Aplicar deny por padrão e permitir apenas Internet/DNS/DHCP conforme desenho."
      }
    ],
    "improvements": [
      "Refazer o mesmo caso usando 10.20.30.0/23.",
      "Adicionar alta disponibilidade de gateway com dois IPs reservados.",
      "Importar o plano para um IPAM real ou planilha com validações."
    ],
    "evidenceToCollect": [
      "Tabela de requisitos",
      "Tabela VLSM",
      "Análise de capacidade",
      "Matriz de fluxos",
      "Registro IPAM",
      "Decisão arquitetural final"
    ],
    "questions": [
      "Por que alocamos redes maiores primeiro?",
      "Quando é melhor pedir um bloco maior em vez de apertar prefixos?",
      "Como VLSM se conecta com firewall e cloud?"
    ],
    "challenge": "Refaça o plano considerando crescimento de 50% em Vendas e Servidores. O /24 ainda é aceitável?",
    "solution": "Com crescimento de 50%, Vendas ultrapassa 105 hosts e ainda cabe em /25, mas Administração, Visitantes, Suporte, Servidores e Gestão pressionam o restante. A solução madura é solicitar /23 ou separar blocos por função/ambiente, mantendo política e documentação."
  },
  "mentorQuestions": [
    "Por que a maior demanda deve ser alocada primeiro em VLSM?",
    "Qual é o risco de escolher sempre o menor prefixo possível sem margem?",
    "VLSM por si só impede comunicação entre segmentos? Por quê?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "O que VLSM permite fazer?",
      "options": [
        "Usar apenas sub-redes /24",
        "Criar sub-redes de tamanhos diferentes dentro de um bloco",
        "Eliminar necessidade de gateway",
        "Substituir firewall"
      ],
      "answer": 1,
      "explanation": "VLSM permite usar máscaras/prefixos diferentes para demandas diferentes."
    },
    {
      "id": "q2",
      "question": "Qual demanda deve ser alocada primeiro em um plano VLSM?",
      "options": [
        "A menor",
        "A maior",
        "A mais crítica alfabeticamente",
        "A que usa DHCP"
      ],
      "answer": 1,
      "explanation": "Alocar maiores primeiro evita fragmentação e falta de espaço alinhado."
    },
    {
      "id": "q3",
      "question": "Para 100 hosts úteis tradicionais, qual prefixo é candidato adequado?",
      "options": [
        "/26",
        "/27",
        "/25",
        "/29"
      ],
      "answer": 2,
      "explanation": "/25 oferece 126 hosts úteis tradicionais."
    },
    {
      "id": "q4",
      "question": "Em 192.168.10.128/26, qual é o broadcast?",
      "options": [
        "192.168.10.190",
        "192.168.10.191",
        "192.168.10.192",
        "192.168.10.255"
      ],
      "answer": 1,
      "explanation": "Um /26 tem bloco de 64. A rede .128 termina em .191."
    },
    {
      "id": "q5",
      "question": "Qual item NÃO deve ser esquecido ao documentar uma sub-rede VLSM?",
      "options": [
        "Gateway",
        "VLAN",
        "Política de firewall",
        "Todos os anteriores"
      ],
      "answer": 3,
      "explanation": "VLSM útil em produção precisa de documentação operacional completa."
    },
    {
      "id": "q6",
      "question": "VLSM substitui controles como firewall e ACL?",
      "options": [
        "Sim, porque cria sub-redes",
        "Sim, se usar /30",
        "Não, ele apenas organiza endereçamento",
        "Sim, se houver DHCP"
      ],
      "answer": 2,
      "explanation": "VLSM organiza blocos; controle de tráfego depende de roteamento, firewall, ACL e políticas."
    }
  ],
  "flashcards": [
    {
      "front": "O que é VLSM?",
      "back": "Técnica de criar sub-redes de tamanhos diferentes dentro de um bloco IPv4."
    },
    {
      "front": "Qual a regra de ouro do VLSM?",
      "back": "Alocar primeiro as maiores demandas."
    },
    {
      "front": "Por que ordenar demandas?",
      "back": "Para evitar fragmentação e garantir espaço alinhado para blocos maiores."
    },
    {
      "front": "VLSM é controle de segurança?",
      "back": "Não. Ele ajuda no desenho, mas segurança depende de políticas e controles."
    },
    {
      "front": "O que documentar em cada sub-rede?",
      "back": "Rede, prefixo, gateway, DHCP, VLAN, dono, função, política e observações."
    },
    {
      "front": "Qual risco de CIDR sobreposto?",
      "back": "Rotas ambíguas, falhas de VPN, tráfego incorreto e troubleshooting difícil."
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "title": "Escolha de prefixo",
      "prompt": "Escolha prefixos para demandas de 60, 28, 12 e 2 hosts.",
      "expectedAnswer": "/26, /27, /28 e /30 ou /31 em contexto ponto a ponto suportado."
    },
    {
      "id": "ex2",
      "title": "Alocação em /24",
      "prompt": "Aloque 100, 50, 14 e 6 hosts dentro de 192.168.20.0/24.",
      "expectedAnswer": "Uma solução possível: .0/25, .128/26, .192/28, .208/29."
    },
    {
      "id": "ex3",
      "title": "Identificação de erro",
      "prompt": "Explique o problema de alocar 192.168.30.64/26 e 192.168.30.96/27 no mesmo plano.",
      "expectedAnswer": "Há sobreposição, pois 192.168.30.96/27 fica dentro do bloco 192.168.30.64/26."
    },
    {
      "id": "ex4",
      "title": "Segurança",
      "prompt": "Por que não basta criar sub-redes VLSM para dizer que a rede está segura?",
      "expectedAnswer": "Porque tráfego entre sub-redes precisa ser controlado por firewall, ACL, NAC, rotas e monitoramento."
    }
  ],
  "challenge": {
    "title": "Desenhe um plano VLSM para uma filial",
    "scenario": "Você recebeu o bloco 10.50.0.0/24 para uma filial. Precisa atender: Usuários 90 hosts, Wi-Fi corporativo 45 hosts, Servidores 20 hosts, Visitantes 20 hosts, Gerência 10 hosts e Enlace WAN 2 hosts.",
    "tasks": [
      "Ordene as demandas da maior para a menor.",
      "Escolha prefixos adequados.",
      "Aloque as sub-redes sem sobreposição.",
      "Defina gateway sugerido para cada rede.",
      "Indique quais segmentos devem ter políticas de firewall mais restritivas.",
      "Documente o espaço reservado para crescimento."
    ],
    "rubric": [
      "40% cálculo correto de prefixos e limites",
      "20% ausência de sobreposição",
      "15% documentação de gateway, função e VLAN",
      "15% raciocínio de segurança",
      "10% espaço reservado e justificativa de crescimento"
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução possível para 10.50.0.0/24 é alocar primeiro usuários com /25, depois Wi-Fi com /26, servidores e visitantes com /27, gerência com /28 e WAN com /30, ajustando conforme crescimento esperado.",
    "steps": [
      "Usuários 90 hosts: 10.50.0.0/25, hosts .1-.126, broadcast .127.",
      "Wi-Fi corporativo 45 hosts: 10.50.0.128/26, hosts .129-.190, broadcast .191.",
      "Servidores 20 hosts: 10.50.0.192/27, hosts .193-.222, broadcast .223.",
      "Visitantes 20 hosts: 10.50.0.224/27, hosts .225-.254, broadcast .255. Esta alocação usa todo o /24, então deixa pouco espaço para gerência e WAN; portanto, é melhor reconsiderar tamanhos ou usar bloco maior.",
      "Solução revisada: mover visitantes para outro bloco ou usar 10.50.1.0/24 adicional. A lição é que VLSM também revela quando o bloco base é insuficiente para requisitos e crescimento.",
      "Em cenário real, não force tudo em um /24 se segurança, crescimento e operação pedem mais espaço. O plano correto pode exigir solicitar bloco maior."
    ],
    "mentorComment": "O melhor aluno de redes não é quem força uma conta a caber. É quem percebe quando o requisito não cabe de forma saudável no bloco disponível. VLSM é ferramenta de planejamento, não mágica para compensar falta de endereços."
  },
  "glossary": [
    {
      "term": "VLSM",
      "definition": "Variable Length Subnet Mask; técnica de usar máscaras de tamanhos diferentes dentro de um plano de endereçamento."
    },
    {
      "term": "FLSM",
      "definition": "Fixed Length Subnet Mask; divisão em sub-redes de mesmo tamanho."
    },
    {
      "term": "Bloco base",
      "definition": "Rede maior que será dividida em sub-redes menores."
    },
    {
      "term": "Sobreposição",
      "definition": "Quando duas sub-redes cobrem parte do mesmo intervalo de endereços."
    },
    {
      "term": "Fragmentação",
      "definition": "Distribuição ruim de blocos livres que dificulta alocar redes maiores depois."
    },
    {
      "term": "IPAM",
      "definition": "IP Address Management; processo ou ferramenta para controlar uso, dono e estado dos endereços IP."
    }
  ],
  "references": [
    {
      "title": "RFC 4632 — Classless Inter-domain Routing (CIDR)",
      "type": "rfc",
      "note": "Base conceitual moderna para CIDR."
    },
    {
      "title": "RFC 3021 — Using 31-Bit Prefixes on IPv4 Point-to-Point Links",
      "type": "rfc",
      "note": "Referência para uso de /31 em enlaces ponto a ponto."
    },
    {
      "title": "Cisco — IP Addressing and Subnetting for New Users",
      "type": "vendor-doc",
      "note": "Material complementar para cálculo e planejamento IPv4."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Módulo de IaC e automação",
      "reason": "Planos VLSM em cloud e datacenter costumam ser versionados e aplicados por Terraform, Ansible e pipelines."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Módulos de acesso administrativo",
      "reason": "Redes de gestão pequenas e bem planejadas reduzem escopo de acesso privilegiado."
    }
  ],
  "progressRules": {
    "requiredToComplete": [
      "Ler todas as seções",
      "Concluir o laboratório lab-5.6",
      "Acertar pelo menos 70% do quiz",
      "Entregar o desafio ou revisar a solução comentada"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.7"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "labMarkedDone",
        "practicalExerciseDone"
      ]
    }
  }
};
