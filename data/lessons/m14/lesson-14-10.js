export const lesson1410 = {
  "id": "14.10",
  "moduleId": "m14",
  "order": 10,
  "title": "Private Link, endpoints privados e serviços gerenciados",
  "subtitle": "Como acessar serviços gerenciados por caminho privado sem conectar redes inteiras nem depender de exposição pública.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 320,
  "tags": [
    "cloud networking",
    "private link",
    "private endpoint",
    "vpc endpoint",
    "private service connect",
    "dns privado",
    "serviços gerenciados",
    "zero trust",
    "egress control",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.3",
      "reason": "Endpoints privados dependem de VPC/VNet, CIDR e subnets bem desenhadas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "reason": "É necessário entender rotas, NAT e caminhos de saída antes de substituí-los por acesso privado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.7",
      "reason": "DNS privado e split-horizon são essenciais para endpoints privados funcionarem corretamente."
    },
    {
      "type": "module",
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "Zero Trust",
      "reason": "Endpoint privado reduz exposição de rede, mas autorização ainda depende de identidade e política."
    }
  ],
  "objectives": [
    "Explicar por que endpoints privados existem e quais problemas eles resolvem.",
    "Diferenciar acesso público via NAT, peering, service endpoint e private endpoint.",
    "Descrever o funcionamento interno de PrivateLink, Private Endpoint e Private Service Connect.",
    "Projetar DNS privado, política de endpoint, logs e controles de rede para serviços gerenciados.",
    "Identificar riscos de DNS incorreto, IAM excessivo, origem ampla e falso senso de segurança.",
    "Criar um plano de migração de endpoints públicos para acesso privado orientado a serviço."
  ],
  "learningOutcomes": [
    "Dado um serviço gerenciado sensível, o aluno escolhe entre endpoint público, NAT, peering ou private endpoint com justificativa.",
    "Dado um problema de conexão, o aluno verifica DNS, rota, política de rede, IAM e logs na ordem correta.",
    "Dado um desenho inseguro com egress amplo, o aluno propõe endpoints privados e controles de menor privilégio.",
    "Dado um cenário híbrido, o aluno identifica como o datacenter resolverá nomes privados e acessará serviços de forma controlada."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n\n  <p>Até agora, você aprendeu a construir redes cloud com VPC/VNet, subnets, tabelas de rota, NAT, firewalls, DNS e conectividade híbrida. Esses componentes resolvem um problema clássico: conectar redes. Mas, em ambientes corporativos modernos, muitas vezes o problema real não é conectar uma rede inteira a outra. O problema é permitir que uma aplicação acesse <strong>um serviço específico</strong>, de forma privada, auditável e com o menor blast radius possível.</p>\n  <p>Pense em uma aplicação em uma subnet privada que precisa acessar um banco gerenciado, um storage, uma fila, um serviço SaaS integrado à cloud ou uma API interna fornecida por outro time. A solução antiga seria abrir rota para a internet, usar NAT Gateway, liberar egress, confiar em DNS público e proteger tudo com firewall. Funciona, mas aumenta exposição, custo e complexidade. Private Link, private endpoints e tecnologias equivalentes surgem para reduzir esse problema: aproximar o serviço da rede privada do consumidor sem publicar o serviço diretamente na internet e sem exigir peering amplo entre redes.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma workload privada precisa acessar um serviço gerenciado sensível, como banco, storage ou secrets manager. Se a equipe usa saída pública via NAT, o tráfego pode continuar protegido por TLS, mas ainda depende de egress, rotas, DNS público, allowlists e controles externos. Com endpoints privados, a organização tenta transformar esse acesso em tráfego privado, com políticas mais específicas e menor superfície de exposição.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n\n  <p>No começo da cloud, muitos serviços gerenciados eram acessados por endpoints públicos. Isso não significava necessariamente que eram inseguros: autenticação, autorização, TLS e políticas de serviço continuavam existindo. Mas, do ponto de vista de rede, a aplicação frequentemente precisava sair da rede privada para alcançar um nome público. Em ambientes simples, isso era aceitável. Em ambientes regulados, com dados sensíveis e requisitos de isolamento, esse desenho passou a gerar desconforto operacional e de segurança.</p>\n  <p>Com o amadurecimento das clouds, os provedores criaram formas de acessar serviços gerenciados por caminho privado. Na AWS, o conceito aparece fortemente com VPC endpoints e AWS PrivateLink. No Azure, Azure Private Link e Private Endpoint trazem serviços PaaS para dentro da VNet por meio de uma interface com IP privado. No Google Cloud, Private Service Connect permite que consumidores acessem serviços gerenciados ou de produtores por endereços internos na VPC. Apesar de nomes e implementações diferentes, a motivação é parecida: reduzir exposição pública e tornar o acesso orientado a serviço.</p>\n  <p>Essa evolução acompanha uma mudança maior em arquitetura. Em vez de conectar redes inteiras, a cloud incentiva acesso granular por serviço. É uma mentalidade próxima de Zero Trust: não basta estar “dentro da rede”; cada serviço deve ser acessado por caminho, identidade, política, DNS e observabilidade bem definidos.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n\n  <p>O problema central é que conectividade ampla cria riscos amplos. Quando uma aplicação precisa acessar apenas um serviço de banco gerenciado, não faz sentido abrir caminho para uma rede inteira, para a internet inteira ou para um conjunto de serviços que ela não usa. Em cloud, esse erro é comum porque NAT, rotas default e permissões genéricas parecem resolver rápido, mas deixam dívidas de segurança, custo e auditoria.</p>\n  <ul>\n    <li><strong>Exposição pública desnecessária:</strong> serviços sensíveis podem permanecer acessíveis por endpoint público, mesmo quando o consumidor está em rede privada.</li>\n    <li><strong>Egress amplo:</strong> uma subnet privada com NAT e regra outbound aberta pode alcançar muito mais do que precisa.</li>\n    <li><strong>Peering excessivo:</strong> conectar VPCs/VNets inteiras para consumir um único serviço aumenta movimento lateral potencial.</li>\n    <li><strong>DNS inconsistente:</strong> o nome do serviço pode resolver para IP público em alguns lugares e privado em outros, causando falhas difíceis.</li>\n    <li><strong>Custos invisíveis:</strong> NAT, egress, processamento de firewall, logs e tráfego inter-regional podem custar mais do que o previsto.</li>\n    <li><strong>Auditoria fraca:</strong> sem endpoint e política específica, fica difícil provar que apenas workloads autorizadas acessam determinado serviço.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> achar que endpoint privado substitui autenticação e autorização. Ele melhora o caminho de rede, mas não elimina a necessidade de IAM, secrets, TLS, políticas do serviço, logs e revisão de permissões.</div>\n\n<div class=\"callout callout--warning\"><strong>Revisão P1:</strong> em endpoints privados, a pergunta correta não é apenas “o IP é privado?”. A pergunta completa é: quem resolve esse nome, qual IP recebe, qual rota usa, qual política de endpoint permite, qual identidade autoriza, qual log prova o acesso e qual custo recorrente esse desenho cria?</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n\n  <p>A evolução do acesso a serviços cloud pode ser entendida como uma redução gradual da superfície de rede.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Modelo</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Endpoint público</td><td>Workload privada sai por NAT ou proxy para acessar serviço público</td><td>Simples e universal</td><td>Aumenta dependência de egress, allowlists, DNS público e controles externos</td></tr>\n      <tr><td>Peering/VPN</td><td>Redes inteiras são conectadas para permitir acesso privado</td><td>Útil para integração de ambientes</td><td>Pode abrir conectividade além do necessário</td></tr>\n      <tr><td>Service endpoint</td><td>Serviço é acessado por caminho otimizado do provedor, com escopo de rede</td><td>Reduz exposição em alguns cenários</td><td>Pode não criar uma interface privada dedicada na rede do consumidor</td></tr>\n      <tr><td>Private endpoint / PrivateLink / PSC</td><td>Serviço aparece como endpoint privado na rede do consumidor</td><td>Acesso orientado a serviço, com menor exposição e política específica</td><td>Exige DNS correto, governança, custo e entendimento do modelo do provedor</td></tr>\n      <tr><td>Service mesh / identity-aware access</td><td>Acesso é controlado também por identidade, mTLS e políticas de aplicação</td><td>Granularidade alta</td><td>Mais complexo; não substitui desenho de rede</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Private Link</strong>, <strong>private endpoint</strong> e <strong>Private Service Connect</strong> são padrões de conectividade privada orientada a serviço. Em vez de publicar um serviço na internet ou conectar redes inteiras, o provedor cria um ponto de entrada privado dentro da rede do consumidor. A aplicação acessa um IP privado, geralmente resolvido por DNS privado, e o provedor entrega o tráfego ao serviço gerenciado ou ao serviço do produtor.</p>\n  <div class=\"definition-box\"><strong>Definição prática:</strong> endpoint privado é uma forma de consumir um serviço por IP privado dentro da sua VPC/VNet, reduzindo a necessidade de tráfego público e permitindo controles de rede, DNS, IAM e logs mais específicos.</div>\n  <p>Há duas perspectivas importantes. O <strong>consumer</strong> é a rede ou aplicação que consome o serviço. O <strong>producer</strong> é quem oferece o serviço. Em alguns casos, o produtor é o próprio provedor cloud, como storage, banco, secrets, fila ou API gerenciada. Em outros, é uma empresa, equipe interna ou parceiro que oferece um serviço privado para consumidores autorizados.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, o endpoint privado costuma envolver uma interface de rede ou objeto equivalente dentro da rede do consumidor. Essa interface recebe um endereço IP privado de uma subnet escolhida. Quando a aplicação resolve o nome do serviço, o DNS deve devolver esse IP privado, não o IP público. O tráfego então segue pelas rotas internas do provedor até o serviço de destino, sem exigir que a workload tenha IP público ou que saia por NAT comum.</p>\n  <ol>\n    <li><strong>Criação do endpoint:</strong> a equipe escolhe o serviço, a VPC/VNet, a subnet, a região/zona e as políticas associadas.</li>\n    <li><strong>Alocação de IP privado:</strong> o endpoint recebe endereço privado dentro do espaço de endereçamento do consumidor.</li>\n    <li><strong>Associação DNS:</strong> um nome público ou privado passa a resolver para o IP privado dentro do escopo autorizado.</li>\n    <li><strong>Controle de rede:</strong> security groups, NSGs, firewalls, endpoint policies ou controles equivalentes limitam origem, porta e ação.</li>\n    <li><strong>Entrega ao serviço:</strong> a infraestrutura do provedor encaminha o tráfego do endpoint ao serviço gerenciado/produtor.</li>\n    <li><strong>Auditoria:</strong> logs de DNS, flow logs, logs do serviço e trilhas de auditoria registram uso e alterações.</li>\n  </ol>\n  <p>O ponto crítico é que endpoint privado não é apenas “um IP”. Ele é a combinação de rede, DNS, política, serviço, identidade e observabilidade. Quando qualquer uma dessas partes está errada, o problema aparece como timeout, resolução incorreta, acesso negado, certificado inválido ou tráfego saindo por caminho público.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Uma arquitetura madura de endpoints privados normalmente separa três planos. O <strong>plano de conectividade</strong> define VPC/VNet, subnet, endpoint, rota e firewall. O <strong>plano de nomes</strong> define DNS privado, split-horizon, registros, TTL e resolução híbrida. O <strong>plano de autorização</strong> define IAM, políticas do serviço, secrets, certificados e aprovações.</p>\n  <p>Em uma landing zone, é comum criar subnets específicas para endpoints privados ou ao menos reservar espaço de IP para eles. Também é comum centralizar DNS privado em um hub, permitir resolução a partir do datacenter, coletar logs e criar políticas que bloqueiam serviços críticos com endpoint público habilitado quando a exigência corporativa é acesso privado.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Componente</th><th>Função</th><th>Risco se mal desenhado</th></tr></thead>\n    <tbody>\n      <tr><td>Subnet de endpoints</td><td>Hospeda interfaces privadas de serviço</td><td>Esgotamento de IPs ou mistura com workloads inseguras</td></tr>\n      <tr><td>DNS privado</td><td>Resolve nomes de serviço para IP privado</td><td>Aplicação usa endpoint público sem perceber</td></tr>\n      <tr><td>Endpoint policy</td><td>Limita quais ações/recursos podem ser acessados pelo endpoint</td><td>Endpoint vira caminho privado amplo demais</td></tr>\n      <tr><td>SG/NSG/firewall</td><td>Controla origem, destino e porta</td><td>Qualquer workload da VPC/VNet acessa serviço sensível</td></tr>\n      <tr><td>Logs</td><td>Prova uso, troubleshooting e investigação</td><td>Acesso privado vira ponto cego</td></tr>\n    </tbody>\n  </table>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n\n  <p>Imagine um prédio corporativo. Uma forma de receber documentos seria pedir que todo funcionário saísse do prédio, atravessasse a rua e entregasse os documentos em uma agência pública. Funciona, mas expõe deslocamento, cria filas e depende de controles externos. Outra forma seria criar um guichê autorizado dentro do prédio, ligado diretamente ao serviço necessário. O funcionário ainda precisa se identificar, ainda há regras, ainda há câmeras e registro, mas o trajeto é privado e específico.</p>\n  <p>O endpoint público é como sair para a rua. O NAT é como a portaria que permite a saída. O private endpoint é como o guichê privado dentro do prédio. Ele não dispensa crachá, autorização e auditoria, mas reduz a necessidade de exposição externa e limita o caminho ao serviço certo.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--simple-example\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Uma aplicação em uma subnet privada precisa gravar arquivos em um serviço de storage gerenciado. Sem endpoint privado, a VM ou container pode sair por NAT Gateway até o endpoint público do storage. Com endpoint privado, o nome do storage resolve para um IP privado dentro da VPC/VNet. A aplicação continua usando a mesma API do storage, mas o caminho de rede muda.</p>\n  <pre class=\"code-block\"><code>Aplicação privada\n  ├─ resolve storage.empresa.cloud\n  ├─ recebe IP privado: 10.20.8.15\n  ├─ conecta via TLS na porta 443\n  ├─ passa por SG/NSG/firewall permitido\n  └─ serviço valida IAM/política antes de aceitar a operação</code></pre>\n  <p>Observe a cadeia: DNS privado escolhe o caminho, controle de rede limita origem, TLS protege transporte e IAM autoriza a ação. O endpoint privado sozinho não resolve tudo.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise-example\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Uma empresa com dados sensíveis decide que bancos gerenciados, storage de backups, secrets manager, filas e APIs internas não devem ser consumidos por endpoint público a partir de workloads privadas. A arquitetura corporativa define uma subnet de endpoints por ambiente, zonas DNS privadas, logs obrigatórios e política de bloqueio para recursos críticos sem private endpoint.</p>\n  <p>O time de plataforma publica módulos de IaC aprovados. O time de segurança cria guardrails que verificam se serviços sensíveis têm acesso público desabilitado quando suportado. O SOC coleta logs de DNS, flow logs e eventos de auditoria. O time de redes documenta quais aplicações podem acessar quais endpoints. Assim, o acesso privado deixa de ser exceção manual e vira padrão operacional.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud-example\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em AWS, uma aplicação pode usar interface VPC endpoints com AWS PrivateLink para acessar serviços compatíveis por interfaces elásticas com IP privado. Em Azure, Private Endpoint cria uma interface de rede privada dentro da VNet para acessar serviços via Azure Private Link. Em Google Cloud, Private Service Connect permite endpoints internos para acessar serviços gerenciados, APIs ou serviços publicados por produtores.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Cloud</th><th>Nome comum</th><th>Ideia prática</th></tr></thead>\n    <tbody>\n      <tr><td>AWS</td><td>PrivateLink / Interface VPC Endpoint</td><td>Consumir serviços por interfaces privadas na VPC</td></tr>\n      <tr><td>Azure</td><td>Private Link / Private Endpoint</td><td>Trazer serviço PaaS para a VNet por IP privado</td></tr>\n      <tr><td>Google Cloud</td><td>Private Service Connect</td><td>Acessar serviços de produtores usando endereços internos da VPC</td></tr>\n    </tbody>\n  </table>\n  <p>A nomenclatura muda, mas o raciocínio permanece: reduzir exposição pública e evitar conectividade ampla quando a necessidade é consumir um serviço específico.</p>\n\n<table class=\"comparison-table\"><thead><tr><th>Decisão</th><th>Quando usar</th><th>Custo/risco</th><th>Validação</th></tr></thead><tbody><tr><td>NAT Gateway</td><td>Saída geral para internet ou APIs públicas.</td><td>Cobrança por hora, por dados processados e possível egress.</td><td>Métrica do NAT, flow logs e billing por tag.</td></tr><tr><td>Private endpoint</td><td>Acesso a serviço específico por IP privado.</td><td>Custo por endpoint/hora, dados processados e DNS privado mal configurado.</td><td>DNS resolve IP privado e logs provam origem esperada.</td></tr><tr><td>Peering/transit</td><td>Conectar redes inteiras com governança.</td><td>Aumenta blast radius e pode gerar tráfego inter-região/zona.</td><td>Rotas efetivas e matriz origem-destino.</td></tr></tbody></table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops-example\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, endpoints privados não devem ser criados manualmente no console sem revisão. Eles devem virar código. Um módulo Terraform, Bicep, Pulumi ou equivalente deve receber parâmetros como nome do serviço, VPC/VNet, subnet, DNS privado, tags, política, logs e responsáveis. O pipeline valida padrões antes do merge.</p>\n  <ul>\n    <li>Bloquear criação de banco sensível com endpoint público habilitado quando a política exigir privado.</li>\n    <li>Exigir tags de dono, ambiente, criticidade e classificação de dados.</li>\n    <li>Validar que DNS privado está associado à rede correta.</li>\n    <li>Garantir que security group/NSG não permita origem ampla sem justificativa.</li>\n    <li>Publicar runbook de troubleshooting junto com o módulo.</li>\n  </ul>\n  <p>O ganho não é apenas segurança. É repetibilidade. Cada endpoint privado passa a nascer com logs, DNS, tags, políticas e documentação mínima.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security-example\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista de Segurança, private endpoints reduzem superfície, mas também criam novos pontos de atenção. O atacante que compromete uma workload dentro da VPC/VNet pode tentar abusar de endpoints privados para acessar serviços sensíveis. Por isso, é necessário combinar endpoint privado com IAM mínimo, endpoint policy, segmentação, logs e detecção de comportamento anômalo.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Risco</th><th>Exemplo</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>DNS resolve público</td><td>Aplicação usa endpoint público apesar do private endpoint existir</td><td>DNS privado, testes automatizados e logs de consulta</td></tr>\n      <tr><td>Origem ampla</td><td>Qualquer subnet consegue acessar storage sensível</td><td>SG/NSG restritivo, segmentação e revisão de fluxos</td></tr>\n      <tr><td>IAM excessivo</td><td>Endpoint privado permite caminho, mas credencial permite ações demais</td><td>Menor privilégio, políticas por recurso e rotação de credenciais</td></tr>\n      <tr><td>Ponto cego</td><td>Tráfego privado não é monitorado</td><td>Flow logs, DNS logs, logs do serviço e SIEM</td></tr>\n      <tr><td>Confiança indevida</td><td>Equipe acredita que privado significa seguro automaticamente</td><td>Threat modeling e validação periódica</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra uma aplicação privada consumindo um serviço gerenciado por endpoint privado, com DNS privado, controles de rede, IAM e logs.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1120 640\" role=\"img\" aria-labelledby=\"m14-10-title m14-10-desc\">\n    <title id=\"m14-10-title\">Private Link, endpoints privados e serviços gerenciados</title>\n    <desc id=\"m14-10-desc\">Aplicação privada resolve DNS privado para endpoint privado dentro da VPC/VNet e acessa serviço gerenciado sem usar NAT público.</desc>\n    <defs>\n      <marker id=\"m14-10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"60\" y=\"90\" width=\"600\" height=\"390\" rx=\"22\" class=\"svg-zone\" />\n    <text x=\"360\" y=\"126\" text-anchor=\"middle\" class=\"svg-label\">VPC / VNet do consumidor</text>\n\n    <rect x=\"105\" y=\"180\" width=\"190\" height=\"90\" rx=\"16\" class=\"svg-node svg-node--server\" />\n    <text x=\"200\" y=\"214\" text-anchor=\"middle\" class=\"svg-label\">Aplicação privada</text>\n    <text x=\"200\" y=\"242\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sem IP público</text>\n\n    <rect x=\"395\" y=\"175\" width=\"210\" height=\"100\" rx=\"16\" class=\"svg-node svg-node--endpoint\" />\n    <text x=\"500\" y=\"208\" text-anchor=\"middle\" class=\"svg-label\">Private Endpoint</text>\n    <text x=\"500\" y=\"236\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP privado 10.20.8.15</text>\n\n    <rect x=\"125\" y=\"350\" width=\"210\" height=\"80\" rx=\"16\" class=\"svg-node svg-node--dns\" />\n    <text x=\"230\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">DNS privado</text>\n    <text x=\"230\" y=\"410\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">serviço → 10.20.8.15</text>\n\n    <rect x=\"405\" y=\"350\" width=\"190\" height=\"80\" rx=\"16\" class=\"svg-node svg-node--security\" />\n    <text x=\"500\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">SG / NSG</text>\n    <text x=\"500\" y=\"410\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">origem e porta</text>\n\n    <rect x=\"765\" y=\"175\" width=\"260\" height=\"130\" rx=\"22\" class=\"svg-zone svg-zone--service\" />\n    <text x=\"895\" y=\"213\" text-anchor=\"middle\" class=\"svg-label\">Serviço gerenciado</text>\n    <text x=\"895\" y=\"244\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">storage / banco / fila / API</text>\n    <text x=\"895\" y=\"274\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IAM + política do serviço</text>\n\n    <rect x=\"765\" y=\"380\" width=\"260\" height=\"90\" rx=\"18\" class=\"svg-node svg-node--observability\" />\n    <text x=\"895\" y=\"414\" text-anchor=\"middle\" class=\"svg-label\">SIEM / auditoria</text>\n    <text x=\"895\" y=\"443\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS logs, flow logs, service logs</text>\n\n    <line x1=\"295\" y1=\"225\" x2=\"395\" y2=\"225\" class=\"svg-flow animated-flow\" marker-end=\"url(#m14-10-arrow)\" />\n    <line x1=\"605\" y1=\"225\" x2=\"765\" y2=\"225\" class=\"svg-flow animated-flow\" marker-end=\"url(#m14-10-arrow)\" />\n    <line x1=\"230\" y1=\"350\" x2=\"200\" y2=\"270\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m14-10-arrow)\" />\n    <line x1=\"500\" y1=\"350\" x2=\"500\" y2=\"275\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m14-10-arrow)\" />\n    <line x1=\"895\" y1=\"305\" x2=\"895\" y2=\"380\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m14-10-arrow)\" />\n\n    <line x1=\"205\" y1=\"500\" x2=\"520\" y2=\"500\" class=\"svg-flow svg-flow--blocked\" />\n    <text x=\"362\" y=\"525\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sem NAT público para este fluxo</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é conceitual, seguro e sem provisionamento pago. Você desenhará uma arquitetura de acesso privado a serviços gerenciados para uma empresa fictícia, validando DNS, rede, segurança, custos e operação.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam a diferença entre endpoint público, NAT, peering, private endpoint e política de serviço. O foco é decidir o menor caminho seguro, não decorar nomes de produtos.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio pede que você transforme uma arquitetura que usa NAT e endpoints públicos em uma arquitetura com endpoints privados, DNS correto, logs e menor privilégio.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como separar caminho de rede, resolução DNS, autorização IAM, logs e custo. Uma resposta boa não diz apenas “usar Private Link”; ela explica quem consome, quem produz, qual nome resolve, qual IP privado é usado, quais políticas limitam acesso e como validar.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n\n  <ul>\n    <li><strong>Ideia central:</strong> endpoint privado permite consumir serviços específicos sem abrir conectividade ampla.</li>\n    <li><strong>O que lembrar:</strong> DNS privado é parte essencial da solução.</li>\n    <li><strong>Erro comum:</strong> achar que privado substitui IAM, TLS, logs e políticas do serviço.</li>\n    <li><strong>Uso real:</strong> bancos, storage, secrets, filas, APIs internas e SaaS integrado podem usar acesso privado orientado a serviço.</li>\n    <li><strong>Segurança:</strong> reduza exposição pública, mas monitore abuso interno e credenciais excessivas.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, você estudará <strong>Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress</strong>. Depois de entender endpoints privados e serviços gerenciados, o próximo desafio é compreender como clusters Kubernetes usam redes cloud, IPs de pods, services, load balancers, ingress controllers, DNS e políticas de rede.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7 quando há TLS, API e IAM"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPv4",
      "IPv6",
      "DNS",
      "TCP",
      "TLS",
      "HTTPS"
    ],
    "dependsOn": [
      "VPC/VNet",
      "subnets",
      "DNS privado",
      "security groups",
      "NSG",
      "IAM",
      "logs"
    ],
    "enables": [
      "acesso privado a PaaS",
      "egress control",
      "menor blast radius",
      "governança de serviços gerenciados"
    ]
  },
  "lab": {
    "id": "lab-14.10",
    "title": "Desenhar acesso privado a serviços gerenciados sem expor tráfego público",
    "labType": "cloud-simulavel",
    "objective": "Projetar uma arquitetura que substitui acesso público via NAT por endpoints privados, com DNS correto, políticas mínimas e observabilidade.",
    "scenario": "15. Laboratório O laboratório desta aula é conceitual, seguro e sem provisionamento pago. Você desenhará uma arquitetura de acesso privado a serviços gerenciados para uma empresa fictícia, validando DNS, rede, segurança, custos e operação.",
    "topology": "Uma VPC/VNet de produção com aplicação privada, subnet de endpoints, DNS privado, serviço de storage, banco gerenciado, secrets manager, firewall/SG/NSG e SIEM.",
    "architecture": "Aplicação privada resolve nomes de serviço para IPs privados. Endpoints privados ficam em subnets controladas. SG/NSG limita origem. IAM limita ações. Logs de DNS, flow logs e serviço são enviados ao SIEM.",
    "prerequisites": [
      "Não criar recursos reais pagos.",
      "Usar CIDRs fictícios e nomes fictícios.",
      "Definir pelo menos três serviços gerenciados sensíveis.",
      "Desenhar DNS público versus privado.",
      "Definir validações de segurança e troubleshooting."
    ],
    "tools": [
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "90-120 min",
    "cost": "zero na execução simulada/local; potencialmente pago se reproduzido em cloud real. Só provisionar em conta de laboratório autorizada, com orçamento, tags e limpeza obrigatória.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventariar serviços",
        "instruction": "Liste três serviços gerenciados que a aplicação consome, como storage, banco e secrets manager.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Serviços classificados por criticidade, dados manipulados e necessidade de endpoint privado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Desenhar subnets de consumo",
        "instruction": "Defina a subnet da aplicação e a subnet de endpoints, reservando IPs suficientes para crescimento.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Diagrama com aplicação privada e endpoints privados em subnets controladas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Planejar DNS privado",
        "instruction": "Defina quais nomes serão resolvidos para IPs privados e quais zonas privadas serão associadas à VPC/VNet.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela nome → IP privado → serviço → escopo de resolução.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Definir controles de rede",
        "instruction": "Crie uma matriz origem-destino-porta entre aplicação e endpoints privados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Apenas origens autorizadas acessam endpoints na porta necessária.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Definir autorização e políticas",
        "instruction": "Associe cada endpoint a políticas de recurso/IAM e descreva quais ações são permitidas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Acesso de rede e autorização de aplicação documentados separadamente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Planejar observabilidade",
        "instruction": "Defina quais logs serão coletados: DNS, flow logs, logs do serviço, trilha de auditoria e alertas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de SIEM com eventos de criação, alteração e uso dos endpoints.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Criar runbook de troubleshooting",
        "instruction": "Escreva uma sequência de diagnóstico para timeout, acesso negado e resolução DNS incorreta.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Runbook com verificação de DNS, rota, SG/NSG, endpoint policy, IAM, TLS e logs.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Avaliar custo e risco residual",
        "instruction": "Liste custos esperados, limitações e riscos que permanecem mesmo com endpoint privado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Documento com custo por endpoint, logs, tráfego, operação e risco residual.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Private Link, endpoints privados e serviços gerenciados” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Criar matriz FinOps e limpeza obrigatória",
        "instruction": "Liste todos os componentes que poderiam gerar cobrança se este desenho fosse provisionado em cloud real. Separe custo fixo por hora, custo por GB, custo de tráfego, custo de logs e custo operacional humano.",
        "command": "Artefato: tabela custo-driver-owner-limpeza-evidência",
        "expectedOutput": "Tabela com NAT, endpoints privados, load balancers, firewalls, VPN/Interconnect/ExpressRoute/Direct Connect, peering, IPs públicos, logs e armazenamento de evidências.",
        "explanation": "Cloud Networking costuma parecer barato porque VPC/VNet e subnets podem não ter cobrança direta, mas os componentes conectados à rede frequentemente cobram por hora, por GB, por retenção ou por tráfego entre domínios."
      },
      {
        "number": 10,
        "title": "Validar runbook de rollback e evidências",
        "instruction": "Crie um rollback documentado para a mudança proposta e defina quais evidências precisam ser preservadas antes, durante e depois da alteração.",
        "command": "Artefato: runbook com gatilho, pré-checagens, execução, rollback, validação e evidências",
        "expectedOutput": "Runbook acionável por um operador que não participou do desenho original.",
        "explanation": "Arquitetura cloud profissional precisa ser reversível e auditável. Sem rollback e evidências, uma mudança correta no papel pode virar incidente prolongado em produção."
      },
      {
        "number": 11,
        "title": "Validar DNS privado e SNI sem provisionar cloud real",
        "instruction": "Simule a resolução privada de um serviço gerenciado e valide que nome, IP privado e SNI são coerentes. Use domínio fictício e endpoint controlado ou apenas saída esperada documentada.",
        "command": "dig storage.empresa.lab A +short\ncurl -vk --resolve storage.empresa.lab:443:10.20.8.15 https://storage.empresa.lab/health\nopenssl s_client -connect storage.empresa.lab:443 -servername storage.empresa.lab </dev/null",
        "expectedOutput": "Nome resolve para IP privado fictício, curl mostra tentativa HTTPS para o IP privado e openssl evidencia SNI/certificado esperado ou erro controlado documentado.",
        "explanation": "Private endpoint falha com frequência por DNS, não por rota. O teste separa resolução de nome, caminho de rede e identidade TLS."
      },
      {
        "number": 12,
        "title": "Separar conectividade privada de autorização IAM",
        "instruction": "Crie uma matriz que mostre o que é controlado por DNS/rota/SG/NSG, por policy de endpoint, por policy do recurso e por identidade da aplicação.",
        "artifact": "Matriz controle-camada-evidência: DNS, rota, SG/NSG, endpoint policy, resource policy, IAM, audit log.",
        "expectedOutput": "Tabela com pelo menos seis controles e evidência correspondente para cada camada.",
        "explanation": "Privado não significa autorizado. O aluno precisa enxergar que rede reduz exposição, mas IAM define quem pode agir."
      }
    ],
    "expectedResult": "Uma arquitetura de acesso privado a serviços gerenciados com desenho de rede, DNS, políticas, logs, troubleshooting e custo.",
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
      },
      {
        "check": "Custo e limpeza documentados",
        "command": "Revisar tabela FinOps e checklist de limpeza",
        "expected": "Todos os recursos com cobrança recorrente ou variável foram identificados e possuem estratégia de remoção ou retenção justificada.",
        "ifFails": "Volte ao desenho e marque NAT, LB, firewall, VPN, endpoint privado, IP público, peering, inter-região e logs como possíveis fontes de custo."
      },
      {
        "check": "DNS privado não aponta para endpoint público",
        "command": "dig storage.empresa.lab A +short",
        "expected": "IP dentro do CIDR privado definido para a VPC/VNet fictícia.",
        "ifFails": "Revisar private hosted zone/private DNS zone, associação à VPC/VNet e override de registro público."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se a aplicação resolve IP público, revise zona privada, associação de VPC/VNet e split-horizon.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se há timeout, revise SG/NSG, rota local, estado do endpoint e firewall intermediário.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se há acesso negado, revise IAM, política do endpoint, política do recurso e identidade usada pela aplicação.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o certificado parece inválido, confirme se o nome acessado corresponde ao certificado esperado e se não houve override incorreto de DNS.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o custo aumentou, revise número de endpoints, tráfego, logs e alternativas arquiteturais.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "O desenho parece tecnicamente correto, mas o custo mensal estimado cresce sem explicação.",
        "probableCause": "Tráfego passando por NAT ou firewall central sem necessidade, logs com retenção exagerada, endpoints em múltiplas zonas sem uso, tráfego inter-região ou recursos órfãos.",
        "howToConfirm": "Cruzar matriz de fluxos com billing, flow logs, métricas de gateway, tags e inventário de recursos.",
        "fix": "Reduzir caminhos desnecessários, aplicar endpoints privados seletivos, ajustar amostragem/retenção de logs, remover recursos órfãos e criar budgets/alertas."
      },
      {
        "symptom": "Aplicação usa endpoint público mesmo após criar private endpoint",
        "probableCause": "DNS privado ausente, zona não associada ou cache DNS antigo.",
        "howToConfirm": "Comparar dig/nslookup dentro e fora da VPC/VNet e revisar logs DNS.",
        "fix": "Associar zona privada correta, ajustar registros e limpar cache DNS controladamente."
      }
    ],
    "improvements": [
      "Criar módulos IaC reutilizáveis para endpoints privados.",
      "Adicionar policy as code para bloquear serviços sensíveis com acesso público.",
      "Centralizar DNS privado com resolução híbrida para datacenter.",
      "Criar dashboards de uso por endpoint e por aplicação.",
      "Integrar revisão de endpoint privado ao threat modeling da aplicação.",
      "Transformar o desenho em IaC com validação estática, sem aplicar recursos reais por padrão.",
      "Adicionar policy as code para negar exposição pública, ausência de tags e ausência de logs críticos.",
      "Criar budget/alerta específico para ambiente de laboratório antes de qualquer execução cloud paga.",
      "Adicionar teste de regressão para DNS, rota, firewall, endpoint privado e logging após mudanças."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "Matriz de custos com pelo menos três drivers: hora, GB processado e retenção de logs.",
      "Checklist de limpeza de recursos com itens órfãos possíveis.",
      "Matriz de evidências: logs, métricas, comandos, owners e retenção.",
      "Registro de decisão explicando quando usar e quando não usar o serviço cloud proposto.",
      "Matriz de execução indicando se o lab foi feito em modo simulado, local ou cloud real autorizada.",
      "Tabela FinOps com componente, driver de custo, owner, tag, risco de cobrança e ação de limpeza.",
      "Checklist de limpeza obrigatória assinado no próprio relatório do aluno.",
      "Evidência de validação antes/depois sem dados sensíveis, tokens, IPs públicos reais ou nomes internos produtivos.",
      "Registro de risco residual e justificativa de aceitação ou mitigação."
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Private Link, endpoints privados e serviços gerenciados” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?",
      "Qual parte deste lab poderia gerar custo recorrente mesmo sem tráfego de usuário?",
      "Qual evidência prova que a conectividade funciona sem confundir rede com autorização IAM?",
      "Qual recurso precisa ser destruído primeiro para evitar dependências órfãs?",
      "Qual log permite investigar falha de rede e qual log permite investigar alteração administrativa?"
    ],
    "challenge": "Migrar serviços sensíveis para acesso privado",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "costReview": {
      "type": "FinOps obrigatório",
      "estimateRequired": true,
      "costDrivers": [
        "hora de recurso gerenciado",
        "GB processado",
        "tráfego entre zonas ou regiões",
        "tráfego de saída para internet",
        "armazenamento e ingestão de logs",
        "IP público, load balancer, VPN, firewall e endpoints privados"
      ],
      "zeroCostAlternative": "Executar o laboratório como desenho arquitetural, tabela de decisão, simulação local ou revisão de IaC sem aplicar recursos reais."
    },
    "cleanupPlan": [
      "Exportar evidências mínimas antes da destruição: diagrama, matriz de fluxos, logs sintéticos, prints sanitizados e decisão técnica.",
      "Remover workloads de teste, services, ingress, endpoints privados, load balancers, NAT/firewall/VPN, rotas temporárias e zonas DNS privadas criadas para o lab.",
      "Remover IPs públicos, regras temporárias, secrets de teste, discos/volumes, buckets de logs temporários e recursos órfãos cobrados por hora ou por GB.",
      "Executar validação pós-limpeza no console de billing/cost management e registrar que não restaram recursos pagos do laboratório.",
      "Manter apenas artefatos sanitizados necessários para estudo ou auditoria, respeitando retenção definida."
    ],
    "optionalCloudExecution": {
      "enabled": true,
      "defaultMode": "simulado/local sem provisionamento",
      "allowedOnlyWhen": [
        "Conta cloud de laboratório autorizada.",
        "Budget/alerta configurado antes da execução.",
        "Tags de owner, ambiente e data de expiração definidas.",
        "Plano de rollback e limpeza aprovado.",
        "Nenhum dado sensível real usado no laboratório."
      ],
      "cleanupIsMandatory": true
    },
    "zeroCostAlternative": "Usar nomes fictícios, /etc/hosts temporário, serviço local HTTPS ou apenas matriz de DNS/rotas/policies sem provisionar endpoints reais.",
    "estimatedCostDrivers": [
      "recursos cobrados por hora, como NAT Gateway, VPN Gateway, firewall gerenciado, load balancer e endpoints privados",
      "processamento por GB em endpoints, NAT, firewall, load balancer e logs",
      "tráfego entre zonas, regiões, internet, peering, VPN e links dedicados",
      "armazenamento, retenção, consulta e ingestão de logs",
      "custo operacional humano de manter exceções, rotas, DNS, certificados e runbooks"
    ],
    "cloudValidationProfile": {
      "lesson": "14.10",
      "scope": "Private Link / Private Endpoint / serviço gerenciado",
      "simulationMode": "desenho + DNS fictício + curl/openssl contra endpoint controlado ou mock local",
      "optionalRealCloudMode": "criar endpoint privado em conta isolada e remover imediatamente após validação",
      "requiredArtifacts": [
        "matriz serviço-endpoint-DNS-IAM-policy-log",
        "plano de limpeza",
        "evidência de resolução DNS privada",
        "evidência de TLS e autorização separadas"
      ],
      "passCriteria": [
        "DNS privado resolve para IP privado esperado",
        "política de rede e IAM são documentadas separadamente",
        "custos e limpeza aparecem no relatório"
      ]
    }
  },
  "exercises": [
    {
      "question": "Uma aplicação privada acessa storage sensível por NAT Gateway. Quais problemas esse desenho pode gerar?",
      "answer": "Exposição por endpoint público, egress amplo, custo de NAT, dependência de DNS público e auditoria mais difícil."
    },
    {
      "question": "Por que DNS privado é essencial em endpoints privados?",
      "answer": "Porque a aplicação geralmente usa o nome do serviço; se ele resolver para IP público, o tráfego pode sair pelo caminho errado."
    },
    {
      "question": "Private endpoint substitui IAM?",
      "answer": "Não. Ele controla caminho de rede; IAM e políticas do serviço continuam definindo quem pode fazer o quê."
    },
    {
      "question": "Quando peering seria exagerado para consumir um serviço?",
      "answer": "Quando a necessidade é acessar apenas um serviço específico; conectar redes inteiras aumenta blast radius e movimento lateral potencial."
    },
    {
      "id": "ex14.10.p1.1",
      "type": "arquitetura",
      "prompt": "Monte uma matriz comparando NAT Gateway, Private Endpoint e Peering para acesso a um banco gerenciado.",
      "expectedAnswer": "A resposta deve comparar escopo, blast radius, DNS, IAM, logs, custo por hora/GB e rollback.",
      "explanation": "A decisão correta depende do problema: acesso a serviço específico, saída genérica ou conectividade ampla entre redes."
    }
  ],
  "quiz": [
    {
      "question": "Qual é o principal objetivo de um private endpoint?",
      "options": [
        "Aumentar throughput de CPU",
        "Permitir acesso privado orientado a serviço",
        "Substituir TLS",
        "Eliminar DNS"
      ],
      "correctAnswer": 1,
      "explanation": "Private endpoint reduz exposição pública e permite consumo privado de um serviço específico."
    },
    {
      "question": "O que acontece se o DNS resolver o serviço para IP público mesmo existindo endpoint privado?",
      "options": [
        "Nada, o endpoint privado será usado automaticamente",
        "O tráfego pode seguir pelo caminho público/NAT",
        "O IAM deixa de funcionar",
        "A subnet muda de CIDR"
      ],
      "correctAnswer": 1,
      "explanation": "DNS é parte crítica. Resolução pública pode levar a tráfego público ou egress inesperado."
    },
    {
      "question": "Qual afirmação está correta?",
      "options": [
        "Endpoint privado substitui IAM",
        "Endpoint privado substitui criptografia",
        "Endpoint privado reduz exposição de rede, mas não elimina autenticação e autorização",
        "Endpoint privado sempre é gratuito"
      ],
      "correctAnswer": 2,
      "explanation": "Ele melhora o caminho de rede, mas segurança completa exige IAM, TLS, políticas e logs."
    },
    {
      "question": "Em uma arquitetura madura, que logs ajudam a investigar uso de endpoint privado?",
      "options": [
        "Apenas log de CPU",
        "DNS logs, flow logs, logs do serviço e auditoria",
        "Somente screenshot do console",
        "Apenas ping"
      ],
      "correctAnswer": 1,
      "explanation": "A investigação precisa correlacionar resolução, fluxo, ação no serviço e alterações administrativas."
    },
    {
      "question": "Qual risco permanece mesmo com endpoint privado?",
      "options": [
        "Credencial com permissão excessiva",
        "Ausência total de rede",
        "Impossibilidade de usar TLS",
        "Fim da necessidade de SIEM"
      ],
      "correctAnswer": 0,
      "explanation": "Um atacante com credencial excessiva pode abusar do serviço pelo caminho privado."
    },
    {
      "question": "Qual desenho tende a ter menor blast radius para consumir um banco gerenciado?",
      "options": [
        "Peering amplo entre todas as VPCs",
        "Endpoint público com NAT aberto",
        "Private endpoint com DNS privado, origem restrita e IAM mínimo",
        "Liberar 0.0.0.0/0 no firewall"
      ],
      "correctAnswer": 2,
      "explanation": "Esse desenho limita caminho, origem e permissão."
    },
    {
      "id": "q14.10.p1.1",
      "type": "cenário",
      "q": "Uma aplicação privada acessa storage sensível via NAT, mas o provedor oferece endpoint privado. Qual análise deve vir antes da migração?",
      "opts": [
        "Apenas trocar o DNS para IP privado",
        "Validar DNS privado, policy de endpoint, IAM, logs, custo e rollback",
        "Remover IAM porque o tráfego será privado",
        "Apagar o NAT imediatamente"
      ],
      "a": 1,
      "exp": "Endpoint privado reduz exposição de rede, mas não substitui IAM, logs, validação de DNS, controle de custo e plano de rollback.",
      "difficulty": "intermediário",
      "topic": "Private Endpoint"
    }
  ],
  "flashcards": [
    {
      "front": "Private endpoint",
      "back": "Ponto de acesso privado dentro da rede do consumidor para consumir um serviço específico."
    },
    {
      "front": "Consumer",
      "back": "Rede, aplicação ou conta que consome um serviço por endpoint privado."
    },
    {
      "front": "Producer",
      "back": "Serviço gerenciado, parceiro ou equipe que oferece o serviço consumido."
    },
    {
      "front": "DNS privado",
      "back": "Mecanismo que faz o nome do serviço resolver para IP privado no escopo correto."
    },
    {
      "front": "Endpoint policy",
      "back": "Política que restringe quais recursos ou ações podem ser acessados por um endpoint."
    },
    {
      "front": "Blast radius",
      "back": "Alcance potencial de impacto caso uma credencial, workload ou caminho seja comprometido."
    },
    {
      "id": "fc14.10.p1.1",
      "front": "Private endpoint substitui IAM?",
      "back": "Não. Ele altera o caminho de rede, mas autorização continua dependendo de identidade, políticas de recurso e auditoria.",
      "tags": [
        "private-link",
        "iam",
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "mentorQuestions": [
    "Você está usando private endpoint para reduzir exposição real ou apenas para cumprir checklist?",
    "Se o DNS privado falhar, a aplicação cairá, usará caminho público ou terá comportamento inconsistente?",
    "Quem consegue alterar endpoint, DNS, política e IAM, e onde esses eventos aparecem no SIEM?"
  ],
  "challenge": {
    "title": "Migrar serviços sensíveis para acesso privado",
    "scenario": "Uma aplicação de produção acessa storage de documentos, banco gerenciado e secrets manager por endpoint público usando NAT. A empresa quer reduzir exposição pública e melhorar auditoria.",
    "tasks": [
      "Identificar quais fluxos devem migrar para endpoint privado.",
      "Desenhar subnets e IPs dos endpoints.",
      "Definir DNS privado e validação de resolução.",
      "Criar matriz SG/NSG/firewall por origem, destino e porta.",
      "Definir políticas IAM e políticas de recurso.",
      "Definir logs, alertas e runbook de troubleshooting.",
      "Apontar custos e riscos residuais."
    ],
    "successCriteria": [
      "Nenhum serviço sensível depende de endpoint público sem justificativa.",
      "DNS privado resolve corretamente para workloads autorizadas.",
      "IAM mínimo é tratado separadamente do caminho de rede.",
      "Há evidência de logs e validação operacional.",
      "A solução não conecta redes inteiras quando apenas serviços específicos são necessários."
    ],
    "gradingRubric": [
      {
        "criterion": "Escolha correta do padrão de acesso",
        "points": 20,
        "description": "Compara NAT, endpoint público, peering e private endpoint sem tratar “privado” como sinônimo de seguro."
      },
      {
        "criterion": "DNS privado e validação",
        "points": 20,
        "description": "Define zonas, vínculos, split-horizon, cache e comandos de validação."
      },
      {
        "criterion": "Segurança e IAM",
        "points": 20,
        "description": "Separa controles de rede, policy de endpoint, policy de recurso e identidade."
      },
      {
        "criterion": "Observabilidade e troubleshooting",
        "points": 20,
        "description": "Inclui logs, métricas, erros comuns e runbook de diagnóstico."
      },
      {
        "criterion": "FinOps e limpeza",
        "points": 20,
        "description": "Identifica custos recorrentes, recursos órfãos e estratégia de remoção."
      }
    ],
    "minimumPassingScore": 70,
    "criticalFailureCriteria": [
      "Arquitetura que expõe dados sensíveis diretamente à internet sem justificativa e mitigação.",
      "Ausência de plano de logs/evidências para diagnóstico e auditoria.",
      "Ausência de análise de custos ou limpeza de recursos quando houver proposta de provisionamento cloud.",
      "Confusão entre conectividade de rede e autorização por identidade/IAM."
    ],
    "expectedDeliverables": [
      "Matriz DNS/endpoint/IAM/policy/logs",
      "Plano de limpeza de endpoint privado, zona DNS, regras temporárias e logs"
    ]
  },
  "commentedSolution": {
    "summary": "A melhor solução cria endpoints privados para os serviços sensíveis, associa zonas DNS privadas à rede consumidora, restringe origem por SG/NSG, aplica IAM mínimo, coleta logs e mantém exceções públicas apenas quando justificadas.",
    "steps": [
      "Classificar serviços por sensibilidade e necessidade de acesso privado.",
      "Criar endpoints privados em subnets controladas e reservar IPs suficientes.",
      "Configurar DNS privado para que nomes de serviço resolvam para IPs privados no escopo correto.",
      "Restringir acesso de rede à aplicação autorizada, não à VPC/VNet inteira.",
      "Aplicar políticas de recurso e IAM mínimo para limitar ações.",
      "Enviar DNS logs, flow logs, logs do serviço e auditoria ao SIEM.",
      "Criar testes de pipeline para impedir regressão para endpoint público."
    ],
    "commonMistakes": [
      "Criar endpoint privado, mas manter DNS resolvendo público.",
      "Liberar origem ampla no SG/NSG e confiar apenas no fato de ser privado.",
      "Dar permissão IAM administrativa à aplicação.",
      "Não coletar logs porque o tráfego é privado.",
      "Usar peering amplo quando endpoint de serviço seria suficiente."
    ]
  },
  "glossary": [
    {
      "term": "Private Link",
      "shortDefinition": "Tecnologia de acesso privado a serviços.",
      "longDefinition": "Modelo em que consumidores acessam serviços por endereços privados, evitando exposição pública ampla.",
      "example": "AWS PrivateLink para acessar serviço compatível por interface endpoint.",
      "relatedTerms": [
        "private endpoint",
        "endpoint service"
      ],
      "relatedLessons": [
        "14.10"
      ]
    },
    {
      "term": "Private Endpoint",
      "shortDefinition": "Interface privada para consumir um serviço.",
      "longDefinition": "Objeto com IP privado dentro da rede do consumidor que conecta de forma privada a um serviço gerenciado ou publicado.",
      "example": "Azure Private Endpoint para Azure SQL.",
      "relatedTerms": [
        "DNS privado",
        "VNet"
      ],
      "relatedLessons": [
        "14.7"
      ]
    },
    {
      "term": "Private Service Connect",
      "shortDefinition": "Modelo do Google Cloud para acesso privado orientado a serviço.",
      "longDefinition": "Permite que consumidores acessem serviços gerenciados ou publicados usando endereços internos na VPC.",
      "example": "Endpoint interno para API ou serviço produtor.",
      "relatedTerms": [
        "producer",
        "consumer"
      ],
      "relatedLessons": [
        "14.10"
      ]
    },
    {
      "term": "Endpoint policy",
      "shortDefinition": "Política associada ao endpoint.",
      "longDefinition": "Controle que limita quais recursos ou ações podem ser acessados por meio do endpoint, quando suportado.",
      "example": "Permitir acesso apenas a um bucket específico.",
      "relatedTerms": [
        "IAM",
        "menor privilégio"
      ],
      "relatedLessons": [
        "13.8"
      ]
    },
    {
      "term": "Split-horizon DNS",
      "shortDefinition": "Resolução diferente conforme origem da consulta.",
      "longDefinition": "Permite que o mesmo nome resolva para IP privado dentro da rede e para outro destino fora dela, conforme arquitetura.",
      "example": "storage.empresa resolve privado dentro da VNet.",
      "relatedTerms": [
        "DNS privado"
      ],
      "relatedLessons": [
        "14.7"
      ]
    },
    {
      "term": "Egress control",
      "shortDefinition": "Controle de tráfego de saída.",
      "longDefinition": "Conjunto de rotas, firewalls, NAT, proxies e endpoints que define para onde workloads podem sair.",
      "example": "Substituir saída NAT ampla por endpoints privados específicos.",
      "relatedTerms": [
        "NAT",
        "firewall"
      ],
      "relatedLessons": [
        "14.4",
        "14.5"
      ]
    },
    {
      "term": "Policy de endpoint",
      "shortDefinition": "Política que restringe quais ações, identidades ou recursos podem usar um endpoint privado ou de serviço.",
      "longDefinition": "Mesmo quando o caminho de rede é privado, a política de endpoint ou de recurso define o que pode ser acessado e por quem. Ela complementa, mas não substitui, IAM e logging.",
      "example": "Permitir que apenas uma role de aplicação acesse um bucket específico por meio de um VPC Endpoint.",
      "relatedTerms": [
        "PrivateLink",
        "Private Endpoint",
        "IAM",
        "DNS privado"
      ],
      "relatedLessons": [
        "14.10",
        "13.10"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "AWS PrivateLink concepts",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/concepts.html",
      "note": "Descreve conectividade privada entre recursos em VPC e serviços fora da VPC usando IPs privados."
    },
    {
      "type": "official-doc",
      "title": "Access an AWS service using an interface VPC endpoint",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/privatelink/create-interface-endpoint.html",
      "note": "Documenta interface endpoints para conectar a serviços compatíveis com AWS PrivateLink."
    },
    {
      "type": "official-doc",
      "title": "Azure Private Link documentation",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/private-link/",
      "note": "Define Azure Private Link para acessar PaaS, serviços próprios e serviços de parceiros por Private Endpoint."
    },
    {
      "type": "official-doc",
      "title": "What is a private endpoint?",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/private-link/private-endpoint-overview",
      "note": "Define private endpoint como interface de rede com IP privado da VNet."
    },
    {
      "type": "official-doc",
      "title": "Private Service Connect",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/vpc/docs/private-service-connect",
      "note": "Documenta acesso privado a serviços gerenciados a partir de uma VPC."
    },
    {
      "type": "official-doc",
      "title": "Private access options for services",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/vpc/docs/private-access-options",
      "note": "Resume opções de conectividade privada para APIs e serviços no Google Cloud."
    },
    {
      "type": "official-doc",
      "title": "AWS PrivateLink pricing",
      "organization": "AWS",
      "url": "https://aws.amazon.com/privatelink/pricing/",
      "note": "Referência oficial de cobrança por endpoint/hora e dados processados em AWS PrivateLink."
    },
    {
      "type": "official-doc",
      "title": "Cloud Architecture Framework / Well-Architected guidance",
      "organization": "AWS/Azure/Google Cloud",
      "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
      "note": "Use como referência de princípios de arquitetura, custo, operação, segurança e confiabilidade, adaptando ao provedor escolhido."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.7",
      "reason": "DNS público, privado e split-horizon são base para private endpoints."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.8",
      "reason": "Zero Trust reforça que endpoint privado deve ser combinado com identidade e contexto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC",
      "lesson": "Policy as Code",
      "reason": "Endpoints privados devem ser versionados e validados por pipelines."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "Service principals",
      "reason": "Workloads que usam endpoints privados também precisam de identidades de serviço bem governadas."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e plataforma de aplicações",
      "lesson": "Service, Ingress, CNI, NetworkPolicy e operação de clusters",
      "reason": "Kubernetes depende de redes, DNS, balanceamento, políticas e observabilidade para operar aplicações modernas."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Identidades de workload e serviços",
      "lesson": "Service principals, OIDC federation, managed identities e contas de serviço",
      "reason": "Serviços, pipelines e workloads acessam recursos usando identidade própria, não apenas endereço IP ou regra de firewall."
    }
  ],
  "pedagogicalMap": {
    "problem": "Aplicações privadas precisam consumir serviços sensíveis sem depender de endpoint público ou conectividade ampla.",
    "concept": "Endpoint privado cria acesso orientado a serviço por IP privado e DNS controlado.",
    "internalMechanism": "Interface privada, DNS privado, controle de rede, política de endpoint, IAM e logs trabalham juntos.",
    "realUse": "Storage, bancos, secrets, filas, APIs internas e serviços SaaS conectados à cloud.",
    "commonMistake": "Criar private endpoint e esquecer DNS, IAM mínimo ou logs.",
    "securityImpact": "Reduz exposição pública, mas não elimina risco de credenciais excessivas ou abuso interno.",
    "operationalImpact": "Exige IPAM, governança DNS, observabilidade, custo e runbooks.",
    "summary": "Private endpoint não é magia; é arquitetura de rede, DNS, identidade e operação trabalhando juntas."
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
      "14.11"
    ]
  },
  "security": {
    "goodPractices": [
      "Aplicar desenho hub-spoke, rotas explícitas e separação de ambientes quando fizer sentido.",
      "Usar private endpoints, DNS privado e políticas de egress para reduzir exposição pública.",
      "Habilitar flow logs, auditoria de mudanças e métricas de gateways, balanceadores e firewalls.",
      "Documentar custos recorrentes de NAT Gateway, tráfego entre zonas/regiões e appliances gerenciados.",
      "Validar conectividade com testes sintéticos antes e depois de mudanças de IaC.",
      "Separar claramente caminho de rede, autenticação, autorização e auditoria: endpoint privado não substitui IAM.",
      "Definir logging e retenção antes de colocar workloads críticas em produção.",
      "Validar DNS privado e rotas com evidências antes de remover caminhos públicos antigos.",
      "Documentar exceções com dono, prazo, justificativa, risco residual e plano de remoção."
    ],
    "badPractices": [
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção.",
      "Acreditar que “privado” significa automaticamente autorizado e seguro.",
      "Criar NAT, load balancers, endpoints e firewalls sem tags, owner ou plano de limpeza.",
      "Centralizar todo tráfego no hub sem capacidade, observabilidade e critério de inspeção.",
      "Habilitar logs indiscriminadamente sem retenção, amostragem, destino e estimativa de custo."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar cloud networking, conectividade privada, governança, observabilidade e arquitetura híbrida com impacto operacional, financeiro e de segurança.",
      "Confundir endpoint privado com peering entre redes inteiras.",
      "Esquecer que DNS privado é parte crítica do desenho e do troubleshooting.",
      "Não diferenciar tráfego negado em firewall de tráfego não roteado ou não resolvido por DNS.",
      "Não planejar evidência de auditoria para mudanças de rota, SG/NSG, firewall, DNS e IAM."
    ],
    "vulnerabilities": [
      {
              "name": "Risco cloud específico — Private Link, endpoints privados e serviços gerenciados",
              "description": "Em Private Link, endpoints privados e serviços gerenciados, o risco principal é criar caminho privado, rota, endpoint, peering, CNI, observabilidade ou landing zone que pareça segura, mas permita exposição pública residual, bypass de firewall, resolução DNS privada incorreta, rota assimétrica ou tráfego sem telemetria.",
              "defensiveExplanation": "O risco aparece quando VPC/VNet, route table, endpoint privado, DNS privado, security group/NSG, NAT, firewall gerenciado, Kubernetes CNI e logs cloud são tratados como peças separadas, sem validação ponta a ponta.",
              "mitigation": "Validar DNS privado e público, rota de ida e retorno, SG/NSG/NACL, egress, flow logs, IAM/RBAC, custos e limpeza; manter evidências antes/depois, testes por origem e destino, IaC revisado e rollback documentado."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Flow logs de VPC/VNet, firewall gerenciado, NAT Gateway, Load Balancer e Private Endpoint.",
      "Auditoria de mudanças de IaC, route tables, NSG/SG, DNS privado e peering.",
      "Métricas de latência, drops, resets, health checks, egress e custo por recurso."
    ],
    "hardening": [
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 14.10."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Private Link, endpoints privados e serviços gerenciados.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 14.10?"
    ],
    "commands": [
      {
        "platform": "AWS/Azure/GCP",
        "command": "verificar route tables, SG/NSG, NACL/firewall, DNS privado, flow logs e auditoria de mudanças",
        "purpose": "Confirmar caminho, política e estado real da conectividade cloud.",
        "expectedObservation": "Rotas, políticas e DNS coerentes com o desenho esperado.",
        "interpretation": "Divergência entre desenho e estado aplicado indica falha de IaC, mudança manual ou configuração incompleta."
      },
      {
        "platform": "Linux",
        "command": "dig nome.privado && curl -vk https://servico && traceroute destino",
        "purpose": "Validar DNS, TLS, camada de aplicação e caminho a partir de uma origem controlada.",
        "expectedObservation": "Nome resolve para destino esperado e conexão segue rota permitida.",
        "interpretation": "Falha em DNS, handshake ou caminho direciona o próximo teste."
      },
      {
        "platform": "Kubernetes/Cloud",
        "command": "kubectl get svc,ingress,pods,endpoints -A && kubectl describe ingress <nome>",
        "purpose": "Quando aplicável, validar serviço, endpoints, ingress e integração com balanceador/cloud.",
        "expectedObservation": "Endpoints saudáveis e ingress/balanceador com configuração esperada.",
        "interpretation": "Sem endpoints saudáveis, a falha pode estar no serviço ou readiness, não apenas na rede."
      },
      {
        "platform": "Cloud console / CLI",
        "command": "Validar rotas efetivas, regras efetivas, DNS resolvido, health checks, logs de fluxo e billing por tag",
        "purpose": "Correlacionar plano de rede com comportamento real e custo real.",
        "expectedObservation": "O caminho observado deve bater com o diagrama e com a matriz de fluxos.",
        "interpretation": "Divergência entre desenho e evidência indica drift, rota mais específica, DNS errado, política efetiva inesperada ou recurso órfão."
      }
    ],
    "decisionTree": [
      {
        "if": "O problema ocorre para todos os usuários e todas as origens",
        "then": "Priorizar serviço, DNS global, mudança central, firewall compartilhado, cloud regional ou dependência comum."
      },
      {
        "if": "O problema ocorre apenas para uma origem, filial, subnet ou usuário",
        "then": "Priorizar rota, política local, DNS específico, VPN, segmentação, identidade ou configuração do cliente."
      },
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, split-horizon, cache, search suffix, resolver usado e registros privados/públicos."
      },
      {
        "if": "Conecta, mas falha após handshake ou autenticação",
        "then": "Investigar TLS, proxy, WAF, identidade, autorização, cabeçalhos, sessão e logs de aplicação."
      },
      {
        "if": "A evidência aponta para mudança recente",
        "then": "Comparar antes/depois, avaliar rollback seguro, registrar impacto e transformar causa em controle preventivo."
      },
      {
        "if": "Serviço funciona, mas pelo caminho público antigo",
        "then": "Verificar DNS privado, zona vinculada, precedence de resolução, rota, policy do endpoint e cache DNS do cliente."
      },
      {
        "if": "Serviço falha apenas em uma zona ou subnet",
        "then": "Comparar rotas efetivas, associações de tabela, endpoints por zona, SG/NSG/firewall e health checks naquela zona."
      }
    ]
  },
  "cloudFinalReview": {
    "reviewId": "p1-m14-final-14.10",
    "scope": "Revisão fina P1 das aulas finais de Cloud Networking.",
    "officialValidationUsed": [
      "Kubernetes Services e abstração de endpoints para Pods efêmeros.",
      "Kubernetes CNI como requisito para implementar o modelo de rede do cluster.",
      "Custos recorrentes de NAT Gateway, PrivateLink/Private Endpoint, load balancer, firewall gerenciado, tráfego e logs.",
      "Flow logs como fonte de monitoramento, forense, segurança e otimização de custos, com limitações de amostragem conforme provedor.",
      "Landing zone como modelo operacional com governança, conectividade, logging, identidade, políticas, automação e controle de exceções."
    ],
    "finOpsControls": [
      "Separar custo fixo por hora de custo variável por GB processado ou transferido.",
      "Modelar tráfego por caminho: internet, NAT, load balancer, peering, link dedicado, endpoint privado e logs.",
      "Estimar impacto de multi-AZ/multi-zona antes de colocar appliances, NAT gateways e endpoints em todas as zonas.",
      "Definir tags obrigatórias de aplicação, ambiente, owner, centro de custo, criticidade e data de expiração.",
      "Criar alarme de orçamento e anomalia antes de liberar ambiente de teste prolongado.",
      "Preferir laboratório conceitual ou local quando o objetivo pedagógico não exige cobrança real."
    ],
    "cleanupPlan": [
      "Registrar todos os recursos criados: VPC/VNet, subnets, gateways, load balancers, endpoints privados, IPs públicos, firewalls, VPNs, zonas DNS e buckets de log.",
      "Destruir recursos por IaC quando possível, usando o mesmo pipeline que criou o ambiente.",
      "Remover dependências em ordem segura: aplicações, balanceadores, endpoints, rotas, gateways, zonas DNS, logs temporários e redes.",
      "Verificar recursos órfãos cobrados por hora ou por volume: NAT Gateway, IP público, firewall gerenciado, load balancer, endpoint privado, VPN gateway e discos/instâncias de observabilidade.",
      "Validar no console de billing ou cost management se a queda de custo apareceu após a limpeza.",
      "Preservar apenas evidências necessárias para auditoria conforme política de retenção."
    ],
    "evidenceChecklist": [
      "Diagrama lógico de rede com zonas, subnets, rotas, pontos de inspeção e fluxos críticos.",
      "Matriz origem-destino-porta-protocolo-dono-justificativa.",
      "Plano de DNS público/privado, incluindo split-horizon e validação de resolução.",
      "Plano de logs e métricas com retenção, destino, amostragem e dono operacional.",
      "Estimativa de custos de tráfego, NAT, endpoints, balanceadores, firewalls, VPN, peering/interconnect e logs.",
      "Runbook de troubleshooting e rollback para cada componente crítico."
    ],
    "releaseReadiness": {
      "contentDepth": "revisado",
      "labs": "reforçados com custo, limpeza, validação e evidências",
      "security": "reforçada com IAM separado de conectividade, menor privilégio e observabilidade",
      "cloudCost": "reforçado com riscos de cobrança e controles FinOps",
      "capstone": "rubrica de aula adicionada"
    }
  },
  "cloudDecisionMatrix": [
    {
      "option": "Endpoint público + IAM/TLS",
      "useWhen": "Baixa criticidade, acesso externo necessário ou serviço sem suporte privado.",
      "notEnoughWhen": "Dados sensíveis, ambiente regulado, egress amplo ou exigência de não trafegar por endpoint público.",
      "evidence": "Policy de recurso, logs de autenticação, TLS e origem.",
      "costRisk": "Egress/NAT, allowlists e monitoramento externo."
    },
    {
      "option": "NAT Gateway",
      "useWhen": "Workloads privadas precisam acessar múltiplos destinos públicos.",
      "notEnoughWhen": "O destino é um serviço gerenciado sensível que suporta endpoint privado.",
      "evidence": "Métricas do NAT, flow logs, tabela de rotas e billing.",
      "costRisk": "Hora do gateway e GB processado, além de egress."
    },
    {
      "option": "Private endpoint / PrivateLink / Private Service Connect",
      "useWhen": "Acesso privado a serviço específico com menor exposição de rede.",
      "notEnoughWhen": "É necessário conectar redes inteiras ou fazer roteamento arbitrário entre ambientes.",
      "evidence": "DNS privado, IP privado, policy de endpoint, logs de serviço e IAM.",
      "costRisk": "Endpoint por zona/região, dados processados e complexidade DNS."
    }
  ],
  "p1_09_cloudNetworkingv2final": {
    "status": "aplicado",
    "focus": "Private Link / Private Endpoint / serviço gerenciado",
    "accessPolicyPreserved": true,
    "labExecutionModes": [
      "simulado/local",
      "cloud real opcional autorizada"
    ],
    "required": [
      "custo estimado",
      "alternativa zero custo",
      "limpeza obrigatória",
      "validação objetiva",
      "evidências sanitizadas"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false,
    "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
  }
};
