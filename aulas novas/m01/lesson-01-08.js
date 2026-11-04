export const lesson0108 = {
  "id": "1.8",
  "moduleId": "m01",
  "order": 8,
  "title": "Métricas: latência, jitter, perda, throughput e disponibilidade",
  "subtitle": "Como medir uma rede antes de culpar link, firewall, Wi‑Fi, cloud ou aplicação.",
  "duration": "115-160 min",
  "estimatedStudyTimeMinutes": 160,
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Em redes, uma das frases mais perigosas é: “está lento”. Ela pode esconder dezenas de causas diferentes: link saturado, Wi‑Fi ruim, firewall sobrecarregado, DNS lento, servidor com CPU alta, perda de pacotes, rota longa, VPN com MTU inadequado, cloud em região distante, API mal otimizada ou até um ataque consumindo recursos.</p>\n  <p>Para sair do achismo, você precisa transformar a sensação em métrica. Sem isso, troubleshooting vira troca de cabo, reinício de roteador e compra de banda sem resolver a causa real.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o usuário diz que o sistema financeiro está lento. O provedor mostra link de 1 Gbps. O time de aplicação diz que o servidor está saudável. O SOC não vê bloqueio no firewall. Sem medir latência, perda, jitter, throughput e disponibilidade por trecho, ninguém consegue provar onde está a degradação.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Conectividade não garante qualidade. Quando as redes eram só um cabo e um hub, a pergunta era “está conectado?”. Com WAN, VPN, firewall, proxy e cloud no caminho, a pergunta passou a ser “qual é a qualidade da comunicação ponta a ponta?”. A mesma API pode responder em 80 ms no datacenter e em 900 ms para um usuário remoto por causa de rota, TLS, proxy, DNS, fila ou região cloud.</p>\n  <p>Dois hosts podem se alcançar e a experiência ainda ser ruim. O ping pode responder e a aplicação falhar. Um link de 1 Gbps contratado pode entregar throughput útil baixo. Um serviço 99,9% disponível ainda pode causar impacto se a queda cair numa janela crítica.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem medir latência:</strong> você não sabe se a demora está no caminho, no servidor, no DNS, no TLS ou na aplicação.</li>\n    <li><strong>Sem medir jitter:</strong> você não entende por que voz e vídeo picotam mesmo quando a média de ping parece aceitável.</li>\n    <li><strong>Sem medir perda:</strong> você pode culpar o throughput quando o problema real é retransmissão e descarte.</li>\n    <li><strong>Sem medir throughput:</strong> você confunde velocidade contratada com vazão útil real.</li>\n    <li><strong>Sem medir disponibilidade:</strong> você trata falhas recorrentes de minutos como eventos isolados, e não como risco operacional.</li>\n  </ul>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>Métricas de rede descrevem a qualidade, a capacidade e a confiabilidade da comunicação. Elas não são sinônimos: cada uma responde a uma pergunta diferente.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> latência é o tempo para a comunicação ocorrer; jitter é a variação da latência; perda é a fração de pacotes que não chega; throughput é a vazão útil efetivamente obtida; disponibilidade é a proporção de tempo em que um serviço ou caminho está acessível conforme o esperado. Largura de banda é outra coisa: a capacidade nominal do link, o teto, e não o que de fato passa.</div>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Métrica</th><th>Pergunta que responde</th><th>Unidade comum</th><th>Sintoma típico</th></tr></thead>\n    <tbody>\n      <tr><td>Latência</td><td>Quanto tempo demora?</td><td>ms</td><td>Sistema responde devagar</td></tr>\n      <tr><td>Jitter</td><td>Esse tempo varia muito?</td><td>ms de variação</td><td>Voz e vídeo falhando</td></tr>\n      <tr><td>Perda</td><td>Quanto tráfego se perde?</td><td>%</td><td>Retransmissões, quedas e lentidão</td></tr>\n      <tr><td>Throughput</td><td>Quanto tráfego útil passa?</td><td>Mbps, Gbps, MB/s</td><td>Backup ou download lento</td></tr>\n      <tr><td>Disponibilidade</td><td>Esteve acessível no período?</td><td>% ou tempo de indisponibilidade</td><td>Interrupções recorrentes</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Cada métrica nasce de um mecanismo diferente. Por isso uma ferramenta só raramente responde tudo.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Latência:</strong> soma tempo de transmissão, propagação no meio, processamento em equipamentos, filas, inspeção de firewall, negociação de protocolo e resposta do serviço.</li>\n    <li><strong>RTT:</strong> round-trip time mede ida e volta. O ping mostra RTT, não apenas a ida.</li>\n    <li><strong>Jitter:</strong> aparece quando pacotes sucessivos têm latências diferentes. Filas, Wi‑Fi instável, congestionamento e QoS ruim aumentam o jitter.</li>\n    <li><strong>Perda:</strong> ocorre quando pacotes são descartados por erro físico, fila cheia, política, congestionamento, rádio ruim, MTU, firewall ou falha de caminho.</li>\n    <li><strong>Throughput:</strong> depende da menor capacidade efetiva do caminho, do overhead, da janela TCP, da perda, da latência, do processamento, da criptografia e dos limites do serviço.</li>\n    <li><strong>Disponibilidade:</strong> é calculada ao longo do tempo. Um serviço pode ter boa latência quando está no ar e disponibilidade ruim se cai várias vezes ao dia.</li>\n  </ol>\n\n  <h3>Como ler a saída do ping</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>O que aparece</th><th>Windows (<code>ping -n 20</code>)</th><th>Linux (<code>ping -c 20</code>)</th><th>Métrica</th></tr></thead>\n    <tbody>\n      <tr><td>Pacotes enviados × recebidos</td><td><code>Perdidos = 1 (5% de perda)</code></td><td><code>20 packets transmitted, 19 received, 5% packet loss</code></td><td>Perda</td></tr>\n      <tr><td>Tempos de resposta</td><td><code>Mínimo</code>, <code>Máximo</code>, <code>Média</code></td><td><code>rtt min/avg/max/mdev</code></td><td>Latência (RTT)</td></tr>\n      <tr><td>Distância entre mínimo e máximo; <code>mdev</code> no Linux</td><td>Máximo muito acima do mínimo</td><td><code>mdev</code> alto (desvio dos tempos)</td><td>Pista de jitter</td></tr>\n      <tr><td>Nenhuma resposta (destino inacessível ou ICMP bloqueado: confirme com um teste TCP)</td><td><code>Esgotado o tempo limite do pedido.</code></td><td><code>100% packet loss</code></td><td>Disponibilidade (com cautela)</td></tr>\n    </tbody>\n  </table></div>\n\n  <h3>Média, percentil e jitter numa série real</h3>\n  <p>Dez pings seguidos para o mesmo destino: <code>20, 21, 20, 22, 21, 20, 120, 21, 20, 115 ms</code>.</p>\n  <ul>\n    <li><strong>Média:</strong> 400 ÷ 10 = 40 ms. Parece aceitável.</li>\n    <li><strong>Distribuição:</strong> 2 de 10 respostas (20%) passaram de 100 ms. É isso que o usuário sente. Em ambientes profissionais você olha percentis: o <strong>p95</strong> é o valor abaixo do qual ficam 95% das medições (o p99, 99%). Médias escondem picos; percentis os mostram.</li>\n    <li><strong>Jitter:</strong> uma estimativa simples é a média das diferenças entre respostas consecutivas: (1+1+2+1+1+100+99+1+95) ÷ 9 ≈ 33 ms. Para uma chamada de voz, isso já é ruim, mesmo com média de 40 ms.</li>\n  </ul>\n\n  <h3>Por que muita banda ainda pode parecer lenta</h3>\n  <p>Uma conexão TCP só envia uma “janela” de dados antes de esperar a confirmação, que leva um RTT para voltar. O throughput máximo de uma conexão fica limitado a <strong>janela ÷ RTT</strong>. Com janela de 64 KB (65.535 bytes, sem escala de janela) e RTT de 100 ms: 65.535 × 8 ÷ 0,1 s ≈ 5,2 Mbps, mesmo num link de 1 Gbps. Latência alta e perda (que força retransmissão e reduz a janela) derrubam a vazão útil sem que a banda contratada mude.</p>\n\n  <h3>Disponibilidade em números</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Disponibilidade</th><th>Indisponibilidade permitida em 30 dias (43.200 min)</th></tr></thead>\n    <tbody>\n      <tr><td>99%</td><td>432 min ≈ 7,2 h</td></tr>\n      <tr><td>99,9%</td><td>≈ 43 min</td></tr>\n      <tr><td>99,99%</td><td>≈ 4,3 min</td></tr>\n    </tbody>\n  </table></div>\n  <p>Essas metas aparecem em <strong>SLA</strong> (acordo de nível de serviço: o compromisso formal com cliente ou fornecedor, normalmente com consequência se for descumprido) e em <strong>SLO</strong> (objetivo de nível de serviço: a meta interna que o time persegue, em geral mais exigente que o SLA para dar margem).</p>\n\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li>Confundir largura de banda com throughput: o plano é vendido em capacidade nominal; a ferramenta mostra a vazão real. Comparar os dois direto gera expectativas irreais e diagnóstico errado.</li>\n      <li>Achar que ping baixo significa aplicação saudável: ping prova conectividade básica; problemas de DNS, TLS, autenticação, banco ou servidor passam despercebidos.</li>\n      <li>Olhar só a média de latência em voz e vídeo: as chamadas continuam ruins com “ping aceitável”. Meça variação e perda, sobretudo em Wi‑Fi, VPN e links congestionados.</li>    </ul>\n  </div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Analise as métricas por trecho e por camada. Um caminho empresarial pode incluir notebook, Wi‑Fi, switch, firewall, proxy, VPN, operadora, balanceador, serviço cloud, banco de dados e identidade. Cada trecho pode piorar uma métrica diferente.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Camada física:</strong> erros, CRC, sinal fraco, interferência e cabo ruim podem causar perda.</li>\n    <li><strong>Camada de enlace:</strong> duplex, VLAN, STP, Wi‑Fi e porta de switch influenciam a estabilidade local.</li>\n    <li><strong>Camada de rede:</strong> rota, distância, caminho assimétrico e NAT influenciam latência e disponibilidade.</li>\n    <li><strong>Camada de transporte:</strong> TCP reage à perda e à latência retransmitindo e reduzindo a vazão; UDP sofre mais visivelmente com jitter e perda.</li>\n    <li><strong>Camada de aplicação:</strong> HTTP, DNS, TLS, autenticação e banco podem adicionar tempo sem que a “rede” esteja fisicamente ruim.</li>\n  </ul>\n  <h3>Limites de cada medição</h3>\n  <ul>\n    <li>O ping pode ser bloqueado ou tratado com prioridade diferente do tráfego real da aplicação.</li>\n    <li>O traceroute dá uma pista do caminho de ida, mas nem sempre mostra caminhos assimétricos ou políticas intermediárias.</li>\n    <li>Um teste de velocidade mede um cenário específico; não garante a performance de todas as aplicações nem prova a qualidade de uma rede corporativa.</li>\n    <li>A disponibilidade medida de um único ponto (por exemplo, só de dentro do datacenter) pode não representar todos os usuários; medir de vários pontos é mais confiável.</li>\n  </ul>\n  <p>Um gráfico mostra que algo piorou; cruzá-lo com logs, eventos de segurança e mudanças no mesmo horário mostra por quê.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense em uma estrada. Latência é quanto tempo uma viagem leva. Largura de banda é quantas faixas a estrada possui. Throughput é quantos carros realmente passam por minuto. Jitter é a variação do tempo de viagem: às vezes 10 minutos, às vezes 40. Perda é quando carros não chegam ao destino. Disponibilidade é se a estrada ficou aberta durante o período esperado.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> a estrada não tem retransmissão, filas de buffer nem protocolos como TCP e UDP; ela serve para separar capacidade de vazão, não para explicar esses mecanismos.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, você tem internet de 500 Mbps. Um teste de velocidade mostra 480 Mbps perto do roteador, mas uma chamada de vídeo trava no quarto. Isso não contradiz o plano: o throughput máximo perto do roteador pode ser alto, mas no quarto o Wi‑Fi pode ter sinal fraco, interferência, perda e jitter. Para streaming e chamadas, estabilidade pode importar mais que banda nominal.</p>\n  <p>Outro exemplo: um download grande atinge 50 MB/s, ou seja, 50 × 8 = 400 Mbps (o navegador mostra bytes; o link é vendido em bits). Mesmo assim, abrir um site pode parecer lento porque o problema está em DNS, TLS, servidor remoto ou latência inicial, e não na capacidade de download contínuo.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Uma filial reclama que o ERP fica lento no começo da manhã. O link WAN não está 100% saturado, mas há picos de perda e latência quando backups, atualizações e abertura de sistemas ocorrem ao mesmo tempo. O firewall também mostra aumento de sessões e inspeção TLS. Comprar mais banda pode ajudar parcialmente, mas o diagnóstico profissional verifica QoS, horários de backup, capacidade do firewall, proxy, DNS, rota e métricas do servidor.</p>\n  <p>Associe as métricas a usuários, sites, aplicações e mudanças. Um aumento de latência logo após uma mudança de rota ou de política de firewall é uma evidência muito diferente de uma perda causada por cabo defeituoso.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, as métricas de rede aparecem em VPC/VNet, load balancers, NAT gateways, firewalls gerenciados, VPN site-to-site, private endpoints e tráfego entre regiões. Uma aplicação em São Paulo chamando um banco em outra região pode ter latência maior mesmo com throughput suficiente. Um NAT Gateway pode ser cobrado por tráfego processado. Um firewall gerenciado pode adicionar custo e latência, mas fornece inspeção, logs e controle. E a própria observabilidade (logs, flow logs, APM) gera custo de armazenamento e processamento.</p>\n  <p>O erro comum é tratar cloud como “rede infinita”. A cloud abstrai cabos e switches, mas não elimina distância, rota, filas, limites de serviço, custo de egress, quotas e dependências regionais. Métricas ajudam a decidir se o problema é arquitetura, capacidade, distância ou serviço.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Um pipeline pode falhar por timeout não porque o código está errado, mas porque o runner que baixa imagens, acessa registries e fala com clusters Kubernetes está numa rede com latência alta, DNS instável, proxy mal configurado ou throughput baixo para artefatos grandes.</p>\n  <p>Dentro do Kubernetes, sidecars de service mesh e TLS mútuo podem adicionar latência, e NetworkPolicies podem bloquear tráfego; logs e traces ajudam a separar rede, aplicação e política.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <p>O diagrama separa métricas que parecem semelhantes, mas medem coisas diferentes: tempo, variação, perda, vazão útil e disponibilidade.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 500\" role=\"img\" aria-labelledby=\"m01l08-title m01l08-desc\">\n    <title id=\"m01l08-title\">Métricas de rede no caminho entre cliente e serviço</title>\n    <desc id=\"m01l08-desc\">Cliente envia tráfego por switch, firewall, WAN e servidor. O diagrama destaca latência, jitter, perda, throughput e disponibilidade.</desc>\n    <defs>\n      <marker id=\"m01l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <rect x=\"240\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"310\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <rect x=\"440\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"510\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <rect x=\"640\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"710\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">WAN/Cloud</text>\n    <rect x=\"820\" y=\"90\" width=\"120\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"880\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n\n    <line x1=\"180\" y1=\"125\" x2=\"240\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"380\" y1=\"125\" x2=\"440\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"580\" y1=\"125\" x2=\"640\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"780\" y1=\"125\" x2=\"820\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n\n    <path d=\"M880 170 C760 235, 510 235, 110 170\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l08-arrow)\" />\n    <text x=\"500\" y=\"245\" text-anchor=\"middle\" class=\"svg-label\">RTT: ida + processamento + volta</text>\n\n    <rect x=\"75\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"157\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Latência</text>\n    <text x=\"157\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tempo por operação</text>\n    <text x=\"157\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ms / RTT</text>\n\n    <rect x=\"285\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"367\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Jitter</text>\n    <text x=\"367\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">variação da latência</text>\n    <text x=\"367\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">voz e vídeo sofrem</text>\n\n    <rect x=\"495\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"577\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Perda</text>\n    <text x=\"577\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pacotes não chegam</text>\n    <text x=\"577\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">retransmissão/queda</text>\n\n    <rect x=\"705\" y=\"300\" width=\"190\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"800\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Throughput</text>\n    <text x=\"800\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">vazão útil real</text>\n    <text x=\"800\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">menor que a banda nominal</text>\n\n    <line x1=\"110\" y1=\"405\" x2=\"880\" y2=\"405\" class=\"svg-flow svg-flow--blocked\" />\n    <text x=\"500\" y=\"438\" text-anchor=\"middle\" class=\"svg-label\">Disponibilidade: capacidade de o serviço estar acessível no período combinado</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> nunca aceite “rede lenta” como diagnóstico. Converta a reclamação numa pergunta (é tempo, variação, descarte, vazão útil, disponibilidade ou aplicação?) e meça por trecho.</li>\n    <li><strong>O que lembrar:</strong> latência mede tempo (RTT no ping), jitter mede variação, perda mede descarte, throughput mede vazão útil e disponibilidade mede acesso ao longo do tempo. Largura de banda é só o teto.</li>\n    <li><strong>Números que ajudam:</strong> MB/s × 8 = Mbps; throughput de uma conexão TCP ≤ janela ÷ RTT; 99,9% de disponibilidade ainda permite ≈ 43 min de queda em 30 dias; médias escondem picos que o p95/p99 mostra.</li>\n    <li><strong>Erro comum:</strong> confundir banda contratada com performance real da aplicação, ou ping bom com aplicação saudável.</li>\n    <li><strong>Uso real:</strong> métricas permitem justificar mudanças, priorizar incidentes, cobrar fornecedores e separar problema de rede, aplicação, cloud e segurança.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você vai usar <code>ipconfig</code>, <code>ping</code>, <code>arp</code>, <code>tracert</code> e <code>nslookup</code> para coletar as primeiras evidências de configuração IP, vizinhança local, alcance, caminho e resolução de nomes.</p>\n</section>\n"
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
        "interpretation": "Erros de CRC, input errors ou output drops na interface, ou CPU alta em equipamento intermediário, podem explicar perda, jitter ou indisponibilidade."
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
      },
      {
        "if": "A aplicação demora para abrir, mas downloads são rápidos",
        "then": "Medir tempos de DNS, conexão, TLS e resposta HTTP (curl -w) e o tempo do servidor: throughput alto não elimina latência nem aplicação lenta. Comprar banda aqui não resolve a experiência."
      },
      {
        "if": "Chamada de vídeo picota, mas a média do ping parece boa",
        "then": "Medir jitter e perda ao longo do tempo (série de pings, máximo × mínimo, mdev), comparar Wi‑Fi com cabo e verificar QoS e filas: a média esconde variação e descarte."
      },
      {
        "if": "Backup demora muito apenas em um horário específico",
        "then": "Medir throughput real, saturação do link e tráfego concorrente naquele horário antes de culpar o servidor: transferências grandes dependem de vazão útil contínua."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Criar baselines de tráfego, latência, perda e disponibilidade por site e aplicação.",
      "Correlacionar métricas de rede com logs de firewall, DNS, proxy, endpoint e identidade: a métrica indica uma hipótese, não prova a causa.",
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
        "mitigation": "Egress filtering, DLP, UEBA, baselines, alertas de destino incomum e investigação de identidade e endpoint."
      },
      {
        "name": "Saturação de controle de segurança",
        "description": "Firewall, proxy ou WAF sobrecarregado (sessões caindo, CPU alta) gera perda e latência, degrada a disponibilidade e cria pressão por bypass inseguro. Pode ser ataque volumétrico/DDoS, falta de capacidade ou regra mal planejada.",
        "defensiveExplanation": "Métricas de CPU, sessão, throughput e drops ajudam a diferenciar ataque, capacidade e regra mal planejada.",
        "mitigation": "Capacity planning, rate limit, proteção DDoS, tuning de regras, escala horizontal e monitoramento."
      },
      {
        "name": "Falsa disponibilidade por monitoramento limitado",
        "description": "Monitorar apenas de dentro do datacenter pode esconder falhas de usuários remotos, filiais ou regiões, inclusive quedas curtas recorrentes causadas por rota instável ou mudança mal controlada.",
        "defensiveExplanation": "Disponibilidade precisa refletir a experiência real dos públicos relevantes.",
        "mitigation": "Monitoramento sintético multi-região, probes em filiais, SLOs por jornada crítica e change management."
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
      "Investigar picos de conexões com baixa taxa útil: podem indicar varredura, falha de autenticação em massa ou serviço degradado",
      "Correlacionar queda de disponibilidade com mudanças",
      "Alertar perda persistente em links críticos",
      "Detectar destinos externos incomuns com alto volume",
      "Investigar picos de latência após mudanças de segurança",
      "Investigar jitter em voz corporativa em horários específicos: fila, QoS ausente ou tráfego concorrente"
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
      "Não execute testes de carga nem varreduras: use poucos pacotes (20) e destinos próprios, públicos de teste ou autorizados.",
      "Não publique IPs internos, nomes de host, usuários ou destinos sensíveis.",
      "Em rede corporativa, siga as regras internas de monitoramento."
    ],
    "steps": [
      {
        "title": "Escolher destinos autorizados",
        "instruction": "Selecione um destino local, como gateway, e um destino externo ou serviço autorizado para comparação.",
        "command": "Windows: ipconfig\nLinux: ip route | grep default",
        "expectedOutput": "Endereço do gateway padrão ou rota default.",
        "explanation": "O gateway ajuda a separar problema local de problema externo."
      },
      {
        "title": "Medir RTT para o gateway",
        "instruction": "Envie 20 pings para o gateway e registre mínimo, máximo, média e % de perda (no Linux, também o mdev).",
        "command": "Windows: ping -n 20 <gateway>\nLinux: ping -c 20 <gateway>",
        "expectedOutput": "Respostas com tempos baixos e perda zero ou quase zero em rede local saudável.",
        "explanation": "Latência alta ou perda para o gateway sugere problema local, Wi‑Fi, cabo, interface ou equipamento de acesso."
      },
      {
        "title": "Medir RTT para destino externo autorizado",
        "instruction": "Repita o teste para um destino externo autorizado ou público de teste.",
        "command": "Windows: ping -n 20 8.8.8.8\nLinux: ping -c 20 8.8.8.8",
        "expectedOutput": "Tempos maiores que o gateway e sem perda recorrente em cenário saudável.",
        "explanation": "Comparar gateway e externo ajuda a separar rede local de caminho externo."
      },
      {
        "title": "Observar caminho",
        "instruction": "Use traceroute/tracert para observar saltos até o destino.",
        "command": "Windows: tracert 8.8.8.8\nLinux: traceroute 8.8.8.8",
        "expectedOutput": "Lista de saltos ou alguns saltos sem resposta por política.",
        "explanation": "Nem todo salto responde, mas mudanças ou atrasos grandes podem orientar a investigação."
      },
      {
        "title": "Medir tempo HTTP",
        "instruction": "Meça tempos de uma requisição HTTPS para um site permitido.",
        "command": "Linux: curl -o /dev/null -s -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' https://example.com\nWindows PowerShell: Measure-Command { Invoke-WebRequest -Uri https://example.com -UseBasicParsing }",
        "expectedOutput": "Tempo total e, no Linux, tempos separados de DNS, conexão, TLS e início de resposta.",
        "explanation": "HTTP pode estar lento por DNS, TCP, TLS ou aplicação, mesmo se ping estiver bom."
      },
      {
        "title": "Registrar interpretação",
        "instruction": "Crie uma tabela com as colunas métrica, comando, resultado, hipótese e limite da evidência, com uma linha para cada passo anterior e o horário dos testes.",
        "expectedOutput": "Tabela curta com resultados, hipóteses e limites. Exemplo de linha: Perda | ping -c 20 <gateway> | 0% | trecho local saudável | ICMP pode ter prioridade diferente do tráfego real.",
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
      "Repetir as medições em horários diferentes",
      "Comparar Wi‑Fi e cabo",
      "Medir de uma filial ou VM autorizada e correlacionar com logs de firewall e mudanças"
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
      "id": "q1.8.2",
      "question": "Qual é a melhor definição de throughput?",
      "options": [
        "A capacidade nominal contratada do link",
        "A vazão útil real obtida",
        "A variação da latência",
        "O tempo total de indisponibilidade"
      ],
      "answer": 1,
      "explanation": "Throughput é quanto tráfego útil passa de fato; a capacidade nominal contratada é a largura de banda, o teto, e o throughput costuma ficar abaixo dela.",
      "topic": "throughput",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.8.3",
      "question": "Voz e vídeo falham, mas a média de ping parece razoável. Qual métrica pode estar escondendo o problema?",
      "options": [
        "Largura de banda",
        "Throughput",
        "Jitter",
        "Disponibilidade"
      ],
      "answer": 2,
      "explanation": "Jitter é a variação da latência. Uma média razoável pode esconder respostas que alternam entre tempos baixos e altos, e o tráfego em tempo real sofre com isso.",
      "topic": "jitter",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q1.8.4",
      "question": "Throughput de saída muito acima do baseline para destino incomum pode indicar o quê?",
      "options": [
        "Possível exfiltração ou transferência anômala, que precisa ser correlacionada",
        "Prova de ataque, que justifica bloquear o host imediatamente",
        "Melhoria de performance após upgrade do link",
        "Jitter alto no link de saída"
      ],
      "answer": 0,
      "explanation": "Não prova ataque sozinho (pode ser backup ou sincronização legítima), mas é um sinal que merece correlação com destino, horário, identidade, endpoint e logs.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.8.5",
      "question": "Um serviço fica fora do ar por 5 minutos várias vezes por dia. Qual métrica de negócio é mais diretamente afetada?",
      "options": [
        "Latência média",
        "Jitter",
        "Throughput",
        "Disponibilidade"
      ],
      "answer": 3,
      "explanation": "Disponibilidade mede se o serviço esteve acessível ao longo do tempo esperado; quedas curtas e repetidas a reduzem mesmo que a latência seja boa quando o serviço está no ar.",
      "topic": "disponibilidade",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q1.8.6",
      "question": "Se ping para o gateway perde pacotes, mas você ainda não testou destinos externos, qual hipótese deve ser priorizada?",
      "options": [
        "Falha no servidor remoto da aplicação",
        "Problema local de acesso, meio, interface ou gateway",
        "Rota ruim na operadora",
        "Lentidão de DNS"
      ],
      "answer": 1,
      "explanation": "Perda até o gateway aponta primeiro para o trecho local antes de culpar serviços externos.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "comando/output"
    },
    {
      "id": "q1.8.7",
      "question": "Um SLA promete 99,9% de disponibilidade mensal (30 dias). Aproximadamente quanto tempo de indisponibilidade ele ainda permite?",
      "options": [
        "Cerca de 4 minutos",
        "Cerca de 7 horas",
        "Cerca de 43 minutos",
        "Cerca de 90 minutos"
      ],
      "answer": 2,
      "explanation": "30 dias têm 43.200 minutos; 0,1% disso é 43,2 minutos. 99,99% permitiria cerca de 4,3 minutos e 99%, cerca de 7,2 horas.",
      "topic": "disponibilidade",
      "difficulty": "iniciante-intermediário",
      "type": "cálculo"
    },
    {
      "id": "q1.8.8",
      "question": "O ping para o site tem 15 ms e 0% de perda, mas o curl mostra dns=1.9 s e total=2.3 s. Onde está a maior parte da demora?",
      "options": [
        "Na perda de pacotes do link",
        "Na largura de banda contratada",
        "No jitter do Wi‑Fi",
        "Na resolução de nomes (DNS)"
      ],
      "answer": 3,
      "explanation": "O curl separa os tempos: 1,9 s dos 2,3 s foram gastos antes da conexão, resolvendo o nome. Ping bom e sem perda não prova que DNS, TLS ou aplicação estão saudáveis.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "comando/output"
    },
    {
      "id": "q1.8.9",
      "question": "Uma conexão TCP com janela de 64 KB e RTT de 100 ms transfere bem abaixo do link de 1 Gbps. Qual é a explicação mais provável?",
      "options": [
        "O throughput de uma conexão fica limitado a janela ÷ RTT, cerca de 5 Mbps aqui",
        "O link entrega sempre só 50% da banda nominal",
        "O jitter reduz a capacidade nominal do link",
        "A disponibilidade do serviço está abaixo de 99%"
      ],
      "answer": 0,
      "explanation": "Sem escala de janela, 65.535 bytes × 8 ÷ 0,1 s ≈ 5,2 Mbps: a latência limita a vazão útil de uma conexão mesmo com muita banda.",
      "topic": "throughput",
      "difficulty": "intermediário",
      "type": "cálculo"
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
      "back": "A média pode esconder picos; percentis como p95 (valor abaixo do qual ficam 95% das medições) e p99 revelam a experiência ruim de parte dos usuários.",
      "tags": [
        "observabilidade"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.8.7",
      "front": "Qual a diferença entre SLA e SLO?",
      "back": "SLA é o compromisso formal com cliente ou fornecedor, normalmente com consequência se descumprido; SLO é a meta interna do time, em geral mais exigente que o SLA.",
      "tags": [
        "disponibilidade"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.8.8",
      "front": "Um download mostra 50 MB/s. Quanto é isso em Mbps?",
      "back": "400 Mbps: multiplique bytes por 8 para comparar com a velocidade do link, que é vendida em bits.",
      "tags": [
        "throughput"
      ],
      "difficulty": "iniciante"
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
      "id": "ex1.8.5",
      "type": "comando/output",
      "prompt": "Dez pings para um servidor de voz retornam 30, 31, 30, 150, 29, 30, 160, 31, 30, 29 ms, com 0% de perda. Calcule a média, diga o que ela esconde e qual métrica explica as reclamações de áudio picotado.",
      "expectedAnswer": "Média = 550 ÷ 10 = 55 ms, que parece aceitável. Ela esconde que 2 de 10 respostas (20%) chegaram a 150 ms ou mais. A métrica é o jitter: as diferenças entre respostas consecutivas somam 1+1+120+121+1+130+129+1+1 = 505, cerca de 56 ms em média, ruim para voz. O próximo passo é medir ao longo do tempo, comparar Wi‑Fi e cabo e verificar QoS e filas.",
      "explanation": "Média e perda zero não bastam para tráfego em tempo real; a variação (jitter) e os picos (percentis) é que definem a experiência."
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
      "longDefinition": "Meta interna para qualidade, disponibilidade ou desempenho de um serviço, em geral mais exigente que o SLA (o compromisso formal com cliente ou fornecedor).",
      "example": "Responder 95% das requisições em até 300 ms.",
      "relatedTerms": [
        "SLA",
        "disponibilidade",
        "percentil"
      ],
      "relatedLessons": [
        "1.8",
        "15.10"
      ]
    },
    {
      "term": "Largura de banda",
      "shortDefinition": "Capacidade nominal de um link.",
      "longDefinition": "Taxa máxima teórica de transmissão, em bits por segundo, que o link ou plano oferece. O throughput real costuma ficar abaixo dela.",
      "example": "Plano de 500 Mbps: 500 Mbps é a largura de banda; 430 Mbps medidos são o throughput.",
      "relatedTerms": [
        "throughput",
        "Mbps"
      ]
    },
    {
      "term": "Percentil (p95/p99)",
      "shortDefinition": "Valor abaixo do qual fica uma porcentagem das medições.",
      "longDefinition": "O p95 é o tempo abaixo do qual ficam 95% das medições. Mostra os picos que a média esconde.",
      "example": "Média de 40 ms com p95 de 120 ms indica que 5% das requisições levam 120 ms ou mais.",
      "relatedTerms": [
        "latência",
        "SLO"
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
