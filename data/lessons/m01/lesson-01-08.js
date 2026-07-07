export const lesson0108 = {
  "id": "1.8",
  "moduleId": "m01",
  "order": 8,
  "title": "Métricas: latência, jitter, perda, throughput e disponibilidade",
  "subtitle": "Como medir uma rede de forma profissional antes de culpar link, firewall, Wi-Fi, cloud ou aplicação.",
  "duration": "80-115 min",
  "estimatedStudyTimeMinutes": 115,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "métricas",
    "latência",
    "jitter",
    "perda",
    "throughput",
    "disponibilidade",
    "SLA",
    "SLO",
    "troubleshooting",
    "observabilidade",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.4",
      "reason": "Bit vs Byte em redes é necessário para entender throughput e capacidade nominal."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.6",
      "reason": "Latência, largura de banda e throughput foram apresentados como fundamentos de performance."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.7",
      "reason": "É necessário entender os equipamentos do caminho antes de interpretar onde uma métrica pode piorar."
    }
  ],
  "objectives": [
    "Diferenciar latência, jitter, perda, throughput e disponibilidade.",
    "Entender por que uma rede pode ter muita banda e ainda assim parecer lenta.",
    "Relacionar métricas com sintomas reais de voz, vídeo, API, VPN, backup, cloud e sistemas corporativos.",
    "Coletar evidências iniciais com comandos seguros no Windows, Linux e Cisco IOS.",
    "Evitar diagnósticos genéricos como 'a rede está lenta' sem evidência mensurável.",
    "Interpretar impactos de segurança e observabilidade a partir de métricas anômalas."
  ],
  "learningOutcomes": [
    "Dado um sintoma de lentidão, o aluno escolhe quais métricas medir primeiro.",
    "Dado um resultado de ping, traceroute ou teste HTTP, o aluno diferencia latência, perda e indisponibilidade.",
    "Dado um cenário de cloud ou VPN, o aluno reconhece gargalos de throughput, latência entre regiões e dependências de disponibilidade.",
    "Dado um incidente, o aluno identifica quando métricas podem indicar saturação, degradação, falha parcial ou possível abuso."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Em redes, uma das frases mais perigosas é: “está lento”. Ela parece simples, mas pode esconder dezenas de causas diferentes: link saturado, Wi‑Fi ruim, firewall sobrecarregado, DNS lento, servidor com CPU alta, perda de pacotes, rota longa, VPN com MTU inadequado, cloud em região distante, API mal otimizada ou até um ataque consumindo recursos.</p>\n  <p>Para sair do achismo, o profissional precisa transformar sensação em métrica. Latência mede tempo. Jitter mede variação desse tempo. Perda mede o que não chegou. Throughput mede vazão útil. Disponibilidade mede se o serviço esteve acessível no período esperado. Sem essa separação, troubleshooting vira troca de cabo, reinício de roteador e compra de banda sem resolver a causa real.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o usuário diz que o sistema financeiro está lento. O provedor mostra link de 1 Gbps. O time de aplicação diz que o servidor está saudável. O SOC não vê bloqueio no firewall. Sem medir latência, perda, jitter, throughput e disponibilidade por trecho, ninguém consegue provar onde está a degradação.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No início das redes locais, muitos problemas eram físicos e visíveis: cabo ruim, hub saturado, colisões, link desligado. Com o crescimento da internet, das WANs, dos firewalls, dos proxies, das VPNs e da cloud, a experiência do usuário passou a depender de caminhos longos e distribuídos. A pergunta deixou de ser apenas “está conectado?” e passou a ser “qual é a qualidade da comunicação ponta a ponta?”.</p>\n  <p>Ferramentas como ping, traceroute, SNMP, NetFlow, logs de firewall, monitores de aplicação e APM surgiram para observar diferentes partes do problema. Em paralelo, práticas de operação começaram a falar em SLA, SLO, disponibilidade, erro, latência de percentil e orçamento de erro. Em sistemas modernos, uma API pode responder em 80 ms no datacenter e em 900 ms para um usuário remoto por causa de rota, TLS, proxy, DNS, fila ou região cloud.</p>\n  <p>Hoje, redes corporativas precisam medir não só se algo funciona, mas se funciona bem o suficiente para o negócio. Essa mudança é essencial para DevSecOps, SRE, SOC, cloud networking e troubleshooting profissional.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema central é que conectividade não garante qualidade. Dois hosts podem se alcançar, mas a experiência pode ser ruim. Um ping pode responder, mas a aplicação pode falhar. Um link pode ter 1 Gbps contratado, mas entregar throughput útil baixo. Um serviço pode ficar 99,9% disponível e ainda causar impacto em uma janela crítica.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem medir latência:</strong> você não sabe se a demora está no caminho, no servidor, no DNS, no TLS ou na aplicação.</li>\n    <li><strong>Sem medir jitter:</strong> você não entende por que voz e vídeo picotam mesmo quando a média de ping parece aceitável.</li>\n    <li><strong>Sem medir perda:</strong> você pode culpar throughput quando o problema real é retransmissão e descarte.</li>\n    <li><strong>Sem medir throughput:</strong> você confunde velocidade contratada com vazão útil real.</li>\n    <li><strong>Sem medir disponibilidade:</strong> você trata falhas recorrentes de minutos como eventos isolados e não como risco operacional.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução das métricas acompanhou a complexidade das redes. O diagnóstico deixou de depender de uma única ferramenta e passou a combinar sinais de várias fontes.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Fase</th><th>Como se media</th><th>Limitação</th><th>Evolução</th></tr></thead>\n    <tbody>\n      <tr><td>Rede local simples</td><td>Link ligado, ping e teste manual</td><td>Pouca visibilidade de qualidade</td><td>Contadores de interface, erros, CRC, duplex</td></tr>\n      <tr><td>WAN corporativa</td><td>Latência, perda, disponibilidade de link</td><td>Não mostrava experiência da aplicação</td><td>QoS, NetFlow, monitoramento por site</td></tr>\n      <tr><td>Internet e VPN</td><td>Traceroute, RTT, throughput e logs</td><td>Caminhos assimétricos e proxies confundem análise</td><td>Medição por múltiplos pontos e observabilidade</td></tr>\n      <tr><td>Cloud e microserviços</td><td>Métricas de rede, aplicação e infraestrutura</td><td>Problema pode estar em região, balanceador, DNS, TLS ou serviço</td><td>SLO, tracing distribuído, synthetic monitoring e APM</td></tr>\n      <tr><td>Segurança e SOC</td><td>Eventos, fluxos, logs e anomalias</td><td>Métrica isolada não prova causa</td><td>Correlação entre tráfego, identidade, endpoint e aplicação</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Métricas de rede são medidas usadas para descrever a qualidade, capacidade e confiabilidade da comunicação. Elas não são sinônimos. Cada uma responde uma pergunta diferente.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> latência é o tempo para a comunicação ocorrer; jitter é a variação da latência; perda é a fração de pacotes que não chega; throughput é a vazão útil efetivamente obtida; disponibilidade é a proporção de tempo em que um serviço ou caminho está acessível conforme o esperado.</div>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Métrica</th><th>Pergunta que responde</th><th>Unidade comum</th><th>Sintoma típico</th></tr></thead>\n    <tbody>\n      <tr><td>Latência</td><td>Quanto tempo demora?</td><td>ms</td><td>Sistema responde devagar</td></tr>\n      <tr><td>Jitter</td><td>Esse tempo varia muito?</td><td>ms de variação</td><td>Voz e vídeo falhando</td></tr>\n      <tr><td>Perda</td><td>Quanto tráfego se perde?</td><td>%</td><td>Retransmissões, quedas e lentidão</td></tr>\n      <tr><td>Throughput</td><td>Quanto tráfego útil passa?</td><td>Mbps, Gbps, MB/s</td><td>Backup ou download lento</td></tr>\n      <tr><td>Disponibilidade</td><td>Esteve acessível no período?</td><td>% ou tempo de indisponibilidade</td><td>Interrupções recorrentes</td></tr>\n    </tbody>\n  </table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, cada métrica nasce de um mecanismo diferente. É por isso que uma ferramenta só raramente responde tudo.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Latência:</strong> inclui tempo de transmissão, propagação no meio, processamento em equipamentos, filas, inspeção de firewall, negociação de protocolo e resposta do serviço.</li>\n    <li><strong>RTT:</strong> round-trip time mede ida e volta. Um ping geralmente mostra RTT, não apenas ida.</li>\n    <li><strong>Jitter:</strong> aparece quando pacotes sucessivos têm latências diferentes. Filas, Wi‑Fi instável, congestionamento e QoS ruim aumentam jitter.</li>\n    <li><strong>Perda:</strong> ocorre quando pacotes são descartados por erro físico, fila cheia, política, congestionamento, rádio ruim, MTU, firewall ou falha de caminho.</li>\n    <li><strong>Throughput:</strong> depende da menor capacidade efetiva do caminho, overhead, janela TCP, perda, latência, processamento, criptografia e limitações do serviço.</li>\n    <li><strong>Disponibilidade:</strong> é calculada ao longo do tempo. Um serviço pode ter boa latência quando está no ar, mas disponibilidade ruim se cai várias vezes ao dia.</li>\n  </ol>\n  <p>Um detalhe importante: médias escondem problemas. Uma latência média de 40 ms pode parecer boa, mas se alguns usuários sofrem picos de 2 segundos, a experiência será ruim. Por isso, em ambientes profissionais, é comum olhar percentis, como p95 e p99, além da média.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>As métricas devem ser analisadas por trecho e por camada. Um caminho empresarial pode incluir notebook, Wi‑Fi, switch, firewall, proxy, VPN, operadora, balanceador, serviço cloud, banco de dados e identidade. Cada trecho pode piorar uma métrica diferente.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Camada física:</strong> erros, CRC, sinal fraco, interferência e cabo ruim podem causar perda.</li>\n    <li><strong>Camada de enlace:</strong> duplex, VLAN, STP, Wi‑Fi e porta de switch influenciam estabilidade local.</li>\n    <li><strong>Camada de rede:</strong> rota, distância, caminho assimétrico e NAT influenciam latência e disponibilidade.</li>\n    <li><strong>Camada de transporte:</strong> TCP reage à perda e latência; UDP sofre mais visivelmente com jitter e perda.</li>\n    <li><strong>Camada de aplicação:</strong> HTTP, DNS, TLS, autenticação e banco podem adicionar tempo sem que a “rede” esteja fisicamente ruim.</li>\n  </ul>\n  <p>A arquitetura correta de observabilidade combina métricas de rede com logs, traces, eventos de segurança e contexto de mudança. Sem contexto, um gráfico mostra que algo piorou; com contexto, você descobre por quê.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma estrada. Latência é quanto tempo uma viagem leva. Largura de banda é quantas faixas a estrada possui. Throughput é quantos carros realmente passam por minuto. Jitter é a variação do tempo de viagem: às vezes 10 minutos, às vezes 40. Perda é quando carros não chegam ao destino. Disponibilidade é se a estrada ficou aberta durante o período esperado.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes digitais têm retransmissão, buffers, filas, criptografia, protocolos, NAT, firewalls e caminhos assimétricos. A estrada ajuda a entender a diferença entre capacidade e vazão, mas não representa todos os detalhes de TCP, UDP e aplicação.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, você tem internet de 500 Mbps. Um teste de velocidade mostra 480 Mbps perto do roteador, mas uma chamada de vídeo trava no quarto. Isso não contradiz o plano. O throughput máximo perto do roteador pode ser alto, mas no quarto o Wi‑Fi pode ter sinal fraco, interferência, perda e jitter. Para streaming e chamadas, estabilidade pode importar mais que banda nominal.</p>\n  <p>Outro exemplo: um download grande pode atingir 50 MB/s, mas abrir um site pode parecer lento porque o problema está em DNS, TLS, servidor remoto ou latência inicial, não em capacidade de download contínuo.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma filial reclama que o ERP fica lento no começo da manhã. O link WAN não está 100% saturado, mas há picos de perda e latência quando backups, atualizações e abertura de sistemas ocorrem ao mesmo tempo. O firewall também mostra aumento de sessões e inspeção TLS. Nesse cenário, comprar mais banda pode ajudar parcialmente, mas o diagnóstico profissional deve verificar QoS, horários de backup, capacidade do firewall, proxy, DNS, rota e métricas do servidor.</p>\n  <p>Em ambientes corporativos, métricas precisam ser associadas a usuários, sites, aplicações e mudanças. Um aumento de latência logo após uma mudança de rota ou política de firewall é uma evidência muito diferente de uma perda causada por cabo defeituoso.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, métricas de rede aparecem em VPC/VNet, subnets, load balancers, NAT gateways, firewalls gerenciados, VPN site-to-site, private endpoints e tráfego entre regiões. Uma aplicação em São Paulo chamando banco em outra região pode ter latência maior mesmo com throughput suficiente. Um NAT Gateway pode ser cobrado por tráfego processado. Um firewall gerenciado pode adicionar custo e latência, mas fornecer inspeção, logs e controle.</p>\n  <p>O erro comum é tratar cloud como “rede infinita”. A cloud abstrai cabos e switches, mas não elimina distância, rota, filas, limites de serviço, egress cost, quotas e dependências regionais. Métricas ajudam a decidir se o problema é arquitetura, capacidade, distância ou serviço.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em pipelines, métricas aparecem quando um runner demora para baixar imagens, acessar registries, consultar scanners, enviar logs ou falar com clusters Kubernetes. Um pipeline pode falhar por timeout não porque o código está errado, mas porque o runner está em uma rede com latência alta, DNS instável, proxy mal configurado ou throughput baixo para artefatos grandes.</p>\n  <p>Em Kubernetes, métricas também aparecem entre pods, services, ingress, egress gateways, service mesh e APIs externas. NetworkPolicies podem bloquear tráfego; sidecars podem adicionar latência; TLS mútua pode aumentar processamento; logs e traces ajudam a separar rede, aplicação e política.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Métricas também são sinais de segurança. Aumento súbito de throughput de saída pode indicar exfiltração ou backup legítimo. Picos de conexão com baixa taxa útil podem indicar varredura, falha de autenticação em massa ou serviço degradado. Perda e latência podem aparecer durante DDoS, saturação de firewall, ataque volumétrico ou erro de roteamento.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Sinal</th><th>Como aparece</th><th>Risco</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Throughput de saída anormal</td><td>Grande volume para destino incomum</td><td>Possível exfiltração ou uso indevido</td><td>Baselines, DLP, egress filtering, investigação de identidade e endpoint</td></tr>\n      <tr><td>Perda e latência no firewall</td><td>Sessões caindo e CPU alta</td><td>Degradação ou ataque volumétrico</td><td>Rate limit, proteção DDoS, escala, regras otimizadas e observabilidade</td></tr>\n      <tr><td>Jitter em voz corporativa</td><td>Áudio picotado em horários específicos</td><td>Fila, QoS ausente ou congestão</td><td>QoS, priorização, análise de link e ajuste de tráfego concorrente</td></tr>\n      <tr><td>Disponibilidade intermitente</td><td>Quedas curtas recorrentes</td><td>Falha parcial, rota instável ou mudança mal controlada</td><td>Monitoramento sintético, change management e análise por trecho</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama abaixo separa métricas que parecem semelhantes, mas medem coisas diferentes: tempo, variação, perda, capacidade, vazão útil e disponibilidade.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 500\" role=\"img\" aria-labelledby=\"m01l08-title m01l08-desc\">\n    <title id=\"m01l08-title\">Métricas de rede no caminho entre cliente e serviço</title>\n    <desc id=\"m01l08-desc\">Cliente envia tráfego por switch, firewall, WAN e servidor. O diagrama destaca latência, jitter, perda, throughput e disponibilidade.</desc>\n    <defs>\n      <marker id=\"m01l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <rect x=\"240\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"310\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <rect x=\"440\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"510\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <rect x=\"640\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"710\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">WAN/Cloud</text>\n    <rect x=\"820\" y=\"90\" width=\"120\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"880\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n\n    <line x1=\"180\" y1=\"125\" x2=\"240\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"380\" y1=\"125\" x2=\"440\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"580\" y1=\"125\" x2=\"640\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"780\" y1=\"125\" x2=\"820\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n\n    <path d=\"M880 170 C760 235, 510 235, 110 170\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l08-arrow)\" />\n    <text x=\"500\" y=\"245\" text-anchor=\"middle\" class=\"svg-label\">RTT: ida + processamento + volta</text>\n\n    <rect x=\"75\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"157\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Latência</text>\n    <text x=\"157\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tempo por operação</text>\n    <text x=\"157\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ms / RTT</text>\n\n    <rect x=\"285\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"367\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Jitter</text>\n    <text x=\"367\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">variação da latência</text>\n    <text x=\"367\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">voz e vídeo sofrem</text>\n\n    <rect x=\"495\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"577\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Perda</text>\n    <text x=\"577\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pacotes não chegam</text>\n    <text x=\"577\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">retransmissão/queda</text>\n\n    <rect x=\"705\" y=\"300\" width=\"190\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"800\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Throughput</text>\n    <text x=\"800\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">vazão útil real</text>\n    <text x=\"800\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">menor que a banda nominal</text>\n\n    <line x1=\"110\" y1=\"405\" x2=\"880\" y2=\"405\" class=\"svg-flow svg-flow--blocked\" />\n    <text x=\"500\" y=\"438\" text-anchor=\"middle\" class=\"svg-label\">Disponibilidade: capacidade de o serviço estar acessível no período combinado</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é uma coleta segura de métricas básicas. O objetivo não é fazer teste agressivo nem estressar redes de terceiros. O objetivo é aprender a registrar evidências de latência, rota, resolução de nome, tempo HTTP e disponibilidade percebida.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios forçam você a transformar sintomas vagos em hipóteses mensuráveis. Sempre escreva qual métrica você mediria, com qual ferramenta e que conclusão seria possível ou impossível tirar.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma reclamação empresarial comum: “o sistema está lento”. Sua tarefa é propor uma investigação baseada em métricas, não em palpites.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como separar latência, jitter, perda, throughput e disponibilidade por trecho, evitando conclusões precipitadas.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> rede boa não é apenas rede conectada; é rede com qualidade mensurável.</li>\n    <li><strong>O que lembrar:</strong> latência mede tempo, jitter mede variação, perda mede descarte, throughput mede vazão útil e disponibilidade mede acesso ao longo do tempo.</li>\n    <li><strong>Erro comum:</strong> confundir banda contratada com performance real da aplicação.</li>\n    <li><strong>Uso real:</strong> métricas permitem justificar mudanças, priorizar incidentes, cobrar fornecedores e separar problema de rede, aplicação, cloud e segurança.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, estudaremos diagnóstico inicial com <code>ipconfig</code>, <code>ping</code>, <code>arp</code>, <code>tracert</code> e <code>nslookup</code>. Depois de entender as métricas, você vai aprender a coletar evidências básicas de conectividade, resolução de nomes, vizinhança local e caminho até o destino.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
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
      "ICMP",
      "TCP",
      "UDP",
      "HTTP",
      "DNS",
      "TLS",
      "SNMP",
      "NetFlow",
      "IPFIX"
    ],
    "dependsOn": [
      "bits e bytes",
      "meios de transmissão",
      "equipamentos de rede",
      "protocolos",
      "topologias"
    ],
    "enables": [
      "troubleshooting profissional",
      "SLA",
      "SLO",
      "observabilidade",
      "capacity planning",
      "monitoramento de segurança"
    ]
  },
  "deepDive": {
    "mentalModel": "Nunca aceite 'rede lenta' como diagnóstico. Converta a reclamação em uma pergunta: o problema é tempo, variação, descarte, vazão útil, disponibilidade ou aplicação? Depois meça por trecho.",
    "keyTerms": [
      "latência",
      "RTT",
      "jitter",
      "perda",
      "throughput",
      "largura de banda",
      "disponibilidade",
      "SLA",
      "SLO",
      "p95",
      "p99",
      "buffer",
      "fila",
      "congestionamento"
    ],
    "limitations": [
      "Ping pode ser bloqueado ou tratado com prioridade diferente do tráfego real da aplicação.",
      "Traceroute mostra uma pista de caminho, mas nem sempre mostra caminhos assimétricos ou políticas intermediárias.",
      "Teste de velocidade mede um cenário específico, não garante performance de todas as aplicações.",
      "Disponibilidade medida de um único ponto pode não representar todos os usuários.",
      "Médias podem esconder picos graves; percentis costumam ser mais úteis em sistemas críticos."
    ],
    "whenToUse": [
      "Use latência para investigar resposta lenta e distância até serviços.",
      "Use jitter para investigar voz, vídeo, streaming e tráfego em tempo real.",
      "Use perda para investigar retransmissões, quedas e instabilidade.",
      "Use throughput para investigar cópias, backups, imagens de container e transferências grandes.",
      "Use disponibilidade para avaliar confiabilidade ao longo do tempo e impacto de negócio."
    ],
    "whenNotToUse": [
      "Não use apenas ping para concluir que uma aplicação está saudável.",
      "Não use teste de velocidade público como prova única de qualidade corporativa.",
      "Não compare throughput em MB/s com link em Mbps sem converter corretamente.",
      "Não conclua ataque apenas por aumento de tráfego sem contexto, baseline e correlação.",
      "Não ignore aplicação, DNS, TLS e autenticação quando a rede básica parece saudável."
    ],
    "operationalImpact": [
      "Métricas ajudam a reduzir tempo médio de diagnóstico porque transformam sintomas em evidências.",
      "Monitoramento contínuo exige baselines, retenção de dados, dashboards e alertas bem calibrados.",
      "Métricas mal interpretadas geram mudanças desnecessárias, compra de link sem causa e conflitos entre times.",
      "A coleta por múltiplos pontos é mais confiável do que medir apenas de dentro do datacenter."
    ],
    "financialImpact": [
      "Comprar mais banda sem diagnosticar perda, jitter ou aplicação pode desperdiçar dinheiro.",
      "Monitoramento, APM, logs e NetFlow podem gerar custo de licença, armazenamento e processamento.",
      "Em cloud, tráfego, NAT, firewall gerenciado, load balancer e observabilidade podem gerar custo recorrente.",
      "Métricas bem usadas ajudam a dimensionar capacidade e justificar investimento com evidência."
    ],
    "securityImpact": [
      "Mudanças bruscas de throughput, conexões ou disponibilidade podem indicar abuso, ataque ou erro de configuração.",
      "Métricas ajudam o SOC a priorizar incidentes, mas precisam ser correlacionadas com logs e identidade.",
      "Testes de carga, varreduras e medições agressivas devem respeitar autorização e janela de manutenção.",
      "Evidências de rede podem conter nomes internos, IPs, usuários e destinos sensíveis."
    ],
    "decisionTable": [
      {
        "situation": "Aplicação demora para abrir, mas downloads são rápidos",
        "recommendedChoice": "Medir latência DNS, TLS, HTTP e tempo do servidor",
        "why": "Throughput alto não elimina latência ou aplicação lenta",
        "risk": "Comprar mais banda sem resolver a experiência"
      },
      {
        "situation": "Chamada de vídeo picota, mas ping médio parece bom",
        "recommendedChoice": "Medir jitter e perda ao longo do tempo",
        "why": "Média de latência pode esconder variação e descarte",
        "risk": "Ignorar Wi‑Fi, QoS ou filas"
      },
      {
        "situation": "Backup demora muito em horário específico",
        "recommendedChoice": "Medir throughput real, saturação e concorrência de tráfego",
        "why": "Transferências grandes dependem de vazão útil contínua",
        "risk": "Culpar servidor sem verificar caminho"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Confundir largura de banda com throughput.",
      "whyItHappens": "Planos e links são vendidos em capacidade nominal, enquanto ferramentas mostram vazão real.",
      "consequence": "Expectativas irreais e diagnóstico errado.",
      "correction": "Largura de banda é capacidade; throughput é tráfego útil efetivamente entregue."
    },
    {
      "mistake": "Achar que ping baixo significa aplicação saudável.",
      "whyItHappens": "Ping é fácil e rápido de executar.",
      "consequence": "Problemas de DNS, TLS, autenticação, banco ou servidor passam despercebidos.",
      "correction": "Use ping como evidência de conectividade básica, não como teste completo de aplicação."
    },
    {
      "mistake": "Ignorar jitter em tráfego de voz e vídeo.",
      "whyItHappens": "Muitos alunos olham apenas média de latência.",
      "consequence": "Chamadas continuam ruins mesmo com 'ping aceitável'.",
      "correction": "Meça variação e perda, especialmente em Wi‑Fi, VPN e links congestionados."
    },
    {
      "mistake": "Medir disponibilidade de um único ponto e generalizar.",
      "whyItHappens": "É mais simples monitorar de um servidor central.",
      "consequence": "Falhas regionais ou de filial não aparecem.",
      "correction": "Use múltiplos pontos de monitoramento quando a experiência de usuários distribuídos importa."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuário relata lentidão genérica",
      "Voz e vídeo picotando",
      "Download ou backup lento",
      "Sistema indisponível em alguns horários",
      "VPN conecta mas fica instável",
      "API com timeouts intermitentes"
    ],
    "diagnosticQuestions": [
      "O problema é para todos os usuários, uma filial, um Wi‑Fi, uma aplicação ou um destino específico?",
      "Há perda ou apenas latência alta?",
      "A latência é constante ou variável?",
      "O throughput baixo ocorre em qualquer destino ou apenas em um serviço?",
      "A indisponibilidade é total ou parcial?",
      "Houve mudança de rota, firewall, proxy, DNS, VPN, aplicação ou cloud?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ping -n 20 8.8.8.8\ntracert 8.8.8.8\nTest-NetConnection exemplo.com -Port 443",
        "purpose": "Observar RTT, perda aparente, caminho e conectividade TCP básica.",
        "expectedObservation": "Respostas com tempo estável, sem perda recorrente e porta TCP acessível quando o serviço está disponível.",
        "interpretation": "Se ICMP falha mas TCP funciona, pode haver bloqueio de ICMP; se ambos falham, investigar conectividade, rota ou política."
      },
      {
        "platform": "Linux",
        "command": "ping -c 20 8.8.8.8\ntraceroute 8.8.8.8\ncurl -o /dev/null -s -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' https://example.com",
        "purpose": "Separar RTT, caminho e tempos de DNS, conexão, TLS e resposta HTTP.",
        "expectedObservation": "Tempos coerentes e sem perda recorrente.",
        "interpretation": "Se DNS ou TLS demora muito, o problema pode não ser throughput de link."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces\nshow processes cpu sorted\nshow ip route\nshow logging",
        "purpose": "Ver erros de interface, descarte, CPU, rota e eventos relevantes.",
        "expectedObservation": "Baixos erros/descartes, CPU saudável e rota esperada.",
        "interpretation": "CRC, drops ou CPU alta em equipamento intermediário podem explicar perda, jitter ou indisponibilidade."
      }
    ],
    "decisionTree": [
      {
        "if": "Há perda recorrente em vários destinos",
        "then": "Investigar meio físico, Wi‑Fi, interface, filas, firewall, operadora ou caminho compartilhado."
      },
      {
        "if": "Não há perda, mas latência é alta apenas para uma região",
        "then": "Investigar distância, rota, peering, região cloud e localização do serviço."
      },
      {
        "if": "Throughput é baixo apenas para um serviço",
        "then": "Investigar servidor, limitação de aplicação, CDN, TLS, proxy ou política específica."
      },
      {
        "if": "Disponibilidade falha em janelas curtas",
        "then": "Correlacionar monitoramento, mudanças, logs, rotas e eventos de segurança no mesmo horário."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Criar baselines de tráfego, latência, perda e disponibilidade por site e aplicação.",
      "Correlacionar métricas de rede com logs de firewall, DNS, proxy, endpoint e identidade.",
      "Proteger dashboards e relatórios de métricas porque revelam arquitetura e hábitos internos.",
      "Executar testes de performance apenas com autorização e sem causar indisponibilidade.",
      "Alertar por anomalia e contexto, não apenas por números isolados."
    ],
    "badPractices": [
      "Concluir que há ataque apenas porque o tráfego aumentou.",
      "Fazer teste agressivo em rede de produção sem janela ou autorização.",
      "Guardar evidências com IPs internos, usuários e destinos sensíveis em local público.",
      "Ignorar disponibilidade parcial por afetar apenas uma filial ou grupo de usuários.",
      "Desabilitar inspeção de segurança sem medir impacto e risco."
    ],
    "commonErrors": [
      "Confundir indisponibilidade de aplicação com queda de internet.",
      "Tratar perda baixa como irrelevante em aplicações sensíveis a tempo real.",
      "Ignorar que criptografia, inspeção e proxy podem adicionar latência legítima.",
      "Não separar problema de rede, DNS, TLS, autenticação e autorização."
    ],
    "vulnerabilities": [
      {
        "name": "Exfiltração mascarada como tráfego legítimo",
        "description": "Transferências anormais de saída podem parecer backup, sincronização ou uso comum se não houver baseline.",
        "defensiveExplanation": "O foco defensivo é comparar destino, volume, horário, identidade e endpoint com comportamento esperado.",
        "mitigation": "Egress filtering, DLP, UEBA, baselines, alertas de destino incomum e investigação de endpoint."
      },
      {
        "name": "Saturação de controle de segurança",
        "description": "Firewall, proxy ou WAF sobrecarregado pode degradar disponibilidade e abrir pressão por bypass inseguro.",
        "defensiveExplanation": "Métricas de CPU, sessão, throughput e drops ajudam a diferenciar ataque, capacidade e regra mal planejada.",
        "mitigation": "Capacity planning, proteção DDoS, tuning de regras, escala horizontal e monitoramento."
      },
      {
        "name": "Falsa disponibilidade por monitoramento limitado",
        "description": "Monitorar apenas de dentro do datacenter pode esconder falhas de usuários remotos, filiais ou regiões.",
        "defensiveExplanation": "Disponibilidade precisa refletir a experiência real dos públicos relevantes.",
        "mitigation": "Monitoramento sintético multi-região, probes em filiais e SLOs por jornada crítica."
      }
    ],
    "monitoring": [
      "RTT por site",
      "perda por caminho",
      "jitter em voz/vídeo",
      "throughput de entrada e saída",
      "disponibilidade por aplicação",
      "drops e erros de interface",
      "CPU e sessões de firewall",
      "anomalias de egress"
    ],
    "hardening": [
      "Aplicar QoS quando necessário",
      "limitar e monitorar egress",
      "dimensionar firewalls e proxies",
      "segmentar tráfego crítico",
      "documentar thresholds",
      "proteger dados de monitoramento"
    ],
    "detectionIdeas": [
      "Comparar throughput atual com baseline histórico",
      "correlacionar queda de disponibilidade com mudanças",
      "alertar perda persistente em links críticos",
      "detectar destinos externos incomuns com alto volume",
      "investigar picos de latência após mudanças de segurança"
    ]
  },
  "lab": {
    "id": "lab-1.8",
    "title": "Coleta segura de métricas básicas de rede",
    "labType": "security",
    "objective": "Medir latência, perda aparente, caminho e tempo HTTP de forma leve, registrando evidências sem gerar carga agressiva.",
    "scenario": "Você recebeu uma reclamação de lentidão e precisa criar uma primeira fotografia técnica da conectividade a partir do seu computador.",
    "topology": "Aluno -> rede local -> gateway -> internet ou serviço interno autorizado",
    "architecture": "Host do aluno usando comandos locais para observar ICMP, rota e tempo de aplicação em destino autorizado.",
    "prerequisites": [
      "Ter concluído as aulas 0.4, 0.6 e 1.7.",
      "Usar apenas destinos próprios, públicos de teste ou autorizados.",
      "Ter terminal Windows PowerShell ou Linux disponível."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "Opcional: painel do roteador/firewall quando autorizado",
      "Opcional: planilha ou arquivo Markdown para registrar evidências"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não execute testes de carga.",
      "Não faça varredura em redes de terceiros.",
      "Não publique IPs internos, nomes de host, usuários ou destinos sensíveis.",
      "Use poucos pacotes e intervalos seguros.",
      "Se estiver em rede corporativa, siga as regras internas de monitoramento."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Escolher destinos autorizados",
        "instruction": "Selecione um destino local, como gateway, e um destino externo ou serviço autorizado para comparação.",
        "command": "Windows: ipconfig\nLinux: ip route | grep default",
        "expectedOutput": "Endereço do gateway padrão ou rota default.",
        "explanation": "O gateway ajuda a separar problema local de problema externo."
      },
      {
        "number": 2,
        "title": "Medir RTT para o gateway",
        "instruction": "Envie poucos pings para o gateway e registre mínimo, máximo, média e perda.",
        "command": "Windows: ping -n 20 <gateway>\nLinux: ping -c 20 <gateway>",
        "expectedOutput": "Respostas com tempos baixos e perda zero ou quase zero em rede local saudável.",
        "explanation": "Latência alta ou perda para o gateway sugere problema local, Wi‑Fi, cabo, interface ou equipamento de acesso."
      },
      {
        "number": 3,
        "title": "Medir RTT para destino externo autorizado",
        "instruction": "Repita o teste para um destino externo autorizado ou público de teste.",
        "command": "Windows: ping -n 20 8.8.8.8\nLinux: ping -c 20 8.8.8.8",
        "expectedOutput": "Tempos maiores que o gateway e sem perda recorrente em cenário saudável.",
        "explanation": "Comparar gateway e externo ajuda a separar rede local de caminho externo."
      },
      {
        "number": 4,
        "title": "Observar caminho",
        "instruction": "Use traceroute/tracert para observar saltos até o destino.",
        "command": "Windows: tracert 8.8.8.8\nLinux: traceroute 8.8.8.8",
        "expectedOutput": "Lista de saltos ou alguns saltos sem resposta por política.",
        "explanation": "Nem todo salto responde, mas mudanças ou atrasos grandes podem orientar a investigação."
      },
      {
        "number": 5,
        "title": "Medir tempo HTTP",
        "instruction": "Meça tempos de uma requisição HTTPS para um site permitido.",
        "command": "Linux: curl -o /dev/null -s -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' https://example.com\nWindows PowerShell: Measure-Command { Invoke-WebRequest -Uri https://example.com -UseBasicParsing }",
        "expectedOutput": "Tempo total e, no Linux, tempos separados de DNS, conexão, TLS e início de resposta.",
        "explanation": "HTTP pode estar lento por DNS, TCP, TLS ou aplicação, mesmo se ping estiver bom."
      },
      {
        "number": 6,
        "title": "Registrar interpretação",
        "instruction": "Crie uma tabela com métrica, comando, resultado, hipótese e limite da evidência.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório curto com resultados e limites.",
        "explanation": "Evidência sem interpretação vira coleção de números; interpretação sem limite vira conclusão frágil."
      }
    ],
    "expectedResult": "O aluno deve produzir uma primeira fotografia de métricas com RTT local, RTT externo, caminho, tempo HTTP, hipóteses e limites de evidência.",
    "validation": [
      {
        "check": "Gateway identificado",
        "command": "ipconfig ou ip route",
        "expected": "Rota default ou gateway encontrado.",
        "ifFails": "Verifique se a interface está conectada e se há configuração IP válida."
      },
      {
        "check": "Ping local coletado",
        "command": "ping para gateway",
        "expected": "Resultado com estatísticas de tempo e perda.",
        "ifFails": "Investigue firewall local, Wi‑Fi, cabo, VLAN, IP e gateway."
      },
      {
        "check": "Tempo HTTP coletado",
        "command": "curl ou Invoke-WebRequest",
        "expected": "Tempo de resposta registrado.",
        "ifFails": "Verifique DNS, proxy, firewall, TLS, acesso à internet ou bloqueio corporativo."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Ping para gateway falha",
        "probableCause": "Problema local de IP, Wi‑Fi, cabo, gateway, VLAN ou firewall local.",
        "howToConfirm": "Verificar IP, rota default, interface e conectividade física.",
        "fix": "Corrigir configuração local, reconectar rede ou acionar suporte de acesso."
      },
      {
        "symptom": "Gateway responde bem, destino externo perde pacotes",
        "probableCause": "Problema em rota externa, firewall, operadora ou política.",
        "howToConfirm": "Testar mais de um destino autorizado e verificar logs do gateway/firewall quando possível.",
        "fix": "Escalar com evidências para rede, segurança ou provedor."
      },
      {
        "symptom": "Ping bom, HTTP lento",
        "probableCause": "DNS, TLS, proxy, servidor remoto, aplicação ou autenticação.",
        "howToConfirm": "Medir tempos HTTP separados e testar destino alternativo autorizado.",
        "fix": "Investigar camada de aplicação, DNS, proxy ou serviço."
      },
      {
        "symptom": "Resultados variam muito",
        "probableCause": "Jitter, Wi‑Fi instável, congestionamento ou rota variável.",
        "howToConfirm": "Repetir medições em horários diferentes e comparar cabeado vs Wi‑Fi se possível.",
        "fix": "Melhorar meio, QoS, canal Wi‑Fi, capacidade ou rota."
      }
    ],
    "improvements": [
      "Criar planilha padrão de coleta",
      "Adicionar medição em horários diferentes",
      "Comparar Wi‑Fi e cabo",
      "Executar medição de uma filial ou VM autorizada",
      "Correlacionar com logs de firewall e mudanças"
    ],
    "evidenceToCollect": [
      "Gateway e interface usada",
      "Estatísticas de ping local",
      "Estatísticas de ping externo",
      "Traceroute/tracert",
      "Tempo HTTP",
      "Horário dos testes",
      "Hipóteses e limites"
    ],
    "questions": [
      "Qual métrica piorou primeiro?",
      "O problema parece local, externo ou de aplicação?",
      "Que evidência ainda falta para concluir?",
      "O teste usado mede a aplicação real ou apenas conectividade básica?"
    ],
    "challenge": "Monte um relatório curto para um chamado de lentidão, separando fatos medidos, hipóteses e próximos testes recomendados.",
    "solution": "Uma boa solução registra resultados sem exagerar conclusões: se o gateway responde bem e HTTP demora, não declare 'link ruim'; investigue DNS, TLS, proxy e aplicação. Se há perda para o gateway, priorize meio local, Wi‑Fi, cabo ou switch. Se há perda apenas externa, escale com evidências de horário, destino e caminho."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que 'rede lenta' não é um diagnóstico técnico suficiente?",
      "hints": [
        "Pense em métricas diferentes.",
        "Pense em aplicação, DNS, TLS e servidor."
      ],
      "expectedIdeas": [
        "latência",
        "jitter",
        "perda",
        "throughput",
        "disponibilidade",
        "camadas"
      ],
      "explanation": "A frase descreve percepção do usuário, mas não identifica qual propriedade da comunicação piorou."
    },
    {
      "type": "diagnóstico",
      "question": "Uma chamada de vídeo picota, mas o teste de velocidade mostra alta vazão. Que métrica você investigaria?",
      "hints": [
        "Chamadas são sensíveis a variação.",
        "Nem tudo depende de download grande."
      ],
      "expectedIdeas": [
        "jitter",
        "perda",
        "Wi‑Fi",
        "QoS",
        "latência variável"
      ],
      "explanation": "Voz e vídeo sofrem com jitter e perda mesmo quando throughput máximo parece bom."
    },
    {
      "type": "cenário real",
      "question": "Uma API em cloud fica lenta apenas para usuários de uma filial. Como você separaria rede local, WAN e aplicação?",
      "hints": [
        "Compare gateway, destino externo e API.",
        "Meça de outro ponto."
      ],
      "expectedIdeas": [
        "medição por trecho",
        "RTT",
        "traceroute",
        "tempo HTTP",
        "logs",
        "comparação com outra filial"
      ],
      "explanation": "Comparar pontos e trechos evita culpar a aplicação quando o problema é rota ou culpar a rede quando o problema é serviço."
    }
  ],
  "quiz": [
    {
      "id": "q1.8.1",
      "type": "conceito",
      "q": "Qual métrica mede o tempo de ida e volta observado em muitos testes de ping?",
      "opts": [
        "RTT/latência",
        "Throughput",
        "Disponibilidade",
        "Largura de banda nominal"
      ],
      "a": 0,
      "exp": "O ping normalmente apresenta round-trip time, que é o tempo de ida e volta.",
      "difficulty": "iniciante",
      "topic": "latência"
    },
    {
      "id": "q1.8.2",
      "type": "comparação",
      "q": "Qual é a melhor definição de throughput?",
      "opts": [
        "A vazão útil real obtida",
        "A distância física até o servidor",
        "A variação da latência",
        "O tempo total de indisponibilidade"
      ],
      "a": 0,
      "exp": "Throughput é quanto tráfego útil passa de fato, geralmente menor que a capacidade nominal.",
      "difficulty": "iniciante",
      "topic": "throughput"
    },
    {
      "id": "q1.8.3",
      "type": "diagnóstico",
      "q": "Voz e vídeo falham, mas a média de ping parece razoável. Qual métrica pode estar escondendo o problema?",
      "opts": [
        "Jitter",
        "Endereço MAC",
        "Unicode",
        "T568B"
      ],
      "a": 0,
      "exp": "Jitter é variação de latência, muito importante para tráfego em tempo real.",
      "difficulty": "iniciante-intermediário",
      "topic": "jitter"
    },
    {
      "id": "q1.8.4",
      "type": "segurança",
      "q": "Throughput de saída muito acima do baseline para destino incomum pode indicar o quê?",
      "opts": [
        "Possível exfiltração ou transferência anômala",
        "Sempre melhoria de performance",
        "Que o cabo está crimpado corretamente",
        "Que DNS está resolvendo UTF-8"
      ],
      "a": 0,
      "exp": "Não prova ataque sozinho, mas é um sinal que merece correlação com identidade, endpoint e logs.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q1.8.5",
      "type": "cenário",
      "q": "Um serviço fica fora do ar por 5 minutos várias vezes por dia. Qual métrica de negócio é mais diretamente afetada?",
      "opts": [
        "Disponibilidade",
        "Jitter apenas",
        "Hexadecimal",
        "Categoria do cabo"
      ],
      "a": 0,
      "exp": "Disponibilidade mede se o serviço esteve acessível ao longo do tempo esperado.",
      "difficulty": "iniciante",
      "topic": "disponibilidade"
    },
    {
      "id": "q1.8.6",
      "type": "comando/output",
      "q": "Se ping para o gateway perde pacotes, mas você ainda não testou destinos externos, qual hipótese deve ser priorizada?",
      "opts": [
        "Problema local de acesso, meio, interface ou gateway",
        "Falha obrigatória no servidor remoto",
        "Erro de Base64",
        "Ausência de Unicode"
      ],
      "a": 0,
      "exp": "Perda até o gateway aponta primeiro para o trecho local antes de culpar serviços externos.",
      "difficulty": "iniciante-intermediário",
      "topic": "troubleshooting"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.8.1",
      "front": "O que é latência?",
      "back": "É o tempo que a comunicação leva para ocorrer, frequentemente observado como RTT em testes de ping.",
      "tags": [
        "latência"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.8.2",
      "front": "O que é jitter?",
      "back": "É a variação da latência entre pacotes ou medições sucessivas.",
      "tags": [
        "jitter"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.8.3",
      "front": "O que é perda de pacotes?",
      "back": "É quando pacotes não chegam ao destino ou são descartados no caminho.",
      "tags": [
        "perda"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.8.4",
      "front": "Throughput é igual à largura de banda contratada?",
      "back": "Não. Throughput é a vazão útil real; largura de banda contratada é capacidade nominal.",
      "tags": [
        "throughput"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.8.5",
      "front": "Por que disponibilidade é diferente de latência?",
      "back": "Disponibilidade mede se o serviço está acessível ao longo do tempo; latência mede demora quando a comunicação ocorre.",
      "tags": [
        "disponibilidade"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.8.6",
      "front": "Qual risco de usar só média de latência?",
      "back": "A média pode esconder picos; percentis como p95 e p99 revelam melhor a experiência ruim de parte dos usuários.",
      "tags": [
        "observabilidade"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.8.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre largura de banda e throughput.",
      "expectedAnswer": "Largura de banda é a capacidade nominal ou máxima teórica de um link; throughput é a vazão útil real obtida após overhead, perdas, latência, processamento e limitações do caminho.",
      "explanation": "Essa distinção evita prometer que um link de 1 Gbps sempre entregará 1 Gbps de aplicação."
    },
    {
      "id": "ex1.8.2",
      "type": "diagnóstico",
      "prompt": "Um usuário em Wi‑Fi relata chamada de vídeo picotando, mas navegação comum funciona. Liste três métricas ou evidências que você coletaria.",
      "expectedAnswer": "Jitter, perda, RTT para gateway/destino, qualidade de sinal Wi‑Fi, canal/interferência e comparação com conexão cabeada.",
      "explanation": "Tráfego em tempo real é sensível a variação e perda, não apenas a throughput."
    },
    {
      "id": "ex1.8.3",
      "type": "comando/output",
      "prompt": "Você executa ping para o gateway e observa 10% de perda. O que isso sugere e qual próximo passo?",
      "expectedAnswer": "Sugere problema local no meio, interface, Wi‑Fi, cabo, porta, gateway ou congestionamento local. O próximo passo é verificar interface, sinal/cabo, trocar meio quando possível e comparar com outro dispositivo.",
      "explanation": "Perda até o gateway geralmente deve ser investigada antes de culpar internet ou aplicação."
    },
    {
      "id": "ex1.8.4",
      "type": "segurança",
      "prompt": "Explique por que throughput de saída anormal pode ser relevante para segurança, mas não deve ser tratado como prova isolada de ataque.",
      "expectedAnswer": "Pode indicar exfiltração ou uso indevido, mas também pode ser backup, atualização, sincronização ou atividade legítima. É necessário correlacionar destino, horário, identidade, endpoint, processo e logs.",
      "explanation": "Métrica indica hipótese; investigação exige contexto."
    }
  ],
  "challenge": {
    "title": "Transforme 'a rede está lenta' em investigação mensurável",
    "scenario": "Uma empresa relata lentidão intermitente no sistema de atendimento. Usuários de uma filial reclamam mais que usuários da matriz. O sistema está em cloud e passa por firewall, proxy e autenticação corporativa.",
    "tasks": [
      "Definir quais métricas coletar",
      "Separar testes locais, WAN, cloud e aplicação",
      "Indicar comandos ou fontes de evidência",
      "Listar hipóteses e como descartar cada uma",
      "Indicar riscos de segurança ou anomalias possíveis"
    ],
    "constraints": [
      "Não executar teste de carga",
      "Não usar ferramentas ofensivas",
      "Não coletar dados sensíveis sem autorização",
      "Explicar limites de cada evidência"
    ],
    "expectedDeliverables": [
      "Tabela de métricas",
      "Plano de coleta",
      "Hipóteses priorizadas",
      "Critérios de escalonamento",
      "Resumo executivo para gestor"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta das métricas",
        "points": 25,
        "description": "Distingue latência, jitter, perda, throughput e disponibilidade."
      },
      {
        "criterion": "Coleta por trecho",
        "points": 25,
        "description": "Compara filial, matriz, gateway, WAN, cloud e aplicação."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Evita testes agressivos e protege evidências sensíveis."
      },
      {
        "criterion": "Raciocínio de troubleshooting",
        "points": 20,
        "description": "Lista hipóteses e formas de confirmar ou descartar."
      },
      {
        "criterion": "Comunicação",
        "points": 10,
        "description": "Apresenta conclusões com limites e próximos passos."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A investigação deve começar separando percepção de métrica. A filial afetada sugere comparar localidade, rota, Wi‑Fi/cabeamento, firewall/proxy e acesso à cloud. Como o sistema passa por autenticação, também é necessário separar rede de identidade e aplicação.",
    "steps": [
      "Medir RTT e perda para gateway da filial",
      "Medir destino externo autorizado",
      "Medir tempo HTTP/TLS do sistema ou endpoint de saúde autorizado",
      "Comparar com matriz",
      "Verificar logs de firewall/proxy no horário",
      "Verificar disponibilidade e métricas do serviço cloud",
      "Correlacionar com mudanças e eventos de segurança"
    ],
    "commonWrongAnswers": [
      {
        "answer": "Comprar mais banda imediatamente",
        "whyItIsWrong": "Banda pode não resolver jitter, perda, DNS, TLS, proxy, aplicação ou cloud em região distante."
      },
      {
        "answer": "Culpar a aplicação sem medir rede",
        "whyItIsWrong": "A reclamação concentrada em uma filial pode apontar para caminho, Wi‑Fi, WAN ou proxy local."
      },
      {
        "answer": "Fazer teste de carga sem autorização",
        "whyItIsWrong": "Pode causar indisponibilidade e violar regras de segurança."
      }
    ],
    "finalAnswer": "Uma solução adequada coleta métricas por trecho, compara filial e matriz, mede latência, perda, jitter quando aplicável, tempo HTTP/TLS e disponibilidade, e correlaciona com logs de firewall, proxy, cloud e identidade. A conclusão deve separar fatos, hipóteses e próximos testes."
  },
  "glossary": [
    {
      "term": "Latência",
      "shortDefinition": "Tempo para a comunicação ocorrer.",
      "longDefinition": "Em redes, normalmente é observada como RTT, incluindo ida, processamento e volta.",
      "example": "Ping de 30 ms para um destino indica RTT aproximado de 30 milissegundos.",
      "relatedTerms": [
        "RTT",
        "jitter",
        "throughput"
      ],
      "relatedLessons": [
        "0.6",
        "1.8",
        "6.1"
      ]
    },
    {
      "term": "Jitter",
      "shortDefinition": "Variação da latência.",
      "longDefinition": "Diferença entre tempos de chegada ou resposta de pacotes sucessivos, importante para voz e vídeo.",
      "example": "Uma chamada pode falhar se a latência alterna entre 20 ms e 400 ms.",
      "relatedTerms": [
        "latência",
        "QoS",
        "perda"
      ],
      "relatedLessons": [
        "1.8",
        "12.5"
      ]
    },
    {
      "term": "Perda de pacotes",
      "shortDefinition": "Pacotes descartados ou não entregues.",
      "longDefinition": "Pode ocorrer por erro físico, congestão, filas, políticas, Wi‑Fi ruim ou falhas de caminho.",
      "example": "Ping com 5% de perda indica instabilidade relevante.",
      "relatedTerms": [
        "retransmissão",
        "congestionamento",
        "CRC"
      ],
      "relatedLessons": [
        "1.5",
        "1.8",
        "15.3"
      ]
    },
    {
      "term": "Throughput",
      "shortDefinition": "Vazão útil real de tráfego.",
      "longDefinition": "Quantidade de dados úteis transmitidos por unidade de tempo, geralmente menor que a capacidade nominal.",
      "example": "Um link de 500 Mbps pode entregar 430 Mbps úteis em determinado teste.",
      "relatedTerms": [
        "largura de banda",
        "overhead",
        "Mbps"
      ],
      "relatedLessons": [
        "0.4",
        "0.6",
        "1.8"
      ]
    },
    {
      "term": "Disponibilidade",
      "shortDefinition": "Proporção de tempo em que serviço ou caminho está acessível.",
      "longDefinition": "Métrica de confiabilidade usada em SLA, SLO e operação de serviços críticos.",
      "example": "99,9% de disponibilidade ainda permite cerca de 43 minutos de indisponibilidade em 30 dias.",
      "relatedTerms": [
        "SLA",
        "SLO",
        "monitoramento"
      ],
      "relatedLessons": [
        "1.8",
        "15.8"
      ]
    },
    {
      "term": "SLO",
      "shortDefinition": "Objetivo de nível de serviço.",
      "longDefinition": "Meta interna ou acordada para qualidade, disponibilidade ou desempenho de um serviço.",
      "example": "Responder 95% das requisições em até 300 ms.",
      "relatedTerms": [
        "SLA",
        "SLI",
        "disponibilidade"
      ],
      "relatedLessons": [
        "1.8",
        "15.10"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Aula 0.4 — Bit vs Byte em redes",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para interpretar capacidade, taxa e throughput."
    },
    {
      "type": "internal-course",
      "title": "Aula 0.6 — Latência, largura de banda e throughput",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Introdução conceitual às métricas fundamentais."
    },
    {
      "type": "standard",
      "title": "IP Performance Metrics Framework",
      "organization": "IETF",
      "url": "",
      "note": "Referência conceitual para métricas de desempenho em redes IP."
    },
    {
      "type": "official-doc",
      "title": "Cisco interface and troubleshooting commands",
      "organization": "Cisco",
      "url": "",
      "note": "Comandos de interface e diagnóstico serão aprofundados em módulos posteriores."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "lesson": "métricas e SLOs",
      "reason": "Métricas de rede são base para SRE, alertas e operação de plataformas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação e Federação",
      "lesson": "fluxos de autenticação",
      "reason": "Latência e disponibilidade também afetam OIDC, SAML, MFA e chamadas a provedores de identidade."
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
      "1.9"
    ]
  }
};
