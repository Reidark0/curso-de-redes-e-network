export const lesson1309 = {
  "id": "13.9",
  "moduleId": "m13",
  "order": 9,
  "title": "Playbooks de Investigação de Rede para SOC e Blue Team",
  "subtitle": "Como transformar sinais de rede em investigação repetível: triagem, hipótese, evidência, escopo, contenção, comunicação e lições aprendidas.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 360,
  "tags": [
    "redes",
    "segurança",
    "soc",
    "blue team",
    "playbook",
    "incidente",
    "siem",
    "ndr",
    "netflow",
    "logs",
    "dfir",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.1",
      "reason": "Defesa em profundidade fornece o modelo de controles sobrepostos que sustenta o playbook."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.4",
      "reason": "IDS, IPS, NDR, NetFlow e sensores são fontes essenciais de evidência para investigação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM, logs e correlação são a base operacional de triagem e linha do tempo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.7",
      "reason": "Reconhecimento, MITM, movimento lateral e exfiltração precisam ser tratados como hipóteses defensivas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.8",
      "reason": "Zero Trust ajuda a definir contenção por identidade, contexto e menor privilégio."
    }
  ],
  "objectives": [
    "Explicar o que é um playbook de investigação de rede e por que ele reduz improviso em SOC.",
    "Diferenciar alerta, evento, hipótese, incidente, evidência e conclusão.",
    "Construir uma linha do tempo com logs de DNS, DHCP, firewall, proxy, EDR, NDR, IAM e SIEM.",
    "Definir etapas de triagem, escopo, contenção, erradicação, recuperação e lições aprendidas.",
    "Criar perguntas de investigação para reconhecimento, movimento lateral e exfiltração em rede.",
    "Produzir um playbook defensivo com comandos, evidências, decisões e critérios de escalonamento."
  ],
  "learningOutcomes": [
    "Dado um alerta de varredura interna, o aluno consegue definir perguntas iniciais, fontes de evidência e critérios de severidade.",
    "Dado um conjunto de logs desalinhados, o aluno identifica a necessidade de NTP, timezone, DHCP e NAT para correlação correta.",
    "Dado um possível incidente de exfiltração, o aluno consegue diferenciar aumento legítimo de tráfego, backup autorizado e vazamento suspeito.",
    "Dado um alerta de firewall ou NDR, o aluno sabe montar uma linha do tempo sem concluir antes das evidências.",
    "Dado um ambiente corporativo, o aluno propõe um playbook com responsáveis, evidências, ações permitidas, comunicação e lições aprendidas."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine o SOC recebendo um alerta às 02:17: um servidor interno iniciou conexões para dezenas de hosts em portas administrativas. O analista vê o alerta no SIEM, mas não sabe se deve chamar infraestrutura, bloquear o servidor, abrir incidente crítico, ignorar como falso positivo ou coletar mais evidências. Enquanto ele decide, o relógio corre. Se for um incidente real, cada minuto pode ampliar escopo, perda de dados, indisponibilidade e custo.</p>\n  <p>O problema não é apenas técnico. O problema é operacional: sem playbook, cada analista investiga de um jeito. Um coleta DNS, outro começa pelo firewall, outro bloqueia sem validar impacto, outro fecha alerta porque o IP parece conhecido. Em segurança de redes, improviso costuma gerar dois danos: deixar passar ataque real ou interromper negócio por contenção precipitada.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma organização tem SIEM, firewall, EDR e NDR, mas não possui roteiro claro para investigar varredura interna, tráfego suspeito, anomalia DNS, possível exfiltração ou falha de segmentação. Resultado: alertas se acumulam, evidências se perdem e decisões dependem da experiência individual do plantonista.</div>\n  <p>Esta aula ensina playbooks de investigação de rede como um mecanismo de qualidade operacional. Um bom playbook não substitui pensamento crítico; ele organiza o pensamento. Ele diz quais perguntas fazer, quais evidências coletar, quais hipóteses testar, quando escalar, quando conter, como comunicar e como registrar o aprendizado.</p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No início das redes corporativas, investigação de incidentes era frequentemente artesanal. Administradores olhavam logs locais, verificavam roteadores, perguntavam a usuários e tentavam reconstruir a história manualmente. Com o crescimento de firewalls, IDS, proxies, VPN, Active Directory, Wi-Fi, cloud e endpoints gerenciados, o volume de dados cresceu muito mais rápido do que a capacidade humana de interpretá-los sem método.</p>\n  <p>O SOC moderno nasceu para centralizar monitoramento, triagem e resposta. Mas centralizar ferramentas não resolve tudo. SIEM sem caso de uso vira depósito de logs. NDR sem playbook vira gerador de alertas. Firewall com milhões de eventos não diz sozinho qual fluxo importa. Por isso, equipes maduras passaram a documentar runbooks e playbooks: procedimentos repetíveis para cenários recorrentes.</p>\n  <p>A evolução mais importante foi sair do modelo “olhar alerta por alerta” para o modelo “investigar hipótese com evidência”. O alerta é apenas o gatilho. A investigação precisa responder: o que aconteceu, quando começou, qual ativo foi afetado, qual usuário estava envolvido, qual caminho de rede foi usado, qual controle permitiu ou bloqueou, qual impacto provável e qual ação reduz risco sem destruir evidência ou quebrar serviço crítico.</p>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema central é que alertas de rede raramente são conclusões. Um alerta de porta, DNS incomum, volume anormal ou conexão para destino raro é uma pista. Sem processo, a equipe pode confundir pista com prova. O resultado é ruim em dois sentidos: incidentes reais são subestimados e eventos benignos viram emergência.</p>\n  <ul>\n    <li><strong>Falta de contexto:</strong> IP sozinho não diz usuário, aplicação, dono, criticidade ou finalidade.</li>\n    <li><strong>Logs desalinhados:</strong> timezone errado, NTP ausente e DHCP sem histórico quebram linha do tempo.</li>\n    <li><strong>Fontes desconectadas:</strong> firewall, DNS, EDR, RADIUS, VPN e cloud logs contam partes diferentes da história.</li>\n    <li><strong>Escopo mal definido:</strong> uma máquina suspeita pode ser apenas sintoma; a causa pode estar em credencial, automação, servidor exposto ou regra de firewall.</li>\n    <li><strong>Contenção precipitada:</strong> bloquear sem entender dependências pode parar operação crítica ou destruir evidência.</li>\n    <li><strong>Comunicação fraca:</strong> linguagem excessivamente técnica impede decisão executiva e priorização correta.</li>\n  </ul>\n  <p>Playbooks resolvem parte desse problema ao padronizar investigação. Eles não garantem resposta perfeita, mas reduzem variabilidade, aumentam qualidade das evidências, melhoram comunicação e permitem treinar analistas menos experientes sem depender apenas de memória tribal.</p>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>O processo de investigação em redes evoluiu de análise manual para resposta orientada por evidências, casos de uso e automação controlada.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Evolução</th></tr></thead>\n    <tbody>\n      <tr><td>Investigação ad hoc</td><td>Analista decide sozinho por onde começar.</td><td>Alta variação, perda de evidências e dificuldade de auditoria.</td><td>Runbooks e playbooks documentados.</td></tr>\n      <tr><td>Alerta isolado</td><td>Cada alerta é tratado como caso independente.</td><td>Não enxerga cadeia de eventos nem escopo real.</td><td>Correlação e linha do tempo.</td></tr>\n      <tr><td>SIEM como repositório</td><td>Logs centralizados, mas sem perguntas claras.</td><td>Muito dado, pouca decisão.</td><td>Casos de uso, queries e critérios de severidade.</td></tr>\n      <tr><td>Resposta manual</td><td>Bloqueios e coletas feitos manualmente.</td><td>Lento e sujeito a erro.</td><td>SOAR e automação com aprovação humana.</td></tr>\n      <tr><td>Playbook maduro</td><td>Hipóteses, evidências, decisões, contenção e comunicação padronizadas.</td><td>Exige manutenção, treinamento e validação periódica.</td><td>Tabletop exercises, métricas e melhoria contínua.</td></tr>\n    </tbody>\n  </table>\n  <p>O ponto avançado é entender que playbook bom não é script rígido. Ele é um trilho de raciocínio. Ele guia a investigação, mas preserva espaço para hipóteses novas quando a evidência aponta para algo fora do padrão.</p>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Um playbook de investigação de rede é um procedimento estruturado para analisar um tipo de alerta ou cenário de segurança usando perguntas, fontes de evidência, critérios de severidade, ações permitidas, caminhos de escalonamento, orientações de contenção e requisitos de documentação.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> playbook é o roteiro operacional que transforma um sinal técnico em investigação defensiva repetível, auditável e comunicável.</div>\n  <p>Ele deve conter, no mínimo: gatilhos de entrada, objetivo, escopo, perguntas iniciais, fontes de dados, queries ou comandos, critérios de falso positivo, critérios de severidade, ações de contenção, responsáveis, comunicação, evidências obrigatórias, critérios de encerramento e lições aprendidas.</p>\n  <p>Playbook não é a mesma coisa que política. A política diz o que deve ser protegido e quais regras gerais existem. O playbook diz como investigar quando algo suspeito acontece. Também não é a mesma coisa que automação. Uma automação pode executar partes do playbook, mas a decisão de negócio e a interpretação das evidências continuam exigindo responsabilidade humana.</p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, um playbook de investigação funciona como um funil de evidências. Ele começa amplo, reduz incerteza e termina em decisão documentada.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Gatilho:</strong> alerta do SIEM, NDR, firewall, EDR, usuário, auditoria ou métrica anômala.</li>\n    <li><strong>Triagem:</strong> validar horário, ativo, severidade inicial, fonte, confiabilidade do alerta e duplicidade.</li>\n    <li><strong>Contexto:</strong> enriquecer com dono do ativo, criticidade, usuário, DHCP, DNS, NAT, localização, grupos IAM e CMDB.</li>\n    <li><strong>Hipóteses:</strong> formular explicações plausíveis, como varredura autorizada, backup, atualização, malware, credencial abusada ou erro de configuração.</li>\n    <li><strong>Coleta:</strong> buscar logs de firewall, DNS, proxy, VPN, RADIUS, EDR, NDR, NetFlow/IPFIX, PCAP, cloud e aplicação.</li>\n    <li><strong>Linha do tempo:</strong> ordenar eventos por tempo e identificar primeiro sinal conhecido, pivôs, origem, destino e mudança de comportamento.</li>\n    <li><strong>Escopo:</strong> descobrir se há um host, muitos hosts, uma sub-rede, uma conta, uma aplicação ou um padrão recorrente.</li>\n    <li><strong>Decisão:</strong> classificar como falso positivo, evento benigno, incidente confirmado, incidente provável ou investigação inconclusiva.</li>\n    <li><strong>Resposta:</strong> conter, isolar, bloquear, revogar credenciais, ajustar firewall, abrir ticket, acionar times e preservar evidência.</li>\n    <li><strong>Pós-incidente:</strong> registrar lições, melhorar detecção, reduzir ruído, corrigir controle e atualizar o playbook.</li>\n  </ol>\n  <p>Esse fluxo evita a armadilha de começar pela ferramenta. O analista não deve perguntar apenas “qual query eu rodo?”. Ele deve perguntar “qual hipótese esta query testa?”.</p>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Na arquitetura de segurança, playbooks ficam entre telemetria, pessoas, processos e resposta. Eles conectam sensores ao SOC, SIEM ao time de infraestrutura, IAM ao time de identidade, cloud ao time de plataforma e gestão executiva à realidade técnica.</p>\n  <ul>\n    <li><strong>Fontes de rede:</strong> firewall, proxy, DNS, DHCP, VPN, RADIUS, WAF, flow logs, NetFlow/IPFIX, NDR e PCAP.</li>\n    <li><strong>Fontes de endpoint:</strong> EDR, logs de sistema, processos, conexões locais, usuário logado e integridade do host.</li>\n    <li><strong>Fontes de identidade:</strong> IAM, AD/Entra ID, MFA, grupos, logon, falhas, privilégios e mudanças de credencial.</li>\n    <li><strong>Fontes de cloud:</strong> flow logs, audit logs, security groups, NSG, route tables, load balancers, DNS privado e eventos de API.</li>\n    <li><strong>Camada de correlação:</strong> SIEM, data lake, normalização, enriquecimento, regras, casos e dashboards.</li>\n    <li><strong>Camada de resposta:</strong> ticket, SOAR, bloqueio, isolamento, revogação, comunicação, documentação e RCA.</li>\n  </ul>\n  <p>Um playbook maduro informa onde buscar evidência em cada camada e quem pode executar cada ação. Ele também define ações que exigem aprovação, porque resposta de segurança pode afetar disponibilidade, contrato, evidência forense e reputação.</p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Um playbook de SOC é como o protocolo de atendimento de uma emergência médica. O médico não trata todos os pacientes do mesmo jeito, mas existe uma sequência: sinais vitais, histórico, exame, hipótese, exame complementar, decisão, tratamento, monitoramento e registro. Sem esse roteiro, cada atendimento vira improviso.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não são organismos vivos e logs podem estar incompletos, atrasados ou errados. Por isso, o playbook precisa lidar com incerteza, evidência ausente e fontes contraditórias.</div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma rede pequena, o roteador mostra muitas conexões de um notebook para IPs desconhecidos. Um playbook simples orientaria: identificar o host, verificar usuário, conferir horário, consultar DNS, ver processos locais, comparar com atualizações legítimas, checar volume de tráfego, bloquear apenas se houver risco claro e documentar evidências.</p>\n  <p>Sem playbook, alguém poderia apenas reiniciar o roteador, perdendo dados úteis. Ou poderia formatar o notebook sem saber se outros hosts também foram afetados. O playbook impede que a investigação comece apagando as pegadas.</p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um alerta de “possible lateral movement” aparece no NDR: uma estação de usuário iniciou conexões SMB para vinte servidores em cinco minutos. O playbook orienta o analista a validar se houve mudança de software, script administrativo, varredura autorizada, credencial nova, falha de segmentação ou comportamento malicioso.</p>\n  <p>As evidências mínimas seriam: logs do NDR, firewall interno, autenticações no AD, EDR no host, DHCP para confirmar IP, DNS para nomes resolvidos, logs dos servidores acessados e histórico do usuário. A decisão não deve depender apenas do alerta. Ela deve depender da convergência entre fontes.</p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, o playbook precisa incluir particularidades como VPC/VNet flow logs, security groups, NSG, NACL, cloud firewall, load balancer logs, DNS privado, audit logs de API e identidades de workload. Um alerta de tráfego incomum entre subnets pode ser incidente, mas também pode ser autoscaling, health check, job de ETL ou mudança de rota.</p>\n  <p>O playbook cloud deve perguntar: qual recurso gerou o tráfego, qual identidade criou ou alterou a regra, qual tag indica dono, qual rota foi usada, houve alteração de security group, houve egress para região incomum, existe endpoint privado, existe NAT compartilhado e há custo anômalo de transferência de dados?</p>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, playbooks devem conversar com pipelines e infraestrutura como código. Se uma regra de firewall ou security group mudou antes de um incidente, o SOC precisa saber qual pull request, qual pipeline, qual service principal, qual aprovação e qual mudança de estado geraram a alteração.</p>\n  <p>Um bom playbook inclui busca em repositórios, histórico de deploy, logs de CI/CD, mudança de manifest Kubernetes, alteração de NetworkPolicy, mudança de secret, rotação de certificado e logs de automação. Isso evita culpar “a rede” quando o problema nasceu em uma mudança automatizada mal revisada.</p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, playbooks reduzem tempo de detecção e resposta, mas também reduzem risco de decisões perigosas. O foco é investigar sem causar dano desnecessário.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Conclusão precipitada</td><td>Alerta tratado como incidente confirmado sem validação.</td><td>Bloqueio indevido, ruído e perda de confiança no SOC.</td><td>Critérios de severidade, evidências mínimas e revisão por pares.</td></tr>\n      <tr><td>Perda de evidência</td><td>Host reiniciado ou logs rotacionados antes da coleta.</td><td>RCA fraco e impossibilidade de confirmar escopo.</td><td>Preservação, snapshots quando aplicável e cadeia de evidências.</td></tr>\n      <tr><td>Baixa cobertura</td><td>Playbook depende de fonte de log inexistente.</td><td>Investigação incompleta e falso negativo.</td><td>Mapa de telemetria, gaps conhecidos e plano de melhoria.</td></tr>\n      <tr><td>Contenção excessiva</td><td>Bloqueio de sub-rede ou serviço crítico sem análise de impacto.</td><td>Indisponibilidade operacional.</td><td>Matriz de impacto, aprovação e contenção proporcional.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra o ciclo de investigação: alerta, triagem, enriquecimento, hipótese, evidência, escopo, resposta e lições aprendidas.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1200 620\" role=\"img\" aria-labelledby=\"playbook-title playbook-desc\">\n    <title id=\"playbook-title\">Fluxo de playbook de investigação de rede</title>\n    <desc id=\"playbook-desc\">Um alerta de rede passa por triagem, enriquecimento, hipóteses, coleta de evidências, escopo, resposta, comunicação e melhoria contínua.</desc>\n    <defs>\n      <marker id=\"arrow-1309\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"80\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"110\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Alerta</text>\n    <text x=\"110\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SIEM/NDR</text>\n\n    <rect x=\"250\" y=\"80\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"325\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Triagem</text>\n    <text x=\"325\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">severidade</text>\n\n    <rect x=\"465\" y=\"80\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"540\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Contexto</text>\n    <text x=\"540\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativo/usuário</text>\n\n    <rect x=\"680\" y=\"80\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"755\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Hipótese</text>\n    <text x=\"755\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">o que testar?</text>\n\n    <rect x=\"895\" y=\"80\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"970\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Evidência</text>\n    <text x=\"970\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs/flow/EDR</text>\n\n    <rect x=\"895\" y=\"270\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"970\" y=\"298\" text-anchor=\"middle\" class=\"svg-label\">Escopo</text>\n    <text x=\"970\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">quantos ativos?</text>\n\n    <rect x=\"680\" y=\"270\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"755\" y=\"298\" text-anchor=\"middle\" class=\"svg-label\">Resposta</text>\n    <text x=\"755\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">conter/escalar</text>\n\n    <rect x=\"465\" y=\"270\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"540\" y=\"298\" text-anchor=\"middle\" class=\"svg-label\">Comunicar</text>\n    <text x=\"540\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">técnico/exec.</text>\n\n    <rect x=\"250\" y=\"270\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"325\" y=\"298\" text-anchor=\"middle\" class=\"svg-label\">RCA</text>\n    <text x=\"325\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">causa/ação</text>\n\n    <rect x=\"35\" y=\"270\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"110\" y=\"298\" text-anchor=\"middle\" class=\"svg-label\">Melhoria</text>\n    <text x=\"110\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">detecção</text>\n\n    <line x1=\"185\" y1=\"115\" x2=\"250\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"400\" y1=\"115\" x2=\"465\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"615\" y1=\"115\" x2=\"680\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"830\" y1=\"115\" x2=\"895\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"970\" y1=\"150\" x2=\"970\" y2=\"270\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"895\" y1=\"305\" x2=\"830\" y2=\"305\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"680\" y1=\"305\" x2=\"615\" y2=\"305\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"465\" y1=\"305\" x2=\"400\" y2=\"305\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1309)\" />\n    <line x1=\"250\" y1=\"305\" x2=\"185\" y2=\"305\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1309)\" />\n\n    <rect x=\"165\" y=\"455\" width=\"870\" height=\"80\" rx=\"16\" class=\"svg-zone\" />\n    <text x=\"600\" y=\"490\" text-anchor=\"middle\" class=\"svg-label\">Fontes de evidência: DNS • DHCP • Firewall • Proxy • VPN • RADIUS • EDR • NDR • NetFlow/IPFIX • PCAP • Cloud logs</text>\n    <text x=\"600\" y=\"518\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O playbook não é a evidência: ele aponta onde coletar, como interpretar e quando agir.</text>\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é defensivo e conceitual-prático. Você construirá um playbook para investigar um alerta simulado de movimento lateral usando eventos fictícios de SIEM, firewall, DNS, DHCP, EDR e NDR. Nenhum ataque será executado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam triagem, linha do tempo, escopo e comunicação. Responda sempre separando evidência observada, hipótese e conclusão.</p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio coloca você como analista Blue Team responsável por transformar um alerta ruidoso em caso investigável, sem bloquear serviço crítico prematuramente.</p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostrará como construir a linha do tempo, escolher fontes de evidência, definir severidade, decidir contenção e registrar lições aprendidas.</p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Playbook reduz improviso, mas não substitui raciocínio.</li>\n    <li>Alerta é gatilho; evidência é base; hipótese é algo a testar; conclusão exige convergência.</li>\n    <li>Investigação de rede precisa de DNS, DHCP, firewall, EDR, NDR, identidade, flow e contexto de ativo.</li>\n    <li>Contenção deve ser proporcional ao risco e ao impacto de negócio.</li>\n    <li>Todo caso deve gerar aprendizado: ajuste de detecção, controle, documentação ou arquitetura.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você fechará o Módulo 13 com uma revisão prática: desenhar uma arquitetura defensiva de rede. Ela usará defesa em profundidade, segmentação, hardening, sensores, SIEM, threat modeling, Zero Trust e playbooks em um único projeto.</p>\n</section>"
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
      "DNS",
      "DHCP",
      "TCP",
      "UDP",
      "ICMP",
      "TLS",
      "RADIUS",
      "Syslog",
      "NetFlow",
      "IPFIX",
      "HTTP"
    ],
    "dependsOn": [
      "Firewall",
      "IDS/IPS",
      "NDR",
      "SIEM",
      "Logs",
      "Segmentação",
      "IAM",
      "Zero Trust"
    ],
    "enables": [
      "SOC",
      "Blue Team",
      "Resposta a incidente",
      "Threat hunting",
      "RCA",
      "Melhoria contínua"
    ]
  },
  "protocolFields": [
    {
      "field": "Timestamp",
      "size": "variável",
      "purpose": "Ordenar eventos na linha do tempo.",
      "securityObservation": "Timezone e NTP incorretos podem inverter causa e consequência."
    },
    {
      "field": "Source/Destination IP",
      "size": "32 ou 128 bits",
      "purpose": "Identificar origem e destino do fluxo.",
      "securityObservation": "NAT, DHCP e proxies podem ocultar o ator real se não houver correlação."
    },
    {
      "field": "User/Identity",
      "size": "variável",
      "purpose": "Relacionar evento de rede a usuário, conta de serviço ou workload.",
      "securityObservation": "Sem identidade, a investigação fica limitada a endereços e hosts."
    },
    {
      "field": "Action/Decision",
      "size": "variável",
      "purpose": "Indicar permitido, bloqueado, alertado, autenticado ou negado.",
      "securityObservation": "Logs sem ação não mostram se o controle funcionou."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Sensor ou SIEM",
      "action": "Gera alerta inicial.",
      "detail": "Exemplo: host interno conectou em muitas portas administrativas.",
      "possibleFailure": "Alerta sem contexto vira ruído."
    },
    {
      "step": 2,
      "actor": "Analista SOC",
      "action": "Valida contexto básico.",
      "detail": "Confere ativo, usuário, horário, criticidade, DHCP, DNS e alertas correlatos.",
      "possibleFailure": "IP dinâmico pode apontar para host errado se DHCP não for consultado."
    },
    {
      "step": 3,
      "actor": "Playbook",
      "action": "Define hipóteses e evidências.",
      "detail": "Varredura autorizada, script administrativo, malware, credencial abusada ou falha de segmentação.",
      "possibleFailure": "Pular hipóteses gera conclusão prematura."
    },
    {
      "step": 4,
      "actor": "Times de resposta",
      "action": "Executam contenção proporcional.",
      "detail": "Bloqueio específico, isolamento, revogação de token, regra temporária ou abertura de incidente.",
      "possibleFailure": "Contenção ampla pode derrubar serviço crítico."
    }
  ],
  "trafficCapture": {
    "tool": "SIEM, firewall logs, NetFlow/IPFIX, NDR, EDR, DNS logs, DHCP logs e PCAP autorizado",
    "filter": "ip.addr == <host_suspeito> ou consulta equivalente no SIEM",
    "whatToObserve": [
      "primeiro evento conhecido",
      "origem e destino",
      "porta/protocolo",
      "volume",
      "decisão do controle",
      "usuário ou processo associado",
      "mudança de comportamento"
    ],
    "interpretation": "O objetivo é validar hipóteses e escopo, não provar incidente com uma única fonte."
  },
  "deepDive": {
    "mentalModel": "Pense no playbook como uma investigação orientada por hipótese. O alerta aponta para uma pergunta; as fontes de telemetria fornecem peças; a linha do tempo organiza causalidade; a contenção reduz risco; a RCA melhora o sistema.",
    "keyTerms": [
      "playbook",
      "runbook",
      "triagem",
      "linha do tempo",
      "escopo",
      "evidência",
      "hipótese",
      "severidade",
      "contenção",
      "RCA"
    ],
    "limitations": [
      "Playbook desatualizado pode induzir erro.",
      "Automação sem aprovação pode causar indisponibilidade.",
      "Logs ausentes ou desalinhados podem impedir conclusão confiável.",
      "Muitos playbooks longos demais não são usados durante pressão real.",
      "Playbook não substitui conhecimento de negócio e arquitetura."
    ],
    "whenToUse": [
      "Alertas recorrentes de rede.",
      "Investigação em SOC com múltiplas fontes de evidência.",
      "Cenários que exigem escalonamento e comunicação.",
      "Treinamento de analistas e tabletop exercises.",
      "Padronização de resposta a incidentes."
    ],
    "whenNotToUse": [
      "Como checklist cego sem análise.",
      "Como autorização para contenção destrutiva sem avaliar impacto.",
      "Como substituto de documentação de arquitetura.",
      "Como prova de segurança sem testes e simulações.",
      "Como documento estático que nunca é revisado."
    ],
    "operationalImpact": [
      "Reduz improviso e acelera triagem.",
      "Exige manutenção, treinamento e simulações periódicas.",
      "Melhora passagem de plantão e consistência entre analistas.",
      "Depende de inventário e telemetria confiáveis.",
      "Facilita auditoria e melhoria contínua."
    ],
    "financialImpact": [
      "Pode reduzir custo de incidente por resposta mais rápida.",
      "Pode aumentar custo de armazenamento e ingestão de logs.",
      "Exige investimento em SIEM, NDR, EDR, SOAR ou equipe, dependendo do cenário.",
      "Pode reduzir custo operacional ao padronizar tarefas repetitivas.",
      "Playbooks ruins geram custo por bloqueios indevidos e retrabalho."
    ],
    "securityImpact": [
      "Aumenta qualidade das evidências.",
      "Reduz falso positivo e falso negativo quando bem calibrado.",
      "Melhora contenção proporcional.",
      "Ajuda a identificar gaps de logging e controle.",
      "Fortalece resposta a movimento lateral e exfiltração."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Tratar alerta como incidente confirmado.",
      "whyItHappens": "Ferramentas usam linguagem alarmante e analistas estão sob pressão.",
      "consequence": "Bloqueios indevidos, fadiga e perda de confiança.",
      "correction": "Separar alerta, hipótese, evidência e conclusão."
    },
    {
      "mistake": "Investigar IP sem consultar DHCP/NAT.",
      "whyItHappens": "O alerta mostra IP e o analista assume que o host é fixo.",
      "consequence": "Host errado é investigado ou contido.",
      "correction": "Sempre correlacionar IP, horário, DHCP, NAT, usuário e ativo."
    },
    {
      "mistake": "Começar pela contenção ampla.",
      "whyItHappens": "Medo de impacto do incidente.",
      "consequence": "Indisponibilidade e perda de evidência.",
      "correction": "Definir contenção proporcional e aprovações quando necessário."
    },
    {
      "mistake": "Não registrar raciocínio.",
      "whyItHappens": "Pressa para fechar o caso.",
      "consequence": "RCA fraco e repetição do problema.",
      "correction": "Documentar hipóteses, evidências, decisões e lições aprendidas."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Alerta sem contexto",
      "Múltiplos IPs relacionados",
      "Possível varredura interna",
      "Tráfego para destino raro",
      "Volume incomum de saída",
      "Falha de correlação por horário"
    ],
    "diagnosticQuestions": [
      "Qual foi o primeiro evento conhecido?",
      "O IP era de qual host naquele horário?",
      "Qual usuário ou processo estava envolvido?",
      "O tráfego foi permitido, bloqueado ou apenas observado?",
      "Há mudança recente de deploy, firewall, rota, script ou credencial?",
      "Existe comportamento semelhante em outros ativos?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetTCPConnection | Sort-Object State,RemoteAddress | Select-Object -First 20",
        "purpose": "Observar conexões ativas locais em investigação autorizada.",
        "expectedObservation": "Lista de conexões com endereço remoto, porta e estado.",
        "interpretation": "Ajuda a validar se há conexões ativas para destinos suspeitos."
      },
      {
        "platform": "Windows",
        "command": "Get-WinEvent -LogName Security -MaxEvents 20",
        "purpose": "Consultar eventos recentes de segurança no host.",
        "expectedObservation": "Eventos com horário, ID e detalhes.",
        "interpretation": "Deve ser correlacionado com SIEM e IAM."
      },
      {
        "platform": "Linux",
        "command": "ss -tupn && journalctl --since '1 hour ago'",
        "purpose": "Ver conexões e logs recentes em host Linux autorizado.",
        "expectedObservation": "Sockets ativos e eventos de sistema.",
        "interpretation": "Ajuda a ligar processo local a tráfego observado."
      },
      {
        "platform": "Linux",
        "command": "sudo tcpdump -nn -i any host <ip_suspeito> -c 50",
        "purpose": "Capturar amostra limitada e autorizada de tráfego para validação.",
        "expectedObservation": "Pacotes com origem, destino, porta e protocolo.",
        "interpretation": "Usar apenas em ambiente autorizado e sem capturar dados sensíveis desnecessários."
      },
      {
        "platform": "SIEM",
        "command": "Buscar por src_ip, dest_ip, user, hostname e janela temporal do alerta",
        "purpose": "Correlacionar eventos de múltiplas fontes.",
        "expectedObservation": "Eventos de firewall, DNS, DHCP, IAM, EDR, NDR e proxy.",
        "interpretation": "A linha do tempo deve explicar a sequência de eventos, não apenas listar logs."
      }
    ],
    "decisionTree": [
      {
        "if": "Alerta tem IP dinâmico",
        "then": "Consultar DHCP/NAT no horário exato antes de atribuir host."
      },
      {
        "if": "Há tráfego lateral para muitos destinos",
        "then": "Verificar ferramenta administrativa autorizada, mudança recente, EDR e autenticações."
      },
      {
        "if": "Há volume de saída incomum",
        "then": "Verificar backup, job legítimo, destino, processo, usuário, proxy e classificação do dado."
      },
      {
        "if": "Evidências convergem para incidente provável",
        "then": "Escalar, preservar evidência e aplicar contenção proporcional."
      },
      {
        "if": "Evidência é inconclusiva",
        "then": "Manter caso documentado, abrir melhoria de telemetria e definir monitoramento temporário."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Separar alerta, hipótese, evidência e conclusão.",
      "Manter playbooks curtos o suficiente para uso sob pressão.",
      "Definir evidências mínimas por tipo de alerta.",
      "Registrar decisões e justificativas.",
      "Executar tabletop exercises e simulações periódicas.",
      "Revisar playbooks após incidentes reais ou falsos positivos relevantes."
    ],
    "badPractices": [
      "Bloquear rede inteira sem análise de impacto.",
      "Fechar alerta apenas porque o ativo é conhecido.",
      "Depender de uma única fonte de log.",
      "Ignorar DHCP, NAT e timezone.",
      "Automatizar contenção destrutiva sem critérios e aprovação.",
      "Criar playbook longo demais para ser usado em plantão."
    ],
    "commonErrors": [
      "Confundir evento com incidente.",
      "Não preservar evidência.",
      "Não identificar dono do ativo.",
      "Ignorar mudança recente em firewall, cloud ou pipeline.",
      "Não comunicar incerteza ao gestor."
    ],
    "vulnerabilities": [
      {
        "name": "Investigação sem contexto",
        "description": "Quando o SOC investiga apenas IPs e portas, sem usuário, ativo, aplicação e horário confiável.",
        "defensiveExplanation": "Isso aumenta falsos positivos e permite que incidentes reais passem como ruído.",
        "mitigation": "Inventário, CMDB, DHCP/NAT logs, IAM, EDR e enriquecimento no SIEM."
      },
      {
        "name": "Contenção não proporcional",
        "description": "Ação de bloqueio ampla executada sem considerar impacto e evidência.",
        "defensiveExplanation": "Pode gerar indisponibilidade e perda de dados de investigação.",
        "mitigation": "Critérios de severidade, aprovação, matriz de impacto e contenção por menor escopo."
      },
      {
        "name": "Playbook desatualizado",
        "description": "Procedimento aponta para ferramentas, logs ou times que não existem mais.",
        "defensiveExplanation": "Durante incidente, isso aumenta tempo de resposta.",
        "mitigation": "Revisão periódica, simulações e pós-incidente com atualização obrigatória."
      }
    ],
    "monitoring": [
      "MTTD",
      "MTTR",
      "tempo de triagem",
      "falsos positivos",
      "casos reabertos",
      "gaps de telemetria",
      "tempo até contenção",
      "quantidade de playbooks testados"
    ],
    "hardening": [
      "NTP obrigatório",
      "retenção mínima de logs",
      "controle de acesso ao SIEM",
      "imutabilidade de logs críticos",
      "backup de configurações",
      "tags e dono de ativo"
    ],
    "detectionIdeas": [
      "varredura interna incomum",
      "falhas de autenticação distribuídas",
      "destino externo raro",
      "volume anômalo por host",
      "DNS raro ou de alta entropia",
      "conexões administrativas fora de janela",
      "mudança de regra antes de anomalia"
    ]
  },
  "lab": {
    "id": "lab-13.9",
    "title": "Construindo um playbook defensivo de investigação de rede",
    "labType": "security",
    "objective": "Criar um playbook para investigar um alerta simulado de possível movimento lateral sem executar nenhuma ação ofensiva.",
    "scenario": "O SIEM gerou alerta: host FIN-WS-023 iniciou conexões TCP para múltiplos servidores internos nas portas 445, 3389 e 5985 entre 02:10 e 02:18. O host pertence ao setor financeiro. Há suspeita de movimento lateral, mas também existe possibilidade de script administrativo ou ferramenta de inventário.",
    "topology": "FIN-WS-023 -> VLAN Financeiro -> Firewall interno -> VLAN Servidores -> AD/RADIUS/DNS/DHCP -> SIEM/NDR/EDR",
    "architecture": "Ambiente corporativo segmentado com firewall leste-oeste, DNS interno, DHCP, EDR, NDR, SIEM e autenticação centralizada.",
    "prerequisites": [
      "Conhecer defesa em profundidade",
      "Entender segmentação e logs",
      "Ter lido as aulas 13.4, 13.5 e 13.7",
      "Usar apenas eventos simulados"
    ],
    "tools": [
      "Editor de texto",
      "Planilha opcional",
      "SIEM conceitual",
      "Eventos simulados fornecidos na aula",
      "Opcional: draw.io offline ou diagrama textual"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras reais.",
      "Não tente reproduzir movimento lateral.",
      "Não capture tráfego de terceiros.",
      "Use somente dados simulados ou ambiente autorizado.",
      "Não bloqueie recursos reais sem autorização formal."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir gatilho e objetivo",
        "instruction": "Escreva o gatilho do playbook e o objetivo da investigação.",
        "command": "Gatilho: alerta de conexões administrativas múltiplas de um host de usuário para servidores internos.",
        "expectedOutput": "Objetivo claro: determinar se é atividade autorizada, erro operacional ou incidente provável.",
        "explanation": "Sem objetivo, o playbook vira lista de comandos sem decisão."
      },
      {
        "number": 2,
        "title": "Listar perguntas iniciais",
        "instruction": "Crie perguntas que o analista deve responder nos primeiros 15 minutos.",
        "command": "Exemplos: Quem é o dono do host? Qual usuário estava logado? O IP era desse host no horário? Houve mudança planejada? O tráfego foi permitido? Há EDR alertando?",
        "expectedOutput": "Lista com pelo menos 8 perguntas de triagem.",
        "explanation": "Perguntas boas reduzem busca aleatória."
      },
      {
        "number": 3,
        "title": "Mapear fontes de evidência",
        "instruction": "Associe cada pergunta a uma fonte de log.",
        "command": "DHCP -> IP/host; AD/IAM -> usuário; firewall -> fluxo; EDR -> processo; DNS -> nomes; NDR -> padrão; CMDB -> criticidade.",
        "expectedOutput": "Tabela pergunta -> fonte -> campo esperado.",
        "explanation": "Playbook maduro diz onde procurar cada resposta."
      },
      {
        "number": 4,
        "title": "Construir linha do tempo",
        "instruction": "Use eventos simulados e ordene por horário.",
        "command": "02:09 logon usuário; 02:10 início conexões; 02:12 DNS servidores; 02:14 alerta NDR; 02:16 bloqueio parcial; 02:20 ticket aberto.",
        "expectedOutput": "Linha do tempo com eventos em ordem e lacunas destacadas.",
        "explanation": "Linha do tempo ajuda a separar causa, efeito e coincidência."
      },
      {
        "number": 5,
        "title": "Definir critérios de severidade",
        "instruction": "Crie regras para classificar baixo, médio, alto e crítico.",
        "command": "Crítico se houver credencial privilegiada, múltiplos servidores críticos, EDR confirmando execução suspeita ou exfiltração associada.",
        "expectedOutput": "Matriz de severidade com critérios objetivos.",
        "explanation": "Critérios reduzem decisão emocional."
      },
      {
        "number": 6,
        "title": "Definir ações de contenção proporcional",
        "instruction": "Liste ações possíveis e quando aplicá-las.",
        "command": "Monitorar, bloquear destino específico, isolar host, revogar sessão, resetar senha, acionar infraestrutura, abrir incidente maior.",
        "expectedOutput": "Tabela ação -> condição -> aprovação -> risco operacional.",
        "explanation": "Contenção precisa reduzir risco com menor impacto possível."
      },
      {
        "number": 7,
        "title": "Criar comunicação técnica e executiva",
        "instruction": "Escreva um resumo técnico e um resumo executivo do mesmo caso.",
        "command": "Técnico: host, portas, eventos, fontes, hipóteses. Executivo: impacto, risco, ação, próximo marco.",
        "expectedOutput": "Duas mensagens adequadas ao público.",
        "explanation": "SOC precisa comunicar incerteza e impacto de forma compreensível."
      },
      {
        "number": 8,
        "title": "Fechar com lições aprendidas",
        "instruction": "Liste melhorias que o caso pode gerar.",
        "command": "Melhorar regra de detecção, ajustar segmentação, corrigir inventário, revisar janela de scripts, aumentar retenção de DHCP.",
        "expectedOutput": "Pelo menos 5 ações de melhoria contínua.",
        "explanation": "Todo playbook deve evoluir a partir de uso real ou simulado."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um playbook completo para alerta de possível movimento lateral, incluindo gatilho, perguntas, evidências, linha do tempo, severidade, contenção, comunicação e melhoria.",
    "validation": [
      {
        "check": "Playbook separa alerta, hipótese e conclusão",
        "command": "Revisar se cada seção usa esses termos separadamente",
        "expected": "Nenhuma conclusão sem evidência associada",
        "ifFails": "Reescrever etapas removendo afirmações categóricas sem fonte."
      },
      {
        "check": "Cada pergunta tem fonte de evidência",
        "command": "Verificar tabela pergunta -> fonte",
        "expected": "Todas as perguntas mapeadas a logs ou responsáveis",
        "ifFails": "Adicionar fonte ou remover pergunta não verificável."
      },
      {
        "check": "Contenção é proporcional",
        "command": "Revisar matriz ação -> condição -> risco",
        "expected": "Ações destrutivas exigem severidade e aprovação",
        "ifFails": "Adicionar aprovações e alternativas menos intrusivas."
      },
      {
        "check": "Linha do tempo usa horário consistente",
        "command": "Conferir timezone e sequência",
        "expected": "Eventos ordenados e lacunas identificadas",
        "ifFails": "Adicionar nota de NTP/timezone e campos ausentes."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não é possível identificar host pelo IP",
        "probableCause": "DHCP/NAT sem retenção suficiente",
        "howToConfirm": "Verificar logs DHCP/NAT no horário do alerta",
        "fix": "Registrar gap e propor retenção mínima e envio ao SIEM."
      },
      {
        "symptom": "Firewall mostra tráfego, mas EDR não mostra processo",
        "probableCause": "EDR sem cobertura, host offline ou telemetria atrasada",
        "howToConfirm": "Checar status do agente e último check-in",
        "fix": "Acionar endpoint/infra e marcar limitação no caso."
      },
      {
        "symptom": "Alerta se repete todo dia no mesmo horário",
        "probableCause": "Script administrativo legítimo não documentado",
        "howToConfirm": "Consultar mudanças, agendamentos e dono do ativo",
        "fix": "Documentar exceção, ajustar regra e garantir escopo mínimo."
      },
      {
        "symptom": "Contenção proposta pode derrubar aplicação crítica",
        "probableCause": "Dependências não mapeadas",
        "howToConfirm": "Consultar CMDB, dono do serviço e fluxos conhecidos",
        "fix": "Aplicar contenção mais específica ou janela aprovada."
      }
    ],
    "improvements": [
      "Criar biblioteca de queries por fonte",
      "Executar tabletop trimestral",
      "Medir tempo de triagem",
      "Adicionar dono de ativo ao SIEM",
      "Revisar retenção DHCP/NAT",
      "Automatizar enriquecimento sem automatizar contenção destrutiva"
    ],
    "evidenceToCollect": [
      "Linha do tempo",
      "Eventos de firewall",
      "Eventos DNS",
      "Histórico DHCP/NAT",
      "Alertas NDR/EDR",
      "Usuário logado",
      "Criticidade do ativo",
      "Decisão e justificativa",
      "Resumo executivo",
      "Lista de melhorias"
    ],
    "questions": [
      "Qual evidência confirma que o host era FIN-WS-023 naquele horário?",
      "Que hipótese legítima poderia explicar o tráfego?",
      "Que evidência aumentaria severidade?",
      "Qual contenção é proporcional?",
      "Que melhoria reduz a chance de repetição?"
    ],
    "challenge": "Transforme o playbook criado para também cobrir possível exfiltração por volume anormal de saída, indicando quais campos e fontes mudam.",
    "solution": "Para exfiltração, troque parte das perguntas: destino externo, reputação, país/região, volume, processo, usuário, classificação do dado, proxy, TLS SNI quando disponível, DNS, cloud storage, CASB/DLP se existir e baseline histórico. A contenção pode envolver bloqueio de destino específico, revogação de sessão, isolamento do host e preservação de evidência. A decisão deve separar backup legítimo, job de ETL, sincronização autorizada e vazamento provável."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um playbook não deve ser apenas uma lista de comandos?",
      "hints": [
        "Pense em hipótese.",
        "Pense em decisão e evidência."
      ],
      "expectedIdeas": [
        "objetivo",
        "contexto",
        "hipótese",
        "evidência",
        "severidade",
        "ação proporcional"
      ],
      "explanation": "Comandos coletam dados; playbook organiza raciocínio para transformar dados em decisão."
    },
    {
      "type": "diagnóstico",
      "question": "Um alerta mostra várias conexões SMB internas. O que você verifica antes de chamar isso de movimento lateral?",
      "hints": [
        "DHCP e usuário importam.",
        "Pode haver script legítimo."
      ],
      "expectedIdeas": [
        "host correto",
        "usuário",
        "janela de manutenção",
        "EDR",
        "firewall",
        "AD",
        "NDR",
        "histórico"
      ],
      "explanation": "Movimento lateral é hipótese, não conclusão automática."
    },
    {
      "type": "cenário real",
      "question": "O gestor pede uma resposta em cinco minutos. Como comunicar sem afirmar mais do que as evidências permitem?",
      "hints": [
        "Separe confirmado, provável e pendente.",
        "Inclua impacto e próxima ação."
      ],
      "expectedIdeas": [
        "incerteza",
        "evidências atuais",
        "risco",
        "ações em andamento",
        "próximo marco"
      ],
      "explanation": "Boa comunicação executiva mostra risco e plano sem inventar certeza."
    }
  ],
  "quiz": [
    {
      "id": "q13.9.1",
      "type": "conceito",
      "q": "Qual é a principal função de um playbook de investigação de rede?",
      "opts": [
        "Padronizar perguntas, evidências, decisões e ações para um tipo de alerta",
        "Substituir completamente o analista humano",
        "Executar ataques controlados em produção",
        "Guardar senhas de emergência do SOC"
      ],
      "a": 0,
      "exp": "Playbook organiza investigação e resposta; não substitui raciocínio humano nem autoriza ação ofensiva.",
      "difficulty": "iniciante",
      "topic": "playbook"
    },
    {
      "id": "q13.9.2",
      "type": "diagnóstico",
      "q": "Um alerta mostra um IP interno suspeito. Qual validação é crítica antes de atribuir o evento a um host?",
      "opts": [
        "Consultar DHCP/NAT no horário do evento",
        "Trocar a senha de todos os usuários",
        "Desligar o switch core",
        "Ignorar porque é IP privado"
      ],
      "a": 0,
      "exp": "Em redes com DHCP/NAT, IP sem horário e correlação pode apontar para host errado.",
      "difficulty": "intermediário",
      "topic": "evidência"
    },
    {
      "id": "q13.9.3",
      "type": "segurança",
      "q": "Por que contenção ampla sem análise pode ser perigosa?",
      "opts": [
        "Porque pode causar indisponibilidade e perda de evidências",
        "Porque sempre aumenta performance da rede",
        "Porque elimina a necessidade de RCA",
        "Porque impede geração de logs"
      ],
      "a": 0,
      "exp": "Contenção precisa ser proporcional para reduzir risco sem derrubar operação ou apagar evidência útil.",
      "difficulty": "intermediário",
      "topic": "contenção"
    },
    {
      "id": "q13.9.4",
      "type": "correlação",
      "q": "Qual combinação é mais útil para investigar possível movimento lateral?",
      "opts": [
        "NDR, firewall interno, AD/IAM, EDR, DHCP e DNS",
        "Apenas velocidade do link WAN",
        "Somente temperatura do switch",
        "Apenas inventário de monitores"
      ],
      "a": 0,
      "exp": "Movimento lateral exige correlação entre tráfego, identidade, host, nomes, processos e endereçamento.",
      "difficulty": "intermediário",
      "topic": "correlação"
    },
    {
      "id": "q13.9.5",
      "type": "processo",
      "q": "O que diferencia hipótese de conclusão?",
      "opts": [
        "Hipótese é algo a testar; conclusão exige evidência suficiente",
        "Hipótese é sempre verdadeira",
        "Conclusão vem antes da coleta",
        "Não há diferença em SOC"
      ],
      "a": 0,
      "exp": "Playbooks maduros evitam transformar suspeita inicial em verdade sem validação.",
      "difficulty": "iniciante",
      "topic": "método"
    },
    {
      "id": "q13.9.6",
      "type": "cloud",
      "q": "Em cloud, que evidência costuma ser essencial para explicar uma mudança de tráfego antes de um alerta?",
      "opts": [
        "Audit logs de API e histórico de alteração de security group/rota",
        "A cor do dashboard",
        "O tamanho do monitor do analista",
        "Apenas o nome do provedor"
      ],
      "a": 0,
      "exp": "Cloud networking muda por API e IaC; logs de auditoria e alterações de política explicam causa provável.",
      "difficulty": "intermediário",
      "topic": "cloud"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.9.1",
      "front": "O que é um playbook de investigação?",
      "back": "Um roteiro operacional com gatilho, perguntas, fontes de evidência, critérios de severidade, ações e documentação.",
      "tags": [
        "soc",
        "playbook"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.9.2",
      "front": "Alerta é evidência conclusiva?",
      "back": "Não. Alerta é gatilho para investigação. A conclusão exige evidências correlacionadas.",
      "tags": [
        "alerta",
        "evidência"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.9.3",
      "front": "Por que DHCP/NAT importam em investigação?",
      "back": "Porque associam IP a host ou origem real em um horário específico.",
      "tags": [
        "dhcp",
        "nat",
        "correlação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.9.4",
      "front": "O que é contenção proporcional?",
      "back": "Ação que reduz risco com o menor impacto necessário, preservando evidência e operação.",
      "tags": [
        "contenção",
        "resposta"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.9.5",
      "front": "O que uma linha do tempo deve mostrar?",
      "back": "Primeiro evento conhecido, sequência, pivôs, lacunas, evidências e decisões.",
      "tags": [
        "timeline",
        "dfir"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.9.6",
      "front": "O que deve acontecer após um caso encerrado?",
      "back": "Lições aprendidas, melhoria de detecção, correção de controle e atualização do playbook.",
      "tags": [
        "rca",
        "melhoria contínua"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex13.9.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre evento, alerta, hipótese e incidente confirmado.",
      "expectedAnswer": "Evento é registro bruto; alerta é sinal gerado por regra ou ferramenta; hipótese é explicação a testar; incidente confirmado exige evidência suficiente de impacto ou atividade não autorizada.",
      "explanation": "Separar esses termos evita decisão precipitada."
    },
    {
      "id": "ex13.9.2",
      "type": "diagnóstico",
      "prompt": "Um IP 10.20.5.44 aparece em alerta às 03:12. Que fontes você consulta antes de atribuir o evento a um host?",
      "expectedAnswer": "DHCP no horário, NAT se aplicável, CMDB, EDR, DNS, switch/AP, logs de autenticação e SIEM.",
      "explanation": "IP sem contexto temporal não identifica ator com segurança."
    },
    {
      "id": "ex13.9.3",
      "type": "arquitetura",
      "prompt": "Liste cinco fontes de log essenciais para investigar possível movimento lateral.",
      "expectedAnswer": "Firewall interno, NDR/NetFlow, AD/IAM, EDR, DNS, DHCP, logs de servidor e SIEM.",
      "explanation": "Movimento lateral combina tráfego, autenticação, processos e destino."
    },
    {
      "id": "ex13.9.4",
      "type": "comunicação",
      "prompt": "Escreva um resumo executivo de três frases para um incidente provável ainda em investigação.",
      "expectedAnswer": "Deve conter o que foi observado, risco potencial, ação em andamento e próximo prazo de atualização sem afirmar conclusões não comprovadas.",
      "explanation": "Comunicação executiva precisa ser clara sobre impacto e incerteza."
    }
  ],
  "challenge": {
    "title": "Playbook de triagem para possível movimento lateral",
    "scenario": "O SOC recebeu alerta de conexões administrativas múltiplas de uma estação de usuário para servidores internos. O ambiente tem firewall leste-oeste, AD, DHCP, DNS, EDR, NDR e SIEM, mas os logs de DHCP retêm apenas sete dias.",
    "tasks": [
      "Definir gatilho e objetivo do playbook",
      "Criar perguntas iniciais",
      "Mapear fontes de evidência",
      "Criar matriz de severidade",
      "Definir contenções proporcionais",
      "Criar mensagem técnica e executiva",
      "Listar melhorias pós-caso"
    ],
    "constraints": [
      "Não executar ações ofensivas",
      "Não bloquear sub-rede inteira como primeira ação",
      "Preservar evidências",
      "Considerar falso positivo por script administrativo",
      "Considerar impacto de negócio"
    ],
    "expectedDeliverables": [
      "Playbook em formato de tabela",
      "Linha do tempo simulada",
      "Matriz de severidade",
      "Plano de contenção",
      "Resumo executivo",
      "Lista de melhorias"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação entre hipótese e conclusão",
        "points": 20,
        "description": "Não afirma incidente sem evidência."
      },
      {
        "criterion": "Mapeamento de fontes",
        "points": 20,
        "description": "Cada pergunta possui fonte de evidência."
      },
      {
        "criterion": "Contenção proporcional",
        "points": 20,
        "description": "Ações reduzem risco sem impacto desnecessário."
      },
      {
        "criterion": "Comunicação",
        "points": 20,
        "description": "Resumo técnico e executivo são claros."
      },
      {
        "criterion": "Melhoria contínua",
        "points": 20,
        "description": "Inclui ajustes de detecção, logging e processo."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Começamos tratando o alerta como sinal, não conclusão. Em seguida validamos identidade do host no horário, contexto de negócio, usuário, processo, tráfego, autenticações e mudanças recentes. Só então classificamos severidade e decidimos contenção.",
    "steps": [
      "Confirmar horário, timezone e fonte do alerta.",
      "Consultar DHCP/NAT para mapear IP ao host correto.",
      "Consultar CMDB para dono e criticidade.",
      "Verificar EDR para processo, usuário logado e alertas correlatos.",
      "Consultar firewall/NDR/NetFlow para destinos, portas, volume e decisão.",
      "Consultar AD/IAM para autenticações, falhas e privilégios.",
      "Verificar mudanças recentes em scripts, manutenção, deploy e firewall.",
      "Classificar severidade com critérios objetivos.",
      "Aplicar contenção proporcional e documentada.",
      "Fechar com RCA, melhoria de controle e atualização do playbook."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Isolar imediatamente toda a VLAN Financeiro.",
        "whyItIsWrong": "Pode parar operação crítica sem evidência suficiente e não preserva análise proporcional."
      },
      {
        "answer": "Fechar como falso positivo porque o host é corporativo.",
        "whyItIsWrong": "Ativos corporativos também podem ser comprometidos ou executar credenciais abusadas."
      },
      {
        "answer": "Investigar apenas firewall.",
        "whyItIsWrong": "Firewall mostra fluxo, mas não necessariamente usuário, processo, causa ou escopo."
      }
    ],
    "finalAnswer": "Um bom playbook para esse caso valida IP/host, usuário, processo, destino, decisão do controle, mudanças recentes e comportamento histórico; classifica severidade; aplica contenção proporcional; comunica risco com incerteza explícita; preserva evidências; e gera melhorias de logging, detecção e arquitetura."
  },
  "glossary": [
    {
      "term": "Playbook",
      "shortDefinition": "Roteiro estruturado para investigação ou resposta a um cenário recorrente.",
      "longDefinition": "Documento operacional que define gatilhos, perguntas, evidências, ações, critérios de severidade, comunicação e encerramento para um tipo de alerta ou incidente.",
      "example": "Playbook para possível movimento lateral por conexões SMB internas.",
      "relatedTerms": [
        "runbook",
        "SOC",
        "incidente"
      ],
      "relatedLessons": [
        "13.5",
        "13.7",
        "13.9"
      ]
    },
    {
      "term": "Triagem",
      "shortDefinition": "Primeira avaliação de um alerta para determinar prioridade e próximos passos.",
      "longDefinition": "Processo de validar fonte, horário, contexto, criticidade, duplicidade e severidade inicial.",
      "example": "Verificar se um alerta de NDR está relacionado a manutenção autorizada.",
      "relatedTerms": [
        "severidade",
        "alerta"
      ],
      "relatedLessons": [
        "13.9"
      ]
    },
    {
      "term": "Linha do tempo",
      "shortDefinition": "Sequência ordenada de eventos relevantes.",
      "longDefinition": "Representação temporal que ajuda a entender causa, efeito, pivôs, lacunas e escopo de uma investigação.",
      "example": "Logon às 02:09, conexões às 02:10, alerta às 02:14.",
      "relatedTerms": [
        "timestamp",
        "NTP",
        "evidência"
      ],
      "relatedLessons": [
        "13.5",
        "13.9"
      ]
    },
    {
      "term": "Contenção",
      "shortDefinition": "Ação para limitar impacto de um incidente provável ou confirmado.",
      "longDefinition": "Pode incluir bloqueio específico, isolamento de host, revogação de credencial, regra temporária ou mitigação controlada.",
      "example": "Bloquear comunicação do host suspeito para servidores críticos sem derrubar toda a VLAN.",
      "relatedTerms": [
        "resposta",
        "severidade"
      ],
      "relatedLessons": [
        "13.7",
        "13.9"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de entender por que o evento ocorreu e quais ações evitam recorrência.",
      "example": "Identificar que uma exceção de firewall antiga permitiu tráfego lateral indevido.",
      "relatedTerms": [
        "lições aprendidas",
        "melhoria contínua"
      ],
      "relatedLessons": [
        "13.9",
        "15.12"
      ]
    },
    {
      "term": "Tabletop exercise",
      "shortDefinition": "Simulação guiada de resposta a incidente sem executar ações reais no ambiente.",
      "longDefinition": "Exercício usado para testar playbooks, papéis, comunicação, decisões e lacunas de processo.",
      "example": "Simular alerta de exfiltração para treinar SOC, rede, IAM e jurídico.",
      "relatedTerms": [
        "simulação",
        "playbook",
        "SOC"
      ],
      "relatedLessons": [
        "13.9",
        "17.7"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations for Cybersecurity Risk Management",
      "organization": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/specialpublications/nist.sp.800-61r3.pdf",
      "note": "Base para integrar resposta a incidente ao CSF 2.0 e atividades contínuas de risco."
    },
    {
      "type": "official-doc",
      "title": "Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf",
      "note": "Funções Govern, Identify, Protect, Detect, Respond e Recover usadas para organizar resultados de segurança."
    },
    {
      "type": "official-doc",
      "title": "Federal Government Cybersecurity Incident and Vulnerability Response Playbooks",
      "organization": "CISA",
      "url": "https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks",
      "note": "Referência de procedimentos padronizados para identificar, coordenar, remediar, recuperar e acompanhar mitigação."
    },
    {
      "type": "official-doc",
      "title": "Network Traffic Flow — Data Component DC0078",
      "organization": "MITRE ATT&CK",
      "url": "https://attack.mitre.org/datacomponents/DC0078/",
      "note": "Define dados de fluxo de rede como metadados resumidos de sessão úteis para análise e detecção."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "Logs e correlação são a base dos playbooks."
    },
    {
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.12",
      "reason": "War room, RCA e comunicação serão aprofundados em Troubleshooting Profissional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "mXX",
      "lesson": "observabilidade-e-incidentes",
      "reason": "Playbooks dependem de observabilidade, pipelines e rastreabilidade de mudanças."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "mXX",
      "lesson": "logs-de-identidade",
      "reason": "Investigações de rede precisam correlacionar fluxo com identidade e autenticação."
    }
  ],
  "pedagogicalMap": {
    "problem": "Alertas sem playbook geram improviso, decisões inconsistentes e perda de evidência.",
    "concept": "Playbook é roteiro operacional para investigar e responder a cenários recorrentes.",
    "internalMechanism": "Gatilho, triagem, contexto, hipótese, evidência, linha do tempo, escopo, resposta, comunicação e melhoria.",
    "realUse": "SOC e Blue Team usam playbooks para investigar varredura, movimento lateral, exfiltração e falhas de controle.",
    "commonMistake": "Confundir alerta com incidente confirmado.",
    "securityImpact": "Melhora resposta e reduz falso positivo/falso negativo quando baseado em evidência.",
    "operationalImpact": "Padroniza plantão, escalonamento e comunicação, mas exige manutenção e treinamento.",
    "summary": "Playbook transforma telemetria em investigação repetível e decisão proporcional."
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
      "13.10"
    ]
  }
};
