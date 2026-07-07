export const lesson1201 = {
  "id": "12.1",
  "moduleId": "m12",
  "order": 1,
  "title": "Por que redes wireless existem",
  "subtitle": "Wi-Fi não é internet: é uma forma de acesso à rede usando rádio, mobilidade, meio compartilhado e decisões de arquitetura.",
  "duration": "70-95 min",
  "estimatedStudyTimeMinutes": 95,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 180,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "rf",
    "camada 1",
    "camada 2",
    "segurança wireless",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.x",
      "reason": "É necessário entender que uma rede conecta dispositivos para troca de dados, independentemente do meio físico usado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.x",
      "reason": "Wi-Fi envolve camada física e camada de enlace; o modelo OSI ajuda a separar rádio, quadros, IP e aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Wi-Fi também usa endereços MAC, quadros, associação ao meio e integração com redes Ethernet por meio de APs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.x",
      "reason": "Depois de associar ao Wi-Fi, o cliente ainda precisa de IP, máscara, gateway, DNS e rotas para usar serviços reais."
    }
  ],
  "objectives": [
    "Diferenciar Wi-Fi, internet, rede local, AP, roteador doméstico e provedor de acesso.",
    "Explicar por que redes wireless surgiram como resposta ao problema de mobilidade e custo de cabeamento.",
    "Identificar os componentes básicos de uma rede Wi-Fi: cliente, AP, SSID, BSSID, canal, rádio, switch, VLAN e gateway.",
    "Entender por que Wi-Fi exige planejamento próprio de cobertura, capacidade, interferência, segurança e operação.",
    "Relacionar Wi-Fi com ambientes corporativos, cloud, DevSecOps, IAM e Segurança da Informação."
  ],
  "learningOutcomes": [
    "Dado um cenário em que alguém diz que a internet caiu, o aluno consegue separar problema de rádio, associação, IP, DNS, gateway e aplicação.",
    "Dado um desenho de rede simples, o aluno consegue apontar onde fica o AP, onde começa a rede cabeada e onde entram firewall, DHCP e DNS.",
    "Dado um ambiente empresarial com usuários, visitantes e IoT, o aluno consegue explicar por que um único Wi-Fi sem segmentação é arriscado.",
    "Dado um laboratório doméstico, o aluno consegue coletar evidências básicas de SSID, BSSID, banda, canal, sinal, gateway e DNS sem executar ações ofensivas."
  ],
  "content": {
    "motivation": "\n      <section class=\"lesson-section lesson-section--motivation\">\n        <h2>1. Motivação</h2>\n        <p>\n          Imagine uma manhã comum em uma empresa. A equipe de atendimento começa a reclamar que \"a internet caiu\". O time comercial diz que o sistema web está lento. Um gestor, conectado pelo notebook em uma sala de reunião, consegue abrir alguns sites, mas não consegue acessar o ERP interno. Visitantes dizem que o Wi-Fi de convidados conecta, mas não navega. O SOC percebe tentativas de autenticação suspeitas vindas de uma rede sem fio. Em paralelo, o time de infraestrutura olha o firewall e não encontra queda de link com o provedor.\n        </p>\n        <p>\n          Essa confusão acontece porque, no vocabulário do usuário final, \"Wi-Fi\" e \"internet\" costumam virar a mesma coisa. Tecnicamente, são coisas diferentes. Wi-Fi é uma tecnologia de rede local sem fio. Internet é uma rede global composta por muitos sistemas autônomos, provedores, rotas, serviços e protocolos. Uma pessoa pode estar conectada ao Wi-Fi e mesmo assim não ter internet. Também pode não estar associada ao Wi-Fi, mas ter internet pelo cabo ou pelo 4G/5G. Pode ter sinal excelente e DNS quebrado. Pode autenticar no SSID correto, receber IP errado, cair em VLAN errada ou ser bloqueada por uma política de firewall.\n        </p>\n        <div class=\"callout callout--problem\">\n          <strong>Problema real:</strong> em operações de TI, a frase \"o Wi-Fi caiu\" raramente descreve a causa. Ela descreve um sintoma percebido. O profissional precisa descobrir se a falha está no rádio, no AP, no cliente, na autenticação, no DHCP, no DNS, na rota, no firewall, no proxy, no serviço ou na internet.\n        </div>\n        <p>\n          Redes wireless existem porque o mundo real não é estático. Pessoas se movem. Dispositivos mudam de lugar. Salas são reorganizadas. Visitantes chegam. Coletores de estoque andam por galpões. Smartphones precisam de conectividade sem cabo. Sensores e equipamentos IoT aparecem em locais onde passar cabo é caro ou inviável. O wireless resolve o problema da mobilidade e da flexibilidade, mas troca a previsibilidade do cabo por um meio compartilhado, invisível e sujeito a interferência: o ar.\n        </p>\n      </section>\n    ",
    "history": "\n      <section class=\"lesson-section lesson-section--history\">\n        <h2>2. História</h2>\n        <p>\n          Antes das redes sem fio modernas, a conectividade corporativa dependia quase totalmente de cabos. O modelo era claro: uma estação de trabalho conectava sua placa de rede a uma tomada, a tomada chegava a um patch panel, o patch panel ligava ao switch, o switch conectava a roteadores, firewalls e servidores. Esse desenho era, e ainda é, excelente para estabilidade, capacidade, previsibilidade e segurança física. O cabo delimita melhor onde o sinal chega. Para alguém acessar a rede, normalmente precisa estar fisicamente conectado a uma porta.\n        </p>\n        <p>\n          O problema apareceu quando a computação deixou de estar presa à mesa. Notebooks ficaram comuns. Depois vieram smartphones, tablets, scanners portáteis, equipamentos médicos móveis, impressoras sem fio, câmeras, sensores, dispositivos industriais e visitantes com seus próprios aparelhos. O custo de passar cabo para cada local, mesa temporária, sala de reunião ou dispositivo móvel se tornou alto. Em muitos ambientes, era impossível ou pouco prático.\n        </p>\n        <p>\n          A família IEEE 802.11 surgiu para padronizar redes locais sem fio, definindo como estações e pontos de acesso compartilham o meio de rádio nas camadas física e de enlace. Ao longo do tempo, a família evoluiu de velocidades modestas e segurança fraca para padrões muito mais eficientes, com melhorias em modulação, múltiplas antenas, uso de bandas, eficiência em ambientes densos e recursos de segurança. O IEEE lista a publicação do IEEE Std 802.11be-2024, associado ao Wi-Fi 7, como uma evolução recente da família 802.11, com modificações em PHY e MAC e foco em alta vazão, compatibilidade e coexistência em 2.4 GHz, 5 GHz e 6 GHz.\n        </p>\n        <p>\n          A história da segurança wireless também é uma história de correção de erros. O WEP tentou oferecer confidencialidade parecida com a do cabo, mas se mostrou fraco. O NIST SP 800-97 descreve WEP como inerentemente falho e explica a evolução para redes robustas baseadas em 802.11i. Mais tarde, WPA2 e WPA3 consolidaram modelos mais seguros, mas ainda dependem de configuração correta, autenticação adequada, senhas fortes ou 802.1X, segmentação e monitoramento.\n        </p>\n      </section>\n    ",
    "problem": "\n      <section class=\"lesson-section lesson-section--problem\">\n        <h2>3. Problema</h2>\n        <p>\n          O problema central que redes wireless resolvem é conectar dispositivos sem exigir um cabo físico até cada ponto de uso. Mas a solução cria uma nova classe de problemas técnicos e operacionais. Em Ethernet cabeada, cada porta de switch tem um domínio físico bem definido. No Wi-Fi, muitos clientes compartilham o mesmo meio de transmissão. O sinal se espalha, atravessa paredes, sofre atenuação, reflete, encontra ruído e compete com outros transmissores. O ar vira o equivalente a um cabo coletivo, invisível e disputado.\n        </p>\n        <p>\n          Isso muda o raciocínio de rede. Um cabo ruim normalmente afeta uma porta ou enlace. Um canal congestionado pode afetar dezenas de clientes. Um AP mal posicionado pode criar área de sombra. Potência excessiva pode gerar clientes grudados em AP distante. Muitos SSIDs podem consumir airtime com beacons. Um visitante na mesma rede dos servidores internos cria risco de exposição lateral. Um PSK compartilhado por todos os usuários dificulta revogação individual. Uma rede guest mal segmentada pode abrir caminho para ativos corporativos.\n        </p>\n        <ul class=\"flow-list\">\n          <li><strong>Sem wireless:</strong> mobilidade e flexibilidade ficam limitadas por pontos de rede física.</li>\n          <li><strong>Com wireless mal planejado:</strong> surgem lentidão, instabilidade, interferência, cobertura irregular, autenticação frágil e risco de acesso indevido.</li>\n          <li><strong>Com wireless bem planejado:</strong> a empresa ganha mobilidade, segmentação, autenticação, rastreabilidade, experiência de usuário e operação monitorável.</li>\n        </ul>\n        <div class=\"callout callout--warning\">\n          <strong>Confusão comum:</strong> sinal forte não significa rede boa. Um cliente pode ter RSSI aparentemente adequado e ainda sofrer com ruído, canal congestionado, baixa relação sinal-ruído, autenticação lenta, DHCP problemático, DNS incorreto ou bloqueio de firewall.\n        </div>\n      </section>\n    ",
    "evolution": "\n      <section class=\"lesson-section lesson-section--evolution\">\n        <h2>4. Evolução</h2>\n        <p>\n          A evolução do wireless pode ser entendida como uma tentativa contínua de equilibrar mobilidade, velocidade, eficiência, segurança e operação. No começo, a pergunta principal era: como conectar sem cabo? Depois a pergunta virou: como conectar muitos clientes com desempenho aceitável? Em seguida: como proteger o acesso? Hoje, em empresas, a pergunta é mais ampla: como entregar experiência confiável, segmentada, auditável, integrada a identidade, observável e segura?\n        </p>\n        <table class=\"data-table comparison-table\">\n          <thead>\n            <tr>\n              <th>Fase</th>\n              <th>Como funcionava</th>\n              <th>Limitação</th>\n              <th>O que veio depois</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Rede cabeada pura</td>\n              <td>Dispositivo ligado por cabo a uma porta física.</td>\n              <td>Baixa mobilidade e alto custo de expansão física.</td>\n              <td>Uso de APs para acesso sem fio.</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi doméstico simples</td>\n              <td>Roteador único acumulando AP, switch, NAT, DHCP e firewall.</td>\n              <td>Pouca separação de funções, pouco monitoramento e segurança limitada.</td>\n              <td>Arquiteturas corporativas com APs gerenciados e VLANs.</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi corporativo básico</td>\n              <td>Vários APs, SSIDs separados e integração com switches.</td>\n              <td>Risco de excesso de SSIDs, roaming ruim e autenticação compartilhada.</td>\n              <td>Controladoras, 802.1X, RADIUS, NAC e telemetria.</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi moderno</td>\n              <td>Bandas 2.4/5/6 GHz, alta densidade, otimização de canal, segurança forte e logs.</td>\n              <td>Maior complexidade operacional, custo e dependência de desenho correto.</td>\n              <td>Integração com Zero Trust, cloud-managed networking, SIEM e automação.</td>\n            </tr>\n          </tbody>\n        </table>\n        <p>\n          O Wi-Fi moderno não substitui a rede cabeada em todos os cenários. Ele complementa. Access points ainda precisam de energia, uplink, VLAN, DHCP, DNS, roteamento, firewall e monitoramento. Em muitas empresas, o Wi-Fi é a borda de acesso mais usada pelos usuários, mas a sustentação continua dependendo de fundamentos já vistos nos módulos anteriores: Ethernet, MAC, IPv4, DHCP, DNS, NAT, firewall, VPN e roteamento.\n        </p>\n      </section>\n    ",
    "concept": "\n      <section class=\"lesson-section lesson-section--concept\">\n        <h2>5. Conceito</h2>\n        <p>\n          Wi-Fi é uma tecnologia de rede local sem fio baseada na família IEEE 802.11. Ela permite que estações, como notebooks e celulares, se comuniquem com um ponto de acesso usando rádio. O ponto de acesso conecta o mundo sem fio ao restante da rede, normalmente por uma rede cabeada Ethernet. O AP não é necessariamente o roteador, o firewall, o DHCP ou a internet. Em roteadores domésticos, essas funções aparecem juntas no mesmo equipamento, mas em empresas elas costumam ser separadas.\n        </p>\n        <div class=\"definition-box\">\n          <strong>Definição:</strong> uma rede Wi-Fi é uma WLAN, Wireless Local Area Network, na qual dispositivos clientes usam ondas de rádio para acessar uma rede local por meio de um ponto de acesso, respeitando regras de associação, autenticação, compartilhamento do meio, criptografia e encaminhamento para a infraestrutura cabeada.\n        </div>\n        <p>\n          Para entender Wi-Fi sem confusão, separe cinco ideias. Primeiro, o rádio é o meio físico. Segundo, o SSID é o nome lógico que o usuário vê. Terceiro, o BSSID identifica uma célula específica, normalmente associada ao rádio de um AP. Quarto, o cliente precisa se associar e autenticar antes de usar a rede. Quinto, depois de entrar no Wi-Fi, ele ainda precisa dos serviços de rede: endereço IP, gateway, DNS, rotas e permissão nas políticas.\n        </p>\n      </section>\n    ",
    "internals": "\n      <section class=\"lesson-section lesson-section--internals\">\n        <h2>6. Funcionamento interno</h2>\n        <p>\n          Por dentro, Wi-Fi não é apenas \"sinal\". Existe uma sequência de decisões antes de um usuário abrir uma aplicação. O cliente precisa descobrir redes disponíveis, escolher um SSID/BSSID, negociar parâmetros, autenticar, associar, obter configuração IP e só então falar com serviços. Em uma empresa, ainda pode haver RADIUS, certificados, atribuição dinâmica de VLAN, portal cativo, políticas por grupo, inspeção de firewall e logs enviados ao SIEM.\n        </p>\n        <ol class=\"flow-list\">\n          <li><strong>Varredura:</strong> o cliente procura redes por meio de beacons emitidos por APs ou por sondagens ativas.</li>\n          <li><strong>Escolha:</strong> o cliente avalia SSID, BSSID, banda, sinal, histórico, política do sistema e qualidade percebida.</li>\n          <li><strong>Autenticação/associação:</strong> cliente e AP estabelecem uma relação de camada 2 para permitir troca de quadros de dados.</li>\n          <li><strong>Segurança:</strong> dependendo do modo, ocorre uso de PSK, SAE, 802.1X/EAP, RADIUS, certificados ou política de acesso.</li>\n          <li><strong>Configuração IP:</strong> o cliente normalmente solicita endereço via DHCP e recebe IP, máscara, gateway e DNS.</li>\n          <li><strong>Encaminhamento:</strong> o tráfego sai do cliente pelo rádio, chega ao AP e é encaminhado à rede cabeada, VLAN, firewall, proxy ou serviço.</li>\n          <li><strong>Monitoramento:</strong> eventos de associação, falha, roaming, autenticação e tráfego podem ser registrados para operação e segurança.</li>\n        </ol>\n        <p>\n          A parte crítica é que cada etapa pode falhar de forma parecida para o usuário. Uma senha errada, um RADIUS indisponível, uma VLAN sem DHCP, um DNS incorreto, um firewall bloqueando ou um canal saturado podem ser percebidos como \"Wi-Fi ruim\". O profissional precisa transformar a reclamação em hipótese técnica testável.\n        </p>\n      </section>\n    ",
    "architecture": "\n      <section class=\"lesson-section lesson-section--architecture\">\n        <h2>7. Arquitetura</h2>\n        <p>\n          Em arquitetura, o Wi-Fi fica na borda de acesso. Ele conecta clientes ao restante da rede. Mas essa borda não deve ser tratada como uma rede plana e confiável. Em uma organização madura, o desenho wireless envolve pelo menos APs, switches, VLANs, DHCP, DNS, firewall, autenticação, logs, monitoramento, segmentação de visitantes e política de dispositivos.\n        </p>\n        <ul>\n          <li><strong>Camadas envolvidas:</strong> camada 1 por rádio, camada 2 por quadros 802.11/802.3 e camada 3 quando o cliente recebe IP e usa gateway.</li>\n          <li><strong>Componentes:</strong> cliente, rádio, AP, SSID, BSSID, switch PoE, VLAN, controladora, RADIUS, DHCP, DNS, firewall e SIEM.</li>\n          <li><strong>Dependências:</strong> energia, uplink, trunk VLAN, escopo DHCP, resolução DNS, rota default, regras de firewall e credenciais válidas.</li>\n          <li><strong>Pontos de falha:</strong> interferência, cobertura, canal, firmware, autenticação, certificado, VLAN errada, DHCP esgotado, DNS quebrado, rota e bloqueio de política.</li>\n        </ul>\n        <p>\n          Em casa, um único equipamento costuma esconder tudo: AP, switch, roteador, NAT, firewall e DHCP. Em empresa, separar essas funções é saudável porque permite controle, auditoria, escalabilidade e segurança. O aluno deve abandonar a visão de \"roteador Wi-Fi\" como peça única universal e passar a pensar em Wi-Fi como uma camada de acesso integrada a uma arquitetura maior.\n        </p>\n      </section>\n    ",
    "analogy": "\n      <section class=\"lesson-section lesson-section--analogy\">\n        <h2>8. Analogia</h2>\n        <p>\n          Pense em uma rede cabeada como corredores com portas numeradas. Cada pessoa precisa estar fisicamente em uma porta para entrar no prédio. Já o Wi-Fi parece mais com uma recepção por rádio em uma praça. Várias pessoas falam pelo mesmo espaço, precisam respeitar regras para não falar ao mesmo tempo, precisam se identificar, receber autorização e só então conseguem acessar áreas internas.\n        </p>\n        <p>\n          O SSID seria como a placa com o nome da recepção: \"Corporativo\", \"Visitantes\" ou \"IoT\". O AP seria o atendente que escuta e encaminha. A VLAN seria o corredor interno para onde aquela pessoa é direcionada. O firewall seria a catraca que decide quais áreas podem ser acessadas. O RADIUS seria o sistema que valida a identidade. O SIEM seria o livro de registros analisado pelo time de segurança.\n        </p>\n        <div class=\"callout callout--warning\">\n          <strong>Limite da analogia:</strong> no rádio, as pessoas não estão em filas perfeitamente organizadas. O meio é compartilhado, sujeito a ruído, interferência, distância e características físicas. Além disso, o cliente participa da decisão de qual AP usar, o que torna roaming e qualidade mais complexos do que uma recepção comum.\n        </div>\n      </section>\n    ",
    "simpleExample": "\n      <section class=\"lesson-section lesson-section--example\">\n        <h2>9. Exemplo simples</h2>\n        <p>\n          Em casa, você vê o nome \"Casa-5G\" no celular. Esse nome é o SSID. O celular seleciona esse SSID, conversa com o rádio do roteador/AP, autentica com a senha configurada, associa e depois solicita um IP por DHCP. O roteador doméstico provavelmente entrega um IP privado, como 192.168.1.50, informa o gateway 192.168.1.1 e fornece DNS. Quando você abre um site, o tráfego sai pelo Wi-Fi, passa pelo roteador, sofre NAT e segue para a internet.\n        </p>\n        <p>\n          Se algo falhar, o sintoma pode parecer igual. Se a senha estiver errada, você nem entra na rede. Se o DHCP falhar, você pode aparecer como conectado, mas sem IP útil. Se o DNS estiver ruim, pode pingar IP público e não abrir nomes. Se o provedor estiver fora, o Wi-Fi continua funcionando localmente, mas sem internet. Se o sinal estiver fraco, a experiência pode alternar entre lentidão e queda.\n        </p>\n      </section>\n    ",
    "enterpriseExample": "\n      <section class=\"lesson-section lesson-section--enterprise\">\n        <h2>10. Exemplo empresarial</h2>\n        <p>\n          Em uma empresa, normalmente existem SSIDs diferentes para perfis diferentes. Um SSID corporativo pode usar WPA2/WPA3-Enterprise com 802.1X, validando usuário ou dispositivo contra uma infraestrutura de identidade. Um SSID de visitantes pode usar portal cativo ou credenciais temporárias e ser isolado da rede interna. Um SSID de IoT pode colocar câmeras, sensores e impressoras em VLAN própria, com regras muito restritas. Um SSID administrativo pode nem existir, porque equipamentos críticos devem ficar no cabo.\n        </p>\n        <p>\n          Esse desenho conecta Wi-Fi com segurança. O AP não deve simplesmente jogar todos os clientes na mesma rede. Ele deve encaminhar o tráfego para VLANs ou túneis corretos, registrar eventos, permitir auditoria e respeitar políticas. O firewall decide se visitantes podem acessar apenas internet, se IoT pode falar com um broker específico, se usuários autenticados podem acessar sistemas internos e se tráfego lateral deve ser bloqueado.\n        </p>\n        <p>\n          Um erro comum é criar muitos SSIDs para cada pequeno grupo. Isso parece organizado, mas pode degradar o uso do meio, aumentar beacons e dificultar operação. Muitas vezes, o melhor desenho combina poucos SSIDs bem pensados com autenticação forte, atribuição dinâmica de política, VLANs, grupos de identidade e regras de firewall.\n        </p>\n      </section>\n    ",
    "cloudExample": "\n      <section class=\"lesson-section lesson-section--cloud\">\n        <h2>11. Exemplo em cloud</h2>\n        <p>\n          Cloud networking não usa Wi-Fi dentro da VPC ou VNet do mesmo jeito que um escritório usa APs, mas o raciocínio de acesso, borda, segmentação e política continua. O Wi-Fi corporativo conecta usuários ao ambiente da empresa; a cloud conecta workloads a sub-redes, security groups, firewalls, private endpoints e serviços gerenciados. Nos dois mundos, conectividade não deve ser confundida com autorização.\n        </p>\n        <p>\n          Um cenário comum é o usuário entrar no Wi-Fi corporativo, autenticar por 802.1X, receber uma VLAN de usuários, sair por firewall ou proxy, resolver DNS privado e acessar um sistema hospedado em cloud por VPN, ExpressRoute, Direct Connect, Interconnect, ZTNA ou Private Endpoint. O problema percebido como \"Wi-Fi ruim\" pode estar no AP, no DNS privado, na rota híbrida, no túnel, no firewall cloud, na política de identidade ou no load balancer.\n        </p>\n        <p>\n          Em operações modernas, Wi-Fi e cloud se encontram na experiência do usuário. Um notebook no escritório acessa SaaS, repositórios Git, pipelines, dashboards, VPNs, IdP, EDR e sistemas internos. A rede sem fio é a primeira perna desse caminho. Se ela for instável, insegura ou sem telemetria, a investigação de incidentes e problemas de desempenho fica muito mais difícil.\n        </p>\n      </section>\n    ",
    "devsecopsExample": "\n      <section class=\"lesson-section lesson-section--devsecops\">\n        <h2>12. Exemplo em DevSecOps</h2>\n        <p>\n          Em DevSecOps, o Wi-Fi aparece indiretamente, mas de forma importante. Um desenvolvedor pode estar conectado pelo Wi-Fi corporativo e executar deploys, acessar repositórios, aprovar pull requests, abrir sessões SSH, consultar segredos, acessar clusters Kubernetes e operar pipelines. Se a rede sem fio é tratada como uma rede plana e confiável, um dispositivo comprometido conectado ao Wi-Fi pode se tornar ponto inicial para tentar acessar serviços internos.\n        </p>\n        <p>\n          O desenho correto separa conectividade de privilégio. Estar no Wi-Fi não deve significar poder acessar tudo. O acesso a repositórios, pipelines, clusters e ambientes cloud deve depender de identidade, MFA, autorização, postura do dispositivo, certificados, rede de origem quando aplicável, logs e política. A rede wireless fornece transporte; a segurança moderna adiciona camadas de controle.\n        </p>\n        <p>\n          Em automação, também é comum versionar decisões de rede: nomes de SSIDs, VLANs, políticas, escopos DHCP, regras de firewall, grupos de acesso e dashboards podem entrar em documentação, templates ou processos de mudança. O objetivo não é transformar Wi-Fi em código a qualquer custo, mas reduzir configuração artesanal invisível e melhorar rastreabilidade.\n        </p>\n      </section>\n    ",
    "securityExample": "\n      <section class=\"lesson-section lesson-section--security\">\n        <h2>13. Exemplo em Segurança</h2>\n        <p>\n          Wireless tem uma característica de segurança especial: o limite físico é menos claro. Em uma rede cabeada, o atacante normalmente precisa tocar em uma porta ou comprometer um ativo já conectado. No wireless, alguém no estacionamento, em uma sala vizinha ou em um andar próximo pode observar beacons e tentar interagir com a superfície sem estar dentro do escritório. Isso não significa que Wi-Fi seja inseguro por natureza. Significa que ele exige autenticação forte, criptografia, segmentação, monitoramento e desenho consciente.\n        </p>\n        <table class=\"data-table risk-table\">\n          <thead>\n            <tr>\n              <th>Risco</th>\n              <th>Como aparece</th>\n              <th>Impacto</th>\n              <th>Mitigação</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Confundir Wi-Fi com perímetro confiável</td>\n              <td>Usuário conectado ao SSID corporativo ganha acesso amplo demais.</td>\n              <td>Movimento lateral e exposição de sistemas internos.</td>\n              <td>Segmentação, firewall interno, NAC, menor privilégio e logs.</td>\n            </tr>\n            <tr>\n              <td>Senha compartilhada por todos</td>\n              <td>PSK antigo continua em uso após desligamento de funcionário.</td>\n              <td>Dificuldade de revogar acesso individual.</td>\n              <td>Preferir 802.1X em redes corporativas e rotacionar credenciais quando PSK for inevitável.</td>\n            </tr>\n            <tr>\n              <td>Rede guest mal isolada</td>\n              <td>Visitante recebe IP em rede com rota para servidores internos.</td>\n              <td>Aumento de superfície de ataque e risco de vazamento.</td>\n              <td>VLAN guest, firewall restritivo, isolamento de cliente e saída controlada.</td>\n            </tr>\n            <tr>\n              <td>AP não autorizado</td>\n              <td>Alguém instala roteador próprio em uma porta interna.</td>\n              <td>Bypass de políticas, sombra de segurança e credenciais expostas.</td>\n              <td>Inventário, detecção de rogue AP, segurança de portas e varredura defensiva autorizada.</td>\n            </tr>\n          </tbody>\n        </table>\n        <p>\n          O laboratório desta aula é defensivo: o objetivo é observar a própria rede e coletar evidências de diagnóstico. Não há instruções de ataque, quebra de senha, desautenticação, captura ofensiva ou tentativa de burlar controles. O limite ético é simples: só analise redes próprias ou redes para as quais você tem autorização explícita.\n        </p>\n      </section>\n    ",
    "diagram": "\n      <section class=\"lesson-section lesson-section--diagram\">\n        <h2>14. Diagrama SVG</h2>\n        <p>\n          O fluxo abaixo mostra que Wi-Fi é apenas a primeira parte do caminho. O cliente entra pelo rádio, o AP faz a ponte para a rede cabeada, o switch transporta VLANs, o firewall aplica política e os serviços podem estar no datacenter, na internet ou em cloud.\n        </p>\n        <svg class=\"lesson-svg\" viewBox=\"0 0 960 520\" role=\"img\" aria-labelledby=\"wifi-why-title wifi-why-desc\">\n          <title id=\"wifi-why-title\">Wi-Fi como borda de acesso da arquitetura de rede</title>\n          <desc id=\"wifi-why-desc\">Um cliente wireless se associa ao AP, passa por switch, VLAN, firewall, serviços internos, internet e cloud. O diagrama destaca que Wi-Fi não é internet, mas uma camada de acesso.</desc>\n          <defs>\n            <marker id=\"arrow-wifi-1201\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n              <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n            </marker>\n          </defs>\n\n          <rect x=\"30\" y=\"40\" width=\"230\" height=\"390\" rx=\"18\" class=\"svg-zone\" />\n          <text x=\"145\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Borda wireless</text>\n\n          <rect x=\"55\" y=\"120\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--client\" />\n          <text x=\"130\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n          <text x=\"130\" y=\"174\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">notebook/celular</text>\n\n          <path d=\"M210 135 C250 105, 250 205, 210 175\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-1201)\" />\n          <path d=\"M225 120 C285 80, 285 220, 225 190\" class=\"svg-flow svg-flow--request\" />\n\n          <rect x=\"300\" y=\"115\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n          <text x=\"375\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">AP</text>\n          <text x=\"375\" y=\"169\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SSID/BSSID</text>\n\n          <line x1=\"450\" y1=\"155\" x2=\"555\" y2=\"155\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-wifi-1201)\" />\n\n          <rect x=\"555\" y=\"115\" width=\"145\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n          <text x=\"628\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n          <text x=\"628\" y=\"169\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">PoE / VLAN</text>\n\n          <line x1=\"700\" y1=\"155\" x2=\"800\" y2=\"155\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-wifi-1201)\" />\n\n          <rect x=\"800\" y=\"115\" width=\"130\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n          <text x=\"865\" y=\"145\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n          <text x=\"865\" y=\"169\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">políticas</text>\n\n          <rect x=\"310\" y=\"300\" width=\"150\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--security\" />\n          <text x=\"385\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">RADIUS/NAC</text>\n          <text x=\"385\" y=\"354\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">identidade</text>\n\n          <line x1=\"375\" y1=\"195\" x2=\"385\" y2=\"300\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-1201)\" />\n\n          <rect x=\"560\" y=\"300\" width=\"150\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--router\" />\n          <text x=\"635\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">DHCP/DNS</text>\n          <text x=\"635\" y=\"354\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">serviços base</text>\n\n          <line x1=\"625\" y1=\"195\" x2=\"635\" y2=\"300\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-1201)\" />\n\n          <rect x=\"790\" y=\"300\" width=\"140\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n          <text x=\"860\" y=\"330\" text-anchor=\"middle\" class=\"svg-label\">Cloud/SaaS</text>\n          <text x=\"860\" y=\"354\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">internet/VPN</text>\n\n          <line x1=\"865\" y1=\"195\" x2=\"860\" y2=\"300\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-wifi-1201)\" />\n\n          <rect x=\"60\" y=\"295\" width=\"175\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n          <text x=\"148\" y=\"325\" text-anchor=\"middle\" class=\"svg-label\">Observabilidade</text>\n          <text x=\"148\" y=\"349\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs / eventos / SIEM</text>\n\n          <line x1=\"300\" y1=\"175\" x2=\"235\" y2=\"310\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-wifi-1201)\" />\n          <line x1=\"800\" y1=\"175\" x2=\"235\" y2=\"335\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-wifi-1201)\" />\n\n          <text x=\"480\" y=\"455\" text-anchor=\"middle\" class=\"svg-label\">Wi-Fi entrega acesso local; internet, cloud e sistemas dependem de IP, DNS, rotas, firewall, identidade e serviços.</text>\n        </svg>\n      </section>\n    ",
    "labIntro": "\n      <section class=\"lesson-section lesson-section--lab\">\n        <h2>15. Laboratório</h2>\n        <p>\n          Neste laboratório, você não irá atacar redes. Você irá fazer inventário e diagnóstico básico do próprio Wi-Fi, separando o que é rádio, o que é camada 2, o que é camada 3 e o que é serviço. A meta é treinar a postura profissional: coletar evidências antes de concluir.\n        </p>\n      </section>\n    ",
    "exercisesIntro": "\n      <section class=\"lesson-section lesson-section--exercises\">\n        <h2>16. Exercícios</h2>\n        <p>\n          Os exercícios forçam você a traduzir reclamações vagas em hipóteses técnicas. Isso é uma habilidade essencial para troubleshooting, SOC, arquitetura e atendimento a incidentes.\n        </p>\n      </section>\n    ",
    "challengeIntro": "\n      <section class=\"lesson-section lesson-section--challenge\">\n        <h2>17. Desafio</h2>\n        <p>\n          O desafio simula uma decisão real: desenhar a primeira versão de uma rede Wi-Fi para uma pequena empresa sem criar uma rede plana, insegura e impossível de diagnosticar.\n        </p>\n      </section>\n    ",
    "solutionIntro": "\n      <section class=\"lesson-section lesson-section--solution\">\n        <h2>18. Solução comentada</h2>\n        <p>\n          A solução comentada explica o raciocínio: primeiro separar perfis de uso, depois definir SSIDs mínimos, mapear VLANs, aplicar políticas, prever logs e criar um plano de validação.\n        </p>\n      </section>\n    ",
    "summary": "\n      <section class=\"lesson-section lesson-section--summary\">\n        <h2>19. Resumo</h2>\n        <ul>\n          <li><strong>Ideia central:</strong> Wi-Fi é acesso local sem fio, não sinônimo de internet.</li>\n          <li><strong>O que lembrar:</strong> depois de associar ao Wi-Fi, o cliente ainda precisa de IP, DNS, gateway, rotas e permissão.</li>\n          <li><strong>Erro comum:</strong> diagnosticar tudo como sinal fraco sem verificar autenticação, DHCP, DNS, VLAN e firewall.</li>\n          <li><strong>Uso real:</strong> empresas usam Wi-Fi como borda de acesso integrada a VLANs, identidade, firewall, guest network, NAC, logs e SIEM.</li>\n          <li><strong>Segurança:</strong> estar próximo ao rádio não deve equivaler a estar autorizado a acessar sistemas internos.</li>\n        </ul>\n      </section>\n    ",
    "nextTheme": "\n      <section class=\"lesson-section lesson-section--next\">\n        <h2>20. Próximo tema</h2>\n        <p>\n          A próxima aula aprofunda o que torna Wi-Fi diferente do cabo: radiofrequência. Você vai estudar frequência, canais, largura de canal, potência, interferência, RSSI e SNR. Isso é essencial porque muitos problemas de Wi-Fi não estão no IP, no DNS ou no firewall; estão no comportamento físico do rádio.\n        </p>\n      </section>\n    "
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet"
    ],
    "relatedProtocols": [
      "IEEE 802.11",
      "IEEE 802.3",
      "DHCP",
      "DNS",
      "ARP",
      "IPv4",
      "802.1X",
      "RADIUS"
    ],
    "dependsOn": [
      "bits e sinais",
      "endereços MAC",
      "Ethernet",
      "IPv4",
      "DHCP",
      "DNS",
      "firewall"
    ],
    "enables": [
      "mobilidade",
      "redes guest",
      "acesso corporativo sem fio",
      "IoT sem fio",
      "roaming",
      "NAC",
      "telemetria wireless"
    ]
  },
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente wireless",
      "action": "Procura redes disponíveis.",
      "detail": "Observa beacons ou envia probes para descobrir SSIDs e BSSIDs próximos.",
      "possibleFailure": "Driver, rádio desligado, distância, banda incompatível ou SSID oculto mal entendido."
    },
    {
      "step": 2,
      "actor": "Cliente wireless",
      "action": "Escolhe um AP/BSSID.",
      "detail": "A decisão pode considerar sinal, banda, histórico, política do sistema operacional e capacidade.",
      "possibleFailure": "Cliente fica preso em AP distante ou escolhe banda congestionada."
    },
    {
      "step": 3,
      "actor": "AP e cliente",
      "action": "Executam associação e autenticação.",
      "detail": "Dependendo do modo, pode envolver PSK, SAE ou 802.1X/EAP com RADIUS.",
      "possibleFailure": "Senha errada, certificado inválido, RADIUS indisponível ou política negada."
    },
    {
      "step": 4,
      "actor": "Cliente",
      "action": "Obtém parâmetros de rede.",
      "detail": "Normalmente usa DHCP para receber IP, máscara, gateway e DNS.",
      "possibleFailure": "Escopo DHCP esgotado, VLAN errada, relay ausente ou bloqueio no caminho."
    },
    {
      "step": 5,
      "actor": "Rede corporativa",
      "action": "Aplica políticas e encaminha tráfego.",
      "detail": "Switch, firewall, proxy, DNS e rotas determinam o que o cliente acessa.",
      "possibleFailure": "Regra de firewall, rota, NAT, DNS ou proxy impedindo acesso."
    }
  ],
  "deepDive": {
    "mentalModel": "Wi-Fi deve ser pensado como uma borda de acesso por rádio. Ele substitui o cabo entre cliente e AP, mas não substitui IP, DHCP, DNS, roteamento, firewall, identidade, logs ou desenho de segurança.",
    "keyTerms": [
      "Wi-Fi",
      "WLAN",
      "SSID",
      "BSSID",
      "AP",
      "cliente wireless",
      "rádio",
      "canal",
      "associação",
      "autenticação",
      "airtime",
      "rede guest"
    ],
    "limitations": [
      "Wi-Fi usa meio compartilhado e pode sofrer interferência de redes vizinhas, obstáculos, ruído e clientes antigos.",
      "Sinal forte não garante boa experiência se houver ruído, saturação, autenticação lenta, DHCP problemático ou DNS quebrado.",
      "Wi-Fi não substitui segmentação, firewall, identidade e monitoramento.",
      "A cobertura de rádio não respeita perfeitamente paredes, andares e limites físicos da organização."
    ],
    "whenToUse": [
      "Dispositivos móveis, visitantes, salas de reunião, ambientes flexíveis, coletores, tablets, smartphones e cenários em que cabeamento é caro ou inviável.",
      "Ambientes que exigem mobilidade com controle de identidade, segmentação e logs.",
      "Complemento à rede cabeada, não substituto universal para servidores, storage e equipamentos críticos."
    ],
    "whenNotToUse": [
      "Como principal conexão de servidores críticos quando há opção cabeada estável.",
      "Para substituir segmentação e controle de acesso por simples senha compartilhada.",
      "Em locais com alta exigência de latência determinística sem estudo de RF, capacidade e interferência.",
      "Em redes de automação ou segurança física sem análise de disponibilidade, interferência e risco."
    ],
    "operationalImpact": [
      "Exige planejamento de cobertura, capacidade, canais, potência, atualização de firmware e documentação.",
      "Aumenta a necessidade de telemetria: eventos de associação, falhas de autenticação, roaming, utilização de canal e reclamações por local.",
      "Muda o troubleshooting: é necessário separar rádio, associação, IP, DNS, firewall e aplicação."
    ],
    "financialImpact": [
      "Reduz custo de cabeamento em alguns cenários, mas adiciona custo de APs, switches PoE, licenças de controladora, suporte e monitoramento.",
      "Soluções cloud-managed podem simplificar operação, mas geram assinatura recorrente.",
      "Ambientes críticos podem exigir site survey, ferramentas de análise, APs adicionais e equipe especializada."
    ],
    "securityImpact": [
      "Aumenta a superfície de acesso porque o sinal pode ser visto além dos limites físicos da sala.",
      "Exige autenticação forte, criptografia moderna, segmentação, logs e política para visitantes e IoT.",
      "Redes wireless mal isoladas favorecem movimento lateral e exposição indevida de serviços internos."
    ]
  },
  "realWorld": {
    "homeScenario": "Um roteador doméstico combina AP, switch, roteador, NAT, DHCP e firewall. Isso facilita uso, mas esconde as funções reais que em empresa são separadas.",
    "smallBusinessScenario": "Uma pequena empresa usa um SSID para funcionários e outro para visitantes. O erro comum é colocar ambos na mesma rede IP, sem isolamento real.",
    "enterpriseScenario": "Uma organização usa APs gerenciados, SSID corporativo com 802.1X, rede guest isolada, VLAN para IoT, logs centralizados e política de firewall por perfil.",
    "cloudScenario": "Usuários conectados no Wi-Fi corporativo acessam SaaS e aplicações privadas em cloud por DNS privado, VPN, ZTNA ou links dedicados. O sintoma pode começar no Wi-Fi, mas a causa estar em cloud networking.",
    "incidentScenario": "O SOC investiga autenticações incomuns no Wi-Fi guest e descobre um AP não autorizado ligado a uma porta interna, criando bypass de controles."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que Wi-Fi e internet são a mesma coisa.",
      "whyItHappens": "No uso doméstico, o usuário vê o ícone de Wi-Fi como indicador de acesso à internet.",
      "consequence": "O diagnóstico pula etapas e culpa o provedor mesmo quando a falha está em rádio, DHCP, DNS ou firewall.",
      "correction": "Separar acesso wireless, rede local, gateway, DNS, rota e serviço externo."
    },
    {
      "mistake": "Usar um único SSID e uma única rede para funcionários, visitantes e IoT.",
      "whyItHappens": "É mais rápido de configurar e parece funcionar no começo.",
      "consequence": "Cria rede plana, aumenta exposição lateral e dificulta auditoria.",
      "correction": "Separar perfis por SSID/VLAN/política, preferindo poucos SSIDs bem desenhados."
    },
    {
      "mistake": "Achar que mais potência sempre melhora o Wi-Fi.",
      "whyItHappens": "A intuição sugere que sinal mais forte é sempre melhor.",
      "consequence": "Pode aumentar interferência, roaming ruim e clientes presos a APs distantes.",
      "correction": "Planejar potência, canais, densidade e posicionamento com base em medições."
    },
    {
      "mistake": "Confiar em PSK compartilhado como controle corporativo principal.",
      "whyItHappens": "Senha única é simples de configurar e fácil de comunicar.",
      "consequence": "Dificulta revogação individual, rastreabilidade e responsabilização.",
      "correction": "Usar 802.1X/RADIUS quando possível e isolar redes que precisam de PSK."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Cliente vê o SSID, mas não conecta.",
      "Cliente conecta, mas fica sem internet.",
      "Cliente conecta e recebe IP, mas não acessa sistemas internos.",
      "Wi-Fi funciona em uma sala e falha em outra.",
      "A navegação fica lenta em horários de pico.",
      "Usuários móveis caem durante deslocamento entre salas."
    ],
    "diagnosticQuestions": [
      "O problema afeta um cliente, vários clientes ou uma área física?",
      "O cliente está associado ao SSID correto e ao BSSID esperado?",
      "Qual banda, canal, sinal e qualidade percebida?",
      "O cliente recebeu IP, máscara, gateway e DNS corretos?",
      "O problema ocorre por nome, por IP, em todos os serviços ou só em uma aplicação?",
      "Há falhas de autenticação, logs de RADIUS, eventos no AP ou bloqueios no firewall?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, rádio, canal, autenticação, criptografia, sinal e taxa recebida/transmitida.",
        "expectedObservation": "SSID correto, BSSID esperado, sinal razoável e autenticação compatível com a rede.",
        "interpretation": "Se o SSID está correto mas o BSSID é distante ou o sinal é baixo, investigue RF e roaming."
      },
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver IP, máscara, gateway, DNS, DHCP e interface usada.",
        "expectedObservation": "Endereço IP na sub-rede esperada, gateway e DNS coerentes.",
        "interpretation": "Se o cliente está conectado ao Wi-Fi mas sem IP válido, investigue DHCP, VLAN e política."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Test-NetConnection 8.8.8.8; Test-NetConnection exemplo.com -Port 443",
        "purpose": "Separar conectividade IP básica de acesso por nome e porta de aplicação.",
        "expectedObservation": "Testes ajudam a diferenciar rota, DNS e bloqueio de porta.",
        "interpretation": "Se IP externo responde e nome falha, DNS vira hipótese forte. Se 443 falha, verificar firewall/proxy."
      },
      {
        "platform": "Linux",
        "command": "iw dev; nmcli dev wifi list; ip addr; ip route",
        "purpose": "Ver interfaces wireless, redes próximas, IP local e rota default.",
        "expectedObservation": "Interface associada, IP válido e rota default configurada.",
        "interpretation": "Sem rota default, o cliente pode falar localmente, mas não sai para outras redes."
      },
      {
        "platform": "Linux",
        "command": "resolvectl status || cat /etc/resolv.conf",
        "purpose": "Ver servidores DNS configurados.",
        "expectedObservation": "DNS coerente com a rede usada.",
        "interpretation": "DNS errado pode parecer falha de internet mesmo quando a conectividade IP está boa."
      },
      {
        "platform": "Cisco IOS/WLC conceitual",
        "command": "show client detail <mac-do-cliente>",
        "purpose": "Em controladoras compatíveis, verificar AP associado, WLAN, VLAN, política, sinal e eventos do cliente.",
        "expectedObservation": "Cliente associado ao SSID correto, com política e VLAN esperadas.",
        "interpretation": "VLAN ou política divergente explica acesso inesperado ou bloqueio."
      }
    ],
    "decisionTree": [
      {
        "if": "O cliente não vê o SSID",
        "then": "Verificar rádio ligado, banda suportada, alcance, SSID anunciado, modo avião e compatibilidade do cliente."
      },
      {
        "if": "O cliente vê o SSID, mas não conecta",
        "then": "Verificar credencial, método de autenticação, certificado, política do RADIUS/NAC e logs do AP/controladora."
      },
      {
        "if": "O cliente conecta, mas não recebe IP",
        "then": "Verificar VLAN, DHCP, relay, escopo esgotado e bloqueios entre AP/switch/DHCP."
      },
      {
        "if": "O cliente recebe IP, mas não navega por nome",
        "then": "Testar DNS antes de culpar rádio ou provedor."
      },
      {
        "if": "O problema muda conforme a localização física",
        "then": "Investigar RF: sinal, ruído, canal, potência, interferência, AP próximo e roaming."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Separar redes corporativa, guest e IoT por política, VLAN e firewall.",
      "Usar WPA2/WPA3-Enterprise com 802.1X em ambientes corporativos sempre que possível.",
      "Registrar eventos de associação, autenticação, falha, roaming e mudanças de configuração.",
      "Manter firmware de APs e controladoras atualizado conforme processo de mudança.",
      "Aplicar menor privilégio: conexão ao Wi-Fi não deve significar acesso amplo a sistemas internos.",
      "Documentar SSIDs, finalidade, VLAN, regra de firewall, dono, criticidade e método de autenticação."
    ],
    "badPractices": [
      "Usar a mesma senha compartilhada por anos para todos os usuários.",
      "Colocar visitantes, IoT e funcionários na mesma sub-rede.",
      "Criar muitos SSIDs sem necessidade, degradando operação e dificultando governança.",
      "Permitir que qualquer pessoa instale roteadores ou APs próprios em portas internas.",
      "Não coletar logs de autenticação e associação wireless."
    ],
    "commonErrors": [
      "Confundir conectividade com autorização.",
      "Achar que esconder SSID é controle de segurança suficiente.",
      "Achar que NAT ou rede guest sem firewall adequado protege a rede interna.",
      "Ignorar dispositivos IoT no desenho de segmentação."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana wireless",
        "description": "Todos os perfis de dispositivo entram na mesma rede IP e alcançam muitos ativos.",
        "defensiveExplanation": "Um dispositivo comprometido no Wi-Fi pode tentar descobrir e acessar outros serviços internos.",
        "mitigation": "Segmentação, firewall interno, NAC, inventário, logs e políticas por perfil."
      },
      {
        "name": "Credencial compartilhada sem revogação individual",
        "description": "Uma senha PSK conhecida por muitos usuários continua válida após troca de equipe ou vazamento.",
        "defensiveExplanation": "Não é possível saber com precisão qual usuário usou a senha e a revogação exige troca global.",
        "mitigation": "Preferir 802.1X; quando PSK for usado, limitar escopo, rotacionar e monitorar."
      },
      {
        "name": "AP não autorizado",
        "description": "Equipamento instalado fora do processo oficial cria uma rede paralela.",
        "defensiveExplanation": "Pode contornar políticas corporativas e expor a rede cabeada por uma borda sem controle.",
        "mitigation": "Controle de portas, inventário, detecção de rogue AP e processo formal de exceções."
      }
    ],
    "monitoring": [
      "Falhas repetidas de autenticação por usuário, dispositivo ou AP.",
      "Novos BSSIDs com nomes parecidos com SSIDs corporativos.",
      "Clientes associados fora de horário ou em áreas incomuns.",
      "Mudanças não autorizadas em SSID, VLAN, criptografia ou política.",
      "Aumento de tráfego lateral originado da rede wireless."
    ],
    "hardening": [
      "Desabilitar protocolos e modos legados quando compatibilidade permitir.",
      "Usar criptografia moderna e autenticação corporativa.",
      "Isolar clientes em redes guest quando o caso exigir.",
      "Restringir gerenciamento de APs a redes administrativas.",
      "Enviar logs para plataforma centralizada de monitoramento."
    ],
    "detectionIdeas": [
      "Comparar inventário de APs autorizados com BSSIDs observados no ambiente.",
      "Correlacionar falhas RADIUS com localização, AP e identidade.",
      "Alertar quando dispositivos guest tentarem acessar endereços privados internos.",
      "Monitorar anomalias de volume e destinos incomuns vindos da rede wireless."
    ]
  },
  "lab": {
    "id": "lab-12.1",
    "title": "Mapear o próprio Wi-Fi sem confundir acesso wireless com internet",
    "labType": "security",
    "objective": "Coletar evidências básicas de uma conexão Wi-Fi e separar rádio, associação, IP, DNS, gateway e acesso a serviço.",
    "scenario": "Você recebeu a reclamação: o Wi-Fi está ruim. Antes de concluir qualquer coisa, fará um inventário defensivo da própria conexão autorizada e documentará hipóteses por camada.",
    "topology": "Cliente wireless autorizado -> AP/roteador -> switch/rede local -> gateway/firewall -> DNS -> internet ou serviço de teste",
    "architecture": "Laboratório local em rede própria. O cliente usa Wi-Fi para chegar ao AP. O AP encaminha para a rede local. O gateway provê saída e o DNS resolve nomes. Nenhuma rede de terceiros deve ser analisada além da observação passiva de nomes visíveis listados pelo sistema operacional.",
    "prerequisites": [
      "Usar somente uma rede própria ou explicitamente autorizada.",
      "Ter um notebook Windows ou Linux conectado via Wi-Fi.",
      "Ter permissão para consultar configurações locais do próprio dispositivo.",
      "Não executar captura ofensiva, desautenticação, quebra de senha ou varredura contra terceiros."
    ],
    "tools": [
      "Windows PowerShell ou Prompt de Comando",
      "Terminal Linux com NetworkManager, se disponível",
      "Opcional: Wireshark apenas para observar tráfego próprio e autorizado",
      "Editor de texto para registrar evidências"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não tente descobrir senhas de redes vizinhas.",
      "Não capture tráfego de terceiros.",
      "Não faça deauth, spoofing, evil twin ou qualquer teste ofensivo.",
      "Colete apenas informações do seu próprio dispositivo e da rede em que você tem autorização.",
      "Remova ou oculte MACs, IPs públicos e nomes sensíveis antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar o sintoma em linguagem técnica",
        "instruction": "Escreva qual problema você quer investigar sem usar apenas a frase Wi-Fi ruim. Separe percepção de hipótese.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma descrição objetiva do sintoma, horário, dispositivo, local físico e impacto.",
        "explanation": "Troubleshooting profissional começa com escopo. Sintoma vago leva a teste aleatório."
      },
      {
        "number": 2,
        "title": "Coletar estado wireless no Windows",
        "instruction": "Se estiver no Windows, veja a interface wireless atual, SSID, BSSID, canal, tipo de rádio, autenticação e sinal.",
        "command": "netsh wlan show interfaces",
        "expectedOutput": "Informações como SSID, BSSID, Signal, Radio type, Channel, Authentication e Cipher.",
        "explanation": "Esse comando ajuda a separar o nível wireless do nível IP. Estar associado ao SSID é diferente de ter IP e internet."
      },
      {
        "number": 3,
        "title": "Coletar estado wireless no Linux",
        "instruction": "Se estiver no Linux, liste redes visíveis e estado da interface. Use apenas para observação defensiva.",
        "command": "nmcli dev wifi list\niw dev\nip addr\nip route",
        "expectedOutput": "Lista de SSIDs visíveis, interface wireless, IP local e rota default.",
        "explanation": "O Linux permite observar rede, interface, endereço e rota. A rota default mostra para onde o tráfego fora da rede local será enviado."
      },
      {
        "number": 4,
        "title": "Verificar IP, gateway e DNS",
        "instruction": "Confirme se o cliente recebeu endereço IP, gateway e DNS coerentes.",
        "command": "ipconfig /all  # Windows\nip addr && ip route && resolvectl status  # Linux com systemd-resolved",
        "expectedOutput": "IP na rede esperada, gateway presente e DNS configurado.",
        "explanation": "Um cliente pode estar conectado ao Wi-Fi e mesmo assim não ter IP útil. Sem gateway, ele não sai da rede local; sem DNS, nomes podem falhar."
      },
      {
        "number": 5,
        "title": "Testar conectividade por camadas",
        "instruction": "Teste primeiro o gateway, depois um IP externo e depois um nome. Adapte os alvos ao seu ambiente.",
        "command": "ping <ip-do-gateway>\nping 8.8.8.8\nnslookup exemplo.com\nTest-NetConnection exemplo.com -Port 443  # Windows PowerShell",
        "expectedOutput": "Gateway responde, IP externo responde, nome resolve e porta 443 conecta, se não houver bloqueios.",
        "explanation": "Essa ordem ajuda a separar Wi-Fi/local, roteamento, DNS e aplicação."
      },
      {
        "number": 6,
        "title": "Montar uma tabela de hipóteses",
        "instruction": "Crie uma tabela com evidência, camada provável e próximo teste. Não conclua sem evidência.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela preenchida com pelo menos três hipóteses descartadas ou confirmadas.",
        "explanation": "O objetivo é transformar reclamação vaga em investigação rastreável."
      },
      {
        "number": 7,
        "title": "Registrar evidências finais",
        "instruction": "Colete prints ou saídas sanitizadas dos comandos e escreva uma conclusão curta.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório curto contendo SSID, BSSID parcialmente mascarado, canal, sinal, IP, gateway, DNS, testes e conclusão.",
        "explanation": "Evidências permitem revisão por outro analista e reduzem achismo."
      }
    ],
    "expectedResult": "Ao final, o aluno deve conseguir dizer se o problema observado parece estar em rádio/associação, configuração IP, DNS, rota/firewall ou aplicação, usando evidências coletadas do próprio dispositivo.",
    "validation": [
      {
        "check": "Cliente está associado a um SSID",
        "command": "netsh wlan show interfaces  # Windows\nnmcli dev wifi list  # Linux",
        "expected": "SSID atual ou rede conectada aparece na saída.",
        "ifFails": "Verifique se o Wi-Fi está ligado, se o dispositivo está em modo avião, se há driver instalado e se você está dentro da cobertura."
      },
      {
        "check": "Cliente recebeu IP válido",
        "command": "ipconfig /all  # Windows\nip addr  # Linux",
        "expected": "Endereço IP esperado para a rede, não um endereço de autoconfiguração sem utilidade no seu cenário.",
        "ifFails": "Investigue DHCP, VLAN, senha/autenticação parcial ou política do AP."
      },
      {
        "check": "Cliente possui rota default",
        "command": "route print  # Windows\nip route  # Linux",
        "expected": "Rota default apontando para o gateway da rede.",
        "ifFails": "Sem rota default, o cliente pode estar limitado à rede local. Verifique DHCP e configuração manual."
      },
      {
        "check": "DNS resolve nomes",
        "command": "nslookup exemplo.com",
        "expected": "Resposta com endereço IP do nome consultado.",
        "ifFails": "Testar conectividade por IP e validar DNS configurado."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Conecta ao SSID, mas não recebe IP.",
        "probableCause": "Falha de DHCP, VLAN errada, escopo esgotado, relay ausente ou autenticação incompleta.",
        "howToConfirm": "Verificar ipconfig /all ou ip addr e logs do AP/controladora quando disponíveis.",
        "fix": "Validar VLAN do SSID, escopo DHCP, trunk do switch, relay e política de autenticação."
      },
      {
        "symptom": "Recebe IP, mas nomes não resolvem.",
        "probableCause": "DNS incorreto, DNS inacessível ou política bloqueando consultas.",
        "howToConfirm": "Testar ping para IP externo e nslookup para nome.",
        "fix": "Corrigir DNS entregue por DHCP, rota até DNS ou regras de firewall."
      },
      {
        "symptom": "Sinal aparece forte, mas a navegação é lenta.",
        "probableCause": "Canal congestionado, ruído, interferência, muitos clientes ou gargalo fora do rádio.",
        "howToConfirm": "Comparar horário, local, número de clientes, canal, banda e teste por cabo quando possível.",
        "fix": "Planejar canais, potência, posicionamento de APs, bandas e capacidade."
      },
      {
        "symptom": "Funciona perto do AP e falha em outra sala.",
        "probableCause": "Cobertura ruim, atenuação por paredes, roaming inadequado ou banda incompatível.",
        "howToConfirm": "Medir sinal em locais diferentes e observar BSSID/canal.",
        "fix": "Reposicionar APs, ajustar potência/canais ou adicionar AP com planejamento."
      }
    ],
    "improvements": [
      "Adicionar coleta de logs do roteador/AP, se disponível.",
      "Comparar teste via cabo e via Wi-Fi para separar wireless de internet/provedor.",
      "Criar mapa simples dos locais com melhor e pior sinal.",
      "Registrar horário de pico e número aproximado de dispositivos conectados.",
      "Em ambiente corporativo, correlacionar falhas com RADIUS, DHCP, firewall e controladora."
    ],
    "evidenceToCollect": [
      "Descrição do sintoma e horário.",
      "SSID e BSSID mascarado.",
      "Banda/canal e sinal quando disponível.",
      "IP, máscara, gateway e DNS.",
      "Resultado de teste para gateway.",
      "Resultado de teste para IP externo.",
      "Resultado de resolução DNS.",
      "Conclusão com hipótese mais provável e próximos testes."
    ],
    "questions": [
      "O cliente estava realmente sem Wi-Fi ou apenas sem acesso à internet?",
      "O problema afetou rádio, IP, DNS, firewall ou aplicação?",
      "Que evidência sustenta sua conclusão?",
      "Qual teste você faria se outros clientes no mesmo SSID estivessem funcionando?",
      "Como esse laboratório mudaria em um ambiente com 802.1X e controladora?"
    ],
    "challenge": "Repita o diagnóstico em dois locais físicos diferentes da mesma rede autorizada e compare as evidências. Explique se a diferença parece ser RF, IP, DNS, rota ou serviço.",
    "solution": "A solução esperada é um relatório comparativo. Se o SSID, IP, gateway e DNS são iguais nos dois locais, mas sinal/canal/BSSID mudam e a experiência piora em um ponto específico, RF ou roaming se tornam hipóteses fortes. Se o rádio está bom, mas DNS falha nos dois locais, a causa provavelmente não é cobertura. Se apenas um dispositivo falha, investigar driver, perfil salvo, credencial, configuração IP local e políticas aplicadas ao dispositivo."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que Wi-Fi não deve ser tratado como sinônimo de internet?",
      "hints": [
        "Pense na diferença entre acesso local e rede global.",
        "Pense no que ainda precisa funcionar depois que o cliente associa ao AP."
      ],
      "expectedIdeas": [
        "Wi-Fi é acesso à rede local",
        "internet depende de gateway, rotas e provedor",
        "DNS e firewall podem falhar independentemente do rádio",
        "o ícone de Wi-Fi não prova acesso a serviços"
      ],
      "explanation": "A resposta deve separar camada de acesso, configuração IP, serviços de rede e destino final."
    },
    {
      "type": "diagnóstico",
      "question": "Um notebook conecta ao SSID corporativo, recebe IP, pinga o gateway, mas não abre sistemas internos por nome. Qual hipótese você testaria antes de culpar o AP?",
      "hints": [
        "Ele já está associado e chega ao gateway.",
        "O problema aparece por nome."
      ],
      "expectedIdeas": [
        "DNS",
        "sufixo DNS",
        "DNS privado",
        "firewall para servidores DNS",
        "proxy ou rota para sistemas internos"
      ],
      "explanation": "Se o cliente chega ao gateway, rádio e associação não são as primeiras hipóteses. DNS e caminho até o serviço interno devem ser verificados."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer criar Wi-Fi para funcionários, visitantes e sensores IoT. Por que um único SSID com uma única senha é uma má ideia?",
      "hints": [
        "Pense em revogação de acesso.",
        "Pense em movimento lateral.",
        "Pense em auditoria."
      ],
      "expectedIdeas": [
        "perfis diferentes exigem políticas diferentes",
        "visitantes não devem acessar sistemas internos",
        "IoT deve ser isolado",
        "PSK compartilhado dificulta rastreabilidade",
        "firewall e VLAN ajudam a reduzir impacto"
      ],
      "explanation": "O desenho deve separar identidades, dispositivos e finalidades. Conectividade sem controle cria risco operacional e de segurança."
    }
  ],
  "quiz": [
    {
      "id": "q12.1.1",
      "type": "conceito",
      "q": "Qual afirmação descreve melhor a diferença entre Wi-Fi e internet?",
      "opts": [
        "Wi-Fi é uma tecnologia de acesso local sem fio; internet é a rede global e depende de outros componentes para ser alcançada.",
        "Wi-Fi e internet são exatamente a mesma coisa, apenas nomes diferentes.",
        "Wi-Fi sempre usa cabo e internet sempre usa rádio.",
        "Internet só existe quando o usuário está conectado a um SSID."
      ],
      "a": 0,
      "exp": "Wi-Fi conecta o cliente à rede local por rádio. A internet depende de IP, gateway, DNS, rotas, firewall, provedor e serviços externos.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q12.1.2",
      "type": "diagnóstico",
      "q": "Um cliente está conectado ao SSID, mas recebeu endereço IP inválido ou nenhum IP. Qual hipótese ganha força?",
      "opts": [
        "Falha de DHCP, VLAN incorreta ou autenticação incompleta.",
        "O site de destino está necessariamente fora do ar.",
        "O cabo submarino internacional está rompido.",
        "O problema só pode ser senha errada, sem outras possibilidades."
      ],
      "a": 0,
      "exp": "Associação ao Wi-Fi não garante configuração IP. DHCP, VLAN, relay e política precisam ser verificados.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q12.1.3",
      "type": "segurança",
      "q": "Por que uma rede guest deve ser segmentada da rede interna?",
      "opts": [
        "Porque visitantes não devem ter caminho livre para ativos corporativos internos.",
        "Porque segmentação serve apenas para deixar o nome do Wi-Fi mais bonito.",
        "Porque DNS não funciona em redes guest.",
        "Porque toda rede guest precisa acessar servidores de produção."
      ],
      "a": 0,
      "exp": "Rede guest deve oferecer acesso controlado, normalmente internet, sem expor sistemas internos. Segmentação reduz movimento lateral e risco de abuso.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q12.1.4",
      "type": "arquitetura",
      "q": "Em uma arquitetura corporativa, qual componente normalmente faz a ponte entre clientes sem fio e a rede cabeada?",
      "opts": [
        "Access Point",
        "Servidor DNS público",
        "Navegador web",
        "Arquivo hosts"
      ],
      "a": 0,
      "exp": "O AP conversa por rádio com os clientes e encaminha tráfego para a infraestrutura cabeada, respeitando o desenho configurado.",
      "difficulty": "iniciante",
      "topic": "arquitetura"
    },
    {
      "id": "q12.1.5",
      "type": "pegadinha comum",
      "q": "Qual alternativa representa um erro comum em troubleshooting Wi-Fi?",
      "opts": [
        "Culpar o sinal sem verificar IP, DNS, gateway, autenticação e firewall.",
        "Separar o problema por camadas.",
        "Coletar evidências antes de concluir.",
        "Testar gateway antes de testar uma aplicação externa."
      ],
      "a": 0,
      "exp": "Muitos problemas percebidos como Wi-Fi ruim estão fora do rádio. Diagnóstico profissional separa camadas e coleta evidências.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q12.1.6",
      "type": "devsecops",
      "q": "Por que estar conectado ao Wi-Fi corporativo não deve significar acesso automático a pipelines, clusters e sistemas internos?",
      "opts": [
        "Porque conectividade não é autorização; acesso deve depender de identidade, política, postura e logs.",
        "Porque Wi-Fi não transporta pacotes IP.",
        "Porque sistemas DevSecOps só funcionam em redes cabeadas.",
        "Porque autenticação forte só existe na internet pública."
      ],
      "a": 0,
      "exp": "A rede transporta tráfego, mas autorização deve ser aplicada por identidade, políticas, controles de aplicação, firewall e observabilidade.",
      "difficulty": "intermediário",
      "topic": "DevSecOps"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.1.1",
      "front": "Wi-Fi é a mesma coisa que internet?",
      "back": "Não. Wi-Fi é acesso local sem fio. Internet depende de gateway, rotas, DNS, provedor e serviços externos.",
      "tags": [
        "wi-fi",
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.1.2",
      "front": "O que é um AP?",
      "back": "Access Point é o dispositivo que permite que clientes wireless acessem a rede, fazendo a ponte entre rádio e infraestrutura cabeada.",
      "tags": [
        "ap",
        "wireless"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.1.3",
      "front": "O que é SSID?",
      "back": "É o nome lógico da rede Wi-Fi que o usuário normalmente vê, como Corporativo ou Visitantes.",
      "tags": [
        "ssid",
        "wi-fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.1.4",
      "front": "O que é BSSID?",
      "back": "É o identificador de uma célula wireless específica, normalmente associado ao rádio de um AP que anuncia um SSID.",
      "tags": [
        "bssid",
        "camada 2"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.1.5",
      "front": "Por que rede guest precisa de segmentação?",
      "back": "Para permitir acesso limitado, geralmente à internet, sem expor servidores e ativos internos a visitantes ou dispositivos não gerenciados.",
      "tags": [
        "guest",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.1.6",
      "front": "Qual é o erro de tratar o Wi-Fi como perímetro confiável?",
      "back": "Dispositivos conectados podem receber acesso amplo demais. O correto é aplicar menor privilégio, segmentação, identidade e monitoramento.",
      "tags": [
        "zero trust",
        "segurança wireless"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.1.1",
      "type": "conceitual",
      "prompt": "Explique, com suas palavras, por que um usuário pode estar conectado ao Wi-Fi e mesmo assim não ter internet.",
      "expectedAnswer": "Porque conexão ao Wi-Fi indica associação à rede local sem fio, mas o acesso à internet ainda depende de IP válido, gateway, DNS, rotas, firewall, NAT/provedor e serviço externo funcionando.",
      "explanation": "O exercício força a separação entre camada de acesso e conectividade fim a fim."
    },
    {
      "id": "ex12.1.2",
      "type": "diagnóstico",
      "prompt": "Um cliente conecta ao SSID, recebe IP 169.254.x.x no Windows e não navega. Liste três hipóteses prováveis.",
      "expectedAnswer": "Falha de DHCP, VLAN incorreta, escopo DHCP indisponível/esgotado, relay DHCP ausente ou autenticação/política incompleta.",
      "explanation": "Endereços de autoconfiguração indicam que o cliente não recebeu IP utilizável do DHCP no cenário típico."
    },
    {
      "id": "ex12.1.3",
      "type": "arquitetura",
      "prompt": "Desenhe logicamente três redes wireless para uma pequena empresa: funcionários, visitantes e IoT. Indique qual deve acessar o quê.",
      "expectedAnswer": "Funcionários acessam internet e sistemas internos conforme perfil; visitantes acessam apenas internet; IoT acessa apenas serviços necessários, como broker, servidor de impressão ou plataforma de gestão, sem acesso amplo à rede interna.",
      "explanation": "O objetivo é pensar em perfil, segmentação e menor privilégio, não apenas em nomes de SSID."
    },
    {
      "id": "ex12.1.4",
      "type": "comando-output",
      "prompt": "Você executa netsh wlan show interfaces e vê SSID correto, mas sinal baixo. O que isso indica e o que ainda precisa ser verificado?",
      "expectedAnswer": "Indica que o cliente está associado, mas pode haver problema de RF/cobertura. Ainda é necessário verificar IP, gateway, DNS, testes de conectividade, canal, BSSID e se outros clientes no mesmo local sofrem o mesmo problema.",
      "explanation": "Sinal baixo é evidência importante, mas não encerra o diagnóstico sozinho."
    }
  ],
  "challenge": {
    "title": "Desenhar a primeira versão de um Wi-Fi seguro para uma pequena empresa",
    "scenario": "Uma empresa com 35 funcionários, 10 visitantes por dia, 12 câmeras IP, 6 impressoras e uma sala de reunião quer substituir o roteador doméstico por uma solução minimamente profissional. Hoje todos usam a mesma senha em uma rede única.",
    "tasks": [
      "Definir no máximo três SSIDs e justificar cada um.",
      "Mapear cada SSID para uma finalidade e uma política de acesso.",
      "Indicar quais redes precisam ou não acessar sistemas internos.",
      "Propor evidências mínimas de monitoramento e troubleshooting.",
      "Indicar riscos de manter senha única compartilhada."
    ],
    "constraints": [
      "Não criar mais de três SSIDs.",
      "Visitantes não podem acessar servidores internos.",
      "Câmeras e impressoras não devem ter acesso amplo à rede dos usuários.",
      "A solução deve ser compreensível por uma equipe pequena de TI.",
      "Não usar testes ofensivos."
    ],
    "expectedDeliverables": [
      "Tabela SSID -> público -> VLAN/política -> acesso permitido.",
      "Diagrama lógico simples.",
      "Checklist de validação pós-implantação.",
      "Lista de logs/evidências a coletar.",
      "Resumo dos riscos mitigados."
    ],
    "gradingRubric": [
      {
        "criterion": "Segmentação",
        "points": 30,
        "description": "Separou funcionários, visitantes e IoT com políticas coerentes."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Reduziu acesso lateral, evitou confiança implícita e tratou credenciais compartilhadas."
      },
      {
        "criterion": "Operação",
        "points": 20,
        "description": "Previu logs, troubleshooting e documentação."
      },
      {
        "criterion": "Simplicidade",
        "points": 15,
        "description": "Evitou excesso de SSIDs e complexidade desnecessária."
      },
      {
        "criterion": "Validação",
        "points": 10,
        "description": "Incluiu testes de associação, IP, DNS, gateway, firewall e acesso permitido."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A primeira decisão é separar perfis de risco e finalidade. Funcionários, visitantes e dispositivos IoT não têm o mesmo nível de confiança nem precisam acessar os mesmos destinos. Depois, evitar excesso de SSIDs, porque cada SSID adicional aumenta complexidade e pode consumir recursos do meio. Em seguida, definir políticas de acesso e evidências de operação.",
    "steps": [
      "Criar SSID Corporativo para funcionários, preferencialmente com 802.1X quando a organização tiver maturidade para isso.",
      "Criar SSID Visitantes com isolamento, saída para internet e bloqueio explícito para redes internas.",
      "Criar SSID IoT ou usar rede cabeada/VLAN específica para câmeras e impressoras, com acesso apenas aos serviços necessários.",
      "Mapear cada SSID para VLAN ou política equivalente.",
      "Aplicar regras de firewall entre segmentos.",
      "Validar DHCP, DNS, gateway e acesso permitido por perfil.",
      "Enviar logs de autenticação, associação e bloqueios para monitoramento."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Manter um único SSID com senha forte para todos.",
        "whyItIsWrong": "Senha forte ajuda contra acesso externo, mas não resolve revogação individual, segmentação, visitantes, IoT e movimento lateral."
      },
      {
        "answer": "Criar dez SSIDs, um para cada tipo de dispositivo.",
        "whyItIsWrong": "Pode aumentar complexidade, overhead e dificuldade operacional. O ideal é usar poucos SSIDs com políticas bem desenhadas."
      },
      {
        "answer": "Colocar visitantes em uma sub-rede diferente, mas liberar acesso any-any para a rede interna.",
        "whyItIsWrong": "Sub-rede diferente sem política de firewall não garante isolamento real."
      }
    ],
    "finalAnswer": "Uma solução inicial adequada teria, por exemplo: SSID Corporativo para usuários gerenciados com acesso a sistemas conforme perfil; SSID Visitantes isolado com internet apenas; SSID IoT com acesso estritamente necessário a serviços específicos. O firewall deve negar tráfego lateral por padrão e liberar exceções documentadas. A validação deve testar associação, IP, DNS, gateway, acesso permitido e bloqueios esperados."
  },
  "glossary": [
    {
      "term": "Wi-Fi",
      "shortDefinition": "Tecnologia de rede local sem fio baseada na família IEEE 802.11.",
      "longDefinition": "Wi-Fi permite que dispositivos acessem uma rede local usando rádio, normalmente por meio de um ponto de acesso que conecta a rede sem fio à infraestrutura cabeada.",
      "example": "Um notebook conectado ao SSID Corporativo usa Wi-Fi para chegar ao AP e, a partir dali, à rede da empresa.",
      "relatedTerms": [
        "WLAN",
        "SSID",
        "BSSID",
        "AP",
        "IEEE 802.11"
      ],
      "relatedLessons": [
        "12.1",
        "12.2",
        "12.3"
      ]
    },
    {
      "term": "WLAN",
      "shortDefinition": "Wireless Local Area Network, uma rede local sem fio.",
      "longDefinition": "WLAN é uma rede local que usa comunicação sem fio, normalmente baseada em Wi-Fi, para conectar clientes a uma infraestrutura de rede.",
      "example": "A rede sem fio de um escritório que permite notebooks acessarem sistemas internos é uma WLAN.",
      "relatedTerms": [
        "LAN",
        "Wi-Fi",
        "AP"
      ],
      "relatedLessons": [
        "1.x",
        "12.1"
      ]
    },
    {
      "term": "Access Point",
      "shortDefinition": "Dispositivo que conecta clientes wireless à rede.",
      "longDefinition": "Um AP oferece rádio para clientes Wi-Fi e encaminha tráfego para a infraestrutura, geralmente por Ethernet, VLANs e switches.",
      "example": "Um AP no teto atende clientes de uma sala e envia o tráfego para um switch PoE.",
      "relatedTerms": [
        "SSID",
        "BSSID",
        "VLAN",
        "PoE"
      ],
      "relatedLessons": [
        "12.1",
        "12.7"
      ]
    },
    {
      "term": "SSID",
      "shortDefinition": "Nome lógico de uma rede Wi-Fi.",
      "longDefinition": "SSID é o identificador de rede que usuários normalmente visualizam ao escolher uma rede wireless. Um SSID pode ser anunciado por vários APs.",
      "example": "Corporativo, Visitantes e IoT são exemplos de SSIDs.",
      "relatedTerms": [
        "BSSID",
        "AP",
        "VLAN"
      ],
      "relatedLessons": [
        "12.1",
        "12.4"
      ]
    },
    {
      "term": "BSSID",
      "shortDefinition": "Identificador de uma célula wireless específica, normalmente ligado ao rádio de um AP.",
      "longDefinition": "Enquanto SSID é o nome da rede, BSSID identifica o ponto de acesso ou rádio específico com o qual o cliente está associado.",
      "example": "Dois APs podem anunciar o SSID Corporativo, mas cada rádio terá BSSID próprio.",
      "relatedTerms": [
        "SSID",
        "MAC",
        "roaming"
      ],
      "relatedLessons": [
        "3.x",
        "12.4",
        "12.6"
      ]
    },
    {
      "term": "Rede guest",
      "shortDefinition": "Rede para visitantes com acesso limitado e isolado.",
      "longDefinition": "Rede guest é desenhada para oferecer conectividade controlada, normalmente internet, sem permitir acesso direto a sistemas internos.",
      "example": "Visitantes recebem acesso ao SSID Visitantes e são bloqueados pelo firewall ao tentar acessar servidores internos.",
      "relatedTerms": [
        "segmentação",
        "VLAN",
        "firewall",
        "isolamento"
      ],
      "relatedLessons": [
        "9.x",
        "12.7",
        "13.2"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE Std 802.11be-2024",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/ieee/802.11be/7516/",
      "note": "Usado para validar a evolução moderna do padrão 802.11 e o papel de PHY/MAC no Wi-Fi 7."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Working Group recent standards approvals",
      "organization": "IEEE 802.11 Working Group",
      "url": "https://www.ieee802.org/11/",
      "note": "Usado para validar publicações recentes da família 802.11."
    },
    {
      "type": "official-doc",
      "title": "SP 800-97: Establishing Wireless Robust Security Networks: A Guide to IEEE 802.11i",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/97/final",
      "note": "Usado para validar a evolução de segurança wireless, WEP e redes robustas."
    },
    {
      "type": "official-doc",
      "title": "Wi-Fi CERTIFIED 7 Technology Overview",
      "organization": "Wi-Fi Alliance",
      "url": "https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-7",
      "note": "Usado para validar objetivos modernos de Wi-Fi 7, como alta vazão, baixa latência e melhor experiência."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v1.1 - Módulos 1 a 4",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/v1.1",
      "note": "Pré-requisito conceitual para fundamentos, OSI, Ethernet, MAC, IPv4, DHCP e DNS."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Wi-Fi também usa endereçamento MAC e precisa ser entendido como tecnologia de camada de enlace integrada à rede Ethernet."
    },
    {
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "Depois de associar ao Wi-Fi, o cliente depende de DHCP e DNS para usar a rede de forma prática."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "A separação entre redes corporativa, guest e IoT depende de firewall, ACLs e políticas de tráfego."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "conceitos-base",
      "reason": "Aulas futuras de WPA Enterprise e 802.1X dependem de autenticação, identidade e autorização."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs-e-telemetria",
      "reason": "Operação wireless corporativa depende de logs, métricas, eventos e correlação para troubleshooting e segurança."
    }
  ],
  "pedagogicalMap": {
    "problem": "Conectar dispositivos móveis sem cabo cria mobilidade, mas introduz meio compartilhado, interferência, autenticação e segmentação.",
    "concept": "Wi-Fi é WLAN baseada em IEEE 802.11, usada como borda de acesso local por rádio.",
    "internalMechanism": "Cliente descobre redes, escolhe BSSID, associa, autentica, recebe IP e passa por políticas antes de acessar serviços.",
    "realUse": "Empresas usam Wi-Fi para funcionários, visitantes, IoT e mobilidade, integrado a VLAN, firewall, identidade e logs.",
    "commonMistake": "Confundir Wi-Fi com internet e diagnosticar tudo como sinal fraco.",
    "securityImpact": "O sinal sem fio amplia superfície de acesso e exige autenticação forte, segmentação e monitoramento.",
    "operationalImpact": "Troubleshooting precisa separar RF, associação, IP, DNS, firewall e aplicação.",
    "summary": "Wi-Fi resolve mobilidade, mas deve ser tratado como arquitetura de acesso, não como mágica de internet."
  },
  "progressRules": {
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "oneOf": [
          "labMarkedDone",
          "practicalExerciseDone"
        ]
      },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "12.2"
    ]
  }
};
