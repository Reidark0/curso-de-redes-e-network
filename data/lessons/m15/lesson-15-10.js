export const lesson1510 = {
  "id": "15.10",
  "moduleId": "m15",
  "order": 10,
  "title": "Troubleshooting Cloud Networking",
  "subtitle": "Como diagnosticar VPC/VNet, subnets, rotas, NAT, DNS privado, Private Link, Security Groups/NSG, VPN/BGP, Kubernetes, flow logs, auditoria e custos em cloud — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "240-320 min",
  "estimatedStudyTimeMinutes": 320,
  "difficulty": "avançado",
  "type": "fundamental",
  "xp": 320,
  "tags": [
    "troubleshooting",
    "cloud networking",
    "VPC",
    "VNet",
    "route tables",
    "NAT Gateway",
    "Security Groups",
    "NSG",
    "Private Link",
    "Private Endpoint",
    "DNS privado",
    "VPN",
    "BGP",
    "Kubernetes",
    "flow logs",
    "auditoria",
    "FinOps",
    "DevSecOps",
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
      "module": "m14",
      "lesson": "14.3",
      "reason": "CIDR, VPC/VNet e subnets são base para investigar cloud networking."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.4",
      "reason": "Route tables, NAT e UDR são causas frequentes de indisponibilidade."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.5",
      "reason": "Security Groups, NSG, NACL e Cloud Firewalls são controles centrais do fluxo efetivo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.7",
      "reason": "DNS público, privado, split-horizon e service discovery afetam quase todo troubleshooting cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.10",
      "reason": "Private Link e endpoints privados exigem correlação entre DNS, rota, política e serviço gerenciado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Coleta de evidências, baseline e linha do tempo são obrigatórias antes de diagnosticar cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.7",
      "reason": "Firewall, ACL, NAT e políticas são usados para entender bloqueios cloud."
    }
  ],
  "objectives": [
    "Diagnosticar conectividade cloud usando método por fluxo efetivo e evidência.",
    "Separar falhas de DNS, rota, NAT, política, endpoint privado, load balancer, Kubernetes, VPN/BGP e serviço.",
    "Usar flow logs, métricas, auditoria e ferramentas de reachability para reduzir adivinhação.",
    "Identificar riscos de segurança durante correções emergenciais em cloud.",
    "Relacionar troubleshooting técnico com custos de NAT, egress, logs, transit, firewall e inter-region.",
    "Transformar incidentes recorrentes em guardrails de DevSecOps, testes sintéticos e policy as code.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um timeout entre duas subnets, o aluno verifica rota efetiva, SG/NSG, NACL/firewall, retorno e flow logs.",
    "Dado um Private Endpoint ignorado, o aluno valida DNS privado, associação de zona, resolução dentro da origem e política do endpoint.",
    "Dado um 502 em load balancer cloud, o aluno diferencia listener, health check, target, rota, SG/NSG, TLS e aplicação.",
    "Dado um túnel cloud up sem tráfego, o aluno investiga BGP, prefixos, propagação, rota de retorno, NAT e firewall.",
    "Dado um custo alto de NAT/egress, o aluno cruza flow logs, billing, tags, DNS, private endpoints e rotas.",
    "Dado um incidente cloud, o aluno entrega dossiê com linha do tempo, evidências, causa raiz, mitigação e prevenção.",
    "Dado o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Troubleshooting em cloud networking é difícil porque a rede deixou de ser apenas cabo, switch e roteador visíveis. Em ambientes cloud, o caminho de um pacote pode atravessar VPC/VNet, subnet, route table, security group, NSG, NACL, cloud firewall, NAT gateway, load balancer, private endpoint, DNS privado, peering, transit, VPN, BGP, Kubernetes CNI, serviço gerenciado, IAM e políticas organizacionais.</p>\n  <p>A motivação desta aula é ensinar o aluno a diagnosticar cloud networking sem depender de tentativa e erro. Em vez de “abrir tudo para testar”, o método profissional é montar um mapa do fluxo, verificar a configuração efetiva, consultar logs, testar reachability, isolar o ponto de bloqueio e aplicar a menor alteração segura possível.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> em cloud, duas máquinas podem estar na mesma VPC e ainda assim não se comunicar; uma aplicação pode resolver um DNS público quando deveria resolver privado; um Private Endpoint pode existir mas ser ignorado pelo DNS; um Security Group pode permitir, mas a NACL bloquear; o NAT pode funcionar, mas gerar custo anômalo; o BGP pode anunciar prefixo, mas o retorno falhar.</div>\n  <p>Para Segurança da Informação, cloud troubleshooting precisa preservar evidência e evitar bypass de controles. Para DevSecOps, precisa virar teste automatizado, policy as code e validação pós-deploy. Para operação, precisa reduzir tempo médio de diagnóstico sem criar dívida técnica ou exposição pública temporária que vira permanente.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>No datacenter tradicional, o troubleshooting era fortemente baseado em equipamentos físicos: verificar porta, cabo, VLAN, rota, firewall e logs. Com virtualização e cloud, parte desse controle foi transferida para APIs, objetos declarativos e serviços gerenciados.</p>\n  <p>A primeira grande mudança foi a virtualização da rede: switches virtuais, NICs virtuais, subnets lógicas e firewalls distribuídos. Depois vieram VPCs e VNets, onde o desenho de rede passou a ser criado por software. Com o avanço de cloud híbrida, surgiram VPNs gerenciadas, links dedicados, BGP, peering, transit gateways, Virtual WAN, endpoints privados e conectividade orientada a serviços.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Rede física:</strong> diagnóstico centrado em cabo, porta, VLAN, roteador e firewall físico.</div><div class=\"timeline-item\"><strong>Virtualização:</strong> redes lógicas dentro de hosts e hipervisores.</div><div class=\"timeline-item\"><strong>VPC/VNet:</strong> subnets, rotas e políticas como objetos de API.</div><div class=\"timeline-item\"><strong>Cloud híbrida:</strong> VPN, BGP, links dedicados e integração com datacenter.</div><div class=\"timeline-item\"><strong>Serviços privados:</strong> Private Link, endpoints privados e DNS split-horizon.</div><div class=\"timeline-item\"><strong>Observabilidade cloud:</strong> flow logs, reachability tools, auditoria e telemetria integrada.</div></div>\n  <p>A evolução melhorou elasticidade e velocidade, mas aumentou o número de camadas invisíveis. Por isso, troubleshooting cloud exige domínio dos fundamentos de redes vistos nos módulos anteriores e entendimento das abstrações específicas dos provedores.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema desta aula é diagnosticar falhas de rede em cloud quando o sintoma é genérico: “não conecta”, “timeout”, “502”, “serviço privado inacessível”, “DNS resolve errado”, “Kubernetes não sai para internet”, “VPN está up mas não passa tráfego”, “o custo de rede explodiu” ou “só falha entre regiões”.</p>\n  <p>Em cloud, o erro costuma estar em uma destas categorias:</p>\n  <ul>\n    <li><strong>Endereçamento:</strong> CIDR sobreposto, subnet errada, IP exaurido, rota para bloco incorreto ou conflito híbrido;</li>\n    <li><strong>Roteamento:</strong> route table incorreta, rota default ausente, UDR enviando para NVA errado, propagação desabilitada ou rota mais específica inesperada;</li>\n    <li><strong>Controle de tráfego:</strong> Security Group, NSG, NACL, firewall cloud, WAF ou policy organizacional bloqueando;</li>\n    <li><strong>DNS:</strong> zona privada não associada, split-horizon incorreto, resolver híbrido quebrado, cache antigo ou Private Endpoint sem registro correto;</li>\n    <li><strong>Egress:</strong> NAT ausente, NAT saturado, rota para internet errada, firewall sem SNAT, proxy obrigatório ignorado ou custo anômalo;</li>\n    <li><strong>Ingress:</strong> load balancer, listener, health check, target group, certificado, WAF, CDN ou backend privado;</li>\n    <li><strong>Híbrido:</strong> VPN/BGP up sem prefixo correto, rota de retorno ausente, CIDR sobreposto, assimetria ou firewall on-premises;</li>\n    <li><strong>Kubernetes:</strong> CNI, consumo de IP, NetworkPolicy, Service, Ingress, CoreDNS, egress ou health check;</li>\n    <li><strong>Governança:</strong> deny policy, Azure Policy, SCP, firewall central, rota injetada, tag ausente ou módulo IaC divergente.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha profissional:</strong> a cloud dá permissão para mudar rápido, mas isso não significa que se deve diagnosticar mudando. Alterações como abrir 0.0.0.0/0, publicar banco, remover WAF ou desativar logs podem resolver o sintoma e criar incidente de segurança.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público</h3>\n  <p><strong>Sintoma observado:</strong> Aplicação em cloud deveria acessar serviço privado, mas flow logs mostram egress público e o custo de NAT Gateway subiu.</p>\n  <p><strong>Impacto operacional:</strong> Risco de exposição indevida, custo inesperado e falha de compliance por caminho não privado.</p>\n  <p><strong>Fluxo esperado:</strong> Workload → DNS privado → rota efetiva → NSG/SG → Private Endpoint/PrivateLink → serviço gerenciado → logs</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>16:00: Private Endpoint aprovado</li><li>16:20: DNS privado criado só em uma VNet</li><li>17:00: custo NAT aumenta</li><li>17:30: alerta compliance</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>DNS privado ausente</td><td>Nome resolve IP público</td><td>nslookup/dig de dentro da VNet</td><td>Alta</td></tr><tr><td>Rota efetiva errada</td><td>Próximo salto NAT/Internet</td><td>effective routes</td><td>Alta</td></tr><tr><td>Policy NSG/SG</td><td>Private IP resolve mas conecta timeout</td><td>flow logs</td><td>Alta</td></tr><tr><td>Peering/propagação</td><td>Rede remota não usa DNS/rota esperada</td><td>peering flags/route tables</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>O troubleshooting cloud evoluiu junto com a própria arquitetura cloud. No início, muitos times tratavam VPC/VNet como uma LAN virtual simples. Bastava criar subnet, liberar porta e subir VM. Em ambientes corporativos modernos, isso não é suficiente: há múltiplas contas, landing zones, hub-spoke, inspeção centralizada, private endpoints, Kubernetes, serviços gerenciados, IaC e políticas organizacionais.</p>\n  <p>A evolução prática foi sair de comandos isolados para investigação por evidência:</p>\n  <ul>\n    <li><strong>Antes:</strong> testar ping, abrir regra, reiniciar VM e verificar se voltou;</li>\n    <li><strong>Agora:</strong> mapear fluxo, consultar configuração efetiva, validar caminho lógico, verificar logs, testar DNS, confirmar política, correlacionar auditoria e medir custo;</li>\n    <li><strong>Próximo nível:</strong> transformar troubleshooting em automação: testes sintéticos, reachability checks, policy as code, drift detection, alertas e runbooks.</li>\n  </ul>\n  <p>Ferramentas nativas dos provedores acompanham essa evolução. AWS oferece Reachability Analyzer e VPC Flow Logs; Azure oferece Network Watcher, IP flow verify, effective routes e flow logs; Google Cloud oferece Network Intelligence Center, Connectivity Tests e VPC Flow Logs. Elas não substituem raciocínio, mas reduzem a dependência de adivinhação.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Troubleshooting Cloud Networking</strong> é o processo estruturado de diagnosticar conectividade, desempenho, exposição, roteamento, resolução de nomes, políticas e custo em redes virtuais e serviços de rede gerenciados em cloud.</p>\n  <p>O conceito central é o <strong>fluxo efetivo</strong>. Não basta olhar a intenção arquitetural. É preciso saber qual caminho o tráfego realmente toma e quais controles realmente se aplicam naquele momento. Em cloud, o fluxo efetivo nasce da combinação de:</p>\n  <ul>\n    <li>origem, destino, protocolo e porta;</li>\n    <li>subnet e interface de rede;</li>\n    <li>route table efetiva;</li>\n    <li>Security Group/NSG/NACL/firewall efetivo;</li>\n    <li>DNS usado pela origem;</li>\n    <li>NAT, egress, proxy ou private endpoint;</li>\n    <li>load balancer, health check e backend;</li>\n    <li>políticas organizacionais e IAM;</li>\n    <li>logs, métricas e auditoria disponíveis.</li>\n  </ul>\n  <div class=\"callout callout--info\"><strong>Definição operacional:</strong> diagnosticar cloud networking é provar, com evidência, onde um pacote deveria ir, onde ele está indo, qual controle permite ou bloqueia, qual serviço registra o evento e qual mudança mínima corrige sem comprometer segurança.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Por dentro, uma rede cloud é composta por objetos lógicos que o provedor traduz em comportamento distribuído. Uma subnet não é um switch físico que você vê. Um Security Group não é uma ACL tradicional única. Um NAT Gateway não é apenas uma regra em um roteador. Um Private Endpoint não é somente um IP; ele depende de interface, DNS, política e integração com o serviço.</p>\n  <p>O troubleshooting profissional precisa considerar os seguintes planos:</p>\n  <ul>\n    <li><strong>Plano de intenção:</strong> Terraform, CloudFormation, Bicep, ARM, Pulumi, Helm, Kustomize, tickets e diagramas;</li>\n    <li><strong>Plano de controle:</strong> API do provedor, route tables, peerings, attachments, gateways, policies e auditoria;</li>\n    <li><strong>Plano de dados:</strong> tráfego real passando por interfaces, NAT, firewall, load balancer, endpoint e túnel;</li>\n    <li><strong>Plano de observabilidade:</strong> flow logs, métricas, logs de DNS, LB, WAF, firewall, NAT, VPN, Kubernetes e SIEM;</li>\n    <li><strong>Plano financeiro:</strong> egress, NAT processing, firewall inspection, inter-region, logging, peering, transit e storage de logs.</li>\n  </ul>\n  <p>Um erro comum é olhar apenas o plano de intenção. O código pode dizer que a rota existe, mas a rota efetiva pode ser sobrescrita por uma rota mais específica, propagação BGP, UDR, route table errada ou associação incorreta de subnet. Outro erro é olhar só o flow log: flow log mostra metadados de tráfego, mas nem sempre explica por que a aplicação retornou erro HTTP ou por que o certificado TLS falhou.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura de troubleshooting cloud deve ser desenhada antes do incidente. Isso significa ter landing zone com logs centralizados, contas/subscriptions/projetos organizados, hub de conectividade, DNS privado governado, flow logs habilitados onde faz sentido, tags padronizadas, runbooks, painéis, alertas e permissões de leitura para investigação.</p>\n  <p>Uma arquitetura diagnosticável normalmente possui:</p>\n  <ul>\n    <li><strong>Hub de conectividade:</strong> VPN, link dedicado, transit, firewall/NVA, egress e DNS resolver;</li>\n    <li><strong>Spokes de workload:</strong> VPCs/VNets separadas por ambiente, criticidade, domínio ou aplicação;</li>\n    <li><strong>Serviços privados:</strong> endpoints privados com DNS privado correto;</li>\n    <li><strong>Ingress controlado:</strong> CDN/WAF/LB/TLS/health checks e backends privados;</li>\n    <li><strong>Observabilidade:</strong> flow logs, LB logs, WAF logs, DNS logs, auditoria, métricas e SIEM;</li>\n    <li><strong>Governança:</strong> policy as code, tags, naming, owners, change records e exceções temporárias;</li>\n    <li><strong>FinOps:</strong> alertas de custo por NAT, egress, inter-region, firewall, logs e transit.</li>\n  </ul>\n  <p>Sem essa arquitetura, troubleshooting vira arqueologia: procurar evidência depois que o incidente já aconteceu, descobrir que logs não estavam habilitados, que ninguém sabe quem é dono da VPC, que DNS privado foi criado manualmente e que o custo cresceu sem tag.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em cloud networking como um aeroporto internacional automatizado. O passageiro é o pacote. O bilhete é a rota. O passaporte é a identidade. A segurança do aeroporto é o firewall. O portão de embarque é o endpoint. A esteira de conexão é o transit gateway. O controle de imigração é a política. O painel de voos é o DNS. O registro das câmeras é o log.</p>\n  <p>Quando alguém não chega ao destino, não basta dizer “o aeroporto está com problema”. É preciso saber se a pessoa não entrou no aeroporto, se foi barrada na imigração, se embarcou para o portão errado, se a conexão mudou, se o painel mostrava destino antigo, se o voo saiu por outro terminal ou se a mala chegou mas o passageiro não.</p>\n  <div class=\"callout callout--analogy\"><strong>Analogia operacional:</strong> troubleshooting cloud é investigar a jornada completa do passageiro, não apenas olhar se o aeroporto está aberto. Em rede, isso significa origem, destino, DNS, rota, política, NAT, serviço, retorno e logs.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine uma VM em uma subnet privada tentando acessar um repositório externo na internet para baixar pacotes. O comando falha com timeout. Um diagnóstico apressado diria: “a internet está fora”. Um diagnóstico profissional segue a cadeia:</p>\n  <ol>\n    <li>A VM possui IP e rota default?</li>\n    <li>A subnet está associada à route table correta?</li>\n    <li>A rota default aponta para NAT Gateway, firewall ou outro next hop válido?</li>\n    <li>O Security Group/NSG permite saída para o destino ou proxy?</li>\n    <li>A NACL ou firewall stateless permite ida e retorno?</li>\n    <li>O DNS resolve o nome do repositório?</li>\n    <li>O NAT está ativo, na AZ correta e com métricas saudáveis?</li>\n    <li>Flow logs mostram ACCEPT, REJECT ou ausência de tráfego?</li>\n    <li>Há proxy corporativo obrigatório?</li>\n  </ol>\n  <p>A correção pode ser adicionar rota ao NAT, ajustar egress, configurar proxy, corrigir DNS ou liberar destino específico. Abrir toda a saída para 0.0.0.0/0 sem evidência talvez funcione, mas cria risco e não ensina a causa.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, uma aplicação de faturamento em cloud precisa acessar banco de dados no datacenter por VPN site-to-site. Após uma mudança de firewall, a aplicação começa a falhar apenas em horários de fechamento fiscal. A VPN aparece como conectada.</p>\n  <p>O diagnóstico profissional separa:</p>\n  <ul>\n    <li><strong>Aplicação:</strong> erro, horário, endpoint, porta, timeout, retry e volume;</li>\n    <li><strong>Cloud:</strong> subnet, route table, Security Group, flow logs, NAT, transit, VPN e BGP;</li>\n    <li><strong>Datacenter:</strong> firewall, rota de retorno, ACL, NAT, banco, logs e capacidade;</li>\n    <li><strong>DNS:</strong> nome do banco resolve para IP privado correto?</li>\n    <li><strong>Segurança:</strong> houve alteração de política, inspeção, IPS, DLP ou regra por horário?</li>\n    <li><strong>Custo/performance:</strong> aumento de throughput, limite de túnel, perda, MTU ou saturação?</li>\n  </ul>\n  <p>A solução pode envolver ajustar rota propagada, corrigir retorno no datacenter, aumentar capacidade, definir MSS clamping, alterar regra específica ou mover integração para link dedicado. O importante é não tratar “VPN up” como prova de caminho funcional.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Um cenário cloud comum: uma aplicação em Kubernetes precisa acessar um serviço gerenciado privado, como banco, fila ou storage. A equipe criou Private Endpoint, mas os pods continuam tentando acessar o endpoint público. O tráfego passa pelo NAT, gera custo e falha em uma política de segurança.</p>\n  <p>O diagnóstico percorre:</p>\n  <ul>\n    <li>O Private Endpoint existe na VPC/VNet correta?</li>\n    <li>A subnet do endpoint permite tráfego da origem?</li>\n    <li>A zona DNS privada está criada e associada à rede do cluster?</li>\n    <li>O nome do serviço resolve para IP privado dentro dos pods?</li>\n    <li>CoreDNS ou NodeLocal DNSCache está usando o resolvedor correto?</li>\n    <li>NetworkPolicy permite saída do namespace?</li>\n    <li>Security Group/NSG do endpoint permite a origem?</li>\n    <li>Flow logs mostram tráfego para IP privado ou para internet/NAT?</li>\n    <li>Logs de auditoria mostram alteração recente de DNS ou endpoint?</li>\n  </ul>\n  <p>Esse exemplo mostra por que cloud troubleshooting precisa conectar rede, DNS, Kubernetes, IAM e observabilidade.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, troubleshooting cloud deve retroalimentar a plataforma. Cada falha recorrente deve virar validação automatizada, teste de pipeline ou guardrail. Se uma aplicação foi publicada sem flow logs, isso deveria ser detectado antes do deploy. Se uma subnet privada saiu sem rota de egress controlado, o pipeline deveria falhar. Se um Private Endpoint foi criado sem DNS privado, a revisão deveria apontar a lacuna.</p>\n  <p>Exemplos de controles DevSecOps:</p>\n  <ul>\n    <li>teste de reachability entre origem e destino crítico após deploy;</li>\n    <li>policy as code proibindo 0.0.0.0/0 em portas administrativas;</li>\n    <li>validação de route tables para subnets privadas;</li>\n    <li>checagem de associação de zonas DNS privadas;</li>\n    <li>alerta de drift em Security Groups, NSGs, NACLs e UDRs;</li>\n    <li>teste sintético de DNS, TCP, TLS e HTTP para serviços críticos;</li>\n    <li>orçamento e alerta para NAT, egress, inter-region e logs;</li>\n    <li>runbook versionado junto ao módulo IaC.</li>\n  </ul>\n  <p>O objetivo não é apenas resolver incidentes; é impedir que o mesmo tipo de incidente volte a acontecer.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Em Segurança da Informação, cloud networking troubleshooting precisa diferenciar falha operacional de sinal de ataque ou má configuração perigosa. Um pico de egress pode ser backup legítimo, replicação inter-regional, bug de aplicação ou exfiltração. Uma rota inesperada pode ser erro de IaC ou tentativa de bypass de inspeção. Um endpoint público recém-criado pode ser urgência operacional ou exposição indevida.</p>\n  <p>Durante investigação, o time deve preservar evidências:</p>\n  <ul>\n    <li>flow logs e logs de firewall antes/depois;</li>\n    <li>CloudTrail/Azure Activity Log/Cloud Audit Logs;</li>\n    <li>mudanças em IaC, pull requests, pipelines e approvers;</li>\n    <li>alterações em DNS, private endpoints e route tables;</li>\n    <li>eventos de IAM e policy changes;</li>\n    <li>métricas de NAT, LB, WAF, VPN, transit e inter-region.</li>\n  </ul>\n  <div class=\"callout callout--security\"><strong>Boa prática:</strong> toda mitigação emergencial deve ter escopo mínimo, dono, prazo de expiração, evidência de aprovação e plano de rollback. Em cloud, exceções temporárias esquecidas viram superfície de ataque permanente.</div>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra o raciocínio de troubleshooting cloud: partir do sintoma, mapear o fluxo, validar DNS, rota, política, serviço, retorno, logs e custo.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Fluxo de troubleshooting cloud networking\">\n    <svg viewBox=\"0 0 1200 620\" class=\"svg-network-diagram\" role=\"img\" aria-labelledby=\"svg-15-10-content-diagram-1-title svg-15-10-content-diagram-1-desc\">\n      <title id=\"svg-15-10-content-diagram-1-title\">Troubleshooting Cloud Networking</title>\n      <desc id=\"svg-15-10-content-diagram-1-desc\">Diagrama pedagógico da aula 15.10, Troubleshooting Cloud Networking, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-cloud-1510\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n        </marker>\n      </defs>\n      <rect x=\"35\" y=\"40\" width=\"1130\" height=\"540\" rx=\"22\" class=\"svg-zone\"></rect>\n      <text x=\"600\" y=\"82\" text-anchor=\"middle\" class=\"svg-title\">Troubleshooting Cloud Networking — fluxo efetivo</text>\n\n      <rect x=\"80\" y=\"135\" width=\"150\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"155\" y=\"164\" text-anchor=\"middle\" class=\"svg-label\">Sintoma</text>\n      <text x=\"155\" y=\"186\" text-anchor=\"middle\" class=\"svg-small\">timeout / 502</text>\n      <text x=\"155\" y=\"205\" text-anchor=\"middle\" class=\"svg-small\">DNS / custo</text>\n\n      <rect x=\"285\" y=\"135\" width=\"155\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"362\" y=\"164\" text-anchor=\"middle\" class=\"svg-label\">Fluxo</text>\n      <text x=\"362\" y=\"186\" text-anchor=\"middle\" class=\"svg-small\">origem destino</text>\n      <text x=\"362\" y=\"205\" text-anchor=\"middle\" class=\"svg-small\">porta protocolo</text>\n\n      <rect x=\"495\" y=\"120\" width=\"170\" height=\"125\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"580\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n      <text x=\"580\" y=\"173\" text-anchor=\"middle\" class=\"svg-small\">público/privado</text>\n      <text x=\"580\" y=\"193\" text-anchor=\"middle\" class=\"svg-small\">split-horizon</text>\n      <text x=\"580\" y=\"213\" text-anchor=\"middle\" class=\"svg-small\">endpoint privado</text>\n\n      <rect x=\"720\" y=\"120\" width=\"170\" height=\"125\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"805\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Rota efetiva</text>\n      <text x=\"805\" y=\"173\" text-anchor=\"middle\" class=\"svg-small\">subnet route</text>\n      <text x=\"805\" y=\"193\" text-anchor=\"middle\" class=\"svg-small\">NAT / transit</text>\n      <text x=\"805\" y=\"213\" text-anchor=\"middle\" class=\"svg-small\">VPN / BGP</text>\n\n      <rect x=\"950\" y=\"120\" width=\"170\" height=\"125\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"1035\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n      <text x=\"1035\" y=\"173\" text-anchor=\"middle\" class=\"svg-small\">SG / NSG / NACL</text>\n      <text x=\"1035\" y=\"193\" text-anchor=\"middle\" class=\"svg-small\">firewall / WAF</text>\n      <text x=\"1035\" y=\"213\" text-anchor=\"middle\" class=\"svg-small\">IAM / policy</text>\n\n      <rect x=\"160\" y=\"330\" width=\"185\" height=\"115\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"252\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n      <text x=\"252\" y=\"386\" text-anchor=\"middle\" class=\"svg-small\">LB / backend</text>\n      <text x=\"252\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">K8s / endpoint</text>\n      <text x=\"252\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">health check</text>\n\n      <rect x=\"415\" y=\"330\" width=\"185\" height=\"115\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"508\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Retorno</text>\n      <text x=\"508\" y=\"386\" text-anchor=\"middle\" class=\"svg-small\">rota reversa</text>\n      <text x=\"508\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">stateful</text>\n      <text x=\"508\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">assimetria</text>\n\n      <rect x=\"670\" y=\"330\" width=\"190\" height=\"115\" rx=\"14\" class=\"svg-node svg-node--logs\"></rect>\n      <text x=\"765\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n      <text x=\"765\" y=\"386\" text-anchor=\"middle\" class=\"svg-small\">flow / DNS / audit</text>\n      <text x=\"765\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">LB / WAF / VPN</text>\n      <text x=\"765\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">métricas / SIEM</text>\n\n      <rect x=\"925\" y=\"330\" width=\"185\" height=\"115\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"1018\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Correção</text>\n      <text x=\"1018\" y=\"386\" text-anchor=\"middle\" class=\"svg-small\">menor mudança</text>\n      <text x=\"1018\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">rollback</text>\n      <text x=\"1018\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">prevenção</text>\n\n      <line x1=\"230\" y1=\"182\" x2=\"285\" y2=\"182\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></line>\n      <line x1=\"440\" y1=\"182\" x2=\"495\" y2=\"182\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></line>\n      <line x1=\"665\" y1=\"182\" x2=\"720\" y2=\"182\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></line>\n      <line x1=\"890\" y1=\"182\" x2=\"950\" y2=\"182\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></line>\n      <path d=\"M1035 245 C1010 300 285 285 252 330\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></path>\n      <line x1=\"345\" y1=\"388\" x2=\"415\" y2=\"388\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></line>\n      <line x1=\"600\" y1=\"388\" x2=\"670\" y2=\"388\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></line>\n      <line x1=\"860\" y1=\"388\" x2=\"925\" y2=\"388\" class=\"svg-link\" marker-end=\"url(#arrow-cloud-1510)\"></line>\n      <path d=\"M508 330 C545 285 800 285 805 245\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-cloud-1510)\"></path>\n      <path d=\"M765 330 C735 285 590 285 580 245\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-cloud-1510)\"></path>\n\n      <text x=\"600\" y=\"520\" text-anchor=\"middle\" class=\"svg-note\">Não diagnostique por palpite: prove DNS, rota, política, serviço, retorno, evidência, custo e mudança mínima.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um dossiê de troubleshooting cloud networking. Você não precisa provisionar recursos pagos. O objetivo é construir o método que será usado em qualquer provedor: AWS, Azure, Google Cloud ou ambiente híbrido.</p>\n  <p>Você vai receber um cenário com aplicação web, VPC/VNet, subnets, NAT, Private Endpoint, Kubernetes, VPN, BGP, DNS privado, flow logs e custo anômalo. A entrega é uma investigação estruturada, não uma lista solta de comandos.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público. <strong>Causa provável a ser comprovada ou descartada:</strong> DNS privado não associado, rota efetiva incorreta, peering sem opção adequada, NSG/SG bloqueando ou endpoint em subnet errada.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam análise de causa provável. Em cada caso, escreva: fluxo esperado, evidência necessária, ferramenta/log, hipótese principal, mudança mínima e risco de segurança.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio coloca você em uma landing zone híbrida com múltiplos sintomas: aplicação com 502, pods sem egress, Private Endpoint ignorado, VPN/BGP up sem tráfego e custo de NAT elevado. A resposta correta exige separar problemas simultâneos.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada demonstra como montar uma matriz de diagnóstico cloud sem pular etapas. O objetivo é mostrar que o mesmo sintoma pode ser causado por DNS, rota, política, health check, retorno, endpoint privado, CNI ou custo.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Troubleshooting Cloud Networking é investigação de fluxo efetivo. Você aprendeu a separar sintoma, origem, destino, DNS, rota, política, serviço, retorno, logs, auditoria, custo e mudança recente.</p>\n  <p>A principal lição é que cloud não elimina fundamentos de rede. Ela adiciona abstrações, automação, serviços gerenciados e governança. Quem domina IPv4, DNS, TCP/UDP, firewall, VPN, HTTP/TLS e observabilidade consegue diagnosticar cloud com muito mais segurança.</p>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: DNS privado não associado, rota efetiva incorreta, peering sem opção adequada, NSG/SG bloqueando ou endpoint em subnet errada..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>15.11 — Wireshark, tcpdump e análise de pacotes</strong>, você vai aprofundar a leitura do plano de dados real, usando captura de pacotes para confirmar hipóteses levantadas em DNS, TCP, TLS, VPN, firewall e cloud.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Enlace",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPv4",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "HTTPS",
      "TLS",
      "BGP",
      "IPsec",
      "SNAT",
      "DNAT"
    ],
    "relatedConcepts": [
      "VPC",
      "VNet",
      "Subnet",
      "Route Table",
      "UDR",
      "Security Group",
      "NSG",
      "NACL",
      "Cloud Firewall",
      "NAT Gateway",
      "Private Link",
      "Private Endpoint",
      "Load Balancer",
      "Kubernetes CNI",
      "Flow Logs",
      "Reachability",
      "Audit Logs",
      "Egress",
      "FinOps"
    ],
    "ports": [
      "53/UDP/TCP",
      "80/TCP",
      "443/TCP",
      "500/UDP",
      "4500/UDP",
      "10250/TCP",
      "30000-32767/TCP/UDP"
    ],
    "tools": [
      "Reachability Analyzer",
      "Network Watcher",
      "IP flow verify",
      "Connectivity Tests",
      "VPC Flow Logs",
      "NSG/VNet Flow Logs",
      "Cloud Audit Logs",
      "CloudTrail",
      "Activity Log",
      "tcpdump",
      "curl",
      "dig",
      "traceroute",
      "mtr",
      "kubectl",
      "SIEM"
    ]
  },
  "lab": {
    "id": "lab-15.10",
    "title": "Caso guiado: Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Aplicação em cloud deveria acessar serviço privado, mas flow logs mostram egress público e o custo de NAT Gateway subiu. Impacto: Risco de exposição indevida, custo inesperado e falha de compliance por caminho não privado. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Workload → DNS privado → rota efetiva → NSG/SG → Private Endpoint/PrivateLink → serviço gerenciado → logs",
    "architecture": "Arquitetura investigada: Workload → DNS privado → rota efetiva → NSG/SG → Private Endpoint/PrivateLink → serviço gerenciado → logs. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
    "estimatedTimeMinutes": "240-320 min",
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
        "title": "Definir fluxo cloud esperado",
        "instruction": "Desenhe origem, subnet, DNS, rota, política e serviço.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Mapa cloud privado esperado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Validar DNS dentro da origem",
        "instruction": "Consulte o nome a partir do workload/subnet afetado.",
        "command": "Consultar effective routes, effective security rules, flow logs, private DNS zone/hosted zone associations e audit logs",
        "expectedOutput": "IP privado ou público comprovado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Consultar rotas efetivas",
        "instruction": "Use painel/CLI para ver next-hop efetivo da interface/subnet.",
        "command": "dig <servico.privado>; ip route; curl -v https://<servico>; traceroute <ip-resolvido>",
        "expectedOutput": "Next-hop real.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Consultar políticas efetivas",
        "instruction": "Valide NSG/SG/firewall e logs allow/deny.",
        "command": "Comparar Terraform plan/state, tags, route tables, DNS associations e policy-as-code",
        "expectedOutput": "Política efetiva documentada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Correlacionar flow logs e custo",
        "instruction": "Veja se o tráfego sai por NAT/egress público.",
        "command": "Comparar Terraform plan/state, tags, route tables, DNS associations e policy-as-code",
        "expectedOutput": "Evidência técnica e financeira.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Comparar IaC e estado real",
        "instruction": "Procure drift entre código, state e cloud.",
        "command": "Comparar Terraform plan/state, tags, route tables, DNS associations e policy-as-code",
        "expectedOutput": "Drift ou lacuna declarada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Corrigir DNS/rota/policy",
        "instruction": "Aplique mudança mínima via IaC e com limpeza de recursos.",
        "command": "Comparar Terraform plan/state, tags, route tables, DNS associations e policy-as-code",
        "expectedOutput": "Caminho privado validado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Registrar prevenção",
        "instruction": "Adicionar teste automatizado de DNS/rota/egress e alerta de custo.",
        "command": "Comparar Terraform plan/state, tags, route tables, DNS associations e policy-as-code",
        "expectedOutput": "Controle preventivo.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Nome resolve privado",
        "command": "dig/nslookup na subnet",
        "expected": "IP privado do endpoint.",
        "ifFails": "Associar zona privada/forwarder."
      },
      {
        "check": "Rota não usa NAT público",
        "command": "effective routes/flow logs",
        "expected": "Next-hop privado ou serviço privado.",
        "ifFails": "Corrigir route table/peering."
      },
      {
        "check": "Custo/egress reduzido",
        "command": "painel de billing/metrics",
        "expected": "Sem aumento inesperado por NAT/egress.",
        "ifFails": "Auditar fluxos restantes."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Funciona, mas custa caro",
        "probableCause": "Tráfego sai por NAT público",
        "howToConfirm": "Flow logs + billing",
        "fix": "Corrigir DNS/rota para endpoint privado."
      },
      {
        "symptom": "IaC parece correto",
        "probableCause": "Estado efetivo divergiu",
        "howToConfirm": "Comparar state, plan e cloud",
        "fix": "Reconciliar drift por pipeline."
      },
      {
        "symptom": "Private Endpoint existe, mas não é usado",
        "probableCause": "DNS ainda aponta público",
        "howToConfirm": "Teste de resolução na origem",
        "fix": "Associar zona privada à rede certa."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "diagrama cloud",
      "DNS por origem",
      "effective routes",
      "effective security rules",
      "flow logs",
      "audit logs",
      "billing NAT/egress",
      "Terraform plan/state"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Crie um checklist de validação pós-Private Endpoint que prove segurança, conectividade e custo esperado.",
    "solution": "A solução não termina quando o recurso existe. Ela prova que o workload resolve IP privado, usa rota privada, passa por política aprovada, gera logs coerentes e não aumenta egress/NAT inesperado.",
    "expectedOutcome": "Dossiê completo de troubleshooting cloud com mapa de fluxo, matriz de hipóteses, evidências, causa raiz, mitigação segura, rollback, impacto financeiro e prevenção."
  },
  "exercises": [
    {
      "id": "ex15.10.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.10.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.10.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.10.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.10.p1.2",
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
      "id": "q15.10.p1.3",
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
      "id": "q15.10.p1.4",
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
      "question": "Qual é a melhor definição de fluxo efetivo em cloud networking?",
      "options": [
        "O diagrama original da arquitetura",
        "A combinação real de DNS, rota, política, serviço, retorno e logs aplicada a origem/destino/protocolo/porta",
        "A última versão do Terraform",
        "A lista de portas padrão do provedor"
      ],
      "answer": 1,
      "explanation": "Fluxo efetivo é o comportamento real resultante de configuração, políticas e estado operacional."
    },
    {
      "question": "Se um Private Endpoint existe, mas o tráfego ainda sai pelo NAT, a primeira suspeita deve ser:",
      "options": [
        "Cabo físico rompido",
        "DNS privado ou associação de zona incorreta",
        "Senha do usuário",
        "STP bloqueado"
      ],
      "answer": 1,
      "explanation": "Private Endpoint depende fortemente de resolução DNS privada correta a partir da origem."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.10.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.10.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.10.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.10.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.10.p1.5",
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
      "question": "Qual parte do caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público",
    "scenario": "Aplicação em cloud deveria acessar serviço privado, mas flow logs mostram egress público e o custo de NAT Gateway subiu.",
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
    "reasoning": "A solução não termina quando o recurso existe. Ela prova que o workload resolve IP privado, usa rota privada, passa por política aprovada, gera logs coerentes e não aumenta egress/NAT inesperado.",
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
    "finalAnswer": "A resposta correta para “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Flow Logs",
      "shortDefinition": "Logs de metadados de tráfego IP.",
      "longDefinition": "Registros que capturam informações como origem, destino, porta, protocolo, ação e volume de tráfego em interfaces, subnets ou redes virtuais.",
      "example": "Flow logs mostram REJECT para tráfego da subnet app ao banco na porta 5432.",
      "relatedTerms": [
        "Observabilidade",
        "SIEM",
        "Firewall"
      ],
      "relatedLessons": [
        "14.12",
        "15.10"
      ]
    },
    {
      "term": "Reachability Analyzer",
      "shortDefinition": "Ferramenta de análise de alcançabilidade.",
      "longDefinition": "Categoria de ferramenta que analisa a configuração de rede para indicar se uma origem pode alcançar um destino e quais componentes participam do caminho.",
      "example": "Uma análise aponta que a NACL da subnet bloqueia o retorno efêmero.",
      "relatedTerms": [
        "Rota efetiva",
        "Policy",
        "Flow Logs"
      ],
      "relatedLessons": [
        "15.10"
      ]
    },
    {
      "term": "Rota efetiva",
      "shortDefinition": "Rota realmente aplicada ao tráfego.",
      "longDefinition": "Resultado da combinação de route table, associação de subnet, rotas propagadas, rotas mais específicas, UDRs e next hops.",
      "example": "A rota default da subnet privada aponta para firewall central, não para NAT Gateway.",
      "relatedTerms": [
        "Route Table",
        "UDR",
        "BGP"
      ],
      "relatedLessons": [
        "14.4",
        "15.10"
      ]
    },
    {
      "term": "Private Endpoint",
      "shortDefinition": "Interface privada para acessar serviço gerenciado.",
      "longDefinition": "Recurso que permite consumir serviços gerenciados por IP privado, normalmente exigindo integração correta com DNS privado e políticas.",
      "example": "Banco gerenciado é acessado por IP privado pela aplicação, sem passar pela internet.",
      "relatedTerms": [
        "Private Link",
        "DNS privado",
        "Service Endpoint"
      ],
      "relatedLessons": [
        "14.10",
        "15.10"
      ]
    },
    {
      "term": "Egress",
      "shortDefinition": "Tráfego de saída de uma rede ou workload.",
      "longDefinition": "Fluxo que sai de uma VPC/VNet/subnet/workload para internet, outra região, outro ambiente ou serviço externo, frequentemente sujeito a custo e inspeção.",
      "example": "Pods acessando registry público geram tráfego de egress pelo NAT.",
      "relatedTerms": [
        "NAT Gateway",
        "Proxy",
        "FinOps"
      ],
      "relatedLessons": [
        "14.4",
        "14.12",
        "15.10"
      ]
    },
    {
      "term": "Drift de rede",
      "shortDefinition": "Diferença entre intenção declarada e estado real.",
      "longDefinition": "Ocorre quando a configuração real da rede cloud diverge do IaC, padrão de plataforma ou desenho aprovado.",
      "example": "Uma regra de Security Group foi aberta manualmente fora do Terraform.",
      "relatedTerms": [
        "IaC",
        "Policy as Code",
        "Governança"
      ],
      "relatedLessons": [
        "14.13",
        "15.10"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.10"
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
        "15.10"
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
      "type": "official-doc",
      "title": "AWS VPC Reachability Analyzer",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html",
      "note": "Ferramenta de análise de configuração para testes de conectividade entre origem e destino em VPC."
    },
    {
      "type": "official-doc",
      "title": "AWS VPC Flow Logs",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html",
      "note": "Documentação sobre captura de informações de tráfego IP em interfaces de rede em VPC."
    },
    {
      "type": "official-doc",
      "title": "Azure Network Watcher — IP flow verify",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/network-watcher/ip-flow-verify-overview",
      "note": "Ferramenta para verificar se um pacote é permitido ou negado por regras de segurança/admin no Azure."
    },
    {
      "type": "official-doc",
      "title": "Google Cloud Network Intelligence Center — Connectivity Tests",
      "organization": "Google Cloud",
      "url": "https://docs.cloud.google.com/network-intelligence-center/docs/connectivity-tests/concepts/overview",
      "note": "Ferramenta para verificar conectividade entre endpoints e analisar configuração."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 14.12 — Observabilidade e troubleshooting",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m14/lesson-14-12",
      "note": "Base sobre flow logs, métricas e auditoria."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 15.7 — Troubleshooting firewall, ACL, NAT e políticas",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15/lesson-15-07",
      "note": "Base para política efetiva, NAT e logs de allow/deny."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting Cloud Networking\".",
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
        "description": "No caso “Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting Cloud Networking",
              "description": "Em Troubleshooting Cloud Networking, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.10."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Aplicação em cloud deveria acessar serviço privado, mas flow logs mostram egress público e o custo de NAT Gateway subiu.",
      "Impacto: Risco de exposição indevida, custo inesperado e falha de compliance por caminho não privado.",
      "Causa provável a validar: DNS privado não associado, rota efetiva incorreta, peering sem opção adequada, NSG/SG bloqueando ou endpoint em subnet errada.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting Cloud Networking.",
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
      "Qual evidência comprova o entendimento da aula 15.10?"
    ],
    "commands": [
      {
        "platform": "Azure/AWS/GCP",
        "command": "Consultar effective routes, effective security rules, flow logs, private DNS zone/hosted zone associations e audit logs",
        "purpose": "Validar decisão real da cloud.",
        "expectedObservation": "DNS privado, next-hop privado e allow nas políticas.",
        "interpretation": "Cloud tem “estado efetivo”; ler só IaC pode esconder drift."
      },
      {
        "platform": "Linux workload",
        "command": "dig <servico.privado>; ip route; curl -v https://<servico>; traceroute <ip-resolvido>",
        "purpose": "Ver o que o workload realmente resolve e usa.",
        "expectedObservation": "IP privado, rota privada e conexão sem egress público.",
        "interpretation": "A origem do teste precisa estar dentro da subnet afetada."
      },
      {
        "platform": "DevSecOps/IaC",
        "command": "Comparar Terraform plan/state, tags, route tables, DNS associations e policy-as-code",
        "purpose": "Encontrar drift e falhas de governança.",
        "expectedObservation": "Estado declarado corresponde ao efetivo.",
        "interpretation": "Mudança manual em cloud pode quebrar o desenho aprovado."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “DNS privado ausente” está com prioridade Alta e a evidência necessária é “nslookup/dig de dentro da VNet”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Rota efetiva errada” está com prioridade Alta e a evidência necessária é “effective routes”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Policy NSG/SG” está com prioridade Alta e a evidência necessária é “flow logs”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Peering/propagação” está com prioridade Média e a evidência necessária é “peering flags/route tables”",
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
      "15.11"
    ]
  },
  "diagnosticCase": {
    "title": "Private Endpoint criado, mas workload em outra VNet continua saindo por NAT público",
    "symptom": "Aplicação em cloud deveria acessar serviço privado, mas flow logs mostram egress público e o custo de NAT Gateway subiu.",
    "businessImpact": "Risco de exposição indevida, custo inesperado e falha de compliance por caminho não privado.",
    "likelyRootCause": "DNS privado não associado, rota efetiva incorreta, peering sem opção adequada, NSG/SG bloqueando ou endpoint em subnet errada.",
    "timeline": [
      "16:00: Private Endpoint aprovado",
      "16:20: DNS privado criado só em uma VNet",
      "17:00: custo NAT aumenta",
      "17:30: alerta compliance"
    ],
    "expectedFlow": "Workload → DNS privado → rota efetiva → NSG/SG → Private Endpoint/PrivateLink → serviço gerenciado → logs",
    "hypothesisMatrix": [
      {
        "hypothesis": "DNS privado ausente",
        "why": "Nome resolve IP público",
        "evidence": "nslookup/dig de dentro da VNet",
        "priority": "Alta"
      },
      {
        "hypothesis": "Rota efetiva errada",
        "why": "Próximo salto NAT/Internet",
        "evidence": "effective routes",
        "priority": "Alta"
      },
      {
        "hypothesis": "Policy NSG/SG",
        "why": "Private IP resolve mas conecta timeout",
        "evidence": "flow logs",
        "priority": "Alta"
      },
      {
        "hypothesis": "Peering/propagação",
        "why": "Rede remota não usa DNS/rota esperada",
        "evidence": "peering flags/route tables",
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
