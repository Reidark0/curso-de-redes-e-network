export const lesson0404 = {
  "id": "4.4",
  "moduleId": "m04",
  "order": 4,
  "title": "Endereço de rede, hosts e broadcast",
  "subtitle": "Como descobrir o primeiro endereço do bloco, o intervalo de hosts utilizáveis e o broadcast IPv4.",
  "duration": "90-125 min",
  "estimatedStudyTimeMinutes": 125,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 220,
  "tags": [
    "redes",
    "ipv4",
    "endereço de rede",
    "broadcast",
    "hosts",
    "cidr",
    "subnetting",
    "dhcp",
    "gateway",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "A aula 4.1 explicou por que IPv4 existe e como ele atua na Camada 3."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.2",
      "reason": "A aula 4.2 explicou octetos e representação de 32 bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.3",
      "reason": "A aula 4.3 explicou máscara e CIDR, base para calcular rede, hosts e broadcast."
    }
  ],
  "objectives": [
    "Explicar o que é endereço de rede em IPv4.",
    "Identificar o intervalo de hosts utilizáveis em blocos comuns.",
    "Explicar o que é broadcast IPv4 e por que ele não deve ser usado como host.",
    "Relacionar rede, hosts e broadcast com DHCP, gateway, firewall e cloud.",
    "Preparar o raciocínio para subnetting manual."
  ],
  "learningOutcomes": [
    "Dado um bloco /24, o aluno identifica rede, hosts e broadcast.",
    "Dado um bloco /26 simples, o aluno reconhece tamanho do bloco e extremos.",
    "Dado um erro de configuração, o aluno identifica uso indevido de rede ou broadcast.",
    "Dado um cenário cloud, o aluno lembra que provedores podem reservar endereços adicionais."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n\n<p>Depois que você entende que um IPv4 possui 32 bits e que a máscara/CIDR separa bits de rede e bits de host, surge a pergunta mais prática do endereçamento: dentro de um bloco como <code>192.168.10.0/24</code>, quais endereços posso realmente colocar em computadores, servidores, impressoras, firewalls, access points e gateways?</p>\n<p>Essa pergunta aparece em qualquer trabalho real de TI. Um erro simples, como usar o endereço de rede em um servidor ou configurar o broadcast como gateway, pode gerar falhas estranhas: host que não responde, ARP inconsistente, logs confusos, DHCP entregando endereço inválido, firewall liberando bloco errado ou cloud recusando a criação de uma subnet.</p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um analista recebe o bloco <code>192.168.20.0/24</code> para uma VLAN de usuários. Ele configura o gateway como <code>192.168.20.255</code> porque “é o último endereço do bloco”. A rede fica instável e vários hosts não conseguem sair da VLAN. O problema não é cabo, DNS ou firewall: o endereço escolhido é o broadcast do bloco.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n\n<p>Nos primeiros projetos de redes IPv4, era comum pensar em blocos inteiros como “redes” fixas, especialmente por causa das classes A, B e C. Com o crescimento das LANs, filiais e datacenters, ficou evidente que não bastava saber o endereço de um host: era necessário saber quais endereços identificavam a rede, quais poderiam ser atribuídos a hosts e qual endereço representava todos os hosts daquele segmento.</p>\n<p>O conceito de endereço de rede e broadcast surgiu como parte do funcionamento lógico do IPv4 em redes locais. O endereço de rede identifica o bloco. O broadcast permite enviar uma mensagem para todos os hosts daquele bloco. Os endereços entre esses extremos, quando não reservados por outras funções, são os candidatos a hosts utilizáveis.</p>\n<p>Hoje, mesmo com cloud, virtualização e automação, esse raciocínio continua presente. AWS, Azure, Google Cloud, firewalls, roteadores, DHCP, VPNs, SD-WAN, Kubernetes e ferramentas de IPAM ainda dependem de blocos, redes, hosts e endereços reservados.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n\n<p>O problema técnico é que nem todo endereço dentro de um bloco IPv4 pode ser usado livremente por um host. Alguns endereços possuem significado especial para a rede. Se você ignora isso, pode criar conflitos, falhas de comunicação, configurações inválidas e interpretações erradas em logs.</p>\n<ul class=\"flow-list\"><li><strong>Endereço de rede:</strong> identifica o bloco inteiro, não um host individual.</li><li><strong>Endereços de host:</strong> podem ser atribuídos a dispositivos, interfaces ou serviços.</li><li><strong>Broadcast:</strong> representa todos os hosts do bloco em IPv4 tradicional.</li><li><strong>Gateway:</strong> normalmente usa um endereço de host dentro do bloco, mas não é automaticamente o primeiro ou o último por obrigação universal.</li><li><strong>Cloud:</strong> provedores podem reservar endereços adicionais dentro da subnet, além de rede e broadcast.</li></ul>\n<p>Sem essa distinção, o aluno pode decorar que “/24 tem 254 hosts” sem entender o motivo, e isso quebra quando aparecerem /30, /29, /26, /23, subnets cloud e casos especiais.</p>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n\n<p>O raciocínio evoluiu de redes grandes e pouco segmentadas para blocos menores, planejados por função, risco e crescimento. O mesmo conceito que antes era usado em uma LAN simples agora aparece em subnets de cloud, VLANs corporativas, redes de storage, VPN site-to-site, NAT, containers e políticas de firewall.</p>\n<table class=\"data-table comparison-table\"><thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Evolução</th></tr></thead><tbody><tr><td>Rede plana</td><td>Muitos hosts no mesmo bloco</td><td>Broadcast alto, baixo controle e maior movimento lateral</td><td>Segmentação por VLAN/subnet</td></tr><tr><td>Classes antigas</td><td>Blocos rígidos A/B/C</td><td>Desperdício e pouca flexibilidade</td><td>CIDR e subnetting</td></tr><tr><td>Planejamento manual</td><td>Planilhas sem validação</td><td>Conflitos e sobreposição</td><td>IPAM e IaC</td></tr><tr><td>Cloud networking</td><td>Subnets virtuais com reservas do provedor</td><td>Endereços utilizáveis menores que o cálculo clássico</td><td>Planejamento com documentação oficial e automação</td></tr></tbody></table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n\n<p>Em um bloco IPv4, o <strong>endereço de rede</strong> é o primeiro endereço do bloco e identifica a própria rede. O <strong>endereço de broadcast</strong> é o último endereço do bloco e representa todos os hosts daquele segmento IPv4. Os <strong>endereços de host utilizáveis</strong> ficam entre o endereço de rede e o broadcast.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> em <code>192.168.10.0/24</code>, o endereço de rede é <code>192.168.10.0</code>, o broadcast é <code>192.168.10.255</code> e os hosts utilizáveis, no cálculo clássico, vão de <code>192.168.10.1</code> a <code>192.168.10.254</code>.</div>\n<p>A quantidade clássica de hosts utilizáveis em uma rede IPv4 comum é calculada por <code>2^bits_de_host - 2</code>. Subtraímos 2 porque o primeiro endereço representa a rede e o último representa o broadcast. Mais adiante, em subnetting, esse raciocínio será aplicado em blocos menores.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n\n<p>Para encontrar rede, hosts e broadcast, o host ou o analista precisa olhar para os bits. O CIDR indica quantos bits são fixos para a rede. Os bits restantes são bits de host. Quando todos os bits de host estão em zero, temos o endereço de rede. Quando todos os bits de host estão em um, temos o broadcast.</p>\n<ol class=\"flow-list\"><li>Identifique o IPv4 e o prefixo, por exemplo <code>192.168.10.25/24</code>.</li><li>Separe 24 bits para rede e 8 bits para host.</li><li>Coloque todos os bits de host em <code>0</code> para obter o endereço de rede: <code>192.168.10.0</code>.</li><li>Coloque todos os bits de host em <code>1</code> para obter o broadcast: <code>192.168.10.255</code>.</li><li>Os endereços entre eles são candidatos a hosts utilizáveis.</li><li>Escolha um endereço de host para o gateway, por exemplo <code>192.168.10.1</code>, documentando a convenção.</li></ol>\n<p>Esse mesmo mecanismo vale para blocos menores. Em <code>192.168.10.64/26</code>, os 6 bits finais são de host, o bloco tem 64 endereços, a rede é <code>192.168.10.64</code> e o broadcast é <code>192.168.10.127</code>.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n\n<p>Endereço de rede, hosts e broadcast aparecem em qualquer arquitetura IPv4. Em uma empresa, cada VLAN costuma ter um bloco, um gateway e uma faixa de hosts. Em cloud, cada subnet também tem um bloco, mas o provedor pode reservar endereços para funções internas. Em DevSecOps, pipelines e IaC precisam criar subnets sem sobreposição. Em segurança, regras de firewall, ACLs e allowlists usam CIDRs para definir escopo de acesso.</p>\n<ul><li><strong>Camada envolvida:</strong> Camada 3, com dependência de Camada 2 para entrega local.</li><li><strong>Componentes envolvidos:</strong> hosts, gateway, DHCP, roteador, firewall, switch, VLAN, subnet cloud e IPAM.</li><li><strong>Dependências:</strong> IPv4, máscara/CIDR, ARP, gateway e tabela de rotas.</li><li><strong>Pontos de falha:</strong> uso do endereço de rede, uso do broadcast, DHCP mal configurado, gateway fora do bloco e CIDR sobreposto.</li></ul>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n\n<p>Pense em um condomínio. O nome do condomínio identifica o conjunto inteiro; os apartamentos identificam unidades individuais; e um aviso no alto-falante representa uma comunicação para todos. No IPv4, o endereço de rede identifica o conjunto, os endereços de host identificam dispositivos individuais e o broadcast é a comunicação para todos os hosts daquele bloco.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, essa divisão não depende de nomes humanos ou números bonitos. Ela depende da máscara/CIDR aplicada aos bits do endereço.</div>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n\n<p>Em uma rede doméstica comum, o roteador pode usar <code>192.168.1.1/24</code>. Nesse caso, a rede é <code>192.168.1.0</code>, o broadcast é <code>192.168.1.255</code> e os hosts utilizáveis vão de <code>192.168.1.1</code> a <code>192.168.1.254</code>.</p>\n<p>Seu celular pode receber <code>192.168.1.34</code>, seu notebook <code>192.168.1.50</code> e sua impressora <code>192.168.1.80</code>. Nenhum deles deve usar <code>192.168.1.0</code> ou <code>192.168.1.255</code> como endereço de host.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n\n<p>Em uma empresa, uma VLAN de usuários pode usar <code>10.20.30.0/24</code>. O gateway pode ser <code>10.20.30.1</code>, o DHCP pode entregar de <code>10.20.30.50</code> a <code>10.20.30.200</code>, impressoras podem ficar em reservas específicas e os endereços finais podem ser mantidos para infraestrutura.</p>\n<p>Essa organização evita conflitos, facilita troubleshooting e permite que o time de segurança escreva regras de firewall como “usuários da VLAN 30 podem acessar apenas proxy, DNS, DHCP e sistemas autorizados”. Sem documentação, o bloco vira uma caixa-preta.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n\n<p>Em cloud, uma subnet como <code>10.0.1.0/24</code> não necessariamente terá todos os 254 endereços clássicos disponíveis para instâncias. Provedores reservam endereços para gateway virtual, DNS, serviços internos ou funções da própria rede virtual.</p>\n<p>Isso tem impacto financeiro e operacional. Criar subnets pequenas demais pode bloquear crescimento. Criar blocos amplos demais pode desperdiçar espaço e dificultar peering, VPN e integração híbrida. Por isso, redes cloud devem ser planejadas antes da automação em Terraform, Bicep, CloudFormation ou Pulumi.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n\n<p>Em DevSecOps, endereçamento aparece em IaC, ambientes efêmeros, runners, clusters Kubernetes, redes de containers, service meshes, registries internos e políticas de egress. Um CIDR sobreposto entre cluster, VPC e rede on-premises pode quebrar deploys e integrações.</p>\n<p>Pipeline maduro deve validar blocos antes de criar infraestrutura. Uma revisão de pull request de rede não deve olhar apenas se o código “passa”; deve verificar se o bloco não sobrepõe outro ambiente, se há espaço para crescimento, se o gateway é coerente e se as políticas de acesso usam CIDRs mínimos.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n\n<p>Em segurança, blocos IPv4 definem escopo de exposição. Uma regra permitindo <code>10.0.0.0/8</code> pode parecer interna, mas pode liberar milhões de endereços privados. Uma allowlist com <code>0.0.0.0/0</code> significa qualquer origem IPv4. Um erro de rede/broadcast pode também gerar ruído em logs e dificultar investigação.</p>\n<table class=\"data-table risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>CIDR amplo</td><td>Firewall libera bloco grande demais</td><td>Aumento da superfície de acesso</td><td>Menor privilégio e revisão por pares</td></tr><tr><td>IP de broadcast usado</td><td>Gateway ou host configurado no último endereço</td><td>Falha de comunicação e comportamento inconsistente</td><td>Validação de IPAM/DHCP</td></tr><tr><td>Sobreposição</td><td>VPN ou peering com mesmo bloco</td><td>Roteamento ambíguo</td><td>Planejamento e inventário global</td></tr><tr><td>Evidência exposta</td><td>Prints mostram IPs, gateways e subnets</td><td>Vazamento de topologia</td><td>Sanitização antes de compartilhar</td></tr></tbody></table>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2>\n\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 540\" role=\"img\" aria-labelledby=\"m04l04-title m04l04-desc\">\n  <title id=\"m04l04-title\">Rede, hosts e broadcast em um bloco IPv4</title>\n  <desc id=\"m04l04-desc\">Diagrama mostrando o endereço de rede 192.168.10.0/24, hosts utilizáveis, gateway e broadcast 192.168.10.255.</desc>\n  <defs><marker id=\"m04l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n  <rect x=\"40\" y=\"35\" width=\"900\" height=\"95\" rx=\"18\" class=\"svg-zone\" />\n  <text x=\"490\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Bloco IPv4: 192.168.10.0/24</text>\n  <text x=\"490\" y=\"105\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rede = primeiro endereço | Hosts = intervalo utilizável | Broadcast = último endereço</text>\n  <rect x=\"65\" y=\"180\" width=\"180\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"155\" y=\"215\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n  <text x=\"155\" y=\"245\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.0</text>\n  <rect x=\"285\" y=\"170\" width=\"180\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"375\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n  <text x=\"375\" y=\"237\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.1</text>\n  <text x=\"375\" y=\"262\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Host utilizável</text>\n  <rect x=\"505\" y=\"170\" width=\"180\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"595\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Hosts</text>\n  <text x=\"595\" y=\"237\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">.2 até .254</text>\n  <text x=\"595\" y=\"262\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dispositivos e serviços</text>\n  <rect x=\"725\" y=\"180\" width=\"180\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--security\" />\n  <text x=\"815\" y=\"215\" text-anchor=\"middle\" class=\"svg-label\">Broadcast</text>\n  <text x=\"815\" y=\"245\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.255</text>\n  <line x1=\"245\" y1=\"228\" x2=\"285\" y2=\"228\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l04-arrow)\" />\n  <line x1=\"465\" y1=\"228\" x2=\"505\" y2=\"228\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l04-arrow)\" />\n  <line x1=\"685\" y1=\"228\" x2=\"725\" y2=\"228\" class=\"svg-flow animated-flow\" marker-end=\"url(#m04l04-arrow)\" />\n  <rect x=\"120\" y=\"350\" width=\"740\" height=\"115\" rx=\"16\" class=\"svg-zone\" />\n  <text x=\"490\" y=\"385\" text-anchor=\"middle\" class=\"svg-label\">Regra mental</text>\n  <text x=\"490\" y=\"420\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bits de host todos 0 = rede | Bits de host intermediários = hosts | Bits de host todos 1 = broadcast</text>\n  <text x=\"490\" y=\"448\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Em cloud, alguns endereços de host também podem ser reservados pelo provedor.</text>\n</svg>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n\n<p>O laboratório desta aula treina a identificação de endereço de rede, hosts utilizáveis e broadcast a partir de IP/CIDR. Você também irá comparar o cálculo clássico com ressalvas de cloud, onde o provedor pode reservar endereços adicionais.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n\n<p>Os exercícios reforçam cálculo de rede, broadcast, hosts utilizáveis e identificação de erros comuns de configuração.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n\n<p>Você irá revisar uma pequena tabela de endereçamento de uma empresa e apontar quais endereços são válidos, inválidos, arriscados ou mal documentados.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n\n<p>A solução comentada mostra como interpretar cada bloco com base no CIDR, identificar rede/broadcast e justificar escolhas mais seguras para gateway, DHCP e reservas.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n\n<ul><li>O endereço de rede identifica o bloco IPv4.</li><li>O broadcast é o último endereço do bloco em IPv4 tradicional.</li><li>Hosts utilizáveis ficam entre rede e broadcast.</li><li>A fórmula clássica é <code>2^bits_de_host - 2</code>.</li><li>Cloud pode reservar endereços adicionais dentro da subnet.</li><li>Erros nessa base afetam gateway, DHCP, firewall, VPN e troubleshooting.</li></ul>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n\n<p>Na próxima aula, estudaremos <strong>gateway padrão e rota local</strong>. Depois de saber qual é a rede e quais hosts pertencem ao bloco, o próximo passo é entender como um host decide enviar tráfego para fora da sua rede local.</p>\n\n</section>"
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
      "DHCP",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "bits",
      "octetos",
      "máscara",
      "CIDR",
      "ARP",
      "gateway"
    ],
    "enables": [
      "gateway padrão",
      "DHCP",
      "subnetting",
      "roteamento",
      "ACL",
      "firewall",
      "cloud networking"
    ]
  },
  "deepDive": {
    "mentalModel": "Um bloco IPv4 é uma sequência de endereços delimitada por bits: todos os bits de host em zero dão a rede; todos em um dão o broadcast; o intervalo entre eles contém hosts utilizáveis.",
    "keyTerms": [
      "endereço de rede",
      "host utilizável",
      "broadcast",
      "bits de host",
      "bloco IPv4",
      "faixa DHCP"
    ],
    "limitations": [
      "O cálculo clássico não considera reservas extras de provedores cloud.",
      "Broadcast IPv4 não atravessa roteadores normalmente.",
      "Saber o intervalo não substitui documentação, IPAM e controle de acesso."
    ],
    "whenToUse": [
      "Ao configurar subnets e VLANs.",
      "Ao definir escopos DHCP.",
      "Ao revisar regras de firewall por CIDR.",
      "Ao criar redes em cloud.",
      "Ao diagnosticar IP inválido ou gateway mal escolhido."
    ],
    "whenNotToUse": [
      "Não use broadcast como host.",
      "Não use o endereço de rede como interface comum.",
      "Não use bloco amplo apenas por conveniência operacional."
    ],
    "operationalImpact": [
      "Planejamento correto reduz conflitos de IP e falhas de DHCP.",
      "Blocos documentados aceleram troubleshooting.",
      "Endereços extremos mal usados geram incidentes difíceis para iniciantes."
    ],
    "financialImpact": [
      "Subnets cloud mal dimensionadas podem exigir recriação de recursos.",
      "IPAM e automação reduzem retrabalho em ambientes grandes.",
      "Erros de endereçamento consomem tempo de NOC, SOC e sustentação."
    ],
    "securityImpact": [
      "CIDRs amplos aumentam superfície de ataque.",
      "Documentação de blocos deve ser sanitizada antes de ser compartilhada.",
      "Faixas DHCP e reservas mal controladas facilitam ativos desconhecidos."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Usar o primeiro endereço do bloco como host comum.",
      "whyItHappens": "O aluno vê um endereço válido visualmente e não considera o significado de rede.",
      "consequence": "Configuração inválida ou comportamento imprevisível.",
      "correction": "Identificar rede antes de escolher hosts."
    },
    {
      "mistake": "Usar o último endereço do bloco como gateway.",
      "whyItHappens": "Parece uma convenção simples colocar gateway no final.",
      "consequence": "Em muitos blocos, o último endereço é broadcast.",
      "correction": "Escolher um host utilizável, documentar a convenção e validar o CIDR."
    },
    {
      "mistake": "Aplicar sempre /24 sem pensar.",
      "whyItHappens": "/24 é comum em redes domésticas e exemplos básicos.",
      "consequence": "Desperdício, falta de segmentação ou incapacidade de atender hosts suficientes.",
      "correction": "Dimensionar com base em hosts, função, crescimento e segurança."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host configurado não responde após IP manual.",
      "Gateway configurado no broadcast do bloco.",
      "DHCP entrega faixa que inclui endereço reservado.",
      "Firewall usa CIDR errado e libera ou bloqueia tráfego indevidamente.",
      "Cloud subnet tem menos IPs disponíveis que o esperado."
    ],
    "diagnosticQuestions": [
      "Qual é o IP/CIDR?",
      "Qual é o endereço de rede?",
      "Qual é o broadcast?",
      "O gateway está dentro da faixa de hosts utilizáveis?",
      "O DHCP exclui rede, broadcast, gateway e reservas?",
      "Há reservas adicionais do provedor cloud?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print",
        "purpose": "Ver IP, máscara, gateway e rotas locais.",
        "expectedObservation": "IPv4, Subnet Mask, Default Gateway e rota default.",
        "interpretation": "Permite conferir se o gateway está dentro da faixa utilizável."
      },
      {
        "platform": "Linux",
        "command": "ip addr show && ip route",
        "purpose": "Ver IP com prefixo e rotas.",
        "expectedObservation": "Endereço em formato CIDR e default via gateway.",
        "interpretation": "Permite calcular rede/broadcast e validar rota local."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief && show running-config interface vlan 20",
        "purpose": "Ver IP/máscara da interface de gateway da VLAN.",
        "expectedObservation": "SVI com endereço de host utilizável no bloco correto.",
        "interpretation": "Permite validar gateway e escopo da VLAN."
      }
    ],
    "decisionTree": [
      {
        "if": "Gateway está no primeiro endereço de rede",
        "then": "Recalcular bloco e escolher um endereço de host utilizável."
      },
      {
        "if": "Gateway está no broadcast",
        "then": "Corrigir gateway e revisar DHCP/reservas."
      },
      {
        "if": "Cloud mostra menos IPs livres que o cálculo clássico",
        "then": "Consultar reservas do provedor e ajustar dimensionamento."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar rede, gateway, broadcast, DHCP e reservas.",
      "Aplicar menor privilégio em CIDRs de firewall e security groups.",
      "Usar IPAM quando o ambiente crescer.",
      "Sanitizar topologias e faixas antes de compartilhar evidências.",
      "Separar blocos por função, ambiente e risco."
    ],
    "badPractices": [
      "Liberar /8 ou /16 por conveniência.",
      "Usar planilhas desatualizadas como fonte única.",
      "Configurar gateway sem validar se o endereço é host utilizável.",
      "Permitir DHCP entregar endereços reservados.",
      "Tratar rede interna como automaticamente confiável."
    ],
    "commonErrors": [
      "Confundir endereço de rede com gateway.",
      "Confundir broadcast com último host disponível.",
      "Esquecer reservas cloud.",
      "Copiar CIDR de outro ambiente sem checar sobreposição."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição por CIDR amplo",
        "description": "Regras muito amplas permitem tráfego de mais origens ou destinos que o necessário.",
        "defensiveExplanation": "O risco aparece quando a rede é usada como substituto fraco de identidade ou autorização.",
        "mitigation": "Usar menor privilégio, revisão por pares, logs e validação automatizada."
      },
      {
        "name": "Ativos desconhecidos por DHCP mal controlado",
        "description": "Faixas sem reserva/documentação podem permitir dispositivos não inventariados.",
        "defensiveExplanation": "A ausência de IPAM e NAC dificulta distinguir ativo legítimo de desconhecido.",
        "mitigation": "Integrar DHCP, NAC, inventário, SIEM e processo de exceções."
      }
    ],
    "monitoring": [
      "Logs de DHCP com concessões inesperadas.",
      "Fluxos de rede de blocos não documentados.",
      "Regras de firewall com CIDRs excessivamente amplos.",
      "Alterações de IaC em subnets e route tables."
    ],
    "hardening": [
      "Padronizar gateways e reservas por convenção documentada.",
      "Validar CIDR em pipeline de IaC.",
      "Usar IPAM para evitar sobreposição.",
      "Revisar periodicamente allowlists."
    ],
    "detectionIdeas": [
      "Alertar quando surgir tráfego de bloco não cadastrado.",
      "Alertar alterações em security groups com /0, /8 ou /16 sem justificativa.",
      "Comparar concessões DHCP com inventário."
    ]
  },
  "protocolFields": [
    {
      "field": "Source IP",
      "size": "32 bits",
      "purpose": "Indicar o endereço IPv4 de origem.",
      "securityObservation": "Pode revelar segmento, função ou ambiente em logs."
    },
    {
      "field": "Destination IP",
      "size": "32 bits",
      "purpose": "Indicar o endereço IPv4 de destino.",
      "securityObservation": "Deve ser interpretado junto com rota, firewall e política."
    },
    {
      "field": "Subnet Prefix",
      "size": "1 a 32 bits de rede",
      "purpose": "Definir o bloco ao qual o endereço pertence.",
      "securityObservation": "Prefixos amplos em políticas aumentam superfície de acesso."
    },
    {
      "field": "Broadcast Address",
      "size": "32 bits",
      "purpose": "Representar todos os hosts do bloco em IPv4 tradicional.",
      "securityObservation": "Uso indevido pode gerar ruído e falhas operacionais."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Host",
      "action": "Lê seu IP e prefixo.",
      "detail": "Exemplo: 192.168.10.25/24.",
      "possibleFailure": "Prefixo incorreto muda o bloco calculado."
    },
    {
      "step": 2,
      "actor": "Host",
      "action": "Calcula endereço de rede e broadcast.",
      "detail": "Rede 192.168.10.0, broadcast 192.168.10.255.",
      "possibleFailure": "Erro de cálculo leva a gateway ou host inválido."
    },
    {
      "step": 3,
      "actor": "Administrador/DHCP",
      "action": "Escolhe faixa de hosts utilizáveis.",
      "detail": "Exemplo: gateway .1, DHCP .50-.200, reservas .2-.49.",
      "possibleFailure": "DHCP pode entregar endereço reservado ou inválido."
    },
    {
      "step": 4,
      "actor": "Firewall/Cloud",
      "action": "Usa CIDR em regras e subnets.",
      "detail": "O bloco define escopo de política e roteamento.",
      "possibleFailure": "CIDR amplo demais expõe mais tráfego que o necessário."
    }
  ],
  "lab": {
    "id": "lab-4.4",
    "title": "Calculando rede, hosts e broadcast em blocos IPv4",
    "labType": "security",
    "objective": "Identificar endereço de rede, intervalo de hosts utilizáveis e broadcast em blocos IPv4 comuns.",
    "scenario": "Você recebeu blocos IPv4 para documentar uma pequena rede e precisa separar rede, gateway sugerido, faixa DHCP, reservas e broadcast.",
    "topology": "Analista -> tabela de blocos IPv4 -> documentação de rede -> validação operacional",
    "architecture": "Laboratório conceitual/local com cálculos e validação por comandos do sistema.",
    "prerequisites": [
      "Ter estudado IPv4, octetos, máscara e CIDR.",
      "Ter terminal Windows ou Linux para coletar seu próprio IP."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Terminal Linux",
      "Calculadora simples ou papel",
      "Opcional: Packet Tracer para simular blocos"
    ],
    "estimatedTimeMinutes": 125,
    "cost": "zero",
    "safetyNotes": [
      "Não altere o IP da sua máquina em rede corporativa sem autorização.",
      "Não compartilhe prints contendo IPs públicos, nomes internos ou gateways reais sem sanitizar.",
      "O laboratório é defensivo e de documentação."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Coletar seu IP local",
        "instruction": "Veja o IP, máscara ou prefixo e gateway do seu host.",
        "command": "ipconfig /all  # Windows\nip addr show && ip route  # Linux",
        "expectedOutput": "IPv4, máscara/prefixo e gateway padrão.",
        "explanation": "Esses dados permitem identificar o bloco local do host."
      },
      {
        "number": 2,
        "title": "Calcular o bloco /24 clássico",
        "instruction": "Para 192.168.10.25/24, identifique rede, hosts e broadcast.",
        "command": "Rede: 192.168.10.0\nHosts: 192.168.10.1 - 192.168.10.254\nBroadcast: 192.168.10.255",
        "expectedOutput": "Tabela com os três elementos.",
        "explanation": "/24 possui 8 bits de host, portanto 256 endereços totais e 254 hosts clássicos."
      },
      {
        "number": 3,
        "title": "Calcular um bloco /26",
        "instruction": "Para 192.168.10.70/26, descubra em qual bloco ele cai.",
        "command": "Blocos /26 no último octeto: 0-63, 64-127, 128-191, 192-255",
        "expectedOutput": "Rede 192.168.10.64, hosts .65-.126, broadcast .127.",
        "explanation": "/26 tem blocos de 64 endereços no último octeto."
      },
      {
        "number": 4,
        "title": "Planejar gateway e DHCP",
        "instruction": "Escolha gateway, faixa DHCP e reservas para o bloco 192.168.10.64/26.",
        "command": "Gateway sugerido: 192.168.10.65\nDHCP sugerido: 192.168.10.80-192.168.10.120\nReservas: 192.168.10.66-192.168.10.79",
        "expectedOutput": "Plano sem usar rede ou broadcast.",
        "explanation": "A escolha deve respeitar hosts utilizáveis e documentação."
      },
      {
        "number": 5,
        "title": "Registrar ressalva de cloud",
        "instruction": "Anote que provedores cloud podem reservar endereços adicionais.",
        "command": "Adicionar nota: validar documentação do provedor antes de estimar IPs disponíveis.",
        "expectedOutput": "Relatório com ressalva operacional.",
        "explanation": "O cálculo clássico é base conceitual, mas cloud possui reservas próprias."
      }
    ],
    "expectedResult": "O aluno deve produzir uma tabela com rede, host inicial, host final, broadcast, gateway sugerido, faixa DHCP e observações de segurança.",
    "validation": [
      {
        "check": "Rede e broadcast calculados corretamente",
        "command": "Comparar primeiro e último endereço do bloco",
        "expected": "Rede com bits de host zerados e broadcast com bits de host ligados",
        "ifFails": "Revisar CIDR e tamanho do bloco."
      },
      {
        "check": "Gateway escolhido é host utilizável",
        "command": "Verificar se gateway não é rede nem broadcast",
        "expected": "Gateway dentro do intervalo de hosts",
        "ifFails": "Escolher outro endereço e documentar a convenção."
      },
      {
        "check": "Faixa DHCP não inclui reservas",
        "command": "Comparar DHCP com gateway, rede, broadcast e reservas",
        "expected": "Sem sobreposição",
        "ifFails": "Ajustar escopo DHCP."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não sei onde começa o bloco /26",
        "probableCause": "Falta de cálculo do tamanho do bloco.",
        "howToConfirm": "Calcular 256 - máscara do octeto interessante ou usar potência de 2.",
        "fix": "Listar blocos: 0, 64, 128, 192."
      },
      {
        "symptom": "Gateway escolhido não funciona",
        "probableCause": "Endereço pode ser rede, broadcast, fora do bloco ou já em uso.",
        "howToConfirm": "Verificar CIDR e tabela ARP/DHCP.",
        "fix": "Escolher host utilizável e reservar no DHCP/IPAM."
      },
      {
        "symptom": "Cloud mostra poucos IPs livres",
        "probableCause": "Reservas internas do provedor.",
        "howToConfirm": "Consultar documentação e painel da subnet.",
        "fix": "Aumentar bloco ou dividir subnets corretamente."
      }
    ],
    "improvements": [
      "Criar planilha de IPAM simples.",
      "Adicionar validação automática em IaC.",
      "Simular blocos no Packet Tracer.",
      "Criar padrão de gateway por ambiente."
    ],
    "evidenceToCollect": [
      "Tabela de blocos calculados",
      "IP/máscara/gateway do host local sanitizados",
      "Plano de gateway e DHCP",
      "Lista de riscos e ressalvas cloud"
    ],
    "questions": [
      "Por que o primeiro endereço do bloco não é host comum?",
      "Por que o último endereço é broadcast em IPv4 tradicional?",
      "Como cloud pode alterar a quantidade de IPs utilizáveis?",
      "Qual risco de liberar um CIDR amplo demais?"
    ],
    "challenge": "Calcule rede, hosts e broadcast para 10.10.5.130/26 e proponha gateway, DHCP e reservas.",
    "solution": "O /26 cria blocos de 64: 0-63, 64-127, 128-191, 192-255. O IP 10.10.5.130 cai em 10.10.5.128/26. Rede: 10.10.5.128. Broadcast: 10.10.5.191. Hosts: 10.10.5.129 a 10.10.5.190. Gateway possível: 10.10.5.129. DHCP poderia ser 10.10.5.140-10.10.5.180, com reservas documentadas."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta dizer que um host está no IP 192.168.10.25?",
      "hints": [
        "Pense no CIDR.",
        "Pense na diferença entre host e bloco."
      ],
      "expectedIdeas": [
        "rede",
        "máscara",
        "broadcast",
        "host utilizável",
        "gateway"
      ],
      "explanation": "Sem CIDR, não sabemos qual bloco o endereço pertence nem quais endereços são válidos para hosts."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário configurou o gateway como o último endereço do /24 e perdeu conectividade. Qual hipótese você testaria?",
      "hints": [
        "Qual é o último endereço de um /24?",
        "Ele pode ser usado como host?"
      ],
      "expectedIdeas": [
        "broadcast",
        "gateway inválido",
        "corrigir para host utilizável",
        "validar DHCP"
      ],
      "explanation": "Em um /24 tradicional, o último endereço é broadcast, não gateway."
    },
    {
      "type": "cenário real",
      "question": "Em cloud, por que você não deve calcular IPs disponíveis apenas com 2^bits_de_host - 2?",
      "hints": [
        "Pense em reservas do provedor.",
        "Pense em gateways e serviços internos."
      ],
      "expectedIdeas": [
        "endereços reservados",
        "documentação oficial",
        "dimensionamento",
        "crescimento"
      ],
      "explanation": "Provedores podem reservar endereços adicionais, então a capacidade útil deve ser confirmada na documentação."
    }
  ],
  "quiz": [
    {
      "id": "q4.4.1",
      "type": "conceito",
      "q": "Em 192.168.10.0/24, qual é o endereço de rede?",
      "opts": [
        "192.168.10.0",
        "192.168.10.1",
        "192.168.10.254",
        "192.168.10.255"
      ],
      "a": 0,
      "exp": "O endereço de rede é o primeiro endereço do bloco.",
      "difficulty": "iniciante",
      "topic": "rede"
    },
    {
      "id": "q4.4.2",
      "type": "conceito",
      "q": "Em um /24 clássico, qual é o broadcast?",
      "opts": [
        "O primeiro endereço",
        "O último endereço",
        "O gateway sempre",
        "O DNS sempre"
      ],
      "a": 1,
      "exp": "No IPv4 tradicional, o broadcast é o último endereço do bloco.",
      "difficulty": "iniciante",
      "topic": "broadcast"
    },
    {
      "id": "q4.4.3",
      "type": "cálculo",
      "q": "Qual é o intervalo de hosts de 192.168.1.0/24 no cálculo clássico?",
      "opts": [
        "192.168.1.0 a 192.168.1.255",
        "192.168.1.1 a 192.168.1.254",
        "192.168.1.2 a 192.168.1.255",
        "192.168.0.1 a 192.168.1.254"
      ],
      "a": 1,
      "exp": "Rede é .0 e broadcast é .255; hosts ficam entre eles.",
      "difficulty": "iniciante",
      "topic": "hosts"
    },
    {
      "id": "q4.4.4",
      "type": "diagnóstico",
      "q": "Um gateway foi configurado como 10.0.0.255 em 10.0.0.0/24. Qual é o problema provável?",
      "opts": [
        "É o broadcast do bloco",
        "É sempre DNS",
        "É IP público",
        "É endereço APIPA"
      ],
      "a": 0,
      "exp": "No /24, .255 é broadcast e não deve ser gateway.",
      "difficulty": "iniciante-intermediário",
      "topic": "gateway"
    },
    {
      "id": "q4.4.5",
      "type": "segurança",
      "q": "Qual é o risco de usar CIDRs amplos demais em regras de firewall?",
      "opts": [
        "Reduzir a superfície de ataque",
        "Liberar mais origens ou destinos que o necessário",
        "Impedir qualquer tráfego IPv4",
        "Transformar IPv4 em IPv6"
      ],
      "a": 1,
      "exp": "CIDR amplo aumenta escopo permitido e pode ampliar exposição.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q4.4.6",
      "type": "cloud",
      "q": "Por que uma subnet cloud pode ter menos IPs disponíveis que o cálculo clássico?",
      "opts": [
        "Porque IPv4 não funciona em cloud",
        "Porque provedores podem reservar endereços internos",
        "Porque broadcast vira DNS",
        "Porque todo IP precisa ser público"
      ],
      "a": 1,
      "exp": "Provedores reservam endereços para funções da rede virtual.",
      "difficulty": "intermediário",
      "topic": "cloud"
    }
  ],
  "flashcards": [
    {
      "id": "fc4.4.1",
      "front": "O que é endereço de rede?",
      "back": "É o primeiro endereço do bloco IPv4, usado para identificar a rede, não um host comum.",
      "tags": [
        "ipv4",
        "rede"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.4.2",
      "front": "O que é broadcast IPv4?",
      "back": "É o endereço que representa todos os hosts do bloco em IPv4 tradicional, normalmente o último endereço.",
      "tags": [
        "ipv4",
        "broadcast"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.4.3",
      "front": "Qual fórmula clássica calcula hosts utilizáveis?",
      "back": "2 elevado aos bits de host menos 2, por causa de rede e broadcast.",
      "tags": [
        "cidr",
        "hosts"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.4.4",
      "front": "Em 192.168.10.0/24, quais são os hosts clássicos?",
      "back": "192.168.10.1 até 192.168.10.254.",
      "tags": [
        "ipv4",
        "/24"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.4.5",
      "front": "Gateway pode ser broadcast?",
      "back": "Não. Gateway deve ser um endereço de host utilizável dentro do bloco.",
      "tags": [
        "gateway",
        "broadcast"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc4.4.6",
      "front": "Cloud segue exatamente 2^host - 2?",
      "back": "Nem sempre. Provedores podem reservar endereços adicionais dentro da subnet.",
      "tags": [
        "cloud",
        "ipv4"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex4.4.1",
      "type": "cálculo",
      "prompt": "Para 192.168.50.0/24, indique rede, primeiro host, último host e broadcast.",
      "expectedAnswer": "Rede 192.168.50.0, primeiro host 192.168.50.1, último host 192.168.50.254, broadcast 192.168.50.255.",
      "explanation": "/24 deixa 8 bits de host, criando 256 endereços totais."
    },
    {
      "id": "ex4.4.2",
      "type": "cálculo",
      "prompt": "Para 192.168.10.70/26, indique o bloco correto.",
      "expectedAnswer": "Rede 192.168.10.64, hosts 192.168.10.65 a 192.168.10.126, broadcast 192.168.10.127.",
      "explanation": "/26 tem blocos de 64 no último octeto."
    },
    {
      "id": "ex4.4.3",
      "type": "diagnóstico",
      "prompt": "Um DHCP entrega 10.1.1.255 em uma rede 10.1.1.0/24. Qual é o erro?",
      "expectedAnswer": "O DHCP entregou o broadcast do bloco como host.",
      "explanation": "O último endereço do /24 é broadcast."
    },
    {
      "id": "ex4.4.4",
      "type": "segurança",
      "prompt": "Explique por que liberar 10.0.0.0/8 em um firewall raramente é menor privilégio.",
      "expectedAnswer": "Porque libera um bloco enorme de endereços privados, muito maior que a necessidade típica de uma aplicação ou serviço.",
      "explanation": "Regras devem limitar origem, destino, porta e justificativa."
    }
  ],
  "challenge": {
    "title": "Revisar plano de endereçamento de uma VLAN",
    "scenario": "Uma empresa criou a VLAN 40 com bloco 172.16.40.0/24. O plano atual define gateway 172.16.40.255, DHCP 172.16.40.1-172.16.40.250 e impressoras em 172.16.40.10-172.16.40.20.",
    "tasks": [
      "Identificar endereço de rede e broadcast.",
      "Apontar o erro no gateway.",
      "Propor gateway correto.",
      "Ajustar DHCP para não conflitar com reservas.",
      "Indicar uma observação de segurança."
    ],
    "constraints": [
      "Manter o bloco 172.16.40.0/24.",
      "Evitar sobreposição entre DHCP e reservas.",
      "Documentar a convenção escolhida."
    ],
    "expectedDeliverables": [
      "Tabela rede/hosts/broadcast",
      "Plano corrigido de gateway",
      "Faixa DHCP corrigida",
      "Lista de reservas",
      "Observação de segurança"
    ],
    "gradingRubric": [
      {
        "criterion": "Cálculo correto do bloco",
        "points": 25,
        "description": "Identifica rede, hosts e broadcast."
      },
      {
        "criterion": "Correção do gateway",
        "points": 25,
        "description": "Escolhe endereço de host utilizável."
      },
      {
        "criterion": "DHCP e reservas",
        "points": 25,
        "description": "Evita sobreposição e documenta reservas."
      },
      {
        "criterion": "Segurança e documentação",
        "points": 25,
        "description": "Inclui menor privilégio, IPAM e sanitização."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro identificamos os extremos do bloco. Em seguida, verificamos se gateway e DHCP usam apenas hosts utilizáveis e se não há sobreposição com reservas.",
    "steps": [
      "Bloco 172.16.40.0/24 tem rede 172.16.40.0.",
      "Broadcast é 172.16.40.255.",
      "Hosts utilizáveis vão de 172.16.40.1 a 172.16.40.254.",
      "Gateway 172.16.40.255 está errado porque é broadcast.",
      "Uma opção é usar gateway 172.16.40.1.",
      "Se impressoras usam .10-.20, DHCP poderia começar em .50.",
      "Documentar reservas e aplicar controles de acesso por função."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Manter gateway em .255 porque é o último endereço.",
        "whyItIsWrong": "No /24, .255 é broadcast."
      },
      {
        "answer": "Usar DHCP .1-.250 mesmo com gateway .1 e impressoras .10-.20.",
        "whyItIsWrong": "Isso cria conflito com gateway e reservas."
      }
    ],
    "finalAnswer": "Rede 172.16.40.0, broadcast 172.16.40.255, hosts 172.16.40.1-172.16.40.254. Gateway sugerido 172.16.40.1. Impressoras .10-.20 reservadas. DHCP sugerido .50-.200. Regras de firewall devem usar CIDRs mínimos e a documentação deve ser sanitizada ao compartilhar."
  },
  "glossary": [
    {
      "term": "Endereço de rede",
      "shortDefinition": "Primeiro endereço de um bloco IPv4.",
      "longDefinition": "Identifica o bloco lógico e não deve ser usado como host comum em redes IPv4 tradicionais.",
      "example": "192.168.10.0 em 192.168.10.0/24.",
      "relatedTerms": [
        "CIDR",
        "máscara",
        "broadcast"
      ],
      "relatedLessons": [
        "4.3",
        "4.4",
        "5.1"
      ]
    },
    {
      "term": "Broadcast",
      "shortDefinition": "Endereço que representa todos os hosts do bloco.",
      "longDefinition": "No IPv4 tradicional, costuma ser o último endereço do bloco, com todos os bits de host em 1.",
      "example": "192.168.10.255 em 192.168.10.0/24.",
      "relatedTerms": [
        "ARP",
        "domínio de broadcast",
        "VLAN"
      ],
      "relatedLessons": [
        "3.4",
        "3.7",
        "4.4"
      ]
    },
    {
      "term": "Host utilizável",
      "shortDefinition": "Endereço que pode ser atribuído a uma interface ou dispositivo.",
      "longDefinition": "Endereço dentro do bloco que não é rede nem broadcast, respeitando também reservas operacionais.",
      "example": "192.168.10.10 em 192.168.10.0/24.",
      "relatedTerms": [
        "DHCP",
        "gateway",
        "IPAM"
      ],
      "relatedLessons": [
        "4.4",
        "4.5",
        "4.7"
      ]
    },
    {
      "term": "Faixa DHCP",
      "shortDefinition": "Intervalo de endereços que o DHCP pode entregar.",
      "longDefinition": "Deve excluir rede, broadcast, gateway e reservas manuais.",
      "example": "192.168.10.50-192.168.10.200.",
      "relatedTerms": [
        "DHCP",
        "reserva",
        "escopo"
      ],
      "relatedLessons": [
        "4.7",
        "7.2"
      ]
    },
    {
      "term": "IPAM",
      "shortDefinition": "Gerenciamento de endereços IP.",
      "longDefinition": "Processo ou ferramenta para controlar blocos, subnets, reservas, escopos DHCP e uso de endereços.",
      "example": "Usar IPAM para evitar sobreposição entre filiais.",
      "relatedTerms": [
        "subnet",
        "CIDR",
        "governança"
      ],
      "relatedLessons": [
        "4.4",
        "5.10"
      ]
    },
    {
      "term": "Sobreposição de CIDR",
      "shortDefinition": "Quando dois blocos de rede se cruzam.",
      "longDefinition": "Pode causar ambiguidades de roteamento, falhas de VPN, problemas de peering e conflitos operacionais.",
      "example": "VPC 10.0.0.0/16 conectando a datacenter que também usa 10.0.0.0/16.",
      "relatedTerms": [
        "VPN",
        "roteamento",
        "cloud networking"
      ],
      "relatedLessons": [
        "4.6",
        "10.3",
        "14.2"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Base conceitual do IPv4."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 4.3",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Máscara de rede e CIDR."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 3.4",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Domínios de broadcast e VLANs."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "lesson": "subnets e automação",
      "reason": "Subnets e blocos CIDR devem ser validados em infraestrutura como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso condicional e redes confiáveis",
      "lesson": "contexto de rede",
      "reason": "Políticas de acesso muitas vezes usam origem de rede como sinal auxiliar, não como identidade suficiente."
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
      "4.5"
    ]
  }
};
