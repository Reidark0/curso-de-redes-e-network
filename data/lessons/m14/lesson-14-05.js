export const lesson1405 = {
  "id": "14.5",
  "moduleId": "m14",
  "order": 5,
  "title": "Security Groups, NSG, NACL e Cloud Firewalls",
  "subtitle": "Como controlar tráfego em cloud sem confundir rota, permissão, inspeção, estado de conexão e logging.",
  "duration": "100-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 300,
  "tags": [
    "cloud networking",
    "security groups",
    "nsg",
    "nacl",
    "cloud firewall",
    "aws",
    "azure",
    "gcp",
    "segurança",
    "troubleshooting",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.3",
      "reason": "É necessário entender VPC/VNet, CIDR e subnets antes de aplicar controles de tráfego."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "reason": "Controles de tráfego dependem do caminho decidido por route tables, Internet Gateway, NAT Gateway e UDR."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall, ACLs e políticas de tráfego são base conceitual direta desta aula."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação e zonas de segurança orientam quais fluxos devem ser permitidos."
    }
  ],
  "objectives": [
    "Diferenciar Security Groups, NSGs, NACLs, VPC firewall rules e Cloud Firewalls.",
    "Explicar estado de conexão, direção de regra, prioridade, escopo e deny implícito.",
    "Desenhar regras de menor privilégio para web, aplicação, dados, gestão e egress.",
    "Relacionar controles cloud com rotas, subnets, NAT, firewall central, logs e SIEM.",
    "Diagnosticar bloqueios causados por regra errada, rota ausente, ordem de prioridade ou controle em camada diferente.",
    "Definir guardrails DevSecOps para impedir regras amplas e exceções sem expiração."
  ],
  "learningOutcomes": [
    "Dado um fluxo, o aluno identifica quais controles precisam permitir tráfego e quais logs devem provar isso.",
    "Dado um conjunto de regras, o aluno reconhece exposição indevida e propõe menor privilégio.",
    "Dado um bloqueio em cloud, o aluno diferencia falha de rota, SG/NSG, NACL, firewall central, DNS e aplicação.",
    "Dado um pipeline IaC, o aluno propõe políticas para bloquear portas administrativas abertas e egress amplo sem justificativa."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma VM de aplicação em cloud precisa receber tráfego HTTPS do load balancer, acessar um banco privado na porta 5432 e enviar logs para um serviço de observabilidade. A equipe cria um security group permitindo <code>0.0.0.0/0</code> na porta 443, outro para o banco e uma regra de saída ampla porque “é só para funcionar”. Em poucos dias, ninguém sabe responder perguntas simples: quem pode acessar o banco? O tráfego de saída é controlado? O ambiente de desenvolvimento consegue falar com produção? Existe diferença entre regra na instância, regra na subnet e firewall gerenciado?</p>\n  <p>Cloud networking trouxe controles de segurança muito poderosos, mas também multiplicou camadas: Security Groups na AWS, NSGs no Azure, VPC firewall rules no Google Cloud, NACLs, cloud firewalls, firewalls de próxima geração, policies hierárquicas, service tags, network tags, application security groups, flow logs e regras geradas por IaC. Sem um modelo mental claro, a equipe abre demais, bloqueia sem querer, cria exceções eternas ou perde visibilidade de tráfego crítico.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> em cloud, uma aplicação pode estar em subnet privada, mas ainda assim estar exposta por regra permissiva, load balancer mal configurado, egress amplo, peering sem restrição ou exceção antiga nunca revisada.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Nas redes tradicionais, controle de tráfego era frequentemente concentrado em firewalls de borda, ACLs de roteador, VLANs e appliances internos. O modelo era visual: cabos, interfaces, zonas e equipamentos. Em cloud, a rede passou a ser software-defined. Isso permitiu aplicar políticas próximas ao workload, automatizar regras via API e tratar segurança como código.</p>\n  <p>A AWS popularizou o uso de Security Groups como firewalls virtuais associados a recursos, enquanto NACLs atuam no nível de subnet. O Azure usa Network Security Groups para filtrar tráfego em interfaces e subnets, além de Azure Firewall para inspeção centralizada. O Google Cloud usa regras de firewall da VPC, policies e Cloud NGFW para controle distribuído e hierárquico. O objetivo comum é o mesmo: transformar intenção de segurança em regras aplicadas no plano de dados cloud.</p>\n  <p>A evolução importante não é apenas “firewall na nuvem”. É a mudança de perímetro fixo para controles distribuídos, versionáveis, auditáveis e integrados a identidade, tags, automação e observabilidade.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é decidir, com precisão, qual tráfego deve ser permitido ou negado entre usuários, workloads, subnets, serviços gerenciados, internet, datacenter e ambientes. Em cloud, essa decisão é espalhada por múltiplos objetos. Se o time não entende estado de conexão, direção, prioridade, escopo e ordem de avaliação, o resultado é insegurança ou indisponibilidade.</p>\n  <ul>\n    <li><strong>Escopo errado:</strong> aplicar regra na subnet quando deveria estar no workload, ou no workload quando deveria haver firewall central.</li>\n    <li><strong>Direção errada:</strong> liberar inbound e esquecer egress, ou liberar egress amplo sem justificativa.</li>\n    <li><strong>Estado mal entendido:</strong> confundir controles stateful com controles stateless.</li>\n    <li><strong>Ordem de regra ignorada:</strong> acreditar que a primeira regra visual é sempre a que decide, mesmo quando o provedor usa prioridade numérica, deny implícito ou regras default.</li>\n    <li><strong>Camada errada:</strong> tentar resolver controle L7 com regra L3/L4 simples.</li>\n    <li><strong>Sem evidência:</strong> não habilitar flow logs, firewall logs ou mudanças auditáveis.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Pergunta central:</strong> para cada fluxo, você consegue dizer origem, destino, porta, protocolo, identidade do recurso, controle aplicado, regra que permitiu ou negou e evidência gerada?</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução dos controles de tráfego em cloud mostra uma passagem de regras simples de rede para políticas mais ricas, combinando contexto, escala e governança.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Controle</th><th>Escopo típico</th><th>Força</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>ACL de roteador</td><td>Interface ou caminho</td><td>Simples e previsível</td><td>Pouco contexto de workload</td></tr>\n      <tr><td>NACL</td><td>Subnet</td><td>Camada adicional e stateless</td><td>Exige regra explícita de retorno e pode ficar difícil de operar</td></tr>\n      <tr><td>Security Group / NSG</td><td>Workload, interface ou subnet</td><td>Stateful e próximo do recurso</td><td>Não substitui inspeção profunda nem governança de egress</td></tr>\n      <tr><td>Cloud Firewall / NGFW</td><td>Hub, VPC/VNet, organização ou caminho</td><td>Inspeção centralizada, logging e política avançada</td><td>Custo, latência, complexidade e dependência crítica</td></tr>\n      <tr><td>Policy as Code</td><td>Pipeline e organização</td><td>Previne drift e regra insegura antes do deploy</td><td>Exige maturidade de engenharia e exceções bem governadas</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p><strong>Security Groups</strong>, <strong>NSGs</strong>, <strong>NACLs</strong> e <strong>Cloud Firewalls</strong> são mecanismos usados para controlar tráfego em redes cloud. Eles não são iguais. Cada um atua em um escopo diferente, com comportamento diferente de estado, ordem, prioridade, logging e expressividade.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> controles de tráfego cloud são políticas de rede aplicadas a recursos, interfaces, subnets, VPCs/VNets, hubs ou organizações para permitir, negar, registrar ou inspecionar fluxos entre origens e destinos.</div>\n  <p>Uma regra geralmente combina direção, origem, destino, protocolo, porta, ação e prioridade. Em alguns provedores, também pode usar tags, service accounts, service tags, application security groups, FQDNs, threat intelligence, categorias, domínios ou assinatura de ameaça. O desenho correto depende de saber qual controle resolve qual problema.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno pode ser entendido como uma sequência de avaliação. O pacote sai de um workload ou chega até ele. A cloud verifica se existe rota, qual controle se aplica, se a regra permite, se há estado de conexão, se existe inspeção adicional e se logs serão gerados.</p>\n  <ol class=\"flow-list\">\n    <li><strong>O pacote nasce:</strong> um workload tenta falar com outro destino usando IP, porta e protocolo.</li>\n    <li><strong>A rota é avaliada:</strong> sem caminho, não há controle de segurança que resolva.</li>\n    <li><strong>Controles de subnet podem ser avaliados:</strong> NACLs, NSGs em subnet, policies ou firewall distribuído podem bloquear antes do workload.</li>\n    <li><strong>Controles do workload/interface são avaliados:</strong> Security Groups, NSGs de NIC ou firewall local decidem tráfego permitido.</li>\n    <li><strong>Estado de conexão é considerado:</strong> controles stateful reconhecem tráfego de retorno de uma sessão permitida; controles stateless exigem regras explícitas nos dois sentidos.</li>\n    <li><strong>Inspeção centralizada pode ocorrer:</strong> Cloud Firewall ou NGFW pode aplicar regras L3/L4, FQDN, TLS inspection, IDS/IPS ou threat intelligence.</li>\n    <li><strong>Logs e métricas são gerados:</strong> flow logs, firewall logs, audit logs e métricas alimentam SIEM e troubleshooting.</li>\n  </ol>\n  <p>O ponto mais importante é que “permitido em uma camada” não significa “permitido em todas”. Um pacote pode passar pelo Security Group e ser bloqueado pelo NACL, pela UDR que manda para firewall, pelo NSG de subnet, pelo firewall local do host, por política de proxy ou pela aplicação.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura cloud madura, controles de tráfego aparecem em camadas. A camada de workload aplica menor privilégio próximo ao recurso. A camada de subnet separa zonas e reduz exposição. A camada de firewall central aplica inspeção, logging e regras corporativas. A camada de governança impede que IaC publique regras inseguras.</p>\n  <ul>\n    <li><strong>Camada envolvida:</strong> principalmente L3/L4, com Cloud Firewalls podendo chegar a L7.</li>\n    <li><strong>Componentes:</strong> SG, NSG, NACL, firewall cloud, load balancer, route table, flow logs, SIEM, IaC e policy engine.</li>\n    <li><strong>Dependências:</strong> CIDR, subnets, rotas, DNS, identidade, tags, inventário e owner do serviço.</li>\n    <li><strong>Pontos de falha:</strong> regra ampla, regra duplicada, ordem incorreta, deny implícito, rota bypassando firewall, falta de log e exceção sem expiração.</li>\n  </ul>\n  <p>A arquitetura correta não é “colocar todos os controles possíveis”. É definir onde cada decisão deve acontecer, com mínimo privilégio, baixa complexidade, evidência e revisão contínua.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um prédio corporativo. A rota é o corredor que leva até uma sala. O security group é o crachá na porta da sala. O NACL é uma catraca no andar. O firewall central é uma recepção com inspeção mais detalhada. O SIEM é o sistema que registra quem entrou, por onde passou e por que motivo.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes cloud processam tráfego em microssegundos, com regras distribuídas, estado de conexão e automação. Diferente de um prédio, uma regra mal feita pode abrir milhares de workloads instantaneamente.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Você tem uma VM web e uma VM de banco. A VM web precisa receber HTTPS do load balancer e falar com o banco na porta 5432. O banco não deve aceitar tráfego da internet nem de máquinas administrativas aleatórias.</p>\n  <table class=\"data-table\">\n    <thead><tr><th>Recurso</th><th>Regra correta</th><th>Erro comum</th></tr></thead>\n    <tbody>\n      <tr><td>Web</td><td>Permitir 443 apenas do load balancer ou camada esperada</td><td>Abrir 22, 3389 e 443 para 0.0.0.0/0</td></tr>\n      <tr><td>Banco</td><td>Permitir 5432 apenas do grupo/segmento da aplicação</td><td>Permitir 5432 da VPC inteira</td></tr>\n      <tr><td>Egress</td><td>Permitir apenas destinos necessários ou passar por NAT/proxy/firewall</td><td>Allow all sem log ou owner</td></tr>\n    </tbody>\n  </table>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, regras cloud precisam refletir zonas: internet, DMZ, aplicações, dados, gerenciamento, segurança, integração e serviços compartilhados. O time de rede quer rotas e firewalls consistentes. O time de segurança quer menor privilégio, logs e exceções justificadas. O time de plataforma quer módulos Terraform reutilizáveis. O time de aplicação quer deploy rápido sem abrir chamado para cada porta.</p>\n  <p>A solução empresarial é padronizar modelos: grupos por função, regras por fluxo aprovado, nomenclatura, tags obrigatórias, revisão periódica, flow logs, alertas de regra ampla e pipeline impedindo abertura insegura. O controle técnico precisa virar processo operacional.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em AWS, Security Groups são aplicados a recursos como ENIs e funcionam como firewall virtual stateful; Network ACLs atuam no nível da subnet. Em Azure, Network Security Groups podem ser associados a subnets ou interfaces e usam regras com prioridade, direção, origem, destino, porta, protocolo e ação. Em Google Cloud, VPC firewall rules e Network Firewall Policies controlam tráfego por rede, alvo, tags, service accounts e prioridade.</p>\n  <p>O equivalente entre provedores não é perfeito. Por isso, o aluno não deve decorar “SG = NSG = firewall rule” de forma cega. O correto é perguntar: qual é o escopo? É stateful? Tem deny explícito? Há prioridade? Gera log? Pode referenciar identidade, tag ou grupo? Funciona em subnet, interface, workload, organização ou caminho central?</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, regras de rede viram código. Um módulo Terraform pode criar VPC, subnets, security groups, NSGs, firewall rules e logging. O pipeline pode negar pull requests que tentem liberar <code>0.0.0.0/0</code> para portas administrativas, criar egress irrestrito sem justificativa ou desabilitar flow logs.</p>\n  <p>Esse modelo reduz drift, mas cria uma responsabilidade nova: o pipeline precisa entender intenção. Nem toda regra ampla é maliciosa, e nem toda regra específica é segura. Por isso, políticas devem exigir owner, ambiente, ticket, justificativa, expiração e evidência de teste.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Controles cloud mal configurados são uma causa frequente de exposição. O risco não está apenas em abrir uma porta para internet. Também existe risco em permitir tráfego lateral amplo, egress irrestrito, bypass de firewall central, regras antigas sem owner e logs desabilitados.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Porta administrativa exposta</td><td>SSH/RDP liberado para 0.0.0.0/0</td><td>Força bruta, exploração e acesso indevido</td><td>Bastion, ZTNA, VPN, JIT, MFA e deny por padrão</td></tr>\n      <tr><td>Egress amplo</td><td>Saída any-any sem proxy ou firewall</td><td>Exfiltração e C2 menos visíveis</td><td>Egress control, proxy, allowlist, logs e alertas</td></tr>\n      <tr><td>Banco acessível demais</td><td>Regra permite toda VPC/VNet</td><td>Movimento lateral e abuso de credenciais</td><td>Origem por grupo, subnet mínima ou identidade de workload</td></tr>\n      <tr><td>Bypass de inspeção</td><td>Rota direta evita firewall/NVA</td><td>Perda de visibilidade e política corporativa</td><td>UDR consistente, guardrails e validação de rotas efetivas</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"sgnsg-title sgnsg-desc\">\n    <title id=\"sgnsg-title\">Camadas de controle de tráfego em cloud</title>\n    <desc id=\"sgnsg-desc\">Diagrama mostra internet, load balancer, subnet pública, subnet de aplicação, subnet de dados, security groups, NACL ou NSG, cloud firewall e SIEM.</desc>\n    <defs>\n      <marker id=\"arrow-sgnsg-1405\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"40\" width=\"920\" height=\"480\" rx=\"18\" class=\"svg-boundary\" />\n    <text x=\"490\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">VPC/VNet com controles em camadas</text>\n    <rect x=\"70\" y=\"110\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"145\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n    <rect x=\"285\" y=\"110\" width=\"165\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"367\" y=\"142\" text-anchor=\"middle\" class=\"svg-label\">Load Balancer</text>\n    <text x=\"367\" y=\"162\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">entrada controlada</text>\n    <rect x=\"520\" y=\"100\" width=\"170\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"605\" y=\"136\" text-anchor=\"middle\" class=\"svg-label\">Cloud Firewall</text>\n    <text x=\"605\" y=\"160\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">inspeção e logs</text>\n    <rect x=\"760\" y=\"110\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"835\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">SIEM/SOC</text>\n    <rect x=\"95\" y=\"265\" width=\"210\" height=\"145\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"200\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Subnet App</text>\n    <rect x=\"125\" y=\"320\" width=\"150\" height=\"54\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"200\" y=\"352\" text-anchor=\"middle\" class=\"svg-label\">SG/NSG App</text>\n    <rect x=\"385\" y=\"265\" width=\"210\" height=\"145\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Subnet Dados</text>\n    <rect x=\"415\" y=\"320\" width=\"150\" height=\"54\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"490\" y=\"352\" text-anchor=\"middle\" class=\"svg-label\">SG/NSG DB</text>\n    <rect x=\"675\" y=\"265\" width=\"210\" height=\"145\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"780\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Subnet Gestão</text>\n    <rect x=\"705\" y=\"320\" width=\"150\" height=\"54\" rx=\"10\" class=\"svg-node svg-node--security\" />\n    <text x=\"780\" y=\"352\" text-anchor=\"middle\" class=\"svg-label\">Bastion/ZTNA</text>\n    <line x1=\"220\" y1=\"145\" x2=\"285\" y2=\"145\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sgnsg-1405)\" />\n    <line x1=\"450\" y1=\"145\" x2=\"520\" y2=\"145\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sgnsg-1405)\" />\n    <line x1=\"605\" y1=\"190\" x2=\"220\" y2=\"320\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sgnsg-1405)\" />\n    <line x1=\"275\" y1=\"347\" x2=\"415\" y2=\"347\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sgnsg-1405)\" />\n    <line x1=\"780\" y1=\"320\" x2=\"565\" y2=\"320\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-sgnsg-1405)\" />\n    <line x1=\"690\" y1=\"145\" x2=\"760\" y2=\"145\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-sgnsg-1405)\" />\n    <text x=\"490\" y=\"455\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Route tables definem caminho; SG/NSG/NACL/Firewall permitem, negam, inspecionam e registram.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é conceitual, defensivo e sem custo cloud. Você irá desenhar regras para um ambiente web-app-db, comparar Security Group, NSG, NACL e Cloud Firewall, e validar se cada fluxo tem justificativa, controle e evidência.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam leitura de regras, identificação de exposição, diferença entre stateful/stateless e desenho de menor privilégio.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma revisão de segurança em que a empresa precisa reduzir exposição sem quebrar aplicação crítica.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como sair de regras amplas para uma matriz de fluxos aprovada, testável e monitorada.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> controles cloud precisam ser entendidos por escopo, estado, direção, prioridade, logging e governança.</li>\n    <li><strong>O que lembrar:</strong> Security Group/NSG não substitui firewall central quando há inspeção, e NACL não deve virar política principal complexa.</li>\n    <li><strong>Erro comum:</strong> abrir 0.0.0.0/0 para resolver pressa e nunca revisar.</li>\n    <li><strong>Uso real:</strong> revisão de regras cloud é atividade contínua de segurança, plataforma, redes e auditoria.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar <strong>Load Balancers, health checks, TLS e publicação de serviços</strong>. Depois de entender como controlar tráfego, precisamos entender como serviços são publicados, balanceados, verificados e protegidos.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7 quando há firewall de aplicação ou NGFW"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação em inspeção avançada"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "ICMP",
      "DNS",
      "TLS",
      "HTTP"
    ],
    "dependsOn": [
      "subnetting",
      "route tables",
      "firewall",
      "ACL",
      "NAT",
      "logs"
    ],
    "enables": [
      "menor privilégio",
      "egress control",
      "segmentação",
      "cloud firewall",
      "SIEM",
      "policy as code"
    ]
  },
  "protocolFields": [
    {
      "field": "source",
      "size": "variável",
      "purpose": "Define origem permitida ou negada.",
      "securityObservation": "Origem 0.0.0.0/0 precisa ser exceção justificada, principalmente em portas administrativas."
    },
    {
      "field": "destination",
      "size": "variável",
      "purpose": "Define o recurso, CIDR, tag ou grupo de destino.",
      "securityObservation": "Destino amplo aumenta superfície de movimento lateral."
    },
    {
      "field": "protocol/port",
      "size": "camada 4",
      "purpose": "Define TCP, UDP, ICMP e portas permitidas.",
      "securityObservation": "Porta permitida não prova que aplicação é autorizada; validação de identidade e camada 7 podem ser necessárias."
    },
    {
      "field": "priority/order",
      "size": "conceitual",
      "purpose": "Define precedência entre regras.",
      "securityObservation": "Prioridade incorreta pode permitir tráfego antes de uma regra de bloqueio esperada."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente externo",
      "action": "Envia HTTPS ao load balancer",
      "detail": "Rota e DNS apontam para ponto público de entrada.",
      "possibleFailure": "Regra inbound ausente, WAF bloqueando ou health check falhando."
    },
    {
      "step": 2,
      "actor": "Load balancer",
      "action": "Encaminha para aplicação",
      "detail": "Regra do workload permite origem do load balancer na porta da aplicação.",
      "possibleFailure": "SG/NSG da aplicação permite internet direta em vez de apenas LB."
    },
    {
      "step": 3,
      "actor": "Aplicação",
      "action": "Acessa banco privado",
      "detail": "Banco permite apenas origem do grupo da aplicação.",
      "possibleFailure": "Regra do banco ampla demais ou bloqueio por NACL/NSG de subnet."
    },
    {
      "step": 4,
      "actor": "Aplicação",
      "action": "Sai para API externa",
      "detail": "Egress passa por NAT, proxy ou firewall.",
      "possibleFailure": "Egress irrestrito, custo alto ou ausência de logs."
    },
    {
      "step": 5,
      "actor": "SIEM/SOC",
      "action": "Recebe logs",
      "detail": "Flow logs e firewall logs alimentam investigação.",
      "possibleFailure": "Logs desativados ou sem contexto de recurso e owner."
    }
  ],
  "deepDive": {
    "mentalModel": "Controle de tráfego cloud é uma cadeia: rota define caminho; controle de rede decide permissão; firewall pode inspecionar; logging cria evidência; IaC evita drift.",
    "keyTerms": [
      "Security Group",
      "NSG",
      "NACL",
      "Cloud Firewall",
      "stateful",
      "stateless",
      "deny implícito",
      "egress control",
      "flow logs"
    ],
    "limitations": [
      "Regras L3/L4 não entendem intenção de negócio.",
      "NACLs stateless podem ficar complexas e frágeis.",
      "Cloud Firewalls aumentam custo e exigem arquitetura de rotas consistente.",
      "Security Groups/NSGs não substituem IAM, criptografia, validação de aplicação ou patching."
    ],
    "whenToUse": [
      "Use SG/NSG para menor privilégio próximo ao workload.",
      "Use NACL como camada adicional simples em subnet, não como política complexa principal.",
      "Use Cloud Firewall/NGFW para inspeção centralizada, egress control, FQDN, threat intel e logs avançados.",
      "Use policy as code para prevenir regras inseguras antes do deploy."
    ],
    "whenNotToUse": [
      "Não use regra ampla permanente para resolver incidente temporário.",
      "Não use NACL para controlar centenas de exceções de aplicação.",
      "Não confie apenas em regra de rede para proteger aplicação sem autenticação e autorização.",
      "Não force todo tráfego por firewall central sem capacidade, HA e plano de custos."
    ],
    "operationalImpact": [
      "Exige inventário de regras, owner, ticket, justificativa e validade.",
      "Muda troubleshooting: é preciso olhar rota, regra, estado, ordem e logs.",
      "Requer revisão periódica de regras amplas e não utilizadas.",
      "Depende de padronização de tags, nomes e módulos IaC."
    ],
    "financialImpact": [
      "Cloud Firewalls, NAT, flow logs, tráfego inspecionado e armazenamento de logs podem gerar custo relevante.",
      "Regras mais restritivas podem reduzir risco de exfiltração e tráfego desnecessário.",
      "Logs detalhados aumentam custo de ingestão e retenção em SIEM, mas reduzem tempo de investigação."
    ],
    "securityImpact": [
      "Menor privilégio reduz superfície de ataque e movimento lateral.",
      "Egress control melhora detecção de C2 e exfiltração.",
      "Regras sem owner criam dívida de segurança e falsa sensação de controle."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Abrir portas administrativas para 0.0.0.0/0.",
      "whyItHappens": "Pressa de acesso remoto e falta de bastion/ZTNA.",
      "consequence": "Exposição a varredura, força bruta e exploração.",
      "correction": "Usar acesso administrativo por bastion, VPN, ZTNA, JIT, MFA e escopo mínimo."
    },
    {
      "mistake": "Achar que SG/NSG resolve inspeção L7.",
      "whyItHappens": "O termo firewall cria expectativa de inspeção completa.",
      "consequence": "Tráfego permitido por porta pode conter comportamento malicioso não inspecionado.",
      "correction": "Usar WAF, proxy, NGFW, IDS/IPS e logs quando o requisito exigir inspeção avançada."
    },
    {
      "mistake": "Usar egress any-any como padrão.",
      "whyItHappens": "Muitas aplicações precisam baixar pacotes e acessar APIs externas.",
      "consequence": "Exfiltração e C2 ficam mais difíceis de conter e investigar.",
      "correction": "Definir egress por destino, proxy, firewall, endpoints privados e logs."
    },
    {
      "mistake": "Não registrar mudanças de regra.",
      "whyItHappens": "Alterações manuais no console parecem rápidas.",
      "consequence": "Drift, auditoria fraca e rollback difícil.",
      "correction": "Usar IaC, revisão por pull request, audit logs e controle de exceções."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "VM não recebe conexão esperada",
      "Aplicação acessa banco em dev mas não em prod",
      "Tráfego de retorno falha",
      "Fluxo aparece no firewall mas não no workload",
      "Flow log mostra deny sem clareza de regra"
    ],
    "diagnosticQuestions": [
      "Existe rota para o destino?",
      "Qual controle se aplica à subnet e à interface?",
      "O controle é stateful ou stateless?",
      "A regra cobre origem, destino, protocolo e porta corretos?",
      "Há regra de prioridade mais específica?",
      "Há logs de allow/deny?"
    ],
    "commands": [
      {
        "platform": "AWS CLI",
        "command": "aws ec2 describe-security-groups && aws ec2 describe-network-acls",
        "purpose": "Inventariar Security Groups e NACLs.",
        "expectedObservation": "Regras por grupo, inbound/outbound, CIDRs e referências a grupos.",
        "interpretation": "Ajuda a identificar exposição, regras amplas e controles em subnet."
      },
      {
        "platform": "Azure CLI",
        "command": "az network nsg list && az network nic list-effective-nsg",
        "purpose": "Listar NSGs e regras efetivas associadas a interfaces.",
        "expectedObservation": "Regras com prioridade, direção, origem, destino, protocolo e ação.",
        "interpretation": "Ajuda a diagnosticar regra efetiva e conflito de prioridade."
      },
      {
        "platform": "Google Cloud CLI",
        "command": "gcloud compute firewall-rules list",
        "purpose": "Listar regras de firewall de VPC.",
        "expectedObservation": "Nome, rede, direção, prioridade, ação, alvos e filtros.",
        "interpretation": "Permite revisar exposição e regras herdadas."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen && curl -v https://exemplo.local",
        "purpose": "Validar serviço local e tentativa de conexão.",
        "expectedObservation": "Porta escutando e tentativa de conexão com erro claro.",
        "interpretation": "Se a aplicação não escuta, não adianta abrir regra cloud."
      }
    ],
    "decisionTree": [
      {
        "if": "Sem rota para o destino",
        "then": "Corrigir route table/UDR antes de mexer em SG/NSG."
      },
      {
        "if": "Rota existe, mas flow log mostra deny",
        "then": "Identificar controle que negou: SG, NSG, NACL, firewall ou política hierárquica."
      },
      {
        "if": "Controle permite, mas aplicação não responde",
        "then": "Validar firewall local, processo escutando, health check, DNS e TLS."
      },
      {
        "if": "Funciona em uma direção, mas retorno falha",
        "then": "Verificar estado de conexão, NACL stateless, rota assimétrica e NAT."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Aplicar menor privilégio por fluxo e não por rede inteira.",
      "Evitar portas administrativas expostas à internet.",
      "Usar referências a grupos/tags quando fizer sentido, em vez de CIDRs amplos.",
      "Habilitar flow logs, firewall logs e audit logs.",
      "Revisar regras amplas e não utilizadas periodicamente.",
      "Criar guardrails IaC para bloquear regras inseguras."
    ],
    "badPractices": [
      "Liberar 0.0.0.0/0 para SSH, RDP, banco ou painel administrativo.",
      "Usar allow all egress sem justificativa.",
      "Criar exceção manual sem expiração.",
      "Depender de NACL complexa como política principal de aplicação.",
      "Desabilitar logs para economizar sem avaliar risco."
    ],
    "commonErrors": [
      "Confundir rota com permissão.",
      "Confundir stateful com stateless.",
      "Aplicar regra no recurso errado.",
      "Ignorar ordem de prioridade.",
      "Não testar tráfego de retorno."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição administrativa pública",
        "description": "Portas de administração abertas para a internet.",
        "defensiveExplanation": "É frequentemente detectável por varreduras externas e aumenta muito a superfície de ataque.",
        "mitigation": "Bastion, ZTNA, VPN, JIT, MFA, IP allowlist restrita e alertas."
      },
      {
        "name": "Movimento lateral por regra ampla",
        "description": "Workloads podem acessar muitos destinos internos sem necessidade.",
        "defensiveExplanation": "Um host comprometido ganha mais caminhos de exploração.",
        "mitigation": "Segmentação, regras por fluxo, origem específica, microsegmentação e logs."
      },
      {
        "name": "Egress irrestrito",
        "description": "Workloads podem enviar tráfego para qualquer destino externo.",
        "defensiveExplanation": "Dificulta conter C2, download indevido e exfiltração.",
        "mitigation": "Proxy, firewall, private endpoints, allowlist, DNS controlado e SIEM."
      }
    ],
    "monitoring": [
      "Alertar criação de regra 0.0.0.0/0 em portas sensíveis.",
      "Monitorar egress incomum por destino, volume e horário.",
      "Registrar mudanças de SG/NSG/NACL/firewall.",
      "Correlacionar flow logs com IAM, EDR e deployment."
    ],
    "hardening": [
      "Deny by default com exceções justificadas.",
      "Separar regras por função e ambiente.",
      "Exigir tags de owner, aplicação, criticidade e expiração.",
      "Usar módulos IaC aprovados."
    ],
    "detectionIdeas": [
      "Regra administrativa pública recém-criada.",
      "Aumento de conexões laterais entre subnets.",
      "Tráfego de banco vindo de origem inesperada.",
      "Egress para países, ASNs ou domínios raros.",
      "Mudança manual fora do pipeline."
    ]
  },
  "lab": {
    "id": "lab-14.5",
    "title": "Desenhando controles cloud de menor privilégio sem custo",
    "labType": "cloud",
    "objective": "Criar uma matriz de fluxos e traduzi-la em controles equivalentes de AWS, Azure e Google Cloud, sem provisionar recursos reais.",
    "scenario": "Uma empresa possui uma aplicação web em três camadas: load balancer público, aplicação privada, banco privado, bastion/ZTNA, observabilidade e integração com API externa. O objetivo é reduzir exposição e garantir evidência para SOC.",
    "topology": "Internet -> Load Balancer -> App privada -> Banco privado; App -> API externa via NAT/Firewall; Admin -> Bastion/ZTNA -> App; Logs -> SIEM.",
    "architecture": "VPC/VNet com subnet pública de entrada, subnet de aplicação, subnet de dados, subnet de gestão, firewall/egress e flow logs.",
    "prerequisites": [
      "Conhecer CIDR, subnets e route tables.",
      "Ter estudado firewalls e segmentação nos módulos anteriores.",
      "Não é necessário criar conta cloud nem provisionar recursos."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Opcional: draw.io/local ou papel",
      "Documentação oficial do provedor escolhido"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não provisionar recursos reais neste laboratório.",
      "Não testar regras em ambiente de produção.",
      "Não coletar dados de terceiros.",
      "Não transformar exemplos em instruções ofensivas.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Listar zonas e recursos",
        "instruction": "Crie uma tabela com zonas: internet, entrada, aplicação, dados, gestão, egress e observabilidade.",
        "command": "Zona | Recursos | Criticidade | Exposição permitida",
        "expectedOutput": "Tabela com pelo menos seis zonas e recursos associados.",
        "explanation": "Sem zonas, regras viram exceções soltas sem arquitetura."
      },
      {
        "number": 2,
        "title": "Definir matriz de fluxos",
        "instruction": "Liste fluxos necessários com origem, destino, porta, protocolo, justificativa e owner.",
        "command": "Origem | Destino | Protocolo | Porta | Justificativa | Owner",
        "expectedOutput": "Matriz com fluxos como Internet->LB:443, LB->App:porta app, App->DB:5432/3306, Admin->Bastion, App->Logs.",
        "explanation": "A matriz de fluxos evita abrir rede por tentativa e erro."
      },
      {
        "number": 3,
        "title": "Traduzir para Security Groups/NSG/firewall rules",
        "instruction": "Para cada fluxo, diga qual controle aplicaria em AWS, Azure e GCP.",
        "command": "Fluxo | AWS | Azure | GCP | Observação",
        "expectedOutput": "Mapa comparando SG/NACL, NSG/Azure Firewall e VPC firewall/Cloud NGFW.",
        "explanation": "A comparação treina portabilidade de conceito entre provedores."
      },
      {
        "number": 4,
        "title": "Marcar regras proibidas",
        "instruction": "Identifique regras que não seriam aprovadas: administração pública, banco exposto, egress any-any sem justificativa.",
        "command": "Regra proibida | Risco | Alternativa segura",
        "expectedOutput": "Lista de pelo menos cinco regras proibidas com alternativa.",
        "explanation": "Segurança madura define padrões proibidos antes do incidente."
      },
      {
        "number": 5,
        "title": "Definir logging e detecção",
        "instruction": "Para cada fluxo crítico, defina qual log comprovaria allow ou deny.",
        "command": "Fluxo | Log esperado | Campo útil | Alerta",
        "expectedOutput": "Plano com flow logs, firewall logs, audit logs e alertas de mudança.",
        "explanation": "Sem logs, não há investigação confiável."
      },
      {
        "number": 6,
        "title": "Criar política DevSecOps",
        "instruction": "Escreva cinco regras de pipeline para impedir configurações inseguras.",
        "command": "Policy | Condição | Ação | Exceção permitida",
        "expectedOutput": "Políticas como bloquear 0.0.0.0/0 para SSH/RDP, exigir owner, exigir expiração e ativar flow logs.",
        "explanation": "Policy as code reduz drift e exceções invisíveis."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma matriz de fluxos, controles equivalentes por provedor, regras proibidas, plano de logs e guardrails DevSecOps.",
    "validation": [
      {
        "check": "Todo fluxo tem justificativa",
        "command": "Revisar coluna Justificativa",
        "expected": "Nenhum fluxo sem owner e motivo.",
        "ifFails": "Remover o fluxo ou documentar necessidade real."
      },
      {
        "check": "Nenhuma porta administrativa pública",
        "command": "Filtrar regras com 0.0.0.0/0 e portas 22/3389/5985/5986",
        "expected": "Zero ocorrências aprovadas.",
        "ifFails": "Trocar por bastion, ZTNA, VPN ou JIT."
      },
      {
        "check": "Banco não aceita origem ampla",
        "command": "Revisar origem das regras de banco",
        "expected": "Origem restrita ao grupo/segmento da aplicação.",
        "ifFails": "Reduzir origem e validar dependências."
      },
      {
        "check": "Cada fluxo crítico gera evidência",
        "command": "Revisar coluna Log esperado",
        "expected": "Flow log, firewall log ou audit log definido.",
        "ifFails": "Ativar logging ou justificar limitação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "A aplicação não acessa banco",
        "probableCause": "Regra do banco não permite origem correta ou rota/subnet errada.",
        "howToConfirm": "Verificar matriz de fluxo, regra efetiva e logs de deny.",
        "fix": "Permitir somente origem da aplicação na porta necessária."
      },
      {
        "symptom": "A regra parece correta, mas conexão falha",
        "probableCause": "Rota ausente, NACL stateless, firewall local ou processo não escutando.",
        "howToConfirm": "Validar rota, controles em todas as camadas e serviço local.",
        "fix": "Corrigir camada específica em vez de abrir regra ampla."
      },
      {
        "symptom": "SOC não encontra evidência",
        "probableCause": "Flow logs ou firewall logs não foram habilitados.",
        "howToConfirm": "Verificar configuração de logging e destino de ingestão.",
        "fix": "Ativar logs e normalização no SIEM."
      }
    ],
    "improvements": [
      "Transformar a matriz em módulo Terraform.",
      "Adicionar expiração automática de exceções.",
      "Criar alerta para regra ampla.",
      "Adicionar teste automatizado de conectividade permitido/negado.",
      "Mapear custo de logs e firewall."
    ],
    "evidenceToCollect": [
      "Matriz de fluxos",
      "Tabela de controles por provedor",
      "Lista de regras proibidas",
      "Plano de logs",
      "Políticas DevSecOps"
    ],
    "questions": [
      "Qual controle está mais próximo do workload?",
      "Qual controle é melhor para inspeção centralizada?",
      "Que fluxo mais preocupa em caso de comprometimento?",
      "Onde o tráfego de saída é registrado?"
    ],
    "challenge": "Reescreva a arquitetura para que nenhum banco aceite tráfego de rede ampla e nenhum workload tenha saída irrestrita sem passar por controle observável.",
    "solution": "A solução deve restringir banco à origem da aplicação, forçar egress por NAT/proxy/firewall conforme requisito, registrar flow/firewall logs, remover administração pública e criar guardrails IaC para impedir regressão."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que Security Group, NSG e Cloud Firewall não são simplesmente nomes diferentes para a mesma coisa?",
      "hints": [
        "Pense em escopo.",
        "Pense em estado, prioridade e logging."
      ],
      "expectedIdeas": [
        "escopo",
        "stateful/stateless",
        "camadas",
        "inspeção",
        "governança"
      ],
      "explanation": "Eles têm objetivos parecidos, mas comportamento e lugar na arquitetura variam por provedor e caso de uso."
    },
    {
      "type": "diagnóstico",
      "question": "Uma VM privada não consegue acessar uma API externa. O que verificar antes de abrir egress geral?",
      "hints": [
        "Rota vem antes de regra.",
        "DNS e NAT também importam."
      ],
      "expectedIdeas": [
        "rota",
        "NAT",
        "DNS",
        "SG/NSG",
        "NACL",
        "firewall",
        "logs"
      ],
      "explanation": "Abrir egress geral pode mascarar o problema e criar risco."
    },
    {
      "type": "cenário real",
      "question": "O time de aplicação pede liberar banco para toda VPC porque está falhando em homologação. Como responder tecnicamente?",
      "hints": [
        "Peça matriz de fluxos.",
        "Reduza origem."
      ],
      "expectedIdeas": [
        "menor privilégio",
        "origem por grupo",
        "logs",
        "teste controlado",
        "exceção temporária"
      ],
      "explanation": "A resposta madura resolve a falha sem transformar banco em alvo lateral amplo."
    }
  ],
  "quiz": [
    {
      "id": "q14.5.1",
      "type": "conceito",
      "q": "Qual é a diferença central entre uma rota e um Security Group/NSG?",
      "opts": [
        "Rota decide caminho; SG/NSG decide permissão de tráfego",
        "SG/NSG decide caminho; rota decide senha",
        "Ambos fazem exatamente a mesma coisa",
        "Rota só existe para DNS"
      ],
      "a": 0,
      "exp": "A rota determina para onde o pacote tenta ir. O controle de segurança decide se o tráfego é permitido ou negado.",
      "difficulty": "iniciante",
      "topic": "fundamento"
    },
    {
      "id": "q14.5.2",
      "type": "comparação",
      "q": "Em AWS, qual afirmação é correta em termos gerais?",
      "opts": [
        "Security Groups são stateful e NACLs são stateless",
        "Security Groups são stateless e NACLs são stateful",
        "Ambos são sempre L7",
        "NACL substitui IAM"
      ],
      "a": 0,
      "exp": "Security Groups mantêm estado de conexão; NACLs avaliam entrada e saída separadamente.",
      "difficulty": "intermediário",
      "topic": "aws"
    },
    {
      "id": "q14.5.3",
      "type": "segurança",
      "q": "Qual regra deve gerar alerta imediato em ambiente corporativo?",
      "opts": [
        "SSH ou RDP aberto para 0.0.0.0/0",
        "Banco aceitando somente origem da aplicação",
        "HTTPS do load balancer para aplicação",
        "Flow logs habilitados"
      ],
      "a": 0,
      "exp": "Portas administrativas públicas aumentam muito a superfície de ataque.",
      "difficulty": "iniciante",
      "topic": "exposição"
    },
    {
      "id": "q14.5.4",
      "type": "diagnóstico",
      "q": "Um fluxo falha mesmo com SG permitindo a porta. Qual hipótese ainda precisa ser verificada?",
      "opts": [
        "Rota, NACL/NSG de subnet, firewall local, serviço escutando e logs",
        "Nada, SG permitido sempre garante comunicação",
        "Somente trocar região",
        "Desativar todos os logs"
      ],
      "a": 0,
      "exp": "Várias camadas podem bloquear ou impedir o fluxo mesmo quando um controle permite.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q14.5.5",
      "type": "cloud",
      "q": "Quando faz sentido usar Cloud Firewall/NGFW em vez de apenas SG/NSG?",
      "opts": [
        "Quando há requisito de inspeção centralizada, logging avançado, FQDN, threat intel ou egress control",
        "Sempre que uma VM precisa de IP privado",
        "Para substituir DNS",
        "Para reduzir todo custo de rede automaticamente"
      ],
      "a": 0,
      "exp": "Firewalls gerenciados adicionam capacidades e custos; devem ser usados quando o requisito justifica.",
      "difficulty": "intermediário-avançado",
      "topic": "arquitetura"
    },
    {
      "id": "q14.5.6",
      "type": "devsecops",
      "q": "Qual guardrail de pipeline é mais adequado?",
      "opts": [
        "Bloquear regra 0.0.0.0/0 para portas administrativas sem exceção aprovada",
        "Permitir tudo em dev e copiar para prod",
        "Remover owner das regras",
        "Desativar revisão para acelerar deploy"
      ],
      "a": 0,
      "exp": "Policy as code deve prevenir padrões perigosos antes que cheguem ao ambiente.",
      "difficulty": "intermediário",
      "topic": "policy as code"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.5.1",
      "front": "Security Group é rota?",
      "back": "Não. Rota decide caminho; Security Group controla permissão de tráfego associado a recursos.",
      "tags": [
        "cloud",
        "sg"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.5.2",
      "front": "O que significa stateful?",
      "back": "Significa que o controle mantém estado da conexão e permite tráfego de retorno relacionado a uma sessão permitida.",
      "tags": [
        "firewall",
        "stateful"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.5.3",
      "front": "O que significa stateless?",
      "back": "Significa que cada pacote/direção é avaliado isoladamente; retorno precisa de regra explícita.",
      "tags": [
        "nacl",
        "stateless"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.5.4",
      "front": "Por que egress any-any é perigoso?",
      "back": "Porque facilita comunicação não controlada com destinos externos, reduzindo contenção e detecção de exfiltração ou C2.",
      "tags": [
        "egress",
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.5.5",
      "front": "Quando usar Cloud Firewall?",
      "back": "Quando há necessidade de inspeção centralizada, logging avançado, egress control, threat intelligence ou política corporativa comum.",
      "tags": [
        "cloud firewall"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.5.6",
      "front": "Qual evidência ajuda a investigar allow/deny?",
      "back": "Flow logs, firewall logs, audit logs e logs do SIEM correlacionados com recurso, IP, porta, usuário e horário.",
      "tags": [
        "logs",
        "siem"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex14.5.1",
      "type": "conceitual",
      "prompt": "Explique por que abrir 5432 para toda a VPC é pior do que permitir apenas origem do grupo da aplicação.",
      "expectedAnswer": "Porque toda a VPC vira origem potencial para o banco, aumentando movimento lateral. Permitir apenas o grupo da aplicação reduz superfície e alinha acesso ao fluxo real.",
      "explanation": "Menor privilégio deve ser definido por fluxo necessário, não por comodidade de rede."
    },
    {
      "id": "ex14.5.2",
      "type": "diagnóstico",
      "prompt": "Uma conexão falha. A rota existe e o SG permite. Liste cinco hipóteses restantes.",
      "expectedAnswer": "NACL/NSG de subnet, firewall local, serviço não escutando, DNS/TLS errado, rota de retorno/NAT/firewall central, health check ou aplicação bloqueando.",
      "explanation": "Troubleshooting cloud exige cadeia completa, não um único controle."
    },
    {
      "id": "ex14.5.3",
      "type": "arquitetura",
      "prompt": "Desenhe regras mínimas para LB, app e banco em uma aplicação web de três camadas.",
      "expectedAnswer": "Internet->LB:443; LB->App:porta app; App->DB:porta banco; Admin->Bastion/ZTNA; App->logs/observabilidade; negar acesso direto internet->app/db.",
      "explanation": "O desenho deve seguir fluxo real e negar caminhos desnecessários."
    },
    {
      "id": "ex14.5.4",
      "type": "devsecops",
      "prompt": "Escreva três políticas de pipeline para regras cloud.",
      "expectedAnswer": "Bloquear portas admin públicas; exigir owner/justificativa/expiração; exigir flow logs; bloquear banco exposto; alertar egress any-any.",
      "explanation": "Guardrails transformam boas práticas em controle preventivo."
    }
  ],
  "challenge": {
    "title": "Revisão de regras cloud antes de auditoria",
    "scenario": "Uma fintech possui workloads web, app, banco, bastion, integrações externas e SIEM. A auditoria encontrou regras amplas, egress irrestrito e ausência de owner em várias regras.",
    "tasks": [
      "Criar matriz de fluxos aprovada.",
      "Reescrever regras para menor privilégio.",
      "Definir quais controles ficam em workload, subnet e firewall central.",
      "Definir logs e alertas.",
      "Criar guardrails IaC."
    ],
    "constraints": [
      "Não quebrar aplicação crítica.",
      "Não expor portas administrativas à internet.",
      "Não permitir banco a partir de rede ampla.",
      "Toda exceção deve ter owner e expiração."
    ],
    "expectedDeliverables": [
      "Matriz de fluxos",
      "Tabela de regras por provedor",
      "Plano de logs",
      "Lista de riscos residuais",
      "Políticas de pipeline"
    ],
    "gradingRubric": [
      {
        "criterion": "Menor privilégio",
        "points": 30,
        "description": "Regras restritas por fluxo real."
      },
      {
        "criterion": "Operabilidade",
        "points": 20,
        "description": "Plano não quebra aplicação e inclui troubleshooting."
      },
      {
        "criterion": "Evidência",
        "points": 20,
        "description": "Logs e alertas adequados."
      },
      {
        "criterion": "Governança",
        "points": 20,
        "description": "Owner, expiração e IaC."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Documentação entendível para Segurança e Plataforma."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos fluxos necessários de conveniências perigosas. Depois aplicamos menor privilégio, escolhemos o controle por escopo e garantimos evidência. Por fim, criamos guardrails para que o erro não retorne.",
    "steps": [
      "Listar recursos e zonas.",
      "Definir fluxos legítimos.",
      "Remover portas administrativas públicas.",
      "Restringir banco à aplicação.",
      "Forçar egress crítico por controle observável.",
      "Habilitar logs.",
      "Criar policies de pipeline e revisão periódica."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar toda a VPC para simplificar.",
        "whyItIsWrong": "Reduz troubleshooting imediato, mas aumenta movimento lateral e risco de auditoria."
      },
      {
        "answer": "Confiar apenas no firewall central.",
        "whyItIsWrong": "Pode haver bypass por rota, e controles próximos ao workload ainda são necessários."
      },
      {
        "answer": "Desabilitar logs para reduzir custo.",
        "whyItIsWrong": "Reduz visibilidade e aumenta tempo de resposta a incidentes."
      }
    ],
    "finalAnswer": "Uma solução madura combina SG/NSG por workload, controles simples em subnet, firewall/NGFW para inspeção quando necessário, rotas que impedem bypass, e logs integrados ao SIEM. Regras amplas devem ser removidas ou justificadas temporariamente com owner, expiração e alerta."
  },
  "glossary": [
    {
      "term": "Security Group",
      "shortDefinition": "Firewall virtual associado a recursos em AWS.",
      "longDefinition": "Controle stateful que permite definir regras inbound e outbound para recursos como interfaces e instâncias.",
      "example": "Permitir que apenas o load balancer acesse a aplicação na porta 8443.",
      "relatedTerms": [
        "NSG",
        "firewall",
        "stateful"
      ],
      "relatedLessons": [
        "14.5",
        "13.2"
      ]
    },
    {
      "term": "Network Security Group",
      "shortDefinition": "Controle de tráfego do Azure aplicado a subnet ou interface.",
      "longDefinition": "Conjunto de regras com prioridade, direção, origem, destino, porta, protocolo e ação para tráfego inbound e outbound.",
      "example": "Associar NSG à subnet de aplicação permitindo apenas tráfego do Application Gateway.",
      "relatedTerms": [
        "Azure",
        "NSG",
        "subnet"
      ],
      "relatedLessons": [
        "14.5"
      ]
    },
    {
      "term": "NACL",
      "shortDefinition": "Lista de controle de acesso de rede no nível da subnet.",
      "longDefinition": "Controle stateless em AWS que permite ou nega tráfego inbound e outbound no nível de subnet.",
      "example": "Bloquear um CIDR específico na borda da subnet.",
      "relatedTerms": [
        "ACL",
        "stateless",
        "subnet"
      ],
      "relatedLessons": [
        "14.5",
        "9.x"
      ]
    },
    {
      "term": "Cloud Firewall",
      "shortDefinition": "Firewall gerenciado para redes cloud.",
      "longDefinition": "Serviço que aplica políticas de tráfego, logging e, dependendo do produto, inspeção avançada e threat intelligence.",
      "example": "Usar firewall central em hub-spoke para controlar egress de subnets privadas.",
      "relatedTerms": [
        "NGFW",
        "egress",
        "SIEM"
      ],
      "relatedLessons": [
        "14.5",
        "13.4"
      ]
    },
    {
      "term": "Egress control",
      "shortDefinition": "Controle do tráfego de saída.",
      "longDefinition": "Prática de limitar, registrar e inspecionar conexões iniciadas por workloads para destinos externos ou outras redes.",
      "example": "Permitir saída apenas por proxy ou firewall para destinos aprovados.",
      "relatedTerms": [
        "NAT",
        "proxy",
        "exfiltração"
      ],
      "relatedLessons": [
        "14.4",
        "14.5",
        "13.7"
      ]
    },
    {
      "term": "Deny implícito",
      "shortDefinition": "Bloqueio padrão quando nenhuma regra permite o tráfego.",
      "longDefinition": "Modelo em que o tráfego é negado se não houver regra explícita de allow aplicável.",
      "example": "Uma VM não aceita conexão porque nenhuma regra inbound permite a origem e a porta.",
      "relatedTerms": [
        "allowlist",
        "menor privilégio",
        "firewall"
      ],
      "relatedLessons": [
        "14.5",
        "13.1"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Control traffic to your AWS resources using security groups",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      "note": "Referência oficial sobre Security Groups."
    },
    {
      "type": "official-doc",
      "title": "Control subnet traffic with network access control lists",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
      "note": "Referência oficial sobre NACLs."
    },
    {
      "type": "official-doc",
      "title": "Azure network security groups overview",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview",
      "note": "Referência oficial sobre NSGs."
    },
    {
      "type": "official-doc",
      "title": "VPC firewall rules",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/firewall/docs/firewalls",
      "note": "Referência oficial sobre regras de firewall VPC."
    },
    {
      "type": "official-doc",
      "title": "Network Firewall stateless and stateful rules engines",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/network-firewall/latest/developerguide/firewall-rules-engines.html",
      "note": "Referência oficial sobre AWS Network Firewall."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall, ACLs e WAF formam a base conceitual de regras de tráfego."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação orienta o desenho das regras cloud."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "módulos de IaC e pipelines",
      "lesson": "aulas de Terraform/Policy as Code",
      "reason": "Regras cloud devem ser criadas e validadas como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM corporativo",
      "lesson": "políticas, grupos e identidades de workload",
      "reason": "Menor privilégio de rede deve ser combinado com identidade e autorização."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
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
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "14.6"
    ]
  }
};
