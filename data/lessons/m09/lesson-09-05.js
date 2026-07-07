export const lesson0905 = {
  "id": "9.5",
  "moduleId": "m09",
  "order": 5,
  "title": "NAT, port forwarding e publicação controlada",
  "subtitle": "Entenda como endereços privados são traduzidos, como serviços internos são publicados e por que NAT não deve ser confundido com segurança, firewall ou arquitetura de exposição.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 280,
  "tags": [
    "redes",
    "network",
    "firewall",
    "NAT",
    "PAT",
    "DNAT",
    "SNAT",
    "port forwarding",
    "publicação",
    "DMZ",
    "cloud",
    "segurança",
    "troubleshooting",
    "p1-07",
    "firewall-lab-v2-final"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "title": "IPv4 público, privado, loopback e APIPA",
      "reason": "NAT existe principalmente por causa da diferença entre endereços privados e públicos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "title": "Por que subnetting existe",
      "reason": "Publicação controlada depende de separar redes internas, DMZ e subnets de borda."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "Esta aula aprofunda NAT dentro do contexto de política de tráfego e publicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.1",
      "title": "Por que firewalls existem",
      "reason": "Publicar um serviço é uma decisão de política, não apenas uma configuração de encaminhamento."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.4",
      "title": "Zonas, DMZ e segmentação segura",
      "reason": "Serviços publicados devem ficar em zonas apropriadas, normalmente DMZ, borda, ingress ou subnets públicas controladas."
    }
  ],
  "objectives": [
    "Explicar o que NAT resolve e o que NAT não resolve.",
    "Diferenciar SNAT, DNAT, PAT, static NAT, dynamic NAT e port forwarding.",
    "Descrever o caminho de ida e volta de uma conexão publicada com DNAT/port forwarding.",
    "Relacionar NAT com firewalls stateful, zonas, DMZ, proxies, WAFs e load balancers.",
    "Desenhar publicação controlada para serviços HTTP, SSH, VPN, APIs e aplicações internas.",
    "Diagnosticar falhas comuns de NAT usando regras, tabelas de tradução, logs, testes de porta e captura de pacotes."
  ],
  "learningOutcomes": [
    "Ler uma regra de NAT e identificar origem, destino original, destino traduzido, porta original, porta traduzida e zona envolvida.",
    "Explicar por que port forwarding expõe uma superfície de ataque e precisa de firewall, hardening e logs.",
    "Diferenciar acesso de saída via PAT de publicação inbound via DNAT.",
    "Identificar problemas de hairpin NAT, NAT assimétrico, double NAT, CGNAT e retorno por caminho diferente.",
    "Planejar publicação segura usando reverse proxy, WAF, load balancer, bastion, VPN ou acesso privado quando adequado.",
    "Construir uma matriz de publicação com dono, justificativa, validade, logging, origem permitida e rollback."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Quando uma empresa cria uma aplicação, um painel administrativo, uma API ou um servidor de acesso remoto, surge uma pergunta perigosa: <strong>como alguém de fora chegará até esse serviço?</strong></p>\n  <p>A resposta fácil costuma ser: “abre uma porta no firewall e aponta para o servidor”. Essa frase parece simples, mas pode transformar um host interno em alvo público da Internet. NAT e port forwarding permitem que tráfego chegue a serviços internos, mas não dizem se esse tráfego deveria chegar, se a aplicação está protegida, se há WAF, se há logs, se a origem é confiável ou se existe rota de retorno correta.</p>\n  <div class='callout'><strong>Ideia central:</strong> NAT é tradução de endereços. Publicação segura é arquitetura, política, logging, segmentação, hardening e revisão.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>O IPv4 foi projetado em uma época em que a quantidade de dispositivos conectados parecia pequena. Com o crescimento da Internet, os endereços públicos ficaram escassos. Endereços privados e NAT passaram a permitir que milhares de hosts internos acessassem a Internet usando poucos endereços públicos.</p>\n  <p>Em redes residenciais, NAT virou quase invisível: o roteador doméstico traduz conexões de saída para a Internet. Em empresas, NAT ganhou funções mais complexas: saída corporativa, publicação de servidores, mascaramento entre parceiros, integração com VPN, coexistência de endereços sobrepostos e controle de borda.</p>\n  <p>Com cloud, containers e APIs, NAT continuou existindo, mas a publicação moderna passou a preferir camadas como load balancers, reverse proxies, WAFs, API gateways, ingress controllers e serviços privados. A lição histórica é importante: NAT nasceu para conectividade e conservação de endereços, não como substituto de segurança.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema operacional é permitir comunicação entre redes que usam endereços diferentes, escopos diferentes ou políticas diferentes. Um host interno com IP privado, como <code>10.10.20.15</code>, não é roteável diretamente na Internet. Para acessar a Internet, o tráfego precisa sair com um endereço público. Para ser acessado de fora, algum ponto de borda precisa receber a conexão e encaminhá-la para dentro.</p>\n  <p>O problema de segurança aparece quando publicação vira reflexo automático. Uma regra como <code>WAN TCP/22 → servidor interno</code> pode expor SSH à Internet inteira. Uma regra como <code>WAN TCP/3389 → servidor Windows</code> pode criar um alvo óbvio para força bruta, exploração, enumeração e ransomware.</p>\n  <div class='callout callout--problem'><strong>Problema clássico:</strong> a tradução funciona, o serviço responde, o teste “deu certo” — mas a empresa acabou de publicar uma superfície crítica sem WAF, sem restrição de origem, sem monitoramento e sem prazo de revisão.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <table class='comparison-table'>\n    <thead><tr><th>Modelo</th><th>O que faz</th><th>Uso comum</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Static NAT</td><td>Mapeia um IP interno para um IP externo fixo</td><td>Servidores publicados ou integrações legadas</td><td>Consome IP público e pode expor host inteiro se mal filtrado</td></tr>\n      <tr><td>Dynamic NAT</td><td>Usa um pool de IPs públicos para saídas internas</td><td>Redes corporativas com múltiplos IPs de saída</td><td>Menos comum que PAT em ambientes pequenos</td></tr>\n      <tr><td>PAT/NAPT</td><td>Vários hosts compartilham um IP público usando portas</td><td>Acesso de saída de usuários e servidores</td><td>Dificulta identificação se logs de tradução não existem</td></tr>\n      <tr><td>DNAT</td><td>Altera destino de uma conexão inbound</td><td>Publicar serviço interno na Internet</td><td>Exige firewall, logs e desenho de zona</td></tr>\n      <tr><td>Port forwarding</td><td>Encaminha porta pública para porta interna</td><td>Publicar HTTP, VPN, SSH, RDP ou serviço específico</td><td>Frequentemente usado de forma ampla e perigosa</td></tr>\n      <tr><td>Proxy/WAF/API Gateway</td><td>Publica aplicação por camada 7</td><td>HTTP, APIs, autenticação, inspeção e logs</td><td>Não substitui segmentação nem hardening do backend</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>NAT</strong>, Network Address Translation, é a tradução de endereços IP e, em muitos casos, portas. Ele altera informações de origem ou destino em pacotes para permitir comunicação entre domínios de endereçamento diferentes.</p>\n  <p><strong>SNAT</strong> altera a origem. É comum em tráfego de saída: um host interno sai para a Internet parecendo vir do IP público do firewall ou NAT gateway.</p>\n  <p><strong>DNAT</strong> altera o destino. É comum em publicação: alguém acessa um IP público e uma porta pública, mas o firewall encaminha para um IP privado e porta interna.</p>\n  <p><strong>PAT</strong>, Port Address Translation, permite que várias conexões compartilhem o mesmo IP traduzido usando portas diferentes. Em muitos ambientes, o que chamamos informalmente de “NAT” no acesso à Internet é, na prática, PAT/NAPT.</p>\n  <div class='definition-box'>Port forwarding é um caso prático de DNAT: uma porta recebida no lado público é encaminhada para um serviço interno específico.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Em uma conexão de saída com PAT, o host interno <code>10.10.20.50:51514</code> acessa <code>198.51.100.10:443</code>. O dispositivo NAT troca a origem para algo como <code>203.0.113.20:40192</code> e grava uma entrada em sua tabela de tradução. Quando a resposta volta para <code>203.0.113.20:40192</code>, o NAT consulta a tabela e entrega ao host interno original.</p>\n  <p>Em uma publicação com DNAT, o cliente externo acessa <code>203.0.113.20:443</code>. O firewall traduz o destino para <code>10.10.30.15:8443</code>, aplica a política permitida, encaminha ao backend e acompanha o estado da conexão. A resposta precisa voltar pelo mesmo ponto para que a tradução inversa aconteça corretamente.</p>\n  <ol class='flow-list'>\n    <li>O pacote chega na interface de borda com IP e porta originais.</li>\n    <li>A regra de NAT identifica se deve traduzir origem ou destino.</li>\n    <li>A política de firewall decide se o fluxo é permitido.</li>\n    <li>O dispositivo cria ou consulta uma entrada de tradução/estado.</li>\n    <li>O pacote segue ao próximo salto com endereço ou porta modificados.</li>\n    <li>A resposta retorna, a tradução inversa ocorre e o cliente vê a comunicação como se fosse direta.</li>\n  </ol>\n  <p>Esse mecanismo depende de simetria, estado e ordem de processamento. Em alguns equipamentos, NAT acontece antes da política; em outros, a interface mostra objeto pré-NAT e pós-NAT de formas diferentes. Por isso, troubleshooting de NAT exige ler a documentação do produto e observar logs reais.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura segura não publica servidores internos diretamente por conveniência. Ela decide qual camada deve receber o tráfego público: firewall, NAT, reverse proxy, WAF, load balancer, API gateway, VPN, bastion ou endpoint privado.</p>\n  <table class='data-table'>\n    <thead><tr><th>Cenário</th><th>Arquitetura recomendada</th><th>Por quê</th><th>Risco se mal feito</th></tr></thead>\n    <tbody>\n      <tr><td>Site público</td><td>Internet → CDN/WAF → Load Balancer → App em DMZ/subnet privada</td><td>Inspeção L7, TLS, logs e escala</td><td>Backend exposto diretamente</td></tr>\n      <tr><td>API corporativa</td><td>Internet → API Gateway/WAF → serviço privado</td><td>Autenticação, rate limit, contrato e observabilidade</td><td>Token em log, CORS amplo e bypass de gateway</td></tr>\n      <tr><td>Administração</td><td>VPN/ZTNA/Bastion → rede administrativa</td><td>Reduz exposição de SSH/RDP</td><td>Port forwarding de SSH/RDP para a Internet</td></tr>\n      <tr><td>Integração com parceiro</td><td>VPN, allowlist, mTLS ou private link</td><td>Controle de origem e identidade do canal</td><td>IP público aceitando qualquer origem</td></tr>\n      <tr><td>Serviço legado</td><td>Publicação temporária com origem restrita, logs e prazo</td><td>Controle de exceção</td><td>Exceção temporária virando permanente</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em NAT como a portaria de um prédio que troca endereços de correspondência. Para cartas saindo, a portaria coloca o endereço do prédio em vez do apartamento. Quando a resposta chega, a portaria sabe para qual apartamento entregar porque anotou a saída.</p>\n  <p>Port forwarding é diferente: é como dizer que toda pessoa que chegar na portaria pedindo “sala 443” deve ser encaminhada ao apartamento 30.15. Isso pode ser útil, mas se qualquer pessoa da rua puder entrar, você não criou segurança; criou um caminho público.</p>\n  <div class='callout'>A portaria não deve apenas encaminhar. Ela precisa validar quem pode entrar, para onde vai, em qual horário, por qual motivo e registrar a visita.</div>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Em casa, seu notebook tem IP privado, como <code>192.168.0.50</code>. Ao acessar um site HTTPS, o roteador traduz sua origem para o IP público da sua conexão. O site não vê diretamente <code>192.168.0.50</code>; vê o IP público do roteador.</p>\n  <p>Se você configurar port forwarding de <code>TCP/8080</code> para seu notebook, alguém da Internet poderá tentar acessar seu serviço interno pela porta pública. Se o serviço tiver falha, senha fraca ou painel administrativo exposto, o NAT terá criado um caminho para o atacante.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa precisa publicar o portal <code>clientes.empresa.com</code>. O desenho ruim seria encaminhar <code>WAN TCP/443</code> diretamente para um servidor de aplicação dentro da rede interna.</p>\n  <p>O desenho mais seguro coloca o tráfego público em uma camada de borda: DNS aponta para CDN/WAF ou load balancer; TLS é encerrado de forma governada; o WAF aplica regras HTTP; o load balancer encaminha para backends privados; o banco fica em zona separada; logs seguem para SIEM; a regra possui dono, justificativa e revisão.</p>\n  <p>Mesmo que DNAT exista em algum ponto, ele deixa de ser o único controle. A publicação passa a ser controlada por camadas.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, NAT aparece em vários formatos. Um <strong>NAT Gateway</strong> normalmente permite que subnets privadas acessem a Internet sem receber conexões inbound diretamente. Já um <strong>Load Balancer público</strong> ou <strong>Application Gateway</strong> publica serviços para clientes externos.</p>\n  <p>Security groups, NSGs, NACLs, route tables e firewalls cloud definem quem pode iniciar conexão. Publicar uma instância diretamente com IP público e porta administrativa aberta é, em geral, uma má prática. Melhor é usar bastion, VPN, SSM/Session Manager, ZTNA, private endpoint ou acesso administrativo restrito.</p>\n  <p>Em Kubernetes, a mesma lógica aparece em Services, Ingress, LoadBalancer, NodePort e NetworkPolicies. Um <code>NodePort</code> aberto sem controle pode funcionar tecnicamente, mas ser inadequado para produção.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, NAT e publicação devem ser declarados como código. Regras de firewall, NAT, load balancer, security groups e WAF não deveriam depender de alteração manual sem revisão.</p>\n  <p>Um pipeline maduro valida se portas administrativas estão expostas, se <code>0.0.0.0/0</code> foi usado indevidamente, se a regra tem tag de dono, se existe validade, se há logging e se o backend está em subnet privada.</p>\n  <p>Policy as code pode bloquear um pull request que tente publicar <code>TCP/22</code>, <code>TCP/3389</code>, banco de dados ou painel interno diretamente para a Internet. O objetivo não é impedir mudança, mas fazer a mudança nascer com justificativa, revisão e rastreabilidade.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Durante uma investigação, o time de segurança encontra tentativas de login contra um servidor interno. Ao analisar a borda, descobre uma regra antiga: <code>203.0.113.20:2222 → 10.10.40.12:22</code>. A regra foi criada para suporte emergencial e nunca removida.</p>\n  <p>O incidente não começou por exploração sofisticada. Começou por governança fraca de publicação. A correção envolve remover a regra, restringir administração via bastion/VPN/ZTNA, rotacionar credenciais, revisar logs, procurar autenticações suspeitas e auditar todas as regras similares.</p>\n  <div class='callout callout--security'><strong>Visão defensiva:</strong> toda publicação inbound deve ser tratada como aumento de superfície de ataque até prova em contrário.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 1180 720' role='img' aria-labelledby='m09l05-title m09l05-desc'>\n    <title id='m09l05-title'>NAT, port forwarding e publicação controlada</title>\n    <desc id='m09l05-desc'>Fluxo de saída com SNAT/PAT e fluxo de entrada com DNAT controlado por WAF, firewall e zonas internas.</desc>\n    <defs>\n      <marker id='m09l05-arrow' markerWidth='10' markerHeight='10' refX='9' refY='3' orient='auto' markerUnits='strokeWidth'>\n        <path d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n    <rect x='25' y='40' width='220' height='620' rx='18' class='svg-zone'></rect>\n    <text x='135' y='78' text-anchor='middle' class='svg-label'>Internet</text>\n    <rect x='300' y='40' width='240' height='620' rx='18' class='svg-zone'></rect>\n    <text x='420' y='78' text-anchor='middle' class='svg-label'>Borda</text>\n    <rect x='600' y='40' width='245' height='620' rx='18' class='svg-zone'></rect>\n    <text x='722' y='78' text-anchor='middle' class='svg-label'>DMZ / Apps</text>\n    <rect x='905' y='40' width='240' height='620' rx='18' class='svg-zone'></rect>\n    <text x='1025' y='78' text-anchor='middle' class='svg-label'>Rede interna</text>\n\n    <rect x='70' y='130' width='135' height='70' rx='14' class='svg-node svg-node--client'></rect>\n    <text x='138' y='160' text-anchor='middle' class='svg-label'>Cliente externo</text>\n    <text x='138' y='182' text-anchor='middle' class='svg-label svg-label--small'>198.51.100.44</text>\n\n    <rect x='335' y='120' width='170' height='95' rx='14' class='svg-node svg-node--firewall'></rect>\n    <text x='420' y='152' text-anchor='middle' class='svg-label'>Firewall/NAT</text>\n    <text x='420' y='176' text-anchor='middle' class='svg-label svg-label--small'>203.0.113.20:443</text>\n    <text x='420' y='198' text-anchor='middle' class='svg-label svg-label--small'>DNAT controlado</text>\n\n    <rect x='635' y='115' width='175' height='100' rx='14' class='svg-node svg-node--security'></rect>\n    <text x='722' y='148' text-anchor='middle' class='svg-label'>WAF / LB</text>\n    <text x='722' y='172' text-anchor='middle' class='svg-label svg-label--small'>TLS, logs, health</text>\n    <text x='722' y='194' text-anchor='middle' class='svg-label svg-label--small'>10.10.30.10</text>\n\n    <rect x='940' y='130' width='170' height='85' rx='14' class='svg-node svg-node--server'></rect>\n    <text x='1025' y='162' text-anchor='middle' class='svg-label'>Backend privado</text>\n    <text x='1025' y='186' text-anchor='middle' class='svg-label svg-label--small'>10.10.40.15:8443</text>\n\n    <rect x='640' y='350' width='165' height='85' rx='14' class='svg-node svg-node--server'></rect>\n    <text x='722' y='383' text-anchor='middle' class='svg-label'>Host interno</text>\n    <text x='722' y='407' text-anchor='middle' class='svg-label svg-label--small'>10.10.20.50</text>\n\n    <rect x='335' y='345' width='170' height='95' rx='14' class='svg-node svg-node--router'></rect>\n    <text x='420' y='377' text-anchor='middle' class='svg-label'>PAT/SNAT</text>\n    <text x='420' y='401' text-anchor='middle' class='svg-label svg-label--small'>saída controlada</text>\n    <text x='420' y='423' text-anchor='middle' class='svg-label svg-label--small'>porta traduzida</text>\n\n    <rect x='70' y='355' width='135' height='70' rx='14' class='svg-node svg-node--cloud'></rect>\n    <text x='138' y='386' text-anchor='middle' class='svg-label'>Serviço SaaS</text>\n    <text x='138' y='408' text-anchor='middle' class='svg-label svg-label--small'>HTTPS/443</text>\n\n    <rect x='930' y='360' width='190' height='70' rx='14' class='svg-node svg-node--attacker'></rect>\n    <text x='1025' y='390' text-anchor='middle' class='svg-label'>Risco proibido</text>\n    <text x='1025' y='412' text-anchor='middle' class='svg-label svg-label--small'>SSH/RDP direto</text>\n\n    <line x1='205' y1='165' x2='335' y2='165' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l05-arrow)'></line>\n    <text x='270' y='150' text-anchor='middle' class='svg-label svg-label--small'>1. IP público:443</text>\n    <line x1='505' y1='165' x2='635' y2='165' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l05-arrow)'></line>\n    <text x='570' y='150' text-anchor='middle' class='svg-label svg-label--small'>2. DNAT + política</text>\n    <line x1='810' y1='165' x2='940' y2='170' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m09l05-arrow)'></line>\n    <text x='875' y='150' text-anchor='middle' class='svg-label svg-label--small'>3. app privada</text>\n\n    <line x1='640' y1='392' x2='505' y2='392' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m09l05-arrow)'></line>\n    <text x='572' y='378' text-anchor='middle' class='svg-label svg-label--small'>A. saída interna</text>\n    <line x1='335' y1='392' x2='205' y2='392' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m09l05-arrow)'></line>\n    <text x='270' y='378' text-anchor='middle' class='svg-label svg-label--small'>B. SNAT/PAT</text>\n\n    <line x1='940' y1='395' x2='805' y2='395' class='svg-flow svg-flow--blocked' marker-end='url(#m09l05-arrow)'></line>\n    <text x='872' y='448' text-anchor='middle' class='svg-label svg-label--small'>administração não deve ser publicada diretamente</text>\n\n    <text x='590' y='625' text-anchor='middle' class='svg-label'>NAT traduz. Firewall decide. Arquitetura segura reduz exposição.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você desenhará e validará uma publicação controlada. O objetivo é diferenciar saída via PAT, entrada via DNAT/port forwarding e publicação madura com WAF/load balancer, logs e zona correta.</p>\n</section>\n\n<div class=\"content-card\" data-enhancement=\"p1-07-9.5\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de regras de NAT, identificação de exposição indevida, matriz de publicação, troubleshooting de porta e distinção entre tradução, firewall e roteamento.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário com várias regras de port forwarding criadas ao longo do tempo. Seu trabalho será classificar riscos, propor uma arquitetura segura e escrever uma política de publicação auditável.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostrará quais regras devem ser removidas, quais devem ser substituídas por VPN, bastion, WAF ou API gateway, e como validar o caminho com logs, testes de porta e captura.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>NAT traduz endereços e portas. PAT permite saída compartilhando IP público. DNAT e port forwarding permitem publicação de serviços internos. Nenhum desses mecanismos substitui firewall, WAF, hardening, autenticação, segmentação ou logging.</p>\n  <p>Publicação controlada exige origem definida, destino privado, porta mínima, camada de proteção adequada, dono, justificativa, validade, logs e plano de remoção. Em ambientes modernos, publicar diretamente um host interno deve ser exceção muito bem justificada.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará WAF, regras HTTP e proteção de APIs, entendendo por que firewall de rede não enxerga sozinho os riscos de camada 7.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 3",
      "Camada 4",
      "Camada 7",
      "Segurança",
      "Arquitetura",
      "Cloud"
    ],
    "beforeThisLesson": "O aluno já entende IPv4, endereços privados, roteamento, TCP/UDP, NAT inicial, firewalls stateful, zonas, DMZ e publicação HTTP.",
    "afterThisLesson": "O aluno conseguirá desenhar e auditar publicações inbound e acesso outbound usando NAT, port forwarding, logs e controles complementares.",
    "dependsOn": [
      "IPv4",
      "endereços privados",
      "portas TCP/UDP",
      "tabela de estado",
      "firewall",
      "zonas",
      "DMZ",
      "HTTP/HTTPS",
      "logs"
    ]
  },
  "protocolFields": [
    {
      "field": "Original source",
      "meaning": "Endereço e porta de origem antes da tradução.",
      "securityNote": "Ajuda a saber quem iniciou o fluxo; pode ser perdido sem logs de NAT."
    },
    {
      "field": "Translated source",
      "meaning": "Origem após SNAT/PAT.",
      "securityNote": "Compartilhamento de IP exige logs para atribuição e investigação."
    },
    {
      "field": "Original destination",
      "meaning": "IP e porta acessados pelo cliente antes do DNAT.",
      "securityNote": "Representa a superfície pública exposta."
    },
    {
      "field": "Translated destination",
      "meaning": "IP e porta internos após DNAT/port forwarding.",
      "securityNote": "Deve apontar para zona apropriada, não para rede interna ampla."
    },
    {
      "field": "Porta original",
      "meaning": "Porta pública recebida no firewall ou load balancer.",
      "securityNote": "Portas administrativas públicas são de alto risco."
    },
    {
      "field": "Porta traduzida",
      "meaning": "Porta real do serviço interno.",
      "securityNote": "Trocar a porta não é controle de segurança suficiente."
    },
    {
      "field": "Regra de firewall",
      "meaning": "Política que permite ou nega o fluxo traduzido.",
      "securityNote": "NAT sem política restritiva vira exposição acidental."
    },
    {
      "field": "Tabela de tradução",
      "meaning": "Estado que associa conexão externa e conexão interna.",
      "securityNote": "É essencial para retorno e troubleshooting."
    },
    {
      "field": "Log de NAT",
      "meaning": "Registro de criação, uso e encerramento da tradução.",
      "securityNote": "Sem log, incidentes ficam difíceis de atribuir."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Cliente externo inicia conexão",
      "description": "Um cliente acessa o IP público e a porta publicada, como 203.0.113.20:443.",
      "securityNote": "A origem deve ser avaliada; nem toda publicação deve aceitar Internet inteira."
    },
    {
      "step": 2,
      "name": "Borda recebe o pacote",
      "description": "Firewall, load balancer ou gateway recebe o pacote na zona pública.",
      "securityNote": "Este é o ponto ideal para logging, inspeção, rate limit e proteção."
    },
    {
      "step": 3,
      "name": "DNAT/port forwarding é avaliado",
      "description": "A regra traduz o destino público para destino interno, como 10.10.30.15:8443.",
      "securityNote": "A tradução deve apontar para DMZ, proxy ou backend privado adequado."
    },
    {
      "step": 4,
      "name": "Política de firewall decide",
      "description": "A política permite, nega, registra ou encaminha para inspeção adicional.",
      "securityNote": "NAT não deve ser confundido com autorização."
    },
    {
      "step": 5,
      "name": "Serviço interno responde",
      "description": "O backend responde pelo caminho esperado até o mesmo dispositivo de tradução.",
      "securityNote": "Caminho assimétrico pode quebrar NAT e estado."
    },
    {
      "step": 6,
      "name": "Tradução inversa ocorre",
      "description": "O firewall reescreve a resposta para que o cliente veja o IP público como origem.",
      "securityNote": "Logs devem permitir correlacionar cliente, IP público, backend e horário."
    },
    {
      "step": 7,
      "name": "Monitoramento registra o fluxo",
      "description": "Contadores, logs de NAT, logs de firewall, WAF e aplicação são correlacionados.",
      "securityNote": "Sem correlação, troubleshooting e investigação ficam incompletos."
    }
  ],
  "deepDive": {
    "title": "NAT não é firewall: por que essa confusão é perigosa",
    "paragraphs": [
      "Muitas pessoas aprenderam em redes domésticas que estar atrás de NAT parece seguro, porque hosts internos não recebem conexões inbound automaticamente. Isso criou a impressão de que NAT é uma barreira de segurança. Na prática, a proteção vem do comportamento stateful padrão do roteador/firewall e da ausência de regra inbound, não da tradução em si.",
      "Quando você cria um port forwarding, muda o modelo. Agora existe um caminho público até um serviço interno. Se a política aceitar qualquer origem, se o serviço não tiver hardening, se a aplicação estiver vulnerável ou se não houver logs, a tradução aumentou risco.",
      "Em IPv6, a discussão fica ainda mais clara: como não há a mesma necessidade de NAT para conservação de endereços, a segurança deve ser feita explicitamente com firewall, segmentação, identidade, hardening e observabilidade. O objetivo defensivo não é esconder endereços, mas controlar fluxos."
    ],
    "keyTakeaways": [
      "NAT resolve tradução e conservação de endereços.",
      "Firewall resolve política de tráfego.",
      "WAF/API Gateway resolvem parte da inspeção e governança HTTP/API.",
      "Logs e inventário resolvem rastreabilidade operacional.",
      "Publicação segura exige todas essas camadas trabalhando juntas."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que NAT é segurança suficiente.",
      "impact": "Serviços publicados ficam expostos sem política, logging e hardening adequados.",
      "correction": "Trate NAT como tradução; use firewall, WAF, autenticação, segmentação e monitoramento."
    },
    {
      "mistake": "Publicar SSH ou RDP para 0.0.0.0/0.",
      "impact": "Aumenta risco de força bruta, exploração e ransomware.",
      "correction": "Use VPN, bastion, ZTNA, MFA, allowlist e logging forte."
    },
    {
      "mistake": "Trocar porta pública e chamar isso de segurança.",
      "impact": "Scanner encontra portas alternativas e o serviço continua exposto.",
      "correction": "Restrinja origem, use controles adequados e monitore."
    },
    {
      "mistake": "Esquecer rota de retorno.",
      "impact": "A conexão chega ao backend, mas a resposta sai por outro caminho e quebra NAT/estado.",
      "correction": "Valide roteamento simétrico, tabelas de rota e logs de fluxo."
    },
    {
      "mistake": "Criar regra temporária sem validade.",
      "impact": "Exceções permanecem por anos.",
      "correction": "Toda publicação deve ter dono, prazo, justificativa e revisão."
    },
    {
      "mistake": "Publicar backend que deveria estar atrás de WAF/API Gateway.",
      "impact": "Bypass de proteção, autenticação central, rate limit e logs.",
      "correction": "Garanta que o backend privado só aceite tráfego da camada autorizada."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Porta pública não responde.",
      "Porta responde externamente, mas aplicação não carrega.",
      "Funciona de fora, mas não funciona de dentro da rede.",
      "Funciona por IP, mas não por DNS.",
      "Logs mostram conexão chegando, mas backend não responde.",
      "Usuários veem timeout, 502, 503 ou reset intermitente.",
      "SIEM não consegue correlacionar cliente real com backend."
    ],
    "checks": [
      "Confirme DNS público e IP de destino.",
      "Teste TCP/UDP na porta publicada a partir de uma origem externa autorizada.",
      "Verifique regra de DNAT/port forwarding e ordem de processamento.",
      "Verifique política de firewall associada ao fluxo pré-NAT e pós-NAT conforme o produto.",
      "Confirme se o backend escuta na porta esperada e na interface correta.",
      "Valide rota de retorno e gateway padrão do backend.",
      "Cheque logs de NAT, firewall, WAF, load balancer e aplicação.",
      "Teste hairpin NAT quando clientes internos usam o nome público.",
      "Verifique se existe double NAT, CGNAT ou NAT em camada adicional do provedor/cloud.",
      "Confirme se o serviço deveria ser publicado diretamente ou via proxy/WAF/API Gateway."
    ],
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "ss -tulpen | grep 8443 || netstat -ano | findstr 8443\ncurl -vkI https://10.20.30.10:8443/health",
        "purpose": "Validar listener interno",
        "expectedObservation": "Serviço responde internamente.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "nc -vz 203.0.113.10 443\ncurl -vkI https://portal.lab.local/health",
        "purpose": "Testar publicação",
        "expectedObservation": "Porta e HTTP/TLS respondem.",
        "interpretation": "Relacionar comando à matriz de fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "sudo tcpdump -nn -i any \"host 10.20.30.10 and tcp port 8443\" -c 20",
        "purpose": "Coletar tradução",
        "expectedObservation": "Pacotes na porta traduzida.",
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
    "goodPractices": [
      "Publicar serviços HTTP por WAF, reverse proxy, load balancer ou API Gateway quando possível.",
      "Manter backends em subnets privadas e permitir apenas origem da camada de borda autorizada.",
      "Restringir origem em publicações administrativas ou de parceiros.",
      "Usar VPN, bastion, ZTNA e MFA para administração em vez de port forwarding direto.",
      "Ativar logs de NAT, firewall, WAF, load balancer e aplicação com correlation ID.",
      "Definir dono, justificativa, validade e revisão para toda regra de publicação.",
      "Monitorar novas exposições públicas e mudanças em regras via IaC/policy as code.",
      "Documentar rollback antes de publicar serviços críticos."
    ],
    "badPractices": [
      "Encaminhar SSH, RDP, banco de dados ou painéis internos diretamente para a Internet.",
      "Usar 0.0.0.0/0 sem justificativa e sem camada de proteção.",
      "Desabilitar logs para reduzir ruído sem alternativa de observabilidade.",
      "Achar que porta alta, NAT ou IP privado tornam o serviço seguro.",
      "Permitir que backend aceite tráfego direto da Internet e também do WAF.",
      "Criar exceção temporária sem data de expiração.",
      "Manter documentação de NAT fora do repositório de infraestrutura."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de serviço administrativo.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Deny-by-default inbound."
      },
      {
        "name": "Bypass de WAF ou API Gateway.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Allowlist de origem quando possível."
      },
      {
        "name": "Força bruta contra serviço publicado.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Publicação L7 com WAF/API Gateway para HTTP e APIs."
      },
      {
        "name": "Exploração de aplicação legada exposta.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Bastion/VPN/ZTNA para administração."
      },
      {
        "name": "Enumeração por scanners de Internet.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Backends privados sem IP público."
      },
      {
        "name": "Ausência de atribuição por falta de logs de PAT.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs centralizados no SIEM."
      },
      {
        "name": "Hairpin NAT mal configurado causando uso de caminho menos protegido.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Alertas para regras novas e portas críticas."
      },
      {
        "name": "Double NAT ocultando origem real e quebrando troubleshooting.",
        "description": "Risco relacionado à aula 9.5 — NAT, port forwarding e publicação controlada.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão periódica e expiração automática de exceções."
      }
    ],
    "mitigations": [
      "Deny-by-default inbound.",
      "Allowlist de origem quando possível.",
      "Publicação L7 com WAF/API Gateway para HTTP e APIs.",
      "Bastion/VPN/ZTNA para administração.",
      "Backends privados sem IP público.",
      "Logs centralizados no SIEM.",
      "Alertas para regras novas e portas críticas.",
      "Revisão periódica e expiração automática de exceções."
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
      "Deny-by-default inbound.",
      "Allowlist de origem quando possível.",
      "Publicação L7 com WAF/API Gateway para HTTP e APIs.",
      "Bastion/VPN/ZTNA para administração.",
      "Backends privados sem IP público.",
      "Logs centralizados no SIEM.",
      "Alertas para regras novas e portas críticas.",
      "Revisão periódica e expiração automática de exceções."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.5",
    "title": "NAT, port forwarding e publicação controlada sem confundir com firewall",
    "labType": "local",
    "objective": "Diferenciar DNAT/SNAT/port forwarding de decisão de segurança e validar publicação com rota de retorno, logs e regra mínima.",
    "scenario": "Serviço interno será publicado em HTTPS; o time confunde NAT com autorização.",
    "topology": "Cliente externo -> IP público:443 -> DNAT -> servidor 10.20.30.10:8443 -> retorno via firewall/NAT.",
    "architecture": "NAT traduz; firewall decide; logs correlacionam antes/depois.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "curl",
      "nc",
      "tcpdump",
      "iptables/nft opcional",
      "matriz NAT/política"
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
        "title": "Separar NAT e permissão",
        "instruction": "Crie tabela DNAT e tabela de firewall.",
        "expectedOutput": "NAT não confundido com firewall.",
        "evidence": "Duas tabelas separadas.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Tabela NAT e tabela de permissão."
      },
      {
        "number": 2,
        "title": "Validar listener interno",
        "instruction": "Prove que backend escuta antes de publicar.",
        "expectedOutput": "Serviço responde internamente.",
        "evidence": "Listener e health interno.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "ss -tulpen | grep 8443 || netstat -ano | findstr 8443\ncurl -vkI https://10.20.30.10:8443/health"
      },
      {
        "number": 3,
        "title": "Documentar DNAT",
        "instruction": "Registre tradução planejada.",
        "expectedOutput": "Tradução clara.",
        "evidence": "Regra DNAT planejada.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "configuration": "203.0.113.10:443 -> 10.20.30.10:8443/TCP."
      },
      {
        "number": 4,
        "title": "Planejar firewall",
        "instruction": "Defina origem autorizada e deny demais.",
        "expectedOutput": "Permissão separada da tradução.",
        "evidence": "Regra mínima.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Regra allow com log e deny para demais origens."
      },
      {
        "number": 5,
        "title": "Testar publicação",
        "instruction": "Valide porta e health.",
        "expectedOutput": "Porta e HTTP/TLS respondem.",
        "evidence": "Teste externo autorizado.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "nc -vz 203.0.113.10 443\ncurl -vkI https://portal.lab.local/health"
      },
      {
        "number": 6,
        "title": "Coletar tradução",
        "instruction": "Observe pacote no servidor interno.",
        "expectedOutput": "Pacotes na porta traduzida.",
        "evidence": "Trace/log NAT.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "command": "sudo tcpdump -nn -i any \"host 10.20.30.10 and tcp port 8443\" -c 20"
      },
      {
        "number": 7,
        "title": "Validar retorno",
        "instruction": "Confirme gateway/SNAT/rota.",
        "expectedOutput": "Sem assimetria inesperada.",
        "evidence": "Rota de retorno.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "analysisTask": "Confirmar rota de retorno e necessidade de SNAT."
      },
      {
        "number": 8,
        "title": "Plano de limpeza",
        "instruction": "Liste remoção de NAT/firewall/DNS.",
        "expectedOutput": "Publicação reversível.",
        "evidence": "Plano de rollback.",
        "explanation": "Este passo transforma a política em evidência objetiva: ele obriga o aluno a separar intenção, regra, retorno, log e validação antes de propor qualquer abertura.",
        "artifact": "Rollback completo."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "Listener interno",
        "expected": "Serviço escutando.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "command": "ss -tulpen | grep 8443"
      },
      {
        "check": "NAT e firewall separados",
        "expected": "Há tabela NAT e tabela de permissão.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Retorno documentado",
        "expected": "Servidor retorna pelo caminho correto.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      },
      {
        "check": "Rollback",
        "expected": "Remoção de DNAT/allow/DNS definida.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Porta pública abre e HTTP falha",
        "probableCause": "Backend/TLS/SNI/health incorreto.",
        "howToConfirm": "curl interno e logs.",
        "fix": "Corrigir backend antes do firewall."
      },
      {
        "symptom": "Pacote chega sem retorno",
        "probableCause": "Rota assimétrica/SNAT ausente.",
        "howToConfirm": "tcpdump no servidor e firewall.",
        "fix": "Ajustar gateway/SNAT."
      },
      {
        "symptom": "Serviço exposto para todos",
        "probableCause": "Regra ampla.",
        "howToConfirm": "Matriz origem any.",
        "fix": "Restringir origens e usar WAF/proxy."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Listener interno",
      "Tabela NAT",
      "Regra firewall",
      "Teste externo",
      "Trace de tradução",
      "Rota de retorno",
      "Rollback"
    ],
    "questions": [
      "Por que NAT não é firewall?",
      "Que prova a tradução?"
    ],
    "challenge": "Publique conceitualmente um serviço HTTPS interno com rollback.",
    "solution": "Valide backend, DNAT específico, allow mínimo, logs, retorno e limpeza."
  },
  "mentorQuestions": [
    "Por que NAT funcionando não significa que a publicação está segura?",
    "Em qual situação port forwarding direto pode ser aceitável temporariamente e quais controles mínimos seriam exigidos?",
    "Como você provaria, com logs, que um cliente externo chegou ao backend correto sem bypassar o WAF?",
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
      "question": "Qual é a principal função do NAT?",
      "options": [
        "Criptografar tráfego",
        "Traduzir endereços e, em alguns casos, portas",
        "Substituir autenticação",
        "Detectar ataques HTTP"
      ],
      "answer": "Traduzir endereços e, em alguns casos, portas",
      "explanation": "NAT é mecanismo de tradução. Segurança depende de políticas e controles adicionais."
    },
    {
      "id": "q2",
      "question": "O que o DNAT normalmente altera?",
      "options": [
        "O destino do pacote",
        "O algoritmo TLS",
        "O conteúdo JSON",
        "A senha do usuário"
      ],
      "answer": "O destino do pacote",
      "explanation": "DNAT é usado com frequência para publicar um serviço interno a partir de um endereço público."
    },
    {
      "id": "q3",
      "question": "Por que publicar SSH por port forwarding para 0.0.0.0/0 é perigoso?",
      "options": [
        "Porque SSH não usa TCP",
        "Porque expõe administração à Internet inteira",
        "Porque impede logs",
        "Porque só funciona em IPv6"
      ],
      "answer": "Porque expõe administração à Internet inteira",
      "explanation": "Portas administrativas públicas aumentam risco de força bruta e exploração."
    },
    {
      "id": "q4",
      "question": "Qual controle é mais apropriado para publicar uma API HTTP pública?",
      "options": [
        "Apenas NAT direto para backend",
        "WAF/API Gateway/Load Balancer com backend privado",
        "Desativar TLS",
        "Abrir banco de dados diretamente"
      ],
      "answer": "WAF/API Gateway/Load Balancer com backend privado",
      "explanation": "APIs se beneficiam de controles L7, autenticação, rate limit, logs e proteção de backend."
    },
    {
      "id": "q5",
      "question": "O que pode causar falha quando o pacote chega ao backend, mas a resposta não retorna corretamente?",
      "options": [
        "Rota de retorno assimétrica",
        "Uso de HTML",
        "Header User-Agent",
        "Fonte monoespaçada"
      ],
      "answer": "Rota de retorno assimétrica",
      "explanation": "NAT e stateful inspection dependem de caminho coerente para tradução inversa."
    },
    {
      "id": "q6",
      "question": "Qual informação é essencial em uma regra de publicação madura?",
      "options": [
        "Apenas a porta",
        "Dono, justificativa, validade, logging e rollback",
        "Nome informal da regra apenas",
        "Cor do dashboard"
      ],
      "answer": "Dono, justificativa, validade, logging e rollback",
      "explanation": "Publicação é ciclo de vida e governança, não apenas configuração técnica."
    }
  ],
  "flashcards": [
    {
      "front": "O que é SNAT?",
      "back": "Tradução do endereço de origem, comum em tráfego de saída."
    },
    {
      "front": "O que é DNAT?",
      "back": "Tradução do endereço de destino, comum em publicação inbound."
    },
    {
      "front": "O que é PAT?",
      "back": "Tradução de portas que permite múltiplos fluxos compartilharem um IP traduzido."
    },
    {
      "front": "Port forwarding é segurança?",
      "back": "Não. É encaminhamento/tradução. Segurança exige política, hardening, logs e controles adicionais."
    },
    {
      "front": "Qual risco de backend público além do WAF?",
      "back": "Bypass de inspeção, autenticação central, rate limit e logs."
    },
    {
      "front": "O que é hairpin NAT?",
      "back": "Acesso de clientes internos ao IP/nome público que retorna para um serviço interno via NAT."
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "title": "Classifique regras de NAT",
      "prompt": "Dadas regras de saída, publicação HTTP e publicação SSH, classifique-as como SNAT, DNAT, PAT ou port forwarding e indique o risco principal.",
      "expectedAnswer": "Saída compartilhada normalmente é PAT/SNAT; publicação HTTP usa DNAT/port forwarding; SSH público é risco administrativo alto."
    },
    {
      "id": "ex2",
      "title": "Matriz de publicação",
      "prompt": "Monte uma matriz para publicar uma API de parceiros em TCP/443 com WAF e backend privado.",
      "expectedAnswer": "Deve conter origem permitida, IP/domínio público, backend, porta, WAF, autenticação, logs, dono, validade e rollback."
    },
    {
      "id": "ex3",
      "title": "Rota de retorno",
      "prompt": "Explique por que uma publicação pode receber SYN no backend mas não completar conexão.",
      "expectedAnswer": "O backend pode responder por gateway diferente, quebrando NAT/stateful inspection; também pode haver firewall local ou rota incorreta."
    },
    {
      "id": "ex4",
      "title": "Remediação de exposição",
      "prompt": "Uma regra WAN TCP/3389 → servidor financeiro existe há dois anos. Proponha correção.",
      "expectedAnswer": "Remover publicação direta, investigar logs, rotacionar credenciais, migrar para VPN/ZTNA/bastion com MFA, restringir origem e revisar regras similares."
    },
    {
      "id": "ex-9.5-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Revisar publicações de uma empresa após auditoria",
    "scenario": "A auditoria encontrou as seguintes regras: WAN TCP/443 → 10.10.30.20:443; WAN TCP/2222 → 10.10.40.10:22; WAN TCP/5432 → 10.10.50.5:5432; ANY outbound from servers to Internet; NAT Gateway para subnets privadas sem logs; API pública fora do WAF.",
    "tasks": [
      "Classificar cada regra por tipo e risco.",
      "Definir quais regras remover imediatamente.",
      "Propor arquitetura de publicação para o serviço web e API.",
      "Propor solução segura para administração.",
      "Definir logs mínimos para investigação.",
      "Escrever plano de revisão de exceções."
    ],
    "deliverable": "Uma matriz de publicação revisada e um plano de correção priorizado."
  },
  "commentedSolution": {
    "summary": "A solução remove exposição administrativa e banco público, coloca HTTP/API atrás de WAF/API Gateway, mantém backends privados, restringe egress e habilita logs de NAT/firewall/WAF/aplicação.",
    "steps": [
      {
        "step": 1,
        "comment": "WAN TCP/2222 para SSH deve ser removido ou substituído por VPN/ZTNA/bastion com MFA e allowlist. Porta alternativa não reduz o risco de forma suficiente."
      },
      {
        "step": 2,
        "comment": "WAN TCP/5432 para banco é exposição crítica. Banco deve ser privado, acessível apenas por aplicações autorizadas ou canais privados."
      },
      {
        "step": 3,
        "comment": "WAN TCP/443 pode permanecer se estiver atrás de WAF/load balancer, com TLS, logs, health checks e backend sem exposição direta."
      },
      {
        "step": 4,
        "comment": "API pública fora do WAF deve ser migrada para API Gateway/WAF com autenticação, rate limit, contrato e observabilidade."
      },
      {
        "step": 5,
        "comment": "ANY outbound de servidores deve ser substituído por egress mínimo: repositórios, updates, APIs específicas, DNS/NTP controlados e proxy quando adequado."
      },
      {
        "step": 6,
        "comment": "NAT Gateway sem logs prejudica atribuição. Habilite flow logs, firewall logs, registros de aplicação e correlação temporal."
      },
      {
        "step": 7,
        "comment": "Cada exceção deve ter dono, justificativa, validade e tarefa de revisão. Sem isso, regra temporária vira risco permanente."
      }
    ]
  },
  "glossary": [
    {
      "term": "NAT",
      "definition": "Tradução de endereços IP entre redes ou domínios de endereçamento."
    },
    {
      "term": "SNAT",
      "definition": "Tradução do endereço de origem de um pacote."
    },
    {
      "term": "DNAT",
      "definition": "Tradução do endereço de destino de um pacote."
    },
    {
      "term": "PAT/NAPT",
      "definition": "Tradução de portas, permitindo múltiplas conexões compartilharem um endereço IP traduzido."
    },
    {
      "term": "Port forwarding",
      "definition": "Encaminhamento de uma porta recebida em um endereço para outro endereço e/ou porta interna."
    },
    {
      "term": "Static NAT",
      "definition": "Mapeamento fixo entre endereço interno e endereço externo."
    },
    {
      "term": "Hairpin NAT",
      "definition": "Cenário em que um cliente interno acessa um serviço interno usando o endereço público traduzido."
    },
    {
      "term": "Double NAT",
      "definition": "Existência de duas camadas de NAT no caminho, comum em provedores, roteadores encadeados ou ambientes híbridos."
    },
    {
      "term": "CGNAT",
      "definition": "NAT em escala de provedor, no qual múltiplos clientes compartilham endereços públicos."
    },
    {
      "term": "NAT Gateway",
      "definition": "Serviço ou dispositivo que realiza NAT, geralmente usado para saída de subnets privadas em cloud."
    },
    {
      "term": "Publicação controlada",
      "definition": "Exposição planejada de serviço com política, camada de proteção, logs, dono, validade e rollback."
    },
    {
      "term": "Bypass de WAF",
      "definition": "Acesso direto ao backend, contornando a camada de inspeção HTTP planejada."
    }
  ],
  "references": [
    "Curso Redes e Network v2.0 — Módulo 4: IPv4 e Endereçamento",
    "Curso Redes e Network v2.0 — Módulo 5: Subnetting e planejamento de endereçamento IPv4",
    "Curso Redes e Network v2.0 — Módulo 8: TCP, UDP, portas e transporte",
    "Curso Redes e Network v2.0 — Módulo 9: HTTP, HTTPS, proxies e APIs",
    "Curso Infraestrutura Moderna, Platform Engineering e DevSecOps — módulos sobre IaC, cloud e Kubernetes",
    "Curso Enterprise Identity, IAM, Segurança e Acessos — módulos sobre acesso administrativo, MFA e identidades de serviço"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Infraestrutura como Código",
      "reason": "Regras de NAT, firewall, load balancer e security groups devem ser declaradas, revisadas e versionadas."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Acesso administrativo seguro",
      "reason": "Publicação de administração deve ser substituída por VPN/ZTNA/bastion com identidade forte e trilha de auditoria."
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
      "9.6"
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
