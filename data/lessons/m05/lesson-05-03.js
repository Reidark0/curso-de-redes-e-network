export const lesson0503 = {
  "id": "5.3",
  "moduleId": "m05",
  "order": 3,
  "title": "Rede, broadcast, primeiro e último host",
  "subtitle": "Como encontrar os limites reais de uma sub-rede IPv4: endereço de rede, broadcast, primeiro host e último host utilizável.",
  "duration": "95-135 min",
  "estimatedStudyTimeMinutes": 135,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 230,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "cidr",
    "broadcast",
    "rede",
    "hosts",
    "gateway",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops",
    "ipam"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "reason": "A aula 5.1 explicou por que dividir uma rede em sub-redes resolve problemas de escala, broadcast, segurança e organização."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.2",
      "reason": "A aula 5.2 ensinou CIDR, máscara, bits de host e quantidade de endereços, base para calcular limites de sub-rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "Endereço de rede, hosts e broadcast foram apresentados no contexto de IPv4 antes do subnetting."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Gateway padrão precisa estar dentro da faixa de hosts utilizáveis da sub-rede."
    }
  ],
  "objectives": [
    "Explicar o que é endereço de rede em uma sub-rede IPv4.",
    "Explicar o que é endereço de broadcast e por que ele não deve ser atribuído a hosts em redes IPv4 tradicionais.",
    "Calcular primeiro e último host utilizável de uma sub-rede.",
    "Relacionar tamanho do bloco com os limites da sub-rede.",
    "Identificar erros de configuração causados por uso indevido de rede, broadcast ou gateway fora da faixa.",
    "Aplicar o raciocínio em cenários domésticos, corporativos, cloud, DevSecOps e segurança.",
    "Preparar o aluno para o método do bloco mágico da próxima aula."
  ],
  "learningOutcomes": [
    "Dado um CIDR simples, o aluno identifica rede, broadcast, primeiro host e último host.",
    "Dado um IP e máscara, o aluno decide se o IP é utilizável ou se representa limite da sub-rede.",
    "Dado um gateway, o aluno valida se ele está dentro da faixa correta de hosts.",
    "Dado um erro de conectividade, o aluno investiga se o problema está no endereçamento da sub-rede.",
    "Dado um cenário cloud ou corporativo, o aluno documenta a faixa de hosts e reservas com segurança."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Na aula anterior você aprendeu a calcular quantos endereços existem em uma sub-rede. Agora falta responder a pergunta que transforma teoria em operação: dentro desse bloco, qual é o endereço da rede, qual é o broadcast, qual é o primeiro host e qual é o último host utilizável?</p>\n<p>Essa pergunta aparece em tarefas reais: criar escopo DHCP, configurar gateway, montar VLAN, definir subnet em cloud, escrever regra de firewall, planejar VPN, documentar IPAM, diagnosticar APIPA, investigar conflito de IP e validar por que um servidor aparentemente correto não se comunica.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> saber que um <code>/26</code> tem 64 endereços é útil, mas insuficiente. Você precisa saber exatamente onde o bloco começa, onde termina, quais endereços podem receber hosts e quais endereços são reservados pelo próprio funcionamento do IPv4.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>O IPv4 foi desenhado em uma época em que redes locais precisavam de uma forma simples de representar grupos de hosts. O endereço de rede passou a representar o identificador do bloco, enquanto o broadcast permitiu enviar uma mensagem para todos os hosts daquele segmento lógico. Essa decisão facilitou protocolos e descoberta local, mas também criou regras importantes: nem o endereço de rede nem o broadcast devem ser usados como endereços comuns de hosts em redes IPv4 tradicionais.</p>\n<p>Com a evolução de redes classful para CIDR, o tamanho dos blocos deixou de ser fixo. Um administrador passou a poder criar redes <code>/24</code>, <code>/25</code>, <code>/26</code>, <code>/27</code>, <code>/28</code> e muitas outras. Isso aumentou a flexibilidade, mas também aumentou a necessidade de cálculo correto.</p>\n<p>Em ambientes modernos, cloud providers, appliances, firewalls, roteadores e sistemas operacionais podem reservar endereços adicionais por política interna. Ainda assim, o raciocínio clássico de rede, broadcast, primeiro host e último host continua sendo a base para entender documentação, troubleshooting e planejamento.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema desta aula é evitar que você trate uma sub-rede como uma lista solta de IPs. Uma sub-rede tem limites. Se esses limites forem ignorados, aparecem falhas difíceis de interpretar.</p>\n<table class=\"data-table\"><thead><tr><th>Erro</th><th>Exemplo</th><th>Impacto provável</th></tr></thead><tbody>\n<tr><td>Usar endereço de rede como host</td><td><code>192.168.10.0/24</code> em uma estação</td><td>Falha de comunicação, rejeição pelo SO ou comportamento inconsistente</td></tr>\n<tr><td>Usar broadcast como host</td><td><code>192.168.10.255/24</code> em um servidor</td><td>Conflito lógico com broadcast dirigido da sub-rede</td></tr>\n<tr><td>Gateway fora da faixa</td><td>Host <code>192.168.10.50/26</code> com gateway <code>192.168.10.254</code></td><td>Host não consegue alcançar redes remotas corretamente</td></tr>\n<tr><td>DHCP com pool inválido</td><td>Pool incluindo rede, broadcast ou gateway</td><td>Clientes recebem IPs problemáticos ou geram conflitos</td></tr>\n<tr><td>Firewall com CIDR errado</td><td>Regra liberando bloco maior do que o necessário</td><td>Exposição indevida e superfície de ataque maior</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema real:</strong> quando alguém configura uma subnet sem calcular limites, pode criar falhas de gateway, broadcast, DHCP, NAT, VPN, roteamento, logs e segurança.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A forma mais segura de evoluir no cálculo é seguir uma sequência fixa. Primeiro você encontra o tamanho do bloco. Depois encontra onde o bloco começa. Em seguida encontra onde termina. Por fim separa os endereços reservados e utilizáveis.</p>\n<ol class=\"flow-list\"><li><strong>Identifique o prefixo:</strong> por exemplo, <code>/26</code>.</li><li><strong>Calcule bits de host:</strong> <code>32 - 26 = 6</code>.</li><li><strong>Calcule tamanho do bloco:</strong> <code>2^6 = 64</code> endereços.</li><li><strong>Encontre o início do bloco:</strong> o endereço de rede é o primeiro endereço do intervalo.</li><li><strong>Encontre o fim do bloco:</strong> o broadcast é o último endereço do intervalo.</li><li><strong>Calcule hosts utilizáveis:</strong> primeiro host é rede + 1; último host é broadcast - 1.</li></ol>\n<p>Na próxima aula você aprenderá o método do bloco mágico para encontrar esses blocos rapidamente. Nesta aula, a prioridade é entender o significado de cada limite.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>Uma sub-rede IPv4 tradicional possui quatro informações essenciais: endereço de rede, primeiro host, último host e broadcast.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> o <strong>endereço de rede</strong> identifica o bloco; o <strong>broadcast</strong> representa o envio para todos os hosts daquele bloco; o <strong>primeiro host</strong> é normalmente o endereço imediatamente após a rede; o <strong>último host</strong> é normalmente o endereço imediatamente antes do broadcast.</div>\n<table class=\"comparison-table\"><thead><tr><th>Elemento</th><th>Função</th><th>Exemplo em <code>192.168.10.0/24</code></th></tr></thead><tbody>\n<tr><td>Rede</td><td>Identifica a sub-rede</td><td><code>192.168.10.0</code></td></tr>\n<tr><td>Primeiro host</td><td>Primeiro endereço normalmente atribuível</td><td><code>192.168.10.1</code></td></tr>\n<tr><td>Último host</td><td>Último endereço normalmente atribuível</td><td><code>192.168.10.254</code></td></tr>\n<tr><td>Broadcast</td><td>Último endereço do bloco</td><td><code>192.168.10.255</code></td></tr>\n</tbody></table>\n<p>O gateway geralmente usa um endereço dentro da faixa de hosts, muitas vezes o primeiro ou o último host por convenção operacional. Essa convenção não é obrigatória pelo IPv4, mas precisa ser consistente, documentada e conhecida pela equipe.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Internamente, o endereço de rede é obtido aplicando a máscara ao endereço IPv4. Em termos conceituais, os bits de host são zerados. Já o broadcast é o endereço em que os bits de rede permanecem iguais e os bits de host ficam todos em 1.</p>\n<p>Exemplo: <code>192.168.10.0/26</code>. Um <code>/26</code> tem 6 bits de host, portanto cada bloco tem 64 endereços. Dentro de um octeto de 0 a 255, os blocos avançam de 64 em 64: <code>0-63</code>, <code>64-127</code>, <code>128-191</code> e <code>192-255</code>.</p>\n<table class=\"data-table\"><thead><tr><th>Sub-rede</th><th>Rede</th><th>Primeiro host</th><th>Último host</th><th>Broadcast</th></tr></thead><tbody>\n<tr><td>Bloco 1</td><td><code>192.168.10.0/26</code></td><td><code>192.168.10.1</code></td><td><code>192.168.10.62</code></td><td><code>192.168.10.63</code></td></tr>\n<tr><td>Bloco 2</td><td><code>192.168.10.64/26</code></td><td><code>192.168.10.65</code></td><td><code>192.168.10.126</code></td><td><code>192.168.10.127</code></td></tr>\n<tr><td>Bloco 3</td><td><code>192.168.10.128/26</code></td><td><code>192.168.10.129</code></td><td><code>192.168.10.190</code></td><td><code>192.168.10.191</code></td></tr>\n<tr><td>Bloco 4</td><td><code>192.168.10.192/26</code></td><td><code>192.168.10.193</code></td><td><code>192.168.10.254</code></td><td><code>192.168.10.255</code></td></tr>\n</tbody></table>\n<div class=\"callout\"><strong>Raciocínio essencial:</strong> o primeiro endereço do bloco identifica a rede. O último endereço do bloco é o broadcast. Tudo entre eles é potencialmente utilizável, salvo reservas operacionais, gateway, DHCP, cloud provider ou política local.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em arquitetura de redes, calcular limites não é apenas matemática. É desenho de fronteiras. Cada sub-rede costuma estar associada a uma VLAN, um gateway, um escopo DHCP, regras de firewall, rotas, NAT, logs, monitoramento, inventário e política de acesso.</p>\n<table class=\"comparison-table\"><thead><tr><th>Decisão</th><th>Pergunta arquitetural</th><th>Impacto</th></tr></thead><tbody>\n<tr><td>Endereço de rede</td><td>Qual bloco representa esse segmento?</td><td>Define documentação, rota, firewall e IPAM</td></tr>\n<tr><td>Gateway</td><td>Qual IP dentro da faixa será usado como saída?</td><td>Afeta DHCP, roteamento e troubleshooting</td></tr>\n<tr><td>Pool DHCP</td><td>Quais hosts serão distribuídos dinamicamente?</td><td>Evita conflito com servidores, impressoras e appliances</td></tr>\n<tr><td>Reservas</td><td>Quais IPs serão fixos ou reservados?</td><td>Facilita operação, logs e inventário</td></tr>\n<tr><td>Broadcast</td><td>Qual é o limite superior do bloco?</td><td>Evita atribuição indevida e problemas de comunicação</td></tr>\n</tbody></table>\n<p>Em cloud, o cálculo clássico precisa ser combinado com reservas do provedor. Algumas plataformas reservam os primeiros e últimos endereços da subnet para funções internas. A regra mental continua útil, mas o desenho final precisa considerar a documentação do provedor e o comportamento real da plataforma.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine uma rua com casas numeradas de 0 a 63. A placa da rua é o endereço de rede: ela identifica o quarteirão, mas não é uma casa. A última posição, 63, é o alto-falante do quarteirão: quando usado, representa uma mensagem para todos. As casas reais começam em 1 e vão até 62.</p>\n<p>Se alguém tenta morar na placa da rua, há problema. Se alguém tenta morar no alto-falante do quarteirão, também há problema. Em redes IPv4 tradicionais, isso equivale a usar endereço de rede ou broadcast como host.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> endereços IPv4 são calculados por bits, não por placas físicas. A analogia ajuda a lembrar papéis, mas o cálculo real vem do CIDR e do tamanho do bloco.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Considere a rede <code>192.168.1.0/24</code>. Um <code>/24</code> tem 8 bits de host, logo possui <code>2^8 = 256</code> endereços totais. O bloco vai de <code>192.168.1.0</code> até <code>192.168.1.255</code>.</p>\n<ul><li>Rede: <code>192.168.1.0</code></li><li>Primeiro host: <code>192.168.1.1</code></li><li>Último host: <code>192.168.1.254</code></li><li>Broadcast: <code>192.168.1.255</code></li></ul>\n<p>Se o roteador doméstico usa <code>192.168.1.1</code> como gateway, o DHCP poderia distribuir algo como <code>192.168.1.100</code> até <code>192.168.1.200</code>, deixando espaço para reservas, impressoras, câmeras, servidores locais e dispositivos fixos.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Uma empresa decide dividir <code>10.10.20.0/24</code> em quatro sub-redes <code>/26</code>: usuários, servidores internos, impressoras e convidados. Cada bloco terá 64 endereços totais e 62 hosts úteis tradicionais.</p>\n<table class=\"data-table\"><thead><tr><th>Função</th><th>Rede</th><th>Gateway sugerido</th><th>Pool DHCP sugerido</th><th>Broadcast</th></tr></thead><tbody>\n<tr><td>Usuários</td><td><code>10.10.20.0/26</code></td><td><code>10.10.20.1</code></td><td><code>10.10.20.10-10.10.20.60</code></td><td><code>10.10.20.63</code></td></tr>\n<tr><td>Servidores</td><td><code>10.10.20.64/26</code></td><td><code>10.10.20.65</code></td><td>reservas/IPAM</td><td><code>10.10.20.127</code></td></tr>\n<tr><td>Impressoras</td><td><code>10.10.20.128/26</code></td><td><code>10.10.20.129</code></td><td><code>10.10.20.140-10.10.20.180</code></td><td><code>10.10.20.191</code></td></tr>\n<tr><td>Convidados</td><td><code>10.10.20.192/26</code></td><td><code>10.10.20.193</code></td><td><code>10.10.20.200-10.10.20.250</code></td><td><code>10.10.20.255</code></td></tr>\n</tbody></table>\n<p>Perceba que a tabela não é apenas matemática: ela vira documentação de operação, firewall, DHCP, VLAN, troubleshooting e segurança.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, uma subnet também possui um CIDR, mas o provedor pode reservar endereços adicionais para gateway virtual, DNS, serviços internos e broadcast/limites lógicos. Por isso, uma subnet <code>/28</code> pode ter menos endereços utilizáveis do que o cálculo clássico sugere.</p>\n<p>Imagine uma VPC/VNet com bloco <code>10.50.0.0/16</code>. Você cria subnets como <code>10.50.1.0/24</code> para aplicações, <code>10.50.2.0/24</code> para bancos privados e <code>10.50.10.0/27</code> para appliances. Cada uma precisa ter limites calculados, mas também precisa considerar reservas do provedor, rotas, security groups, NSGs, NACLs, NAT gateway, private endpoints e VPN.</p>\n<div class=\"callout callout--warning\"><strong>Atenção em cloud:</strong> não planeje subnets no limite exato. Além dos hosts, considere reservas do provedor, escala horizontal, balanceadores, endpoints, crescimento e migração.</div>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, limites de sub-rede aparecem em Terraform, módulos de rede, Kubernetes, runners, redes Docker, ambientes efêmeros, VPNs de CI/CD, pipelines de deploy e políticas de acesso. Um erro de CIDR pode quebrar um ambiente inteiro ou criar sobreposição entre laboratório, produção e cloud.</p>\n<p>Exemplo: um módulo Terraform recebe <code>var.app_subnet_cidr = \"10.80.4.0/24\"</code>. Antes de aplicar, a pipeline pode validar se o CIDR não se sobrepõe com outros blocos, se a subnet tem capacidade suficiente e se o range planejado não invade redes conectadas por VPN.</p>\n<p>Esse tipo de validação evita problemas caros: deploy de subnet inválida, rota conflitante, cluster sem IP para pods/nodes, regra de firewall ampla demais ou ambiente que só falha quando integrado à rede corporativa.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Para Segurança da Informação, entender limites de sub-rede evita dois tipos de erro: expor demais e bloquear errado. Uma regra <code>allow 10.10.20.0/24</code> pode liberar quatro segmentos que deveriam ter políticas diferentes. Uma regra com <code>/32</code> pode ser segura para um host específico, mas frágil se o host trocar IP por DHCP.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Causa</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Allowlist ampla demais</td><td>Uso de <code>/24</code> quando bastava <code>/32</code> ou <code>/28</code></td><td>Menor privilégio, revisão de CIDR e inventário</td></tr>\n<tr><td>Segmentação falsa</td><td>Sub-redes documentadas sem controle no firewall</td><td>Políticas L3/L4, ACLs, logs e validação</td></tr>\n<tr><td>Conflito com VPN</td><td>Sobreposição de blocos privados</td><td>IPAM centralizado e validação antes de criar rede</td></tr>\n<tr><td>Gateway indevido</td><td>Host aponta para IP fora da faixa</td><td>DHCP controlado, NAC, monitoramento e troubleshooting por camada</td></tr>\n</tbody></table>\n<div class=\"callout callout--security\"><strong>Visão defensiva:</strong> cálculo de rede e broadcast não é só tarefa de redes. Ele influencia firewall, SIEM, segmentação, Zero Trust, resposta a incidentes, cloud security e gestão de exposição.</div>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama mostra um <code>/24</code> dividido em blocos <code>/26</code>. Cada bloco tem rede, hosts utilizáveis, gateway sugerido e broadcast.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m05l03-title m05l03-desc\">\n<title id=\"m05l03-title\">Limites de sub-redes IPv4</title>\n<desc id=\"m05l03-desc\">Representação de quatro sub-redes /26 dentro de 192.168.10.0/24, mostrando rede, hosts e broadcast.</desc>\n<defs><marker id=\"m05l03-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"40\" y=\"40\" width=\"880\" height=\"330\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"60\" y=\"75\" class=\"svg-label\">192.168.10.0/24 dividido em quatro /26</text>\n<g class=\"svg-node svg-node--client\"><rect x=\"70\" y=\"115\" width=\"190\" height=\"185\" rx=\"14\"></rect><text x=\"92\" y=\"150\" class=\"svg-label\">Bloco 1</text><text x=\"92\" y=\"180\" class=\"svg-label--small\">Rede: .0</text><text x=\"92\" y=\"205\" class=\"svg-label--small\">Hosts: .1 - .62</text><text x=\"92\" y=\"230\" class=\"svg-label--small\">Gateway: .1</text><text x=\"92\" y=\"255\" class=\"svg-label--small\">Broadcast: .63</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"285\" y=\"115\" width=\"190\" height=\"185\" rx=\"14\"></rect><text x=\"307\" y=\"150\" class=\"svg-label\">Bloco 2</text><text x=\"307\" y=\"180\" class=\"svg-label--small\">Rede: .64</text><text x=\"307\" y=\"205\" class=\"svg-label--small\">Hosts: .65 - .126</text><text x=\"307\" y=\"230\" class=\"svg-label--small\">Gateway: .65</text><text x=\"307\" y=\"255\" class=\"svg-label--small\">Broadcast: .127</text></g>\n<g class=\"svg-node svg-node--router\"><rect x=\"500\" y=\"115\" width=\"190\" height=\"185\" rx=\"14\"></rect><text x=\"522\" y=\"150\" class=\"svg-label\">Bloco 3</text><text x=\"522\" y=\"180\" class=\"svg-label--small\">Rede: .128</text><text x=\"522\" y=\"205\" class=\"svg-label--small\">Hosts: .129 - .190</text><text x=\"522\" y=\"230\" class=\"svg-label--small\">Gateway: .129</text><text x=\"522\" y=\"255\" class=\"svg-label--small\">Broadcast: .191</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"715\" y=\"115\" width=\"190\" height=\"185\" rx=\"14\"></rect><text x=\"737\" y=\"150\" class=\"svg-label\">Bloco 4</text><text x=\"737\" y=\"180\" class=\"svg-label--small\">Rede: .192</text><text x=\"737\" y=\"205\" class=\"svg-label--small\">Hosts: .193 - .254</text><text x=\"737\" y=\"230\" class=\"svg-label--small\">Gateway: .193</text><text x=\"737\" y=\"255\" class=\"svg-label--small\">Broadcast: .255</text></g>\n<line x1=\"165\" y1=\"325\" x2=\"810\" y2=\"325\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l03-arrow)\"></line>\n<text x=\"350\" y=\"350\" class=\"svg-label--small\">tamanho do bloco /26 = 64 endereços: 0, 64, 128, 192</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Prática equivalente</h2>\n<p><strong>Aula 5.3 convertida para prática equivalente</strong></p>\n<p>O conteúdo desta aula é melhor fixado por cálculo guiado, diagnóstico, matriz ou desafio curto. O laboratório independente foi removido para evitar atividade artificial e concentrar a execução pesada nos quatro labs integradores do M05.</p>\n<div class=\"callout callout--mentor\"><strong>Política v2.0:</strong> esta aula não mantém laboratório independente. A fixação acontece por exercícios, desafio, solução comentada e pelos quatro labs integradores do M05.</div>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios reforçam cálculo de rede, broadcast, primeiro host e último host em prefixos comuns.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>O desafio pede que você documente sub-redes reais a partir de um bloco e justifique gateway, DHCP e reservas.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra o raciocínio passo a passo e destaca erros comuns.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>Você aprendeu que cada sub-rede possui limites claros: rede, primeiro host, último host e broadcast. Também viu que o gateway e o pool DHCP precisam respeitar esses limites. Esse conhecimento é essencial para redes corporativas, cloud, DevSecOps, segurança e troubleshooting.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você aprenderá o <strong>método do bloco mágico</strong>, uma forma prática de encontrar rapidamente os blocos de uma sub-rede sem depender de tentativa e erro.</p></section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula fica no núcleo de subnetting IPv4, entre o cálculo de capacidade por CIDR e o método prático de blocos.",
    "previousConcepts": [
      "IPv4 de 32 bits",
      "CIDR",
      "máscara",
      "bits de host",
      "hosts úteis",
      "gateway padrão",
      "broadcast"
    ],
    "nextConcepts": [
      "bloco mágico",
      "prefixos comuns",
      "VLSM",
      "planejamento corporativo",
      "Packet Tracer"
    ],
    "realWorldUseCases": [
      "planejar escopo DHCP",
      "criar VLAN com gateway",
      "documentar IPAM",
      "validar subnet cloud",
      "configurar firewall por CIDR",
      "diagnosticar gateway fora da faixa"
    ]
  },
  "protocolFields": [
    {
      "field": "Network address",
      "meaning": "Primeiro endereço do bloco, usado para identificar a sub-rede.",
      "example": "192.168.10.64/26"
    },
    {
      "field": "First usable host",
      "meaning": "Primeiro endereço normalmente atribuível a host ou gateway.",
      "example": "192.168.10.65"
    },
    {
      "field": "Last usable host",
      "meaning": "Último endereço normalmente atribuível a host.",
      "example": "192.168.10.126"
    },
    {
      "field": "Broadcast address",
      "meaning": "Último endereço do bloco em redes IPv4 tradicionais.",
      "example": "192.168.10.127"
    },
    {
      "field": "Prefix length",
      "meaning": "Quantidade de bits de rede no CIDR.",
      "example": "/26"
    },
    {
      "field": "Block size",
      "meaning": "Quantidade de endereços totais no bloco.",
      "example": "64"
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Host lê IP e máscara",
      "description": "O sistema operacional identifica o endereço configurado e o prefixo."
    },
    {
      "step": 2,
      "title": "Host calcula sua rede",
      "description": "A máscara define quais bits pertencem à rede."
    },
    {
      "step": 3,
      "title": "Host identifica limites",
      "description": "Com o prefixo, é possível determinar início e fim do bloco."
    },
    {
      "step": 4,
      "title": "Host decide se destino é local",
      "description": "Se destino está dentro da mesma sub-rede, tenta comunicação local via ARP e Ethernet."
    },
    {
      "step": 5,
      "title": "Host usa gateway se destino for remoto",
      "description": "Se destino está fora do bloco, o frame é enviado ao MAC do gateway."
    },
    {
      "step": 6,
      "title": "Operação valida configuração",
      "description": "DHCP, firewall, IPAM e monitoramento dependem dos limites corretos."
    }
  ],
  "deepDive": {
    "title": "Por que rede e broadcast são reservados?",
    "points": [
      "O endereço de rede representa o bloco inteiro em rotas e documentação.",
      "O broadcast dirigido representa todos os hosts daquele bloco em IPv4 tradicional.",
      "A fórmula -2 vem justamente da reserva de rede e broadcast.",
      "Em /31 e /32 existem usos especiais, mas eles exigem contexto e suporte adequado.",
      "Em cloud, além das reservas clássicas, provedores podem reservar endereços adicionais."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Atribuir o primeiro endereço do bloco como host sem perceber que ele é a rede.",
      "impact": "O host pode não funcionar corretamente ou gerar comportamento inconsistente.",
      "fix": "Calcular rede, broadcast e faixa utilizável antes de configurar."
    },
    {
      "mistake": "Usar broadcast como endereço de servidor.",
      "impact": "Problemas de comunicação e conflito lógico com broadcast da sub-rede.",
      "fix": "Reservar o último endereço do bloco como broadcast em IPv4 tradicional."
    },
    {
      "mistake": "Colocar gateway fora da sub-rede do host.",
      "impact": "O host pode não alcançar redes remotas.",
      "fix": "Garantir que gateway esteja dentro da faixa utilizável da sub-rede local."
    },
    {
      "mistake": "Planejar DHCP incluindo gateway, rede ou broadcast.",
      "impact": "Clientes podem receber endereços inválidos ou conflitar com infraestrutura.",
      "fix": "Separar faixa dinâmica, reservas, gateway e endereços fixos no IPAM."
    },
    {
      "mistake": "Ignorar reservas do provedor cloud.",
      "impact": "Subnet criada no limite fica sem capacidade real.",
      "fix": "Consultar reservas da plataforma e deixar margem operacional."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host tem IP, mas não alcança o gateway.",
      "Gateway configurado parece correto, mas está fora da faixa calculada.",
      "DHCP entrega IP que não se comunica.",
      "Servidor usa endereço final do bloco e apresenta comportamento estranho.",
      "VPN ou firewall libera bloco maior do que o segmento desejado."
    ],
    "method": [
      "Coletar IP, máscara, gateway e DNS do host.",
      "Calcular rede, primeiro host, último host e broadcast.",
      "Validar se o IP do host é utilizável.",
      "Validar se o gateway está na mesma sub-rede.",
      "Verificar se o pool DHCP exclui rede, broadcast, gateway e reservas.",
      "Comparar firewall, rota e documentação IPAM com o cálculo real.",
      "Sanitizar evidências antes de compartilhar logs ou screenshots."
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && arp -a",
        "purpose": "Coletar IP, máscara, gateway, rotas e ARP."
      },
      {
        "platform": "PowerShell",
        "command": "Get-NetIPConfiguration; Get-NetRoute; Get-NetNeighbor",
        "purpose": "Coletar configuração moderna de rede no Windows."
      },
      {
        "platform": "Linux",
        "command": "ip addr; ip route; ip neigh",
        "purpose": "Coletar IP, prefixo, rota default e vizinhos."
      },
      {
        "platform": "Linux",
        "command": "ipcalc 192.168.10.64/26",
        "purpose": "Validar cálculo com ferramenta auxiliar quando disponível."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief | include up",
        "purpose": "Listar interfaces ativas e IPs configurados."
      },
      {
        "platform": "Cisco IOS",
        "command": "show running-config interface vlan 10",
        "purpose": "Validar IP/máscara do gateway SVI."
      }
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
    "badPractices": [
      "Achar que sub-rede por si só é controle de segurança suficiente.",
      "Usar o mesmo /24 para usuários, servidores, impressoras e visitantes.",
      "Configurar gateway fora da faixa e mascarar o problema com rotas manuais.",
      "Criar allowlist ampla para resolver pressa operacional.",
      "Ignorar IPAM e depender de planilhas desatualizadas."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição por CIDR amplo demais.",
        "description": "Risco relacionado à aula 5.3 — Rede, broadcast, primeiro e último host.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Menor privilégio em CIDR."
      },
      {
        "name": "Movimento lateral facilitado por redes planas.",
        "description": "Risco relacionado à aula 5.3 — Rede, broadcast, primeiro e último host.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall/ACL entre sub-redes."
      },
      {
        "name": "Conflito de endereçamento em VPN e cloud híbrida.",
        "description": "Risco relacionado à aula 5.3 — Rede, broadcast, primeiro e último host.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM centralizado."
      },
      {
        "name": "Falhas de inventário e atribuição de IP.",
        "description": "Risco relacionado à aula 5.3 — Rede, broadcast, primeiro e último host.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Validação automática de CIDR em IaC."
      },
      {
        "name": "Regras de firewall inconsistentes com a sub-rede real.",
        "description": "Risco relacionado à aula 5.3 — Rede, broadcast, primeiro e último host.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento de DHCP e conflitos."
      }
    ],
    "mitigations": [
      "Menor privilégio em CIDR.",
      "Firewall/ACL entre sub-redes.",
      "IPAM centralizado.",
      "Validação automática de CIDR em IaC.",
      "Monitoramento de DHCP e conflitos.",
      "Revisão periódica de regras de rede e rotas."
    ],
    "goodPractices": [
      "Documentar rede, gateway, broadcast, pool DHCP e reservas em IPAM.",
      "Usar CIDRs mínimos necessários em firewall e allowlists.",
      "Separar sub-redes por função e aplicar políticas entre elas.",
      "Validar sobreposição antes de criar VPN, VPC, VNet ou ambiente de laboratório.",
      "Sanitizar endereços públicos, nomes e topologias antes de compartilhar evidências.",
      "Revisar regras que usam blocos amplos como /16 e /24 sem justificativa."
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
      "Menor privilégio em CIDR.",
      "Firewall/ACL entre sub-redes.",
      "IPAM centralizado.",
      "Validação automática de CIDR em IaC.",
      "Monitoramento de DHCP e conflitos.",
      "Revisão periódica de regras de rede e rotas."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    "Se uma sub-rede /26 começa em .64, por que .127 é broadcast e .128 não é host dessa sub-rede?",
    "Por que o gateway precisa estar dentro da faixa utilizável do host?",
    "Quando uma regra de firewall deveria usar /32 em vez de liberar a sub-rede inteira?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Em 192.168.10.0/26, qual é o broadcast?",
      "options": [
        "192.168.10.62",
        "192.168.10.63",
        "192.168.10.64",
        "192.168.10.255"
      ],
      "answer": "192.168.10.63",
      "explanation": "Um /26 tem blocos de 64 endereços. O primeiro bloco vai de .0 a .63; .63 é o broadcast."
    },
    {
      "id": "q2",
      "question": "Qual é o primeiro host utilizável de 192.168.10.64/26?",
      "options": [
        "192.168.10.64",
        "192.168.10.65",
        "192.168.10.66",
        "192.168.10.127"
      ],
      "answer": "192.168.10.65",
      "explanation": ".64 é a rede. O primeiro host é rede + 1."
    },
    {
      "id": "q3",
      "question": "Qual é o último host utilizável de 192.168.10.128/26?",
      "options": [
        "192.168.10.190",
        "192.168.10.191",
        "192.168.10.192",
        "192.168.10.254"
      ],
      "answer": "192.168.10.190",
      "explanation": "O bloco .128/26 vai até .191; .191 é broadcast, então o último host é .190."
    },
    {
      "id": "q4",
      "question": "Qual erro existe ao configurar 10.0.5.63/26 como servidor no bloco 10.0.5.0/26?",
      "options": [
        "É endereço de rede",
        "É broadcast do bloco",
        "É gateway obrigatório",
        "É APIPA"
      ],
      "answer": "É broadcast do bloco",
      "explanation": "No bloco 10.0.5.0/26, o intervalo vai de .0 a .63, sendo .63 o broadcast."
    },
    {
      "id": "q5",
      "question": "Por que gateway fora da faixa é problema?",
      "options": [
        "Porque DNS deixa de funcionar sempre",
        "Porque o host pode não conseguir enviar tráfego para redes remotas",
        "Porque ARP muda para TCP",
        "Porque broadcast vira unicast"
      ],
      "answer": "Porque o host pode não conseguir enviar tráfego para redes remotas",
      "explanation": "O gateway precisa ser alcançável na rede local do host para servir como próximo salto."
    },
    {
      "id": "q6",
      "question": "Qual prática é mais segura ao criar allowlist para um único servidor?",
      "options": [
        "Liberar /16 inteiro",
        "Liberar /24 por comodidade",
        "Liberar /32 quando o requisito é um host específico",
        "Liberar 0.0.0.0/0 temporariamente sem expiração"
      ],
      "answer": "Liberar /32 quando o requisito é um host específico",
      "explanation": "Menor privilégio recomenda liberar apenas o necessário."
    }
  ],
  "flashcards": [
    {
      "front": "O que é endereço de rede?",
      "back": "É o primeiro endereço do bloco e identifica a sub-rede."
    },
    {
      "front": "O que é broadcast IPv4?",
      "back": "É o último endereço do bloco em redes IPv4 tradicionais, usado para representar todos os hosts daquela sub-rede."
    },
    {
      "front": "Como achar o primeiro host?",
      "back": "Normalmente é o endereço de rede + 1."
    },
    {
      "front": "Como achar o último host?",
      "back": "Normalmente é o endereço de broadcast - 1."
    },
    {
      "front": "Qual é o tamanho de bloco de /26?",
      "back": "64 endereços totais."
    },
    {
      "front": "Por que gateway deve estar na mesma sub-rede?",
      "back": "Porque o host precisa alcançá-lo localmente para enviar tráfego a redes remotas."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "prompt": "Calcule rede, primeiro host, último host e broadcast de 192.168.20.0/25.",
      "expectedAnswer": "Rede 192.168.20.0, primeiro host .1, último host .126, broadcast .127.",
      "difficulty": "iniciante"
    },
    {
      "id": "e2",
      "prompt": "Calcule os limites de 192.168.20.128/25.",
      "expectedAnswer": "Rede 192.168.20.128, primeiro host .129, último host .254, broadcast .255.",
      "difficulty": "iniciante"
    },
    {
      "id": "e3",
      "prompt": "No bloco 10.1.1.64/26, o IP 10.1.1.127 pode ser host? Explique.",
      "expectedAnswer": "Não. O bloco .64/26 vai de .64 a .127; .127 é broadcast.",
      "difficulty": "intermediário"
    },
    {
      "id": "e4",
      "prompt": "Crie uma tabela para quatro sub-redes /26 dentro de 172.16.8.0/24.",
      "expectedAnswer": "172.16.8.0/26, .64/26, .128/26 e .192/26 com seus respectivos hosts e broadcasts.",
      "difficulty": "intermediário"
    },
    {
      "id": "ex5.3.v2-final-pratica-equivalente",
      "type": "prático",
      "prompt": "Produza uma evidência curta do aprendizado desta aula: cálculo, tabela, matriz de decisão, desenho lógico ou explicação de troubleshooting relacionada ao tema.",
      "expectedAnswer": "A resposta deve conter artefato verificável, como tabela de sub-redes, cálculo de bloco, matriz de requisitos, justificativa de prefixo ou diagnóstico de erro comum.",
      "explanation": "Na versão v2.0, esta aula usa prática equivalente no lugar de laboratório independente para evitar laboratório genérico e concentrar execução nos labs integradores do módulo."
    }
  ],
  "challenge": {
    "title": "Planeje limites de sub-redes para quatro áreas",
    "scenario": "Você recebeu o bloco 10.30.40.0/24 e precisa dividi-lo em quatro sub-redes iguais para Usuários, Servidores, Impressoras e Visitantes.",
    "tasks": [
      "Dividir o /24 em quatro /26.",
      "Calcular rede, primeiro host, último host e broadcast de cada sub-rede.",
      "Escolher gateway usando o primeiro host de cada bloco.",
      "Propor pool DHCP para Usuários e Visitantes excluindo gateway e reservas.",
      "Escrever uma observação de segurança sobre por que Visitantes não devem acessar Servidores."
    ],
    "deliverables": [
      "Tabela de sub-redes",
      "Convenção de gateway",
      "Pools DHCP",
      "Observação de segurança",
      "Checklist de validação"
    ],
    "rubric": [
      {
        "criteria": "Cálculo correto dos quatro blocos /26",
        "points": 30
      },
      {
        "criteria": "Identificação correta de rede, hosts e broadcast",
        "points": 30
      },
      {
        "criteria": "Gateway e DHCP sem endereços especiais",
        "points": 20
      },
      {
        "criteria": "Justificativa de segurança entre segmentos",
        "points": 20
      }
    ],
    "expectedDeliverables": [
      "Evidência prática equivalente em vez de lab independente"
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desafio",
    "steps": [
      "Um /26 tem 64 endereços. Dentro de um /24, os blocos começam em .0, .64, .128 e .192.",
      "Usuários: 10.30.40.0/26, hosts .1-.62, broadcast .63, gateway .1.",
      "Servidores: 10.30.40.64/26, hosts .65-.126, broadcast .127, gateway .65.",
      "Impressoras: 10.30.40.128/26, hosts .129-.190, broadcast .191, gateway .129.",
      "Visitantes: 10.30.40.192/26, hosts .193-.254, broadcast .255, gateway .193.",
      "Pools DHCP devem excluir rede, broadcast, gateway e reservas. Exemplo: Usuários .10-.60; Visitantes .200-.250.",
      "Visitantes devem ter política restritiva no firewall, normalmente acesso apenas à Internet e sem acesso direto a servidores internos."
    ],
    "keyTakeaway": "O cálculo técnico vira decisão de arquitetura: gateway, DHCP, firewall, documentação e segurança dependem dos limites corretos da sub-rede."
  },
  "glossary": [
    {
      "term": "Endereço de rede",
      "definition": "Primeiro endereço de uma sub-rede, usado para identificar o bloco."
    },
    {
      "term": "Broadcast",
      "definition": "Último endereço de uma sub-rede IPv4 tradicional, usado para representar todos os hosts do bloco."
    },
    {
      "term": "Primeiro host",
      "definition": "Primeiro endereço normalmente atribuível a um host, geralmente rede + 1."
    },
    {
      "term": "Último host",
      "definition": "Último endereço normalmente atribuível a um host, geralmente broadcast - 1."
    },
    {
      "term": "Tamanho do bloco",
      "definition": "Quantidade total de endereços dentro de uma sub-rede."
    },
    {
      "term": "Gateway",
      "definition": "Endereço do equipamento local que encaminha tráfego para redes remotas."
    }
  ],
  "references": [
    {
      "title": "Curso Redes e Network v2.0 — Módulo 4",
      "description": "Base de IPv4, máscara, rede, broadcast, gateway, DHCP, ICMP e troubleshooting."
    },
    {
      "title": "Curso Redes e Network v2.0 — Módulo 5",
      "description": "Sequência de subnetting, CIDR, VLSM e planejamento corporativo."
    },
    {
      "title": "RFC 4632",
      "description": "CIDR e agregação de rotas em IPv4."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e automação",
      "reason": "CIDRs e subnets devem ser parametrizados e validados em Terraform/Ansible."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso condicional e redes confiáveis",
      "reason": "Políticas de acesso podem usar IPs e CIDRs como sinais de localização, exigindo precisão."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções",
      "Concluir quiz com pelo menos 70%",
      "Preencher tabela do laboratório",
      "Responder ao desafio",
      "Revisar solução comentada"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.4"
    ],
    "xpAwarded": 230,
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "practicalExerciseDone",
        "exerciseDone"
      ]
    }
  }
};
