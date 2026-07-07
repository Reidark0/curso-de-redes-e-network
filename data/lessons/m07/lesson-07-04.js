export const lesson0704 = {
  "id": "7.4",
  "moduleId": "m07",
  "order": 4,
  "title": "Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR",
  "subtitle": "Aprenda os principais tipos de registros DNS, o problema que cada um resolve, como eles aparecem em ambientes corporativos, cloud, e-mail, segurança, DevSecOps e troubleshooting.",
  "duration": "115-165 min",
  "estimatedStudyTimeMinutes": 165,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "redes",
    "dns",
    "registros dns",
    "a",
    "aaaa",
    "cname",
    "mx",
    "txt",
    "ns",
    "srv",
    "ptr",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "id": "7.1",
      "title": "Por que DNS existe",
      "reason": "Explica por que nomes precisam ser resolvidos para endereços e por que DNS é crítico para aplicações."
    },
    {
      "id": "7.2",
      "title": "Hierarquia DNS, zonas e delegação",
      "reason": "Mostra zonas, autoridade, delegação, NS e o papel dos servidores autoritativos."
    },
    {
      "id": "7.3",
      "title": "Resolução recursiva, autoritativa e cache",
      "reason": "Explica como consultas chegam aos registros e como cache/TTL afetam a resposta observada."
    }
  ],
  "objectives": [
    "Diferenciar os principais registros DNS e o problema resolvido por cada um.",
    "Explicar quando usar A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
    "Identificar registros incorretos em cenários de troubleshooting real.",
    "Relacionar registros DNS com e-mail, certificados, service discovery, cloud e DevSecOps.",
    "Reconhecer riscos de segurança associados a registros órfãos, TXT sensíveis, CNAME indevido e PTR inconsistente.",
    "Executar consultas direcionadas com dig, nslookup e Resolve-DnsName."
  ],
  "learningOutcomes": [
    "Ler uma zona DNS simples e explicar a função de cada registro.",
    "Escolher o tipo de registro adequado para serviços web, e-mail, validação, delegação e reverso.",
    "Diagnosticar diferenças entre resposta esperada, resposta em cache e resposta autoritativa.",
    "Documentar riscos e controles associados a registros DNS críticos."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Depois de entender por que DNS existe, como ele é hierárquico e como uma consulta é resolvida, falta entender o que realmente existe dentro de uma zona DNS. Uma zona não contém apenas “nome vira IP”. Ela contém vários tipos de registros, cada um criado para resolver um problema diferente.</p>\n  <p>Quando uma aplicação falha, um certificado não valida, um e-mail cai em spam, uma VPN não encontra um serviço interno, um subdomínio fica vulnerável a takeover ou um pipeline publica endpoint errado, frequentemente o problema está em um registro DNS mal entendido.</p>\n  <div class='callout'><strong>Ideia central:</strong> registros DNS são contratos publicados em uma zona. Cada tipo informa uma coisa diferente: endereço, alias, servidor de e-mail, autoridade, validação, serviço, reverso ou metadado.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No início, o uso mais visível do DNS era mapear nomes para endereços IPv4. Com o crescimento da Internet, novos problemas apareceram: e-mail precisava descobrir servidores de recebimento, domínios precisavam delegar autoridade, serviços precisavam ser localizados por protocolo, IPv6 precisava de endereços maiores e políticas de segurança passaram a usar DNS como mecanismo de publicação.</p>\n  <p>Por isso, o DNS evoluiu para um sistema de tipos de registros. Em vez de uma única tabela, uma zona passou a armazenar dados diferentes com semânticas diferentes: <code>A</code>, <code>AAAA</code>, <code>CNAME</code>, <code>MX</code>, <code>TXT</code>, <code>NS</code>, <code>SRV</code>, <code>PTR</code>, <code>SOA</code>, <code>CAA</code> e muitos outros.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Se todo nome DNS só pudesse apontar para um endereço IP, vários cenários seriam difíceis ou impossíveis: e-mail não saberia qual servidor recebe mensagens, validações de domínio dependeriam de processos manuais, subdomínios não poderiam ser delegados com clareza, serviços internos não seriam descobertos por nome e resolução reversa não funcionaria.</p>\n  <p>Além disso, usar o tipo errado de registro causa falhas sutis. Um <code>CNAME</code> no lugar errado pode quebrar outro registro. Um <code>MX</code> sem registro de destino válido derruba recebimento de e-mail. Um <code>TXT</code> antigo pode permitir validação indevida. Um <code>PTR</code> ausente pode prejudicar reputação de e-mail e investigação.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> não basta perguntar “o DNS resolveu?”. É preciso perguntar “qual tipo de registro foi consultado, em qual zona, por qual resolvedor, com qual TTL, vindo de qual autoridade e com qual impacto?”.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>Os registros DNS acompanharam a evolução das redes. O registro <code>A</code> nasceu para IPv4; <code>AAAA</code> surgiu para IPv6; <code>MX</code> organizou entrega de e-mail; <code>TXT</code> virou base para SPF, DKIM, DMARC, validação de domínio e integrações SaaS; <code>SRV</code> passou a localizar serviços; <code>PTR</code> viabilizou resolução reversa.</p>\n  <p>Em ambientes modernos, registros DNS são gerenciados por portais de cloud, APIs, Terraform, pipelines, controladores Kubernetes, plataformas de certificado e ferramentas de segurança. Isso aumenta velocidade, mas também aumenta o risco de alterações automatizadas sem revisão.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Um <strong>registro DNS</strong> é uma entrada publicada em uma zona. Ele possui nome, tipo, valor, TTL e classe. O tipo define o significado do valor. Por exemplo, em <code>api.empresa.com A 10.10.20.15</code>, o tipo <code>A</code> diz que o valor é um endereço IPv4.</p>\n  <table class='data-table'><thead><tr><th>Tipo</th><th>Resolve qual problema?</th><th>Exemplo</th><th>Uso comum</th></tr></thead><tbody>\n    <tr><td>A</td><td>Nome para IPv4</td><td>www IN A 203.0.113.10</td><td>Sites, APIs, servidores</td></tr>\n    <tr><td>AAAA</td><td>Nome para IPv6</td><td>www IN AAAA 2001:db8::10</td><td>Serviços IPv6</td></tr>\n    <tr><td>CNAME</td><td>Alias para outro nome</td><td>app IN CNAME lb.exemplo.net</td><td>Apontar para serviço gerenciado</td></tr>\n    <tr><td>MX</td><td>Servidor de e-mail do domínio</td><td>@ IN MX 10 mail.empresa.com</td><td>Recebimento de e-mail</td></tr>\n    <tr><td>TXT</td><td>Texto e políticas</td><td>@ IN TXT \"v=spf1 ...\"</td><td>SPF, DKIM, DMARC, validações</td></tr>\n    <tr><td>NS</td><td>Autoridade da zona/delegação</td><td>@ IN NS ns1.provedor.net</td><td>Delegação e autoridade</td></tr>\n    <tr><td>SRV</td><td>Localização de serviço</td><td>_ldap._tcp IN SRV ...</td><td>AD, SIP, XMPP, serviços internos</td></tr>\n    <tr><td>PTR</td><td>IP para nome</td><td>15 IN PTR host.empresa.com</td><td>DNS reverso, e-mail, auditoria</td></tr>\n  </tbody></table>\n  <div class='definition-box'>O tipo do registro define a semântica da resposta. DNS não é apenas nome para IP; DNS é um banco distribuído de informações de nomeação.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando uma aplicação pede um nome, ela geralmente solicita um tipo de registro. Um navegador pode pedir <code>A</code> e <code>AAAA</code>. Um servidor de e-mail consulta <code>MX</code>. Uma validação de certificado pode consultar <code>TXT</code> ou <code>CAA</code>. Um cliente de domínio pode usar <code>SRV</code> para localizar controladores.</p>\n  <ol class='flow-list'>\n    <li>O cliente ou aplicação define o nome e o tipo de registro desejado.</li>\n    <li>O resolvedor consulta cache local e recursivo.</li>\n    <li>O resolvedor chega à zona autoritativa correta.</li>\n    <li>O autoritativo responde com o tipo solicitado, erro ou cadeia intermediária.</li>\n    <li>Se houver <code>CNAME</code>, o resolvedor precisa seguir o nome canônico até obter o tipo final.</li>\n    <li>A resposta é armazenada conforme TTL e devolvida ao cliente.</li>\n    <li>A aplicação usa a resposta dentro do contexto dela: conectar em IP, entregar e-mail, validar domínio ou descobrir serviço.</li>\n  </ol>\n  <p>Um ponto importante: <code>CNAME</code> não é redirecionamento HTTP. Ele é um alias DNS. O navegador ainda fará conexão ao destino final após a resolução. Da mesma forma, <code>MX</code> não envia e-mail; ele apenas informa quais hosts devem receber mensagens para um domínio.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, registros DNS precisam refletir ownership, ambiente, criticidade, exposição e dependência. Registros públicos devem ser tratados como superfície de ataque. Registros privados precisam estar associados às redes certas. Registros de e-mail impactam reputação. Registros TXT podem conceder controle a serviços externos.</p>\n  <table class='comparison-table'><thead><tr><th>Registro</th><th>Onde aparece</th><th>Erro comum</th><th>Impacto</th></tr></thead><tbody>\n    <tr><td>A/AAAA</td><td>Web, API, VPN, bastion</td><td>Apontar para IP antigo</td><td>Indisponibilidade ou tráfego para destino errado</td></tr>\n    <tr><td>CNAME</td><td>CDN, SaaS, load balancer</td><td>Alias órfão para recurso removido</td><td>Subdomain takeover</td></tr>\n    <tr><td>MX</td><td>E-mail corporativo</td><td>Prioridade errada ou destino sem A/AAAA</td><td>Falha no recebimento de e-mail</td></tr>\n    <tr><td>TXT</td><td>SPF, DKIM, DMARC, validações</td><td>TXT antigo de validação mantido</td><td>Risco de controle indevido ou spoofing</td></tr>\n    <tr><td>NS</td><td>Autoridade/delegação</td><td>NS sem governança ou glue incorreto</td><td>Domínio/subdomínio fora de controle</td></tr>\n    <tr><td>PTR</td><td>DNS reverso</td><td>PTR ausente ou inconsistente</td><td>Problemas de e-mail, logs e auditoria</td></tr>\n  </tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma portaria corporativa. Nem toda pergunta busca a mesma coisa. “Qual é o endereço do prédio?” parece um registro A. “Qual é o nome oficial desse apelido?” parece CNAME. “Quem recebe correspondência?” parece MX. “Quem administra este setor?” parece NS. “Quais regras declaro sobre minha identidade?” parece TXT. “Que nome corresponde a este crachá/IP?” parece PTR.</p>\n  <p>A analogia ajuda a perceber que DNS é um sistema de diretório com perguntas diferentes. O limite da analogia é que registros DNS têm regras formais, TTL, autoridade e implicações técnicas que uma portaria humana não tem.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você acessa <code>www.empresa.com</code>. O navegador consulta registros <code>A</code> e possivelmente <code>AAAA</code>. Se <code>www</code> for um <code>CNAME</code> para <code>empresa.cdn.net</code>, o resolvedor segue esse alias e busca o endereço final. Depois disso, o navegador abre conexão TCP/TLS com o IP retornado.</p>\n  <p>Se você enviar e-mail para <code>usuario@empresa.com</code>, o servidor remetente não consulta <code>A</code> diretamente para <code>empresa.com</code>. Ele consulta <code>MX</code> do domínio, obtém o host de e-mail e então resolve o <code>A</code> ou <code>AAAA</code> desse host.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa pode ter <code>intranet.empresa.local A 10.10.10.20</code>, <code>mail.empresa.com A 203.0.113.50</code>, <code>empresa.com MX 10 mail.empresa.com</code>, <code>_sip._tcp.empresa.com SRV</code> para comunicação, e vários <code>TXT</code> para SPF, DKIM, DMARC e validações SaaS.</p>\n  <p>Em auditoria, o time de segurança deve saber quem é dono de cada registro, qual ambiente ele representa, se é público ou privado, se aponta para recurso ativo, se tem TTL compatível com criticidade e se há registros órfãos.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, registros DNS frequentemente apontam para load balancers, endpoints privados, serviços gerenciados, CDN e APIs. Muitas vezes o provedor pede um <code>CNAME</code> ou <code>TXT</code> para validação. Zonas privadas podem mapear nomes para IPs internos que só existem dentro de uma VPC/VNet.</p>\n  <p>Um erro comum é manter <code>CNAME</code> público apontando para um recurso cloud removido. Outro erro é publicar internamente um nome que deveria resolver apenas via private endpoint, mas por split DNS mal configurado acaba resolvendo para um IP público.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, registros DNS são frequentemente criados por Terraform, pipelines, ExternalDNS no Kubernetes, módulos de plataforma e automações de certificado. Isso permite rastreabilidade, revisão e rollback, mas também exige controle de permissões.</p>\n  <p>Uma política madura valida padrões de nome, impede <code>TXT</code> sensível sem aprovação, bloqueia alterações em <code>NS</code> e <code>MX</code> por pipelines comuns, monitora registros órfãos e força tags ou metadados de ownership no repositório de infraestrutura.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Registros DNS são parte da superfície de ataque. <code>CNAME</code> órfão pode abrir subdomain takeover. <code>TXT</code> antigo pode manter validação de domínio para SaaS não usado. <code>MX</code> mal configurado pode facilitar spoofing se SPF, DKIM e DMARC estiverem fracos. <code>NS</code> indevido pode transferir autoridade. <code>PTR</code> inconsistente pode prejudicar investigação e reputação.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> todo registro público deve ter dono, justificativa, ambiente, criticidade, TTL planejado e revisão periódica.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama SVG — registros DNS e seus papéis</h2>\n  <p>O diagrama organiza os principais registros por função: endereço, alias, e-mail, autoridade, política, serviço e reverso.</p>\n  <svg class='lesson-svg' viewBox='0 0 1080 660' role='img' aria-labelledby='m07l04-title m07l04-desc'>\n    <title id='m07l04-title'>Principais registros DNS e seus papéis</title>\n    <desc id='m07l04-desc'>Uma zona DNS contém registros A, AAAA, CNAME, MX, TXT, NS, SRV e PTR, cada um associado a uma função operacional.</desc>\n    <defs>\n      <marker id='m07l04-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto' markerUnits='strokeWidth'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow-marker'></path>\n      </marker>\n    </defs>\n    <rect x='35' y='35' width='1010' height='590' rx='24' class='svg-zone'></rect>\n    <text x='540' y='75' text-anchor='middle' class='svg-label'>Zona DNS: empresa.com</text>\n\n    <rect x='80' y='130' width='190' height='100' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='175' y='165' text-anchor='middle' class='svg-label'>A / AAAA</text>\n    <text x='175' y='193' text-anchor='middle' class='svg-label svg-label--small'>nome → IP</text>\n\n    <rect x='325' y='130' width='190' height='100' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='420' y='165' text-anchor='middle' class='svg-label'>CNAME</text>\n    <text x='420' y='193' text-anchor='middle' class='svg-label svg-label--small'>alias → canônico</text>\n\n    <rect x='570' y='130' width='190' height='100' rx='16' class='svg-node svg-node--router'></rect>\n    <text x='665' y='165' text-anchor='middle' class='svg-label'>MX</text>\n    <text x='665' y='193' text-anchor='middle' class='svg-label svg-label--small'>e-mail do domínio</text>\n\n    <rect x='815' y='130' width='190' height='100' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='910' y='165' text-anchor='middle' class='svg-label'>TXT</text>\n    <text x='910' y='193' text-anchor='middle' class='svg-label svg-label--small'>SPF, DKIM, validação</text>\n\n    <rect x='80' y='310' width='190' height='100' rx='16' class='svg-node svg-node--switch'></rect>\n    <text x='175' y='345' text-anchor='middle' class='svg-label'>NS</text>\n    <text x='175' y='373' text-anchor='middle' class='svg-label svg-label--small'>autoridade/delegação</text>\n\n    <rect x='325' y='310' width='190' height='100' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='420' y='345' text-anchor='middle' class='svg-label'>SRV</text>\n    <text x='420' y='373' text-anchor='middle' class='svg-label svg-label--small'>descoberta de serviço</text>\n\n    <rect x='570' y='310' width='190' height='100' rx='16' class='svg-node svg-node--client'></rect>\n    <text x='665' y='345' text-anchor='middle' class='svg-label'>PTR</text>\n    <text x='665' y='373' text-anchor='middle' class='svg-label svg-label--small'>IP → nome</text>\n\n    <rect x='815' y='310' width='190' height='100' rx='16' class='svg-node svg-node--firewall'></rect>\n    <text x='910' y='345' text-anchor='middle' class='svg-label'>Controles</text>\n    <text x='910' y='373' text-anchor='middle' class='svg-label svg-label--small'>dono, TTL, revisão</text>\n\n    <rect x='160' y='500' width='760' height='70' rx='16' class='svg-zone'></rect>\n    <text x='540' y='530' text-anchor='middle' class='svg-label'>Aplicações, e-mail, certificados, cloud, service discovery e segurança dependem da combinação correta desses registros</text>\n    <text x='540' y='555' text-anchor='middle' class='svg-label svg-label--small'>Consulta errada, registro órfão ou autoridade incorreta vira incidente operacional ou de segurança.</text>\n\n    <line x1='175' y1='230' x2='175' y2='310' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l04-arrow)'></line>\n    <line x1='420' y1='230' x2='420' y2='310' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l04-arrow)'></line>\n    <line x1='665' y1='230' x2='665' y2='310' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l04-arrow)'></line>\n    <line x1='910' y1='230' x2='910' y2='310' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l04-arrow)'></line>\n    <line x1='270' y1='540' x2='160' y2='540' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l04-arrow)'></line>\n    <line x1='810' y1='540' x2='920' y2='540' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l04-arrow)'></line>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai consultar diferentes tipos de registros DNS, comparar respostas de resolvedor e autoritativo, montar uma tabela de função/risco e interpretar registros usados por web, e-mail, validação e delegação.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam identificação de tipos de registros, escolha do registro certo por cenário, leitura de respostas DNS e análise de riscos comuns em zonas públicas e privadas.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá uma zona DNS fictícia com registros web, e-mail, CNAME para SaaS, TXT de validação e PTR inconsistente. Sua missão será encontrar riscos, erros operacionais e propor correções seguras.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como classificar registros por função, validar destino de CNAME, conferir MX, revisar TXT, verificar autoridade NS e confirmar PTR sem confundir resolução direta com reversa.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Registros DNS são peças com funções diferentes. <code>A</code> e <code>AAAA</code> apontam para endereços, <code>CNAME</code> cria alias, <code>MX</code> indica servidores de e-mail, <code>TXT</code> publica políticas e validações, <code>NS</code> define autoridade, <code>SRV</code> localiza serviços e <code>PTR</code> faz resolução reversa.</p>\n  <p>Entender tipos de registros evita diagnósticos rasos. Em redes modernas, DNS se conecta a cloud, certificados, e-mail, pipelines, identidade, segurança, observabilidade e resposta a incidentes.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará TTL, cache DNS e troubleshooting de nomes. Depois de saber o que cada registro significa, vamos entender por que uma correção pode demorar a aparecer e como investigar respostas antigas.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Serviços de rede",
      "Nomeação e descoberta"
    ],
    "dependsOn": [
      "IPv4",
      "Roteamento",
      "DNS hierárquico",
      "Cache DNS"
    ],
    "realWorldImpact": "Registros DNS incorretos podem derrubar aplicações, e-mail, validação de certificados, service discovery, integrações SaaS e controles de segurança."
  },
  "protocolFields": [
    {
      "field": "Name",
      "meaning": "Nome consultado ou publicado na zona",
      "example": "www.empresa.com"
    },
    {
      "field": "Type",
      "meaning": "Tipo do registro",
      "example": "A, AAAA, CNAME, MX, TXT, NS, SRV, PTR"
    },
    {
      "field": "Class",
      "meaning": "Classe DNS, normalmente IN",
      "example": "IN"
    },
    {
      "field": "TTL",
      "meaning": "Tempo de cache da resposta",
      "example": "300"
    },
    {
      "field": "RDATA",
      "meaning": "Valor do registro",
      "example": "203.0.113.10 ou mail.empresa.com"
    },
    {
      "field": "Priority/Preference",
      "meaning": "Prioridade em registros como MX e SRV",
      "example": "10"
    },
    {
      "field": "Target",
      "meaning": "Destino em CNAME, MX ou SRV",
      "example": "lb.provedor.net"
    }
  ],
  "packetFlow": [
    "Aplicação solicita um nome e um tipo de registro.",
    "Cliente consulta resolvedor configurado.",
    "Resolvedor verifica cache e consulta autoridade se necessário.",
    "Autoritativo retorna o tipo solicitado, CNAME intermediário ou erro.",
    "Se houver CNAME, o resolvedor segue o nome canônico até obter a resposta final.",
    "Resposta é cacheada conforme TTL.",
    "Aplicação usa a resposta conforme seu protocolo: web, e-mail, certificado, serviço ou auditoria."
  ],
  "deepDive": {
    "title": "O detalhe que mais derruba diagnósticos DNS",
    "points": [
      "Consultar A quando o problema é MX não testa e-mail corretamente.",
      "Consultar o resolvedor local não prova que a autoridade já mudou.",
      "CNAME é alias DNS, não redirecionamento HTTP.",
      "TXT é flexível e por isso perigoso: acumula validações, políticas e integrações antigas.",
      "PTR pertence à zona reversa, não à mesma zona direta do nome."
    ]
  },
  "commonMistakes": [
    "Achar que CNAME redireciona tráfego HTTP.",
    "Colocar CNAME em nome que também precisa de MX/TXT/NS no mesmo ponto da árvore.",
    "Deixar TXT antigo de validação SaaS após remover o serviço.",
    "Configurar MX apontando para nome que não resolve.",
    "Confundir NS de delegação com registro A de servidor DNS.",
    "Ignorar PTR em ambientes de e-mail e investigação."
  ],
  "troubleshooting": {
    "method": "Investigue por tipo de registro, autoridade e contexto da aplicação.",
    "steps": [
      "Identifique qual aplicação falhou e qual tipo de registro ela usa.",
      "Consulte o tipo correto com dig, nslookup ou Resolve-DnsName.",
      "Compare resolvedor local, resolvedor público controlado e servidor autoritativo.",
      "Verifique TTL e possibilidade de cache antigo.",
      "Para CNAME, siga a cadeia até o registro final.",
      "Para MX, valide prioridade e resolução do host de e-mail.",
      "Para TXT, revise SPF, DKIM, DMARC e validações antigas.",
      "Para PTR, consulte a zona reversa e compare com logs."
    ],
    "commands": [
      {
        "windows": [
          "nslookup -type=A www.empresa.com",
          "nslookup -type=MX empresa.com",
          "Resolve-DnsName empresa.com -Type TXT",
          "Resolve-DnsName 203.0.113.10 -Type PTR"
        ],
        "linux": [
          "dig A www.empresa.com",
          "dig AAAA www.empresa.com",
          "dig CNAME app.empresa.com",
          "dig MX empresa.com",
          "dig TXT empresa.com",
          "dig NS empresa.com",
          "dig -x 203.0.113.10"
        ],
        "cisco": [
          "show hosts",
          "show running-config | include name-server",
          "ping nome.exemplo.com",
          "traceroute nome.exemplo.com"
        ],
        "cloud": [
          "listar registros da hosted zone/zona DNS",
          "verificar private hosted zone ou private DNS zone",
          "validar association com VPC/VNet",
          "auditar registros CNAME/TXT órfãos"
        ]
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
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
      "Inventariar registros públicos e privados com dono e justificativa.",
      "Auditar CNAMEs para recursos SaaS ou cloud removidos.",
      "Revisar TXT de validação antigos.",
      "Proteger alterações de NS, MX, TXT e CAA com revisão forte.",
      "Usar DMARC, SPF e DKIM corretamente para e-mail.",
      "Monitorar mudanças em DNS crítico e integrar logs ao SIEM."
    ],
    "badPractices": [
      "Permitir que qualquer pipeline altere registros críticos.",
      "Usar TTL aleatório sem política operacional.",
      "Manter registros órfãos por medo de apagar.",
      "Publicar nomes internos em zona pública.",
      "Usar TXT como depósito permanente de segredos ou tokens sensíveis."
    ],
    "vulnerabilities": [
      {
        "name": "Subdomain takeover",
        "description": "Risco relacionado à aula 7.4 — Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão periódica"
      },
      {
        "name": "DNS hijack",
        "description": "Risco relacionado à aula 7.4 — Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "MFA no registrador"
      },
      {
        "name": "TXT validation abuse",
        "description": "Risco relacionado à aula 7.4 — Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IaC com aprovação"
      },
      {
        "name": "Mail spoofing por SPF/DKIM/DMARC fracos",
        "description": "Risco relacionado à aula 7.4 — Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento de zona"
      },
      {
        "name": "Exposição de nomes internos",
        "description": "Risco relacionado à aula 7.4 — Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Remoção controlada de órfãos"
      },
      {
        "name": "PTR inconsistente dificultando investigação",
        "description": "Risco relacionado à aula 7.4 — Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Política de e-mail autenticado"
      }
    ],
    "mitigations": [
      "Revisão periódica",
      "MFA no registrador",
      "IaC com aprovação",
      "Monitoramento de zona",
      "Remoção controlada de órfãos",
      "Política de e-mail autenticado",
      "Separação entre zonas públicas e privadas"
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
      "Revisão periódica",
      "MFA no registrador",
      "IaC com aprovação",
      "Monitoramento de zona",
      "Remoção controlada de órfãos",
      "Política de e-mail autenticado",
      "Separação entre zonas públicas e privadas"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-7.4",
    "title": "Consulta e análise dos principais registros DNS",
    "labType": "cloud",
    "objective": "Consultar registros A, AAAA, CNAME, MX, TXT, NS, SRV e PTR, interpretar a função de cada um e identificar riscos operacionais e de segurança.",
    "scenario": "Laboratório Neste laboratório você vai consultar diferentes tipos de registros DNS, comparar respostas de resolvedor e autoritativo, montar uma tabela de função/risco e interpretar registros usados por web, e-mail, validação e delegação.",
    "topology": "Estação de trabalho com acesso à Internet, resolvedor DNS configurado, terminal Windows ou Linux e, opcionalmente, uma zona de laboratório própria.",
    "architecture": "Cliente envia consultas a resolvedores; resolvedores consultam autoridades; respostas são interpretadas por tipo de registro e contexto da aplicação.",
    "prerequisites": [
      "Windows PowerShell ou Linux shell",
      "dig/nslookup/Resolve-DnsName",
      "Domínio de laboratório ou domínios públicos para consulta passiva",
      "Planilha ou markdown para registrar evidências"
    ],
    "tools": [
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 165,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Consultar A e AAAA",
        "instruction": "Consulte registros de endereço para um host web.",
        "command": "dig A example.com\ndig AAAA example.com\nResolve-DnsName example.com -Type A",
        "expectedOutput": "Você identifica endereços IPv4 e, se existir, IPv6.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Consultar CNAME",
        "instruction": "Escolha um subdomínio conhecido ou de laboratório e verifique se existe alias.",
        "command": "dig CNAME www.example.com\nnslookup -type=CNAME www.example.com",
        "expectedOutput": "Você diferencia alias de endereço final.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Consultar MX",
        "instruction": "Consulte servidores de e-mail do domínio.",
        "command": "dig MX example.com\nResolve-DnsName example.com -Type MX",
        "expectedOutput": "Você observa prioridade/preference e host de destino.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Consultar TXT",
        "instruction": "Consulte registros TXT e identifique SPF, DKIM, DMARC ou validações.",
        "command": "dig TXT example.com\ndig TXT _dmarc.example.com",
        "expectedOutput": "Você identifica políticas e metadados publicados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Consultar NS e autoridade",
        "instruction": "Liste servidores autoritativos da zona.",
        "command": "dig NS example.com\ndig SOA example.com",
        "expectedOutput": "Você identifica autoridade e servidor primário da zona.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Consultar PTR",
        "instruction": "Faça consulta reversa de um IP de laboratório ou público adequado.",
        "command": "dig -x 8.8.8.8\nResolve-DnsName 8.8.8.8 -Type PTR",
        "expectedOutput": "Você observa o nome reverso, quando existente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Montar matriz de risco",
        "instruction": "Crie uma tabela com tipo, função, dono, risco e validação recomendada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Você produz evidência auditável de leitura e risco dos registros.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, você consegue explicar a função de cada registro, consultar o tipo correto e associar cada tipo a riscos e validações defensivas.",
    "validation": [
      {
        "check": "Consultas executadas com tipo explícito",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Consultas executadas com tipo explícito",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Cadeias CNAME interpretadas",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Cadeias CNAME interpretadas",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "MX e TXT analisados no contexto de e-mail",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "MX e TXT analisados no contexto de e-mail",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "NS/SOA documentados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "NS/SOA documentados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "PTR comparado com expectativa",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "PTR comparado com expectativa",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Matriz de risco preenchida",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Matriz de risco preenchida",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se dig não estiver instalado, use nslookup ou Resolve-DnsName.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se uma resposta não aparecer, confirme se o domínio realmente publica aquele tipo.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se houver diferença entre resolvedores, observe TTL e cache.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se PTR não existir, lembre que reverso depende do dono do bloco IP.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar consulta direta ao autoritativo",
      "Adicionar verificação de CAA",
      "Auditar registros órfãos",
      "Automatizar coleta com script somente-leitura",
      "Integrar monitoramento de alterações DNS"
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
      "Qual evidência mostra que o laboratório de “Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Auditoria de zona DNS fictícia",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns."
  },
  "mentorQuestions": [
    "Quando você deve consultar MX em vez de A?",
    "Por que um CNAME órfão pode virar problema de segurança?",
    "Qual é a diferença operacional entre TXT de SPF e TXT de validação SaaS?"
  ],
  "quiz": [
    {
      "question": "Qual registro DNS mapeia um nome para endereço IPv4?",
      "options": [
        "A",
        "AAAA",
        "MX",
        "PTR"
      ],
      "answer": "A",
      "explanation": "O registro A retorna endereço IPv4 para um nome."
    },
    {
      "question": "Qual registro é usado para indicar servidores que recebem e-mail de um domínio?",
      "options": [
        "NS",
        "MX",
        "SRV",
        "PTR"
      ],
      "answer": "MX",
      "explanation": "MX informa hosts responsáveis pelo recebimento de e-mail do domínio."
    },
    {
      "question": "CNAME representa melhor qual ideia?",
      "options": [
        "Alias para outro nome",
        "Endereço IPv4",
        "Servidor de e-mail",
        "Zona reversa"
      ],
      "answer": "Alias para outro nome",
      "explanation": "CNAME aponta um nome para um nome canônico."
    },
    {
      "question": "Qual registro define autoridade/delegação de uma zona?",
      "options": [
        "NS",
        "TXT",
        "AAAA",
        "PTR"
      ],
      "answer": "NS",
      "explanation": "NS lista servidores autoritativos de uma zona ou delegação."
    },
    {
      "question": "Qual tipo é comumente usado para SPF, DKIM, DMARC e validações de domínio?",
      "options": [
        "TXT",
        "SRV",
        "A",
        "PTR"
      ],
      "answer": "TXT",
      "explanation": "TXT publica texto arbitrário e políticas/validações."
    },
    {
      "question": "Qual registro é associado à resolução reversa IP para nome?",
      "options": [
        "PTR",
        "CNAME",
        "MX",
        "NS"
      ],
      "answer": "PTR",
      "explanation": "PTR é usado em zonas reversas para mapear IP para nome."
    }
  ],
  "flashcards": [
    {
      "front": "A",
      "back": "Registro que retorna endereço IPv4 de um nome."
    },
    {
      "front": "AAAA",
      "back": "Registro que retorna endereço IPv6 de um nome."
    },
    {
      "front": "CNAME",
      "back": "Alias DNS que aponta para um nome canônico."
    },
    {
      "front": "MX",
      "back": "Registro que informa servidores de e-mail de um domínio."
    },
    {
      "front": "TXT",
      "back": "Registro textual usado para políticas, validações e metadados."
    },
    {
      "front": "PTR",
      "back": "Registro de resolução reversa, geralmente IP para nome."
    }
  ],
  "exercises": [
    {
      "title": "Escolha o tipo correto",
      "prompt": "Para cada cenário — site, e-mail, validação SaaS, alias para CDN, resolução reversa — escolha o tipo DNS adequado.",
      "expectedAnswer": "Site: A/AAAA; e-mail: MX; validação: TXT; CDN: CNAME; reverso: PTR."
    },
    {
      "title": "Análise de CNAME",
      "prompt": "Explique por que um CNAME para recurso cloud removido pode ser perigoso.",
      "expectedAnswer": "O subdomínio pode apontar para namespace reutilizável por terceiros, gerando risco de takeover."
    },
    {
      "title": "MX completo",
      "prompt": "Um domínio tem MX para mail.empresa.com, mas mail.empresa.com não possui A/AAAA. Qual impacto?",
      "expectedAnswer": "Servidores remetentes podem não conseguir entregar e-mail porque o destino do MX não resolve para endereço."
    },
    {
      "title": "TXT acumulado",
      "prompt": "Liste riscos de manter TXT antigos de validação após encerrar um SaaS.",
      "expectedAnswer": "Pode manter prova de controle, confundir auditoria, permitir integração indevida e ampliar superfície de ataque."
    }
  ],
  "challenge": {
    "title": "Auditoria de zona DNS fictícia",
    "scenario": "A zona empresa.com possui www CNAME para app-antigo.provedor.net, MX 10 mail.empresa.com, mail sem A, TXT de validação de três SaaS antigos, NS de subdomínio dev para provedor desconhecido e PTR ausente para o IP do servidor de e-mail.",
    "tasks": [
      "Identificar riscos",
      "Classificar severidade",
      "Propor correções",
      "Definir validações pós-correção",
      "Indicar evidências a registrar"
    ],
    "rubric": [
      "Reconhece CNAME órfão",
      "Reconhece MX quebrado",
      "Revisa TXT antigos",
      "Questiona delegação NS",
      "Aponta impacto de PTR no e-mail",
      "Propõe governança e monitoramento"
    ]
  },
  "commentedSolution": {
    "summary": "A zona possui riscos operacionais e de segurança. O CNAME antigo deve ser validado com o dono do serviço e removido ou apontado para recurso ativo. O MX precisa apontar para host resolvível. TXT antigos devem ser revisados e removidos quando não houver dependência. A delegação NS de dev exige dono e evidência. PTR do servidor de e-mail deve ser tratado com o provedor do IP.",
    "steps": [
      "Consultar cada tipo explicitamente",
      "Validar ownership",
      "Checar dependências de negócio",
      "Planejar mudança com TTL adequado",
      "Aplicar correção via processo aprovado",
      "Monitorar logs e respostas autoritativas"
    ]
  },
  "glossary": [
    {
      "term": "A",
      "definition": "Registro DNS que aponta nome para IPv4."
    },
    {
      "term": "AAAA",
      "definition": "Registro DNS que aponta nome para IPv6."
    },
    {
      "term": "CNAME",
      "definition": "Registro de alias para outro nome DNS."
    },
    {
      "term": "MX",
      "definition": "Registro que define servidores de e-mail de um domínio."
    },
    {
      "term": "TXT",
      "definition": "Registro textual usado para políticas, validações e metadados."
    },
    {
      "term": "PTR",
      "definition": "Registro de resolução reversa, normalmente IP para nome."
    }
  ],
  "references": [
    "RFC 1034 — Domain Names: Concepts and Facilities",
    "RFC 1035 — Domain Names: Implementation and Specification",
    "RFC 1912 — Common DNS Operational and Configuration Errors",
    "RFC 7208 — Sender Policy Framework",
    "RFC 7489 — DMARC"
  ],
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Federação e confiança",
      "reason": "TXT, CNAME e validações DNS aparecem em federação, certificados e domínios corporativos."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e automação",
      "reason": "Registros DNS em cloud frequentemente são gerenciados por Terraform e pipelines."
    }
  ],
  "progressRules": {
    "completeAfter": "quiz-and-lab",
    "minimumQuizScore": 70,
    "requiredLab": "lab-7.4",
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
      "7.5"
    ]
  }
};
