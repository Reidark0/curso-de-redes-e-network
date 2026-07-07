export const lesson1104 = {
  "id": "11.4",
  "moduleId": "m11",
  "order": 4,
  "title": "Rotas estáticas e rotas flutuantes",
  "subtitle": "Entenda quando declarar rotas manualmente, como uma rota estática aponta para um próximo salto, como uma rota flutuante oferece contingência e quais riscos operacionais surgem quando caminhos manuais não são documentados.",
  "duration": "105-150 min",
  "estimatedStudyTimeMinutes": 150,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 250,
  "tags": [
    "redes",
    "ipv4",
    "roteamento",
    "rota estática",
    "rota flutuante",
    "next hop",
    "distância administrativa",
    "redundância",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops",
    "packet-tracer",
    "gns3",
    "troubleshooting real",
    "roteamento avançado"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.1",
      "reason": "A aula 11.1 apresenta o problema que o roteamento resolve, gateway, next hop e rota de retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.2",
      "reason": "A aula 11.2 explica tabela de rotas e longest prefix match, base para entender por que uma rota estática pode vencer ou perder para outra rota."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m11",
      "lesson": "11.3",
      "reason": "A aula 11.3 explica rota default e gateway de último recurso, frequentemente configurados como rota estática."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m05",
      "reason": "Rotas estáticas apontam para prefixos calculados e planejados no módulo de subnetting."
    }
  ],
  "objectives": [
    "Explicar o que é uma rota estática e qual problema ela resolve.",
    "Diferenciar rota estática comum, rota default estática e rota flutuante.",
    "Entender next hop, interface de saída, prefixo de destino, máscara e distância administrativa.",
    "Aplicar o conceito de rota flutuante para redundância simples sem protocolo dinâmico.",
    "Identificar riscos de rotas estáticas esquecidas, sobrepostas, inseguras ou sem rota de retorno.",
    "Diagnosticar rotas estáticas em Windows, Linux, Cisco IOS, firewalls e cloud route tables."
  ],
  "learningOutcomes": [
    "Dado um prefixo remoto, o aluno escreve a ideia de uma rota estática para o próximo salto correto.",
    "Dada uma tabela com rotas estáticas e conectadas, o aluno identifica qual rota será usada.",
    "Dado um cenário com link principal e backup, o aluno explica como a rota flutuante entra em ação.",
    "Dado um problema de conectividade, o aluno verifica se há rota de ida, rota de volta e política permitindo o tráfego.",
    "Dado um ambiente cloud ou corporativo, o aluno aponta riscos de rotas manuais sem governança."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Depois de entender tabela de rotas e rota default, surge uma necessidade prática: como informar manualmente a um host, roteador, firewall ou route table que determinada rede deve ser alcançada por um caminho específico?</p>\n<p>Esse problema aparece em redes pequenas, filiais, laboratórios, firewalls, VPNs, appliances, cloud e ambientes híbridos. Uma empresa pode ter uma rede 10.30.0.0/16 atrás de uma VPN, uma DMZ atrás de um firewall, uma filial por um link MPLS e um link secundário por Internet. Nem sempre existe um protocolo dinâmico de roteamento trocando informações automaticamente. Às vezes, a decisão precisa ser configurada de forma explícita.</p>\n<div class=\"callout callout--problem\"><strong>Ideia central:</strong> rota estática é uma instrução manual de encaminhamento. Rota flutuante é uma rota estática de backup configurada para só ser usada quando a rota principal não estiver disponível.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Antes de redes corporativas grandes dependerem de protocolos dinâmicos, muitas interconexões eram configuradas manualmente. Administradores declaravam rotas em servidores, roteadores e firewalls para alcançar redes remotas específicas.</p>\n<p>Com o crescimento das redes, protocolos dinâmicos como RIP, OSPF, EIGRP, IS-IS e BGP passaram a automatizar parte desse processo. Mesmo assim, rotas estáticas permaneceram importantes porque são previsíveis, simples, fáceis de auditar em ambientes pequenos e úteis para default routes, links de backup, redes de gestão, laboratórios, VPNs site-to-site e rotas específicas de appliances.</p>\n<p>Na cloud moderna, a ideia continua viva: route tables de VPCs e VNets frequentemente usam rotas declaradas manualmente para enviar tráfego a NAT gateways, Internet gateways, firewalls virtuais, transit gateways, VPN gateways, peerings e appliances de inspeção.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>Sem uma rota para a rede remota, um dispositivo não sabe por onde encaminhar pacotes. Ele pode usar a rota default, descartar o tráfego, enviar para um caminho errado ou criar assimetria.</p>\n<p>O problema fica mais sério quando existem vários caminhos possíveis. Um link principal pode falhar. Um túnel VPN pode cair. Um firewall pode precisar ser o caminho obrigatório para inspeção. Um ambiente cloud pode ter uma rota para um bloco privado via VPN e outra para Internet via NAT. Se as rotas não forem explícitas, documentadas e testadas, o tráfego pode sair por caminhos inseguros ou simplesmente não voltar.</p>\n<div class=\"callout callout--warning\"><strong>Erro comum:</strong> configurar apenas a rota de ida. Em roteamento, comunicação real exige caminho de ida, caminho de volta e política permitindo o fluxo.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<table class=\"data-table\"><thead><tr><th>Fase</th><th>Como funcionava</th><th>Limitação</th></tr></thead><tbody><tr><td>Rede única</td><td>Todos no mesmo domínio local</td><td>Não escala e aumenta risco</td></tr><tr><td>Rotas estáticas</td><td>Administrador declara destino e next hop</td><td>Manutenção manual</td></tr><tr><td>Rotas flutuantes</td><td>Backup manual com prioridade menor</td><td>Não entende topologia complexa</td></tr><tr><td>Protocolos dinâmicos</td><td>Roteadores aprendem caminhos</td><td>Mais complexidade</td></tr><tr><td>Cloud route tables</td><td>Rotas declarativas em redes virtuais</td><td>Risco de governança fraca por IaC</td></tr></tbody></table>\n<p>A evolução não eliminou a rota estática. Ela apenas definiu melhor seu lugar: simples, previsível e útil quando o caminho é conhecido e controlado.</p></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Rota estática</strong> é uma entrada de tabela de rotas configurada manualmente para indicar que um prefixo de destino deve ser alcançado por um próximo salto ou por uma interface de saída.</p>\n<div class=\"definition-box\"><strong>Definição prática:</strong> para chegar à rede X/Y, envie o pacote para o próximo salto Z ou saia pela interface W.</div>\n<p><strong>Rota flutuante</strong> é uma rota estática com prioridade pior do que a rota principal. Ela permanece na configuração, mas só aparece como caminho efetivo quando a rota principal desaparece ou deixa de ser válida.</p></section>\n\n<div class='content-card' data-enhancement='p0-04e-11-4-static-route-vs-default-vs-floating'>\n  <h4>Rota estática específica, rota default e rota flutuante não são a mesma coisa</h4>\n  <p>Uma rota estática específica aponta para um prefixo definido, como <code>10.20.20.0/24</code>. Ela é usada quando o destino bate naquele prefixo, especialmente se for mais específica que a rota default. Uma rota default estática, como <code>0.0.0.0/0</code>, é uma saída genérica para destinos desconhecidos. Já a rota flutuante é uma rota estática de contingência: ela existe na configuração, mas perde preferência para a principal por ter distância administrativa maior.</p>\n  <p>Essa distinção evita um erro comum de operação: usar default route para resolver qualquer problema de alcance. Em segurança, isso é perigoso porque amplia o escopo do tráfego, pode desviar inspeção, pode criar saída para redes que não deveriam ser alcançadas e dificulta auditoria. O desenho correto começa perguntando: qual prefixo precisa ser alcançado, por qual next hop, com qual retorno, com qual política e com qual evidência de validação?</p>\n</div>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<ol class=\"flow-list\"><li>O dispositivo recebe ou gera um pacote IPv4.</li><li>Ele consulta a tabela de rotas.</li><li>Aplica longest prefix match para encontrar a rota mais específica.</li><li>Se houver empate de prefixo, compara origem da rota, distância administrativa e métrica, conforme a plataforma.</li><li>Se a rota escolhida for estática, usa o next hop ou a interface definidos manualmente.</li><li>Se o next hop estiver em rede diretamente conectada, resolve o MAC via ARP.</li><li>Encaminha o pacote pelo enlace correto.</li><li>Se a rota principal sumir, uma rota flutuante com distância administrativa maior pode entrar na tabela efetiva.</li></ol>\n<div class=\"callout callout--security\"><strong>Ponto crítico:</strong> rota estática não testa sozinha se a aplicação funciona, se o firewall permite o tráfego ou se a resposta sabe voltar.</div></section>\n\n<div class='content-card' data-enhancement='p0-04e-11-4-ad-metric-recursive'>\n  <h4>Distância administrativa, métrica e resolução recursiva</h4>\n  <p>Em plataformas como Cisco IOS, a distância administrativa compara a confiabilidade da origem da rota. Uma rota conectada costuma ser preferida a uma estática, e uma rota estática comum costuma ser preferida a várias rotas dinâmicas. A rota flutuante manipula esse comportamento: ela recebe uma distância administrativa maior para não vencer em condição normal.</p>\n  <p>Também existe a resolução recursiva. Se a rota aponta para um next hop, o roteador precisa saber como alcançar esse next hop. Se o next hop não está em uma rede conectada ou se a rota intermediária desaparece, a rota estática pode não ser instalada ou pode encaminhar para um caminho inesperado. Por isso o diagnóstico precisa validar tanto o prefixo de destino quanto a alcançabilidade do next hop.</p>\n</div>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Rotas estáticas aparecem em várias camadas da arquitetura. Em hosts, podem enviar uma rede específica por uma VPN. Em roteadores, podem apontar para filiais. Em firewalls, podem forçar o tráfego por zonas de inspeção. Em cloud, podem direcionar subnets para NAT, Internet Gateway, firewall virtual, VPN Gateway ou Transit Gateway.</p>\n<table class=\"comparison-table\"><thead><tr><th>Local</th><th>Uso comum</th><th>Risco</th></tr></thead><tbody><tr><td>Host</td><td>Rede específica via VPN</td><td>Conflito com rota local ou default</td></tr><tr><td>Roteador</td><td>Filial ou link dedicado</td><td>Rota esquecida após mudança</td></tr><tr><td>Firewall</td><td>Forçar inspeção entre zonas</td><td>Bypass por rota alternativa</td></tr><tr><td>Cloud</td><td>Enviar tráfego a NAT, firewall ou VPN</td><td>CIDR sobreposto e saída ampla</td></tr><tr><td>DevSecOps</td><td>IaC declarando route tables</td><td>Pull request sem revisão de impacto</td></tr></tbody></table></section>\n\n<div class='content-card' data-enhancement='p0-04e-11-4-cloud-iac-routing'>\n  <h4>Rotas estáticas em cloud e IaC</h4>\n  <p>Em cloud, route tables funcionam como política explícita de encaminhamento. Uma subnet pode enviar <code>0.0.0.0/0</code> para um NAT Gateway, tráfego privado para um Transit Gateway, redes locais para uma VPN, ou tráfego sensível para um firewall virtual. Isso parece simples, mas uma única rota pode mudar o caminho de centenas de workloads.</p>\n  <p>Por isso, em DevSecOps, rotas devem ser tratadas como código: revisão por pull request, plano de mudança, validação de impacto, tags de ownership, rollback e detecção de drift. Uma rota manual criada no console para “resolver rápido” pode ficar esquecida por meses e se tornar caminho de bypass ou custo recorrente desnecessário.</p>\n</div>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine uma empresa com várias unidades. A rota default é como dizer: “qualquer entrega desconhecida vai para a recepção principal”. Uma rota estática é como uma instrução específica: “documentos para o prédio jurídico devem ir pelo mensageiro João”.</p>\n<p>A rota flutuante é como ter uma segunda instrução guardada: “se o João não estiver disponível, use a transportadora externa”. Ela não é a preferência normal, mas evita interrupção.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> redes não dependem de bom senso humano. Se a rota estiver errada, o tráfego seguirá o erro de forma obediente e silenciosa.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Um roteador da rede 192.168.10.0/24 precisa alcançar a rede 192.168.20.0/24 por meio do next hop 192.168.10.254. A ideia da rota é:</p>\n<pre><code>destino: 192.168.20.0/24\nnext hop: 192.168.10.254</code></pre>\n<p>Quando um pacote para 192.168.20.50 chegar, o roteador consulta a tabela, encontra essa rota e encaminha para 192.168.10.254.</p></section>\n\n<div class='content-card' data-enhancement='p0-04e-11-4-simple-example-lab'>\n  <h4>Exemplo simples: notebook com rota para rede de laboratório</h4>\n  <p>Seu notebook está na rede <code>192.168.1.0/24</code>, mas uma VM ou laboratório remoto está em <code>10.50.0.0/16</code> atrás de um roteador local <code>192.168.1.254</code>. Em vez de mudar a rota default da máquina inteira, você adiciona uma rota específica para <code>10.50.0.0/16</code> via <code>192.168.1.254</code>. Assim, somente aquele prefixo usa o caminho especial; o restante continua usando o gateway comum.</p>\n  <p>O teste correto não é apenas adicionar a rota. É verificar <code>ip route get 10.50.1.10</code> no Linux ou <code>route print</code> no Windows, testar alcance, confirmar retorno e remover a rota quando o laboratório acabar.</p>\n</div>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Uma empresa tem matriz, filial e firewall central. A matriz usa 10.10.0.0/16, a filial usa 10.20.0.0/16 e a DMZ usa 10.30.10.0/24. O firewall pode ter rotas estáticas para a filial via roteador WAN e rotas específicas para a DMZ por uma interface interna.</p>\n<p>Se o link principal para a filial é MPLS e o secundário é VPN pela Internet, uma rota flutuante pode manter o backup com prioridade pior. Em operação normal, usa-se MPLS. Quando a rota principal deixa de existir, o backup assume.</p></section>\n\n<div class='content-card' data-enhancement='p0-04e-11-4-enterprise-change'>\n  <h4>Exemplo empresarial: filial com link principal e backup</h4>\n  <p>Uma filial acessa sistemas da matriz pelo link principal. A empresa adiciona uma VPN de backup pela Internet. A rota principal aponta para o roteador WAN. A rota flutuante aponta para o roteador VPN com prioridade pior. Em condição normal, o tráfego passa pelo caminho principal. Se o link principal cai e a rota deixa de ser válida, o backup assume.</p>\n  <p>O desenho só é aceitável se o caminho alternativo mantiver os controles: firewall, logs, autenticação, autorização, DNS correto, MTU testado e rota de retorno. Redundância que ignora segurança não é resiliência; é bypass com outro nome.</p>\n</div>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em uma VPC ou VNet, route tables controlam o caminho das subnets. Uma subnet privada pode ter rota default para um NAT Gateway. Uma subnet de workloads sensíveis pode ter rota default para um firewall virtual. Uma rede on-premises pode ser alcançada por uma rota específica via VPN Gateway.</p>\n<p>Exemplo conceitual: <code>10.50.0.0/16</code> via VPN Gateway e <code>0.0.0.0/0</code> via firewall. O longest prefix match faz com que destinos 10.50.x.x usem VPN, enquanto destinos externos usem a rota default.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em infraestrutura como código, rotas estáticas aparecem em Terraform, CloudFormation, Bicep, Pulumi, Ansible e configurações de rede. Uma alteração aparentemente simples em route table pode expor uma subnet privada, quebrar acesso a banco, desviar tráfego de inspeção ou criar assimetria.</p>\n<p>Por isso, pipelines maduros devem validar sobreposição de CIDR, destino <code>0.0.0.0/0</code>, next hop esperado, associação correta de subnets e impacto em ambientes produtivos.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Rotas estáticas são controles operacionais, mas também podem virar risco. Uma rota muito ampla pode mandar tráfego sensível para um caminho sem inspeção. Uma rota específica demais pode criar bypass. Uma rota esquecida pode manter conectividade com parceiro antigo. Uma rota de retorno ausente pode parecer problema de firewall, quando na verdade é problema de roteamento.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Sintoma</th><th>Mitigação</th></tr></thead><tbody><tr><td>Bypass de firewall</td><td>Tráfego sai por gateway alternativo</td><td>Revisão de route tables e arquitetura</td></tr><tr><td>Rota legada</td><td>Rede antiga ainda acessível</td><td>Inventário e lifecycle de rotas</td></tr><tr><td>Rota ampla</td><td>Mais destinos alcançáveis que o necessário</td><td>Menor prefixo necessário</td></tr><tr><td>Sem rota de retorno</td><td>Pacote vai, resposta não volta</td><td>Validar ida e volta</td></tr></tbody></table></section>\n\n<div class='content-card' data-enhancement='p0-04e-11-4-security-route-governance'>\n  <h4>Segurança: rota é alcance, não autorização</h4>\n  <p>Uma rota permite que o pacote encontre um caminho, mas não deveria significar que o acesso está autorizado. A autorização precisa vir de firewall, ACL, security group, identidade, política de aplicação e monitoramento. Confundir alcance de rede com permissão de negócio é uma das causas de movimento lateral e exposição indevida.</p>\n  <p>Boas evidências defensivas incluem diff de route table, dono da rota, justificativa, janela de mudança, fluxo permitido, logs de deny/allow, teste de caminho, teste de retorno e plano de remoção. Em cloud, mudanças em route tables também devem gerar alerta ou pelo menos aparecer em trilhas de auditoria.</p>\n</div>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 920 420\" role=\"img\" aria-labelledby=\"m11l04-title m11l04-desc\"><title id=\"m11l04-title\">Rotas estáticas e rotas flutuantes</title><desc id=\"m11l04-desc\">Diagrama mostrando uma matriz com rota principal para filial por MPLS e rota flutuante por VPN/Internet.</desc><defs><marker id=\"m11l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs><rect x=\"40\" y=\"70\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--client\"></rect><text x=\"135\" y=\"110\" text-anchor=\"middle\" class=\"svg-label\">Matriz</text><text x=\"135\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.10.0.0/16</text><rect x=\"365\" y=\"70\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--router\"></rect><text x=\"460\" y=\"110\" text-anchor=\"middle\" class=\"svg-label\">Roteador/Firewall</text><text x=\"460\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rotas estáticas</text><rect x=\"690\" y=\"70\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--server\"></rect><text x=\"785\" y=\"110\" text-anchor=\"middle\" class=\"svg-label\">Filial</text><text x=\"785\" y=\"138\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.20.0.0/16</text><rect x=\"365\" y=\"260\" width=\"190\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect><text x=\"460\" y=\"294\" text-anchor=\"middle\" class=\"svg-label\">VPN Backup</text><text x=\"460\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota flutuante</text><line x1=\"230\" y1=\"125\" x2=\"365\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l04-arrow)\"></line><line x1=\"555\" y1=\"125\" x2=\"690\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m11l04-arrow)\"></line><text x=\"622\" y=\"100\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">principal: AD menor</text><path d=\"M555 165 C640 230 640 300 555 302\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m11l04-arrow)\"></path><path d=\"M365 302 C275 300 275 165 365 165\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m11l04-arrow)\"></path><text x=\"610\" y=\"250\" class=\"svg-label svg-label--small\">backup: AD maior</text><rect x=\"300\" y=\"20\" width=\"320\" height=\"34\" rx=\"10\" class=\"svg-badge\"></rect><text x=\"460\" y=\"43\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10.20.0.0/16 via MPLS; backup via VPN</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>Este laboratório foi reforçado para ser uma mudança de roteamento completa: topologia, rota principal, rota flutuante, rota de retorno, falha controlada, restauração e evidências. O foco não é apenas digitar <code>ip route</code>, mas provar qual caminho está ativo e por que.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios praticam leitura de rotas, escolha de next hop, identificação de rota de retorno e avaliação de riscos de rotas estáticas em ambientes reais.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>Você receberá uma matriz com dois caminhos para a filial e deverá propor rotas estáticas e flutuantes, validação e controles de segurança.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como calcular a rota principal, definir uma rota flutuante com prioridade menor, validar failover e confirmar rota de retorno.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>Rotas estáticas são entradas manuais que dizem para onde enviar tráfego destinado a um prefixo. Elas são úteis, previsíveis e muito presentes em redes pequenas, firewalls, VPNs, cloud e ambientes híbridos. Rotas flutuantes adicionam contingência simples ao manter uma rota de backup com prioridade pior.</p><p>O cuidado central é governança: toda rota precisa de dono, justificativa, destino, next hop, impacto de segurança, caminho de retorno, validação e plano de remoção.</p></section>\n\n<div class='content-card' data-enhancement='p0-04e-11-4-summary-runbook'>\n  <h4>Runbook mental para rotas estáticas</h4>\n  <ol>\n    <li>Defina o prefixo exato, evitando escopo maior que o necessário.</li>\n    <li>Confirme o next hop e a interface de saída.</li>\n    <li>Valide a rota de retorno.</li>\n    <li>Compare rota específica, rota default, distância administrativa e rota flutuante.</li>\n    <li>Teste caminho normal, falha controlada, failover e restauração.</li>\n    <li>Registre evidências, riscos, rollback e dono da rota.</li>\n  </ol>\n</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você estudará <strong>roteamento inter-VLAN</strong>, conectando VLANs, gateways, switches camada 3, roteadores-on-a-stick e políticas de firewall.</p></section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula explica como inserir caminhos manualmente na tabela de rotas e prepara o aluno para inter-VLAN, redundância e protocolos dinâmicos.",
    "previousConcepts": [
      "IPv4",
      "subnetting",
      "gateway",
      "rota default",
      "tabela de rotas",
      "longest prefix match",
      "next hop"
    ],
    "nextConcepts": [
      "roteamento inter-VLAN",
      "métrica",
      "distância administrativa",
      "rotas dinâmicas",
      "OSPF",
      "BGP"
    ]
  },
  "protocolFields": [
    {
      "name": "Prefixo de destino",
      "description": "Rede ou host que a rota pretende alcançar, por exemplo 10.20.0.0/16."
    },
    {
      "name": "Máscara/CIDR",
      "description": "Define o tamanho do prefixo de destino e participa do longest prefix match."
    },
    {
      "name": "Next hop",
      "description": "Próximo roteador para onde o pacote deve ser enviado."
    },
    {
      "name": "Interface de saída",
      "description": "Interface usada para encaminhar o pacote quando aplicável."
    },
    {
      "name": "Distância administrativa",
      "description": "Critério de preferência entre fontes de rota em plataformas como Cisco IOS."
    },
    {
      "name": "Métrica",
      "description": "Custo usado para comparar rotas dentro da mesma origem ou protocolo."
    },
    {
      "name": "Status da rota",
      "description": "Indica se a rota está ativa, instalada, conectada, estática, dinâmica ou apenas configurada."
    }
  ],
  "packetFlow": [
    "O dispositivo recebe um pacote para uma rede remota.",
    "Consulta a tabela de rotas e aplica longest prefix match.",
    "A rota estática mais específica aplicável é selecionada, se estiver ativa.",
    "O next hop é validado como alcançável pela rede local ou por outra rota recursiva.",
    "O dispositivo resolve o MAC do next hop via ARP quando necessário.",
    "O pacote é encaminhado pelo caminho principal.",
    "Se a rota principal desaparecer, a rota flutuante pode ser instalada como backup.",
    "O retorno precisa ter rota equivalente ou o fluxo falhará de forma assimétrica."
  ],
  "deepDive": {
    "title": "Rota estática, rota recursiva e rota flutuante",
    "content": "Uma rota estática pode apontar diretamente para uma interface ou para um endereço de next hop. Quando aponta para next hop, o dispositivo pode precisar resolver recursivamente como chegar até esse next hop. A rota flutuante usa uma distância administrativa maior para ficar atrás da rota principal. Isso não substitui protocolo dinâmico em topologias complexas, mas funciona bem para contingência simples e previsível.",
    "operationalImpact": [
      "Rotas estáticas são previsíveis, mas criam dependência de documentação, revisão periódica e controle de mudanças.",
      "Ambientes com muitos caminhos manuais ficam difíceis de diagnosticar quando não há baseline de route tables.",
      "Rotas flutuantes exigem teste real de failover, failback e rota de retorno antes de produção.",
      "Mudanças manuais em console ou CLI podem gerar drift em relação ao IaC e confundir times de operação."
    ],
    "financialImpact": [
      "Em cloud, uma rota para NAT Gateway, firewall gerenciado, Transit Gateway ou tráfego entre zonas pode gerar custo recorrente.",
      "Rotas erradas podem desviar tráfego por caminho mais caro, aumentando cobrança de egress, inspeção ou interconexão.",
      "Links de backup, VPNs e appliances de redundância têm custo mesmo quando usados raramente.",
      "Incidentes causados por rotas legadas podem gerar custo de indisponibilidade e horas de troubleshooting."
    ],
    "securityImpact": [
      "Rota estática amplia alcance de rede, mas não substitui autorização, segmentação ou política de firewall.",
      "Rotas antigas podem manter acesso a parceiros, ambientes legados ou subnets que deveriam ter sido isoladas.",
      "Rotas específicas demais ou default routes amplas podem criar bypass de inspeção e exfiltração por caminho alternativo.",
      "Route tables devem ser monitoradas como superfície crítica de segurança, especialmente em cloud e ambientes híbridos."
    ]
  },
  "commonMistakes": [
    "Configurar rota de ida e esquecer rota de retorno.",
    "Usar rota default quando uma rota específica seria mais segura.",
    "Criar rota estática sem documentar dono, motivo e validade.",
    "Apontar next hop para endereço inalcançável.",
    "Confundir rota flutuante com balanceamento de carga.",
    "Achar que rota estática ignora firewall, ACL ou security group."
  ],
  "troubleshooting": {
    "symptoms": [
      "Ping para gateway funciona, mas rede remota não responde.",
      "Traceroute para no roteador local ou no firewall.",
      "Rota existe na configuração, mas não aparece na tabela efetiva.",
      "Failover não ocorre quando link principal falha.",
      "Comunicação funciona em um sentido e falha no retorno."
    ],
    "checks": [
      "Verificar tabela de rotas com route print, ip route ou show ip route.",
      "Confirmar se o prefixo de destino é o esperado e não há rota mais específica indevida.",
      "Validar se o next hop é alcançável por ARP ou por rota recursiva.",
      "Testar rota de retorno no destino ou no gateway remoto.",
      "Verificar firewall, ACL, security group, NACL e logs de deny.",
      "Simular falha controlada em laboratório antes de confiar em rota flutuante."
    ],
    "tools": [
      "route print",
      "Get-NetRoute",
      "ip route",
      "ip route get",
      "show ip route",
      "show running-config | include ip route",
      "tracert",
      "traceroute",
      "mtr",
      "ping",
      "tcpdump",
      "Wireshark"
    ],
    "diagnosticQuestions": [
      "Qual prefixo exato precisa ser alcançado e qual rota está vencendo para esse destino?",
      "O next hop da rota estática é diretamente alcançável ou depende de rota recursiva?",
      "Existe rota de retorno equivalente no destino ou no gateway remoto?",
      "O caminho principal e o caminho de backup passam pelos mesmos controles de segurança?",
      "Há logs de alteração, flow logs ou evidências de que a rota mudou recentemente?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "route print",
        "purpose": "Ver a tabela de rotas do host Windows.",
        "expectedObservation": "Lista de rotas IPv4, rota default, interfaces e métricas.",
        "interpretation": "Confirma se o host sabe enviar tráfego para o prefixo remoto ou se cairá na default."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Get-NetRoute -AddressFamily IPv4 | Sort-Object DestinationPrefix",
        "purpose": "Listar rotas IPv4 com prefixo, next hop, interface e métrica.",
        "expectedObservation": "Rotas aparecem de forma filtrável e exportável.",
        "interpretation": "Útil para documentar evidência em estações e servidores Windows."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Test-NetConnection 10.20.20.10 -TraceRoute",
        "purpose": "Testar caminho até destino e coletar saltos.",
        "expectedObservation": "Mostra se o destino responde e por quais saltos a tentativa passa.",
        "interpretation": "Se o trace para no gateway ou firewall, a hipótese muda para rota/política no próximo salto."
      },
      {
        "platform": "Linux",
        "command": "ip route",
        "purpose": "Ver tabela de rotas Linux.",
        "expectedObservation": "Rotas conectadas, default e estáticas aparecem com dev e via.",
        "interpretation": "Permite identificar se existe rota específica ou apenas default."
      },
      {
        "platform": "Linux",
        "command": "ip route get 10.20.20.10",
        "purpose": "Perguntar ao kernel qual rota será usada para um destino específico.",
        "expectedObservation": "Saída mostra via, dev e source IP selecionado.",
        "interpretation": "É mais preciso que olhar a tabela inteira quando há rotas sobrepostas."
      },
      {
        "platform": "Linux",
        "command": "traceroute 10.20.20.10 || tracepath 10.20.20.10",
        "purpose": "Coletar caminho real até o destino.",
        "expectedObservation": "Saltos mostram onde o tráfego para ou muda de caminho.",
        "interpretation": "Ajuda a separar rota local, rota intermediária, firewall e retorno."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route 10.20.20.0",
        "purpose": "Ver qual rota está instalada para o prefixo.",
        "expectedObservation": "Rota estática, conectada, dinâmica ou ausente aparece com next hop.",
        "interpretation": "Confirma se a rota configurada foi instalada e qual caminho venceu."
      },
      {
        "platform": "Cisco IOS",
        "command": "show running-config | include ^ip route",
        "purpose": "Listar rotas estáticas configuradas.",
        "expectedObservation": "Linhas ip route aparecem com prefixo, máscara, next hop e AD quando houver.",
        "interpretation": "Diferencia rota configurada de rota instalada na tabela efetiva."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip cef 10.20.20.10",
        "purpose": "Ver encaminhamento efetivo quando CEF estiver disponível.",
        "expectedObservation": "Mostra adjacência e next hop usados para o destino.",
        "interpretation": "Ajuda quando a tabela parece correta, mas o encaminhamento real precisa ser confirmado."
      },
      {
        "platform": "Cloud/IaC",
        "command": "terraform plan && terraform show -json plan.out | jq '.. | objects | select(has(\"route_table_id\") or has(\"destination_cidr_block\"))'",
        "purpose": "Revisar mudanças de route table antes de aplicar.",
        "expectedObservation": "Plano mostra destino, target e recursos afetados.",
        "interpretation": "Evita mudança cega de caminho em cloud e permite revisão por pull request."
      }
    ],
    "decisionTree": [
      {
        "if": "A rota não aparece na tabela efetiva",
        "then": "Validar se o next hop é alcançável, se a interface está up/up e se existe rota recursiva para o next hop."
      },
      {
        "if": "A rota aparece, mas o destino não responde",
        "then": "Testar traceroute, rota de retorno e políticas de firewall/ACL/security group no caminho."
      },
      {
        "if": "A rota flutuante aparece antes da falha",
        "then": "Revisar distância administrativa, métrica, prefixo e presença da rota principal."
      },
      {
        "if": "O failover funciona, mas a aplicação falha",
        "then": "Investigar MTU/MSS, NAT, DNS, firewall, proxy e dependências da aplicação no caminho de backup."
      },
      {
        "if": "O tráfego segue por caminho inseguro",
        "then": "Remover rota de bypass, forçar inspeção por firewall e registrar mudança com owner e rollback."
      }
    ]
  },
  "security": {
    "badPractices": [
      "Criar 0.0.0.0/0 para resolver rapidamente qualquer problema.",
      "Apontar tráfego sensível para gateway sem inspeção.",
      "Manter rota para parceiro antigo sem revisão.",
      "Usar rota flutuante sem testar failover e failback.",
      "Fazer alteração manual fora do controle de mudança."
    ],
    "vulnerabilities": [
      {
        "name": "bypass de inspeção",
        "description": "Risco relacionado à aula 11.4 — Rotas estáticas e rotas flutuantes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "governança de rotas"
      },
      {
        "name": "exfiltração por caminho alternativo",
        "description": "Risco relacionado à aula 11.4 — Rotas estáticas e rotas flutuantes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "menor privilégio em prefixos"
      },
      {
        "name": "persistência de acesso legado",
        "description": "Risco relacionado à aula 11.4 — Rotas estáticas e rotas flutuantes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "firewall central"
      },
      {
        "name": "tráfego assimétrico invisível",
        "description": "Risco relacionado à aula 11.4 — Rotas estáticas e rotas flutuantes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "logs de mudança"
      },
      {
        "name": "exposição de subnets privadas",
        "description": "Risco relacionado à aula 11.4 — Rotas estáticas e rotas flutuantes.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "validação de IaC"
      }
    ],
    "mitigations": [
      "governança de rotas",
      "menor privilégio em prefixos",
      "firewall central",
      "logs de mudança",
      "validação de IaC",
      "monitoramento de route tables",
      "revisão periódica"
    ],
    "goodPractices": [
      "Preferir rotas específicas ao menor escopo necessário.",
      "Documentar dono, justificativa, data e revisão de cada rota estática.",
      "Validar rota de retorno e controles de firewall antes de liberar produção.",
      "Revisar route tables por pull request em ambientes IaC.",
      "Monitorar mudanças de rotas em firewalls, roteadores e cloud.",
      "Remover rotas legadas após migrações, encerramento de VPNs ou fim de contratos."
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
      "governança de rotas",
      "menor privilégio em prefixos",
      "firewall central",
      "logs de mudança",
      "validação de IaC",
      "monitoramento de route tables",
      "revisão periódica"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "labType": "packet-tracer",
    "title": "Packet Tracer/GNS3: rota estática principal, rota flutuante e falha controlada",
    "objective": "Configurar uma matriz, uma filial e dois caminhos de conectividade para entender rota estática, rota flutuante, rota de retorno, failover e coleta de evidências.",
    "scenario": "A empresa possui uma matriz 10.10.10.0/24 e uma filial 10.20.20.0/24. O caminho principal passa por um roteador WAN/MPLS. O caminho de backup passa por um roteador VPN/Internet. O aluno deve configurar a rota principal com prioridade normal, uma rota flutuante com distância administrativa maior, validar o caminho de ida e volta e simular falha do link principal.",
    "topology": "PC-Matriz -> SW-Matriz -> R1-Matriz -> R2-WAN -> R3-Filial -> SW-Filial -> PC-Filial; caminho alternativo R1-Matriz -> R4-Backup -> R3-Filial.",
    "architecture": "Dois domínios LAN ligados por roteadores. R1 e R3 possuem rotas estáticas para as redes remotas. As rotas principais usam o caminho WAN; rotas flutuantes usam o caminho de backup com distância administrativa maior. O laboratório força o aluno a validar rota de ida, rota de retorno e estado da tabela efetiva.",
    "prerequisites": [
      "Concluir as aulas 11.1, 11.2 e 11.3.",
      "Saber identificar prefixo, máscara, gateway, next hop e rota default.",
      "Ter Cisco Packet Tracer ou GNS3/EVE-NG com imagem IOS equivalente."
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "CLI Cisco IOS",
      "PCs virtuais do simulador",
      "Opcional: tabela de evidências em texto"
    ],
    "estimatedTimeMinutes": 110,
    "cost": "zero em Packet Tracer; baixo/local em GNS3 se usar imagens licenciadas próprias",
    "safetyNotes": [
      "Execute apenas em laboratório isolado.",
      "Não aplique rotas estáticas em rede corporativa real sem janela de mudança, revisão, rollback e autorização.",
      "Use endereços privados de laboratório e não anuncie prefixos reais."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Montar a topologia",
        "instruction": "Crie três LANs lógicas: matriz, filial e enlaces ponto a ponto entre roteadores. Use nomes claros nos dispositivos para facilitar troubleshooting.",
        "command": "Dispositivos sugeridos: R1-MATRIZ, R2-WAN, R3-FILIAL, R4-BACKUP, PC-MATRIZ, PC-FILIAL",
        "expectedOutput": "Topologia com dois caminhos possíveis entre matriz e filial.",
        "explanation": "Antes de configurar rotas, a topologia precisa deixar visível qual caminho é principal e qual é backup."
      },
      {
        "number": 2,
        "title": "Configurar endereços dos roteadores",
        "instruction": "Configure IPs nas interfaces LAN e nos enlaces ponto a ponto. Ative as interfaces.",
        "command": "interface g0/0\n ip address 10.10.10.1 255.255.255.0\n no shutdown\n!\ninterface g0/1\n ip address 172.16.12.1 255.255.255.252\n no shutdown",
        "expectedOutput": "Interfaces em estado up/up no comando show ip interface brief.",
        "explanation": "Rota estática depende de next hop alcançável. Se o enlace local estiver down, a rota pode não funcionar mesmo se a sintaxe estiver correta."
      },
      {
        "number": 3,
        "title": "Configurar IPs dos PCs",
        "instruction": "Configure PC-Matriz como 10.10.10.10/24 gateway 10.10.10.1 e PC-Filial como 10.20.20.10/24 gateway 10.20.20.1.",
        "command": "PC-Matriz: IP 10.10.10.10 máscara 255.255.255.0 gateway 10.10.10.1\nPC-Filial: IP 10.20.20.10 máscara 255.255.255.0 gateway 10.20.20.1",
        "expectedOutput": "Cada PC pinga seu gateway local.",
        "explanation": "Antes de diagnosticar roteamento entre redes, valide a conectividade local."
      },
      {
        "number": 4,
        "title": "Criar rota estática principal em R1",
        "instruction": "Em R1, crie rota para a rede da filial via R2-WAN.",
        "command": "ip route 10.20.20.0 255.255.255.0 172.16.12.2",
        "expectedOutput": "show ip route exibe rota estática para 10.20.20.0/24 via 172.16.12.2.",
        "explanation": "Essa é a rota de ida principal da matriz para a filial."
      },
      {
        "number": 5,
        "title": "Criar rota estática principal de retorno em R3",
        "instruction": "Em R3, crie rota para a rede da matriz via R2-WAN.",
        "command": "ip route 10.10.10.0 255.255.255.0 172.16.23.1",
        "expectedOutput": "show ip route exibe rota estática para 10.10.10.0/24.",
        "explanation": "Sem rota de retorno, o ping pode sair da matriz e nunca voltar."
      },
      {
        "number": 6,
        "title": "Criar rotas flutuantes de backup",
        "instruction": "Adicione rotas alternativas com distância administrativa maior usando o caminho R4-BACKUP.",
        "command": "R1(config)# ip route 10.20.20.0 255.255.255.0 172.16.14.2 200\nR3(config)# ip route 10.10.10.0 255.255.255.0 172.16.34.1 200",
        "expectedOutput": "As rotas flutuantes ficam configuradas, mas não devem vencer enquanto a rota principal estiver ativa.",
        "explanation": "A distância administrativa maior faz a rota de backup perder para a rota principal em condição normal."
      },
      {
        "number": 7,
        "title": "Validar tabela efetiva",
        "instruction": "Confira qual rota está instalada e qual next hop está sendo usado.",
        "command": "show ip route 10.20.20.0\nshow running-config | include ^ip route",
        "expectedOutput": "Tabela efetiva usa o caminho principal; configuração mostra também a rota flutuante.",
        "explanation": "Há diferença entre rota configurada e rota efetivamente usada."
      },
      {
        "number": 8,
        "title": "Validar caminho com ping e traceroute",
        "instruction": "Faça ping entre PCs e rode traceroute para ver os saltos.",
        "command": "PC-Matriz> ping 10.20.20.10\nPC-Matriz> tracert 10.20.20.10",
        "expectedOutput": "Ping responde e traceroute passa pelo caminho R1 -> R2 -> R3.",
        "explanation": "O traceroute confirma o caminho real, não apenas a existência da rota."
      },
      {
        "number": 9,
        "title": "Simular falha do link principal",
        "instruction": "Desative a interface do caminho principal e observe a tabela.",
        "command": "R1(config)# interface g0/1\nR1(config-if)# shutdown\nR1# show ip route 10.20.20.0",
        "expectedOutput": "A rota via backup aparece como caminho efetivo.",
        "explanation": "Esse é o comportamento esperado da rota flutuante."
      },
      {
        "number": 10,
        "title": "Validar failover",
        "instruction": "Repita ping e traceroute após a falha.",
        "command": "PC-Matriz> ping 10.20.20.10\nPC-Matriz> tracert 10.20.20.10",
        "expectedOutput": "Conectividade retorna pelo caminho R1 -> R4 -> R3, possivelmente após breve interrupção.",
        "explanation": "Failover precisa ser comprovado com evidência, não presumido pela configuração."
      },
      {
        "number": 11,
        "title": "Restaurar caminho principal",
        "instruction": "Reative a interface principal e verifique se a rota principal volta a vencer.",
        "command": "R1(config)# interface g0/1\nR1(config-if)# no shutdown\nR1# show ip route 10.20.20.0",
        "expectedOutput": "A rota principal volta à tabela efetiva.",
        "explanation": "A rota de menor distância administrativa volta a ser preferida quando disponível."
      },
      {
        "number": 12,
        "title": "Documentar evidências e rollback",
        "instruction": "Registre comandos, outputs relevantes, topologia, rotas e critério de retorno.",
        "command": "show ip interface brief\nshow ip route\nshow running-config | include ^ip route\ntraceroute 10.20.20.10",
        "expectedOutput": "Pacote de evidências suficiente para uma mudança controlada.",
        "explanation": "Em ambiente corporativo, a configuração sem evidência e rollback é uma mudança incompleta."
      }
    ],
    "expectedResult": "O aluno deve demonstrar conectividade matriz-filial pelo caminho principal, provar a existência de rota de retorno, simular falha do caminho principal, validar uso da rota flutuante e registrar evidências de failover e recuperação.",
    "validation": [
      {
        "check": "Interfaces estão ativas",
        "command": "show ip interface brief",
        "expected": "Interfaces dos enlaces em up/up.",
        "ifFails": "Corrigir cabo, módulo, interface, endereço IP ou comando no shutdown."
      },
      {
        "check": "Rota principal instalada em R1",
        "command": "show ip route 10.20.20.0",
        "expected": "Rota estática via R2-WAN em condição normal.",
        "ifFails": "Verificar prefixo, máscara, next hop e alcançabilidade do next hop."
      },
      {
        "check": "Rota de retorno instalada em R3",
        "command": "show ip route 10.10.10.0",
        "expected": "Rota estática para a matriz.",
        "ifFails": "Configurar rota de retorno; não diagnosticar apenas o lado de ida."
      },
      {
        "check": "Traceroute usa caminho principal",
        "command": "traceroute 10.20.20.10",
        "expected": "Saltos passam pelo roteador WAN.",
        "ifFails": "Há rota mais específica, default indevida ou caminho alternativo vencendo."
      },
      {
        "check": "Backup assume após falha",
        "command": "shutdown no enlace principal; show ip route 10.20.20.0",
        "expected": "Rota flutuante aparece como efetiva.",
        "ifFails": "Verificar distância administrativa, next hop do backup e rota de retorno do backup."
      },
      {
        "check": "Conectividade durante backup",
        "command": "ping 10.20.20.10 source 10.10.10.1",
        "expected": "Respostas via caminho alternativo.",
        "ifFails": "Testar roteamento em cada salto e possíveis ACLs."
      },
      {
        "check": "Restauração do principal",
        "command": "no shutdown; show ip route 10.20.20.0",
        "expected": "Rota principal volta a vencer.",
        "ifFails": "Verificar estado físico, ARP, rota recursiva ou interface errada."
      },
      {
        "check": "Evidências completas",
        "command": "Comparar outputs antes, durante e depois da falha.",
        "expected": "Relatório mostra mudança de next hop e retorno ao normal.",
        "ifFails": "Repetir coleta com horário, comando e interpretação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Rota configurada não aparece na tabela",
        "probableCause": "Next hop inalcançável ou interface de saída down.",
        "howToConfirm": "show ip route do next hop e show ip interface brief.",
        "fix": "Corrigir endereço do enlace, ativar interface ou ajustar next hop."
      },
      {
        "symptom": "Ping vai, mas não volta",
        "probableCause": "Rota de retorno ausente na filial ou no caminho de backup.",
        "howToConfirm": "Traceroute reverso e show ip route no destino.",
        "fix": "Criar rota de retorno equivalente e validar políticas."
      },
      {
        "symptom": "Backup nunca assume",
        "probableCause": "Rota principal ainda aparece ativa ou backup com next hop errado.",
        "howToConfirm": "show ip route e shutdown controlado do enlace principal.",
        "fix": "Ajustar distância administrativa e next hop do backup."
      },
      {
        "symptom": "Backup assume, mas aplicação falha",
        "probableCause": "Firewall, NAT, MTU ou ACL diferente no caminho alternativo.",
        "howToConfirm": "Testar ICMP, TCP específico e logs de firewall.",
        "fix": "Ajustar política, MSS/MTU ou NAT conforme desenho aprovado."
      },
      {
        "symptom": "Caminho muda de forma inesperada",
        "probableCause": "Rota mais específica vencendo ou default indevida.",
        "howToConfirm": "show ip route destino-exato e revisar longest prefix match.",
        "fix": "Corrigir prefixos e remover rotas conflitantes."
      },
      {
        "symptom": "Traceroute para em um roteador intermediário",
        "probableCause": "Rota de próximo salto ausente no roteador intermediário.",
        "howToConfirm": "show ip route no salto onde parou.",
        "fix": "Adicionar rota ou protocolo dinâmico conforme a arquitetura."
      },
      {
        "symptom": "Rota estática cria bypass de firewall",
        "probableCause": "Next hop alternativo fora do ponto de inspeção aprovado.",
        "howToConfirm": "Comparar diagrama de segurança com tabela de rotas real.",
        "fix": "Remover rota, forçar caminho por firewall e registrar mudança."
      },
      {
        "symptom": "Após rollback, o tráfego ainda segue pelo backup",
        "probableCause": "Interface principal não voltou up/up ou rota principal perdeu preferência.",
        "howToConfirm": "show ip interface brief e show ip route destino.",
        "fix": "Restaurar enlace e distância administrativa esperada."
      }
    ],
    "improvements": [
      "Adicionar IP SLA/Object Tracking para remover rota principal quando apenas o destino remoto falhar.",
      "Comparar rota flutuante com OSPF no próximo laboratório.",
      "Criar uma matriz de mudança com impacto, janela, validação e rollback.",
      "Adicionar logs de firewall para comparar caminho principal e backup."
    ],
    "evidenceToCollect": [
      "Topologia com nomes e prefixos.",
      "show ip interface brief em todos os roteadores.",
      "show ip route antes da falha.",
      "show running-config | include ^ip route.",
      "Traceroute pelo caminho principal.",
      "Traceroute pelo caminho de backup.",
      "Registro do momento da falha e da restauração.",
      "Explicação da rota de retorno."
    ],
    "questions": [
      "Por que a rota flutuante precisa ter distância administrativa maior?",
      "Por que a rota de retorno é tão importante quanto a rota de ida?",
      "Em que cenário uma rota estática é melhor que OSPF?",
      "Que risco de segurança surge se o backup passa fora do firewall?",
      "Como você provaria em uma mudança corporativa que o failover funcionou?"
    ],
    "challenge": "Adicione uma terceira rede de servidores 10.30.30.0/24 atrás da matriz. A filial deve acessar apenas essa rede pelo caminho principal; em caso de falha, deve usar o backup. Documente rotas, validação, riscos e rollback.",
    "solution": "A solução correta cria rotas específicas para 10.30.30.0/24 em R3 via caminho principal e uma rota flutuante via backup com distância administrativa maior. Também cria rota de retorno na matriz para 10.20.20.0/24, valida traceroute nos dois estados, confirma que o tráfego passa pelo ponto de inspeção previsto e documenta rollback removendo ou desativando as rotas adicionadas.",
    "id": "lab-11.4"
  },
  "mentorQuestions": [
    {
      "id": "mq11.4.1",
      "type": "reflexão",
      "question": "Qual é a diferença entre uma rota estática específica e a rota default?",
      "hints": [],
      "expectedIdeas": [],
      "explanation": "Qual é a diferença entre uma rota estática específica e a rota default?"
    },
    {
      "id": "mq11.4.2",
      "type": "reflexão",
      "question": "Por que uma rota flutuante não é a mesma coisa que balanceamento de carga?",
      "hints": [],
      "expectedIdeas": [],
      "explanation": "Por que uma rota flutuante não é a mesma coisa que balanceamento de carga?"
    },
    {
      "id": "mq11.4.3",
      "type": "reflexão",
      "question": "Quais evidências você coletaria antes de remover uma rota estática antiga?",
      "hints": [],
      "expectedIdeas": [],
      "explanation": "Quais evidências você coletaria antes de remover uma rota estática antiga?"
    }
  ],
  "quiz": [
    {
      "question": "O que é uma rota estática?",
      "options": [
        "Uma entrada manual de encaminhamento",
        "Um protocolo dinâmico",
        "Um endereço MAC",
        "Um tipo de DNS"
      ],
      "answer": 0,
      "explanation": "Rota estática é configurada manualmente para um destino e next hop/interface."
    },
    {
      "question": "Para que serve uma rota flutuante?",
      "options": [
        "Criptografar pacotes",
        "Funcionar como backup com prioridade pior",
        "Trocar MACs",
        "Resolver nomes"
      ],
      "answer": 1,
      "explanation": "Ela fica atrás da rota principal e assume quando a principal deixa de estar disponível."
    },
    {
      "question": "O que deve ser validado além da rota de ida?",
      "options": [
        "Apenas DNS",
        "Rota de retorno e política",
        "Somente cabo",
        "Somente nome do host"
      ],
      "answer": 1,
      "explanation": "Fluxos reais exigem ida, retorno e permissão nos controles de segurança."
    },
    {
      "question": "Qual risco uma rota estática antiga pode gerar?",
      "options": [
        "Aumentar a resolução da tela",
        "Manter acesso legado",
        "Apagar VLANs automaticamente",
        "Mudar Unicode"
      ],
      "answer": 1,
      "explanation": "Rotas antigas podem manter conectividade com redes ou parceiros que deveriam ter sido removidos."
    },
    {
      "question": "Em Cisco IOS, o que pode tornar uma rota estática flutuante?",
      "options": [
        "Distância administrativa maior",
        "Nome DNS menor",
        "TTL maior",
        "MAC multicast"
      ],
      "answer": 0,
      "explanation": "Uma distância administrativa maior faz a rota ser menos preferida."
    },
    {
      "question": "Qual comando ajuda a ver rotas no Linux?",
      "options": [
        "ip route",
        "arp -d *",
        "format",
        "nslookup -flush"
      ],
      "answer": 0,
      "explanation": "ip route mostra a tabela de rotas no Linux."
    }
  ],
  "flashcards": [
    {
      "front": "Rota estática",
      "back": "Entrada manual de rota para um prefixo via next hop ou interface."
    },
    {
      "front": "Rota flutuante",
      "back": "Rota de backup com prioridade pior que a principal."
    },
    {
      "front": "Next hop",
      "back": "Próximo roteador para onde o pacote é enviado."
    },
    {
      "front": "Rota de retorno",
      "back": "Caminho que a resposta usa para voltar à origem."
    },
    {
      "front": "Distância administrativa",
      "back": "Preferência entre fontes de rota em plataformas como Cisco IOS."
    },
    {
      "front": "Rota legada",
      "back": "Rota antiga que permanece ativa após mudança e pode criar risco."
    }
  ],
  "exercises": [
    {
      "id": "ex11.4.1",
      "type": "conceitual",
      "explanation": "A resposta precisa conectar prefixo, next hop, rota de retorno, política e evidência de validação.",
      "title": "Identifique a rota",
      "prompt": "Para alcançar 10.20.0.0/16 via 192.168.1.254, descreva destino, máscara e next hop.",
      "expectedAnswer": "Destino 10.20.0.0/16; next hop 192.168.1.254."
    },
    {
      "id": "ex11.4.2",
      "type": "conceitual",
      "explanation": "A resposta precisa conectar prefixo, next hop, rota de retorno, política e evidência de validação.",
      "title": "Rota flutuante",
      "prompt": "Explique por que o backup deve ter prioridade pior que a rota principal.",
      "expectedAnswer": "Para não ser usado em operação normal e entrar apenas quando a principal sumir."
    },
    {
      "id": "ex11.4.3",
      "type": "diagnóstico",
      "explanation": "A resposta precisa conectar prefixo, next hop, rota de retorno, política e evidência de validação.",
      "title": "Retorno",
      "prompt": "Um ping vai da matriz para a filial, mas a resposta não chega. Cite duas hipóteses.",
      "expectedAnswer": "Falta rota de retorno ou política/ACL bloqueando retorno."
    },
    {
      "id": "ex11.4.4",
      "type": "diagnóstico",
      "explanation": "A resposta precisa conectar prefixo, next hop, rota de retorno, política e evidência de validação.",
      "title": "Segurança",
      "prompt": "Por que 0.0.0.0/0 não deve ser usado como correção genérica?",
      "expectedAnswer": "Porque amplia escopo, pode desviar inspeção e criar exposição desnecessária."
    },
    {
      "id": "ex11.4-p1-1",
      "type": "diagnóstico",
      "explanation": "Rota configurada não é necessariamente rota instalada.",
      "prompt": "Uma rota estática para 10.20.20.0/24 existe na configuração, mas não aparece em show ip route. Liste três hipóteses e os comandos de confirmação.",
      "expectedAnswer": "Next hop inalcançável, interface de saída down ou rota recursiva quebrada. Confirmar com show ip interface brief, show ip route next-hop e show running-config | include ip route."
    },
    {
      "id": "ex11.4-p1-2",
      "type": "arquitetura",
      "explanation": "Redundância não pode enfraquecer segurança.",
      "prompt": "Desenhe uma rota principal via MPLS e uma rota flutuante via VPN. Explique o risco se a VPN não passar pelo mesmo firewall.",
      "expectedAnswer": "O risco é bypass de inspeção e política diferente no failover. A solução exige matriz de tráfego, logs e validação do caminho alternativo."
    },
    {
      "id": "ex11.4-p0-04e-1",
      "type": "cálculo/roteamento",
      "prompt": "Você tem duas rotas: 10.20.0.0/16 via 192.168.1.1 e 10.20.30.0/24 via 192.168.2.1. Para o destino 10.20.30.50, qual caminho vence e por quê?",
      "expectedAnswer": "Vence 10.20.30.0/24 via 192.168.2.1, porque longest prefix match prefere o prefixo mais específico.",
      "explanation": "Distância administrativa e métrica importam depois que o prefixo aplicável é comparado; o /24 é mais específico que o /16."
    },
    {
      "id": "ex11.4-p0-04e-2",
      "type": "segurança",
      "prompt": "Uma rota estática envia tráfego de servidores para um gateway fora do firewall central. Que evidências você coletaria antes de aprovar ou remover essa rota?",
      "expectedAnswer": "Dono da rota, justificativa, fluxos afetados, tabela de rotas, traceroute, logs de firewall/flow logs, rota de retorno, impacto no negócio, alternativa segura e plano de rollback.",
      "explanation": "O problema não é apenas conectividade. É alcance, governança, inspeção e risco de bypass."
    }
  ],
  "challenge": {
    "title": "Plano de rota estática e backup para filial",
    "scenario": "A matriz usa 10.10.0.0/24, a filial usa 10.20.0.0/24. Há link principal 172.16.12.0/30 e link backup 172.16.21.0/30. Desenhe as rotas de ida e volta e proponha como validar failover.",
    "deliverables": [
      "Tabela de rotas por roteador",
      "Rota principal",
      "Rota flutuante",
      "Plano de validação",
      "Riscos e mitigação"
    ],
    "rubric": [
      "Calcula prefixos corretamente",
      "Define next hops coerentes",
      "Considera rota de retorno",
      "Inclui validação de failover",
      "Inclui controles de segurança"
    ],
    "gradingRubric": [
      {
        "criterion": "Correção técnica de rotas e caminhos",
        "points": 25,
        "description": "Prefixos, next hops, retorno, AD/métrica e caminhos efetivos estão corretos."
      },
      {
        "criterion": "Validação e evidências",
        "points": 25,
        "description": "A resposta inclui comandos, outputs esperados, testes positivos e testes negativos."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 20,
        "description": "O aluno identifica hipóteses, evidências, causa raiz e prevenção."
      },
      {
        "criterion": "Segurança e governança",
        "points": 20,
        "description": "A solução evita bypass, excesso de permissão, anúncios indevidos e falta de logs."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Entrega documentação, rollback e próximos passos de melhoria."
      }
    ],
    "tasks": [
      "Desenhar a topologia com matriz, filial, link principal e link backup.",
      "Definir rotas estáticas de ida e de retorno.",
      "Definir rotas flutuantes com distância administrativa maior.",
      "Criar plano de validação para caminho normal, falha, backup e restauração.",
      "Mapear riscos de segurança e controles necessários no caminho alternativo."
    ],
    "expectedDeliverables": [
      "Tabela de rotas por roteador",
      "Rota principal",
      "Rota flutuante",
      "Plano de validação",
      "Riscos e mitigação"
    ],
    "constraints": [
      "Não usar rota default ampla como solução genérica.",
      "Todo caminho de backup deve preservar inspeção ou controle equivalente.",
      "A solução precisa incluir rota de retorno.",
      "A evidência deve mascarar IPs públicos, nomes internos sensíveis e dados de cliente quando aplicável."
    ]
  },
  "commentedSolution": "Uma solução adequada define rota da matriz para 10.20.0.0/24 via next hop do link principal em R2 e rota da filial para 10.10.0.0/24 via next hop do link principal em R1. Em seguida, adiciona rotas para os mesmos prefixos via link backup com distância administrativa maior. A validação começa com show ip route, ping e traceroute. Depois, em laboratório, desativa-se o link principal e confirma-se que a rota backup aparece e o traceroute muda. A solução só é completa se validar retorno, logs e política de firewall/ACL.",
  "glossary": [
    {
      "term": "Rota estática",
      "definition": "Rota configurada manualmente."
    },
    {
      "term": "Rota flutuante",
      "definition": "Rota estática de backup com prioridade pior."
    },
    {
      "term": "Next hop",
      "definition": "Próximo dispositivo para encaminhamento do pacote."
    },
    {
      "term": "Distância administrativa",
      "definition": "Preferência entre fontes de rota."
    },
    {
      "term": "Rota de retorno",
      "definition": "Caminho usado pela resposta para voltar."
    },
    {
      "term": "Failover",
      "definition": "Mudança automática ou semiautomática para caminho alternativo após falha."
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 1812 — Requirements for IP Version 4 Routers",
      "organization": "IETF",
      "note": "Base conceitual para comportamento de roteadores IPv4."
    },
    {
      "type": "official-doc",
      "title": "Cisco IOS IP Routing: Static Routes",
      "organization": "Cisco",
      "note": "Referência operacional para sintaxe e conceitos de rotas estáticas e flutuantes."
    },
    {
      "type": "official-doc",
      "title": "ip-route — Linux manual page",
      "organization": "Linux man-pages project",
      "note": "Referência para leitura e manipulação de rotas no Linux."
    },
    {
      "type": "official-doc",
      "title": "AWS VPC Route Tables / Azure Route Tables / Google Cloud Routes",
      "organization": "Cloud providers",
      "note": "Referências para aplicação do conceito em route tables de cloud."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC",
      "reason": "Route tables e rotas estáticas devem ser versionadas e revisadas como código."
    },
    {
      "course": "Identity, Access Management e Segurança de Identidades",
      "module": "Acessos entre serviços",
      "reason": "Rotas definem alcance de rede, mas autenticação e autorização continuam necessárias."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções",
      "Concluir o laboratório",
      "Acertar pelo menos 70% do quiz",
      "Entregar o desafio com rota de ida, rota de volta e rota flutuante"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "11.5"
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
