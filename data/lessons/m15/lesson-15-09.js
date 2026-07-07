export const lesson1509 = {
  "id": "15.9",
  "moduleId": "m15",
  "order": 9,
  "title": "Troubleshooting VPN, túneis e acesso remoto",
  "subtitle": "Como diagnosticar VPN e acesso remoto separando identidade, túnel, perfil, rotas, DNS, políticas, aplicação, retorno, MTU e evidências — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "220-280 min",
  "estimatedStudyTimeMinutes": 280,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 295,
  "tags": [
    "troubleshooting",
    "VPN",
    "IPsec",
    "IKEv2",
    "SSL VPN",
    "acesso remoto",
    "túneis",
    "MFA",
    "certificados",
    "rotas",
    "split tunnel",
    "DNS interno",
    "MTU",
    "BGP",
    "site-to-site",
    "Zero Trust",
    "segurança",
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
      "reason": "Define método profissional de troubleshooting, hipótese, mitigação, rollback e RCA."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Ensina coleta de evidências, baseline e linha do tempo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.4",
      "reason": "VPN depende de IPv4, rotas, gateway, ICMP e rota de retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.5",
      "reason": "Acesso remoto falha frequentemente por DNS interno, split-horizon e cache."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.7",
      "reason": "Firewall, ACL, NAT e políticas são parte essencial do caminho VPN."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.8",
      "reason": "VPN híbrida, links dedicados e BGP na cloud são base para site-to-site."
    }
  ],
  "objectives": [
    "Diagnosticar VPN de acesso remoto e site-to-site separando controle do túnel e plano de dados.",
    "Interpretar sintomas de autenticação, MFA, certificado, IKE/TLS, perfil, IP, rotas, DNS, firewall, aplicação e retorno.",
    "Diferenciar túnel conectado, túnel saudável, rota instalada, política permitida e aplicação acessível.",
    "Investigar split tunneling, full tunneling, DNS interno, CIDR sobreposto, NAT, MTU/MSS e lentidão.",
    "Correlacionar logs de cliente VPN, gateway, IdP, firewall, DNS, flow logs, SIEM e aplicação.",
    "Propor correções seguras com menor privilégio, rollback, evidências e prevenção operacional.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um usuário que conecta à VPN mas não acessa sistemas, o aluno verifica perfil, IP, rotas, DNS, firewall e retorno antes de culpar o cliente.",
    "Dado um túnel site-to-site up sem tráfego, o aluno analisa selectors, BGP, rotas, NAT, CIDR sobreposto e políticas.",
    "Dado um problema de lentidão, o aluno considera MTU/MSS, perda, jitter, capacidade do gateway, DNS e caminho de internet.",
    "Dado um erro de autenticação, o aluno diferencia senha, MFA, certificado, grupo, IdP, Radius, postura e relógio.",
    "Dado um incidente de acesso remoto, o aluno produz matriz por usuário, perfil, origem, destino, porta, evidência e correção segura.",
    "Dado o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>VPN e acesso remoto são pontos onde rede, identidade, criptografia, endpoint, DNS, firewall, roteamento e experiência do usuário se encontram. Quando um usuário remoto diz “a VPN conecta, mas nada funciona”, isso raramente significa uma única coisa. Pode ser autenticação, MFA, certificado, postura do dispositivo, IP atribuído, rota empurrada, split tunneling, DNS interno, firewall, NAT, sobreposição de CIDR, MTU, rota de retorno ou aplicação indisponível.</p>\n  <p>A motivação desta aula é transformar troubleshooting de VPN em investigação estruturada. O aluno precisa parar de tratar VPN como uma “caixa mágica” e passar a enxergar o caminho completo: cliente remoto → internet → gateway VPN → autenticação → túnel → rotas → DNS → política → recurso interno → retorno.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma VPN pode aparecer como “conectada” no cliente e ainda assim estar inutilizável. O túnel pode estar ativo, mas sem rota correta; a rota pode existir, mas DNS interno falhar; DNS pode resolver, mas firewall bloquear; firewall pode permitir, mas a aplicação exigir origem diferente; tudo pode funcionar para um usuário e falhar para outro por grupo, postura, perfil ou política.</div>\n  <p>Para Segurança da Informação, VPN é sensível porque amplia a borda da rede até dispositivos fora do perímetro físico. Para DevSecOps, VPN afeta pipelines, acesso administrativo, bastions, bancos privados e ambientes cloud. Para operação, VPN é uma das fontes mais frequentes de chamados com alto impacto humano: pessoas trabalhando de casa, filiais conectadas por túneis, fornecedores acessando sistemas e equipes de incidente precisando entrar durante indisponibilidades.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>VPN surgiu para resolver um problema simples de explicar e difícil de operar: como transportar tráfego privado por uma rede pública sem confiar nessa rede pública. Antes de links dedicados baratos e cloud, empresas precisavam conectar filiais, parceiros e usuários remotos sem expor diretamente todos os serviços internos à internet.</p>\n  <p>As primeiras arquiteturas corporativas usavam links dedicados ou redes privadas de operadoras. Depois, IPsec permitiu criar túneis criptográficos na camada de rede sobre a internet. Em paralelo, soluções SSL/TLS VPN facilitaram acesso remoto de usuários, muitas vezes usando navegadores ou clientes leves. Com cloud, VPN passou a conectar datacenters a VPCs/VNets, usuários a ambientes privados, e redes híbridas a múltiplos provedores.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Links privados:</strong> conectividade dedicada, previsível, mas cara e lenta de contratar.</div><div class=\"timeline-item\"><strong>IPsec site-to-site:</strong> túneis entre gateways para conectar redes inteiras.</div><div class=\"timeline-item\"><strong>Remote access VPN:</strong> usuário individual recebe acesso criptografado a recursos internos.</div><div class=\"timeline-item\"><strong>SSL/TLS VPN:</strong> foco em facilidade de uso, portal, cliente e integração com identidade.</div><div class=\"timeline-item\"><strong>Cloud VPN:</strong> conexão entre datacenter, VPC/VNet, transit, hub-spoke e BGP.</div><div class=\"timeline-item\"><strong>ZTNA/SASE:</strong> evolução em que acesso deixa de depender apenas de estar “dentro da VPN” e passa a avaliar identidade, contexto e aplicação.</div></div>\n  <p>A evolução trouxe alternativas mais flexíveis, mas não eliminou VPN. Em muitos ambientes, VPN ainda é necessária para redes híbridas, administração, continuidade, integração com fornecedores e acesso a serviços privados. O ponto profissional é saber quando VPN resolve o problema e quando ela só mascara desenho de acesso, identidade ou segmentação mal resolvidos.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema desta aula é diagnosticar falhas em VPN e acesso remoto sem confundir “túnel estabelecido” com “acesso funcionando”. Em VPN, existem pelo menos cinco planos que podem falhar: autenticação, negociação criptográfica, atribuição de endereço, roteamento/DNS e política de acesso ao recurso.</p>\n  <p>Sintomas típicos:</p>\n  <ul>\n    <li><strong>Cliente não autentica:</strong> senha, MFA, certificado, grupo, relógio, IdP, Radius, SAML/OIDC ou postura do endpoint podem estar envolvidos;</li>\n    <li><strong>VPN autentica mas não conecta:</strong> negociação IKE/TLS, proposta criptográfica, certificado, porta bloqueada, NAT traversal ou gateway indisponível;</li>\n    <li><strong>Conecta mas não acessa nada:</strong> rota ausente, split tunnel incorreto, DNS interno inexistente, firewall bloqueando ou pool de IP sem permissão;</li>\n    <li><strong>Acessa IP mas não nome:</strong> DNS interno, suffix search, split DNS, resolvedor empurrado ou cache local;</li>\n    <li><strong>Acessa alguns sistemas e outros não:</strong> segmentação, grupos, ACL, rota específica, aplicação, proxy ou política baseada em identidade;</li>\n    <li><strong>Funcionava ontem e parou hoje:</strong> mudança em certificado, política, IdP, rota, firewall, NAT, pool, cliente, versão, sistema operacional ou provedor;</li>\n    <li><strong>Conexão lenta ou instável:</strong> MTU/MSS, perda, jitter, rota de internet, inspeção, criptografia, capacidade do gateway ou DNS lento;</li>\n    <li><strong>Site-to-site sobe mas tráfego não passa:</strong> selectors, phase 2, BGP, rota de retorno, CIDR sobreposto, NAT, firewall ou assimetria.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha clássica:</strong> reiniciar cliente VPN, trocar senha e liberar firewall sem provar onde está a falha. Troubleshooting profissional de VPN exige separar controle do túnel, plano de dados, DNS, rotas e autorização.</div>\n\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU</h3>\n  <p><strong>Sintoma observado:</strong> Usuário conecta na VPN e passa MFA, mas nomes internos não resolvem; quando usa IP, algumas aplicações carregam parcialmente.</p>\n  <p><strong>Impacto operacional:</strong> Suporte confunde autenticação bem-sucedida com acesso funcional e reabre permissões sem diagnosticar perfil.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente → identidade/MFA → túnel → perfil de rotas/DNS → política → aplicação → retorno → MTU/MSS</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>09:00: grupo de VPN alterado</li><li>09:15: MFA OK</li><li>09:20: DNS interno falha</li><li>09:35: apps com upload travando</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Grupo/perfil errado</td><td>Usuário autenticado recebe rotas diferentes</td><td>logs VPN/perfil</td><td>Alta</td></tr><tr><td>DNS de VPN ausente</td><td>FQDN interno não resolve</td><td>ipconfig/resolvectl/dig</td><td>Alta</td></tr><tr><td>Split tunnel incompleto</td><td>IP interno fora das rotas</td><td>route print/ip route</td><td>Alta</td></tr><tr><td>MTU/MSS</td><td>Conecta, mas trava em payload maior</td><td>ping DF/tcpdump</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>O troubleshooting de VPN amadurece quando você organiza a investigação por fases. Cada fase tem perguntas, evidências e fontes diferentes.</p>\n  <table class=\"comparison-table\"><thead><tr><th>Fase</th><th>Pergunta</th><th>Evidência</th><th>Erro comum</th></tr></thead><tbody>\n    <tr><td>Identidade</td><td>Quem está tentando acessar?</td><td>Logs do IdP, MFA, Radius, grupo, postura.</td><td>Assumir que usuário autenticado tem autorização.</td></tr>\n    <tr><td>Negociação</td><td>O túnel foi estabelecido corretamente?</td><td>Logs IKE/IPsec, TLS, certificado, propostas, SA.</td><td>Olhar apenas para status “connected”.</td></tr>\n    <tr><td>Endereçamento</td><td>O cliente recebeu IP, DNS e perfil corretos?</td><td>IP do pool, rotas, DNS, suffix, split tunnel.</td><td>Ignorar perfil por grupo.</td></tr>\n    <tr><td>Roteamento</td><td>O pacote sabe ir e voltar?</td><td>Tabela de rotas, BGP, rota de retorno, NAT.</td><td>Validar apenas ida.</td></tr>\n    <tr><td>Política</td><td>O fluxo é permitido?</td><td>Firewall, ACL, SG/NSG, ZTNA, logs allow/deny.</td><td>Culpar VPN quando o bloqueio é segmentação correta.</td></tr>\n    <tr><td>Aplicação</td><td>O serviço responde corretamente?</td><td>DNS, TCP, TLS, HTTP, logs da aplicação.</td><td>Tratar erro 403/500 como falha de túnel.</td></tr>\n  </tbody></table>\n  <p>Na prática moderna, troubleshooting de VPN também precisa considerar alternativas. Acesso administrativo pode migrar para bastion e just-in-time. Aplicações internas podem usar ZTNA. Serviços cloud podem usar private endpoints. Filiais podem usar SD-WAN. Porém, mesmo nesses cenários, os fundamentos de túnel, rota, DNS, identidade e política continuam essenciais.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>VPN, Virtual Private Network, é uma técnica para criar um caminho lógico protegido sobre uma infraestrutura que não é totalmente confiável. Esse caminho pode conectar redes inteiras, como matriz e filial, ou conectar um usuário individual a recursos privados.</p>\n  <p>Em uma <strong>VPN site-to-site</strong>, dois gateways criam um túnel entre redes. O usuário nem sempre percebe a VPN, pois o roteador ou firewall encaminha o tráfego pelo túnel. Em uma <strong>VPN de acesso remoto</strong>, o cliente do usuário autentica e recebe parâmetros de rede, como IP virtual, rotas e DNS.</p>\n  <p>Em IPsec, aparecem conceitos como IKE, Security Association, proposals, ESP, NAT-T, selectors e phase 1/phase 2, conforme a nomenclatura de muitos produtos. Em SSL/TLS VPN, aparecem portal, agente, certificado, perfil, túnel por aplicação ou túnel de rede. Em cloud, aparecem customer gateway, virtual private gateway, VPN gateway, connection, tunnel, BGP peer e advertised prefixes.</p>\n  <div class=\"callout callout--info\"><strong>Ideia-chave:</strong> VPN não é autorização universal. Ela apenas cria um caminho. Quem pode acessar o quê ainda deve ser controlado por identidade, grupo, postura, rota, firewall, segmentação, aplicação e logs.</div>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, uma VPN combina autenticação, negociação criptográfica, encapsulamento e roteamento. Em um cenário simplificado, o cliente ou gateway prova sua identidade, negocia algoritmos e chaves, cria associações de segurança, encapsula pacotes privados em pacotes públicos e encaminha esses pacotes pela internet até o outro lado.</p>\n  <p>No IPsec, IKEv2 é comumente usado para autenticação mútua e estabelecimento de Security Associations. Depois da negociação, ESP protege o tráfego. Em muitos ambientes atrás de NAT, NAT Traversal encapsula IPsec em UDP para atravessar dispositivos intermediários. Em SSL/TLS VPN, o túnel se apoia em TLS e em um agente ou portal que aplica políticas por usuário, grupo e aplicação.</p>\n  <p>Quando o túnel é estabelecido, ainda falta o plano de dados funcionar. O cliente precisa ter rotas para redes internas, DNS para nomes internos, permissão no firewall, retorno pelo caminho correto e ausência de conflito entre sua rede local e os CIDRs corporativos. Se o usuário está em casa com a rede 192.168.1.0/24 e a empresa também usa 192.168.1.0/24, o sistema pode enviar tráfego para o lugar errado.</p>\n  <ul>\n    <li><strong>Controle:</strong> autenticação, MFA, certificado, postura, IKE/TLS, propostas e sessão.</li>\n    <li><strong>Dados:</strong> IP virtual, rotas, DNS, túnel, encapsulamento, MTU, firewall e retorno.</li>\n    <li><strong>Observabilidade:</strong> logs do cliente, gateway, IdP, firewall, DNS, flow logs, SIEM e métricas.</li>\n  </ul>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Uma arquitetura de VPN profissional deve ser desenhada como parte da arquitetura de acesso, não como exceção permanente. Ela precisa ter perfis, grupos, redes permitidas, logs, alta disponibilidade, capacidade, política de split tunnel, DNS coerente, integração com identidade e caminho de retorno conhecido.</p>\n  <p>Componentes típicos:</p>\n  <ul>\n    <li><strong>Cliente VPN:</strong> software, perfil, certificado, postura, rotas e DNS recebidos;</li>\n    <li><strong>Gateway VPN:</strong> termina túneis, autentica, aplica perfis e encaminha tráfego;</li>\n    <li><strong>IdP/MFA/Radius:</strong> valida identidade, grupo e segundo fator;</li>\n    <li><strong>Firewall/segmentação:</strong> limita acesso por origem VPN, destino, porta, aplicação e grupo;</li>\n    <li><strong>DNS interno:</strong> resolve nomes privados e evita exposição desnecessária;</li>\n    <li><strong>Recursos internos:</strong> aplicações, bancos, repositórios, bastions, APIs e ambientes cloud;</li>\n    <li><strong>Logs e SIEM:</strong> unem autenticação, sessão, rota, firewall, DNS e aplicação.</li>\n  </ul>\n  <p>Em cloud híbrida, o desenho costuma incluir VPN site-to-site redundante entre datacenter e hub cloud, BGP para rotas dinâmicas, firewall central, spokes de workload, Private DNS e acesso remoto com grupos mínimos. A pior arquitetura é aquela em que “estar na VPN” equivale a estar dentro de tudo.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense na VPN como uma estrada privativa construída sobre uma rodovia pública. A estrada pode estar aberta, iluminada e protegida, mas isso não significa que o motorista pode entrar em qualquer prédio ao final dela.</p>\n  <p>O cliente VPN é o carro. O login e o MFA são a identificação do motorista. O túnel é a estrada protegida. As rotas são as placas que dizem para onde ir. O DNS é o catálogo que traduz nomes de prédios em endereços. O firewall é a portaria de cada área. A aplicação é a sala final. Se qualquer uma dessas peças estiver errada, o motorista pode até estar “dentro da estrada”, mas não chegar ao destino.</p>\n  <div class=\"callout callout--info\"><strong>Analogia operacional:</strong> quando um usuário diz “a VPN conectou”, ele está dizendo apenas que entrou na estrada. O troubleshooting profissional ainda precisa provar se há placa, permissão, portaria, caminho de volta e sala funcionando.</div>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine um usuário remoto que conecta à VPN e tenta acessar <code>intranet.empresa.local</code>. O navegador mostra timeout.</p>\n  <p>Investigação amadora: “reinicia o computador”, “reinstala o cliente”, “libera a porta no firewall”. Investigação profissional:</p>\n  <ol>\n    <li>Confirmar se o usuário autenticou e em qual grupo caiu;</li>\n    <li>Verificar IP recebido do pool VPN;</li>\n    <li>Verificar rotas instaladas no cliente;</li>\n    <li>Resolver o nome <code>intranet.empresa.local</code> e confirmar DNS interno;</li>\n    <li>Testar TCP/443 para o IP resolvido;</li>\n    <li>Correlacionar logs do gateway VPN e firewall;</li>\n    <li>Validar se a aplicação responde para outras origens autorizadas.</li>\n  </ol>\n  <p>Resultado: descobre-se que o usuário autenticou corretamente, mas recebeu o perfil de grupo errado. O perfil não empurrou a rota para a subnet da intranet. O túnel estava conectado, mas não havia caminho.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa média, usuários remotos acessam ERP, Git, bastion, sistema financeiro e console de segurança por VPN. A equipe de Segurança decide segmentar a origem VPN em zonas: usuários comuns, administradores, fornecedores e SOC. Cada zona recebe pool de IP diferente, grupos diferentes e regras diferentes.</p>\n  <p>Durante uma segunda-feira, fornecedores relatam que conseguem conectar, mas não acessam o portal de chamados. Administradores estão normais. Usuários comuns estão normais. O erro não é global da VPN. A linha do tempo mostra uma mudança de regra no firewall no domingo. Logs indicam deny do pool de fornecedores para TCP/443 no portal. A correção é ajustar uma regra específica, não liberar todo o pool VPN.</p>\n  <p>Esse exemplo mostra por que VPN corporativa precisa de pools separados, nomes claros, logs por grupo, change management e validação pós-mudança. Sem isso, a equipe tende a abrir exceções amplas porque não consegue explicar o que está bloqueando.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em cloud, a VPN pode conectar um datacenter a uma VPC/VNet, permitir administração de recursos privados ou servir como caminho temporário durante migração. Um cenário comum é: datacenter → VPN site-to-site → hub cloud → firewall → spoke de aplicação → private endpoint → banco gerenciado.</p>\n  <p>Falhas comuns nesse cenário incluem rota propagada ausente, BGP anunciando prefixo errado, CIDR sobreposto, NSG/Security Group bloqueando origem do datacenter, DNS privado não resolvendo, rota de retorno apontando para NAT em vez do túnel e firewall central sem regra para o fluxo.</p>\n  <p>O troubleshooting cloud precisa juntar evidências de ambos os lados: logs do gateway VPN, estado BGP, effective routes, flow logs, firewall logs, private DNS, NSG/SG, métricas de túnel e auditoria de mudanças. Validar apenas o status “tunnel up” no provedor cloud não prova que a aplicação está acessível.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, VPN pode ser dependência de pipelines que acessam repositórios privados, registries, bancos de teste, clusters Kubernetes privados ou bastions. Quando o pipeline falha com timeout, o problema pode estar no runner fora da VPN, na rota do runner, no DNS privado, na política de saída, no security group ou na mudança de endpoint privado.</p>\n  <p>Boa prática: pipelines não devem depender de VPN manual de usuário. Preferem-se runners em rede apropriada, private endpoints, identidade de workload, bastion controlado, service connections e políticas como código. Quando VPN é inevitável, deve haver teste sintético de rota, DNS, porta e autenticação antes do job principal.</p>\n  <p>Exemplo: um pipeline de deploy em ambiente privado falha ao acessar o cluster AKS/EKS/GKE. A investigação descobre que o DNS privado do endpoint do cluster só resolve dentro da VNet/VPC, mas o runner está fora. A correção profissional não é tornar o endpoint público, e sim mover o runner para uma rede autorizada ou criar conectividade privada controlada.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>VPN é frequentemente tratada como perímetro estendido. Isso é perigoso. Um endpoint comprometido conectado à VPN pode virar ponte para movimento lateral se a rede interna confiar demais no fato de o IP vir do pool VPN.</p>\n  <p>Boas práticas incluem MFA resistente, certificados por dispositivo, postura do endpoint, menor privilégio por grupo, split tunnel consciente, logs centralizados, alertas de login anômalo, revogação rápida, pools por perfil, restrição por destino e porta, bastions para administração, e revisão periódica de usuários e fornecedores.</p>\n  <p>Más práticas incluem usuário compartilhado, VPN sempre aberta, acesso any-any do pool VPN para rede interna, ausência de logs, certificado sem revogação, split tunneling sem análise, cliente desatualizado, exceções permanentes e uso da VPN como substituto de IAM.</p>\n  <div class=\"callout callout--security\"><strong>Regra de segurança:</strong> VPN deve ser um caminho autenticado e observável, não uma autorização implícita para toda a rede. Após conectar, o usuário ainda deve ser tratado por menor privilégio, segmentação e monitoramento.</div>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra a cadeia de troubleshooting de VPN e acesso remoto. Observe que o status do túnel é apenas uma etapa; a validação completa inclui identidade, túnel, perfil, rotas, DNS, políticas, recurso e retorno.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Fluxo de troubleshooting VPN com cliente remoto, identidade, gateway, rotas, DNS, firewall, recursos internos e SIEM\">\n    <svg viewBox=\"0 0 1180 560\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-15-9-content-diagram-1-title svg-15-9-content-diagram-1-desc\">\n      <title id=\"svg-15-9-content-diagram-1-title\">Troubleshooting VPN, túneis e acesso remoto</title>\n      <desc id=\"svg-15-9-content-diagram-1-desc\">Diagrama pedagógico da aula 15.9, Troubleshooting VPN, túneis e acesso remoto, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-vpn-1509\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n      </defs>\n      <rect x=\"20\" y=\"25\" width=\"1140\" height=\"510\" rx=\"22\" class=\"svg-bg\"></rect>\n      <text x=\"590\" y=\"60\" text-anchor=\"middle\" class=\"svg-title\">Troubleshooting VPN: túnel conectado não significa acesso validado</text>\n\n      <rect x=\"55\" y=\"115\" width=\"150\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n      <text x=\"130\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Usuário remoto</text>\n      <text x=\"130\" y=\"168\" text-anchor=\"middle\" class=\"svg-small\">cliente VPN</text>\n      <text x=\"130\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">rede local / Wi‑Fi</text>\n\n      <rect x=\"250\" y=\"105\" width=\"160\" height=\"106\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"330\" y=\"135\" text-anchor=\"middle\" class=\"svg-label\">Identidade</text>\n      <text x=\"330\" y=\"158\" text-anchor=\"middle\" class=\"svg-small\">IdP / MFA</text>\n      <text x=\"330\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">certificado / grupo</text>\n      <text x=\"330\" y=\"198\" text-anchor=\"middle\" class=\"svg-small\">postura</text>\n\n      <rect x=\"455\" y=\"105\" width=\"165\" height=\"106\" rx=\"14\" class=\"svg-node svg-node--gateway\"></rect>\n      <text x=\"538\" y=\"135\" text-anchor=\"middle\" class=\"svg-label\">Gateway VPN</text>\n      <text x=\"538\" y=\"158\" text-anchor=\"middle\" class=\"svg-small\">IKE / TLS</text>\n      <text x=\"538\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">SA / sessão</text>\n      <text x=\"538\" y=\"198\" text-anchor=\"middle\" class=\"svg-small\">pool de IP</text>\n\n      <rect x=\"675\" y=\"95\" width=\"165\" height=\"126\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"758\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Perfil</text>\n      <text x=\"758\" y=\"148\" text-anchor=\"middle\" class=\"svg-small\">rotas</text>\n      <text x=\"758\" y=\"168\" text-anchor=\"middle\" class=\"svg-small\">DNS interno</text>\n      <text x=\"758\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">split tunnel</text>\n      <text x=\"758\" y=\"208\" text-anchor=\"middle\" class=\"svg-small\">MTU / MSS</text>\n\n      <rect x=\"895\" y=\"105\" width=\"210\" height=\"106\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n      <text x=\"1000\" y=\"135\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n      <text x=\"1000\" y=\"158\" text-anchor=\"middle\" class=\"svg-small\">firewall / ACL / SG</text>\n      <text x=\"1000\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">segmentação</text>\n      <text x=\"1000\" y=\"198\" text-anchor=\"middle\" class=\"svg-small\">menor privilégio</text>\n\n      <rect x=\"190\" y=\"330\" width=\"165\" height=\"100\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"272\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">DNS privado</text>\n      <text x=\"272\" y=\"383\" text-anchor=\"middle\" class=\"svg-small\">zonas internas</text>\n      <text x=\"272\" y=\"403\" text-anchor=\"middle\" class=\"svg-small\">split-horizon</text>\n\n      <rect x=\"415\" y=\"320\" width=\"185\" height=\"120\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"508\" y=\"350\" text-anchor=\"middle\" class=\"svg-label\">Recursos</text>\n      <text x=\"508\" y=\"373\" text-anchor=\"middle\" class=\"svg-small\">apps internas</text>\n      <text x=\"508\" y=\"393\" text-anchor=\"middle\" class=\"svg-small\">bastion / Git / banco</text>\n      <text x=\"508\" y=\"413\" text-anchor=\"middle\" class=\"svg-small\">cloud privado</text>\n\n      <rect x=\"660\" y=\"330\" width=\"170\" height=\"100\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"745\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">Retorno</text>\n      <text x=\"745\" y=\"383\" text-anchor=\"middle\" class=\"svg-small\">rota reversa</text>\n      <text x=\"745\" y=\"403\" text-anchor=\"middle\" class=\"svg-small\">NAT / assimetria</text>\n\n      <rect x=\"900\" y=\"330\" width=\"190\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--logs\"></rect>\n      <text x=\"995\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">Logs e SIEM</text>\n      <text x=\"995\" y=\"383\" text-anchor=\"middle\" class=\"svg-small\">auth + sessão</text>\n      <text x=\"995\" y=\"403\" text-anchor=\"middle\" class=\"svg-small\">flow + DNS + firewall</text>\n\n      <line x1=\"205\" y1=\"158\" x2=\"250\" y2=\"158\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></line>\n      <line x1=\"410\" y1=\"158\" x2=\"455\" y2=\"158\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></line>\n      <line x1=\"620\" y1=\"158\" x2=\"675\" y2=\"158\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></line>\n      <line x1=\"840\" y1=\"158\" x2=\"895\" y2=\"158\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></line>\n      <path d=\"M1000 211 C1000 270 540 270 508 320\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></path>\n      <path d=\"M758 221 C720 280 330 285 272 330\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></path>\n      <line x1=\"600\" y1=\"380\" x2=\"660\" y2=\"380\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></line>\n      <line x1=\"830\" y1=\"380\" x2=\"900\" y2=\"380\" class=\"svg-link\" marker-end=\"url(#arrow-vpn-1509)\"></line>\n      <path d=\"M745 330 C780 275 540 255 538 211\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-vpn-1509)\"></path>\n\n      <text x=\"590\" y=\"500\" text-anchor=\"middle\" class=\"svg-note\">Método: provar identidade → túnel → perfil → rota/DNS → política → recurso → retorno → evidências</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um dossiê de troubleshooting de VPN e acesso remoto. Ele não exige provisionar uma VPN real, mas sim construir o raciocínio profissional que deve ser usado em qualquer produto: firewall corporativo, concentrador VPN, ZTNA, cloud VPN, cliente SSL, IPsec site-to-site ou acesso remoto gerenciado.</p>\n  <p>Você receberá sintomas diferentes por usuário e por tipo de conexão. O objetivo é separar autenticação, túnel, perfil, rotas, DNS, política, aplicação e retorno, produzindo evidências suficientes para uma correção segura e uma RCA.</p>\n\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU. <strong>Causa provável a ser comprovada ou descartada:</strong> Perfil VPN entrega DNS/rotas erradas, split tunnel incompleto, política por grupo incorreta ou MTU/MSS quebrando sessões.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam interpretação de sintomas. Em VPN, memorizar comandos ajuda pouco se você não souber que pergunta cada comando responde. Ao resolver, sempre escreva: hipótese, evidência esperada, fonte da evidência e risco de mudança.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio coloca você em um cenário com usuários remotos, fornecedor, site-to-site com cloud, DNS privado e lentidão intermitente. A resposta correta não é “reiniciar a VPN”, mas criar uma matriz por perfil, caminho e evidência.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada demonstra como separar incidentes simultâneos: falha de perfil para um grupo, DNS interno incorreto para VPN, rota de retorno no site-to-site e MTU afetando uma aplicação específica. O objetivo é impedir conclusões apressadas.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>VPN cria um caminho protegido, mas não garante que identidade, rotas, DNS, firewall, aplicação e retorno estejam corretos. O troubleshooting profissional separa controle do túnel e plano de dados, valida logs do cliente, gateway, IdP, firewall, DNS e aplicação, e evita liberações amplas como solução rápida.</p>\n  <p>Você aprendeu a diagnosticar VPN de acesso remoto e site-to-site considerando autenticação, MFA, certificado, IKE/TLS, IP do pool, rotas empurradas, split tunnel, DNS privado, NAT, BGP, CIDR sobreposto, MTU, política e observabilidade.</p>\n\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Perfil VPN entrega DNS/rotas erradas, split tunnel incompleto, política por grupo incorreta ou MTU/MSS quebrando sessões..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>15.10 — Troubleshooting Cloud Networking</strong>, você vai aplicar o mesmo método em VPC/VNet, subnets, route tables, NAT, Security Groups/NSG, Private Link, DNS privado, VPN/BGP, flow logs e auditoria cloud.</p>\n</section>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 5",
      "Camada 6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPsec",
      "IKEv2",
      "ESP",
      "UDP/500",
      "UDP/4500",
      "TLS",
      "DTLS",
      "DNS",
      "RADIUS",
      "SAML",
      "OIDC",
      "BGP",
      "ICMP",
      "TCP",
      "UDP"
    ],
    "relatedConcepts": [
      "Remote Access VPN",
      "Site-to-Site VPN",
      "Split Tunnel",
      "Full Tunnel",
      "MFA",
      "Certificado de dispositivo",
      "Pool VPN",
      "Route Push",
      "DNS interno",
      "NAT Traversal",
      "Security Association",
      "MTU",
      "MSS Clamping",
      "CIDR sobreposto",
      "Rota de retorno",
      "Zero Trust Network Access"
    ],
    "ports": [
      "UDP/500",
      "UDP/4500",
      "TCP/443",
      "UDP/443",
      "TCP/8443",
      "UDP/1194",
      "TCP/1194",
      "TCP/1812",
      "UDP/1812",
      "TCP/53",
      "UDP/53"
    ]
  },
  "lab": {
    "id": "lab-15.9",
    "title": "Caso guiado: VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Usuário conecta na VPN e passa MFA, mas nomes internos não resolvem; quando usa IP, algumas aplicações carregam parcialmente. Impacto: Suporte confunde autenticação bem-sucedida com acesso funcional e reabre permissões sem diagnosticar perfil. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente → identidade/MFA → túnel → perfil de rotas/DNS → política → aplicação → retorno → MTU/MSS",
    "architecture": "Arquitetura investigada: Cliente → identidade/MFA → túnel → perfil de rotas/DNS → política → aplicação → retorno → MTU/MSS. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "220-280 min",
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Executar somente em ambiente autorizado.",
      "Não abrir regras amplas nem desativar controles como atalho.",
      "Preservar logs e evidências antes de mudanças.",
      "Sanitizar dados sensíveis em capturas e prints.",
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Separar autenticação e acesso",
        "instruction": "Confirme MFA/login, mas trate conectividade como etapa diferente.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Estado de identidade separado do estado de rede.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Validar perfil recebido",
        "instruction": "Colete IP do túnel, DNS, rotas, split/full tunnel e grupo.",
        "command": "ipconfig /all; route print; Resolve-DnsName sistema.interno.local; ping -f -l 1400 <ip-interno>",
        "expectedOutput": "Perfil VPN documentado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Testar DNS interno",
        "instruction": "Compare resolução pelo DNS padrão e pelo DNS VPN.",
        "command": "ip route; resolvectl status; dig @<dns-vpn> sistema.interno.local; tracepath <ip-interno>",
        "expectedOutput": "Falha DNS isolada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Testar rotas internas",
        "instruction": "Verifique se prefixos necessários estão no túnel.",
        "command": "Consultar logs de autenticação, grupo, policy aplicada, pool IP, rotas empurradas e logs de acesso",
        "expectedOutput": "Split tunnel validado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Correlacionar política",
        "instruction": "Confira regras por grupo, device posture e horário.",
        "command": "Consultar logs de autenticação, grupo, policy aplicada, pool IP, rotas empurradas e logs de acesso",
        "expectedOutput": "Autorização efetiva.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Testar MTU/MSS",
        "instruction": "Use ping DF/tracepath e observe travamentos em payload maior.",
        "command": "Consultar logs de autenticação, grupo, policy aplicada, pool IP, rotas empurradas e logs de acesso",
        "expectedOutput": "PMTU/MSS estimado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Aplicar correção mínima",
        "instruction": "Ajuste perfil, DNS, rota ou MSS clamp conforme evidência.",
        "command": "Consultar logs de autenticação, grupo, policy aplicada, pool IP, rotas empurradas e logs de acesso",
        "expectedOutput": "VPN funcional sem ampliar acesso desnecessário.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Atualizar runbook de suporte",
        "instruction": "Inclua comandos de perfil antes de escalar para rede/segurança.",
        "command": "Consultar logs de autenticação, grupo, policy aplicada, pool IP, rotas empurradas e logs de acesso",
        "expectedOutput": "Runbook de triagem.",
        "explanation": "Este passo obriga o aluno a transformar o caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "DNS interno resolve",
        "command": "Resolve-DnsName/dig",
        "expected": "FQDN interno retorna IP esperado.",
        "ifFails": "Corrigir DNS/forwarder/perfil."
      },
      {
        "check": "Rotas pelo túnel existem",
        "command": "route print/ip route",
        "expected": "Prefixos internos apontam para interface VPN.",
        "ifFails": "Corrigir split tunnel."
      },
      {
        "check": "Aplicação carrega com payload real",
        "command": "curl/upload/teste funcional",
        "expected": "Sem travamento em respostas maiores.",
        "ifFails": "Ajustar MTU/MSS."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "VPN conectada, nada abre",
        "probableCause": "Perfil sem rota ou DNS",
        "howToConfirm": "Coletar route print e DNS",
        "fix": "Corrigir perfil/grupo."
      },
      {
        "symptom": "Por IP funciona, por nome não",
        "probableCause": "DNS VPN incorreto",
        "howToConfirm": "Consultar DNS explícito",
        "fix": "Entregar DNS/conditional forwarder."
      },
      {
        "symptom": "Login OK, acesso negado",
        "probableCause": "Autorização/policy diferente de autenticação",
        "howToConfirm": "Logs IAM/VPN",
        "fix": "Corrigir grupo/regra com menor privilégio."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "logs de MFA",
      "grupo/perfil VPN",
      "ipconfig/route print",
      "DNS recebido",
      "teste FQDN/IP",
      "MTU/tracepath",
      "logs de policy"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Crie uma árvore de decisão para suporte separar falha de login, falha de túnel, falha de DNS, falha de rota e falha de aplicação.",
    "solution": "A solução separa identidade, túnel, perfil, DNS, rota, política e aplicação. Corrigir tudo como “problema de VPN” cria permissões excessivas e não resolve causas como MTU ou DNS privado."
  },
  "exercises": [
    {
      "id": "ex15.9.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.9.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.9.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.9.p1.1",
      "type": "diagnóstico",
      "q": "No caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.9.p1.2",
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
      "id": "q15.9.p1.3",
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
      "id": "q15.9.p1.4",
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
      "question": "Qual afirmação é mais correta sobre VPN conectada?",
      "options": [
        "Prova que todos os sistemas internos estão acessíveis",
        "Prova apenas que uma etapa de controle/túnel foi concluída",
        "Dispensa validação de DNS",
        "Remove necessidade de firewall"
      ],
      "answer": 1,
      "explanation": "VPN conectada não prova rota, DNS, política, aplicação ou retorno."
    },
    {
      "question": "Se um usuário acessa um sistema por IP, mas não por nome, o foco inicial deve ser:",
      "options": [
        "DNS interno, suffix, split-horizon e cache",
        "MFA",
        "Cabo de rede do datacenter",
        "Troca de senha"
      ],
      "answer": 0,
      "explanation": "Acesso por IP indica que o caminho pode existir; a falha por nome aponta para resolução DNS."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.9.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.9.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.9.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.9.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.9.p1.5",
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
      "question": "Qual parte do caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU",
    "scenario": "Usuário conecta na VPN e passa MFA, mas nomes internos não resolvem; quando usa IP, algumas aplicações carregam parcialmente.",
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
    "reasoning": "A solução separa identidade, túnel, perfil, DNS, rota, política e aplicação. Corrigir tudo como “problema de VPN” cria permissões excessivas e não resolve causas como MTU ou DNS privado.",
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
    "finalAnswer": "A resposta correta para “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "VPN",
      "shortDefinition": "Rede privada virtual sobre rede não confiável.",
      "longDefinition": "Técnica que cria um caminho lógico protegido para tráfego privado sobre infraestrutura pública ou compartilhada.",
      "example": "Usuário remoto acessa sistemas internos por túnel criptografado.",
      "relatedTerms": [
        "IPsec",
        "SSL VPN",
        "Túnel"
      ],
      "relatedLessons": [
        "11.5",
        "14.8",
        "15.9"
      ]
    },
    {
      "term": "IPsec",
      "shortDefinition": "Conjunto de protocolos para segurança na camada IP.",
      "longDefinition": "IPsec fornece serviços como autenticação, integridade e confidencialidade para tráfego IP, frequentemente usado em VPN site-to-site.",
      "example": "Firewall da filial cria túnel IPsec até o datacenter.",
      "relatedTerms": [
        "IKEv2",
        "ESP",
        "Security Association"
      ],
      "relatedLessons": [
        "14.8",
        "15.9"
      ]
    },
    {
      "term": "IKEv2",
      "shortDefinition": "Protocolo de negociação usado com IPsec.",
      "longDefinition": "Internet Key Exchange versão 2 realiza autenticação e estabelece Security Associations usadas para proteger tráfego IPsec.",
      "example": "Logs mostram falha de IKE por proposta criptográfica incompatível.",
      "relatedTerms": [
        "IPsec",
        "Security Association",
        "Certificado"
      ],
      "relatedLessons": [
        "14.8",
        "15.9"
      ]
    },
    {
      "term": "Split tunnel",
      "shortDefinition": "Apenas parte do tráfego passa pela VPN.",
      "longDefinition": "Modelo em que rotas específicas são enviadas pelo túnel VPN enquanto o restante do tráfego sai pela internet local do usuário.",
      "example": "Rede 10.20.0.0/16 passa pela VPN, mas sites públicos saem pela conexão local.",
      "relatedTerms": [
        "Full tunnel",
        "Rotas",
        "Egress"
      ],
      "relatedLessons": [
        "15.4",
        "15.9"
      ]
    },
    {
      "term": "Pool VPN",
      "shortDefinition": "Faixa de IPs atribuída a clientes VPN.",
      "longDefinition": "Conjunto de endereços virtuais usados por clientes remotos para representar suas origens dentro das políticas corporativas.",
      "example": "Administradores recebem IPs do pool 10.250.10.0/24 e fornecedores do pool 10.250.30.0/24.",
      "relatedTerms": [
        "Perfil VPN",
        "Firewall",
        "Segmentação"
      ],
      "relatedLessons": [
        "13.2",
        "15.7",
        "15.9"
      ]
    },
    {
      "term": "CIDR sobreposto",
      "shortDefinition": "Conflito entre blocos de rede iguais ou conflitantes.",
      "longDefinition": "Ocorre quando duas redes que precisam se comunicar usam o mesmo bloco de endereços, gerando decisões de roteamento incorretas.",
      "example": "Casa do usuário e rede interna usam 192.168.1.0/24, causando falha de acesso pela VPN.",
      "relatedTerms": [
        "Roteamento",
        "NAT",
        "VPN"
      ],
      "relatedLessons": [
        "05.4",
        "14.3",
        "15.9"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.9"
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
        "15.9"
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
      "title": "NIST SP 800-77 Rev. 1 — Guide to IPsec VPNs",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/77/r1/final",
      "note": "Guia para implementação segura de VPNs baseadas em IPsec."
    },
    {
      "type": "standard",
      "title": "NIST SP 800-113 — Guide to SSL VPNs",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/113/final",
      "note": "Guia para compreensão, desenho e implantação de SSL VPNs."
    },
    {
      "type": "standard",
      "title": "RFC 7296 — Internet Key Exchange Protocol Version 2 (IKEv2)",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc7296.html",
      "note": "Especificação do IKEv2, componente usado por IPsec para autenticação e Security Associations."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 14.8 — VPN híbrida, Direct Connect, ExpressRoute e BGP na cloud",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m14/lesson-14-08",
      "note": "Base para conectividade híbrida, VPN site-to-site e BGP em cloud."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 15.7 — Troubleshooting firewall, ACL, NAT e políticas",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15/lesson-15-07",
      "note": "Base para política efetiva, NAT, rota de retorno e logs allow/deny."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting VPN, túneis e acesso remoto\".",
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
        "description": "No caso “VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting VPN, túneis e acesso remoto",
              "description": "Em Troubleshooting VPN, túneis e acesso remoto, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.9."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Usuário conecta na VPN e passa MFA, mas nomes internos não resolvem; quando usa IP, algumas aplicações carregam parcialmente.",
      "Impacto: Suporte confunde autenticação bem-sucedida com acesso funcional e reabre permissões sem diagnosticar perfil.",
      "Causa provável a validar: Perfil VPN entrega DNS/rotas erradas, split tunnel incompleto, política por grupo incorreta ou MTU/MSS quebrando sessões.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting VPN, túneis e acesso remoto.",
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
      "Qual evidência comprova o entendimento da aula 15.9?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all; route print; Resolve-DnsName sistema.interno.local; ping -f -l 1400 <ip-interno>",
        "purpose": "Validar DNS, rotas e MTU no cliente VPN.",
        "expectedObservation": "DNS corporativo, rotas internas e tamanho máximo sem fragmentar.",
        "interpretation": "VPN conectada não prova perfil correto."
      },
      {
        "platform": "Linux",
        "command": "ip route; resolvectl status; dig @<dns-vpn> sistema.interno.local; tracepath <ip-interno>",
        "purpose": "Validar perfil e MTU em Linux.",
        "expectedObservation": "Rotas pelo túnel, DNS VPN e PMTU.",
        "interpretation": "Falhas parciais podem ser MTU/MSS, não firewall."
      },
      {
        "platform": "VPN/IAM",
        "command": "Consultar logs de autenticação, grupo, policy aplicada, pool IP, rotas empurradas e logs de acesso",
        "purpose": "Separar identidade de conectividade.",
        "expectedObservation": "Usuário, grupo, perfil, rotas e negações.",
        "interpretation": "MFA OK significa identidade validada, não autorização de rede completa."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Grupo/perfil errado” está com prioridade Alta e a evidência necessária é “logs VPN/perfil”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “DNS de VPN ausente” está com prioridade Alta e a evidência necessária é “ipconfig/resolvectl/dig”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Split tunnel incompleto” está com prioridade Alta e a evidência necessária é “route print/ip route”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “MTU/MSS” está com prioridade Média e a evidência necessária é “ping DF/tcpdump”",
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
      "15.10"
    ]
  },
  "diagnosticCase": {
    "title": "VPN autentica com MFA, mas aplicações internas falham por rota, DNS e MTU",
    "symptom": "Usuário conecta na VPN e passa MFA, mas nomes internos não resolvem; quando usa IP, algumas aplicações carregam parcialmente.",
    "businessImpact": "Suporte confunde autenticação bem-sucedida com acesso funcional e reabre permissões sem diagnosticar perfil.",
    "likelyRootCause": "Perfil VPN entrega DNS/rotas erradas, split tunnel incompleto, política por grupo incorreta ou MTU/MSS quebrando sessões.",
    "timeline": [
      "09:00: grupo de VPN alterado",
      "09:15: MFA OK",
      "09:20: DNS interno falha",
      "09:35: apps com upload travando"
    ],
    "expectedFlow": "Cliente → identidade/MFA → túnel → perfil de rotas/DNS → política → aplicação → retorno → MTU/MSS",
    "hypothesisMatrix": [
      {
        "hypothesis": "Grupo/perfil errado",
        "why": "Usuário autenticado recebe rotas diferentes",
        "evidence": "logs VPN/perfil",
        "priority": "Alta"
      },
      {
        "hypothesis": "DNS de VPN ausente",
        "why": "FQDN interno não resolve",
        "evidence": "ipconfig/resolvectl/dig",
        "priority": "Alta"
      },
      {
        "hypothesis": "Split tunnel incompleto",
        "why": "IP interno fora das rotas",
        "evidence": "route print/ip route",
        "priority": "Alta"
      },
      {
        "hypothesis": "MTU/MSS",
        "why": "Conecta, mas trava em payload maior",
        "evidence": "ping DF/tcpdump",
        "priority": "Média"
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
