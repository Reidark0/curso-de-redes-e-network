export const lesson1107 = {
  "id": "11.7",
  "moduleId": "m11",
  "order": 7,
  "title": "OSPF introdutório",
  "subtitle": "Entenda por que o OSPF existe, como roteadores formam vizinhança, trocam informações de estado de enlace, constroem uma visão comum da topologia e calculam os melhores caminhos dentro de uma rede corporativa.",
  "duration": "115-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "ospf",
    "roteamento dinâmico",
    "estado de enlace",
    "link-state",
    "área 0",
    "adjacência",
    "LSA",
    "LSDB",
    "SPF",
    "Dijkstra",
    "métrica",
    "custo",
    "convergência",
    "segurança",
    "troubleshooting",
    "cloud",
    "devsecops",
    "packet-tracer",
    "gns3",
    "troubleshooting real",
    "roteamento avançado"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.1",
      "reason": "A aula 11.1 explica por que roteamento existe e como pacotes atravessam redes diferentes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "reason": "A aula 11.2 apresenta tabela de rotas e longest prefix match, base para entender rotas aprendidas por OSPF."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.6",
      "reason": "A aula 11.6 explica métrica, distância administrativa e escolha de caminho, conceitos usados pelo OSPF."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "OSPF anuncia prefixos; portanto, depende de bom entendimento de subnetting e planejamento de endereçamento."
    }
  ],
  "objectives": [
    "Explicar por que o OSPF existe e qual problema ele resolve em redes com muitos roteadores.",
    "Diferenciar roteamento estático e roteamento dinâmico de estado de enlace.",
    "Entender vizinhança, adjacência, Hello, Router ID, área, LSAs, LSDB e cálculo SPF.",
    "Compreender o papel da área 0 e por que desenho de áreas afeta escala e operação.",
    "Relacionar custo OSPF, convergência e escolha de caminho com troubleshooting real.",
    "Identificar boas práticas de segurança: autenticação OSPF, passive-interface, controle de adjacências e proteção contra anúncios indevidos."
  ],
  "learningOutcomes": [
    "Dado um cenário com três roteadores internos, o aluno explica como o OSPF aprende rotas sem configuração estática para cada rede remota.",
    "Dado um problema de vizinhança OSPF, o aluno verifica Router ID, área, máscara, Hello/Dead timers, autenticação, MTU e conectividade L3.",
    "Dada uma tabela de rotas, o aluno reconhece rotas OSPF e interpreta destino, next hop, interface e custo.",
    "Dado um desenho corporativo, o aluno identifica onde OSPF é útil e onde rotas estáticas, BGP ou route tables cloud podem ser mais adequadas.",
    "Dado um incidente, o aluno coleta evidências com show ip ospf neighbor, show ip route, show ip ospf database, ping e traceroute."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Até agora, você aprendeu rotas default, rotas estáticas, rotas flutuantes, métricas e escolha de caminho. Isso funciona bem em redes pequenas. Mas imagine uma empresa com matriz, filiais, datacenter, rede de gestão, DMZ, Wi-Fi corporativo, links redundantes, firewalls e dezenas de sub-redes. Configurar manualmente todas as rotas em todos os roteadores vira uma fonte enorme de erro operacional.</p><p>O OSPF surge para resolver esse problema: em vez de cada roteador depender de uma lista manual de caminhos, os roteadores conversam entre si, descobrem quem são seus vizinhos, compartilham o estado de seus enlaces e calculam automaticamente os melhores caminhos.</p><div class=\"callout callout--problem\"><strong>Ideia central:</strong> OSPF não adivinha a rede; ele constrói uma base comum de topologia e usa essa base para instalar rotas IPv4 na tabela de roteamento.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>Antes de protocolos dinâmicos mais sofisticados, redes pequenas usavam muitas rotas estáticas ou protocolos simples como RIP, que tomava decisões principalmente pela quantidade de saltos. Esse modelo era limitado: uma rede com poucos saltos, mas link ruim, poderia parecer melhor que uma rede com mais saltos e links superiores.</p><p>O OSPF foi criado como um protocolo IGP, isto é, um protocolo de roteamento interno para uso dentro de uma organização ou sistema autônomo. Ele usa o modelo de estado de enlace: cada roteador descreve seus enlaces e todos constroem uma visão lógica da topologia.</p><p>Com essa visão, cada roteador roda o algoritmo SPF, frequentemente associado a Dijkstra, para calcular os menores caminhos a partir de si mesmo. Isso trouxe melhor escala, convergência e controle em ambientes corporativos quando comparado a abordagens puramente manuais ou muito simples.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>O problema que o OSPF resolve é a manutenção manual de caminhos em redes com múltiplas sub-redes e múltiplos roteadores. Se cada nova VLAN, filial ou segmento exigir rota estática em todos os pontos, a operação fica lenta, frágil e sujeita a inconsistências.</p><p>Além disso, redes mudam. Links caem, interfaces são desligadas, uma nova rede é adicionada, um firewall assume papel de gateway, um roteador de distribuição entra em manutenção. Em uma rede com roteamento puramente estático, cada mudança exige atualização manual cuidadosa.</p><div class=\"callout callout--warning\"><strong>Problema operacional:</strong> roteamento estático demais cria dívida técnica. O desenho pode funcionar hoje, mas se torna difícil de auditar, automatizar, recuperar e proteger.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><table class=\"data-table\"><thead><tr><th>Modelo</th><th>Como aprende rotas</th><th>Vantagem</th><th>Limitação</th></tr></thead><tbody><tr><td>Rotas estáticas</td><td>Administrador configura manualmente</td><td>Controle simples e previsível</td><td>Não escala bem em topologias grandes</td></tr><tr><td>RIP</td><td>Troca rotas por distância em saltos</td><td>Simples de entender</td><td>Métrica limitada e convergência mais frágil</td></tr><tr><td>OSPF</td><td>Troca estado de enlaces e calcula SPF</td><td>Escala melhor em redes internas</td><td>Exige desenho, áreas e troubleshooting próprio</td></tr><tr><td>BGP</td><td>Troca prefixos com políticas entre domínios</td><td>Base da Internet e de interconexões grandes</td><td>Mais político e complexo</td></tr><tr><td>Cloud route tables</td><td>Associação de sub-redes a tabelas gerenciadas</td><td>Integração com VPC/VNet e automação</td><td>Não substitui todos os conceitos de roteamento</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p>OSPF significa <strong>Open Shortest Path First</strong>. Ele é um protocolo de roteamento dinâmico interno, do tipo link-state. Em vez de apenas dizer “eu conheço tal rede”, o roteador descreve seus enlaces, vizinhos e custos. Com essas informações, os roteadores montam uma base de dados de estado de enlace, chamada LSDB.</p><p>Cada roteador usa a LSDB para calcular os melhores caminhos a partir de si mesmo. O resultado final aparece na tabela de rotas como rotas OSPF para redes remotas.</p><div class=\"definition-box\"><strong>Definição prática:</strong> OSPF é um protocolo que permite que roteadores dentro de uma organização aprendam rotas automaticamente a partir de uma visão compartilhada da topologia.</div><p>OSPFv2 é definido em documentação técnica como um protocolo de roteamento link-state executado dentro de um único Sistema Autônomo. Para o aluno, a consequência prática é: OSPF é usado para roteamento interno, não para trocar rotas públicas entre organizações como o BGP.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><ol class=\"flow-list\"><li>Interfaces habilitadas para OSPF enviam pacotes Hello.</li><li>Roteadores no mesmo enlace verificam compatibilidade: área, timers, autenticação, máscara, tipo de rede e outros parâmetros.</li><li>Quando os parâmetros batem, eles formam vizinhança e, quando necessário, adjacência.</li><li>Cada roteador anuncia informações de estado de enlace por LSAs.</li><li>Os LSAs são armazenados na LSDB.</li><li>Roteadores da mesma área devem ter LSDB coerente.</li><li>Cada roteador executa SPF para calcular melhores caminhos.</li><li>As melhores rotas são instaladas na tabela de roteamento.</li><li>Quando um link muda, novos LSAs são propagados e os cálculos são refeitos.</li></ol><p>Esse funcionamento explica por que problemas de OSPF podem estar em várias camadas: interface, IP, máscara, área, autenticação, MTU, timers, filtragem, vizinhança, LSDB ou instalação da rota.</p></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Em uma arquitetura OSPF clássica, existe pelo menos uma área. A área central é a <strong>área 0</strong>, também chamada backbone. Em redes maiores, outras áreas podem se conectar à área 0 por roteadores de borda de área.</p><table class=\"comparison-table\"><thead><tr><th>Elemento</th><th>Função</th><th>Risco se mal configurado</th></tr></thead><tbody><tr><td>Router ID</td><td>Identidade lógica do roteador no OSPF</td><td>Duplicidade causa comportamento instável</td></tr><tr><td>Área</td><td>Domínio lógico de LSDB</td><td>Área errada impede vizinhança ou roteamento esperado</td></tr><tr><td>Hello/Dead timers</td><td>Detectam vizinhos ativos e falhas</td><td>Timers incompatíveis impedem adjacência</td></tr><tr><td>Custo</td><td>Métrica usada para escolher caminho</td><td>Custo incorreto leva tráfego por caminho não desejado</td></tr><tr><td>Passive interface</td><td>Anuncia rede sem formar vizinhos naquela interface</td><td>Sem isso, OSPF pode tentar vizinhança onde não deve</td></tr><tr><td>Autenticação</td><td>Protege troca OSPF contra vizinhos não autorizados</td><td>Sem autenticação, há risco de anúncio indevido em segmentos expostos</td></tr></tbody></table></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em uma cidade com vários motoristas responsáveis por entregas. Com rotas estáticas, cada motorista recebe uma lista manual dizendo: “para chegar ao bairro X, vá por tal rua”. Se uma ponte fecha, alguém precisa avisar manualmente todos os motoristas.</p><p>Com OSPF, cada motorista compartilha informações sobre as ruas que conhece: rua aberta, rua fechada, custo do trajeto, conexão com outros bairros. Todos montam um mapa comum e calculam o melhor caminho a partir da própria posição.</p><p>A analogia tem limite: OSPF não é um GPS público da Internet. Ele é um protocolo interno, controlado pela organização, e exige desenho de áreas, autenticação, filtros e governança.</p></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Três roteadores estão ligados em triângulo: R1, R2 e R3. Atrás de R1 existe a rede 10.10.1.0/24. Atrás de R2 existe 10.10.2.0/24. Atrás de R3 existe 10.10.3.0/24. Sem OSPF, você teria que configurar rotas estáticas para cada rede em cada roteador.</p><p>Com OSPF, cada roteador anuncia suas redes conectadas e seus enlaces. R1 aprende como chegar à rede de R2 e R3, R2 aprende as redes de R1 e R3, e R3 aprende as redes de R1 e R2. Se um enlace cair, o protocolo recalcula o caminho disponível.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Em uma empresa, OSPF pode rodar entre roteadores de filial, switches de distribuição, firewalls internos e roteadores de datacenter. Ele permite que novas redes de usuários, servidores, voz, gestão ou DMZ sejam anunciadas dinamicamente para o backbone interno.</p><p>Isso reduz a quantidade de rotas estáticas, mas não elimina a necessidade de governança. É preciso definir quais interfaces participam do OSPF, quais redes são anunciadas, quais links são preferidos, onde aplicar sumarização, onde usar autenticação e quais redes não devem formar vizinhança.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em cloud pública, muitas decisões de roteamento são feitas por route tables gerenciadas, e não por OSPF diretamente dentro da VPC ou VNet padrão. Mesmo assim, OSPF aparece em appliances virtuais, firewalls de terceiros, SD-WAN, roteadores virtuais, datacenters conectados por VPN ou Direct Connect/ExpressRoute e ambientes híbridos.</p><p>O conceito importante é entender que roteamento dinâmico reduz configuração manual quando existem muitos prefixos e caminhos. Em cloud, a função pode ser feita por protocolos, por gateways gerenciados ou por propagação automática de rotas, dependendo do provedor e do desenho.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em DevSecOps, OSPF aparece menos no código da aplicação e mais na infraestrutura que sustenta ambientes corporativos. Porém, pipelines de IaC podem alterar interfaces, appliances, route tables, conectividade VPN e anúncios de prefixos. Um erro em automação pode anunciar rede errada ou remover caminho crítico.</p><p>Boas práticas incluem revisar mudanças de roteamento por pull request, manter documentação de prefixos, validar rotas efetivas em testes, registrar intenção de caminho e criar verificações automatizadas para detectar sobreposição, rota default indevida ou bypass de firewall.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>OSPF é poderoso, mas precisa ser protegido. Se um dispositivo não autorizado formar vizinhança ou se uma interface indevida participar do OSPF, a rede pode aprender rotas falsas, preferir caminhos errados ou expor segmentos internos.</p><p>Controles comuns incluem autenticação OSPF, passive-interface em portas que não devem formar vizinhos, segmentação de enlaces de roteamento, ACLs de controle, proteção física, monitoramento de mudanças de adjacência, alertas de LSDB inesperada e revisão de rotas recém-aprendidas.</p><div class=\"callout callout--security\"><strong>Princípio defensivo:</strong> um protocolo de roteamento é parte do plano de controle da rede. Se o plano de controle for manipulado, o plano de dados pode encaminhar tráfego pelo caminho errado.</div></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2><p>O diagrama mostra três roteadores formando vizinhança OSPF, trocando LSAs, mantendo uma LSDB coerente e instalando rotas calculadas por SPF.</p><svg class=\"lesson-svg\" viewBox=\"0 0 960 540\" role=\"img\" aria-labelledby=\"m11l07-title m11l07-desc\"><title id=\"m11l07-title\">OSPF introdutório</title><desc id=\"m11l07-desc\">Três roteadores em área 0 trocam Hellos e LSAs, constroem LSDB e calculam rotas por SPF.</desc><defs><marker id=\"m11l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs><rect x=\"60\" y=\"55\" width=\"840\" height=\"420\" rx=\"22\" class=\"svg-zone\"></rect><text x=\"480\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Área 0 — backbone OSPF</text><rect x=\"110\" y=\"190\" width=\"160\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--router\"></rect><text x=\"190\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">R1</text><text x=\"190\" y=\"250\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RID 1.1.1.1</text><text x=\"190\" y=\"273\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.10.1.0/24</text><rect x=\"400\" y=\"115\" width=\"160\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--router\"></rect><text x=\"480\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">R2</text><text x=\"480\" y=\"175\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RID 2.2.2.2</text><text x=\"480\" y=\"198\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.10.2.0/24</text><rect x=\"690\" y=\"190\" width=\"160\" height=\"95\" rx=\"16\" class=\"svg-node svg-node--router\"></rect><text x=\"770\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">R3</text><text x=\"770\" y=\"250\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RID 3.3.3.3</text><text x=\"770\" y=\"273\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.10.3.0/24</text><line x1=\"270\" y1=\"210\" x2=\"400\" y2=\"165\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l07-arrow)\"></line><line x1=\"560\" y1=\"165\" x2=\"690\" y2=\"210\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l07-arrow)\"></line><line x1=\"270\" y1=\"265\" x2=\"690\" y2=\"265\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m11l07-arrow)\"></line><rect x=\"330\" y=\"330\" width=\"300\" height=\"90\" rx=\"16\" class=\"svg-node svg-node--security\"></rect><text x=\"480\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">LSDB coerente</text><text x=\"480\" y=\"388\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">LSAs → SPF → rotas OSPF</text><line x1=\"190\" y1=\"285\" x2=\"375\" y2=\"340\" class=\"svg-flow\" marker-end=\"url(#m11l07-arrow)\"></line><line x1=\"480\" y1=\"210\" x2=\"480\" y2=\"330\" class=\"svg-flow\" marker-end=\"url(#m11l07-arrow)\"></line><line x1=\"770\" y1=\"285\" x2=\"585\" y2=\"340\" class=\"svg-flow\" marker-end=\"url(#m11l07-arrow)\"></line><rect x=\"115\" y=\"370\" width=\"145\" height=\"45\" rx=\"12\" class=\"svg-badge\"></rect><text x=\"187\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Hello</text><rect x=\"700\" y=\"370\" width=\"145\" height=\"45\" rx=\"12\" class=\"svg-badge\"></rect><text x=\"772\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">LSA</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório de OSPF foi transformado em prática de vizinhança, LSDB, custo, default route e falhas intencionais. O aluno deve configurar, quebrar, diagnosticar e documentar RCA.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios trabalham identificação de vizinhos, área, Router ID, custo, rota OSPF e causas comuns de falha de adjacência.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá uma topologia onde dois roteadores não formam vizinhança OSPF e uma rede remota não aparece na tabela de rotas. Sua missão será diagnosticar a causa com evidências.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como separar problema de conectividade IP, mismatch de área, timers, autenticação, MTU, passive-interface e ausência de anúncio de rede.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>OSPF é um protocolo de roteamento dinâmico interno. Ele forma vizinhanças, troca LSAs, mantém uma LSDB por área, calcula caminhos com SPF e instala rotas na tabela de roteamento.</p><p>Ele reduz a dependência de rotas estáticas em redes maiores, mas exige desenho correto, autenticação, controle de interfaces, monitoramento e troubleshooting disciplinado. OSPF não substitui firewall, segmentação ou governança: ele apenas decide como alcançar prefixos dentro de um domínio controlado.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você estudará <strong>BGP introdutório e Internet</strong>, entendendo por que o roteamento entre organizações usa política, sistemas autônomos e anúncios de prefixos em vez de apenas custo interno.</p></section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula introduz roteamento dinâmico interno. Ela conecta rotas, métricas, subnetting e troubleshooting com protocolos reais usados em ambientes corporativos.",
    "previousConcepts": [
      "tabela de rotas",
      "longest prefix match",
      "rota default",
      "rotas estáticas",
      "métrica",
      "distância administrativa",
      "subnetting",
      "inter-VLAN"
    ],
    "nextConcepts": [
      "BGP",
      "sistemas autônomos",
      "troubleshooting avançado",
      "redistribuição de rotas",
      "áreas OSPF avançadas",
      "sumarização",
      "alta disponibilidade de roteamento"
    ]
  },
  "protocolFields": [
    {
      "name": "Router ID",
      "description": "Identificador lógico do roteador no domínio OSPF. Deve ser único."
    },
    {
      "name": "Área",
      "description": "Domínio lógico onde roteadores mantêm LSDB coerente; a área 0 é o backbone."
    },
    {
      "name": "Hello interval",
      "description": "Intervalo de envio de pacotes Hello para descoberta e manutenção de vizinhos."
    },
    {
      "name": "Dead interval",
      "description": "Tempo para considerar um vizinho indisponível se Hellos deixam de chegar."
    },
    {
      "name": "Neighbor state",
      "description": "Estado da relação OSPF, como Init, 2-Way, ExStart, Exchange, Loading ou Full."
    },
    {
      "name": "LSA",
      "description": "Link-State Advertisement: informação de estado de enlace divulgada pelo OSPF."
    },
    {
      "name": "LSDB",
      "description": "Link-State Database: base com informações de topologia da área."
    },
    {
      "name": "Cost",
      "description": "Métrica OSPF usada no cálculo SPF para determinar melhor caminho."
    },
    {
      "name": "Process ID",
      "description": "Identificador local do processo OSPF em algumas plataformas; não precisa combinar entre roteadores Cisco."
    }
  ],
  "packetFlow": [
    "Interface OSPF envia pacotes Hello para descobrir vizinhos.",
    "Roteadores verificam área, timers, autenticação, máscara e compatibilidade.",
    "Vizinhos elegíveis formam adjacência conforme o tipo de rede.",
    "Roteadores trocam LSAs e sincronizam LSDB dentro da área.",
    "Cada roteador executa o cálculo SPF a partir de si mesmo.",
    "Rotas OSPF candidatas são avaliadas com custo e preferência da plataforma.",
    "As melhores rotas são instaladas na tabela de roteamento.",
    "Pacotes de dados passam a seguir o next hop escolhido pela tabela de rotas.",
    "Mudanças de enlace geram novos LSAs, novo cálculo e possível convergência."
  ],
  "deepDive": {
    "title": "OSPF não carrega pacotes de usuário; ele constrói o mapa",
    "content": "Um erro comum é imaginar que o pacote da aplicação entra no OSPF. Na verdade, OSPF atua no plano de controle: ele troca informações entre roteadores para construir a tabela de rotas. Depois que a rota está instalada, os pacotes de dados são encaminhados pelo plano de dados usando a tabela resultante. Separar plano de controle e plano de dados é essencial para troubleshooting: uma adjacência OSPF pode estar saudável, mas uma ACL, NAT, firewall ou rota de retorno ainda pode impedir a aplicação."
  },
  "commonMistakes": [
    "Achar que process ID OSPF precisa ser igual entre roteadores Cisco.",
    "Configurar áreas diferentes em interfaces que deveriam formar vizinhança.",
    "Esquecer passive-interface em redes de usuários.",
    "Não definir Router ID de forma previsível.",
    "Confundir rota OSPF instalada com permissão de firewall.",
    "Ignorar rota de retorno ao diagnosticar falha entre redes.",
    "Ajustar custo sem documentar intenção de caminho.",
    "Anunciar redes mais amplas do que o necessário.",
    "Rodar OSPF em segmento onde dispositivos não confiáveis podem aparecer.",
    "Não monitorar queda e subida frequente de vizinhança."
  ],
  "troubleshooting": {
    "symptoms": [
      "Roteadores diretamente conectados não viram vizinhos OSPF.",
      "Vizinho aparece, mas não chega ao estado Full.",
      "Rede remota não aparece na tabela de rotas.",
      "Tráfego usa caminho diferente do esperado.",
      "OSPF oscila frequentemente.",
      "Rotas OSPF somem após mudança de interface, VLAN ou firewall.",
      "Ping entre loopbacks falha apesar de vizinhança ativa."
    ],
    "checks": [
      "Validar conectividade IP direta entre roteadores.",
      "Verificar se as interfaces estão na mesma área OSPF.",
      "Comparar Hello e Dead timers.",
      "Verificar autenticação e chaves configuradas.",
      "Verificar MTU e tipo de rede quando adjacência não completa.",
      "Checar se a interface está passiva por engano.",
      "Confirmar redes anunciadas e máscaras corretas.",
      "Verificar se há rota melhor concorrente por outro protocolo ou estática.",
      "Validar ACLs, firewall e rota de retorno."
    ],
    "tools": [
      "show ip ospf neighbor",
      "show ip ospf interface",
      "show ip ospf database",
      "show ip route ospf",
      "show ip protocols",
      "show running-config | section router ospf",
      "show logging",
      "ping",
      "traceroute",
      "debug ip ospf adj",
      "ip route",
      "tcpdump protocol 89",
      "Wireshark filtro ospf"
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
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Rodar OSPF em interfaces de usuários sem necessidade.",
      "Não usar autenticação em enlaces compartilhados ou sensíveis.",
      "Anunciar 0.0.0.0/0 internamente sem governança.",
      "Confiar que OSPF substitui firewall ou segmentação.",
      "Alterar custos para corrigir rápido sem documentação.",
      "Não revisar rotas após mudanças de VLAN, VPN ou cloud."
    ],
    "vulnerabilities": [
      {
        "name": "Adjacência com dispositivo não autorizado em segmento exposto.",
        "description": "Risco relacionado à aula 11.7 — OSPF introdutório.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Autenticação OSPF e controle de interfaces participantes."
      },
      {
        "name": "Anúncio indevido de prefixos causando desvio de tráfego.",
        "description": "Risco relacionado à aula 11.7 — OSPF introdutório.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Passive-interface default com liberação explícita apenas nos enlaces necessários."
      },
      {
        "name": "Oscilação de adjacência causando instabilidade operacional.",
        "description": "Risco relacionado à aula 11.7 — OSPF introdutório.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação e proteção física dos enlaces de roteamento."
      },
      {
        "name": "Bypass de inspeção por custo ou rota mais específica errada.",
        "description": "Risco relacionado à aula 11.7 — OSPF introdutório.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento de LSDB, vizinhos e mudanças de rotas."
      },
      {
        "name": "Exposição de topologia interna por captura de pacotes OSPF.",
        "description": "Risco relacionado à aula 11.7 — OSPF introdutório.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão por mudança formal ou pull request quando integrado a automação."
      },
      {
        "name": "Falta de rota de retorno e assimetria quebrando firewalls stateful.",
        "description": "Risco relacionado à aula 11.7 — OSPF introdutório.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Validação de rota de ida e volta com logs e traceroute."
      }
    ],
    "mitigations": [
      "Autenticação OSPF e controle de interfaces participantes.",
      "Passive-interface default com liberação explícita apenas nos enlaces necessários.",
      "Segmentação e proteção física dos enlaces de roteamento.",
      "Monitoramento de LSDB, vizinhos e mudanças de rotas.",
      "Revisão por mudança formal ou pull request quando integrado a automação.",
      "Validação de rota de ida e volta com logs e traceroute.",
      "Filtros, sumarização e desenho de áreas quando a rede crescer."
    ],
    "goodPractices": [
      "Usar autenticação OSPF nos enlaces de roteamento quando suportado e apropriado.",
      "Aplicar passive-interface em redes que não devem formar vizinhança.",
      "Definir Router IDs previsíveis e documentados.",
      "Controlar fisicamente e logicamente segmentos onde OSPF roda.",
      "Monitorar eventos de neighbor up/down.",
      "Revisar anúncios de prefixos e evitar blocos amplos sem justificativa.",
      "Documentar intenção de custos e caminhos preferenciais.",
      "Separar plano de roteamento, gestão e redes de usuários.",
      "Usar logs, SIEM e NMS para detectar mudanças anormais."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar roteamento, OSPF, BGP e caminhos com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Autenticação OSPF e controle de interfaces participantes.",
      "Passive-interface default com liberação explícita apenas nos enlaces necessários.",
      "Segmentação e proteção física dos enlaces de roteamento.",
      "Monitoramento de LSDB, vizinhos e mudanças de rotas.",
      "Revisão por mudança formal ou pull request quando integrado a automação.",
      "Validação de rota de ida e volta com logs e traceroute.",
      "Filtros, sumarização e desenho de áreas quando a rede crescer."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "labType": "packet-tracer",
    "title": "Packet Tracer/GNS3: OSPFv2 multiárea básico com falhas de vizinhança e LSDB",
    "objective": "Configurar OSPFv2 em três roteadores, formar vizinhança, validar LSDB, testar custo, rota default e diagnosticar falhas comuns de área, timers, máscara wildcard e passive-interface.",
    "scenario": "Uma empresa possui matriz, filial e datacenter. OSPF deve anunciar redes internas automaticamente, manter área 0 como backbone e permitir que a matriz injete rota default para saída centralizada.",
    "topology": "R1-Matriz área 0 ligado a R2-Core área 0; R2-Core ligado a R3-Filial área 0 ou área 10 conforme variação; loopbacks simulam redes internas.",
    "architecture": "OSPF é protocolo link-state interno a um AS. Roteadores formam adjacências, trocam LSAs, constroem LSDB semelhante dentro da área e calculam rotas com base em custo.",
    "prerequisites": [
      "Concluir aulas 11.1–11.6.",
      "Entender rota estática, métrica, AD, prefixo e next hop."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "CLI Cisco IOS",
      "Opcional: Wireshark/tcpdump em ambiente real"
    ],
    "estimatedTimeMinutes": 140,
    "cost": "zero em Packet Tracer; local em GNS3",
    "safetyNotes": [
      "Use apenas ambiente de laboratório.",
      "Não ative OSPF em interfaces de usuário final em produção.",
      "Proteja adjacências com autenticação quando aplicável e limite quais interfaces participam."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Montar topologia com três roteadores",
        "instruction": "Crie R1, R2 e R3 com enlaces ponto a ponto e loopbacks simulando LANs.",
        "command": "R1 Lo0 10.1.1.1/32; R2 Lo0 10.2.2.2/32; R3 Lo0 10.3.3.3/32",
        "expectedOutput": "Cada roteador alcança seus vizinhos diretamente conectados.",
        "explanation": "Loopbacks são úteis para simular redes estáveis e IDs de roteador."
      },
      {
        "number": 2,
        "title": "Configurar router-id explícito",
        "instruction": "Defina router-id único em cada roteador.",
        "command": "router ospf 10\n router-id 1.1.1.1",
        "expectedOutput": "show ip protocols mostra router-id esperado.",
        "explanation": "Router-id previsível facilita troubleshooting de vizinhança e LSDB."
      },
      {
        "number": 3,
        "title": "Anunciar enlaces com wildcard correta",
        "instruction": "Configure network statements na área 0.",
        "command": "router ospf 10\n network 172.16.12.0 0.0.0.3 area 0\n network 10.1.1.1 0.0.0.0 area 0",
        "expectedOutput": "Interfaces corretas participam do OSPF.",
        "explanation": "Wildcard errada é causa comum de rede não anunciada ou interface indevida participando."
      },
      {
        "number": 4,
        "title": "Validar vizinhança",
        "instruction": "Confira estados de neighbor.",
        "command": "show ip ospf neighbor",
        "expectedOutput": "Vizinhos em FULL/ - ou FULL/DR/BDR conforme tipo de rede.",
        "explanation": "Sem vizinhança, não há troca completa de LSAs."
      },
      {
        "number": 5,
        "title": "Validar LSDB e rotas",
        "instruction": "Observe LSDB e rotas OSPF aprendidas.",
        "command": "show ip ospf database\nshow ip route ospf",
        "expectedOutput": "LSAs presentes e rotas O aparecem na tabela.",
        "explanation": "OSPF não é apenas rota pronta; ele mantém banco de estado de enlace e calcula caminhos."
      },
      {
        "number": 6,
        "title": "Aplicar passive-interface em LANs",
        "instruction": "Evite formar adjacência em interfaces de usuários, mantendo anúncio da rede.",
        "command": "router ospf 10\n passive-interface default\n no passive-interface g0/0\n no passive-interface g0/1",
        "expectedOutput": "Adjacências apenas em enlaces roteador-roteador.",
        "explanation": "Boa prática: reduzir superfície de ataque e ruído operacional."
      },
      {
        "number": 7,
        "title": "Alterar custo de interface",
        "instruction": "Mude custo em um enlace e observe alteração de rota.",
        "command": "interface g0/1\n ip ospf cost 50\nshow ip route ospf",
        "expectedOutput": "Caminho pode mudar se houver alternativa de menor custo.",
        "explanation": "OSPF escolhe menor custo acumulado dentro da área/topologia."
      },
      {
        "number": 8,
        "title": "Injetar rota default controlada",
        "instruction": "Configure default route em R1 e anuncie via OSPF.",
        "command": "ip route 0.0.0.0 0.0.0.0 203.0.113.1\nrouter ospf 10\n default-information originate",
        "expectedOutput": "Outros roteadores recebem O*E2 0.0.0.0/0 conforme plataforma.",
        "explanation": "Default route em OSPF precisa ser controlada para não atrair tráfego indevido."
      },
      {
        "number": 9,
        "title": "Falha intencional: área divergente",
        "instruction": "Configure temporariamente um lado do enlace em área diferente e observe.",
        "command": "router ospf 10\n network 172.16.23.0 0.0.0.3 area 10",
        "expectedOutput": "Adjacência falha ou não se forma no enlace divergente.",
        "explanation": "Área diferente no mesmo enlace impede relacionamento correto."
      },
      {
        "number": 10,
        "title": "Falha intencional: timers diferentes",
        "instruction": "Altere hello/dead interval em apenas um lado.",
        "command": "interface g0/1\n ip ospf hello-interval 5",
        "expectedOutput": "Neighbor pode cair ou não formar.",
        "explanation": "OSPF exige parâmetros compatíveis entre vizinhos."
      },
      {
        "number": 11,
        "title": "Falha intencional: interface passiva errada",
        "instruction": "Marque o enlace entre roteadores como passive e observe.",
        "command": "router ospf 10\n passive-interface g0/1",
        "expectedOutput": "Adjacência desaparece nessa interface.",
        "explanation": "Passive-interface é boa prática em LAN, mas erro grave em enlace roteador-roteador."
      },
      {
        "number": 12,
        "title": "Criar relatório de RCA",
        "instruction": "Para cada falha, registre sintoma, hipótese, comando, evidência, correção e validação.",
        "command": "Modelo: sintoma | hipótese | comando | evidência | correção | validação",
        "expectedOutput": "RCA curto de cada falha OSPF.",
        "explanation": "O objetivo é formar raciocínio de troubleshooting, não apenas memorizar comandos."
      }
    ],
    "expectedResult": "O aluno deve configurar OSPFv2 básico, formar adjacências, interpretar LSDB, alterar custo, anunciar default route e diagnosticar falhas clássicas de vizinhança.",
    "validation": [
      {
        "check": "Router-id único",
        "command": "show ip protocols",
        "expected": "Cada roteador com router-id distinto.",
        "ifFails": "Configurar router-id e reiniciar processo se necessário em laboratório."
      },
      {
        "check": "Vizinhos em estado FULL",
        "command": "show ip ospf neighbor",
        "expected": "Adjacências esperadas em FULL.",
        "ifFails": "Verificar área, timers, autenticação, máscara, MTU e passive-interface."
      },
      {
        "check": "Interfaces certas no OSPF",
        "command": "show ip ospf interface brief",
        "expected": "Apenas enlaces e loopbacks planejados.",
        "ifFails": "Corrigir network statements e passive-interface."
      },
      {
        "check": "Rotas aprendidas",
        "command": "show ip route ospf",
        "expected": "Rotas O ou O IA conforme desenho.",
        "ifFails": "Verificar LSDB, adjacência e anúncios."
      },
      {
        "check": "LSDB coerente",
        "command": "show ip ospf database",
        "expected": "LSAs de roteadores esperados.",
        "ifFails": "Investigar vizinhança e área."
      },
      {
        "check": "Default route controlada",
        "command": "show ip route 0.0.0.0",
        "expected": "Default recebida apenas onde planejado.",
        "ifFails": "Verificar default-information originate e rota default local."
      },
      {
        "check": "Custo influencia rota",
        "command": "show ip route destino",
        "expected": "Caminho reflete custo configurado.",
        "ifFails": "Verificar se existe alternativa e se outra rota mais preferida está vencendo."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Neighbor não aparece",
        "probableCause": "Interface não participa do OSPF, área errada ou passive-interface.",
        "howToConfirm": "show ip ospf interface brief e show running-config | section router ospf.",
        "fix": "Corrigir network statement, área ou passive-interface."
      },
      {
        "symptom": "Neighbor fica preso em INIT/2-WAY/EXSTART",
        "probableCause": "Problema de comunicação bidirecional, tipo de rede, MTU ou DR/BDR conforme cenário.",
        "howToConfirm": "show ip ospf neighbor detail e verificar MTU/tipo de rede.",
        "fix": "Corrigir parâmetros de interface e conectividade L2/L3."
      },
      {
        "symptom": "Rotas não aparecem apesar de neighbor FULL",
        "probableCause": "Rede não anunciada, filtro, área ou sumarização.",
        "howToConfirm": "show ip ospf database e show ip protocols.",
        "fix": "Corrigir anúncios e filtros."
      },
      {
        "symptom": "Rota usa caminho indesejado",
        "probableCause": "Custo OSPF diferente do planejado ou rota externa/default vencendo.",
        "howToConfirm": "show ip ospf interface e show ip route destino.",
        "fix": "Ajustar custo ou política de origem da rota."
      },
      {
        "symptom": "Default route espalha tráfego indevido",
        "probableCause": "default-information originate sem governança.",
        "howToConfirm": "show ip route nos roteadores internos.",
        "fix": "Controlar origem da default e usar filtros/política quando aplicável."
      },
      {
        "symptom": "Adjacência cai periodicamente",
        "probableCause": "Perda, CPU alta, timers agressivos ou enlace instável.",
        "howToConfirm": "logs, show interfaces, contadores e neighbor detail.",
        "fix": "Corrigir enlace, timers e capacidade do dispositivo."
      },
      {
        "symptom": "OSPF ativado em rede de usuários",
        "probableCause": "network statement amplo demais.",
        "howToConfirm": "show ip ospf interface brief.",
        "fix": "Usar passive-interface default e liberar só enlaces de roteadores."
      }
    ],
    "improvements": [
      "Separar área 0 e área 10 com ABR.",
      "Adicionar autenticação OSPF no laboratório.",
      "Testar sumarização em ABR.",
      "Comparar convergência OSPF com rota estática flutuante.",
      "Coletar captura de pacotes OSPF em ambiente controlado."
    ],
    "evidenceToCollect": [
      "show ip ospf neighbor.",
      "show ip ospf interface brief.",
      "show ip ospf database.",
      "show ip route ospf.",
      "show ip protocols.",
      "Traceroute antes/depois de alterar custo.",
      "RCA de três falhas intencionais."
    ],
    "questions": [
      "Por que OSPF é chamado de link-state?",
      "Qual a diferença entre vizinhança FULL e rota instalada?",
      "Por que passive-interface default é boa prática?",
      "O que acontece se duas pontas de um enlace estão em áreas diferentes?",
      "Por que anunciar default route sem controle pode ser perigoso?"
    ],
    "challenge": "Crie uma área 10 para a filial, mantenha área 0 no core e documente o papel do ABR, rotas O IA e impacto de uma falha no enlace da filial.",
    "solution": "A solução coloca R2 como ABR entre área 0 e área 10, garante adjacência correta em cada área, valida rotas O IA nos roteadores fora da área, testa falha do enlace e documenta o impacto. A configuração deve evitar OSPF em interfaces de usuário e manter evidências de LSDB, neighbors e tabela de rotas.",
    "id": "lab-11.7"
  },
  "mentorQuestions": [
    "Antes de olhar a rota OSPF, os roteadores conseguem pingar diretamente entre si?",
    "A falha está na vizinhança OSPF, na LSDB, na instalação da rota ou no tráfego de dados?",
    "Quais interfaces realmente precisam formar adjacência e quais deveriam ser passivas?"
  ],
  "quiz": [
    {
      "question": "Qual problema o OSPF resolve em redes internas maiores?",
      "options": [
        "Criptografar todo tráfego de usuário",
        "Aprender rotas dinamicamente sem configurar todos os caminhos manualmente",
        "Substituir endereços IP por MAC",
        "Impedir qualquer broadcast Ethernet"
      ],
      "answer": "Aprender rotas dinamicamente sem configurar todos os caminhos manualmente",
      "explanation": "OSPF é um protocolo de roteamento dinâmico interno que reduz dependência de rotas estáticas em ambientes com vários roteadores e prefixos."
    },
    {
      "question": "OSPF é classificado como qual tipo de protocolo?",
      "options": [
        "Link-state ou estado de enlace",
        "Distance-vector puro baseado apenas em saltos",
        "Protocolo de aplicação HTTP",
        "Protocolo de resolução MAC"
      ],
      "answer": "Link-state ou estado de enlace",
      "explanation": "OSPF troca informações de estado de enlace e calcula caminhos com SPF."
    },
    {
      "question": "O que é LSDB?",
      "options": [
        "Tabela ARP do host",
        "Banco de dados de estado de enlace usado pelo OSPF",
        "Lista de usuários autenticados",
        "Tabela de portas TCP abertas"
      ],
      "answer": "Banco de dados de estado de enlace usado pelo OSPF",
      "explanation": "A LSDB armazena LSAs e representa a visão da topologia dentro da área."
    },
    {
      "question": "Qual área é o backbone em OSPF clássico?",
      "options": [
        "Área 0",
        "Área 255",
        "Área pública",
        "Área APIPA"
      ],
      "answer": "Área 0",
      "explanation": "A área 0 é a área backbone à qual outras áreas normalmente se conectam."
    },
    {
      "question": "Qual comando Cisco ajuda a verificar vizinhos OSPF?",
      "options": [
        "show ip ospf neighbor",
        "show mac address-table",
        "show vlan brief apenas",
        "arp -a"
      ],
      "answer": "show ip ospf neighbor",
      "explanation": "Esse comando mostra vizinhos, estados e informações úteis de adjacência."
    },
    {
      "question": "Qual é uma boa prática defensiva em OSPF?",
      "options": [
        "Rodar OSPF em todas as portas de usuário",
        "Usar passive-interface onde não deve haver vizinhos",
        "Anunciar 0.0.0.0/0 sem revisão",
        "Ignorar mudanças de vizinhança"
      ],
      "answer": "Usar passive-interface onde não deve haver vizinhos",
      "explanation": "Passive-interface reduz superfície de adjacência em redes que não precisam formar vizinhos OSPF."
    },
    {
      "id": "q11.7-p1-1",
      "type": "diagnóstico",
      "q": "Dois roteadores OSPF têm conectividade IP, mas não formam vizinhança. Qual conjunto de itens é mais relevante verificar?",
      "opts": [
        "Área, timers, autenticação, MTU e passive-interface",
        "Somente DNS e proxy HTTP",
        "Apenas certificado TLS",
        "NAT hairpin e cookies"
      ],
      "a": 0,
      "exp": "OSPF depende de parâmetros compatíveis na interface e no processo de roteamento.",
      "difficulty": "intermediário",
      "topic": "OSPF troubleshooting"
    }
  ],
  "flashcards": [
    {
      "front": "O que é OSPF?",
      "back": "Um protocolo de roteamento dinâmico interno do tipo link-state usado para aprender rotas dentro de uma organização."
    },
    {
      "front": "O que é Router ID?",
      "back": "Identidade lógica única de um roteador dentro do domínio OSPF."
    },
    {
      "front": "O que são LSAs?",
      "back": "Anúncios de estado de enlace usados para descrever a topologia OSPF."
    },
    {
      "front": "O que é LSDB?",
      "back": "Banco de dados de estado de enlace mantido pelos roteadores OSPF dentro de uma área."
    },
    {
      "front": "O que é área 0?",
      "back": "Área backbone do OSPF clássico, usada como núcleo para interconexão de áreas."
    },
    {
      "front": "Para que serve passive-interface?",
      "back": "Para anunciar uma rede sem formar vizinhança OSPF naquela interface."
    }
  ],
  "exercises": [
    {
      "title": "Identificar causa de vizinhança ausente",
      "prompt": "Dois roteadores diretamente conectados não aparecem em show ip ospf neighbor. Liste cinco causas prováveis.",
      "expectedAnswer": "Conectividade IP ausente, área diferente, timers incompatíveis, autenticação divergente, interface passiva, MTU/tipo de rede incompatível, ACL bloqueando OSPF ou network statement incorreto."
    },
    {
      "title": "Separar plano de controle e plano de dados",
      "prompt": "Explique por que uma adjacência OSPF Full não garante que uma aplicação TCP funcione.",
      "expectedAnswer": "OSPF cria rotas no plano de controle. A aplicação ainda depende de rota de retorno, ACLs, firewall, NAT, DNS, serviço ativo e caminho permitido."
    },
    {
      "title": "Escolher interfaces passivas",
      "prompt": "Em um roteador com interfaces para usuários, servidores e outro roteador, quais deveriam formar vizinhança OSPF?",
      "expectedAnswer": "Apenas a interface para outro roteador ou dispositivo de roteamento deve formar vizinhança; interfaces de usuários/servidores geralmente devem ser passivas, embora suas redes possam ser anunciadas."
    },
    {
      "title": "Interpretar rota OSPF",
      "prompt": "Uma tabela mostra O 10.10.3.0/24 [110/30] via 10.0.12.2. Interprete os campos principais.",
      "expectedAnswer": "O indica rota OSPF; 10.10.3.0/24 é o destino; 110 é a distância administrativa típica em Cisco; 30 é custo; 10.0.12.2 é next hop."
    },
    {
      "id": "ex11.7-p1-1",
      "type": "diagnóstico",
      "prompt": "Dois roteadores OSPF no mesmo enlace não formam neighbor. Quais parâmetros você verifica?",
      "expectedAnswer": "Área, timers hello/dead, autenticação, máscara, tipo de rede, MTU, passive-interface e conectividade L2/L3.",
      "explanation": "OSPF exige compatibilidade de parâmetros entre vizinhos."
    },
    {
      "id": "ex11.7-p1-2",
      "type": "segurança",
      "prompt": "Por que usar passive-interface default em OSPF?",
      "expectedAnswer": "Para impedir formação de adjacência em interfaces de usuários, reduzir superfície de ataque e manter anúncios controlados.",
      "explanation": "Boa prática operacional e defensiva."
    }
  ],
  "challenge": {
    "title": "Diagnosticar OSPF que não aprende rede remota",
    "scenario": "R1 e R2 formam vizinhança OSPF Full. R2 e R3 também formam vizinhança Full. Porém R1 não aprende a rede 10.10.3.0/24 de R3. O ping de R1 para o enlace de R2 funciona, e show ip ospf neighbor parece saudável.",
    "tasks": [
      "Levantar hipóteses organizadas por camada.",
      "Indicar comandos para verificar anúncio da rede 10.10.3.0/24.",
      "Explicar por que vizinhança Full não garante que todas as redes estejam anunciadas.",
      "Propor correção e validação.",
      "Listar riscos de segurança se a correção for anunciar um bloco amplo demais."
    ],
    "rubric": [
      "Diferencia conectividade, vizinhança, LSDB e tabela de rotas.",
      "Usa comandos adequados como show ip route ospf, show ip ospf database e show ip protocols.",
      "Considera network statement, passive-interface, filtros e rota concorrente.",
      "Inclui validação com ping/traceroute e rota de retorno.",
      "Evita anunciar prefixos amplos sem necessidade."
    ],
    "gradingRubric": [
      {
        "criterion": "Correção técnica de rotas e caminhos",
        "points": 25,
        "description": "Prefixos, next hops, retorno, AD/métrica e caminhos efetivos estão corretos."
      },
      {
        "criterion": "Validação e evidências",
        "points": 25,
        "description": "A resposta inclui comandos, outputs esperados, testes positivos e testes negativos."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 20,
        "description": "O aluno identifica hipóteses, evidências, causa raiz e prevenção."
      },
      {
        "criterion": "Segurança e governança",
        "points": 20,
        "description": "A solução evita bypass, excesso de permissão, anúncios indevidos e falta de logs."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Entrega documentação, rollback e próximos passos de melhoria."
      }
    ]
  },
  "commentedSolution": "Uma solução disciplinada começa confirmando que R1, R2 e R3 têm vizinhanças esperadas. Depois, verifica se R3 realmente anuncia 10.10.3.0/24 no OSPF com show ip protocols, show ip ospf interface e configuração do processo. Em seguida, verifica se essa informação aparece na LSDB de R2 e R1. Se a LSDB contém a informação, mas a rota não entra na tabela, procure rota concorrente mais preferida, filtro, sumarização ou problema de cálculo. Se a LSDB não contém, o problema está no anúncio, área, filtro ou interface. A correção deve anunciar o prefixo exato, validar com show ip route ospf, ping com origem correta, traceroute e checagem de rota de retorno. Anunciar um /16 para resolver rápido pode criar exposição, assimetria e bypass de controles.",
  "glossary": [
    {
      "term": "OSPF",
      "definition": "Open Shortest Path First, protocolo de roteamento dinâmico interno do tipo estado de enlace."
    },
    {
      "term": "IGP",
      "definition": "Interior Gateway Protocol, protocolo usado para roteamento dentro de uma organização ou sistema autônomo."
    },
    {
      "term": "Router ID",
      "definition": "Identidade lógica única de um roteador OSPF."
    },
    {
      "term": "Hello",
      "definition": "Pacote usado pelo OSPF para descobrir e manter vizinhos."
    },
    {
      "term": "LSA",
      "definition": "Anúncio de estado de enlace usado para compartilhar informações de topologia."
    },
    {
      "term": "LSDB",
      "definition": "Base de dados de estado de enlace mantida pelos roteadores OSPF de uma área."
    },
    {
      "term": "SPF",
      "definition": "Shortest Path First, cálculo usado para determinar melhores caminhos a partir da LSDB."
    },
    {
      "term": "Área 0",
      "definition": "Backbone OSPF em desenhos clássicos de múltiplas áreas."
    },
    {
      "term": "Custo OSPF",
      "definition": "Métrica usada pelo OSPF para escolher caminhos."
    },
    {
      "term": "Passive-interface",
      "definition": "Configuração que impede formação de vizinhança em uma interface, mantendo possível anúncio da rede."
    }
  ],
  "references": [
    "Conceitos fundamentais de roteamento IPv4 vistos nas aulas 6.1 a 6.6.",
    "Práticas de projeto corporativo de redes internas com protocolos IGP.",
    "Comandos operacionais equivalentes em Cisco IOS, Linux e ferramentas de captura para troubleshooting defensivo.",
    {
      "type": "rfc",
      "title": "RFC 2328 — OSPF Version 2",
      "organization": "IETF",
      "url": "https://datatracker.ietf.org/doc/html/rfc2328",
      "note": "Referência normativa para OSPFv2; usada para validar conceitos de link-state, áreas, LSDB, vizinhança e cálculo de caminho."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs e segmentação L2 ajudam a entender onde OSPF deve ou não formar vizinhança."
    },
    {
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.7",
      "reason": "Planejamento de endereçamento corporativo define os prefixos que serão anunciados pelo OSPF."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC",
      "reason": "Mudanças em roteamento e appliances podem ser controladas por revisão, pipeline e documentação como código."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acessos entre serviços",
      "reason": "Roteamento define alcançabilidade de serviços, mas autenticação e autorização continuam sendo camadas separadas."
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
      "11.8"
    ]
  }
};
