export const lesson0106 = {
  "id": "1.6",
  "moduleId": "m01",
  "order": 6,
  "title": "Cabeamento estruturado e padrões RJ-45",
  "subtitle": "Como organizar a rede física de forma padronizada, documentada, testável e segura — do patch panel até a tomada de rede.",
  "duration": "80-115 min",
  "estimatedStudyTimeMinutes": 115,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "cabeamento estruturado",
    "RJ-45",
    "Ethernet",
    "patch panel",
    "rack",
    "T568A",
    "T568B",
    "PoE",
    "troubleshooting",
    "segurança física"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias físicas e lógicas ajudam a entender por que o cabeamento precisa ser planejado e documentado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.5",
      "reason": "A aula anterior explicou os meios de transmissão, especialmente cobre, fibra e rádio."
    }
  ],
  "objectives": [
    "Entender o que é cabeamento estruturado e por que ele existe.",
    "Diferenciar cabo, tomada, patch cord, patch panel, rack, switch e ponto de rede.",
    "Compreender os padrões T568A e T568B sem decorar pinagem de forma cega.",
    "Relacionar categoria de cabo, distância, interferência, PoE e velocidade negociada.",
    "Diagnosticar problemas comuns de cabeamento com evidências e sem achismo.",
    "Entender impactos de segurança física e operação em ambientes corporativos."
  ],
  "learningOutcomes": [
    "Dado um rack simples, o aluno consegue explicar o caminho lógico e físico entre uma tomada e um switch.",
    "Dado um cabo ou patch panel mal documentado, o aluno identifica riscos operacionais e de segurança.",
    "Dado um sintoma como porta em 100 Mbps em vez de 1 Gbps, o aluno levanta hipóteses físicas coerentes.",
    "Dado um cenário de empresa pequena, o aluno propõe organização mínima de cabeamento, documentação e validação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine uma empresa pequena que cresceu rápido. No começo havia apenas um roteador, alguns cabos soltos e um switch em cima de uma mesa. Depois vieram câmeras IP, telefones VoIP, access points, impressoras, servidores, usuários de visitantes, um firewall e um link dedicado. Em algum momento, ninguém sabe mais qual cabo vai para qual sala, qual porta alimenta qual access point, qual tomada está ligada ao switch correto ou por que uma estação negocia 100 Mbps quando deveria negociar 1 Gbps.</p>\n  <p>Esse tipo de caos físico parece simples, mas afeta tudo: disponibilidade, segurança, troubleshooting, auditoria, mudança de layout, expansão, inventário, resposta a incidente e até custo. Quando o cabeamento não é estruturado, cada manutenção vira tentativa e erro. Quando ele é estruturado, o ambiente fica previsível, documentável e testável.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o SOC detecta tráfego suspeito vindo de um ponto de rede, mas o inventário não diz qual tomada, sala ou equipamento está conectado ali. O incidente deixa de ser apenas técnico e vira problema de documentação física, controle de acesso e rastreabilidade.</div>\n</section>\n",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Nos primeiros ambientes de rede, era comum que cabos fossem instalados de forma pontual: um cabo para um computador, outro para uma impressora, outro improvisado para uma sala nova. Enquanto a rede era pequena, isso parecia suficiente. O problema surgia quando o ambiente precisava crescer, ser mantido por outra equipe, passar por auditoria ou ser diagnosticado rapidamente.</p>\n  <p>O cabeamento estruturado surgiu para tratar a infraestrutura física como um sistema planejado, não como um amontoado de fios. A ideia central é separar áreas, usar pontos de telecomunicação, racks, patch panels, identificação, documentação, limites de distância, categorias de cabo e testes. Em vez de cada cabo ser uma exceção, cada ponto passa a fazer parte de uma arquitetura previsível.</p>\n  <p>O conector modular de oito posições usado em Ethernet de par trançado ficou popularmente conhecido como RJ-45. Tecnicamente, há nuances entre o padrão de conector e o uso popular do termo, mas na prática de TI é comum chamar o conector Ethernet de par trançado de RJ-45. O importante para o aluno agora é entender o papel do conector, dos pares, da pinagem e dos padrões de terminação.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema do cabeamento não é apenas “fazer o cabo funcionar”. O problema é construir uma infraestrutura física que continue funcionando depois de mudanças, expansões, incidentes, auditorias, substituição de equipamentos e crescimento da empresa.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem padronização:</strong> cabos podem ser terminados com pinagens diferentes, dificultando manutenção e gerando falhas intermitentes.</li>\n    <li><strong>Sem documentação:</strong> ninguém sabe qual tomada corresponde a qual porta do patch panel ou do switch.</li>\n    <li><strong>Sem certificação:</strong> o cabo pode “dar link”, mas não suportar a taxa esperada de forma confiável.</li>\n    <li><strong>Sem organização física:</strong> racks viram emaranhados, ventilação piora, troca de equipamentos fica arriscada e erros humanos aumentam.</li>\n    <li><strong>Sem segurança física:</strong> portas ativas em locais públicos podem permitir conexão indevida à rede interna.</li>\n  </ul>\n</section>\n",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução do cabeamento em redes locais acompanhou o crescimento da Ethernet. Ambientes que antes aceitavam improviso passaram a exigir desempenho maior, PoE, câmeras, Wi-Fi corporativo, telefonia IP e documentação compatível com operação profissional.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Cabos improvisados</td><td>Cada cabo ia diretamente do equipamento ao switch</td><td>Difícil manter, rastrear e expandir</td><td>Cabeamento horizontal com tomadas e patch panel</td></tr>\n      <tr><td>Rack sem padrão</td><td>Switches e cabos instalados conforme necessidade imediata</td><td>Bagunça, erro humano e risco de desconectar serviço crítico</td><td>Racks organizados, identificação, guia de cabos e documentação</td></tr>\n      <tr><td>Teste básico de continuidade</td><td>Verificava apenas se os fios tinham contato</td><td>Não garantia desempenho, ruído, perda ou categoria</td><td>Testes e certificação com medição de parâmetros físicos</td></tr>\n      <tr><td>Portas sempre ativas</td><td>Qualquer tomada podia receber qualquer dispositivo</td><td>Risco de acesso indevido e movimento lateral</td><td>Inventário, 802.1X, VLANs, port security e desativação de portas ociosas</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Cabeamento estruturado é o conjunto de práticas, componentes e padrões usados para organizar a infraestrutura física de comunicação de um ambiente. Ele inclui cabos, tomadas, patch panels, racks, identificação, caminhos, documentação, testes e critérios de instalação.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em redes locais, cabeamento estruturado é a infraestrutura planejada que conecta áreas de trabalho ao rack de telecomunicações de forma padronizada, identificável, testável e preparada para mudanças.</div>\n  <p>O conector RJ-45, no uso comum de redes Ethernet, aparece na ponta de patch cords e cabos de par trançado. A terminação normalmente segue T568A ou T568B. A regra prática mais importante para o aluno iniciante é: use o mesmo padrão nas duas pontas para cabo direto comum e documente o padrão adotado no ambiente.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Um ponto de rede estruturado normalmente não é apenas um cabo entre computador e switch. Ele envolve um caminho com várias partes, cada uma podendo introduzir falhas.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Dispositivo final:</strong> notebook, desktop, telefone IP, impressora, câmera ou access point conecta-se a uma tomada ou patch cord.</li>\n    <li><strong>Patch cord da área de trabalho:</strong> cabo flexível liga o equipamento à tomada de rede.</li>\n    <li><strong>Tomada/keystone:</strong> ponto fixo onde o cabo horizontal termina no ambiente do usuário.</li>\n    <li><strong>Cabo horizontal:</strong> cabo instalado por infraestrutura, normalmente indo da tomada até o rack ou sala de telecomunicações.</li>\n    <li><strong>Patch panel:</strong> painel no rack onde os cabos horizontais terminam de forma organizada e identificada.</li>\n    <li><strong>Patch cord de rack:</strong> cabo curto liga a porta do patch panel à porta do switch.</li>\n    <li><strong>Switch:</strong> equipamento ativo que negocia velocidade, duplex, PoE quando aplicável e encaminha quadros Ethernet.</li>\n  </ol>\n  <p>Quando uma estação não conecta, cada etapa precisa ser verificada. Um link apagado pode ser cabo solto, porta desativada, tomada errada, patch panel mal identificado, conector danificado, interface desabilitada, equipamento sem energia ou política de segurança bloqueando acesso.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Na arquitetura física, o cabeamento estruturado organiza a rede em áreas funcionais. Uma empresa pode ter sala de telecomunicações, rack principal, patch panels, switches de acesso, cabeamento horizontal para estações, backbone entre racks e fibra entre prédios.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Área de trabalho:</strong> onde ficam usuários, estações, telefones, impressoras e pontos de acesso.</li>\n    <li><strong>Cabeamento horizontal:</strong> liga as tomadas da área de trabalho à sala de telecomunicações.</li>\n    <li><strong>Sala de telecomunicações:</strong> concentra patch panels, switches, organização de cabos e documentação física.</li>\n    <li><strong>Backbone:</strong> interliga racks, andares, prédios ou datacenters, frequentemente com fibra.</li>\n    <li><strong>Documentação:</strong> conecta o mundo físico ao inventário lógico: porta, tomada, sala, switch, VLAN, serviço e responsável.</li>\n  </ul>\n  <p>Em cloud, o provedor abstrai esse cabeamento, mas o conceito continua útil: regiões, zonas, racks, enlaces e caminhos físicos existem, mesmo que você só veja uma VPC, VNet, subnet, interface virtual ou gateway.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense no cabeamento estruturado como a instalação elétrica e hidráulica de um prédio. Você não quer fios passando aleatoriamente pelo chão nem canos improvisados sem identificação. Você quer quadros, tomadas, conduítes, etiquetas, planta, manutenção e pontos previsíveis.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> rede não é apenas infraestrutura passiva. Depois do cabo existem protocolos, VLANs, autenticação, firewalls, logs e políticas. Um ponto físico correto não garante autorização nem segurança lógica.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, você liga um cabo do roteador ao computador. Se funcionar, ótimo. Mas se o cabo estiver mal crimpado, dobrado demais, partido parcialmente ou com conector frouxo, o computador pode negociar uma velocidade menor ou perder pacotes. Você talvez culpe o provedor, mas o problema está entre a placa de rede e a porta física.</p>\n  <p>Em uma versão mais organizada, mesmo em casa, você pode identificar cabos, evitar passar cabo junto a fontes de interferência, usar patch cords bons e manter o roteador em local ventilado.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, cada ponto de rede deve ter identificação. Por exemplo: <code>2A-034</code> pode indicar prédio 2, andar A, ponto 034. No rack, o patch panel mostra o mesmo código. O inventário informa que esse ponto está na sala financeira, conectado ao switch de acesso 3, porta 18, VLAN corporativa, com autenticação 802.1X habilitada.</p>\n  <p>Essa rastreabilidade muda tudo. Se a porta gera muitos erros, você sabe onde ir. Se há tráfego suspeito, você sabe que tomada investigar. Se o usuário muda de mesa, a equipe entende quais patches alterar. Se uma porta está em área pública, ela pode ficar desligada até ser necessária.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na cloud pública, você normalmente não gerencia cabo, patch panel ou rack. Mesmo assim, o raciocínio de cabeamento estruturado aparece em conectividade híbrida. Links dedicados, cross-connects, appliances de borda, roteadores, firewalls e datacenters colocation exigem documentação física e lógica.</p>\n  <p>Quando uma empresa usa conexão dedicada com cloud, falhas podem envolver porta física, transceptor, fibra, provedor, roteador, BGP, VLAN de transporte ou política. Sem documentação do circuito, do rack e das portas, o troubleshooting fica lento e caro.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>DevSecOps parece distante de cabos, mas não é. Pipelines, clusters, runners, servidores de build, appliances de segurança, repositórios internos, registry de containers e plataformas de observabilidade dependem de conectividade confiável. Um runner de CI/CD em rede instável pode falhar em downloads, publicar artefatos incompletos ou gerar falsos positivos de indisponibilidade.</p>\n  <p>Em ambientes maduros, infraestrutura física vira item de inventário, monitoramento e mudança. Uma alteração em rack pode precisar de janela, rollback, evidências, atualização de documentação e validação automatizada de serviços.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Cabeamento estruturado também é controle de segurança. Porta física ativa em local público, rack destrancado, patch panel sem identificação, cabo de câmera acessível ou switch de mesa sem controle podem virar caminho de acesso indevido. O foco aqui é defensivo: reduzir superfície física, aumentar rastreabilidade e melhorar detecção.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Porta ociosa ativa</td><td>Tomada disponível em sala pública ou recepção</td><td>Conexão indevida à rede interna</td><td>Desativar portas não usadas, 802.1X, port security e VLAN restrita</td></tr>\n      <tr><td>Rack aberto</td><td>Patch cords acessíveis a pessoas não autorizadas</td><td>Desconexão, espelhamento físico ou sabotagem</td><td>Controle físico, registro de acesso, CFTV e organização</td></tr>\n      <tr><td>Documentação inexistente</td><td>Não se sabe qual porta corresponde ao incidente</td><td>Resposta lenta e investigação fraca</td><td>Inventário, etiquetas, mapa físico e revisão periódica</td></tr>\n      <tr><td>PoE sem planejamento</td><td>APs ou câmeras desligam por falta de orçamento PoE</td><td>Indisponibilidade e perda de visibilidade</td><td>Dimensionar orçamento PoE e monitorar consumo</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 430\" role=\"img\" aria-labelledby=\"m01l06-title m01l06-desc\">\n    <title id=\"m01l06-title\">Caminho do cabeamento estruturado até o switch</title>\n    <desc id=\"m01l06-desc\">O diagrama mostra dispositivo final, patch cord, tomada, cabo horizontal, patch panel, patch cord de rack, switch e documentação de porta.</desc>\n    <defs>\n      <marker id=\"m01l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"97\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"97\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dispositivo final</text>\n    <rect x=\"220\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"287\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Tomada</text>\n    <text x=\"287\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">keystone</text>\n    <rect x=\"410\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"477\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Cabo horizontal</text>\n    <text x=\"477\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">infraestrutura</text>\n    <rect x=\"600\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"667\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Patch panel</text>\n    <text x=\"667\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta identificada</text>\n    <rect x=\"790\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"857\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"857\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta/VLAN/PoE</text>\n    <line x1=\"165\" y1=\"131\" x2=\"220\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"355\" y1=\"131\" x2=\"410\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"545\" y1=\"131\" x2=\"600\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"735\" y1=\"131\" x2=\"790\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <rect x=\"70\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"200\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Padrão físico</text>\n    <text x=\"200\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">categoria, distância, terminação</text>\n    <text x=\"200\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">T568A/B e qualidade do conector</text>\n    <rect x=\"390\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"520\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Operação</text>\n    <text x=\"520\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">etiqueta, inventário, patching</text>\n    <text x=\"520\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">teste, certificação e mudança</text>\n    <rect x=\"710\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone svg-node--security\" />\n    <text x=\"840\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Segurança</text>\n    <text x=\"840\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta física, 802.1X, VLAN</text>\n    <text x=\"840\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rastreabilidade e menor exposição</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é um inventário guiado de cabeamento. Ele pode ser feito em casa, em laboratório ou em ambiente corporativo com autorização. A ideia é mapear um caminho físico de rede e produzir evidências sem desconectar cabos críticos.</p>\n</section>\n",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam pinagem, documentação, sintomas físicos, PoE e decisão de arquitetura.</p>\n</section>\n",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma pequena empresa que precisa deixar de usar cabos improvisados e migrar para um cabeamento estruturado mínimo.</p>\n</section>\n",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução explica como pensar em identificação, caminho físico, rack, patch panel, categorias de cabo, validação e segurança.</p>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> cabeamento estruturado transforma cabos em infraestrutura física organizada, documentada e testável.</li>\n    <li><strong>O que lembrar:</strong> um ponto de rede envolve equipamento, patch cord, tomada, cabo horizontal, patch panel, rack, switch e documentação.</li>\n    <li><strong>Erro comum:</strong> achar que “deu link” significa que o cabeamento está adequado para a velocidade, PoE e estabilidade esperadas.</li>\n    <li><strong>Uso real:</strong> bons padrões físicos reduzem tempo de troubleshooting, erro humano, indisponibilidade e risco de acesso indevido.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Depois de entender cabeamento estruturado, vamos estudar equipamentos de rede: NIC, hub, switch, roteador, access point e firewall. A pergunta muda de “por onde o sinal passa?” para “quem recebe, encaminha, filtra ou distribui esse tráfego?”.</p>\n</section>\n"
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
      "PoE",
      "LLDP",
      "CDP",
      "802.1X"
    ],
    "dependsOn": [
      "meios de transmissão",
      "topologia física",
      "sinais físicos"
    ],
    "enables": [
      "switching",
      "VLAN",
      "port security",
      "troubleshooting físico",
      "inventário de rede"
    ]
  },
  "deepDive": {
    "mentalModel": "Cabeamento estruturado é a disciplina que transforma fios individuais em uma infraestrutura rastreável. Antes de culpar IP ou aplicação, confirme o caminho físico, a identificação, a porta, a velocidade negociada, os erros e a documentação.",
    "keyTerms": [
      "RJ-45",
      "T568A",
      "T568B",
      "patch panel",
      "patch cord",
      "keystone",
      "cabo horizontal",
      "rack",
      "PoE",
      "certificação de cabo"
    ],
    "limitations": [
      "Cabeamento estruturado não substitui segmentação lógica, firewall ou autenticação.",
      "Um cabo funcionando em continuidade simples pode ainda falhar em desempenho ou estabilidade.",
      "Documentação física fica obsoleta se mudanças não forem registradas.",
      "Padrões corretos reduzem risco, mas não eliminam erro humano."
    ],
    "whenToUse": [
      "Em qualquer ambiente corporativo com múltiplos pontos de rede.",
      "Em salas, escritórios, racks, datacenters, laboratórios e escolas.",
      "Quando houver necessidade de expansão, auditoria, rastreabilidade ou suporte recorrente.",
      "Quando APs, câmeras e telefones IP dependem de PoE."
    ],
    "whenNotToUse": [
      "Não faz sentido montar infraestrutura permanente para um teste temporário muito pequeno sem risco operacional.",
      "Não use cabeamento improvisado como solução definitiva em produção.",
      "Não mantenha portas ativas sem necessidade em áreas não controladas."
    ],
    "operationalImpact": [
      "Reduz tempo de diagnóstico, mas exige documentação e disciplina de mudança.",
      "Melhora previsibilidade de manutenção e expansão.",
      "Exige etiquetas, inventário, organização de rack e controle de patching."
    ],
    "financialImpact": [
      "A instalação inicial pode custar mais que cabos improvisados, mas reduz custo de manutenção e indisponibilidade.",
      "Certificadores, patch panels, racks e mão de obra qualificada têm custo.",
      "PoE e switches adequados podem exigir investimento, especialmente para APs, câmeras e telefonia IP."
    ],
    "securityImpact": [
      "Permite rastrear pontos físicos envolvidos em incidentes.",
      "Reduz exposição ao desativar portas ociosas e controlar racks.",
      "Documentação sensível deve ser protegida porque revela caminhos físicos e lógicos."
    ],
    "decisionTable": [
      {
        "situation": "Mesa nova em área administrativa",
        "recommendedChoice": "Criar ponto identificado no patch panel e no inventário",
        "why": "Permite manutenção e rastreabilidade",
        "risk": "Sem identificação, incidentes e mudanças ficam lentos"
      },
      {
        "situation": "Access point no teto",
        "recommendedChoice": "Cabo estruturado com PoE dimensionado",
        "why": "Reduz fonte externa e simplifica instalação",
        "risk": "Sem orçamento PoE, AP pode reiniciar ou não ligar"
      },
      {
        "situation": "Porta em recepção",
        "recommendedChoice": "Manter desativada ou colocar em VLAN restrita com autenticação",
        "why": "Área pública aumenta risco de conexão indevida",
        "risk": "Acesso físico pode virar acesso lógico"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que qualquer cabo com conector RJ-45 serve para qualquer velocidade.",
      "whyItHappens": "Visualmente muitos cabos parecem iguais.",
      "consequence": "Negociação em velocidade menor, erros, queda de link e troubleshooting confuso.",
      "correction": "Verificar categoria, estado físico, distância, terminação e evidências de porta."
    },
    {
      "mistake": "Misturar T568A e T568B sem saber o motivo.",
      "whyItHappens": "A pessoa decora cores sem entender padrão de ponta a ponta.",
      "consequence": "Cabos cruzados acidentais, falhas e manutenção difícil.",
      "correction": "Adotar e documentar um padrão; para cabo direto comum, manter o mesmo padrão nas duas pontas."
    },
    {
      "mistake": "Não identificar patch panel e tomadas.",
      "whyItHappens": "A rede pequena parece simples no começo.",
      "consequence": "Cada mudança vira tentativa e erro.",
      "correction": "Criar padrão de etiquetas e atualizar inventário em toda mudança."
    },
    {
      "mistake": "Deixar portas físicas ativas em áreas públicas.",
      "whyItHappens": "Conveniência operacional.",
      "consequence": "Aumenta risco de acesso indevido.",
      "correction": "Desativar portas ociosas, usar 802.1X, port security e VLANs restritas."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Link apagado",
      "Porta negociando 100 Mbps em vez de 1 Gbps",
      "Perda ou lentidão intermitente",
      "Telefone IP ou AP não liga via PoE",
      "Usuário conectado à VLAN errada",
      "Erros CRC ou input errors na porta"
    ],
    "diagnosticQuestions": [
      "Qual tomada e porta de patch panel estão envolvidas?",
      "A porta do switch está ativa?",
      "Há velocidade e duplex negociados?",
      "Existe PoE suficiente?",
      "Há erros físicos na interface?",
      "O cabo foi testado ou certificado?",
      "A documentação bate com a realidade?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed",
        "purpose": "Verificar se a interface está ativa e qual velocidade foi negociada.",
        "expectedObservation": "Status Up e LinkSpeed compatível com o esperado.",
        "interpretation": "Velocidade menor pode indicar cabo, porta, categoria, negociação ou equipamento."
      },
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Confirmar interface, endereço, DHCP, gateway e DNS após o link físico subir.",
        "expectedObservation": "Interface com endereço válido e gateway quando aplicável.",
        "interpretation": "Se não há link, IP pode nem aparecer corretamente; se há link sem IP, investigar DHCP/VLAN."
      },
      {
        "platform": "Linux",
        "command": "ip link show && ethtool <interface>",
        "purpose": "Ver estado da interface e velocidade/duplex quando ethtool estiver disponível.",
        "expectedObservation": "Link detected: yes e Speed compatível.",
        "interpretation": "Sem link detectado aponta para camada física, porta, cabo ou NIC."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status",
        "purpose": "Listar portas, VLAN, duplex, speed e tipo.",
        "expectedObservation": "Portas conectadas com VLAN e velocidade esperadas.",
        "interpretation": "notconnect, disabled ou speed inesperado orientam o diagnóstico físico/lógico."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces <interface>",
        "purpose": "Ver erros, CRC, input errors, resets e estatísticas físicas.",
        "expectedObservation": "Baixo ou nenhum erro físico em operação normal.",
        "interpretation": "CRC/input errors sugerem cabo, conector, interferência ou porta problemática."
      },
      {
        "platform": "Cisco IOS",
        "command": "show power inline",
        "purpose": "Ver consumo e disponibilidade de PoE.",
        "expectedObservation": "Dispositivos PoE alimentados e orçamento suficiente.",
        "interpretation": "Sem energia ou potência insuficiente pode afetar APs, câmeras e telefones."
      }
    ],
    "decisionTree": [
      {
        "if": "Link apagado",
        "then": "Verificar cabo, porta, patch panel, tomada, interface e se a porta está administrativamente habilitada."
      },
      {
        "if": "Link sobe em velocidade menor",
        "then": "Verificar categoria do cabo, conector, comprimento, patch cord, porta e negociação."
      },
      {
        "if": "Há muitos CRC",
        "then": "Suspeitar de cabo/conector/interferência/porta e testar substituição controlada."
      },
      {
        "if": "PoE não liga dispositivo",
        "then": "Verificar orçamento PoE, padrão suportado, cabo, porta e consumo do equipamento."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter racks trancados e com controle de acesso.",
      "Identificar tomadas, portas de patch panel e portas de switch.",
      "Desativar portas não utilizadas.",
      "Usar autenticação 802.1X quando aplicável.",
      "Separar portas de visitantes, IoT, câmeras e usuários corporativos em políticas adequadas.",
      "Registrar mudanças físicas de patching."
    ],
    "badPractices": [
      "Deixar cabos e switches soltos em áreas públicas.",
      "Manter portas ativas sem inventário.",
      "Misturar cabos sem categoria conhecida em produção.",
      "Não registrar alterações de patch panel.",
      "Compartilhar diagramas físicos sensíveis sem controle."
    ],
    "commonErrors": [
      "Confundir link físico com autorização de acesso.",
      "Achar que rack trancado resolve VLAN mal configurada.",
      "Tratar documentação física como detalhe sem valor de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso físico a porta ativa",
        "description": "Uma tomada ativa em área não controlada pode permitir conexão indevida à rede.",
        "defensiveExplanation": "O risco não exige exploração sofisticada; basta disponibilidade física e ausência de controle lógico.",
        "mitigation": "Desativar portas ociosas, usar 802.1X, VLAN restrita, port security e monitoramento."
      },
      {
        "name": "Rastreabilidade insuficiente",
        "description": "Sem documentação, um evento de rede não pode ser rapidamente ligado a uma tomada, sala ou ativo.",
        "defensiveExplanation": "A investigação perde tempo e pode preservar evidências de forma inadequada.",
        "mitigation": "Etiquetas, inventário, CMDB, controle de mudança e revisão periódica."
      },
      {
        "name": "Sabotagem ou erro humano no rack",
        "description": "Patch cords sem organização aumentam risco de desconexão acidental ou alteração não autorizada.",
        "defensiveExplanation": "Ambientes bagunçados dificultam detectar o que foi alterado.",
        "mitigation": "Controle físico, guias de cabos, lacres quando necessário, registro de acesso e revisão."
      }
    ],
    "monitoring": [
      "Mudança inesperada de status de porta",
      "Porta ociosa que passa a ter link",
      "Mudança de velocidade negociada",
      "Aumento de CRC/input errors",
      "Eventos de autenticação 802.1X",
      "Consumo PoE anormal"
    ],
    "hardening": [
      "Desativar portas não usadas",
      "Aplicar port security ou 802.1X",
      "Padronizar VLANs por função",
      "Proteger racks e salas técnicas",
      "Documentar patching e revisar periodicamente"
    ],
    "detectionIdeas": [
      "Alertas de link up em portas não autorizadas",
      "Relatórios periódicos de portas ativas sem dono",
      "Comparação entre inventário e estado real do switch",
      "Correlação entre porta física, MAC address e autenticação"
    ]
  },
  "lab": {
    "id": "lab-1.6",
    "title": "Inventário seguro de cabeamento estruturado",
    "labType": "security",
    "objective": "Mapear um caminho físico de rede, identificar componentes e coletar evidências sem desconectar serviços críticos.",
    "scenario": "Você precisa explicar como um dispositivo final chega ao switch: cabo, tomada, patch panel, rack, porta, VLAN provável, velocidade e riscos físicos.",
    "topology": "Dispositivo final -> patch cord -> tomada/keystone -> cabo horizontal -> patch panel -> patch cord de rack -> switch -> rede local",
    "architecture": "Ambiente de acesso cabeado com pelo menos um dispositivo conectado por Ethernet. Pode ser casa, laboratório, empresa com autorização ou simulação desenhada.",
    "prerequisites": [
      "Ter estudado as aulas 1.4 e 1.5.",
      "Ter autorização para observar o ambiente físico, se for corporativo.",
      "Não desconectar cabos de produção sem autorização."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "Acesso visual ao cabo/tomada/rack quando permitido",
      "Opcional: testador de cabo",
      "Opcional: acesso somente leitura ao switch",
      "Planilha ou arquivo de texto para inventário"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não desconecte cabos de produção sem autorização.",
      "Não fotografe racks ou etiquetas sensíveis sem permissão.",
      "Remova informações sensíveis antes de compartilhar evidências.",
      "O laboratório é defensivo e de documentação, não de bypass de controles físicos."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Escolher um ponto de rede",
        "instruction": "Escolha um dispositivo cabeado que possa ser observado com segurança.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Dispositivo e ponto escolhidos.",
        "explanation": "Começar por um ponto controlado evita interferir em serviços críticos."
      },
      {
        "number": 2,
        "title": "Registrar o dispositivo final",
        "instruction": "Anote tipo de dispositivo, local físico e se usa cabo ou Wi-Fi.",
        "command": "hostname  # Linux/macOS\n$env:COMPUTERNAME  # PowerShell",
        "expectedOutput": "Nome do host ou identificação local.",
        "explanation": "Inventário físico precisa se conectar ao ativo lógico."
      },
      {
        "number": 3,
        "title": "Verificar estado e velocidade da interface",
        "instruction": "Colete evidência de link e velocidade negociada.",
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed  # Windows\nip link show && ethtool <interface>  # Linux, se disponível",
        "expectedOutput": "Interface ativa e velocidade negociada.",
        "explanation": "Velocidade inesperada pode indicar problema físico ou limitação de porta/equipamento."
      },
      {
        "number": 4,
        "title": "Mapear caminho físico visível",
        "instruction": "Descreva, sem desconectar, o caminho entre dispositivo e tomada, e da tomada ao rack se houver acesso autorizado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Descrição textual do caminho físico.",
        "explanation": "Nem toda evidência é comando; documentação visual/textual é parte do trabalho de redes."
      },
      {
        "number": 5,
        "title": "Identificar tomada e patch panel",
        "instruction": "Registre códigos de tomada, patch panel e porta do switch quando disponíveis.",
        "command": "show interfaces status  # Cisco IOS, se houver acesso autorizado",
        "expectedOutput": "Porta, status, VLAN e velocidade quando possível.",
        "explanation": "A correlação entre tomada e porta é o coração da rastreabilidade."
      },
      {
        "number": 6,
        "title": "Checar indícios de erro físico",
        "instruction": "Se houver acesso ao switch, verifique erros físicos da porta observada.",
        "command": "show interfaces <interface>",
        "expectedOutput": "Contadores de erro baixos ou ausentes.",
        "explanation": "CRC e input errors apontam hipóteses de cabo, conector, interferência ou porta."
      },
      {
        "number": 7,
        "title": "Avaliar segurança do ponto",
        "instruction": "Classifique se a tomada fica em área controlada, pública, de visitante, estoque ou sala técnica.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Classificação de risco físico.",
        "explanation": "O mesmo cabo pode ser aceitável em sala interna e arriscado em recepção pública."
      },
      {
        "number": 8,
        "title": "Produzir inventário resumido",
        "instruction": "Monte uma tabela com ponto, local, dispositivo, porta, velocidade, VLAN conhecida, riscos e evidências.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de inventário do ponto escolhido.",
        "explanation": "O objetivo final é transformar observação em documentação útil para operação e segurança."
      }
    ],
    "expectedResult": "O aluno deve produzir um inventário mínimo de um ponto cabeado, conectando dispositivo, tomada, caminho físico, switch, evidências e riscos.",
    "validation": [
      {
        "check": "A interface mostra link ativo",
        "command": "Get-NetAdapter ou ip link show",
        "expected": "Status Up ou equivalente",
        "ifFails": "Verificar cabo, porta, interface desabilitada ou falta de conexão."
      },
      {
        "check": "A velocidade negociada faz sentido",
        "command": "Get-NetAdapter ou ethtool",
        "expected": "LinkSpeed compatível com equipamento e cabeamento",
        "ifFails": "Suspeitar de cabo ruim, porta limitada, categoria inferior ou negociação."
      },
      {
        "check": "O ponto foi documentado",
        "command": "Revisar tabela do laboratório",
        "expected": "Tabela contém local, ponto, dispositivo, porta e riscos",
        "ifFails": "Completar campos ausentes antes de considerar o lab concluído."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não há link",
        "probableCause": "Cabo desconectado, tomada sem patch, porta desligada ou interface inativa.",
        "howToConfirm": "Ver LEDs, status da interface e patch panel com autorização.",
        "fix": "Reconectar corretamente ou solicitar ativação/correção conforme processo."
      },
      {
        "symptom": "Velocidade menor que esperada",
        "probableCause": "Cabo ruim, par danificado, categoria inadequada, porta antiga ou negociação.",
        "howToConfirm": "Testar outro cabo/porta em janela segura e verificar status no switch.",
        "fix": "Substituir patch cord, testar ponto, corrigir conector ou porta."
      },
      {
        "symptom": "AP ou telefone IP não liga",
        "probableCause": "PoE desabilitado, orçamento insuficiente ou cabo inadequado.",
        "howToConfirm": "Verificar show power inline e especificação do dispositivo.",
        "fix": "Habilitar PoE, trocar porta/switch ou ajustar orçamento."
      }
    ],
    "improvements": [
      "Criar padrão de nomenclatura para pontos.",
      "Registrar portas ociosas e desativá-las.",
      "Adicionar campo de VLAN e responsável no inventário.",
      "Planejar certificação de cabos críticos.",
      "Correlacionar inventário físico com ferramenta de monitoramento."
    ],
    "evidenceToCollect": [
      "Tabela de inventário do ponto",
      "Status de link e velocidade",
      "Identificação de tomada/patch panel se permitido",
      "Riscos físicos observados",
      "Ações recomendadas"
    ],
    "questions": [
      "Qual parte do caminho físico é mais frágil no seu cenário?",
      "O ponto observado fica em área controlada ou pública?",
      "A documentação existente seria suficiente em um incidente?",
      "A velocidade negociada bate com o esperado?"
    ],
    "challenge": "Escolha três pontos de rede hipotéticos: uma estação administrativa, um access point e uma câmera IP. Defina identificação, VLAN sugerida, PoE, risco físico e evidência mínima de validação.",
    "solution": "A estação administrativa deve ter ponto identificado e VLAN corporativa; o AP deve ter PoE dimensionado e VLANs conforme SSIDs; a câmera deve ficar em VLAN restrita e porta protegida. Todos precisam de documentação física, validação de link, velocidade/PoE e risco físico registrado."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que cabeamento estruturado é mais do que simplesmente crimpar cabos?",
      "hints": [
        "Pense em manutenção e auditoria.",
        "Pense em incidentes e mudanças."
      ],
      "expectedIdeas": [
        "padronização",
        "documentação",
        "rastreabilidade",
        "segurança",
        "troubleshooting"
      ],
      "explanation": "O valor está na infraestrutura previsível e testável, não apenas no cabo individual."
    },
    {
      "type": "diagnóstico",
      "question": "Um computador negocia 100 Mbps em uma rede que deveria ser 1 Gbps. O que você verificaria primeiro?",
      "hints": [
        "Pense em cabo, porta e categoria.",
        "Pense em evidências do sistema e do switch."
      ],
      "expectedIdeas": [
        "patch cord",
        "categoria",
        "conector",
        "porta",
        "velocidade negociada",
        "erros físicos"
      ],
      "explanation": "Antes de culpar DNS ou aplicação, valide camada física e negociação."
    },
    {
      "type": "cenário real",
      "question": "Uma tomada ativa fica na recepção. Como você reduziria o risco sem remover a utilidade operacional?",
      "hints": [
        "Pense em desativação quando ociosa.",
        "Pense em autenticação e VLAN restrita."
      ],
      "expectedIdeas": [
        "802.1X",
        "port security",
        "VLAN visitante",
        "porta desativada",
        "monitoramento"
      ],
      "explanation": "Controle físico e controle lógico precisam trabalhar juntos."
    }
  ],
  "quiz": [
    {
      "id": "q1.6.1",
      "type": "conceito",
      "q": "Qual é a melhor definição de cabeamento estruturado?",
      "opts": [
        "Infraestrutura planejada e documentada para conexão física de rede",
        "Qualquer cabo com conector RJ-45",
        "Um protocolo de roteamento",
        "Um software de monitoramento"
      ],
      "a": 0,
      "exp": "Cabeamento estruturado envolve infraestrutura física, componentes, identificação, documentação e validação.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q1.6.2",
      "type": "diagnóstico",
      "q": "Uma porta deveria negociar 1 Gbps, mas aparece em 100 Mbps. Qual hipótese física é plausível?",
      "opts": [
        "Cabo ou conector inadequado/danificado",
        "DNS público fora do ar",
        "Senha do usuário expirada",
        "Navegador desatualizado"
      ],
      "a": 0,
      "exp": "Velocidade de link é evidência de camada física/enlace, não de DNS ou aplicação.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q1.6.3",
      "type": "comparação",
      "q": "Para um cabo direto comum, qual prática reduz confusão operacional?",
      "opts": [
        "Usar o mesmo padrão de terminação nas duas pontas",
        "Misturar T568A e T568B aleatoriamente",
        "Remover etiquetas para segurança",
        "Nunca documentar patch panel"
      ],
      "a": 0,
      "exp": "O mesmo padrão nas duas pontas e documentação reduzem erro humano.",
      "difficulty": "iniciante",
      "topic": "T568A/T568B"
    },
    {
      "id": "q1.6.4",
      "type": "segurança",
      "q": "Qual risco existe em manter tomadas ativas em áreas públicas?",
      "opts": [
        "Conexão indevida à rede",
        "Aumento automático de criptografia",
        "Redução de latência",
        "Melhora de throughput"
      ],
      "a": 0,
      "exp": "Portas físicas ativas podem permitir conexão indevida se não houver controles lógicos.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q1.6.5",
      "type": "operação",
      "q": "Qual componente normalmente concentra a terminação dos cabos horizontais no rack?",
      "opts": [
        "Patch panel",
        "Navegador",
        "Servidor DNS",
        "Token JWT"
      ],
      "a": 0,
      "exp": "O patch panel organiza a chegada dos pontos físicos no rack.",
      "difficulty": "iniciante",
      "topic": "componentes"
    },
    {
      "id": "q1.6.6",
      "type": "cenário",
      "q": "Um AP no teto reinicia várias vezes ao dia. Qual item de cabeamento/infra deve ser verificado?",
      "opts": [
        "Orçamento PoE e qualidade do cabo",
        "Formato do JSON da API",
        "Base64 do token",
        "Cache do navegador"
      ],
      "a": 0,
      "exp": "APs dependem de energia e dados; PoE insuficiente ou cabo ruim pode causar reinicializações.",
      "difficulty": "intermediário",
      "topic": "PoE"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.6.1",
      "front": "O que é cabeamento estruturado?",
      "back": "Infraestrutura física padronizada, identificada, documentada e testável para conexão de rede.",
      "tags": [
        "cabeamento"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.2",
      "front": "O que é patch panel?",
      "back": "Painel no rack onde os cabos horizontais terminam de forma organizada e identificada.",
      "tags": [
        "rack",
        "patch panel"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.3",
      "front": "Qual regra prática para T568A/B em cabo direto?",
      "back": "Use o mesmo padrão nas duas pontas e documente o padrão adotado.",
      "tags": [
        "T568A",
        "T568B"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.4",
      "front": "Por que 'deu link' não basta?",
      "back": "Porque o cabo pode ter link, mas negociar velocidade menor, gerar erros ou falhar sob carga.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.6.5",
      "front": "Qual risco de uma porta ativa em área pública?",
      "back": "Ela pode permitir conexão indevida se não houver controles como 802.1X, port security ou VLAN restrita.",
      "tags": [
        "segurança física"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.6.6",
      "front": "O que PoE adiciona ao cabeamento?",
      "back": "Além de dados, a porta fornece energia para dispositivos como APs, câmeras e telefones IP.",
      "tags": [
        "PoE"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.6.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre patch cord, cabo horizontal e patch panel.",
      "expectedAnswer": "Patch cord é o cabo flexível de conexão; cabo horizontal é o trecho instalado entre tomada e rack; patch panel é o painel onde esses cabos terminam no rack.",
      "explanation": "Separar componentes evita tratar todo problema físico como 'o cabo'."
    },
    {
      "id": "ex1.6.2",
      "type": "diagnóstico",
      "prompt": "Uma porta aparece como connected, mas com muitos CRC errors. Liste três hipóteses.",
      "expectedAnswer": "Cabo danificado, conector ruim, interferência, porta com problema ou patch cord inadequado.",
      "explanation": "CRC errors são indícios físicos/enlace e merecem investigação de cabo, porta e ambiente."
    },
    {
      "id": "ex1.6.3",
      "type": "segurança",
      "prompt": "Proponha três controles para tomadas em sala de reunião usada por visitantes.",
      "expectedAnswer": "Portas desativadas quando ociosas, VLAN visitante/restrita, 802.1X ou port security, monitoramento de link up.",
      "explanation": "Áreas compartilhadas exigem menor confiança física."
    },
    {
      "id": "ex1.6.4",
      "type": "arquitetura",
      "prompt": "Desenhe textualmente o caminho entre um notebook e o switch em cabeamento estruturado.",
      "expectedAnswer": "Notebook -> patch cord -> tomada/keystone -> cabo horizontal -> patch panel -> patch cord de rack -> switch.",
      "explanation": "Esse caminho será usado em troubleshooting e documentação."
    }
  ],
  "challenge": {
    "title": "Organizar o cabeamento de uma pequena empresa",
    "scenario": "Uma empresa com 20 usuários, 3 APs, 6 câmeras IP e 2 impressoras usa cabos improvisados. O dono quer reduzir quedas e melhorar segurança sem gastar com datacenter completo.",
    "tasks": [
      "Propor organização de rack e patch panel.",
      "Criar padrão de identificação de tomadas.",
      "Definir quais portas devem usar PoE.",
      "Indicar controles para portas ociosas e áreas públicas.",
      "Criar plano mínimo de validação e documentação."
    ],
    "constraints": [
      "Usar infraestrutura simples e de baixo custo.",
      "Evitar desconexões durante horário comercial.",
      "Separar visitantes/câmeras da rede administrativa quando o conteúdo futuro de VLAN for estudado.",
      "Não expor documentação sensível fora da equipe autorizada."
    ],
    "expectedDeliverables": [
      "Tabela de pontos",
      "Mapa físico simplificado",
      "Lista de portas PoE",
      "Checklist de segurança física",
      "Plano de teste e rollback"
    ],
    "gradingRubric": [
      {
        "criterion": "Rastreabilidade",
        "points": 25,
        "description": "Pontos, patch panel e portas de switch conseguem ser correlacionados."
      },
      {
        "criterion": "Operação",
        "points": 25,
        "description": "O plano reduz erro humano e facilita manutenção."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Portas ociosas, áreas públicas e racks foram tratados."
      },
      {
        "criterion": "Validação",
        "points": 25,
        "description": "Há testes de link, velocidade, PoE e documentação."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O problema não é apenas trocar cabos. Primeiro identificamos os tipos de ponto, depois organizamos terminação no rack, criamos padrão de identificação, definimos PoE e tratamos riscos físicos.",
    "steps": [
      "Listar todos os pontos necessários.",
      "Separar usuários, APs, câmeras e impressoras.",
      "Criar padrão de etiquetas por sala e número.",
      "Terminar cabos horizontais em patch panel.",
      "Ligar patch panel ao switch com patch cords curtos e organizados.",
      "Dimensionar PoE para APs e câmeras.",
      "Desativar portas ociosas e proteger áreas públicas.",
      "Validar link, velocidade e documentação."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Comprar um switch maior e deixar os cabos soltos.",
        "whyItIsWrong": "Aumenta portas, mas não resolve rastreabilidade, segurança física nem manutenção."
      },
      {
        "answer": "Ativar todas as tomadas para facilitar.",
        "whyItIsWrong": "Conveniência aumenta superfície de acesso físico indevido."
      },
      {
        "answer": "Não documentar para evitar vazamento.",
        "whyItIsWrong": "Documentação deve ser protegida, não eliminada; sem ela a operação e resposta a incidentes pioram."
      }
    ],
    "finalAnswer": "Uma solução adequada cria rack organizado com patch panel, padrão de identificação por sala/ponto, portas PoE dimensionadas para APs e câmeras, portas ociosas desativadas, controle físico do rack e inventário que correlaciona tomada, patch panel, switch, VLAN futura e responsável. A validação inclui link, velocidade, PoE, ausência de erros físicos e revisão de documentação."
  },
  "glossary": [
    {
      "term": "Cabeamento estruturado",
      "shortDefinition": "Infraestrutura física padronizada para rede.",
      "longDefinition": "Conjunto de práticas, componentes e documentação usados para organizar cabos, tomadas, patch panels, racks e caminhos de telecomunicações.",
      "example": "Tomada 2A-034 terminada no patch panel PP1 porta 34 e conectada ao switch SW-AC-01 porta 18.",
      "relatedTerms": [
        "patch panel",
        "rack",
        "RJ-45"
      ],
      "relatedLessons": [
        "1.4",
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "RJ-45",
      "shortDefinition": "Nome comum do conector usado em Ethernet de par trançado.",
      "longDefinition": "Conector modular de oito posições associado no uso prático ao cabeamento Ethernet de cobre.",
      "example": "Patch cord Ethernet com conectores RJ-45 nas duas pontas.",
      "relatedTerms": [
        "T568A",
        "T568B",
        "Ethernet"
      ],
      "relatedLessons": [
        "1.5",
        "3.1"
      ]
    },
    {
      "term": "Patch panel",
      "shortDefinition": "Painel de terminação de cabos no rack.",
      "longDefinition": "Componente passivo onde cabos horizontais terminam e podem ser conectados ao switch por patch cords.",
      "example": "A tomada da sala financeira termina no patch panel e é ligada ao switch por patch cord.",
      "relatedTerms": [
        "rack",
        "patch cord",
        "cabo horizontal"
      ],
      "relatedLessons": [
        "1.6",
        "1.7"
      ]
    },
    {
      "term": "T568A/T568B",
      "shortDefinition": "Padrões de ordem dos fios no conector.",
      "longDefinition": "Esquemas de terminação para pares de fios em conectores de rede. O ponto central é adotar padrão consistente e documentado.",
      "example": "Um cabo direto comum usa o mesmo padrão nas duas pontas.",
      "relatedTerms": [
        "pinagem",
        "RJ-45"
      ],
      "relatedLessons": [
        "1.6"
      ]
    },
    {
      "term": "PoE",
      "shortDefinition": "Energia elétrica entregue pelo cabo de rede.",
      "longDefinition": "Power over Ethernet permite alimentar dispositivos como APs, telefones IP e câmeras pelo mesmo cabo usado para dados.",
      "example": "Um access point no teto recebe dados e energia pela porta PoE do switch.",
      "relatedTerms": [
        "switch",
        "AP",
        "câmera IP"
      ],
      "relatedLessons": [
        "1.5",
        "1.7"
      ]
    },
    {
      "term": "Cabo horizontal",
      "shortDefinition": "Trecho fixo entre tomada e sala de telecomunicações.",
      "longDefinition": "Cabo instalado na infraestrutura do prédio, normalmente entre ponto de telecomunicações da área de trabalho e patch panel no rack.",
      "example": "O cabo dentro da parede que liga a tomada de rede ao patch panel.",
      "relatedTerms": [
        "tomada",
        "keystone",
        "patch panel"
      ],
      "relatedLessons": [
        "1.6"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "Structured Cabling Standards",
      "organization": "TIA/EIA",
      "url": "",
      "note": "Referência conceitual para organização e padronização de cabeamento estruturado."
    },
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Base conceitual para Ethernet em meios físicos de rede."
    },
    {
      "type": "internal-course",
      "title": "Meios de transmissão: cobre, fibra e rádio",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula 1.5 deste curso."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "infraestrutura física e ambientes",
      "reason": "Racks, energia, cabeamento e mudança física impactam plataformas e pipelines."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "controle de acesso físico e lógico",
      "reason": "Portas físicas e autenticação de rede se conectam a identidade, autorização e Zero Trust."
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
      "1.7"
    ]
  }
};
