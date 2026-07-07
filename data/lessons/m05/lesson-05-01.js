export const lesson0501 = {
  "id": "5.1",
  "moduleId": "m05",
  "order": 1,
  "title": "Por que subnetting existe",
  "subtitle": "Motivação, problema, arquitetura, segurança e exemplos práticos de por que dividimos blocos IPv4 em sub-redes menores.",
  "duration": "95-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 225,
  "tags": [
    "redes",
    "ipv4",
    "subnetting",
    "cidr",
    "máscara",
    "vlan",
    "roteamento",
    "segurança",
    "cloud",
    "devsecops",
    "ipam"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m04",
      "reason": "O aluno precisa dominar IPv4, máscara, rede, broadcast, gateway, DHCP, ICMP e troubleshooting antes de dividir blocos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.3",
      "reason": "Máscara e CIDR são a base matemática do subnetting."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.4",
      "reason": "Endereço de rede, hosts e broadcast serão calculados repetidamente no módulo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.7",
      "reason": "VLANs normalmente recebem sub-redes próprias em redes corporativas."
    }
  ],
  "objectives": [
    "Explicar o problema que subnetting resolve em redes reais.",
    "Relacionar subnetting com organização, segurança, roteamento, DHCP, IPAM e cloud.",
    "Diferenciar rede plana de rede segmentada por sub-redes.",
    "Entender a troca entre quantidade de sub-redes e quantidade de hosts por sub-rede.",
    "Planejar uma segmentação simples usando um bloco /24 dividido em /26.",
    "Preparar a base conceitual para calcular CIDR, hosts, rede, broadcast e VLSM nas próximas aulas."
  ],
  "learningOutcomes": [
    "Dado um cenário de rede plana, o aluno identifica riscos operacionais e de segurança.",
    "Dado um bloco /24, o aluno explica por que dividi-lo pode ser melhor do que usar tudo em uma única rede.",
    "Dado um desenho com VLANs, o aluno reconhece a necessidade de sub-redes distintas e gateways próprios.",
    "Dado um ambiente cloud, o aluno reconhece o risco de CIDR sobreposto e subnets pequenas demais.",
    "Dado um grupo de ativos, o aluno propõe uma separação inicial por função e criticidade."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Subnetting costuma ser o ponto em que muita gente começa a decorar tabelas sem entender o motivo. Isso funciona por alguns exercícios, mas falha em produção. Em ambientes reais, subnetting aparece quando você precisa separar departamentos, VLANs, servidores, câmeras, visitantes, ambientes de desenvolvimento, redes de cloud, VPNs e links ponto a ponto sem desperdiçar endereços e sem criar sobreposição.</p>\n<p>Imagine uma empresa pequena usando <code>192.168.50.0/24</code> para tudo: notebooks, impressoras, servidores, câmeras, Wi-Fi de visitantes, telefones IP e equipamentos de infraestrutura. No começo parece simples. Depois surgem problemas: broadcast demais, políticas de firewall confusas, inventário ruim, convidados enxergando recursos internos, câmeras compartilhando domínio com usuários, DHCP difícil de controlar e qualquer incidente lateral se espalhando mais facilmente.</p>\n<div class=\"callout callout--problem\"><strong>Motivação central:</strong> subnetting existe para transformar um bloco IP grande demais em sub-redes menores, organizadas e controláveis. Ele não é apenas matemática; é arquitetura, operação, segurança, custo e capacidade de crescer sem redesenhar tudo.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>O IPv4 nasceu em um contexto menor do que a Internet atual. Inicialmente, o endereçamento era muito influenciado por classes: Classe A, Classe B e Classe C. Esse modelo parecia organizado, mas era rígido. Uma organização que precisava de mais do que uma rede pequena podia receber blocos grandes demais; outra podia ficar limitada demais. O resultado era desperdício e dificuldade de crescimento.</p>\n<p>Com o crescimento da Internet e das redes corporativas, surgiu a necessidade de usar os bits de endereçamento com mais flexibilidade. O CIDR permitiu escrever prefixos como <code>/24</code>, <code>/26</code>, <code>/28</code> e <code>/30</code>, desligando o planejamento da ideia rígida de classes. Subnetting se tornou a técnica prática para dividir blocos em partes menores usando prefixos mais longos.</p>\n<p>Hoje, subnetting aparece em qualquer ambiente moderno: LANs com VLANs, WANs, roteamento, firewalls, VPNs, cloud networking, Kubernetes, ambientes híbridos e DevSecOps. Mesmo que uma plataforma esconda detalhes em uma interface gráfica, por baixo ainda existe CIDR, rota, gateway, política e risco de sobreposição.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>O problema que subnetting resolve é o seguinte: um bloco IP grande pode ser tecnicamente funcional, mas operacionalmente ruim. Colocar todos os dispositivos no mesmo domínio lógico facilita o começo, porém atrapalha crescimento, segurança e diagnóstico.</p>\n<table class=\"data-table\"><thead><tr><th>Problema sem subnetting</th><th>Consequência</th><th>Como subnetting ajuda</th></tr></thead><tbody>\n<tr><td>Rede plana</td><td>Usuários, servidores e IoT compartilham o mesmo escopo lógico</td><td>Cria sub-redes por função, área ou criticidade</td></tr>\n<tr><td>Broadcast amplo</td><td>Mais ruído dentro do segmento</td><td>Reduz o domínio de broadcast ao dividir blocos</td></tr>\n<tr><td>Política confusa</td><td>Firewall e ACLs precisam tratar tudo como massa única</td><td>Permite regras por sub-rede: usuários, servidores, visitantes, gestão</td></tr>\n<tr><td>Desperdício</td><td>Blocos grandes são alocados para redes pequenas</td><td>Ajusta o tamanho da sub-rede à necessidade</td></tr>\n<tr><td>Sobreposição</td><td>VPN, cloud e filiais podem usar blocos iguais sem perceber</td><td>Força planejamento centralizado e documentação</td></tr>\n<tr><td>Troubleshooting lento</td><td>Não fica claro onde começa e termina cada escopo</td><td>Define limites, gateways, DHCP e rotas mais previsíveis</td></tr>\n</tbody></table>\n<div class=\"callout callout--warning\"><strong>Erro comum:</strong> pensar que subnetting é apenas “calcular IP”. Na prática, subnetting responde: qual grupo pertence a qual rede, quais rotas existem, quais políticas se aplicam, quanto espaço sobra e qual será o impacto de crescimento.</div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>A evolução do subnetting acompanha a evolução das redes. Primeiro, redes simples usavam poucos segmentos. Depois, empresas passaram a separar departamentos, prédios, servidores e links. Com virtualização, cloud, containers e segurança moderna, a necessidade de segmentação aumentou muito.</p>\n<ol class=\"flow-list\"><li><strong>Rede única:</strong> todos os dispositivos ficam no mesmo bloco, geralmente porque é mais fácil começar.</li><li><strong>Segmentação básica:</strong> usuários, servidores e visitantes ganham redes separadas.</li><li><strong>VLANs e roteamento inter-VLAN:</strong> cada VLAN costuma receber uma sub-rede própria e um gateway.</li><li><strong>VLSM:</strong> sub-redes passam a ter tamanhos diferentes conforme a quantidade de hosts.</li><li><strong>Cloud e híbrido:</strong> VPCs/VNets precisam de CIDRs planejados para subnets públicas, privadas, bancos, serviços, VPNs e peering.</li><li><strong>Segurança moderna:</strong> sub-redes viram unidades de política, logs, observabilidade, microsegmentação e controle de exposição.</li></ol>\n<p>O Módulo 5 começa pela motivação, depois ensina CIDR, hosts, rede, broadcast, bloco mágico, prefixos comuns, VLSM, planejamento, laboratório em Packet Tracer e aplicação em segurança/cloud.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Subnetting</strong> é a técnica de dividir uma rede IPv4 maior em sub-redes menores usando uma máscara mais longa. Em termos de bits, você “pega emprestado” parte dos bits que antes seriam de host e passa a usá-los para identificar sub-redes.</p>\n<div class=\"definition-box\"><strong>Definição prática:</strong> subnetting transforma um bloco como <code>192.168.50.0/24</code> em blocos menores, como <code>192.168.50.0/26</code>, <code>192.168.50.64/26</code>, <code>192.168.50.128/26</code> e <code>192.168.50.192/26</code>. Cada bloco passa a ter sua própria rede, faixa de hosts, broadcast e normalmente seu próprio gateway.</div>\n<table class=\"comparison-table\"><thead><tr><th>Bloco</th><th>Quantidade de blocos dentro de /24</th><th>Endereços por bloco</th><th>Hosts úteis tradicionais</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td>1</td><td>256</td><td>254</td></tr>\n<tr><td><code>/25</code></td><td>2</td><td>128</td><td>126</td></tr>\n<tr><td><code>/26</code></td><td>4</td><td>64</td><td>62</td></tr>\n<tr><td><code>/27</code></td><td>8</td><td>32</td><td>30</td></tr>\n<tr><td><code>/28</code></td><td>16</td><td>16</td><td>14</td></tr>\n<tr><td><code>/29</code></td><td>32</td><td>8</td><td>6</td></tr>\n<tr><td><code>/30</code></td><td>64</td><td>4</td><td>2</td></tr>\n</tbody></table>\n<p>Essa tabela não deve ser decorada de forma cega. Ela deve ser entendida: quanto maior o prefixo, mais bits são de rede e menos bits sobram para hosts.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Internamente, subnetting é manipulação de bits. Um IPv4 tem 32 bits. O prefixo CIDR diz quantos desses bits identificam a rede. Quando você muda de <code>/24</code> para <code>/26</code>, você está aumentando a parte de rede de 24 para 26 bits. Isso cria mais redes, mas reduz o espaço de hosts em cada uma.</p>\n<table class=\"data-table\"><thead><tr><th>Prefixo</th><th>Bits de rede</th><th>Bits de host</th><th>Endereços totais</th><th>Hosts úteis tradicionais</th></tr></thead><tbody>\n<tr><td><code>/24</code></td><td>24</td><td>8</td><td><code>2^8 = 256</code></td><td>254</td></tr>\n<tr><td><code>/25</code></td><td>25</td><td>7</td><td><code>2^7 = 128</code></td><td>126</td></tr>\n<tr><td><code>/26</code></td><td>26</td><td>6</td><td><code>2^6 = 64</code></td><td>62</td></tr>\n<tr><td><code>/27</code></td><td>27</td><td>5</td><td><code>2^5 = 32</code></td><td>30</td></tr>\n<tr><td><code>/28</code></td><td>28</td><td>4</td><td><code>2^4 = 16</code></td><td>14</td></tr>\n</tbody></table>\n<p>O cálculo clássico de hosts úteis é <code>2^bits_de_host - 2</code>, porque em redes IPv4 tradicionais um endereço representa a rede e outro representa o broadcast. Em cloud, alguns provedores ainda reservam endereços adicionais dentro de cada subnet, então o planejamento real deve considerar a documentação da plataforma, não apenas a fórmula.</p>\n<div class=\"callout callout--problem\"><strong>Ideia-chave:</strong> subnetting sempre troca quantidade de hosts por quantidade de sub-redes. Mais sub-redes significam menos hosts por sub-rede; mais hosts por sub-rede significam menos divisões possíveis.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Na arquitetura de redes, subnetting conecta endereçamento, VLAN, gateway, roteamento e segurança. Em uma LAN corporativa, é comum que cada VLAN tenha uma sub-rede própria. A VLAN separa o domínio de broadcast em Camada 2; a sub-rede define o bloco lógico em Camada 3; o gateway permite comunicação com outras redes; o firewall ou roteador aplica políticas.</p>\n<table class=\"comparison-table\"><thead><tr><th>Elemento</th><th>Função</th><th>Relação com subnetting</th></tr></thead><tbody>\n<tr><td>VLAN</td><td>Segmenta Camada 2</td><td>Normalmente recebe uma sub-rede IPv4 própria</td></tr>\n<tr><td>Sub-rede</td><td>Define bloco lógico IPv4</td><td>Contém rede, hosts, broadcast e gateway</td></tr>\n<tr><td>Gateway</td><td>Roteia para fora da sub-rede</td><td>Precisa estar dentro da faixa de hosts utilizáveis</td></tr>\n<tr><td>DHCP</td><td>Entrega configuração IPv4</td><td>Usa escopo compatível com a sub-rede</td></tr>\n<tr><td>Firewall/ACL</td><td>Controla tráfego</td><td>Pode aplicar regras por CIDR/sub-rede</td></tr>\n<tr><td>IPAM</td><td>Documenta endereços</td><td>Evita sobreposição, desperdício e conflitos</td></tr>\n<tr><td>Cloud VPC/VNet</td><td>Define espaço privado de rede</td><td>É dividido em subnets por função, zona e segurança</td></tr>\n</tbody></table>\n<p>Uma boa arquitetura não escolhe sub-redes apenas pelo número atual de máquinas. Ela considera crescimento, ambientes, criticidade, zonas de disponibilidade, rotas, NAT, firewall, monitoramento, custos e integração com redes existentes.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em uma cidade com um único bairro enorme. Todos moram no mesmo bairro, todas as ruas parecem pertencer ao mesmo lugar, os serviços públicos têm dificuldade para organizar atendimento e qualquer problema se espalha rapidamente. Subnetting é como dividir essa cidade em bairros menores: residencial, industrial, administrativo, hospitalar e área de visitantes.</p>\n<p>O endereço IPv4 é como o endereço de uma casa. A sub-rede é o bairro. O gateway é a saída principal para outros bairros. O firewall é a portaria que decide quem pode atravessar. O DHCP é o setor que distribui endereços disponíveis. O IPAM é o cadastro urbano que registra o que já foi usado.</p>\n<div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não são espaços físicos perfeitos. Uma sub-rede não é automaticamente segura apenas por existir; segurança depende de rotas, políticas, autenticação, monitoramento e segmentação bem configurada.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Você recebeu o bloco <code>192.168.50.0/24</code> e quer separar quatro grupos de tamanho parecido: usuários, servidores, câmeras e convidados. Uma solução inicial simples é dividir o <code>/24</code> em quatro sub-redes <code>/26</code>.</p>\n<table class=\"data-table\"><thead><tr><th>Grupo</th><th>Sub-rede</th><th>Hosts úteis</th><th>Broadcast</th><th>Possível gateway</th></tr></thead><tbody>\n<tr><td>Usuários</td><td><code>192.168.50.0/26</code></td><td><code>.1</code> a <code>.62</code></td><td><code>.63</code></td><td><code>.1</code></td></tr>\n<tr><td>Servidores</td><td><code>192.168.50.64/26</code></td><td><code>.65</code> a <code>.126</code></td><td><code>.127</code></td><td><code>.65</code></td></tr>\n<tr><td>Câmeras</td><td><code>192.168.50.128/26</code></td><td><code>.129</code> a <code>.190</code></td><td><code>.191</code></td><td><code>.129</code></td></tr>\n<tr><td>Convidados</td><td><code>192.168.50.192/26</code></td><td><code>.193</code> a <code>.254</code></td><td><code>.255</code></td><td><code>.193</code></td></tr>\n</tbody></table>\n<p>Esse exemplo mostra a lógica principal: cada grupo ganha seu próprio bloco, seu próprio gateway e sua própria política. No próximo passo, você calculará isso sem depender da tabela pronta.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, subnetting normalmente acompanha a organização por função. Usuários corporativos podem estar em uma sub-rede; servidores em outra; impressoras em outra; câmeras em outra; rede de convidados em outra; equipamentos de infraestrutura em outra. Essa separação permite aplicar políticas diferentes.</p>\n<table class=\"risk-table\"><thead><tr><th>Área</th><th>Sub-rede exemplo</th><th>Política típica</th><th>Risco se ficar misturado</th></tr></thead><tbody>\n<tr><td>Usuários</td><td><code>10.20.10.0/24</code></td><td>Acesso a sistemas necessários</td><td>Movimento lateral amplo</td></tr>\n<tr><td>Servidores</td><td><code>10.20.20.0/24</code></td><td>Acesso restrito por portas e origem</td><td>Exposição desnecessária a estações</td></tr>\n<tr><td>Câmeras/IoT</td><td><code>10.20.30.0/24</code></td><td>Saída limitada e acesso controlado ao NVR</td><td>Dispositivos frágeis vendo rede inteira</td></tr>\n<tr><td>Visitantes</td><td><code>10.20.40.0/24</code></td><td>Apenas Internet</td><td>Convidados alcançando rede interna</td></tr>\n<tr><td>Gerência</td><td><code>10.20.99.0/24</code></td><td>Acesso administrativo monitorado</td><td>Superfície administrativa exposta</td></tr>\n</tbody></table>\n<p>Subnetting não substitui firewall, NAC ou autenticação. Ele cria limites claros para que esses controles sejam aplicados com precisão.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, subnetting aparece logo no desenho de VPC/VNet. Você escolhe um CIDR para a rede virtual e depois divide esse bloco em subnets. Essas subnets podem representar camadas da aplicação, zonas de disponibilidade, ambientes, exposição pública ou isolamento de dados.</p>\n<p>Um desenho comum é separar subnets públicas para load balancers, subnets privadas para aplicação, subnets isoladas para bancos e subnets de serviços para endpoints privados, firewall ou appliances. Cada decisão de tamanho impacta custo, escalabilidade e integração com VPN, peering e ambientes on-premises.</p>\n<div class=\"callout callout--security\"><strong>Atenção em cloud:</strong> escolher <code>10.0.0.0/16</code> sem verificar a rede corporativa pode gerar conflito com VPN ou peering. A sobreposição de CIDR é uma das falhas mais comuns em ambientes híbridos.</div>\n<table class=\"data-table\"><thead><tr><th>Componente cloud</th><th>Relação com subnetting</th></tr></thead><tbody>\n<tr><td>VPC/VNet</td><td>Bloco maior que será dividido</td></tr>\n<tr><td>Subnet pública</td><td>Normalmente associada a rota para Internet Gateway ou equivalente</td></tr>\n<tr><td>Subnet privada</td><td>Sem entrada direta da Internet; pode sair via NAT/firewall</td></tr>\n<tr><td>Subnet isolada</td><td>Usada para bancos ou serviços sem rota direta para Internet</td></tr>\n<tr><td>Peering/VPN</td><td>Exige blocos não sobrepostos</td></tr>\n<tr><td>Flow logs</td><td>Registram tráfego por IP/subnet, apoiando investigação</td></tr>\n</tbody></table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em DevSecOps, subnetting aparece quando infraestrutura vira código. Um Terraform mal planejado pode criar CIDRs sobrepostos, subnets pequenas demais para autoscaling, ambientes com rotas erradas ou regras de security group amplas. O problema deixa de ser apenas rede e vira risco de pipeline.</p>\n<p>Um pipeline maduro valida CIDRs antes de aplicar mudanças. Ele pode impedir que duas subnets se sobreponham, exigir tags de ambiente, validar se subnets públicas realmente precisam ser públicas e gerar documentação automática para IPAM.</p>\n<table class=\"comparison-table\"><thead><tr><th>Prática DevSecOps</th><th>Como subnetting entra</th><th>Falha evitada</th></tr></thead><tbody>\n<tr><td>IaC</td><td>CIDRs definidos em código</td><td>Configuração manual inconsistente</td></tr>\n<tr><td>Revisão de pull request</td><td>Validação de blocos e nomes</td><td>Sobreposição e subnets sem dono</td></tr>\n<tr><td>Policy as Code</td><td>Regras impedem subnet pública indevida</td><td>Exposição acidental</td></tr>\n<tr><td>CI/CD</td><td>Testes verificam plano de rede</td><td>Deploy quebrando conectividade</td></tr>\n<tr><td>Observabilidade</td><td>Logs por subnet ajudam investigação</td><td>Falta de evidência em incidente</td></tr>\n</tbody></table>\n<p>Este assunto se conecta diretamente ao curso de Infraestrutura Moderna, Platform Engineering e DevSecOps, especialmente quando IaC e pipelines passam a criar redes, rotas e políticas automaticamente.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Subnetting é uma fundação de segurança, mas não é segurança completa. Ele ajuda a reduzir escopo, separar ativos por criticidade e criar fronteiras para firewall, ACL, NAC, SIEM e resposta a incidentes. Porém, se as rotas permitirem tudo e não houver controle, a separação vira apenas organização visual.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Mitigação</th></tr></thead><tbody>\n<tr><td>Rede plana</td><td>Um host comprometido alcança muitos ativos</td><td>Sub-redes por função, firewall interno e NAC</td></tr>\n<tr><td>CIDR amplo em regra</td><td><code>10.0.0.0/8</code> liberado sem necessidade</td><td>Menor privilégio por sub-rede e porta</td></tr>\n<tr><td>Subnets sem dono</td><td>Ninguém sabe quem administra o bloco</td><td>IPAM, tags e processo de mudança</td></tr>\n<tr><td>Visitantes na rede interna</td><td>Wi-Fi guest compartilha acesso lateral</td><td>Subnet isolada com saída apenas para Internet</td></tr>\n<tr><td>Sobreposição em VPN</td><td>Rotas ambíguas ou inacessíveis</td><td>Planejamento global de CIDR</td></tr>\n<tr><td>Falsa sensação de isolamento</td><td>Sub-redes existem, mas firewall permite tudo</td><td>Testes de acesso, logs e revisão contínua</td></tr>\n</tbody></table>\n<div class=\"callout callout--security\"><strong>Regra defensiva:</strong> use subnetting para criar fronteiras lógicas, mas aplique controles explícitos para decidir quem pode atravessar essas fronteiras.</div>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama mostra uma rede <code>/24</code> sendo dividida em quatro sub-redes <code>/26</code>. Cada sub-rede representa um domínio lógico com seu próprio gateway e política.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 620\" role=\"img\" aria-labelledby=\"m05l01-title m05l01-desc\">\n<title id=\"m05l01-title\">Subnetting dividindo um bloco IPv4 em sub-redes menores</title>\n<desc id=\"m05l01-desc\">Um bloco 192.168.50.0/24 é dividido em quatro sub-redes /26 para usuários, servidores, câmeras e convidados, cada uma com gateway e política própria.</desc>\n<defs><marker id=\"m05l01-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-flow\"></path></marker></defs>\n<rect x=\"330\" y=\"36\" width=\"320\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n<text x=\"490\" y=\"68\" text-anchor=\"middle\" class=\"svg-label\">Bloco original</text>\n<text x=\"490\" y=\"94\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.50.0/24 — 256 endereços</text>\n<path d=\"M 490 108 L 490 156\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m05l01-arrow)\"></path>\n<rect x=\"360\" y=\"156\" width=\"260\" height=\"54\" rx=\"12\" class=\"svg-badge\"></rect>\n<text x=\"490\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Subnetting: /24 → quatro /26</text>\n<path d=\"M 490 210 L 185 258\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m05l01-arrow)\"></path>\n<path d=\"M 490 210 L 385 258\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m05l01-arrow)\"></path>\n<path d=\"M 490 210 L 595 258\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m05l01-arrow)\"></path>\n<path d=\"M 490 210 L 795 258\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m05l01-arrow)\"></path>\n<rect x=\"60\" y=\"258\" width=\"250\" height=\"128\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n<text x=\"185\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Usuários</text>\n<text x=\"185\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.50.0/26</text>\n<text x=\"185\" y=\"346\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">hosts .1 – .62</text>\n<text x=\"185\" y=\"372\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">GW .1</text>\n<rect x=\"365\" y=\"258\" width=\"250\" height=\"128\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n<text x=\"490\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Servidores</text>\n<text x=\"490\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.50.64/26</text>\n<text x=\"490\" y=\"346\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">hosts .65 – .126</text>\n<text x=\"490\" y=\"372\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">GW .65</text>\n<rect x=\"670\" y=\"258\" width=\"250\" height=\"128\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n<text x=\"795\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Câmeras</text>\n<text x=\"795\" y=\"320\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.50.128/26</text>\n<text x=\"795\" y=\"346\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">hosts .129 – .190</text>\n<text x=\"795\" y=\"372\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">GW .129</text>\n<rect x=\"365\" y=\"438\" width=\"250\" height=\"128\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect>\n<text x=\"490\" y=\"472\" text-anchor=\"middle\" class=\"svg-label\">Convidados</text>\n<text x=\"490\" y=\"500\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.50.192/26</text>\n<text x=\"490\" y=\"526\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">hosts .193 – .254</text>\n<text x=\"490\" y=\"552\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">somente Internet</text>\n<rect x=\"56\" y=\"438\" width=\"254\" height=\"128\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"183\" y=\"472\" text-anchor=\"middle\" class=\"svg-label\">Controles</text>\n<text x=\"88\" y=\"504\" class=\"svg-label svg-label--small\">Firewall por CIDR</text>\n<text x=\"88\" y=\"530\" class=\"svg-label svg-label--small\">DHCP por escopo</text>\n<text x=\"88\" y=\"556\" class=\"svg-label svg-label--small\">Logs por sub-rede</text>\n<rect x=\"670\" y=\"438\" width=\"250\" height=\"128\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"795\" y=\"472\" text-anchor=\"middle\" class=\"svg-label\">Resultado</text>\n<text x=\"702\" y=\"504\" class=\"svg-label svg-label--small\">menos ruído</text>\n<text x=\"702\" y=\"530\" class=\"svg-label svg-label--small\">políticas claras</text>\n<text x=\"702\" y=\"556\" class=\"svg-label svg-label--small\">crescimento planejado</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Prática equivalente</h2>\n<p><strong>Aula 5.1 convertida para prática equivalente</strong></p>\n<p>O conteúdo desta aula é melhor fixado por cálculo guiado, diagnóstico, matriz ou desafio curto. O laboratório independente foi removido para evitar atividade artificial e concentrar a execução pesada nos quatro labs integradores do M05.</p>\n<div class=\"callout callout--mentor\"><strong>Política v2.0:</strong> esta aula não mantém laboratório independente. A fixação acontece por exercícios, desafio, solução comentada e pelos quatro labs integradores do M05.</div>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios desta aula verificam se você entendeu por que subnetting existe antes de entrar nos cálculos detalhados. O foco é raciocínio arquitetural e leitura básica de blocos.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>O desafio simula uma empresa crescendo a partir de uma rede plana. Você deverá propor uma segmentação inicial e explicar os impactos de segurança, operação e cloud.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostrará que o subnetting correto começa por perguntas: quem precisa estar junto, quem precisa estar separado, quanto cada grupo pode crescer e quais políticas precisam existir entre eles.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Subnetting existe porque redes grandes demais são difíceis de controlar. Ao dividir um bloco IPv4 em sub-redes menores, você ganha organização, reduz escopo de broadcast, facilita firewall, DHCP, IPAM, roteamento, troubleshooting e segurança.</p>\n<p>O ponto mais importante desta aula é entender a troca: quanto mais sub-redes você cria, menos hosts cabem em cada uma. Esse equilíbrio será a base dos cálculos das próximas aulas.</p>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>Na próxima aula, estudaremos <strong>CIDR, máscara e quantidade de hosts</strong>. Você aprenderá como transformar prefixos em tamanhos de bloco e como calcular quantos endereços cada sub-rede oferece.</p>\n</section>"
  },
  "networkContext": {
    "scope": "Introdução estratégica ao subnetting como técnica de divisão de blocos IPv4 em sub-redes menores.",
    "layers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "relatedLessons": [
      "0.2",
      "2.5",
      "3.7",
      "4.1",
      "4.2",
      "4.3",
      "4.4",
      "4.5",
      "4.10"
    ],
    "typicalSymptoms": [
      "rede plana",
      "CIDR amplo demais",
      "gateway fora do padrão",
      "DHCP confuso",
      "sobreposição de VPN",
      "subnet cloud pequena",
      "firewall com regras amplas",
      "broadcast e troubleshooting difíceis"
    ]
  },
  "protocolFields": [
    {
      "name": "IPv4 Address",
      "description": "Endereço lógico de 32 bits associado a um host ou interface."
    },
    {
      "name": "CIDR Prefix",
      "description": "Quantidade de bits usados como rede, como /24, /26 ou /30."
    },
    {
      "name": "Subnet Mask",
      "description": "Representação decimal pontuada da separação entre bits de rede e bits de host."
    },
    {
      "name": "Network Address",
      "description": "Endereço que identifica a sub-rede."
    },
    {
      "name": "Usable Host Range",
      "description": "Faixa de endereços atribuíveis a interfaces em uma sub-rede IPv4 tradicional."
    },
    {
      "name": "Broadcast Address",
      "description": "Endereço usado para representar todos os hosts de uma sub-rede IPv4 tradicional."
    },
    {
      "name": "Default Gateway",
      "description": "Interface dentro da sub-rede usada como próximo salto para redes externas."
    },
    {
      "name": "DHCP Scope",
      "description": "Intervalo de endereços e opções entregues dinamicamente para uma sub-rede."
    },
    {
      "name": "Route",
      "description": "Entrada que informa para onde enviar tráfego destinado a determinado prefixo."
    },
    {
      "name": "Policy Boundary",
      "description": "Fronteira lógica onde firewall, ACL ou controle de acesso pode ser aplicado por CIDR."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Bloco IPv4 é definido",
      "description": "A organização recebe ou escolhe um bloco, como 192.168.50.0/24."
    },
    {
      "step": 2,
      "title": "Necessidades são levantadas",
      "description": "São identificados grupos como usuários, servidores, câmeras, convidados e infraestrutura."
    },
    {
      "step": 3,
      "title": "O bloco é dividido",
      "description": "O prefixo é aumentado para criar sub-redes menores, por exemplo /24 para /26."
    },
    {
      "step": 4,
      "title": "Cada sub-rede recebe função",
      "description": "Cada bloco passa a ter propósito, gateway, DHCP, documentação e política."
    },
    {
      "step": 5,
      "title": "Rotas e gateways são definidos",
      "description": "O tráfego entre sub-redes passa por roteador, switch L3 ou firewall."
    },
    {
      "step": 6,
      "title": "Políticas são aplicadas",
      "description": "ACLs, firewall, NAC, regras cloud e monitoramento limitam fluxos entre blocos."
    },
    {
      "step": 7,
      "title": "Evidências são registradas",
      "description": "IPAM, diagramas, DHCP, logs e IaC mantêm controle operacional."
    }
  ],
  "deepDive": {
    "title": "A troca fundamental do subnetting",
    "points": [
      "Subnetting não cria endereços novos; ele redistribui os 32 bits de IPv4 entre rede e host.",
      "Aumentar o prefixo cria mais sub-redes, mas reduz a quantidade de hosts em cada uma.",
      "Um /24 dividido em /26 gera quatro sub-redes; cada uma possui 64 endereços totais e 62 hosts úteis tradicionais.",
      "A decisão de tamanho deve considerar crescimento, DHCP, reservas, gateways, alta disponibilidade, monitoramento e reservas específicas de cloud.",
      "Sub-redes são unidades naturais para rotas, firewall, ACLs, listas de acesso, logs e documentação."
    ],
    "mentalModel": "Subnetting é planejamento de espaço lógico: você troca amplitude por controle. Uma rede enorme é simples de criar, mas difícil de governar; sub-redes menores exigem cálculo, porém criam fronteiras operacionais e de segurança."
  },
  "commonMistakes": [
    {
      "mistake": "Decorar tabelas sem entender bits",
      "impact": "O aluno acerta exercícios simples, mas falha em cenários diferentes.",
      "fix": "Sempre relacionar prefixo, bits de host, tamanho do bloco e faixa de hosts."
    },
    {
      "mistake": "Usar /24 para tudo",
      "impact": "Desperdício, rede plana, políticas amplas e pouca organização.",
      "fix": "Planejar sub-redes por função, criticidade e crescimento."
    },
    {
      "mistake": "Criar subnets pequenas demais em cloud",
      "impact": "Autoscaling, load balancers, endpoints ou clusters podem ficar sem IP.",
      "fix": "Considerar reservas do provedor e crescimento futuro."
    },
    {
      "mistake": "Permitir tráfego amplo entre sub-redes",
      "impact": "A segmentação existe no desenho, mas não protege na prática.",
      "fix": "Aplicar firewall/ACL/NAC com menor privilégio."
    },
    {
      "mistake": "Ignorar sobreposição de CIDR",
      "impact": "VPN, peering e roteamento híbrido falham ou ficam ambíguos.",
      "fix": "Manter IPAM e planejamento global antes de criar blocos."
    }
  ],
  "troubleshooting": {
    "method": "Ao analisar subnetting, comece pelo bloco original, prefixo, tamanho esperado, rede, broadcast, gateway, DHCP, rota e política entre sub-redes.",
    "checklist": [
      "Qual é o bloco original?",
      "Qual prefixo foi escolhido para cada sub-rede?",
      "Quantos hosts úteis cada sub-rede terá?",
      "O gateway está dentro da faixa correta?",
      "O pool DHCP exclui gateway, reservas e infraestrutura?",
      "Há sobreposição com VPN, cloud, filial ou laboratório?",
      "As regras de firewall usam CIDR mínimo necessário?",
      "A documentação/IPAM registra dono, função e ambiente?"
    ],
    "commands": [
      {
        "windows": [
          "ipconfig /all",
          "route print",
          "arp -a",
          "Test-NetConnection <destino> -Port <porta>"
        ],
        "linux": [
          "ip addr",
          "ip route",
          "ip neigh",
          "ping -c 4 <gateway>",
          "traceroute <destino>"
        ],
        "cisco": [
          "show ip interface brief",
          "show vlan brief",
          "show ip route",
          "show running-config | section interface",
          "show access-lists"
        ],
        "cloud": [
          "Verificar CIDR da VPC/VNet",
          "Verificar CIDR das subnets",
          "Verificar route tables",
          "Verificar SG/NSG/NACL",
          "Verificar flow logs"
        ]
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Por que subnetting existe.",
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
    "badPractices": [
      "Colocar usuários, servidores, visitantes e câmeras na mesma sub-rede.",
      "Liberar tráfego entre todas as sub-redes sem justificativa.",
      "Criar subnets cloud sem planejar crescimento.",
      "Usar blocos aleatórios sem IPAM.",
      "Documentar apenas no desenho e não refletir em firewall, DHCP e rotas."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral facilitado por rede plana.",
        "description": "Risco relacionado à aula 5.1 — Por que subnetting existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Segmentação por função."
      },
      {
        "name": "Exposição ampla causada por allowlists grandes demais.",
        "description": "Risco relacionado à aula 5.1 — Por que subnetting existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Firewall interno ou roteamento controlado."
      },
      {
        "name": "Falha de conectividade por sobreposição de CIDR.",
        "description": "Risco relacionado à aula 5.1 — Por que subnetting existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "NAC/802.1X para controlar acesso físico e Wi-Fi."
      },
      {
        "name": "Evasão operacional por ausência de logs e dono da subnet.",
        "description": "Risco relacionado à aula 5.1 — Por que subnetting existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DHCP snooping e DAI em redes de acesso."
      },
      {
        "name": "Segmentação aparente sem enforcement de política.",
        "description": "Risco relacionado à aula 5.1 — Por que subnetting existe.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "IPAM e revisão de mudanças."
      }
    ],
    "mitigations": [
      "Segmentação por função.",
      "Firewall interno ou roteamento controlado.",
      "NAC/802.1X para controlar acesso físico e Wi-Fi.",
      "DHCP snooping e DAI em redes de acesso.",
      "IPAM e revisão de mudanças.",
      "Testes periódicos de conectividade permitida e negada.",
      "Policy as Code para redes cloud."
    ],
    "goodPractices": [
      "Separar ativos por função e criticidade.",
      "Não tratar subnet privada como sinônimo de segurança.",
      "Aplicar firewall/ACL entre sub-redes com menor privilégio.",
      "Manter IPAM atualizado com dono, ambiente, função e observações.",
      "Evitar CIDRs amplos em allowlists e security groups.",
      "Validar sobreposição antes de VPN, peering ou fusão de redes.",
      "Registrar logs por sub-rede para investigação e resposta a incidentes."
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
      "Segmentação por função.",
      "Firewall interno ou roteamento controlado.",
      "NAC/802.1X para controlar acesso físico e Wi-Fi.",
      "DHCP snooping e DAI em redes de acesso.",
      "IPAM e revisão de mudanças.",
      "Testes periódicos de conectividade permitida e negada.",
      "Policy as Code para redes cloud."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma rede única com usuários, servidores, câmeras e visitantes é ruim para operação e segurança?",
      "hints": [
        "Pense em broadcast, política, escopo de falha e movimento lateral.",
        "Pense em quem deveria falar com quem."
      ],
      "expectedIdeas": [
        "segmentação",
        "broadcast",
        "firewall",
        "movimento lateral",
        "política",
        "troubleshooting"
      ],
      "explanation": "Uma rede plana amplia o impacto de falhas e incidentes, dificulta políticas específicas e torna o diagnóstico menos preciso."
    },
    {
      "type": "diagnóstico",
      "question": "Se você divide um /24 em quatro /26, o que ganha e o que perde?",
      "hints": [
        "Compare quantidade de redes com quantidade de hosts por rede."
      ],
      "expectedIdeas": [
        "mais sub-redes",
        "menos hosts",
        "controle",
        "organização",
        "segurança"
      ],
      "explanation": "Você ganha quatro segmentos menores e mais controláveis, mas cada um terá menos hosts disponíveis do que o /24 original."
    },
    {
      "type": "cenário real",
      "question": "Por que subnetting é pré-requisito para desenhar VPC/VNet em cloud?",
      "hints": [
        "Pense em subnets públicas, privadas, NAT, peering e VPN."
      ],
      "expectedIdeas": [
        "CIDR",
        "subnet",
        "cloud",
        "VPN",
        "peering",
        "sobreposição",
        "rota"
      ],
      "explanation": "Cloud networking depende de blocos CIDR e subnets bem planejados; sobreposição ou tamanho inadequado causa problemas de conectividade e crescimento."
    }
  ],
  "quiz": [
    {
      "q": "Subnetting serve principalmente para:",
      "opts": [
        "Criptografar tráfego automaticamente",
        "Dividir uma rede IP maior em sub-redes menores",
        "Substituir DNS",
        "Converter MAC em IPv4"
      ],
      "a": 1,
      "exp": "Subnetting divide blocos IP em sub-redes menores e mais gerenciáveis."
    },
    {
      "q": "Ao transformar um /24 em /26, o que acontece?",
      "opts": [
        "Aumenta a quantidade de hosts por sub-rede",
        "Cria quatro sub-redes menores dentro do /24",
        "Remove a necessidade de gateway",
        "Transforma IPv4 em IPv6"
      ],
      "a": 1,
      "exp": "Um /24 dividido em /26 gera quatro blocos de 64 endereços totais."
    },
    {
      "q": "Qual é um bom motivo para separar convidados em uma sub-rede própria?",
      "opts": [
        "Permitir acesso irrestrito aos servidores",
        "Isolar visitantes e aplicar política de saída para Internet",
        "Eliminar DHCP",
        "Impedir uso de Wi-Fi"
      ],
      "a": 1,
      "exp": "Visitantes devem ter escopo restrito, normalmente com acesso apenas à Internet."
    },
    {
      "q": "Subnetting substitui firewall?",
      "opts": [
        "Sim, sub-rede já bloqueia tudo sozinha",
        "Não, ele cria fronteiras; firewall/ACL aplica política",
        "Sim, desde que seja /24",
        "Não, porque subnetting só existe em IPv6"
      ],
      "a": 1,
      "exp": "Subnetting organiza e cria limites lógicos, mas o controle de tráfego exige rotas e políticas."
    },
    {
      "q": "Qual risco é comum em cloud quando CIDRs são escolhidos sem planejamento?",
      "opts": [
        "Aumento automático de MTU",
        "Sobreposição com VPN ou peering",
        "Desativação de DNS global",
        "Conversão para APIPA"
      ],
      "a": 1,
      "exp": "CIDR sobreposto é uma falha comum em ambientes híbridos e interconectados."
    },
    {
      "q": "Aumentar o prefixo CIDR, por exemplo de /24 para /26, significa:",
      "opts": [
        "Mais bits de rede e menos bits de host",
        "Menos bits de rede e mais hosts",
        "Nenhuma mudança no tamanho do bloco",
        "Que o endereço vira público"
      ],
      "a": 0,
      "exp": "Prefixo maior usa mais bits para rede, criando mais sub-redes e reduzindo hosts por sub-rede."
    }
  ],
  "flashcards": [
    {
      "front": "Subnetting",
      "back": "Divisão de uma rede IPv4 maior em sub-redes menores usando prefixo/máscara mais longa."
    },
    {
      "front": "Rede plana",
      "back": "Modelo em que muitos tipos de ativos compartilham o mesmo bloco lógico, dificultando controle e segurança."
    },
    {
      "front": "/24 para /26",
      "back": "Gera quatro sub-redes /26, cada uma com 64 endereços totais e 62 hosts úteis tradicionais."
    },
    {
      "front": "Subnetting e VLAN",
      "back": "VLAN segmenta Camada 2; a sub-rede define o bloco IPv4 normalmente associado àquela VLAN."
    },
    {
      "front": "Subnetting e firewall",
      "back": "Sub-redes permitem políticas por CIDR, mas não bloqueiam tráfego sozinhas."
    },
    {
      "front": "CIDR sobreposto",
      "back": "Dois ambientes usando blocos iguais ou conflitantes, dificultando roteamento, VPN e peering."
    }
  ],
  "exercises": [
    {
      "id": "ex-5.1-1",
      "title": "Explique o problema",
      "prompt": "Explique em um parágrafo por que colocar usuários, servidores, câmeras e visitantes na mesma sub-rede pode ser ruim.",
      "expectedAnswer": "A resposta deve mencionar política, broadcast/escopo, movimento lateral, troubleshooting e separação por função."
    },
    {
      "id": "ex-5.1-2",
      "title": "Divisão simples",
      "prompt": "Divida conceitualmente 192.168.50.0/24 em quatro grupos de tamanho igual. Quais prefixos seriam usados?",
      "expectedAnswer": "Quatro sub-redes /26."
    },
    {
      "id": "ex-5.1-3",
      "title": "Cloud",
      "prompt": "Cite dois problemas que podem acontecer quando uma VPC/VNet é criada com CIDR sem planejamento.",
      "expectedAnswer": "Sobreposição com VPN/peering e subnet pequena/grande demais para crescimento, custo ou segurança."
    },
    {
      "id": "ex-5.1-4",
      "title": "Segurança",
      "prompt": "Por que subnetting não substitui firewall?",
      "expectedAnswer": "Porque sub-redes definem blocos e fronteiras, mas a permissão ou bloqueio depende de rotas, firewall, ACL, SG/NSG ou controles equivalentes."
    },
    {
      "id": "ex5.1.v2-final-pratica-equivalente",
      "type": "prático",
      "prompt": "Produza uma evidência curta do aprendizado desta aula: cálculo, tabela, matriz de decisão, desenho lógico ou explicação de troubleshooting relacionada ao tema.",
      "expectedAnswer": "A resposta deve conter artefato verificável, como tabela de sub-redes, cálculo de bloco, matriz de requisitos, justificativa de prefixo ou diagnóstico de erro comum.",
      "explanation": "Na versão v2.0, esta aula usa prática equivalente no lugar de laboratório independente para evitar laboratório genérico e concentrar execução nos labs integradores do módulo."
    }
  ],
  "challenge": {
    "title": "Desafio — redesenhar uma rede plana",
    "scenario": "Uma empresa usa 192.168.80.0/24 para usuários, servidores, impressoras, câmeras e visitantes. A diretoria quer melhorar segurança e organização sem trocar todos os equipamentos imediatamente.",
    "tasks": [
      "Proponha pelo menos quatro sub-redes por função.",
      "Explique qual grupo deve ter maior restrição.",
      "Indique quais sub-redes precisariam de DHCP dinâmico e quais poderiam ter reservas.",
      "Explique que tipo de política de firewall seria aplicada entre usuários e servidores.",
      "Liste dois riscos se a empresa migrar para cloud sem verificar CIDR usado internamente."
    ],
    "rubric": [
      "Segmentação faz sentido por função e criticidade.",
      "A resposta não usa endereço de rede ou broadcast como host.",
      "Há preocupação com política, não apenas cálculo.",
      "Há menção a IPAM/documentação.",
      "Há menção a sobreposição em VPN/cloud."
    ],
    "expectedDeliverables": [
      "Evidência prática equivalente em vez de lab independente"
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução inicial seria separar usuários, servidores, câmeras/IoT, visitantes e gerência. Mesmo antes de calcular VLSM, quatro /26 dentro de um /24 demonstram a lógica de divisão. Em ambiente real, VLSM pode ser melhor, pois cada grupo pode ter tamanho diferente.",
    "steps": [
      "Comece classificando ativos por função e risco.",
      "Evite misturar visitantes, câmeras e servidores com usuários comuns.",
      "Use gateways coerentes dentro de cada sub-rede.",
      "Defina DHCP por escopo e reserve IPs de infraestrutura.",
      "Aplique firewall/ACL entre sub-redes, principalmente em direção a servidores e gerência.",
      "Documente no IPAM e valide sobreposição antes de VPN, cloud ou peering."
    ],
    "exampleAnswer": "Para 192.168.80.0/24, uma proposta didática inicial pode usar /26: usuários em 192.168.80.0/26, servidores em 192.168.80.64/26, câmeras/IoT em 192.168.80.128/26 e convidados em 192.168.80.192/26. Visitantes devem ter apenas Internet. Servidores devem aceitar somente portas necessárias a partir de origens autorizadas. Câmeras devem falar apenas com NVR/servidor de gravação. Antes de levar isso para cloud, é necessário verificar se 192.168.80.0/24 não conflita com filiais, VPNs ou VPCs/VNets existentes."
  },
  "glossary": [
    {
      "term": "Subnetting",
      "definition": "Técnica de dividir um bloco IP em sub-redes menores usando prefixos mais longos."
    },
    {
      "term": "Sub-rede",
      "definition": "Bloco lógico IPv4 com endereço de rede, faixa de hosts e broadcast."
    },
    {
      "term": "CIDR",
      "definition": "Notação que representa o número de bits de rede, como /24 ou /26."
    },
    {
      "term": "VLSM",
      "definition": "Uso de sub-redes de tamanhos diferentes dentro de um planejamento de endereçamento."
    },
    {
      "term": "IPAM",
      "definition": "Processo ou ferramenta de gerenciamento de endereços IP."
    },
    {
      "term": "CIDR sobreposto",
      "definition": "Conflito entre blocos IP que se intersectam e prejudicam roteamento, VPN ou peering."
    }
  ],
  "references": [
    {
      "title": "Redes e Network v2.0 — Módulo 4",
      "type": "internal",
      "note": "Base obrigatória sobre IPv4 antes de subnetting."
    },
    {
      "title": "Curso Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "type": "internal",
      "note": "Relacionado a IaC, pipelines, cloud networking e automação de redes."
    },
    {
      "title": "Curso Enterprise Identity, IAM e Segurança de Identidades",
      "type": "internal",
      "note": "Relacionado a segmentação como suporte a políticas de acesso e defesa em profundidade."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC e automação",
      "reason": "Subnetting em cloud costuma ser criado por Terraform, pipelines e módulos reutilizáveis."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Zero Trust e acesso por contexto",
      "reason": "Segmentação de rede apoia políticas de acesso, mas não substitui identidade e autenticação."
    }
  ],
  "progressRules": {
    "requiresCompletionOf": [
      "4.10"
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false
    },
    "unlocks": [
      "5.2"
    ],
    "recommendedReview": [
      "4.2",
      "4.3",
      "4.4",
      "4.5",
      "3.7"
    ],
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
