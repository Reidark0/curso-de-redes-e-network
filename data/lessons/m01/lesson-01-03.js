export const lesson0103 = {
  "id": "1.3",
  "moduleId": "m01",
  "order": 3,
  "title": "Tipos de rede: PAN, LAN, WLAN, CAN, MAN, WAN e SAN",
  "subtitle": "Como alcance, finalidade, meio e domínio administrativo mudam arquitetura, operação, custo e segurança.",
  "duration": "65-95 min",
  "estimatedStudyTimeMinutes": 95,
  "difficulty": "iniciante-intermediário",
  "type": "intermediária",
  "xp": 165,
  "tags": [
    "redes",
    "fundamentos",
    "PAN",
    "LAN",
    "WLAN",
    "CAN",
    "MAN",
    "WAN",
    "SAN",
    "cloud",
    "segurança",
    "arquitetura",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.1",
      "reason": "É necessário entender rede como sistema de comunicação antes de classificar tipos de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.2",
      "reason": "A classificação por tipo depende da distinção entre dispositivos finais, intermediários, serviços e políticas."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "O pensamento em camadas ajuda a separar alcance físico, função lógica e responsabilidade operacional."
    }
  ],
  "objectives": [
    "Diferenciar PAN, LAN, WLAN, CAN, MAN, WAN e SAN pelo alcance e finalidade.",
    "Relacionar cada tipo de rede com custos, riscos, operação e troubleshooting.",
    "Entender como tipos de rede coexistem em uma arquitetura corporativa moderna.",
    "Reconhecer equivalentes em cloud networking e ambientes híbridos.",
    "Evitar decisões ruins causadas por decorar siglas sem entender contexto."
  ],
  "learningOutcomes": [
    "Dado um cenário, o aluno classifica corretamente o tipo ou os tipos de rede envolvidos.",
    "Dado um problema de conectividade, o aluno identifica se a hipótese envolve LAN, WLAN, WAN, cloud ou serviço especializado.",
    "Dada uma arquitetura simples, o aluno aponta riscos e controles de segurança coerentes com cada tipo de rede."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Depois de entender o que é uma rede e quem participa dela, surge uma pergunta prática: toda rede é igual? A rede entre seu fone Bluetooth e seu celular, a rede Wi-Fi da sua casa, a rede cabeada de uma empresa, a rede entre filiais, a rede de armazenamento de um datacenter e a rede global da internet resolvem o mesmo problema básico — comunicação — mas em escalas, riscos, custos e arquiteturas muito diferentes.</p>\n  <p>Em ambientes corporativos, classificar o tipo de rede ajuda a tomar decisões concretas: qual meio usar, quem administra, que nível de disponibilidade é necessário, que risco existe, onde aplicar firewall, quanto custa crescer, que latência é aceitável e quais logs precisam ser coletados.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> chamar tudo apenas de “rede” esconde diferenças importantes. Uma LAN interna, uma WAN entre filiais, uma WLAN corporativa e uma SAN de datacenter possuem requisitos, ameaças e formas de troubleshooting diferentes.</div>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As redes começaram pequenas, conectando poucos equipamentos próximos. Com a popularização de computadores pessoais, surgiram redes locais para compartilhar impressoras, arquivos e acesso a servidores. Depois, empresas precisaram conectar prédios, campus, cidades, filiais e datacenters. A internet ampliou essa conectividade para escala global.</p>\n  <p>Ao mesmo tempo, surgiram necessidades especializadas. Redes sem fio trouxeram mobilidade. Redes de armazenamento passaram a conectar servidores a volumes de disco de alto desempenho. Redes metropolitanas conectaram unidades dentro de uma cidade. Redes pessoais aproximaram sensores, celulares, relógios e periféricos.</p>\n  <p>Essa evolução criou siglas como PAN, LAN, WLAN, CAN, MAN, WAN e SAN. Elas não existem para decorar nomes, mas para indicar alcance, finalidade, meio, controle administrativo, custo e criticidade.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que redes diferentes possuem objetivos diferentes. Uma rede local prioriza baixa latência e controle interno. Uma WAN prioriza conexão entre locais distantes. Uma WLAN prioriza mobilidade e enfrenta interferência. Uma SAN prioriza acesso confiável e rápido a armazenamento. Uma PAN prioriza proximidade e baixo consumo.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Alcance:</strong> centímetros, sala, prédio, campus, cidade, país ou mundo.</li>\n    <li><strong>Meio:</strong> cobre, fibra, rádio, links de operadora ou rede virtual em cloud.</li>\n    <li><strong>Controle:</strong> administrado por você, por operadora, por provedor cloud ou por múltiplas organizações.</li>\n    <li><strong>Risco:</strong> exposição física, rádio, terceiros, internet, movimento lateral ou indisponibilidade crítica.</li>\n    <li><strong>Custo:</strong> cabo local, APs, switches, circuitos de operadora, VPN, firewalls, storage fabric ou tráfego cloud.</li>\n  </ul>\n  <p>Sem essa classificação, uma equipe pode aplicar solução errada: tratar Wi-Fi como se fosse cabo, tratar link WAN como se fosse LAN, colocar armazenamento crítico em rede comum sem isolamento ou desenhar cloud sem entender alcance e domínio administrativo.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>Os tipos de rede surgiram conforme o alcance e a finalidade da comunicação aumentaram. A tabela abaixo mostra a evolução conceitual.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Tipo</th><th>Alcance típico</th><th>Finalidade</th><th>Limitação principal</th></tr></thead>\n    <tbody>\n      <tr><td>PAN</td><td>Pessoa ou poucos metros</td><td>Periféricos, sensores, celular, wearable</td><td>Baixo alcance, bateria, pareamento e segurança local</td></tr>\n      <tr><td>LAN</td><td>Sala, casa, escritório, andar</td><td>Conectar hosts próximos com alto controle</td><td>Broadcast, cabos, switches, segmentação e crescimento</td></tr>\n      <tr><td>WLAN</td><td>Ambiente coberto por rádio</td><td>Mobilidade via Wi-Fi</td><td>Interferência, sinal, autenticação e compartilhamento do meio</td></tr>\n      <tr><td>CAN</td><td>Campus, conjunto de prédios</td><td>Interligar unidades próximas sob uma organização</td><td>Backbone, fibra, redundância e administração central</td></tr>\n      <tr><td>MAN</td><td>Cidade ou região metropolitana</td><td>Conectar sites dentro de área urbana</td><td>Dependência de operadora e custo de link</td></tr>\n      <tr><td>WAN</td><td>Região, país ou global</td><td>Conectar filiais, datacenters e cloud</td><td>Latência, custo, SLA, roteamento e segurança</td></tr>\n      <tr><td>SAN</td><td>Datacenter ou ambiente especializado</td><td>Conectar servidores a armazenamento</td><td>Complexidade, custo, isolamento e criticidade</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Tipos de rede são classificações usadas para descrever o alcance, a finalidade, o meio de transmissão, o domínio administrativo e a função de uma rede.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> uma PAN conecta dispositivos muito próximos de uma pessoa; uma LAN conecta dispositivos locais; uma WLAN é uma LAN sem fio; uma CAN conecta prédios de um campus; uma MAN cobre área metropolitana; uma WAN conecta locais distantes; uma SAN conecta servidores e armazenamento em ambiente especializado.</div>\n  <p>Essas categorias não são caixas rígidas. Uma empresa pode ter LAN dentro da filial, WLAN para usuários móveis, WAN para conectar filiais, SAN no datacenter e redes virtuais em cloud. O profissional de redes precisa enxergar como esses tipos se combinam em uma arquitetura real.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno muda conforme o tipo de rede, mas o raciocínio base permanece: dispositivos precisam de um meio, regras de comunicação, endereçamento, encaminhamento, controle de acesso e observabilidade.</p>\n  <ol class=\"flow-list\">\n    <li><strong>PAN:</strong> geralmente usa tecnologias de curto alcance e baixo consumo. A preocupação central é pareamento, proximidade e autorização entre dispositivos.</li>\n    <li><strong>LAN:</strong> normalmente usa Ethernet e switches. A preocupação central é comutação local, endereçamento, VLANs, broadcast, gateway e cabeamento.</li>\n    <li><strong>WLAN:</strong> usa rádio e access points. A preocupação central é sinal, canal, interferência, autenticação, roaming e densidade de usuários.</li>\n    <li><strong>CAN/MAN/WAN:</strong> dependem de enlaces entre locais, roteamento, redundância, operadora, criptografia e política de tráfego.</li>\n    <li><strong>SAN:</strong> separa tráfego de armazenamento para desempenho e confiabilidade. A preocupação central é latência, disponibilidade, isolamento e integridade.</li>\n  </ol>\n  <p>Em troubleshooting, o tipo de rede muda as hipóteses. Em LAN você olha cabo, switch, VLAN e gateway. Em WLAN você olha sinal e autenticação. Em WAN você olha rota, SLA, VPN e operadora. Em SAN você olha paths, zoning, storage e latência.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, os tipos de rede aparecem empilhados e conectados. Um notebook acessa a WLAN, que se conecta à LAN do prédio, que alcança serviços internos, passa por firewalls, usa a WAN para outra filial e pode consumir recursos em cloud. Um servidor de virtualização pode estar na LAN de gerenciamento, na rede de produção e também em uma SAN.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Borda de usuário:</strong> PAN, WLAN e LAN.</li>\n    <li><strong>Distribuição interna:</strong> LAN e CAN, geralmente com switches, VLANs e roteamento interno.</li>\n    <li><strong>Interconexão distante:</strong> MAN e WAN, com links de operadora, VPN, SD-WAN ou conexão dedicada.</li>\n    <li><strong>Datacenter:</strong> LAN de servidores, rede de gerenciamento, rede de backup e SAN.</li>\n    <li><strong>Cloud:</strong> redes virtuais, subnets, peering, VPN, express route/direct connect e endpoints privados.</li>\n  </ul>\n  <p>A decisão arquitetural não é escolher uma sigla isolada. É entender qual tipo de rede está resolvendo qual problema e onde aplicar segmentação, segurança, redundância e monitoramento.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em redes como sistemas de transporte. Uma PAN é como levar algo no bolso. Uma LAN é como circular dentro de uma casa ou escritório. Uma CAN é como circular entre prédios de uma universidade. Uma MAN é como transporte dentro de uma cidade. Uma WAN é como rodovias entre estados ou países. Uma SAN é como um corredor técnico reservado para transporte crítico dentro de uma instalação.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não transportam objetos inteiros de uma vez. Elas dividem informação em unidades, usam protocolos, endereços, filas, retransmissões, criptografia e políticas. A analogia ajuda no alcance, mas não substitui o funcionamento técnico.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Na sua casa, o celular conectado ao fone Bluetooth forma uma PAN. O notebook conectado ao roteador por cabo forma parte da LAN. O celular no Wi-Fi participa da WLAN. O roteador da operadora conecta sua rede doméstica à WAN da internet. Se você usa um HD de rede ou NAS, pode existir uma pequena rede de armazenamento, embora não seja uma SAN corporativa.</p>\n  <p>Quando a internet cai, a classificação ajuda. O Wi-Fi pode estar funcionando, mas a WAN pode estar indisponível. A LAN pode permitir imprimir, mas a conexão com serviços externos pode falhar. O problema não é “a rede” inteira; é um domínio específico.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa média pode ter LAN cabeada para estações fixas, WLAN corporativa para notebooks, WLAN de visitantes isolada, CAN conectando prédios próximos, WAN conectando filiais, VPN para usuários remotos e SAN no datacenter. Cada tipo possui dono, custo, política e risco.</p>\n  <p>O time de segurança pode exigir que a WLAN de visitantes não acesse a LAN interna, que a WAN entre filiais passe por firewall, que a SAN não seja roteável para usuários, que a rede de gerenciamento seja separada e que logs de autenticação Wi-Fi sejam enviados ao SIEM.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, as siglas aparecem de forma diferente, mas os conceitos continuam. Uma VPC ou VNet funciona como uma rede virtual controlada. Subnets organizam segmentos. Peering conecta redes virtuais. VPN e links dedicados conectam a rede corporativa à cloud, assumindo papel de WAN híbrida. Private endpoints criam acesso privado a serviços gerenciados.</p>\n  <p>O erro comum é achar que, por não existir cabo visível, não existe arquitetura de rede. Na verdade, cloud networking exige entender alcance, rota, domínio administrativo, custo de tráfego, inspeção, DNS privado e políticas.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, o tipo de rede influencia pipeline, deploy e segurança. Um runner de CI/CD pode precisar acessar registry, cluster Kubernetes, repositório de código, cofre de segredos e ambiente de produção. Cada acesso atravessa redes diferentes e deve ser explicitamente autorizado.</p>\n  <p>IaC deve declarar subnets, rotas, security groups, firewalls, private endpoints e conexões híbridas. Policy as code pode impedir que serviços de produção fiquem expostos em rede pública. Observabilidade deve separar falhas de aplicação de falhas de conectividade entre redes.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Tipos de rede mudam o modelo de ameaça. WLAN expõe rádio e autenticação sem fio. WAN envolve terceiros, criptografia, roteamento e disponibilidade. LAN plana aumenta movimento lateral. SAN mal isolada pode afetar dados críticos. Cloud mal segmentada pode expor serviços internos à internet.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Tipo</th><th>Risco comum</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>WLAN</td><td>Senha fraca, rogue AP, cobertura indevida</td><td>Acesso não autorizado ou interceptação local</td><td>WPA2/WPA3 Enterprise, segmentação, logs e site survey</td></tr>\n      <tr><td>LAN</td><td>Rede plana sem segmentação</td><td>Movimento lateral após comprometimento</td><td>VLANs, ACLs, NAC, firewall interno e monitoramento</td></tr>\n      <tr><td>WAN</td><td>Link sem criptografia ou política fraca</td><td>Exposição entre sites e indisponibilidade</td><td>VPN, SD-WAN seguro, redundância e SLA</td></tr>\n      <tr><td>SAN</td><td>Acesso indevido a storage</td><td>Perda, corrupção ou vazamento de dados críticos</td><td>Isolamento, zoning, autenticação, multipath e auditoria</td></tr>\n      <tr><td>Cloud</td><td>Subnet pública indevida</td><td>Exposição direta de workloads</td><td>Private subnets, security groups mínimos e endpoints privados</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 520\" role=\"img\" aria-labelledby=\"m01l03-title m01l03-desc\">\n    <title id=\"m01l03-title\">Tipos de rede por alcance e finalidade</title>\n    <desc id=\"m01l03-desc\">Diagrama comparando PAN, LAN, WLAN, CAN, MAN, WAN e SAN dentro de uma arquitetura corporativa.</desc>\n    <defs>\n      <marker id=\"m01l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"55\" width=\"135\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"102\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">PAN</text>\n    <text x=\"102\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pessoa</text>\n    <rect x=\"210\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"282\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">LAN</text>\n    <text x=\"282\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sala / andar</text>\n    <rect x=\"395\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"467\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">WLAN</text>\n    <text x=\"467\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi</text>\n    <rect x=\"580\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"652\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">CAN</text>\n    <text x=\"652\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Campus</text>\n    <rect x=\"765\" y=\"55\" width=\"145\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"837\" y=\"84\" text-anchor=\"middle\" class=\"svg-label\">MAN</text>\n    <text x=\"837\" y=\"107\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cidade</text>\n    <rect x=\"430\" y=\"220\" width=\"180\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"520\" y=\"253\" text-anchor=\"middle\" class=\"svg-label\">WAN</text>\n    <text x=\"520\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Filiais / internet / cloud</text>\n    <rect x=\"720\" y=\"220\" width=\"185\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"812\" y=\"253\" text-anchor=\"middle\" class=\"svg-label\">SAN</text>\n    <text x=\"812\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Storage crítico</text>\n    <line x1=\"170\" y1=\"90\" x2=\"210\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"355\" y1=\"90\" x2=\"395\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"540\" y1=\"90\" x2=\"580\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"725\" y1=\"90\" x2=\"765\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <path d=\"M650 125 C630 170, 590 200, 555 220\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <line x1=\"610\" y1=\"260\" x2=\"720\" y2=\"260\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l03-arrow)\" />\n    <rect x=\"120\" y=\"365\" width=\"800\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--security\" />\n    <text x=\"520\" y=\"400\" text-anchor=\"middle\" class=\"svg-label\">Decisão arquitetural</text>\n    <text x=\"520\" y=\"428\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">alcance + finalidade + meio + controle + custo + risco + evidência</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam a identificação de tipos de rede e a relação entre classificação, arquitetura, custo, troubleshooting e segurança.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula o planejamento inicial de conectividade para uma empresa com sede, filial, Wi-Fi, cloud e armazenamento crítico.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como sair de nomes decorados para raciocínio arquitetural: que problema cada tipo de rede resolve, que risco cria e como validar se a escolha faz sentido.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> tipos de rede classificam alcance, finalidade, meio, controle e risco.</li>\n    <li><strong>O que lembrar:</strong> PAN é pessoal; LAN é local; WLAN é local sem fio; CAN é campus; MAN é metropolitana; WAN é longa distância; SAN é armazenamento.</li>\n    <li><strong>Erro comum:</strong> decorar siglas sem entender impacto operacional e de segurança.</li>\n    <li><strong>Uso real:</strong> a classificação orienta arquitetura, troubleshooting, orçamento, segmentação e monitoramento.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Depois de classificar tipos de rede, o próximo passo é entender topologias físicas e lógicas. Duas redes podem ser do mesmo tipo, por exemplo LAN, mas ter desenhos muito diferentes: estrela, malha, barramento lógico, hub-and-spoke, spine-leaf ou topologia virtual em cloud.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi-Fi",
      "Bluetooth",
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "DHCP",
      "iSCSI"
    ],
    "dependsOn": [
      "rede como sistema",
      "dispositivos finais",
      "dispositivos intermediários",
      "serviços",
      "meios de transmissão"
    ],
    "enables": [
      "topologias",
      "cabeamento",
      "equipamentos de rede",
      "WAN",
      "cloud networking",
      "VPN",
      "segmentação",
      "troubleshooting"
    ]
  },
  "deepDive": {
    "mentalModel": "Classifique uma rede perguntando: qual alcance ela cobre, qual finalidade atende, quem controla, qual meio usa, que risco cria e que evidência comprova seu funcionamento.",
    "keyTerms": [
      "PAN",
      "LAN",
      "WLAN",
      "CAN",
      "MAN",
      "WAN",
      "SAN",
      "domínio administrativo",
      "alcance",
      "meio",
      "SLA"
    ],
    "limitations": [
      "As siglas não substituem desenho de arquitetura.",
      "Uma rede real pode misturar vários tipos ao mesmo tempo.",
      "Cloud abstrai parte do meio físico, mas não elimina alcance, rota, custo e risco.",
      "SAN é especializada; não deve ser confundida com simples compartilhamento de arquivos."
    ],
    "whenToUse": [
      "Ao explicar uma arquitetura para áreas técnicas ou gestão.",
      "Ao separar escopo de falhas em troubleshooting.",
      "Ao planejar orçamento de conectividade.",
      "Ao desenhar segmentação, firewall e monitoramento."
    ],
    "whenNotToUse": [
      "Não use a sigla como resposta final sem descrever arquitetura.",
      "Não assuma que toda rede sem fio é insegura por definição.",
      "Não trate toda conexão entre sites como internet pública sem verificar o serviço contratado."
    ],
    "operationalImpact": [
      "LAN e WLAN exigem inventário local, cabeamento, APs, switches e suporte ao usuário.",
      "WAN exige gestão de operadora, SLA, redundância, roteamento e monitoramento de disponibilidade.",
      "SAN exige operação especializada, controle rigoroso e planejamento de performance.",
      "Cloud networking exige documentação de subnets, rotas, peering, endpoints e custos de tráfego."
    ],
    "financialImpact": [
      "PAN e pequenas LANs têm baixo custo inicial, mas ainda exigem suporte e segurança.",
      "WLAN corporativa pode exigir APs gerenciados, controladora, licenças e site survey.",
      "WAN e links dedicados podem representar custo recorrente alto.",
      "SAN costuma envolver storage, switches especializados, licenças, redundância e equipe especializada.",
      "Em cloud, tráfego entre regiões, NAT gateways, firewalls gerenciados e links dedicados podem gerar custo relevante."
    ],
    "securityImpact": [
      "Cada tipo de rede possui superfície de ataque diferente.",
      "WLAN exige atenção a autenticação, cobertura e isolamento.",
      "WAN exige criptografia, roteamento seguro e monitoramento.",
      "LAN plana facilita movimento lateral.",
      "SAN e redes de gerenciamento devem ser altamente isoladas.",
      "Cloud exige menor privilégio em security groups, rotas e endpoints."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que WLAN e Wi-Fi são uma internet separada.",
      "whyItHappens": "O usuário vê o Wi-Fi como sinônimo de conexão externa.",
      "consequence": "Diagnóstico confunde rádio local com acesso WAN.",
      "correction": "WLAN é acesso local sem fio; internet depende de roteamento, gateway, DNS e provedor."
    },
    {
      "mistake": "Tratar WAN como se tivesse a mesma latência de LAN.",
      "whyItHappens": "A aplicação funciona em ambiente local e depois é movida para filiais ou cloud.",
      "consequence": "Sistemas ficam lentos por chatty protocols, replicação ruim ou dependência síncrona.",
      "correction": "Projetar considerando latência, perda, SLA, cache, filas e arquitetura distribuída."
    },
    {
      "mistake": "Confundir SAN com NAS ou compartilhamento comum de arquivos.",
      "whyItHappens": "Ambos envolvem armazenamento acessível pela rede.",
      "consequence": "Subestimação de criticidade, performance e isolamento.",
      "correction": "SAN é rede especializada para blocos/armazenamento; NAS é serviço de arquivos na rede."
    },
    {
      "mistake": "Achar que cloud dispensa redes.",
      "whyItHappens": "A infraestrutura física fica invisível ao usuário.",
      "consequence": "Subnets públicas, rotas permissivas e custos inesperados.",
      "correction": "Modelar VPC/VNet, subnets, rotas, security groups, endpoints privados e tráfego."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Wi-Fi conectado, mas sem internet",
      "Filial lenta",
      "Servidor local acessível, cloud inacessível",
      "Storage com alta latência",
      "Usuários visitantes acessando recursos internos"
    ],
    "diagnosticQuestions": [
      "O problema está em PAN, LAN, WLAN, WAN, cloud ou serviço específico?",
      "O usuário consegue acessar recursos locais?",
      "Há perda, latência alta ou falha de resolução de nome?",
      "O tráfego passa por operadora, VPN, firewall ou proxy?",
      "Existe isolamento correto entre redes?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && ping <gateway> && tracert <destino>",
        "purpose": "Ver configuração local, testar LAN/WLAN e observar caminho até o destino.",
        "expectedObservation": "IP, gateway, DNS, resposta do gateway e saltos até o destino.",
        "interpretation": "Se gateway responde e destino externo falha, a hipótese se desloca para DNS, WAN, firewall ou serviço."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && ping -c 4 <gateway> && traceroute <destino>",
        "purpose": "Ver interfaces, rotas e caminho de rede.",
        "expectedObservation": "Interface com IP, rota default e resposta do gateway.",
        "interpretation": "Ajuda a separar problema local, rota, WAN ou destino."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow vlan brief\nshow ip route",
        "purpose": "Ver interfaces, VLANs e rotas em equipamento de rede.",
        "expectedObservation": "Interfaces up/up, VLANs esperadas e rotas corretas.",
        "interpretation": "Permite verificar LAN, segmentação e encaminhamento."
      }
    ],
    "decisionTree": [
      {
        "if": "Dispositivo vê Wi-Fi, mas não pinga gateway",
        "then": "Investigar WLAN, autenticação, sinal, VLAN associada ao SSID e AP."
      },
      {
        "if": "Pinga gateway, mas não acessa internet",
        "then": "Investigar DNS, rota default, NAT, firewall, WAN ou provedor."
      },
      {
        "if": "Recursos locais funcionam, mas filial/cloud está lenta",
        "then": "Investigar WAN, VPN, latência, perda, MTU, firewall e aplicação."
      },
      {
        "if": "Storage apresenta lentidão crítica",
        "then": "Investigar SAN, paths, latência, congestionamento, zoning e storage backend."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Separar redes por função e criticidade.",
      "Isolar rede de visitantes da rede interna.",
      "Usar criptografia em links WAN e acessos remotos.",
      "Manter SAN e gerenciamento fora do alcance de usuários comuns.",
      "Documentar domínio administrativo, rotas, responsáveis e logs por tipo de rede."
    ],
    "badPractices": [
      "Usar uma única LAN plana para usuários, servidores, impressoras, visitantes e IoT.",
      "Conectar filiais sem criptografia ou controle de tráfego.",
      "Expor storage ou gerenciamento em redes de usuário.",
      "Tratar Wi-Fi de visitantes como se fosse confiável.",
      "Criar subnets públicas em cloud sem necessidade."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que NAT substitui firewall.",
      "Achar que SSID separado sempre significa isolamento real.",
      "Ignorar custo e risco de tráfego entre regiões cloud."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana com movimento lateral",
        "description": "Usuários, servidores e dispositivos diversos ficam no mesmo domínio, facilitando propagação após comprometimento.",
        "defensiveExplanation": "O risco aumenta porque o atacante não encontra barreiras internas suficientes.",
        "mitigation": "Segmentação, ACLs, firewall interno, NAC, EDR e monitoramento."
      },
      {
        "name": "WLAN de visitantes sem isolamento",
        "description": "Convidados conseguem alcançar recursos internos por erro de VLAN, firewall ou portal.",
        "defensiveExplanation": "O meio sem fio amplia acesso físico ao perímetro lógico da organização.",
        "mitigation": "SSID segregado, VLAN dedicada, firewall, captive portal e logs."
      },
      {
        "name": "Exposição indevida em cloud",
        "description": "Workloads ficam em subnet pública ou com security group amplo sem necessidade.",
        "defensiveExplanation": "A internet passa a alcançar serviços que deveriam ser privados.",
        "mitigation": "Private subnets, endpoints privados, security groups mínimos, WAF quando aplicável e revisão de IaC."
      }
    ],
    "monitoring": [
      "Logs de firewall por zona",
      "Autenticação Wi-Fi",
      "NetFlow ou equivalente",
      "Métricas de link WAN",
      "Eventos de security group",
      "Logs de VPN e DNS"
    ],
    "hardening": [
      "Segmentar por função",
      "Desabilitar portas não usadas",
      "Aplicar menor privilégio",
      "Proteger gerência",
      "Usar criptografia em links externos",
      "Revisar rotas e exposição pública"
    ],
    "detectionIdeas": [
      "Acesso de visitantes a redes internas",
      "Picos de tráfego entre segmentos",
      "Conexões incomuns para storage",
      "Mudanças não autorizadas em rotas",
      "Subnets públicas criadas por IaC sem aprovação"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que decorar as siglas PAN, LAN, WLAN, CAN, MAN, WAN e SAN não é suficiente?",
      "hints": [
        "Pense em custo, risco e operação.",
        "Pense no que muda entre Wi-Fi, filial e storage."
      ],
      "expectedIdeas": [
        "alcance",
        "finalidade",
        "meio",
        "controle",
        "segurança",
        "troubleshooting"
      ],
      "explanation": "A utilidade da classificação está em orientar decisões técnicas, não em memorizar nomes."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário acessa sistemas locais, mas não acessa a aplicação hospedada em outra cidade. Que tipo de rede entra como hipótese forte?",
      "hints": [
        "O recurso local funciona.",
        "O destino está distante."
      ],
      "expectedIdeas": [
        "WAN",
        "rota",
        "VPN",
        "operadora",
        "firewall",
        "DNS"
      ],
      "explanation": "Se a LAN funciona, o foco pode se deslocar para WAN, VPN, rota, DNS, firewall ou serviço remoto."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer liberar Wi-Fi de visitantes. Por que não basta criar outro nome de rede?",
      "hints": [
        "SSID não é sempre isolamento.",
        "Pense em VLAN, firewall e logs."
      ],
      "expectedIdeas": [
        "segmentação",
        "VLAN",
        "ACL",
        "firewall",
        "portal",
        "logs",
        "menor privilégio"
      ],
      "explanation": "O SSID é a face visível. O isolamento real depende de segmentação, políticas e validação."
    }
  ],
  "quiz": [
    {
      "id": "q1.3.1",
      "type": "conceito",
      "q": "Qual alternativa descreve melhor uma LAN?",
      "opts": [
        "Rede local sob controle relativamente próximo, como casa, escritório ou andar",
        "Rede global da internet",
        "Rede exclusiva de armazenamento em bloco",
        "Rede pessoal de poucos centímetros"
      ],
      "a": 0,
      "exp": "LAN é uma rede local, normalmente dentro de um ambiente limitado e administrável.",
      "difficulty": "iniciante",
      "topic": "LAN"
    },
    {
      "id": "q1.3.2",
      "type": "comparação",
      "q": "Qual diferença central entre LAN e WLAN?",
      "opts": [
        "WLAN é uma LAN sem fio, normalmente usando rádio/Wi-Fi",
        "LAN sempre é pública e WLAN sempre é privada",
        "WLAN é usada apenas entre cidades",
        "LAN não usa protocolos"
      ],
      "a": 0,
      "exp": "WLAN é uma rede local sem fio. Ela mantém finalidade local, mas muda o meio e os riscos.",
      "difficulty": "iniciante",
      "topic": "WLAN"
    },
    {
      "id": "q1.3.3",
      "type": "cenário",
      "q": "Uma empresa conecta sede e filial em estados diferentes por VPN sobre link de operadora. Qual tipo de rede está mais associado a esse cenário?",
      "opts": [
        "WAN",
        "PAN",
        "SAN",
        "WLAN"
      ],
      "a": 0,
      "exp": "A conexão entre locais distantes é característica de WAN, mesmo quando usa VPN.",
      "difficulty": "iniciante",
      "topic": "WAN"
    },
    {
      "id": "q1.3.4",
      "type": "segurança",
      "q": "Qual é um risco típico de uma LAN plana?",
      "opts": [
        "Facilitar movimento lateral após comprometimento",
        "Reduzir totalmente a latência da internet",
        "Impedir qualquer broadcast",
        "Eliminar necessidade de firewall"
      ],
      "a": 0,
      "exp": "Redes planas reduzem barreiras internas e podem facilitar propagação lateral.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q1.3.5",
      "type": "cloud",
      "q": "Em cloud, qual recurso se aproxima da ideia de uma rede virtual controlada pelo cliente?",
      "opts": [
        "VPC/VNet",
        "Monitor local",
        "Fone Bluetooth",
        "Cabo RJ-45 físico obrigatório"
      ],
      "a": 0,
      "exp": "VPC e VNet representam redes virtuais em provedores cloud, com subnets, rotas e políticas.",
      "difficulty": "iniciante",
      "topic": "cloud"
    },
    {
      "id": "q1.3.6",
      "type": "pegadinha comum",
      "q": "Por que SAN não deve ser tratada como simples Wi-Fi ou compartilhamento de arquivos?",
      "opts": [
        "Porque é uma rede especializada para armazenamento, com requisitos próprios de desempenho, isolamento e disponibilidade",
        "Porque SAN significa internet sem fio",
        "Porque SAN é sempre uma rede doméstica",
        "Porque SAN dispensa qualquer controle de acesso"
      ],
      "a": 0,
      "exp": "SAN é voltada a armazenamento e costuma ser crítica, especializada e altamente controlada.",
      "difficulty": "intermediário",
      "topic": "SAN"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.3.1",
      "front": "O que é PAN?",
      "back": "Personal Area Network: rede de curtíssimo alcance ao redor de uma pessoa, como Bluetooth entre celular e fone.",
      "tags": [
        "PAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.2",
      "front": "O que é LAN?",
      "back": "Local Area Network: rede local, como casa, escritório, laboratório ou andar corporativo.",
      "tags": [
        "LAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.3",
      "front": "O que é WLAN?",
      "back": "Wireless LAN: rede local sem fio, normalmente Wi-Fi, com riscos de rádio, sinal e autenticação.",
      "tags": [
        "WLAN",
        "Wi-Fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.4",
      "front": "O que é WAN?",
      "back": "Wide Area Network: rede de longa distância, usada para conectar filiais, datacenters, internet e cloud.",
      "tags": [
        "WAN"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.3.5",
      "front": "O que é SAN?",
      "back": "Storage Area Network: rede especializada para conectar servidores a armazenamento crítico.",
      "tags": [
        "SAN",
        "storage"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.3.6",
      "front": "Qual pergunta ajuda a classificar um tipo de rede?",
      "back": "Qual é o alcance, a finalidade, o meio, quem controla, qual custo e qual risco?",
      "tags": [
        "arquitetura"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.3.1",
      "type": "conceitual",
      "prompt": "Classifique: celular conectado a relógio inteligente; notebook conectado ao Wi-Fi corporativo; sede conectada à filial; servidor conectado a storage crítico.",
      "expectedAnswer": "Celular-relógio: PAN; notebook no Wi-Fi: WLAN; sede-filial: WAN; servidor-storage crítico: SAN.",
      "explanation": "A classificação depende de alcance e finalidade."
    },
    {
      "id": "ex1.3.2",
      "type": "diagnóstico",
      "prompt": "Um usuário imprime em uma impressora local, mas não acessa um sistema na cloud. O problema está necessariamente na LAN? Explique.",
      "expectedAnswer": "Não. Se a impressora local funciona, parte da LAN/WLAN pode estar operacional. A falha pode estar em DNS, WAN, firewall, proxy, rota, autenticação ou serviço cloud.",
      "explanation": "A separação por tipo evita culpar toda a rede."
    },
    {
      "id": "ex1.3.3",
      "type": "segurança",
      "prompt": "Liste três controles para Wi-Fi de visitantes em uma empresa.",
      "expectedAnswer": "SSID separado, VLAN dedicada, firewall bloqueando rede interna, captive portal, logs, limitação de banda e rotação de credenciais.",
      "explanation": "O objetivo é impedir que visitantes acessem recursos internos."
    },
    {
      "id": "ex1.3.4",
      "type": "cloud",
      "prompt": "Dê dois exemplos de recursos cloud que representam decisões de rede.",
      "expectedAnswer": "VPC/VNet, subnets, route tables, security groups, NAT gateway, VPN, peering, private endpoints, firewall gerenciado.",
      "explanation": "Cloud oculta cabos, mas não elimina arquitetura de rede."
    }
  ],
  "challenge": {
    "title": "Planeje os tipos de rede de uma empresa pequena",
    "scenario": "Uma empresa tem uma sede com 80 usuários, Wi-Fi corporativo, Wi-Fi de visitantes, uma filial em outra cidade, alguns servidores internos, backup em cloud e um storage crítico para virtualização.",
    "tasks": [
      "Identificar quais tipos de rede aparecem no cenário.",
      "Descrever a finalidade de cada tipo.",
      "Indicar pelo menos cinco riscos.",
      "Indicar controles defensivos para cada risco.",
      "Explicar quais evidências validariam o desenho."
    ],
    "constraints": [
      "Visitantes não podem acessar rede interna.",
      "Storage crítico não pode ficar acessível a usuários comuns.",
      "Conexão com filial deve ser segura.",
      "Cloud deve preferir acesso privado quando possível."
    ],
    "expectedDeliverables": [
      "Tabela de tipos de rede",
      "Mapa textual da arquitetura",
      "Lista de riscos e mitigações",
      "Plano de evidências",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Classificação correta dos tipos",
        "points": 30,
        "description": "Identifica LAN, WLAN, WAN, SAN e cloud/híbrida com justificativa."
      },
      {
        "criterion": "Risco e mitigação",
        "points": 30,
        "description": "Aponta riscos reais e controles coerentes."
      },
      {
        "criterion": "Clareza operacional",
        "points": 20,
        "description": "Explica donos, evidências e troubleshooting."
      },
      {
        "criterion": "Integração com cloud e segurança",
        "points": 20,
        "description": "Considera VPN, private endpoints, segmentação e logs."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos o cenário por alcance e finalidade. Depois indicamos quais redes precisam de isolamento e que evidências comprovam cada parte. Por fim, relacionamos riscos e controles.",
    "steps": [
      "Classificar rede local cabeada como LAN.",
      "Classificar Wi-Fi corporativo e de visitantes como WLANs distintas.",
      "Classificar conexão com filial como WAN, possivelmente VPN ou SD-WAN.",
      "Classificar storage crítico como SAN ou rede especializada de armazenamento.",
      "Classificar cloud como rede virtual integrada por VPN, peering ou endpoint privado.",
      "Definir controles: VLANs, firewall, criptografia, logs, private endpoints e isolamento de gerenciamento."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Tudo é LAN porque está na empresa.",
        "whyItIsWrong": "A filial, cloud, Wi-Fi e storage possuem alcance, finalidade e riscos diferentes."
      },
      {
        "answer": "Criar SSID de visitantes basta para isolar.",
        "whyItIsWrong": "SSID não garante isolamento sem VLAN, firewall, política e validação."
      },
      {
        "answer": "Storage pode ficar na mesma rede dos usuários.",
        "whyItIsWrong": "Storage crítico exige isolamento e controle rigoroso para reduzir risco e preservar performance."
      }
    ],
    "finalAnswer": "Uma solução adequada usa LAN para usuários e servidores locais, WLAN corporativa separada da WLAN de visitantes, WAN/VPN para filial, rede especializada para storage, integração cloud preferencialmente privada e controles de segmentação, criptografia, logging e menor privilégio."
  },
  "glossary": [
    {
      "term": "PAN",
      "shortDefinition": "Rede pessoal de curto alcance.",
      "longDefinition": "Personal Area Network, usada para comunicação entre dispositivos próximos de uma pessoa, como celular, fone e wearable.",
      "example": "Celular conectado a um fone Bluetooth.",
      "relatedTerms": [
        "Bluetooth",
        "periférico",
        "pareamento"
      ],
      "relatedLessons": [
        "1.3",
        "12.1"
      ]
    },
    {
      "term": "LAN",
      "shortDefinition": "Rede local.",
      "longDefinition": "Local Area Network, usada para conectar dispositivos dentro de um espaço limitado como casa, escritório, laboratório ou andar.",
      "example": "Computadores ligados a switches em uma empresa.",
      "relatedTerms": [
        "Ethernet",
        "switch",
        "VLAN"
      ],
      "relatedLessons": [
        "1.3",
        "3.1"
      ]
    },
    {
      "term": "WLAN",
      "shortDefinition": "Rede local sem fio.",
      "longDefinition": "Wireless Local Area Network, normalmente implementada com Wi-Fi e access points.",
      "example": "Wi-Fi corporativo autenticado por usuário.",
      "relatedTerms": [
        "Wi-Fi",
        "SSID",
        "access point"
      ],
      "relatedLessons": [
        "1.3",
        "12.1"
      ]
    },
    {
      "term": "WAN",
      "shortDefinition": "Rede de longa distância.",
      "longDefinition": "Wide Area Network, usada para conectar locais distantes, filiais, datacenters, internet e cloud.",
      "example": "VPN entre sede e filial.",
      "relatedTerms": [
        "VPN",
        "SD-WAN",
        "operadora",
        "SLA"
      ],
      "relatedLessons": [
        "1.3",
        "10.1",
        "11.1"
      ]
    },
    {
      "term": "SAN",
      "shortDefinition": "Rede de armazenamento.",
      "longDefinition": "Storage Area Network, rede especializada para conectar servidores a armazenamento crítico em datacenter.",
      "example": "Cluster de virtualização acessando storage por rede dedicada.",
      "relatedTerms": [
        "storage",
        "iSCSI",
        "Fibre Channel",
        "multipath"
      ],
      "relatedLessons": [
        "1.3"
      ]
    },
    {
      "term": "Domínio administrativo",
      "shortDefinition": "Quem controla uma rede ou parte dela.",
      "longDefinition": "Indica se a rede é gerida pela própria organização, operadora, provedor cloud ou terceiro.",
      "example": "A LAN da empresa é interna; o link de operadora pertence a terceiro.",
      "relatedTerms": [
        "SLA",
        "responsabilidade compartilhada",
        "operadora"
      ],
      "relatedLessons": [
        "1.3",
        "14.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802 family",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/ieee/802/",
      "note": "Família de padrões associada a redes locais e metropolitanas, incluindo Ethernet e Wi-Fi."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m00",
      "note": "Base conceitual de bits, sinais, protocolos, latência e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "internal://infra-platform-devsecops",
      "note": "Relação com IaC, pipelines, cloud, Kubernetes e ambientes híbridos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "lesson": "redes virtuais e automação",
      "reason": "VPC, VNet, subnets e security groups são tipos de rede representados como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Acesso remoto e confiança",
      "lesson": "identidade em acesso de rede",
      "reason": "VPN, ZTNA e acesso a redes internas dependem de identidade, política e segmentação."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "1.4"
    ]
  }
};
