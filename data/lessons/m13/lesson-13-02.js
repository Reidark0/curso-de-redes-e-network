export const lesson1302 = {
  "id": "13.2",
  "moduleId": "m13",
  "order": 2,
  "title": "Segmentação, Zonas de Segurança e Redução de Movimento Lateral",
  "subtitle": "Como dividir a rede por risco, função e necessidade para reduzir exposição, conter incidentes e melhorar investigação.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 320,
  "tags": [
    "redes",
    "segurança",
    "segmentação",
    "zonas",
    "firewall",
    "acl",
    "microsegmentação",
    "movimento-lateral",
    "zero-trust",
    "blue-team"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "VLANs, switches, MAC e camada 2 são base para separar domínios de acesso."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.x",
      "reason": "Sub-redes IPv4 e gateway são necessários para entender limites lógicos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall, ACLs e políticas de tráfego aplicam controle entre zonas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.1",
      "reason": "Defesa em profundidade explica por que segmentação precisa ser parte de uma arquitetura maior."
    }
  ],
  "objectives": [
    "Explicar por que redes planas aumentam movimento lateral e impacto de incidentes.",
    "Diferenciar VLAN, sub-rede, zona de segurança, ACL, firewall, VRF e microsegmentação.",
    "Criar uma matriz simples de fluxos permitidos e negados entre zonas.",
    "Relacionar segmentação com Zero Trust, cloud networking, DevSecOps e SOC.",
    "Identificar erros comuns como VLAN sem política, any-any e exceções permanentes.",
    "Desenhar um plano de migração gradual de rede plana para arquitetura segmentada."
  ],
  "learningOutcomes": [
    "Dado um ambiente plano, o aluno consegue propor zonas iniciais por função e risco.",
    "Dado um fluxo de aplicação, o aluno consegue justificar origem, destino, porta, protocolo e logs.",
    "Dado um incidente em endpoint, o aluno consegue explicar como segmentação reduz o alcance lateral.",
    "Dado um desenho cloud, o aluno consegue mapear subnets, security groups e private endpoints como controles de segmentação.",
    "Dado um conjunto de regras, o aluno consegue identificar permissões amplas e exceções perigosas."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine que um analista do financeiro recebeu um e-mail de phishing, abriu um anexo e sua estação foi comprometida. A primeira pergunta de segurança não é apenas “como o malware entrou?”, mas “para onde ele consegue ir agora?”. Se o notebook do financeiro consegue falar diretamente com servidores de banco de dados, controladores de domínio, consoles de backup, impressoras, câmeras, ambientes de desenvolvimento e APIs internas, a rede está ajudando o incidente a crescer.</p>\n  <p>Segmentação existe para reduzir o raio de explosão. Ela parte de uma ideia simples: nem tudo que está na mesma empresa deve estar na mesma zona de confiança. Usuários, servidores, administração, visitantes, IoT, backup, produção, homologação, cloud e sistemas críticos têm funções diferentes, riscos diferentes, donos diferentes e requisitos diferentes. Se tudo estiver misturado, uma falha pequena pode alcançar ativos que nunca deveriam estar expostos àquele ponto inicial.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> em uma rede plana, um comprometimento em uma estação comum pode virar tentativa de acesso lateral a servidores internos. Em uma rede segmentada, o mesmo incidente ainda é grave, mas encontra barreiras, logs, alertas e pontos de contenção.</div>\n  <p>Nesta aula, você vai aprender a transformar a rede de uma massa única de conectividade em um conjunto de zonas com fluxos justificados. O objetivo não é bloquear tudo de forma cega; é permitir o necessário, negar o desnecessário, registrar o sensível e tornar a investigação possível.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As primeiras redes corporativas eram frequentemente desenhadas para simplicidade operacional. Colocar muitos dispositivos no mesmo segmento reduzia trabalho inicial: menos sub-redes, menos rotas, menos regras, menos documentação e menos conflitos com usuários. O foco era fazer funcionar. A segurança ficava concentrada no perímetro: internet de um lado, rede interna do outro.</p>\n  <p>Com o tempo, esse modelo se tornou insuficiente. Ambientes passaram a ter notebooks móveis, Wi‑Fi corporativo, VPN, terceiros, servidores virtualizados, cloud, SaaS, APIs, containers, ambientes DevSecOps e integrações entre sistemas. Ao mesmo tempo, ataques passaram a explorar credenciais válidas, serviços internos expostos, compartilhamentos indevidos, protocolos administrativos e falta de monitoramento. A fronteira entre “dentro” e “fora” deixou de representar confiança real.</p>\n  <p>A segmentação evoluiu de VLANs básicas para arquiteturas com zonas, firewalls internos, VRFs, ACLs, NAC, microsegmentação, políticas baseadas em identidade, service mesh, security groups, NSGs, flow logs e Zero Trust. A ideia central permaneceu: separar o que tem funções e riscos diferentes, controlar fluxos entre zonas e gerar evidências.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico da rede plana é que ela mistura alcance com necessidade. Um host conseguir alcançar outro não significa que deveria. Em redes sem segmentação, o caminho lateral costuma ser amplo demais, e a equipe só percebe isso quando um incidente, auditoria ou pentest mostra que ativos críticos estavam acessíveis a partir de segmentos comuns.</p>\n  <ul>\n    <li><strong>Movimento lateral:</strong> um atacante ou malware tenta sair do ponto inicial para sistemas mais valiosos.</li>\n    <li><strong>Exposição excessiva:</strong> serviços internos ficam acessíveis por redes que não precisam deles.</li>\n    <li><strong>Falta de contexto:</strong> sem zonas, logs de tráfego são difíceis de interpretar porque tudo fala com tudo.</li>\n    <li><strong>Políticas genéricas:</strong> regras any-any parecem resolver chamados, mas removem o controle.</li>\n    <li><strong>Resposta lenta:</strong> sem limites claros, isolar um incidente pode exigir derrubar grandes partes da rede.</li>\n  </ul>\n  <p>Segmentação não é uma cura automática. VLAN sem firewall pode apenas organizar broadcast, não aplicar política. Firewall com regras permissivas vira enfeite. Microsegmentação sem inventário vira caos. A segmentação só funciona quando existe entendimento dos ativos, fluxos, donos, riscos, exceções, logs e processo de revisão.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A segmentação evoluiu conforme a infraestrutura e as ameaças ficaram mais complexas. A tabela resume as principais abordagens.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funciona</th><th>Limitação</th><th>Uso moderno</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Muitos ativos no mesmo segmento lógico.</td><td>Facilita alcance lateral e dificulta controle.</td><td>Evitar em ambientes corporativos, exceto redes muito pequenas e controladas.</td></tr>\n      <tr><td>VLAN por função</td><td>Separa usuários, servidores, voz, visitantes, IoT e gestão.</td><td>Sozinha não bloqueia tráfego roteado entre VLANs.</td><td>Base de organização e redução de broadcast.</td></tr>\n      <tr><td>ACL ou firewall entre zonas</td><td>Controla fluxos permitidos entre segmentos.</td><td>Exige matriz de fluxos e revisão contínua.</td><td>Controle central para menor privilégio de rede.</td></tr>\n      <tr><td>VRF e isolamento lógico</td><td>Cria tabelas de roteamento separadas.</td><td>Aumenta complexidade operacional.</td><td>Útil para ambientes com separação forte, terceiros e redes críticas.</td></tr>\n      <tr><td>Microsegmentação</td><td>Aplica política mais granular por workload, host, identidade ou tag.</td><td>Depende de inventário, automação e telemetria.</td><td>Útil em datacenter, cloud, containers e Zero Trust.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Segmentação de rede é a prática de dividir a infraestrutura em zonas ou segmentos com políticas de comunicação explícitas. Uma zona agrupa ativos com função, risco, criticidade ou requisitos semelhantes. O tráfego entre zonas deve ser controlado, registrado e justificado.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> segmentar é reduzir conectividade implícita e transformar comunicação em fluxos autorizados entre zonas. O objetivo é limitar exposição, dificultar movimento lateral, melhorar visibilidade, facilitar resposta a incidentes e aplicar menor privilégio na rede.</div>\n  <p>Uma boa segmentação responde perguntas práticas: quem precisa falar com quem? Em qual porta? Por qual protocolo? Em qual direção? Com qual autenticação? Passando por qual controle? Gerando qual log? Qual regra expira? Quem aprovou? Como validar? O que acontece se o fluxo for bloqueado?</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, segmentação combina mecanismos de camada 2, camada 3, camada 4 e, em alguns casos, identidade e aplicação. A VLAN separa domínios de broadcast. A sub-rede organiza endereçamento e roteamento. O gateway ou firewall decide se um pacote pode passar de uma zona para outra. O log registra a decisão. A telemetria mostra padrões e exceções.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Classificação:</strong> ativos são agrupados por função, criticidade, dono e risco.</li>\n    <li><strong>Endereçamento:</strong> cada zona recebe sub-rede, VLAN, VRF ou equivalente cloud.</li>\n    <li><strong>Roteamento:</strong> o tráfego entre zonas passa por ponto de controle, não por atalhos invisíveis.</li>\n    <li><strong>Política:</strong> regras permitem fluxos necessários e negam o restante.</li>\n    <li><strong>Registro:</strong> allow e deny relevantes geram logs com origem, destino, porta, protocolo e ação.</li>\n    <li><strong>Validação:</strong> testes confirmam que o permitido funciona e o proibido não passa.</li>\n    <li><strong>Revisão:</strong> exceções são revisadas, expiradas ou removidas.</li>\n  </ol>\n  <p>O erro comum é acreditar que criar VLANs basta. VLAN cria separação lógica de camada 2. Mas se um roteador ou firewall permite tráfego livre entre elas, o risco lateral continua alto. A política entre zonas é o coração da segmentação defensiva.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura corporativa, segmentação aparece em vários pontos. Usuários ficam em zonas de acesso; servidores em zonas de aplicação; bancos em zonas de dados; administração em zona privilegiada; visitantes em zona isolada; IoT em zona restrita; backup em zona protegida; cloud em VNets/VPCs com security groups, NSGs e route tables; e ambientes de desenvolvimento são separados de produção.</p>\n  <ul>\n    <li><strong>Camada 2:</strong> VLANs, trunks, access ports, isolamento de Wi‑Fi guest e IoT.</li>\n    <li><strong>Camada 3:</strong> sub-redes, rotas, VRFs, gateways e roteamento controlado.</li>\n    <li><strong>Camada 4:</strong> ACLs, firewalls, portas e estados de conexão.</li>\n    <li><strong>Identidade:</strong> NAC, 802.1X, grupos de AD/IdP, posture check e políticas dinâmicas.</li>\n    <li><strong>Cloud:</strong> VPC/VNet, subnets privadas, security groups, NSGs, private endpoints e flow logs.</li>\n    <li><strong>Observabilidade:</strong> NetFlow, firewall logs, NDR, SIEM, EDR e inventário.</li>\n  </ul>\n  <p>A arquitetura ideal não é a mais complexa. É a menor arquitetura capaz de separar riscos reais, sustentar operação, gerar evidência e ser compreendida pela equipe.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em um hospital. Pacientes, visitantes, farmácia, centro cirúrgico, almoxarifado, sala de servidores e administração não ficam todos no mesmo espaço com as mesmas portas abertas. Existem alas, crachás, portas restritas, câmeras, registros e procedimentos. A segmentação de rede faz algo parecido: cria áreas, define quem entra, registra acessos e reduz o impacto quando algo dá errado.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, os caminhos não são apenas portas físicas. Um fluxo pode atravessar túneis, NAT, VPN, cloud, proxy, balanceador, service mesh e regras dinâmicas. Por isso, a documentação precisa representar caminhos reais, não apenas desenho lógico bonito.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma pequena empresa, uma segmentação mínima pode separar rede administrativa, rede de visitantes e rede de câmeras. A rede de visitantes acessa apenas internet. As câmeras falam apenas com o gravador. A rede administrativa acessa impressora, sistemas internos e internet. O firewall impede que visitantes alcancem câmeras ou computadores internos.</p>\n  <p>Mesmo sem ferramentas caras, essa separação já reduz risco. Se um visitante conecta um equipamento infectado, ele não deve enxergar a rede interna. Se uma câmera IoT vulnerável for comprometida, ela não deve iniciar conexões para notebooks, servidores ou domínio.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa média, a segmentação pode incluir zonas como usuários corporativos, servidores de aplicação, bancos de dados, administração privilegiada, backup, DMZ, Wi‑Fi corporativo, Wi‑Fi guest, IoT, impressoras, desenvolvimento, homologação e produção. Cada zona possui dono, criticidade, fluxo esperado, logs necessários e política de acesso.</p>\n  <p>Um fluxo legítimo pode ser: usuários acessam aplicação web interna na porta 443; aplicação acessa banco na porta específica; administração acessa servidores via bastion; backup puxa dados em janela controlada; servidores não iniciam conexão para estações; visitantes só acessam internet. Essa matriz transforma segurança em engenharia verificável.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, segmentação aparece como VPC/VNet, subnets, route tables, security groups, NSGs, NACLs, firewalls gerenciados, private endpoints, service endpoints e políticas de identidade. O princípio é o mesmo: workloads públicos, privados, administrativos, dados e integração não devem compartilhar alcance irrestrito.</p>\n  <p>Um desenho comum usa subnets públicas apenas para balanceadores, subnets privadas para aplicações, subnets isoladas para dados, egress controlado por NAT ou firewall, private endpoints para serviços gerenciados e flow logs para investigação. O custo aparece em firewalls gerenciados, NAT gateways, tráfego entre zonas/regiões e armazenamento de logs; por isso, segmentação em cloud deve considerar segurança e finanças juntas.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, segmentação precisa virar código e política revisável. Terraform pode criar subnets, security groups, NSGs e rotas. Pipelines podem validar se uma regra abre acesso amplo demais. Policy as Code pode impedir `0.0.0.0/0` para portas administrativas. Kubernetes pode usar NetworkPolicies para limitar comunicação entre namespaces e workloads.</p>\n  <p>O ponto principal é evitar segmentação manual invisível. Se cada exceção é feita por chamado sem versionamento, o ambiente degrada. Se regras são declaradas, revisadas, testadas e monitoradas, a segmentação vira parte do ciclo de vida da plataforma.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, segmentação reduz movimento lateral, exposição de serviços, impacto de ransomware e dificuldade de investigação. Mas ela também pode criar falsa sensação de segurança se for mal feita.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Usuários alcançam servidores e consoles sem necessidade.</td><td>Movimento lateral amplo.</td><td>Zonas, firewall interno, ACLs e revisão de fluxos.</td></tr>\n      <tr><td>VLAN sem política</td><td>VLANs existem, mas roteamento entre elas é livre.</td><td>Organização sem controle real.</td><td>Aplicar política no gateway/firewall.</td></tr>\n      <tr><td>Exceção permanente</td><td>Regra temporária nunca expira.</td><td>Acúmulo de risco invisível.</td><td>Data de expiração, dono e revisão periódica.</td></tr>\n      <tr><td>Logs ausentes</td><td>Firewall permite/nega sem enviar evento ao SIEM.</td><td>Investigação fraca.</td><td>Definir eventos críticos, retenção e correlação.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"seg-title seg-desc\">\n    <title id=\"seg-title\">Segmentação defensiva por zonas</title>\n    <desc id=\"seg-desc\">Diagrama mostrando usuários, visitantes, IoT, aplicações, banco de dados, administração e backup separados por zonas e controlados por firewall interno com logs para SIEM.</desc>\n    <defs>\n      <marker id=\"arrow-seg\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n    </defs>\n    <rect x=\"30\" y=\"35\" width=\"250\" height=\"160\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"155\" y=\"62\" text-anchor=\"middle\" class=\"svg-label\">Zona de Acesso</text>\n    <rect x=\"55\" y=\"85\" width=\"85\" height=\"48\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"98\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Usuários</text>\n    <rect x=\"165\" y=\"85\" width=\"85\" height=\"48\" rx=\"10\" class=\"svg-node svg-node--client\" />\n    <text x=\"208\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi</text>\n    <rect x=\"55\" y=\"145\" width=\"85\" height=\"38\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"98\" y=\"169\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Guest</text>\n    <rect x=\"165\" y=\"145\" width=\"85\" height=\"38\" rx=\"10\" class=\"svg-node\" />\n    <text x=\"208\" y=\"169\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IoT</text>\n\n    <rect x=\"360\" y=\"190\" width=\"220\" height=\"120\" rx=\"18\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"470\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">Firewall interno</text>\n    <text x=\"470\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política entre zonas</text>\n    <text x=\"470\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">allow / deny / log</text>\n\n    <rect x=\"700\" y=\"35\" width=\"240\" height=\"120\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"820\" y=\"62\" text-anchor=\"middle\" class=\"svg-label\">Aplicações</text>\n    <rect x=\"750\" y=\"88\" width=\"140\" height=\"45\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"820\" y=\"116\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">App interna :443</text>\n\n    <rect x=\"700\" y=\"205\" width=\"240\" height=\"120\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"820\" y=\"232\" text-anchor=\"middle\" class=\"svg-label\">Dados</text>\n    <rect x=\"750\" y=\"258\" width=\"140\" height=\"45\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"820\" y=\"286\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Banco restrito</text>\n\n    <rect x=\"30\" y=\"335\" width=\"250\" height=\"130\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"155\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Administração</text>\n    <rect x=\"70\" y=\"390\" width=\"170\" height=\"45\" rx=\"10\" class=\"svg-node svg-node--security\" />\n    <text x=\"155\" y=\"418\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Bastion / PAM / MFA</text>\n\n    <rect x=\"700\" y=\"370\" width=\"240\" height=\"105\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"820\" y=\"397\" text-anchor=\"middle\" class=\"svg-label\">Backup e SIEM</text>\n    <rect x=\"730\" y=\"425\" width=\"80\" height=\"35\" rx=\"10\" class=\"svg-node svg-node--server\" />\n    <text x=\"770\" y=\"447\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Backup</text>\n    <rect x=\"830\" y=\"425\" width=\"80\" height=\"35\" rx=\"10\" class=\"svg-node svg-node--security\" />\n    <text x=\"870\" y=\"447\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SIEM</text>\n\n    <line x1=\"280\" y1=\"120\" x2=\"360\" y2=\"235\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-seg)\" />\n    <line x1=\"580\" y1=\"220\" x2=\"700\" y2=\"105\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-seg)\" />\n    <line x1=\"820\" y1=\"155\" x2=\"820\" y2=\"205\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-seg)\" />\n    <line x1=\"580\" y1=\"275\" x2=\"700\" y2=\"430\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-seg)\" />\n    <line x1=\"280\" y1=\"405\" x2=\"360\" y2=\"275\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-seg)\" />\n    <line x1=\"250\" y1=\"165\" x2=\"360\" y2=\"255\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#arrow-seg)\" />\n    <text x=\"320\" y=\"175\" class=\"svg-label svg-label--small\">guest/IoT negado</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é de arquitetura defensiva. Você vai desenhar zonas, classificar fluxos, definir políticas e validar mentalmente o que deve ser permitido ou negado. Ele não exige cloud paga nem ferramenta ofensiva.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios forçam você a produzir uma matriz de segmentação, identificar erros comuns e separar controle de conectividade.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário de rede plana e deverá propor uma segmentação inicial com zonas, fluxos, logs, exceções e estratégia de migração.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra o raciocínio de priorização: começar por ativos críticos, reduzir movimento lateral, preservar operação e criar evidências.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Segmentação reduz alcance implícito e transforma comunicação em fluxo autorizado.</li>\n    <li>VLAN organiza, mas política entre zonas controla.</li>\n    <li>Menor privilégio de rede exige matriz de fluxos, donos e revisão.</li>\n    <li>Logs são parte da segmentação: sem evidência, a investigação fica fraca.</li>\n    <li>Microsegmentação ajuda, mas sem inventário e automação pode virar complexidade cara.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, vamos aprofundar hardening de switches, roteadores, firewalls, APs e hosts. Depois de separar zonas, precisamos endurecer os próprios componentes que sustentam essas zonas, porque um controle mal configurado pode virar atalho para contornar a segmentação.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7 quando há identidade/aplicação"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "802.1Q",
      "IPv4",
      "TCP",
      "UDP",
      "ICMP",
      "DNS",
      "DHCP",
      "RADIUS",
      "TLS"
    ],
    "dependsOn": [
      "VLAN",
      "subnetting",
      "gateway",
      "roteamento",
      "firewall",
      "ACL",
      "logs"
    ],
    "enables": [
      "defesa em profundidade",
      "Zero Trust",
      "redução de movimento lateral",
      "SOC",
      "microsegmentação",
      "cloud security"
    ]
  },
  "protocolFields": [
    {
      "field": "VLAN ID",
      "size": "12 bits no 802.1Q",
      "purpose": "Identificar o segmento lógico em quadros Ethernet marcados.",
      "securityObservation": "VLAN separa domínio L2, mas não substitui política L3/L4."
    },
    {
      "field": "Source IP",
      "size": "32 bits no IPv4",
      "purpose": "Identificar origem lógica do pacote.",
      "securityObservation": "Ajuda política e logs, mas não deve ser tratado como identidade forte sozinho."
    },
    {
      "field": "Destination Port",
      "size": "16 bits no TCP/UDP",
      "purpose": "Identificar serviço de destino.",
      "securityObservation": "Permitir porta não prova autorização da aplicação; é apenas controle de rede."
    },
    {
      "field": "Action",
      "size": "campo lógico do controle",
      "purpose": "Registrar allow, deny, drop ou reject.",
      "securityObservation": "Sem ação e log, a equipe não consegue auditar decisões de política."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente da zona Usuários",
      "action": "Tenta acessar aplicação interna em HTTPS.",
      "detail": "Pacote sai da VLAN de usuários para o gateway/firewall interno.",
      "possibleFailure": "Rota direta entre VLANs pode contornar o firewall."
    },
    {
      "step": 2,
      "actor": "Firewall interno",
      "action": "Compara origem, destino, porta, usuário/contexto e política.",
      "detail": "Regra permite somente usuários corporativos para app na porta 443.",
      "possibleFailure": "Regra any-any permite mais do que o necessário."
    },
    {
      "step": 3,
      "actor": "Aplicação",
      "action": "Recebe conexão permitida e autentica o usuário na camada de aplicação.",
      "detail": "Rede permitiu o caminho, mas autorização real ainda depende da aplicação/IAM.",
      "possibleFailure": "Confundir regra de firewall com autorização de negócio."
    },
    {
      "step": 4,
      "actor": "SIEM/NDR",
      "action": "Recebe logs de allow, deny e comportamento anômalo.",
      "detail": "Eventos ajudam baseline e investigação.",
      "possibleFailure": "Logs ausentes impedem reconstrução do incidente."
    }
  ],
  "deepDive": {
    "mentalModel": "Segmentação é menor privilégio aplicado ao caminho de rede: cada zona só deve falar com o que precisa, pelo protocolo necessário, com registro e dono claro.",
    "keyTerms": [
      "zona",
      "VLAN",
      "VRF",
      "ACL",
      "firewall interno",
      "microsegmentação",
      "movimento lateral",
      "matriz de fluxos",
      "deny by default"
    ],
    "limitations": [
      "Segmentação não substitui autenticação forte, hardening, EDR, backup ou gestão de vulnerabilidades.",
      "VLAN sem política entre zonas não reduz tráfego roteado livremente.",
      "Políticas excessivamente granulares sem automação podem se tornar inviáveis.",
      "Segmentação mal documentada pode quebrar aplicações durante incidentes ou mudanças."
    ],
    "whenToUse": [
      "Quando há ativos com riscos ou funções diferentes.",
      "Quando usuários não precisam alcançar servidores diretamente.",
      "Quando IoT, visitantes, backup, gestão ou dados críticos precisam isolamento.",
      "Quando auditoria, compliance ou resposta a incidente exigem visibilidade."
    ],
    "whenNotToUse": [
      "Não criar dezenas de zonas sem inventário e capacidade operacional.",
      "Não segmentar apenas por organograma se os fluxos técnicos cruzam áreas.",
      "Não usar segmentação para esconder sistemas sem corrigir vulnerabilidades.",
      "Não aplicar bloqueios sem plano de teste, comunicação e rollback."
    ],
    "operationalImpact": [
      "Exige documentação de fluxos e donos de aplicações.",
      "Aumenta a disciplina de mudança e revisão de regras.",
      "Melhora troubleshooting quando a matriz de fluxos é clara.",
      "Pode gerar chamados se aplicada sem faseamento e comunicação."
    ],
    "financialImpact": [
      "Pode exigir firewalls internos, licenças, logs, armazenamento e equipe especializada.",
      "Em cloud, NAT, firewall gerenciado e tráfego entre zonas podem gerar custo recorrente.",
      "Uma alternativa inicial de baixo custo é segmentar por VLAN/subnet/ACL e logs básicos.",
      "O retorno financeiro aparece na redução de impacto de incidentes e melhoria de auditoria."
    ],
    "securityImpact": [
      "Reduz movimento lateral e exposição desnecessária.",
      "Aumenta visibilidade de tentativas de acesso indevido.",
      "Facilita contenção durante incidentes.",
      "Cria falsa sensação de segurança se regras forem permissivas ou logs ausentes."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que VLAN é firewall.",
      "whyItHappens": "VLANs aparecem como separação no desenho, então parecem bloquear por si mesmas.",
      "consequence": "Tráfego roteado entre VLANs continua livre se o gateway permitir.",
      "correction": "Use VLAN para separação L2 e firewall/ACL para política entre zonas."
    },
    {
      "mistake": "Criar regra any-any para resolver chamado urgente.",
      "whyItHappens": "É rápido e reduz pressão operacional.",
      "consequence": "A exceção vira buraco permanente e amplia movimento lateral.",
      "correction": "Liberar fluxo específico, com origem, destino, porta, dono, justificativa e expiração."
    },
    {
      "mistake": "Segmentar sem inventário de aplicações.",
      "whyItHappens": "A equipe tenta redesenhar antes de conhecer fluxos reais.",
      "consequence": "Aplicações quebram e a organização perde confiança no projeto.",
      "correction": "Coletar logs, entrevistar donos, mapear dependências e migrar por fases."
    },
    {
      "mistake": "Não registrar denies relevantes.",
      "whyItHappens": "Medo de volume de logs ou custo de SIEM.",
      "consequence": "Tentativas de movimento lateral ficam invisíveis.",
      "correction": "Registrar eventos críticos, fazer amostragem quando necessário e definir retenção adequada."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Aplicação parou após segmentação",
      "Usuário acessa app mas app não acessa banco",
      "Servidor tenta conexão inesperada para estações",
      "Deny alto entre zonas",
      "Regras duplicadas ou conflitantes"
    ],
    "diagnosticQuestions": [
      "Qual origem, destino, porta e protocolo do fluxo?",
      "O fluxo é necessário para o negócio ou é legado?",
      "Qual regra permite ou nega esse tráfego?",
      "Há log no firewall, host, aplicação e SIEM?",
      "Existe rota assimétrica ou bypass do ponto de controle?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection 10.20.30.40 -Port 443\ntracert 10.20.30.40\nnetstat -ano",
        "purpose": "Testar alcance de porta, caminho e conexões locais.",
        "expectedObservation": "Porta permitida deve responder; tráfego negado deve falhar de forma esperada.",
        "interpretation": "Se a porta não responde, verificar rota, firewall local, firewall interno e serviço."
      },
      {
        "platform": "Linux",
        "command": "ip route\nss -tulpen\nnc -vz 10.20.30.40 443\ntraceroute 10.20.30.40",
        "purpose": "Validar rota, serviços escutando e conectividade TCP.",
        "expectedObservation": "Fluxos permitidos alcançam destino; fluxos negados não abrem conexão.",
        "interpretation": "Falha pode estar em rota, regra, estado do serviço ou assimetria."
      },
      {
        "platform": "Cisco IOS",
        "command": "show vlan brief\nshow interfaces trunk\nshow ip route\nshow access-lists",
        "purpose": "Verificar VLANs, trunks, rotas e ACLs.",
        "expectedObservation": "VLANs e trunks coerentes com desenho; ACLs com contadores esperados.",
        "interpretation": "ACL sem match pode indicar caminho diferente; contador alto em deny pode indicar regra ou aplicação mal mapeada."
      },
      {
        "platform": "Firewall/SIEM",
        "command": "Filtrar por src_ip, dst_ip, dst_port, action e rule_name",
        "purpose": "Correlacionar política com fluxo real.",
        "expectedObservation": "Eventos allow/deny com regra, zona e timestamp.",
        "interpretation": "Sem logs, a equipe precisa habilitar logging ou coletar em outro ponto."
      }
    ],
    "decisionTree": [
      {
        "if": "Fluxo necessário falha",
        "then": "Confirmar origem/destino/porta, rota, regra, NAT, firewall local e serviço."
      },
      {
        "if": "Fluxo proibido funciona",
        "then": "Procurar regra ampla, rota alternativa, trunk indevido ou bypass."
      },
      {
        "if": "Denies aumentaram após mudança",
        "then": "Separar bloqueios esperados de dependências não mapeadas."
      },
      {
        "if": "Aplicação depende de muitos fluxos laterais",
        "then": "Revisar arquitetura da aplicação antes de criar exceções permanentes."
      }
    ]
  },
  "trafficCapture": {
    "tool": "Wireshark, tcpdump ou logs de firewall/flow logs",
    "filter": "host 10.20.30.40 and tcp port 443",
    "whatToObserve": [
      "SYN sem SYN-ACK",
      "RST",
      "ICMP unreachable",
      "tráfego tomando caminho inesperado",
      "retransmissões"
    ],
    "interpretation": "A captura ajuda a diferenciar bloqueio de rede, serviço indisponível, rota assimétrica e firewall local."
  },
  "security": {
    "goodPractices": [
      "Começar por zonas de maior risco e criticidade.",
      "Aplicar deny by default entre zonas sensíveis.",
      "Registrar fluxos sensíveis permitidos e negados.",
      "Usar matriz de fluxos com dono e justificativa.",
      "Revisar exceções periodicamente.",
      "Isolar guest, IoT, administração, backup e dados críticos."
    ],
    "badPractices": [
      "Rede plana corporativa.",
      "Trunks liberando VLANs desnecessárias.",
      "Any-any entre VLANs.",
      "Exceções sem expiração.",
      "Regras sem dono.",
      "Logs desligados por economia sem avaliação de risco."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Confundir VLAN com controle de segurança completo.",
      "Criar microsegmentação antes de inventário.",
      "Não testar fluxos negados.",
      "Ignorar tráfego leste-oeste."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por rede plana",
        "description": "Ativos comuns conseguem alcançar sistemas críticos sem necessidade.",
        "defensiveExplanation": "Um comprometimento inicial encontra muitos caminhos internos disponíveis.",
        "mitigation": "Zonas, firewall interno, ACLs, logs, EDR, IAM forte e resposta a incidente."
      },
      {
        "name": "Exposição administrativa",
        "description": "Portas de administração acessíveis por redes de usuário ou Wi‑Fi.",
        "defensiveExplanation": "Credenciais vazadas ou malware podem tentar administrar ativos diretamente.",
        "mitigation": "Zona de administração, bastion, MFA, PAM, allowlist e logging forte."
      },
      {
        "name": "IoT sem isolamento",
        "description": "Dispositivos com baixo controle falam com redes internas sensíveis.",
        "defensiveExplanation": "IoT costuma ter firmware fraco, senhas ruins e pouca visibilidade.",
        "mitigation": "VLAN IoT, firewall restritivo, DNS controlado e monitoramento comportamental."
      }
    ],
    "monitoring": [
      "Deny entre zonas sensíveis",
      "Tentativas de SMB/RDP/SSH a partir de usuários",
      "Fluxos novos entre zonas",
      "Aumento de conexões laterais",
      "DNS incomum por segmento",
      "Tráfego de IoT para destinos não esperados"
    ],
    "hardening": [
      "Trunks mínimos",
      "Portas access corretamente configuradas",
      "ACLs revisadas",
      "Firewall com logging",
      "Bastion para administração",
      "NAC/802.1X quando possível"
    ],
    "detectionIdeas": [
      "Alerta para varredura lateral",
      "Alerta para usuário acessando zona de dados diretamente",
      "Alerta para IoT tentando internet ampla",
      "Alerta para mudança em regra crítica",
      "Alerta para regra sem dono ou expirada"
    ]
  },
  "lab": {
    "id": "lab-13.2",
    "title": "Desenhando segmentação defensiva para uma empresa média",
    "labType": "security",
    "objective": "Criar um desenho de zonas, matriz de fluxos e plano de validação para reduzir movimento lateral sem quebrar a operação.",
    "scenario": "Uma empresa possui rede plana com usuários, Wi‑Fi corporativo, visitantes, servidores, banco de dados, impressoras, câmeras, backup e administração no mesmo domínio lógico. A diretoria quer reduzir risco de ransomware e melhorar investigação.",
    "topology": "Usuários/Wi‑Fi/Guest/IoT/Administração -> Firewall interno -> Aplicações -> Banco/Backup/SIEM -> Internet/Cloud controlada",
    "architecture": "Zonas separadas por VLAN/sub-rede e controladas por firewall/ACL. Administração passa por bastion. Guest e IoT têm acesso mínimo. Aplicações acessam dados por portas específicas. Logs seguem para SIEM.",
    "prerequisites": [
      "Conhecer VLANs, subnetting, gateway, ACL e firewall.",
      "Ter lido as aulas 13.1 e módulos anteriores de firewall e Wi‑Fi.",
      "Usar uma planilha, editor de texto ou ferramenta de desenho simples."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Opcional: diagrams.net/offline ou desenho em papel",
      "Opcional: Packet Tracer/GNS3 para simulação conceitual",
      "Opcional: firewall lab local sem exposição pública"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras ou testes de bloqueio em redes reais sem autorização.",
      "Não altere firewall corporativo sem processo de mudança.",
      "O laboratório é defensivo e de arquitetura; não cria tráfego ofensivo.",
      "Use IPs fictícios ou ambiente de laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventariar zonas candidatas",
        "instruction": "Liste grupos de ativos por função e risco.",
        "command": "Tabela sugerida: Zona | Exemplos | Criticidade | Dono | Observações",
        "expectedOutput": "Lista inicial com usuários, guest, IoT, administração, aplicações, dados, backup e internet/cloud.",
        "explanation": "Segmentação começa por classificação, não por regra de firewall."
      },
      {
        "number": 2,
        "title": "Definir endereçamento lógico",
        "instruction": "Atribua uma sub-rede fictícia para cada zona.",
        "command": "Usuários 10.10.10.0/24; Guest 10.10.20.0/24; IoT 10.10.30.0/24; Admin 10.10.40.0/24; Apps 10.20.10.0/24; Dados 10.20.20.0/24; Backup 10.20.30.0/24",
        "expectedOutput": "Mapa de zonas com sub-redes separadas.",
        "explanation": "Sub-redes ajudam roteamento e política, mas ainda precisam de controle entre zonas."
      },
      {
        "number": 3,
        "title": "Criar matriz de fluxos mínimos",
        "instruction": "Defina apenas fluxos necessários entre zonas.",
        "command": "Origem | Destino | Porta | Protocolo | Justificativa | Dono | Log | Expiração",
        "expectedOutput": "Matriz com usuários->apps:443, apps->dados:porta específica, admin->bastion, backup->servidores, guest->internet somente.",
        "explanation": "A matriz evita regras genéricas e cria base para auditoria."
      },
      {
        "number": 4,
        "title": "Definir negações explícitas importantes",
        "instruction": "Liste fluxos que devem ser negados e monitorados.",
        "command": "Guest -> Interno deny log; IoT -> Usuários deny log; Usuários -> Dados deny log; Usuários -> Administração deny log",
        "expectedOutput": "Lista de negações críticas com logging.",
        "explanation": "Nem todo deny precisa virar alerta, mas alguns são sinais fortes de problema."
      },
      {
        "number": 5,
        "title": "Planejar logs e detecção",
        "instruction": "Defina quais eventos irão para SIEM/NDR.",
        "command": "Eventos: deny entre zonas críticas, RDP/SSH/SMB lateral, mudança de regra, tráfego novo para dados, IoT para destinos externos incomuns",
        "expectedOutput": "Plano de telemetria por zona.",
        "explanation": "Segmentação sem visibilidade reduz alcance, mas não ajuda investigação o suficiente."
      },
      {
        "number": 6,
        "title": "Criar plano de migração",
        "instruction": "Organize a implantação em fases para não quebrar operação.",
        "command": "Fase 1 monitorar; Fase 2 bloquear guest/IoT; Fase 3 proteger dados/admin; Fase 4 revisar exceções; Fase 5 automatizar validação",
        "expectedOutput": "Plano de migração gradual com rollback.",
        "explanation": "Mudanças defensivas precisam preservar negócio e construir confiança."
      },
      {
        "number": 7,
        "title": "Validar fluxos permitidos e negados",
        "instruction": "Crie testes de validação para cada regra importante.",
        "command": "Permitido: Usuários -> App 443. Negado: Usuários -> Banco direto. Negado: Guest -> Interno. Permitido: Admin -> Bastion.",
        "expectedOutput": "Checklist de testes com esperado permit/deny.",
        "explanation": "Validação deve testar o que funciona e o que deve falhar."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um desenho de zonas, sub-redes, matriz de fluxos, negações críticas, plano de logs, plano de migração e checklist de validação.",
    "validation": [
      {
        "check": "Toda zona tem dono e justificativa",
        "command": "Revisar tabela de zonas",
        "expected": "Nenhuma zona genérica como 'diversos' sem explicação.",
        "ifFails": "Reclassifique ativos ou crie zona temporária com plano de saneamento."
      },
      {
        "check": "Não há regra any-any entre zonas sensíveis",
        "command": "Revisar matriz de fluxos",
        "expected": "Cada regra possui origem, destino, porta, protocolo e dono.",
        "ifFails": "Substitua regras amplas por fluxos específicos."
      },
      {
        "check": "Guest e IoT estão isolados",
        "command": "Revisar denies planejados",
        "expected": "Guest não acessa interno; IoT acessa apenas destinos necessários.",
        "ifFails": "Criar políticas explícitas e logs para tentativas indevidas."
      },
      {
        "check": "Há plano de rollback",
        "command": "Revisar plano de migração",
        "expected": "Cada fase possui teste, comunicação e reversão.",
        "ifFails": "Não implante bloqueios sem plano operacional."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Aplicação quebra após bloqueio",
        "probableCause": "Dependência não mapeada entre app e banco, DNS, storage ou autenticação.",
        "howToConfirm": "Verificar logs de deny por origem/destino/porta no horário da falha.",
        "fix": "Criar fluxo específico com dono e depois revisar arquitetura."
      },
      {
        "symptom": "Regra permitida não recebe tráfego",
        "probableCause": "Rota diferente, NAT, proxy ou origem real distinta.",
        "howToConfirm": "Comparar logs, traceroute, tabela de rotas e captura.",
        "fix": "Corrigir rota ou regra usando origem real."
      },
      {
        "symptom": "Muitos denies após segmentação",
        "probableCause": "Rede plana escondia dependências e tráfego lateral legado.",
        "howToConfirm": "Agrupar denies por aplicação, host, porta e dono.",
        "fix": "Separar tráfego necessário de comportamento indevido e migrar por fases."
      }
    ],
    "improvements": [
      "Automatizar validação de regras em pipeline de IaC.",
      "Adicionar NetworkPolicies em Kubernetes.",
      "Criar revisão trimestral de exceções.",
      "Integrar firewall logs com SIEM e NDR.",
      "Usar tags de ativos para política dinâmica quando disponível."
    ],
    "evidenceToCollect": [
      "Tabela de zonas",
      "Matriz de fluxos",
      "Lista de negações críticas",
      "Plano de logs",
      "Plano de migração",
      "Checklist de validação"
    ],
    "questions": [
      "Qual zona deve ter menor exposição?",
      "Que fluxos são realmente necessários?",
      "Quais denies devem gerar alerta?",
      "Que regra teria maior impacto se fosse configurada como any-any?",
      "Qual fase de migração reduz mais risco com menor impacto?"
    ],
    "challenge": "Transforme uma rede plana em arquitetura segmentada com pelo menos seis zonas, matriz de fluxos, logs e plano de implantação por fases.",
    "solution": "Uma solução forte separa usuários, guest, IoT, administração, aplicações, dados e backup; permite apenas fluxos justificados; nega acessos laterais comuns; registra denies críticos; implanta primeiro em modo monitoramento e depois em fases com rollback. O ponto central é reduzir alcance sem quebrar dependências legítimas."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que segmentação não é apenas 'criar VLANs'?",
      "hints": [
        "Pense em tráfego roteado entre VLANs.",
        "Pense em política e logs."
      ],
      "expectedIdeas": [
        "VLAN separa camada 2",
        "firewall/ACL controla entre zonas",
        "logs permitem auditoria",
        "menor privilégio"
      ],
      "explanation": "VLAN é um mecanismo de separação, mas a segurança depende da política aplicada entre segmentos."
    },
    {
      "type": "diagnóstico",
      "question": "Um servidor de usuário consegue iniciar RDP para vários servidores. O que você verificaria?",
      "hints": [
        "Origem, destino, porta e regra.",
        "Existe zona administrativa?"
      ],
      "expectedIdeas": [
        "regra permissiva",
        "RDP lateral",
        "zona admin",
        "bastion",
        "logs de firewall"
      ],
      "explanation": "A pergunta força separar fluxo legítimo de administração de exposição lateral indevida."
    },
    {
      "type": "cenário real",
      "question": "A empresa quer segmentar tudo de uma vez. Qual risco operacional existe?",
      "hints": [
        "Pense em dependências não mapeadas.",
        "Pense em rollback."
      ],
      "expectedIdeas": [
        "quebra de aplicações",
        "falta de inventário",
        "migração por fases",
        "modo monitoramento"
      ],
      "explanation": "Segmentação forte precisa de método. Bloqueios grandes sem mapeamento podem causar indisponibilidade."
    }
  ],
  "quiz": [
    {
      "id": "q13.2.1",
      "type": "conceito",
      "q": "Qual é a ideia central da segmentação de rede?",
      "opts": [
        "Reduzir conectividade implícita e permitir apenas fluxos necessários entre zonas.",
        "Aumentar a potência do Wi‑Fi para cobrir mais áreas.",
        "Trocar todos os switches por roteadores.",
        "Desligar DNS interno para reduzir risco."
      ],
      "a": 0,
      "exp": "Segmentação transforma alcance livre em fluxos autorizados, registrados e justificados.",
      "difficulty": "iniciante",
      "topic": "segmentação"
    },
    {
      "id": "q13.2.2",
      "type": "pegadinha",
      "q": "Por que VLAN sozinha não deve ser tratada como firewall?",
      "opts": [
        "Porque VLAN não existe em switches modernos.",
        "Porque VLAN separa camada 2, mas o roteamento entre VLANs pode continuar livre.",
        "Porque VLAN só funciona em Wi‑Fi.",
        "Porque VLAN impede qualquer comunicação IP automaticamente."
      ],
      "a": 1,
      "exp": "A VLAN organiza domínios L2; o controle entre segmentos depende do gateway, ACL ou firewall.",
      "difficulty": "intermediário",
      "topic": "vlan"
    },
    {
      "id": "q13.2.3",
      "type": "diagnóstico",
      "q": "Após segmentação, uma aplicação web funciona, mas não acessa o banco. Qual hipótese testar primeiro?",
      "opts": [
        "Dependência app->banco não mapeada na matriz de fluxos.",
        "Falha obrigatória de RF.",
        "Certificado do navegador do usuário sempre expirado.",
        "VLAN guest com potência alta."
      ],
      "a": 0,
      "exp": "A falha entre aplicação e banco geralmente envolve regra, rota, porta ou dependência não documentada.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q13.2.4",
      "type": "segurança",
      "q": "Qual fluxo normalmente deve ser negado e monitorado?",
      "opts": [
        "Guest -> servidores internos.",
        "Aplicação -> banco na porta necessária.",
        "Usuário -> aplicação web autorizada em 443.",
        "Backup -> servidor na janela definida."
      ],
      "a": 0,
      "exp": "Guest não deve acessar rede interna; tentativas podem indicar erro de segmentação ou atividade indevida.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q13.2.5",
      "type": "cloud",
      "q": "Qual conjunto representa segmentação em cloud?",
      "opts": [
        "Subnets, route tables, security groups/NSGs, firewalls, private endpoints e flow logs.",
        "Apenas aumentar CPU das VMs.",
        "Usar nomes DNS mais curtos.",
        "Publicar todas as VMs com IP público para facilitar acesso."
      ],
      "a": 0,
      "exp": "Cloud aplica os mesmos princípios com blocos virtuais de rede, política e telemetria.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q13.2.6",
      "type": "arquitetura",
      "q": "Qual é um sinal de maturidade em segmentação?",
      "opts": [
        "Toda regra tem origem, destino, porta, dono, justificativa, log e revisão.",
        "Todas as zonas podem acessar todas as outras.",
        "Nenhum deny é registrado.",
        "Toda exceção é permanente."
      ],
      "a": 0,
      "exp": "Regras com contexto e revisão reduzem risco acumulado e facilitam auditoria.",
      "difficulty": "intermediário",
      "topic": "governança"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.2.1",
      "front": "O que é segmentação de rede?",
      "back": "É dividir a rede em zonas e controlar os fluxos entre elas conforme necessidade, risco e política.",
      "tags": [
        "segmentação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.2.2",
      "front": "VLAN é firewall?",
      "back": "Não. VLAN separa domínio de camada 2; firewall ou ACL controla tráfego entre zonas.",
      "tags": [
        "vlan",
        "firewall"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.2.3",
      "front": "O que é movimento lateral?",
      "back": "É a tentativa de sair de um ponto comprometido para outros sistemas internos mais valiosos.",
      "tags": [
        "movimento-lateral"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.2.4",
      "front": "O que é matriz de fluxos?",
      "back": "Tabela que documenta origem, destino, porta, protocolo, justificativa, dono, log e expiração de comunicações entre zonas.",
      "tags": [
        "arquitetura"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.2.5",
      "front": "Qual risco de any-any?",
      "back": "Permite tráfego amplo demais, reduz controle e amplia o impacto de incidentes.",
      "tags": [
        "firewall"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.2.6",
      "front": "O que microsegmentação acrescenta?",
      "back": "Política mais granular por host, workload, identidade, tag ou aplicação, útil em cloud, datacenter e Zero Trust.",
      "tags": [
        "microsegmentação"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex13.2.1",
      "type": "conceitual",
      "prompt": "Explique por que uma rede plana aumenta o impacto de ransomware.",
      "expectedAnswer": "Porque um host comprometido pode alcançar muitos outros sistemas sem barreiras, facilitando propagação, descoberta lateral e acesso a dados críticos.",
      "explanation": "O risco não está apenas no malware inicial, mas no alcance lateral disponível."
    },
    {
      "id": "ex13.2.2",
      "type": "arquitetura",
      "prompt": "Crie cinco zonas para uma empresa com usuários, visitantes, IoT, aplicação, banco e backup.",
      "expectedAnswer": "Exemplo: Usuários, Guest, IoT, Aplicações, Dados/Backup ou separar Dados e Backup como zonas distintas.",
      "explanation": "O aluno deve separar por função e risco, não por conveniência visual."
    },
    {
      "id": "ex13.2.3",
      "type": "segurança",
      "prompt": "Defina três fluxos permitidos e três negados entre zonas.",
      "expectedAnswer": "Permitidos: usuários->app 443, app->banco porta específica, admin->bastion. Negados: guest->interno, usuários->banco direto, IoT->usuários.",
      "explanation": "A resposta precisa mostrar menor privilégio e controle lateral."
    },
    {
      "id": "ex13.2.4",
      "type": "troubleshooting",
      "prompt": "Uma regra allow existe, mas o tráfego não aparece no firewall. Liste três hipóteses.",
      "expectedAnswer": "Rota alternativa, origem real diferente, NAT, proxy, caminho assimétrico ou serviço tentando outra porta.",
      "explanation": "Sem observar caminho real, a regra pode estar correta no papel e irrelevante na prática."
    }
  ],
  "challenge": {
    "title": "Redesenhar uma rede plana após incidente lateral",
    "scenario": "Uma empresa sofreu incidente em uma estação de usuário. A análise mostrou tentativas de SMB, RDP e SQL para vários servidores internos. Hoje usuários, servidores, backup, IoT, impressoras e Wi‑Fi ficam em poucos segmentos com regras amplas.",
    "tasks": [
      "Propor pelo menos seis zonas.",
      "Criar matriz de dez fluxos, com allow/deny/log.",
      "Definir três alertas para SIEM.",
      "Criar plano de migração em quatro fases.",
      "Explicar como validar que movimento lateral foi reduzido."
    ],
    "constraints": [
      "Não pode quebrar aplicação crítica.",
      "Não pode usar regra any-any entre zonas sensíveis.",
      "Guest e IoT devem ser isolados.",
      "Administração deve passar por bastion ou zona privilegiada.",
      "Toda exceção deve ter dono e prazo."
    ],
    "expectedDeliverables": [
      "Mapa de zonas",
      "Matriz de fluxos",
      "Plano de logs",
      "Plano de migração",
      "Checklist de validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação por risco e função",
        "points": 25,
        "description": "Zonas fazem sentido e isolam ativos críticos."
      },
      {
        "criterion": "Matriz de fluxos",
        "points": 25,
        "description": "Fluxos são específicos, justificados e testáveis."
      },
      {
        "criterion": "Telemetria e resposta",
        "points": 20,
        "description": "Logs e alertas ajudam investigação e contenção."
      },
      {
        "criterion": "Viabilidade operacional",
        "points": 20,
        "description": "Plano de migração reduz risco sem quebrar negócio."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Entregáveis são compreensíveis e auditáveis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa pelos ativos críticos e pelos caminhos de maior risco. Não tentamos bloquear tudo de uma vez: primeiro identificamos zonas, depois mapeamos fluxos reais, registramos em modo monitoramento, aplicamos bloqueios em fases e validamos permitido/negado.",
    "steps": [
      "Separar usuários, guest, IoT, administração, aplicações, dados e backup.",
      "Criar matriz de fluxos mínimos.",
      "Negar usuários para dados direto, guest para interno e IoT para usuários.",
      "Forçar administração via bastion.",
      "Registrar denies críticos e mudanças de regra.",
      "Migrar por fases com rollback.",
      "Revisar exceções depois de estabilizar."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Criar VLANs e liberar roteamento total entre elas.",
        "whyItIsWrong": "Organiza a rede, mas não reduz movimento lateral de forma efetiva."
      },
      {
        "answer": "Bloquear tudo imediatamente.",
        "whyItIsWrong": "Pode quebrar dependências não mapeadas e gerar indisponibilidade."
      },
      {
        "answer": "Comprar microsegmentação sem inventário.",
        "whyItIsWrong": "Ferramenta sem contexto vira complexidade, custo e regras ruins."
      }
    ],
    "finalAnswer": "Uma resposta madura cria zonas por função e risco, aplica menor privilégio entre elas, registra eventos relevantes, migra por fases e valida tanto o acesso necessário quanto os bloqueios de segurança."
  },
  "glossary": [
    {
      "term": "Segmentação de rede",
      "shortDefinition": "Divisão da rede em zonas com políticas de comunicação controladas.",
      "longDefinition": "Prática de separar ativos por função, risco ou criticidade e controlar fluxos entre esses grupos para reduzir exposição e movimento lateral.",
      "example": "Separar usuários, servidores, IoT, guest e administração em zonas distintas.",
      "relatedTerms": [
        "zona",
        "VLAN",
        "firewall",
        "ACL"
      ],
      "relatedLessons": [
        "13.1",
        "13.2"
      ]
    },
    {
      "term": "Zona de segurança",
      "shortDefinition": "Grupo lógico de ativos com nível semelhante de risco ou função.",
      "longDefinition": "Uma zona define limites de política. Ativos dentro dela compartilham requisitos e fluxos parecidos.",
      "example": "Zona de dados contendo bancos acessados apenas por aplicações autorizadas.",
      "relatedTerms": [
        "segmentação",
        "matriz de fluxos"
      ],
      "relatedLessons": [
        "13.2"
      ]
    },
    {
      "term": "Movimento lateral",
      "shortDefinition": "Expansão de um atacante ou malware para outros sistemas internos.",
      "longDefinition": "Tática em que uma ameaça usa credenciais, serviços ou conectividade interna para alcançar ativos adicionais após o comprometimento inicial.",
      "example": "Uma estação comprometida tentando RDP ou SMB para servidores.",
      "relatedTerms": [
        "rede plana",
        "Zero Trust"
      ],
      "relatedLessons": [
        "13.1",
        "13.2",
        "16.7"
      ]
    },
    {
      "term": "Matriz de fluxos",
      "shortDefinition": "Tabela que documenta comunicações permitidas entre zonas.",
      "longDefinition": "Inclui origem, destino, porta, protocolo, justificativa, dono, ação, log e expiração.",
      "example": "Usuários -> Aplicação interna TCP/443 permitido com log.",
      "relatedTerms": [
        "firewall",
        "ACL",
        "governança"
      ],
      "relatedLessons": [
        "13.2",
        "13.10"
      ]
    },
    {
      "term": "Microsegmentação",
      "shortDefinition": "Segmentação granular por host, workload, identidade, tag ou aplicação.",
      "longDefinition": "Modelo de controle mais fino que reduz comunicação lateral mesmo dentro de datacenters, cloud ou clusters.",
      "example": "Somente pods de frontend podem acessar pods de API em uma porta específica.",
      "relatedTerms": [
        "Zero Trust",
        "NetworkPolicy"
      ],
      "relatedLessons": [
        "13.2",
        "14.11"
      ]
    },
    {
      "term": "Deny by default",
      "shortDefinition": "Política em que o padrão é negar e liberar apenas o necessário.",
      "longDefinition": "Princípio de segurança que reduz permissividade implícita e exige justificativa explícita para tráfego permitido.",
      "example": "Entre zona de usuários e zona de dados, tudo negado exceto fluxos aprovados.",
      "relatedTerms": [
        "menor privilégio",
        "firewall"
      ],
      "relatedLessons": [
        "13.1",
        "13.2"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "SP 800-207 Zero Trust Architecture",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
      "note": "Base conceitual para Zero Trust e abandono da confiança baseada apenas em perímetro."
    },
    {
      "type": "official-doc",
      "title": "Layering Network Security Through Segmentation",
      "organization": "CISA",
      "url": "https://www.cisa.gov/sites/default/files/2023-01/layering-network-security-segmentation_infographic_508_0.pdf",
      "note": "Material oficial sobre segmentação como camada de defesa e redução de movimento lateral."
    },
    {
      "type": "official-doc",
      "title": "SP 800-41 Rev. 1 Guidelines on Firewalls and Firewall Policy",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
      "note": "Referência para firewalls, política e controle de fluxo entre posturas de segurança diferentes."
    },
    {
      "type": "official-doc",
      "title": "CISA Releases Part One of Zero Trust Microsegmentation Guidance",
      "organization": "CISA",
      "url": "https://www.cisa.gov/news-events/alerts/2025/07/29/cisa-releases-part-one-zero-trust-microsegmentation-guidance",
      "note": "Referência atual sobre microsegmentação, benefícios, desafios e relação com Zero Trust."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 13.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula anterior sobre defesa em profundidade."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Segmentação frequentemente começa em switches, VLANs e trunks."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall e ACL aplicam política entre zonas."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "cloud/kubernetes",
      "lesson": "network-policy",
      "reason": "Microsegmentação em Kubernetes depende de NetworkPolicies e desenho de plataforma."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM corporativo",
      "lesson": "autorização",
      "reason": "Zero Trust e segmentação moderna dependem de identidade, grupos, posture e contexto."
    }
  ],
  "pedagogicalMap": {
    "problem": "Rede plana amplia alcance lateral e dificulta investigação.",
    "concept": "Segmentação cria zonas e controla fluxos entre elas.",
    "internalMechanism": "VLAN/sub-rede/VRF organizam limites; firewall/ACL aplica política; logs geram evidência.",
    "realUse": "Separar usuários, servidores, dados, administração, guest, IoT, backup e cloud.",
    "commonMistake": "Criar VLANs e deixar roteamento livre entre todas.",
    "securityImpact": "Reduz movimento lateral e facilita contenção.",
    "operationalImpact": "Exige inventário, matriz de fluxos, revisão e governança.",
    "summary": "Segmentar é aplicar menor privilégio ao caminho de rede."
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
      "13.3"
    ]
  }
};
