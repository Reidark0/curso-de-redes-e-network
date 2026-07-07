export const lesson0607 = {
  "id": "6.7",
  "moduleId": "m06",
  "order": 7,
  "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
  "subtitle": "Entenda como endereços e portas são reescritos, como firewalls acompanham estados de conexão e por que NAT/PAT afeta troubleshooting, segurança, cloud e arquitetura corporativa.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "tcp",
    "udp",
    "nat",
    "pat",
    "firewall",
    "stateful",
    "conntrack",
    "segurança",
    "cloud",
    "devsecops",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.1",
      "title": "Por que a camada de transporte existe",
      "reason": "NAT/PAT depende da separação entre host, processo, porta e fluxo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "PAT usa portas para permitir muitos fluxos simultâneos atrás de um endereço público."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.3",
      "title": "TCP: handshake, estado e encerramento",
      "reason": "Firewalls stateful acompanham estados de conexão TCP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.5",
      "title": "UDP: simplicidade, latência e aplicações em tempo real",
      "reason": "UDP também passa por NAT e firewall, mas seu estado é temporário e baseado em timeout."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.6",
      "title": "Portas comuns e serviços corporativos",
      "reason": "Publicação, liberação e restrição de serviços dependem de protocolo e porta."
    }
  ],
  "objectives": [
    "Explicar por que NAT e PAT surgiram e quais problemas resolvem.",
    "Diferenciar SNAT, DNAT, PAT, port forwarding e NAT estático.",
    "Entender como um firewall stateful cria e consulta uma tabela de estado.",
    "Relacionar NAT/PAT com TCP, UDP, portas efêmeras, firewalls e logs.",
    "Diagnosticar falhas causadas por NAT, retorno assimétrico, timeout UDP e regra incompleta.",
    "Avaliar impactos de NAT em cloud, VPN, containers, Kubernetes e DevSecOps."
  ],
  "learningOutcomes": [
    "Ler uma tradução NAT e explicar endereço/porta antes e depois da tradução.",
    "Desenhar o caminho de ida e volta de uma conexão atravessando firewall stateful.",
    "Diferenciar regra de segurança, regra NAT e rota.",
    "Explicar por que ping pode funcionar enquanto uma conexão TCP/UDP falha.",
    "Montar uma matriz de publicação segura de serviços com logs e justificativa.",
    "Identificar riscos de port forwarding indevido, NAT duplo e ausência de rastreamento de conexão."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Quando um notebook com IP privado acessa um site na Internet, o servidor externo não responde diretamente para <code>192.168.1.50</code>. Esse endereço não é roteável publicamente. Ainda assim, a navegação funciona porque algum equipamento no caminho traduz o endereço interno para um endereço válido de saída e mantém uma tabela dizendo qual fluxo pertence a qual cliente.</p>\n  <p>O mesmo conceito aparece em empresas, firewalls, roteadores domésticos, cloud, Kubernetes, VPNs, balanceadores e proxies. NAT e PAT estão em quase todo lugar, mas muita gente só percebe sua existência quando algo falha: webhook não chega, aplicação não conecta, VPN sobrepõe CIDR, serviço responde pelo IP errado, logs mostram apenas o IP do firewall ou UDP para de funcionar depois de alguns segundos.</p>\n  <div class='callout'><strong>Ideia central:</strong> NAT/PAT não é apenas “compartilhar Internet”. É uma camada operacional que altera endereços e portas, cria dependência de estado, influencia logs, complica troubleshooting e pode esconder ou expor serviços.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>O IPv4 nasceu em uma época em que a quantidade de dispositivos conectados parecia administrável. Com a expansão da Internet, ficou claro que o espaço de endereços públicos seria insuficiente para todos os hosts do mundo.</p>\n  <p>Endereços privados e NAT se tornaram uma solução prática: redes internas poderiam usar blocos como <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code> e <code>192.168.0.0/16</code>, enquanto poucos endereços públicos seriam usados na borda. PAT ampliou essa ideia usando portas para distinguir milhares de conexões simultâneas atrás de um mesmo IP público.</p>\n  <p>Com o tempo, NAT deixou de ser apenas economia de IPv4. Passou a ser usado em publicação de serviços, segmentação, migração, cloud, sobreposição de redes, VPNs, containers e arquiteturas híbridas. Ao mesmo tempo, trouxe efeitos colaterais: quebra do modelo fim a fim, dependência de tabelas de estado, dificuldade de auditoria e complexidade em protocolos que carregam IP/porta dentro do payload.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O primeiro problema era escassez de endereços IPv4 públicos. O segundo era operacional: empresas precisavam separar redes internas da Internet, publicar alguns serviços controlados e permitir saída de muitos clientes usando poucos endereços públicos.</p>\n  <p>Sem NAT/PAT, cada host interno precisaria de um endereço público roteável ou dependeria de outra arquitetura. Sem firewall stateful, uma regra de saída teria de ser acompanhada manualmente por regras de retorno, aumentando risco e complexidade.</p>\n  <div class='callout callout--problem'><strong>Problema real:</strong> NAT resolve escassez e viabiliza muitas arquiteturas, mas não substitui firewall, autenticação, criptografia, segmentação, logs ou governança. Traduzir endereço não é proteger aplicação.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>No início, era comum pensar em NAT como recurso de roteador de borda. Uma rede interna privada acessava a Internet por um endereço público. Depois, a tradução passou a ser combinada com regras de firewall, inspeção stateful, port forwarding, VPNs e balanceadores.</p>\n  <p>Em datacenters, DNAT e VIPs passaram a publicar serviços internos por endereços externos. Em firewalls corporativos, SNAT passou a controlar saída por zonas. Em cloud, NAT gateways, internet gateways, load balancers, private endpoints e route tables tornaram a tradução parte do desenho da VPC/VNet.</p>\n  <p>Em containers e Kubernetes, NAT aparece em bridges, NodePorts, kube-proxy, masquerade, ingress e egress gateways. A consequência é que o profissional precisa entender o fluxo completo, e não apenas “qual porta foi liberada”.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>NAT</strong> significa Network Address Translation. É o processo de reescrever endereços IP em pacotes que atravessam um dispositivo intermediário. <strong>PAT</strong>, também chamado de NAT overload, reescreve endereços e portas para permitir que vários fluxos compartilhem o mesmo endereço externo.</p>\n  <table class='comparison-table'>\n    <thead><tr><th>Termo</th><th>O que muda</th><th>Uso típico</th><th>Risco comum</th></tr></thead>\n    <tbody>\n      <tr><td>SNAT</td><td>IP/porta de origem</td><td>Saída de clientes internos para Internet</td><td>Logs externos mostram o IP traduzido, não o host real.</td></tr>\n      <tr><td>DNAT</td><td>IP/porta de destino</td><td>Publicar serviço interno por IP externo/VIP</td><td>Expor serviço sensível por engano.</td></tr>\n      <tr><td>PAT</td><td>IP e porta, geralmente de origem</td><td>Muitos clientes usando um IP público</td><td>Esgotamento de portas, troubleshooting difícil e logs insuficientes.</td></tr>\n      <tr><td>NAT estático</td><td>Mapeamento fixo 1:1</td><td>Servidor ou equipamento com tradução previsível</td><td>Falsa sensação de segurança por “não estar direto”.</td></tr>\n      <tr><td>Port forwarding</td><td>Destino externo porta X para interno porta Y</td><td>Acesso externo controlado a serviço interno</td><td>Abrir administração ou banco para origens amplas.</td></tr>\n    </tbody>\n  </table>\n  <p>Um <strong>firewall stateful</strong> não decide apenas por pacote isolado. Ele acompanha fluxos em uma tabela de estado. Se uma conexão de saída é permitida, o retorno esperado pode ser permitido porque pertence ao mesmo fluxo.</p>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Imagine um cliente <code>10.10.10.25:51544</code> acessando <code>203.0.113.80:443</code>. Ao sair, o firewall altera a origem para algo como <code>198.51.100.10:62001</code>. O servidor externo responde para esse endereço traduzido. Quando a resposta retorna, o firewall consulta sua tabela e desfaz a tradução para entregar ao cliente original.</p>\n  <ol class='flow-list'>\n    <li>Cliente cria socket com IP/porta de origem e destino.</li>\n    <li>Firewall avalia política de saída.</li>\n    <li>Dispositivo aplica SNAT/PAT e cria entrada na tabela de tradução.</li>\n    <li>Pacote chega ao destino com origem traduzida.</li>\n    <li>Resposta retorna para o IP/porta traduzidos.</li>\n    <li>Firewall consulta estado/tradução e entrega ao host interno original.</li>\n    <li>Quando o fluxo encerra ou expira, a entrada é removida.</li>\n  </ol>\n  <p>Em TCP, o firewall pode acompanhar SYN, SYN-ACK, ACK, FIN e RST. Em UDP, como não há conexão formal, o estado é inferido por pacotes e removido por timeout. Por isso, aplicações UDP podem falhar quando intervalos de keepalive são maiores que o timeout do firewall/NAT.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura corporativa com NAT/PAT envolve pelo menos cinco planos: endereçamento, roteamento, tradução, política e observabilidade. A rota decide para onde enviar. A regra NAT decide o que traduzir. A política decide permitir ou bloquear. O estado rastreia o fluxo. O log permite investigar.</p>\n  <table class='data-table'>\n    <thead><tr><th>Camada operacional</th><th>Pergunta</th><th>Exemplo</th></tr></thead>\n    <tbody>\n      <tr><td>Rota</td><td>Por onde o pacote sai?</td><td>Default route para firewall ou NAT Gateway.</td></tr>\n      <tr><td>NAT</td><td>Qual IP/porta será reescrito?</td><td>10.0.1.20:51544 → 203.0.113.10:62001.</td></tr>\n      <tr><td>Política</td><td>O fluxo é permitido?</td><td>Usuários podem sair para TCP/443; bancos não podem sair para Internet.</td></tr>\n      <tr><td>Estado</td><td>O retorno pertence a fluxo permitido?</td><td>Tabela stateful permite resposta do servidor.</td></tr>\n      <tr><td>Log</td><td>Como provar origem real e destino real?</td><td>Flow logs, firewall logs, NAT logs e logs de aplicação.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em uma empresa onde todos os funcionários enviam correspondência externa usando o endereço da sede. O correio externo vê apenas o endereço da empresa. Internamente, a recepção mantém uma tabela dizendo qual envelope pertence a qual funcionário.</p>\n  <p>PAT é como a recepção adicionar um número de protocolo diferente para cada correspondência. Quando a resposta volta, o protocolo permite entregar ao funcionário correto.</p>\n  <div class='callout'><strong>Limite da analogia:</strong> em redes, a tabela expira, protocolos têm estados diferentes, pacotes podem seguir caminhos assimétricos e firewalls podem permitir ou bloquear retorno conforme política.</div>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Seu notebook possui IP <code>192.168.1.50</code>. Ao acessar um site HTTPS, o roteador doméstico troca a origem para o IP público da sua conexão. O site responde para esse IP público. O roteador usa a tabela PAT para entregar a resposta ao notebook correto.</p>\n  <p>Se outro celular da casa acessa o mesmo site ao mesmo tempo, o roteador diferencia os fluxos usando portas externas diferentes.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, usuários saem para Internet via firewall corporativo com SNAT/PAT. Servidores internos talvez não tenham saída direta, ou saiam por proxy. Uma aplicação publicada na DMZ pode usar DNAT a partir de um IP público para um IP privado.</p>\n  <p>A segurança exige separar regras: uma coisa é permitir saída de usuários para HTTPS; outra é publicar um servidor interno; outra é permitir que uma API fale com banco. Cada fluxo precisa de origem, destino, protocolo, porta, justificativa, dono, log e prazo de revisão.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, uma subnet privada frequentemente não possui IP público nas instâncias. Para acessar atualizações externas, ela usa NAT Gateway ou firewall virtual. Para receber tráfego externo, usa load balancer, public IP, gateway ou regra DNAT controlada.</p>\n  <p>O erro comum é acreditar que “subnet privada” significa segurança automática. Se a route table aponta para NAT Gateway e os security groups permitem saída ampla, workloads podem iniciar conexões externas. Se logs de NAT/flow não estão habilitados, a investigação fica limitada.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines, runners, clusters Kubernetes e ambientes efêmeros usam NAT com frequência. Um runner privado baixa dependências pela Internet via NAT Gateway; um pod sai com IP do node; um egress gateway mascara origens internas; um ingress traduz tráfego externo para serviços internos.</p>\n  <p>Em infraestrutura como código, regras NAT e firewall devem ser revisadas como código crítico. Um erro em Terraform pode expor uma porta, remover logs, permitir <code>0.0.0.0/0</code> ou criar caminho que desvia de inspeção.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Para o SOC, NAT pode atrapalhar atribuição de origem. Um alerta externo pode apontar apenas o IP público do firewall. Sem logs de tradução com horário confiável, porta de origem e destino, fica difícil descobrir qual host interno iniciou o fluxo.</p>\n  <p>NAT também pode mascarar tráfego indevido: exfiltração por HTTPS, DNS ou QUIC pode aparecer como saída legítima se não houver inspeção, proxy, DNS controlado, egress filtering e correlação com identidade/host.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> NAT não é controle de acesso suficiente. Combine NAT com firewall stateful, menor privilégio, logs, segmentação, autenticação, criptografia, inspeção adequada e revisão contínua.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 960 520' role='img' aria-labelledby='m06l07-title m06l07-desc'>\n    <title id='m06l07-title'>NAT, PAT e firewall stateful</title>\n    <desc id='m06l07-desc'>Cliente interno acessa servidor externo por meio de firewall que traduz endereço e porta e mantém tabela de estado.</desc>\n    <defs>\n      <marker id='m06l07-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path class='svg-flow' d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n    <rect class='svg-zone' x='35' y='55' width='250' height='390' rx='18'></rect>\n    <text class='svg-label' x='160' y='88' text-anchor='middle'>Rede privada</text>\n    <rect class='svg-node svg-node--client' x='85' y='165' width='150' height='72' rx='12'></rect>\n    <text class='svg-label' x='160' y='195' text-anchor='middle'>Cliente</text>\n    <text class='svg-label svg-label--small' x='160' y='218' text-anchor='middle'>10.10.10.25:51544</text>\n\n    <rect class='svg-node svg-node--firewall' x='385' y='130' width='190' height='130' rx='16'></rect>\n    <text class='svg-label' x='480' y='165' text-anchor='middle'>Firewall</text>\n    <text class='svg-label svg-label--small' x='480' y='190' text-anchor='middle'>Stateful + PAT</text>\n    <text class='svg-label svg-label--small' x='480' y='214' text-anchor='middle'>203.0.113.10:62001</text>\n\n    <rect class='svg-node svg-node--server' x='725' y='165' width='155' height='72' rx='12'></rect>\n    <text class='svg-label' x='802' y='195' text-anchor='middle'>Servidor HTTPS</text>\n    <text class='svg-label svg-label--small' x='802' y='218' text-anchor='middle'>198.51.100.80:443</text>\n\n    <path class='svg-flow svg-flow--request animated-flow' d='M235 200 C295 200, 325 195, 385 195' marker-end='url(#m06l07-arrow)'></path>\n    <path class='svg-flow svg-flow--request animated-flow' d='M575 195 C630 195, 675 200, 725 200' marker-end='url(#m06l07-arrow)'></path>\n    <path class='svg-flow svg-flow--response animated-flow' d='M725 236 C650 300, 560 300, 505 260' marker-end='url(#m06l07-arrow)'></path>\n    <path class='svg-flow svg-flow--response animated-flow' d='M455 260 C350 325, 240 290, 180 237' marker-end='url(#m06l07-arrow)'></path>\n\n    <rect class='svg-node svg-node--security' x='330' y='330' width='300' height='100' rx='14'></rect>\n    <text class='svg-label' x='480' y='362' text-anchor='middle'>Tabela de estado/NAT</text>\n    <text class='svg-label svg-label--small' x='480' y='388' text-anchor='middle'>10.10.10.25:51544 ⇄ 203.0.113.10:62001</text>\n    <text class='svg-label svg-label--small' x='480' y='414' text-anchor='middle'>destino: 198.51.100.80:443</text>\n\n    <rect class='svg-badge' x='120' y='465' width='720' height='36' rx='10'></rect>\n    <text class='svg-label svg-label--small' x='480' y='488' text-anchor='middle'>Rota leva ao firewall; NAT traduz; política permite; estado libera retorno; logs preservam evidência.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai mapear um fluxo que atravessa NAT/PAT, identificar origem antes/depois da tradução, validar estado de conexão e montar uma matriz de evidências. O foco é defensivo e operacional.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios reforçam diferença entre rota, NAT, política, estado e log.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário de aplicação publicada por DNAT e saída de servidores por PAT. Seu objetivo será identificar riscos, logs necessários e correções de arquitetura.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra como separar publicação, saída, retorno, inspeção stateful, logging e menor privilégio.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>NAT e PAT reescrevem endereços e portas para viabilizar saída, publicação e integração entre redes. Firewalls stateful acompanham fluxos para permitir retorno esperado. Esses mecanismos são essenciais, mas trazem complexidade: estado, timeouts, logs, assimetria, port forwarding, NAT duplo, esgotamento de portas e atribuição de origem.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, vamos praticar <strong>troubleshooting TCP/UDP com netstat, ss, tcpdump e Wireshark</strong>, investigando fluxos reais de ponta a ponta.</p>\n</section>\n"
  },
  "networkContext": {
    "whereItFits": "Camada de transporte, borda de rede, firewall, publicação de serviços, saída para Internet, cloud e troubleshooting de fluxos.",
    "before": "O estudante já entende portas, sockets, TCP, UDP, serviços comuns, DNS e roteamento.",
    "after": "A aula prepara troubleshooting avançado TCP/UDP, captura de pacotes, hardening de exposição e diagnóstico ponta a ponta.",
    "dependsOn": [
      "m04",
      "m06",
      "m07",
      "8.1",
      "8.2",
      "8.3",
      "8.5",
      "8.6"
    ]
  },
  "protocolFields": [
    {
      "name": "Endereço de origem original",
      "description": "IP privado ou interno do host que iniciou o fluxo."
    },
    {
      "name": "Porta de origem original",
      "description": "Porta efêmera escolhida pelo cliente ou porta do serviço em cenários específicos."
    },
    {
      "name": "Endereço de origem traduzido",
      "description": "IP externo, público, de firewall, NAT Gateway ou interface de saída."
    },
    {
      "name": "Porta de origem traduzida",
      "description": "Porta usada pelo PAT para diferenciar fluxos simultâneos."
    },
    {
      "name": "Destino original",
      "description": "IP/porta que o cliente tentou acessar antes de qualquer DNAT."
    },
    {
      "name": "Destino traduzido",
      "description": "IP/porta interno usado após DNAT ou port forwarding."
    },
    {
      "name": "Estado da conexão",
      "description": "Entrada mantida pelo firewall/conntrack para permitir retorno esperado."
    },
    {
      "name": "Timeout",
      "description": "Tempo até remover estado de fluxo ocioso, especialmente relevante em UDP."
    }
  ],
  "packetFlow": [
    "Cliente cria fluxo TCP ou UDP com IP/porta de origem e destino.",
    "Rota encaminha o pacote para o firewall, roteador, NAT Gateway ou nó de saída.",
    "Política verifica se o fluxo é permitido.",
    "NAT/PAT reescreve endereço e possivelmente porta de origem ou destino.",
    "Dispositivo cria entrada de tradução e estado.",
    "Destino responde para o endereço/porta traduzidos.",
    "Dispositivo consulta a tabela de estado e desfaz a tradução.",
    "Fluxo é encerrado por FIN/RST ou expira por timeout."
  ],
  "deepDive": {
    "title": "NAT, segurança e o mito da proteção automática",
    "content": "NAT frequentemente é confundido com firewall porque hosts internos não ficam diretamente endereçáveis pela Internet. Isso reduz exposição direta em alguns cenários, mas não é uma política de segurança completa. Se um host interno inicia conexão maliciosa para fora, NAT permitirá tradução se a política permitir saída. Se DNAT publica um serviço inseguro, NAT apenas encaminhará a exposição. Segurança depende de política, autenticação, segmentação, inspeção, logs e governança.",
    "questions": [
      "Por que NAT não substitui firewall?",
      "Quais logs são necessários para descobrir o host interno por trás de um IP público compartilhado?",
      "Como NAT duplo pode atrapalhar troubleshooting e publicação de serviços?"
    ]
  },
  "commonMistakes": [
    "Confundir rota com regra NAT.",
    "Achar que NAT é controle de acesso suficiente.",
    "Publicar RDP, SSH, banco ou painel administrativo por port forwarding amplo.",
    "Não registrar logs de tradução com porta de origem e horário confiável.",
    "Ignorar timeout UDP em aplicações de voz, VPN, jogos, DNS ou QUIC.",
    "Criar NAT duplo sem documentação.",
    "Permitir saída 0.0.0.0/0 sem egress filtering ou proxy.",
    "Quebrar fluxo stateful por caminho assimétrico."
  ],
  "troubleshooting": {
    "symptoms": [
      "Aplicação funciona internamente, mas falha pela Internet.",
      "Cliente sai para Internet, mas servidor externo vê apenas o IP do firewall.",
      "Resposta volta por caminho diferente e firewall derruba o fluxo.",
      "UDP funciona no começo e falha depois de inatividade.",
      "Port forwarding aponta para IP interno errado.",
      "NAT Gateway esgota portas em picos de tráfego.",
      "Logs não permitem identificar o host interno original."
    ],
    "commands": [
      {
        "windows": [
          "netstat -ano",
          "Get-NetTCPConnection",
          "Test-NetConnection destino -Port 443",
          "tracert destino",
          "Resolve-DnsName destino"
        ],
        "linux": [
          "ss -tupan",
          "ip route get <destino>",
          "curl -v https://destino",
          "nc -vz destino 443",
          "sudo conntrack -L 2>/dev/null | head",
          "sudo tcpdump -n host <ip> and port <porta>"
        ],
        "cisco": [
          "show ip nat translations",
          "show ip nat statistics",
          "show access-lists",
          "show logging",
          "show ip route",
          "show platform hardware qfp active feature nat datapath statistics"
        ],
        "cloud": [
          "Revisar route tables",
          "Revisar NAT Gateway e métricas de portas/conexões",
          "Consultar flow logs",
          "Revisar security groups/NSGs/NACLs",
          "Validar regras de load balancer e target health"
        ]
      }
    ],
    "method": [
      "Confirme origem real, destino real, protocolo e porta.",
      "Verifique rota de ida até o dispositivo NAT/firewall.",
      "Verifique política de permissão antes da tradução.",
      "Confirme se a regra NAT correta está sendo aplicada.",
      "Valide tabela de estado/tradução durante o teste.",
      "Confirme rota de retorno e simetria do caminho.",
      "Colete logs com timestamp confiável, IP/porta original e IP/porta traduzidos."
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
      "Documentar regras NAT com dono, justificativa e prazo de revisão.",
      "Combinar NAT com política stateful de menor privilégio.",
      "Evitar publicação direta de administração e bancos.",
      "Habilitar logs de tradução, firewall, load balancer e flow logs.",
      "Usar bastion, VPN, ZTNA ou acesso just-in-time para administração.",
      "Controlar egress por proxy, DNS corporativo, inspeção e allowlists específicas.",
      "Monitorar esgotamento de portas em NAT Gateways e firewalls.",
      "Revisar NAT e firewall como código em pull requests."
    ],
    "badPractices": [
      "Abrir port forwarding para 0.0.0.0/0 sem necessidade.",
      "Usar NAT como justificativa para não aplicar firewall.",
      "Não registrar porta de origem traduzida em logs.",
      "Manter regras NAT órfãs depois de migrações.",
      "Permitir saída irrestrita de servidores sensíveis.",
      "Ignorar caminho assimétrico em firewalls stateful.",
      "Misturar NAT de produção e laboratório sem separação clara."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de serviços internos por DNAT indevido.",
        "description": "Risco relacionado à aula 6.7 — NAT, PAT, firewalls stateful e rastreamento de conexão.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Matriz de fluxos e regras revisadas periodicamente."
      },
      {
        "name": "Movimento lateral facilitado por regras internas amplas.",
        "description": "Risco relacionado à aula 6.7 — NAT, PAT, firewalls stateful e rastreamento de conexão.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall stateful com regras explícitas por origem/destino/porta."
      },
      {
        "name": "Exfiltração por tráfego de saída permitido sem inspeção.",
        "description": "Risco relacionado à aula 6.7 — NAT, PAT, firewalls stateful e rastreamento de conexão.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAT logs correlacionados com NTP e identidade de host/usuário."
      },
      {
        "name": "Falha de atribuição de origem por logs incompletos.",
        "description": "Risco relacionado à aula 6.7 — NAT, PAT, firewalls stateful e rastreamento de conexão.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação, DMZ e publicação via load balancer/proxy quando adequado."
      },
      {
        "name": "Bypass de firewall por rota assimétrica.",
        "description": "Risco relacionado à aula 6.7 — NAT, PAT, firewalls stateful e rastreamento de conexão.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Egress filtering e inspeção de saída."
      },
      {
        "name": "Esgotamento de portas PAT causando indisponibilidade.",
        "description": "Risco relacionado à aula 6.7 — NAT, PAT, firewalls stateful e rastreamento de conexão.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Alertas para criação de regras NAT amplas ou públicas."
      },
      {
        "name": "Protocolos incompatíveis ou frágeis atravessando NAT sem proteção adequada.",
        "description": "Risco relacionado à aula 6.7 — NAT, PAT, firewalls stateful e rastreamento de conexão.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Testes de conectividade e captura controlada antes de mudanças críticas."
      }
    ],
    "mitigations": [
      "Matriz de fluxos e regras revisadas periodicamente.",
      "Firewall stateful com regras explícitas por origem/destino/porta.",
      "NAT logs correlacionados com NTP e identidade de host/usuário.",
      "Segmentação, DMZ e publicação via load balancer/proxy quando adequado.",
      "Egress filtering e inspeção de saída.",
      "Alertas para criação de regras NAT amplas ou públicas.",
      "Testes de conectividade e captura controlada antes de mudanças críticas."
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
      "Matriz de fluxos e regras revisadas periodicamente.",
      "Firewall stateful com regras explícitas por origem/destino/porta.",
      "NAT logs correlacionados com NTP e identidade de host/usuário.",
      "Segmentação, DMZ e publicação via load balancer/proxy quando adequado.",
      "Egress filtering e inspeção de saída.",
      "Alertas para criação de regras NAT amplas ou públicas.",
      "Testes de conectividade e captura controlada antes de mudanças críticas."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-6.7",
    "title": "Mapeando NAT/PAT, firewall stateful e rastreamento de conexão",
    "labType": "cloud",
    "objective": "Construir uma matriz de fluxo com IP/porta original, IP/porta traduzidos, regra de firewall, estado e logs necessários para investigação.",
    "scenario": "Laboratório Neste laboratório, você vai mapear um fluxo que atravessa NAT/PAT, identificar origem antes/depois da tradução, validar estado de conexão e montar uma matriz de evidências. O foco é defensivo e operacional.",
    "topology": "Cliente interno → switch/roteador → firewall/NAT → Internet ou servidor de laboratório; opcionalmente Packet Tracer, roteador doméstico, firewall de laboratório, Linux com conntrack ou cloud com NAT Gateway.",
    "architecture": "Origem privada inicia conexão; dispositivo intermediário aplica política, tradução e estado; destino responde; dispositivo desfaz tradução e registra evidências.",
    "prerequisites": [
      "Terminal Windows ou Linux",
      "Ambiente próprio ou autorizado",
      "Opcional: Packet Tracer, Linux com NAT/conntrack ou cloud lab",
      "Não testar ou publicar serviços de terceiros"
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 180,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar o fluxo",
        "instruction": "Escolha um fluxo simples, como cliente interno acessando HTTPS externo ou VM privada saindo por NAT Gateway.",
        "command": "Windows: Test-NetConnection exemplo.com -Port 443\nLinux: curl -v https://exemplo.com",
        "expectedOutput": "Você identifica origem, destino, protocolo e porta.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “NAT, PAT, firewalls stateful e rastreamento de conexão” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Registrar endereço local e rota",
        "instruction": "Colete IP local, gateway e rota de saída.",
        "command": "Windows: ipconfig /all && route print\nLinux: ip addr && ip route && ip route get <destino>",
        "expectedOutput": "Você sabe por onde o pacote sai antes do NAT.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “NAT, PAT, firewalls stateful e rastreamento de conexão” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Verificar socket e porta efêmera",
        "instruction": "Observe conexões locais durante o teste.",
        "command": "Windows: netstat -ano | findstr :443\nLinux: ss -tnp '( dport = :443 )'",
        "expectedOutput": "Você vê porta local efêmera conectando ao destino.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “NAT, PAT, firewalls stateful e rastreamento de conexão” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Consultar tradução NAT quando disponível",
        "instruction": "Em firewall, Cisco, Linux ou cloud, verifique a tabela de tradução/estado.",
        "command": "Cisco: show ip nat translations\nLinux: sudo conntrack -L | grep <ip>\nCloud: consultar NAT Gateway metrics/flow logs",
        "expectedOutput": "Você identifica IP/porta antes e depois da tradução, quando a plataforma fornece essa evidência.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “NAT, PAT, firewalls stateful e rastreamento de conexão” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Validar política stateful",
        "instruction": "Confirme que a regra permite o fluxo de ida e que o retorno é permitido por estado, não por uma liberação ampla desnecessária.",
        "command": "show access-lists\nconsultar logs de firewall\nconsultar security groups/NSGs/NACLs",
        "expectedOutput": "Você separa regra de permissão, regra NAT e estado de retorno.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “NAT, PAT, firewalls stateful e rastreamento de conexão” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Testar um caso de falha controlado",
        "instruction": "Altere apenas em laboratório uma porta, destino ou regra para observar diferença entre timeout, refused e bloqueio por firewall.",
        "command": "Test-NetConnection destino -Port <porta>\nnc -vz destino <porta>\ntcpdump -n host <ip> and port <porta>",
        "expectedOutput": "Você consegue classificar a falha por evidência.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “NAT, PAT, firewalls stateful e rastreamento de conexão” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Montar matriz de evidências",
        "instruction": "Documente origem real, origem traduzida, destino, porta, regra, estado, log e dono.",
        "command": "Criar tabela em Markdown/planilha",
        "expectedOutput": "Você gera evidência auditável para operação e segurança.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “NAT, PAT, firewalls stateful e rastreamento de conexão” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "Ao final, você consegue explicar o fluxo antes e depois do NAT, quais regras permitiram a comunicação e quais logs seriam necessários em um incidente.",
    "validation": [
      {
        "check": "Fluxo testado com origem/destino/protocolo/porta definidos",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Fluxo testado com origem/destino/protocolo/porta definidos",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Rota de saída identificada",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Rota de saída identificada",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Porta efêmera observada",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Porta efêmera observada",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Tradução NAT ou evidência equivalente registrada",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Tradução NAT ou evidência equivalente registrada",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Política e logs documentados",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Política e logs documentados",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se não há tradução, verifique rota até o NAT/firewall.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se há tradução mas não retorno, verifique rota de retorno e estado.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se TCP fica em SYN-SENT, investigue firewall, rota, NAT ou serviço inacessível.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se UDP falha após inatividade, investigue timeout e keepalive.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se logs não identificam origem real, habilite logs de NAT com porta e horário.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Adicionar flow logs",
      "Adicionar alertas para regras NAT públicas",
      "Criar revisão periódica de port forwarding",
      "Representar regras em IaC",
      "Correlacionar logs com SIEM e inventário"
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
      "Qual evidência mostra que o laboratório de “NAT, PAT, firewalls stateful e rastreamento de conexão” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desenhe uma publicação segura e uma saída controlada",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns."
  },
  "mentorQuestions": [
    "Qual é a diferença entre permitir um fluxo no firewall e traduzi-lo com NAT?",
    "Que evidências você precisa para descobrir qual host interno acessou um IP externo por PAT?",
    "Por que caminho assimétrico quebra firewalls stateful?"
  ],
  "quiz": [
    {
      "question": "O que o PAT normalmente usa para diferenciar vários clientes atrás do mesmo IP público?",
      "options": [
        "Endereço MAC externo",
        "Portas traduzidas",
        "TTL",
        "Nome DNS"
      ],
      "answer": "Portas traduzidas",
      "explanation": "PAT usa portas para multiplexar vários fluxos sobre um mesmo endereço traduzido."
    },
    {
      "question": "Qual afirmação sobre firewall stateful está correta?",
      "options": [
        "Avalia apenas MAC de origem",
        "Acompanha estado de fluxos permitidos",
        "Dispensa regras de firewall",
        "Funciona apenas com UDP"
      ],
      "answer": "Acompanha estado de fluxos permitidos",
      "explanation": "Firewalls stateful mantêm tabela de estado para permitir retornos esperados."
    },
    {
      "question": "DNAT é mais associado a qual cenário?",
      "options": [
        "Saída de muitos clientes para Internet",
        "Publicação de serviço interno por endereço externo",
        "Sincronização NTP",
        "Cálculo de MTU"
      ],
      "answer": "Publicação de serviço interno por endereço externo",
      "explanation": "DNAT altera destino para encaminhar tráfego recebido a um host/serviço interno."
    },
    {
      "question": "Por que NAT pode dificultar investigação?",
      "options": [
        "Remove o DNS",
        "Altera evidências de origem/destino vistas por diferentes pontos",
        "Desativa TCP",
        "Impede qualquer log"
      ],
      "answer": "Altera evidências de origem/destino vistas por diferentes pontos",
      "explanation": "Antes e depois da tradução, sistemas veem endereços/portas diferentes."
    },
    {
      "question": "Qual risco aparece quando UDP atravessa NAT/firewall?",
      "options": [
        "Handshake obrigatório",
        "Timeout de estado por inatividade",
        "ARP deixa de existir",
        "DNS vira TCP sempre"
      ],
      "answer": "Timeout de estado por inatividade",
      "explanation": "UDP não tem conexão formal; firewalls inferem estado e removem por timeout."
    },
    {
      "question": "NAT substitui firewall?",
      "options": [
        "Sim, porque oculta IP privado",
        "Não, porque tradução não é política de acesso completa",
        "Sim, se for PAT",
        "Sim, em cloud"
      ],
      "answer": "Não, porque tradução não é política de acesso completa",
      "explanation": "NAT deve ser combinado com controles de acesso, logs, segmentação e autenticação."
    }
  ],
  "flashcards": [
    {
      "front": "NAT",
      "back": "Tradução de endereços IP em pacotes que atravessam um dispositivo intermediário."
    },
    {
      "front": "PAT",
      "back": "Tradução de endereço e porta para permitir vários fluxos usando o mesmo IP traduzido."
    },
    {
      "front": "SNAT",
      "back": "Tradução do endereço de origem, comum em saída para Internet."
    },
    {
      "front": "DNAT",
      "back": "Tradução do endereço de destino, comum em publicação de serviços internos."
    },
    {
      "front": "Firewall stateful",
      "back": "Firewall que acompanha estado de conexão/fluxo para decidir retorno esperado."
    },
    {
      "front": "Conntrack",
      "back": "Mecanismo/tabela de rastreamento de conexões usado para estado e NAT."
    }
  ],
  "exercises": [
    {
      "title": "Classifique a tradução",
      "prompt": "Um cliente 10.1.2.50:50100 sai para 8.8.8.8:53 e aparece como 203.0.113.10:62010. Que tipo de tradução ocorreu?",
      "expectedAnswer": "SNAT/PAT, pois origem e porta foram traduzidas para saída."
    },
    {
      "title": "Explique o retorno",
      "prompt": "Por que o pacote de resposta de 8.8.8.8:53 volta corretamente para 10.1.2.50?",
      "expectedAnswer": "Porque o dispositivo NAT mantém estado/tradução associando 203.0.113.10:62010 ao cliente interno original."
    },
    {
      "title": "Separe rota, NAT e política",
      "prompt": "Em uma falha de saída HTTPS, quais três coisas você verificaria separadamente?",
      "expectedAnswer": "Rota até o firewall/NAT, regra de firewall permitindo TCP/443 e regra/tabela NAT aplicando tradução correta."
    },
    {
      "title": "Avalie risco",
      "prompt": "Qual o risco de publicar TCP/3389 via DNAT para 0.0.0.0/0?",
      "expectedAnswer": "Exposição administrativa ampla, risco de brute force/exploit e necessidade de bastion/VPN/ZTNA/MFA em vez de publicação direta."
    }
  ],
  "challenge": {
    "title": "Desenhe uma publicação segura e uma saída controlada",
    "scenario": "Uma empresa precisa publicar uma API interna HTTPS para parceiros e permitir que servidores privados baixem atualizações externas. O bloco interno é 10.30.0.0/16. Há firewall de borda, DMZ, NAT Gateway e SIEM.",
    "tasks": [
      "Definir quais fluxos usam DNAT e quais usam SNAT/PAT",
      "Propor regras mínimas de firewall",
      "Listar logs necessários para investigação",
      "Indicar riscos de configuração ampla",
      "Sugerir alternativa para acesso administrativo"
    ],
    "rubric": [
      "Separa publicação de saída",
      "Usa menor privilégio por origem/destino/porta",
      "Inclui logs de NAT e firewall",
      "Evita administração pública",
      "Considera rota de retorno e estado"
    ]
  },
  "commentedSolution": {
    "summary": "A API deve ser publicada por load balancer/WAF ou DNAT controlado para zona adequada, com origem restrita aos parceiros quando possível. Servidores privados devem sair por SNAT/PAT/NAT Gateway com egress filtering. Logs de NAT, firewall, load balancer e aplicação precisam preservar IP/porta original e traduzidos.",
    "steps": [
      "Separar zona pública/DMZ, aplicação e dados.",
      "Publicar somente TCP/443 da API, evitando portas administrativas.",
      "Permitir saída de servidores apenas para repositórios/serviços necessários.",
      "Habilitar logs com NTP confiável e correlação no SIEM.",
      "Usar bastion, VPN, ZTNA ou acesso just-in-time para administração.",
      "Revisar regras NAT e firewall por IaC/pull request."
    ],
    "commonErrors": [
      "Publicar servidor diretamente com regra ampla",
      "Permitir saída any-any de servidores",
      "Não registrar porta traduzida",
      "Ignorar rota de retorno",
      "Confundir security group com NAT"
    ]
  },
  "glossary": [
    {
      "term": "NAT",
      "definition": "Tradução de endereços IP em pacotes que atravessam um dispositivo."
    },
    {
      "term": "PAT",
      "definition": "Tradução que também usa portas para multiplexar múltiplos fluxos."
    },
    {
      "term": "SNAT",
      "definition": "Tradução do endereço de origem."
    },
    {
      "term": "DNAT",
      "definition": "Tradução do endereço de destino."
    },
    {
      "term": "Port forwarding",
      "definition": "Encaminhamento de tráfego recebido em uma porta externa para serviço interno."
    },
    {
      "term": "Stateful firewall",
      "definition": "Firewall que acompanha estado de conexões e fluxos."
    },
    {
      "term": "Conntrack",
      "definition": "Tabela ou mecanismo de rastreamento de conexões usado por sistemas e firewalls."
    },
    {
      "term": "Egress filtering",
      "definition": "Controle do tráfego de saída permitido a partir de uma rede ou workload."
    }
  ],
  "references": [
    {
      "title": "RFC 1918 - Address Allocation for Private Internets",
      "type": "standard"
    },
    {
      "title": "RFC 3022 - Traditional IP Network Address Translator",
      "type": "standard"
    },
    {
      "title": "Documentação Cisco sobre NAT e PAT",
      "type": "vendor-doc"
    },
    {
      "title": "Documentação de provedores cloud sobre NAT Gateway, flow logs e security groups",
      "type": "cloud-doc"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud networking e IaC",
      "reason": "NAT Gateway, security groups e route tables são normalmente declarados como código."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Acesso administrativo seguro",
      "reason": "Bastion, ZTNA, MFA e acesso just-in-time reduzem necessidade de port forwarding administrativo."
    }
  ],
  "progressRules": {
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      },
    "minimumQuizScore": 70,
    "requiredArtifacts": [
      "Matriz de fluxo com NAT/PAT",
      "Tabela de evidências de logs",
      "Checklist de riscos de publicação"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "6.8"
    ]
  }
};
