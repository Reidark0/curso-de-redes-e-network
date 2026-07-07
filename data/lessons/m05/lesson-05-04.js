export const lesson0504 = {
  "id": "5.4",
  "moduleId": "m05",
  "order": 4,
  "title": "Método do bloco mágico",
  "subtitle": "Como calcular rapidamente sub-redes IPv4 encontrando o octeto interessante, o tamanho do bloco, a rede, o broadcast e os hosts utilizáveis.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 235,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "cidr",
    "máscara",
    "bloco mágico",
    "rede",
    "broadcast",
    "hosts",
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
      "reason": "A aula 5.1 mostrou por que subnetting existe e por que dividir redes reduz problemas de escala, broadcast e segurança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.2",
      "reason": "A aula 5.2 ensinou CIDR, máscara e quantidade de hosts, base matemática do método do bloco mágico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m05",
      "lesson": "5.3",
      "reason": "A aula 5.3 ensinou rede, broadcast, primeiro host e último host, que são exatamente os resultados calculados pelo método."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "Endereço de rede, hosts e broadcast foram introduzidos antes do subnetting."
    }
  ],
  "objectives": [
    "Explicar por que o método do bloco mágico existe e qual problema prático ele resolve.",
    "Identificar o octeto interessante de uma máscara IPv4.",
    "Calcular o tamanho do bloco usando 256 menos o valor da máscara no octeto interessante.",
    "Encontrar a rede correta de um IP dentro de um prefixo.",
    "Calcular broadcast, primeiro host e último host a partir do bloco encontrado.",
    "Aplicar o método em prefixos comuns como /25, /26, /27, /28, /29 e /30.",
    "Reconhecer limites, exceções e riscos de aplicar o método mecanicamente sem contexto operacional."
  ],
  "learningOutcomes": [
    "Dado um IP e CIDR, o aluno identifica o octeto interessante.",
    "Dado um IP e máscara, o aluno calcula o tamanho do bloco.",
    "Dado um IP dentro de uma sub-rede, o aluno encontra rede, broadcast, primeiro host e último host.",
    "Dado um cenário corporativo, o aluno valida gateway, DHCP e firewall usando o método.",
    "Dado um erro de conectividade, o aluno verifica se o IP pertence ao bloco esperado."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Até agora você aprendeu o significado de CIDR, máscara, bits de host, rede, broadcast, primeiro host e último host. O próximo desafio é conseguir calcular tudo isso com velocidade e segurança quando alguém entrega um endereço como <code>192.168.10.77/26</code> e pergunta: esse IP está em qual sub-rede?</p>\n<p>Em ambientes reais, esse cálculo aparece quando você configura VLAN, DHCP, gateway, firewall, VPN, subnet cloud, regra de security group, IPAM, NAT, rota estática ou troubleshooting. Você não pode depender apenas de uma calculadora online, porque em incidentes, provas, mudanças emergenciais e troubleshooting de campo você precisa entender o raciocínio.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> o método do bloco mágico é uma técnica prática para descobrir rapidamente onde uma sub-rede começa e termina sem converter todos os 32 bits para binário a cada exercício.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>O subnetting nasceu da necessidade de dividir blocos IPv4 em segmentos menores e mais úteis. Na origem do IPv4, redes classful pareciam suficientes, mas desperdiçavam endereços e dificultavam crescimento. Com CIDR, tornou-se possível escolher prefixos mais flexíveis, como <code>/25</code>, <code>/26</code>, <code>/27</code>, <code>/28</code> e <code>/29</code>.</p>\n<p>Essa flexibilidade trouxe um custo cognitivo: as fronteiras das sub-redes deixaram de coincidir sempre com os pontos da notação decimal. Um <code>/24</code> é intuitivo porque muda no quarto octeto de 0 a 255. Mas um <code>/26</code> divide esse mesmo octeto em blocos de 64. Um <code>/27</code> divide em blocos de 32. Um <code>/28</code> divide em blocos de 16.</p>\n<p>O chamado bloco mágico não é uma regra oficial do protocolo; é uma técnica didática e operacional. Ele traduz o cálculo binário para um procedimento decimal rápido: encontre o octeto onde a máscara deixa de ser 255 e ainda não virou 0, subtraia esse valor de 256, e use o resultado como tamanho do bloco.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema é que muitos erros de subnetting nascem de uma falsa intuição visual. A pessoa olha para <code>192.168.10.77/26</code> e supõe que ele pertence a <code>192.168.10.0/26</code>, porque o endereço começa com <code>192.168.10</code>. Mas isso está incompleto: dentro do quarto octeto existem blocos menores.</p>\n<table class=\"data-table\"><thead><tr><th>IP/CIDR</th><th>Suposição errada</th><th>Cálculo correto</th><th>Impacto</th></tr></thead><tbody>\n<tr><td><code>192.168.10.77/26</code></td><td>Rede <code>.0</code></td><td>Rede <code>.64</code>, broadcast <code>.127</code></td><td>Gateway e DHCP podem ser planejados no bloco errado</td></tr>\n<tr><td><code>10.20.30.200/27</code></td><td>Rede <code>.192</code> ou <code>.0</code> por chute</td><td>Rede <code>.192</code>, broadcast <code>.223</code></td><td>Firewall pode liberar faixa incorreta</td></tr>\n<tr><td><code>172.16.8.14/28</code></td><td>Broadcast <code>.255</code></td><td>Rede <code>.0</code>, broadcast <code>.15</code></td><td>Endereço final pode ser usado indevidamente</td></tr>\n<tr><td><code>192.168.50.130/25</code></td><td>Rede <code>.0</code></td><td>Rede <code>.128</code>, broadcast <code>.255</code></td><td>Host pode ser colocado em VLAN ou pool errado</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Problema real:</strong> subnetting não é adivinhação. Uma sub-rede tem fronteiras matemáticas. O bloco mágico ajuda a encontrar essas fronteiras de forma repetível.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>Existem três formas comuns de calcular sub-redes. A primeira é converter tudo para binário. Ela é excelente para entender o funcionamento interno, mas pode ser lenta no dia a dia. A segunda é decorar tabelas de prefixos. Ela é rápida, mas perigosa quando o aluno não entende o porquê. A terceira é usar o bloco mágico, que fica no meio: rápido o suficiente para operação e fundamentado o suficiente para auditoria.</p>\n<table class=\"comparison-table\"><thead><tr><th>Método</th><th>Vantagem</th><th>Limitação</th><th>Quando usar</th></tr></thead><tbody>\n<tr><td>Binário completo</td><td>Mostra exatamente bits de rede e host</td><td>Mais lento</td><td>Aprendizado profundo, provas, debugging complexo</td></tr>\n<tr><td>Tabela decorada</td><td>Muito rápida</td><td>Gera erro se usada sem entendimento</td><td>Operação madura, revisão, validação rápida</td></tr>\n<tr><td>Bloco mágico</td><td>Equilibra rapidez e raciocínio</td><td>Exige saber máscara e octeto interessante</td><td>Subnetting prático, planejamento, troubleshooting</td></tr>\n</tbody></table>\n<p>O caminho recomendado neste curso é: entender binário, aprender CIDR, calcular rede/broadcast, dominar bloco mágico e só depois usar tabelas como atalho.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p>O <strong>método do bloco mágico</strong> usa a máscara decimal para descobrir de quanto em quanto as sub-redes avançam no octeto onde a divisão acontece.</p>\n<div class=\"definition-box\"><strong>Definição:</strong> o bloco mágico é calculado por <code>256 - valor_da_máscara_no_octeto_interessante</code>. O resultado mostra o intervalo entre os inícios das sub-redes naquele octeto.</div>\n<p>O <strong>octeto interessante</strong> é o primeiro octeto da máscara que não é <code>255</code> e também não é <code>0</code>. Por exemplo, na máscara <code>255.255.255.192</code>, o octeto interessante é o quarto octeto, valor <code>192</code>. Então o bloco mágico é <code>256 - 192 = 64</code>.</p>\n<table class=\"data-table\"><thead><tr><th>CIDR</th><th>Máscara</th><th>Octeto interessante</th><th>Bloco mágico</th><th>Inícios comuns no octeto</th></tr></thead><tbody>\n<tr><td><code>/25</code></td><td><code>255.255.255.128</code></td><td>4º octeto</td><td>128</td><td>0, 128</td></tr>\n<tr><td><code>/26</code></td><td><code>255.255.255.192</code></td><td>4º octeto</td><td>64</td><td>0, 64, 128, 192</td></tr>\n<tr><td><code>/27</code></td><td><code>255.255.255.224</code></td><td>4º octeto</td><td>32</td><td>0, 32, 64, 96, 128...</td></tr>\n<tr><td><code>/28</code></td><td><code>255.255.255.240</code></td><td>4º octeto</td><td>16</td><td>0, 16, 32, 48, 64...</td></tr>\n<tr><td><code>/29</code></td><td><code>255.255.255.248</code></td><td>4º octeto</td><td>8</td><td>0, 8, 16, 24, 32...</td></tr>\n<tr><td><code>/30</code></td><td><code>255.255.255.252</code></td><td>4º octeto</td><td>4</td><td>0, 4, 8, 12, 16...</td></tr>\n</tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Por baixo do método decimal, o que acontece continua sendo binário. A máscara define quais bits são rede e quais bits são host. Quando a máscara no octeto interessante é <code>192</code>, em binário ela é <code>11000000</code>. Isso significa que dois bits daquele octeto pertencem à rede e seis pertencem aos hosts. Se há seis bits de host, o bloco tem <code>2^6 = 64</code> endereços.</p>\n<p>O atalho <code>256 - máscara</code> funciona porque cada octeto tem 256 valores possíveis: de 0 a 255. Se a máscara deixa 64 possibilidades naquele octeto, os blocos começam de 64 em 64.</p>\n<ol class=\"flow-list\"><li><strong>Receba IP/CIDR:</strong> exemplo <code>192.168.10.77/26</code>.</li><li><strong>Converta CIDR em máscara:</strong> <code>/26 = 255.255.255.192</code>.</li><li><strong>Encontre o octeto interessante:</strong> quarto octeto, valor 192.</li><li><strong>Calcule o bloco:</strong> <code>256 - 192 = 64</code>.</li><li><strong>Liste os inícios:</strong> <code>0, 64, 128, 192</code>.</li><li><strong>Veja onde o IP cai:</strong> <code>77</code> está entre <code>64</code> e <code>127</code>.</li><li><strong>Conclua:</strong> rede <code>192.168.10.64</code>, broadcast <code>192.168.10.127</code>, hosts <code>.65</code> até <code>.126</code>.</li></ol>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em arquitetura de redes, o bloco mágico não é apenas uma conta. Ele ajuda a garantir que a topologia lógica esteja coerente com VLANs, gateways, rotas, DHCP, firewall e documentação.</p>\n<table class=\"data-table\"><thead><tr><th>Camada/Componente</th><th>Uso do cálculo</th><th>Exemplo</th></tr></thead><tbody>\n<tr><td>VLAN</td><td>Cada VLAN costuma ter uma sub-rede própria</td><td>VLAN 20 = <code>10.10.20.0/26</code></td></tr>\n<tr><td>Gateway</td><td>Precisa estar dentro da faixa utilizável</td><td><code>10.10.20.1</code> se a rede começa em <code>.0</code></td></tr>\n<tr><td>DHCP</td><td>Pool não deve incluir rede, broadcast, gateway ou reservas</td><td>Pool <code>.10</code> a <code>.60</code></td></tr>\n<tr><td>Firewall</td><td>Regra deve usar o CIDR correto</td><td>Permitir <code>10.10.20.0/26</code>, não <code>10.10.0.0/16</code></td></tr>\n<tr><td>Cloud</td><td>Subnets devem respeitar CIDR, reservas e não sobreposição</td><td>Subnet privada para aplicação e subnet isolada para banco</td></tr>\n<tr><td>IPAM</td><td>Documentação precisa bater com o cálculo</td><td>Tabela de rede, hosts, broadcast e dono</td></tr>\n</tbody></table>\n<p>Uma arquitetura saudável evita que cálculo fique apenas na cabeça de uma pessoa. O resultado do bloco mágico deve aparecer em diagrama, IPAM, IaC, regra de firewall, documentação de DHCP e plano de troubleshooting.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Imagine uma rua com casas numeradas de 0 a 255. O condomínio decidiu dividir essa rua em quadras. Se cada quadra tem 64 casas, as quadras começam nos números 0, 64, 128 e 192. Se alguém mora na casa 77, você sabe que essa pessoa está na quadra que começa em 64 e termina em 127.</p>\n<p>No subnetting, o bloco mágico é o tamanho da quadra. A rede é o primeiro número da quadra. O broadcast é o último. Os hosts são as casas internas. O gateway costuma ser uma casa interna escolhida como portaria de saída.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> em redes, não basta pertencer à mesma quadra. É preciso considerar máscara, gateway, ARP, VLAN, firewall, reservas, rotas e políticas de segurança.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Você recebeu o IP <code>192.168.1.130/25</code>. Qual é a rede?</p>\n<ol class=\"flow-list\"><li><code>/25</code> equivale a <code>255.255.255.128</code>.</li><li>O octeto interessante é o quarto octeto: <code>128</code>.</li><li>Bloco mágico: <code>256 - 128 = 128</code>.</li><li>Os blocos começam em <code>.0</code> e <code>.128</code>.</li><li>O número <code>130</code> cai no bloco <code>.128</code> até <code>.255</code>.</li><li>Rede: <code>192.168.1.128/25</code>.</li><li>Broadcast: <code>192.168.1.255</code>.</li><li>Primeiro host: <code>192.168.1.129</code>.</li><li>Último host: <code>192.168.1.254</code>.</li></ol>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Uma empresa criou a VLAN 30 para impressoras com o bloco <code>10.50.30.0/27</code>. Um técnico tenta configurar uma impressora com <code>10.50.30.63/27</code> e gateway <code>10.50.30.1</code>. Há dois problemas: para <code>/27</code>, o bloco mágico é <code>32</code>; os blocos são <code>.0-.31</code>, <code>.32-.63</code>, <code>.64-.95</code> e assim por diante.</p>\n<p>O endereço <code>10.50.30.63</code> é broadcast do segundo bloco, não host. Além disso, se a impressora estiver no bloco <code>10.50.30.32/27</code>, o gateway <code>10.50.30.1</code> está no bloco anterior. O gateway correto deveria estar entre <code>.33</code> e <code>.62</code>, conforme a convenção da empresa.</p>\n<div class=\"callout callout--warning\"><strong>Resultado operacional:</strong> o problema não é cabo, DNS ou aplicação. É cálculo de subnetting incorreto.</div>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, você pode criar uma VPC/VNet com várias subnets. Um erro comum é criar uma subnet pequena demais ou sobreposta a outra rede conectada por VPN. O método do bloco mágico ajuda a auditar rapidamente se os blocos são contíguos, se há sobreposição e se o tamanho atende ao crescimento.</p>\n<p>Exemplo: uma VPC usa <code>10.80.0.0/24</code>. Você quer quatro subnets <code>/26</code>: pública, aplicação, banco e serviços internos. O bloco mágico de <code>/26</code> é 64. Logo os blocos são <code>10.80.0.0/26</code>, <code>10.80.0.64/26</code>, <code>10.80.0.128/26</code> e <code>10.80.0.192/26</code>.</p>\n<div class=\"callout\"><strong>Atenção:</strong> provedores cloud podem reservar endereços adicionais dentro de cada subnet. Portanto, além do cálculo IPv4 clássico, sempre considere as reservas da plataforma e deixe folga de capacidade.</div>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, o cálculo aparece em Terraform, Ansible, Kubernetes, runners self-hosted, pipelines que validam infraestrutura e políticas como código. Um módulo Terraform que cria subnets precisa impedir sobreposição, CIDRs grandes demais e subnets pequenas demais para o serviço.</p>\n<p>Um pipeline maduro pode validar se <code>10.100.2.64/26</code> não se sobrepõe a <code>10.100.2.0/26</code>, se a subnet de banco não está em uma faixa pública, se a subnet de runners não compartilha bloco com usuários finais e se regras de firewall usam o menor CIDR possível.</p>\n<p>O bloco mágico ajuda o profissional a revisar o plano antes do merge. Sem esse entendimento, a equipe pode aprovar código que funciona sintaticamente, mas cria risco operacional e de segurança.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Na segurança, subnetting incorreto pode abrir acesso demais. Se o requisito é permitir somente a subnet de administração <code>10.10.10.64/27</code>, liberar <code>10.10.10.0/24</code> por preguiça aumenta a superfície de ataque. Se um SOC interpreta logs sem entender CIDR, pode atribuir tráfego à VLAN errada.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Causa</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Allowlist ampla</td><td>Erro ou comodidade no CIDR</td><td>Usar menor prefixo necessário e revisar por pares</td></tr>\n<tr><td>Sobreposição VPN/cloud</td><td>Blocos mal calculados</td><td>IPAM, validação automática e revisão de arquitetura</td></tr>\n<tr><td>Segmentação falsa</td><td>VLANs diferentes usando blocos incoerentes</td><td>Planejar subnet por função e validar gateway</td></tr>\n<tr><td>Logs mal interpretados</td><td>Analista não conhece limites do bloco</td><td>Documentar CIDR, dono, VLAN e criticidade</td></tr>\n</tbody></table>\n<div class=\"callout callout--security\"><strong>Regra de segurança:</strong> CIDR é controle de escopo. Um erro de prefixo pode equivaler a liberar dezenas, centenas ou milhares de hosts indevidamente.</div>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama mostra o método do bloco mágico aplicado a <code>192.168.10.77/26</code>.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 960 430\" role=\"img\" aria-labelledby=\"m05l04-title m05l04-desc\">\n<title id=\"m05l04-title\">Método do bloco mágico para subnetting IPv4</title>\n<desc id=\"m05l04-desc\">Diagrama mostrando IP, máscara, octeto interessante, bloco mágico e identificação da sub-rede correta.</desc>\n<defs><marker id=\"m05l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"40\" y=\"35\" width=\"880\" height=\"350\" rx=\"18\" class=\"svg-zone\"></rect>\n<text x=\"60\" y=\"70\" class=\"svg-label\">Exemplo: 192.168.10.77/26</text>\n<g class=\"svg-node svg-node--client\"><rect x=\"70\" y=\"105\" width=\"190\" height=\"105\" rx=\"14\"></rect><text x=\"92\" y=\"138\" class=\"svg-label\">1. Máscara</text><text x=\"92\" y=\"168\" class=\"svg-label--small\">/26 = 255.255.255.192</text><text x=\"92\" y=\"193\" class=\"svg-label--small\">octeto interessante: 192</text></g>\n<g class=\"svg-node svg-node--switch\"><rect x=\"300\" y=\"105\" width=\"180\" height=\"105\" rx=\"14\"></rect><text x=\"322\" y=\"138\" class=\"svg-label\">2. Bloco</text><text x=\"322\" y=\"168\" class=\"svg-label--small\">256 - 192 = 64</text><text x=\"322\" y=\"193\" class=\"svg-label--small\">passo: 64</text></g>\n<g class=\"svg-node svg-node--router\"><rect x=\"520\" y=\"105\" width=\"180\" height=\"105\" rx=\"14\"></rect><text x=\"542\" y=\"138\" class=\"svg-label\">3. Inícios</text><text x=\"542\" y=\"168\" class=\"svg-label--small\">0, 64, 128, 192</text><text x=\"542\" y=\"193\" class=\"svg-label--small\">77 cai no bloco 64</text></g>\n<g class=\"svg-node svg-node--firewall\"><rect x=\"735\" y=\"105\" width=\"150\" height=\"105\" rx=\"14\"></rect><text x=\"755\" y=\"138\" class=\"svg-label\">4. Resultado</text><text x=\"755\" y=\"168\" class=\"svg-label--small\">Rede: .64</text><text x=\"755\" y=\"193\" class=\"svg-label--small\">Broadcast: .127</text></g>\n<line x1=\"260\" y1=\"158\" x2=\"300\" y2=\"158\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l04-arrow)\"></line>\n<line x1=\"480\" y1=\"158\" x2=\"520\" y2=\"158\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l04-arrow)\"></line>\n<line x1=\"700\" y1=\"158\" x2=\"735\" y2=\"158\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l04-arrow)\"></line>\n<g class=\"svg-node svg-node--security\"><rect x=\"90\" y=\"255\" width=\"775\" height=\"78\" rx=\"14\"></rect><text x=\"115\" y=\"287\" class=\"svg-label\">Faixa final: 192.168.10.64/26</text><text x=\"115\" y=\"314\" class=\"svg-label--small\">Primeiro host .65 | IP analisado .77 | Último host .126 | Broadcast .127</text></g>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Prática equivalente</h2>\n<p><strong>Aula 5.4 convertida para prática equivalente</strong></p>\n<p>O conteúdo desta aula é melhor fixado por cálculo guiado, diagnóstico, matriz ou desafio curto. O laboratório independente foi removido para evitar atividade artificial e concentrar a execução pesada nos quatro labs integradores do M05.</p>\n<div class=\"callout callout--mentor\"><strong>Política v2.0:</strong> esta aula não mantém laboratório independente. A fixação acontece por exercícios, desafio, solução comentada e pelos quatro labs integradores do M05.</div>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios treinam o reconhecimento do octeto interessante, o cálculo do bloco e a identificação de rede, broadcast, primeiro e último host.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>O desafio pede que você audite um plano de sub-redes com erros propositais e corrija os limites usando o método do bloco mágico.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra o raciocínio passo a passo, sem pular a identificação do octeto interessante.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>Você aprendeu que o método do bloco mágico permite calcular sub-redes de forma rápida: converter o prefixo em máscara, encontrar o octeto interessante, calcular <code>256 - máscara</code>, listar os inícios de bloco e identificar onde o IP analisado se encaixa. Esse método conecta matemática, operação, cloud, segurança, DevSecOps e troubleshooting.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Na próxima aula, você vai consolidar os <strong>prefixos comuns na prática: /24 a /32</strong>, entendendo quando usar cada um, quantos hosts oferecem, quais riscos trazem e como aparecem em ambientes corporativos.</p></section>"
  },
  "networkContext": {
    "whereItFits": "Esta aula fica no centro operacional do subnetting IPv4, convertendo CIDR e máscara em cálculo prático de blocos.",
    "previousConcepts": [
      "IPv4 de 32 bits",
      "CIDR",
      "máscara decimal",
      "bits de host",
      "rede",
      "broadcast",
      "primeiro host",
      "último host"
    ],
    "nextConcepts": [
      "prefixos comuns",
      "/24 a /32",
      "VLSM",
      "planejamento corporativo",
      "Packet Tracer",
      "subnetting em cloud"
    ],
    "realWorldUseCases": [
      "calcular sub-redes rapidamente",
      "validar gateway",
      "montar DHCP",
      "auditar firewall",
      "revisar Terraform",
      "evitar sobreposição de VPN",
      "interpretar logs por CIDR"
    ]
  },
  "protocolFields": [
    {
      "field": "CIDR prefix",
      "meaning": "Quantidade de bits de rede.",
      "example": "/26"
    },
    {
      "field": "Subnet mask",
      "meaning": "Representação decimal dos bits de rede e host.",
      "example": "255.255.255.192"
    },
    {
      "field": "Interesting octet",
      "meaning": "Octeto da máscara que define o tamanho do bloco.",
      "example": "192 no quarto octeto"
    },
    {
      "field": "Magic block",
      "meaning": "Intervalo entre os inícios das sub-redes.",
      "example": "256 - 192 = 64"
    },
    {
      "field": "Network address",
      "meaning": "Primeiro endereço do bloco onde o IP cai.",
      "example": "192.168.10.64"
    },
    {
      "field": "Broadcast address",
      "meaning": "Último endereço do bloco.",
      "example": "192.168.10.127"
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Receber IP e prefixo",
      "description": "O administrador parte de um endereço como 192.168.10.77/26."
    },
    {
      "step": 2,
      "title": "Converter prefixo em máscara",
      "description": "/26 vira 255.255.255.192."
    },
    {
      "step": 3,
      "title": "Encontrar octeto interessante",
      "description": "O primeiro octeto diferente de 255 e 0 é 192."
    },
    {
      "step": 4,
      "title": "Calcular bloco mágico",
      "description": "256 menos 192 resulta em 64."
    },
    {
      "step": 5,
      "title": "Listar os blocos",
      "description": "Os blocos no octeto são 0, 64, 128 e 192."
    },
    {
      "step": 6,
      "title": "Encaixar o IP",
      "description": "77 está no bloco 64-127."
    },
    {
      "step": 7,
      "title": "Derivar limites",
      "description": "Rede .64, broadcast .127, hosts .65-.126."
    },
    {
      "step": 8,
      "title": "Validar operação",
      "description": "Gateway, DHCP, rota, firewall e documentação devem respeitar esses limites."
    }
  ],
  "deepDive": {
    "title": "Por que 256 menos a máscara funciona?",
    "points": [
      "Cada octeto IPv4 tem 256 valores possíveis, de 0 a 255.",
      "O octeto interessante contém uma mistura de bits de rede e bits de host.",
      "Quando a máscara é 192, sobram 64 valores por bloco naquele octeto.",
      "Quando a máscara é 224, sobram 32 valores por bloco.",
      "O método é uma representação decimal do mesmo raciocínio binário aprendido nas aulas anteriores.",
      "Para prefixos que afetam o terceiro octeto, o mesmo raciocínio vale, mas a listagem se desloca para esse octeto."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Aplicar bloco mágico no octeto errado.",
      "impact": "Rede e broadcast calculados incorretamente.",
      "fix": "Identificar o primeiro octeto da máscara que não é 255 nem 0."
    },
    {
      "mistake": "Usar o próximo início de bloco como broadcast.",
      "impact": "Erro de um endereço; por exemplo, achar que .128 é broadcast quando na verdade o broadcast é .127.",
      "fix": "Broadcast é o próximo início de bloco menos 1."
    },
    {
      "mistake": "Esquecer que primeiro host é rede + 1.",
      "impact": "Gateway ou host pode ser configurado no endereço de rede.",
      "fix": "Separar rede, primeiro host, último host e broadcast na tabela."
    },
    {
      "mistake": "Ignorar /31 e /32.",
      "impact": "Aplicar fórmula -2 em casos especiais sem contexto.",
      "fix": "Tratar /31 e /32 como exceções operacionais que serão revisadas nos prefixos comuns."
    },
    {
      "mistake": "Validar firewall apenas visualmente.",
      "impact": "Liberar blocos maiores que o necessário.",
      "fix": "Calcular limites e comparar com requisito de menor privilégio."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host tem IP mas gateway está fora do bloco calculado.",
      "DHCP entrega endereço que parece correto, mas pertence a outra sub-rede.",
      "Regra de firewall não cobre o host esperado.",
      "VPN apresenta sobreposição não percebida visualmente.",
      "Roteador anuncia bloco diferente do planejado."
    ],
    "method": [
      "Coletar IP, CIDR, máscara e gateway.",
      "Converter CIDR em máscara decimal.",
      "Identificar octeto interessante.",
      "Calcular bloco mágico.",
      "Listar os inícios de bloco próximos ao IP analisado.",
      "Derivar rede, broadcast, primeiro host e último host.",
      "Comparar gateway, DHCP, firewall, rota e IPAM com o resultado.",
      "Registrar evidências sanitizadas."
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && arp -a",
        "purpose": "Coletar IP, máscara, gateway, rotas e ARP."
      },
      {
        "platform": "PowerShell",
        "command": "Get-NetIPConfiguration; Get-NetRoute; Test-NetConnection <destino>",
        "purpose": "Validar configuração e conectividade no Windows moderno."
      },
      {
        "platform": "Linux",
        "command": "ip addr; ip route; ip neigh",
        "purpose": "Coletar IP, prefixo, rota default e vizinhos."
      },
      {
        "platform": "Linux",
        "command": "ipcalc 192.168.10.77/26",
        "purpose": "Validar cálculo do bloco quando a ferramenta estiver disponível."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief; show running-config interface vlan 30; show ip route",
        "purpose": "Validar SVI, IP, máscara e rotas."
      },
      {
        "platform": "Cloud/IaC",
        "command": "terraform plan && terraform validate",
        "purpose": "Validar mudanças de subnets antes de aplicar infraestrutura."
      }
    ],
    "evidenceToCollect": [
      "IP/CIDR do host",
      "máscara decimal",
      "gateway",
      "rota default",
      "CIDR documentado",
      "regra de firewall",
      "escopo DHCP",
      "resultado do cálculo"
    ],
    "redFlags": [
      "gateway fora do bloco",
      "broadcast usado como host",
      "CIDR maior que o necessário",
      "subnets sobrepostas",
      "documentação divergente da configuração"
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
      "Liberar /24 quando apenas um /32 era necessário.",
      "Criar subnets sem IPAM.",
      "Usar bloco mágico por chute sem identificar máscara.",
      "Misturar usuários, servidores e visitantes no mesmo bloco por comodidade.",
      "Aprovar mudança cloud sem checar sobreposição."
    ],
    "vulnerabilities": [
      {
        "name": "Superfície de ataque ampliada por CIDR incorreto.",
        "description": "Risco relacionado à aula 5.4 — Método do bloco mágico.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM"
      },
      {
        "name": "Movimentação lateral facilitada por segmentação fraca.",
        "description": "Risco relacionado à aula 5.4 — Método do bloco mágico.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "revisão de arquitetura"
      },
      {
        "name": "Exposição indevida em VPN, security group ou ACL.",
        "description": "Risco relacionado à aula 5.4 — Método do bloco mágico.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "validação automática de CIDR"
      },
      {
        "name": "Logs mal correlacionados por erro de sub-rede.",
        "description": "Risco relacionado à aula 5.4 — Método do bloco mágico.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "menor privilégio em firewall"
      },
      {
        "name": "Falhas de disponibilidade causadas por endereçamento errado.",
        "description": "Risco relacionado à aula 5.4 — Método do bloco mágico.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "separação por VLAN e subnet"
      }
    ],
    "mitigations": [
      "IPAM",
      "revisão de arquitetura",
      "validação automática de CIDR",
      "menor privilégio em firewall",
      "separação por VLAN e subnet",
      "rotas e regras documentadas",
      "monitoramento de mudanças"
    ],
    "goodPractices": [
      "Usar o menor CIDR que atende ao requisito.",
      "Revisar regras de firewall por pares.",
      "Documentar blocos em IPAM com dono e finalidade.",
      "Validar subnets em pipeline de IaC.",
      "Evitar sobreposição entre on-premises, cloud e VPN.",
      "Sanitizar IPs públicos e topologia antes de compartilhar evidências."
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
      "IPAM",
      "revisão de arquitetura",
      "validação automática de CIDR",
      "menor privilégio em firewall",
      "separação por VLAN e subnet",
      "rotas e regras documentadas",
      "monitoramento de mudanças"
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    "Por que o broadcast é o próximo início de bloco menos 1?",
    "Como você explicaria a diferença entre decorar uma tabela e entender o bloco mágico?",
    "Em uma regra de firewall, por que errar o CIDR pode virar incidente de segurança?"
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual é o bloco mágico de /26?",
      "options": [
        "16",
        "32",
        "64",
        "128"
      ],
      "answer": "64",
      "explanation": "/26 = 255.255.255.192. O bloco é 256 - 192 = 64."
    },
    {
      "id": "q2",
      "question": "Qual é a rede de 192.168.10.77/26?",
      "options": [
        "192.168.10.0",
        "192.168.10.64",
        "192.168.10.77",
        "192.168.10.128"
      ],
      "answer": "192.168.10.64",
      "explanation": "Com bloco 64, os inícios são .0, .64, .128 e .192. O 77 cai no bloco .64."
    },
    {
      "id": "q3",
      "question": "Em /27, qual é o tamanho do bloco?",
      "options": [
        "8",
        "16",
        "32",
        "64"
      ],
      "answer": "32",
      "explanation": "/27 = 255.255.255.224. O bloco é 256 - 224 = 32."
    },
    {
      "id": "q4",
      "question": "Qual é o broadcast de 10.20.30.200/27?",
      "options": [
        "10.20.30.191",
        "10.20.30.200",
        "10.20.30.223",
        "10.20.30.255"
      ],
      "answer": "10.20.30.223",
      "explanation": "O bloco /27 que contém .200 começa em .192 e termina em .223."
    },
    {
      "id": "q5",
      "question": "Qual erro ocorre ao usar o próximo início de bloco como broadcast?",
      "options": [
        "O broadcast fica um endereço acima do correto",
        "O gateway vira DNS",
        "A máscara vira /32",
        "O ARP deixa de existir"
      ],
      "answer": "O broadcast fica um endereço acima do correto",
      "explanation": "Broadcast é o próximo início de bloco menos 1, não o próximo início."
    },
    {
      "id": "q6",
      "question": "Qual prática é mais segura ao revisar CIDR em firewall?",
      "options": [
        "Liberar o maior bloco possível",
        "Usar /0 para evitar chamados",
        "Aplicar menor privilégio e validar limites",
        "Ignorar subnetting se o ping funciona"
      ],
      "answer": "Aplicar menor privilégio e validar limites",
      "explanation": "CIDR define escopo de acesso. O menor bloco necessário reduz superfície de ataque."
    }
  ],
  "flashcards": [
    {
      "front": "O que é o bloco mágico?",
      "back": "É o tamanho do intervalo entre os inícios de sub-redes no octeto interessante."
    },
    {
      "front": "Como calcular o bloco mágico?",
      "back": "Use 256 menos o valor da máscara no octeto interessante."
    },
    {
      "front": "O que é octeto interessante?",
      "back": "É o primeiro octeto da máscara que não é 255 nem 0."
    },
    {
      "front": "Qual é o bloco mágico de 255.255.255.224?",
      "back": "32."
    },
    {
      "front": "Como achar o broadcast pelo bloco mágico?",
      "back": "Pegue o próximo início de bloco e subtraia 1."
    },
    {
      "front": "Por que o método ajuda em segurança?",
      "back": "Porque permite validar se regras de firewall e allowlists usam o CIDR correto e mínimo."
    }
  ],
  "exercises": [
    {
      "id": "e1",
      "prompt": "Use o bloco mágico para calcular rede, primeiro host, último host e broadcast de 192.168.5.90/27.",
      "expectedAnswer": "/27 tem bloco 32. 90 cai no bloco .64-.95. Rede 192.168.5.64, primeiro host .65, último host .94, broadcast .95.",
      "difficulty": "iniciante"
    },
    {
      "id": "e2",
      "prompt": "Calcule os limites de 10.0.8.201/28.",
      "expectedAnswer": "/28 tem bloco 16. 201 cai no bloco .192-.207. Rede 10.0.8.192, hosts .193-.206, broadcast .207.",
      "difficulty": "intermediário"
    },
    {
      "id": "e3",
      "prompt": "Qual é a rede de 172.16.4.130/25 e por quê?",
      "expectedAnswer": "Rede 172.16.4.128/25, porque /25 tem bloco 128 e 130 cai no bloco iniciado em .128.",
      "difficulty": "iniciante"
    },
    {
      "id": "e4",
      "prompt": "Uma regra libera 192.168.40.0/24, mas o requisito era apenas a sub-rede que contém 192.168.40.70/26. Qual CIDR correto e qual risco existe?",
      "expectedAnswer": "O CIDR correto é 192.168.40.64/26. Liberar /24 expõe quatro vezes mais endereços do que o necessário nesse contexto.",
      "difficulty": "intermediário"
    },
    {
      "id": "ex5.4.v2-final-pratica-equivalente",
      "type": "prático",
      "prompt": "Produza uma evidência curta do aprendizado desta aula: cálculo, tabela, matriz de decisão, desenho lógico ou explicação de troubleshooting relacionada ao tema.",
      "expectedAnswer": "A resposta deve conter artefato verificável, como tabela de sub-redes, cálculo de bloco, matriz de requisitos, justificativa de prefixo ou diagnóstico de erro comum.",
      "explanation": "Na versão v2.0, esta aula usa prática equivalente no lugar de laboratório independente para evitar laboratório genérico e concentrar execução nos labs integradores do módulo."
    }
  ],
  "challenge": {
    "title": "Audite um plano de sub-redes com bloco mágico",
    "scenario": "A equipe recebeu três configurações suspeitas durante uma mudança: Servidores 10.44.10.78/26 com gateway 10.44.10.1; Impressoras 10.44.10.201/27 com gateway 10.44.10.193; Visitantes 10.44.10.14/28 com gateway 10.44.10.1.",
    "tasks": [
      "Calcular rede, primeiro host, último host e broadcast de cada IP/CIDR.",
      "Validar se cada gateway está dentro da sub-rede correta.",
      "Identificar pelo menos um erro de gateway ou planejamento.",
      "Propor correção para cada segmento.",
      "Escrever uma recomendação de segurança para regras de firewall entre Visitantes e Servidores."
    ],
    "deliverables": [
      "Tabela de cálculo",
      "Lista de erros encontrados",
      "Correções propostas",
      "Recomendação de firewall",
      "Observações para IPAM"
    ],
    "rubric": [
      {
        "criteria": "Cálculo correto usando bloco mágico",
        "points": 30
      },
      {
        "criteria": "Validação correta dos gateways",
        "points": 25
      },
      {
        "criteria": "Correções coerentes",
        "points": 20
      },
      {
        "criteria": "Recomendação de segurança com menor privilégio",
        "points": 15
      },
      {
        "criteria": "Documentação clara e auditável",
        "points": 10
      }
    ],
    "expectedDeliverables": [
      "Evidência prática equivalente em vez de lab independente"
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do desafio",
    "steps": [
      "Servidores: 10.44.10.78/26. /26 tem bloco 64. O IP cai em 10.44.10.64/26; hosts .65-.126; broadcast .127. Gateway .1 está fora do bloco. Uma correção possível é gateway .65.",
      "Impressoras: 10.44.10.201/27. /27 tem bloco 32. O IP cai em 10.44.10.192/27; hosts .193-.222; broadcast .223. Gateway .193 é válido.",
      "Visitantes: 10.44.10.14/28. /28 tem bloco 16. O IP cai em 10.44.10.0/28; hosts .1-.14; broadcast .15. Gateway .1 é válido, mas o IP .14 é o último host; convém documentar reserva e pool para evitar conflitos.",
      "A regra de Visitantes para Servidores deve ser restritiva. Normalmente visitantes não acessam servidores internos, salvo exceção explícita, temporária, registrada e com destino/porta mínimos.",
      "O IPAM deve registrar dono, VLAN, CIDR, gateway, DHCP, reservas e política de firewall para cada bloco."
    ],
    "keyTakeaway": "O bloco mágico não entrega apenas uma resposta de prova: ele valida gateways, DHCP, firewall, IPAM e decisões de segurança."
  },
  "glossary": [
    {
      "term": "Bloco mágico",
      "definition": "Tamanho do intervalo entre inícios de sub-redes, calculado por 256 menos a máscara no octeto interessante."
    },
    {
      "term": "Octeto interessante",
      "definition": "Octeto da máscara onde ocorre a divisão relevante da sub-rede."
    },
    {
      "term": "Início de bloco",
      "definition": "Valor onde uma sub-rede começa dentro do octeto analisado."
    },
    {
      "term": "Próximo bloco",
      "definition": "Próximo início de sub-rede; o broadcast do bloco atual é um endereço antes dele."
    },
    {
      "term": "Menor privilégio em CIDR",
      "definition": "Prática de liberar apenas o menor bloco necessário para um requisito de acesso."
    },
    {
      "term": "Sobreposição de sub-redes",
      "definition": "Quando dois blocos CIDR cobrem parcialmente ou totalmente os mesmos endereços."
    }
  ],
  "references": [
    {
      "title": "Curso Redes e Network v2.0 — Módulo 4",
      "description": "Base de IPv4, máscara, rede, broadcast, gateway, DHCP, ICMP e troubleshooting."
    },
    {
      "title": "Curso Redes e Network v2.0 — Aulas 5.1 a 5.3",
      "description": "Fundamentos de subnetting, CIDR, quantidade de hosts e limites de sub-rede."
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
      "reason": "O método ajuda a revisar CIDRs em Terraform, Ansible e pipelines antes de aplicar infraestrutura."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso condicional e perímetros de rede",
      "reason": "Políticas baseadas em rede exigem CIDR correto para não conceder acesso indevido."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções",
      "Concluir quiz com pelo menos 70%",
      "Preencher tabela do laboratório",
      "Resolver o desafio",
      "Revisar solução comentada"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.5"
    ],
    "xpAwarded": 235,
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
