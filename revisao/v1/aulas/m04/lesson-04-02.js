export const lesson0402 = {
  "id": "4.2",
  "moduleId": "m04",
  "order": 2,
  "title": "Estrutura do endereço IPv4 e octetos",
  "subtitle": "Como ler um IPv4 como 32 bits divididos em quatro octetos, sem depender de decoreba.",
  "duration": "85-125 min",
  "estimatedStudyTimeMinutes": 125,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>Motivação</h2>\n<p>Na aula anterior, você viu por que o IPv4 existe. Agora a pergunta é prática: como ler <code>192.168.10.25</code> sem tratá-lo como “quatro números separados por pontos”? Ele é um número de 32 bits dividido em quatro octetos. Sem essa base, máscara, CIDR, subnetting, broadcast e gateway viram decoreba.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> um analista recebe o IP <code>10.20.30.40</code>, uma máscara <code>/24</code> e uma regra de firewall. Se ele não entende octetos e bits, não consegue saber que parte representa a rede, que parte representa o host e quais endereços pertencem ao mesmo segmento.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>Problema</h2>\n<p>Um endereço IPv4 precisa ser entendido ao mesmo tempo por máquinas e por pessoas. A máquina trabalha com 32 bits, mas uma sequência como <code>11000000101010000000101000011001</code> é difícil de ler, comparar e digitar sem erro. A notação decimal pontuada resolve isso dividindo os 32 bits em quatro grupos de 8 bits (octetos) e escrevendo cada grupo em decimal: <code>192.168.10.25</code>.</p><p>O custo dessa conveniência é que os pontos escondem os bits. Quem lê só os pontos tropeça em três lugares:</p><ul class=\"flow-list\"><li><strong>Validação:</strong> não percebe por que <code>192.168.1.300</code> é inválido (cada octeto vai de 0 a 255 porque tem 8 bits).</li><li><strong>Máscara e CIDR:</strong> eles operam sobre bits, então parecem símbolos mágicos e o subnetting vira memorização frágil.</li><li><strong>Rede e host:</strong> confunde IP de host, rede, gateway e broadcast, e interpreta errado logs e regras de firewall.</li></ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>Conceito</h2>\n<p>Um endereço IPv4 é um valor de 32 bits que identifica logicamente uma interface em uma rede IPv4. Por conveniência, esses 32 bits são divididos em quatro octetos de 8 bits, escritos em decimal e separados por pontos.</p><div class=\"definition-box\"><strong>Definição:</strong> um octeto IPv4 é um grupo de 8 bits. Como 8 bits permitem 2<sup>8</sup> = 256 combinações, cada octeto vai de <code>0</code> a <code>255</code>. Um endereço IPv4 tem exatamente quatro octetos.</div><p>Exemplo: <code>192.168.10.25</code> tem os octetos <code>192</code>, <code>168</code>, <code>10</code> e <code>25</code>. Em binário: <code>11000000.10101000.00001010.00011001</code>.</p>\n<h3>Quatro formas de escrever o mesmo endereço</h3>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Representação</th><th>Exemplo</th><th>Uso</th><th>Limitação</th></tr></thead><tbody><tr><td>Binário puro</td><td><code>11000000101010000000101000011001</code></td><td>Processamento interno</td><td>Difícil para humanos</td></tr><tr><td>Quatro octetos binários</td><td><code>11000000.10101000.00001010.00011001</code></td><td>Estudo, subnetting, análise</td><td>Ainda extenso</td></tr><tr><td>Decimal pontuado</td><td><code>192.168.10.25</code></td><td>Configuração e documentação</td><td>Esconde os bits</td></tr><tr><td>IP com prefixo CIDR</td><td><code>192.168.10.25/24</code></td><td>Rede, cloud e firewall</td><td>Exige entender máscara (prefixo de 0 a 32 bits)</td></tr></tbody></table></div>\n<p>Os pontos são só separadores para leitura humana: eles <strong>não</strong> dizem onde termina a rede e começa o host. Quem diz isso é a máscara ou o prefixo CIDR, assunto da próxima aula.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>Funcionamento interno</h2>\n<p>No pacote não existem pontos. No cabeçalho IPv4, os campos <strong>Source Address</strong> e <strong>Destination Address</strong> têm 32 bits cada. O sistema converte o decimal pontuado para bits sempre que precisa aplicar máscara, comparar rede e host ou calcular rotas:</p><ol class=\"flow-list\"><li>O host lê o endereço configurado em decimal pontuado, por exemplo <code>192.168.10.25</code> (falha típica: endereço inválido ou duplicado).</li><li>Cada octeto é validado: precisa haver exatamente quatro, todos entre <code>0</code> e <code>255</code>.</li><li>Cada octeto é convertido para 8 bits, e os quatro juntos formam o endereço de 32 bits.</li><li>A máscara/CIDR é aplicada sobre esses bits para separar a parte de rede da parte de host (falha típica: máscara incorreta coloca o host em outra rede).</li><li>A tabela de rotas usa o resultado bit a bit para decidir se o destino é local ou se vai para o gateway (falha típica: gateway fora da rede local ou rota ausente).</li></ol>\n<h3>Como converter um octeto</h3>\n<p>Cada um dos 8 bits tem um peso fixo, do mais significativo (esquerda) ao menos significativo (direita). O valor decimal é a soma dos pesos dos bits ligados.</p>\n<div class=\"responsive-table\"><table class=\"data-table\"><thead><tr><th>Peso</th><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th><th>Decimal</th></tr></thead><tbody><tr><td>Octeto 2</td><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td><td>0</td><td>0</td><td>0</td><td>128 + 32 + 8 = <code>168</code></td></tr><tr><td>Octeto 4</td><td>0</td><td>0</td><td>0</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td><td>16 + 8 + 1 = <code>25</code></td></tr><tr><td>Todos ligados</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>soma de todos = <code>255</code></td></tr></tbody></table></div>\n<ul><li><strong>Decimal → binário:</strong> percorra os pesos da esquerda para a direita. Se o peso cabe no que sobrou, escreva 1 e subtraia; se não cabe, escreva 0. Para 168: 128 cabe (sobra 40), 64 não, 32 cabe (sobra 8), 16 não, 8 cabe (sobra 0), o resto é 0 → <code>10101000</code>.</li><li><strong>Binário → decimal:</strong> some os pesos dos bits 1. <code>00011001</code> = 16 + 8 + 1 = <code>25</code>.</li><li><strong>Por que 255 é o máximo:</strong> com os 8 bits ligados, a soma é 255. O valor 256 já precisaria de um nono bit.</li></ul>\n<div class=\"callout warning\"><strong>Erros comuns:</strong><ul><li><strong>Remover os zeros à esquerda:</strong> 10 em binário é <code>1010</code>, mas como octeto é <code>00001010</code>. Cada octeto tem sempre 8 bits; sem os zeros, os cálculos de máscara e subnetting saem errados.</li><li><strong>Aceitar octeto acima de 255</strong> ou achar que todo número com pontos é IPv4 (parece número de versão de software): confirme quatro octetos, cada um entre 0 e 255, e só então valide máscara, rota e contexto.</li><li><strong>Achar que os três primeiros octetos são sempre a rede:</strong> isso só vale para <code>/24</code>, comum em casa. Com <code>/16</code>, <code>/20</code> ou <code>/27</code>, a divisão muda e pode cair no meio de um octeto.</li><li><strong>Ler os octetos como quatro números independentes:</strong> eles formam uma única sequência de 32 bits, e é sobre ela que o sistema aplica a máscara.</li></ul></div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>Analogia</h2>\n<p>Pense no IPv4 como um número de telefone dividido em blocos para facilitar a leitura. O sistema poderia tratar tudo como um número único, mas para pessoas é melhor separar em partes. Os pontos do IPv4 são esses separadores visuais: ajudam a ler, mas não mudam o fato de que o endereço é um valor binário.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> no telefone, os blocos costumam ter sentido fixo; no IPv4, o que é rede e o que é host depende da máscara ou do prefixo CIDR, não dos pontos.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>Exemplo simples</h2>\n<p>Em casa, seu notebook pode receber o IP <code>192.168.1.34</code>. O primeiro impulso é pensar que <code>192.168.1</code> é sempre a rede e <code>34</code> é sempre o host. Isso costuma ser verdade em redes domésticas com máscara <code>/24</code>, mas não é uma regra universal: com outra máscara, a divisão entre rede e host pode cair no meio de um octeto.</p><p>Por isso octetos são a ponte para CIDR e subnetting: os pontos ajudam a enxergar, mas os bits determinam o cálculo.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>Exemplo empresarial</h2>\n<p>Em uma empresa, é comum encontrar blocos como <code>10.10.20.0/24</code> para usuários, <code>10.10.30.0/24</code> para servidores e <code>10.10.40.0/24</code> para impressoras. A leitura dos octetos ajuda na documentação, mas a política correta depende do prefixo. Um erro em um octeto pode apontar para outra VLAN, outro site ou outro ambiente.</p><p>Ao analisar um log de firewall, você precisa reconhecer que <code>10.10.20.45</code> parece pertencer à rede de usuários, enquanto <code>10.10.200.45</code> é outro segmento completamente diferente. Essa leitura evita liberar regras erradas.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>Exemplo em cloud</h2>\n<p>Em cloud, o IPv4 aparece como blocos CIDR de VPC, VNet e subnet. Uma VPC <code>10.0.0.0/16</code> pode ser dividida em subnets como <code>10.0.1.0/24</code>, <code>10.0.2.0/24</code> e <code>10.0.10.0/24</code>. Quem não lê os bits costuma criar blocos sobrepostos, desperdiçar endereços ou escolher ranges que conflitam com VPN, filiais e on-premises. Renumerar depois pode exigir recriar subnets, rotas, gateways, endpoints e regras de segurança.</p><p>O mesmo vale para IaC: um octeto errado numa variável Terraform ou numa allowlist de pipeline pode liberar acesso para a rede errada ou bloquear o pipeline inteiro.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 500\" role=\"img\" aria-labelledby=\"m04l02-title m04l02-desc\">\n  <title id=\"m04l02-title\">Estrutura de um endereço IPv4 em quatro octetos</title>\n  <desc id=\"m04l02-desc\">O endereço IPv4 192.168.10.25 é mostrado como 32 bits divididos em quatro octetos de 8 bits, com representação decimal e binária.</desc>\n  <defs>\n    <marker id=\"m04l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n      <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n    </marker>\n  </defs>\n  <rect x=\"55\" y=\"50\" width=\"870\" height=\"76\" rx=\"16\" class=\"svg-zone\" />\n  <text x=\"490\" y=\"82\" text-anchor=\"middle\" class=\"svg-label\">IPv4 = 32 bits = 4 octetos de 8 bits</text>\n  <text x=\"490\" y=\"110\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Exemplo: 192.168.10.25</text>\n\n  <rect x=\"80\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"172\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 1</text>\n  <text x=\"172\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n  <text x=\"172\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">11000000</text>\n\n  <rect x=\"295\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"387\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 2</text>\n  <text x=\"387\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">168</text>\n  <text x=\"387\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10101000</text>\n\n  <rect x=\"510\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n  <text x=\"602\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 3</text>\n  <text x=\"602\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10</text>\n  <text x=\"602\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">00001010</text>\n\n  <rect x=\"725\" y=\"170\" width=\"185\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"817\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Octeto 4</text>\n  <text x=\"817\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">25</text>\n  <text x=\"817\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">00011001</text>\n\n  <line x1=\"172\" y1=\"300\" x2=\"172\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n  <line x1=\"387\" y1=\"300\" x2=\"387\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n  <line x1=\"602\" y1=\"300\" x2=\"602\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n  <line x1=\"817\" y1=\"300\" x2=\"817\" y2=\"350\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l02-arrow)\" />\n\n  <rect x=\"80\" y=\"360\" width=\"830\" height=\"82\" rx=\"16\" class=\"svg-boundary\" />\n  <text x=\"490\" y=\"392\" text-anchor=\"middle\" class=\"svg-label\">A máscara/CIDR decide quais bits representam a rede e quais representam o host</text>\n  <text x=\"490\" y=\"420\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O endereço sozinho identifica um valor de 32 bits; o sentido de rede/host vem da máscara.</text>\n</svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>Resumo</h2>\n<ul><li>IPv4 é um número de 32 bits escrito em quatro octetos decimais para facilitar a leitura humana.</li><li>Cada octeto tem 8 bits (pesos 128, 64, 32, 16, 8, 4, 2, 1) e vai de 0 a 255; em binário, sempre com 8 dígitos.</li><li>Endereço válido tem exatamente quatro octetos; <code>192.168.1.300</code> e <code>10.1.1</code> são inválidos.</li><li>Os pontos não definem rede e host: quem faz isso é a máscara/CIDR. IP sem máscara não basta para concluir qual é a rede local.</li><li>Ler octetos com atenção evita erros em firewall, cloud, logs e subnetting.</li></ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>Próximo tema</h2>\n<p>Na próxima aula, <strong>máscara de rede e CIDR</strong>: com os 32 bits em mente, você verá como a máscara separa a parte de rede da parte de host.</p>\n</section>\n"
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
      "Documentar IP sempre com máscara ou CIDR: IP sem máscara reduz o valor técnico da evidência.",
      "Validar ranges com IPAM ou inventário confiável antes de criar VPCs, VNets, VPNs e peerings.",
      "Correlacionar logs de IP com identidade, DHCP, NAT, proxy, VPN e horário.",
      "Aplicar menor privilégio em regras por CIDR: liberar a subnet necessária, não o bloco inteiro."
    ],
    "badPractices": [
      "Liberar ranges amplos como 10.0.0.0/8 sem justificativa.",
      "Criar allowlist por IP sem autenticação forte.",
      "Ignorar sobreposição de CIDR entre cloud e on-premises.",
      "Publicar logs com IPs internos sem sanitização."
    ],
    "commonErrors": [
      "Confundir endereço estruturalmente válido com endereço corretamente roteável.",
      "Confundir IP privado com segurança automática.",
      "Atribuir autoria só pelo IP: em log, ele pode representar host, NAT, proxy, VPN, balanceador, pod ou endereço temporário de DHCP.",
      "Ler octetos com pressa e confundir 10.1.2.3 com 10.1.20.3 numa investigação. Padronize a documentação e enriqueça os eventos no SIEM com a subnet de origem."
    ],
    "vulnerabilities": [
      {
        "name": "Allowlist ampla por CIDR",
        "description": "Regras que liberam blocos grandes podem permitir acesso lateral indevido.",
        "defensiveExplanation": "O risco aumenta quando o endereço é tratado como identidade e não como localização lógica de rede; NAT, proxy ou troca de IP permitem contornar a regra.",
        "mitigation": "Restringir CIDRs por subnet, combinar IP com identidade (IAM, mTLS, VPN), registrar acessos e revisar exceções."
      },
      {
        "name": "Sobreposição de endereços",
        "description": "Duas redes usando o mesmo range podem quebrar VPN, roteamento e logs.",
        "defensiveExplanation": "O tráfego pode seguir caminho inesperado ou exigir NAT complexo.",
        "mitigation": "Planejar IPAM, revisar CIDRs e validar antes de conectar ambientes."
      },
      {
        "name": "Octeto digitado errado em regra",
        "description": "Uma regra com 10.10.200.0/24 no lugar de 10.10.20.0/24 libera ou bloqueia o segmento errado.",
        "defensiveExplanation": "A regra parece correta numa leitura rápida e cria falsa sensação de proteção: o segmento planejado continua como estava e outro passa a ser afetado.",
        "mitigation": "Revisar regras por pares, comparar com o inventário de subnets e testar o fluxo esperado depois da mudança."
      }
    ],
    "monitoring": [
      "Mudanças em regras de firewall por CIDR e criação de subnets cloud com ranges amplos.",
      "Eventos DHCP e NAT correlacionados com identidade."
    ],
    "hardening": [
      "Padronizar blocos e nomes de subnets por ambiente e função; bloquear ranges não documentados.",
      "Associar IP a identidade e dispositivo quando possível."
    ],
    "detectionIdeas": [
      "Alertar quando regra liberar /8, /12 ou /16 sem aprovação.",
      "Comparar logs de firewall com o inventário de subnets para detectar tráfego entre segmentos não relacionados.",
      "Identificar origem NAT compartilhada em eventos sensíveis."
    ]
  },
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
    "estimatedTimeMinutes": 30,
    "cost": "zero",
    "safetyNotes": [
      "Execute apenas comandos de leitura; não altere a configuração de rede durante o laboratório.",
      "Não publique IPs, MACs, gateway ou topologia real sem sanitizar."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar o endereço IPv4 do host",
        "instruction": "Liste a configuração IPv4 do seu host no Windows ou no Linux.",
        "command": "Windows: ipconfig /all\nLinux: ip addr && ip route",
        "expectedOutput": "Windows: endereço IPv4, máscara de sub-rede e gateway padrão. Linux: endereço em formato como 192.168.10.25/24 e rota default.",
        "explanation": "Os dois comandos mostram o IPv4 em decimal pontuado junto da máscara. No Linux, o /24 é o prefixo CIDR, essencial para interpretar rede e host."
      },
      {
        "number": 2,
        "title": "Separar octetos",
        "instruction": "Escolha um IPv4 e separe seus quatro octetos.",
        "command": "Exemplo manual: 192.168.10.25 -> 192 | 168 | 10 | 25",
        "expectedOutput": "Quatro valores entre 0 e 255.",
        "explanation": "Cada valor representa 8 bits do endereço."
      },
      {
        "number": 3,
        "title": "Converter os octetos para binário",
        "instruction": "Converta à mão um dos octetos usando a tabela de pesos (128, 64, 32, 16, 8, 4, 2, 1). Depois converta os quatro com PowerShell ou com Python (multiplataforma) e confira.",
        "command": "PowerShell: '192.168.10.25'.Split('.') | ForEach-Object { [Convert]::ToString([int]$_,2).PadLeft(8,'0') }\nPython:\npython3 - <<'PY'\nip='192.168.10.25'\nprint('.'.join(f'{int(o):08b}' for o in ip.split('.')))\nPY",
        "expectedOutput": "PowerShell: 11000000, 10101000, 00001010 e 00011001, um por linha. Python: 11000000.10101000.00001010.00011001.",
        "explanation": "PadLeft(8,'0') e a formatação 08b garantem que cada octeto tenha exatamente 8 bits, com os zeros à esquerda."
      },
      {
        "number": 4,
        "title": "Validar endereços inválidos",
        "instruction": "Explique por que 192.168.1.300 é inválido. Para ver na prática, converta 300 para binário e conte os bits.",
        "command": "python3 -c \"print(f'{300:08b}')\"\nNo PowerShell: [Convert]::ToString(300,2)",
        "expectedOutput": "100101100 (9 bits): o octeto 300 excede 255 e não cabe em 8 bits.",
        "explanation": "Com 8 bits, o maior valor possível é 255. O formato 08b e o PadLeft só completam com zeros à esquerda; eles não cortam bits, então um valor acima de 255 aparece com mais de 8 dígitos."
      },
      {
        "number": 5,
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
      "Repetir a conversão com o IP do gateway e do DNS.",
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
      "question": "Um colega afirma que 192.168.1.34 e 192.168.1.200 estão sempre na mesma rede porque os três primeiros octetos são iguais. O que você responde?",
      "hints": [
        "O que define onde termina a rede: os pontos ou a máscara?",
        "Converta 34 e 200 para binário e compare o primeiro bit do quarto octeto."
      ],
      "expectedIdeas": [
        "depende da máscara/CIDR",
        "com /24 estão na mesma rede",
        "34 = 00100010 e 200 = 11001000",
        "se a máscara usar bits do quarto octeto, podem ficar em redes diferentes"
      ],
      "explanation": "Os pontos não definem a rede. Com /24, os três primeiros octetos são rede e os dois IPs ficam juntos. Mas 34 = 00100010 começa com 0 e 200 = 11001000 começa com 1: se a máscara incluir esse bit (caso do /25, próxima aula), eles caem em redes diferentes."
    },
    {
      "type": "cenário real",
      "question": "Por que uma regra permitindo 10.0.0.0/8 pode ser perigosa?",
      "hints": [
        "Quantos bits ficam fixos em /8 e quantos ficam livres?",
        "Pense em menor privilégio."
      ],
      "expectedIdeas": [
        "/8 fixa só o primeiro octeto",
        "24 bits livres, cerca de 16,7 milhões de endereços",
        "acesso lateral",
        "segmentação e revisão de firewall"
      ],
      "explanation": "Em /8, só o primeiro octeto (10) é fixo; os outros 24 bits ficam livres, o que dá 2^24 = 16.777.216 endereços. Sem justificativa, a regra libera muito além do necessário e facilita movimento lateral."
    }
  ],
  "quiz": [
    {
      "id": "q4.2.1",
      "question": "Quantos bits possui um endereço IPv4?",
      "options": [
        "8 bits",
        "32 bits",
        "64 bits",
        "128 bits"
      ],
      "answer": 1,
      "explanation": "IPv4 possui 32 bits, divididos em quatro octetos de 8 bits.",
      "topic": "estrutura",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q4.2.2",
      "question": "Qual é o maior valor decimal possível em um octeto IPv4?",
      "options": [
        "999",
        "256",
        "255",
        "128"
      ],
      "answer": 2,
      "explanation": "Um octeto tem 8 bits, permitindo valores de 0 a 255.",
      "topic": "octeto",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q4.2.3",
      "question": "Qual endereço abaixo é inválido?",
      "options": [
        "192.168.1.300",
        "10.0.0.1",
        "172.16.5.10",
        "8.8.8.8"
      ],
      "answer": 0,
      "explanation": "300 excede o limite de um octeto IPv4.",
      "topic": "validação",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q4.2.4",
      "question": "O que os pontos em um IPv4 fazem?",
      "options": [
        "Substituem a máscara",
        "Criptografam o endereço",
        "Definem sempre rede e host",
        "Separam visualmente quatro octetos"
      ],
      "answer": 3,
      "explanation": "Os pontos separam os octetos para legibilidade; a máscara define rede e host.",
      "topic": "decimal pontuado",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q4.2.5",
      "question": "Por que um IP de origem em um log não deve ser tratado como identidade absoluta?",
      "options": [
        "Porque o endereço de origem vai criptografado no cabeçalho IPv4",
        "Porque o mesmo IP pode representar NAT, proxy, VPN ou um endereço reatribuído por DHCP",
        "Porque logs de firewall registram apenas o IP de destino",
        "Porque endereços privados não podem aparecer em logs"
      ],
      "answer": 1,
      "explanation": "Um IP pode passar por várias camadas de tradução e reatribuição; para atribuir autoria, correlacione com horário, DHCP, NAT, VPN, proxy e autenticação.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q4.2.7",
      "question": "Qual é a representação binária de 8 bits do octeto 168?",
      "options": [
        "1010100",
        "10100100",
        "10101000",
        "00010101"
      ],
      "answer": 2,
      "explanation": "168 = 128 + 32 + 8, então ficam ligados os bits de peso 128, 32 e 8: 10101000. 1010100 tem só 7 bits (vale 84) e 10100100 vale 164.",
      "topic": "conversão",
      "difficulty": "iniciante",
      "type": "prático"
    }
  ],
  "flashcards": [
    {
      "id": "fc4.2.7",
      "front": "Quais são os pesos dos 8 bits de um octeto, da esquerda para a direita?",
      "back": "128, 64, 32, 16, 8, 4, 2 e 1. Somados, dão 255, o maior valor de um octeto.",
      "tags": [
        "binário"
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
      "id": "fc4.2.8",
      "front": "Por que 10.1.1 não é um IPv4 válido?",
      "back": "Tem só três octetos. Um IPv4 precisa de exatamente quatro octetos (32 bits).",
      "tags": [
        "ipv4",
        "validação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.2.4",
      "front": "O que define onde termina a rede e começa o host num IPv4?",
      "back": "A máscara ou o prefixo CIDR, que marca quantos bits iniciais são de rede. Os pontos só separam os octetos para leitura.",
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
      "front": "Num log, o que um IP de origem pode representar além de um host?",
      "back": "NAT, proxy, VPN, balanceador, pod ou endereço temporário de DHCP. Por isso deve ser correlacionado com autenticação e horário.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex4.2.5",
      "type": "prático",
      "prompt": "Converta para decimal o endereço 11000000.10101000.00011110.00000001.",
      "expectedAnswer": "192.168.30.1.",
      "explanation": "Some os pesos dos bits 1 em cada octeto: 128 + 64 = 192; 128 + 32 + 8 = 168; 16 + 8 + 4 + 2 = 30; 1 = 1."
    },
    {
      "id": "ex4.2.2",
      "type": "prático",
      "prompt": "Converta o octeto 10 para binário de 8 bits.",
      "expectedAnswer": "00001010.",
      "explanation": "10 em binário é 1010, mas como octeto precisa ser preenchido com zeros à esquerda."
    },
    {
      "id": "ex4.2.6",
      "type": "diagnóstico",
      "prompt": "A documentação diz que a rede de usuários é 10.10.20.0/24. Um log de firewall mostra acesso vindo de 10.10.200.45. Esse acesso vem da rede de usuários?",
      "expectedAnswer": "Não. Em /24, os três primeiros octetos são a rede (10.10.20). O terceiro octeto do log é 200, não 20, então 10.10.200.45 está fora de 10.10.20.0/24 e pertence a outro segmento.",
      "explanation": "Comparar octeto por octeto evita ler 200 como 20; esse erro levaria a liberar ou investigar o segmento errado."
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
      },
      {
        "answer": "Em 10.20.30.40, a rede é 10.20.30 e o host é 40.",
        "whyItIsWrong": "Sem máscara ou prefixo não dá para separar rede e host; os pontos não definem essa divisão."
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
