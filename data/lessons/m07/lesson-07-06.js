export const lesson0706 = {
  "id": "7.6",
  "moduleId": "m07",
  "order": 6,
  "title": "DHCP profundo e integração com DNS",
  "subtitle": "Entenda como hosts recebem IP, máscara, gateway e DNS automaticamente, como reservas e leases funcionam, como DHCP se integra ao DNS e quais falhas derrubam redes corporativas sem parecerem problemas de aplicação.",
  "duration": "115-170 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 265,
  "tags": [
    "redes",
    "dhcp",
    "dns",
    "dora",
    "lease",
    "reserva dhcp",
    "dhcp relay",
    "dhcp snooping",
    "ddns",
    "ipam",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "id": "4.7",
      "title": "Configuração IPv4: manual, DHCP e reservas",
      "reason": "Apresenta DHCP em nível inicial e diferencia configuração manual, dinâmica e reserva."
    },
    {
      "id": "7.1",
      "title": "Por que DNS existe",
      "reason": "Explica nomes, resolução e dependência de DNS para serviços corporativos."
    },
    {
      "id": "7.4",
      "title": "Registros DNS",
      "reason": "Mostra registros que podem ser atualizados ou consumidos em ambientes integrados ao DHCP."
    },
    {
      "id": "7.5",
      "title": "TTL, cache DNS e troubleshooting de nomes",
      "reason": "Mostra cache e TTL, importantes quando DHCP atualiza registros DNS dinamicamente."
    }
  ],
  "objectives": [
    "Explicar o fluxo DHCP DORA em profundidade: Discover, Offer, Request e ACK.",
    "Diferenciar escopo, pool, lease, opção DHCP, reserva, exclusão e DHCP relay.",
    "Relacionar DHCP com DNS, registros dinâmicos, nomes de host, IPAM e inventário.",
    "Diagnosticar APIPA, gateway ausente, DNS errado, lease expirado, reserva duplicada e DHCP rogue.",
    "Entender quando usar IP fixo manual, reserva DHCP e automação via IPAM/IaC.",
    "Aplicar controles defensivos como DHCP snooping, segmentação, NAC, logs e governança de escopos."
  ],
  "learningOutcomes": [
    "Ler uma configuração DHCP e identificar quais parâmetros serão entregues ao cliente.",
    "Montar uma hipótese de falha DHCP usando evidências do cliente, switch, servidor e DNS.",
    "Explicar como DHCP relay permite atender VLANs diferentes sem colocar um servidor DHCP em cada rede.",
    "Desenhar uma política simples de reservas, exclusões, lease time, integração DNS e segurança."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Em uma rede pequena, configurar IP manualmente parece aceitável. Em uma empresa com centenas de notebooks, telefones IP, impressoras, câmeras, servidores, access points, containers, redes Wi-Fi, filiais e ambientes cloud, configurar endereço manual em cada host vira uma fonte permanente de erro.</p>\n  <p>O DHCP existe para automatizar a entrega dos parâmetros mínimos de rede: endereço IPv4, máscara, gateway padrão, servidores DNS, domínio de busca, tempo de lease e outras opções. Quando DHCP falha, o usuário costuma dizer “a Internet caiu”, mas o problema pode ser IP duplicado, VLAN errada, relay ausente, escopo esgotado, DNS incorreto ou servidor DHCP falso.</p>\n  <div class='callout'><strong>Ideia central:</strong> DHCP não entrega apenas um IP. Ele entrega uma identidade operacional temporária para o host participar da rede com rota, DNS, política e rastreabilidade.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>Antes de DHCP, redes usavam configuração manual ou protocolos mais simples como BOOTP. Isso funcionava em ambientes menores, mas não escalava bem quando computadores passaram a se mover entre redes, receber endereços dinamicamente e depender de parâmetros adicionais.</p>\n  <p>O DHCP evoluiu para resolver escala operacional. Ele permite que uma rede defina escopos, alugue endereços por tempo limitado, entregue opções padronizadas e centralize parte do controle de endereçamento. Em ambientes Microsoft Active Directory, por exemplo, DHCP frequentemente se integra ao DNS para registrar ou atualizar nomes automaticamente.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema central é que hosts precisam de vários parâmetros coerentes para funcionar. Um IP válido sem máscara correta pode isolar o host. Uma máscara correta sem gateway impede acesso a outras redes. Um gateway correto com DNS errado faz aplicações parecerem fora do ar. Um IP duplicado gera sintomas intermitentes.</p>\n  <p>Além disso, redes modernas são segmentadas. Cada VLAN pode ter um escopo próprio, um gateway próprio, servidores DNS específicos e opções diferentes. Colocar um servidor DHCP em cada VLAN seria caro e difícil de governar; por isso, entra o DHCP relay.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> quando um cliente recebe <code>169.254.x.x</code>, quando o gateway vem vazio ou quando o DNS entregue aponta para fora da empresa, a falha pode estar em Camada 2, VLAN, trunk, relay, servidor, escopo, política de segurança ou DHCP rogue.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>O DHCP começou como automação de configuração IPv4, mas virou peça de governança. Em empresas, ele se conecta a DNS, IPAM, inventário, NAC, logs, SIEM, CMDB e processos de mudança. Em redes Wi-Fi corporativas, DHCP também ajuda a identificar segmentos, perfis de usuários e dispositivos não autorizados.</p>\n  <p>Na cloud, o conceito permanece, mesmo quando a implementação é abstraída. Instâncias recebem endereços, rotas e DNS por mecanismos controlados pela plataforma. Em Kubernetes, CNI, IPAM e service discovery cumprem papéis análogos em outra camada de abstração.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>DHCP</strong>, ou <em>Dynamic Host Configuration Protocol</em>, é um protocolo usado para fornecer automaticamente parâmetros de rede a clientes. O fluxo clássico é chamado de <strong>DORA</strong>: Discover, Offer, Request e Acknowledgement.</p>\n  <table class='data-table'><thead><tr><th>Elemento</th><th>Função</th><th>Exemplo</th></tr></thead><tbody>\n    <tr><td>Escopo</td><td>Rede atendida pelo DHCP</td><td><code>192.168.10.0/24</code></td></tr>\n    <tr><td>Pool</td><td>Faixa de IPs disponíveis para aluguel</td><td><code>192.168.10.100-192.168.10.200</code></td></tr>\n    <tr><td>Lease</td><td>Tempo de validade do endereço entregue</td><td>8 horas, 1 dia, 7 dias</td></tr>\n    <tr><td>Reserva</td><td>Associação previsível entre MAC/cliente e IP</td><td>Impressora sempre recebe <code>.50</code></td></tr>\n    <tr><td>Exclusão</td><td>Endereços que não devem ser distribuídos</td><td>Gateway, servidores, appliances</td></tr>\n    <tr><td>Opções DHCP</td><td>Parâmetros adicionais entregues ao cliente</td><td>Gateway, DNS, domínio, NTP, PXE</td></tr>\n    <tr><td>Relay</td><td>Encaminha pedidos DHCP entre VLANs</td><td><code>ip helper-address</code></td></tr>\n  </tbody></table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um host não possui configuração IPv4 válida, ele normalmente ainda não sabe seu IP, seu gateway nem em qual rede está. Por isso, o início do DHCP usa broadcast na rede local.</p>\n  <ol class='flow-list'>\n    <li><strong>Discover:</strong> o cliente envia uma mensagem perguntando se existe servidor DHCP disponível.</li>\n    <li><strong>Offer:</strong> um servidor responde oferecendo um IP e parâmetros de rede.</li>\n    <li><strong>Request:</strong> o cliente solicita formalmente a oferta escolhida.</li>\n    <li><strong>ACK:</strong> o servidor confirma o lease e o cliente aplica IP, máscara, gateway e DNS.</li>\n  </ol>\n  <p>Quando o servidor DHCP está em outra rede, o broadcast não atravessa roteadores. O <strong>DHCP relay</strong> recebe o broadcast local e encaminha a solicitação como tráfego unicast ao servidor DHCP central, informando de qual rede/VLAN veio a solicitação para que o servidor selecione o escopo correto.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura corporativa madura separa escopos por VLAN, ambiente, localidade e função. Usuários, servidores, convidados, voz, IoT, impressoras, gestão e laboratórios não deveriam compartilhar o mesmo pool sem necessidade.</p>\n  <table class='comparison-table'><thead><tr><th>Decisão arquitetural</th><th>Quando usar</th><th>Risco se mal planejado</th></tr></thead><tbody>\n    <tr><td>IP manual</td><td>Casos muito controlados, appliances críticos ou laboratórios</td><td>IP duplicado, falta de rastreabilidade, drift</td></tr>\n    <tr><td>Reserva DHCP</td><td>Impressoras, equipamentos de rede, servidores pequenos, dispositivos previsíveis</td><td>Reserva stale, MAC trocado, inventário desatualizado</td></tr>\n    <tr><td>DHCP dinâmico</td><td>Estações, Wi-Fi, dispositivos móveis, visitantes</td><td>Escopo esgotado, lease inadequado, rogue DHCP</td></tr>\n    <tr><td>DHCP relay</td><td>Servidor DHCP central atendendo várias VLANs</td><td>VLAN sem IP helper, escopo errado, relay para servidor indevido</td></tr>\n    <tr><td>Integração DHCP-DNS</td><td>Ambientes com nomes dinâmicos e inventário</td><td>Registros antigos, takeover interno, inconsistência de PTR</td></tr>\n  </tbody></table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine um hotel. Ao chegar, você não escolhe qualquer quarto aleatoriamente. A recepção verifica disponibilidade, entrega uma chave, informa o andar, a senha do Wi-Fi, o horário do café e por quanto tempo você pode ficar. O DHCP é parecido: ele entrega um “quarto” temporário na rede e informa como usar o ambiente.</p>\n  <p>A reserva DHCP é como garantir que uma pessoa específica sempre receba o mesmo quarto quando chega. O DHCP relay é como uma recepção de um prédio encaminhando pedidos para uma central única de reservas. A integração com DNS é o cadastro que diz: “o hóspede do quarto 205 agora atende pelo nome notebook-rh-23”.</p>\n  <div class='callout'><strong>Limite da analogia:</strong> DHCP não autentica sozinho se o cliente merece acesso à rede. Para isso entram controles como 802.1X, NAC, segmentação, DHCP snooping e políticas de switch.</div>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Seu notebook conecta ao Wi-Fi de casa. Ele envia DHCP Discover. O roteador responde oferecendo <code>192.168.1.50</code>, máscara <code>255.255.255.0</code>, gateway <code>192.168.1.1</code> e DNS <code>192.168.1.1</code>. O notebook aceita, recebe ACK e passa a navegar.</p>\n  <p>Se o roteador não responder, o sistema pode configurar APIPA <code>169.254.x.x</code>. Isso não significa que a Internet está “sem DNS”; significa que o host não recebeu configuração IPv4 utilizável.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa possui VLAN 10 para usuários, VLAN 20 para voz, VLAN 30 para impressoras e VLAN 40 para convidados. O servidor DHCP fica no datacenter. Cada interface VLAN no switch L3 ou firewall possui relay apontando para o servidor DHCP central.</p>\n  <p>O servidor possui escopos separados. A VLAN de voz recebe opção DHCP específica para localizar o call manager. A VLAN de usuários recebe DNS interno e domínio de busca. A VLAN de convidados recebe DNS controlado, sem acesso a nomes internos. Impressoras recebem reservas para facilitar regras e inventário.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em uma VPC ou VNet, a plataforma geralmente entrega IP, gateway e DNS de forma automática às instâncias. O profissional pode não configurar um servidor DHCP manual, mas continua lidando com escopos, sub-redes, IPs privados, DNS privado, reservas de IP, interfaces de rede e registros associados.</p>\n  <p>Private endpoints, zonas privadas e nomes internos dependem de integração correta entre endereçamento e DNS. Uma VM pode ter IP correto e rota correta, mas falhar ao acessar um serviço privado porque o DNS está resolvendo o nome para o endpoint público.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines que criam ambientes efêmeros precisam lidar com endereços e nomes previsíveis. Em cloud, Terraform pode criar sub-redes, NICs, IPs privados e registros DNS. Em Kubernetes, CNI e IPAM distribuem endereços a pods e nodes, enquanto DNS interno resolve serviços.</p>\n  <p>O risco em DevSecOps é tratar rede como detalhe. Um módulo IaC que cria sub-redes sem padrão, registros DNS sem dono ou IPs fixos fora do IPAM pode gerar sobreposição, quebra de conectividade, registros órfãos e regras de firewall permissivas demais.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>DHCP é um alvo operacional porque influencia o caminho do tráfego. Um servidor DHCP falso pode entregar gateway ou DNS malicioso. Um escopo mal configurado pode entregar DNS externo para máquinas internas. Uma reserva esquecida pode atribuir IP privilegiado a um dispositivo não autorizado.</p>\n  <p>Defesas incluem DHCP snooping em switches, portas confiáveis para servidores/relay legítimos, NAC/802.1X, segmentação, logs de leases, alertas de escopo esgotado, revisão de reservas e integração com SIEM/IPAM. DHCP não deve ser visto apenas como comodidade; ele é parte da superfície de controle da rede.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> quem controla DHCP pode influenciar IP, gateway, DNS e rastreabilidade. Portanto, DHCP precisa de governança, logs e controles de camada 2.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 1100 680' role='img' aria-labelledby='m07l06-title m07l06-desc'>\n    <title id='m07l06-title'>DHCP DORA, relay e integração DNS</title>\n    <desc id='m07l06-desc'>Diagrama mostrando cliente em VLAN, switch com DHCP relay, servidor DHCP, DNS interno, IPAM e controles de segurança.</desc>\n    <defs><marker id='m07l06-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='6' markerHeight='6' orient='auto-start-reverse'><path d='M 0 0 L 10 5 L 0 10 z' class='svg-marker'></path></marker></defs>\n\n    <rect x='40' y='45' width='1020' height='590' rx='24' class='svg-zone'></rect>\n    <text x='550' y='85' text-anchor='middle' class='svg-label'>Fluxo DHCP e integração operacional</text>\n\n    <rect x='80' y='155' width='190' height='100' rx='16' class='svg-node svg-node--client'></rect>\n    <text x='175' y='195' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='175' y='222' text-anchor='middle' class='svg-label svg-label--small'>sem IP válido</text>\n\n    <rect x='365' y='145' width='220' height='120' rx='16' class='svg-node svg-node--switch'></rect>\n    <text x='475' y='190' text-anchor='middle' class='svg-label'>Switch/L3 ou Firewall</text>\n    <text x='475' y='220' text-anchor='middle' class='svg-label svg-label--small'>VLAN + DHCP relay</text>\n\n    <rect x='710' y='130' width='250' height='130' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='835' y='174' text-anchor='middle' class='svg-label'>Servidor DHCP</text>\n    <text x='835' y='204' text-anchor='middle' class='svg-label svg-label--small'>escopo, pool, lease, opções</text>\n\n    <line x1='270' y1='185' x2='365' y2='185' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l06-arrow)'></line>\n    <text x='318' y='170' text-anchor='middle' class='svg-label svg-label--small'>Discover</text>\n    <line x1='365' y1='228' x2='270' y2='228' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l06-arrow)'></line>\n    <text x='318' y='252' text-anchor='middle' class='svg-label svg-label--small'>Offer/ACK</text>\n\n    <line x1='585' y1='185' x2='710' y2='185' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l06-arrow)'></line>\n    <text x='648' y='166' text-anchor='middle' class='svg-label svg-label--small'>Relay unicast</text>\n    <line x1='710' y1='228' x2='585' y2='228' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l06-arrow)'></line>\n\n    <rect x='80' y='365' width='210' height='115' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='185' y='405' text-anchor='middle' class='svg-label'>Parâmetros entregues</text>\n    <text x='185' y='433' text-anchor='middle' class='svg-label svg-label--small'>IP, máscara, gateway, DNS</text>\n    <text x='185' y='458' text-anchor='middle' class='svg-label svg-label--small'>lease e domínio de busca</text>\n\n    <rect x='395' y='365' width='210' height='115' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='500' y='405' text-anchor='middle' class='svg-label'>DNS interno</text>\n    <text x='500' y='433' text-anchor='middle' class='svg-label svg-label--small'>A/PTR dinâmico</text>\n    <text x='500' y='458' text-anchor='middle' class='svg-label svg-label--small'>nomes de hosts</text>\n\n    <rect x='710' y='365' width='250' height='115' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='835' y='405' text-anchor='middle' class='svg-label'>Controles</text>\n    <text x='835' y='433' text-anchor='middle' class='svg-label svg-label--small'>DHCP snooping, NAC, logs</text>\n    <text x='835' y='458' text-anchor='middle' class='svg-label svg-label--small'>IPAM, SIEM, governança</text>\n\n    <line x1='835' y1='260' x2='500' y2='365' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l06-arrow)'></line>\n    <text x='655' y='324' text-anchor='middle' class='svg-label svg-label--small'>Atualização DNS/IPAM</text>\n    <line x1='585' y1='245' x2='835' y2='365' class='svg-flow svg-flow--blocked animated-flow' marker-end='url(#m07l06-arrow)'></line>\n    <text x='760' y='316' text-anchor='middle' class='svg-label svg-label--small'>porta confiável</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório você vai investigar uma configuração DHCP do ponto de vista do cliente e do administrador. O objetivo é provar quais parâmetros foram entregues, identificar o servidor, analisar lease, DNS, gateway, APIPA e montar evidências para troubleshooting.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de escopos, interpretação do fluxo DORA, identificação de falhas comuns e desenho de políticas de reserva, lease e integração DHCP-DNS.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário em que usuários de uma VLAN recebem APIPA, impressoras têm IP duplicado e o DNS interno aponta nomes para endereços antigos. Sua missão será montar diagnóstico, causa raiz provável e plano de correção.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como separar falha de relay, escopo esgotado, reserva errada, DNS dinâmico inconsistente e DHCP rogue usando evidências de cliente, switch, servidor DHCP e DNS.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>DHCP automatiza a entrega de parâmetros de rede e reduz erros manuais, mas também se torna uma dependência crítica. Quando DHCP está errado, o host pode ficar sem IP, receber gateway incorreto, usar DNS indevido ou criar registros inconsistentes.</p>\n  <p>Em ambientes profissionais, DHCP precisa estar integrado a DNS, IPAM, logs, NAC, segurança de camada 2 e processos de mudança. A pergunta não é apenas “o cliente recebeu IP?”, mas “recebeu os parâmetros corretos, do servidor correto, no escopo correto, com rastreabilidade correta?”.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará NTP. Depois de DNS e DHCP, o próximo serviço essencial é tempo: sem horário confiável, logs, certificados, autenticação, Kerberos, investigação e correlação de eventos ficam comprometidos.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Serviços de rede",
      "DHCP",
      "DNS",
      "Operação corporativa"
    ],
    "dependsOn": [
      "IPv4",
      "VLANs",
      "Roteamento inter-VLAN",
      "DNS",
      "Segurança de camada 2"
    ],
    "realWorldImpact": "DHCP afeta onboarding de dispositivos, disponibilidade, rastreabilidade, segurança, inventário, DNS interno e resposta a incidentes."
  },
  "protocolFields": [
    {
      "field": "op",
      "meaning": "Tipo geral da mensagem DHCP/BOOTP",
      "example": "request ou reply"
    },
    {
      "field": "xid",
      "meaning": "Identificador de transação usado para correlacionar mensagens",
      "example": "0x39f4a21b"
    },
    {
      "field": "chaddr",
      "meaning": "Endereço MAC do cliente",
      "example": "00:11:22:33:44:55"
    },
    {
      "field": "yiaddr",
      "meaning": "Endereço IPv4 oferecido ao cliente",
      "example": "192.168.10.120"
    },
    {
      "field": "giaddr",
      "meaning": "Endereço do relay/gateway que indica a rede de origem",
      "example": "192.168.20.1"
    },
    {
      "field": "Option 53",
      "meaning": "Tipo da mensagem DHCP",
      "example": "Discover, Offer, Request, ACK"
    },
    {
      "field": "Option 3",
      "meaning": "Gateway padrão entregue ao cliente",
      "example": "192.168.10.1"
    },
    {
      "field": "Option 6",
      "meaning": "Servidores DNS entregues ao cliente",
      "example": "10.0.0.10, 10.0.0.11"
    },
    {
      "field": "Option 51",
      "meaning": "Tempo de lease",
      "example": "86400 segundos"
    },
    {
      "field": "Option 82",
      "meaning": "Informação de relay/switch usada para rastreabilidade em alguns ambientes",
      "example": "circuit-id e remote-id"
    }
  ],
  "packetFlow": [
    "Cliente sem configuração válida envia DHCP Discover em broadcast local.",
    "Switch entrega o broadcast na VLAN; se houver relay, o gateway encaminha ao servidor DHCP central.",
    "Servidor escolhe escopo com base na rede de origem ou no giaddr do relay.",
    "Servidor envia Offer com IP, máscara, gateway, DNS, lease e opções.",
    "Cliente responde com Request pedindo a oferta selecionada.",
    "Servidor envia ACK confirmando o lease.",
    "Cliente aplica parâmetros, testa gateway/ARP e passa a usar DNS entregue.",
    "Quando integrado, DHCP pode atualizar registros DNS A/PTR ou acionar IPAM/inventário/logs."
  ],
  "deepDive": {
    "title": "DHCP entrega contexto, não apenas endereço",
    "points": [
      "Um cliente pode receber IP correto e ainda falhar se gateway, DNS ou domínio de busca estiver errado.",
      "Relay é essencial quando o servidor DHCP central atende múltiplas VLANs.",
      "Lease time curto ajuda redes móveis, mas aumenta renovações; lease longo reduz carga, mas mantém endereços presos por mais tempo.",
      "Reserva DHCP é preferível a IP manual quando se quer previsibilidade com governança centralizada.",
      "Integração DHCP-DNS precisa de limpeza de registros antigos e política de atualização para evitar nomes apontando para IPs errados."
    ]
  },
  "commonMistakes": [
    "Assumir que APIPA é problema de DNS ou Internet.",
    "Configurar IP manual dentro do pool DHCP e causar conflito intermitente.",
    "Esquecer DHCP relay em uma nova VLAN.",
    "Entregar DNS público para estações que precisam resolver nomes internos.",
    "Criar reservas sem atualizar IPAM/CMDB.",
    "Usar lease muito longo em rede de convidados e esgotar o escopo.",
    "Permitir portas de acesso sem DHCP snooping em redes sensíveis."
  ],
  "troubleshooting": {
    "method": "Comece pelo cliente, confirme parâmetros recebidos, identifique servidor DHCP, valide VLAN/relay/escopo e só depois investigue DNS, rota e aplicação.",
    "steps": [
      "Verifique se o cliente recebeu IP válido, máscara, gateway, DNS e lease.",
      "Confirme se o endereço está no escopo esperado da VLAN.",
      "Procure APIPA, gateway vazio, DNS externo indevido ou lease expirado.",
      "Valide conectividade com gateway por ping e ARP.",
      "No switch/roteador, verifique VLAN, trunk, SVI e DHCP relay.",
      "No servidor, verifique escopo ativo, pool disponível, reservas, exclusões e logs de lease.",
      "Compare registros DNS A/PTR associados ao host quando houver integração dinâmica.",
      "Procure sinais de DHCP rogue ou múltiplos servidores respondendo."
    ],
    "commands": [
      {
        "windows": [
          "ipconfig /all",
          "ipconfig /release",
          "ipconfig /renew",
          "Get-NetIPConfiguration",
          "Get-DnsClientServerAddress",
          "arp -a",
          "Resolve-DnsName nome-do-host"
        ],
        "linux": [
          "ip addr",
          "ip route",
          "resolvectl status",
          "cat /var/lib/dhcp/dhclient.leases",
          "sudo dhclient -v -r && sudo dhclient -v",
          "journalctl -u NetworkManager --no-pager | tail -n 80",
          "tcpdump -n -e 'port 67 or port 68'"
        ],
        "cisco": [
          "show ip interface brief",
          "show vlan brief",
          "show interfaces trunk",
          "show running-config interface vlan 10",
          "show ip dhcp binding",
          "show ip dhcp pool",
          "show ip dhcp snooping",
          "show logging | include DHCP"
        ],
        "cloud": [
          "validar subnet e DHCP options set",
          "validar DNS privado associado à VPC/VNet",
          "validar IP privado/reserva da interface de rede",
          "consultar logs de controle para alterações em DHCP/DNS"
        ]
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a DHCP profundo e integração com DNS.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
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
      "Usar DHCP snooping e marcar como confiáveis apenas portas de uplink/servidor/relay legítimas.",
      "Manter escopos, reservas e exclusões documentados no IPAM.",
      "Integrar logs de leases DHCP ao SIEM ou ferramenta de investigação.",
      "Entregar DNS interno somente a redes autorizadas e DNS restrito a convidados.",
      "Separar redes de usuários, convidados, IoT, voz, servidores e gestão.",
      "Revisar reservas antigas e registros DNS dinâmicos órfãos periodicamente."
    ],
    "badPractices": [
      "Usar IP manual sem documentação em redes com DHCP ativo.",
      "Permitir qualquer porta como fonte confiável de DHCP.",
      "Entregar gateway ou DNS de produção para redes de convidados.",
      "Usar um único escopo enorme para toda a empresa.",
      "Tratar DHCP como serviço sem logs, sem dono e sem monitoramento."
    ],
    "vulnerabilities": [
      {
        "name": "DHCP rogue",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DHCP snooping"
      },
      {
        "name": "DHCP starvation",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IP Source Guard"
      },
      {
        "name": "Entrega de DNS malicioso",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Dynamic ARP Inspection combinado com DHCP snooping"
      },
      {
        "name": "Gateway falso",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "802.1X/NAC"
      },
      {
        "name": "IP duplicado",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação por VLAN/sub-rede"
      },
      {
        "name": "Registro DNS dinâmico órfão",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento de leases"
      },
      {
        "name": "Exaustão de escopo",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Alertas de escopo esgotado"
      },
      {
        "name": "Bypass por rede de convidados mal segmentada",
        "description": "Risco relacionado à aula 7.6 — DHCP profundo e integração com DNS.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de IPAM e registros DNS"
      }
    ],
    "mitigations": [
      "DHCP snooping",
      "IP Source Guard",
      "Dynamic ARP Inspection combinado com DHCP snooping",
      "802.1X/NAC",
      "Segmentação por VLAN/sub-rede",
      "Monitoramento de leases",
      "Alertas de escopo esgotado",
      "Revisão de IPAM e registros DNS"
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
      "DHCP snooping",
      "IP Source Guard",
      "Dynamic ARP Inspection combinado com DHCP snooping",
      "802.1X/NAC",
      "Segmentação por VLAN/sub-rede",
      "Monitoramento de leases",
      "Alertas de escopo esgotado",
      "Revisão de IPAM e registros DNS"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-7.6",
    "title": "Investigando DHCP, lease, relay e integração com DNS",
    "labType": "security",
    "objective": "Identificar parâmetros DHCP recebidos por um cliente, validar gateway e DNS, reconhecer sintomas de APIPA/escopo errado e documentar evidências de lease, relay e integração DNS.",
    "scenario": "Laboratório Neste laboratório você vai investigar uma configuração DHCP do ponto de vista do cliente e do administrador. O objetivo é provar quais parâmetros foram entregues, identificar o servidor, analisar lease, DNS, gateway, APIPA e montar evidências para troubleshooting.",
    "topology": "Um cliente Windows ou Linux em uma VLAN de usuários, um gateway/SVI ou firewall com DHCP relay, um servidor DHCP/DNS interno e, opcionalmente, um switch gerenciável ou Packet Tracer.",
    "architecture": "Cliente → VLAN de acesso → switch/gateway com relay → servidor DHCP → DNS interno/IPAM/logs. Depois validar ARP, gateway, DNS e conectividade.",
    "prerequisites": [
      "Cliente Windows ou Linux com permissões de leitura de rede.",
      "Ambiente de laboratório, Packet Tracer ou rede autorizada.",
      "Não executar DHCP rogue, starvation ou captura de terceiros em rede real.",
      "Permissão administrativa se for renovar lease ou capturar pacotes."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Terminal Linux",
      "Windows PowerShell ou Prompt de Comando",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 85,
    "cost": "zero",
    "safetyNotes": [
      "Não suba servidor DHCP em rede corporativa sem autorização.",
      "Não execute testes de DHCP starvation ou rogue DHCP em rede real.",
      "Sanitize MACs, nomes internos e IPs públicos ao compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar configuração atual do cliente",
        "instruction": "Colete IP, máscara, gateway, DNS, servidor DHCP e lease.",
        "command": "Windows: ipconfig /all\nLinux: ip addr; ip route; resolvectl status",
        "expectedOutput": "Você identifica se o cliente recebeu configuração DHCP completa e coerente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Classificar o endereço recebido",
        "instruction": "Verifique se o IP pertence ao escopo esperado da VLAN ou se é APIPA.",
        "command": "comparar IP/máscara com o plano de endereçamento\nverificar se 169.254.0.0/16 aparece",
        "expectedOutput": "Você sabe se o host recebeu IP válido, escopo errado ou endereço automático por falha DHCP.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Validar gateway e ARP",
        "instruction": "Confirme que o gateway entregue responde e aparece no cache ARP.",
        "command": "ping <gateway>\nWindows: arp -a\nLinux: ip neigh",
        "expectedOutput": "Gateway local responde ou a falha aponta para VLAN, L2, ARP ou gateway incorreto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Validar DNS entregue pelo DHCP",
        "instruction": "Teste se os servidores DNS recebidos resolvem nomes internos e externos conforme esperado.",
        "command": "Windows: Resolve-DnsName nome.interno.local\nLinux: dig nome.interno.local @<dns-entregue>\nnslookup exemplo.com <dns-entregue>",
        "expectedOutput": "Você confirma se o DNS entregue é correto para aquela rede.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Renovar lease em laboratório",
        "instruction": "Force renovação apenas em ambiente autorizado para observar novo lease.",
        "command": "Windows: ipconfig /release && ipconfig /renew\nLinux: sudo dhclient -v -r && sudo dhclient -v",
        "expectedOutput": "Você observa nova negociação DHCP ou identifica erro no processo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Verificar relay e escopo no lado de rede",
        "instruction": "No switch/roteador/servidor, confirme VLAN, relay e escopo correspondente.",
        "command": "Cisco: show running-config interface vlan <id>\nCisco: show ip dhcp binding\nCisco: show ip dhcp pool\nverificar logs do servidor DHCP",
        "expectedOutput": "Você confirma se a rede de origem está associada ao escopo correto.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Verificar integração DNS",
        "instruction": "Confirme se o nome do host aponta para o IP atual e se PTR faz sentido.",
        "command": "Resolve-DnsName <hostname> -Type A\ndig A <hostname>\ndig -x <ip-do-cliente>",
        "expectedOutput": "Você identifica registros corretos, ausentes ou stale.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Produzir relatório",
        "instruction": "Documente cliente, VLAN, IP, máscara, gateway, DNS, servidor DHCP, lease, registros DNS e hipótese de causa.",
        "command": "preencher tabela de evidências",
        "expectedOutput": "Você entrega diagnóstico auditável para NOC/SOC/infra.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DHCP profundo e integração com DNS” em evidência prática ou raciocínio verificável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “DHCP profundo e integração com DNS”.",
    "validation": [
      {
        "check": "Cliente possui IP/máscara/gateway/DNS registrados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Cliente possui IP/máscara/gateway/DNS registrados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Escopo esperado foi comparado com IP recebido.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Escopo esperado foi comparado com IP recebido.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Gateway e ARP foram testados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Gateway e ARP foram testados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "DNS entregue foi validado para nomes internos e externos.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "DNS entregue foi validado para nomes internos e externos.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Lease, relay ou escopo foram verificados quando possível.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Lease, relay ou escopo foram verificados quando possível.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Relatório final contém causa provável e próximos passos.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Relatório final contém causa provável e próximos passos.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se o cliente recebe APIPA, procure falha de DHCP, VLAN, Wi-Fi, cabo, relay ou servidor indisponível.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o IP é válido mas gateway não responde, verifique gateway entregue, máscara e VLAN.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se DNS interno não resolve, compare DNS recebido com política da VLAN.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se registros DNS apontam para IP antigo, verifique integração dinâmica e limpeza de registros stale.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se duas respostas DHCP aparecem, investigue DHCP rogue em portas de acesso.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Criar política de lease por tipo de rede.",
      "Integrar DHCP, DNS, IPAM, CMDB e SIEM.",
      "Ativar DHCP snooping em switches de acesso.",
      "Criar alertas para escopo acima de 80% de uso.",
      "Documentar reservas e donos de dispositivos críticos."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “DHCP profundo e integração com DNS” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Incidente: usuários sem rede, impressoras instáveis e DNS antigo",
    "solution": "A causa provável combina alteração de relay/VLAN para usuários, sobreposição entre pool e IP manual/reserva nas impressoras e integração DHCP-DNS sem limpeza adequada de registros antigos. A correção deve ser controlada, registrada e validada por cliente, servidor e rede.",
    "expectedOutcome": "Ao final, você consegue separar falha DHCP de falha DNS, rota, ARP, VLAN ou aplicação, e sabe quais evidências coletar em cliente, rede e servidor."
  },
  "mentorQuestions": [
    "Um cliente recebeu 169.254.10.20. Quais camadas e componentes você investigaria antes de culpar a Internet?",
    "Por que uma reserva DHCP geralmente é mais governável do que configurar IP manual em uma impressora?",
    "Como você provaria que uma falha de acesso é DNS entregue por DHCP e não rota ou firewall?"
  ],
  "quiz": [
    {
      "question": "Qual sequência representa o fluxo clássico DHCP?",
      "options": [
        "Discover, Offer, Request, ACK",
        "Request, Discover, ACK, Offer",
        "ARP, DNS, TCP, ACK",
        "SYN, SYN-ACK, ACK, Lease"
      ],
      "answer": 0,
      "explanation": "O fluxo clássico é DORA: Discover, Offer, Request e ACK."
    },
    {
      "question": "O que normalmente indica um endereço 169.254.x.x em IPv4?",
      "options": [
        "DNS público configurado",
        "APIPA/link-local por falha de configuração DHCP",
        "Gateway duplicado",
        "Rota BGP preferida"
      ],
      "answer": 1,
      "explanation": "APIPA é autoconfiguração link-local usada quando o host não obtém configuração DHCP válida."
    },
    {
      "question": "Qual opção DHCP costuma entregar o gateway padrão?",
      "options": [
        "Option 3",
        "Option 6",
        "Option 51",
        "Option 82"
      ],
      "answer": 0,
      "explanation": "A opção 3 indica router/gateway padrão."
    },
    {
      "question": "Para que serve DHCP relay?",
      "options": [
        "Resolver nomes DNS externos",
        "Encaminhar solicitações DHCP entre redes/VLANs",
        "Criptografar leases",
        "Bloquear ICMP"
      ],
      "answer": 1,
      "explanation": "Relay permite que um servidor DHCP central atenda clientes em redes diferentes."
    },
    {
      "question": "Qual controle ajuda a impedir servidores DHCP falsos em portas de acesso?",
      "options": [
        "DHCP snooping",
        "CNAME",
        "TTL baixo",
        "Traceroute"
      ],
      "answer": 0,
      "explanation": "DHCP snooping marca portas confiáveis e bloqueia respostas DHCP indevidas em portas não confiáveis."
    },
    {
      "question": "Qual risco existe em entregar DNS externo para estações internas?",
      "options": [
        "Elas resolvem nomes internos mais rápido",
        "Nomes internos podem falhar e políticas corporativas de DNS podem ser contornadas",
        "O gateway deixa de existir",
        "O lease vira estático"
      ],
      "answer": 1,
      "explanation": "DNS externo pode impedir resolução interna e contornar monitoramento/políticas de DNS corporativo."
    }
  ],
  "flashcards": [
    {
      "front": "O que é DHCP?",
      "back": "Protocolo que entrega automaticamente parâmetros de rede como IP, máscara, gateway, DNS, lease e opções."
    },
    {
      "front": "O que significa DORA?",
      "back": "Discover, Offer, Request e ACK."
    },
    {
      "front": "O que é lease DHCP?",
      "back": "Tempo pelo qual o cliente pode usar a configuração recebida antes de renovar."
    },
    {
      "front": "O que é DHCP relay?",
      "back": "Função que encaminha pedidos DHCP de uma VLAN/rede para um servidor DHCP em outra rede."
    },
    {
      "front": "O que é reserva DHCP?",
      "back": "Associação previsível entre um cliente, geralmente identificado por MAC/ID, e um endereço IP específico."
    },
    {
      "front": "O que é DHCP snooping?",
      "back": "Controle de switch que ajuda a bloquear respostas DHCP falsas em portas não confiáveis."
    }
  ],
  "exercises": [
    {
      "title": "Classificar parâmetros DHCP",
      "prompt": "Um cliente recebeu IP 10.10.20.45/24, gateway 10.10.20.1, DNS 8.8.8.8 e domínio empresa.local. Identifique o risco operacional.",
      "expectedAnswer": "O IP e gateway podem estar corretos, mas DNS público provavelmente não resolve nomes internos e pode burlar política corporativa."
    },
    {
      "title": "Diagnosticar APIPA",
      "prompt": "Liste cinco hipóteses para um host em VLAN de usuários receber 169.254.80.10.",
      "expectedAnswer": "Cabo/Wi-Fi, VLAN errada, trunk/porta, relay ausente, servidor DHCP indisponível, escopo esgotado, NAC bloqueando, firewall entre relay e servidor."
    },
    {
      "title": "Escolher lease time",
      "prompt": "Compare lease de 8 horas e 7 dias para rede de convidados.",
      "expectedAnswer": "Lease curto libera IPs mais rápido e reduz esgotamento em redes móveis; lease longo reduz renovações, mas pode prender IPs de visitantes que foram embora."
    },
    {
      "title": "Reserva versus IP manual",
      "prompt": "Explique por que uma impressora corporativa pode usar reserva DHCP em vez de IP manual.",
      "expectedAnswer": "Reserva mantém IP previsível com gestão central, reduz conflito, facilita IPAM, logs e mudança de DNS/gateway sem tocar manualmente no dispositivo."
    }
  ],
  "challenge": {
    "title": "Incidente: usuários sem rede, impressoras instáveis e DNS antigo",
    "scenario": "Na VLAN 30, parte dos usuários recebe APIPA. Na VLAN 40, impressoras têm conflito de IP. No DNS, nomes de notebooks apontam para IPs antigos. O servidor DHCP fica em outra rede e o switch L3 foi alterado ontem.",
    "tasks": [
      "Montar hipóteses por sintoma.",
      "Listar comandos de cliente, switch e servidor.",
      "Identificar causa raiz provável para cada problema.",
      "Propor correção e prevenção.",
      "Definir evidências para anexar ao incidente."
    ],
    "rubric": [
      "Separa APIPA de DNS e aplicação.",
      "Inclui verificação de relay/VLAN/escopo.",
      "Trata conflito de IP com pool, reservas e exclusões.",
      "Inclui DNS dinâmico/registro stale.",
      "Inclui controles de prevenção e documentação."
    ]
  },
  "commentedSolution": {
    "summary": "A investigação deve começar pela camada local do cliente e seguir para VLAN, relay, escopo, lease e DNS.",
    "steps": [
      "Para APIPA, verificar ipconfig/ip addr, porta, VLAN, relay, servidor DHCP e escopo esgotado.",
      "Para impressoras, comparar IP manual, reserva DHCP, exclusões e pool para evitar sobreposição.",
      "Para DNS antigo, consultar A/PTR, verificar atualização dinâmica, TTL e registros stale.",
      "Se o switch L3 foi alterado, validar SVIs, trunks, allowed VLANs e ip helper-address.",
      "Como prevenção, ativar DHCP snooping, revisar IPAM, monitorar escopos e documentar mudanças."
    ],
    "finalAnswer": "A causa provável combina alteração de relay/VLAN para usuários, sobreposição entre pool e IP manual/reserva nas impressoras e integração DHCP-DNS sem limpeza adequada de registros antigos. A correção deve ser controlada, registrada e validada por cliente, servidor e rede."
  },
  "glossary": [
    {
      "term": "DHCP",
      "definition": "Protocolo que entrega parâmetros de rede automaticamente a clientes."
    },
    {
      "term": "DORA",
      "definition": "Fluxo Discover, Offer, Request e Acknowledgement."
    },
    {
      "term": "Lease",
      "definition": "Tempo de validade da configuração DHCP entregue."
    },
    {
      "term": "Escopo DHCP",
      "definition": "Conjunto de endereços e opções associados a uma sub-rede."
    },
    {
      "term": "DHCP relay",
      "definition": "Componente que encaminha solicitações DHCP entre redes diferentes."
    },
    {
      "term": "Reserva DHCP",
      "definition": "Associação previsível entre cliente e IP no servidor DHCP."
    },
    {
      "term": "DHCP snooping",
      "definition": "Controle de switch para filtrar respostas DHCP não autorizadas."
    },
    {
      "term": "APIPA",
      "definition": "Endereçamento IPv4 link-local 169.254.0.0/16 usado quando DHCP falha."
    }
  ],
  "references": [
    {
      "title": "RFC 2131 — Dynamic Host Configuration Protocol",
      "type": "standard"
    },
    {
      "title": "RFC 2132 — DHCP Options and BOOTP Vendor Extensions",
      "type": "standard"
    },
    {
      "title": "Cisco — DHCP Snooping Configuration Guide",
      "type": "vendor-doc"
    },
    {
      "title": "Microsoft — DHCP and DNS dynamic updates",
      "type": "vendor-doc"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "Módulo 4",
      "lesson": "4.7",
      "reason": "Configuração IPv4 manual, DHCP e reservas foi introduzida antes do aprofundamento."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 3",
      "lesson": "3.9",
      "reason": "DHCP snooping se relaciona a segurança de camada 2."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Automação e IaC",
      "reason": "IPAM, DNS e DHCP precisam ser refletidos em mudanças versionadas e auditáveis."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Identidade corporativa",
      "reason": "Nomes, DNS, horário e rede afetam autenticação, Kerberos, certificados e controles de acesso."
    }
  ],
  "progressRules": {
    "requiresLabCompletion": true,
    "requiresQuizCompletion": true,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "7.7"
    ],
    "minimumQuizScore": 70,
    "requiredArtifacts": [
      "Tabela de parâmetros DHCP do cliente",
      "Diagnóstico de escopo/relay",
      "Validação DNS entregue por DHCP",
      "Plano de mitigação para DHCP rogue e registros stale"
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
