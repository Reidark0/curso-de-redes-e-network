export const lesson0904 = {
  "id": "9.4",
  "moduleId": "m09",
  "order": 4,
  "title": "Zonas, DMZ e segmentação segura",
  "subtitle": "Aprenda a organizar redes por níveis de confiança, exposição e função de negócio, criando políticas entre zonas, DMZ, redes internas, cloud e ambientes de administração.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 280,
  "tags": [
    "redes",
    "network",
    "firewall",
    "zonas",
    "DMZ",
    "segmentação",
    "microsegmentação",
    "zero trust",
    "cloud",
    "segurança",
    "arquitetura",
    "troubleshooting",
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
      "reason": "Zonas existem para transformar conectividade em política explícita de confiança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.2",
      "title": "ACLs, regras e ordem de processamento",
      "reason": "Toda comunicação entre zonas precisa ser expressa como regra clara e auditável."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.3",
      "title": "Firewalls stateless vs stateful",
      "reason": "Segmentação depende de entender ida, retorno, estado, logs e caminho simétrico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "title": "IPv4 público, privado, loopback e APIPA",
      "reason": "DMZ, redes internas e cloud dependem de endereçamento público, privado e especial coerente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "Separar zonas só funciona se o caminho de rede for conhecido e controlado."
    }
  ],
  "objectives": [
    "Explicar o que são zonas de segurança e por que elas existem.",
    "Diferenciar rede interna, DMZ, rede de administração, rede de usuários, rede de servidores, rede de parceiros e zona pública.",
    "Desenhar políticas entre zonas usando matriz de comunicação, princípio do menor privilégio e deny-by-default.",
    "Relacionar segmentação com redução de superfície de ataque e limitação de movimento lateral.",
    "Aplicar o conceito em datacenter, cloud, Kubernetes, APIs, DevSecOps e Segurança da Informação.",
    "Diagnosticar falhas causadas por segmentação incompleta, rotas assimétricas, regras duplicadas, DNS incorreto e backend exposto."
  ],
  "learningOutcomes": [
    "Criar um mapa de zonas coerente com função, exposição e sensibilidade.",
    "Construir uma matriz de fluxos entre zonas com origem, destino, protocolo, porta, dono, justificativa e validade.",
    "Explicar por que DMZ não é sinônimo de rede insegura, e sim uma zona controlada de exposição.",
    "Identificar riscos de rede plana, administração misturada com usuários e banco exposto diretamente à DMZ.",
    "Traduzir segmentação tradicional para VPC/VNet, subnets, security groups, NACLs, NSGs, firewalls cloud e Kubernetes NetworkPolicies.",
    "Usar logs e testes controlados para validar se a segmentação realmente está funcionando."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Imagine uma empresa onde notebooks de usuários, servidores de banco, sistemas financeiros, ambiente de desenvolvimento, câmeras, impressoras, VPN, administração de servidores e aplicações públicas vivem todos na mesma rede. Se um notebook for comprometido, o atacante poderá tentar varrer tudo, alcançar bancos, painéis administrativos e serviços internos com pouca resistência.</p>\n  <p><strong>Zonas e segmentação</strong> existem para impedir que a rede seja um grande corredor único. Elas criam portas, paredes, recepções, áreas restritas e controles de passagem entre partes diferentes do ambiente.</p>\n  <div class='callout'><strong>Ideia central:</strong> firewall bom sem segmentação vira apenas uma porta bonita na entrada de um prédio sem paredes internas.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No começo de muitas redes corporativas, a preocupação principal era conectar máquinas. Depois, com Internet, e-mail, servidores web e acesso remoto, ficou claro que nem todo host deveria conversar livremente com todos os outros.</p>\n  <p>A primeira grande separação comum foi entre <strong>rede interna</strong> e <strong>Internet</strong>. Em seguida surgiu a <strong>DMZ</strong>, uma zona para serviços publicados, como web, e-mail, VPN e proxies, evitando que eles ficassem diretamente dentro da rede interna sensível.</p>\n  <p>Com virtualização, cloud, SaaS, Kubernetes, ransomware, ataques laterais e DevSecOps, a segmentação evoluiu: não basta separar Internet e LAN. Hoje é necessário pensar em zonas por função, criticidade, identidade, ambiente, exposição e fluxo de negócio.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema não é apenas um invasor entrar. O problema é o que ele consegue fazer depois que entra. Uma rede plana permite que um incidente pequeno vire incidente corporativo.</p>\n  <p>Sem zonas, um computador de usuário pode tentar acessar um banco de dados, um servidor de backup, uma interface de administração, uma aplicação de produção ou um host de outra área. Mesmo que autenticação exista, a rede fica ajudando o atacante a descobrir alvos.</p>\n  <div class='callout callout--problem'><strong>Problema de segurança:</strong> sem segmentação, a rede não participa da defesa. Ela apenas transporta tráfego, inclusive tráfego indevido.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <table class='comparison-table'>\n    <thead><tr><th>Modelo</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Rede plana</td><td>Todos ou quase todos se comunicam livremente</td><td>Simples de implantar</td><td>Alta exposição e movimento lateral fácil</td></tr>\n      <tr><td>Perímetro simples</td><td>Firewall entre LAN e Internet</td><td>Reduz entrada externa direta</td><td>Protege pouco contra comprometimento interno</td></tr>\n      <tr><td>DMZ</td><td>Serviços publicados ficam em zona intermediária</td><td>Evita colocar sistemas expostos dentro da LAN</td><td>Pode virar “depósito” inseguro se mal governada</td></tr>\n      <tr><td>Segmentação por zonas</td><td>Usuários, servidores, bancos, administração e parceiros em zonas distintas</td><td>Controle por função e criticidade</td><td>Exige matriz, inventário e operação madura</td></tr>\n      <tr><td>Microsegmentação</td><td>Controle granular por workload, identidade e serviço</td><td>Reduz movimento lateral com precisão</td><td>Complexidade, telemetria e automação são essenciais</td></tr>\n      <tr><td>Zero Trust Network Access</td><td>Acesso avaliado por identidade, contexto e política</td><td>Menos dependência de rede confiável ampla</td><td>Não elimina a necessidade de segmentação de rede</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Zona de segurança</strong> é um agrupamento de ativos com nível semelhante de confiança, exposição, função ou criticidade. Uma zona pode representar usuários, servidores internos, bancos de dados, DMZ, administração, backup, parceiros, cloud, laboratório ou Internet.</p>\n  <p><strong>Segmentação</strong> é a separação lógica ou física dessas zonas, controlando quais fluxos podem passar de uma para outra. O objetivo não é bloquear tudo sem critério, mas permitir apenas o que o negócio precisa, com justificativa, dono, logging e revisão.</p>\n  <div class='definition-box'>DMZ é uma zona intermediária para serviços expostos ou semiexpostos. Ela não é “terra sem lei”; é uma área de contenção com regras mais restritas e observáveis.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <ol class='flow-list'>\n    <li>Primeiro, a organização identifica ativos: usuários, aplicações, bancos, serviços administrativos, integrações, parceiros e Internet.</li>\n    <li>Depois, classifica ativos por função, criticidade, exposição, ambiente e necessidade de comunicação.</li>\n    <li>Em seguida, cria zonas: por exemplo <code>usuarios</code>, <code>dmz</code>, <code>apps-prod</code>, <code>db-prod</code>, <code>admin</code>, <code>backup</code>, <code>dev</code> e <code>internet</code>.</li>\n    <li>Para cada par de zonas, define fluxos necessários: origem, destino, protocolo, porta, direção, dono, justificativa, logs e validade.</li>\n    <li>As regras são implementadas em firewalls, ACLs, security groups, NACLs, NSGs, WAFs, NetworkPolicies, service mesh ou controles equivalentes.</li>\n    <li>Logs, contadores e testes validam se o desenho corresponde ao tráfego real.</li>\n    <li>Revisões removem exceções, regras temporárias vencidas, objetos órfãos e fluxos que deixaram de existir.</li>\n  </ol>\n  <p>Segmentação bem feita exige roteamento coerente. Se as zonas estão separadas por VLANs, subnets ou VPCs, o caminho entre elas precisa passar pelo ponto de controle correto. Se há rota alternativa, o tráfego pode contornar o firewall.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura segmentada comum possui Internet, borda, DMZ, rede interna, servidores de aplicação, banco de dados, administração, backup, monitoramento e cloud. Cada zona possui regras próprias e não deve herdar confiança automaticamente de outra.</p>\n  <table class='data-table'>\n    <thead><tr><th>Zona</th><th>Função</th><th>Permissões típicas</th><th>Risco se mal desenhada</th></tr></thead>\n    <tbody>\n      <tr><td>Internet</td><td>Origem externa não confiável</td><td>Apenas serviços publicados</td><td>Exposição direta de sistemas internos</td></tr>\n      <tr><td>DMZ</td><td>Publicação controlada de serviços</td><td>Entrada limitada e saída mínima para backends</td><td>Virar ponte livre para a rede interna</td></tr>\n      <tr><td>Usuários</td><td>Estações, notebooks e dispositivos corporativos</td><td>Acesso a aplicações, DNS, proxy, autenticação</td><td>Movimento lateral e acesso indevido a servidores</td></tr>\n      <tr><td>Aplicações</td><td>Backends e serviços internos</td><td>Receber de frontends e chamar dependências autorizadas</td><td>Comunicação lateral excessiva</td></tr>\n      <tr><td>Bancos de dados</td><td>Dados sensíveis e persistência</td><td>Somente apps autorizadas em portas específicas</td><td>Exposição direta a usuários, DMZ ou Internet</td></tr>\n      <tr><td>Administração</td><td>Bastions, jump servers, ferramentas administrativas</td><td>Acesso privilegiado controlado e auditado</td><td>Administração exposta para rede comum</td></tr>\n      <tr><td>Backup</td><td>Repositórios e agentes de backup</td><td>Fluxos estritamente necessários</td><td>Ransomware alcançar e apagar backups</td></tr>\n      <tr><td>Cloud</td><td>VPC/VNet, workloads e serviços gerenciados</td><td>Integração controlada com on-prem e Internet</td><td>Peering amplo e security groups permissivos</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em um hospital. A recepção é pública, consultórios têm acesso controlado, centro cirúrgico é altamente restrito, farmácia guarda itens sensíveis, almoxarifado tem regras próprias e a sala de servidores não deve ser acessada por pacientes.</p>\n  <p>Uma DMZ é como uma recepção técnica: ela permite contato com o mundo externo, mas não deveria abrir portas diretas para áreas críticas. Segmentação é o conjunto de paredes, portas, crachás, câmeras e procedimentos que impede que alguém, ao entrar na recepção, circule livremente pelo hospital inteiro.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Em uma pequena rede, você pode separar dispositivos de usuários, servidores, convidados e administração em VLANs diferentes. Usuários acessam a aplicação em HTTPS. A aplicação acessa o banco em TCP/5432. Convidados acessam somente Internet. Administração acessa servidores via SSH ou RDP, mas apenas a partir de um host autorizado.</p>\n  <p>Esse desenho já reduz bastante o risco: um celular convidado não chega ao banco, um notebook de usuário não administra servidores e a aplicação não recebe tráfego direto de qualquer origem.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, o portal público fica atrás de CDN/WAF e reverse proxy na DMZ. O reverse proxy fala com servidores de aplicação em uma zona interna. Os servidores de aplicação acessam bancos em outra zona. Administração ocorre apenas por bastion com MFA, gravação de sessão e logs enviados ao SIEM.</p>\n  <p>Se o portal público for explorado, o atacante ainda precisa atravessar regras entre DMZ, aplicação, banco e administração. A segmentação não torna invasão impossível, mas compra tempo, limita impacto e gera evidências.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, zonas aparecem como VPC/VNet, subnets públicas e privadas, route tables, security groups, NACLs/NSGs, cloud firewalls, load balancers, private endpoints e peering.</p>\n  <p>Uma arquitetura segura evita banco em subnet pública, evita security group <code>0.0.0.0/0</code> para administração, usa load balancer público apenas na borda, mantém backends privados, restringe egress e registra flow logs.</p>\n  <p>Em ambientes híbridos, o cuidado aumenta: VPN, Direct Connect/ExpressRoute, peering e rotas podem criar caminhos que contornam firewalls centrais. Segmentar cloud exige revisar rotas, identidades, DNS privado e políticas por workload.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, segmentação deve virar artefato versionado. Terraform, Ansible, Helm, Kustomize, manifests Kubernetes e pipelines podem declarar security groups, NSGs, NetworkPolicies, regras de firewall, ingress/egress e exceções temporárias.</p>\n  <p>O pipeline pode validar se uma mudança abre administração para Internet, se um banco ficou público, se uma regra <code>any-any</code> foi criada ou se uma exceção não tem data de validade. Isso transforma segmentação em governança contínua, não em desenho feito uma vez e esquecido.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Durante um incidente de ransomware, a segmentação pode determinar a diferença entre um notebook comprometido e um domínio inteiro parado. Se estações não alcançam administração, backups, bancos e hipervisores diretamente, o atacante precisa vencer mais controles.</p>\n  <p>Para blue team, zonas ajudam a criar alertas: usuário tentando falar com banco, DMZ tentando acessar administração, servidor de aplicação tentando sair para IP desconhecido, ou backup recebendo conexão fora da janela prevista.</p>\n  <div class='callout callout--security'><strong>Visão defensiva:</strong> segmentação boa não é apenas bloquear. É criar limites observáveis, testáveis e justificáveis.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <p>O diagrama mostra uma arquitetura segmentada com Internet, WAF, DMZ, aplicações, banco, administração, backup e SIEM. Observe que cada zona tem fluxos específicos, e não conectividade livre.</p>\n  <svg class='lesson-svg' viewBox='0 0 1180 720' role='img' aria-labelledby='m09l04-title m09l04-desc'>\n    <title id='m09l04-title'>Zonas, DMZ e segmentação segura</title>\n    <desc id='m09l04-desc'>Fluxos controlados entre Internet, WAF, DMZ, aplicações, banco, administração, backup e SIEM.</desc>\n    <defs>\n      <marker id='m09l04-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-arrow'></path>\n      </marker>\n    </defs>\n    <rect x='30' y='30' width='1120' height='660' rx='24' class='svg-zone'></rect>\n    <text x='590' y='70' text-anchor='middle' class='svg-label'>Arquitetura segmentada por zonas</text>\n\n    <rect x='70' y='115' width='165' height='95' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='152' y='150' text-anchor='middle' class='svg-label'>Internet</text>\n    <text x='152' y='178' text-anchor='middle' class='svg-label svg-label--small'>origem não confiável</text>\n\n    <rect x='300' y='95' width='190' height='135' rx='18' class='svg-node svg-node--firewall'></rect>\n    <text x='395' y='132' text-anchor='middle' class='svg-label'>Borda</text>\n    <text x='395' y='162' text-anchor='middle' class='svg-label svg-label--small'>Firewall + WAF</text>\n    <text x='395' y='190' text-anchor='middle' class='svg-label svg-label--small'>TLS, logs, regras</text>\n\n    <rect x='560' y='95' width='210' height='135' rx='18' class='svg-node svg-node--server'></rect>\n    <text x='665' y='132' text-anchor='middle' class='svg-label'>DMZ</text>\n    <text x='665' y='162' text-anchor='middle' class='svg-label svg-label--small'>reverse proxy</text>\n    <text x='665' y='190' text-anchor='middle' class='svg-label svg-label--small'>serviços publicados</text>\n\n    <rect x='845' y='95' width='215' height='135' rx='18' class='svg-node svg-node--server'></rect>\n    <text x='952' y='132' text-anchor='middle' class='svg-label'>Aplicações</text>\n    <text x='952' y='162' text-anchor='middle' class='svg-label svg-label--small'>backends privados</text>\n    <text x='952' y='190' text-anchor='middle' class='svg-label svg-label--small'>APIs internas</text>\n\n    <rect x='845' y='305' width='215' height='120' rx='18' class='svg-node svg-node--database'></rect>\n    <text x='952' y='345' text-anchor='middle' class='svg-label'>Banco de dados</text>\n    <text x='952' y='374' text-anchor='middle' class='svg-label svg-label--small'>somente apps autorizadas</text>\n\n    <rect x='560' y='305' width='210' height='120' rx='18' class='svg-node svg-node--security'></rect>\n    <text x='665' y='345' text-anchor='middle' class='svg-label'>Administração</text>\n    <text x='665' y='374' text-anchor='middle' class='svg-label svg-label--small'>bastion + MFA</text>\n\n    <rect x='300' y='305' width='190' height='120' rx='18' class='svg-node svg-node--client'></rect>\n    <text x='395' y='345' text-anchor='middle' class='svg-label'>Usuários</text>\n    <text x='395' y='374' text-anchor='middle' class='svg-label svg-label--small'>estações e notebooks</text>\n\n    <rect x='70' y='305' width='165' height='120' rx='18' class='svg-node svg-node--attacker'></rect>\n    <text x='152' y='345' text-anchor='middle' class='svg-label'>Convidados/IoT</text>\n    <text x='152' y='374' text-anchor='middle' class='svg-label svg-label--small'>Internet apenas</text>\n\n    <rect x='560' y='515' width='210' height='100' rx='18' class='svg-node svg-node--security'></rect>\n    <text x='665' y='555' text-anchor='middle' class='svg-label'>SIEM/APM</text>\n    <text x='665' y='584' text-anchor='middle' class='svg-label svg-label--small'>logs e traces</text>\n\n    <rect x='845' y='515' width='215' height='100' rx='18' class='svg-node svg-node--server'></rect>\n    <text x='952' y='555' text-anchor='middle' class='svg-label'>Backup</text>\n    <text x='952' y='584' text-anchor='middle' class='svg-label svg-label--small'>zona protegida</text>\n\n    <line x1='235' y1='162' x2='300' y2='162' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l04-arrow)'></line>\n    <line x1='490' y1='162' x2='560' y2='162' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l04-arrow)'></line>\n    <line x1='770' y1='162' x2='845' y2='162' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l04-arrow)'></line>\n    <line x1='952' y1='230' x2='952' y2='305' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l04-arrow)'></line>\n    <line x1='665' y1='425' x2='665' y2='515' class='svg-flow svg-flow--response' marker-end='url(#m09l04-arrow)'></line>\n    <line x1='952' y1='425' x2='952' y2='515' class='svg-flow svg-flow--response' marker-end='url(#m09l04-arrow)'></line>\n    <line x1='395' y1='305' x2='560' y2='230' class='svg-flow svg-flow--request' marker-end='url(#m09l04-arrow)'></line>\n    <line x1='235' y1='365' x2='300' y2='365' class='svg-flow svg-flow--blocked' marker-end='url(#m09l04-arrow)'></line>\n    <text x='250' y='455' text-anchor='middle' class='svg-label svg-label--small'>convidados não alcançam servidores</text>\n    <text x='885' y='470' text-anchor='middle' class='svg-label svg-label--small'>apps acessam bancos; usuários não</text>\n    <text x='590' y='660' text-anchor='middle' class='svg-label'>Cada seta representa um fluxo justificado, monitorado e revisado.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você desenhará uma segmentação defensiva para um ambiente com usuários, DMZ, aplicações, bancos, administração, backup e cloud. O foco é criar matriz de comunicação, identificar riscos e validar se os fluxos realmente passam pelo ponto de controle correto.</p>\n</section>\n\n<div class=\"content-card\" data-enhancement=\"p1-07-9.4\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam classificação de zonas, desenho de fluxos, identificação de bypass, separação de administração, proteção de banco e redução de movimento lateral.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá uma rede parcialmente segmentada, mas com exceções perigosas. Seu trabalho será redesenhar as zonas e justificar quais fluxos devem existir, quais devem ser bloqueados e quais precisam de logging.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostrará uma matriz segura, apontará os erros de desenho e explicará como validar segmentação com testes de conectividade, logs e revisão de rotas.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Zonas agrupam ativos por confiança, função, exposição e criticidade. DMZ é uma zona controlada para serviços expostos, não uma área livre. Segmentação reduz movimento lateral, limita impacto e transforma rede em controle defensivo.</p>\n  <p>A regra madura é simples de dizer e difícil de manter: cada fluxo entre zonas deve ter dono, justificativa, protocolo, porta, validade, logging e revisão.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará NAT, port forwarding e publicação controlada, entendendo como serviços internos são expostos de forma limitada e como evitar publicação acidental ou bypass de controles.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7",
      "Segurança",
      "Arquitetura"
    ],
    "beforeThisLesson": "O aluno já entende firewalls, ACLs, estado de conexão, NAT, TCP/UDP, HTTP/HTTPS e troubleshooting básico.",
    "afterThisLesson": "O aluno conseguirá desenhar políticas por zonas, DMZ e segmentação defensiva para ambientes corporativos, cloud e DevSecOps.",
    "dependsOn": [
      "IPv4",
      "subnets",
      "roteamento",
      "VLANs",
      "ACLs",
      "stateful inspection",
      "HTTP/HTTPS",
      "logs",
      "inventário de ativos"
    ]
  },
  "protocolFields": [
    {
      "field": "Zona de origem",
      "meaning": "Grupo lógico de onde o fluxo parte.",
      "securityNote": "A origem deve ser específica; redes amplas enfraquecem a política."
    },
    {
      "field": "Zona de destino",
      "meaning": "Grupo lógico onde o serviço está localizado.",
      "securityNote": "Destino sensível deve ter regras mais restritivas e logging mais forte."
    },
    {
      "field": "Direção",
      "meaning": "Sentido de início do fluxo.",
      "securityNote": "Permitir resposta stateful não equivale a permitir início inverso."
    },
    {
      "field": "Serviço",
      "meaning": "Protocolo e porta necessários, como TCP/443, TCP/5432 ou UDP/53.",
      "securityNote": "Serviços genéricos ou any-any aumentam superfície de ataque."
    },
    {
      "field": "Dono do fluxo",
      "meaning": "Equipe responsável pela regra e pelo serviço.",
      "securityNote": "Sem dono, exceções ficam órfãs e raramente são removidas."
    },
    {
      "field": "Validade",
      "meaning": "Prazo de revisão ou expiração da regra.",
      "securityNote": "Exceções temporárias sem validade viram risco permanente."
    },
    {
      "field": "Logging",
      "meaning": "Registro de permit, deny, counters, bytes e eventos relevantes.",
      "securityNote": "Sem logs, segmentação não é verificável durante incidente."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Cliente tenta iniciar comunicação",
      "description": "Um host em uma zona, como DMZ ou Usuários, tenta acessar um serviço em outra zona.",
      "securityNote": "A primeira pergunta é se essa origem deveria iniciar esse fluxo."
    },
    {
      "step": 2,
      "name": "Roteamento leva ao ponto de controle",
      "description": "A rota deve enviar o tráfego ao firewall, gateway, security group ou controle responsável.",
      "securityNote": "Rotas alternativas podem criar bypass de segmentação."
    },
    {
      "step": 3,
      "name": "Política entre zonas é avaliada",
      "description": "A regra compara origem, destino, serviço, direção, estado e contexto permitido.",
      "securityNote": "A ordem e a especificidade da regra continuam importantes."
    },
    {
      "step": 4,
      "name": "Fluxo permitido ou negado",
      "description": "Se permitido, o tráfego segue ao destino; se negado, deve gerar contador ou log conforme criticidade.",
      "securityNote": "Drops silenciosos dificultam troubleshooting e resposta a incidente."
    },
    {
      "step": 5,
      "name": "Resposta retorna",
      "description": "Em controles stateful, a resposta é associada ao fluxo iniciado; em stateless, pode exigir regra explícita.",
      "securityNote": "Caminho assimétrico pode quebrar estado e gerar bloqueios intermitentes."
    },
    {
      "step": 6,
      "name": "Telemetria confirma o desenho",
      "description": "Logs, flow logs, SIEM e traces confirmam se os fluxos esperados ocorrem e se tentativas indevidas são bloqueadas.",
      "securityNote": "A segmentação só é confiável quando é testada e observada."
    }
  ],
  "deepDive": {
    "title": "Segmentação não é apenas VLAN",
    "content": "VLAN separa domínio de broadcast e pode ajudar no desenho, mas não é política de segurança por si só. Uma VLAN sem controle L3/L4/L7, sem regras, sem logs e com roteamento livre para outras VLANs cria apenas organização lógica, não defesa real. Segmentação segura exige ponto de controle, política explícita, telemetria e revisão. Em cloud, o equivalente também não é apenas criar subnets: route tables, security groups, NACLs, endpoints privados, firewalls e IAM precisam estar coerentes."
  },
  "commonMistakes": [
    "Chamar qualquer rede exposta de DMZ sem regras específicas.",
    "Colocar banco de dados diretamente acessível pela DMZ.",
    "Misturar rede de administração com rede de usuários comuns.",
    "Permitir any-any entre zonas internas por conveniência.",
    "Criar VLANs, mas rotear tudo livremente entre elas.",
    "Não documentar dono, justificativa e validade de cada fluxo.",
    "Esquecer egress filtering e focar apenas em tráfego de entrada.",
    "Manter backup acessível a partir de qualquer estação.",
    "Criar peering cloud amplo e tratar VPC/VNet inteira como confiável.",
    "Não testar segmentação após mudanças de rota, NAT, firewall ou load balancer."
  ],
  "troubleshooting": {
    "method": "Diagnostique segmentação comparando matriz de fluxos, rota real, política aplicada, estado de conexão, NAT, logs de permit/deny, counters, DNS e teste controlado de cada zona.",
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "nc -vz portal.dmz.local 443\nnc -vz banco.privado.local 5432\ncurl -vkI https://portal.dmz.local/health",
        "purpose": "Planejar validação",
        "expectedObservation": "Plano validável.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      }
    ],
    "symptoms": [
      {
        "symptom": "Aplicação na DMZ não acessa backend",
        "likelyCause": "Regra DMZ→Apps ausente, DNS errado, rota assimétrica ou security group do backend bloqueando."
      },
      {
        "symptom": "Usuário consegue acessar banco diretamente",
        "likelyCause": "Regra ampla entre zona de usuários e zona de dados, banco em subnet errada ou ACL permissiva."
      },
      {
        "symptom": "Convidados alcançam recursos internos",
        "likelyCause": "VLAN de convidados roteada para LAN sem política de bloqueio."
      },
      {
        "symptom": "Tudo funciona, mas não há logs",
        "likelyCause": "Política permite sem logging, tráfego passa por caminho diferente ou SIEM não recebe eventos."
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
      "Criar DMZ com acesso amplo à rede interna.",
      "Liberar any-any para resolver incidente de disponibilidade sem rollback planejado.",
      "Permitir administração a partir da rede de usuários inteira.",
      "Expor banco ou painel administrativo na Internet.",
      "Confiar apenas em VLAN sem firewall ou ACL entre redes.",
      "Deixar backups acessíveis para qualquer host.",
      "Usar peering cloud amplo sem controles adicionais.",
      "Não enviar logs de segmentação ao SIEM.",
      "Não validar tráfego leste-oeste."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral",
        "description": "Atacante usa um host comprometido para alcançar outros sistemas internos.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Segmentação por zonas, deny-by-default, EDR, logs e restrição de administração."
      },
      {
        "name": "Bypass de DMZ",
        "description": "Serviço exposto tem caminho direto para rede interna além do necessário.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Permitir apenas fluxos DMZ→Apps específicos, nunca DMZ→LAN ampla."
      },
      {
        "name": "Administração exposta",
        "description": "SSH, RDP, WinRM, painéis ou consoles acessíveis por redes não administrativas.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Bastion, VPN/ZTNA, MFA, allowlist, gravação de sessão e alertas."
      },
      {
        "name": "Backup alcançável por hosts comuns",
        "description": "Ransomware consegue apagar ou criptografar backups.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Zona de backup separada, imutabilidade, credenciais segregadas e acesso mínimo."
      }
    ],
    "mitigations": [
      "Matriz de fluxos aprovada pelo negócio e segurança.",
      "Políticas por zona em firewall central ou distribuído.",
      "Security groups e NACLs/NSGs com escopo mínimo.",
      "NetworkPolicies em Kubernetes para tráfego pod-a-pod.",
      "Private endpoints para serviços gerenciados.",
      "Flow logs, firewall logs e alertas de comunicação indevida.",
      "Policy as code para impedir regras amplas em pull requests.",
      "Revisão periódica de exceções e regras sem tráfego."
    ],
    "goodPractices": [
      "Adotar deny-by-default entre zonas.",
      "Criar matriz de comunicação antes de criar regras.",
      "Separar administração, usuários, servidores, bancos, DMZ, backup e convidados.",
      "Permitir apenas fluxos necessários, com dono e justificativa.",
      "Registrar tentativas negadas entre zonas críticas.",
      "Bloquear acesso direto de usuários e DMZ a bancos de dados, salvo exceções formalmente aprovadas.",
      "Restringir egress de servidores e workloads.",
      "Usar bastion, MFA e logs para administração.",
      "Testar segmentação após mudanças de rede e aplicação.",
      "Revisar regras temporárias e objetos órfãos periodicamente."
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
      "Matriz de fluxos aprovada pelo negócio e segurança.",
      "Políticas por zona em firewall central ou distribuído.",
      "Security groups e NACLs/NSGs com escopo mínimo.",
      "NetworkPolicies em Kubernetes para tráfego pod-a-pod.",
      "Private endpoints para serviços gerenciados.",
      "Flow logs, firewall logs e alertas de comunicação indevida.",
      "Policy as code para impedir regras amplas em pull requests.",
      "Revisão periódica de exceções e regras sem tráfego."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.4",
    "title": "Zonas, DMZ e segmentação com matriz de confiança",
    "labType": "architecture",
    "objective": "Desenhar zonas e fluxos entre Internet, DMZ, app, banco, gestão e observabilidade.",
    "scenario": "Portal publicado na DMZ com backend interno e banco privado.",
    "topology": "Internet -> WAF/firewall -> DMZ -> app -> banco -> gestão -> SIEM.",
    "architecture": "Zonas por confiança com deny-by-default, logs e testes negativos.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "Editor de diagrama",
      "Planilha/Markdown",
      "curl/nc",
      "logs sintéticos"
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
        "title": "Definir zonas",
        "instruction": "Liste zonas, ativos, exposição e criticidade.",
        "expectedOutput": "Separação clara.",
        "evidence": "Inventário de zonas.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Tabela zona | ativos | exposição | criticidade."
      },
      {
        "number": 2,
        "title": "Criar matriz de fluxos",
        "instruction": "Mapeie fluxos mínimos entre zonas.",
        "expectedOutput": "Deny-by-default.",
        "evidence": "Matriz sem banco/gestão expostos.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Matriz origem | destino | porta | direção | justificativa | log."
      },
      {
        "number": 3,
        "title": "Listar fluxos proibidos",
        "instruction": "Defina movimento lateral que deve alertar.",
        "expectedOutput": "Bloqueios críticos.",
        "evidence": "Tabela de bloqueios.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "Marcar Internet->Banco, DMZ->Gestão, Usuários->Banco como bloqueios."
      },
      {
        "number": 4,
        "title": "Planejar validação",
        "instruction": "Defina testes positivos/negativos.",
        "expectedOutput": "Plano validável.",
        "evidence": "Comandos e resultados esperados.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "nc -vz portal.dmz.local 443\nnc -vz banco.privado.local 5432\ncurl -vkI https://portal.dmz.local/health"
      },
      {
        "number": 5,
        "title": "Planejar logging",
        "instruction": "Defina logs por fronteira.",
        "expectedOutput": "Observabilidade por zona.",
        "evidence": "Plano de logs.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Mapa fronteira | log | campos | alerta."
      },
      {
        "number": 6,
        "title": "Threat review defensivo",
        "instruction": "Avalie impacto se DMZ for comprometida.",
        "expectedOutput": "Mitigações claras.",
        "evidence": "Mini threat model.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "Que fluxos ainda protegem banco e gestão?"
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "Banco isolado",
        "expected": "Sem fluxo Internet -> banco.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão da matriz"
      },
      {
        "check": "Gestão isolada",
        "expected": "Administração só por gestão/bastion.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Testes negativos",
        "expected": "Bloqueios críticos têm validação.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "DMZ acessa banco demais",
        "probableCause": "Regra ampla app/db.",
        "howToConfirm": "Matriz e logs por porta.",
        "fix": "Permitir só porta/origem necessária."
      },
      {
        "symptom": "Gestão em rede comum",
        "probableCause": "Sem zona de gestão.",
        "howToConfirm": "Fluxos SSH/RDP.",
        "fix": "Mover para bastion/ZTNA."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Diagrama de zonas",
      "Matriz de fluxos",
      "Tabela de bloqueios",
      "Plano de logs",
      "Threat review"
    ],
    "questions": [
      "Por que banco não deve estar na DMZ?",
      "Que teste prova isolamento?"
    ],
    "challenge": "Redesenhe rede plana em zonas.",
    "solution": "Separe Internet, DMZ, app, dados e gestão; permita fluxos mínimos e valide bloqueios."
  },
  "mentorQuestions": [
    "Qual é a diferença entre separar redes por organização e separar redes por segurança?",
    "Por que uma DMZ mal desenhada pode ser pior do que não ter DMZ?",
    "Que fluxos você bloquearia primeiro para reduzir movimento lateral em caso de ransomware?",
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
      "id": "q1",
      "question": "Qual é o objetivo principal de zonas de segurança?",
      "options": [
        "Aumentar o número de subnets sem mudar política",
        "Agrupar ativos por confiança, função e criticidade para controlar fluxos",
        "Substituir autenticação de usuários",
        "Eliminar roteamento"
      ],
      "answer": 1,
      "explanation": "Zonas servem para agrupar ativos e controlar comunicação entre grupos com regras explícitas."
    },
    {
      "id": "q2",
      "question": "O que caracteriza uma DMZ bem desenhada?",
      "options": [
        "Acesso livre à rede interna",
        "Serviços expostos controlados e saída mínima para backends necessários",
        "Banco de dados público",
        "Ausência de logs para reduzir ruído"
      ],
      "answer": 1,
      "explanation": "DMZ deve conter exposição e permitir somente fluxos necessários e monitorados."
    },
    {
      "id": "q3",
      "question": "Por que rede plana aumenta risco de ransomware?",
      "options": [
        "Porque impede DNS",
        "Porque facilita movimento lateral entre hosts e serviços",
        "Porque remove TCP",
        "Porque criptografa tráfego automaticamente"
      ],
      "answer": 1,
      "explanation": "Rede plana facilita que um host comprometido alcance outros sistemas."
    },
    {
      "id": "q4",
      "question": "Qual item NÃO deveria faltar em uma matriz de comunicação?",
      "options": [
        "Dono do fluxo",
        "Justificativa",
        "Porta/protocolo",
        "Senha do administrador"
      ],
      "answer": 3,
      "explanation": "Senhas não devem estar na matriz; dono, justificativa e porta são essenciais."
    },
    {
      "id": "q5",
      "question": "Qual é um erro comum ao usar VLANs como segmentação?",
      "options": [
        "Usar VLANs para separar broadcast",
        "Roteá-las livremente sem firewall ou ACL",
        "Documentar subnets",
        "Aplicar deny-by-default"
      ],
      "answer": 1,
      "explanation": "VLAN sem controle entre redes organiza, mas não necessariamente protege."
    },
    {
      "id": "q6",
      "question": "Em cloud, qual combinação ajuda a implementar segmentação?",
      "options": [
        "Subnets públicas para tudo",
        "Route tables, security groups, NACL/NSG, firewall e endpoints privados",
        "Apenas DNS público",
        "Apenas tags sem política"
      ],
      "answer": 1,
      "explanation": "Segmentação em cloud depende de múltiplos controles coerentes."
    }
  ],
  "flashcards": [
    {
      "front": "O que é uma zona de segurança?",
      "back": "Um agrupamento de ativos com nível semelhante de confiança, função, exposição ou criticidade."
    },
    {
      "front": "O que é DMZ?",
      "back": "Uma zona intermediária para serviços publicados ou semiexpostos, com regras restritas e observabilidade."
    },
    {
      "front": "O que é movimento lateral?",
      "back": "A tentativa de um atacante se deslocar de um sistema comprometido para outros sistemas internos."
    },
    {
      "front": "VLAN é segmentação de segurança por si só?",
      "back": "Não. VLAN ajuda a separar redes, mas segurança exige política, controle, logs e revisão."
    },
    {
      "front": "O que deve existir em uma matriz de fluxos?",
      "back": "Origem, destino, protocolo, porta, direção, dono, justificativa, validade e logging."
    },
    {
      "front": "Por que separar administração?",
      "back": "Porque acessos privilegiados devem passar por controles mais fortes, como bastion, MFA, logs e allowlist."
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "title": "Classificação de zonas",
      "prompt": "Classifique estes ativos em zonas: notebook de usuário, portal público, reverse proxy, API interna, banco de produção, servidor de backup, bastion, SIEM e impressora.",
      "expectedAnswer": "Usuários, DMZ, Apps, Dados, Backup, Administração, Segurança e IoT/Serviços auxiliares."
    },
    {
      "id": "ex2",
      "title": "Fluxos mínimos",
      "prompt": "Defina os fluxos mínimos para Internet → WAF → DMZ → Apps → Banco.",
      "expectedAnswer": "Internet para WAF em HTTPS; WAF/reverse proxy para app em porta específica; app para banco na porta do banco; retorno stateful; logs em todos os pontos críticos."
    },
    {
      "id": "ex3",
      "title": "Identificação de risco",
      "prompt": "Por que Usuários → Banco TCP/5432 é perigoso quando o banco deveria ser acessado apenas pela aplicação?",
      "expectedAnswer": "Porque permite bypass da camada de aplicação, aumenta chance de exploração direta, credenciais indevidas, movimento lateral e extração de dados."
    },
    {
      "id": "ex4",
      "title": "Cloud",
      "prompt": "Uma VM de banco está em subnet pública com security group permitindo 0.0.0.0/0 na porta 5432. Liste correções.",
      "expectedAnswer": "Mover para subnet privada, remover 0.0.0.0/0, permitir somente security group da aplicação, usar endpoint privado, flow logs, backups e revisão de credenciais."
    },
    {
      "id": "ex-9.4-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Redesenhar uma rede plana com DMZ insegura",
    "scenario": "Uma empresa possui rede 10.0.0.0/16 quase plana. O portal público, a API, o banco, o servidor de arquivos, backup, estações de usuários e bastion estão em subnets diferentes, mas todos conseguem falar com todos. O portal público recebe tráfego da Internet e também tem acesso amplo à rede interna. O banco aceita conexões de usuários. O backup aceita SMB de toda a rede. O bastion aceita RDP de qualquer estação.",
    "tasks": [
      "Propor zonas de segurança.",
      "Definir fluxos permitidos mínimos.",
      "Listar fluxos que devem ser bloqueados.",
      "Definir controles técnicos onde aplicar regras.",
      "Definir logs e alertas prioritários.",
      "Criar plano de migração sem interromper tudo de uma vez."
    ],
    "successCriteria": [
      "Banco não recebe acesso direto de usuários ou DMZ ampla.",
      "DMZ só fala com backends específicos.",
      "Backup fica protegido contra hosts comuns.",
      "Administração passa por bastion com origem restrita.",
      "Há logging de denies e fluxos críticos.",
      "A migração reduz risco sem depender de any-any permanente."
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desafio",
    "content": "Uma solução madura separa Internet, DMZ, Apps, Dados, Usuários, Administração, Backup, Segurança e Convidados/IoT. Internet deve chegar somente ao WAF/reverse proxy. DMZ deve acessar apenas aplicações necessárias. Aplicações acessam bancos em portas específicas. Usuários acessam aplicações, não bancos. Administração ocorre via bastion com MFA e origem restrita. Backup deve aceitar conexões apenas de agentes ou servidores autorizados, com imutabilidade quando possível. Denies entre zonas críticas devem ser logados e enviados ao SIEM. A migração deve começar por visibilidade e matriz de fluxos, depois aplicar bloqueios em modo monitorado, criar exceções temporárias com validade e fechar caminhos de maior risco primeiro: administração ampla, banco acessível por usuários, backup amplo e DMZ com acesso irrestrito."
  },
  "glossary": [
    {
      "term": "Zona de segurança",
      "definition": "Grupo de ativos com confiança, função, exposição ou criticidade semelhantes."
    },
    {
      "term": "DMZ",
      "definition": "Zona intermediária usada para publicar serviços de forma controlada, reduzindo exposição da rede interna."
    },
    {
      "term": "Segmentação",
      "definition": "Separação lógica ou física de redes e workloads com controle de comunicação entre eles."
    },
    {
      "term": "Microsegmentação",
      "definition": "Controle granular de comunicação entre workloads, hosts, processos ou serviços."
    },
    {
      "term": "Movimento lateral",
      "definition": "Deslocamento de um atacante dentro do ambiente após comprometer um ponto inicial."
    },
    {
      "term": "Deny-by-default",
      "definition": "Modelo em que tudo é bloqueado por padrão e apenas fluxos justificados são permitidos."
    },
    {
      "term": "Bastion",
      "definition": "Host controlado usado como ponto de entrada administrativo para acessar sistemas internos."
    },
    {
      "term": "Egress filtering",
      "definition": "Controle de tráfego de saída, útil para reduzir exfiltração e comunicação indevida com Internet."
    },
    {
      "term": "Flow logs",
      "definition": "Registros de tráfego aceito ou negado, geralmente com origem, destino, porta, protocolo e ação."
    },
    {
      "term": "Bypass",
      "definition": "Caminho alternativo que contorna o controle de segurança planejado."
    }
  ],
  "references": [
    "Curso Redes e Network v2.0 — Módulo 4: IPv4 e Endereçamento",
    "Curso Redes e Network v2.0 — Módulo 6: Roteamento IPv4",
    "Curso Redes e Network v2.0 — Módulo 8: TCP, UDP, portas e transporte",
    "Curso Redes e Network v2.0 — Módulo 9: HTTP, HTTPS, proxies e APIs",
    "Curso Infraestrutura Moderna, Platform Engineering e DevSecOps — módulos sobre IaC, Kubernetes e automação",
    "Curso Enterprise Identity, IAM, Segurança e Acessos — módulos sobre identidade, MFA, SSO e autorização"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e Platform Engineering",
      "reason": "NetworkPolicies, ingress e service mesh dependem de segmentação aplicada a workloads."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Acesso administrativo e MFA",
      "reason": "Bastions e zonas administrativas dependem de identidade forte, autorização e trilhas de auditoria."
    }
  ],
  "progressRules": {
    "requiresQuiz": true,
    "requiresLab": true,
    "minimumQuizScore": 70,
    "minimumExercisesCompleted": 3,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "9.5"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "labMarkedDone",
        "practicalExerciseDone"
      ]
    }
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
