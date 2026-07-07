export const lesson1307 = {
  "id": "13.7",
  "moduleId": "m13",
  "order": 7,
  "title": "Ataques Comuns em Rede: Reconhecimento, MITM, Lateral Movement e Exfiltração",
  "subtitle": "Como reconhecer padrões de abuso em rede, coletar evidências e reduzir impacto com controles defensivos, sem executar técnicas ofensivas.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 350,
  "tags": [
    "redes",
    "segurança",
    "blue team",
    "soc",
    "reconhecimento",
    "mitm",
    "movimento lateral",
    "exfiltração",
    "detecção",
    "siem",
    "ndr",
    "zero trust"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "MITM e riscos de camada 2 dependem de Ethernet, MAC, switches e ARP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m08",
      "lesson": "8.x",
      "reason": "TLS, HTTP e proxies ajudam a entender interceptação, validação e exfiltração por web."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação é controle central contra movimento lateral."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "Correlação de logs é necessária para transformar sinais em investigação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.6",
      "reason": "Threat modeling ajuda a entender caminhos plausíveis antes de analisar padrões de abuso."
    }
  ],
  "objectives": [
    "Explicar, em perspectiva defensiva, os padrões de reconhecimento, MITM, movimento lateral e exfiltração.",
    "Identificar evidências de rede, endpoint, identidade, DNS, proxy, firewall e SIEM relacionadas a esses padrões.",
    "Diferenciar evento isolado, hipótese, alerta e incidente confirmado.",
    "Relacionar cada padrão a controles preventivos, detectivos e de resposta.",
    "Construir uma linha do tempo defensiva a partir de sinais simulados.",
    "Definir melhorias arquiteturais para reduzir movimento lateral e egress não autorizado."
  ],
  "learningOutcomes": [
    "Dado um conjunto de eventos, o aluno classifica sinais de reconhecimento, movimento lateral ou exfiltração suspeita.",
    "Dado um alerta de possível MITM, o aluno identifica evidências defensivas sem executar ataque.",
    "Dado um ambiente segmentado, o aluno aponta controles que reduzem movimento lateral.",
    "Dado tráfego de saída incomum, o aluno propõe investigação e contenção proporcional.",
    "Dado um cenário de SOC, o aluno monta linha do tempo e plano de resposta."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine que o SOC recebe três sinais aparentemente separados: muitas consultas DNS internas vindas de uma estação administrativa, várias tentativas de autenticação SMB para servidores diferentes e, horas depois, um volume incomum de saída HTTPS para um domínio nunca visto. Nenhum evento isolado parece provar um incidente. Mas, quando eles são colocados em sequência, aparece uma história: descoberta do ambiente, tentativa de movimento lateral e possível exfiltração.</p>\n  <p>Esta aula existe para ensinar padrões comuns de comportamento hostil em rede sem transformar o aluno em operador ofensivo. O objetivo é defensivo: reconhecer sinais, entender por que esses padrões acontecem, mapear evidências, reduzir superfície, criar detecções e responder com segurança.</p>\n  <div class=\"callout callout--security\"><strong>Limite ético:</strong> esta aula não ensina a executar ataques, burlar controles, coletar credenciais, criar interceptação, explorar hosts ou exfiltrar dados. Todos os exemplos são descritos em nível conceitual e defensivo para investigação, arquitetura segura e Blue Team.</div>\n  <p>Reconhecimento, MITM, movimento lateral e exfiltração são termos que aparecem muito em relatórios de incidente. A dificuldade para quem trabalha com infraestrutura, redes ou segurança é separar ruído de evidência. Nem todo scan é ataque, nem todo aumento de tráfego é exfiltração, nem toda falha de autenticação é comprometimento. A competência profissional está em construir hipótese, buscar evidência e agir proporcionalmente.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Nos primeiros ambientes corporativos, muitos incidentes eram analisados como eventos pontuais: um malware em uma máquina, uma regra de firewall errada, um servidor exposto ou uma credencial vazada. Com o amadurecimento de resposta a incidentes, percebeu-se que ataques reais frequentemente seguem cadeias: primeiro o adversário entende o ambiente, depois tenta ampliar acesso, movimenta-se entre sistemas e finalmente busca impacto, persistência, coleta ou saída de dados.</p>\n  <p>Frameworks como MITRE ATT&amp;CK ajudaram a criar linguagem comum para descrever táticas e técnicas observadas no mundo real. Em vez de dizer apenas “houve um ataque”, times passaram a falar em discovery, credential access, lateral movement, collection e exfiltration. Essa linguagem permite que rede, endpoint, IAM, cloud, SOC e gestão conversem sobre comportamento, evidência e controle.</p>\n  <p>Historicamente, a defesa de rede evoluiu de bloqueio de perímetro para detecção de comportamento. Firewalls continuam importantes, mas não bastam. Um movimento lateral pode usar protocolos legítimos. Uma exfiltração pode sair por HTTPS. Um reconhecimento interno pode parecer administração normal. Por isso, a segurança moderna precisa combinar segmentação, hardening, IAM, logs, sensores, SIEM, baselines e resposta coordenada.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que comportamentos hostis em rede frequentemente se parecem com comportamentos legítimos. Administradores fazem inventário, ferramentas de monitoramento consultam serviços, backup transfere dados, aplicações acessam bancos, usuários entram por VPN e pipelines fazem deploy. O atacante tenta se esconder dentro desses padrões.</p>\n  <ul>\n    <li><strong>Reconhecimento:</strong> pode parecer inventário ou troubleshooting, mas revela portas, serviços, nomes e caminhos.</li>\n    <li><strong>MITM:</strong> pode surgir por falha de camada 2, proxy mal controlado, certificado não validado ou Wi-Fi inseguro.</li>\n    <li><strong>Movimento lateral:</strong> pode usar credenciais legítimas e protocolos administrativos comuns.</li>\n    <li><strong>Exfiltração:</strong> pode parecer upload, sincronização, backup, API externa ou tráfego HTTPS comum.</li>\n  </ul>\n  <p>Sem baseline, logs e segmentação, a equipe só percebe o problema tarde demais. Sem entendimento dos padrões, o time cria alerta ruidoso, falso positivo e bloqueio indevido. O objetivo desta aula é ensinar a pensar nesses padrões como hipóteses defensivas: o que observar, que evidência buscar, que controle reduz impacto e que resposta é proporcional.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A defesa contra ataques comuns de rede evoluiu de listas de assinaturas para correlação de comportamento. Assinaturas ainda ajudam, mas ataques modernos podem usar ferramentas nativas, credenciais válidas, serviços internos e tráfego criptografado. Por isso, a pergunta deixou de ser apenas “qual pacote é malicioso?” e passou a ser “esse comportamento faz sentido para este ativo, neste horário, neste caminho e com esta identidade?”.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Fase defensiva</th><th>Como funcionava</th><th>Limitação</th><th>Evolução</th></tr></thead>\n    <tbody>\n      <tr><td>Bloqueio de perímetro</td><td>Filtrar entrada e saída na borda.</td><td>Não via tráfego interno.</td><td>Segmentação e inspeção leste-oeste.</td></tr>\n      <tr><td>Assinaturas IDS</td><td>Detectar padrões conhecidos em pacotes.</td><td>Pouca cobertura para uso de credenciais legítimas e tráfego criptografado.</td><td>NDR, flow, comportamento e correlação.</td></tr>\n      <tr><td>Logs isolados</td><td>Cada ferramenta gerava eventos separados.</td><td>Dificuldade de enxergar cadeia de ataque.</td><td>SIEM com normalização, enriquecimento e linha do tempo.</td></tr>\n      <tr><td>Resposta manual tardia</td><td>Investigar depois do impacto.</td><td>Contenção lenta e perda de evidência.</td><td>Playbooks, automação controlada e exercícios de tabletop.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Os ataques comuns em rede podem ser entendidos como padrões de ação que buscam descobrir, interceptar, atravessar ou retirar valor de um ambiente. Nesta aula, estudaremos quatro famílias em perspectiva defensiva.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em segurança de redes, reconhecimento é a coleta de informações sobre ambiente; MITM é a tentativa de interposição no caminho de comunicação; movimento lateral é o deslocamento entre sistemas internos; e exfiltração é a tentativa de remover dados do ambiente sem autorização.</div>\n  <p>Esses padrões não são etapas obrigatórias nem lineares. Um incidente pode começar por credencial vazada, abuso de VPN, aplicação exposta, phishing, serviço vulnerável ou endpoint comprometido. Ainda assim, os padrões ajudam a orientar perguntas: o adversário está tentando entender o ambiente? Está tentando interceptar tráfego? Está tentando alcançar outro ativo? Está tentando remover dados?</p>\n  <p>O conceito central para Blue Team é: não procure apenas “ataques”; procure comportamentos incompatíveis com o papel do ativo, da identidade, da zona, do horário e do fluxo esperado.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno desses padrões pode ser analisado como fluxo de evidências. Não precisamos executar nada ofensivo para entender o mecanismo defensivo.</p>\n  <ol>\n    <li><strong>Reconhecimento:</strong> o adversário ou ferramenta coleta nomes, endereços, portas, serviços, rotas, domínios, banners, shares, relações de confiança e topologia. Evidências aparecem em DNS, firewall, NetFlow, EDR, proxy, logs de autenticação e sensores.</li>\n    <li><strong>MITM:</strong> o risco surge quando um ator consegue ficar no caminho lógico ou físico entre cliente e destino. Pode envolver camada 2, Wi-Fi, proxy, DNS, gateway, certificado inválido ou rota indevida. Evidências aparecem em mudanças de gateway, certificados inesperados, alertas de ARP, logs de proxy, erros TLS e queixas de usuário.</li>\n    <li><strong>Movimento lateral:</strong> ocorre quando acesso inicial é usado para tentar alcançar outros sistemas. Pode envolver credenciais válidas, protocolos administrativos, shares, acesso remoto, execução remota, jump hosts ou contas de serviço. Evidências aparecem em autenticações incomuns, conexões leste-oeste, falhas repetidas, uso anormal de portas administrativas e logs de endpoint.</li>\n    <li><strong>Exfiltração:</strong> acontece quando dados coletados são enviados para fora ou para local não autorizado. Pode usar HTTPS, DNS, storage cloud, API, e-mail, túnel, proxy ou canal permitido. Evidências aparecem em volume, destino, horário, compressão, raridade de domínio, categoria de proxy, logs de DLP e flow.</li>\n  </ol>\n  <p>Uma boa investigação não assume culpa por um único evento. Ela cria linha do tempo e cruza fonte, destino, usuário, zona, processo, volume, domínio, porta, regra, autenticação e mudança recente.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Na arquitetura defensiva, esses padrões atravessam vários componentes. Por isso, não existe uma única ferramenta responsável. Firewall vê política e fluxo; NDR vê comportamento de rede; SIEM correlaciona; EDR mostra processo no endpoint; IAM mostra identidade; DNS e proxy mostram intenção de destino; DLP pode indicar saída sensível; cloud logs mostram plano de controle e storage.</p>\n  <ul>\n    <li><strong>Camadas envolvidas:</strong> camada 2 para MITM local, camada 3/4 para caminhos e portas, camada 7 para DNS, HTTP, TLS, APIs e identidade.</li>\n    <li><strong>Componentes envolvidos:</strong> switches, roteadores, APs, firewalls, VPN, proxies, DNS, DHCP, IAM, RADIUS, SIEM, EDR, NDR e cloud logs.</li>\n    <li><strong>Pontos de falha:</strong> rede plana, credenciais compartilhadas, gestão exposta, logs ausentes, DNS sem visibilidade, proxy bypass e falta de baseline.</li>\n    <li><strong>Controles esperados:</strong> segmentação, menor privilégio, MFA, validação TLS, PMF em Wi-Fi, hardening L2, firewall interno, logs normalizados, alertas por comportamento e playbooks.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em um prédio corporativo. Reconhecimento é alguém andando pelos corredores anotando salas, crachás e portas. MITM é alguém se posicionando como falso recepcionista ou falso elevadorista para observar conversas. Movimento lateral é usar acesso a uma sala comum para tentar entrar em salas restritas. Exfiltração é retirar documentos por uma saída aparentemente normal.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não têm corredores físicos visíveis. Um caminho pode existir por rota, regra de firewall, túnel VPN, credencial IAM, proxy, DNS, endpoint privado ou automação. O “prédio” muda quando cloud, SaaS, pipelines e acesso remoto entram na arquitetura.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma rede doméstica ou laboratório, um comportamento suspeito poderia ser um dispositivo desconhecido tentando descobrir muitos endereços internos, resolver nomes locais e abrir conexões para vários serviços. Em vez de tentar reproduzir um ataque, o aluno pode observar de forma defensiva: quais dispositivos existem, quais IPs usam, qual gateway, quais domínios são acessados e se há tráfego inesperado.</p>\n  <p>Mesmo em ambiente simples, a lição é profissional: sem inventário, você não sabe o que é desconhecido; sem baseline, você não sabe o que é anormal; sem logs, você não consegue reconstruir o que aconteceu.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um endpoint de usuário começa a autenticar em múltiplos servidores de arquivos, depois tenta acessar servidores de aplicação e finalmente inicia grande volume de upload para um serviço externo. O firewall talvez veja apenas conexões permitidas; o AD vê autenticações; o EDR vê processo; o proxy vê destino; o SIEM pode juntar tudo.</p>\n  <p>A resposta profissional não é “bloquear a internet inteira”. O time deve conter o endpoint, preservar evidências, verificar credenciais usadas, analisar escopo, checar movimentação lateral, revisar dados acessados, validar regras de saída e abrir investigação com linha do tempo.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, reconhecimento pode aparecer como enumeração de APIs, listagem de recursos, consultas a metadata, chamadas incomuns de IAM, varredura entre subnets ou leitura de buckets. Movimento lateral pode ocorrer por roles excessivas, peering amplo, security groups permissivos, chaves expostas, workloads com identidade forte demais ou pipelines com acesso amplo. Exfiltração pode usar storage público, egress HTTPS, snapshots, export de banco, função serverless ou API externa.</p>\n  <p>Os controles equivalentes incluem security groups/NSG, NACL, route tables, private endpoints, egress control, cloud audit logs, flow logs, service control policies, IAM least privilege, secrets management, detections de comportamento e tagging de ativos críticos.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, ataques comuns de rede se conectam a pipelines e automação. Um pipeline com segredo exposto pode permitir acesso a APIs internas. Uma role cloud excessiva pode permitir leitura de recursos não relacionados ao deploy. Um runner compartilhado pode alcançar redes internas. Uma exceção de firewall criada para teste pode permanecer em produção.</p>\n  <p>Por isso, controles defensivos devem entrar no ciclo de entrega: revisão de regras como código, escaneamento de secrets, políticas de egress para runners, segregação de ambientes, logs de pipeline, aprovação para mudanças críticas, testes de conectividade esperada e detecção de fluxos não previstos.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>O foco de segurança desta aula é transformar padrões de ataque em detecções, controles e playbooks. A tabela resume riscos, sinais e mitigação.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Padrão</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Reconhecimento</td><td>Consultas, conexões ou falhas distribuídas para muitos destinos.</td><td>Mapeamento de superfície interna e preparação para abuso.</td><td>Inventário, segmentação, rate limit, logs de DNS/flow, detecção por baseline.</td></tr>\n      <tr><td>MITM</td><td>Certificado inesperado, gateway suspeito, ARP anormal, proxy desconhecido ou erro TLS.</td><td>Intercepção, alteração ou negação de comunicação.</td><td>802.1X, validação TLS, PMF, DHCP snooping, DAI, proxy controlado, HSTS e monitoramento.</td></tr>\n      <tr><td>Movimento lateral</td><td>Autenticações incomuns, uso de portas administrativas e conexões leste-oeste.</td><td>Expansão de comprometimento até ativos críticos.</td><td>Segmentação, MFA, PAM, contas nominativas, firewall interno, EDR, logs e menor privilégio.</td></tr>\n      <tr><td>Exfiltração</td><td>Volume anormal, destino raro, upload fora do padrão, compressão ou egress incomum.</td><td>Perda de dados, impacto legal, financeiro e reputacional.</td><td>DLP, egress control, proxy, CASB, classificação de dados, flow logs e resposta rápida.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra uma cadeia defensiva de evidências. O objetivo não é ensinar execução ofensiva, mas mostrar onde cada padrão deixaria sinais para investigação.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1180 560\" role=\"img\" aria-labelledby=\"attack-patterns-title attack-patterns-desc\">\n    <title id=\"attack-patterns-title\">Padrões defensivos de reconhecimento, MITM, movimento lateral e exfiltração</title>\n    <desc id=\"attack-patterns-desc\">Fluxo conceitual mostrando endpoint inicial, rede interna, servidores, dados críticos, internet, sensores, SIEM e pontos de evidência defensiva.</desc>\n    <defs>\n      <marker id=\"arrow-1307\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"80\" width=\"230\" height=\"380\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"145\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Zona de usuários</text>\n    <rect x=\"70\" y=\"160\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"145\" y=\"190\" text-anchor=\"middle\" class=\"svg-label\">Endpoint</text>\n    <text x=\"145\" y=\"211\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sinal inicial</text>\n\n    <rect x=\"330\" y=\"80\" width=\"230\" height=\"380\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"445\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Rede interna</text>\n    <rect x=\"370\" y=\"160\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"445\" y=\"190\" text-anchor=\"middle\" class=\"svg-label\">Switch/AP</text>\n    <text x=\"445\" y=\"211\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MITM/L2</text>\n    <rect x=\"370\" y=\"300\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"445\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"445\" y=\"351\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política</text>\n\n    <rect x=\"630\" y=\"80\" width=\"230\" height=\"380\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"745\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Zona de servidores</text>\n    <rect x=\"670\" y=\"160\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"745\" y=\"190\" text-anchor=\"middle\" class=\"svg-label\">Serviços</text>\n    <text x=\"745\" y=\"211\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">lateral</text>\n    <rect x=\"670\" y=\"300\" width=\"150\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"745\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Dados</text>\n    <text x=\"745\" y=\"351\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativo crítico</text>\n\n    <rect x=\"930\" y=\"80\" width=\"210\" height=\"380\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"1035\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Internet / SaaS</text>\n    <rect x=\"965\" y=\"180\" width=\"140\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"1035\" y=\"210\" text-anchor=\"middle\" class=\"svg-label\">Destino raro</text>\n    <text x=\"1035\" y=\"231\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">egress</text>\n\n    <rect x=\"355\" y=\"485\" width=\"180\" height=\"52\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"445\" y=\"516\" text-anchor=\"middle\" class=\"svg-label\">NDR / Flow</text>\n    <rect x=\"655\" y=\"485\" width=\"180\" height=\"52\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"745\" y=\"516\" text-anchor=\"middle\" class=\"svg-label\">SIEM / SOC</text>\n\n    <line x1=\"220\" y1=\"196\" x2=\"370\" y2=\"196\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1307)\" />\n    <text x=\"295\" y=\"178\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">reconhecimento</text>\n    <line x1=\"520\" y1=\"196\" x2=\"670\" y2=\"196\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1307)\" />\n    <text x=\"595\" y=\"178\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">lateral</text>\n    <line x1=\"745\" y1=\"232\" x2=\"745\" y2=\"300\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1307)\" />\n    <line x1=\"820\" y1=\"336\" x2=\"965\" y2=\"216\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-1307)\" />\n    <text x=\"890\" y=\"258\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">exfiltração?</text>\n    <line x1=\"445\" y1=\"372\" x2=\"445\" y2=\"485\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1307)\" />\n    <line x1=\"535\" y1=\"511\" x2=\"655\" y2=\"511\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1307)\" />\n    <line x1=\"745\" y1=\"372\" x2=\"745\" y2=\"485\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1307)\" />\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é defensivo e conceitual-operacional: você analisará um conjunto de eventos simulados e construirá uma linha do tempo, hipóteses, evidências, controles e resposta. Não haverá execução de varredura, MITM, movimento lateral ou exfiltração.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam classificação de eventos, priorização de evidências, construção de hipótese e escolha de controle. A resposta ideal sempre deve explicar o raciocínio.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário de SOC com sinais parciais e deverá propor investigação, contenção e melhorias arquiteturais para reduzir reincidência.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como evitar conclusões apressadas: primeiro organizar linha do tempo, depois correlacionar fontes, estimar escopo, conter de forma proporcional e recomendar controles permanentes.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Reconhecimento, MITM, movimento lateral e exfiltração são padrões defensivos de análise, não receitas de execução.</li>\n    <li>Eventos isolados raramente bastam; a força está na correlação e na linha do tempo.</li>\n    <li>Segmentação, menor privilégio, hardening, logs, baseline e SIEM reduzem impacto e aumentam visibilidade.</li>\n    <li>Tráfego legítimo pode ser abusado; por isso contexto de ativo, identidade, zona e horário importa.</li>\n    <li>Resposta profissional preserva evidência, contém risco e evita bloquear negócio sem critério.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará <strong>Zero Trust Aplicado à Rede: Identidade, Contexto e Menor Privilégio</strong>. Depois de entender padrões comuns de abuso, o próximo passo é projetar uma rede que reduza confiança implícita e force decisões de acesso baseadas em identidade, contexto, dispositivo, risco e política.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
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
      "ARP",
      "DNS",
      "DHCP",
      "TCP",
      "UDP",
      "SMB",
      "RDP",
      "SSH",
      "HTTP",
      "TLS",
      "ICMP",
      "Syslog",
      "NetFlow/IPFIX"
    ],
    "dependsOn": [
      "Threat modeling",
      "Segmentação",
      "Firewall",
      "Logs",
      "SIEM",
      "NDR",
      "EDR",
      "IAM"
    ],
    "enables": [
      "Blue Team",
      "Threat hunting",
      "Zero Trust",
      "Resposta a incidente",
      "Arquitetura defensiva"
    ]
  },
  "protocolFields": [
    {
      "field": "Source/Destination IP",
      "size": "variável por IPv4/IPv6",
      "purpose": "Identificar origem e destino do fluxo.",
      "securityObservation": "Mudanças incomuns de pares de comunicação ajudam a detectar reconhecimento ou movimento lateral."
    },
    {
      "field": "Source/Destination Port",
      "size": "16 bits cada",
      "purpose": "Identificar serviços e portas usadas.",
      "securityObservation": "Portas administrativas usadas fora do padrão podem indicar abuso ou administração legítima que precisa ser verificada."
    },
    {
      "field": "DNS query",
      "size": "variável",
      "purpose": "Resolver nomes para endereços.",
      "securityObservation": "Domínios raros, excesso de subdomínios ou consultas incomuns podem apoiar hipótese de C2 ou exfiltração."
    },
    {
      "field": "Flow bytes/packets",
      "size": "metadado de flow",
      "purpose": "Medir volume e duração de sessão.",
      "securityObservation": "Volume anormal para destino raro pode apoiar hipótese de exfiltração, mas exige contexto."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Endpoint",
      "action": "Gera conexões ou consultas incomuns.",
      "detail": "Pode ser inventário legítimo, malware, ferramenta administrativa ou comportamento de usuário.",
      "possibleFailure": "Sem baseline, o SOC não sabe se é normal."
    },
    {
      "step": 2,
      "actor": "Firewall/NDR/Flow",
      "action": "Registra metadados de origem, destino, porta, volume e duração.",
      "detail": "Metadados ajudam a ver padrão sem depender de payload.",
      "possibleFailure": "Pontos cegos em tráfego leste-oeste escondem movimento lateral."
    },
    {
      "step": 3,
      "actor": "SIEM",
      "action": "Correlaciona DNS, autenticação, EDR, firewall e proxy.",
      "detail": "Linha do tempo transforma eventos soltos em hipótese.",
      "possibleFailure": "Timezone, NAT e DHCP sem contexto atrapalham atribuição."
    },
    {
      "step": 4,
      "actor": "SOC",
      "action": "Classifica, contém e preserva evidências.",
      "detail": "Resposta deve ser proporcional ao risco e ao impacto de negócio.",
      "possibleFailure": "Bloqueio precipitado pode destruir evidências ou interromper serviço crítico."
    }
  ],
  "deepDive": {
    "mentalModel": "Pense em quatro perguntas: o ativo está sendo descoberto, o caminho está sendo interceptado, outro sistema está sendo alcançado ou dados estão saindo? Cada hipótese precisa de evidência e controle correspondente.",
    "keyTerms": [
      "reconhecimento",
      "MITM",
      "movimento lateral",
      "exfiltração",
      "baseline",
      "falso positivo",
      "linha do tempo",
      "contenção",
      "egress control",
      "detecção comportamental"
    ],
    "limitations": [
      "Eventos de rede não explicam tudo sem endpoint e identidade.",
      "Tráfego criptografado reduz visibilidade de payload, mas metadados continuam úteis.",
      "Ferramentas de administração legítimas podem parecer movimento lateral.",
      "Detecção de exfiltração depende de classificação de dados, baseline e destino."
    ],
    "whenToUse": [
      "Em investigações SOC.",
      "Em threat hunting.",
      "Na revisão de arquitetura defensiva.",
      "Em tabletop de resposta a incidente.",
      "Na construção de regras de SIEM e NDR."
    ],
    "whenNotToUse": [
      "Como justificativa para executar técnicas ofensivas fora de laboratório autorizado.",
      "Como substituto de análise forense completa.",
      "Como prova conclusiva baseada em um único evento.",
      "Como checklist sem contexto do ambiente."
    ],
    "operationalImpact": [
      "Exige logs consistentes, sincronização de horário e inventário atualizado.",
      "Requer cooperação entre rede, SOC, endpoint, IAM, cloud e donos de aplicação.",
      "Melhora resposta a incidente, mas aumenta demanda de análise e tuning."
    ],
    "financialImpact": [
      "Pode aumentar custos de SIEM, retenção, flow logs, proxy logs e sensores.",
      "Pode reduzir custos de incidente ao detectar e conter cedo.",
      "Pode exigir ferramentas de NDR, DLP, CASB ou microsegmentação, mas alternativas parciais existem com logs e arquitetura."
    ],
    "securityImpact": [
      "Reduz tempo de detecção e movimento lateral.",
      "Melhora visibilidade de egress e caminhos internos.",
      "Evita falsa sensação de segurança baseada apenas em firewall de borda."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Chamar qualquer varredura de ataque confirmado.",
      "whyItHappens": "Reconhecimento é associado a invasão, mas pode vir de inventário ou monitoramento.",
      "consequence": "Falso positivo, perda de confiança no SOC e bloqueios indevidos.",
      "correction": "Correlacione origem, autorização, horário, ferramenta, escopo e mudança recente."
    },
    {
      "mistake": "Ignorar movimento lateral porque as credenciais eram válidas.",
      "whyItHappens": "Muitos times confundem autenticação bem-sucedida com comportamento legítimo.",
      "consequence": "Comprometimento se espalha sem alerta.",
      "correction": "Analise contexto: origem, destino, volume, horário, perfil do usuário e tipo de recurso."
    },
    {
      "mistake": "Achar que TLS impede toda detecção de exfiltração.",
      "whyItHappens": "Payload criptografado parece invisível.",
      "consequence": "O time deixa de usar metadados úteis de flow, DNS, proxy e volume.",
      "correction": "Use destino, reputação, raridade, volume, timing, SNI quando disponível, categoria e baseline."
    },
    {
      "mistake": "Responder apagando máquina sem preservar evidência.",
      "whyItHappens": "Pressa para conter.",
      "consequence": "Perda de artefatos e linha do tempo incompleta.",
      "correction": "Siga playbook: isolar, preservar, coletar, documentar, conter e recuperar."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Muitas conexões para múltiplos hosts internos",
      "Aumento de falhas de autenticação",
      "Conexões para portas administrativas fora do padrão",
      "Destino externo raro com alto volume",
      "Erros TLS após mudança de rede",
      "Consultas DNS incomuns ou volumosas",
      "Alerta de gateway ou certificado inesperado"
    ],
    "diagnosticQuestions": [
      "O ativo de origem deveria falar com esses destinos?",
      "Há mudança recente, manutenção ou ferramenta de inventário?",
      "A identidade usada é esperada para esse fluxo?",
      "O tráfego cruza zona de segurança?",
      "Há volume ou destino incomum?",
      "Quais logs confirmam ou refutam a hipótese?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetTCPConnection | Select-Object LocalAddress,LocalPort,RemoteAddress,RemotePort,State,OwningProcess",
        "purpose": "Listar conexões de rede locais para apoiar triagem defensiva.",
        "expectedObservation": "Conexões compatíveis com aplicações conhecidas ou conexões que exigem investigação.",
        "interpretation": "Conexão isolada não prova ataque; combine com processo, usuário, destino e horário."
      },
      {
        "platform": "Windows",
        "command": "Get-WinEvent -LogName Security -MaxEvents 50",
        "purpose": "Ver eventos recentes de segurança quando autorizado.",
        "expectedObservation": "Eventos de autenticação e segurança relevantes para linha do tempo.",
        "interpretation": "Precisa de privilégio e contexto; logs locais complementam SIEM."
      },
      {
        "platform": "Linux",
        "command": "ss -tunap",
        "purpose": "Listar conexões TCP/UDP e processos associados.",
        "expectedObservation": "Serviços e conexões ativas.",
        "interpretation": "Ajuda a validar se há conexão inesperada, mas requer correlação."
      },
      {
        "platform": "Linux",
        "command": "journalctl --since '1 hour ago'",
        "purpose": "Consultar logs recentes do sistema em hosts Linux.",
        "expectedObservation": "Eventos de autenticação, serviço e rede.",
        "interpretation": "Útil para linha do tempo local em investigação autorizada."
      },
      {
        "platform": "Cisco IOS",
        "command": "show logging",
        "purpose": "Ver eventos recentes de dispositivo de rede.",
        "expectedObservation": "Mudanças, flaps, autenticações, ACL hits ou eventos de segurança.",
        "interpretation": "Logs de rede ajudam a confirmar mudanças e anomalias."
      },
      {
        "platform": "SIEM/NDR",
        "command": "Pesquisar por origem, destino, usuário, porta e janela temporal",
        "purpose": "Correlacionar logs de múltiplas fontes.",
        "expectedObservation": "Linha do tempo com DNS, firewall, autenticação, endpoint e proxy.",
        "interpretation": "Correlação é mais forte que evento isolado."
      }
    ],
    "decisionTree": [
      {
        "if": "Há tráfego para muitos hosts internos em pouco tempo",
        "then": "Verificar se origem é ferramenta autorizada de inventário; se não, tratar como reconhecimento suspeito."
      },
      {
        "if": "Há autenticações válidas para muitos servidores fora do padrão",
        "then": "Verificar identidade, MFA, origem, horário e possível movimento lateral."
      },
      {
        "if": "Há volume alto para destino externo raro",
        "then": "Verificar classificação de dados, proxy, DLP, processo de origem e necessidade de contenção."
      },
      {
        "if": "Usuários relatam certificado inesperado ou portal estranho",
        "then": "Investigar MITM, proxy, DNS, Wi-Fi, CA corporativa e cadeia TLS."
      }
    ]
  },
  "trafficCapture": {
    "tool": "Wireshark, tcpdump, NetFlow/IPFIX, NDR ou logs de firewall em ambiente autorizado",
    "filter": "Defensivo e contextual: host suspeito, janela temporal, protocolo esperado e destino específico",
    "whatToObserve": [
      "Sequência temporal de conexões",
      "Volume por destino",
      "Portas e protocolos",
      "Consultas DNS",
      "Falhas de conexão",
      "Mudança de gateway ou certificado quando aplicável"
    ],
    "interpretation": "A captura deve ser usada para validar hipótese defensiva, respeitando autorização, privacidade e retenção de evidências. Não execute tráfego ofensivo."
  },
  "security": {
    "goodPractices": [
      "Manter inventário e baseline de comunicação por zona.",
      "Registrar DNS, DHCP, firewall, VPN, RADIUS, proxy, EDR, NDR e autenticação.",
      "Aplicar segmentação e menor privilégio para reduzir movimento lateral.",
      "Controlar e monitorar egress para destinos externos.",
      "Usar TLS validado, 802.1X, PMF, DHCP snooping e controles L2 quando aplicável.",
      "Construir playbooks de investigação por hipótese."
    ],
    "badPractices": [
      "Rede plana com acesso amplo entre estações e servidores.",
      "Permitir egress irrestrito sem proxy, logs ou justificativa.",
      "Ignorar logs de DNS e DHCP.",
      "Usar contas administrativas compartilhadas.",
      "Tratar autenticação válida como comportamento sempre legítimo.",
      "Investigar sem preservar evidências."
    ],
    "commonErrors": [
      "Confundir recon com incidente confirmado.",
      "Ignorar contexto de mudança planejada.",
      "Não correlacionar NAT, DHCP e usuário.",
      "Criar alerta que dispara para qualquer conexão interna.",
      "Bloquear tráfego crítico sem plano de contenção."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana",
        "description": "Permite que comprometimento de um endpoint alcance muitos sistemas internos.",
        "defensiveExplanation": "O risco aparece como excesso de caminhos leste-oeste.",
        "mitigation": "Segmentação, firewall interno, ACLs, microsegmentação, IAM e logs."
      },
      {
        "name": "Egress irrestrito",
        "description": "Permite saída de dados para muitos destinos sem controle suficiente.",
        "defensiveExplanation": "Dificulta detectar e conter exfiltração.",
        "mitigation": "Proxy, DLP, allowlists, CASB, flow logs, DNS logging e revisão de exceções."
      },
      {
        "name": "Credenciais reutilizadas",
        "description": "Facilitam movimento lateral quando uma identidade é comprometida.",
        "defensiveExplanation": "A rede vê tráfego válido, mas o contexto é anormal.",
        "mitigation": "MFA, PAM, contas nominativas, rotação, menor privilégio e detecção de comportamento."
      },
      {
        "name": "Validação TLS fraca",
        "description": "Clientes aceitam certificados ou proxies indevidos.",
        "defensiveExplanation": "Aumenta risco de interposição e interceptação.",
        "mitigation": "PKI correta, validação de certificado, HSTS, pinning quando aplicável e treinamento operacional."
      }
    ],
    "monitoring": [
      "Conexões leste-oeste incomuns",
      "Autenticações anômalas",
      "DNS para domínios raros",
      "Volume de upload por destino",
      "Portas administrativas fora do padrão",
      "Mudanças de gateway, ARP, DHCP ou certificados",
      "Alertas de EDR/NDR correlacionados"
    ],
    "hardening": [
      "Desabilitar protocolos inseguros",
      "Fechar portas administrativas para redes de usuário",
      "Aplicar firewall local e de rede",
      "Usar 802.1X e NAC quando aplicável",
      "Exigir MFA para acessos administrativos",
      "Manter logging e NTP corretos"
    ],
    "detectionIdeas": [
      "Origem de usuário acessando múltiplos servidores em janela curta",
      "Conta comum autenticando em hosts inéditos",
      "Alto volume de egress para domínio raro",
      "DNS com muitos subdomínios gerados",
      "Conexões administrativas a partir de estação não administrativa",
      "Alerta conjunto de EDR + firewall + DNS no mesmo host"
    ]
  },
  "lab": {
    "id": "lab-13.7",
    "title": "Triagem defensiva de reconhecimento, movimento lateral e possível exfiltração",
    "labType": "security",
    "objective": "Construir uma linha do tempo defensiva e propor resposta a partir de eventos simulados, sem executar técnicas ofensivas.",
    "scenario": "O SOC recebeu alertas sobre uma estação de usuário que consultou muitos nomes internos, tentou autenticar em servidores diferentes e depois gerou tráfego externo incomum. Você deve analisar evidências simuladas, classificar hipóteses e propor contenção.",
    "topology": "Usuário -> VLAN de usuários -> firewall interno -> servidores -> proxy/egress -> internet; logs enviados para SIEM.",
    "architecture": "Ambiente corporativo segmentado com DNS, DHCP, AD/IAM, firewall, proxy, EDR, NDR e SIEM.",
    "prerequisites": [
      "Conhecer segmentação e zonas da aula 13.2.",
      "Conhecer SIEM e correlação da aula 13.5.",
      "Conhecer threat modeling da aula 13.6.",
      "Ter editor de texto ou planilha para montar linha do tempo."
    ],
    "tools": [
      "Editor de texto",
      "Planilha opcional",
      "Logs simulados fornecidos na própria aula",
      "Opcional: SIEM de laboratório ou ferramenta local de análise de CSV"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varredura, MITM, movimento lateral ou exfiltração em rede real.",
      "Use apenas eventos simulados ou logs de ambiente autorizado.",
      "Não colete credenciais, payloads sensíveis ou dados pessoais sem autorização.",
      "Preserve privacidade e evidências conforme política da organização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar os eventos brutos",
        "instruction": "Copie os eventos simulados para uma tabela com colunas: horário, origem, usuário, destino, porta, fonte de log, evento e observação.",
        "command": "Evento 1: 08:10 host-23 consulta 80 nomes internos no DNS\nEvento 2: 08:14 host-23 conecta em 18 servidores na porta 445\nEvento 3: 08:17 usuário r.silva falha login em 9 servidores\nEvento 4: 08:25 host-23 inicia upload HTTPS de 1.8 GB para dominio-raro.example\nEvento 5: 08:28 EDR alerta processo incomum fazendo conexões externas",
        "expectedOutput": "Tabela inicial de eventos com todos os campos preenchidos.",
        "explanation": "Antes de concluir qualquer coisa, organize fatos observáveis."
      },
      {
        "number": 2,
        "title": "Classificar hipóteses",
        "instruction": "Marque cada evento como possível reconhecimento, movimento lateral, exfiltração, falso positivo ou evidência complementar.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Eventos classificados por hipótese, com incertezas explícitas.",
        "explanation": "Classificação é hipótese, não sentença. Eventos podem ter mais de uma leitura."
      },
      {
        "number": 3,
        "title": "Correlacionar identidade e ativo",
        "instruction": "Verifique se o usuário e o host deveriam realizar esse tipo de comunicação.",
        "command": "Consultar inventário, CMDB, owner do ativo, grupo do usuário e janela de mudança autorizada.",
        "expectedOutput": "Confirmação se host-23 é estação comum, ferramenta de inventário, servidor ou ativo administrativo.",
        "explanation": "O mesmo padrão pode ser legítimo se vier de scanner autorizado ou suspeito se vier de estação comum."
      },
      {
        "number": 4,
        "title": "Definir contenção proporcional",
        "instruction": "Escolha ações de contenção que reduzam risco preservando evidência.",
        "command": "Exemplo defensivo: isolar host via EDR/NAC, suspender sessão suspeita, bloquear destino raro no proxy, preservar logs e acionar owner.",
        "expectedOutput": "Plano de contenção com impacto e justificativa.",
        "explanation": "A contenção deve evitar dano adicional sem destruir artefatos importantes."
      },
      {
        "number": 5,
        "title": "Propor controles permanentes",
        "instruction": "Liste melhorias para reduzir recorrência: segmentação, egress control, detecção, baseline, hardening, IAM e logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista priorizada de controles preventivos e detectivos.",
        "explanation": "Uma boa investigação termina com aprendizado arquitetural."
      }
    ],
    "expectedResult": "O aluno entrega linha do tempo, hipóteses, evidências faltantes, contenção proporcional, controles permanentes e comunicação executiva curta.",
    "validation": [
      {
        "check": "Linha do tempo ordenada",
        "command": "Revisar tabela por horário",
        "expected": "Eventos em sequência com fontes de log identificadas.",
        "ifFails": "Volte ao passo 1 e normalize horários e timezone."
      },
      {
        "check": "Hipóteses não conclusivas",
        "command": "Verificar linguagem do relatório",
        "expected": "Termos como possível, hipótese, evidência indica e pendente de validação.",
        "ifFails": "Remova conclusões absolutas sem prova."
      },
      {
        "check": "Contenção preserva evidência",
        "command": "Revisar plano de resposta",
        "expected": "Isolamento e preservação antes de limpeza destrutiva.",
        "ifFails": "Inclua coleta/preservação e responsáveis."
      },
      {
        "check": "Melhorias ligadas a causa",
        "command": "Conferir recomendações",
        "expected": "Controles diretamente relacionados aos caminhos observados.",
        "ifFails": "Evite recomendações genéricas sem relação com evidência."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não sei se é ataque ou inventário",
        "probableCause": "Falta de CMDB e calendário de mudanças",
        "howToConfirm": "Consultar owner, ferramenta de inventário, janela de manutenção e identidade usada.",
        "fix": "Registrar exceções autorizadas e criar baseline."
      },
      {
        "symptom": "Eventos não batem no horário",
        "probableCause": "Timezone ou NTP inconsistente",
        "howToConfirm": "Comparar timestamps e origem dos logs.",
        "fix": "Normalizar tempo no SIEM e corrigir NTP."
      },
      {
        "symptom": "Não consigo atribuir IP a usuário",
        "probableCause": "DHCP, VPN ou NAT sem correlação",
        "howToConfirm": "Consultar DHCP, VPN, RADIUS, AD/IAM e EDR.",
        "fix": "Melhorar enriquecimento de logs."
      },
      {
        "symptom": "Bloqueio causaria indisponibilidade",
        "probableCause": "Fluxo suspeito passa por serviço crítico",
        "howToConfirm": "Consultar owner e matriz de criticidade.",
        "fix": "Usar contenção segmentada e monitoramento reforçado."
      }
    ],
    "improvements": [
      "Adicionar detections de conexões leste-oeste por perfil de host.",
      "Criar allowlist de ferramentas autorizadas de inventário.",
      "Melhorar egress control e classificação de destinos.",
      "Integrar DHCP, DNS, IAM e EDR ao SIEM.",
      "Fazer tabletop de resposta com rede, SOC e infraestrutura."
    ],
    "evidenceToCollect": [
      "Linha do tempo",
      "Logs DNS",
      "Logs firewall/flow",
      "Logs de autenticação",
      "Eventos EDR",
      "Logs proxy/DLP",
      "Inventário do host",
      "Usuário e grupo",
      "Mudanças recentes",
      "Plano de contenção"
    ],
    "questions": [
      "Que evidência separa inventário autorizado de reconhecimento suspeito?",
      "Qual controle reduziria movimento lateral no cenário?",
      "Qual log ajudaria a confirmar exfiltração?",
      "Qual ação preserva evidência e reduz risco ao mesmo tempo?"
    ],
    "challenge": "Escreva um relatório executivo de 8 linhas explicando hipótese, impacto potencial, contenção imediata e próximos controles.",
    "solution": "Uma solução madura afirma que há hipótese de reconhecimento seguido de tentativa de movimento lateral e possível egress anômalo, mas exige validação com inventário, EDR, identidade, proxy e classificação de dados. A contenção inicial deve isolar o host de forma controlada, bloquear temporariamente o destino raro, preservar evidências e revisar credenciais. As melhorias incluem segmentação, egress control, baseline, logs correlacionados e alertas comportamentais."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que não devemos chamar todo reconhecimento de ataque confirmado?",
      "hints": [
        "Pense em ferramentas legítimas de inventário.",
        "Pense em mudança autorizada."
      ],
      "expectedIdeas": [
        "hipótese",
        "contexto",
        "baseline",
        "autorização",
        "correlação"
      ],
      "explanation": "Reconhecimento pode ser malicioso ou administrativo. O papel do analista é buscar contexto antes de concluir."
    },
    {
      "type": "diagnóstico",
      "question": "Um host de usuário abriu conexão para 30 servidores na porta 445. O que você verifica primeiro?",
      "hints": [
        "Qual é o papel do host?",
        "Houve manutenção ou ferramenta de inventário?",
        "Qual usuário/processo iniciou conexões?"
      ],
      "expectedIdeas": [
        "inventário",
        "EDR",
        "logs de autenticação",
        "segmentação",
        "linha do tempo"
      ],
      "explanation": "O padrão pode indicar movimento lateral, mas precisa ser validado com identidade, processo, autorização e baseline."
    },
    {
      "type": "cenário real",
      "question": "Como você reduziria risco de exfiltração sem bloquear todo acesso HTTPS da empresa?",
      "hints": [
        "Pense em proxy, DLP, destinos permitidos e classificação de dados.",
        "Pense em logs e aprovação."
      ],
      "expectedIdeas": [
        "egress control",
        "proxy",
        "DLP",
        "CASB",
        "allowlist",
        "baseline",
        "SIEM"
      ],
      "explanation": "Controle de egress deve ser seletivo e baseado em risco, não um bloqueio cego de negócio."
    }
  ],
  "quiz": [
    {
      "id": "q13.7.1",
      "type": "conceito",
      "q": "Qual é a melhor definição defensiva de movimento lateral?",
      "opts": [
        "Deslocamento entre sistemas internos para ampliar alcance ou chegar a ativos de interesse",
        "Qualquer tráfego que sai para a internet",
        "Somente ataque Wi-Fi",
        "Apenas varredura externa de portas"
      ],
      "a": 0,
      "exp": "Movimento lateral é o uso de acesso obtido para alcançar outros sistemas no ambiente.",
      "difficulty": "intermediário",
      "topic": "movimento lateral"
    },
    {
      "id": "q13.7.2",
      "type": "diagnóstico",
      "q": "Um domínio externo raro recebeu grande volume HTTPS de um host comum. Qual hipótese deve ser investigada sem conclusão precipitada?",
      "opts": [
        "Possível exfiltração ou transferência legítima que precisa de contexto",
        "Falha física no switch",
        "Somente problema de ARP",
        "Garantia absoluta de ataque concluído"
      ],
      "a": 0,
      "exp": "Volume alto para destino raro apoia hipótese de exfiltração, mas precisa de contexto de processo, usuário, dado e autorização.",
      "difficulty": "intermediário",
      "topic": "exfiltração"
    },
    {
      "id": "q13.7.3",
      "type": "segurança",
      "q": "Qual controle reduz movimento lateral de forma mais direta?",
      "opts": [
        "Segmentação e menor privilégio entre zonas",
        "Aumentar potência do Wi-Fi",
        "Desativar todos os logs",
        "Permitir any-any internamente"
      ],
      "a": 0,
      "exp": "Segmentação e menor privilégio reduzem caminhos disponíveis para avanço interno.",
      "difficulty": "intermediário",
      "topic": "controle"
    },
    {
      "id": "q13.7.4",
      "type": "diagnóstico",
      "q": "Usuários relatam certificado TLS inesperado ao acessar aplicação interna. Qual hipótese entra no radar?",
      "opts": [
        "Possível interposição, proxy indevido, CA alterada ou problema de certificado",
        "Exfiltração por DNS comprovada",
        "Falha de disco do servidor",
        "Aumento de canal Wi-Fi"
      ],
      "a": 0,
      "exp": "Certificado inesperado pode indicar MITM, proxy, CA, inspeção TLS mal configurada ou erro operacional.",
      "difficulty": "intermediário",
      "topic": "MITM"
    },
    {
      "id": "q13.7.5",
      "type": "soc",
      "q": "Por que correlacionar DNS, DHCP, firewall, IAM e EDR é importante?",
      "opts": [
        "Porque atribui origem, identidade, destino, processo e contexto em uma linha do tempo",
        "Porque substitui totalmente investigação humana",
        "Porque elimina falsos positivos automaticamente",
        "Porque impede qualquer tráfego criptografado"
      ],
      "a": 0,
      "exp": "Correlação transforma eventos soltos em história investigável.",
      "difficulty": "intermediário",
      "topic": "correlação"
    },
    {
      "id": "q13.7.6",
      "type": "ética",
      "q": "Qual opção respeita o limite ético desta aula?",
      "opts": [
        "Analisar logs simulados e propor controles defensivos",
        "Executar deauth em rede pública",
        "Capturar credenciais de usuários",
        "Criar ponto de acesso falso para enganar pessoas"
      ],
      "a": 0,
      "exp": "O laboratório é defensivo; técnicas ofensivas sem autorização são proibidas e perigosas.",
      "difficulty": "iniciante",
      "topic": "ética"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.7.1",
      "front": "O que é reconhecimento em rede?",
      "back": "Coleta de informações sobre hosts, serviços, nomes, portas, caminhos e dependências para entender o ambiente.",
      "tags": [
        "reconhecimento"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.7.2",
      "front": "O que é MITM?",
      "back": "Interposição no caminho de comunicação para observar, alterar ou interromper tráfego; nesta aula, tratado apenas em perspectiva defensiva.",
      "tags": [
        "mitm"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.7.3",
      "front": "O que é movimento lateral?",
      "back": "Uso de acesso obtido para tentar alcançar outros sistemas internos ou ativos de maior valor.",
      "tags": [
        "movimento lateral"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.7.4",
      "front": "O que é exfiltração?",
      "back": "Saída não autorizada de dados para local, serviço, conta ou destino externo/interno não permitido.",
      "tags": [
        "exfiltração"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.7.5",
      "front": "Por que baseline é essencial?",
      "back": "Porque sem saber o comportamento normal, é difícil classificar o anormal com precisão.",
      "tags": [
        "baseline",
        "soc"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.7.6",
      "front": "Evento isolado prova incidente?",
      "back": "Geralmente não. É preciso correlacionar contexto, logs, identidade, ativo, horário e comportamento.",
      "tags": [
        "investigação"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex13.7.1",
      "type": "classificação",
      "prompt": "Classifique: uma estação comum consulta 200 nomes internos em 2 minutos. O que pode ser e que evidência falta?",
      "expectedAnswer": "Pode ser reconhecimento suspeito ou inventário autorizado. Faltam owner do host, processo, ferramenta, janela de manutenção, logs EDR e histórico normal.",
      "explanation": "A classificação madura reconhece hipótese e incerteza."
    },
    {
      "id": "ex13.7.2",
      "type": "diagnóstico",
      "prompt": "Um usuário autenticou com sucesso em cinco servidores onde nunca havia acessado. Que fontes você correlaciona?",
      "expectedAnswer": "IAM/AD, VPN, EDR, firewall, NDR, logs dos servidores, grupo do usuário, horário, MFA, origem e mudanças recentes.",
      "explanation": "Credencial válida não garante legitimidade do comportamento."
    },
    {
      "id": "ex13.7.3",
      "type": "arquitetura",
      "prompt": "Indique três controles para reduzir exfiltração via HTTPS sem quebrar todo o negócio.",
      "expectedAnswer": "Proxy com política, DLP/classificação de dados, allowlist por categoria/destino, CASB, flow logs, alertas por volume/destino raro e revisão de exceções.",
      "explanation": "Controle de egress precisa ser seletivo e baseado em risco."
    },
    {
      "id": "ex13.7.4",
      "type": "segurança",
      "prompt": "Cite sinais defensivos que poderiam indicar MITM ou interposição indevida.",
      "expectedAnswer": "Certificado inesperado, CA desconhecida, mudança de gateway, ARP anormal, DNS divergente, proxy não autorizado, erro TLS e relatos de portal estranho.",
      "explanation": "MITM pode aparecer em várias camadas; a investigação precisa cruzar sinais."
    }
  ],
  "challenge": {
    "title": "Linha do tempo de possível cadeia de ataque em rede",
    "scenario": "Um host de usuário apresentou consultas DNS internas incomuns, conexões SMB para muitos servidores, falhas e sucessos de login com uma conta administrativa e grande upload para destino externo raro.",
    "tasks": [
      "Criar linha do tempo.",
      "Classificar eventos por hipótese.",
      "Definir evidências adicionais.",
      "Propor contenção proporcional.",
      "Recomendar melhorias permanentes."
    ],
    "constraints": [
      "Não presumir incidente confirmado sem evidências.",
      "Preservar evidências antes de limpeza.",
      "Evitar bloqueios amplos sem análise de impacto.",
      "Manter foco defensivo e ético."
    ],
    "expectedDeliverables": [
      "Tabela de eventos",
      "Hipóteses",
      "Plano de contenção",
      "Fontes de log necessárias",
      "Recomendações de arquitetura",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Linha do tempo e correlação",
        "points": 25,
        "description": "Eventos ordenados e conectados por origem, identidade e destino."
      },
      {
        "criterion": "Raciocínio defensivo",
        "points": 25,
        "description": "Hipóteses com incertezas e evidências faltantes."
      },
      {
        "criterion": "Contenção proporcional",
        "points": 25,
        "description": "Ações reduzem risco preservando evidência e negócio."
      },
      {
        "criterion": "Melhoria arquitetural",
        "points": 25,
        "description": "Controles permanentes atacam causas e caminhos observados."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A sequência sugere uma cadeia possível: descoberta interna, tentativa de acesso lateral e egress anômalo. Mas a solução correta não trata isso como certeza sem validar processo, usuário, ferramenta autorizada, inventário e classificação dos dados.",
    "steps": [
      "Organizar eventos por horário.",
      "Identificar origem, usuário e processo.",
      "Correlacionar DNS, DHCP, firewall, EDR, IAM, proxy e NDR.",
      "Verificar se há janela de manutenção ou inventário autorizado.",
      "Isolar host de forma controlada se o risco for alto.",
      "Preservar evidências.",
      "Bloquear destino externo raro temporariamente se houver justificativa.",
      "Revisar credenciais e sessões.",
      "Documentar impacto e risco residual.",
      "Propor segmentação, egress control, alertas comportamentais e melhoria de baseline."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Apagar o host imediatamente.",
        "whyItIsWrong": "Pode destruir evidências e impedir entendimento do escopo."
      },
      {
        "answer": "Ignorar porque a autenticação foi válida.",
        "whyItIsWrong": "Credenciais válidas podem ser abusadas."
      },
      {
        "answer": "Bloquear toda a internet da empresa.",
        "whyItIsWrong": "Contenção desproporcional pode gerar indisponibilidade sem resolver causa."
      },
      {
        "answer": "Concluir exfiltração apenas pelo volume.",
        "whyItIsWrong": "Volume apoia hipótese, mas precisa de contexto de destino, processo e dado."
      }
    ],
    "finalAnswer": "A resposta recomendada é abrir incidente em nível de suspeita alta, isolar o host preservando evidência, correlacionar logs de identidade, endpoint, DNS, firewall, proxy e NDR, bloquear temporariamente o destino raro se não houver justificativa de negócio, revisar credenciais usadas e produzir recomendações de segmentação, egress control, baseline e detecção comportamental."
  },
  "glossary": [
    {
      "term": "Reconhecimento",
      "shortDefinition": "Coleta de informações sobre ambiente, serviços e caminhos.",
      "longDefinition": "Em contexto defensivo, reconhecimento é observado por padrões de consulta, conexão e enumeração que podem revelar intenção de mapear o ambiente.",
      "example": "Uma estação consultando muitos nomes internos em curto período.",
      "relatedTerms": [
        "Discovery",
        "baseline",
        "inventário"
      ],
      "relatedLessons": [
        "13.6",
        "13.7"
      ]
    },
    {
      "term": "MITM",
      "shortDefinition": "Interposição no caminho de comunicação.",
      "longDefinition": "Risco em que um ator se coloca entre cliente e destino para observar, alterar ou negar comunicação; deve ser tratado com validação TLS, controles L2 e monitoramento.",
      "example": "Certificado inesperado em serviço interno.",
      "relatedTerms": [
        "TLS",
        "ARP",
        "proxy",
        "PMF"
      ],
      "relatedLessons": [
        "8.x",
        "12.8",
        "13.7"
      ]
    },
    {
      "term": "Movimento lateral",
      "shortDefinition": "Tentativa de alcançar outros sistemas internos a partir de acesso já obtido.",
      "longDefinition": "Pode usar credenciais legítimas, protocolos administrativos ou ferramentas nativas, exigindo segmentação, IAM e detecção comportamental.",
      "example": "Conta de usuário acessando servidores onde nunca acessou.",
      "relatedTerms": [
        "segmentação",
        "Zero Trust",
        "PAM"
      ],
      "relatedLessons": [
        "13.2",
        "13.8"
      ]
    },
    {
      "term": "Exfiltração",
      "shortDefinition": "Saída não autorizada de dados.",
      "longDefinition": "Pode ocorrer por canais aparentemente legítimos, como HTTPS, DNS, storage cloud, APIs ou e-mail, exigindo egress control e DLP.",
      "example": "Upload anormal para domínio raro.",
      "relatedTerms": [
        "DLP",
        "egress",
        "proxy"
      ],
      "relatedLessons": [
        "13.7",
        "16.9"
      ]
    },
    {
      "term": "Baseline",
      "shortDefinition": "Registro do comportamento esperado de ativos, usuários e fluxos.",
      "longDefinition": "Baseline permite comparar comportamento atual com padrão normal para detectar anomalias com menos ruído.",
      "example": "Servidor de banco normalmente não acessa domínios externos.",
      "relatedTerms": [
        "NDR",
        "SIEM",
        "anomalia"
      ],
      "relatedLessons": [
        "13.5",
        "15.2"
      ]
    },
    {
      "term": "Contenção proporcional",
      "shortDefinition": "Ação para reduzir risco sem causar dano desnecessário ao negócio ou às evidências.",
      "longDefinition": "Em resposta a incidente, contenção proporcional isola, bloqueia ou restringe apenas o necessário, preservando artefatos e continuidade quando possível.",
      "example": "Isolar um host suspeito via EDR em vez de desligar um segmento inteiro.",
      "relatedTerms": [
        "IR",
        "SOC",
        "evidência"
      ],
      "relatedLessons": [
        "13.9",
        "16.11"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Enterprise Tactics",
      "organization": "MITRE ATT&CK",
      "url": "https://attack.mitre.org/tactics/",
      "note": "Referência para táticas como Discovery, Lateral Movement, Collection e Exfiltration."
    },
    {
      "type": "official-doc",
      "title": "Lateral Movement, TA0008",
      "organization": "MITRE ATT&CK",
      "url": "https://attack.mitre.org/tactics/TA0008/",
      "note": "Define lateral movement como técnicas usadas para entrar e controlar sistemas remotos na rede."
    },
    {
      "type": "official-doc",
      "title": "Exfiltration, TA0010",
      "organization": "MITRE ATT&CK",
      "url": "https://attack.mitre.org/tactics/TA0010/",
      "note": "Referência para padrões de saída de dados em incidentes."
    },
    {
      "type": "official-doc",
      "title": "Computer Security Incident Handling Guide",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r2/final",
      "note": "Base para ciclo de resposta a incidentes e tratamento de evidências."
    },
    {
      "type": "official-doc",
      "title": "Layering Network Security Through Segmentation",
      "organization": "CISA",
      "url": "https://www.cisa.gov/sites/default/files/2023-01/layering-network-security-segmentation_infographic_508_0.pdf",
      "note": "Referência de defesa por segmentação e redução de movimento lateral."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação é controle central contra movimento lateral."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM e correlação permitem construir linha do tempo de investigação."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "mXX",
      "lesson": "pipeline-security",
      "reason": "Pipelines e runners podem virar caminhos de acesso se não houver isolamento e menor privilégio."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "mXX",
      "lesson": "identidade-privilegiada",
      "reason": "Movimento lateral frequentemente depende de credenciais, privilégios e sessão."
    }
  ],
  "pedagogicalMap": {
    "problem": "Comportamentos hostis podem se parecer com tráfego legítimo.",
    "concept": "Reconhecimento, MITM, movimento lateral e exfiltração são padrões de análise defensiva.",
    "internalMechanism": "Eventos devem ser correlacionados por origem, destino, identidade, processo, volume, horário e zona.",
    "realUse": "SOC, Blue Team, threat hunting, arquitetura defensiva e resposta a incidentes.",
    "commonMistake": "Concluir ataque por um único evento sem contexto.",
    "securityImpact": "Melhora detecção e reduz impacto por segmentação, logs e resposta proporcional.",
    "operationalImpact": "Exige baseline, inventário, NTP, logs e comunicação entre times.",
    "summary": "Ataques comuns de rede devem ser estudados para detectar, conter e mitigar, não para reproduzir em ambientes não autorizados."
  },
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
      "13.8"
    ]
  }
};
