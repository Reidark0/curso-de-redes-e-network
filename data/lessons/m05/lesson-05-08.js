export const lesson0508 = {
  "id": "5.8",
  "moduleId": "m05",
  "order": 8,
  "title": "Laboratório Packet Tracer: quatro sub-redes /26",
  "subtitle": "Laboratório completo no Cisco Packet Tracer para dividir 192.168.10.0/24 em quatro /26, configurar roteador, switches e PCs, validar gateways, introduzir falhas e produzir solução comentada.",
  "duration": "150-210 min",
  "estimatedStudyTimeMinutes": 210,
  "difficulty": "intermediário",
  "type": "laboratório",
  "xp": 300,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "packet tracer",
    "cisco",
    "laboratório",
    "vlan",
    "gateway",
    "roteamento",
    "icmp",
    "dhcp",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.1",
      "reason": "A aula 5.1 explicou por que subnetting existe e por que dividir uma rede plana melhora escala, operação e segurança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.2",
      "reason": "A aula 5.2 ensinou CIDR, máscara e quantidade de hosts."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.3",
      "reason": "A aula 5.3 ensinou rede, broadcast, primeiro e último host."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.4",
      "reason": "A aula 5.4 ensinou o método do bloco mágico, usado para calcular rapidamente os quatro /26."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.7",
      "reason": "A aula 5.7 mostrou como transformar cálculo em plano de endereçamento documentado."
    }
  ],
  "objectives": [
    "Calcular quatro sub-redes /26 a partir de 192.168.10.0/24 com rede, gateway, hosts úteis e broadcast.",
    "Montar topologia Packet Tracer com roteador, quatro switches/segmentos e PCs de teste.",
    "Configurar interfaces de gateway no roteador ou SVIs em switch L3 com máscara 255.255.255.192.",
    "Configurar PCs com IP, máscara e gateway corretos para cada bloco.",
    "Validar comunicação local, gateway e comunicação entre sub-redes usando comandos de host e Cisco.",
    "Introduzir e corrigir falhas intencionais de máscara, gateway e interface/VLAN."
  ],
  "learningOutcomes": [
    "Dado 192.168.10.0/24, o aluno cria exatamente quatro blocos /26 sem sobreposição.",
    "Dada uma topologia Packet Tracer, o aluno configura roteador, switches e PCs com gateways corretos.",
    "Dado um erro de máscara, gateway ou interface, o aluno identifica a causa por evidência, não por tentativa aleatória.",
    "Dado um teste de ping entre sub-redes, o aluno explica o papel de ARP, gateway e tabela de rotas.",
    "Dado o laboratório concluído, o aluno entrega tabela de endereçamento, comandos, validações e solução comentada."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Até aqui, você aprendeu a calcular sub-redes no papel. Isso é essencial, mas redes reais não vivem apenas em fórmulas. Um administrador precisa transformar o cálculo em configuração, validar conectividade, documentar decisões e descobrir rapidamente onde está o erro quando algo falha.</p>\n<p>Nesta aula, você vai usar o Cisco Packet Tracer para construir um laboratório clássico: pegar <code>192.168.10.0/24</code> e dividir em quatro sub-redes <code>/26</code>. Cada sub-rede terá seu próprio gateway e hosts de teste. Depois, você validará conectividade e fará troubleshooting como faria em uma rede corporativa pequena.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> subnetting só vira competência prática quando você consegue calcular, configurar, testar, explicar e corrigir uma topologia real.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>Laboratórios com quatro sub-redes são tradicionais no ensino de redes porque forçam o aluno a unir fundamentos: cálculo de CIDR, endereçamento de hosts, gateway padrão, roteamento, ARP, ICMP, documentação e validação. Eles aparecem em ambientes de certificação, salas de aula, treinamentos corporativos e simulações de troubleshooting.</p>\n<p>Antes de ferramentas como o Packet Tracer, esse tipo de prática exigia roteadores, switches, cabos e computadores físicos. Simuladores permitiram repetir cenários, errar sem derrubar produção e visualizar o tráfego de forma didática. Isso não substitui equipamento real, mas acelera muito a aprendizagem inicial.</p>\n<p>No mundo corporativo, a lógica é a mesma: antes de aplicar uma mudança em produção, equipes maduras testam em laboratório, homologação, ambiente virtual ou em um change control bem documentado.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema desta aula é operacional: você recebeu um bloco <code>192.168.10.0/24</code> e precisa criar quatro redes menores, cada uma com até 62 hosts úteis. Essas redes devem ser configuradas em uma topologia, cada uma com gateway próprio e hosts capazes de comunicar entre si quando o roteamento estiver correto.</p>\n<table class=\"data-table\"><thead><tr><th>Segmento</th><th>Função</th><th>Necessidade</th></tr></thead><tbody>\n<tr><td>Sub-rede A</td><td>Usuários</td><td>Até 62 hosts</td></tr>\n<tr><td>Sub-rede B</td><td>Servidores</td><td>Até 62 hosts</td></tr>\n<tr><td>Sub-rede C</td><td>Visitantes/Lab</td><td>Até 62 hosts</td></tr>\n<tr><td>Sub-rede D</td><td>Gerência</td><td>Até 62 hosts</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema recorrente:</strong> quando o aluno calcula certo, mas configura máscara errada, gateway fora da sub-rede ou IP duplicado, o laboratório parece misterioso. O objetivo é aprender a diagnosticar esses erros.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>Você começou no Módulo 4 entendendo IPv4, máscara, rede, hosts e broadcast. Depois, no Módulo 5, aprendeu por que subnetting existe, como calcular capacidade, como encontrar limites e como usar o bloco mágico. Agora a evolução natural é aplicar tudo em uma topologia.</p>\n<ol class=\"flow-list\">\n<li>Escolher o bloco base: <code>192.168.10.0/24</code>.</li>\n<li>Definir o novo prefixo: <code>/26</code>.</li>\n<li>Calcular o bloco mágico: <code>256 - 192 = 64</code>.</li>\n<li>Gerar quatro redes: <code>.0</code>, <code>.64</code>, <code>.128</code> e <code>.192</code>.</li>\n<li>Definir gateways, hosts e broadcasts.</li>\n<li>Montar e validar a topologia.</li>\n</ol>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>O laboratório trabalha com a divisão de <code>192.168.10.0/24</code> em quatro sub-redes <code>/26</code>. Como <code>/26</code> usa 26 bits para rede e deixa 6 bits para host, cada sub-rede possui <code>2^6 = 64</code> endereços totais. No modelo tradicional, dois endereços são reservados: rede e broadcast. Portanto, cada sub-rede tem 62 hosts úteis.</p>\n<table class=\"data-table\"><thead><tr><th>Sub-rede</th><th>Rede</th><th>Primeiro host</th><th>Gateway sugerido</th><th>Último host</th><th>Broadcast</th></tr></thead><tbody>\n<tr><td>A</td><td><code>192.168.10.0/26</code></td><td><code>192.168.10.1</code></td><td><code>192.168.10.1</code></td><td><code>192.168.10.62</code></td><td><code>192.168.10.63</code></td></tr>\n<tr><td>B</td><td><code>192.168.10.64/26</code></td><td><code>192.168.10.65</code></td><td><code>192.168.10.65</code></td><td><code>192.168.10.126</code></td><td><code>192.168.10.127</code></td></tr>\n<tr><td>C</td><td><code>192.168.10.128/26</code></td><td><code>192.168.10.129</code></td><td><code>192.168.10.129</code></td><td><code>192.168.10.190</code></td><td><code>192.168.10.191</code></td></tr>\n<tr><td>D</td><td><code>192.168.10.192/26</code></td><td><code>192.168.10.193</code></td><td><code>192.168.10.193</code></td><td><code>192.168.10.254</code></td><td><code>192.168.10.255</code></td></tr>\n</tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Quando um PC da sub-rede A tenta falar com outro PC da sub-rede A, ele compara o IP de destino com sua máscara <code>255.255.255.192</code>. Como o destino está na mesma rede, ele usa ARP para descobrir o MAC do destino e envia o frame diretamente na LAN.</p>\n<p>Quando esse mesmo PC tenta falar com um host da sub-rede B, a máscara mostra que o destino não é local. Então o PC não faz ARP para o host final. Ele faz ARP para o gateway da sub-rede A, encapsula o pacote IP em um frame Ethernet destinado ao MAC do gateway, e o roteador encaminha para a outra sub-rede.</p>\n<div class=\"definition-box\"><strong>Ideia-chave:</strong> o IP de origem e destino permanecem representando os hosts finais, mas o MAC de origem e destino muda a cada enlace. Esse comportamento foi consolidado nas aulas de Ethernet, ARP, gateway e IPv4.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>A topologia recomendada usa um roteador ou switch camada 3 central com quatro interfaces lógicas ou físicas, cada uma representando uma sub-rede. Para manter a aula acessível no Packet Tracer, você pode escolher uma das duas arquiteturas:</p>\n<table class=\"comparison-table\"><thead><tr><th>Arquitetura</th><th>Como funciona</th><th>Quando usar no lab</th></tr></thead><tbody>\n<tr><td>Roteador com quatro interfaces</td><td>Cada interface do roteador é o gateway de uma sub-rede</td><td>Mais simples para visualizar sub-redes separadas</td></tr>\n<tr><td>Router-on-a-stick</td><td>Uma interface trunk com subinterfaces 802.1Q</td><td>Melhor para praticar VLANs junto com subnetting</td></tr>\n</tbody></table>\n<p>Esta aula usa a opção mais direta: quatro redes conectadas a um dispositivo de roteamento. A relação com VLANs será retomada em módulos seguintes.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine que <code>192.168.10.0/24</code> é um prédio com 256 salas numeradas. Subnetting é dividir esse prédio em quatro andares de 64 salas. Cada andar tem uma portaria própria, que representa o gateway. Uma pessoa no mesmo andar entrega algo diretamente. Para entregar em outro andar, ela precisa passar pela portaria.</p>\n<p>A analogia ajuda a entender a separação, mas tem limite: em redes, a decisão é matemática. O host não “pergunta” ao prédio; ele usa IP, máscara, tabela de rotas e ARP para decidir o próximo passo.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>PC-A1 está em <code>192.168.10.10/26</code> com gateway <code>192.168.10.1</code>. PC-A2 está em <code>192.168.10.20/26</code>. Como ambos pertencem à rede <code>192.168.10.0/26</code>, eles comunicam diretamente dentro da mesma sub-rede.</p>\n<p>PC-B1 está em <code>192.168.10.70/26</code> com gateway <code>192.168.10.65</code>. Quando PC-A1 tenta falar com PC-B1, ele envia o pacote ao gateway <code>192.168.10.1</code>. O roteador encaminha para a rede <code>192.168.10.64/26</code>.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa pequena, as quatro sub-redes poderiam representar usuários, servidores, convidados e gerência. Cada segmento teria política própria: usuários acessam sistemas internos, servidores recebem conexões controladas, convidados só saem para a Internet e gerência é restrita a administradores.</p>\n<table class=\"data-table\"><thead><tr><th>Sub-rede</th><th>Função</th><th>Controle esperado</th></tr></thead><tbody>\n<tr><td><code>192.168.10.0/26</code></td><td>Usuários</td><td>Internet, DNS, sistemas corporativos</td></tr>\n<tr><td><code>192.168.10.64/26</code></td><td>Servidores</td><td>Acesso restrito por portas e origem</td></tr>\n<tr><td><code>192.168.10.128/26</code></td><td>Convidados</td><td>Isolamento da LAN interna</td></tr>\n<tr><td><code>192.168.10.192/26</code></td><td>Gerência</td><td>Acesso administrativo auditado</td></tr>\n</tbody></table>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, o mesmo raciocínio aparece ao dividir uma VPC ou VNet em subnets. Uma rede <code>10.50.0.0/24</code> pode ser dividida em subnets para aplicação, dados, endpoints privados e administração. A diferença é que o provedor pode reservar alguns endereços adicionais em cada subnet, então o cálculo clássico de hosts úteis precisa ser ajustado à plataforma.</p>\n<p>O laboratório em Packet Tracer prepara o raciocínio: escolher CIDR, evitar sobreposição, definir gateway, documentar função, validar rota e proteger tráfego entre segmentos.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, o plano deste laboratório poderia virar código. Uma tabela de sub-redes pode alimentar Terraform, Ansible, documentação, regras de firewall, inventário e testes automatizados. O pipeline pode validar se um CIDR novo se sobrepõe a outro antes do merge.</p>\n<div class=\"callout\"><strong>Exemplo:</strong> antes de criar uma nova subnet, um job de CI pode calcular rede, broadcast e intervalo de hosts, comparar com o IPAM e bloquear a alteração se houver sobreposição.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Do ponto de vista de segurança, quatro sub-redes não significam isolamento automático. Elas criam limites roteáveis. Para virar controle de segurança, esses limites precisam de firewall, ACLs, políticas, logs, inventário, autenticação administrativa e monitoramento.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Erro no laboratório</th><th>Versão corporativa</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Gateway errado</td><td>Host aponta para IP fora da sub-rede</td><td>Usuário sem acesso a sistemas</td><td>Validar gateway e DHCP</td></tr>\n<tr><td>Máscara errada</td><td>Host acredita que outra rede é local</td><td>Falha intermitente e ARP indevido</td><td>Padronizar configuração</td></tr>\n<tr><td>Segmentação falsa</td><td>Sub-redes comunicam tudo com tudo</td><td>Movimento lateral facilitado</td><td>Firewall/ACL entre zonas</td></tr>\n<tr><td>Documentação ausente</td><td>Ninguém sabe qual sub-rede é qual</td><td>Incidente sem contexto</td><td>IPAM e CMDB</td></tr>\n</tbody></table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 600\" role=\"img\" aria-labelledby=\"m05l08-title m05l08-desc\">\n<title id=\"m05l08-title\">Laboratório Packet Tracer com quatro sub-redes /26</title>\n<desc id=\"m05l08-desc\">Diagrama mostrando a rede 192.168.10.0/24 dividida em quatro sub-redes /26, cada uma conectada a um gateway central.</desc>\n<defs><marker id=\"m05l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"35\" y=\"30\" width=\"910\" height=\"525\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"60\" y=\"65\" class=\"svg-label\">192.168.10.0/24 dividido em quatro sub-redes /26</text>\n<g class=\"svg-node svg-node--router\"><rect x=\"405\" y=\"245\" width=\"170\" height=\"95\" rx=\"16\"></rect><text x=\"435\" y=\"280\" class=\"svg-label\">Roteador</text><text x=\"425\" y=\"310\" class=\"svg-label--small\">Gateways /26</text></g>\n<g class=\"svg-node svg-node--client\"><rect x=\"75\" y=\"115\" width=\"250\" height=\"105\" rx=\"14\"></rect><text x=\"100\" y=\"148\" class=\"svg-label\">Sub-rede A - Usuários</text><text x=\"100\" y=\"176\" class=\"svg-label--small\">192.168.10.0/26</text><text x=\"100\" y=\"200\" class=\"svg-label--small\">GW 192.168.10.1</text></g>\n<g class=\"svg-node svg-node--server\"><rect x=\"655\" y=\"115\" width=\"250\" height=\"105\" rx=\"14\"></rect><text x=\"680\" y=\"148\" class=\"svg-label\">Sub-rede B - Servidores</text><text x=\"680\" y=\"176\" class=\"svg-label--small\">192.168.10.64/26</text><text x=\"680\" y=\"200\" class=\"svg-label--small\">GW 192.168.10.65</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"75\" y=\"390\" width=\"250\" height=\"105\" rx=\"14\"></rect><text x=\"100\" y=\"423\" class=\"svg-label\">Sub-rede C - Convidados</text><text x=\"100\" y=\"451\" class=\"svg-label--small\">192.168.10.128/26</text><text x=\"100\" y=\"475\" class=\"svg-label--small\">GW 192.168.10.129</text></g>\n<g class=\"svg-node svg-node--security\"><rect x=\"655\" y=\"390\" width=\"250\" height=\"105\" rx=\"14\"></rect><text x=\"680\" y=\"423\" class=\"svg-label\">Sub-rede D - Gerência</text><text x=\"680\" y=\"451\" class=\"svg-label--small\">192.168.10.192/26</text><text x=\"680\" y=\"475\" class=\"svg-label--small\">GW 192.168.10.193</text></g>\n<line x1=\"325\" y1=\"167\" x2=\"405\" y2=\"275\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l08-arrow)\"></line>\n<line x1=\"655\" y1=\"167\" x2=\"575\" y2=\"275\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l08-arrow)\"></line>\n<line x1=\"325\" y1=\"442\" x2=\"405\" y2=\"320\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l08-arrow)\"></line>\n<line x1=\"655\" y1=\"442\" x2=\"575\" y2=\"320\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m05l08-arrow)\"></line>\n<text x=\"60\" y=\"575\" class=\"svg-label--small\">Cada /26 possui 64 endereços totais: rede, 62 hosts úteis e broadcast. O gateway sugerido usa o primeiro host de cada bloco.</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório integrador</h2>\n<p>Esta aula concentra o <strong>Lab integrador 2 do M05</strong>: Packet Tracer com quatro sub-redes /26, roteador, PCs, falhas intencionais, validação e relatório.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios reforçam o cálculo dos quatro blocos, a escolha de gateways, a identificação de erros de máscara e a análise de falhas de conectividade entre sub-redes.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Depois da topologia funcional, aplique três falhas: máscara /24 em um PC, gateway errado em outro PC e uma interface/SVI desligada no roteador. Corrija uma por vez e explique a evidência que apontou para cada causa.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada traz a tabela correta dos quatro <code>/26</code>, os comandos Cisco esperados, os testes de PC e a interpretação das falhas intencionais.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>O laboratório transforma subnetting em operação: calcular quatro blocos <code>/26</code>, configurar gateways, atribuir IPs aos PCs, validar ARP/ICMP/rotas e corrigir erros intencionais. A competência real não é apenas acertar a tabela; é fazer a rede funcionar e provar por evidência.</p>\n<ul><li><strong>Blocos:</strong> 0, 64, 128 e 192.</li><li><strong>Máscara:</strong> 255.255.255.192.</li><li><strong>Hosts úteis por bloco:</strong> 62.</li><li><strong>Gateways sugeridos:</strong> primeiro host de cada bloco.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, você verá <strong>Subnetting para segurança e cloud</strong>. O foco será transformar sub-redes em zonas de segurança, reduzir blast radius, planejar VPC/VNet, evitar sobreposição e proteger ambientes híbridos.</p>\n</section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula aplica subnetting IPv4 em uma topologia prática de laboratório, conectando cálculo, configuração e troubleshooting.",
    "previousConcepts": [
      "CIDR",
      "máscara",
      "rede",
      "broadcast",
      "hosts úteis",
      "gateway",
      "ARP",
      "ICMP",
      "VLSM",
      "planejamento"
    ],
    "nextConcepts": [
      "subnetting para segurança",
      "subnetting em cloud",
      "VPC",
      "VNet",
      "zonas",
      "firewall",
      "blast radius"
    ]
  },
  "protocolFields": [
    {
      "name": "Endereço IPv4",
      "description": "Identifica logicamente o host dentro de uma sub-rede."
    },
    {
      "name": "Máscara /26",
      "description": "255.255.255.192, usada para separar rede e host."
    },
    {
      "name": "Gateway padrão",
      "description": "Endereço do roteador usado para sair da sub-rede local."
    },
    {
      "name": "Rede",
      "description": "Primeiro endereço do bloco; não deve ser usado como host no modelo tradicional."
    },
    {
      "name": "Broadcast",
      "description": "Último endereço do bloco; usado para broadcast dirigido na sub-rede."
    },
    {
      "name": "Tabela ARP",
      "description": "Relaciona IPv4 e MAC no domínio local."
    },
    {
      "name": "Tabela de rotas",
      "description": "Indica para onde enviar tráfego local e remoto."
    }
  ],
  "packetFlow": [
    "O host compara IP de destino e máscara /26.",
    "Se o destino estiver na mesma sub-rede, o host usa ARP para o MAC do destino.",
    "Se o destino estiver em outra sub-rede, o host usa ARP para o MAC do gateway.",
    "O frame chega ao roteador ou interface de gateway.",
    "O roteador consulta sua tabela de rotas e encaminha para a sub-rede correta.",
    "No enlace de saída, o roteador usa ARP para o host de destino, se necessário.",
    "O host de destino responde e o caminho de retorno segue a tabela de rotas dele."
  ],
  "deepDive": {
    "title": "Plano completo dos quatro /26",
    "points": [
      "192.168.10.0/26: rede 192.168.10.0, hosts 192.168.10.1–192.168.10.62, broadcast 192.168.10.63.",
      "192.168.10.64/26: rede 192.168.10.64, hosts 192.168.10.65–192.168.10.126, broadcast 192.168.10.127.",
      "192.168.10.128/26: rede 192.168.10.128, hosts 192.168.10.129–192.168.10.190, broadcast 192.168.10.191.",
      "192.168.10.192/26: rede 192.168.10.192, hosts 192.168.10.193–192.168.10.254, broadcast 192.168.10.255.",
      "A máscara decimal de /26 é 255.255.255.192, com incremento de 64 no quarto octeto.",
      "O primeiro host de cada bloco foi escolhido como gateway para facilitar padronização operacional."
    ],
    "workedExample": "Usuários usam 192.168.10.0/26 com gateway 192.168.10.1; Servidores usam 192.168.10.64/26 com gateway 192.168.10.65; Convidados usam 192.168.10.128/26 com gateway 192.168.10.129; Gerência usa 192.168.10.192/26 com gateway 192.168.10.193."
  },
  "commonMistakes": [
    {
      "mistake": "Usar 255.255.255.0 em um host que deveria estar em /26.",
      "impact": "O host acredita que todo 192.168.10.0/24 é local e tenta ARP para destinos que deveriam ir ao gateway.",
      "fix": "Configurar máscara 255.255.255.192 em todos os hosts do laboratório."
    },
    {
      "mistake": "Configurar gateway fora da sub-rede.",
      "impact": "O host não consegue sair da rede local porque o gateway não é alcançável no próprio enlace.",
      "fix": "Usar o primeiro host de cada bloco como gateway sugerido."
    },
    {
      "mistake": "Usar endereço de rede ou broadcast como host.",
      "impact": "O dispositivo pode não aceitar a configuração ou a comunicação falha de forma confusa.",
      "fix": "Reservar sempre o primeiro endereço do bloco como rede e o último como broadcast."
    },
    {
      "mistake": "Esquecer de ativar interface no roteador Cisco.",
      "impact": "A interface fica administrativamente down e não encaminha tráfego.",
      "fix": "Usar no shutdown e validar com show ip interface brief."
    },
    {
      "mistake": "Testar apenas ping e declarar tudo resolvido.",
      "impact": "Pode haver falhas de DNS, aplicação ou política que ping não mostra.",
      "fix": "Complementar com tabela de rotas, ARP e teste de porta quando aplicável."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "PC não pinga o próprio gateway.",
      "PCs da mesma sub-rede não se comunicam.",
      "PCs de sub-redes diferentes não se comunicam.",
      "Apenas um dos quatro blocos falha.",
      "Simulation Mode mostra ARP sem resposta.",
      "Roteador não possui rota conectada esperada."
    ],
    "method": [
      "Comparar IP/máscara/gateway do PC com a tabela oficial.",
      "Validar se o PC está fisicamente conectado ao switch/segmento correto.",
      "Testar ping para gateway antes de testar outra sub-rede.",
      "Validar show ip interface brief no roteador.",
      "Validar show ip route connected.",
      "Usar Simulation Mode com filtros ARP e ICMP.",
      "Introduzir ou corrigir uma falha por vez."
    ],
    "commands": [
      {
        "platform": "PC Packet Tracer",
        "command": "ipconfig\nping <gateway>\nping <pc-de-outra-sub-rede>",
        "purpose": "Validar configuração do PC, gateway local e roteamento entre sub-redes.",
        "expectedObservation": "IP/máscara/gateway corretos e pings bem-sucedidos após configuração.",
        "interpretation": "Falha no gateway aponta para IP/máscara/gateway/porta; falha entre sub-redes aponta para roteador/rota/política."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow ip route connected\nshow arp",
        "purpose": "Confirmar interfaces up/up, rotas conectadas e ARP.",
        "expectedObservation": "G0/0, G0/1, G0/2 e G0/3 ou SVIs com IPs .1, .65, .129 e .193.",
        "interpretation": "Interface down ou IP errado impede roteamento do bloco correspondente."
      },
      {
        "platform": "Cisco IOS",
        "command": "show running-config | section interface\nping 192.168.10.10\nping 192.168.10.70\nping 192.168.10.130\nping 192.168.10.194",
        "purpose": "Auditar configuração de interface e testar PCs a partir do gateway.",
        "expectedObservation": "Configuração /26 e pings respondendo quando PCs estão corretos.",
        "interpretation": "Se o roteador alcança gateway mas não PC, verificar PC, switch, cabo e máscara."
      },
      {
        "platform": "Packet Tracer Simulation",
        "command": "Simulation Mode -> Edit Filters -> ARP e ICMP -> Add Simple PDU",
        "purpose": "Observar ARP local para gateway e ICMP roteado.",
        "expectedObservation": "ARP ocorre no segmento local; roteador encaminha ICMP entre sub-redes.",
        "interpretation": "ARP tentando encontrar host remoto diretamente indica máscara errada no PC."
      },
      {
        "platform": "Cisco correção",
        "command": "configure terminal\ninterface <g0/x-ou-vlanX>\nip address <gateway> 255.255.255.192\nno shutdown\nend\nshow ip interface brief",
        "purpose": "Corrigir IP/máscara e ativar interface de gateway.",
        "expectedObservation": "Interface ou SVI up/up com gateway correto.",
        "interpretation": "Sem no shutdown ou IP correto, a sub-rede fica isolada."
      }
    ],
    "diagnosticQuestions": [
      "O PC está usando a máscara 255.255.255.192?",
      "O gateway do PC é o primeiro host do próprio bloco?",
      "A interface/SVI do roteador está up/up?",
      "O roteador possui rotas conectadas para os quatro /26?",
      "O Simulation Mode mostra ARP para gateway ou ARP indevido para destino remoto?",
      "A falha afeta um PC, uma sub-rede ou toda a topologia?"
    ],
    "decisionTree": [
      {
        "if": "PC não pinga gateway",
        "then": "Verificar IP/máscara/gateway do PC, cabo, switch e interface/SVI do gateway."
      },
      {
        "if": "PC pinga gateway, mas não outra sub-rede",
        "then": "Verificar rotas conectadas no roteador e se a interface da sub-rede destino está up/up."
      },
      {
        "if": "Simulation mostra ARP para IP de outra sub-rede",
        "then": "Máscara do PC provavelmente está errada."
      },
      {
        "if": "Um bloco inteiro falha",
        "then": "Verificar interface/SVI, cabo do switch, VLAN e gateway daquele bloco."
      },
      {
        "if": "Somente um PC falha",
        "then": "Verificar configuração do PC e porta/cabo local."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar rede, primeiro host, gateway, último host e broadcast antes de configurar.",
      "Usar menor bloco coerente com a demanda e crescimento previsto.",
      "Separar usuários, servidores, convidados e gerência em zonas distintas.",
      "Aplicar firewall ou ACL entre zonas quando houver requisito de segurança.",
      "Evitar expor a rede de gerência a usuários comuns.",
      "Sanitizar IPs, nomes de dispositivos e prints antes de compartilhar evidências."
    ],
    "badPractices": [
      "Usar /24 em todos os lugares por comodidade.",
      "Permitir tráfego total entre todas as sub-redes sem justificativa.",
      "Usar gateway aleatório sem padrão de documentação.",
      "Ignorar IPAM e manter o plano apenas na memória de uma pessoa.",
      "Fazer troubleshooting por tentativa e erro sem registrar causa."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral entre sub-redes sem controle.",
        "description": "Risco relacionado à aula 5.8 — Laboratório Packet Tracer: quatro sub-redes /26.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall/ACL entre sub-redes."
      },
      {
        "name": "Allowlists amplas que permitem blocos inteiros sem necessidade.",
        "description": "Risco relacionado à aula 5.8 — Laboratório Packet Tracer: quatro sub-redes /26.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DHCP com reservas e escopos bem definidos."
      },
      {
        "name": "Redes de convidados com acesso indevido à LAN interna.",
        "description": "Risco relacionado à aula 5.8 — Laboratório Packet Tracer: quatro sub-redes /26.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAC ou 802.1X para portas de acesso."
      },
      {
        "name": "Interface de gerência acessível por segmentos inseguros.",
        "description": "Risco relacionado à aula 5.8 — Laboratório Packet Tracer: quatro sub-redes /26.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM/CMDB com dono e função de cada bloco."
      },
      {
        "name": "Configuração manual inconsistente causando bypass de controles esperados.",
        "description": "Risco relacionado à aula 5.8 — Laboratório Packet Tracer: quatro sub-redes /26.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Logs de roteadores, switches e firewalls correlacionados no SIEM."
      }
    ],
    "mitigations": [
      "Firewall/ACL entre sub-redes.",
      "DHCP com reservas e escopos bem definidos.",
      "NAC ou 802.1X para portas de acesso.",
      "IPAM/CMDB com dono e função de cada bloco.",
      "Logs de roteadores, switches e firewalls correlacionados no SIEM.",
      "Revisão de mudanças antes de publicar novas rotas ou regras."
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
      "Firewall/ACL entre sub-redes.",
      "DHCP com reservas e escopos bem definidos.",
      "NAC ou 802.1X para portas de acesso.",
      "IPAM/CMDB com dono e função de cada bloco.",
      "Logs de roteadores, switches e firewalls correlacionados no SIEM.",
      "Revisão de mudanças antes de publicar novas rotas ou regras."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-5.8",
    "labType": "packet-tracer",
    "title": "Lab integrador 2 — Packet Tracer: quatro sub-redes /26 com roteador, PCs e falhas intencionais",
    "objective": "Configurar e validar quatro sub-redes /26 no Packet Tracer, incluindo gateways, PCs, roteamento inter-redes, falhas intencionais e solução comentada.",
    "scenario": "Você precisa montar uma topologia de filial com quatro setores usando o bloco 192.168.10.0/24 dividido em quatro /26.",
    "topology": "Roteador R1 com quatro interfaces ou router-on-a-stick, quatro switches de acesso e oito PCs distribuídos em quatro sub-redes.",
    "architecture": "Cada /26 representa uma rede/VLAN lógica: Usuários, Servidores, Câmeras/IoT e Visitantes. O roteador ou switch L3 atua como gateway de cada sub-rede.",
    "prerequisites": [
      "Packet Tracer instalado.",
      "Aulas 5.1 a 5.7 revisadas.",
      "Conhecimento básico de interface Cisco IOS."
    ],
    "tools": [
      "Cisco Packet Tracer",
      "CLI Cisco IOS",
      "Prompt dos PCs no Packet Tracer",
      "Modo Simulation para ARP/ICMP"
    ],
    "estimatedTimeMinutes": 100,
    "cost": "zero",
    "safetyNotes": [
      "Este lab é isolado no Packet Tracer.",
      "Não use endereços reais de produção em prints públicos."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Criar a matriz de endereçamento",
        "instruction": "Monte a tabela antes de configurar.",
        "artifact": "Usuários 192.168.10.0/26 GW .1; Servidores 192.168.10.64/26 GW .65; IoT 192.168.10.128/26 GW .129; Visitantes 192.168.10.192/26 GW .193.",
        "expectedOutput": "Matriz de rede, hosts, broadcast e gateway.",
        "explanation": "A configuração deve seguir uma fonte de verdade."
      },
      {
        "number": 2,
        "title": "Montar a topologia física",
        "instruction": "Adicione um roteador, quatro switches e oito PCs.",
        "configuration": "R1 ligado aos switches S1–S4; dois PCs por switch.",
        "expectedOutput": "Topologia visual montada e cabos conectados.",
        "explanation": "A topologia deixa clara a separação de cada /26."
      },
      {
        "number": 3,
        "title": "Configurar interfaces do roteador",
        "instruction": "Configure os gateways das quatro redes.",
        "command": "enable\nconfigure terminal\ninterface g0/0\n ip address 192.168.10.1 255.255.255.192\n no shutdown\ninterface g0/1\n ip address 192.168.10.65 255.255.255.192\n no shutdown\ninterface g0/2\n ip address 192.168.10.129 255.255.255.192\n no shutdown\ninterface g0/3\n ip address 192.168.10.193 255.255.255.192\n no shutdown\nend",
        "expectedOutput": "Interfaces up/up com IPs dos gateways.",
        "explanation": "Cada interface fica dentro de uma sub-rede diferente."
      },
      {
        "number": 4,
        "title": "Configurar PCs da primeira rede",
        "instruction": "Configure IP, máscara e gateway dos PCs de Usuários.",
        "configuration": "PC-U1 192.168.10.10/26 GW 192.168.10.1; PC-U2 192.168.10.11/26 GW 192.168.10.1.",
        "expectedOutput": "PCs conseguem pingar 192.168.10.1.",
        "explanation": "O primeiro teste é sempre gateway local."
      },
      {
        "number": 5,
        "title": "Configurar PCs das demais redes",
        "instruction": "Configure servidores, IoT e visitantes com IPs de suas faixas.",
        "configuration": "Servidores .70/.71 GW .65; IoT .140/.141 GW .129; Visitantes .200/.201 GW .193.",
        "expectedOutput": "Todos os PCs pingam seus gateways.",
        "explanation": "Se o gateway local falhar, não avance para teste inter-redes."
      },
      {
        "number": 6,
        "title": "Verificar estado das interfaces",
        "instruction": "No roteador, confirme endereços e estado operacional.",
        "command": "show ip interface brief",
        "expectedOutput": "Todas as interfaces usadas aparecem up/up com os IPs corretos.",
        "explanation": "Interface administratively down é erro clássico em lab Cisco."
      },
      {
        "number": 7,
        "title": "Testar conectividade local e entre redes",
        "instruction": "Teste pings entre PCs da mesma rede e de redes diferentes.",
        "command": "ping 192.168.10.70\nping 192.168.10.140\nping 192.168.10.200",
        "expectedOutput": "Pings inter-redes bem-sucedidos quando gateways estão corretos.",
        "explanation": "O roteador conhece diretamente todas as redes conectadas."
      },
      {
        "number": 8,
        "title": "Observar ARP e ICMP em Simulation",
        "instruction": "Use o modo Simulation para ver ARP antes do ICMP.",
        "analysisTask": "Filtrar ARP e ICMP; observar resolução do MAC do gateway e envio do Echo Request.",
        "expectedOutput": "ARP para gateway local e ICMP roteado entre sub-redes.",
        "explanation": "Mesmo com subnetting, entrega local ainda depende de camada 2."
      },
      {
        "number": 9,
        "title": "Introduzir falha de máscara",
        "instruction": "Altere um PC de Visitantes para máscara /24 e teste comunicação.",
        "configuration": "PC-V1: 192.168.10.200 255.255.255.0 GW 192.168.10.193.",
        "expectedOutput": "Comportamento anômalo em testes para redes que o host passa a considerar locais.",
        "explanation": "Máscara errada muda a decisão local/remoto."
      },
      {
        "number": 10,
        "title": "Introduzir falha de gateway",
        "instruction": "Configure gateway errado em um PC de Servidores.",
        "configuration": "PC-S1 gateway 192.168.10.1 em vez de 192.168.10.65.",
        "expectedOutput": "Ping para o gateway correto falha ou tráfego remoto não sai adequadamente.",
        "explanation": "Gateway precisa pertencer à mesma sub-rede do host."
      },
      {
        "number": 11,
        "title": "Corrigir falhas e validar regressão",
        "instruction": "Volte máscara e gateway corretos e repita os testes.",
        "command": "show ip route\nshow running-config | section interface",
        "expectedOutput": "Rotas conectadas corretas e PCs comunicando conforme esperado.",
        "explanation": "Correção profissional sempre inclui teste de regressão."
      },
      {
        "number": 12,
        "title": "Documentar evidências",
        "instruction": "Cole prints ou transcrições dos testes em um relatório curto.",
        "artifact": "Relatório com matriz, topologia, show ip interface brief, testes de ping, falhas e correções.",
        "expectedOutput": "Relatório reproduzível.",
        "explanation": "Evidência é parte do aprendizado e da operação."
      }
    ],
    "expectedResult": "Topologia Packet Tracer funcional com quatro /26, gateways configurados, conectividade validada e falhas intencionais diagnosticadas/corrigidas.",
    "validation": [
      {
        "check": "Interfaces do roteador up/up",
        "command": "show ip interface brief",
        "expected": "g0/0, g0/1, g0/2 e g0/3 up/up",
        "ifFails": "Aplicar no shutdown e conferir cabos."
      },
      {
        "check": "Rotas conectadas presentes",
        "command": "show ip route",
        "expected": "C 192.168.10.0/26, C 192.168.10.64/26, C 192.168.10.128/26, C 192.168.10.192/26",
        "ifFails": "Verificar IP/máscara nas interfaces."
      },
      {
        "check": "PCs pingam gateway local",
        "command": "ping <gateway-da-sub-rede>",
        "expected": "Success rate alto",
        "ifFails": "Checar IP, máscara, gateway e switch."
      },
      {
        "check": "PCs comunicam entre sub-redes",
        "command": "ping <PC-de-outra-sub-rede>",
        "expected": "Resposta ICMP",
        "ifFails": "Checar gateway e rotas conectadas."
      },
      {
        "check": "Falha de máscara é explicada",
        "method": "Comparar decisão local/remoto antes/depois",
        "expected": "Aluno identifica erro de máscara",
        "ifFails": "Revisar AND lógico e CIDR."
      },
      {
        "check": "Falha de gateway é explicada",
        "method": "Gateway pertence à mesma sub-rede?",
        "expected": "Gateway correto por /26",
        "ifFails": "Recalcular faixa útil."
      },
      {
        "check": "Relatório contém evidências",
        "method": "Conferir matriz, prints e comandos",
        "expected": "Evidências suficientes para auditoria do lab",
        "ifFails": "Reexecutar testes e registrar resultados."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Interface aparece administratively down",
        "probableCause": "Faltou no shutdown.",
        "howToConfirm": "show ip interface brief",
        "fix": "Entrar na interface e executar no shutdown."
      },
      {
        "symptom": "PC pinga gateway, mas não outra rede",
        "probableCause": "Gateway de destino ou rota conectada incorreta.",
        "howToConfirm": "show ip route e IP config dos PCs.",
        "fix": "Corrigir interface ou gateway."
      },
      {
        "symptom": "PC tenta ARP para host de outra sub-rede",
        "probableCause": "Máscara configurada como /24 em vez de /26.",
        "howToConfirm": "Ver config IP do PC e Simulation Mode.",
        "fix": "Aplicar 255.255.255.192."
      },
      {
        "symptom": "Ping intermitente após correção",
        "probableCause": "ARP cache antigo ou teste antes da convergência do lab.",
        "howToConfirm": "Repetir ping e observar Simulation.",
        "fix": "Aguardar ou reiniciar teste."
      }
    ],
    "improvements": [
      "Converter a topologia para router-on-a-stick com VLANs.",
      "Adicionar ACL para visitantes acessarem somente Internet simulada.",
      "Criar DHCP pools por sub-rede.",
      "Adicionar um servidor DNS interno e testar resolução de nomes."
    ],
    "evidenceToCollect": [
      "Matriz de endereçamento",
      "Print da topologia",
      "show ip interface brief",
      "show ip route",
      "Pings locais",
      "Pings inter-redes",
      "Print da falha de máscara",
      "Print da falha de gateway",
      "Relatório de correção"
    ],
    "questions": [
      "Por que cada /26 tem gateway próprio?",
      "O que muda quando a máscara de um PC está como /24?",
      "Por que o roteador não precisa de rota estática para redes diretamente conectadas?"
    ],
    "challenge": "Adicione uma quinta rede de gestão usando outro bloco privado e explique por que ela não cabe no /24 original já totalmente dividido em quatro /26.",
    "solution": "O /24 192.168.10.0/24 foi inteiramente consumido pelos quatro /26. Para adicionar gestão, é necessário outro bloco, um prefixo maior ou redesign com VLSM, dependendo da quantidade de hosts e das políticas desejadas."
  },
  "mentorQuestions": [
    "Por que o PC faz ARP para o gateway quando o destino está em outra sub-rede?",
    "Como você provaria que uma falha é de máscara e não de roteamento?",
    "Quais evidências você coletaria antes de alterar uma configuração em produção?"
  ],
  "quiz": [
    {
      "question": "Qual é a máscara decimal de um /26?",
      "options": [
        "255.255.255.0",
        "255.255.255.128",
        "255.255.255.192",
        "255.255.255.224"
      ],
      "answer": "255.255.255.192",
      "explanation": "/26 significa 26 bits de rede. No quarto octeto, a máscara é 192."
    },
    {
      "question": "Qual é o broadcast da rede 192.168.10.64/26?",
      "options": [
        "192.168.10.63",
        "192.168.10.64",
        "192.168.10.126",
        "192.168.10.127"
      ],
      "answer": "192.168.10.127",
      "explanation": "O bloco /26 iniciado em 64 termina em 127. O último endereço é broadcast."
    },
    {
      "question": "Qual gateway sugerido foi usado para a sub-rede 192.168.10.128/26?",
      "options": [
        "192.168.10.127",
        "192.168.10.128",
        "192.168.10.129",
        "192.168.10.191"
      ],
      "answer": "192.168.10.129",
      "explanation": "O primeiro host útil do bloco 128/26 é 129."
    },
    {
      "question": "Se um PC com /26 usa máscara /24 por engano, qual sintoma pode aparecer?",
      "options": [
        "Ele sempre terá mais segurança",
        "Ele pode tentar ARP para destinos que deveriam ir ao gateway",
        "Ele perde automaticamente o IP",
        "O switch bloqueia a porta"
      ],
      "answer": "Ele pode tentar ARP para destinos que deveriam ir ao gateway",
      "explanation": "A máscara errada altera a decisão local/remota do host."
    },
    {
      "question": "Quantos hosts úteis tradicionais existem em um /26?",
      "options": [
        "30",
        "62",
        "64",
        "126"
      ],
      "answer": "62",
      "explanation": "Um /26 tem 64 endereços totais. Rede e broadcast são reservados no modelo tradicional."
    },
    {
      "question": "Qual teste deve vir antes de testar comunicação entre sub-redes?",
      "options": [
        "Ping para a Internet",
        "Ping para gateway local",
        "Teste HTTP",
        "Traceroute para DNS público"
      ],
      "answer": "Ping para gateway local",
      "explanation": "Se o host não alcança o gateway local, não faz sentido testar destinos remotos."
    }
  ],
  "flashcards": [
    {
      "front": "O que é um /26?",
      "back": "Um prefixo com 26 bits de rede e 6 bits de host, equivalente à máscara 255.255.255.192."
    },
    {
      "front": "Qual é o bloco mágico do /26 no quarto octeto?",
      "back": "64, porque 256 - 192 = 64."
    },
    {
      "front": "Quais são as quatro redes /26 dentro de 192.168.10.0/24?",
      "back": "192.168.10.0/26, 192.168.10.64/26, 192.168.10.128/26 e 192.168.10.192/26."
    },
    {
      "front": "Por que o gateway precisa estar na mesma sub-rede do host?",
      "back": "Porque o host precisa alcançá-lo diretamente no enlace local usando ARP."
    },
    {
      "front": "O que o Simulation Mode ajuda a visualizar?",
      "back": "ARP, ICMP, encapsulamento e caminho dos pacotes no Packet Tracer."
    },
    {
      "front": "Qual erro comum altera a decisão local/remota?",
      "back": "Máscara configurada incorretamente, como usar /24 onde deveria ser /26."
    }
  ],
  "exercises": [
    {
      "title": "Calcule os quatro /26",
      "prompt": "A partir de 192.168.10.0/24, liste rede, primeiro host, último host e broadcast das quatro sub-redes /26.",
      "expectedAnswer": "0-63, 64-127, 128-191 e 192-255, com hosts úteis entre rede e broadcast."
    },
    {
      "title": "Identifique o erro",
      "prompt": "Um PC está em 192.168.10.70/26 com gateway 192.168.10.1. Qual é o problema?",
      "expectedAnswer": "192.168.10.70 pertence à rede 192.168.10.64/26; seu gateway deveria estar nessa sub-rede, por exemplo 192.168.10.65."
    },
    {
      "title": "Gateway correto",
      "prompt": "Qual gateway você escolheria para a rede 192.168.10.192/26 usando o primeiro host útil?",
      "expectedAnswer": "192.168.10.193."
    },
    {
      "title": "Troubleshooting",
      "prompt": "Um host pinga outro na mesma sub-rede, mas não pinga outra sub-rede. Liste três causas prováveis.",
      "expectedAnswer": "Gateway ausente/incorreto, interface do roteador down, rota ausente, ACL bloqueando ou gateway do destino incorreto."
    }
  ],
  "challenge": {
    "title": "Troubleshooting graduado do laboratório /26",
    "scenario": "A topologia deveria estar pronta, mas três erros foram inseridos: uma máscara /24, um gateway de outro bloco e uma interface/SVI desligada.",
    "tasks": [
      "Identificar cada erro por evidência.",
      "Corrigir uma falha por vez.",
      "Validar conectividade local e entre sub-redes após cada correção.",
      "Explicar no relatório por que cada erro causava aquele sintoma.",
      "Propor uma próxima melhoria de segurança com ACL/firewall."
    ],
    "expectedDeliverables": [
      "Tabela /26 final",
      "Configuração R1 ou SVIs",
      "Configuração dos PCs",
      "Evidência show/ping antes e depois",
      "Análise das três falhas",
      "Proposta de segmentação segura"
    ],
    "rubric": [
      {
        "criterion": "Cálculo correto",
        "points": 20,
        "description": "Blocos /26, gateways, hosts e broadcasts corretos."
      },
      {
        "criterion": "Configuração funcional",
        "points": 25,
        "description": "Roteador/SVIs e PCs configurados corretamente."
      },
      {
        "criterion": "Validação objetiva",
        "points": 20,
        "description": "Inclui pings, show ip interface brief, show ip route e Simulation Mode."
      },
      {
        "criterion": "Troubleshooting",
        "points": 25,
        "description": "Identifica e corrige as três falhas por evidência."
      },
      {
        "criterion": "Segurança e documentação",
        "points": 10,
        "description": "Propõe política entre zonas e entrega relatório claro."
      }
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do Packet Tracer /26",
    "steps": [
      "Dividir /24 em quatro blocos de 64 endereços: 0, 64, 128 e 192.",
      "Reservar o primeiro host de cada bloco como gateway: .1, .65, .129 e .193.",
      "Configurar R1 ou SVIs com máscara 255.255.255.192 e no shutdown.",
      "Configurar PCs com IP dentro do próprio bloco e gateway correspondente.",
      "Validar show ip interface brief e show ip route connected.",
      "Testar ping PC -> gateway, PC -> PC local e PC -> PC remoto.",
      "No Simulation Mode, observar ARP para gateway e ICMP roteado.",
      "Falha de máscara /24: corrigir para /26 ao perceber ARP/decisão local errada.",
      "Falha de gateway errado: corrigir gateway para o primeiro host do próprio bloco.",
      "Falha de interface shutdown: usar show ip interface brief e no shutdown."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Usar 255.255.255.0 em todos os PCs.",
        "whyItIsWrong": "Isso desfaz o objetivo de quatro /26 e muda a decisão local/remota."
      },
      {
        "answer": "Usar o mesmo gateway para todas as sub-redes.",
        "whyItIsWrong": "Cada PC precisa de gateway no próprio bloco local."
      },
      {
        "answer": "Criar rotas estáticas entre redes conectadas diretamente.",
        "whyItIsWrong": "Rotas conectadas já aparecem quando interfaces/SVIs estão up/up com IP correto."
      }
    ],
    "finalAnswer": "A topologia correta tem quatro /26, gateways .1/.65/.129/.193, PCs em seus blocos, interfaces up/up e rotas conectadas no R1. A validação exige ping local, ping entre sub-redes, show ip interface brief, show ip route connected e análise ARP/ICMP no Simulation Mode."
  },
  "glossary": [
    {
      "term": "Packet Tracer",
      "definition": "Simulador de redes da Cisco usado para criar topologias, configurar dispositivos e observar tráfego."
    },
    {
      "term": "/26",
      "definition": "Prefixo IPv4 com 26 bits de rede e 6 bits de host, totalizando 64 endereços por sub-rede."
    },
    {
      "term": "Gateway",
      "definition": "Dispositivo ou interface usada por hosts para alcançar redes remotas."
    },
    {
      "term": "Simulation Mode",
      "definition": "Modo do Packet Tracer que permite observar eventos e pacotes como ARP e ICMP."
    },
    {
      "term": "Conectividade local",
      "definition": "Comunicação entre hosts da mesma sub-rede ou entre host e gateway local."
    },
    {
      "term": "Conectividade inter-sub-rede",
      "definition": "Comunicação entre redes diferentes, normalmente exigindo roteamento."
    }
  ],
  "references": [
    "Cisco Packet Tracer — prática de simulação de redes",
    "RFC 791 — Internet Protocol",
    "RFC 4632 — Classless Inter-domain Routing",
    "Conceitos estudados nas aulas 4.1 a 5.7 do curso Redes e Network v2.0"
  ],
  "relatedCourses": [
    {
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "description": "Relaciona a matriz de sub-redes com IaC, automação e validação em pipelines."
    },
    {
      "title": "Enterprise Identity, IAM e Segurança de Identidades",
      "description": "Complementa segmentação de rede com identidade, autorização e acesso mínimo."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Automação e IaC",
      "reason": "O plano de endereçamento do laboratório pode ser transformado em variáveis e validações de infraestrutura."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso mínimo e Zero Trust",
      "reason": "Sub-redes e políticas de acesso devem trabalhar junto com identidade e autorização."
    }
  ],
  "progressRules": {
    "requiredQuizScore": 70,
    "requiredLabCompletion": true,
    "requiredFlashcardsReviewed": 4,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.9"
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
  "impacts": {
    "operational": [
      "Um lab Packet Tracer com endereçamento documentado cria memória operacional para mudanças reais de VLAN, gateway e sub-rede.",
      "A topologia com quatro /26 obriga o aluno a validar configuração antes de culpar roteamento ou firewall.",
      "Falhas intencionais treinam rollback, teste de regressão e relatório técnico reproduzível."
    ],
    "financial": [
      "Packet Tracer permite praticar sem custo de hardware físico, cloud ou appliance.",
      "Erros de máscara/gateway em produção podem gerar indisponibilidade e horas de suporte; treinar em laboratório reduz esse risco.",
      "Planejamento correto de sub-redes evita retrabalho caro, renumeração futura e conflitos em VPN/cloud."
    ],
    "security": [
      "Sub-redes separam domínios, mas não substituem firewall, ACL, identidade e monitoramento.",
      "Convidados, servidores e gerência precisam virar zonas com política explícita; roteamento livre entre todas é apenas etapa didática.",
      "Documentar gateways e fluxos facilita auditoria, revisão de regras e investigação de movimento lateral."
    ]
  }
};
