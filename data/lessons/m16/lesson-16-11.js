export const lesson1611 = {
  "id": "16.11",
  "moduleId": "m16",
  "order": 11,
  "title": "DFIR de rede, PCAP e reconstrução de linha do tempo",
  "subtitle": "Como investigar incidentes de rede com evidências preservadas, PCAP, flow logs, Zeek, DNS, proxy, firewall, EDR, cloud audit e timeline defensável.",
  "duration": "300-450 min",
  "estimatedStudyTimeMinutes": 450,
  "difficulty": "avançado",
  "type": "segurança defensiva",
  "xp": 450,
  "tags": [
    "DFIR",
    "forense de rede",
    "PCAP",
    "PCAPNG",
    "Wireshark",
    "tcpdump",
    "Zeek",
    "NetFlow",
    "timeline",
    "cadeia de custódia",
    "SIEM",
    "EDR",
    "cloud audit",
    "resposta a incidentes",
    "RCA",
    "Blue Team",
    "ética",
    "escopo autorizado",
    "NDR",
    "evidências",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "timeline de incidente",
    "flow logs"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.11",
      "reason": "Wireshark, tcpdump e análise de pacotes são base para interpretar PCAP em DFIR."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.12",
      "reason": "War room, RCA e playbook integrado estruturam a resposta operacional."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.8",
      "reason": "C2 e beaconing são cenários comuns de investigação por timeline."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.9",
      "reason": "Exfiltração e DLP exigem preservação e correlação de evidências."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.10",
      "reason": "Threat hunting fornece hipóteses que podem evoluir para DFIR estruturado."
    }
  ],
  "objectives": [
    "Explicar DFIR de rede como investigação defensiva baseada em evidência, preservação, timeline e resposta proporcional.",
    "Diferenciar PCAP/PCAPNG, flow logs, Zeek, firewall logs, proxy logs, DNS logs, EDR, IAM e cloud audit em uma investigação.",
    "Escolher pontos de observação adequados e reconhecer limitações de perspectiva, NAT, criptografia, amostragem e retenção.",
    "Montar uma linha do tempo com timestamps normalizados, fatos, hipóteses, inferências e lacunas explícitas.",
    "Preservar evidências com hash, cadeia de custódia, controle de acesso, minimização e documentação de coleta.",
    "Transformar investigação em contenção proporcional, RCA, playbook, detecção e melhoria de arquitetura."
  ],
  "learningOutcomes": [
    "Dado um incidente de rede, o aluno escolhe fontes de evidência adequadas para origem, destino, identidade, processo e política.",
    "Dado um PCAP parcial, o aluno identifica limitações de ponto de captura e evita conclusões além da evidência.",
    "Dado um conjunto de logs com fusos diferentes, o aluno normaliza timestamps e constrói timeline coerente.",
    "Dado um alerta de possível exfiltração, o aluno correlaciona flow, proxy, DNS, EDR, IAM, DLP e billing.",
    "Dado um achado de possível C2, o aluno separa IOC, anomalia, hipótese, falso positivo e incidente provável.",
    "Dado um encerramento de investigação, o aluno produz RCA, ações preventivas, detecções e atualização de playbook."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Em aulas anteriores, você aprendeu a usar logs, flow logs, DNS, proxy, firewall, Zeek e hunting para levantar hipóteses defensivas. Agora entramos em <strong>DFIR de rede</strong>: a disciplina de investigar incidentes usando evidências de rede, preservando rastreabilidade, reconstruindo uma linha do tempo e explicando o que provavelmente aconteceu sem pular para conclusões.</p>\n  <p>DFIR significa <strong>Digital Forensics and Incident Response</strong>. Em redes, isso inclui PCAP, PCAPNG, NetFlow/IPFIX, logs de firewall, DNS, proxy, WAF, load balancer, VPN, EDR, cloud audit, Kubernetes e SIEM. A diferença entre um bom analista e um analista precipitado não é a quantidade de comandos que ele conhece: é a capacidade de separar fato, hipótese, inferência, lacuna e ação defensiva proporcional.</p>\n  <div class=\"callout callout--info\"><strong>Por que isso importa?</strong> Incidentes reais raramente chegam organizados. Você recebe horários divergentes, logs incompletos, prints fora de contexto, alertas ruidosos, PCAPs parciais e pressão por resposta. Esta aula ensina um método para transformar esse caos em uma narrativa técnica defensável.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n\n  <p>A investigação forense em redes evoluiu junto com a própria infraestrutura. No início, muito dependia de logs de sistema, logs de firewall e captura pontual de pacotes. Com o crescimento de redes corporativas, data centers, VPNs, proxies, Wi-Fi corporativo, cloud, containers e Kubernetes, tornou-se impossível depender apenas de PCAP completo em todos os pontos.</p>\n  <p>Com isso, a prática amadureceu para combinar evidências de granularidades diferentes. <strong>PCAP</strong> mostra pacotes e detalhes finos; <strong>flow logs</strong> mostram sessões e volumetria; <strong>Zeek</strong> transforma tráfego observado em logs transacionais; <strong>firewall/proxy/DNS</strong> mostram decisões de controle e comportamento de navegação; <strong>EDR/IAM/cloud audit</strong> conectam rede a processo, usuário, identidade, workload e mudança.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Captura manual:</strong> análise pontual de pacotes em momentos de falha ou incidente.</div><div class=\"timeline-item\"><strong>Logs centralizados:</strong> firewall, proxy, DNS e servidores enviados ao SIEM.</div><div class=\"timeline-item\"><strong>Flow e sensores:</strong> NetFlow/IPFIX, Zeek, NDR e enriquecimento de contexto.</div><div class=\"timeline-item\"><strong>Cloud e identidade:</strong> flow logs, audit logs, IAM, service principals e trilhas de controle.</div><div class=\"timeline-item\"><strong>DFIR moderno:</strong> timeline correlacionada, evidência preservada, resposta proporcional e lições aprendidas.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema central do DFIR de rede é que nenhuma fonte conta a história inteira. Um PCAP pode mostrar um handshake TCP, mas não necessariamente o usuário autenticado. Um flow log pode mostrar bytes altos, mas não o conteúdo. Um log de proxy pode mostrar URL, mas não o processo local. Um EDR pode mostrar processo, mas não necessariamente o caminho de rede. Um audit log cloud pode mostrar criação de regra, mas não todos os pacotes que passaram depois.</p>\n  <p>Outro problema é a fragilidade temporal. Logs podem estar em fusos diferentes, com relógios dessincronizados, retenções distintas e granularidades diferentes. Um incidente investigado sem normalização de horário vira uma sequência confusa de eventos que parece convincente, mas pode estar tecnicamente errada.</p>\n  <ul><li><strong>Conclusão cedo demais:</strong> confundir primeiro sinal visto com causa raiz.</li><li><strong>PCAP fora do ponto correto:</strong> capturar no lugar errado e concluir que tráfego não existe.</li><li><strong>Logs sem contexto:</strong> ignorar dono do ativo, mudança aprovada, função do workload e janela de manutenção.</li><li><strong>Perda de evidência:</strong> sobrescrever logs, alterar sistemas antes de coletar dados ou compartilhar PCAP sensível sem controle.</li><li><strong>Resposta destrutiva:</strong> bloquear tudo antes de entender impacto, rota de retorno, dependências e risco de perda de evidência.</li></ul>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A investigação defensiva evoluiu de “abrir o Wireshark e procurar algo estranho” para um processo integrado com governança, SOC, cloud, DevSecOps e jurídico. Hoje, uma investigação de rede madura começa por escopo, autorização, preservação, coleta proporcional, normalização, correlação e comunicação.</p>\n  <p>Em ambientes cloud e híbridos, o ponto de captura nem sempre é um cabo ou switch. Pode ser um VPC Flow Log, Azure Virtual Network Flow Log, Google VPC Flow Log, log de load balancer, firewall gerenciado, service mesh, NAT Gateway metric, DNS query log, audit trail ou sensor em workload. A investigação precisa respeitar limitações: amostragem, ausência de payload, criptografia, NAT, proxies, endereços efêmeros, containers efêmeros e autoscaling.</p>\n  <p>O DFIR moderno não busca apenas responder “qual IP conversou com qual IP?”. Ele busca responder: qual ativo, qual identidade, qual processo, qual serviço, qual rota, qual controle, qual decisão de política, qual volume, qual impacto, qual janela temporal e qual ação reduz risco sem prejudicar evidência.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>DFIR de rede</strong> é o uso de evidências de comunicação para investigar, conter, erradicar, recuperar e aprender com incidentes. Ele combina forense digital com resposta a incidentes. O termo “forense” aqui não significa apenas investigação legal; em ambientes corporativos, significa método rigoroso para coletar, preservar, analisar e explicar evidências técnicas.</p>\n  <p><strong>PCAP</strong> é uma captura de pacotes. <strong>PCAPNG</strong> é um formato mais moderno, capaz de armazenar metadados adicionais. <strong>Flow logs</strong> resumem comunicações. <strong>Logs transacionais</strong>, como os de Zeek, resumem eventos de protocolo. <strong>Logs de controle</strong>, como firewall, proxy e WAF, registram decisões de política. <strong>Logs de identidade e cloud</strong> mostram quem ou o que alterou configurações e acessou recursos.</p>\n  <p>A investigação deve classificar cada item como <strong>fato observado</strong>, <strong>inferência</strong>, <strong>hipótese</strong>, <strong>lacuna</strong> ou <strong>ação recomendada</strong>. Essa separação evita conclusões frágeis e melhora a comunicação com gestores, SOC, infraestrutura, jurídico, privacidade e donos de sistemas.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Uma investigação de rede começa pela pergunta: <strong>qual fluxo deveria ter acontecido e o que de fato aconteceu?</strong> A partir disso, o analista define ponto de observação, janela temporal, fontes disponíveis e evidências mínimas.</p>\n  <p>No nível de pacote, você procura sinais como ARP, DNS, SYN, SYN-ACK, ACK, RST, FIN, retransmissões, ICMP, handshake TLS, SNI, alertas TLS, HTTP status, redirects, tamanho de payload, intervalos entre conexões e sequência de eventos. No nível de fluxo, procura origem, destino, porta, protocolo, bytes, pacotes, duração, ação, zona, regra e NAT. No nível de controle, procura regra aplicada, usuário, política, categoria, certificado, health check, rota e alteração de configuração.</p>\n  <p>Um detalhe importante é a <strong>perspectiva</strong>. Capturar no cliente mostra tentativa de conexão e resolução DNS local. Capturar no servidor mostra se o tráfego chegou. Capturar no firewall mostra decisão de política. Capturar no load balancer mostra saúde e roteamento para backend. Capturar em cloud via flow logs mostra sessão, mas pode não mostrar payload. O ponto de coleta muda a conclusão possível.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura de DFIR de rede possui fontes, pipeline, armazenamento, análise, resposta e aprendizado. As fontes incluem PCAP, Zeek, NetFlow/IPFIX, firewall, proxy, DNS, WAF, load balancer, VPN, EDR, IAM, cloud audit e Kubernetes. O pipeline normaliza timestamps, campos e identificadores. O armazenamento preserva evidências com retenção e controle de acesso. A análise constrói linha do tempo, pivôs e hipóteses. A resposta executa contenção proporcional. O aprendizado vira playbook, detecção e melhoria arquitetural.</p>\n  <p>O desenho também precisa considerar privacidade. PCAP pode conter dados sensíveis, tokens, nomes internos, URLs, metadados pessoais e, em tráfego não criptografado, conteúdo. Mesmo em tráfego TLS, SNI, IP, horário, volume e destino podem revelar informações. Por isso, coleta deve ser proporcional, autorizada, protegida e documentada.</p>\n  <p>Em cloud, a arquitetura precisa prever logs antes do incidente. Ativar flow logs, DNS logs, load balancer logs, WAF logs, audit logs, tags e inventário depois do incidente pode ser tarde demais. DFIR bom nasce de arquitetura observável.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Pense em DFIR de rede como investigar um evento em um prédio corporativo. O PCAP é como uma câmera detalhada em uma porta específica. O flow log é como uma catraca que registra quem passou, horário e direção. O firewall é como um segurança que registrou se deixou passar ou bloqueou. O proxy é como recepção que registra sites visitados. O EDR é como uma câmera na mesa do funcionário mostrando qual aplicativo iniciou a ação. O audit log cloud é como o livro de mudanças da administração do prédio.</p>\n  <p>Nenhuma câmera sozinha conta toda a história. Se você olhar apenas a catraca, saberá que alguém passou, mas não o que carregava. Se olhar apenas a câmera da porta errada, concluirá falsamente que ninguém entrou. Se ignorar o relógio errado de uma câmera, montará a sequência de eventos fora de ordem. O trabalho profissional é sincronizar relógios, comparar perspectivas, preservar gravações e explicar a narrativa com incertezas explícitas.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Imagine que um usuário relata: “não consigo acessar o sistema interno”. Uma investigação superficial testaria ping, tentaria abrir o site e culparia o firewall. Uma investigação de DFIR de rede faria diferente: registraria horário exato, origem, destino, URL, usuário, rede, VPN, DNS resolvido, IP retornado, porta, erro do navegador, logs de proxy, logs de firewall, health check do load balancer e eventos no servidor.</p>\n  <p>Se o cliente resolve DNS para IP antigo, a evidência aponta para cache ou split-horizon. Se o SYN sai, mas não há SYN-ACK, pode ser rota, firewall ou retorno. Se há TLS alert, pode ser certificado, SNI ou inspeção. Se o load balancer retorna 503, pode ser backend unhealthy. O mesmo sintoma visível para o usuário pode ter causas totalmente diferentes.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em uma empresa grande, o SOC recebe alerta de possível exfiltração. Um servidor de relatórios enviou volume incomum para um destino externo. O time de rede vê flow logs com bytes altos; o proxy mostra upload para serviço SaaS; o EDR mostra processo de backup; o IAM mostra service account; a CMDB informa que o servidor pertence ao time financeiro; o ticket de mudança mostra migração autorizada, mas para outro destino.</p>\n  <p>A investigação madura não conclui imediatamente “incidente” nem “falso positivo”. Ela monta a linha do tempo: quando começou o volume, qual processo iniciou, qual identidade autenticou, qual destino recebeu, qual dado poderia estar envolvido, qual mudança foi aprovada, qual regra permitiu, qual DLP inspecionou e qual dono confirma a operação. Se o destino não corresponde ao ticket, o caso sobe de severidade e exige contenção proporcional.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Em cloud, um workload privado começa a gerar custo alto de NAT Gateway. Flow logs mostram aumento de egress, métricas de NAT confirmam processamento elevado, DNS logs mostram consultas para domínio novo, audit logs mostram alteração recente em uma security group, e o pipeline mostra deploy feito por service principal. O erro pode ser incidente, bug de aplicação, integração nova, loop de retry ou exfiltração.</p>\n  <p>O DFIR de rede em cloud precisa correlacionar tráfego, identidade e mudança. Tags indicam dono e ambiente. IaC mostra configuração esperada. Drift detection mostra diferença entre estado desejado e real. Logs de aplicação mostram retry. WAF/LB mostram health checks. Sem essa correlação, a equipe pode bloquear tráfego legítimo ou deixar um incidente passar como “custo de cloud”.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, DFIR de rede não começa no incidente; começa no desenho do pipeline. Aplicações devem nascer com logs, traces, health checks, tags, donos, DNS padronizado, egress conhecido, security groups gerados por IaC, testes sintéticos e runbooks. Quando um incidente acontece, o time consegue comparar o que está em produção com o que foi versionado.</p>\n  <p>Um exemplo: depois de um deploy, a aplicação passa a chamar endpoint externo não aprovado. Flow logs e proxy logs detectam o novo destino; o pipeline identifica o commit; o SBOM e a configuração mostram uma dependência alterada; a policy as code deveria ter bloqueado egress amplo. A investigação vira melhoria: teste de egress em pipeline, revisão de dependência, allowlist, regra de SIEM e runbook atualizado.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Em segurança, DFIR de rede aparece quando há suspeita de C2, movimento lateral, exfiltração, uso indevido de credencial, rogue service, bypass de proxy ou alteração indevida em cloud. A resposta defensiva precisa ser proporcional: preservar evidência, conter risco, evitar dano operacional e comunicar incerteza.</p>\n  <p>Por exemplo, se um host apresenta beaconing para destino raro, o analista coleta flow logs, DNS, proxy, EDR, hash do processo, usuário logado, rota de egress, regra de firewall e histórico do destino. Se a suspeita for forte, pode isolar o host via EDR, bloquear destino específico, capturar memória conforme processo interno e abrir incidente. Se for fraca, pode aumentar monitoramento e solicitar confirmação do dono da aplicação.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente PCAPs, logs e sistemas autorizados pelo processo de incidente. Dados sensíveis devem ser minimizados, mascarados e protegidos.</p><p><strong>Ações proibidas:</strong> Alterar evidência original; Compartilhar PCAP com dados sensíveis; Executar payload extraído; Atribuir autoria sem base; Ignorar cadeia de custódia.</p><p><strong>Meta defensiva:</strong> Reconstruir incidente com evidências de rede preservadas, sem contaminar prova nem tirar conclusões além do que os dados sustentam.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama abaixo mostra uma investigação de DFIR de rede como uma cadeia de evidências, normalização, linha do tempo, análise e resposta proporcional.</p>\n  <div class=\"diagram diagram--interactive\" role=\"img\" aria-label=\"Arquitetura de DFIR de rede com fontes, preservação, timeline, análise e resposta\">\n    <svg viewBox=\"0 0 1180 640\" xmlns=\"http://www.w3.org/2000/svg\" class=\"svg-diagram\" role=\"img\" aria-labelledby=\"svg-16-11-content-diagram-1-title svg-16-11-content-diagram-1-desc\">\n      <title id=\"svg-16-11-content-diagram-1-title\">DFIR de rede, PCAP e reconstrução de linha do tempo</title>\n      <desc id=\"svg-16-11-content-diagram-1-desc\">Diagrama pedagógico da aula 16.11, DFIR de rede, PCAP e reconstrução de linha do tempo, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-1611\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" /></marker>\n        <filter id=\"shadow-1611\"><feDropShadow dx=\"0\" dy=\"3\" stdDeviation=\"3\" flood-opacity=\"0.18\"/></filter>\n      </defs>\n      <rect x=\"20\" y=\"20\" width=\"1140\" height=\"600\" rx=\"22\" class=\"svg-bg\" />\n      <text x=\"590\" y=\"58\" text-anchor=\"middle\" class=\"svg-title\">DFIR de rede: da coleta à resposta proporcional</text>\n\n      <g filter=\"url(#shadow-1611)\">\n        <rect x=\"60\" y=\"105\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\" />\n        <text x=\"155\" y=\"136\" text-anchor=\"middle\" class=\"svg-label\">Fontes de rede</text>\n        <text x=\"155\" y=\"160\" text-anchor=\"middle\" class=\"svg-small\">PCAP, Flow, Zeek</text>\n        <text x=\"155\" y=\"181\" text-anchor=\"middle\" class=\"svg-small\">DNS, Proxy, FW</text>\n\n        <rect x=\"60\" y=\"245\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\" />\n        <text x=\"155\" y=\"276\" text-anchor=\"middle\" class=\"svg-label\">Contexto</text>\n        <text x=\"155\" y=\"300\" text-anchor=\"middle\" class=\"svg-small\">EDR, IAM, CMDB</text>\n        <text x=\"155\" y=\"321\" text-anchor=\"middle\" class=\"svg-small\">Cloud audit, tickets</text>\n\n        <rect x=\"310\" y=\"175\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--process\" />\n        <text x=\"405\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Preservação</text>\n        <text x=\"405\" y=\"232\" text-anchor=\"middle\" class=\"svg-small\">hash, retenção</text>\n        <text x=\"405\" y=\"253\" text-anchor=\"middle\" class=\"svg-small\">controle de acesso</text>\n        <text x=\"405\" y=\"274\" text-anchor=\"middle\" class=\"svg-small\">cadeia de custódia</text>\n\n        <rect x=\"560\" y=\"175\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--process\" />\n        <text x=\"655\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Timeline</text>\n        <text x=\"655\" y=\"232\" text-anchor=\"middle\" class=\"svg-small\">timestamps normalizados</text>\n        <text x=\"655\" y=\"253\" text-anchor=\"middle\" class=\"svg-small\">fatos e lacunas</text>\n        <text x=\"655\" y=\"274\" text-anchor=\"middle\" class=\"svg-small\">sequência de eventos</text>\n\n        <rect x=\"810\" y=\"105\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--analysis\" />\n        <text x=\"905\" y=\"136\" text-anchor=\"middle\" class=\"svg-label\">Análise</text>\n        <text x=\"905\" y=\"160\" text-anchor=\"middle\" class=\"svg-small\">hipótese vs fato</text>\n        <text x=\"905\" y=\"181\" text-anchor=\"middle\" class=\"svg-small\">pivôs e correlação</text>\n\n        <rect x=\"810\" y=\"245\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--control\" />\n        <text x=\"905\" y=\"276\" text-anchor=\"middle\" class=\"svg-label\">Resposta</text>\n        <text x=\"905\" y=\"300\" text-anchor=\"middle\" class=\"svg-small\">contenção proporcional</text>\n        <text x=\"905\" y=\"321\" text-anchor=\"middle\" class=\"svg-small\">rollback e comunicação</text>\n\n        <rect x=\"435\" y=\"410\" width=\"310\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--outcome\" />\n        <text x=\"590\" y=\"443\" text-anchor=\"middle\" class=\"svg-label\">RCA e melhoria contínua</text>\n        <text x=\"590\" y=\"469\" text-anchor=\"middle\" class=\"svg-small\">detecção, playbook, IaC, segmentação</text>\n        <text x=\"590\" y=\"490\" text-anchor=\"middle\" class=\"svg-small\">evidência preservada + lições aprendidas</text>\n      </g>\n\n      <path d=\"M250 150 C275 150 285 210 310 220\" class=\"svg-arrow\" marker-end=\"url(#arrow-1611)\" />\n      <path d=\"M250 290 C275 290 285 250 310 240\" class=\"svg-arrow\" marker-end=\"url(#arrow-1611)\" />\n      <path d=\"M500 230 L560 230\" class=\"svg-arrow\" marker-end=\"url(#arrow-1611)\" />\n      <path d=\"M750 220 C780 200 790 165 810 150\" class=\"svg-arrow\" marker-end=\"url(#arrow-1611)\" />\n      <path d=\"M750 240 C780 260 790 285 810 290\" class=\"svg-arrow\" marker-end=\"url(#arrow-1611)\" />\n      <path d=\"M905 335 C895 390 760 430 745 455\" class=\"svg-arrow\" marker-end=\"url(#arrow-1611)\" />\n      <path d=\"M810 150 C710 80 465 80 405 175\" class=\"svg-arrow svg-arrow--muted\" marker-end=\"url(#arrow-1611)\" />\n      <text x=\"590\" y=\"570\" text-anchor=\"middle\" class=\"svg-caption\">Regra de ouro: preservar primeiro, analisar com método, responder proporcionalmente e transformar aprendizado em controle.</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula não exige capturar tráfego real nem manipular malware. Ele ensina a construir um <strong>dossiê de DFIR de rede</strong> para um cenário simulado e autorizado, com fontes de evidência, timeline, lacunas, hipóteses, resposta proporcional e RCA.</p>\n  <p>O objetivo é treinar o raciocínio. Você vai documentar quais evidências coletaria, onde coletaria, como preservaria, quais campos usaria, como normalizaria timestamps e como diferenciaria fato de inferência.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — PCAP textual e timeline de incidente</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code># PCAP textual sanitizado: frame time src dst proto info\n1 2026-07-01T18:00:00Z 10.20.5.31 10.10.1.10 DNS A a1b2c3d4.lab-tunnel.example\n2 2026-07-01T18:00:00Z 10.10.1.10 10.20.5.31 DNS response A 203.0.113.77 TTL 60\n3 2026-07-01T18:00:01Z 10.20.5.31 203.0.113.77 TCP 51514 > 443 SYN\n4 2026-07-01T18:00:01Z 203.0.113.77 10.20.5.31 TCP 443 > 51514 SYN,ACK\n5 2026-07-01T18:00:02Z 10.20.5.31 203.0.113.77 TLS ClientHello SNI a1b2c3d4.lab-tunnel.example\n# timeline: 17:59 usuário logou | 18:00 DNS raro | 18:00 conexão TLS | 18:03 EDR processo incomum | 18:07 isolamento aprovado</code></pre><p><strong>Tarefa:</strong> Reconstrua timeline com DNS, TCP, TLS e EDR. Separe fato observado, inferência e lacuna de evidência.</p><p><strong>Ideia de detecção:</strong> <code>timeline links DNS query -> TCP session -> TLS SNI -> endpoint process within incident window</code></p><p><strong>Achado esperado:</strong> Há sequência temporal coerente para investigação, mas a aula exige classificar lacunas e preservar evidência antes de conclusão.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios reforçam a diferença entre PCAP, flow logs, Zeek, firewall, proxy, EDR e audit logs. O foco é interpretar qual fonte responde cada pergunta e quais limitações permanecem.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio propõe uma investigação completa: um serviço crítico apresentou erro, aumento de egress e alerta de C2 fraco. Você deverá montar uma linha do tempo defensável sem concluir além das evidências.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra como uma investigação madura evita viés de confirmação, preserva evidências, declara lacunas e recomenda ações com impacto controlado.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Nesta aula, você aprendeu que DFIR de rede é uma prática de investigação estruturada. PCAP, flow logs, Zeek, DNS, proxy, firewall, WAF, EDR, IAM, cloud audit e SIEM são peças de uma narrativa, não conclusões isoladas. O profissional precisa preservar evidências, normalizar tempo, escolher pontos de observação, correlacionar contexto, separar fato de hipótese e responder proporcionalmente.</p>\n  <p>A principal habilidade não é decorar filtros, mas pensar como investigador técnico: o que sei, como sei, o que ainda não sei, qual fonte pode confirmar, qual ação reduz risco e qual aprendizado previne recorrência.</p>\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Reconstruir incidente com evidências de rede preservadas, sem contaminar prova nem tirar conclusões além do que os dados sustentam. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, você estudará <strong>Projeto final: Blue Team + Pentest autorizado de rede</strong>. Ela vai consolidar todo o Módulo 16 em um projeto defensivo com escopo, ROE, validação autorizada, detecção, resposta, relatório e plano de melhoria.</p>\n\n</section>"
  },
  "lab": {
    "id": "lab-16.11",
    "title": "Laboratório — Dossiê de DFIR de rede com PCAP, logs e timeline",
    "labType": "cloud",
    "objective": "Construir um dossiê defensivo de investigação de rede para um cenário simulado, preservando evidências, normalizando tempo, correlacionando fontes e propondo resposta proporcional.",
    "scenario": "15. Laboratório O laboratório desta aula não exige capturar tráfego real nem manipular malware. Ele ensina a construir um dossiê de DFIR de rede para um cenário simulado e autorizado, com fontes de evidência, timeline, lacunas, hipóteses, resposta proporcional e RCA. O objetivo é treinar o raciocínio. Você vai documentar quais evidências coletaria, onde coletaria, como preservaria, quais campos usaria, como normalizaria timestamps e como diferenciaria fato de inferência.",
    "topology": [
      "Usuário remoto via VPN",
      "Estação corporativa com EDR",
      "Servidor web interno",
      "Load balancer ou reverse proxy",
      "Firewall interno e de borda",
      "Proxy/SSE",
      "Resolvedor DNS corporativo",
      "Sensor Zeek ou ponto de PCAP autorizado",
      "Flow logs/NetFlow/IPFIX",
      "SIEM/data lake",
      "Ambiente cloud com audit logs e flow logs"
    ],
    "architecture": "Incidente reportado → escopo e preservação → coleta por fonte → normalização temporal → pivôs técnicos → timeline → classificação → contenção proporcional → RCA → playbook e melhorias preventivas.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Wireshark",
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 450,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes.",
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
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente PCAPs, logs e sistemas autorizados pelo processo de incidente. Dados sensíveis devem ser minimizados, mascarados e protegidos.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Hash do PCAP/log | Origem e horário de coleta | Timeline | Eventos correlacionados | Lacunas | Conclusão com grau de confiança",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Definir escopo, autorização e objetivo da investigação",
        "instruction": "Descreva o incidente simulado, ativos envolvidos, janela de análise, responsáveis, dados sensíveis, limites de coleta e critérios de parada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Investigação defensiva com escopo claro e autorização documentada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Preservar evidências iniciais",
        "instruction": "Liste quais logs, PCAPs, prints, alertas, tickets e artefatos devem ser preservados antes de alterações. Defina hash, local seguro e controle de acesso.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de preservação com integridade e rastreabilidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Normalizar tempo",
        "instruction": "Converta horários de todas as fontes para uma referência única, preferencialmente UTC, mantendo o horário original registrado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela temporal sem ambiguidade de fuso.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Mapear fontes por pergunta investigativa",
        "instruction": "Crie matriz: pergunta, fonte, campo, limitação. Exemplo: “quem iniciou conexão?” → EDR/processo; “o pacote chegou?” → PCAP no destino; “qual regra permitiu?” → firewall log.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz de investigação guiada por perguntas, não por ferramentas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Reconstruir fluxo técnico esperado",
        "instruction": "Desenhe origem, DNS, proxy, firewall, NAT, VPN, load balancer, backend, rota de retorno e logs gerados em cada ponto.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa de fluxo para comparar esperado versus observado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Analisar PCAP ou evidência de pacote",
        "instruction": "Defina quais sinais seriam analisados: DNS, ARP, TCP handshake, retransmissões, RST, ICMP, TLS alert, SNI e HTTP status quando disponível.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de observações de pacote sem extrapolação indevida.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Correlacionar com logs transacionais e de controle",
        "instruction": "Cruze PCAP/flow com Zeek, DNS, proxy, firewall, WAF, LB, VPN, EDR, IAM, cloud audit e tickets de mudança.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Evidência composta por múltiplas fontes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Construir timeline factual",
        "instruction": "Monte sequência de eventos com colunas: tempo, fonte, fato observado, interpretação, confiança, lacuna e próximo pivô.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Timeline defensável e auditável.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Definir contenção proporcional",
        "instruction": "Proponha ações como isolamento EDR, bloqueio de destino específico, revogação de token, ajuste de regra, captura adicional ou monitoramento reforçado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de resposta com impacto, dono, rollback e preservação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Produzir RCA e melhorias",
        "instruction": "Documente causa técnica provável, causa sistêmica, impacto, evidências, lacunas, decisões, ações tomadas, detecções novas e melhorias de arquitetura.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório final com aprendizado operacional.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DFIR de rede, PCAP e reconstrução de linha do tempo” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Sessão suspeita antes do alerta | Sinal: Fluxo precursor na timeline | Query: first_seen(flow) < alert_time AND dst=relevant | FP: Atividade legítima correlata\nDetecção: Exfiltração durante janela | Sinal: Volume anômalo depois de acesso suspeito | Query: bytes_out spike AFTER suspicious_auth | FP: Backup/replicação\nDetecção: DNS antes de conexão | Sinal: Query precede conexão para IP resolvido | Query: dns.query_time < conn.start AND dns.answer=conn.dst_ip | FP: Cache ou CDN",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Preservar evidência antes de limpar | Isolar host com justificativa | Revogar credenciais relacionadas | Bloquear IOC de forma reversível | Abrir trilha de RCA",
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
        "instruction": "Reconstrua timeline com DNS, TCP, TLS e EDR. Separe fato observado, inferência e lacuna de evidência.",
        "artifact": "# PCAP textual sanitizado: frame time src dst proto info\n1 2026-07-01T18:00:00Z 10.20.5.31 10.10.1.10 DNS A a1b2c3d4.lab-tunnel.example\n2 2026-07-01T18:00:00Z 10.10.1.10 10.20.5.31 DNS response A 203.0.113.77 TTL 60\n3 2026-07-01T18:00:01Z 10.20.5.31 203.0.113.77 TCP 51514 > 443 SYN\n4 2026-07-01T18:00:01Z 203.0.113.77 10.20.5.31 TCP 443 > 51514 SYN,ACK\n5 2026-07-01T18:00:02Z 10.20.5.31 203.0.113.77 TLS ClientHello SNI a1b2c3d4.lab-tunnel.example\n# timeline: 17:59 usuário logou | 18:00 DNS raro | 18:00 conexão TLS | 18:03 EDR processo incomum | 18:07 isolamento aprovado",
        "analysisTask": "Aplicar a ideia de detecção: timeline links DNS query -> TCP session -> TLS SNI -> endpoint process within incident window",
        "evidence": "PCAP textual sanitizado | Hash/identificador de evidência | Timeline | Fatos versus inferências",
        "expectedOutput": "Há sequência temporal coerente para investigação, mas a aula exige classificar lacunas e preservar evidência antes de conclusão.",
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
    "expectedResult": "Dossiê de DFIR de rede com escopo, preservação, matriz de fontes, mapa de fluxo, análise de pacote/logs, timeline, classificação, contenção, RCA e melhorias preventivas.",
    "validation": [
      {
        "check": "O dossiê deve permitir que outra pessoa entenda o que foi observado, de onde veio, qual confiança existe e por que a ação recomendada é proporcional.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O dossiê deve permitir que outra pessoa entenda o que foi observado, de onde veio, qual confiança existe e por que a ação recomendada é proporcional.",
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
        "symptom": "Se a investigação ficar travada, volte à pergunta investigativa: o que preciso provar ou refutar, qual fonte responde isso e qual limitação existe?",
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
      "Ativar retenção adequada de logs críticos antes de incidentes.",
      "Padronizar timestamps em UTC e sincronização NTP.",
      "Criar playbooks de coleta para PCAP, flow logs, DNS, proxy, firewall, EDR e cloud.",
      "Classificar sensibilidade de PCAP e aplicar controle de acesso.",
      "Versionar consultas e relatórios de DFIR como templates internos.",
      "Executar exercícios de mesa com SOC, rede, cloud, jurídico e privacidade.",
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
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "Hash do PCAP/log",
      "Origem e horário de coleta",
      "Timeline",
      "Eventos correlacionados",
      "Lacunas",
      "Conclusão com grau de confiança",
      "PCAP textual sanitizado",
      "Hash/identificador de evidência",
      "Fatos versus inferências"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “DFIR de rede, PCAP e reconstrução de linha do tempo” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Reconstruir timeline de um incidente de rede com evidências parciais",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Reconstruir incidente com evidências de rede preservadas, sem contaminar prova nem tirar conclusões além do que os dados sustentam.",
    "authorizedScope": "Somente PCAPs, logs e sistemas autorizados pelo processo de incidente. Dados sensíveis devem ser minimizados, mascarados e protegidos.",
    "allowedActions": [
      "Preservar cópia de evidência",
      "Registrar hash e origem",
      "Extrair metadados",
      "Correlacionar timeline",
      "Classificar confiança da evidência"
    ],
    "prohibitedActions": [
      "Alterar evidência original",
      "Compartilhar PCAP com dados sensíveis",
      "Executar payload extraído",
      "Atribuir autoria sem base",
      "Ignorar cadeia de custódia"
    ],
    "telemetrySources": [
      "PCAP",
      "Zeek logs",
      "Firewall/proxy/DNS logs",
      "EDR timeline",
      "Cloud audit",
      "IAM auth events",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Sessão suspeita antes do alerta",
        "signal": "Fluxo precursor na timeline",
        "queryIdea": "first_seen(flow) < alert_time AND dst=relevant",
        "commonFalsePositive": "Atividade legítima correlata",
        "response": "Marcar como evento relacionado, não causa comprovada sem evidência adicional."
      },
      {
        "name": "Exfiltração durante janela",
        "signal": "Volume anômalo depois de acesso suspeito",
        "queryIdea": "bytes_out spike AFTER suspicious_auth",
        "commonFalsePositive": "Backup/replicação",
        "response": "Correlacionar com processo, usuário e destino."
      },
      {
        "name": "DNS antes de conexão",
        "signal": "Query precede conexão para IP resolvido",
        "queryIdea": "dns.query_time < conn.start AND dns.answer=conn.dst_ip",
        "commonFalsePositive": "Cache ou CDN",
        "response": "Usar como elo de timeline, validando com TTL e processo."
      }
    ],
    "containmentActions": [
      "Preservar evidência antes de limpar",
      "Isolar host com justificativa",
      "Revogar credenciais relacionadas",
      "Bloquear IOC de forma reversível",
      "Abrir trilha de RCA"
    ],
    "evidenceChecklist": [
      "Hash do PCAP/log",
      "Origem e horário de coleta",
      "Timeline",
      "Eventos correlacionados",
      "Lacunas",
      "Conclusão com grau de confiança"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — PCAP textual e timeline de incidente",
      "theme": "DFIR de rede, PCAP textual e timeline",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "# PCAP textual sanitizado: frame time src dst proto info",
        "1 2026-07-01T18:00:00Z 10.20.5.31 10.10.1.10 DNS A a1b2c3d4.lab-tunnel.example",
        "2 2026-07-01T18:00:00Z 10.10.1.10 10.20.5.31 DNS response A 203.0.113.77 TTL 60",
        "3 2026-07-01T18:00:01Z 10.20.5.31 203.0.113.77 TCP 51514 > 443 SYN",
        "4 2026-07-01T18:00:01Z 203.0.113.77 10.20.5.31 TCP 443 > 51514 SYN,ACK",
        "5 2026-07-01T18:00:02Z 10.20.5.31 203.0.113.77 TLS ClientHello SNI a1b2c3d4.lab-tunnel.example",
        "# timeline: 17:59 usuário logou | 18:00 DNS raro | 18:00 conexão TLS | 18:03 EDR processo incomum | 18:07 isolamento aprovado"
      ],
      "analysisPrompt": "Reconstrua timeline com DNS, TCP, TLS e EDR. Separe fato observado, inferência e lacuna de evidência.",
      "detectionIdea": "timeline links DNS query -> TCP session -> TLS SNI -> endpoint process within incident window",
      "expectedFinding": "Há sequência temporal coerente para investigação, mas a aula exige classificar lacunas e preservar evidência antes de conclusão.",
      "evidenceToCollect": [
        "PCAP textual sanitizado",
        "Hash/identificador de evidência",
        "Timeline",
        "Fatos versus inferências"
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
      "title": "Fonte certa para a pergunta certa",
      "prompt": "Qual fonte é mais adequada para confirmar se um pacote chegou ao servidor: PCAP no cliente, PCAP no servidor, proxy log ou IAM log? Explique.",
      "expectedAnswer": "PCAP no servidor é mais direto para confirmar chegada ao servidor. PCAP no cliente mostra envio, proxy log pode mostrar intermediação web e IAM log mostra identidade/configuração, não chegada de pacote."
    },
    {
      "title": "Fato versus inferência",
      "prompt": "Um flow log mostra 5 GB enviados para IP externo. Isso prova exfiltração?",
      "expectedAnswer": "Não. Prova volume de tráfego para destino externo naquela fonte. Exfiltração exige contexto: dado sensível, autorização, processo, usuário, destino, DLP, logs de aplicação e baseline."
    },
    {
      "title": "Problema de tempo",
      "prompt": "Por que normalizar timestamps é essencial em DFIR?",
      "expectedAnswer": "Porque fontes podem usar fusos, atrasos e precisão diferentes. Sem normalização, a sequência causal pode ficar errada."
    },
    {
      "title": "Preservação",
      "prompt": "Por que alterar uma regra de firewall antes de coletar logs relevantes pode prejudicar a investigação?",
      "expectedAnswer": "Porque muda o estado do ambiente, pode sobrescrever evidências, reduzir rastreabilidade e dificultar a reconstrução do que ocorreu antes da mudança."
    },
    {
      "id": "ex16.11.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “DFIR de rede, PCAP e linha do tempo” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como PCAP, Zeek logs, Firewall/proxy/DNS logs, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.11.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Alterar evidência original: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Compartilhar PCAP com dados sensíveis: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Executar payload extraído: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.11.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — PCAP textual e timeline de incidente”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "Há sequência temporal coerente para investigação, mas a aula exige classificar lacunas e preservar evidência antes de conclusão. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual é a melhor definição de DFIR de rede?",
      "options": [
        "Executar varreduras fora de escopo para encontrar falhas.",
        "Investigar e responder incidentes usando evidências de rede preservadas e correlacionadas.",
        "Substituir todos os logs por prints de tela.",
        "Bloquear todo tráfego suspeito antes de qualquer coleta."
      ],
      "answer": 1,
      "explanation": "DFIR de rede combina investigação forense e resposta a incidentes com evidências de comunicação, logs e contexto."
    },
    {
      "question": "Qual afirmação sobre PCAP é mais correta?",
      "options": [
        "Sempre mostra usuário autenticado e dono do ativo.",
        "Pode conter pacotes detalhados, mas depende do ponto de captura e pode ter dados sensíveis.",
        "Substitui logs de cloud audit.",
        "Nunca precisa de controle de acesso."
      ],
      "answer": 1,
      "explanation": "PCAP é rico, mas tem limitações de perspectiva e sensibilidade."
    },
    {
      "question": "O que uma timeline madura deve separar?",
      "options": [
        "Apenas IPs internos e externos.",
        "Fato observado, inferência, hipótese, lacuna e nível de confiança.",
        "Somente eventos do firewall.",
        "Somente ações tomadas pelo SOC."
      ],
      "answer": 1,
      "explanation": "Separar fato, inferência e lacuna evita conclusões frágeis."
    },
    {
      "question": "Qual é uma boa prática de preservação de evidência?",
      "options": [
        "Mover arquivos sem registrar responsável.",
        "Calcular hash, registrar fonte, horário, coletor e armazenar com controle de acesso.",
        "Editar o PCAP para remover pacotes antes de registrar original.",
        "Coletar tudo sem escopo e compartilhar amplamente."
      ],
      "answer": 1,
      "explanation": "Integridade e rastreabilidade são essenciais para confiança na investigação."
    },
    {
      "question": "Por que flow logs sozinhos não provam conteúdo exfiltrado?",
      "options": [
        "Porque nunca possuem destino.",
        "Porque normalmente resumem metadados, não conteúdo nem autorização de negócio.",
        "Porque não têm timestamps.",
        "Porque só existem em redes físicas."
      ],
      "answer": 1,
      "explanation": "Flow logs ajudam com volume e sessão, mas precisam de contexto para conclusões sobre dados."
    },
    {
      "question": "Qual é a melhor contenção em investigação com suspeita moderada?",
      "options": [
        "Bloquear toda a internet da empresa imediatamente.",
        "Escolher ação específica, proporcional, reversível e documentada.",
        "Apagar logs para reduzir ruído.",
        "Ignorar até haver certeza absoluta."
      ],
      "answer": 1,
      "explanation": "Resposta proporcional reduz risco sem causar impacto desnecessário nem destruir evidências."
    }
  ],
  "flashcards": [
    {
      "front": "O que é DFIR?",
      "back": "Digital Forensics and Incident Response: investigação e resposta a incidentes com preservação e análise de evidências."
    },
    {
      "front": "O que PCAP oferece?",
      "back": "Detalhe de pacotes observados em um ponto de captura, com limitações de perspectiva e sensibilidade."
    },
    {
      "front": "O que flow log oferece?",
      "back": "Resumo de sessões: origem, destino, portas, protocolo, volume, timestamps e ação quando disponível."
    },
    {
      "front": "O que é cadeia de custódia?",
      "back": "Registro de quem coletou, quando, de onde, como armazenou e quem acessou a evidência."
    },
    {
      "front": "Por que normalizar tempo?",
      "back": "Para reconstruir sequência de eventos entre fontes com fusos, atrasos e precisão diferentes."
    },
    {
      "front": "Qual é a regra de ouro da timeline?",
      "back": "Separar fato observado, inferência, hipótese, lacuna e nível de confiança."
    }
  ],
  "mentorQuestions": [
    "Qual evidência prova o que você está afirmando e qual parte ainda é inferência?",
    "O ponto de captura escolhido consegue realmente enxergar o tráfego que você quer analisar?",
    "Que ação reduz risco agora sem destruir evidência nem causar impacto desnecessário?"
  ],
  "challenge": {
    "title": "Reconstruir timeline de um incidente de rede com evidências parciais",
    "description": "Um alerta indica possível C2 em uma estação, aumento de egress em um workload cloud e falha intermitente em aplicação interna. Crie um dossiê de DFIR de rede sem executar ações ofensivas.",
    "requirements": [
      "Definir escopo e autorização",
      "Listar evidências a preservar",
      "Normalizar timestamps",
      "Mapear fontes e perguntas investigativas",
      "Desenhar fluxo esperado",
      "Analisar sinais de PCAP/logs",
      "Correlacionar rede, endpoint, identidade, cloud e aplicação",
      "Construir timeline com fatos e lacunas",
      "Propor contenção proporcional",
      "Produzir RCA e backlog preventivo"
    ],
    "deliverable": "Relatório de DFIR com timeline, matriz de evidências, nível de confiança, decisões, contenção, RCA e melhorias.",
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
    "overview": "Uma solução madura começa por preservar e delimitar. Em seguida, normaliza tempo, escolhe fontes por pergunta, desenha o fluxo esperado, compara evidências, declara lacunas e só então recomenda contenção. A conclusão não deve ir além do que as fontes sustentam.",
    "keyPoints": [
      "PCAP prova o que foi observado naquele ponto, não em toda a rede.",
      "Flow logs ajudam em escala, mas não mostram conteúdo.",
      "Zeek enriquece transações de protocolo, mas depende da visibilidade do sensor.",
      "Firewall/proxy/WAF mostram decisões de controle e política.",
      "EDR/IAM/cloud audit conectam rede a processo, identidade e mudança.",
      "RCA deve gerar melhoria preventiva, não apenas relatório histórico."
    ],
    "commonMistakes": [
      "Confundir primeiro alerta com causa raiz.",
      "Não preservar evidências antes de mudanças.",
      "Ignorar fuso horário e atraso de ingestão.",
      "Concluir exfiltração apenas por volume.",
      "Compartilhar PCAP sensível sem controle.",
      "Fazer contenção ampla sem plano de rollback."
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
      "term": "DFIR",
      "definition": "Digital Forensics and Incident Response: prática de investigar e responder incidentes com evidências preservadas."
    },
    {
      "term": "PCAP",
      "definition": "Arquivo de captura de pacotes contendo tráfego observado em um ponto de rede."
    },
    {
      "term": "PCAPNG",
      "definition": "Formato de captura de pacotes mais moderno, capaz de armazenar metadados adicionais."
    },
    {
      "term": "Timeline",
      "definition": "Sequência normalizada de eventos com fontes, fatos, inferências, lacunas e confiança."
    },
    {
      "term": "Cadeia de custódia",
      "definition": "Registro da coleta, armazenamento, acesso e integridade de uma evidência."
    },
    {
      "term": "Pivô investigativo",
      "definition": "Campo ou artefato usado para navegar entre fontes, como IP, usuário, host, hash, domínio, request ID ou timestamp."
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
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "Falso positivo",
      "shortDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "longDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.11",
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
        "16.11",
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
        "16.11",
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
      "title": "NIST SP 800-86 — Guide to Integrating Forensic Techniques into Incident Response",
      "url": "https://csrc.nist.gov/pubs/sp/800/86/final"
    },
    {
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
    },
    {
      "title": "Wireshark User's Guide",
      "url": "https://www.wireshark.org/docs/wsug_html_chunked/"
    },
    {
      "title": "Wireshark User's Guide — Open Capture Files",
      "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChIOOpenSection.html"
    },
    {
      "title": "Zeek Documentation",
      "url": "https://docs.zeek.org/"
    },
    {
      "title": "Zeek Documentation — conn.log",
      "url": "https://docs.zeek.org/en/master/reference/logs/conn.html"
    }
  ],
  "nextLesson": "16.12 — Projeto final: Blue Team + Pentest autorizado de rede",
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
              "name": "Risco Blue Team específico — DFIR de rede, PCAP e reconstrução de linha do tempo",
              "description": "Em DFIR de rede, PCAP e reconstrução de linha do tempo, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
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
      "PCAP",
      "Zeek logs",
      "Firewall/proxy/DNS logs",
      "EDR timeline",
      "Cloud audit",
      "IAM auth events"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.11.",
      "Sessão suspeita antes do alerta — sinal: Fluxo precursor na timeline; ideia de consulta: first_seen(flow) < alert_time AND dst=relevant; falso positivo comum: Atividade legítima correlata.",
      "Exfiltração durante janela — sinal: Volume anômalo depois de acesso suspeito; ideia de consulta: bytes_out spike AFTER suspicious_auth; falso positivo comum: Backup/replicação.",
      "DNS antes de conexão — sinal: Query precede conexão para IP resolvido; ideia de consulta: dns.query_time < conn.start AND dns.answer=conn.dst_ip; falso positivo comum: Cache ou CDN."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente PCAPs, logs e sistemas autorizados pelo processo de incidente. Dados sensíveis devem ser minimizados, mascarados e protegidos.",
      "allowedActions": [
        "Preservar cópia de evidência",
        "Registrar hash e origem",
        "Extrair metadados",
        "Correlacionar timeline",
        "Classificar confiança da evidência"
      ],
      "prohibitedActions": [
        "Alterar evidência original",
        "Compartilhar PCAP com dados sensíveis",
        "Executar payload extraído",
        "Atribuir autoria sem base",
        "Ignorar cadeia de custódia"
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
      "Falha ou comportamento inesperado relacionado a DFIR de rede, PCAP e reconstrução de linha do tempo.",
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
      "Qual evidência comprova o entendimento da aula 16.11?"
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
      "16.12"
    ]
  },
  "blueTeamEnhancement": {
    "title": "DFIR de rede, PCAP e linha do tempo",
    "defensiveGoal": "Reconstruir incidente com evidências de rede preservadas, sem contaminar prova nem tirar conclusões além do que os dados sustentam.",
    "authorizedScope": "Somente PCAPs, logs e sistemas autorizados pelo processo de incidente. Dados sensíveis devem ser minimizados, mascarados e protegidos.",
    "allowedActions": [
      "Preservar cópia de evidência",
      "Registrar hash e origem",
      "Extrair metadados",
      "Correlacionar timeline",
      "Classificar confiança da evidência"
    ],
    "prohibitedActions": [
      "Alterar evidência original",
      "Compartilhar PCAP com dados sensíveis",
      "Executar payload extraído",
      "Atribuir autoria sem base",
      "Ignorar cadeia de custódia"
    ],
    "telemetrySources": [
      "PCAP",
      "Zeek logs",
      "Firewall/proxy/DNS logs",
      "EDR timeline",
      "Cloud audit",
      "IAM auth events"
    ],
    "detectionEngineering": [
      {
        "name": "Sessão suspeita antes do alerta",
        "signal": "Fluxo precursor na timeline",
        "queryIdea": "first_seen(flow) < alert_time AND dst=relevant",
        "commonFalsePositive": "Atividade legítima correlata",
        "response": "Marcar como evento relacionado, não causa comprovada sem evidência adicional."
      },
      {
        "name": "Exfiltração durante janela",
        "signal": "Volume anômalo depois de acesso suspeito",
        "queryIdea": "bytes_out spike AFTER suspicious_auth",
        "commonFalsePositive": "Backup/replicação",
        "response": "Correlacionar com processo, usuário e destino."
      },
      {
        "name": "DNS antes de conexão",
        "signal": "Query precede conexão para IP resolvido",
        "queryIdea": "dns.query_time < conn.start AND dns.answer=conn.dst_ip",
        "commonFalsePositive": "Cache ou CDN",
        "response": "Usar como elo de timeline, validando com TTL e processo."
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
      "Preservar evidência antes de limpar",
      "Isolar host com justificativa",
      "Revogar credenciais relacionadas",
      "Bloquear IOC de forma reversível",
      "Abrir trilha de RCA"
    ],
    "evidencePackage": [
      "Hash do PCAP/log",
      "Origem e horário de coleta",
      "Timeline",
      "Eventos correlacionados",
      "Lacunas",
      "Conclusão com grau de confiança"
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
    "title": "Dataset sintético — PCAP textual e timeline de incidente",
    "theme": "DFIR de rede, PCAP textual e timeline",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "# PCAP textual sanitizado: frame time src dst proto info",
      "1 2026-07-01T18:00:00Z 10.20.5.31 10.10.1.10 DNS A a1b2c3d4.lab-tunnel.example",
      "2 2026-07-01T18:00:00Z 10.10.1.10 10.20.5.31 DNS response A 203.0.113.77 TTL 60",
      "3 2026-07-01T18:00:01Z 10.20.5.31 203.0.113.77 TCP 51514 > 443 SYN",
      "4 2026-07-01T18:00:01Z 203.0.113.77 10.20.5.31 TCP 443 > 51514 SYN,ACK",
      "5 2026-07-01T18:00:02Z 10.20.5.31 203.0.113.77 TLS ClientHello SNI a1b2c3d4.lab-tunnel.example",
      "# timeline: 17:59 usuário logou | 18:00 DNS raro | 18:00 conexão TLS | 18:03 EDR processo incomum | 18:07 isolamento aprovado"
    ],
    "analysisPrompt": "Reconstrua timeline com DNS, TCP, TLS e EDR. Separe fato observado, inferência e lacuna de evidência.",
    "detectionIdea": "timeline links DNS query -> TCP session -> TLS SNI -> endpoint process within incident window",
    "expectedFinding": "Há sequência temporal coerente para investigação, mas a aula exige classificar lacunas e preservar evidência antes de conclusão.",
    "evidenceToCollect": [
      "PCAP textual sanitizado",
      "Hash/identificador de evidência",
      "Timeline",
      "Fatos versus inferências"
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
