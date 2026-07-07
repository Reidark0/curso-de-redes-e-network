export const lesson1108 = {
  "id": "11.8",
  "moduleId": "m11",
  "order": 8,
  "title": "BGP introdutório e Internet",
  "subtitle": "Entenda por que o BGP existe, como sistemas autônomos trocam rotas, por que a Internet depende de políticas de roteamento e como erros de anúncio podem causar incidentes globais.",
  "duration": "115-165 min",
  "estimatedStudyTimeMinutes": 165,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 265,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "bgp",
    "internet",
    "sistema autônomo",
    "asn",
    "ebgp",
    "ibgp",
    "as-path",
    "next-hop",
    "local-pref",
    "med",
    "communities",
    "multihoming",
    "peering",
    "transit",
    "route leak",
    "rpki",
    "cloud",
    "segurança",
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
      "reason": "A aula 11.1 explica por que roteamento existe e como redes diferentes precisam de decisão de próximo salto."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "reason": "BGP instala rotas em tabela de roteamento; portanto, longest prefix match continua valendo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.6",
      "reason": "A aula 11.6 diferencia distância administrativa, métrica e critérios de escolha de caminho."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.7",
      "reason": "OSPF apresenta roteamento dinâmico interno; BGP apresenta roteamento entre domínios administrativos."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "BGP anuncia prefixos; sem subnetting e planejamento de endereçamento, os anúncios ficam perigosos."
    }
  ],
  "objectives": [
    "Explicar por que o BGP existe e qual problema ele resolve na Internet.",
    "Diferenciar IGP, como OSPF, de EGP, como BGP.",
    "Entender sistema autônomo, ASN, eBGP, iBGP, prefixo anunciado e sessão BGP.",
    "Reconhecer atributos fundamentais como AS_PATH, NEXT_HOP, LOCAL_PREF, MED e communities.",
    "Relacionar BGP com multihoming, trânsito, peering, cloud híbrida, VPN e links dedicados.",
    "Identificar riscos defensivos: route leak, hijack, anúncios amplos, ausência de filtro, falta de RPKI e mudanças sem revisão."
  ],
  "learningOutcomes": [
    "Dado um cenário com dois provedores, o aluno explica por que BGP é usado para multihoming.",
    "Dado um prefixo e um ASN, o aluno descreve o que está sendo anunciado e para quem.",
    "Dada uma tabela BGP simplificada, o aluno interpreta AS_PATH, NEXT_HOP e preferência de caminho.",
    "Dado um incidente de rota, o aluno diferencia falha local, falha de provedor, route leak e hijack.",
    "Dado um desenho de cloud híbrida, o aluno identifica onde BGP aparece em VPN dinâmica, Direct Connect, ExpressRoute ou Cloud Router.",
    "Dado um plano de mudança, o aluno propõe filtros, max-prefix, RPKI e revisão antes de ativar anúncios."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Até aqui, o curso mostrou como roteadores escolhem caminhos dentro de uma rede controlada: rotas estáticas, rotas default, OSPF, métricas e distância administrativa. Mas a Internet não pertence a uma única empresa. Ela é uma interconexão global de operadoras, provedores, clouds, bancos, governos, universidades, CDNs e empresas, cada uma com políticas próprias.</p><p>O problema é: como uma rede diz para outra rede quais prefixos ela alcança? Como um provedor aprende caminhos para milhões de prefixos? Como uma empresa com dois links de Internet decide por onde sair e como o mundo deve chegar até ela?</p><div class=\"callout callout--problem\"><strong>Ideia central:</strong> BGP é o protocolo que permite roteamento entre domínios administrativos diferentes. Ele não escolhe caminho apenas por distância técnica; ele aplica política, confiança, contratos e atributos.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>No início da Internet, havia menos redes, menos rotas e menor complexidade operacional. Com o crescimento de provedores, empresas, universidades e redes comerciais, tornou-se inviável depender de uma autoridade central ou de rotas manuais globais.</p><p>Protocolos internos, como OSPF, foram desenhados para funcionar dentro de uma organização. Eles assumem confiança operacional maior e uma administração relativamente unificada. A Internet exigia outro modelo: redes independentes precisavam trocar alcance de prefixos sem abrir mão de autonomia.</p><p>O BGP surgiu como protocolo de vetor de caminho. Em vez de apenas dizer “minha distância até o destino”, ele carrega informações sobre o caminho entre sistemas autônomos, permitindo que políticas influenciem a decisão.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>Imagine que uma empresa possui o prefixo público <code>203.0.113.0/24</code> e dois provedores de Internet. Ela quer que o mundo saiba que esse prefixo é alcançável por qualquer um dos provedores. Também quer preferir o ISP A como caminho principal e usar o ISP B como contingência.</p><p>Rotas estáticas não escalam para a Internet inteira. OSPF não é adequado para coordenar políticas entre milhares de organizações independentes. Além disso, a melhor rota nem sempre é a de menor latência: contratos, custo, segurança, preferência de tráfego e relações de peering importam.</p><div class=\"callout callout--warning\"><strong>Problema operacional:</strong> um anúncio BGP errado pode fazer tráfego global tomar o caminho errado, derrubar serviços, causar blackhole ou permitir interceptação. Por isso BGP é poderoso e perigoso.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><p>A evolução do roteamento externo caminhou de modelos mais simples para políticas mais expressivas. A necessidade deixou de ser apenas alcançar redes e passou a incluir governança, escala, redundância, engenharia de tráfego e segurança.</p><ol class=\"flow-list\"><li><strong>Rotas manuais:</strong> úteis em ambientes pequenos, impossíveis para escala global.</li><li><strong>Protocolos internos:</strong> resolvem roteamento dentro de um domínio, mas não contratos entre organizações.</li><li><strong>BGP:</strong> permite troca de rotas entre sistemas autônomos com atributos e políticas.</li><li><strong>Controles modernos:</strong> filtros, communities, max-prefix, RPKI, validação de origem, automação e observabilidade.</li><li><strong>Cloud e interconexão:</strong> BGP também aparece em VPNs dinâmicas, links dedicados, cloud routers e SD-WAN.</li></ol></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p><strong>BGP</strong>, Border Gateway Protocol, é o principal protocolo usado para trocar informações de roteamento entre sistemas autônomos. Um <strong>sistema autônomo</strong>, ou AS, é uma rede ou conjunto de redes sob uma política administrativa comum, identificado por um <strong>ASN</strong>.</p><p>Quando dois ASNs estabelecem uma sessão BGP, eles se tornam vizinhos BGP. Essa sessão normalmente usa TCP porta <code>179</code>. O BGP anuncia prefixos, como <code>203.0.113.0/24</code>, junto com atributos que ajudam a decidir qual caminho usar.</p><div class=\"definition-box\"><strong>Definição prática:</strong> BGP é menos um “GPS de menor distância” e mais um sistema de negociação de caminhos entre organizações. Ele responde: “quais prefixos eu alcanço, por qual próximo salto e sob quais políticas?”.</div></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><p>O BGP forma sessões entre vizinhos configurados explicitamente. Diferente de muitos protocolos internos, ele não sai descobrindo automaticamente qualquer vizinho na rede. Isso é importante para segurança e governança.</p><ol class=\"flow-list\"><li>Dois roteadores são configurados com o ASN local, o IP do vizinho e o ASN remoto.</li><li>Os roteadores estabelecem sessão TCP, normalmente na porta <code>179</code>.</li><li>Após a sessão subir, trocam capacidades e rotas.</li><li>Cada rota carrega atributos, como prefixo, NEXT_HOP e AS_PATH.</li><li>Políticas locais filtram o que entra e o que sai.</li><li>O roteador escolhe melhores caminhos e instala rotas na tabela de roteamento quando permitido.</li><li>Alterações são propagadas incrementalmente, não como uma redescoberta completa constante.</li></ol><p>O BGP é chamado de protocolo path-vector porque anuncia o caminho entre ASNs por meio do atributo <strong>AS_PATH</strong>. Isso ajuda a evitar loops e permite políticas baseadas no caminho.</p></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Em arquitetura corporativa, BGP costuma aparecer em quatro lugares: borda de Internet, interconexão com provedores, conectividade cloud/híbrida e redes de grande porte com múltiplos domínios.</p><table class=\"data-table\"><thead><tr><th>Elemento</th><th>Função</th><th>Risco se mal configurado</th></tr></thead><tbody><tr><td>ASN</td><td>Identifica o domínio administrativo</td><td>Anúncio ou peering associado ao domínio errado</td></tr><tr><td>Prefixo</td><td>Rede anunciada</td><td>Vazamento de prefixo, blackhole ou exposição indevida</td></tr><tr><td>eBGP</td><td>BGP entre ASNs diferentes</td><td>Receber ou anunciar rotas demais sem filtro</td></tr><tr><td>iBGP</td><td>BGP dentro do mesmo AS</td><td>Distribuição interna incompleta ou desenho sem route reflector</td></tr><tr><td>Policy</td><td>Controla preferência e anúncios</td><td>Tráfego desviando de firewall, NAT ou inspeção</td></tr><tr><td>RPKI/ROA</td><td>Ajuda a validar origem de prefixos</td><td>Maior exposição a hijack e erro de origem</td></tr></tbody></table></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Imagine empresas de transporte que conectam cidades. Cada transportadora tem seus próprios caminhões, contratos, custos, rotas preferidas e regiões atendidas. Quando uma transportadora diz “eu entrego na cidade X”, as outras podem escolher se acreditam, se aceitam, se usam como caminho principal ou backup.</p><p>O BGP funciona de modo parecido. Cada sistema autônomo anuncia quais prefixos alcança. Os vizinhos aplicam política para aceitar, rejeitar ou preferir rotas. Nem sempre a rota com menos “estradas” vence; às vezes uma rota contratualmente preferida, mais confiável ou localmente mais barata é escolhida.</p><div class=\"callout\"><strong>Limite da analogia:</strong> BGP é automatizado, distribuído e sensível a erro. Um anúncio errado pode ser propagado rapidamente e afetar tráfego real em larga escala.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Uma empresa tem ASN privado <code>65010</code> em laboratório e dois roteadores simulando provedores: AS <code>64501</code> e AS <code>64502</code>. A empresa anuncia <code>10.10.0.0/16</code> para ambos. O provedor A é o caminho preferido; o provedor B é contingência.</p><p>Mesmo em laboratório, a lição principal é a mesma: a empresa não deve anunciar qualquer coisa. Ela deve anunciar somente os prefixos autorizados, filtrar o que recebe, controlar preferência e validar rota de retorno.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Uma organização com e-commerce crítico possui dois provedores de Internet, um firewall de borda e um bloco público próprio. Ela usa BGP para anunciar seu prefixo aos dois provedores. O link principal recebe preferência por LOCAL_PREF maior no sentido interno e o backup fica disponível para falha.</p><p>A operação madura inclui abertura de mudança, validação de prefix-list, max-prefix, monitoramento de sessão, teste de failover, contato com provedores, rollback e evidências em NOC/SOC.</p><table class=\"comparison-table\"><thead><tr><th>Decisão</th><th>Boa prática</th><th>Erro comum</th></tr></thead><tbody><tr><td>Anúncio de prefixo</td><td>Anunciar apenas prefixos próprios/autorizados</td><td>Anunciar rota mais ampla ou prefixo de terceiro</td></tr><tr><td>Recebimento de rotas</td><td>Filtrar e limitar com max-prefix</td><td>Aceitar tabela completa sem capacidade adequada</td></tr><tr><td>Failover</td><td>Testar janela controlada</td><td>Assumir que backup funciona sem evidência</td></tr><tr><td>Segurança</td><td>RPKI, autenticação e revisão</td><td>Configuração manual sem revisão por pares</td></tr></tbody></table></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em cloud, BGP aparece em conexões híbridas. Uma VPN site-to-site dinâmica pode usar BGP para trocar rotas entre o datacenter e a VPC/VNet. Links dedicados, como conexões privadas com provedores cloud, também podem usar BGP para anunciar prefixos locais e remotos.</p><p>A vantagem é reduzir configuração manual e permitir convergência. O risco é anunciar blocos sobrepostos, amplos demais ou não autorizados. Em ambientes multi-cloud, isso pode criar caminhos inesperados entre redes que deveriam permanecer isoladas.</p><div class=\"callout callout--security\"><strong>Cloud não remove BGP:</strong> ela abstrai parte da infraestrutura, mas rotas, prefixos, anúncios, propagação e filtros continuam sendo decisões críticas de arquitetura.</div></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em equipes modernas, políticas de roteamento podem ser tratadas como código. Alterações em route tables, VPN gateways, anúncios de prefixos, filtros e conexões híbridas podem passar por pull request, revisão, validação automática e aprovação de segurança.</p><p>Um pipeline maduro pode bloquear mudanças que criem <code>0.0.0.0/0</code> para caminhos indevidos, sobreponham CIDRs, removam filtros de prefixo, aceitem rotas demais ou anunciem redes de ambiente errado.</p><p>Isso conecta diretamente este curso ao curso de Infraestrutura Moderna, Platform Engineering e DevSecOps: a rede deixa de ser apenas configuração manual e passa a ser governada por automação, evidência e política.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Incidentes de BGP podem causar indisponibilidade, desvio de tráfego ou interceptação. Dois termos são essenciais: <strong>route leak</strong>, quando rotas são propagadas de forma indevida; e <strong>route hijack</strong>, quando um AS anuncia prefixo que não deveria anunciar.</p><p>Defesas incluem filtros de prefixo, validação de origem com RPKI/ROA, limite de prefixos, autenticação de sessão quando aplicável, monitoramento externo, aprovação de mudança e runbook de contato com provedores.</p><table class=\"risk-table\"><thead><tr><th>Risco</th><th>Sinal</th><th>Mitigação</th></tr></thead><tbody><tr><td>Route leak</td><td>AS_PATH inesperado ou tráfego por caminho incomum</td><td>Filtros, communities, validação de política</td></tr><tr><td>Hijack</td><td>Prefixo anunciado por origem não autorizada</td><td>RPKI/ROA, monitoramento e contato com upstreams</td></tr><tr><td>Anúncio amplo</td><td>Mais tráfego que o previsto chegando pela borda</td><td>Prefix-list restritiva e revisão de mudança</td></tr><tr><td>Sessão instável</td><td>Flaps BGP e reconvergência frequente</td><td>Monitoramento, timers adequados e investigação de enlace</td></tr></tbody></table><p>Em BGP, segurança operacional significa controlar o que se anuncia, o que se aceita, quantos prefixos um peer pode enviar, como mudanças são revisadas e como eventos de route leak ou origem inválida são detectados. RPKI/ROV ajuda a validar a origem do prefixo, mas não substitui filtros, monitoramento e processo de mudança.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG — BGP entre sistemas autônomos</h2><p>O diagrama mostra uma empresa, dois provedores, a Internet e uma cloud. Repare que o BGP não anuncia “hosts soltos”; ele anuncia prefixos, decide caminhos entre sistemas autônomos e precisa de filtros para evitar anúncios indevidos.</p><svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m11l08-title m11l08-desc\"><title id=\"m11l08-title\">BGP, ASNs, prefixos e políticas</title><desc id=\"m11l08-desc\">Empresa com ASN próprio faz BGP com dois provedores, anuncia prefixo corporativo, recebe rotas filtradas e se conecta a cloud com políticas de roteamento.</desc><defs><marker id=\"m11l08-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-flow\"></path></marker></defs><rect x=\"30\" y=\"40\" width=\"250\" height=\"170\" rx=\"18\" class=\"svg-zone\"></rect><text x=\"155\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Empresa — AS 65010</text><rect x=\"70\" y=\"95\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\"></rect><text x=\"155\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Roteador de borda</text><text x=\"155\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Anuncia 203.0.113.0/24</text><rect x=\"365\" y=\"40\" width=\"225\" height=\"130\" rx=\"18\" class=\"svg-node svg-node--cloud\"></rect><text x=\"477\" y=\"80\" text-anchor=\"middle\" class=\"svg-label\">ISP A — AS 64501</text><text x=\"477\" y=\"110\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Transit / upstream</text><text x=\"477\" y=\"137\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Política + filtros</text><rect x=\"365\" y=\"240\" width=\"225\" height=\"130\" rx=\"18\" class=\"svg-node svg-node--cloud\"></rect><text x=\"477\" y=\"280\" text-anchor=\"middle\" class=\"svg-label\">ISP B — AS 64502</text><text x=\"477\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Backup / multihoming</text><text x=\"477\" y=\"337\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Max-prefix</text><rect x=\"690\" y=\"90\" width=\"240\" height=\"210\" rx=\"18\" class=\"svg-zone\"></rect><text x=\"810\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Internet</text><rect x=\"730\" y=\"155\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\"></rect><text x=\"810\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Outros ASNs</text><text x=\"810\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">AS_PATH variável</text><rect x=\"690\" y=\"365\" width=\"240\" height=\"125\" rx=\"18\" class=\"svg-node svg-node--cloud\"></rect><text x=\"810\" y=\"405\" text-anchor=\"middle\" class=\"svg-label\">Cloud / parceiro</text><text x=\"810\" y=\"432\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VPN, Direct Connect, ExpressRoute</text><text x=\"810\" y=\"459\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BGP privado ou público</text><path d=\"M 240 120 C 300 105 315 95 365 95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l08-arrow)\"></path><text x=\"308\" y=\"88\" class=\"svg-label svg-label--small\">eBGP TCP/179</text><path d=\"M 240 150 C 300 215 315 280 365 300\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l08-arrow)\"></path><text x=\"287\" y=\"252\" class=\"svg-label svg-label--small\">eBGP backup</text><path d=\"M 590 105 C 635 110 650 145 730 180\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m11l08-arrow)\"></path><path d=\"M 590 305 C 650 300 680 235 730 205\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m11l08-arrow)\"></path><path d=\"M 590 330 C 660 365 690 400 690 425\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#m11l08-arrow)\"></path><rect x=\"60\" y=\"260\" width=\"230\" height=\"205\" rx=\"14\" class=\"svg-node svg-node--security\"></rect><text x=\"175\" y=\"295\" text-anchor=\"middle\" class=\"svg-label\">Controles essenciais</text><text x=\"85\" y=\"330\" class=\"svg-label svg-label--small\">• prefix-list</text><text x=\"85\" y=\"357\" class=\"svg-label svg-label--small\">• AS-PATH filter</text><text x=\"85\" y=\"384\" class=\"svg-label svg-label--small\">• max-prefix</text><text x=\"85\" y=\"411\" class=\"svg-label svg-label--small\">• RPKI/ROA</text><text x=\"85\" y=\"438\" class=\"svg-label svg-label--small\">• mudança revisada</text><rect x=\"360\" y=\"420\" width=\"250\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--attacker\"></rect><text x=\"485\" y=\"455\" text-anchor=\"middle\" class=\"svg-label\">Risco</text><text x=\"485\" y=\"482\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Route leak / hijack / anúncio errado</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório de BGP trabalha em ambiente controlado com ASNs privados, filtros de importação/exportação, max-prefix, AS_PATH e RPKI conceitual. O foco é governança defensiva de roteamento, não conexão com a Internet real.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios reforçam diferença entre IGP e BGP, AS_PATH, política, multihoming, cloud híbrida e controles contra anúncios indevidos.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você deverá desenhar uma política BGP segura para uma empresa com dois provedores, um prefixo público, uma conexão cloud e requisitos de failover.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como pensar em anúncios autorizados, filtros de entrada e saída, preferência de caminho, rota de retorno, monitoramento e rollback.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>BGP é o protocolo de roteamento entre sistemas autônomos. Ele sustenta a Internet e também aparece em cloud híbrida, VPN dinâmica e links dedicados. Diferente de OSPF, BGP é fortemente baseado em política. Ele anuncia prefixos, usa atributos como AS_PATH e NEXT_HOP, e exige filtros cuidadosos.</p><p>O ponto mais importante é operacional: BGP é poderoso, mas um anúncio errado pode ter impacto muito maior do que uma rota estática errada em uma LAN. Por isso filtros, RPKI, max-prefix, revisão de mudança, monitoramento e runbooks são parte do conhecimento essencial.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, <strong>6.9 — Troubleshooting com traceroute, mtr, route print e ip route</strong>, você vai consolidar roteamento com diagnóstico prático: tabela de rotas, caminho real, rota de retorno, ICMP, traceroute, mtr e diferenças entre Windows, Linux, Cisco e cloud.</p></section>"
  },
  "networkContext": {
    "layers": [
      "Camada 3",
      "Plano de controle",
      "Plano de roteamento",
      "Borda de Internet"
    ],
    "relatedConcepts": [
      "ASN",
      "Prefixo",
      "eBGP",
      "iBGP",
      "AS_PATH",
      "NEXT_HOP",
      "LOCAL_PREF",
      "MED",
      "communities",
      "RPKI",
      "route leak",
      "route hijack"
    ],
    "previousLessons": [
      "6.1",
      "6.2",
      "6.3",
      "6.6",
      "6.7"
    ],
    "nextLessons": [
      "11.9",
      "6.10"
    ]
  },
  "protocolFields": [
    {
      "name": "ASN",
      "meaning": "Identificador do sistema autônomo local ou remoto.",
      "securityNote": "ASN incorreto pode estabelecer política com entidade errada ou causar anúncio inválido."
    },
    {
      "name": "Prefixo/NLRI",
      "meaning": "Rede anunciada pelo BGP.",
      "securityNote": "Anunciar prefixo não autorizado pode causar route leak, blackhole ou hijack."
    },
    {
      "name": "NEXT_HOP",
      "meaning": "Próximo salto para alcançar o prefixo anunciado.",
      "securityNote": "NEXT_HOP inacessível gera rota instalada de forma inútil ou tráfego quebrado."
    },
    {
      "name": "AS_PATH",
      "meaning": "Sequência de ASNs atravessados até o destino.",
      "securityNote": "Ajuda a evitar loops e pode ser usado em filtros, mas não substitui validação de origem."
    },
    {
      "name": "LOCAL_PREF",
      "meaning": "Preferência local, comum para escolher saída dentro de um AS.",
      "securityNote": "Valor errado pode desviar tráfego de inspeção ou de link aprovado."
    },
    {
      "name": "MED",
      "meaning": "Sugestão para influenciar entrada de tráfego por vizinho externo.",
      "securityNote": "Nem todo vizinho respeita MED como esperado; documentar premissas."
    },
    {
      "name": "Community",
      "meaning": "Etiqueta usada para aplicar políticas de roteamento.",
      "securityNote": "Community errada pode alterar propagação, preferência ou blackhole."
    },
    {
      "name": "TCP 179",
      "meaning": "Porta usada para sessão BGP.",
      "securityNote": "Exposição indevida de BGP aumenta superfície de ataque; restringir vizinhos."
    }
  ],
  "packetFlow": [
    "O administrador define o ASN local, o vizinho BGP e o ASN remoto.",
    "Os roteadores estabelecem sessão TCP na porta 179.",
    "Os vizinhos trocam mensagens de abertura e capacidades.",
    "Prefixos são anunciados com atributos como AS_PATH, NEXT_HOP e communities.",
    "Políticas de entrada validam e filtram rotas recebidas.",
    "O processo BGP escolhe o melhor caminho conforme atributos e política local.",
    "Rotas selecionadas podem ser instaladas na tabela de roteamento.",
    "Políticas de saída controlam quais prefixos serão anunciados a cada vizinho.",
    "Monitoramento acompanha flaps, quantidade de prefixos, origem, AS_PATH e reachability."
  ],
  "deepDive": {
    "title": "BGP escolhe caminho por política, não apenas por distância",
    "points": [
      "O longest prefix match ainda é aplicado na tabela de roteamento final.",
      "Dentro do processo BGP, atributos como LOCAL_PREF, AS_PATH, origin, MED e eBGP/iBGP influenciam seleção.",
      "AS_PATH menor pode ser preferido em muitos cenários, mas política local pode vencer essa preferência.",
      "BGP não mede automaticamente latência fim a fim como um usuário percebe; ele aplica regras de seleção.",
      "Engenharia de tráfego com BGP exige cuidado porque o caminho de ida e o caminho de volta podem ser diferentes.",
      "Cloud híbrida frequentemente usa BGP privado para propagar rotas entre datacenter e VPC/VNet."
    ]
  },
  "commonMistakes": [
    "Achar que BGP é apenas OSPF em escala maior.",
    "Aceitar ou anunciar rotas sem prefix-list.",
    "Anunciar um bloco mais amplo do que o necessário.",
    "Não testar rota de retorno.",
    "Confundir sessão BGP estabelecida com tráfego funcionando.",
    "Ignorar RPKI/ROA e validação de origem.",
    "Aplicar mudança BGP sem janela, rollback e contato de provedor.",
    "Usar ASN privado em contexto público sem tradução/coordenação adequada."
  ],
  "troubleshooting": {
    "method": "Diagnosticar BGP separando transporte, sessão, anúncios, seleção de caminho, instalação na tabela de rotas e reachability fim a fim.",
    "steps": [
      "Confirmar conectividade IP até o vizinho BGP.",
      "Confirmar se TCP/179 está permitido entre os peers autorizados.",
      "Verificar ASN local, ASN remoto e IP do neighbor.",
      "Verificar estado da sessão BGP e mensagens de erro.",
      "Checar prefixos recebidos antes e depois de filtros.",
      "Checar prefixos anunciados ao vizinho.",
      "Validar AS_PATH, NEXT_HOP e políticas aplicadas.",
      "Confirmar se a rota BGP entrou na tabela de roteamento.",
      "Testar rota de ida e retorno com traceroute/mtr quando apropriado.",
      "Validar logs, monitoramento, RPKI e alterações recentes."
    ],
    "commands": [
      {
        "windows": [
          "tracert <destino>",
          "pathping <destino>",
          "route print",
          "Test-NetConnection <destino> -Port 443"
        ],
        "linux": [
          "ip route",
          "ip route get <destino>",
          "traceroute <destino>",
          "mtr <destino>",
          "curl -I https://<destino>"
        ],
        "cisco": [
          "show ip bgp summary",
          "show ip bgp",
          "show ip bgp neighbors",
          "show ip bgp neighbors <ip> advertised-routes",
          "show ip bgp neighbors <ip> received-routes",
          "show ip route bgp",
          "show running-config | section router bgp"
        ],
        "cloud": [
          "Verificar route tables",
          "Verificar propagação de rotas VPN/Direct Connect/ExpressRoute",
          "Verificar BGP peers/tunnels",
          "Validar prefixos anunciados e aprendidos",
          "Conferir sobreposição de CIDR"
        ]
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a BGP introdutório e Internet.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
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
      "Aceitar qualquer prefixo de qualquer vizinho.",
      "Anunciar todos os blocos internos sem necessidade.",
      "Tratar ASN privado e público sem distinção.",
      "Não ter contato e escalonamento com provedores.",
      "Fazer teste BGP em produção sem janela controlada.",
      "Ignorar rota de retorno ao validar incidentes.",
      "Confiar apenas em ping para provar saúde de roteamento."
    ],
    "vulnerabilities": [
      {
        "name": "Route hijack",
        "description": "Risco relacionado à aula 11.8 — BGP introdutório e Internet.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "RPKI/ROA"
      },
      {
        "name": "Route leak",
        "description": "Risco relacionado à aula 11.8 — BGP introdutório e Internet.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Prefix-list"
      },
      {
        "name": "Sessão BGP exposta",
        "description": "Risco relacionado à aula 11.8 — BGP introdutório e Internet.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "AS-PATH filter"
      },
      {
        "name": "Ausência de filtro",
        "description": "Risco relacionado à aula 11.8 — BGP introdutório e Internet.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Max-prefix"
      },
      {
        "name": "Prefixo amplo demais",
        "description": "Risco relacionado à aula 11.8 — BGP introdutório e Internet.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Autenticação de neighbor"
      },
      {
        "name": "Manipulação indevida de communities",
        "description": "Risco relacionado à aula 11.8 — BGP introdutório e Internet.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "TTL security quando aplicável"
      },
      {
        "name": "Caminho assimétrico desviando inspeção",
        "description": "Risco relacionado à aula 11.8 — BGP introdutório e Internet.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento externo"
      }
    ],
    "mitigations": [
      "RPKI/ROA",
      "Prefix-list",
      "AS-PATH filter",
      "Max-prefix",
      "Autenticação de neighbor",
      "TTL security quando aplicável",
      "Monitoramento externo",
      "Change management",
      "Validação de tabela de rotas"
    ],
    "goodPractices": [
      "Filtrar prefixos de entrada e saída com listas explícitas.",
      "Usar max-prefix para reduzir impacto de vazamento de rotas.",
      "Publicar e validar ROAs/RPKI quando aplicável.",
      "Restringir sessão BGP apenas a vizinhos autorizados.",
      "Proteger sessão com autenticação quando suportado e aplicável.",
      "Documentar política de comunidades e anúncios.",
      "Monitorar origem de prefixos, AS_PATH, flaps e quantidade de rotas.",
      "Aplicar mudanças por processo formal, revisão por pares e rollback."
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
      "RPKI/ROA",
      "Prefix-list",
      "AS-PATH filter",
      "Max-prefix",
      "Autenticação de neighbor",
      "TTL security quando aplicável",
      "Monitoramento externo",
      "Change management",
      "Validação de tabela de rotas"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "labType": "gns3",
    "title": "GNS3/arquitetura: eBGP seguro entre empresa, ISP e cloud com filtros, AS_PATH e RPKI conceitual",
    "objective": "Construir um laboratório conceitual/prático de BGP introdutório, entendendo AS, eBGP, anúncios de prefixo, AS_PATH, política de import/export, filtros de prefixo, max-prefix e validação de origem por RPKI em nível defensivo.",
    "scenario": "Uma empresa possui AS privado de laboratório 65010, dois provedores simulados AS65020 e AS65030, e uma rede cloud AS65040. O aluno deve anunciar apenas prefixos autorizados, filtrar o que recebe, observar AS_PATH e criar uma política de rejeição conceitual para prefixo inválido.",
    "topology": "R-EMPRESA AS65010 ligado a R-ISP1 AS65020 e R-ISP2 AS65030; R-CLOUD AS65040 ligado ao ISP1; loopbacks simulam prefixos corporativos e cloud.",
    "architecture": "BGP troca informações de alcançabilidade entre sistemas autônomos. A segurança do desenho depende mais de política, filtros, validação e governança do que de simplesmente formar neighbor.",
    "prerequisites": [
      "Concluir aulas 11.1–11.7.",
      "Entender roteamento, prefixo, rota de retorno, OSPF e troubleshooting básico."
    ],
    "tools": [
      "GNS3/EVE-NG ou Packet Tracer quando suportar BGP",
      "CLI Cisco/FRRouting equivalente",
      "Planilha/tabela de política BGP"
    ],
    "estimatedTimeMinutes": 150,
    "cost": "local; pode exigir imagens próprias em GNS3/EVE-NG",
    "safetyNotes": [
      "Use ASNs privados de laboratório 64512–65534 ou 4200000000–4294967294 conforme suporte.",
      "Nunca anuncie prefixos reais na Internet.",
      "Não conecte o laboratório a sessões BGP reais.",
      "O objetivo é defensivo: entender governança, filtros e prevenção de vazamentos."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir plano de endereçamento e ASNs",
        "instruction": "Documente ASNs, prefixos autorizados e enlaces ponto a ponto.",
        "command": "AS65010 EMPRESA: 10.10.0.0/16\nAS65020 ISP1\nAS65030 ISP2\nAS65040 CLOUD: 10.40.0.0/16",
        "expectedOutput": "Tabela de prefixos autorizados por AS.",
        "explanation": "BGP sem inventário de prefixos vira risco de vazamento e anúncio indevido."
      },
      {
        "number": 2,
        "title": "Configurar eBGP básico",
        "instruction": "Crie neighbor eBGP entre empresa e provedores.",
        "command": "router bgp 65010\n neighbor 172.16.12.2 remote-as 65020\n neighbor 172.16.13.2 remote-as 65030",
        "expectedOutput": "show ip bgp summary mostra neighbors estabelecidos.",
        "explanation": "A sessão BGP troca alcançabilidade entre ASes diferentes."
      },
      {
        "number": 3,
        "title": "Anunciar prefixo corporativo autorizado",
        "instruction": "Anuncie somente o bloco corporativo planejado.",
        "command": "router bgp 65010\n network 10.10.0.0 mask 255.255.0.0",
        "expectedOutput": "Prefixo aparece na tabela BGP dos provedores.",
        "explanation": "O comando network anuncia prefixo se ele existir na tabela de rotas local, conforme plataforma."
      },
      {
        "number": 4,
        "title": "Observar AS_PATH",
        "instruction": "Veja a rota cloud aprendida pela empresa e o caminho de AS.",
        "command": "show ip bgp 10.40.0.0",
        "expectedOutput": "Saída mostra AS_PATH atravessando os ASes simulados.",
        "explanation": "AS_PATH ajuda a evitar loops e serve como atributo de política."
      },
      {
        "number": 5,
        "title": "Criar prefix-list de saída",
        "instruction": "Permita apenas prefixos corporativos autorizados no anúncio para ISPs.",
        "command": "ip prefix-list EMPRESA-OUT permit 10.10.0.0/16\nroute-map EXPORT-EMPRESA permit 10\n match ip address prefix-list EMPRESA-OUT\nrouter bgp 65010\n neighbor 172.16.12.2 route-map EXPORT-EMPRESA out",
        "expectedOutput": "Somente 10.10.0.0/16 é anunciado.",
        "explanation": "Filtro de exportação reduz risco de vazamento de rotas internas, default indevida ou prefixos de terceiros."
      },
      {
        "number": 6,
        "title": "Criar filtro de entrada",
        "instruction": "Controle o que a empresa aceita dos provedores.",
        "command": "ip prefix-list ISP-IN permit 10.40.0.0/16\nroute-map IMPORT-ISP permit 10\n match ip address prefix-list ISP-IN\nrouter bgp 65010\n neighbor 172.16.12.2 route-map IMPORT-ISP in",
        "expectedOutput": "Empresa aceita apenas prefixos esperados no laboratório.",
        "explanation": "Importar tudo sem política pode trazer rotas indesejadas ou aumentar risco operacional."
      },
      {
        "number": 7,
        "title": "Configurar max-prefix",
        "instruction": "Aplique limite de prefixos recebidos para reduzir impacto de vazamento.",
        "command": "router bgp 65010\n neighbor 172.16.12.2 maximum-prefix 10 80",
        "expectedOutput": "Neighbor tem limite de prefixos configurado.",
        "explanation": "max-prefix é um freio operacional contra erro de anúncio massivo."
      },
      {
        "number": 8,
        "title": "Simular vazamento controlado",
        "instruction": "No ISP, anuncie um prefixo não autorizado e observe o filtro bloquear.",
        "command": "router bgp 65020\n network 10.99.0.0 mask 255.255.0.0",
        "expectedOutput": "Prefixo não aparece como rota aceita na empresa.",
        "explanation": "Validação defensiva testa também o que deve ser rejeitado."
      },
      {
        "number": 9,
        "title": "Aplicar política de preferência",
        "instruction": "Use local-preference ou AS_PATH prepend em laboratório para preferir ISP1 ou ISP2.",
        "command": "route-map PREFER-ISP1 permit 10\n set local-preference 200",
        "expectedOutput": "Tráfego de saída escolhe o provedor preferido.",
        "explanation": "BGP é protocolo de política; não busca apenas menor caminho técnico."
      },
      {
        "number": 10,
        "title": "Modelar RPKI/ROV conceitual",
        "instruction": "Crie tabela ROA conceitual: prefixo, AS autorizado, maxlength, estado expected valid/invalid/not-found.",
        "command": "10.10.0.0/16 -> AS65010 maxlength /16: valid\n10.10.1.0/24 -> AS65030: invalid",
        "expectedOutput": "Aluno classifica anúncios como valid, invalid ou not-found.",
        "explanation": "RPKI valida origem do prefixo; não resolve todos os problemas de caminho, mas reduz risco de origem indevida."
      },
      {
        "number": 11,
        "title": "Diagnosticar neighbor down",
        "instruction": "Quebre remote-as ou IP de neighbor e registre sintomas.",
        "command": "neighbor 172.16.12.2 remote-as 65099",
        "expectedOutput": "BGP summary mostra sessão Idle/Active ou não estabelecida.",
        "explanation": "BGP exige parâmetros de sessão coerentes e conectividade TCP/179."
      },
      {
        "number": 12,
        "title": "Produzir política BGP final",
        "instruction": "Entregue tabela de peers, prefixos permitidos, filtros, max-prefix, preferência e ação para RPKI invalid.",
        "command": "Peer | ASN | import | export | max-prefix | preferência | RPKI invalid action",
        "expectedOutput": "Documento de política defensiva.",
        "explanation": "Em produção, BGP é governança de política de roteamento, não apenas comandos."
      }
    ],
    "expectedResult": "O aluno deve formar sessões eBGP em laboratório, anunciar prefixos autorizados, filtrar import/export, observar AS_PATH, configurar max-prefix, simular rejeição de prefixo indevido e explicar RPKI/ROV em nível defensivo.",
    "validation": [
      {
        "check": "Sessões eBGP estabelecidas",
        "command": "show ip bgp summary",
        "expected": "Neighbors em Established com contadores de prefixos coerentes.",
        "ifFails": "Verificar IP, remote-as, rota para neighbor, ACL/TCP 179 e source-interface se usada."
      },
      {
        "check": "Prefixos autorizados anunciados",
        "command": "show ip bgp neighbors x.x.x.x advertised-routes",
        "expected": "Somente prefixos permitidos aparecem.",
        "ifFails": "Corrigir network, prefix-list e route-map de exportação."
      },
      {
        "check": "Prefixos não autorizados bloqueados",
        "command": "show ip bgp 10.99.0.0",
        "expected": "Prefixo indevido ausente ou rejeitado conforme política.",
        "ifFails": "Verificar ordem de prefix-list/route-map."
      },
      {
        "check": "AS_PATH compreendido",
        "command": "show ip bgp prefixo",
        "expected": "AS_PATH reflete caminho inter-AS.",
        "ifFails": "Validar peers e anúncios intermediários."
      },
      {
        "check": "max-prefix configurado",
        "command": "show running-config | section router bgp",
        "expected": "maximum-prefix nos peers relevantes.",
        "ifFails": "Adicionar limite adequado ao cenário."
      },
      {
        "check": "Política de preferência documentada",
        "command": "Comparar local-pref/AS_PATH e caminho escolhido.",
        "expected": "Escolha de caminho bate com política.",
        "ifFails": "Revisar atributos BGP e route-maps."
      },
      {
        "check": "RPKI conceitual aplicado",
        "command": "Tabela ROA/ROV do laboratório.",
        "expected": "Aluno classifica valid/invalid/not-found corretamente.",
        "ifFails": "Revisar prefixo, ASN de origem e maxlength."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Neighbor fica Idle/Active",
        "probableCause": "Sem conectividade IP, ASN errado, ACL bloqueando TCP/179 ou update-source incorreto.",
        "howToConfirm": "ping do neighbor, show ip bgp summary, logs e show run bgp.",
        "fix": "Corrigir conectividade, remote-as, source e ACL."
      },
      {
        "symptom": "Sessão sobe, mas rota não aparece",
        "probableCause": "Prefixo não existe na RIB local, filtro bloqueando ou route-map incorreto.",
        "howToConfirm": "show ip route prefixo e advertised-routes/received-routes.",
        "fix": "Garantir rota local e ajustar filtros."
      },
      {
        "symptom": "Prefixo indevido é aceito",
        "probableCause": "Import policy permissiva ou prefix-list ampla demais.",
        "howToConfirm": "show route-map, show ip prefix-list e tabela BGP.",
        "fix": "Aplicar allowlist explícita e negar restante."
      },
      {
        "symptom": "Preferência de saída não funciona",
        "probableCause": "Atributo aplicado na direção errada ou atributo inadequado.",
        "howToConfirm": "show ip bgp prefixo e route-map no neighbor correto.",
        "fix": "Aplicar local-preference internamente ou ajuste de política adequado."
      },
      {
        "symptom": "Queda por excesso de prefixos",
        "probableCause": "maximum-prefix disparado após vazamento.",
        "howToConfirm": "logs e show ip bgp summary.",
        "fix": "Investigar vazamento, ajustar limite conscientemente e resetar sessão se autorizado."
      },
      {
        "symptom": "RPKI invalid derruba rota legítima em laboratório conceitual",
        "probableCause": "ROA com maxlength errado ou AS de origem incorreto.",
        "howToConfirm": "Comparar anúncio, origem e tabela ROA.",
        "fix": "Corrigir ROA/maxlength antes de política de rejeição estrita."
      }
    ],
    "improvements": [
      "Adicionar iBGP interno com loopback e next-hop-self.",
      "Comparar local-pref, MED e AS_PATH prepend.",
      "Adicionar communities de blackhole em cenário defensivo controlado.",
      "Criar variação cloud com Cloud Router/ExpressRoute/Direct Connect conceitual.",
      "Criar exercício de análise de incidente de route leak."
    ],
    "evidenceToCollect": [
      "show ip bgp summary.",
      "show ip bgp.",
      "show ip bgp prefixo.",
      "advertised-routes/received-routes quando disponível.",
      "show route-map.",
      "show ip prefix-list.",
      "Tabela de política import/export.",
      "Tabela RPKI conceitual valid/invalid/not-found."
    ],
    "questions": [
      "Por que BGP é considerado protocolo de política?",
      "O que AS_PATH mostra e o que ele não garante sozinho?",
      "Por que filtros de saída são tão importantes quanto filtros de entrada?",
      "O que RPKI valida e o que não valida?",
      "Por que max-prefix é controle operacional defensivo?"
    ],
    "challenge": "Você recebeu dois ISPs e precisa anunciar 10.10.0.0/16 sem vazar rotas internas 10.99.0.0/16. Defina política de exportação, importação, preferência de saída, max-prefix e tratamento de RPKI invalid.",
    "solution": "A solução usa allowlist de exportação apenas para 10.10.0.0/16, import policy restritiva para prefixos esperados, max-prefix por peer, preferência explícita para o ISP principal e política de RPKI que rejeita invalid depois de validar ROAs e processo operacional. Também documenta evidências com BGP summary, advertised-routes e tabela de prefixos autorizados.",
    "id": "lab-11.8"
  },
  "mentorQuestions": [
    "O que diferencia BGP de OSPF em termos de domínio administrativo e política?",
    "Por que uma sessão BGP estabelecida não prova que o tráfego de aplicação está funcionando?",
    "Quais controles você exigiria antes de permitir que uma empresa anuncie prefixos para dois provedores?"
  ],
  "quiz": [
    {
      "question": "Qual é a principal função do BGP?",
      "options": [
        "Resolver nomes DNS",
        "Trocar rotas entre sistemas autônomos",
        "Substituir ARP na LAN",
        "Criptografar pacotes IP"
      ],
      "answer": 1,
      "explanation": "BGP troca informações de roteamento entre domínios administrativos, especialmente sistemas autônomos."
    },
    {
      "question": "O que é AS_PATH?",
      "options": [
        "Lista de VLANs permitidas em trunk",
        "Sequência de ASNs no caminho anunciado",
        "Endereço MAC do próximo salto",
        "Tempo de vida do pacote"
      ],
      "answer": 1,
      "explanation": "AS_PATH mostra a sequência de sistemas autônomos atravessados até o prefixo."
    },
    {
      "question": "Qual porta TCP é normalmente associada ao BGP?",
      "options": [
        "22",
        "53",
        "179",
        "443"
      ],
      "answer": 2,
      "explanation": "Sessões BGP normalmente usam TCP porta 179."
    },
    {
      "question": "Qual prática reduz o risco de aceitar rotas demais de um vizinho?",
      "options": [
        "Desabilitar ARP",
        "Max-prefix",
        "Aumentar MTU sem teste",
        "Usar somente ping"
      ],
      "answer": 1,
      "explanation": "Max-prefix limita a quantidade de prefixos recebidos e pode proteger contra vazamentos."
    },
    {
      "question": "BGP escolhe caminhos principalmente com base em quê?",
      "options": [
        "Apenas menor latência",
        "Apenas menor número de switches",
        "Atributos e políticas de roteamento",
        "Somente endereço MAC"
      ],
      "answer": 2,
      "explanation": "BGP é fortemente baseado em atributos e políticas."
    },
    {
      "question": "O que RPKI/ROA ajuda a validar?",
      "options": [
        "A velocidade do link",
        "A origem autorizada de prefixos",
        "O endereço MAC do gateway",
        "A senha do usuário"
      ],
      "answer": 1,
      "explanation": "RPKI/ROA ajuda a validar se um AS está autorizado a originar determinado prefixo."
    },
    {
      "id": "q11.8-p1-1",
      "type": "segurança",
      "q": "Qual controle ajuda a reduzir impacto de um vazamento de muitos prefixos recebidos de um peer BGP?",
      "opts": [
        "maximum-prefix",
        "ARP cache",
        "DHCP snooping apenas",
        "HTTP keep-alive"
      ],
      "a": 0,
      "exp": "maximum-prefix limita a quantidade de prefixos aceitos de um vizinho e pode proteger contra vazamentos massivos.",
      "difficulty": "intermediário",
      "topic": "BGP segurança"
    }
  ],
  "flashcards": [
    {
      "front": "BGP",
      "back": "Protocolo de roteamento usado para trocar rotas entre sistemas autônomos."
    },
    {
      "front": "ASN",
      "back": "Identificador de um sistema autônomo, isto é, um domínio administrativo de roteamento."
    },
    {
      "front": "eBGP",
      "back": "Sessão BGP entre ASNs diferentes."
    },
    {
      "front": "iBGP",
      "back": "Sessão BGP entre roteadores do mesmo AS."
    },
    {
      "front": "AS_PATH",
      "back": "Atributo que lista os ASNs no caminho até o prefixo anunciado."
    },
    {
      "front": "Route leak",
      "back": "Propagação indevida de rotas, causando caminhos inesperados ou incidentes."
    },
    {
      "front": "RPKI/ROA",
      "back": "Mecanismo para validar origem autorizada de prefixos BGP."
    }
  ],
  "exercises": [
    {
      "title": "IGP versus BGP",
      "task": "Explique por que OSPF é adequado para dentro da empresa e BGP para conexões entre empresas/provedores.",
      "expectedAnswer": "OSPF assume domínio administrativo comum; BGP lida com políticas entre ASNs independentes."
    },
    {
      "title": "Prefixos autorizados",
      "task": "Liste quais prefixos uma empresa deve anunciar para seus provedores e quais não deve anunciar.",
      "expectedAnswer": "Deve anunciar apenas blocos próprios/autorizados; não deve anunciar default, blocos de terceiros ou redes internas sem necessidade."
    },
    {
      "title": "Multihoming",
      "task": "Descreva como BGP ajuda uma empresa com dois provedores.",
      "expectedAnswer": "Permite anunciar prefixos por ambos, preferir um caminho e usar outro em contingência."
    },
    {
      "title": "Risco de route leak",
      "task": "Explique um cenário de route leak e como mitigar.",
      "expectedAnswer": "Um AS propaga rotas que não deveria; mitigar com filtros, max-prefix, RPKI, comunidades e revisão de mudança."
    },
    {
      "id": "ex11.8-p1-1",
      "type": "política",
      "prompt": "Uma empresa vai anunciar 203.0.113.0/24 para dois ISPs. Que controles mínimos de BGP você exigiria?",
      "expectedAnswer": "Prefix-list de saída, filtro de entrada, max-prefix, monitoramento, política de preferência, documentação de AS_PATH/local-pref, validação RPKI quando aplicável e processo de mudança.",
      "explanation": "BGP seguro depende de política e governança."
    },
    {
      "id": "ex11.8-p1-2",
      "type": "segurança",
      "prompt": "O que RPKI/ROV ajuda a validar e o que ele não resolve sozinho?",
      "expectedAnswer": "Ajuda a validar se um AS está autorizado a originar um prefixo. Não valida todo o caminho AS_PATH nem substitui filtros, monitoramento e governança.",
      "explanation": "RPKI reduz um risco importante, mas não torna BGP automaticamente seguro."
    }
  ],
  "challenge": {
    "title": "Plano BGP seguro para empresa com dois provedores e cloud",
    "scenario": "A empresa possui AS 65010 em laboratório, dois ISPs simulados e uma conexão cloud. Ela precisa anunciar 10.50.0.0/16 internamente no lab, preferir ISP A, manter ISP B como backup e trocar rotas com cloud sem sobreposição.",
    "tasks": [
      "Definir prefixos permitidos de saída",
      "Definir rotas aceitas de entrada",
      "Definir preferência de caminho",
      "Mapear validações",
      "Listar riscos e controles",
      "Criar rollback"
    ],
    "rubric": [
      "Correção conceitual",
      "Controle de prefixos",
      "Segurança",
      "Validação operacional",
      "Clareza de documentação",
      "Plano de rollback"
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
  "commentedSolution": {
    "summary": "A solução segura começa limitando anúncios. A empresa não deve anunciar qualquer rede por conveniência. Ela define prefix-list explícita para blocos autorizados, aplica filtros de entrada, usa max-prefix, documenta comunidades, considera RPKI/ROA e testa failover.",
    "steps": [
      "Declarar AS local e ASNs remotos.",
      "Criar lista de prefixos autorizados.",
      "Aplicar filtro de saída por vizinho.",
      "Aplicar filtro de entrada e max-prefix.",
      "Definir preferência por ISP A e backup via ISP B.",
      "Validar sessão, anúncios, rotas instaladas e tráfego fim a fim.",
      "Testar rota de retorno e caminho assimétrico.",
      "Registrar evidências e rollback."
    ],
    "whyItWorks": "O plano separa sessão BGP de política de roteamento. Ele evita anúncios acidentais, reduz impacto de vazamento, cria previsibilidade operacional e fornece evidência de funcionamento.",
    "commonWrongSolution": "Subir sessão BGP, aceitar tudo, anunciar tudo e validar apenas com ping. Isso ignora filtros, origem autorizada, rota de retorno e impacto global de anúncios errados."
  },
  "glossary": [
    {
      "term": "BGP",
      "definition": "Border Gateway Protocol, protocolo usado para troca de rotas entre sistemas autônomos."
    },
    {
      "term": "ASN",
      "definition": "Número que identifica um sistema autônomo."
    },
    {
      "term": "Prefixo",
      "definition": "Bloco de endereços anunciado, como 203.0.113.0/24."
    },
    {
      "term": "eBGP",
      "definition": "Sessão BGP entre ASNs diferentes."
    },
    {
      "term": "AS_PATH",
      "definition": "Atributo que indica a sequência de ASNs até um prefixo."
    },
    {
      "term": "Route leak",
      "definition": "Propagação indevida de rotas para vizinhos."
    },
    {
      "term": "Route hijack",
      "definition": "Anúncio indevido de prefixo por origem não autorizada."
    },
    {
      "term": "RPKI/ROA",
      "definition": "Mecanismo para validar autorização de origem de prefixos."
    }
  ],
  "references": [
    {
      "title": "RFC 4271 — A Border Gateway Protocol 4",
      "type": "standard",
      "note": "Referência técnica base do BGP-4."
    },
    {
      "title": "RFC 6811 — BGP Prefix Origin Validation",
      "type": "standard",
      "note": "Base conceitual para validação de origem com RPKI."
    },
    {
      "title": "Documentação Cisco — BGP Configuration Guide",
      "type": "vendor-doc",
      "note": "Comandos e conceitos operacionais."
    },
    {
      "title": "Documentação de provedores cloud sobre BGP em VPN e links dedicados",
      "type": "cloud-doc",
      "note": "Aplicação prática em ambientes híbridos."
    },
    {
      "type": "rfc",
      "title": "RFC 4271 — A Border Gateway Protocol 4 (BGP-4)",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/info/rfc4271/",
      "note": "Referência normativa para BGP-4; usada para validar conceitos de eBGP/iBGP, AS_PATH, NEXT_HOP, política e troca de alcançabilidade entre ASes."
    },
    {
      "type": "rfc",
      "title": "RFC 8210 — RPKI to Router Protocol, Version 1",
      "organization": "IETF",
      "url": "https://datatracker.ietf.org/doc/html/rfc8210",
      "note": "Referência para entrega de dados RPKI validados do cache ao roteador."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e GitOps",
      "reason": "Políticas de roteamento e conexões cloud podem ser versionadas e revisadas como código."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Rotas definem alcançabilidade, mas autorização entre serviços depende de identidade e política de acesso."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 5",
      "reason": "BGP anuncia prefixos; subnetting e planejamento de endereçamento são pré-requisitos diretos."
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
    "minimumQuizScore": 70,
    "minimumChallengeScore": 70,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "11.9"
    ]
  }
};
