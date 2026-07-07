export const lesson0703 = {
  "id": "7.3",
  "moduleId": "m07",
  "order": 3,
  "title": "Resolução recursiva, autoritativa e cache",
  "subtitle": "Entenda como uma consulta DNS percorre resolvedores recursivos, servidores autoritativos, referências hierárquicas e caches, e aprenda a diagnosticar respostas antigas, NXDOMAIN, split DNS e diferenças entre cliente, resolvedor e autoridade.",
  "duration": "110-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 255,
  "tags": [
    "redes",
    "dns",
    "resolução recursiva",
    "autoritativo",
    "cache dns",
    "ttl",
    "nxdomain",
    "split dns",
    "troubleshooting",
    "cloud",
    "segurança"
  ],
  "prerequisites": [
    {
      "id": "7.1",
      "title": "Por que DNS existe",
      "reason": "Explica o problema resolvido por DNS e o fluxo básico de nomes para endereços."
    },
    {
      "id": "7.2",
      "title": "Hierarquia DNS, zonas e delegação",
      "reason": "Mostra como raiz, TLDs, zonas e delegações organizam a autoridade DNS."
    },
    {
      "id": "4.8",
      "title": "ICMP, ping, TTL e traceroute",
      "reason": "Ajuda a separar resolução de nomes de conectividade IP e diagnóstico por camadas."
    }
  ],
  "objectives": [
    "Diferenciar resolvedor recursivo, servidor autoritativo, forwarder e cliente stub.",
    "Explicar o fluxo de uma resolução DNS sem cache e com cache.",
    "Entender TTL, cache positivo e cache negativo em diagnósticos reais.",
    "Comparar resposta recursiva com resposta consultada diretamente no autoritativo.",
    "Diagnosticar diferenças entre DNS interno, DNS externo, split DNS e DNS privado de cloud.",
    "Aplicar boas práticas defensivas para recursão, logging, cache, política e uso de resolvedores."
  ],
  "learningOutcomes": [
    "Desenhar o fluxo completo de uma consulta DNS recursiva.",
    "Identificar se uma resposta veio de cache ou de autoridade consultando TTL e flags.",
    "Usar comandos Windows, Linux e ferramentas de rede para comparar resolvedores.",
    "Construir uma hipótese técnica para falhas DNS durante migração de serviços."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Na aula anterior você viu que o DNS é hierárquico: raiz, TLD, domínio, zona e delegação. Agora a pergunta muda: quando um notebook precisa resolver <code>api.empresa.com</code>, quem percorre essa hierarquia de verdade?</p>\n  <p>Em redes reais, o usuário normalmente não conversa diretamente com a raiz, com o TLD e com o servidor autoritativo final. Ele pergunta a um <strong>resolvedor recursivo</strong>, que faz o trabalho pesado, armazena respostas em cache e devolve ao cliente uma resposta pronta.</p>\n  <div class='callout'><strong>Ideia central:</strong> DNS parece uma única pergunta simples, mas por trás existe uma cadeia de consultas, respostas autoritativas, referências, cache e TTL.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>Quando as redes eram pequenas, resolver nomes podia ser feito por arquivos locais. Com o crescimento da Internet, isso se tornou inviável. O DNS resolveu a escala ao distribuir autoridade, mas essa distribuição criou outro desafio: seria impraticável cada máquina cliente implementar toda a lógica de consulta hierárquica.</p>\n  <p>A solução operacional foi concentrar essa inteligência em resolvedores recursivos. Provedores, empresas, universidades, clouds e sistemas operacionais passaram a usar resolvedores que consultam a hierarquia, aplicam cache e reduzem drasticamente o volume de consultas repetidas.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Sem recursão e cache, cada cliente precisaria consultar raiz, TLD, domínio e zona autoritativa para quase todo nome. Isso aumentaria latência, carga global, exposição operacional e complexidade nos hosts.</p>\n  <p>Ao mesmo tempo, cache demais pode confundir troubleshooting. Um registro pode ter sido corrigido no servidor autoritativo, mas clientes ainda recebem a resposta antiga porque algum cache intermediário ainda respeita o TTL anterior.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> DNS pode falhar porque a autoridade está errada, porque o resolvedor está usando cache antigo, porque a zona privada não está associada à rede certa, porque há split DNS ou porque o cliente está usando o resolvedor errado.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A resolução DNS evoluiu de consultas simples para arquiteturas corporativas com recursivos internos, forwarders, caches locais, DNS privado em cloud, resolvedores condicionais, DNS sobre TLS/HTTPS e políticas de segurança baseadas em domínio.</p>\n  <p>Em ambientes modernos, DNS deixou de ser apenas conveniência. Ele participa de autenticação, service discovery, endpoints privados, balanceamento, emissão de certificados, e-mail, observabilidade, bloqueio de malware e investigação forense.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Resolução recursiva</strong> ocorre quando o cliente pede ao resolvedor: “descubra esse nome para mim e me entregue a resposta final”. O resolvedor assume a responsabilidade de consultar outros servidores até chegar à resposta ou a um erro.</p>\n  <p><strong>Servidor autoritativo</strong> é quem possui autoridade oficial por uma zona e responde por seus registros. Ele não precisa fazer recursão para o cliente; ele responde aquilo que sabe sobre a própria zona.</p>\n  <p><strong>Cache DNS</strong> é o armazenamento temporário de respostas e referências. Ele reduz latência e carga, mas também pode manter respostas antigas até o TTL expirar.</p>\n  <div class='definition-box'>Recursivo busca respostas para clientes. Autoritativo publica respostas oficiais sobre uma zona. Cache guarda temporariamente o que já foi aprendido.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um cliente consulta <code>www.empresa.com</code>, ele normalmente envia uma pergunta ao resolvedor configurado por DHCP, política corporativa ou configuração manual. Esse resolvedor verifica se já possui resposta em cache. Se tiver, responde rapidamente. Se não tiver, percorre a hierarquia.</p>\n  <ol class='flow-list'>\n    <li>O cliente consulta o resolvedor recursivo configurado.</li>\n    <li>O resolvedor verifica cache positivo e cache negativo.</li>\n    <li>Se não houver cache útil, consulta a raiz para localizar o TLD.</li>\n    <li>Consulta o TLD para localizar os servidores autoritativos do domínio.</li>\n    <li>Consulta o servidor autoritativo do domínio ou da zona delegada.</li>\n    <li>Recebe resposta final, CNAME intermediário ou erro autoritativo.</li>\n    <li>Armazena a informação em cache conforme TTL.</li>\n    <li>Devolve a resposta ao cliente.</li>\n  </ol>\n  <p>Também existe <strong>cache negativo</strong>. Quando um nome não existe, respostas como NXDOMAIN podem ser armazenadas por um período. Isso explica por que criar um registro novo pode não funcionar imediatamente em alguns clientes se eles consultaram o nome antes da criação.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura DNS corporativa separa cliente, resolvedor local, forwarder, recursivo corporativo, zonas internas, zonas públicas e servidores autoritativos. Em cloud, ainda entram resolvedores de VPC/VNet, private hosted zones e conditional forwarding para ambientes híbridos.</p>\n  <table class='data-table'><thead><tr><th>Componente</th><th>Função</th><th>Exemplo</th><th>Risco comum</th></tr></thead><tbody>\n    <tr><td>Cliente stub</td><td>Envia consultas ao resolvedor configurado</td><td>Notebook, servidor, container</td><td>Usar DNS externo indevido</td></tr>\n    <tr><td>Resolvedor recursivo</td><td>Busca resposta final e aplica cache</td><td>DNS corporativo, provedor, cloud resolver</td><td>Cache antigo, política ausente, logging fraco</td></tr>\n    <tr><td>Forwarder</td><td>Encaminha consultas para outro resolvedor</td><td>DNS interno para DNS cloud</td><td>Loop, latência, dependência escondida</td></tr>\n    <tr><td>Autoritativo</td><td>Publica registros oficiais da zona</td><td>Route 53, Azure DNS, BIND autoritativo</td><td>Registro incorreto, delegação quebrada, takeover</td></tr>\n    <tr><td>Cache</td><td>Reduz latência e carga</td><td>Cache do sistema, browser, resolvedor</td><td>Resposta antiga durante incidentes</td></tr>\n  </tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em um assistente que resolve burocracias para você. Você não liga para cartório, prefeitura, banco e fornecedor; você pede ao assistente: “descubra o endereço oficial dessa empresa”. Ele consulta fontes confiáveis, anota a resposta por um tempo e responde rapidamente se alguém perguntar de novo.</p>\n  <p>O assistente é o resolvedor recursivo. As fontes oficiais são servidores autoritativos. As anotações temporárias são o cache. O prazo de validade das anotações é o TTL.</p>\n  <p>O limite da analogia é que DNS é técnico e determinístico: respostas têm tipos, classes, TTLs, autoridade e códigos de erro. Não é apenas “alguém procurando no Google”.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu computador recebe via DHCP o DNS do roteador ou do provedor. Quando você acessa <code>www.exemplo.com</code>, o computador pergunta ao resolvedor. Se o resolvedor já consultou esse nome recentemente, responde do cache. Se não, consulta a hierarquia e guarda o resultado.</p>\n  <p>Se você troca o IP de um registro com TTL de 3600 segundos, alguns usuários podem continuar chegando ao IP antigo por até uma hora, dependendo de caches intermediários e do momento em que consultaram.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, estações usam DNS interno. Esse DNS responde nomes internos como <code>intranet.corp.local</code>, encaminha nomes públicos para recursivos controlados e registra logs para investigação de segurança.</p>\n  <p>Quando um serviço muda de datacenter para cloud, a equipe reduz TTL antes da migração, valida respostas em resolvedores internos e externos, monitora cache e mantém fallback. Sem esse cuidado, parte dos usuários pode ir para o ambiente antigo enquanto outra parte vai para o novo.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, DNS privado é parte essencial da arquitetura. Uma VM em uma VPC/VNet pode resolver <code>db.internal.empresa</code> para um IP privado, enquanto um usuário externo não deve conseguir resolver esse nome ou não deve alcançar o endereço retornado.</p>\n  <p>Private endpoints, service endpoints, zonas privadas e conditional forwarding dependem de resolução correta. Um erro comum é criar o endpoint privado, mas esquecer de associar a zona privada à rede certa; o resultado é que a rota existe, o serviço existe, mas o nome continua apontando para o endpoint público ou não resolve.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines de CI/CD dependem de DNS para baixar dependências, publicar artefatos, chamar APIs, validar certificados e conectar em clusters. Uma falha de DNS pode parecer falha de aplicação, falha de TLS, falha de proxy ou falha de rede.</p>\n  <p>Em Kubernetes, service discovery usa DNS intensamente. Um pod pode resolver <code>api.namespace.svc.cluster.local</code> por DNS interno do cluster. Se CoreDNS estiver degradado, aplicações podem falhar mesmo com IPs, rotas e portas funcionais.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Do ponto de vista defensivo, DNS é uma excelente fonte de telemetria. Consultas para domínios recém-criados, domínios gerados automaticamente, resoluções incomuns e túneis DNS podem indicar malware, C2 ou exfiltração.</p>\n  <p>Ao mesmo tempo, DNS mal configurado pode vazar nomes internos, permitir bypass de filtros, usar resolvedores externos sem logging, manter cache envenenado em ambientes vulneráveis ou direcionar usuários para infraestrutura errada.</p>\n  <div class='callout callout--security'><strong>Boa prática:</strong> trate resolvedores DNS como infraestrutura crítica: controle quem pode usá-los, registre consultas relevantes, proteja recursão, monitore alterações e separe DNS interno de DNS público.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m07l03-title m07l03-desc'>\n    <title id='m07l03-title'>Resolução DNS recursiva, autoritativa e cache</title>\n    <desc id='m07l03-desc'>Cliente consulta resolvedor recursivo; resolvedor consulta raiz, TLD e autoritativo, armazena em cache e retorna resposta ao cliente.</desc>\n    <defs>\n      <marker id='m07l03-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto' markerUnits='strokeWidth'><path d='M0,0 L0,6 L9,3 z'></path></marker>\n    </defs>\n    <rect x='40' y='70' width='150' height='95' rx='12' class='svg-node svg-node--client'></rect>\n    <text x='115' y='110' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='115' y='135' text-anchor='middle' class='svg-label svg-label--small'>stub resolver</text>\n\n    <rect x='300' y='55' width='180' height='125' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='390' y='95' text-anchor='middle' class='svg-label'>Resolvedor</text>\n    <text x='390' y='120' text-anchor='middle' class='svg-label svg-label--small'>recursivo</text>\n    <rect x='325' y='138' width='130' height='24' rx='8' class='svg-badge'></rect>\n    <text x='390' y='156' text-anchor='middle' class='svg-label svg-label--small'>cache + TTL</text>\n\n    <rect x='630' y='45' width='130' height='72' rx='12' class='svg-node svg-node--cloud'></rect>\n    <text x='695' y='88' text-anchor='middle' class='svg-label'>Raiz</text>\n\n    <rect x='630' y='170' width='130' height='72' rx='12' class='svg-node svg-node--cloud'></rect>\n    <text x='695' y='213' text-anchor='middle' class='svg-label'>TLD</text>\n\n    <rect x='610' y='305' width='175' height='88' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='697' y='342' text-anchor='middle' class='svg-label'>Autoritativo</text>\n    <text x='697' y='365' text-anchor='middle' class='svg-label svg-label--small'>zona empresa.com</text>\n\n    <rect x='610' y='440' width='175' height='72' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='697' y='472' text-anchor='middle' class='svg-label'>Logs/Política</text>\n    <text x='697' y='494' text-anchor='middle' class='svg-label svg-label--small'>segurança DNS</text>\n\n    <line x1='190' y1='118' x2='300' y2='118' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <text x='245' y='100' text-anchor='middle' class='svg-label svg-label--small'>1 pergunta</text>\n\n    <line x1='480' y1='85' x2='630' y2='82' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <text x='555' y='65' text-anchor='middle' class='svg-label svg-label--small'>2 sem cache</text>\n\n    <line x1='695' y1='117' x2='695' y2='170' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <text x='735' y='148' class='svg-label svg-label--small'>referral</text>\n\n    <line x1='695' y1='242' x2='695' y2='305' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <text x='735' y='277' class='svg-label svg-label--small'>NS domínio</text>\n\n    <line x1='610' y1='350' x2='480' y2='145' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <text x='535' y='280' text-anchor='middle' class='svg-label svg-label--small'>resposta autoritativa</text>\n\n    <line x1='390' y1='180' x2='390' y2='245' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <rect x='300' y='245' width='180' height='72' rx='12' class='svg-node svg-node--switch'></rect>\n    <text x='390' y='276' text-anchor='middle' class='svg-label'>Cache local</text>\n    <text x='390' y='298' text-anchor='middle' class='svg-label svg-label--small'>positivo/negativo</text>\n\n    <line x1='300' y1='282' x2='185' y2='160' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <text x='220' y='245' text-anchor='middle' class='svg-label svg-label--small'>resposta final</text>\n\n    <line x1='480' y1='150' x2='610' y2='465' class='svg-flow svg-flow--blocked animated-flow' marker-end='url(#m07l03-arrow)'></line>\n    <text x='565' y='465' text-anchor='middle' class='svg-label svg-label--small'>telemetria</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam interpretação de consultas DNS, TTL, cache positivo, cache negativo, diferença entre resolvedor e autoritativo e leitura de saídas de <code>dig</code>, <code>nslookup</code> e <code>Resolve-DnsName</code>.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você investigará um incidente em que <code>portal.empresa.com</code> foi migrado para novo IP, mas parte dos usuários ainda acessa o destino antigo. Será necessário separar cache local, cache recursivo, TTL alto, split DNS e erro autoritativo.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como consultar múltiplos resolvedores, consultar diretamente o autoritativo, observar TTL decrescente, limpar cache local com cuidado e montar uma linha do tempo de mudança DNS.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Resolução recursiva é o processo em que um resolvedor faz consultas em nome do cliente até obter resposta final. Servidores autoritativos são fontes oficiais de uma zona. Cache acelera respostas, reduz carga e também pode prolongar erros até o TTL expirar.</p>\n  <p>Para troubleshooting, não basta dizer “DNS está errado”. É preciso provar se o erro está no cliente, no resolvedor, no cache, na autoridade, na delegação, na zona privada, no forwarder ou em uma política de segurança.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará os registros DNS mais usados: <code>A</code>, <code>AAAA</code>, <code>CNAME</code>, <code>MX</code>, <code>TXT</code>, <code>NS</code>, <code>SRV</code> e <code>PTR</code>. Depois de entender o caminho da consulta, vamos entender o conteúdo das respostas.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Serviços de rede",
      "DNS",
      "Troubleshooting"
    ],
    "beforeThisLesson": "O aluno entende por que DNS existe e como a hierarquia de zonas e delegações organiza autoridade.",
    "afterThisLesson": "O aluno entende como consultas DNS são resolvidas por recursivos, autoritativos e caches, e consegue diagnosticar respostas divergentes.",
    "dependsOn": [
      "DNS básico",
      "Hierarquia DNS",
      "IPv4",
      "Roteamento",
      "Cloud networking"
    ]
  },
  "protocolFields": [
    {
      "field": "Query name",
      "meaning": "Nome consultado, como portal.empresa.com.",
      "securityNote": "Pode revelar aplicações, ambientes e estrutura interna."
    },
    {
      "field": "Query type",
      "meaning": "Tipo de registro solicitado, como A, AAAA, CNAME, MX ou TXT.",
      "securityNote": "Consultas incomuns podem indicar reconhecimento ou automação mal configurada."
    },
    {
      "field": "RD flag",
      "meaning": "Recursion Desired: cliente pede que o servidor realize recursão.",
      "securityNote": "Recursão aberta na Internet pode ser abusada para amplificação e enumeração."
    },
    {
      "field": "RA flag",
      "meaning": "Recursion Available: servidor informa que oferece recursão.",
      "securityNote": "Ajuda a identificar resolvedores recursivos expostos indevidamente."
    },
    {
      "field": "AA flag",
      "meaning": "Authoritative Answer: resposta veio de servidor autoritativo pela zona.",
      "securityNote": "Diferencia resposta oficial de resposta de cache."
    },
    {
      "field": "TTL",
      "meaning": "Tempo restante de cache para a resposta.",
      "securityNote": "TTL alto prolonga erro; TTL baixo pode aumentar carga e custo operacional."
    },
    {
      "field": "RCODE",
      "meaning": "Código de resposta, como NOERROR, NXDOMAIN, SERVFAIL ou REFUSED.",
      "securityNote": "Diferentes códigos apontam para causas distintas e devem ser registrados em incidentes."
    }
  ],
  "packetFlow": [
    "Aplicação solicita resolução de um FQDN ao sistema operacional.",
    "Cliente stub consulta o resolvedor configurado via DHCP, política ou configuração manual.",
    "Resolvedor verifica cache positivo, cache negativo e políticas locais.",
    "Se não houver cache, consulta raiz, TLD e servidores autoritativos conforme a hierarquia.",
    "Servidor autoritativo responde registro final, CNAME intermediário, NXDOMAIN, NODATA ou erro.",
    "Resolvedor armazena resposta conforme TTL e devolve ao cliente.",
    "Cliente usa o endereço retornado para iniciar conexão TCP/UDP/TLS ou reporta falha de resolução.",
    "Logs e telemetria podem registrar consulta, resposta, política aplicada e resolvedor usado."
  ],
  "deepDive": {
    "title": "Por que cache DNS confunde incidentes",
    "points": [
      "TTL é definido no registro ou na zona, mas caches podem estar em múltiplos níveis: browser, sistema operacional, resolvedor local, forwarder e recursivo corporativo.",
      "O TTL observado em uma resposta de cache geralmente aparece decrescente, enquanto uma consulta direta ao autoritativo tende a mostrar o TTL original.",
      "NXDOMAIN também pode ser armazenado temporariamente; criar um registro logo após testar um nome inexistente pode não resolver imediatamente em todos os clientes.",
      "Split DNS significa que a mesma consulta pode receber respostas diferentes dependendo da origem, do resolvedor e da rede associada.",
      "Em cloud, zonas privadas exigem associação correta à VPC/VNet e podem depender de forwarders condicionais no ambiente híbrido."
    ]
  },
  "commonMistakes": [
    "Limpar cache local e concluir que o problema acabou sem testar o resolvedor corporativo.",
    "Consultar apenas um DNS público e ignorar split DNS interno.",
    "Achar que ping por IP funcionando prova que DNS está certo.",
    "Achar que DNS respondendo prova que a aplicação está saudável.",
    "Confundir resposta NXDOMAIN com bloqueio de firewall.",
    "Reduzir TTL depois da mudança em vez de antes da janela de migração.",
    "Deixar resolvedor recursivo aberto para a Internet.",
    "Não registrar qual resolvedor respondeu durante uma investigação."
  ],
  "troubleshooting": {
    "method": "Comparar cliente, resolvedor configurado, resolvedor alternativo e servidor autoritativo. Registrar FQDN, tipo, resposta, TTL, flags, horário, origem da consulta e rede usada.",
    "windows": [
      "ipconfig /all",
      "ipconfig /displaydns",
      "ipconfig /flushdns",
      "Resolve-DnsName portal.empresa.com -Type A",
      "Resolve-DnsName portal.empresa.com -Server 8.8.8.8",
      "nslookup -debug portal.empresa.com",
      "Test-NetConnection portal.empresa.com -Port 443"
    ],
    "linux": [
      "resolvectl status",
      "resolvectl query portal.empresa.com",
      "sudo resolvectl flush-caches",
      "dig portal.empresa.com A",
      "dig +trace portal.empresa.com",
      "dig @8.8.8.8 portal.empresa.com A",
      "dig @ns1.exemplo.net portal.empresa.com A +norecurse",
      "drill portal.empresa.com A"
    ],
    "cisco": [
      "show running-config | include name-server",
      "show hosts",
      "ping portal.empresa.com",
      "traceroute portal.empresa.com",
      "debug domain"
    ],
    "cloud": [
      "Verificar resolvedor padrão da VPC/VNet",
      "Conferir associação da zona privada à rede correta",
      "Validar conditional forwarders entre on-premises e cloud",
      "Comparar resposta a partir de uma VM interna e de um cliente externo",
      "Conferir logs de DNS resolver, flow logs e políticas de saída"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Resolução recursiva, autoritativa e cache.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
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
    "goodPractices": [
      "Permitir recursão apenas para redes autorizadas.",
      "Registrar consultas DNS relevantes para investigação e detecção.",
      "Separar DNS interno, externo e privado de cloud com governança clara.",
      "Reduzir TTL antes de migrações planejadas e documentar janela de propagação.",
      "Bloquear ou controlar uso de resolvedores externos não autorizados quando a política corporativa exigir.",
      "Monitorar NXDOMAIN excessivo, domínios recém-criados e padrões de exfiltração por DNS.",
      "Proteger servidores DNS com hardening, patching e segmentação de rede."
    ],
    "badPractices": [
      "Expor resolvedor recursivo para qualquer origem na Internet.",
      "Usar DNS público em servidores que dependem de zonas privadas internas.",
      "Publicar nomes internos em zonas públicas sem necessidade.",
      "Alterar registros críticos sem revisar TTL, cache e rollback.",
      "Não coletar logs de consulta DNS em ambientes sensíveis.",
      "Misturar autoridade DNS e recursão sem controle de acesso."
    ],
    "attacksAndDefenses": [
      {
        "risk": "DNS cache poisoning",
        "defense": "Usar software atualizado, randomização de porta/ID, DNSSEC quando aplicável e restringir recursão."
      },
      {
        "risk": "Open resolver abusado para amplificação",
        "defense": "Permitir recursão apenas para redes internas e aplicar rate limit."
      },
      {
        "risk": "Exfiltração por DNS",
        "defense": "Monitorar volume, tamanho, entropia, NXDOMAIN e domínios suspeitos; aplicar egress control."
      },
      {
        "risk": "Bypass por resolvedor externo",
        "defense": "Controlar saída UDP/TCP 53, DoT/DoH conforme política e direcionar clientes para resolvedores aprovados."
      },
      {
        "risk": "Resposta privada vazando em contexto público",
        "defense": "Separar zonas, revisar split DNS e testar de múltiplas origens."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Resolução recursiva, autoritativa e cache",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Remover exceções permanentes sem justificativa."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    "Como você provaria que uma resposta veio de cache e não do autoritativo?",
    "Por que reduzir TTL depois de uma migração problemática nem sempre resolve imediatamente?",
    "Como split DNS pode fazer duas pessoas corretas observarem respostas diferentes para o mesmo nome?"
  ],
  "quiz": [
    {
      "question": "Qual é o papel principal de um resolvedor recursivo?",
      "options": [
        "Publicar oficialmente registros de uma zona",
        "Buscar a resposta em nome do cliente e aplicar cache",
        "Roteador pacotes entre VLANs",
        "Criptografar respostas DNS"
      ],
      "answer": 1,
      "explanation": "O resolvedor recursivo consulta a hierarquia para o cliente e pode armazenar respostas em cache."
    },
    {
      "question": "O que indica uma resposta autoritativa?",
      "options": [
        "Ela veio necessariamente do cache do browser",
        "Ela foi respondida por servidor com autoridade pela zona",
        "Ela passou por traceroute",
        "Ela sempre usa TCP"
      ],
      "answer": 1,
      "explanation": "Autoritativo significa que o servidor responde oficialmente por aquela zona."
    },
    {
      "question": "O que o TTL controla?",
      "options": [
        "Número de saltos IP",
        "Tempo pelo qual uma resposta DNS pode ser mantida em cache",
        "Porta TCP da aplicação",
        "Tamanho máximo do pacote Ethernet"
      ],
      "answer": 1,
      "explanation": "Em DNS, TTL é o tempo de validade de cache da resposta."
    },
    {
      "question": "Por que NXDOMAIN pode persistir depois que um registro é criado?",
      "options": [
        "Porque cache negativo pode guardar a inexistência temporariamente",
        "Porque ARP bloqueia DNS",
        "Porque registros A não aceitam TTL",
        "Porque DNS não usa cache"
      ],
      "answer": 0,
      "explanation": "Respostas negativas também podem ser armazenadas por um período."
    },
    {
      "question": "Qual risco está associado a resolvedores recursivos abertos na Internet?",
      "options": [
        "Melhorar automaticamente segurança",
        "Amplificação, abuso e enumeração",
        "Eliminar necessidade de firewall",
        "Impedir qualquer cache"
      ],
      "answer": 1,
      "explanation": "Open resolvers podem ser abusados em ataques e devem restringir recursão."
    },
    {
      "question": "Em split DNS, o mesmo nome pode retornar respostas diferentes por quê?",
      "options": [
        "Porque IPs são aleatórios",
        "Porque resolvedor/origem/rede determinam a zona consultada",
        "Porque MAC altera DNS",
        "Porque TTL é sempre zero"
      ],
      "answer": 1,
      "explanation": "Split DNS separa visões internas e externas ou privadas e públicas."
    }
  ],
  "flashcards": [
    {
      "front": "Resolvedor recursivo",
      "back": "Servidor que busca resposta DNS em nome do cliente e normalmente aplica cache."
    },
    {
      "front": "Servidor autoritativo",
      "back": "Servidor que possui autoridade oficial para responder registros de uma zona."
    },
    {
      "front": "Cache DNS",
      "back": "Armazenamento temporário de respostas para reduzir latência e carga."
    },
    {
      "front": "TTL em DNS",
      "back": "Tempo em que uma resposta pode ser considerada válida em cache."
    },
    {
      "front": "Cache negativo",
      "back": "Armazenamento temporário de respostas como NXDOMAIN ou ausência de tipo de registro."
    },
    {
      "front": "Split DNS",
      "back": "Arquitetura em que o mesmo nome pode resolver diferente conforme origem, rede ou resolvedor."
    }
  ],
  "exercises": [
    {
      "title": "Classificar componentes",
      "prompt": "Explique a diferença entre cliente stub, resolvedor recursivo, forwarder e servidor autoritativo.",
      "expectedAnswer": "Cliente envia consulta, recursivo busca resposta, forwarder encaminha para outro resolvedor e autoritativo publica registros oficiais."
    },
    {
      "title": "Analisar TTL",
      "prompt": "Uma consulta retorna TTL 300. Dez segundos depois retorna TTL 290. O que isso sugere?",
      "expectedAnswer": "Sugere resposta de cache com TTL decrescente."
    },
    {
      "title": "Comparar respostas",
      "prompt": "O DNS interno responde 10.20.1.15 e o DNS público responde 203.0.113.20 para o mesmo nome. Qual hipótese deve ser avaliada?",
      "expectedAnswer": "Split DNS ou diferença entre zona privada e pública."
    },
    {
      "title": "Planejar migração",
      "prompt": "Antes de alterar o IP de app.empresa.com, quais cuidados com TTL e cache você tomaria?",
      "expectedAnswer": "Reduzir TTL antes da janela, validar autoritativos, documentar rollback, comparar resolvedores e monitorar consultas."
    }
  ],
  "challenge": {
    "title": "Incidente de migração com cache divergente",
    "scenario": "A empresa migrou portal.empresa.com de 198.51.100.10 para 198.51.100.40. O servidor autoritativo já responde o novo IP, mas parte dos usuários ainda acessa o antigo. Alguns estão na rede corporativa, outros em home office.",
    "tasks": [
      "Criar uma hipótese para cada ponto: cliente, recursivo corporativo, recursivo público, autoritativo e split DNS.",
      "Definir comandos para coletar evidências no Windows e no Linux.",
      "Explicar como TTL anterior pode manter usuários no IP antigo.",
      "Criar um plano de mitigação e comunicação sem culpar apenas 'propagação DNS'."
    ],
    "rubric": [
      "Diferencia cache local, cache recursivo e autoridade.",
      "Compara respostas de pelo menos dois resolvedores e um autoritativo.",
      "Registra TTL, horário, origem, resposta e servidor consultado.",
      "Inclui plano de rollback, monitoramento e redução prévia de TTL para futuras mudanças."
    ]
  },
  "commentedSolution": {
    "overview": "A solução correta começa provando a autoridade: consultar diretamente o servidor autoritativo. Depois compara resolvedores internos e externos, observando TTL e resposta. Se o autoritativo já tem IP novo, mas resolvedores ainda retornam IP antigo com TTL decrescente, a causa provável é cache. Se interno e externo divergem de forma consistente, avaliar split DNS.",
    "steps": [
      "Identificar NS autoritativos da zona com consulta NS.",
      "Consultar @autoritativo portal.empresa.com A +norecurse.",
      "Consultar resolvedor corporativo e resolvedor externo, registrando TTL.",
      "Comparar respostas a partir da rede interna, VPN e Internet residencial.",
      "Limpar cache local apenas como teste controlado, sem concluir causa raiz.",
      "Montar linha do tempo: TTL antigo, horário da mudança, caches observados e previsão de normalização.",
      "Para futuras mudanças, reduzir TTL antes da janela, validar alteração e restaurar TTL após estabilização."
    ],
    "keyInsight": "DNS não 'propaga' magicamente; caches expiram conforme TTL e resolvedores diferentes podem ter aprendido respostas em momentos diferentes. O diagnóstico precisa registrar quem respondeu, qual TTL restava e se a resposta era autoritativa ou cache."
  },
  "glossary": [
    {
      "term": "Resolvedor recursivo",
      "definition": "Servidor que resolve nomes em nome dos clientes, consultando outros servidores quando necessário."
    },
    {
      "term": "Autoritativo",
      "definition": "Servidor com autoridade oficial para responder por registros de uma zona."
    },
    {
      "term": "TTL",
      "definition": "Tempo de validade de uma resposta DNS em cache."
    },
    {
      "term": "NXDOMAIN",
      "definition": "Código de resposta indicando que o nome consultado não existe."
    },
    {
      "term": "Forwarder",
      "definition": "Servidor que encaminha consultas para outro resolvedor em vez de resolver diretamente toda a hierarquia."
    },
    {
      "term": "Split DNS",
      "definition": "Uso de respostas DNS diferentes para o mesmo nome conforme origem, rede ou resolvedor."
    }
  ],
  "references": [
    {
      "title": "RFC 1034 — Domain Names: Concepts and Facilities",
      "type": "standard",
      "note": "Base conceitual do DNS."
    },
    {
      "title": "RFC 1035 — Domain Names: Implementation and Specification",
      "type": "standard",
      "note": "Especificação de mensagens, registros e operação DNS."
    },
    {
      "title": "Documentação BIND 9",
      "type": "documentation",
      "note": "Referência prática para resolvedores e servidores autoritativos."
    },
    {
      "title": "Documentações de DNS privado em AWS, Azure e Google Cloud",
      "type": "documentation",
      "note": "Úteis para relacionar recursão, zonas privadas e forwarding condicional."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Módulo de observabilidade e operação",
      "reason": "DNS é fonte crítica de logs, alertas e troubleshooting operacional."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Federação e autenticação",
      "reason": "OIDC, SAML, Kerberos, certificados e e-mail dependem fortemente de DNS correto."
    }
  ],
  "progressRules": {
    "requiresQuiz": true,
    "requiresLab": true,
    "minimumQuizScore": 70,
    "unlockNextLesson": "7.4",
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
      "7.4"
    ]
  }
};
