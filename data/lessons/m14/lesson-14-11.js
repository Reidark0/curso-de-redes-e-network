export const lesson1411 = {
  "id": "14.11",
  "moduleId": "m14",
  "order": 11,
  "title": "Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress",
  "subtitle": "Como pods, services, ingress, CNI, load balancers e redes cloud se encaixam em clusters Kubernetes gerenciados.",
  "duration": "150-210 min",
  "estimatedStudyTimeMinutes": 210,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 340,
  "tags": [
    "cloud networking",
    "kubernetes",
    "eks",
    "aks",
    "gke",
    "cni",
    "ingress",
    "service",
    "network policy",
    "load balancer",
    "devsecops",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.3",
      "reason": "Clusters Kubernetes consomem subnets, CIDRs e endereçamento planejado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.5",
      "reason": "Segurança de tráfego em Kubernetes depende de SG/NSG, firewalls e políticas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.6",
      "reason": "Ingress e Service LoadBalancer dependem de load balancers, health checks e TLS."
    },
    {
      "type": "course",
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes",
      "lesson": "Kubernetes básico",
      "reason": "Esta aula aprofunda a camada de rede do Kubernetes em cloud."
    }
  ],
  "objectives": [
    "Explicar como Kubernetes networking se conecta à rede cloud.",
    "Diferenciar Pod, Service, Ingress, CNI, NetworkPolicy e Load Balancer.",
    "Comparar implicações de rede em EKS, AKS e GKE sem decorar console de provedor.",
    "Identificar impactos de CNI em IPAM, escala, roteamento, segurança e custo.",
    "Projetar publicação segura com Ingress, TLS, WAF, policies, DNS e observabilidade.",
    "Criar um runbook de troubleshooting para falhas de aplicação Kubernetes na cloud."
  ],
  "learningOutcomes": [
    "Dado um desenho de cluster, o aluno identifica quais faixas de IP são usadas por nodes, pods e services.",
    "Dado um erro 502/503 em Ingress, o aluno segue uma sequência de diagnóstico por camadas.",
    "Dado um cluster sem isolamento, o aluno propõe NetworkPolicies, egress control e segmentação por namespace.",
    "Dado um cenário multi-cloud, o aluno compara EKS, AKS e GKE pelo impacto de CNI e integração de rede."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Até aqui, o módulo de Cloud Networking explicou VPC/VNet, CIDR, rotas, gateways, security groups, DNS, VPN híbrida, hub-spoke e endpoints privados. Agora entramos em um ponto onde muitos profissionais de infraestrutura, segurança e DevSecOps se perdem: <strong>Kubernetes networking na cloud</strong>.</p>\n  <p>Quando uma empresa usa EKS, AKS ou GKE, ela não está apenas “subindo containers”. Ela está encaixando um cluster Kubernetes dentro de uma rede cloud real, com subnets, IPs, rotas, load balancers, DNS, firewalls, políticas, IAM, logs e custos. Um pod que nasce dentro do cluster precisa receber IP, resolver nomes, falar com outros pods, expor serviços, acessar bancos privados, respeitar políticas de rede e gerar evidências para troubleshooting e segurança.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma aplicação funciona no cluster de desenvolvimento, mas falha em produção. O Service existe, o Ingress está criado, o Load Balancer tem IP público, mas os pods ficam <em>unhealthy</em>, o DNS interno resolve errado, a NetworkPolicy bloqueia tráfego, o NAT custa caro, e o time não sabe se o problema está no Kubernetes, na VPC/VNet, no CNI, no Ingress controller, no security group, no NSG ou no certificado TLS.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n\n  <p>Antes de Kubernetes, publicar aplicações geralmente envolvia servidores, máquinas virtuais, IPs fixos, balanceadores e regras de firewall relativamente estáticas. A virtualização trouxe mobilidade, mas ainda havia um número administrável de sistemas. Com containers, a unidade de execução ficou menor, mais efêmera e mais numerosa. Um único nó pode executar dezenas ou centenas de pods, e cada pod pode nascer, morrer e ser recriado rapidamente.</p>\n  <p>Kubernetes surgiu para orquestrar esse mundo dinâmico: agendar pods, manter estado desejado, expor aplicações por Services, rotear entrada por Ingress e permitir que workloads sejam atualizadas com menor indisponibilidade. Só que o Kubernetes original não queria acoplar a rede a um provedor específico. Por isso, o ecossistema adotou o conceito de <strong>CNI</strong>, permitindo que plugins diferentes implementassem a rede de pods conforme a plataforma.</p>\n  <p>Nas clouds gerenciadas, essa abstração encontra redes reais. O Amazon EKS usa fortemente o Amazon VPC CNI para integrar pods à VPC. O AKS oferece opções como Azure CNI, Azure CNI Overlay e outros modos conforme necessidade de IP, escala e integração. O GKE usa modelos como VPC-native com alias IPs. O aluno não precisa decorar nomes comerciais, mas precisa entender a pergunta central: <strong>como o IP do pod se relaciona com a rede cloud?</strong></p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>Kubernetes networking resolve problemas poderosos, mas cria novas camadas de abstração. Uma falha que antes era “porta fechada no firewall” agora pode estar em várias peças ao mesmo tempo.</p>\n  <ul>\n    <li><strong>Endereçamento:</strong> pods, services e nodes usam faixas diferentes? Essas faixas cabem na VPC/VNet? Há sobreposição com datacenter?</li>\n    <li><strong>Conectividade interna:</strong> pod A consegue falar com pod B? O Service seleciona os pods corretos? O kube-proxy/eBPF está programando o encaminhamento?</li>\n    <li><strong>Exposição externa:</strong> o Ingress cria ou usa um Load Balancer? O certificado TLS está correto? O health check alcança o caminho certo?</li>\n    <li><strong>Segurança:</strong> NetworkPolicy está ativa no CNI? SG/NSG permite tráfego node-to-node? O egress dos pods é controlado?</li>\n    <li><strong>Observabilidade:</strong> existem logs de Ingress, LB, DNS, CNI, API Server, flow logs e eventos do cluster?</li>\n    <li><strong>Custo:</strong> cada Service LoadBalancer cria um LB pago? O tráfego sai por NAT? Há cross-zone ou inter-regional desnecessário?</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> achar que “Kubernetes é uma rede separada”. Na cloud, o cluster é uma aplicação distribuída dentro da VPC/VNet. Ele herda limitações de CIDR, subnets, rotas, DNS, firewalls, quotas, NAT, load balancers e políticas da plataforma.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A evolução da rede de aplicações pode ser vista como uma sequência de abstrações.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Fase</th><th>Modelo</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Servidor físico</td><td>Um host, um IP, portas fixas</td><td>Simples de visualizar</td><td>Escala e manutenção difíceis</td></tr>\n      <tr><td>Máquina virtual</td><td>VMs em subnets virtuais</td><td>Elasticidade maior</td><td>Ainda centrado em servidores</td></tr>\n      <tr><td>Container isolado</td><td>Processo empacotado com rede própria</td><td>Portabilidade</td><td>Orquestração manual complexa</td></tr>\n      <tr><td>Kubernetes</td><td>Pods, Services, Ingress, DNS e policies</td><td>Automação e estado desejado</td><td>Mais camadas para operar e proteger</td></tr>\n      <tr><td>Kubernetes gerenciado</td><td>EKS, AKS, GKE integrados à cloud</td><td>Integração com LB, IAM, logs e rede cloud</td><td>Dependência de CNI, quotas, custos e regras do provedor</td></tr>\n    </tbody>\n  </table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Kubernetes networking</strong> é o conjunto de mecanismos que permite que pods, services, nodes e clientes externos se comuniquem. No Kubernetes, o pod é a menor unidade de rede: containers dentro do mesmo pod compartilham namespace de rede e se comunicam por localhost. Entre pods, a plataforma espera que cada pod possa alcançar outro pod por IP, sem NAT entre eles dentro do modelo do cluster.</p>\n  <p>Um <strong>Service</strong> cria um ponto estável para acessar pods que são efêmeros. Um <strong>Ingress</strong> cria regras HTTP/HTTPS de entrada, normalmente operadas por um controller que conversa com um load balancer, proxy ou gateway. Um <strong>CNI</strong> é o plugin responsável por configurar a rede dos pods. Uma <strong>NetworkPolicy</strong> define fluxos permitidos entre pods e entre pods e destinos externos, desde que o plugin de rede implemente esse controle.</p>\n  <p>Em cloud, esses conceitos se conectam à infraestrutura real: o Service do tipo LoadBalancer pode criar um balanceador do provedor; o Ingress pode provisionar um Application Load Balancer, Application Gateway ou Cloud Load Balancer; o CNI pode consumir IPs da VPC/VNet; e as políticas de segurança podem envolver tanto Kubernetes quanto SG/NSG/firewall.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>O funcionamento interno pode ser entendido em cinco caminhos.</p>\n  <ol>\n    <li><strong>Pod nasce:</strong> o kubelet pede ao runtime para criar o pod. O CNI atribui IP, configura interface, rota e conectividade conforme o plugin.</li>\n    <li><strong>Pod resolve nomes:</strong> o pod consulta DNS interno, normalmente CoreDNS, para resolver Services como <code>api.default.svc.cluster.local</code> ou nomes externos.</li>\n    <li><strong>Pod acessa Service:</strong> o tráfego para o IP virtual do Service é encaminhado para um endpoint real, por iptables, IPVS, eBPF ou mecanismo equivalente.</li>\n    <li><strong>Cliente externo acessa aplicação:</strong> DNS público aponta para LB/Ingress. O controller aplica regras de host/path, TLS e roteia para Services e pods.</li>\n    <li><strong>Policy filtra tráfego:</strong> NetworkPolicy, SG/NSG, firewall cloud e service mesh podem permitir, negar, inspecionar ou registrar fluxos.</li>\n  </ol>\n  <p>O detalhe importante é que Kubernetes separa <strong>intenção</strong> de <strong>implementação</strong>. Você declara Service, Ingress e NetworkPolicy. Quem materializa isso é uma combinação de control plane, controllers, CNI, cloud controller manager, load balancer do provedor e componentes de observabilidade.</p>\n\n\n<div class=\"callout callout--mentor\"><strong>Modelo mental revisado:</strong> Kubernetes não cria uma rede mágica. Ele combina IPs de Pod, IPs de Service, CNI, kube-proxy ou dataplane equivalente, DNS interno, Ingress/Gateway, load balancer do provedor, security groups/NSGs, rotas e NetworkPolicies. O erro profissional é investigar apenas o Ingress e esquecer CNI, DNS, endpoints, health checks e egress.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura Kubernetes em cloud possui camadas sobrepostas:</p>\n  <ul>\n    <li><strong>Rede cloud:</strong> VPC/VNet, subnets, route tables, NAT, endpoints privados, SG/NSG e firewalls.</li>\n    <li><strong>Cluster:</strong> control plane gerenciado, node pools, subnets de nodes/pods, add-ons e componentes de rede.</li>\n    <li><strong>CNI:</strong> plugin que atribui IP a pods, programa rotas e pode aplicar políticas.</li>\n    <li><strong>Service layer:</strong> ClusterIP, NodePort, LoadBalancer e headless services.</li>\n    <li><strong>Ingress/Gateway:</strong> entrada HTTP/HTTPS com host, path, TLS, WAF e integração com LB.</li>\n    <li><strong>Segurança:</strong> NetworkPolicy, RBAC, secrets, IAM workload identity, admission control, SG/NSG e logs.</li>\n    <li><strong>Observabilidade:</strong> eventos Kubernetes, métricas, logs de pods, logs de LB, DNS, flow logs e traces.</li>\n  </ul>\n  <p>Em uma empresa madura, o cluster não fica “solto”. Ele entra em uma landing zone, usa subnets planejadas, egress controlado, private endpoints para serviços gerenciados, DNS privado, logs enviados ao SIEM e políticas como código.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Imagine um grande hospital. A VPC/VNet é o terreno do hospital. As subnets são alas. Os nodes são prédios. Os pods são equipes móveis de atendimento. Os Services são ramais internos estáveis: mesmo que a equipe mude de sala, o ramal continua o mesmo. O Ingress é a recepção principal que direciona pacientes conforme especialidade, nome do médico ou tipo de atendimento. O CNI é a equipe de infraestrutura que entrega crachá, rota e acesso a cada equipe. As NetworkPolicies são controles de circulação: nem toda equipe pode entrar em toda ala.</p>\n  <p>Quando a cloud entra na história, o hospital também usa serviços externos: laboratório, farmácia, banco de sangue, ambulâncias e sistemas governamentais. Esses serviços precisam de conexão segura, DNS correto, auditoria e autorização. O erro é achar que basta colocar uma placa “hospital” na porta. Em ambientes reais, cada fluxo precisa ser conhecido.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Um desenvolvedor cria uma aplicação web com dois Deployments: <code>frontend</code> e <code>api</code>. A API expõe um Service interno <code>api-service</code>. O frontend chama <code>http://api-service.default.svc.cluster.local</code>. Para publicar o frontend, o time cria um Ingress com host <code>app.exemplo.com</code>, certificado TLS e rota para o Service do frontend.</p>\n  <p>Mesmo nesse cenário simples, existem várias redes: DNS externo aponta para o Load Balancer; o Load Balancer encaminha para o Ingress controller; o Ingress encaminha para o Service; o Service escolhe pods; os pods conversam com CoreDNS; e o CNI garante IP e rota. Se algo falhar, o diagnóstico precisa seguir o caminho inteiro.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Uma empresa financeira possui clusters separados por ambiente: desenvolvimento, homologação e produção. Produção usa subnets privadas, node pools dedicados, Ingress privado para sistemas internos, Ingress público apenas para APIs expostas, WAF, mTLS entre serviços críticos, NetworkPolicies default deny, egress por firewall e acesso a banco gerenciado por private endpoint.</p>\n  <p>O SOC recebe logs do Ingress, do Load Balancer, do firewall, do DNS e do audit log do Kubernetes. O time de plataforma fornece módulos Terraform/Helm padronizados para Services, Ingress, certificados, policies e observabilidade. O time de segurança revisa exceções de egress e publica guardrails para impedir Services LoadBalancer públicos sem aprovação.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo em cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>No EKS, o Amazon VPC CNI pode atribuir IPs da VPC aos pods, consumindo endereços das subnets e integrando pods à rede AWS. No AKS, a escolha entre opções de CNI afeta consumo de IP, roteamento, escala e integração com a VNet. No GKE, clusters VPC-native usam faixas secundárias/alias IPs para pods e services, permitindo planejamento mais previsível de endereços.</p>\n  <p>Para o aluno, o ponto central é este: <strong>a escolha do CNI é uma decisão de arquitetura de rede</strong>. Ela afeta CIDR, escalabilidade, troubleshooting, NetworkPolicy, integração com firewall, uso de IPs, custos e limites do provedor.</p>\n\n\n<table class=\"comparison-table\"><thead><tr><th>Camada</th><th>Pergunta de projeto</th><th>Risco comum</th><th>Evidência</th></tr></thead><tbody><tr><td>CNI/IPAM</td><td>Pods usam IP roteável da VPC/VNet ou overlay?</td><td>Esgotar IPs de subnet ou criar rota invisível para o time de rede.</td><td>Configuração CNI, subnets, IPs de node/pod e eventos.</td></tr><tr><td>Service</td><td>ClusterIP, NodePort, LoadBalancer ou headless?</td><td>Expor serviço demais ou criar LB por engano.</td><td>kubectl get svc/endpoints/endpointslices.</td></tr><tr><td>Ingress/Gateway</td><td>Quem termina TLS e aplica WAF?</td><td>503 por health check, backend errado ou certificado incorreto.</td><td>Eventos do controller, logs do LB e health checks.</td></tr><tr><td>Egress</td><td>Saída passa por NAT, firewall ou endpoint privado?</td><td>Custo alto e falta de rastreabilidade.</td><td>Flow logs, métricas NAT/firewall e DNS.</td></tr></tbody></table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo em devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, Kubernetes networking deve ser tratado como código e validado antes do deploy. Um pipeline maduro pode verificar se todo Ingress possui TLS, se Services LoadBalancer públicos exigem anotação de aprovação, se namespaces críticos possuem NetworkPolicy default deny, se egress amplo está bloqueado, se recursos têm labels de dono e criticidade, e se logs estão habilitados.</p>\n  <p>Exemplos de controles: policy as code para barrar Ingress sem TLS, validação de manifests com OPA/Kyverno, templates Helm padronizados, testes de conectividade em ambiente efêmero, scanners de configuração de cluster, revisão de RBAC e monitoramento de alterações em Services e Ingress.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo em segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Do ponto de vista de segurança, Kubernetes networking é um ponto crítico de movimento lateral. Se todos os pods podem falar com todos os pods, um comprometimento simples pode virar incidente grande. Por isso, ambientes sensíveis costumam usar segmentação por namespace, NetworkPolicy default deny, egress control, restrição de metadata service, workload identity, secrets bem gerenciados, WAF, logs e detecção de anomalias.</p>\n  <p>Más práticas incluem: expor dashboard/API sem proteção, criar Services LoadBalancer públicos sem necessidade, permitir egress irrestrito, não aplicar NetworkPolicy, deixar pods em namespaces compartilhados sem isolamento, usar certificados manuais expirando em produção e ignorar logs do Ingress. Mitigações envolvem menor privilégio, revisão de manifest, guardrails, observabilidade e playbooks de resposta.</p>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama svg\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama mostra como uma requisição atravessa DNS, Load Balancer, Ingress, Service, pods, CNI, rede cloud e serviços privados.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Kubernetes networking em cloud com ingress, services, pods, CNI e rede cloud\">\n    <svg viewBox=\"0 0 980 520\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-14-11-content-diagram-1-title svg-14-11-content-diagram-1-desc\">\n      <title id=\"svg-14-11-content-diagram-1-title\">Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress</title>\n      <desc id=\"svg-14-11-content-diagram-1-desc\">Diagrama pedagógico da aula 14.11, Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1411\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\"></path>\n        </marker>\n      </defs>\n      <rect x=\"20\" y=\"20\" width=\"940\" height=\"480\" rx=\"18\" class=\"svg-bg\"></rect>\n      <text x=\"40\" y=\"55\" class=\"svg-title\">Kubernetes Networking na Cloud</text>\n      <rect x=\"50\" y=\"95\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"72\" y=\"125\" class=\"svg-label\">Usuário</text>\n      <text x=\"72\" y=\"147\" class=\"svg-small\">Internet/VPN</text>\n      <rect x=\"230\" y=\"80\" width=\"150\" height=\"95\" rx=\"12\" class=\"svg-node svg-node--edge\"></rect>\n      <text x=\"260\" y=\"112\" class=\"svg-label\">DNS + LB</text>\n      <text x=\"248\" y=\"136\" class=\"svg-small\">IP público/privado</text>\n      <text x=\"258\" y=\"156\" class=\"svg-small\">Health check</text>\n      <rect x=\"430\" y=\"65\" width=\"500\" height=\"360\" rx=\"16\" class=\"svg-zone\"></rect>\n      <text x=\"455\" y=\"95\" class=\"svg-label\">VPC/VNet com cluster EKS/AKS/GKE</text>\n      <rect x=\"460\" y=\"120\" width=\"150\" height=\"80\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n      <text x=\"492\" y=\"150\" class=\"svg-label\">Ingress</text>\n      <text x=\"480\" y=\"174\" class=\"svg-small\">Host/path/TLS</text>\n      <rect x=\"660\" y=\"120\" width=\"130\" height=\"80\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"695\" y=\"150\" class=\"svg-label\">Service</text>\n      <text x=\"681\" y=\"174\" class=\"svg-small\">ClusterIP</text>\n      <rect x=\"825\" y=\"110\" width=\"85\" height=\"55\" rx=\"10\" class=\"svg-node\"></rect>\n      <text x=\"844\" y=\"142\" class=\"svg-small\">Pod A</text>\n      <rect x=\"825\" y=\"180\" width=\"85\" height=\"55\" rx=\"10\" class=\"svg-node\"></rect>\n      <text x=\"844\" y=\"212\" class=\"svg-small\">Pod B</text>\n      <rect x=\"825\" y=\"250\" width=\"85\" height=\"55\" rx=\"10\" class=\"svg-node\"></rect>\n      <text x=\"844\" y=\"282\" class=\"svg-small\">Pod C</text>\n      <rect x=\"475\" y=\"250\" width=\"150\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--control\"></rect>\n      <text x=\"515\" y=\"280\" class=\"svg-label\">CNI</text>\n      <text x=\"493\" y=\"304\" class=\"svg-small\">IP, rota, policy</text>\n      <rect x=\"660\" y=\"250\" width=\"130\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--control\"></rect>\n      <text x=\"682\" y=\"280\" class=\"svg-label\">CoreDNS</text>\n      <text x=\"686\" y=\"304\" class=\"svg-small\">svc.cluster</text>\n      <rect x=\"470\" y=\"360\" width=\"170\" height=\"42\" rx=\"10\" class=\"svg-node svg-node--private\"></rect>\n      <text x=\"492\" y=\"386\" class=\"svg-small\">Private Endpoint / DB</text>\n      <rect x=\"680\" y=\"360\" width=\"170\" height=\"42\" rx=\"10\" class=\"svg-node svg-node--security\"></rect>\n      <text x=\"707\" y=\"386\" class=\"svg-small\">NetworkPolicy + SIEM</text>\n      <line x1=\"180\" y1=\"130\" x2=\"230\" y2=\"130\" class=\"svg-line\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"380\" y1=\"130\" x2=\"460\" y2=\"155\" class=\"svg-line\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"610\" y1=\"160\" x2=\"660\" y2=\"160\" class=\"svg-line\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"790\" y1=\"160\" x2=\"825\" y2=\"137\" class=\"svg-line\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"790\" y1=\"160\" x2=\"825\" y2=\"207\" class=\"svg-line\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"790\" y1=\"160\" x2=\"825\" y2=\"277\" class=\"svg-line\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"550\" y1=\"250\" x2=\"550\" y2=\"200\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"725\" y1=\"250\" x2=\"725\" y2=\"200\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"825\" y1=\"280\" x2=\"640\" y2=\"380\" class=\"svg-line\" marker-end=\"url(#arrow1411)\"></line>\n      <line x1=\"825\" y1=\"300\" x2=\"850\" y2=\"380\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1411)\"></line>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratório\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>Neste laboratório, você desenhará uma arquitetura Kubernetes em cloud sem provisionar recursos pagos. O objetivo é praticar raciocínio profissional: endereçamento, CNI, Services, Ingress, DNS, NetworkPolicy, egress e logs.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios reforçam a diferença entre Service, Ingress, CNI, NetworkPolicy e rede cloud subjacente. Responda sempre indicando em qual camada você investigaria primeiro.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio é desenhar uma publicação segura de aplicação em EKS/AKS/GKE com frontend público, APIs privadas, banco gerenciado via private endpoint, egress controlado e políticas de rede.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra que o desenho correto não é “criar um cluster”, mas integrar o cluster à landing zone, à rede cloud, ao DNS, à segurança e à observabilidade.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Kubernetes networking na cloud combina dois mundos: os objetos Kubernetes e a infraestrutura real do provedor. Pods, Services, Ingress e NetworkPolicies precisam funcionar sobre VPC/VNet, subnets, rotas, load balancers, DNS, NAT, endpoints privados, firewalls e logs.</p>\n  <p>O aprendizado essencial é: <strong>não diagnostique Kubernetes isoladamente</strong>. Siga o caminho do pacote: DNS externo, LB, Ingress, Service, endpoints, pods, CNI, DNS interno, rota, policy, SG/NSG, firewall, NAT, private endpoint e logs.</p>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, você estudará <strong>Observabilidade e troubleshooting: flow logs, métricas e auditoria</strong>. Depois de entender como clusters Kubernetes se conectam à rede cloud, o próximo passo é aprender a enxergar tráfego, rotas, logs, métricas, auditoria e evidências de falha em ambientes distribuídos.</p>\n\n</section>"
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
      "DNS",
      "TCP",
      "UDP",
      "TLS",
      "HTTP",
      "BGP em conectividade externa"
    ],
    "dependsOn": [
      "VPC/VNet",
      "subnets",
      "CNI",
      "DNS",
      "Load Balancer",
      "Ingress",
      "NetworkPolicy",
      "IAM"
    ],
    "enables": [
      "clusters Kubernetes seguros",
      "publicação controlada de aplicações",
      "microsegmentação",
      "observabilidade cloud-native"
    ]
  },
  "lab": {
    "id": "lab-14.11",
    "title": "Desenhar rede Kubernetes cloud segura e observável",
    "labType": "cloud-simulavel",
    "objective": "Projetar uma arquitetura Kubernetes em cloud com subnets, CNI, Services, Ingress, DNS, NetworkPolicy, egress control, endpoints privados e observabilidade.",
    "scenario": "15. Laboratório Neste laboratório, você desenhará uma arquitetura Kubernetes em cloud sem provisionar recursos pagos. O objetivo é praticar raciocínio profissional: endereçamento, CNI, Services, Ingress, DNS, NetworkPolicy, egress e logs.",
    "topology": "Um cluster gerenciado EKS/AKS/GKE em subnets privadas, com node pools, pods frontend/API, Ingress público, API interna, banco gerenciado via endpoint privado, DNS interno, egress por firewall/NAT e SIEM.",
    "architecture": "Usuários acessam DNS público, WAF/LB e Ingress. O Ingress roteia para Services. Services selecionam pods. Pods recebem IP pelo CNI, consultam CoreDNS, acessam serviços privados via endpoint privado e têm egress controlado por policies e firewall.",
    "prerequisites": [
      "Não criar recursos reais pagos.",
      "Definir CIDRs fictícios para VPC/VNet, nodes, pods e services.",
      "Incluir pelo menos um Ingress público e um Service interno.",
      "Incluir NetworkPolicy default deny com exceções.",
      "Incluir logs e troubleshooting."
    ],
    "tools": [
      "Terminal Linux",
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
        "title": "Definir faixas de IP",
        "instruction": "Crie uma tabela com CIDR da VPC/VNet, subnets de nodes, faixa de pods e faixa de services.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Endereçamento sem sobreposição e com espaço para crescimento.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Escolher o modelo de CNI",
        "instruction": "Descreva se o cluster usará IPs roteáveis na VPC/VNet, overlay ou modelo equivalente, justificando impacto em IPAM e escala.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Decisão de CNI documentada com vantagens e limitações.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Desenhar Services",
        "instruction": "Defina Services para frontend, API e banco/integração, separando ClusterIP, LoadBalancer e serviços internos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Cada Service possui dono, tipo, porta, selector e exposição esperada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Desenhar Ingress e TLS",
        "instruction": "Crie regra de host/path para frontend público, com TLS, WAF e health check coerente.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fluxo DNS público → LB/WAF → Ingress → Service → pods documentado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Aplicar segmentação por NetworkPolicy",
        "instruction": "Defina default deny e permita apenas frontend → API, Ingress → frontend, API → banco/endpoint privado e DNS necessário.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz de fluxos permitidos entre namespaces e workloads.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Planejar egress e serviços privados",
        "instruction": "Defina como pods acessam internet, APIs cloud, secrets e banco gerenciado sem egress amplo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Egress por firewall/proxy/NAT quando necessário e private endpoints para serviços sensíveis.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Definir observabilidade",
        "instruction": "Liste eventos Kubernetes, logs de Ingress, LB, DNS, CNI, flow logs e auditoria que serão enviados ao SIEM.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de logs e alertas por camada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Criar runbook de troubleshooting",
        "instruction": "Escreva uma sequência de diagnóstico para erro 503, timeout interno e falha de DNS no pod.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Runbook por camadas: DNS, LB, Ingress, Service, endpoints, pod, CNI, policy, SG/NSG e logs.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” em evidência prática ou raciocínio verificável."
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
        "title": "Validar Services, endpoints e exposição em Kubernetes",
        "instruction": "Em cluster local/autorizado ou usando manifest de exemplo, valide se Services, Endpoints/EndpointSlices e Ingress/Gateway estão coerentes com o desenho.",
        "command": "kubectl get svc,endpoints,endpointslices -A\nkubectl get ingress -A\nkubectl describe ingress -A\nkubectl get networkpolicy -A",
        "expectedOutput": "Services com tipo esperado, endpoints presentes para backends saudáveis, Ingress/Gateway com host/path/TLS definidos e NetworkPolicies mapeadas.",
        "explanation": "Muitos incidentes de Kubernetes cloud são falhas entre Service, endpoint, health check, Ingress e load balancer, não apenas “pod fora do ar”."
      },
      {
        "number": 12,
        "title": "Modelar custo de LoadBalancer, NAT e egress do cluster",
        "instruction": "Calcule quais componentes seriam cobrados se o desenho fosse aplicado em cloud: LB por service/ingress, NAT para saída, logs, tráfego inter-zona e IPs públicos.",
        "calculation": "Tabela componente-driver-cenário-risco: LoadBalancer/hora, NAT/hora+GB, logs/GB+retenção, egress/GB, IP público/hora quando aplicável.",
        "expectedOutput": "Matriz FinOps com pelo menos cinco drivers e recomendação para reduzir desperdício sem perder observabilidade.",
        "explanation": "Kubernetes pode criar recursos cloud indiretamente. Um Service LoadBalancer ou egress via NAT pode gerar custo mesmo em ambiente pequeno."
      }
    ],
    "expectedResult": "Uma arquitetura Kubernetes cloud segura, com endereçamento planejado, publicação controlada, policies, egress, endpoints privados, logs e runbook.",
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
        "check": "Nenhum Service LoadBalancer público foi criado sem justificativa",
        "command": "kubectl get svc -A -o wide",
        "expected": "Services públicos têm owner, justificativa, TLS/WAF quando aplicável e alternativa interna avaliada.",
        "ifFails": "Converter para ClusterIP/Internal LoadBalancer ou exigir aprovação e controles de borda."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se o Ingress retorna 503, verifique Service, endpoints, readiness probe e health check do LB.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se pods não se comunicam, verifique NetworkPolicy, DNS interno, CNI, rotas e SG/NSG de nodes.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o cluster não escala, verifique consumo de IP por subnet, quotas e capacidade do node pool.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se há custo inesperado, revise Services LoadBalancer, NAT, cross-zone, logs e tráfego de egress.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o banco privado não responde, verifique DNS privado, endpoint privado, policy, SG/NSG e IAM.",
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
        "symptom": "Ingress retorna 503 enquanto Pods estão Running",
        "probableCause": "Readiness probe falhando, Service selector errado, EndpointSlice vazio ou health check do LB incompatível.",
        "howToConfirm": "kubectl get endpoints/endpointslices, kubectl describe ingress/service e logs do controller.",
        "fix": "Corrigir selector, readiness, porta alvo, path de health check ou anotação do controller."
      }
    ],
    "improvements": [
      "Criar templates Helm seguros para Ingress e Services.",
      "Aplicar policy as code para bloquear LoadBalancer público não aprovado.",
      "Criar NetworkPolicy default deny por namespace.",
      "Integrar logs de Kubernetes e cloud ao SIEM.",
      "Automatizar testes de conectividade após deploy.",
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
      "Qual evidência mostra que o laboratório de “Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?",
      "Qual parte deste lab poderia gerar custo recorrente mesmo sem tráfego de usuário?",
      "Qual evidência prova que a conectividade funciona sem confundir rede com autorização IAM?",
      "Qual recurso precisa ser destruído primeiro para evitar dependências órfãs?",
      "Qual log permite investigar falha de rede e qual log permite investigar alteração administrativa?"
    ],
    "challenge": "Publicar uma aplicação Kubernetes cloud com segurança defensiva",
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
    "zeroCostAlternative": "Validar manifests localmente com kubectl client-side dry-run, diagramar CNI/IPAM e analisar exemplos de YAML sem provisionar cluster cloud.",
    "estimatedCostDrivers": [
      "recursos cobrados por hora, como NAT Gateway, VPN Gateway, firewall gerenciado, load balancer e endpoints privados",
      "processamento por GB em endpoints, NAT, firewall, load balancer e logs",
      "tráfego entre zonas, regiões, internet, peering, VPN e links dedicados",
      "armazenamento, retenção, consulta e ingestão de logs",
      "custo operacional humano de manter exceções, rotas, DNS, certificados e runbooks"
    ],
    "cloudValidationProfile": {
      "lesson": "14.11",
      "scope": "Kubernetes Networking: CNI/IPAM, Services, Ingress/Gateway, NetworkPolicy e egress",
      "simulationMode": "cluster local Kind/Minikube opcional ou análise de manifests com kubectl dry-run",
      "optionalRealCloudMode": "usar cluster gerenciado de laboratório já existente, sem criar load balancers públicos desnecessários",
      "requiredArtifacts": [
        "matriz Pod-Service-Ingress-LB",
        "plano IPAM",
        "política de egress",
        "evidência de endpoints/readiness",
        "estimativa de custo de LB/NAT/logs"
      ],
      "passCriteria": [
        "IPAM não sobrepõe redes",
        "Service/Ingress têm escopo controlado",
        "egress e NetworkPolicy são tratados",
        "observabilidade cobre DNS, eventos e flow logs"
      ]
    }
  },
  "exercises": [
    {
      "question": "Por que CNI é uma decisão de arquitetura e não apenas um detalhe de instalação?",
      "answer": "Porque afeta IPAM, roteamento, escala, NetworkPolicy, consumo de subnets, troubleshooting e integração com a rede cloud."
    },
    {
      "question": "Qual a diferença entre Service e Ingress?",
      "answer": "Service oferece endpoint estável para pods; Ingress define regras HTTP/HTTPS de entrada, geralmente usando um controller e load balancer."
    },
    {
      "question": "Um Ingress retorna 503. Quais pontos verificar primeiro?",
      "answer": "Regras do Ingress, Service, endpoints, readiness dos pods, health check do LB, logs do controller e NetworkPolicy."
    },
    {
      "question": "Por que NetworkPolicy default deny é importante?",
      "answer": "Porque impede comunicação lateral padrão entre workloads e força a declaração explícita dos fluxos necessários."
    },
    {
      "id": "ex14.11.p1.1",
      "type": "diagnóstico",
      "prompt": "Crie um runbook para investigar timeout de saída de um Pod para uma API externa.",
      "expectedAnswer": "Deve incluir DNS/CoreDNS, NetworkPolicy, rota, NAT/firewall/proxy, SG/NSG, endpoint privado, logs de fluxo e teste com pod de debug autorizado.",
      "explanation": "Egress em Kubernetes cloud atravessa várias camadas; investigar apenas o Pod raramente basta."
    }
  ],
  "quiz": [
    {
      "question": "Qual componente atribui/configura a rede dos pods conforme o plugin usado?",
      "options": [
        "Ingress",
        "CNI",
        "Secret",
        "ConfigMap"
      ],
      "correctAnswer": 1,
      "explanation": "O CNI configura interfaces, IPs e conectividade de pods conforme a implementação."
    },
    {
      "question": "Qual objeto Kubernetes fornece um endpoint estável para pods efêmeros?",
      "options": [
        "Service",
        "Namespace",
        "NodePool",
        "PersistentVolume"
      ],
      "correctAnswer": 0,
      "explanation": "Service abstrai pods e cria um ponto estável de acesso."
    },
    {
      "question": "Qual é o papel típico do Ingress?",
      "options": [
        "Atribuir IP a pods",
        "Gerenciar acesso HTTP/HTTPS externo por host/path",
        "Substituir DNS",
        "Criar imagens de container"
      ],
      "correctAnswer": 1,
      "explanation": "Ingress define regras de entrada HTTP/HTTPS e depende de um controller."
    },
    {
      "question": "Qual risco existe em criar muitos Services LoadBalancer sem governança?",
      "options": [
        "Redução automática de custo",
        "Exposição pública e custo de LBs",
        "Fim da necessidade de TLS",
        "Eliminação de logs"
      ],
      "correctAnswer": 1,
      "explanation": "Cada LB pode gerar exposição, custo e superfície de ataque."
    },
    {
      "question": "NetworkPolicy funciona sempre, independentemente do CNI?",
      "options": [
        "Sim, sempre",
        "Não, depende de suporte do plugin de rede",
        "Sim, se houver DNS",
        "Só em IPv6"
      ],
      "correctAnswer": 1,
      "explanation": "A API existe, mas a aplicação efetiva das regras depende do plugin/implementação."
    },
    {
      "question": "Em troubleshooting Kubernetes cloud, qual sequência é mais correta?",
      "options": [
        "Reinstalar cluster primeiro",
        "DNS/LB/Ingress/Service/endpoints/pods/CNI/policies/logs",
        "Trocar provedor sem investigar",
        "Ignorar rede cloud"
      ],
      "correctAnswer": 1,
      "explanation": "A falha deve ser isolada por camadas e evidências."
    },
    {
      "id": "q14.11.p1.1",
      "type": "diagnóstico",
      "q": "Um Ingress retorna 503, mas os Pods parecem Running. Qual conjunto de evidências é mais adequado?",
      "opts": [
        "Apenas reiniciar o Deployment",
        "Eventos do Ingress/controller, Endpoints/EndpointSlices, readiness probes, health checks do LB e logs do backend",
        "Apenas verificar o DNS público",
        "Apenas aumentar réplicas"
      ],
      "a": 1,
      "exp": "503 em Kubernetes cloud geralmente exige correlação entre Ingress, Service, endpoints, readiness, health check do provedor e backend.",
      "difficulty": "intermediário",
      "topic": "Kubernetes Networking"
    }
  ],
  "flashcards": [
    {
      "front": "CNI",
      "back": "Interface/plugin usado pelo Kubernetes para configurar rede dos pods."
    },
    {
      "front": "Service",
      "back": "Objeto que expõe um conjunto de pods por um endpoint estável."
    },
    {
      "front": "Ingress",
      "back": "Objeto de regras HTTP/HTTPS de entrada, aplicado por um controller."
    },
    {
      "front": "NetworkPolicy",
      "back": "Política que controla tráfego permitido entre pods e/ou destinos externos."
    },
    {
      "front": "CoreDNS",
      "back": "Componente comum de DNS interno para resolução de Services no cluster."
    },
    {
      "front": "Readiness probe",
      "back": "Sinal usado para indicar se um pod está pronto para receber tráfego."
    },
    {
      "id": "fc14.11.p1.1",
      "front": "Qual é o papel do CNI no Kubernetes?",
      "back": "Implementar o modelo de rede do cluster, conectando Pods, nodes e políticas conforme o plugin escolhido.",
      "tags": [
        "kubernetes",
        "cni",
        "cloud"
      ],
      "difficulty": "intermediário"
    }
  ],
  "mentorQuestions": [
    "Você sabe quais faixas de IP são usadas por nodes, pods e services no seu cluster?",
    "Se alguém criar um Service LoadBalancer público, quem aprova, quem é alertado e onde isso aparece?",
    "Sua segmentação Kubernetes impede movimento lateral real ou apenas organiza namespaces?"
  ],
  "challenge": {
    "title": "Publicar uma aplicação Kubernetes cloud com segurança defensiva",
    "scenario": "Uma empresa vai publicar uma aplicação em cluster gerenciado. O frontend será público; a API e o banco devem permanecer privados. O ambiente precisa de TLS, WAF, policies, logs e controle de egress.",
    "tasks": [
      "Definir CIDRs e subnets do cluster.",
      "Escolher modelo de CNI e justificar.",
      "Desenhar Services e Ingress.",
      "Definir DNS público e interno.",
      "Criar matriz de NetworkPolicy.",
      "Definir egress e private endpoints.",
      "Planejar logs, alertas e runbook."
    ],
    "successCriteria": [
      "Frontend é publicado com TLS e WAF.",
      "API não é exposta publicamente.",
      "Banco é acessado por caminho privado.",
      "NetworkPolicy bloqueia tráfego lateral indevido.",
      "Há logs suficientes para diagnosticar 503, timeout e DNS.",
      "Custos de LB, NAT, logs e tráfego foram considerados."
    ],
    "gradingRubric": [
      {
        "criterion": "IPAM e CNI",
        "points": 20,
        "description": "Dimensiona pods, services, nodes e subnets sem sobreposição nem exaustão previsível."
      },
      {
        "criterion": "Publicação segura",
        "points": 20,
        "description": "Define Ingress/Gateway, TLS, WAF, health checks e exposure mínima."
      },
      {
        "criterion": "Segmentação e NetworkPolicy",
        "points": 20,
        "description": "Controla tráfego leste-oeste e diferencia controles Kubernetes de controles cloud."
      },
      {
        "criterion": "Egress e private endpoints",
        "points": 20,
        "description": "Evita saída ampla sem rastreabilidade e justifica NAT/firewall/proxy/endpoints."
      },
      {
        "criterion": "Observabilidade e custo",
        "points": 20,
        "description": "Inclui logs, eventos, métricas, custos de LB/NAT/logs e runbook."
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
      "Plano CNI/IPAM",
      "Matriz Service/Ingress/Endpoint/NetworkPolicy",
      "Estimativa de custo de LB, NAT, egress e logs"
    ]
  },
  "commentedSolution": {
    "summary": "A solução madura usa cluster em subnets privadas, Ingress controlado por LB/WAF, Services internos, NetworkPolicies default deny, private endpoints para banco e serviços sensíveis, egress controlado, DNS consistente e observabilidade por camada.",
    "steps": [
      "Separar subnets e faixas de IP para nodes/pods/services conforme o provedor.",
      "Publicar apenas o frontend via Ingress com TLS e WAF.",
      "Manter API como Service interno acessível apenas pelo frontend.",
      "Permitir API → banco por endpoint privado e policy mínima.",
      "Controlar egress dos pods com firewall/proxy/NAT e exceções documentadas.",
      "Enviar logs de Kubernetes, Ingress, LB, DNS, flow logs e auditoria ao SIEM.",
      "Criar políticas de pipeline para impedir LoadBalancer público e Ingress sem TLS."
    ],
    "commonMistakes": [
      "Usar namespace como único controle de segurança.",
      "Criar Service LoadBalancer para cada aplicação sem necessidade.",
      "Ignorar consumo de IP da subnet pelo CNI.",
      "Não validar se NetworkPolicy é suportada/aplicada pelo CNI.",
      "Troubleshooting apenas com kubectl, ignorando LB, SG/NSG e flow logs."
    ]
  },
  "glossary": [
    {
      "term": "CNI",
      "shortDefinition": "Plugin de rede de containers.",
      "longDefinition": "Padrão usado para configurar interfaces, IPs e conectividade de pods em Kubernetes.",
      "example": "Amazon VPC CNI, Azure CNI e plugins baseados em eBPF.",
      "relatedTerms": [
        "pod",
        "IPAM"
      ],
      "relatedLessons": [
        "14.11"
      ]
    },
    {
      "term": "Pod",
      "shortDefinition": "Menor unidade executável do Kubernetes.",
      "longDefinition": "Conjunto de um ou mais containers que compartilham namespace de rede e armazenamento efêmero.",
      "example": "Frontend rodando em três réplicas de pod.",
      "relatedTerms": [
        "container",
        "service"
      ],
      "relatedLessons": [
        "14.11"
      ]
    },
    {
      "term": "Service",
      "shortDefinition": "Endpoint estável para pods.",
      "longDefinition": "Objeto Kubernetes que expõe aplicações executando em pods por nome, IP virtual e porta.",
      "example": "api-service apontando para pods com label app=api.",
      "relatedTerms": [
        "ClusterIP",
        "LoadBalancer"
      ],
      "relatedLessons": [
        "14.11"
      ]
    },
    {
      "term": "Ingress",
      "shortDefinition": "Regras HTTP/HTTPS de entrada.",
      "longDefinition": "Objeto que define acesso externo a services com host, path e TLS, implementado por um controller.",
      "example": "app.empresa.com roteando /api para api-service.",
      "relatedTerms": [
        "TLS",
        "Load Balancer"
      ],
      "relatedLessons": [
        "14.6",
        "14.11"
      ]
    },
    {
      "term": "NetworkPolicy",
      "shortDefinition": "Política de tráfego entre pods.",
      "longDefinition": "Objeto Kubernetes que define tráfego ingress/egress permitido para pods selecionados, quando suportado pelo plugin de rede.",
      "example": "Permitir frontend acessar API na porta 443.",
      "relatedTerms": [
        "segmentação",
        "default deny"
      ],
      "relatedLessons": [
        "13.2",
        "14.11"
      ]
    },
    {
      "term": "CoreDNS",
      "shortDefinition": "DNS interno comum no Kubernetes.",
      "longDefinition": "Componente usado para resolver nomes de services e pods dentro do cluster.",
      "example": "api.default.svc.cluster.local.",
      "relatedTerms": [
        "DNS",
        "Service Discovery"
      ],
      "relatedLessons": [
        "14.7"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Kubernetes Services, Load Balancing, and Networking",
      "organization": "Kubernetes",
      "url": "https://kubernetes.io/docs/concepts/services-networking/",
      "note": "Documenta Services, Ingress e NetworkPolicy como conceitos de rede Kubernetes."
    },
    {
      "type": "official-doc",
      "title": "Kubernetes Ingress",
      "organization": "Kubernetes",
      "url": "https://kubernetes.io/docs/concepts/services-networking/ingress/",
      "note": "Define Ingress como objeto para gerenciar acesso HTTP/HTTPS externo aos services."
    },
    {
      "type": "official-doc",
      "title": "Network Policies",
      "organization": "Kubernetes",
      "url": "https://kubernetes.io/docs/concepts/services-networking/network-policies/",
      "note": "Explica controle de tráfego em camada 3/4 entre pods e destinos."
    },
    {
      "type": "official-doc",
      "title": "Assign IPs to Pods with the Amazon VPC CNI",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/eks/latest/userguide/managing-vpc-cni.html",
      "note": "Documenta que o Amazon VPC CNI atribui IPs privados da VPC aos pods."
    },
    {
      "type": "official-doc",
      "title": "AKS CNI networking overview",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/aks/concepts-network-cni-overview",
      "note": "Explica que CNI plugins no AKS gerenciam IPs de pods, roteamento e service routing."
    },
    {
      "type": "official-doc",
      "title": "VPC-native clusters",
      "organization": "Google Cloud",
      "url": "https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips",
      "note": "Documenta clusters VPC-native e uso de alias IPs para pods no GKE."
    },
    {
      "type": "official-doc",
      "title": "Kubernetes Network Plugins",
      "organization": "Kubernetes",
      "url": "https://kubernetes.io/docs/concepts/extend-kubernetes/compute-storage-net/network-plugins/",
      "note": "Documentação oficial sobre CNI como requisito para implementar o modelo de rede Kubernetes."
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
              "name": "Risco cloud específico — Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress",
              "description": "Em Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress, o risco principal é criar caminho privado, rota, endpoint, peering, CNI, observabilidade ou landing zone que pareça segura, mas permita exposição pública residual, bypass de firewall, resolução DNS privada incorreta, rota assimétrica ou tráfego sem telemetria.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 14.11."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Kubernetes Networking na cloud: EKS, AKS, GKE, CNI e Ingress.",
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
      "Qual evidência comprova o entendimento da aula 14.11?"
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
      "14.12"
    ]
  },
  "cloudFinalReview": {
    "reviewId": "p1-m14-final-14.11",
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
  "kubernetesNetworkReadiness": {
    "ipam": [
      "Reservar CIDR de nodes, pods e services sem sobreposição com VPC/VNet, on-premises e outros clusters.",
      "Validar limites de IP por node, por subnet e por zona antes de escalar."
    ],
    "services": [
      "Definir padrão para ClusterIP, LoadBalancer, headless e services internos.",
      "Auditar services LoadBalancer públicos criados fora do processo aprovado."
    ],
    "ingressGateway": [
      "Padronizar Ingress Controller ou Gateway API, TLS, WAF, health checks e roteamento por host/path.",
      "Registrar owner e criticidade de cada entrada externa."
    ],
    "policies": [
      "Aplicar NetworkPolicy de deny-by-default onde o CNI suportar.",
      "Separar política Kubernetes de SG/NSG/firewall cloud."
    ],
    "egress": [
      "Definir saída por NAT, firewall, proxy ou private endpoint.",
      "Criar exceções de egress com prazo e evidência."
    ],
    "observability": [
      "Coletar eventos Kubernetes, logs do controller, métricas de LB, DNS/CoreDNS, flow logs e custos."
    ]
  },
  "p1_09_cloudNetworkingv2final": {
    "status": "aplicado",
    "focus": "Kubernetes Networking: CNI/IPAM, Services, Ingress/Gateway, NetworkPolicy e egress",
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
      "module": "Kubernetes",
      "lesson": "Service, Ingress e NetworkPolicy",
      "reason": "Kubernetes Networking depende de Services, Ingress/Gateway, NetworkPolicy e operação de clusters vistos na trilha de Infra/DevSecOps."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Workload Identity",
      "lesson": "Identidade de workloads e service accounts",
      "reason": "Egress e acesso a serviços cloud por Pods precisam separar rede de identidade e autorização."
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
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false,
    "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
  }
};
