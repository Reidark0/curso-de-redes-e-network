export const lesson1207 = {
  "id": "12.7",
  "moduleId": "m12",
  "order": 7,
  "title": "Arquitetura Wi-Fi corporativa: APs, controladoras e VLANs",
  "subtitle": "Como transformar rádio em serviço corporativo seguro: APs, controladoras, SSIDs, VLANs, RADIUS, firewall, rede guest, IoT, observabilidade e operação.",
  "duration": "110-160 min",
  "estimatedStudyTimeMinutes": 160,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 240,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "arquitetura",
    "access point",
    "controladora",
    "vlan",
    "ssid",
    "radius",
    "nac",
    "guest",
    "iot",
    "firewall",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Arquitetura Wi-Fi corporativa termina no mundo Ethernet: switches, trunks, VLANs, MAC e ARP continuam necessários."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "Clientes wireless dependem de DHCP, DNS, NAT e serviços essenciais depois de associados."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "SSIDs e VLANs só viram segurança real quando há firewall, ACL, logs e política de tráfego."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.4",
      "reason": "É necessário entender SSID, BSSID, associação e autenticação antes de desenhar múltiplos SSIDs e APs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "Wi-Fi corporativo seguro depende de WPA Enterprise, 802.1X, RADIUS, certificados, IAM e NAC."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.6",
      "reason": "Roaming entre múltiplos APs exige desenho coerente de células, VLANs, autenticação, controladora e telemetria."
    }
  ],
  "objectives": [
    "Explicar por que uma rede Wi-Fi corporativa é uma arquitetura de acesso, política, segurança e operação, não apenas um conjunto de APs.",
    "Diferenciar AP autônomo, AP controlado, controladora física, controladora virtual e gerenciamento cloud.",
    "Relacionar SSIDs, BSSIDs, VLANs, trunks, DHCP, DNS, gateway, firewall, RADIUS/NAC e SIEM.",
    "Desenhar uma arquitetura com SSIDs separados para corporativo, visitante, IoT e operação, evitando rede plana.",
    "Explicar os riscos de SSIDs demais, VLANs mal mapeadas, redes guest com acesso lateral e APs sem gestão centralizada.",
    "Executar um laboratório conceitual-prático de desenho, validação e troubleshooting de SSID-to-VLAN mapping."
  ],
  "learningOutcomes": [
    "Dado um desenho de Wi-Fi corporativo, o aluno identifica plano de controle, plano de dados, autenticação, segmentação e pontos de falha.",
    "Dado um SSID, o aluno consegue indicar qual VLAN, gateway, DHCP, DNS, política de firewall e fonte de logs precisam existir.",
    "Dado um incidente em rede guest, o aluno consegue verificar se há isolamento real de visitantes em relação à rede interna.",
    "Dado um problema de cliente associado sem IP, o aluno separa hipóteses de RF, VLAN, trunk, DHCP e firewall.",
    "Dado um projeto de expansão, o aluno propõe arquitetura segura e observável com menor privilégio e custo operacional controlado."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n\n  <p>Imagine uma empresa que cresceu de vinte para quinhentos usuários. No início, havia um único roteador Wi-Fi com uma senha compartilhada. Funcionava porque todo mundo estava no mesmo espaço, quase todos os dispositivos eram notebooks e a exigência de segurança era baixa. Depois vieram visitantes, celulares pessoais, impressoras, câmeras, coletores, catracas, tablets, dispositivos de IoT, notebooks corporativos, autenticação por identidade, auditoria, LGPD, SOC, escritórios híbridos, filiais e aplicações críticas.</p>\n  <p>A primeira reação comum é comprar mais access points. Só que mais APs, sem arquitetura, podem piorar tudo: mais interferência, mais SSIDs emitindo beacons, VLANs inconsistentes, clientes presos em APs errados, rede guest com acesso lateral, IoT misturada com usuários, falta de logs e troubleshooting impossível. Uma WLAN corporativa precisa transformar rádio em serviço governado: quem pode entrar, em qual segmento, com qual política, por qual gateway, com qual DNS, com quais logs e com qual risco residual aceito.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> a empresa tem três SSIDs: Corporativo, Visitantes e IoT. O SSID Visitantes deveria sair apenas para a internet, mas consegue pingar impressoras internas. O SSID IoT usa PSK compartilhado há anos. Um AP novo foi instalado em uma filial e os clientes conectam, mas ficam sem IP. O time de rede culpa DHCP; segurança culpa VLAN; suporte culpa Wi-Fi. Sem arquitetura documentada, todos estão parcialmente certos e ninguém resolve rápido.</div>\n  <p>Esta aula existe para mostrar que Wi-Fi corporativo é uma borda de acesso da rede empresarial. Ele precisa ser desenhado com os mesmos princípios de uma rede cabeada: segmentação, menor privilégio, autenticação, logs, redundância, controle de mudança, capacidade, troubleshooting e custo operacional. O rádio aproxima o usuário da rede; a arquitetura decide o que esse usuário realmente pode acessar.</p>\n\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n\n  <p>As primeiras redes wireless corporativas muitas vezes eram extensões simples da LAN cabeada. Um AP autônomo era ligado a uma porta de switch, recebia um SSID e entregava tráfego para a rede interna. Cada AP era configurado individualmente. Em ambientes pequenos, isso era administrável. Em empresas maiores, tornou-se um problema: configurações divergentes, senhas inconsistentes, canais mal escolhidos, potência manual, roaming ruim e ausência de visão centralizada.</p>\n  <p>Com o crescimento das WLANs, surgiram arquiteturas baseadas em controladoras. O objetivo era centralizar políticas, provisionamento, RF, roaming, autenticação e monitoramento. O AP deixava de ser uma ilha autônoma e passava a ser parte de um sistema. Em muitas implementações, o AP cria túneis de controle e, dependendo do modo, também pode tunelar ou bridgar dados. Isso permitiu que a empresa aplicasse políticas consistentes por SSID, site, grupo, VLAN e perfil.</p>\n  <p>Depois vieram arquiteturas híbridas e cloud-managed. Em vez de manter sempre uma controladora física local, muitos fabricantes passaram a oferecer gerenciamento centralizado em nuvem, com APs reportando telemetria, recebendo configuração e permitindo operação multi-site. Isso simplificou filiais e reduziu necessidade de appliances em alguns cenários, mas também criou dependência de portal, licenciamento, conectividade de gestão e integração com identidade.</p>\n  <p>A evolução não eliminou os fundamentos. Mesmo com dashboard cloud, o tráfego do cliente precisa cair em uma VLAN, receber IP, resolver DNS, atravessar firewall, respeitar política e gerar evidência. A arquitetura moderna apenas tornou mais explícito que Wi-Fi é parte de uma plataforma de acesso, não um rádio isolado.</p>\n\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n\n  <p>O problema central é que uma WLAN corporativa precisa atender grupos diferentes com riscos diferentes usando o mesmo meio físico compartilhado: o ar. Funcionários, visitantes, terceiros, IoT, dispositivos pessoais, equipamentos industriais e administração da própria infraestrutura não deveriam ter o mesmo nível de acesso. Ao mesmo tempo, todos podem estar no mesmo prédio, usando APs próximos e muitas vezes vendo os mesmos SSIDs.</p>\n  <ul>\n    <li><strong>Sem segmentação:</strong> visitante pode alcançar ativo interno, IoT pode falar com estação de usuário e um incidente se espalha lateralmente.</li>\n    <li><strong>Sem autenticação adequada:</strong> senhas compartilhadas viram segredo público, ex-funcionários continuam com acesso e dispositivos não identificados entram na rede.</li>\n    <li><strong>Sem padronização:</strong> cada AP vira uma exceção, cada filial se comporta de um jeito e troubleshooting depende de memória tribal.</li>\n    <li><strong>Sem observabilidade:</strong> ninguém sabe qual usuário estava em qual AP, BSSID, VLAN, IP e horário durante falha ou incidente.</li>\n    <li><strong>Sem desenho RF:</strong> a rede parece cheia de APs, mas tem interferência, sobreposição ruim, canais saturados e roaming instável.</li>\n  </ul>\n  <p>A arquitetura Wi-Fi corporativa resolve justamente essa coordenação: rádio, identidade, segmentação, switching, roteamento, firewall, DHCP, DNS, gestão, logs e operação precisam funcionar como um sistema.</p>\n\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n\n  <p>A evolução das arquiteturas Wi-Fi pode ser vista como uma migração de configuração local para política centralizada e, depois, para automação e telemetria. Isso não significa que uma abordagem é sempre melhor do que outra. Um AP autônomo pode ser aceitável em um laboratório pequeno. Uma controladora física pode ser necessária em ambiente com requisitos rigorosos de operação local. Um modelo cloud-managed pode ser excelente para filiais distribuídas. A decisão depende de escala, risco, custo, equipe e integração.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>AP autônomo</td><td>Cada AP configurado individualmente</td><td>Baixa padronização, pouca visibilidade e manutenção difícil</td><td>Controladora WLAN centralizada</td></tr>\n      <tr><td>Controladora central</td><td>APs recebem configuração e política de um ponto central</td><td>Dependência de appliance, capacidade e desenho de resiliência</td><td>Controladoras virtuais, HA e gestão distribuída</td></tr>\n      <tr><td>Cloud-managed</td><td>Portal em nuvem gerencia múltiplos sites e APs</td><td>Licenciamento, dependência de conectividade de gestão e integração com identidade</td><td>Automação via API, templates e observabilidade integrada</td></tr>\n      <tr><td>Arquitetura integrada</td><td>Wi-Fi ligado a NAC, IAM, SIEM, firewall, MDM e IaC</td><td>Mais complexidade e necessidade de governança</td><td>Política como código, Zero Trust e operação orientada a evidência</td></tr>\n    </tbody>\n  </table>\n  <p>A maturidade aparece quando a empresa deixa de perguntar “quantos APs eu compro?” e passa a perguntar “quais grupos existem, que acesso cada um precisa, como autentico, como segmento, como monitoro, como valido e como mantenho?”.</p>\n\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n\n  <p>Arquitetura Wi-Fi corporativa é o desenho integrado que conecta access points, controladoras, SSIDs, BSSIDs, VLANs, autenticação, endereçamento, roteamento, firewall, serviços essenciais, logs e processos operacionais para entregar acesso sem fio seguro, escalável e diagnosticável.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> uma WLAN corporativa não é apenas um conjunto de APs. É uma plataforma de acesso que decide como clientes entram na rede, em qual segmento caem, quais políticas recebem, como são monitorados e como falhas são investigadas.</div>\n  <p>Alguns componentes aparecem quase sempre:</p>\n  <ul>\n    <li><strong>AP:</strong> equipamento que cria células Wi-Fi, anuncia SSIDs e conecta clientes ao domínio de rede.</li>\n    <li><strong>Controladora ou gestão cloud:</strong> camada que distribui configuração, perfis, políticas, RF e telemetria.</li>\n    <li><strong>SSID:</strong> nome lógico da WLAN percebido pelo usuário ou dispositivo.</li>\n    <li><strong>BSSID:</strong> identidade de rádio/AP que realmente atende o cliente.</li>\n    <li><strong>VLAN:</strong> segmento lógico onde o tráfego do cliente será colocado.</li>\n    <li><strong>RADIUS/NAC/IAM:</strong> componentes que validam identidade, certificado, grupo, postura e política.</li>\n    <li><strong>Firewall:</strong> ponto de controle que aplica regras entre segmentos e para internet.</li>\n    <li><strong>Logs e SIEM:</strong> evidências para troubleshooting, auditoria e resposta a incidente.</li>\n  </ul>\n\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Por dentro, a arquitetura Wi-Fi corporativa é uma sequência de decisões. O usuário vê apenas um SSID, mas a infraestrutura precisa executar várias etapas em camadas diferentes.</p>\n  <ol class=\"flow-list\">\n    <li><strong>AP inicializa:</strong> recebe energia PoE, endereço IP de gerenciamento, alcança controladora ou portal cloud e baixa configuração.</li>\n    <li><strong>AP anuncia SSIDs:</strong> cada rádio emite beacons com SSIDs permitidos e parâmetros de segurança.</li>\n    <li><strong>Cliente escolhe BSSID:</strong> baseado em sinal, banda, suporte, histórico, política do driver e recursos como 802.11k/v.</li>\n    <li><strong>Cliente associa:</strong> passa pela associação 802.11 e negocia capacidades.</li>\n    <li><strong>Autenticação acontece:</strong> pode ser PSK, SAE, OWE, captive portal, MAC auth ou 802.1X/EAP com RADIUS.</li>\n    <li><strong>Política é escolhida:</strong> SSID, usuário, grupo, certificado, device type ou postura podem definir VLAN, ACL ou role.</li>\n    <li><strong>Tráfego entra na LAN:</strong> em bridge local, o AP marca VLAN no trunk; em túnel, o tráfego segue para controladora antes de sair.</li>\n    <li><strong>Cliente recebe IP:</strong> DHCP entrega endereço, gateway, DNS e parâmetros necessários.</li>\n    <li><strong>Firewall aplica política:</strong> corporativo acessa recursos internos, guest vai para internet, IoT fala apenas com serviços necessários.</li>\n    <li><strong>Logs são gerados:</strong> AP, controladora, RADIUS, DHCP, firewall, DNS e SIEM registram eventos correlacionáveis.</li>\n  </ol>\n  <p>Uma falha em qualquer etapa pode parecer “problema de Wi-Fi”. Cliente conectado sem IP pode ser VLAN errada no trunk. Autenticação falhando pode ser certificado expirado. Visitante sem internet pode ser DNS ou captive portal. IoT inacessível pode ser firewall correto bloqueando tráfego lateral indevido.</p>\n\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Uma arquitetura corporativa saudável separa pelo menos quatro planos mentais:</p>\n  <ul>\n    <li><strong>Plano de RF:</strong> canais, potência, banda, largura de canal, cobertura, capacidade e roaming.</li>\n    <li><strong>Plano de controle:</strong> controladora, cloud management, provisionamento, templates, perfis e telemetria.</li>\n    <li><strong>Plano de dados:</strong> caminho real do tráfego do cliente até VLAN, gateway, firewall e destino.</li>\n    <li><strong>Plano de segurança:</strong> identidade, autenticação, autorização, segmentação, logs, detecção e resposta.</li>\n  </ul>\n  <p>Em uma empresa comum, um desenho coerente poderia ser:</p>\n  <table class=\"data-table\">\n    <thead><tr><th>SSID</th><th>Autenticação</th><th>VLAN/segmento</th><th>Política de firewall</th><th>Observação</th></tr></thead>\n    <tbody>\n      <tr><td>Corp</td><td>WPA Enterprise / EAP-TLS</td><td>Usuários corporativos</td><td>Acesso a serviços internos conforme perfil</td><td>Integrado a IAM, PKI e RADIUS</td></tr>\n      <tr><td>Guest</td><td>Portal ou OWE/PSK temporário</td><td>Visitantes</td><td>Somente internet, sem lateralidade</td><td>Rate limit e expiração</td></tr>\n      <tr><td>IoT</td><td>PSK por grupo, DPSK ou MAB/NAC</td><td>Dispositivos restritos</td><td>Apenas destinos necessários</td><td>Monitoramento forte e inventário</td></tr>\n      <tr><td>Ops</td><td>Restrito a equipe técnica</td><td>Administração</td><td>Acesso controlado a gestão</td><td>MFA e logs obrigatórios</td></tr>\n    </tbody>\n  </table>\n  <p>O erro clássico é criar SSIDs pensando em nomes, não em políticas. O nome do SSID é apenas a superfície. O que importa é o que acontece depois: VLAN, IP, gateway, rota, DNS, firewall, logs e ciclo de vida.</p>\n\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em um prédio corporativo com várias portas de entrada. O AP é a porta física. O SSID é a placa escrita na porta: “Funcionários”, “Visitantes”, “Fornecedores”. A autenticação é a recepção verificando crachá, documento ou convite. A VLAN é o andar ou corredor onde a pessoa será liberada. O firewall é o controle de portas internas. O SIEM é o registro de entrada, horário, destino e exceções.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em um prédio físico, a pessoa ocupa um lugar bem definido. Em Wi-Fi, o meio é compartilhado, invisível, sujeito a interferência, e o cliente também decide a qual AP se associar. Além disso, uma autenticação válida não deveria significar acesso irrestrito a todos os corredores.</div>\n\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Em uma casa, um roteador Wi-Fi costuma fazer quase tudo: AP, switch, roteador, NAT, DHCP, DNS forwarder e firewall básico. O SSID da casa normalmente cai na mesma rede dos dispositivos internos. Isso é simples, mas já mostra a diferença entre conectar no Wi-Fi e acessar a internet: depois da associação, o dispositivo ainda precisa receber IP, gateway e DNS.</p>\n  <p>Em um pequeno laboratório doméstico, você pode criar um SSID principal e um SSID de convidados. Se a rede guest realmente isola clientes, o celular do visitante não deve alcançar o notebook pessoal ou a impressora. Se alcança, o SSID guest é apenas cosmético: parece separado, mas não está segmentado de verdade.</p>\n\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, a rede Wi-Fi precisa refletir a organização e seus riscos. Funcionários autenticados com certificado podem cair em VLANs dinâmicas conforme grupo. Visitantes devem sair para internet sem acessar RFC1918 interno. IoT deve falar apenas com brokers, servidores de impressão, controladoras ou APIs necessárias. Dispositivos de administração de rede não devem compartilhar segmento com usuários comuns.</p>\n  <p>Uma filial pode ter APs gerenciados em nuvem, switch PoE com trunks permitidos, DHCP local ou central, firewall local com VPN para matriz e RADIUS acessível por túnel. Se o túnel cair, a empresa precisa saber o comportamento esperado: o SSID corporativo continua autenticando? Guest continua local? IoT perde acesso? Logs são armazenados localmente? Essas decisões são arquitetura, não detalhe de configuração.</p>\n\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Wi-Fi corporativo se conecta à cloud de várias formas. O gerenciamento dos APs pode estar em uma plataforma SaaS. O RADIUS pode estar em nuvem ou integrado a um provedor de identidade. Logs podem ir para SIEM cloud. A rede guest pode usar DNS filtering, SWG ou firewall cloud. Aplicações internas podem estar em VPC/VNet, acessadas por VPN, SD-WAN, ZTNA ou private connectivity.</p>\n  <p>A equivalência com cloud networking é direta: SSID lembra uma porta lógica de entrada; VLAN lembra subnet/segmento; firewall local lembra security group, NACL ou cloud firewall; logs de controladora lembram flow logs; RADIUS/IAM lembra identity-aware access. A diferença é que no Wi-Fi ainda existe RF, cliente, roaming e meio compartilhado.</p>\n  <div class=\"callout callout--warning\"><strong>Custo cloud:</strong> gerenciamento cloud de WLAN normalmente envolve licença por AP, retenção de logs, integrações com SIEM e dependência operacional de internet para gestão. Mesmo quando o tráfego do cliente fica local, a operação pode depender de serviços externos.</div>\n\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, a arquitetura Wi-Fi corporativa entra como configuração versionável e validável. Templates de SSID, VLAN, firewall, RADIUS, certificados, tags de site e parâmetros de RF podem ser tratados como mudança controlada. Antes de publicar um novo SSID IoT, a equipe pode exigir revisão de segurança, regra de firewall mínima, inventário, log obrigatório, rollback e evidência de teste.</p>\n  <p>Em ambientes maduros, mudanças wireless seguem pipeline operacional: abrir mudança, aplicar em piloto, coletar métricas, validar autenticação, verificar DHCP, confirmar logs no SIEM, testar isolamento e só então expandir. A aula de Infraestrutura Moderna, Platform Engineering e DevSecOps sobre automação e IaC deve ser revisada quando essa rede for modelada em APIs de fabricante, GitOps ou pipelines de compliance.</p>\n\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>A segurança da arquitetura Wi-Fi depende de segmentação real. Um SSID com nome “Guest” não é seguro por nome. Ele precisa cair em segmento separado, não rotear para redes internas, ter DNS controlado, política de firewall, rate limit quando necessário, expiração de acesso e logs mínimos. Da mesma forma, um SSID IoT não deveria ser uma lixeira de exceções eternas.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Rede guest com acesso lateral</td><td>Visitante alcança impressora, servidor ou estações</td><td>Exposição interna e risco de pivot</td><td>VLAN separada, firewall deny-by-default e teste de isolamento</td></tr>\n      <tr><td>IoT misturado com usuários</td><td>Câmeras, TVs, sensores e notebooks na mesma rede</td><td>Movimento lateral e inventário fraco</td><td>SSID/VLAN IoT, política mínima e monitoramento</td></tr>\n      <tr><td>PSK compartilhado permanente</td><td>Senha conhecida por ex-funcionários e terceiros</td><td>Acesso não rastreável</td><td>WPA Enterprise, DPSK, rotação, NAC ou segmentação forte</td></tr>\n      <tr><td>AP sem gestão centralizada</td><td>Configuração divergente e logs ausentes</td><td>Troubleshooting e auditoria frágeis</td><td>Inventário, controladora/cloud, backup de configuração e alertas</td></tr>\n      <tr><td>Trunk permissivo</td><td>AP recebe VLANs que não deveria usar</td><td>Erro operacional vira exposição</td><td>Permitir apenas VLANs necessárias, documentação e validação</td></tr>\n    </tbody>\n  </table>\n  <div class=\"callout callout--security\"><strong>Foco defensivo:</strong> esta aula não ensina a invadir redes wireless. O objetivo é desenhar, validar e monitorar isolamento, autenticação e evidência para reduzir risco operacional e de segurança.</div>\n\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1180 620\" role=\"img\" aria-labelledby=\"wifi-arch-title wifi-arch-desc\">\n    <title id=\"wifi-arch-title\">Arquitetura Wi-Fi corporativa com APs, controladora, VLANs e firewall</title>\n    <desc id=\"wifi-arch-desc\">Três SSIDs são anunciados por APs corporativos. O tráfego é segmentado por VLAN para usuários, visitantes e IoT, passa por switch, firewall, serviços de identidade, DHCP, DNS e SIEM.</desc>\n    <defs><marker id=\"arrow-wifi-arch\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n\n    <rect x=\"30\" y=\"80\" width=\"260\" height=\"430\" rx=\"22\" class=\"svg-zone\" />\n    <text x=\"160\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Borda Wireless</text>\n    <rect x=\"80\" y=\"155\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"160\" y=\"184\" text-anchor=\"middle\" class=\"svg-label\">AP 1</text>\n    <text x=\"160\" y=\"208\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Corp / Guest / IoT</text>\n    <rect x=\"80\" y=\"295\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"160\" y=\"324\" text-anchor=\"middle\" class=\"svg-label\">AP 2</text>\n    <text x=\"160\" y=\"348\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSIDs por rádio</text>\n    <rect x=\"70\" y=\"430\" width=\"180\" height=\"54\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"160\" y=\"463\" text-anchor=\"middle\" class=\"svg-label\">Clientes Wi-Fi</text>\n\n    <rect x=\"360\" y=\"120\" width=\"190\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"455\" y=\"154\" text-anchor=\"middle\" class=\"svg-label\">Switch PoE</text>\n    <text x=\"455\" y=\"181\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">trunk VLANs permitidas</text>\n\n    <rect x=\"360\" y=\"275\" width=\"190\" height=\"88\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"455\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Controladora</text>\n    <text x=\"455\" y=\"336\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">perfil, RF, telemetria</text>\n\n    <rect x=\"620\" y=\"95\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"705\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">VLAN Corp</text>\n    <text x=\"705\" y=\"147\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">usuários</text>\n    <rect x=\"620\" y=\"210\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"705\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">VLAN Guest</text>\n    <text x=\"705\" y=\"262\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">internet only</text>\n    <rect x=\"620\" y=\"325\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"705\" y=\"355\" text-anchor=\"middle\" class=\"svg-label\">VLAN IoT</text>\n    <text x=\"705\" y=\"377\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mínimo necessário</text>\n\n    <rect x=\"870\" y=\"170\" width=\"170\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"955\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"955\" y=\"235\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">políticas entre zonas</text>\n\n    <rect x=\"870\" y=\"330\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"955\" y=\"361\" text-anchor=\"middle\" class=\"svg-label\">RADIUS / NAC</text>\n    <text x=\"955\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">identidade e VLAN</text>\n\n    <rect x=\"870\" y=\"470\" width=\"170\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"955\" y=\"500\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n    <text x=\"955\" y=\"522\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs correlacionados</text>\n\n    <rect x=\"1070\" y=\"155\" width=\"90\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"1115\" y=\"185\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n    <text x=\"1115\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SaaS</text>\n\n    <line x1=\"240\" y1=\"190\" x2=\"360\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"240\" y1=\"330\" x2=\"360\" y2=\"168\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"550\" y1=\"164\" x2=\"620\" y2=\"130\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"550\" y1=\"164\" x2=\"620\" y2=\"245\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"550\" y1=\"164\" x2=\"620\" y2=\"360\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"790\" y1=\"130\" x2=\"870\" y2=\"205\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"790\" y1=\"245\" x2=\"870\" y2=\"220\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"790\" y1=\"360\" x2=\"870\" y2=\"240\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"1040\" y1=\"220\" x2=\"1070\" y2=\"190\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"455\" y1=\"275\" x2=\"455\" y2=\"208\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"550\" y1=\"320\" x2=\"870\" y2=\"370\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wifi-arch)\" />\n    <line x1=\"955\" y1=\"410\" x2=\"955\" y2=\"470\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-wifi-arch)\" />\n\n    <text x=\"595\" y=\"558\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Arquitetura correta = SSID visível + VLAN real + política + identidade + logs + validação</text>\n  </svg>\n\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório é conceitual-prático e pode ser feito sem equipamento corporativo. Você vai desenhar uma WLAN corporativa, mapear SSIDs para VLANs, definir políticas mínimas de firewall, prever DHCP/DNS, listar evidências e validar isolamento. Se tiver Cisco Packet Tracer, GNS3, switch gerenciável ou AP com VLAN tagging, você pode simular parte do desenho. Caso contrário, faça como exercício de arquitetura e checklist de validação.</p>\n  <p>O foco não é configurar um fornecedor específico, mas desenvolver o raciocínio profissional: cada SSID deve ter motivo, autenticação, segmento, política, logs, dono e plano de troubleshooting.</p>\n\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios forçam produção ativa: você vai transformar requisitos de negócio em SSIDs, VLANs, políticas e testes. A ideia é abandonar a visão de “senha do Wi-Fi” e passar a pensar em arquitetura de acesso.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio simula uma empresa com funcionários, visitantes, IoT e equipe de suporte. Você deverá propor um desenho seguro, diagnosticável e operacionalmente viável, com atenção a custo, compatibilidade e logs.</p>\n\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como interpretar requisitos, reduzir SSIDs desnecessários, separar VLANs por risco, aplicar firewall deny-by-default, integrar identidade quando possível e criar validações objetivas para provar que a arquitetura funciona.</p>\n\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n\n  <ul>\n    <li><strong>Ideia central:</strong> Wi-Fi corporativo é arquitetura de acesso, identidade, segmentação, política e operação.</li>\n    <li><strong>O que lembrar:</strong> SSID não é segurança; VLAN sem firewall também não basta.</li>\n    <li><strong>Erro comum:</strong> criar muitos SSIDs e achar que nomes diferentes significam isolamento real.</li>\n    <li><strong>Uso real:</strong> cada SSID deve ter autenticação, VLAN, gateway, DHCP, DNS, política, logs e dono operacional.</li>\n  </ul>\n\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, você vai estudar ameaças wireless: rogue AP, evil twin, deauth e boas defesas. A arquitetura desta aula é a base para responder a essas ameaças. Sem inventário de APs, segmentação, autenticação forte, logs e validação de isolamento, o Blue Team não consegue diferenciar falha operacional de risco real.</p>\n\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede",
      "Camada 7 - Aplicação e identidade operacional"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IEEE 802.11",
      "802.1Q",
      "802.1X",
      "EAPOL",
      "RADIUS",
      "DHCP",
      "DNS",
      "CAPWAP",
      "DTLS",
      "SNMP",
      "Syslog",
      "NetFlow/IPFIX"
    ],
    "dependsOn": [
      "SSID",
      "BSSID",
      "RF",
      "WPA Enterprise",
      "VLAN",
      "DHCP",
      "DNS",
      "Firewall"
    ],
    "enables": [
      "Rede guest segura",
      "IoT segmentado",
      "NAC",
      "Wi-Fi corporativo auditável",
      "Troubleshooting profissional",
      "Blue Team wireless"
    ]
  },
  "protocolFields": [
    {
      "field": "VLAN ID",
      "size": "12 bits no 802.1Q",
      "purpose": "Identificar o segmento lógico onde o tráfego será colocado.",
      "securityObservation": "VLAN errada pode expor visitantes ou IoT a redes internas."
    },
    {
      "field": "SSID",
      "size": "Até 32 octetos",
      "purpose": "Identificar a WLAN anunciada ao cliente.",
      "securityObservation": "Nome de SSID não prova isolamento nem autenticação forte."
    },
    {
      "field": "RADIUS attributes",
      "size": "Variável",
      "purpose": "Transportar decisões como aceitação, rejeição, VLAN dinâmica ou atributos de política.",
      "securityObservation": "Atributos mal testados podem colocar usuários em segmentos incorretos."
    },
    {
      "field": "CAPWAP control/data",
      "size": "Variável",
      "purpose": "Permitir que controladoras gerenciem APs e, em alguns modos, transportem dados.",
      "securityObservation": "Plano de gestão precisa ser protegido, monitorado e documentado."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "AP",
      "action": "Inicializa e busca configuração",
      "detail": "Recebe IP de gerenciamento, alcança controladora/cloud e aplica perfil de SSID/RF.",
      "possibleFailure": "AP sem IP, DNS incorreto, firewall bloqueando gestão ou licença ausente."
    },
    {
      "step": 2,
      "actor": "Cliente",
      "action": "Associa ao SSID",
      "detail": "Escolhe BSSID, negocia capacidades e passa pelo método de segurança definido.",
      "possibleFailure": "Sinal ruim, incompatibilidade WPA, certificado não confiável ou falha RADIUS."
    },
    {
      "step": 3,
      "actor": "Controladora/RADIUS",
      "action": "Define política",
      "detail": "Aceita/rejeita e pode atribuir VLAN, role ou ACL conforme identidade e postura.",
      "possibleFailure": "Grupo errado, atributo ausente, fallback inseguro ou timeout."
    },
    {
      "step": 4,
      "actor": "AP/Switch",
      "action": "Entrega tráfego ao segmento",
      "detail": "Marca VLAN no trunk ou envia por túnel até a controladora, conforme arquitetura.",
      "possibleFailure": "VLAN não permitida no trunk, gateway ausente ou bridge/tunnel mal configurado."
    },
    {
      "step": 5,
      "actor": "Firewall/DHCP/DNS",
      "action": "Permite serviços necessários",
      "detail": "Cliente recebe IP, resolve nomes e acessa somente destinos autorizados.",
      "possibleFailure": "DHCP sem escopo, DNS bloqueado, firewall permissivo demais ou restritivo demais."
    }
  ],
  "deepDive": {
    "mentalModel": "Pense em Wi-Fi corporativo como uma fábrica de decisões: o rádio aproxima o cliente, mas identidade, VLAN, gateway, firewall e logs determinam o acesso real.",
    "keyTerms": [
      "AP",
      "controladora",
      "cloud-managed WLAN",
      "SSID",
      "BSSID",
      "VLAN",
      "trunk",
      "NAC",
      "RADIUS",
      "rede guest",
      "IoT",
      "bridge local",
      "túnel centralizado"
    ],
    "limitations": [
      "SSID não é fronteira de segurança por si só.",
      "VLAN sem política de firewall pode permitir lateralidade indesejada.",
      "Cloud management simplifica operação, mas cria dependência de licença e conectividade de gestão.",
      "Muitos SSIDs aumentam beacons e custo de airtime.",
      "APs autônomos são difíceis de padronizar em escala."
    ],
    "whenToUse": [
      "Quando há múltiplos perfis de acesso com riscos diferentes.",
      "Quando a empresa precisa de autenticação por identidade ou certificado.",
      "Quando visitantes, IoT e usuários corporativos não podem compartilhar o mesmo segmento.",
      "Quando há exigência de auditoria, logs, troubleshooting e resposta a incidente.",
      "Quando filiais precisam de política consistente."
    ],
    "whenNotToUse": [
      "Não criar SSID novo para cada departamento sem necessidade real.",
      "Não usar rede guest para dispositivos internos permanentes.",
      "Não usar PSK compartilhado como solução eterna para ambiente corporativo crítico.",
      "Não colocar APs em portas trunk amplas sem documentação e validação.",
      "Não centralizar tráfego sem avaliar latência, capacidade e resiliência."
    ],
    "operationalImpact": [
      "Exige documentação de SSID, VLAN, gateway, DHCP, DNS, firewall e dono do serviço.",
      "Exige processo de mudança para novas WLANs, alteração de senha, certificado e política.",
      "Exige monitoramento de APs, controladora, RADIUS, DHCP, DNS e firewall.",
      "Melhora troubleshooting quando logs são correlacionados, mas aumenta dependência de observabilidade."
    ],
    "financialImpact": [
      "Pode exigir licenças por AP, suporte, controladora, cloud management, NAC, certificados e SIEM.",
      "Switches PoE, uplinks, firewall e armazenamento de logs podem precisar de capacidade adicional.",
      "Centralizar tráfego pode aumentar uso de links WAN ou VPN.",
      "Arquitetura bem feita reduz custo de incidentes, retrabalho e indisponibilidade."
    ],
    "securityImpact": [
      "Reduz movimento lateral quando SSIDs e VLANs são ligados a políticas reais.",
      "Melhora atribuição de identidade quando usa 802.1X, RADIUS e certificados.",
      "Aumenta rastreabilidade quando logs são completos.",
      "Cria falsa sensação de segurança quando SSIDs diferentes caem na mesma rede ou quando firewall é permissivo."
    ]
  },
  "realWorld": {
    "homeScenario": "Roteador doméstico com rede principal e guest. O teste essencial é confirmar se guest não acessa dispositivos internos.",
    "smallBusinessScenario": "Dois APs com SSID corporativo e guest, VLANs separadas em switch gerenciável e firewall aplicando internet-only para visitantes.",
    "enterpriseScenario": "Controladora ou cloud management com SSIDs corporativo, guest, IoT e operação, 802.1X para funcionários, VLAN dinâmica, logs no SIEM e templates por site.",
    "cloudScenario": "APs gerenciados por dashboard cloud, autenticação integrada a IdP/RADIUS cloud, logs enviados a SIEM SaaS e políticas alinhadas a ZTNA/SWG.",
    "incidentScenario": "Visitante em SSID guest acessa impressora interna; investigação verifica VLAN, roteamento, firewall, ACL, DHCP, DNS, logs de associação e testes de isolamento."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que SSID separado significa rede separada.",
      "whyItHappens": "A interface visual mostra nomes diferentes e isso parece isolamento.",
      "consequence": "Visitantes, IoT e usuários podem compartilhar o mesmo domínio de broadcast ou política permissiva.",
      "correction": "Mapear cada SSID para VLAN/role e testar isolamento com firewall e evidências."
    },
    {
      "mistake": "Criar SSID demais.",
      "whyItHappens": "Cada área pede uma rede própria para resolver política por nome.",
      "consequence": "Aumenta beacons, airtime, complexidade, erros de configuração e suporte.",
      "correction": "Preferir poucos SSIDs bem governados e usar identidade, grupos, VLAN dinâmica ou roles quando possível."
    },
    {
      "mistake": "Permitir todas as VLANs no trunk do AP.",
      "whyItHappens": "Parece mais simples operacionalmente e evita troubleshooting inicial.",
      "consequence": "Erro de configuração pode expor segmentos desnecessários.",
      "correction": "Permitir apenas VLANs necessárias e manter documentação de porta, AP, SSID e site."
    },
    {
      "mistake": "Misturar gerenciamento do AP com VLAN de clientes.",
      "whyItHappens": "Economiza sub-redes e parece prático em ambientes pequenos.",
      "consequence": "Clientes podem alcançar plano de gestão ou quebrar APs em incidente.",
      "correction": "Separar VLAN de gerenciamento, aplicar ACL e monitorar acesso administrativo."
    },
    {
      "mistake": "Tratar rede IoT como exceção permanente.",
      "whyItHappens": "Dispositivos antigos não suportam 802.1X ou WPA moderno.",
      "consequence": "Segmento vira depósito de risco, sem inventário e sem expiração.",
      "correction": "Criar política mínima, inventário, monitoramento, compensações e plano de substituição."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Cliente associa, mas não recebe IP.",
      "Visitante acessa rede interna.",
      "IoT funciona em um AP, mas não em outro.",
      "Usuário autentica, mas cai na VLAN errada.",
      "AP aparece offline na controladora.",
      "SSID existe em uma filial, mas não em outra.",
      "Roaming quebra quando muda de AP."
    ],
    "diagnosticQuestions": [
      "O problema é RF, associação, autenticação, VLAN, DHCP, DNS, firewall ou aplicação?",
      "Qual SSID, BSSID, AP, switchport e VLAN estavam envolvidos?",
      "A VLAN está permitida no trunk do AP?",
      "O RADIUS retornou atributo de VLAN ou role?",
      "O DHCP tem escopo ativo para esse segmento?",
      "O firewall permite somente o necessário?",
      "Há logs correlacionados em AP, controladora, RADIUS, DHCP e firewall?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces\nipconfig /all\nroute print\nnslookup intranet.exemplo.local",
        "purpose": "Ver SSID, BSSID, rádio, IP, gateway, DNS e rota do cliente.",
        "expectedObservation": "Cliente conectado ao SSID esperado, com IP da VLAN correta, gateway e DNS coerentes.",
        "interpretation": "Se BSSID/SSID está correto mas IP não vem, investigue VLAN/trunk/DHCP antes de culpar RF."
      },
      {
        "platform": "Linux",
        "command": "nmcli -f IN-USE,SSID,BSSID,CHAN,SIGNAL,SECURITY dev wifi list\nip addr\nip route\nresolvectl status",
        "purpose": "Listar BSSIDs, sinal, segurança, IP, rota e DNS.",
        "expectedObservation": "BSSID coerente, IP da sub-rede esperada, rota default e DNS correto.",
        "interpretation": "Se a associação existe mas a rede lógica está errada, foque em VLAN e política."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces trunk\nshow vlan brief\nshow mac address-table dynamic\nshow power inline",
        "purpose": "Validar trunks, VLANs, aprendizado MAC e PoE em switches que alimentam APs.",
        "expectedObservation": "Porta do AP com VLANs necessárias permitidas, PoE entregue e MACs aprendidos.",
        "interpretation": "VLAN ausente no trunk ou PoE instável pode causar falhas intermitentes de WLAN."
      },
      {
        "platform": "Controladora WLAN",
        "command": "Verificar client details, policy profile, VLAN, RADIUS result, AP name, BSSID e event log",
        "purpose": "Correlacionar identidade, AP, SSID, VLAN e motivo de falha.",
        "expectedObservation": "Eventos mostram associação, autenticação, VLAN atribuída e endereço IP.",
        "interpretation": "Falhas de autenticação e atribuição de VLAN aparecem antes de problemas de aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Cliente não vê SSID",
        "then": "Verificar perfil do SSID, AP, rádio, canal, potência, banda, site tag e se o SSID está habilitado naquele AP."
      },
      {
        "if": "Cliente associa mas não autentica",
        "then": "Verificar método WPA, certificados, RADIUS, grupo, relógio do cliente e logs EAP."
      },
      {
        "if": "Cliente autentica mas não recebe IP",
        "then": "Verificar VLAN atribuída, trunk, DHCP relay, escopo DHCP e firewall entre VLAN e servidor DHCP."
      },
      {
        "if": "Cliente recebe IP mas não acessa destino",
        "then": "Verificar gateway, DNS, rota, firewall e política por segmento."
      },
      {
        "if": "Guest acessa rede interna",
        "then": "Tratar como falha de segmentação: revisar VLAN, firewall, ACL, rotas e testes de isolamento."
      }
    ]
  },
  "trafficCapture": {
    "tool": "Wireshark, tcpdump e logs de controladora, apenas em ambiente autorizado",
    "filter": "dhcp or dns or radius or eapol or vlan",
    "whatToObserve": [
      "EAPOL durante autenticação 802.1X",
      "DHCP Discover/Offer/Request/Ack na VLAN correta",
      "Consultas DNS após obtenção de IP",
      "Tráfego bloqueado ou permitido pelo firewall",
      "Eventos de associação, autenticação e atribuição de VLAN na controladora"
    ],
    "interpretation": "O objetivo é provar em qual etapa a falha acontece: segurança, VLAN, DHCP, DNS, firewall ou aplicação. Captura sem contexto de arquitetura não basta."
  },
  "security": {
    "goodPractices": [
      "Separar SSIDs por perfil de risco, não por conveniência política.",
      "Usar WPA Enterprise/EAP-TLS para rede corporativa quando possível.",
      "Aplicar firewall deny-by-default entre VLANs.",
      "Manter rede guest isolada da rede interna.",
      "Restringir VLANs permitidas em trunks de AP.",
      "Separar plano de gerenciamento dos APs dos segmentos de clientes.",
      "Enviar logs de AP, controladora, RADIUS, DHCP, DNS e firewall para SIEM.",
      "Documentar dono, objetivo, autenticação, VLAN, política e validade de cada SSID."
    ],
    "badPractices": [
      "Usar uma única senha compartilhada por anos.",
      "Colocar visitantes e usuários internos na mesma rede.",
      "Criar SSID para cada departamento sem necessidade técnica.",
      "Permitir any-any entre VLANs wireless.",
      "Deixar APs sem inventário ou fora de controladora.",
      "Não testar isolamento após mudança de firewall ou VLAN."
    ],
    "commonErrors": [
      "Confundir VLAN com firewall.",
      "Confundir autenticação com autorização.",
      "Confundir rede guest com segurança automática.",
      "Confundir cloud management com tráfego do cliente passando pela cloud.",
      "Esquecer que DHCP e DNS fazem parte da experiência Wi-Fi."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição lateral por segmentação fraca",
        "description": "Clientes wireless de perfis diferentes conseguem alcançar redes internas ou uns aos outros sem necessidade.",
        "defensiveExplanation": "O risco normalmente surge de VLAN incorreta, firewall permissivo, rota indevida ou SSID guest mal projetado.",
        "mitigation": "VLANs separadas, firewall deny-by-default, teste de isolamento, logs e revisão periódica."
      },
      {
        "name": "Acesso não rastreável por PSK compartilhado",
        "description": "Muitos usuários compartilham a mesma senha, dificultando atribuição individual.",
        "defensiveExplanation": "Mesmo que a criptografia exista, a identidade do usuário/dispositivo pode não ser confiável.",
        "mitigation": "WPA Enterprise, EAP-TLS, DPSK, NAC, rotação e inventário."
      },
      {
        "name": "Plano de gestão exposto",
        "description": "Interfaces de AP, controladora ou dashboard são acessíveis por redes de usuários.",
        "defensiveExplanation": "Comprometimento de credenciais ou dispositivo pode virar alteração de infraestrutura.",
        "mitigation": "VLAN de gestão separada, MFA, ACL, logs administrativos e menor privilégio."
      }
    ],
    "monitoring": [
      "Eventos de associação e desassociação por cliente.",
      "Falhas RADIUS por SSID, AP, usuário e motivo.",
      "Atribuições de VLAN e role por sessão.",
      "Clientes guest tentando acessar RFC1918 interno.",
      "IoT realizando conexões fora do padrão esperado.",
      "APs offline, configuração divergente ou rogue AP detectado."
    ],
    "hardening": [
      "Desabilitar SSIDs não usados.",
      "Usar WPA3/WPA2 Enterprise conforme compatibilidade e risco.",
      "Exigir PMF onde viável.",
      "Restringir trunks e portas de AP.",
      "Controlar acesso administrativo com MFA e RBAC.",
      "Aplicar templates e revisão de mudança.",
      "Manter firmware de APs e controladoras atualizado."
    ],
    "detectionIdeas": [
      "Alerta quando guest tenta acessar rede interna.",
      "Alerta para mudança de configuração de SSID ou VLAN.",
      "Alerta para falhas RADIUS concentradas.",
      "Alerta para AP desconhecido conectado em switch corporativo.",
      "Alerta para crescimento anormal de dispositivos em SSID IoT."
    ]
  },
  "lab": {
    "id": "lab-12.7",
    "title": "Desenhar e validar uma arquitetura Wi-Fi corporativa com SSIDs, VLANs e políticas",
    "labType": "security",
    "objective": "Criar um desenho lógico de WLAN corporativa com quatro perfis de acesso e validar conceitualmente segmentação, endereçamento, autenticação, logs e troubleshooting.",
    "scenario": "Uma empresa possui matriz pequena com 120 funcionários, visitantes frequentes, dispositivos IoT e equipe de suporte. O Wi-Fi atual tem uma senha compartilhada e todos caem na mesma rede. Sua tarefa é propor uma arquitetura segura, operacional e diagnosticável.",
    "topology": "Clientes wireless -> APs PoE -> switch trunk -> firewall/gateway -> DHCP/DNS/RADIUS/SIEM/internet/serviços internos.",
    "architecture": "Quatro SSIDs ou políticas equivalentes: Corp, Guest, IoT e Ops. Cada um deve ter autenticação, VLAN/segmento, DHCP, DNS, gateway, política de firewall, logs e evidências de validação.",
    "prerequisites": [
      "Conhecer SSID, BSSID, WPA/WPA3, 802.1X, VLAN, DHCP, DNS e firewall.",
      "Ter papel e caneta, editor de texto ou ferramenta de diagrama.",
      "Opcional: Cisco Packet Tracer, GNS3, switch/AP gerenciável ou dashboard de laboratório."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Opcional: Cisco Packet Tracer ou GNS3",
      "Opcional: Wireshark",
      "Opcional: terminal Windows/Linux para comandos de validação em rede própria"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não teste isolamento em rede corporativa sem autorização.",
      "Não altere SSIDs, VLANs, firewall ou RADIUS de produção sem mudança aprovada.",
      "Não capture tráfego de terceiros sem permissão.",
      "O laboratório é defensivo e de arquitetura; não envolve ataque wireless."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Listar perfis de acesso",
        "instruction": "Crie uma tabela com os perfis Corp, Guest, IoT e Ops. Para cada perfil, escreva quem usa, que tipo de dispositivo entra e que risco representa.",
        "command": "Perfil | Usuários | Dispositivos | Risco | Dono\nCorp | Funcionários | notebooks/celulares corporativos | acesso interno | TI/IAM\nGuest | visitantes | BYOD externo | internet only | Facilities/TI\nIoT | sensores/câmeras/impressoras | dispositivos restritos | legado/exposição | Infra/Sec\nOps | equipe técnica | notebooks admin | privilégio alto | Infra/Sec",
        "expectedOutput": "Tabela inicial com perfis e riscos.",
        "explanation": "Arquitetura começa por requisitos e risco, não por nome de SSID."
      },
      {
        "number": 2,
        "title": "Definir autenticação por perfil",
        "instruction": "Escolha método de autenticação para cada perfil, justificando compatibilidade, rastreabilidade e risco.",
        "command": "Corp: WPA Enterprise/EAP-TLS\nGuest: portal com expiração ou OWE/PSK temporário\nIoT: DPSK/MAB/NAC ou PSK por grupo com compensações\nOps: WPA Enterprise + grupo restrito + MFA no acesso administrativo",
        "expectedOutput": "Métodos de autenticação com justificativa.",
        "explanation": "Nem todos os dispositivos suportam o melhor método, mas exceções precisam de compensações e prazo."
      },
      {
        "number": 3,
        "title": "Mapear VLANs e sub-redes",
        "instruction": "Atribua uma VLAN e sub-rede para cada perfil. Inclua gateway, DHCP e DNS esperado.",
        "command": "Corp: VLAN 110, 10.10.110.0/24, GW 10.10.110.1\nGuest: VLAN 120, 10.10.120.0/24, GW 10.10.120.1\nIoT: VLAN 130, 10.10.130.0/24, GW 10.10.130.1\nOps: VLAN 140, 10.10.140.0/25, GW 10.10.140.1",
        "expectedOutput": "Tabela de VLANs e endereçamento.",
        "explanation": "Cada segmento precisa existir no switch, gateway, DHCP, DNS e firewall."
      },
      {
        "number": 4,
        "title": "Definir políticas de firewall",
        "instruction": "Escreva regras de alto nível entre segmentos. Use deny-by-default e permita apenas fluxos necessários.",
        "command": "Guest -> Internet: permitir HTTP/HTTPS/DNS conforme política\nGuest -> RFC1918 interno: negar\nIoT -> servidores específicos: permitir portas necessárias\nIoT -> usuários: negar\nCorp -> serviços internos: permitir por perfil\nOps -> gestão: permitir somente equipe autorizada\nAny -> logs/SIEM: conforme arquitetura de coleta",
        "expectedOutput": "Matriz de acesso por segmento.",
        "explanation": "VLAN organiza; firewall controla. Sem firewall, segmentação pode virar apenas separação visual."
      },
      {
        "number": 5,
        "title": "Planejar trunks e AP management",
        "instruction": "Defina quais VLANs a porta do AP deve permitir e qual VLAN será usada para gerenciamento do AP.",
        "command": "AP switchport:\n- VLAN de gerenciamento: 100\n- VLANs permitidas para clientes: 110,120,130,140\n- Não permitir VLANs desnecessárias\n- Acesso de gestão apenas de rede Ops/Sec",
        "expectedOutput": "Política de trunk e gestão.",
        "explanation": "Permitir todas as VLANs em portas de AP aumenta impacto de erro operacional."
      },
      {
        "number": 6,
        "title": "Criar plano de logs e evidências",
        "instruction": "Liste quais sistemas devem gerar logs e que campos são essenciais para investigação.",
        "command": "AP/controladora: SSID, BSSID, AP, cliente, evento, RSSI, motivo\nRADIUS/NAC: usuário, método EAP, resultado, VLAN/role\nDHCP: MAC, IP, lease, escopo\nDNS: consultas relevantes\nFirewall: origem, destino, porta, ação, regra\nSIEM: correlação por usuário, MAC, IP, AP e horário",
        "expectedOutput": "Plano de observabilidade mínimo.",
        "explanation": "Sem logs correlacionáveis, a arquitetura não é diagnosticável."
      },
      {
        "number": 7,
        "title": "Definir testes de validação",
        "instruction": "Crie testes que provem que cada segmento funciona e está isolado corretamente.",
        "command": "Guest: ping/curl para internet permitido; acesso a 10.0.0.0/8 negado\nIoT: acesso apenas aos servidores definidos\nCorp: acesso interno conforme perfil\nOps: acesso a gestão permitido somente para grupo autorizado\nTodos: DHCP, DNS e gateway corretos",
        "expectedOutput": "Checklist de validação por SSID/VLAN.",
        "explanation": "A arquitetura só está pronta quando há evidência, não apenas diagrama."
      },
      {
        "number": 8,
        "title": "Criar plano de troubleshooting",
        "instruction": "Para cada falha comum, defina a primeira evidência a coletar.",
        "command": "Sem SSID: verificar AP/perfil/rádio\nAssocia mas não autentica: verificar RADIUS/EAP/certificado\nAutentica mas sem IP: verificar VLAN/trunk/DHCP\nTem IP mas sem internet: verificar DNS/gateway/firewall\nGuest acessa interno: verificar rotas/firewall/ACL",
        "expectedOutput": "Playbook inicial de troubleshooting.",
        "explanation": "O playbook reduz debates improdutivos e organiza a investigação por camada."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma arquitetura Wi-Fi corporativa com perfis de acesso, autenticação, VLANs, políticas de firewall, plano de logs, testes de isolamento e troubleshooting.",
    "validation": [
      {
        "check": "Cada SSID tem motivo claro",
        "command": "Revisar tabela de perfis",
        "expected": "Nenhum SSID existe sem usuário, risco, dono e política.",
        "ifFails": "Consolidar SSIDs ou substituir por política dinâmica."
      },
      {
        "check": "Guest isolado da rede interna",
        "command": "Testes de acesso de Guest para RFC1918 interno",
        "expected": "Tráfego negado pelo firewall.",
        "ifFails": "Revisar VLAN, rotas, ACLs e política de firewall."
      },
      {
        "check": "IoT com acesso mínimo",
        "command": "Matriz IoT -> destinos permitidos",
        "expected": "Somente serviços necessários liberados.",
        "ifFails": "Remover regras amplas e criar exceções documentadas."
      },
      {
        "check": "Logs correlacionáveis",
        "command": "Verificar campos usuário/MAC/IP/AP/VLAN/horário",
        "expected": "Eventos podem ser ligados entre AP, RADIUS, DHCP e firewall.",
        "ifFails": "Ajustar envio de logs e normalização no SIEM."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Cliente do SSID Corp autentica mas recebe IP de Guest.",
        "probableCause": "Atributo RADIUS de VLAN incorreto ou mapeamento de SSID/VLAN errado.",
        "howToConfirm": "Verificar logs RADIUS, client details na controladora e escopo DHCP.",
        "fix": "Corrigir política de grupo/VLAN, testar com usuário piloto e documentar."
      },
      {
        "symptom": "AP novo funciona para Corp, mas IoT não recebe IP.",
        "probableCause": "VLAN IoT não permitida no trunk do switch ou não existe no caminho até o gateway.",
        "howToConfirm": "Verificar trunk, VLAN brief, DHCP relay e logs DHCP.",
        "fix": "Permitir somente VLAN IoT necessária no trunk e validar DHCP."
      },
      {
        "symptom": "Guest navega, mas acessa impressoras internas.",
        "probableCause": "Firewall permite rotas internas ou Guest caiu em VLAN errada.",
        "howToConfirm": "Verificar IP do cliente, gateway, regras de firewall e tabela de rotas.",
        "fix": "Aplicar deny para redes internas e testar isolamento."
      },
      {
        "symptom": "APs aparecem offline na gestão cloud.",
        "probableCause": "DNS, firewall de saída, proxy, licença ou rota de gestão indisponível.",
        "howToConfirm": "Testar resolução DNS, conectividade HTTPS e eventos do dashboard.",
        "fix": "Liberar destinos de gestão conforme documentação do fabricante e revisar licença."
      }
    ],
    "improvements": [
      "Migrar Corp para EAP-TLS quando possível.",
      "Reduzir número de SSIDs e usar VLAN dinâmica/roles.",
      "Criar dashboard de falhas RADIUS e clientes sem IP.",
      "Automatizar validação de isolamento após mudanças.",
      "Documentar exceções IoT com prazo de expiração.",
      "Enviar logs normalizados ao SIEM."
    ],
    "evidenceToCollect": [
      "Tabela SSID -> autenticação -> VLAN -> política.",
      "Diagrama lógico da arquitetura.",
      "Matriz de firewall.",
      "Checklist de validação por segmento.",
      "Exemplo de log esperado de AP/controladora/RADIUS/DHCP/firewall.",
      "Lista de riscos residuais e mitigação."
    ],
    "questions": [
      "Por que SSID separado não prova isolamento?",
      "Quando usar VLAN dinâmica em vez de SSID adicional?",
      "Quais logs são necessários para investigar um cliente conectado sem IP?",
      "Como provar que Guest não acessa rede interna?",
      "Qual é o custo operacional de manter IoT legado?"
    ],
    "challenge": "A diretoria quer uma rede única chamada Empresa-WiFi para todos, com senha simples para reduzir chamados. Explique por que isso é arriscado e proponha alternativa que mantenha usabilidade sem sacrificar identidade, segmentação e logs.",
    "solution": "A rede única com PSK compartilhado reduz fricção inicial, mas destrói rastreabilidade, aumenta movimento lateral e dificulta desligamento de acessos. Uma alternativa é manter poucos SSIDs: Corp com WPA Enterprise/EAP-TLS, Guest isolado e IoT restrito, usando automação de onboarding, certificados, portal de visitante e documentação de suporte. A usabilidade deve ser resolvida com bom onboarding, não com ausência de controle."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que Wi-Fi corporativo deve ser tratado como arquitetura de acesso e não como simples cobertura de rádio?",
      "hints": [
        "Pense em identidade, VLAN, firewall e logs.",
        "Pense no que acontece depois que o cliente associa."
      ],
      "expectedIdeas": [
        "segmentação",
        "autenticação",
        "política",
        "observabilidade",
        "risco"
      ],
      "explanation": "O rádio só entrega conectividade local; a arquitetura define quem acessa o quê e como isso será auditado."
    },
    {
      "type": "diagnóstico",
      "question": "Um cliente do SSID IoT associa ao AP, mas não recebe IP. Quais hipóteses você testaria antes de culpar o AP?",
      "hints": [
        "Verifique VLAN, trunk e DHCP.",
        "Separe associação de endereçamento."
      ],
      "expectedIdeas": [
        "VLAN não permitida",
        "escopo DHCP",
        "DHCP relay",
        "gateway",
        "mapeamento SSID-VLAN"
      ],
      "explanation": "Associação bem-sucedida não garante que o caminho de dados até DHCP esteja correto."
    },
    {
      "type": "cenário real",
      "question": "Sua rede guest consegue acessar uma impressora interna. Como você explicaria a gravidade para um gestor não técnico?",
      "hints": [
        "Use analogia de visitante no prédio.",
        "Explique risco lateral sem alarmismo."
      ],
      "expectedIdeas": [
        "isolamento falhou",
        "exposição interna",
        "teste de firewall",
        "corrigir política",
        "evidência"
      ],
      "explanation": "O ponto é mostrar que guest deveria ser uma zona controlada; se acessa ativos internos, o desenho não cumpre a finalidade."
    }
  ],
  "quiz": [
    {
      "id": "q12.7.1",
      "type": "conceito",
      "q": "Qual afirmação melhor descreve uma arquitetura Wi-Fi corporativa?",
      "opts": [
        "Um conjunto de APs com o mesmo nome de rede",
        "Uma plataforma de acesso que integra RF, SSID, VLAN, autenticação, firewall, logs e operação",
        "Uma senha forte compartilhada por todos os funcionários",
        "Um roteador doméstico com potência aumentada"
      ],
      "a": 1,
      "exp": "Wi-Fi corporativo envolve acesso, identidade, segmentação, política, observabilidade e troubleshooting, não apenas APs.",
      "difficulty": "intermediário",
      "topic": "arquitetura"
    },
    {
      "id": "q12.7.2",
      "type": "segurança",
      "q": "Por que um SSID Guest não é automaticamente seguro?",
      "opts": [
        "Porque SSID guest sempre usa criptografia fraca",
        "Porque o nome do SSID não garante VLAN separada, firewall e isolamento",
        "Porque visitantes nunca devem usar Wi-Fi",
        "Porque todo SSID guest passa pela cloud"
      ],
      "a": 1,
      "exp": "Guest só é seguro se houver segmentação e política real; o nome não cria isolamento.",
      "difficulty": "intermediário",
      "topic": "guest"
    },
    {
      "id": "q12.7.3",
      "type": "diagnóstico",
      "q": "Um cliente autentica no SSID Corp, mas recebe IP da sub-rede de Guest. Qual hipótese é forte?",
      "opts": [
        "RSSI baixo sempre causa IP errado",
        "Atributo RADIUS ou mapeamento SSID-VLAN está incorreto",
        "DNS público está fora do ar",
        "A largura de canal está muito alta"
      ],
      "a": 1,
      "exp": "IP em VLAN errada aponta para política/mapeamento, não para RF como primeira hipótese.",
      "difficulty": "intermediário",
      "topic": "vlan"
    },
    {
      "id": "q12.7.4",
      "type": "arquitetura",
      "q": "Qual prática reduz risco em portas de switch usadas por APs?",
      "opts": [
        "Permitir todas as VLANs para evitar chamados",
        "Usar a mesma VLAN para gestão e clientes",
        "Permitir apenas VLANs necessárias e separar gestão",
        "Desligar logs para reduzir ruído"
      ],
      "a": 2,
      "exp": "Trunks restritos e gestão separada reduzem impacto de erro e exposição.",
      "difficulty": "intermediário",
      "topic": "switching"
    },
    {
      "id": "q12.7.5",
      "type": "operação",
      "q": "Qual conjunto de logs ajuda melhor a investigar um cliente wireless conectado sem IP?",
      "opts": [
        "Somente log do navegador",
        "AP/controladora, RADIUS, DHCP e switch/firewall",
        "Apenas print do ícone Wi-Fi",
        "Somente histórico do DNS público"
      ],
      "a": 1,
      "exp": "Sem IP pode envolver associação, autenticação, VLAN, trunk, DHCP e firewall; é preciso correlacionar fontes.",
      "difficulty": "intermediário",
      "topic": "observabilidade"
    },
    {
      "id": "q12.7.6",
      "type": "pegadinha",
      "q": "Qual é o problema de criar um SSID para cada departamento sem necessidade técnica?",
      "opts": [
        "Sempre melhora segurança por aumentar nomes",
        "Pode aumentar airtime, complexidade, beacons e erro operacional",
        "Elimina necessidade de firewall",
        "Faz os APs consumirem menos energia"
      ],
      "a": 1,
      "exp": "Mais SSIDs podem aumentar overhead e complexidade. Política deve ser resolvida preferencialmente por identidade, VLAN dinâmica ou roles quando viável.",
      "difficulty": "intermediário",
      "topic": "design"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.7.1",
      "front": "SSID é fronteira de segurança?",
      "back": "Não. SSID é identificação lógica da WLAN. Segurança real depende de autenticação, VLAN, firewall, política e logs.",
      "tags": [
        "ssid",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.7.2",
      "front": "Qual é a função da VLAN em Wi-Fi corporativo?",
      "back": "Colocar tráfego de clientes em segmentos lógicos diferentes para aplicar política, endereçamento e controle.",
      "tags": [
        "vlan",
        "arquitetura"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.7.3",
      "front": "O que uma controladora WLAN centraliza?",
      "back": "Perfis de AP, SSIDs, RF, políticas, telemetria, eventos e, dependendo da arquitetura, parte do plano de dados.",
      "tags": [
        "controladora",
        "wlan"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.7.4",
      "front": "Por que muitos SSIDs podem ser ruins?",
      "back": "Eles aumentam beacons, airtime consumido, complexidade operacional e risco de configuração divergente.",
      "tags": [
        "ssid",
        "rf"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.7.5",
      "front": "VLAN substitui firewall?",
      "back": "Não. VLAN separa domínios lógicos; firewall controla comunicação entre eles.",
      "tags": [
        "vlan",
        "firewall"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.7.6",
      "front": "Quais evidências correlacionar em incidente wireless?",
      "back": "Usuário, MAC, IP, SSID, BSSID, AP, VLAN, resultado RADIUS, lease DHCP, regra de firewall e horário.",
      "tags": [
        "siem",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.7.1",
      "type": "arquitetura",
      "prompt": "Desenhe uma matriz com três SSIDs: Corp, Guest e IoT. Para cada um, defina autenticação, VLAN, política de firewall e logs mínimos.",
      "expectedAnswer": "Corp com WPA Enterprise/EAP-TLS, VLAN corporativa, acesso interno por perfil e logs de AP/RADIUS/DHCP/firewall; Guest isolado, internet-only e logs de associação/DHCP/firewall; IoT restrito a destinos necessários com inventário e monitoramento.",
      "explanation": "O exercício força conexão entre nome do SSID, política real e evidência."
    },
    {
      "id": "ex12.7.2",
      "type": "diagnóstico",
      "prompt": "Um cliente conecta no SSID Guest, recebe IP 10.10.110.53, mas Guest deveria usar 10.10.120.0/24. O que você verifica?",
      "expectedAnswer": "Verificar mapeamento SSID-VLAN, atributo RADIUS/role se houver, trunk do AP, escopo DHCP, gateway e logs da controladora.",
      "explanation": "O IP pertence a segmento errado; a hipótese principal é política/mapeamento, não rádio."
    },
    {
      "id": "ex12.7.3",
      "type": "segurança",
      "prompt": "Explique por que uma rede IoT com PSK compartilhado deve ter compensações de segurança.",
      "expectedAnswer": "Porque PSK compartilhado não identifica individualmente cada dispositivo, pode vazar e é difícil de revogar. Compensações incluem VLAN restrita, firewall mínimo, inventário, monitoramento, rotação, DPSK/NAC quando possível e plano de substituição.",
      "explanation": "Legado pode ser inevitável, mas exceção sem controle vira risco permanente."
    },
    {
      "id": "ex12.7.4",
      "type": "operação",
      "prompt": "Monte uma lista de cinco evidências para provar que Guest está isolado da rede interna.",
      "expectedAnswer": "IP e VLAN do cliente guest; regra de firewall negando RFC1918 interno; teste de acesso negado a rede interna; logs do firewall mostrando bloqueio; logs da controladora associando cliente ao SSID/BSSID correto.",
      "explanation": "Segurança precisa de prova operacional, não apenas intenção de configuração."
    }
  ],
  "challenge": {
    "title": "Projetar Wi-Fi corporativo seguro para matriz e filial",
    "scenario": "Uma empresa tem matriz com 120 funcionários, uma filial com 25 pessoas, visitantes frequentes e 80 dispositivos IoT. O Wi-Fi atual usa uma senha única. A diretoria quer reduzir chamados, segurança quer rastreabilidade e infraestrutura quer operação simples.",
    "tasks": [
      "Propor SSIDs ou políticas equivalentes.",
      "Definir autenticação por perfil.",
      "Mapear VLANs e sub-redes.",
      "Criar matriz de firewall mínima.",
      "Definir logs e evidências de troubleshooting.",
      "Explicar plano de migração sem derrubar todos os usuários."
    ],
    "constraints": [
      "Não criar mais de quatro SSIDs.",
      "Guest não pode acessar redes internas.",
      "IoT só pode falar com serviços aprovados.",
      "Rede corporativa deve migrar para autenticação por identidade/certificado.",
      "Filial precisa continuar com internet local mesmo se VPN para matriz cair."
    ],
    "expectedDeliverables": [
      "Diagrama lógico.",
      "Tabela SSID/VLAN/autenticação/política.",
      "Plano de logs.",
      "Checklist de validação.",
      "Riscos residuais e plano de mitigação."
    ],
    "gradingRubric": [
      {
        "criterion": "Segmentação",
        "points": 25,
        "description": "Perfis de risco separados e políticas coerentes."
      },
      {
        "criterion": "Autenticação",
        "points": 20,
        "description": "Métodos adequados para Corp, Guest, IoT e Ops."
      },
      {
        "criterion": "Operação",
        "points": 20,
        "description": "Troubleshooting, logs, donos e mudança controlada."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Menor privilégio, isolamento guest, controle IoT e gestão protegida."
      },
      {
        "criterion": "Viabilidade",
        "points": 10,
        "description": "Plano realista para matriz, filial, compatibilidade e custo."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro separamos perfis de risco, depois escolhemos autenticação adequada, depois mapeamos segmentos, e só então definimos firewall, logs e validação. A arquitetura não deve começar pelo nome do SSID, mas pelo que cada grupo precisa acessar.",
    "steps": [
      "Identificar grupos: funcionários, visitantes, IoT e operação.",
      "Escolher autenticação: Corp com EAP-TLS, Guest com portal/OWE/temporário, IoT com DPSK/NAC/PSK por grupo, Ops restrito.",
      "Definir VLANs e sub-redes separadas.",
      "Aplicar firewall deny-by-default entre segmentos.",
      "Permitir Guest apenas para internet e DNS definido.",
      "Permitir IoT apenas para destinos aprovados.",
      "Enviar logs de AP/controladora/RADIUS/DHCP/firewall/SIEM.",
      "Migrar por piloto, medir falhas e expandir por grupos."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Usar um único SSID com senha forte para todos.",
        "whyItIsWrong": "Senha forte não resolve identidade, revogação, segmentação, logs nem menor privilégio."
      },
      {
        "answer": "Criar dez SSIDs para cada departamento.",
        "whyItIsWrong": "Aumenta complexidade e airtime; política deve ser resolvida por identidade/roles quando possível."
      },
      {
        "answer": "Colocar Guest em VLAN separada mas liberar any-any no firewall.",
        "whyItIsWrong": "A VLAN existe, mas o controle de comunicação falhou; isso não isola visitantes."
      },
      {
        "answer": "Deixar IoT na rede corporativa porque é mais fácil.",
        "whyItIsWrong": "Dispositivos IoT frequentemente têm suporte limitado e ampliam risco lateral."
      }
    ],
    "finalAnswer": "Uma solução sólida usa poucos SSIDs bem governados: Corp com WPA Enterprise/EAP-TLS e política por grupo; Guest isolado com internet-only; IoT restrito com inventário e firewall mínimo; Ops separado para administração. Cada SSID tem VLAN, DHCP, DNS, gateway, regras, logs e validação. A migração começa por piloto, mede autenticação e suporte, corrige exceções e só depois remove a senha compartilhada antiga."
  },
  "glossary": [
    {
      "term": "Access Point",
      "shortDefinition": "Equipamento que fornece acesso Wi-Fi aos clientes.",
      "longDefinition": "Um AP anuncia SSIDs, cria BSSIDs, gerencia associação de clientes e conecta o tráfego wireless à rede cabeada ou a uma controladora.",
      "example": "Um AP de escritório anuncia Corp e Guest e envia tráfego para VLANs diferentes.",
      "relatedTerms": [
        "SSID",
        "BSSID",
        "WLAN"
      ],
      "relatedLessons": [
        "12.1",
        "12.4",
        "12.7"
      ]
    },
    {
      "term": "Controladora WLAN",
      "shortDefinition": "Sistema que centraliza gestão, política e telemetria de APs.",
      "longDefinition": "Pode ser física, virtual ou cloud-managed. Ajuda a padronizar SSIDs, RF, roaming, autenticação, logs e configuração por site.",
      "example": "Uma controladora aplica o perfil Corp a todos os APs da matriz.",
      "relatedTerms": [
        "AP",
        "CAPWAP",
        "cloud-managed WLAN"
      ],
      "relatedLessons": [
        "12.6",
        "12.7"
      ]
    },
    {
      "term": "SSID-to-VLAN mapping",
      "shortDefinition": "Mapeamento que define em qual VLAN o tráfego de um SSID será colocado.",
      "longDefinition": "Permite que diferentes redes wireless caiam em segmentos distintos, desde que switch, gateway, DHCP e firewall estejam coerentes.",
      "example": "SSID Guest marcado para VLAN 120 e bloqueado contra redes internas.",
      "relatedTerms": [
        "SSID",
        "VLAN",
        "trunk"
      ],
      "relatedLessons": [
        "12.4",
        "12.7"
      ]
    },
    {
      "term": "Rede guest",
      "shortDefinition": "Rede destinada a visitantes, normalmente isolada da rede interna.",
      "longDefinition": "Deve possuir segmentação real, política de firewall, controle de tempo/acesso, DNS adequado e logs mínimos.",
      "example": "Visitante acessa internet, mas não consegue alcançar servidores 10.0.0.0/8.",
      "relatedTerms": [
        "VLAN",
        "firewall",
        "captive portal"
      ],
      "relatedLessons": [
        "12.7",
        "13.2"
      ]
    },
    {
      "term": "NAC",
      "shortDefinition": "Controle de acesso à rede baseado em identidade, dispositivo, postura ou política.",
      "longDefinition": "Pode integrar RADIUS, 802.1X, certificados, grupos e atributos para decidir se um cliente entra, em qual VLAN/role e com quais permissões.",
      "example": "Notebook corporativo com certificado válido entra na VLAN Corp; dispositivo desconhecido vai para quarentena.",
      "relatedTerms": [
        "RADIUS",
        "802.1X",
        "IAM"
      ],
      "relatedLessons": [
        "12.5",
        "12.7"
      ]
    },
    {
      "term": "Plano de gestão",
      "shortDefinition": "Rede e controles usados para administrar APs, controladoras e infraestrutura.",
      "longDefinition": "Deve ser separado dos clientes, protegido por ACL, MFA/RBAC e monitorado com logs administrativos.",
      "example": "APs usam VLAN 100 de gestão, acessível apenas por estações administrativas.",
      "relatedTerms": [
        "controladora",
        "RBAC",
        "SIEM"
      ],
      "relatedLessons": [
        "12.7",
        "13.3"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Cisco Catalyst 9800 Series Configuration Best Practices",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/technical-reference/c9800-best-practices.html",
      "note": "Usado para validar conceitos de controladora, perfis, tags e melhores práticas de infraestrutura WLAN."
    },
    {
      "type": "official-doc",
      "title": "VLAN Tagging on MR Access Points",
      "organization": "Cisco Meraki",
      "url": "https://documentation.meraki.com/Wireless/Design_and_Configure/Configuration_Guides/Client_Addressing_and_Bridging/VLAN_Tagging_on_MR_Access_Points",
      "note": "Usado para validar mapeamento SSID/VLAN em APs MR."
    },
    {
      "type": "official-doc",
      "title": "Configure VLANs on Wireless LAN Controllers",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/wireless-mobility/wireless-vlan/68100-wlan-controllers-vlans.html",
      "note": "Usado para validar relação entre WLC, AP, VLAN e infraestrutura cabeada."
    },
    {
      "type": "official-doc",
      "title": "Guidelines for Securing Wireless Local Area Networks (WLANs) - SP 800-153",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/153/final",
      "note": "Usado para validar recomendações de configuração, monitoramento e segurança WLAN."
    },
    {
      "type": "internal-course",
      "title": "Firewalls, ACLs, WAF e Políticas de Tráfego",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m09",
      "note": "Pré-requisito para entender que VLAN sem firewall não equivale a controle de acesso."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "internal://enterprise-identity-iam",
      "note": "Referência cruzada para IAM, RADIUS, certificados, identidade e NAC."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "APs se conectam à rede cabeada por switches, trunks, VLANs e endereçamento MAC."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "A segmentação wireless só vira segurança real quando firewall e ACLs aplicam política entre zonas."
    },
    {
      "course": "Redes e Network",
      "module": "m10",
      "lesson": "10.x",
      "reason": "Arquiteturas guest, ZTNA e acesso remoto compartilham princípios de menor privilégio e identidade."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Automação e IaC",
      "lesson": "automação de infraestrutura",
      "reason": "Templates de SSID, VLAN, políticas e validação podem ser versionados e automatizados."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação corporativa",
      "lesson": "802.1X/RADIUS/IAM",
      "reason": "WPA Enterprise depende de identidade, certificados, grupos e autorização dinâmica."
    }
  ],
  "pedagogicalMap": {
    "problem": "Múltiplos grupos usam o mesmo meio sem fio, mas não podem ter o mesmo acesso.",
    "concept": "Arquitetura Wi-Fi corporativa integra APs, controladora, SSIDs, VLANs, autenticação, firewall e logs.",
    "internalMechanism": "Cliente associa a um BSSID, autentica, recebe política/VLAN, obtém IP e atravessa firewall conforme regras.",
    "realUse": "Projetar Corp, Guest, IoT e Ops com autenticação, segmentação e troubleshooting.",
    "commonMistake": "Achar que SSID diferente significa isolamento real.",
    "securityImpact": "Reduz movimento lateral quando há VLANs, firewall, identidade e monitoramento; cria falsa segurança quando há apenas nomes diferentes.",
    "operationalImpact": "Melhora suporte e auditoria, mas exige documentação, logs, change management e validação contínua.",
    "summary": "Wi-Fi corporativo é borda de acesso governada, não apenas cobertura de rádio."
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
      "12.8"
    ]
  }
};
