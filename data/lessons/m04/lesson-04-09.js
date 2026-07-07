export const lesson0409 = {
  "id": "4.9",
  "moduleId": "m04",
  "order": 9,
  "title": "Troubleshooting IPv4 com Windows, Linux e Cisco",
  "subtitle": "Laboratório real de diagnóstico IPv4 em Windows, Linux e Cisco/Packet Tracer: interface, endereço, máscara, gateway, ARP, rota, ICMP, DNS, firewall, evidências, RCA e correção guiada.",
  "duration": "120-170 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "redes",
    "ipv4",
    "troubleshooting",
    "windows",
    "linux",
    "cisco",
    "arp",
    "icmp",
    "dns",
    "gateway",
    "rota",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.1",
      "reason": "A aula 4.1 explica o papel do IPv4 e do gateway na comunicação entre redes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "reason": "Gateway padrão e rota local são a base para descobrir se o host sabe sair da própria rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.7",
      "reason": "Configuração manual, DHCP e reservas explicam a origem de grande parte das falhas IPv4."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.8",
      "reason": "ICMP, ping, TTL e traceroute são ferramentas centrais de diagnóstico, mas precisam ser interpretadas com cuidado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.5",
      "reason": "ARP explica como o host resolve o MAC do gateway ou do destino local antes de enviar frames Ethernet."
    }
  ],
  "objectives": [
    "Executar um método de troubleshooting IPv4 por camadas, começando no host e avançando até gateway, rota, DNS e serviço.",
    "Coletar evidências em Windows, Linux e Cisco/Packet Tracer usando comandos reais e saídas interpretáveis.",
    "Diferenciar falha de interface, IP, máscara, gateway, ARP, rota, ICMP, DNS, firewall e aplicação.",
    "Introduzir falhas controladas em laboratório e corrigi-las com validação objetiva.",
    "Produzir um relatório técnico sanitizado com sintoma, hipótese, evidência, causa raiz, correção e teste de regressão."
  ],
  "learningOutcomes": [
    "Dado um host Windows, o aluno coleta configuração, rota, ARP, DNS e teste de porta sem depender apenas de ping.",
    "Dado um host Linux, o aluno usa ip, ip route, ip neigh, ping, traceroute, dig e tcpdump para separar camadas.",
    "Dado um roteador/switch Cisco em Packet Tracer, o aluno valida interfaces, tabela ARP, tabela MAC, rotas, VLAN e conectividade.",
    "Dado um conjunto de falhas intencionais, o aluno identifica causa, corrige uma mudança por vez e registra evidência antes/depois.",
    "Dado um incidente IPv4, o aluno escreve um RCA curto com impacto, causa provável, correção e prevenção."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2>\n<p>Em redes reais, a frase mais perigosa é: <strong>\"a rede está fora\"</strong>. Ela parece simples, mas pode significar dezenas de coisas diferentes: cabo desconectado, Wi-Fi sem associação, DHCP falhando, IP duplicado, máscara errada, gateway incorreto, ARP inconsistente, rota ausente, ICMP bloqueado, DNS errado, firewall bloqueando porta, proxy quebrado, aplicação fora, certificado inválido ou autenticação falhando.</p>\n<p>O objetivo desta aula é transformar troubleshooting IPv4 em método. O aluno deve sair daqui sabendo perguntar: <em>qual camada eu já provei?</em>, <em>qual hipótese ainda não testei?</em>, <em>que evidência confirma ou descarta essa hipótese?</em></p>\n<div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário diz que \"não acessa o sistema\". O técnico faz ping no servidor, recebe resposta e encerra o chamado dizendo que a rede está boa. Depois descobre-se que o DNS resolvia para um IP antigo e que a aplicação HTTPS estava apontando para outro balanceador. O ping testou ICMP para um IP, não a jornada completa da aplicação.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\"><h2>2. História</h2>\n<p>As primeiras redes TCP/IP eram menores, mais previsíveis e tinham menos camadas de abstração. Um administrador podia olhar fisicamente para cabos, hosts e roteadores e entender boa parte do caminho. Com o tempo, redes passaram a incluir switches gerenciáveis, VLANs, roteadores, firewalls, DHCP, DNS, NAT, VPN, balanceadores, Wi-Fi corporativo, hypervisors, SDN, cloud, containers e proxies.</p>\n<p>O troubleshooting evoluiu junto. Antes, comandos como <code>ping</code>, <code>arp</code> e <code>route</code> resolviam grande parte dos casos. Hoje eles continuam essenciais, mas precisam ser combinados com logs, tabelas de switch, políticas de firewall, regras de cloud, health checks, observabilidade, SIEM e documentação de arquitetura.</p>\n<p>Por isso, a competência moderna não é decorar comandos isolados. É saber formular hipóteses, coletar evidências e explicar o caminho do pacote desde a interface local até o destino.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\"><h2>3. Problema</h2>\n<p>IPv4 depende de vários elementos funcionando em conjunto. Um host precisa ter interface ativa, endereço válido, máscara coerente, gateway alcançável, rota default quando necessário, ARP funcional para o próximo salto, DNS correto quando usa nomes, e permissões de firewall no caminho. Se qualquer peça falha, o sintoma pode parecer igual: \"não conecta\".</p>\n<div class=\"definition-box\"><strong>Problema central:</strong> sem método, troubleshooting vira tentativa aleatória. O profissional testa coisas em ordem emocional: primeiro o que lembra, depois o que é fácil, depois o que alguém sugeriu. Isso aumenta tempo de indisponibilidade e gera mudanças perigosas.</div>\n<table class=\"data-table\"><thead><tr><th>Sintoma</th><th>Hipóteses possíveis</th><th>Risco de conclusão apressada</th></tr></thead><tbody><tr><td>Sem acesso à Internet</td><td>Gateway ausente, DNS errado, rota default ausente, firewall, proxy, link externo</td><td>Trocar DNS sem testar gateway</td></tr><tr><td>Ping no gateway falha</td><td>Interface down, VLAN errada, máscara errada, ARP falhando, gateway fora</td><td>Assumir que o roteador caiu</td></tr><tr><td>Ping por IP funciona, por nome não</td><td>DNS, sufixo, cache, split-horizon, proxy</td><td>Chamar de problema de rede IP</td></tr><tr><td>Traceroute para no firewall</td><td>Filtro ICMP, rate limit, política de segurança, caminho real bloqueado</td><td>Assumir que todo tráfego para ali</td></tr></tbody></table>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\"><h2>4. Evolução</h2>\n<p>O troubleshooting IPv4 evoluiu de uma sequência simples de comandos para uma disciplina operacional. Em redes pequenas, verificar IP, máscara, gateway e ping pode resolver. Em empresas, é necessário correlacionar host, switch, VLAN, DHCP, firewall, roteamento, DNS, proxy, logs e controles de segurança.</p>\n<ol class=\"flow-list\"><li><strong>Fase manual:</strong> IPs configurados à mão, pouca automação e documentação em planilhas.</li><li><strong>Fase DHCP/IPAM:</strong> endereços passaram a ser distribuídos e auditados centralmente.</li><li><strong>Fase VLAN/firewall:</strong> segmentação e políticas passaram a determinar quem fala com quem.</li><li><strong>Fase cloud/SDN:</strong> rotas, security groups, NACLs, firewalls virtuais e metadados adicionaram novas camadas.</li><li><strong>Fase observável:</strong> troubleshooting passou a usar telemetria, SIEM, logs, métricas, traces e playbooks.</li></ol>\n<p>A aula usa Windows, Linux e Cisco porque esses três mundos aparecem o tempo todo em ambientes reais: endpoints, servidores, appliances, switches, roteadores e laboratórios de certificação.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\"><h2>5. Conceito</h2>\n<p><strong>Troubleshooting IPv4</strong> é o processo sistemático de diagnosticar comunicação IPv4 verificando cada dependência técnica do caminho: interface, configuração local, decisão de rota, resolução ARP, alcance do gateway, caminho entre redes, resolução de nomes, filtragem e serviço final.</p>\n<div class=\"definition-box\"><strong>Regra de ouro:</strong> comece pelo que está mais perto da origem e avance para fora. Primeiro o host. Depois o gateway. Depois a rota. Depois DNS e serviço. Depois políticas e aplicação.</div>\n<table class=\"comparison-table\"><thead><tr><th>Etapa</th><th>Pergunta</th><th>Exemplo de evidência</th></tr></thead><tbody><tr><td>Interface</td><td>A placa está ativa e conectada?</td><td><code>ipconfig</code>, <code>ip link</code>, LEDs, <code>show interface status</code></td></tr><tr><td>Configuração</td><td>IP, máscara e gateway fazem sentido?</td><td><code>ipconfig /all</code>, <code>ip addr</code>, DHCP lease</td></tr><tr><td>Rota</td><td>O host sabe para onde enviar?</td><td><code>route print</code>, <code>ip route</code></td></tr><tr><td>ARP</td><td>O MAC do próximo salto foi resolvido?</td><td><code>arp -a</code>, <code>ip neigh</code>, <code>show arp</code></td></tr><tr><td>ICMP</td><td>Há resposta controlada de rede?</td><td><code>ping</code>, <code>tracert</code>, <code>traceroute</code></td></tr><tr><td>DNS/Serviço</td><td>Nome e porta funcionam?</td><td><code>nslookup</code>, <code>Test-NetConnection</code>, <code>curl</code></td></tr></tbody></table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\"><h2>6. Funcionamento interno</h2>\n<p>Quando uma aplicação tenta acessar um destino, o sistema operacional percorre uma cadeia de decisões. Primeiro, se o destino foi informado por nome, o host precisa resolver DNS. Depois, com o IP do destino, ele compara o destino com sua máscara e decide se o endereço está na rede local ou fora dela. Se estiver local, o próximo salto é o próprio destino. Se estiver remoto, o próximo salto é o gateway padrão ou uma rota mais específica.</p>\n<p>Depois da decisão de próximo salto, o host precisa entregar o pacote IPv4 dentro de um frame Ethernet. Para isso, precisa do MAC do próximo salto. Essa é a ponte com ARP. Se o MAC não está no cache, o host envia ARP Request. Quando recebe o ARP Reply, monta o frame e transmite.</p>\n<ol class=\"flow-list\"><li>A aplicação solicita conexão para nome ou IP.</li><li>Se houver nome, o resolvedor consulta cache/DNS.</li><li>O sistema escolhe a interface e a rota pela tabela de rotas.</li><li>O host compara destino com máscara e determina próximo salto.</li><li>O host consulta cache ARP ou resolve o MAC do próximo salto.</li><li>O pacote IPv4 é encapsulado no frame Ethernet.</li><li>Switches encaminham o frame pela tabela MAC.</li><li>Roteadores decrementam TTL e encaminham para o próximo enlace.</li><li>Firewalls e ACLs podem permitir, negar ou registrar o fluxo.</li><li>O destino responde, mas a volta pode seguir caminho diferente.</li></ol>\n<div class=\"callout callout--warning\"><strong>Atenção:</strong> uma resposta positiva em uma etapa não prova as próximas. Gateway responde ping, mas DNS pode falhar. DNS resolve, mas firewall pode bloquear TCP. TCP abre, mas TLS ou aplicação podem falhar.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\"><h2>7. Arquitetura</h2>\n<p>Em uma arquitetura corporativa, troubleshooting IPv4 cruza várias responsabilidades. O time de endpoint vê configuração local. O time de rede vê switch, VLAN, gateway e roteamento. O time de segurança vê firewall, NAC, EDR, proxy e SIEM. O time de cloud vê route tables, security groups, NACLs e load balancers. O time de aplicação vê porta, processo, logs e dependências.</p>\n<table class=\"data-table\"><thead><tr><th>Camada operacional</th><th>Elementos comuns</th><th>Evidências úteis</th></tr></thead><tbody><tr><td>Host</td><td>Interface, IP, máscara, gateway, DNS, firewall local</td><td><code>ipconfig /all</code>, <code>ip addr</code>, <code>ip route</code></td></tr><tr><td>LAN</td><td>Switch, VLAN, MAC table, ARP, STP</td><td><code>show mac address-table</code>, <code>show vlan brief</code></td></tr><tr><td>Gateway</td><td>SVI, roteador, firewall L3, default gateway</td><td><code>show ip interface brief</code>, <code>show ip route</code></td></tr><tr><td>Segurança</td><td>ACL, firewall, NAC, DAI, DHCP snooping</td><td>logs, counters, eventos de bloqueio</td></tr><tr><td>Aplicação</td><td>porta, protocolo, TLS, proxy, autenticação</td><td><code>curl</code>, <code>Test-NetConnection</code>, logs da aplicação</td></tr></tbody></table>\n<p>O diagnóstico bom não procura culpados. Ele localiza fronteiras: até onde funciona, onde para e qual controle ou componente explica a interrupção.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\"><h2>8. Analogia</h2>\n<p>Pense em troubleshooting IPv4 como investigar uma entrega em uma cidade. Primeiro você verifica se o remetente existe e tem endereço correto. Depois verifica se ele sabe qual portão usar para sair do prédio. Em seguida, confirma se o porteiro reconhece o caminho para a rua, se a rua está aberta, se o mapa aponta para o bairro correto e se o destinatário está recebendo entregas.</p>\n<p>Não faz sentido culpar a rodovia antes de saber se o pacote saiu do prédio. Também não faz sentido culpar o prédio antes de saber se o endereço do destinatário foi escrito corretamente.</p>\n<div class=\"callout\"><strong>Limite da analogia:</strong> redes têm cache, rotas dinâmicas, filtros, NAT, caminhos assimétricos e políticas automáticas. Diferente de uma entrega física, um pacote pode ir por um caminho e a resposta voltar por outro.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\"><h2>9. Exemplo simples</h2>\n<p>Um notebook em casa não acessa a Internet. O usuário diz que o Wi-Fi está conectado. O diagnóstico metódico seria:</p>\n<ol class=\"flow-list\"><li>Verificar se há IP válido: <code>ipconfig /all</code> ou <code>ip addr</code>.</li><li>Se o IP for <code>169.254.x.x</code>, suspeitar de falha DHCP.</li><li>Verificar máscara e gateway.</li><li>Testar ping no próprio IP e no gateway.</li><li>Verificar ARP do gateway com <code>arp -a</code> ou <code>ip neigh</code>.</li><li>Testar ping para IP externo conhecido, se permitido.</li><li>Testar DNS com <code>nslookup</code>.</li><li>Testar aplicação/porta com <code>curl</code> ou <code>Test-NetConnection</code>.</li></ol>\n<p>Esse fluxo evita reiniciar roteador, trocar DNS e mexer em firewall antes de saber se o host recebeu configuração mínima.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\"><h2>10. Exemplo empresarial</h2>\n<p>Em uma empresa, um usuário de uma VLAN de estações não acessa um sistema interno em outra VLAN. O suporte confirma IP, máscara e gateway. O gateway responde. O DNS resolve o nome para o IP esperado. O ping para o servidor falha, mas o time de segurança informa que ICMP entre VLANs é bloqueado. O teste de porta TCP 443 falha. O firewall mostra deny por política antiga.</p>\n<p>A causa não era \"rede caiu\". Era uma política de firewall sem exceção para aquela sub-rede. O relatório correto deve registrar: origem, destino, VLAN, IP, porta, regra aplicada, horário, evidência e mudança proposta.</p>\n<div class=\"callout callout--security\"><strong>Boas práticas corporativas:</strong> não peça liberação ampla como \"qualquer origem para qualquer destino\". Documente origem, destino, porta, protocolo, justificativa, dono do serviço, prazo e risco.</div>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\"><h2>11. Exemplo em cloud</h2>\n<p>Em cloud, o host pode estar correto e mesmo assim a comunicação falhar por elementos externos: route table, security group, NACL, firewall gerenciado, private endpoint, load balancer, peering, VPN, NAT Gateway, UDR ou DNS privado.</p>\n<p>Uma VM com IP privado consegue pingar o gateway virtual, mas não acessa um banco gerenciado. O diagnóstico precisa verificar rota para a sub-rede do serviço, regra de saída no security group, regra de entrada do serviço, DNS privado, endpoint correto, porta TCP e política de identidade.</p>\n<table class=\"comparison-table\"><thead><tr><th>Ambiente tradicional</th><th>Equivalente em cloud</th></tr></thead><tbody><tr><td>Gateway físico/SVI</td><td>Gateway virtual ou roteamento da VPC/VNet</td></tr><tr><td>ACL/firewall físico</td><td>Security group, NACL, firewall cloud</td></tr><tr><td>VLAN</td><td>Sub-rede lógica</td></tr><tr><td>DNS interno</td><td>Private DNS zone/resolver</td></tr><tr><td>NAT de borda</td><td>NAT Gateway ou egress controlado</td></tr></tbody></table>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\"><h2>12. Exemplo em DevSecOps</h2>\n<p>Em pipelines, runners, containers e Kubernetes, troubleshooting IPv4 aparece quando builds não baixam dependências, containers não resolvem DNS, pods não acessam serviços, scanners não alcançam alvos ou webhooks falham.</p>\n<p>Um runner self-hosted pode ter IP correto, mas estar em uma VLAN sem saída para Internet. Um container pode resolver DNS pelo servidor interno do Docker, mas não conseguir sair por política de firewall. Um pod pode alcançar outro pod por ClusterIP, mas não acessar um serviço externo por falta de egress no CNI ou NetworkPolicy.</p>\n<div class=\"definition-box\"><strong>Ligação entre cursos:</strong> este diagnóstico será reutilizado no curso de Infraestrutura Moderna, Platform Engineering e DevSecOps quando estudarmos runners, Kubernetes, CNI, ingress, egress, service mesh e observabilidade.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\"><h2>13. Exemplo em Segurança</h2>\n<p>Para Segurança da Informação, troubleshooting IPv4 não é apenas resolver incidente operacional. É também preservar evidências e evitar mudanças que abram risco. Um analista pode precisar provar que um bloqueio foi causado por firewall, que um host recebeu IP de DHCP não autorizado, que há gateway falso, que uma regra está ampla demais ou que um scanner está gerando tráfego indevido.</p>\n<table class=\"risk-table\"><thead><tr><th>Risco</th><th>Sinal</th><th>Mitigação</th></tr></thead><tbody><tr><td>Gateway falso</td><td>ARP do gateway aponta para MAC inesperado</td><td>DAI, DHCP snooping, NAC, investigação</td></tr><tr><td>DHCP rogue</td><td>Gateway/DNS diferentes do padrão</td><td>DHCP snooping, portas trusted, monitoramento</td></tr><tr><td>Regra ampla</td><td><code>0.0.0.0/0</code> liberado sem necessidade</td><td>Menor privilégio, revisão e expiração</td></tr><tr><td>Exposição pública</td><td>Serviço responde de IP público sem controle</td><td>Firewall, allowlist, WAF, autenticação, logs</td></tr><tr><td>Diagnóstico invasivo</td><td>Varredura sem autorização</td><td>Escopo, autorização, janela e registro</td></tr></tbody></table>\n<div class=\"callout callout--security\"><strong>Ética e segurança:</strong> esta aula usa testes defensivos. Não execute varreduras, spoofing, força bruta, captura de terceiros ou alteração de gateway em redes sem autorização formal.</div>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\"><h2>14. Diagrama</h2>\n<p>O diagrama mostra um fluxo metódico de troubleshooting IPv4: começar no host, validar configuração, testar gateway, confirmar ARP/rota, avaliar DNS, testar porta e correlacionar evidências no switch, roteador/firewall e logs.</p>\n<svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"m04l09-title m04l09-desc\">\n<title id=\"m04l09-title\">Fluxo de troubleshooting IPv4</title>\n<desc id=\"m04l09-desc\">Host Windows ou Linux, switch, gateway, DNS, firewall, aplicação e matriz de evidências de diagnóstico IPv4.</desc>\n<defs>\n<marker id=\"m04l09-arrow\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-flow\"></path></marker>\n</defs>\n<rect x=\"28\" y=\"34\" width=\"190\" height=\"96\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n<text x=\"123\" y=\"66\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n<text x=\"123\" y=\"92\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP/máscara/gateway</text>\n<text x=\"123\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Windows/Linux</text>\n<rect x=\"278\" y=\"34\" width=\"170\" height=\"96\" rx=\"14\" class=\"svg-node svg-node--switch\"></rect>\n<text x=\"363\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n<text x=\"363\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">VLAN / MAC table</text>\n<rect x=\"508\" y=\"34\" width=\"178\" height=\"96\" rx=\"14\" class=\"svg-node svg-node--router\"></rect>\n<text x=\"597\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n<text x=\"597\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota / ARP / ICMP</text>\n<rect x=\"746\" y=\"34\" width=\"190\" height=\"96\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect>\n<text x=\"841\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Firewall/App</text>\n<text x=\"841\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta / política / log</text>\n<path d=\"M 218 82 L 278 82\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l09-arrow)\"></path>\n<path d=\"M 448 82 L 508 82\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l09-arrow)\"></path>\n<path d=\"M 686 82 L 746 82\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m04l09-arrow)\"></path>\n<rect x=\"58\" y=\"190\" width=\"250\" height=\"236\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"183\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">Checklist no host</text>\n<text x=\"82\" y=\"254\" class=\"svg-label svg-label--small\">1. interface ativa?</text>\n<text x=\"82\" y=\"282\" class=\"svg-label svg-label--small\">2. IP/máscara corretos?</text>\n<text x=\"82\" y=\"310\" class=\"svg-label svg-label--small\">3. gateway existe?</text>\n<text x=\"82\" y=\"338\" class=\"svg-label svg-label--small\">4. rota default?</text>\n<text x=\"82\" y=\"366\" class=\"svg-label svg-label--small\">5. ARP do gateway?</text>\n<text x=\"82\" y=\"394\" class=\"svg-label svg-label--small\">6. DNS e porta?</text>\n<rect x=\"368\" y=\"190\" width=\"250\" height=\"236\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"493\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">Evidências de rede</text>\n<text x=\"392\" y=\"254\" class=\"svg-label svg-label--small\">show ip int brief</text>\n<text x=\"392\" y=\"282\" class=\"svg-label svg-label--small\">show vlan brief</text>\n<text x=\"392\" y=\"310\" class=\"svg-label svg-label--small\">show mac address-table</text>\n<text x=\"392\" y=\"338\" class=\"svg-label svg-label--small\">show arp</text>\n<text x=\"392\" y=\"366\" class=\"svg-label svg-label--small\">show ip route</text>\n<text x=\"392\" y=\"394\" class=\"svg-label svg-label--small\">logs de bloqueio</text>\n<rect x=\"678\" y=\"190\" width=\"250\" height=\"236\" rx=\"14\" class=\"svg-zone\"></rect>\n<text x=\"803\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">Conclusão responsável</text>\n<text x=\"702\" y=\"254\" class=\"svg-label svg-label--small\">hipótese testada</text>\n<text x=\"702\" y=\"282\" class=\"svg-label svg-label--small\">evidência coletada</text>\n<text x=\"702\" y=\"310\" class=\"svg-label svg-label--small\">impacto e escopo</text>\n<text x=\"702\" y=\"338\" class=\"svg-label svg-label--small\">risco de mudança</text>\n<text x=\"702\" y=\"366\" class=\"svg-label svg-label--small\">próximo passo</text>\n<text x=\"702\" y=\"394\" class=\"svg-label svg-label--small\">registro sanitizado</text>\n<path d=\"M 308 308 L 368 308\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m04l09-arrow)\"></path>\n<path d=\"M 618 308 L 678 308\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m04l09-arrow)\"></path>\n<rect x=\"312\" y=\"452\" width=\"356\" height=\"42\" rx=\"10\" class=\"svg-badge\"></rect>\n<text x=\"490\" y=\"478\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Método: provar, isolar, documentar, corrigir com menor risco</text>\n</svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\"><h2>15. Laboratório</h2>\n<p>Este laboratório substitui a ideia de “olhar comandos soltos” por um diagnóstico completo. Você irá montar ou simular uma rede simples, coletar evidências em Windows, Linux e Cisco/Packet Tracer, introduzir falhas controladas e documentar a causa raiz.</p>\n<div class=\"callout callout--lab\"><strong>Entregável obrigatório:</strong> um relatório com sintoma, hipótese inicial, comandos executados, evidência observada, causa raiz, correção aplicada e teste de regressão.</div>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\"><h2>16. Exercícios</h2>\n<p>Os exercícios treinam a leitura de sintomas e a escolha do próximo teste. O foco é evitar atalhos perigosos.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\"><h2>17. Desafio</h2>\n<p>Você receberá três falhas intencionais: máscara incorreta, gateway errado e interface/VLAN incorreta no caminho. A tarefa é corrigir sem “chutar”, usando evidências de host e rede.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\"><h2>18. Solução comentada</h2>\n<p>A solução comentada mostra uma sequência segura: confirmar escopo, validar interface, comparar IP/máscara/gateway, verificar ARP, testar rota, testar DNS/porta, corrigir uma variável por vez e registrar evidências antes/depois.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2>\n<p>Troubleshooting IPv4 profissional não é rodar <code>ping</code> e concluir rapidamente. É montar uma cadeia de evidências: interface ativa, IP correto, máscara coerente, gateway alcançável, ARP válido, rota esperada, DNS consistente, política liberando o fluxo e serviço respondendo. Quando essa cadeia é registrada, o diagnóstico vira conhecimento reutilizável.</p>\n<ul><li><strong>Ideia central:</strong> teste uma hipótese por vez e avance do host para a rede.</li><li><strong>Erro comum:</strong> confundir falha de DNS ou porta com falha IPv4 básica.</li><li><strong>Uso real:</strong> NOC, SOC, suporte, cloud, firewall, VPN e incident response.</li></ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\"><h2>20. Próximo tema</h2>\n<p>A próxima aula fecha o Módulo 4 com uma revisão prática de IPv4 e preparação para subnetting. Depois disso, o curso poderá avançar para cálculo de sub-redes com uma base muito mais sólida.</p>\n</section>"
  },
  "networkContext": {
    "scope": "Diagnóstico IPv4 em host, LAN, gateway, roteamento básico e serviços dependentes.",
    "layers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "relatedLessons": [
      "1.9",
      "2.8",
      "3.5",
      "3.6",
      "4.5",
      "4.7",
      "4.8"
    ],
    "typicalSymptoms": [
      "Sem IP",
      "APIPA",
      "gateway ausente",
      "ping no gateway falha",
      "DNS falha",
      "porta bloqueada",
      "rota default ausente",
      "ARP incompleto",
      "ICMP filtrado"
    ]
  },
  "protocolFields": [
    {
      "name": "IPv4 Address",
      "description": "Endereço lógico do host ou destino usado na comunicação."
    },
    {
      "name": "Subnet Mask/CIDR",
      "description": "Define quais bits identificam a rede e quais identificam o host."
    },
    {
      "name": "Default Gateway",
      "description": "Próximo salto usado para alcançar redes fora da sub-rede local."
    },
    {
      "name": "ARP Entry",
      "description": "Associação entre IPv4 e MAC do próximo salto local."
    },
    {
      "name": "Route Prefix",
      "description": "Destino presente na tabela de rotas, como rede local ou rota default."
    },
    {
      "name": "Metric",
      "description": "Critério usado pelo sistema para escolher entre rotas possíveis."
    },
    {
      "name": "TTL",
      "description": "Campo decrementado por roteadores, útil para detectar caminho e loops."
    },
    {
      "name": "ICMP Type/Code",
      "description": "Indica resposta como Echo Reply, Time Exceeded ou Destination Unreachable."
    },
    {
      "name": "DNS Server",
      "description": "Servidor usado para transformar nome em endereço IP."
    },
    {
      "name": "TCP/UDP Port",
      "description": "Porta do serviço final, necessária para diferenciar alcance IP de aplicação funcionando."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Aplicação solicita destino",
      "description": "O usuário acessa um nome, IP ou serviço."
    },
    {
      "step": 2,
      "title": "Host valida configuração",
      "description": "Interface, IP, máscara, gateway e DNS precisam estar coerentes."
    },
    {
      "step": 3,
      "title": "DNS pode ser consultado",
      "description": "Se o destino é nome, o host resolve para um IP antes de decidir rota."
    },
    {
      "step": 4,
      "title": "Tabela de rotas é consultada",
      "description": "O sistema escolhe rota específica ou rota default."
    },
    {
      "step": 5,
      "title": "Próximo salto é definido",
      "description": "Destino local usa MAC do destino; destino remoto usa MAC do gateway."
    },
    {
      "step": 6,
      "title": "ARP resolve MAC",
      "description": "O host consulta cache ARP ou envia ARP Request."
    },
    {
      "step": 7,
      "title": "Frame é encaminhado",
      "description": "Switches usam tabela MAC e roteadores encaminham IPv4 decrementando TTL."
    },
    {
      "step": 8,
      "title": "Políticas podem bloquear",
      "description": "Firewalls, ACLs, security groups, NAC e filtros locais podem negar o fluxo."
    },
    {
      "step": 9,
      "title": "Resposta retorna",
      "description": "A volta pode seguir caminho diferente, exigindo cuidado na conclusão."
    }
  ],
  "deepDive": {
    "title": "O método em árvore de decisão",
    "sections": [
      {
        "heading": "Não pule o gateway",
        "body": "Se o gateway não responde ou não aparece no ARP, testar destinos externos geralmente só adiciona ruído. Primeiro prove a saída da LAN."
      },
      {
        "heading": "Não confunda DNS com IP",
        "body": "Teste por IP e por nome. Se IP funciona e nome não funciona, a hipótese se desloca para DNS, cache, split-horizon ou proxy."
      },
      {
        "heading": "Não confunda ICMP com aplicação",
        "body": "ICMP responder não garante TCP 443, banco de dados, TLS, autenticação ou backend funcionando."
      },
      {
        "heading": "Não confunda bloqueio com queda",
        "body": "Firewalls e clouds podem descartar ICMP intencionalmente. Um timeout pode ser política, rate limit ou caminho assimétrico."
      },
      {
        "heading": "Use evidências cruzadas",
        "body": "Host, switch, roteador, firewall, DNS e aplicação devem contar uma história coerente. Uma única saída raramente basta em incidente real."
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Concluir que a rede está boa porque o ping respondeu.",
      "impact": "Ignora falhas em DNS, TCP, TLS, proxy, autenticação e aplicação.",
      "correction": "Complemente com teste de nome, porta e aplicação."
    },
    {
      "mistake": "Concluir que a rede caiu porque o ping falhou.",
      "impact": "Pode ignorar política de bloqueio ICMP ou rate limit.",
      "correction": "Teste rota, porta e logs de firewall."
    },
    {
      "mistake": "Trocar DNS antes de testar gateway.",
      "impact": "Pode mascarar falha de DHCP, VLAN ou rota local.",
      "correction": "Valide IP, máscara, gateway, rota e ARP primeiro."
    },
    {
      "mistake": "Limpar cache ARP como solução permanente.",
      "impact": "Remove sintoma temporariamente, mas não resolve conflito, spoofing ou gateway falso.",
      "correction": "Investigue MAC, switchport, DHCP e logs."
    },
    {
      "mistake": "Pedir liberação ampla de firewall.",
      "impact": "Aumenta superfície de ataque e dificulta auditoria.",
      "correction": "Solicite origem, destino, porta, protocolo e justificativa mínima."
    },
    {
      "mistake": "Não registrar horário e origem dos testes.",
      "impact": "Impossibilita correlação com logs de firewall, SIEM e aplicação.",
      "correction": "Registre timestamp, IP de origem, destino, comando e resultado sanitizado."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Host sem acesso ao gateway.",
      "Host acessa IP, mas não acessa nome DNS.",
      "Host pinga gateway, mas não chega ao destino remoto.",
      "Tráfego funciona em uma porta, mas falha em outra.",
      "Cisco mostra interface administratively down ou VLAN incorreta.",
      "ARP resolve para MAC inesperado ou não resolve o próximo salto."
    ],
    "diagnosticQuestions": [
      "O problema afeta um host, uma VLAN, uma sub-rede ou vários sites?",
      "O host possui IP, máscara, gateway e DNS coerentes com a documentação?",
      "O destino está na mesma rede ou precisa passar pelo gateway?",
      "O MAC do gateway aparece na tabela ARP/neighbor?",
      "A rota escolhida pelo host é a esperada?",
      "O teste é por IP, nome DNS, ICMP ou porta de aplicação?",
      "Existe firewall local, firewall de rede, SG/NACL cloud ou proxy no caminho?"
    ],
    "commands": [
      {
        "platform": "Windows CMD",
        "command": "ipconfig /all && route print && arp -a",
        "purpose": "Coletar IP, máscara, gateway, DNS, rota default e ARP.",
        "expectedObservation": "Interface ativa, gateway dentro da mesma sub-rede e entrada ARP do gateway após teste.",
        "interpretation": "Ausência de gateway, máscara incoerente ou ARP ausente apontam para causa local/L2/L3 inicial."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Test-NetConnection <host-ou-ip> -Port 443",
        "purpose": "Separar conectividade IP/porta de simples resposta ICMP.",
        "expectedObservation": "TcpTestSucceeded True ou False com IP resolvido.",
        "interpretation": "Ping pode falhar por política, mas teste de porta mostra se o serviço está alcançável."
      },
      {
        "platform": "Linux",
        "command": "ip -br addr; ip route; ip neigh",
        "purpose": "Ver interfaces, rotas e vizinhos ARP/ND.",
        "expectedObservation": "Endereço correto, default via gateway e vizinho REACHABLE/STALE após tráfego.",
        "interpretation": "Rota default ausente ou neighbor FAILED indica onde investigar."
      },
      {
        "platform": "Linux",
        "command": "ping -c 4 <gateway>; traceroute <destino>; dig <nome> A",
        "purpose": "Testar gateway, caminho e DNS separadamente.",
        "expectedObservation": "Gateway responde, caminho progride e DNS retorna IP esperado.",
        "interpretation": "Falha em nome com IP funcionando aponta para DNS, não para IPv4 básico."
      },
      {
        "platform": "Linux tcpdump",
        "command": "sudo tcpdump -ni <iface> \"arp or icmp or host <gateway>\"",
        "purpose": "Observar ARP/ICMP e confirmar se há resposta no enlace.",
        "expectedObservation": "ARP request/reply e ICMP echo/echo-reply quando permitido.",
        "interpretation": "ARP sem resposta pode indicar VLAN, gateway, cabo, switch, IP duplicado ou interface down."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief; show arp; show ip route; show running-config | section interface",
        "purpose": "Validar interfaces, ARP, rotas conectadas e configuração de IP.",
        "expectedObservation": "Interfaces up/up com IP correto e rotas C/L na tabela.",
        "interpretation": "Administratively down, IP incorreto ou rota conectada ausente explicam falha de encaminhamento."
      },
      {
        "platform": "Cisco IOS Switch",
        "command": "show vlan brief; show interfaces trunk; show mac address-table dynamic",
        "purpose": "Validar VLAN, trunk/access e aprendizado de MAC.",
        "expectedObservation": "Porta do host na VLAN correta, trunk permitido e MAC aprendido na porta esperada.",
        "interpretation": "VLAN errada causa sintomas de IPv4 mesmo quando IP/máscara parecem corretos."
      }
    ],
    "decisionTree": [
      {
        "if": "Host não possui IP válido ou aparece APIPA 169.254.x.x",
        "then": "Investigar DHCP, VLAN, cabo/Wi-Fi, escopo esgotado ou configuração manual."
      },
      {
        "if": "Host não pinga o próprio gateway",
        "then": "Validar máscara, gateway dentro da sub-rede, ARP do gateway, VLAN e interface do roteador/SVI."
      },
      {
        "if": "Gateway responde, mas destino remoto por IP não",
        "then": "Verificar rota default, firewall, rota de retorno, NAT e caminho intermediário."
      },
      {
        "if": "Destino por IP responde, mas nome falha",
        "then": "Investigar DNS, sufixo, split DNS, cache, resolvedor e zona autoritativa."
      },
      {
        "if": "IP e DNS funcionam, mas porta falha",
        "then": "Testar firewall local/rede/cloud, serviço escutando, proxy, balanceador e regra de retorno."
      },
      {
        "if": "Cisco mostra interface down/down ou administratively down",
        "then": "Validar cabo/conexão no Packet Tracer, usar no shutdown e revisar VLAN/trunk."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Sanitizar IPs públicos, nomes internos, domínios, MACs e topologia antes de compartilhar evidências.",
      "Registrar horário, origem, destino, porta e resultado dos testes para correlação com logs.",
      "Pedir liberações com menor privilégio: origem, destino, porta, protocolo e prazo.",
      "Evitar varreduras não autorizadas durante troubleshooting.",
      "Usar bastion, VPN e redes privadas para administração.",
      "Validar DHCP, gateway e DNS contra fontes confiáveis de inventário/IPAM."
    ],
    "badPractices": [
      "Desativar firewall local ou corporativo sem aprovação.",
      "Liberar 0.0.0.0/0 para resolver rapidamente um chamado.",
      "Executar scanners agressivos em rede produtiva sem janela autorizada.",
      "Compartilhar prints com IP público, hostname interno e topologia sensível.",
      "Alterar gateway, máscara ou DNS sem registrar mudança.",
      "Ignorar logs de segurança e culpar somente a rede."
    ],
    "vulnerabilities": [
      {
        "name": "DHCP rogue",
        "description": "Servidor indevido entrega gateway ou DNS malicioso.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "DHCP snooping e Dynamic ARP Inspection em switches compatíveis."
      },
      {
        "name": "ARP spoofing",
        "description": "Associação falsa IP-MAC pode redirecionar tráfego local.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "802.1X/NAC para controle de acesso à rede."
      },
      {
        "name": "Regras amplas",
        "description": "Liberações excessivas aumentam superfície de ataque.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "IPAM e documentação de escopos, gateways e reservas."
      },
      {
        "name": "Exposição indevida",
        "description": "Serviços internos publicados em IP público sem controles suficientes.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "Revisão de firewall/security groups com menor privilégio."
      },
      {
        "name": "Diagnóstico ruidoso",
        "description": "Testes excessivos podem acionar alertas, degradar serviço ou violar política.",
        "defensiveExplanation": "Analisar de forma defensiva, sem extrapolar para abuso em ambiente real.",
        "mitigation": "SIEM e logs centralizados para correlação."
      }
    ],
    "mitigations": [
      "DHCP snooping e Dynamic ARP Inspection em switches compatíveis.",
      "802.1X/NAC para controle de acesso à rede.",
      "IPAM e documentação de escopos, gateways e reservas.",
      "Revisão de firewall/security groups com menor privilégio.",
      "SIEM e logs centralizados para correlação.",
      "Playbooks de troubleshooting aprovados e auditáveis."
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
      "DHCP snooping e Dynamic ARP Inspection em switches compatíveis.",
      "802.1X/NAC para controle de acesso à rede.",
      "IPAM e documentação de escopos, gateways e reservas.",
      "Revisão de firewall/security groups com menor privilégio.",
      "SIEM e logs centralizados para correlação.",
      "Playbooks de troubleshooting aprovados e auditáveis."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-4.9",
    "title": "Troubleshooting IPv4 real com Windows, Linux e Cisco/Packet Tracer",
    "labType": "troubleshooting",
    "objective": "Diagnosticar falhas IPv4 controladas coletando evidências em host, gateway e camada de acesso, sem depender de tentativa aleatória.",
    "scenario": "Uma empresa pequena possui usuários em uma LAN IPv4. Um host não acessa o sistema interno. Você deverá provar se o problema está em configuração local, máscara, gateway, ARP/VLAN, rota, DNS, firewall ou aplicação.",
    "topology": "PC-Windows e/ou PC-Linux -> switch de acesso/VLAN -> gateway Cisco ou roteador Packet Tracer -> servidor interno/DNS/HTTP. Alternativa local: usar seu próprio host, gateway doméstico e destinos públicos apenas para testes seguros.",
    "architecture": "A cadeia de diagnóstico segue: interface física/lógica -> IP/máscara -> gateway -> ARP -> rota -> ICMP -> DNS -> porta de aplicação -> evidência e RCA.",
    "prerequisites": [
      "Acesso a Windows ou Linux com terminal.",
      "Cisco Packet Tracer instalado para a parte Cisco ou acesso a equipamento de laboratório autorizado.",
      "Permissão para executar comandos de diagnóstico básicos.",
      "Conhecimento prévio de IPv4, máscara, gateway, ARP, ICMP e DNS."
    ],
    "tools": [
      "Windows CMD/PowerShell",
      "Terminal Linux",
      "Cisco Packet Tracer ou Cisco IOS de laboratório",
      "tcpdump ou Wireshark opcional",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero",
    "safetyNotes": [
      "Execute mudanças apenas em laboratório ou ambiente próprio.",
      "Não rode varreduras agressivas em redes de terceiros.",
      "Sanitize IPs públicos, nomes internos, MACs completos, usuários e tokens em relatórios.",
      "Não capture tráfego de terceiros sem autorização formal.",
      "Em produção, qualquer alteração de IP, gateway, VLAN ou firewall precisa de mudança aprovada e rollback."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir sintoma e escopo",
        "instruction": "Registre exatamente o que falha: host afetado, origem, destino, nome usado, IP esperado, porta, horário e se outros hosts também falham.",
        "artifact": "Tabela: sintoma, origem, destino, protocolo/porta, horário, impacto, hipótese inicial.",
        "expectedOutput": "Sintoma transformado em teste reproduzível.",
        "explanation": "Sem escopo, qualquer comando vira chute. O primeiro passo é definir o que será provado."
      },
      {
        "number": 2,
        "title": "Coletar baseline no Windows",
        "instruction": "Em um host Windows, colete configuração, rotas, ARP, gateway, DNS e teste de porta.",
        "command": "ipconfig /all\nroute print\narp -a\nping 127.0.0.1\nping <IP_DO_GATEWAY>\ntracert <IP_DESTINO>\nnslookup <nome-do-servico>\nPowerShell: Test-NetConnection <host-ou-ip> -Port 443",
        "expectedOutput": "IP, máscara, gateway, DNS, rota default, ARP do gateway e teste de porta documentados.",
        "explanation": "Esses comandos separam configuração local, decisão de rota, ARP, ICMP, DNS e porta de aplicação."
      },
      {
        "number": 3,
        "title": "Coletar baseline no Linux",
        "instruction": "Em um host Linux, colete interface, rotas, vizinhos, DNS e testes de caminho.",
        "command": "ip -br addr\nip route\nip neigh\nping -c 4 127.0.0.1\nping -c 4 <IP_DO_GATEWAY>\ntraceroute <IP_DESTINO>\nresolvectl status || cat /etc/resolv.conf\ndig <nome-do-servico> A",
        "expectedOutput": "Interface UP, IP correto, default via gateway, vizinho do gateway e DNS documentados.",
        "explanation": "Linux deixa a decisão de rota e vizinhança muito visível, facilitando identificar rota default ausente, máscara errada ou ARP falho."
      },
      {
        "number": 4,
        "title": "Validar gateway e camada de acesso no Cisco",
        "instruction": "No roteador ou switch L3 do Packet Tracer, confirme interfaces, VLAN, ARP, MAC table e rotas conectadas.",
        "command": "enable\nshow ip interface brief\nshow running-config | section interface\nshow arp\nshow ip route\nshow vlan brief\nshow interfaces trunk\nshow mac address-table dynamic",
        "expectedOutput": "Gateway/SVI up/up, VLAN correta, rota conectada presente e MAC do host aprendido.",
        "explanation": "Quando o host parece correto mas não alcança gateway, a causa pode estar em VLAN, trunk, interface down ou gateway mal configurado."
      },
      {
        "number": 5,
        "title": "Falha controlada 1: máscara errada",
        "instruction": "No laboratório, configure um host que deveria estar em /26 com máscara /24. Teste acesso a outro bloco e observe a decisão local errada.",
        "command": "Windows: ipconfig /all && route print && ping <host-de-outra-sub-rede>\nLinux: ip route get <host-de-outra-sub-rede>; ip neigh; ping -c 4 <host-de-outra-sub-rede>",
        "expectedOutput": "O host tenta tratar destinos como locais ou produz ARP inesperado, em vez de enviar corretamente ao gateway.",
        "explanation": "Máscara errada altera a decisão “local vs remoto” antes de qualquer firewall ou roteador entrar na análise."
      },
      {
        "number": 6,
        "title": "Falha controlada 2: gateway errado ou fora da sub-rede",
        "instruction": "Configure gateway incorreto em um host e teste gateway, destino remoto e rota escolhida.",
        "command": "Windows: ipconfig /all && ping <gateway-configurado> && tracert <destino>\nLinux: ip route; ip route get <destino>; ping -c 4 <gateway-configurado>",
        "expectedOutput": "Gateway não responde ou rota default aponta para next-hop inválido/inacessível.",
        "explanation": "O gateway precisa estar alcançável no enlace local. Gateway fora da sub-rede é erro clássico em redes reais."
      },
      {
        "number": 7,
        "title": "Falha controlada 3: interface/VLAN incorreta no Cisco",
        "instruction": "No Packet Tracer, deixe uma interface administratively down ou coloque a porta do host em VLAN incorreta. Corrija após coletar evidência.",
        "command": "show ip interface brief\nshow vlan brief\nshow interfaces status\nconfigure terminal\ninterface <interface>\nno shutdown\nend\nshow ip interface brief",
        "expectedOutput": "Antes: interface down/down ou administratively down, ou porta em VLAN errada. Depois: interface up/up e host alcançando gateway.",
        "explanation": "Muitas falhas IPv4 são causadas por L2/L1. O IP pode estar certo, mas o frame não chega ao gateway correto."
      },
      {
        "number": 8,
        "title": "Separar DNS de conectividade IP",
        "instruction": "Teste o destino por IP e por nome. Compare resolvedor configurado, IP resolvido e porta de aplicação.",
        "command": "Windows: nslookup <nome> && ping <IP_RESOLVIDO> && Test-NetConnection <nome> -Port 443\nLinux: dig <nome> A +short && ping -c 4 <IP_RESOLVIDO> && curl -vkI https://<nome>",
        "expectedOutput": "Resultado separado entre resolução DNS, alcance IP e resposta da porta/serviço.",
        "explanation": "Se IP funciona e nome não, o problema é DNS. Se nome resolve mas porta falha, o problema pode ser firewall, proxy, serviço ou TLS."
      },
      {
        "number": 9,
        "title": "Capturar evidência de ARP/ICMP quando permitido",
        "instruction": "Em ambiente autorizado, capture ARP e ICMP para confirmar se requisições saem e respostas voltam.",
        "command": "Linux: sudo tcpdump -ni <iface> \"arp or icmp or host <gateway>\"\nWireshark filter: arp or icmp",
        "expectedOutput": "ARP request/reply e ICMP echo/echo-reply quando a camada local está saudável e ICMP permitido.",
        "explanation": "Captura de pacote ajuda a provar se a falha é ausência de resposta, caminho assimétrico, filtro ou decisão local errada."
      },
      {
        "number": 10,
        "title": "Produzir RCA e teste de regressão",
        "instruction": "Monte relatório com causa raiz, correção e teste de regressão. Não use dados sensíveis reais.",
        "artifact": "RCA: sintoma, causa, evidências antes, mudança aplicada, evidências depois, risco, prevenção e rollback.",
        "expectedOutput": "Relatório técnico sanitizado que permitiria reproduzir o diagnóstico e justificar a correção.",
        "explanation": "Troubleshooting corporativo precisa deixar rastro: o próximo analista deve entender o que foi provado e corrigido."
      }
    ],
    "expectedResult": "O aluno diagnostica três falhas IPv4 controladas, corrige cada uma com evidência antes/depois e entrega um RCA sanitizado.",
    "validation": [
      {
        "check": "Configuração local coerente",
        "command": "Windows: ipconfig /all | Linux: ip -br addr",
        "expected": "IP, máscara, gateway e DNS coerentes com a documentação.",
        "ifFails": "Corrigir IP/máscara/gateway/DNS ou investigar DHCP/VLAN."
      },
      {
        "check": "Rota default presente",
        "command": "Windows: route print | Linux: ip route",
        "expected": "Default route apontando para gateway local válido.",
        "ifFails": "Configurar gateway correto ou corrigir DHCP/escopo."
      },
      {
        "check": "Gateway alcançável",
        "command": "ping <IP_DO_GATEWAY>",
        "expected": "Resposta do gateway ou, se ICMP bloqueado, ARP/porta/controle alternativo comprovando alcance.",
        "ifFails": "Verificar máscara, ARP, VLAN, interface e gateway."
      },
      {
        "check": "ARP/neighbor válido",
        "command": "Windows: arp -a | Linux: ip neigh | Cisco: show arp",
        "expected": "Entrada para o gateway após tentativa de comunicação.",
        "ifFails": "Investigar VLAN, interface down, gateway errado ou conflito de IP."
      },
      {
        "check": "DNS separado de conectividade",
        "command": "nslookup/dig + Test-NetConnection/curl",
        "expected": "Nome resolve para IP esperado e porta de aplicação responde ou falha com causa identificada.",
        "ifFails": "Investigar resolvedor, zona, proxy, firewall ou serviço."
      },
      {
        "check": "RCA completo",
        "command": "Revisar relatório",
        "expected": "Sintoma, evidência, causa, correção, teste de regressão e prevenção presentes.",
        "ifFails": "Completar evidências faltantes e remover dados sensíveis."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Host não possui IP ou usa 169.254.x.x",
        "probableCause": "Falha de DHCP, VLAN errada, cabo/Wi-Fi, escopo esgotado ou bloqueio de relay.",
        "howToConfirm": "ipconfig /all, ip addr, show vlan brief, logs DHCP.",
        "fix": "Corrigir VLAN/conectividade, DHCP scope, relay ou configuração manual temporária de laboratório."
      },
      {
        "symptom": "Host não pinga o gateway",
        "probableCause": "Máscara errada, gateway fora da sub-rede, ARP falho, porta em VLAN errada ou interface down.",
        "howToConfirm": "route print/ip route, arp -a/ip neigh, show ip interface brief, show vlan brief.",
        "fix": "Corrigir máscara/gateway, VLAN, interface ou IP do SVI/roteador."
      },
      {
        "symptom": "Gateway responde, destino remoto não",
        "probableCause": "Rota default ausente, firewall, NAT, rota de retorno ou política intermediária.",
        "howToConfirm": "tracert/traceroute, show ip route, logs de firewall, Test-NetConnection.",
        "fix": "Corrigir rota, regra, NAT ou retorno conforme ambiente."
      },
      {
        "symptom": "IP funciona, nome não",
        "probableCause": "DNS incorreto, cache, split DNS, zona privada ou sufixo errado.",
        "howToConfirm": "nslookup, dig, resolvectl status, comparar resolvedores.",
        "fix": "Corrigir DNS, zona, forwarder, split-horizon ou sufixo."
      },
      {
        "symptom": "Nome resolve e IP alcança, mas porta falha",
        "probableCause": "Serviço parado, firewall local/rede/cloud, proxy, LB ou TLS.",
        "howToConfirm": "Test-NetConnection, curl -v, ss/netstat no servidor, logs.",
        "fix": "Liberar porta correta, corrigir serviço, listener, proxy ou certificado."
      }
    ],
    "improvements": [
      "Transformar os comandos em um runbook de NOC.",
      "Criar checklist por sintoma para suporte de primeiro nível.",
      "Adicionar screenshots sanitizados do Packet Tracer em modo Simulation.",
      "Repetir o laboratório com firewall entre sub-redes.",
      "Criar versão cloud simulando route table, NSG/SG e DNS privado."
    ],
    "evidenceToCollect": [
      "Tabela de IP/máscara/gateway/DNS do host.",
      "Saída de route print ou ip route.",
      "Saída de arp -a, ip neigh ou show arp.",
      "Resultado de ping/traceroute/Test-NetConnection/curl.",
      "Saídas Cisco show ip interface brief, show vlan brief e show ip route.",
      "Print ou export sanitizado do Packet Tracer Simulation Mode.",
      "RCA final com evidência antes/depois."
    ],
    "questions": [
      "Qual comando provou que o problema não era DNS?",
      "Qual evidência mostrou que a máscara estava errada?",
      "Por que ping não é suficiente para declarar uma aplicação saudável?",
      "Qual falha seria invisível se você olhasse apenas o host e não o switch/roteador?",
      "Que dados precisam ser removidos antes de enviar o relatório para fora da empresa?"
    ],
    "challenge": "Receba um cenário com três falhas simultâneas: PC com /24 em vez de /26, gateway fora da sub-rede e interface Cisco administratively down. Corrija uma causa por vez e entregue RCA com evidência antes/depois.",
    "solution": "A solução esperada é: 1) registrar sintoma; 2) validar IP/máscara/gateway; 3) detectar decisão local errada causada por /24; 4) corrigir máscara para /26; 5) identificar gateway inválido e corrigir para o primeiro host do bloco; 6) no Cisco, usar show ip interface brief para encontrar interface administratively down; 7) aplicar no shutdown; 8) validar ping gateway, rota, ARP, DNS/porta quando aplicável; 9) registrar evidências sanitizadas."
  },
  "mentorQuestions": [
    {
      "question": "Por que testar gateway antes de testar Internet geralmente economiza tempo?",
      "answer": "Porque o gateway é o primeiro salto para qualquer destino fora da rede local. Se ele não é alcançável ou não aparece no ARP, testes externos tendem a gerar sintomas secundários."
    },
    {
      "question": "Qual é o perigo de dizer que 'a rede está boa' só porque ping respondeu?",
      "answer": "Ping testa ICMP. A aplicação pode falhar por DNS, TCP, TLS, proxy, autenticação, firewall de porta, backend ou regra de aplicação."
    },
    {
      "question": "Em que situação uma falha de DNS parece falha de rede?",
      "answer": "Quando o usuário acessa por nome e recebe erro de conexão. Se o IP funciona diretamente, a conectividade IPv4 pode estar boa e o problema estar na resolução de nomes."
    }
  ],
  "quiz": [
    {
      "id": "q1",
      "question": "Qual deve ser uma das primeiras verificações em um host sem conectividade IPv4?",
      "options": [
        "Trocar o firewall corporativo",
        "Verificar IP, máscara, gateway e DNS",
        "Alterar a VLAN do datacenter",
        "Reiniciar todos os switches"
      ],
      "answer": "Verificar IP, máscara, gateway e DNS",
      "explanation": "O diagnóstico começa pelo host e pela configuração local antes de mexer em infraestrutura."
    },
    {
      "id": "q2",
      "question": "Se um host recebeu 169.254.x.x, qual hipótese é mais provável?",
      "options": [
        "DNS público funcionando",
        "Falha de DHCP ou isolamento local",
        "Rota BGP incorreta",
        "Aplicação sem TLS"
      ],
      "answer": "Falha de DHCP ou isolamento local",
      "explanation": "APIPA/link-local geralmente aparece quando o host não recebeu configuração DHCP válida."
    },
    {
      "id": "q3",
      "question": "Ping no destino respondeu. O que isso prova?",
      "options": [
        "Que a aplicação web está saudável",
        "Que houve resposta ICMP do destino",
        "Que DNS está correto",
        "Que firewall não existe no caminho"
      ],
      "answer": "Que houve resposta ICMP do destino",
      "explanation": "Ping não prova porta TCP, TLS, aplicação ou autenticação."
    },
    {
      "id": "q4",
      "question": "Qual comando Linux mostra a rota default?",
      "options": [
        "ip route",
        "ip neigh",
        "dig",
        "ss -tulpen"
      ],
      "answer": "ip route",
      "explanation": "ip route mostra rotas IPv4/IPv6, incluindo default via gateway."
    },
    {
      "id": "q5",
      "question": "Qual comando Cisco ajuda a confirmar em qual VLAN/porta um MAC foi aprendido?",
      "options": [
        "show clock",
        "show mac address-table",
        "show users",
        "show version"
      ],
      "answer": "show mac address-table",
      "explanation": "A tabela MAC informa MAC aprendido, VLAN e porta associada."
    },
    {
      "id": "q6",
      "question": "IP por nome falha, mas acesso direto por IP funciona. Qual área ganha prioridade no diagnóstico?",
      "options": [
        "DNS",
        "Cabo físico do servidor",
        "STP root bridge",
        "Fonte de alimentação"
      ],
      "answer": "DNS",
      "explanation": "Quando IP funciona e nome não, a hipótese mais forte passa a ser resolução de nomes, cache ou zona."
    }
  ],
  "flashcards": [
    {
      "front": "Troubleshooting IPv4",
      "back": "Processo sistemático de verificar configuração, rota, ARP, ICMP, DNS, porta, política e aplicação."
    },
    {
      "front": "APIPA",
      "back": "Endereço 169.254.0.0/16 usado quando o host não recebe configuração DHCP válida."
    },
    {
      "front": "Rota default",
      "back": "Rota usada quando não há rota mais específica para o destino, geralmente apontando para o gateway."
    },
    {
      "front": "ARP no diagnóstico",
      "back": "Mostra se o host resolveu o MAC do próximo salto local, especialmente o gateway."
    },
    {
      "front": "Ping",
      "back": "Teste ICMP útil, mas não prova que uma aplicação ou porta TCP está funcionando."
    },
    {
      "front": "Test-NetConnection",
      "back": "Cmdlet PowerShell útil para testar conectividade TCP em uma porta específica."
    }
  ],
  "exercises": [
    {
      "id": "ex1",
      "title": "Gateway ausente",
      "prompt": "Um host tem IP 192.168.10.50/24, DNS configurado, mas não tem gateway. O que ele consegue acessar e o que provavelmente falha?",
      "expectedAnswer": "Ele pode acessar destinos locais na mesma sub-rede, se camada 2/ARP funcionar, mas destinos fora da sub-rede tendem a falhar por falta de rota default."
    },
    {
      "id": "ex2",
      "title": "IP versus nome",
      "prompt": "Um servidor responde por IP, mas o nome interno não resolve. Cite três hipóteses.",
      "expectedAnswer": "DNS errado, zona privada incorreta, cache DNS antigo, sufixo DNS ausente ou split-horizon mal configurado."
    },
    {
      "id": "ex3",
      "title": "Gateway não responde",
      "prompt": "Cite cinco causas possíveis para falha de ping no gateway.",
      "expectedAnswer": "Máscara errada, VLAN errada, cabo/Wi-Fi, gateway fora, firewall/ICMP bloqueado, ARP falhando, NAC bloqueando, IP duplicado."
    },
    {
      "id": "ex4",
      "title": "Cisco e host",
      "prompt": "Quais comandos você usaria para correlacionar um host com a porta de switch e o gateway?",
      "expectedAnswer": "No host: ipconfig/ip addr, arp/ip neigh. No Cisco: show mac address-table, show vlan brief, show interfaces status, show arp, show ip interface brief."
    }
  ],
  "challenge": {
    "title": "Incidente IPv4 com três causas simultâneas",
    "scenario": "Um usuário da rede Usuários não acessa o sistema interno. O laboratório contém três erros: máscara /24 onde deveria ser /26, gateway incorreto e interface/SVI Cisco desligada ou em VLAN incorreta.",
    "tasks": [
      "Coletar evidências no host antes de alterar qualquer coisa.",
      "Identificar se o destino deveria ser local ou remoto pela máscara correta.",
      "Corrigir a máscara e repetir os testes.",
      "Corrigir gateway e validar ARP/rota.",
      "Corrigir interface/VLAN no Cisco e validar conectividade.",
      "Separar teste por IP, DNS e porta de aplicação.",
      "Entregar RCA sanitizado."
    ],
    "expectedDeliverables": [
      "Tabela de evidências antes/depois",
      "Comandos executados",
      "Causa raiz por falha",
      "Correção aplicada",
      "Teste de regressão",
      "Riscos/prevenção"
    ],
    "rubric": [
      {
        "criterion": "Método por camadas",
        "points": 25,
        "description": "Não pulou diretamente para aplicação ou firewall sem provar host/gateway/rota."
      },
      {
        "criterion": "Evidências objetivas",
        "points": 25,
        "description": "Incluiu saídas de Windows/Linux/Cisco ou equivalentes do Packet Tracer."
      },
      {
        "criterion": "Correção controlada",
        "points": 20,
        "description": "Corrigiu uma variável por vez e validou antes/depois."
      },
      {
        "criterion": "RCA e segurança",
        "points": 20,
        "description": "Documentou causa, impacto, prevenção e sanitização."
      },
      {
        "criterion": "Clareza operacional",
        "points": 10,
        "description": "Relatório pode ser usado por outro analista."
      }
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada do troubleshooting IPv4",
    "steps": [
      "Comece registrando o sintoma de forma testável: origem, destino, nome, IP, porta, horário e escopo.",
      "Colete IP, máscara, gateway e DNS no host. Se a máscara estiver /24 em uma rede planejada como /26, a decisão local/remota estará errada.",
      "Use route print ou ip route get para confirmar se o host enviará ao gateway ou tentará ARP local.",
      "Corrija a máscara para /26 e repita o teste para o gateway.",
      "Se o gateway estiver fora da sub-rede, corrija-o para o gateway documentado do bloco.",
      "No Cisco, use show ip interface brief, show vlan brief e show running-config para encontrar interface down ou VLAN errada.",
      "Aplique a correção mínima: no shutdown, VLAN correta ou IP correto no SVI/interface.",
      "Valide ARP, rota, ping gateway, teste de nome e teste de porta.",
      "Finalize com RCA sanitizado, evidências antes/depois e prevenção."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar o DNS imediatamente.",
        "whyItIsWrong": "DNS não explica falha de ping no gateway nem gateway fora da sub-rede."
      },
      {
        "answer": "Liberar qualquer-any no firewall.",
        "whyItIsWrong": "Não havia evidência de que a falha era firewall; isso cria risco operacional e de segurança."
      },
      {
        "answer": "Reiniciar todos os equipamentos.",
        "whyItIsWrong": "Pode mascarar causa raiz e gerar indisponibilidade sem evidência."
      }
    ],
    "finalAnswer": "A causa final é composta: máscara incorreta altera a decisão local/remota, gateway errado impede saída da rede e interface/VLAN Cisco incorreta impede alcance do gateway. A correção é ajustar máscara/gateway no host, corrigir interface/VLAN no Cisco, validar ARP/rota/ICMP/DNS/porta e documentar RCA."
  },
  "glossary": [
    {
      "term": "Troubleshooting",
      "definition": "Processo de investigação estruturada para identificar causa provável de uma falha."
    },
    {
      "term": "Rota default",
      "definition": "Rota usada quando não existe rota mais específica para o destino."
    },
    {
      "term": "Gateway",
      "definition": "Dispositivo de próximo salto usado para alcançar outras redes."
    },
    {
      "term": "ARP",
      "definition": "Protocolo que resolve IPv4 para MAC dentro da rede local."
    },
    {
      "term": "ICMP",
      "definition": "Protocolo de mensagens de controle usado por ferramentas como ping e traceroute."
    },
    {
      "term": "DNS",
      "definition": "Sistema que resolve nomes para endereços IP e outros registros."
    },
    {
      "term": "Firewall",
      "definition": "Controle que permite, nega ou registra tráfego com base em política."
    },
    {
      "term": "APIPA",
      "definition": "Endereçamento link-local 169.254.0.0/16 usado quando DHCP falha."
    }
  ],
  "references": [
    {
      "title": "RFC 791 — Internet Protocol",
      "type": "rfc",
      "note": "Base histórica e técnica do IPv4."
    },
    {
      "title": "RFC 792 — Internet Control Message Protocol",
      "type": "rfc",
      "note": "Base do ICMP usado em ping e mensagens de controle."
    },
    {
      "title": "RFC 826 — Address Resolution Protocol",
      "type": "rfc",
      "note": "Base do ARP usado para resolução IPv4-MAC."
    },
    {
      "title": "Cisco IOS Command Reference",
      "type": "documentation",
      "note": "Comandos operacionais de diagnóstico em switches e roteadores Cisco."
    },
    {
      "title": "Microsoft PowerShell Networking Cmdlets",
      "type": "documentation",
      "note": "Cmdlets como Get-NetIPConfiguration, Get-NetNeighbor e Test-NetConnection."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "reason": "O método de evidência desta aula será reutilizado para logs, métricas, traces e incidentes em plataformas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Identidades",
      "module": "Acesso Condicional e Zero Trust",
      "reason": "Muitos problemas de acesso parecem rede, mas são política de identidade, dispositivo, localização ou autenticação."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 3",
      "reason": "Diagnóstico IPv4 depende de Ethernet, MAC, ARP, VLAN e STP."
    }
  ],
  "progressRules": {
    "completionCriteria": [
      "Ler todas as seções obrigatórias da aula.",
      "Concluir o laboratório lab-4.9.",
      "Responder ao quiz com aproveitamento mínimo de 70%.",
      "Criar um relatório curto de troubleshooting com hipótese, evidência e próximo passo."
    ],
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "4.10"
    ],
    "xpAward": 230,
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
      "Um troubleshooting IPv4 metódico reduz MTTR porque evita mudanças aleatórias e mostra qual camada foi provada.",
      "Exige padronização de coleta de evidências, runbooks, sanitização de dados e documentação de topologia.",
      "Aumenta qualidade de handoff entre suporte, NOC, rede, segurança e times de aplicação."
    ],
    "financial": [
      "Diagnóstico sem método aumenta horas de indisponibilidade, retrabalho e escalonamentos desnecessários.",
      "Ferramentas básicas são gratuitas, mas tempo de equipe, mudanças emergenciais e janelas mal planejadas têm custo real.",
      "Evidências bem coletadas reduzem custo de fornecedores, cloud support e troubleshooting cruzado entre times."
    ],
    "security": [
      "Coleta de evidências precisa remover IPs públicos sensíveis, nomes internos, MACs completos, tokens e dados de usuários.",
      "Troubleshooting não deve justificar liberação ampla de firewall sem hipótese e rollback documentados.",
      "Logs de ARP, DNS, rota e porta ajudam a diferenciar falha operacional de indício de abuso, spoofing ou movimento lateral."
    ]
  }
};
