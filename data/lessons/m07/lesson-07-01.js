export const lesson0701 = {
  "id": "7.1",
  "moduleId": "m07",
  "order": 1,
  "title": "Por que DNS existe",
  "subtitle": "Entenda por que redes precisam transformar nomes humanos em endereços IP, como DNS sustenta Internet, empresas, cloud, DevSecOps e segurança, e por que resolução de nomes é uma dependência crítica.",
  "duration": "105-150 min",
  "estimatedStudyTimeMinutes": 150,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 245,
  "tags": [
    "redes",
    "dns",
    "serviços de rede",
    "resolução de nomes",
    "ipv4",
    "tcp/ip",
    "cloud",
    "devsecops",
    "segurança",
    "troubleshooting",
    "observabilidade"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "title": "Por que o IPv4 existe",
      "reason": "DNS normalmente entrega endereços IP como resultado de uma consulta de nomes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "A consulta DNS e a conexão ao destino dependem de gateway e caminho IP até servidores de resolução ou destinos finais."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.8",
      "title": "ICMP, ping, TTL e traceroute",
      "reason": "Ajuda a diferenciar falha de resolução de nomes de falha de conectividade IP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.8",
      "title": "Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark",
      "reason": "Fornece método de diagnóstico para separar nome, porta, firewall e aplicação quando DNS não é o único suspeito."
    }
  ],
  "objectives": [
    "Explicar por que DNS existe e qual problema ele resolve em redes IP.",
    "Diferenciar nome, endereço IP, serviço, porta, rota e aplicação.",
    "Descrever o fluxo básico de resolução de nomes de um cliente até um resolvedor DNS.",
    "Entender por que DNS é crítico para login, web, e-mail, APIs, cloud, pipelines e segurança.",
    "Reconhecer sintomas de falha de DNS e separá-los de falhas de rede ou aplicação.",
    "Identificar riscos defensivos como DNS spoofing, cache poisoning, domínio malicioso, exfiltração por DNS e dependência excessiva de resolvedores externos."
  ],
  "learningOutcomes": [
    "Explicar DNS como sistema distribuído de nomes para endereços e metadados de serviços.",
    "Diagnosticar se uma falha é de DNS, IP, rota, firewall, TLS ou aplicação.",
    "Justificar por que ambientes corporativos precisam de política, logging e governança de DNS.",
    "Relacionar DNS com cloud, DevSecOps, IAM, certificados, e-mail, service discovery e segurança defensiva."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Até aqui você aprendeu que computadores se comunicam usando endereços IP, máscaras, gateways, rotas, ARP, ICMP e protocolos de transporte. Mas pessoas e aplicações não querem depender de números como <code>10.40.20.15</code> ou <code>172.16.8.30</code>. Elas querem usar nomes como <code>intranet.empresa.local</code>, <code>api.pagamentos.empresa.com</code> ou <code>gitlab.interno</code>.</p><p>DNS existe porque endereços IP são bons para máquinas e ruins para operação humana e arquiteturas distribuídas. Ele permite trocar infraestrutura sem trocar o nome usado pelos usuários, mover serviços para cloud, balancear acesso, publicar e-mail, validar domínios, emitir certificados, descobrir serviços e registrar eventos de segurança.</p><div class='callout'><strong>Ideia central:</strong> DNS é o sistema de nomes das redes IP. Sem DNS, Internet, cloud e aplicações corporativas modernas seriam tecnicamente possíveis, mas impraticáveis de operar em escala.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No início das redes, quando havia poucos computadores, era possível manter arquivos locais com associações entre nomes e endereços. Um arquivo como <code>hosts</code> dizia que determinado nome correspondia a determinado IP. Isso funcionava em ambientes pequenos, quase como uma agenda telefônica manual.</p><p>Com o crescimento da ARPANET e depois da Internet, manter uma lista centralizada ou arquivos copiados manualmente se tornou inviável. Cada novo host, renomeação, mudança de IP ou remoção exigiria sincronização. O DNS surgiu como uma solução distribuída, hierárquica e delegável.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema que DNS resolve não é apenas decorar nomes. O problema real é operar sistemas distribuídos em que endereços mudam, serviços migram, ambientes escalam, provedores são substituídos e equipes diferentes controlam partes diferentes do namespace.</p><p>Se todos os usuários, scripts, integrações, certificados e regras apontassem diretamente para IPs, cada mudança de servidor exigiria alteração em muitos pontos. Em centenas de aplicações, múltiplas clouds, filiais, VPNs e pipelines, isso criaria uma operação frágil.</p><div class='callout callout--problem'><strong>Problema operacional:</strong> IP identifica onde enviar pacotes. Nome identifica o que a pessoa ou aplicação quer acessar. DNS faz a ponte entre intenção humana/aplicacional e endereçamento de rede.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A evolução natural foi sair de arquivos estáticos para um sistema distribuído. Primeiro, redes pequenas usavam tabelas locais. Depois, a escala exigiu delegação: uma organização administra seus próprios nomes, outra administra outro domínio, e servidores especializados respondem por zonas específicas.</p><p>Com o tempo, DNS deixou de ser apenas nome para IP. Ele passou a carregar registros de e-mail, aliases, validações, ponteiros reversos, service discovery, políticas de e-mail, integração com certificados, balanceamento, descoberta de controladores de domínio, endpoints privados em cloud e metadados operacionais.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>DNS</strong>, ou <em>Domain Name System</em>, é um sistema distribuído e hierárquico usado para traduzir nomes em informações úteis para comunicação de rede. A tradução mais conhecida é nome para endereço IP, como um registro <code>A</code> apontando para IPv4 ou <code>AAAA</code> apontando para IPv6.</p><p>DNS também informa quais servidores recebem e-mail de um domínio, quais servidores são autoritativos por uma zona, quais aliases apontam para nomes canônicos, quais textos validam posse de domínio e quais serviços existem em determinada infraestrutura.</p><div class='definition-box'>DNS é uma base distribuída de informações de nomes. Ele responde perguntas como: qual IP corresponde a este nome, quem recebe e-mail deste domínio e qual servidor é autoritativo por esta zona.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando você acessa <code>www.exemplo.com</code>, a aplicação pergunta ao sistema operacional qual endereço usar. O sistema verifica cache local e, se não tiver resposta válida, pergunta ao resolvedor DNS configurado. Esse resolvedor pode estar no roteador, no provedor, na empresa, em um servidor interno ou em um serviço público.</p><ol class='flow-list'><li>Usuário ou aplicação solicita um nome.</li><li>O sistema operacional verifica cache e arquivo hosts.</li><li>O cliente consulta um resolvedor DNS.</li><li>O resolvedor usa cache ou consulta a hierarquia DNS.</li><li>O resolvedor retorna uma resposta, como um endereço IPv4.</li><li>A aplicação usa o IP retornado para iniciar a conexão real.</li></ol><div class='callout callout--warning'><strong>Ponto importante:</strong> resolver DNS não é o mesmo que conectar na aplicação. DNS pode resolver corretamente e a aplicação ainda falhar por rota, firewall, TLS, porta fechada, proxy, autenticação ou erro do serviço.</div>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04c-7-1-dns-decision-tree'>\n  <h4>DNS não é conectividade: a árvore mínima de decisão</h4>\n  <p>Um diagnóstico DNS maduro separa quatro perguntas. Primeiro: o cliente tem um resolvedor configurado? Segundo: o resolvedor responde? Terceiro: o nome retorna o registro esperado? Quarto: o IP retornado realmente aceita a conexão da aplicação? Muitos incidentes são alongados porque a equipe pula direto para DNS quando o problema é rota, firewall, TLS, proxy ou aplicação.</p>\n  <ol class='flow-list'>\n    <li>Verifique configuração local: DNS, search suffix, VPN, split DNS e arquivo hosts.</li>\n    <li>Consulte o resolvedor padrão e um resolvedor explicitamente escolhido.</li>\n    <li>Compare nome, tipo de registro, TTL e resposta.</li>\n    <li>Teste conectividade IP e porta com o endereço retornado.</li>\n    <li>Valide logs de DNS e logs de aplicação antes de concluir.</li>\n  </ol>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>A arquitetura DNS pode ser entendida em papéis: cliente DNS, resolvedor recursivo, servidor autoritativo, zona e registros. O cliente faz a pergunta; o resolvedor busca a resposta; o autoritativo responde oficialmente por uma zona.</p><table class='data-table'><thead><tr><th>Componente</th><th>Função</th><th>Exemplo</th></tr></thead><tbody><tr><td>Cliente DNS</td><td>Origina a consulta</td><td>Notebook, servidor, container, pipeline</td></tr><tr><td>Resolvedor recursivo</td><td>Busca a resposta</td><td>DNS corporativo, roteador, provedor</td></tr><tr><td>Servidor autoritativo</td><td>Fonte oficial da zona</td><td>Servidor que responde por <code>empresa.com</code></td></tr><tr><td>Zona</td><td>Conjunto administrável de registros</td><td><code>empresa.com</code>, <code>corp.local</code></td></tr><tr><td>Registro</td><td>Informação publicada</td><td><code>A</code>, <code>MX</code>, <code>TXT</code>, <code>NS</code></td></tr></tbody></table>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04c-7-1-dns-enterprise-path'>\n  <h4>DNS corporativo, split DNS e dependência operacional</h4>\n  <p>Em empresas, o mesmo nome pode ter respostas diferentes dependendo de onde o cliente está: rede interna, VPN, filial, VDI, cloud ou Internet. Isso é útil, mas cria risco. Um notebook fora da VPN pode resolver um endpoint público; dentro da VPN pode resolver um IP privado. Um pipeline pode usar DNS privado em uma VNet/VPC. Um serviço pode depender de CNAME para balanceador. Cada decisão precisa estar documentada.</p>\n  <table class='data-table'>\n    <thead><tr><th>Cenário</th><th>Resposta esperada</th><th>Falha comum</th><th>Evidência</th></tr></thead>\n    <tbody>\n      <tr><td>Dentro da VPN</td><td>IP privado</td><td>DNS público usado por engano</td><td><code>Resolve-DnsName</code> e interface VPN</td></tr>\n      <tr><td>Internet</td><td>IP público ou NXDOMAIN</td><td>registro interno vazando publicamente</td><td>consulta por resolvedor externo</td></tr>\n      <tr><td>Pipeline</td><td>endpoint privado ou service discovery</td><td>runner sem acesso ao DNS privado</td><td>logs do job e consulta DNS</td></tr>\n      <tr><td>Cloud híbrida</td><td>forwarder/conditional resolver</td><td>loop ou zona privada errada</td><td>logs do resolver e rota</td></tr>\n    </tbody>\n  </table>\n</div>",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense no DNS como uma recepção corporativa combinada com uma agenda de ramais. Você não precisa saber a sala exata de cada pessoa; pergunta pelo nome do departamento e recebe uma orientação atualizada. Se o departamento mudou de andar, o nome continua o mesmo e a recepção informa o novo local.</p><p>A analogia tem limite: DNS não é uma autoridade de identidade forte por si só. Ele informa dados publicados por zonas e caches. Segurança de identidade, criptografia e autorização dependem de TLS, certificados, IAM, MFA, políticas de acesso e validações de origem.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você digita <code>intranet.local</code> no navegador. O computador pergunta ao DNS qual IP corresponde a esse nome. O DNS responde <code>192.168.10.20</code>. Só depois disso o navegador tenta abrir conexão HTTP ou HTTPS com esse IP.</p><p>Se o DNS falhar, o navegador pode dizer que o nome não pôde ser resolvido. Se o DNS funcionar, mas a rota falhar, o erro será outro. Se a rota funcionar, mas a porta estiver fechada, outro erro aparecerá. Essa separação é essencial para troubleshooting profissional.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, DNS interno resolve nomes de controladores de domínio, servidores de arquivos, proxies, sistemas internos, impressoras, ferramentas de monitoramento, repositórios, ambientes de homologação, VPNs e aplicações críticas. Muitas falhas corporativas parecem rede fora, mas a causa pode ser DNS incorreto, split-brain mal configurado, cache antigo ou resolvedor inacessível.</p><p>Também é comum haver DNS interno e externo para o mesmo domínio. Para usuários internos, <code>portal.empresa.com</code> pode apontar para IP privado. Para usuários externos, o mesmo nome pode apontar para IP público ou serviço de borda.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, DNS é central. Balanceadores, bancos gerenciados, buckets, APIs, endpoints privados, serviços PaaS, clusters Kubernetes e integrações híbridas normalmente são acessados por nomes. O IP pode mudar, mas o nome permanece como contrato operacional.</p><p>VPCs e VNets possuem resolvedores internos, zonas privadas e integrações com DNS corporativo. Um erro de zona privada pode fazer uma VM resolver um serviço para IP público quando deveria usar private endpoint, ou resolver para endereço privado sem rota de retorno.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, DNS aparece em pipelines, ambientes efêmeros, blue/green deployment, canary release, service discovery, ingress controllers, certificados, validações TXT, automação de domínios e publicação de APIs. Um pipeline pode criar infraestrutura correta, mas falhar porque o registro DNS não propagou, o TTL está alto ou a zona errada foi alterada.</p><p>DNS também deve entrar em revisão de código. Mudanças em registros públicos, zonas privadas, aliases de produção, registros de e-mail e endpoints de API podem ter impacto de segurança e disponibilidade.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>DNS é fonte valiosa de defesa. Consultas DNS podem revelar malware tentando falar com domínios de comando e controle, usuários acessando domínios recém-criados, exfiltração por subdomínios longos, typosquatting, phishing, túnel DNS e alterações suspeitas.</p><p>Ao mesmo tempo, DNS pode ser alvo: spoofing, cache poisoning, hijacking de domínio, alteração indevida de registro, resolvedor aberto, abuso de subdomínio e configuração fraca de zonas.</p><div class='callout callout--security'><strong>Princípio defensivo:</strong> DNS não é só infraestrutura. DNS é superfície de ataque, fonte de inteligência, dependência de disponibilidade e mecanismo de controle operacional.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m07l01-title m07l01-desc'>\n    <title id='m07l01-title'>Fluxo básico de resolução DNS</title>\n    <desc id='m07l01-desc'>Cliente pergunta ao resolvedor DNS, resolvedor usa cache ou consulta hierarquia, e aplicação conecta ao IP retornado.</desc>\n    <defs><marker id='m07l01-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'><path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path></marker></defs>\n    <rect x='40' y='210' width='160' height='95' rx='14' class='svg-node svg-node--client'></rect><text x='120' y='246' text-anchor='middle' class='svg-label'>Cliente</text><text x='120' y='272' text-anchor='middle' class='svg-label svg-label--small'>app + SO</text>\n    <rect x='295' y='210' width='170' height='95' rx='14' class='svg-node svg-node--server'></rect><text x='380' y='244' text-anchor='middle' class='svg-label'>Resolvedor DNS</text><text x='380' y='270' text-anchor='middle' class='svg-label svg-label--small'>cache + recursão</text>\n    <rect x='555' y='70' width='150' height='85' rx='12' class='svg-node svg-node--router'></rect><text x='630' y='102' text-anchor='middle' class='svg-label'>Raiz</text><text x='630' y='126' text-anchor='middle' class='svg-label svg-label--small'>.</text>\n    <rect x='555' y='235' width='150' height='85' rx='12' class='svg-node svg-node--cloud'></rect><text x='630' y='267' text-anchor='middle' class='svg-label'>TLD</text><text x='630' y='291' text-anchor='middle' class='svg-label svg-label--small'>.com, .br...</text>\n    <rect x='555' y='400' width='150' height='85' rx='12' class='svg-node svg-node--server'></rect><text x='630' y='432' text-anchor='middle' class='svg-label'>Autoritativo</text><text x='630' y='456' text-anchor='middle' class='svg-label svg-label--small'>zona exemplo.com</text>\n    <rect x='790' y='210' width='150' height='95' rx='14' class='svg-node svg-node--server'></rect><text x='865' y='244' text-anchor='middle' class='svg-label'>Servidor/API</text><text x='865' y='270' text-anchor='middle' class='svg-label svg-label--small'>IP retornado</text>\n    <line x1='200' y1='257' x2='295' y2='257' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l01-arrow)'></line><text x='248' y='238' text-anchor='middle' class='svg-label svg-label--small'>1 consulta nome</text>\n    <line x1='465' y1='230' x2='555' y2='112' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l01-arrow)'></line><line x1='465' y1='257' x2='555' y2='277' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l01-arrow)'></line><line x1='465' y1='285' x2='555' y2='442' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l01-arrow)'></line>\n    <line x1='555' y1='460' x2='465' y2='288' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l01-arrow)'></line><text x='506' y='382' text-anchor='middle' class='svg-label svg-label--small'>2 busca/cache</text>\n    <line x1='295' y1='288' x2='200' y2='288' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l01-arrow)'></line><text x='248' y='314' text-anchor='middle' class='svg-label svg-label--small'>3 resposta IP</text>\n    <line x1='200' y1='230' x2='790' y2='230' class='svg-flow svg-flow--blocked animated-flow' marker-end='url(#m07l01-arrow)'></line><text x='495' y='210' text-anchor='middle' class='svg-label svg-label--small'>4 conexão real com IP</text>\n    <rect x='250' y='355' width='250' height='92' rx='12' class='svg-zone'></rect><text x='375' y='386' text-anchor='middle' class='svg-label'>Cache DNS</text><text x='375' y='412' text-anchor='middle' class='svg-label svg-label--small'>resposta válida até o TTL expirar</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai diferenciar falha de DNS de falha de conectividade. A meta é observar nome, resolução, IP retornado, rota até o destino e teste de porta. O laboratório é defensivo e pode ser feito em computador local, VM ou ambiente controlado.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam separação de causas: nome não resolve, nome resolve para IP errado, rota falha, porta fechada, certificado inválido, proxy obrigatório e cache antigo.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário em que usuários dizem que a Internet caiu, mas apenas alguns sistemas por nome falham. Sua missão é montar uma hipótese, coletar evidências e propor correção sem apagar caches ou trocar DNS aleatoriamente.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como separar DNS, rota, firewall e aplicação usando evidências. O foco é raciocínio operacional: perguntar o nome certo, comparar resolvedores, conferir IP retornado, testar rota e validar serviço.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>DNS existe para tornar redes IP operáveis em escala. Ele separa o nome lógico de um serviço do endereço usado naquele momento, permite delegação, cache, automação, publicação de serviços e integração entre ambientes.</p><p>Mas DNS também é dependência crítica. Se ele falha, aplicações parecem indisponíveis mesmo quando IP, rota e servidor estão corretos. Se ele é comprometido, usuários podem ser enviados ao destino errado.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará a hierarquia DNS, zonas e delegação. A pergunta deixará de ser apenas por que DNS existe e passará a ser como o namespace é organizado e quem tem autoridade para responder por cada parte.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Camada 4",
      "Camada 3"
    ],
    "beforeThisLesson": "O aluno já entende IPv4, gateway, rotas, ICMP, troubleshooting e roteamento.",
    "afterThisLesson": "O aluno passa a entender nomes como camada crítica acima da conectividade IP.",
    "dependsOn": [
      "IPv4",
      "Roteamento",
      "ICMP",
      "Troubleshooting"
    ]
  },
  "protocolFields": [
    {
      "field": "Name",
      "meaning": "Nome consultado, como www.exemplo.com.",
      "securityNote": "Domínios consultados podem revelar comportamento de usuário ou malware."
    },
    {
      "field": "Type",
      "meaning": "Tipo de registro solicitado, como A, AAAA, MX, TXT, NS ou CNAME.",
      "securityNote": "Tipos TXT e NS são relevantes em validação, e-mail e investigação."
    },
    {
      "field": "Class",
      "meaning": "Classe da consulta; na prática comum, IN para Internet.",
      "securityNote": "Normalmente pouco alterado no troubleshooting cotidiano."
    },
    {
      "field": "TTL",
      "meaning": "Tempo pelo qual a resposta pode ser mantida em cache.",
      "securityNote": "TTL alto pode atrasar correções; TTL baixo aumenta consultas."
    },
    {
      "field": "Answer",
      "meaning": "Resposta retornada, como endereço IP ou alias.",
      "securityNote": "Resposta incorreta pode indicar cache antigo, zona errada, hijack, spoofing ou split DNS mal entendido."
    },
    {
      "field": "Server",
      "meaning": "Resolvedor ou servidor que respondeu à consulta.",
      "securityNote": "Saber quem respondeu é essencial para auditoria, política e detecção de bypass."
    }
  ],
  "packetFlow": [
    "A aplicação solicita um nome ao sistema operacional.",
    "O sistema verifica cache local e arquivo hosts.",
    "O cliente envia consulta ao resolvedor configurado.",
    "O resolvedor responde por cache ou consulta servidores autoritativos.",
    "O cliente recebe a resposta e obtém IP ou outro dado.",
    "A aplicação inicia a conexão real usando IP, porta, rota, firewall e protocolo de aplicação.",
    "Logs de DNS, firewall, proxy e aplicação podem ser correlacionados."
  ],
  "deepDive": {
    "title": "DNS não substitui roteamento, firewall nem identidade",
    "points": [
      "DNS responde nomes; quem entrega pacotes continua sendo IP, rota, ARP e transporte.",
      "DNS pode apontar para IP correto, mas firewall, rota ou aplicação podem bloquear o acesso.",
      "DNS publica serviço, mas autorização depende de controles adicionais.",
      "DNS interno e externo podem responder diferente para o mesmo nome em split DNS.",
      "Mudanças DNS precisam considerar cache, TTL, propagação e rollback."
    ],
    "operationalImpact": [
      "DNS é dependência operacional de login, web, APIs, cloud, e-mail, certificados e automação.",
      "Mudanças de DNS exigem gestão de TTL, janelas, rollback e comunicação entre rede, segurança, aplicação e cloud.",
      "Ambientes com VPN, split DNS e zonas privadas precisam de runbooks para comparar resolvedores internos e externos."
    ],
    "financialImpact": [
      "Falhas de DNS geram indisponibilidade ampla e alto custo de atendimento, mesmo quando servidores e aplicações estão saudáveis.",
      "Serviços gerenciados de DNS, logs de consulta e resolvers privados em cloud podem gerar custo recorrente.",
      "TTL mal planejado pode aumentar custo de rollback, tempo de indisponibilidade e esforço de troubleshooting."
    ],
    "securityImpact": [
      "DNS pode revelar infraestrutura, permitir bloqueio/monitoramento defensivo, mas também ser usado para phishing, C2 e exfiltração.",
      "Logs DNS são fonte essencial para SOC, investigação e detecção de domínios anômalos.",
      "Governança de zonas, MFA no registrador, revisão de registros e controle de TXT/CNAME reduzem riscos críticos."
    ]
  },
  "commonMistakes": [
    "Dizer que DNS caiu sem testar resolução, rota e porta separadamente.",
    "Trocar DNS do cliente para resolvedor público e quebrar nomes internos.",
    "Confundir registro DNS com serviço ativo.",
    "Ignorar TTL e esperar mudança instantânea.",
    "Publicar registros internos em zona pública por erro de automação.",
    "Permitir resolvedores externos sem política e logging."
  ],
  "troubleshooting": {
    "method": "Separar nome, IP, rota, porta, TLS e aplicação.",
    "windows": [
      "ipconfig /all",
      "nslookup nome.exemplo.com",
      "Resolve-DnsName nome.exemplo.com",
      "ping <ip>",
      "tracert <ip>",
      "Test-NetConnection nome.exemplo.com -Port 443"
    ],
    "linux": [
      "cat /etc/resolv.conf",
      "resolvectl status",
      "dig nome.exemplo.com",
      "dig @8.8.8.8 nome.exemplo.com",
      "getent hosts nome.exemplo.com",
      "ip route get <ip>",
      "traceroute <ip>",
      "curl -vk https://nome.exemplo.com"
    ],
    "cisco": [
      "show hosts",
      "show running-config | include name-server",
      "ping nome.exemplo.com",
      "traceroute nome.exemplo.com"
    ],
    "cloud": [
      "Verificar zona pública versus privada",
      "Conferir associação de VPC/VNet à zona privada",
      "Validar private endpoint e registro interno",
      "Comparar resposta DNS de dentro e fora",
      "Revisar logs de resolvedor e flow logs"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Por que DNS existe.",
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
        "command": "ipconfig /all; Get-DnsClientServerAddress; Resolve-DnsName intranet.empresa.local",
        "purpose": "Ver resolvedores, sufixos e resposta DNS no Windows.",
        "expectedObservation": "Servidores DNS e resposta do nome aparecem claramente.",
        "interpretation": "DNS errado ou sufixo ausente explica falhas internas comuns."
      },
      {
        "platform": "Windows",
        "command": "Resolve-DnsName exemplo.com -Type A; Resolve-DnsName exemplo.com -Type AAAA; nslookup exemplo.com",
        "purpose": "Comparar tipos de registro e ferramenta clássica.",
        "expectedObservation": "A/AAAA retornam IPs ou erro NXDOMAIN/SERVFAIL.",
        "interpretation": "Diferença entre A e AAAA pode explicar falhas seletivas em dual stack."
      },
      {
        "platform": "Linux",
        "command": "resolvectl status || cat /etc/resolv.conf; getent hosts exemplo.com",
        "purpose": "Ver configuração de resolução do sistema e resultado via NSS.",
        "expectedObservation": "Resolvedor e IP retornado pelo sistema operacional.",
        "interpretation": "getent mostra o caminho real usado por aplicações, não apenas dig."
      },
      {
        "platform": "Linux",
        "command": "dig exemplo.com A; dig @1.1.1.1 exemplo.com A; dig @<dns-corporativo> intranet.empresa.local A",
        "purpose": "Comparar resolvedor padrão, público e corporativo.",
        "expectedObservation": "Respostas, TTLs e códigos de erro diferentes.",
        "interpretation": "Diferenças apontam split DNS, cache, política ou zona privada."
      },
      {
        "platform": "Linux/Windows",
        "command": "ping <ip-retornado>; curl -vk https://<nome>; Test-NetConnection <nome> -Port 443",
        "purpose": "Separar resolução de conectividade/aplicação.",
        "expectedObservation": "DNS resolve, mas porta pode abrir ou falhar.",
        "interpretation": "Se DNS resolve e a porta falha, a causa provável não é DNS."
      },
      {
        "platform": "SOC/Firewall",
        "command": "Consultar logs DNS por cliente, query, resposta, rcode e timestamp",
        "purpose": "Validar consulta real e detectar abuso.",
        "expectedObservation": "Query, tipo, resposta e código NXDOMAIN/SERVFAIL/NOERROR.",
        "interpretation": "Logs permitem diferenciar falha legítima, domínio suspeito e exfiltração."
      }
    ],
    "decisionTree": [
      {
        "if": "O nome não resolve em nenhum resolvedor",
        "then": "Verificar existência do registro, zona autoritativa, delegação e erro NXDOMAIN/SERVFAIL."
      },
      {
        "if": "Resolve internamente, mas não externamente",
        "then": "Investigar split DNS, zona privada, publicação pública e política de exposição."
      },
      {
        "if": "DNS resolve, mas a aplicação falha",
        "then": "Testar rota, porta, TLS/SNI, proxy, firewall e saúde da aplicação."
      },
      {
        "if": "A resposta muda entre clientes",
        "then": "Comparar resolvedores, cache, TTL, VPN, sufixo DNS e política por origem."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar resolvedores corporativos com logging e política.",
      "Separar zonas públicas e privadas com governança clara.",
      "Proteger registrador e provedor DNS com MFA forte.",
      "Monitorar consultas suspeitas e domínios recém-criados.",
      "Controlar alterações DNS por change management ou pull request.",
      "Validar registros críticos periodicamente."
    ],
    "badPractices": [
      "Apontar clientes para resolvedores públicos sem considerar nomes internos.",
      "Publicar registros internos em DNS público.",
      "Usar TTL muito alto em registros que mudam com frequência.",
      "Permitir resolvedor aberto na Internet.",
      "Tratar DNS como detalhe sem dono, backup, logging ou monitoramento."
    ],
    "attacksAndDefenses": [
      {
        "risk": "DNS spoofing/cache poisoning",
        "defense": "Resolvedores confiáveis, DNSSEC quando aplicável, segmentação, monitoramento e validação de respostas críticas."
      },
      {
        "risk": "Hijacking de domínio",
        "defense": "MFA, bloqueio de transferência, RBAC, auditoria e alertas."
      },
      {
        "risk": "Exfiltração por DNS",
        "defense": "DNS filtering, detecção de subdomínios anômalos, limite de resolvedores permitidos e SIEM."
      },
      {
        "risk": "Bypass por resolvedor externo",
        "defense": "Forçar DNS corporativo, bloquear saída direta indevida e monitorar DoH/DoT conforme política."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Por que DNS existe",
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
  "lab": {
    "id": "lab-7.1",
    "title": "Separando falha de DNS de falha de rede e aplicação",
    "labType": "cloud",
    "objective": "Diagnosticar nome, resposta DNS, IP retornado, rota, porta e aplicação.",
    "scenario": "Laboratório Neste laboratório, você vai diferenciar falha de DNS de falha de conectividade. A meta é observar nome, resolução, IP retornado, rota até o destino e teste de porta. O laboratório é defensivo e pode ser feito em computador local, VM ou ambiente controlado.",
    "topology": "Um computador local ou VM conectado à Internet ou a uma rede de laboratório.",
    "architecture": "Cliente DNS -> resolvedor configurado -> resposta DNS -> conexão ao IP retornado -> validação de rota/porta/aplicação.",
    "prerequisites": [
      "Windows ou Linux",
      "Acesso a terminal",
      "Opcional: Wireshark",
      "Opcional: ambiente corporativo/lab com nome interno"
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 150,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não capture tráfego de terceiros sem autorização.",
      "Não altere DNS corporativo sem change aprovado.",
      "Não publique nomes internos em prints externos.",
      "Não use resolvedor público para contornar política corporativa.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar DNS configurado",
        "instruction": "Descubra qual resolvedor o sistema realmente usa.",
        "command": "Windows: ipconfig /all; Get-DnsClientServerAddress\nLinux: resolvectl status || cat /etc/resolv.conf",
        "expectedOutput": "Lista de servidores DNS, sufixos e interface associada.",
        "explanation": "Antes de consultar nomes, confirme quem responderá por eles."
      },
      {
        "number": 2,
        "title": "Consultar pelo resolvedor padrão",
        "instruction": "Consulte um domínio público e um nome interno, quando existir.",
        "command": "Windows: Resolve-DnsName example.com -Type A\nLinux: getent hosts example.com; dig example.com A",
        "expectedOutput": "Resposta A/AAAA, NXDOMAIN ou SERVFAIL.",
        "explanation": "A resposta do resolvedor padrão é a que mais se aproxima do comportamento das aplicações."
      },
      {
        "number": 3,
        "title": "Comparar resolvedor público e corporativo",
        "instruction": "Compare respostas para identificar split DNS, cache ou política.",
        "command": "dig @1.1.1.1 example.com A\ndig @<dns-corporativo> <nome-interno> A\nResolve-DnsName <nome> -Server <dns>",
        "expectedOutput": "Respostas iguais ou diferenças explicáveis.",
        "explanation": "Diferenças podem ser esperadas em split DNS, mas precisam ser documentadas."
      },
      {
        "number": 4,
        "title": "Testar IP retornado",
        "instruction": "Use o IP retornado para validar se a rede alcança o destino.",
        "command": "Linux: ip route get <ip-retornado>; ping -c 3 <ip-retornado>\nWindows: Test-NetConnection <ip-retornado> -Port 443",
        "expectedOutput": "Rota e conectividade coerentes ou falha clara.",
        "explanation": "DNS correto não garante que o serviço esteja acessível."
      },
      {
        "number": 5,
        "title": "Testar aplicação pelo nome",
        "instruction": "Teste a porta ou URL usando o nome, não apenas o IP.",
        "command": "curl -vk https://<nome>\nWindows: Test-NetConnection <nome> -Port 443",
        "expectedOutput": "Conexão, erro TLS, timeout ou recusa.",
        "explanation": "TLS, Host header, proxy e SNI dependem do nome."
      },
      {
        "number": 6,
        "title": "Registrar evidências sanitizadas",
        "instruction": "Monte uma tabela com resolvedor, query, tipo, resposta, TTL, IP e teste de porta.",
        "artifact": "Tabela DNS: nome | tipo | resolvedor | resposta | TTL | teste IP | teste porta | conclusão",
        "evidence": "saídas de Resolve-DnsName/dig/getent/curl/Test-NetConnection.",
        "expectedOutput": "Relatório separando DNS, IP, rota, porta, TLS e aplicação.",
        "explanation": "A evidência impede que todo erro de acesso seja rotulado como “problema de DNS”."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Por que DNS existe”.",
    "validation": [
      {
        "check": "Artefato principal produzido",
        "command": "Revisar tabela, diagrama ou saída coletada",
        "expected": "O artefato responde ao objetivo do laboratório.",
        "ifFails": "Volte aos passos e complete campos ausentes."
      },
      {
        "check": "Coerência técnica",
        "command": "Comparar com os conceitos da aula",
        "expected": "Não há contradições com endereçamento, rota, política, segurança ou fluxo.",
        "ifFails": "Revise hipóteses, cálculos, regras e dependências."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O resultado não bate com o esperado",
        "probableCause": "Passo incompleto, premissa incorreta ou evidência insuficiente.",
        "howToConfirm": "Revise o artefato produzido e compare com a validação.",
        "fix": "Refaça o passo com calma, registre a evidência e explique a correção."
      },
      {
        "symptom": "O comando ou ferramenta não está disponível",
        "probableCause": "Sistema operacional diferente ou ferramenta não instalada.",
        "howToConfirm": "Verifique a versão do sistema e a presença da ferramenta.",
        "fix": "Use a alternativa conceitual, Windows/Linux equivalente ou faça a validação por desenho."
      }
    ],
    "improvements": [
      "Adicionar Wireshark com filtro dns.",
      "Comparar zona pública e privada.",
      "Registrar logs do resolvedor corporativo.",
      "Automatizar teste com script de health check."
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
      "Qual evidência mostra que o laboratório de “Por que DNS existe” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Incidente: a intranet caiu",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedOutcome": "O aluno diferencia falha de DNS de falha de rota, firewall, porta, TLS ou aplicação.",
    "validationChecklist": [
      "Resolvedor identificado",
      "Nome consultado",
      "Resposta comparada",
      "IP testado",
      "Rota verificada",
      "Porta validada",
      "Evidência sanitizada"
    ],
    "troubleshootingNotes": [
      "NXDOMAIN indica nome inexistente na visão daquele resolvedor.",
      "Timeout pode indicar resolvedor inacessível ou bloqueado.",
      "Resposta diferente entre dentro e fora pode ser split DNS normal.",
      "Nome resolver para IP correto não garante aplicação funcionando."
    ]
  },
  "mentorQuestions": [
    "Quando um usuário diz que o site caiu, quais testes provariam se é DNS ou não?",
    "Por que trocar DNS para 8.8.8.8 pode quebrar acesso a sistemas internos?",
    "Qual é a diferença entre nome resolver corretamente e aplicação estar disponível?"
  ],
  "quiz": [
    {
      "question": "Qual problema principal o DNS resolve?",
      "options": [
        "Criptografar pacotes IP",
        "Traduzir nomes e publicar informações de serviços em estrutura distribuída",
        "Substituir roteamento IPv4",
        "Bloquear malware automaticamente"
      ],
      "answer": 1,
      "explanation": "DNS organiza nomes e registros para aplicações encontrarem endereços e metadados sem depender de IPs decorados."
    },
    {
      "question": "Se um nome resolve para IP, mas a porta 443 não conecta, o que isso indica?",
      "options": [
        "DNS sempre está errado",
        "A resolução funcionou, mas pode haver problema de rota, firewall, porta, TLS ou aplicação",
        "O servidor autoritativo caiu",
        "O arquivo hosts foi apagado"
      ],
      "answer": 1,
      "explanation": "DNS é apenas uma etapa. Depois dela ainda existem rede, transporte e aplicação."
    },
    {
      "question": "O que o TTL influencia?",
      "options": [
        "Tempo de vida do pacote IP no roteamento",
        "Tempo pelo qual uma resposta DNS pode ser cacheada",
        "Número máximo de domínios por zona",
        "Tamanho máximo de um registro A"
      ],
      "answer": 1,
      "explanation": "No DNS, TTL define por quanto tempo uma resposta pode ser mantida em cache."
    },
    {
      "question": "Qual risco existe ao usar resolvedor público em rede corporativa?",
      "options": [
        "Aumentar MTU automaticamente",
        "Perder resolução de nomes internos e contornar política/logging corporativo",
        "Transformar IPv4 em IPv6",
        "Desativar ARP"
      ],
      "answer": 1,
      "explanation": "Resolvedores públicos não conhecem zonas internas e podem burlar controles corporativos."
    },
    {
      "question": "Qual componente é fonte oficial de uma zona DNS?",
      "options": [
        "Cliente DNS",
        "Servidor autoritativo",
        "Switch L2",
        "Gateway default"
      ],
      "answer": 1,
      "explanation": "Servidor autoritativo responde oficialmente pelos registros de uma zona."
    },
    {
      "question": "Qual evidência ajuda a diferenciar DNS de problema de aplicação?",
      "options": [
        "Apenas trocar cabo",
        "Comparar resolução, IP retornado, rota e teste de porta",
        "Apagar todos os logs",
        "Aumentar broadcast domain"
      ],
      "answer": 1,
      "explanation": "Troubleshooting profissional separa nome, IP, rota, porta e aplicação."
    }
  ],
  "flashcards": [
    {
      "front": "O que é DNS?",
      "back": "Sistema distribuído e hierárquico que associa nomes a registros, como IPs e metadados de serviços."
    },
    {
      "front": "DNS resolver prova que site funciona?",
      "back": "Não. Prova só resposta de nomes; rota, firewall, porta, TLS e aplicação ainda podem falhar."
    },
    {
      "front": "O que é resolvedor recursivo?",
      "back": "Servidor que busca resposta DNS em nome do cliente."
    },
    {
      "front": "O que é servidor autoritativo?",
      "back": "Servidor que possui autoridade para responder por uma zona DNS."
    },
    {
      "front": "O que é TTL em DNS?",
      "back": "Tempo pelo qual uma resposta DNS pode permanecer em cache."
    },
    {
      "front": "Por que DNS é importante em segurança?",
      "back": "Revela comportamento, pode ser abusado em ataques e é ponto crítico para monitoramento e bloqueio."
    }
  ],
  "exercises": [
    {
      "title": "Separar sintomas",
      "prompt": "Um usuário acessa https://portal.empresa.com e recebe erro de nome não encontrado. Liste cinco hipóteses antes de culpar a aplicação.",
      "expectedAnswer": "Erro de zona, resolvedor errado, cache, VPN ausente, split DNS, registro removido, bloqueio DNS ou domínio digitado errado."
    },
    {
      "title": "Comparar resolvedores",
      "prompt": "Explique por que o mesmo nome pode retornar IP privado dentro da empresa e IP público fora.",
      "expectedAnswer": "Split DNS permite respostas diferentes conforme origem ou zona consultada."
    },
    {
      "title": "TTL operacional",
      "prompt": "Por que reduzir TTL antes de migração crítica pode ser útil?",
      "expectedAnswer": "Diminui tempo de cache e facilita mudança ou rollback."
    },
    {
      "title": "DNS versus porta",
      "prompt": "Um nome resolve para 10.10.20.30, ping funciona, mas HTTPS não abre. Quais próximos testes faria?",
      "expectedAnswer": "Teste de porta, curl verbose, firewall, proxy, certificado, serviço, balanceador e logs."
    }
  ],
  "challenge": {
    "title": "Incidente: a intranet caiu",
    "scenario": "Após uma mudança em cloud, parte dos usuários internos não acessa intranet.empresa.com. Usuários externos acessam normalmente. Alguns internos resolvem para IP público; outros para IP privado antigo.",
    "tasks": [
      "Montar hipóteses",
      "Listar comandos de coleta",
      "Separar DNS, rota e aplicação",
      "Propor correção segura",
      "Definir evidências para post-mortem"
    ],
    "constraints": [
      "Não alterar DNS global sem validação",
      "Não limpar cache em massa sem entender impacto",
      "Não expor nomes internos em relatório externo"
    ],
    "rubric": [
      "Identifica split DNS/cache",
      "Compara resolvedores",
      "Valida IP retornado e rota",
      "Testa porta/aplicação",
      "Propõe rollback ou ajuste com governança"
    ]
  },
  "commentedSolution": {
    "summary": "A solução provável envolve inconsistência entre zona privada, cache e registros de migração. A abordagem correta é comparar respostas por resolvedor, validar TTL, confirmar zona privada associada às redes corretas, testar IP retornado e só então alterar registros.",
    "steps": [
      "Coletar ipconfig/resolvectl para saber resolvedor usado.",
      "Consultar intranet.empresa.com em resolvedor interno e externo.",
      "Comparar IP retornado com arquitetura esperada.",
      "Testar rota e porta para cada IP retornado.",
      "Verificar TTL e horário da mudança.",
      "Corrigir zona privada ou associação de rede, mantendo rollback documentado.",
      "Monitorar logs DNS, firewall e aplicação após correção."
    ],
    "why": "A resposta evita culpar a aplicação quando o problema é de resolução ou escopo de zona."
  },
  "glossary": [
    {
      "term": "DNS",
      "definition": "Sistema distribuído de nomes usado para publicar registros como endereços IP e metadados de serviços."
    },
    {
      "term": "Resolvedor recursivo",
      "definition": "Servidor que busca respostas DNS para clientes."
    },
    {
      "term": "Servidor autoritativo",
      "definition": "Servidor que responde oficialmente por uma zona DNS."
    },
    {
      "term": "Zona DNS",
      "definition": "Conjunto administrável de registros de um domínio ou subdomínio."
    },
    {
      "term": "TTL",
      "definition": "Tempo de cache permitido para uma resposta DNS."
    },
    {
      "term": "Split DNS",
      "definition": "Arquitetura em que o mesmo nome pode retornar respostas diferentes conforme rede, origem ou visão de DNS."
    }
  ],
  "references": [
    "RFC 1034 — Domain Names: Concepts and Facilities",
    "RFC 1035 — Domain Names: Implementation and Specification",
    "Material de referência interna do curso Redes e Network v2.0 — Módulos 4, 5 e 6"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e serviços gerenciados",
      "reason": "DNS em cloud aparece em load balancers, private endpoints, service discovery e IaC."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Autenticação corporativa",
      "reason": "Serviços de identidade dependem de DNS correto para descoberta, certificados e endpoints."
    }
  ],
  "progressRules": {
    "requiresQuiz": true,
    "requiresLab": true,
    "minQuizScore": 70,
    "requiredArtifacts": [
      "Tabela de evidências DNS",
      "Comparação entre resolvedores",
      "Teste de rota e porta",
      "Resumo de hipótese e conclusão"
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
      "7.2"
    ]
  }
};
