export const lesson0705 = {
  "id": "7.5",
  "moduleId": "m07",
  "order": 5,
  "title": "TTL, cache DNS e troubleshooting de nomes",
  "subtitle": "Entenda por que alterações DNS parecem demorar, onde respostas ficam armazenadas, como o TTL influencia operações e como diagnosticar falhas de nomes sem confundir cache, autoridade, rota, porta e aplicação.",
  "duration": "115-165 min",
  "estimatedStudyTimeMinutes": 165,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "redes",
    "dns",
    "ttl",
    "cache dns",
    "troubleshooting",
    "dig",
    "nslookup",
    "resolvedor",
    "autoritativo",
    "segurança",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "id": "7.1",
      "title": "Por que DNS existe",
      "reason": "Explica o problema original de nomes, IPs e resolução."
    },
    {
      "id": "7.2",
      "title": "Hierarquia DNS, zonas e delegação",
      "reason": "Mostra autoridade, delegação, NS e zonas DNS."
    },
    {
      "id": "7.3",
      "title": "Resolução recursiva, autoritativa e cache",
      "reason": "Explica o caminho da consulta e a diferença entre cache, recursão e autoridade."
    },
    {
      "id": "7.4",
      "title": "Registros DNS",
      "reason": "Mostra os tipos de registros que serão diagnosticados nesta aula."
    }
  ],
  "objectives": [
    "Explicar o que é TTL e por que ele existe no DNS.",
    "Diferenciar cache no navegador, sistema operacional, resolvedor local, resolvedor corporativo, provedor, CDN e servidor autoritativo.",
    "Investigar respostas antigas, divergentes ou intermitentes usando consultas direcionadas.",
    "Planejar mudanças DNS com redução de TTL, janela de alteração, rollback e validação autoritativa.",
    "Separar falha de nome, falha de rota, falha de porta, falha de TLS e falha da aplicação.",
    "Aplicar boas práticas defensivas para reduzir exposição, vazamento e incidentes causados por cache e DNS mal governado."
  ],
  "learningOutcomes": [
    "Ler uma resposta DNS e interpretar TTL, origem provável e validade operacional.",
    "Comparar resposta de resolvedor recursivo com resposta de servidor autoritativo.",
    "Montar uma linha de investigação para incidentes de DNS e cache.",
    "Definir uma política de TTL para registros críticos, estáveis, voláteis e automatizados."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Em operações reais, poucas frases aparecem tanto quanto: “eu alterei o DNS, mas ainda não propagou”. A frase é comum, mas costuma esconder um problema conceitual. Na maior parte dos casos, DNS não “propaga” como um arquivo copiado imediatamente para todos os lugares. O que existe é autoridade, cache e tempo de validade.</p>\n  <p>Quando um registro muda, alguns clientes ainda podem enxergar a resposta antiga porque ela foi armazenada por um resolvedor, pelo sistema operacional, pelo navegador, por um proxy, por uma CDN, por uma biblioteca de aplicação ou por um agente intermediário. Sem entender TTL e cache, o troubleshooting vira tentativa e erro.</p>\n  <div class='callout'><strong>Ideia central:</strong> TTL é o contrato de tempo durante o qual uma resposta DNS pode ser reutilizada em cache. Troubleshooting DNS profissional exige saber perguntar para quem tem autoridade, quem tem cache e quem está apenas repetindo uma resposta antiga.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>O DNS foi criado para escalar a resolução de nomes em uma rede que crescia rápido demais para arquivos manuais. Para escalar, o DNS precisou distribuir autoridade e permitir cache. Sem cache, cada acesso a um site popular exigiria consultas repetidas até a raiz, TLDs e servidores autoritativos, gerando latência, custo e sobrecarga.</p>\n  <p>O TTL nasceu como parte essencial dessa arquitetura. Ele permite que respostas sejam reaproveitadas por um período limitado. Em troca, mudanças não aparecem instantaneamente para todos os resolvedores que já possuem uma resposta válida em cache.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema que TTL e cache resolvem é escala. Se cada cliente consultasse sempre a autoridade final para cada nome, a Internet seria mais lenta, mais cara e mais frágil. O problema que TTL cria é operacional: respostas antigas podem continuar corretas do ponto de vista do cache, mas incorretas do ponto de vista da mudança desejada.</p>\n  <p>Em uma migração de aplicação, por exemplo, parte dos usuários pode resolver <code>app.empresa.com</code> para o IP antigo e parte para o IP novo. Isso pode causar sessões quebradas, divergência de logs, falha de certificado, tráfego para ambiente legado, incidentes de disponibilidade e falsos diagnósticos de firewall.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> quando DNS falha, você precisa descobrir se o registro está errado na autoridade, se a delegação está errada, se o cache está antigo, se o cliente consulta o resolvedor errado ou se DNS está correto e a falha está em rota, porta, TLS ou aplicação.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>Inicialmente, cache DNS era pensado principalmente para reduzir consultas repetidas. Com o crescimento de CDNs, balanceadores globais, DNS interno, split-horizon, cloud, service discovery e automação, o TTL passou a ser também uma ferramenta de operação.</p>\n  <p>Registros com TTL baixo permitem mudanças rápidas, mas aumentam volume de consultas e dependência do DNS. Registros com TTL alto reduzem carga e estabilizam respostas, mas dificultam mudança emergencial. Ambientes modernos precisam equilibrar disponibilidade, custo, performance, segurança e capacidade de rollback.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>TTL</strong>, ou <em>Time To Live</em>, é o tempo, normalmente em segundos, pelo qual uma resposta DNS pode permanecer em cache. Se um registro <code>A</code> tem TTL de <code>3600</code>, um resolvedor que recebeu essa resposta pode reutilizá-la por até uma hora antes de perguntar novamente.</p>\n  <p><strong>Cache DNS</strong> é o armazenamento temporário de respostas DNS para acelerar consultas e reduzir carga. Pode existir em muitos lugares: aplicação, navegador, sistema operacional, serviço de resolução local, resolvedor corporativo, resolvedor do provedor, resolvedor público, appliance de segurança, proxy, CDN e bibliotecas internas.</p>\n  <table class='data-table'><thead><tr><th>Camada de cache</th><th>Exemplo</th><th>Impacto no troubleshooting</th></tr></thead><tbody>\n    <tr><td>Aplicação</td><td>JVM, runtime, cliente HTTP</td><td>Pode manter IP antigo mesmo após limpar cache do SO</td></tr>\n    <tr><td>Navegador</td><td>Chrome, Edge, Firefox</td><td>Pode reutilizar resolução e conexões persistentes</td></tr>\n    <tr><td>Sistema operacional</td><td>Windows DNS Client, systemd-resolved</td><td>Afeta todas as aplicações locais</td></tr>\n    <tr><td>Resolvedor corporativo</td><td>DNS interno/AD DNS</td><td>Afeta muitos usuários simultaneamente</td></tr>\n    <tr><td>Resolvedor público</td><td>Serviços recursivos externos</td><td>Ajuda a comparar respostas, mas não substitui autoridade</td></tr>\n    <tr><td>CDN/proxy</td><td>Edge, reverse proxy, WAF</td><td>Pode mascarar mudança de origem ou manter conexão antiga</td></tr>\n  </tbody></table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um resolvedor recebe uma resposta autoritativa com TTL, ele armazena a resposta e começa a contar o tempo restante. Consultas seguintes recebem a resposta em cache com TTL reduzido. Se o TTL original era 300 segundos e já passaram 120 segundos, a próxima resposta em cache pode aparecer com TTL próximo de 180.</p>\n  <ol class='flow-list'>\n    <li>Cliente pede <code>api.empresa.com A</code> ao resolvedor configurado.</li>\n    <li>Resolvedor verifica se possui resposta válida em cache.</li>\n    <li>Se houver cache válido, responde sem consultar a autoridade.</li>\n    <li>Se não houver cache válido, executa resolução recursiva até a autoridade.</li>\n    <li>Servidor autoritativo responde com registro e TTL.</li>\n    <li>Resolvedor armazena a resposta pelo TTL recebido.</li>\n    <li>Cliente usa o IP e segue para ARP, roteamento, TCP/TLS/HTTP conforme o caso.</li>\n  </ol>\n  <p>Cache negativo também existe. Se um nome retorna <code>NXDOMAIN</code>, essa ausência pode ser cacheada por um período controlado pela zona. Por isso, criar um registro depois de uma consulta negativa recente pode não aparecer imediatamente em todos os resolvedores.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura corporativa madura trata TTL como parâmetro de operação. Registros estáveis, como <code>NS</code> e alguns <code>MX</code>, podem ter TTLs mais altos. Registros que apontam para balanceadores, endpoints de migração ou integrações em mudança precisam de TTLs mais baixos durante janelas controladas.</p>\n  <table class='comparison-table'><thead><tr><th>Cenário</th><th>TTL típico</th><th>Vantagem</th><th>Risco</th></tr></thead><tbody>\n    <tr><td>Registro muito estável</td><td>3600 a 86400</td><td>Menos consultas, mais estabilidade</td><td>Mudança emergencial demora</td></tr>\n    <tr><td>Migração planejada</td><td>60 a 300 temporariamente</td><td>Permite corte e rollback mais rápidos</td><td>Mais consultas e dependência do DNS</td></tr>\n    <tr><td>Service discovery interno</td><td>curto e controlado</td><td>Adapta-se a mudanças frequentes</td><td>Falha de DNS impacta rapidamente</td></tr>\n    <tr><td>Registros de e-mail</td><td>moderado a alto</td><td>Evita instabilidade em entrega</td><td>MX/SPF/DMARC errado persiste</td></tr>\n  </tbody></table>\n  <p>Em cloud, DNS pode ser público, privado, associado a VPC/VNet, integrado a private endpoints, balanceadores, service discovery, Kubernetes e pipelines. O mesmo nome pode resolver de formas diferentes dependendo da origem da consulta. Por isso, troubleshooting precisa registrar de onde a consulta foi feita.</p>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma recepção corporativa. A lista oficial de ramais fica na administração. Para não ligar para a administração o tempo todo, cada andar mantém uma cópia temporária da lista. Essa cópia tem uma validade: “use por até 30 minutos”. Se um funcionário muda de ramal, a administração atualiza a lista oficial, mas alguns andares ainda podem usar a cópia antiga até vencer a validade.</p>\n  <p>O TTL é essa validade. O servidor autoritativo é a administração. O resolvedor recursivo é o andar que guarda a cópia. O erro comum é achar que, ao atualizar a lista oficial, todas as cópias temporárias desaparecem imediatamente.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você altera <code>site.exemplo.test</code> de <code>192.0.2.10</code> para <code>192.0.2.20</code>. O registro tinha TTL de 3600 segundos. Um resolvedor consultou o registro cinco minutos antes da mudança. Ele pode continuar respondendo <code>192.0.2.10</code> por aproximadamente 55 minutos.</p>\n  <p>Se você consultar diretamente o servidor autoritativo, talvez veja <code>192.0.2.20</code>. Se consultar o resolvedor corporativo, talvez veja <code>192.0.2.10</code>. As duas respostas podem estar coerentes com o funcionamento do DNS.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa migra <code>portal.empresa.com</code> para um novo WAF. Uma semana antes, reduz o TTL de 3600 para 300. No dia da mudança, altera o registro para o novo destino, valida resposta autoritativa, compara resolvedores internos e externos, monitora logs do WAF antigo e novo e mantém rollback preparado.</p>\n  <p>Sem esse planejamento, parte dos usuários poderia acessar o portal antigo por horas. O time de segurança poderia ver logs divididos entre ambientes. O time de aplicação poderia interpretar isso como problema de sessão, quando na verdade a causa seria cache DNS.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, um nome pode apontar para load balancer público, endpoint privado, zona privada, CDN ou serviço gerenciado. A resposta pode depender da VPC/VNet, do resolvedor configurado e da política de split DNS. Uma VM dentro da rede pode resolver <code>db.empresa.local</code> para IP privado, enquanto um usuário externo recebe NXDOMAIN ou outro destino.</p>\n  <p>Ao diagnosticar cloud, registre região, VPC/VNet, subnet, resolvedor usado, zona associada, route table, security group/NSG, private endpoint e resposta autoritativa. DNS correto fora do contexto errado ainda pode não explicar a falha real.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines frequentemente criam ou alteram registros DNS via Terraform, APIs de cloud, external-dns no Kubernetes ou provedores SaaS. Isso permite automação, mas cria risco: um merge pode trocar um registro de produção, reduzir TTL indevidamente, deixar CNAME órfão ou publicar nome interno em zona pública.</p>\n  <p>Boas práticas incluem revisão por pull request, ambientes separados, policy as code, validação de registros críticos, rollback documentado, TTL adequado por classe de serviço e testes que consultem o servidor autoritativo, não apenas o resolvedor do runner.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>DNS é uma superfície crítica. Cache antigo pode manter clientes apontando para infraestrutura comprometida. Resolvedores externos podem vazar nomes internos. TTLs muito baixos podem amplificar dependência de DNS. TTLs muito altos podem dificultar resposta a incidente. Registros temporários esquecidos podem virar subdomain takeover.</p>\n  <div class='callout callout--security'><strong>Visão defensiva:</strong> em incidentes envolvendo DNS, preserve evidências: horário da consulta, resolvedor usado, origem da rede, tipo de registro, TTL observado, resposta autoritativa, resposta recursiva, logs de alteração e comparação com tráfego real.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 1080 660' role='img' aria-labelledby='m07l05-title m07l05-desc'>\n    <title id='m07l05-title'>TTL e cache DNS em múltiplas camadas</title>\n    <desc id='m07l05-desc'>Diagrama mostrando cliente, cache do sistema, resolvedor corporativo, servidor autoritativo e validação de TTL.</desc>\n    <defs>\n      <marker id='m07l05-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto' markerUnits='strokeWidth'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='45' y='70' width='220' height='110' rx='16' class='svg-node svg-node--client'></rect>\n    <text x='155' y='108' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='155' y='136' text-anchor='middle' class='svg-label svg-label--small'>navegador/app</text>\n\n    <rect x='320' y='70' width='220' height='110' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='430' y='108' text-anchor='middle' class='svg-label'>Cache local</text>\n    <text x='430' y='136' text-anchor='middle' class='svg-label svg-label--small'>SO / runtime</text>\n\n    <rect x='595' y='70' width='220' height='110' rx='16' class='svg-node svg-node--switch'></rect>\n    <text x='705' y='108' text-anchor='middle' class='svg-label'>Resolvedor recursivo</text>\n    <text x='705' y='136' text-anchor='middle' class='svg-label svg-label--small'>cache compartilhado</text>\n\n    <rect x='870' y='70' width='170' height='110' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='955' y='108' text-anchor='middle' class='svg-label'>Autoritativo</text>\n    <text x='955' y='136' text-anchor='middle' class='svg-label svg-label--small'>fonte oficial</text>\n\n    <line x1='265' y1='125' x2='320' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l05-arrow)'></line>\n    <line x1='540' y1='125' x2='595' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l05-arrow)'></line>\n    <line x1='815' y1='125' x2='870' y2='125' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l05-arrow)'></line>\n\n    <rect x='80' y='270' width='920' height='95' rx='18' class='svg-zone'></rect>\n    <text x='540' y='305' text-anchor='middle' class='svg-label'>Resposta: api.empresa.com A 203.0.113.50 TTL 300</text>\n    <text x='540' y='335' text-anchor='middle' class='svg-label svg-label--small'>O resolvedor pode reutilizar a resposta até o TTL vencer; respostas em cache mostram TTL decrescente.</text>\n\n    <rect x='95' y='440' width='250' height='105' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='220' y='477' text-anchor='middle' class='svg-label'>Pergunta 1</text>\n    <text x='220' y='505' text-anchor='middle' class='svg-label svg-label--small'>Quem respondeu?</text>\n\n    <rect x='415' y='440' width='250' height='105' rx='16' class='svg-node svg-node--firewall'></rect>\n    <text x='540' y='477' text-anchor='middle' class='svg-label'>Pergunta 2</text>\n    <text x='540' y='505' text-anchor='middle' class='svg-label svg-label--small'>Qual TTL restou?</text>\n\n    <rect x='735' y='440' width='250' height='105' rx='16' class='svg-node svg-node--router'></rect>\n    <text x='860' y='477' text-anchor='middle' class='svg-label'>Pergunta 3</text>\n    <text x='860' y='505' text-anchor='middle' class='svg-label svg-label--small'>Autoridade confirma?</text>\n\n    <line x1='220' y1='440' x2='220' y2='365' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l05-arrow)'></line>\n    <line x1='540' y1='440' x2='540' y2='365' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l05-arrow)'></line>\n    <line x1='860' y1='440' x2='860' y2='365' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l05-arrow)'></line>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai comparar respostas DNS entre cache local, resolvedor recursivo e servidor autoritativo. O objetivo é aprender a identificar se uma resposta está antiga por cache, se a autoridade já mudou e se a falha realmente pertence ao DNS.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de TTL, interpretação de respostas divergentes, planejamento de mudança DNS e separação entre falha de nome, conectividade, porta e aplicação.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário de migração de aplicação com usuários vendo IPs diferentes. Sua missão será montar uma investigação, explicar a causa provável, propor correção e desenhar um plano de mudança com rollback.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como comparar autoritativo e recursivo, interpretar TTL restante, identificar cache antigo, evitar limpeza indiscriminada e validar se a aplicação funciona no novo destino.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>TTL define por quanto tempo uma resposta DNS pode ser cacheada. Cache melhora performance e escala, mas torna mudanças não instantâneas para quem já recebeu a resposta anterior. Troubleshooting profissional exige comparar cliente, resolvedor, autoridade e contexto da aplicação.</p>\n  <p>Uma mudança DNS segura começa antes do corte: reduzir TTL com antecedência, validar autoridade, planejar rollback, monitorar destinos antigo e novo e documentar evidências.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará DHCP em profundidade e sua integração com DNS. Depois de entender nomes e cache, vamos analisar como hosts recebem IP, gateway, DNS e como registros podem ser atualizados dinamicamente.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Serviços de rede",
      "DNS",
      "Troubleshooting"
    ],
    "dependsOn": [
      "DNS hierárquico",
      "Registros DNS",
      "Roteamento IPv4",
      "ICMP",
      "TCP/TLS/HTTP"
    ],
    "realWorldImpact": "TTL e cache DNS afetam migrações, disponibilidade, rollback, incidentes, troubleshooting, resposta a incidentes e segurança de aplicações corporativas."
  },
  "protocolFields": [
    {
      "field": "Name",
      "meaning": "Nome consultado",
      "example": "api.empresa.com"
    },
    {
      "field": "Type",
      "meaning": "Tipo do registro consultado",
      "example": "A, AAAA, CNAME, MX, TXT"
    },
    {
      "field": "TTL",
      "meaning": "Tempo restante ou original de cache da resposta",
      "example": "300"
    },
    {
      "field": "RDATA",
      "meaning": "Valor da resposta",
      "example": "203.0.113.50"
    },
    {
      "field": "AA flag",
      "meaning": "Indica resposta autoritativa em algumas consultas",
      "example": "aa"
    },
    {
      "field": "RCODE",
      "meaning": "Código de resultado DNS",
      "example": "NOERROR, NXDOMAIN, SERVFAIL"
    },
    {
      "field": "Authority section",
      "meaning": "Informações sobre autoridade ou negativa",
      "example": "SOA em resposta negativa"
    }
  ],
  "packetFlow": [
    "Aplicação solicita resolução de um nome e tipo de registro.",
    "Cliente verifica caches locais ou envia consulta ao resolvedor configurado.",
    "Resolvedor verifica se possui resposta ainda válida pelo TTL.",
    "Se houver cache válido, responde com TTL restante.",
    "Se não houver cache válido, consulta a hierarquia até a autoridade.",
    "Autoritativo responde com registro, TTL ou erro.",
    "Resolvedor armazena a resposta e devolve ao cliente.",
    "Cliente usa a resposta para iniciar conectividade IP, TCP, TLS e aplicação."
  ],
  "deepDive": {
    "title": "Propagação DNS é um termo impreciso",
    "points": [
      "A autoridade pode mudar imediatamente, mas caches existentes continuam válidos até o TTL vencer.",
      "Consultar o autoritativo mostra a verdade atual da zona; consultar recursivos mostra o que clientes podem estar vendo.",
      "Limpar cache local não limpa cache corporativo, de provedor, aplicação, CDN ou biblioteca.",
      "Alguns sistemas respeitam TTL; outros possuem cache próprio ou conexões persistentes que confundem o diagnóstico.",
      "NXDOMAIN também pode ser cacheado, o que afeta criação de nomes novos."
    ]
  },
  "commonMistakes": [
    "Dizer que DNS ainda não propagou sem verificar autoridade e TTL.",
    "Consultar apenas um resolvedor e assumir que todos os clientes veem a mesma resposta.",
    "Limpar cache local e concluir que o problema foi resolvido para toda a empresa.",
    "Reduzir TTL somente no momento da mudança, quando caches antigos já foram populados com TTL alto.",
    "Confundir resposta DNS correta com aplicação funcionando.",
    "Ignorar cache negativo ao criar registros novos."
  ],
  "troubleshooting": {
    "method": "Compare autoridade, recursivos e cliente; depois separe DNS de rota, porta, TLS e aplicação.",
    "steps": [
      "Identifique nome, tipo de registro, origem da consulta e resolvedor usado.",
      "Consulte o resolvedor configurado pelo cliente e registre resposta e TTL.",
      "Consulte um resolvedor alternativo controlado para comparação.",
      "Consulte diretamente o servidor autoritativo da zona.",
      "Compare valor esperado, valor observado e TTL restante.",
      "Verifique cache local do sistema operacional e da aplicação quando aplicável.",
      "Valide conectividade ao IP retornado com ping, traceroute, teste de porta e TLS/HTTP.",
      "Documente horário, origem, resolvedor, resposta, TTL, tipo de registro e evidências."
    ],
    "commands": [
      {
        "windows": [
          "nslookup api.empresa.com",
          "nslookup -type=A api.empresa.com 8.8.8.8",
          "Resolve-DnsName api.empresa.com -Type A",
          "Resolve-DnsName api.empresa.com -Type A -Server 1.1.1.1",
          "ipconfig /displaydns",
          "ipconfig /flushdns",
          "Test-NetConnection api.empresa.com -Port 443"
        ],
        "linux": [
          "dig A api.empresa.com",
          "dig A api.empresa.com @1.1.1.1",
          "dig A api.empresa.com @ns1.autoritativo.exemplo",
          "dig +trace api.empresa.com",
          "resolvectl query api.empresa.com",
          "sudo resolvectl flush-caches",
          "curl -vk https://api.empresa.com"
        ],
        "cisco": [
          "show hosts",
          "show running-config | include name-server",
          "ping api.empresa.com",
          "traceroute api.empresa.com"
        ],
        "cloud": [
          "validar zona pública versus zona privada",
          "confirmar associação da private hosted zone/private DNS zone à VPC/VNet correta",
          "comparar consulta de uma VM dentro e fora da rede",
          "auditar alteração DNS em logs de controle e IaC"
        ]
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a TTL, cache DNS e troubleshooting de nomes.",
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
    "goodPractices": [
      "Definir política de TTL por criticidade e volatilidade do registro.",
      "Reduzir TTL antes de migrações planejadas, não apenas no momento do corte.",
      "Comparar resposta autoritativa e recursiva durante incidentes.",
      "Registrar evidências de resolvedor, origem e TTL em tickets de mudança/incidente.",
      "Bloquear resolvedores externos não autorizados quando houver DNS interno sensível.",
      "Monitorar alterações em registros críticos e integrar logs ao SIEM."
    ],
    "badPractices": [
      "Usar TTL muito baixo em tudo sem avaliar custo e resiliência.",
      "Usar TTL muito alto em registros que exigem rollback rápido.",
      "Permitir que pipelines mudem DNS de produção sem revisão.",
      "Publicar nomes internos em DNS público por erro de automação.",
      "Apagar registros durante incidente sem preservar evidências."
    ],
    "vulnerabilities": [
      {
        "name": "DNS cache poisoning",
        "description": "Risco relacionado à aula 7.5 — TTL, cache DNS e troubleshooting de nomes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DNSSEC quando aplicável e bem operado."
      },
      {
        "name": "DNS hijacking",
        "description": "Risco relacionado à aula 7.5 — TTL, cache DNS e troubleshooting de nomes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Controle de resolvedores permitidos."
      },
      {
        "name": "Exfiltração por DNS",
        "description": "Risco relacionado à aula 7.5 — TTL, cache DNS e troubleshooting de nomes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Auditoria de zonas públicas e privadas."
      },
      {
        "name": "Vazamento de nomes internos",
        "description": "Risco relacionado à aula 7.5 — TTL, cache DNS e troubleshooting de nomes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de IaC e alterações DNS críticas."
      },
      {
        "name": "Subdomain takeover por registro órfão",
        "description": "Risco relacionado à aula 7.5 — TTL, cache DNS e troubleshooting de nomes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Política de TTL e runbook de mudança."
      },
      {
        "name": "Bypass de controles internos por resolvedor externo",
        "description": "Risco relacionado à aula 7.5 — TTL, cache DNS e troubleshooting de nomes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs de consulta DNS, detecção de anomalias e resposta a incidente."
      }
    ],
    "mitigations": [
      "DNSSEC quando aplicável e bem operado.",
      "Controle de resolvedores permitidos.",
      "Auditoria de zonas públicas e privadas.",
      "Revisão de IaC e alterações DNS críticas.",
      "Política de TTL e runbook de mudança.",
      "Logs de consulta DNS, detecção de anomalias e resposta a incidente."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "DNSSEC quando aplicável e bem operado.",
      "Controle de resolvedores permitidos.",
      "Auditoria de zonas públicas e privadas.",
      "Revisão de IaC e alterações DNS críticas.",
      "Política de TTL e runbook de mudança.",
      "Logs de consulta DNS, detecção de anomalias e resposta a incidente."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-7.5",
    "title": "Investigando TTL, cache DNS e respostas divergentes",
    "labType": "cloud",
    "objective": "Comparar respostas DNS em resolvedor local, resolvedor recursivo e servidor autoritativo para diferenciar cache antigo, autoridade atual e falhas fora do DNS.",
    "scenario": "Laboratório Neste laboratório você vai comparar respostas DNS entre cache local, resolvedor recursivo e servidor autoritativo. O objetivo é aprender a identificar se uma resposta está antiga por cache, se a autoridade já mudou e se a falha realmente pertence ao DNS.",
    "topology": "Um cliente Windows ou Linux, seu resolvedor configurado, um resolvedor público/controlado e, quando possível, o servidor autoritativo da zona consultada.",
    "architecture": "Cliente → cache local → resolvedor recursivo → hierarquia DNS → servidor autoritativo. Depois da resposta, validar IP, rota, porta e aplicação.",
    "prerequisites": [
      "Windows com PowerShell ou Linux com dig/resolvectl.",
      "Acesso à Internet ou laboratório com servidor DNS interno.",
      "Permissão para consultar nomes públicos ou domínio de laboratório.",
      "Não consultar, enumerar ou testar domínios de terceiros de forma abusiva."
    ],
    "tools": [
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não execute enumeração agressiva de domínios de terceiros.",
      "Não exponha nomes internos em prints compartilhados publicamente.",
      "Sanitize IPs públicos, domínios internos e detalhes de infraestrutura em relatórios.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar resolvedor configurado",
        "instruction": "Identifique quais servidores DNS o cliente usa.",
        "command": "Windows: ipconfig /all\nLinux: resolvectl status ou cat /etc/resolv.conf",
        "expectedOutput": "Você sabe qual resolvedor receberá consultas padrão do host.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TTL, cache DNS e troubleshooting de nomes” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Consultar o registro pelo resolvedor padrão",
        "instruction": "Consulte um nome e registre resposta, tipo e TTL.",
        "command": "Windows: Resolve-DnsName exemplo.com -Type A\nLinux: dig A exemplo.com",
        "expectedOutput": "Você obtém resposta e TTL observado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TTL, cache DNS e troubleshooting de nomes” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Consultar resolvedor alternativo",
        "instruction": "Compare com outro resolvedor para detectar divergência de cache.",
        "command": "Windows: Resolve-DnsName exemplo.com -Type A -Server 1.1.1.1\nLinux: dig A exemplo.com @1.1.1.1",
        "expectedOutput": "Você observa se a resposta e o TTL são iguais ou diferentes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TTL, cache DNS e troubleshooting de nomes” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Consultar autoridade",
        "instruction": "Identifique NS e consulte diretamente um servidor autoritativo quando possível.",
        "command": "dig NS exemplo.com\ndig A exemplo.com @ns-autoritativo",
        "expectedOutput": "Você diferencia resposta oficial atual de resposta cacheada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TTL, cache DNS e troubleshooting de nomes” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Verificar cache local",
        "instruction": "Observe ou limpe cache local somente em ambiente controlado.",
        "command": "Windows: ipconfig /displaydns\nWindows: ipconfig /flushdns\nLinux: resolvectl statistics\nLinux: sudo resolvectl flush-caches",
        "expectedOutput": "Você entende que limpar cache local não limpa caches recursivos externos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TTL, cache DNS e troubleshooting de nomes” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Separar DNS de conectividade",
        "instruction": "Teste o IP retornado, a porta e a aplicação.",
        "command": "ping <ip-retornado>\ntraceroute <ip-retornado> ou tracert <ip-retornado>\nTest-NetConnection nome -Port 443\ncurl -vk https://nome",
        "expectedOutput": "Você distingue falha de nome de falha de rota, firewall, TLS ou aplicação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TTL, cache DNS e troubleshooting de nomes” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Montar relatório",
        "instruction": "Documente nome, tipo, origem, resolvedor, resposta, TTL, autoridade, testes de porta e conclusão.",
        "command": "preencher tabela de evidências",
        "expectedOutput": "Você produz um diagnóstico auditável e reproduzível.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “TTL, cache DNS e troubleshooting de nomes” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “TTL, cache DNS e troubleshooting de nomes”.",
    "validation": [
      {
        "check": "Consulta padrão registrada com TTL.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Consulta padrão registrada com TTL.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Consulta em resolvedor alternativo comparada.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Consulta em resolvedor alternativo comparada.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Autoridade identificada com NS ou +trace.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Autoridade identificada com NS ou +trace.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Diferença entre DNS e conectividade validada com teste de porta/aplicação.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Diferença entre DNS e conectividade validada com teste de porta/aplicação.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Relatório contém evidências suficientes para troubleshooting profissional.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Relatório contém evidências suficientes para troubleshooting profissional.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se dig não existir no Windows, use Resolve-DnsName ou nslookup.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se a consulta ao autoritativo falhar, verifique se o servidor aceita consultas públicas para o tipo desejado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se respostas variam, registre origem da rede, VPN, DNS interno e split DNS.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se DNS resolve corretamente mas aplicação falha, avance para rota, firewall, TLS e aplicação.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Criar uma planilha de política de TTL por tipo de registro.",
      "Automatizar validação de registros críticos no pipeline.",
      "Adicionar monitoramento de mudança DNS e alertas de divergência.",
      "Simular migração reduzindo TTL com antecedência e validando rollback."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “TTL, cache DNS e troubleshooting de nomes” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Migração com respostas DNS divergentes",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedOutcome": "Ao final, você consegue explicar por que dois clientes podem receber respostas DNS diferentes sem que a zona autoritativa esteja necessariamente errada."
  },
  "mentorQuestions": [
    "Se o autoritativo mostra IP novo, mas o usuário vê IP antigo, quais hipóteses você testaria antes de chamar isso de erro?",
    "Por que reduzir TTL no minuto da mudança pode não ajudar clientes que já receberam a resposta antiga?",
    "Como você provaria que a falha é de TLS ou aplicação, e não de DNS?"
  ],
  "quiz": [
    {
      "question": "O que TTL controla em uma resposta DNS?",
      "options": [
        "O número máximo de roteadores no caminho",
        "O tempo pelo qual a resposta pode ser cacheada",
        "A porta usada pelo DNS",
        "A prioridade de MX"
      ],
      "answer": 1,
      "explanation": "TTL indica por quanto tempo uma resposta DNS pode ser mantida em cache."
    },
    {
      "question": "Qual consulta ajuda a comparar a verdade atual da zona com respostas em cache?",
      "options": [
        "Consultar apenas o navegador",
        "Consultar diretamente o servidor autoritativo",
        "Executar ping sem resolver nome",
        "Trocar a máscara IPv4"
      ],
      "answer": 1,
      "explanation": "O autoritativo é a fonte oficial da zona naquele momento."
    },
    {
      "question": "Por que dois usuários podem resolver o mesmo nome para IPs diferentes durante uma migração?",
      "options": [
        "Porque Ethernet troca IPs",
        "Porque caches diferentes podem ter respostas válidas diferentes",
        "Porque ARP altera DNS",
        "Porque TTL é métrica de roteamento"
      ],
      "answer": 1,
      "explanation": "Resolvedores diferentes podem ter consultado em momentos diferentes e ainda respeitar TTLs válidos."
    },
    {
      "question": "O que é cache negativo?",
      "options": [
        "Cache de resposta NXDOMAIN ou ausência",
        "Cache de rotas inválidas",
        "Cache de pacotes TCP perdidos",
        "Cache de senhas DNS"
      ],
      "answer": 0,
      "explanation": "Respostas negativas, como NXDOMAIN, também podem ser armazenadas temporariamente."
    },
    {
      "question": "Qual prática é melhor antes de uma migração DNS planejada?",
      "options": [
        "Aumentar TTL durante o corte",
        "Reduzir TTL com antecedência",
        "Apagar a zona",
        "Usar 0.0.0.0/0 no DNS"
      ],
      "answer": 1,
      "explanation": "Reduzir TTL antes permite que caches antigos expirem antes da janela de mudança."
    },
    {
      "question": "DNS resolveu corretamente, mas HTTPS falha. Qual próximo teste faz sentido?",
      "options": [
        "Assumir propagação DNS",
        "Validar porta, TLS e aplicação",
        "Trocar o registro MX",
        "Limpar ARP de todos os switches"
      ],
      "answer": 1,
      "explanation": "Depois de DNS, é preciso validar conectividade, porta, certificado/TLS e comportamento da aplicação."
    }
  ],
  "flashcards": [
    {
      "front": "O que é TTL no DNS?",
      "back": "Tempo pelo qual uma resposta DNS pode ser armazenada em cache."
    },
    {
      "front": "Autoritativo versus recursivo",
      "back": "Autoritativo é a fonte oficial da zona; recursivo busca respostas e pode armazená-las em cache."
    },
    {
      "front": "O que é cache negativo?",
      "back": "Armazenamento temporário de respostas como NXDOMAIN ou ausência de registro."
    },
    {
      "front": "Por que limpar cache local não resolve tudo?",
      "back": "Porque caches também podem existir em resolvedores corporativos, provedores, aplicações e CDNs."
    },
    {
      "front": "Quando usar TTL baixo?",
      "back": "Em mudanças planejadas, registros voláteis ou cenários que exigem rollback rápido, avaliando custo e dependência."
    },
    {
      "front": "Como separar DNS de aplicação?",
      "back": "Depois de resolver o nome, testar IP, rota, porta, TLS e resposta da aplicação."
    }
  ],
  "exercises": [
    {
      "id": "ex-7.5-1",
      "title": "Interpretar TTL restante",
      "prompt": "Um registro tem TTL autoritativo 600. Um resolvedor responde com TTL 120. O que isso sugere?",
      "expectedAnswer": "Que a resposta está em cache e restam cerca de 120 segundos antes de expirar naquele resolvedor."
    },
    {
      "id": "ex-7.5-2",
      "title": "Planejar mudança",
      "prompt": "Você precisa migrar app.empresa.com amanhã. Hoje o TTL é 3600. O que fazer antes da janela?",
      "expectedAnswer": "Reduzir TTL com antecedência, esperar caches com TTL antigo expirarem, validar autoridade, preparar rollback e monitorar destino antigo e novo."
    },
    {
      "id": "ex-7.5-3",
      "title": "Comparar respostas",
      "prompt": "Resolvedor interno retorna IP antigo; autoritativo retorna IP novo. Cite duas hipóteses.",
      "expectedAnswer": "Cache interno ainda válido; resolvedor interno encaminhando para outro forwarder com cache; split DNS ou zona interna divergente."
    },
    {
      "id": "ex-7.5-4",
      "title": "Separar DNS de porta",
      "prompt": "DNS resolve para o IP correto, mas usuários não acessam HTTPS. Quais testes próximos?",
      "expectedAnswer": "Testar rota/traceroute, TCP 443, TLS/certificado, resposta HTTP, firewall/WAF, logs do servidor e balanceador."
    }
  ],
  "challenge": {
    "title": "Migração com respostas DNS divergentes",
    "scenario": "Uma empresa migrou portal.empresa.com de 198.51.100.10 para 203.0.113.20. O autoritativo mostra o IP novo com TTL 300. Usuários internos ainda acessam o IP antigo. Usuários externos já acessam o novo. O time quer limpar cache em todos os computadores imediatamente.",
    "tasks": [
      "Montar hipóteses prováveis.",
      "Definir consultas para confirmar autoridade, cache interno e resposta do cliente.",
      "Separar DNS de conectividade e aplicação.",
      "Propor plano seguro de correção sem apagar evidências.",
      "Definir como evitar o problema em mudanças futuras."
    ],
    "rubric": [
      "Identifica cache interno como hipótese forte.",
      "Compara autoritativo, resolvedor interno e cliente.",
      "Registra TTL e origem das consultas.",
      "Valida conectividade ao IP novo e antigo.",
      "Propõe redução de TTL prévia, rollback e runbook para futuras mudanças."
    ]
  },
  "commentedSolution": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A hipótese mais provável é cache no resolvedor interno ou divergência de zona interna. O primeiro passo não é limpar tudo, mas coletar evidências: consultar <code>portal.empresa.com</code> no cliente, no resolvedor interno, em um resolvedor externo controlado e diretamente no autoritativo. Para cada consulta, registrar IP retornado, TTL e horário.</p>\n  <p>Se o autoritativo mostra <code>203.0.113.20</code> e o resolvedor interno mostra <code>198.51.100.10</code> com TTL restante, o resolvedor interno está servindo cache ainda válido. Se o TTL não reduz ou a resposta difere sem motivo, pode haver forwarder intermediário, zona interna divergente ou split DNS. Depois, testar acesso ao IP novo diretamente, porta 443, certificado e logs do balanceador/WAF.</p>\n  <p>A correção depende da causa. Em ambiente controlado, pode-se limpar cache do resolvedor interno, mas isso deve ser feito com mudança registrada. Para evitar repetição, reduzir TTL com antecedência, aguardar o TTL antigo expirar antes do corte, manter destino antigo disponível durante transição e criar checklist de validação autoritativa/recursiva.</p>\n</section>\n",
  "glossary": [
    {
      "term": "TTL",
      "definition": "Tempo pelo qual uma resposta DNS pode permanecer em cache."
    },
    {
      "term": "Cache DNS",
      "definition": "Armazenamento temporário de respostas DNS para reduzir latência e carga."
    },
    {
      "term": "Resolvedor recursivo",
      "definition": "Servidor que busca respostas DNS em nome do cliente e pode armazená-las em cache."
    },
    {
      "term": "Servidor autoritativo",
      "definition": "Servidor que possui autoridade sobre uma zona DNS e publica a resposta oficial."
    },
    {
      "term": "Cache negativo",
      "definition": "Cache de respostas de ausência, como NXDOMAIN."
    },
    {
      "term": "Split DNS",
      "definition": "Estratégia em que o mesmo nome pode ter respostas diferentes dependendo da origem ou visão DNS."
    }
  ],
  "references": [
    {
      "title": "RFC 1034 — Domain Names: Concepts and Facilities",
      "type": "standard"
    },
    {
      "title": "RFC 1035 — Domain Names: Implementation and Specification",
      "type": "standard"
    },
    {
      "title": "RFC 2308 — Negative Caching of DNS Queries",
      "type": "standard"
    },
    {
      "title": "Cisco — DNS troubleshooting and name resolution concepts",
      "type": "vendor-doc"
    },
    {
      "title": "Microsoft — DNS client and Resolve-DnsName documentation",
      "type": "vendor-doc"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "Módulo 4",
      "lesson": "4.8",
      "reason": "ICMP, ping e traceroute ajudam a separar DNS de conectividade."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 6",
      "lesson": "6.9",
      "reason": "Troubleshooting de roteamento complementa diagnóstico de nomes."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e IaC",
      "reason": "Mudanças DNS automatizadas devem passar por revisão, validação e rollback."
    },
    {
      "course": "Enterprise Identity IAM Segurança e Acessos",
      "module": "Identidade corporativa",
      "reason": "Serviços de identidade dependem fortemente de DNS, tempo e certificados."
    }
  ],
  "progressRules": {
    "completeAfter": [
      "quiz",
      "lab",
      "challenge"
    ],
    "minimumQuizScore": 70,
    "requiredArtifacts": [
      "Tabela de evidências DNS",
      "Comparação autoritativo versus recursivo",
      "Plano de TTL para mudança"
    ],
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
      "7.6"
    ]
  }
};
