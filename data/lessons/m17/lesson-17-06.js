export const lesson1706 = {
  "id": "17.6",
  "moduleId": "m17",
  "order": 6,
  "title": "Simulado IV: Wireless, Segurança, Cloud e Troubleshooting",
  "subtitle": "Avaliação integrada para revisar Wi-Fi corporativo, segurança defensiva, cloud networking, telemetria e troubleshooting por evidências.",
  "duration": "210-330 min",
  "estimatedStudyTimeMinutes": 330,
  "difficulty": "avançado",
  "type": "simulado",
  "xp": 330,
  "tags": [
    "simulado",
    "wireless",
    "Wi-Fi",
    "segurança",
    "cloud networking",
    "troubleshooting",
    "Zero Trust",
    "flow logs",
    "SIEM",
    "Kubernetes",
    "DLP",
    "DFIR",
    "revisão",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão",
    "relatório de lacunas",
    "simulado por bloco"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.5",
      "reason": "O Simulado III revisou HTTP/TLS, firewalls, VPN e roteamento, base para cenários integrados."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m12",
      "reason": "Wireless corporativo é um dos blocos centrais do Simulado IV."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking sustenta as questões de VPC/VNet, Private Link, Kubernetes e observabilidade."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Segurança defensiva em redes sustenta C2, exfiltração, hunting, DFIR e resposta proporcional."
    }
  ],
  "objectives": [
    "Avaliar domínio integrado de wireless, segurança, cloud e troubleshooting.",
    "Diferenciar sintomas de RF, autenticação, política, DNS, rota, cloud e aplicação.",
    "Interpretar sinais defensivos como beaconing, anomalia de volume, egress suspeito e rogue DHCP.",
    "Selecionar evidências adequadas para hipóteses em ambientes híbridos.",
    "Transformar erros do simulado em revisão orientada por lacunas.",
    "Reforçar resposta segura, proporcional, documentada e reversível."
  ],
  "learningOutcomes": [
    "Explicar a cadeia de acesso de um cliente Wi-Fi até serviço cloud privado.",
    "Identificar diferenças entre problema de RF, 802.1X, VLAN, DNS, rota e aplicação.",
    "Correlacionar logs de DNS, proxy, firewall, flow logs, EDR, SIEM e cloud audit.",
    "Diagnosticar cenários de C2, exfiltração e movimento lateral usando telemetria defensiva.",
    "Avaliar impactos financeiros e operacionais de NAT, egress, logs e controles cloud.",
    "Criar plano de revisão após simulado com ações, prazo e reteste."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Este simulado existe para juntar os temas que normalmente aparecem separados nas equipes, mas juntos nos incidentes reais: Wi-Fi, segurança defensiva, cloud networking e troubleshooting. Em uma empresa, um usuário pode reclamar que a aplicação ficou lenta no notebook, enquanto o SOC enxerga DNS suspeito, o time de cloud vê NAT Gateway com custo anômalo e a equipe de rede descobre roaming ruim no andar. Sem visão integrada, cada time corrige um pedaço e o problema volta.</p>\n  <p>A aula 17.6 testa se você consegue raciocinar como profissional de redes em ambiente moderno: do sinal Wi-Fi ao endpoint privado, do WPA Enterprise ao SIEM, do flow log ao RCA, do health check ao WAF, da VLAN ao hub-spoke. O objetivo não é decorar nomes de produtos, mas reconhecer padrões, dependências e evidências.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> wireless, segurança, cloud e troubleshooting se encontram no fluxo real. O diagnóstico profissional acompanha o fluxo, os controles e as evidências.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>Redes corporativas começaram com foco em conectividade local: cabos, switches, roteadores, servidores internos e alguns links WAN. O Wi-Fi entrou primeiro como conveniência, depois como acesso principal para notebooks, celulares, coletores, IoT e convidados. Em paralelo, firewalls, IDS, VPNs, NAC e SIEM surgiram para responder à necessidade de controle e visibilidade.</p>\n  <p>A cloud adicionou uma camada nova: redes virtuais programáveis, regiões, zonas, subnets, route tables, security groups, private endpoints, NAT gateways, load balancers, Kubernetes e observabilidade distribuída. Com isso, troubleshooting deixou de ser apenas “pingar o gateway”. Hoje envolve revisar IaC, logs de auditoria, flow logs, políticas, identidade, DNS privado, egress e custo.</p>\n  <ul><li><strong>Wi-Fi:</strong> conectividade móvel e experiência do usuário.</li><li><strong>Segurança:</strong> controle, segmentação, detecção e resposta.</li><li><strong>Cloud:</strong> rede programável, escalável e cobrada por uso.</li><li><strong>Troubleshooting:</strong> método para transformar sintomas em causa verificável.</li></ul>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema deste simulado é que muitos sintomas avançados têm múltiplas causas plausíveis. Lentidão pode ser RF ruim, DNS lento, perda em VPN, WAF inspecionando demais, backend unhealthy, NAT saturado, rota assimétrica, egress caro ou aplicação mal dimensionada. Falha de acesso pode ser WPA/802.1X, VLAN dinâmica incorreta, política Zero Trust, DNS privado errado, security group, NACL, firewall, private endpoint, rota, identidade ou certificado.</p>\n  <p>O aluno precisa evitar dois extremos: culpar a rede sem evidência ou ignorar a rede porque “a aplicação responde em algum lugar”. O simulado exige interpretação de cenário, seleção de evidência e proposta de próxima ação segura.</p>\n  <ul><li><strong>Erro comum:</strong> diagnosticar Wi-Fi sem olhar RSSI, SNR, canal, roaming e autenticação.</li><li><strong>Erro comum:</strong> tratar todo alerta de segurança como incidente confirmado.</li><li><strong>Erro comum:</strong> alterar security group sem conferir rota, DNS e retorno.</li><li><strong>Erro comum:</strong> resolver custo de cloud apenas desligando logs críticos.</li><li><strong>Erro comum:</strong> fazer troubleshooting sem rollback e sem linha do tempo.</li></ul>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>Este simulado evolui por integração. Primeiro, revisa wireless: RF, canais, WPA2/WPA3, 802.1X, roaming e ameaças como rogue AP. Depois, entra em segurança defensiva: segmentação, Zero Trust, C2, beaconing, exfiltração, DLP e logs. Em seguida, revisa cloud networking: VPC/VNet, route tables, NAT, private endpoints, VPN/BGP, Kubernetes e observabilidade. Por fim, aplica troubleshooting: hipótese, evidência, linha do tempo, mitigação, rollback e RCA.</p>\n  <p>A maturidade esperada é cruzar camadas. Se um notebook no Wi-Fi não acessa uma aplicação privada na cloud, o diagnóstico pode envolver associação ao SSID, VLAN atribuída por RADIUS, DNS split-horizon, rota até VPN/ExpressRoute, security group, Private Link, TLS e logs do load balancer.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>O Simulado IV é uma avaliação diagnóstica integrada. Ele testa a capacidade de analisar cenários em que a conectividade depende simultaneamente de meio sem fio, identidade, políticas de rede, arquitetura cloud, telemetria e processo operacional.</p>\n  <p>O conceito central é <strong>cadeia de evidências distribuídas</strong>. Em ambientes modernos, nenhuma fonte conta a história completa. O Wi-Fi mostra associação e qualidade de rádio. O RADIUS mostra autenticação. O switch/controladora mostra VLAN e roaming. O DNS mostra resolução. Flow logs mostram metadados de fluxo. Firewall e proxy mostram política. Cloud audit mostra mudança. SIEM correlaciona. O profissional precisa montar o quebra-cabeça.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, um fluxo avançado passa por decisões sucessivas. No Wi-Fi, o cliente descobre SSIDs, associa-se a um BSSID, negocia segurança, autentica e recebe parâmetros de rede. No ambiente corporativo, 802.1X/RADIUS pode atribuir VLAN, política ou perfil. Depois, IP, DNS, rota e firewall determinam alcance. Em cloud, route tables, security groups, NACLs, firewalls, private endpoints, NAT e load balancers controlam caminho e exposição.</p>\n  <p>Na segurança, o mesmo fluxo gera telemetria. DNS pode mostrar domínios raros. Proxy pode mostrar User-Agent incomum. Flow logs podem mostrar beaconing. Firewall pode mostrar egress negado. DLP pode mostrar tentativa de envio de dados. EDR pode associar processo e usuário. O simulado cobra que você conecte essas evidências com cuidado, sem transformar anomalia em conclusão automática.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura avaliada inclui campus Wi-Fi, usuários remotos, datacenter, cloud, aplicações publicadas, aplicações privadas, Kubernetes, SOC e plataforma DevSecOps. Os controles aparecem em camadas: WPA Enterprise, NAC, VLANs, firewalls internos, VPN, WAF, security groups, private endpoints, IAM, logs, SIEM e políticas como código.</p>\n  <p>O desenho correto não é o que possui mais ferramentas, mas o que possui fluxo explícito, dono, política, telemetria e caminho de resposta. Um controle sem log dificulta investigação. Um log sem contexto gera ruído. Uma regra sem dono vira exceção permanente. Uma rede sem segmentação transforma um incidente pequeno em movimento lateral amplo.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em um aeroporto internacional. O Wi-Fi é a área de embarque: muita mobilidade, interferência, filas e autenticação. A segurança são os controles de acesso, câmeras e procedimentos. A cloud é outro terminal conectado por pontes, trens e regras próprias. O troubleshooting é o centro de operações que investiga por que um passageiro não chegou ao portão: documento, raio-x, conexão, portão errado, sistema fora, clima ou decisão operacional.</p>\n  <p>Um operador ruim diz: “o passageiro não embarcou, então a ponte está quebrada”. Um operador profissional reconstrói a jornada com evidências: entrada, credencial, horário, rota, controle, evento, exceção e causa.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Um notebook conecta ao Wi-Fi corporativo, mas não acessa o portal interno. Um diagnóstico superficial diria que “o Wi-Fi está ruim”. Um diagnóstico profissional verifica: RSSI/SNR, SSID, autenticação 802.1X, VLAN atribuída, IP recebido, DNS interno, gateway, rota, firewall e aplicação.</p>\n  <p>Se o notebook recebeu VLAN de convidados, o problema não é rádio. Pode ser grupo errado no RADIUS, certificado vencido, política de NAC ou mapeamento de VLAN. A evidência muda a solução.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Uma empresa percebe aumento de tráfego para um domínio pouco comum durante a madrugada. O proxy mostra requisições periódicas, flow logs mostram baixo volume mas alta regularidade, EDR associa o tráfego a um processo incomum e o DNS mostra domínio recém-visto. Isso não prova automaticamente C2, mas justifica investigação defensiva.</p>\n  <p>A resposta correta envolve preservar evidências, isolar proporcionalmente o host se necessário, verificar usuário, processo, destino, baseline, logs anteriores e impacto. A ação deve ser registrada em playbook e gerar melhoria preventiva: regra de detecção, egress control ou hardening.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Uma aplicação em Kubernetes na cloud deixa de acessar um banco gerenciado privado. As hipóteses incluem DNS privado incorreto, private endpoint não associado, security group bloqueando, NetworkPolicy negando, route table errada, IAM insuficiente, certificado incorreto ou mudança de CNI.</p>\n  <p>O diagnóstico precisa cruzar eventos: cloud audit, manifesto do Kubernetes, DNS/CoreDNS, logs da aplicação, flow logs, SG/NSG, private endpoint, health checks e pipeline que aplicou a mudança. Em cloud, muitas falhas são mudanças declarativas com efeito de rede.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Um pipeline altera uma regra de egress para liberar acesso temporário a um SaaS. Sem política como código, a exceção fica permanente. Sem logs, ninguém sabe se o tráfego foi usado. Sem dono, ninguém remove. Sem teste sintético, ninguém percebe que uma aplicação privada passou a depender de endpoint público.</p>\n  <p>DevSecOps maduro transforma requisitos de rede em código revisável: módulos IaC, validação de CIDR, bloqueio de portas administrativas públicas, teste de DNS privado, verificação de private endpoints, baseline de egress, tagging e expiração automática de exceções.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Um alerta de possível exfiltração aparece no SIEM. O SOC não deve concluir apenas pelo volume. É necessário revisar origem, usuário, sensibilidade do dado, destino, horário, histórico, DLP, proxy, firewall, DNS, storage logs, IAM e processo no endpoint. Um backup legítimo pode parecer anômalo; uma exfiltração real pode ser pequena e recorrente.</p>\n  <p>A postura correta é defensiva e proporcional: confirmar evidências, proteger dados pessoais, envolver responsáveis, preservar logs, conter quando necessário e transformar conclusão em melhoria de controle.</p>\n\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama</h2>\n\n  <p>O mapa abaixo resume o escopo do Simulado IV: usuário, Wi-Fi, segurança, cloud, telemetria e troubleshooting integrados.</p>\n  <div class=\"diagram-wrapper\">\n    <svg class=\"svg-diagram\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"simulado17-6-title simulado17-6-desc\">\n      <title id=\"simulado17-6-title\">Simulado IV integrando wireless, segurança, cloud e troubleshooting</title>\n      <desc id=\"simulado17-6-desc\">Fluxo do usuário no Wi-Fi até aplicações em cloud, passando por controles e telemetria defensiva.</desc>\n      <defs>\n        <marker id=\"arrow1706\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"150\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--user\" />\n      <text x=\"105\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Usuário</text>\n      <text x=\"105\" y=\"94\" text-anchor=\"middle\" class=\"svg-small\">Notebook / mobile</text>\n      <rect x=\"235\" y=\"40\" width=\"165\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--network\" />\n      <text x=\"317\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Wi-Fi corporativo</text>\n      <text x=\"317\" y=\"94\" text-anchor=\"middle\" class=\"svg-small\">RF, WPA, 802.1X</text>\n      <rect x=\"455\" y=\"40\" width=\"170\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--security\" />\n      <text x=\"540\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Controles</text>\n      <text x=\"540\" y=\"94\" text-anchor=\"middle\" class=\"svg-small\">NAC, FW, Proxy</text>\n      <rect x=\"690\" y=\"40\" width=\"210\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n      <text x=\"795\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Cloud</text>\n      <text x=\"795\" y=\"94\" text-anchor=\"middle\" class=\"svg-small\">VPC, LB, Private Link, K8s</text>\n      <path d=\"M180 76 H235\" class=\"svg-link\" marker-end=\"url(#arrow1706)\" />\n      <path d=\"M400 76 H455\" class=\"svg-link\" marker-end=\"url(#arrow1706)\" />\n      <path d=\"M625 76 H690\" class=\"svg-link\" marker-end=\"url(#arrow1706)\" />\n      <rect x=\"80\" y=\"210\" width=\"190\" height=\"74\" rx=\"14\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"175\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">Telemetria</text>\n      <text x=\"175\" y=\"263\" text-anchor=\"middle\" class=\"svg-small\">DNS, flow, proxy, EDR</text>\n      <rect x=\"345\" y=\"210\" width=\"210\" height=\"74\" rx=\"14\" class=\"svg-node svg-node--analysis\" />\n      <text x=\"450\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">Correlação</text>\n      <text x=\"450\" y=\"263\" text-anchor=\"middle\" class=\"svg-small\">SIEM, timeline, hipótese</text>\n      <rect x=\"635\" y=\"210\" width=\"230\" height=\"74\" rx=\"14\" class=\"svg-node svg-node--response\" />\n      <text x=\"750\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">Resposta</text>\n      <text x=\"750\" y=\"263\" text-anchor=\"middle\" class=\"svg-small\">Mitigar, rollback, RCA</text>\n      <path d=\"M317 112 C317 165 175 165 175 210\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1706)\" />\n      <path d=\"M540 112 C540 160 450 165 450 210\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1706)\" />\n      <path d=\"M795 112 C795 165 750 165 750 210\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1706)\" />\n      <path d=\"M270 247 H345\" class=\"svg-link\" marker-end=\"url(#arrow1706)\" />\n      <path d=\"M555 247 H635\" class=\"svg-link\" marker-end=\"url(#arrow1706)\" />\n      <rect x=\"70\" y=\"365\" width=\"840\" height=\"88\" rx=\"18\" class=\"svg-zone\" />\n      <text x=\"490\" y=\"398\" text-anchor=\"middle\" class=\"svg-label\">Raciocínio de prova profissional</text>\n      <text x=\"490\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">Sintoma → fluxo → controle → evidência → hipótese → ação mínima → reteste → aprendizado</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam a habilidade de separar sintomas de Wi-Fi, segurança, cloud e troubleshooting integrado. A resposta esperada sempre deve citar evidência.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio coloca você em um cenário realista com usuários no Wi-Fi, aplicação privada em cloud, alerta de segurança e custo anômalo de egress. Você precisará montar fluxo, priorizar hipóteses e propor mitigação segura.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como uma resposta profissional evita conclusões precipitadas: primeiro delimita escopo, depois coleta evidências, correlaciona fontes, executa ação mínima e registra RCA.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>O Simulado IV fecha os blocos de prova teórica do módulo final. Ele exige visão integrada de wireless, segurança, cloud e troubleshooting. O aluno que vai bem nesta aula não apenas conhece termos: ele entende fluxo, risco, telemetria e operação.</p>\n  <ul><li>Wi-Fi deve ser analisado por RF, autenticação, roaming, VLAN e experiência.</li><li>Segurança defensiva depende de segmentação, egress, logs e resposta proporcional.</li><li>Cloud networking exige atenção a rota, DNS privado, private endpoints, políticas e custo.</li><li>Troubleshooting profissional exige evidência, linha do tempo, mitigação e RCA.</li></ul>\n\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C06</td><td>Wireless, segurança defensiva e Blue Team</td><td>75%</td><td>90%</td><td>define escopo autorizado, telemetria, detecção, contenção e mitigação</td></tr><tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>17.7 — Estudo de caso I: incidente em aplicação web publicada</strong>, você deixará o formato de simulado e resolverá um caso corporativo completo, com usuários impactados, logs conflitantes, WAF, load balancer, TLS, DNS e necessidade de RCA.</p>\n\n</section>"
  },
  "diagramNotes": "O SVG organiza o simulado em fluxo de usuário, Wi-Fi, controles, cloud, telemetria, correlação e resposta.",
  "quiz": [
    {
      "id": "q17.6.01",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um usuário reclama de lentidão no Wi-Fi corporativo, mas o notebook mostra sinal forte. Qual métrica ainda deve ser considerada antes de concluir que RF está bom?",
      "opts": [
        "Apenas o nome do SSID",
        "SNR, interferência, canal, retransmissões, roaming e utilização do meio",
        "Somente o endereço MAC do gateway",
        "A cor do ícone do Wi-Fi"
      ],
      "a": 1,
      "exp": "RSSI forte isolado não prova qualidade. SNR, interferência, canal, retransmissões e roaming afetam experiência.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.02",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em WPA Enterprise, o cliente conecta ao SSID mas recebe VLAN de convidados. Qual componente é hipótese forte?",
      "opts": [
        "RADIUS/NAC ou política de grupo retornando atributo incorreto",
        "Apenas NAT Gateway cloud",
        "Somente TTL DNS público",
        "BGP de internet"
      ],
      "a": 0,
      "exp": "Em 802.1X, o servidor RADIUS/NAC pode atribuir VLAN/perfil conforme usuário, dispositivo ou postura.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.03",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um alerta de C2 baseado em DNS periódico deve ser tratado como:",
      "opts": [
        "Incidente confirmado sem investigação",
        "Anomalia que precisa de correlação com endpoint, proxy, flow logs, histórico e contexto",
        "Falha exclusiva de DHCP",
        "Prova de que o firewall está desligado"
      ],
      "a": 1,
      "exp": "Beaconing é sinal relevante, mas precisa de correlação para reduzir falsos positivos e orientar resposta proporcional.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.04",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em cloud, uma aplicação privada não acessa banco gerenciado via endpoint privado. Qual conjunto de evidências é mais apropriado?",
      "opts": [
        "DNS privado, associação do endpoint, SG/NSG, route table quando aplicável, IAM, TLS e logs do serviço",
        "Apenas ping para 8.8.8.8",
        "Somente SSID do usuário",
        "Somente status HTTP público"
      ],
      "a": 0,
      "exp": "Private endpoints dependem de DNS privado, associação à rede, políticas, identidade e serviço gerenciado.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.05",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual risco operacional existe ao desligar flow logs para reduzir custo?",
      "opts": [
        "Melhorar automaticamente a segurança",
        "Perder evidência de investigação, baseline, detecção e auditoria",
        "Aumentar o SNR do Wi-Fi",
        "Corrigir certificado TLS"
      ],
      "a": 1,
      "exp": "Logs têm custo, mas são fundamentais para segurança, troubleshooting e auditoria. O ajuste deve ser por escopo, retenção e amostragem, não cegueira total.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.06",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um tráfego alto de saída para storage externo pode indicar exfiltração, mas também pode ser:",
      "opts": [
        "Backup, replicação, pipeline, sincronização legítima ou transferência aprovada",
        "Sempre ARP spoofing",
        "Sempre DHCP rogue",
        "Sempre falha de STP"
      ],
      "a": 0,
      "exp": "Anomalia de volume precisa de contexto: dono, horário, destino, identidade, ticket e sensibilidade dos dados.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.07",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual é a melhor forma de revisar um incidente que envolve Wi-Fi, cloud e segurança?",
      "opts": [
        "Cada equipe escreve uma conclusão isolada",
        "Criar linha do tempo única com eventos de RF, autenticação, DNS, rota, política, logs cloud, EDR e SIEM",
        "Apagar logs antigos para simplificar",
        "Começar alterando regras sem evidência"
      ],
      "a": 1,
      "exp": "Incidentes distribuídos exigem timeline única e correlação entre fontes.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.08",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em Kubernetes cloud, pods sem egress podem ser afetados por:",
      "opts": [
        "NetworkPolicy, CNI, rota/NAT, DNS/CoreDNS, SG/NSG ou egress firewall",
        "Somente cabo de par trançado",
        "Apenas canal 6 do Wi-Fi",
        "Somente broadcast Ethernet"
      ],
      "a": 0,
      "exp": "Kubernetes networking em cloud combina controles de cluster, rede virtual, DNS, NAT e políticas.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.09",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual é um sinal de rogue DHCP em uma LAN corporativa?",
      "opts": [
        "Clientes recebendo gateway/DNS inesperados ou escopo IP incorreto",
        "Certificado SAN correto",
        "HTTP 200 em aplicação pública",
        "BGP recebendo prefixo esperado"
      ],
      "a": 0,
      "exp": "Rogue DHCP pode entregar gateway, DNS ou IP incorretos, desviando tráfego ou quebrando conectividade.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.10",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual afirmação sobre Zero Trust e rede está correta?",
      "opts": [
        "Zero Trust elimina a necessidade de rede",
        "Zero Trust reduz confiança implícita e combina identidade, contexto, menor privilégio, segmentação e telemetria",
        "Zero Trust é apenas trocar senha",
        "Zero Trust exige liberar any-any"
      ],
      "a": 1,
      "exp": "Zero Trust não substitui fundamentos de rede; ele usa identidade, contexto, controles e evidências para reduzir confiança implícita.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.11",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Durante troubleshooting, uma mudança segura deve ser:",
      "opts": [
        "Ampla, permanente e sem registro",
        "Mínima, aprovada, observável, com dono, prazo, critério de sucesso e rollback",
        "Feita diretamente em produção sem teste",
        "Mantida mesmo se não resolver"
      ],
      "a": 1,
      "exp": "Mudanças de troubleshooting devem reduzir risco e preservar controle operacional.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.12",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual evidência ajuda a diferenciar falha de Wi-Fi de falha de aplicação cloud?",
      "opts": [
        "Comparar associação/roaming/RSSI/SNR com DNS, TCP/TLS, LB, flow logs e logs da aplicação",
        "Ignorar o caminho e reiniciar tudo",
        "Analisar apenas o print do navegador",
        "Trocar o SSID sem validar logs"
      ],
      "a": 0,
      "exp": "A diferenciação depende de evidências em cada etapa do fluxo, do rádio ao serviço final.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.6.13",
      "type": "simulado",
      "domain": "Wireless",
      "q": "RSSI forte com SNR ruim indica:",
      "opts": [
        "sinal pode estar forte, mas ruído/interferência prejudica comunicação",
        "Wi-Fi perfeito sempre",
        "DNS privado quebrado sempre",
        "BGP preferindo rota default"
      ],
      "a": 0,
      "exp": "SNR considera relação sinal/ruído, não apenas potência do sinal.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.6.14",
      "type": "simulado",
      "domain": "Wireless",
      "q": "Roaming ruim pode causar:",
      "opts": [
        "quedas breves ou latência durante troca entre APs",
        "certificado SAN inválido",
        "NAT sem portas",
        "HTTP 201 em todas as respostas"
      ],
      "a": 0,
      "exp": "Roaming impacta continuidade, especialmente voz/vídeo e apps sensíveis.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.6.15",
      "type": "simulado",
      "domain": "Segurança",
      "q": "Rede plana aumenta qual risco?",
      "opts": [
        "movimento lateral após comprometimento",
        "redução automática de broadcast",
        "eliminação de logs",
        "melhor CORS"
      ],
      "a": 0,
      "exp": "Segmentação reduz alcance lateral e facilita política/monitoramento.",
      "difficulty": "intermediário",
      "topic": "Segurança"
    },
    {
      "id": "q17.6.16",
      "type": "simulado",
      "domain": "Blue Team",
      "q": "Beaconing por intervalo regular em conn.log sugere:",
      "opts": [
        "comunicação automatizada suspeita a ser investigada",
        "apenas usuário lendo e-mail",
        "gateway default correto necessariamente",
        "VLAN trunk saudável"
      ],
      "a": 0,
      "exp": "Intervalos regulares e destinos incomuns são sinais defensivos para investigação.",
      "difficulty": "intermediário",
      "topic": "Blue Team"
    },
    {
      "id": "q17.6.17",
      "type": "simulado",
      "domain": "Blue Team",
      "q": "DNS suspeito em dataset defensivo deve ser tratado como:",
      "opts": [
        "hipótese a correlacionar com host, tempo, volume e reputação interna",
        "prova isolada definitiva",
        "motivo para apagar logs",
        "comando ofensivo"
      ],
      "a": 0,
      "exp": "Detecção responsável exige correlação e evita conclusão por um único indicador.",
      "difficulty": "intermediário",
      "topic": "Blue Team"
    },
    {
      "id": "q17.6.18",
      "type": "simulado",
      "domain": "Cloud",
      "q": "Private Endpoint reduz exposição porque:",
      "opts": [
        "usa caminho privado para serviço gerenciado quando bem configurado",
        "elimina IAM",
        "dispensa DNS",
        "remove custos sempre"
      ],
      "a": 0,
      "exp": "Private endpoints reduzem exposição pública, mas exigem DNS, rota, política e custo monitorado.",
      "difficulty": "intermediário",
      "topic": "Cloud"
    },
    {
      "id": "q17.6.19",
      "type": "simulado",
      "domain": "Cloud",
      "q": "Flow logs ajudam principalmente a:",
      "opts": [
        "ver padrões de tráfego aceito/negado para investigação e auditoria",
        "substituir criptografia",
        "atribuir VLAN access",
        "gerar certificado TLS"
      ],
      "a": 0,
      "exp": "Flow logs registram metadados de tráfego úteis para diagnóstico e segurança.",
      "difficulty": "intermediário",
      "topic": "Cloud"
    },
    {
      "id": "q17.6.20",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Em war room, uma boa atualização deve conter:",
      "opts": [
        "estado, impacto, evidências, hipótese, próxima ação e ETA quando aplicável",
        "opiniões sem evidência",
        "culpado antes da análise",
        "todos os logs brutos sensíveis"
      ],
      "a": 0,
      "exp": "Comunicação objetiva reduz ruído e ajuda decisão.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    },
    {
      "id": "q17.6.21",
      "type": "simulado",
      "domain": "Cloud",
      "q": "Uma route table cloud com 0.0.0.0/0 para Internet Gateway em subnet de banco cria:",
      "opts": [
        "risco de exposição/egress indevido se combinado com controles permissivos",
        "garantia de privacidade",
        "eliminação de firewall",
        "melhor WPA3"
      ],
      "a": 0,
      "exp": "Subnets de banco normalmente devem ter rotas e políticas restritivas.",
      "difficulty": "intermediário",
      "topic": "Cloud"
    },
    {
      "id": "q17.6.22",
      "type": "simulado",
      "domain": "Segurança",
      "q": "Menor privilégio em rede significa:",
      "opts": [
        "liberar apenas fluxos necessários, justificados e observáveis",
        "bloquear tudo para sempre",
        "abrir portas por conveniência",
        "usar NAT como autorização"
      ],
      "a": 0,
      "exp": "Menor privilégio reduz superfície sem impedir fluxos necessários.",
      "difficulty": "intermediário",
      "topic": "Segurança"
    },
    {
      "id": "q17.6.23",
      "type": "simulado",
      "domain": "Blue Team",
      "q": "Exfiltração volumétrica pode aparecer como:",
      "opts": [
        "aumento incomum de bytes enviados para destino raro",
        "queda de RSSI apenas",
        "DHCP ACK normal",
        "ARP para gateway"
      ],
      "a": 0,
      "exp": "Volume, direção e raridade do destino são sinais defensivos para investigação.",
      "difficulty": "intermediário",
      "topic": "Blue Team"
    },
    {
      "id": "q17.6.24",
      "type": "simulado",
      "domain": "Wireless",
      "q": "WPA Enterprise depende fortemente de:",
      "opts": [
        "802.1X/RADIUS e políticas de identidade/dispositivo",
        "somente NAT",
        "BGP público",
        "CORS"
      ],
      "a": 0,
      "exp": "WPA Enterprise usa autenticação centralizada e pode aplicar perfis/VLANs.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.6.25",
      "type": "simulado",
      "domain": "Cloud",
      "q": "Landing Zone bem desenhada inclui:",
      "opts": [
        "contas/subscriptions, rede, IAM, logging, políticas e padrões de segurança",
        "apenas uma VPC sem logs",
        "um único usuário admin",
        "somente DNS público"
      ],
      "a": 0,
      "exp": "Landing zones criam base governável para múltiplos workloads.",
      "difficulty": "intermediário",
      "topic": "Cloud"
    },
    {
      "id": "q17.6.26",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "RCA profissional deve evitar:",
      "opts": [
        "culpar pessoa sem causa sistêmica e evidência",
        "descrever impacto",
        "listar linha do tempo",
        "registrar ação preventiva"
      ],
      "a": 0,
      "exp": "RCA deve focar causa, sistema, evidência e prevenção.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    },
    {
      "id": "q17.6.27",
      "type": "simulado",
      "domain": "Segurança",
      "q": "WAF protege melhor contra:",
      "opts": [
        "padrões HTTP maliciosos ou abusivos em camada 7",
        "loop L2",
        "RSSI baixo",
        "DHCP sem escopo"
      ],
      "a": 0,
      "exp": "WAF opera em camada de aplicação HTTP, não substitui rede ou IAM.",
      "difficulty": "intermediário",
      "topic": "Segurança"
    },
    {
      "id": "q17.6.28",
      "type": "simulado",
      "domain": "Blue Team",
      "q": "PCAP textual sanitizado em aula defensiva serve para:",
      "opts": [
        "ensinar análise sem expor dados reais ou instrução ofensiva",
        "executar ataque real",
        "coletar senha de usuários",
        "burlar controles"
      ],
      "a": 0,
      "exp": "Datasets sintéticos preservam segurança e privacidade no treinamento.",
      "difficulty": "intermediário",
      "topic": "Blue Team"
    },
    {
      "id": "q17.6.29",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Se a hipótese mudou após nova evidência, o correto é:",
      "opts": [
        "atualizar diagnóstico e explicar por que a hipótese anterior perdeu força",
        "ignorar a evidência",
        "forçar a conclusão inicial",
        "apagar o registro"
      ],
      "a": 0,
      "exp": "Boa investigação adapta hipótese conforme evidência.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    },
    {
      "id": "q17.6.30",
      "type": "simulado",
      "domain": "Cloud",
      "q": "Custo de NAT Gateway/egress em cloud deve ser tratado como:",
      "opts": [
        "impacto financeiro de arquitetura a estimar e monitorar",
        "irrelevante em todo cenário",
        "sinal de ARP spoofing",
        "substituto de firewall"
      ],
      "a": 0,
      "exp": "Cloud networking tem custos recorrentes de tráfego, NAT, firewall e logs.",
      "difficulty": "intermediário",
      "topic": "Cloud"
    }
  ],
  "simulado": {
    "title": "Simulado IV — Wireless, Segurança, Cloud e Troubleshooting",
    "instructions": [
      "Responda sem consultar o gabarito.",
      "Para cada questão, anote sua confiança de 1 a 5.",
      "Após corrigir, classifique cada erro por domínio: wireless, segurança, cloud, troubleshooting ou evidência.",
      "Crie um mini laboratório ou desenho para cada lacuna crítica."
    ],
    "questions": [
      {
        "question": "Um usuário reclama de lentidão no Wi-Fi corporativo, mas o notebook mostra sinal forte. Qual métrica ainda deve ser considerada antes de concluir que RF está bom?",
        "options": [
          "Apenas o nome do SSID",
          "SNR, interferência, canal, retransmissões, roaming e utilização do meio",
          "Somente o endereço MAC do gateway",
          "A cor do ícone do Wi-Fi"
        ],
        "answer": 1,
        "explanation": "RSSI forte isolado não prova qualidade. SNR, interferência, canal, retransmissões e roaming afetam experiência."
      },
      {
        "question": "Em WPA Enterprise, o cliente conecta ao SSID mas recebe VLAN de convidados. Qual componente é hipótese forte?",
        "options": [
          "RADIUS/NAC ou política de grupo retornando atributo incorreto",
          "Apenas NAT Gateway cloud",
          "Somente TTL DNS público",
          "BGP de internet"
        ],
        "answer": 0,
        "explanation": "Em 802.1X, o servidor RADIUS/NAC pode atribuir VLAN/perfil conforme usuário, dispositivo ou postura."
      },
      {
        "question": "Um alerta de C2 baseado em DNS periódico deve ser tratado como:",
        "options": [
          "Incidente confirmado sem investigação",
          "Anomalia que precisa de correlação com endpoint, proxy, flow logs, histórico e contexto",
          "Falha exclusiva de DHCP",
          "Prova de que o firewall está desligado"
        ],
        "answer": 1,
        "explanation": "Beaconing é sinal relevante, mas precisa de correlação para reduzir falsos positivos e orientar resposta proporcional."
      },
      {
        "question": "Em cloud, uma aplicação privada não acessa banco gerenciado via endpoint privado. Qual conjunto de evidências é mais apropriado?",
        "options": [
          "DNS privado, associação do endpoint, SG/NSG, route table quando aplicável, IAM, TLS e logs do serviço",
          "Apenas ping para 8.8.8.8",
          "Somente SSID do usuário",
          "Somente status HTTP público"
        ],
        "answer": 0,
        "explanation": "Private endpoints dependem de DNS privado, associação à rede, políticas, identidade e serviço gerenciado."
      },
      {
        "question": "Qual risco operacional existe ao desligar flow logs para reduzir custo?",
        "options": [
          "Melhorar automaticamente a segurança",
          "Perder evidência de investigação, baseline, detecção e auditoria",
          "Aumentar o SNR do Wi-Fi",
          "Corrigir certificado TLS"
        ],
        "answer": 1,
        "explanation": "Logs têm custo, mas são fundamentais para segurança, troubleshooting e auditoria. O ajuste deve ser por escopo, retenção e amostragem, não cegueira total."
      },
      {
        "question": "Um tráfego alto de saída para storage externo pode indicar exfiltração, mas também pode ser:",
        "options": [
          "Backup, replicação, pipeline, sincronização legítima ou transferência aprovada",
          "Sempre ARP spoofing",
          "Sempre DHCP rogue",
          "Sempre falha de STP"
        ],
        "answer": 0,
        "explanation": "Anomalia de volume precisa de contexto: dono, horário, destino, identidade, ticket e sensibilidade dos dados."
      },
      {
        "question": "Qual é a melhor forma de revisar um incidente que envolve Wi-Fi, cloud e segurança?",
        "options": [
          "Cada equipe escreve uma conclusão isolada",
          "Criar linha do tempo única com eventos de RF, autenticação, DNS, rota, política, logs cloud, EDR e SIEM",
          "Apagar logs antigos para simplificar",
          "Começar alterando regras sem evidência"
        ],
        "answer": 1,
        "explanation": "Incidentes distribuídos exigem timeline única e correlação entre fontes."
      },
      {
        "question": "Em Kubernetes cloud, pods sem egress podem ser afetados por:",
        "options": [
          "NetworkPolicy, CNI, rota/NAT, DNS/CoreDNS, SG/NSG ou egress firewall",
          "Somente cabo de par trançado",
          "Apenas canal 6 do Wi-Fi",
          "Somente broadcast Ethernet"
        ],
        "answer": 0,
        "explanation": "Kubernetes networking em cloud combina controles de cluster, rede virtual, DNS, NAT e políticas."
      },
      {
        "question": "Qual é um sinal de rogue DHCP em uma LAN corporativa?",
        "options": [
          "Clientes recebendo gateway/DNS inesperados ou escopo IP incorreto",
          "Certificado SAN correto",
          "HTTP 200 em aplicação pública",
          "BGP recebendo prefixo esperado"
        ],
        "answer": 0,
        "explanation": "Rogue DHCP pode entregar gateway, DNS ou IP incorretos, desviando tráfego ou quebrando conectividade."
      },
      {
        "question": "Qual afirmação sobre Zero Trust e rede está correta?",
        "options": [
          "Zero Trust elimina a necessidade de rede",
          "Zero Trust reduz confiança implícita e combina identidade, contexto, menor privilégio, segmentação e telemetria",
          "Zero Trust é apenas trocar senha",
          "Zero Trust exige liberar any-any"
        ],
        "answer": 1,
        "explanation": "Zero Trust não substitui fundamentos de rede; ele usa identidade, contexto, controles e evidências para reduzir confiança implícita."
      },
      {
        "question": "Durante troubleshooting, uma mudança segura deve ser:",
        "options": [
          "Ampla, permanente e sem registro",
          "Mínima, aprovada, observável, com dono, prazo, critério de sucesso e rollback",
          "Feita diretamente em produção sem teste",
          "Mantida mesmo se não resolver"
        ],
        "answer": 1,
        "explanation": "Mudanças de troubleshooting devem reduzir risco e preservar controle operacional."
      },
      {
        "question": "Qual evidência ajuda a diferenciar falha de Wi-Fi de falha de aplicação cloud?",
        "options": [
          "Comparar associação/roaming/RSSI/SNR com DNS, TCP/TLS, LB, flow logs e logs da aplicação",
          "Ignorar o caminho e reiniciar tudo",
          "Analisar apenas o print do navegador",
          "Trocar o SSID sem validar logs"
        ],
        "answer": 0,
        "explanation": "A diferenciação depende de evidências em cada etapa do fluxo, do rádio ao serviço final."
      }
    ],
    "passingCriteria": {
      "minimumScorePercent": 80,
      "minimumConfidenceAverage": 3.5,
      "requiredAction": "Criar plano de revisão para qualquer domínio abaixo de 75%."
    },
    "competencyScoring": {
      "enabled": true,
      "competencies": [
        {
          "id": "C06",
          "name": "Wireless, segurança defensiva e Blue Team",
          "minimum": 75,
          "mastery": 90
        },
        {
          "id": "C07",
          "name": "Cloud Networking, Kubernetes e arquitetura híbrida",
          "minimum": 75,
          "mastery": 90
        },
        {
          "id": "C08",
          "name": "Troubleshooting profissional, RCA e comunicação",
          "minimum": 80,
          "mastery": 92
        }
      ],
      "scoringMethod": "corrigir cada questão marcando também competência, causa do erro, confiança e ação de revisão",
      "passRule": "pontuação geral mínima de 75% e nenhuma competência crítica abaixo de 70%",
      "masteryRule": "90% geral, explicação correta de todos os erros e plano de revisão fechado",
      "feedbackByScoreBand": [
        {
          "range": "0-59%",
          "status": "insuficiente para conclusão",
          "action": "Não avance. Refaça a revisão guiada, execute laboratórios essenciais e produza nova tentativa com evidências."
        },
        {
          "range": "60-74%",
          "status": "base parcial",
          "action": "Revise competências abaixo do mínimo, foque nos erros conceituais e refaça somente os blocos afetados."
        },
        {
          "range": "75-89%",
          "status": "aprovado",
          "action": "Avance, mas registre lacunas residuais e execute pelo menos um mini lab de reforço por competência fraca."
        },
        {
          "range": "90-100%",
          "status": "domínio forte",
          "action": "Use o resultado como artefato de portfólio, explique decisões em voz alta e ajude outro aluno a revisar o tema."
        }
      ]
    },
    "postExamProtocol": [
      "não olhar o gabarito antes da tentativa completa",
      "registrar confiança por questão: baixa, média ou alta",
      "corrigir por competência, não apenas por acerto/erro",
      "classificar cada erro usando a taxonomia E-CONCEITO, E-CAMADA, E-COMANDO, E-ARQUITETURA, E-SEGURANCA ou E-COMUNICACAO",
      "criar uma ação de revisão e uma ação prática para cada competência abaixo do mínimo",
      "retestar depois de 24-48 horas sem consulta"
    ]
  },
  "exercises": [
    {
      "title": "Wi-Fi ou aplicação?",
      "prompt": "Explique como separar problema de RF/autenticação Wi-Fi de falha em aplicação cloud.",
      "difficulty": "intermediário-avançado",
      "expectedAnswer": "Comparar associação, RSSI/SNR, roaming, 802.1X, VLAN/IP/DNS com TCP/TLS, LB, logs da aplicação, flow logs e políticas cloud."
    },
    {
      "title": "Beaconing e falso positivo",
      "prompt": "Por que DNS periódico não prova C2 sozinho?",
      "difficulty": "avançado",
      "expectedAnswer": "Porque serviços legítimos também geram tráfego periódico. É preciso correlacionar processo, usuário, destino, baseline, proxy, EDR e histórico."
    },
    {
      "title": "Private Endpoint sem acesso",
      "prompt": "Liste evidências para investigar falha de acesso a serviço gerenciado privado em cloud.",
      "difficulty": "avançado",
      "expectedAnswer": "DNS privado, associação do endpoint, SG/NSG, route table quando aplicável, IAM, TLS, logs do serviço, flow logs e mudança recente."
    },
    {
      "title": "Custo como sinal",
      "prompt": "Como custo anômalo de egress pode ajudar troubleshooting e segurança?",
      "difficulty": "intermediário-avançado",
      "expectedAnswer": "Pode indicar transferência legítima inesperada, loop, replicação mal configurada, exfiltração ou arquitetura ineficiente; deve ser correlacionado com logs, dono e baseline."
    },
    {
      "id": "ex17.6.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C06, C07, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "flashcards": [
    {
      "front": "RSSI forte garante Wi-Fi bom?",
      "back": "Não. É preciso considerar SNR, interferência, canal, utilização, retransmissões e roaming."
    },
    {
      "front": "O que 802.1X/RADIUS pode influenciar além de autenticação?",
      "back": "VLAN, perfil, política, atributos de acesso e integração com NAC."
    },
    {
      "front": "O que diferencia IOC de anomalia?",
      "back": "IOC é indicador associado a ameaça conhecida ou contexto forte; anomalia é desvio que precisa de investigação."
    },
    {
      "front": "Private Link elimina necessidade de IAM?",
      "back": "Não. Acesso privado reduz exposição de rede, mas identidade e autorização continuam necessários."
    },
    {
      "front": "Flow logs substituem PCAP?",
      "back": "Não. Flow logs mostram metadados agregados; PCAP mostra pacotes, quando disponível e permitido."
    },
    {
      "front": "Qual é a essência do troubleshooting integrado?",
      "back": "Mapear fluxo, controles e evidências antes de concluir ou alterar produção."
    }
  ],
  "mentorQuestions": [
    "Em quais questões você confundiu sintoma de rede com sintoma de aplicação ou política?",
    "Qual domínio teve menor confiança: wireless, segurança, cloud ou troubleshooting?",
    "Que evidência você passará a coletar antes de propor mudança em produção?"
  ],
  "challenge": {
    "title": "Desafio — Lentidão no Wi-Fi, alerta de C2 e custo anômalo de cloud",
    "scenario": "Na segunda-feira, usuários do escritório relatam lentidão no Wi-Fi ao acessar uma aplicação interna hospedada em Kubernetes na cloud. Ao mesmo tempo, o SOC recebe alerta de DNS periódico para domínio raro e o FinOps aponta aumento de egress no fim de semana. Houve mudança recente em policy as code para egress e em uma regra de NetworkPolicy.",
    "tasks": [
      "Montar linha do tempo única",
      "Separar hipóteses wireless, segurança, cloud e aplicação",
      "Definir fontes de evidência por hipótese",
      "Identificar ações de contenção proporcional",
      "Propor mitigação mínima e rollback",
      "Criar RCA preliminar e backlog preventivo",
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "successCriteria": [
      "Não concluir C2 sem correlação",
      "Não culpar Wi-Fi sem métricas de RF/autenticação",
      "Não alterar cloud sem revisar IaC e logs",
      "Incluir custo como evidência operacional",
      "Definir reteste e melhoria preventiva",
      "Cada competência tem evidência observável.",
      "Cada erro tem causa classificada.",
      "A rubrica sustenta a decisão de aprovação.",
      "O plano de revisão tem tarefa prática e prazo."
    ],
    "constraints": [
      "não considerar a aula concluída sem rubrica preenchida",
      "não usar resposta decorada sem evidência técnica",
      "não avançar com competência crítica abaixo do mínimo sem plano de revisão"
    ],
    "expectedDeliverables": [
      "Matriz de competências com pontuação e confiança.",
      "Rubrica preenchida com justificativa.",
      "Feedback por tema: fundamento, diagnóstico, arquitetura, segurança, cloud e comunicação.",
      "Plano de revisão baseado em erros e reteste.",
      "Checklist de aprovação ou decisão de refazer competência crítica."
    ],
    "gradingRubric": [
      {
        "criterion": "C06 — Wireless, segurança defensiva e Blue Team",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: define escopo autorizado, telemetria, detecção, contenção e mitigação."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 20,
        "description": "Demonstra domínio mínimo de 80% e produz evidência verificável: transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência."
      },
      {
        "criterion": "Evidência e rastreabilidade",
        "points": 15,
        "description": "Entrega prints, tabelas, comandos, hipóteses, logs, justificativas e rastreia cada decisão ao requisito correspondente."
      },
      {
        "criterion": "Correção comentada e melhoria contínua",
        "points": 25,
        "description": "Transforma erro em plano de revisão, reteste, laboratório curto e melhoria concreta do próprio mapa de conhecimento."
      }
    ]
  },
  "commentedSolution": {
    "summary": "A investigação deve começar pela linha do tempo e pelo mapa de fluxo. O Wi-Fi deve ser validado com métricas e autenticação, a cloud com DNS privado, rotas, políticas e logs, e o alerta de segurança com EDR, proxy, DNS, flow logs e contexto de mudança. A resposta deve ser proporcional e reversível.",
    "steps": [
      "Normalizar timestamps de Wi-Fi, SIEM, cloud audit, pipeline e billing",
      "Comparar clientes impactados por SSID, AP, VLAN e localização",
      "Validar DNS, TCP/TLS, LB, Ingress, NetworkPolicy e egress",
      "Correlacionar domínio raro com endpoint, processo, usuário e baseline",
      "Verificar mudança de IaC e regra aplicada",
      "Aplicar mitigação mínima se houver risco confirmado",
      "Registrar RCA técnica e sistêmica",
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonMistakes": [
      "Assumir que lentidão é sempre RF",
      "Assumir que domínio raro é C2 confirmado",
      "Desligar logs por custo sem avaliar risco",
      "Abrir egress amplo para testar",
      "Ignorar alteração recente de pipeline",
      "Não documentar decisão de contenção"
    ],
    "reasoning": "A investigação deve começar pela linha do tempo e pelo mapa de fluxo. O Wi-Fi deve ser validado com métricas e autenticação, a cloud com DNS privado, rotas, políticas e logs, e o alerta de segurança com EDR, proxy, DNS, flow logs e contexto de mudança. A resposta deve ser proporcional e reversível. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
    "commonWrongAnswers": [
      {
        "answer": "Passei porque acertei 75%, sem analisar onde errei.",
        "whyItIsWrong": "A pontuação geral pode esconder uma competência crítica fraca, como DNS, rotas, firewall, cloud ou evidência de incidente."
      },
      {
        "answer": "Vou revisar lendo tudo novamente.",
        "whyItIsWrong": "Releitura passiva é pouco diagnóstica. A revisão precisa de erro classificado, exercício ativo, laboratório e reteste."
      },
      {
        "answer": "O capstone está bom porque a arquitetura ficou bonita.",
        "whyItIsWrong": "Arquitetura profissional precisa de fluxos, controles, custos, logs, evidências, rollback e justificativa."
      }
    ],
    "finalAnswer": "A aula está concluída quando o aluno entrega matriz de competências, rubrica, evidências, feedback por erro e plano de revisão/reteste para qualquer competência abaixo do mínimo."
  },
  "glossary": [
    {
      "term": "SNR",
      "definition": "Relação sinal-ruído; métrica importante para avaliar qualidade real do rádio Wi-Fi."
    },
    {
      "term": "RADIUS",
      "definition": "Protocolo/serviço usado com 802.1X para autenticação e autorização de acesso à rede."
    },
    {
      "term": "Beaconing",
      "definition": "Comunicação periódica que pode ser legítima ou indicar comportamento suspeito, dependendo do contexto."
    },
    {
      "term": "Private Endpoint",
      "definition": "Interface/associação privada para acessar serviço gerenciado sem exposição pública direta."
    },
    {
      "term": "Egress control",
      "definition": "Controle de tráfego de saída para reduzir risco de C2, exfiltração e custo inesperado."
    },
    {
      "term": "RCA",
      "definition": "Análise de causa raiz que separa causa técnica, causa sistêmica e ações preventivas."
    }
  ],
  "references": [
    {
      "title": "NIST SP 800-153 — Guidelines for Securing Wireless Local Area Networks",
      "url": "https://csrc.nist.gov/pubs/sp/800/153/final"
    },
    {
      "title": "NIST SP 800-207 — Zero Trust Architecture",
      "url": "https://csrc.nist.gov/pubs/sp/800/207/final"
    },
    {
      "title": "MITRE ATT&CK — Command and Control",
      "url": "https://attack.mitre.org/tactics/TA0011/"
    },
    {
      "title": "AWS VPC Flow Logs",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html"
    },
    {
      "title": "Kubernetes — Services, Load Balancing, and Networking",
      "url": "https://kubernetes.io/docs/concepts/services-networking/"
    }
  ],
  "security": {
    "goodPractices": [
      "Usar simulados para diagnosticar lacunas, não apenas para memorizar respostas.",
      "Executar o capstone em ambiente controlado, documentado e sem impacto em terceiros.",
      "Coletar evidências de arquitetura, validação, logs, decisões e melhorias propostas.",
      "Revisar erros por tema: camada, protocolo, comando, segurança, cloud e troubleshooting.",
      "Consolidar o portfólio com entregáveis verificáveis e limites éticos claros."
    ],
    "badPractices": [
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar revisão integrada, simulados, estudos de caso, portfólio, capstone e consolidação profissional com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Risco de avaliação sem evidência — Simulado IV: Wireless, Segurança, Cloud e Troubleshooting",
        "description": "Em Simulado IV: Wireless, Segurança, Cloud e Troubleshooting, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
        "defensiveExplanation": "O risco aparece quando o aluno sabe responder definições, mas não consegue demonstrar validação operacional com diagrama, matriz de fluxos, comandos, logs, RCA e rubrica.",
        "mitigation": "Exigir entregáveis objetivos, simulado por domínio, relatório de lacunas, rubrica de 100 pontos, evidências sanitizadas, revisão das falhas e plano de estudo antes de concluir a trilha."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.6."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O aluno acerta questões isoladas, mas falha em cenários integrados.",
      "O projeto final tem diagrama, mas não possui validação ou evidências.",
      "A solução proposta funciona, mas ignora segurança, custo ou operação.",
      "O checklist mostra lacunas em fundamentos anteriores.",
      "A revisão não gera plano de melhoria mensurável."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 17.6?"
    ],
    "commands": [
      {
        "platform": "Revisão",
        "command": "preencher checklist de camada, protocolo, comando, segurança, cloud e evidência",
        "purpose": "Mapear lacunas antes de considerar o curso consolidado.",
        "expectedObservation": "Tópicos fracos aparecem agrupados por tema.",
        "interpretation": "A revisão deve orientar reforço dirigido, não repetição aleatória."
      },
      {
        "platform": "Capstone",
        "command": "validar DNS, rota, firewall, TLS, logs e evidências do cenário integrado",
        "purpose": "Comprovar que a arquitetura final funciona e é auditável.",
        "expectedObservation": "Entregáveis demonstram desenho, validação, riscos e mitigação.",
        "interpretation": "Sem evidência e rubrica, o projeto final vira texto, não avaliação técnica."
      },
      {
        "platform": "Portfólio",
        "command": "organizar diagramas, tabelas, comandos, prints, RCA e decisões arquiteturais",
        "purpose": "Gerar material revisável e demonstrável.",
        "expectedObservation": "Artefatos suficientes para explicar raciocínio técnico.",
        "interpretation": "Portfólio bom mostra processo, não apenas resultado final."
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
      "anyOf": [
        "quizScoreAtLeast",
        "checklistDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "17.7"
    ]
  },
  "assessmentBlueprint": {
    "mode": "simulado por bloco",
    "questionCount": 30,
    "minimumScore": 70,
    "masteryScore": 90,
    "correctionMethod": "corrigir por domínio, registrar lacuna, revisar aula relacionada e executar reteste com evidência",
    "gapReportRequired": true
  },
  "adaptiveReview": {
    "enabled": true,
    "purpose": "transformar erros de simulado, laboratório ou capstone em trilha de revisão objetiva",
    "errorTaxonomy": [
      {
        "code": "E-CONCEITO",
        "label": "erro conceitual",
        "interpretation": "o aluno decorou termo, mas não explicou por que ele existe ou como funciona internamente"
      },
      {
        "code": "E-CAMADA",
        "label": "erro de camada",
        "interpretation": "confundiu camada 2, camada 3, transporte, aplicação ou controle de segurança"
      },
      {
        "code": "E-COMANDO",
        "label": "erro de evidência",
        "interpretation": "não soube escolher comando, log, métrica ou pacote para confirmar hipótese"
      },
      {
        "code": "E-ARQUITETURA",
        "label": "erro de desenho",
        "interpretation": "solução funciona isoladamente, mas ignora fluxo, dependência, custo, segurança ou operação"
      },
      {
        "code": "E-SEGURANCA",
        "label": "erro de risco",
        "interpretation": "confundiu conectividade com autorização, ignorou telemetria ou propôs exceção insegura"
      },
      {
        "code": "E-COMUNICACAO",
        "label": "erro de comunicação",
        "interpretation": "não conseguiu explicar impacto, decisão, rollback ou risco residual para outro público"
      }
    ],
    "revisionLoop": [
      "registrar resposta inicial e confiança antes do gabarito",
      "corrigir e classificar cada erro pela taxonomia",
      "vincular o erro à competência e às aulas de origem",
      "executar mini laboratório ou exercício ativo",
      "refazer questão/tarefa após intervalo",
      "registrar nova confiança e evidência de melhoria"
    ],
    "remediationTracks": [
      {
        "competencyId": "C06",
        "competency": "Wireless, segurança defensiva e Blue Team",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M12, M13, M16 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para define escopo autorizado, telemetria, detecção, contenção e mitigação",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C07",
        "competency": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M14 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C08",
        "competency": "Troubleshooting profissional, RCA e comunicação",
        "trigger": "pontuação abaixo de 80% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M15, M17 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      }
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    }
  ],
  "domainGapReport": {
    "required": true,
    "fields": [
      "domínio",
      "questões erradas",
      "causa provável",
      "aulas de revisão",
      "prática de reforço",
      "evidência de reteste"
    ],
    "actionRule": "qualquer domínio abaixo de 70% exige revisão; abaixo de 50% exige laboratório de reforço antes de seguir para o capstone"
  }
};
