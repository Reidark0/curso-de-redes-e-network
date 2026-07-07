export const lesson0609 = {
  "id": "6.9",
  "moduleId": "m06",
  "order": 9,
  "title": "Segurança em transporte: exposição, scans, TLS e hardening",
  "subtitle": "Entenda como reduzir a superfície de ataque em TCP/UDP, validar exposição de portas de forma autorizada, proteger serviços com TLS, mTLS, firewall, logs, hardening e governança operacional.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "tcp",
    "udp",
    "segurança",
    "hardening",
    "tls",
    "mtls",
    "firewall",
    "portas",
    "scans defensivos",
    "exposição",
    "logs",
    "zero trust"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "É necessário entender como fluxos chegam a processos e serviços."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "A exposição de serviços acontece por portas, sockets e binds."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "Scans, firewalls stateful e troubleshooting dependem do comportamento do handshake."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.6",
      "title": "Portas comuns e serviços corporativos",
      "reason": "Hardening exige reconhecer serviços críticos e portas administrativas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "Exposição externa e retorno de conexão dependem de NAT, estado e política."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.8",
      "title": "Troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark",
      "reason": "Validação defensiva precisa cruzar portas, captura e logs."
    }
  ],
  "objectives": [
    "Explicar por que portas abertas representam superfície de ataque e não apenas conectividade.",
    "Diferenciar exposição necessária, exposição acidental e exposição insegura.",
    "Usar varreduras autorizadas como validação defensiva de inventário e firewall.",
    "Entender o papel de TLS, mTLS, certificados e versões/cifras seguras na camada de transporte/aplicação.",
    "Criar uma matriz de hardening para serviços TCP/UDP corporativos.",
    "Relacionar transporte com Zero Trust, segmentação, logs, SIEM, cloud, Kubernetes e DevSecOps."
  ],
  "learningOutcomes": [
    "Classificar portas expostas por criticidade, dono, justificativa e controle compensatório.",
    "Identificar binds inseguros em 0.0.0.0 quando o serviço deveria escutar apenas localmente ou em rede privada.",
    "Interpretar resultados defensivos de scan sem confundir open, closed, filtered e serviço real.",
    "Avaliar riscos de TLS antigo, certificado expirado, CN/SAN incorreto, cadeia inválida e ausência de mTLS em fluxos sensíveis.",
    "Propor controles mínimos: firewall, allowlist, segmentação, autenticação forte, TLS, logs e monitoramento.",
    "Documentar achados de exposição de forma segura para correção por rede, segurança, plataforma e aplicação."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Até aqui você aprendeu que uma aplicação depende de nome, IP, rota, porta, protocolo, processo, firewall e NAT. Agora vem a pergunta de segurança: <strong>quais desses serviços deveriam estar acessíveis, de onde, por quem e com qual proteção?</strong></p>\n  <p>Uma porta aberta não é automaticamente uma vulnerabilidade, mas é uma superfície de ataque. Uma porta administrativa exposta para a Internet, um banco ouvindo em rede pública, um serviço interno sem TLS, um listener em <code>0.0.0.0</code> sem necessidade ou uma regra <code>0.0.0.0/0</code> podem transformar uma configuração funcional em um incidente.</p>\n  <div class='callout'><strong>Ideia central:</strong> segurança em transporte é controlar quem pode iniciar fluxos TCP/UDP, quais serviços respondem, como a sessão é protegida, como evidências são registradas e como mudanças são governadas.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No começo da Internet, muitos serviços eram expostos por padrão porque o ambiente era menor, mais acadêmico e menos hostil. Protocolos como Telnet, FTP, rlogin, POP3 e SMTP trafegavam credenciais ou dados sem proteção adequada. O foco era conectividade, não redução de superfície.</p>\n  <p>Com a popularização da Internet comercial e dos ataques automatizados, portas abertas passaram a ser continuamente descobertas, catalogadas e exploradas. A segurança de rede evoluiu com firewalls stateful, NAT/PAT, IDS/IPS, VPN, TLS, hardening de serviços, segmentação e monitoramento centralizado.</p>\n  <p>Hoje, a exposição não acontece apenas em servidores físicos. Ela aparece em security groups, Kubernetes Services, Ingress, Load Balancers, containers, pipelines, túneis, APIs, SaaS, DNS público e recursos criados por IaC. O problema moderno é manter inventário e intenção alinhados com a realidade.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema não é apenas ter portas abertas; é não saber por que elas estão abertas, quem é dono, quem pode acessá-las, se há autenticação, se há TLS, se o tráfego é logado e se a exposição foi aprovada. Em ambientes reais, uma porta temporária de teste pode virar produção invisível.</p>\n  <p>Outro problema é o falso conforto: NAT não é política de segurança completa, TLS não corrige autenticação fraca, scan não prova ausência de risco, firewall any-any interno não é segmentação, e porta fechada externamente não garante que o serviço esteja seguro internamente.</p>\n  <div class='callout callout--problem'><strong>Problema real:</strong> sem inventário, matriz de fluxos, hardening e monitoramento, a empresa não sabe diferenciar exposição necessária de exposição acidental.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A segurança em transporte evoluiu de bloqueios simples por porta para políticas baseadas em origem, destino, identidade, contexto, aplicação e postura. Firewalls stateful passaram a acompanhar conexões; load balancers passaram a terminar TLS; proxies passaram a inspecionar tráfego; e clouds passaram a aplicar regras por recurso, tag, subnet, identidade e workload.</p>\n  <p>O hardening também evoluiu. Antes bastava “fechar portas”. Hoje é preciso bind correto, mínimo privilégio, TLS moderno, certificados válidos, mTLS em fluxos sensíveis, logs estruturados, rate limiting, segmentação, revisão por pull request, drift detection e alertas de exposição inesperada.</p>\n  <p>Scans defensivos deixaram de ser atividade isolada e passaram a compor gestão contínua de superfície de ataque: inventário, validação de firewall, detecção de shadow IT, revisão de exceções e comprovação de conformidade.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Segurança em transporte é o conjunto de decisões e controles que determinam quais fluxos TCP/UDP podem existir, sob quais condições, com qual proteção criptográfica, com qual autenticação e com qual rastreabilidade.</p>\n  <table class='comparison-table'>\n    <thead><tr><th>Elemento</th><th>Pergunta de segurança</th><th>Controle típico</th></tr></thead>\n    <tbody>\n      <tr><td>Porta exposta</td><td>Este serviço precisa responder para esta origem?</td><td>Firewall, security group, ACL, NACL/NSG, NetworkPolicy.</td></tr>\n      <tr><td>Bind do serviço</td><td>Ele precisa escutar em todas as interfaces?</td><td>Bind em IP específico, localhost, rede privada ou sidecar.</td></tr>\n      <tr><td>TLS</td><td>O tráfego precisa de confidencialidade e integridade?</td><td>TLS 1.2/1.3, cadeia válida, rotação de certificados.</td></tr>\n      <tr><td>mTLS</td><td>Cliente e servidor precisam autenticação mútua?</td><td>Certificados de cliente, service mesh, PKI interna.</td></tr>\n      <tr><td>Scan defensivo</td><td>A realidade bate com a intenção?</td><td>Varredura autorizada, inventário, CMDB/IPAM e correção.</td></tr>\n      <tr><td>Logs</td><td>Conseguimos investigar e atribuir eventos?</td><td>Logs de firewall, LB, sistema, aplicação, SIEM e NTP correto.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um serviço escuta em uma porta, o sistema operacional registra um socket em estado de escuta. O endereço de bind define quem consegue chegar: <code>127.0.0.1</code> restringe ao próprio host; um IP privado restringe a uma interface específica; <code>0.0.0.0</code> escuta em todas as interfaces IPv4 disponíveis.</p>\n  <p>Quando um cliente inicia conexão TCP, o firewall pode permitir, bloquear silenciosamente, rejeitar ativamente ou permitir apenas após inspeção de estado. Em UDP, a ausência de handshake torna a avaliação mais dependente de logs, timeout e resposta da aplicação.</p>\n  <p>TLS entra depois da conectividade de transporte: primeiro é preciso chegar ao serviço; depois ocorre o handshake criptográfico, validação de certificado, negociação de versão/cifra e, quando aplicável, autenticação do cliente por mTLS.</p>\n  <ol class='flow-list'>\n    <li>Serviço faz bind em IP e porta.</li>\n    <li>Firewall/NAT/LB define quem pode chegar.</li>\n    <li>Cliente tenta conexão TCP ou datagrama UDP.</li>\n    <li>Controle stateful registra ou bloqueia o fluxo.</li>\n    <li>Aplicação negocia TLS ou responde em texto claro.</li>\n    <li>Logs registram decisão, identidade, origem, destino, porta e resultado.</li>\n  </ol>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura segura não se baseia apenas em “porta aberta ou fechada”. Ela usa camadas: DNS correto, roteamento previsível, firewall de borda, segmentação interna, load balancer, TLS, autenticação, autorização, logs, SIEM, gestão de certificados e revisão de mudanças.</p>\n  <p>Em cloud, isso aparece como security groups, NSGs, NACLs, route tables, WAF, load balancers, private endpoints, NAT Gateway, flow logs e policy as code. Em Kubernetes, aparece como Services, Ingress, NetworkPolicy, service mesh, mTLS e egress controlado.</p>\n  <table class='data-table'>\n    <thead><tr><th>Camada</th><th>Controle</th><th>Falha comum</th></tr></thead>\n    <tbody>\n      <tr><td>Host</td><td>Bind correto e firewall local</td><td>Serviço escutando em todas as interfaces sem necessidade.</td></tr>\n      <tr><td>Rede</td><td>ACL, firewall e segmentação</td><td>Any-any interno ou regras amplas para “resolver rápido”.</td></tr>\n      <tr><td>Borda/cloud</td><td>SG/NSG/NACL/LB/WAF</td><td>Porta administrativa aberta para a Internet.</td></tr>\n      <tr><td>Criptografia</td><td>TLS/mTLS/certificados</td><td>TLS antigo, certificado vencido ou cadeia inválida.</td></tr>\n      <tr><td>Operação</td><td>Logs, SIEM, inventário e revisão</td><td>Sem dono, sem justificativa e sem evidência de uso.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em um prédio corporativo. O IP é o endereço do prédio. A porta TCP/UDP é a sala ou balcão de atendimento. O firewall é a portaria. TLS é uma conversa em sala fechada com identificação do crachá do prédio. mTLS é quando os dois lados apresentam crachás válidos antes da conversa.</p>\n  <p>Um scan defensivo autorizado é como uma auditoria de portas: verificar quais salas estão abertas, quais deveriam estar, quem é responsável e quais têm controle de acesso. O erro seria sair testando portas de prédios de terceiros sem autorização; em redes, isso é antiético, pode ser ilegal e não faz parte deste curso.</p>\n  <div class='callout callout--warning'><strong>Limite da analogia:</strong> em redes, serviços podem ser criados automaticamente por pipelines e clouds. Por isso, a auditoria precisa ser contínua e integrada à governança técnica.</div>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você sobe um servidor web local. Se ele escuta em <code>127.0.0.1:8080</code>, apenas o próprio computador acessa. Se escuta em <code>0.0.0.0:8080</code>, qualquer interface do host pode receber conexões, dependendo do firewall.</p>\n  <p>O comportamento funcional pode ser o mesmo para você, mas o risco muda completamente. Para desenvolvimento local, <code>127.0.0.1</code> costuma ser mais seguro. Para expor a outros hosts, a exposição deve ser intencional, documentada e protegida.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa possui servidores de banco, aplicações internas, RDP/SSH de administração, DNS, DHCP, NTP, syslog e APIs. O desenho seguro exige que usuários não acessem banco diretamente, que administração venha de jump servers, que logs sejam enviados ao SIEM e que serviços internos usem TLS quando houver credenciais, tokens ou dados sensíveis.</p>\n  <p>Uma matriz de fluxos pode dizer: “aplicação A acessa banco B em 5432/TCP; origem: subnet app; destino: subnet dados; dono: time plataforma; logs: firewall e banco; criptografia: TLS obrigatório; acesso humano: proibido”. Isso transforma porta aberta em decisão governada.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, uma porta pode ficar exposta por um security group, NSG, load balancer público, IP público em VM, regra de NACL, Ingress Kubernetes ou serviço gerenciado. Como recursos são criados por IaC e pipelines, exposição acidental pode surgir rapidamente.</p>\n  <p>Boas práticas incluem usar sub-redes privadas, bastion ou acesso just-in-time, private endpoints, WAF para HTTP(S), TLS gerenciado, logs de fluxo, tags obrigatórias, policy as code e detecção de regras amplas como <code>0.0.0.0/0</code> em portas administrativas.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a segurança em transporte deve entrar no pipeline. Um pull request que cria um load balancer público, libera <code>22/TCP</code> para qualquer origem ou desativa TLS deve gerar alerta ou bloqueio. A decisão de exposição precisa ser revisável como código.</p>\n  <p>Checks úteis incluem lint de IaC, policy as code, inventário automático de portas, validação de certificados, testes de conectividade autorizados, verificação de TLS mínimo, checagem de DNS público e comparação entre matriz de fluxos aprovada e estado real.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Em uma investigação defensiva, o SOC recebe alerta de conexão externa para uma porta incomum. A análise deve responder: o serviço está realmente escutando? É esperado? Qual processo? Qual dono? Qual origem? O tráfego tem TLS? Há autenticação? A regra foi aprovada? Há evidências de varredura, brute force ou exploração?</p>\n  <p>O objetivo não é “rodar scan por rodar scan”. É validar a superfície autorizada, reduzir exposição, priorizar correções, monitorar tentativas e garantir que serviços críticos estejam protegidos por controles proporcionais ao risco.</p>\n  <div class='callout callout--security'><strong>Regra ética:</strong> varreduras e testes de exposição só devem ser feitos em ativos próprios, laboratório ou escopo explicitamente autorizado. Esta aula trata de validação defensiva.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m06l09-title m06l09-desc'>\n    <title id='m06l09-title'>Segurança em transporte, exposição, TLS e hardening</title>\n    <desc id='m06l09-desc'>Fluxo entre cliente, Internet, firewall, load balancer, serviço, TLS, logs, SIEM e controles de hardening.</desc>\n    <defs>\n      <marker id='m06l09-arrow' markerWidth='10' markerHeight='10' refX='9' refY='3' orient='auto' markerUnits='strokeWidth'>\n        <path class='svg-flow' d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n    <rect class='svg-zone' x='25' y='45' width='190' height='420' rx='18'></rect>\n    <text class='svg-label' x='120' y='78' text-anchor='middle'>Origem autorizada?</text>\n    <rect class='svg-node svg-node--client' x='55' y='125' width='130' height='72' rx='12'></rect>\n    <text class='svg-label' x='120' y='155' text-anchor='middle'>Cliente</text>\n    <text class='svg-label svg-label--small' x='120' y='178' text-anchor='middle'>porta efêmera</text>\n    <rect class='svg-node svg-node--attacker' x='55' y='275' width='130' height='78' rx='12'></rect>\n    <text class='svg-label' x='120' y='305' text-anchor='middle'>Scan não</text>\n    <text class='svg-label svg-label--small' x='120' y='330' text-anchor='middle'>autorizado bloqueado</text>\n\n    <rect class='svg-node svg-node--firewall' x='290' y='110' width='165' height='120' rx='16'></rect>\n    <text class='svg-label' x='372' y='145' text-anchor='middle'>Firewall/LB</text>\n    <text class='svg-label svg-label--small' x='372' y='170' text-anchor='middle'>allowlist + estado</text>\n    <text class='svg-label svg-label--small' x='372' y='195' text-anchor='middle'>TLS policy</text>\n\n    <rect class='svg-node svg-node--server' x='570' y='100' width='170' height='135' rx='16'></rect>\n    <text class='svg-label' x='655' y='135' text-anchor='middle'>Serviço</text>\n    <text class='svg-label svg-label--small' x='655' y='160' text-anchor='middle'>bind privado</text>\n    <text class='svg-label svg-label--small' x='655' y='185' text-anchor='middle'>TLS 1.2/1.3</text>\n    <text class='svg-label svg-label--small' x='655' y='210' text-anchor='middle'>auth + logs</text>\n\n    <rect class='svg-node svg-node--security' x='790' y='90' width='150' height='90' rx='14'></rect>\n    <text class='svg-label' x='865' y='125' text-anchor='middle'>SIEM</text>\n    <text class='svg-label svg-label--small' x='865' y='150' text-anchor='middle'>correlação</text>\n    <rect class='svg-node svg-node--cloud' x='790' y='270' width='150' height='95' rx='14'></rect>\n    <text class='svg-label' x='865' y='305' text-anchor='middle'>Governança</text>\n    <text class='svg-label svg-label--small' x='865' y='330' text-anchor='middle'>IaC + policy</text>\n\n    <path class='svg-flow svg-flow--request animated-flow' d='M185 160 C235 150, 260 150, 290 160' marker-end='url(#m06l09-arrow)'></path>\n    <path class='svg-flow svg-flow--blocked animated-flow' d='M185 315 C250 315, 270 260, 300 210' marker-end='url(#m06l09-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M455 165 C500 150, 530 150, 570 160' marker-end='url(#m06l09-arrow)'></path>\n    <path class='svg-flow svg-flow--response animated-flow' d='M570 205 C500 260, 430 255, 372 230' marker-end='url(#m06l09-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M740 150 C760 130, 775 125, 790 125' marker-end='url(#m06l09-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M655 235 C710 310, 750 320, 790 320' marker-end='url(#m06l09-arrow)'></path>\n\n    <rect class='svg-badge' x='190' y='485' width='600' height='42' rx='10'></rect>\n    <text class='svg-label svg-label--small' x='490' y='511' text-anchor='middle'>Hardening: menor exposição possível, TLS correto, autenticação forte, logs e revisão contínua.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai montar uma avaliação defensiva de exposição de serviços: inventariar portas locais, validar escopo autorizado, revisar binds, verificar TLS e produzir uma matriz de correção segura.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam análise de exposição, interpretação de resultados defensivos de scan, avaliação de TLS e desenho de regras mínimas.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário com serviços expostos em cloud e rede interna. Sua missão será classificar riscos, propor hardening e escrever uma matriz de fluxo aprovada.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada demonstra como reduzir exposição sem quebrar negócio: fechar portas sem dono, restringir origem, mover serviços para rede privada, exigir TLS/mTLS e ativar logs.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Segurança em transporte combina controle de exposição, validação defensiva, criptografia, autenticação, logs e governança. Uma porta aberta precisa ter dono, justificativa, origem permitida, proteção adequada e evidência de monitoramento.</p>\n  <p>Scans defensivos autorizados ajudam a comparar intenção e realidade. TLS protege confidencialidade e integridade, mas não substitui firewall, autenticação, autorização ou hardening. O objetivo é reduzir superfície sem impedir fluxos legítimos.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, faremos a <strong>Revisão prática: diagnosticar fluxo de aplicação ponta a ponta</strong>, conectando DNS, IP, rota, porta, TCP/UDP, NAT, firewall, TLS, logs e aplicação em um laboratório final.</p>\n</section>\n"
  },
  "networkContext": {
    "whereItFits": "Camada de transporte aplicada à segurança defensiva, hardening de serviços, exposição controlada e governança de fluxos.",
    "before": "O estudante já entende portas, sockets, TCP, UDP, NAT, firewall stateful e troubleshooting com captura.",
    "after": "A aula prepara a revisão ponta a ponta da aplicação e os módulos posteriores de HTTP, TLS, proxies, VPNs e segurança avançada.",
    "dependsOn": [
      "m04",
      "m06",
      "m07",
      "8.1",
      "8.2",
      "8.3",
      "8.6",
      "8.7",
      "8.8"
    ]
  },
  "protocolFields": [
    {
      "name": "Protocolo",
      "description": "TCP ou UDP, determinando handshake, estado, timeout e comportamento de firewall."
    },
    {
      "name": "IP de origem",
      "description": "Origem autorizada ou não autorizada do fluxo."
    },
    {
      "name": "Porta de origem",
      "description": "Porta efêmera ou origem de serviço usada para correlação."
    },
    {
      "name": "IP de destino",
      "description": "Host, VIP, load balancer, NAT público ou endpoint privado."
    },
    {
      "name": "Porta de destino",
      "description": "Serviço exposto, como 443/TCP, 22/TCP, 53/UDP ou 3389/TCP."
    },
    {
      "name": "Estado",
      "description": "Aberto, fechado, filtrado, estabelecido, recusado, resetado ou sem resposta."
    },
    {
      "name": "TLS",
      "description": "Versão, certificado, cadeia, SAN, validade, cifra e necessidade de mTLS."
    },
    {
      "name": "Log",
      "description": "Evidência de allow/deny, tradução NAT, autenticação, erro TLS ou resposta da aplicação."
    }
  ],
  "packetFlow": [
    "Serviço faz bind em IP e porta conforme configuração.",
    "Matriz de fluxo define origem, destino, protocolo, porta e justificativa.",
    "Firewall, SG/NSG/NACL ou NetworkPolicy aplica controle de alcance.",
    "Cliente autorizado inicia conexão ou envia datagrama.",
    "Controle stateful registra fluxo e decisão.",
    "Serviço negocia TLS, autenticação e autorização quando aplicável.",
    "Logs de rede, sistema e aplicação registram resultado.",
    "Validação defensiva compara inventário esperado com portas realmente expostas."
  ],
  "deepDive": {
    "title": "TLS não é sinônimo de serviço seguro",
    "content": "TLS protege o canal contra leitura e alteração por terceiros quando configurado corretamente. Porém, um serviço com TLS ainda pode estar exposto para origem errada, aceitar autenticação fraca, usar certificado inválido, permitir versão/cifra obsoleta, não registrar logs, executar com privilégio excessivo ou ter vulnerabilidade na aplicação. Segurança em transporte é uma camada, não o controle inteiro.",
    "questions": [
      "Por que uma porta 443 aberta para 0.0.0.0/0 ainda pode ser risco?",
      "Quando mTLS é mais apropriado do que TLS apenas no servidor?",
      "Por que logs de firewall e aplicação precisam estar sincronizados por NTP?"
    ]
  },
  "commonMistakes": [
    "Tratar NAT como firewall suficiente.",
    "Expor SSH, RDP, banco de dados ou painel administrativo para 0.0.0.0/0.",
    "Usar TLS antigo ou certificado expirado em serviço crítico.",
    "Fazer scan fora do escopo autorizado.",
    "Concluir que uma porta filtrada externamente está segura internamente.",
    "Manter CORS, firewall e allowlist amplos para compensar falta de arquitetura.",
    "Não registrar dono, justificativa, criticidade e validade da exceção.",
    "Não revisar portas abertas após incidentes, migrações e mudanças de pipeline."
  ],
  "troubleshooting": {
    "symptoms": [
      "Serviço acessível da Internet sem justificativa.",
      "Porta administrativa aberta para qualquer origem.",
      "TLS falha por certificado expirado ou nome incorreto.",
      "Scan defensivo mostra porta aberta que não consta no inventário.",
      "Firewall permite o fluxo, mas aplicação rejeita por TLS ou autenticação.",
      "Porta aberta em 0.0.0.0 quando deveria estar em 127.0.0.1 ou IP privado.",
      "Logs mostram conexões de origens inesperadas.",
      "Serviço UDP responde a origens externas sem necessidade."
    ],
    "commands": [
      {
        "windows": [
          "netstat -ano",
          "Get-NetTCPConnection -State Listen",
          "Get-NetUDPEndpoint",
          "Test-NetConnection destino -Port 443",
          "Resolve-DnsName destino",
          "Get-Process -Id <PID>"
        ],
        "linux": [
          "ss -tulpen",
          "sudo lsof -i -P -n",
          "sudo tcpdump -n host <ip> and port <porta>",
          "openssl s_client -connect <host>:443 -servername <nome>",
          "curl -vk https://<host>",
          "nmap -sT -Pn -p <portas> <alvo-autorizado>",
          "nmap -sU -Pn -p 53,123 <alvo-autorizado>"
        ],
        "wireshark": [
          "Filtro: tcp.port == 443",
          "Filtro: tls",
          "Filtro: tcp.flags.syn == 1",
          "Filtro: tcp.flags.reset == 1",
          "Filtro: udp.port == 53",
          "Filtro: ip.addr == <ip>"
        ],
        "cisco_firewall": [
          "show access-lists",
          "show logging",
          "show conn detail",
          "show service-policy",
          "show run access-group",
          "packet-tracer input <interface> tcp <src-ip> <src-port> <dst-ip> <dst-port>"
        ],
        "cloud": [
          "Revisar security groups/NSGs/NACLs",
          "Revisar load balancer listeners",
          "Revisar WAF e regras de origem",
          "Revisar flow logs",
          "Revisar certificados gerenciados",
          "Revisar políticas de IaC contra 0.0.0.0/0 em portas sensíveis"
        ]
      }
    ],
    "method": [
      "Definir escopo autorizado antes de qualquer validação ativa.",
      "Listar serviços esperados e donos.",
      "Verificar sockets locais e binds.",
      "Comparar firewall/cloud/IaC com matriz aprovada.",
      "Validar TLS/certificados quando o serviço usar criptografia.",
      "Cruzar logs com horário confiável.",
      "Classificar riscos por impacto, exposição e facilidade de correção.",
      "Propor correção mínima sem quebrar fluxo legítimo."
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
      "Manter matriz de fluxos com dono, justificativa e validade.",
      "Restringir origem por menor escopo possível.",
      "Evitar portas administrativas públicas; usar VPN, bastion, JIT ou acesso privado.",
      "Usar TLS 1.2/1.3 com certificados válidos e rotação planejada.",
      "Usar mTLS para fluxos serviço-a-serviço sensíveis.",
      "Ativar logs de firewall, load balancer, aplicação, sistema e cloud flow logs.",
      "Executar validações defensivas autorizadas e periódicas.",
      "Automatizar policy as code para bloquear exposições perigosas."
    ],
    "badPractices": [
      "Liberar 0.0.0.0/0 em RDP, SSH, bancos ou painéis administrativos.",
      "Deixar serviço de debug exposto após teste.",
      "Aceitar certificado inválido em produção como solução permanente.",
      "Fazer scan em ativos de terceiros sem autorização.",
      "Usar TLS antigo, cifras fracas ou certificado compartilhado sem controle.",
      "Não centralizar logs nem sincronizar horário.",
      "Abrir porta ampla para resolver incidente sem ticket de rollback."
    ],
    "risks": [
      "Enumeração de serviços expostos.",
      "Acesso indevido a administração remota.",
      "Brute force e credential stuffing em serviços expostos.",
      "Downgrade ou configuração fraca de TLS.",
      "Vazamento de dados por serviço interno exposto.",
      "Exfiltração por egress sem controle.",
      "Ausência de logs úteis para investigação."
    ],
    "mitigations": [
      "Segmentação por zona e matriz de comunicação.",
      "Firewall stateful e regras por origem/destino/porta.",
      "Bastion, VPN, private endpoint e acesso just-in-time.",
      "TLS/mTLS, rotação de certificado e validação de cadeia.",
      "Rate limiting, WAF, proteção contra abuso e alertas.",
      "Inventário contínuo, scan autorizado, CMDB/IPAM e revisão de exceções.",
      "SIEM, NTP confiável, retenção de logs e playbooks de resposta."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Segurança em transporte: exposição, scans, TLS e hardening",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Segmentação por zona e matriz de comunicação.",
      "Firewall stateful e regras por origem/destino/porta.",
      "Bastion, VPN, private endpoint e acesso just-in-time.",
      "TLS/mTLS, rotação de certificado e validação de cadeia.",
      "Rate limiting, WAF, proteção contra abuso e alertas.",
      "Inventário contínuo, scan autorizado, CMDB/IPAM e revisão de exceções.",
      "SIEM, NTP confiável, retenção de logs e playbooks de resposta."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-6.9",
    "title": "Avaliação defensiva de exposição, TLS e hardening de serviços",
    "labType": "security",
    "objective": "Construir um inventário defensivo de serviços TCP/UDP em escopo autorizado, validar binds, exposição, TLS, logs e propor hardening mínimo.",
    "scenario": "Laboratório Neste laboratório, você vai montar uma avaliação defensiva de exposição de serviços: inventariar portas locais, validar escopo autorizado, revisar binds, verificar TLS e produzir uma matriz de correção segura.",
    "topology": "Um host de laboratório com serviços locais, um cliente de teste, um firewall/cloud security group conceitual e um coletor de logs. Pode ser feito localmente, em VM isolada ou em laboratório Packet Tracer/GNS3/EVE-NG adaptado.",
    "architecture": "Cliente autorizado → firewall/security group → serviço TCP/UDP → logs locais/SIEM. Serviços administrativos devem estar restritos; serviços públicos devem ter TLS e logs.",
    "prerequisites": [
      "Ambiente próprio ou laboratório isolado.",
      "Windows ou Linux com permissões de leitura de sockets.",
      "Ferramentas: ss/netstat, curl, openssl, tcpdump/Wireshark opcional.",
      "Permissão explícita para qualquer teste ativo."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 180,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não execute scans em redes públicas ou de terceiros.",
      "Não capture tráfego de usuários sem autorização.",
      "Sanitize IPs, nomes, certificados e tokens antes de compartilhar evidências.",
      "Não abra portas amplas em produção para testar. Use janela, ticket e rollback."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir escopo autorizado",
        "instruction": "Liste os IPs/hosts do laboratório que podem ser avaliados.",
        "command": "# Exemplo de escopo: 127.0.0.1, VM local, subnet de laboratório",
        "expectedOutput": "Escopo documentado antes de qualquer teste ativo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Inventariar sockets locais",
        "instruction": "Verifique quais serviços estão escutando e em quais interfaces.",
        "command": "Linux: ss -tulpen\nLinux: sudo lsof -i -P -n\nWindows: netstat -ano\nWindows: Get-NetTCPConnection -State Listen",
        "expectedOutput": "Lista de portas, protocolos, processos e binds.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Classificar exposição esperada",
        "instruction": "Monte tabela com porta, serviço, dono, origem permitida e justificativa.",
        "command": "# Tabela: origem | destino | protocolo | porta | dono | justificativa | log | TLS",
        "expectedOutput": "Matriz inicial de exposição.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Validar conectividade autorizada",
        "instruction": "Teste apenas portas do escopo autorizado.",
        "command": "Linux: nc -vz <alvo> 443\nWindows: Test-NetConnection <alvo> -Port 443\nLinux: curl -vk https://<alvo>\nLinux autorizado: nmap -sT -Pn -p 22,80,443 <alvo-autorizado>",
        "expectedOutput": "Resultado de aberta, fechada, filtrada ou erro de aplicação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Verificar TLS",
        "instruction": "Para serviços HTTPS ou TLS, valide certificado, SNI e versão negociada.",
        "command": "openssl s_client -connect <host>:443 -servername <nome>\ncurl -Iv https://<nome>\n# Verifique validade, SAN, emissor, cadeia e protocolo negociado",
        "expectedOutput": "Informações de certificado e handshake TLS.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Revisar firewall/cloud/IaC",
        "instruction": "Compare regras declaradas com exposição observada.",
        "command": "# Cloud: revisar SG/NSG/NACL/listeners/flow logs\n# IaC: procurar 0.0.0.0/0 em portas sensíveis\n# Firewall: revisar ACLs e logs de allow/deny",
        "expectedOutput": "Diferenças entre intenção e realidade identificadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Produzir plano de hardening",
        "instruction": "Para cada achado, proponha correção mínima e rollback.",
        "command": "# Exemplo: restringir origem, fechar porta, mover para privado, exigir TLS, ativar log",
        "expectedOutput": "Plano priorizado por risco e impacto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Documentar evidências sanitizadas",
        "instruction": "Prepare relatório com hipótese, evidência, risco, recomendação e responsável.",
        "command": "# Remova tokens, IPs públicos sensíveis, nomes internos e dados pessoais",
        "expectedOutput": "Relatório seguro para NOC/SOC/DevSecOps.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança em transporte: exposição, scans, TLS e hardening” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, você terá uma matriz defensiva de exposição TCP/UDP, validação TLS e plano de hardening com evidências.",
    "validation": [
      {
        "check": "O laboratório é considerado concluído quando todas as portas observadas têm dono, justificativa, controle e recomendação documentados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O laboratório é considerado concluído quando todas as portas observadas têm dono, justificativa, controle e recomendação documentados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se um teste der timeout, verifique rota, firewall e se o serviço escuta no IP correto.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se der connection refused, o host respondeu, mas a porta não está aceitando conexão ou foi rejeitada ativamente.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se TLS falhar, confira nome usado, SNI, cadeia, validade e horário do sistema.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o scan autorizado divergir do inventário, trate como achado de governança.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o serviço só funciona localmente, confira bind em 127.0.0.1 versus 0.0.0.0/IP privado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Automatizar checagem de SG/NSG/NACL com policy as code.",
      "Adicionar monitoramento de certificado antes do vencimento.",
      "Integrar achados ao backlog de plataforma/segurança.",
      "Criar dashboard de portas expostas por ambiente e criticidade.",
      "Adicionar mTLS para fluxos serviço-a-serviço críticos."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Segurança em transporte: exposição, scans, TLS e hardening” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Hardening de exposição corporativa",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns."
  },
  "mentorQuestions": [
    "Qual evidência prova que uma porta está exposta e qual evidência prova que ela deveria estar exposta?",
    "Por que TLS não substitui firewall e autenticação?",
    "Como você diferenciaria scan defensivo autorizado de atividade indevida?"
  ],
  "quiz": [
    {
      "question": "Qual é o principal risco de um serviço administrativo exposto para 0.0.0.0/0?",
      "options": [
        "Apenas consumir banda",
        "Permitir tentativas de acesso de qualquer origem",
        "Impedir DNS reverso",
        "Reduzir RTT"
      ],
      "answer": 1,
      "explanation": "A exposição para qualquer origem aumenta superfície de ataque e tentativas automatizadas."
    },
    {
      "question": "O que significa um serviço escutando em 127.0.0.1?",
      "options": [
        "Está exposto para Internet",
        "Está restrito ao próprio host",
        "Usa UDP obrigatoriamente",
        "Está atrás de NAT"
      ],
      "answer": 1,
      "explanation": "127.0.0.1 é loopback; conexões remotas não chegam diretamente nele."
    },
    {
      "question": "TLS protege principalmente o quê?",
      "options": [
        "Roteamento dinâmico",
        "Confidencialidade e integridade do canal",
        "Quantidade de hops",
        "Endereço MAC"
      ],
      "answer": 1,
      "explanation": "TLS protege o canal, mas não substitui autorização, firewall ou hardening."
    },
    {
      "question": "Qual prática é adequada para scan defensivo?",
      "options": [
        "Testar qualquer IP público por curiosidade",
        "Executar somente em escopo autorizado",
        "Usar scans para derrubar serviços",
        "Ignorar logs"
      ],
      "answer": 1,
      "explanation": "Validações ativas precisam estar restritas a escopo próprio ou autorizado."
    },
    {
      "question": "Por que mTLS pode ser usado entre serviços?",
      "options": [
        "Para eliminar IP",
        "Para autenticar mutuamente cliente e servidor",
        "Para substituir NTP",
        "Para evitar DNS"
      ],
      "answer": 1,
      "explanation": "mTLS autentica os dois lados usando certificados."
    },
    {
      "question": "Qual evidência ajuda a investigar conexão permitida/bloqueada em cloud?",
      "options": [
        "Flow logs e regras de SG/NSG/NACL",
        "Somente wallpaper do servidor",
        "TTL de DNS apenas",
        "Endereço MAC do teclado"
      ],
      "answer": 0,
      "explanation": "Flow logs e regras de rede ajudam a correlacionar decisão e caminho do fluxo."
    }
  ],
  "flashcards": [
    {
      "front": "Porta aberta é sempre vulnerabilidade?",
      "back": "Não. Mas é superfície de ataque e precisa de justificativa, controle, logs e dono."
    },
    {
      "front": "O que é bind em 0.0.0.0?",
      "back": "O serviço escuta em todas as interfaces IPv4 disponíveis do host."
    },
    {
      "front": "TLS substitui firewall?",
      "back": "Não. TLS protege o canal; firewall controla alcance e fluxo."
    },
    {
      "front": "O que é mTLS?",
      "back": "TLS com autenticação mútua: cliente e servidor apresentam certificados."
    },
    {
      "front": "O que é scan defensivo autorizado?",
      "back": "Validação ativa em ativos próprios ou escopo formalmente autorizado para comparar intenção e realidade."
    },
    {
      "front": "O que deve existir em uma matriz de fluxo?",
      "back": "Origem, destino, protocolo, porta, dono, justificativa, criticidade, logs, validade e controle."
    }
  ],
  "exercises": [
    {
      "title": "Classifique exposições",
      "prompt": "Classifique: 22/TCP público, 443/TCP público com WAF, 5432/TCP privado da app para banco, 161/UDP público.",
      "expectedAnswer": "22 público e 161/UDP público são críticos; 443 pode ser aceitável com controles; 5432 privado pode ser adequado se restrito e logado."
    },
    {
      "title": "Analise bind",
      "prompt": "Um serviço de debug escuta em 0.0.0.0:9000 em um servidor de produção. Qual o risco e correção?",
      "expectedAnswer": "Risco de exposição em todas as interfaces. Corrigir removendo serviço, restringindo a 127.0.0.1 ou rede privada, firewall e autenticação."
    },
    {
      "title": "TLS inválido",
      "prompt": "Usuários recebem erro de certificado em serviço interno. Liste hipóteses.",
      "expectedAnswer": "Certificado vencido, SAN ausente/incorreto, cadeia não confiável, SNI incorreto, horário divergente, proxy interceptando, CN legado."
    },
    {
      "title": "Matriz mínima",
      "prompt": "Crie campos mínimos para matriz de fluxo de um serviço HTTPS interno.",
      "expectedAnswer": "Origem, destino, protocolo, porta, dono, justificativa, ambiente, criticidade, TLS, autenticação, logs, validade e aprovador."
    }
  ],
  "challenge": {
    "title": "Hardening de exposição corporativa",
    "scenario": "Você recebeu evidências de uma revisão: VM com 22/TCP aberto para 0.0.0.0/0, API 443/TCP pública com certificado válido, banco 5432/TCP acessível da subnet de usuários, SNMP 161/UDP exposto internamente com community padrão e um serviço debug em 0.0.0.0:9000.",
    "tasks": [
      "Classificar cada achado por criticidade.",
      "Propor correção mínima segura.",
      "Definir quais logs devem ser coletados.",
      "Indicar quais mudanças devem virar policy as code.",
      "Descrever validação pós-correção."
    ],
    "rubric": [
      "Identifica exposições administrativas e banco indevido como risco alto.",
      "Propõe restrição de origem, rede privada, bastion/JIT e fechamento de debug.",
      "Exige TLS/logs para API pública e monitoração de certificado.",
      "Recomenda SNMPv3 ou remoção/restrição de SNMP fraco.",
      "Inclui validação autorizada e evidências sanitizadas."
    ]
  },
  "commentedSolution": {
    "summary": "A correção segura reduz exposição sem destruir conectividade legítima.",
    "steps": [
      "22/TCP público: alto risco. Restringir a bastion/VPN/JIT, MFA e logs.",
      "API 443/TCP pública: aceitável se houver WAF/LB, TLS forte, autenticação, rate limiting e logs.",
      "Banco 5432/TCP da subnet de usuários: alto risco. Permitir apenas subnet de aplicação ou serviço autorizado.",
      "SNMP 161/UDP com community padrão: risco relevante. Migrar para SNMPv3, restringir origem e rotacionar credenciais.",
      "Debug 9000 em 0.0.0.0: risco alto. Desativar ou restringir a localhost/lab com autenticação e firewall.",
      "Criar policies para bloquear 0.0.0.0/0 em portas administrativas e exigir tags de dono/validade."
    ]
  },
  "glossary": [
    {
      "term": "Superfície de ataque",
      "definition": "Conjunto de pontos acessíveis que podem ser testados, abusados ou explorados."
    },
    {
      "term": "Hardening",
      "definition": "Redução de risco por configuração segura, remoção de excessos e aplicação de controles."
    },
    {
      "term": "TLS",
      "definition": "Protocolo que protege confidencialidade e integridade do canal entre cliente e servidor."
    },
    {
      "term": "mTLS",
      "definition": "TLS com autenticação mútua por certificados nos dois lados."
    },
    {
      "term": "Scan defensivo",
      "definition": "Validação ativa e autorizada para identificar exposição real de serviços."
    },
    {
      "term": "Bind",
      "definition": "Associação de um serviço a um endereço IP/interface e porta."
    },
    {
      "term": "Allowlist",
      "definition": "Lista de origens, destinos ou identidades explicitamente permitidas."
    },
    {
      "term": "Policy as code",
      "definition": "Políticas de segurança expressas como código para revisão e automação."
    }
  ],
  "references": [
    {
      "title": "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
      "type": "rfc",
      "note": "Base conceitual para TLS 1.3."
    },
    {
      "title": "NIST SP 800-52 Rev. 2",
      "type": "standard",
      "note": "Guia de seleção, configuração e uso de TLS em governo/empresa."
    },
    {
      "title": "OWASP Transport Layer Protection Cheat Sheet",
      "type": "guide",
      "note": "Boas práticas de proteção de transporte em aplicações."
    },
    {
      "title": "CIS Controls — Secure Configuration and Continuous Vulnerability Management",
      "type": "framework",
      "note": "Controles relacionados a inventário, hardening e gestão contínua."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Módulo de IaC e Policy as Code",
      "reason": "A validação de exposição deve ser automatizada em pipelines e revisão de infraestrutura como código."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Módulo de autenticação entre serviços",
      "reason": "mTLS, identidade de workloads e autorização complementam firewall e TLS."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 7",
      "reason": "DNS, DHCP, NTP e logs são dependências para validar e investigar fluxos de transporte."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "securityExample",
      "diagram",
      "lab",
      "challenge",
      "summary"
    ],
    "minimumQuizScore": 70,
    "requiredLabValidation": true,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "6.10"
    ],
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      }
  }
};
