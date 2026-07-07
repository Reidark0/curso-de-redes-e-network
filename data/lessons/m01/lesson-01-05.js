export const lesson0105 = {
  "id": "1.5",
  "moduleId": "m01",
  "order": 5,
  "title": "Meios de transmissão: cobre, fibra e rádio",
  "subtitle": "Como sinais atravessam cabos metálicos, fibras ópticas e o ar — e como isso muda desempenho, custo, risco e troubleshooting.",
  "duration": "75-110 min",
  "estimatedStudyTimeMinutes": 110,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 190,
  "tags": [
    "redes",
    "fundamentos",
    "camada física",
    "cobre",
    "fibra",
    "rádio",
    "wi-fi",
    "interferência",
    "atenuação",
    "troubleshooting",
    "segurança física"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "A aula 0.5 explicou como sinais físicos carregam dados em nível introdutório."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias dizem como os pontos se conectam; meios de transmissão explicam por onde os sinais passam."
    }
  ],
  "objectives": [
    "Diferenciar cobre, fibra óptica e rádio como meios de transmissão.",
    "Entender por que distância, interferência, atenuação, ruído e meio compartilhado afetam redes.",
    "Relacionar escolha do meio com custo, desempenho, segurança e operação.",
    "Reconhecer sintomas comuns de falhas físicas e sem fio.",
    "Planejar uma escolha básica de meio para casa, empresa, datacenter, campus e cloud connectivity."
  ],
  "learningOutcomes": [
    "Dado um cenário, o aluno escolhe cobre, fibra ou rádio com justificativa técnica.",
    "Dado um sintoma de instabilidade, o aluno levanta hipóteses de camada física e coleta evidências iniciais.",
    "Dado um desenho de rede, o aluno identifica riscos de segurança física, interferência e exposição do meio."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma rede pode estar perfeitamente configurada em IP, DNS, firewall e aplicação, mas ainda assim falhar porque o sinal não chega bem. Um cabo amassado, um conector mal crimpado, uma fibra com curvatura excessiva, um rádio sofrendo interferência ou um access point instalado no lugar errado podem causar sintomas que parecem problemas de sistema, de cloud ou de segurança.</p>\n  <p>No trabalho real, muita gente pula a camada física porque ela parece “simples demais”. Só que redes não transportam conceitos abstratos; elas transportam sinais. Antes do pacote IP, antes do TCP, antes do TLS, antes da API e antes do login, existe algum meio tentando carregar variações elétricas, pulsos de luz ou ondas eletromagnéticas.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma filial reclama que a VPN cai. O time de aplicação culpa o sistema, o SOC suspeita de ataque, o provedor diz que o link está ativo, mas o switch mostra erros de CRC na porta. O problema não era a VPN: era o meio físico degradando os quadros.</div>\n</section>\n",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As primeiras redes usavam meios físicos relativamente simples e compartilhados, como cabos coaxiais em barramento. Com a popularização da Ethernet comutada, cabos de par trançado passaram a dominar escritórios e redes locais. Eles eram baratos, fáceis de instalar e suficientes para conectar computadores, switches, impressoras e telefones IP.</p>\n  <p>Quando distância, velocidade, imunidade a ruído e backbone passaram a ser mais importantes, a fibra óptica ganhou espaço. Em vez de eletricidade em cobre, ela usa luz em vidro ou plástico, permitindo maior alcance, altas taxas e menor suscetibilidade a interferência eletromagnética.</p>\n  <p>O rádio, por sua vez, tornou a rede móvel. Wi-Fi, Bluetooth, 4G, 5G, rádio ponto-a-ponto e IoT resolveram o problema de conectar dispositivos sem cabo, mas trouxeram novos desafios: interferência, espectro compartilhado, alcance variável, obstáculos físicos, autenticação sem fio e maior exposição do meio.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é escolher e operar o meio correto para a necessidade correta. Todo meio de transmissão tem limites. Cobre tem distância, categoria, interferência, qualidade de conector e negociação. Fibra tem tipo de fibra, transceptor, conector, potência óptica, raio de curvatura e custo. Rádio tem espectro, canal, potência, obstáculos, ruído, densidade de clientes e segurança.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem entender cobre:</strong> você pode culpar IP quando a porta está negociando errado ou gerando erros físicos.</li>\n    <li><strong>Sem entender fibra:</strong> você pode tratar backbone como “cabo mágico” e ignorar transceptores, conectores e orçamento óptico.</li>\n    <li><strong>Sem entender rádio:</strong> você pode prometer estabilidade de cabo em um meio compartilhado e sujeito a interferência.</li>\n    <li><strong>Sem entender segurança do meio:</strong> portas expostas, racks abertos, Wi-Fi mal configurado e fibras sem controle físico viram risco.</li>\n  </ul>\n</section>\n",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução dos meios acompanhou uma tensão constante entre custo, mobilidade, distância, desempenho, segurança e facilidade de operação.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Meio</th><th>Como transporta dados</th><th>Vantagens</th><th>Limitações</th><th>Uso típico</th></tr></thead>\n    <tbody>\n      <tr><td>Cobre/par trançado</td><td>Sinais elétricos em pares de fios</td><td>Barato, comum, alimenta PoE, fácil em LAN</td><td>Distância limitada, interferência, qualidade de conector</td><td>Estações, impressoras, APs, câmeras, telefones IP</td></tr>\n      <tr><td>Fibra óptica</td><td>Pulsos de luz em fibra</td><td>Longo alcance, alta taxa, menos interferência eletromagnética</td><td>Mais cuidado físico, transceptores, custo e limpeza</td><td>Backbone, datacenter, campus, operadora, interligação de prédios</td></tr>\n      <tr><td>Rádio/Wi-Fi</td><td>Ondas eletromagnéticas pelo ar</td><td>Mobilidade, flexibilidade, instalação rápida</td><td>Meio compartilhado, interferência, obstáculos, risco de exposição</td><td>Usuários móveis, visitantes, IoT, ambientes sem cabeamento</td></tr>\n    </tbody>\n  </table>\n  <p>Na prática moderna, os três convivem. Um notebook pode usar Wi-Fi até um AP, o AP usa cobre até o switch, o switch usa fibra até o core e a empresa usa circuitos de operadora para chegar à cloud.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Meio de transmissão é o caminho físico ou sem fio pelo qual o sinal de rede é propagado entre dispositivos. Ele não define sozinho o protocolo, o endereço ou a aplicação, mas impõe limites importantes sobre velocidade, distância, estabilidade, custo e risco.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em redes, cobre, fibra e rádio são meios usados para transportar sinais que representam bits. O cobre usa variações elétricas; a fibra usa luz; o rádio usa ondas eletromagnéticas no ar.</div>\n  <p>Entender o meio evita diagnósticos mágicos. Quando você vê perda, jitter, renegociação, desconexão, baixa taxa, ruído ou instabilidade intermitente, precisa lembrar que os protocolos dependem de uma base física suficientemente confiável.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno varia por meio, mas o ciclo mental é parecido: o transmissor codifica bits em um sinal, o meio propaga esse sinal, o receptor tenta interpretar a variação recebida e os equipamentos superiores validam quadros, erros e retransmissões.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Cobre:</strong> a placa ou porta de switch transforma bits em variações elétricas nos pares de fios. O trançamento ajuda a reduzir interferência, mas não elimina problemas de distância, blindagem, conector e ruído.</li>\n    <li><strong>Fibra:</strong> transceptores convertem sinais elétricos em pulsos de luz. A luz viaja pela fibra até outro transceptor, que converte de volta para sinal elétrico.</li>\n    <li><strong>Rádio:</strong> o rádio modula informação em ondas eletromagnéticas. O receptor precisa distinguir sinal útil de ruído, interferência e reflexões.</li>\n    <li><strong>Validação:</strong> se o sinal chega degradado, quadros podem ter erro, pacotes podem ser perdidos, protocolos superiores retransmitem e o usuário percebe lentidão ou queda.</li>\n  </ol>\n  <p>Esse é o motivo pelo qual um problema físico pode aparecer como problema de aplicação. TCP retransmite, TLS demora, HTTP parece lento e o usuário diz apenas “o sistema caiu”.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, meios de transmissão aparecem em camadas de acesso, distribuição, core, datacenter, campus, WAN e cloud connectivity.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Acesso:</strong> cobre para estações, telefones IP, câmeras e APs; Wi-Fi para mobilidade.</li>\n    <li><strong>Distribuição e core:</strong> fibra para uplinks de alta capacidade e maior distância.</li>\n    <li><strong>Datacenter:</strong> cobre de curta distância e fibra para uplinks, storage, spine-leaf e interconexões.</li>\n    <li><strong>Campus:</strong> fibra entre prédios; cobre dentro de salas; rádio onde cabeamento não atende.</li>\n    <li><strong>Cloud:</strong> o meio físico é abstraído, mas links dedicados, VPN, interconexão e região ainda dependem de infraestrutura física real.</li>\n  </ul>\n  <p>Arquitetura boa não escolhe meio por moda. Ela escolhe meio com base em requisitos: alcance, disponibilidade, taxa, latência, custo, segurança, manutenção e crescimento.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense nos meios como estradas diferentes para entregar mensagens. O cobre é como uma rua interna barata e prática. A fibra é como uma rodovia expressa de alta capacidade entre cidades. O rádio é como uma conversa por alto-falante em um ambiente aberto: prático, móvel, mas sujeito a ruído e pessoas escutando se não houver proteção.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não transportam carros nem envelopes físicos. Sinais sofrem fenômenos como atenuação, interferência, reflexão, modulação, codificação e erro, que a analogia simplifica demais.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, seu celular usa rádio até o roteador Wi‑Fi. O roteador pode usar cobre até o modem ou ONT. A operadora pode usar fibra até o prédio ou até sua residência. Quando o Wi‑Fi fica ruim no quarto, pode não haver problema de internet: pode ser distância, parede, canal congestionado, potência baixa ou interferência.</p>\n  <p>Se você conecta o notebook por cabo e a experiência melhora, isso não “prova” que a internet era ruim; sugere que o trecho sem fio era o gargalo principal.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, estações usam cobre até switches de acesso. APs usam cobre com PoE. Switches de acesso usam fibra para o core. Racks devem ser organizados, etiquetados e protegidos. Salas críticas podem usar caminhos redundantes para evitar que uma única fibra rompida derrube um prédio inteiro.</p>\n  <p>Em troubleshooting empresarial, evidências físicas importam: porta down, velocidade negociada diferente do esperado, duplex incorreto, erros CRC, contadores de input errors, potência óptica fora da faixa, AP com muitos clientes ou canal saturado.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Cloud parece virtual, mas depende de redes físicas em datacenters e interconexões. Uma VPC ou VNet abstrai switches, roteadores e fibras, mas zonas de disponibilidade, regiões, links dedicados e latência entre locais ainda refletem limites físicos.</p>\n  <p>Ao usar VPN site-to-site, Direct Connect, ExpressRoute ou interconexões equivalentes, a escolha do caminho físico e do provedor afeta disponibilidade, latência, custo e risco. Uma arquitetura multi-região também não elimina física: ela distribui dependência por locais diferentes.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, meio de transmissão parece distante, mas aparece quando pipelines dependem de runners locais, conexões com registry, mirrors de pacotes, clusters Kubernetes on-premises e links para cloud. Um deploy pode falhar porque a imagem não baixa, o registry fica lento ou o link entre ambiente local e cloud satura.</p>\n  <p>Automação também precisa considerar meio físico. IaC cria subnets e gateways, mas não instala fibra no prédio. Observabilidade precisa separar falha de aplicação, falha de DNS, falha de rota e falha de link.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Meios de transmissão têm impactos diretos em segurança. Portas Ethernet em salas públicas podem permitir conexão indevida. Racks destrancados facilitam acesso físico. Wi‑Fi mal configurado expõe a rede fora das paredes da empresa. Fibras e enlaces críticos sem proteção física criam risco de indisponibilidade.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Porta física exposta</td><td>Ponto de rede ativo em área pública</td><td>Acesso não autorizado ou ponte indevida</td><td>802.1X, NAC, shutdown de portas não usadas, VLAN de quarentena</td></tr>\n      <tr><td>Wi-Fi fraco</td><td>Senha compartilhada, WPA antigo, rede visitante sem isolamento</td><td>Acesso indevido e movimento lateral</td><td>WPA3/WPA2-Enterprise quando possível, segmentação, logs e rotação de credenciais</td></tr>\n      <tr><td>Rompimento físico</td><td>Cabo/fibra sem proteção, rota única</td><td>Indisponibilidade</td><td>Redundância, rotas físicas distintas, documentação e monitoramento</td></tr>\n      <tr><td>Interferência</td><td>Ruído em cobre ou rádio</td><td>Perda, retransmissão, instabilidade</td><td>Certificação de cabos, planejamento de canais, análise de espectro e boas práticas de instalação</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m01l05-title m01l05-desc\">\n    <title id=\"m01l05-title\">Cobre, fibra e rádio como meios de transmissão</title>\n    <desc id=\"m01l05-desc\">O diagrama mostra cliente Wi-Fi, ponto de acesso, switch, fibra para core e serviço, destacando ruído, atenuação e limites do meio.</desc>\n    <defs>\n      <marker id=\"m01l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"120\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"120\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rádio/Wi‑Fi</text>\n    <rect x=\"285\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"370\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Access Point</text>\n    <text x=\"370\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cobre + PoE</text>\n    <rect x=\"535\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"620\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"620\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Uplink</text>\n    <rect x=\"785\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"870\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Core/Serviço</text>\n    <text x=\"870\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Fibra</text>\n    <path d=\"M205 110 C235 40, 255 180, 285 110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <line x1=\"455\" y1=\"110\" x2=\"535\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <line x1=\"705\" y1=\"110\" x2=\"785\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <rect x=\"60\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"180\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Rádio</text>\n    <text x=\"180\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mobilidade, canal, obstáculos</text>\n    <text x=\"180\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interferência e meio compartilhado</text>\n    <rect x=\"370\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <text x=\"490\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">baixo custo, PoE, até o acesso</text>\n    <text x=\"490\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">distância, conector, ruído</text>\n    <rect x=\"680\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"800\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Fibra</text>\n    <text x=\"800\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">alta taxa e longo alcance</text>\n    <text x=\"800\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">transceptor, limpeza, curvatura</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a escolha do meio correto para cenários de distância, mobilidade, segurança e custo.</p>\n</section>\n",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio pede que você desenhe a escolha de meios para uma pequena empresa com sala administrativa, estoque, Wi‑Fi de visitantes, câmeras e um rack central.</p>\n</section>\n",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como justificar cobre, fibra e rádio por requisito, não por preferência pessoal.</p>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> redes dependem de meios físicos ou sem fio para transportar sinais.</li>\n    <li><strong>O que lembrar:</strong> cobre é comum no acesso, fibra é forte em backbone e rádio oferece mobilidade.</li>\n    <li><strong>Erro comum:</strong> culpar IP, DNS ou aplicação sem verificar link, sinal, porta, cabo, fibra ou Wi‑Fi.</li>\n    <li><strong>Uso real:</strong> escolher e diagnosticar meios reduz indisponibilidade, custo e risco.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Depois de entender os meios de transmissão, o próximo passo será cabeamento estruturado e padrões RJ‑45. Vamos sair da visão geral do meio e entrar na organização prática de tomadas, patch panels, racks, categorias de cabo e documentação física.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi-Fi",
      "PoE",
      "LLDP",
      "CDP"
    ],
    "dependsOn": [
      "representação digital",
      "sinais físicos",
      "topologia física e lógica"
    ],
    "enables": [
      "cabeamento estruturado",
      "switching",
      "Wi-Fi",
      "troubleshooting físico",
      "segurança de portas"
    ]
  },
  "deepDive": {
    "mentalModel": "Antes de culpar um protocolo, pergunte: o sinal chega bem? O meio escolhido é adequado para distância, ambiente, interferência, mobilidade, custo e risco?",
    "keyTerms": [
      "cobre",
      "fibra óptica",
      "rádio",
      "atenuação",
      "interferência",
      "ruído",
      "SNR",
      "CRC",
      "PoE",
      "transceptor",
      "canal"
    ],
    "limitations": [
      "Cobre é prático, mas tem distância e sensibilidade a instalação ruim.",
      "Fibra oferece alcance e taxa, mas exige cuidado com conectores, curvatura e transceptores.",
      "Rádio oferece mobilidade, mas é meio compartilhado e exposto ao ambiente.",
      "Cloud abstrai o meio físico, mas não elimina distância, latência e dependência de interconexão."
    ],
    "whenToUse": [
      "Use cobre para acesso cabeado comum e PoE dentro de limites adequados.",
      "Use fibra para backbone, interligação de racks, prédios, datacenters e enlaces longos.",
      "Use rádio para mobilidade, visitantes, ambientes sem cabeamento e dispositivos móveis.",
      "Use redundância quando o meio for crítico para operação."
    ],
    "whenNotToUse": [
      "Não use Wi‑Fi como substituto automático de cabo para sistemas críticos sem avaliação.",
      "Não use cobre para distâncias fora da especificação.",
      "Não use fibra sem controle físico, limpeza, documentação e transceptores compatíveis.",
      "Não deixe portas de rede ativas em áreas públicas sem controle."
    ],
    "operationalImpact": [
      "Meios mal documentados aumentam tempo de troubleshooting.",
      "Cobre facilita suporte local, mas exige organização de rack e certificação de cabos.",
      "Fibra reduz interferência, mas exige equipe preparada para manuseio e diagnóstico.",
      "Wi‑Fi exige planejamento de canais, potência, densidade e autenticação."
    ],
    "financialImpact": [
      "Cobre costuma ter menor custo por ponto de acesso local.",
      "Fibra pode custar mais em transceptores, instalação e manutenção, mas viabiliza backbone robusto.",
      "Wi‑Fi reduz cabeamento para usuários móveis, mas exige APs, controladora ou gestão, site survey e manutenção.",
      "Redundância física aumenta custo, mas reduz impacto financeiro de indisponibilidade."
    ],
    "securityImpact": [
      "Portas físicas expostas aumentam risco de acesso indevido.",
      "Wi‑Fi ultrapassa paredes e exige autenticação e segmentação fortes.",
      "Racks e fibras críticas precisam de controle físico.",
      "Monitorar mudanças de link e portas ajuda a detectar conexões não autorizadas."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que cabo conectado significa link saudável.",
      "whyItHappens": "A luz da porta acende e parece suficiente.",
      "consequence": "Erros físicos e retransmissões continuam ocultos.",
      "correction": "Verificar velocidade negociada, duplex, contadores de erro e histórico de flaps."
    },
    {
      "mistake": "Tratar Wi‑Fi como se fosse cabo invisível.",
      "whyItHappens": "O usuário só vê que está conectado.",
      "consequence": "Mobilidade, interferência, canal e densidade são ignorados.",
      "correction": "Planejar cobertura, canal, potência, autenticação e capacidade."
    },
    {
      "mistake": "Escolher fibra apenas por ser mais rápida.",
      "whyItHappens": "Fibra é associada a alto desempenho.",
      "consequence": "Pode haver custo e complexidade desnecessários.",
      "correction": "Justificar fibra por distância, backbone, imunidade a ruído, taxa ou isolamento elétrico."
    },
    {
      "mistake": "Ignorar segurança física.",
      "whyItHappens": "O foco fica em firewall e senha.",
      "consequence": "Um atacante interno ou visitante pode conectar equipamento indevido.",
      "correction": "Aplicar controle de portas, NAC, 802.1X, inventário e travamento físico."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "link cai e volta",
      "baixa velocidade negociada",
      "muitos erros CRC",
      "Wi‑Fi instável",
      "latência variável",
      "perda em horários de pico",
      "AP sobrecarregado"
    ],
    "diagnosticQuestions": [
      "O problema ocorre por cabo e por Wi‑Fi ou apenas em um meio?",
      "A velocidade negociada é a esperada?",
      "Há erros físicos na porta do switch?",
      "A fibra usa transceptor compatível e está limpa?",
      "O Wi‑Fi está em canal congestionado ou com sinal fraco?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Select-Object Name, Status, LinkSpeed",
        "purpose": "Ver adaptadores e velocidade negociada.",
        "expectedObservation": "Interface ativa com velocidade coerente com o ambiente.",
        "interpretation": "Velocidade abaixo do esperado pode indicar cabo, porta, driver ou negociação."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver informações do Wi‑Fi, sinal, rádio e SSID.",
        "expectedObservation": "Sinal e taxa coerentes com a distância do AP.",
        "interpretation": "Sinal baixo ou taxa instável sugerem problema sem fio."
      },
      {
        "platform": "Linux",
        "command": "ip link show && ethtool <interface>",
        "purpose": "Ver estado do link e detalhes de negociação em interface cabeada.",
        "expectedObservation": "Link detected: yes e speed esperada.",
        "interpretation": "Ausência de link ou speed inesperada aponta para camada física ou driver."
      },
      {
        "platform": "Linux",
        "command": "iw dev && iw dev <interface> link",
        "purpose": "Ver interface Wi‑Fi, SSID, sinal e taxa.",
        "expectedObservation": "Sinal em dBm e informações de link.",
        "interpretation": "Sinal muito fraco ou taxa baixa indica problema de rádio."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status",
        "purpose": "Ver portas, VLAN, duplex e speed.",
        "expectedObservation": "Portas conectadas com speed/duplex esperados.",
        "interpretation": "Speed/duplex anormais sugerem cabo, endpoint ou configuração."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces counters errors",
        "purpose": "Ver erros físicos e de quadros.",
        "expectedObservation": "Contadores de erro baixos ou zerados.",
        "interpretation": "CRC, input errors e drops ajudam a detectar problema físico."
      }
    ],
    "decisionTree": [
      {
        "if": "Somente Wi‑Fi falha",
        "then": "Verificar sinal, canal, interferência, quantidade de clientes, autenticação e distância do AP."
      },
      {
        "if": "Somente cabo falha",
        "then": "Verificar cabo, porta, patch panel, velocidade negociada, duplex e erros no switch."
      },
      {
        "if": "Backbone apresenta perda",
        "then": "Verificar fibra, transceptor, potência óptica, caminho físico e redundância."
      },
      {
        "if": "Aplicação lenta sem perda local",
        "then": "Investigar camadas superiores, rota, firewall, DNS, TLS e servidor."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Desativar portas não utilizadas.",
      "Usar 802.1X/NAC quando possível.",
      "Separar Wi‑Fi corporativo e visitante.",
      "Proteger racks, patch panels e salas técnicas.",
      "Documentar enlaces críticos e rotas físicas.",
      "Monitorar mudanças de link e conexões inesperadas."
    ],
    "badPractices": [
      "Deixar pontos de rede ativos em áreas públicas.",
      "Compartilhar senha única de Wi‑Fi corporativo por anos.",
      "Misturar visitantes e rede interna.",
      "Não etiquetar cabos e fibras.",
      "Ignorar erros físicos recorrentes."
    ],
    "commonErrors": [
      "Confundir disponibilidade de link com autorização de acesso.",
      "Achar que Wi‑Fi com senha simples equivale a rede segura.",
      "Não registrar quem pode acessar rack e sala técnica.",
      "Ignorar logs de switch e controladora sem fio."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso físico indevido",
        "description": "Portas de rede ou racks acessíveis permitem conexão de equipamentos não autorizados.",
        "defensiveExplanation": "O risco não depende de exploração sofisticada; basta uma porta ativa e ausência de controle.",
        "mitigation": "Desativar portas, usar NAC/802.1X, inventário, alertas e segurança física."
      },
      {
        "name": "Wi‑Fi exposto além do perímetro",
        "description": "Sinal sem fio atravessa paredes e pode ser alcançado de áreas externas.",
        "defensiveExplanation": "O atacante não precisa entrar fisicamente para tentar associação ou capturar metadados.",
        "mitigation": "Usar autenticação forte, segmentação, senha robusta, controle de potência e monitoramento."
      },
      {
        "name": "Indisponibilidade por meio único",
        "description": "Um único cabo, fibra ou rádio crítico sem redundância cria ponto único de falha.",
        "defensiveExplanation": "Falhas físicas podem derrubar serviços mesmo com aplicações corretas.",
        "mitigation": "Redundância, rotas físicas distintas, monitoramento e testes de failover."
      }
    ],
    "monitoring": [
      "Eventos de link up/down",
      "mudança de velocidade de porta",
      "erros CRC",
      "clientes Wi‑Fi desconhecidos",
      "APs rogue",
      "alterações de MAC em portas",
      "perda em enlaces críticos"
    ],
    "hardening": [
      "Port-security quando aplicável",
      "802.1X",
      "NAC",
      "VLAN de quarentena",
      "WPA2/WPA3-Enterprise",
      "controle físico de rack",
      "etiquetagem e documentação"
    ],
    "detectionIdeas": [
      "Alertar porta ativa fora de horário",
      "Comparar inventário de MACs esperados",
      "Monitorar flaps de interface",
      "Auditar SSIDs e APs não autorizados",
      "Revisar contadores de erro periodicamente"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não basta dizer que 'a rede está configurada' se o meio físico está instável?",
      "hints": [
        "Pense em sinal antes de pacote.",
        "Pense em retransmissões e perda."
      ],
      "expectedIdeas": [
        "camada física",
        "sinal",
        "erro",
        "retransmissão",
        "sintoma de aplicação"
      ],
      "explanation": "Protocolos superiores dependem de um meio suficientemente confiável. Se o sinal falha, as camadas superiores sofrem."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário via Wi‑Fi reclama de lentidão, mas via cabo o sistema funciona bem. Que hipóteses você testaria?",
      "hints": [
        "Pense em sinal, canal e densidade.",
        "Não culpe DNS primeiro."
      ],
      "expectedIdeas": [
        "sinal fraco",
        "interferência",
        "canal congestionado",
        "AP sobrecarregado",
        "roaming",
        "distância"
      ],
      "explanation": "A comparação cabo versus Wi‑Fi ajuda a localizar o problema no meio sem fio ou no acesso."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa vai interligar dois prédios próximos. Quando fibra é mais justificável do que cobre?",
      "hints": [
        "Pense em distância e interferência.",
        "Pense em isolamento elétrico e backbone."
      ],
      "expectedIdeas": [
        "distância",
        "alta capacidade",
        "imunidade eletromagnética",
        "backbone",
        "segurança física",
        "custo justificado"
      ],
      "explanation": "Fibra é especialmente forte em interligação, backbone e distâncias maiores, mas deve ser justificada por requisito."
    }
  ],
  "quiz": [
    {
      "id": "q1.5.1",
      "type": "conceito",
      "q": "Qual alternativa descreve corretamente a diferença entre cobre, fibra e rádio?",
      "opts": [
        "Cobre usa sinais elétricos, fibra usa luz e rádio usa ondas eletromagnéticas.",
        "Todos usam exatamente o mesmo tipo de sinal.",
        "Fibra é sempre sem fio.",
        "Rádio só funciona dentro de cabos blindados."
      ],
      "a": 0,
      "exp": "Cada meio transporta o sinal de forma diferente, com vantagens e limitações próprias.",
      "difficulty": "iniciante",
      "topic": "meios"
    },
    {
      "id": "q1.5.2",
      "type": "diagnóstico",
      "q": "Uma porta de switch mostra muitos erros CRC. Qual hipótese deve ser considerada?",
      "opts": [
        "Problema físico, cabo, conector ou interferência.",
        "Erro de senha do usuário.",
        "Falha exclusiva de DNS.",
        "Certificado TLS expirado."
      ],
      "a": 0,
      "exp": "CRC aponta para quadros corrompidos, frequentemente relacionados ao meio físico ou porta.",
      "difficulty": "iniciante-intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q1.5.3",
      "type": "comparação",
      "q": "Qual é uma vantagem comum da fibra óptica?",
      "opts": [
        "Maior alcance e menor suscetibilidade a interferência eletromagnética.",
        "Não precisa de conectores.",
        "É sempre mais barata que cobre.",
        "Elimina a necessidade de documentação."
      ],
      "a": 0,
      "exp": "Fibra é forte para backbone e longas distâncias, mas exige conectores, transceptores e documentação.",
      "difficulty": "iniciante",
      "topic": "fibra"
    },
    {
      "id": "q1.5.4",
      "type": "segurança",
      "q": "Qual prática reduz risco de portas físicas expostas?",
      "opts": [
        "Desativar portas não usadas e usar NAC/802.1X quando possível.",
        "Deixar todas as portas na VLAN interna.",
        "Usar senha fraca no Wi‑Fi.",
        "Não monitorar link up/down."
      ],
      "a": 0,
      "exp": "Controle de porta e autenticação ajudam a impedir conexão indevida.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q1.5.5",
      "type": "cenário",
      "q": "Por que Wi‑Fi não deve ser tratado como cabo invisível?",
      "opts": [
        "Porque rádio é meio compartilhado, sujeito a interferência, obstáculos e variação de sinal.",
        "Porque Wi‑Fi não usa protocolos.",
        "Porque Wi‑Fi não transporta bits.",
        "Porque Wi‑Fi sempre é mais seguro que cabo."
      ],
      "a": 0,
      "exp": "Wi‑Fi oferece mobilidade, mas o meio de rádio muda a previsibilidade e o risco.",
      "difficulty": "iniciante-intermediário",
      "topic": "wi-fi"
    },
    {
      "id": "q1.5.6",
      "type": "cloud",
      "q": "Em cloud, por que ainda importa entender meios físicos?",
      "opts": [
        "Porque regiões, zonas, interconexões e latência dependem de infraestrutura física real.",
        "Porque cloud elimina completamente distância.",
        "Porque VPCs são cabos de cobre visíveis.",
        "Porque TLS substitui enlaces físicos."
      ],
      "a": 0,
      "exp": "Cloud abstrai, mas não remove limites físicos como distância, interconexão e disponibilidade.",
      "difficulty": "intermediário",
      "topic": "cloud"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.5.1",
      "front": "O que é meio de transmissão?",
      "back": "É o caminho físico ou sem fio pelo qual sinais de rede são propagados entre dispositivos.",
      "tags": [
        "camada física"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.2",
      "front": "Como o cobre transporta dados?",
      "back": "Por variações elétricas em fios, normalmente pares trançados em redes Ethernet modernas.",
      "tags": [
        "cobre"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.3",
      "front": "Como a fibra transporta dados?",
      "back": "Por pulsos de luz convertidos por transceptores ópticos.",
      "tags": [
        "fibra"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.4",
      "front": "Por que rádio é mais variável?",
      "back": "Porque usa o ar como meio, sujeito a interferência, obstáculos, distância, ruído e compartilhamento de canal.",
      "tags": [
        "rádio",
        "wi-fi"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.5.5",
      "front": "O que erros CRC podem indicar?",
      "back": "Quadros corrompidos, muitas vezes associados a cabo, porta, interferência ou problema físico.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.5.6",
      "front": "Qual risco existe em portas de rede ativas em áreas públicas?",
      "back": "Conexão de dispositivos não autorizados, exigindo controles como desativação de portas, NAC e 802.1X.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.5.1",
      "type": "conceitual",
      "prompt": "Explique quando você escolheria cobre, fibra e rádio em uma rede pequena.",
      "expectedAnswer": "Cobre para pontos fixos e APs, fibra para backbone/interligação/longa distância, rádio para mobilidade e visitantes.",
      "explanation": "A escolha deve seguir requisito, não preferência."
    },
    {
      "id": "ex1.5.2",
      "type": "diagnóstico",
      "prompt": "Um desktop cabeado negocia a 100 Mbps em uma rede esperada de 1 Gbps. Liste três hipóteses.",
      "expectedAnswer": "Cabo inadequado ou danificado, porta limitada, conector ruim, driver/configuração, patch panel ou equipamento intermediário limitado.",
      "explanation": "Velocidade negociada abaixo do esperado costuma apontar para camada física ou capacidade do equipamento."
    },
    {
      "id": "ex1.5.3",
      "type": "segurança",
      "prompt": "Liste quatro controles para reduzir risco de acesso físico indevido por cabo.",
      "expectedAnswer": "Desativar portas sem uso, NAC/802.1X, port-security quando aplicável, VLAN de quarentena, controle físico de racks e inventário.",
      "explanation": "Segurança de rede começa também no ponto físico de conexão."
    },
    {
      "id": "ex1.5.4",
      "type": "arquitetura",
      "prompt": "Uma empresa tem dois prédios e precisa interligá-los com baixa latência e alta disponibilidade. Que meio você avaliaria e que cuidado adicionaria?",
      "expectedAnswer": "Fibra óptica, com redundância, rotas físicas distintas quando possível, documentação, monitoramento e transceptores compatíveis.",
      "explanation": "Fibra atende distância e capacidade, mas disponibilidade depende de desenho e operação."
    }
  ],
  "challenge": {
    "title": "Escolha de meios para uma pequena empresa",
    "scenario": "Uma empresa possui recepção pública, sala administrativa, estoque com coletores móveis, câmeras IP, Wi‑Fi de visitantes, rack central e possibilidade futura de interligar outro prédio.",
    "tasks": [
      "Definir onde usar cobre, fibra e rádio.",
      "Indicar riscos de cada meio.",
      "Propor controles mínimos de segurança.",
      "Indicar evidências de troubleshooting para cada meio."
    ],
    "constraints": [
      "Evitar gasto desnecessário.",
      "Visitantes não podem acessar rede interna.",
      "Câmeras precisam de estabilidade.",
      "O desenho deve permitir crescimento."
    ],
    "expectedDeliverables": [
      "Tabela de meios por área",
      "Lista de riscos",
      "Controles de segurança",
      "Plano de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Escolha técnica dos meios",
        "points": 30,
        "description": "Justifica cobre, fibra e rádio por requisito."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Inclui segmentação, controle de portas, Wi‑Fi visitante e proteção física."
      },
      {
        "criterion": "Operação",
        "points": 25,
        "description": "Prevê documentação, monitoramento e troubleshooting."
      },
      {
        "criterion": "Custo e crescimento",
        "points": 20,
        "description": "Evita excesso e deixa caminho para expansão."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separam-se pontos fixos, móveis, críticos e públicos. Depois escolhe-se meio por requisito: estabilidade, mobilidade, distância, segurança e custo.",
    "steps": [
      "Usar cobre para desktops, câmeras IP e APs quando dentro de distância adequada.",
      "Usar PoE para APs e câmeras se os switches suportarem.",
      "Usar rádio para visitantes e coletores móveis, com redes separadas.",
      "Planejar fibra para backbone ou futuro prédio, se distância e capacidade justificarem.",
      "Desativar portas sem uso e proteger rack.",
      "Criar validação com link speed, erros de porta, sinal Wi‑Fi e documentação."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Usar Wi‑Fi para tudo porque é mais fácil.",
        "whyItIsWrong": "Mobilidade não substitui estabilidade para câmeras, desktops críticos e backbone."
      },
      {
        "answer": "Usar fibra para todos os pontos de usuário.",
        "whyItIsWrong": "Pode ser tecnicamente possível, mas tende a ser caro e desnecessário para acesso comum."
      },
      {
        "answer": "Deixar visitantes na mesma rede por simplicidade.",
        "whyItIsWrong": "Aumenta risco de movimento lateral e exposição de ativos internos."
      }
    ],
    "finalAnswer": "Uma solução equilibrada usa cobre para acesso fixo e APs, rádio segmentado para mobilidade e visitantes, fibra para backbone ou expansão entre prédios, controles físicos e lógicos, documentação e monitoramento de link e sinal."
  },
  "glossary": [
    {
      "term": "Meio de transmissão",
      "shortDefinition": "Caminho físico ou sem fio usado para transportar sinais de rede.",
      "longDefinition": "Pode ser cobre, fibra óptica, rádio ou outro meio capaz de propagar sinais que representam bits.",
      "example": "Cabo Ethernet, fibra entre switches e Wi‑Fi até o notebook.",
      "relatedTerms": [
        "camada física",
        "sinal",
        "cobre",
        "fibra",
        "rádio"
      ],
      "relatedLessons": [
        "0.5",
        "1.5"
      ]
    },
    {
      "term": "Atenuação",
      "shortDefinition": "Perda de intensidade do sinal ao longo do meio.",
      "longDefinition": "Quanto maior a distância ou pior o meio, mais o sinal pode enfraquecer até dificultar interpretação pelo receptor.",
      "example": "Um cabo muito longo ou uma fibra com problema pode ter sinal insuficiente.",
      "relatedTerms": [
        "sinal",
        "fibra",
        "cobre"
      ],
      "relatedLessons": [
        "0.5",
        "1.5"
      ]
    },
    {
      "term": "Interferência",
      "shortDefinition": "Influência externa que degrada o sinal útil.",
      "longDefinition": "Pode vir de fontes eletromagnéticas, outros rádios, cabos mal instalados ou ambientes ruidosos.",
      "example": "Wi‑Fi instável perto de muitos APs no mesmo canal.",
      "relatedTerms": [
        "ruído",
        "rádio",
        "SNR"
      ],
      "relatedLessons": [
        "1.5",
        "12.1"
      ]
    },
    {
      "term": "Transceptor",
      "shortDefinition": "Componente que transmite e recebe sinais, frequentemente usado em fibra.",
      "longDefinition": "Em switches, módulos ópticos convertem sinais elétricos em luz e luz em sinais elétricos.",
      "example": "Um módulo SFP conectado ao switch para uplink de fibra.",
      "relatedTerms": [
        "fibra",
        "SFP",
        "uplink"
      ],
      "relatedLessons": [
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "PoE",
      "shortDefinition": "Power over Ethernet, energia elétrica entregue pelo cabo de rede.",
      "longDefinition": "Permite alimentar APs, câmeras e telefones IP usando o mesmo cabo usado para dados, quando equipamentos suportam o padrão.",
      "example": "Um access point alimentado pelo switch via cabo Ethernet.",
      "relatedTerms": [
        "cobre",
        "switch",
        "access point"
      ],
      "relatedLessons": [
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "CRC",
      "shortDefinition": "Verificação usada para detectar erros em quadros.",
      "longDefinition": "Contadores de CRC em interfaces ajudam a identificar quadros corrompidos, muitas vezes por problemas físicos.",
      "example": "Porta de switch com muitos CRC errors após cabo danificado.",
      "relatedTerms": [
        "erro",
        "quadro",
        "troubleshooting"
      ],
      "relatedLessons": [
        "1.5",
        "3.1"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência técnica para Ethernet cabeada."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_11-2020.html",
      "note": "Referência técnica para redes sem fio Wi‑Fi."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.5",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m00/0.5",
      "note": "Base conceitual sobre sinais físicos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m02",
      "lesson": "infra física e virtualização",
      "reason": "Racks, servidores, links e redes físicas sustentam plataformas e clusters."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m01",
      "lesson": "controle de acesso",
      "reason": "Controle físico e acesso à rede são parte da superfície de identidade e autorização do ambiente."
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
      "1.6"
    ]
  }
};
