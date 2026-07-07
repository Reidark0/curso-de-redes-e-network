export const lesson1610 = {
  "id": "16.10",
  "moduleId": "m16",
  "order": 10,
  "title": "Threat hunting com NetFlow, Zeek, firewall e proxy logs",
  "subtitle": "Como transformar telemetria de rede em hunting defensivo baseado em hipóteses, baseline, correlação, evidências e melhoria contínua.",
  "duration": "300-450 min",
  "estimatedStudyTimeMinutes": 450,
  "difficulty": "avançado",
  "type": "segurança defensiva",
  "xp": 450,
  "tags": [
    "threat hunting",
    "NetFlow",
    "IPFIX",
    "Zeek",
    "firewall logs",
    "proxy logs",
    "DNS logs",
    "flow logs",
    "SIEM",
    "NDR",
    "baseline",
    "anomalia",
    "C2",
    "movimento lateral",
    "exfiltração",
    "Blue Team",
    "SOC",
    "ética",
    "escopo autorizado",
    "evidências",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "timeline de incidente"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.11",
      "reason": "Análise de pacotes e evidências de rede ajudam a interpretar logs de fluxo e sensores."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.5",
      "reason": "DNS, HTTP/TLS e IOCs são fontes de hipóteses para hunting."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.7",
      "reason": "Movimento lateral e segmentação defensiva são caçados por padrões east-west."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.8",
      "reason": "C2 e beaconing são casos clássicos de hunting comportamental."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.9",
      "reason": "Exfiltração e anomalias de volume dependem de flow logs, proxy, firewall e contexto."
    }
  ],
  "objectives": [
    "Explicar threat hunting como investigação defensiva baseada em hipótese, não como busca aleatória no SIEM.",
    "Diferenciar NetFlow/IPFIX, Zeek, firewall logs e proxy logs em termos de campos, usos e limitações.",
    "Criar hipóteses defensivas para C2, movimento lateral, exfiltração, bypass de proxy, shadow IT e erro de segmentação.",
    "Montar matriz de campos mínimos para hunting usando origem, destino, porta, protocolo, bytes, ação, usuário, URL, regra, zona e baseline.",
    "Correlacionar telemetria de rede com EDR, IAM, CMDB, cloud audit, DNS, tickets e contexto de negócio.",
    "Transformar achados de hunting em detecções, playbooks, ajustes de política, controles de egress, segmentação e backlog de arquitetura."
  ],
  "learningOutcomes": [
    "Dada uma hipótese de possível C2, o aluno identifica quais campos procurar em NetFlow, DNS, proxy, firewall e EDR.",
    "Dado um conjunto de logs de fluxo, o aluno diferencia volumetria, periodicidade, raridade de destino e perfil do ativo.",
    "Dado um falso positivo recorrente, o aluno documenta exceção controlada e melhora a consulta de hunting.",
    "Dado um padrão de movimento lateral, o aluno propõe validação com firewall, Zeek, EDR e inventário.",
    "Dado um tráfego web suspeito, o aluno correlaciona proxy logs, DNS, TLS, usuário, status HTTP e bytes transferidos.",
    "Dado um hunt bem-sucedido, o aluno converte o aprendizado em detecção como código, playbook e melhoria preventiva."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Depois de estudar C2, beaconing, exfiltração e anomalias de volume, chega o momento de transformar telemetria em investigação ativa. <strong>Threat hunting</strong> é a prática defensiva de procurar sinais de atividade suspeita antes que exista um alerta perfeito. Em redes corporativas, isso significa fazer perguntas inteligentes aos dados: quem está conversando com quem, com que frequência, por qual porta, por qual protocolo, com qual volume, em qual horário e por qual controle.</p>\n  <p>Esta aula ensina hunting com <strong>NetFlow/IPFIX, Zeek, firewall logs e proxy logs</strong>. O objetivo não é invadir, explorar ou executar ataques. O objetivo é aprender a caçar hipóteses defensivas: possível C2, movimento lateral, exfiltração, uso anômalo de protocolos, tráfego para destinos raros, novos serviços expostos, desvios de egress, anomalias de autenticação em proxy e mudanças no padrão de comunicação entre zonas.</p>\n  <div class=\"callout callout--info\"><strong>Por que isso importa?</strong> Em ambientes modernos, muitos incidentes atravessam rede, identidade, endpoint, cloud e aplicação. Mesmo quando o conteúdo está criptografado, metadados de fluxo e logs transacionais continuam oferecendo sinais valiosos para detectar comportamento estranho.</div>\n\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n\n  <p>A análise defensiva de rede começou com captura de pacotes e IDS baseados em assinatura. Esses métodos continuam importantes, mas ficaram insuficientes para ambientes grandes, criptografados, híbridos e cloud. Capturar tudo em PCAP é caro, sensível e difícil de reter. Alertas de IDS isolados geram ruído. Firewalls dizem se permitiram ou negaram conexões, mas nem sempre explicam intenção ou contexto.</p>\n  <p>Com o crescimento de NetFlow, IPFIX, logs de proxy, sensores como Zeek, NDR, SIEM e data lakes, equipes de defesa passaram a investigar padrões de comunicação em escala. O foco evoluiu de “tem assinatura?” para “esse comportamento faz sentido para esse ativo?”. Um controlador de domínio falando SMB com estações pode ser normal; uma estação comum tentando falar com centenas de hosts internos pode ser suspeita. Um servidor enviando DNS para o resolvedor corporativo é normal; consultando resolvedores externos desconhecidos pode indicar bypass de controle.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>PCAP e IDS:</strong> inspeção profunda, porém difícil de escalar e reter.</div><div class=\"timeline-item\"><strong>NetFlow/IPFIX:</strong> metadados de sessão em grande escala para tráfego L3/L4.</div><div class=\"timeline-item\"><strong>Zeek:</strong> logs transacionais ricos por protocolo, úteis para investigação e hunting.</div><div class=\"timeline-item\"><strong>SIEM/data lake:</strong> correlação entre rede, endpoint, identidade, cloud e aplicação.</div><div class=\"timeline-item\"><strong>Hunting moderno:</strong> hipóteses, baseline, exceções, automação e melhoria contínua.</div></div>\n\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema central é que redes produzem dados demais e contexto de menos. Um flow log pode mostrar origem, destino, porta, protocolo, bytes e timestamps, mas não diz sozinho se a conexão é backup, atualização, C2, proxy legítimo, túnel de suporte, replicação, erro de aplicação ou atividade de usuário. Um proxy log pode mostrar URL e categoria, mas não necessariamente o processo local. Um firewall log pode mostrar regra aplicada, mas não dono do ativo. Zeek pode enriquecer protocolos, mas depende do ponto de captura e de visibilidade.</p>\n  <p>Threat hunting profissional resolve isso com método: começa por uma hipótese defensiva, escolhe fontes de dados adequadas, normaliza campos, compara com baseline, valida com múltiplas evidências, registra falso positivo e transforma achados em detecção, controle ou melhoria de arquitetura.</p>\n  <ul><li><strong>Sem hipótese:</strong> a equipe navega no SIEM sem direção e chama isso de hunting.</li><li><strong>Sem baseline:</strong> qualquer tráfego parece suspeito ou tudo parece normal.</li><li><strong>Sem inventário:</strong> não há como saber se um comportamento combina com o papel do ativo.</li><li><strong>Sem correlação:</strong> flow, proxy, firewall, Zeek, EDR, IAM e cloud ficam como ilhas.</li><li><strong>Sem feedback:</strong> o hunting encontra algo, mas não vira alerta, regra, controle, playbook ou correção.</li></ul>\n\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A evolução do hunting de rede acompanha a evolução da própria infraestrutura. Em redes tradicionais, sensores ficavam em links de borda, core, DMZ e data center. Em cloud, visibilidade passou a depender de flow logs, logs de load balancer, firewall gerenciado, DNS logs, audit logs, NAT metrics, Private Link, service mesh, Kubernetes e controles de egress. Em ambientes remotos, proxy/SSE, EDR e identidade ganharam peso.</p>\n  <p>Hoje, hunting eficiente raramente usa uma única fonte. NetFlow/IPFIX responde “quem conversou com quem e quanto?”. Zeek responde “qual foi a transação de protocolo observada?”. Firewall responde “qual política permitiu ou bloqueou?”. Proxy responde “qual URL, domínio, método, categoria, usuário e ação?”. EDR responde “qual processo e host iniciaram a conexão?”. IAM/cloud audit responde “qual identidade, token, role ou service principal estava envolvido?”.</p>\n  <p>A maturidade vem quando a equipe deixa de depender de consultas manuais e passa a transformar hunts recorrentes em detecções versionadas, dashboards, alertas calibrados, playbooks, controles preventivos e exercícios de purple team autorizados.</p>\n\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Threat hunting</strong> é uma investigação proativa, estruturada e defensiva baseada em hipóteses. Diferente de triagem de alerta, o hunting não começa necessariamente com um alarme. Ele começa com uma pergunta investigável: “Há hosts internos falando com destinos raros em intervalos regulares?”, “Há aumento de SMB entre estações?”, “Há DNS para domínios recém-observados seguido de egress alto?”, “Há tráfego para proxy fora do padrão de usuário?”, “Há serviços administrativos cruzando zonas que deveriam estar segmentadas?”.</p>\n  <p><strong>NetFlow/IPFIX</strong> registra metadados de fluxo: origem, destino, portas, protocolo, timestamps, bytes, pacotes, direção e, dependendo da implementação, interfaces, next hop, AS, NAT e outros campos. Ele é excelente para escala, baseline e volumetria, mas não carrega payload.</p>\n  <p><strong>Zeek</strong> é um sensor passivo que gera logs transacionais por protocolo, como conexões, DNS, HTTP, TLS, SSH, DHCP, arquivos e anomalias. Ele ajuda a enriquecer o que aconteceu na sessão sem exigir que toda análise seja feita manualmente em PCAP.</p>\n  <p><strong>Firewall logs</strong> mostram decisão de política, regra, zona, ação, NAT, aplicação identificada e metadados. <strong>Proxy logs</strong> mostram uso web: URL, domínio, usuário, método, status, categoria, bytes e ação. Juntas, essas fontes sustentam hunting de C2, exfiltração, movimento lateral, shadow IT, bypass de controles e erros de segmentação.</p>\n\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Por dentro, um hunt defensivo de rede funciona como um ciclo de evidências. Primeiro, define-se uma hipótese. Depois, ela é traduzida em campos observáveis. Por exemplo: “possível beaconing” vira origem, destino, intervalo, quantidade de conexões, baixa variação temporal, bytes pequenos, domínio raro e ausência de navegação humana. “Possível movimento lateral” vira tráfego east-west, portas administrativas, múltiplos destinos internos, falhas seguidas de sucesso, mudança de volume e host fora de perfil.</p>\n  <p>Em seguida, as fontes são normalizadas. Flow logs podem usar campos como `src_ip`, `dst_ip`, `src_port`, `dst_port`, `protocol`, `bytes`, `packets`, `start`, `end`, `action`. Zeek usa registros como `conn.log`, `dns.log`, `http.log`, `ssl.log`/`tls.log`, `files.log` e `notice.log`. Firewalls podem usar `rule`, `zone`, `action`, `translated_ip`, `app`, `threat`, `session_id`. Proxies podem usar `user`, `url`, `domain`, `category`, `method`, `status`, `bytes_out`, `bytes_in`.</p>\n  <p>Depois vem o enriquecimento: dono do ativo, criticidade, zona, subnet, conta, processo, EDR, CMDB, tags cloud, identidade, geolocalização, reputação, categoria, histórico e ticket de mudança. Só então a equipe classifica: comportamento esperado, falso positivo conhecido, anomalia operacional, suspeita fraca, suspeita forte ou incidente.</p>\n  <div class=\"callout callout--warning\"><strong>Limitação importante:</strong> metadados não provam conteúdo. Eles indicam padrões. Para confirmar certos casos, pode ser necessário combinar logs de endpoint, aplicação, storage, IAM, DLP ou PCAP autorizado e minimizado.</div>\n\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura de hunting de rede precisa de sensores, retenção, normalização, enriquecimento e resposta. Na borda, firewalls, proxies, WAFs, DNS resolvers e VPNs produzem registros de entrada e saída. No core, switches, roteadores, NetFlow/IPFIX e sensores Zeek enxergam fluxos internos. Em cloud, VPC/VNet Flow Logs, firewall gerenciado, load balancer logs, DNS logs, audit logs e Kubernetes complementam a visibilidade. No endpoint, EDR atribui conexão a processo, usuário e host.</p>\n  <p>Esses dados entram em SIEM, data lake, NDR ou plataforma de análise. Lá, campos são normalizados, enriquecidos por inventário e comparados com baseline. O resultado alimenta dashboards, consultas de hunting, detecções, playbooks, tickets, automações e backlog de melhoria.</p>\n  <ul><li><strong>Camada de coleta:</strong> NetFlow/IPFIX, Zeek, firewall, proxy, DNS, EDR, cloud audit e logs de aplicação.</li><li><strong>Camada de normalização:</strong> padronização de campos, timestamps, zonas, tags e identidades.</li><li><strong>Camada de enriquecimento:</strong> CMDB, criticidade, dono, negócio, geografia, reputação, threat intel e histórico.</li><li><strong>Camada analítica:</strong> hipóteses, queries, baseline, anomalias, correlação e pontuação de risco.</li><li><strong>Camada de resposta:</strong> contenção proporcional, ticket, playbook, regra de detecção, exceção e RCA.</li></ul>\n\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Imagine a segurança de um prédio corporativo. Câmeras gravam corredores, catracas registram entrada, elevadores registram andares, crachás identificam usuários, recepção registra visitantes e sensores indicam portas abertas. Nenhuma fonte isolada conta toda a história. Uma pessoa passando por um corredor às 14h pode ser normal. A mesma pessoa entrando de madrugada, acessando vários andares, saindo com caixas e usando crachá de terceiro pode ser suspeita.</p>\n  <p>NetFlow é como o registro de deslocamento entre áreas: origem, destino, horário e volume. Zeek é como um relatório mais detalhado de interações: qual sala foi acessada, qual formulário foi preenchido, qual protocolo foi observado. Firewall é a catraca que permitiu ou bloqueou. Proxy é o registro de navegação externa. Threat hunting é o investigador que faz perguntas antes de haver sirene: “Quem circulou fora do padrão?”, “Que rotas nunca aparecem?”, “Qual crachá acessou área incompatível?”, “O mesmo padrão se repetiu em vários dias?”.</p>\n\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Considere uma pequena empresa com três servidores: aplicação, banco de dados e arquivos. O servidor de aplicação deve falar com o banco na porta esperada, com o proxy para atualizações e com o DNS interno. Um hunt simples pergunta: “Esse servidor está falando com destinos externos que nunca aparecem no baseline?”.</p>\n  <p>O analista consulta flow logs e encontra conexões periódicas de baixo volume para um IP externo incomum. No proxy, não há URL porque o tráfego não passou pelo proxy. No firewall, a regra permitiu saída direta por uma exceção antiga. No EDR, o processo associado não faz parte do padrão da aplicação. O resultado ainda não é uma condenação; é uma hipótese forte que exige contenção proporcional, preservação de evidências, validação com dono da aplicação e revisão da regra de egress.</p>\n\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em uma empresa com matriz, filiais, VPN, data center e cloud, threat hunting precisa respeitar zonas. Uma hipótese útil seria: “Estações de usuário estão tentando acessar portas administrativas em servidores?”. NetFlow/IPFIX mostra múltiplas conexões east-west para 445, 3389, 5985 ou SSH. Firewall interno revela quais zonas permitiram ou bloquearam. Zeek pode enriquecer alguns protocolos. EDR informa processo e usuário. IAM e tickets mostram se houve manutenção autorizada.</p>\n  <p>O hunt pode concluir que parte do tráfego é ferramenta legítima de inventário, parte é GPO mal configurada e parte é comportamento anômalo em uma estação. O valor do hunting está em separar esses grupos, reduzir ruído, criar regra de detecção, ajustar segmentação e registrar exceções formais.</p>\n\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Em cloud, um hunt pode investigar “workloads privados usando NAT para destinos não aprovados”. VPC/VNet Flow Logs mostram origem, destino, bytes e ação. NAT metrics mostram aumento de processamento. Firewall gerenciado ou proxy cloud mostra categorias e regras. Cloud audit mostra mudança recente em route table ou security group. Tags indicam dono e ambiente. Kubernetes informa namespace, service account e deployment.</p>\n  <p>Um resultado possível é descobrir que um pipeline começou a baixar dependências de repositório externo sem passar por proxy corporativo. Outro resultado possível é identificar um workload comprometido tentando se comunicar com destino raro. Em ambos os casos, a resposta madura não é “bloquear tudo”, mas criar allowlist, mirror interno, private endpoint, regra de egress, detecção e processo de exceção.</p>\n\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, hunting de rede se transforma em melhoria contínua. Se um hunt mostra que novos serviços nascem com egress amplo, o pipeline deve falhar quando IaC criar security group, NSG, route table ou firewall rule permissiva demais. Se um hunt identifica serviços sem tags, o módulo de plataforma deve exigir owner, criticidade, ambiente e data classification. Se consultas recorrentes detectam tráfego anômalo, elas podem virar detecções versionadas no repositório de SOC.</p>\n  <p>Um bom fluxo é: hipótese de hunting → consulta validada → falso positivo documentado → detecção como código → teste com dados sintéticos → revisão por SOC/rede/cloud → deploy controlado → monitoramento de ruído → playbook. Assim, a aula de redes conversa diretamente com pipelines, plataforma e governança.</p>\n\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Do ponto de vista do SOC, um hunt de rede deve terminar em decisão defensiva. Por exemplo: “Há indícios de C2?”, “Há movimento lateral?”, “Há exfiltração?”, “Há bypass de proxy?”, “Há comunicação entre zonas que deveria ser proibida?”. Cada resposta precisa de evidência composta.</p>\n  <p>Um caso de possível C2 pode combinar periodicidade em flow logs, domínio raro em DNS, usuário inexistente no proxy, processo suspeito no EDR, ausência de ticket de mudança e destino externo sem reputação conhecida. Um caso de exfiltração pode combinar bytes enviados fora do baseline, storage logs, IAM, DLP, destino cloud não aprovado e anomalia de billing. A segurança profissional evita pânico: classifica evidência, preserva artefatos, comunica incerteza, contém proporcionalmente e transforma o aprendizado em controle.</p>\n\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente datasets próprios, logs corporativos autorizados ou amostras sintéticas. Queries devem minimizar exposição de dados sensíveis.</p><p><strong>Ações proibidas:</strong> Caçar dados pessoais sem objetivo; Ignorar escopo temporal; Acessar logs fora da autorização; Bloquear produção sem validação.</p><p><strong>Meta defensiva:</strong> Criar hipóteses de hunting que possam ser testadas com telemetria de rede e enriquecimento de contexto.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama abaixo mostra o fluxo de hunting defensivo: fontes de telemetria alimentam normalização e enriquecimento; hipóteses são testadas contra baseline; achados viram resposta, detecção e melhoria preventiva.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Diagrama de threat hunting com NetFlow, Zeek, firewall e proxy logs\">\n    <svg viewBox=\"0 0 1200 620\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-10-content-diagram-1-title svg-16-10-content-diagram-1-desc\">\n      <title id=\"svg-16-10-content-diagram-1-title\">Threat hunting com NetFlow, Zeek, firewall e proxy logs</title>\n      <desc id=\"svg-16-10-content-diagram-1-desc\">Diagrama pedagógico da aula 16.10, Threat hunting com NetFlow, Zeek, firewall e proxy logs, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1610\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\" />\n      <text x=\"125\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">NetFlow/IPFIX</text>\n      <text x=\"125\" y=\"103\" text-anchor=\"middle\" class=\"svg-small\">5-tupla, bytes, pacotes</text>\n\n      <rect x=\"30\" y=\"160\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\" />\n      <text x=\"125\" y=\"195\" text-anchor=\"middle\" class=\"svg-label\">Zeek</text>\n      <text x=\"125\" y=\"223\" text-anchor=\"middle\" class=\"svg-small\">conn, dns, http, tls</text>\n\n      <rect x=\"30\" y=\"280\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\" />\n      <text x=\"125\" y=\"315\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n      <text x=\"125\" y=\"343\" text-anchor=\"middle\" class=\"svg-small\">ação, regra, zona, NAT</text>\n\n      <rect x=\"30\" y=\"400\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\" />\n      <text x=\"125\" y=\"435\" text-anchor=\"middle\" class=\"svg-label\">Proxy/DNS/EDR</text>\n      <text x=\"125\" y=\"463\" text-anchor=\"middle\" class=\"svg-small\">usuário, URL, processo</text>\n\n      <rect x=\"310\" y=\"200\" width=\"190\" height=\"120\" rx=\"14\" class=\"svg-node svg-node--process\" />\n      <text x=\"405\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Normalização</text>\n      <text x=\"405\" y=\"266\" text-anchor=\"middle\" class=\"svg-small\">campos, tempo, direção</text>\n      <text x=\"405\" y=\"292\" text-anchor=\"middle\" class=\"svg-small\">zonas e identificadores</text>\n\n      <rect x=\"570\" y=\"200\" width=\"190\" height=\"120\" rx=\"14\" class=\"svg-node svg-node--process\" />\n      <text x=\"665\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Enriquecimento</text>\n      <text x=\"665\" y=\"266\" text-anchor=\"middle\" class=\"svg-small\">CMDB, tags, IAM</text>\n      <text x=\"665\" y=\"292\" text-anchor=\"middle\" class=\"svg-small\">criticidade, baseline</text>\n\n      <rect x=\"830\" y=\"80\" width=\"260\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--alert\" />\n      <text x=\"960\" y=\"118\" text-anchor=\"middle\" class=\"svg-label\">Hipóteses de hunting</text>\n      <text x=\"960\" y=\"146\" text-anchor=\"middle\" class=\"svg-small\">C2, lateral, exfiltração</text>\n      <text x=\"960\" y=\"170\" text-anchor=\"middle\" class=\"svg-small\">bypass, egress, shadow IT</text>\n\n      <rect x=\"830\" y=\"250\" width=\"260\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--decision\" />\n      <text x=\"960\" y=\"288\" text-anchor=\"middle\" class=\"svg-label\">Classificação</text>\n      <text x=\"960\" y=\"316\" text-anchor=\"middle\" class=\"svg-small\">esperado, falso positivo</text>\n      <text x=\"960\" y=\"340\" text-anchor=\"middle\" class=\"svg-small\">suspeita ou incidente</text>\n\n      <rect x=\"830\" y=\"420\" width=\"260\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--success\" />\n      <text x=\"960\" y=\"458\" text-anchor=\"middle\" class=\"svg-label\">Ação defensiva</text>\n      <text x=\"960\" y=\"486\" text-anchor=\"middle\" class=\"svg-small\">playbook, detecção, controle</text>\n      <text x=\"960\" y=\"510\" text-anchor=\"middle\" class=\"svg-small\">RCA e melhoria</text>\n\n      <line x1=\"220\" y1=\"85\" x2=\"310\" y2=\"230\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <line x1=\"220\" y1=\"205\" x2=\"310\" y2=\"250\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <line x1=\"220\" y1=\"325\" x2=\"310\" y2=\"275\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <line x1=\"220\" y1=\"445\" x2=\"310\" y2=\"300\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <line x1=\"500\" y1=\"260\" x2=\"570\" y2=\"260\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <line x1=\"760\" y1=\"250\" x2=\"830\" y2=\"135\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <line x1=\"960\" y1=\"190\" x2=\"960\" y2=\"250\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <line x1=\"960\" y1=\"360\" x2=\"960\" y2=\"420\" class=\"svg-line\" marker-end=\"url(#arrow1610)\" />\n      <path d=\"M1090 475 C1145 475 1145 135 1090 135\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1610)\" />\n      <text x=\"1125\" y=\"305\" text-anchor=\"middle\" class=\"svg-small\">feedback</text>\n    </svg>\n  </div>\n\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula é um exercício de projeto e análise defensiva. Você montará um plano de hunt com hipóteses, fontes de dados, campos mínimos, consultas conceituais, critérios de classificação, resposta proporcional e backlog de melhoria. Não é necessário executar ferramentas reais nem gerar tráfego suspeito. O foco é construir raciocínio e dossiê profissional.</p>\n\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — Zeek conn.log e dns.log</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code># conn.log sintético: ts uid id.orig_h id.resp_h id.resp_p proto service duration orig_bytes resp_bytes conn_state history\n2026-07-01T17:00:00Z C1 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 420 210 SF ShADadF\n2026-07-01T17:01:00Z C2 10.20.5.31 203.0.113.77 443 tcp ssl 1.1 418 205 SF ShADadF\n2026-07-01T17:02:00Z C3 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 421 207 SF ShADadF\n# dns.log sintético: ts uid id.orig_h query qtype answers TTLs\n2026-07-01T16:59:59Z D1 10.20.5.31 a1b2c3d4.lab-tunnel.example A 203.0.113.77 60\n2026-07-01T17:04:20Z D2 10.20.5.44 updates.vendor.example A 198.51.100.50 3600</code></pre><p><strong>Tarefa:</strong> Crie uma hipótese de hunting com Zeek: agrupe por origem/destino, calcule periodicidade, volume e raridade do domínio.</p><p><strong>Ideia de detecção:</strong> <code>zeek_conn periodicity + zeek_dns low_ttl/rare_domain + low_bytes_out</code></p><p><strong>Achado esperado:</strong> 10.20.5.31 mostra conexões periódicas para destino raro com TTL baixo; deve ser enriquecido com EDR, usuário e proxy.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios reforçam a diferença entre fonte de dado, hipótese, campo observável, baseline, enriquecimento e ação defensiva. O aluno deve responder como analista de SOC/Blue Team: com evidência, cautela, escopo e rastreabilidade.</p>\n\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio propõe um cenário corporativo em que há suspeitas fracas e sinais dispersos. O aluno deverá criar um hunt completo, evitando conclusões precipitadas e transformando achados em controles de longo prazo.</p>\n\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra como organizar a investigação sem depender de uma única ferramenta. Ela enfatiza hipóteses defensivas, normalização de dados, correlação com inventário e conversão do aprendizado em detecção e arquitetura.</p>\n\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Threat hunting com NetFlow, Zeek, firewall e proxy logs é uma disciplina de investigação defensiva baseada em hipótese e evidência. NetFlow/IPFIX dá escala e volumetria. Zeek adiciona contexto de protocolo. Firewalls mostram política e ação. Proxies revelam uso web, usuário, URL e categoria. Quando essas fontes são normalizadas, enriquecidas e comparadas a baseline, o Blue Team consegue identificar C2, movimento lateral, exfiltração, bypass de controles, shadow IT e erros de arquitetura.</p>\n  <p>O ponto mais importante é não confundir dado com conclusão. Um flow suspeito, um domínio raro ou um bloqueio de firewall são pistas. O profissional correlaciona fontes, valida contexto, comunica incerteza, age proporcionalmente e transforma aprendizado em detecção, playbook, policy as code, segmentação, egress control e governança.</p>\n\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Criar hipóteses de hunting que possam ser testadas com telemetria de rede e enriquecimento de contexto. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, você estudará <strong>DFIR de rede, PCAP e reconstrução de linha do tempo</strong>. O foco será sair da hipótese de hunting para uma investigação forense estruturada, preservando evidências, reconstruindo eventos e conectando rede, endpoint, identidade, cloud e aplicação.</p>\n\n\n</section>"
  },
  "lab": {
    "id": "lab-16.10",
    "title": "Laboratório — Plano de threat hunting com NetFlow, Zeek, firewall e proxy logs",
    "labType": "security",
    "objective": "Construir um dossiê defensivo de hunting baseado em hipóteses, fontes, campos, baseline, evidências, classificação, resposta e melhorias preventivas.",
    "scenario": "15. Laboratório O laboratório desta aula é um exercício de projeto e análise defensiva. Você montará um plano de hunt com hipóteses, fontes de dados, campos mínimos, consultas conceituais, critérios de classificação, resposta proporcional e backlog de melhoria. Não é necessário executar ferramentas reais nem gerar tráfego suspeito. O foco é construir raciocínio e dossiê profissional.",
    "topology": [
      "Estações de usuários em VLAN corporativa",
      "Servidores internos em zona de aplicações",
      "Servidores críticos em zona restrita",
      "Firewall interno e de borda",
      "Proxy/SSE corporativo",
      "Sensor Zeek em ponto de espelhamento autorizado",
      "Exportador NetFlow/IPFIX",
      "SIEM ou data lake",
      "EDR e CMDB",
      "Ambiente cloud com flow logs e audit logs"
    ],
    "architecture": "Hipótese defensiva → fontes de telemetria → normalização de campos → enriquecimento por contexto → baseline → consulta de hunting → triagem → evidência composta → ação proporcional → detecção/playbook/backlog.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 450,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Este laboratório é exclusivamente defensivo e exige escopo autorizado.",
      "Não execute exploração, evasão, persistência, brute force, interceptação de tráfego real ou coleta de credenciais.",
      "Use dados sintéticos sempre que possível e preserve apenas metadados necessários.",
      "Informe SOC/NOC antes de testes que possam gerar alertas.",
      "Pare imediatamente se houver impacto operacional não previsto ou alvo fora do escopo.",
      "Usar somente os dados sintéticos fornecidos nesta aula ou dados internos autorizados e sanitizados.",
      "Não executar consulta, conexão, download, varredura ou teste contra domínios e IPs reais a partir do dataset.",
      "Não incluir payload, credencial, segredo, dado pessoal ou conteúdo de pacote real no relatório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Confirmar escopo autorizado e critérios de parada",
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente datasets próprios, logs corporativos autorizados ou amostras sintéticas. Queries devem minimizar exposição de dados sensíveis.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Hipótese | Query | Dataset e janela | Resultados brutos | Falsos positivos | Recomendação operacional",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Definir escopo e ROE do hunt",
        "instruction": "Delimite redes, zonas, contas, fontes de dados, janela de análise, dados sensíveis, responsáveis e critérios de parada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Hunt autorizado, defensivo e proporcional.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Escolher hipóteses investigáveis",
        "instruction": "Defina 3 hipóteses: possível C2 periódico, possível movimento lateral e possível exfiltração ou bypass de proxy.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Perguntas defensivas claras e traduzíveis em campos de log.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Mapear fontes e campos mínimos",
        "instruction": "Liste campos de NetFlow/IPFIX, Zeek, firewall, proxy, DNS, EDR, CMDB e cloud audit necessários para cada hipótese.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz fonte-campo-uso-limitação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Criar baseline por perfil de ativo",
        "instruction": "Defina padrões esperados para estações, servidores, controladores de domínio, workloads cloud, pipelines e serviços críticos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Baseline inicial de destino, porta, volume, horário, frequência e direção.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Desenhar consultas conceituais de hunting",
        "instruction": "Escreva consultas em pseudolinguagem: destinos raros, conexões periódicas, aumento de SMB/RDP/SSH, egress fora do proxy, alto bytes_out, DNS raro seguido de tráfego externo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Conjunto de hunts executáveis em SIEM/data lake depois de adaptados à ferramenta real.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Correlacionar com contexto operacional",
        "instruction": "Enriqueça os resultados com CMDB, tags cloud, dono, criticidade, ambiente, usuário, processo EDR, ticket de mudança e reputação de destino.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista priorizada de achados com contexto de negócio.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Classificar achados e falsos positivos",
        "instruction": "Separe comportamento esperado, falso positivo conhecido, anomalia operacional, suspeita fraca, suspeita forte e incidente provável.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Triagem defensável com evidências e lacunas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Definir resposta proporcional",
        "instruction": "Para suspeitas relevantes, proponha ações como coleta adicional, bloqueio de destino específico, isolamento controlado, revisão de regra, contenção de conta ou abertura de incidente.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de resposta com impacto, dono, rollback e comunicação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Converter hunting em detecção e playbook",
        "instruction": "Transforme consultas úteis em detecções versionadas, dashboards, runbooks, tickets automáticos e critérios de severidade.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Hunt deixa de ser atividade isolada e passa a melhorar a operação de SOC.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Registrar backlog preventivo",
        "instruction": "Liste melhorias de arquitetura: segmentação, egress control, proxy obrigatório, DNS centralizado, logs ausentes, Zeek em ponto correto, tags obrigatórias e policy as code.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de redução de recorrência e aumento de visibilidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Threat hunting com NetFlow, Zeek, firewall e proxy logs” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Novo serviço exposto internamente | Sinal: Destino interno recebe conexões em porta incomum | Query: zeek_conn WHERE dst_port NOT IN baseline AND local_orig=true | FP: Deploy recente\nDetecção: Comunicação cross-zone inesperada | Sinal: Fluxo entre zonas sem matriz | Query: flow.zone_pair NOT IN approved_zone_pairs | FP: Matriz incompleta\nDetecção: Padrão de varredura lenta | Sinal: Poucas tentativas distribuídas no tempo | Query: distinct(dst_port)>N over 24h BY src,dst | FP: Scanner de vulnerabilidade lento autorizado",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Transformar hunting em detecção operacional | Criar lista de exceções documentadas | Ajustar retenção de logs | Acionar owner antes de bloqueio | Registrar hipótese rejeitada",
        "expectedOutput": "Plano de contenção com dono, risco, impacto, comunicação, rollback e validação.",
        "explanation": "Resposta de segurança deve ser precisa. Bloqueios amplos podem esconder evidências e quebrar serviços críticos."
      },
      {
        "number": 15,
        "title": "Fazer debrief e lições aprendidas",
        "instruction": "Finalize registrando achados, evidências, falsos positivos, melhorias, controles permanentes e pendências.",
        "command": "Debrief: achado → evidência → risco → mitigação → detecção → dono → prazo.",
        "expectedOutput": "Relatório defensivo reproduzível e acionável.",
        "explanation": "O valor do laboratório aparece quando o resultado vira melhoria operacional, não apenas conhecimento individual."
      },
      {
        "number": 16,
        "title": "Analisar dataset sintético do caso",
        "instruction": "Crie uma hipótese de hunting com Zeek: agrupe por origem/destino, calcule periodicidade, volume e raridade do domínio.",
        "artifact": "# conn.log sintético: ts uid id.orig_h id.resp_h id.resp_p proto service duration orig_bytes resp_bytes conn_state history\n2026-07-01T17:00:00Z C1 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 420 210 SF ShADadF\n2026-07-01T17:01:00Z C2 10.20.5.31 203.0.113.77 443 tcp ssl 1.1 418 205 SF ShADadF\n2026-07-01T17:02:00Z C3 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 421 207 SF ShADadF\n# dns.log sintético: ts uid id.orig_h query qtype answers TTLs\n2026-07-01T16:59:59Z D1 10.20.5.31 a1b2c3d4.lab-tunnel.example A 203.0.113.77 60\n2026-07-01T17:04:20Z D2 10.20.5.44 updates.vendor.example A 198.51.100.50 3600",
        "analysisTask": "Aplicar a ideia de detecção: zeek_conn periodicity + zeek_dns low_ttl/rare_domain + low_bytes_out",
        "evidence": "conn.log sintético | dns.log sintético | query de hunting | lista de falsos positivos",
        "expectedOutput": "10.20.5.31 mostra conexões periódicas para destino raro com TTL baixo; deve ser enriquecido com EDR, usuário e proxy.",
        "explanation": "O objetivo é treinar raciocínio defensivo usando metadados fictícios e seguros, sem execução ofensiva nem interação com infraestrutura real."
      },
      {
        "number": 17,
        "title": "Separar fato, hipótese e falso positivo",
        "instruction": "Crie uma tabela com três colunas: fatos observados no dataset, hipóteses defensivas e falsos positivos prováveis.",
        "analysisTask": "Classificar cada evidência como fato, inferência ou lacuna. Não declarar incidente sem correlação suficiente.",
        "expectedOutput": "Tabela com fatos, hipóteses, falsos positivos e próximos dados necessários.",
        "explanation": "Essa separação evita conclusões precipitadas e ensina investigação baseada em evidência."
      },
      {
        "number": 18,
        "title": "Construir mini timeline defensiva",
        "instruction": "Ordene os eventos sintéticos por horário e indique qual fonte confirma cada etapa.",
        "analysisTask": "Montar timeline com timestamp, fonte, evento, interpretação, confiança e próxima ação.",
        "expectedOutput": "Timeline curta capaz de sustentar decisão de contenção, hunting ou descarte como falso positivo.",
        "explanation": "Timeline é o elo entre log isolado e narrativa técnica defensável."
      }
    ],
    "expectedResult": "Dossiê de threat hunting com hipóteses, matriz de fontes, baseline, consultas conceituais, achados, classificação, resposta proporcional, detecções e backlog preventivo.",
    "validation": [
      {
        "check": "O dossiê deve explicar claramente o que é evidência, o que é hipótese, o que é falso positivo e qual ação defensiva é recomendada.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O dossiê deve explicar claramente o que é evidência, o que é hipótese, o que é falso positivo e qual ação defensiva é recomendada.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Escopo autorizado comprovado",
        "command": "Revisar ROE/checklist",
        "expected": "Alvos, janela, origem, ações permitidas, proibidas e critérios de parada estão documentados.",
        "ifFails": "Não executar o laboratório até formalizar escopo."
      },
      {
        "check": "Detecções com falso positivo tratado",
        "command": "Revisar tabela de detecção",
        "expected": "Cada detecção possui sinal, fonte de log, falso positivo provável e resposta.",
        "ifFails": "Adicionar contexto, exceções e enriquecimento antes de operacionalizar."
      },
      {
        "check": "Mitigação com rollback",
        "command": "Revisar plano de contenção",
        "expected": "Toda ação de contenção tem dono, impacto, retorno e validação.",
        "ifFails": "Trocar bloqueio amplo por ação específica e reversível."
      },
      {
        "check": "Dataset sintético analisado com evidência e falso positivo",
        "command": "Revisar relatório do laboratório",
        "expected": "O relatório contém dataset analisado, fatos, hipóteses, falsos positivos, timeline e contenção proporcional.",
        "ifFails": "Revisar o dataset e separar evidência objetiva de inferência antes de concluir."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se o hunt não encontrar nada, ele ainda deve produzir valor ao documentar cobertura, lacunas de log, baseline e próximos hunts.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "O SOC abriu alerta durante o laboratório",
        "probableCause": "A atividade defensiva foi confundida com incidente ou estava fora da janela comunicada.",
        "howToConfirm": "Compare timestamp, origem e técnica com o ROE.",
        "fix": "Pausar execução, comunicar o ponto focal, registrar evidência e retomar apenas com autorização."
      },
      {
        "symptom": "O achado parece grave, mas há pouco contexto",
        "probableCause": "Falta enriquecimento de identidade, dono, criticidade, processo ou baseline.",
        "howToConfirm": "Verifique CMDB, IAM, EDR, janela de mudança e histórico do ativo.",
        "fix": "Classificar como hipótese até obter evidência suficiente."
      },
      {
        "symptom": "A mitigação proposta quebra serviço crítico",
        "probableCause": "Ação ampla demais ou dependência não mapeada.",
        "howToConfirm": "Cruze matriz de fluxos, dono do serviço e logs de uso.",
        "fix": "Criar contenção específica, exceção temporária ou tabletop antes de produção."
      }
    ],
    "improvements": [
      "Ativar NetFlow/IPFIX ou flow logs em pontos estratégicos.",
      "Implantar Zeek em links com visibilidade autorizada e sem violar privacidade.",
      "Centralizar proxy/DNS e proibir bypass sem exceção formal.",
      "Normalizar campos em SIEM ou data lake.",
      "Adicionar inventário, tags e owner a todos os ativos.",
      "Versionar detecções e consultas de hunting como código.",
      "Converter achados repetíveis em detecções no SIEM/NDR.",
      "Adicionar owner, validade e revisão periódica para exceções.",
      "Automatizar validações defensivas em pipeline ou policy as code quando seguro.",
      "Criar runbook de resposta com evidências mínimas e rollback.",
      "Revisar retenção e qualidade dos logs necessários para investigação."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Hipótese",
      "Query",
      "Dataset e janela",
      "Resultados brutos",
      "Falsos positivos",
      "Recomendação operacional",
      "conn.log sintético",
      "dns.log sintético",
      "query de hunting",
      "lista de falsos positivos"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Threat hunting com NetFlow, Zeek, firewall e proxy logs” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Criar um hunt completo para possível C2, movimento lateral e exfiltração",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Criar hipóteses de hunting que possam ser testadas com telemetria de rede e enriquecimento de contexto.",
    "authorizedScope": "Somente datasets próprios, logs corporativos autorizados ou amostras sintéticas. Queries devem minimizar exposição de dados sensíveis.",
    "allowedActions": [
      "Definir hipótese",
      "Selecionar fontes",
      "Normalizar campos",
      "Criar query de hunting",
      "Registrar achados e falsos positivos"
    ],
    "prohibitedActions": [
      "Caçar dados pessoais sem objetivo",
      "Ignorar escopo temporal",
      "Acessar logs fora da autorização",
      "Bloquear produção sem validação"
    ],
    "telemetrySources": [
      "NetFlow/IPFIX",
      "Zeek conn.log/dns.log/http.log/ssl.log",
      "Firewall logs",
      "Proxy logs",
      "DNS logs",
      "CMDB/IAM enrichment",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Novo serviço exposto internamente",
        "signal": "Destino interno recebe conexões em porta incomum",
        "queryIdea": "zeek_conn WHERE dst_port NOT IN baseline AND local_orig=true",
        "commonFalsePositive": "Deploy recente",
        "response": "Validar dono; criar alerta ou fechar porta."
      },
      {
        "name": "Comunicação cross-zone inesperada",
        "signal": "Fluxo entre zonas sem matriz",
        "queryIdea": "flow.zone_pair NOT IN approved_zone_pairs",
        "commonFalsePositive": "Matriz incompleta",
        "response": "Atualizar matriz ou bloquear regra."
      },
      {
        "name": "Padrão de varredura lenta",
        "signal": "Poucas tentativas distribuídas no tempo",
        "queryIdea": "distinct(dst_port)>N over 24h BY src,dst",
        "commonFalsePositive": "Scanner de vulnerabilidade lento autorizado",
        "response": "Comparar com janela/autorização e processo de origem."
      }
    ],
    "containmentActions": [
      "Transformar hunting em detecção operacional",
      "Criar lista de exceções documentadas",
      "Ajustar retenção de logs",
      "Acionar owner antes de bloqueio",
      "Registrar hipótese rejeitada"
    ],
    "evidenceChecklist": [
      "Hipótese",
      "Query",
      "Dataset e janela",
      "Resultados brutos",
      "Falsos positivos",
      "Recomendação operacional"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — Zeek conn.log e dns.log",
      "theme": "threat hunting com NetFlow e Zeek",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "# conn.log sintético: ts uid id.orig_h id.resp_h id.resp_p proto service duration orig_bytes resp_bytes conn_state history",
        "2026-07-01T17:00:00Z C1 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 420 210 SF ShADadF",
        "2026-07-01T17:01:00Z C2 10.20.5.31 203.0.113.77 443 tcp ssl 1.1 418 205 SF ShADadF",
        "2026-07-01T17:02:00Z C3 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 421 207 SF ShADadF",
        "# dns.log sintético: ts uid id.orig_h query qtype answers TTLs",
        "2026-07-01T16:59:59Z D1 10.20.5.31 a1b2c3d4.lab-tunnel.example A 203.0.113.77 60",
        "2026-07-01T17:04:20Z D2 10.20.5.44 updates.vendor.example A 198.51.100.50 3600"
      ],
      "analysisPrompt": "Crie uma hipótese de hunting com Zeek: agrupe por origem/destino, calcule periodicidade, volume e raridade do domínio.",
      "detectionIdea": "zeek_conn periodicity + zeek_dns low_ttl/rare_domain + low_bytes_out",
      "expectedFinding": "10.20.5.31 mostra conexões periódicas para destino raro com TTL baixo; deve ser enriquecido com EDR, usuário e proxy.",
      "evidenceToCollect": [
        "conn.log sintético",
        "dns.log sintético",
        "query de hunting",
        "lista de falsos positivos"
      ],
      "constraints": [
        "Não executar tráfego contra destinos reais a partir do dataset.",
        "Tratar todos os nomes, IPs e usuários como fictícios.",
        "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
        "Preservar somente metadados necessários para o exercício."
      ]
    }
  },
  "exercises": [
    {
      "title": "Hipótese versus alerta",
      "prompt": "Explique a diferença entre triagem de alerta e threat hunting baseado em hipótese.",
      "expectedAnswer": "Triagem começa com alerta já gerado. Hunting começa com pergunta defensiva investigável, procura evidências em dados e pode ou não virar alerta futuro."
    },
    {
      "title": "Fonte adequada",
      "prompt": "Para investigar possível C2 periódico, quais fontes seriam priorizadas e por quê?",
      "expectedAnswer": "NetFlow/IPFIX para periodicidade e volume; DNS para domínios; proxy/firewall para ação e destino; EDR para processo; CMDB para contexto do ativo; SIEM para correlação."
    },
    {
      "title": "Limitação de metadados",
      "prompt": "Por que NetFlow sozinho não confirma exfiltração?",
      "expectedAnswer": "Porque mostra metadados, como bytes e destino, mas não necessariamente conteúdo, autorização, classificação do dado, processo ou intenção."
    },
    {
      "title": "Hunt que vira melhoria",
      "prompt": "Dê um exemplo de achado de hunting que deveria virar melhoria de arquitetura.",
      "expectedAnswer": "Workloads privados usando NAT para destinos não aprovados devem gerar egress control, proxy obrigatório, allowlist, Private Link quando aplicável e detecção de desvio."
    },
    {
      "id": "ex16.10.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Threat hunting com NetFlow, Zeek, firewall e proxy” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como NetFlow/IPFIX, Zeek conn.log/dns.log/http.log/ssl.log, Firewall logs, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.10.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Caçar dados pessoais sem objetivo: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Ignorar escopo temporal: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Acessar logs fora da autorização: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.10.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — Zeek conn.log e dns.log”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "10.20.5.31 mostra conexões periódicas para destino raro com TTL baixo; deve ser enriquecido com EDR, usuário e proxy. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual é a melhor definição de threat hunting defensivo?",
      "options": [
        "Executar ferramentas ofensivas fora de escopo para ver o que acontece.",
        "Procurar proativamente sinais suspeitos a partir de hipóteses, dados e contexto.",
        "Esperar alertas do SIEM e apenas fechar falsos positivos.",
        "Substituir todos os controles preventivos por análises manuais."
      ],
      "answer": 1,
      "explanation": "Hunting é investigação proativa baseada em hipótese, evidências e contexto operacional."
    },
    {
      "question": "Qual é uma limitação típica de NetFlow/IPFIX?",
      "options": [
        "Não serve para volume.",
        "Sempre mostra payload completo.",
        "Normalmente registra metadados de fluxo, não conteúdo completo da comunicação.",
        "Não possui timestamps."
      ],
      "answer": 2,
      "explanation": "Flow data é excelente para sessão, volume e direção, mas não substitui PCAP ou logs de aplicação quando conteúdo for necessário."
    },
    {
      "question": "Qual fonte costuma mostrar URL, usuário, método HTTP, categoria e ação de navegação?",
      "options": [
        "Proxy log",
        "Tabela ARP",
        "STP log",
        "Registro de BGP"
      ],
      "answer": 0,
      "explanation": "Proxy logs são fonte central para tráfego web e políticas de acesso HTTP/HTTPS."
    },
    {
      "question": "Por que enriquecer achados com CMDB, tags e dono do ativo?",
      "options": [
        "Para deixar a investigação mais burocrática.",
        "Para transformar metadados em contexto e priorizar risco corretamente.",
        "Para ocultar evidências técnicas.",
        "Para substituir logs de rede."
      ],
      "answer": 1,
      "explanation": "Contexto do ativo muda severidade, interpretação e resposta."
    },
    {
      "question": "Qual é a melhor reação a um falso positivo recorrente em hunting?",
      "options": [
        "Ignorar todos os resultados futuros.",
        "Desligar a fonte de log.",
        "Documentar exceção controlada, ajustar consulta e manter rastreabilidade.",
        "Bloquear todo o tráfego relacionado."
      ],
      "answer": 2,
      "explanation": "Falsos positivos são aprendizado: devem calibrar detecção e exceções."
    },
    {
      "question": "Qual saída madura de um hunt bem-sucedido?",
      "options": [
        "Somente um print do SIEM.",
        "Uma conclusão sem evidências para ser mais rápida.",
        "Detecção, playbook, melhoria de controle e documentação de evidências.",
        "Remover logs para reduzir custos."
      ],
      "answer": 2,
      "explanation": "O hunt deve melhorar operação, resposta e arquitetura."
    }
  ],
  "flashcards": [
    {
      "front": "O que é threat hunting?",
      "back": "Investigação defensiva proativa baseada em hipóteses, evidências, baseline e contexto."
    },
    {
      "front": "O que NetFlow/IPFIX mostra?",
      "back": "Metadados de fluxo como origem, destino, portas, protocolo, timestamps, bytes e pacotes."
    },
    {
      "front": "Por que Zeek é útil?",
      "back": "Porque gera logs transacionais por protocolo, enriquecendo a análise além de simples fluxo L3/L4."
    },
    {
      "front": "O que firewall logs acrescentam?",
      "back": "Ação, regra, zona, política, NAT, aplicação e decisão de controle."
    },
    {
      "front": "O que proxy logs acrescentam?",
      "back": "URL, domínio, usuário, método, status, categoria, bytes e ação de navegação."
    },
    {
      "front": "O que fazer com um hunt útil?",
      "back": "Transformar em detecção versionada, playbook, controle preventivo e backlog de melhoria."
    }
  ],
  "mentorQuestions": [
    "Qual hipótese defensiva você quer testar e quais campos provam ou refutam essa hipótese?",
    "Quais resultados seriam falsos positivos esperados e como você os documentaria sem cegar a detecção?",
    "Que melhoria de arquitetura reduziria a necessidade de investigar o mesmo padrão novamente?"
  ],
  "challenge": {
    "title": "Criar um hunt completo para possível C2, movimento lateral e exfiltração",
    "description": "Você recebeu sinais fracos: um host de usuário faz conexões periódicas para destino raro, outro host tenta portas administrativas internas e um workload cloud aumentou bytes enviados por NAT. Crie um plano de hunting sem executar ações ofensivas.",
    "requirements": [
      "Definir escopo e ROE",
      "Criar três hipóteses",
      "Mapear fontes e campos mínimos",
      "Definir baseline por perfil",
      "Escrever consultas conceituais",
      "Descrever enriquecimento por contexto",
      "Classificar possíveis achados",
      "Definir resposta proporcional",
      "Transformar o resultado em detecção e melhoria preventiva"
    ],
    "deliverable": "Documento de hunting com matriz hipótese-fonte-campo, linha de raciocínio, critérios de severidade, playbook e backlog preventivo.",
    "constraints": [
      "Não executar ações fora do escopo autorizado.",
      "Não usar dados sensíveis reais quando dados sintéticos ou metadados bastarem.",
      "Toda detecção deve citar falso positivo provável.",
      "Toda mitigação deve possuir rollback e comunicação.",
      "Usar somente dados sintéticos ou logs internos autorizados e sanitizados.",
      "Não interagir com infraestrutura real de terceiros a partir de IOCs ou nomes do exercício."
    ],
    "expectedDeliverables": [
      "Regras de engajamento ou escopo defensivo",
      "Matriz de telemetria e evidências",
      "Detecções com falsos positivos",
      "Plano de contenção e rollback",
      "Debrief com lições aprendidas",
      "Análise de dataset sintético",
      "Timeline defensiva com fatos e hipóteses",
      "Tabela de falsos positivos e próximos dados necessários"
    ],
    "gradingRubric": [
      {
        "criterion": "Ética, escopo e segurança operacional",
        "points": 20,
        "description": "Define claramente autorização, limites, ações proibidas, critérios de parada e proteção de evidências."
      },
      {
        "criterion": "Detecção e resposta defensiva",
        "points": 20,
        "description": "Cria detecções com telemetria adequada, falsos positivos, resposta proporcional e rollback."
      }
    ]
  },
  "commentedSolution": {
    "overview": "Uma solução madura começa com escopo e hipóteses, não com ferramenta. Para C2, procura periodicidade, destino raro, DNS e processo. Para movimento lateral, procura tráfego east-west, portas administrativas, múltiplos destinos e contexto de conta. Para exfiltração, procura bytes_out, destino, storage/IAM, DLP, billing e baseline.",
    "keyPoints": [
      "NetFlow/IPFIX dá escala e volumetria.",
      "Zeek acrescenta contexto de protocolo.",
      "Firewall mostra política, ação e zona.",
      "Proxy mostra URL, usuário e navegação.",
      "EDR, IAM e CMDB transformam tráfego em contexto.",
      "Toda conclusão deve separar fato, hipótese e lacuna."
    ],
    "commonMistakes": [
      "Caçar sem hipótese.",
      "Concluir incidente por um único log.",
      "Ignorar baseline e sazonalidade.",
      "Não documentar falso positivo.",
      "Criar bloqueios amplos sem rollback.",
      "Não transformar o hunt em detecção ou melhoria preventiva."
    ],
    "steps": [
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar teste ativo sem ROE porque é apenas laboratório",
        "whyItIsWrong": "Mesmo laboratório pode alcançar ativos errados, gerar alertas, coletar dados sensíveis ou ensinar um hábito inseguro. Segurança profissional começa por escopo."
      }
    ],
    "finalAnswer": "Complemento P1-M16: uma solução completa precisa demonstrar ética operacional, escopo autorizado, evidências protegidas, detecções com falsos positivos, contenção proporcional e melhoria contínua."
  },
  "glossary": [
    {
      "term": "Threat hunting",
      "definition": "Investigação proativa e defensiva baseada em hipóteses para encontrar sinais de atividade suspeita."
    },
    {
      "term": "NetFlow",
      "definition": "Tecnologia de registro de fluxos de rede que fornece estatísticas sobre tráfego IP."
    },
    {
      "term": "IPFIX",
      "definition": "Padrão IETF para exportação de informações de fluxo IP entre exportadores e coletores."
    },
    {
      "term": "Zeek",
      "definition": "Sensor passivo de análise de tráfego que gera logs transacionais por protocolo."
    },
    {
      "term": "Baseline",
      "definition": "Padrão esperado de comportamento usado para comparar e identificar desvios."
    },
    {
      "term": "Falso positivo",
      "definition": "Resultado que parece suspeito pela lógica inicial, mas é explicado por comportamento legítimo ou exceção documentada."
    },
    {
      "term": "Regras de engajamento",
      "shortDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "longDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.10",
        "16.12"
      ]
    },
    {
      "term": "NDR",
      "shortDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "longDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.10",
        "16.12"
      ]
    },
    {
      "term": "Pacote de evidências",
      "shortDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "longDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.10",
        "16.12"
      ]
    },
    {
      "term": "Dataset sintético",
      "shortDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "longDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "PCAP textual",
      "shortDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "longDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "Timeline de incidente",
      "shortDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "longDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    }
  ],
  "references": [
    {
      "title": "RFC 7011 — IPFIX Protocol",
      "url": "https://datatracker.ietf.org/doc/html/rfc7011"
    },
    {
      "title": "Cisco IOS NetFlow",
      "url": "https://www.cisco.com/site/us/en/products/networking/software/ios-nx-os/ios-netflow/index.html"
    },
    {
      "title": "Zeek Documentation — Logs",
      "url": "https://docs.zeek.org/en/v8.1.2/logs/index.html"
    },
    {
      "title": "Zeek Documentation — conn.log",
      "url": "https://docs.zeek.org/en/lts/logs/conn.html"
    },
    {
      "title": "MITRE ATT&CK — Network Traffic Flow DC0078",
      "url": "https://attack.mitre.org/datacomponents/DC0078/"
    },
    {
      "title": "MITRE ATT&CK — Network Traffic Content DC0085",
      "url": "https://attack.mitre.org/datacomponents/DC0085/"
    }
  ],
  "nextLesson": "16.11 — DFIR de rede, PCAP e reconstrução de linha do tempo",
  "security": {
    "goodPractices": [
      "Executar atividades práticas apenas em laboratório, ambiente próprio ou escopo formalmente autorizado.",
      "Registrar regras de engajamento, janelas de teste, alvos permitidos e contatos de emergência.",
      "Priorizar validação defensiva: logs, detecção, contenção, mitigação e redução de superfície.",
      "Evitar instruções que ensinem abuso contra redes reais fora de autorização explícita.",
      "Conectar cada técnica estudada a controles de prevenção, monitoramento e resposta.",
      "Definir escopo, autorização, janela, origem dos testes e critérios de parada antes de qualquer validação.",
      "Tratar logs e evidências como dados sensíveis, com mínimo necessário, retenção definida e controle de acesso.",
      "Correlacionar rede, identidade, endpoint e cloud antes de concluir causa ou gravidade.",
      "Preferir mitigação específica, reversível e documentada em vez de bloqueios amplos.",
      "Transformar achados recorrentes em detecções, runbooks e controles automatizados."
    ],
    "badPractices": [
      "Testar redes, serviços ou terceiros sem autorização formal e escopo definido.",
      "Confundir laboratório educacional com permissão para atuar em ambiente real.",
      "Guardar credenciais, PCAPs ou logs sensíveis sem proteção e sem necessidade.",
      "Publicar detalhes exploráveis sem mitigação, contexto defensivo ou autorização.",
      "Executar varreduras agressivas sem janela, rate limit, owner e plano de rollback.",
      "Executar teste ativo sem regras de engajamento formalizadas.",
      "Confundir validação defensiva com permissão para exploração.",
      "Usar ferramenta de segurança sem entender impacto, taxa, escopo e logs gerados.",
      "Bloquear ativos críticos sem plano de rollback e comunicação.",
      "Registrar achado sem evidência reproduzível."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar segurança de redes, Blue Team, pentest autorizado, detecção, resposta e limites éticos com impacto operacional, financeiro e de segurança.",
      "Concluir incidente a partir de um único IOC sem contexto.",
      "Ignorar falsos positivos de ferramentas corporativas legítimas.",
      "Não preservar timestamp, fonte e integridade mínima da evidência.",
      "Criar regra de firewall ou SIEM sem dono, validade e revisão.",
      "Testar fora da janela aprovada por parecer tecnicamente simples."
    ],
    "vulnerabilities": [
      {
              "name": "Risco Blue Team específico — Threat hunting com NetFlow, Zeek, firewall e proxy logs",
              "description": "Em Threat hunting com NetFlow, Zeek, firewall e proxy logs, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
              "defensiveExplanation": "O risco aparece quando datasets, PCAPs, flow logs e indicadores são analisados sem baseline, autorização, falso positivo, cadeia mínima de evidência ou contenção proporcional.",
              "mitigation": "Usar datasets sintéticos ou logs autorizados e sanitizados, definir ROE, preservar evidências, correlacionar múltiplas fontes, documentar falso positivo e aplicar mitigação reversível e proporcional."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      },
      {
        "name": "Validação defensiva sem escopo formal",
        "description": "Mesmo atividades de Blue Team podem causar impacto, expor dados ou violar regras quando não há escopo, janela, alvos e critérios de parada documentados.",
        "defensiveExplanation": "O risco não está apenas na técnica, mas na ausência de governança operacional. Segurança profissional exige autorização, evidência e proporcionalidade.",
        "mitigation": "Criar ROE, comunicar SOC/NOC, limitar taxa e escopo, preservar logs e definir rollback antes da execução."
      }
    ],
    "monitoring": [
      "Logs de firewall, proxy, DNS, DHCP, VPN, EDR, NDR, SIEM, NetFlow/IPFIX e autenticação.",
      "Alertas de varredura, beaconing, conexões laterais, exfiltração e anomalias de volume.",
      "Evidências de escopo autorizado, horários de teste e owners dos ativos analisados.",
      "NetFlow/IPFIX",
      "Zeek conn.log/dns.log/http.log/ssl.log",
      "Firewall logs",
      "Proxy logs",
      "DNS logs",
      "CMDB/IAM enrichment"
    ],
    "hardening": [
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.10.",
      "Novo serviço exposto internamente — sinal: Destino interno recebe conexões em porta incomum; ideia de consulta: zeek_conn WHERE dst_port NOT IN baseline AND local_orig=true; falso positivo comum: Deploy recente.",
      "Comunicação cross-zone inesperada — sinal: Fluxo entre zonas sem matriz; ideia de consulta: flow.zone_pair NOT IN approved_zone_pairs; falso positivo comum: Matriz incompleta.",
      "Padrão de varredura lenta — sinal: Poucas tentativas distribuídas no tempo; ideia de consulta: distinct(dst_port)>N over 24h BY src,dst; falso positivo comum: Scanner de vulnerabilidade lento autorizado."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente datasets próprios, logs corporativos autorizados ou amostras sintéticas. Queries devem minimizar exposição de dados sensíveis.",
      "allowedActions": [
        "Definir hipótese",
        "Selecionar fontes",
        "Normalizar campos",
        "Criar query de hunting",
        "Registrar achados e falsos positivos"
      ],
      "prohibitedActions": [
        "Caçar dados pessoais sem objetivo",
        "Ignorar escopo temporal",
        "Acessar logs fora da autorização",
        "Bloquear produção sem validação"
      ],
      "stopConditions": [
        "Indício de impacto em produção não previsto.",
        "Alvo, técnica ou origem fora do escopo aprovado.",
        "Coleta acidental de dado sensível além do mínimo necessário.",
        "Alerta do SOC/NOC indicando risco operacional.",
        "Ausência de responsável disponível para decisão."
      ]
    }
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Threat hunting com NetFlow, Zeek, firewall e proxy logs.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 16.10?"
    ],
    "commands": [
      {
        "platform": "Defensivo/SIEM",
        "command": "consultar logs de firewall, DNS, proxy, VPN, EDR e NetFlow dentro do escopo autorizado",
        "purpose": "Validar evidências de comportamento suspeito ou de teste controlado.",
        "expectedObservation": "Eventos correlacionados por origem, destino, horário, usuário e ação.",
        "interpretation": "Sem correlação temporal e escopo, a evidência pode ser ruído ou falso positivo."
      },
      {
        "platform": "Linux laboratório",
        "command": "ss -tulpen && ip route && tcpdump -ni <iface> host <ip_autorizado>",
        "purpose": "Observar serviços, rotas e pacotes apenas em ambiente autorizado.",
        "expectedObservation": "Tráfego compatível com o cenário de laboratório.",
        "interpretation": "Pacotes fora do esperado indicam hipótese defensiva para investigação, não autorização para atacar terceiros."
      },
      {
        "platform": "Blue Team",
        "command": "documentar IOC, hipótese, fonte de log, severidade, impacto e mitigação",
        "purpose": "Transformar observação técnica em investigação defensiva acionável.",
        "expectedObservation": "Registro claro, reprodutível e útil para resposta.",
        "interpretation": "Achados sem contexto e mitigação não amadurecem a defesa."
      }
    ],
    "decisionTree": [
      {
        "if": "O problema ocorre para todos os usuários e todas as origens",
        "then": "Priorizar serviço, DNS global, mudança central, firewall compartilhado, cloud regional ou dependência comum."
      },
      {
        "if": "O problema ocorre apenas para uma origem, filial, subnet ou usuário",
        "then": "Priorizar rota, política local, DNS específico, VPN, segmentação, identidade ou configuração do cliente."
      },
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, split-horizon, cache, search suffix, resolver usado e registros privados/públicos."
      },
      {
        "if": "Conecta, mas falha após handshake ou autenticação",
        "then": "Investigar TLS, proxy, WAF, identidade, autorização, cabeçalhos, sessão e logs de aplicação."
      },
      {
        "if": "A evidência aponta para mudança recente",
        "then": "Comparar antes/depois, avaliar rollback seguro, registrar impacto e transformar causa em controle preventivo."
      }
    ]
  },
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
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
      "16.11"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Threat hunting com NetFlow, Zeek, firewall e proxy",
    "defensiveGoal": "Criar hipóteses de hunting que possam ser testadas com telemetria de rede e enriquecimento de contexto.",
    "authorizedScope": "Somente datasets próprios, logs corporativos autorizados ou amostras sintéticas. Queries devem minimizar exposição de dados sensíveis.",
    "allowedActions": [
      "Definir hipótese",
      "Selecionar fontes",
      "Normalizar campos",
      "Criar query de hunting",
      "Registrar achados e falsos positivos"
    ],
    "prohibitedActions": [
      "Caçar dados pessoais sem objetivo",
      "Ignorar escopo temporal",
      "Acessar logs fora da autorização",
      "Bloquear produção sem validação"
    ],
    "telemetrySources": [
      "NetFlow/IPFIX",
      "Zeek conn.log/dns.log/http.log/ssl.log",
      "Firewall logs",
      "Proxy logs",
      "DNS logs",
      "CMDB/IAM enrichment"
    ],
    "detectionEngineering": [
      {
        "name": "Novo serviço exposto internamente",
        "signal": "Destino interno recebe conexões em porta incomum",
        "queryIdea": "zeek_conn WHERE dst_port NOT IN baseline AND local_orig=true",
        "commonFalsePositive": "Deploy recente",
        "response": "Validar dono; criar alerta ou fechar porta."
      },
      {
        "name": "Comunicação cross-zone inesperada",
        "signal": "Fluxo entre zonas sem matriz",
        "queryIdea": "flow.zone_pair NOT IN approved_zone_pairs",
        "commonFalsePositive": "Matriz incompleta",
        "response": "Atualizar matriz ou bloquear regra."
      },
      {
        "name": "Padrão de varredura lenta",
        "signal": "Poucas tentativas distribuídas no tempo",
        "queryIdea": "distinct(dst_port)>N over 24h BY src,dst",
        "commonFalsePositive": "Scanner de vulnerabilidade lento autorizado",
        "response": "Comparar com janela/autorização e processo de origem."
      }
    ],
    "ndrSiemMapping": {
      "minimumFields": [
        "timestamp",
        "src_ip",
        "src_zone",
        "src_user_or_identity",
        "dst_ip",
        "dst_fqdn",
        "dst_port",
        "protocol",
        "action",
        "bytes_in",
        "bytes_out",
        "device_or_sensor",
        "rule_or_policy",
        "correlation_id"
      ],
      "enrichment": [
        "CMDB owner",
        "criticidade do ativo",
        "zona de rede",
        "identidade",
        "geolocalização aproximada",
        "categoria do destino",
        "janela de mudança"
      ],
      "retentionGuidance": "Manter metadados de rede por tempo compatível com investigação, auditoria e requisitos legais. Evitar armazenar conteúdo sensível quando metadados bastam."
    },
    "containmentPlaybook": [
      "Transformar hunting em detecção operacional",
      "Criar lista de exceções documentadas",
      "Ajustar retenção de logs",
      "Acionar owner antes de bloqueio",
      "Registrar hipótese rejeitada"
    ],
    "evidencePackage": [
      "Hipótese",
      "Query",
      "Dataset e janela",
      "Resultados brutos",
      "Falsos positivos",
      "Recomendação operacional"
    ],
    "successCriteria": [
      "O escopo autorizado está explícito e verificável.",
      "As ações proibidas estão documentadas antes de qualquer teste.",
      "Cada achado possui evidência, fonte, horário e interpretação.",
      "A detecção proposta possui hipótese, campo de log, falso positivo provável e resposta.",
      "A mitigação é proporcional, reversível e não cria risco maior que o problema."
    ],
    "debriefQuestions": [
      "Que evidência permitiria defender essa conclusão em uma revisão técnica?",
      "Qual falso positivo mais provável precisa ser tratado?",
      "Qual ação de contenção reduziria risco sem destruir evidência?",
      "O que deve virar controle contínuo depois do laboratório?"
    ]
  },
  "blueTeamSyntheticDataset": {
    "title": "Dataset sintético — Zeek conn.log e dns.log",
    "theme": "threat hunting com NetFlow e Zeek",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "# conn.log sintético: ts uid id.orig_h id.resp_h id.resp_p proto service duration orig_bytes resp_bytes conn_state history",
      "2026-07-01T17:00:00Z C1 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 420 210 SF ShADadF",
      "2026-07-01T17:01:00Z C2 10.20.5.31 203.0.113.77 443 tcp ssl 1.1 418 205 SF ShADadF",
      "2026-07-01T17:02:00Z C3 10.20.5.31 203.0.113.77 443 tcp ssl 1.2 421 207 SF ShADadF",
      "# dns.log sintético: ts uid id.orig_h query qtype answers TTLs",
      "2026-07-01T16:59:59Z D1 10.20.5.31 a1b2c3d4.lab-tunnel.example A 203.0.113.77 60",
      "2026-07-01T17:04:20Z D2 10.20.5.44 updates.vendor.example A 198.51.100.50 3600"
    ],
    "analysisPrompt": "Crie uma hipótese de hunting com Zeek: agrupe por origem/destino, calcule periodicidade, volume e raridade do domínio.",
    "detectionIdea": "zeek_conn periodicity + zeek_dns low_ttl/rare_domain + low_bytes_out",
    "expectedFinding": "10.20.5.31 mostra conexões periódicas para destino raro com TTL baixo; deve ser enriquecido com EDR, usuário e proxy.",
    "evidenceToCollect": [
      "conn.log sintético",
      "dns.log sintético",
      "query de hunting",
      "lista de falsos positivos"
    ],
    "constraints": [
      "Não executar tráfego contra destinos reais a partir do dataset.",
      "Tratar todos os nomes, IPs e usuários como fictícios.",
      "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
      "Preservar somente metadados necessários para o exercício."
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    }
  ]
};
