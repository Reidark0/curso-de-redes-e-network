export const lesson1505 = {
  "id": "15.5",
  "moduleId": "m15",
  "order": 5,
  "title": "Troubleshooting DNS profissional",
  "subtitle": "Como diagnosticar resolução de nomes usando cliente, cache, resolvedor, zona autoritativa, TTL, split-horizon, DNS privado, service discovery e logs — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "180-240 min",
  "estimatedStudyTimeMinutes": 240,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "troubleshooting",
    "DNS",
    "resolver",
    "cache",
    "TTL",
    "NXDOMAIN",
    "CNAME",
    "split-horizon",
    "DNS privado",
    "service discovery",
    "Kubernetes",
    "cloud networking",
    "SIEM",
    "SOC",
    "caso real",
    "hipótese-evidência",
    "runbook",
    "war room",
    "RCA"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.1",
      "reason": "A mentalidade profissional de troubleshooting define hipótese, escopo e RCA."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Coleta de evidências e linha do tempo são indispensáveis para interpretar cache e TTL."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.4",
      "reason": "DNS depende de conectividade IPv4, rotas, gateway e caminho de retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.7",
      "reason": "DNS público, privado, split-horizon e service discovery foram apresentados no módulo de Cloud Networking."
    },
    {
      "type": "lesson",
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "fundamentos",
      "lesson": "federação e diretórios",
      "reason": "Ambientes corporativos frequentemente integram DNS com diretórios, autenticação e serviços internos."
    }
  ],
  "objectives": [
    "Diagnosticar falhas DNS separando cliente, cache, resolvedor recursivo e zona autoritativa.",
    "Interpretar respostas DNS como NOERROR, NXDOMAIN, SERVFAIL, REFUSED e timeout.",
    "Avaliar impacto de TTL, cache positivo, cache negativo e mudanças recentes.",
    "Investigar split-horizon, DNS privado, forwarders e resolução híbrida.",
    "Relacionar DNS com cloud, private endpoints, Kubernetes e service discovery.",
    "Usar logs DNS como evidência de troubleshooting, segurança e RCA.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um nome que resolve de forma diferente por origem, o aluno identifica se é split-horizon intencional, cache ou erro de zona.",
    "Dado um NXDOMAIN após criação de registro, o aluno avalia cache negativo e autoridade da zona.",
    "Dado um private endpoint inacessível, o aluno valida DNS privado antes de culpar firewall ou banco.",
    "Dado um incidente de aplicação, o aluno separa falha de nome, falha de IP e falha de porta.",
    "Dado logs DNS, o aluno identifica padrões suspeitos e evidências úteis para SOC/RCA.",
    "Dado o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>DNS é um dos serviços mais enganadores de diagnosticar. Quando ele falha, o usuário normalmente não diz “o resolvedor recursivo não conseguiu consultar a zona autoritativa”. Ele diz: “o sistema caiu”, “a internet está fora”, “a VPN não funciona”, “o login não abre” ou “o site está instável”. Em ambientes corporativos, cloud e Kubernetes, boa parte dos incidentes que parecem aplicação, firewall ou certificado começam com resolução de nomes.</p>\n  <p>O objetivo desta aula é transformar DNS em uma trilha de investigação previsível. Você vai aprender a separar falhas de cliente, cache, servidor recursivo, zona autoritativa, registro inexistente, TTL, split-horizon, DNS privado, service discovery e políticas de segurança.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> testar apenas <code>ping nome</code> é insuficiente. Ping pode usar cache local, pode resolver IPv6 primeiro, pode ser bloqueado por ICMP e não prova que o registro correto foi entregue pelo resolvedor esperado.</div>\n  <p>Em segurança, DNS também é uma fonte crítica de detecção. Domínios recém-criados, consultas incomuns, túneis DNS, erros NXDOMAIN em massa e alterações de registros podem indicar comprometimento, má configuração ou tentativa de evasão.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>Antes do DNS, nomes eram distribuídos por arquivos estáticos, como listas de hosts. Isso funcionava quando a internet era pequena, mas não escala para milhares, milhões ou bilhões de nomes. O DNS surgiu como sistema distribuído, hierárquico e cacheável para mapear nomes a informações como endereços IP, servidores de e-mail e dados de verificação.</p>\n  <p>A arquitetura original separou responsabilidades: clientes consultam resolvedores, resolvedores podem consultar a hierarquia, servidores autoritativos respondem por zonas, e caches reduzem tráfego e latência. Essa separação tornou a internet escalável, mas também criou uma cadeia longa de pontos de falha.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Arquivo hosts:</strong> nomes mantidos manualmente.</div><div class=\"timeline-item\"><strong>DNS hierárquico:</strong> raiz, TLDs, domínios e subdomínios.</div><div class=\"timeline-item\"><strong>Cache:</strong> melhora desempenho, mas pode prolongar erro.</div><div class=\"timeline-item\"><strong>DNS corporativo:</strong> integração com diretórios, VPNs e zonas internas.</div><div class=\"timeline-item\"><strong>Cloud e Kubernetes:</strong> DNS privado, service discovery e endpoints dinâmicos.</div></div>\n  <p>Hoje, troubleshooting DNS precisa considerar internet pública, rede interna, cloud privada, resolvers híbridos, registros automatizados por IaC e nomes efêmeros de workloads.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema técnico desta aula é diagnosticar falhas de resolução de nomes de forma profissional, sem confundir sintoma com causa.</p>\n  <p>Sintomas comuns:</p>\n  <ul>\n    <li>um nome não resolve, mas o IP responde;</li>\n    <li>um usuário resolve para um IP e outro usuário resolve para outro;</li>\n    <li>o DNS funciona fora da VPN, mas falha dentro da VPN;</li>\n    <li>um serviço cloud privado resolve para IP público;</li>\n    <li>um registro foi alterado, mas clientes ainda usam o valor antigo;</li>\n    <li>aplicações em Kubernetes não encontram Services internos;</li>\n    <li>o navegador mostra erro de certificado porque o nome aponta para endpoint errado;</li>\n    <li>respostas NXDOMAIN continuam aparecendo após criação do registro;</li>\n    <li>consultas funcionam em um servidor DNS, mas falham em outro;</li>\n    <li>logs mostram aumento de consultas suspeitas, domínios aleatórios ou falhas repetidas.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha:</strong> DNS pode falhar por cache correto, não apenas por servidor errado. Um registro antigo ainda dentro do TTL pode ser comportamento esperado, embora operacionalmente indesejado.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Nome interno resolve para IP público na VPN e para IP privado na LAN</h3>\n  <p><strong>Sintoma observado:</strong> Usuários em VPN não acessam api.interno.empresa.local; na LAN funciona. Alguns clientes ainda resolvem o IP antigo.</p>\n  <p><strong>Impacto operacional:</strong> Acesso remoto para sistemas internos fica indisponível e há risco de expor tráfego interno por caminho público.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente → resolver configurado → forwarder/conditional forwarder → zona privada/autoritativa → IP retornado → rota/política</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>18:00: migração para Private Endpoint</li><li>18:10: TTL antigo ainda válido</li><li>18:30: VPN usa resolver público</li><li>19:00: chamados remotos</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Resolver errado</td><td>Cliente consulta DNS público</td><td>ipconfig /all, resolvectl, scutil</td><td>Alta</td></tr><tr><td>Zona privada não associada</td><td>LAN resolve privado, VPN não</td><td>config da zona/VNet/VPC</td><td>Alta</td></tr><tr><td>Cache/TTL</td><td>Clientes diferentes veem respostas antigas</td><td>dig +trace/TTL/cache flush controlado</td><td>Média</td></tr><tr><td>Registro incorreto</td><td>Autoridade retorna IP errado</td><td>consulta ao autoritativo</td><td>Alta</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>O troubleshooting DNS amadurece quando você para de perguntar “o DNS está funcionando?” e começa a perguntar “qual resolvedor foi consultado, para qual nome, qual tipo de registro, em qual escopo, com qual resposta, em qual horário e com qual TTL?”.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Fase</th><th>Foco</th><th>Erro comum</th><th>Maturidade esperada</th></tr></thead>\n    <tbody>\n      <tr><td>Cliente</td><td>Configuração DNS, cache local, sufixo de busca.</td><td>Testar de outro host e ignorar o afetado.</td><td>Validar o resolvedor real usado pelo cliente.</td></tr>\n      <tr><td>Recursão</td><td>Servidor que resolve em nome do cliente.</td><td>Assumir que todo resolvedor vê a mesma zona.</td><td>Testar cada resolvedor relevante explicitamente.</td></tr>\n      <tr><td>Autoridade</td><td>Servidor dono da zona.</td><td>Alterar cache e esquecer a zona autoritativa.</td><td>Consultar a autoridade para saber a verdade da zona.</td></tr>\n      <tr><td>Cache/TTL</td><td>Propagação operacional e expiração.</td><td>Chamar cache válido de erro.</td><td>Planejar mudanças com TTL e janela.</td></tr>\n      <tr><td>Split-horizon</td><td>Respostas diferentes por origem/contexto.</td><td>Testar de fora e concluir sobre dentro.</td><td>Comparar respostas internas, externas, VPN e cloud.</td></tr>\n      <tr><td>Service discovery</td><td>Registros dinâmicos de aplicações.</td><td>Tratar nome efêmero como estático.</td><td>Validar controller, endpoint, namespace e saúde do serviço.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Troubleshooting DNS profissional</strong> é o processo de rastrear uma consulta de nome desde o cliente até a fonte autoritativa, considerando cache, recursão, escopo de rede, tipo de registro, política, logs e tempo.</p>\n  <p>Uma investigação DNS deve responder:</p>\n  <ol>\n    <li>Qual nome exato foi consultado?</li>\n    <li>Qual tipo de registro foi solicitado: A, AAAA, CNAME, MX, TXT, SRV, PTR?</li>\n    <li>Qual resolvedor o cliente realmente usou?</li>\n    <li>A resposta veio de cache ou da autoridade?</li>\n    <li>O nome existe na zona autoritativa correta?</li>\n    <li>O TTL explica divergência entre clientes?</li>\n    <li>A resposta deveria ser diferente dentro e fora da rede?</li>\n    <li>Há logs de consulta, alteração ou bloqueio?</li>\n    <li>A aplicação usa DNS do sistema operacional, runtime próprio, cache interno ou biblioteca específica?</li>\n  </ol>\n  <div class=\"callout callout--info\"><strong>Ligação:</strong> esta aula depende de DNS público/privado e split-horizon vistos na aula 14.7, além de IPv4, rotas e gateway da aula 15.4.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Quando uma aplicação precisa acessar <code>app.empresa.com</code>, ela normalmente pede ao sistema operacional para resolver o nome. O sistema pode verificar cache local, arquivo hosts, configurações de busca, resolvedor configurado por DHCP/VPN e políticas locais. Depois, o resolvedor recursivo pode responder de cache ou consultar outros servidores até chegar ao autoritativo.</p>\n  <p>A cadeia típica é: aplicação → biblioteca de resolução → cache local → resolvedor recursivo → raiz → TLD → servidor autoritativo → resposta → cache → aplicação. Em redes corporativas, essa cadeia pode incluir DNS interno, forwarder, conditional forwarder, resolver cloud, resolver inbound/outbound, DNSSEC, filtro de segurança, proxy ou agente EDR.</p>\n  <p>Os tipos de resposta também importam. <strong>NOERROR</strong> com registro significa resposta positiva. <strong>NOERROR</strong> sem registro pode indicar que o nome existe, mas não possui aquele tipo de registro. <strong>NXDOMAIN</strong> indica que o nome não existe naquele contexto. <strong>SERVFAIL</strong> indica falha no processamento. <strong>REFUSED</strong> pode indicar política. <strong>Timeout</strong> sugere caminho, firewall, servidor indisponível ou perda.</p>\n  <div class=\"callout callout--warning\"><strong>Detalhe crítico:</strong> um CNAME adiciona uma segunda resolução. O nome original pode estar correto, mas o destino do CNAME pode apontar para zona errada, endpoint público, serviço removido ou nome sem registro A/AAAA.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Em uma arquitetura corporativa moderna, DNS não é um único servidor. Ele costuma ser uma malha composta por:</p>\n  <ul>\n    <li><strong>clientes:</strong> notebooks, servidores, containers, appliances, dispositivos móveis e workloads cloud;</li>\n    <li><strong>resolvedores internos:</strong> servidores corporativos, controladores de domínio, resolvers cloud e caches locais;</li>\n    <li><strong>zonas públicas:</strong> registros expostos na internet para sites, APIs, e-mail e verificação;</li>\n    <li><strong>zonas privadas:</strong> nomes internos para bancos, APIs privadas, endpoints privados e serviços de plataforma;</li>\n    <li><strong>forwarders:</strong> encaminhamento condicional para domínios específicos;</li>\n    <li><strong>service discovery:</strong> nomes gerados por Kubernetes, service mesh, cloud map ou catálogos internos;</li>\n    <li><strong>segurança:</strong> filtros DNS, RPZ, logs de consulta, detecção de domínios suspeitos e SIEM;</li>\n    <li><strong>governança:</strong> IaC, aprovação de mudança, dono do domínio, tags e auditoria.</li>\n  </ul>\n  <p>Essa arquitetura permite respostas diferentes conforme origem, ambiente e rede. Por isso, um teste feito no notebook doméstico não prova necessariamente o comportamento de um servidor dentro da VPC, de um pod no cluster ou de um usuário conectado por VPN.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense no DNS como a central telefônica e o catálogo de endereços de uma empresa enorme. O usuário sabe que quer falar com “Financeiro”, mas não sabe o ramal real. A central consulta catálogos, encaminha para filiais e devolve o número correto. Se o catálogo estiver antigo, se a filial responder diferente, se o ramal mudou ou se a central estiver usando uma cópia em cache, a chamada pode ir para o lugar errado.</p>\n  <p>O erro comum é culpar o telefone. Às vezes o telefone funciona perfeitamente; o problema é que o catálogo apontou para um ramal antigo. Outras vezes o catálogo está certo, mas a pessoa está consultando a central da filial errada. Em DNS, isso corresponde a resolver errado, zona errada, cache antigo, split-horizon mal compreendido ou registro incorreto.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Um usuário acessa <code>portal.empresa.local</code> e recebe erro. O IP direto <code>10.20.30.40</code> funciona. O diagnóstico profissional segue uma sequência:</p>\n  <ol>\n    <li>verificar qual DNS o cliente usa;</li>\n    <li>consultar <code>portal.empresa.local</code> explicitamente nesse DNS;</li>\n    <li>comparar com o DNS esperado da VPN;</li>\n    <li>verificar cache local;</li>\n    <li>validar se o sufixo <code>.local</code> está sendo aplicado corretamente;</li>\n    <li>consultar a zona autoritativa;</li>\n    <li>confirmar se o registro A aponta para <code>10.20.30.40</code>;</li>\n    <li>registrar TTL e horário da alteração.</li>\n  </ol>\n  <p>Esse caso mostra que a rede IP pode estar funcionando e, ainda assim, o acesso por nome falhar por resolução.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Uma empresa possui datacenter, Active Directory, VPN, filiais e múltiplos domínios internos. Após uma mudança, usuários remotos deixam de acessar <code>erp.corp.empresa.com</code>. Internamente, o nome resolve para <code>10.30.10.25</code>. Fora da VPN, resolve para um IP público de WAF. Usuários VPN deveriam receber o IP privado, mas alguns recebem o público.</p>\n  <p>As hipóteses incluem: split-horizon inconsistente, cliente usando DNS doméstico em vez do DNS VPN, cache local antigo, política de split tunnel incorreta, zona privada não associada ao resolver certo ou ordem de DNS alterada por agente de segurança.</p>\n  <p>A solução não é “limpar cache de todos” como primeira resposta. A solução é provar qual resolvedor cada grupo usa, qual resposta cada resolvedor entrega, qual zona é autoritativa e se a política de VPN injeta DNS corretamente.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Uma aplicação em subnet privada deveria acessar um banco gerenciado por Private Endpoint. O DNS correto deveria resolver <code>db.prod.privatelink...</code> para um IP privado. Porém, a aplicação resolve para IP público e tenta sair via NAT. O firewall bloqueia e o time de aplicação conclui que “o banco caiu”.</p>\n  <p>O diagnóstico cloud verifica: associação da private DNS zone à VPC/VNet correta, registro criado pelo private endpoint, resolução a partir da subnet da aplicação, regras de DNS forwarder, rota para o endpoint, security group/NSG e logs de tentativa.</p>\n  <p>Esse exemplo conecta a aula 14.10: Private Link sem DNS privado correto frequentemente vira tráfego público, custo desnecessário, falha de segurança ou indisponibilidade.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, DNS deve ser tratado como configuração versionada e revisável. Registros públicos, zonas privadas, CNAMEs, TTLs, health checks, private endpoints e service discovery podem ser criados por Terraform, Pulumi, CloudFormation, Bicep ou módulos internos de plataforma.</p>\n  <p>Um pipeline maduro não apenas cria registros. Ele valida que:</p>\n  <ul>\n    <li>registros públicos não apontam para IP privado por engano;</li>\n    <li>serviços internos não são publicados em zona pública;</li>\n    <li>TTL de mudança crítica foi reduzido antes da janela;</li>\n    <li>CNAME não aponta para recurso inexistente ou abandonado;</li>\n    <li>zonas privadas estão associadas às redes corretas;</li>\n    <li>alterações de DNS possuem dono, justificativa e plano de rollback;</li>\n    <li>logs de consulta e auditoria estão habilitados onde fazem sentido.</li>\n  </ul>\n  <div class=\"callout callout--success\"><strong>Boa prática:</strong> tratar DNS como parte do contrato da aplicação. Nome, certificado, rota, WAF, load balancer e endpoint privado precisam ser planejados juntos.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>DNS é tanto infraestrutura quanto sensor de segurança. Um host comprometido pode consultar domínios de comando e controle, domínios gerados por algoritmo, domínios recém-criados ou usar DNS tunneling para exfiltração. Ao mesmo tempo, uma configuração errada de DNS pode expor serviços internos, causar takeover de subdomínio ou permitir bypass de private endpoint.</p>\n  <p>Indicadores defensivos importantes:</p>\n  <ul>\n    <li>volume anormal de NXDOMAIN;</li>\n    <li>consultas para domínios aleatórios ou com alta entropia;</li>\n    <li>consultas TXT grandes e repetitivas;</li>\n    <li>resolução de nomes internos a partir de redes externas;</li>\n    <li>mudança inesperada de NS, MX, TXT, CNAME ou A;</li>\n    <li>domínios de typosquatting próximos ao domínio corporativo;</li>\n    <li>registros órfãos apontando para recursos cloud removidos.</li>\n  </ul>\n  <p>Do ponto de vista de investigação, logs DNS ajudam a conectar host, usuário, processo, destino, horário e domínio, especialmente quando o tráfego HTTPS esconde conteúdo da aplicação.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra o caminho lógico de uma investigação DNS profissional, separando cliente, cache, resolvedor, autoridade, zonas privadas, zonas públicas, service discovery e SIEM.</p>\n  <div class=\"diagram-container\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"dns-title dns-desc\">\n      <title id=\"dns-title\">Fluxo de troubleshooting DNS profissional</title>\n      <desc id=\"dns-desc\">Cliente consulta cache local, resolvedor corporativo, zonas públicas e privadas, service discovery e envia logs ao SIEM.</desc>\n      <defs>\n        <marker id=\"arrow-dns\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n      </defs>\n      <rect x=\"25\" y=\"40\" width=\"150\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--client\" />\n      <text x=\"100\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n      <text x=\"100\" y=\"98\" text-anchor=\"middle\" class=\"svg-small\">app/OS/cache</text>\n      <rect x=\"230\" y=\"40\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node\" />\n      <text x=\"315\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Resolvedor</text>\n      <text x=\"315\" y=\"98\" text-anchor=\"middle\" class=\"svg-small\">recursivo/forwarder</text>\n      <rect x=\"460\" y=\"25\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n      <text x=\"545\" y=\"60\" text-anchor=\"middle\" class=\"svg-label\">Zona privada</text>\n      <text x=\"545\" y=\"83\" text-anchor=\"middle\" class=\"svg-small\">VPC/VNet/VPN</text>\n      <rect x=\"460\" y=\"135\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--internet\" />\n      <text x=\"545\" y=\"170\" text-anchor=\"middle\" class=\"svg-label\">Zona pública</text>\n      <text x=\"545\" y=\"193\" text-anchor=\"middle\" class=\"svg-small\">internet/autoritativa</text>\n      <rect x=\"700\" y=\"40\" width=\"210\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--security\" />\n      <text x=\"805\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Service discovery</text>\n      <text x=\"805\" y=\"98\" text-anchor=\"middle\" class=\"svg-small\">Kubernetes/Cloud Map</text>\n      <rect x=\"230\" y=\"275\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--warning\" />\n      <text x=\"315\" y=\"310\" text-anchor=\"middle\" class=\"svg-label\">Falhas comuns</text>\n      <text x=\"315\" y=\"333\" text-anchor=\"middle\" class=\"svg-small\">TTL/NXDOMAIN/cache</text>\n      <rect x=\"460\" y=\"275\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--security\" />\n      <text x=\"545\" y=\"310\" text-anchor=\"middle\" class=\"svg-label\">Logs DNS</text>\n      <text x=\"545\" y=\"333\" text-anchor=\"middle\" class=\"svg-small\">query/auditoria</text>\n      <rect x=\"700\" y=\"275\" width=\"210\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--security\" />\n      <text x=\"805\" y=\"310\" text-anchor=\"middle\" class=\"svg-label\">SIEM/SOC</text>\n      <text x=\"805\" y=\"333\" text-anchor=\"middle\" class=\"svg-small\">detecção e RCA</text>\n      <line x1=\"175\" y1=\"80\" x2=\"230\" y2=\"80\" class=\"svg-link\" marker-end=\"url(#arrow-dns)\" />\n      <line x1=\"400\" y1=\"75\" x2=\"460\" y2=\"65\" class=\"svg-link\" marker-end=\"url(#arrow-dns)\" />\n      <line x1=\"400\" y1=\"90\" x2=\"460\" y2=\"170\" class=\"svg-link\" marker-end=\"url(#arrow-dns)\" />\n      <line x1=\"630\" y1=\"65\" x2=\"700\" y2=\"75\" class=\"svg-link\" marker-end=\"url(#arrow-dns)\" />\n      <line x1=\"315\" y1=\"120\" x2=\"315\" y2=\"275\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-dns)\" />\n      <line x1=\"545\" y1=\"215\" x2=\"545\" y2=\"275\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-dns)\" />\n      <line x1=\"630\" y1=\"315\" x2=\"700\" y2=\"315\" class=\"svg-link\" marker-end=\"url(#arrow-dns)\" />\n      <path d=\"M100 120 C100 430, 805 430, 805 355\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-dns)\" />\n      <text x=\"490\" y=\"450\" text-anchor=\"middle\" class=\"svg-caption\">Troubleshooting maduro compara resposta esperada, resolvedor usado, autoridade, cache, TTL e logs.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um dossiê de investigação DNS. Você vai simular um incidente em que o mesmo nome resolve de formas diferentes conforme origem: notebook na LAN, usuário na VPN, servidor em cloud e pod Kubernetes.</p>\n  <p>O objetivo não é decorar comandos. O objetivo é construir um método para provar qual resolvedor foi usado, qual resposta foi entregue, se a zona correta é autoritativa, se há cache válido, se o split-horizon é intencional e se existe risco de segurança.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Nome interno resolve para IP público na VPN e para IP privado na LAN. <strong>Causa provável a ser comprovada ou descartada:</strong> Split DNS inconsistente, cache com TTL alto, zona privada não associada à rede/VPN ou encaminhador DNS errado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam interpretação de respostas DNS, cache, TTL, NXDOMAIN, CNAME, split-horizon, zonas privadas e investigação com logs.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio apresenta um incidente realista: uma aplicação migrou para private endpoint, mas parte dos clientes ainda resolve o nome para endpoint público. Você deverá diagnosticar sem quebrar produção e sem concluir apenas com base em um teste isolado.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como rastrear a consulta por origem, resolvedor, zona, TTL, CNAME, resposta final, logs e política de rede, separando problema de DNS de problema de conectividade.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Nesta aula, você aprendeu que DNS profissional é investigação de cadeia, contexto e tempo. Não basta perguntar se um nome resolve; é preciso saber onde, por quem, de qual cache, com qual TTL, vindo de qual zona e apontando para qual destino.</p>\n  <ul>\n    <li>DNS é hierárquico, distribuído e cacheável;</li>\n    <li>cliente, cache local, resolvedor recursivo e autoridade podem contar histórias diferentes;</li>\n    <li>TTL explica por que mudanças não aparecem imediatamente;</li>\n    <li>NXDOMAIN pode ser cacheado;</li>\n    <li>split-horizon exige teste por origem e contexto;</li>\n    <li>DNS privado é essencial para private endpoints e redes cloud;</li>\n    <li>service discovery torna nomes dinâmicos parte da arquitetura;</li>\n    <li>logs DNS são úteis para troubleshooting, RCA e detecção de ameaças.</li>\n  </ul>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Split DNS inconsistente, cache com TTL alto, zona privada não associada à rede/VPN ou encaminhador DNS errado..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>15.6 — Troubleshooting TCP, UDP, portas e serviços</strong>, você vai investigar quando o nome resolve e o IP é alcançável, mas a aplicação continua indisponível por causa de porta, handshake, timeout, reset, UDP, estado de firewall ou serviço.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 7",
      "Camada 4",
      "Camada 3"
    ],
    "tcpIpLayers": [
      "Aplicação",
      "Transporte",
      "Internet"
    ],
    "relatedProtocols": [
      "DNS",
      "UDP",
      "TCP",
      "IPv4",
      "IPv6",
      "TLS",
      "HTTP",
      "DHCP",
      "mDNS"
    ],
    "relatedConcepts": [
      "Resolvedor recursivo",
      "Servidor autoritativo",
      "Zona DNS",
      "TTL",
      "Cache",
      "NXDOMAIN",
      "SERVFAIL",
      "CNAME",
      "A",
      "AAAA",
      "MX",
      "TXT",
      "SRV",
      "PTR",
      "Split-horizon",
      "Private DNS zone",
      "Service discovery",
      "CoreDNS"
    ],
    "ports": [
      "UDP/53",
      "TCP/53",
      "TCP/853 em DNS over TLS como contexto",
      "HTTPS/443 em DNS over HTTPS como contexto",
      "UDP/TCP usados pela aplicação após resolução"
    ]
  },
  "lab": {
    "id": "lab-15.5",
    "title": "Caso guiado: Nome interno resolve para IP público na VPN e para IP privado na LAN",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Usuários em VPN não acessam api.interno.empresa.local; na LAN funciona. Alguns clientes ainda resolvem o IP antigo. Impacto: Acesso remoto para sistemas internos fica indisponível e há risco de expor tráfego interno por caminho público. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente → resolver configurado → forwarder/conditional forwarder → zona privada/autoritativa → IP retornado → rota/política",
    "architecture": "Arquitetura investigada: Cliente → resolver configurado → forwarder/conditional forwarder → zona privada/autoritativa → IP retornado → rota/política. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
    "prerequisites": [
      "Ambiente de laboratório, simulação, Packet Tracer/GNS3/cloud de teste ou execução conceitual autorizada.",
      "Conhecimento dos módulos anteriores de Redes, Segurança e Cloud.",
      "Não alterar produção sem aprovação, janela, backup e rollback."
    ],
    "tools": [
      "Editor de texto para dossiê",
      "Planilha para matriz hipótese-evidência",
      "Windows PowerShell/CMD",
      "Linux terminal",
      "Wireshark ou tcpdump quando aplicável",
      "Logs de firewall/LB/DNS/cloud/SIEM quando disponíveis",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "180-240 min",
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Executar somente em ambiente autorizado.",
      "Não abrir regras amplas nem desativar controles como atalho.",
      "Preservar logs e evidências antes de mudanças.",
      "Sanitizar dados sensíveis em capturas e prints.",
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir nome e expectativa",
        "instruction": "Registre FQDN, IP esperado por origem, TTL e autoridade.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Matriz nome → origem → resposta esperada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Identificar resolvedor do cliente",
        "instruction": "Colete DNS recebido na LAN, VPN e cloud.",
        "command": "ipconfig /all; Resolve-DnsName api.interno.empresa.local; Resolve-DnsName api.interno.empresa.local -Server <dns-corporativo>",
        "expectedOutput": "Resolvedores por perfil.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Comparar respostas",
        "instruction": "Consulte o mesmo nome em LAN, VPN, cloud e DNS público/controlado.",
        "command": "resolvectl status; dig api.interno.empresa.local; dig @<dns-corporativo> api.interno.empresa.local +ttlunits",
        "expectedOutput": "Tabela de respostas e TTL.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Validar autoridade",
        "instruction": "Consulte zona autoritativa ou configuração de DNS privado.",
        "command": "Verificar associação de private hosted zone/private DNS zone, conditional forwarders e logs de query",
        "expectedOutput": "Registro fonte confirmado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Analisar cache",
        "instruction": "Verifique TTL e se flush resolveria apenas cliente ou problema de zona.",
        "command": "Verificar associação de private hosted zone/private DNS zone, conditional forwarders e logs de query",
        "expectedOutput": "Cache separado de configuração errada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Validar rota para IP resolvido",
        "instruction": "Confirme se o IP retornado é alcançável pelo perfil.",
        "command": "Verificar associação de private hosted zone/private DNS zone, conditional forwarders e logs de query",
        "expectedOutput": "DNS conectado ao caminho real.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Corrigir encaminhamento/associação",
        "instruction": "Ajuste zona privada, forwarder ou DNS entregue pela VPN.",
        "command": "Verificar associação de private hosted zone/private DNS zone, conditional forwarders e logs de query",
        "expectedOutput": "Correção controlada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Documentar prevenção",
        "instruction": "Defina padrão de nomes, TTL e teste pós-mudança.",
        "command": "Verificar associação de private hosted zone/private DNS zone, conditional forwarders e logs de query",
        "expectedOutput": "Runbook DNS atualizado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Resposta correta por origem",
        "command": "Resolve-DnsName/dig de LAN e VPN",
        "expected": "IP privado esperado para acesso interno.",
        "ifFails": "Corrigir DNS entregue pela VPN ou associação de zona."
      },
      {
        "check": "TTL coerente",
        "command": "dig +ttlunits",
        "expected": "TTL compatível com mudança planejada.",
        "ifFails": "Reduzir TTL antes de migrações futuras."
      },
      {
        "check": "Acesso ao IP resolvido",
        "command": "curl/Test-NetConnection",
        "expected": "Conexão ao IP retornado pelo DNS.",
        "ifFails": "Separar falha DNS de rota/firewall."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Flush DNS resolve só um cliente",
        "probableCause": "Cache local, não causa raiz",
        "howToConfirm": "Comparar com outro cliente e autoritativo",
        "fix": "Corrigir TTL/processo de mudança."
      },
      {
        "symptom": "LAN funciona e VPN não",
        "probableCause": "VPN recebeu DNS errado ou sem forwarder",
        "howToConfirm": "Ver perfil VPN e logs DNS",
        "fix": "Entregar DNS corporativo e rota adequada."
      },
      {
        "symptom": "Nome resolve certo, mas não conecta",
        "probableCause": "Problema posterior a DNS",
        "howToConfirm": "Testar TCP/rota/firewall",
        "fix": "Encaminhar para hipótese de caminho/política."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "ipconfig/resolvectl",
      "dig/Resolve-DnsName por origem",
      "TTL",
      "config da zona privada",
      "logs de query",
      "teste TCP ao IP resolvido"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Planeje uma migração de FQDN para Private Endpoint sem quebrar usuários remotos e sem depender de flush manual em massa.",
    "solution": "A solução reduz TTL antes da mudança, valida resolvers por perfil, associa zona privada às redes certas, testa LAN/VPN/cloud e mantém rollback de registro. Flush DNS é mitigação limitada, não plano de migração."
  },
  "exercises": [
    {
      "id": "ex15.5.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Nome interno resolve para IP público na VPN e para IP privado na LAN”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.5.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.5.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.5.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Nome interno resolve para IP público na VPN e para IP privado na LAN”, qual atitude é mais profissional antes de alterar configuração?",
      "opts": [
        "Coletar evidências ligadas às hipóteses principais",
        "Reiniciar todos os equipamentos do caminho",
        "Liberar any-any temporariamente sem registro",
        "Apagar caches e logs para começar limpo"
      ],
      "a": 0,
      "exp": "A alteração deve vir depois de evidência suficiente, com escopo e rollback.",
      "difficulty": "intermediário",
      "topic": "método"
    },
    {
      "id": "q15.5.p1.2",
      "type": "evidência",
      "q": "O que diferencia evidência de opinião durante um incidente?",
      "opts": [
        "Evidência pode ser verificada por log, comando, métrica, captura ou configuração",
        "Evidência é a hipótese defendida pelo profissional mais experiente",
        "Evidência é qualquer relato de usuário",
        "Evidência é sempre um print de tela"
      ],
      "a": 0,
      "exp": "Relatos são importantes, mas evidência técnica precisa ser verificável e interpretada no contexto.",
      "difficulty": "iniciante",
      "topic": "evidência"
    },
    {
      "id": "q15.5.p1.3",
      "type": "segurança",
      "q": "Por que uma mitigação emergencial deve ter escopo, expiração e rollback?",
      "opts": [
        "Para evitar que uma exceção temporária vire risco permanente",
        "Para deixar a mudança mais lenta sem benefício",
        "Porque toda mitigação deve desligar logs",
        "Porque rollback só é necessário em cloud"
      ],
      "a": 0,
      "exp": "Mudanças emergenciais sem governança tendem a virar dívida operacional e vulnerabilidade.",
      "difficulty": "intermediário",
      "topic": "mitigação"
    },
    {
      "id": "q15.5.p1.4",
      "type": "RCA",
      "q": "Uma boa RCA deve conter:",
      "opts": [
        "Causa sustentada por evidências, fatores contribuintes e ações preventivas",
        "Apenas o comando que resolveu",
        "O nome da pessoa culpada",
        "Todos os logs brutos sem interpretação"
      ],
      "a": 0,
      "exp": "RCA transforma incidente em aprendizado operacional e melhoria do sistema.",
      "difficulty": "intermediário",
      "topic": "RCA"
    },
    {
      "question": "Qual é a primeira pergunta em troubleshooting DNS profissional?",
      "options": [
        "Qual switch está ligado?",
        "Qual nome, tipo de registro, origem e resolvedor foram usados?",
        "Qual navegador é mais rápido?",
        "Qual MTU do backbone?"
      ],
      "correctAnswer": 1,
      "explanation": "DNS precisa ser analisado por nome, tipo, origem, resolvedor, resposta e tempo."
    },
    {
      "question": "O que TTL influencia?",
      "options": [
        "Tempo que uma resposta pode permanecer em cache",
        "Tamanho máximo do cabo Ethernet",
        "Quantidade de VLANs",
        "Porta TCP usada pelo DNS"
      ],
      "correctAnswer": 0,
      "explanation": "TTL orienta quanto tempo uma resposta DNS pode ser cacheada."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.5.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.5.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.5.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.5.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.5.p1.5",
      "front": "O que uma RCA não deve ser?",
      "back": "Não deve ser caça a culpados nem lista de comandos; deve explicar causa, fatores contribuintes e prevenção.",
      "tags": [
        "RCA",
        "postmortem"
      ],
      "difficulty": "iniciante"
    }
  ],
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual parte do caso “Nome interno resolve para IP público na VPN e para IP privado na LAN” é sintoma e qual parte ainda é apenas hipótese?",
      "hints": [
        "Separe o que foi observado do que foi inferido.",
        "Procure frases que parecem causa sem evidência."
      ],
      "expectedIdeas": [
        "sintoma observável",
        "hipótese",
        "evidência",
        "escopo"
      ],
      "explanation": "A maturidade de troubleshooting começa quando o aluno para de tratar hipótese como fato."
    },
    {
      "type": "diagnóstico",
      "question": "Qual evidência você coletaria primeiro para reduzir mais incerteza nesse caso?",
      "hints": [
        "Prefira evidência não destrutiva.",
        "Escolha algo que diferencie duas hipóteses fortes."
      ],
      "expectedIdeas": [
        "comando",
        "log",
        "métrica",
        "captura",
        "comparação afetado/não afetado"
      ],
      "explanation": "A primeira evidência deve separar caminhos de investigação, não apenas gerar mais dados."
    },
    {
      "type": "cenário real",
      "question": "Que mitigação temporária reduz impacto sem aumentar demais o risco de segurança?",
      "hints": [
        "Evite any-any.",
        "Defina escopo, expiração, monitoramento e rollback."
      ],
      "expectedIdeas": [
        "mitigação limitada",
        "aprovação",
        "rollback",
        "monitoramento",
        "menor privilégio"
      ],
      "explanation": "Incidentes pressionam por atalhos; o profissional reduz impacto preservando controle."
    }
  ],
  "challenge": {
    "title": "Desafio P1 — Nome interno resolve para IP público na VPN e para IP privado na LAN",
    "scenario": "Usuários em VPN não acessam api.interno.empresa.local; na LAN funciona. Alguns clientes ainda resolvem o IP antigo.",
    "tasks": [
      "Montar problem statement.",
      "Construir matriz afetado/não afetado.",
      "Criar matriz hipótese-evidência.",
      "Executar ou simular comandos e coleta de logs.",
      "Definir mitigação com rollback.",
      "Produzir RCA com ações preventivas."
    ],
    "constraints": [
      "Não assumir causa sem evidência.",
      "Não usar mudança ampla como primeira resposta.",
      "Toda conclusão deve apontar para comando, log, métrica, captura ou configuração.",
      "Toda mitigação deve ter escopo e rollback."
    ],
    "expectedDeliverables": [
      "Dossiê do incidente",
      "Matriz hipótese-evidência",
      "Linha do tempo",
      "Plano de validação",
      "RCA",
      "Runbook atualizado"
    ],
    "gradingRubric": [
      {
        "criterion": "Escopo e problem statement",
        "points": 15,
        "description": "Delimita afetados, serviço, janela e sintoma sem causa prematura."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Liga hipóteses a evidências verificáveis e interpreta resultados corretamente."
      },
      {
        "criterion": "Mitigação segura",
        "points": 20,
        "description": "Reduz impacto sem criar exposição ampla, com rollback e monitoramento."
      },
      {
        "criterion": "RCA",
        "points": 25,
        "description": "Explica causa, fatores contribuintes e prevenção com dono e critério de aceite."
      },
      {
        "criterion": "Comunicação",
        "points": 15,
        "description": "Comunica impacto, estado e próximas ações com clareza."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução reduz TTL antes da mudança, valida resolvers por perfil, associa zona privada às redes certas, testa LAN/VPN/cloud e mantém rollback de registro. Flush DNS é mitigação limitada, não plano de migração.",
    "steps": [
      "Começar pelo sintoma observável e escopo.",
      "Desenhar o fluxo esperado.",
      "Priorizar hipóteses que explicam afetado e não afetado.",
      "Coletar evidências não destrutivas.",
      "Tomar decisão com base em evidência.",
      "Mitigar com escopo e rollback.",
      "Validar recuperação.",
      "Produzir RCA e ações preventivas."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar várias correções ao mesmo tempo.",
        "whyItIsWrong": "Pode recuperar o serviço, mas destrói a capacidade de saber a causa e cria risco de regressão."
      },
      {
        "answer": "Liberar tráfego amplo sem evidência.",
        "whyItIsWrong": "Aumenta superfície de ataque e transforma incidente operacional em risco de segurança."
      },
      {
        "answer": "Encerrar após o serviço voltar.",
        "whyItIsWrong": "Sem RCA e prevenção, a falha tende a voltar."
      }
    ],
    "finalAnswer": "A resposta correta para “Nome interno resolve para IP público na VPN e para IP privado na LAN” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Resolvedor recursivo",
      "shortDefinition": "DNS que resolve nomes em nome do cliente.",
      "longDefinition": "Servidor DNS que recebe consultas de clientes e obtém respostas usando cache ou consultando outros servidores na hierarquia.",
      "example": "Um DNS corporativo consulta a internet ou zonas internas por um notebook.",
      "relatedTerms": [
        "Cache",
        "Forwarder"
      ],
      "relatedLessons": [
        "15.5",
        "14.7"
      ]
    },
    {
      "term": "Servidor autoritativo",
      "shortDefinition": "Fonte oficial de uma zona DNS.",
      "longDefinition": "Servidor responsável por responder com autoridade pelos registros de uma zona específica.",
      "example": "O servidor autoritativo de empresa.com responde por app.empresa.com.",
      "relatedTerms": [
        "Zona DNS",
        "NS"
      ],
      "relatedLessons": [
        "15.5"
      ]
    },
    {
      "term": "TTL",
      "shortDefinition": "Tempo de vida de uma resposta DNS em cache.",
      "longDefinition": "Valor que orienta por quanto tempo resolvers e clientes podem armazenar uma resposta antes de consultar novamente.",
      "example": "Um TTL de 300 segundos facilita mudanças mais rápidas que um TTL de 86400 segundos.",
      "relatedTerms": [
        "Cache",
        "Propagação"
      ],
      "relatedLessons": [
        "15.5"
      ]
    },
    {
      "term": "NXDOMAIN",
      "shortDefinition": "Nome inexistente no contexto consultado.",
      "longDefinition": "Resposta DNS indicando que o domínio consultado não existe conforme a cadeia de resolução usada.",
      "example": "api.interno.empresa.com retorna NXDOMAIN fora da VPN se só existir em zona privada.",
      "relatedTerms": [
        "Cache negativo",
        "Autoridade"
      ],
      "relatedLessons": [
        "15.5"
      ]
    },
    {
      "term": "Split-horizon DNS",
      "shortDefinition": "Respostas diferentes conforme origem.",
      "longDefinition": "Desenho no qual o mesmo FQDN pode retornar IP privado para clientes internos e IP público para externos.",
      "example": "portal.empresa.com resolve para 10.10.10.5 na VPN e para 203.0.113.10 na internet.",
      "relatedTerms": [
        "DNS privado",
        "DNS público"
      ],
      "relatedLessons": [
        "14.7",
        "15.5"
      ]
    },
    {
      "term": "Service discovery",
      "shortDefinition": "Descoberta dinâmica de serviços por nome.",
      "longDefinition": "Mecanismo que permite que aplicações encontrem serviços por nomes ou registros atualizados dinamicamente, comum em Kubernetes e plataformas cloud.",
      "example": "api.default.svc.cluster.local aponta para um Service Kubernetes.",
      "relatedTerms": [
        "CoreDNS",
        "Kubernetes Service"
      ],
      "relatedLessons": [
        "14.11",
        "15.5"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Nome interno resolve para IP público na VPN e para IP privado na LAN”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.5"
      ]
    },
    {
      "term": "Matriz hipótese-evidência",
      "shortDefinition": "Tabela que conecta hipóteses a evidências verificáveis.",
      "longDefinition": "Ferramenta de troubleshooting usada para priorizar testes, evitar achismo e registrar por que uma hipótese foi confirmada ou descartada.",
      "example": "Hipótese DNS deve apontar para evidências como resolvedor usado, resposta autoritativa, TTL e diferença entre origens.",
      "relatedTerms": [
        "evidência",
        "diagnóstico",
        "linha do tempo"
      ],
      "relatedLessons": [
        "15.1",
        "15.2",
        "15.5"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de explicar causa, fatores contribuintes, impacto, detecção, resposta e ações preventivas após um incidente.",
      "example": "Uma RCA madura não culpa pessoas; ela melhora processo, monitoramento, automação e validação.",
      "relatedTerms": [
        "postmortem",
        "runbook",
        "ação preventiva"
      ],
      "relatedLessons": [
        "15.12"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "RFC 1034 — Domain Names: Concepts and Facilities",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/info/rfc1034/",
      "note": "Definição conceitual básica do Domain Name System."
    },
    {
      "type": "standard",
      "title": "RFC 1035 — Domain Names: Implementation and Specification",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/info/rfc1035/",
      "note": "Especificação de protocolo, formato e implementação DNS."
    },
    {
      "type": "standard",
      "title": "RFC 2308 — Negative Caching of DNS Queries",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc2308.html",
      "note": "Referência sobre cache de respostas negativas como NXDOMAIN."
    },
    {
      "type": "official-doc",
      "title": "Guidance for troubleshooting DNS",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/troubleshoot-dns-guidance",
      "note": "Checklist de diagnóstico de DNS em ambientes Windows Server."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 14.7 — DNS público, DNS privado, split-horizon e service discovery",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m14/lesson-14-07",
      "note": "Base conceitual de DNS cloud e privado."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting DNS profissional\".",
      "Preservar evidências antes de aplicar mudanças destrutivas ou rollback.",
      "Usar menor privilégio, segmentação e escopo explícito em qualquer teste prático.",
      "Registrar comandos, horários, origem, destino, resultado esperado e resultado observado.",
      "Transformar aprendizados em checklist, runbook, teste automatizado ou melhoria de monitoramento."
    ],
    "badPractices": [
      "Liberar any-any, desativar firewall, ignorar TLS ou remover controles sem evidência e aprovação.",
      "Executar vários ajustes ao mesmo tempo e depois não saber qual ação mudou o sintoma.",
      "Apagar caches, reiniciar serviços ou rotacionar logs antes de coletar evidências.",
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir mitigação com causa raiz.",
      "Confundir correlação temporal com prova de causalidade.",
      "Testar a partir de uma origem que não representa os usuários afetados.",
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar troubleshooting profissional, evidências, hipóteses, testes controlados, RCA e comunicação de incidentes com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Exceção emergencial permanente",
        "description": "No caso “Nome interno resolve para IP público na VPN e para IP privado na LAN”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting DNS profissional",
              "description": "Em Troubleshooting DNS profissional, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
              "defensiveExplanation": "O risco aparece quando comandos, PCAPs, logs, métricas, rotas, DNS, firewall e mudanças recentes não são correlacionados em uma linha do tempo única.",
              "mitigation": "Coletar evidências mínimas antes de alterar, registrar horário/fonte/comando, testar uma hipótese por vez, manter plano de rollback, validar regressão e transformar achados recorrentes em runbooks."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Alertar mudanças emergenciais sem expiração.",
      "Correlacionar logs de rede, identidade, cloud e aplicação durante a janela do incidente.",
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
    ],
    "hardening": [
      "Padronizar runbooks de coleta antes de mudança.",
      "Exigir revisão pós-incidente com ações preventivas rastreáveis.",
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Detectar aumento súbito de regras temporárias, bypass TLS, queda de logs ou tráfego fora do baseline.",
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.5."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Usuários em VPN não acessam api.interno.empresa.local; na LAN funciona. Alguns clientes ainda resolvem o IP antigo.",
      "Impacto: Acesso remoto para sistemas internos fica indisponível e há risco de expor tráfego interno por caminho público.",
      "Causa provável a validar: Split DNS inconsistente, cache com TTL alto, zona privada não associada à rede/VPN ou encaminhador DNS errado.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting DNS profissional.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Quem é afetado e quem não é afetado?",
      "Qual hipótese explica melhor todos os sintomas sem contradizer evidências?",
      "Que evidência confirmaria ou negaria a hipótese mais provável?",
      "A mitigação proposta preserva segurança, logs e rollback?",
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 15.5?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all; Resolve-DnsName api.interno.empresa.local; Resolve-DnsName api.interno.empresa.local -Server <dns-corporativo>",
        "purpose": "Comparar resolvedor recebido e resposta por servidor.",
        "expectedObservation": "Servidor DNS usado, IP retornado e TTL.",
        "interpretation": "Diferença entre DNS padrão e DNS corporativo aponta para split DNS/VPN."
      },
      {
        "platform": "Linux",
        "command": "resolvectl status; dig api.interno.empresa.local; dig @<dns-corporativo> api.interno.empresa.local +ttlunits",
        "purpose": "Validar servidor DNS, resposta e TTL.",
        "expectedObservation": "Resolver efetivo e IP por origem.",
        "interpretation": "TTL e servidor consultado explicam inconsistências temporárias."
      },
      {
        "platform": "Cloud/DNS",
        "command": "Verificar associação de private hosted zone/private DNS zone, conditional forwarders e logs de query",
        "purpose": "Confirmar se a rede da VPN alcança a zona privada.",
        "expectedObservation": "Zona associada às redes corretas e queries recebidas.",
        "interpretation": "Sem associação/forwarder, clientes remotos podem cair no DNS público."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Resolver errado” está com prioridade Alta e a evidência necessária é “ipconfig /all, resolvectl, scutil”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Zona privada não associada” está com prioridade Alta e a evidência necessária é “config da zona/VNet/VPC”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Cache/TTL” está com prioridade Média e a evidência necessária é “dig +trace/TTL/cache flush controlado”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Registro incorreto” está com prioridade Alta e a evidência necessária é “consulta ao autoritativo”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A evidência contradiz a hipótese favorita",
        "then": "Não force a conclusão. Atualize a matriz, registre a hipótese descartada e avance para a próxima explicação compatível com os sintomas."
      },
      {
        "if": "A mitigação proposta amplia acesso, desativa controle ou apaga evidência",
        "then": "Pausar, documentar risco, obter aprovação formal, reduzir escopo e definir rollback antes de agir."
      }
    ]
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
      "15.6"
    ]
  },
  "diagnosticCase": {
    "title": "Nome interno resolve para IP público na VPN e para IP privado na LAN",
    "symptom": "Usuários em VPN não acessam api.interno.empresa.local; na LAN funciona. Alguns clientes ainda resolvem o IP antigo.",
    "businessImpact": "Acesso remoto para sistemas internos fica indisponível e há risco de expor tráfego interno por caminho público.",
    "likelyRootCause": "Split DNS inconsistente, cache com TTL alto, zona privada não associada à rede/VPN ou encaminhador DNS errado.",
    "timeline": [
      "18:00: migração para Private Endpoint",
      "18:10: TTL antigo ainda válido",
      "18:30: VPN usa resolver público",
      "19:00: chamados remotos"
    ],
    "expectedFlow": "Cliente → resolver configurado → forwarder/conditional forwarder → zona privada/autoritativa → IP retornado → rota/política",
    "hypothesisMatrix": [
      {
        "hypothesis": "Resolver errado",
        "why": "Cliente consulta DNS público",
        "evidence": "ipconfig /all, resolvectl, scutil",
        "priority": "Alta"
      },
      {
        "hypothesis": "Zona privada não associada",
        "why": "LAN resolve privado, VPN não",
        "evidence": "config da zona/VNet/VPC",
        "priority": "Alta"
      },
      {
        "hypothesis": "Cache/TTL",
        "why": "Clientes diferentes veem respostas antigas",
        "evidence": "dig +trace/TTL/cache flush controlado",
        "priority": "Média"
      },
      {
        "hypothesis": "Registro incorreto",
        "why": "Autoridade retorna IP errado",
        "evidence": "consulta ao autoritativo",
        "priority": "Alta"
      }
    ],
    "requiredArtifacts": [
      "problem statement",
      "escopo afetado/não afetado",
      "mapa do fluxo",
      "matriz hipótese-evidência",
      "comandos/logs/capturas",
      "decisão",
      "mitigação",
      "validação",
      "RCA"
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    }
  ]
};
