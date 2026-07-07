export const lesson0510 = {
  "id": "5.10",
  "moduleId": "m05",
  "order": 10,
  "title": "Revisão prática e desafios de subnetting",
  "subtitle": "Consolidação completa de CIDR, máscara, hosts, rede, broadcast, bloco mágico, VLSM, planejamento corporativo, Packet Tracer, segurança e cloud antes de avançar para os próximos temas de roteamento e serviços de rede.",
  "duration": "100-150 min",
  "estimatedStudyTimeMinutes": 150,
  "difficulty": "intermediário",
  "type": "ligação/revisão",
  "xp": 260,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "cidr",
    "vlsm",
    "packet tracer",
    "planejamento",
    "segurança",
    "cloud",
    "ipam",
    "troubleshooting",
    "revisão"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "reason": "Explicou por que subnetting existe e qual problema redes planas causam."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.2",
      "reason": "Ensinou CIDR, máscara e quantidade de hosts."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.3",
      "reason": "Ensinou rede, broadcast, primeiro e último host."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.4",
      "reason": "Apresentou o método do bloco mágico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.6",
      "reason": "Introduziu VLSM e alocação de sub-redes de tamanhos diferentes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.9",
      "reason": "Relacionou subnetting com segurança, cloud, governança e redução de blast radius."
    },
    {
      "type": "course-link",
      "course": "Redes e Network",
      "module": "m04",
      "reason": "Todo o módulo 5 depende dos fundamentos de IPv4, gateway, DHCP, ICMP e troubleshooting estudados no módulo 4."
    }
  ],
  "objectives": [
    "Consolidar o raciocínio completo de subnetting sem depender de memorização cega.",
    "Resolver desafios envolvendo CIDR, máscara, rede, broadcast, primeiro host e último host.",
    "Aplicar bloco mágico e VLSM em cenários domésticos, corporativos, Packet Tracer, cloud e segurança.",
    "Detectar sobreposição, desperdício, CIDR amplo demais, gateway inválido e planejamento inseguro.",
    "Construir uma matriz final de endereçamento com sub-redes, gateways, DHCP, reservas, propósito e controles.",
    "Preparar a transição para roteamento, NAT, DNS, serviços de rede e módulos avançados do curso."
  ],
  "learningOutcomes": [
    "Dado um IP com CIDR, o aluno identifica rede, broadcast, primeiro e último host.",
    "Dado um conjunto de demandas, o aluno escolhe prefixos adequados e monta um plano VLSM sem sobreposição.",
    "Dado um desenho inseguro, o aluno aponta riscos de CIDR amplo, zona mal definida e roteamento excessivo.",
    "Dado um laboratório Packet Tracer, o aluno valida conectividade e identifica erro de máscara, gateway ou rota.",
    "Dado um cenário cloud, o aluno propõe sub-redes por zona e controles mínimos de comunicação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Subnetting é um dos primeiros assuntos em redes em que o aluno sente que realmente precisa raciocinar. Não basta saber que IPv4 tem 32 bits. É necessário olhar para um endereço, entender a máscara, descobrir onde a rede começa, onde termina, quais endereços podem ser usados, qual gateway faz sentido e qual bloco ainda está livre para crescimento.</p>\n<p>Em ambientes reais, esse raciocínio aparece em situações muito concretas: criar uma VLAN nova, separar Wi-Fi corporativo de convidados, planejar uma DMZ, conectar uma filial por VPN, desenhar uma VPC na cloud, revisar uma regra de firewall, diagnosticar um host com gateway errado ou explicar por que dois ambientes não podem usar o mesmo CIDR.</p>\n<div class=\"callout callout--security\"><strong>Motivação central:</strong> quem domina subnetting deixa de copiar números e passa a entender o território da rede. Isso reduz erro operacional, melhora segurança e aumenta a qualidade das decisões de arquitetura.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>O subnetting nasceu como resposta a um problema de escala. O IPv4 precisava permitir que uma organização dividisse um bloco em partes menores, evitando desperdício e permitindo roteamento mais organizado. Com o tempo, essa divisão passou a ter também papel operacional e de segurança.</p>\n<p>Primeiro, o foco era economizar endereços e reduzir broadcast. Depois, a segmentação passou a separar departamentos, servidores, impressoras, convidados e gerência. Em seguida, redes corporativas começaram a associar sub-redes a zonas de segurança, firewalls, ACLs, VPNs e monitoramento.</p>\n<p>Na cloud, subnetting permaneceu importante, mas ganhou nova forma. VPCs, VNets, route tables, subnets públicas, subnets privadas, NAT gateways, firewalls gerenciados, private endpoints e Kubernetes ainda dependem de blocos CIDR bem escolhidos. A matemática é antiga; os impactos são modernos.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema desta aula é integrar tudo. Saber calcular uma sub-rede isolada é importante, mas insuficiente. Em uma empresa, você precisa lidar com múltiplas demandas ao mesmo tempo: usuários, servidores, DMZ, gerência, Wi-Fi, VPN, cloud, laboratório, observabilidade e crescimento futuro.</p>\n<table class=\"data-table\"><thead><tr><th>Erro comum</th><th>Consequência</th><th>Correção esperada</th></tr></thead><tbody>\n<tr><td>Escolher /24 para tudo</td><td>Desperdício, redes grandes e blast radius maior</td><td>Escolher prefixo por demanda real e crescimento</td></tr>\n<tr><td>Não reservar espaço</td><td>Reendereçamento forçado no futuro</td><td>Planejar folga por localidade e função</td></tr>\n<tr><td>Sobrepor CIDR com VPN/cloud</td><td>Rotas ambíguas e conectividade quebrada</td><td>Validar com IPAM antes da mudança</td></tr>\n<tr><td>Gateway fora da sub-rede</td><td>Hosts não conseguem sair da rede local</td><td>Validar rede, hosts utilizáveis e máscara</td></tr>\n<tr><td>Firewall amplo demais</td><td>Segmentação vira apenas desenho</td><td>Aplicar matriz de comunicação mínima</td></tr>\n</tbody></table>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> subnetting é fácil de errar porque números aparentemente próximos podem pertencer a redes diferentes. Um único bit errado pode criar falha de conectividade, exposição indevida ou sobreposição difícil de diagnosticar.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do raciocínio do aluno em subnetting normalmente passa por cinco etapas. Primeiro, ele decora máscaras. Depois, entende bits. Em seguida, aprende a calcular rede e broadcast. Depois, aplica bloco mágico. Por fim, usa VLSM e planejamento para resolver problemas reais.</p>\n<ol class=\"flow-list\">\n<li><strong>Decoração:</strong> saber que /24 é 255.255.255.0, mas sem entender profundamente.</li>\n<li><strong>Bits:</strong> perceber que o prefixo define bits de rede e bits de host.</li>\n<li><strong>Limites:</strong> calcular rede, broadcast, primeiro e último host.</li>\n<li><strong>Método:</strong> usar bloco mágico para acelerar e auditar cálculos.</li>\n<li><strong>Arquitetura:</strong> escolher sub-redes por função, segurança, crescimento, cloud e operação.</li>\n</ol>\n<p>Esta aula revisa as cinco etapas e força a aplicação em cenários integrados.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Revisar subnetting</strong> não é repetir fórmulas. É praticar um processo mental: identificar o bloco, entender a máscara, calcular limites, validar hosts, evitar sobreposição, escolher prefixos adequados e justificar a decisão com critérios técnicos.</p>\n<div class=\"definition-box\"><strong>Definição operacional:</strong> um bom plano de subnetting é uma tabela auditável que mostra CIDR, máscara, rede, broadcast, gateway, faixa DHCP, reservas, função, dono, controles de segurança e espaço de crescimento.</div>\n<table class=\"comparison-table\"><thead><tr><th>Pergunta</th><th>O que ela testa</th></tr></thead><tbody>\n<tr><td>Qual é a rede de 10.20.30.77/27?</td><td>Cálculo de bloco e octeto interessante</td></tr>\n<tr><td>Quantos hosts úteis cabem em /26?</td><td>Bits de host e fórmula tradicional</td></tr>\n<tr><td>Esse gateway pertence à sub-rede?</td><td>Validação de faixa utilizável</td></tr>\n<tr><td>Essas duas sub-redes se sobrepõem?</td><td>Planejamento e governança</td></tr>\n<tr><td>Esse CIDR é seguro para allowlist?</td><td>Segurança e blast radius</td></tr>\n</tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>O funcionamento interno do subnetting continua baseado nos 32 bits do IPv4. O CIDR informa quantos bits pertencem à rede. Os bits restantes pertencem aos hosts. A máscara decimal é apenas uma forma humana de representar essa divisão.</p>\n<p>Quando você calcula uma sub-rede, está encontrando o intervalo de endereços que compartilham os mesmos bits de rede. O primeiro endereço desse intervalo é o endereço de rede. O último endereço é o broadcast tradicional. Entre eles ficam os hosts utilizáveis, com exceções importantes em contextos como /31, /32 e reservas de provedores cloud.</p>\n<ol class=\"flow-list\">\n<li>Leia o IP e o prefixo.</li>\n<li>Converta o prefixo em máscara ou identifique o octeto interessante.</li>\n<li>Calcule o tamanho do bloco.</li>\n<li>Encontre em qual bloco o IP cai.</li>\n<li>Determine rede, próximo bloco, broadcast, primeiro host e último host.</li>\n<li>Valide gateway, DHCP, reservas, rotas e regras de firewall.</li>\n</ol>\n<div class=\"callout callout--warning\"><strong>Ponto crítico:</strong> o host não escolhe gateway por proximidade numérica. Ele usa IP, máscara e tabela de rotas para decidir se o destino é local ou remoto.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em arquitetura, subnetting aparece como mapa lógico da organização. Ele não é apenas cálculo: é um desenho que conecta camada 3, VLANs, gateways, DHCP, firewall, roteamento, VPN, cloud, logs, IPAM e governança.</p>\n<table class=\"data-table\"><thead><tr><th>Camada/Componente</th><th>Relação com subnetting</th></tr></thead><tbody>\n<tr><td>VLAN</td><td>Normalmente cada VLAN tem uma sub-rede associada</td></tr>\n<tr><td>Gateway</td><td>Endereço que permite sair da sub-rede</td></tr>\n<tr><td>DHCP</td><td>Entrega IPs dentro da faixa planejada</td></tr>\n<tr><td>Firewall</td><td>Controla comunicação entre CIDRs</td></tr>\n<tr><td>Roteamento</td><td>Encaminha pacotes entre sub-redes</td></tr>\n<tr><td>Cloud</td><td>Usa subnets, route tables, NAT e endpoints</td></tr>\n<tr><td>IPAM</td><td>Evita sobreposição e documenta dono/função</td></tr>\n</tbody></table>\n<p>Uma arquitetura madura não cria sub-redes aleatoriamente. Ela separa por função, criticidade, localidade, ambiente e requisitos de segurança.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em uma empresa grande como um campus. O bloco IPv4 total é o terreno. Subnetting é dividir esse terreno em prédios, andares e salas. Uma sala pode ser para visitantes, outra para diretoria, outra para servidores, outra para equipamentos de manutenção e outra para laboratório.</p>\n<p>Se todo mundo fica em um único salão aberto, é simples andar, mas difícil controlar acesso, investigar problemas e isolar incidentes. Se o campus é dividido com planejamento, cada área tem função, entrada, controle, responsável e capacidade.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> paredes físicas não são iguais a sub-redes. Em redes, a separação só vira segurança real quando há rotas, firewalls, autenticação, criptografia e logs coerentes.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Você recebeu o IP <code>192.168.10.77/26</code>. O prefixo /26 equivale à máscara <code>255.255.255.192</code>. O bloco mágico é <code>256 - 192 = 64</code>. Os blocos no último octeto são 0, 64, 128 e 192.</p>\n<table class=\"data-table\"><tbody>\n<tr><th>IP analisado</th><td><code>192.168.10.77/26</code></td></tr>\n<tr><th>Bloco onde cai</th><td><code>192.168.10.64/26</code></td></tr>\n<tr><th>Broadcast</th><td><code>192.168.10.127</code></td></tr>\n<tr><th>Primeiro host</th><td><code>192.168.10.65</code></td></tr>\n<tr><th>Último host</th><td><code>192.168.10.126</code></td></tr>\n<tr><th>Gateway possível</th><td><code>192.168.10.65</code> ou outro host dentro da faixa</td></tr>\n</tbody></table>\n<p>Se alguém configurar gateway <code>192.168.10.1</code> nesse host, o gateway estará em outra sub-rede para essa máscara. O problema não é o cabo, nem DNS, nem Internet: é endereçamento.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Uma empresa recebeu o bloco <code>10.30.0.0/23</code> para uma filial. Ela precisa acomodar usuários, telefonia, impressoras, convidados, gerência, servidores locais e links ponto a ponto. Usar um /24 para cada item não cabe. A solução é VLSM.</p>\n<table class=\"data-table\"><thead><tr><th>Segmento</th><th>Demanda</th><th>CIDR sugerido</th><th>Motivo</th></tr></thead><tbody>\n<tr><td>Usuários</td><td>180 hosts</td><td><code>10.30.0.0/24</code></td><td>Maior demanda e crescimento</td></tr>\n<tr><td>Wi-Fi convidados</td><td>90 hosts</td><td><code>10.30.1.0/25</code></td><td>Isolado e controlado</td></tr>\n<tr><td>Telefonia</td><td>40 hosts</td><td><code>10.30.1.128/26</code></td><td>QoS e política própria</td></tr>\n<tr><td>Impressoras</td><td>20 hosts</td><td><code>10.30.1.192/27</code></td><td>Acesso restrito</td></tr>\n<tr><td>Gerência</td><td>10 hosts</td><td><code>10.30.1.224/28</code></td><td>Administrativo e sensível</td></tr>\n<tr><td>Links</td><td>pares ponto a ponto</td><td><code>/30</code> ou <code>/31</code></td><td>Economia e clareza</td></tr>\n</tbody></table>\n<p>O plano precisa ser acompanhado de VLANs, gateways, DHCP, firewall, documentação e validação de rotas.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, uma VPC/VNet não deve ser desenhada apenas para caber máquinas virtuais. Ela precisa representar zonas de exposição e caminhos de tráfego. Subnets públicas devem ser mínimas e controladas. Subnets privadas devem receber aplicações e dados. Serviços administrativos devem ficar atrás de VPN, bastion, PAM ou private endpoints.</p>\n<table class=\"data-table\"><thead><tr><th>Zona cloud</th><th>CIDR exemplo</th><th>Rota típica</th><th>Controle</th></tr></thead><tbody>\n<tr><td>Public ingress</td><td><code>10.50.0.0/27</code></td><td>Internet Gateway/WAF</td><td>Somente balanceadores/proxies</td></tr>\n<tr><td>Aplicação privada</td><td><code>10.50.0.32/26</code></td><td>NAT/firewall</td><td>Security groups mínimos</td></tr>\n<tr><td>Dados</td><td><code>10.50.0.96/27</code></td><td>Sem rota pública</td><td>Acesso apenas da aplicação</td></tr>\n<tr><td>Integração</td><td><code>10.50.1.0/26</code></td><td>VPN/peering</td><td>Sem sobreposição</td></tr>\n</tbody></table>\n<p>O maior erro cloud é tratar subnet pública como local conveniente para qualquer servidor. A pergunta correta é: este recurso realmente precisa de rota pública?</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, subnetting aparece dentro de IaC, revisão de pull request, validação de policy as code e automação de ambientes. Um erro de CIDR em Terraform, Bicep, CloudFormation ou Pulumi pode criar sobreposição, exposição pública, roteamento incorreto ou regra permissiva demais.</p>\n<p>Um pipeline maduro pode validar se o CIDR proposto colide com blocos existentes, se uma subnet de dados possui rota pública, se uma regra usa <code>0.0.0.0/0</code> em porta administrativa, se tags obrigatórias existem e se o plano foi aprovado por rede/segurança.</p>\n<div class=\"callout callout--security\"><strong>Prática recomendada:</strong> tratar endereçamento como código. Mudança de subnet, rota e firewall deve passar por revisão, teste, documentação e rollback planejado.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Durante um incidente, saber subnetting ajuda a responder perguntas fundamentais: qual zona foi afetada? O host está em rede de usuário, servidor, gerência ou dados? Quais outros ativos compartilham o mesmo CIDR? Há comunicação permitida para outras zonas? Os logs mostram tráfego lateral?</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Sinal</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>CIDR amplo em allowlist</td><td>Regras com /16, /8 ou 0.0.0.0/0</td><td>Reduzir origem/destino ao mínimo necessário</td></tr>\n<tr><td>Rede plana</td><td>Usuários alcançam servidores críticos diretamente</td><td>Separar sub-redes e aplicar firewall</td></tr>\n<tr><td>Sobreposição VPN/cloud</td><td>Rotas conflitantes e destinos ambíguos</td><td>IPAM e validação antes de conectar</td></tr>\n<tr><td>Banco em subnet pública</td><td>Rota para Internet e exposição indevida</td><td>Subnet privada, SG/ACL mínimo e private endpoint</td></tr>\n<tr><td>Logs sem contexto</td><td>IP aparece sem dono ou função</td><td>IPAM, CMDB, tags e SIEM enriquecido</td></tr>\n</tbody></table>\n<p>Subnetting não impede ataque sozinho, mas fornece fronteiras que facilitam prevenção, detecção, contenção e investigação.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama abaixo resume o fluxo mental da revisão: partir de um bloco, calcular sub-redes, validar limites, associar função, aplicar controles e documentar.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1040 640\" role=\"img\" aria-labelledby=\"m05l10-title m05l10-desc\">\n<title id=\"m05l10-title\">Fluxo de revisão prática de subnetting</title>\n<desc id=\"m05l10-desc\">Diagrama com bloco IPv4 sendo dividido em sub-redes, validado por cálculo, aplicado a zonas e controlado por firewall, IPAM e documentação.</desc>\n<defs><marker id=\"m05l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker></defs>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"60\" y=\"70\" width=\"220\" height=\"105\" rx=\"14\"></rect><text x=\"95\" y=\"110\" class=\"svg-label\">Bloco base</text><text x=\"95\" y=\"140\" class=\"svg-label--small\">10.60.0.0/22</text></g>\n<g class=\"svg-node svg-node--router\"><rect x=\"410\" y=\"70\" width=\"220\" height=\"105\" rx=\"14\"></rect><text x=\"450\" y=\"108\" class=\"svg-label\">Cálculo</text><text x=\"438\" y=\"138\" class=\"svg-label--small\">CIDR, bloco, limites</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"760\" y=\"70\" width=\"220\" height=\"105\" rx=\"14\"></rect><text x=\"795\" y=\"108\" class=\"svg-label\">Sub-redes</text><text x=\"790\" y=\"138\" class=\"svg-label--small\">função e crescimento</text></g>\n<g class=\"svg-node svg-node--client\"><rect x=\"90\" y=\"300\" width=\"180\" height=\"110\" rx=\"14\"></rect><text x=\"123\" y=\"338\" class=\"svg-label\">Usuários</text><text x=\"110\" y=\"368\" class=\"svg-label--small\">10.60.0.0/24</text></g>\n<g class=\"svg-node svg-node--server\"><rect x=\"320\" y=\"300\" width=\"180\" height=\"110\" rx=\"14\"></rect><text x=\"360\" y=\"338\" class=\"svg-label\">Servidores</text><text x=\"340\" y=\"368\" class=\"svg-label--small\">10.60.1.0/25</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"550\" y=\"300\" width=\"180\" height=\"110\" rx=\"14\"></rect><text x=\"594\" y=\"338\" class=\"svg-label\">DMZ</text><text x=\"570\" y=\"368\" class=\"svg-label--small\">10.60.1.128/27</text></g>\n<g class=\"svg-node svg-node--security\"><rect x=\"780\" y=\"300\" width=\"180\" height=\"110\" rx=\"14\"></rect><text x=\"815\" y=\"338\" class=\"svg-label\">Gerência</text><text x=\"800\" y=\"368\" class=\"svg-label--small\">10.60.1.160/28</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"280\" y=\"500\" width=\"220\" height=\"90\" rx=\"14\"></rect><text x=\"320\" y=\"535\" class=\"svg-label\">Controles</text><text x=\"306\" y=\"562\" class=\"svg-label--small\">firewall / rotas / NAC</text></g>\n<g class=\"svg-node svg-node--server\"><rect x=\"560\" y=\"500\" width=\"220\" height=\"90\" rx=\"14\"></rect><text x=\"612\" y=\"535\" class=\"svg-label\">IPAM</text><text x=\"590\" y=\"562\" class=\"svg-label--small\">dono / status / logs</text></g>\n<line x1=\"280\" y1=\"122\" x2=\"410\" y2=\"122\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l10-arrow)\"></line>\n<line x1=\"630\" y1=\"122\" x2=\"760\" y2=\"122\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l10-arrow)\"></line>\n<line x1=\"870\" y1=\"175\" x2=\"180\" y2=\"300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l10-arrow)\"></line>\n<line x1=\"870\" y1=\"175\" x2=\"410\" y2=\"300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l10-arrow)\"></line>\n<line x1=\"870\" y1=\"175\" x2=\"640\" y2=\"300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l10-arrow)\"></line>\n<line x1=\"870\" y1=\"175\" x2=\"870\" y2=\"300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l10-arrow)\"></line>\n<line x1=\"500\" y1=\"410\" x2=\"390\" y2=\"500\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m05l10-arrow)\"></line>\n<line x1=\"730\" y1=\"410\" x2=\"670\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l10-arrow)\"></line>\n<text x=\"70\" y=\"620\" class=\"svg-label--small\">Revisão prática: calcular corretamente, aplicar função, controlar comunicação, documentar e validar antes de operar.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Prática equivalente</h2>\n<p><strong>Aula 5.10 convertida para prática equivalente</strong></p>\n<p>O conteúdo desta aula é melhor fixado por cálculo guiado, diagnóstico, matriz ou desafio curto. O laboratório independente foi removido para evitar atividade artificial e concentrar a execução pesada nos quatro labs integradores do M05.</p>\n<div class=\"callout callout--mentor\"><strong>Política v2.0:</strong> esta aula não mantém laboratório independente. A fixação acontece por exercícios, desafio, solução comentada e pelos quatro labs integradores do M05.</div>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios misturam cálculo puro, interpretação de cenário, análise de falhas, escolha de prefixo, VLSM, segurança e cloud. A intenção é aproximar subnetting de problemas reais de trabalho.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio final pede que você desenhe o endereçamento de uma empresa híbrida com matriz, cloud, VPN, DMZ, usuários, servidores, gerência e observabilidade, justificando cada escolha.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra um plano possível, explica os cálculos, aponta trade-offs e destaca decisões de segurança, crescimento, documentação e troubleshooting.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Você concluiu o módulo de subnetting. Agora deve conseguir transformar um bloco IPv4 em sub-redes úteis, calcular limites, escolher prefixos, aplicar VLSM, planejar endereçamento corporativo, montar laboratórios no Packet Tracer e relacionar subnetting com segurança e cloud.</p>\n<p>O ponto mais importante é lembrar que subnetting não é apenas matemática. É arquitetura operacional: define fronteiras, caminhos, responsabilidades, capacidade, políticas e evidências.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>No próximo módulo, o curso avança para o tema que naturalmente vem depois de endereçamento e subnetting: <strong>roteamento IPv4</strong>. Você estudará rotas, tabela de roteamento, next hop, rota default, rotas estáticas, roteamento entre redes e troubleshooting de caminhos.</p>\n</section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula fecha o módulo de subnetting e prepara o aluno para roteamento IPv4, NAT, firewall, serviços de rede e cloud networking.",
    "previousConcepts": [
      "IPv4",
      "CIDR",
      "máscara",
      "rede",
      "broadcast",
      "gateway",
      "ARP",
      "DHCP",
      "ICMP",
      "VLSM",
      "Packet Tracer",
      "IPAM",
      "segmentação"
    ],
    "nextConcepts": [
      "roteamento IPv4",
      "tabela de rotas",
      "next hop",
      "rota estática",
      "rota default",
      "roteamento inter-VLAN",
      "NAT",
      "firewall"
    ]
  },
  "protocolFields": [
    {
      "name": "CIDR",
      "description": "Prefixo que indica quantos bits do IPv4 pertencem à rede."
    },
    {
      "name": "Máscara decimal",
      "description": "Representação humana da divisão entre bits de rede e bits de host."
    },
    {
      "name": "Endereço de rede",
      "description": "Primeiro endereço do bloco, usado para identificar a sub-rede."
    },
    {
      "name": "Broadcast",
      "description": "Último endereço tradicional do bloco, usado para broadcast IPv4 na sub-rede."
    },
    {
      "name": "Primeiro host",
      "description": "Primeiro endereço normalmente utilizável por um host."
    },
    {
      "name": "Último host",
      "description": "Último endereço normalmente utilizável antes do broadcast."
    },
    {
      "name": "Gateway",
      "description": "Host ou interface de roteamento dentro da sub-rede que permite alcançar outras redes."
    },
    {
      "name": "Escopo DHCP",
      "description": "Intervalo configurado para entrega automática de endereços aos hosts."
    },
    {
      "name": "Reserva",
      "description": "Endereço separado para gateway, servidor, impressora, AP, câmera, equipamento de rede ou serviço crítico."
    },
    {
      "name": "Dono e finalidade",
      "description": "Metadados de IPAM que indicam quem responde pelo bloco e por que ele existe."
    }
  ],
  "packetFlow": [
    "O arquiteto recebe um bloco base e lista as demandas por função, quantidade de hosts e criticidade.",
    "As demandas são ordenadas da maior para a menor quando VLSM é necessário.",
    "Para cada demanda, escolhe-se o menor prefixo suficiente com margem realista de crescimento.",
    "Calculam-se rede, broadcast, primeiro host, último host, gateway, DHCP e reservas.",
    "Valida-se se os blocos não se sobrepõem e se ainda há espaço livre documentado.",
    "Cada sub-rede é associada a VLAN, rota, firewall, dono, ambiente e controles mínimos.",
    "A conectividade é testada com ARP, ping, traceroute, tabela de rotas e, quando necessário, teste de porta/aplicação.",
    "A documentação final entra no IPAM, CMDB, Git ou ferramenta corporativa equivalente."
  ],
  "deepDive": {
    "title": "Como pensar subnetting em entrevista, prova, troubleshooting e arquitetura",
    "points": [
      "Em prova, comece por bits, bloco mágico e limites de rede/broadcast.",
      "Em troubleshooting, valide IP, máscara, gateway e rota antes de culpar DNS ou aplicação.",
      "Em arquitetura, escolha prefixos por função, crescimento, isolamento e política de comunicação.",
      "Em cloud, confirme rotas, NAT, endpoints privados, security groups e ausência de sobreposição.",
      "Em segurança, reduza blast radius com sub-redes menores e regras explícitas entre zonas.",
      "Em DevSecOps, valide CIDR e exposição ainda no pull request de IaC."
    ],
    "workedExample": "Recebendo 10.60.0.0/22 e demandas de 220 usuários, 80 convidados, 50 servidores, 20 DMZ, 12 gerência e 12 observabilidade: aloque primeiro 10.60.0.0/24 para usuários, depois 10.60.1.0/25 para convidados, 10.60.1.128/26 para servidores, 10.60.1.192/27 para DMZ, 10.60.1.224/28 para gerência e 10.60.1.240/28 para observabilidade, mantendo 10.60.2.0/23 livre para crescimento ou cloud/VPN."
  },
  "commonMistakes": [
    {
      "mistake": "Calcular hosts úteis antes de identificar corretamente o prefixo.",
      "impact": "O aluno usa fórmula certa em uma máscara errada.",
      "fix": "Sempre comece por IP, CIDR, máscara e octeto interessante."
    },
    {
      "mistake": "Confundir próximo bloco com broadcast.",
      "impact": "O broadcast fica um endereço acima do correto e a sub-rede invade a próxima.",
      "fix": "Broadcast é o endereço imediatamente anterior ao próximo bloco."
    },
    {
      "mistake": "Alocar VLSM do menor para o maior.",
      "impact": "Fragmenta o bloco e dificulta encaixar redes grandes.",
      "fix": "Ordenar demandas por tamanho, da maior para a menor."
    },
    {
      "mistake": "Usar gateway fora da sub-rede.",
      "impact": "O host não consegue alcançar destinos remotos.",
      "fix": "Validar gateway entre primeiro e último host utilizável."
    },
    {
      "mistake": "Assumir que subnetting bloqueia tráfego sozinho.",
      "impact": "A rede parece segmentada, mas continua toda liberada por rota/firewall.",
      "fix": "Combinar sub-redes com regras, rotas, NAC, logs e identidade."
    },
    {
      "mistake": "Não documentar blocos livres.",
      "impact": "Crescimento futuro vira improviso e sobreposição.",
      "fix": "Registrar espaço reservado e política de alocação."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host tem IP, mas não alcança gateway.",
      "Ping local funciona, mas destinos remotos não.",
      "Duas sub-redes parecem corretas, mas se sobrepõem parcialmente.",
      "DHCP entrega IP fora da faixa planejada.",
      "VPN conecta, mas alguns destinos ficam inacessíveis.",
      "Packet Tracer mostra ARP/ICMP falhando entre redes."
    ],
    "method": [
      "Coletar IP, máscara, gateway, DNS e rota default do host.",
      "Calcular rede, primeiro host, último host e broadcast.",
      "Confirmar se o gateway está dentro da mesma sub-rede do host.",
      "Verificar ARP para o gateway e tabela MAC/VLAN no switch.",
      "Testar gateway, destino por IP, destino por nome e porta de aplicação.",
      "Comparar sub-redes em IPAM para detectar sobreposição.",
      "Validar firewall, ACL, security group, route table e NAT quando houver cloud."
    ],
    "commands": [
      {
        "windows": [
          "ipconfig /all",
          "route print",
          "arp -a",
          "ping <gateway>",
          "tracert <destino>",
          "Test-NetConnection <host> -Port <porta>"
        ],
        "linux": [
          "ip addr",
          "ip route",
          "ip neigh",
          "ping -c 4 <gateway>",
          "traceroute <destino>",
          "ipcalc <ip>/<cidr>"
        ],
        "cisco": [
          "show ip interface brief",
          "show vlan brief",
          "show ip route",
          "show arp",
          "show running-config interface <interface>",
          "show access-lists"
        ],
        "cloud": [
          "Verificar CIDR da VPC/VNet",
          "Verificar route tables",
          "Verificar security groups/NACLs/NSGs",
          "Verificar VPN/peering/transit gateway",
          "Verificar flow logs"
        ]
      }
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
      "Planejar sub-redes por função, criticidade e crescimento.",
      "Evitar CIDRs amplos em regras de firewall e allowlists.",
      "Documentar dono, ambiente, finalidade, gateway, DHCP e controles.",
      "Validar sobreposição antes de conectar VPN, cloud, parceiros e Kubernetes.",
      "Separar gerência, dados, DMZ, convidados e usuários sempre que fizer sentido.",
      "Associar subnetting a firewall, logs, NAC, IAM e criptografia."
    ],
    "badPractices": [
      "Usar 0.0.0.0/0 em portas administrativas.",
      "Criar uma rede plana para toda a empresa.",
      "Escolher /24 para qualquer demanda sem análise.",
      "Não manter IPAM ou documentação confiável.",
      "Colocar recursos sensíveis em subnet pública por conveniência.",
      "Criar blocos cloud sem verificar CIDR corporativo existente."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral facilitado por segmentação fraca.",
        "description": "Risco relacionado à aula 5.10 — Revisão prática e desafios de subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "VLSM planejado e revisado."
      },
      {
        "name": "Exposição acidental por rota pública ou firewall permissivo.",
        "description": "Risco relacionado à aula 5.10 — Revisão prática e desafios de subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Matriz de comunicação mínima entre zonas."
      },
      {
        "name": "Roteamento ambíguo por sobreposição de CIDR.",
        "description": "Risco relacionado à aula 5.10 — Revisão prática e desafios de subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall, ACLs, security groups, NACLs/NSGs e logs de fluxo."
      },
      {
        "name": "Investigação prejudicada por ausência de IPAM e logs.",
        "description": "Risco relacionado à aula 5.10 — Revisão prática e desafios de subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM central e validação automática de sobreposição."
      },
      {
        "name": "Ampliação de impacto por redes grandes demais.",
        "description": "Risco relacionado à aula 5.10 — Revisão prática e desafios de subnetting.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de mudanças de rede por pull request ou processo formal."
      }
    ],
    "mitigations": [
      "VLSM planejado e revisado.",
      "Matriz de comunicação mínima entre zonas.",
      "Firewall, ACLs, security groups, NACLs/NSGs e logs de fluxo.",
      "IPAM central e validação automática de sobreposição.",
      "Revisão de mudanças de rede por pull request ou processo formal.",
      "Monitoramento de rotas, DHCP, alterações e tráfego anômalo."
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
      "VLSM planejado e revisado.",
      "Matriz de comunicação mínima entre zonas.",
      "Firewall, ACLs, security groups, NACLs/NSGs e logs de fluxo.",
      "IPAM central e validação automática de sobreposição.",
      "Revisão de mudanças de rede por pull request ou processo formal.",
      "Monitoramento de rotas, DHCP, alterações e tráfego anômalo."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    "Quando você olha para um CIDR, qual é a primeira pergunta que deve fazer antes de calcular hosts?",
    "Como você explicaria para alguém de segurança que subnetting ajuda, mas não substitui firewall?",
    "Em uma mudança de cloud, que evidências você pediria antes de aprovar um novo bloco CIDR?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual é a rede de 192.168.10.77/26?",
      "options": [
        "192.168.10.0",
        "192.168.10.64",
        "192.168.10.77",
        "192.168.10.128"
      ],
      "answer": "192.168.10.64",
      "explanation": "/26 tem bloco 64 no último octeto. O endereço 77 cai no bloco 64-127."
    },
    {
      "id": "q2",
      "question": "Qual é o broadcast de 192.168.10.77/26?",
      "options": [
        "192.168.10.63",
        "192.168.10.64",
        "192.168.10.126",
        "192.168.10.127"
      ],
      "answer": "192.168.10.127",
      "explanation": "O próximo bloco é 128, então o broadcast é 127."
    },
    {
      "id": "q3",
      "question": "Em VLSM, qual demanda deve ser alocada primeiro?",
      "options": [
        "A menor",
        "A mais nova",
        "A maior",
        "A que usa DHCP"
      ],
      "answer": "A maior",
      "explanation": "Alocar maiores primeiro reduz fragmentação do bloco."
    },
    {
      "id": "q4",
      "question": "Por que CIDR sobreposto é perigoso em VPN/cloud?",
      "options": [
        "Porque aumenta TTL",
        "Porque torna rotas ambíguas",
        "Porque muda o MAC",
        "Porque impede DNS reverso sempre"
      ],
      "answer": "Porque torna rotas ambíguas",
      "explanation": "Se dois lados usam o mesmo bloco, o roteamento não consegue distinguir destinos corretamente."
    },
    {
      "id": "q5",
      "question": "Subnetting sozinho bloqueia tráfego entre zonas?",
      "options": [
        "Sim, sempre",
        "Não; precisa de rota/política/controle",
        "Sim, se for /24",
        "Apenas em Wi-Fi"
      ],
      "answer": "Não; precisa de rota/política/controle",
      "explanation": "Sub-rede separa logicamente, mas o bloqueio depende de firewall, ACL, rota, policy e outros controles."
    },
    {
      "id": "q6",
      "question": "Qual item deve aparecer em uma documentação IPAM madura?",
      "options": [
        "Apenas IP inicial",
        "Dono, função, CIDR, status e controles",
        "Somente senha do roteador",
        "Apenas velocidade do link"
      ],
      "answer": "Dono, função, CIDR, status e controles",
      "explanation": "IPAM precisa apoiar operação, segurança, auditoria e mudança."
    }
  ],
  "flashcards": [
    {
      "front": "O que o CIDR indica?",
      "back": "Quantos bits do endereço IPv4 pertencem à parte de rede."
    },
    {
      "front": "O que é broadcast tradicional de uma sub-rede IPv4?",
      "back": "O último endereço do bloco, usado para envio a todos os hosts daquela sub-rede."
    },
    {
      "front": "Qual é a regra prática do VLSM?",
      "back": "Alocar primeiro as maiores demandas e depois as menores."
    },
    {
      "front": "Por que gateway precisa estar na mesma sub-rede do host?",
      "back": "Porque o host precisa alcançá-lo localmente para enviar tráfego a redes remotas."
    },
    {
      "front": "Subnetting é firewall?",
      "back": "Não. Ele cria fronteiras lógicas, mas o controle depende de políticas, rotas, firewalls, ACLs, logs e identidade."
    },
    {
      "front": "O que é CIDR sobreposto?",
      "back": "Quando dois ambientes usam blocos IP que se interceptam, causando ambiguidade de roteamento."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "title": "Cálculo direto",
      "prompt": "Calcule rede, broadcast, primeiro e último host de 10.20.30.200/27.",
      "expectedAnswer": "Rede 10.20.30.192, broadcast 10.20.30.223, primeiro host 10.20.30.193, último host 10.20.30.222."
    },
    {
      "id": "e2",
      "title": "Escolha de prefixo",
      "prompt": "Uma VLAN precisa de 45 hosts úteis. Qual prefixo tradicional mínimo atende?",
      "expectedAnswer": "/26, pois oferece 64 endereços totais e 62 hosts úteis tradicionais."
    },
    {
      "id": "e3",
      "title": "VLSM",
      "prompt": "Dentro de 192.168.100.0/24, aloque redes para 100, 50, 20 e 10 hosts.",
      "expectedAnswer": "Uma solução: 192.168.100.0/25, 192.168.100.128/26, 192.168.100.192/27 e 192.168.100.224/28."
    },
    {
      "id": "e4",
      "title": "Segurança",
      "prompt": "Explique por que uma allowlist 10.0.0.0/8 pode ser perigosa.",
      "expectedAnswer": "Porque permite uma origem muito ampla, aumenta blast radius e pode incluir ambientes, filiais, VPNs e workloads que não deveriam acessar o serviço."
    },
    {
      "id": "ex5.10.v2-final-pratica-equivalente",
      "type": "prático",
      "prompt": "Produza uma evidência curta do aprendizado desta aula: cálculo, tabela, matriz de decisão, desenho lógico ou explicação de troubleshooting relacionada ao tema.",
      "expectedAnswer": "A resposta deve conter artefato verificável, como tabela de sub-redes, cálculo de bloco, matriz de requisitos, justificativa de prefixo ou diagnóstico de erro comum.",
      "explanation": "Na versão v2.0, esta aula usa prática equivalente no lugar de laboratório independente para evitar laboratório genérico e concentrar execução nos labs integradores do módulo."
    }
  ],
  "challenge": {
    "title": "Desafio final do módulo: desenhar uma empresa híbrida",
    "scenario": "Você recebeu 10.80.0.0/22 para uma empresa com matriz, cloud privada e VPN. Ela precisa de usuários, convidados, servidores internos, DMZ, banco de dados, gerência, observabilidade e integração VPN. O time de segurança exige menor privilégio entre zonas e documentação IPAM.",
    "tasks": [
      "Escolher prefixos por segmento.",
      "Calcular rede, gateway, primeiro host, último host e broadcast.",
      "Definir quais sub-redes terão DHCP e quais terão reservas.",
      "Criar matriz mínima de comunicação entre zonas.",
      "Indicar riscos e mitigações.",
      "Separar espaço livre para crescimento."
    ],
    "rubric": [
      "Cálculos corretos e sem sobreposição.",
      "Prefixos adequados às demandas.",
      "Gateway e DHCP coerentes.",
      "Matriz de segurança mínima e justificável.",
      "Documentação clara e auditável.",
      "Boa preparação para troubleshooting."
    ],
    "expectedDeliverables": [
      "Evidência prática equivalente em vez de lab independente"
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada possível",
    "answer": "Uma solução possível é reservar 10.80.0.0/24 para usuários, 10.80.1.0/25 para convidados, 10.80.1.128/26 para servidores internos, 10.80.1.192/27 para DMZ, 10.80.1.224/28 para banco/serviços críticos, 10.80.1.240/28 para gerência/observabilidade em subdivisão planejada ou ajustar usando blocos adicionais em 10.80.2.0/24. O espaço 10.80.2.0/23 pode ser reservado para crescimento, cloud privada ou integração futura. A matriz de comunicação deve permitir usuários apenas para aplicações necessárias, aplicações para dados em portas específicas, gerência apenas via bastion/VPN/PAM, DMZ sem acesso amplo à rede interna e observabilidade recebendo logs/métricas sem virar caminho lateral.",
    "why": "A solução aloca maiores blocos primeiro, preserva crescimento, separa zonas por risco e evita que subnetting seja confundido com segurança completa. O plano precisa de firewall, rotas, logs, IPAM e revisão operacional.",
    "tradeoffs": [
      "Usar blocos maiores reduz chance de reendereçamento, mas aumenta blast radius se não houver firewall.",
      "Usar blocos menores melhora controle, mas aumenta gestão e documentação.",
      "Reservar espaço livre parece desperdício, mas evita redesenho traumático no futuro.",
      "Separar banco e DMZ melhora segurança, mas exige políticas e testes mais cuidadosos."
    ]
  },
  "glossary": [
    {
      "term": "CIDR",
      "definition": "Notação que indica o prefixo de rede, como /24 ou /27."
    },
    {
      "term": "VLSM",
      "definition": "Uso de sub-redes com tamanhos diferentes dentro de um bloco maior."
    },
    {
      "term": "Bloco mágico",
      "definition": "Método prático para encontrar limites de sub-redes usando 256 menos o valor da máscara no octeto interessante."
    },
    {
      "term": "IPAM",
      "definition": "Processo ou ferramenta para gerenciar blocos IP, donos, status, funções e reservas."
    },
    {
      "term": "Blast radius",
      "definition": "Alcance potencial de uma falha ou comprometimento."
    },
    {
      "term": "Sobreposição de CIDR",
      "definition": "Quando dois blocos IP se interceptam, causando ambiguidade de roteamento."
    },
    {
      "term": "Gateway",
      "definition": "Dispositivo ou interface que encaminha tráfego para fora da sub-rede local."
    },
    {
      "term": "Matriz de comunicação",
      "definition": "Documento que define quais zonas podem se comunicar, por quais portas e com quais justificativas."
    }
  ],
  "references": [
    {
      "title": "RFC 4632 — Classless Inter-domain Routing (CIDR)",
      "type": "standard",
      "note": "Base conceitual de CIDR e agregação de rotas."
    },
    {
      "title": "RFC 1918 — Address Allocation for Private Internets",
      "type": "standard",
      "note": "Blocos privados usados em redes internas."
    },
    {
      "title": "Cisco — IP Addressing and Subnetting for New Users",
      "type": "vendor-doc",
      "note": "Referência prática para cálculo e troubleshooting."
    },
    {
      "title": "Microsoft/Azure e AWS — documentação de redes virtuais",
      "type": "cloud-doc",
      "note": "Referências para subnetting em VNet/VPC, rotas e controles."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e pipelines",
      "reason": "O plano de subnetting pode ser versionado e validado em pipeline."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Zero Trust e acesso administrativo",
      "reason": "Subnetting reduz superfície, mas acesso administrativo precisa identidade, MFA, PAM e auditoria."
    },
    {
      "course": "Redes e Network",
      "module": "m06",
      "reason": "O próximo módulo usará subnetting como base para roteamento IPv4."
    }
  ],
  "progressRules": {
    "minimumQuizScore": 70,
    "requiredLabCompletion": true,
    "requiredChallengeCompletion": true,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "6.1"
    ],
    "completionMessage": "Você concluiu o Módulo 5. Agora está preparado para avançar para roteamento IPv4, porque entende como os blocos são divididos, documentados e usados por gateways e rotas.",
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ],
      "oneOf": [
        "practicalExerciseDone",
        "exerciseDone"
      ]
    }
  }
};
