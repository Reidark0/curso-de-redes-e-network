export const lesson1102 = {
  "id": "11.2",
  "moduleId": "m11",
  "order": 2,
  "title": "Tabela de rotas, longest prefix match e validação de caminho",
  "subtitle": "Como hosts, roteadores, firewalls e cloud route tables escolhem a rota vencedora, e como provar essa decisão com comandos reais.",
  "duration": "105-145 min",
  "estimatedStudyTimeMinutes": 145,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 245,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "tabela de rotas",
    "longest prefix match",
    "rota default",
    "next hop",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops",
    "route print",
    "ip route",
    "show ip route",
    "ip route get",
    "rota de retorno",
    "cloud route table"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.1",
      "reason": "A aula anterior explica por que roteamento existe e introduz gateway, next hop e rota de retorno."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "Longest prefix match depende de entender CIDR, prefixos, sub-redes e sobreposição."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Gateway padrão e rota local são a base da rota default em hosts."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.8",
      "reason": "Ping, TTL e traceroute ajudam a validar decisões de rota."
    }
  ],
  "objectives": [
    "Explicar o que é uma tabela de rotas e quais campos aparecem em hosts, roteadores, firewalls e cloud.",
    "Aplicar a regra de longest prefix match para escolher a rota mais específica aplicável a um destino IPv4.",
    "Diferenciar rota conectada, rota local, rota estática, rota dinâmica e rota default.",
    "Interpretar saída de route print, ip route, show ip route e tabelas de rota em cloud.",
    "Reconhecer problemas causados por rotas sobrepostas, rota de retorno ausente, rotas amplas e caminho assimétrico.",
    "Relacionar tabela de rotas com segurança, segmentação, cloud, DevSecOps e troubleshooting metódico."
  ],
  "learningOutcomes": [
    "Dado um destino IPv4 e uma tabela de rotas, o aluno escolhe corretamente a rota usada.",
    "Dadas rotas sobrepostas como /8, /16, /24 e /32, o aluno identifica a rota mais específica.",
    "Dado um problema de conectividade, o aluno verifica se existe rota de ida e rota de retorno.",
    "Dada uma tabela de rotas de Windows, Linux, Cisco ou cloud, o aluno interpreta destino, prefixo, next hop, interface e métrica.",
    "Dada uma alteração de rota em IaC, o aluno avalia impacto operacional e risco de segurança."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Na aula anterior, você viu que roteamento existe porque redes diferentes precisam ser conectadas. Mas ainda falta responder uma pergunta decisiva: quando um dispositivo conhece vários caminhos possíveis, como ele escolhe qual usar?</p><p>Esse problema aparece em todo lugar. Um notebook tem rota local, rota default e rotas de VPN. Um servidor Linux possui rotas para containers, bridges e rede corporativa. Um firewall tem rotas para Internet, datacenter, DMZ e filiais. Uma VPC possui tabelas de rota para NAT, Internet Gateway, peering, VPN e endpoints privados.</p><div class=\"callout callout--problem\"><strong>Ideia central:</strong> a tabela de rotas é a lista de caminhos conhecidos. O longest prefix match é a regra que escolhe a rota mais específica que combina com o destino.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>No início das redes IP, ambientes eram menores e muitas rotas podiam ser configuradas manualmente. À medida que redes corporativas, provedores e a Internet cresceram, tornou-se necessário organizar decisões de caminho em tabelas estruturadas e automatizar a troca de rotas com protocolos dinâmicos.</p><p>Mesmo com protocolos sofisticados, a decisão final em cada equipamento continua baseada em uma ideia simples: comparar o endereço de destino com prefixos conhecidos e escolher a melhor correspondência. Essa regra tornou possível escalar roteamento sem criar uma entrada individual para cada host da Internet.</p><p>Hoje, a mesma lógica aparece em roteadores físicos, firewalls, switches camada 3, sistemas operacionais, containers, hipervisores, Kubernetes CNIs e redes virtuais de cloud.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>Sem uma regra clara de escolha, rotas sobrepostas causariam ambiguidade. Imagine uma tabela com três caminhos: <code>10.0.0.0/8</code>, <code>10.20.0.0/16</code> e <code>10.20.30.0/24</code>. Um pacote para <code>10.20.30.55</code> combina com as três rotas. Qual deve ser usada?</p><p>A resposta não pode ser aleatória. Se o equipamento escolhesse a rota ampla errada, o tráfego poderia ir para um firewall incorreto, cair em uma VPN errada, sair pela Internet, quebrar uma aplicação ou violar segmentação de segurança.</p><div class=\"callout callout--warning\"><strong>Erro comum:</strong> achar que a rota default sempre vence por ser a rota “principal”. Na verdade, ela é a menos específica: só é usada quando nenhuma rota mais específica se aplica.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><p>A evolução do roteamento foi uma evolução da forma de representar e escolher caminhos. Primeiro, redes usavam decisões simples e manuais. Depois vieram rotas estáticas mais organizadas, protocolos dinâmicos, sumarização de rotas, filtragem, políticas e, por fim, abstrações de cloud.</p><table class=\"data-table\"><thead><tr><th>Etapa</th><th>O que resolveu</th><th>Novo cuidado</th></tr></thead><tbody><tr><td>Rotas conectadas</td><td>Conhecer redes diretamente ligadas</td><td>Interface, IP e máscara precisam estar corretos</td></tr><tr><td>Rota default</td><td>Enviar destinos desconhecidos a um gateway</td><td>Pode esconder falta de rota específica</td></tr><tr><td>Rotas estáticas</td><td>Controle manual de caminho</td><td>Erro humano e falta de adaptação</td></tr><tr><td>Protocolos dinâmicos</td><td>Aprendizado automático de rotas</td><td>Governança, filtragem e segurança</td></tr><tr><td>Cloud route tables</td><td>Automação e integração com gateways virtuais</td><td>Rotas amplas, sobreposição e exposição indevida</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p><strong>Tabela de rotas</strong> é a estrutura que informa para onde enviar pacotes destinados a determinados prefixos IPv4. Uma entrada de rota normalmente possui destino/prefixo, next hop ou gateway, interface de saída, origem da rota e alguma forma de prioridade, como métrica ou distância administrativa.</p><div class=\"definition-box\"><strong>Longest prefix match:</strong> quando várias rotas combinam com o destino, o equipamento escolhe a rota com o prefixo mais longo, ou seja, a mais específica.</div><p>Prefixo mais longo significa mais bits de rede fixos. Uma rota <code>/24</code> é mais específica que uma <code>/16</code>, que é mais específica que uma <code>/8</code>, que é mais específica que <code>0.0.0.0/0</code>.</p></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><ol class=\"flow-list\"><li>O dispositivo recebe um pacote ou uma tentativa de conexão para um IPv4 de destino.</li><li>Ele consulta a tabela de rotas local.</li><li>Compara o destino com todos os prefixos que poderiam conter aquele IP.</li><li>Seleciona a rota com o prefixo mais longo entre as correspondências.</li><li>Se houver empate de prefixo, usa critérios adicionais, como distância administrativa, métrica, prioridade, origem da rota ou política.</li><li>Identifica o next hop ou a interface de saída.</li><li>Se o next hop estiver no enlace local, resolve o MAC via ARP.</li><li>Encaminha o pacote para a próxima etapa.</li><li>O próximo roteador repete o processo usando a própria tabela.</li><li>Para comunicação bidirecional, o destino também precisa ter caminho de retorno.</li></ol><div class=\"callout callout--security\"><strong>Detalhe essencial:</strong> cada salto decide sozinho. O pacote não carrega uma lista completa de roteadores que deve atravessar.</div></section><section class=\"lesson-section lesson-section--internals\"><h2>P1-08 — Como provar a rota vencedora</h2>\n    <p>Em troubleshooting profissional, não basta dizer que uma rota deveria vencer. É preciso provar a decisão com evidências do sistema operacional, roteador, firewall ou cloud. O método seguro é comparar três camadas: a intenção de arquitetura, a tabela de rotas efetiva e o teste de caminho.</p>\n    <ol class=\"flow-list\">\n      <li><strong>Intenção:</strong> qual prefixo deveria ser usado para o destino?</li>\n      <li><strong>Tabela efetiva:</strong> qual entrada aparece em <code>route print</code>, <code>ip route</code>, <code>show ip route</code> ou tabela da cloud?</li>\n      <li><strong>Decisão para destino específico:</strong> o que <code>ip route get</code>, <code>Test-NetConnection</code>, <code>traceroute</code> ou <code>show ip route &lt;prefixo&gt;</code> indica?</li>\n      <li><strong>Retorno:</strong> o destino possui rota de volta para a origem?</li>\n      <li><strong>Política:</strong> firewall, NACL, SG ou ACL permitem ida e retorno?</li>\n    </ol>\n    <div class=\"callout callout--warning\"><strong>Erro de produção comum:</strong> validar apenas a ida. Muitas falhas de rede parecem “rota quebrada”, mas o problema real é rota de retorno ausente, NAT assimétrico ou firewall permitindo ida e bloqueando retorno.</div>\n  </section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>Arquiteturalmente, a tabela de rotas existe em qualquer nó que precise decidir para onde enviar tráfego IP. Em hosts, ela costuma ter rotas conectadas, rotas locais, rotas de VPN e uma rota default. Em roteadores e firewalls, ela contém redes internas, links WAN, túneis, rotas estáticas e rotas dinâmicas. Em cloud, route tables ficam associadas a subnets e apontam para gateways, NAT, firewalls, peerings, VPNs e endpoints.</p><table class=\"comparison-table\"><thead><tr><th>Ambiente</th><th>Exemplo de rota</th><th>Risco se estiver errado</th></tr></thead><tbody><tr><td>Notebook</td><td><code>0.0.0.0/0 via 192.168.1.1</code></td><td>Sem Internet ou tráfego enviado ao gateway errado</td></tr><tr><td>Servidor Linux</td><td><code>10.244.0.0/16 dev cni0</code></td><td>Containers sem comunicação ou vazamento de rota</td></tr><tr><td>Firewall</td><td><code>10.20.0.0/16 via túnel VPN</code></td><td>Tráfego corporativo indo para caminho incorreto</td></tr><tr><td>Cloud</td><td><code>0.0.0.0/0 -> NAT Gateway</code></td><td>Subnets privadas sem saída ou expostas indevidamente</td></tr><tr><td>Roteador</td><td><code>192.168.50.0/24 via 10.0.0.2</code></td><td>Filial inalcançável ou caminho assimétrico</td></tr></tbody></table></section><section class=\"lesson-section lesson-section--architecture\"><h2>Matriz operacional de leitura de rotas</h2>\n    <table class=\"data-table\">\n      <thead><tr><th>Ambiente</th><th>Comando/evidência</th><th>O que verificar</th><th>Erro comum</th></tr></thead>\n      <tbody>\n        <tr><td>Windows</td><td><code>route print</code></td><td>0.0.0.0/0, rotas específicas, interface e métrica</td><td>VPN injeta rota mais específica e muda caminho sem o usuário perceber</td></tr>\n        <tr><td>Linux</td><td><code>ip route get DESTINO</code></td><td>rota efetiva, interface, source IP e next hop</td><td>interface de container ou túnel vence a rota esperada</td></tr>\n        <tr><td>Cisco IOS</td><td><code>show ip route DESTINO</code></td><td>origem da rota, next hop, AD/métrica e interface</td><td>rota resumida esconde falta de rota mais específica</td></tr>\n        <tr><td>Cloud</td><td>route table da subnet</td><td>alvo: IGW, NAT, firewall, peering, VPN ou endpoint</td><td>rota 0.0.0.0/0 apontando direto para Internet em subnet sensível</td></tr>\n      </tbody>\n    </table>\n  </section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em uma tabela de rotas como uma lista de instruções de entrega. Para qualquer endereço do Brasil, envie para a central nacional. Para qualquer endereço de Brasília, envie para a central do DF. Para o prédio específico da empresa, envie diretamente para a portaria correta.</p><p>Se o destino é exatamente o prédio da empresa, faz sentido usar a instrução mais específica, não a instrução genérica “Brasil”. Longest prefix match funciona do mesmo jeito: quando várias regras combinam, a mais específica vence.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, a instrução mais específica ainda pode estar errada se apontar para um next hop inválido, se faltar rota de retorno ou se houver firewall bloqueando.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2><p>Um notebook possui estas rotas: <code>192.168.1.0/24 dev Wi-Fi</code>, <code>10.8.0.0/24 via VPN</code> e <code>0.0.0.0/0 via 192.168.1.1</code>. Quando ele tenta acessar <code>10.8.0.25</code>, existem duas rotas possíveis: a rota VPN <code>10.8.0.0/24</code> e a rota default. A rota <code>/24</code> vence porque é mais específica que <code>/0</code>.</p><p>Quando o destino é <code>8.8.8.8</code>, não há rota específica para esse IP. Então a rota default é usada. Isso explica por que uma VPN pode mandar apenas algumas redes pelo túnel, enquanto o restante continua saindo pela Internet local.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Uma empresa possui uma rota ampla para <code>10.0.0.0/8</code> apontando para o datacenter, mas também possui uma rota específica <code>10.40.20.0/24</code> apontando para uma filial via SD-WAN. Um pacote para <code>10.40.20.15</code> deve seguir para a filial, não para o datacenter, porque <code>/24</code> é mais específico que <code>/8</code>.</p><p>Esse comportamento é útil, mas perigoso se mal governado. Uma rota específica incorreta pode sequestrar tráfego de uma aplicação crítica. Uma rota ampla demais pode mandar tráfego sensível para uma zona sem inspeção. Por isso, alterações de rota em empresas devem ter dono, justificativa, janela de mudança, rollback e validação.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em uma VPC, uma subnet privada pode ter <code>10.40.0.0/16 local</code>, <code>10.80.0.0/16 -> VPN Gateway</code>, <code>10.40.50.0/24 -> firewall</code> e <code>0.0.0.0/0 -> NAT Gateway</code>. Se uma VM acessa <code>10.40.50.10</code>, a rota <code>/24</code> vence a rota local mais ampla ou outra rota aplicável, dependendo das regras específicas da plataforma.</p><p>Cloud exige atenção extra porque route tables podem ser alteradas por IaC, módulos reutilizáveis, automações, equipes diferentes e ambientes distintos. Um erro de rota pode expor uma subnet privada, quebrar acesso a endpoints privados ou criar tráfego assimétrico entre firewall e NAT.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em DevSecOps, tabelas de rotas aparecem como código. Terraform pode declarar rotas para NAT Gateway, Internet Gateway, Transit Gateway, Azure Firewall, VNet peering, VPN e private endpoints. O pipeline deve validar se uma mudança cria <code>0.0.0.0/0</code> indevido, sobrepõe CIDRs, remove rota de retorno ou desvia tráfego de inspeção.</p><p>Uma boa revisão de pull request não pergunta apenas “o plano aplica?”. Ela pergunta: qual tráfego passará por esta rota? O prefixo é amplo demais? Existe rota mais específica? Existe retorno? Há firewall no caminho? O ambiente de produção foi afetado? A mudança está documentada no IPAM?</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>Segurança de roteamento começa por saber que conectividade não é permissão. Uma rota permite que o pacote encontre caminho. Firewall, ACL, security group, NACL, IAM, mTLS e autenticação decidem se o acesso deve ser permitido. Confundir rota com autorização é um erro comum.</p><p>Rotas mal planejadas aumentam blast radius. Uma rota ampla de ambiente de desenvolvimento para produção pode abrir caminho para movimento lateral. Uma rota default para Internet em subnet sensível pode permitir exfiltração. Uma rota específica maliciosa ou acidental pode desviar tráfego para inspeção inadequada.</p><table class=\"risk-table\"><thead><tr><th>Risco</th><th>Sintoma</th><th>Mitigação</th></tr></thead><tbody><tr><td>Rota ampla demais</td><td>Muitos destinos alcançáveis sem necessidade</td><td>Menor privilégio de rede e revisão de CIDR</td></tr><tr><td>Rota de retorno ausente</td><td>Tráfego sai, mas resposta não volta</td><td>Validar ida e volta no desenho</td></tr><tr><td>Caminho assimétrico</td><td>Firewall vê só metade da sessão</td><td>Centralizar inspeção ou ajustar rotas</td></tr><tr><td>Sobreposição de CIDR</td><td>Destino vai para lugar inesperado</td><td>IPAM e validação em pipeline</td></tr></tbody></table></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2><p>O diagrama mostra uma tabela com rotas sobrepostas. Para o destino <code>10.20.30.55</code>, a rota <code>10.20.30.0/24</code> vence porque tem o prefixo mais longo.</p><svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"m11l02-title m11l02-desc\"><title id=\"m11l02-title\">Longest prefix match em tabela de rotas</title><desc id=\"m11l02-desc\">Um host consulta uma tabela de rotas com prefixos sobrepostos e escolhe a rota mais específica para o destino.</desc><defs><marker id=\"m11l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path class=\"svg-flow\" d=\"M0,0 L0,6 L9,3 z\"></path></marker></defs><rect class=\"svg-zone\" x=\"40\" y=\"40\" width=\"880\" height=\"440\" rx=\"18\"></rect><rect class=\"svg-node svg-node--client\" x=\"80\" y=\"190\" width=\"150\" height=\"90\" rx=\"14\"></rect><text class=\"svg-label\" x=\"155\" y=\"225\" text-anchor=\"middle\">Host</text><text class=\"svg-label svg-label--small\" x=\"155\" y=\"250\" text-anchor=\"middle\">destino 10.20.30.55</text><rect class=\"svg-node svg-node--router\" x=\"310\" y=\"90\" width=\"320\" height=\"250\" rx=\"14\"></rect><text class=\"svg-label\" x=\"470\" y=\"125\" text-anchor=\"middle\">Tabela de rotas</text><text class=\"svg-label svg-label--small\" x=\"340\" y=\"165\">10.0.0.0/8 → DC</text><text class=\"svg-label svg-label--small\" x=\"340\" y=\"205\">10.20.0.0/16 → WAN</text><text class=\"svg-label svg-label--small\" x=\"340\" y=\"245\">10.20.30.0/24 → Firewall</text><text class=\"svg-label svg-label--small\" x=\"340\" y=\"285\">0.0.0.0/0 → Internet</text><rect class=\"svg-badge\" x=\"520\" y=\"225\" width=\"88\" height=\"34\" rx=\"12\"></rect><text class=\"svg-label svg-label--small\" x=\"564\" y=\"247\" text-anchor=\"middle\">vence /24</text><rect class=\"svg-node svg-node--firewall\" x=\"725\" y=\"190\" width=\"150\" height=\"90\" rx=\"14\"></rect><text class=\"svg-label\" x=\"800\" y=\"225\" text-anchor=\"middle\">Firewall</text><text class=\"svg-label svg-label--small\" x=\"800\" y=\"250\" text-anchor=\"middle\">next hop</text><path class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l02-arrow)\" d=\"M230 235 C260 235 280 235 310 235\"></path><path class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l02-arrow)\" d=\"M630 235 C670 235 690 235 725 235\"></path><text class=\"svg-label svg-label--small\" x=\"470\" y=\"390\" text-anchor=\"middle\">Regra: entre todas as rotas que combinam, escolha o prefixo mais longo.</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>Neste laboratório, você vai ler tabelas de rotas em Windows, Linux e Cisco/Packet Tracer, aplicar longest prefix match manualmente e comparar sua previsão com o caminho real observado por ping e traceroute.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios reforçam leitura de rotas, escolha de prefixo mais específico, identificação de rota default e análise de falhas de retorno.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá uma tabela de rotas com prefixos sobrepostos e deverá explicar qual caminho cada destino usa, quais riscos existem e quais rotas precisam ser revisadas.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada demonstra como ordenar rotas por especificidade, verificar next hop, validar retorno e documentar o raciocínio.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>Tabelas de rotas transformam prefixos em caminhos. Longest prefix match garante que, quando várias rotas combinam com um destino, a rota mais específica seja escolhida. A rota default é o último recurso, não a rota mais importante. Troubleshooting de roteamento exige verificar destino, prefixo, next hop, interface, métrica, rota de retorno, firewall e logs.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você vai estudar <strong>rota padrão e gateway de último recurso</strong>, entendendo profundamente como <code>0.0.0.0/0</code> funciona, quando deve existir e quais riscos ela traz.</p></section>"
  },
  "networkContext": {
    "whereItAppears": [
      "hosts Windows e Linux",
      "roteadores",
      "switches camada 3",
      "firewalls",
      "VPNs",
      "SD-WAN",
      "cloud route tables",
      "Kubernetes nodes",
      "containers e bridges"
    ],
    "dependsOn": [
      "IPv4",
      "CIDR",
      "máscara",
      "gateway",
      "ARP",
      "ICMP",
      "subnetting"
    ],
    "doesNotSolve": [
      "autorização de acesso",
      "criptografia",
      "resolução DNS",
      "política de firewall",
      "identidade da aplicação",
      "qualidade do caminho por si só"
    ]
  },
  "protocolFields": [
    {
      "field": "Destination/Prefix",
      "meaning": "Rede de destino representada em CIDR, como 10.20.30.0/24.",
      "securityNote": "Prefixos amplos demais aumentam alcance e blast radius."
    },
    {
      "field": "Next hop/Gateway",
      "meaning": "Próximo roteador para onde o pacote deve ser enviado.",
      "securityNote": "Next hop indevido pode desviar tráfego para zona errada."
    },
    {
      "field": "Outgoing interface",
      "meaning": "Interface pela qual o pacote sairá.",
      "securityNote": "Interface incorreta pode quebrar segmentação ou inspeção."
    },
    {
      "field": "Metric",
      "meaning": "Custo usado para desempate entre rotas equivalentes.",
      "securityNote": "Métrica errada pode preferir caminho inseguro."
    },
    {
      "field": "Route source",
      "meaning": "Origem da rota: conectada, local, estática, dinâmica, VPN ou cloud.",
      "securityNote": "Rotas dinâmicas precisam de autenticação, filtragem e governança."
    },
    {
      "field": "Administrative distance/Priority",
      "meaning": "Preferência entre rotas de origens diferentes em muitos equipamentos.",
      "securityNote": "Prioridade mal configurada pode substituir uma rota planejada por outra indesejada."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Destino definido",
      "description": "O host ou roteador recebe um pacote com destino IPv4."
    },
    {
      "step": 2,
      "name": "Busca na tabela",
      "description": "O dispositivo compara o destino contra os prefixos conhecidos."
    },
    {
      "step": 3,
      "name": "Rotas candidatas",
      "description": "Todas as rotas que contêm o destino tornam-se candidatas."
    },
    {
      "step": 4,
      "name": "Longest prefix match",
      "description": "A rota com maior prefixo é escolhida."
    },
    {
      "step": 5,
      "name": "Desempate",
      "description": "Se houver empate, critérios como métrica, prioridade ou política podem decidir."
    },
    {
      "step": 6,
      "name": "Next hop",
      "description": "O dispositivo identifica gateway ou interface de saída."
    },
    {
      "step": 7,
      "name": "Entrega L2",
      "description": "Se necessário, ARP resolve o MAC do next hop no enlace local."
    },
    {
      "step": 8,
      "name": "Rota de retorno",
      "description": "A comunicação só se completa se o destino também souber voltar."
    }
  ],
  "deepDive": {
    "title": "Por que a rota mais específica vence?",
    "content": "Uma rota mais específica descreve um conjunto menor de endereços. Se 10.20.30.55 pertence a 10.0.0.0/8, também pode pertencer a 10.20.0.0/16 e 10.20.30.0/24. A rota /24 representa uma intenção mais precisa. Por isso, ela deve prevalecer sobre rotas genéricas. Esse princípio permite sumarização: uma rota ampla cobre muitos destinos, enquanto exceções específicas desviam apenas o que precisa de caminho especial.",
    "example": "Com destino 10.20.30.55: 10.0.0.0/8 combina; 10.20.0.0/16 combina; 10.20.30.0/24 combina; 0.0.0.0/0 também combina. A rota usada é 10.20.30.0/24.",
    "operationalImpact": [
      "Tabelas de rota mal documentadas aumentam MTTR porque equipes de rede, segurança, cloud e sistemas passam a investigar hipóteses diferentes.",
      "Rotas sobrepostas exigem controle de mudança e validação de caminho antes/depois, especialmente em VPN, cloud e ambientes híbridos.",
      "A ausência de rota de retorno pode gerar falhas intermitentes difíceis de diagnosticar, principalmente quando há NAT, firewalls stateful ou caminhos assimétricos."
    ],
    "financialImpact": [
      "Em cloud, uma rota para NAT Gateway, firewall gerenciado ou tráfego inter-região pode gerar custo recorrente por hora e por GB processado.",
      "Rotas incorretas podem enviar tráfego por caminho caro, como VPN, transit gateway, firewall centralizado ou link dedicado, quando havia caminho local mais barato.",
      "Troubleshooting sem evidência consome horas de equipes especializadas e pode prolongar indisponibilidade de serviços críticos."
    ],
    "securityImpact": [
      "Rotas amplas podem criar bypass de firewall, permitir movimento lateral ou expor subnets privadas a caminhos não previstos.",
      "Longest prefix match pode ser usado inadvertidamente para desviar tráfego por uma rota mais específica criada por erro de automação.",
      "Mudanças em route tables precisam de revisão, dono, justificativa, rollback e evidências para evitar violações de segmentação."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que a rota default sempre vence",
      "impact": "Tráfego específico pode ser esperado na Internet, mas sair por VPN ou firewall devido a rota mais específica.",
      "correction": "Lembrar que 0.0.0.0/0 é a rota menos específica."
    },
    {
      "mistake": "Ignorar rota de retorno",
      "impact": "Ping ou conexão não completa mesmo quando a rota de ida existe.",
      "correction": "Validar caminho nos dois sentidos."
    },
    {
      "mistake": "Confundir rota com permissão",
      "impact": "Equipe libera rota e acha que acesso está autorizado.",
      "correction": "Separar roteamento de firewall, ACL, IAM e autenticação."
    },
    {
      "mistake": "Não verificar rotas de VPN",
      "impact": "Split tunnel ou full tunnel envia tráfego para caminho inesperado.",
      "correction": "Comparar route print/ip route antes e depois da VPN."
    },
    {
      "mistake": "Criar rota específica sem documentação",
      "impact": "Mudanças futuras quebram aplicações por dependência invisível.",
      "correction": "Registrar dono, motivo, origem, destino, next hop e rollback."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Destino específico falha, mas outros destinos da mesma rede ampla funcionam.",
      "Tráfego funciona sem VPN, mas falha com VPN ativa.",
      "Servidor alcança Internet, mas não alcança rede privada ou cloud.",
      "Traceroute mostra primeiro salto inesperado.",
      "Firewall registra tráfego de ida, mas não registra retorno."
    ],
    "diagnosticQuestions": [
      "Qual rota vence para o destino específico?",
      "Existe rota mais específica injetada por VPN, túnel, container, cloud ou automação?",
      "A origem correta está sendo usada?",
      "O destino possui rota de retorno para a origem?",
      "O firewall está no caminho previsto ou foi contornado?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "route print",
        "purpose": "Listar a tabela de rotas IPv4 do host.",
        "expectedObservation": "Rotas 0.0.0.0/0, rotas específicas e métricas aparecem.",
        "interpretation": "Compare a rota default com rotas específicas de VPN ou rede corporativa."
      },
      {
        "platform": "PowerShell",
        "command": "Test-NetConnection 10.20.30.55 -Port 443 -TraceRoute",
        "purpose": "Testar conectividade TCP e caminho aproximado.",
        "expectedObservation": "TcpTestSucceeded e saltos do caminho aparecem.",
        "interpretation": "Falha TCP com rota válida indica hipótese de firewall, serviço ou retorno."
      },
      {
        "platform": "Linux",
        "command": "ip route",
        "purpose": "Listar rotas efetivas do host Linux.",
        "expectedObservation": "Entradas default, connected, tunelamento, bridges e rotas específicas aparecem.",
        "interpretation": "Rotas de Docker, VPN ou túnel podem alterar a decisão."
      },
      {
        "platform": "Linux",
        "command": "ip route get 10.20.30.55",
        "purpose": "Ver exatamente qual rota, interface e source IP serão usados.",
        "expectedObservation": "Saída inclui via, dev e src.",
        "interpretation": "É a forma mais direta de provar a decisão do kernel para um destino."
      },
      {
        "platform": "Linux",
        "command": "traceroute 10.20.30.55 || tracepath 10.20.30.55",
        "purpose": "Observar saltos e possíveis mudanças de caminho.",
        "expectedObservation": "Primeiro salto e pontos de parada aparecem.",
        "interpretation": "Parada em firewall não prova rota errada; pode ser bloqueio de ICMP."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route 10.20.30.55",
        "purpose": "Ver a rota vencedora para o destino em um roteador.",
        "expectedObservation": "Origem da rota, prefixo, next hop e interface aparecem.",
        "interpretation": "Confirme se a rota escolhida é a mais específica e se o next hop está alcançável."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip cef 10.20.30.55",
        "purpose": "Validar encaminhamento efetivo quando CEF está disponível.",
        "expectedObservation": "Adjacency, interface e next hop aparecem.",
        "interpretation": "Diferença entre RIB e FIB pode indicar convergência ou problema de forwarding."
      },
      {
        "platform": "Cloud",
        "command": "az network route-table route list -g RG --route-table-name RT || aws ec2 describe-route-tables",
        "purpose": "Inspecionar rotas de subnet em cloud.",
        "expectedObservation": "Prefixos e targets como NAT, IGW, firewall, peering ou VPN aparecem.",
        "interpretation": "Confirme se subnets sensíveis não têm rota direta indevida para Internet."
      }
    ],
    "decisionTree": [
      {
        "if": "O destino combina com várias rotas",
        "then": "Escolha o maior prefixo e valide com ip route get ou show ip route DESTINO."
      },
      {
        "if": "A rota de ida parece correta, mas a sessão falha",
        "then": "Validar rota de retorno, firewall stateful, NAT e logs nos dois sentidos."
      },
      {
        "if": "VPN muda o caminho",
        "then": "Procurar rota mais específica injetada pelo cliente VPN e comparar métricas."
      },
      {
        "if": "Cloud subnet não alcança destino privado",
        "then": "Verificar route table associada, peering/VPN, propagação e regras de segurança."
      },
      {
        "if": "Traceroute para em um salto",
        "then": "Não concluir imediatamente que a rota acabou; validar política ICMP, TCP traceroute e logs."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar menor prefixo necessário para cada rota.",
      "Documentar dono, justificativa, origem, destino, next hop e rollback.",
      "Validar rotas em pipeline quando forem gerenciadas por IaC.",
      "Evitar 0.0.0.0/0 em subnets sensíveis sem justificativa e inspeção.",
      "Garantir que tráfego entre zonas passe por controles planejados.",
      "Monitorar mudanças de route tables, rotas de VPN e rotas estáticas críticas.",
      "Verificar rota de retorno em desenhos de firewall stateful."
    ],
    "badPractices": [
      "Criar rotas amplas para resolver rapidamente um incidente sem revisão posterior.",
      "Usar route tables de produção como laboratório.",
      "Remover rota específica sem mapear dependências.",
      "Confiar apenas no ping para validar caminho de aplicação.",
      "Permitir propagação dinâmica de rotas sem filtros mínimos."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição por rota default indevida.",
        "description": "Risco relacionado à aula 11.2 — Tabela de rotas e longest prefix match.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Menor privilégio de rede."
      },
      {
        "name": "Movimento lateral facilitado por rotas amplas entre zonas.",
        "description": "Risco relacionado à aula 11.2 — Tabela de rotas e longest prefix match.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão por pares em mudanças de rota."
      },
      {
        "name": "Desvio de inspeção por rota específica mal configurada.",
        "description": "Risco relacionado à aula 11.2 — Tabela de rotas e longest prefix match.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM e detecção de CIDR sobreposto."
      },
      {
        "name": "Indisponibilidade por rota de retorno ausente.",
        "description": "Risco relacionado à aula 11.2 — Tabela de rotas e longest prefix match.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Policy as code para rotas sensíveis."
      },
      {
        "name": "Caminho assimétrico quebrando firewall stateful ou mascarando evidências.",
        "description": "Risco relacionado à aula 11.2 — Tabela de rotas e longest prefix match.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs de alteração e alertas em route tables."
      }
    ],
    "mitigations": [
      "Menor privilégio de rede.",
      "Revisão por pares em mudanças de rota.",
      "IPAM e detecção de CIDR sobreposto.",
      "Policy as code para rotas sensíveis.",
      "Logs de alteração e alertas em route tables.",
      "Testes de ida e volta antes e depois de mudanças."
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
      "Menor privilégio de rede.",
      "Revisão por pares em mudanças de rota.",
      "IPAM e detecção de CIDR sobreposto.",
      "Policy as code para rotas sensíveis.",
      "Logs de alteração e alertas em route tables.",
      "Testes de ida e volta antes e depois de mudanças."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-11.2",
    "title": "Tabela de rotas na prática: longest prefix match, retorno e evidências",
    "labType": "troubleshooting",
    "objective": "Provar qual rota vence para destinos específicos em Windows, Linux, Cisco e cloud, validando também rota de retorno e impacto de segurança.",
    "scenario": "Você recebeu uma ocorrência: usuários conseguem acessar 10.20.0.10, mas falham ao acessar 10.20.30.55 após ativar VPN. Há rotas sobrepostas e suspeita de caminho indevido.",
    "topology": "Host Windows/Linux -> VPN/roteador -> firewall -> rede 10.20.30.0/24 -> servidor 10.20.30.55; cenário opcional em Packet Tracer/GNS3 ou somente análise controlada.",
    "architecture": "O host possui rota default, uma rota ampla 10.0.0.0/8 e uma rota específica 10.20.30.0/24. O aluno deve demonstrar qual vence e se o retorno existe.",
    "prerequisites": [
      "Módulo 4 IPv4",
      "Módulo 5 Subnetting",
      "Aula 11.1 sobre por que roteamento existe"
    ],
    "tools": [
      "Windows CMD/PowerShell",
      "Linux iproute2",
      "Cisco Packet Tracer/GNS3 opcional",
      "Console cloud opcional"
    ],
    "estimatedTimeMinutes": 70,
    "cost": "zero",
    "safetyNotes": [
      "Não altere rotas de produção.",
      "Execute mudanças apenas em laboratório, VM ou Packet Tracer.",
      "Sanitize IPs públicos, nomes internos e evidências antes de compartilhar."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventariar tabela no Windows",
        "instruction": "Liste rotas e identifique default, rotas específicas, interface e métrica.",
        "command": "route print",
        "expectedOutput": "Tabela IPv4 com 0.0.0.0/0, rotas conectadas e rotas específicas.",
        "explanation": "A tabela mostra quais prefixos o host conhece e permite detectar rotas de VPN."
      },
      {
        "number": 2,
        "title": "Provar decisão no Linux",
        "instruction": "Verifique a rota efetiva para o servidor problemático.",
        "command": "ip route get 10.20.30.55",
        "expectedOutput": "Linha com via, dev e src.",
        "explanation": "O comando mostra a decisão real do kernel para aquele destino específico."
      },
      {
        "number": 3,
        "title": "Comparar destino amplo e específico",
        "instruction": "Compare uma rota para 10.20.0.10 e outra para 10.20.30.55.",
        "command": "ip route get 10.20.0.10 && ip route get 10.20.30.55",
        "expectedOutput": "Destinos podem sair por interfaces/next hops diferentes.",
        "explanation": "Isso evidencia o efeito de longest prefix match."
      },
      {
        "number": 4,
        "title": "Validar caminho aproximado",
        "instruction": "Execute traceroute/tracert para observar primeiro salto e interrupções.",
        "command": "traceroute 10.20.30.55 || tracert 10.20.30.55",
        "expectedOutput": "Lista de saltos ou pontos de bloqueio.",
        "explanation": "Traceroute ajuda, mas deve ser interpretado junto com firewall e ICMP."
      },
      {
        "number": 5,
        "title": "Validar porta de aplicação",
        "instruction": "Teste uma porta TCP para separar rota de serviço/firewall.",
        "command": "Test-NetConnection 10.20.30.55 -Port 443 -TraceRoute",
        "expectedOutput": "TcpTestSucceeded True/False e rota aproximada.",
        "explanation": "Se rota existe mas TCP falha, investigue firewall, serviço, NAT ou retorno."
      },
      {
        "number": 6,
        "title": "Ver rota vencedora no roteador",
        "instruction": "No Packet Tracer/GNS3/Cisco, consulte a rota para o destino.",
        "command": "show ip route 10.20.30.55",
        "expectedOutput": "Prefixo vencedor, next hop, origem e interface.",
        "explanation": "O roteador também aplica longest prefix match de forma independente."
      },
      {
        "number": 7,
        "title": "Checar retorno",
        "instruction": "No lado do servidor ou roteador de destino, valide rota para a origem.",
        "command": "ip route get 192.168.50.20 || show ip route 192.168.50.20",
        "expectedOutput": "Rota de retorno para a origem.",
        "explanation": "Sem retorno, a ida pode estar correta e ainda assim a sessão falhar."
      },
      {
        "number": 8,
        "title": "Registrar matriz de evidências",
        "instruction": "Monte tabela com destino, rota vencedora, next hop, interface, retorno e política.",
        "artifact": "Tabela: destino | rota vencedora | comando | next hop | interface | retorno | evidência | conclusão.",
        "expectedOutput": "Matriz preenchida e sanitizada.",
        "explanation": "A evidência transforma troubleshooting em diagnóstico auditável."
      }
    ],
    "expectedResult": "O aluno demonstra, com comandos e matriz de evidências, qual rota vence para cada destino e se há rota de retorno e política coerente.",
    "validation": [
      {
        "check": "Rota efetiva identificada no host",
        "command": "ip route get 10.20.30.55",
        "expected": "Saída com via/dev/src ou equivalente.",
        "ifFails": "Usar route print no Windows ou revisar se o host está conectado à rede/VPN."
      },
      {
        "check": "Rota vencedora identificada no roteador",
        "command": "show ip route 10.20.30.55",
        "expected": "Prefixo mais específico aparece.",
        "ifFails": "Verificar se a rota foi configurada/aprendida e se o next hop é alcançável."
      },
      {
        "check": "Retorno validado",
        "command": "ip route get 192.168.50.20",
        "expected": "Rota para a origem.",
        "ifFails": "Adicionar rota de retorno no laboratório ou ajustar sumarização."
      },
      {
        "check": "Política separada de rota",
        "command": "Test-NetConnection 10.20.30.55 -Port 443",
        "expected": "Resultado TCP documentado.",
        "ifFails": "Investigar firewall, serviço, NAT ou retorno."
      },
      {
        "check": "Evidências sanitizadas",
        "command": "grep -E \"(10.20.30.55|192.168.50.20)\" evidencias-rotas.txt",
        "expected": "Arquivo contém apenas IPs de laboratório.",
        "ifFails": "Remover nomes internos/tokens e repetir coleta."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Rota default vence quando deveria haver rota específica.",
        "probableCause": "Rota específica ausente ou não instalada.",
        "howToConfirm": "ip route get DESTINO ou show ip route DESTINO.",
        "fix": "Adicionar/corrigir rota específica ou propagação."
      },
      {
        "symptom": "Rota específica existe, mas sessão falha.",
        "probableCause": "Rota de retorno ausente ou firewall bloqueando.",
        "howToConfirm": "Validar caminho reverso e logs.",
        "fix": "Corrigir retorno ou política."
      },
      {
        "symptom": "VPN altera caminho esperado.",
        "probableCause": "Cliente VPN injeta rota mais específica.",
        "howToConfirm": "route print antes/depois da VPN.",
        "fix": "Ajustar split tunnel, métrica ou política de acesso."
      },
      {
        "symptom": "Cloud envia tráfego para NAT em vez de firewall.",
        "probableCause": "Route table associada errada.",
        "howToConfirm": "Listar route table da subnet.",
        "fix": "Associar route table correta e validar fluxo."
      }
    ],
    "improvements": [
      "Repetir em Packet Tracer com três rotas sobrepostas.",
      "Criar cenário com VPN split tunnel.",
      "Adicionar validação com flow logs ou firewall logs.",
      "Comparar RIB e FIB quando disponível."
    ],
    "evidenceToCollect": [
      "route print ou ip route",
      "ip route get para dois destinos",
      "show ip route DESTINO",
      "traceroute/tracert",
      "resultado Test-NetConnection/curl",
      "matriz de ida/retorno",
      "print ou export sanitizado da route table cloud"
    ],
    "questions": [
      "Por que /24 vence /16?",
      "Por que rota default não deve ser usada como prova de caminho correto?",
      "Como uma rota de VPN pode quebrar acesso a uma aplicação?",
      "Que evidência prova rota de retorno?"
    ],
    "challenge": "Crie uma tabela com três rotas sobrepostas e explique qual vence para cinco destinos diferentes, incluindo um destino que cai apenas na rota default.",
    "solution": "A rota vencedora é sempre a correspondência de maior prefixo. Depois de escolhida a ida, valide retorno e política; conectividade só é comprovada quando os dois sentidos e o controle de acesso estão coerentes."
  },
  "mentorQuestions": [
    "Quando uma rota /24 e uma rota /16 combinam com o mesmo destino, por que a /24 vence?",
    "Por que a existência de rota não garante que a aplicação esteja acessível?",
    "Como você provaria que um problema é falta de rota de retorno e não DNS?"
  ],
  "quiz": [
    {
      "question": "Qual rota vence para o destino 10.20.30.55 se existem 10.0.0.0/8, 10.20.0.0/16, 10.20.30.0/24 e 0.0.0.0/0?",
      "options": [
        "0.0.0.0/0",
        "10.0.0.0/8",
        "10.20.0.0/16",
        "10.20.30.0/24"
      ],
      "answer": "10.20.30.0/24",
      "explanation": "A rota /24 é a mais específica entre as rotas que combinam com o destino."
    },
    {
      "question": "O que significa longest prefix match?",
      "options": [
        "Escolher a rota com menor métrica sempre",
        "Escolher a rota com prefixo mais longo entre as correspondências",
        "Escolher sempre a rota default",
        "Escolher a rota criada mais recentemente"
      ],
      "answer": "Escolher a rota com prefixo mais longo entre as correspondências",
      "explanation": "Prefixo mais longo significa correspondência mais específica."
    },
    {
      "question": "Quando a rota 0.0.0.0/0 é usada?",
      "options": [
        "Sempre primeiro",
        "Apenas para tráfego local",
        "Quando nenhuma rota mais específica combina",
        "Somente para DNS"
      ],
      "answer": "Quando nenhuma rota mais específica combina",
      "explanation": "A rota default é a menos específica e funciona como último recurso."
    },
    {
      "question": "Qual item não é normalmente resolvido apenas por uma tabela de rotas?",
      "options": [
        "Próximo salto",
        "Interface de saída",
        "Autorização da aplicação",
        "Prefixo de destino"
      ],
      "answer": "Autorização da aplicação",
      "explanation": "Rota define caminho. Autorização depende de controles como firewall, IAM, autenticação e aplicação."
    },
    {
      "question": "Por que rota de retorno é importante?",
      "options": [
        "Porque DNS depende dela",
        "Porque comunicação bidirecional precisa que a resposta volte",
        "Porque evita ARP",
        "Porque remove necessidade de firewall"
      ],
      "answer": "Porque comunicação bidirecional precisa que a resposta volte",
      "explanation": "Muitos problemas parecem falha de ida, mas são falta de caminho de volta."
    },
    {
      "question": "Qual comando Linux ajuda a ver a decisão de rota para um destino específico?",
      "options": [
        "ip route get <destino>",
        "cat /etc/passwd",
        "lsroute --dns",
        "arp -flush"
      ],
      "answer": "ip route get <destino>",
      "explanation": "ip route get mostra a rota efetiva escolhida para um destino."
    }
  ],
  "flashcards": [
    {
      "front": "O que é tabela de rotas?",
      "back": "Estrutura que mapeia prefixos de destino para next hop, interface e critérios de escolha."
    },
    {
      "front": "O que é longest prefix match?",
      "back": "Regra que escolhe a rota mais específica entre todas as que combinam com o destino."
    },
    {
      "front": "Por que 0.0.0.0/0 é menos específico?",
      "back": "Porque combina com todos os endereços IPv4 e não fixa nenhum bit de rede."
    },
    {
      "front": "Rota garante permissão?",
      "back": "Não. Rota fornece caminho; permissão depende de firewall, ACL, IAM, autenticação e políticas."
    },
    {
      "front": "O que é next hop?",
      "back": "O próximo roteador ou gateway para onde o pacote deve ser enviado."
    },
    {
      "front": "O que é rota de retorno?",
      "back": "Caminho que permite que a resposta volte da rede de destino para a origem."
    }
  ],
  "exercises": [
    {
      "title": "Escolha a rota",
      "prompt": "Com rotas 172.16.0.0/12, 172.16.40.0/24 e 0.0.0.0/0, qual rota será usada para 172.16.40.88?",
      "expectedAnswer": "172.16.40.0/24, pois é a rota mais específica."
    },
    {
      "title": "Rota default",
      "prompt": "Explique por que 8.8.8.8 normalmente usa 0.0.0.0/0 em um host doméstico.",
      "expectedAnswer": "Porque não há uma rota específica para 8.8.8.8, então o host usa a rota default."
    },
    {
      "title": "VPN",
      "prompt": "Uma VPN adiciona 10.10.0.0/16. O que acontece com tráfego para 10.10.5.20?",
      "expectedAnswer": "Ele passa a usar a rota da VPN se ela for a correspondência mais específica."
    },
    {
      "title": "Segurança",
      "prompt": "Por que uma rota ampla entre desenvolvimento e produção é perigosa?",
      "expectedAnswer": "Ela amplia alcance, facilita movimento lateral e pode contornar segmentação planejada."
    },
    {
      "id": "ex11.2.p1.1",
      "type": "diagnóstico",
      "prompt": "Um host tem rotas 10.0.0.0/8, 10.20.0.0/16 e 10.20.30.0/24. Qual rota vence para 10.20.30.55 e por quê?",
      "expectedAnswer": "10.20.30.0/24, porque é a correspondência mais específica.",
      "explanation": "Longest prefix match escolhe o prefixo mais longo entre as rotas que combinam com o destino."
    },
    {
      "id": "ex11.2.p1.2",
      "type": "troubleshooting",
      "prompt": "A ida até 10.20.30.55 aparece correta, mas a aplicação não responde. Liste três hipóteses além de “rota errada”.",
      "expectedAnswer": "Rota de retorno ausente, firewall bloqueando, serviço parado, NAT assimétrico ou porta errada.",
      "explanation": "Rota de ida é só uma parte da comunicação."
    }
  ],
  "challenge": {
    "title": "Auditoria de tabela de rotas sobreposta",
    "scenario": "Você recebeu uma tabela com as rotas: 10.0.0.0/8 via DC, 10.40.0.0/16 via VPN, 10.40.20.0/24 via Firewall, 10.40.20.50/32 via Bastion e 0.0.0.0/0 via Internet.",
    "tasks": [
      "Determinar o caminho para 10.40.20.50",
      "Determinar o caminho para 10.40.20.88",
      "Determinar o caminho para 10.40.99.10",
      "Determinar o caminho para 10.9.1.1",
      "Determinar o caminho para 8.8.8.8",
      "Apontar dois riscos de segurança",
      "Sugerir duas validações antes de produção"
    ],
    "rubric": [
      "Aplica longest prefix match corretamente",
      "Distingue rota específica, ampla e default",
      "Considera rota de retorno",
      "Considera firewall/inspeção",
      "Documenta riscos e rollback"
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desafio",
    "steps": [
      "10.40.20.50 usa 10.40.20.50/32, pois /32 é o host específico.",
      "10.40.20.88 usa 10.40.20.0/24, pois combina com /24 e /16, mas /24 é mais específico.",
      "10.40.99.10 usa 10.40.0.0/16, pois não pertence ao /24 informado.",
      "10.9.1.1 usa 10.0.0.0/8, pois combina apenas com a rota ampla privada.",
      "8.8.8.8 usa 0.0.0.0/0, pois nenhuma rota específica combina.",
      "Riscos: /8 amplo pode expandir acesso; /32 para bastion pode desviar tráfego sensível; rota default para Internet exige inspeção.",
      "Validações: traceroute/mtr, testes de aplicação, firewall logs, rota de retorno, revisão de IPAM e mudança com rollback."
    ],
    "mentorComment": "A chave não é decorar uma tabela. É provar, para cada destino, quais rotas combinam, qual tem prefixo mais longo e se o caminho faz sentido operacional e defensivamente."
  },
  "glossary": [
    {
      "term": "Tabela de rotas",
      "definition": "Lista de prefixos e caminhos usados para encaminhar tráfego IP."
    },
    {
      "term": "Longest prefix match",
      "definition": "Regra de escolha da rota mais específica entre as rotas candidatas."
    },
    {
      "term": "Next hop",
      "definition": "Próximo roteador/gateway para onde o pacote será enviado."
    },
    {
      "term": "Rota default",
      "definition": "Rota 0.0.0.0/0 usada quando não há rota mais específica."
    },
    {
      "term": "Rota conectada",
      "definition": "Rota criada automaticamente para uma rede diretamente ligada a uma interface."
    },
    {
      "term": "Rota de retorno",
      "definition": "Caminho necessário para que a resposta volte ao remetente."
    }
  ],
  "references": [
    "Curso Redes e Network v2.0 — Módulo 4: IPv4 e Endereçamento",
    "Curso Redes e Network v2.0 — Módulo 5: Subnetting e planejamento de endereçamento IPv4",
    "Cisco IOS: show ip route e conceitos de roteamento",
    "Linux iproute2: ip route e ip route get",
    "Microsoft Windows: route print e Get-NetRoute"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e automação",
      "reason": "Route tables em cloud devem ser versionadas, revisadas e validadas como código."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso entre serviços",
      "reason": "Rota permite caminho, mas identidade e autorização controlam acesso lógico entre serviços."
    }
  ],
  "progressRules": {
    "minimumTimeMinutes": 45,
    "requiredQuizScore": 70,
    "requiredLabCompletion": true,
    "requiredExercises": 3,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "11.3"
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
