export const lesson0403 = {
  "id": "4.3",
  "moduleId": "m04",
  "order": 3,
  "title": "Máscara de rede e CIDR",
  "subtitle": "Como o IPv4 separa bits de rede e bits de host sem depender de classes antigas ou decoreba.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 230,
  "tags": [
    "redes",
    "ipv4",
    "máscara",
    "cidr",
    "subnetting",
    "gateway",
    "roteamento",
    "cloud",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "A aula 4.1 explicou por que o IPv4 existe e como ele permite endereçamento lógico entre redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.2",
      "reason": "A aula 4.2 explicou que IPv4 é um valor de 32 bits dividido em quatro octetos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "CIDR e máscara dependem de raciocínio com bits e binário."
    }
  ],
  "objectives": [
    "Explicar por que uma máscara de rede precisa existir.",
    "Diferenciar endereço IP, máscara decimal e prefixo CIDR.",
    "Identificar bits de rede e bits de host em exemplos simples.",
    "Relacionar /8, /16, /24, /25, /26 e /30 com quantidade aproximada de endereços.",
    "Entender por que CIDR é essencial em roteamento, firewall, cloud e subnetting."
  ],
  "learningOutcomes": [
    "Dado um IP e um prefixo CIDR, o aluno identifica quantos bits pertencem à rede.",
    "Dada uma máscara decimal comum, o aluno reconhece seu prefixo CIDR equivalente.",
    "Dado um cenário de firewall ou cloud, o aluno explica o risco de usar um bloco amplo demais.",
    "Dado um erro de conectividade local, o aluno inclui máscara incorreta como hipótese diagnóstica."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Um computador pode ter um IPv4 perfeitamente válido, como <code>192.168.10.25</code>, e ainda assim não saber corretamente quem está na mesma rede. O endereço sozinho não responde uma pergunta essencial: quais bits identificam a rede e quais bits identificam o host?</p><p>Essa pergunta aparece em tarefas muito práticas: configurar uma estação, criar subnets em cloud, liberar um bloco em firewall, investigar logs no SIEM, planejar uma VPN, documentar uma filial, diagnosticar por que duas máquinas não se enxergam ou entender por que o host tentou enviar tráfego para o gateway.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> um notebook recebeu <code>192.168.10.25</code> com máscara <code>255.255.255.0</code>, mas outro recebeu <code>192.168.10.30</code> com máscara <code>255.255.0.0</code>. Ambos parecem estar na mesma rede pelo começo do endereço, mas a forma como cada host calcula rede local é diferente. Isso muda ARP, gateway, rotas e troubleshooting.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>No início do IPv4, os endereços eram organizados em classes: Classe A, Classe B e Classe C. Essa divisão parecia simples, mas era rígida e desperdiçava endereços. Muitas organizações recebiam blocos grandes demais ou pequenos demais para sua necessidade real.</p><p>Com o crescimento da internet e das redes corporativas, ficou claro que era necessário um modelo mais flexível. Surgiram o subnetting e depois o CIDR, Classless Inter-Domain Routing, permitindo representar blocos por prefixos como <code>/24</code>, <code>/20</code>, <code>/16</code> e <code>/30</code>.</p><p>Hoje, CIDR é linguagem comum em roteadores, firewalls, cloud, Kubernetes, VPNs, security groups, Network Security Groups, tabelas de rota, ACLs, WAFs e allowlists. Mesmo quando a interface gráfica esconde a matemática, a decisão técnica continua baseada em bits.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema técnico é que o IPv4 precisa representar duas coisas ao mesmo tempo: a rede à qual o host pertence e o identificador daquele host dentro da rede. Sem uma máscara, o endereço <code>192.168.10.25</code> é apenas um valor de 32 bits; ele não diz sozinho onde termina a parte de rede.</p><ul class=\"flow-list\"><li><strong>Sem máscara:</strong> o host não sabe decidir se deve usar ARP direto ou enviar ao gateway.</li><li><strong>Com máscara errada:</strong> o host pode achar que um destino remoto é local, ou que um destino local é remoto.</li><li><strong>Com CIDR amplo demais:</strong> firewalls e security groups podem liberar mais ativos do que deveriam.</li><li><strong>Com CIDR pequeno demais:</strong> serviços legítimos podem ficar fora do bloco permitido.</li><li><strong>Sem raciocínio binário:</strong> subnetting e roteamento parecem mágicos.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do endereçamento IPv4 saiu de classes fixas para prefixos flexíveis. O CIDR não é apenas uma forma moderna de escrever máscara; ele é uma forma de dizer exatamente quantos bits iniciais representam a rede.</p><table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead><tbody><tr><td>Classes antigas</td><td>Classe A, B e C com limites fixos</td><td>Desperdício e pouca flexibilidade</td><td>Subnetting</td></tr><tr><td>Máscara decimal</td><td><code>255.255.255.0</code></td><td>Legível, mas menos direta para contar bits</td><td>Notação CIDR</td></tr><tr><td>CIDR</td><td><code>/24</code> significa 24 bits de rede</td><td>Exige entender bits</td><td>Base de cloud, roteamento moderno e firewall</td></tr><tr><td>Planejamento moderno</td><td>Blocos por ambiente, função e risco</td><td>Exige documentação e governança</td><td>IPAM, IaC e automação</td></tr></tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>Máscara de rede é o valor que indica quais bits de um endereço IPv4 pertencem à parte de rede e quais pertencem à parte de host. CIDR é a notação compacta que representa a quantidade de bits de rede usando uma barra.</p><div class=\"definition-box\"><strong>Definição:</strong> em <code>192.168.10.25/24</code>, o <code>/24</code> significa que os primeiros 24 bits identificam a rede. Os 8 bits restantes identificam hosts dentro dessa rede.</div><p>A máscara decimal equivalente a <code>/24</code> é <code>255.255.255.0</code>. Isso acontece porque os três primeiros octetos possuem todos os bits ligados para rede: <code>11111111.11111111.11111111.00000000</code>.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Quando um host precisa enviar tráfego para um destino IPv4, ele aplica a máscara ao próprio IP e ao IP de destino. Se o resultado da parte de rede for igual, o destino é considerado local. Se for diferente, o tráfego deve ir para o gateway padrão.</p><ol class=\"flow-list\"><li>O host conhece seu IP, por exemplo <code>192.168.10.25</code>.</li><li>O host conhece sua máscara, por exemplo <code>255.255.255.0</code> ou <code>/24</code>.</li><li>O host compara os bits de rede do próprio IP com os bits de rede do destino.</li><li>Se a rede for igual, usa ARP para descobrir o MAC do destino local.</li><li>Se a rede for diferente, usa ARP para descobrir o MAC do gateway.</li><li>O pacote IP continua tendo o destino final, mas o frame Ethernet é entregue ao próximo salto.</li></ol><p>Essa decisão é a base de roteamento local. Ela acontece antes de DNS, HTTP, TLS, aplicação e autenticação.</p>\n<p>A operação central por trás de máscara e CIDR é o AND lógico. O host aplica a máscara ao próprio IP e ao IP de destino. Se o resultado de rede for igual, o destino é considerado local. Se for diferente, o tráfego vai para o gateway. Essa decisão acontece antes de DNS, antes de TCP, antes de HTTP e antes de qualquer regra de aplicação.</p><div class=\"callout callout--mentor\"><strong>Leitura essencial:</strong> CIDR não é apenas uma forma curta de escrever máscara. Ele expressa quantos bits iniciais representam a rede. Por isso, <code>/24</code>, <code>/25</code> e <code>/26</code> mudam fronteiras de rede mesmo quando os três primeiros octetos parecem iguais.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Máscara e CIDR aparecem em quase todos os desenhos de rede. Em uma LAN, definem quem está no mesmo domínio IP. Em uma empresa, ajudam a separar usuários, servidores, impressoras, Wi-Fi corporativo e visitantes. Em cloud, definem VPC/VNet, subnets, route tables, gateways e políticas de acesso.</p><ul><li><strong>Camada envolvida:</strong> Camada 3, mas depende de ARP e Ethernet para entrega local.</li><li><strong>Componentes envolvidos:</strong> host, NIC, máscara, gateway, switch, roteador, firewall e tabela de rotas.</li><li><strong>Dependências:</strong> IPv4, binário, ARP, gateway e roteamento.</li><li><strong>Pontos de falha:</strong> máscara incorreta, CIDR sobreposto, rota ausente, gateway errado e allowlist ampla.</li></ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em um endereço postal. O endereço completo identifica uma casa, mas a cidade e o bairro ajudam a decidir se uma entrega será feita localmente ou enviada para outro centro de distribuição. No IPv4, a máscara funciona como a regra que diz qual parte do endereço representa o “bairro/rede” e qual parte representa a “casa/host”.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> endereços postais têm significados humanos fixos. No IPv4, a divisão entre rede e host não depende dos pontos visuais, mas da máscara aplicada aos bits.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, seu notebook pode receber <code>192.168.1.50/24</code>. Isso indica que a rede é normalmente <code>192.168.1.0</code> e que hosts como <code>192.168.1.1</code>, <code>192.168.1.20</code> e <code>192.168.1.200</code> estão dentro do mesmo bloco /24.</p><p>Se você tentar acessar <code>8.8.8.8</code>, o host percebe que esse destino não está no mesmo /24. Então ele envia o frame Ethernet ao MAC do gateway, não ao MAC do <code>8.8.8.8</code>.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Uma empresa pode usar <code>10.10.10.0/24</code> para usuários, <code>10.10.20.0/24</code> para servidores e <code>10.10.30.0/24</code> para impressoras. Essa separação permite criar políticas de firewall mais precisas e reduzir movimento lateral.</p><p>Se um servidor for configurado com máscara errada, ele pode tentar resolver via ARP endereços que deveriam ir para o gateway, ou enviar tráfego ao gateway quando o destino era local. Em ambientes grandes, isso gera sintomas intermitentes e difíceis de explicar se o analista não entende máscara.</p>\n<p>Em uma empresa, uma máscara incorreta pode criar falha difícil de perceber: dois hosts com IPs próximos podem discordar sobre estarem na mesma rede. Um tenta ARP localmente; o outro envia ao gateway. O resultado pode parecer firewall, mas a causa é cálculo de rede inconsistente.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, quase tudo é descrito com CIDR: VPC <code>10.0.0.0/16</code>, subnet pública <code>10.0.1.0/24</code>, subnet privada <code>10.0.2.0/24</code>, rota para VPN, security group, NSG e allowlist de acesso administrativo.</p><p>Um erro de CIDR pode gerar conflito com a rede on-premises, impedir VPN site-to-site, expor serviços demais ou tornar uma migração muito cara. Renumerar blocos IP em cloud costuma ser trabalhoso porque subnets, interfaces, rotas, firewalls, NAT, endpoints e dependências podem precisar ser recriados.</p>\n<p>Em cloud, CIDR define o tamanho de VNets/VPCs e subnets. Uma escolha grande demais desperdiça espaço e dificulta segmentação; uma escolha pequena demais limita crescimento e pode forçar recriação de rede, peering ou rotas. O impacto é técnico, operacional e financeiro.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, CIDR aparece em Terraform, políticas de rede, manifests de Kubernetes, regras de egress, allowlists de runners, acesso a registries, clusters privados e pipelines que precisam alcançar serviços internos.</p><p>Uma variável como <code>admin_cidr = \"0.0.0.0/0\"</code> pode transformar um recurso restrito em recurso exposto para toda a internet. Por isso, revisão de IaC deve tratar CIDR como decisão de segurança, não como detalhe de sintaxe.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Máscaras e CIDR têm impacto direto em segurança. Um bloco amplo demais em firewall ou security group pode permitir acesso lateral. Um bloco estreito demais pode quebrar serviços e incentivar exceções emergenciais mal documentadas. Uma máscara errada em host pode parecer problema de DNS, aplicação ou firewall, mas a causa real está na decisão local de rede.</p><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>CIDR amplo demais</td><td><code>10.0.0.0/8</code> em allowlist</td><td>Exposição lateral excessiva</td><td>Menor privilégio por subnet/função</td></tr><tr><td>Máscara incorreta</td><td>Host considera remoto como local</td><td>Falha de conectividade e diagnóstico errado</td><td>Validar IP, máscara, gateway e rota</td></tr><tr><td>Sobreposição de blocos</td><td>Cloud e filial usam o mesmo CIDR</td><td>VPN e roteamento quebram</td><td>Planejamento IPAM e revisão arquitetural</td></tr></tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m04l03-title m04l03-desc\">\n  <title id=\"m04l03-title\">Máscara de rede e CIDR separando bits de rede e host</title>\n  <desc id=\"m04l03-desc\">O endereço 192.168.10.25/24 é mostrado com 24 bits de rede e 8 bits de host, e a decisão de enviar localmente ou ao gateway.</desc>\n  <defs><marker id=\"m04l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n  <rect x=\"50\" y=\"40\" width=\"880\" height=\"90\" rx=\"16\" class=\"svg-zone\" />\n  <text x=\"490\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">192.168.10.25/24</text>\n  <text x=\"490\" y=\"105\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">/24 = 24 bits de rede + 8 bits de host</text>\n  <rect x=\"80\" y=\"165\" width=\"200\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"180\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n  <text x=\"180\" y=\"225\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10</text>\n  <rect x=\"310\" y=\"165\" width=\"130\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"375\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n  <text x=\"375\" y=\"225\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">25</text>\n  <line x1=\"450\" y1=\"210\" x2=\"565\" y2=\"210\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l03-arrow)\" />\n  <rect x=\"575\" y=\"150\" width=\"320\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--router\" />\n  <text x=\"735\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Decisão do host</text>\n  <text x=\"735\" y=\"215\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Mesma rede? ARP direto</text>\n  <text x=\"735\" y=\"240\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rede diferente? ARP para gateway</text>\n  <rect x=\"95\" y=\"330\" width=\"250\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"220\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Destino local</text>\n  <text x=\"220\" y=\"395\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ex.: 192.168.10.80/24</text>\n  <rect x=\"635\" y=\"330\" width=\"250\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n  <text x=\"760\" y=\"365\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"760\" y=\"395\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ex.: 192.168.10.1</text>\n  <line x1=\"490\" y1=\"270\" x2=\"220\" y2=\"330\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l03-arrow)\" />\n  <line x1=\"490\" y1=\"270\" x2=\"760\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m04l03-arrow)\" />\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula faz você coletar IP, máscara e gateway do seu host, converter máscara para CIDR e explicar a decisão local: destino na mesma rede ou via gateway. O objetivo não é decorar tabela, mas treinar o raciocínio que será usado em subnetting.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam conversão entre máscara e CIDR, identificação de bits de rede/host e diagnóstico de máscara incorreta.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você irá avaliar uma pequena rede corporativa com CIDRs mal escolhidos e propor correções que reduzam risco operacional e de segurança.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como interpretar prefixos, identificar blocos amplos demais e justificar uma configuração mais segura e operacionalmente clara.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li>Máscara define quais bits do IPv4 são rede e quais são host.</li><li>CIDR representa a quantidade de bits de rede com barra.</li><li><code>/24</code> equivale a <code>255.255.255.0</code>.</li><li>O host usa a máscara para decidir se faz ARP para o destino ou para o gateway.</li><li>CIDR amplo demais aumenta risco de exposição; CIDR estreito demais pode quebrar serviços.</li><li>Subnetting depende diretamente deste raciocínio.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, vamos estudar <strong>endereço de rede, hosts e broadcast</strong>. Depois de entender máscara e CIDR, o próximo passo é calcular quais endereços pertencem ao bloco, qual identifica a rede, quais podem ser usados por hosts e qual é o broadcast.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3 — Rede"
    ],
    "tcpIpLayers": [
      "Internet"
    ],
    "relatedProtocols": [
      "IPv4",
      "ICMP",
      "ARP",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "bits",
      "octetos",
      "IPv4",
      "Ethernet",
      "ARP",
      "gateway"
    ],
    "enables": [
      "endereço de rede",
      "broadcast",
      "subnetting",
      "roteamento",
      "ACL",
      "firewall",
      "cloud networking"
    ]
  },
  "deepDive": {
    "mentalModel": "CIDR é uma régua de bits: ele marca quantos bits iniciais do IPv4 pertencem à rede e quantos sobram para hosts.",
    "keyTerms": [
      "máscara de rede",
      "CIDR",
      "prefixo",
      "bits de rede",
      "bits de host",
      "rota local"
    ],
    "limitations": [
      "A máscara não autentica tráfego; apenas define pertencimento lógico ao bloco.",
      "CIDR não substitui firewall ou IAM.",
      "Blocos bem planejados ainda exigem documentação, rotas e políticas corretas."
    ],
    "whenToUse": [
      "Ao configurar IP manual.",
      "Ao criar subnets em cloud.",
      "Ao escrever regras de firewall ou security group.",
      "Ao diagnosticar gateway, ARP e rota local.",
      "Ao planejar VPN ou interconexão entre redes."
    ],
    "whenNotToUse": [
      "Não use CIDR amplo como controle único de identidade.",
      "Não use máscara como substituto de segmentação por política.",
      "Não escolha blocos sem verificar sobreposição com redes existentes."
    ],
    "operationalImpact": [
      "CIDR bem planejado simplifica roteamento e troubleshooting.",
      "CIDR mal planejado gera sobreposição, exceções e retrabalho.",
      "Mudança de máscara em produção pode derrubar conectividade.",
      "CIDR incorreto em VPC/VNet, VPN ou firewall pode exigir mudança coordenada entre redes, segurança, cloud e aplicações."
    ],
    "financialImpact": [
      "Em cloud, erros de endereçamento podem exigir recriação de subnets, gateways, endpoints e rotas.",
      "Blocos mal planejados aumentam custo operacional de migração e troubleshooting.",
      "IPAM e automação reduzem custo de governança em ambientes grandes.",
      "Em cloud, redes mal dimensionadas podem causar retrabalho com peering, NAT, endpoints privados e segmentação posterior."
    ],
    "securityImpact": [
      "CIDRs amplos demais aumentam superfície de acesso.",
      "CIDRs específicos favorecem menor privilégio.",
      "Máscara errada pode mascarar incidente como falha operacional comum. "
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que os pontos do IPv4 determinam rede e host.",
      "whyItHappens": "Visualmente, os octetos parecem fronteiras naturais fixas.",
      "consequence": "O aluno interpreta /23, /25 e /26 de forma errada.",
      "correction": "A fronteira real é definida pelos bits da máscara/CIDR."
    },
    {
      "mistake": "Confundir CIDR com quantidade de hosts.",
      "whyItHappens": "O número depois da barra é pequeno e parece uma contagem direta.",
      "consequence": "Escolhas de subnet ficam incorretas.",
      "correction": "CIDR indica bits de rede; hosts dependem dos bits restantes."
    },
    {
      "mistake": "Usar blocos amplos por conveniência.",
      "whyItHappens": "É mais fácil liberar /16 ou /8 do que descobrir o bloco correto.",
      "consequence": "Aumenta risco de movimento lateral e exposição.",
      "correction": "Aplicar menor privilégio e documentar origem, destino, porta e justificativa."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host pinga gateway, mas não alcança outro host esperado como local.",
      "Host tenta ARP para destino que deveria ser remoto.",
      "VPN conecta, mas redes se sobrepõem.",
      "Security group libera tráfego demais ou bloqueia serviço legítimo.",
      "Dois hosts com IPs parecidos tomam decisões diferentes de rota local."
    ],
    "diagnosticQuestions": [
      "Qual é o IP do host?",
      "Qual é a máscara ou prefixo CIDR?",
      "Qual é o gateway padrão?",
      "O destino cai no mesmo bloco segundo a máscara?",
      "Há sobreposição de CIDR entre ambientes?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print",
        "purpose": "Ver IP, máscara, gateway e rotas.",
        "expectedObservation": "IPv4, Subnet Mask, Default Gateway e rota default.",
        "interpretation": "Permite verificar se a máscara local faz sentido para o bloco configurado."
      },
      {
        "platform": "Linux",
        "command": "ip addr show && ip route",
        "purpose": "Ver endereços, prefixos e tabela de rotas.",
        "expectedObservation": "Endereço com prefixo, como 192.168.10.25/24, e default via gateway.",
        "interpretation": "Permite validar CIDR e rota default."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief && show running-config interface vlan 10 && show ip route",
        "purpose": "Ver IPs de interfaces, máscaras e rotas no equipamento.",
        "expectedObservation": "Interfaces com IP/máscara e rotas conectadas.",
        "interpretation": "Permite validar gateway de VLAN e rotas conectadas."
      },
      {
        "platform": "Linux",
        "command": "ipcalc 192.168.10.37/27  # quando ipcalc estiver disponível",
        "purpose": "Validar rede, broadcast e faixa utilizável de um prefixo CIDR.",
        "expectedObservation": "Rede 192.168.10.32, broadcast 192.168.10.63 e faixa utilizável correspondente.",
        "interpretation": "Comparar ferramenta com cálculo manual; não depender cegamente da ferramenta."
      },
      {
        "platform": "Linux",
        "command": "ip route get <ip-destino>",
        "purpose": "Confirmar se o kernel considera o destino local ou remoto após aplicar máscara e rotas.",
        "expectedObservation": "Saída com dev local e, quando necessário, via gateway.",
        "interpretation": "Ajuda a diagnosticar máscara incorreta sem capturar pacote ainda."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Get-NetIPConfiguration; route print; Test-NetConnection <ip-destino>",
        "purpose": "Coletar IP, prefixo, rotas e teste de alcance em Windows.",
        "expectedObservation": "Interface com IPv4, prefix length, gateway e teste coerente com a rede esperada.",
        "interpretation": "Se a rota não corresponde ao desenho, revisar máscara/prefixo antes de culpar DNS."
      }
    ],
    "decisionTree": [
      {
        "if": "Destino deveria ser local, mas host envia ao gateway",
        "then": "Verificar máscara local e comparar rede calculada."
      },
      {
        "if": "Destino remoto parece local para o host",
        "then": "Suspeitar de máscara ampla demais."
      },
      {
        "if": "VPN conecta, mas tráfego não flui",
        "then": "Verificar sobreposição de CIDR e rotas."
      },
      {
        "if": "Dois hosts parecem na mesma rede, mas um tenta enviar ao gateway",
        "then": "Comparar máscara/prefix length dos dois hosts e calcular rede resultante de cada um."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar CIDRs específicos em firewalls e security groups.",
      "Documentar função de cada bloco.",
      "Validar sobreposição antes de criar VPN ou peering.",
      "Revisar CIDRs em IaC como parte de segurança.",
      "Combinar CIDR com identidade, autenticação e logs.",
      "Documentar CIDRs com finalidade, dono, ambiente, criticidade e regras de tráfego permitidas."
    ],
    "badPractices": [
      "Liberar 0.0.0.0/0 para administração.",
      "Usar 10.0.0.0/8 em allowlists internas sem justificativa.",
      "Tratar IP como identidade suficiente.",
      "Mudar máscara em produção sem análise de impacto.",
      "Criar subnets cloud sem planejamento de crescimento.",
      "Usar CIDRs amplos demais em regras de firewall apenas por conveniência operacional."
    ],
    "commonErrors": [
      "Confundir /24 com 24 hosts.",
      "Achar que CIDR é regra de firewall por si só.",
      "Ignorar blocos sobrepostos em VPN.",
      "Não registrar justificativa de exceções amplas."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição por CIDR amplo",
        "description": "Blocos amplos permitem acesso de mais origens do que o necessário.",
        "defensiveExplanation": "O risco é maior em administração remota, bancos, APIs internas e ambientes cloud.",
        "mitigation": "Menor privilégio, revisão de regras, autenticação forte, logs e expiração de exceções."
      },
      {
        "name": "Sobreposição de redes",
        "description": "Dois ambientes usam o mesmo bloco CIDR e tornam roteamento ambíguo.",
        "defensiveExplanation": "Isso pode quebrar VPN, peering e investigação de logs.",
        "mitigation": "IPAM, planejamento centralizado e revisão antes de interconexões."
      }
    ],
    "monitoring": [
      "Mudanças em security groups e ACLs.",
      "Criação de rotas para blocos amplos.",
      "Fluxos internos entre subnets não esperadas.",
      "Alertas de acesso administrativo a partir de ranges amplos."
    ],
    "hardening": [
      "Aplicar menor privilégio em CIDRs.",
      "Usar IPAM e revisão de IaC.",
      "Separar subnets por função e risco.",
      "Criar regras temporárias com expiração e justificativa."
    ],
    "detectionIdeas": [
      "Comparar regras atuais com baseline aprovado.",
      "Alertar para 0.0.0.0/0 em portas administrativas.",
      "Detectar tráfego entre subnets sem regra esperada.",
      "Enriquecer logs com nome da subnet e função do bloco."
    ]
  },
  "protocolFields": [
    {
      "field": "Source IP",
      "size": "32 bits",
      "purpose": "Indicar o endereço IPv4 de origem.",
      "securityObservation": "Pode representar host, NAT, proxy, workload ou endereço temporário."
    },
    {
      "field": "Destination IP",
      "size": "32 bits",
      "purpose": "Indicar o destino lógico do pacote.",
      "securityObservation": "A decisão de rota usa prefixos e máscaras para escolher próximo salto."
    },
    {
      "field": "Subnet Mask / CIDR",
      "size": "32 bits ou prefixo /n",
      "purpose": "Separar bits de rede e host no contexto local.",
      "securityObservation": "Prefixos amplos em regras aumentam superfície de acesso."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Recebe IP, máscara e gateway.",
      "detail": "Exemplo: 192.168.10.25/24 com gateway 192.168.10.1.",
      "possibleFailure": "Máscara incorreta altera a decisão local."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Compara destino com sua rede calculada.",
      "detail": "Aplica o prefixo aos bits do próprio IP e do destino.",
      "possibleFailure": "Destino remoto pode parecer local se a máscara for ampla demais."
    },
    {
      "step": 3,
      "actor": "Host",
      "action": "Escolhe ARP direto ou gateway.",
      "detail": "Mesma rede: ARP para destino. Rede diferente: ARP para gateway.",
      "possibleFailure": "Gateway incorreto impede saída da rede."
    },
    {
      "step": 4,
      "actor": "Gateway/Roteador",
      "action": "Encaminha para outra rede se necessário.",
      "detail": "O pacote mantém IP de destino final, mas o frame usa MAC do próximo salto.",
      "possibleFailure": "Rota ausente ou ACL bloqueia tráfego."
    }
  ],
  "lab": {
    "id": "lab-4.3",
    "title": "Identificando máscara, CIDR e decisão local de roteamento",
    "labType": "cloud",
    "objective": "Coletar IP, máscara e gateway do host e explicar se destinos de teste são locais ou remotos.",
    "scenario": "Você é responsável por validar a configuração IPv4 de uma estação antes de culpar DNS, firewall ou aplicação.",
    "topology": "Host do aluno -> switch/AP -> gateway padrão -> demais redes",
    "architecture": "Um host com IPv4 configurado por DHCP ou manualmente, conectado a uma rede local comum.",
    "prerequisites": [
      "Ter concluído as aulas 4.1 e 4.2.",
      "Ter acesso a um terminal Windows ou Linux.",
      "Não alterar configurações de rede sem autorização."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Opcional: calculadora de binário local",
      "Opcional: Cisco Packet Tracer"
    ],
    "estimatedTimeMinutes": 125,
    "cost": "zero",
    "safetyNotes": [
      "Não altere máscara, gateway ou IP em rede corporativa sem autorização.",
      "Sanitize IPs públicos, nomes de host e identificadores antes de compartilhar evidências.",
      "Não execute varreduras; o laboratório usa apenas coleta local.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar configuração IPv4 no Windows",
        "instruction": "No Windows, colete IP, máscara, gateway e DNS.",
        "command": "ipconfig /all",
        "expectedOutput": "IPv4 Address, Subnet Mask e Default Gateway.",
        "explanation": "Esses três valores determinam a decisão local de rede."
      },
      {
        "number": 2,
        "title": "Coletar configuração IPv4 no Linux",
        "instruction": "No Linux, colete endereço com prefixo e rota default.",
        "command": "ip addr show && ip route",
        "expectedOutput": "Endereço no formato x.x.x.x/n e linha default via.",
        "explanation": "Linux costuma mostrar o CIDR diretamente, como /24."
      },
      {
        "number": 3,
        "title": "Converter máscara comum em CIDR",
        "instruction": "Se a máscara for 255.255.255.0, anote que ela equivale a /24.",
        "command": "# Conversão mental: 255.255.255.0 = 11111111.11111111.11111111.00000000 = /24",
        "expectedOutput": "/24 identificado.",
        "explanation": "Cada 255 representa 8 bits ligados para rede."
      },
      {
        "number": 4,
        "title": "Testar decisão local com destinos hipotéticos",
        "instruction": "Compare seu IP com o gateway e com um destino externo como 8.8.8.8.",
        "command": "ping <gateway>\nping 8.8.8.8",
        "expectedOutput": "Gateway pode responder; destino externo pode responder ou ser bloqueado por política.",
        "explanation": "O objetivo não é sucesso do ping externo, mas entender que o gateway é usado para redes diferentes."
      },
      {
        "number": 5,
        "title": "Verificar ARP do gateway",
        "instruction": "Observe que o host conhece o MAC do gateway quando precisa sair da rede.",
        "command": "arp -a  # Windows\nip neigh  # Linux",
        "expectedOutput": "Entrada do gateway associada a um endereço MAC.",
        "explanation": "Para destino remoto, o host não descobre o MAC do destino final; ele descobre o MAC do próximo salto."
      },
      {
        "number": 6,
        "title": "Calcular rede por AND lógico",
        "instruction": "Escolha um IP/prefixo e calcule manualmente a rede aplicando AND entre IP e máscara. Depois compare com ferramenta, se disponível.",
        "calculation": "Exemplo: 192.168.10.37/27 -> bloco de 32 -> rede 192.168.10.32, broadcast 192.168.10.63.",
        "expectedOutput": "Rede, broadcast e faixa utilizável documentados antes de usar ferramenta automática.",
        "explanation": "A ferramenta deve validar seu raciocínio, não substituir a compreensão do CIDR."
      }
    ],
    "expectedResult": "O aluno deve registrar IP, máscara/CIDR, gateway, rede provável e explicar quais destinos seriam locais ou remotos.",
    "validation": [
      {
        "check": "IP e máscara foram coletados",
        "command": "ipconfig /all ou ip addr show",
        "expected": "Endereço IPv4 e máscara/prefixo visíveis.",
        "ifFails": "Verifique se a interface está conectada e se possui IPv4."
      },
      {
        "check": "Gateway foi identificado",
        "command": "route print ou ip route",
        "expected": "Rota default apontando para gateway.",
        "ifFails": "Pode ser rede isolada, VPN, interface sem gateway ou configuração manual incompleta."
      },
      {
        "check": "ARP do gateway aparece",
        "command": "arp -a ou ip neigh",
        "expected": "IP do gateway associado a MAC.",
        "ifFails": "Tente pingar o gateway e veja novamente."
      },
      {
        "check": "Cálculo de CIDR validado manualmente",
        "command": "ipcalc 192.168.10.37/27  # opcional, se disponível",
        "expected": "Resultado compatível com o cálculo manual: rede .32 e broadcast .63.",
        "ifFails": "Refazer cálculo do tamanho do bloco e revisar fronteiras da sub-rede."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Host sem gateway",
        "probableCause": "DHCP incompleto, rede isolada ou configuração manual errada.",
        "howToConfirm": "Verificar ipconfig /all ou ip route.",
        "fix": "Corrigir DHCP/configuração conforme política autorizada."
      },
      {
        "symptom": "Host tenta ARP para destino remoto",
        "probableCause": "Máscara ampla demais.",
        "howToConfirm": "Comparar rede calculada com destino e ver tabela ARP.",
        "fix": "Corrigir máscara/prefixo."
      },
      {
        "symptom": "VPN não alcança rede remota",
        "probableCause": "CIDR sobreposto ou rota ausente.",
        "howToConfirm": "Comparar blocos locais/remotos e tabela de rotas.",
        "fix": "Ajustar plano IP/rotas em janela aprovada."
      }
    ],
    "improvements": [
      "Criar tabela com IP, máscara, CIDR, gateway e função da interface.",
      "Repetir o exercício em uma VM, rede doméstica e VPN autorizada.",
      "Documentar decisões de CIDR em formato reutilizável para IaC."
    ],
    "evidenceToCollect": [
      "IP local sanitizado",
      "Máscara ou CIDR",
      "Gateway",
      "Rota default",
      "Entrada ARP do gateway",
      "Explicação local/remoto",
      "Cálculo manual de rede/broadcast/faixa utilizável para pelo menos dois prefixos diferentes"
    ],
    "questions": [
      "Por que o host precisa da máscara para decidir se usa gateway?",
      "Por que /24 não significa 24 hosts?",
      "Qual risco de liberar 10.0.0.0/8 em uma regra de firewall?"
    ],
    "challenge": "Dado um host 192.168.10.25/24, explique se 192.168.10.80, 192.168.11.10 e 8.8.8.8 são destinos locais ou remotos e qual MAC o host tentaria descobrir em cada caso.",
    "solution": "192.168.10.80 está no mesmo /24, então o host usa ARP para o MAC desse destino. 192.168.11.10 e 8.8.8.8 estão fora do /24, então o host usa ARP para o MAC do gateway padrão. O pacote IP mantém o destino final, mas o frame Ethernet usa o MAC do próximo salto."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um endereço IPv4 sem máscara é insuficiente para diagnóstico?",
      "hints": [
        "Pense em rede e host.",
        "Pense na decisão de usar gateway."
      ],
      "expectedIdeas": [
        "máscara",
        "CIDR",
        "rede local",
        "gateway",
        "ARP"
      ],
      "explanation": "Sem máscara, não sabemos quais bits definem o bloco local; portanto, não sabemos se o destino deve ser entregue diretamente ou via gateway."
    },
    {
      "type": "diagnóstico",
      "question": "Dois hosts têm IPs parecidos, mas não se comunicam. Que campo você verificaria antes de culpar firewall?",
      "hints": [
        "Não olhe apenas para os pontos.",
        "Compare máscara e gateway."
      ],
      "expectedIdeas": [
        "máscara",
        "CIDR",
        "rede calculada",
        "gateway",
        "rota"
      ],
      "explanation": "Máscara incorreta pode fazer cada host tomar uma decisão diferente sobre o que é local."
    },
    {
      "type": "cenário real",
      "question": "Em cloud, por que uma regra 10.0.0.0/8 pode ser perigosa?",
      "hints": [
        "Pense em menor privilégio.",
        "Pense em movimento lateral."
      ],
      "expectedIdeas": [
        "CIDR amplo",
        "exposição",
        "security group",
        "firewall",
        "menor privilégio"
      ],
      "explanation": "Um bloco /8 abrange milhões de endereços privados e raramente representa uma necessidade real específica."
    }
  ],
  "quiz": [
    {
      "id": "q4.3.1",
      "type": "conceito",
      "q": "O que significa o /24 em 192.168.10.25/24?",
      "opts": [
        "Que os primeiros 24 bits pertencem à parte de rede",
        "Que existem exatamente 24 hosts",
        "Que o quarto octeto sempre será 24",
        "Que o endereço usa 24 bytes"
      ],
      "a": 0,
      "exp": "CIDR indica a quantidade de bits de rede.",
      "difficulty": "iniciante",
      "topic": "cidr"
    },
    {
      "id": "q4.3.2",
      "type": "comparação",
      "q": "Qual máscara decimal equivale a /24?",
      "opts": [
        "255.0.0.0",
        "255.255.0.0",
        "255.255.255.0",
        "255.255.255.255"
      ],
      "a": 2,
      "exp": "/24 são três octetos completos de bits ligados: 255.255.255.0.",
      "difficulty": "iniciante",
      "topic": "máscara"
    },
    {
      "id": "q4.3.3",
      "type": "diagnóstico",
      "q": "Um host com máscara ampla demais pode tentar fazer ARP para um destino que deveria ir ao gateway. Por quê?",
      "opts": [
        "Porque ele considera o destino dentro da rede local",
        "Porque DNS sempre falha com máscara ampla",
        "Porque TCP muda a máscara automaticamente",
        "Porque o switch bloqueia todo ARP"
      ],
      "a": 0,
      "exp": "A máscara define a rede local calculada; se ampla demais, destinos remotos podem parecer locais.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q4.3.4",
      "type": "segurança",
      "q": "Qual é o risco de usar 0.0.0.0/0 em uma regra de administração?",
      "opts": [
        "Permitir origem de qualquer endereço IPv4",
        "Permitir apenas hosts locais",
        "Bloquear todo tráfego por padrão",
        "Converter IPv4 em IPv6"
      ],
      "a": 0,
      "exp": "0.0.0.0/0 representa todo o espaço IPv4, portanto é amplo demais para administração.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q4.3.5",
      "type": "cloud",
      "q": "Por que CIDRs sobrepostos atrapalham VPN ou peering?",
      "opts": [
        "Porque tornam o roteamento ambíguo",
        "Porque impedem o uso de DNS público",
        "Porque mudam o endereço MAC do switch",
        "Porque desligam o TLS"
      ],
      "a": 0,
      "exp": "Se duas redes usam o mesmo bloco, a decisão de rota pode não saber para onde encaminhar corretamente.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q4.3.6",
      "type": "pegadinha",
      "q": "Os pontos de um IPv4 sempre separam rede e host?",
      "opts": [
        "Sim, sempre",
        "Não, quem define a separação é a máscara/CIDR",
        "Apenas em endereços privados",
        "Apenas em roteadores Cisco"
      ],
      "a": 1,
      "exp": "A fronteira de rede/host é por bits, não necessariamente por octetos visuais.",
      "difficulty": "iniciante",
      "topic": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc4.3.1",
      "front": "O que é máscara de rede?",
      "back": "É o valor que separa bits de rede e bits de host em um IPv4.",
      "tags": [
        "ipv4",
        "máscara"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.3.2",
      "front": "O que significa CIDR /24?",
      "back": "Significa que 24 bits do endereço IPv4 pertencem à parte de rede.",
      "tags": [
        "cidr"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.3.3",
      "front": "/24 equivale a qual máscara?",
      "back": "255.255.255.0.",
      "tags": [
        "máscara"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.3.4",
      "front": "O que o host decide usando a máscara?",
      "back": "Se o destino está na mesma rede ou se deve enviar ao gateway.",
      "tags": [
        "gateway",
        "roteamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.3.5",
      "front": "CIDR substitui firewall?",
      "back": "Não. CIDR descreve blocos de endereços; firewall aplica política de tráfego.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.3.6",
      "front": "Qual risco de CIDR amplo demais?",
      "back": "Permitir acesso a mais origens ou destinos do que o necessário.",
      "tags": [
        "segurança",
        "cloud"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex4.3.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras por que um IPv4 sem máscara não basta para saber quem está na rede local.",
      "expectedAnswer": "Porque a máscara/CIDR define quais bits representam a rede. Sem ela, não sabemos se o destino deve ser entregue diretamente ou via gateway.",
      "explanation": "O endereço identifica um valor; a máscara dá o contexto de rede."
    },
    {
      "id": "ex4.3.2",
      "type": "conversão",
      "prompt": "Converta 255.255.255.0 para CIDR.",
      "expectedAnswer": "/24.",
      "explanation": "Três octetos 255 representam 24 bits ligados para rede."
    },
    {
      "id": "ex4.3.3",
      "type": "diagnóstico",
      "prompt": "Um host 192.168.10.25/24 quer acessar 192.168.11.30. Ele deve tentar ARP direto para o destino ou usar o gateway?",
      "expectedAnswer": "Deve usar o gateway.",
      "explanation": "Em /24, 192.168.10.0 e 192.168.11.0 são redes diferentes."
    },
    {
      "id": "ex4.3.4",
      "type": "segurança",
      "prompt": "Por que uma allowlist 10.0.0.0/8 pode ser uma má prática?",
      "expectedAnswer": "Porque permite um bloco privado enorme, possivelmente incluindo muitas redes e ativos sem necessidade.",
      "explanation": "Menor privilégio exige CIDRs mais específicos e justificativa."
    },
    {
      "id": "ex4.3.v2-final.1",
      "type": "cálculo",
      "prompt": "Dado o IP 192.168.10.37/27, identifique rede, broadcast, primeiro host e último host utilizável.",
      "expectedAnswer": "Rede 192.168.10.32, broadcast 192.168.10.63, hosts 192.168.10.33 a 192.168.10.62.",
      "explanation": "Um /27 possui blocos de 32 endereços. O endereço 37 cai no bloco iniciado em 32."
    }
  ],
  "challenge": {
    "title": "Revisar CIDRs de uma pequena empresa",
    "scenario": "Uma empresa possui usuários em 10.10.10.0/24, servidores em 10.10.20.0/24 e impressoras em 10.10.30.0/24. Uma regra de firewall permite acesso administrativo a partir de 10.0.0.0/8.",
    "tasks": [
      "Identificar o risco da regra ampla.",
      "Propor CIDRs mais específicos.",
      "Explicar como validar IP, máscara e gateway em um host afetado.",
      "Indicar evidências que deveriam ser coletadas."
    ],
    "constraints": [
      "Não remover acesso legítimo de administração.",
      "Aplicar menor privilégio.",
      "Registrar justificativa operacional.",
      "Não expor IPs reais no relatório final."
    ],
    "expectedDeliverables": [
      "Tabela de CIDRs recomendados",
      "Justificativa de segurança",
      "Plano de validação",
      "Checklist de evidências sanitizadas"
    ],
    "gradingRubric": [
      {
        "criterion": "Interpretação de CIDR",
        "points": 30,
        "description": "Diferencia bloco amplo de bloco específico."
      },
      {
        "criterion": "Segurança",
        "points": 30,
        "description": "Aplica menor privilégio e reduz superfície."
      },
      {
        "criterion": "Validação técnica",
        "points": 25,
        "description": "Usa IP, máscara, gateway e rota para validar."
      },
      {
        "criterion": "Documentação",
        "points": 15,
        "description": "Entrega evidências sanitizadas e justificativa clara."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A regra 10.0.0.0/8 é ampla demais porque inclui todo o espaço privado 10.x.x.x. A solução deve identificar quais subnets realmente precisam administrar o recurso.",
    "steps": [
      "Listar subnets existentes e funções.",
      "Identificar origem real da administração.",
      "Substituir /8 por CIDRs específicos, como 10.10.10.0/24 ou uma subnet administrativa dedicada.",
      "Validar conectividade com logs e testes autorizados.",
      "Registrar justificativa, data e responsável."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Manter 10.0.0.0/8 porque é rede privada.",
        "whyItIsWrong": "Privado não significa seguro; ainda pode incluir muitos ativos internos."
      },
      {
        "answer": "Trocar para 0.0.0.0/0 temporariamente.",
        "whyItIsWrong": "Isso expõe a regra para qualquer origem IPv4 e viola menor privilégio."
      }
    ],
    "finalAnswer": "A regra deve ser reduzida para os CIDRs estritamente necessários, preferencialmente uma subnet administrativa dedicada, com logs, expiração de exceções e validação de impacto."
  },
  "glossary": [
    {
      "term": "Máscara de rede",
      "shortDefinition": "Valor que separa bits de rede e host.",
      "longDefinition": "No IPv4, a máscara indica quais bits iniciais pertencem à rede e quais bits restantes identificam hosts.",
      "example": "255.255.255.0 em um /24.",
      "relatedTerms": [
        "CIDR",
        "subnetting",
        "gateway"
      ],
      "relatedLessons": [
        "4.2",
        "4.4",
        "5.1"
      ]
    },
    {
      "term": "CIDR",
      "shortDefinition": "Notação com barra que indica bits de rede.",
      "longDefinition": "Classless Inter-Domain Routing representa prefixos como /24, /16 e /30, permitindo blocos flexíveis.",
      "example": "192.168.10.0/24.",
      "relatedTerms": [
        "prefixo",
        "subnet",
        "roteamento"
      ],
      "relatedLessons": [
        "4.3",
        "5.1"
      ]
    },
    {
      "term": "Prefixo",
      "shortDefinition": "Quantidade de bits de rede em um CIDR.",
      "longDefinition": "O prefixo /n indica quantos bits iniciais do endereço pertencem à rede.",
      "example": "/24 usa 24 bits de rede.",
      "relatedTerms": [
        "CIDR",
        "máscara"
      ],
      "relatedLessons": [
        "4.3"
      ]
    },
    {
      "term": "Bits de host",
      "shortDefinition": "Bits restantes após o prefixo de rede.",
      "longDefinition": "São os bits usados para identificar hosts dentro de um bloco IPv4.",
      "example": "Em /24, restam 8 bits de host.",
      "relatedTerms": [
        "host",
        "broadcast"
      ],
      "relatedLessons": [
        "4.4"
      ]
    },
    {
      "term": "Rota local",
      "shortDefinition": "Decisão do host sobre destino local ou gateway.",
      "longDefinition": "O host usa IP e máscara para decidir se entrega diretamente na LAN ou se envia ao gateway padrão.",
      "example": "192.168.10.80 é local para 192.168.10.25/24.",
      "relatedTerms": [
        "gateway",
        "ARP",
        "rota default"
      ],
      "relatedLessons": [
        "4.5"
      ]
    },
    {
      "term": "Sobreposição de CIDR",
      "shortDefinition": "Dois blocos usam a mesma faixa de endereços.",
      "longDefinition": "Quando redes diferentes possuem blocos iguais ou parcialmente sobrepostos, roteamento e VPN podem ficar ambíguos.",
      "example": "Filial e cloud usando 10.0.0.0/16.",
      "relatedTerms": [
        "VPN",
        "peering",
        "IPAM"
      ],
      "relatedLessons": [
        "10.1",
        "14.1"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 4632 — Classless Inter-domain Routing",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc4632",
      "note": "Referência sobre CIDR."
    },
    {
      "type": "rfc",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Base histórica do IPv4."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 4.2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base de octetos e estrutura IPv4."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "lesson": "Terraform networking",
      "reason": "CIDR aparece em VPC, VNet, subnets, security groups e variáveis de IaC."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso condicional e redes confiáveis",
      "lesson": "Condições por rede e localização",
      "reason": "Políticas baseadas em IP dependem de entendimento correto de CIDR e seus limites."
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
      "4.4"
    ]
  }
};
