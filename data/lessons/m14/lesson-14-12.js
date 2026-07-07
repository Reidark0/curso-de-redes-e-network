export const lesson1412 = {
  "id": "14.12",
  "moduleId": "m14",
  "order": 12,
  "title": "Observabilidade e troubleshooting: flow logs, métricas e auditoria",
  "subtitle": "Como enxergar, correlacionar e diagnosticar tráfego, mudanças, custos e falhas em redes cloud.",
  "duration": "150-210 min",
  "estimatedStudyTimeMinutes": 210,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 340,
  "tags": [
    "cloud networking",
    "observabilidade",
    "troubleshooting",
    "flow logs",
    "métricas",
    "auditoria",
    "siem",
    "logs",
    "network watcher",
    "cloudtrail",
    "segurança",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "reason": "Troubleshooting de rede cloud exige entender rotas, gateways, NAT e UDR."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.5",
      "reason": "Flow logs e auditoria são interpretados junto com SG, NSG, NACL e firewalls."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.6",
      "reason": "Logs e métricas de load balancer são parte central da publicação de serviços."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM, logs e correlação foram introduzidos no módulo de Segurança de Redes."
    }
  ],
  "objectives": [
    "Explicar o papel de flow logs, métricas e auditoria em redes cloud.",
    "Diferenciar logs de tráfego, logs de aplicação, métricas e eventos de controle.",
    "Montar uma linha do tempo de troubleshooting usando evidências por camada.",
    "Identificar limitações de flow logs e quando usar outras fontes de evidência.",
    "Planejar retenção, custo, tags e governança de logs de rede.",
    "Desenhar alertas defensivos para mudanças, exposição pública e egress anômalo."
  ],
  "learningOutcomes": [
    "Dado um incidente de conectividade, o aluno identifica quais logs consultar por camada.",
    "Dado um flow log, o aluno diferencia tentativa aceita, tentativa rejeitada e ausência de tráfego.",
    "Dado um aumento de custo de NAT ou egress, o aluno correlaciona métricas e flow logs.",
    "Dado um evento de auditoria, o aluno conecta mudança de configuração ao impacto de rede."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n  <p>Em cloud networking, uma rede pode estar tecnicamente correta no desenho e ainda assim falhar na operação. Uma rota pode existir, mas o pacote pode ser bloqueado por um security group. O DNS pode resolver, mas para o IP público errado. O load balancer pode estar saudável na console, mas encaminhar para backends que falham intermitentemente. Um NAT Gateway pode estar funcionando, mas gerando custo alto. Uma conexão híbrida pode estar ativa, mas com rota assimétrica. A diferença entre um time maduro e um time que apenas “clica até funcionar” é a capacidade de observar evidências.</p>\n  <p>Esta aula existe para responder uma pergunta prática: <strong>como enxergar o que acontece dentro de uma rede cloud?</strong> A resposta não é uma ferramenta única. É a combinação de flow logs, métricas, logs de firewall, logs de DNS, logs de load balancer, trilhas de auditoria, eventos de configuração, inventário, tags, diagramas, alertas e runbooks.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> a aplicação ficou indisponível por 40 minutos. O time de aplicação diz que “a rede caiu”. O time de rede diz que “o servidor não responde”. O time de segurança diz que “ninguém mudou firewall”. O time de cloud vê cobrança alta de NAT. Sem evidências, todos discutem opinião. Com observabilidade, o time reconstrói a linha do tempo, identifica a mudança, confirma o fluxo afetado e corrige a causa.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n  <p>Em redes tradicionais, a visibilidade nasceu com ferramentas como ping, traceroute, SNMP, syslog, SPAN/mirror port, NetFlow, sFlow, IPFIX, firewalls com logs e coletores centralizados. O operador olhava interfaces, quedas de link, erro de CRC, tabela de rotas, uso de banda e logs de equipamentos. Era uma visibilidade muito ligada ao dispositivo físico.</p>\n  <p>Com virtualização e cloud, a topologia deixou de estar apenas em switches e roteadores físicos. A rede passou a incluir interfaces virtuais, route tables, security groups, NAT gerenciado, load balancers gerenciados, endpoints privados, firewalls cloud, peerings, gateways, APIs e políticas automatizadas por IaC. O pacote continua sendo pacote, mas o controle ficou distribuído entre o plano de dados e o plano de controle do provedor.</p>\n  <p>Por isso surgiram logs nativos de cloud, como flow logs de VPC/VNet, logs de load balancer, logs de firewall, trilhas de auditoria de API e métricas de serviços gerenciados. O objetivo deixou de ser apenas “ver se a interface está up”. O objetivo passou a ser <strong>correlacionar tráfego, configuração, identidade, tempo, custo e mudança</strong>.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema central é que cloud networking distribui a responsabilidade por várias camadas. Uma falha de rede pode não estar na rede em si. Pode estar no DNS, no certificado, no health check, na rota, no SG/NSG, no NACL, no firewall, no endpoint privado, no IAM, na policy do endpoint, no Kubernetes, no NAT, no provedor, no deploy ou em uma mudança de Terraform.</p>\n  <ul>\n    <li><strong>Sem flow logs:</strong> o time não sabe se o tráfego chegou, foi aceito, rejeitado ou nunca saiu da origem.</li>\n    <li><strong>Sem métricas:</strong> o time não percebe saturação, aumento de latência, erro de health check, queda de túnel ou crescimento de bytes.</li>\n    <li><strong>Sem auditoria:</strong> o time não sabe quem mudou rota, security group, DNS, endpoint, firewall ou load balancer.</li>\n    <li><strong>Sem tags:</strong> logs existem, mas ninguém sabe qual aplicação, dono, ambiente ou criticidade está associado ao recurso.</li>\n    <li><strong>Sem retenção:</strong> o incidente é descoberto tarde e as evidências já expiraram.</li>\n    <li><strong>Sem correlação:</strong> cada ferramenta mostra uma parte, mas ninguém reconstrói a linha do tempo.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> habilitar logs apenas depois do incidente. Observabilidade precisa existir antes da falha, porque logs não coletados no passado não podem ser recriados com fidelidade.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n  <p>A observabilidade em cloud evoluiu de monitoramento de disponibilidade para investigação orientada por evidências.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Etapa</th><th>Foco</th><th>Exemplo</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Monitoramento básico</td><td>Disponibilidade</td><td>Ping, CPU, memória, status de VM</td><td>Não explica caminho do tráfego</td></tr>\n      <tr><td>Logs de rede</td><td>Fluxos aceitos/rejeitados</td><td>Flow logs, firewall logs, LB logs</td><td>Nem sempre mostram payload ou causa completa</td></tr>\n      <tr><td>Métricas</td><td>Tendência e saúde</td><td>bytes, conexões, latência, health checks</td><td>Agregam dados e podem esconder eventos individuais</td></tr>\n      <tr><td>Auditoria</td><td>Mudança e identidade</td><td>API calls, alteração de rota, alteração de regra</td><td>Mostra quem mudou, não necessariamente impacto de pacote</td></tr>\n      <tr><td>Correlação</td><td>Linha do tempo</td><td>SIEM, dashboards, alertas e runbooks</td><td>Exige normalização, tags e disciplina operacional</td></tr>\n      <tr><td>Observabilidade madura</td><td>Diagnóstico, segurança e custo</td><td>tráfego + mudança + identidade + custo + risco</td><td>Requer governança e decisões de retenção</td></tr>\n    </tbody>\n  </table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Observabilidade</strong> é a capacidade de inferir o estado de um sistema a partir dos sinais que ele produz. Em redes cloud, os principais sinais são logs, métricas, eventos e trilhas de auditoria. Não basta “ter dashboard”. É preciso que o dashboard responda perguntas operacionais.</p>\n  <p>Uma arquitetura observável deve permitir responder: quem tentou falar com quem? Em qual porta? Em que horário? Foi aceito ou rejeitado? Por qual controle? Qual rota existia? Qual regra mudou? Qual identidade fez a mudança? Qual recurso ficou indisponível? Quanto tráfego passou? Quanto custou? Qual alerta deveria ter disparado?</p>\n  <p>Os <strong>flow logs</strong> registram metadados de fluxos de rede, normalmente origem, destino, porta, protocolo, ação, interface, bytes, pacotes e janela de tempo. Eles não substituem captura de pacote e geralmente não mostram o conteúdo da comunicação. As <strong>métricas</strong> mostram comportamento agregado. A <strong>auditoria</strong> mostra mudanças no plano de controle. A maturidade está em correlacionar tudo.</p>\n\n\n<div class=\"callout callout--warning\"><strong>Revisão P1:</strong> observabilidade cloud não é “ligar todos os logs”. É decidir quais perguntas precisam ser respondidas, quais fontes respondem cada pergunta, qual retenção é necessária, qual amostragem é aceitável, quanto custa manter isso e quem age quando um alerta dispara.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Por baixo, a observabilidade cloud depende da instrumentação dos serviços gerenciados e do plano de controle do provedor.</p>\n  <ol>\n    <li><strong>Coleta de tráfego:</strong> o provedor observa metadados de fluxo em interfaces, subnets, VPCs/VNets ou recursos equivalentes. O resultado é agregado em janelas de tempo.</li>\n    <li><strong>Coleta de eventos:</strong> serviços como load balancer, firewall, DNS, NAT, VPN e Kubernetes geram eventos, logs e métricas de operação.</li>\n    <li><strong>Auditoria de API:</strong> alterações feitas via console, CLI, SDK, Terraform, pipeline ou serviço gerenciado são registradas como eventos de controle.</li>\n    <li><strong>Entrega:</strong> logs são enviados para destinos como buckets, log analytics, data lakes, filas, streams ou ferramentas de SIEM.</li>\n    <li><strong>Normalização:</strong> campos diferentes de provedores e serviços são padronizados para pesquisa e correlação.</li>\n    <li><strong>Retenção:</strong> a organização define por quanto tempo manter logs quentes, arquivados e descartáveis, equilibrando custo, investigação e compliance.</li>\n    <li><strong>Correlação:</strong> consultas e alertas conectam fluxo de rede, métrica, evento de auditoria, recurso, tag, usuário, pipeline e aplicação.</li>\n  </ol>\n  <div class=\"callout callout--info\"><strong>Ponto importante:</strong> flow logs são excelentes para responder “houve tentativa de comunicação?”. Para responder “qual era o conteúdo do pacote?”, você precisa de outras técnicas, como captura controlada, logs de aplicação, proxy, WAF, IDS/NDR ou inspeção autorizada.</div>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Uma arquitetura de observabilidade para Cloud Networking deve cobrir pelo menos seis planos.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Plano</th><th>Sinais</th><th>Perguntas respondidas</th></tr></thead>\n    <tbody>\n      <tr><td>Rede</td><td>Flow logs, firewall logs, VPN logs, NAT metrics</td><td>Quem falou com quem? Foi aceito? Quanto tráfego passou?</td></tr>\n      <tr><td>Publicação</td><td>Load balancer logs, WAF logs, health checks</td><td>O serviço está saudável? Qual erro HTTP? Qual origem?</td></tr>\n      <tr><td>DNS</td><td>Query logs, resolver logs, zona pública/privada</td><td>O nome resolveu para qual destino? Houve split-horizon incorreto?</td></tr>\n      <tr><td>Controle</td><td>CloudTrail, Activity Log, Audit Logs, Config</td><td>Quem alterou rota, SG, firewall, DNS, endpoint ou LB?</td></tr>\n      <tr><td>Workload</td><td>logs de aplicação, Kubernetes events, ingress controller</td><td>A aplicação recebeu a requisição? O pod estava pronto?</td></tr>\n      <tr><td>Financeiro</td><td>billing, cost allocation tags, métricas de bytes</td><td>Qual fluxo, NAT, LB, log ou região está gerando custo?</td></tr>\n    </tbody>\n  </table>\n  <p>Essa arquitetura precisa de ownership. Logs sem dono viram ruído. Logs com dono, tags e runbooks viram capacidade operacional.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Imagine um hospital grande. O paciente passa pela recepção, triagem, exames, enfermaria, farmácia, centro cirúrgico e faturamento. Se algo dá errado, não basta perguntar “o hospital está funcionando?”. É preciso consultar prontuário, horários, responsáveis, exames, medicações, câmeras, pulseira de identificação e registros de acesso.</p>\n  <p>A rede cloud é parecida. O pacote passa por DNS, edge, load balancer, firewall, rota, subnet, security group, pod, banco, endpoint privado e logs. Observabilidade é o prontuário da rede: não cura sozinha, mas permite descobrir o que aconteceu, quando aconteceu, quem participou e qual etapa falhou.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Uma VM privada precisa acessar uma API externa. O desenho diz que ela sai pela rota default para um NAT Gateway. A aplicação relata timeout.</p>\n  <ol>\n    <li>O flow log da interface da VM mostra tentativa para o IP externo na porta 443.</li>\n    <li>O security group mostra tráfego de saída permitido.</li>\n    <li>A route table aponta 0.0.0.0/0 para o NAT.</li>\n    <li>A métrica do NAT mostra bytes saindo, mas também aumento de erro ou queda de conexão.</li>\n    <li>O log de firewall/proxy, se existir, mostra bloqueio por categoria ou FQDN.</li>\n    <li>A auditoria mostra que uma regra de egress foi alterada 12 minutos antes do problema.</li>\n  </ol>\n  <p>Sem observabilidade, o time diria “a internet não funciona”. Com evidência, ele diz: “a VM tenta sair, a rota está correta, mas a política de egress mudou e bloqueou o destino”.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Uma empresa possui matriz, filial, datacenter, cloud hub, spokes de produção e homologação, firewall central, VPN híbrida, aplicações em Kubernetes e serviços gerenciados via endpoints privados. Um incidente ocorre: usuários da filial não conseguem acessar o sistema de faturamento.</p>\n  <p>O diagnóstico maduro cruza sinais:</p>\n  <ul>\n    <li>métrica da VPN entre filial e hub;</li>\n    <li>rotas propagadas no hub-spoke;</li>\n    <li>flow logs do spoke de produção;</li>\n    <li>logs do firewall central;</li>\n    <li>logs do load balancer interno;</li>\n    <li>query logs de DNS privado;</li>\n    <li>auditoria de mudanças em route tables e políticas;</li>\n    <li>eventos do Kubernetes e readiness dos pods.</li>\n  </ul>\n  <p>O resultado pode mostrar, por exemplo, que uma nova rota mais específica foi publicada pelo BGP, desviando o retorno para um caminho diferente e causando rota assimétrica no firewall. A solução não é “liberar tudo”, mas corrigir rota, validar propagação e adicionar alerta para mudanças de prefixo crítico.</p>\n\n\n<table class=\"comparison-table\"><thead><tr><th>Fonte</th><th>Responde bem</th><th>Não responde sozinha</th><th>Cuidado de custo</th></tr></thead><tbody><tr><td>Flow logs</td><td>Quem falou com quem, porta, protocolo, volume e decisão quando disponível.</td><td>Conteúdo da aplicação e intenção do usuário.</td><td>Amostragem, retenção e volume por subnet/projeto.</td></tr><tr><td>DNS logs</td><td>Nome consultado, cliente, padrão de resolução.</td><td>Se a conexão TCP/TLS foi bem-sucedida.</td><td>Volume alto em clusters e proxies.</td></tr><tr><td>LB/WAF logs</td><td>Requisições, status, origem, regra aplicada e latência.</td><td>Tráfego leste-oeste interno fora do LB.</td><td>Ingestão e retenção por volume HTTP.</td></tr><tr><td>Audit logs</td><td>Quem mudou rota, firewall, IAM, DNS ou endpoint.</td><td>Fluxo de dados em tempo real.</td><td>Exportação e retenção longa.</td></tr></tbody></table>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-em-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em AWS, uma estratégia típica combina VPC Flow Logs, logs de Application/Network Load Balancer, AWS WAF logs, Route 53 Resolver query logs, CloudTrail, AWS Config, métricas do CloudWatch, GuardDuty e exportação para S3/SIEM. Em Azure, o desenho pode combinar Virtual Network Flow Logs ou NSG Flow Logs, Network Watcher, Application Gateway/WAF logs, Azure Activity Log, Diagnostic Settings, Log Analytics, Defender for Cloud e Sentinel. Em Google Cloud, pode combinar VPC Flow Logs, firewall logs, Cloud Load Balancing logs, Cloud DNS logs, Cloud Audit Logs, Cloud Monitoring, Cloud Logging e Security Command Center.</p>\n  <p>Os nomes mudam, mas o raciocínio é o mesmo: tráfego, saúde, mudança, identidade, configuração, custo e alerta precisam ser correlacionáveis.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-em-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, observabilidade não é algo feito apenas pela equipe de operações depois do deploy. Ela entra no pipeline.</p>\n  <ul>\n    <li>Templates Terraform devem habilitar flow logs em VPC/VNet críticas.</li>\n    <li>Pull requests que criam subnets, LBs, SGs, NSGs, endpoints ou firewalls devem exigir tags de dono, ambiente e criticidade.</li>\n    <li>Policies devem bloquear recursos públicos sem logs.</li>\n    <li>Deploys de aplicação devem criar dashboards e alertas mínimos junto com o recurso.</li>\n    <li>Runbooks devem ser versionados no repositório.</li>\n    <li>Alertas devem ter severidade, dono e ação recomendada.</li>\n  </ul>\n  <p>A maturidade não é “ter SIEM”. A maturidade é cada mudança de infraestrutura nascer com evidência, consulta, alerta e responsável.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-em-segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Para Segurança da Informação, logs de rede cloud são fundamentais para investigação e detecção. Eles ajudam a identificar varreduras internas, conexões para destinos incomuns, egress anômalo, tentativa de acesso a portas administrativas, comunicação entre zonas que deveriam ser isoladas, mudanças de security group, criação de load balancer público, alteração de DNS e acesso a serviços gerenciados por caminhos indevidos.</p>\n  <p>Mas há limites. Flow logs não substituem EDR, logs de aplicação, proxy, WAF, IAM, DLP ou captura de pacote. Eles mostram metadados de fluxo. Por isso, a arquitetura defensiva usa correlação: flow log mostra a conexão; auditoria mostra quem abriu a regra; DNS mostra o nome consultado; WAF mostra tentativa HTTP; IAM mostra a identidade; SIEM correlaciona o padrão.</p>\n  <div class=\"callout callout--success\"><strong>Boa prática:</strong> trate logs de rede como evidência sensível. Proteja com criptografia, controle de acesso, retenção, trilha de auditoria, imutabilidade quando necessário e separação entre quem administra a rede e quem pode apagar logs.</div>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama abaixo mostra uma arquitetura de observabilidade de Cloud Networking. Observe que os logs não vêm de um único lugar: cada camada gera sinais diferentes.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Diagrama de observabilidade cloud networking com fontes de logs, métricas e auditoria\">\n    <svg viewBox=\"0 0 980 560\" class=\"diagram-svg\" role=\"img\" aria-labelledby=\"svg-14-12-content-diagram-1-title svg-14-12-content-diagram-1-desc\">\n      <title id=\"svg-14-12-content-diagram-1-title\">Observabilidade e troubleshooting: flow logs, métricas e auditoria</title>\n      <desc id=\"svg-14-12-content-diagram-1-desc\">Diagrama pedagógico da aula 14.12, Observabilidade e troubleshooting: flow logs, métricas e auditoria, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-1412\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow-fill\"></path>\n        </marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"920\" height=\"480\" rx=\"22\" class=\"svg-cloud\"></rect>\n      <text x=\"490\" y=\"74\" text-anchor=\"middle\" class=\"svg-title\">Observabilidade em Cloud Networking</text>\n\n      <rect x=\"70\" y=\"120\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--user\"></rect>\n      <text x=\"145\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Usuários</text>\n      <text x=\"145\" y=\"171\" text-anchor=\"middle\" class=\"svg-small\">latência / erro</text>\n\n      <rect x=\"270\" y=\"110\" width=\"170\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--edge\"></rect>\n      <text x=\"355\" y=\"142\" text-anchor=\"middle\" class=\"svg-label\">DNS / LB / WAF</text>\n      <text x=\"355\" y=\"164\" text-anchor=\"middle\" class=\"svg-small\">access logs</text>\n      <text x=\"355\" y=\"183\" text-anchor=\"middle\" class=\"svg-small\">health checks</text>\n\n      <rect x=\"510\" y=\"110\" width=\"170\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--network\"></rect>\n      <text x=\"595\" y=\"142\" text-anchor=\"middle\" class=\"svg-label\">VPC / VNet</text>\n      <text x=\"595\" y=\"164\" text-anchor=\"middle\" class=\"svg-small\">flow logs</text>\n      <text x=\"595\" y=\"183\" text-anchor=\"middle\" class=\"svg-small\">rotas / SG / NSG</text>\n\n      <rect x=\"740\" y=\"110\" width=\"160\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--app\"></rect>\n      <text x=\"820\" y=\"142\" text-anchor=\"middle\" class=\"svg-label\">Workloads</text>\n      <text x=\"820\" y=\"164\" text-anchor=\"middle\" class=\"svg-small\">app logs</text>\n      <text x=\"820\" y=\"183\" text-anchor=\"middle\" class=\"svg-small\">events</text>\n\n      <rect x=\"120\" y=\"285\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--audit\"></rect>\n      <text x=\"205\" y=\"316\" text-anchor=\"middle\" class=\"svg-label\">Auditoria</text>\n      <text x=\"205\" y=\"338\" text-anchor=\"middle\" class=\"svg-small\">API calls / mudanças</text>\n\n      <rect x=\"405\" y=\"285\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--metrics\"></rect>\n      <text x=\"490\" y=\"316\" text-anchor=\"middle\" class=\"svg-label\">Métricas</text>\n      <text x=\"490\" y=\"338\" text-anchor=\"middle\" class=\"svg-small\">bytes / erros / RTT</text>\n\n      <rect x=\"690\" y=\"285\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n      <text x=\"775\" y=\"316\" text-anchor=\"middle\" class=\"svg-label\">Segurança</text>\n      <text x=\"775\" y=\"338\" text-anchor=\"middle\" class=\"svg-small\">SIEM / NDR / alertas</text>\n\n      <rect x=\"315\" y=\"430\" width=\"350\" height=\"60\" rx=\"14\" class=\"svg-node svg-node--central\"></rect>\n      <text x=\"490\" y=\"456\" text-anchor=\"middle\" class=\"svg-label\">Linha do tempo de investigação</text>\n      <text x=\"490\" y=\"477\" text-anchor=\"middle\" class=\"svg-small\">tráfego + mudança + identidade + custo + evidência</text>\n\n      <line x1=\"220\" y1=\"155\" x2=\"270\" y2=\"155\" class=\"svg-link\" marker-end=\"url(#arrow-1412)\"></line>\n      <line x1=\"440\" y1=\"155\" x2=\"510\" y2=\"155\" class=\"svg-link\" marker-end=\"url(#arrow-1412)\"></line>\n      <line x1=\"680\" y1=\"155\" x2=\"740\" y2=\"155\" class=\"svg-link\" marker-end=\"url(#arrow-1412)\"></line>\n\n      <line x1=\"205\" y1=\"365\" x2=\"390\" y2=\"430\" class=\"svg-link svg-link--log\" marker-end=\"url(#arrow-1412)\"></line>\n      <line x1=\"490\" y1=\"365\" x2=\"490\" y2=\"430\" class=\"svg-link svg-link--log\" marker-end=\"url(#arrow-1412)\"></line>\n      <line x1=\"775\" y1=\"365\" x2=\"590\" y2=\"430\" class=\"svg-link svg-link--log\" marker-end=\"url(#arrow-1412)\"></line>\n      <line x1=\"595\" y1=\"200\" x2=\"520\" y2=\"430\" class=\"svg-link svg-link--log\" marker-end=\"url(#arrow-1412)\"></line>\n      <line x1=\"355\" y1=\"200\" x2=\"440\" y2=\"430\" class=\"svg-link svg-link--log\" marker-end=\"url(#arrow-1412)\"></line>\n      <line x1=\"820\" y1=\"200\" x2=\"560\" y2=\"430\" class=\"svg-link svg-link--log\" marker-end=\"url(#arrow-1412)\"></line>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratório\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é conceitual e defensivo: você criará um plano de observabilidade para uma rede cloud híbrida. O objetivo não é contratar serviços pagos, mas aprender a desenhar o que deve ser coletado, onde armazenar, por quanto tempo, como pesquisar e como usar em troubleshooting.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios treinam o raciocínio de evidência. Em vez de perguntar “qual ferramenta usar?”, você deve responder “qual pergunta operacional preciso responder e qual sinal comprova a hipótese?”.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio é construir uma matriz de observabilidade para uma landing zone cloud com workloads privados, publicação pública, conectividade híbrida, DNS privado, Kubernetes, firewall central e SIEM.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como organizar logs por camada e transformar dados brutos em linha do tempo de investigação.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Observabilidade em Cloud Networking é a capacidade de diagnosticar conectividade, segurança, desempenho, mudança e custo usando evidências. Flow logs mostram metadados de fluxo; métricas mostram tendência e saúde; auditoria mostra mudanças; logs de DNS, LB, WAF, firewall, Kubernetes e aplicação completam o contexto.</p>\n  <p>O aprendizado central é: <strong>não investigue rede cloud por achismo</strong>. Construa uma linha do tempo com fluxo, rota, regra, identidade, alteração, métrica, custo e impacto. Só então decida a correção.</p>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, você estudará <strong>Landing Zone, governança, hub de segurança e arquitetura corporativa</strong>. Depois de aprender a observar e diagnosticar a rede cloud, o próximo passo é organizar esses controles em uma base corporativa padronizada para múltiplas contas, assinaturas, projetos, ambientes e times.</p>\n\n</section>"
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
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "ICMP",
      "DNS",
      "TLS",
      "HTTP",
      "BGP",
      "IPFIX"
    ],
    "dependsOn": [
      "VPC/VNet",
      "subnets",
      "rotas",
      "SG/NSG",
      "firewall",
      "DNS",
      "Load Balancer",
      "VPN",
      "Kubernetes",
      "SIEM"
    ],
    "enables": [
      "troubleshooting profissional",
      "detecção defensiva",
      "governança de rede cloud",
      "auditoria de mudanças",
      "otimização de custos"
    ]
  },
  "lab": {
    "id": "lab-14.12",
    "title": "Plano de observabilidade para Cloud Networking",
    "labType": "cloud-simulavel",
    "objective": "Projetar um plano de logs, métricas, auditoria, retenção, alertas e runbooks para uma rede cloud híbrida sem provisionar recursos pagos.",
    "scenario": "15. Laboratório O laboratório desta aula é conceitual e defensivo: você criará um plano de observabilidade para uma rede cloud híbrida. O objetivo não é contratar serviços pagos, mas aprender a desenhar o que deve ser coletado, onde armazenar, por quanto tempo, como pesquisar e como usar em troubleshooting.",
    "topology": "Uma landing zone com hub-spoke, firewall central, VPN híbrida, load balancer público, workloads privados, Kubernetes, DNS público/privado, private endpoints e SIEM corporativo.",
    "architecture": "Cada camada gera sinais: DNS, LB/WAF, firewall, VPC/VNet flow logs, NAT, VPN, Kubernetes, endpoints privados, auditoria de API e billing. Os sinais são enviados a um log lake/SIEM com tags, retenção e dashboards.",
    "prerequisites": [
      "Não criar recursos reais pagos.",
      "Definir pelo menos 10 fontes de logs ou métricas.",
      "Classificar cada fonte por camada, dono, retenção e uso em incidente.",
      "Criar pelo menos 6 alertas defensivos.",
      "Criar um runbook para indisponibilidade e outro para custo anômalo."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "120-160 min",
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
        "title": "Mapear perguntas operacionais",
        "instruction": "Liste as perguntas que o time precisa responder: conectividade, bloqueio, latência, mudança, exposição pública, egress e custo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma lista de perguntas antes da escolha das ferramentas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Mapear fontes de evidência",
        "instruction": "Crie uma tabela com flow logs, firewall logs, LB/WAF logs, DNS logs, NAT metrics, VPN logs, Kubernetes events, audit logs, config changes e billing.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Inventário de fontes com camada, dono, destino e retenção.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Definir tags e normalização",
        "instruction": "Defina tags obrigatórias: aplicação, ambiente, owner, criticidade, centro de custo, dado sensível e exposição.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Política mínima de tags para correlacionar logs e custos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Desenhar pipeline de logs",
        "instruction": "Descreva onde cada log será armazenado, como será exportado ao SIEM e qual retenção terá em quente, morno e arquivo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fluxo de coleta, armazenamento, retenção e consulta.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Criar alertas defensivos",
        "instruction": "Defina alertas para criação de LB público, alteração de rota default, SG/NSG aberto, queda de VPN, egress anômalo e flow reject em serviço crítico.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Alertas com severidade, dono, janela, consulta e ação recomendada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Criar runbook de indisponibilidade",
        "instruction": "Monte uma sequência de investigação para usuário não acessa aplicação pública.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Runbook por camada: DNS, CDN/WAF, LB, health check, firewall, rota, backend, Kubernetes, aplicação e auditoria.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Criar runbook de custo anômalo",
        "instruction": "Monte uma investigação para aumento repentino de NAT, egress, logs ou load balancer.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Runbook que cruza billing, métricas, flow logs, tags e mudanças recentes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Definir testes de prontidão",
        "instruction": "Crie uma checklist para validar se os logs estão chegando antes de colocar o ambiente em produção.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Checklist de evidência mínima para go-live.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Observabilidade e troubleshooting: flow logs, métricas e auditoria” em evidência prática ou raciocínio verificável."
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
        "title": "Analisar dataset sintético de flow logs e DNS logs",
        "instruction": "Crie um pequeno dataset sintético e responda: quem falou com quem, qual fluxo foi rejeitado, qual nome DNS foi resolvido e qual evidência falta.",
        "command": "cat <<'EOF' > flowlogs-sintetico.log\n2026-07-01T10:00Z ACCEPT 10.20.1.10 10.20.8.15 443 12480 app-to-private-endpoint\n2026-07-01T10:01Z REJECT 10.20.1.10 198.51.100.20 443 0 blocked-public-egress\n2026-07-01T10:02Z ACCEPT 10.20.2.40 10.20.1.10 5432 3200 unexpected-db-path\nEOF\ngrep REJECT flowlogs-sintetico.log\nawk '{print $2,$3,$4,$5,$7}' flowlogs-sintetico.log",
        "expectedOutput": "Uma linha rejeitada de egress público e um fluxo interno inesperado que exige investigação de política.",
        "explanation": "Flow logs não mostram payload, mas ajudam a correlacionar origem, destino, porta, volume e decisão de política."
      },
      {
        "number": 12,
        "title": "Criar matriz pergunta-fonte-evidência-retenção-custo",
        "instruction": "Para cada pergunta operacional, indique qual fonte de telemetria responde, quanto tempo reter, risco de custo e owner.",
        "artifact": "Matriz: pergunta, fonte, campo necessário, retenção, custo, owner, alerta, ação.",
        "expectedOutput": "Matriz cobrindo flow logs, DNS logs, LB/WAF logs, audit logs, métricas NAT/VPN/firewall e eventos Kubernetes.",
        "explanation": "Ligar todos os logs sem pergunta operacional gera custo e ruído. Não ligar logs críticos torna incidente impossível de investigar."
      }
    ],
    "expectedResult": "Um plano completo de observabilidade cloud com fontes, retenção, tags, alertas e runbooks para troubleshooting e segurança.",
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
        "check": "Cada alerta possui ação operacional",
        "command": "Artefato: tabela alerta-sinal-threshold-owner-ação",
        "expected": "Nenhum alerta crítico sem owner, severidade, runbook e critério de encerramento.",
        "ifFails": "Remover alerta inútil ou criar runbook mínimo antes de colocá-lo em produção."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se não há flow logs, verifique se a coleta foi habilitada no escopo correto e se o destino tem permissão de escrita.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se logs existem mas não aparecem no SIEM, valide pipeline, parsing, atraso de ingestão, formato e filtros.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se um fluxo não aparece, confirme janela de agregação, amostragem, interface observada e se o tráfego chegou ao domínio monitorado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o alerta gera ruído, revise severidade, limiar, janela, supressão e enriquecimento por tag.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o custo de logs subiu, revise volume, retenção, duplicação de destinos, debug excessivo e exportação desnecessária.",
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
        "symptom": "Custo de logs cresce sem melhoria de detecção",
        "probableCause": "Retenção excessiva, logs duplicados, falta de amostragem ou coleta sem pergunta operacional.",
        "howToConfirm": "Comparar volume por fonte, consultas usadas, alertas acionados e custo por GB/retention.",
        "fix": "Ajustar retenção, filtros, sampling, compressão e escopo por criticidade."
      }
    ],
    "improvements": [
      "Adicionar detecção de drift entre IaC e configuração real.",
      "Criar queries salvas para incidentes recorrentes.",
      "Integrar CMDB ou inventário com tags cloud.",
      "Usar retenção diferenciada por criticidade e compliance.",
      "Automatizar validação de logs em pipeline de landing zone.",
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
      "Qual evidência mostra que o laboratório de “Observabilidade e troubleshooting: flow logs, métricas e auditoria” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?",
      "Qual parte deste lab poderia gerar custo recorrente mesmo sem tráfego de usuário?",
      "Qual evidência prova que a conectividade funciona sem confundir rede com autorização IAM?",
      "Qual recurso precisa ser destruído primeiro para evitar dependências órfãs?",
      "Qual log permite investigar falha de rede e qual log permite investigar alteração administrativa?"
    ],
    "challenge": "Criar matriz de observabilidade para uma landing zone cloud",
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
    "zeroCostAlternative": "Usar logs sintéticos textuais e planilha de decisão sem ativar ingestão real de logs em cloud.",
    "estimatedCostDrivers": [
      "recursos cobrados por hora, como NAT Gateway, VPN Gateway, firewall gerenciado, load balancer e endpoints privados",
      "processamento por GB em endpoints, NAT, firewall, load balancer e logs",
      "tráfego entre zonas, regiões, internet, peering, VPN e links dedicados",
      "armazenamento, retenção, consulta e ingestão de logs",
      "custo operacional humano de manter exceções, rotas, DNS, certificados e runbooks"
    ],
    "cloudValidationProfile": {
      "lesson": "14.12",
      "scope": "Observabilidade cloud com flow logs, DNS logs, LB/WAF logs, auditoria e custos",
      "simulationMode": "dataset sintético local de logs + matriz pergunta-fonte-evidência",
      "optionalRealCloudMode": "habilitar logs apenas em ambiente autorizado com retenção curta e budget",
      "requiredArtifacts": [
        "mapa de telemetria",
        "dataset sintético analisado",
        "política de retenção",
        "matriz custo/valor do log",
        "runbook de incidente"
      ],
      "passCriteria": [
        "cada pergunta operacional possui fonte de telemetria",
        "retenção e custo são justificados",
        "logs sensíveis são sanitizados"
      ]
    }
  },
  "exercises": [
    {
      "question": "Por que flow logs não substituem captura de pacotes?",
      "answer": "Porque flow logs normalmente registram metadados de fluxo, como origem, destino, porta, protocolo, ação, bytes e tempo. Eles não mostram necessariamente o payload nem detalhes de aplicação suficientes para reconstruir o conteúdo da comunicação."
    },
    {
      "question": "Uma aplicação parou após mudança de Terraform. Quais evidências você correlacionaria?",
      "answer": "Eventos de auditoria/API, plano e apply do Terraform, mudança em rota/SG/NSG/firewall/DNS/LB, flow logs antes e depois, métricas de health check e logs de aplicação."
    },
    {
      "question": "Como investigar custo anômalo de NAT Gateway?",
      "answer": "Cruzar billing, métricas de bytes do NAT, flow logs de subnets privadas, tags de workloads, destinos mais acessados, endpoints privados ausentes, tráfego inter-regional e mudanças recentes."
    },
    {
      "question": "Qual risco existe em manter logs sem tags consistentes?",
      "answer": "Os logs ficam tecnicamente coletados, mas difíceis de correlacionar com aplicação, dono, ambiente, criticidade e custo, atrasando incidentes e dificultando governança."
    },
    {
      "id": "ex14.12.p1.1",
      "type": "arquitetura",
      "prompt": "Desenhe uma matriz de observabilidade para investigar aumento de custo de NAT Gateway.",
      "expectedAnswer": "Deve correlacionar billing por tag, métricas NAT, flow logs, DNS logs, top talkers, rotas, endpoints privados disponíveis e owner da workload.",
      "explanation": "Custos de NAT quase sempre exigem cruzamento entre rota, tráfego, destino, tags e arquitetura de egress."
    }
  ],
  "quiz": [
    {
      "question": "Qual é a melhor definição de flow logs em cloud networking?",
      "options": [
        "Captura completa do conteúdo de todos os pacotes",
        "Metadados agregados de fluxos de rede",
        "Backup automático de firewalls",
        "Inventário de usuários IAM"
      ],
      "correctAnswer": 1,
      "explanation": "Flow logs normalmente registram metadados de fluxo, não o conteúdo completo dos pacotes."
    },
    {
      "question": "Qual fonte responde melhor à pergunta: quem alterou uma route table?",
      "options": [
        "Flow log",
        "Trilha de auditoria de API",
        "Métrica de CPU",
        "TTL de DNS"
      ],
      "correctAnswer": 1,
      "explanation": "Alterações de configuração são registradas em auditoria do plano de controle, como CloudTrail, Activity Log ou Cloud Audit Logs."
    },
    {
      "question": "O que uma métrica de load balancer com muitos targets unhealthy sugere?",
      "options": [
        "Apenas cobrança alta",
        "Possível falha de backend, health check, rota, firewall ou aplicação",
        "Que DNS privado é desnecessário",
        "Que flow logs devem ser removidos"
      ],
      "correctAnswer": 1,
      "explanation": "Targets unhealthy indicam que o LB não consegue validar saúde dos backends, exigindo investigação por camadas."
    },
    {
      "question": "Qual é uma má prática de observabilidade?",
      "options": [
        "Definir retenção",
        "Proteger logs contra exclusão indevida",
        "Habilitar logs somente depois do incidente",
        "Correlacionar auditoria e flow logs"
      ],
      "correctAnswer": 2,
      "explanation": "Logs não coletados antes do incidente não podem ser recriados de forma confiável."
    },
    {
      "question": "Em investigação de custo de egress, qual combinação é mais útil?",
      "options": [
        "Billing, tags, métricas de bytes e flow logs",
        "Apenas ping",
        "Apenas captura local",
        "Somente número de usuários"
      ],
      "correctAnswer": 0,
      "explanation": "Custo precisa ser atribuído por recurso, tráfego, dono e destino."
    },
    {
      "question": "Por que logs de auditoria são importantes para segurança?",
      "options": [
        "Porque mostram o payload HTTP completo",
        "Porque registram mudanças e ações feitas por identidades e serviços",
        "Porque substituem firewall",
        "Porque eliminam necessidade de IAM"
      ],
      "correctAnswer": 1,
      "explanation": "Auditoria ajuda a identificar quem ou o que alterou recursos, políticas e configurações."
    },
    {
      "id": "q14.12.p1.1",
      "type": "conceito",
      "q": "Qual é o erro mais perigoso ao usar flow logs como única fonte de observabilidade?",
      "opts": [
        "Eles mostram todos os payloads HTTP",
        "Assumir que eles explicam identidade, payload, decisão da aplicação e intenção do usuário",
        "Eles não servem para volume de tráfego",
        "Eles substituem auditoria de mudanças"
      ],
      "a": 1,
      "exp": "Flow logs são excelentes para tráfego e metadados, mas precisam ser correlacionados com DNS, LB/WAF, aplicação, IAM e auditoria.",
      "difficulty": "intermediário",
      "topic": "Observabilidade"
    }
  ],
  "flashcards": [
    {
      "front": "Flow logs",
      "back": "Registros de metadados de fluxos de rede, úteis para investigar origem, destino, porta, protocolo, ação e volume."
    },
    {
      "front": "Métrica",
      "back": "Sinal numérico agregado usado para acompanhar saúde, volume, erro, latência, bytes ou disponibilidade."
    },
    {
      "front": "Auditoria",
      "back": "Registro de ações no plano de controle, como criação, alteração e exclusão de recursos."
    },
    {
      "front": "Linha do tempo",
      "back": "Reconstrução ordenada de eventos, mudanças, métricas e fluxos para explicar um incidente."
    },
    {
      "front": "Retenção",
      "back": "Período pelo qual logs e eventos ficam disponíveis para consulta, investigação e compliance."
    },
    {
      "front": "Cardinalidade",
      "back": "Quantidade de combinações únicas em campos de log ou métrica; cardinalidade alta pode aumentar custo e complexidade."
    },
    {
      "id": "fc14.12.p1.1",
      "front": "Flow log responde “quem falou com quem”?",
      "back": "Sim, em nível de metadados de fluxo, mas não substitui logs de aplicação, IAM, DNS, WAF ou auditoria.",
      "tags": [
        "flow-logs",
        "observabilidade"
      ],
      "difficulty": "intermediário"
    }
  ],
  "mentorQuestions": [
    "Se uma aplicação crítica parar agora, você sabe exatamente quais logs consultar nos primeiros 10 minutos?",
    "Quem consegue apagar ou alterar os logs que seriam usados para investigar um incidente de segurança?",
    "Você consegue atribuir custo de NAT, egress e logs por aplicação, ambiente e dono?"
  ],
  "challenge": {
    "title": "Criar matriz de observabilidade para uma landing zone cloud",
    "scenario": "Uma empresa vai operar uma landing zone com três ambientes: produção, homologação e segurança. Há hub-spoke, firewall central, VPN híbrida, Kubernetes, load balancers públicos, endpoints privados, DNS privado e SIEM. O CISO pediu evidências para incidentes, e o FinOps pediu rastreabilidade de custos de rede.",
    "tasks": [
      "Criar matriz de fontes de logs e métricas por camada.",
      "Definir retenção e destino de cada fonte.",
      "Definir tags obrigatórias para correlação operacional e financeira.",
      "Criar seis alertas defensivos com severidade e dono.",
      "Criar runbook para falha de acesso público.",
      "Criar runbook para aumento de custo de egress/NAT.",
      "Explicar limites dos flow logs e fontes complementares."
    ],
    "successCriteria": [
      "A matriz cobre rede, DNS, LB/WAF, firewall, VPN, Kubernetes, auditoria e custo.",
      "Cada alerta tem ação clara e dono definido.",
      "Logs críticos têm retenção e proteção contra exclusão indevida.",
      "A investigação consegue correlacionar mudança, tráfego, identidade e impacto.",
      "O plano considera custo de ingestão, armazenamento e consulta de logs."
    ],
    "gradingRubric": [
      {
        "criterion": "Cobertura de telemetria",
        "points": 20,
        "description": "Inclui flow logs, DNS, LB/WAF, firewall, VPN, Kubernetes, auditoria e billing."
      },
      {
        "criterion": "Correlação operacional",
        "points": 20,
        "description": "Liga sintoma a fonte de evidência, owner e ação."
      },
      {
        "criterion": "Limitações e amostragem",
        "points": 20,
        "description": "Explica o que cada log não prova e quando usar fontes complementares."
      },
      {
        "criterion": "Retenção e custo",
        "points": 20,
        "description": "Define retenção por criticidade, custo de ingestão/armazenamento e descarte seguro."
      },
      {
        "criterion": "Runbooks",
        "points": 20,
        "description": "Inclui runbooks para incidente de disponibilidade, segurança e custo."
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
      "Dataset sintético analisado",
      "Matriz pergunta-fonte-evidência-retenção-custo",
      "Runbook de incidente de rede cloud"
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução madura organiza observabilidade como produto da plataforma: cada recurso nasce com logs, métricas, auditoria, tags, alertas, destino seguro, retenção e runbook. O SIEM não recebe apenas dados; recebe dados correlacionáveis.",
    "steps": [
      "Habilitar flow logs no escopo correto para redes críticas, com destino centralizado.",
      "Coletar logs de LB/WAF, DNS, firewall, VPN, Kubernetes e serviços gerenciados.",
      "Garantir auditoria de API e configuração para mudanças de rede.",
      "Padronizar tags de owner, aplicação, ambiente, criticidade e centro de custo.",
      "Criar alertas para exposição pública, alteração de rota, abertura de portas, queda de túnel e egress anômalo.",
      "Separar retenção quente para investigação rápida e arquivo para compliance.",
      "Versionar runbooks e queries de investigação junto com IaC e documentação da plataforma."
    ],
    "commonMistakes": [
      "Coletar logs sem saber quais perguntas eles respondem.",
      "Não habilitar auditoria em todas as regiões/projetos/assinaturas relevantes.",
      "Armazenar logs no mesmo domínio administrativo do ambiente investigado sem proteção.",
      "Criar alertas sem dono, severidade ou ação recomendada.",
      "Ignorar custo de ingestão, retenção e consulta de logs."
    ]
  },
  "glossary": [
    {
      "term": "Flow log",
      "shortDefinition": "Log de metadados de fluxo de rede.",
      "longDefinition": "Registro agregado que descreve comunicação entre origem e destino, normalmente com IP, porta, protocolo, ação, bytes e janela de tempo.",
      "example": "Um flow log mostra tráfego rejeitado da subnet web para o banco na porta 5432.",
      "relatedTerms": [
        "NetFlow",
        "IPFIX",
        "SIEM"
      ],
      "relatedLessons": [
        "13.4",
        "14.12"
      ]
    },
    {
      "term": "Audit log",
      "shortDefinition": "Log de ações no plano de controle.",
      "longDefinition": "Registro de chamadas de API, criação, alteração e exclusão de recursos, geralmente associado a identidade, horário, origem e resultado.",
      "example": "Evento indicando que um usuário alterou uma regra de security group.",
      "relatedTerms": [
        "CloudTrail",
        "Activity Log",
        "IAM"
      ],
      "relatedLessons": [
        "13.5",
        "14.12"
      ]
    },
    {
      "term": "Métrica",
      "shortDefinition": "Medida numérica de comportamento.",
      "longDefinition": "Sinal agregado usado para acompanhar saúde, volume, latência, erro, bytes, conexões ou disponibilidade.",
      "example": "Métrica de targets unhealthy em um load balancer.",
      "relatedTerms": [
        "alerta",
        "dashboard"
      ],
      "relatedLessons": [
        "14.6",
        "14.12"
      ]
    },
    {
      "term": "Retenção",
      "shortDefinition": "Tempo de preservação de logs.",
      "longDefinition": "Política que define por quanto tempo eventos e registros ficam disponíveis em armazenamento quente, morno, frio ou arquivo.",
      "example": "Flow logs críticos retidos por 90 dias pesquisáveis e 1 ano arquivados.",
      "relatedTerms": [
        "compliance",
        "custo"
      ],
      "relatedLessons": [
        "14.12"
      ]
    },
    {
      "term": "SIEM",
      "shortDefinition": "Plataforma de correlação de eventos de segurança.",
      "longDefinition": "Sistema que centraliza, normaliza e correlaciona logs e alertas para investigação, detecção e resposta.",
      "example": "SIEM correlaciona criação de LB público com aumento de tráfego externo.",
      "relatedTerms": [
        "correlação",
        "SOC"
      ],
      "relatedLessons": [
        "13.5",
        "14.12"
      ]
    },
    {
      "term": "Runbook",
      "shortDefinition": "Procedimento operacional de investigação ou resposta.",
      "longDefinition": "Documento com sequência de ações, evidências, consultas, critérios de decisão e responsáveis para tratar um cenário recorrente.",
      "example": "Runbook para investigar erro 503 em aplicação publicada por load balancer.",
      "relatedTerms": [
        "playbook",
        "RCA"
      ],
      "relatedLessons": [
        "13.9",
        "14.12",
        "15.1"
      ]
    },
    {
      "term": "Amostragem de logs",
      "shortDefinition": "Coleta parcial de eventos ou fluxos para reduzir volume e custo.",
      "longDefinition": "Em telemetria de rede, amostragem pode reduzir custo e overhead, mas também limita investigações. Por isso, é necessário documentar o que pode ou não ser provado com cada fonte.",
      "example": "Flow logs com amostragem podem mostrar tendência e top talkers, mas uma investigação forense profunda pode exigir packet mirroring ou logs complementares.",
      "relatedTerms": [
        "Flow logs",
        "SIEM",
        "retenção",
        "forense"
      ],
      "relatedLessons": [
        "14.12",
        "15.11",
        "16.11"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "VPC Flow Logs",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
      "note": "Documenta captura de informações sobre tráfego IP entrando e saindo de interfaces de rede em uma VPC."
    },
    {
      "type": "official-doc",
      "title": "Flow log records",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/flow-log-records.html",
      "note": "Explica que registros de flow log representam fluxos IP e campos como origem, destino e protocolo."
    },
    {
      "type": "official-doc",
      "title": "Virtual Network Flow Logs",
      "organization": "Microsoft Azure",
      "url": "https://learn.microsoft.com/en-us/azure/network-watcher/vnet-flow-logs-overview",
      "note": "Documenta logging de informações sobre tráfego IP em uma virtual network."
    },
    {
      "type": "official-doc",
      "title": "VPC Flow Logs",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/vpc/docs/flow-logs",
      "note": "Explica amostragem de pacotes e agregação por conexão 5-tuple em VPC Flow Logs."
    },
    {
      "type": "official-doc",
      "title": "What Is AWS CloudTrail?",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html",
      "note": "Documenta auditoria, governança e compliance de ações em contas AWS."
    },
    {
      "type": "official-doc",
      "title": "Cloud Audit Logs overview",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/logging/docs/audit",
      "note": "Referência para logs de auditoria no Google Cloud."
    },
    {
      "type": "official-doc",
      "title": "Network Intelligence Center overview",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/network-intelligence-center/docs/overview",
      "note": "Referência oficial sobre Flow Analyzer, Connectivity Tests, Performance Dashboard e Firewall Insights."
    },
    {
      "type": "official-doc",
      "title": "Cloud Architecture Framework / Well-Architected guidance",
      "organization": "AWS/Azure/Google Cloud",
      "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
      "note": "Use como referência de princípios de arquitetura, custo, operação, segurança e confiabilidade, adaptando ao provedor escolhido."
    }
  ],
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
              "name": "Risco cloud específico — Observabilidade e troubleshooting: flow logs, métricas e auditoria",
              "description": "Em Observabilidade e troubleshooting: flow logs, métricas e auditoria, o risco principal é criar caminho privado, rota, endpoint, peering, CNI, observabilidade ou landing zone que pareça segura, mas permita exposição pública residual, bypass de firewall, resolução DNS privada incorreta, rota assimétrica ou tráfego sem telemetria.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 14.12."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Observabilidade e troubleshooting: flow logs, métricas e auditoria.",
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
      "Qual evidência comprova o entendimento da aula 14.12?"
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
      "14.13"
    ]
  },
  "cloudFinalReview": {
    "reviewId": "p1-m14-final-14.12",
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
  "observabilityArchitecture": {
    "telemetrySources": [
      {
        "source": "Flow logs",
        "use": "forense, segurança, troubleshooting e otimização de custo",
        "limitation": "pode haver amostragem e não mostra payload",
        "owner": "Rede/SOC/FinOps"
      },
      {
        "source": "DNS logs",
        "use": "validar resolução pública/privada e detectar domínios anômalos",
        "limitation": "não prova que a conexão final funcionou",
        "owner": "Rede/Plataforma/SOC"
      },
      {
        "source": "LB/WAF logs",
        "use": "analisar publicação HTTP/HTTPS, bloqueios, 4xx/5xx e latência",
        "limitation": "não cobre tráfego que não passa pelo balanceador",
        "owner": "Aplicação/SecOps"
      },
      {
        "source": "Cloud audit logs",
        "use": "rastrear alteração de rota, firewall, IAM, DNS, endpoint e logging",
        "limitation": "não substitui telemetria de tráfego",
        "owner": "Plataforma/GRC/SOC"
      },
      {
        "source": "Billing/cost allocation",
        "use": "identificar custo por owner, ambiente, recurso e tráfego",
        "limitation": "sem tags e granularidade, vira investigação manual",
        "owner": "FinOps/Plataforma"
      }
    ],
    "alertingRules": [
      "Aumento súbito de tráfego via NAT ou egress internet.",
      "Criação de load balancer público fora do pipeline aprovado.",
      "Queda de health check ou aumento de 5xx no LB/WAF.",
      "Consulta DNS privada resolvendo para IP público inesperado.",
      "Alteração de rota, firewall, endpoint ou IAM fora da janela de mudança.",
      "Volume anormal de tráfego inter-região ou entre zonas."
    ],
    "retentionModel": [
      "Hot curto para troubleshooting rápido",
      "Warm médio para investigação e tendência",
      "Archive longo apenas para evidências regulatórias necessárias"
    ]
  },
  "p1_09_cloudNetworkingv2final": {
    "status": "aplicado",
    "focus": "Observabilidade cloud com flow logs, DNS logs, LB/WAF logs, auditoria e custos",
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
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e SRE",
      "lesson": "Logs, métricas, traces e alertas acionáveis",
      "reason": "Observabilidade cloud networking precisa ser integrada a SRE, SIEM e runbooks operacionais."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Auditoria",
      "lesson": "Logs de identidade e trilha de auditoria",
      "reason": "Alterações de rota, firewall, DNS e endpoints precisam ser correlacionadas com identidade administrativa."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    }
  ],
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false,
    "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
  }
};
