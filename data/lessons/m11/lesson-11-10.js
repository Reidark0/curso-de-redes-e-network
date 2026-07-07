export const lesson1110 = {
  "id": "11.10",
  "moduleId": "m11",
  "order": 10,
  "title": "Projeto integrador: rede roteada segura com validação objetiva",
  "subtitle": "Capstone do M11 com arquitetura, endereçamento, rotas, matriz de fluxos, evidências, RCA e rubrica de avaliação.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "ligação/revisão",
  "xp": 280,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "revisão",
    "arquitetura",
    "inter-vlan",
    "rota estática",
    "rota default",
    "ospf",
    "bgp",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops",
    "firewall",
    "matriz de comunicação",
    "projeto",
    "rubrica",
    "RCA",
    "matriz de fluxos",
    "validação objetiva",
    "arquitetura segura"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.1",
      "title": "Por que roteamento existe",
      "reason": "Explica a motivação do roteamento entre redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "title": "Tabela de rotas, longest prefix match e validação de caminho",
      "reason": "Define como caminhos são escolhidos por tabela de rotas e longest prefix match."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.3",
      "title": "Rota default, gateway de último recurso e falhas de saída",
      "reason": "Mostra como destinos desconhecidos são encaminhados por rota default."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.4",
      "title": "Rotas estáticas e rotas flutuantes",
      "reason": "Mostra caminhos manuais e backup por rotas estáticas e flutuantes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.5",
      "title": "Roteamento inter-VLAN",
      "reason": "Aplica roteamento entre segmentos internos e VLANs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.6",
      "title": "Métrica, distância administrativa e escolha de caminho",
      "reason": "Explica desempate e preferência de rotas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.7",
      "title": "OSPF introdutório",
      "reason": "Apresenta roteamento dinâmico interno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.8",
      "title": "BGP introdutório e Internet",
      "reason": "Apresenta roteamento entre domínios e Internet."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.9",
      "title": "Troubleshooting com traceroute, mtr, route print e ip route",
      "reason": "Fornece o método prático de validação com traceroute, mtr, route print e ip route."
    }
  ],
  "objectives": [
    "Desenhar uma rede roteada segura integrando sub-redes, VLANs, gateways, firewalls e rotas.",
    "Explicar o fluxo de um pacote IPv4 desde o host de origem até uma rede remota e o retorno.",
    "Distinguir quando usar rota conectada, rota estática, rota default, rota flutuante, OSPF ou BGP.",
    "Construir uma matriz de comunicação entre zonas de segurança.",
    "Planejar validações com ping, traceroute, mtr, route print, ip route e show ip route.",
    "Identificar riscos de roteamento: rota ampla, caminho assimétrico, ausência de retorno, bypass de firewall e route leak."
  ],
  "learningOutcomes": [
    "Ler um desenho de rede e transformá-lo em tabela de rotas e pontos de controle.",
    "Justificar gateways, rotas default, rotas específicas e pontos de inspeção.",
    "Produzir um plano de validação e troubleshooting antes de alterar uma rede real.",
    "Relacionar roteamento com segurança, cloud, DevSecOps e continuidade operacional.",
    "Explicar por que roteamento não substitui firewall, IAM, criptografia ou monitoramento."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Até aqui, você aprendeu as peças separadas: endereço IPv4, subnetting, gateway, tabela de rotas, rota default, rotas estáticas, inter-VLAN, métrica, OSPF, BGP introdutório e ferramentas de diagnóstico. A revisão prática existe para juntar tudo em uma única pergunta de arquitetura: <strong>como desenhar uma rede em que os pacotes cheguem ao destino certo, voltem pelo caminho esperado e passem pelos controles de segurança corretos?</strong></p>\n  <p>Em ambiente corporativo, o problema raramente é apenas “pingar ou não pingar”. O problema real é saber se a estação do usuário deve chegar ao servidor, se o servidor deve sair para a Internet, se a rede de convidados deve ser isolada, se a DMZ deve alcançar o banco de dados, se a cloud deve anunciar os prefixos corretos, se a filial tem rota de retorno e se o firewall consegue manter estado da conexão.</p>\n  <div class='callout callout--problem'><strong>Ideia central:</strong> uma rede roteada segura é um conjunto coerente de endereçamento, rotas, gateways, política, observabilidade e governança. Roteamento entrega caminho; segurança decide se esse caminho deve ser permitido.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>No início das redes locais, muitos ambientes eram pequenos o suficiente para funcionar como uma única rede plana. Conforme empresas cresceram, surgiram filiais, datacenters, provedores, Internet pública, VPNs, clouds, redes de terceiros e múltiplas zonas de segurança. Uma única LAN deixou de ser suficiente.</p>\n  <p>O roteamento nasceu para permitir que redes diferentes se comunicassem sem transformar tudo em um único domínio de broadcast. Com o tempo, rotas manuais resolveram pequenos cenários, protocolos dinâmicos como OSPF resolveram ambientes internos maiores e BGP tornou-se a linguagem de troca de alcance entre sistemas autônomos, provedores, empresas e clouds.</p>\n  <p>Hoje, roteamento aparece em roteadores físicos, firewalls, switches L3, sistemas operacionais, hypervisors, SD-WAN, Kubernetes, VPCs, VNets, gateways VPN, appliances virtuais e serviços gerenciados de cloud. O conceito permanece o mesmo: escolher o próximo salto para entregar pacotes entre prefixos.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema prático é que redes reais possuem múltiplos caminhos, múltiplos domínios, múltiplos donos e múltiplas regras. Um pacote pode sair por um firewall, voltar por outro, passar por uma VPN, cair em uma rota default errada, ser encaminhado por uma rota mais específica indevida ou chegar ao destino sem que a resposta saiba voltar.</p>\n  <p>Os sintomas costumam ser confusos: ping funciona, aplicação falha; traceroute para no meio, mas o serviço responde; DNS resolve, mas TCP não conecta; rota existe em um lado, mas não no retorno; rota cloud está certa, mas o security group bloqueia; OSPF aprende o prefixo, mas o firewall não tem política; BGP anuncia demais e vaza tráfego.</p>\n  <div class='callout callout--warning'><strong>Erro comum:</strong> desenhar rede como linhas entre caixas, sem documentar prefixos, gateways, rotas, retorno, matriz de comunicação, pontos de inspeção e validação. Esse desenho parece bonito, mas não serve para operar, auditar ou proteger.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <ol class='flow-list'>\n    <li><strong>Rede plana:</strong> todos no mesmo domínio, simples no começo, ruim para escala e segurança.</li>\n    <li><strong>Subnetting e VLANs:</strong> separação lógica por função, localidade e risco.</li>\n    <li><strong>Gateway por rede:</strong> cada sub-rede passa a ter um ponto de saída L3.</li>\n    <li><strong>Rotas estáticas:</strong> caminhos manuais para destinos conhecidos.</li>\n    <li><strong>Rotas flutuantes:</strong> backup com distância administrativa maior.</li>\n    <li><strong>OSPF:</strong> aprendizado dinâmico interno, convergência e topologias maiores.</li>\n    <li><strong>BGP:</strong> troca de prefixos entre domínios, provedores, Internet e cloud híbrida.</li>\n    <li><strong>Cloud e DevSecOps:</strong> rotas passam a ser versionadas em IaC, revisadas em pull request e auditadas por política.</li>\n  </ol>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Uma rede roteada segura é uma arquitetura em que cada sub-rede possui um propósito, um gateway, uma política de comunicação, uma tabela de rotas coerente e um caminho de retorno previsto. O desenho não é apenas conectividade; é <strong>conectividade controlada</strong>.</p>\n  <div class='definition-box'>\n    <p><strong>Roteamento:</strong> processo de escolher o próximo salto para entregar pacotes IPv4 entre redes diferentes.</p>\n    <p><strong>Segurança de roteamento:</strong> conjunto de decisões que evita caminhos amplos demais, rotas inesperadas, bypass de inspeção, anúncios indevidos e comunicação não autorizada entre zonas.</p>\n  </div>\n  <table class='comparison-table'>\n    <thead><tr><th>Elemento</th><th>Resolve</th><th>Não resolve sozinho</th></tr></thead>\n    <tbody>\n      <tr><td>Subnetting</td><td>Divide blocos em redes menores.</td><td>Não cria política de acesso.</td></tr>\n      <tr><td>VLAN</td><td>Segmenta domínio L2.</td><td>Não roteia entre redes.</td></tr>\n      <tr><td>Gateway</td><td>Encaminha para outras redes.</td><td>Não decide regra de negócio por si só.</td></tr>\n      <tr><td>Rota</td><td>Diz para onde enviar pacotes.</td><td>Não garante que o tráfego é permitido.</td></tr>\n      <tr><td>Firewall</td><td>Controla comunicação.</td><td>Não corrige endereçamento ou rota de retorno mal planejados.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um host envia um pacote para uma rede remota, ele executa uma sequência lógica. Primeiro, aplica a máscara para saber se o destino é local. Se não for local, consulta a tabela de rotas. A rota mais específica vence pelo longest prefix match. Depois, se houver rotas concorrentes da mesma especificidade, entram critérios como distância administrativa e métrica. O host então resolve o MAC do próximo salto via ARP e entrega o frame ao gateway.</p>\n  <p>No roteador, firewall ou switch L3, o processo se repete. O equipamento recebe um frame, remove o cabeçalho de Camada 2, examina o destino IPv4, consulta a tabela de rotas, decrementa o TTL, aplica políticas quando existirem, escolhe a interface de saída, resolve o próximo MAC se necessário e cria um novo frame Ethernet para o próximo enlace. O pacote IPv4 segue adiante; os MACs mudam a cada enlace.</p>\n  <div class='callout'><strong>Checklist mental:</strong> destino é local? qual rota vence? qual é o next hop? existe rota de retorno? existe política permitindo? há NAT? o caminho é simétrico? há logs?</div>\n</section>\n<section class=\"lesson-section lesson-section--internals\"><h2>P1-08 — Do desenho bonito ao desenho validável</h2>\n    <p>Uma arquitetura de rede não está pronta quando o diagrama parece organizado. Ela está pronta quando cada fluxo importante possui prefixo, gateway, rota de ida, rota de retorno, política de segurança, evidência de teste, dono e plano de rollback.</p>\n    <p>Este projeto final do módulo transforma roteamento em prática corporativa: você deverá entregar uma rede roteada para matriz, servidores, usuários, gestão, filial e cloud, com validação objetiva e troubleshooting guiado.</p>\n  </section>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>O desenho de referência desta aula possui usuários, servidores, DMZ, gestão, filial e cloud. Cada zona usa prefixo próprio, gateway próprio e política explícita. O tráfego entre zonas passa por firewall ou ponto de inspeção. A rede interna pode usar OSPF para aprender rotas entre core, distribuição e filial. A conexão com cloud ou provedor pode usar BGP quando há troca dinâmica de prefixos.</p>\n  <table class='data-table'>\n    <thead><tr><th>Zona</th><th>Prefixo exemplo</th><th>Gateway</th><th>Política esperada</th></tr></thead>\n    <tbody>\n      <tr><td>Usuários</td><td>10.60.10.0/24</td><td>10.60.10.1</td><td>Acessa aplicações autorizadas, DNS e serviços corporativos.</td></tr>\n      <tr><td>Servidores</td><td>10.60.20.0/24</td><td>10.60.20.1</td><td>Recebe somente portas necessárias.</td></tr>\n      <tr><td>DMZ</td><td>10.60.30.0/24</td><td>10.60.30.1</td><td>Exposição controlada e sem acesso amplo ao banco.</td></tr>\n      <tr><td>Gestão</td><td>10.60.40.0/26</td><td>10.60.40.1</td><td>Acesso administrativo restrito, monitorado e autenticado.</td></tr>\n      <tr><td>Cloud</td><td>10.70.0.0/16</td><td>Gateway VPN/BGP</td><td>Comunicação mínima, sem sobreposição de CIDR.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Pense em uma empresa com prédios, departamentos, portarias, corredores e regras de acesso. O endereço IPv4 é o endereço do departamento. A VLAN é uma ala do prédio. O gateway é a portaria daquela ala. A tabela de rotas é o mapa de corredores. O firewall é o segurança que confere se a pessoa pode passar. O OSPF é o sistema interno que mantém os mapas atualizados entre prédios. O BGP é o acordo entre empresas, provedores e filiais externas para dizer quais endereços cada uma alcança.</p>\n  <p>A limitação da analogia é que pacotes não “pensam”: eles seguem tabelas. Se a tabela ou a regra estiver errada, o tráfego pode ir para o lugar errado, não voltar, passar por fora da inspeção ou ser bloqueado sem explicação clara.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Um notebook em <code>192.168.10.25/24</code> quer acessar um servidor em <code>192.168.20.50/24</code>. Como o destino não está na mesma rede, o notebook envia o pacote ao gateway <code>192.168.10.1</code>. O gateway precisa ter rota para <code>192.168.20.0/24</code>. O servidor também precisa ter rota de retorno para <code>192.168.10.0/24</code>, normalmente por seu próprio gateway <code>192.168.20.1</code>.</p>\n  <p>Se o ping falhar, as perguntas são: IP e máscara estão corretos? gateway existe? ARP resolve o gateway? a tabela de rotas aponta para o caminho certo? o firewall permite ICMP? o servidor responde? a resposta sabe voltar?</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa separa usuários, servidores, impressoras, Wi-Fi corporativo, convidados, CFTV, IoT, gestão e DMZ. Cada segmento tem sub-rede e gateway próprios. O core L3 ou firewall faz inter-VLAN. O tráfego de usuários para servidores passa por políticas específicas. A rede de convidados sai somente para a Internet. A gestão acessa switches, firewalls e servidores por portas administrativas, com MFA e registro.</p>\n  <p>A equipe de redes mantém tabela de rotas, IPAM, matriz de comunicação, documentação de VLANs, rotas OSPF, rotas estáticas para terceiros e monitoramento. A equipe de segurança valida se não existe any-any interno, rota para rede sensível sem firewall, gateway indevido ou rota legada de projeto antigo.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, a lógica de roteamento aparece em route tables, subnets, NAT Gateway, Internet Gateway, VPN Gateway, Transit Gateway, peering, PrivateLink/private endpoint e firewalls gerenciados. Uma sub-rede pública geralmente possui rota para Internet Gateway. Uma sub-rede privada pode sair por NAT Gateway. Uma sub-rede sensível pode ter somente rotas internas e endpoints privados.</p>\n  <p>Em ambientes híbridos, BGP pode anunciar prefixos entre datacenter e cloud. O risco é sobrepor CIDRs, anunciar blocos amplos demais, esquecer rota de retorno, criar caminhos assimétricos ou permitir que uma rota mais específica contorne inspeção central.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, o desenho de rotas vira código: Terraform, OpenTofu, Pulumi, Ansible, Helm e manifests de rede. Uma mudança em uma route table pode liberar saída para Internet, conectar uma VPC a outra, permitir acesso de pipeline a um cluster, alterar caminho para um banco ou quebrar uma VPN.</p>\n  <p>Por isso, rotas e prefixos precisam de revisão por pull request, validação de sobreposição, testes automatizados de política, checagem contra <code>0.0.0.0/0</code> indevido, tagging, aprovação de segurança e documentação. O pipeline não deve apenas “aplicar infraestrutura”; deve impedir caminhos perigosos.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Um incidente comum é uma rota específica criada para resolver urgência operacional. Exemplo: <code>10.60.20.0/24</code> deveria passar pelo firewall, mas alguém cria uma rota mais específica <code>10.60.20.50/32</code> por outro túnel. Pelo longest prefix match, o tráfego para aquele servidor contorna o caminho principal.</p>\n  <p>Outro exemplo é uma VPN com <code>10.0.0.0/8</code> liberado para parceiro. Funciona rápido, mas amplia o alcance além do necessário. Em segurança, o objetivo é reduzir blast radius: anunciar somente prefixos necessários, permitir somente portas necessárias, registrar fluxos e validar caminhos.</p>\n  <div class='callout callout--security'><strong>Princípio defensivo:</strong> rota não é autorização. Todo caminho relevante precisa de política, logging, dono, justificativa e revisão periódica.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m11l10-title m11l10-desc'>\n    <title id='m11l10-title'>Rede roteada segura com zonas, firewall, OSPF, BGP e cloud</title>\n    <desc id='m11l10-desc'>Diagrama de revisão mostrando usuários, servidores, DMZ, gestão, firewall, core roteado, filial, Internet e cloud com rotas e pontos de controle.</desc>\n    <defs>\n      <marker id='m11l10-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='30' y='50' width='170' height='85' rx='12' class='svg-node svg-node--client'></rect>\n    <text x='115' y='82' text-anchor='middle' class='svg-label'>Usuários</text>\n    <text x='115' y='106' text-anchor='middle' class='svg-label svg-label--small'>10.60.10.0/24</text>\n    <rect x='30' y='165' width='170' height='85' rx='12' class='svg-node svg-node--server'></rect>\n    <text x='115' y='197' text-anchor='middle' class='svg-label'>Servidores</text>\n    <text x='115' y='221' text-anchor='middle' class='svg-label svg-label--small'>10.60.20.0/24</text>\n    <rect x='30' y='280' width='170' height='85' rx='12' class='svg-node svg-node--firewall'></rect>\n    <text x='115' y='312' text-anchor='middle' class='svg-label'>DMZ</text>\n    <text x='115' y='336' text-anchor='middle' class='svg-label svg-label--small'>10.60.30.0/24</text>\n    <rect x='30' y='395' width='170' height='85' rx='12' class='svg-node svg-node--security'></rect>\n    <text x='115' y='427' text-anchor='middle' class='svg-label'>Gestão</text>\n    <text x='115' y='451' text-anchor='middle' class='svg-label svg-label--small'>10.60.40.0/26</text>\n    <rect x='285' y='190' width='180' height='115' rx='16' class='svg-node svg-node--switch'></rect>\n    <text x='375' y='232' text-anchor='middle' class='svg-label'>Core L3 / OSPF</text>\n    <text x='375' y='258' text-anchor='middle' class='svg-label svg-label--small'>SVIs + rotas internas</text>\n    <rect x='545' y='190' width='175' height='115' rx='16' class='svg-node svg-node--firewall'></rect>\n    <text x='632' y='229' text-anchor='middle' class='svg-label'>Firewall</text>\n    <text x='632' y='255' text-anchor='middle' class='svg-label svg-label--small'>Política + NAT + logs</text>\n    <rect x='785' y='70' width='155' height='85' rx='12' class='svg-node svg-node--cloud'></rect>\n    <text x='862' y='102' text-anchor='middle' class='svg-label'>Cloud</text>\n    <text x='862' y='126' text-anchor='middle' class='svg-label svg-label--small'>10.70.0.0/16</text>\n    <rect x='785' y='235' width='155' height='85' rx='12' class='svg-node svg-node--router'></rect>\n    <text x='862' y='267' text-anchor='middle' class='svg-label'>Internet / ISP</text>\n    <text x='862' y='291' text-anchor='middle' class='svg-label svg-label--small'>BGP / default</text>\n    <rect x='785' y='395' width='155' height='85' rx='12' class='svg-node svg-node--router'></rect>\n    <text x='862' y='427' text-anchor='middle' class='svg-label'>Filial</text>\n    <text x='862' y='451' text-anchor='middle' class='svg-label svg-label--small'>10.80.0.0/16</text>\n    <line x1='200' y1='92' x2='285' y2='220' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <line x1='200' y1='207' x2='285' y2='245' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <line x1='200' y1='322' x2='285' y2='270' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <line x1='200' y1='437' x2='285' y2='288' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <line x1='465' y1='247' x2='545' y2='247' class='svg-flow svg-flow--blocked animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <line x1='720' y1='220' x2='785' y2='122' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <line x1='720' y1='255' x2='785' y2='277' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <line x1='720' y1='292' x2='785' y2='437' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m11l10-arrow)'></line>\n    <text x='505' y='228' text-anchor='middle' class='svg-label svg-label--small'>matriz de comunicação</text>\n    <text x='752' y='195' text-anchor='middle' class='svg-label svg-label--small'>VPN/BGP</text>\n    <text x='752' y='335' text-anchor='middle' class='svg-label svg-label--small'>rotas + retorno</text>\n    <rect x='300' y='340' width='390' height='135' rx='14' class='svg-zone'></rect>\n    <text x='495' y='370' text-anchor='middle' class='svg-label'>Checklist de desenho seguro</text>\n    <text x='495' y='398' text-anchor='middle' class='svg-label svg-label--small'>prefixos sem sobreposição • rota de ida e retorno</text>\n    <text x='495' y='425' text-anchor='middle' class='svg-label svg-label--small'>longest prefix match • firewall no caminho esperado</text>\n    <text x='495' y='452' text-anchor='middle' class='svg-label svg-label--small'>logs • testes • rollback • dono • revisão</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>O laboratório final do módulo consiste em desenhar, documentar e validar uma rede roteada segura para uma pequena empresa híbrida. O objetivo não é apenas criar conectividade; é demonstrar que o caminho de ida, o caminho de volta e a política de segurança foram pensados.</p>\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios forçam a leitura de cenários com rotas conflitantes, gateways, inter-VLAN, default route, OSPF, BGP e troubleshooting. A meta é treinar raciocínio operacional, não decorar comandos.</p>\n</section>\n",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>Desafio integrador P1-08</h2>\n    <p>Você receberá requisitos de negócio e deverá produzir uma arquitetura defensável. O resultado esperado não é uma resposta única, mas uma proposta tecnicamente justificada, testável e auditável.</p>\n    <div class=\"callout callout--problem\"><strong>Entregáveis obrigatórios:</strong> diagrama, plano de endereçamento, tabela de rotas, matriz de fluxos, política de segurança, evidências de teste, troubleshooting e RCA de uma falha simulada.</div>\n  </section>",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada mostra uma forma defensável de organizar o desenho. Em redes reais existem alternativas, mas toda alternativa deve ser justificável, testável e auditável.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>Roteamento IPv4 conecta redes, mas uma rede corporativa segura exige mais do que caminhos. Exige prefixos bem planejados, tabela de rotas coerente, gateways corretos, retorno previsto, firewall no caminho esperado, rotas dinâmicas bem controladas, cloud sem sobreposição, logs, troubleshooting e governança.</p>\n  <p>Ao terminar este módulo, você deve conseguir olhar para uma topologia e perguntar: quais redes existem, quem é o gateway, qual rota vence, por onde o pacote passa, como ele volta, qual controle autoriza a comunicação e como eu provo isso com evidências?</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>O próximo módulo avança para serviços fundamentais de rede, começando por DNS. Depois de entender como o pacote encontra caminho, você aprenderá como nomes são resolvidos para endereços e por que DNS é uma das bases mais críticas para operação, cloud, DevSecOps e segurança.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 3",
      "Camada 2 como suporte",
      "Camada 4 para validação de aplicação"
    ],
    "beforeThisLesson": "O aluno já estudou IPv4, subnetting, rotas, inter-VLAN, OSPF, BGP introdutório e troubleshooting.",
    "afterThisLesson": "O aluno estará pronto para estudar serviços de rede como DNS com visão de caminho, rota e política.",
    "dependsOnPreviousCourses": [
      "Este assunto depende do entendimento de VLANs e ARP do Módulo 3 do curso Redes.",
      "Este assunto depende de IPv4 e subnetting dos Módulos 4 e 5.",
      "No curso Infraestrutura Moderna, Platform Engineering e DevSecOps, este conteúdo se conecta com IaC, pipelines, Kubernetes e cloud networking.",
      "No curso Identity, Access Management e Segurança de Identidades, este conteúdo se conecta à ideia de perímetro, trust boundaries e acesso a serviços."
    ]
  },
  "protocolFields": [
    {
      "name": "Destination Prefix",
      "description": "Rede de destino usada na tabela de rotas.",
      "example": "10.70.0.0/16"
    },
    {
      "name": "Prefix Length",
      "description": "Quantidade de bits de rede que define especificidade da rota.",
      "example": "/24 vence /16 para um destino dentro de ambos."
    },
    {
      "name": "Next Hop",
      "description": "Próximo roteador ou gateway para o qual o pacote será enviado.",
      "example": "10.60.254.2"
    },
    {
      "name": "Outgoing Interface",
      "description": "Interface pela qual o pacote sai.",
      "example": "Vlan10, eth0, GigabitEthernet0/1"
    },
    {
      "name": "Administrative Distance",
      "description": "Preferência da origem da rota quando há rotas concorrentes da mesma especificidade.",
      "example": "Conectada, estática, OSPF, BGP."
    },
    {
      "name": "Metric",
      "description": "Custo interno usado para escolher entre rotas da mesma origem/protocolo.",
      "example": "Custo OSPF menor vence."
    },
    {
      "name": "Route Origin",
      "description": "Fonte pela qual a rota foi aprendida.",
      "example": "Connected, static, OSPF, BGP, cloud route table."
    },
    {
      "name": "Policy Point",
      "description": "Local em que ACL, firewall ou regra cloud decide se a comunicação é permitida.",
      "example": "Firewall entre servidores e DMZ."
    }
  ],
  "packetFlow": [
    "Host aplica máscara e decide que o destino não é local.",
    "Host consulta a tabela de rotas e escolhe a rota vencedora pelo longest prefix match.",
    "Host resolve o MAC do gateway via ARP e envia o frame ao próximo salto.",
    "Gateway remove o cabeçalho L2, decrementa TTL e consulta sua própria tabela de rotas.",
    "Firewall ou roteador aplica política quando o tráfego atravessa zona de segurança.",
    "Roteadores internos podem usar OSPF para conhecer prefixos corporativos.",
    "Gateways de borda ou cloud podem usar BGP para trocar prefixos externos ou híbridos.",
    "O destino responde usando sua própria tabela de rotas; a rota de retorno precisa existir e ser permitida.",
    "Ferramentas como traceroute, mtr, route print, ip route e show ip route validam a hipótese de caminho.",
    "Logs, flow logs e captura controlada confirmam política, NAT, bloqueio, assimetria ou perda."
  ],
  "deepDive": {
    "title": "Como auditar mentalmente uma rede roteada",
    "sections": [
      {
        "title": "1. Prefixos",
        "body": "Liste todos os prefixos, donos, ambientes, localidades e zonas. Procure sobreposição, blocos amplos e sub-redes sem finalidade clara."
      },
      {
        "title": "2. Gateways",
        "body": "Confirme se cada sub-rede tem gateway correto, se o gateway está no equipamento esperado e se o DHCP entrega a opção certa."
      },
      {
        "title": "3. Rotas",
        "body": "Para cada comunicação, identifique rota de ida, rota de retorno, next hop, interface de saída e rota default."
      },
      {
        "title": "4. Política",
        "body": "Verifique onde ACL, firewall, SG/NSG/NACL ou política de SDN permite ou bloqueia a comunicação."
      },
      {
        "title": "5. Observabilidade",
        "body": "Confirme que há logs, flow logs, métricas, NetFlow/sFlow quando aplicável, alertas e evidências sanitizáveis."
      },
      {
        "title": "6. Mudança",
        "body": "Toda alteração de rota deve ter justificativa, impacto, janela, rollback e validação pós-mudança."
      }
    ],
    "operationalImpact": [
      "Projetos de roteamento sem matriz de fluxos dificultam troubleshooting e aprovação de mudanças.",
      "Validação objetiva reduz retrabalho porque separa erro de rota, erro de política, erro de DNS e erro de aplicação.",
      "RCA e teste de regressão criam memória operacional para incidentes futuros."
    ],
    "financialImpact": [
      "Arquitetura híbrida pode gerar custo com VPN, firewall, NAT, tráfego inter-zona, link dedicado e logs.",
      "Centralizar tráfego em firewall ou transit gateway pode melhorar segurança, mas aumentar custo por throughput.",
      "Falhas de desenho geram horas de troubleshooting e podem exigir appliances ou links adicionais depois da implantação."
    ],
    "securityImpact": [
      "Rotas mal planejadas podem permitir bypass de firewall, comunicação lateral indevida ou exposição de gestão.",
      "Matriz de fluxos reduz regras any-any e força justificativa de portas, origens e destinos.",
      "Logs e evidências ajudam SOC/Blue Team a diferenciar falha operacional de comportamento suspeito."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Criar rota específica para resolver urgência e esquecer depois.",
      "impact": "Pode desviar tráfego de firewall, gerar bypass ou quebrar simetria."
    },
    {
      "mistake": "Usar rota default como solução para tudo.",
      "impact": "Tráfego vai para caminhos amplos sem controle granular."
    },
    {
      "mistake": "Planejar ida e esquecer retorno.",
      "impact": "Conexões falham ou firewalls stateful descartam respostas."
    },
    {
      "mistake": "Confundir VLAN com segurança completa.",
      "impact": "Sem política L3/L4, inter-VLAN pode virar any-any interno."
    },
    {
      "mistake": "Anunciar prefixos amplos em BGP ou VPN.",
      "impact": "Aumenta blast radius e risco de route leak."
    },
    {
      "mistake": "Não versionar route tables cloud.",
      "impact": "Mudanças ficam invisíveis, difíceis de auditar e reverter."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuários acessam Internet, mas não servidores.",
      "Filial acessa cloud, mas cloud não responde à filial.",
      "Rede de gestão alcança usuários por engano.",
      "Firewall não registra tráfego que deveria passar por ele.",
      "Após mudança de rota, DNS e aplicação parecem falhar."
    ],
    "diagnosticQuestions": [
      "Qual fluxo foi autorizado na matriz?",
      "Qual rota vence na origem?",
      "Existe rota de retorno?",
      "O firewall está realmente no caminho?",
      "Há NAT ou caminho assimétrico?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "route print && tracert 10.70.10.10",
        "purpose": "Coletar rota e caminho do cliente.",
        "expectedObservation": "Tabela e saltos aparecem.",
        "interpretation": "Mostra se o primeiro salto corresponde ao gateway esperado."
      },
      {
        "platform": "PowerShell",
        "command": "Test-NetConnection 10.70.10.10 -Port 443 -TraceRoute",
        "purpose": "Validar porta e caminho.",
        "expectedObservation": "TcpTestSucceeded e TraceRoute aparecem.",
        "interpretation": "Se falhar, separar rota, firewall e serviço."
      },
      {
        "platform": "Linux",
        "command": "ip route get 10.70.10.10 && traceroute 10.70.10.10",
        "purpose": "Validar rota efetiva e caminho.",
        "expectedObservation": "via/dev/src e saltos aparecem.",
        "interpretation": "Confirma decisão do host Linux."
      },
      {
        "platform": "Linux",
        "command": "mtr -rwzc 10 10.70.10.10",
        "purpose": "Coletar perda/latência por salto.",
        "expectedObservation": "Relatório com perda e latência.",
        "interpretation": "Use como evidência, não como única prova."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route 10.70.10.10",
        "purpose": "Validar rota vencedora no core/roteador.",
        "expectedObservation": "Prefixo, origem, next hop e interface aparecem.",
        "interpretation": "Compara desenho com estado real."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists",
        "purpose": "Ver contadores de ACL quando aplicável.",
        "expectedObservation": "Regras e matches aparecem.",
        "interpretation": "Contador parado pode indicar tráfego por outro caminho."
      },
      {
        "platform": "Firewall/Cloud",
        "command": "show log traffic src 10.60.10.10 dst 10.70.10.10 || aws ec2 describe-flow-logs",
        "purpose": "Coletar evidência de política/log.",
        "expectedObservation": "Permits/denies ou flow logs aparecem.",
        "interpretation": "Sem log pode indicar bypass, log desativado ou caminho incorreto."
      },
      {
        "platform": "Cloud",
        "command": "az network route-table route list -g RG --route-table-name RT || aws ec2 describe-route-tables",
        "purpose": "Validar rotas da subnet cloud.",
        "expectedObservation": "Targets de rota aparecem.",
        "interpretation": "Confirme retorno para redes on-premises e caminho por firewall/VPN."
      }
    ],
    "decisionTree": [
      {
        "if": "O fluxo não aparece no firewall",
        "then": "Verificar se a rota contorna o firewall ou se logs estão desativados."
      },
      {
        "if": "Origem chega ao destino, mas resposta não volta",
        "then": "Validar rota de retorno, NAT e política de saída no destino."
      },
      {
        "if": "Rota cloud aponta para alvo errado",
        "then": "Corrigir route table associada à subnet e documentar rollback."
      },
      {
        "if": "Traceroute para em salto intermediário",
        "then": "Validar ACL/firewall/ICMP e repetir com teste TCP."
      },
      {
        "if": "Matriz autoriza, mas implementação bloqueia",
        "then": "Comparar matriz, regra real, ordem de regras, logs e contadores."
      },
      {
        "if": "Implementação funciona, mas viola política",
        "then": "Revisar menor privilégio e substituir rota/regra ampla por específica."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Liberar 0.0.0.0/0 por conveniência.",
      "Usar any-any entre VLANs internas.",
      "Criar rota estática sem dono e sem data de revisão.",
      "Anunciar blocos amplos para parceiros.",
      "Permitir que cloud e datacenter usem CIDRs sobrepostos.",
      "Fazer troubleshooting com prints contendo IPs públicos, ASN, nomes internos e topologia sensível sem sanitização."
    ],
    "vulnerabilities": [
      {
        "name": "Bypass de firewall por rota mais específica",
        "description": "Risco relacionado à aula 11.10 — Revisão prática: desenhar rede roteada segura.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Auditar longest prefix match, rotas /32, rotas estáticas e route tables cloud."
      },
      {
        "name": "Route leak",
        "description": "Risco relacionado à aula 11.10 — Revisão prática: desenhar rede roteada segura.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Usar prefix-list, RPKI/ROA quando aplicável, max-prefix e revisão de anúncios."
      },
      {
        "name": "Caminho assimétrico",
        "description": "Risco relacionado à aula 11.10 — Revisão prática: desenhar rede roteada segura.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Validar ida e retorno, revisar stateful firewalls e NAT."
      },
      {
        "name": "CIDR sobreposto",
        "description": "Risco relacionado à aula 11.10 — Revisão prática: desenhar rede roteada segura.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "IPAM, validação IaC e revisão antes de peering/VPN."
      },
      {
        "name": "Exposição por default route",
        "description": "Risco relacionado à aula 11.10 — Revisão prática: desenhar rede roteada segura.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Egress control, proxy, firewall, NAT controlado e logs."
      }
    ],
    "goodPractices": [
      "Manter matriz de comunicação por zona, origem, destino, porta, protocolo, justificativa e dono.",
      "Evitar rotas amplas quando rotas específicas bastam.",
      "Validar rota de retorno em todo desenho.",
      "Garantir que tráfego entre zonas passe pelo ponto de inspeção esperado.",
      "Versionar route tables cloud e mudanças de roteamento em IaC.",
      "Usar prefix-list, route-map, max-prefix, autenticação e filtros em roteamento dinâmico quando aplicável.",
      "Monitorar alterações de rotas, vizinhanças OSPF/BGP, VPN e caminho crítico.",
      "Sanitizar evidências antes de compartilhar externamente."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar roteamento, OSPF, BGP e caminhos com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Remover exceções permanentes sem justificativa."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-11.10",
    "title": "Projeto de arquitetura roteada segura com validação objetiva",
    "labType": "architecture",
    "objective": "Desenhar, documentar, validar e defender uma rede roteada segura com matriz, filial, cloud, firewall e troubleshooting controlado.",
    "scenario": "Uma empresa terá usuários, servidores, gestão, DMZ, filial e uma VPC/VNet. Você deve propor endereçamento, gateways, rotas, políticas, evidências e RCA para uma falha simulada.",
    "topology": "Matriz com VLANs de usuários/servidores/gestão/DMZ -> core L3 -> firewall -> Internet/VPN -> filial e cloud privada.",
    "architecture": "A arquitetura deve demonstrar separação por zonas, rotas específicas, default controlada, caminho de retorno, inspeção por firewall e evidências de teste.",
    "prerequisites": [
      "11.1 a 11.9 concluídas ou revisadas",
      "Módulos 4 e 5",
      "Módulo 9 firewalls",
      "Módulo 10 VPN/Zero Trust"
    ],
    "tools": [
      "Editor de diagrama",
      "Planilha/tabela",
      "Packet Tracer/GNS3 opcional",
      "Windows/Linux",
      "CLI Cisco ou outputs simulados",
      "Cloud CLI opcional"
    ],
    "estimatedTimeMinutes": 150,
    "cost": "zero; cloud opcional com cuidado de custos e limpeza obrigatória",
    "safetyNotes": [
      "Use IPs privados de laboratório.",
      "Não publique topologia real da empresa.",
      "Se usar cloud, crie recursos mínimos e destrua ao final.",
      "Não use regras any-any sem justificativa e escopo de laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir requisitos e zonas",
        "instruction": "Liste zonas, quantidade de hosts, criticidade e fluxos permitidos.",
        "artifact": "Tabela: zona | prefixo | gateway | dono | criticidade | observações.",
        "expectedOutput": "Zonas e requisitos documentados.",
        "explanation": "Sem requisitos, rotas e firewall viram adivinhação."
      },
      {
        "number": 2,
        "title": "Planejar endereçamento",
        "instruction": "Escolha prefixos sem sobreposição e com crescimento.",
        "calculation": "Exemplo: usuários /24, servidores /25, gestão /26, DMZ /27, links /30 ou /31.",
        "expectedOutput": "Plano CIDR coerente.",
        "explanation": "Prefixos influenciam sumarização, rota e segurança."
      },
      {
        "number": 3,
        "title": "Desenhar rotas de ida",
        "instruction": "Para cada fluxo crítico, indique rota de origem.",
        "artifact": "Matriz: origem | destino | porta | rota de ida | next hop | firewall esperado.",
        "expectedOutput": "Matriz de ida preenchida.",
        "explanation": "A matriz conecta negócio, rota e política."
      },
      {
        "number": 4,
        "title": "Desenhar rotas de retorno",
        "instruction": "Para cada fluxo crítico, indique retorno esperado.",
        "artifact": "Matriz: destino | origem | rota de retorno | NAT? | risco de assimetria.",
        "expectedOutput": "Retorno documentado.",
        "explanation": "Sem retorno, TCP e UDP stateful podem falhar."
      },
      {
        "number": 5,
        "title": "Validar no Windows",
        "instruction": "Use um cliente simulado e colete rota/caminho.",
        "command": "route print && tracert 10.70.10.10 && Test-NetConnection 10.70.10.10 -Port 443 -TraceRoute",
        "expectedOutput": "Rota, saltos e teste TCP documentados.",
        "explanation": "Evidência do host mostra o que o cliente realmente faz."
      },
      {
        "number": 6,
        "title": "Validar no Linux",
        "instruction": "Colete rota efetiva e caminho.",
        "command": "ip route get 10.70.10.10 && traceroute 10.70.10.10",
        "expectedOutput": "via/dev/src e saltos.",
        "explanation": "Prova decisão do kernel Linux."
      },
      {
        "number": 7,
        "title": "Validar no roteador/core",
        "instruction": "Confirme rota vencedora e next hop.",
        "command": "show ip route 10.70.10.10",
        "expectedOutput": "Prefixo, origem, next hop e interface.",
        "explanation": "Compara o desenho com a tabela de rotas real/simulada."
      },
      {
        "number": 8,
        "title": "Validar política",
        "instruction": "Confirme que o tráfego passa pelo firewall esperado.",
        "command": "show access-lists || show log traffic src 10.60.10.10 dst 10.70.10.10",
        "expectedOutput": "Contadores ou logs de permit/deny.",
        "explanation": "Se não há log/contador, pode haver bypass ou caminho diferente."
      },
      {
        "number": 9,
        "title": "Simular falha controlada",
        "instruction": "Escolha uma falha: rota de retorno ausente, default errada, regra shadowed ou cloud route table errada.",
        "configuration": "Alterar somente no laboratório: remover rota de retorno ou trocar next hop de uma rota específica.",
        "expectedOutput": "Sintoma reproduzível e evidência coletada.",
        "explanation": "Falhas controladas treinam troubleshooting sem afetar produção."
      },
      {
        "number": 10,
        "title": "Produzir RCA",
        "instruction": "Documente sintoma, hipótese, evidência, causa raiz, correção e prevenção.",
        "artifact": "RCA sanitizado com teste de regressão.",
        "expectedOutput": "Relatório completo.",
        "explanation": "A entrega precisa ensinar e ser auditável."
      },
      {
        "number": 11,
        "title": "Planejar rollback",
        "instruction": "Defina como desfazer mudanças de rota/política.",
        "artifact": "Plano de rollback com comando, responsável e critério de sucesso.",
        "expectedOutput": "Rollback objetivo.",
        "explanation": "Mudança de rede sem rollback é risco operacional."
      },
      {
        "number": 12,
        "title": "Rubrica final",
        "instruction": "Autoavalie a entrega usando a rubrica.",
        "artifact": "Checklist com pontuação por arquitetura, rotas, segurança, evidência e RCA.",
        "expectedOutput": "Rubrica preenchida.",
        "explanation": "A rubrica transforma projeto em avaliação objetiva."
      }
    ],
    "expectedResult": "O aluno entrega arquitetura, endereçamento, tabela de rotas, matriz de fluxos, política, evidências, troubleshooting e RCA com rubrica objetiva.",
    "validation": [
      {
        "check": "Sem sobreposição indevida",
        "command": "Revisão da tabela CIDR",
        "expected": "Todos os prefixos privados são únicos ou sobreposição é justificada.",
        "ifFails": "Replanejar endereçamento."
      },
      {
        "check": "Rotas de ida documentadas",
        "command": "ip route get DESTINO ou show ip route DESTINO",
        "expected": "Rota vencedora coincide com desenho.",
        "ifFails": "Corrigir rota/next hop."
      },
      {
        "check": "Rotas de retorno documentadas",
        "command": "ip route get ORIGEM ou show ip route ORIGEM",
        "expected": "Retorno existe e passa por caminho esperado.",
        "ifFails": "Adicionar rota de retorno ou ajustar NAT/política."
      },
      {
        "check": "Firewall no caminho",
        "command": "show access-lists || consultar logs/flow logs",
        "expected": "Contadores/logs coerentes com matriz.",
        "ifFails": "Investigar bypass, ordem de regras ou logs."
      },
      {
        "check": "Teste TCP objetivo",
        "command": "Test-NetConnection DESTINO -Port PORTA",
        "expected": "Resultado documentado para permitido e bloqueado.",
        "ifFails": "Separar rota, serviço e política."
      },
      {
        "check": "RCA completo",
        "command": "grep -E \"Sintoma|Causa raiz|Correção|Regressão\" RCA.md",
        "expected": "Todas as seções existem.",
        "ifFails": "Completar relatório."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Fluxo autorizado não funciona.",
        "probableCause": "Rota de retorno ausente, firewall, DNS ou serviço.",
        "howToConfirm": "Matriz + route get + Test-NetConnection + logs.",
        "fix": "Corrigir componente específico e repetir teste."
      },
      {
        "symptom": "Fluxo proibido funciona.",
        "probableCause": "Bypass de firewall, rota direta ou regra ampla.",
        "howToConfirm": "Logs ausentes no firewall e rota direta no core/cloud.",
        "fix": "Redirecionar pelo ponto de controle e aplicar menor privilégio."
      },
      {
        "symptom": "Filial e cloud têm prefixos sobrepostos.",
        "probableCause": "Planejamento CIDR sem governança.",
        "howToConfirm": "Tabela de prefixos.",
        "fix": "Renumerar laboratório ou usar NAT planejado com documentação."
      },
      {
        "symptom": "Rota cloud usa target caro ou inseguro.",
        "probableCause": "Route table errada.",
        "howToConfirm": "aws/az route table list.",
        "fix": "Associar route table correta, estimar custo e registrar limpeza."
      },
      {
        "symptom": "Contadores não sobem.",
        "probableCause": "Tráfego não passa pela regra esperada.",
        "howToConfirm": "traceroute, logs e rota vencedora.",
        "fix": "Corrigir caminho ou regra."
      }
    ],
    "improvements": [
      "Adicionar OSPF entre core e filial.",
      "Adicionar BGP para cloud/VPN.",
      "Adicionar Network Firewall/NVA simulado.",
      "Adicionar observabilidade com flow logs sintéticos.",
      "Adicionar mudança via IaC e revisão de drift."
    ],
    "evidenceToCollect": [
      "Diagrama lógico",
      "Tabela de endereçamento",
      "Tabela de rotas por domínio",
      "Matriz de fluxos",
      "Comandos route print/ip route/show ip route",
      "Testes ping/traceroute/Test-NetConnection",
      "Logs/contadores de firewall",
      "RCA sanitizado",
      "Rubrica preenchida"
    ],
    "questions": [
      "O firewall está no caminho esperado?",
      "Existe rota de retorno?",
      "Qual rota vence pelo longest prefix match?",
      "Quais fluxos exigem logs?",
      "Qual mudança tem rollback?"
    ],
    "challenge": "Entregar o projeto completo e defender as decisões em uma revisão simulada de arquitetura.",
    "solution": "Uma solução adequada usa prefixos privados sem sobreposição, rotas específicas para redes privadas, default controlada para saída, firewall entre zonas, retorno documentado, testes por porta e caminho, logs/contadores e RCA de falha simulada."
  },
  "mentorQuestions": [
    "Para uma comunicação entre usuário e servidor, qual é a rota de ida, qual é a rota de retorno e onde a política é aplicada?",
    "Se uma rota /32 e uma rota /24 apontam para caminhos diferentes, qual vence e por quê?",
    "Como você provaria que o tráfego sensível está passando pelo firewall correto e não por um caminho alternativo?"
  ],
  "quiz": [
    {
      "question": "O que uma rota define?",
      "options": [
        "A autorização de acesso",
        "O próximo salto ou caminho para alcançar um prefixo",
        "A senha do gateway",
        "O endereço MAC fixo do destino"
      ],
      "answer": 1,
      "explanation": "Rota define caminho/next hop. Autorização depende de política como firewall/ACL."
    },
    {
      "question": "Em rotas sobrepostas, qual regra é aplicada primeiro?",
      "options": [
        "Menor métrica sempre",
        "Longest prefix match",
        "Rota mais antiga",
        "Rota default"
      ],
      "answer": 1,
      "explanation": "A rota mais específica para o destino vence antes de métrica ou distância administrativa."
    },
    {
      "question": "Por que rota de retorno é essencial?",
      "options": [
        "Porque ARP exige DNS",
        "Porque a resposta precisa saber voltar ao originador",
        "Porque TTL aumenta a cada salto",
        "Porque BGP só funciona com /32"
      ],
      "answer": 1,
      "explanation": "Comunicação bidirecional exige caminho de volta permitido e roteável."
    },
    {
      "question": "Qual é o risco de uma rota mais específica criada sem revisão?",
      "options": [
        "Ela nunca será usada",
        "Ela pode contornar o firewall esperado",
        "Ela transforma IPv4 em IPv6",
        "Ela impede ARP local"
      ],
      "answer": 1,
      "explanation": "Uma rota mais específica pode vencer e desviar tráfego do caminho previsto."
    },
    {
      "question": "O que BGP normalmente troca entre domínios?",
      "options": [
        "Senhas de roteador",
        "Prefixos e atributos de caminho",
        "Endereços MAC de hosts",
        "Registros DNS A"
      ],
      "answer": 1,
      "explanation": "BGP anuncia prefixos e usa atributos como AS_PATH e NEXT_HOP."
    },
    {
      "question": "Qual combinação é mais adequada para validar uma falha de caminho?",
      "options": [
        "Apenas ping",
        "Apenas navegador",
        "Tabela de rotas, traceroute/mtr, teste de porta e logs",
        "Somente limpar cache ARP"
      ],
      "answer": 2,
      "explanation": "Diagnóstico confiável combina evidências de rota, caminho, porta, política e logs."
    }
  ],
  "flashcards": [
    {
      "front": "Roteamento",
      "back": "Escolha do próximo salto para entregar pacotes entre redes IPv4."
    },
    {
      "front": "Longest prefix match",
      "back": "Regra em que a rota mais específica para o destino vence."
    },
    {
      "front": "Rota de retorno",
      "back": "Caminho usado pela resposta para voltar ao originador."
    },
    {
      "front": "Caminho assimétrico",
      "back": "Ida e volta passam por caminhos diferentes, podendo quebrar firewalls stateful e troubleshooting."
    },
    {
      "front": "OSPF",
      "back": "Protocolo IGP de estado de enlace usado para roteamento dinâmico interno."
    },
    {
      "front": "BGP",
      "back": "Protocolo de roteamento entre sistemas autônomos, usado na Internet e em cloud híbrida."
    },
    {
      "front": "Matriz de comunicação",
      "back": "Tabela que define origem, destino, porta, protocolo, justificativa, dono e controle."
    }
  ],
  "exercises": [
    {
      "title": "Identifique o caminho",
      "prompt": "Para origem 10.60.10.25 e destino 10.70.5.10, descreva gateway, rota provável, ponto de firewall e retorno.",
      "expectedAnswer": "Origem usa gateway da VLAN de usuários, rota para cloud via firewall/VPN/BGP, política deve permitir ida e retorno; cloud precisa rota de volta para 10.60.10.0/24."
    },
    {
      "title": "Rota vencedora",
      "prompt": "Existem rotas 10.70.0.0/16 via A e 10.70.5.0/24 via B. O destino é 10.70.5.10. Qual vence?",
      "expectedAnswer": "10.70.5.0/24 via B, por ser mais específica."
    },
    {
      "title": "Risco de segurança",
      "prompt": "Explique por que 0.0.0.0/0 liberado em uma route table privada pode ser perigoso.",
      "expectedAnswer": "Pode permitir saída ampla, exfiltração, bypass de egress control ou comunicação não prevista se combinado a NAT/IGW/firewall permissivo."
    },
    {
      "title": "Troubleshooting",
      "prompt": "Uma aplicação falha, mas ping responde. Cite três próximas verificações.",
      "expectedAnswer": "Teste de porta, firewall/SG/NSG, logs, rota de retorno, NAT, DNS e serviço escutando na porta correta."
    },
    {
      "id": "ex11.10.p1.1",
      "type": "arquitetura",
      "prompt": "Liste os entregáveis mínimos para provar que um desenho roteado é validável.",
      "expectedAnswer": "Diagrama, CIDR, rotas, matriz de fluxos, evidências de teste, logs/contadores, RCA e rollback.",
      "explanation": "Sem evidência e rollback, o desenho é apenas intenção."
    },
    {
      "id": "ex11.10.p1.2",
      "type": "segurança",
      "prompt": "Como detectar se um fluxo contorna o firewall esperado?",
      "expectedAnswer": "Comparar rota vencedora, traceroute, logs/contadores do firewall e flow logs.",
      "explanation": "Ausência de log esperado pode indicar bypass ou logging desativado."
    }
  ],
  "challenge": {
    "title": "Defesa de arquitetura roteada segura",
    "scenario": "Você é responsável por apresentar a rede roteada de uma empresa com matriz, filial e cloud para uma banca de rede, segurança e cloud.",
    "tasks": [
      "Criar diagrama lógico com zonas e gateways.",
      "Criar plano de endereçamento sem sobreposição indevida.",
      "Criar tabela de rotas por zona/domínio.",
      "Criar matriz de fluxos com portas, justificativa e ponto de controle.",
      "Validar pelo menos cinco fluxos com evidências.",
      "Simular uma falha e escrever RCA."
    ],
    "expectedDeliverables": [
      "Diagrama",
      "Tabela CIDR",
      "Tabela de rotas",
      "Matriz de fluxos",
      "Evidências de teste",
      "Logs/contadores",
      "RCA",
      "Plano de rollback",
      "Rubrica preenchida"
    ],
    "constraints": [
      "Acesso de gestão não pode ser amplo.",
      "DMZ não pode iniciar acesso livre para servidores internos.",
      "Cloud privada deve ter retorno documentado.",
      "Toda exceção de firewall deve ter dono e validade."
    ],
    "gradingRubric": [
      {
        "criterion": "Endereçamento e sumarização",
        "points": 15,
        "description": "Prefixos coerentes, sem sobreposição indevida e com crescimento."
      },
      {
        "criterion": "Rotas de ida e retorno",
        "points": 20,
        "description": "Rotas específicas, default controlada e retorno documentado."
      },
      {
        "criterion": "Segurança e matriz de fluxos",
        "points": 20,
        "description": "Menor privilégio, ponto de controle e logs definidos."
      },
      {
        "criterion": "Evidências técnicas",
        "points": 20,
        "description": "Comandos e resultados sanitizados provam o desenho."
      },
      {
        "criterion": "Troubleshooting, RCA e rollback",
        "points": 15,
        "description": "Falha simulada, causa raiz e reversão planejada."
      },
      {
        "criterion": "Clareza executiva",
        "points": 10,
        "description": "Entrega compreensível para rede, segurança, cloud e gestão."
      }
    ],
    "rubric": [
      {
        "criterion": "Arquitetura roteada",
        "points": 20,
        "description": "Diagrama, gateways e domínios coerentes."
      },
      {
        "criterion": "Validação objetiva",
        "points": 30,
        "description": "Comandos, logs e evidências comprovam fluxos."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Matriz com menor privilégio e controle de caminho."
      },
      {
        "criterion": "Operação",
        "points": 25,
        "description": "RCA, rollback e documentação executável."
      }
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução defensável separa zonas por prefixos claros, coloca inspeção entre zonas sensíveis, mantém rotas específicas para cloud/filial, evita 0.0.0.0/0 indevido, garante rota de retorno e registra todos os fluxos permitidos.",
    "examplePlan": [
      {
        "zone": "Usuários",
        "prefix": "10.60.10.0/24",
        "gateway": "10.60.10.1",
        "notes": "Acesso a DNS, proxy e aplicações autorizadas."
      },
      {
        "zone": "Servidores",
        "prefix": "10.60.20.0/24",
        "gateway": "10.60.20.1",
        "notes": "Acesso inbound somente por portas aprovadas."
      },
      {
        "zone": "DMZ",
        "prefix": "10.60.30.0/24",
        "gateway": "10.60.30.1",
        "notes": "Exposição controlada; sem any-any para servidores."
      },
      {
        "zone": "Gestão",
        "prefix": "10.60.40.0/26",
        "gateway": "10.60.40.1",
        "notes": "Administração restrita, MFA, logs e jump host."
      },
      {
        "zone": "Cloud",
        "prefix": "10.70.0.0/16",
        "gateway": "VPN/BGP",
        "notes": "Rotas específicas e flow logs."
      },
      {
        "zone": "Filial",
        "prefix": "10.80.0.0/16",
        "gateway": "VPN/SD-WAN",
        "notes": "Rota de retorno e backup documentados."
      }
    ],
    "keyReasoning": [
      "Separar zonas reduz blast radius.",
      "Rotas específicas reduzem exposição em relação a blocos amplos.",
      "Firewall deve estar no caminho de fluxos sensíveis.",
      "OSPF pode simplificar aprendizado interno, mas deve ser controlado.",
      "BGP para cloud/híbrido precisa de filtros e prefixos esperados.",
      "Todo fluxo precisa de teste de porta e logs, não apenas ping."
    ]
  },
  "glossary": [
    {
      "term": "Rede roteada segura",
      "definition": "Arquitetura em que prefixos, rotas, gateways e políticas são planejados para conectividade controlada."
    },
    {
      "term": "Matriz de comunicação",
      "definition": "Documento que define quais origens podem falar com quais destinos, portas e justificativas."
    },
    {
      "term": "Rota de retorno",
      "definition": "Caminho usado pela resposta para voltar ao host de origem."
    },
    {
      "term": "Bypass de firewall",
      "definition": "Situação em que o tráfego usa caminho alternativo e deixa de passar pelo controle esperado."
    },
    {
      "term": "Route leak",
      "definition": "Anúncio indevido de prefixos que pode atrair ou desviar tráfego."
    },
    {
      "term": "Flow logs",
      "definition": "Registros de fluxos de rede usados para auditoria e troubleshooting."
    }
  ],
  "references": [
    {
      "title": "Conceitos integrados do Módulo 11",
      "type": "internal",
      "note": "Aulas 6.1 a 6.9."
    },
    {
      "title": "Base IPv4 e subnetting",
      "type": "internal",
      "note": "Módulos 4 e 5 do curso Redes e Network v2.0."
    },
    {
      "title": "Segurança defensiva em Camada 2",
      "type": "internal",
      "note": "Módulo 3, especialmente ARP, VLANs, STP e segurança L2."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud e IaC",
      "reason": "Route tables, gateways, VPNs e políticas devem ser versionados e revisados em pipelines."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Rede define alcance; IAM define quem pode usar o serviço. Os dois controles se complementam."
    }
  ],
  "progressRules": {
    "minQuizScore": 70,
    "requiredLab": "lab-11.10",
    "requiredSections": [
      "content.motivation",
      "content.internals",
      "content.architecture",
      "content.securityExample",
      "lab",
      "challenge",
      "commentedSolution"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "12.1"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ]
    }
  }
};
