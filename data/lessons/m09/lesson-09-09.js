export const lesson0909 = {
  "id": "9.9",
  "moduleId": "m09",
  "order": 9,
  "title": "Governança de regras: revisão, exceções e policy as code",
  "subtitle": "Como controlar o ciclo de vida de regras de firewall, WAF, security groups e NACLs com dono, justificativa, validade, revisão, evidências, automação e política como código.",
  "duration": "125–190 min",
  "estimatedStudyTimeMinutes": 190,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 290,
  "tags": [
    "firewall",
    "governança",
    "policy as code",
    "IaC",
    "DevSecOps",
    "exceções",
    "auditoria",
    "CMDB",
    "SIEM",
    "drift",
    "compliance",
    "revisão de regras",
    "p1-07",
    "firewall-lab-v2-final"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.1",
      "title": "Por que firewalls existem",
      "reason": "É necessário entender que regras controlam risco, não apenas conectividade."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.2",
      "title": "ACLs, regras e ordem de processamento",
      "reason": "Governança depende de entender como regras são avaliadas e como shadowing acontece."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.4",
      "title": "Zonas, DMZ e segmentação segura",
      "reason": "A revisão de regras precisa saber quais zonas deveriam se comunicar."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.8",
      "title": "Troubleshooting de políticas com logs, contadores e packet capture",
      "reason": "Revisão de regras usa evidências de uso, logs e contadores."
    },
    {
      "type": "external-course",
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, pipelines e policy as code",
      "reason": "Policy as code depende de versionamento, revisão e automação vistos na trilha de DevSecOps."
    }
  ],
  "objectives": [
    "Explicar por que regras de firewall precisam de governança de ciclo de vida.",
    "Diferenciar regra permanente, regra temporária, exceção, emergência e compensating control.",
    "Criar critérios de revisão para regras amplas, antigas, sem dono, sem log ou sem validade.",
    "Descrever como policy as code reduz drift e melhora rastreabilidade.",
    "Construir um modelo de solicitação de regra com origem, destino, porta, dono, justificativa, validade e evidência.",
    "Relacionar governança de regras a auditoria, resposta a incidentes, SIEM, cloud e DevSecOps."
  ],
  "learningOutcomes": [
    "Ao final, você conseguirá avaliar se uma regra é tecnicamente necessária, suficientemente restrita e governável.",
    "Você conseguirá propor um fluxo de aprovação e revisão de exceções sem transformar segurança em burocracia inútil.",
    "Você conseguirá desenhar validações de policy as code para bloquear padrões perigosos antes do deploy.",
    "Você conseguirá explicar por que regras sem dono e sem expiração são passivos de segurança."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h3>Motivação</h3>\n  \n<p>Uma regra de firewall raramente nasce como problema. Normalmente ela nasce como solução: alguém precisa publicar uma API, permitir que um servidor consulte um banco, liberar um fornecedor, abrir uma porta para troubleshooting ou conectar uma filial. O problema aparece meses depois, quando ninguém lembra por que a regra existe, quem pediu, se ainda é necessária, se foi aberta de forma ampla demais ou se virou o caminho preferido de um atacante.</p>\n<p>Em ambientes corporativos, o risco não está apenas em uma regra errada. O risco está no acúmulo de exceções sem dono, regras temporárias que nunca expiram, liberações emergenciais que não foram revisadas, políticas criadas manualmente sem histórico e divergências entre o que está no desenho, no firewall, no Terraform, no ticket e no SIEM.</p>\n<div class=\"callout callout--problem\"><strong>Ideia central:</strong> firewall bom não é apenas firewall que bloqueia. É firewall governado: cada regra tem motivo, dono, validade, evidência, aprovação, log, revisão e forma segura de alteração.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h3>História</h3>\n  \n<p>No início das redes corporativas, muitas regras eram criadas diretamente no equipamento por administradores experientes. O ambiente era menor, havia menos aplicações, menos cloud, menos integrações externas e menos pressão por mudanças rápidas. Com o crescimento da internet, das DMZs, das integrações B2B, dos data centers, de múltiplas clouds e de pipelines DevOps, a quantidade de regras cresceu muito mais rápido do que a capacidade humana de revisá-las manualmente.</p>\n<p>Primeiro surgiram planilhas de firewall. Depois apareceram fluxos por ticket, CMDB, revisão periódica, scanners de exposição, logs centralizados, ferramentas de análise de regra, automação por API e, mais recentemente, policy as code. A evolução natural foi sair de “configuração manual de equipamento” para “controle de mudança auditável, versionado e testável”.</p>\n<p>Essa mudança acompanha uma tendência vista nos cursos de Infraestrutura Moderna e DevSecOps: configuração crítica deve ser tratada como código, passar por revisão, ter validação automatizada, gerar evidências e permitir rollback.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h3>Problema</h3>\n  \n<p>O problema que a governança de regras resolve é o descontrole operacional e de segurança das políticas de tráfego. Uma regra isolada pode parecer simples: origem, destino, protocolo, porta e ação. Mas uma base real de regras pode ter milhares de entradas, objetos duplicados, grupos herdados, exceções antigas, shadowing, regras redundantes, permissões amplas, NATs esquecidos, publicações diretas, rotas paralelas e diferenças entre ambientes.</p>\n<table class=\"data-table\"><thead><tr><th>Sintoma</th><th>Causa frequente</th><th>Impacto</th></tr></thead><tbody>\n<tr><td>Regra temporária ativa há anos</td><td>Ausência de validade e revisão</td><td>Superfície de ataque permanente</td></tr>\n<tr><td>Regra any-any</td><td>Pressa, troubleshooting sem rollback ou requisito mal definido</td><td>Movimento lateral e bypass de segmentação</td></tr>\n<tr><td>Backend acessível diretamente</td><td>Publicação fora do WAF/API Gateway</td><td>Bypass de inspeção e autenticação de borda</td></tr>\n<tr><td>Regras sem dono</td><td>Sem CMDB, ticket ou owner técnico</td><td>Ninguém autoriza remoção por medo de indisponibilidade</td></tr>\n<tr><td>Configuração manual sem versionamento</td><td>Mudança direta no console</td><td>Drift, baixa rastreabilidade e rollback difícil</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Risco clássico:</strong> quando ninguém sabe para que uma regra serve, ela tende a permanecer ativa para sempre. Segurança vira refém do medo de quebrar produção.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h3>Evolução</h3>\n  \n<p>A evolução da gestão de regras pode ser entendida em camadas de maturidade. No nível mais básico, as regras são criadas manualmente e documentadas, quando muito, em comentários. Em um nível intermediário, cada regra nasce de um chamado com aprovação e evidência. Em um nível maduro, a regra é descrita como código, passa por revisão, recebe testes automáticos, é aplicada por pipeline, monitorada por logs e revisada com prazo.</p>\n<ol class=\"flow-list\">\n<li><strong>Operação manual:</strong> alterações diretas no firewall, geralmente rápidas, mas difíceis de auditar.</li>\n<li><strong>Ticket e aprovação:</strong> cada regra passa por solicitação, justificativa, aprovação técnica e registro.</li>\n<li><strong>Inventário e revisão:</strong> regras têm dono, validade, criticidade, ambiente e revisão periódica.</li>\n<li><strong>Automação e API:</strong> mudanças são aplicadas por ferramentas e não apenas por cliques manuais.</li>\n<li><strong>Policy as code:</strong> política declarativa, versionada, revisada, testada e aplicada por pipeline.</li>\n<li><strong>Governança contínua:</strong> detecção de drift, exposição pública, regra ampla, exceção vencida e divergência entre intenção e realidade.</li>\n</ol>\n<p>Essa evolução não elimina a necessidade de julgamento humano. Ela reduz erro repetitivo, aumenta rastreabilidade e impede que exceções emergenciais virem arquitetura permanente.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h3>Conceito</h3>\n  \n<p><strong>Governança de regras</strong> é o conjunto de práticas que controla o ciclo de vida das políticas de tráfego: solicitação, desenho, aprovação, implementação, validação, monitoramento, revisão, expiração e remoção. Ela responde a perguntas que o firewall sozinho não responde.</p>\n<div class=\"definition-box\">\n<p><strong>Regra bem governada:</strong> possui origem, destino, protocolo, porta, ação, ambiente, dono, sistema, justificativa, ticket, criticidade, validade, evidência de teste, log esperado, plano de rollback e data de revisão.</p>\n</div>\n<p><strong>Policy as code</strong> é a prática de representar políticas de segurança como arquivos versionados e revisáveis, normalmente integrados a IaC, CI/CD e controles automatizados. Isso permite revisão por pares, histórico de mudanças, testes de conformidade, detecção de regras perigosas e rollback controlado.</p>\n<p>É importante não confundir governança com burocracia vazia. Governança boa reduz o tempo de decisão porque define critérios claros. Governança ruim apenas adiciona aprovação manual sem melhorar segurança, rastreabilidade ou disponibilidade.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h3>Funcionamento interno</h3>\n  \n<p>Internamente, uma mudança de regra deveria seguir um fluxo previsível. Primeiro, alguém declara a necessidade de comunicação. Depois, a necessidade é traduzida para uma matriz de fluxo. Em seguida, a equipe valida se o fluxo é coerente com a arquitetura, se passa pelo ponto de controle correto, se existe alternativa mais segura e se a regra deve ser temporária ou permanente.</p>\n<ol class=\"flow-list\">\n<li><strong>Solicitação:</strong> sistema A precisa acessar sistema B por protocolo e porta específicos.</li>\n<li><strong>Classificação:</strong> ambiente, criticidade, dados envolvidos, zona de origem, zona de destino e exposição externa.</li>\n<li><strong>Análise de menor privilégio:</strong> restringir origem, destino, porta, protocolo, método HTTP, path, identidade e tempo.</li>\n<li><strong>Aprovação:</strong> dono da aplicação, rede, segurança e operação aprovam conforme risco.</li>\n<li><strong>Implementação:</strong> regra aplicada manualmente controlada ou via pipeline/policy as code.</li>\n<li><strong>Validação:</strong> teste positivo do fluxo permitido e teste negativo do que deve continuar bloqueado.</li>\n<li><strong>Monitoramento:</strong> logs, contadores, alertas e correlação no SIEM.</li>\n<li><strong>Revisão:</strong> remover regra vencida, sem uso, ampla demais, duplicada ou sem dono.</li>\n</ol>\n<p>Em policy as code, o mesmo fluxo aparece como pull request: o arquivo muda, testes rodam, políticas de qualidade verificam padrões perigosos, revisores analisam, o pipeline aplica e um mecanismo de drift detecta alterações fora do código.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h3>Arquitetura</h3>\n  \n<p>A arquitetura de governança precisa unir pessoas, processos e tecnologia. Não basta ter firewall moderno se a criação de regras acontece fora de um fluxo controlado. Também não basta ter processo formal se as regras continuam sendo aplicadas sem log, sem revisão e sem validação técnica.</p>\n<table class=\"comparison-table\"><thead><tr><th>Componente</th><th>Papel na governança</th><th>Falha comum</th></tr></thead><tbody>\n<tr><td>CMDB/inventário</td><td>Relaciona regra com sistema, dono e criticidade</td><td>Objeto técnico sem dono de negócio</td></tr>\n<tr><td>ITSM/ticket</td><td>Registra solicitação, aprovação e evidência</td><td>Chamado genérico sem matriz de fluxo</td></tr>\n<tr><td>Git/IaC</td><td>Versiona política e permite revisão</td><td>Console manual causando drift</td></tr>\n<tr><td>Pipeline</td><td>Valida padrões e aplica mudanças</td><td>Sem teste para regra ampla ou porta administrativa</td></tr>\n<tr><td>Firewall/WAF/Cloud</td><td>Executa a política</td><td>Regras duplicadas, shadowing e exceções vencidas</td></tr>\n<tr><td>SIEM/APM</td><td>Observa uso, bloqueios e anomalias</td><td>Logs sem contexto ou sem request ID</td></tr>\n</tbody></table>\n<p>Em cloud, a arquitetura deve considerar security groups, NACLs, NSGs, firewalls gerenciados, WAFs, rotas, NAT Gateway, load balancers e endpoints privados. Em Kubernetes, também entram NetworkPolicies, Ingress, service mesh e políticas de egress.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h3>Analogia</h3>\n  \n<p>Imagine um prédio corporativo com portas, catracas e salas restritas. Abrir uma regra de firewall é como entregar uma autorização de passagem. Se a autorização diz “qualquer pessoa pode entrar em qualquer sala, por qualquer motivo, para sempre”, o prédio deixa de ser seguro. Se a autorização diz “João pode entrar na sala do arquivo, pela porta principal, das 14h às 16h, acompanhado, para buscar o documento X, com registro na portaria”, existe controle.</p>\n<p>Policy as code é como deixar essas autorizações em um livro oficial versionado, revisado e assinado, em vez de depender de bilhetes soltos na mesa do porteiro.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h3>Exemplo simples</h3>\n  \n<p>Um servidor web precisa acessar um banco PostgreSQL. Uma regra ruim seria permitir que qualquer servidor da rede acesse qualquer banco na porta 5432. Uma regra melhor define origem exata, destino exato, protocolo TCP, porta 5432, dono da aplicação, ambiente, justificativa, ticket, validade e log.</p>\n<pre><code>origem: app-prod-01\n destino: db-prod-01\n protocolo: tcp\n porta: 5432\n ação: permit\n dono: time-pagamentos\n justificativa: API de pagamentos consulta transações aprovadas\n validade: permanente com revisão trimestral\n log: aceitar e enviar para SIEM</code></pre>\n<p>O ponto importante é que a regra não é apenas uma linha técnica. Ela representa uma decisão de risco.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h3>Exemplo empresarial</h3>\n  \n<p>Em uma empresa grande, uma nova integração B2B precisa permitir que um fornecedor envie arquivos para uma API na DMZ. A governança exige que o fornecedor use IPs fixos, TLS válido, autenticação forte, WAF, rate limit, logs, contrato de API, ambiente segregado e validade inicial de 90 dias. Depois desse período, o uso é revisado com base em logs e necessidade de negócio.</p>\n<p>Sem governança, a liberação poderia virar uma regra ampla de internet para backend. Com governança, a publicação passa por CDN/WAF, load balancer, API Gateway e backend privado, sem acesso administrativo exposto.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h3>Exemplo em cloud</h3>\n  \n<p>Em cloud, regras aparecem como security groups, NACLs, NSGs, firewall policies, WAF rules, route tables e permissões de serviços gerenciados. O risco comum é alguém liberar `0.0.0.0/0` para SSH, RDP, banco de dados ou painel administrativo para resolver rapidamente um problema.</p>\n<p>Uma abordagem governada usa IaC para impedir padrões proibidos, tags obrigatórias para dono e validade, pipelines com checagem de exposição pública e alertas para drift. Exceções podem existir, mas precisam ser explícitas, temporárias, justificadas e monitoradas.</p>\n<pre><code># Exemplo conceitual de regra proibida por policy as code\nentrada:\n  origem: 0.0.0.0/0\n  porta: 22\n  ação: permitir\nresultado: bloquear pipeline, exigir VPN/Bastion/JIT</code></pre>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h3>Exemplo em DevSecOps</h3>\n  \n<p>Em DevSecOps, uma regra de tráfego não deveria ser uma mudança invisível feita no console. Ela deveria nascer em um repositório, ser revisada como pull request, validada por testes automatizados e aplicada por pipeline. O pipeline pode bloquear regras sem dono, sem validade, com origem ampla, porta administrativa pública, destino sensível ou ausência de log.</p>\n<p>Ferramentas de policy as code podem validar regras antes do deploy. O objetivo não é impedir mudança, mas impedir mudança perigosa e não rastreável. Para exceções, o processo deve exigir justificativa, aprovador, prazo de expiração e alerta automático antes do vencimento.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h3>Exemplo em Segurança</h3>\n  \n<p>Do ponto de vista de Segurança da Informação, governança de regra reduz a superfície de ataque e melhora resposta a incidentes. Em um incidente de ransomware, por exemplo, regras amplas entre zonas podem permitir movimento lateral. Regras sem log dificultam reconstruir o caminho. Exceções antigas podem virar porta de entrada. Falta de owner atrasa decisões de bloqueio.</p>\n<p>Uma base governada permite responder rapidamente: quais regras permitem acesso ao ativo comprometido, quem é dono, quais fluxos existem, quais logs devem ser analisados, quais exceções estão ativas e quais regras podem ser revogadas com menor risco operacional.</p>\n<div class=\"callout callout--security\"><strong>Visão defensiva:</strong> governança não é apenas compliance. É capacidade real de reduzir blast radius, responder a incidentes e remover risco acumulado.</div>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h3>Diagrama SVG</h3>\n  \n<svg class=\"lesson-svg\" viewBox=\"0 0 960 560\" role=\"img\" aria-labelledby=\"m09l09-title m09l09-desc\">\n  <title id=\"m09l09-title\">Ciclo de vida governado de regras de firewall e policy as code</title>\n  <desc id=\"m09l09-desc\">Fluxo mostrando solicitação, análise, pull request, validação automatizada, aprovação, aplicação, logs, SIEM, revisão e expiração.</desc>\n  <defs>\n    <marker id=\"m09l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n  </defs>\n  <rect class=\"svg-zone\" x=\"30\" y=\"40\" width=\"900\" height=\"470\" rx=\"22\"></rect>\n  <text class=\"svg-label\" x=\"480\" y=\"75\" text-anchor=\"middle\">Governança de regras: da necessidade ao encerramento</text>\n  <g class=\"svg-node svg-node--client\" transform=\"translate(70 130)\"><rect width=\"145\" height=\"70\" rx=\"14\"></rect><text x=\"72\" y=\"30\" text-anchor=\"middle\">Solicitação</text><text class=\"svg-label--small\" x=\"72\" y=\"52\" text-anchor=\"middle\">fluxo necessário</text></g>\n  <g class=\"svg-node svg-node--security\" transform=\"translate(260 130)\"><rect width=\"145\" height=\"70\" rx=\"14\"></rect><text x=\"72\" y=\"30\" text-anchor=\"middle\">Análise</text><text class=\"svg-label--small\" x=\"72\" y=\"52\" text-anchor=\"middle\">risco e menor privilégio</text></g>\n  <g class=\"svg-node svg-node--cloud\" transform=\"translate(450 130)\"><rect width=\"145\" height=\"70\" rx=\"14\"></rect><text x=\"72\" y=\"30\" text-anchor=\"middle\">Policy as code</text><text class=\"svg-label--small\" x=\"72\" y=\"52\" text-anchor=\"middle\">Git + PR + testes</text></g>\n  <g class=\"svg-node svg-node--firewall\" transform=\"translate(640 130)\"><rect width=\"145\" height=\"70\" rx=\"14\"></rect><text x=\"72\" y=\"30\" text-anchor=\"middle\">Firewall/WAF</text><text class=\"svg-label--small\" x=\"72\" y=\"52\" text-anchor=\"middle\">aplicação controlada</text></g>\n  <g class=\"svg-node svg-node--server\" transform=\"translate(260 315)\"><rect width=\"145\" height=\"70\" rx=\"14\"></rect><text x=\"72\" y=\"30\" text-anchor=\"middle\">Logs e SIEM</text><text class=\"svg-label--small\" x=\"72\" y=\"52\" text-anchor=\"middle\">uso, bloqueio, evidência</text></g>\n  <g class=\"svg-node svg-node--router\" transform=\"translate(450 315)\"><rect width=\"145\" height=\"70\" rx=\"14\"></rect><text x=\"72\" y=\"30\" text-anchor=\"middle\">Revisão</text><text class=\"svg-label--small\" x=\"72\" y=\"52\" text-anchor=\"middle\">owner, validade, uso</text></g>\n  <g class=\"svg-node svg-node--attacker\" transform=\"translate(640 315)\"><rect width=\"145\" height=\"70\" rx=\"14\"></rect><text x=\"72\" y=\"30\" text-anchor=\"middle\">Expiração</text><text class=\"svg-label--small\" x=\"72\" y=\"52\" text-anchor=\"middle\">remoção ou renovação</text></g>\n  <line class=\"svg-flow svg-flow--request animated-flow\" x1=\"215\" y1=\"165\" x2=\"260\" y2=\"165\" marker-end=\"url(#m09l09-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--request animated-flow\" x1=\"405\" y1=\"165\" x2=\"450\" y2=\"165\" marker-end=\"url(#m09l09-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--request animated-flow\" x1=\"595\" y1=\"165\" x2=\"640\" y2=\"165\" marker-end=\"url(#m09l09-arrow)\"></line>\n  <path class=\"svg-flow svg-flow--response animated-flow\" d=\"M712 200 C712 250 345 250 332 315\" marker-end=\"url(#m09l09-arrow)\"></path>\n  <line class=\"svg-flow svg-flow--response animated-flow\" x1=\"405\" y1=\"350\" x2=\"450\" y2=\"350\" marker-end=\"url(#m09l09-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--blocked animated-flow\" x1=\"595\" y1=\"350\" x2=\"640\" y2=\"350\" marker-end=\"url(#m09l09-arrow)\"></line>\n  <text class=\"svg-badge\" x=\"480\" y=\"465\" text-anchor=\"middle\">Toda exceção deve ter dono, justificativa, prazo, log, aprovação e plano de remoção</text>\n</svg>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h3>Laboratório</h3>\n  \n<p>O laboratório desta aula não depende de um firewall específico. O objetivo é construir uma política governada, como se você fosse revisar uma base real de regras em ambiente corporativo híbrido. Você vai transformar solicitações vagas em regras auditáveis, identificar exceções perigosas e propor policy as code para bloquear padrões ruins.</p>\n\n</section>\n<div class=\"content-card\" data-enhancement=\"p1-07-9.9\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h3>Exercícios</h3>\n  \n<p>Os exercícios reforçam a leitura crítica de regras, a identificação de exceções vencidas, a diferença entre regra necessária e regra conveniente, e a aplicação de menor privilégio.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h3>Desafio</h3>\n  \n<p>O desafio coloca você no papel de Segurança revisando uma base de regras antes de uma auditoria e após um incidente de movimentação lateral.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h3>Solução comentada</h3>\n  \n<p>A solução comentada mostra como justificar decisões de remoção, restrição, renovação ou monitoramento sem quebrar produção e sem aceitar risco indefinido.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h3>Resumo</h3>\n  \n<p>Governança de regras é a disciplina que impede firewalls, WAFs, security groups e NACLs de virarem um amontoado de exceções permanentes. Uma boa regra tem dono, justificativa, validade, log, evidência, aprovação e revisão. Uma política madura é versionada, testada, aplicada por processo controlado e monitorada continuamente.</p>\n<p>O ponto mais importante é entender que regra de firewall é decisão de risco operacional. Sem governança, a organização perde memória, acumula exposição e fica com medo de remover o que não entende.</p>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h3>Próximo tema</h3>\n  \n<p>Na próxima aula, você fará a revisão prática do Módulo 9 desenhando uma política de tráfego segura para um ambiente completo, integrando firewalls, ACLs, WAF, cloud, NAT, logs, troubleshooting e governança.</p>\n\n</section>"
  },
  "networkContext": {
    "whereItFits": "Governança de regras fica acima da configuração técnica: ela organiza firewalls L3/L4, WAFs, security groups, NACLs, NSGs, cloud firewalls, proxies, NAT e políticas Kubernetes dentro de um ciclo de vida auditável.",
    "previousDependencies": [
      "Módulo 4: endereçamento IPv4",
      "Módulo 6: roteamento",
      "Módulo 8: portas e NAT",
      "Módulo 9: HTTP, WAF, APIs e troubleshooting",
      "Módulo 9: aulas 10.1 a 10.8"
    ],
    "realWorldUse": "Revisão trimestral de regras, remoção de exceções vencidas, auditoria de exposição pública, padronização de mudanças por IaC, análise pós-incidente e revisão de conectividade entre zonas."
  },
  "protocolFields": [
    {
      "field": "Origem",
      "meaning": "Quem inicia o fluxo: IP, CIDR, grupo, subnet, workload, identidade ou zona.",
      "securityNote": "Origem ampla demais aumenta risco de movimento lateral."
    },
    {
      "field": "Destino",
      "meaning": "Para onde o tráfego vai: servidor, VIP, load balancer, serviço, banco, API ou zona.",
      "securityNote": "Destino sensível exige dono, justificativa forte e log."
    },
    {
      "field": "Protocolo e porta",
      "meaning": "TCP, UDP, ICMP, HTTP path/method ou outro atributo controlado.",
      "securityNote": "Portas administrativas públicas devem ser exceção fortemente controlada."
    },
    {
      "field": "Ação",
      "meaning": "Permit, deny, reject, log, inspect, rate limit ou challenge no caso de WAF.",
      "securityNote": "Permissões sem log reduzem capacidade de investigação."
    },
    {
      "field": "Owner",
      "meaning": "Responsável técnico/negócio pela necessidade do fluxo.",
      "securityNote": "Regra sem dono tende a nunca ser removida."
    },
    {
      "field": "Validade",
      "meaning": "Prazo de expiração ou data de revisão obrigatória.",
      "securityNote": "Exceção sem validade vira regra permanente."
    },
    {
      "field": "Justificativa",
      "meaning": "Motivo de negócio e dependência técnica documentada.",
      "securityNote": "Justificativa vaga impede revisão objetiva."
    },
    {
      "field": "Evidência",
      "meaning": "Teste, log, ticket, aprovação, pull request e resultado esperado.",
      "securityNote": "Sem evidência, não há rastreabilidade."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Necessidade de comunicação",
      "description": "Uma aplicação, usuário, fornecedor ou serviço declara um fluxo necessário."
    },
    {
      "step": 2,
      "name": "Matriz de fluxo",
      "description": "A necessidade vira origem, destino, protocolo, porta, ambiente e justificativa."
    },
    {
      "step": 3,
      "name": "Análise de risco",
      "description": "Segurança avalia exposição, zona, dados, autenticação, logs, alternativa segura e menor privilégio."
    },
    {
      "step": 4,
      "name": "Policy as code",
      "description": "A regra é escrita em repositório, com owner, validade, tags e comentários auditáveis."
    },
    {
      "step": 5,
      "name": "Validação automática",
      "description": "Pipeline verifica padrões proibidos, como any-any, porta administrativa pública, ausência de log ou validade ausente."
    },
    {
      "step": 6,
      "name": "Aprovação e aplicação",
      "description": "Revisores aprovam e a mudança é aplicada de forma controlada."
    },
    {
      "step": 7,
      "name": "Observabilidade",
      "description": "Logs, contadores e SIEM confirmam uso, bloqueios e anomalias."
    },
    {
      "step": 8,
      "name": "Revisão e expiração",
      "description": "Regra é renovada, reduzida ou removida com base em evidências."
    }
  ],
  "deepDive": {
    "title": "Drift, exceção e risco acumulado",
    "sections": [
      {
        "heading": "Drift",
        "body": "Drift acontece quando a configuração real do ambiente diverge da configuração declarada. Em firewall, isso costuma ocorrer quando alguém muda uma regra diretamente no console, fora do repositório ou do ticket aprovado."
      },
      {
        "heading": "Exceção",
        "body": "Exceção não é erro por si só. O problema é exceção sem prazo, sem dono, sem compensating control e sem revisão. Uma exceção emergencial deve nascer com rollback planejado."
      },
      {
        "heading": "Risco acumulado",
        "body": "Cada regra ampla aumenta pouco o risco individualmente, mas o conjunto cria caminhos inesperados. O atacante não precisa da regra perfeita; precisa de uma sequência de permissões esquecidas."
      },
      {
        "heading": "Policy as code",
        "body": "Policy as code permite transformar padrões de segurança em testes objetivos: negar 0.0.0.0/0 para administração, exigir validade, exigir tags, impedir banco público e obrigar logs em fluxos críticos."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Criar regra temporária sem data de expiração.",
      "impact": "A exceção vira exposição permanente.",
      "fix": "Definir validade curta, alerta antes do vencimento e remoção automática ou revisão obrigatória."
    },
    {
      "mistake": "Usar any-any para resolver incidente de conectividade.",
      "impact": "Segmentação é anulada e o troubleshooting cria risco maior que o problema original.",
      "fix": "Usar liberação mínima, janela controlada, log obrigatório e rollback documentado."
    },
    {
      "mistake": "Não registrar dono da regra.",
      "impact": "Ninguém autoriza remoção depois, mesmo que a regra pareça obsoleta.",
      "fix": "Exigir owner técnico e owner de negócio em toda regra."
    },
    {
      "mistake": "Aplicar mudanças diretamente no console cloud.",
      "impact": "Drift entre IaC e ambiente real.",
      "fix": "Bloquear ou alertar alterações fora do pipeline; reconciliar drift."
    },
    {
      "mistake": "Revisar regra apenas por nome do objeto.",
      "impact": "Objetos podem conter ranges amplos, grupos aninhados ou hosts desativados.",
      "fix": "Expandir objetos e revisar efetivamente origem, destino e portas."
    },
    {
      "mistake": "Confundir compliance com segurança real.",
      "impact": "A regra tem aprovação formal, mas continua ampla e perigosa.",
      "fix": "Aprovação deve incluir critérios técnicos objetivos e evidência de menor privilégio."
    }
  ],
  "troubleshooting": {
    "method": "Para revisar uma regra, não comece perguntando se ela quebra produção. Comece perguntando quem usa, quando usa, de onde vem, para onde vai, por qual porta, qual log comprova uso, qual sistema é dono e qual risco existe se for removida ou restringida.",
    "checklist": [
      "A regra possui ticket, owner, justificativa e validade?",
      "A origem é restrita ao necessário?",
      "O destino é específico ou aponta para uma zona inteira sem necessidade?",
      "A porta/protocolo é coerente com a aplicação?",
      "Existe regra mais específica sombreada por regra ampla?",
      "Há logs de uso nos últimos 30, 60 ou 90 dias?",
      "A regra permite acesso administrativo direto?",
      "Existe exposição pública indevida?",
      "A regra passa pelo WAF, API Gateway ou proxy esperado?",
      "Há plano de rollback para remoção ou restrição?"
    ],
    "tools": [
      "SIEM",
      "firewall logs",
      "flow logs",
      "contadores de regra",
      "CMDB",
      "ITSM",
      "Git",
      "Terraform plan",
      "policy as code",
      "scanner de exposição",
      "packet capture autorizado"
    ],
    "evidence": "Evidências devem ser sanitizadas. Nunca cole tokens, cookies, Authorization headers, chaves privadas, IPs sensíveis ou payloads de produção em tickets sem tratamento adequado.",
    "symptoms": [
      "Comportamento inesperado relacionado a Governança de regras: revisão, exceções e policy as code.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "Qual é o 5-tuple do fluxo e em qual horário ele falhou?",
      "Qual controle tomou a decisão e qual evidência prova isso?",
      "A falha está na ida, no retorno, no estado, no NAT, no WAF ou no backend?"
    ],
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "grep -n \"0.0.0.0/0\\|any\\|22\\|3389\" firewall-policy.yaml\njq \".rules[] | select(.expiry < \\\"2026-07-01\\\")\" firewall-policy.json",
        "purpose": "Analisar política fictícia",
        "expectedObservation": "Riscos encontrados ou simulação justificada.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "curl -vkI https://servico.lab.local/health\nnc -vz servico.lab.local 443\nTest-NetConnection servico.lab.local -Port 443",
        "purpose": "Teste de aceite",
        "expectedObservation": "Disponibilidade e bloqueios validados.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      }
    ],
    "decisionTree": [
      {
        "if": "Sem hits na regra",
        "then": "Verificar ponto de aplicação, direção, rota e origem real do fluxo."
      },
      {
        "if": "Allow existe mas aplicação falha",
        "then": "Separar transporte, TLS, WAF, backend e autorização."
      },
      {
        "if": "Retorno falha",
        "then": "Verificar state table, NACL/ACL stateless, portas efêmeras e caminho assimétrico."
      },
      {
        "if": "Regra ampla aparece",
        "then": "Substituir por matriz mínima com owner, validade, log e rollback."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Deny-by-default entre zonas e liberação explícita por necessidade.",
      "Toda regra deve ter dono, justificativa, validade e log quando aplicável.",
      "Exceções devem ser temporárias e revisadas automaticamente.",
      "Mudanças críticas devem passar por revisão e aprovação segregada.",
      "Usar policy as code para bloquear padrões proibidos antes do deploy.",
      "Monitorar drift entre código e ambiente real.",
      "Revisar regras sem uso e regras amplas periodicamente.",
      "Enviar logs de firewall, WAF e cloud para SIEM com contexto suficiente."
    ],
    "badPractices": [
      "Permitir any-any como solução permanente.",
      "Manter SSH/RDP ou banco público por conveniência.",
      "Criar regra em console cloud fora do IaC.",
      "Usar comentários genéricos como 'liberação solicitada pelo time'.",
      "Renovar exceções automaticamente sem evidência de necessidade.",
      "Desativar logs para reduzir ruído sem análise de impacto.",
      "Aprovar regra sem validar rota de retorno, NAT e caminho pelo ponto de controle."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por regras amplas entre zonas.",
        "description": "Risco relacionado à aula 9.9 — Governança de regras: revisão, exceções e policy as code.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Inventário de regras com owner e validade."
      },
      {
        "name": "Exposição pública de serviços administrativos.",
        "description": "Risco relacionado à aula 9.9 — Governança de regras: revisão, exceções e policy as code.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão periódica baseada em logs de uso."
      },
      {
        "name": "Bypass de WAF/API Gateway por backend acessível diretamente.",
        "description": "Risco relacionado à aula 9.9 — Governança de regras: revisão, exceções e policy as code.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Guardrails em pipeline e cloud policy."
      },
      {
        "name": "Persistência de acesso externo via exceção esquecida.",
        "description": "Risco relacionado à aula 9.9 — Governança de regras: revisão, exceções e policy as code.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Alertas para regra ampla, sem log, sem owner ou vencida."
      },
      {
        "name": "Drift que reabre portas já removidas no código.",
        "description": "Risco relacionado à aula 9.9 — Governança de regras: revisão, exceções e policy as code.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Bloqueio de mudanças fora do pipeline ou detecção rápida de drift."
      },
      {
        "name": "Falha de investigação por ausência de logs ou owner.",
        "description": "Risco relacionado à aula 9.9 — Governança de regras: revisão, exceções e policy as code.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Compensating controls para exceções inevitáveis: MFA, VPN, bastion, rate limit, WAF, monitoramento reforçado."
      }
    ],
    "mitigations": [
      "Inventário de regras com owner e validade.",
      "Revisão periódica baseada em logs de uso.",
      "Guardrails em pipeline e cloud policy.",
      "Alertas para regra ampla, sem log, sem owner ou vencida.",
      "Bloqueio de mudanças fora do pipeline ou detecção rápida de drift.",
      "Compensating controls para exceções inevitáveis: MFA, VPN, bastion, rate limit, WAF, monitoramento reforçado."
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
      "Inventário de regras com owner e validade.",
      "Revisão periódica baseada em logs de uso.",
      "Guardrails em pipeline e cloud policy.",
      "Alertas para regra ampla, sem log, sem owner ou vencida.",
      "Bloqueio de mudanças fora do pipeline ou detecção rápida de drift.",
      "Compensating controls para exceções inevitáveis: MFA, VPN, bastion, rate limit, WAF, monitoramento reforçado."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.9",
    "title": "Governança de regras, exceções e policy as code",
    "labType": "architecture",
    "objective": "Revisar regras como ciclo de vida: dono, justificativa, expiração, risco, evidência, exceção e policy as code.",
    "scenario": "A organização acumulou regras temporárias e precisa reduzir dívida de segurança sem quebrar operação.",
    "topology": "Repositório de políticas -> revisão -> change -> firewall/cloud -> logs/SIEM -> expiração.",
    "architecture": "Policy as code torna regra revisável, testável e rastreável.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "YAML/JSON fictício",
      "grep/jq opcional",
      "planilha",
      "checklist de revisão"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não aplique mudanças em produção sem change, janela, backup e rollback.",
      "Não use any-any como solução de troubleshooting.",
      "Sanitize IPs, tokens, cookies, payloads e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventário de regras",
        "instruction": "Classifique owner, expiry, src, dst, port, reason e log.",
        "expectedOutput": "Regras órfãs identificadas.",
        "evidence": "Lacunas marcadas.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Tabela ruleId | owner | expiry | src | dst | port | reason | log."
      },
      {
        "number": 2,
        "title": "Analisar política fictícia",
        "instruction": "Procure any-any, gestão exposta e exceção vencida.",
        "expectedOutput": "Riscos encontrados ou simulação justificada.",
        "evidence": "Lista de achados.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "grep -n \"0.0.0.0/0\\|any\\|22\\|3389\" firewall-policy.yaml\njq \".rules[] | select(.expiry < \\\"2026-07-01\\\")\" firewall-policy.json"
      },
      {
        "number": 3,
        "title": "Pontuar risco",
        "instruction": "Crie score por exposição, criticidade e ausência de controles.",
        "expectedOutput": "Fila objetiva de revisão.",
        "evidence": "Tabela de prioridade.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "calculation": "score = exposição + criticidade + ausência de owner + ausência de expiry + ausência de log."
      },
      {
        "number": 4,
        "title": "Remediação segura",
        "instruction": "Defina manter, restringir, expirar, remover ou substituir.",
        "expectedOutput": "Sem remoção cega.",
        "evidence": "Plano de remediação.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Plano por regra com ação e rollback."
      },
      {
        "number": 5,
        "title": "Teste de aceite",
        "instruction": "Defina validação antes/depois.",
        "expectedOutput": "Disponibilidade e bloqueios validados.",
        "evidence": "Critérios de aceite.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "curl -vkI https://servico.lab.local/health\nnc -vz servico.lab.local 443\nTest-NetConnection servico.lab.local -Port 443"
      },
      {
        "number": 6,
        "title": "Workflow de exceção",
        "instruction": "Crie fluxo de solicitação, aprovação, validade, monitoramento e remoção.",
        "expectedOutput": "Exceções expiram.",
        "evidence": "Checklist de exceção.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Workflow de exceção temporária."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "Owner/expiry",
        "expected": "Toda regra tem dono e validade.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Gestão tratada",
        "expected": "SSH/RDP não ficam abertos à Internet.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Teste de aceite",
        "expected": "Cada mudança tem validação e rollback.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Regra órfã",
        "probableCause": "Mudança sem ciclo de vida.",
        "howToConfirm": "Owner ausente.",
        "fix": "Revalidar e expirar se sem uso."
      },
      {
        "symptom": "Exceção vencida ativa",
        "probableCause": "Sem expiração.",
        "howToConfirm": "Comparar expiry.",
        "fix": "Remover ou renovar formalmente."
      },
      {
        "symptom": "Remoção quebra serviço",
        "probableCause": "Dependência não mapeada.",
        "howToConfirm": "Logs/contadores/teste.",
        "fix": "Rollback e remediação planejada."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Inventário",
      "Achados grep/jq",
      "Score de risco",
      "Plano de remediação",
      "Testes de aceite",
      "Workflow"
    ],
    "questions": [
      "Por que regra sem dono é risco?",
      "Como policy as code ajuda?"
    ],
    "challenge": "Priorize dez regras fictícias.",
    "solution": "Priorize gestão exposta, any-any e regras vencidas sem log; restrinja, expire ou substitua."
  },
  "mentorQuestions": [
    "Qual regra você teria medo de remover porque ninguém sabe para que serve? O que faltou no processo para chegar nesse ponto?",
    "Como você diferenciaria uma exceção aceitável de uma exceção perigosa?",
    "Que validações automáticas você colocaria em um pipeline para impedir regras ruins antes do deploy?",
    {
      "type": "diagnóstico",
      "question": "Que evidência provaria que o firewall tomou a decisão correta neste cenário?",
      "hints": [
        "Pense em log, contador, state table, flow log ou packet capture.",
        "Separe ida, retorno e camada de aplicação."
      ],
      "expectedIdeas": [
        "matriz de fluxo",
        "log de regra",
        "contador",
        "state table",
        "pcap",
        "rollback"
      ],
      "explanation": "Firewall profissional é operado por evidências, não por palpites."
    }
  ],
  "quiz": [
    {
      "question": "Qual é a principal função da governança de regras?",
      "options": [
        "Substituir roteamento dinâmico",
        "Controlar ciclo de vida, risco, aprovação, evidência e revisão de regras",
        "Eliminar a necessidade de logs",
        "Permitir qualquer tráfego interno"
      ],
      "answer": 1,
      "explanation": "Governança organiza a decisão de risco associada às regras."
    },
    {
      "question": "Por que regra sem owner é perigosa?",
      "options": [
        "Porque sempre bloqueia tráfego",
        "Porque ninguém assume responsabilidade por revisão, remoção ou renovação",
        "Porque impede NAT",
        "Porque só funciona em IPv6"
      ],
      "answer": 1,
      "explanation": "Sem dono, a regra tende a permanecer por medo de impacto desconhecido."
    },
    {
      "question": "O que é drift?",
      "options": [
        "Perda de pacote em UDP",
        "Divergência entre configuração declarada e configuração real",
        "Balanceamento de carga",
        "Tipo de criptografia TLS"
      ],
      "answer": 1,
      "explanation": "Drift ocorre quando alguém altera o ambiente fora do código/processo controlado."
    },
    {
      "question": "Qual regra deveria ser bloqueada por policy as code na maioria dos ambientes?",
      "options": [
        "App para banco específico na porta correta",
        "WAF para backend privado",
        "0.0.0.0/0 para SSH/RDP",
        "Backend enviando logs para SIEM"
      ],
      "answer": 2,
      "explanation": "Administração pública ampla é padrão de alto risco."
    },
    {
      "question": "Qual é uma boa prática para exceções emergenciais?",
      "options": [
        "Não registrar para acelerar",
        "Criar sem prazo para evitar retrabalho",
        "Definir validade curta, log, justificativa, aprovador e rollback",
        "Transformar em regra permanente automaticamente"
      ],
      "answer": 2,
      "explanation": "Exceção emergencial deve nascer com controle reforçado e plano de encerramento."
    },
    {
      "question": "Revisão de regras deve se basear principalmente em quê?",
      "options": [
        "Memória do administrador",
        "Evidências, logs, owner, justificativa e risco",
        "Nome bonito do objeto",
        "Quantidade de regras no firewall"
      ],
      "answer": 1,
      "explanation": "A revisão precisa de evidência objetiva e contexto de negócio/técnico."
    }
  ],
  "flashcards": [
    {
      "front": "O que é governança de regras?",
      "back": "Controle do ciclo de vida de políticas de tráfego: solicitação, aprovação, aplicação, log, revisão, expiração e remoção."
    },
    {
      "front": "O que é policy as code?",
      "back": "Representar políticas como código versionado, revisável e testável por pipeline."
    },
    {
      "front": "O que é drift?",
      "back": "Diferença entre a configuração declarada e a configuração real do ambiente."
    },
    {
      "front": "Por que exceção precisa de validade?",
      "back": "Para não virar permissão permanente sem revisão."
    },
    {
      "front": "Qual é o risco de any-any?",
      "back": "Anula segmentação e facilita movimento lateral."
    },
    {
      "front": "O que uma regra bem documentada deve conter?",
      "back": "Origem, destino, protocolo, porta, ação, owner, justificativa, validade, ticket, evidência, log e rollback."
    }
  ],
  "exercises": [
    {
      "title": "Classifique regras",
      "prompt": "Classifique cinco regras fictícias como baixo, médio, alto ou crítico e justifique.",
      "expectedAnswer": "Regras públicas, administrativas, sem owner ou para dados sensíveis devem receber maior criticidade."
    },
    {
      "title": "Reduza uma regra ampla",
      "prompt": "Transforme 'LAN any para servidores any' em três regras de menor privilégio.",
      "expectedAnswer": "Separar por origem, destino, porta e aplicação específica, com logs e owners."
    },
    {
      "title": "Crie guardrails",
      "prompt": "Escreva três validações de policy as code para firewall cloud.",
      "expectedAnswer": "Bloquear administração pública, exigir tags/owner/validade e impedir banco público."
    },
    {
      "title": "Plano de expiração",
      "prompt": "Defina um processo para exceções temporárias de fornecedor externo.",
      "expectedAnswer": "Validade curta, IP fixo, MFA/API auth, WAF/rate limit, logs, owner, ticket e revisão antes de renovar."
    },
    {
      "id": "ex-9.9-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Auditoria emergencial de regras após incidente",
    "scenario": "Após um incidente de movimento lateral, você recebeu uma lista de regras antigas. Há regras any-any entre servidores, RDP público temporário há 14 meses, backend acessível sem WAF, regra para fornecedor sem owner e SG criado manualmente fora do Terraform.",
    "tasks": [
      "Priorizar riscos",
      "Definir ações imediatas",
      "Criar plano de revisão",
      "Propor policy as code",
      "Definir evidências para auditoria",
      "Planejar comunicação com donos de sistemas"
    ],
    "constraints": [
      "Não quebrar produção sem análise",
      "Reduzir risco rapidamente",
      "Manter rastreabilidade",
      "Criar rollback",
      "Registrar exceções inevitáveis"
    ]
  },
  "commentedSolution": {
    "summary": "A resposta madura separa risco imediato de melhoria estrutural. Primeiro bloqueie ou restrinja exposições críticas comprovadas, como RDP público e backend sem WAF. Depois trate regras amplas e sem owner com análise de logs, owners e janela de mudança. Em paralelo, implemente policy as code para impedir reincidência.",
    "steps": [
      "RDP público temporário há 14 meses: remover ou restringir imediatamente para VPN/Bastion/JIT com MFA, após validação de uso e comunicação emergencial.",
      "Backend sem WAF: bloquear acesso direto, permitir apenas origem do WAF/load balancer/API Gateway e validar logs.",
      "Any-any entre servidores: identificar uso por logs, quebrar em fluxos específicos e aplicar por fases.",
      "Fornecedor sem owner: suspender renovação automática, exigir responsável interno, contrato, IPs, autenticação e validade curta.",
      "SG fora do Terraform: importar para IaC ou remover após validação, registrar drift e causa raiz.",
      "Policy as code: bloquear admin público, exigir owner/validade/logs/tags, impedir banco público e alertar exceções vencidas."
    ],
    "why": "A solução evita dois extremos ruins: deixar tudo como está por medo de quebrar ou remover tudo sem análise. Segurança operacional exige redução de risco com evidência e controle de mudança."
  },
  "glossary": [
    {
      "term": "Governança de regras",
      "definition": "Processo de controle do ciclo de vida de regras de tráfego."
    },
    {
      "term": "Exceção",
      "definition": "Liberação fora do padrão normal, idealmente temporária, justificada e monitorada."
    },
    {
      "term": "Policy as code",
      "definition": "Políticas escritas como código versionado, revisado e testado."
    },
    {
      "term": "Drift",
      "definition": "Divergência entre configuração real e configuração declarada."
    },
    {
      "term": "Owner",
      "definition": "Responsável técnico ou de negócio por uma regra, sistema ou risco."
    },
    {
      "term": "Compensating control",
      "definition": "Controle adicional usado para reduzir risco quando a solução ideal não é possível temporariamente."
    },
    {
      "term": "Shadowing",
      "definition": "Quando uma regra anterior torna outra regra posterior inútil ou inalcançável."
    },
    {
      "term": "Regra órfã",
      "definition": "Regra sem dono, justificativa ou sistema associado."
    },
    {
      "term": "Revisão periódica",
      "definition": "Processo recorrente de confirmar necessidade, escopo e risco de regras existentes."
    },
    {
      "term": "Guardrail",
      "definition": "Restrição preventiva que impede configurações perigosas sem bloquear todo o processo de entrega."
    }
  ],
  "references": [
    {
      "title": "Conceitos estudados no Módulo 9",
      "type": "internal",
      "note": "Aulas 10.1 a 10.8 formam a base técnica para governança de regras."
    },
    {
      "title": "Curso Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "type": "internal",
      "note": "Revisar módulos de IaC, pipelines, automação e policy as code."
    },
    {
      "title": "Curso Enterprise Identity, IAM, Segurança e Acessos",
      "type": "internal",
      "note": "Regras de rede devem ser combinadas com identidade, autorização e menor privilégio."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e pipelines",
      "reason": "Policy as code depende diretamente de versionamento, revisão e automação."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Governança de acessos",
      "reason": "A lógica de owner, aprovação, revisão e expiração também se aplica a acessos humanos e não humanos."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 9",
      "reason": "WAF, API Gateway, HTTP e logs ajudam a governar regras L7."
    }
  ],
  "progressRules": {
    "requiresQuiz": true,
    "requiresLab": true,
    "requiresChallenge": true,
    "minimumQuizScore": 70,
    "unlockNextLesson": "9.10",
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
      "9.10"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
