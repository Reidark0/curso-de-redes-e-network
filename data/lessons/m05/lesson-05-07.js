export const lesson0507 = {
  "id": "5.7",
  "moduleId": "m05",
  "order": 7,
  "title": "Planejamento de endereçamento corporativo",
  "subtitle": "Como transformar cálculos de subnetting e VLSM em um plano corporativo de endereçamento IPv4 com padrões, IPAM, crescimento, segurança, cloud, VPN e governança operacional.",
  "duration": "110-150 min",
  "estimatedStudyTimeMinutes": 150,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 245,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "vlsm",
    "endereçamento",
    "ipam",
    "governança",
    "vlan",
    "dhcp",
    "firewall",
    "cloud",
    "vpn",
    "devsecops",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "reason": "A aula 5.1 explicou por que subnetting existe e por que redes planas são ruins para escala, operação e segurança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.2",
      "reason": "A aula 5.2 ensinou a relação entre CIDR, máscara e quantidade de hosts."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.3",
      "reason": "A aula 5.3 ensinou rede, primeiro host, último host e broadcast."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.4",
      "reason": "A aula 5.4 ensinou o método do bloco mágico para encontrar limites de sub-redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.6",
      "reason": "A aula 5.6 ensinou VLSM, técnica essencial para planejar sub-redes de tamanhos diferentes."
    }
  ],
  "objectives": [
    "Explicar por que planejamento de endereçamento corporativo é diferente de apenas calcular sub-redes.",
    "Construir uma matriz de endereçamento por localidade, função, ambiente, VLAN, gateway, DHCP e política de firewall.",
    "Aplicar padrões de blocos para usuários, servidores, DMZ, gestão, Wi-Fi, convidados, IoT, backup, monitoramento e links ponto a ponto.",
    "Planejar crescimento, reservas, sumarização, cloud, VPN, ambientes híbridos e prevenção de sobreposição de CIDR.",
    "Relacionar endereçamento com IPAM, CMDB, IaC, GitOps, logs, SIEM, NAC e resposta a incidentes.",
    "Identificar más práticas como usar /24 para tudo, allowlists amplas, blocos sobrepostos, documentação ausente e redes sem dono."
  ],
  "learningOutcomes": [
    "Dado um cenário empresarial, o aluno cria um plano de endereçamento IPv4 com blocos por localidade e função.",
    "Dado um plano existente, o aluno identifica sobreposição, desperdício, ausência de margem e riscos de segurança.",
    "Dado um projeto cloud ou VPN, o aluno verifica compatibilidade de CIDR com ambiente on-premises.",
    "Dado um incidente, o aluno usa IPAM, VLAN, gateway e logs para localizar o segmento afetado.",
    "Dado um pipeline de infraestrutura, o aluno entende onde validar blocos CIDR antes de aplicar mudanças."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Até aqui, você aprendeu a calcular sub-redes. Isso é necessário, mas ainda não é suficiente para uma empresa real. Em uma rede corporativa, o problema não é apenas descobrir se <code>192.168.10.77/26</code> pertence a uma sub-rede. O problema é decidir qual bloco será usado por usuários, servidores, impressoras, Wi-Fi corporativo, convidados, IoT, câmeras, backup, gerenciamento, DMZ, cloud, VPN, filiais e laboratórios.</p>\n<p>Quando o endereçamento nasce sem padrão, cada expansão vira improviso. Uma filial usa <code>192.168.0.0/24</code>, outra usa <code>192.168.1.0/24</code>, a VPN de um fornecedor também usa <code>192.168.1.0/24</code>, a cloud usa <code>10.0.0.0/16</code> sem coordenação e, meses depois, ninguém consegue conectar ambientes sem NAT, rotas especiais ou exceções perigosas.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> planejamento de endereçamento é a ponte entre matemática de subnetting e arquitetura corporativa. Ele reduz retrabalho, evita sobreposição, melhora segurança, facilita troubleshooting e prepara a rede para crescimento.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>No início de muitas redes, o endereçamento era simples: um bloco privado grande, poucos roteadores e baixa segmentação. Com o crescimento das empresas, surgiram filiais, datacenters, redes Wi-Fi, VoIP, câmeras, VPNs, ambientes de homologação, cloud pública e integrações com terceiros. O espaço IPv4 privado deixou de ser apenas uma conveniência e virou um recurso arquitetural.</p>\n<p>Com CIDR e VLSM, tornou-se possível dividir blocos de maneira flexível. Mas a flexibilidade também trouxe um risco: sem governança, cada time escolhe um CIDR diferente, com padrões conflitantes. Por isso, práticas como IPAM, CMDB, documentação versionada, revisão de arquitetura e validação automática em IaC se tornaram cada vez mais importantes.</p>\n<p>Hoje, em ambientes corporativos modernos, o plano de endereçamento afeta firewall, SIEM, troubleshooting, auditoria, cloud landing zones, Kubernetes, VPN site-to-site, Zero Trust, NAC, segmentação, resposta a incidentes e custo operacional.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema clássico é tratar endereçamento como algo local e não como desenho global. Um time cria uma VPC com <code>10.0.0.0/16</code>. Outro cria uma VPN com uma filial que também usa <code>10.0.0.0/16</code>. O time de redes usa <code>192.168.0.0/16</code> para filiais sem reservar faixas. O time de segurança cria allowlists por <code>/16</code> porque os blocos não foram documentados. O resultado é uma rede difícil de integrar e difícil de proteger.</p>\n<table class=\"data-table\"><thead><tr><th>Sintoma</th><th>Causa provável</th><th>Impacto</th></tr></thead><tbody>\n<tr><td>VPN conecta, mas não há comunicação</td><td>CIDR sobreposto entre sites</td><td>Rotas ambíguas e NAT emergencial</td></tr>\n<tr><td>Firewall libera redes grandes demais</td><td>Blocos sem função clara</td><td>Aumento de superfície lateral</td></tr>\n<tr><td>DHCP fica sem IP</td><td>Sub-rede subdimensionada</td><td>Incidente operacional recorrente</td></tr>\n<tr><td>SIEM mostra IP, mas ninguém sabe o dono</td><td>Ausência de IPAM/CMDB</td><td>Resposta a incidente lenta</td></tr>\n<tr><td>Cloud não integra com datacenter</td><td>Planejamento isolado</td><td>Retrabalho arquitetural</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema central:</strong> endereçamento mal planejado vira dívida técnica invisível. Ele não aparece como erro imediatamente, mas cobra caro quando a empresa cresce, integra cloud, cria VPNs ou precisa responder a incidentes.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução saudável de endereçamento corporativo passa por maturidade. Primeiro, a empresa costuma usar blocos simples e redes planas. Depois, começa a separar por VLAN. Em seguida, organiza blocos por localidade e função. Por fim, passa a controlar endereçamento com IPAM, automação, revisão de arquitetura e validações em pipelines.</p>\n<table class=\"comparison-table\"><thead><tr><th>Nível</th><th>Como funciona</th><th>Benefício</th><th>Limitação</th></tr></thead><tbody>\n<tr><td>Improvisado</td><td>Cada rede recebe um bloco escolhido na hora</td><td>Rápido no início</td><td>Sobreposição, desperdício e baixa governança</td></tr>\n<tr><td>Por VLAN</td><td>Cada VLAN tem sua sub-rede</td><td>Melhora segmentação local</td><td>Pode faltar padrão global</td></tr>\n<tr><td>Por localidade e função</td><td>Blocos separados por site, ambiente e uso</td><td>Facilita rotas, firewall e suporte</td><td>Exige documentação contínua</td></tr>\n<tr><td>Governado e automatizado</td><td>IPAM, CMDB, IaC, validação e revisão</td><td>Escala com menos incidentes</td><td>Exige processo e disciplina</td></tr>\n</tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Planejamento de endereçamento corporativo</strong> é o processo de definir, reservar, documentar e governar blocos IPv4 de forma coerente com a arquitetura da organização.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> um plano de endereçamento corporativo mapeia blocos CIDR para localidades, funções, ambientes, VLANs, gateways, DHCP, reservas, políticas de firewall, responsáveis e crescimento previsto.</div>\n<p>Um bom plano não responde apenas “quantos hosts cabem?”. Ele responde: quem usa este bloco? Onde ele está? Qual é o gateway? Qual VLAN? Há DHCP? Existe rota sumarizada? Existe firewall? Esse CIDR aparece em cloud? Pode sobrepor VPN? Quem aprova mudança? Como isso entra no IPAM?</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>O funcionamento interno de um plano corporativo começa pela decomposição hierárquica. Você reserva blocos maiores para domínios amplos e subdivide em blocos menores por função. Essa hierarquia facilita sumarização de rotas, leitura de logs e criação de políticas.</p>\n<ol class=\"flow-list\">\n<li><strong>Escolha blocos globais:</strong> por exemplo, <code>10.0.0.0/8</code> para uso corporativo interno.</li>\n<li><strong>Separe por domínio:</strong> datacenter, filiais, cloud, laboratórios, VPNs e terceiros.</li>\n<li><strong>Separe por localidade:</strong> matriz, filial A, filial B, região cloud, ambiente de testes.</li>\n<li><strong>Separe por função:</strong> usuários, servidores, DMZ, gestão, Wi-Fi, convidados, IoT e backup.</li>\n<li><strong>Defina gateways e VLANs:</strong> cada sub-rede precisa ter ponto de roteamento e política.</li>\n<li><strong>Defina DHCP e reservas:</strong> pools, exclusões, IPs fixos, impressoras, appliances e infraestrutura.</li>\n<li><strong>Associe segurança:</strong> zonas, firewall, NAC, logging e monitoramento.</li>\n<li><strong>Registre no IPAM:</strong> dono, finalidade, status, localização, ambiente e data de revisão.</li>\n</ol>\n<p>O pacote IPv4 não carrega essa governança. Ele apenas carrega origem e destino. A governança existe nas tabelas de rotas, firewalls, DHCP, IPAM, CMDB, documentação e processos de mudança.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Uma arquitetura comum usa uma hierarquia de blocos. O objetivo não é decorar um padrão universal, mas entender a lógica. Exemplo didático:</p>\n<table class=\"data-table\"><thead><tr><th>Bloco</th><th>Uso</th><th>Exemplo</th><th>Motivo</th></tr></thead><tbody>\n<tr><td><code>10.0.0.0/8</code></td><td>Corporativo interno</td><td>Reserva geral</td><td>Espaço amplo para crescimento</td></tr>\n<tr><td><code>10.10.0.0/16</code></td><td>Matriz</td><td>Sites principais</td><td>Sumarização por localidade</td></tr>\n<tr><td><code>10.20.0.0/16</code></td><td>Filiais</td><td>Unidades remotas</td><td>Separação operacional</td></tr>\n<tr><td><code>10.50.0.0/16</code></td><td>Cloud produção</td><td>VPC/VNet produção</td><td>Evita misturar com on-premises</td></tr>\n<tr><td><code>10.60.0.0/16</code></td><td>Cloud homologação</td><td>Ambiente não produtivo</td><td>Controle de risco e custo</td></tr>\n<tr><td><code>10.90.0.0/16</code></td><td>VPN terceiros</td><td>Integrações controladas</td><td>Facilita auditoria e firewall</td></tr>\n</tbody></table>\n<p>Dentro de cada bloco, as sub-redes podem seguir função. Por exemplo, <code>/24</code> para usuários, <code>/25</code> ou <code>/26</code> para servidores, <code>/27</code> para gerência e <code>/28</code> para DMZ pequena, sempre ajustando à realidade da organização.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em uma empresa como uma cidade. Não basta saber que uma pessoa mora em algum lugar. A cidade precisa de bairros, ruas, números, zonas comerciais, áreas industriais, hospitais, escolas e regras de circulação. O plano de endereçamento é esse urbanismo aplicado à rede.</p>\n<p>Uma rede improvisada é como uma cidade em que cada prédio escolhe seu próprio nome de rua. Enquanto há poucos prédios, talvez funcione. Quando chegam entregas, ambulâncias, impostos, obras e segurança pública, o caos aparece.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> em redes, os blocos também influenciam roteamento, firewall, NAT, VPN, cloud e automação. O endereço não é só identificação; ele participa da decisão técnica e da política de segurança.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Imagine uma pequena empresa com o bloco <code>192.168.50.0/24</code>. Um plano simples poderia ser:</p>\n<table class=\"data-table\"><thead><tr><th>Função</th><th>VLAN</th><th>Sub-rede</th><th>Gateway</th><th>Observação</th></tr></thead><tbody>\n<tr><td>Usuários</td><td>10</td><td><code>192.168.50.0/26</code></td><td><code>192.168.50.1</code></td><td>Até 62 hosts úteis</td></tr>\n<tr><td>Servidores</td><td>20</td><td><code>192.168.50.64/27</code></td><td><code>192.168.50.65</code></td><td>Servidores internos</td></tr>\n<tr><td>DMZ</td><td>30</td><td><code>192.168.50.96/28</code></td><td><code>192.168.50.97</code></td><td>Serviços expostos via firewall</td></tr>\n<tr><td>Gerência</td><td>40</td><td><code>192.168.50.112/28</code></td><td><code>192.168.50.113</code></td><td>Switches, APs e appliances</td></tr>\n<tr><td>Reservado</td><td>-</td><td><code>192.168.50.128/25</code></td><td>-</td><td>Crescimento futuro</td></tr>\n</tbody></table>\n<p>Esse exemplo mostra que o plano não precisa consumir todo o bloco imediatamente. Reservar espaço também é planejamento.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa com matriz e filiais, um padrão ajuda muito. Por exemplo: cada site recebe um <code>/16</code> ou <code>/20</code>, dependendo do porte. Dentro do site, os primeiros blocos são usuários, depois servidores, depois Wi-Fi, depois IoT, depois gerência e assim por diante.</p>\n<table class=\"data-table\"><thead><tr><th>Categoria</th><th>Exemplo de bloco</th><th>Controle associado</th></tr></thead><tbody>\n<tr><td>Usuários corporativos</td><td><code>10.10.10.0/24</code></td><td>DHCP, NAC, acesso limitado a servidores</td></tr>\n<tr><td>Servidores internos</td><td><code>10.10.20.0/24</code></td><td>Firewall restritivo, inventário e monitoramento</td></tr>\n<tr><td>Administração/gerência</td><td><code>10.10.30.0/27</code></td><td>Acesso apenas de estações privilegiadas</td></tr>\n<tr><td>Convidados</td><td><code>10.10.40.0/23</code></td><td>Internet-only, sem acesso lateral</td></tr>\n<tr><td>IoT/CFTV</td><td><code>10.10.50.0/24</code></td><td>Sem acesso livre à rede de usuários</td></tr>\n</tbody></table>\n<p>O valor arquitetural está na previsibilidade. Ao olhar um IP, o time de operação já entende localidade, função provável e controles esperados.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, o planejamento de CIDR precisa acontecer antes de criar VPCs, VNets, subnets, VPNs, peerings, private endpoints e clusters Kubernetes. Uma VPC criada com CIDR sobreposto pode impedir conectividade futura com datacenter ou outra cloud.</p>\n<p>Um padrão comum é separar produção, homologação e desenvolvimento em blocos distintos. Também é comum separar subnets públicas, privadas, dados, endpoints privados, balanceadores e serviços administrados.</p>\n<table class=\"comparison-table\"><thead><tr><th>Camada cloud</th><th>Exemplo</th><th>Cuidado</th></tr></thead><tbody>\n<tr><td>VPC/VNet</td><td><code>10.50.0.0/16</code></td><td>Não sobrepor datacenter ou VPN</td></tr>\n<tr><td>Subnet pública</td><td><code>10.50.0.0/24</code></td><td>Exposição deve ser mínima</td></tr>\n<tr><td>Subnet privada app</td><td><code>10.50.10.0/24</code></td><td>Saída controlada por NAT/egress</td></tr>\n<tr><td>Subnet dados</td><td><code>10.50.20.0/24</code></td><td>Acesso apenas por aplicação autorizada</td></tr>\n<tr><td>Private endpoints</td><td><code>10.50.30.0/26</code></td><td>Reservar espaço para crescimento</td></tr>\n</tbody></table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, endereçamento aparece em Terraform, Ansible, Helm, manifests Kubernetes, firewalls, security groups, runners, ambientes efêmeros e pipelines de validação. Um erro de CIDR pode passar em revisão superficial e quebrar conectividade depois do deploy.</p>\n<p>Boas práticas incluem validar sobreposição de CIDR antes do merge, manter blocos em arquivos versionados, gerar documentação automaticamente, bloquear <code>0.0.0.0/0</code> quando não houver justificativa e exigir aprovação para mudanças em subnets produtivas.</p>\n<div class=\"callout\"><strong>Exemplo:</strong> antes de aplicar uma nova VPC com Terraform, o pipeline pode comparar o CIDR proposto contra uma lista de blocos já reservados no IPAM. Se houver sobreposição, o merge é bloqueado.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Segurança depende de endereçamento bem definido. Firewalls, SIEM, EDR, NDR, NAC e resposta a incidentes precisam saber o que um IP representa. Um endereço de servidor de banco, um endereço de convidado e um endereço de câmera IP não devem ter o mesmo nível de confiança.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Movimento lateral</td><td>Redes grandes e sem segmentação</td><td>Sub-redes por função e firewall entre zonas</td></tr>\n<tr><td>Allowlist ampla</td><td>Permitir <code>/16</code> para resolver rápido</td><td>Permitir menor bloco necessário</td></tr>\n<tr><td>Ativo sem dono</td><td>IP aparece em alerta sem contexto</td><td>IPAM com proprietário, ambiente e função</td></tr>\n<tr><td>VPN insegura</td><td>Terceiro recebe acesso a bloco grande</td><td>CIDR mínimo, rotas específicas e logs</td></tr>\n<tr><td>Cloud exposta</td><td>Subnets públicas sem necessidade</td><td>Subnets privadas, private endpoint e revisão</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m05l07-title m05l07-desc\">\n<title id=\"m05l07-title\">Planejamento corporativo de endereçamento IPv4</title>\n<desc id=\"m05l07-desc\">Diagrama mostrando blocos IPv4 corporativos divididos por datacenter, filiais, cloud, VPN, funções, IPAM e segurança.</desc>\n<defs><marker id=\"m05l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"35\" y=\"35\" width=\"910\" height=\"470\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"60\" y=\"70\" class=\"svg-label\">Plano global: blocos por domínio, localidade, função e segurança</text>\n<g class=\"svg-node svg-node--router\"><rect x=\"70\" y=\"110\" width=\"220\" height=\"90\" rx=\"14\"></rect><text x=\"95\" y=\"142\" class=\"svg-label\">Datacenter</text><text x=\"95\" y=\"170\" class=\"svg-label--small\">10.10.0.0/16</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"380\" y=\"110\" width=\"220\" height=\"90\" rx=\"14\"></rect><text x=\"405\" y=\"142\" class=\"svg-label\">Filiais</text><text x=\"405\" y=\"170\" class=\"svg-label--small\">10.20.0.0/16</text></g>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"690\" y=\"110\" width=\"220\" height=\"90\" rx=\"14\"></rect><text x=\"715\" y=\"142\" class=\"svg-label\">Cloud</text><text x=\"715\" y=\"170\" class=\"svg-label--small\">10.50.0.0/16</text></g>\n<g class=\"svg-node svg-node--client\"><rect x=\"70\" y=\"260\" width=\"175\" height=\"80\" rx=\"14\"></rect><text x=\"95\" y=\"292\" class=\"svg-label\">Usuários</text><text x=\"95\" y=\"318\" class=\"svg-label--small\">VLAN + DHCP</text></g>\n<g class=\"svg-node svg-node--server\"><rect x=\"275\" y=\"260\" width=\"175\" height=\"80\" rx=\"14\"></rect><text x=\"300\" y=\"292\" class=\"svg-label\">Servidores</text><text x=\"300\" y=\"318\" class=\"svg-label--small\">Reservas + CMDB</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"480\" y=\"260\" width=\"175\" height=\"80\" rx=\"14\"></rect><text x=\"505\" y=\"292\" class=\"svg-label\">DMZ</text><text x=\"505\" y=\"318\" class=\"svg-label--small\">Firewall restritivo</text></g>\n<g class=\"svg-node svg-node--security\"><rect x=\"685\" y=\"260\" width=\"225\" height=\"80\" rx=\"14\"></rect><text x=\"710\" y=\"292\" class=\"svg-label\">Gerência e segurança</text><text x=\"710\" y=\"318\" class=\"svg-label--small\">NAC, logs, SIEM, IPAM</text></g>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"250\" y=\"400\" width=\"240\" height=\"80\" rx=\"14\"></rect><text x=\"275\" y=\"432\" class=\"svg-label\">IPAM / CMDB / Git</text><text x=\"275\" y=\"458\" class=\"svg-label--small\">Dono, função, status, versão</text></g>\n<g class=\"svg-node svg-node--attacker\"><rect x=\"530\" y=\"400\" width=\"240\" height=\"80\" rx=\"14\"></rect><text x=\"555\" y=\"432\" class=\"svg-label\">Riscos controlados</text><text x=\"555\" y=\"458\" class=\"svg-label--small\">Sem sobreposição e sem /0</text></g>\n<line x1=\"290\" y1=\"155\" x2=\"380\" y2=\"155\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l07-arrow)\"></line>\n<line x1=\"600\" y1=\"155\" x2=\"690\" y2=\"155\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l07-arrow)\"></line>\n<line x1=\"158\" y1=\"340\" x2=\"320\" y2=\"400\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l07-arrow)\"></line>\n<line x1=\"568\" y1=\"340\" x2=\"650\" y2=\"400\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m05l07-arrow)\"></line>\n<text x=\"70\" y=\"525\" class=\"svg-label--small\">Um bom plano une cálculo, função, segurança, dono, documentação e validação de mudanças.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Prática equivalente</h2>\n<p><strong>Aula 5.7 convertida para prática equivalente</strong></p>\n<p>O conteúdo desta aula é melhor fixado por cálculo guiado, diagnóstico, matriz ou desafio curto. O laboratório independente foi removido para evitar atividade artificial e concentrar a execução pesada nos quatro labs integradores do M05.</p>\n<div class=\"callout callout--mentor\"><strong>Política v2.0:</strong> esta aula não mantém laboratório independente. A fixação acontece por exercícios, desafio, solução comentada e pelos quatro labs integradores do M05.</div>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam identificação de padrões, detecção de sobreposição, escolha de prefixo por função e avaliação de riscos em planos corporativos.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio pede que você desenhe um plano de endereçamento para uma organização híbrida com matriz, duas filiais, cloud produção, cloud homologação, VPN de fornecedor e redes de convidados.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como separar blocos por domínio, evitar sobreposição, documentar função e aplicar menor privilégio em rotas e firewalls.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Você aprendeu que planejamento de endereçamento corporativo não é apenas cálculo de subnetting. É governança de blocos IPv4 para localidade, função, ambiente, segurança, operação e crescimento. Um bom plano facilita rotas, firewalls, IPAM, troubleshooting, cloud, VPN, SIEM e resposta a incidentes.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você vai aplicar esses conceitos em um <strong>Laboratório Packet Tracer: quatro sub-redes /26</strong>, criando uma topologia prática com gateways, hosts, switches e validação de conectividade.</p>\n</section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula transforma subnetting e VLSM em arquitetura corporativa de endereçamento IPv4.",
    "previousConcepts": [
      "CIDR",
      "máscara",
      "rede",
      "broadcast",
      "gateway",
      "DHCP",
      "VLSM",
      "VLANs",
      "firewall"
    ],
    "nextConcepts": [
      "Packet Tracer",
      "quatro sub-redes /26",
      "validação de conectividade",
      "subnetting para segurança e cloud"
    ],
    "realWorldUseCases": [
      "planejar endereçamento de matriz e filiais",
      "evitar sobreposição em VPN",
      "desenhar VPC/VNet sem conflito",
      "organizar IPAM",
      "criar matriz de firewall",
      "investigar alerta de SIEM por IP",
      "padronizar IaC de rede"
    ]
  },
  "protocolFields": [
    {
      "field": "Bloco corporativo",
      "meaning": "Faixa ampla reservada para um domínio da organização.",
      "example": "10.0.0.0/8 ou 10.50.0.0/16"
    },
    {
      "field": "Localidade",
      "meaning": "Site físico ou lógico associado ao bloco.",
      "example": "Matriz, filial, cloud produção, VPN terceiro"
    },
    {
      "field": "Função",
      "meaning": "Uso do segmento dentro do ambiente.",
      "example": "Usuários, servidores, DMZ, gerência, convidados"
    },
    {
      "field": "VLAN/Gateway",
      "meaning": "Associação do bloco à segmentação de Camada 2 e ponto de roteamento.",
      "example": "VLAN 20, gateway 10.10.20.1"
    },
    {
      "field": "Dono",
      "meaning": "Equipe responsável pelo bloco e por aprovar mudanças.",
      "example": "Redes, Cloud Platform, Segurança, Unidade de negócio"
    },
    {
      "field": "Status",
      "meaning": "Situação operacional do bloco.",
      "example": "Reservado, ativo, depreciado, bloqueado, disponível"
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Coletar requisitos",
      "description": "Mapear localidades, ambientes, funções, integrações, crescimento e restrições de segurança."
    },
    {
      "step": 2,
      "title": "Reservar blocos macro",
      "description": "Separar faixas grandes por datacenter, filiais, cloud, VPN e laboratórios."
    },
    {
      "step": 3,
      "title": "Subdividir por função",
      "description": "Aplicar VLSM para usuários, servidores, DMZ, convidados, IoT, gerência e enlaces."
    },
    {
      "step": 4,
      "title": "Associar operação",
      "description": "Definir VLAN, gateway, DHCP, reservas, DNS, rotas e monitoramento."
    },
    {
      "step": 5,
      "title": "Associar segurança",
      "description": "Definir zonas, firewall, NAC, logs, donos e criticidade."
    },
    {
      "step": 6,
      "title": "Validar conflitos",
      "description": "Checar sobreposição com cloud, VPN, terceiros e blocos reservados."
    },
    {
      "step": 7,
      "title": "Versionar e revisar",
      "description": "Registrar em IPAM/CMDB/Git e submeter mudanças a revisão técnica."
    }
  ],
  "deepDive": {
    "title": "Planejamento por hierarquia e sumarização",
    "points": [
      "Hierarquia ajuda a entender a rede apenas olhando o endereço IP, mas não deve virar rigidez excessiva.",
      "Sumarização de rotas é facilitada quando blocos de uma localidade são contíguos.",
      "Separar blocos por função ajuda firewall e logs, mas a política de segurança deve ser aplicada explicitamente.",
      "Em cloud, escolher CIDR cedo demais e sem IPAM pode bloquear peerings, VPNs e integrações futuras.",
      "O plano deve ter ciclo de vida: reservado, ativo, em migração, depreciado e liberado somente após validação."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Usar /24 para todos os segmentos.",
      "impact": "Desperdício, rotas menos organizadas e falsa sensação de simplicidade.",
      "fix": "Dimensionar por função usando VLSM e margem controlada."
    },
    {
      "mistake": "Criar VPC/VNet com CIDR genérico sem consulta ao IPAM.",
      "impact": "Sobreposição futura com VPN, datacenter ou outra cloud.",
      "fix": "Validar CIDR antes da criação e manter registro central."
    },
    {
      "mistake": "Permitir blocos amplos no firewall por falta de documentação.",
      "impact": "Aumenta movimento lateral e exposição desnecessária.",
      "fix": "Documentar função e liberar o menor CIDR necessário."
    },
    {
      "mistake": "Não reservar espaço para crescimento.",
      "impact": "Renumerar redes depois é caro e arriscado.",
      "fix": "Reservar blocos contíguos por localidade e função."
    },
    {
      "mistake": "Tratar IP privado como automaticamente seguro.",
      "impact": "Serviços internos podem ficar expostos lateralmente.",
      "fix": "Aplicar segmentação, firewall, logs e autenticação forte."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      {
        "symptom": "VPN sobe, mas tráfego não chega ao destino.",
        "probableCause": "CIDR sobreposto ou rota mais específica competindo.",
        "checks": [
          "Comparar IPAM dos dois lados",
          "Verificar tabela de rotas",
          "Validar NAT e políticas de firewall"
        ]
      },
      {
        "symptom": "Host recebe IP correto, mas não acessa servidor.",
        "probableCause": "Firewall entre sub-redes ou gateway errado.",
        "checks": [
          "Verificar VLAN e gateway",
          "Testar ping/traceroute",
          "Revisar regra por CIDR"
        ]
      },
      {
        "symptom": "Alerta de SIEM mostra IP sem contexto.",
        "probableCause": "IPAM/CMDB incompleto.",
        "checks": [
          "Buscar sub-rede no IPAM",
          "Ver DHCP lease",
          "Ver MAC e porta de switch"
        ]
      },
      {
        "symptom": "Nova subnet cloud não comunica com on-premises.",
        "probableCause": "Peering/VPN sem rota ou CIDR conflitante.",
        "checks": [
          "Tabela de rotas cloud",
          "BGP/rotas estáticas",
          "NSG/security groups"
        ]
      }
    ],
    "method": [
      "Confirmar IP, máscara e gateway",
      "Identificar sub-rede e dono no IPAM",
      "Verificar se há sobreposição",
      "Checar rota local e rota remota",
      "Validar firewall e logs",
      "Documentar evidência sanitizada"
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup exemplo.local",
        "purpose": "Coletar configuração local, rotas e resolução DNS.",
        "expectedObservation": "IP, gateway, DNS e rotas coerentes com o cenário.",
        "interpretation": "Falhas nessa etapa indicam problemas de base antes da aplicação."
      }
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
      "Manter IPAM atualizado com dono, função, ambiente e status.",
      "Separar blocos por criticidade e função.",
      "Evitar allowlists amplas e rotas desnecessárias.",
      "Validar sobreposição antes de criar VPCs, VNets, VPNs e novas VLANs.",
      "Registrar mudanças de endereçamento em processo de change management.",
      "Usar logs, NAC, DHCP snooping e inventário para mapear IP para ativo."
    ],
    "badPractices": [
      "Escolher CIDR na hora sem consultar IPAM.",
      "Usar 0.0.0.0/0 como atalho em regra interna.",
      "Misturar convidados, servidores e gerência em blocos sem política.",
      "Criar redes de terceiros dentro do mesmo espaço confiável.",
      "Documentar plano apenas em planilha local sem controle de versão."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral facilitado",
        "description": "Risco relacionado à aula 5.7 — Planejamento de endereçamento corporativo.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM"
      },
      {
        "name": "Exposição excessiva por CIDR amplo",
        "description": "Risco relacionado à aula 5.7 — Planejamento de endereçamento corporativo.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall por zona"
      },
      {
        "name": "Rota ambígua por sobreposição",
        "description": "Risco relacionado à aula 5.7 — Planejamento de endereçamento corporativo.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAC/802.1X"
      },
      {
        "name": "Falha de auditoria por ausência de dono",
        "description": "Risco relacionado à aula 5.7 — Planejamento de endereçamento corporativo.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "CMDB"
      },
      {
        "name": "Bypass acidental de segmentação",
        "description": "Risco relacionado à aula 5.7 — Planejamento de endereçamento corporativo.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Validação de IaC"
      }
    ],
    "mitigations": [
      "IPAM",
      "Firewall por zona",
      "NAC/802.1X",
      "CMDB",
      "Validação de IaC",
      "Revisão de arquitetura",
      "Logs em SIEM",
      "Segmentação por função"
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
      "IPAM",
      "Firewall por zona",
      "NAC/802.1X",
      "CMDB",
      "Validação de IaC",
      "Revisão de arquitetura",
      "Logs em SIEM",
      "Segmentação por função"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "commands": {
    "windows": [
      "ipconfig /all",
      "route print",
      "arp -a",
      "nslookup <nome>",
      "Test-NetConnection <destino> -Port 443"
    ],
    "linux": [
      "ip addr",
      "ip route",
      "ip neigh",
      "dig <nome>",
      "curl -v https://<destino>",
      "ipcalc 10.10.20.0/24"
    ],
    "cisco": [
      "show ip interface brief",
      "show vlan brief",
      "show ip route",
      "show arp",
      "show running-config | include ip address"
    ],
    "cloud": [
      "Listar VPCs/VNets e CIDRs",
      "Listar subnets",
      "Listar route tables",
      "Listar security groups/NSGs",
      "Validar peering e VPN"
    ]
  },
  "mentorQuestions": [
    "Ao olhar um IP interno, você consegue inferir localidade e função? Se não, o que falta no plano?",
    "Quais blocos da sua organização jamais deveriam ser liberados integralmente em firewall?",
    "Se amanhã fosse criada uma VPN com fornecedor, como você provaria que não existe sobreposição?"
  ],
  "quiz": [
    {
      "question": "Qual é a principal diferença entre calcular uma sub-rede e planejar endereçamento corporativo?",
      "options": [
        "Planejamento inclui função, dono, segurança, crescimento e integração",
        "Planejamento ignora CIDR",
        "Planejamento só serve para redes públicas",
        "Planejamento substitui firewall"
      ],
      "answer": 0,
      "explanation": "Planejamento corporativo usa cálculo, mas adiciona contexto operacional, segurança, governança e crescimento."
    },
    {
      "question": "Por que CIDR sobreposto é problemático em VPN?",
      "options": [
        "Porque gera ambiguidade de rota",
        "Porque impede DNS público",
        "Porque muda o MAC do host",
        "Porque desativa ICMP"
      ],
      "answer": 0,
      "explanation": "Se os dois lados usam o mesmo bloco, o roteamento não sabe distinguir corretamente origem e destino sem NAT ou redesenho."
    },
    {
      "question": "Qual artefato ajuda a saber dono, função e status de um bloco?",
      "options": [
        "IPAM",
        "ARP cache",
        "TTL",
        "MTU"
      ],
      "answer": 0,
      "explanation": "IPAM registra e governa blocos, sub-redes, donos, status e uso."
    },
    {
      "question": "Qual é uma má prática de firewall relacionada a endereçamento?",
      "options": [
        "Permitir /16 por comodidade",
        "Liberar o menor CIDR necessário",
        "Documentar dono do bloco",
        "Separar DMZ de usuários"
      ],
      "answer": 0,
      "explanation": "CIDR amplo demais aumenta exposição e movimento lateral."
    },
    {
      "question": "Por que separar blocos por função ajuda segurança?",
      "options": [
        "Porque facilita políticas entre zonas e análise de logs",
        "Porque elimina a necessidade de autenticação",
        "Porque transforma IP privado em IP público",
        "Porque evita qualquer malware automaticamente"
      ],
      "answer": 0,
      "explanation": "A separação por função permite regras mais precisas e interpretação melhor de eventos."
    },
    {
      "question": "O que deve acontecer antes de criar uma nova VPC/VNet?",
      "options": [
        "Validar CIDR contra IPAM e integrações existentes",
        "Escolher qualquer /16 livre na cabeça",
        "Liberar 0.0.0.0/0 por padrão",
        "Desativar logs"
      ],
      "answer": 0,
      "explanation": "Validação prévia evita sobreposição e retrabalho."
    }
  ],
  "flashcards": [
    {
      "front": "O que é planejamento de endereçamento corporativo?",
      "back": "É a governança de blocos IPv4 por localidade, função, ambiente, segurança, dono e crescimento."
    },
    {
      "front": "O que é IPAM?",
      "back": "Sistema ou processo para gerenciar blocos, sub-redes, IPs, donos, status e documentação de endereçamento."
    },
    {
      "front": "Por que CIDR sobreposto é perigoso?",
      "back": "Porque causa ambiguidade de rotas, quebra VPN/peering e pode exigir NAT ou redesenho."
    },
    {
      "front": "Por que não usar /24 para tudo?",
      "back": "Porque desperdiça endereços, reduz precisão de políticas e pode dificultar crescimento planejado."
    },
    {
      "front": "Qual é o risco de allowlist ampla?",
      "back": "Aumenta superfície de ataque e facilita movimento lateral."
    },
    {
      "front": "O que documentar por sub-rede?",
      "back": "CIDR, função, localidade, VLAN, gateway, DHCP, reservas, dono, status e controles de segurança."
    }
  ],
  "exercises": [
    {
      "title": "Classifique blocos por domínio",
      "prompt": "Proponha blocos macro para matriz, filial, cloud produção, homologação e VPN de fornecedor usando espaço privado sem sobreposição.",
      "expectedAnswer": "Uma divisão coerente, por exemplo 10.10.0.0/16, 10.20.0.0/16, 10.50.0.0/16, 10.60.0.0/16 e bloco específico para terceiros."
    },
    {
      "title": "Detecte risco de sobreposição",
      "prompt": "A matriz usa 10.10.0.0/16 e uma VPC foi proposta como 10.10.20.0/24. Qual o problema?",
      "expectedAnswer": "A VPC está dentro do bloco da matriz e pode sobrepor rotas e políticas existentes."
    },
    {
      "title": "Refine uma allowlist",
      "prompt": "Uma regra permite 10.10.0.0/16 para acessar banco de dados. O servidor de aplicação está em 10.10.20.0/24. O que melhorar?",
      "expectedAnswer": "Reduzir a regra para o menor bloco necessário, idealmente sub-rede ou hosts específicos da aplicação."
    },
    {
      "title": "Documente uma sub-rede",
      "prompt": "Crie uma linha de IPAM para uma rede de gerência com CIDR, VLAN, gateway, DHCP, dono e status.",
      "expectedAnswer": "Exemplo: 10.10.30.0/27, VLAN 30, gateway 10.10.30.1, sem DHCP ou com reservas, dono Redes, status ativo."
    },
    {
      "id": "ex5.7.v2-final-pratica-equivalente",
      "type": "prático",
      "prompt": "Produza uma evidência curta do aprendizado desta aula: cálculo, tabela, matriz de decisão, desenho lógico ou explicação de troubleshooting relacionada ao tema.",
      "expectedAnswer": "A resposta deve conter artefato verificável, como tabela de sub-redes, cálculo de bloco, matriz de requisitos, justificativa de prefixo ou diagnóstico de erro comum.",
      "explanation": "Na versão v2.0, esta aula usa prática equivalente no lugar de laboratório independente para evitar laboratório genérico e concentrar execução nos labs integradores do módulo."
    }
  ],
  "challenge": {
    "title": "Plano corporativo para empresa híbrida",
    "description": "Desenhe um plano para matriz, duas filiais, cloud produção, cloud homologação e VPN de fornecedor. Inclua blocos macro, sub-redes funcionais, gateways, DHCP, dono, status e controles de segurança.",
    "constraints": [
      "Não pode haver sobreposição",
      "Cada segmento deve ter função clara",
      "Ambientes produtivos e não produtivos devem ser separados",
      "VPN de fornecedor deve receber o menor escopo possível",
      "O plano deve reservar crescimento"
    ],
    "rubric": [
      "Hierarquia de blocos",
      "VLSM correto",
      "Segurança por zona",
      "Documentação IPAM",
      "Validação de cloud/VPN",
      "Clareza operacional"
    ],
    "expectedDeliverables": [
      "Evidência prática equivalente em vez de lab independente"
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução adequada separa blocos grandes por domínio, subdivide por função, documenta dono e status, valida sobreposição e evita permissões amplas.",
    "steps": [
      "Reservar blocos macro para matriz, filiais, cloud e terceiros.",
      "Aplicar VLSM por função dentro de cada domínio.",
      "Definir gateway, VLAN, DHCP, reservas e dono.",
      "Associar cada sub-rede a uma zona de firewall.",
      "Validar sobreposição com VPN e cloud.",
      "Registrar a matriz em IPAM/CMDB/Git com controle de versão."
    ],
    "exampleTable": [
      {
        "domain": "Matriz",
        "cidr": "10.10.0.0/16",
        "purpose": "Redes on-premises principais",
        "owner": "Redes"
      },
      {
        "domain": "Cloud produção",
        "cidr": "10.50.0.0/16",
        "purpose": "VPC/VNet produção",
        "owner": "Cloud Platform"
      },
      {
        "domain": "Cloud homologação",
        "cidr": "10.60.0.0/16",
        "purpose": "Ambientes não produtivos",
        "owner": "DevSecOps"
      },
      {
        "domain": "Fornecedor",
        "cidr": "10.90.10.0/28",
        "purpose": "Integração específica",
        "owner": "Segurança"
      }
    ]
  },
  "glossary": [
    {
      "term": "IPAM",
      "definition": "Gerenciamento de endereços IP, blocos, sub-redes, donos, status e uso."
    },
    {
      "term": "CIDR sobreposto",
      "definition": "Situação em que dois domínios usam faixas iguais ou contidas uma na outra, causando conflito de rota."
    },
    {
      "term": "Bloco macro",
      "definition": "Bloco maior reservado para um domínio, como matriz, cloud ou filiais."
    },
    {
      "term": "Zona de segurança",
      "definition": "Agrupamento lógico usado para aplicar políticas de firewall e controle de acesso."
    },
    {
      "term": "Sumarização",
      "definition": "Representar múltiplas redes menores por uma rota maior quando elas são contíguas e planejadas."
    },
    {
      "term": "Owner",
      "definition": "Equipe ou pessoa responsável por um bloco, sub-rede ou política associada."
    }
  ],
  "references": [
    {
      "title": "Redes e Network — Módulo 4",
      "description": "Base de IPv4, gateway, DHCP, ICMP e troubleshooting."
    },
    {
      "title": "Redes e Network — Módulo 5 aulas 5.1 a 5.6",
      "description": "Base de subnetting, VLSM e cálculo de blocos."
    },
    {
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "description": "Relaciona endereçamento com IaC, cloud, GitOps e pipelines de validação."
    },
    {
      "title": "Enterprise Identity, IAM e Segurança de Identidades",
      "description": "Ajuda a entender como segmentação de rede complementa identidade, autorização e acesso mínimo."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "reason": "Endereçamento cloud deve ser planejado antes de provisionar VPCs, VNets, subnets e peerings."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso mínimo e Zero Trust",
      "reason": "Segmentação de rede complementa controles de identidade e autorização."
    }
  ],
  "progressRules": {
    "requiredQuizScore": 70,
    "requiredLabCompletion": true,
    "requiredFlashcardsReviewed": 4,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.8"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "practicalExerciseDone",
        "exerciseDone"
      ]
    }
  }
};
