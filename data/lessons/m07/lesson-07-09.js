export const lesson0709 = {
  "id": "7.9",
  "moduleId": "m07",
  "order": 9,
  "title": "Segurança de serviços de rede: DNS, DHCP, NAT, NTP e logs",
  "subtitle": "Aprenda a proteger os serviços silenciosos que sustentam nomes, endereçamento, tradução, tempo e evidências operacionais em redes corporativas, cloud e ambientes DevSecOps.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 275,
  "tags": [
    "redes",
    "segurança",
    "dns",
    "dhcp",
    "ntp",
    "syslog",
    "logs",
    "siem",
    "hardening",
    "monitoramento",
    "soc",
    "noc",
    "serviços fundamentais",
    "defesa",
    "nat",
    "pat",
    "port forwarding",
    "cgnat",
    "logs de nat",
    "egress"
  ],
  "prerequisites": [
    {
      "id": "7.1",
      "title": "Por que DNS existe",
      "reason": "A segurança de DNS depende de entender nomes, resolvedores, autoridade e fluxo básico de resolução."
    },
    {
      "id": "7.5",
      "title": "TTL, cache DNS e troubleshooting de nomes",
      "reason": "TTL, cache e consultas divergentes explicam muitos sintomas de ataque, erro operacional e mudança mal planejada."
    },
    {
      "id": "7.6",
      "title": "DHCP profundo e integração com DNS",
      "reason": "A proteção de DHCP exige conhecer leases, relay, opções, reservas e integração com DNS."
    },
    {
      "id": "7.7",
      "title": "NTP: tempo como dependência crítica",
      "reason": "Segurança de logs, autenticação, certificados e SIEM depende de tempo confiável."
    },
    {
      "id": "7.8",
      "title": "NAT, PAT, publicação de serviços e CGNAT",
      "reason": "A proteção de serviços essenciais precisa diferenciar tradução, firewall, publicação, logs e rastreabilidade."
    }
  ],
  "objectives": [
    "Explicar por que DNS, DHCP, NTP e logs são alvos críticos em redes corporativas.",
    "Identificar riscos comuns como DNS hijacking, cache poisoning, DHCP rogue, drift de tempo, logs ausentes e exposição de serviços de gerenciamento.",
    "Relacionar controles defensivos como segmentação, ACL, firewall, DHCP snooping, DAI, NTP autenticado, syslog centralizado, SIEM e retenção.",
    "Diferenciar hardening, monitoramento, detecção, resposta a incidente e governança de mudanças.",
    "Construir uma matriz de riscos e controles para serviços fundamentais de rede.",
    "Aplicar boas práticas de segurança em ambientes on-premises, cloud, híbridos e DevSecOps.",
    "Diferenciar proteção de DNS/DHCP/NTP/logs da proteção de NAT, PAT e serviços publicados.",
    "Explicar por que NAT não substitui firewall, autenticação, TLS, logs ou segmentação.",
    "Criar controles defensivos para port forwarding, egress NAT, CGNAT e rastreabilidade por IP/porta."
  ],
  "learningOutcomes": [
    "Desenhar uma arquitetura defensiva mínima para DNS, DHCP, NTP e logs.",
    "Reconhecer sinais de comprometimento ou falha operacional nos serviços essenciais.",
    "Explicar por que bloquear tudo sem desenho pode quebrar a rede tanto quanto deixar tudo exposto.",
    "Produzir um checklist de hardening e monitoramento para serviços fundamentais.",
    "Dado um serviço publicado por NAT, o aluno propõe controles mínimos de firewall, autenticação, TLS, logs e revisão periódica.",
    "Dado um incidente saindo por IP público compartilhado, o aluno identifica evidências necessárias em NAT, DHCP, NTP, firewall e SIEM."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n\n  <p>DNS, DHCP, NTP e logs costumam funcionar em silêncio. Quando estão saudáveis, quase ninguém percebe. Quando falham ou são manipulados, a rede inteira passa a se comportar de forma estranha: nomes apontam para destinos errados, estações recebem gateway indevido, certificados falham, autenticações quebram, logs ficam fora de ordem e investigações perdem credibilidade.</p>\n  <p>Em Segurança da Informação, esses serviços são especiais porque sustentam a confiança operacional. DNS responde “para onde ir”, DHCP responde “quem você é na rede”, NTP responde “quando isso aconteceu” e logs respondem “qual evidência existe”. Atacar ou negligenciar esses pontos pode permitir desvio de tráfego, indisponibilidade, persistência, ocultação e dificuldade de resposta a incidentes.</p>\n  <div class='callout callout--security'><strong>Ideia central:</strong> serviços fundamentais não são acessórios. Eles são controles de infraestrutura. Se DNS, DHCP, NTP e logs não forem protegidos, todo o restante da arquitetura fica menos confiável.</div>\n\n</section>\n<div class=\"callout callout--security\"><strong>NAT entrou no escopo defensivo:</strong> proteger serviços essenciais também significa proteger traduções. Uma regra de port forwarding esquecida pode ser tão perigosa quanto um registro DNS errado ou um DHCP rogue. Para cada tradução, pergunte: quem pediu, por quanto tempo, qual origem pode acessar, que serviço está atrás, onde estão os logs e qual é o rollback?</div>",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n\n  <p>Historicamente, muitos serviços de rede nasceram em ambientes menores, mais confiáveis e menos hostis. DNS foi desenhado para escalar nomes, DHCP para automatizar configuração, NTP para sincronizar relógios e syslog para registrar eventos. A prioridade inicial era interoperabilidade e simplicidade operacional.</p>\n  <p>Com a expansão da Internet, das redes corporativas, do trabalho remoto, da cloud e de integrações com terceiros, esses serviços passaram a atravessar fronteiras de segurança. Um resolvedor DNS mal configurado pode vazar nomes internos. Um servidor DHCP indevido pode sequestrar o gateway dos clientes. Um NTP exposto pode ser abusado. Logs sem integridade podem ser apagados ou manipulados.</p>\n  <p>A evolução defensiva trouxe DNSSEC, validação de resolvedores, split DNS controlado, DHCP snooping, Dynamic ARP Inspection, NTP com autenticação e fontes confiáveis, syslog centralizado, retenção, SIEM, trilhas de auditoria, infraestrutura como código e revisão de mudanças. A aula de hoje une essa evolução em uma visão prática.</p>\n\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n\n  <p>O problema não é apenas “um serviço cair”. O problema é que serviços fundamentais costumam ser assumidos como confiáveis por sistemas, aplicações e pessoas. Um cliente acredita no DNS recebido. Um host acredita no gateway entregue por DHCP. Um SIEM acredita no timestamp do log. Um auditor acredita que o evento coletado representa a ordem real dos fatos.</p>\n  <p>Quando essa confiança é quebrada, surgem falhas difíceis de diagnosticar. A aplicação pode estar saudável, mas o nome aponta para outro IP. A rota pode estar correta, mas o cliente recebeu DNS externo. O firewall pode ter logs, mas o horário dos dispositivos está divergente. A investigação pode encontrar eventos, mas sem origem confiável, retenção adequada ou cadeia de custódia.</p>\n  <div class='callout callout--problem'><strong>Problema prático:</strong> uma rede pode ter firewall, EDR e SIEM, mas ainda assim ser frágil se qualquer pessoa puder conectar um servidor DHCP, alterar registros DNS, usar NTP externo sem controle ou apagar logs locais.</div>\n\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n\n  <p>A defesa desses serviços evoluiu de configurações manuais isoladas para arquiteturas controladas por política, segmentação, automação e monitoramento. Em redes antigas, era comum permitir DNS, DHCP, NTP e syslog de forma ampla. Em redes modernas, cada serviço precisa ter origem, destino, porta, função, dono, logs e exceções documentadas.</p>\n  <p>No DNS, a evolução inclui resolvedores internos controlados, bloqueio de resolvedores externos quando necessário, filtragem de domínios maliciosos, DNSSEC quando aplicável, zonas privadas, gestão de registros por IaC e revisão de mudanças. No DHCP, inclui escopos documentados, reservas, DHCP relay, DHCP snooping, IPAM e detecção de servidores indevidos.</p>\n  <p>No NTP, a evolução exige fontes confiáveis, hierarquia interna, bloqueio de NTP desnecessário para fora, monitoramento de offset e integração com identidade, logs e certificados. Em logs, a evolução passa por centralização, retenção, integridade, controle de acesso, normalização, correlação e envio para SIEM/SOC.</p>\n\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n\n  <p><strong>Segurança de serviços fundamentais de rede</strong> é o conjunto de controles que garante que nomes, endereçamento, tempo e evidências sejam confiáveis, disponíveis, íntegros e auditáveis.</p>\n  <table class='data-table'><thead><tr><th>Serviço</th><th>Função</th><th>Risco central</th><th>Controle típico</th></tr></thead><tbody>\n    <tr><td>DNS</td><td>Resolver nomes em endereços e descobrir serviços</td><td>Desvio de tráfego, vazamento, domínio malicioso, takeover</td><td>Resolvedores internos, split DNS, revisão de zonas, logs, DNSSEC/filtragem</td></tr>\n    <tr><td>DHCP</td><td>Entregar IP, máscara, gateway, DNS e opções</td><td>Gateway/DNS falso, conflito, esgotamento, rogue DHCP</td><td>DHCP snooping, reservas, IPAM, relay controlado, segmentação</td></tr>\n    <tr><td>NTP</td><td>Sincronizar tempo</td><td>Logs incoerentes, falha de Kerberos/TLS, auditoria fraca</td><td>Fontes confiáveis, hierarquia interna, monitoramento de offset, ACL</td></tr>\n    <tr><td>Logs/syslog</td><td>Registrar e centralizar eventos</td><td>Apagamento, alteração, falta de retenção, ausência de contexto</td><td>SIEM, retenção, integridade, NTP, RBAC, transporte protegido</td></tr>\n  </tbody></table>\n  <p>O objetivo não é transformar cada serviço em uma fortaleza isolada, mas construir uma cadeia de confiança operacional: quem responde, para quem responde, por qual caminho, com qual autenticação, com quais logs e com qual plano de resposta.</p>\n\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n\n  <p>Internamente, cada serviço possui fluxos, portas e pontos de confiança diferentes. DNS geralmente usa UDP/53 e TCP/53. DHCP usa broadcast local no início e pode atravessar redes via relay. NTP usa UDP/123. Syslog tradicional usa UDP/514, mas ambientes mais maduros podem usar TCP/TLS, agentes, APIs ou coletores dedicados.</p>\n  <ol class='flow-list'>\n    <li>O cliente recebe ou conhece servidores fundamentais: DNS, gateway, NTP, coletores e domínio.</li>\n    <li>O host consulta DNS para transformar nomes em destinos.</li>\n    <li>O host depende de DHCP ou configuração estática para saber IP, gateway e DNS.</li>\n    <li>O host sincroniza tempo para validar certificados, tokens, logs e autenticação.</li>\n    <li>Dispositivos e servidores enviam logs para coletores centrais.</li>\n    <li>Ferramentas de NOC/SOC correlacionam eventos usando timestamps, origem, destino, severidade e contexto.</li>\n  </ol>\n  <p>O atacante, erro operacional ou falha de governança tenta interferir nesses pontos: entregar configuração errada, manipular nome, alterar tempo, impedir log, gerar ruído, apagar evidência ou criar exceções invisíveis. Por isso, segurança desses serviços exige prevenção, detecção e resposta.</p>\n\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n\n  <p>Uma arquitetura segura separa serviços por função, zona e criticidade. Clientes não devem consultar qualquer DNS externo sem política. Servidores críticos devem usar NTP confiável. Dispositivos de rede devem enviar syslog para coletores centrais. DHCP deve existir apenas onde foi planejado. Logs devem sair do equipamento antes que o equipamento falhe ou seja alterado.</p>\n  <table class='comparison-table'><thead><tr><th>Camada</th><th>Decisão arquitetural</th><th>Exemplo seguro</th></tr></thead><tbody>\n    <tr><td>Acesso</td><td>Controlar quem conecta e quem pode oferecer serviços</td><td>802.1X/NAC, DHCP snooping, portas não usadas desabilitadas</td></tr>\n    <tr><td>Serviços</td><td>Centralizar DNS, DHCP, NTP e logs</td><td>Servidores internos redundantes por site ou região</td></tr>\n    <tr><td>Rede</td><td>Permitir apenas fluxos necessários</td><td>Clientes consultam DNS interno; NTP externo só sai de servidores autorizados</td></tr>\n    <tr><td>Cloud</td><td>Integrar DNS privado, logs e tempo com governança</td><td>Private DNS zones, flow logs, audit logs e rotas controladas</td></tr>\n    <tr><td>SOC/NOC</td><td>Correlacionar eventos com tempo confiável</td><td>SIEM com retenção, severidade, dashboards e alertas acionáveis</td></tr>\n  </tbody></table>\n  <p>O desenho deve considerar disponibilidade. Ter apenas um DNS, um DHCP, um NTP ou um coletor de logs cria ponto único de falha. Porém redundância sem controle também é perigosa: servidores duplicados e mal configurados podem produzir respostas divergentes.</p>\n\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n\n  <p>Pense em uma empresa física. DNS é a recepção que diz em qual sala cada pessoa está. DHCP é o crachá temporário que informa onde o visitante pode circular. NTP é o relógio oficial usado para registrar entradas e saídas. Logs são as câmeras e livros de ocorrência. Se qualquer pessoa puder trocar a placa da recepção, distribuir crachás falsos, alterar o relógio ou apagar imagens, a segurança do prédio inteiro fica comprometida.</p>\n  <p>A analogia tem limite: redes automatizam decisões em milissegundos e máquinas confiam em respostas técnicas sem julgamento humano. Por isso, controles precisam estar embutidos no desenho, não depender apenas de atenção manual.</p>\n\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n\n  <p>Em uma rede doméstica, o roteador geralmente acumula várias funções: DHCP, DNS forwarder, gateway, NTP indireto e logs básicos. Se um dispositivo malicioso ou mal configurado começar a entregar DHCP, clientes podem receber outro gateway ou outro DNS. O usuário vê apenas “Internet estranha”, “sites errados” ou “não abre nada”.</p>\n  <p>A investigação começa verificando IP, gateway, DNS recebido, servidor DHCP, resolução de nomes, horário do equipamento e logs disponíveis. Mesmo em casa, a lógica defensiva é a mesma: identificar quem está entregando confiança para os clientes.</p>\n\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n\n  <p>Em uma empresa, DNS interno resolve sistemas como <code>erp.corp.local</code>, DHCP entrega opções por VLAN, NTP sincroniza controladores de domínio, servidores e dispositivos de rede, e syslog alimenta NOC/SOC. Um erro em qualquer ponto pode gerar incidente amplo.</p>\n  <p>Um DHCP rogue em uma VLAN de usuários pode entregar DNS externo e quebrar acesso a sistemas internos. Um NTP divergente em controladores de domínio pode causar falhas de autenticação. Um switch sem syslog pode perder evidências de MAC flapping, loop, alteração de porta ou login administrativo. A defesa combina controles de acesso, segmentação, hardening e monitoramento.</p>\n\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n\n  <p>Em cloud, muitos serviços fundamentais são gerenciados, mas isso não elimina responsabilidade. VPC/VNet possui DNS privado, DHCP implícito, servidores de tempo, logs de auditoria, flow logs, security groups, route tables e integrações com diretórios. A facilidade de criar recursos aumenta o risco de zonas privadas duplicadas, registros órfãos, endpoints públicos, logs desligados ou retenção insuficiente.</p>\n  <p>Um desenho seguro usa private DNS zones, políticas de criação de registros, logs obrigatórios por conta/projeto/subscription, retenção mínima, exportação para SIEM, NTP confiável, bloqueio de serviços desnecessários expostos e revisão de mudanças via IaC.</p>\n\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, DNS, DHCP, NTP e logs aparecem em pipelines, clusters Kubernetes, service discovery, certificados, runners, ambientes efêmeros e automações de infraestrutura. Um pipeline pode criar um registro DNS temporário e esquecê-lo. Um cluster pode depender de DNS interno para service discovery. Um runner com relógio errado pode falhar ao validar tokens. Um ambiente sem logs impede investigar uma alteração automatizada.</p>\n  <p>Boas práticas incluem gerenciar DNS por IaC, revisar mudanças por pull request, aplicar policy as code para TTL, nomes públicos, logs obrigatórios, tags, donos, expiração de ambientes temporários e proibir segredos em registros TXT ou logs.</p>\n\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n\n  <p>Em um incidente, a equipe de segurança precisa responder perguntas básicas: qual nome foi resolvido, qual IP o host recebeu, qual gateway foi usado, qual horário real do evento, quais logs existem e se as evidências são confiáveis. Se os serviços fundamentais não forem protegidos, a investigação começa em terreno instável.</p>\n  <table class='risk-table'><thead><tr><th>Risco</th><th>Sintoma</th><th>Mitigação</th></tr></thead><tbody>\n    <tr><td>DNS hijacking</td><td>Nome legítimo aponta para destino inesperado</td><td>Controle de zonas, MFA no provedor, logs, DNSSEC quando aplicável</td></tr>\n    <tr><td>DHCP rogue</td><td>Clientes recebem gateway/DNS indevido</td><td>DHCP snooping, NAC, portas controladas, alertas</td></tr>\n    <tr><td>Tempo divergente</td><td>Logs fora de ordem, Kerberos/TLS falhando</td><td>NTP interno, monitoramento de offset, fontes confiáveis</td></tr>\n    <tr><td>Logs frágeis</td><td>Sem evidência após incidente</td><td>Syslog/SIEM centralizado, retenção, RBAC, integridade</td></tr>\n  </tbody></table>\n\n</section>\n<p>Em NAT, o controle defensivo começa separando tradução de autorização. A regra NAT deve ser acompanhada por política de firewall, segmentação, autenticação, TLS, logs e revisão periódica. Para egress NAT, o SOC precisa saber qual host ou workload estava por trás de um IP público e porta em determinado horário. Para port forwarding, a equipe precisa provar que o serviço publicado é necessário, atualizado, monitorado e limitado por origem quando possível.</p>",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <p>O diagrama mostra uma arquitetura defensiva mínima para serviços fundamentais. Observe que os clientes não acessam qualquer serviço livremente: eles usam serviços autorizados, e os eventos seguem para observabilidade e segurança.</p>\n  <svg class='lesson-svg' viewBox='0 0 1180 680' role='img' aria-labelledby='m07l09-title m07l09-desc'>\n    <title id='m07l09-title'>Segurança de DNS, DHCP, NTP e logs</title>\n    <desc id='m07l09-desc'>Clientes usam DNS, DHCP e NTP autorizados; logs seguem para coletores, NOC e SOC; controles bloqueiam serviços indevidos.</desc>\n    <defs>\n      <marker id='m07l09-arrow' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'>\n        <path d='M 0 0 L 10 5 L 0 10 z' class='svg-flow'></path>\n      </marker>\n      <marker id='m07l09-block' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto-start-reverse'>\n        <path d='M 0 0 L 10 5 L 0 10 z' class='svg-flow svg-flow--blocked'></path>\n      </marker>\n    </defs>\n\n    <rect x='40' y='90' width='185' height='100' rx='16' class='svg-node svg-node--client'></rect>\n    <text x='132' y='128' text-anchor='middle' class='svg-label'>Clientes</text>\n    <text x='132' y='154' text-anchor='middle' class='svg-label svg-label--small'>usuários, servidores</text>\n    <text x='132' y='176' text-anchor='middle' class='svg-label svg-label--small'>e dispositivos</text>\n\n    <rect x='320' y='55' width='185' height='80' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='412' y='90' text-anchor='middle' class='svg-label'>DNS interno</text>\n    <text x='412' y='114' text-anchor='middle' class='svg-label svg-label--small'>zonas, filtros, logs</text>\n\n    <rect x='320' y='165' width='185' height='80' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='412' y='200' text-anchor='middle' class='svg-label'>DHCP autorizado</text>\n    <text x='412' y='224' text-anchor='middle' class='svg-label svg-label--small'>escopos e reservas</text>\n\n    <rect x='320' y='275' width='185' height='80' rx='16' class='svg-node svg-node--server'></rect>\n    <text x='412' y='310' text-anchor='middle' class='svg-label'>NTP interno</text>\n    <text x='412' y='334' text-anchor='middle' class='svg-label svg-label--small'>tempo confiável</text>\n\n    <rect x='320' y='430' width='185' height='95' rx='16' class='svg-node svg-node--attacker'></rect>\n    <text x='412' y='465' text-anchor='middle' class='svg-label'>Serviço indevido</text>\n    <text x='412' y='491' text-anchor='middle' class='svg-label svg-label--small'>rogue DHCP/DNS/NTP</text>\n\n    <rect x='610' y='150' width='185' height='115' rx='16' class='svg-node svg-node--firewall'></rect>\n    <text x='702' y='190' text-anchor='middle' class='svg-label'>Controles</text>\n    <text x='702' y='217' text-anchor='middle' class='svg-label svg-label--small'>ACL, firewall, NAC</text>\n    <text x='702' y='241' text-anchor='middle' class='svg-label svg-label--small'>snooping, DAI</text>\n\n    <rect x='900' y='70' width='205' height='90' rx='16' class='svg-node svg-node--cloud'></rect>\n    <text x='1002' y='105' text-anchor='middle' class='svg-label'>Cloud/Internet</text>\n    <text x='1002' y='132' text-anchor='middle' class='svg-label svg-label--small'>DNS público e APIs</text>\n\n    <rect x='900' y='235' width='205' height='90' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='1002' y='270' text-anchor='middle' class='svg-label'>Coletores de logs</text>\n    <text x='1002' y='297' text-anchor='middle' class='svg-label svg-label--small'>syslog, agentes, eventos</text>\n\n    <rect x='900' y='405' width='205' height='100' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='1002' y='442' text-anchor='middle' class='svg-label'>SOC/SIEM</text>\n    <text x='1002' y='470' text-anchor='middle' class='svg-label svg-label--small'>correlação e resposta</text>\n\n    <line x1='225' y1='122' x2='320' y2='95' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='225' y1='148' x2='320' y2='205' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='225' y1='174' x2='320' y2='315' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='505' y1='95' x2='610' y2='185' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='505' y1='205' x2='610' y2='205' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='505' y1='315' x2='610' y2='235' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='795' y1='188' x2='900' y2='115' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='795' y1='235' x2='900' y2='280' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='1002' y1='325' x2='1002' y2='405' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l09-arrow)'></line>\n    <line x1='320' y1='477' x2='225' y2='188' class='svg-flow svg-flow--blocked animated-flow' marker-end='url(#m07l09-block)'></line>\n\n    <rect x='55' y='575' width='1060' height='62' rx='16' class='svg-node svg-node--security'></rect>\n    <text x='585' y='604' text-anchor='middle' class='svg-label'>Princípio defensivo: serviços autorizados, caminhos controlados, tempo confiável e evidências centralizadas</text>\n    <text x='585' y='628' text-anchor='middle' class='svg-label svg-label--small'>sem isso, troubleshooting e investigação perdem confiança</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n\n  <p>Neste laboratório você vai montar uma matriz defensiva para DNS, DHCP, NTP e logs em uma rede corporativa híbrida. O objetivo é identificar fluxos permitidos, fluxos bloqueados, fontes de evidência, riscos e controles de validação.</p>\n\n</section>\n",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n\n  <p>Os exercícios treinam análise de riscos, escolha de controles e leitura de evidências. Você vai classificar eventos, propor mitigação e separar sintoma operacional de indício de segurança.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n\n  <p>Você receberá um cenário com DNS externo indevido, clientes recebendo gateway suspeito, logs sem horário consistente e ausência de retenção. Sua missão será criar um plano de contenção, correção e prevenção.</p>\n\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n\n  <p>A solução comentada mostra como priorizar controles: primeiro restaurar confiança nos serviços essenciais, depois coletar evidências, reduzir exposição, documentar exceções e criar monitoramento para recorrência.</p>\n\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n\n  <p>DNS, DHCP, NTP e logs formam a base silenciosa da rede. DNS direciona nomes, DHCP entrega identidade de rede, NTP dá coerência temporal e logs registram evidências. Proteger esses serviços significa proteger a confiabilidade da operação.</p>\n  <p>Os principais controles são segmentação, ACLs, DHCP snooping, DAI, fontes NTP confiáveis, resolvedores controlados, logs centralizados, retenção, RBAC, monitoramento, revisão de mudanças e resposta a incidentes baseada em evidências.</p>\n\n</section>\n<ul><li><strong>NAT/PAT:</strong> registre traduções, monitore port forwards, evite exposição administrativa e não use NAT como substituto de firewall.</li><li><strong>CGNAT:</strong> documente limitações de inbound e impactos em investigação.</li><li><strong>Egress:</strong> combine IP fixo com identidade de workload, política por destino e logs.</li></ul>",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n\n  <p>Na próxima aula você fará a revisão prática do módulo, desenhando um conjunto coerente de serviços essenciais de rede corporativa com DNS, DHCP, NTP, syslog, SNMP, observabilidade, segurança e troubleshooting.</p>\n\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Serviços de rede",
      "Operação",
      "Segurança",
      "Observabilidade",
      "Governança"
    ],
    "dependsOn": [
      "DNS",
      "DHCP",
      "NTP",
      "Syslog",
      "SNMP",
      "IPv4",
      "Roteamento",
      "VLANs"
    ],
    "realWorldImpact": "A segurança de DNS, DHCP, NTP e logs influencia disponibilidade, autenticação, auditoria, troubleshooting, detecção, resposta a incidentes e confiança operacional."
  },
  "protocolFields": [
    {
      "field": "DNS UDP/TCP 53",
      "meaning": "Consulta e resposta de nomes; TCP também usado para respostas grandes e transferências controladas",
      "example": "Cliente consulta resolvedor interno para app.empresa.local"
    },
    {
      "field": "DHCP UDP 67/68",
      "meaning": "Servidor e cliente DHCP trocam configuração de rede",
      "example": "Cliente recebe IP, máscara, gateway e DNS"
    },
    {
      "field": "NTP UDP 123",
      "meaning": "Sincronização de horário",
      "example": "Servidor ajusta offset com fonte NTP interna"
    },
    {
      "field": "Syslog UDP/TCP 514",
      "meaning": "Envio de logs e eventos para coletor",
      "example": "Firewall envia deny logs para SIEM"
    },
    {
      "field": "SNMP UDP 161/162",
      "meaning": "Polling e traps de gerenciamento",
      "example": "Switch envia trap de link down"
    },
    {
      "field": "Timestamp",
      "meaning": "Marca temporal que permite ordenar e correlacionar eventos",
      "example": "Login administrativo, mudança DNS e alerta de EDR na mesma janela"
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "title": "Cliente entra na rede",
      "description": "O host obtém ou confirma IP, máscara, gateway, DNS e domínio."
    },
    {
      "step": 2,
      "title": "Controle de DHCP",
      "description": "A rede aceita respostas apenas de servidores autorizados e registra leases."
    },
    {
      "step": 3,
      "title": "Resolução DNS controlada",
      "description": "Clientes consultam resolvedores internos, que aplicam política e encaminham quando necessário."
    },
    {
      "step": 4,
      "title": "Tempo confiável",
      "description": "Clientes, servidores e dispositivos sincronizam com fontes NTP definidas."
    },
    {
      "step": 5,
      "title": "Logs centralizados",
      "description": "Eventos relevantes são enviados para coletores e SIEM com timestamp coerente."
    },
    {
      "step": 6,
      "title": "Correlação e resposta",
      "description": "NOC/SOC correlaciona DNS, DHCP, NTP, syslog, firewall, endpoint e cloud para investigar incidentes."
    }
  ],
  "deepDive": {
    "title": "Por que a segurança desses serviços é diferente da segurança de uma aplicação comum?",
    "points": [
      "Eles são consumidos por quase todos os sistemas, inclusive antes da aplicação funcionar.",
      "Eles definem parâmetros de confiança: nome, endereço, tempo e evidência.",
      "Falhas nesses serviços podem se parecer com erro de usuário, queda de Internet, problema de aplicação ou incidente de segurança.",
      "Controles precisam estar no desenho de rede, não apenas na configuração do servidor.",
      "A governança de mudanças é tão importante quanto o hardening técnico."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Permitir DNS externo livre para todos os clientes",
      "impact": "Perde-se visibilidade, política e controle de resolução de nomes.",
      "correction": "Definir resolvedores internos, exceções documentadas e monitoramento de egress DNS."
    },
    {
      "mistake": "Não habilitar DHCP snooping em switches de acesso",
      "impact": "Um dispositivo indevido pode entregar gateway ou DNS falso.",
      "correction": "Marcar portas confiáveis, bloquear respostas DHCP em portas de usuário e monitorar violações."
    },
    {
      "mistake": "Deixar cada servidor usar NTP aleatório na Internet",
      "impact": "Relógios divergentes prejudicam autenticação, logs e auditoria.",
      "correction": "Usar hierarquia NTP interna ou fontes gerenciadas por região/ambiente."
    },
    {
      "mistake": "Manter logs apenas localmente",
      "impact": "Logs podem ser perdidos após reboot, rotação, falha ou comprometimento.",
      "correction": "Enviar logs para coletor central com retenção, controle de acesso e integração com SIEM."
    },
    {
      "mistake": "Tratar TXT DNS como lugar seguro para qualquer metadado",
      "impact": "Validações antigas, segredos ou informações internas podem ficar expostos.",
      "correction": "Revisar TXT periodicamente e nunca publicar segredos em DNS."
    }
  ],
  "troubleshooting": {
    "method": "Verifique primeiro a fonte de confiança: quem entregou IP/DNS/gateway, quem respondeu DNS, qual fonte NTP está em uso e se os logs foram centralizados com horário coerente.",
    "checks": [
      {
        "symptom": "Cliente acessa site errado ou destino inesperado",
        "check": "Comparar DNS recebido, resolvedor usado, resposta autoritativa e logs de consulta",
        "tool": "ipconfig /all, resolvectl dns, dig, Resolve-DnsName"
      },
      {
        "symptom": "Vários clientes perdem acesso após conectar dispositivo novo",
        "check": "Procurar DHCP rogue, leases inesperados e gateway/DNS divergente",
        "tool": "show ip dhcp snooping binding, arp -a, ipconfig /all"
      },
      {
        "symptom": "Falha de autenticação e certificados",
        "check": "Verificar offset, fonte NTP e sincronização em controladores/servidores",
        "tool": "w32tm /query /status, chronyc tracking, show ntp status"
      },
      {
        "symptom": "Incidente sem evidência suficiente",
        "check": "Validar envio de syslog, retenção, timestamps, severidade e escopo de coleta",
        "tool": "show logging, journalctl, SIEM, collector health"
      },
      {
        "symptom": "Alertas contraditórios",
        "check": "Comparar relógios, timezone, NTP e pipeline de normalização",
        "tool": "timedatectl, w32tm, logs do coletor"
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup exemplo.local",
        "purpose": "Coletar configuração local, rotas e resolução DNS.",
        "expectedObservation": "IP, gateway, DNS e rotas coerentes com o cenário.",
        "interpretation": "Falhas nessa etapa indicam problemas de base antes da aplicação."
      }
    ],
    "decisionTree": [
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, cache, split-horizon, resolver e registros privados/públicos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar resolvedores DNS internos ou aprovados e registrar consultas relevantes.",
      "Bloquear ou controlar DNS direto para a Internet quando a política exigir inspeção e visibilidade.",
      "Habilitar DHCP snooping, DAI, IP Source Guard e NAC em switches de acesso compatíveis.",
      "Manter NTP hierárquico, monitorado e restrito a fontes confiáveis.",
      "Centralizar logs com NTP consistente, retenção definida, controle de acesso e alerta para falhas de coleta.",
      "Gerenciar zonas DNS, registros críticos e alterações por processo revisável, preferencialmente IaC.",
      "Monitorar mudanças em NS, MX, TXT, CNAME e registros públicos sensíveis.",
      "Documentar donos, exceções, fluxos permitidos e runbooks de incidente.",
      "Documentar e revisar regras de NAT/port forwarding com dono, validade e rollback.",
      "Correlacionar logs de NAT, DHCP, firewall e NTP no SIEM.",
      "Usar firewall deny-by-default e allowlist de origem para serviços publicados por NAT."
    ],
    "badPractices": [
      "Permitir qualquer servidor DHCP em qualquer VLAN.",
      "Publicar zonas ou nomes internos sem necessidade.",
      "Usar NTP externo aleatório diretamente em todos os ativos.",
      "Desativar logs para economizar armazenamento sem avaliação de risco.",
      "Deixar community strings, coletores ou interfaces de administração expostos.",
      "Alterar DNS manualmente em produção sem registro, aprovação ou plano de rollback.",
      "Publicar serviços administrativos diretamente por port forwarding.",
      "Assumir que NAT substitui firewall ou autenticação.",
      "Confiar apenas em allowlist de IP de egress compartilhado."
    ],
    "vulnerabilities": [
      {
        "name": "DNS hijacking e alteração indevida de registros.",
        "description": "Risco relacionado à aula 7.9 — Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "MFA e RBAC em provedores DNS e cloud."
      },
      {
        "name": "Cache poisoning e respostas DNS manipuladas.",
        "description": "Risco relacionado à aula 7.9 — Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DNSSEC quando aplicável ao domínio público e validação no resolvedor quando viável."
      },
      {
        "name": "Subdomain takeover por CNAME órfão.",
        "description": "Risco relacionado à aula 7.9 — Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "DHCP snooping, DAI, port security e 802.1X/NAC."
      },
      {
        "name": "DHCP rogue, starvation e entrega de gateway/DNS malicioso.",
        "description": "Risco relacionado à aula 7.9 — Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "ACLs para limitar quem pode consultar/servir DNS, DHCP, NTP e syslog."
      },
      {
        "name": "NTP spoofing, abuso de NTP exposto e drift silencioso.",
        "description": "Risco relacionado à aula 7.9 — Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Syslog/SIEM centralizado com retenção, integridade e monitoramento de falha de ingestão."
      },
      {
        "name": "Perda, alteração ou ausência de logs críticos.",
        "description": "Risco relacionado à aula 7.9 — Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão contínua de registros DNS e escopos DHCP."
      },
      {
        "name": "Exfiltração por DNS e bypass de monitoramento por resolvedores externos.",
        "description": "Risco relacionado à aula 7.9 — Segurança de serviços de rede: DNS, DHCP, NTP e logs.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Monitoramento de offset NTP e divergência de timezone."
      },
      {
        "name": "Port forwarding esquecido",
        "description": "Uma regra temporária de publicação permanece ativa depois do teste ou projeto.",
        "defensiveExplanation": "O serviço pode continuar exposto sem dono, sem patching e sem monitoramento adequado.",
        "mitigation": "Inventário, revisão periódica, data de expiração, firewall mínimo, logs e remoção de exceções antigas."
      }
    ],
    "mitigations": [
      "MFA e RBAC em provedores DNS e cloud.",
      "DNSSEC quando aplicável ao domínio público e validação no resolvedor quando viável.",
      "DHCP snooping, DAI, port security e 802.1X/NAC.",
      "ACLs para limitar quem pode consultar/servir DNS, DHCP, NTP e syslog.",
      "Syslog/SIEM centralizado com retenção, integridade e monitoramento de falha de ingestão.",
      "Revisão contínua de registros DNS e escopos DHCP.",
      "Monitoramento de offset NTP e divergência de timezone.",
      "Runbooks de resposta para comprometimento de DNS, DHCP rogue, falha NTP e perda de logs."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação.",
      "Não coletar logs de NAT/PAT e perder rastreabilidade de IP público compartilhado.",
      "Manter regras temporárias de NAT sem expiração."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "MFA e RBAC em provedores DNS e cloud.",
      "DNSSEC quando aplicável ao domínio público e validação no resolvedor quando viável.",
      "DHCP snooping, DAI, port security e 802.1X/NAC.",
      "ACLs para limitar quem pode consultar/servir DNS, DHCP, NTP e syslog.",
      "Syslog/SIEM centralizado com retenção, integridade e monitoramento de falha de ingestão.",
      "Revisão contínua de registros DNS e escopos DHCP.",
      "Monitoramento de offset NTP e divergência de timezone.",
      "Runbooks de resposta para comprometimento de DNS, DHCP rogue, falha NTP e perda de logs."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-7.9",
    "title": "Matriz defensiva para DNS, DHCP, NTP e logs",
    "labType": "security",
    "objective": "Criar uma matriz de riscos, fluxos autorizados, controles, comandos de validação e evidências para serviços fundamentais de rede.",
    "scenario": "Laboratório Neste laboratório você vai montar uma matriz defensiva para DNS, DHCP, NTP e logs em uma rede corporativa híbrida. O objetivo é identificar fluxos permitidos, fluxos bloqueados, fontes de evidência, riscos e controles de validação.",
    "topology": "Rede corporativa com VLAN de usuários, VLAN de servidores, rede de gerência, firewall, DNS interno, DHCP autorizado, NTP interno, coletor syslog/SIEM e integração cloud.",
    "architecture": "Clientes consultam DNS interno, recebem DHCP apenas de servidores autorizados, sincronizam tempo com NTP interno e enviam logs por agentes ou syslog para coletores. A saída para serviços externos é controlada por firewall e registrada.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 120,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Não execute spoofing, starvation, poisoning ou testes disruptivos em rede real sem autorização formal.",
      "Use laboratório, Packet Tracer, GNS3, EVE-NG ou ambiente isolado para simular falhas.",
      "Sanitize nomes internos, IPs públicos, domínios, usuários e evidências antes de compartilhar relatórios."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventariar serviços",
        "instruction": "Liste DNS, DHCP, NTP, coletores de logs e SIEM/NOC/SOC usados pela rede.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Cada serviço possui IP, zona/VLAN, dono, criticidade e dependências.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança de serviços de rede: DNS, DHCP, NTP e logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Mapear fluxos autorizados",
        "instruction": "Defina quem pode consultar DNS, receber DHCP, usar NTP e enviar logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fluxos possuem origem, destino, porta, protocolo, justificativa e controle.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança de serviços de rede: DNS, DHCP, NTP e logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Identificar fluxos proibidos",
        "instruction": "Liste comunicações que devem ser bloqueadas ou alertadas, como cliente usando DNS externo direto ou servidor DHCP em porta de usuário.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Há pelo menos um controle preventivo e um controle detectivo por risco.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança de serviços de rede: DNS, DHCP, NTP e logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Definir evidências",
        "instruction": "Para cada serviço, defina quais logs, eventos ou métricas provam funcionamento e abuso.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "A matriz inclui consulta DNS, lease DHCP, offset NTP, ingestão syslog e eventos de bloqueio.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança de serviços de rede: DNS, DHCP, NTP e logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Criar checklist de hardening",
        "instruction": "Inclua DHCP snooping, DAI, ACLs, RBAC, MFA, NTP interno, logs centralizados e revisão de registros DNS.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Checklist priorizado por criticidade e esforço.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança de serviços de rede: DNS, DHCP, NTP e logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Planejar resposta a incidente",
        "instruction": "Crie runbook para DNS alterado, DHCP rogue, NTP divergente e logs ausentes.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Runbook tem triagem, contenção, erradicação, recuperação e lições aprendidas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança de serviços de rede: DNS, DHCP, NTP e logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Validar com comandos",
        "instruction": "Monte uma lista de comandos para Windows, Linux, Cisco e cloud que valide cada serviço.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Há comandos para DNS, DHCP, NTP, syslog e rotas associadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Segurança de serviços de rede: DNS, DHCP, NTP e logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Adicionar verificação defensiva de NAT/PAT",
        "instruction": "Revise se existe alguma tradução de saída ou publicação de serviço sem dono, sem validade, sem log ou sem regra de firewall mínima.",
        "command": "show ip nat translations\nshow ip nat statistics\nshow running-config | include ip nat\n# Em cloud: consultar flow logs, NAT Gateway metrics e regras de firewall/security group",
        "expectedOutput": "Lista de traduções ou regras com dono, justificativa, origem, destino, porta, validade e logs associados.",
        "explanation": "NAT precisa entrar no inventário de segurança. Uma tradução não documentada é risco operacional e de investigação."
      }
    ],
    "expectedResult": "Ao final, você terá uma matriz defensiva executável para proteger serviços fundamentais e apoiar troubleshooting e investigação.",
    "validation": [
      {
        "check": "DNS interno e externo foram diferenciados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "DNS interno e externo foram diferenciados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "DHCP autorizado e proteção contra rogue foram descritos.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "DHCP autorizado e proteção contra rogue foram descritos.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "NTP possui fonte confiável e monitoramento de offset.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "NTP possui fonte confiável e monitoramento de offset.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Logs possuem centralização, retenção e controle de acesso.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Logs possuem centralização, retenção e controle de acesso.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Fluxos permitidos e proibidos foram documentados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Fluxos permitidos e proibidos foram documentados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Runbooks de incidente foram propostos.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Runbooks de incidente foram propostos.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "NAT possui logs e dono",
        "command": "Revisar SIEM/flow logs/configuração",
        "expected": "Cada regra NAT crítica tem dono, justificativa, retenção de logs e revisão periódica.",
        "ifFails": "Abrir tarefa de governança para documentar, reduzir ou remover a regra."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se um controle parece quebrar a rede, valide primeiro quais fluxos legítimos dependem dele.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se consultas DNS divergem, compare cache, resolvedor interno e autoridade.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se logs não aparecem, verifique rota, firewall, porta, relógio, agente e saúde do coletor.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se DHCP parece suspeito, compare gateway, DNS, lease e origem do servidor DHCP.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Automatizar verificação de registros DNS críticos.",
      "Criar alerta para DNS externo usado por clientes internos.",
      "Criar alerta para offset NTP acima do limite.",
      "Integrar DHCP/IPAM com CMDB e SIEM.",
      "Gerenciar DNS e políticas de logs por IaC."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Segurança de serviços de rede: DNS, DHCP, NTP e logs” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Incidente nos serviços fundamentais",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns."
  },
  "mentorQuestions": [
    "Qual serviço você considera mais crítico para investigação de incidentes: DNS, DHCP, NTP ou logs? Por quê?",
    "Como você detectaria um DHCP rogue sem executar ataque no ambiente?",
    "Quais logs seriam necessários para provar que um domínio interno foi resolvido para um IP inesperado?"
  ],
  "quiz": [
    {
      "question": "Qual risco está mais diretamente associado a um DHCP rogue?",
      "options": [
        "Cliente receber gateway ou DNS indevido",
        "Aumento de MTU",
        "Falha de ARP por TTL",
        "Expiração de certificado público"
      ],
      "answer": 0,
      "explanation": "Um servidor DHCP indevido pode entregar parâmetros de rede falsos, incluindo gateway e DNS."
    },
    {
      "question": "Por que NTP é importante para SIEM?",
      "options": [
        "Porque substitui DNS",
        "Porque criptografa logs automaticamente",
        "Porque permite correlação temporal confiável",
        "Porque bloqueia DHCP rogue"
      ],
      "answer": 2,
      "explanation": "Sem tempo consistente, eventos de fontes diferentes podem ficar fora de ordem."
    },
    {
      "question": "Qual controle ajuda a impedir respostas DHCP em portas de usuário?",
      "options": [
        "CNAME",
        "DHCP snooping",
        "TTL baixo",
        "MX prioritário"
      ],
      "answer": 1,
      "explanation": "DHCP snooping diferencia portas confiáveis e não confiáveis para mensagens DHCP."
    },
    {
      "question": "Qual problema pode surgir com CNAME órfão apontando para SaaS desativado?",
      "options": [
        "Subdomain takeover",
        "Aumento de jitter",
        "Loop STP",
        "Falha de APIPA"
      ],
      "answer": 0,
      "explanation": "Se o destino puder ser reivindicado por outra pessoa, o subdomínio pode ser tomado."
    },
    {
      "question": "Qual prática melhora a confiabilidade de logs após comprometimento de um host?",
      "options": [
        "Manter logs apenas locais",
        "Desativar NTP",
        "Enviar logs para coletor central com retenção",
        "Usar gateway como DNS"
      ],
      "answer": 2,
      "explanation": "Logs centralizados reduzem risco de perda local e ajudam investigação."
    },
    {
      "question": "Qual fluxo costuma ser controlado para evitar bypass de política DNS?",
      "options": [
        "Clientes consultando DNS externo direto",
        "Servidores usando gateway local",
        "Switch enviando BPDU",
        "Host usando ARP para gateway"
      ],
      "answer": 0,
      "explanation": "Permitir DNS externo direto pode reduzir visibilidade e permitir bypass de filtros internos."
    },
    {
      "id": "q7.9.nat.1",
      "type": "segurança",
      "q": "Qual controle é essencial quando muitos hosts saem para Internet pelo mesmo PAT?",
      "opts": [
        "Logs de NAT correlacionados com DHCP, firewall e NTP.",
        "Desativar DNS interno.",
        "Remover todas as rotas internas.",
        "Assumir que o IP público identifica o usuário."
      ],
      "a": 0,
      "exp": "Com PAT, o IP público é compartilhado. Rastreabilidade depende de logs de tradução, lease, política e horário confiável.",
      "difficulty": "intermediário",
      "topic": "nat logs"
    }
  ],
  "flashcards": [
    {
      "front": "O que é DHCP rogue?",
      "back": "Servidor DHCP não autorizado entregando configuração de rede a clientes."
    },
    {
      "front": "Por que NTP afeta segurança?",
      "back": "Porque autenticação, certificados, logs e investigação dependem de tempo confiável."
    },
    {
      "front": "O que DHCP snooping protege?",
      "back": "Protege contra respostas DHCP indevidas em portas não confiáveis."
    },
    {
      "front": "O que é subdomain takeover?",
      "back": "Tomada de um subdomínio que aponta para recurso externo abandonado ou reivindicável."
    },
    {
      "front": "Por que centralizar logs?",
      "back": "Para preservar evidências, correlacionar eventos e reduzir perda por falha ou adulteração local."
    },
    {
      "front": "O que é DNS hijacking?",
      "back": "Alteração ou desvio indevido da resolução de nomes para destinos controlados ou incorretos."
    },
    {
      "id": "fc7.9.nat.1",
      "front": "Qual risco de segurança existe em PAT sem logs?",
      "back": "Não conseguir identificar qual host interno usou determinado IP público/porta em um horário específico.",
      "tags": [
        "nat",
        "logs",
        "soc"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "title": "Classifique riscos",
      "prompt": "Associe DNS hijacking, DHCP rogue, drift NTP e ausência de logs aos seus sintomas e controles principais.",
      "expectedAnswer": "DNS: destino errado; DHCP: gateway/DNS falso; NTP: logs/auth incoerentes; logs: falta de evidência."
    },
    {
      "title": "Desenhe fluxos",
      "prompt": "Crie uma matriz com origem, destino, porta e justificativa para DNS, DHCP, NTP e syslog.",
      "expectedAnswer": "A matriz deve evitar any-any e definir fluxos mínimos por zona."
    },
    {
      "title": "Planeje monitoramento",
      "prompt": "Defina três alertas úteis para serviços fundamentais.",
      "expectedAnswer": "Exemplos: DHCP rogue detectado, offset NTP alto, cliente usando DNS externo, queda de ingestão syslog."
    },
    {
      "title": "Revise uma zona DNS",
      "prompt": "Liste registros que merecem revisão periódica em uma zona pública.",
      "expectedAnswer": "NS, MX, TXT, CNAME, registros de validação SaaS, subdomínios temporários e entradas antigas."
    }
  ],
  "challenge": {
    "title": "Incidente nos serviços fundamentais",
    "scenario": "Após uma manutenção, usuários relatam acesso instável a sistemas internos. Alguns resolvem nomes para IPs públicos, outros recebem DNS diferente por DHCP, controladores mostram horário divergente e o SIEM parou de receber logs de dois switches.",
    "tasks": [
      "Criar hipótese inicial para cada sintoma.",
      "Definir quais evidências coletar sem executar ações destrutivas.",
      "Propor contenção imediata para DHCP e DNS.",
      "Restaurar confiança em NTP e logs.",
      "Criar plano preventivo para evitar recorrência."
    ],
    "rubric": [
      "Identifica a fonte de confiança de cada serviço.",
      "Separa falha operacional de suspeita de segurança.",
      "Prioriza contenção sem destruir evidências.",
      "Propõe controles preventivos e detectivos.",
      "Inclui comunicação e documentação de mudança."
    ]
  },
  "commentedSolution": {
    "overview": "A solução deve começar restaurando serviços confiáveis e coletando evidências. Primeiro confirme DHCP recebido pelos clientes afetados, DNS consultado, resposta autoritativa, fonte NTP e ingestão de logs. Depois contenha servidores indevidos, force clientes para resolvedores autorizados, corrija NTP e reestabeleça syslog.",
    "steps": [
      "Comparar ipconfig/resolvectl de clientes afetados e não afetados.",
      "Verificar leases DHCP, origem do servidor e eventos de snooping/NAC.",
      "Consultar DNS interno, externo e autoritativo para os nomes críticos.",
      "Validar offset NTP em servidores, controladores, firewalls e switches.",
      "Checar saúde dos coletores e última ingestão de logs por fonte.",
      "Aplicar contenção: bloquear DHCP indevido, restringir DNS externo, corrigir NTP, restaurar syslog.",
      "Registrar causa raiz, impacto, evidências e ações preventivas."
    ],
    "keyTakeaway": "Sem confiança em DNS, DHCP, NTP e logs, a rede perde direção, identidade, tempo e memória. Segurança desses serviços é pré-requisito para operação confiável."
  },
  "glossary": [
    {
      "term": "DNS hijacking",
      "definition": "Desvio indevido de resolução DNS para destino incorreto ou controlado."
    },
    {
      "term": "DHCP rogue",
      "definition": "Servidor DHCP não autorizado respondendo clientes na rede."
    },
    {
      "term": "DHCP snooping",
      "definition": "Recurso de switch que controla quais portas podem enviar respostas DHCP."
    },
    {
      "term": "NTP drift",
      "definition": "Desvio gradual do relógio em relação a uma fonte confiável."
    },
    {
      "term": "Syslog centralizado",
      "definition": "Envio de logs para coletor central para retenção, análise e correlação."
    },
    {
      "term": "Subdomain takeover",
      "definition": "Tomada de subdomínio que aponta para recurso externo abandonado ou reivindicável."
    },
    {
      "term": "Retenção de logs",
      "definition": "Tempo e política de armazenamento de eventos para operação, auditoria e investigação."
    },
    {
      "term": "SIEM",
      "definition": "Plataforma que coleta, normaliza, correlaciona e alerta eventos de segurança."
    },
    {
      "term": "Log de NAT",
      "shortDefinition": "Registro que relaciona origem privada, origem traduzida, destino, porta e horário.",
      "longDefinition": "Evidência usada para rastrear conexões que atravessam NAT/PAT, especialmente quando muitos hosts compartilham um endereço público.",
      "example": "192.168.10.50:51514 traduzido para 203.0.113.10:40001 às 10:35.",
      "relatedTerms": [
        "PAT",
        "DHCP",
        "NTP",
        "SIEM"
      ],
      "relatedLessons": [
        "7.8",
        "7.9",
        "15.6"
      ]
    }
  ],
  "references": [
    {
      "title": "RFC 1034 e RFC 1035 — Domain Names",
      "type": "rfc"
    },
    {
      "title": "RFC 2131 — Dynamic Host Configuration Protocol",
      "type": "rfc"
    },
    {
      "title": "RFC 5905 — Network Time Protocol Version 4",
      "type": "rfc"
    },
    {
      "title": "RFC 5424 — The Syslog Protocol",
      "type": "rfc"
    },
    {
      "title": "Guias de fornecedores Cisco, Microsoft, Linux e cloud sobre DNS, DHCP, NTP, logs e hardening",
      "type": "vendor-doc"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, IaC e operação",
      "reason": "Logs, DNS por código, policy as code e monitoramento são práticas diretas de DevSecOps."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Autenticação, auditoria e investigação",
      "reason": "Tempo confiável e logs íntegros são base para autenticação, trilha de auditoria e resposta a incidentes."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "architecture",
      "security",
      "lab",
      "challenge",
      "summary"
    ],
    "requiredQuizScore": 70,
    "requiredLabCompletion": true,
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "7.10"
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
