export const lesson0509 = {
  "id": "5.9",
  "moduleId": "m05",
  "order": 9,
  "title": "Subnetting para segurança e cloud",
  "subtitle": "Como transformar sub-redes IPv4 em zonas de segurança, reduzir blast radius, planejar VPC/VNet, evitar sobreposição e integrar endereçamento com firewall, rotas, IAM, DevSecOps e governança.",
  "duration": "110-155 min",
  "estimatedStudyTimeMinutes": 155,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 250,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "segurança",
    "cloud",
    "vpc",
    "vnet",
    "firewall",
    "segmentação",
    "dmz",
    "rotas",
    "security group",
    "nacl",
    "ipam",
    "devsecops",
    "zero trust"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "reason": "A aula 5.1 explicou por que subnetting existe e como redes planas aumentam risco operacional e de segurança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.6",
      "reason": "A aula 5.6 ensinou VLSM, necessário para criar sub-redes de tamanhos diferentes por função."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.7",
      "reason": "A aula 5.7 mostrou planejamento corporativo, IPAM, documentação e governança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.8",
      "reason": "A aula 5.8 aplicou subnetting em laboratório com validação prática."
    },
    {
      "type": "course-link",
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "cloud e IaC",
      "reason": "Sub-redes em cloud são criadas, revisadas e versionadas com práticas de infraestrutura como código."
    }
  ],
  "objectives": [
    "Explicar por que subnetting ajuda segurança, mas não substitui firewall, autenticação, criptografia, monitoramento e governança.",
    "Desenhar sub-redes por zona: pública, privada, aplicação, dados, gerência, convidados, integração e observabilidade.",
    "Relacionar sub-redes com rotas, gateways, NAT, firewalls, security groups, NACLs, private endpoints e VPNs.",
    "Identificar riscos de sobreposição de CIDR em cloud, datacenter, VPN, containers e ambientes híbridos.",
    "Planejar endereçamento para reduzir blast radius e facilitar troubleshooting, auditoria e resposta a incidentes.",
    "Construir uma matriz de segmentação segura com CIDR, propósito, dono, rotas permitidas e controles mínimos."
  ],
  "learningOutcomes": [
    "Dado um ambiente corporativo, o aluno separa sub-redes por função e criticidade.",
    "Dado um CIDR cloud, o aluno identifica sub-redes públicas, privadas, de dados, gerência e integração.",
    "Dada uma falha de segurança, o aluno explica como subnetting reduz ou não reduz o impacto.",
    "Dado um plano de VPN, o aluno detecta sobreposição de CIDR antes da implantação.",
    "Dado um requisito DevSecOps, o aluno propõe validações de rede em IaC e revisão de mudanças."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Até agora você aprendeu subnetting como cálculo: prefixo, máscara, rede, hosts, broadcast, bloco mágico e VLSM. Mas em ambientes reais o motivo mais importante para dividir redes raramente é apenas economizar endereços. O motivo mais importante costuma ser <strong>controle</strong>: controlar quem fala com quem, onde o tráfego passa, o que pode ser auditado e qual será o tamanho do estrago se algo for comprometido.</p>\n<p>Uma rede plana permite que uma estação de usuário, um servidor crítico, uma câmera IP, uma impressora, um ambiente de laboratório e um serviço exposto compartilhem o mesmo espaço lógico. Isso facilita implantação inicial, mas torna incidentes mais difíceis de conter. Subnetting, quando combinado com VLANs, roteamento, firewall, NAC, logs e governança, cria fronteiras técnicas que ajudam a limitar movimento lateral e reduzir blast radius.</p>\n<div class=\"callout callout--security\"><strong>Motivação central:</strong> subnetting não é segurança sozinho. Ele é a fundação lógica sobre a qual políticas de segurança, rotas, firewalls, observabilidade e automação conseguem operar.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>No início das redes IPv4, a preocupação principal era conectividade. Fazer máquinas se comunicarem já era um grande desafio. Com o crescimento das empresas, surgiram problemas de escala: broadcasts demais, domínios grandes, troubleshooting difícil, endereçamento desperdiçado e baixa previsibilidade.</p>\n<p>Depois, a segurança ganhou peso. Worms, malware, ataques internos, vazamentos e movimentos laterais mostraram que conectar tudo com tudo era perigoso. A segmentação por sub-rede, junto com VLANs e firewalls, passou a ser usada para separar usuários, servidores, DMZ, gerência, convidados, terceiros, backup, OT/IoT e ambientes de desenvolvimento.</p>\n<p>Na cloud, a ideia continuou, mas ganhou novos componentes: VPCs, VNets, subnets públicas e privadas, route tables, NAT gateways, security groups, network ACLs, private endpoints, transit gateways, peerings e firewalls gerenciados. O cálculo de subnetting continua sendo IPv4, mas o impacto arquitetural é muito maior.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema desta aula é transformar uma rede em zonas com propósito e controle. Uma empresa pode começar com um bloco simples, como <code>10.40.0.0/22</code>, e precisar separar serviços públicos, aplicações internas, bancos de dados, estações, gerência, observabilidade, VPN e integração com cloud.</p>\n<table class=\"data-table\"><thead><tr><th>Sem segmentação</th><th>Com subnetting orientado a segurança</th></tr></thead><tbody>\n<tr><td>Todos os hosts no mesmo domínio lógico</td><td>Cada função fica em sub-rede própria</td></tr>\n<tr><td>Firewall tem pouca granularidade</td><td>Políticas podem usar CIDRs por zona</td></tr>\n<tr><td>Incidente se espalha com mais facilidade</td><td>Movimento lateral encontra fronteiras</td></tr>\n<tr><td>Logs misturam funções diferentes</td><td>Investigação parte de zonas conhecidas</td></tr>\n<tr><td>VPN e cloud podem sobrepor blocos</td><td>IPAM evita colisões antes da mudança</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema clássico:</strong> uma empresa cria <code>10.0.0.0/8</code> para tudo, libera regras amplas e só percebe a complexidade quando precisa conectar filial, VPN, cloud, parceiro, Kubernetes ou datacenter comprado de outra empresa.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do subnetting em segurança acompanha a maturidade operacional da organização. Primeiro, divide-se para reduzir broadcast e organizar endereços. Depois, divide-se para controlar comunicação. Por fim, divide-se para automatizar, auditar, responder a incidentes e integrar múltiplos ambientes.</p>\n<ol class=\"flow-list\">\n<li><strong>Rede plana:</strong> rápida de montar, difícil de proteger.</li>\n<li><strong>Sub-redes por departamento:</strong> usuários, servidores e convidados separados.</li>\n<li><strong>Sub-redes por zona de segurança:</strong> DMZ, aplicação, dados, gerência e backup.</li>\n<li><strong>Cloud:</strong> subnets públicas/privadas, route tables, NAT e endpoints privados.</li>\n<li><strong>DevSecOps:</strong> endereçamento versionado em IaC, revisão por pull request e validação automática contra sobreposição.</li>\n<li><strong>Zero Trust:</strong> subnetting deixa de ser a única barreira e passa a ser uma camada dentro de identidade, política, criptografia e telemetria.</li>\n</ol>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Subnetting para segurança e cloud</strong> é o uso planejado de sub-redes IPv4 para representar zonas técnicas com propósito, criticidade, dono, rota, política e observabilidade. Em vez de perguntar apenas quantos hosts cabem, você passa a perguntar: <em>quem precisa falar com quem, por qual caminho, com qual controle e com qual evidência?</em></p>\n<div class=\"definition-box\"><strong>Definição operacional:</strong> uma sub-rede segura é um bloco IP com função definida, gateway conhecido, rotas explícitas, política documentada, dono responsável, logs úteis e limites claros de comunicação.</div>\n<table class=\"data-table\"><thead><tr><th>Zona</th><th>Exemplo de CIDR</th><th>Objetivo</th><th>Controle típico</th></tr></thead><tbody>\n<tr><td>Pública/DMZ</td><td><code>10.40.0.0/27</code></td><td>Receber tráfego externo controlado</td><td>WAF, firewall, proxy reverso</td></tr>\n<tr><td>Aplicação privada</td><td><code>10.40.0.32/26</code></td><td>Executar serviços internos</td><td>Security group, ACL, mTLS</td></tr>\n<tr><td>Dados</td><td><code>10.40.0.96/27</code></td><td>Isolar bancos e filas</td><td>Sem acesso direto de usuários</td></tr>\n<tr><td>Gerência</td><td><code>10.40.0.128/28</code></td><td>Acesso administrativo</td><td>Bastion, VPN, MFA, PAM</td></tr>\n<tr><td>Observabilidade</td><td><code>10.40.0.144/28</code></td><td>Coleta de logs e métricas</td><td>Flux logs, SIEM, retenção</td></tr>\n</tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Internamente, subnetting continua sendo matemática de IPv4: IP, máscara, rede, host e broadcast. O que muda é a intenção arquitetural. Cada sub-rede passa a ter uma função e, normalmente, uma tabela de rotas associada. Quando um pacote sai de uma sub-rede para outra, ele precisa atravessar um ponto de controle: roteador, firewall, switch L3, gateway cloud ou appliance virtual.</p>\n<p>Na cloud, uma subnet não é apenas um intervalo de endereços. Ela costuma estar associada a uma zona de disponibilidade, a uma tabela de rotas, a políticas de segurança e a recursos como NAT Gateway, Internet Gateway, Private Endpoint ou firewall gerenciado. Em ambientes corporativos, uma sub-rede geralmente se conecta a uma VLAN, gateway, ACL, escopo DHCP, IPAM e política de monitoramento.</p>\n<ol class=\"flow-list\">\n<li>O host decide se o destino é local ou remoto usando IP e máscara.</li>\n<li>Se remoto, envia ao gateway da sua sub-rede.</li>\n<li>O gateway consulta rotas e políticas.</li>\n<li>O firewall ou controle equivalente decide permitir, negar, registrar ou inspecionar.</li>\n<li>O tráfego chega à sub-rede de destino apenas se rota e política permitirem.</li>\n<li>Logs e fluxos ajudam auditoria, troubleshooting e resposta a incidentes.</li>\n</ol>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Uma arquitetura bem planejada separa sub-redes por criticidade e caminho de tráfego. O erro comum é criar sub-redes apenas porque a ferramenta pede, mas manter rotas e regras tão amplas que a segmentação não protege nada.</p>\n<table class=\"comparison-table\"><thead><tr><th>Camada</th><th>Componente</th><th>Papel no desenho</th></tr></thead><tbody>\n<tr><td>Endereçamento</td><td>CIDR/subnet</td><td>Define o bloco lógico e evita sobreposição</td></tr>\n<tr><td>Camada 2</td><td>VLAN</td><td>Separa domínios locais em LANs corporativas</td></tr>\n<tr><td>Camada 3</td><td>Gateway/rota</td><td>Define caminhos entre sub-redes</td></tr>\n<tr><td>Segurança</td><td>Firewall/SG/NACL</td><td>Controla fluxo permitido entre zonas</td></tr>\n<tr><td>Identidade</td><td>NAC/IAM/PAM</td><td>Controla quem pode acessar recursos</td></tr>\n<tr><td>Operação</td><td>IPAM/CMDB/logs</td><td>Permite auditoria, troubleshooting e governança</td></tr>\n</tbody></table>\n<div class=\"callout callout--security\"><strong>Regra prática:</strong> se duas sub-redes podem falar livremente em todas as portas, a segmentação existe no diagrama, mas não na prática de segurança.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine um hospital. Recepção, emergência, centro cirúrgico, farmácia, UTI, administração e almoxarifado pertencem ao mesmo prédio, mas não devem ter o mesmo nível de acesso. Corredores, portas, crachás, câmeras e controles definem quem pode ir para onde.</p>\n<p>Subnetting é como dividir o prédio em áreas. VLANs e rotas são os corredores. Firewalls são portas controladas. Logs são câmeras. IAM/NAC é o crachá. Criptografia é o envelope lacrado que protege o conteúdo mesmo se alguém vê o trajeto.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> apenas desenhar salas não impede invasão se todas as portas ficam abertas. Da mesma forma, criar sub-redes não basta se as regras permitem tudo.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em uma rede doméstica avançada, você pode separar dispositivos pessoais, visitantes e IoT. Mesmo usando o mesmo roteador físico, cada grupo pode ficar em uma sub-rede diferente.</p>\n<table class=\"data-table\"><thead><tr><th>Grupo</th><th>CIDR</th><th>Política desejada</th></tr></thead><tbody>\n<tr><td>Dispositivos pessoais</td><td><code>192.168.10.0/24</code></td><td>Acessam Internet e serviços internos</td></tr>\n<tr><td>Visitantes</td><td><code>192.168.20.0/24</code></td><td>Apenas Internet</td></tr>\n<tr><td>IoT</td><td><code>192.168.30.0/24</code></td><td>Apenas Internet e controlador específico</td></tr>\n</tbody></table>\n<p>O ganho não é mágico. O ganho vem de combinar sub-redes com regras: visitantes não acessam computadores pessoais; IoT não acessa NAS; dispositivos pessoais conseguem administrar apenas o que precisam.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, sub-redes podem ser planejadas por função, localidade e criticidade. Uma matriz pode ter usuários, servidores, DMZ, gerência, telefonia, impressoras, câmeras, backup e convidados. Uma filial pode receber um bloco menor, mas seguir o mesmo padrão de numeração.</p>\n<table class=\"data-table\"><thead><tr><th>Zona</th><th>Exemplo</th><th>Comunicação mínima</th></tr></thead><tbody>\n<tr><td>Usuários</td><td><code>10.10.10.0/24</code></td><td>DNS, proxy, aplicações autorizadas</td></tr>\n<tr><td>Servidores</td><td><code>10.10.20.0/24</code></td><td>Portas específicas vindas de usuários/aplicação</td></tr>\n<tr><td>Banco de dados</td><td><code>10.10.30.0/25</code></td><td>Somente aplicações autorizadas</td></tr>\n<tr><td>Gerência</td><td><code>10.10.40.0/27</code></td><td>Bastion, administração e monitoramento</td></tr>\n<tr><td>Convidados</td><td><code>10.10.50.0/24</code></td><td>Internet, sem acesso interno</td></tr>\n</tbody></table>\n<p>Essa organização facilita troubleshooting, firewall, auditoria, resposta a incidentes, inventário, compliance e renovação tecnológica.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, o desenho típico começa com uma VPC ou VNet e depois divide subnets por exposição e função. Uma subnet pública possui rota para Internet Gateway ou equivalente. Uma subnet privada não recebe tráfego direto da Internet e costuma sair por NAT. Subnets de dados devem ser ainda mais restritas e, quando possível, acessadas por private endpoints.</p>\n<table class=\"data-table\"><thead><tr><th>Sub-rede cloud</th><th>Exemplo de uso</th><th>Risco se mal planejada</th></tr></thead><tbody>\n<tr><td>Pública</td><td>Load balancer, bastion controlado</td><td>Exposição direta indevida</td></tr>\n<tr><td>Privada app</td><td>VMs, containers, application services</td><td>Rotas amplas para dados sensíveis</td></tr>\n<tr><td>Dados</td><td>Bancos, filas, caches</td><td>Acesso direto de usuários ou Internet</td></tr>\n<tr><td>Integração/VPN</td><td>Conexão híbrida</td><td>Sobreposição de CIDR com datacenter</td></tr>\n<tr><td>Observabilidade</td><td>Collectors e logs</td><td>Perda de evidência em incidente</td></tr>\n</tbody></table>\n<div class=\"callout callout--problem\"><strong>Ponto crítico:</strong> sobreposição de CIDR entre cloud, filial, VPN e Kubernetes é uma das causas mais caras de redes híbridas mal planejadas.</div>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, subnetting aparece no código. Terraform, Bicep, Pulumi, CloudFormation e módulos internos definem VPCs, subnets, route tables, NAT, firewalls e regras. Isso permite revisão por pull request, testes automatizados, políticas como código e histórico de mudanças.</p>\n<p>Uma pipeline madura pode validar se um novo CIDR sobrepõe blocos existentes, se uma subnet pública contém banco de dados, se uma regra permite <code>0.0.0.0/0</code> indevidamente, se ambientes de desenvolvimento e produção estão misturados ou se uma VNet não possui flow logs habilitados.</p>\n<table class=\"data-table\"><thead><tr><th>Validação DevSecOps</th><th>Exemplo</th></tr></thead><tbody>\n<tr><td>Sobreposição</td><td>Bloquear merge se <code>10.40.0.0/22</code> colide com VPN existente</td></tr>\n<tr><td>Exposição</td><td>Alertar subnet pública contendo banco de dados</td></tr>\n<tr><td>Regra ampla</td><td>Reprovar entrada administrativa a partir de <code>0.0.0.0/0</code></td></tr>\n<tr><td>Governança</td><td>Exigir tags de dono, ambiente, criticidade e centro de custo</td></tr>\n</tbody></table>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Em Segurança da Informação, subnetting ajuda a organizar controles e reduzir impacto. Se um notebook de usuário é comprometido, a segmentação deve impedir acesso direto a bancos de dados, consoles administrativos, rede de backup e interfaces de gerência. Se um serviço público é explorado na DMZ, ele não deve ter caminho irrestrito para a rede interna.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como subnetting ajuda</th><th>O que ainda é necessário</th></tr></thead><tbody>\n<tr><td>Movimento lateral</td><td>Separa zonas e força passagem por controle</td><td>Firewall, EDR, identidade, logs</td></tr>\n<tr><td>Exposição pública</td><td>Separa subnets públicas e privadas</td><td>WAF, hardening, patching, secrets seguros</td></tr>\n<tr><td>Credenciais vazadas</td><td>Limita alcance de origem por rede</td><td>MFA, PAM, rotação, menor privilégio</td></tr>\n<tr><td>Ransomware</td><td>Isola backup e administração</td><td>Imutabilidade, EDR, segmentação forte</td></tr>\n<tr><td>Erro de cloud</td><td>Impede mistura de dados com Internet</td><td>Policy as code, revisão, logs, CSPM</td></tr>\n</tbody></table>\n<div class=\"callout callout--security\"><strong>Boa prática:</strong> trate CIDR como parte do controle de segurança, não como simples detalhe de infraestrutura.</div>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 1040 640\" role=\"img\" aria-labelledby=\"m05l09-title m05l09-desc\">\n<title id=\"m05l09-title\">Subnetting para segurança e cloud</title>\n<desc id=\"m05l09-desc\">Diagrama mostrando uma VPC ou rede corporativa dividida em sub-redes públicas, privadas, de dados, gerência e observabilidade, com controles de rota e firewall entre zonas.</desc>\n<defs><marker id=\"m05l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"30\" y=\"25\" width=\"980\" height=\"570\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"55\" y=\"62\" class=\"svg-label\">Rede corporativa/VPC 10.40.0.0/22 segmentada por zona</text>\n<g class=\"svg-node svg-node--cloud\"><rect x=\"70\" y=\"95\" width=\"210\" height=\"115\" rx=\"14\"></rect><text x=\"95\" y=\"130\" class=\"svg-label\">Sub-rede pública</text><text x=\"95\" y=\"158\" class=\"svg-label--small\">10.40.0.0/27</text><text x=\"95\" y=\"184\" class=\"svg-label--small\">LB / WAF / Bastion</text></g>\n<g class=\"svg-node svg-node--server\"><rect x=\"415\" y=\"95\" width=\"210\" height=\"115\" rx=\"14\"></rect><text x=\"445\" y=\"130\" class=\"svg-label\">Aplicação privada</text><text x=\"445\" y=\"158\" class=\"svg-label--small\">10.40.0.32/26</text><text x=\"445\" y=\"184\" class=\"svg-label--small\">VMs / containers</text></g>\n<g class=\"svg-node svg-node--security\"><rect x=\"760\" y=\"95\" width=\"210\" height=\"115\" rx=\"14\"></rect><text x=\"790\" y=\"130\" class=\"svg-label\">Dados</text><text x=\"790\" y=\"158\" class=\"svg-label--small\">10.40.0.96/27</text><text x=\"790\" y=\"184\" class=\"svg-label--small\">DB / filas / cache</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"395\" y=\"265\" width=\"250\" height=\"105\" rx=\"16\"></rect><text x=\"430\" y=\"305\" class=\"svg-label\">Firewall / rotas</text><text x=\"425\" y=\"333\" class=\"svg-label--small\">permite, nega, registra</text></g>\n<g class=\"svg-node svg-node--router\"><rect x=\"70\" y=\"430\" width=\"210\" height=\"115\" rx=\"14\"></rect><text x=\"95\" y=\"465\" class=\"svg-label\">Integração/VPN</text><text x=\"95\" y=\"493\" class=\"svg-label--small\">10.40.1.0/26</text><text x=\"95\" y=\"519\" class=\"svg-label--small\">sem sobreposição</text></g>\n<g class=\"svg-node svg-node--client\"><rect x=\"415\" y=\"430\" width=\"210\" height=\"115\" rx=\"14\"></rect><text x=\"445\" y=\"465\" class=\"svg-label\">Gerência</text><text x=\"445\" y=\"493\" class=\"svg-label--small\">10.40.0.128/28</text><text x=\"445\" y=\"519\" class=\"svg-label--small\">PAM / bastion / MFA</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"760\" y=\"430\" width=\"210\" height=\"115\" rx=\"14\"></rect><text x=\"790\" y=\"465\" class=\"svg-label\">Observabilidade</text><text x=\"790\" y=\"493\" class=\"svg-label--small\">10.40.0.144/28</text><text x=\"790\" y=\"519\" class=\"svg-label--small\">logs / métricas</text></g>\n<line x1=\"280\" y1=\"153\" x2=\"395\" y2=\"300\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l09-arrow)\"></line>\n<line x1=\"520\" y1=\"210\" x2=\"520\" y2=\"265\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l09-arrow)\"></line>\n<line x1=\"760\" y1=\"153\" x2=\"645\" y2=\"300\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m05l09-arrow)\"></line>\n<line x1=\"280\" y1=\"487\" x2=\"395\" y2=\"335\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l09-arrow)\"></line>\n<line x1=\"520\" y1=\"430\" x2=\"520\" y2=\"370\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l09-arrow)\"></line>\n<line x1=\"760\" y1=\"487\" x2=\"645\" y2=\"335\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l09-arrow)\"></line>\n<text x=\"55\" y=\"615\" class=\"svg-label--small\">A sub-rede define a zona. A segurança real vem da combinação: rotas explícitas, firewall, identidade, criptografia, logs, hardening e governança.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório integrador</h2>\n<p>Esta aula agora abriga o <strong>Lab integrador 4 do M05</strong>: subnetting para cloud com subnets públicas, privadas, banco, gestão, custo, riscos de cobrança e limpeza obrigatória.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam escolha de prefixos por zona, identificação de riscos, leitura de rotas, análise de allowlists e detecção de sobreposição entre cloud, VPN e datacenter.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio pede que você revise um desenho inseguro de cloud com sub-redes amplas, banco em subnet pública, regras abertas e CIDR sobreposto com VPN. Você deverá propor um redesenho seguro e justificá-lo.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra uma matriz de zonas, CIDRs, rotas e políticas mínimas, explicando por que subnetting sozinho não substitui firewall, IAM, criptografia e monitoramento.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Subnetting para segurança e cloud significa criar zonas lógicas com propósito, caminhos controlados e evidências operacionais. Uma boa sub-rede tem dono, função, tamanho adequado, rotas documentadas, controles explícitos e monitoramento. O objetivo é reduzir blast radius, evitar sobreposição, facilitar troubleshooting e tornar a arquitetura mais governável.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você fará a <strong>Revisão prática e desafios de subnetting</strong>. Ela consolidará cálculo, VLSM, planejamento, Packet Tracer, segurança e cloud antes de avançar para o próximo grande tema do curso.</p>\n</section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula conecta subnetting com arquitetura segura, cloud, ambientes híbridos, governança e DevSecOps.",
    "previousConcepts": [
      "CIDR",
      "máscara",
      "VLSM",
      "rede",
      "broadcast",
      "gateway",
      "VLAN",
      "roteamento",
      "Packet Tracer",
      "IPAM"
    ],
    "nextConcepts": [
      "revisão de subnetting",
      "desafios práticos",
      "rotas avançadas",
      "NAT",
      "IPv6",
      "firewall",
      "cloud networking"
    ]
  },
  "protocolFields": [
    {
      "name": "CIDR da zona",
      "description": "Bloco IPv4 atribuído a uma função técnica, como DMZ, aplicação, dados ou gerência."
    },
    {
      "name": "Máscara",
      "description": "Define quantos endereços pertencem à sub-rede e qual é o limite da zona."
    },
    {
      "name": "Gateway",
      "description": "Ponto de saída da sub-rede, onde rotas e controles podem ser aplicados."
    },
    {
      "name": "Tabela de rotas",
      "description": "Define para onde o tráfego deve ir: Internet, NAT, firewall, VPN, peering ou rota local."
    },
    {
      "name": "Política de segurança",
      "description": "Regras de firewall, security group, NACL, ACL ou microsegmentação que controlam fluxo."
    },
    {
      "name": "Flow logs",
      "description": "Registros de fluxo usados para auditoria, investigação e troubleshooting."
    },
    {
      "name": "IPAM",
      "description": "Sistema ou processo que documenta blocos, donos, status, propósito e sobreposições."
    }
  ],
  "packetFlow": [
    "Um host na subnet pública recebe ou inicia comunicação conforme sua rota e política.",
    "O tráfego entre sub-redes atravessa gateway, firewall, switch L3 ou roteador cloud.",
    "A tabela de rotas decide o próximo salto: local, NAT, VPN, firewall, peering ou Internet.",
    "A política de segurança permite, nega ou registra o fluxo entre origem, destino, porta e protocolo.",
    "Se permitido, o pacote segue para a subnet de destino; se negado, deve haver evidência em logs quando configurado.",
    "Monitoramento e flow logs permitem confirmar se o desenho corresponde ao comportamento real.",
    "Em incidente, a segmentação limita alcance e facilita isolamento seletivo da zona afetada."
  ],
  "deepDive": {
    "title": "Blast radius, sobreposição e segmentação real",
    "points": [
      "Blast radius é o tamanho do impacto possível quando algo falha ou é comprometido.",
      "Sub-redes menores e bem controladas reduzem o alcance inicial de um incidente.",
      "Sobreposição de CIDR quebra VPNs, peerings, roteamento e troubleshooting.",
      "Segmentação só é real quando há rota e política coerentes; apenas dividir IPs não bloqueia tráfego.",
      "Em cloud, subnets dependem de route tables, security groups, NACLs, firewalls e endpoints.",
      "Em DevSecOps, validações de CIDR e exposição devem ocorrer antes do deploy."
    ],
    "workedExample": "Para uma VPC 10.40.0.0/22, uma organização pode reservar 10.40.0.0/27 para DMZ, 10.40.0.32/26 para aplicação, 10.40.0.96/27 para dados, 10.40.0.128/28 para gerência, 10.40.0.144/28 para observabilidade e 10.40.1.0/26 para integração/VPN, mantendo espaço livre para crescimento."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que subnetting é firewall.",
      "impact": "O tráfego pode continuar permitido entre zonas, criando falsa sensação de segurança.",
      "fix": "Combinar sub-redes com rotas, firewalls, security groups, ACLs, identidade e logs."
    },
    {
      "mistake": "Usar CIDRs enormes para tudo.",
      "impact": "Aumenta blast radius, complica auditoria e incentiva allowlists amplas.",
      "fix": "Dimensionar blocos por função, crescimento e criticidade."
    },
    {
      "mistake": "Sobrepor CIDR de cloud com filial ou VPN.",
      "impact": "Rotas entram em conflito e parte do tráfego fica inacessível ou ambígua.",
      "fix": "Manter IPAM central e validar sobreposição antes de criar ambientes."
    },
    {
      "mistake": "Colocar banco de dados em subnet pública.",
      "impact": "Aumenta superfície de exposição e risco de configuração perigosa.",
      "fix": "Manter dados em subnet privada, sem rota pública, com acesso mínimo e monitorado."
    },
    {
      "mistake": "Liberar 0.0.0.0/0 em portas administrativas.",
      "impact": "Expõe SSH, RDP, banco ou consoles para toda a Internet.",
      "fix": "Usar VPN, bastion, PAM, MFA, allowlist restrita e logs."
    },
    {
      "mistake": "Não registrar dono e finalidade da subnet.",
      "impact": "Ninguém sabe se o bloco pode ser alterado, removido ou conectado a outro ambiente.",
      "fix": "Documentar dono, ambiente, função, criticidade, rota, tags e política."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Subnets cloud não se comunicam apesar de estarem na mesma VPC/VNet.",
      "VPN conecta, mas alguns destinos não respondem.",
      "Regras de firewall parecem corretas, mas a rota envia tráfego para o caminho errado.",
      "Um serviço privado ficou exposto publicamente.",
      "Ambiente Kubernetes colide com CIDR corporativo.",
      "Flow logs mostram negações entre zonas que deveriam comunicar."
    ],
    "method": [
      "Confirmar CIDR de origem e destino.",
      "Verificar se existe sobreposição com VPN, filial, cloud, containers ou parceiros.",
      "Validar route tables, gateways, NAT, peering e propagação de rotas.",
      "Verificar security groups, NACLs, firewalls e ACLs nas duas direções quando aplicável.",
      "Confirmar se o recurso está em subnet pública ou privada.",
      "Testar conectividade por IP, porta e aplicação, não apenas ping.",
      "Consultar flow logs, logs do firewall e eventos de mudança.",
      "Comparar configuração real com matriz aprovada de endereçamento e segurança."
    ],
    "tools": [
      "ipcalc",
      "ip route",
      "traceroute",
      "Test-NetConnection",
      "route print",
      "curl",
      "nc",
      "flow logs",
      "logs de firewall",
      "IPAM",
      "terraform plan",
      "show ip route",
      "show access-lists"
    ],
    "decisionTree": [
      {
        "question": "Os CIDRs se sobrepõem?",
        "yes": "Corrija o plano antes de ajustar firewall.",
        "no": "Continue para rotas."
      },
      {
        "question": "Existe rota entre as sub-redes?",
        "yes": "Verifique política de segurança.",
        "no": "Corrija route table, gateway, VPN ou peering."
      },
      {
        "question": "A política permite origem, destino, porta e protocolo?",
        "yes": "Teste aplicação, DNS e resposta de retorno.",
        "no": "Ajuste regra mínima necessária."
      },
      {
        "question": "Há logs para provar o comportamento?",
        "yes": "Use como evidência.",
        "no": "Habilite logging antes de concluir investigação."
      }
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
    ]
  },
  "security": {
    "badPractices": [
      "Usar 10.0.0.0/8 internamente sem planejamento.",
      "Liberar regras administrativas para 0.0.0.0/0.",
      "Misturar produção, desenvolvimento e laboratório na mesma zona.",
      "Colocar banco ou console administrativo em subnet pública.",
      "Criar subnets sem dono e sem documentação.",
      "Usar subnetting como substituto de IAM, MFA, criptografia ou hardening."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral facilitado por regras amplas.",
        "description": "Risco relacionado à aula 5.9 — Subnetting para segurança e cloud.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Matriz de comunicação por zona."
      },
      {
        "name": "Exposição indevida de serviços por subnet pública e rota à Internet.",
        "description": "Risco relacionado à aula 5.9 — Subnetting para segurança e cloud.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall entre zonas críticas."
      },
      {
        "name": "Sobreposição de CIDR causando bypass operacional, indisponibilidade ou rotas inesperadas.",
        "description": "Risco relacionado à aula 5.9 — Subnetting para segurança e cloud.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Security groups e NACLs mínimos em cloud."
      },
      {
        "name": "Falta de logs impedindo investigação.",
        "description": "Risco relacionado à aula 5.9 — Subnetting para segurança e cloud.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAT e private endpoints em vez de exposição direta."
      },
      {
        "name": "Allowlists amplas que autorizam mais origens do que o necessário.",
        "description": "Risco relacionado à aula 5.9 — Subnetting para segurança e cloud.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Bastion/PAM/MFA para gerência."
      },
      {
        "name": "Ambientes de desenvolvimento com rota para dados de produção.",
        "description": "Risco relacionado à aula 5.9 — Subnetting para segurança e cloud.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Policy as code para bloquear CIDRs e regras perigosas."
      }
    ],
    "mitigations": [
      "Matriz de comunicação por zona.",
      "Firewall entre zonas críticas.",
      "Security groups e NACLs mínimos em cloud.",
      "NAT e private endpoints em vez de exposição direta.",
      "Bastion/PAM/MFA para gerência.",
      "Policy as code para bloquear CIDRs e regras perigosas.",
      "Flow logs e integração com SIEM.",
      "Revisão periódica de rotas, regras e subnets órfãs."
    ],
    "safeLabNote": "Os laboratórios desta aula são defensivos e de desenho arquitetural. Não execute varreduras ou testes em redes de terceiros. Use blocos fictícios, Packet Tracer, ambiente pessoal ou laboratório autorizado.",
    "goodPractices": [
      "Separar zonas por função e criticidade: pública, app, dados, gerência, observabilidade, backup e integração.",
      "Usar menor CIDR adequado ao crescimento previsto, evitando blocos amplos sem necessidade.",
      "Bloquear comunicação lateral por padrão e liberar apenas fluxos documentados.",
      "Manter IPAM e tags obrigatórias para dono, ambiente, criticidade e finalidade.",
      "Validar sobreposição de CIDR em cloud, VPN, datacenter, Kubernetes e parceiros.",
      "Habilitar flow logs, logs de firewall e retenção compatível com resposta a incidentes.",
      "Usar subnets privadas para bancos de dados e componentes internos.",
      "Tratar mudanças de rede como mudança de segurança, com revisão e rollback."
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
      "Matriz de comunicação por zona.",
      "Firewall entre zonas críticas.",
      "Security groups e NACLs mínimos em cloud.",
      "NAT e private endpoints em vez de exposição direta.",
      "Bastion/PAM/MFA para gerência.",
      "Policy as code para bloquear CIDRs e regras perigosas.",
      "Flow logs e integração com SIEM.",
      "Revisão periódica de rotas, regras e subnets órfãs."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-5.9",
    "labType": "cloud-architecture",
    "title": "Lab integrador 4 — Subnetting para cloud: pública, privada, banco e gestão",
    "objective": "Planejar subnets de cloud sem criar cobrança real, considerando zona, rota, segurança, crescimento, NAT, endpoints privados e risco de sobreposição.",
    "scenario": "Você desenhará uma VPC/VNet fictícia para uma aplicação web com camada pública, aplicação privada, banco privado e gestão/observabilidade.",
    "topology": "Cloud simulada: Internet -> Load Balancer público -> App privada -> Banco privado; gestão via bastion/VPN; logs e DNS internos.",
    "architecture": "Bloco 10.50.0.0/20 dividido em subnets por função e zona, com route tables e políticas por camada.",
    "prerequisites": [
      "Aulas 5.1 a 5.8 revisadas.",
      "Noção básica de VPC/VNet e rota default.",
      "Não é necessário criar recursos reais."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Opcional: draw.io local ou SVG/manual",
      "Opcional: console cloud em modo leitura, sem provisionar recursos"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero se feito como simulação; cloud pago somente se o aluno optar por criar recursos reais, o que não é necessário",
    "safetyNotes": [
      "Não crie NAT Gateway, Load Balancer, firewall gerenciado ou recursos pagos para este lab.",
      "Se usar cloud real, aplique tags, orçamento e limpeza obrigatória.",
      "Não exponha bancos ou subnets privadas à Internet."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir bloco cloud",
        "instruction": "Use 10.50.0.0/20 como bloco principal e registre por que ele não deve sobrepor filial/VPN.",
        "artifact": "Bloco cloud escolhido e lista de blocos proibidos por sobreposição.",
        "expectedOutput": "CIDR cloud documentado.",
        "explanation": "Sobreposição quebra peering, VPN e roteamento híbrido."
      },
      {
        "number": 2,
        "title": "Separar camadas",
        "instruction": "Liste camadas e criticidade.",
        "analysisTask": "Pública/LB, app privada, banco privado, gestão/observabilidade, endpoints privados.",
        "expectedOutput": "Tabela por função e exposição.",
        "explanation": "Cloud subnetting começa pela arquitetura da aplicação."
      },
      {
        "number": 3,
        "title": "Reservar zonas",
        "instruction": "Planeje pelo menos duas zonas para alta disponibilidade.",
        "calculation": "Criar pares de subnets por zona: public-a/public-b, app-a/app-b, db-a/db-b, mgmt-a/mgmt-b.",
        "expectedOutput": "Desenho multi-AZ/multi-zona.",
        "explanation": "Subnets por zona evitam SPOF e influenciam custo de tráfego."
      },
      {
        "number": 4,
        "title": "Alocar subnets públicas",
        "instruction": "Crie duas subnets públicas pequenas.",
        "calculation": "10.50.0.0/24 public-a; 10.50.1.0/24 public-b.",
        "expectedOutput": "Subnets públicas documentadas com rota 0.0.0.0/0 para Internet Gateway simulado.",
        "explanation": "Camada pública deve ser mínima e controlada."
      },
      {
        "number": 5,
        "title": "Alocar subnets privadas de aplicação",
        "instruction": "Crie subnets maiores para workloads.",
        "calculation": "10.50.10.0/23 app-a; 10.50.12.0/23 app-b.",
        "expectedOutput": "Subnets privadas para aplicação com crescimento.",
        "explanation": "App costuma escalar mais que load balancer e banco."
      },
      {
        "number": 6,
        "title": "Alocar banco e gestão",
        "instruction": "Crie subnets privadas separadas para banco e gestão.",
        "calculation": "10.50.20.0/24 db-a; 10.50.21.0/24 db-b; 10.50.30.0/25 mgmt-a; 10.50.30.128/25 mgmt-b.",
        "expectedOutput": "Banco e gestão isolados por CIDR.",
        "explanation": "Separar banco por subnet melhora política, rota, logs e auditoria."
      },
      {
        "number": 7,
        "title": "Criar matriz de rotas",
        "instruction": "Defina rota por tipo de subnet.",
        "artifact": "Públicas -> Internet Gateway; App -> NAT ou endpoints privados; Banco -> sem Internet; Gestão -> VPN/Bastion; Endpoints -> privados.",
        "expectedOutput": "Tabela de route tables por subnet.",
        "explanation": "Subnet sem route table correta vira exposição ou indisponibilidade."
      },
      {
        "number": 8,
        "title": "Criar matriz de segurança",
        "instruction": "Defina fluxos mínimos.",
        "artifact": "Internet -> LB 443; LB -> App 443/8080; App -> DB 5432/3306; Gestão -> SSH/RDP somente via bastion/VPN; Banco sem entrada pública.",
        "expectedOutput": "Matriz origem/destino/porta/justificativa.",
        "explanation": "Subnetting sozinho não é controle de acesso; precisa de SG/NACL/firewall."
      },
      {
        "number": 9,
        "title": "Estimar custo e alternativa gratuita",
        "instruction": "Liste componentes que poderiam gerar custo se criados de verdade.",
        "artifact": "NAT Gateway, Load Balancer, firewall gerenciado, tráfego entre zonas, logs e endpoints privados podem gerar custo.",
        "expectedOutput": "Tabela de riscos de cobrança e alternativa simulada.",
        "explanation": "Cloud networking mal planejado pode gerar custo recorrente alto."
      },
      {
        "number": 10,
        "title": "Definir limpeza obrigatória",
        "instruction": "Escreva como destruir recursos caso alguém implemente opcionalmente.",
        "artifact": "Checklist: apagar NAT, LB, endpoints, firewall, subnets, route tables, gateways, logs pagos e IPs públicos.",
        "expectedOutput": "Plano de limpeza documentado.",
        "explanation": "Todo lab cloud precisa nascer com saída segura."
      },
      {
        "number": 11,
        "title": "Validar sobreposição",
        "instruction": "Compare o CIDR cloud com filiais e VPNs fictícias.",
        "analysisTask": "Filial A 10.10.0.0/16; Filial B 10.20.0.0/16; VPN parceiros 172.20.0.0/16; Cloud 10.50.0.0/20.",
        "expectedOutput": "Sem sobreposição no cenário fictício.",
        "explanation": "Sobreposição é um dos erros mais caros em cloud híbrida."
      },
      {
        "number": 12,
        "title": "Entregar desenho final",
        "instruction": "Monte diagrama ou tabela final com subnets, zonas, rotas, segurança, custo e limpeza.",
        "artifact": "Documento de arquitetura cloud subnetting.",
        "expectedOutput": "Entrega completa e auditável.",
        "explanation": "O objetivo é transformar cálculo em arquitetura governável."
      }
    ],
    "expectedResult": "Plano cloud simulável com subnets por função/zona, route tables, matriz de segurança, custo estimado e limpeza obrigatória.",
    "validation": [
      {
        "check": "Subnets não se sobrepõem",
        "method": "Comparar rede e broadcast",
        "expected": "Nenhum intervalo cruza outro",
        "ifFails": "Recalcular prefixos."
      },
      {
        "check": "Subnets públicas são mínimas",
        "method": "Revisar função e exposição",
        "expected": "Apenas LB/bastion quando justificado",
        "ifFails": "Mover workloads para privadas."
      },
      {
        "check": "Banco não tem rota pública",
        "method": "Analisar matriz de rotas",
        "expected": "Sem 0.0.0.0/0 para IGW em DB",
        "ifFails": "Corrigir route table."
      },
      {
        "check": "Matriz de segurança tem menor privilégio",
        "method": "Verificar origem/destino/porta",
        "expected": "Sem any-any",
        "ifFails": "Restringir fluxos."
      },
      {
        "check": "Custo e limpeza documentados",
        "method": "Conferir checklist",
        "expected": "Componentes pagos e remoção listados",
        "ifFails": "Adicionar seção de limpeza."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "VPN não fecha rota para cloud",
        "probableCause": "CIDR sobreposto com rede local.",
        "howToConfirm": "Comparar tabelas de CIDR.",
        "fix": "Escolher bloco cloud não sobreposto ou redesenhar endereçamento."
      },
      {
        "symptom": "App privada não acessa atualização externa",
        "probableCause": "Sem NAT ou endpoint privado.",
        "howToConfirm": "Ver route table e logs.",
        "fix": "Usar NAT controlado ou endpoints privados conforme política/custo."
      },
      {
        "symptom": "Banco aparece acessível de fora",
        "probableCause": "Subnet/route/security group mal desenhados.",
        "howToConfirm": "Revisar rota pública e regras de entrada.",
        "fix": "Remover rota pública e restringir origem à app."
      }
    ],
    "improvements": [
      "Adicionar IPv6 em etapa separada.",
      "Transformar o desenho em Terraform sem aplicar.",
      "Criar políticas de tags, orçamento e alertas.",
      "Adicionar Private Endpoint/PrivateLink para serviços gerenciados."
    ],
    "evidenceToCollect": [
      "Tabela de subnets",
      "Matriz de rotas",
      "Matriz de segurança",
      "Estimativa de custo",
      "Checklist de limpeza",
      "Validação de não sobreposição",
      "Diagrama final"
    ],
    "questions": [
      "Por que banco deve ficar em subnet privada?",
      "Quando NAT Gateway pode gerar custo indesejado?",
      "Por que endpoints privados podem reduzir exposição, mas aumentar complexidade?"
    ],
    "challenge": "Adapte o desenho para três zonas e explique o impacto em quantidade de subnets, rotas, custo e observabilidade.",
    "solution": "Com três zonas, cada camada precisa de três subnets. A disponibilidade melhora, mas a quantidade de route tables, regras, logs e possíveis custos inter-zona aumenta. O desenho deve preservar menor privilégio e limpeza obrigatória."
  },
  "mentorQuestions": [
    "Se subnetting não é firewall, por que ele ainda é tão importante para segurança?",
    "Qual é o risco de conectar uma VPC nova com CIDR sobreposto a uma VPN corporativa?",
    "Como você provaria, com evidências, que uma subnet de dados não está exposta diretamente à Internet?"
  ],
  "quiz": [
    {
      "question": "Subnetting sozinho bloqueia tráfego entre duas redes?",
      "options": [
        "Sim, sempre",
        "Não; ele cria separação lógica, mas o bloqueio depende de rota e política",
        "Sim, se o CIDR for privado",
        "Apenas em redes Wi-Fi"
      ],
      "answer": 1,
      "explanation": "Subnetting cria limites lógicos. Bloqueio real depende de roteamento, firewall, ACLs, security groups ou controles equivalentes."
    },
    {
      "question": "Qual é um sinal de desenho perigoso em cloud?",
      "options": [
        "Banco de dados em subnet privada",
        "Flow logs habilitados",
        "Porta administrativa liberada para 0.0.0.0/0",
        "Subnets com tags de dono"
      ],
      "answer": 2,
      "explanation": "Liberar administração para 0.0.0.0/0 expõe o serviço para toda a Internet."
    },
    {
      "question": "Por que sobreposição de CIDR é grave em VPN?",
      "options": [
        "Porque reduz TTL",
        "Porque ARP atravessa VPN",
        "Porque rotas ficam ambíguas ou conflitantes",
        "Porque troca TCP por UDP"
      ],
      "answer": 2,
      "explanation": "Se dois lados usam o mesmo bloco, o roteamento não sabe distinguir corretamente os destinos."
    },
    {
      "question": "Qual zona normalmente deve ter acesso mais restrito?",
      "options": [
        "Dados",
        "Visitantes",
        "DMZ pública",
        "Sub-rede de testes sem dados"
      ],
      "answer": 0,
      "explanation": "Subnets de dados armazenam ativos sensíveis e devem aceitar apenas fluxos mínimos de aplicações autorizadas."
    },
    {
      "question": "Em DevSecOps, onde validar CIDR e exposição?",
      "options": [
        "Apenas depois do incidente",
        "No pull request e no pipeline de IaC",
        "Somente no roteador físico",
        "Nunca; isso é manual"
      ],
      "answer": 1,
      "explanation": "Validações em IaC permitem bloquear mudanças perigosas antes do deploy."
    },
    {
      "question": "Qual combinação representa segmentação mais madura?",
      "options": [
        "Subnet grande e regra allow any",
        "Subnets por zona, rotas controladas, firewall mínimo, logs e dono",
        "Apenas IP privado",
        "Apenas NAT"
      ],
      "answer": 1,
      "explanation": "Segmentação madura une desenho de endereçamento, controle de tráfego, governança e evidência."
    }
  ],
  "flashcards": [
    {
      "front": "Subnetting é firewall?",
      "back": "Não. Subnetting cria limites lógicos; firewall/ACL/security group aplicam política de permissão ou bloqueio."
    },
    {
      "front": "O que é blast radius?",
      "back": "É o alcance potencial de impacto de uma falha ou comprometimento."
    },
    {
      "front": "Por que evitar CIDR sobreposto?",
      "back": "Porque causa ambiguidade de rota, falhas em VPN/peering e troubleshooting difícil."
    },
    {
      "front": "O que deve ficar em subnet pública?",
      "back": "Apenas componentes que realmente precisam receber tráfego externo, como load balancer ou bastion controlado."
    },
    {
      "front": "O que é IPAM?",
      "back": "Processo ou ferramenta para gerenciar blocos IP, donos, finalidade, status, reservas e sobreposições."
    },
    {
      "front": "Qual é o papel de flow logs?",
      "back": "Registrar fluxos aceitos ou negados para auditoria, troubleshooting e resposta a incidentes."
    }
  ],
  "exercises": [
    {
      "title": "Classifique zonas",
      "prompt": "Classifique as zonas pública, app, dados, gerência e observabilidade por criticidade e exposição.",
      "expectedAnswer": "Dados e gerência são altamente críticos; pública é mais exposta; app é intermediária; observabilidade é crítica para investigação."
    },
    {
      "title": "Detecte risco",
      "prompt": "Uma subnet de banco possui rota direta para Internet Gateway. Qual é o problema?",
      "expectedAnswer": "Banco não deve ter exposição pública direta; deve ficar em subnet privada, com acesso restrito de aplicações autorizadas."
    },
    {
      "title": "Analise CIDR",
      "prompt": "Uma empresa usa 10.0.0.0/8 em todos os ambientes. Cite dois problemas.",
      "expectedAnswer": "Blast radius e allowlists amplas; alto risco de sobreposição com cloud, VPN, parceiros e aquisições."
    },
    {
      "title": "Proponha matriz",
      "prompt": "Escreva três fluxos permitidos entre DMZ, app e dados.",
      "expectedAnswer": "Internet->DMZ em HTTPS; DMZ/LB->app em porta da aplicação; app->dados apenas na porta do banco; todo o resto negado e logado conforme necessidade."
    }
  ],
  "challenge": {
    "title": "Redesenhe uma cloud insegura",
    "scenario": "Uma VPC usa 10.0.0.0/16. Todas as VMs ficam em uma única subnet pública. O banco aceita tráfego da subnet inteira. SSH está liberado para 0.0.0.0/0. A empresa quer conectar uma VPN que também usa 10.0.0.0/16.",
    "tasks": [
      "Identificar pelo menos cinco riscos.",
      "Propor novo plano de sub-redes por zona.",
      "Definir quais subnets devem ser públicas e privadas.",
      "Criar matriz mínima de comunicação.",
      "Explicar como evitar sobreposição com a VPN.",
      "Sugerir duas validações DevSecOps para impedir regressão."
    ],
    "rubric": [
      "Identifica falsa segmentação e exposição pública.",
      "Remove SSH/RDP público direto.",
      "Isola dados em subnet privada.",
      "Evita sobreposição de CIDR antes da conexão VPN.",
      "Inclui logs, dono e política mínima.",
      "Propõe validação em IaC/pipeline."
    ]
  },
  "commentedSolution": {
    "summary": "O desenho inseguro deve ser separado em zonas, com CIDR não sobreposto, subnets privadas para app e dados, subnet pública apenas para entrada controlada, gerência via bastion/VPN/PAM e políticas mínimas entre zonas.",
    "steps": [
      "Escolha um CIDR que não sobreponha a VPN, por exemplo 10.40.0.0/22 se disponível no IPAM.",
      "Crie subnet pública pequena para load balancer/bastion controlado.",
      "Crie subnet privada de aplicação sem entrada direta da Internet.",
      "Crie subnet de dados ainda mais restrita, acessível apenas pela aplicação.",
      "Crie subnet de gerência acessível apenas por VPN/bastion/PAM/MFA.",
      "Bloqueie SSH/RDP a partir de 0.0.0.0/0.",
      "Habilite flow logs, logs do firewall e alertas de regra ampla.",
      "Adicione validação em pipeline para CIDR sobreposto, subnet pública indevida e regra administrativa ampla."
    ],
    "finalAnswer": "A solução não é apenas trocar números. É transformar o endereçamento em arquitetura governada: zonas claras, rotas controladas, política mínima, logs e revisão automatizada."
  },
  "glossary": [
    {
      "term": "Zona de segurança",
      "definition": "Área lógica com função, criticidade e políticas próprias."
    },
    {
      "term": "Blast radius",
      "definition": "Alcance potencial de impacto de um incidente ou falha."
    },
    {
      "term": "Subnet pública",
      "definition": "Sub-rede com rota de entrada/saída pública, normalmente usada para componentes expostos de forma controlada."
    },
    {
      "term": "Subnet privada",
      "definition": "Sub-rede sem exposição direta à Internet, usada para aplicações e dados internos."
    },
    {
      "term": "Sobreposição de CIDR",
      "definition": "Quando dois ambientes usam o mesmo bloco IP, causando conflito de roteamento."
    },
    {
      "term": "Flow logs",
      "definition": "Registros de tráfego de rede usados para auditoria e investigação."
    },
    {
      "term": "IPAM",
      "definition": "Gerenciamento de endereços IP, incluindo blocos, donos, uso, reservas e status."
    }
  ],
  "references": [
    "Redes e Network v2.0 — Módulo 3: Ethernet, MAC, Switches e ARP",
    "Redes e Network v2.0 — Módulo 4: IPv4 e Endereçamento",
    "Redes e Network v2.0 — Módulo 5: aulas 5.1 a 5.8",
    "Infraestrutura Moderna, Platform Engineering e DevSecOps — módulos de cloud, IaC e pipelines",
    "Enterprise Identity, IAM e Segurança de Identidades — conceitos de menor privilégio e controle de acesso"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e pipelines",
      "reason": "Validações de CIDR, rotas e regras de segurança devem ser automatizadas em infraestrutura como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Menor privilégio",
      "reason": "Segmentação de rede deve ser combinada com identidade, MFA, PAM e autorização por serviço."
    },
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs são a contraparte de Camada 2 para segmentação de sub-redes."
    },
    {
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Gateway e rota local explicam como o tráfego sai de uma sub-rede para outra."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções da aula.",
      "Completar o laboratório lab-5.9.",
      "Acertar pelo menos 70% do quiz.",
      "Entregar a matriz de sub-redes e comunicação do desafio.",
      "Explicar por que subnetting não substitui firewall e IAM."
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.10"
    ],
    "xpAward": 250,
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
