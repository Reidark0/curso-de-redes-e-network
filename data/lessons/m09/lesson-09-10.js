export const lesson0910 = {
  "id": "9.10",
  "moduleId": "m09",
  "order": 10,
  "title": "Revisão prática: desenhar política de tráfego segura",
  "subtitle": "Projeto integrador para consolidar firewalls, ACLs, stateful inspection, zonas, DMZ, NAT, WAF, cloud, troubleshooting, logs, governança e policy as code em uma política de tráfego corporativa defensiva.",
  "duration": "130–200 min",
  "estimatedStudyTimeMinutes": 200,
  "difficulty": "intermediário",
  "type": "ligação/revisão",
  "xp": 300,
  "tags": [
    "firewall",
    "ACL",
    "WAF",
    "NAT",
    "DMZ",
    "segmentação",
    "cloud",
    "troubleshooting",
    "SIEM",
    "governança",
    "policy as code",
    "revisão",
    "projeto integrador",
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
      "reason": "A revisão prática parte do entendimento de fronteiras, zonas e intenção de controle."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.2",
      "title": "ACLs, regras e ordem de processamento",
      "reason": "A política final precisa considerar primeira regra compatível, deny implícito, shadowing e logging."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.3",
      "title": "Firewalls stateless vs stateful",
      "reason": "O desenho precisa diferenciar ida, retorno, tabela de estado, UDP e controles stateless em cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.4",
      "title": "Zonas, DMZ e segmentação segura",
      "reason": "A política final é desenhada por zonas de confiança e matriz de comunicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.5",
      "title": "NAT, port forwarding e publicação controlada",
      "reason": "Publicar serviços exige entender SNAT, DNAT, PAT, port forwarding e anti-bypass."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.6",
      "title": "WAF, regras HTTP e proteção de APIs",
      "reason": "APIs públicas precisam de controles L7 além de firewall L3/L4."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.7",
      "title": "Security groups, NACLs e firewalls em cloud",
      "reason": "O cenário final inclui ambiente híbrido e controles cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.8",
      "title": "Troubleshooting de políticas com logs, contadores e packet capture",
      "reason": "O projeto exige validação operacional e runbook de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.9",
      "title": "Governança de regras: revisão, exceções e policy as code",
      "reason": "A política final precisa de dono, justificativa, validade, evidência, revisão e guardrails."
    }
  ],
  "objectives": [
    "Desenhar uma política de tráfego completa para um ambiente corporativo híbrido.",
    "Transformar requisitos de negócio em zonas, fluxos, regras, logs e controles de segurança.",
    "Diferenciar quais controles pertencem ao firewall L3/L4, WAF, API Gateway, security group, NACL/NSG, proxy e SIEM.",
    "Criar uma matriz de comunicação com origem, destino, protocolo, porta, ação, dono, justificativa, validade e evidência.",
    "Identificar exposição pública indevida, bypass de WAF, egress irrestrito, regras amplas e caminhos assimétricos.",
    "Construir um plano de validação, troubleshooting, rollback e governança para a política desenhada."
  ],
  "learningOutcomes": [
    "Ao final, você conseguirá sair de um desenho de aplicação e propor uma política de tráfego defensiva, auditável e operável.",
    "Você conseguirá explicar por que uma regra foi criada, onde ela deve ser aplicada e como validar se funciona sem abrir risco excessivo.",
    "Você conseguirá revisar criticamente uma arquitetura publicada na internet e apontar bypass, exposição direta, ausência de logs e egress perigoso.",
    "Você conseguirá preparar evidências técnicas para operação, segurança, auditoria e resposta a incidentes."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h3>Motivação</h3>\n  \n<p>Até aqui, você estudou firewalls como conceito, ACLs como mecanismo de decisão, stateful inspection como memória de conexão, zonas como arquitetura, NAT como tradução e publicação, WAF como proteção HTTP, controles cloud como camada distribuída, troubleshooting como método e governança como ciclo de vida. A aula final junta tudo em uma pergunta prática: <strong>como desenhar uma política de tráfego segura sem quebrar a operação?</strong></p>\n<p>Essa pergunta aparece todos os dias em empresas. Uma aplicação precisa ser publicada, um banco precisa receber tráfego de um backend, uma esteira de CI/CD precisa acessar um registry, uma filial precisa chegar a um sistema interno, um fornecedor pede acesso temporário, uma API pública precisa ficar atrás de WAF e a auditoria pergunta quem aprovou cada regra.</p>\n<div class=\"callout callout--problem\"><strong>Ideia central:</strong> política de tráfego não é uma lista de portas abertas. É uma decisão arquitetural que conecta negócio, rede, segurança, operação, cloud, logs e governança.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h3>História</h3>\n  \n<p>Historicamente, redes corporativas começaram com fronteiras simples: rede interna confiável e internet não confiável. Um firewall na borda parecia suficiente. Com o tempo, surgiram DMZs, redes de usuários, servidores, bancos, filiais, VPNs, parceiros, data centers, nuvens públicas, SaaS, Kubernetes, APIs públicas e integrações automatizadas. A fronteira deixou de ser uma linha única.</p>\n<p>Ao mesmo tempo, ataques evoluíram. Não bastava impedir tráfego vindo da internet. Era necessário reduzir movimento lateral, proteger serviços internos, controlar saída, impedir bypass de WAF, auditar exceções, validar mudanças em pipeline e responder rapidamente a incidentes. Por isso, a política de tráfego moderna virou uma combinação de firewalls, roteamento, NAT, proxies, WAFs, controles cloud, logs, identidade, automação e revisão contínua.</p>\n<p>Esta revisão prática representa esse estágio moderno: o aluno não deve apenas saber configurar uma regra. Deve saber justificar a regra, posicioná-la no ponto correto, validar seu efeito e removê-la quando deixar de fazer sentido.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h3>Problema</h3>\n  \n<p>O problema final do módulo é transformar requisitos vagos em uma política segura. Requisitos normalmente chegam assim: “libera o acesso da aplicação ao banco”, “publica essa API”, “abre o SSH para suporte”, “permite saída para internet”, “o WAF está bloqueando produção”, “a NACL está quebrando o retorno”, “o cliente recebeu 504” ou “precisamos liberar temporariamente para resolver o incidente”.</p>\n<p>Essas frases não são políticas. Elas são sintomas ou desejos. Uma política real precisa responder: quem inicia o tráfego, para onde vai, por qual protocolo, por qual porta, por quanto tempo, com qual autenticação, por qual caminho, passando por qual ponto de controle, gerando qual log, com qual dono e com qual rollback.</p>\n<table class=\"data-table\"><thead><tr><th>Pedido vago</th><th>Pergunta técnica necessária</th><th>Risco se ignorar</th></tr></thead><tbody>\n<tr><td>“Publicar a API”</td><td>Será via WAF/API Gateway ou direto no backend?</td><td>Bypass de inspeção, autenticação e rate limit</td></tr>\n<tr><td>“Liberar o banco”</td><td>Qual backend específico precisa acessar qual porta?</td><td>Banco exposto para subnets amplas</td></tr>\n<tr><td>“Abrir SSH/RDP”</td><td>Por VPN/Bastion/JIT ou internet inteira?</td><td>Administração exposta a brute force e exploração</td></tr>\n<tr><td>“Permitir internet”</td><td>Qual destino, porta, domínio, proxy ou NAT?</td><td>Egress irrestrito e comando e controle</td></tr>\n<tr><td>“Resolver o 504”</td><td>É rota, firewall, WAF, LB, backend, DNS ou timeout?</td><td>Liberação ampla sem corrigir causa raiz</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Regra prática:</strong> quando o requisito não identifica origem, destino, protocolo, porta, dono, justificativa, validade e evidência, ele ainda não está pronto para virar regra.</div>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h3>Evolução</h3>\n  \n<p>A maturidade no desenho de política de tráfego evolui em quatro níveis. No primeiro, regras são abertas para “fazer funcionar”. No segundo, regras são documentadas em planilhas ou tickets. No terceiro, regras passam por arquitetura, revisão e logs. No quarto, regras são tratadas como código, com validação automática, revisão por pares, detecção de drift e expiração controlada.</p>\n<ol class=\"flow-list\">\n<li><strong>Conectividade emergencial:</strong> o foco é liberar rapidamente, com alto risco de exceção permanente.</li>\n<li><strong>Controle documentado:</strong> há ticket, descrição e aprovação, mas ainda com pouca validação técnica.</li>\n<li><strong>Arquitetura defensiva:</strong> regras são derivadas de zonas, fluxos, dados sensíveis e pontos de controle.</li>\n<li><strong>Governança contínua:</strong> mudanças são versionadas, testadas, monitoradas, revisadas e expiradas.</li>\n</ol>\n<p>Esta aula ensina a trabalhar no terceiro e quarto níveis: desenhar a política pela arquitetura e mantê-la governável ao longo do tempo.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h3>Conceito</h3>\n  \n<p><strong>Política de tráfego segura</strong> é o conjunto de decisões que define quais comunicações são permitidas, negadas, inspecionadas, registradas, traduzidas, publicadas ou limitadas entre zonas, sistemas e serviços. Ela combina intenção de negócio com menor privilégio técnico.</p>\n<div class=\"definition-box\">\n<p><strong>Uma política de tráfego bem desenhada</strong> descreve origem, destino, protocolo, porta, direção, zona, caminho, controle aplicado, log esperado, dono, justificativa, validade, evidência de teste e plano de rollback.</p>\n</div>\n<p>O firewall não é o único elemento dessa política. Em uma arquitetura moderna, a decisão pode estar distribuída entre security group, NACL, route table, cloud firewall, WAF, API Gateway, load balancer, reverse proxy, Kubernetes NetworkPolicy, service mesh, proxy corporativo, DNS, IAM, endpoint privado e SIEM.</p>\n<p>O segredo é evitar dois extremos: confiar cegamente em uma única barreira ou espalhar controles sem desenho. Segurança efetiva vem de camadas coordenadas.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h3>Funcionamento interno</h3>\n  \n<p>Por dentro, o desenho de uma política começa com a identificação dos ativos e dos fluxos. Primeiro, você separa zonas: internet, DMZ, usuários, aplicações, bancos, administração, backup, observabilidade, cloud pública, serviços SaaS e fornecedores. Depois, identifica quais fluxos são realmente necessários.</p>\n<p>Cada fluxo deve ser decomposto em campos técnicos. Um pedido “frontend acessa backend” precisa virar algo como: origem <code>subnet-dmz-web</code>, destino <code>subnet-app-api</code>, protocolo <code>TCP</code>, porta <code>8443</code>, ação <code>permit</code>, controle <code>firewall stateful + log</code>, dono <code>time da aplicação X</code>, validade <code>permanente com revisão trimestral</code>, evidência <code>teste curl e log no SIEM</code>.</p>\n<p>Depois vem a escolha do ponto de controle. Tráfego público HTTP deve passar por CDN/WAF/API Gateway. Tráfego administrativo deve passar por VPN/Bastion/JIT, não por regra pública. Tráfego entre subnets deve passar por firewall ou policy de segmentação. Tráfego de saída deve passar por NAT Gateway/proxy/firewall com logs. Tráfego sensível entre serviços pode exigir mTLS, private endpoint ou service mesh.</p>\n<p>Por fim, a política precisa ser testada nos dois sentidos: o que deve funcionar precisa funcionar; o que deve ser negado precisa ser comprovadamente negado. Sem teste negativo, uma política pode parecer correta apenas porque o fluxo permitido funcionou.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h3>Arquitetura</h3>\n  \n<p>Uma arquitetura típica para esta revisão possui internet, CDN/WAF, load balancer, DMZ, camada de aplicação, banco privado, rede administrativa, saída controlada por NAT/proxy, logs centralizados e controles cloud. O desenho seguro não publica backends diretamente. Ele força tráfego público a passar por controles de borda e força tráfego interno a respeitar zonas.</p>\n<table class=\"comparison-table\"><thead><tr><th>Camada</th><th>Controle principal</th><th>Função</th><th>Erro comum</th></tr></thead><tbody>\n<tr><td>Borda pública</td><td>CDN, WAF, API Gateway, LB</td><td>Receber tráfego externo, aplicar TLS, rate limit e inspeção HTTP</td><td>Permitir acesso direto ao backend</td></tr>\n<tr><td>DMZ</td><td>Firewall, reverse proxy, load balancer</td><td>Isolar serviços publicados da rede interna</td><td>Tratar DMZ como rede confiável</td></tr>\n<tr><td>Aplicação</td><td>Firewall stateful, SG/NSG, NetworkPolicy</td><td>Permitir apenas fluxos necessários entre serviços</td><td>Permitir toda a subnet</td></tr>\n<tr><td>Banco</td><td>SG restritivo, subnet privada, firewall</td><td>Aceitar apenas backends autorizados</td><td>Banco com IP público ou acesso administrativo amplo</td></tr>\n<tr><td>Administração</td><td>VPN, Bastion, JIT, MFA</td><td>Controlar acesso operacional privilegiado</td><td>SSH/RDP aberto para internet</td></tr>\n<tr><td>Saída</td><td>NAT Gateway, proxy, DNS filtering, egress firewall</td><td>Controlar e registrar outbound</td><td>Permitir egress irrestrito</td></tr>\n<tr><td>Observabilidade</td><td>SIEM, flow logs, WAF logs, firewall logs</td><td>Gerar evidência e detectar abuso</td><td>Regra crítica sem log</td></tr>\n</tbody></table>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h3>Analogia</h3>\n  \n<p>Imagine um prédio corporativo. A recepção não entrega a chave do cofre a qualquer visitante. Visitantes entram pela portaria, informam o motivo, são identificados, recebem crachá, só acessam o andar autorizado e ficam registrados. Funcionários acessam áreas internas conforme função. Técnicos entram por rota controlada. Entregas vão para área específica. O cofre fica em sala separada. Câmeras registram eventos.</p>\n<p>Uma política de tráfego segura faz a mesma coisa: define entradas oficiais, áreas intermediárias, zonas restritas, rotas administrativas, registros, exceções e prazos. Abrir <code>any-any</code> seria como remover catracas, portas, câmeras e crachás porque alguém precisa entregar uma caixa rapidamente.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h3>Exemplo simples</h3>\n  \n<p>Em uma rede doméstica, você pode ter um roteador com NAT. Por padrão, conexões iniciadas de dentro saem para a internet e respostas retornam. Mas conexões iniciadas da internet para o seu notebook são bloqueadas. Quando você configura port forwarding para um serviço interno, está criando uma exceção de entrada.</p>\n<p>O aprendizado simples é: publicar algo exige uma decisão explícita. Se você publicar um painel administrativo diretamente, abriu uma porta de entrada para atacantes. Se publicar apenas via reverse proxy com TLS, autenticação e logs, reduziu o risco.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h3>Exemplo empresarial</h3>\n  \n<p>Uma empresa possui uma aplicação de RH. Usuários internos acessam o frontend em HTTPS. O frontend conversa com a API. A API consulta o banco. Administradores acessam servidores apenas via Bastion. Backups acessam o banco em janela específica. O SIEM recebe logs de firewall, WAF e aplicação.</p>\n<p>A política segura não libera “rede de usuários para banco”. Ela libera usuários para frontend, frontend para API, API para banco, backup para banco em porta e janela definidas, administração via Bastion e saída da aplicação apenas para dependências aprovadas. Essa granularidade reduz movimento lateral e torna incidentes investigáveis.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h3>Exemplo em cloud</h3>\n  \n<p>Em cloud, o mesmo desenho aparece como VPC/VNet, subnets públicas e privadas, route tables, Internet Gateway, NAT Gateway, Load Balancer, WAF, Security Groups, NACLs/NSGs, cloud firewall, private endpoints e flow logs. A API pública fica atrás de WAF e load balancer. O backend fica em subnet privada. O banco não tem IP público. O acesso administrativo passa por Bastion ou serviço gerenciado com MFA.</p>\n<p>A política precisa considerar que controles são distribuídos. Uma regra no security group pode permitir, mas a NACL pode negar. A route table pode não ter rota. O WAF pode bloquear HTTP. O backend pode rejeitar TLS. Por isso, o desenho precisa incluir caminho, controle e evidência.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h3>Exemplo em DevSecOps</h3>\n  \n<p>Em DevSecOps, a política de tráfego deve nascer junto com a infraestrutura. Um pull request de Terraform que cria um load balancer público também deve criar WAF, TLS, logs, security groups restritivos e tags de owner. O pipeline deve bloquear SSH/RDP público, banco com IP público, security group <code>0.0.0.0/0</code> em portas sensíveis, ausência de logs em recurso público e regra sem expiração quando for exceção.</p>\n<p>O objetivo não é impedir entrega. É impedir que uma entrega rápida gere exposição permanente. Guardrails automatizados transformam boas práticas em proteção contínua.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h3>Exemplo em Segurança</h3>\n  \n<p>Durante um incidente, o time de segurança identifica que um servidor comprometido tentou se conectar a múltiplos bancos de dados. Uma política bem desenhada permite responder rapidamente: flow logs mostram tentativas bloqueadas, SIEM correlaciona origem e destino, regras entre zonas limitam movimento lateral e egress controlado reduz comunicação com infraestrutura externa.</p>\n<p>Se a rede fosse plana e as regras fossem amplas, a resposta dependeria de sorte. Segurança não é apenas detectar ataque; é limitar o impacto quando ele acontece.</p>\n<div class=\"callout callout--security\"><strong>Princípio defensivo:</strong> desenhe políticas assumindo que algum ativo será comprometido. A política deve limitar alcance, registrar tentativa e facilitar investigação.</div>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h3>Diagrama</h3>\n  \n<svg class=\"lesson-svg\" viewBox=\"0 0 980 560\" role=\"img\" aria-labelledby=\"m09l10-title m09l10-desc\">\n  <title id=\"m09l10-title\">Arquitetura de política de tráfego segura</title>\n  <desc id=\"m09l10-desc\">Fluxo de internet para WAF, load balancer, DMZ, aplicação, banco privado, administração protegida, saída controlada e logs centralizados.</desc>\n  <defs>\n    <marker id=\"m09l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n  </defs>\n  <rect class=\"svg-zone\" x=\"25\" y=\"35\" width=\"135\" height=\"470\" rx=\"18\"></rect>\n  <text class=\"svg-label\" x=\"92\" y=\"62\" text-anchor=\"middle\">Internet</text>\n  <rect class=\"svg-zone\" x=\"190\" y=\"35\" width=\"185\" height=\"470\" rx=\"18\"></rect>\n  <text class=\"svg-label\" x=\"282\" y=\"62\" text-anchor=\"middle\">Borda/DMZ</text>\n  <rect class=\"svg-zone\" x=\"405\" y=\"35\" width=\"185\" height=\"470\" rx=\"18\"></rect>\n  <text class=\"svg-label\" x=\"498\" y=\"62\" text-anchor=\"middle\">Aplicação</text>\n  <rect class=\"svg-zone\" x=\"620\" y=\"35\" width=\"160\" height=\"470\" rx=\"18\"></rect>\n  <text class=\"svg-label\" x=\"700\" y=\"62\" text-anchor=\"middle\">Dados</text>\n  <rect class=\"svg-zone\" x=\"810\" y=\"35\" width=\"145\" height=\"470\" rx=\"18\"></rect>\n  <text class=\"svg-label\" x=\"882\" y=\"62\" text-anchor=\"middle\">Operação</text>\n  <g class=\"svg-node svg-node--client\" transform=\"translate(45 160)\"><rect width=\"95\" height=\"62\" rx=\"12\"></rect><text x=\"47\" y=\"28\" text-anchor=\"middle\">Cliente</text><text class=\"svg-label--small\" x=\"47\" y=\"47\" text-anchor=\"middle\">HTTPS</text></g>\n  <g class=\"svg-node svg-node--security\" transform=\"translate(215 115)\"><rect width=\"135\" height=\"70\" rx=\"14\"></rect><text x=\"67\" y=\"28\" text-anchor=\"middle\">CDN/WAF</text><text class=\"svg-label--small\" x=\"67\" y=\"50\" text-anchor=\"middle\">TLS + L7 + rate</text></g>\n  <g class=\"svg-node svg-node--firewall\" transform=\"translate(215 255)\"><rect width=\"135\" height=\"70\" rx=\"14\"></rect><text x=\"67\" y=\"28\" text-anchor=\"middle\">Firewall</text><text class=\"svg-label--small\" x=\"67\" y=\"50\" text-anchor=\"middle\">DMZ ↔ app</text></g>\n  <g class=\"svg-node svg-node--server\" transform=\"translate(430 115)\"><rect width=\"135\" height=\"70\" rx=\"14\"></rect><text x=\"67\" y=\"28\" text-anchor=\"middle\">API</text><text class=\"svg-label--small\" x=\"67\" y=\"50\" text-anchor=\"middle\">subnet privada</text></g>\n  <g class=\"svg-node svg-node--cloud\" transform=\"translate(430 255)\"><rect width=\"135\" height=\"70\" rx=\"14\"></rect><text x=\"67\" y=\"28\" text-anchor=\"middle\">Worker</text><text class=\"svg-label--small\" x=\"67\" y=\"50\" text-anchor=\"middle\">egress controlado</text></g>\n  <g class=\"svg-node svg-node--server\" transform=\"translate(640 170)\"><rect width=\"120\" height=\"70\" rx=\"14\"></rect><text x=\"60\" y=\"28\" text-anchor=\"middle\">Banco</text><text class=\"svg-label--small\" x=\"60\" y=\"50\" text-anchor=\"middle\">sem IP público</text></g>\n  <g class=\"svg-node svg-node--router\" transform=\"translate(830 105)\"><rect width=\"105\" height=\"64\" rx=\"12\"></rect><text x=\"52\" y=\"28\" text-anchor=\"middle\">Bastion</text><text class=\"svg-label--small\" x=\"52\" y=\"48\" text-anchor=\"middle\">MFA/JIT</text></g>\n  <g class=\"svg-node svg-node--switch\" transform=\"translate(825 245)\"><rect width=\"115\" height=\"64\" rx=\"12\"></rect><text x=\"57\" y=\"28\" text-anchor=\"middle\">SIEM</text><text class=\"svg-label--small\" x=\"57\" y=\"48\" text-anchor=\"middle\">logs</text></g>\n  <g class=\"svg-node svg-node--firewall\" transform=\"translate(430 400)\"><rect width=\"135\" height=\"64\" rx=\"12\"></rect><text x=\"67\" y=\"27\" text-anchor=\"middle\">NAT/Proxy</text><text class=\"svg-label--small\" x=\"67\" y=\"48\" text-anchor=\"middle\">saída auditada</text></g>\n  <line class=\"svg-flow svg-flow--request animated-flow\" x1=\"140\" y1=\"190\" x2=\"215\" y2=\"150\" marker-end=\"url(#m09l10-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--request animated-flow\" x1=\"350\" y1=\"150\" x2=\"430\" y2=\"150\" marker-end=\"url(#m09l10-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--request animated-flow\" x1=\"565\" y1=\"150\" x2=\"640\" y2=\"205\" marker-end=\"url(#m09l10-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--response animated-flow\" x1=\"830\" y1=\"137\" x2=\"565\" y2=\"290\" marker-end=\"url(#m09l10-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--response animated-flow\" x1=\"565\" y1=\"432\" x2=\"825\" y2=\"277\" marker-end=\"url(#m09l10-arrow)\"></line>\n  <line class=\"svg-flow svg-flow--blocked animated-flow\" x1=\"140\" y1=\"210\" x2=\"640\" y2=\"205\" marker-end=\"url(#m09l10-arrow)\"></line>\n  <text class=\"svg-badge\" x=\"390\" y=\"218\" text-anchor=\"middle\">bloqueio: internet não acessa banco/backend diretamente</text>\n  <text class=\"svg-badge\" x=\"488\" y=\"525\" text-anchor=\"middle\">Política segura = fluxo permitido + bloqueio comprovado + log + dono + validade + rollback</text>\n</svg>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h3>Laboratório</h3>\n  \n<p>O laboratório final simula uma revisão de arquitetura. Você receberá requisitos de uma aplicação corporativa e deverá produzir a política de tráfego, os pontos de controle, a matriz de regras, os testes, os logs esperados, o plano de rollback e os critérios de governança.</p>\n\n</section>\n<div class=\"content-card\" data-enhancement=\"p1-07-9.10\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h3>Exercícios</h3>\n  \n<p>Os exercícios consolidam a identificação de zonas, a tradução de requisitos em fluxos, a escolha de controles, a leitura de riscos e a criação de evidências de validação.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h3>Desafio</h3>\n  \n<p>O desafio final coloca você como arquiteto de rede e segurança de uma empresa que vai publicar uma API de pagamentos. Sua missão é impedir exposição direta, reduzir movimento lateral, controlar administração, registrar evidências e criar governança.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h3>Solução comentada</h3>\n  \n<p>A solução comentada apresenta uma política defensiva completa, explicando por que cada fluxo é permitido, por que outros são negados, onde os logs são gerados e como a política seria revisada.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h3>Resumo</h3>\n  \n<p>O Módulo 9 ensinou que firewall não é apenas equipamento: é política de tráfego. ACLs definem decisões, stateful inspection reduz complexidade de retorno, zonas reduzem confiança excessiva, DMZ isola publicação, NAT controla tradução, WAF protege HTTP, cloud distribui controles, troubleshooting encontra causa raiz e governança impede que exceções virem risco permanente.</p>\n<p>A habilidade final é transformar uma necessidade de comunicação em uma política segura, documentada, testável, auditável e sustentável.</p>\n\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h3>Próximo tema</h3>\n  \n<p>No próximo módulo, você avançará para um tema complementar da defesa moderna: monitoramento, logs, observabilidade e detecção em redes. Firewalls reduzem e registram tráfego; o próximo passo é transformar esses registros em visibilidade, alerta, investigação e resposta.</p>\n\n</section>"
  },
  "networkContext": {
    "whereItFits": "A revisão prática fecha o Módulo 9 conectando controle L3/L4, inspeção L7, publicação controlada, cloud, logs, troubleshooting e governança em uma política de tráfego defensiva.",
    "previousDependencies": [
      "Módulo 4: IPv4 e endereçamento",
      "Módulo 5: subnetting",
      "Módulo 6: roteamento",
      "Módulo 8: TCP, UDP, portas e NAT",
      "Módulo 9: HTTP, HTTPS, proxies e APIs",
      "Módulo 9: firewalls, ACLs, WAF e políticas"
    ],
    "realWorldUse": "Desenho de arquitetura segura, publicação de APIs, revisão de regras, auditoria, investigação de incidentes, hardening de cloud, governança de exceções e criação de runbooks operacionais."
  },
  "protocolFields": [
    {
      "field": "Origem",
      "meaning": "Zona, subnet, workload, IP, grupo ou identidade que inicia o fluxo.",
      "securityNote": "Origem ampla demais aumenta movimento lateral."
    },
    {
      "field": "Destino",
      "meaning": "Serviço, VIP, load balancer, backend, banco, API, endpoint privado ou zona de destino.",
      "securityNote": "Destinos sensíveis devem permanecer privados e receber acesso mínimo."
    },
    {
      "field": "Protocolo/porta",
      "meaning": "TCP, UDP, ICMP, porta de aplicação ou atributo HTTP no caso de WAF.",
      "securityNote": "Porta aberta não significa serviço seguro; controle de aplicação e autenticação continuam necessários."
    },
    {
      "field": "Direção",
      "meaning": "Inbound, outbound, east-west, north-south ou tráfego administrativo.",
      "securityNote": "Egress irrestrito permite exfiltração e comando e controle."
    },
    {
      "field": "Ação",
      "meaning": "Permit, deny, reject, inspect, log, rate limit, challenge ou redirect.",
      "securityNote": "Regras críticas sem log reduzem capacidade de investigação."
    },
    {
      "field": "Ponto de controle",
      "meaning": "Firewall, SG/NSG, NACL, WAF, API Gateway, LB, proxy, service mesh ou NetworkPolicy.",
      "securityNote": "Controle no ponto errado cria bypass."
    },
    {
      "field": "Dono e validade",
      "meaning": "Responsável técnico/negócio e prazo de revisão ou expiração.",
      "securityNote": "Regra sem dono tende a nunca ser removida."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Classificar o fluxo",
      "description": "Identificar se o tráfego é público, interno, administrativo, saída para internet, integração de fornecedor ou comunicação entre serviços."
    },
    {
      "step": 2,
      "name": "Escolher zonas",
      "description": "Mapear origem e destino para zonas de confiança: internet, DMZ, aplicação, dados, administração, cloud, SaaS ou observabilidade."
    },
    {
      "step": 3,
      "name": "Definir ponto de controle",
      "description": "Selecionar onde a decisão deve acontecer: WAF, firewall, SG, NACL, API Gateway, proxy, route table ou policy de workload."
    },
    {
      "step": 4,
      "name": "Descrever a regra mínima",
      "description": "Definir origem, destino, protocolo, porta, ação, log, dono, justificativa e validade."
    },
    {
      "step": 5,
      "name": "Validar caminho",
      "description": "Confirmar DNS, rota, NAT, state table, TLS, WAF, LB e backend."
    },
    {
      "step": 6,
      "name": "Testar positivo e negativo",
      "description": "Comprovar que o fluxo permitido funciona e que o acesso indevido é bloqueado."
    },
    {
      "step": 7,
      "name": "Gerar evidência",
      "description": "Registrar logs, request IDs, flow logs, contadores e resultado de testes."
    },
    {
      "step": 8,
      "name": "Governar ciclo de vida",
      "description": "Criar revisão, expiração, rollback e validação por policy as code."
    }
  ],
  "deepDive": {
    "title": "Como pensar como arquiteto defensivo",
    "topics": [
      {
        "title": "Fluxo necessário não é permissão ampla",
        "details": "Quando uma aplicação precisa falar com um banco, isso não autoriza uma subnet inteira a falar com todos os bancos. O fluxo deve ser específico, justificável e monitorado."
      },
      {
        "title": "Publicação segura exige caminho oficial",
        "details": "APIs públicas devem entrar por WAF/API Gateway/LB. Permitir acesso direto ao backend anula controles de borda."
      },
      {
        "title": "Administração é fluxo privilegiado",
        "details": "SSH, RDP, console e painéis internos exigem VPN, Bastion, MFA, JIT, logs e revisão. Não são apenas portas técnicas."
      },
      {
        "title": "Bloqueio também precisa ser testado",
        "details": "Teste de política não termina quando o acesso permitido funciona. É necessário provar que origem errada, porta errada e caminho direto são negados."
      },
      {
        "title": "Política sem logs é política cega",
        "details": "Sem logs, contadores e correlação, o time não sabe se a regra é usada, abusada, inútil ou necessária."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Criar regra any-any para resolver incidente",
      "impact": "A exceção pode virar exposição permanente.",
      "fix": "Criar regra mínima, temporária, com log, dono, validade e rollback."
    },
    {
      "mistake": "Publicar backend diretamente",
      "impact": "Bypass de WAF, API Gateway, rate limit e autenticação de borda.",
      "fix": "Permitir entrada pública somente pela camada oficial de borda."
    },
    {
      "mistake": "Abrir banco para rede inteira",
      "impact": "Movimento lateral e exposição de dados.",
      "fix": "Permitir apenas backends específicos e monitorar acessos."
    },
    {
      "mistake": "Ignorar saída para internet",
      "impact": "Exfiltração, download de malware e C2.",
      "fix": "Controlar egress com NAT/proxy/firewall, DNS filtering e logs."
    },
    {
      "mistake": "Confiar apenas em uma camada",
      "impact": "Falha única de controle.",
      "fix": "Usar defesa em profundidade: borda, segmentação, identidade, logs e governança."
    },
    {
      "mistake": "Não testar negações",
      "impact": "Risco invisível de acesso indevido.",
      "fix": "Incluir testes negativos no plano de validação."
    }
  ],
  "troubleshooting": {
    "method": "Diagnosticar por camadas e por ponto de controle: DNS, rota, TCP/UDP, NAT, firewall, state table, TLS, WAF, LB, aplicação, logs e traces.",
    "symptoms": [
      {
        "symptom": "Timeout",
        "likelyCauses": [
          "drop em firewall",
          "rota ausente",
          "NACL/NSG bloqueando retorno",
          "serviço sem resposta",
          "caminho assimétrico"
        ],
        "checks": [
          "Test-NetConnection/nc",
          "flow logs",
          "contadores",
          "tcpdump",
          "route table"
        ]
      },
      {
        "symptom": "Connection refused",
        "likelyCauses": [
          "host alcançado sem serviço na porta",
          "RST do servidor",
          "porta errada"
        ],
        "checks": [
          "ss/netstat no destino",
          "logs de aplicação",
          "pcap de SYN/RST"
        ]
      },
      {
        "symptom": "403",
        "likelyCauses": [
          "WAF",
          "API Gateway",
          "autorização",
          "CORS",
          "regra L7"
        ],
        "checks": [
          "logs do WAF",
          "request ID",
          "headers",
          "token/escopo"
        ]
      },
      {
        "symptom": "502/503/504",
        "likelyCauses": [
          "backend indisponível",
          "health check falho",
          "timeout",
          "TLS upstream",
          "rota entre LB e backend"
        ],
        "checks": [
          "logs do LB",
          "health checks",
          "curl do proxy ao backend",
          "traces"
        ]
      },
      {
        "symptom": "Funciona de uma origem, falha de outra",
        "likelyCauses": [
          "ACL por origem",
          "SG diferente",
          "NAT diferente",
          "DNS split-horizon",
          "rota assimétrica"
        ],
        "checks": [
          "comparar IP de origem",
          "traceroute",
          "flow logs por ENI/interface",
          "regras por zona"
        ]
      }
    ],
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "show access-lists\n# Exemplo textual: permit tcp rede-usuarios host app443 eq 443; deny ip any banco log",
        "purpose": "Regras exemplares",
        "expectedObservation": "Regras refletem matriz.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "curl -vkI https://api.lab.local/health -H \"X-Request-ID: projeto-m09\"",
        "purpose": "WAF e headers",
        "expectedObservation": "Validação HTTP.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "nc -vz api.lab.local 443\ncurl -vkI https://api.lab.local/health\nTest-NetConnection banco.privado.local -Port 5432",
        "purpose": "Testes positivos/negativos",
        "expectedObservation": "Segurança testada.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      }
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "Qual é o 5-tuple do fluxo e em qual horário ele falhou?",
      "Qual controle tomou a decisão e qual evidência prova isso?",
      "A falha está na ida, no retorno, no estado, no NAT, no WAF ou no backend?"
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
    "badPractices": [
      "Criar any-any para troubleshooting sem rollback.",
      "Permitir SSH/RDP de 0.0.0.0/0.",
      "Expor banco de dados publicamente.",
      "Permitir backend direto além do WAF.",
      "Manter exceção temporária sem expiração.",
      "Desativar WAF em produção sem janela e sem compensação.",
      "Confiar apenas em NAT como se fosse firewall.",
      "Não coletar logs de regras críticas."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por rede plana.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentar por zonas e criticidade."
      },
      {
        "name": "Bypass de WAF por backend público.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Usar controles L3/L4 e L7 coordenados."
      },
      {
        "name": "Exfiltração por egress irrestrito.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Aplicar logs, SIEM e alertas para fluxos críticos."
      },
      {
        "name": "Brute force em administração exposta.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Criar regras temporárias com validade curta e revisão obrigatória."
      },
      {
        "name": "Shadowing que permite tráfego proibido.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Usar WAF/API Gateway para APIs públicas."
      },
      {
        "name": "Caminho assimétrico que quebra inspeção stateful.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Usar private endpoints e subnets privadas para dados."
      },
      {
        "name": "Regra vencida ainda ativa.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Automatizar validações em IaC/pipeline."
      },
      {
        "name": "Logs contendo tokens, cookies ou dados sensíveis.",
        "description": "Risco relacionado à aula 9.10 — Revisão prática: desenhar política de tráfego segura.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Sanitizar logs e pcaps antes de compartilhar evidências."
      }
    ],
    "mitigations": [
      "Segmentar por zonas e criticidade.",
      "Usar controles L3/L4 e L7 coordenados.",
      "Aplicar logs, SIEM e alertas para fluxos críticos.",
      "Criar regras temporárias com validade curta e revisão obrigatória.",
      "Usar WAF/API Gateway para APIs públicas.",
      "Usar private endpoints e subnets privadas para dados.",
      "Automatizar validações em IaC/pipeline.",
      "Sanitizar logs e pcaps antes de compartilhar evidências."
    ],
    "goodPractices": [
      "Adotar deny-by-default entre zonas.",
      "Publicar aplicações por WAF/API Gateway/LB, não diretamente no backend.",
      "Manter bancos e backends sensíveis sem IP público.",
      "Controlar administração por VPN/Bastion/JIT/MFA.",
      "Registrar logs de allow e deny relevantes no SIEM.",
      "Usar owner, justificativa, validade e revisão para regras.",
      "Controlar saída para internet, especialmente de servidores.",
      "Testar fluxos permitidos e bloqueados.",
      "Aplicar policy as code para bloquear padrões perigosos.",
      "Revisar regras com contadores, logs e evidência de uso."
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
      "Segmentar por zonas e criticidade.",
      "Usar controles L3/L4 e L7 coordenados.",
      "Aplicar logs, SIEM e alertas para fluxos críticos.",
      "Criar regras temporárias com validade curta e revisão obrigatória.",
      "Usar WAF/API Gateway para APIs públicas.",
      "Usar private endpoints e subnets privadas para dados.",
      "Automatizar validações em IaC/pipeline.",
      "Sanitizar logs e pcaps antes de compartilhar evidências."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.10",
    "title": "Projeto integrador M09: política de tráfego segura e validável",
    "labType": "architecture",
    "objective": "Desenhar política completa com zonas, matriz, ACL/firewall, NAT, SG/NACL, WAF, logs, testes e governança.",
    "scenario": "Empresa híbrida possui usuários internos, DMZ, API pública, banco privado, gestão, cloud e SIEM.",
    "topology": "Usuários/VPN -> firewall -> DMZ/API -> app privada -> banco -> cloud subnet -> SIEM/bastion.",
    "architecture": "Defesa em profundidade com deny-by-default, stateful onde adequado, stateless com retorno explícito, WAF e governança por evidências.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "Editor de diagrama",
      "planilha/Markdown",
      "curl",
      "nc",
      "show access-lists",
      "flow logs sintéticos"
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
        "title": "Diagrama de zonas",
        "instruction": "Desenhe Internet, DMZ, app, banco, gestão, cloud e SIEM.",
        "expectedOutput": "Zonas definidas.",
        "evidence": "Mapa de fronteiras.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Diagrama SVG/ASCII ou tabela de zonas."
      },
      {
        "number": 2,
        "title": "Matriz de fluxos",
        "instruction": "Liste fluxos permitidos e bloqueios críticos.",
        "expectedOutput": "Política auditável.",
        "evidence": "Matriz completa.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Matriz origem | destino | protocolo | porta | direção | controle | log | owner."
      },
      {
        "number": 3,
        "title": "Escolher controles",
        "instruction": "Associe SG/NACL/firewall/WAF/NAT a cada fronteira.",
        "expectedOutput": "Controle certo no lugar certo.",
        "evidence": "Tabela controle/motivo/limitação.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "Justificar stateful, stateless, WAF e NAT."
      },
      {
        "number": 4,
        "title": "Regras exemplares",
        "instruction": "Crie exemplos de ACL/firewall para três fluxos.",
        "expectedOutput": "Regras refletem matriz.",
        "evidence": "Regras exemplares.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "show access-lists\n# Exemplo textual: permit tcp rede-usuarios host app443 eq 443; deny ip any banco log"
      },
      {
        "number": 5,
        "title": "NAT/publicação",
        "instruction": "Separe DNAT/SNAT de política.",
        "expectedOutput": "NAT não vira autorização.",
        "evidence": "Publicação controlada.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Tabela NAT antes/depois + regra firewall."
      },
      {
        "number": 6,
        "title": "WAF e headers",
        "instruction": "Defina WAF, CORS, headers e request ID.",
        "expectedOutput": "Validação HTTP.",
        "evidence": "Checklist WAF/headers.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "curl -vkI https://api.lab.local/health -H \"X-Request-ID: projeto-m09\""
      },
      {
        "number": 7,
        "title": "Logs e contadores",
        "instruction": "Defina allow/deny/NAT/WAF/flow logs.",
        "expectedOutput": "Troubleshooting viável.",
        "evidence": "Campos mínimos.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Mapa de observabilidade."
      },
      {
        "number": 8,
        "title": "Testes positivos/negativos",
        "instruction": "Planeje comandos de permissão e bloqueio.",
        "expectedOutput": "Segurança testada.",
        "evidence": "Plano de validação.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "nc -vz api.lab.local 443\ncurl -vkI https://api.lab.local/health\nTest-NetConnection banco.privado.local -Port 5432"
      },
      {
        "number": 9,
        "title": "Governança",
        "instruction": "Defina owner, validade, revisão e rollback.",
        "expectedOutput": "Política sustentável.",
        "evidence": "Processo de exceção.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Checklist lifecycle."
      },
      {
        "number": 10,
        "title": "Entrega final",
        "instruction": "Consolide artefatos e rubrica.",
        "expectedOutput": "Projeto avaliável.",
        "evidence": "Pacote final.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Diagrama, matriz, regras, NAT, WAF, logs, testes, riscos, rollback."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "Matriz completa",
        "expected": "Todos os fluxos críticos têm controle/log.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Rubrica"
      },
      {
        "check": "Deny-by-default",
        "expected": "Bloqueios críticos explícitos ou padrão negado.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Testes positivos/negativos",
        "expected": "Há validação de permitir e negar.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Rubrica"
      },
      {
        "check": "Governança",
        "expected": "Owner, validade e rollback definidos.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Rubrica"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Libera demais",
        "probableCause": "Matriz incompleta ou regra ampla.",
        "howToConfirm": "Buscar any-any/0.0.0.0/0 e owner ausente.",
        "fix": "Restringir origem/destino/porta."
      },
      {
        "symptom": "Não opera",
        "probableCause": "Sem logs/testes/rollback.",
        "howToConfirm": "Rubrica.",
        "fix": "Adicionar observabilidade/change plan."
      },
      {
        "symptom": "Camada 7 ignorada",
        "probableCause": "WAF/API ausentes.",
        "howToConfirm": "Sem headers/request ID/logs HTTP.",
        "fix": "Adicionar controles HTTP."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Diagrama",
      "Matriz",
      "Regras exemplares",
      "NAT/publicação",
      "WAF/headers",
      "Plano de logs",
      "Testes",
      "Governança"
    ],
    "questions": [
      "Como provar menor privilégio?",
      "Onde stateful ajuda?"
    ],
    "challenge": "Defenda o projeto em banca de segurança.",
    "solution": "Defesa precisa mostrar necessidade, regra mínima, logs, teste, risco residual e rollback por fluxo."
  },
  "mentorQuestions": [
    "Qual fluxo deste desenho representa maior risco se for configurado de forma ampla?",
    "Qual controle impediria acesso direto ao backend mesmo que alguém descubra seu IP?",
    "Como você provaria para auditoria que uma regra temporária foi removida?",
    "Quais logs seriam necessários para investigar um 403 no WAF e um 504 no load balancer?",
    "O que muda na política se o ambiente estiver em cloud híbrida com data center legado?",
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
      "question": "Qual é a melhor definição de política de tráfego segura?",
      "options": [
        "Lista de portas abertas",
        "Conjunto de decisões sobre fluxos permitidos, negados, inspecionados, registrados e governados",
        "Configuração de NAT",
        "Tabela de rotas"
      ],
      "answer": 1,
      "explanation": "Política segura combina fluxos, controles, logs, dono, validade, evidência e governança."
    },
    {
      "question": "Qual fluxo deve ser negado em uma API segura?",
      "options": [
        "Cliente para WAF em HTTPS",
        "WAF para load balancer",
        "API para banco na porta necessária",
        "Internet diretamente para banco"
      ],
      "answer": 3,
      "explanation": "Banco deve permanecer privado e receber apenas origens autorizadas."
    },
    {
      "question": "Por que testar bloqueios é tão importante quanto testar permissões?",
      "options": [
        "Porque melhora DNS",
        "Porque prova que acessos indevidos realmente são negados",
        "Porque substitui logs",
        "Porque evita TLS"
      ],
      "answer": 1,
      "explanation": "Sem teste negativo, a política pode permitir caminhos indevidos sem que a equipe perceba."
    },
    {
      "question": "Qual é o risco de backend público além do WAF?",
      "options": [
        "Melhora performance",
        "Bypass de inspeção, rate limit e controles L7",
        "Aumenta criptografia",
        "Remove necessidade de DNS"
      ],
      "answer": 1,
      "explanation": "Se o atacante acessa o backend diretamente, os controles do WAF/API Gateway deixam de proteger o fluxo."
    },
    {
      "question": "Qual informação NÃO pode faltar em uma exceção temporária?",
      "options": [
        "Dono, justificativa e validade",
        "Cor do dashboard",
        "Nome do navegador",
        "Quantidade de usuários do Slack"
      ],
      "answer": 0,
      "explanation": "Sem dono, justificativa e validade, uma exceção temporária tende a virar risco permanente."
    },
    {
      "question": "Qual controle é mais adequado para inspecionar path, headers, cookies e payload HTTP?",
      "options": [
        "NACL",
        "Route table",
        "WAF",
        "ARP"
      ],
      "answer": 2,
      "explanation": "WAF atua na camada HTTP e consegue aplicar regras L7."
    },
    {
      "question": "O que representa egress irrestrito?",
      "options": [
        "Entrada bloqueada",
        "Servidores podendo sair para qualquer destino sem controle",
        "TLS expirado",
        "ACL sem comentário"
      ],
      "answer": 1,
      "explanation": "Egress irrestrito amplia risco de exfiltração e comunicação com infraestrutura maliciosa."
    },
    {
      "question": "Qual evidência ajuda a correlacionar WAF, API Gateway e backend?",
      "options": [
        "X-Request-ID ou trace/correlation ID",
        "Somente TTL",
        "Somente ARP",
        "MTU"
      ],
      "answer": 0,
      "explanation": "IDs de correlação permitem seguir a requisição entre camadas."
    }
  ],
  "flashcards": [
    {
      "front": "Política de tráfego segura",
      "back": "Conjunto de decisões sobre fluxos permitidos, negados, inspecionados, registrados e governados."
    },
    {
      "front": "Teste positivo",
      "back": "Comprova que um fluxo autorizado funciona."
    },
    {
      "front": "Teste negativo",
      "back": "Comprova que um fluxo indevido é bloqueado."
    },
    {
      "front": "Bypass de WAF",
      "back": "Acesso ao backend por caminho que não passa pelo WAF ou API Gateway."
    },
    {
      "front": "Egress control",
      "back": "Controle de saída para internet ou redes externas."
    },
    {
      "front": "Regra governada",
      "back": "Regra com dono, justificativa, validade, log, evidência, aprovação e revisão."
    },
    {
      "front": "Deny-by-default",
      "back": "Tudo é negado por padrão e apenas fluxos necessários são permitidos."
    },
    {
      "front": "Ponto de controle",
      "back": "Lugar onde a decisão de permitir, negar, inspecionar ou registrar o tráfego acontece."
    }
  ],
  "exercises": [
    {
      "title": "Matriz mínima",
      "prompt": "Crie uma matriz de fluxos para uma aplicação com frontend, API, banco, Bastion, SIEM e NAT/proxy.",
      "expectedAnswer": "A matriz deve conter origem, destino, protocolo, porta, ação, controle, dono, justificativa, validade e log."
    },
    {
      "title": "Identificar bypass",
      "prompt": "Explique por que um backend com IP público, mesmo atrás de WAF, é um problema.",
      "expectedAnswer": "Porque atacantes podem acessar o backend diretamente e contornar WAF, rate limit, autenticação de borda e logs centralizados."
    },
    {
      "title": "Teste negativo",
      "prompt": "Liste três testes negativos para uma API publicada com WAF.",
      "expectedAnswer": "Internet→banco bloqueado, internet→backend direto bloqueado, SSH/RDP público bloqueado, usuário→banco bloqueado."
    },
    {
      "title": "Governança",
      "prompt": "Quais campos uma solicitação de regra deve ter para ser auditável?",
      "expectedAnswer": "Origem, destino, protocolo, porta, ação, dono, justificativa, validade, ambiente, ticket, log, evidência e rollback."
    },
    {
      "title": "Troubleshooting",
      "prompt": "Um cliente recebe 504 ao acessar API. Quais camadas você verificaria?",
      "expectedAnswer": "DNS, rota, TCP/TLS, WAF, LB, health check, backend, timeout, logs e traces."
    },
    {
      "title": "Cloud",
      "prompt": "Diferencie security group e NACL/NSG no desenho de política.",
      "expectedAnswer": "Security group costuma ser stateful e associado a workload/recurso; NACL/alguns controles de subnet podem ser stateless e exigir regras de ida e volta."
    },
    {
      "id": "ex-9.10-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Desafio final: política de tráfego para API de pagamentos",
    "scenario": "Uma empresa vai publicar uma API de pagamentos. A API será acessada por clientes externos via HTTPS. Ela usa um backend privado, banco de dados, fila de mensagens, serviço de antifraude externo, logs no SIEM e administração por equipe interna. O time de produto pede publicação rápida. O time de segurança exige WAF, logs, backend privado, controle de saída, proteção de administração e revisão de exceções.",
    "tasks": [
      "Desenhar zonas de segurança.",
      "Criar matriz de fluxos permitidos.",
      "Definir controles por camada.",
      "Apontar fluxos que devem ser negados explicitamente.",
      "Definir logs e evidências.",
      "Criar testes positivos e negativos.",
      "Criar regras de governança e policy as code.",
      "Preparar plano de rollback e revisão."
    ],
    "constraints": [
      "Banco não pode ter IP público.",
      "Backend não pode ser acessado diretamente da internet.",
      "SSH/RDP público é proibido.",
      "Exceções temporárias expiram em até 7 dias.",
      "Toda publicação pública precisa de WAF e logs.",
      "Saída para internet deve ser restrita aos destinos aprovados."
    ]
  },
  "commentedSolution": {
    "summary": "A solução segura publica a API somente via WAF/API Gateway/Load Balancer, mantém backend e banco privados, restringe administração via Bastion/VPN/JIT, controla saída por NAT/proxy, envia logs ao SIEM e governa regras por validade, dono e policy as code.",
    "steps": [
      {
        "step": 1,
        "decision": "Zonas",
        "comment": "Separar internet, borda, aplicação, dados, administração, saída e observabilidade evita rede plana e reduz movimento lateral."
      },
      {
        "step": 2,
        "decision": "Entrada pública",
        "comment": "Permitir internet apenas para WAF/API Gateway em HTTPS. O backend não deve aceitar tráfego público direto."
      },
      {
        "step": 3,
        "decision": "Backend",
        "comment": "Permitir WAF/LB para API em porta específica. Negar qualquer origem pública direta."
      },
      {
        "step": 4,
        "decision": "Banco",
        "comment": "Permitir somente API para banco na porta necessária. Bloquear usuários, internet, DMZ ampla e administração direta não controlada."
      },
      {
        "step": 5,
        "decision": "Administração",
        "comment": "Exigir VPN/Bastion/JIT/MFA e logs. SSH/RDP público deve ser bloqueado por policy as code."
      },
      {
        "step": 6,
        "decision": "Saída",
        "comment": "Permitir API para antifraude externo por destino aprovado e registrar logs. Negar egress genérico."
      },
      {
        "step": 7,
        "decision": "Logs",
        "comment": "Coletar logs de WAF, API Gateway, LB, firewall, flow logs, backend e aplicação com correlation ID."
      },
      {
        "step": 8,
        "decision": "Testes",
        "comment": "Testar caminho permitido e bloqueios críticos. Evidências devem ser anexadas ao ticket ou repositório."
      },
      {
        "step": 9,
        "decision": "Governança",
        "comment": "Toda regra precisa de owner, justificativa, validade, revisão e rollback. Exceções devem expirar automaticamente."
      },
      {
        "step": 10,
        "decision": "Policy as code",
        "comment": "Bloquear padrões como banco público, SSH/RDP 0.0.0.0/0, recurso público sem WAF e regra sem dono."
      }
    ],
    "exampleMatrix": [
      {
        "source": "Internet",
        "destination": "WAF/API Gateway",
        "protocol": "TCP/443",
        "action": "permit+inspect+log",
        "reason": "Entrada oficial da API pública"
      },
      {
        "source": "WAF/API Gateway",
        "destination": "Load Balancer/API",
        "protocol": "TCP/8443",
        "action": "permit+log",
        "reason": "Encaminhamento para backend privado"
      },
      {
        "source": "API",
        "destination": "Banco",
        "protocol": "TCP/5432",
        "action": "permit+log",
        "reason": "Consulta transacional necessária"
      },
      {
        "source": "Internet",
        "destination": "API backend",
        "protocol": "any",
        "action": "deny+log",
        "reason": "Evitar bypass de WAF"
      },
      {
        "source": "Internet",
        "destination": "Banco",
        "protocol": "any",
        "action": "deny+log",
        "reason": "Banco privado"
      },
      {
        "source": "Admin",
        "destination": "Bastion",
        "protocol": "TCP/443",
        "action": "permit+MFA+log",
        "reason": "Administração controlada"
      },
      {
        "source": "API",
        "destination": "Serviço antifraude aprovado",
        "protocol": "TCP/443",
        "action": "permit+log",
        "reason": "Integração externa controlada"
      }
    ],
    "finalAdvice": "Uma política segura não tenta prever todos os ataques; ela reduz caminhos, força pontos de controle, gera evidência e limita o impacto quando algo falha. O objetivo é tornar o ambiente compreensível, operável e defensável."
  },
  "glossary": [
    {
      "term": "Política de tráfego",
      "definition": "Conjunto de regras e decisões que controlam comunicação entre zonas, sistemas e serviços."
    },
    {
      "term": "Matriz de comunicação",
      "definition": "Tabela que descreve origem, destino, protocolo, porta, ação, justificativa e dono de cada fluxo."
    },
    {
      "term": "Teste positivo",
      "definition": "Validação de que um fluxo autorizado funciona."
    },
    {
      "term": "Teste negativo",
      "definition": "Validação de que um fluxo indevido é bloqueado."
    },
    {
      "term": "Bypass",
      "definition": "Caminho alternativo que contorna um controle de segurança."
    },
    {
      "term": "Egress",
      "definition": "Tráfego de saída de uma rede, subnet, workload ou ambiente."
    },
    {
      "term": "Ponto de controle",
      "definition": "Local onde uma decisão de segurança é aplicada ao tráfego."
    },
    {
      "term": "Deny-by-default",
      "definition": "Modelo em que tudo é bloqueado por padrão e apenas exceções justificadas são permitidas."
    },
    {
      "term": "Rollback",
      "definition": "Plano para desfazer uma mudança de forma controlada."
    },
    {
      "term": "Guardrail",
      "definition": "Controle preventivo que bloqueia configurações perigosas antes da implantação."
    }
  ],
  "references": [
    {
      "title": "Redes e Network — Módulo 9",
      "type": "internal",
      "note": "As aulas 10.1 a 10.9 formam a base técnica para esta revisão prática."
    },
    {
      "title": "Redes e Network — Módulo 9",
      "type": "internal",
      "note": "HTTPS, WAF, API Gateway, proxies, troubleshooting HTTP e segurança de APIs são essenciais para publicar serviços com segurança."
    },
    {
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "type": "internal",
      "note": "Revisar IaC, CI/CD, policy as code, observabilidade e automação."
    },
    {
      "title": "Enterprise Identity, IAM, Segurança e Acessos",
      "type": "internal",
      "note": "Controles de rede devem ser combinados com identidade, autorização, MFA, JIT e governança de acessos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e pipelines",
      "reason": "A política segura deve ser versionada, testada e aplicada por automação."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Acesso administrativo e governança",
      "reason": "Fluxos administrativos dependem de identidade, MFA, JIT e revisão de privilégios."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 9",
      "reason": "WAF, APIs, HTTPS, cookies, tokens e troubleshooting HTTP aparecem diretamente na política de publicação."
    }
  ],
  "progressRules": {
    "requiresQuiz": true,
    "requiresLab": true,
    "requiresChallenge": true,
    "minimumQuizScore": 75,
    "unlockNextLesson": "m11",
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "10.1"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
