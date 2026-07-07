export const lesson1304 = {
  "id": "13.4",
  "moduleId": "m13",
  "order": 4,
  "title": "IDS, IPS, NDR, NetFlow e Sensores de Rede",
  "subtitle": "Como transformar tráfego em evidência defensiva sem confundir visibilidade com proteção automática.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 340,
  "tags": [
    "redes",
    "segurança",
    "ids",
    "ips",
    "ndr",
    "netflow",
    "ipfix",
    "zeek",
    "suricata",
    "siem",
    "soc",
    "telemetria",
    "detecção"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.x",
      "reason": "TCP, UDP e portas ajudam a interpretar fluxos e alertas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewalls e ACLs são necessários para entender pontos de controle e logs."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.1",
      "reason": "Defesa em profundidade explica por que sensores são uma camada, não a arquitetura inteira."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Zonas e segmentação definem onde sensores devem enxergar tráfego."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.3",
      "reason": "Hardening e logs criam base para sensores confiáveis e auditáveis."
    }
  ],
  "objectives": [
    "Diferenciar IDS, IPS, NDR, NetFlow/IPFIX, Zeek/NSM e PCAP.",
    "Explicar por que posicionamento de sensor define visibilidade real.",
    "Escolher telemetria adequada para perguntas de investigação diferentes.",
    "Descrever riscos de falso positivo, falso negativo, perda de pacote e IPS mal calibrado.",
    "Relacionar sensores de rede com SIEM, SOC, resposta a incidente e arquitetura Zero Trust.",
    "Criar um plano defensivo de sensores para tráfego norte-sul, leste-oeste e cloud."
  ],
  "learningOutcomes": [
    "Dado um cenário, o aluno escolhe entre IDS passivo, IPS inline, flow logs, PCAP e NDR.",
    "Dado um alerta, o aluno identifica quais evidências adicionais devem ser coletadas.",
    "Dado um diagrama, o aluno aponta pontos cegos de sensores.",
    "Dado um ambiente cloud, o aluno propõe fontes de telemetria equivalentes.",
    "Dado um risco operacional, o aluno diferencia modo monitor e modo bloqueio."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Depois de segmentar a rede e endurecer ativos, surge uma pergunta inevitável: como você percebe que algo suspeito está acontecendo dentro do tráfego? Firewalls e ACLs decidem permitir ou bloquear fluxos, mas nem todo risco aparece como uma porta proibida. Um usuário pode autenticar corretamente e ainda transferir volume anormal de dados. Um servidor pode conversar com destino incomum. Um host pode começar a fazer muitas tentativas de conexão internas. Um malware pode usar HTTPS, DNS ou padrões de beaconing que parecem tráfego comum se você olhar apenas para portas.</p>\n  <p>IDS, IPS, NDR, NetFlow/IPFIX e sensores de rede existem para transformar tráfego em evidência. Eles ajudam o time de segurança a sair do achismo e responder: quem falou com quem, quando, por qual protocolo, com qual volume, com qual frequência, em que direção, com qual assinatura, com qual anomalia e com qual impacto provável.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o SOC recebe alerta de possível movimentação lateral. O firewall permitiu o tráfego porque a regra era válida, o EDR não bloqueou nada e a aplicação continua no ar. Sem sensores de rede, flow logs e telemetria, a investigação vira conversa de corredor em vez de linha do tempo baseada em evidência.</div>\n  <p>Nesta aula, você vai aprender a diferença entre detectar, prevenir, registrar fluxo, reconstruir contexto e operar sensores de rede sem derrubar produção nem criar falsa sensação de segurança.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No começo das redes corporativas, segurança de tráfego era fortemente associada a firewall de borda. A pergunta principal era se uma conexão da internet deveria entrar ou não. Com o crescimento de redes internas, VPNs, Wi-Fi, cloud, SaaS, APIs, endpoints móveis e ambientes híbridos, ficou claro que o perímetro sozinho não explicava o que ocorria dentro da rede.</p>\n  <p>IDS surgiu para observar tráfego e gerar alertas de intrusão. IPS evoluiu para colocar o sensor no caminho do tráfego e bloquear eventos conforme política. Paralelamente, tecnologias de flow como NetFlow e IPFIX permitiram registrar metadados de comunicação sem armazenar todos os pacotes. Ferramentas de Network Security Monitoring, como Zeek, passaram a gerar logs ricos de protocolos, enquanto motores como Suricata combinaram IDS, IPS e monitoramento de segurança de rede.</p>\n  <p>Mais recentemente, a categoria NDR ganhou espaço ao combinar telemetria de rede, comportamento, analytics, correlação e integrações com SIEM/SOAR. A motivação continua a mesma: a rede carrega sinais que nem sempre aparecem no endpoint ou na aplicação.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que redes modernas produzem tráfego demais para ser analisado manualmente e, ao mesmo tempo, tráfego criptografado demais para depender apenas de payload. Além disso, sensores mal posicionados enxergam pouco; sensores demais geram ruído; IPS mal calibrado pode derrubar serviço; e alertas sem contexto sobrecarregam o SOC.</p>\n  <ul>\n    <li><strong>Visibilidade incompleta:</strong> um sensor em local errado não enxerga tráfego leste-oeste crítico.</li>\n    <li><strong>Ruído operacional:</strong> assinatura sem tuning gera falso positivo e fadiga de alerta.</li>\n    <li><strong>Criptografia:</strong> TLS protege conteúdo, mas reduz inspeção de payload.</li>\n    <li><strong>Volume:</strong> PCAP completo é caro; flow é econômico, mas menos detalhado.</li>\n    <li><strong>Risco de inline:</strong> IPS bloqueia, mas também pode criar indisponibilidade se mal configurado.</li>\n  </ul>\n  <p>A solução não é escolher uma ferramenta “mágica”. É desenhar camadas de telemetria: onde usar IDS passivo, onde usar IPS inline, onde coletar flows, onde registrar logs ricos, quando capturar pacotes e como correlacionar tudo no SIEM.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução dos sensores acompanha a evolução da rede: de perímetro simples para ambientes distribuídos, criptografados e híbridos.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>IDS passivo</td><td>Recebe cópia do tráfego por TAP, SPAN ou mirror.</td><td>Baixo risco de indisponibilidade.</td><td>Detecta e alerta, mas não bloqueia sozinho.</td></tr>\n      <tr><td>IPS inline</td><td>Fica no caminho do tráfego e pode bloquear.</td><td>Prevenção ativa.</td><td>Exige alta disponibilidade, tuning e plano de rollback.</td></tr>\n      <tr><td>NetFlow/IPFIX</td><td>Exporta metadados de fluxos.</td><td>Escalável e útil para tendências.</td><td>Não contém payload completo.</td></tr>\n      <tr><td>NSM/Zeek</td><td>Converte tráfego em logs semânticos de protocolos.</td><td>Excelente para investigação e contexto.</td><td>Exige armazenamento, parsing e entendimento analítico.</td></tr>\n      <tr><td>NDR</td><td>Combina comportamento, telemetria, analytics e detecção.</td><td>Ajuda a detectar anomalias e movimentação lateral.</td><td>Pode ser caro e depende de integração e tuning.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>IDS, IPS, NDR, NetFlow/IPFIX e sensores de rede são mecanismos de visibilidade e detecção sobre comunicações. Eles não substituem segmentação, hardening, IAM ou resposta a incidentes. Eles fornecem evidências e, em alguns casos, ação automática.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> um sensor de rede é um ponto de coleta ou análise posicionado para observar tráfego, extrair sinais, gerar alertas, produzir logs ou alimentar sistemas de investigação e resposta.</div>\n  <p>A diferença central é o papel de cada tecnologia. IDS observa e alerta. IPS observa e pode bloquear. NetFlow/IPFIX resume fluxos. Zeek/NSM gera logs ricos de protocolos. NDR tenta detectar comportamento anômalo e ameaças usando contexto de rede. PCAP completo preserva pacotes para análise profunda, mas com maior custo de armazenamento e privacidade.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, sensores seguem um fluxo comum: receber tráfego, normalizar, extrair metadados, aplicar regras ou modelos, gerar eventos e enviar evidências para investigação.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Coleta:</strong> tráfego chega por TAP, SPAN, mirror port, agente, appliance, firewall, switch, roteador, cloud flow logs ou sensor virtual.</li>\n    <li><strong>Parsing:</strong> o sensor identifica protocolos, endereços, portas, horários, direção, volume, flags, nomes e, quando possível, detalhes de aplicação.</li>\n    <li><strong>Detecção:</strong> regras, assinaturas, reputação, heurísticas ou comportamento procuram padrões relevantes.</li>\n    <li><strong>Enriquecimento:</strong> eventos recebem contexto: ativo, criticidade, usuário, zona, aplicação, geolocalização, threat intel ou ticket.</li>\n    <li><strong>Ação:</strong> IDS alerta; IPS pode bloquear; NDR pode priorizar; SIEM correlaciona; SOAR pode acionar playbook.</li>\n    <li><strong>Investigação:</strong> analista valida falso positivo, impacto, escopo, linha do tempo e resposta.</li>\n  </ol>\n  <p>O sensor só enxerga o que passa por ele. Por isso, posicionamento é tão importante quanto ferramenta. Um sensor na borda não vê tráfego entre servidores internos. Um sensor na VLAN errada não enxerga Wi-Fi corporativo. Um flow collector sem identificação de zona perde contexto de segurança.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura defensiva madura combina sensores em pontos diferentes. Na borda, firewall e IPS ajudam a controlar tráfego norte-sul. No core ou datacenter, IDS/NDR e flow logs ajudam a enxergar tráfego leste-oeste. Em cloud, VPC Flow Logs, NSG Flow Logs, firewall logs e sensores virtuais complementam a visibilidade. Em Wi-Fi, controladora, RADIUS, WIDS/WIPS e DHCP/DNS ajudam a correlacionar usuário, dispositivo e rede.</p>\n  <ul>\n    <li><strong>Camadas envolvidas:</strong> L2 para espelhamento/TAP, L3/L4 para fluxos, L7 para protocolos e contexto.</li>\n    <li><strong>Componentes:</strong> TAP/SPAN, switch, roteador, firewall, IDS/IPS, NDR, flow collector, SIEM, SOAR e armazenamento.</li>\n    <li><strong>Pontos de falha:</strong> sensor sem capacidade, SPAN congestionado, relógio desalinhado, regra ruidosa, falta de contexto e bloqueio inline indevido.</li>\n    <li><strong>Dependências:</strong> NTP, inventário, zonas, nomenclatura, retenção de logs, matriz de fluxos e processo de resposta.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em um prédio corporativo. O firewall é a portaria; a segmentação são portas internas; hardening são fechaduras, crachás e câmeras funcionando; IDS é um vigilante que observa e avisa; IPS é uma porta que pode travar automaticamente; NetFlow é o registro de quem passou por qual corredor; PCAP é a filmagem detalhada; NDR é uma equipe que percebe padrões estranhos, como alguém andando por áreas que nunca visita.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> tráfego de rede pode ser criptografado, automatizado, distribuído e volumoso. Diferente de um prédio, uma conexão pode gerar milhares de eventos por minuto e nem sempre o sensor consegue ver o conteúdo.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em um laboratório doméstico, você pode rodar Wireshark ou tcpdump para observar que seu notebook conversa com gateway, DNS e sites externos. Se observar apenas pacotes, terá muito detalhe. Se observar apenas fluxos, verá pares origem/destino, portas, bytes e duração. Se usar um IDS com regras, alguns padrões podem virar alerta. O aprendizado central é perceber que cada forma de visibilidade responde perguntas diferentes.</p>\n  <p>Exemplo: “qual IP meu computador acessou?” pode ser respondido por flow. “qual consulta DNS foi feita?” pode exigir log DNS, Zeek ou PCAP. “qual conteúdo HTTP foi transferido?” pode exigir tráfego não criptografado, proxy ou telemetria de aplicação. “isso é malicioso?” depende de contexto, regra, reputação e investigação.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, sensores podem ser posicionados na saída para internet, entre usuários e datacenter, entre zonas críticas, no ambiente de servidores, no Wi-Fi corporativo e em links WAN. O SOC recebe alertas do IDS/IPS, eventos de NDR, logs de firewall, NetFlow/IPFIX e logs de DNS/proxy. Quando há suspeita de movimentação lateral, o analista cruza fluxo de origem, destino, porta, horário, usuário, host, zona e logs de autenticação.</p>\n  <p>Um bom desenho evita tanto cegueira quanto excesso. Sensores demais sem processo geram ruído. Sensores de menos criam lacunas. A arquitetura precisa dizer: que perguntas precisamos responder, onde o tráfego passa, que retenção precisamos, quais alertas são críticos e quem age quando algo aparece.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, a visibilidade muda. Nem sempre há switch físico para SPAN. A coleta vem de VPC Flow Logs, NSG Flow Logs, firewall gerenciado, load balancer logs, DNS logs, CloudTrail/Activity Logs, sensores virtuais, traffic mirroring quando disponível e integrações com SIEM. A pergunta arquitetural deixa de ser “em qual porta do switch conecto o sensor?” e passa a ser “em qual VPC/VNet, subnet, ENI/interface, firewall ou serviço habilito logs?”.</p>\n  <p>O custo também muda. Flow logs, storage, egress, SIEM ingestion e retenção podem gerar cobrança. Em ambiente cloud, sensor sem política de retenção pode custar caro; sensor sem tags e contexto pode gerar dados que ninguém usa.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, sensores entram como código e evidência. IaC pode habilitar flow logs, criar buckets com retenção, configurar firewall logs, definir labels de zona, publicar parsers no SIEM e validar que novos ambientes não nasçam sem telemetria. Pipelines podem falhar se uma VPC/VNet crítica for criada sem flow logs ou se um security group expuser serviço sem log e sem justificativa.</p>\n  <p>Em Kubernetes, a observabilidade de rede pode envolver CNI, NetworkPolicy, ingress controller, service mesh, logs de DNS interno, eBPF e flow visibility. O princípio continua: sem evidência de rede, incidentes em microsserviços viram suposição.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, sensores ajudam a detectar reconhecimento, varredura, conexões incomuns, beaconing, exfiltração, uso de protocolo indevido, tentativa lateral e comunicação com destinos suspeitos. O foco desta aula é defensivo: entender sinais, não executar ataques.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Sinal de rede</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Movimento lateral</td><td>Muitas conexões internas de host incomum para múltiplos destinos.</td><td>Ampliação do incidente.</td><td>Segmentação, alertas de flow, NDR, logs de autenticação e resposta rápida.</td></tr>\n      <tr><td>Exfiltração</td><td>Volume anormal de saída ou destino novo.</td><td>Vazamento de dados.</td><td>DLP, egress control, proxy, flow analytics, revisão de permissões.</td></tr>\n      <tr><td>Sensor cego</td><td>Eventos sem tráfego correspondente em zona crítica.</td><td>Investigação incompleta.</td><td>Revisar posicionamento, SPAN/TAP, flow logs e cobertura.</td></tr>\n      <tr><td>IPS mal calibrado</td><td>Bloqueios legítimos após atualização de regra.</td><td>Indisponibilidade.</td><td>Modo monitor, tuning, janela de mudança, exceção documentada e rollback.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 560\" role=\"img\" aria-labelledby=\"ids-title ids-desc\">\n    <title id=\"ids-title\">Arquitetura de sensores de rede</title>\n    <desc id=\"ids-desc\">Diagrama mostrando usuários, servidores, internet, firewall, IDS passivo, IPS inline, NDR, flow collector e SIEM.</desc>\n    <defs>\n      <marker id=\"arrow-sensor\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"130\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Usuários</text>\n    <text x=\"130\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi / LAN</text>\n\n    <rect x=\"300\" y=\"70\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"390\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Core / Switch</text>\n    <text x=\"390\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">TAP / SPAN / Flow</text>\n\n    <rect x=\"560\" y=\"70\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"650\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Firewall / IPS</text>\n    <text x=\"650\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">inline controlado</text>\n\n    <rect x=\"820\" y=\"70\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"910\" y=\"108\" text-anchor=\"middle\" class=\"svg-label\">Internet / Cloud</text>\n    <text x=\"910\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SaaS / VPC / APIs</text>\n\n    <rect x=\"300\" y=\"250\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"390\" y=\"288\" text-anchor=\"middle\" class=\"svg-label\">Servidores</text>\n    <text x=\"390\" y=\"314\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tráfego leste-oeste</text>\n\n    <rect x=\"70\" y=\"390\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"155\" y=\"426\" text-anchor=\"middle\" class=\"svg-label\">IDS passivo</text>\n    <text x=\"155\" y=\"452\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">alertas e PCAP</text>\n\n    <rect x=\"300\" y=\"390\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"385\" y=\"426\" text-anchor=\"middle\" class=\"svg-label\">Flow Collector</text>\n    <text x=\"385\" y=\"452\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">NetFlow / IPFIX</text>\n\n    <rect x=\"530\" y=\"390\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"615\" y=\"426\" text-anchor=\"middle\" class=\"svg-label\">NDR / NSM</text>\n    <text x=\"615\" y=\"452\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">comportamento</text>\n\n    <rect x=\"760\" y=\"390\" width=\"220\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"870\" y=\"426\" text-anchor=\"middle\" class=\"svg-label\">SIEM / SOAR</text>\n    <text x=\"870\" y=\"452\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">correlação e resposta</text>\n\n    <line x1=\"220\" y1=\"115\" x2=\"300\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"480\" y1=\"115\" x2=\"560\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"740\" y1=\"115\" x2=\"820\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"390\" y1=\"160\" x2=\"390\" y2=\"250\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n\n    <line x1=\"330\" y1=\"160\" x2=\"155\" y2=\"390\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"390\" y1=\"160\" x2=\"385\" y2=\"390\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"450\" y1=\"160\" x2=\"615\" y2=\"390\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"240\" y1=\"435\" x2=\"300\" y2=\"435\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"470\" y1=\"435\" x2=\"530\" y2=\"435\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n    <line x1=\"700\" y1=\"435\" x2=\"760\" y2=\"435\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-sensor)\"></line>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é defensivo e de arquitetura. Você vai desenhar posicionamento de sensores, matriz de telemetria e plano de validação sem executar varredura, ataque, deauth, exploração ou geração intencional de tráfego malicioso.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam escolha de sensor, interpretação de telemetria, trade-offs entre flow e PCAP, e posicionamento em topologias corporativas e cloud.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula um SOC que precisa melhorar visibilidade após um incidente em que havia firewall, mas faltava evidência de tráfego leste-oeste.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como priorizar perguntas investigativas, posicionar sensores e evitar respostas comuns erradas, como colocar um único IDS na borda e declarar a rede monitorada.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>IDS alerta; IPS pode bloquear; flow resume; PCAP detalha; NDR correlaciona comportamento.</li>\n    <li>Sensor só enxerga o tráfego que passa por ele.</li>\n    <li>Flow é escalável, mas não substitui PCAP em análise profunda.</li>\n    <li>IPS inline exige tuning, alta disponibilidade e rollback.</li>\n    <li>Sem inventário, zonas, NTP e SIEM, telemetria perde valor investigativo.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>A próxima aula será <strong>13.5 — SIEM, Logs, Telemetria e Correlação de Eventos de Rede</strong>. Depois de entender sensores, precisamos aprender como os eventos chegam ao SIEM, como são normalizados, correlacionados e transformados em investigação útil.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IP",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS",
      "ICMP",
      "NetFlow",
      "IPFIX",
      "Syslog"
    ],
    "dependsOn": [
      "Segmentação",
      "Firewall",
      "ACL",
      "Logs",
      "NTP",
      "Inventário",
      "Zonas de segurança"
    ],
    "enables": [
      "Detecção",
      "Threat hunting",
      "Investigação",
      "Resposta a incidente",
      "SIEM",
      "NDR",
      "SOC"
    ]
  },
  "protocolFields": [
    {
      "field": "Source Address",
      "size": "variável",
      "purpose": "Identificar origem do fluxo ou pacote.",
      "securityObservation": "Sem NAT mapping, DHCP e inventário, origem pode ficar ambígua."
    },
    {
      "field": "Destination Address",
      "size": "variável",
      "purpose": "Identificar destino observado.",
      "securityObservation": "Destino incomum pode indicar C2, exfiltração ou erro de aplicação."
    },
    {
      "field": "Source/Destination Port",
      "size": "16 bits cada em TCP/UDP",
      "purpose": "Indicar serviço ou porta de comunicação.",
      "securityObservation": "Porta não prova aplicação; tráfego pode usar porta comum para finalidade diferente."
    },
    {
      "field": "Bytes/Packets/Duration",
      "size": "variável em flow records",
      "purpose": "Medir volume, frequência e duração.",
      "securityObservation": "Anomalias de volume ajudam a detectar exfiltração ou beaconing."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Switch ou TAP",
      "action": "Entrega cópia do tráfego ao sensor",
      "detail": "SPAN/TAP deve preservar tráfego relevante sem saturar.",
      "possibleFailure": "Sensor perde pacotes ou não vê VLANs críticas."
    },
    {
      "step": 2,
      "actor": "IDS/NDR/NSM",
      "action": "Analisa metadados, protocolos e padrões",
      "detail": "Assinaturas, parsers e heurísticas geram eventos.",
      "possibleFailure": "Assinatura ruidosa gera falso positivo; tráfego criptografado reduz payload."
    },
    {
      "step": 3,
      "actor": "Flow exporter",
      "action": "Exporta metadados para collector",
      "detail": "IPFIX/NetFlow registra conversas em vez de pacote completo.",
      "possibleFailure": "Sem amostragem adequada ou campos essenciais, investigação fica pobre."
    },
    {
      "step": 4,
      "actor": "SIEM/SOC",
      "action": "Correlaciona evento com inventário, zona e logs",
      "detail": "Contexto transforma alerta em caso investigável.",
      "possibleFailure": "Alerta sem contexto vira ruído."
    }
  ],
  "trafficCapture": {
    "tool": "Wireshark, tcpdump, Zeek, Suricata, NetFlow/IPFIX collector ou flow logs cloud",
    "filter": "tcp or udp or icmp",
    "whatToObserve": [
      "Pares origem/destino",
      "Portas e protocolos",
      "Volume e frequência",
      "DNS consultado",
      "Sinais de retransmissão",
      "Eventos de alerta",
      "Tempo e direção do fluxo"
    ],
    "interpretation": "O aluno deve diferenciar pacote completo, log semântico, alerta e metadado de flow. Cada evidência responde perguntas diferentes."
  },
  "deepDive": {
    "mentalModel": "Sensores de rede são instrumentos de observabilidade defensiva: eles não tornam a rede segura sozinhos, mas permitem detectar, investigar e responder com evidência.",
    "keyTerms": [
      "IDS",
      "IPS",
      "NDR",
      "NetFlow",
      "IPFIX",
      "PCAP",
      "TAP",
      "SPAN",
      "sensor inline",
      "sensor passivo",
      "falso positivo",
      "falso negativo",
      "tuning"
    ],
    "limitations": [
      "Tráfego criptografado reduz visibilidade de payload.",
      "Sensor mal posicionado cria ponto cego.",
      "IPS mal calibrado pode causar indisponibilidade.",
      "Flow não substitui pacote completo.",
      "Alertas sem contexto geram fadiga operacional."
    ],
    "whenToUse": [
      "Monitorar borda de internet.",
      "Observar tráfego entre zonas críticas.",
      "Investigar movimento lateral.",
      "Criar baseline de comunicação normal.",
      "Alimentar SIEM e threat hunting."
    ],
    "whenNotToUse": [
      "Não colocar IPS inline sem teste, HA e rollback.",
      "Não capturar PCAP indiscriminadamente sem necessidade, retenção e controle de privacidade.",
      "Não declarar cobertura total sem validar caminhos de tráfego.",
      "Não tratar NDR como substituto de segmentação e hardening."
    ],
    "operationalImpact": [
      "Exige tuning contínuo.",
      "Aumenta volume de logs e necessidade de retenção.",
      "Exige inventário e classificação de ativos.",
      "Muda rotina do SOC e de rede.",
      "Requer processo para exceções e falso positivo."
    ],
    "financialImpact": [
      "Pode exigir appliances, licenças, storage, SIEM ingestion e links de mirror.",
      "PCAP completo tem custo alto de armazenamento.",
      "Flow é mais barato que PCAP, mas menos detalhado.",
      "Cloud logs podem gerar custo por volume e retenção."
    ],
    "securityImpact": [
      "Melhora detecção e investigação.",
      "Reduz tempo de resposta.",
      "Ajuda a descobrir tráfego não documentado.",
      "Pode expor dados sensíveis se PCAP for mal protegido.",
      "Permite validar controles de segmentação."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que IDS bloqueia tráfego por padrão.",
      "whyItHappens": "IDS e IPS são citados juntos.",
      "consequence": "Arquitetura fica dependente de um controle que apenas alerta.",
      "correction": "IDS é passivo; IPS é inline ou integrado a ponto de bloqueio."
    },
    {
      "mistake": "Colocar sensor só na borda e ignorar leste-oeste.",
      "whyItHappens": "Modelo antigo de perímetro domina o desenho mental.",
      "consequence": "Movimento lateral interno pode não ser visto.",
      "correction": "Posicionar sensores por zonas e perguntas investigativas."
    },
    {
      "mistake": "Guardar PCAP completo sem política.",
      "whyItHappens": "Parece a evidência mais completa.",
      "consequence": "Custo, privacidade e risco de dados sensíveis.",
      "correction": "Usar PCAP por escopo, retenção, proteção e necessidade."
    },
    {
      "mistake": "Ativar IPS em bloqueio sem tuning.",
      "whyItHappens": "Pressão por prevenção rápida.",
      "consequence": "Falso positivo pode derrubar serviço crítico.",
      "correction": "Começar em monitoramento, analisar impacto e criar plano de rollback."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Sensor não gera eventos",
      "Alertas demais",
      "IPS bloqueia tráfego legítimo",
      "Flow collector sem dados",
      "PCAP não mostra VLAN esperada",
      "SIEM recebe eventos sem contexto"
    ],
    "diagnosticQuestions": [
      "O tráfego realmente passa pelo ponto monitorado?",
      "SPAN/TAP inclui VLANs necessárias?",
      "Há perda de pacotes?",
      "Relógios estão sincronizados?",
      "Campos de flow são suficientes?",
      "O alerta tem contexto de ativo e zona?"
    ],
    "commands": [
      {
        "platform": "Linux",
        "command": "ip link show && ip addr",
        "purpose": "Ver interfaces disponíveis no sensor.",
        "expectedObservation": "Interface de captura presente e ativa.",
        "interpretation": "Interface down ou errada impede visibilidade."
      },
      {
        "platform": "Linux",
        "command": "sudo tcpdump -nn -i <interface> -c 20",
        "purpose": "Confirmar se o sensor recebe pacotes.",
        "expectedObservation": "Pacotes chegando na interface correta.",
        "interpretation": "Sem pacotes indica SPAN/TAP/configuração incorreta."
      },
      {
        "platform": "Linux",
        "command": "sudo suricata -T -c /etc/suricata/suricata.yaml",
        "purpose": "Validar configuração do Suricata sem iniciar bloqueio.",
        "expectedObservation": "Configuration provided was successfully loaded.",
        "interpretation": "Erros de regra/config devem ser corrigidos antes de produção."
      },
      {
        "platform": "Linux",
        "command": "zeek -r exemplo.pcap",
        "purpose": "Processar PCAP autorizado e gerar logs para estudo.",
        "expectedObservation": "Arquivos como conn.log, dns.log ou http.log conforme tráfego.",
        "interpretation": "Logs semânticos ajudam investigação sem ler pacote por pacote."
      },
      {
        "platform": "Cisco IOS",
        "command": "show flow exporter && show flow monitor && show flow monitor <nome> cache",
        "purpose": "Verificar exportação e cache NetFlow/Flexible NetFlow.",
        "expectedObservation": "Exporter, monitor e flows ativos.",
        "interpretation": "Sem exporter/monitor ativo não há telemetria de flow para coletor."
      }
    ],
    "decisionTree": [
      {
        "if": "Sensor não vê tráfego",
        "then": "Verificar SPAN/TAP, VLANs, interface, filtros e caminho real."
      },
      {
        "if": "Alertas demais",
        "then": "Separar falso positivo, criar baseline, ajustar severidade e contexto."
      },
      {
        "if": "IPS causou bloqueio indevido",
        "then": "Mover para modo monitor, abrir incidente de mudança e revisar regra."
      },
      {
        "if": "Flow existe, mas investigação é inconclusiva",
        "then": "Coletar logs de DNS, proxy, firewall, endpoint ou PCAP de escopo reduzido."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Definir perguntas de detecção antes de comprar ferramenta.",
      "Posicionar sensores por zona e fluxo crítico.",
      "Sincronizar tempo com NTP.",
      "Enviar eventos para SIEM com contexto de ativo.",
      "Proteger PCAP e logs como dados sensíveis.",
      "Testar IPS em modo monitor antes de bloquear."
    ],
    "badPractices": [
      "Depender de um único sensor na borda.",
      "Ativar bloqueio automático sem tuning.",
      "Coletar dados sem retenção definida.",
      "Ignorar tráfego leste-oeste.",
      "Não documentar exceções de alerta.",
      "Não validar se o sensor realmente vê o tráfego."
    ],
    "commonErrors": [
      "Confundir visibilidade com proteção.",
      "Confundir NetFlow com PCAP.",
      "Confiar em porta como se fosse aplicação.",
      "Ignorar criptografia e privacidade.",
      "Medir sucesso por quantidade de alertas, não por qualidade."
    ],
    "vulnerabilities": [
      {
        "name": "Ponto cego de monitoramento",
        "description": "Caminhos de tráfego críticos não passam por sensor.",
        "defensiveExplanation": "Ataques internos podem ocorrer sem eventos úteis.",
        "mitigation": "Revisar topologia, zonas, SPAN/TAP, flow logs e cloud logs."
      },
      {
        "name": "Fadiga de alerta",
        "description": "Alertas excessivos reduzem atenção do SOC.",
        "defensiveExplanation": "Eventos importantes podem ser ignorados.",
        "mitigation": "Tuning, baseline, contexto, severidade e playbooks."
      },
      {
        "name": "PCAP sensível exposto",
        "description": "Capturas podem conter dados, tokens, metadados e informações internas.",
        "defensiveExplanation": "Evidência mal protegida vira vazamento.",
        "mitigation": "Criptografia, acesso mínimo, retenção, mascaramento e cadeia de custódia."
      }
    ],
    "monitoring": [
      "Taxa de eventos por sensor",
      "Perda de pacotes",
      "Volume de flow por zona",
      "Alertas por severidade",
      "Tempo de triagem",
      "Cobertura por segmento",
      "Eventos sem contexto"
    ],
    "hardening": [
      "Interface de gestão do sensor restrita",
      "Atualização de assinaturas controlada",
      "Conta nominativa e MFA",
      "Logs administrativos",
      "NTP",
      "Backup de configuração",
      "Separação entre plano de captura e plano de gestão"
    ],
    "detectionIdeas": [
      "Host comum falando com muitos servidores",
      "Volume de saída acima do baseline",
      "Beaconing regular para destino incomum",
      "Conexões internas fora da matriz de fluxo",
      "Aumento súbito de negações no firewall",
      "DNS para domínios raros ou recém-observados"
    ]
  },
  "lab": {
    "id": "lab-13.4",
    "title": "Desenhar uma arquitetura defensiva de sensores de rede",
    "labType": "security",
    "objective": "Criar um plano de visibilidade com IDS, IPS, NDR, NetFlow/IPFIX, logs cloud e SIEM para uma rede corporativa fictícia.",
    "scenario": "Uma empresa possui usuários em LAN/Wi-Fi, servidores internos, saída para internet, VPN e uma VPC/VNet cloud. Após incidente, o SOC percebeu que faltavam evidências de tráfego lateral.",
    "topology": "Usuários -> Core -> Firewall/IPS -> Internet/Cloud; Core -> Servidores; APs/controladora -> RADIUS/DHCP/DNS; Flow collector e SIEM centralizados.",
    "architecture": "Sensores passivos em core e datacenter, IPS controlado na borda, flow collectors nos roteadores/firewalls, logs cloud habilitados e SIEM com contexto de ativos e zonas.",
    "prerequisites": [
      "Conhecer VLANs, sub-redes, firewall, logs e segmentação.",
      "Ter acesso a editor de texto ou planilha.",
      "Não executar testes ofensivos em rede real."
    ],
    "tools": [
      "Editor de texto",
      "Planilha",
      "Opcional: Wireshark em laboratório autorizado",
      "Opcional: tcpdump em interface própria",
      "Opcional: documentação de firewall/switch/cloud"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varredura, exploração, deauth, ataque ou geração intencional de tráfego malicioso.",
      "Não capture tráfego de terceiros sem autorização explícita.",
      "Trate PCAP como dado sensível.",
      "Use apenas laboratório próprio ou cenário conceitual."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir perguntas investigativas",
        "instruction": "Liste cinco perguntas que o SOC precisa responder durante incidente de rede.",
        "command": "Perguntas: quem falou com quem? quando? por qual porta/protocolo? qual volume? atravessou qual zona?",
        "expectedOutput": "Lista de perguntas priorizadas.",
        "explanation": "Sensor deve existir para responder perguntas reais, não para enfeitar arquitetura."
      },
      {
        "number": 2,
        "title": "Mapear zonas e caminhos",
        "instruction": "Desenhe usuários, Wi‑Fi, servidores, internet, VPN e cloud. Marque caminhos norte-sul e leste-oeste.",
        "command": "Diagrama conceitual ou tabela: origem | destino | caminho | zona | criticidade",
        "expectedOutput": "Mapa simples de fluxos críticos.",
        "explanation": "Posicionamento de sensor depende do caminho do tráfego."
      },
      {
        "number": 3,
        "title": "Escolher telemetria por pergunta",
        "instruction": "Para cada pergunta, escolha IDS, IPS, flow, PCAP, logs DNS/proxy, NDR ou SIEM.",
        "command": "Pergunta | Fonte de telemetria | Retenção | Dono | Limitação",
        "expectedOutput": "Matriz de telemetria.",
        "explanation": "Diferentes fontes respondem perguntas diferentes."
      },
      {
        "number": 4,
        "title": "Definir pontos de sensor",
        "instruction": "Marque onde haverá sensor passivo, IPS inline, flow exporter e logs cloud.",
        "command": "Ponto | Tipo | Tráfego visto | Risco | Mitigação",
        "expectedOutput": "Tabela de posicionamento.",
        "explanation": "Sensor na borda não substitui sensor interno."
      },
      {
        "number": 5,
        "title": "Planejar SIEM e contexto",
        "instruction": "Defina quais campos devem acompanhar eventos: ativo, zona, usuário, criticidade, regra, timestamp e ação.",
        "command": "Campo | Fonte | Obrigatório? | Motivo",
        "expectedOutput": "Modelo de evento enriquecido.",
        "explanation": "Alerta sem contexto é difícil de priorizar."
      },
      {
        "number": 6,
        "title": "Criar plano de validação",
        "instruction": "Liste como provar que cada sensor está recebendo eventos esperados sem usar tráfego ofensivo.",
        "command": "Sensor | Validação defensiva | Evidência | Frequência",
        "expectedOutput": "Checklist de validação.",
        "explanation": "A validação deve confirmar visibilidade sem criar risco."
      }
    ],
    "expectedResult": "Ao final, o aluno terá uma arquitetura defensiva de sensores com perguntas, pontos de coleta, fontes de telemetria, riscos, validação e integração com SIEM.",
    "validation": [
      {
        "check": "Cada zona crítica possui fonte de telemetria",
        "command": "Revisar matriz zona x sensor",
        "expected": "Nenhuma zona crítica sem visibilidade definida.",
        "ifFails": "Adicionar flow log, sensor passivo, firewall log ou outra fonte compatível."
      },
      {
        "check": "IPS inline tem plano de rollback",
        "command": "Revisar tabela de riscos",
        "expected": "Cada IPS tem modo monitor, HA ou rollback documentado.",
        "ifFails": "Não colocar em bloqueio antes de tuning e mudança aprovada."
      },
      {
        "check": "Eventos têm contexto",
        "command": "Revisar modelo de evento",
        "expected": "Ativo, zona, timestamp, origem, destino e severidade presentes.",
        "ifFails": "Adicionar integração com inventário, DHCP, IAM ou CMDB."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Sensor sem tráfego",
        "probableCause": "SPAN/TAP errado ou caminho de tráfego diferente do desenho.",
        "howToConfirm": "Comparar topologia real com ponto de coleta e capturar pacotes de teste autorizado.",
        "fix": "Ajustar mirror, VLAN, interface ou posicionamento."
      },
      {
        "symptom": "Alertas ruidosos",
        "probableCause": "Regras sem baseline ou sem contexto.",
        "howToConfirm": "Ver frequência, ativos afetados e taxa de falso positivo.",
        "fix": "Tunar regra, severidade, exceção e enriquecimento."
      },
      {
        "symptom": "Flow sem utilidade investigativa",
        "probableCause": "Campos insuficientes ou amostragem inadequada.",
        "howToConfirm": "Revisar template IPFIX/NetFlow e collector.",
        "fix": "Ajustar exporter, campos e retenção."
      }
    ],
    "improvements": [
      "Adicionar Zeek para logs semânticos de DNS/HTTP/TLS onde permitido.",
      "Adicionar dashboards por zona.",
      "Criar playbook de investigação para movimento lateral.",
      "Comparar baseline mensal de tráfego.",
      "Integrar alertas com CMDB e IAM."
    ],
    "evidenceToCollect": [
      "Diagrama de sensores",
      "Matriz de telemetria",
      "Tabela de pontos cegos",
      "Plano de validação",
      "Plano de retenção",
      "Modelo de evento SIEM"
    ],
    "questions": [
      "Que pergunta cada sensor responde?",
      "Qual tráfego fica invisível?",
      "Qual é o custo de armazenamento?",
      "O sensor pode derrubar produção?",
      "Quem age quando o alerta dispara?"
    ],
    "challenge": "A empresa quer reduzir tempo de investigação de movimento lateral sem instalar IPS em todos os segmentos. Proponha arquitetura de sensores, telemetria e SIEM para responder rapidamente a incidentes internos.",
    "solution": "Priorize flow e NDR/IDS passivo em pontos de agregação internos, logs de firewall entre zonas, DNS/DHCP/IAM para atribuição, SIEM com contexto de ativo e playbook de triagem. Use IPS inline apenas em pontos de controle com baixo risco operacional e plano de rollback."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um IDS na borda não garante visibilidade de movimento lateral?",
      "hints": [
        "Pense em tráfego entre servidores internos.",
        "Pense em caminhos que não passam pela internet."
      ],
      "expectedIdeas": [
        "leste-oeste",
        "ponto cego",
        "posicionamento",
        "zonas"
      ],
      "explanation": "Sensor só observa o tráfego que passa por ele."
    },
    {
      "type": "diagnóstico",
      "question": "Um IPS começou a bloquear acessos legítimos após atualização de regras. O que você faria?",
      "hints": [
        "Pense em modo monitor.",
        "Pense em rollback e janela de mudança."
      ],
      "expectedIdeas": [
        "reduzir para monitor",
        "identificar regra",
        "abrir mudança",
        "exceção temporária",
        "validar impacto"
      ],
      "explanation": "Prevenção sem tuning pode virar indisponibilidade."
    },
    {
      "type": "cenário real",
      "question": "Que fontes combinaria para investigar suspeita de exfiltração?",
      "hints": [
        "Pense em volume, destino, DNS, proxy e usuário.",
        "Pense em flow e logs de aplicação."
      ],
      "expectedIdeas": [
        "NetFlow/IPFIX",
        "proxy",
        "DNS",
        "firewall",
        "EDR",
        "SIEM",
        "baseline"
      ],
      "explanation": "Exfiltração geralmente exige correlação de volume, destino, identidade e contexto."
    }
  ],
  "quiz": [
    {
      "id": "q13.4.1",
      "type": "conceito",
      "q": "Qual é a diferença central entre IDS e IPS?",
      "opts": [
        "IDS normalmente alerta; IPS pode bloquear tráfego inline ou integrado ao ponto de controle.",
        "IDS é sempre cloud; IPS é sempre físico.",
        "IDS usa IPFIX; IPS usa apenas PCAP.",
        "IDS só funciona com Wi-Fi; IPS só com cabo."
      ],
      "a": 0,
      "exp": "IDS é tipicamente passivo/detectivo; IPS tem função preventiva e pode bloquear conforme política.",
      "difficulty": "iniciante",
      "topic": "IDS/IPS"
    },
    {
      "id": "q13.4.2",
      "type": "comparação",
      "q": "Qual evidência é mais adequada para responder rapidamente 'quem falou com quem e quanto trafegou'?",
      "opts": [
        "NetFlow/IPFIX ou flow logs.",
        "Apenas captura de tela do usuário.",
        "Somente inventário físico.",
        "Somente certificado TLS."
      ],
      "a": 0,
      "exp": "Flow resume origem, destino, portas, volume e duração de comunicação.",
      "difficulty": "intermediário",
      "topic": "NetFlow/IPFIX"
    },
    {
      "id": "q13.4.3",
      "type": "arquitetura",
      "q": "Por que posicionamento de sensor é crítico?",
      "opts": [
        "Porque sensor só enxerga tráfego que passa por ele.",
        "Porque todo sensor bloqueia por padrão.",
        "Porque sensores dispensam firewall.",
        "Porque sensores não precisam de NTP."
      ],
      "a": 0,
      "exp": "O ponto de coleta define visibilidade real e pontos cegos.",
      "difficulty": "intermediário",
      "topic": "posicionamento"
    },
    {
      "id": "q13.4.4",
      "type": "segurança",
      "q": "Qual risco existe ao armazenar PCAP completo sem política?",
      "opts": [
        "Exposição de dados sensíveis, custo alto e retenção inadequada.",
        "Redução automática de latência.",
        "Eliminação de necessidade de SIEM.",
        "Bloqueio automático de todo ataque."
      ],
      "a": 0,
      "exp": "PCAP pode conter dados sensíveis e precisa de controle de acesso e retenção.",
      "difficulty": "intermediário",
      "topic": "PCAP"
    },
    {
      "id": "q13.4.5",
      "type": "diagnóstico",
      "q": "O SIEM recebe alertas de IDS, mas os analistas não sabem priorizar. O que falta provavelmente?",
      "opts": [
        "Contexto de ativo, zona, criticidade, usuário e baseline.",
        "Mais alertas sem classificação.",
        "Desligar NTP.",
        "Remover inventário."
      ],
      "a": 0,
      "exp": "Alertas sem contexto viram ruído operacional.",
      "difficulty": "intermediário",
      "topic": "SIEM"
    },
    {
      "id": "q13.4.6",
      "type": "cloud",
      "q": "Em cloud, qual fonte costuma substituir parte da visibilidade de NetFlow físico?",
      "opts": [
        "VPC/VNet flow logs ou equivalente do provedor.",
        "Arquivo hosts local.",
        "Somente screenshot do console.",
        "Desativar logs para reduzir ruído."
      ],
      "a": 0,
      "exp": "Flow logs de cloud registram metadados de comunicação em redes virtuais.",
      "difficulty": "intermediário",
      "topic": "cloud"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.4.1",
      "front": "O que é IDS?",
      "back": "Sistema de detecção que observa eventos ou tráfego e gera alertas sem necessariamente bloquear.",
      "tags": [
        "ids"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.4.2",
      "front": "O que é IPS?",
      "back": "Sistema de prevenção que pode bloquear tráfego conforme regras ou políticas, normalmente no caminho do tráfego.",
      "tags": [
        "ips"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.4.3",
      "front": "O que NetFlow/IPFIX registra?",
      "back": "Metadados de fluxos, como origem, destino, portas, protocolo, volume, duração e horários.",
      "tags": [
        "netflow",
        "ipfix"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.4.4",
      "front": "Por que PCAP é sensível?",
      "back": "Porque pode conter conteúdo, metadados, tokens, nomes internos e evidências que exigem controle de acesso e retenção.",
      "tags": [
        "pcap",
        "privacidade"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.4.5",
      "front": "O que é ponto cego de sensor?",
      "back": "Trecho ou caminho de tráfego que não passa por nenhuma fonte de telemetria útil.",
      "tags": [
        "arquitetura"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.4.6",
      "front": "O que NDR tenta acrescentar?",
      "back": "Detecção e resposta baseadas em comportamento de rede, correlação e anomalias, complementando logs e assinaturas.",
      "tags": [
        "ndr"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex13.4.1",
      "type": "conceitual",
      "prompt": "Explique por que NetFlow/IPFIX não substitui PCAP completo.",
      "expectedAnswer": "Flow registra metadados de comunicação, mas não preserva pacote completo nem payload; PCAP permite análise profunda, porém custa mais e exige controle de privacidade.",
      "explanation": "Cada fonte responde perguntas diferentes."
    },
    {
      "id": "ex13.4.2",
      "type": "arquitetura",
      "prompt": "Você tem um sensor apenas na saída para internet. Que tráfego provavelmente fica invisível?",
      "expectedAnswer": "Tráfego leste-oeste entre hosts internos, comunicação entre servidores da mesma zona, parte do tráfego Wi‑Fi interno e fluxos cloud que não passam pela borda local.",
      "explanation": "Visibilidade depende do caminho observado."
    },
    {
      "id": "ex13.4.3",
      "type": "diagnóstico",
      "prompt": "Um IPS bloqueou serviço crítico após atualização. Liste três ações seguras.",
      "expectedAnswer": "Reduzir para modo monitor ou aplicar rollback, identificar regra responsável, abrir mudança/incidente, criar exceção temporária documentada e validar tráfego legítimo.",
      "explanation": "Bloqueio automático precisa de controle operacional."
    },
    {
      "id": "ex13.4.4",
      "type": "segurança",
      "prompt": "Monte três campos essenciais para enriquecer alerta no SIEM.",
      "expectedAnswer": "Ativo/hostname, zona de segurança, criticidade, usuário, origem, destino, regra, timestamp e ação são exemplos válidos.",
      "explanation": "Contexto transforma alerta bruto em investigação priorizável."
    }
  ],
  "challenge": {
    "title": "Plano de visibilidade para reduzir pontos cegos",
    "scenario": "Após incidente, a empresa descobriu que não tinha evidência de tráfego entre estações e servidores internos. Existe firewall de borda, mas poucos logs internos.",
    "tasks": [
      "Mapear zonas críticas.",
      "Escolher sensores e fontes de telemetria.",
      "Definir retenção por fonte.",
      "Criar plano de validação sem tráfego ofensivo.",
      "Definir integração com SIEM."
    ],
    "constraints": [
      "Não instalar IPS inline em todos os segmentos.",
      "Minimizar custo inicial.",
      "Evitar captura indiscriminada de dados sensíveis.",
      "Preservar disponibilidade."
    ],
    "expectedDeliverables": [
      "Diagrama de sensores",
      "Matriz de telemetria",
      "Plano de retenção",
      "Checklist de validação",
      "Riscos e limitações"
    ],
    "gradingRubric": [
      {
        "criterion": "Cobertura de zonas",
        "points": 25,
        "description": "Identifica tráfego norte-sul, leste-oeste e cloud."
      },
      {
        "criterion": "Escolha adequada de telemetria",
        "points": 25,
        "description": "Combina flow, IDS/NDR, logs e PCAP quando necessário."
      },
      {
        "criterion": "Risco operacional",
        "points": 20,
        "description": "Evita IPS inline sem tuning e prevê rollback."
      },
      {
        "criterion": "Integração com SIEM",
        "points": 20,
        "description": "Inclui contexto, timestamp, ativo e severidade."
      },
      {
        "criterion": "Ética e privacidade",
        "points": 10,
        "description": "Trata captura e retenção como dados sensíveis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa pelas perguntas de investigação e pelas zonas, não pela escolha de ferramenta. Depois define fontes de telemetria por pergunta e posiciona sensores onde o tráfego realmente passa.",
    "steps": [
      "Mapear zonas e fluxos críticos.",
      "Identificar pontos cegos.",
      "Usar flow para visibilidade ampla.",
      "Usar IDS/NDR passivo em pontos de agregação.",
      "Usar IPS inline apenas em borda ou pontos com rollback.",
      "Enviar logs ao SIEM com contexto de ativo e zona.",
      "Proteger PCAP e definir retenção."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar um IDS na internet e considerar tudo monitorado.",
        "whyItIsWrong": "Não cobre tráfego leste-oeste nem cloud fora do caminho."
      },
      {
        "answer": "Ativar IPS em todos os links imediatamente.",
        "whyItIsWrong": "Pode causar indisponibilidade e exige tuning, HA e rollback."
      },
      {
        "answer": "Guardar todo PCAP para sempre.",
        "whyItIsWrong": "Custo e privacidade tornam a prática inviável sem política."
      }
    ],
    "finalAnswer": "Uma solução equilibrada usa flow logs para cobertura ampla, IDS/NDR passivo em pontos estratégicos, logs de firewall/DNS/proxy/cloud, PCAP sob demanda e SIEM enriquecido com inventário, zona e usuário. IPS deve entrar com cuidado em pontos de controle testados."
  },
  "pedagogicalMap": {
    "problem": "Rede sem sensores gera incidentes sem evidência.",
    "concept": "Sensores transformam tráfego em alertas, flows, logs e pacotes analisáveis.",
    "internalMechanism": "Coleta, parsing, detecção, enriquecimento, alerta e investigação.",
    "realUse": "SOC, NOC, resposta a incidente, threat hunting e auditoria.",
    "commonMistake": "Confundir sensor de borda com cobertura completa.",
    "securityImpact": "Melhora detecção e resposta, mas pode gerar ruído e risco de privacidade.",
    "operationalImpact": "Exige tuning, armazenamento, integração, NTP e processo.",
    "summary": "IDS/IPS/NDR/NetFlow não são sinônimos; cada um responde perguntas diferentes."
  },
  "glossary": [
    {
      "term": "IDS",
      "shortDefinition": "Sistema de detecção de intrusão.",
      "longDefinition": "Controle que observa eventos ou tráfego e gera alertas sobre possíveis atividades suspeitas.",
      "example": "Suricata em modo IDS analisando cópia de tráfego de um TAP.",
      "relatedTerms": [
        "IPS",
        "alerta",
        "assinatura"
      ],
      "relatedLessons": [
        "13.4",
        "13.5"
      ]
    },
    {
      "term": "IPS",
      "shortDefinition": "Sistema de prevenção de intrusão.",
      "longDefinition": "Controle que pode bloquear tráfego conforme regras, normalmente operando inline ou integrado a dispositivo de controle.",
      "example": "Firewall com IPS bloqueando exploit conhecido após tuning aprovado.",
      "relatedTerms": [
        "IDS",
        "inline",
        "falso positivo"
      ],
      "relatedLessons": [
        "13.4"
      ]
    },
    {
      "term": "NDR",
      "shortDefinition": "Network Detection and Response.",
      "longDefinition": "Categoria de solução que usa telemetria de rede, comportamento, analytics e contexto para detecção e resposta.",
      "example": "NDR indicando comunicação anômala entre estação comum e múltiplos servidores.",
      "relatedTerms": [
        "SOC",
        "SIEM",
        "anomalia"
      ],
      "relatedLessons": [
        "13.4",
        "16.10"
      ]
    },
    {
      "term": "NetFlow/IPFIX",
      "shortDefinition": "Telemetria de metadados de fluxos.",
      "longDefinition": "Mecanismos para exportar informações resumidas de comunicação, como origem, destino, portas, volume e duração.",
      "example": "Roteador exportando IPFIX para collector central.",
      "relatedTerms": [
        "flow",
        "collector",
        "telemetria"
      ],
      "relatedLessons": [
        "13.4",
        "15.11"
      ]
    },
    {
      "term": "PCAP",
      "shortDefinition": "Captura de pacotes.",
      "longDefinition": "Registro de pacotes para análise detalhada, geralmente com Wireshark, tcpdump ou sensor dedicado.",
      "example": "Captura autorizada de tráfego DNS para investigar resolução suspeita.",
      "relatedTerms": [
        "Wireshark",
        "tcpdump",
        "evidência"
      ],
      "relatedLessons": [
        "13.4",
        "15.11"
      ]
    },
    {
      "term": "SPAN/TAP",
      "shortDefinition": "Formas de entregar tráfego ao sensor.",
      "longDefinition": "SPAN espelha tráfego em switch; TAP copia tráfego fisicamente/lógicamente para análise.",
      "example": "Port mirror enviando tráfego de VLAN crítica para IDS passivo.",
      "relatedTerms": [
        "sensor",
        "mirror",
        "visibilidade"
      ],
      "relatedLessons": [
        "13.4"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Guide to Intrusion Detection and Prevention Systems (IDPS)",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/94/final",
      "note": "Referência oficial para conceitos de IDS/IPS e operação de IDPS."
    },
    {
      "type": "rfc",
      "title": "RFC 7011 — Specification of the IPFIX Protocol",
      "organization": "IETF",
      "url": "https://datatracker.ietf.org/doc/html/rfc7011",
      "note": "Define IPFIX como meio de transmissão de informações de fluxo."
    },
    {
      "type": "official-doc",
      "title": "Zeek Documentation",
      "organization": "Zeek",
      "url": "https://docs.zeek.org/",
      "note": "Documentação oficial do Network Security Monitor Zeek."
    },
    {
      "type": "official-doc",
      "title": "Suricata User Guide",
      "organization": "OISF",
      "url": "https://docs.suricata.io/",
      "note": "Documentação oficial do Suricata IDS/IPS/NSM."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.11",
      "reason": "Análise de pacotes com Wireshark e tcpdump será aprofundada no módulo de troubleshooting profissional."
    },
    {
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.10",
      "reason": "Threat hunting com NetFlow, Zeek, firewall e proxy logs será aprofundado no módulo de Blue Team."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs-metricas-traces",
      "reason": "Sensores de rede se conectam à disciplina de observabilidade e pipelines de telemetria."
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
      "13.5"
    ]
  }
};
