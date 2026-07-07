export const lesson0606 = {
  "id": "6.6",
  "moduleId": "m06",
  "order": 6,
  "title": "Portas comuns e serviços corporativos",
  "subtitle": "Aprenda a reconhecer portas TCP/UDP frequentes, entender o serviço por trás delas e transformar números de porta em uma matriz operacional de segurança, troubleshooting e governança.",
  "duration": "115-170 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 265,
  "tags": [
    "redes",
    "tcp",
    "udp",
    "portas",
    "serviços",
    "firewall",
    "segurança",
    "troubleshooting",
    "cloud",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "A aula apresenta o papel da camada de transporte acima do IP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "Portas comuns só fazem sentido depois de entender sockets e 5-tuple."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "Muitos serviços corporativos usam TCP e dependem de conexão estabelecida."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.5",
      "title": "UDP: simplicidade, latência e aplicações em tempo real",
      "reason": "Serviços como DNS, DHCP, NTP, SNMP e syslog frequentemente usam UDP."
    }
  ],
  "objectives": [
    "Explicar por que portas comuns existem e como elas ajudam operação e segurança.",
    "Identificar portas frequentes em ambientes corporativos e o serviço associado a cada uma.",
    "Diferenciar porta, protocolo, serviço, aplicação, processo e fluxo permitido em firewall.",
    "Relacionar portas comuns com DNS, DHCP, NTP, web, e-mail, administração, bancos, diretório, observabilidade e cloud.",
    "Construir uma matriz de fluxos permitidos com origem, destino, protocolo, porta, justificativa, dono e logs.",
    "Apontar riscos de exposição indevida de portas administrativas e serviços sensíveis."
  ],
  "learningOutcomes": [
    "Ler uma regra de firewall e identificar se ela descreve corretamente serviço, protocolo e porta.",
    "Separar portas TCP de portas UDP nos serviços mais comuns.",
    "Diagnosticar quando DNS, web, e-mail, SSH, RDP, banco ou syslog falham por bloqueio de porta.",
    "Avaliar riscos de portas expostas para a Internet, para redes internas ou para terceiros.",
    "Documentar serviços corporativos em formato auditável para NOC, SOC, cloud, DevSecOps e arquitetura."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Quando alguém diz “libera a porta 443”, a frase parece simples. Mas, em uma rede corporativa, essa frase pode significar várias coisas: acesso HTTPS de usuários para a Internet, publicação de uma API, comunicação entre microserviços, health check de balanceador, webhook de pipeline, túnel QUIC em UDP/443 ou tráfego administrativo indevido mascarado como web.</p>\n  <p>Portas são números, mas em operação elas representam <strong>contratos de comunicação</strong>. Cada porta aberta precisa responder: quem inicia? quem recebe? usa TCP ou UDP? qual aplicação escuta? qual dado trafega? existe criptografia? onde fica o log? qual time é dono? o acesso é temporário ou permanente?</p>\n  <div class='callout'><strong>Ideia central:</strong> decorar portas ajuda pouco. O objetivo profissional é entender portas como parte de um fluxo: origem, destino, protocolo, porta, serviço, processo, controle, evidência e risco.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>Desde o início da pilha TCP/IP, portas foram usadas para permitir que muitos serviços coexistissem no mesmo host. Um servidor podia oferecer FTP, SSH, web, e-mail e DNS no mesmo endereço IP, desde que cada serviço escutasse em uma porta diferente.</p>\n  <p>Com o tempo, algumas portas se tornaram convencionais: HTTP em TCP/80, HTTPS em TCP/443, DNS em UDP/TCP 53, SMTP em TCP/25, SSH em TCP/22, RDP em TCP/3389. Essas convenções facilitaram interoperabilidade, automação, documentação e troubleshooting.</p>\n  <p>Em ambientes modernos, portas continuam importantes, mas o contexto mudou. Hoje elas aparecem em firewalls cloud, security groups, Kubernetes Services, ingress controllers, service meshes, scanners de vulnerabilidade, SIEMs, WAFs, load balancers e pipelines de infraestrutura como código.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>Sem uma convenção de portas, o cliente não saberia onde encontrar cada serviço em um host. O IP entrega o pacote ao servidor, mas não diz se o destino é web, banco, SSH, DNS, e-mail ou monitoramento.</p>\n  <p>O problema operacional aparece quando times tratam portas como simples números e criam regras amplas demais. Exemplos comuns: liberar “any para any”, expor RDP para a Internet, permitir banco de dados diretamente a partir da rede de usuários, abrir UDP/53 para qualquer resolvedor externo ou manter portas legadas sem dono.</p>\n  <div class='callout callout--problem'><strong>Problema real:</strong> a porta não prova que o serviço é seguro, nem que o tráfego é legítimo. Ela apenas indica um ponto de entrada ou saída. Segurança exige contexto, autenticação, criptografia, logs, segmentação e revisão contínua.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>No começo, muitos serviços ficavam em servidores físicos conhecidos e portas fixas. A administração era mais manual: uma lista de portas no firewall, alguns servidores e documentação em planilhas.</p>\n  <p>Depois vieram virtualização, balanceadores, NAT, VPNs, DMZs, proxies, firewalls de próxima geração e ferramentas de varredura. A porta deixou de ser apenas atributo do servidor e passou a fazer parte do desenho de zonas.</p>\n  <p>Na cloud e no DevSecOps, portas são declaradas em código: security groups, NSGs, NACLs, Kubernetes NetworkPolicy, ingress, service mesh, load balancers e manifests. Isso melhora rastreabilidade, mas também aumenta o impacto de um erro repetido em Terraform, Helm ou pipeline.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Uma <strong>porta</strong> é um identificador numérico de 16 bits usado por TCP e UDP para entregar dados ao processo correto dentro de um host. O IP identifica o host. A porta identifica o ponto lógico de atendimento dentro dele.</p>\n  <p>Portas de 0 a 1023 são conhecidas como well-known ports. Portas de 1024 a 49151 são registradas. Portas de 49152 a 65535 costumam ser usadas como portas dinâmicas ou efêmeras, embora o intervalo exato possa variar por sistema operacional.</p>\n  <table class='data-table'>\n    <thead><tr><th>Porta</th><th>Protocolo</th><th>Serviço comum</th><th>Observação operacional</th></tr></thead>\n    <tbody>\n      <tr><td>53</td><td>UDP/TCP</td><td>DNS</td><td>UDP para consultas comuns; TCP para transferência de zona, respostas grandes e alguns cenários modernos.</td></tr>\n      <tr><td>67/68</td><td>UDP</td><td>DHCP</td><td>Cliente e servidor usam portas diferentes durante obtenção de configuração IPv4.</td></tr>\n      <tr><td>80/443</td><td>TCP</td><td>HTTP/HTTPS</td><td>Web, APIs, proxies, consoles, ingress e integrações.</td></tr>\n      <tr><td>22</td><td>TCP</td><td>SSH</td><td>Administração remota; deve ser restrita e autenticada fortemente.</td></tr>\n      <tr><td>3389</td><td>TCP/UDP</td><td>RDP</td><td>Administração Windows; exposição direta é risco crítico.</td></tr>\n      <tr><td>25/587/465</td><td>TCP</td><td>SMTP</td><td>Envio/relay de e-mail; muito relevante para antispam e reputação.</td></tr>\n      <tr><td>143/993</td><td>TCP</td><td>IMAP/IMAPS</td><td>Acesso a caixas de e-mail; preferir variante com TLS.</td></tr>\n      <tr><td>123</td><td>UDP</td><td>NTP</td><td>Sincronização de horário; fundamental para logs e autenticação.</td></tr>\n      <tr><td>161/162</td><td>UDP</td><td>SNMP</td><td>Monitoramento e traps; preferir SNMPv3.</td></tr>\n      <tr><td>514</td><td>UDP/TCP</td><td>Syslog</td><td>Centralização de logs; em ambientes críticos usar transporte confiável/TLS quando disponível.</td></tr>\n      <tr><td>389/636</td><td>TCP/UDP</td><td>LDAP/LDAPS</td><td>Diretório; LDAPS ou StartTLS reduzem exposição de credenciais.</td></tr>\n      <tr><td>88</td><td>TCP/UDP</td><td>Kerberos</td><td>Autenticação em ambientes corporativos; depende de horário confiável.</td></tr>\n      <tr><td>445</td><td>TCP</td><td>SMB</td><td>Compartilhamento Windows; muito sensível a ransomware e movimento lateral.</td></tr>\n      <tr><td>5432/3306/1433</td><td>TCP</td><td>PostgreSQL/MySQL/SQL Server</td><td>Bancos de dados nunca devem ser expostos sem forte controle de origem, autenticação e criptografia.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um processo servidor inicia, ele normalmente faz <strong>bind</strong> em uma combinação de endereço IP, protocolo e porta. Um servidor web pode escutar em TCP/443 em todas as interfaces, apenas em um IP específico ou apenas em <code>127.0.0.1</code>.</p>\n  <p>Quando um cliente acessa esse serviço, o sistema operacional escolhe uma porta de origem efêmera. O fluxo passa a ser identificado por origem, porta de origem, destino, porta de destino e protocolo. Isso permite milhares de conexões simultâneas para o mesmo serviço.</p>\n  <ol class='flow-list'>\n    <li>O cliente resolve o nome do serviço via DNS, se necessário.</li>\n    <li>O cliente escolhe protocolo e porta de destino conforme aplicação.</li>\n    <li>O sistema escolhe uma porta efêmera de origem.</li>\n    <li>Firewalls, NATs e balanceadores avaliam protocolo, porta, estado e política.</li>\n    <li>O servidor recebe o tráfego e entrega ao processo que escuta naquela porta.</li>\n    <li>Logs de sistema, aplicação, firewall e load balancer registram evidências do fluxo.</li>\n  </ol>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Em arquitetura corporativa, portas devem ser documentadas em uma matriz de comunicação. Essa matriz evita que regras de firewall virem uma coleção de exceções sem dono.</p>\n  <table class='comparison-table'>\n    <thead><tr><th>Campo</th><th>Por que importa</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>Origem</td><td>Define quem pode iniciar o fluxo.</td><td>VLAN usuários, subnet app, runner CI.</td></tr>\n      <tr><td>Destino</td><td>Define qual ativo recebe o fluxo.</td><td>DNS interno, API, banco, SIEM.</td></tr>\n      <tr><td>Protocolo</td><td>TCP e UDP têm comportamento e riscos diferentes.</td><td>TCP/443, UDP/53.</td></tr>\n      <tr><td>Porta</td><td>Identifica o serviço lógico.</td><td>443, 5432, 514.</td></tr>\n      <tr><td>Justificativa</td><td>Evita liberação por conveniência.</td><td>Aplicação X consulta banco Y.</td></tr>\n      <tr><td>Dono</td><td>Permite revisão e remoção futura.</td><td>Time Plataforma, Segurança, Dados.</td></tr>\n      <tr><td>Logs</td><td>Permite investigação e auditoria.</td><td>Firewall logs, LB logs, syslog, SIEM.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em um prédio corporativo. O endereço do prédio é o IP. Mas dentro do prédio existem recepção, RH, financeiro, datacenter, sala de reunião e expedição. A porta de rede é como o ramal ou setor interno que indica para qual serviço a mensagem deve ir.</p>\n  <p>A analogia ajuda, mas tem limite: em redes, qualquer porta aberta pode ser testada automaticamente por scanners, e muitos serviços respondem mesmo quando ninguém “bateu na porta” de forma legítima. Por isso, portas precisam de controle, não apenas identificação.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você acessa <code>https://exemplo.local</code>. O navegador resolve o nome em um IP, abre uma conexão TCP para a porta 443 e negocia TLS. Se a porta 443 estiver bloqueada, o nome pode resolver corretamente e o ping pode até funcionar, mas a aplicação web continuará indisponível.</p>\n  <p>Se o mesmo servidor também tiver SSH em TCP/22, a porta 22 deve ser acessível apenas de uma rede administrativa ou bastion, não da rede inteira nem da Internet.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma aplicação corporativa pode precisar de vários fluxos: usuários acessam o portal em TCP/443; o portal consulta banco em TCP/5432; servidores consultam DNS em UDP/TCP 53; logs seguem para SIEM em TCP/6514; administradores acessam bastion em SSH; monitoramento coleta métricas via SNMPv3.</p>\n  <p>O desenho correto não é “liberar tudo entre as VLANs”. O desenho correto é permitir apenas fluxos justificados, registrar logs e revisar periodicamente portas que não têm mais dono ou necessidade.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Na cloud, portas aparecem em security groups, NSGs, NACLs, load balancers, target groups, health checks e firewalls gerenciados. Uma API pode estar publicada em TCP/443 no load balancer, enquanto as instâncias internas escutam em TCP/8080 apenas para o load balancer.</p>\n  <p>Um erro comum é abrir banco de dados para <code>0.0.0.0/0</code> porque “precisava testar”. Outro erro é deixar SSH ou RDP público. A prática madura usa bastion, VPN, SSO, JIT access, regras temporárias, logs e automação governada.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em pipelines, portas aparecem em testes de health check, containers, Docker Compose, Kubernetes Services, Ingress, Helm charts e Terraform. A diferença entre <code>containerPort</code>, <code>targetPort</code>, <code>port</code> e porta exposta no load balancer pode causar falhas difíceis de diagnosticar.</p>\n  <p>Uma boa prática é tratar portas como contrato versionado: todo serviço deve declarar porta, protocolo, exposição, dependências, readiness/liveness, política de rede e logs. Mudanças de porta devem passar por revisão de arquitetura e segurança.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Para segurança defensiva, portas comuns ajudam a priorizar investigação. TCP/445 exposto pode indicar risco de SMB e ransomware. TCP/3389 público pode indicar risco de brute force. UDP/53 para resolvedores externos pode indicar bypass de DNS corporativo. TCP/5432 aberto para redes amplas pode indicar exposição de banco.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> porta aberta precisa de dono, justificativa, origem restrita, autenticação adequada, criptografia quando aplicável, logging e data de revisão.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama SVG — portas comuns como mapa de serviços corporativos</h2>\n  <p>O diagrama abaixo mostra que portas não são apenas números: elas representam contratos operacionais entre clientes, servidores, firewalls, proxies, balanceadores e times responsáveis.</p>\n  <svg class='lesson-svg' viewBox='0 0 980 520' role='img' aria-labelledby='m06l06-title m06l06-desc'>\n    <title id='m06l06-title'>Serviços corporativos e portas comuns</title>\n    <desc id='m06l06-desc'>Clientes acessam serviços DNS, web, e-mail, administração, banco de dados e observabilidade através de portas TCP ou UDP controladas por firewall.</desc>\n    <defs>\n      <marker id='m06l06-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path class='svg-flow' d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n\n    <rect class='svg-zone' x='30' y='40' width='210' height='420' rx='18'></rect>\n    <text class='svg-label' x='135' y='75' text-anchor='middle'>Usuários e apps</text>\n    <rect class='svg-node svg-node--client' x='65' y='110' width='140' height='60' rx='12'></rect>\n    <text class='svg-label' x='135' y='145' text-anchor='middle'>Cliente</text>\n    <rect class='svg-node svg-node--server' x='65' y='210' width='140' height='60' rx='12'></rect>\n    <text class='svg-label' x='135' y='245' text-anchor='middle'>Runner / App</text>\n    <rect class='svg-node svg-node--security' x='65' y='310' width='140' height='60' rx='12'></rect>\n    <text class='svg-label' x='135' y='345' text-anchor='middle'>Admin</text>\n\n    <rect class='svg-zone' x='300' y='40' width='180' height='420' rx='18'></rect>\n    <text class='svg-label' x='390' y='75' text-anchor='middle'>Controle</text>\n    <rect class='svg-node svg-node--firewall' x='325' y='135' width='130' height='80' rx='12'></rect>\n    <text class='svg-label' x='390' y='170' text-anchor='middle'>Firewall</text>\n    <text class='svg-label svg-label--small' x='390' y='192' text-anchor='middle'>porta/protocolo</text>\n    <rect class='svg-node svg-node--cloud' x='325' y='280' width='130' height='70' rx='12'></rect>\n    <text class='svg-label' x='390' y='320' text-anchor='middle'>LB / Proxy</text>\n\n    <rect class='svg-zone' x='540' y='40' width='400' height='420' rx='18'></rect>\n    <text class='svg-label' x='740' y='75' text-anchor='middle'>Serviços corporativos</text>\n\n    <rect class='svg-node svg-node--server' x='575' y='105' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='640' y='132' text-anchor='middle'>DNS</text>\n    <text class='svg-label svg-label--small' x='640' y='151' text-anchor='middle'>53/UDP TCP</text>\n\n    <rect class='svg-node svg-node--server' x='760' y='105' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='825' y='132' text-anchor='middle'>Web</text>\n    <text class='svg-label svg-label--small' x='825' y='151' text-anchor='middle'>80/443 TCP</text>\n\n    <rect class='svg-node svg-node--server' x='575' y='205' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='640' y='232' text-anchor='middle'>E-mail</text>\n    <text class='svg-label svg-label--small' x='640' y='251' text-anchor='middle'>25/587/993</text>\n\n    <rect class='svg-node svg-node--server' x='760' y='205' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='825' y='232' text-anchor='middle'>Admin</text>\n    <text class='svg-label svg-label--small' x='825' y='251' text-anchor='middle'>22/3389</text>\n\n    <rect class='svg-node svg-node--server' x='575' y='305' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='640' y='332' text-anchor='middle'>Banco</text>\n    <text class='svg-label svg-label--small' x='640' y='351' text-anchor='middle'>5432/3306</text>\n\n    <rect class='svg-node svg-node--server' x='760' y='305' width='130' height='58' rx='12'></rect>\n    <text class='svg-label' x='825' y='332' text-anchor='middle'>Logs/Mon.</text>\n    <text class='svg-label svg-label--small' x='825' y='351' text-anchor='middle'>514/161/162</text>\n\n    <path class='svg-flow svg-flow--request animated-flow' d='M205 140 C250 140, 280 170, 325 170' marker-end='url(#m06l06-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M455 170 C500 140, 525 134, 575 134' marker-end='url(#m06l06-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M455 170 C530 170, 705 132, 760 132' marker-end='url(#m06l06-arrow)'></path>\n    <path class='svg-flow svg-flow--blocked' d='M205 340 C260 340, 288 215, 325 196' marker-end='url(#m06l06-arrow)'></path>\n    <text class='svg-label svg-label--small' x='275' y='315'>bloquear admin direto</text>\n\n    <rect class='svg-badge' x='300' y='410' width='390' height='45' rx='12'></rect>\n    <text class='svg-label svg-label--small' x='495' y='438' text-anchor='middle'>Matriz: origem → destino → protocolo → porta → justificativa → dono → log</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai construir uma matriz de portas corporativas e validar localmente quais processos estão escutando em quais portas. O objetivo é deixar de enxergar portas como lista decorada e passar a enxergá-las como evidências operacionais.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios reforçam a associação entre porta, protocolo, serviço, risco e controle defensivo.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário com portas abertas e deverá propor uma matriz segura de fluxos, removendo exposições indevidas e justificando cada porta restante.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como classificar serviços por criticidade, restringir origem, exigir criptografia e preservar evidências.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Portas comuns ajudam a reconhecer serviços, mas não substituem análise. O mesmo número pode representar tráfego legítimo, legado, inseguro ou mal documentado. O profissional de redes e segurança deve conectar porta, protocolo, processo, origem, destino, dono, justificativa, controle e log.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, vamos estudar <strong>NAT, PAT, firewalls stateful e rastreamento de conexão</strong>, entendendo como portas de origem e destino são reescritas, acompanhadas e usadas para permitir retorno de tráfego.</p>\n</section>\n"
  },
  "networkContext": {
    "whereItFits": "Camada de transporte, operação de serviços e controle de fluxos entre aplicações.",
    "before": "O estudante já entende IP, roteamento, DNS, TCP, UDP e sockets.",
    "after": "A aula prepara NAT/PAT, firewalls stateful, troubleshooting TCP/UDP e hardening de exposição.",
    "dependsOn": [
      "m04",
      "m06",
      "m07",
      "8.1",
      "8.2",
      "8.3",
      "8.5"
    ]
  },
  "protocolFields": [
    {
      "name": "Protocolo",
      "description": "Indica se o fluxo usa TCP, UDP ou outro protocolo."
    },
    {
      "name": "Porta de origem",
      "description": "Normalmente efêmera no cliente; usada para retorno e identificação do fluxo."
    },
    {
      "name": "Porta de destino",
      "description": "Normalmente associada ao serviço acessado, como 443 para HTTPS ou 53 para DNS."
    },
    {
      "name": "Estado",
      "description": "Em TCP, firewalls e sistemas acompanham estados como LISTEN e ESTABLISHED."
    },
    {
      "name": "Processo",
      "description": "Aplicação local que escuta ou inicia a comunicação."
    },
    {
      "name": "Regra de controle",
      "description": "Firewall, ACL, security group, policy ou filtro que permite ou bloqueia o fluxo."
    }
  ],
  "packetFlow": [
    "Cliente resolve nome ou recebe destino diretamente.",
    "Aplicação escolhe protocolo e porta de destino.",
    "Sistema operacional escolhe porta de origem efêmera.",
    "Firewall local, rede, NAT, proxy ou load balancer avaliam o fluxo.",
    "Servidor entrega o tráfego ao processo em LISTEN ou à aplicação UDP correspondente.",
    "Logs de host, aplicação, firewall e rede registram ou deveriam registrar a tentativa."
  ],
  "deepDive": {
    "title": "Porta não é aplicação: por que isso importa",
    "content": "Embora portas comuns sejam convenções, qualquer aplicação pode escutar em quase qualquer porta se o sistema permitir. Malware pode usar TCP/443 para parecer tráfego web; APIs internas podem usar 8443; bancos podem mudar porta padrão; QUIC usa UDP/443. Por isso, inspeção, inventário, dono do serviço, logs e validação de processo são tão importantes quanto o número da porta.",
    "questions": [
      "Por que liberar TCP/443 não significa necessariamente liberar apenas navegação web?",
      "Que evidência você usaria para provar qual processo escuta em uma porta?",
      "Por que uma porta padrão não garante configuração segura?"
    ]
  },
  "commonMistakes": [
    "Confundir porta aberta com aplicação saudável.",
    "Liberar TCP quando o serviço usa UDP, ou o contrário.",
    "Permitir acesso administrativo por origem ampla.",
    "Expor banco de dados diretamente para usuários ou Internet.",
    "Criar regra de firewall sem dono, justificativa ou prazo de revisão.",
    "Assumir que tráfego em 443 é sempre HTTPS legítimo."
  ],
  "troubleshooting": {
    "symptoms": [
      "DNS resolve, mas aplicação não conecta.",
      "Ping funciona, mas porta TCP falha.",
      "Serviço escuta apenas em localhost.",
      "Firewall permite porta errada ou protocolo errado.",
      "Load balancer responde, mas backend não está healthy.",
      "Banco funciona localmente, mas não a partir da aplicação."
    ],
    "commands": [
      {
        "windows": [
          "netstat -ano",
          "Get-NetTCPConnection",
          "Get-NetUDPEndpoint",
          "Test-NetConnection destino -Port 443",
          "Resolve-DnsName exemplo.com"
        ],
        "linux": [
          "ss -tulpen",
          "ss -tnp",
          "nc -vz destino 443",
          "curl -vk https://destino",
          "sudo tcpdump -n host <ip> and port 443"
        ],
        "cisco": [
          "show access-lists",
          "show ip interface brief",
          "show logging",
          "show control-plane host open-ports"
        ],
        "cloud": [
          "Revisar security groups/NSGs",
          "Verificar NACLs/route tables",
          "Consultar flow logs",
          "Validar listener e target group do load balancer"
        ]
      }
    ],
    "method": [
      "Confirme o nome e o IP de destino.",
      "Confirme protocolo e porta esperados.",
      "Verifique se há processo escutando no servidor.",
      "Teste a porta a partir da origem correta.",
      "Compare logs de host, firewall, LB e cloud.",
      "Corrija a política com menor privilégio e documente a justificativa."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter matriz de fluxos com dono e justificativa.",
      "Restringir portas administrativas a bastion, VPN, ZTNA ou rede de gestão.",
      "Não expor bancos diretamente à Internet.",
      "Usar criptografia e autenticação forte em serviços sensíveis.",
      "Coletar logs de firewall, load balancer, sistema e aplicação.",
      "Revisar regras periodicamente e remover exceções órfãs."
    ],
    "badPractices": [
      "Liberar any-any para resolver incidente rapidamente e esquecer a regra.",
      "Abrir SSH/RDP para 0.0.0.0/0.",
      "Permitir DNS externo sem controle em estações corporativas.",
      "Usar SNMP v2c com community string padrão.",
      "Deixar syslog sem proteção, sem retenção ou sem horário confiável.",
      "Permitir tráfego de banco a partir de sub-redes inteiras sem necessidade."
    ],
    "vulnerabilities": [
      {
        "name": "Brute force em serviços administrativos expostos.",
        "description": "Risco relacionado à aula 6.6 — Portas comuns e serviços corporativos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação por zona e matriz de comunicação."
      },
      {
        "name": "Movimento lateral por SMB/RPC/WinRM mal segmentado.",
        "description": "Risco relacionado à aula 6.6 — Portas comuns e serviços corporativos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall stateful com menor privilégio."
      },
      {
        "name": "Exfiltração por DNS ou HTTPS permitido sem inspeção adequada.",
        "description": "Risco relacionado à aula 6.6 — Portas comuns e serviços corporativos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Bastion, MFA, ZTNA e acesso just-in-time."
      },
      {
        "name": "Banco de dados acessível por origens indevidas.",
        "description": "Risco relacionado à aula 6.6 — Portas comuns e serviços corporativos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Network Security Groups/Security Groups revisados por código."
      },
      {
        "name": "Serviços legados sem TLS ou com autenticação fraca.",
        "description": "Risco relacionado à aula 6.6 — Portas comuns e serviços corporativos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Varredura contínua e reconciliação com CMDB/IPAM."
      },
      {
        "name": "Portas abertas sem inventário e sem dono.",
        "description": "Risco relacionado à aula 6.6 — Portas comuns e serviços corporativos.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Alertas para portas críticas expostas e mudanças fora do padrão."
      }
    ],
    "mitigations": [
      "Segmentação por zona e matriz de comunicação.",
      "Firewall stateful com menor privilégio.",
      "Bastion, MFA, ZTNA e acesso just-in-time.",
      "Network Security Groups/Security Groups revisados por código.",
      "Varredura contínua e reconciliação com CMDB/IPAM.",
      "Alertas para portas críticas expostas e mudanças fora do padrão."
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
      "Segmentação por zona e matriz de comunicação.",
      "Firewall stateful com menor privilégio.",
      "Bastion, MFA, ZTNA e acesso just-in-time.",
      "Network Security Groups/Security Groups revisados por código.",
      "Varredura contínua e reconciliação com CMDB/IPAM.",
      "Alertas para portas críticas expostas e mudanças fora do padrão."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-6.6",
    "title": "Mapeando portas comuns e construindo uma matriz de fluxos",
    "labType": "cloud",
    "objective": "Identificar serviços e portas, validar processos locais e montar uma matriz de comunicação segura e auditável.",
    "scenario": "Laboratório Neste laboratório, você vai construir uma matriz de portas corporativas e validar localmente quais processos estão escutando em quais portas. O objetivo é deixar de enxergar portas como lista decorada e passar a enxergá-las como evidências operacionais.",
    "topology": "Um computador local Windows ou Linux, acesso a um serviço web conhecido, opcionalmente uma VM/lab com SSH ou servidor HTTP, e uma tabela de matriz de fluxos.",
    "architecture": "Cliente → DNS → rota → firewall local/rede → serviço TCP/UDP → logs/evidências.",
    "prerequisites": [
      "Terminal Windows ou Linux",
      "Permissão para executar comandos de leitura",
      "Opcional: VM de laboratório",
      "Não testar portas em terceiros sem autorização"
    ],
    "tools": [
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 170,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não realizar varredura em redes de terceiros.",
      "Não tentar conectar em portas administrativas sem autorização.",
      "Sanitizar IPs públicos, nomes internos e evidências antes de compartilhar.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Listar portas locais em escuta",
        "instruction": "Identifique serviços locais e portas abertas.",
        "command": "Windows: netstat -ano\nWindows: Get-NetTCPConnection -State Listen\nLinux: ss -tulpen",
        "expectedOutput": "Você verá portas, protocolos, endereços de escuta e, quando permitido, processos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas comuns e serviços corporativos” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Diferenciar localhost, IP específico e todas as interfaces",
        "instruction": "Compare serviços em 127.0.0.1, IP da máquina e 0.0.0.0.",
        "command": "Windows: netstat -ano | findstr LISTEN\nLinux: ss -lntp",
        "expectedOutput": "Serviços em 127.0.0.1 não são expostos externamente da mesma forma que serviços em 0.0.0.0.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas comuns e serviços corporativos” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Testar uma porta TCP de destino",
        "instruction": "Valide conectividade TCP para um serviço autorizado.",
        "command": "Windows: Test-NetConnection exemplo.com -Port 443\nLinux: nc -vz exemplo.com 443\nLinux: curl -I https://exemplo.com",
        "expectedOutput": "O teste deve indicar se a porta TCP está acessível a partir da origem.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas comuns e serviços corporativos” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Consultar portas UDP relevantes",
        "instruction": "Observe que UDP não se comporta como TCP e nem sempre retorna confirmação clara.",
        "command": "Linux: dig exemplo.com @1.1.1.1\nLinux: sudo tcpdump -n udp port 53\nWindows: Resolve-DnsName exemplo.com",
        "expectedOutput": "Você verá consultas DNS usando UDP ou TCP dependendo do cenário.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas comuns e serviços corporativos” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Criar matriz de fluxos",
        "instruction": "Monte tabela com origem, destino, protocolo, porta, serviço, justificativa, dono e log.",
        "command": "Documento/tabela: origem,destino,protocolo,porta,serviço,justificativa,dono,log",
        "expectedOutput": "Uma matriz clara e revisável para pelo menos oito serviços.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas comuns e serviços corporativos” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Classificar riscos",
        "instruction": "Marque portas administrativas, bancos, diretório e logs como sensíveis.",
        "command": "Revisão manual com checklist de segurança",
        "expectedOutput": "Cada porta sensível deve ter origem restrita e justificativa forte.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Portas comuns e serviços corporativos” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Portas comuns e serviços corporativos”.",
    "validation": [
      {
        "check": "A matriz contém protocolo e porta separados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A matriz contém protocolo e porta separados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Cada fluxo possui dono e justificativa.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Cada fluxo possui dono e justificativa.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Portas administrativas não estão liberadas para origens amplas.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Portas administrativas não estão liberadas para origens amplas.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Bancos de dados não estão expostos diretamente à Internet.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Bancos de dados não estão expostos diretamente à Internet.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Há indicação de onde os logs seriam coletados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Há indicação de onde os logs seriam coletados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se Test-NetConnection falhar, valide DNS, rota, firewall e serviço em escuta.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se ss/netstat não mostrar processo, talvez você não tenha permissão elevada.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se UDP parecer silencioso, lembre que UDP não possui handshake.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se uma porta estiver em 127.0.0.1, ela pode estar disponível apenas localmente.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar revisão periódica da matriz.",
      "Integrar regras a Terraform/Ansible/Git.",
      "Criar alertas para portas críticas expostas.",
      "Relacionar matriz com CMDB, SIEM e inventário de vulnerabilidades."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Portas comuns e serviços corporativos” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Revisão de portas expostas",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "expectedDeliverable": "Matriz de fluxos com pelo menos oito portas comuns, riscos, controles e evidências de validação."
  },
  "mentorQuestions": [
    "Por que uma regra 'TCP 443 liberado' ainda pode ser insegura?",
    "Como você provaria que uma porta está aberta, bloqueada ou sem processo escutando?",
    "Quais portas você trataria como críticas em uma rede corporativa e por quê?"
  ],
  "quiz": [
    {
      "question": "Qual é a função principal de uma porta TCP/UDP?",
      "options": [
        "Identificar a aplicação/processo dentro do host",
        "Definir o endereço IP do servidor",
        "Substituir o DNS",
        "Criptografar o tráfego"
      ],
      "answer": 0,
      "explanation": "O IP identifica o host; a porta ajuda a entregar ao processo correto."
    },
    {
      "question": "Qual porta é tipicamente associada a HTTPS tradicional?",
      "options": [
        "22/TCP",
        "53/UDP",
        "443/TCP",
        "161/UDP"
      ],
      "answer": 2,
      "explanation": "HTTPS tradicional usa TCP/443, embora QUIC/HTTP/3 use UDP/443."
    },
    {
      "question": "Qual serviço costuma usar UDP/123?",
      "options": [
        "NTP",
        "DNS",
        "RDP",
        "PostgreSQL"
      ],
      "answer": 0,
      "explanation": "NTP usa UDP/123 para sincronização de horário."
    },
    {
      "question": "Por que expor RDP para 0.0.0.0/0 é perigoso?",
      "options": [
        "Porque impede DNS",
        "Porque amplia superfície para brute force e exploração",
        "Porque transforma RDP em UDP",
        "Porque remove logs automaticamente"
      ],
      "answer": 1,
      "explanation": "RDP público é alvo comum de ataques, brute force e exploração."
    },
    {
      "question": "O que deve existir em uma matriz madura de fluxos?",
      "options": [
        "Apenas porta",
        "Apenas IP de destino",
        "Origem, destino, protocolo, porta, justificativa, dono e log",
        "Somente nome da aplicação"
      ],
      "answer": 2,
      "explanation": "A matriz precisa permitir operação, auditoria e revisão de risco."
    },
    {
      "question": "Qual afirmação é correta?",
      "options": [
        "Toda porta 443 é tráfego web legítimo",
        "UDP sempre confirma conexão",
        "Porta aberta não prova aplicação saudável",
        "TCP nunca usa porta efêmera"
      ],
      "answer": 2,
      "explanation": "Porta aberta é apenas uma evidência; aplicação pode falhar em TLS, autenticação, backend ou lógica."
    }
  ],
  "flashcards": [
    {
      "front": "Porta",
      "back": "Identificador numérico usado por TCP/UDP para entregar dados ao processo correto."
    },
    {
      "front": "Well-known ports",
      "back": "Faixa 0-1023 associada a serviços comuns como DNS, HTTP, HTTPS e SSH."
    },
    {
      "front": "Porta efêmera",
      "back": "Porta temporária escolhida pelo cliente para iniciar um fluxo."
    },
    {
      "front": "TCP/443",
      "back": "Porta tradicional de HTTPS; não garante por si só que o tráfego é seguro ou legítimo."
    },
    {
      "front": "UDP/53",
      "back": "Consulta DNS comum; deve ser controlada para evitar bypass e exfiltração."
    },
    {
      "front": "Matriz de fluxos",
      "back": "Documento que relaciona origem, destino, protocolo, porta, serviço, justificativa, dono e logs."
    }
  ],
  "exercises": [
    {
      "title": "Classifique portas",
      "prompt": "Classifique 22, 53, 80, 443, 445, 5432, 3389 e 514 por serviço, protocolo comum e risco."
    },
    {
      "title": "Monte uma matriz",
      "prompt": "Crie cinco fluxos para uma aplicação web com DNS, HTTPS, banco, logs e administração."
    },
    {
      "title": "Diagnóstico",
      "prompt": "DNS resolve e ping responde, mas TCP/443 falha. Liste hipóteses e comandos de validação."
    },
    {
      "title": "Hardening",
      "prompt": "Proponha controles para SSH, RDP, PostgreSQL, DNS e syslog em uma empresa média."
    }
  ],
  "challenge": {
    "title": "Revisão de portas expostas",
    "scenario": "Uma empresa encontrou as portas 22, 80, 443, 445, 3389, 5432, 53/UDP e 161/UDP acessíveis a partir de uma rede ampla. Você deve transformar isso em uma matriz segura.",
    "tasks": [
      "Identificar serviço e risco de cada porta.",
      "Definir quais portas devem permanecer abertas e para quais origens.",
      "Indicar controles compensatórios.",
      "Indicar quais logs devem ser coletados.",
      "Criar uma recomendação executiva para priorização."
    ],
    "rubric": [
      "Classificação correta de serviços",
      "Restrições de origem adequadas",
      "Controles de autenticação e criptografia",
      "Integração com logs e SIEM",
      "Clareza operacional"
    ]
  },
  "commentedSolution": {
    "summary": "A solução segura não bloqueia tudo cegamente, mas também não mantém portas por conveniência. Serviços administrativos devem ir para bastion/ZTNA/VPN. Bancos devem aceitar apenas aplicação ou subnets específicas. DNS deve ir para resolvedores corporativos. SNMP deve usar v3 e origem restrita. SMB deve ser segmentado. Web pública deve passar por LB/WAF quando aplicável.",
    "matrixExample": [
      {
        "source": "Internet",
        "destination": "Load balancer público",
        "protocol": "TCP",
        "port": "443",
        "decision": "Permitir com TLS, WAF e logs"
      },
      {
        "source": "Bastion",
        "destination": "Servidores Linux",
        "protocol": "TCP",
        "port": "22",
        "decision": "Permitir restrito com MFA/chaves e logs"
      },
      {
        "source": "Rede usuários",
        "destination": "Banco PostgreSQL",
        "protocol": "TCP",
        "port": "5432",
        "decision": "Bloquear; permitir apenas aplicação"
      },
      {
        "source": "Estações",
        "destination": "DNS corporativo",
        "protocol": "UDP/TCP",
        "port": "53",
        "decision": "Permitir; bloquear resolvedores externos se política exigir"
      }
    ]
  },
  "glossary": [
    {
      "term": "Porta",
      "definition": "Número usado por TCP/UDP para identificar o endpoint de aplicação."
    },
    {
      "term": "Serviço",
      "definition": "Aplicação ou função que escuta e responde em uma porta."
    },
    {
      "term": "Porta efêmera",
      "definition": "Porta temporária usada pelo cliente como origem."
    },
    {
      "term": "Bind",
      "definition": "Ação de associar processo a IP, protocolo e porta."
    },
    {
      "term": "Matriz de fluxos",
      "definition": "Documento de governança para fluxos permitidos."
    },
    {
      "term": "Exposição",
      "definition": "Grau em que um serviço pode ser acessado por redes, usuários ou sistemas."
    }
  ],
  "references": [
    "IANA Service Name and Transport Protocol Port Number Registry",
    "RFC 6335 — Internet Assigned Numbers Authority Procedures for the Management of the Service Name and Transport Protocol Port Number Registry",
    "RFC 793 — Transmission Control Protocol",
    "RFC 768 — User Datagram Protocol",
    "Cisco, Microsoft, Linux e cloud provider documentation sobre portas e firewalls"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e IaC",
      "reason": "Portas devem ser tratadas como política versionada em infraestrutura como código."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Acesso administrativo",
      "reason": "SSH, RDP, LDAP, Kerberos e serviços administrativos dependem de identidade e controle de acesso."
    }
  ],
  "progressRules": {
    "completeAfter": [
      "readContent",
      "passQuiz",
      "completeLab"
    ],
    "minimumQuizScore": 70,
    "requiredLabId": "lab-6.6",
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
      "6.7"
    ]
  }
};
