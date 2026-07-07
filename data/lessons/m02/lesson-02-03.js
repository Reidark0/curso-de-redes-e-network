export const lesson0203 = {
  "id": "2.3",
  "moduleId": "m02",
  "order": 3,
  "title": "Camada 1 — Física: bits no fio, luz e rádio",
  "subtitle": "A camada onde a comunicação deixa de ser abstração e vira sinal elétrico, pulso de luz ou onda de rádio.",
  "duration": "80-115 min",
  "estimatedStudyTimeMinutes": 115,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "modelo osi",
    "camada física",
    "cobre",
    "fibra",
    "rádio",
    "wi-fi",
    "sinal",
    "ruído",
    "troubleshooting",
    "segurança física"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.1",
      "reason": "A aula 2.1 apresentou o Modelo OSI como ferramenta de diagnóstico por camadas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.2",
      "reason": "A aula 2.2 explicou que, no fim do encapsulamento, quadros precisam virar bits e sinais físicos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.5",
      "reason": "A aula 1.5 apresentou cobre, fibra e rádio como meios de transmissão."
    }
  ],
  "objectives": [
    "Explicar o papel da Camada 1 no Modelo OSI.",
    "Diferenciar bits abstratos de sinais físicos reais.",
    "Relacionar cobre, fibra e rádio com distância, interferência, ruído, atenuação e velocidade.",
    "Identificar sintomas típicos de falhas de camada física.",
    "Coletar evidências básicas de link, velocidade negociada, erros e qualidade do sinal.",
    "Conectar camada física com segurança, disponibilidade, cloud híbrida e operação corporativa."
  ],
  "learningOutcomes": [
    "Dado um sintoma como link intermitente, o aluno consegue levantar hipóteses de camada física antes de culpar aplicação.",
    "Dado um ambiente com cabo, fibra e Wi-Fi, o aluno consegue explicar vantagens e limitações de cada meio.",
    "Dado um output de interface, o aluno reconhece velocidade, estado de link, erros e possível duplex mismatch.",
    "Dado um cenário de escritório ou rack, o aluno identifica riscos físicos e controles básicos.",
    "Dado um problema em cloud híbrida, o aluno diferencia rede virtual de dependências físicas subjacentes."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Em muitas investigações de rede, a equipe começa olhando DNS, firewall, aplicação, certificado, proxy ou rota. Mas às vezes o problema está em algo muito mais básico: um cabo ruim, uma porta negociando em velocidade errada, fibra com atenuação alta, rádio sofrendo interferência, conector danificado, patch panel mal identificado ou energia PoE insuficiente.</p>\n  <p>A Camada 1 do Modelo OSI é a camada física. Ela não entende HTTP, DNS, IP, TCP, usuário, token, certificado ou autorização. A responsabilidade dela é transmitir bits como sinais reais. Esses sinais podem ser variações elétricas em cobre, pulsos de luz em fibra ou ondas eletromagnéticas no ar. Sem Camada 1 funcionando, todas as camadas acima ficam sem base.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário reclama que a VPN cai, o sistema web trava e o Teams fica picotando. O firewall não mostra bloqueio, o DNS resolve e a rota existe. Depois de horas, alguém percebe que a porta do switch acumulava erros CRC e o cabo estava danificado. A falha era física, mas parecia aplicação.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>A comunicação digital sempre precisou transformar informação em algum fenômeno físico mensurável. Nos primeiros sistemas de comunicação, sinais elétricos, pulsos e padrões temporais eram usados para representar estados. Com redes de computadores, essa ideia evoluiu para padrões de cabeamento, conectores, frequências, modulação, codificação de linha, fibra óptica, rádio, antenas e equipamentos capazes de transmitir e receber sinais em alta velocidade.</p>\n  <p>Ethernet nasceu com meios compartilhados e depois evoluiu para switches, par trançado, fibra e velocidades maiores. Wi-Fi evoluiu para suportar mais canais, mais antenas, mais modulação e mais eficiência. Datacenters passaram a depender de fibra, transceptores e cabeamento de alta densidade. Mesmo em cloud, onde o aluno vê apenas VPC, subnet e security group, existe infraestrutura física no provedor: cabos, óptica, switches, roteadores, racks, energia, refrigeração e enlaces entre zonas.</p>\n  <p>A Camada 1 não é “assunto antigo”. Ela continua aparecendo em quedas intermitentes, erros de interface, baixa qualidade de Wi-Fi, perda de pacotes, indisponibilidade de links WAN, problemas de PoE, cabeamento mal certificado e falhas físicas que derrubam serviços críticos.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema que a Camada 1 resolve é simples de dizer e difícil de executar bem: como transportar bits por um meio físico de forma confiável o suficiente para que as camadas superiores consigam trabalhar?</p>\n  <ul class=\"flow-list\">\n    <li><strong>Bits são abstrações:</strong> 0 e 1 precisam virar sinais mensuráveis.</li>\n    <li><strong>Meios físicos têm limites:</strong> cabo tem distância, fibra tem atenuação, rádio sofre interferência.</li>\n    <li><strong>Ambientes reais são imperfeitos:</strong> conectores oxidam, cabos dobram, racks aquecem, canais Wi-Fi congestionam.</li>\n    <li><strong>Alta velocidade exige precisão:</strong> quanto maior a taxa, menor a tolerância a ruído, erro e instalação ruim.</li>\n    <li><strong>Falhas físicas enganam:</strong> sintomas podem parecer DNS, firewall, VPN, aplicação ou cloud.</li>\n  </ul>\n  <p>Sem entender Camada 1, o profissional pode gastar tempo ajustando políticas, rotas e servidores quando o problema está em link, energia, porta, rádio ou meio.</p>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A transmissão física evoluiu de meios simples e compartilhados para infraestruturas especializadas, redundantes e monitoradas.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Meios compartilhados antigos</td><td>Vários hosts competiam pelo mesmo meio físico.</td><td>Colisões, baixa escala e troubleshooting difícil.</td><td>Switches, enlaces dedicados e full duplex.</td></tr>\n      <tr><td>Par metálico</td><td>Sinais elétricos em cabos de cobre trançados.</td><td>Distância limitada e sensibilidade a interferência.</td><td>Categorias melhores, certificação e instalação estruturada.</td></tr>\n      <tr><td>Fibra óptica</td><td>Pulsos de luz transportam dados por longas distâncias.</td><td>Custo, transceptores, curvatura e limpeza de conectores.</td><td>Backbones, datacenters e enlaces de alta capacidade.</td></tr>\n      <tr><td>Rádio/Wi-Fi</td><td>Ondas eletromagnéticas permitem mobilidade.</td><td>Interferência, compartilhamento do ar e segurança sem fio.</td><td>Planejamento RF, WPA3, múltiplas antenas e Wi-Fi moderno.</td></tr>\n      <tr><td>Cloud e datacenter moderno</td><td>O cliente consome rede virtual abstraída.</td><td>Parte física fica invisível ao cliente.</td><td>Observabilidade, SLAs, arquitetura multi-AZ e redundância.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>A Camada 1, ou camada física, define como bits são transmitidos por um meio. Ela trata de sinal, meio, conector, frequência, potência, temporização, codificação física, modulação, velocidade nominal, distância, qualidade e sincronização.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> no Modelo OSI, a Camada 1 é responsável pela transmissão e recepção de bits brutos através de um meio físico, como cabo de cobre, fibra óptica ou rádio.</div>\n  <p>Ela não decide se um pacote deve ir para a internet. Não aprende MAC. Não resolve DNS. Não valida certificado. Não autentica usuário. Ela apenas cria a condição básica para que quadros, pacotes, segmentos e dados possam existir nas camadas superiores.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Quando uma placa de rede transmite, ela recebe bits da camada de enlace e precisa representá-los fisicamente. O processo exato depende do meio, mas o raciocínio geral é o mesmo.</p>\n  <ol class=\"flow-list\">\n    <li>A camada de enlace entrega bits que representam um quadro.</li>\n    <li>A interface física aplica codificação e temporização adequadas ao padrão usado.</li>\n    <li>No cobre, o equipamento gera variações elétricas controladas.</li>\n    <li>Na fibra, um transceptor converte sinais elétricos em pulsos de luz.</li>\n    <li>No rádio, o transmissor modula ondas eletromagnéticas em um canal.</li>\n    <li>O receptor mede o sinal, tenta distinguir ruído de informação e reconstrói bits.</li>\n    <li>Se a qualidade for ruim, surgem erros, retransmissões, perda, baixa taxa ou queda de link.</li>\n  </ol>\n  <p>Termos como autonegociação, duplex, taxa negociada, potência óptica, SNR, RSSI, interferência, CRC error e link flap pertencem à vida prática da camada física.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura real, a Camada 1 aparece em vários pontos: cabo do usuário até a tomada, patch cord até o patch panel, porta do switch, uplink de fibra, rádio do access point, antenas, transceptores, cabeamento de datacenter, enlaces WAN e energia PoE.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> NIC física ou virtual, velocidade e link.</li>\n    <li><strong>Acesso:</strong> cabo, tomada, patch panel, switch de acesso ou AP.</li>\n    <li><strong>Distribuição/core:</strong> uplinks, fibra, transceptores e redundância.</li>\n    <li><strong>WAN/cloud:</strong> links de operadora, cross-connects, Direct Connect, ExpressRoute ou VPN sobre internet.</li>\n    <li><strong>Segurança:</strong> portas físicas, racks, salas técnicas, APs e pontos expostos.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense na Camada 1 como a estrada, os trilhos ou o encanamento por onde algo precisa passar. Você pode ter uma carga bem endereçada, documentação correta e destino conhecido, mas se a ponte caiu, o trilho está quebrado ou o cano está obstruído, a entrega falha.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> sinais físicos não são objetos viajando intactos como caminhões. Em redes, o receptor reconstrói bits a partir de padrões de sinal sujeitos a ruído, temporização, modulação e limites elétricos, ópticos ou de rádio.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Seu notebook está conectado por cabo ao roteador, mas a internet fica instável. Você troca DNS, reinicia navegador e culpa o provedor. Depois percebe que o conector RJ-45 está frouxo e o link alterna entre conectado e desconectado. O problema era Camada 1.</p>\n  <p>Outro exemplo: no Wi-Fi, você está longe do roteador, com paredes entre os dispositivos. O sinal chega fraco, a taxa cai e há retransmissões. O site parece lento, mas o problema real começa no rádio.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, uma estação de trabalho negocia a 100 Mbps em vez de 1 Gbps. O usuário reclama que acessar arquivos no servidor demora. O switch mostra muitos erros CRC na porta. A causa pode ser cabo ruim, tomada danificada, crimpagem incorreta, patch cord defeituoso ou interferência. O diagnóstico correto começa na porta física e nas evidências do switch.</p>\n  <p>Em datacenter, uma fibra mal encaixada ou transceptor incompatível pode derrubar um uplink. Em Wi-Fi corporativo, canal mal planejado pode afetar dezenas de usuários, chamadas de vídeo, autenticação 802.1X e acesso a sistemas internos.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na cloud pública, o cliente normalmente não vê a Camada 1. Ele cria VPC, VNet, subnet, NIC virtual e security group. Porém, a rede física existe no datacenter do provedor. Quando você usa conexão dedicada, como ExpressRoute, Direct Connect ou Interconnect, a camada física volta a aparecer em cross-connects, óptica, operadora, redundância e SLA.</p>\n  <p>Mesmo sem acesso físico, decisões de arquitetura cloud dependem da realidade física: zonas de disponibilidade, regiões, latência entre localidades, redundância de links, falhas de energia e caminhos de rede. O profissional não precisa operar o cabo do provedor, mas precisa saber que abstração não elimina dependência física.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a camada física aparece de forma indireta. Um runner self-hosted conectado por Wi-Fi instável pode falhar durante builds. Um registry interno pode parecer lento por causa de um link saturado. Um cluster Kubernetes on-premises pode sofrer com uplinks sem redundância. Pipelines que dependem de rede híbrida precisam considerar disponibilidade física, latência e gargalos.</p>\n  <p>Infrastructure as Code não substitui a validação física. Terraform pode criar uma VNet perfeita, mas uma VPN site-to-site sobre um link ruim continuará instável. Automação precisa ser acompanhada de observabilidade e inventário real.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>A Camada 1 tem impactos de segurança diretos. Uma porta de rede ativa em área pública pode permitir conexão não autorizada. Um rack destrancado permite desconectar cabos, inserir dispositivos, capturar tráfego ou causar indisponibilidade. Um AP não autorizado cria um caminho fora do controle. Um enlace sem redundância vira ponto único de falha.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Porta física exposta</td><td>Tomada ativa em recepção ou sala pública.</td><td>Acesso não autorizado à rede.</td><td>Desativar portas sem uso, 802.1X, NAC, segmentação e logs.</td></tr>\n      <tr><td>Rogue AP</td><td>Dispositivo Wi-Fi não autorizado conectado à LAN.</td><td>Bypass de controles e exposição de tráfego.</td><td>Inventário, varredura RF, controle de portas e política de rede.</td></tr>\n      <tr><td>Rack aberto</td><td>Patch panel e switches acessíveis sem controle.</td><td>Sabotagem, mudança indevida ou indisponibilidade.</td><td>Controle físico, câmera, registro de acesso e etiquetagem.</td></tr>\n      <tr><td>Link único</td><td>Sem redundância de uplink ou operadora.</td><td>Indisponibilidade de serviços críticos.</td><td>Redundância, monitoramento, failover e teste periódico.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m02l03-title m02l03-desc\">\n    <title id=\"m02l03-title\">Camada 1: bits virando sinais físicos</title>\n    <desc id=\"m02l03-desc\">Diagrama mostrando bits saindo de um host e sendo transmitidos por cobre, fibra e rádio até equipamentos de rede.</desc>\n    <defs>\n      <marker id=\"m02l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"150\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"110\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bits 0/1</text>\n    <rect x=\"250\" y=\"60\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"325\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <text x=\"325\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sinal elétrico</text>\n    <rect x=\"250\" y=\"175\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"325\" y=\"203\" text-anchor=\"middle\" class=\"svg-label\">Fibra</text>\n    <text x=\"325\" y=\"227\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pulsos de luz</text>\n    <rect x=\"250\" y=\"290\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"325\" y=\"318\" text-anchor=\"middle\" class=\"svg-label\">Rádio</text>\n    <text x=\"325\" y=\"342\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">onda no ar</text>\n    <rect x=\"520\" y=\"150\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"595\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Equipamento</text>\n    <text x=\"595\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">reconstrói bits</text>\n    <rect x=\"760\" y=\"150\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"835\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n    <text x=\"835\" y=\"202\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">link, erros, SNR</text>\n    <line x1=\"180\" y1=\"185\" x2=\"250\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"180\" y1=\"185\" x2=\"250\" y2=\"210\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"180\" y1=\"185\" x2=\"250\" y2=\"325\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"400\" y1=\"95\" x2=\"520\" y2=\"185\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"400\" y1=\"210\" x2=\"520\" y2=\"185\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"400\" y1=\"325\" x2=\"520\" y2=\"185\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <line x1=\"670\" y1=\"185\" x2=\"760\" y2=\"185\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m02l03-arrow)\" />\n    <text x=\"480\" y=\"35\" text-anchor=\"middle\" class=\"svg-label\">Camada 1 não interpreta aplicação: ela transporta sinais</text>\n    <text x=\"480\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ruído, atenuação, interferência, distância e energia afetam todas as camadas acima.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula cria um inventário de evidências de Camada 1 sem executar ações invasivas: estado da interface, velocidade negociada, meio usado, sinal Wi-Fi quando aplicável e erros visíveis no equipamento.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a habilidade de diferenciar sintoma físico, sintoma de enlace e sintoma de camada superior.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário de escritório com quedas intermitentes e deverá montar um plano de investigação de Camada 1 com evidências, hipóteses e mitigação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada prioriza evidências simples antes de conclusões complexas: link, cabo, porta, velocidade, erros, Wi-Fi e energia.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a Camada 1 transforma bits em sinais físicos e sinais físicos em bits.</li>\n    <li><strong>O que lembrar:</strong> cobre, fibra e rádio têm limites diferentes de distância, interferência, custo e segurança.</li>\n    <li><strong>Erro comum:</strong> culpar DNS, firewall ou aplicação antes de verificar link, velocidade e erros físicos.</li>\n    <li><strong>Uso real:</strong> troubleshooting de cabo, fibra, Wi-Fi, PoE, portas de switch e links WAN.</li>\n    <li><strong>Segurança:</strong> portas expostas, racks abertos e APs não autorizados são riscos físicos e lógicos.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará a Camada 2 — Enlace: frames, MAC, switch, VLAN e ARP. Depois de entender como os bits atravessam o meio físico, veremos como a rede local organiza esses bits em quadros e entrega tráfego dentro da LAN.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet PHY",
      "IEEE 802.3",
      "IEEE 802.11",
      "Auto-negociação",
      "PoE"
    ],
    "dependsOn": [
      "bits e sinais",
      "meios de transmissão",
      "topologia física",
      "métricas de rede",
      "diagnóstico inicial"
    ],
    "enables": [
      "Camada 2",
      "Ethernet",
      "Wi-Fi",
      "switching",
      "VLAN",
      "ARP",
      "troubleshooting físico"
    ]
  },
  "deepDive": {
    "mentalModel": "Camada 1 é a fundação física: se o meio não consegue transportar sinais com qualidade suficiente, todas as camadas acima herdam instabilidade.",
    "keyTerms": [
      "sinal",
      "ruído",
      "atenuação",
      "SNR",
      "RSSI",
      "CRC",
      "duplex",
      "autonegociação",
      "transceptor",
      "PoE"
    ],
    "limitations": [
      "A Camada 1 não explica sozinha problemas de IP, DNS, TCP ou aplicação.",
      "Nem todo erro físico é visível no host; muitas evidências aparecem no switch, AP ou controlador.",
      "Em cloud pública, o cliente não tem visibilidade direta da infraestrutura física do provedor.",
      "Ferramentas de software podem mostrar sintomas, mas nem sempre certificam cabo, fibra ou rádio."
    ],
    "whenToUse": [
      "Ao investigar link intermitente, baixa velocidade negociada ou erros de interface.",
      "Ao planejar cabeamento, Wi-Fi, backbone, rack e redundância.",
      "Ao validar causa física antes de escalar para aplicação, DNS ou firewall.",
      "Ao montar documentação física e inventário de portas."
    ],
    "whenNotToUse": [
      "Como explicação final quando as evidências indicam DNS, rota, firewall ou aplicação.",
      "Para justificar alterações físicas sem validação e janela de mudança.",
      "Para realizar testes invasivos em ambiente corporativo sem autorização."
    ],
    "operationalImpact": [
      "Exige documentação de portas, cabos, racks e uplinks.",
      "Exige monitoramento de link, erros, potência óptica, qualidade Wi-Fi e disponibilidade.",
      "Melhora troubleshooting ao separar falha física de falha lógica.",
      "Aumenta a importância de padrões de instalação e etiquetagem."
    ],
    "financialImpact": [
      "Cabo, fibra, transceptores, certificação, racks e APs possuem custo direto.",
      "Instalação ruim gera custo indireto com incidentes e retrabalho.",
      "Links redundantes e conexões dedicadas aumentam custo, mas reduzem indisponibilidade.",
      "Em cloud híbrida, links dedicados e cross-connects têm custo recorrente."
    ],
    "securityImpact": [
      "Acesso físico indevido pode contornar controles lógicos.",
      "Portas ativas sem controle aumentam superfície de ataque.",
      "Racks e salas técnicas precisam de controle de acesso.",
      "Wi-Fi exige planejamento RF e segurança sem fio adequada."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Ignorar a Camada 1 porque 'o cabo está plugado'.",
      "whyItHappens": "Link aceso dá falsa sensação de normalidade.",
      "consequence": "Erros CRC, baixa velocidade ou instabilidade continuam sem diagnóstico.",
      "correction": "Verificar estado, velocidade, duplex, erros, cabo, porta e histórico de flaps."
    },
    {
      "mistake": "Confundir sinal Wi-Fi forte com rede boa.",
      "whyItHappens": "Barras de sinal parecem representar qualidade total.",
      "consequence": "Jitter, interferência e canal congestionado são ignorados.",
      "correction": "Avaliar RSSI, SNR, canal, retransmissões, quantidade de clientes e interferência."
    },
    {
      "mistake": "Trocar switch ou firewall antes de testar patch cord.",
      "whyItHappens": "Equipamento grande parece causa mais provável.",
      "consequence": "Aumenta custo e tempo de indisponibilidade.",
      "correction": "Começar por evidências simples e reversíveis: cabo, porta, patch panel e velocidade."
    },
    {
      "mistake": "Achar que cloud elimina camada física.",
      "whyItHappens": "O provedor abstrai datacenter, cabo e backbone.",
      "consequence": "Arquitetura ignora região, zona, link dedicado e redundância.",
      "correction": "Tratar cloud como abstração operacional, não como ausência de infraestrutura física."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Link cai e volta",
      "Velocidade negociada abaixo do esperado",
      "Erros CRC na porta",
      "Wi-Fi com jitter alto",
      "PoE falha em câmera ou AP",
      "Upload oscila sem bloqueio aparente"
    ],
    "diagnosticQuestions": [
      "A interface está up ou down?",
      "A velocidade negociada é a esperada?",
      "Há erros, drops, CRC ou flaps?",
      "O problema ocorre em cabo, fibra ou Wi-Fi?",
      "Trocar cabo/porta altera o sintoma?",
      "Existe evento físico recente: mudança de rack, obra, crimpagem, patch ou energia?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed",
        "purpose": "Ver estado e velocidade negociada das interfaces.",
        "expectedObservation": "Interface principal em Up com velocidade coerente.",
        "interpretation": "Velocidade menor que o esperado pode indicar cabo, porta, driver ou autonegociação."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver informações de Wi-Fi, sinal, rádio e SSID.",
        "expectedObservation": "Sinal e rádio coerentes com o ambiente.",
        "interpretation": "Sinal fraco ou instável aponta para problema físico/RF."
      },
      {
        "platform": "Linux",
        "command": "ip link show && ethtool eth0",
        "purpose": "Ver estado de link, velocidade, duplex e autonegociação.",
        "expectedObservation": "Link detected: yes, speed e duplex esperados.",
        "interpretation": "Erros indicam possível cabo, porta, driver ou incompatibilidade."
      },
      {
        "platform": "Linux",
        "command": "iw dev wlan0 link",
        "purpose": "Ver estado do link Wi-Fi e qualidade básica.",
        "expectedObservation": "SSID, signal e tx bitrate coerentes.",
        "interpretation": "Sinal ruim ou bitrate baixo apontam para distância, interferência ou canal."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status",
        "purpose": "Ver estado, VLAN, duplex e speed das portas.",
        "expectedObservation": "Portas conectadas com speed e duplex esperados.",
        "interpretation": "Porta down, half-duplex ou velocidade menor exige investigação física."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces counters errors",
        "purpose": "Ver erros de interface.",
        "expectedObservation": "Baixo número de CRC, input errors e output errors.",
        "interpretation": "Erros crescentes sugerem cabo, conector, transceptor, interferência ou porta."
      }
    ],
    "decisionTree": [
      {
        "if": "Interface está down",
        "then": "Verificar cabo, porta, energia, transceptor, patch panel e se a porta está administrativamente habilitada."
      },
      {
        "if": "Interface está up mas com velocidade baixa",
        "then": "Verificar categoria do cabo, autonegociação, porta, patch cord e driver."
      },
      {
        "if": "Há CRC errors",
        "then": "Suspeitar de meio físico, conector, interferência, transceptor ou porta defeituosa."
      },
      {
        "if": "Wi-Fi tem bom IP mas alta perda",
        "then": "Verificar sinal, SNR, canal, interferência, distância e quantidade de clientes."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter racks e salas técnicas trancados.",
      "Desativar portas físicas não utilizadas.",
      "Usar 802.1X/NAC quando aplicável.",
      "Documentar patch panels e pontos de rede.",
      "Monitorar flaps, erros de interface e APs não autorizados.",
      "Planejar redundância para links críticos."
    ],
    "badPractices": [
      "Deixar tomadas públicas ativas sem controle.",
      "Permitir acesso físico a switches e patch panels.",
      "Conectar APs domésticos na rede corporativa.",
      "Não etiquetar cabos e portas.",
      "Ignorar logs físicos e de switch durante incidentes."
    ],
    "commonErrors": [
      "Confundir disponibilidade física com autorização lógica.",
      "Achar que firewall compensa rack aberto.",
      "Tratar Wi-Fi apenas como comodidade e não como perímetro sem fio.",
      "Compartilhar fotos de rack com dados sensíveis sem sanitização."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso físico não autorizado",
        "description": "Portas, racks e equipamentos acessíveis podem permitir conexão, alteração ou interrupção da rede.",
        "defensiveExplanation": "O risco não depende de exploração sofisticada; acesso físico pode comprometer disponibilidade e controle.",
        "mitigation": "Controle físico, câmeras, portas desativadas, NAC, 802.1X, inventário e monitoramento."
      },
      {
        "name": "AP não autorizado",
        "description": "Um access point conectado sem controle pode abrir uma ponte sem fio para a rede interna.",
        "defensiveExplanation": "O foco defensivo é detectar e remover dispositivos não autorizados, não explorar clientes.",
        "mitigation": "Varredura RF, controle de portas, segmentação, política de Wi-Fi e alertas."
      }
    ],
    "monitoring": [
      "Interface up/down",
      "link flapping",
      "CRC errors",
      "PoE status",
      "RSSI/SNR",
      "APs desconhecidos",
      "mudanças de porta",
      "eventos de switch"
    ],
    "hardening": [
      "Port security",
      "802.1X",
      "desativar portas ociosas",
      "controle físico",
      "etiquetagem",
      "redundância",
      "configuração segura de APs"
    ],
    "detectionIdeas": [
      "Alertar flaps repetidos.",
      "Correlacionar nova porta ativa com inventário.",
      "Detectar MAC desconhecido em porta pública.",
      "Monitorar APs e SSIDs não autorizados.",
      "Investigar aumento de erros de interface."
    ]
  },
  "lab": {
    "id": "lab-2.3",
    "title": "Coletando evidências seguras de Camada 1",
    "labType": "security",
    "objective": "Identificar o meio de conexão, estado de link, velocidade negociada e evidências físicas/RF sem executar testes invasivos.",
    "scenario": "Você fará um inventário básico da sua conexão atual, separando o que é evidência de Camada 1 do que pertence às camadas superiores.",
    "topology": "Host do aluno -> cabo ou Wi-Fi -> switch/AP/roteador -> rede local.",
    "architecture": "Ambiente local simples com pelo menos uma interface de rede ativa. Opcionalmente, um switch gerenciável ou roteador/AP para consulta visual.",
    "prerequisites": [
      "Ter concluído as aulas 1.5, 1.6, 1.7 e 2.2.",
      "Ter acesso ao terminal do próprio computador.",
      "Não alterar configurações corporativas sem autorização."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "Opcional: interface administrativa do roteador doméstico",
      "Opcional: switch Cisco em laboratório"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não desconecte cabos de ambiente corporativo sem autorização.",
      "Não entre em racks ou salas técnicas sem permissão.",
      "Não compartilhe fotos de etiquetas, racks, SSIDs internos ou endereços sem sanitizar.",
      "Execute apenas comandos de leitura."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar o meio usado",
        "instruction": "Determine se sua conexão principal usa cabo, Wi-Fi ou outro meio.",
        "command": "Windows: Get-NetAdapter | Format-Table Name, Status, LinkSpeed\nLinux: ip link show",
        "expectedOutput": "Lista de interfaces com estado e, no Windows, velocidade do link.",
        "explanation": "Antes de diagnosticar, você precisa saber qual meio físico sustenta sua conexão."
      },
      {
        "number": 2,
        "title": "Verificar velocidade e estado",
        "instruction": "Observe se a interface está ativa e se a velocidade negociada parece coerente.",
        "command": "Windows: Get-NetAdapter | Select-Object Name,Status,LinkSpeed\nLinux: ethtool eth0",
        "expectedOutput": "Interface Up/ativo, LinkSpeed ou Speed esperado.",
        "explanation": "Velocidade abaixo do esperado pode indicar cabo, porta, driver ou autonegociação."
      },
      {
        "number": 3,
        "title": "Coletar evidência Wi-Fi, se aplicável",
        "instruction": "Se estiver no Wi-Fi, veja sinal, rádio e taxa de transmissão.",
        "command": "Windows: netsh wlan show interfaces\nLinux: iw dev wlan0 link",
        "expectedOutput": "SSID, sinal, rádio/canal ou bitrate.",
        "explanation": "Wi-Fi é Camada 1 e 2 ao mesmo tempo; sinal fraco afeta as camadas superiores."
      },
      {
        "number": 4,
        "title": "Separar evidência física de evidência lógica",
        "instruction": "Monte uma tabela com coluna Evidência, Camada provável e Interpretação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela com pelo menos cinco evidências.",
        "explanation": "O objetivo é treinar raciocínio: nem tudo que aparece em diagnóstico é camada física."
      },
      {
        "number": 5,
        "title": "Registrar limites da investigação",
        "instruction": "Anote o que você não consegue verificar sem acesso ao switch, rack ou AP.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista de limitações, como ausência de counters de switch ou potência óptica.",
        "explanation": "Um relatório técnico honesto separa fato, hipótese e limitação."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um pequeno relatório de Camada 1 com meio usado, estado de link, velocidade/sinal, hipóteses físicas e limitações.",
    "validation": [
      {
        "check": "Interface principal identificada",
        "command": "Get-NetAdapter ou ip link show",
        "expected": "Interface ativa identificada corretamente.",
        "ifFails": "Verifique se está usando o terminal correto e se há permissão para listar interfaces."
      },
      {
        "check": "Velocidade ou sinal registrado",
        "command": "Get-NetAdapter, ethtool ou netsh wlan show interfaces",
        "expected": "Valor de LinkSpeed, Speed, signal ou bitrate anotado.",
        "ifFails": "Use o comando alternativo da sua plataforma ou registre limitação."
      },
      {
        "check": "Relatório separa camada física de lógica",
        "command": "Revisão manual",
        "expected": "Evidências físicas não misturadas com DNS, rota ou aplicação.",
        "ifFails": "Revise aulas 0.8, 1.8 e 2.1."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Comando ethtool não existe",
        "probableCause": "Pacote não instalado ou interface diferente.",
        "howToConfirm": "Execute which ethtool e ip link show.",
        "fix": "Instale ethtool em laboratório próprio ou use ip link e registre a limitação."
      },
      {
        "symptom": "Interface Wi-Fi não aparece",
        "probableCause": "Nome da interface é diferente ou driver abstrai informação.",
        "howToConfirm": "Liste interfaces com ip link ou Get-NetAdapter.",
        "fix": "Use a interface correta ou registre limitação."
      },
      {
        "symptom": "Velocidade parece muito alta ou virtual",
        "probableCause": "Interface virtual, VPN, WSL, Hyper-V ou Docker.",
        "howToConfirm": "Verifique nome da interface e descrição.",
        "fix": "Diferencie interface física de virtual no relatório."
      }
    ],
    "improvements": [
      "Adicionar counters de switch se estiver em laboratório Cisco.",
      "Comparar cabo e Wi-Fi no mesmo ambiente.",
      "Registrar fotos sanitizadas de topologia física doméstica.",
      "Criar alerta para link flap em ambiente de laboratório."
    ],
    "evidenceToCollect": [
      "Nome da interface",
      "Meio usado",
      "Estado de link",
      "Velocidade negociada ou sinal Wi-Fi",
      "Limitações",
      "Hipóteses físicas",
      "Prints sanitizados"
    ],
    "questions": [
      "Qual evidência é claramente de Camada 1?",
      "Qual evidência pertence à Camada 2 ou 3?",
      "O que você não consegue saber sem acesso ao switch/AP?",
      "Que risco de segurança física existe no seu cenário?"
    ],
    "challenge": "Monte um plano para investigar uma estação que alterna entre 1 Gbps e 100 Mbps, sem trocar equipamentos caros imediatamente.",
    "solution": "Comece coletando estado e velocidade, verifique cabo e patch cord, teste outra porta conhecida, observe counters de erro, valide patch panel/tomada, registre se há flaps, só depois escale para driver, NIC ou switch. Documente evidências antes de trocar hardware."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma falha física pode parecer falha de aplicação?",
      "hints": [
        "Pense nas camadas superiores herdando instabilidade.",
        "Pense em retransmissões e quedas intermitentes."
      ],
      "expectedIdeas": [
        "camadas dependem da física",
        "perda",
        "jitter",
        "retransmissão",
        "link instável"
      ],
      "explanation": "Quando o meio físico falha, TCP, DNS, HTTP e aplicações manifestam sintomas, mas não são necessariamente a causa raiz."
    },
    {
      "type": "diagnóstico",
      "question": "Uma porta negocia a 100 Mbps, mas deveria negociar a 1 Gbps. O que você verificaria primeiro?",
      "hints": [
        "Comece pelo simples.",
        "Pense em cabo, porta e autonegociação."
      ],
      "expectedIdeas": [
        "cabo",
        "patch cord",
        "porta",
        "categoria",
        "autonegociação",
        "erros"
      ],
      "explanation": "Antes de trocar switch ou servidor, valide meio físico e evidências de interface."
    },
    {
      "type": "cenário real",
      "question": "Como você reduziria risco de acesso físico indevido em uma rede de escritório?",
      "hints": [
        "Pense em portas, racks e autenticação.",
        "Pense em controle físico e lógico."
      ],
      "expectedIdeas": [
        "desativar portas",
        "rack trancado",
        "802.1X",
        "NAC",
        "inventário",
        "monitoramento"
      ],
      "explanation": "Segurança de rede começa também pelo controle do ponto físico de conexão."
    }
  ],
  "quiz": [
    {
      "id": "q2.3.1",
      "type": "conceito",
      "q": "Qual é a principal responsabilidade da Camada 1 do Modelo OSI?",
      "opts": [
        "Transmitir bits como sinais físicos",
        "Resolver nomes DNS",
        "Escolher rotas IP",
        "Criptografar aplicações"
      ],
      "a": 0,
      "exp": "A Camada 1 trata da transmissão física de bits por cobre, fibra ou rádio.",
      "difficulty": "iniciante",
      "topic": "camada física"
    },
    {
      "id": "q2.3.2",
      "type": "comparação",
      "q": "Qual opção representa um problema típico de Camada 1?",
      "opts": [
        "Erro CRC em porta de switch",
        "Senha inválida no SSO",
        "Registro DNS ausente",
        "HTTP 403"
      ],
      "a": 0,
      "exp": "CRC errors normalmente indicam problema físico ou de enlace baixo, como cabo, interferência, porta ou transceptor.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q2.3.3",
      "type": "cenário",
      "q": "Um notebook no Wi-Fi recebe IP, mas chamadas ficam picotando e o sinal é fraco. Qual hipótese deve entrar cedo no diagnóstico?",
      "opts": [
        "Problema de RF/camada física",
        "Falha obrigatória de DNS",
        "Erro de certificado TLS",
        "Bloqueio de HTTP 403"
      ],
      "a": 0,
      "exp": "Sinal fraco e chamadas picotando indicam possível problema de rádio, interferência, distância ou qualidade de sinal.",
      "difficulty": "iniciante-intermediário",
      "topic": "wi-fi"
    },
    {
      "id": "q2.3.4",
      "type": "segurança",
      "q": "Qual prática reduz risco de acesso não autorizado por porta física?",
      "opts": [
        "Desativar portas sem uso e usar 802.1X/NAC",
        "Abrir todas as portas para facilitar suporte",
        "Usar Base64 nos nomes das máquinas",
        "Trocar DNS público"
      ],
      "a": 0,
      "exp": "Portas sem uso devem ser controladas; 802.1X/NAC ajuda a impedir acesso indevido.",
      "difficulty": "intermediário",
      "topic": "segurança física"
    },
    {
      "id": "q2.3.5",
      "type": "cloud",
      "q": "Em cloud pública, por que ainda faz sentido entender Camada 1?",
      "opts": [
        "Porque a abstração virtual depende de infraestrutura física e links reais",
        "Porque clientes sempre acessam os racks do provedor",
        "Porque DNS só funciona com fibra",
        "Porque Camada 1 substitui IAM"
      ],
      "a": 0,
      "exp": "O cliente não opera a camada física do provedor, mas regiões, zonas, latência e links dedicados dependem de infraestrutura real.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q2.3.6",
      "type": "diagnóstico",
      "q": "Qual evidência é mais útil para investigar cabo ou porta com defeito em switch Cisco?",
      "opts": [
        "show interfaces counters errors",
        "show users",
        "show clock",
        "show version apenas"
      ],
      "a": 0,
      "exp": "Counters de erro ajudam a identificar CRC, input/output errors e outros sinais de problema físico ou de enlace baixo.",
      "difficulty": "intermediário",
      "topic": "cisco"
    }
  ],
  "flashcards": [
    {
      "id": "fc2.3.1",
      "front": "O que a Camada 1 transmite?",
      "back": "Bits representados como sinais físicos em cobre, fibra ou rádio.",
      "tags": [
        "osi",
        "camada física"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.3.2",
      "front": "O que é atenuação?",
      "back": "Perda de intensidade do sinal ao longo do meio de transmissão.",
      "tags": [
        "sinal",
        "fibra",
        "cobre"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.3.3",
      "front": "O que erros CRC podem indicar?",
      "back": "Problemas físicos ou de enlace, como cabo ruim, porta defeituosa, interferência ou transceptor com problema.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.3.4",
      "front": "Por que Wi-Fi sofre mais variação que cabo?",
      "back": "Porque usa rádio em meio compartilhado, sujeito a distância, obstáculos, interferência e concorrência de canais.",
      "tags": [
        "wi-fi",
        "rf"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc2.3.5",
      "front": "Camada 1 autentica usuários?",
      "back": "Não. Autenticação pertence a camadas superiores e sistemas de identidade, embora controles como 802.1X envolvam acesso ao meio.",
      "tags": [
        "segurança",
        "iam"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc2.3.6",
      "front": "Cloud elimina camada física?",
      "back": "Não. Cloud abstrai a camada física para o cliente, mas continua dependendo de datacenters, energia, cabos, óptica e backbone.",
      "tags": [
        "cloud"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex2.3.1",
      "type": "conceitual",
      "prompt": "Explique em suas palavras por que um cabo ruim pode causar sintomas em HTTP ou VPN.",
      "expectedAnswer": "Porque as camadas superiores dependem da transmissão física. Erros, perda ou instabilidade no meio geram retransmissões, queda de sessão, jitter e falhas percebidas na aplicação.",
      "explanation": "A causa raiz pode estar abaixo, mesmo que o sintoma apareça acima."
    },
    {
      "id": "ex2.3.2",
      "type": "diagnóstico",
      "prompt": "Liste cinco evidências que você coletaria para suspeitar de problema físico em uma porta de switch.",
      "expectedAnswer": "Estado da porta, velocidade/duplex, CRC errors, input/output errors, histórico de flaps, cabo/patch cord, transceptor e mudança recente.",
      "explanation": "Evidências físicas devem vir antes de troca de equipamentos caros."
    },
    {
      "id": "ex2.3.3",
      "type": "segurança",
      "prompt": "Cite três controles para reduzir risco de porta física exposta.",
      "expectedAnswer": "Desativar portas sem uso, usar 802.1X/NAC, controlar acesso físico, monitorar novos MACs e segmentar rede.",
      "explanation": "Controle físico e lógico se complementam."
    },
    {
      "id": "ex2.3.4",
      "type": "arquitetura",
      "prompt": "Em uma filial crítica, quando faria sentido pagar por dois links físicos?",
      "expectedAnswer": "Quando a indisponibilidade tem impacto relevante; links redundantes reduzem ponto único de falha, especialmente com operadoras ou caminhos distintos.",
      "explanation": "Redundância física tem custo, mas melhora disponibilidade."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de queda intermitente no escritório",
    "scenario": "Uma equipe reclama que o sistema interno cai várias vezes ao dia. O firewall não mostra bloqueio e o DNS resolve normalmente. Alguns usuários estão por cabo e outros por Wi-Fi. Há relatos de mudança recente no rack.",
    "tasks": [
      "Montar hipóteses de Camada 1.",
      "Definir evidências a coletar no host, switch e AP.",
      "Separar o que pode ser feito sem impacto do que exige janela de mudança.",
      "Propor mitigação de curto prazo e correção definitiva."
    ],
    "constraints": [
      "Não desconectar cabos sem autorização.",
      "Não alterar configuração de produção durante expediente.",
      "Sanitizar evidências antes de compartilhar.",
      "Priorizar evidências antes de trocar equipamentos."
    ],
    "expectedDeliverables": [
      "Tabela de hipóteses",
      "Lista de comandos de leitura",
      "Plano de coleta",
      "Plano de mitigação",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Hipóteses físicas",
        "points": 25,
        "description": "Inclui cabo, porta, patch panel, transceptor, Wi-Fi, PoE e link flap."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Define comandos e observações por host, switch e AP."
      },
      {
        "criterion": "Segurança e mudança",
        "points": 20,
        "description": "Respeita autorização, janela e sanitização."
      },
      {
        "criterion": "Mitigação",
        "points": 20,
        "description": "Propõe ações de curto e longo prazo."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Diferencia fato, hipótese e limitação."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O cenário tem sintomas de aplicação, mas DNS e firewall não indicam causa imediata. A mudança recente no rack aumenta a probabilidade de cabo, patch panel, porta, transceptor ou uplink. Usuários Wi-Fi e cabeados exigem separar domínio físico de cada grupo.",
    "steps": [
      "Identificar quais usuários são afetados e por qual meio se conectam.",
      "Coletar estado de link, velocidade e eventos no host.",
      "No switch, verificar flaps, CRC errors, input/output errors e velocidade/duplex.",
      "No AP/controlador, verificar sinal, canal, retransmissões e clientes afetados.",
      "Relacionar horário dos sintomas com mudanças no rack e logs.",
      "Executar mitigação reversível, como trocar patch cord em janela autorizada ou mover usuário para porta testada.",
      "Documentar causa provável, evidências e correção definitiva."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Reiniciar o servidor de aplicação imediatamente.",
        "whyItIsWrong": "Não há evidência inicial de falha de aplicação; isso pode gerar indisponibilidade sem atacar a causa."
      },
      {
        "answer": "Comprar um firewall novo.",
        "whyItIsWrong": "O firewall não mostra bloqueio e a hipótese física ainda não foi descartada."
      },
      {
        "answer": "Desconectar cabos no rack para testar rapidamente.",
        "whyItIsWrong": "Pode causar impacto e viola controle de mudança."
      }
    ],
    "finalAnswer": "A abordagem correta é coletar evidências de Camada 1 e enlace baixo, correlacionar com a mudança recente no rack, separar usuários cabeados e Wi-Fi, executar testes reversíveis autorizados e só então escalar para camadas superiores."
  },
  "glossary": [
    {
      "term": "Camada física",
      "shortDefinition": "Camada 1 do OSI, responsável por transmitir bits como sinais físicos.",
      "longDefinition": "Inclui meio, sinal, conector, frequência, modulação, potência, velocidade, temporização e recepção de bits.",
      "example": "Cabo Ethernet, fibra óptica e rádio Wi-Fi são exemplos de meios da camada física.",
      "relatedTerms": [
        "sinal",
        "ruído",
        "atenuação"
      ],
      "relatedLessons": [
        "0.5",
        "1.5",
        "2.3"
      ]
    },
    {
      "term": "Atenuação",
      "shortDefinition": "Redução da intensidade do sinal ao longo do caminho.",
      "longDefinition": "Pode ocorrer em cobre, fibra ou rádio e afetar a capacidade do receptor de reconstruir os bits corretamente.",
      "example": "Fibra dobrada demais pode aumentar atenuação.",
      "relatedTerms": [
        "sinal",
        "fibra",
        "ruído"
      ],
      "relatedLessons": [
        "1.5",
        "2.3"
      ]
    },
    {
      "term": "SNR",
      "shortDefinition": "Relação sinal-ruído.",
      "longDefinition": "Mede quanto o sinal útil se destaca do ruído; quanto melhor a relação, maior a chance de transmissão confiável.",
      "example": "Wi-Fi com SNR ruim pode ter baixa taxa e muitas retransmissões.",
      "relatedTerms": [
        "RSSI",
        "ruído",
        "Wi-Fi"
      ],
      "relatedLessons": [
        "1.5",
        "2.3",
        "12.1"
      ]
    },
    {
      "term": "CRC error",
      "shortDefinition": "Erro detectado por verificação de integridade em quadros.",
      "longDefinition": "Pode indicar problema de cabo, porta, transceptor, interferência ou falha física/enlace baixo.",
      "example": "Uma porta Cisco com CRC crescente sugere investigar cabo e transceptor.",
      "relatedTerms": [
        "FCS",
        "Ethernet",
        "troubleshooting"
      ],
      "relatedLessons": [
        "2.3",
        "2.4",
        "3.1"
      ]
    },
    {
      "term": "Autonegociação",
      "shortDefinition": "Processo em que interfaces ajustam velocidade e duplex.",
      "longDefinition": "Permite que dois lados de um enlace definam parâmetros compatíveis, mas falhas podem gerar velocidade menor ou duplex incorreto.",
      "example": "Uma porta esperada em 1 Gbps negocia a 100 Mbps por cabo inadequado.",
      "relatedTerms": [
        "duplex",
        "velocidade",
        "link"
      ],
      "relatedLessons": [
        "1.6",
        "2.3"
      ]
    },
    {
      "term": "Transceptor",
      "shortDefinition": "Componente que transmite e recebe sinais, especialmente em fibra.",
      "longDefinition": "Módulos como SFP/SFP+ convertem sinais elétricos do equipamento em sinais ópticos e vice-versa.",
      "example": "Um SFP incompatível pode impedir o uplink de subir.",
      "relatedTerms": [
        "fibra",
        "SFP",
        "uplink"
      ],
      "relatedLessons": [
        "1.5",
        "2.3"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para Ethernet e camada física/enlace."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "",
      "note": "Referência conceitual para redes sem fio."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 1.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Meios de transmissão: cobre, fibra e rádio."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 2.2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Encapsulamento, desencapsulamento e PDUs."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "lesson": "SRE e SLIs",
      "reason": "Métricas físicas e disponibilidade sustentam SLIs e troubleshooting operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso Corporativo",
      "lesson": "Controle de acesso à rede",
      "reason": "Controles como 802.1X/NAC conectam camada física, rede e identidade."
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
      "2.4"
    ]
  }
};
