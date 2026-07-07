export const lesson0708 = {
  "id": "7.8",
  "moduleId": "m07",
  "order": 8,
  "title": "NAT, PAT, publicação de serviços e CGNAT",
  "subtitle": "Entenda como redes privadas acessam redes públicas, como um único IP público pode atender muitos hosts, como serviços internos são publicados com segurança e por que NAT nunca deve ser confundido com firewall.",
  "duration": "130-190 min",
  "estimatedStudyTimeMinutes": 190,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 290,
  "tags": [
    "redes",
    "nat",
    "pat",
    "port forwarding",
    "publicação de serviços",
    "hairpin nat",
    "cgnat",
    "egress nat",
    "ipv4 privado",
    "firewall",
    "cloud networking",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "title": "IPv4 público, privado, loopback e APIPA",
      "reason": "NAT existe principalmente porque hosts privados precisam se comunicar com redes externas usando endereços públicos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "PAT diferencia conexões simultâneas usando protocolo, IP e porta de origem/destino."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "NAT não substitui roteamento: o pacote ainda precisa chegar ao dispositivo que fará a tradução."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "O módulo de transporte já apresentou NAT/PAT e rastreamento de conexão como base para firewalls stateful."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.1",
      "title": "Por que DNS existe",
      "reason": "Publicação de serviços quase sempre combina DNS público/privado com NAT ou alternativas modernas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.6",
      "title": "DHCP profundo e integração com DNS",
      "reason": "Ambientes pequenos usam DHCP para entregar gateway/DNS e o gateway normalmente é também o ponto de NAT."
    }
  ],
  "objectives": [
    "Explicar por que NAT surgiu e qual problema de escassez/integração de IPv4 ele ajudou a contornar.",
    "Diferenciar NAT estático, NAT dinâmico, PAT/overload, egress NAT, destination NAT, port forwarding, hairpin NAT e CGNAT.",
    "Explicar a tabela de tradução NAT usando inside local, inside global, outside local e outside global.",
    "Entender por que NAT não é firewall, não autentica usuários e não substitui política de acesso.",
    "Desenhar publicação segura de serviços internos usando NAT, DNS, firewall, logs e segmentação.",
    "Diagnosticar falhas comuns: sem tradução, rota assimétrica, porta errada, CGNAT, DNS apontando errado, hairpin ausente e timeout de sessão.",
    "Relacionar NAT com cloud, Kubernetes, pipelines, custos de NAT Gateway, egress control e arquitetura Zero Trust."
  ],
  "learningOutcomes": [
    "Dado um cenário de LAN privada acessando Internet, o aluno identifica onde ocorre SNAT/PAT e que campos do pacote mudam.",
    "Dado um serviço interno publicado por porta, o aluno diferencia DNS, firewall, DNAT/port forwarding e aplicação escutando.",
    "Dado um problema em que usuários internos não acessam o nome público de um serviço interno, o aluno reconhece hairpin NAT ou split DNS como hipótese.",
    "Dado um ambiente cloud, o aluno identifica custos e riscos de NAT Gateway, egress centralizado e logs insuficientes.",
    "Dado um desenho de segurança, o aluno explica por que NAT deve ser acompanhado por firewall, autenticação, exposição mínima e observabilidade."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Imagine uma empresa pequena com cem computadores usando endereços privados, como <code>192.168.10.0/24</code>. Esses computadores precisam atualizar sistemas, acessar SaaS, consultar APIs, enviar logs para serviços externos e consumir repositórios de pacotes. Agora imagine que a empresa tem apenas um endereço IPv4 público disponível no link de Internet. Como cem máquinas conseguem sair para a Internet usando um único endereço público?</p><p>Esse é o primeiro problema que NAT ajuda a resolver: permitir que endereços privados sejam traduzidos para endereços roteáveis quando o tráfego atravessa uma fronteira de rede. Mas o mesmo mecanismo aparece em outro problema comum: uma aplicação interna precisa ser acessada de fora. Nesse caso, a tradução ocorre no sentido oposto, encaminhando uma conexão destinada a um IP/porta pública para um servidor privado.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> uma equipe publica um painel interno usando port forwarding no roteador. O DNS público aponta para o IP da empresa. De fora funciona. De dentro da rede, o mesmo nome falha. O time culpa o DNS, depois culpa o firewall, mas o problema real pode ser ausência de hairpin NAT ou necessidade de split DNS.</div><p>NAT é tão comum que muitos profissionais passam anos usando sem entender. Isso cria diagnósticos ruins: achar que NAT é firewall, abrir porta sem validar aplicação, publicar serviço sem logs, culpar DNS quando o problema é tradução, culpar cloud quando o problema é egress NAT, ou assumir que CGNAT permite hospedar serviços. Esta aula corrige essa lacuna porque NAT/PAT é base para firewall, VPN, cloud networking, troubleshooting, Zero Trust e segurança defensiva.</p></section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2><p>O IPv4 nasceu em uma época na qual a quantidade de dispositivos conectados parecia administrável. Com o crescimento da Internet comercial, ficou claro que endereços IPv4 públicos seriam insuficientes para cada estação, impressora, servidor, roteador doméstico, dispositivo móvel e equipamento industrial do planeta.</p><p>Duas ideias se tornaram fundamentais. A primeira foi reservar blocos privados, como <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code> e <code>192.168.0.0/16</code>, para uso interno em organizações. Esses endereços não são roteados diretamente na Internet pública. A segunda foi criar mecanismos de tradução na borda, permitindo que muitos endereços privados compartilhassem menos endereços públicos.</p><p>NAT também surgiu em ambientes corporativos para facilitar renumeração, fusões de empresas, sobreposição de endereços privados, publicação controlada de serviços e integração entre redes que não podiam ser roteadas diretamente. Depois, provedores passaram a usar CGNAT para compartilhar endereços públicos entre vários clientes, o que reduz pressão sobre IPv4, mas cria limitações fortes para hospedagem de serviços, jogos, VPNs, VoIP e conexões inbound.</p><p>O avanço natural de longo prazo é IPv6, que reduz a necessidade de NAT por escassez de endereços. Mesmo assim, NAT continua existindo em redes IPv4, clouds, firewalls, roteadores domésticos, clusters, labs, provedores e arquiteturas híbridas. Por isso, entender NAT ainda é essencial para operar redes modernas.</p></section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2><p>O problema central é que o endereço usado dentro de uma rede nem sempre pode ou deve ser o endereço usado fora dela. Um host interno pode ter um IP privado não roteável na Internet. Um servidor interno pode estar protegido atrás de uma borda. Duas empresas podem usar o mesmo bloco privado e precisar se conectar por VPN. Um cluster Kubernetes pode ter pods com endereços internos que precisam sair para a Internet. Uma cloud pode exigir NAT Gateway para sub-redes privadas consumirem atualizações sem receber conexões inbound.</p><p>Sem NAT, haveria algumas alternativas: dar IP público para cada host, usar proxy explícito para tudo, adotar IPv6 fim a fim, criar roteamento público para todos os segmentos, ou impedir saída direta. Cada alternativa tem custo, complexidade, exposição e limitações. NAT surgiu como uma solução prática, não perfeita, para atravessar fronteiras entre domínios de endereçamento.</p><ul><li><strong>Escassez:</strong> muitos hosts privados precisam usar poucos IPs públicos.</li><li><strong>Publicação:</strong> um serviço privado precisa receber conexões por um endereço público.</li><li><strong>Sobreposição:</strong> redes diferentes usam o mesmo bloco privado e precisam conversar.</li><li><strong>Controle operacional:</strong> sub-redes privadas em cloud precisam sair para atualizações sem ficarem diretamente expostas.</li><li><strong>Diagnóstico:</strong> o IP visto pelo servidor remoto não é o IP real do host interno.</li></ul><div class=\"callout callout--warning\"><strong>Atenção:</strong> NAT altera endereços e, em PAT, portas. Firewall decide permitir ou negar. Autenticação identifica entidades. Criptografia protege conteúdo. NAT não faz essas coisas sozinho.</div></section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2><p>A evolução de NAT acompanha a evolução das redes IPv4. Primeiro, a tradução simples de um endereço interno para um externo resolvia cenários pequenos. Depois, PAT permitiu que milhares de conexões compartilhassem um único IP público mudando portas de origem. Em seguida, firewalls e roteadores passaram a combinar NAT com estado de conexão, logs, políticas e publicação de serviços.</p><table class=\"comparison-table\"><thead><tr><th>Abordagem</th><th>Como funciona</th><th>Resolve</th><th>Limitação</th></tr></thead><tbody><tr><td>NAT estático</td><td>Mapeia um IP privado para um IP público fixo.</td><td>Publicação previsível e tradução 1:1.</td><td>Consome IP público para cada host publicado.</td></tr><tr><td>NAT dinâmico</td><td>Usa um pool de IPs públicos para hosts internos.</td><td>Saída para vários hosts com pool limitado.</td><td>Sem portas, ainda depende da quantidade de IPs do pool.</td></tr><tr><td>PAT/overload</td><td>Muitos hosts compartilham um IP público usando portas diferentes.</td><td>Saída de muitos clientes com um único IP.</td><td>Pode esgotar portas, dificultar rastreabilidade e quebrar protocolos sensíveis.</td></tr><tr><td>DNAT/port forwarding</td><td>Traduz destino público/porta para servidor privado/porta.</td><td>Publicar serviço interno.</td><td>Exige firewall, hardening, logs e cuidado com exposição.</td></tr><tr><td>Hairpin NAT</td><td>Cliente interno acessa o IP público e retorna para servidor interno.</td><td>Mesmo nome público funcionando dentro e fora.</td><td>Nem todo roteador suporta; split DNS pode ser melhor.</td></tr><tr><td>CGNAT</td><td>Provedor traduz múltiplos clientes atrás de IPs públicos compartilhados.</td><td>Economia de IPv4 em escala de operadora.</td><td>Dificulta conexões inbound, auditoria, jogos, VPNs e publicação doméstica.</td></tr><tr><td>IPv6 fim a fim</td><td>Hosts recebem endereços globais e usam firewall para política.</td><td>Reduz necessidade de NAT por escassez.</td><td>Exige maturidade de segurança, roteamento e operação IPv6.</td></tr></tbody></table></section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2><p>NAT, Network Address Translation, é o mecanismo pelo qual um dispositivo de rede altera endereço IP de origem ou destino de um pacote quando ele atravessa uma fronteira. PAT, Port Address Translation, é a forma mais comum em redes de acesso à Internet: além do IP, o dispositivo altera a porta de origem para distinguir várias conexões simultâneas usando o mesmo IP público.</p><div class=\"definition-box\"><strong>Definição:</strong> NAT traduz endereços entre domínios de rede. PAT traduz endereços e portas para multiplexar muitas conversas em um ou poucos endereços. Port forwarding/DNAT traduz o destino para publicar serviços internos. SNAT traduz a origem para permitir saída. Nenhum desses mecanismos substitui firewall, autenticação, criptografia ou autorização.</div><p>Em terminologia clássica de NAT, quatro ideias ajudam muito:</p><ul><li><strong>Inside local:</strong> endereço real do host interno, por exemplo <code>192.168.10.50</code>.</li><li><strong>Inside global:</strong> endereço pelo qual esse host aparece externamente, por exemplo <code>203.0.113.10:49152</code>.</li><li><strong>Outside global:</strong> endereço real do destino externo, por exemplo <code>198.51.100.20:443</code>.</li><li><strong>Outside local:</strong> forma como o destino externo é representado dentro da rede, normalmente igual ao outside global em cenários simples.</li></ul></section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2><p>Quando um host interno acessa um servidor externo, ele cria um pacote com origem privada e destino público. O roteador/firewall de borda recebe esse pacote na interface interna. Se houver regra de NAT, ele substitui o endereço de origem privado por um endereço público e, em PAT, escolhe uma porta de origem disponível. Depois registra essa associação em uma tabela de tradução.</p><ol class=\"flow-list\"><li><strong>Host cria conexão:</strong> <code>192.168.10.50:51514 → 198.51.100.20:443</code>.</li><li><strong>Gateway recebe:</strong> identifica que a origem pertence à rede interna e o destino está fora.</li><li><strong>Regra de SNAT/PAT aplica:</strong> troca para <code>203.0.113.10:40001 → 198.51.100.20:443</code>.</li><li><strong>Tabela de tradução é criada:</strong> protocolo, IP interno, porta interna, IP público, porta pública, destino e timeout.</li><li><strong>Servidor externo responde:</strong> <code>198.51.100.20:443 → 203.0.113.10:40001</code>.</li><li><strong>Gateway consulta tabela:</strong> encontra a associação e reverte para <code>198.51.100.20:443 → 192.168.10.50:51514</code>.</li><li><strong>Host interno recebe:</strong> para ele, a conversa parece direta com o servidor externo.</li></ol><p>Em DNAT/port forwarding, a tradução principal ocorre no destino. Um cliente externo acessa <code>203.0.113.10:8443</code>. O firewall traduz para <code>192.168.10.20:443</code>. A resposta precisa voltar pelo mesmo dispositivo, caso contrário ocorre rota assimétrica: o servidor responde por outro caminho, a tabela de estado não reconhece o fluxo e a conexão falha.</p><p>NAT depende de estado, timeout e simetria. UDP costuma ter timeout menor. TCP pode manter estado enquanto a sessão está ativa. Conexões longas podem quebrar se dispositivos intermediários descartarem tradução por inatividade. Protocolos que carregam IP/porta dentro do payload podem exigir helpers, ALGs ou configuração específica; por isso VPN, VoIP, FTP ativo e alguns jogos historicamente tiveram problemas com NAT.</p></section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2><p>NAT aparece em fronteiras. Em casa, fica no roteador Wi-Fi. Em empresas, costuma ficar no firewall de borda, no roteador de Internet, em appliances de segurança, em balanceadores ou em gateways cloud. Em cloud, NAT Gateway permite que sub-redes privadas saiam para Internet sem receber conexões inbound diretamente.</p><ul><li><strong>Camada envolvida:</strong> principalmente camada 3 e camada 4, porque altera IPs e portas.</li><li><strong>Componentes envolvidos:</strong> host, gateway, tabela NAT, tabela de rotas, regra de firewall, DNS, servidor publicado e logs.</li><li><strong>Dependências:</strong> rota default, interface inside/outside, regra NAT correta, política de firewall e caminho de retorno simétrico.</li><li><strong>Pontos de falha:</strong> pool esgotado, porta não liberada, DNS apontando para IP errado, servidor sem gateway correto, CGNAT, ausência de hairpin, rota assimétrica, timeout de sessão ou falta de logs.</li></ul><p>Uma arquitetura madura separa NAT de política. Primeiro decide se o caminho deve existir. Depois define a tradução. Em seguida aplica firewall mínimo necessário. Por fim, registra evidências: quem acessou, de onde, quando, para qual serviço e qual tradução ocorreu.</p></section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2><p>Pense em uma empresa com ramais internos. Funcionários ligam para fora usando o número principal da empresa. Para quem recebe a chamada, todos parecem ligar do mesmo número externo, mas a central telefônica sabe qual ramal iniciou cada ligação. Isso lembra PAT: muitos hosts internos saem usando o mesmo IP público, diferenciados por portas.</p><p>Para ligações recebidas, a recepcionista pode encaminhar chamadas do número público para um ramal específico. Isso lembra port forwarding: uma porta pública é encaminhada para um serviço interno.</p><div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> NAT trabalha com pacotes, estados, timeouts, portas, protocolos e rotas. A central telefônica ajuda a visualizar tradução, mas não representa roteamento, firewall, criptografia, DNS, assimetria ou exaustão de portas com precisão.</div></section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--simple-example\"><h2>9. Exemplo simples</h2><p>Em uma rede doméstica, seu notebook usa <code>192.168.0.23</code>. Ao acessar um site HTTPS, o roteador troca a origem para o IP público do link. O site nunca vê <code>192.168.0.23</code>; ele vê o IP público do roteador. Se três dispositivos acessam o mesmo site, o roteador usa portas públicas diferentes para distinguir as respostas.</p><p>Agora suponha que você quer acessar de fora uma câmera ou um servidor de laboratório dentro de casa. Você cria uma regra de port forwarding: conexões para <code>IP_PUBLICO:8443</code> serão encaminhadas para <code>192.168.0.50:443</code>. Isso só funcionará se o provedor não estiver usando CGNAT, se a porta estiver aberta no firewall, se o serviço estiver escutando, se o gateway do servidor estiver correto e se a regra não conflitar com outra publicação.</p></section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2><p>Em uma empresa, NAT aparece em múltiplos desenhos. Usuários internos saem para Internet com PAT. Servidores em DMZ podem ser publicados com NAT estático ou DNAT. Filiais conectadas por VPN podem exigir NAT de sobreposição quando ambas usam <code>10.0.0.0/8</code>. Ambientes de parceiros podem receber acesso somente a um IP traduzido em vez da rede real. Firewalls registram traduções para permitir investigação posterior.</p><p>O erro comum é publicar um serviço interno apenas criando NAT e esquecer o restante da arquitetura. Publicação segura exige pelo menos: DNS correto, firewall allowlist quando possível, TLS válido, autenticação forte, segmentação, logs, atualização do servidor, WAF/proxy quando aplicável e plano de rollback. NAT sozinho apenas faz o pacote chegar; ele não prova que o acesso deveria acontecer.</p><p>Outro cenário empresarial crítico é auditoria. Se mil usuários saem por um único IP público, um log externo aponta apenas para esse IP. Para identificar o host interno, a empresa precisa guardar logs de tradução com horário confiável. Sem NTP e logs de NAT, uma investigação pode perder rastreabilidade.</p></section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2><p>Em cloud, NAT aparece principalmente como saída controlada de sub-redes privadas. Uma VM privada, um nó Kubernetes ou uma função que não possui IP público pode precisar baixar pacotes, chamar APIs externas ou enviar telemetria. Para isso, o tráfego pode passar por NAT Gateway, firewall gerenciado, appliance virtual ou proxy.</p><p>O impacto financeiro é importante. NAT Gateway e tráfego de saída podem gerar custo recorrente por hora, por volume processado e por egress. Uma arquitetura mal desenhada pode centralizar todo tráfego em um único NAT caro, criar gargalo, atravessar zonas desnecessariamente ou gerar cobrança alta de logs. Em ambientes críticos, também é preciso considerar alta disponibilidade: se uma única instância faz NAT e falha, sub-redes privadas perdem saída.</p><p>NAT também aparece em Kubernetes. Pods e nós podem sair para serviços externos usando SNAT. Services do tipo LoadBalancer, Ingress e egress gateways podem mascarar origem. Para segurança, isso exige observabilidade: saber se o IP visto pelo serviço externo representa um pod, um node, um gateway, uma VPC inteira ou uma organização inteira.</p></section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2><p>Em DevSecOps, NAT aparece quando pipelines, runners, clusters e ambientes efêmeros precisam acessar repositórios, registries, APIs de cloud, scanners, SaaS de segurança ou endpoints corporativos. Muitas integrações usam allowlist de IP. Se o pipeline sai por NAT compartilhado, a origem observada pelo SaaS será o IP do gateway, não o IP real do runner.</p><p>Isso cria decisões de arquitetura. Um IP de egress fixo facilita allowlist, mas concentra risco: qualquer workload atrás daquele NAT pode parecer confiável. Uma abordagem melhor combina egress control, identidade de workload, OIDC federation, políticas por destino, secrets mínimos, logs de conexão e revisão de permissões. NAT resolve caminho; identidade resolve quem é o workload.</p><p>Em IaC, regras NAT devem ser tratadas como código revisável. Uma alteração de port forwarding ou egress NAT precisa passar por revisão, teste, aprovação e rollback. Em auditoria, o pull request deve explicar por que a tradução existe, qual serviço depende dela, qual porta, qual origem permitida, qual validade e onde os logs serão coletados.</p></section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2><p>O maior erro de segurança é achar que NAT protege por si só. NAT pode reduzir exposição incidental de hosts internos porque conexões inbound sem mapeamento não têm tradução correspondente. Mas isso não é o mesmo que uma política de firewall. Um firewall entende regras, estado, zonas, logs e decisão explícita. NAT apenas muda endereços e portas segundo regras configuradas.</p><table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>NAT confundido com firewall</td><td>Serviço publicado sem regra mínima, sem autenticação e sem logs.</td><td>Exposição indevida e dificuldade de investigação.</td><td>Firewall deny-by-default, allowlist, autenticação forte, TLS e logging.</td></tr><tr><td>Port forwarding esquecido</td><td>Regra temporária fica ativa meses após teste.</td><td>Superfície de ataque permanente.</td><td>Controle de mudança, validade, revisão periódica e inventário.</td></tr><tr><td>CGNAT desconhecido</td><td>Equipe tenta hospedar serviço em link sem IP público próprio.</td><td>Serviço inacessível de fora ou arquitetura improvisada insegura.</td><td>IP público dedicado, túnel reverso controlado, VPN, ZTNA ou cloud front door.</td></tr><tr><td>Logs sem tradução</td><td>SOC só vê IP público compartilhado.</td><td>Não identifica host interno com confiança.</td><td>Logs de NAT, DHCP, NTP, firewall e correlação no SIEM.</td></tr><tr><td>Hairpin mal resolvido</td><td>Usuários internos acessam IP público para serviço interno.</td><td>Falhas intermitentes, bypass de controles ou rota ineficiente.</td><td>Hairpin NAT documentado ou split DNS com políticas consistentes.</td></tr></tbody></table><p>Em laboratórios, comandos de NAT devem ser usados apenas em ambientes próprios, Packet Tracer, GNS3, lab doméstico autorizado ou cloud controlada. Não faça varreduras, bypasses ou testes em redes de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama SVG</h2><svg class=\"lesson-svg\" viewBox=\"0 0 1100 520\" role=\"img\" aria-labelledby=\"nat-title nat-desc\"><title id=\"nat-title\">Fluxo de NAT, PAT e publicação de serviço</title><desc id=\"nat-desc\">Clientes privados saem para a Internet por PAT e um cliente externo acessa um serviço interno por port forwarding.</desc><defs><marker id=\"arrow-nat\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs><rect x=\"40\" y=\"70\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"135\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">LAN privada</text><text x=\"135\" y=\"132\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.0/24</text><rect x=\"40\" y=\"330\" width=\"190\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\"/><text x=\"135\" y=\"363\" text-anchor=\"middle\" class=\"svg-label\">Servidor interno</text><text x=\"135\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192.168.10.20:443</text><rect x=\"430\" y=\"180\" width=\"230\" height=\"135\" rx=\"18\" class=\"svg-node svg-node--firewall\"/><text x=\"545\" y=\"215\" text-anchor=\"middle\" class=\"svg-label\">Firewall / NAT</text><text x=\"545\" y=\"244\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tabela de tradução</text><text x=\"545\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">203.0.113.10</text><rect x=\"840\" y=\"80\" width=\"210\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--cloud\"/><text x=\"945\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Internet / SaaS</text><text x=\"945\" y=\"142\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">198.51.100.20:443</text><rect x=\"840\" y=\"330\" width=\"210\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\"/><text x=\"945\" y=\"363\" text-anchor=\"middle\" class=\"svg-label\">Cliente externo</text><text x=\"945\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Acessa 203.0.113.10:8443</text><line x1=\"230\" y1=\"115\" x2=\"430\" y2=\"220\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-nat)\"/><line x1=\"660\" y1=\"220\" x2=\"840\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-nat)\"/><text x=\"340\" y=\"115\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SNAT/PAT</text><text x=\"740\" y=\"115\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Origem vira 203.0.113.10:40001</text><line x1=\"840\" y1=\"375\" x2=\"660\" y2=\"285\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-nat)\"/><line x1=\"430\" y1=\"285\" x2=\"230\" y2=\"370\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-nat)\"/><text x=\"735\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNAT/Port forwarding</text><text x=\"340\" y=\"335\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Destino vira 192.168.10.20:443</text><rect x=\"405\" y=\"340\" width=\"280\" height=\"115\" rx=\"14\" class=\"svg-zone\"/><text x=\"545\" y=\"370\" text-anchor=\"middle\" class=\"svg-label\">NAT não é firewall</text><text x=\"545\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Tradução ≠ autorização</text><text x=\"545\" y=\"424\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Use regras, logs, TLS e identidade</text></svg></section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2><p>O laboratório desta aula usa um cenário de Packet Tracer/GNS3 ou roteador Cisco IOS simulado. O objetivo não é decorar comandos, mas enxergar a tabela de tradução, validar saída PAT, publicar um serviço com DNAT/port forwarding e diagnosticar falhas comuns.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2><p>Os exercícios obrigam você a separar quatro coisas que costumam ser confundidas: DNS, rota, NAT e firewall. Em cada cenário, identifique qual peça traduz, qual peça permite, qual peça nomeia e qual peça entrega caminho.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2><p>O desafio simula uma filial com acesso à Internet, um servidor interno publicado e usuários que precisam acessar o mesmo nome tanto de dentro quanto de fora. Você deverá escolher entre hairpin NAT, split DNS e mudanças de arquitetura.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2><p>A solução comentada mostra o raciocínio por camadas: primeiro endereçamento e rota; depois tradução; depois firewall; depois serviço; depois DNS; por fim logs e segurança.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><ul><li><strong>Ideia central:</strong> NAT traduz endereços; PAT traduz endereços e portas; firewall decide política.</li><li><strong>O que lembrar:</strong> saída geralmente usa SNAT/PAT; publicação usa DNAT/port forwarding; hairpin resolve acesso interno ao IP público; CGNAT limita conexões inbound.</li><li><strong>Erro comum:</strong> achar que abrir NAT é suficiente para publicar com segurança.</li><li><strong>Uso real:</strong> Internet corporativa, DMZ, cloud NAT Gateway, Kubernetes e allowlist de egress em SaaS.</li><li><strong>Diagnóstico:</strong> valide rota, tabela NAT, regra de firewall, serviço escutando, DNS, caminho de retorno e logs.</li></ul></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2><p>Depois de entender NAT/PAT, o próximo passo é proteger os serviços essenciais de rede. A próxima aula revisa DNS, DHCP, NAT, NTP e logs pela lente defensiva: quais abusos são comuns, quais evidências coletar e como desenhar controles sem confundir conectividade com autorização.</p></section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação como dependência indireta"
    ],
    "relatedProtocols": [
      "IPv4",
      "TCP",
      "UDP",
      "ICMP",
      "DNS",
      "DHCP",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "endereçamento IPv4",
      "rotas",
      "portas TCP/UDP",
      "gateway padrão",
      "firewall stateful"
    ],
    "enables": [
      "egress control",
      "publicação de serviços",
      "sub-redes privadas em cloud",
      "DMZ",
      "integração entre redes sobrepostas"
    ]
  },
  "protocolFields": [
    {
      "field": "Protocolo",
      "size": "8 bits no IPv4",
      "purpose": "Diferenciar TCP, UDP, ICMP e outros protocolos na tradução.",
      "securityObservation": "Logs devem registrar protocolo para evitar ambiguidade em investigações."
    },
    {
      "field": "Source IP",
      "size": "32 bits",
      "purpose": "Endereço de origem que pode ser traduzido em SNAT/PAT.",
      "securityObservation": "Depois do NAT, o destino remoto vê o IP traduzido, não o host real."
    },
    {
      "field": "Source Port",
      "size": "16 bits em TCP/UDP",
      "purpose": "Porta de origem que pode ser alterada em PAT para multiplexar conexões.",
      "securityObservation": "Exaustão de portas pode causar falhas intermitentes em ambientes grandes."
    },
    {
      "field": "Destination IP",
      "size": "32 bits",
      "purpose": "Endereço de destino que pode ser traduzido em DNAT/port forwarding.",
      "securityObservation": "Publicação indevida expõe serviços internos."
    },
    {
      "field": "Destination Port",
      "size": "16 bits em TCP/UDP",
      "purpose": "Porta de serviço usada em regras de DNAT e firewall.",
      "securityObservation": "Porta aberta não significa serviço seguro ou autorizado."
    },
    {
      "field": "Timeout/estado",
      "size": "implementação",
      "purpose": "Controlar quanto tempo a tradução permanece válida.",
      "securityObservation": "Timeouts ruins podem derrubar sessões legítimas ou manter estado além do necessário."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente privado",
      "action": "Envia pacote para destino externo",
      "detail": "Origem 192.168.10.50:51514, destino 198.51.100.20:443.",
      "possibleFailure": "Gateway padrão ausente ou rota incorreta impede chegada ao dispositivo NAT."
    },
    {
      "step": 2,
      "actor": "Firewall/NAT",
      "action": "Aplica política e tradução de saída",
      "detail": "Cria entrada PAT 192.168.10.50:51514 ↔ 203.0.113.10:40001.",
      "possibleFailure": "ACL de NAT não inclui a sub-rede ou pool está esgotado."
    },
    {
      "step": 3,
      "actor": "Servidor externo",
      "action": "Responde para o IP público traduzido",
      "detail": "Resposta chega em 203.0.113.10:40001.",
      "possibleFailure": "Rota externa ou firewall de borda bloqueia retorno."
    },
    {
      "step": 4,
      "actor": "Firewall/NAT",
      "action": "Consulta tabela e desfaz tradução",
      "detail": "Entrega resposta para 192.168.10.50:51514.",
      "possibleFailure": "Estado expirado, retorno por outro caminho ou porta diferente quebra sessão."
    },
    {
      "step": 5,
      "actor": "Cliente interno",
      "action": "Recebe resposta como se falasse diretamente com o destino",
      "detail": "A aplicação não vê o IP público usado na borda.",
      "possibleFailure": "Aplicações que carregam IP no payload podem exigir tratamento específico."
    }
  ],
  "deepDive": {
    "mentalModel": "NAT é uma tabela de tradução em uma fronteira de rede. Ela precisa saber de onde veio, para onde vai, qual protocolo/porta identifica a conversa, como reverter a tradução no retorno e quando apagar o estado.",
    "keyTerms": [
      "SNAT",
      "DNAT",
      "PAT",
      "overload",
      "port forwarding",
      "hairpin NAT",
      "CGNAT",
      "inside local",
      "inside global",
      "stateful firewall",
      "egress"
    ],
    "limitations": [
      "Não autentica usuários ou workloads.",
      "Não substitui firewall, WAF, proxy ou controle de identidade.",
      "Dificulta rastreabilidade sem logs de tradução.",
      "Pode quebrar protocolos que embutem IP/porta no payload.",
      "Pode causar exaustão de portas em ambientes de alta escala.",
      "Pode esconder topologia real e dificultar troubleshooting.",
      "CGNAT pode impedir conexões inbound e publicação direta."
    ],
    "whenToUse": [
      "Permitir que redes IPv4 privadas acessem redes externas.",
      "Publicar serviço interno de forma controlada e temporária quando arquiteturas melhores não estiverem disponíveis.",
      "Dar saída a sub-redes privadas em cloud por um ponto controlado.",
      "Resolver sobreposição de endereços em integrações, VPNs ou fusões.",
      "Criar IP de egress fixo para integrações que exigem allowlist, acompanhado de identidade e logs."
    ],
    "whenNotToUse": [
      "Como substituto de firewall ou autenticação.",
      "Para expor serviços críticos sem proxy, TLS, hardening e logs.",
      "Quando IPv6 fim a fim com firewall adequado é a arquitetura correta.",
      "Para mascarar problemas de endereçamento que deveriam ser corrigidos.",
      "Como solução improvisada para bypass de política corporativa."
    ],
    "operationalImpact": [
      "Exige documentação de regras, propósito, dono, validade e rollback.",
      "Muda troubleshooting porque IP observado por terceiros pode não ser o IP real do host.",
      "Exige logs de tradução com horário confiável para investigação.",
      "Cria dependência crítica na borda; falha no NAT pode derrubar saída de sub-redes inteiras.",
      "Pode exigir alta disponibilidade, monitoramento de tabela e capacidade de portas."
    ],
    "financialImpact": [
      "Em cloud, NAT Gateway pode gerar custo por hora e por volume processado.",
      "Egress de dados pode ser cobrado separadamente e crescer com arquiteturas centralizadas.",
      "Firewalls gerenciados, appliances e logs podem aumentar custo recorrente.",
      "Alternativas como proxy, private endpoint, service endpoint ou IPv6 podem reduzir custo em alguns cenários.",
      "Publicação indevida pode gerar custo de incidente, exposição e resposta."
    ],
    "securityImpact": [
      "Reduz exposição incidental, mas não define autorização.",
      "Pode concentrar risco em um IP de egress considerado confiável por terceiros.",
      "Sem logs, dificulta atribuição interna de ações.",
      "Port forwarding aumenta superfície de ataque.",
      "Hairpin NAT e split DNS mal planejados podem criar caminhos inconsistentes e bypass de inspeção."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que NAT é firewall.",
      "whyItHappens": "Em redes domésticas, conexões inbound sem mapeamento geralmente não funcionam, parecendo bloqueio de segurança.",
      "consequence": "Serviços são publicados sem política, autenticação e logs adequados.",
      "correction": "Trate NAT como tradução. Use firewall, autenticação, TLS, segmentação e monitoramento como controles separados."
    },
    {
      "mistake": "Criar port forwarding sem validar se o serviço está escutando.",
      "whyItHappens": "A equipe foca no roteador/firewall e esquece a aplicação.",
      "consequence": "A porta parece aberta na borda, mas a conexão falha ou expõe serviço errado.",
      "correction": "Valide com ss/netstat, Test-NetConnection, curl e logs da aplicação."
    },
    {
      "mistake": "Ignorar CGNAT do provedor.",
      "whyItHappens": "O usuário vê um IP WAN no roteador, mas não compara com o IP público visto externamente.",
      "consequence": "Publicação de serviço nunca funciona de fora.",
      "correction": "Compare WAN do roteador com serviço de IP externo; solicite IP público, use VPN/ztna/cloud ou túnel reverso autorizado."
    },
    {
      "mistake": "Não registrar logs de tradução.",
      "whyItHappens": "Logs de firewall são ativados, mas logs de NAT/DHCP/NTP não são correlacionados.",
      "consequence": "O SOC não consegue mapear IP público/porta para host interno em um horário específico.",
      "correction": "Enviar logs de NAT, firewall, DHCP e NTP para SIEM com retenção adequada."
    },
    {
      "mistake": "Usar hairpin NAT quando split DNS seria mais simples.",
      "whyItHappens": "A equipe quer que o mesmo FQDN público funcione dentro e fora sem revisar arquitetura DNS.",
      "consequence": "Tráfego interno dá volta pela borda, quebra ou passa por caminho inesperado.",
      "correction": "Avalie split DNS, DNS interno, proxy reverso ou hairpin documentado com logs."
    },
    {
      "mistake": "Esquecer rota de retorno.",
      "whyItHappens": "A regra de DNAT recebe atenção, mas o gateway do servidor interno aponta para outro caminho.",
      "consequence": "SYN chega, SYN/ACK volta por outro dispositivo e a sessão falha.",
      "correction": "Garanta simetria de caminho ou ajuste roteamento/políticas de forma controlada."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Hosts internos não acessam Internet, mas pingam gateway.",
      "Acesso externo ao serviço publicado falha ou conecta no serviço errado.",
      "De fora funciona, de dentro usando o nome público falha.",
      "Logs externos mostram apenas IP público compartilhado.",
      "Conexões UDP caem depois de alguns minutos.",
      "Aplicação funciona por IP privado, mas não por FQDN público.",
      "Publicação doméstica não funciona porque o link está atrás de CGNAT."
    ],
    "diagnosticQuestions": [
      "O tráfego chega ao dispositivo que faz NAT?",
      "A interface inside/outside está correta?",
      "A ACL/regra de NAT inclui a origem correta?",
      "Existe rota default antes e depois da tradução?",
      "A regra de firewall permite o fluxo traduzido?",
      "O serviço interno está escutando na porta esperada?",
      "O retorno passa pelo mesmo firewall/NAT?",
      "O DNS interno e externo apontam para qual IP?",
      "O provedor usa CGNAT?",
      "Há logs com horário sincronizado para correlacionar IP/porta?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\nroute print\nTest-NetConnection exemplo.com -Port 443\nTest-NetConnection IP_PUBLICO -Port 8443",
        "purpose": "Validar IP, gateway, DNS, rota e conexão TCP até serviço externo ou publicação.",
        "expectedObservation": "Gateway presente, rota default correta e teste TCP com TcpTestSucceeded True quando permitido.",
        "interpretation": "Se gateway/DNS estão corretos mas a porta falha, investigue NAT/firewall/aplicação."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\nss -tulpen\ncurl -vk https://IP_OU_NOME:PORTA\ntraceroute 198.51.100.20",
        "purpose": "Validar endereçamento, rota, serviço escutando, handshake TLS e caminho.",
        "expectedObservation": "Rota default aponta para gateway correto; serviço escuta na porta esperada; curl mostra conexão ou erro específico.",
        "interpretation": "Se o serviço não escuta, NAT não corrige. Se escuta localmente mas falha de fora, verifique DNAT/firewall/retorno."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip nat translations\nshow ip nat statistics\nshow access-lists\nshow ip interface brief\nshow running-config | include ip nat",
        "purpose": "Ver traduções ativas, estatísticas, ACLs de NAT, interfaces inside/outside e configuração.",
        "expectedObservation": "Entradas inside local/inside global aparecem durante testes; contadores aumentam.",
        "interpretation": "Sem traduções durante o teste indica regra, ACL, interface ou rota errada."
      },
      {
        "platform": "Firewall/Cloud",
        "command": "Consultar flow logs, NAT gateway metrics, connection logs e regras de security group/firewall",
        "purpose": "Correlacionar tradução, política, origem, destino, porta e decisão.",
        "expectedObservation": "Evento permite mapear origem privada, origem traduzida, destino e ação allow/deny.",
        "interpretation": "Se flow log mostra deny, o problema é política; se não há fluxo, o pacote não chegou ao gateway."
      }
    ],
    "decisionTree": [
      {
        "if": "Host interno não sai para Internet",
        "then": "Verificar IP/máscara/gateway, rota default, ACL de NAT, interface inside/outside, regra de firewall e DNS separadamente."
      },
      {
        "if": "Port forwarding não funciona de fora",
        "then": "Verificar CGNAT, IP público real, DNS, regra DNAT, firewall, serviço escutando e rota de retorno."
      },
      {
        "if": "Funciona de fora, falha de dentro",
        "then": "Testar split DNS versus hairpin NAT; validar se o roteador suporta loopback e se a política permite."
      },
      {
        "if": "Log externo mostra ataque saindo do IP público",
        "then": "Correlacionar NAT, DHCP, firewall e NTP para identificar host interno e usuário/workload."
      },
      {
        "if": "Conexões quebram por inatividade",
        "then": "Verificar timeout NAT/firewall, keepalive da aplicação e comportamento de TCP/UDP."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar cada regra NAT com dono, justificativa, origem, destino, porta, validade e rollback.",
      "Combinar NAT com firewall deny-by-default e liberação mínima necessária.",
      "Usar TLS, autenticação forte e hardening no serviço publicado.",
      "Preferir proxy reverso, WAF, ZTNA ou private endpoint para serviços críticos quando aplicável.",
      "Enviar logs de NAT, firewall, DHCP e NTP para SIEM.",
      "Revisar periodicamente port forwards e NAT estáticos.",
      "Separar servidores publicados em DMZ ou segmento controlado."
    ],
    "badPractices": [
      "Publicar RDP, SSH, banco de dados ou painéis administrativos diretamente na Internet.",
      "Criar any-any NAT ou firewall amplo para resolver urgência.",
      "Usar IP de egress compartilhado como único fator de confiança.",
      "Não registrar logs de tradução.",
      "Manter regra temporária sem data de expiração.",
      "Confundir IP público fixo com arquitetura segura."
    ],
    "commonErrors": [
      "NAT configurado antes de rota default.",
      "DNAT criado sem firewall allow correspondente.",
      "Servidor interno com gateway errado causando retorno assimétrico.",
      "DNS público apontando para IP antigo.",
      "Hairpin NAT esperado, mas não suportado.",
      "Ambiente atrás de CGNAT tentando receber conexão inbound."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição indevida por port forwarding",
        "description": "Serviço interno fica acessível por IP/porta pública sem controles suficientes.",
        "defensiveExplanation": "O risco não é o NAT em si, mas a combinação de publicação, serviço vulnerável, firewall amplo e ausência de autenticação/logs.",
        "mitigation": "Reduzir origem permitida, usar VPN/ZTNA/proxy, TLS, MFA, atualização, WAF quando aplicável e logs."
      },
      {
        "name": "Perda de rastreabilidade por PAT compartilhado",
        "description": "Muitos hosts aparecem para terceiros como o mesmo IP público.",
        "defensiveExplanation": "Sem logs de IP/porta/hora, a investigação não identifica host interno.",
        "mitigation": "Coletar logs de NAT, DHCP, NTP e firewall com correlação no SIEM."
      },
      {
        "name": "Confiança excessiva em allowlist de IP",
        "description": "SaaS ou API confia em um IP de egress compartilhado por muitos workloads.",
        "defensiveExplanation": "Qualquer workload atrás do NAT pode parecer autorizado se a identidade não for verificada.",
        "mitigation": "Combinar allowlist com OIDC, mTLS, tokens curtos, escopo mínimo e egress policy."
      },
      {
        "name": "Bypass acidental de inspeção",
        "description": "Hairpin, split DNS ou rota alternativa envia tráfego por caminho sem inspeção esperada.",
        "defensiveExplanation": "Arquiteturas com múltiplos caminhos podem criar exceções invisíveis.",
        "mitigation": "Documentar fluxos, usar flow logs, revisar DNS interno/externo e padronizar pontos de inspeção."
      }
    ],
    "monitoring": [
      "Volume de traduções por origem e destino.",
      "Esgotamento de portas ou pool NAT.",
      "Novas regras NAT criadas fora de janela de mudança.",
      "Acessos inbound para serviços publicados.",
      "Conexões para destinos raros ou países não esperados.",
      "Divergência entre logs de NAT e logs de firewall."
    ],
    "hardening": [
      "Deny-by-default antes de publicar serviço.",
      "Segmentação de servidores publicados.",
      "Expiração de regras temporárias.",
      "Logging com NTP confiável.",
      "Revisão de NAT em mudanças de DNS, firewall e cloud.",
      "Alta disponibilidade para NAT crítico.",
      "Limites e alertas de sessão/porta."
    ],
    "detectionIdeas": [
      "Alerta para nova porta publicada externamente.",
      "Correlação entre IP público/porta e IP interno/usuário no SIEM.",
      "Detecção de tráfego inbound para serviços administrativos.",
      "Comparação de egress esperado por aplicação versus egress real.",
      "Monitoramento de falhas de tradução e drops por estado expirado."
    ]
  },
  "lab": {
    "id": "lab-7.8",
    "title": "Construindo e diagnosticando NAT/PAT, port forwarding e hairpin em laboratório",
    "labType": "packet-tracer | gns3 | architecture | troubleshooting",
    "objective": "Configurar e validar saída PAT para uma LAN privada, publicar um serviço interno com DNAT/port forwarding e diagnosticar falhas comuns de NAT sem confundir tradução, firewall, rota, DNS e aplicação.",
    "scenario": "Uma filial usa a rede 192.168.10.0/24. O roteador/firewall possui IP interno 192.168.10.1 e IP externo 203.0.113.10. Usuários precisam sair para um servidor externo 198.51.100.20:443. Um servidor interno 192.168.10.20:443 precisa ser publicado externamente como 203.0.113.10:8443. Usuários internos também tentam acessar o FQDN público do serviço.",
    "topology": "PC-LAN -> Switch -> Roteador/Firewall NAT -> Rede externa -> Servidor externo; Cliente externo -> Roteador/Firewall NAT -> Servidor interno publicado.",
    "architecture": "Duas zonas: inside 192.168.10.0/24 e outside 203.0.113.0/24. O roteador/firewall faz PAT de saída e DNAT para publicação. DNS público aponta app.empresa.exemplo para 203.0.113.10; DNS interno pode apontar para 192.168.10.20 como alternativa ao hairpin.",
    "prerequisites": [
      "Conhecer IPv4 privado/público",
      "Conhecer gateway padrão",
      "Conhecer TCP/UDP e portas",
      "Ter Packet Tracer, GNS3 ou laboratório equivalente"
    ],
    "tools": [
      "Cisco Packet Tracer ou GNS3",
      "Roteador Cisco IOS simulado",
      "PCs/servidores simulados",
      "Opcional: Linux com curl/tcpdump",
      "Opcional: Windows PowerShell"
    ],
    "estimatedTimeMinutes": 95,
    "cost": "zero em Packet Tracer/GNS3; baixo se feito em lab físico próprio; não execute em rede de terceiros",
    "safetyNotes": [
      "Use apenas ambiente próprio ou simulado.",
      "Não publique serviços reais na Internet durante este lab.",
      "Não faça varreduras externas.",
      "Use endereços de documentação como 203.0.113.0/24 e 198.51.100.0/24 no desenho.",
      "Se adaptar para cloud, crie orçamento e destrua recursos ao final."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Montar a topologia",
        "instruction": "Crie uma LAN com PC 192.168.10.50/24, servidor interno 192.168.10.20/24, roteador com interface inside 192.168.10.1 e outside 203.0.113.10, além de um servidor externo 198.51.100.20.",
        "command": "Endereçamento sugerido:\nPC-LAN: 192.168.10.50/24 gw 192.168.10.1\nServidor interno: 192.168.10.20/24 gw 192.168.10.1\nR1 inside: 192.168.10.1/24\nR1 outside: 203.0.113.10/24\nServidor externo: 198.51.100.20/24",
        "expectedOutput": "Todos os dispositivos com IP, máscara e gateway corretos dentro do simulador.",
        "explanation": "Antes de NAT, a rede precisa estar endereçada e roteável até o ponto de tradução."
      },
      {
        "number": 2,
        "title": "Marcar interfaces inside e outside",
        "instruction": "No roteador Cisco, marque a interface LAN como inside e a interface externa como outside.",
        "command": "interface g0/0\n ip address 192.168.10.1 255.255.255.0\n ip nat inside\n no shutdown\n!\ninterface g0/1\n ip address 203.0.113.10 255.255.255.0\n ip nat outside\n no shutdown",
        "expectedOutput": "Interfaces up/up e marcadas para NAT.",
        "explanation": "Se inside/outside estiver invertido ou ausente, a tradução não ocorrerá mesmo que a ACL esteja correta."
      },
      {
        "number": 3,
        "title": "Criar PAT de saída",
        "instruction": "Permita que a rede 192.168.10.0/24 saia usando o IP da interface externa.",
        "command": "access-list 10 permit 192.168.10.0 0.0.0.255\nip nat inside source list 10 interface g0/1 overload",
        "expectedOutput": "Configuração aceita sem erro.",
        "explanation": "A palavra overload habilita PAT: muitos hosts internos podem compartilhar o IP externo usando portas diferentes."
      },
      {
        "number": 4,
        "title": "Testar saída e observar tabela NAT",
        "instruction": "A partir do PC interno, acesse ou pingue o servidor externo. Em seguida observe a tabela NAT no roteador.",
        "command": "show ip nat translations\nshow ip nat statistics",
        "expectedOutput": "Entradas de tradução mostrando inside local 192.168.10.50 e inside global 203.0.113.10 com porta/protocolo quando aplicável.",
        "explanation": "A tabela de tradução é a evidência principal de que NAT ocorreu."
      },
      {
        "number": 5,
        "title": "Publicar o servidor interno",
        "instruction": "Crie DNAT/port forwarding para que clientes externos acessem 203.0.113.10:8443 e sejam encaminhados para 192.168.10.20:443.",
        "command": "ip nat inside source static tcp 192.168.10.20 443 203.0.113.10 8443",
        "expectedOutput": "Regra NAT estática criada.",
        "explanation": "O destino público 203.0.113.10:8443 será traduzido para o serviço interno 192.168.10.20:443."
      },
      {
        "number": 6,
        "title": "Validar serviço publicado",
        "instruction": "A partir do cliente externo, teste conexão para o IP público e porta publicada. Em simulador, use ferramenta de conexão disponível; em Linux real, use curl ou nc.",
        "command": "curl -vk https://203.0.113.10:8443\n# ou\nnc -vz 203.0.113.10 8443",
        "expectedOutput": "Conexão chega ao servidor interno ou erro específico de TLS/aplicação, não timeout silencioso.",
        "explanation": "Se timeout ocorrer, separe: rota externa, firewall, DNAT, serviço escutando e retorno."
      },
      {
        "number": 7,
        "title": "Inserir falha intencional: gateway errado no servidor",
        "instruction": "Altere temporariamente o gateway do servidor interno para um IP inexistente e repita o teste externo.",
        "command": "Servidor interno: gateway 192.168.10.254 temporariamente",
        "expectedOutput": "Cliente externo não completa conexão ou não recebe resposta.",
        "explanation": "O pacote pode chegar por DNAT, mas a resposta não volta pelo roteador NAT. Isso demonstra rota de retorno e simetria."
      },
      {
        "number": 8,
        "title": "Corrigir e coletar evidências",
        "instruction": "Restaure o gateway correto, repita os testes e colete tabela NAT, estatísticas, configuração e evidências de aplicação.",
        "command": "show ip nat translations\nshow ip nat statistics\nshow running-config | include ip nat\nshow access-lists",
        "expectedOutput": "Traduções aparecem durante o teste, contadores aumentam e configuração corresponde ao desenho.",
        "explanation": "Evidências são necessárias para troubleshooting profissional e auditoria."
      },
      {
        "number": 9,
        "title": "Analisar hairpin versus split DNS",
        "instruction": "Explique o que aconteceria se o PC interno acessasse app.empresa.exemplo apontando para 203.0.113.10. Escolha entre hairpin NAT e split DNS para resolver.",
        "command": "Opção A: hairpin NAT documentado no firewall\nOpção B: DNS interno aponta app.empresa.exemplo -> 192.168.10.20",
        "expectedOutput": "Decisão justificada com vantagens, riscos e logs.",
        "explanation": "Muitas falhas atribuídas ao DNS são, na verdade, problemas de caminho interno para IP público ou ausência de hairpin."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar e demonstrar PAT de saída, DNAT/port forwarding, tabela NAT, efeito de rota de retorno, diferença entre NAT e firewall e decisão entre hairpin NAT e split DNS.",
    "validation": [
      {
        "check": "PAT de saída cria tradução",
        "command": "show ip nat translations",
        "expected": "Entrada com inside local 192.168.10.50 e inside global 203.0.113.10.",
        "ifFails": "Verificar ACL 10, ip nat inside/outside, rota default e tráfego gerado."
      },
      {
        "check": "Publicação encaminha para servidor interno",
        "command": "curl -vk https://203.0.113.10:8443",
        "expected": "Conexão chega ao serviço interno ou retorna erro de aplicação/TLS, não timeout.",
        "ifFails": "Verificar DNAT, firewall, serviço escutando, gateway do servidor e CGNAT se for lab real."
      },
      {
        "check": "Servidor interno tem rota de retorno",
        "command": "ip route ou configuração de gateway do servidor",
        "expected": "Gateway 192.168.10.1.",
        "ifFails": "Corrigir gateway e repetir teste."
      },
      {
        "check": "Logs/evidências foram coletados",
        "command": "show ip nat statistics e prints do teste",
        "expected": "Contadores e tabela compatíveis com fluxo.",
        "ifFails": "Gerar tráfego novamente e coletar durante a sessão ativa."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Sem entrada em show ip nat translations",
        "probableCause": "Tráfego não chegou ao roteador NAT, ACL não casa, interface inside/outside errada ou rota ausente.",
        "howToConfirm": "Verificar show ip interface brief, show access-lists, rota e gerar tráfego durante a coleta.",
        "fix": "Corrigir endereçamento, rota, ACL ou marcação inside/outside."
      },
      {
        "symptom": "Acesso externo dá timeout",
        "probableCause": "DNAT ausente, firewall bloqueando, serviço não escutando, gateway errado ou CGNAT.",
        "howToConfirm": "Testar serviço localmente, ver tabela NAT, comparar IP público real e WAN, revisar logs.",
        "fix": "Corrigir serviço, regra, rota de retorno ou arquitetura."
      },
      {
        "symptom": "Interno não acessa o nome público",
        "probableCause": "Ausência de hairpin NAT ou DNS interno apontando para IP público.",
        "howToConfirm": "Resolver o FQDN de dentro e de fora; testar IP privado diretamente.",
        "fix": "Implementar split DNS ou hairpin NAT documentado."
      },
      {
        "symptom": "Investigações não identificam host interno",
        "probableCause": "Ausência de logs de NAT/DHCP/NTP correlacionados.",
        "howToConfirm": "Verificar SIEM e retenção de logs no horário do evento.",
        "fix": "Ativar logging de NAT, DHCP, firewall e sincronização NTP."
      }
    ],
    "improvements": [
      "Adicionar regra de firewall explícita e comparar logs allow/deny com logs NAT.",
      "Criar cenário com duas LANs e NAT de sobreposição para simular integração entre empresas.",
      "Comparar hairpin NAT com split DNS em uma tabela de decisão.",
      "Adaptar para cloud com sub-rede privada e NAT Gateway, incluindo estimativa de custo e limpeza.",
      "Criar alerta de SIEM para nova regra de port forwarding."
    ],
    "evidenceToCollect": [
      "Tabela de endereçamento da topologia.",
      "Configuração NAT relevante.",
      "Saída de show ip nat translations durante tráfego.",
      "Teste de conexão externo para porta publicada.",
      "Print/registro da falha com gateway errado e correção.",
      "Decisão justificada: hairpin NAT ou split DNS."
    ],
    "questions": [
      "Qual campo muda em SNAT? E em DNAT?",
      "Por que PAT precisa alterar portas?",
      "Por que NAT não substitui firewall?",
      "Como CGNAT afeta publicação de serviços?",
      "Quais logs você coletaria para identificar o host real por trás de um IP público compartilhado?"
    ],
    "challenge": "Desenhe uma solução para publicar um portal interno para parceiros externos permitindo apenas origens específicas, com TLS, logs, rollback e alternativa mais segura que port forwarding direto.",
    "solution": "A solução recomendada evita expor o servidor diretamente quando possível: usar proxy reverso/WAF/ZTNA ou VPN de parceiro, TLS válido, autenticação forte, allowlist de origem, segmentação em DMZ, firewall deny-by-default, logs de NAT/firewall/aplicação, NTP, documentação da regra, validade e rollback. Se DNAT for inevitável, publicar apenas a porta necessária, não expor administração, validar serviço e monitorar acessos."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que NAT precisou existir em redes IPv4, mas por que isso não significa que ele seja uma solução perfeita?",
      "hints": [
        "Pense em escassez de IPv4.",
        "Pense em rastreabilidade e fim a fim.",
        "Pense em IPv6."
      ],
      "expectedIdeas": [
        "endereços privados",
        "compartilhamento de IP público",
        "quebra de transparência",
        "logs",
        "limitações de inbound"
      ],
      "explanation": "A resposta ideal reconhece NAT como solução prática para IPv4, mas com custos operacionais, de diagnóstico e segurança."
    },
    {
      "type": "diagnóstico",
      "question": "Um serviço publicado funciona de fora, mas usuários internos não acessam o mesmo FQDN. Quais hipóteses você testaria?",
      "hints": [
        "Resolva o nome de dentro e de fora.",
        "Teste IP privado direto.",
        "Pense em hairpin NAT."
      ],
      "expectedIdeas": [
        "split DNS",
        "hairpin NAT",
        "DNS interno",
        "rota",
        "firewall",
        "serviço escutando"
      ],
      "explanation": "O caso clássico envolve FQDN apontando para IP público e ausência de caminho interno adequado para voltar ao serviço privado."
    },
    {
      "type": "cenário real",
      "question": "Um SaaS pede allowlist do IP do seu pipeline. Por que liberar apenas o IP de NAT pode ser insuficiente?",
      "hints": [
        "Quem mais sai pelo mesmo IP?",
        "Como o SaaS identifica o workload?",
        "Que logs existem?"
      ],
      "expectedIdeas": [
        "egress compartilhado",
        "identidade de workload",
        "OIDC",
        "tokens",
        "logs",
        "menor privilégio"
      ],
      "explanation": "Allowlist de IP ajuda no caminho, mas não substitui identidade forte, escopo mínimo e auditoria."
    }
  ],
  "quiz": [
    {
      "id": "q7.8.1",
      "type": "conceito",
      "q": "Qual frase descreve melhor NAT?",
      "opts": [
        "Um mecanismo de tradução de endereços entre domínios de rede.",
        "Um protocolo de criptografia de tráfego.",
        "Um serviço que resolve nomes para IPs.",
        "Um método de autenticação de usuários."
      ],
      "a": 0,
      "exp": "NAT traduz endereços. Ele não criptografa, não resolve nomes e não autentica usuários.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q7.8.2",
      "type": "comparação",
      "q": "Qual é a diferença central entre NAT e PAT?",
      "opts": [
        "PAT também usa portas para diferenciar múltiplas conexões compartilhando um IP.",
        "PAT é sempre mais seguro que NAT.",
        "NAT funciona só com UDP e PAT só com TCP.",
        "NAT é para cloud e PAT é para rede doméstica."
      ],
      "a": 0,
      "exp": "PAT é uma forma de tradução que altera endereço e porta, permitindo multiplexar muitas sessões em um endereço público.",
      "difficulty": "iniciante",
      "topic": "PAT"
    },
    {
      "id": "q7.8.3",
      "type": "diagnóstico",
      "q": "Um servidor interno publicado não responde de fora. Qual hipótese NÃO deve ser esquecida?",
      "opts": [
        "O servidor interno pode estar com gateway de retorno errado.",
        "NAT sempre autentica o cliente externo.",
        "DNS elimina a necessidade de firewall.",
        "CGNAT sempre permite inbound."
      ],
      "a": 0,
      "exp": "DNAT pode entregar o pacote, mas se a resposta sair por outro caminho a sessão falha.",
      "difficulty": "intermediário",
      "topic": "rota de retorno"
    },
    {
      "id": "q7.8.4",
      "type": "segurança",
      "q": "Por que a frase 'NAT é meu firewall' está errada?",
      "opts": [
        "Porque NAT traduz endereços, enquanto firewall aplica política de permissão/bloqueio.",
        "Porque NAT só existe em IPv6.",
        "Porque firewall apenas traduz portas.",
        "Porque NAT impede automaticamente exploração de aplicações."
      ],
      "a": 0,
      "exp": "NAT pode reduzir exposição incidental, mas política de segurança exige firewall, autenticação, hardening e logs.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q7.8.5",
      "type": "cenário",
      "q": "De fora o serviço app.empresa funciona. De dentro, o FQDN público resolve para o IP público, mas a conexão falha. Qual solução costuma ser avaliada?",
      "opts": [
        "Hairpin NAT ou split DNS.",
        "Trocar TCP por UDP sempre resolve.",
        "Apagar o gateway padrão.",
        "Remover TLS."
      ],
      "a": 0,
      "exp": "O problema pode ser caminho interno para o IP público. Hairpin NAT ou split DNS são alternativas comuns.",
      "difficulty": "intermediário",
      "topic": "hairpin"
    },
    {
      "id": "q7.8.6",
      "type": "cloud",
      "q": "Qual cuidado financeiro é importante ao usar NAT Gateway em cloud?",
      "opts": [
        "Pode haver custo por hora, processamento e egress.",
        "NAT Gateway sempre é gratuito.",
        "NAT Gateway elimina custo de tráfego de saída.",
        "NAT Gateway dispensa logs."
      ],
      "a": 0,
      "exp": "NAT Gateway e egress podem gerar custo recorrente relevante, especialmente em arquiteturas centralizadas.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q7.8.7",
      "type": "troubleshooting",
      "q": "Qual comando Cisco ajuda a confirmar se traduções NAT estão sendo criadas?",
      "opts": [
        "show ip nat translations",
        "show clock",
        "show vlan brief",
        "show cdp neighbors"
      ],
      "a": 0,
      "exp": "show ip nat translations exibe as entradas ativas da tabela NAT.",
      "difficulty": "iniciante",
      "topic": "comando"
    },
    {
      "id": "q7.8.8",
      "type": "segurança",
      "q": "Qual conjunto de logs é mais útil para investigar um evento saindo por IP público compartilhado?",
      "opts": [
        "NAT, DHCP, firewall e NTP/SIEM.",
        "Apenas print do navegador.",
        "Somente log do DNS público.",
        "Nenhum log é necessário se houver PAT."
      ],
      "a": 0,
      "exp": "Para mapear IP público/porta/horário para host interno, é preciso correlacionar tradução, lease, política e tempo confiável.",
      "difficulty": "intermediário",
      "topic": "logs"
    }
  ],
  "flashcards": [
    {
      "id": "fc7.8.1",
      "front": "O que é NAT?",
      "back": "Network Address Translation: mecanismo que traduz endereços IP entre domínios de rede.",
      "tags": [
        "nat"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc7.8.2",
      "front": "O que é PAT?",
      "back": "Port Address Translation: tradução que também altera portas para permitir que muitos hosts compartilhem um IP público.",
      "tags": [
        "pat"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc7.8.3",
      "front": "O que é SNAT?",
      "back": "Tradução do endereço de origem, comum em tráfego de saída para Internet.",
      "tags": [
        "snat"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc7.8.4",
      "front": "O que é DNAT?",
      "back": "Tradução do endereço de destino, comum em port forwarding e publicação de serviços.",
      "tags": [
        "dnat"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc7.8.5",
      "front": "O que é hairpin NAT?",
      "back": "Cenário em que um cliente interno acessa o IP público da própria borda para chegar a um serviço interno.",
      "tags": [
        "hairpin"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc7.8.6",
      "front": "O que é CGNAT?",
      "back": "NAT feito pelo provedor para compartilhar IPs públicos entre vários clientes, limitando conexões inbound diretas.",
      "tags": [
        "cgnat"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc7.8.7",
      "front": "Por que NAT não é firewall?",
      "back": "Porque NAT traduz endereços/portas; firewall aplica política de permitir ou negar tráfego.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc7.8.8",
      "front": "Quais logs ajudam a identificar um host atrás de PAT?",
      "back": "Logs de NAT, DHCP, firewall e horário confiável via NTP, correlacionados no SIEM.",
      "tags": [
        "logs",
        "soc"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex7.8.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras por que NAT/PAT se tornou tão comum em redes IPv4.",
      "expectedAnswer": "Porque hosts privados precisam acessar redes externas usando poucos IPs públicos; PAT permite compartilhar um IP público usando portas diferentes.",
      "explanation": "A resposta deve conectar escassez de IPv4, endereços privados e tradução na borda."
    },
    {
      "id": "ex7.8.2",
      "type": "diagnóstico",
      "prompt": "Um port forwarding para 203.0.113.10:8443 aponta para 192.168.10.20:443, mas o acesso externo falha. Liste cinco verificações.",
      "expectedAnswer": "IP público real/CGNAT, DNS, regra DNAT, firewall, serviço escutando, gateway do servidor, rota de retorno e logs.",
      "explanation": "O diagnóstico deve separar tradução, política, aplicação e caminho."
    },
    {
      "id": "ex7.8.3",
      "type": "segurança",
      "prompt": "Por que publicar SSH ou RDP diretamente por NAT é uma má prática?",
      "expectedAnswer": "Porque aumenta superfície de ataque para serviços administrativos; deve-se preferir VPN/ZTNA/bastion, MFA, allowlist, logs e hardening.",
      "explanation": "NAT não protege o serviço exposto."
    },
    {
      "id": "ex7.8.4",
      "type": "cloud",
      "prompt": "Uma subnet privada precisa baixar atualizações. Compare NAT Gateway, proxy e private endpoints.",
      "expectedAnswer": "NAT Gateway dá saída genérica, proxy permite inspeção e controle por aplicação, private endpoints evitam Internet para serviços suportados; custos e logs variam.",
      "explanation": "A escolha depende de destino, custo, segurança, rastreabilidade e operação."
    },
    {
      "id": "ex7.8.5",
      "type": "arquitetura",
      "prompt": "Quando você escolheria split DNS em vez de hairpin NAT?",
      "expectedAnswer": "Quando clientes internos devem acessar diretamente o IP privado do serviço usando o mesmo FQDN, reduzindo volta pela borda e simplificando caminho, desde que políticas e certificados sejam consistentes.",
      "explanation": "Split DNS pode ser mais limpo, mas exige governança de DNS interno/externo."
    },
    {
      "id": "ex7.8.6",
      "type": "comando/output",
      "prompt": "Ao executar show ip nat translations durante um teste, nada aparece. Quais hipóteses surgem?",
      "expectedAnswer": "Tráfego não passa pelo roteador NAT, ACL de NAT não casa, interfaces inside/outside erradas, rota ausente, teste não gerou tráfego ou NAT não configurado.",
      "explanation": "Ausência de tradução é evidência forte, mas precisa ser interpretada junto com caminho e regras."
    }
  ],
  "challenge": {
    "title": "Publicação segura de um portal interno para parceiros",
    "scenario": "Uma empresa precisa permitir que parceiros acessem um portal hospedado em 192.168.30.20:443. Existe um IP público 203.0.113.50. O acesso deve funcionar de fora e de dentro, deve ser auditável e não pode expor administração do servidor.",
    "tasks": [
      "Desenhar a topologia com zonas internas, DMZ ou proxy.",
      "Decidir se usará DNAT direto, proxy reverso/WAF, VPN de parceiro ou ZTNA.",
      "Definir DNS público e DNS interno.",
      "Definir regra de firewall mínima e origem permitida.",
      "Definir logs necessários para SOC e auditoria.",
      "Criar plano de validação e rollback.",
      "Apontar riscos financeiros/operacionais se a solução for em cloud."
    ],
    "constraints": [
      "Não expor SSH/RDP/porta administrativa.",
      "Registrar acessos com horário confiável.",
      "Manter menor privilégio.",
      "Permitir rollback rápido.",
      "Preferir solução com autenticação forte quando possível."
    ],
    "expectedDeliverables": [
      "Diagrama",
      "Tabela NAT/firewall",
      "Plano DNS",
      "Matriz de riscos",
      "Runbook de validação",
      "Plano de logs",
      "Solução comentada"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação entre NAT e firewall",
        "points": 20,
        "description": "Mostra claramente tradução e política como camadas diferentes."
      },
      {
        "criterion": "Segurança da publicação",
        "points": 25,
        "description": "Inclui TLS, autenticação, allowlist/controle de origem, segmentação e ausência de administração exposta."
      },
      {
        "criterion": "DNS e acesso interno/externo",
        "points": 15,
        "description": "Resolve corretamente split DNS ou hairpin NAT."
      },
      {
        "criterion": "Observabilidade",
        "points": 20,
        "description": "Inclui logs de NAT, firewall, aplicação, DHCP/NTP e correlação."
      },
      {
        "criterion": "Operação e rollback",
        "points": 20,
        "description": "Inclui validação, evidências, janela de mudança e rollback."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução deve começar perguntando se DNAT direto é realmente necessário. Para parceiros, proxy reverso, WAF, VPN site-to-site controlada ou ZTNA costumam ser melhores que port forwarding direto. Se DNAT for usado, ele precisa ser acompanhado por firewall mínimo, TLS, autenticação, logs e segmentação.",
    "steps": [
      "Classificar o serviço e exposição permitida.",
      "Escolher arquitetura: proxy/WAF/ZTNA preferencial; DNAT apenas se justificado.",
      "Definir DNS público para 203.0.113.50 e DNS interno para IP privado ou caminho controlado.",
      "Criar DNAT somente para 443, nunca para administração.",
      "Criar firewall allowlist por origem de parceiros quando possível.",
      "Ativar logs de NAT, firewall, proxy/aplicação e NTP.",
      "Validar de fora, de dentro, por IP, por FQDN e por logs.",
      "Documentar rollback e expiração da regra."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Abrir todas as portas para 192.168.30.20",
        "whyItIsWrong": "Expõe superfície desnecessária e mistura NAT com política permissiva."
      },
      {
        "answer": "Publicar RDP para administrar o servidor",
        "whyItIsWrong": "Administração deve usar canal separado e controlado, como VPN/ZTNA/bastion com MFA."
      },
      {
        "answer": "Confiar apenas no IP público do parceiro",
        "whyItIsWrong": "Allowlist ajuda, mas não substitui autenticação, TLS, logs e menor privilégio."
      },
      {
        "answer": "Não coletar logs porque NAT já mostra o fluxo",
        "whyItIsWrong": "Sem retenção e correlação, a evidência se perde e não identifica usuário/host com confiança."
      }
    ],
    "finalAnswer": "A arquitetura recomendada usa proxy reverso/WAF ou ZTNA quando possível. Se a restrição exigir DNAT, publique apenas 203.0.113.50:443 para 192.168.30.20:443, aplique firewall por origem, TLS válido, autenticação forte, logs de NAT/firewall/aplicação, segmentação em DMZ, DNS interno coerente e plano de rollback. NAT é apenas a tradução; a segurança vem das camadas ao redor."
  },
  "glossary": [
    {
      "term": "NAT",
      "shortDefinition": "Tradução de endereços de rede.",
      "longDefinition": "Mecanismo que altera endereço IP de origem ou destino quando o pacote atravessa uma fronteira entre domínios de endereçamento.",
      "example": "192.168.10.50 saindo para Internet como 203.0.113.10.",
      "relatedTerms": [
        "SNAT",
        "DNAT",
        "PAT",
        "firewall"
      ],
      "relatedLessons": [
        "4.6",
        "6.2",
        "7.8",
        "9.1",
        "14.4"
      ]
    },
    {
      "term": "PAT",
      "shortDefinition": "Tradução de endereço e porta.",
      "longDefinition": "Forma de NAT que permite muitos hosts compartilharem um endereço público usando portas de origem diferentes.",
      "example": "192.168.10.50:51514 vira 203.0.113.10:40001.",
      "relatedTerms": [
        "NAT overload",
        "porta",
        "TCP",
        "UDP"
      ],
      "relatedLessons": [
        "6.2",
        "7.8"
      ]
    },
    {
      "term": "Port forwarding",
      "shortDefinition": "Encaminhamento de porta pública para serviço interno.",
      "longDefinition": "Regra de DNAT que recebe conexões em um IP/porta da borda e encaminha para um IP/porta privado.",
      "example": "203.0.113.10:8443 para 192.168.10.20:443.",
      "relatedTerms": [
        "DNAT",
        "publicação",
        "firewall"
      ],
      "relatedLessons": [
        "7.8",
        "9.1"
      ]
    },
    {
      "term": "Hairpin NAT",
      "shortDefinition": "Acesso interno ao IP público que retorna para serviço interno.",
      "longDefinition": "Técnica que permite que clientes da rede interna acessem um serviço interno usando o endereço público da borda.",
      "example": "Notebook interno acessa app.empresa.com apontando para IP público e retorna para servidor privado.",
      "relatedTerms": [
        "split DNS",
        "DNAT",
        "rota"
      ],
      "relatedLessons": [
        "7.5",
        "7.8"
      ]
    },
    {
      "term": "CGNAT",
      "shortDefinition": "NAT em larga escala feito pelo provedor.",
      "longDefinition": "Carrier-Grade NAT permite que operadoras compartilhem endereços IPv4 públicos entre vários clientes.",
      "example": "Roteador doméstico recebe IP privado do provedor e não consegue receber conexões inbound diretamente.",
      "relatedTerms": [
        "IPv4 público",
        "port forwarding",
        "provedor"
      ],
      "relatedLessons": [
        "4.6",
        "7.8"
      ]
    }
  ],
  "references": [
    {
      "type": "rfc",
      "title": "RFC 1918 — Address Allocation for Private Internets",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc1918",
      "note": "Base para endereços privados usados em conjunto com NAT."
    },
    {
      "type": "rfc",
      "title": "RFC 3022 — Traditional IP Network Address Translator",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc3022",
      "note": "Referência clássica sobre NAT tradicional e NAPT/PAT."
    },
    {
      "type": "rfc",
      "title": "RFC 6598 — Shared Address Space for CGN",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc6598",
      "note": "Espaço 100.64.0.0/10 usado em cenários de CGNAT."
    },
    {
      "type": "internal-course",
      "title": "Curso Redes e Network — Módulo 9 Firewalls, ACLs, WAF e Políticas",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aprofunda política de tráfego, que deve acompanhar regras de NAT."
    },
    {
      "type": "internal-course",
      "title": "Curso Infraestrutura Moderna, Platform Engineering e DevSecOps — Cloud e Kubernetes",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Relaciona NAT Gateway, egress e workloads automatizados."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "reason": "NAT depende de entender IPv4 privado e público."
    },
    {
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "reason": "PAT depende de portas TCP/UDP."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.1",
      "reason": "NAT deve ser combinado com políticas de firewall."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "cloud",
      "lesson": "cloud-networking",
      "reason": "NAT Gateway, egress e sub-redes privadas aparecem em arquiteturas cloud."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "identidade",
      "lesson": "workload-identity",
      "reason": "Allowlist por IP de NAT não substitui identidade de workload."
    }
  ],
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
      "7.9"
    ]
  }
};
