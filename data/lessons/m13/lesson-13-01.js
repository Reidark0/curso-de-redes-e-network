export const lesson1301 = {
  "id": "13.1",
  "moduleId": "m13",
  "order": 1,
  "title": "Fundamentos de Segurança de Redes e Defesa em Profundidade",
  "subtitle": "Como transformar a rede de um caminho cego de conectividade em uma arquitetura com camadas de proteção, detecção, resposta e recuperação.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 300,
  "tags": [
    "redes",
    "segurança",
    "defesa-em-profundidade",
    "zero-trust",
    "segmentação",
    "firewall",
    "ids",
    "siem",
    "soc",
    "blue-team"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Segurança de rede depende de entender switches, MAC, ARP, VLANs e tráfego local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.x",
      "reason": "É necessário entender IPv4, sub-redes, gateway e endereçamento para avaliar exposição e segmentação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.x",
      "reason": "Portas TCP/UDP e estados de conexão são essenciais para firewall, IDS e análise de tráfego."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewalls, ACLs, WAF e políticas de tráfego são controles centrais de defesa de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.10",
      "reason": "O Wi‑Fi corporativo é uma das bordas de acesso que precisa entrar na arquitetura defensiva maior."
    }
  ],
  "objectives": [
    "Explicar por que segurança de redes existe e por que conectividade sem controle vira risco.",
    "Diferenciar prevenção, detecção, resposta e recuperação no contexto de redes.",
    "Entender defesa em profundidade como camadas sobrepostas, e não como compra de várias ferramentas.",
    "Relacionar segmentação, firewall, IDS/IPS, NDR, SIEM, logs e Zero Trust.",
    "Criar um modelo inicial de zonas, fluxos permitidos, evidências e respostas a incidente.",
    "Evitar erros comuns como rede plana, any-any, logs ausentes e confiança cega na rede interna."
  ],
  "learningOutcomes": [
    "Dado um desenho de rede, o aluno consegue identificar onde faltam controles defensivos.",
    "Dado um fluxo entre usuário e servidor, o aluno consegue apontar pontos de política, registro e detecção.",
    "Dado um incidente lateral, o aluno consegue explicar por que segmentação e telemetria reduzem impacto.",
    "Dado um requisito de Zero Trust, o aluno consegue diferenciá-lo de apenas instalar uma VPN ou um firewall.",
    "Dado um ambiente corporativo, o aluno consegue propor uma primeira matriz de zonas e evidências."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine uma empresa em que todos os notebooks, servidores, impressoras, câmeras, sistemas financeiros, ambiente de desenvolvimento, rede Wi‑Fi corporativa, rede de visitantes e consoles administrativos conseguem se enxergar livremente. Tudo funciona. Os usuários acessam sistemas, os servidores respondem, os dispositivos recebem IP e ninguém reclama de bloqueio. Esse é justamente o problema: uma rede pode estar funcional e, ao mesmo tempo, ser insegura.</p>\n  <p>Segurança de redes existe porque a rede é o caminho pelo qual quase tudo acontece: login, acesso a banco de dados, atualização de sistemas, cópia de arquivos, administração remota, integração entre aplicações, acesso à cloud, backup, telemetria e também movimentação lateral durante incidentes. Se a rede só entrega pacotes sem política, sem segmentação e sem registro, ela se torna uma avenida interna para falhas humanas, malware, credenciais vazadas e configurações ruins.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário sofre phishing, executa um malware simples e o endpoint é comprometido. O dano real não depende apenas do malware; depende do que aquele endpoint consegue alcançar pela rede. Se ele enxerga servidores internos, bancos, compartilhamentos, consoles e APIs administrativas, a rede ampliou o incidente.</div>\n  <p>Nesta aula, você vai aprender a pensar como arquiteto defensivo: não basta perguntar “a porta está aberta?”. É preciso perguntar quem precisa desse fluxo, por qual motivo, com qual autenticação, passando por qual controle, gerando qual log, alertando quem, e como reduzir o impacto se algo falhar.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No começo das redes corporativas modernas, a maior preocupação era conectar: computadores a servidores, filiais ao datacenter, usuários à internet. A ideia de perímetro era relativamente simples: havia uma rede interna considerada confiável e uma rede externa considerada não confiável. O firewall ficava na borda e a defesa era concentrada na entrada e saída.</p>\n  <p>Esse modelo funcionou por um tempo, mas começou a quebrar com notebooks, Wi‑Fi, VPN, terceirizados, cloud, SaaS, APIs, dispositivos móveis, IoT, ambientes híbridos e DevOps. A “rede interna” deixou de ser um espaço homogêneo e totalmente confiável. Um dispositivo interno pode estar comprometido; uma credencial legítima pode ser usada de forma indevida; um serviço interno pode estar exposto demais; uma aplicação pode se comunicar lateralmente com mais sistemas do que deveria.</p>\n  <p>A evolução natural foi sair da defesa baseada em um único perímetro e caminhar para defesa em profundidade: camadas sobrepostas de controle, validação, segmentação, monitoramento, detecção, resposta e recuperação. O Zero Trust amadureceu essa discussão ao reforçar que confiança não deve ser concedida apenas porque o tráfego veio de dentro da rede. A rede continua importante, mas não é mais uma prova suficiente de identidade, autorização ou segurança.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que redes são projetadas para transportar tráfego. Segurança exige decidir qual tráfego deve existir, qual deve ser negado, qual deve ser registrado, qual deve gerar alerta e qual deve exigir controles adicionais. Quando essas decisões não são explícitas, o padrão operacional vira permissividade.</p>\n  <ul>\n    <li><strong>Sem segmentação:</strong> um incidente em uma estação pode alcançar muitos servidores.</li>\n    <li><strong>Sem política clara:</strong> regras de firewall viram exceções acumuladas e ninguém sabe o motivo de cada liberação.</li>\n    <li><strong>Sem logs:</strong> não há como reconstruir o que aconteceu após um incidente.</li>\n    <li><strong>Sem detecção:</strong> tráfego anormal passa como se fosse operação normal.</li>\n    <li><strong>Sem resposta:</strong> a equipe vê o problema, mas não sabe isolar, conter ou restaurar com segurança.</li>\n    <li><strong>Sem governança:</strong> controles existem, mas não são revisados, testados ou mantidos.</li>\n  </ul>\n  <p>Defesa em profundidade resolve parte desse problema ao distribuir controles. Porém, ela não resolve tudo sozinha. Se as camadas não conversam, se os logs não são úteis, se a equipe não entende os fluxos, ou se tudo é liberado por exceção, várias ferramentas podem gerar apenas complexidade e custo.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A segurança de redes evoluiu de bloqueio simples na borda para uma arquitetura distribuída de controles. A tabela mostra essa mudança.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Evolução</th></tr></thead>\n    <tbody>\n      <tr><td>Perímetro único</td><td>Firewall separava rede interna da internet.</td><td>Assumia confiança excessiva dentro da rede.</td><td>Segmentação interna e controle leste-oeste.</td></tr>\n      <tr><td>Rede plana</td><td>Todos os ativos compartilhavam poucos segmentos.</td><td>Facilitava movimento lateral e dificultava investigação.</td><td>Zonas, VLANs, VRFs, ACLs e firewalls internos.</td></tr>\n      <tr><td>Prevenção isolada</td><td>Foco em bloquear portas e tráfego conhecido.</td><td>Falhas, credenciais válidas e tráfego permitido ainda podiam ser abusados.</td><td>Detecção, telemetria, NDR, SIEM e resposta.</td></tr>\n      <tr><td>Confiança por localização</td><td>Estar “dentro” bastava para acessar recursos.</td><td>VPN, Wi‑Fi e cloud tornaram a localização pouco confiável.</td><td>Zero Trust: identidade, contexto, menor privilégio e verificação contínua.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Segurança de redes é a disciplina que protege a comunicação entre sistemas por meio de arquitetura, controles técnicos, políticas, monitoramento, detecção e resposta. Ela não se limita a firewall. Firewall é apenas um dos controles possíveis.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> defesa em profundidade é uma estratégia em que múltiplos controles independentes e complementares reduzem a chance de falha catastrófica. Se um controle falha, outro controle deve limitar, detectar, atrasar ou conter o impacto.</div>\n  <p>Na prática, uma arquitetura defensiva de rede combina zonas, segmentação, firewall, autenticação, autorização, criptografia, hardening, IDS/IPS, NDR, logs, SIEM, playbooks, backup, resposta a incidente e revisão contínua. O objetivo não é criar uma rede impossível de usar, mas uma rede onde acessos necessários são permitidos de forma explícita, justificável, monitorável e revogável.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, defesa de rede é um processo de decisão sobre fluxos. Um fluxo não deve ser avaliado apenas por IP e porta. Ele deve ser entendido dentro de um contexto: origem, destino, identidade, aplicação, zona, sensibilidade do ativo, horário, comportamento esperado, regra aplicada e evidência gerada.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Inventariar ativos:</strong> identificar usuários, dispositivos, servidores, aplicações, sub-redes, serviços, APIs e caminhos críticos.</li>\n    <li><strong>Classificar zonas:</strong> separar estações, servidores, administração, DMZ, cloud, guest, IoT, desenvolvimento e produção.</li>\n    <li><strong>Mapear fluxos necessários:</strong> registrar quem fala com quem, usando qual protocolo, porta, direção e justificativa.</li>\n    <li><strong>Aplicar controles:</strong> firewall, ACL, microsegmentação, autenticação, proxy, WAF, VPN, NAC ou política cloud.</li>\n    <li><strong>Gerar evidências:</strong> logs de allow/deny, DNS, proxy, autenticação, NetFlow, IDS/IPS, EDR, NDR e SIEM.</li>\n    <li><strong>Detectar anomalias:</strong> observar varredura, conexões laterais incomuns, tentativas negadas, volume anormal e destinos raros.</li>\n    <li><strong>Responder:</strong> conter origem, bloquear fluxo, isolar segmento, revogar credenciais, coletar evidências e documentar RCA.</li>\n  </ol>\n  <p>Esse mecanismo se repete em LAN, Wi‑Fi, datacenter, cloud, Kubernetes, VPN e conexões híbridas. O detalhe técnico muda, mas a pergunta permanece: este fluxo deveria existir?</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura de segurança de redes começa por zonas. Zona é um agrupamento de ativos com nível semelhante de confiança, exposição ou função. A zona de usuários não deve ter o mesmo tratamento da zona de servidores críticos. A rede guest não deve acessar sistemas internos. A rede de IoT não deve ter liberdade lateral. A administração deve passar por controles mais fortes.</p>\n  <ul>\n    <li><strong>Camadas envolvidas:</strong> camada 2, camada 3, camada 4, camada 7, identidade, telemetria e operação.</li>\n    <li><strong>Componentes:</strong> switches, roteadores, firewalls, proxies, WAF, IDS/IPS, NDR, SIEM, NAC, VPN, DNS, DHCP e cloud security groups.</li>\n    <li><strong>Pontos de falha:</strong> regra any-any, rota ampla demais, VLAN trunk permissivo, logs desligados, exceções sem dono e ativos não inventariados.</li>\n    <li><strong>Dependências:</strong> endereçamento, DNS, roteamento, autenticação, IAM, certificados, observabilidade e processo de mudança.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma empresa física. A recepção não leva qualquer visitante direto ao cofre. Existem catracas, crachás, portas por setor, câmeras, registros de entrada, escolta, salas restritas e procedimentos de emergência. Segurança de redes faz algo parecido no mundo lógico: não basta estar dentro do prédio; cada área tem permissões, registros e limites.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> na rede, os caminhos são invisíveis, rápidos e automatizados. Um único host pode tentar falar com centenas de destinos em segundos. Por isso, controles manuais não bastam; é necessário política técnica, telemetria e automação.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma rede pequena, você pode separar três grupos: notebook pessoal, servidor de laboratório e dispositivos IoT. Sem defesa, todos ficam no mesmo segmento. Com defesa básica, o notebook acessa o servidor apenas nas portas necessárias, IoT acessa somente internet ou um serviço específico, e o roteador/firewall registra tentativas bloqueadas.</p>\n  <p>Mesmo em casa, o princípio já aparece: rede principal, rede de visitantes, senhas diferentes, atualizações, isolamento de dispositivos e logs básicos. O importante é perceber que segurança de rede começa pela pergunta “quem precisa falar com quem?”.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, a arquitetura pode ter zona de usuários, zona de servidores, zona de administração, DMZ, rede de backup, rede de segurança, rede Wi‑Fi corporativa, rede guest, rede IoT e conexão com cloud. O tráfego norte-sul passa entre usuários e internet ou datacenter; o tráfego leste-oeste passa entre sistemas internos.</p>\n  <p>O erro clássico é proteger apenas a borda com a internet e esquecer o tráfego interno. Um malware em uma estação pode tentar acessar SMB, RDP, WinRM, SSH, bancos de dados e APIs internas. Se a rede interna for plana, a defesa dependerá demais do endpoint. Se houver segmentação, logs e alertas, o incidente encontra barreiras e gera evidências.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, segurança de redes aparece em VPC/VNet, subnets, route tables, security groups, NSG, NACL, cloud firewalls, private endpoints, NAT gateways, load balancers, DNS privado, flow logs e integração híbrida. A lógica é a mesma: separar zonas, permitir fluxos mínimos, registrar evidências e reduzir exposição.</p>\n  <p>Cloud adiciona dois riscos importantes: velocidade e custo. Uma regra ampla pode expor um serviço rapidamente. Logs, firewalls gerenciados, NAT e tráfego entre zonas podem gerar custo recorrente. Por isso, segurança de rede em cloud precisa nascer junto com IaC, revisão de código, política como código e tagging de dono/custo.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, segurança de rede vira código e evidência. Regras de security group, firewall, Kubernetes NetworkPolicy, ingress, egress, DNS privado e private endpoints podem ser revisadas em pull request. Pipelines podem bloquear mudanças que criam exposição ampla, como liberar origem <code>0.0.0.0/0</code> para portas administrativas.</p>\n  <p>O pipeline também deve publicar evidências: qual regra mudou, quem aprovou, qual ticket justificou, qual ambiente foi afetado, quais testes foram executados e como reverter. Isso conecta redes, segurança e engenharia de plataformas.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista do SOC, uma boa rede defensiva não é apenas bloqueadora; ela é observável. Ela mostra tentativas negadas, conexões incomuns, picos de tráfego, comunicação com destinos raros, varreduras internas, falhas de autenticação, mudanças de regra e fluxos entre zonas sensíveis.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Estações alcançam servidores sem mediação.</td><td>Movimento lateral amplo.</td><td>Segmentação, firewall interno, ACLs e logs.</td></tr>\n      <tr><td>Regra any-any</td><td>Liberação genérica entre zonas.</td><td>Perda de menor privilégio.</td><td>Regras específicas, dono, prazo e revisão.</td></tr>\n      <tr><td>Logs ausentes</td><td>Incidente sem linha do tempo.</td><td>RCA fraco e contenção lenta.</td><td>Flow logs, firewall logs, DNS logs, SIEM e retenção.</td></tr>\n      <tr><td>Confiança por localização</td><td>Usuário interno acessa sistemas sem contexto.</td><td>Credenciais vazadas geram acesso amplo.</td><td>Zero Trust, IAM, MFA, postura de dispositivo e autorização contínua.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1200 620\" role=\"img\" aria-labelledby=\"svg-1301-title svg-1301-desc\">\n    <title id=\"svg-1301-title\">Defesa em profundidade aplicada à rede</title>\n    <desc id=\"svg-1301-desc\">Diagrama mostrando usuário, Wi-Fi, firewall, zonas internas, servidores, cloud, IDS/NDR, SIEM e resposta do SOC.</desc>\n    <defs>\n      <marker id=\"arrow-1301\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"80\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"115\" y=\"118\" text-anchor=\"middle\" class=\"svg-label\">Usuário</text>\n    <text x=\"115\" y=\"144\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Endpoint</text>\n    <rect x=\"35\" y=\"250\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"115\" y=\"288\" text-anchor=\"middle\" class=\"svg-label\">Wi‑Fi/Guest</text>\n    <text x=\"115\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Borda de acesso</text>\n    <rect x=\"285\" y=\"165\" width=\"180\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"375\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">Controle</text>\n    <text x=\"375\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Firewall / NAC</text>\n    <rect x=\"555\" y=\"45\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-zone svg-boundary\" />\n    <text x=\"650\" y=\"83\" text-anchor=\"middle\" class=\"svg-label\">Zona Usuários</text>\n    <text x=\"650\" y=\"110\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mínimo necessário</text>\n    <rect x=\"555\" y=\"185\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-zone svg-boundary\" />\n    <text x=\"650\" y=\"223\" text-anchor=\"middle\" class=\"svg-label\">Zona Servidores</text>\n    <text x=\"650\" y=\"250\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">serviços internos</text>\n    <rect x=\"555\" y=\"325\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-zone svg-boundary\" />\n    <text x=\"650\" y=\"363\" text-anchor=\"middle\" class=\"svg-label\">Zona Admin</text>\n    <text x=\"650\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">acesso restrito</text>\n    <rect x=\"820\" y=\"105\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"900\" y=\"142\" text-anchor=\"middle\" class=\"svg-label\">IDS/NDR</text>\n    <text x=\"900\" y=\"168\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">detecção</text>\n    <rect x=\"820\" y=\"265\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"900\" y=\"302\" text-anchor=\"middle\" class=\"svg-label\">Cloud</text>\n    <text x=\"900\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VPC/VNet</text>\n    <rect x=\"1035\" y=\"165\" width=\"140\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"1105\" y=\"204\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n    <text x=\"1105\" y=\"231\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">correlação</text>\n    <rect x=\"1035\" y=\"365\" width=\"140\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"1105\" y=\"402\" text-anchor=\"middle\" class=\"svg-label\">SOC</text>\n    <text x=\"1105\" y=\"428\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">resposta</text>\n    <line x1=\"195\" y1=\"125\" x2=\"285\" y2=\"200\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"195\" y1=\"295\" x2=\"285\" y2=\"235\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"465\" y1=\"210\" x2=\"555\" y2=\"90\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"465\" y1=\"220\" x2=\"555\" y2=\"230\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"465\" y1=\"235\" x2=\"555\" y2=\"370\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"745\" y1=\"220\" x2=\"820\" y2=\"150\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"745\" y1=\"250\" x2=\"820\" y2=\"310\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"980\" y1=\"150\" x2=\"1035\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <line x1=\"1105\" y1=\"270\" x2=\"1105\" y2=\"365\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1301)\" />\n    <rect x=\"250\" y=\"510\" width=\"700\" height=\"75\" rx=\"16\" class=\"svg-zone svg-boundary\" />\n    <text x=\"600\" y=\"542\" text-anchor=\"middle\" class=\"svg-label\">Defesa em profundidade</text>\n    <text x=\"600\" y=\"568\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">prevenir • limitar • detectar • responder • recuperar • aprender</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios exigem que você produza respostas, não apenas reconheça alternativas. Você vai classificar zonas, identificar controles, propor logs e corrigir decisões inseguras.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma rede corporativa que cresceu rápido e virou uma rede plana. Seu trabalho é propor a primeira versão de uma arquitetura de defesa em profundidade sem paralisar o negócio.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como sair de uma rede plana para um desenho defensivo por etapas: inventário, zonas, fluxos, controles, logs, resposta e revisão. O foco é raciocínio arquitetural, não decorar nomes de ferramentas.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> segurança de redes é controlar, observar e responder aos fluxos, não apenas permitir conectividade.</li>\n    <li><strong>O que lembrar:</strong> defesa em profundidade combina prevenção, limitação, detecção, resposta e recuperação.</li>\n    <li><strong>Erro comum:</strong> confiar na rede interna como se ela fosse automaticamente segura.</li>\n    <li><strong>Uso real:</strong> zonas, firewalls, logs, SIEM e playbooks reduzem movimento lateral e melhoram investigação.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você vai aprofundar segmentação, zonas de segurança e redução de movimento lateral. A defesa em profundidade estudada aqui precisa de uma base concreta: separar redes por função, confiança, exposição e criticidade.</p>\n</section>\n"
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
      "Ethernet",
      "ARP",
      "IPv4",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS",
      "RADIUS",
      "Syslog",
      "NetFlow/IPFIX"
    ],
    "dependsOn": [
      "VLANs",
      "sub-redes",
      "roteamento",
      "firewall",
      "DNS",
      "DHCP",
      "logs"
    ],
    "enables": [
      "segmentação",
      "Zero Trust",
      "SOC",
      "Blue Team",
      "resposta a incidente",
      "Cloud Networking seguro"
    ]
  },
  "protocolFields": [
    {
      "field": "Origem/Destino IP",
      "size": "32 bits no IPv4",
      "purpose": "Identificar endpoints lógicos de um fluxo.",
      "securityObservation": "Não prova identidade do usuário; deve ser combinado com logs e contexto."
    },
    {
      "field": "Porta TCP/UDP",
      "size": "16 bits",
      "purpose": "Indicar serviço ou aplicação esperada.",
      "securityObservation": "Porta aberta não significa autorização; aplicações podem usar portas não convencionais."
    },
    {
      "field": "Ação da política",
      "size": "lógica de controle",
      "purpose": "Permitir, negar, registrar, alertar ou inspecionar.",
      "securityObservation": "Regras sem log dificultam investigação e RCA."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Inicia conexão com servidor",
      "detail": "Origem, destino, porta e protocolo compõem o fluxo inicial.",
      "possibleFailure": "Origem não autorizada ou destino sensível acessível demais."
    },
    {
      "step": 2,
      "actor": "Firewall/ACL",
      "action": "Avalia política",
      "detail": "Regra compara zona, IP, porta, estado e às vezes aplicação/identidade.",
      "possibleFailure": "Regra genérica any-any permite tráfego indevido."
    },
    {
      "step": 3,
      "actor": "Sensor/Logs",
      "action": "Registra ou detecta",
      "detail": "Flow logs, firewall logs, DNS logs e NDR geram evidências.",
      "possibleFailure": "Logs desligados impedem investigação."
    },
    {
      "step": 4,
      "actor": "SOC",
      "action": "Correlaciona e responde",
      "detail": "Alertas são analisados e podem acionar contenção.",
      "possibleFailure": "Sem playbook, a resposta é lenta e improvisada."
    }
  ],
  "deepDive": {
    "mentalModel": "Trate a rede como um conjunto de caminhos autorizados entre zonas, todos com dono, justificativa, controle, log e procedimento de resposta.",
    "keyTerms": [
      "defesa em profundidade",
      "zona de segurança",
      "fluxo leste-oeste",
      "fluxo norte-sul",
      "menor privilégio",
      "telemetria",
      "SIEM",
      "NDR",
      "Zero Trust"
    ],
    "limitations": [
      "Defesa em profundidade não substitui gestão de identidade, hardening de endpoints ou segurança de aplicações.",
      "Segmentação mal documentada pode gerar indisponibilidade e exceções permanentes.",
      "Muitas ferramentas sem processo podem aumentar ruído e custo operacional."
    ],
    "whenToUse": [
      "Ambientes corporativos com múltiplos segmentos e ativos críticos.",
      "Redes com Wi‑Fi, guest, IoT, cloud, VPN ou terceirizados.",
      "Ambientes que precisam de auditoria, investigação e redução de movimento lateral."
    ],
    "whenNotToUse": [
      "Como desculpa para comprar ferramentas sem inventário ou política.",
      "Como bloqueio indiscriminado que paralisa o negócio sem análise de fluxo.",
      "Como substituto de correção de vulnerabilidades."
    ],
    "operationalImpact": [
      "Exige inventário, matriz de fluxos, revisão de regras e processos de mudança.",
      "Aumenta a necessidade de documentação e comunicação entre redes, segurança, sistemas e negócio.",
      "Melhora troubleshooting quando logs e padrões são bem definidos."
    ],
    "financialImpact": [
      "Pode exigir firewalls internos, licenças de SIEM/NDR, armazenamento de logs e equipe especializada.",
      "Em cloud, flow logs, firewalls gerenciados, NAT e tráfego entre zonas podem gerar custo recorrente.",
      "Alternativas iniciais podem usar logs nativos, segmentação básica e revisão manual de regras."
    ],
    "securityImpact": [
      "Reduz movimento lateral e exposição lateral.",
      "Aumenta capacidade de detecção e resposta.",
      "Diminui dependência de um único controle de borda."
    ]
  },
  "realWorld": {
    "homeScenario": "Separar rede principal e rede de convidados já demonstra o princípio de zonas e isolamento.",
    "smallBusinessScenario": "Uma pequena empresa pode separar administrativo, câmeras, guest e servidor financeiro com regras simples e logs mínimos.",
    "enterpriseScenario": "Uma corporação usa zonas, firewalls internos, NAC, IDS/NDR, SIEM e playbooks para controlar tráfego leste-oeste e norte-sul.",
    "cloudScenario": "Uma landing zone cloud separa contas, VNets/VPCs, subnets, security groups, private endpoints e logs de fluxo.",
    "incidentScenario": "Após phishing, a segmentação impede que uma estação comprometida alcance bancos de dados e consoles administrativos diretamente."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que firewall de borda basta.",
      "whyItHappens": "O modelo antigo separava mundo interno e externo de forma simples.",
      "consequence": "Movimento lateral interno passa despercebido.",
      "correction": "Proteger também tráfego interno e fluxos entre zonas."
    },
    {
      "mistake": "Criar regras any-any para resolver incidentes de disponibilidade.",
      "whyItHappens": "Durante pressão, liberar tudo parece mais rápido.",
      "consequence": "A exceção vira permanente e elimina menor privilégio.",
      "correction": "Criar exceção temporária, documentada, com dono, prazo e revisão."
    },
    {
      "mistake": "Coletar logs sem saber o que procurar.",
      "whyItHappens": "SIEM é implantado como ferramenta, não como processo.",
      "consequence": "Alto ruído e baixa utilidade em incidentes.",
      "correction": "Definir casos de uso, fontes mínimas, retenção e playbooks."
    },
    {
      "mistake": "Confundir Zero Trust com VPN ou produto único.",
      "whyItHappens": "Marketing simplifica arquitetura em ferramenta.",
      "consequence": "A organização mantém confiança implícita e falsa sensação de segurança.",
      "correction": "Aplicar identidade, contexto, menor privilégio e verificação contínua por recurso."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuário acessa sistemas que não deveria",
      "Servidor recebe conexões laterais incomuns",
      "Muitos denies sem dono no firewall",
      "Incidente sem logs suficientes",
      "Regra de firewall antiga sem justificativa"
    ],
    "diagnosticQuestions": [
      "Qual zona originou o tráfego?",
      "Qual ativo é o destino e qual criticidade?",
      "Existe regra explícita?",
      "A regra possui dono e justificativa?",
      "O fluxo gera log?",
      "Há alerta para comportamento anormal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection servidor.exemplo.local -Port 443\nGet-NetTCPConnection | Select-Object -First 20",
        "purpose": "Validar conectividade e observar conexões locais.",
        "expectedObservation": "Conexões para destinos esperados e teste de porta com sucesso ou falha justificada.",
        "interpretation": "Ajuda a separar bloqueio de rede, serviço indisponível ou política incorreta."
      },
      {
        "platform": "Linux",
        "command": "ip route\nss -tupn\nsudo tcpdump -nn host 10.10.20.50",
        "purpose": "Ver rota, conexões e pacotes para um destino específico.",
        "expectedObservation": "Rota adequada, conexões esperadas e tráfego coerente.",
        "interpretation": "Permite verificar se o host tenta falar com destino correto e se há resposta."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists\nshow logging\nshow ip interface brief",
        "purpose": "Ver ACLs, logs e estado de interfaces.",
        "expectedObservation": "ACLs com contadores coerentes, logs úteis e interfaces operacionais.",
        "interpretation": "Ajuda a validar se a política está sendo aplicada no ponto esperado."
      },
      {
        "platform": "Firewall/SIEM",
        "command": "Filtrar por origem, destino, porta, ação, zona e horário do incidente",
        "purpose": "Reconstruir linha do tempo e decisão de política.",
        "expectedObservation": "Eventos de allow/deny, regra aplicada e usuário/dispositivo quando disponível.",
        "interpretation": "Sem esse dado, investigação e RCA ficam frágeis."
      }
    ],
    "decisionTree": [
      {
        "if": "O acesso indevido funciona",
        "then": "Identificar regra, zona e rota que permitem o fluxo; revisar justificativa e dono."
      },
      {
        "if": "O acesso necessário falha",
        "then": "Validar DNS, rota, política, NAT, estado do serviço e logs de deny."
      },
      {
        "if": "Há alerta de varredura interna",
        "then": "Confirmar origem, escopo, segmentos atingidos e isolar defensivamente se necessário."
      },
      {
        "if": "Não há logs",
        "then": "Registrar lacuna de observabilidade e definir fonte mínima para o próximo ciclo."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Definir zonas antes de regras.",
      "Aplicar menor privilégio em fluxos entre segmentos.",
      "Registrar allow e deny relevantes.",
      "Revisar regras periodicamente.",
      "Associar regras a dono, ticket, motivo e prazo.",
      "Correlacionar firewall, DNS, autenticação, endpoint e NDR no SIEM."
    ],
    "badPractices": [
      "Manter rede plana para facilitar suporte.",
      "Usar any-any permanente.",
      "Criar exceções sem documentação.",
      "Confiar em origem interna como prova de segurança.",
      "Coletar logs sem retenção ou caso de uso.",
      "Não testar playbooks de contenção."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Confundir segmentação com VLAN sem firewall.",
      "Confundir Zero Trust com produto único.",
      "Achar que bloqueio sem log é suficiente."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por rede plana",
        "description": "Ativos internos conseguem alcançar muitos destinos sem controle intermediário.",
        "defensiveExplanation": "Um comprometimento inicial ganha alcance maior porque a rede não impõe barreiras internas.",
        "mitigation": "Segmentação, firewall interno, ACLs, NAC, EDR, logs e revisão de fluxos."
      },
      {
        "name": "Exceções permanentes",
        "description": "Regras criadas para resolver urgências ficam ativas indefinidamente.",
        "defensiveExplanation": "Com o tempo, exceções viram a política real e anulam o desenho de segurança.",
        "mitigation": "Dono, justificativa, prazo, revisão periódica e automação de expiração."
      },
      {
        "name": "Telemetria insuficiente",
        "description": "A organização não consegue reconstruir fluxos após incidente.",
        "defensiveExplanation": "Sem evidência, resposta depende de suposições.",
        "mitigation": "Flow logs, firewall logs, DNS logs, autenticação, SIEM e retenção planejada."
      }
    ],
    "monitoring": [
      "Tentativas negadas entre zonas sensíveis",
      "Novos destinos internos raros",
      "Picos de conexões laterais",
      "Varreduras internas",
      "Mudanças em regras de firewall",
      "Resolução DNS para domínios incomuns"
    ],
    "hardening": [
      "Desabilitar serviços desnecessários",
      "Fechar portas administrativas para redes de usuário",
      "Usar bastion ou jump server para administração",
      "Aplicar MFA e identidade forte",
      "Separar redes de backup, administração e produção"
    ],
    "detectionIdeas": [
      "Alerta para estação acessando múltiplos servidores em sequência",
      "Alerta para RDP/SMB/SSH partindo de rede de usuário",
      "Alerta para deny repetido entre zonas",
      "Alerta para mudança de política fora de janela",
      "Alerta para tráfego de guest tentando alcançar rede interna"
    ]
  },
  "trafficCapture": {
    "tool": "Wireshark, tcpdump, firewall logs, NetFlow/IPFIX ou logs de cloud flow",
    "filter": "host 10.10.20.50 or port 443",
    "whatToObserve": [
      "Origem e destino",
      "Porta e protocolo",
      "Tentativas e respostas",
      "Reset ou timeout",
      "Direção do fluxo",
      "Repetição anormal"
    ],
    "interpretation": "A captura ajuda a provar se o tráfego sai da origem, chega ao destino, é bloqueado no caminho ou falha na aplicação. Em segurança, evidência vale mais do que opinião."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma rede funcional pode ser insegura?",
      "hints": [
        "Pense em conectividade versus autorização.",
        "Pense em logs e movimento lateral."
      ],
      "expectedIdeas": [
        "rede plana",
        "acesso excessivo",
        "ausência de evidência",
        "falta de menor privilégio"
      ],
      "explanation": "Funcionar significa transportar pacotes; ser segura exige controle, contexto e evidência."
    },
    {
      "type": "diagnóstico",
      "question": "Um endpoint comprometido tenta acessar vários servidores internos. O que você verificaria primeiro?",
      "hints": [
        "Origem, destino, porta e zona.",
        "Procure logs de firewall, DNS e EDR."
      ],
      "expectedIdeas": [
        "matriz de acesso",
        "segmentação",
        "logs",
        "contenção",
        "linha do tempo"
      ],
      "explanation": "O primeiro passo é entender alcance e evidência, não apenas bloquear às cegas."
    },
    {
      "type": "cenário real",
      "question": "A diretoria quer implantar Zero Trust. Como você explicaria que isso não é apenas trocar a VPN?",
      "hints": [
        "Pense em identidade, dispositivo, contexto e recurso.",
        "Pense em verificação contínua."
      ],
      "expectedIdeas": [
        "menor privilégio",
        "autorização por recurso",
        "telemetria",
        "contexto",
        "política"
      ],
      "explanation": "Zero Trust é arquitetura e modelo operacional; VPN pode ser um componente, mas não é a arquitetura inteira."
    }
  ],
  "quiz": [
    {
      "id": "q13.1.1",
      "type": "conceito",
      "q": "Qual é a ideia central de defesa em profundidade?",
      "opts": [
        "Usar várias camadas de controle para prevenir, limitar, detectar e responder a falhas",
        "Comprar o firewall mais caro possível",
        "Bloquear todo tráfego interno",
        "Substituir identidade por IP de origem"
      ],
      "a": 0,
      "exp": "Defesa em profundidade usa controles complementares para reduzir dependência de uma única barreira.",
      "difficulty": "iniciante",
      "topic": "defesa em profundidade"
    },
    {
      "id": "q13.1.2",
      "type": "diagnóstico",
      "q": "Uma estação de usuário consegue acessar diretamente um banco de dados de produção. Qual problema isso sugere primeiro?",
      "opts": [
        "Possível falha de segmentação ou política excessiva",
        "Problema de DNS reverso",
        "Erro inevitável do TCP",
        "Necessidade de aumentar potência do Wi‑Fi"
      ],
      "a": 0,
      "exp": "Acesso direto de estação a banco crítico normalmente indica segmentação fraca ou regra permissiva demais.",
      "difficulty": "intermediário",
      "topic": "segmentação"
    },
    {
      "id": "q13.1.3",
      "type": "segurança",
      "q": "Por que logs são parte da defesa, mesmo quando não bloqueiam tráfego?",
      "opts": [
        "Porque permitem detecção, investigação, resposta e aprendizado",
        "Porque substituem firewall",
        "Porque impedem qualquer malware",
        "Porque reduzem automaticamente latência"
      ],
      "a": 0,
      "exp": "Logs geram evidência; sem evidência, incidentes são investigados por suposição.",
      "difficulty": "iniciante",
      "topic": "telemetria"
    },
    {
      "id": "q13.1.4",
      "type": "comparação",
      "q": "Qual afirmação melhor diferencia segmentação de VLAN simples?",
      "opts": [
        "VLAN separa domínio lógico; segmentação efetiva exige política, controle e validação de tráfego entre zonas",
        "VLAN sempre criptografa tráfego",
        "VLAN substitui firewall e autenticação",
        "Segmentação só existe em cloud"
      ],
      "a": 0,
      "exp": "VLAN é um mecanismo; segmentação defensiva exige decisão de acesso, controle e evidência.",
      "difficulty": "intermediário",
      "topic": "zonas"
    },
    {
      "id": "q13.1.5",
      "type": "zero-trust",
      "q": "Qual frase é mais coerente com Zero Trust?",
      "opts": [
        "Não confiar automaticamente apenas porque o tráfego vem da rede interna",
        "Confiar em todo dispositivo conectado por cabo",
        "Permitir tudo via VPN",
        "Eliminar logs para reduzir custo"
      ],
      "a": 0,
      "exp": "Zero Trust remove confiança implícita baseada em localização e usa identidade, contexto e política por recurso.",
      "difficulty": "intermediário",
      "topic": "zero trust"
    },
    {
      "id": "q13.1.6",
      "type": "arquitetura",
      "q": "Qual é um bom primeiro entregável para melhorar segurança de rede?",
      "opts": [
        "Matriz de zonas e fluxos com dono, porta, justificativa e log",
        "Lista aleatória de ferramentas",
        "Uma regra any-any temporária sem prazo",
        "Desligar todos os serviços sem validação"
      ],
      "a": 0,
      "exp": "Matriz de fluxos torna política explícita e permite priorizar controles sem paralisar o ambiente.",
      "difficulty": "intermediário",
      "topic": "arquitetura"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.1.1",
      "front": "O que é defesa em profundidade?",
      "back": "Estratégia com múltiplas camadas de controle para prevenir, limitar, detectar, responder e recuperar quando algo falha.",
      "tags": [
        "segurança",
        "arquitetura"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.1.2",
      "front": "O que é rede plana?",
      "back": "Rede em que muitos ativos compartilham alcance lateral amplo, com pouca ou nenhuma política entre segmentos.",
      "tags": [
        "segmentação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.1.3",
      "front": "Qual a diferença entre permitir conectividade e autorizar acesso?",
      "back": "Conectividade é caminho técnico; autorização é decisão de que aquele usuário/dispositivo pode acessar aquele recurso naquele contexto.",
      "tags": [
        "acesso",
        "zero-trust"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.1.4",
      "front": "Por que logs de deny são úteis?",
      "back": "Eles mostram tentativas bloqueadas, ajudam a detectar abuso e ajudam no troubleshooting de políticas incorretas.",
      "tags": [
        "logs",
        "siem"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.1.5",
      "front": "O que é tráfego leste-oeste?",
      "back": "Comunicação interna entre sistemas, segmentos ou workloads dentro do ambiente, diferente do tráfego norte-sul com internet ou borda.",
      "tags": [
        "tráfego",
        "datacenter"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.1.6",
      "front": "Zero Trust é um produto?",
      "back": "Não. É uma arquitetura e modelo operacional baseado em verificação explícita, menor privilégio e redução de confiança implícita.",
      "tags": [
        "zero-trust"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex13.1.1",
      "type": "conceitual",
      "prompt": "Explique em cinco linhas por que uma rede interna não deve ser considerada automaticamente confiável.",
      "expectedAnswer": "Porque dispositivos internos podem ser comprometidos, credenciais podem vazar, Wi‑Fi/VPN/cloud ampliam o perímetro, e tráfego lateral pode alcançar ativos críticos se não houver segmentação e logs.",
      "explanation": "A resposta deve separar localização de confiança real."
    },
    {
      "id": "ex13.1.2",
      "type": "arquitetura",
      "prompt": "Crie quatro zonas para uma pequena empresa: usuários, servidores, guest e administração. Diga um fluxo permitido e um negado para cada uma.",
      "expectedAnswer": "Exemplo: usuários -> aplicação 443 permitido; usuários -> banco 5432 negado; guest -> internet permitido; guest -> rede interna negado; administração -> bastion permitido; administração direta de qualquer origem negada.",
      "explanation": "O objetivo é exercitar matriz de acesso mínima."
    },
    {
      "id": "ex13.1.3",
      "type": "diagnóstico",
      "prompt": "Você viu tráfego SMB partindo da rede guest para servidores internos. Liste três hipóteses e três ações defensivas.",
      "expectedAnswer": "Hipóteses: guest sem isolamento, VLAN/ACL errada, equipamento conectado na rede errada. Ações: bloquear fluxo, verificar regra/VLAN, coletar logs e identificar origem.",
      "explanation": "A questão força correlação entre rede, política e evidência."
    },
    {
      "id": "ex13.1.4",
      "type": "devsecops",
      "prompt": "Escreva uma regra de revisão para IaC que impeça exposição administrativa ampla em cloud.",
      "expectedAnswer": "Bloquear security group/NSG que permita origem 0.0.0.0/0 para portas administrativas como 22, 3389, 5985, 5986, exceto com justificativa aprovada e prazo.",
      "explanation": "Política como código reduz erro operacional recorrente."
    }
  ],
  "challenge": {
    "title": "Da rede plana à defesa em profundidade",
    "scenario": "A empresa Beta tem uma rede única 10.0.0.0/16, Wi‑Fi corporativo, guest, servidores internos, banco financeiro, câmeras IP e VPN. Um incidente recente mostrou conexões laterais inesperadas partindo de uma estação de usuário.",
    "tasks": [
      "Propor pelo menos cinco zonas.",
      "Definir fluxos permitidos mínimos entre zonas.",
      "Indicar onde aplicar firewall, ACL, NAC, logs e SIEM.",
      "Definir três alertas de detecção.",
      "Criar plano de implantação em três fases."
    ],
    "constraints": [
      "Não pode interromper o sistema financeiro.",
      "A equipe é pequena.",
      "A primeira fase deve usar controles já disponíveis.",
      "Guest não pode acessar rede interna.",
      "Administração deve passar por caminho controlado."
    ],
    "expectedDeliverables": [
      "Tabela de zonas",
      "Matriz de fluxos",
      "Diagrama lógico",
      "Plano de logs",
      "Plano de resposta",
      "Riscos residuais"
    ],
    "gradingRubric": [
      {
        "criterion": "Zonas coerentes",
        "points": 20,
        "description": "Separa usuários, servidores, administração, guest, IoT e cloud/DMZ quando aplicável."
      },
      {
        "criterion": "Menor privilégio",
        "points": 25,
        "description": "Fluxos permitidos são específicos e justificados."
      },
      {
        "criterion": "Observabilidade",
        "points": 20,
        "description": "Inclui logs úteis e alertas acionáveis."
      },
      {
        "criterion": "Plano por fases",
        "points": 20,
        "description": "Reduz risco sem paralisar o negócio."
      },
      {
        "criterion": "Raciocínio defensivo",
        "points": 15,
        "description": "Explica impacto, limitações e mitigação."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Começamos identificando ativos e separando zonas por função e criticidade. Depois reduzimos fluxos laterais, criamos caminho administrativo controlado e adicionamos telemetria para investigação.",
    "steps": [
      "Separar guest da rede interna.",
      "Criar zona de usuários e impedir acesso direto a bancos.",
      "Criar zona de servidores com firewall interno.",
      "Criar zona de administração com bastion e MFA.",
      "Isolar IoT para destinos mínimos.",
      "Enviar logs de firewall, DNS, VPN e autenticação ao SIEM.",
      "Criar alertas para SMB/RDP/SSH partindo de usuários ou guest."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Instalar um firewall na borda e manter a LAN plana.",
        "whyItIsWrong": "Não reduz movimento lateral interno após comprometimento inicial."
      },
      {
        "answer": "Criar várias VLANs sem regras entre elas.",
        "whyItIsWrong": "Separação lógica sem política e validação não é segmentação defensiva suficiente."
      },
      {
        "answer": "Bloquear tudo de uma vez.",
        "whyItIsWrong": "Pode causar indisponibilidade e gerar pressão para liberar any-any."
      }
    ],
    "finalAnswer": "Uma boa solução inicial separa zonas, restringe fluxos críticos, ativa logs, cria alertas e implanta por fases. A meta é reduzir alcance lateral e aumentar evidência sem interromper o negócio."
  },
  "pedagogicalMap": {
    "problem": "Conectividade sem controle amplia impacto de incidentes.",
    "concept": "Segurança de redes protege fluxos com camadas de controle, detecção e resposta.",
    "internalMechanism": "Inventário, zonas, matriz de fluxo, política, logs, detecção e playbooks.",
    "realUse": "Segmentação, firewall interno, SIEM, NAC, NDR e revisão de regras.",
    "commonMistake": "Confiar na rede interna e manter exceções any-any.",
    "securityImpact": "Reduz movimento lateral e melhora investigação.",
    "operationalImpact": "Exige governança, documentação, donos e revisão contínua.",
    "summary": "Defesa em profundidade transforma a rede em uma arquitetura controlável e observável."
  },
  "glossary": [
    {
      "term": "Defesa em profundidade",
      "shortDefinition": "Estratégia com múltiplas camadas de proteção e detecção.",
      "longDefinition": "Modelo em que controles complementares reduzem dependência de uma única barreira e ajudam a prevenir, limitar, detectar, responder e recuperar.",
      "example": "Firewall, segmentação, EDR, logs, SIEM e playbook atuando juntos.",
      "relatedTerms": [
        "segmentação",
        "SIEM",
        "Zero Trust"
      ],
      "relatedLessons": [
        "13.1",
        "13.2",
        "13.5"
      ]
    },
    {
      "term": "Zona de segurança",
      "shortDefinition": "Grupo de ativos com função, confiança ou criticidade semelhante.",
      "longDefinition": "Agrupamento usado para aplicar políticas de acesso, inspeção e monitoramento entre partes diferentes da rede.",
      "example": "Zona de usuários, zona de servidores, DMZ, guest, IoT e administração.",
      "relatedTerms": [
        "VLAN",
        "firewall",
        "DMZ"
      ],
      "relatedLessons": [
        "13.2"
      ]
    },
    {
      "term": "Movimento lateral",
      "shortDefinition": "Deslocamento de um atacante ou malware entre ativos internos.",
      "longDefinition": "Atividade em que um comprometimento inicial tenta alcançar outros sistemas, credenciais ou serviços dentro do ambiente.",
      "example": "Estação comprometida tentando acessar SMB/RDP em servidores internos.",
      "relatedTerms": [
        "rede plana",
        "segmentação",
        "detecção"
      ],
      "relatedLessons": [
        "13.2",
        "16.7"
      ]
    },
    {
      "term": "Tráfego leste-oeste",
      "shortDefinition": "Comunicação interna entre sistemas ou segmentos.",
      "longDefinition": "Fluxos dentro do ambiente corporativo, datacenter ou cloud, diferentes do tráfego com internet/borda.",
      "example": "Servidor de aplicação falando com banco de dados interno.",
      "relatedTerms": [
        "tráfego norte-sul",
        "NDR",
        "segmentação"
      ],
      "relatedLessons": [
        "13.4"
      ]
    },
    {
      "term": "SIEM",
      "shortDefinition": "Plataforma de correlação e análise de eventos de segurança.",
      "longDefinition": "Sistema que recebe logs de múltiplas fontes para investigação, alertas, correlação e resposta.",
      "example": "Correlacionar firewall deny, DNS suspeito e alerta de EDR.",
      "relatedTerms": [
        "logs",
        "SOC",
        "correlação"
      ],
      "relatedLessons": [
        "13.5"
      ]
    },
    {
      "term": "Zero Trust",
      "shortDefinition": "Modelo que reduz confiança implícita e exige verificação contextual.",
      "longDefinition": "Arquitetura baseada em acesso por recurso, identidade, contexto, menor privilégio e verificação contínua.",
      "example": "Usuário autenticado com MFA, dispositivo conforme e política por aplicação, independentemente de estar dentro ou fora da rede.",
      "relatedTerms": [
        "menor privilégio",
        "IAM",
        "postura de dispositivo"
      ],
      "relatedLessons": [
        "13.8"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "SP 800-207, Zero Trust Architecture",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final",
      "note": "Base oficial para explicar Zero Trust como mudança de perímetro para usuários, ativos e recursos."
    },
    {
      "type": "official-doc",
      "title": "The NIST Cybersecurity Framework (CSF) 2.0",
      "organization": "NIST",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Referência para organizar governança, identificação, proteção, detecção, resposta e recuperação."
    },
    {
      "type": "official-doc",
      "title": "SP 800-41 Rev. 1, Guidelines on Firewalls and Firewall Policy",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
      "note": "Referência para firewall, política, seleção, configuração, teste, implantação e gestão."
    },
    {
      "type": "official-doc",
      "title": "Zero Trust Maturity Model",
      "organization": "CISA",
      "url": "https://www.cisa.gov/resources-tools/resources/zero-trust-maturity-model",
      "note": "Referência de maturidade para estratégias e planos de implementação Zero Trust."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 12",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Wi‑Fi corporativo é uma das bordas que será incorporada à defesa em profundidade."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewalls, ACLs, WAF e políticas de tráfego são controles centrais da defesa em profundidade."
    },
    {
      "course": "Redes e Network",
      "module": "m10",
      "lesson": "10.x",
      "reason": "VPN e Zero Trust se conectam à discussão de confiança, contexto e acesso remoto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade e automação",
      "lesson": "logs/pipelines/policy as code",
      "reason": "Defesa em profundidade moderna depende de automação, telemetria e governança como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "identidade e autorização",
      "reason": "Zero Trust e controle de acesso dependem fortemente de identidade, MFA, postura e ciclo de vida."
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
      "13.2"
    ]
  }
};
