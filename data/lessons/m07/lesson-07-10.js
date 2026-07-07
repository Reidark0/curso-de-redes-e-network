export const lesson0710 = {
  "id": "7.10",
  "moduleId": "m07",
  "order": 10,
  "title": "Revisão prática: DNS, DHCP, NAT, NTP, logs e serviços essenciais",
  "subtitle": "Consolide DNS, DHCP, NAT/PAT, publicação de serviços, NTP, SNMP, syslog, segurança, troubleshooting e observabilidade em uma arquitetura corporativa híbrida.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "ligação/revisão",
  "xp": 280,
  "tags": [
    "redes",
    "serviços de rede",
    "dns",
    "dhcp",
    "ntp",
    "snmp",
    "syslog",
    "observabilidade",
    "segurança",
    "troubleshooting",
    "cloud",
    "devsecops",
    "siem",
    "noc",
    "soc",
    "revisão",
    "nat",
    "pat",
    "port forwarding",
    "cgnat",
    "hairpin nat",
    "egress"
  ],
  "prerequisites": [
    {
      "id": "7.1",
      "title": "Por que DNS existe",
      "reason": "Define a motivação da resolução de nomes."
    },
    {
      "id": "7.2",
      "title": "Hierarquia DNS, zonas e delegação",
      "reason": "Explica autoridade, zonas, NS e delegação."
    },
    {
      "id": "7.3",
      "title": "Resolução recursiva, autoritativa e cache",
      "reason": "Mostra o caminho real da consulta DNS."
    },
    {
      "id": "7.4",
      "title": "Registros DNS: A, AAAA, CNAME, MX, TXT, NS, SRV e PTR",
      "reason": "Apresenta os tipos de registros usados em produção."
    },
    {
      "id": "7.5",
      "title": "TTL, cache DNS e troubleshooting de nomes",
      "reason": "Ensina diagnóstico de cache e mudança DNS."
    },
    {
      "id": "7.6",
      "title": "DHCP profundo e integração com DNS",
      "reason": "Explica configuração automática, leases, reservas e DDNS."
    },
    {
      "id": "7.7",
      "title": "NTP: tempo como dependência crítica",
      "reason": "Conecta horário correto a logs, autenticação e auditoria."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.9",
      "title": "Segurança de serviços de rede: DNS, DHCP, NAT, NTP e logs",
      "reason": "Consolida riscos e controles defensivos de DNS, DHCP, NAT, NTP e logs."
    },
    {
      "id": "7.8",
      "title": "NAT, PAT, publicação de serviços e CGNAT",
      "reason": "A revisão integrada agora inclui tradução de endereços, publicação, egress e rastreabilidade."
    }
  ],
  "objectives": [
    "Desenhar uma arquitetura corporativa mínima para DNS, DHCP, NTP, SNMP e syslog.",
    "Separar falhas de nome, endereço, rota, porta, horário, aplicação e observabilidade.",
    "Construir uma matriz de serviços essenciais com donos, fluxos, dependências, controles e evidências.",
    "Validar DNS, DHCP, NTP e logs usando comandos em Windows, Linux, Cisco e cloud.",
    "Relacionar serviços fundamentais com segurança, SIEM, DevSecOps, cloud e continuidade operacional.",
    "Preparar o aluno para o próximo módulo, onde TCP, UDP e portas serão estudados em profundidade.",
    "Integrar NAT/PAT, port forwarding, hairpin NAT e CGNAT ao desenho de serviços essenciais.",
    "Criar um runbook que diferencie falha de DNS, DHCP, rota, NAT, firewall, NTP, logs e aplicação."
  ],
  "learningOutcomes": [
    "Explicar por que uma rede pode estar roteada corretamente e ainda falhar por DNS, DHCP, NTP ou logs.",
    "Ler uma topologia e identificar serviços fundamentais ausentes, inseguros ou mal posicionados.",
    "Diagnosticar resolução de nomes, leases DHCP, sincronização de tempo e envio de logs com método.",
    "Propor controles de segurança para DNS, DHCP, NTP, SNMP e syslog sem quebrar operação.",
    "Documentar evidências de troubleshooting de forma útil para NOC, SOC, auditoria e sustentação.",
    "Dado um cenário híbrido, o aluno desenha DNS/DHCP/NAT/NTP/logs com validação e evidências.",
    "Dado um problema de publicação de serviço, o aluno separa DNS, DNAT, firewall, rota de retorno e serviço escutando."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Até aqui, você viu vários serviços que parecem simples quando estudados isoladamente: DNS resolve nomes, DHCP entrega IP, NTP ajusta horário, SNMP coleta métricas e syslog envia logs. Em uma rede corporativa real, esses serviços formam a base silenciosa da operação. Quando eles falham, quase tudo parece falhar junto.</p>\n  <p>Um usuário pode dizer que “a Internet caiu” quando, na verdade, o DNS corporativo não responde. Um servidor pode parecer comprometido porque logs aparecem fora de ordem, quando o problema real é NTP. Uma estação pode perder acesso porque recebeu gateway errado por DHCP. Um SOC pode não enxergar um incidente porque switches e firewalls não enviam logs centralizados.</p>\n  <div class='callout callout--problem'><strong>Ideia central:</strong> serviços essenciais de rede são dependências de operação, segurança, auditoria e troubleshooting. Eles não são acessórios; são infraestrutura crítica.</div>\n</section>\n<p>Nesta revisão, NAT/PAT passa a ser tratado como serviço essencial de borda. Sem ele, usuários podem perder saída para Internet, sub-redes privadas de cloud podem ficar sem atualização, serviços publicados podem falhar e investigações podem perder rastreabilidade.</p>",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>Redes pequenas podiam funcionar com configuração manual: hosts files para nomes, IPs fixos, relógios ajustados manualmente e pouca necessidade de telemetria. Esse modelo quebrou quando redes cresceram, usuários se movimentaram, serviços passaram a ser distribuídos, e empresas começaram a depender de logs, autenticação centralizada, certificados e auditoria.</p>\n  <p>O DNS substituiu listas manuais de nomes por uma hierarquia distribuída. O DHCP automatizou a configuração de hosts. O NTP tornou o tempo consistente entre sistemas. SNMP e syslog criaram uma base para operação e observabilidade. Com cloud, DevSecOps e segurança moderna, esses serviços passaram a ser também objetos de governança, automação, monitoramento e resposta a incidentes.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema é que serviços essenciais são frequentemente tratados como “configuração básica”, mas na prática eles definem se a rede é operável. Uma rota correta não ajuda se o nome resolve para IP errado. Um firewall bem configurado não ajuda se o cliente recebeu DNS malicioso. Um SIEM caro não ajuda se os logs chegam sem horário confiável. Um dashboard bonito não ajuda se SNMP usa community string pública exposta.</p>\n  <p>Outro problema é a falta de visão sistêmica. DNS depende de rota e firewall. DHCP depende de broadcast local ou relay. NTP depende de fonte confiável e política de saída. Syslog depende de tempo correto, transporte, retenção e controle de acesso. SNMP depende de versão segura, escopo e credenciais. Quando algo falha, o diagnóstico precisa separar cada dependência.</p>\n  <div class='callout callout--warning'><strong>Erro comum:</strong> investigar aplicação antes de confirmar IP, DNS, rota, tempo e logs. Isso aumenta o tempo de resolução e gera hipóteses erradas.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <ol class='flow-list'>\n    <li><strong>Configuração manual:</strong> IPs fixos, nomes locais e pouca escala.</li>\n    <li><strong>DNS corporativo:</strong> nomes internos e externos com autoridade e cache.</li>\n    <li><strong>DHCP:</strong> entrega automática de IP, máscara, gateway, DNS e opções.</li>\n    <li><strong>NTP:</strong> horário consistente para logs, autenticação e certificados.</li>\n    <li><strong>SNMP e syslog:</strong> telemetria e eventos centralizados para NOC e SOC.</li>\n    <li><strong>Cloud e DevSecOps:</strong> DNS privado, DHCP gerenciado, logs como serviço, IaC e policy as code.</li>\n    <li><strong>Segurança moderna:</strong> hardening, segmentação, detecção, resposta e governança de mudanças.</li>\n  </ol>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p>Serviços essenciais de rede são funções compartilhadas que permitem que hosts encontrem serviços, recebam configuração, mantenham horário confiável e produzam evidências operacionais. Eles sustentam a camada de operação acima de Ethernet, IPv4 e roteamento.</p>\n  <div class='definition-box'>\n    <p><strong>DNS:</strong> traduz nomes em informações úteis, como endereços IP, servidores de e-mail e registros de validação.</p>\n    <p><strong>DHCP:</strong> entrega configuração de rede automaticamente.</p>\n    <p><strong>NTP:</strong> sincroniza tempo entre sistemas.</p>\n    <p><strong>SNMP e syslog:</strong> permitem observar estado, eventos e falhas.</p>\n  </div>\n  <table class='comparison-table'>\n    <thead><tr><th>Serviço</th><th>Problema que resolve</th><th>Falha típica</th><th>Controle essencial</th></tr></thead>\n    <tbody>\n      <tr><td>DNS</td><td>Encontrar serviços por nome.</td><td>Nome resolve errado ou não resolve.</td><td>Autoridade, TTL, validação e monitoramento.</td></tr>\n      <tr><td>DHCP</td><td>Configurar hosts automaticamente.</td><td>APIPA, gateway errado, escopo esgotado.</td><td>DHCP snooping, reservas e IPAM.</td></tr>\n      <tr><td>NTP</td><td>Manter tempo consistente.</td><td>Logs fora de ordem, Kerberos/TLS falhando.</td><td>Fontes confiáveis e hierarquia interna.</td></tr>\n      <tr><td>SNMP</td><td>Coletar métricas e traps.</td><td>Sem visibilidade de falhas.</td><td>SNMPv3, escopo e credenciais fortes.</td></tr>\n      <tr><td>Syslog</td><td>Centralizar eventos.</td><td>Sem evidência no incidente.</td><td>Retenção, integridade, RBAC e SIEM.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um cliente corporativo liga, ele pode depender de vários serviços antes mesmo de abrir uma aplicação. Primeiro, obtém configuração via DHCP: IP, máscara, gateway, DNS, domínio de busca e lease. Depois, sincroniza o relógio com NTP ou serviço equivalente. Ao acessar uma aplicação, consulta DNS para descobrir o endereço. O tráfego segue pelas rotas e políticas estudadas no módulo anterior. Durante todo o processo, equipamentos e sistemas devem gerar logs e métricas para observabilidade.</p>\n  <p>Essa cadeia cria dependências. Se DHCP entrega DNS errado, a resolução falha ou vai para destino indevido. Se DNS resolve para IP antigo por cache, o usuário acessa serviço incorreto. Se NTP está fora, logs perdem valor investigativo. Se syslog não chega ao coletor, o SOC fica cego. Se SNMP está inseguro, metadados de rede podem vazar.</p>\n  <ol class='flow-list'>\n    <li>Cliente recebe configuração ou usa configuração estática.</li>\n    <li>Cliente aprende DNS, gateway, domínio de busca e lease.</li>\n    <li>Cliente sincroniza tempo ou herda tempo do sistema.</li>\n    <li>Aplicação consulta nome via resolvedor configurado.</li>\n    <li>Rota, firewall e políticas autorizam ou bloqueiam o fluxo.</li>\n    <li>Equipamentos registram eventos em syslog, SIEM, NOC ou plataforma de observabilidade.</li>\n    <li>Operação e segurança usam evidências para diagnosticar e responder.</li>\n  </ol>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma arquitetura corporativa saudável centraliza serviços essenciais sem criar ponto único cego. Clientes devem usar resolvedores DNS internos ou aprovados. DHCP deve ser autorizado e controlado por VLAN, relay e escopos documentados. NTP deve apontar para fontes internas confiáveis, que por sua vez sincronizam com fontes externas aprovadas. Logs devem ir para coletores centrais, com retenção e acesso controlado. Métricas devem alimentar NOC, SOC e alertas úteis.</p>\n  <p>Em ambientes híbridos, DNS privado precisa resolver nomes de VPC/VNet, datacenter e serviços internos. DHCP pode ser gerenciado pela cloud em sub-redes virtuais. NTP pode vir do provedor ou de hierarquia interna. Logs devem convergir para SIEM ou data lake. Tudo isso deve estar documentado, versionado e revisado.</p>\n  <table class='data-table'>\n    <thead><tr><th>Componente</th><th>Posicionamento recomendado</th><th>Observação operacional</th></tr></thead>\n    <tbody>\n      <tr><td>DNS interno</td><td>Rede de serviços/infra</td><td>Permitir consultas de clientes autorizados e encaminhamento controlado.</td></tr>\n      <tr><td>DHCP</td><td>Servidor autorizado ou serviço gerenciado</td><td>Usar relay para VLANs e registrar leases no IPAM.</td></tr>\n      <tr><td>NTP</td><td>Hierarquia interna</td><td>Evitar cada host consultando fontes aleatórias na Internet.</td></tr>\n      <tr><td>Syslog/SIEM</td><td>Zona de observabilidade</td><td>Receber logs de firewalls, switches, servidores e serviços críticos.</td></tr>\n      <tr><td>SNMP/telemetria</td><td>Coletor restrito</td><td>Preferir SNMPv3 e limitar origem/destino.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma empresa física. O DNS é a recepção que sabe onde cada pessoa ou sala está. O DHCP é o setor que entrega crachá, mesa e ramal ao funcionário. O NTP é o relógio oficial da empresa: sem ele, todos registram acontecimentos em horários diferentes. O syslog é o livro de ocorrências central. O SNMP é o painel que mostra temperatura, energia, portas abertas e alarmes do prédio.</p>\n  <p>A analogia tem limite: redes não têm apenas pessoas bem-intencionadas. Um invasor pode tentar enganar a recepção, entregar crachás falsos, alterar relógios ou apagar registros. Por isso, esses serviços precisam de controle, segmentação, autenticação, monitoramento e governança.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Um notebook conecta no Wi-Fi corporativo. Ele recebe IP por DHCP, DNS interno e gateway. Ao acessar <code>intranet.empresa.local</code>, consulta o DNS. O DNS retorna o IP do servidor. O notebook usa o gateway para chegar à rede de servidores. O firewall permite o acesso. O servidor e o firewall registram logs com horário sincronizado por NTP. O NOC vê métricas do switch/AP e o SOC consegue correlacionar eventos.</p>\n  <p>Se qualquer parte falhar, o sintoma pode ser “a intranet não abre”. O diagnóstico correto separa: IP foi entregue? DNS resolve? A rota existe? A porta responde? O TLS está válido? Os logs aparecem no SIEM?</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa possui matriz, filial e datacenter. Clientes da filial recebem DHCP local, mas DNS aponta para resolvedores corporativos redundantes. O DNS usa split horizon: nomes internos resolvem para IPs privados; nomes públicos resolvem externamente. NTP é sincronizado por controladores de domínio ou servidores internos. Firewalls, switches, servidores, VPN e aplicações enviam logs para SIEM.</p>\n  <p>Nesse desenho, uma queda do DNS interno pode parecer queda geral da rede. Um escopo DHCP esgotado impede novos acessos. NTP fora de sincronia pode quebrar Kerberos e gerar falsos positivos em incidentes. Syslog interrompido deixa o SOC sem evidência. Por isso, serviços essenciais têm alta criticidade mesmo quando não aparecem para o usuário final.</p>\n</section>\n<p>No desenho empresarial final, inclua a matriz de NAT: quais redes fazem egress, quais serviços são publicados, qual IP público é usado, qual porta, qual regra de firewall acompanha a tradução, qual equipe é dona da regra e onde os logs são coletados.</p>",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, VPCs e VNets normalmente oferecem DNS privado, DHCP implícito, route tables, logs de fluxo e integração com serviços gerenciados. Porém, isso não elimina desenho. É preciso decidir zonas privadas, forwarding DNS para datacenter, resolução de private endpoints, logs obrigatórios, retenção, integração com SIEM e regras de saída para NTP ou serviços equivalentes.</p>\n  <p>Um erro comum é criar ambientes com DNS privado funcional, mas sem forwarders para o ambiente on-premises. Outro erro é permitir que workloads usem resolvedores externos, perdendo visibilidade e controle. Em arquitetura híbrida, DNS e rotas precisam ser planejados juntos.</p>\n</section>\n<p>Em cloud, a revisão deve incluir NAT Gateway ou firewall de egress para sub-redes privadas, custos de processamento/saída, alternativas como private endpoints e política de limpeza de recursos em laboratório.</p>",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines dependem de DNS para baixar dependências, resolver registries, emitir certificados e acessar APIs. Ambientes efêmeros precisam de registros temporários, TTL adequado e limpeza automática. Infraestrutura como código pode criar zonas DNS, records, regras de firewall, log sinks e políticas de retenção.</p>\n  <p>O risco é transformar automação em fábrica de dívida operacional: registros órfãos, TXT antigos de validação, CNAME apontando para SaaS removido, logs sem retenção, DNS privado sem dono e DHCP/IPAM fora da verdade do repositório. DevSecOps deve tratar serviços essenciais como código revisável, auditável e testável.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Em segurança defensiva, serviços essenciais são fonte de controle e evidência. DNS mostra domínios consultados. DHCP ajuda a mapear IP para MAC e usuário/dispositivo. NTP dá coerência temporal. Syslog e SIEM preservam eventos. SNMP e telemetria indicam quedas, saturação e anomalias.</p>\n  <p>Ao mesmo tempo, são alvos. DNS pode ser usado para exfiltração. DHCP rogue pode entregar gateway malicioso. NTP exposto pode participar de abuso de amplificação. SNMP fraco pode vazar inventário. Logs sem integridade podem ser apagados ou manipulados. A defesa exige segmentação, hardening, autenticação, monitoramento e resposta.</p>\n  <div class='callout callout--security'><strong>Regra defensiva:</strong> nenhum serviço essencial deve ser exposto, confiado ou alterado sem dono, escopo, controle de acesso, logs e processo de mudança.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m07l10-title m07l10-desc'>\n    <title id='m07l10-title'>Arquitetura integrada de serviços essenciais de rede</title>\n    <desc id='m07l10-desc'>Clientes recebem DHCP, consultam DNS, sincronizam NTP e enviam evidências para observabilidade e SIEM.</desc>\n    <defs>\n      <marker id='m07l10-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow'></path>\n      </marker>\n    </defs>\n    <rect x='30' y='40' width='180' height='90' rx='14' class='svg-node svg-node--client'></rect>\n    <text x='120' y='78' text-anchor='middle' class='svg-label'>Clientes</text>\n    <text x='120' y='104' text-anchor='middle' class='svg-label svg-label--small'>usuários • servidores • IoT</text>\n\n    <rect x='285' y='35' width='170' height='85' rx='14' class='svg-node svg-node--server'></rect>\n    <text x='370' y='68' text-anchor='middle' class='svg-label'>DHCP/IPAM</text>\n    <text x='370' y='94' text-anchor='middle' class='svg-label svg-label--small'>lease • reserva • DNS</text>\n\n    <rect x='285' y='155' width='170' height='85' rx='14' class='svg-node svg-node--server'></rect>\n    <text x='370' y='188' text-anchor='middle' class='svg-label'>DNS interno</text>\n    <text x='370' y='214' text-anchor='middle' class='svg-label svg-label--small'>cache • zona • forward</text>\n\n    <rect x='285' y='275' width='170' height='85' rx='14' class='svg-node svg-node--server'></rect>\n    <text x='370' y='308' text-anchor='middle' class='svg-label'>NTP</text>\n    <text x='370' y='334' text-anchor='middle' class='svg-label svg-label--small'>tempo confiável</text>\n\n    <rect x='545' y='155' width='170' height='90' rx='14' class='svg-node svg-node--firewall'></rect>\n    <text x='630' y='188' text-anchor='middle' class='svg-label'>Firewall / Roteador</text>\n    <text x='630' y='214' text-anchor='middle' class='svg-label svg-label--small'>rotas • política • NAT</text>\n\n    <rect x='775' y='60' width='165' height='90' rx='14' class='svg-node svg-node--cloud'></rect>\n    <text x='857' y='94' text-anchor='middle' class='svg-label'>Cloud / SaaS</text>\n    <text x='857' y='120' text-anchor='middle' class='svg-label svg-label--small'>DNS privado • logs</text>\n\n    <rect x='775' y='245' width='165' height='90' rx='14' class='svg-node svg-node--security'></rect>\n    <text x='857' y='278' text-anchor='middle' class='svg-label'>SIEM / Observabilidade</text>\n    <text x='857' y='304' text-anchor='middle' class='svg-label svg-label--small'>syslog • SNMP • alertas</text>\n\n    <rect x='85' y='415' width='810' height='95' rx='16' class='svg-zone'></rect>\n    <text x='490' y='446' text-anchor='middle' class='svg-label'>Matriz de validação</text>\n    <text x='490' y='474' text-anchor='middle' class='svg-label svg-label--small'>IP recebido • DNS resolve • rota existe • porta responde • tempo coerente • logs chegam</text>\n\n    <line x1='210' y1='80' x2='285' y2='78' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l10-arrow)'></line>\n    <line x1='210' y1='92' x2='285' y2='195' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l10-arrow)'></line>\n    <line x1='210' y1='104' x2='285' y2='316' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l10-arrow)'></line>\n    <line x1='455' y1='198' x2='545' y2='198' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l10-arrow)'></line>\n    <line x1='715' y1='186' x2='775' y2='110' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l10-arrow)'></line>\n    <line x1='455' y1='318' x2='775' y2='290' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l10-arrow)'></line>\n    <line x1='630' y1='245' x2='775' y2='290' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l10-arrow)'></line>\n    <line x1='120' y1='130' x2='775' y2='290' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l10-arrow)'></line>\n\n    <text x='245' y='63' text-anchor='middle' class='svg-label svg-label--small'>DHCP</text>\n    <text x='250' y='170' text-anchor='middle' class='svg-label svg-label--small'>DNS</text>\n    <text x='250' y='286' text-anchor='middle' class='svg-label svg-label--small'>NTP</text>\n    <text x='735' y='258' text-anchor='middle' class='svg-label svg-label--small'>logs/métricas</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios integram diagnóstico de nomes, configuração IP, tempo, logs e telemetria. A intenção é treinar investigação por hipótese, não decorar comandos isolados.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário com matriz, filial, cloud, servidores internos e usuários. Seu trabalho será desenhar a arquitetura dos serviços essenciais, definir fluxos permitidos, controles, evidências e runbook de troubleshooting.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução comentada apresenta uma forma de organizar os serviços com foco em disponibilidade, segurança, investigação e governança. Não é a única resposta possível, mas cada decisão precisa ser justificável.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>DNS, DHCP, NTP, SNMP e syslog são serviços fundamentais porque sustentam resolução de nomes, configuração automática, tempo confiável, métricas e evidências. Uma rede pode ter Ethernet, IPv4, subnetting e roteamento corretos, mas ainda ser inoperável se esses serviços estiverem quebrados ou inseguros.</p>\n  <p>Ao terminar este módulo, você deve conseguir perguntar: o host recebeu IP correto? O DNS resolve no lugar certo? O cache está coerente? O tempo está sincronizado? Os logs chegam ao SIEM? A telemetria mostra o estado real? Existem controles para impedir abuso desses serviços?</p>\n</section>\n<ul><li><strong>Integração NAT:</strong> DNS aponta, rota entrega, NAT traduz, firewall decide, serviço responde e logs provam.</li><li><strong>Publicação segura:</strong> port forwarding sem segurança ao redor não é arquitetura aceitável.</li><li><strong>Troubleshooting:</strong> sempre colete evidência da tabela NAT junto com DNS, rota, porta e logs.</li></ul>",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>O próximo módulo avançará para <strong>TCP, UDP, portas e transporte</strong>. Depois de entender como nomes são resolvidos, IPs são entregues, tempo é sincronizado e logs são coletados, você estudará como aplicações conversam de fato por portas, conexões, sessões, retransmissões e fluxos.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Serviços de rede",
      "Camadas 3 a 7",
      "Operação",
      "Segurança",
      "Observabilidade"
    ],
    "beforeThisLesson": "O aluno estudou DNS, hierarquia, cache, registros, TTL, DHCP, NTP, SNMP, syslog e segurança dos serviços fundamentais.",
    "afterThisLesson": "O aluno estará pronto para estudar TCP, UDP, portas e transporte com visão operacional completa.",
    "dependsOnPreviousCourses": [
      "Este assunto depende de IPv4 e roteamento vistos nos Módulos 4 e 6 do curso Redes.",
      "Este assunto se conecta ao curso Infraestrutura Moderna, Platform Engineering e DevSecOps nos temas de IaC, observabilidade, pipelines e cloud.",
      "Este assunto se conecta ao curso Enterprise Identity/IAM nos temas de Kerberos, certificados, MFA, logs e evidência de autenticação."
    ]
  },
  "protocolFields": [
    {
      "field": "DNS 53/UDP e 53/TCP",
      "meaning": "Consultas e respostas de nomes, inclusive respostas grandes e transferências controladas",
      "example": "dig app.empresa.local A"
    },
    {
      "field": "DHCP 67/UDP e 68/UDP",
      "meaning": "Entrega automática de configuração IPv4",
      "example": "Discover, Offer, Request, ACK"
    },
    {
      "field": "NTP 123/UDP",
      "meaning": "Sincronização de horário",
      "example": "chronyc tracking"
    },
    {
      "field": "SNMP 161/UDP e 162/UDP",
      "meaning": "Polling e traps de gerenciamento",
      "example": "Coletor consulta OIDs do switch"
    },
    {
      "field": "Syslog 514/UDP ou TCP",
      "meaning": "Envio de eventos para coletor",
      "example": "Firewall envia deny logs"
    },
    {
      "field": "TTL DNS",
      "meaning": "Tempo pelo qual uma resposta pode permanecer em cache",
      "example": "300 segundos antes de mudança crítica"
    },
    {
      "field": "Lease DHCP",
      "meaning": "Tempo de validade da configuração entregue",
      "example": "Lease de 8 horas para rede de usuários"
    },
    {
      "field": "Timestamp",
      "meaning": "Marca temporal usada para correlação",
      "example": "Evento do firewall e autenticação alinhados no SIEM"
    }
  ],
  "packetFlow": [
    "Cliente conecta na rede e solicita configuração via DHCP ou usa configuração estática.",
    "DHCP entrega IP, máscara, gateway, DNS e opções adicionais.",
    "Cliente sincroniza o tempo com NTP interno ou fonte aprovada.",
    "Aplicação consulta DNS para resolver o nome do serviço.",
    "Resolvedor responde a partir de cache ou consulta servidores autoritativos/forwarders.",
    "Cliente usa a rota e o gateway adequados para acessar o IP resolvido.",
    "Firewall, roteador, servidor e aplicações geram logs e métricas.",
    "Syslog, agentes, SNMP ou telemetria enviam evidências para coletores, NOC e SIEM.",
    "Operação valida IP, DNS, rota, porta, tempo e logs para confirmar a hipótese.",
    "Segurança correlaciona eventos e identifica abuso, falha, desvio ou ausência de controle."
  ],
  "deepDive": {
    "title": "Checklist mental para serviços essenciais",
    "sections": [
      {
        "title": "1. Nome",
        "body": "O nome consultado é o certo? A zona é pública ou privada? O registro é A, CNAME, MX, TXT, NS, SRV ou PTR? Há cache interferindo?"
      },
      {
        "title": "2. Configuração",
        "body": "O host recebeu IP, máscara, gateway e DNS corretos? O lease está válido? Existe reserva ou conflito?"
      },
      {
        "title": "3. Tempo",
        "body": "O relógio está sincronizado? O offset compromete Kerberos, TLS, logs, MFA ou pipelines?"
      },
      {
        "title": "4. Observabilidade",
        "body": "O equipamento envia logs? As métricas chegam? O SIEM tem timestamp, origem, severidade e retenção?"
      },
      {
        "title": "5. Segurança",
        "body": "Serviços estão expostos apenas a origens necessárias? Há controles contra DNS externo indevido, DHCP rogue, NTP inseguro, SNMP fraco e logs manipuláveis?"
      },
      {
        "title": "6. Governança",
        "body": "Existe dono, documentação, mudança aprovada, rollback e evidência para auditoria?"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Trocar DNS sem mapear zonas privadas e forwarders.",
      "impact": "Serviços internos podem parar de resolver ou vazar nomes internos."
    },
    {
      "mistake": "Permitir qualquer resolvedor externo.",
      "impact": "Perda de visibilidade, bypass de controles e risco de exfiltração."
    },
    {
      "mistake": "Não monitorar escopos DHCP.",
      "impact": "Usuários começam a receber APIPA ou IPs conflitantes sem aviso prévio."
    },
    {
      "mistake": "Ignorar NTP até o incidente acontecer.",
      "impact": "Logs ficam fora de ordem e evidências perdem confiabilidade."
    },
    {
      "mistake": "Usar SNMPv2c com community string padrão.",
      "impact": "Vazamento de inventário e risco de abuso de gerenciamento."
    },
    {
      "mistake": "Centralizar logs sem validar retenção, integridade e acesso.",
      "impact": "O SIEM existe, mas não sustenta investigação ou auditoria."
    }
  ],
  "troubleshooting": {
    "method": "Diagnóstico em camadas: configuração IP, resolução DNS, rota, porta, tempo, aplicação e evidência.",
    "commands": [
      {
        "windows": [
          "ipconfig /all",
          "ipconfig /displaydns",
          "ipconfig /flushdns",
          "nslookup nome",
          "Resolve-DnsName nome",
          "w32tm /query /status",
          "Test-NetConnection host -Port 443",
          "Get-NetIPConfiguration"
        ],
        "linux": [
          "ip addr",
          "ip route",
          "resolvectl status",
          "dig nome",
          "dig +trace nome",
          "host nome",
          "chronyc tracking",
          "timedatectl",
          "logger teste-syslog",
          "ss -tulpen"
        ],
        "cisco": [
          "show ip dhcp binding",
          "show ip dhcp pool",
          "show logging",
          "show ntp status",
          "show ntp associations",
          "show snmp",
          "show running-config | include name-server|logging|ntp|snmp"
        ],
        "cloud": [
          "Validar private DNS zones",
          "Validar DHCP options set",
          "Validar route tables",
          "Validar flow logs",
          "Validar log sinks",
          "Validar security groups/NSGs/NACLs"
        ]
      }
    ],
    "decisionTree": [
      "O host tem IP, máscara, gateway e DNS corretos?",
      "O nome resolve no resolvedor esperado?",
      "A resposta vem do cache ou da autoridade?",
      "O IP resolvido é alcançável por rota?",
      "A porta da aplicação responde?",
      "O horário está sincronizado?",
      "Há logs no coletor/SIEM para a tentativa?",
      "O problema é de rede, nome, tempo, política, aplicação ou observabilidade?"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Revisão prática: serviços essenciais de rede corporativa.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ]
  },
  "security": {
    "goodPractices": [
      "Usar DNS interno controlado para clientes corporativos.",
      "Documentar zonas públicas, privadas, delegações e registros críticos.",
      "Aplicar DHCP snooping, IP Source Guard, DAI e NAC quando suportado.",
      "Usar fontes NTP internas confiáveis e monitorar offset.",
      "Preferir SNMPv3 e restringir origem/destino de gerenciamento.",
      "Centralizar logs com retenção, integridade, RBAC e alerta.",
      "Versionar alterações em DNS, DHCP options, log sinks e políticas com IaC quando possível.",
      "Criar runbooks de troubleshooting e resposta para serviços essenciais."
    ],
    "badPractices": [
      "Permitir resolvedores aleatórios em endpoints e servidores.",
      "Manter TXT antigos de validação SaaS sem inventário.",
      "Expor NTP, SNMP ou syslog sem necessidade.",
      "Aceitar DHCP em qualquer porta de usuário sem controle.",
      "Usar community string pública ou padrão.",
      "Não sincronizar tempo de firewalls, servidores e coletores.",
      "Guardar logs sem contexto, dono, timestamp confiável ou retenção."
    ],
    "threats": [
      "DNS hijacking",
      "Cache poisoning",
      "Subdomain takeover",
      "Exfiltração por DNS",
      "DHCP rogue",
      "DHCP starvation",
      "NTP spoofing",
      "SNMP information disclosure",
      "Log tampering",
      "Blind spots no SIEM"
    ],
    "mitigations": [
      "Segmentação e firewall para serviços essenciais.",
      "DNS filtering e logging.",
      "DHCP snooping e portas confiáveis.",
      "NTP autenticado ou fontes confiáveis internas quando suportado.",
      "SNMPv3, ACLs de gerenciamento e rotação de credenciais.",
      "TLS/syslog seguro quando aplicável.",
      "Retenção e integridade de logs.",
      "Monitoramento de alterações em zonas, escopos, opções DHCP e log pipelines."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Revisão prática: serviços essenciais de rede corporativa",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Segmentação e firewall para serviços essenciais.",
      "DNS filtering e logging.",
      "DHCP snooping e portas confiáveis.",
      "NTP autenticado ou fontes confiáveis internas quando suportado.",
      "SNMPv3, ACLs de gerenciamento e rotação de credenciais.",
      "TLS/syslog seguro quando aplicável.",
      "Retenção e integridade de logs.",
      "Monitoramento de alterações em zonas, escopos, opções DHCP e log pipelines."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    "Se uma aplicação não abre, qual sequência de validação evita pular direto para a hipótese errada?",
    "Qual é o risco de DNS externo livre em estações corporativas?",
    "Por que logs sem NTP confiável perdem valor em investigação?",
    "Como DHCP, DNS e IPAM se ajudam na resposta a incidentes?"
  ],
  "quiz": [
    {
      "question": "Qual serviço é responsável por entregar IP, máscara, gateway e DNS automaticamente?",
      "options": [
        "DNS",
        "DHCP",
        "NTP",
        "SNMP"
      ],
      "answer": 1,
      "explanation": "DHCP entrega parâmetros de configuração de rede aos clientes."
    },
    {
      "question": "Qual serviço é mais diretamente ligado à correlação temporal de logs?",
      "options": [
        "NTP",
        "CNAME",
        "ARP",
        "DHCP relay"
      ],
      "answer": 0,
      "explanation": "NTP mantém horários coerentes entre sistemas, permitindo correlação confiável."
    },
    {
      "question": "Qual risco está associado a CNAME órfão apontando para SaaS removido?",
      "options": [
        "Subdomain takeover",
        "APIPA",
        "Loop STP",
        "TTL do IP"
      ],
      "answer": 0,
      "explanation": "Um CNAME órfão pode permitir que outra pessoa reivindique o destino em certos serviços."
    },
    {
      "question": "Qual combinação ajuda a proteger contra DHCP rogue em switches?",
      "options": [
        "TTL baixo e MX",
        "DHCP snooping e portas confiáveis",
        "CNAME e PTR",
        "NTP e SPF"
      ],
      "answer": 1,
      "explanation": "DHCP snooping diferencia portas confiáveis e bloqueia respostas DHCP indevidas em portas de usuário."
    },
    {
      "question": "Por que SNMPv3 é preferível a SNMPv2c?",
      "options": [
        "Porque substitui DNS",
        "Porque usa BGP",
        "Porque oferece recursos de autenticação e privacidade",
        "Porque remove necessidade de logs"
      ],
      "answer": 2,
      "explanation": "SNMPv3 melhora segurança com autenticação e privacidade quando configurado corretamente."
    },
    {
      "question": "Qual validação ajuda a separar falha de DNS de falha de aplicação?",
      "options": [
        "Consultar o nome e depois testar a porta do IP resolvido",
        "Alterar a máscara aleatoriamente",
        "Desligar NTP",
        "Remover logs"
      ],
      "answer": 0,
      "explanation": "Resolver nome e testar conectividade/porta separa resolução de nomes de disponibilidade da aplicação."
    },
    {
      "id": "q7.10.nat.1",
      "type": "integração",
      "q": "Em um troubleshooting de serviço publicado, qual ordem de raciocínio é mais saudável?",
      "opts": [
        "DNS, rota, NAT/DNAT, firewall, serviço escutando, retorno e logs.",
        "Apenas trocar o DNS público.",
        "Apenas abrir todas as portas.",
        "Ignorar logs se o ping funcionar."
      ],
      "a": 0,
      "exp": "Serviço publicado depende de múltiplas camadas. Ping não prova porta, NAT, firewall, TLS ou aplicação.",
      "difficulty": "intermediário",
      "topic": "integração"
    }
  ],
  "flashcards": [
    {
      "front": "O que DNS resolve?",
      "back": "Nomes em registros úteis, como endereços IP, MX, TXT, NS, SRV e PTR."
    },
    {
      "front": "O que DHCP entrega?",
      "back": "IP, máscara, gateway, DNS, domínio de busca e outras opções de rede."
    },
    {
      "front": "Por que NTP é crítico?",
      "back": "Porque logs, autenticação, certificados, auditoria e investigação dependem de tempo confiável."
    },
    {
      "front": "Qual é o papel do syslog?",
      "back": "Transportar eventos e logs para coletores centrais."
    },
    {
      "front": "Por que SNMP exposto é perigoso?",
      "back": "Pode vazar inventário, interfaces, nomes, topologia e estado operacional."
    },
    {
      "front": "O que é troubleshooting por evidência?",
      "back": "Validar cada hipótese com comandos, logs e medições antes de concluir a causa."
    }
  ],
  "exercises": [
    {
      "title": "Diagnóstico de aplicação que não abre",
      "prompt": "Monte uma sequência de 8 verificações para diferenciar DNS, DHCP, rota, porta, tempo e logs.",
      "expectedAnswer": "Deve incluir ipconfig/ip addr, DNS, rota, teste de porta, NTP, logs e SIEM."
    },
    {
      "title": "Matriz de serviços essenciais",
      "prompt": "Crie uma matriz com DNS, DHCP, NTP, SNMP e syslog contendo porta, protocolo, origem, destino e controle.",
      "expectedAnswer": "Deve mapear fluxos e justificar cada permissão."
    },
    {
      "title": "Risco de mudança DNS",
      "prompt": "Explique como reduzir risco ao alterar IP de app.empresa.local.",
      "expectedAnswer": "Deve citar TTL, cache, consulta autoritativa, rollback, janela, validação e monitoramento."
    },
    {
      "title": "Segurança de observabilidade",
      "prompt": "Liste cinco riscos de observabilidade mal configurada.",
      "expectedAnswer": "Pode incluir SNMP fraco, logs sem retenção, tempo incorreto, falta de RBAC e ausência de alertas."
    }
  ],
  "challenge": {
    "title": "Desenhe serviços essenciais para uma empresa híbrida",
    "scenario": "A empresa possui matriz, filial, cloud, usuários, servidores internos, DMZ, VPN e SIEM. Hoje existem registros DNS manuais, DHCP sem IPAM, NTP inconsistente e logs incompletos.",
    "tasks": [
      "Propor arquitetura DNS interna/externa e split DNS.",
      "Definir DHCP, relay, escopos, reservas e IPAM.",
      "Definir hierarquia NTP e validação de offset.",
      "Definir fluxo de syslog, SNMP e ingestão no SIEM.",
      "Criar matriz de riscos e controles.",
      "Criar runbook para incidente de aplicação indisponível.",
      "Criar matriz NAT/PAT com egress, publicação de serviços, hairpin/split DNS, logs e rollback."
    ],
    "deliverables": [
      "Diagrama lógico",
      "Tabela de serviços",
      "Matriz de fluxos",
      "Checklist de validação",
      "Matriz de riscos",
      "Runbook"
    ],
    "rubric": [
      "Coerência técnica",
      "Segurança defensiva",
      "Operabilidade",
      "Evidências",
      "Clareza de documentação",
      "Preparação para auditoria"
    ],
    "expectedDeliverables": [
      "Matriz NAT/PAT e publicação segura",
      "Plano de rastreabilidade por logs de NAT/DHCP/NTP/firewall"
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução defensável separa serviços por função e zona, usa resolvedores internos, DHCP autorizado, NTP confiável, logs centralizados e telemetria protegida.",
    "steps": [
      "Criar DNS interno redundante com forwarders controlados e zonas privadas documentadas.",
      "Usar DHCP por escopo/VLAN com relay, reservas críticas, exclusões e integração IPAM/CMDB.",
      "Definir NTP interno e monitorar offset em servidores, rede, firewalls e coletores.",
      "Enviar logs de firewalls, switches, servidores, DNS, DHCP, VPN e cloud para SIEM.",
      "Usar SNMPv3 ou telemetria segura restrita à rede de gerência.",
      "Criar alertas para falha DNS, escopo DHCP esgotando, NTP drift, perda de logs e alteração de registros críticos.",
      "Documentar rollback e validação para mudanças DNS/DHCP/NTP/logging."
    ],
    "why": "A proposta reduz pontos cegos, evita dependências implícitas, preserva evidências e melhora a capacidade de diagnóstico e resposta a incidentes."
  },
  "glossary": [
    {
      "term": "Serviços essenciais",
      "definition": "Funções de rede usadas por muitos sistemas, como DNS, DHCP, NTP, SNMP e syslog."
    },
    {
      "term": "Split DNS",
      "definition": "Modelo em que o mesmo nome ou domínio pode ter respostas diferentes em contexto interno e externo."
    },
    {
      "term": "IPAM",
      "definition": "Gestão de endereçamento IP, escopos, reservas, donos e uso."
    },
    {
      "term": "SIEM",
      "definition": "Plataforma de coleta, correlação e análise de eventos de segurança."
    },
    {
      "term": "NOC",
      "definition": "Centro de operação focado em disponibilidade e desempenho."
    },
    {
      "term": "SOC",
      "definition": "Centro de operação focado em detecção, análise e resposta a incidentes de segurança."
    },
    {
      "term": "Syslog",
      "definition": "Formato/protocolo comum para envio de eventos e logs."
    },
    {
      "term": "SNMPv3",
      "definition": "Versão do SNMP com recursos de autenticação e privacidade."
    }
  ],
  "references": [
    "RFC 1034 — Domain Names: Concepts and Facilities",
    "RFC 1035 — Domain Names: Implementation and Specification",
    "RFC 2131 — Dynamic Host Configuration Protocol",
    "RFC 5905 — Network Time Protocol Version 4",
    "RFC 5424 — The Syslog Protocol",
    "RFC 3411 — SNMP Management Frameworks"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e automação",
      "reason": "Logs, métricas, dashboards, IaC e policy as code serão aprofundados em ambientes modernos."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação corporativa",
      "reason": "Kerberos, certificados, MFA e logs de autenticação dependem de DNS e tempo confiável."
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
      "8.1"
    ],
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ]
    }
  }
};
