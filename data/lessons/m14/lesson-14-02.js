export const lesson1402 = {
  "id": "14.2",
  "moduleId": "m14",
  "order": 2,
  "title": "Regiões, zonas de disponibilidade, edge e latência",
  "subtitle": "Como localização física, domínio de falha e proximidade do usuário afetam disponibilidade, custo, compliance e experiência em cloud.",
  "duration": "90-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "cloud networking",
    "regiões",
    "zonas de disponibilidade",
    "edge",
    "latência",
    "resiliência",
    "dr",
    "cdn",
    "waf",
    "custos",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.1",
      "reason": "É necessário entender por que cloud networking existe antes de escolher localização e domínios de falha."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.x",
      "reason": "CIDR, IP e rotas continuam sendo base para redes cloud."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.x",
      "reason": "Latência, caminhos e roteamento dependem do entendimento de trajetos de rede."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.x",
      "reason": "Decisões de região, zona e edge têm impacto direto em segurança, logs e resposta a incidente."
    }
  ],
  "objectives": [
    "Explicar a diferença entre região, zona de disponibilidade, edge e recurso global.",
    "Relacionar localização com latência, disponibilidade, custo, compliance e troubleshooting.",
    "Comparar multi-AZ, multi-região, edge/CDN e arquitetura híbrida.",
    "Identificar riscos de dependência zonal, replicação inter-regional e origem exposta.",
    "Criar uma decisão arquitetural documentada para escolha de região e estratégia de resiliência.",
    "Preparar o aluno para desenhar VPC/VNet, CIDR e subnets na próxima aula."
  ],
  "learningOutcomes": [
    "Dado um conjunto de usuários e requisitos, o aluno consegue justificar uma região primária.",
    "Dado um requisito de alta disponibilidade, o aluno distingue multi-AZ de multi-região.",
    "Dado um problema de latência, o aluno levanta hipóteses envolvendo distância, DNS, CDN, edge e dependências remotas.",
    "Dado um desenho cloud, o aluno identifica recursos zonais, regionais e globais que precisam de atenção."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma aplicação foi migrada para a cloud e, tecnicamente, está funcionando. O load balancer responde, o banco gerenciado está ativo e o DNS aponta para o endpoint correto. Mesmo assim, usuários do Brasil reclamam de lentidão, a equipe de segurança percebe que logs de uma região não chegam no SIEM central a tempo, a replicação entre bancos gera custo inesperado e uma falha em uma zona derruba mais serviços do que deveria. O problema não está apenas na aplicação. Está na escolha de onde a aplicação vive: região, zona, borda e caminho de rede.</p>\n  <p>Em cloud, localização não é detalhe de infraestrutura. Ela afeta latência, disponibilidade, soberania de dados, custo de tráfego, desenho de disaster recovery, arquitetura de DNS, escolha de serviços e experiência do usuário. Um sistema pode estar “na cloud” e ainda estar longe demais do usuário, dependente demais de uma única zona, distribuído demais para o orçamento ou desenhado de forma incompatível com exigências regulatórias.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> escolher uma região apenas porque “é a padrão” pode criar latência ruim, custo de transferência, dependência regional, dificuldade de auditoria e incidentes de disponibilidade. Cloud networking começa pela geografia técnica.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No datacenter tradicional, a localização normalmente era conhecida: um prédio da empresa, uma sala cofre, um colocation ou um provedor local. A distância física entre usuário e sistema existia, mas era menos dinâmica. A rede corporativa tinha circuitos, MPLS, links dedicados, VPNs e rotas previsíveis. Quando a organização precisava de alta disponibilidade, criava um segundo datacenter ou uma sala de contingência, mas isso era caro, lento e dependia de grande planejamento.</p>\n  <p>A cloud pública mudou essa lógica ao oferecer infraestrutura distribuída globalmente. Em vez de comprar um datacenter em outro país, uma equipe pode escolher uma região. Em vez de construir dois prédios separados na mesma região metropolitana, pode distribuir recursos entre zonas de disponibilidade. Em vez de instalar servidores em dezenas de cidades, pode usar edge locations, CDNs, DNS global e serviços de borda.</p>\n  <p>Essa evolução trouxe uma vantagem enorme: proximidade, resiliência e alcance global sob demanda. Mas também trouxe uma nova responsabilidade: o arquiteto precisa entender a diferença entre região, zona, localização de borda, zona local, recurso global, recurso regional e recurso zonal. Sem isso, a arquitetura fica parecida com um mapa sem escala: parece conectada, mas ninguém sabe a distância, o custo, a latência nem o domínio de falha real.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema central desta aula é que cloud networking não acontece em um espaço abstrato. Todo pacote percorre distância física, passa por domínios administrativos, cruza zonas, regiões, links internos, internet, backbones privados, gateways e serviços gerenciados. A escolha de localização muda o comportamento técnico do sistema.</p>\n  <ul>\n    <li><strong>Latência:</strong> quanto maior a distância e a quantidade de saltos, maior tende a ser o RTT percebido por aplicações sensíveis.</li>\n    <li><strong>Disponibilidade:</strong> recursos em uma única zona podem falhar juntos; recursos em múltiplas zonas reduzem alguns riscos, mas aumentam complexidade.</li>\n    <li><strong>Custo:</strong> tráfego entre zonas, regiões, internet, NAT, CDN, replicação e logs pode ter cobrança diferente.</li>\n    <li><strong>Compliance:</strong> dados e logs podem precisar permanecer em uma geografia específica.</li>\n    <li><strong>Troubleshooting:</strong> um incidente pode ser local, zonal, regional, inter-regional, de DNS, de rota, de provedor ou de última milha do usuário.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha comum:</strong> alta disponibilidade não significa simplesmente “colocar em outra região”. Às vezes, multi-AZ resolve melhor; às vezes, multi-região é necessário; às vezes, edge/CDN resolve latência sem duplicar todo o backend.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução da localização em cloud pode ser vista como a passagem de datacenter único para múltiplos domínios de falha e múltiplos pontos de presença.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Datacenter único</td><td>Todos os serviços em uma localidade física.</td><td>Falha local pode afetar tudo; usuários distantes sofrem latência.</td><td>Segundo datacenter e replicação.</td></tr>\n      <tr><td>Dois datacenters</td><td>Primário e contingência, normalmente caros e complexos.</td><td>Operação pesada, failover difícil e baixa elasticidade.</td><td>Regiões cloud e zonas de disponibilidade.</td></tr>\n      <tr><td>Multi-AZ</td><td>Serviços distribuídos em zonas isoladas dentro de uma região.</td><td>Protege contra falhas zonais, mas não elimina dependência regional.</td><td>Multi-região para DR, presença global e exigências regulatórias.</td></tr>\n      <tr><td>Multi-região</td><td>Workloads ou réplicas em regiões diferentes.</td><td>Mais latência entre componentes, maior custo e consistência mais difícil.</td><td>Arquiteturas ativas/ativas, ativas/passivas, CDN e edge.</td></tr>\n      <tr><td>Edge</td><td>Conteúdo, proteção ou computação próximos do usuário.</td><td>Nem tudo pode ou deve rodar na borda.</td><td>Desenho híbrido: origem regional, cache global e decisão por latência.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Em cloud, uma <strong>região</strong> é uma área geográfica onde o provedor oferece serviços; uma <strong>zona de disponibilidade</strong> é um domínio isolado dentro de uma região, normalmente composto por um ou mais datacenters com energia, rede e refrigeração independentes; uma <strong>localidade de borda</strong> aproxima serviços do usuário para reduzir latência ou absorver tráfego; e <strong>latência</strong> é o tempo que uma comunicação leva para ir e voltar, geralmente medido como RTT.</p>\n  <div class=\"definition-box\"><strong>Definição prática:</strong> região define proximidade geográfica e domínio administrativo amplo; zona define isolamento de falha dentro da região; edge aproxima entrega ou processamento do usuário; latência mede o impacto temporal do caminho de rede.</div>\n  <p>Esses conceitos aparecem de formas diferentes em AWS, Azure e Google Cloud, mas o raciocínio é o mesmo: escolher onde colocar recursos, como distribuí-los, como conectá-los, como proteger tráfego entre eles e como medir o resultado.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Quando um usuário acessa uma aplicação cloud, o caminho não é simplesmente “usuário para servidor”. O fluxo envolve resolução DNS, escolha de endpoint, caminho de internet ou backbone do provedor, load balancer, zona, subnet, serviço, retorno e logs.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Resolução:</strong> o cliente resolve um nome DNS que pode apontar para endpoint global, regional, CDN, load balancer ou API gateway.</li>\n    <li><strong>Escolha de localização:</strong> DNS, Anycast, CDN, roteamento global ou configuração da aplicação direciona o usuário para uma região ou edge.</li>\n    <li><strong>Entrada:</strong> o tráfego chega a um ponto de presença, load balancer, firewall, WAF ou gateway regional.</li>\n    <li><strong>Distribuição zonal:</strong> o load balancer encaminha para backends em uma ou mais zonas.</li>\n    <li><strong>Dependências:</strong> a aplicação acessa banco, fila, cache, secrets, storage, DNS privado e serviços gerenciados, que podem ser zonais, regionais ou globais.</li>\n    <li><strong>Observabilidade:</strong> logs, métricas, traces e flow logs ajudam a entender latência, erro, perda, saturação e caminho.</li>\n  </ol>\n  <p>O detalhe crítico é que nem todos os recursos têm o mesmo escopo. Uma VM pode ser zonal, uma subnet pode ser regional em alguns provedores ou zonal em outros contextos, um load balancer pode ser regional ou global, uma política pode ser associada a uma VPC/VNet, e um serviço gerenciado pode replicar dados por trás dos panos. Por isso, arquitetura cloud exige ler o escopo de cada recurso.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura bem desenhada começa pela pergunta: “quem são os usuários, onde eles estão, quais dados precisam ser protegidos, qual RTO/RPO esperado e qual orçamento de rede?”. A resposta define se você precisa de uma região única, multi-AZ, multi-região, edge/CDN, conectividade híbrida ou combinação dessas opções.</p>\n  <ul>\n    <li><strong>Região única com múltiplas zonas:</strong> comum para aplicações corporativas com usuários concentrados e necessidade de alta disponibilidade dentro de uma geografia.</li>\n    <li><strong>Multi-região ativa/passiva:</strong> usada quando a organização precisa de recuperação de desastre fora da região principal.</li>\n    <li><strong>Multi-região ativa/ativa:</strong> reduz latência global e melhora disponibilidade, mas exige consistência, roteamento e operação mais complexos.</li>\n    <li><strong>Edge/CDN:</strong> melhora entrega de conteúdo, TLS termination, proteção DDoS/WAF e latência de leitura, sem necessariamente mover todo o backend.</li>\n    <li><strong>Híbrida:</strong> integra datacenter, filiais, VPN, circuitos dedicados, cloud e edge, exigindo desenho de rotas e domínios de falha.</li>\n  </ul>\n  <p>A decisão errada costuma aparecer como custo alto, latência ruim, arquitetura frágil, failover manual, logs dispersos ou compliance mal documentado.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma rede de hospitais. Uma região cloud é como uma cidade onde o grupo hospitalar possui uma estrutura completa. As zonas de disponibilidade são hospitais separados dentro dessa cidade: se um prédio tem problema elétrico, outro pode continuar funcionando. Edge é como um posto de atendimento avançado perto dos bairros: não faz cirurgia complexa, mas resolve triagem, entrega rápida e reduz deslocamento.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em cloud, os “hospitais” são datacenters altamente conectados, os caminhos podem usar backbones privados, e alguns serviços são gerenciados pelo provedor com escopo regional ou global. A analogia ajuda a visualizar proximidade e falha, mas não substitui a leitura do escopo real de cada serviço.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Uma pessoa em Brasília acessa uma aplicação hospedada em uma região distante. Mesmo que a aplicação esteja saudável, a distância pode aumentar o tempo de ida e volta. Se a aplicação faz muitas chamadas pequenas, cada RTT extra pesa. Uma página com dezenas de assets, APIs e autenticações pode parecer lenta mesmo que o servidor responda rápido internamente.</p>\n  <p>Uma melhoria simples pode ser usar CDN para conteúdo estático, escolher uma região mais próxima dos usuários, reduzir round trips, manter conexões reaproveitáveis, usar cache e evitar que a aplicação dependa de chamadas frequentes a outra região.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa brasileira com matriz em São Paulo, filial em Brasília e clientes na América Latina precisa hospedar um portal de atendimento. Se todos os dados sensíveis precisam permanecer no Brasil, a região primária provavelmente deve obedecer a esse requisito. Para disponibilidade, a aplicação pode ser distribuída em múltiplas zonas dentro da região. Para usuários externos, CDN e WAF podem reduzir latência e proteger a borda. Para contingência, uma segunda região pode receber backups ou uma réplica ativa/passiva, dependendo do RTO e do orçamento.</p>\n  <p>O desenho empresarial precisa documentar: região escolhida, zonas usadas, serviços zonais e regionais, plano de failover, tráfego inter-regional, custo de replicação, logs, DNS, dependências de IAM, conectividade com datacenter e plano de teste.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em AWS, você escolhe uma Region e distribui workloads entre Availability Zones; pode usar Local Zones para alguns casos de baixa latência e CloudFront como CDN/edge. Em Azure, você escolhe uma região, avalia suporte a Availability Zones e pode usar padrões zonal, zone-redundant ou regional, além de serviços de borda e Front Door. Em Google Cloud, recursos podem ser zonais, regionais ou globais, e regiões contêm zonas como domínios de falha.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Conceito</th><th>AWS</th><th>Azure</th><th>Google Cloud</th><th>Pergunta arquitetural</th></tr></thead>\n    <tbody>\n      <tr><td>Localização ampla</td><td>Region</td><td>Region</td><td>Region</td><td>Onde ficam usuários, dados e dependências?</td></tr>\n      <tr><td>Domínio de falha interno</td><td>Availability Zone</td><td>Availability Zone</td><td>Zone</td><td>O serviço precisa sobreviver à falha de uma zona?</td></tr>\n      <tr><td>Borda</td><td>CloudFront, Global Accelerator, Local Zones</td><td>Front Door, CDN, Edge Zones</td><td>Cloud CDN, edge PoPs</td><td>O problema é latência de entrega, computação local ou failover?</td></tr>\n      <tr><td>Escopo de recurso</td><td>Zonal, regional ou global conforme serviço</td><td>Zonal, zone-redundant ou regional conforme serviço</td><td>Zonal, regional ou global conforme serviço</td><td>Qual falha este recurso tolera?</td></tr>\n    </tbody>\n  </table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, região e zona devem ser decisões versionadas em IaC, não escolhas manuais esquecidas no console. Um módulo Terraform, Bicep, Pulumi ou CloudFormation deve explicitar região, zonas, tags, replicação, políticas, logging e limites de custo. O pipeline pode bloquear recursos sem zona redundante quando o ambiente exige alta disponibilidade, impedir deploy em região proibida por compliance e exigir logs de fluxo para subnets críticas.</p>\n  <p>Também é importante testar failover. Uma arquitetura declarada como multi-AZ, mas nunca testada, é apenas uma esperança documentada. O pipeline e a operação devem prever testes controlados, chaos engineering quando apropriado, revisão de RTO/RPO, validação de DNS e coleta de evidências.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de segurança, região, zona e edge afetam exposição e investigação. Um WAF na borda pode bloquear ataques antes de chegarem ao backend. Logs centralizados em uma região diferente podem melhorar governança, mas também criar atraso, custo e requisitos de proteção de dados. Replicação multi-região melhora resiliência, mas aumenta a quantidade de lugares onde dados sensíveis existem.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Região inadequada</td><td>Dados sensíveis em geografia não aprovada.</td><td>Risco regulatório e auditoria negativa.</td><td>Política de região permitida, tags, landing zone e guardrails.</td></tr>\n      <tr><td>Dependência zonal oculta</td><td>Banco, NAT, bastion ou appliance em uma única zona.</td><td>Falha zonal afeta aplicação inteira.</td><td>Zone redundancy, desenho multi-AZ e testes de falha.</td></tr>\n      <tr><td>Exposição na borda</td><td>WAF/CDN mal configurado ou origem acessível diretamente.</td><td>Bypass de controles e aumento de superfície.</td><td>Bloquear origem, validar headers, mTLS quando aplicável e logs.</td></tr>\n      <tr><td>Custo de logs e tráfego</td><td>Replicação e exportação inter-regional sem controle.</td><td>Pressão para reduzir telemetria.</td><td>Retenção por criticidade, compressão, filtros e FinOps.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra a diferença entre usuário, edge, região, zonas e região de contingência. O ponto didático é perceber que disponibilidade e latência são decisões de desenho, não propriedades automáticas da cloud.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"regions-title regions-desc\">\n    <title id=\"regions-title\">Regiões, zonas, edge e latência</title>\n    <desc id=\"regions-desc\">Usuários acessam uma borda próxima, que encaminha para uma região primária com múltiplas zonas e uma região secundária de contingência. O diagrama destaca latência, falha zonal, replicação e logs.</desc>\n    <defs>\n      <marker id=\"arrow-1402\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"35\" y=\"210\" width=\"130\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"100\" y=\"240\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Usuários</text>\n    <text x=\"100\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Brasil</text>\n\n    <rect x=\"225\" y=\"190\" width=\"150\" height=\"110\" rx=\"16\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"300\" y=\"225\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Edge / CDN</text>\n    <text x=\"300\" y=\"248\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">WAF / cache</text>\n    <text x=\"300\" y=\"271\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">baixa latência</text>\n\n    <rect x=\"435\" y=\"60\" width=\"360\" height=\"330\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"615\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Região primária</text>\n\n    <rect x=\"470\" y=\"130\" width=\"125\" height=\"95\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"532\" y=\"158\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Zona A</text>\n    <rect x=\"492\" y=\"175\" width=\"80\" height=\"32\" rx=\"8\" class=\"svg-node svg-node--server\" />\n    <text x=\"532\" y=\"197\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">App</text>\n\n    <rect x=\"635\" y=\"130\" width=\"125\" height=\"95\" rx=\"14\" class=\"svg-boundary\" />\n    <text x=\"697\" y=\"158\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Zona B</text>\n    <rect x=\"657\" y=\"175\" width=\"80\" height=\"32\" rx=\"8\" class=\"svg-node svg-node--server\" />\n    <text x=\"697\" y=\"197\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">App</text>\n\n    <rect x=\"500\" y=\"270\" width=\"230\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--database\" />\n    <text x=\"615\" y=\"300\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Banco regional</text>\n    <text x=\"615\" y=\"322\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">replicação entre zonas</text>\n\n    <rect x=\"835\" y=\"95\" width=\"115\" height=\"250\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"892\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Região</text>\n    <text x=\"892\" y=\"150\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">secundária</text>\n    <rect x=\"855\" y=\"205\" width=\"75\" height=\"55\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"892\" y=\"238\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DR</text>\n\n    <rect x=\"460\" y=\"430\" width=\"260\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"590\" y=\"460\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Logs / métricas / traces</text>\n    <text x=\"590\" y=\"482\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SIEM e observabilidade</text>\n\n    <line x1=\"165\" y1=\"245\" x2=\"225\" y2=\"245\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1402)\" />\n    <line x1=\"375\" y1=\"245\" x2=\"435\" y2=\"245\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1402)\" />\n    <line x1=\"595\" y1=\"185\" x2=\"635\" y2=\"185\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-1402)\" />\n    <line x1=\"730\" y1=\"305\" x2=\"835\" y2=\"235\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-1402)\" />\n    <line x1=\"615\" y1=\"340\" x2=\"590\" y2=\"430\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-1402)\" />\n\n    <text x=\"205\" y=\"335\" class=\"svg-label svg-label--small\">latência usuário ↔ edge</text>\n    <text x=\"440\" y=\"420\" class=\"svg-label svg-label--small\">multi-AZ reduz falha zonal</text>\n    <text x=\"760\" y=\"385\" class=\"svg-label svg-label--small\">multi-região melhora DR, mas aumenta custo e consistência</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam a diferença entre latência, disponibilidade, escopo de recurso, custo e compliance.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma aplicação com usuários no Brasil, clientes externos, dados sensíveis e exigência de disponibilidade. A resposta precisa equilibrar arquitetura, segurança, custo e operação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como raciocinar em etapas: localização dos usuários, natureza dos dados, RTO/RPO, dependências, custo de tráfego, edge, logs e testes.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> região, zona e edge definem distância, domínio de falha, custo, compliance e experiência do usuário.</li>\n    <li><strong>O que lembrar:</strong> multi-AZ, multi-região e edge resolvem problemas diferentes.</li>\n    <li><strong>Erro comum:</strong> declarar alta disponibilidade sem testar failover, logs, DNS e dependências.</li>\n    <li><strong>Uso real:</strong> seleção de região, landing zone, DR, CDN, WAF, replicação, observabilidade e arquitetura híbrida.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar VPC/VNet, CIDR e desenho de subnets. Depois de entender onde a rede cloud vive, o próximo passo é desenhar o espaço lógico interno onde workloads, rotas, filtros e serviços serão posicionados.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "DNS",
      "HTTP",
      "HTTPS",
      "TLS",
      "TCP",
      "UDP",
      "BGP",
      "IPsec"
    ],
    "dependsOn": [
      "IPv4",
      "IPv6",
      "subnetting",
      "DNS",
      "roteamento",
      "firewall",
      "NAT",
      "troubleshooting"
    ],
    "enables": [
      "VPC/VNet",
      "subnets cloud",
      "load balancing",
      "CDN",
      "DR",
      "multi-região",
      "observabilidade cloud"
    ]
  },
  "deepDive": {
    "mentalModel": "Região é geografia operacional; zona é domínio de falha; edge é proximidade; latência é o custo temporal do caminho; resiliência é o resultado de desenho, teste e operação.",
    "keyTerms": [
      "região",
      "zona de disponibilidade",
      "edge",
      "latência",
      "RTT",
      "RTO",
      "RPO",
      "domínio de falha",
      "multi-AZ",
      "multi-região"
    ],
    "limitations": [
      "Multi-AZ não protege contra todos os problemas regionais.",
      "Multi-região aumenta complexidade de dados, DNS, custos e operação.",
      "CDN/edge não corrige backend mal desenhado ou dependências remotas lentas.",
      "Latência não é apenas distância; caminho, congestionamento, TLS, DNS e aplicação também contam."
    ],
    "whenToUse": [
      "Usar multi-AZ para workloads críticos que precisam resistir a falha zonal dentro da mesma região.",
      "Usar edge/CDN para conteúdo estático, APIs públicas específicas, WAF e melhora de experiência global.",
      "Usar multi-região quando requisitos de DR, presença global ou regulação justificarem custo e complexidade.",
      "Usar região próxima quando latência e residência de dados forem importantes."
    ],
    "whenNotToUse": [
      "Não usar multi-região apenas por moda sem RTO/RPO claro.",
      "Não usar edge para dados sensíveis sem entender cache, logs e invalidação.",
      "Não distribuir componentes altamente acoplados em regiões distantes sem avaliar latência e consistência.",
      "Não centralizar dependências críticas em uma única zona se o requisito é alta disponibilidade."
    ],
    "operationalImpact": [
      "Exige documentação de escopo dos recursos, failover, DNS, replicação, runbooks e testes.",
      "Aumenta necessidade de observabilidade distribuída: métricas, traces, logs, flow logs e dashboards por região.",
      "Muda troubleshooting porque o incidente pode estar no usuário, edge, região, zona, backbone ou dependência gerenciada."
    ],
    "financialImpact": [
      "Multi-região e replicação aumentam custo de transferência, storage e operação.",
      "Tráfego entre zonas ou regiões pode ter cobrança específica conforme provedor e serviço.",
      "CDN pode reduzir tráfego de origem, mas adiciona cobrança própria e gestão de cache.",
      "Logs globais e retenção longa aumentam ingestão, armazenamento e processamento."
    ],
    "securityImpact": [
      "Mais regiões e bordas significam mais lugares para configurar, monitorar e auditar.",
      "Dados replicados ampliam o escopo de proteção e compliance.",
      "Edge/WAF pode reduzir exposição, mas origem precisa estar protegida contra bypass.",
      "Logs distribuídos precisam de integridade, retenção e correlação temporal confiável."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que multi-AZ e multi-região são a mesma coisa.",
      "whyItHappens": "Ambos são vendidos como alta disponibilidade.",
      "consequence": "A arquitetura não atende ao tipo de falha esperado ou fica complexa demais.",
      "correction": "Multi-AZ trata falha zonal dentro da região; multi-região trata falha regional, presença global ou DR geográfico."
    },
    {
      "mistake": "Escolher região apenas pelo menor preço.",
      "whyItHappens": "O custo de compute é fácil de ver, mas latência, egress, compliance e operação são menos óbvios.",
      "consequence": "Usuários sofrem latência, dados podem ficar em geografia inadequada e o custo total pode aumentar.",
      "correction": "Escolha região considerando usuário, dados, serviço disponível, custo de rede, suporte, compliance e resiliência."
    },
    {
      "mistake": "Usar CDN sem proteger a origem.",
      "whyItHappens": "A equipe acredita que o WAF/CDN é a única entrada possível.",
      "consequence": "Atacantes podem tentar acessar o load balancer ou IP de origem diretamente.",
      "correction": "Restrinja origem, use regras de firewall, headers validados, mTLS quando aplicável e logs."
    },
    {
      "mistake": "Declarar DR sem testar failover.",
      "whyItHappens": "A réplica existe, mas não há exercício operacional.",
      "consequence": "No incidente real, DNS, credenciais, dados, dependências ou runbook falham.",
      "correction": "Teste periodicamente RTO/RPO, failover, failback, observabilidade e comunicação."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuários de uma região geográfica relatam lentidão.",
      "Aplicação cai quando uma zona tem incidente.",
      "Failover para região secundária não funciona.",
      "Custo de transferência inter-regional cresce sem explicação.",
      "WAF/CDN responde, mas backend continua lento."
    ],
    "diagnosticQuestions": [
      "Onde estão os usuários afetados?",
      "Qual região e zona hospedam cada componente?",
      "Existe dependência remota entre regiões?",
      "O DNS está direcionando usuários para o endpoint esperado?",
      "Há métricas de latência por região, zona, edge e backend?",
      "O tráfego cruza NAT, firewall, peering, VPN ou interconnect?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Resolve-DnsName app.exemplo.com; Test-NetConnection app.exemplo.com -Port 443; tracert app.exemplo.com",
        "purpose": "Ver resolução DNS, conectividade TCP e caminho aproximado até o serviço.",
        "expectedObservation": "Nome resolvido, porta 443 acessível e caminho coerente com a região/edge esperada.",
        "interpretation": "DNS errado, timeout ou rota inesperada indicam hipótese de localização, edge, firewall ou caminho."
      },
      {
        "platform": "Linux",
        "command": "dig app.exemplo.com +short; curl -w '\\nnamelookup=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} total=%{time_total}\\n' -o /dev/null -s https://app.exemplo.com; mtr app.exemplo.com",
        "purpose": "Medir tempos de DNS, conexão, TLS, total e caminho com perda/latência.",
        "expectedObservation": "Tempos compatíveis com usuários próximos e sem perda relevante.",
        "interpretation": "Tempo alto de DNS, TCP ou TLS ajuda a separar problema de resolução, caminho ou aplicação."
      },
      {
        "platform": "AWS CLI",
        "command": "aws ec2 describe-availability-zones --region sa-east-1",
        "purpose": "Listar zonas disponíveis em uma região AWS.",
        "expectedObservation": "Lista de Availability Zones habilitadas para a conta/região.",
        "interpretation": "Confirma quais zonas podem ser usadas para desenho multi-AZ."
      },
      {
        "platform": "Azure CLI",
        "command": "az account list-locations -o table",
        "purpose": "Listar regiões conhecidas na assinatura Azure.",
        "expectedObservation": "Regiões disponíveis para seleção de localização.",
        "interpretation": "Ajuda a confirmar nomes de regiões e disponibilidade operacional."
      },
      {
        "platform": "Google Cloud CLI",
        "command": "gcloud compute zones list",
        "purpose": "Listar zonas do Google Cloud.",
        "expectedObservation": "Zonas por região com status.",
        "interpretation": "Ajuda a validar escopo zonal para recursos de compute."
      }
    ],
    "decisionTree": [
      {
        "if": "Usuários distantes reclamam de lentidão, mas usuários próximos não",
        "then": "Verificar região escolhida, DNS, CDN/edge, RTT, quantidade de round trips e dependências remotas."
      },
      {
        "if": "Falha de uma zona derruba aplicação inteira",
        "then": "Procurar dependência zonal única: banco, NAT, appliance, VM, storage, fila, bastion ou backend sem distribuição."
      },
      {
        "if": "Failover regional não funciona",
        "then": "Validar DNS, dados replicados, credenciais, secrets, rotas, firewall, certificados, runbook e ordem de ativação."
      },
      {
        "if": "Custo de rede cresce",
        "then": "Investigar egress, replicação, tráfego inter-AZ/inter-regional, NAT Gateway, logs e transferência para internet."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Definir regiões permitidas por política e compliance.",
      "Distribuir workloads críticos entre zonas quando o serviço e o requisito exigirem.",
      "Proteger a origem quando usar CDN/WAF/edge.",
      "Centralizar logs com retenção adequada, integridade e timezone padronizado.",
      "Testar failover e failback, não apenas desenhar.",
      "Documentar escopo zonal, regional e global de cada serviço crítico."
    ],
    "badPractices": [
      "Hospedar dados sensíveis em qualquer região sem avaliação jurídica e de compliance.",
      "Assumir que multi-região é sempre melhor.",
      "Criar CDN que aponta para origem pública sem restrição.",
      "Colocar todos os componentes críticos em uma única zona.",
      "Replicar logs e dados sem criptografia, retenção e controle de acesso.",
      "Não medir latência real a partir dos usuários."
    ],
    "commonErrors": [
      "Confundir região com zona.",
      "Ignorar custo de tráfego inter-regional.",
      "Planejar RTO/RPO sem testar.",
      "Achar que edge resolve problema de banco de dados distante.",
      "Não incluir IAM, DNS e certificados no plano de DR."
    ],
    "vulnerabilities": [
      {
        "name": "Origem exposta atrás de CDN/WAF",
        "description": "O backend pode ser acessado diretamente, contornando controles de borda.",
        "defensiveExplanation": "A equipe deve buscar endpoints de origem públicos, regras permissivas e ausência de restrição por origem confiável.",
        "mitigation": "Restrição de origem, firewall, security groups/NSGs, autenticação mútua quando aplicável e validação de headers/identidade."
      },
      {
        "name": "Dependência zonal única",
        "description": "Um componente crítico fica preso a uma zona e derruba a aplicação durante falha local.",
        "defensiveExplanation": "Mapear recursos zonais e testar indisponibilidade de zona revela dependências ocultas.",
        "mitigation": "Distribuição multi-AZ, serviços zone-redundant, replicação e runbooks testados."
      },
      {
        "name": "Replicação sem governança",
        "description": "Dados sensíveis são replicados para outra região sem controle adequado.",
        "defensiveExplanation": "A replicação amplia escopo de compliance e superfície de acesso.",
        "mitigation": "Política de regiões permitidas, criptografia, IAM, auditoria, classificação de dados e aprovação formal."
      }
    ],
    "monitoring": [
      "Latência por região e usuário.",
      "Taxa de erro por zona.",
      "Saúde do load balancer por zona.",
      "Tráfego inter-regional.",
      "Acesso direto à origem.",
      "Eventos de failover e mudanças de DNS."
    ],
    "hardening": [
      "Bloquear origem pública quando usar edge.",
      "Aplicar políticas de região permitida.",
      "Usar criptografia em trânsito e repouso para replicação.",
      "Habilitar logs de edge, load balancer, DNS, firewall e flow logs.",
      "Restringir IAM para criação de recursos fora das regiões aprovadas."
    ],
    "detectionIdeas": [
      "Aumento súbito de tráfego inter-regional.",
      "Acesso à origem sem passar pelo CDN/WAF.",
      "Usuários direcionados para região inesperada.",
      "Falha concentrada em uma zona.",
      "Criação de recurso em região não autorizada."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que a escolha de região não deve ser feita apenas pelo menor preço?",
      "hints": [
        "Pense em usuários, dados e latência.",
        "Pense em egress, suporte e compliance."
      ],
      "expectedIdeas": [
        "latência",
        "residência de dados",
        "serviços disponíveis",
        "custo total",
        "operação"
      ],
      "explanation": "Preço de compute é apenas uma parte. Rede, dados, suporte, compliance e experiência podem dominar o custo real."
    },
    {
      "type": "diagnóstico",
      "question": "Uma aplicação multi-AZ caiu quando uma zona teve problema. O que você procuraria?",
      "hints": [
        "Nem todo recurso estava distribuído?",
        "Procure banco, NAT, appliance, secrets, storage ou filas."
      ],
      "expectedIdeas": [
        "dependência zonal",
        "NAT único",
        "banco zonal",
        "load balancer mal configurado",
        "backends em uma zona só"
      ],
      "explanation": "Muitas arquiteturas parecem multi-AZ, mas dependem de um componente único."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer atender usuários internacionais sem mover dados sensíveis para fora do Brasil. Que opções você avaliaria?",
      "hints": [
        "Pense em edge e cache.",
        "Separe conteúdo público de dados sensíveis."
      ],
      "expectedIdeas": [
        "CDN",
        "WAF",
        "cache de conteúdo estático",
        "origem restrita",
        "dados sensíveis na região aprovada",
        "APIs otimizadas"
      ],
      "explanation": "Nem toda melhora global exige replicar banco sensível para várias regiões."
    }
  ],
  "quiz": [
    {
      "id": "q14.2.1",
      "type": "conceito",
      "q": "Qual é a melhor descrição de uma zona de disponibilidade?",
      "opts": [
        "Um domínio isolado dentro de uma região, normalmente com datacenters independentes.",
        "Um país inteiro onde o provedor opera.",
        "Um cache DNS local do usuário.",
        "Uma regra de firewall aplicada a uma subnet."
      ],
      "a": 0,
      "exp": "Zonas são domínios de falha dentro de uma região. Elas ajudam a projetar resiliência contra falhas localizadas.",
      "difficulty": "iniciante",
      "topic": "zona de disponibilidade"
    },
    {
      "id": "q14.2.2",
      "type": "comparação",
      "q": "Qual diferença central entre multi-AZ e multi-região?",
      "opts": [
        "Multi-AZ distribui dentro de uma região; multi-região distribui entre regiões diferentes.",
        "Multi-AZ é sempre mais caro que multi-região.",
        "Multi-região não exige DNS.",
        "Multi-AZ elimina necessidade de backup."
      ],
      "a": 0,
      "exp": "Multi-AZ reduz risco de falha zonal; multi-região trata falhas regionais, presença global ou DR geográfico, com maior complexidade.",
      "difficulty": "intermediário",
      "topic": "resiliência"
    },
    {
      "id": "q14.2.3",
      "type": "diagnóstico",
      "q": "Usuários distantes têm alta latência, mas usuários próximos à região não. Qual hipótese faz sentido testar primeiro?",
      "opts": [
        "Distância geográfica, DNS, CDN/edge e quantidade de round trips.",
        "Sempre trocar o banco para multi-master global.",
        "Desativar TLS para reduzir latência.",
        "Abrir todas as portas no firewall."
      ],
      "a": 0,
      "exp": "O sintoma por geografia sugere caminho, região, edge, DNS e desenho de aplicação, não medidas inseguras ou extremas.",
      "difficulty": "intermediário",
      "topic": "latência"
    },
    {
      "id": "q14.2.4",
      "type": "segurança",
      "q": "Qual risco aparece quando se usa CDN/WAF mas a origem continua acessível diretamente?",
      "opts": [
        "Bypass dos controles de borda.",
        "Impossibilidade de usar TLS.",
        "Fim da necessidade de logs.",
        "Redução automática de todos os custos."
      ],
      "a": 0,
      "exp": "Se a origem fica pública e permissiva, alguém pode tentar contornar o WAF/CDN e acessar o backend diretamente.",
      "difficulty": "intermediário",
      "topic": "edge security"
    },
    {
      "id": "q14.2.5",
      "type": "cloud",
      "q": "Por que multi-região deve ser uma decisão justificada, não automática?",
      "opts": [
        "Porque aumenta complexidade de dados, DNS, custo, operação e consistência.",
        "Porque provedores não permitem recursos em mais de uma região.",
        "Porque multi-região impede logs.",
        "Porque multi-região substitui IAM."
      ],
      "a": 0,
      "exp": "Multi-região pode ser necessário, mas cria desafios de consistência, failover, observabilidade, custo e compliance.",
      "difficulty": "avançado",
      "topic": "arquitetura"
    },
    {
      "id": "q14.2.6",
      "type": "custo",
      "q": "Qual item deve entrar em uma análise financeira de arquitetura entre regiões?",
      "opts": [
        "Tráfego inter-regional, replicação, logs, CDN, NAT e egress.",
        "Apenas CPU das VMs.",
        "Somente preço do domínio DNS.",
        "Apenas custo do notebook do administrador."
      ],
      "a": 0,
      "exp": "Rede cloud é cobrada por várias dimensões. Ignorar tráfego, replicação e logs costuma gerar surpresa financeira.",
      "difficulty": "intermediário",
      "topic": "finops"
    }
  ],
  "flashcards": [
    {
      "id": "fc14.2.1",
      "front": "O que é uma região cloud?",
      "back": "Uma localização geográfica ampla onde o provedor oferece serviços cloud, normalmente composta por múltiplas zonas ou datacenters.",
      "tags": [
        "cloud",
        "região"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.2.2",
      "front": "O que é uma zona de disponibilidade?",
      "back": "Um domínio isolado dentro de uma região, usado para reduzir impacto de falhas localizadas.",
      "tags": [
        "cloud",
        "az"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.2.3",
      "front": "Multi-AZ e multi-região resolvem o mesmo problema?",
      "back": "Não. Multi-AZ reduz risco de falha zonal; multi-região trata DR regional, presença global ou requisitos geográficos.",
      "tags": [
        "resiliência"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.2.4",
      "front": "Edge substitui backend regional?",
      "back": "Normalmente não. Edge aproxima cache, proteção ou alguma computação, mas o backend e os dados principais podem continuar regionais.",
      "tags": [
        "edge",
        "cdn"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc14.2.5",
      "front": "O que é RTT?",
      "back": "Round-trip time: tempo de ida e volta de uma comunicação entre origem e destino.",
      "tags": [
        "latência",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc14.2.6",
      "front": "Qual risco existe em origem pública atrás de CDN?",
      "back": "Bypass dos controles de borda: alguém pode acessar a origem diretamente se ela não estiver restrita.",
      "tags": [
        "segurança",
        "cdn"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex14.2.1",
      "type": "conceitual",
      "prompt": "Explique em suas palavras a diferença entre região, zona e edge.",
      "expectedAnswer": "Região é uma localização geográfica ampla; zona é um domínio de falha isolado dentro da região; edge é uma localidade próxima ao usuário para cache, proteção ou processamento limitado.",
      "explanation": "A resposta deve mostrar diferença de escopo e finalidade, não apenas nomes."
    },
    {
      "id": "ex14.2.2",
      "type": "arquitetura",
      "prompt": "Uma aplicação precisa sobreviver à falha de uma zona, mas não exige contingência regional. Que desenho inicial você sugeriria?",
      "expectedAnswer": "Região única com recursos críticos distribuídos entre múltiplas zonas, load balancer adequado, banco/serviços zone-redundant quando necessário e testes de falha zonal.",
      "explanation": "Multi-região pode ser excesso se o requisito é apenas falha zonal."
    },
    {
      "id": "ex14.2.3",
      "type": "diagnóstico",
      "prompt": "Usuários internacionais reclamam de lentidão em conteúdo estático. Que hipóteses e controles você avaliaria?",
      "expectedAnswer": "Avaliar CDN/edge, DNS, cache, compressão, tamanho de assets, TLS, quantidade de round trips e região de origem.",
      "explanation": "Conteúdo estático costuma se beneficiar de CDN antes de mover todo o backend."
    },
    {
      "id": "ex14.2.4",
      "type": "segurança",
      "prompt": "Liste três controles para evitar bypass de uma origem protegida por CDN/WAF.",
      "expectedAnswer": "Restringir origem por firewall/security group, permitir apenas tráfego de origem confiável quando aplicável, validar headers/mTLS, remover IP público direto quando possível e monitorar acessos diretos.",
      "explanation": "O objetivo é garantir que a borda seja caminho obrigatório para tráfego externo."
    }
  ],
  "challenge": {
    "title": "Escolha região, zonas e edge para um portal corporativo",
    "scenario": "Uma empresa brasileira terá portal público, área autenticada, API interna, banco com dados sensíveis, clientes internacionais e exigência de RTO de 4 horas.",
    "tasks": [
      "Escolher região primária e justificar.",
      "Definir estratégia multi-AZ.",
      "Decidir uso de CDN/WAF/edge.",
      "Definir se haverá região secundária e qual modo de DR.",
      "Listar custos de rede esperados.",
      "Listar logs e métricas obrigatórias."
    ],
    "constraints": [
      "Dados sensíveis devem permanecer em região aprovada.",
      "A origem não pode ser acessível diretamente se estiver atrás de WAF/CDN.",
      "A solução deve equilibrar custo e resiliência.",
      "A proposta deve ser testável por runbook."
    ],
    "expectedDeliverables": [
      "Diagrama região/zona/edge.",
      "Tabela de decisão arquitetural.",
      "Matriz de custos de rede.",
      "Plano de logs e validação.",
      "Runbook resumido de failover."
    ],
    "gradingRubric": [
      {
        "criterion": "Justificativa de região",
        "points": 20,
        "description": "Considera usuários, dados, compliance, serviços e latência."
      },
      {
        "criterion": "Resiliência",
        "points": 25,
        "description": "Distingue multi-AZ de multi-região e trata dependências críticas."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Protege origem, logs, IAM, dados e controles de borda."
      },
      {
        "criterion": "Custo e operação",
        "points": 20,
        "description": "Inclui egress, replicação, logs, NAT, CDN e runbooks."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Entrega diagrama e justificativas compreensíveis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa separando problema de latência, problema de disponibilidade e problema de compliance. Nem tudo deve ser resolvido com multi-região. Para dados sensíveis, a região primária precisa obedecer à política. Para disponibilidade, multi-AZ pode atender a falhas zonais. Para usuários internacionais consumindo conteúdo estático, edge/CDN ajuda sem replicar banco sensível.",
    "steps": [
      "Listar usuários e geografias.",
      "Classificar dados e regiões permitidas.",
      "Escolher região primária.",
      "Distribuir aplicação entre zonas.",
      "Definir banco regional/zone-redundant ou equivalente.",
      "Adicionar CDN/WAF para borda com origem restrita.",
      "Decidir DR regional com RTO/RPO.",
      "Mapear custos e logs.",
      "Criar runbook e teste."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar tudo em várias regiões ativas desde o início.",
        "whyItIsWrong": "Pode aumentar custo, complexidade, inconsistência e escopo de compliance sem necessidade."
      },
      {
        "answer": "Usar CDN e deixar a origem pública sem restrição.",
        "whyItIsWrong": "Permite bypass dos controles de borda."
      },
      {
        "answer": "Declarar multi-AZ sem mapear banco, NAT ou appliance único.",
        "whyItIsWrong": "Uma dependência zonal pode derrubar a aplicação mesmo com backends distribuídos."
      }
    ],
    "finalAnswer": "Uma resposta robusta usa região primária aprovada, aplicação multi-AZ, banco regional/zone-redundant quando disponível, CDN/WAF para conteúdo público e proteção, origem restrita, logs de edge/load balancer/firewall/flow/DNS, plano de DR com backups ou réplica conforme RTO/RPO, matriz de custos e runbook testado."
  },
  "glossary": [
    {
      "term": "Região cloud",
      "shortDefinition": "Localização geográfica ampla onde um provedor oferece serviços cloud.",
      "longDefinition": "Uma região agrupa infraestrutura em uma área geográfica e influencia latência, disponibilidade, serviços disponíveis, custo e compliance.",
      "example": "Escolher uma região próxima aos usuários pode reduzir RTT.",
      "relatedTerms": [
        "zona de disponibilidade",
        "latência",
        "compliance"
      ],
      "relatedLessons": [
        "14.1",
        "14.2"
      ]
    },
    {
      "term": "Zona de disponibilidade",
      "shortDefinition": "Domínio isolado dentro de uma região usado para resiliência.",
      "longDefinition": "Zona de disponibilidade normalmente representa um ou mais datacenters com isolamento de energia, rede e refrigeração em relação a outras zonas.",
      "example": "Executar backends em duas zonas reduz impacto de falha zonal.",
      "relatedTerms": [
        "multi-AZ",
        "domínio de falha"
      ],
      "relatedLessons": [
        "14.2"
      ]
    },
    {
      "term": "Edge",
      "shortDefinition": "Localidade próxima ao usuário para cache, proteção ou processamento de baixa latência.",
      "longDefinition": "Edge inclui pontos de presença, CDN, WAF, DNS global ou computação limitada perto do usuário final.",
      "example": "Servir imagens por CDN reduz latência e carga na origem.",
      "relatedTerms": [
        "CDN",
        "WAF",
        "origem"
      ],
      "relatedLessons": [
        "14.2",
        "14.6"
      ]
    },
    {
      "term": "Latência",
      "shortDefinition": "Tempo de atraso na comunicação entre origem e destino.",
      "longDefinition": "Em redes, costuma ser medida por RTT e é afetada por distância, caminho, congestionamento, DNS, TCP, TLS e aplicação.",
      "example": "Um usuário distante da região pode perceber respostas mais lentas.",
      "relatedTerms": [
        "RTT",
        "mtr",
        "traceroute"
      ],
      "relatedLessons": [
        "11.x",
        "15.x"
      ]
    },
    {
      "term": "RTO",
      "shortDefinition": "Tempo máximo aceitável para restaurar um serviço após falha.",
      "longDefinition": "Recovery Time Objective guia decisões de failover, automação, runbooks e investimento em resiliência.",
      "example": "RTO de 4 horas pode permitir ativa/passiva em vez de ativa/ativa.",
      "relatedTerms": [
        "RPO",
        "DR",
        "failover"
      ],
      "relatedLessons": [
        "14.2",
        "17.x"
      ]
    },
    {
      "term": "RPO",
      "shortDefinition": "Quantidade máxima aceitável de perda de dados medida em tempo.",
      "longDefinition": "Recovery Point Objective define quão recentes os dados precisam estar após recuperação.",
      "example": "RPO de 15 minutos exige replicação mais frequente que RPO de 24 horas.",
      "relatedTerms": [
        "RTO",
        "replicação",
        "backup"
      ],
      "relatedLessons": [
        "14.2"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Regions and Zones - Amazon EC2",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html",
      "note": "Referência para regiões, zonas de disponibilidade, Local Zones, Outposts e Wavelength Zones."
    },
    {
      "type": "official-doc",
      "title": "Global infrastructure - Overview of Amazon Web Services",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/whitepapers/latest/aws-overview/global-infrastructure.html",
      "note": "Define AWS Regions e Availability Zones."
    },
    {
      "type": "official-doc",
      "title": "What are Azure availability zones?",
      "organization": "Microsoft Azure",
      "url": "https://learn.microsoft.com/en-us/azure/reliability/availability-zones-overview",
      "note": "Referência para zonas de disponibilidade no Azure."
    },
    {
      "type": "official-doc",
      "title": "Select Azure regions",
      "organization": "Microsoft Azure Cloud Adoption Framework",
      "url": "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-setup-guide/regions",
      "note": "Critérios de seleção de região: disponibilidade, latência, custo e alinhamento regulatório."
    },
    {
      "type": "official-doc",
      "title": "Geography and regions",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/docs/geography-and-regions",
      "note": "Referência para regiões, zonas e escopo de recursos no Google Cloud."
    },
    {
      "type": "official-doc",
      "title": "Global, regional, and zonal resources",
      "organization": "Google Cloud Compute Engine",
      "url": "https://docs.cloud.google.com/compute/docs/regions-zones/global-regional-zonal-resources",
      "note": "Explica recursos globais, regionais e zonais."
    },
    {
      "type": "official-doc",
      "title": "Pricing for NAT gateways",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/nat-gateway-pricing.html",
      "note": "Usado para reforçar que arquitetura de rede tem custo por hora e por volume processado em NAT Gateway."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.x",
      "reason": "Latência e caminho dependem de roteamento e troubleshooting de caminhos."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.10",
      "reason": "Arquitetura defensiva orienta o uso de zonas, edge, logs e controles de origem."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "cloud/iac",
      "lesson": "IaC e pipelines",
      "reason": "Região, zonas e políticas devem ser versionadas e validadas em pipeline."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "federação e acesso",
      "lesson": "IAM contextual",
      "reason": "Zero Trust e acesso regionalizado dependem de identidade, contexto e política."
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
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    }
  ],
  "progressRules": {
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
      "14.3"
    ]
  }
};
