export const lesson1308 = {
  "id": "13.8",
  "moduleId": "m13",
  "order": 8,
  "title": "Zero Trust Aplicado à Rede: Identidade, Contexto e Menor Privilégio",
  "subtitle": "Como sair da confiança implícita de rede interna e desenhar acessos baseados em identidade, dispositivo, contexto, política, enforcement e telemetria.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 360,
  "tags": [
    "redes",
    "segurança",
    "zero trust",
    "ztna",
    "iam",
    "menor privilégio",
    "segmentação",
    "soc",
    "cloud",
    "devsecops",
    "policy as code"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewalls, ACLs e políticas de tráfego são base para enforcement de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m10",
      "lesson": "10.x",
      "reason": "VPN e acesso remoto ajudam a entender por que acesso amplo à rede é arriscado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação é necessária para reduzir movimento lateral."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM, logs e telemetria são necessários para monitorar decisões de acesso."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "mXX",
      "lesson": "identidade-e-autorizacao",
      "reason": "Zero Trust depende fortemente de identidade, atributos, MFA e ciclo de vida de acessos."
    }
  ],
  "objectives": [
    "Explicar Zero Trust como estratégia de segurança e arquitetura, não como produto isolado.",
    "Diferenciar confiança implícita de acesso explicitamente verificado.",
    "Relacionar identidade, dispositivo, contexto, recurso, política, PEP, PDP e telemetria.",
    "Aplicar menor privilégio em acessos de VPN, Wi-Fi, cloud, aplicações internas e pipelines.",
    "Identificar limitações, custos e riscos operacionais de uma implantação Zero Trust.",
    "Desenhar uma política de acesso por fluxo com evidências e revisão contínua."
  ],
  "learningOutcomes": [
    "Dado um acesso amplo por VPN, o aluno propõe uma política mais restrita por aplicação.",
    "Dado um fluxo entre usuário e recurso, o aluno identifica sujeito, recurso, contexto, enforcement e logs.",
    "Dado um ambiente cloud, o aluno diferencia subnet privada de política Zero Trust efetiva.",
    "Dado um risco de movimento lateral, o aluno escolhe controles de segmentação, IAM, telemetria e menor privilégio.",
    "Dado um plano de migração, o aluno identifica riscos de negócio e implantação por fases."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine uma empresa que fez tudo que parecia correto no modelo clássico: firewall de borda, VPN para usuários remotos, VLANs internas e antivírus nos endpoints. Ainda assim, quando uma credencial de um funcionário é comprometida, o invasor consegue entrar pela VPN, acessar uma rede ampla, descobrir servidores, tentar autenticações laterais e alcançar sistemas que nunca deveriam estar no mesmo raio de confiança daquele usuário.</p>\n  <p>O problema não foi a falta de um firewall. O problema foi confiar demais no fato de que algo estava “dentro da rede”. Durante muitos anos, estar dentro do perímetro corporativo significava receber confiança implícita. Zero Trust surgiu justamente para atacar essa premissa: rede interna não deve ser sinônimo de usuário confiável, dispositivo confiável, aplicação confiável ou fluxo autorizado.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário autenticado na VPN precisa acessar apenas um sistema de chamados, mas a arquitetura entrega alcance de rede para dezenas de sub-redes. Se essa conta for comprometida, a rede vira um corredor longo demais.</div>\n  <p>Esta aula mostra Zero Trust aplicado à rede como arquitetura prática: identidade, contexto, menor privilégio, segmentação, política por aplicação, telemetria e decisão contínua. Não é uma marca, não é um único produto e não é “acabar com firewall”. É uma mudança de modelo mental: cada acesso deve ser explicitamente avaliado, limitado, monitorado e revisado.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Redes corporativas nasceram em um mundo mais previsível: usuários trabalhavam no escritório, servidores ficavam no datacenter, aplicações eram internas e o perímetro parecia claro. O firewall separava “dentro” e “fora”. A VPN estendia o “dentro” para quem estava remoto. Esse modelo funcionou por muito tempo, mas começou a falhar quando laptops, Wi-Fi, SaaS, cloud, terceirizados, BYOD, APIs, pipelines e identidades federadas mudaram o formato da empresa.</p>\n  <p>Com a expansão de cloud e trabalho remoto, o perímetro deixou de ser uma linha simples. Um usuário pode estar em casa, usando um dispositivo gerenciado, acessando um SaaS, uma aplicação interna publicada por proxy, uma API na cloud e um repositório de código. Ao mesmo tempo, incidentes mostraram que invasores frequentemente não “quebram” todos os sistemas: eles obtêm uma credencial, abusam de confiança excessiva e caminham por fluxos permitidos.</p>\n  <p>Zero Trust consolida práticas que já existiam em segurança: menor privilégio, autenticação forte, segmentação, verificação de dispositivo, logs, criptografia, controle de sessão e revisão contínua. A contribuição moderna é organizar essas práticas em uma arquitetura coerente, onde a pergunta deixa de ser “você está na rede interna?” e passa a ser “quem é você, qual dispositivo usa, qual recurso quer acessar, em que contexto, com que risco, por quanto tempo, por qual caminho e com qual evidência?”.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico central é a confiança implícita. Em redes tradicionais, o controle muitas vezes acontece apenas na entrada: passou pela VPN, conectou no Wi-Fi corporativo, está na VLAN certa ou veio de um IP interno. Depois disso, muitas decisões são amplas demais. Essa abordagem cria vários riscos:</p>\n  <ul>\n    <li><strong>Alcance excessivo:</strong> o usuário recebe conectividade para redes inteiras quando precisava de uma aplicação específica.</li>\n    <li><strong>Política baseada em IP:</strong> regras dizem “sub-rede A pode falar com sub-rede B”, mas não sabem quem é o usuário nem a postura do dispositivo.</li>\n    <li><strong>Movimento lateral:</strong> uma credencial comprometida pode ser usada para testar serviços internos em escala.</li>\n    <li><strong>Exceções permanentes:</strong> liberações temporárias viram regra definitiva e ninguém revisa.</li>\n    <li><strong>Baixa visibilidade:</strong> sem logs de identidade, dispositivo, aplicação e fluxo, não há como explicar por que um acesso foi permitido.</li>\n  </ul>\n  <p>Zero Trust tenta reduzir esses problemas tornando a confiança explícita, contextual e limitada. Ele não elimina todos os riscos. Uma política ruim ainda pode permitir acesso indevido. Um IAM mal governado ainda pode dar privilégio excessivo. Um dispositivo comprometido ainda pode iniciar sessão. Por isso, Zero Trust precisa ser implementado como arquitetura, processo e telemetria, não como “comprar uma solução”.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução da segurança de rede pode ser vista como uma transição de perímetro fixo para decisão contextual. Cada etapa resolveu um problema, mas trouxe limitações.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Evolução</th></tr></thead>\n    <tbody>\n      <tr><td>Perímetro clássico</td><td>Firewall separa rede interna da internet.</td><td>Confia demais no que está dentro.</td><td>Defesa em profundidade e segmentação interna.</td></tr>\n      <tr><td>VPN ampla</td><td>Usuário remoto ganha presença lógica na rede.</td><td>Entrega alcance de rede maior que o necessário.</td><td>Acesso por aplicação, ZTNA e proxy de identidade.</td></tr>\n      <tr><td>Segmentação por IP</td><td>Sub-redes e VLANs separam grupos.</td><td>Não entende usuário, dispositivo, risco ou sessão.</td><td>Políticas baseadas em identidade e contexto.</td></tr>\n      <tr><td>NAC isolado</td><td>Dispositivo é avaliado no momento de conexão.</td><td>Postura pode mudar depois da conexão.</td><td>Verificação contínua e resposta dinâmica.</td></tr>\n      <tr><td>Zero Trust aplicado</td><td>Cada acesso é avaliado por identidade, dispositivo, recurso, contexto e política.</td><td>Exige inventário, IAM, telemetria, automação e governança maduros.</td><td>Políticas adaptativas, integração com SOC e revisão contínua.</td></tr>\n    </tbody>\n  </table>\n  <p>Na prática, a maioria das empresas não “vira Zero Trust” de uma vez. Ela amadurece por fases: inventário, MFA, segmentação, logs, controle de acesso por aplicação, revisão de privilégios, políticas como código, detecção e resposta automatizada.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Zero Trust é uma estratégia de segurança em que nenhum sujeito, dispositivo, rede ou aplicação recebe confiança implícita apenas por localização. O acesso deve ser explicitamente verificado, concedido com menor privilégio e monitorado continuamente.</p>\n  <div class=\"definition-box\"><strong>Definição prática:</strong> Zero Trust aplicado à rede é o desenho em que cada fluxo relevante precisa ter identidade, contexto, política, ponto de enforcement, telemetria e revisão. A rede deixa de ser um grande espaço confiável e passa a ser uma malha de acessos justificados.</div>\n  <p>Elementos essenciais:</p>\n  <ul>\n    <li><strong>Sujeito:</strong> usuário, serviço, workload, dispositivo, pipeline ou conta de máquina.</li>\n    <li><strong>Recurso:</strong> aplicação, API, banco, servidor, SaaS, serviço interno ou painel administrativo.</li>\n    <li><strong>Contexto:</strong> postura do dispositivo, localização, horário, risco, sensibilidade do recurso, identidade, grupo, autenticação e comportamento.</li>\n    <li><strong>Política:</strong> regra que decide quando, como e por quanto tempo o acesso será permitido.</li>\n    <li><strong>PEP:</strong> ponto que aplica a decisão, como proxy, firewall, gateway, agente, service mesh ou controle cloud.</li>\n    <li><strong>PDP:</strong> componente lógico que toma decisão de política com base em sinais e regras.</li>\n  </ul>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, Zero Trust aplicado à rede pode ser entendido como uma sequência de decisão. O usuário não simplesmente “entra na rede”; ele solicita acesso a um recurso e essa solicitação é avaliada.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Identificação do sujeito:</strong> o sistema precisa saber se o acesso vem de usuário, dispositivo, serviço, workload ou pipeline.</li>\n    <li><strong>Autenticação forte:</strong> credenciais, MFA, certificado, chave, token ou identidade federada são validados.</li>\n    <li><strong>Coleta de contexto:</strong> postura do dispositivo, risco de sessão, localização, horário, grupo, sensibilidade do recurso e sinais de comportamento são avaliados.</li>\n    <li><strong>Decisão de política:</strong> o mecanismo de política compara a solicitação com regras de acesso.</li>\n    <li><strong>Enforcement:</strong> um ponto técnico aplica a decisão: permitir, negar, pedir MFA adicional, isolar, reduzir escopo ou registrar evento.</li>\n    <li><strong>Sessão limitada:</strong> o acesso deve ser específico para recurso, porta, aplicação, tempo e escopo necessários.</li>\n    <li><strong>Monitoramento contínuo:</strong> logs, fluxo, comportamento e eventos alimentam SIEM/SOC e podem alterar decisões futuras.</li>\n    <li><strong>Revisão:</strong> políticas, exceções, grupos, contas e fluxos são revisados para remover permissões antigas.</li>\n  </ol>\n  <p>A parte de rede aparece no enforcement: segmentação, firewall interno, ZTNA, proxy reverso, private access, NAC, microsegmentação, security group, service mesh, policy engine, DNS controlado, egress control e logs de fluxo.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura Zero Trust para rede não depende de um único componente. Ela combina camadas de decisão e enforcement.</p>\n  <ul>\n    <li><strong>Camada de identidade:</strong> IdP, diretório, MFA, grupos, atributos, identidade de workload e ciclo de vida de acesso.</li>\n    <li><strong>Camada de dispositivo:</strong> MDM, EDR, postura, certificado, compliance, criptografia e integridade.</li>\n    <li><strong>Camada de rede:</strong> segmentação, firewall, NAC, ZTNA, proxy, private endpoint, security groups, ACLs e microsegmentação.</li>\n    <li><strong>Camada de aplicação:</strong> autenticação por aplicação, autorização, logs, API gateway e controle de sessão.</li>\n    <li><strong>Camada de dados:</strong> classificação, DLP, criptografia, permissões e trilha de auditoria.</li>\n    <li><strong>Camada de telemetria:</strong> SIEM, NDR, EDR, flow logs, DNS logs, RADIUS logs, IAM logs e resposta.</li>\n  </ul>\n  <p>O erro comum é tentar substituir segmentação por identidade ou identidade por segmentação. Em ambientes reais, as duas se complementam. Identidade decide quem pode acessar. Segmentação reduz onde esse acesso pode chegar. Telemetria mostra se a política funciona. Resposta corrige quando algo sai do esperado.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Uma rede tradicional se parece com um prédio onde a pessoa mostra o crachá na portaria e, depois de entrar, consegue caminhar por muitos andares. Zero Trust se parece mais com um prédio em que cada porta importante exige autorização específica: quem é você, por que precisa entrar, seu crachá ainda é válido, seu dispositivo está autorizado, este horário faz sentido e sua permanência será registrada.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, acessos acontecem em milissegundos, por máquinas, serviços, APIs, usuários e pipelines. Não existe um guarda humano em cada porta. A política precisa ser automatizada, observável e integrada aos sistemas de identidade, rede e aplicação.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma casa, todos os dispositivos geralmente ficam na mesma rede: notebook, televisão, celular, câmera e impressora. Se um dispositivo inseguro for comprometido, ele pode tentar falar com outros dispositivos. Uma versão simples de Zero Trust seria separar convidados e IoT, bloquear acesso lateral desnecessário, exigir senhas fortes, atualizar firmware e observar dispositivos desconhecidos.</p>\n  <p>Não é Zero Trust completo, mas já aplica o princípio: estar conectado ao Wi-Fi não significa poder acessar tudo.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um analista financeiro precisa acessar o ERP, um compartilhamento específico e um portal interno. Ele não precisa alcançar controladores de domínio, hypervisors, bancos de dados diretamente, VLAN de servidores, rede de backup, switch management ou painéis de firewall. A arquitetura deve refletir isso.</p>\n  <p>Um desenho mais seguro usa MFA, dispositivo gerenciado, EDR ativo, acesso via proxy de aplicação ou ZTNA, regras por grupo, firewall interno, logs de acesso, DNS controlado, bloqueio de portas administrativas e revisão periódica de permissões. Se a conta do analista for comprometida, o raio de impacto é menor.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, Zero Trust aparece em VPC/VNet, subnets, security groups, NSGs, private endpoints, IAM, workload identity, service endpoints, firewall gerenciado, DNS privado, logs de fluxo, audit logs e políticas por recurso. O erro comum é pensar que uma subnet privada é automaticamente segura. Privada significa sem exposição direta pública; não significa sem risco lateral.</p>\n  <p>Uma aplicação em cloud deve acessar apenas o banco necessário, pela porta necessária, usando identidade de workload, segredo gerenciado, endpoint privado quando apropriado, logs de auditoria e egress control. Runners de CI/CD não devem ter acesso amplo à rede de produção só porque fazem deploy.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>DevSecOps aplica Zero Trust quando transforma acesso em política versionada, revisável e automatizada. Exemplos: Terraform criando security groups mínimos, revisão de exceções em pull request, OIDC federation para pipelines, secrets em cofre, NetworkPolicy em Kubernetes, service mesh com mTLS, admission control, policy as code e evidências de mudança.</p>\n  <p>O pipeline também precisa ser tratado como sujeito. Ele tem identidade, permissões, escopo, logs e risco. Um runner comprometido com acesso amplo a produção é equivalente a uma estação administrativa exposta.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Na prática de segurança, Zero Trust ajuda a reduzir movimento lateral e abuso de credenciais. A tabela resume decisões defensivas.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Confiança por rede interna</td><td>Regras amplas entre sub-redes internas.</td><td>Movimento lateral após uma credencial comprometida.</td><td>Segmentação, acesso por aplicação, firewall interno e menor privilégio.</td></tr>\n      <tr><td>Conta com privilégio excessivo</td><td>Grupos genéricos, contas compartilhadas e exceções antigas.</td><td>Acesso indevido a sistemas críticos.</td><td>Revisão de acesso, PAM, MFA, Just-in-Time e contas nominativas.</td></tr>\n      <tr><td>Dispositivo não confiável</td><td>BYOD ou endpoint sem EDR acessando recursos internos.</td><td>Entrada de malware ou sessão roubada.</td><td>MDM, EDR, postura de dispositivo, certificado e bloqueio por compliance.</td></tr>\n      <tr><td>Política sem telemetria</td><td>Permissões existem, mas ninguém sabe se são usadas corretamente.</td><td>Falsa sensação de segurança.</td><td>Logs de IAM, rede, aplicação, DNS, flow e SIEM com revisão periódica.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra o fluxo conceitual de decisão Zero Trust aplicado à rede: identidade e contexto alimentam política; o enforcement limita o caminho até o recurso; a telemetria retorna para detecção e revisão.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1200 600\" role=\"img\" aria-labelledby=\"zt-title zt-desc\">\n    <title id=\"zt-title\">Arquitetura Zero Trust aplicada à rede</title>\n    <desc id=\"zt-desc\">Usuário, dispositivo, identidade, postura, política, enforcement de rede, aplicação, dados e SIEM em ciclo de decisão e telemetria.</desc>\n    <defs>\n      <marker id=\"arrow-1308\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"80\" width=\"210\" height=\"370\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"135\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Sujeito</text>\n    <rect x=\"65\" y=\"160\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"135\" y=\"190\" text-anchor=\"middle\" class=\"svg-label\">Usuário</text>\n    <text x=\"135\" y=\"210\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MFA / grupo</text>\n    <rect x=\"65\" y=\"285\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"135\" y=\"315\" text-anchor=\"middle\" class=\"svg-label\">Dispositivo</text>\n    <text x=\"135\" y=\"335\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">postura / EDR</text>\n\n    <rect x=\"310\" y=\"80\" width=\"230\" height=\"370\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"425\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Decisão</text>\n    <rect x=\"350\" y=\"155\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"425\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">PDP</text>\n    <text x=\"425\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política</text>\n    <rect x=\"350\" y=\"285\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"425\" y=\"315\" text-anchor=\"middle\" class=\"svg-label\">Contexto</text>\n    <text x=\"425\" y=\"335\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">risco / recurso</text>\n\n    <rect x=\"610\" y=\"80\" width=\"230\" height=\"370\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"725\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Enforcement</text>\n    <rect x=\"650\" y=\"155\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"725\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">PEP</text>\n    <text x=\"725\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">proxy / firewall</text>\n    <rect x=\"650\" y=\"285\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"725\" y=\"315\" text-anchor=\"middle\" class=\"svg-label\">Segmentação</text>\n    <text x=\"725\" y=\"335\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">zona / fluxo</text>\n\n    <rect x=\"910\" y=\"80\" width=\"240\" height=\"370\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"1030\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Recurso</text>\n    <rect x=\"960\" y=\"155\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"1030\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"1030\" y=\"205\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">autorização</text>\n    <rect x=\"960\" y=\"285\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"1030\" y=\"315\" text-anchor=\"middle\" class=\"svg-label\">Dados/API</text>\n    <text x=\"1030\" y=\"335\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sensível</text>\n\n    <rect x=\"490\" y=\"505\" width=\"220\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"600\" y=\"538\" text-anchor=\"middle\" class=\"svg-label\">SIEM / SOC / revisão</text>\n\n    <line x1=\"205\" y1=\"190\" x2=\"350\" y2=\"190\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1308)\" />\n    <line x1=\"205\" y1=\"320\" x2=\"350\" y2=\"320\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1308)\" />\n    <line x1=\"500\" y1=\"190\" x2=\"650\" y2=\"190\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1308)\" />\n    <line x1=\"800\" y1=\"190\" x2=\"960\" y2=\"190\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1308)\" />\n    <line x1=\"800\" y1=\"320\" x2=\"960\" y2=\"320\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1308)\" />\n    <line x1=\"1030\" y1=\"355\" x2=\"710\" y2=\"505\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1308)\" />\n    <line x1=\"600\" y1=\"505\" x2=\"425\" y2=\"355\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1308)\" />\n    <text x=\"575\" y=\"172\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">decisão</text>\n    <text x=\"880\" y=\"172\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">acesso mínimo</text>\n    <text x=\"805\" y=\"465\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">telemetria</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam a conversão de permissões amplas em políticas mínimas e auditáveis. Responda sempre identificando sujeito, recurso, contexto, política, enforcement e evidência.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio coloca você como arquiteto de segurança encarregado de reduzir acesso lateral de VPN e Wi-Fi corporativo sem quebrar o negócio.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostrará como partir de inventário e fluxos reais, criar políticas por aplicação, aplicar menor privilégio, preservar logs e migrar por fases.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Zero Trust não é produto; é estratégia e arquitetura.</li>\n    <li>Rede interna não deve gerar confiança implícita.</li>\n    <li>Identidade, contexto, dispositivo, recurso e risco precisam participar da decisão.</li>\n    <li>Segmentação e menor privilégio reduzem movimento lateral.</li>\n    <li>Sem telemetria, política e revisão, Zero Trust vira slogan.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará <strong>Playbooks de Investigação de Rede para SOC e Blue Team</strong>. Depois de entender como limitar acesso com Zero Trust, o próximo passo é documentar como investigar sinais de rede, escalar incidentes e responder com evidências.</p>\n</section>\n"
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
      "802.1X",
      "RADIUS",
      "TLS",
      "HTTPS",
      "DNS",
      "TCP",
      "UDP",
      "ICMP",
      "OIDC",
      "SAML"
    ],
    "dependsOn": [
      "VLAN",
      "ACL",
      "Firewall",
      "VPN",
      "IAM",
      "SIEM",
      "NAC"
    ],
    "enables": [
      "ZTNA",
      "microsegmentação",
      "acesso por aplicação",
      "menor privilégio",
      "detecção contextual"
    ]
  },
  "protocolFields": [
    {
      "field": "Identity claim",
      "size": "variável",
      "purpose": "Transportar atributos de identidade usados em decisão de acesso.",
      "securityObservation": "Claims excessivos ou não validados podem gerar autorização incorreta."
    },
    {
      "field": "Device posture signal",
      "size": "variável",
      "purpose": "Indicar estado do dispositivo, como compliance, EDR, criptografia ou certificado.",
      "securityObservation": "Sinais falsos ou desatualizados podem permitir acesso indevido."
    },
    {
      "field": "Network flow metadata",
      "size": "variável",
      "purpose": "Registrar origem, destino, porta, protocolo, horário, volume e decisão.",
      "securityObservation": "Sem metadados, a equipe não consegue auditar se a política funcionou."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Usuário ou workload",
      "action": "Solicita acesso a recurso específico.",
      "detail": "A solicitação deve indicar identidade, recurso e contexto mínimo.",
      "possibleFailure": "Acesso amplo por rede inteira impede controle fino."
    },
    {
      "step": 2,
      "actor": "PDP",
      "action": "Avalia política.",
      "detail": "Considera identidade, dispositivo, grupo, risco, recurso, horário e postura.",
      "possibleFailure": "Política baseada só em IP ignora contexto de identidade."
    },
    {
      "step": 3,
      "actor": "PEP",
      "action": "Aplica decisão.",
      "detail": "Permite, nega, exige MFA, limita sessão ou registra evento.",
      "possibleFailure": "PEP mal posicionado permite bypass por caminho alternativo."
    },
    {
      "step": 4,
      "actor": "SIEM/SOC",
      "action": "Recebe telemetria.",
      "detail": "Eventos alimentam investigação, revisão e tuning de política.",
      "possibleFailure": "Logs incompletos impedem auditoria e resposta."
    }
  ],
  "deepDive": {
    "mentalModel": "Zero Trust é uma mudança de pergunta: de 'este tráfego veio de dentro?' para 'este sujeito, neste contexto, pode acessar este recurso, por este caminho, agora, com este nível de risco?'.",
    "keyTerms": [
      "Zero Trust",
      "ZTNA",
      "PDP",
      "PEP",
      "menor privilégio",
      "confiança implícita",
      "postura de dispositivo",
      "acesso por aplicação"
    ],
    "limitations": [
      "Não corrige inventário ruim sozinho.",
      "Não substitui IAM governado.",
      "Não elimina necessidade de segmentação e firewall.",
      "Pode aumentar complexidade operacional.",
      "Pode quebrar aplicações legadas se migrado sem mapeamento de fluxos."
    ],
    "whenToUse": [
      "Acesso remoto corporativo.",
      "Ambientes híbridos e cloud.",
      "Redução de movimento lateral.",
      "Proteção de aplicações administrativas.",
      "Acesso de terceiros e prestadores.",
      "Segmentação de ambientes críticos."
    ],
    "whenNotToUse": [
      "Como projeto sem inventário mínimo.",
      "Como justificativa para remover todos os controles de rede.",
      "Como ferramenta isolada sem IAM, logs e governança.",
      "Como big bang que bloqueia fluxos críticos sem faseamento."
    ],
    "operationalImpact": [
      "Exige mapeamento de aplicações e fluxos.",
      "Exige revisão de grupos, contas e exceções.",
      "Muda troubleshooting porque o bloqueio pode estar no PEP, no IdP, na postura ou na política.",
      "Exige comunicação entre rede, segurança, IAM, endpoint, cloud e aplicações."
    ],
    "financialImpact": [
      "Pode exigir soluções de ZTNA, IdP, MFA, EDR, MDM, SIEM, logs e automação.",
      "Pode aumentar custo de ingestão e retenção de logs.",
      "Pode reduzir custo de incidentes ao limitar movimento lateral.",
      "Pode reduzir dependência de VPN ampla, mas não necessariamente reduzir custo total."
    ],
    "securityImpact": [
      "Reduz confiança implícita.",
      "Diminui raio de impacto de credenciais comprometidas.",
      "Aumenta visibilidade e auditabilidade.",
      "Pode criar falsa segurança se políticas forem amplas ou logs incompletos."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que Zero Trust é comprar um produto.",
      "whyItHappens": "Muitos fornecedores usam Zero Trust como rótulo comercial.",
      "consequence": "A empresa implanta ferramenta sem mudar política, inventário ou governança.",
      "correction": "Tratar Zero Trust como arquitetura com identidade, contexto, menor privilégio, enforcement e telemetria."
    },
    {
      "mistake": "Trocar VPN ampla por ZTNA amplo.",
      "whyItHappens": "A equipe publica muitas aplicações ou redes sem revisar necessidade real.",
      "consequence": "O acesso continua excessivo, apenas por outro caminho.",
      "correction": "Mapear recursos e conceder acesso mínimo por aplicação, grupo e contexto."
    },
    {
      "mistake": "Basear política apenas em IP.",
      "whyItHappens": "Firewalls tradicionais trabalham naturalmente com origem, destino e porta.",
      "consequence": "Usuário e dispositivo ficam invisíveis na decisão.",
      "correction": "Integrar identidade, postura, logs de autenticação e política de aplicação."
    },
    {
      "mistake": "Implantar sem logs suficientes.",
      "whyItHappens": "O projeto foca em bloquear, mas não em auditar.",
      "consequence": "Não há evidência para investigação, revisão ou melhoria.",
      "correction": "Definir telemetria desde o desenho: decisão, sujeito, recurso, contexto e resultado."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuário autenticado não acessa aplicação.",
      "MFA é solicitado repetidamente.",
      "Dispositivo compliant é tratado como não confiável.",
      "Aplicação legada falha atrás de proxy/ZTNA.",
      "Acesso funciona fora do PEP mas falha pelo caminho controlado.",
      "Logs mostram allow, mas aplicação retorna erro de autorização."
    ],
    "diagnosticQuestions": [
      "Quem é o sujeito e qual grupo/atributo foi usado?",
      "Qual recurso exato foi solicitado?",
      "O dispositivo estava compliant no momento?",
      "Qual PEP aplicou a decisão?",
      "A política negou, exigiu step-up ou permitiu?",
      "Há logs no IdP, PEP, aplicação, firewall e SIEM com o mesmo horário?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "whoami /upn && dsregcmd /status",
        "purpose": "Ver identidade do usuário e estado de associação do dispositivo em ambientes Microsoft.",
        "expectedObservation": "Usuário e estado do dispositivo coerentes com política.",
        "interpretation": "Se o dispositivo não está associado ou compliant, a política pode negar acesso."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection app.interno.exemplo -Port 443",
        "purpose": "Testar conectividade até o endpoint de aplicação controlado.",
        "expectedObservation": "TcpTestSucceeded True quando rede permite o caminho.",
        "interpretation": "Falha indica problema de DNS, rota, proxy, firewall ou PEP."
      },
      {
        "platform": "Linux",
        "command": "curl -vk https://app.interno.exemplo",
        "purpose": "Observar resolução, TLS, proxy, redirect e erro HTTP.",
        "expectedObservation": "Handshake TLS e resposta HTTP coerentes.",
        "interpretation": "Erros TLS ou 403/401 ajudam a separar rede de autorização."
      },
      {
        "platform": "Linux",
        "command": "ip route && resolvectl status",
        "purpose": "Validar rota e DNS do cliente.",
        "expectedObservation": "Rota e DNS esperados para o caminho corporativo.",
        "interpretation": "Problemas básicos de rede podem ser confundidos com política Zero Trust."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists && show logging",
        "purpose": "Verificar se ACLs ou logs de equipamento participam do enforcement.",
        "expectedObservation": "Regras e denies/permits coerentes com o desenho.",
        "interpretation": "ACLs legadas podem conflitar com PEP moderno."
      }
    ],
    "decisionTree": [
      {
        "if": "Usuário não autentica",
        "then": "Investigar IdP, MFA, credencial, grupo e política de conditional access."
      },
      {
        "if": "Autentica, mas acesso é negado",
        "then": "Verificar autorização por aplicação, postura do dispositivo, risco e atributo do usuário."
      },
      {
        "if": "Permissão existe, mas conexão falha",
        "then": "Validar DNS, rota, proxy, firewall, PEP e TLS."
      },
      {
        "if": "Conexão funciona, mas aplicação nega",
        "then": "Separar problema de rede de autorização interna da aplicação."
      },
      {
        "if": "Logs estão ausentes",
        "then": "Corrigir telemetria antes de declarar que a política é efetiva."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Inventariar usuários, dispositivos, aplicações, fluxos e dados antes de criar política.",
      "Aplicar MFA e autenticação forte para acessos sensíveis.",
      "Usar menor privilégio por recurso, não por rede inteira.",
      "Registrar decisão de acesso, sujeito, recurso, contexto e resultado.",
      "Revisar exceções periodicamente.",
      "Combinar identidade com segmentação e logs."
    ],
    "badPractices": [
      "Chamar VPN com MFA de Zero Trust completo.",
      "Permitir rede inteira por grupo genérico.",
      "Usar contas compartilhadas.",
      "Deixar exceções sem dono e sem validade.",
      "Confiar apenas em IP interno.",
      "Ignorar dispositivos não gerenciados."
    ],
    "commonErrors": [
      "Confundir autenticação com autorização.",
      "Confundir subnet privada com acesso seguro.",
      "Implantar sem baseline de fluxos.",
      "Não envolver time de aplicação e suporte.",
      "Migrar todos os usuários de uma vez sem fase piloto."
    ],
    "vulnerabilities": [
      {
        "name": "Confiança implícita por rede interna",
        "description": "Usuário ou host interno recebe acesso amplo apenas por localização de rede.",
        "defensiveExplanation": "Uma credencial comprometida pode abusar de fluxos permitidos para descobrir e acessar recursos.",
        "mitigation": "Acesso por aplicação, segmentação, menor privilégio, MFA, PAM e telemetria."
      },
      {
        "name": "Bypass de PEP",
        "description": "Existe caminho alternativo para o recurso fora do ponto de enforcement.",
        "defensiveExplanation": "Política parece segura no portal, mas o serviço continua acessível diretamente por rede.",
        "mitigation": "Fechar caminhos diretos, usar firewall, private endpoint, DNS controlado e validação de exposição."
      },
      {
        "name": "Política baseada em grupo amplo",
        "description": "Grupos genéricos acumulam permissões além do necessário.",
        "defensiveExplanation": "Usuários mantêm acesso antigo por mudança de função ou exceção esquecida.",
        "mitigation": "Revisão de acesso, recertificação, grupos por função, JIT e expiração de exceções."
      }
    ],
    "monitoring": [
      "Logs do IdP e MFA.",
      "Logs do PEP/ZTNA/proxy.",
      "Firewall e flow logs.",
      "DNS logs.",
      "EDR/MDM posture logs.",
      "Logs da aplicação.",
      "Alertas de acesso fora de padrão."
    ],
    "hardening": [
      "Desabilitar acesso direto ao recurso quando PEP é obrigatório.",
      "Exigir TLS válido.",
      "Aplicar MFA adaptativo.",
      "Usar contas nominativas e PAM para administração.",
      "Separar ambientes por zona e sensibilidade.",
      "Registrar e revisar exceções."
    ],
    "detectionIdeas": [
      "Acesso a recurso sensível por dispositivo não gerenciado.",
      "Usuário acessando aplicação de zona incomum.",
      "Fluxos diretos ao servidor contornando proxy.",
      "Aumento de denies por política.",
      "Uso de grupo administrativo fora do horário.",
      "Mudança de regra de acesso sem ticket associado."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que estar dentro da rede não deveria ser suficiente para confiar em um acesso?",
      "hints": [
        "Pense em credenciais comprometidas.",
        "Pense em movimento lateral."
      ],
      "expectedIdeas": [
        "confiança implícita",
        "menor privilégio",
        "identidade",
        "contexto",
        "telemetria"
      ],
      "explanation": "A rede interna pode conter dispositivos comprometidos, contas abusadas e fluxos excessivos. A decisão precisa considerar contexto e recurso."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário autenticado não acessa uma aplicação via ZTNA. Quais camadas você verificaria?",
      "hints": [
        "Separe autenticação, autorização, postura, DNS, rede e aplicação.",
        "Procure logs no IdP e no PEP."
      ],
      "expectedIdeas": [
        "IdP",
        "MFA",
        "grupo",
        "postura",
        "PEP",
        "DNS",
        "TLS",
        "firewall",
        "logs da aplicação"
      ],
      "explanation": "Problemas Zero Trust podem estar em identidade, dispositivo, policy engine, enforcement, rede ou aplicação."
    },
    {
      "type": "cenário real",
      "question": "Como migrar uma VPN ampla para Zero Trust sem quebrar a empresa?",
      "hints": [
        "Comece por inventário.",
        "Use piloto e modo monitor."
      ],
      "expectedIdeas": [
        "mapear fluxos",
        "piloto",
        "logs",
        "ZTNA por aplicação",
        "rollback",
        "comunicação",
        "exceções temporárias"
      ],
      "explanation": "Migração segura é incremental e baseada em evidências, não em bloqueio repentino."
    }
  ],
  "quiz": [
    {
      "id": "q13.8.1",
      "type": "conceito",
      "q": "Qual afirmação representa melhor Zero Trust?",
      "opts": [
        "Uma estratégia que evita confiança implícita e verifica acessos com contexto e menor privilégio.",
        "Um produto específico que substitui todos os firewalls.",
        "Uma VPN com MFA.",
        "Uma VLAN privada para servidores."
      ],
      "a": 0,
      "exp": "Zero Trust é estratégia/arquitetura, não ferramenta única.",
      "difficulty": "intermediário",
      "topic": "zero trust"
    },
    {
      "id": "q13.8.2",
      "type": "arquitetura",
      "q": "Qual componente aplica tecnicamente uma decisão de política?",
      "opts": [
        "PEP",
        "Glossário",
        "Broadcast",
        "MTU"
      ],
      "a": 0,
      "exp": "PEP é o Policy Enforcement Point, o ponto que aplica permitir/negar/limitar.",
      "difficulty": "intermediário",
      "topic": "pep"
    },
    {
      "id": "q13.8.3",
      "type": "segurança",
      "q": "Qual é um risco de implantar ZTNA sem bloquear caminho direto ao servidor?",
      "opts": [
        "Bypass do ponto de enforcement.",
        "Aumento automático de SNR.",
        "Redução de TTL DNS.",
        "Transformar TCP em UDP."
      ],
      "a": 0,
      "exp": "Se o servidor continua acessível diretamente, o usuário pode contornar o controle.",
      "difficulty": "intermediário",
      "topic": "bypass"
    },
    {
      "id": "q13.8.4",
      "type": "diagnóstico",
      "q": "Usuário autentica no IdP, mas recebe acesso negado. O que investigar primeiro?",
      "opts": [
        "Autorização, grupo, postura do dispositivo e política aplicada.",
        "Trocar todos os switches.",
        "Desativar SIEM.",
        "Aumentar largura do canal Wi-Fi."
      ],
      "a": 0,
      "exp": "Autenticação bem-sucedida não garante autorização. Contexto e política podem negar.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q13.8.5",
      "type": "cloud",
      "q": "Por que subnet privada em cloud não equivale automaticamente a Zero Trust?",
      "opts": [
        "Porque privacidade de rota não define identidade, contexto, política por recurso e telemetria completa.",
        "Porque subnet privada sempre é pública.",
        "Porque Zero Trust só existe em datacenter físico.",
        "Porque security group não tem relação com rede."
      ],
      "a": 0,
      "exp": "Subnet privada reduz exposição pública, mas não substitui política contextual e menor privilégio.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q13.8.6",
      "type": "devsecops",
      "q": "Qual prática DevSecOps combina melhor com Zero Trust?",
      "opts": [
        "Políticas de acesso versionadas e revisadas como código.",
        "Senha de produção compartilhada no runner.",
        "Liberar rede inteira para o pipeline.",
        "Desativar logs para reduzir ruído."
      ],
      "a": 0,
      "exp": "Policy as code torna acessos auditáveis, revisáveis e automatizáveis.",
      "difficulty": "intermediário",
      "topic": "policy as code"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.8.1",
      "front": "O que é confiança implícita?",
      "back": "É assumir que um acesso é confiável por localização, rede ou condição ampla, sem validação contextual suficiente.",
      "tags": [
        "zero trust"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.8.2",
      "front": "O que é PEP?",
      "back": "Policy Enforcement Point: o ponto que aplica uma decisão de política, como proxy, firewall, gateway ou agente.",
      "tags": [
        "pep",
        "arquitetura"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.8.3",
      "front": "O que é PDP?",
      "back": "Policy Decision Point: componente lógico que toma decisão de permitir, negar ou condicionar acesso com base em política e sinais.",
      "tags": [
        "pdp"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.8.4",
      "front": "Zero Trust substitui segmentação?",
      "back": "Não. Zero Trust usa e complementa segmentação, identidade, menor privilégio e telemetria.",
      "tags": [
        "segmentação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.8.5",
      "front": "Qual é a pergunta central do Zero Trust?",
      "back": "Este sujeito, neste contexto, pode acessar este recurso específico, por este caminho, agora?",
      "tags": [
        "modelo mental"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.8.6",
      "front": "Por que logs são essenciais em Zero Trust?",
      "back": "Eles provam decisão, contexto, resultado e permitem auditoria, investigação e revisão de políticas.",
      "tags": [
        "logs",
        "siem"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex13.8.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre autenticação e autorização em Zero Trust.",
      "expectedAnswer": "Autenticação verifica quem é o sujeito; autorização decide se aquele sujeito, naquele contexto, pode acessar um recurso específico.",
      "explanation": "Um usuário autenticado ainda pode ser negado por grupo, risco, dispositivo, horário ou política."
    },
    {
      "id": "ex13.8.2",
      "type": "arquitetura",
      "prompt": "Transforme a regra 'VPN pode acessar rede de servidores' em uma política mais próxima de Zero Trust.",
      "expectedAnswer": "Permitir que grupo específico acesse aplicação específica via PEP, com MFA, dispositivo compliant, sessão limitada, logs e bloqueio de acesso direto ao servidor.",
      "explanation": "O destino deve ser recurso ou aplicação, não rede inteira."
    },
    {
      "id": "ex13.8.3",
      "type": "cloud",
      "prompt": "Liste três evidências necessárias para auditar um acesso Zero Trust a uma API em cloud.",
      "expectedAnswer": "Identidade do sujeito/workload, decisão de política no PEP/API gateway, flow/audit logs com recurso, horário, origem, resultado e volume.",
      "explanation": "A auditoria precisa conectar identidade, rede, aplicação e resultado."
    },
    {
      "id": "ex13.8.4",
      "type": "diagnóstico",
      "prompt": "Um acesso falha depois que a política de postura de dispositivo foi ativada. Que fontes você verificaria?",
      "expectedAnswer": "MDM/EDR, IdP, PEP/ZTNA, logs de conditional access, certificado do dispositivo, grupo do usuário e logs da aplicação.",
      "explanation": "A falha pode estar em compliance, sinal atrasado, grupo, política ou aplicação."
    }
  ],
  "challenge": {
    "title": "Migrar acesso VPN amplo para acesso Zero Trust por aplicação",
    "scenario": "Uma empresa permite que equipe de suporte acesse várias sub-redes via VPN. Após auditoria, foi identificado que 80% dos acessos necessários são a três aplicações administrativas e um cofre de senhas.",
    "tasks": [
      "Mapear sujeitos, recursos e contexto.",
      "Definir PEP e bloquear caminhos diretos.",
      "Criar políticas de menor privilégio.",
      "Definir logs e alertas.",
      "Planejar migração por fases com rollback."
    ],
    "constraints": [
      "Não quebrar atendimento crítico.",
      "Manter evidências para auditoria.",
      "Permitir exceções temporárias com dono e prazo.",
      "Reduzir acesso lateral a servidores."
    ],
    "expectedDeliverables": [
      "Tabela de políticas.",
      "Diagrama de acesso.",
      "Plano de logs.",
      "Plano de piloto e rollback.",
      "Lista de riscos residuais."
    ],
    "gradingRubric": [
      {
        "criterion": "Menor privilégio",
        "points": 25,
        "description": "Políticas apontam recursos específicos e contexto."
      },
      {
        "criterion": "Enforcement",
        "points": 20,
        "description": "PEP definido e caminho direto bloqueado."
      },
      {
        "criterion": "Telemetria",
        "points": 20,
        "description": "Logs permitem auditoria e investigação."
      },
      {
        "criterion": "Operação",
        "points": 20,
        "description": "Plano de migração, piloto e rollback realista."
      },
      {
        "criterion": "Risco residual",
        "points": 15,
        "description": "Limitações e exceções documentadas."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa pelo inventário de fluxos reais. Depois troca acesso por rede por acesso por aplicação. O PEP aplica política contextual, e a rede deve impedir caminhos diretos. Logs provam a decisão e permitem revisão.",
    "steps": [
      "Listar usuários, grupos e aplicações necessárias.",
      "Remover sub-redes como unidade principal de autorização.",
      "Publicar aplicações via PEP/ZTNA ou proxy controlado.",
      "Exigir MFA, dispositivo compliant e sessão limitada.",
      "Bloquear acesso direto por firewall/security group.",
      "Enviar logs de IdP, PEP, firewall e aplicação para SIEM.",
      "Rodar piloto com grupo pequeno e rollback definido.",
      "Expirar exceções temporárias."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Manter VPN ampla e apenas exigir MFA.",
        "whyItIsWrong": "MFA melhora autenticação, mas não resolve alcance excessivo nem movimento lateral."
      },
      {
        "answer": "Comprar ZTNA e liberar todas as aplicações para todos.",
        "whyItIsWrong": "Troca o caminho, mas mantém privilégio excessivo."
      },
      {
        "answer": "Bloquear tudo imediatamente.",
        "whyItIsWrong": "Pode quebrar operação e gerar exceções emergenciais piores."
      }
    ],
    "finalAnswer": "Uma resposta madura usa acesso por aplicação, identidade forte, dispositivo confiável, política contextual, PEP obrigatório, logs integrados, revisão de exceções e migração incremental. O objetivo é reduzir alcance sem impedir o trabalho legítimo."
  },
  "glossary": [
    {
      "term": "Zero Trust",
      "shortDefinition": "Estratégia que evita confiança implícita e verifica acessos com contexto.",
      "longDefinition": "Modelo de segurança em que cada acesso a recurso deve ser explicitamente avaliado, limitado e monitorado, independentemente da localização de rede.",
      "example": "Usuário remoto acessa apenas uma aplicação via PEP, com MFA e dispositivo compliant.",
      "relatedTerms": [
        "ZTNA",
        "menor privilégio",
        "PDP",
        "PEP"
      ],
      "relatedLessons": [
        "13.1",
        "13.2",
        "13.8"
      ]
    },
    {
      "term": "ZTNA",
      "shortDefinition": "Acesso de rede Zero Trust por aplicação ou recurso.",
      "longDefinition": "Modelo de acesso que substitui alcance amplo de rede por acesso mediado, contextual e específico a recursos.",
      "example": "Prestador acessa apenas o portal autorizado, não a subnet inteira.",
      "relatedTerms": [
        "VPN",
        "PEP",
        "proxy"
      ],
      "relatedLessons": [
        "10.x",
        "13.8"
      ]
    },
    {
      "term": "PEP",
      "shortDefinition": "Ponto de enforcement de política.",
      "longDefinition": "Componente que aplica decisão de acesso, como permitir, negar, exigir MFA adicional ou limitar sessão.",
      "example": "Gateway ZTNA bloqueia acesso se dispositivo não estiver compliant.",
      "relatedTerms": [
        "PDP",
        "policy engine"
      ],
      "relatedLessons": [
        "13.8"
      ]
    },
    {
      "term": "PDP",
      "shortDefinition": "Ponto lógico de decisão de política.",
      "longDefinition": "Componente ou função que avalia sinais e políticas para decidir se um acesso será permitido.",
      "example": "Conditional access avalia usuário, dispositivo, risco e aplicação.",
      "relatedTerms": [
        "PEP",
        "contexto"
      ],
      "relatedLessons": [
        "13.8"
      ]
    },
    {
      "term": "Menor privilégio",
      "shortDefinition": "Conceder apenas o acesso necessário.",
      "longDefinition": "Princípio em que usuários, serviços e workloads recebem somente permissões indispensáveis, pelo menor tempo e escopo possível.",
      "example": "Pipeline pode fazer deploy em uma aplicação, mas não acessar todos os bancos.",
      "relatedTerms": [
        "PAM",
        "JIT",
        "IAM"
      ],
      "relatedLessons": [
        "13.2",
        "13.8"
      ]
    },
    {
      "term": "Postura de dispositivo",
      "shortDefinition": "Estado de segurança usado para decisão de acesso.",
      "longDefinition": "Sinais como EDR ativo, criptografia, patch, certificado, compliance e gerenciamento do endpoint.",
      "example": "Acesso é negado se o notebook não está criptografado ou sem EDR.",
      "relatedTerms": [
        "MDM",
        "EDR",
        "conditional access"
      ],
      "relatedLessons": [
        "13.8"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Zero Trust Architecture - NIST SP 800-207",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
      "note": "Referência principal para arquitetura Zero Trust, PDP/PEP e mudança de perímetro estático para foco em recursos."
    },
    {
      "type": "official-doc",
      "title": "Zero Trust Maturity Model Version 2.0",
      "organization": "CISA",
      "url": "https://www.cisa.gov/zero-trust-maturity-model",
      "note": "Modelo de maturidade com pilares de identidade, dispositivos, redes/ambientes, aplicações/workloads e dados."
    },
    {
      "type": "official-doc",
      "title": "What is Zero Trust?",
      "organization": "Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/security/zero-trust/zero-trust-overview",
      "note": "Referência operacional moderna que reforça Zero Trust como estratégia, não produto."
    },
    {
      "type": "official-doc",
      "title": "Secure networks with SASE, Zero Trust, and AI",
      "organization": "Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/security/zero-trust/deploy/networks",
      "note": "Referência atual sobre pilar de rede em Zero Trust: comunicação segura, segmentação e menor privilégio."
    },
    {
      "type": "official-doc",
      "title": "The NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Base para relacionar governança, identificação, proteção, detecção, resposta e recuperação."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m10",
      "lesson": "10.x",
      "reason": "VPN e acesso remoto são comparados com acesso por aplicação e ZTNA."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação é parte essencial para reduzir confiança implícita e movimento lateral."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM e logs são necessários para auditar decisões Zero Trust."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "mXX",
      "lesson": "policy-as-code",
      "reason": "Políticas como código ajudam a governar acessos de forma revisável e automatizada."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "mXX",
      "lesson": "mfa-e-conditional-access",
      "reason": "Zero Trust depende de identidade, MFA, atributos, grupos e contexto."
    }
  ],
  "pedagogicalMap": {
    "problem": "Redes tradicionais confiam demais em localização e perímetro.",
    "concept": "Zero Trust remove confiança implícita e exige verificação contextual por recurso.",
    "internalMechanism": "Sujeito solicita recurso; PDP avalia contexto; PEP aplica decisão; telemetria alimenta revisão.",
    "realUse": "VPN moderna, ZTNA, cloud, acesso de terceiros, administração segura e pipelines.",
    "commonMistake": "Comprar ferramenta e chamar de Zero Trust sem inventário, política e logs.",
    "securityImpact": "Reduz movimento lateral e abuso de credenciais, mas exige governança madura.",
    "operationalImpact": "Muda troubleshooting e exige cooperação entre rede, IAM, endpoint, SOC e aplicações.",
    "summary": "Zero Trust aplicado à rede transforma acesso amplo em acesso específico, contextual, limitado e auditável."
  },
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
      "13.9"
    ]
  }
};
