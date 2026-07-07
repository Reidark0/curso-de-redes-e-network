export const lesson0402 = {
  "id": "4.2",
  "moduleId": "m04",
  "order": 2,
  "title": "Estrutura do endereço IPv4 e octetos",
  "subtitle": "Como ler um IPv4 como 32 bits divididos em quatro octetos, sem depender de decoreba.",
  "duration": "95-135 min",
  "estimatedStudyTimeMinutes": 135,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 225,
  "tags": [
    "redes",
    "ipv4",
    "octetos",
    "binário",
    "endereçamento",
    "cidr",
    "subnetting",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "A aula 4.1 explicou por que IPv4 existe e seu papel como endereçamento lógico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 explicou bits, bytes, binário e hexadecimal."
    }
  ],
  "objectives": [
    "Explicar que um endereço IPv4 possui 32 bits.",
    "Dividir um IPv4 em quatro octetos de 8 bits.",
    "Converter octetos simples entre decimal e binário.",
    "Validar por que cada octeto deve estar entre 0 e 255.",
    "Preparar o raciocínio para máscara, CIDR, rede, host e broadcast."
  ],
  "learningOutcomes": [
    "Dado um IPv4, o aluno identifica seus quatro octetos.",
    "Dado um octeto decimal, o aluno reconhece se ele é válido ou inválido.",
    "Dado um IPv4 comum, o aluno consegue representar seus octetos em binário de 8 bits.",
    "Dado um cenário cloud ou firewall, o aluno entende por que CIDR depende de bits e não apenas de pontos."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Na aula anterior, você entendeu por que o IPv4 existe: ele fornece endereçamento lógico para permitir comunicação entre redes. Agora surge a pergunta prática: como ler um endereço como <code>192.168.10.25</code> sem tratá-lo como apenas “quatro números separados por pontos”?</p><p>Em troubleshooting, cloud, firewall, VPN, DHCP, SIEM e auditoria, profissionais veem IPv4 o tempo todo. Mas muitos erros começam porque a pessoa lê o endereço apenas visualmente, sem entender que ele é um número de 32 bits dividido em quatro octetos. Sem essa base, máscara, CIDR, subnetting, broadcast e gateway viram decoreba.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> um analista recebe o IP <code>10.20.30.40</code>, uma máscara <code>/24</code> e uma regra de firewall. Se ele não entende octetos e bits, não consegue saber corretamente que parte representa a rede, que parte representa o host e quais endereços pertencem ao mesmo segmento.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>O IPv4 foi desenhado em uma época em que era necessário representar endereços de forma compacta, processável por computadores e legível por humanos. Internamente, computadores trabalham com bits. Para humanos, uma sequência de 32 bits como <code>11000000101010000000101000011001</code> é difícil de ler, comparar e digitar sem erro.</p><p>A notação decimal pontuada surgiu como uma forma prática de dividir esses 32 bits em quatro grupos de 8 bits. Cada grupo é chamado de octeto. Assim, o mesmo valor pode ser lido como <code>192.168.10.25</code>, muito mais fácil para documentação, configuração e troubleshooting.</p><p>Com o crescimento das redes, essa representação passou a aparecer em roteadores, firewalls, servidores, logs, sistemas de inventário, ferramentas de monitoramento, cloud e pipelines de infraestrutura como código.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema técnico é que um endereço IPv4 precisa ser entendido ao mesmo tempo por máquinas e por pessoas. A máquina precisa de 32 bits. O humano precisa de uma representação legível. Além disso, o profissional precisa interpretar os limites numéricos: cada octeto vai de 0 a 255 porque possui 8 bits.</p><ul class=\"flow-list\"><li><strong>Sem entender octetos:</strong> o aluno não percebe por que <code>192.168.1.300</code> é inválido.</li><li><strong>Sem entender 32 bits:</strong> máscara e CIDR parecem símbolos mágicos.</li><li><strong>Sem entender binário:</strong> subnetting vira memorização frágil.</li><li><strong>Sem entender decimal pontuado:</strong> logs e regras de firewall ficam fáceis de interpretar errado.</li><li><strong>Sem entender rede/host:</strong> o aluno confunde IP de host, rede, gateway e broadcast.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução da representação IPv4 mostra a tentativa de equilibrar eficiência técnica e legibilidade humana. O endereço é binário internamente, mas quase sempre é escrito em decimal pontuado para administração.</p><table class=\"data-table comparison-table\"><thead><tr><th>Representação</th><th>Exemplo</th><th>Uso</th><th>Limitação</th></tr></thead><tbody><tr><td>Binário puro</td><td><code>11000000101010000000101000011001</code></td><td>Processamento interno</td><td>Difícil para humanos</td></tr><tr><td>Quatro octetos binários</td><td><code>11000000.10101000.00001010.00011001</code></td><td>Estudo, subnetting, análise</td><td>Ainda extenso</td></tr><tr><td>Decimal pontuado</td><td><code>192.168.10.25</code></td><td>Configuração e documentação</td><td>Esconde os bits</td></tr><tr><td>CIDR junto do IP</td><td><code>192.168.10.25/24</code></td><td>Rede, cloud e firewall</td><td>Exige entender máscara</td></tr></tbody></table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>Um endereço IPv4 é um valor de 32 bits usado para identificar logicamente uma interface em uma rede IPv4. Por conveniência, esses 32 bits são divididos em quatro octetos de 8 bits e escritos em decimal separados por pontos.</p><div class=\"definition-box\"><strong>Definição:</strong> um octeto IPv4 é um grupo de 8 bits. Como 8 bits permitem 256 combinações, cada octeto pode variar de <code>0</code> a <code>255</code>.</div><p>Exemplo: <code>192.168.10.25</code> possui quatro octetos: <code>192</code>, <code>168</code>, <code>10</code> e <code>25</code>. Em binário, isso corresponde a <code>11000000.10101000.00001010.00011001</code>.</p>\n<p>O ponto pedagógico mais importante é que a notação decimal pontuada é uma representação para humanos. O equipamento trabalha com 32 bits. Quando você lê <code>10.20.30.40</code>, está vendo quatro blocos de 8 bits. Cada bloco pode ir de 0 a 255 porque 8 bits permitem 256 combinações.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Internamente, o endereço IPv4 não é composto por “números com pontos”; ele é uma sequência de 32 bits. A pontuação serve para facilitar a leitura humana. Cada octeto é convertido para binário quando o sistema precisa aplicar máscara, comparar rede e host ou calcular rotas.</p><ol class=\"flow-list\"><li>O sistema lê o endereço em decimal pontuado, por exemplo <code>192.168.10.25</code>.</li><li>Cada octeto é validado para garantir que está entre <code>0</code> e <code>255</code>.</li><li>Cada octeto é convertido para 8 bits.</li><li>Os quatro octetos formam um endereço de 32 bits.</li><li>A máscara/CIDR é aplicada sobre esses bits para separar parte de rede e parte de host.</li><li>A tabela de rotas usa o resultado para decidir se o destino é local ou remoto.</li></ol><div class=\"content-card\"><strong>Exemplo:</strong> <code>192</code> em binário é <code>11000000</code>; <code>168</code> é <code>10101000</code>; <code>10</code> é <code>00001010</code>; <code>25</code> é <code>00011001</code>.</div>\n<div class=\"callout callout--problem\"><strong>Erro operacional comum:</strong> tratar o endereço IPv4 como quatro números independentes sem lembrar que todos pertencem a uma sequência de 32 bits. Isso causa confusão em CIDR, cálculo de rede, broadcast, faixas válidas e troubleshooting de máscara.</div><p>Quando a máscara é aplicada, o sistema operacional não “olha os pontos”. Ele executa uma operação binária entre endereço e máscara. Por isso, entender octetos é a ponte entre leitura humana e cálculo real de rede.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>A estrutura do endereço IPv4 aparece em vários componentes de arquitetura. Hosts armazenam IP e máscara; roteadores escolhem caminhos com prefixos; firewalls aplicam regras por origem e destino; clouds organizam VPCs/VNets em blocos CIDR; ferramentas de SIEM correlacionam eventos por IP.</p><ul><li><strong>Camada OSI:</strong> Camada 3 — Rede.</li><li><strong>Formato lógico:</strong> 32 bits divididos em 4 octetos.</li><li><strong>Representação comum:</strong> decimal pontuado.</li><li><strong>Dependências:</strong> máscara, CIDR, gateway, rota e ARP.</li><li><strong>Pontos de falha:</strong> IP inválido, máscara incoerente, rede errada, gateway fora da sub-rede e conflito de endereço.</li></ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense no IPv4 como um número de telefone dividido em blocos para facilitar a leitura. Internamente, o sistema poderia tratar tudo como um número único, mas para pessoas é melhor separar em partes. Os pontos do IPv4 são como separadores visuais: ajudam a ler, mas não mudam o fato de que o endereço representa um valor binário.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em um telefone, os blocos costumam ter sentido administrativo fixo. No IPv4, o sentido de “rede” e “host” não é dado automaticamente pelos pontos; ele depende da máscara ou do prefixo CIDR.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Em casa, seu notebook pode receber o IP <code>192.168.1.34</code>. O primeiro impulso é pensar que <code>192.168.1</code> é sempre a rede e <code>34</code> é sempre o host. Isso frequentemente é verdade em redes domésticas com máscara <code>/24</code>, mas não é uma regra universal. Com outra máscara, a divisão entre rede e host pode ocorrer no meio de um octeto.</p><p>Por isso a aula de octetos é ponte direta para CIDR e subnetting: os pontos ajudam a enxergar, mas os bits determinam o cálculo.</p>\n<p>O endereço <code>192.168.10.25</code> pode ser lido como <code>11000000.10101000.00001010.00011001</code>. Essa escrita parece menos amigável, mas mostra por que <code>255</code> é o maior valor de um octeto e por que <code>256</code> não é um octeto válido.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, é comum encontrar blocos como <code>10.10.20.0/24</code> para usuários, <code>10.10.30.0/24</code> para servidores e <code>10.10.40.0/24</code> para impressoras. A leitura dos octetos ajuda na documentação, mas a política correta depende do prefixo. Um erro em um octeto pode apontar para outra VLAN, outro site ou outro ambiente.</p><p>Ao analisar um log de firewall, o profissional precisa reconhecer se <code>10.10.20.45</code> parece pertencer à rede de usuários ou se <code>10.10.200.45</code> é outro segmento completamente diferente. Essa leitura evita liberar regras erradas.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, IPv4 aparece como blocos CIDR de VPC, VNet, subnet, route table, security group, NAT Gateway, private endpoint e load balancer. Uma VPC como <code>10.0.0.0/16</code> pode ser dividida em subnets como <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code> e <code>10.0.10.0/24</code>.</p><p>Quem não entende octetos costuma criar blocos sobrepostos, desperdiçar endereços ou escolher ranges que conflitam com VPN, filiais e ambientes on-premises. Isso gera retrabalho caro porque renumerar rede em cloud pode exigir recriar subnets, rotas, gateways, endpoints, regras de segurança e dependências.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, endereços IPv4 aparecem em arquivos Terraform, Helm values, manifests Kubernetes, regras de firewall, allowlists de runners, conectividade com registries e políticas de egress. Um erro de octeto em uma variável pode liberar acesso para a rede errada ou bloquear um pipeline inteiro.</p><p>Também é comum ver pipelines comparando IPs de serviços, ranges de clusters e CIDRs de redes privadas. Mesmo quando Kubernetes abstrai muito da rede, CNI, Service CIDR, Pod CIDR e NetworkPolicy ainda exigem raciocínio sobre endereçamento.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Em segurança, IPv4 é evidência importante, mas não identidade absoluta. Um IP em log pode representar host, NAT, proxy, VPN, balanceador, pod, workload, IP público compartilhado ou endereço temporário por DHCP. Entender estrutura de endereço ajuda a detectar ranges suspeitos, tráfego lateral, uso indevido de redes privadas e exposição de subnets.</p><table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>Range amplo demais</td><td>Regra permite <code>10.0.0.0/8</code></td><td>Acesso lateral excessivo</td><td>Menor privilégio por subnet</td></tr><tr><td>Interpretação errada de IP</td><td>Confundir <code>10.1.2.3</code> com <code>10.1.20.3</code></td><td>Investigação incorreta</td><td>Padronizar documentação e SIEM enrichment</td></tr><tr><td>IP como identidade</td><td>Allowlist sem autenticação forte</td><td>Bypass por NAT/proxy ou mudança de IP</td><td>Combinar IP com identidade, mTLS, VPN, IAM e logs</td></tr></tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 500\" role=\"img\" aria-labelledby=\"m04l02-title m04l02-desc\">\n  <title id=\"m04l02-title\">Estrutura de um endereço IPv4 em quatro octetos</title>\n  <desc id=\"m04l02-desc\">O endereço IPv4 192.168.10.25 é mostrado como 32 bits divididos em quatro octetos de 8 bits, com representação decimal e binária.</desc>\n  <defs>\n    <marker id=\"m04l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n      <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n    </marker>\n  </defs>\n  <rect x=\"55\" y=\"50\" width=\"870\" height=\"76\" rx=\"16\" class=\"svg-zone\" />\n  <text x=\"490\" y=\"82\" text-anchor=\"middle\" class=\"svg-label\">IPv4 = 32 bits = 4 octetos de 8 bits</text>\n  <text x=\"490\" y=\"110\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Exemplo: 192.168.10.25</text>\n\n  <rect x=\"80\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"172\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 1</text>\n  <text x=\"172\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n  <text x=\"172\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">11000000</text>\n\n  <rect x=\"295\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"387\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 2</text>\n  <text x=\"387\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">168</text>\n  <text x=\"387\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10101000</text>\n\n  <rect x=\"510\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n  <text x=\"602\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 3</text>\n  <text x=\"602\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10</text>\n  <text x=\"602\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">00001010</text>\n\n  <rect x=\"725\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"817\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 4</text>\n  <text x=\"817\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">25</text>\n  <text x=\"817\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">00011001</text>\n\n  <line x1=\"172\" y1=\"300\" x2=\"172\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n  <line x1=\"387\" y1=\"300\" x2=\"387\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n  <line x1=\"602\" y1=\"300\" x2=\"602\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n  <line x1=\"817\" y1=\"300\" x2=\"817\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n\n  <rect x=\"80\" y=\"360\" width=\"830\" height=\"82\" rx=\"16\" class=\"svg-boundary\" />\n  <text x=\"490\" y=\"392\" text-anchor=\"middle\" class=\"svg-label\">A máscara/CIDR decide quais bits representam a rede e quais representam o host</text>\n  <text x=\"490\" y=\"420\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O endereço sozinho identifica um valor de 32 bits; o sentido de rede/host vem da máscara.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>O laboratório desta aula transforma endereços IPv4 em octetos, binário e validação prática. Você irá coletar o IP do seu host, separar os octetos, validar os limites numéricos e converter um endereço para binário usando PowerShell ou Python.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam leitura de octetos, validação de endereços, conversão para binário e identificação de erros comuns em configuração.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você receberá uma lista de IPs coletados de logs e precisará separar endereços válidos, inválidos, privados, suspeitos e prováveis erros de digitação, explicando seu raciocínio.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como validar cada octeto, evitar interpretação visual apressada e preparar o raciocínio para máscara, CIDR e subnetting.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<ul><li>IPv4 possui 32 bits.</li><li>Os 32 bits são escritos como quatro octetos de 8 bits.</li><li>Cada octeto varia de 0 a 255.</li><li>Os pontos não definem sozinhos rede e host.</li><li>A máscara/CIDR é quem separa bits de rede e bits de host.</li><li>Entender octetos evita erros em firewall, cloud, logs e subnetting.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, vamos estudar <strong>máscara de rede e CIDR</strong>. Agora que você entende que IPv4 é composto por 32 bits em quatro octetos, ficará muito mais fácil entender como uma máscara separa a parte de rede da parte de host.</p>\n</section>"
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
      "bytes",
      "binário",
      "Ethernet",
      "ARP",
      "gateway"
    ],
    "enables": [
      "máscara de rede",
      "CIDR",
      "subnetting",
      "broadcast",
      "roteamento",
      "firewall",
      "cloud networking"
    ]
  },
  "deepDive": {
    "mentalModel": "IPv4 é um número de 32 bits escrito em quatro octetos decimais para facilitar leitura humana; a máscara define o significado de rede e host.",
    "keyTerms": [
      "octeto",
      "32 bits",
      "decimal pontuado",
      "CIDR",
      "rede",
      "host"
    ],
    "limitations": [
      "A notação decimal pontuada esconde os bits usados no cálculo real.",
      "Os pontos não determinam sozinhos a separação entre rede e host.",
      "Um endereço IPv4 sem máscara é insuficiente para diagnosticar rede local com precisão."
    ],
    "whenToUse": [
      "Ler e validar endereços IPv4 em hosts, roteadores, firewalls e cloud.",
      "Preparar cálculos de máscara, CIDR e subnetting.",
      "Interpretar logs, regras de firewall e documentação de rede."
    ],
    "whenNotToUse": [
      "Como prova única de identidade de usuário.",
      "Como substituto de documentação de subnet e máscara.",
      "Como único controle de segurança."
    ],
    "operationalImpact": [
      "Erros em octetos podem quebrar conectividade ou apontar para redes erradas.",
      "Padronização de ranges facilita troubleshooting e inventário.",
      "Documentar IP sem máscara reduz o valor técnico da evidência.",
      "Validar formato e octetos evita erros em planilhas de endereçamento, regras de firewall, reservas DHCP e documentação de incidentes."
    ],
    "financialImpact": [
      "Em cloud, blocos CIDR mal planejados podem exigir recriação de redes, subnets, rotas e endpoints.",
      "Retrabalho de endereçamento afeta janelas de mudança e disponibilidade.",
      "Logs e ferramentas de monitoramento podem gerar custos extras quando ranges são amplos e mal segmentados."
    ],
    "securityImpact": [
      "Allowlists por IP podem ser perigosas se ranges forem amplos demais.",
      "Logs de IP exigem correlação com NAT, DHCP, proxy, VPN e identidade.",
      "Raciocínio incorreto de octetos pode liberar acesso para segmentos errados.",
      "Allowlists e regras de firewall com IP digitado errado podem criar falsa sensação de proteção ou liberar destino/origem diferente do planejado."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que os três primeiros octetos são sempre a rede.",
      "whyItHappens": "Muitas redes domésticas usam /24.",
      "consequence": "O aluno erra quando encontra /16, /20, /27 ou subnets cloud.",
      "correction": "A separação rede/host depende da máscara ou CIDR."
    },
    {
      "mistake": "Aceitar octeto maior que 255.",
      "whyItHappens": "O endereço parece apenas uma sequência de números.",
      "consequence": "Configuração inválida ou erro de documentação.",
      "correction": "Cada octeto tem 8 bits e varia de 0 a 255."
    },
    {
      "mistake": "Remover zeros internos da representação binária.",
      "whyItHappens": "O aluno pensa em número decimal, não em campo fixo de 8 bits.",
      "consequence": "Cálculos de máscara e subnetting ficam errados.",
      "correction": "Cada octeto deve ter exatamente 8 bits em binário."
    },
    {
      "mistake": "Tratar IP como identidade forte.",
      "whyItHappens": "Logs mostram IP de origem e destino.",
      "consequence": "Investigação e controle de acesso podem ficar frágeis.",
      "correction": "Correlacionar IP com horário, DHCP, autenticação, NAT, VPN, proxy e EDR."
    },
    {
      "mistake": "Achar que todo número com pontos é um IPv4 válido.",
      "whyItHappens": "A notação decimal pontuada parece simples e parecida com versões de software ou códigos internos.",
      "consequence": "Configurações inválidas entram em documentação, firewall, allowlist ou troubleshooting sem validação básica.",
      "correction": "Confirmar quatro octetos, cada um entre 0 e 255, e depois validar máscara, rota e contexto."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "IP configurado parece correto, mas está em rede diferente por causa da máscara.",
      "Endereço digitado com octeto inválido.",
      "Gateway configurado fora da sub-rede.",
      "Regra de firewall liberando range diferente do esperado.",
      "Conflito entre CIDR cloud e rede on-premises."
    ],
    "diagnosticQuestions": [
      "O endereço possui exatamente quatro octetos?",
      "Cada octeto está entre 0 e 255?",
      "Qual é a máscara ou prefixo CIDR?",
      "O gateway pertence à mesma rede do host?",
      "O range conflita com VPN, cloud ou rede de outra filial?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver IPv4, máscara, gateway e DHCP.",
        "expectedObservation": "Endereço IPv4 com quatro octetos válidos e máscara coerente.",
        "interpretation": "Sem máscara não é possível confirmar com precisão o limite da rede local."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver endereços IPv4, prefixos CIDR e rota default.",
        "expectedObservation": "Interface com IPv4 em formato como 192.168.10.25/24.",
        "interpretation": "O sufixo /24 informa quantos bits pertencem ao prefixo de rede."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow running-config interface <interface>",
        "purpose": "Ver IPs configurados e máscaras em interfaces Cisco.",
        "expectedObservation": "Interface up/up com IP e máscara válidos.",
        "interpretation": "IP ou máscara incorretos podem isolar a interface da rede esperada."
      },
      {
        "platform": "Windows PowerShell",
        "command": "'192.168.10.25'.Split('.') | ForEach-Object { [Convert]::ToString([int]$_,2).PadLeft(8,'0') }",
        "purpose": "Converter octetos decimais em binário para validar leitura técnica do IPv4.",
        "expectedObservation": "Quatro linhas com 8 bits cada.",
        "interpretation": "Se algum octeto não puder ser convertido ou passar de 255, o endereço é inválido."
      },
      {
        "platform": "Linux/Python",
        "command": "python3 - <<'PY'\nip='192.168.10.25'\nprint('.'.join(f'{int(o):08b}' for o in ip.split('.')))\nPY",
        "purpose": "Gerar a representação binária de um IPv4 usando ferramenta disponível em muitos ambientes de laboratório.",
        "expectedObservation": "11000000.10101000.00001010.00011001",
        "interpretation": "A conversão reforça que IPv4 é uma sequência de 32 bits agrupada para leitura humana."
      },
      {
        "platform": "Manual/Validação",
        "command": "Verifique se cada octeto está entre 0 e 255 e se existem exatamente quatro octetos decimais.",
        "purpose": "Evitar aceitar strings que parecem IP, mas não são endereços IPv4 válidos.",
        "expectedObservation": "192.168.1.300 e 10.1.1 são inválidos; 10.1.1.1 é estruturalmente válido.",
        "interpretation": "Validação estrutural não garante roteabilidade; apenas confirma formato IPv4."
      }
    ],
    "decisionTree": [
      {
        "if": "Um octeto é maior que 255",
        "then": "O endereço é inválido; revisar digitação ou documentação."
      },
      {
        "if": "O IP é válido mas não há máscara",
        "then": "Coletar prefixo CIDR ou máscara antes de concluir rede local."
      },
      {
        "if": "Gateway parece em outro range",
        "then": "Validar máscara; talvez gateway esteja fora da sub-rede do host."
      },
      {
        "if": "Range cloud conflita com filial",
        "then": "Planejar renumeração, NAT ou redesign antes de conectar redes."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar IP sempre com máscara ou CIDR.",
      "Validar ranges antes de criar VPCs, VNets, VPNs e peerings.",
      "Usar nomenclatura de subnets coerente com função e ambiente.",
      "Correlacionar logs de IP com identidade, DHCP, NAT, proxy e horário.",
      "Aplicar menor privilégio em regras por CIDR."
    ],
    "badPractices": [
      "Liberar ranges amplos sem justificativa.",
      "Assumir que todo 192.168.x.x é a mesma rede.",
      "Criar allowlist por IP sem autenticação forte.",
      "Ignorar sobreposição de CIDR entre cloud e on-premises.",
      "Publicar logs com IPs internos sem sanitização."
    ],
    "commonErrors": [
      "Confundir endereço válido com endereço corretamente roteável.",
      "Confundir IP privado com segurança automática.",
      "Ignorar NAT e DHCP ao atribuir autoria em logs."
    ],
    "vulnerabilities": [
      {
        "name": "Allowlist ampla por CIDR",
        "description": "Regras que liberam blocos grandes podem permitir acesso lateral indevido.",
        "defensiveExplanation": "O risco aumenta quando o endereço é tratado como identidade e não como localização lógica de rede.",
        "mitigation": "Restringir CIDRs, exigir autenticação forte, registrar acessos e revisar exceções."
      },
      {
        "name": "Sobreposição de endereços",
        "description": "Duas redes usando o mesmo range podem quebrar VPN, roteamento e logs.",
        "defensiveExplanation": "O tráfego pode seguir caminho inesperado ou exigir NAT complexo.",
        "mitigation": "Planejar IPAM, revisar CIDRs e validar antes de conectar ambientes."
      }
    ],
    "monitoring": [
      "Mudanças em regras de firewall por CIDR.",
      "Criação de subnets cloud com ranges amplos.",
      "Conexões laterais entre blocos que deveriam ser isolados.",
      "Eventos DHCP e NAT correlacionados com identidade."
    ],
    "hardening": [
      "Usar IPAM ou inventário confiável.",
      "Padronizar blocos por ambiente e função.",
      "Bloquear ranges não documentados.",
      "Associar IP a identidade e dispositivo quando possível."
    ],
    "detectionIdeas": [
      "Alertar quando regra liberar /8, /12 ou /16 sem aprovação.",
      "Detectar tráfego entre segmentos não relacionados.",
      "Comparar logs de firewall com inventário de subnets.",
      "Identificar origem NAT compartilhada em eventos sensíveis."
    ]
  },
  "protocolFields": [
    {
      "field": "Source Address",
      "size": "32 bits",
      "purpose": "Indicar o endereço IPv4 de origem do pacote.",
      "securityObservation": "Pode representar host, NAT, proxy ou workload; não deve ser tratado isoladamente como identidade."
    },
    {
      "field": "Destination Address",
      "size": "32 bits",
      "purpose": "Indicar o endereço IPv4 de destino do pacote.",
      "securityObservation": "Ajuda a identificar alvo, segmentação e exposição de serviços."
    },
    {
      "field": "Octet",
      "size": "8 bits",
      "purpose": "Representar uma das quatro partes do endereço IPv4.",
      "securityObservation": "Erro de octeto em regra pode liberar ou bloquear segmento errado."
    },
    {
      "field": "CIDR Prefix",
      "size": "0 a 32 bits",
      "purpose": "Informar quantos bits representam o prefixo de rede.",
      "securityObservation": "Prefixos amplos demais aumentam superfície de acesso."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Lê o IPv4 configurado",
      "detail": "Exemplo: 192.168.10.25.",
      "possibleFailure": "Endereço inválido ou duplicado."
    },
    {
      "step": 2,
      "actor": "Sistema operacional",
      "action": "Converte octetos em bits",
      "detail": "Cada octeto vira 8 bits.",
      "possibleFailure": "Interpretação errada em documentação ou script."
    },
    {
      "step": 3,
      "actor": "Pilha IP",
      "action": "Aplica máscara/CIDR",
      "detail": "Define parte de rede e parte de host.",
      "possibleFailure": "Máscara incorreta coloca o host em rede errada."
    },
    {
      "step": 4,
      "actor": "Tabela de rotas",
      "action": "Decide destino local ou gateway",
      "detail": "A decisão depende do resultado bit a bit.",
      "possibleFailure": "Gateway fora da rede local ou rota ausente."
    }
  ],
  "lab": {
    "id": "lab-4.2",
    "title": "Lendo IPv4 como octetos e bits",
    "labType": "security",
    "objective": "Coletar um endereço IPv4 real, separar seus octetos, validar limites e converter para binário de 8 bits.",
    "scenario": "Você atua em suporte/segurança e precisa explicar tecnicamente o endereço IPv4 do seu host antes de avançar para máscara e CIDR.",
    "topology": "Host do aluno -> rede local -> gateway padrão",
    "architecture": "Um host com IPv4 configurado manualmente ou via DHCP em uma LAN comum.",
    "prerequisites": [
      "Ter concluído as aulas 0.2 e 4.1.",
      "Ter acesso a Windows PowerShell ou terminal Linux."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "Python opcional",
      "Calculadora opcional"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero",
    "safetyNotes": [
      "Não publique IPs, MACs, gateway ou topologia real sem sanitizar.",
      "Execute apenas comandos de leitura.",
      "Não altere configurações de rede durante este laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar endereço IPv4 no Windows",
        "instruction": "No Windows, liste a configuração IPv4 do host.",
        "command": "ipconfig /all",
        "expectedOutput": "Endereço IPv4, máscara de sub-rede e gateway padrão.",
        "explanation": "Esse comando mostra o IPv4 em decimal pontuado e a máscara associada."
      },
      {
        "number": 2,
        "title": "Coletar endereço IPv4 no Linux",
        "instruction": "No Linux, liste os endereços e prefixos.",
        "command": "ip addr && ip route",
        "expectedOutput": "Endereço em formato como 192.168.10.25/24 e rota default.",
        "explanation": "O /24 é o prefixo CIDR, essencial para interpretar rede e host."
      },
      {
        "number": 3,
        "title": "Separar octetos",
        "instruction": "Escolha um IPv4 e separe seus quatro octetos.",
        "command": "Exemplo manual: 192.168.10.25 -> 192 | 168 | 10 | 25",
        "expectedOutput": "Quatro valores entre 0 e 255.",
        "explanation": "Cada valor representa 8 bits do endereço."
      },
      {
        "number": 4,
        "title": "Converter com PowerShell",
        "instruction": "Converta cada octeto para binário com 8 bits.",
        "command": "'192.168.10.25'.Split('.') | ForEach-Object { [Convert]::ToString([int]$_,2).PadLeft(8,'0') }",
        "expectedOutput": "11000000\n10101000\n00001010\n00011001",
        "explanation": "O PadLeft garante que cada octeto tenha exatamente 8 bits."
      },
      {
        "number": 5,
        "title": "Converter com Python",
        "instruction": "Use Python como alternativa multiplataforma.",
        "command": "python3 - <<'PY'\nip='192.168.10.25'\nprint('.'.join(f'{int(o):08b}' for o in ip.split('.')))\nPY",
        "expectedOutput": "11000000.10101000.00001010.00011001",
        "explanation": "A formatação 08b mostra cada octeto com oito bits."
      },
      {
        "number": 6,
        "title": "Validar endereços inválidos",
        "instruction": "Explique por que 192.168.1.300 é inválido.",
        "command": "Análise manual",
        "expectedOutput": "O octeto 300 excede 255.",
        "explanation": "Com 8 bits, o maior valor possível é 255."
      },
      {
        "number": 7,
        "title": "Montar tabela decimal/binário",
        "instruction": "Monte uma tabela com três IPs válidos e dois inválidos, separando octetos e justificando o motivo técnico.",
        "artifact": "Tabela com colunas: endereço, octeto 1, octeto 2, octeto 3, octeto 4, binário e conclusão.",
        "expectedOutput": "Tabela indicando quais endereços são estruturalmente válidos e quais falham por octeto ausente, extra ou acima de 255.",
        "explanation": "Esse artefato prepara o aluno para CIDR e subnetting, onde a leitura binária deixa de ser opcional."
      }
    ],
    "expectedResult": "O aluno deve conseguir ler um IPv4 real, separar octetos, validar limites e representar o endereço em binário.",
    "validation": [
      {
        "check": "Quatro octetos identificados",
        "command": "Conferência manual",
        "expected": "Exatamente quatro valores",
        "ifFails": "Revisar notação decimal pontuada."
      },
      {
        "check": "Octetos entre 0 e 255",
        "command": "Conferência manual",
        "expected": "Nenhum valor menor que 0 ou maior que 255",
        "ifFails": "O endereço é inválido ou foi copiado incorretamente."
      },
      {
        "check": "Binário com 32 bits",
        "command": "Contar 4 grupos de 8 bits",
        "expected": "32 bits no total",
        "ifFails": "Revisar zeros à esquerda."
      },
      {
        "check": "Octetos convertidos corretamente",
        "command": "python3 - <<'PY'\nfor ip in ['192.168.10.25','10.0.0.1','172.16.5.200']:\n print(ip, '.'.join(f'{int(o):08b}' for o in ip.split('.')))\nPY",
        "expected": "Cada IP válido convertido para quatro grupos de 8 bits.",
        "ifFails": "Revisar se há octetos acima de 255, caracteres não numéricos ou quantidade incorreta de octetos."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "PowerShell retorna erro de conversão",
        "probableCause": "IP contém caracteres extras ou espaço.",
        "howToConfirm": "Copiar apenas o endereço IPv4.",
        "fix": "Remover texto extra e executar novamente."
      },
      {
        "symptom": "Binário aparece com menos de 8 bits",
        "probableCause": "Zeros à esquerda foram omitidos.",
        "howToConfirm": "Verificar octetos como 10 ou 25.",
        "fix": "Usar PadLeft(8,'0') ou formatação 08b."
      },
      {
        "symptom": "Gateway parece fora da rede",
        "probableCause": "Máscara/CIDR interpretado errado.",
        "howToConfirm": "Coletar máscara e aguardar a próxima aula sobre CIDR.",
        "fix": "Não concluir sem analisar máscara."
      }
    ],
    "improvements": [
      "Criar tabela com IP, octetos, binário e função.",
      "Repetir com IP do gateway e DNS.",
      "Comparar IP privado, público, loopback e APIPA na aula 4.6."
    ],
    "evidenceToCollect": [
      "IPv4 sanitizado do host",
      "Máscara ou CIDR",
      "Gateway sanitizado",
      "Conversão binária dos quatro octetos",
      "Explicação de um endereço inválido",
      "Tabela decimal/binário com pelo menos três IPv4 válidos e dois exemplos inválidos explicados"
    ],
    "questions": [
      "Por que cada octeto vai até 255?",
      "Por que zeros à esquerda importam no binário?",
      "Por que IP sem máscara não basta para saber a rede?"
    ],
    "challenge": "Converta 10.20.30.40 para binário, valide os octetos e explique por que ainda falta a máscara para saber a rede.",
    "solution": "10.20.30.40 vira 00001010.00010100.00011110.00101000. Todos os octetos são válidos porque estão entre 0 e 255. Ainda falta a máscara ou prefixo CIDR para separar bits de rede e bits de host."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que o IPv4 é escrito em decimal pontuado se a máquina trabalha com bits?",
      "hints": [
        "Pense em legibilidade humana.",
        "Pense em configuração e documentação."
      ],
      "expectedIdeas": [
        "32 bits",
        "quatro octetos",
        "facilidade de leitura",
        "conversão interna"
      ],
      "explanation": "A notação decimal pontuada torna o endereço administrável por humanos, mas o cálculo real ocorre em bits."
    },
    {
      "type": "diagnóstico",
      "question": "Um colega configurou 192.168.1.300. O que você explica?",
      "hints": [
        "Quantos bits existem em um octeto?",
        "Qual o maior valor de 8 bits?"
      ],
      "expectedIdeas": [
        "octeto inválido",
        "0 a 255",
        "8 bits"
      ],
      "explanation": "300 não cabe em um octeto de 8 bits, portanto o IPv4 é inválido."
    },
    {
      "type": "cenário real",
      "question": "Por que uma regra permitindo 10.0.0.0/8 pode ser perigosa?",
      "hints": [
        "Pense em range amplo.",
        "Pense em menor privilégio."
      ],
      "expectedIdeas": [
        "CIDR amplo",
        "acesso lateral",
        "segmentação",
        "revisão de firewall"
      ],
      "explanation": "Um /8 cobre muitos endereços. Sem justificativa, pode permitir acesso muito além do necessário."
    }
  ],
  "quiz": [
    {
      "id": "q4.2.1",
      "type": "conceito",
      "q": "Quantos bits possui um endereço IPv4?",
      "opts": [
        "32 bits",
        "8 bits",
        "64 bits",
        "128 bits"
      ],
      "a": 0,
      "exp": "IPv4 possui 32 bits, divididos em quatro octetos de 8 bits.",
      "difficulty": "iniciante",
      "topic": "estrutura"
    },
    {
      "id": "q4.2.2",
      "type": "conceito",
      "q": "Qual é o maior valor decimal possível em um octeto IPv4?",
      "opts": [
        "255",
        "256",
        "999",
        "128"
      ],
      "a": 0,
      "exp": "Um octeto tem 8 bits, permitindo valores de 0 a 255.",
      "difficulty": "iniciante",
      "topic": "octeto"
    },
    {
      "id": "q4.2.3",
      "type": "diagnóstico",
      "q": "Qual endereço abaixo é inválido?",
      "opts": [
        "192.168.1.300",
        "10.0.0.1",
        "172.16.5.10",
        "8.8.8.8"
      ],
      "a": 0,
      "exp": "300 excede o limite de um octeto IPv4.",
      "difficulty": "iniciante",
      "topic": "validação"
    },
    {
      "id": "q4.2.4",
      "type": "comparação",
      "q": "O que os pontos em um IPv4 fazem?",
      "opts": [
        "Separam visualmente quatro octetos",
        "Criptografam o endereço",
        "Definem sempre rede e host",
        "Substituem a máscara"
      ],
      "a": 0,
      "exp": "Os pontos separam os octetos para legibilidade; a máscara define rede e host.",
      "difficulty": "iniciante",
      "topic": "decimal pontuado"
    },
    {
      "id": "q4.2.5",
      "type": "segurança",
      "q": "Por que não devemos tratar IP como identidade absoluta?",
      "opts": [
        "Porque pode haver NAT, DHCP, proxy e VPN",
        "Porque IP não aparece em logs",
        "Porque IPv4 não tem números",
        "Porque todo IP é público"
      ],
      "a": 0,
      "exp": "Um IP pode representar várias camadas de tradução e contexto; é preciso correlacionar evidências.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q4.2.6",
      "type": "cloud",
      "q": "Em cloud, por que entender octetos e CIDR importa?",
      "opts": [
        "Para evitar ranges sobrepostos e regras amplas",
        "Para escolher a cor do dashboard",
        "Para substituir TLS",
        "Para evitar usar DNS"
      ],
      "a": 0,
      "exp": "Planejamento CIDR inadequado causa conflitos, retrabalho e riscos de segurança.",
      "difficulty": "intermediário",
      "topic": "cloud"
    }
  ],
  "flashcards": [
    {
      "id": "fc4.2.1",
      "front": "Quantos bits tem um IPv4?",
      "back": "32 bits.",
      "tags": [
        "ipv4"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.2.2",
      "front": "O que é um octeto?",
      "back": "Um grupo de 8 bits.",
      "tags": [
        "octeto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.2.3",
      "front": "Qual o intervalo válido de um octeto IPv4?",
      "back": "De 0 a 255.",
      "tags": [
        "ipv4",
        "validação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.2.4",
      "front": "Os pontos do IPv4 definem rede e host?",
      "back": "Não. A separação rede/host depende da máscara ou CIDR.",
      "tags": [
        "cidr"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc4.2.5",
      "front": "Por que zeros à esquerda importam no binário?",
      "back": "Porque cada octeto deve manter 8 bits para cálculos corretos.",
      "tags": [
        "binário"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.2.6",
      "front": "IP é identidade forte?",
      "back": "Não. Deve ser correlacionado com NAT, DHCP, proxy, VPN, autenticação e horário.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex4.2.1",
      "type": "conceitual",
      "prompt": "Explique por que 172.16.5.10 possui quatro octetos.",
      "expectedAnswer": "Porque a notação decimal pontuada divide o IPv4 em quatro grupos: 172, 16, 5 e 10.",
      "explanation": "Cada grupo representa 8 bits do endereço de 32 bits."
    },
    {
      "id": "ex4.2.2",
      "type": "prático",
      "prompt": "Converta o octeto 10 para binário de 8 bits.",
      "expectedAnswer": "00001010.",
      "explanation": "10 em binário é 1010, mas como octeto precisa ser preenchido com zeros à esquerda."
    },
    {
      "id": "ex4.2.3",
      "type": "diagnóstico",
      "prompt": "Identifique o erro em 10.20.30.400.",
      "expectedAnswer": "O quarto octeto, 400, é inválido porque excede 255.",
      "explanation": "Um octeto tem 8 bits e só permite valores de 0 a 255."
    },
    {
      "id": "ex4.2.4",
      "type": "segurança",
      "prompt": "Explique por que uma allowlist por IP deve ser revisada com cuidado.",
      "expectedAnswer": "Porque IP pode mudar, pode representar NAT/proxy/VPN e ranges amplos podem liberar acesso excessivo.",
      "explanation": "IP é evidência e localização lógica, não identidade forte isolada."
    }
  ],
  "challenge": {
    "title": "Validar IPs de um relatório de incidente",
    "scenario": "Você recebeu um relatório com os endereços 10.20.30.40, 192.168.1.300, 172.16.5.7, 10.0.0.0/8 e 203.0.113.50. Precisa separar endereços válidos, inválidos e pontos que exigem contexto adicional.",
    "tasks": [
      "Validar cada octeto.",
      "Identificar o endereço inválido.",
      "Explicar por que /8 é amplo.",
      "Indicar quais dados adicionais seriam necessários para investigação."
    ],
    "constraints": [
      "Não atribuir autoria apenas por IP.",
      "Não assumir rede/host sem máscara.",
      "Sanitizar dados antes de compartilhar."
    ],
    "expectedDeliverables": [
      "Tabela de validação",
      "Lista de riscos",
      "Perguntas de investigação",
      "Recomendação de próximos passos"
    ],
    "gradingRubric": [
      {
        "criterion": "Validação técnica",
        "points": 35,
        "description": "Identifica octetos válidos e inválidos."
      },
      {
        "criterion": "Raciocínio CIDR",
        "points": 25,
        "description": "Explica por que /8 é amplo e exige cuidado."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Não usa IP como identidade isolada."
      },
      {
        "criterion": "Clareza",
        "points": 15,
        "description": "Entrega tabela e explicação compreensíveis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro validamos a estrutura de quatro octetos. Depois avaliamos contexto: presença de CIDR, amplitude do range e necessidade de correlação com logs.",
    "steps": [
      "Separar cada endereço em octetos.",
      "Confirmar se cada octeto está entre 0 e 255.",
      "Marcar 192.168.1.300 como inválido.",
      "Reconhecer que 10.0.0.0/8 é um bloco amplo.",
      "Solicitar máscara, horário, NAT, DHCP, VPN, proxy e identidade associada."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Todo 10.x.x.x é seguro.",
        "whyItIsWrong": "IP privado não garante segurança; depende de segmentação, controles e contexto."
      },
      {
        "answer": "192.168.1.300 pode funcionar se for rede local.",
        "whyItIsWrong": "300 não cabe em um octeto IPv4."
      },
      {
        "answer": "IP sozinho identifica o usuário.",
        "whyItIsWrong": "NAT, DHCP, proxy e VPN podem mascarar ou compartilhar origem."
      }
    ],
    "finalAnswer": "10.20.30.40, 172.16.5.7 e 203.0.113.50 possuem octetos válidos. 192.168.1.300 é inválido. 10.0.0.0/8 é um bloco amplo que exige cuidado em firewall e investigação. Para atribuição, é necessário correlacionar IP com horário, DHCP, NAT, VPN, proxy, autenticação e logs de endpoint."
  },
  "glossary": [
    {
      "term": "Octeto",
      "shortDefinition": "Grupo de 8 bits.",
      "longDefinition": "No IPv4, cada endereço possui quatro octetos, totalizando 32 bits.",
      "example": "Em 192.168.10.25, 192 é o primeiro octeto.",
      "relatedTerms": [
        "byte",
        "IPv4",
        "binário"
      ],
      "relatedLessons": [
        "0.2",
        "4.2"
      ]
    },
    {
      "term": "Decimal pontuado",
      "shortDefinition": "Forma humana de escrever IPv4 com quatro números separados por pontos.",
      "longDefinition": "Representa quatro octetos decimais de um endereço IPv4.",
      "example": "192.168.10.25.",
      "relatedTerms": [
        "IPv4",
        "octeto"
      ],
      "relatedLessons": [
        "4.2"
      ]
    },
    {
      "term": "32 bits",
      "shortDefinition": "Tamanho de um endereço IPv4.",
      "longDefinition": "Um IPv4 contém quatro octetos de 8 bits, totalizando 32 bits.",
      "example": "11000000.10101000.00001010.00011001.",
      "relatedTerms": [
        "bit",
        "octeto"
      ],
      "relatedLessons": [
        "0.2",
        "4.2"
      ]
    },
    {
      "term": "CIDR",
      "shortDefinition": "Notação que informa quantos bits formam o prefixo de rede.",
      "longDefinition": "CIDR representa o tamanho do prefixo, como /24, e será aprofundado na próxima aula.",
      "example": "192.168.10.25/24.",
      "relatedTerms": [
        "máscara",
        "subnetting"
      ],
      "relatedLessons": [
        "4.3",
        "5.1"
      ]
    },
    {
      "term": "Prefixo",
      "shortDefinition": "Parte inicial do endereço usada para representar a rede.",
      "longDefinition": "O prefixo é definido pela máscara/CIDR, não apenas pelos pontos do endereço.",
      "example": "Em /24, os primeiros 24 bits são o prefixo.",
      "relatedTerms": [
        "CIDR",
        "máscara"
      ],
      "relatedLessons": [
        "4.3"
      ]
    },
    {
      "term": "Host",
      "shortDefinition": "Parte do endereço que identifica uma interface dentro da rede.",
      "longDefinition": "A parte de host depende da máscara e indica endereços possíveis dentro de um prefixo.",
      "example": "Em muitos /24, o último octeto varia para identificar hosts.",
      "relatedTerms": [
        "rede",
        "broadcast"
      ],
      "relatedLessons": [
        "4.4"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência clássica do IPv4."
    },
    {
      "type": "internal-course",
      "title": "Bits, bytes, binário e hexadecimal",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Revise a aula 0.2 para conversão binária."
    },
    {
      "type": "internal-course",
      "title": "Por que o IPv4 existe",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula anterior do módulo."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "lesson": "Terraform networking",
      "reason": "CIDRs e octetos aparecem em VPCs, VNets, subnets e security groups."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Controle de acesso",
      "lesson": "Contexto de rede em políticas",
      "reason": "IP pode ser usado como contexto, mas não deve substituir identidade forte."
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
      "4.3"
    ]
  }
};
