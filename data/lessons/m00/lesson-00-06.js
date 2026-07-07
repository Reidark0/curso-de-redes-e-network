export const lesson0006 = {
  "id": "0.6",
  "moduleId": "m00",
  "order": 6,
  "title": "Latência, largura de banda e throughput",
  "subtitle": "Como separar capacidade, tempo de resposta e vazão real para diagnosticar redes lentas com método profissional.",
  "duration": "75-105 min",
  "estimatedStudyTimeMinutes": 105,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 180,
  "tags": [
    "fundamentos",
    "latência",
    "largura de banda",
    "throughput",
    "jitter",
    "perda",
    "fila",
    "bufferbloat",
    "performance",
    "troubleshooting",
    "cloud",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.4",
      "reason": "A aula 0.4 diferencia bits, bytes, taxa nominal, overhead e taxa útil."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "A aula 0.5 explica que sinais físicos, meio e interferência influenciam perda e desempenho."
    }
  ],
  "objectives": [
    "Diferenciar latência, largura de banda e throughput sem tratar todos como sinônimo de velocidade.",
    "Explicar por que uma rede com alta largura de banda ainda pode parecer lenta.",
    "Relacionar perda, jitter, filas, congestionamento e overhead com experiência real do usuário.",
    "Usar comandos básicos para coletar evidências de latência, caminho e vazão.",
    "Conectar métricas de performance com cloud, DevSecOps, observabilidade, segurança e resposta a incidentes."
  ],
  "learningOutcomes": [
    "Dado um relato de lentidão, o aluno consegue separar hipóteses de latência alta, largura insuficiente, throughput baixo, perda e jitter.",
    "Dado um teste de ping, traceroute ou curl, o aluno consegue interpretar evidências básicas sem concluir prematuramente.",
    "Dado um cenário de backup, chamada de vídeo ou API lenta, o aluno consegue apontar qual métrica importa mais.",
    "Dado um ambiente cloud, o aluno entende que regiões, zonas, NAT, VPN, proxies e inspeção podem acrescentar latência e custo.",
    "Dado um alerta de SIEM ou observabilidade, o aluno consegue relacionar volume, vazão, latência e possível abuso ou degradação."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Quando alguém diz “a rede está lenta”, essa frase quase nunca é um diagnóstico. Ela é um sintoma. Pode significar que uma página demora para começar a carregar, que um download não passa de certa taxa, que uma chamada de vídeo engasga, que uma API responde em segundos, que o acesso via VPN está ruim ou que um backup demora a noite inteira. Em todos esses casos, a palavra “lenta” esconde fenômenos diferentes.\n  </p>\n  <p>\n    Para diagnosticar corretamente, você precisa separar três ideias que muita gente mistura: <strong>latência</strong>, <strong>largura de banda</strong> e <strong>throughput</strong>. Latência é tempo de resposta. Largura de banda é capacidade teórica ou contratada do caminho. Throughput é quanto de dados úteis realmente passa em determinado período. A rede pode ter muita largura de banda e ainda ter latência alta. Pode ter baixa latência e throughput ruim. Pode ter bom throughput em um teste simples, mas péssima experiência por jitter e perda.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> uma empresa contrata um link de 1 Gbps, mas usuários reclamam que o sistema web interno está lento. O teste de velocidade parece bom. O firewall não bloqueia. O DNS resolve. Depois de investigar, a equipe percebe que o problema está em latência alta até a região cloud, filas no proxy e perda intermitente na VPN. O link tinha capacidade; o caminho não entregava boa experiência.\n  </div>\n  <p>\n    Em Segurança da Informação, essas métricas também são relevantes. Exfiltração de dados pode aparecer como aumento de throughput de saída. Ataques de negação de serviço podem gerar perda, filas e latência. Inspeção TLS, proxies, VPNs e firewalls adicionam processamento e podem alterar performance. Sem entender essas métricas, você pode confundir ataque, falha de rede, gargalo de aplicação e limitação contratual.\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    Desde as primeiras redes, desempenho não foi apenas uma questão de “passar dados”. Era necessário saber quanto tempo uma mensagem levava para chegar, quantas mensagens cabiam no meio e quantas realmente eram entregues sem erro. Em linhas seriais, modems, redes Ethernet antigas, links WAN e redes sem fio, limitações físicas e de compartilhamento sempre impactaram a experiência do usuário.\n  </p>\n  <p>\n    No começo, a diferença entre capacidade e experiência já aparecia em enlaces lentos: um link podia ter uma taxa nominal, mas protocolos, erros, retransmissões e disputa pelo meio reduziam o resultado útil. Com a internet, a distância passou a importar ainda mais. Um servidor em outro país podia ter bastante banda disponível, mas ainda responder devagar por causa do tempo de propagação, roteadores intermediários, filas e congestionamento.\n  </p>\n  <p>\n    Com cloud e aplicações distribuídas, a história ficou mais complexa. Hoje uma requisição pode sair do usuário, passar por Wi‑Fi, switch, firewall, proxy, VPN, provedor, CDN, load balancer, WAF, API gateway, service mesh, container, banco de dados e voltar. Cada etapa pode adicionar microssegundos, milissegundos, filas, perda ou overhead. Por isso, redes modernas exigem uma visão de desempenho ponta a ponta.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Época/cenário</th><th>Métrica que chamava atenção</th><th>Limitação comum</th><th>Aprendizado</th></tr></thead>\n    <tbody>\n      <tr><td>Modems e linhas seriais</td><td>Taxa baixa</td><td>Pouca capacidade</td><td>Largura de banda importava muito</td></tr>\n      <tr><td>LAN Ethernet</td><td>Colisão e compartilhamento</td><td>Meio disputado</td><td>Throughput real dependia do uso</td></tr>\n      <tr><td>WAN e internet</td><td>Tempo de ida e volta</td><td>Distância e roteamento</td><td>Latência afeta experiência</td></tr>\n      <tr><td>Cloud e microserviços</td><td>Ponta a ponta</td><td>Muitos saltos e camadas</td><td>Observabilidade é indispensável</td></tr>\n    </tbody>\n  </table>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema técnico é que “velocidade da rede” não é uma única variável. O usuário percebe uma experiência final, mas essa experiência é composta por tempo de ida e volta, capacidade do caminho, perda, retransmissão, processamento, fila, protocolo, tamanho de pacote, overhead e comportamento da aplicação.\n  </p>\n  <p>\n    Imagine duas estradas. Uma é uma avenida com muitas faixas, mas fica a 2.000 km de distância. Outra é uma rua estreita, mas está ao lado. A avenida tem grande capacidade, mas a primeira resposta demora. A rua próxima responde rápido, mas não transporta grande volume. Redes funcionam de maneira parecida: <strong>capacidade</strong> e <strong>tempo de resposta</strong> são dimensões diferentes.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Latência alta:</strong> a primeira resposta demora, mesmo que depois os dados possam fluir bem.</li>\n    <li><strong>Largura de banda insuficiente:</strong> há pouca capacidade para muitos fluxos simultâneos.</li>\n    <li><strong>Throughput baixo:</strong> a taxa útil observada é menor do que a capacidade esperada.</li>\n    <li><strong>Perda:</strong> pacotes somem e precisam ser retransmitidos ou a aplicação sofre degradação.</li>\n    <li><strong>Jitter:</strong> a latência varia muito, prejudicando voz, vídeo, jogos e tempo real.</li>\n    <li><strong>Fila:</strong> dispositivos acumulam pacotes quando recebem mais do que conseguem encaminhar.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Erro comum:</strong> comprar mais banda para resolver todo problema de lentidão. Mais capacidade ajuda quando o gargalo é saturação, mas não resolve distância física, rota ruim, perda, DNS lento, aplicação pesada, proxy sobrecarregado, banco de dados lento ou autenticação mal desenhada.\n  </div>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    A forma de medir desempenho evoluiu junto com as redes. Primeiro, bastava saber se havia link e qual era a taxa nominal. Depois, ficou claro que taxa nominal não bastava: protocolos adicionavam overhead, meios compartilhados criavam disputa e erros exigiam retransmissão. Com WANs e internet, medição de latência e perda passou a ser essencial. Com cloud, microserviços e DevSecOps, a medição ponta a ponta se tornou parte de operação e observabilidade.\n  </p>\n  <p>\n    Hoje, uma investigação profissional costuma combinar medições de rede e aplicação. Ping ajuda a observar RTT básico. Traceroute mostra caminho aproximado e saltos. MTR combina perda e latência por salto. Curl mostra tempo de DNS, conexão, TLS e resposta HTTP. Iperf mede vazão controlada entre dois pontos. Métricas de APM mostram tempo de aplicação, banco, filas e dependências. Cada ferramenta vê uma parte do problema.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Métrica</th><th>O que mede</th><th>Boa para</th><th>Não prova sozinha</th></tr></thead>\n    <tbody>\n      <tr><td>Latência/RTT</td><td>Tempo de ida e volta</td><td>Resposta e interatividade</td><td>Capacidade total do link</td></tr>\n      <tr><td>Largura de banda</td><td>Capacidade teórica/contratada</td><td>Planejamento de volume</td><td>Taxa útil real</td></tr>\n      <tr><td>Throughput</td><td>Dados úteis por tempo</td><td>Transferências reais</td><td>Latência percebida</td></tr>\n      <tr><td>Jitter</td><td>Variação da latência</td><td>Voz, vídeo e tempo real</td><td>Volume total transferido</td></tr>\n      <tr><td>Perda</td><td>Pacotes não entregues</td><td>Qualidade do caminho</td><td>Causa exata sem correlação</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> latência é o tempo que um dado leva para ir de um ponto a outro, geralmente observado como RTT, ou tempo de ida e volta. Largura de banda é a capacidade máxima teórica ou contratada de transmissão em um caminho. Throughput é a taxa real de dados úteis entregue em um período.\n  </div>\n  <p>\n    A diferença é simples, mas profunda. <strong>Largura de banda</strong> responde “quanto caberia por segundo?”. <strong>Throughput</strong> responde “quanto realmente passou por segundo?”. <strong>Latência</strong> responde “quanto tempo demorou para obter resposta?”. Em redes reais, essas respostas raramente são iguais.\n  </p>\n  <p>\n    Um link de 1 Gbps não garante que uma aplicação terá resposta instantânea. Ele diz que, em condições ideais e na camada correta, existe capacidade para transmitir até determinada quantidade de bits por segundo. Se o servidor está longe, se há proxy, VPN, inspeção, filas, congestionamento ou aplicação lenta, a experiência pode continuar ruim.\n  </p>\n  <p>\n    Também é importante entender <strong>jitter</strong> e <strong>perda</strong>. Jitter é a variação da latência. Para uma chamada de vídeo, latência moderada e estável pode ser melhor do que latência às vezes baixa e às vezes altíssima. Perda é quando pacotes não chegam. Em TCP, perda costuma causar retransmissão e queda de throughput. Em UDP, perda pode aparecer como áudio picotando, vídeo com artefatos ou telemetria incompleta.\n  </p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    Quando uma aplicação envia dados, eles atravessam várias etapas. A aplicação entrega dados ao sistema operacional. O protocolo divide ou organiza esses dados. A pilha de rede encapsula em segmentos, pacotes e quadros. A interface transmite sinais físicos. Cada etapa pode acrescentar tempo, overhead, fila ou erro.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Aplicação gera dados:</strong> uma página, arquivo, requisição API, stream ou backup.</li>\n    <li><strong>Pilha de rede encapsula:</strong> headers de protocolo aumentam o tamanho total transmitido.</li>\n    <li><strong>Interface coloca no meio:</strong> cabo, fibra ou rádio transportam sinais.</li>\n    <li><strong>Dispositivos intermediários encaminham:</strong> switches, roteadores, firewalls, proxies, NAT, VPN e WAF podem processar ou enfileirar.</li>\n    <li><strong>Destino processa:</strong> servidor, aplicação, banco e autenticação adicionam tempo.</li>\n    <li><strong>Resposta volta:</strong> o caminho de retorno também pode ter gargalos diferentes.</li>\n  </ol>\n  <p>\n    Latência aparece quando somamos propagação, transmissão, processamento e fila. A propagação depende da distância e do meio físico. A transmissão depende da taxa do link e do tamanho do dado. O processamento depende dos equipamentos e softwares no caminho. A fila aparece quando um dispositivo recebe mais tráfego do que consegue encaminhar naquele momento.\n  </p>\n  <p>\n    Throughput real é afetado por overhead, janela TCP, perda, controle de congestionamento, qualidade do meio, CPU dos endpoints, criptografia, inspeção, tamanho de arquivo, paralelismo e limites do servidor. Por isso, medir throughput exige contexto. Um download lento pode ser limite do servidor, da rota, do firewall, do Wi‑Fi, do disco, do antivírus, da VPN ou da aplicação.\n  </p>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Em uma arquitetura corporativa, latência, largura de banda e throughput aparecem em vários pontos. O notebook do usuário pode estar em Wi‑Fi congestionado. O switch pode ter uplink saturado. O firewall pode estar com inspeção pesada. A VPN pode passar por uma região distante. A aplicação pode estar em cloud em outra localidade. O banco pode estar em outra zona. O proxy pode estar enfileirando conexões.\n  </p>\n  <ul>\n    <li><strong>Cliente:</strong> Wi‑Fi, CPU, navegador, antivírus, VPN e DNS local influenciam a percepção.</li>\n    <li><strong>LAN:</strong> switches, uplinks, VLANs, filas e erros físicos influenciam throughput e perda.</li>\n    <li><strong>Borda:</strong> firewall, NAT, proxy, WAF, IDS/IPS e inspeção TLS adicionam processamento.</li>\n    <li><strong>WAN/Internet:</strong> rota, distância, peering, congestionamento e perda influenciam RTT.</li>\n    <li><strong>Cloud:</strong> região, zona, load balancer, NAT gateway, private endpoint, service mesh e banco podem adicionar latência.</li>\n    <li><strong>Observabilidade:</strong> métricas de rede e aplicação precisam ser correlacionadas.</li>\n  </ul>\n  <p>\n    O diagnóstico maduro pergunta: onde a métrica piora? No Wi‑Fi? No gateway? No firewall? No provedor? Na VPN? Na aplicação? No banco? Essa pergunta impede conclusões genéricas e ajuda a construir evidência.\n  </p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Imagine transportar caixas entre duas cidades. A <strong>largura de banda</strong> é o tamanho da estrada: quantos caminhões poderiam passar ao mesmo tempo. O <strong>throughput</strong> é quantas caixas realmente chegaram por hora. A <strong>latência</strong> é quanto tempo uma caixa individual leva para sair da origem e chegar ao destino. O <strong>jitter</strong> é a variação desse tempo: às vezes 10 minutos, às vezes 2 horas. A <strong>perda</strong> é quando caixas somem no caminho e precisam ser reenviadas.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> redes não transportam caixas físicas de forma contínua e simples. Protocolos dividem dados, confirmam entrega, retransmitem, controlam congestionamento e podem usar caminhos diferentes. A analogia ajuda a separar conceitos, mas não substitui o funcionamento interno dos protocolos.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Em casa, você tem internet de 500 Mbps. Isso não significa que todo download será de 62,5 MB/s. Primeiro, 500 Mbps equivalem teoricamente a 62,5 MB/s antes de overhead e limitações. Segundo, o servidor de onde você baixa pode limitar a taxa. Terceiro, seu Wi‑Fi pode negociar uma taxa menor. Quarto, outros dispositivos podem consumir o link. Quinto, perda e retransmissões podem reduzir o throughput.\n  </p>\n  <p>\n    Agora pense em jogos online. Um jogo geralmente não precisa de muita largura de banda, mas precisa de baixa latência e jitter baixo. Por isso, uma internet de 1 Gbps com Wi‑Fi instável pode ser pior para jogo do que uma conexão cabeada de menor capacidade, mas estável. Para backup em nuvem, a lógica muda: throughput sustentado e limite de upload importam mais do que latência baixa.\n  </p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, a equipe recebe reclamações de lentidão no ERP. O primeiro impulso é culpar o link. Mas a investigação mostra que usuários na matriz acessam bem, usuários na filial sofrem, e usuários em VPN sofrem ainda mais. O ping para o gateway local é baixo. O ping para o firewall central é moderado. O acesso ao ERP passa por proxy, inspeção TLS e túnel site-to-site. A aplicação conversa com banco em outra rede.\n  </p>\n  <p>\n    Esse cenário exige decompor a experiência: latência filial-matriz, throughput do túnel, perda, fila no firewall, carga no proxy, tempo de resposta HTTP e tempo de banco. Em ambientes corporativos, raramente existe uma única causa. O papel profissional é medir por trecho, comparar horários, coletar evidência e evitar troca aleatória de equipamentos.\n  </p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, a escolha de região influencia latência. Hospedar uma aplicação usada no Brasil em uma região distante pode aumentar o tempo de resposta. Usar VPN site-to-site, NAT Gateway, firewall gerenciado, load balancer, private endpoint, WAF e inspeção adiciona etapas ao caminho. Algumas são necessárias para segurança e governança, mas todas precisam ser consideradas no desenho.\n  </p>\n  <p>\n    Throughput em cloud também tem dimensões financeiras. Tráfego de saída pode gerar custo. NAT gerenciado pode gerar cobrança por hora e por volume. Logs de rede, flow logs e métricas ajudam no diagnóstico, mas também geram armazenamento e custo operacional. Uma arquitetura boa não é apenas rápida; ela é previsível, observável, segura e financeiramente compreendida.\n  </p>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em DevSecOps, latência e throughput aparecem em pipelines e plataformas. Um pipeline pode demorar porque baixa dependências de repositórios externos com latência alta. Um cluster Kubernetes pode ter serviços lentos porque há muitas chamadas entre microserviços, sidecars, service mesh e políticas de rede. Um scan de segurança pode gerar tráfego intenso para registry, artefatos e APIs.\n  </p>\n  <p>\n    Equipes maduras medem esses pontos. Elas observam tempo de DNS, tempo de conexão, tempo de TLS, tempo de resposta HTTP, retries, filas, saturação de egress, limite de registry e latência entre serviços. Isso conecta redes com SRE, observabilidade, CI/CD, IaC e segurança. O pipeline não é “só código”: ele depende de rede, autenticação, APIs, armazenamento e disponibilidade.\n  </p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Para Segurança, métricas de rede ajudam a detectar abuso e impacto. Um host comprometido pode gerar throughput de saída incomum. Um ataque de negação de serviço pode elevar perda e latência. Um túnel não autorizado pode aparecer como tráfego constante para destino incomum. Um proxy ou firewall sobrecarregado pode se tornar gargalo e gerar indisponibilidade.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Exfiltração</td><td>Aumento de upload para destino incomum</td><td>Vazamento de dados</td><td>Monitoramento de egress, DLP, proxy, alertas e classificação de dados</td></tr>\n      <tr><td>DDoS/DoS</td><td>Perda, filas, saturação e latência alta</td><td>Indisponibilidade</td><td>Rate limit, proteção DDoS, autoscaling e filtragem</td></tr>\n      <tr><td>Proxy/firewall saturado</td><td>Tempo de resposta piora em horários de pico</td><td>Degradação geral</td><td>Capacity planning, métricas, HA e ajuste de inspeção</td></tr>\n      <tr><td>VPN mal dimensionada</td><td>Throughput baixo e RTT alto para usuários remotos</td><td>Produtividade baixa</td><td>Split tunneling controlado, ZTNA, regiões próximas e monitoramento</td></tr>\n    </tbody>\n  </table>\n  <div class=\"callout callout--security\">\n    <strong>Limite ético:</strong> medir desempenho em rede própria ou autorizada é atividade defensiva. Não faça testes de carga, saturação, varredura agressiva ou simulação de negação de serviço em redes de terceiros ou ambientes corporativos sem autorização formal.\n  </div>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l06-title m00l06-desc\">\n    <title id=\"m00l06-title\">Latência, largura de banda e throughput em um caminho de rede</title>\n    <desc id=\"m00l06-desc\">O diagrama mostra um cliente acessando uma aplicação cloud através de Wi-Fi, firewall, internet e load balancer, destacando latência, largura de banda, throughput, perda e filas.</desc>\n    <defs>\n      <marker id=\"m00l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"95\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"95\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi/cabo</text>\n    <rect x=\"210\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"275\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"275\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fila/inspeção</text>\n    <rect x=\"405\" y=\"150\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"480\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Internet/WAN</text>\n    <text x=\"480\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RTT + perda</text>\n    <rect x=\"625\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"690\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Load balancer</text>\n    <text x=\"690\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cloud</text>\n    <rect x=\"820\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"885\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"885\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">resposta</text>\n    <line x1=\"160\" y1=\"185\" x2=\"210\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <line x1=\"340\" y1=\"185\" x2=\"405\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <line x1=\"555\" y1=\"185\" x2=\"625\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <line x1=\"755\" y1=\"185\" x2=\"820\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <path d=\"M885 235 C700 330 310 330 95 235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <rect x=\"70\" y=\"50\" width=\"250\" height=\"58\" rx=\"10\" class=\"svg-zone\" />\n    <text x=\"195\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Largura de banda</text>\n    <text x=\"195\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">capacidade máxima do trecho</text>\n    <rect x=\"365\" y=\"50\" width=\"250\" height=\"58\" rx=\"10\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Latência / RTT</text>\n    <text x=\"490\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tempo de ida e volta</text>\n    <rect x=\"660\" y=\"50\" width=\"250\" height=\"58\" rx=\"10\" class=\"svg-zone\" />\n    <text x=\"785\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Throughput</text>\n    <text x=\"785\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dados úteis entregues</text>\n    <text x=\"275\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fila aumenta latência</text>\n    <text x=\"480\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">perda reduz throughput</text>\n    <text x=\"690\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">processamento adiciona tempo</text>\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>\n    O laboratório desta aula é local e seguro. O objetivo não é fazer teste de carga, mas observar evidências básicas de latência, caminho, tempo de resposta HTTP e diferença entre métricas. Você usará comandos comuns de Windows ou Linux e registrará resultados para comparar hipóteses.\n  </p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios reforçam interpretação. O foco não é decorar fórmulas, mas escolher a métrica certa para cada sintoma e evitar conclusões precipitadas.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula uma reclamação real de lentidão em filial, VPN e aplicação cloud. Você deverá montar um plano de diagnóstico por camadas e por métricas.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra como separar sintomas, coletar evidências e evitar a resposta simplista “precisa de mais internet”.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> rede lenta pode ser latência, banda, throughput, perda, jitter, fila, aplicação ou combinação de fatores.</li>\n    <li><strong>O que lembrar:</strong> largura de banda é capacidade; throughput é entrega real; latência é tempo de resposta.</li>\n    <li><strong>Erro comum:</strong> tentar resolver tudo comprando mais link.</li>\n    <li><strong>Uso real:</strong> diagnóstico de VPN, Wi‑Fi, cloud, APIs, backup, chamadas de vídeo, SIEM e incidentes.</li>\n    <li><strong>Segurança:</strong> anomalias de vazão e degradação podem indicar abuso, exfiltração, DoS ou gargalo de controle.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    A próxima aula será <strong>0.7 — O que é um protocolo</strong>. Depois de entender informação, codificação, sinais e métricas de desempenho, o próximo passo é entender como sistemas combinam regras para conversar de maneira previsível: formato, ordem, estados, mensagens, erros e expectativas.\n  </p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede",
      "Camada 4 - Transporte",
      "Camada 7 - Aplicação"
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
      "TLS",
      "VPN",
      "QUIC"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "taxa de transmissão",
      "sinais físicos",
      "overhead"
    ],
    "enables": [
      "troubleshooting profissional",
      "capacity planning",
      "observabilidade",
      "SRE",
      "diagnóstico de cloud networking",
      "segurança de tráfego"
    ]
  },
  "deepDive": {
    "mentalModel": "Lentidão é um sintoma composto. Para diagnosticar, separe tempo de resposta, capacidade, entrega real, perda, variação e filas. Depois descubra em qual trecho do caminho a métrica se degrada.",
    "keyTerms": [
      "latência",
      "RTT",
      "largura de banda",
      "throughput",
      "jitter",
      "perda",
      "fila",
      "bufferbloat",
      "overhead",
      "congestionamento",
      "saturação",
      "baseline"
    ],
    "limitations": [
      "Ping pode ser bloqueado, priorizado ou tratado diferente de tráfego real de aplicação.",
      "Traceroute mostra caminho aproximado, mas nem sempre revela todos os dispositivos ou políticas.",
      "Teste de velocidade mede um cenário específico e não prova que a aplicação corporativa está saudável.",
      "Throughput medido entre dois pontos não explica sozinho se o gargalo é rede, servidor, disco, CPU, proxy ou aplicação.",
      "Métricas de cloud podem ter amostragem, atraso ou custo adicional de armazenamento."
    ],
    "whenToUse": [
      "Ao investigar lentidão, chamadas ruins, VPN lenta, backup demorado, API com timeout ou aplicação cloud distante.",
      "Ao planejar capacidade de links, firewall, proxy, VPN, NAT, Wi‑Fi e egress cloud.",
      "Ao criar baselines de desempenho antes de mudanças de rede ou aplicação.",
      "Ao correlacionar alertas de segurança com volume de tráfego, perda e saturação."
    ],
    "whenNotToUse": [
      "Não use apenas ping para declarar uma aplicação saudável.",
      "Não use teste de velocidade doméstico como prova definitiva em ambiente corporativo.",
      "Não execute testes de saturação em rede produtiva sem autorização e janela de mudança.",
      "Não confunda latência de rede com tempo de processamento do servidor sem medir as duas coisas."
    ],
    "operationalImpact": [
      "Exige baseline para saber o que é normal por localidade, horário e aplicação.",
      "Melhora troubleshooting ao reduzir disputas entre rede, segurança, infraestrutura e desenvolvimento.",
      "Pode exigir ferramentas como flow logs, APM, métricas de firewall, NetFlow, iperf controlado e monitoramento sintético.",
      "Aumenta a necessidade de documentação de caminhos críticos e dependências."
    ],
    "financialImpact": [
      "Mais banda pode custar caro e não resolver latência ou aplicação lenta.",
      "Em cloud, tráfego de saída, NAT, firewalls gerenciados, observabilidade e logs podem gerar custo recorrente.",
      "Redundância, links dedicados e regiões próximas melhoram previsibilidade, mas aumentam custo.",
      "Diagnóstico ruim leva a compra desnecessária de link, appliance ou licenças."
    ],
    "securityImpact": [
      "Aumento de throughput de saída pode indicar exfiltração ou backup não autorizado.",
      "Saturação e perda podem indicar DoS, varreduras, loops, broadcast excessivo ou equipamento sobrecarregado.",
      "Controles de segurança adicionam processamento e precisam ser dimensionados.",
      "Logs de rede ajudam detecção, mas precisam de retenção, custo e privacidade bem tratados."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Chamar tudo de velocidade.",
      "whyItHappens": "Na linguagem comum, qualquer demora vira 'internet lenta'.",
      "consequence": "Diagnóstico fica genérico e leva a ações erradas.",
      "correction": "Separe latência, largura de banda, throughput, perda, jitter e tempo de aplicação."
    },
    {
      "mistake": "Comprar mais link sem medir saturação.",
      "whyItHappens": "Banda é a métrica mais visível em contratos de internet.",
      "consequence": "Custo aumenta e o problema pode continuar.",
      "correction": "Verifique utilização, RTT, perda, fila, rota, proxy, VPN e aplicação antes de aumentar capacidade."
    },
    {
      "mistake": "Concluir que ping baixo significa aplicação rápida.",
      "whyItHappens": "Ping é simples e retorna número fácil de entender.",
      "consequence": "Problemas de TLS, HTTP, banco ou autenticação passam despercebidos.",
      "correction": "Combine ping com curl, métricas HTTP, logs de aplicação e observabilidade."
    },
    {
      "mistake": "Ignorar jitter em voz e vídeo.",
      "whyItHappens": "A média da latência parece aceitável.",
      "consequence": "Chamadas engasgam mesmo com RTT médio razoável.",
      "correction": "Observe variação, perda, Wi‑Fi, filas e QoS quando houver tráfego em tempo real."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Página demora para começar a carregar",
      "Download abaixo do esperado",
      "Chamada de vídeo engasgando",
      "VPN lenta",
      "API com timeout",
      "Backup demorando",
      "Perda de pacotes",
      "Jitter alto",
      "Fila ou saturação em firewall/proxy"
    ],
    "diagnosticQuestions": [
      "O problema é tempo para começar a responder ou taxa durante a transferência?",
      "Acontece com todos os destinos ou apenas uma aplicação?",
      "Acontece em cabo e Wi‑Fi? Em matriz e filial? Com e sem VPN?",
      "Há perda ou apenas latência alta?",
      "O link está saturado no horário do problema?",
      "O proxy, firewall, VPN ou WAF tem CPU/fila alta?",
      "O tempo de aplicação, banco ou autenticação foi medido?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ping 8.8.8.8 -n 10\ntracert 8.8.8.8\nTest-NetConnection exemplo.com -Port 443",
        "purpose": "Observar RTT básico, caminho e conectividade TCP para porta específica.",
        "expectedObservation": "RTT estável, rota sem saltos anormalmente lentos e TCP bem-sucedido quando permitido.",
        "interpretation": "Ping bom não prova aplicação saudável, mas ajuda a separar conectividade básica de camadas superiores."
      },
      {
        "platform": "Linux",
        "command": "ping -c 10 8.8.8.8\ntraceroute 8.8.8.8\ncurl -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' -o /dev/null -s https://example.com",
        "purpose": "Medir RTT, caminho e tempos de DNS, conexão, TLS, primeira resposta e total HTTP.",
        "expectedObservation": "Tempos coerentes com o destino e sem perda recorrente.",
        "interpretation": "Se curl mostra DNS/TLS/TTFB alto, a lentidão pode estar acima da camada de rede básica."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces\nshow processes cpu sorted\nshow policy-map interface\nshow ip route",
        "purpose": "Ver erros de interface, CPU, filas/políticas e caminho de roteamento.",
        "expectedObservation": "Baixo erro físico, CPU saudável, filas sem drops inesperados e rota coerente.",
        "interpretation": "Erros, drops e CPU alta podem explicar perda, latência e throughput ruim."
      }
    ],
    "decisionTree": [
      {
        "if": "Ping para gateway local está alto ou com perda",
        "then": "Investigar Wi‑Fi, cabo, switch local, saturação local ou dispositivo do usuário."
      },
      {
        "if": "Gateway local está bom, mas destino remoto tem RTT alto",
        "then": "Investigar WAN, VPN, rota, região cloud, provedor ou firewall de borda."
      },
      {
        "if": "RTT está bom, mas download é baixo",
        "then": "Investigar throughput, servidor, TCP, perda, Wi‑Fi, proxy, firewall, disco ou limite de aplicação."
      },
      {
        "if": "Média de RTT está aceitável, mas voz/vídeo falha",
        "then": "Investigar jitter, perda, filas, Wi‑Fi, QoS e congestionamento."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter baseline de tráfego normal por aplicação, localidade e horário.",
      "Monitorar egress, perda, latência, saturação e erros de interface.",
      "Dimensionar firewalls, proxies, VPNs e WAFs considerando throughput com inspeção ativa.",
      "Correlacionar métricas de rede com logs de autenticação, proxy, DNS, EDR e aplicação.",
      "Definir limites éticos e autorização para testes de carga e performance."
    ],
    "badPractices": [
      "Executar teste de saturação em produção sem autorização.",
      "Ignorar anomalias de upload porque o link ainda não caiu.",
      "Usar apenas média de latência e ignorar jitter e perda.",
      "Desativar inspeção de segurança para ganhar performance sem análise de risco.",
      "Não registrar métricas antes de mudanças importantes."
    ],
    "commonErrors": [
      "Confundir conectividade com boa experiência.",
      "Achar que NAT, firewall ou proxy são invisíveis para performance.",
      "Não separar tempo de rede e tempo de aplicação.",
      "Não avaliar custo de logs e métricas em cloud."
    ],
    "vulnerabilities": [
      {
        "name": "Exfiltração de dados por egress não monitorado",
        "description": "Quando saídas de dados não são monitoradas, grandes volumes podem sair sem alerta.",
        "defensiveExplanation": "A métrica de throughput de saída, combinada com destino, identidade e horário, ajuda a identificar comportamento anormal.",
        "mitigation": "Monitorar egress, aplicar DLP, restringir destinos, usar proxy, alertas e classificação de dados."
      },
      {
        "name": "Indisponibilidade por saturação de controle de segurança",
        "description": "Firewall, proxy, VPN ou WAF abaixo da capacidade podem virar gargalo.",
        "defensiveExplanation": "A segurança precisa ser dimensionada para tráfego real com inspeção ativa, não apenas taxa nominal de appliance.",
        "mitigation": "Capacity planning, HA, métricas de fila, autoscaling quando aplicável e testes autorizados."
      },
      {
        "name": "DoS operacional acidental",
        "description": "Backups, scans ou pipelines podem saturar links e afetar usuários.",
        "defensiveExplanation": "Nem todo DoS é malicioso; automações mal planejadas também degradam disponibilidade.",
        "mitigation": "Janelas de execução, rate limit, QoS, segmentação e observabilidade."
      }
    ],
    "monitoring": [
      "NetFlow/flow logs",
      "Métricas de firewall e proxy",
      "RTT sintético",
      "Tempo HTTP",
      "Saturação de link",
      "Drops de fila",
      "Egress por destino",
      "Alertas de perda e jitter"
    ],
    "hardening": [
      "Rate limit defensivo",
      "QoS para tráfego crítico",
      "Segmentação",
      "Controle de egress",
      "Dimensionamento de appliances",
      "Redundância",
      "Rotas e regiões bem planejadas"
    ],
    "detectionIdeas": [
      "Upload incomum fora do horário",
      "Aumento de RTT após mudança de rota",
      "Drops em fila de firewall",
      "Jitter em VLAN de voz",
      "Tráfego de backup durante horário comercial",
      "Timeouts HTTP correlacionados com CPU alta em proxy"
    ]
  },
  "lab": {
    "id": "lab-0.6",
    "title": "Separando latência, caminho e tempo de resposta HTTP",
    "labType": "cloud",
    "objective": "Coletar evidências simples para diferenciar RTT, caminho de rede e tempo de resposta de aplicação.",
    "scenario": "Você recebeu uma reclamação genérica de lentidão e precisa transformar a reclamação em hipóteses mensuráveis usando comandos locais.",
    "topology": "Seu computador -> rede local -> gateway -> internet -> destino público de teste",
    "architecture": "Laboratório local sem teste de carga, usando pacotes pequenos e requisições HTTP comuns para observar tempo de rede e tempo de aplicação.",
    "prerequisites": [
      "Ter acesso a um terminal Windows PowerShell ou Linux",
      "Ter conectividade à internet",
      "Ter autorização para executar comandos no próprio computador"
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "ping",
      "tracert/traceroute",
      "Test-NetConnection ou curl",
      "Opcional: mtr se disponível"
    ],
    "estimatedTimeMinutes": 105,
    "cost": "zero",
    "safetyNotes": [
      "Não execute testes de carga.",
      "Não use iperf contra servidores públicos sem autorização.",
      "Não aumente volume de pacotes para tentar saturar links.",
      "Use apenas medições leves e destinos permitidos.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Medir RTT básico",
        "instruction": "Execute ping com poucos pacotes para um destino conhecido e registre mínimo, média, máximo e perda.",
        "command": "Windows: ping 8.8.8.8 -n 10\nLinux: ping -c 10 8.8.8.8",
        "expectedOutput": "Lista de respostas com tempo em ms e estatísticas finais de perda e média.",
        "explanation": "O ping mede RTT ICMP básico. Ele não prova desempenho de aplicação, mas ajuda a observar conectividade, perda e variação inicial."
      },
      {
        "number": 2,
        "title": "Comparar destino por nome",
        "instruction": "Repita o teste para um domínio e observe se há diferença relevante.",
        "command": "Windows: ping example.com -n 10\nLinux: ping -c 10 example.com",
        "expectedOutput": "Resolução de nome e respostas, se ICMP for permitido pelo destino.",
        "explanation": "Se o nome não resolve, a hipótese pode envolver DNS. Se resolve mas não responde ICMP, isso não significa que HTTP está indisponível."
      },
      {
        "number": 3,
        "title": "Observar caminho aproximado",
        "instruction": "Execute traceroute/tracert para ver saltos até o destino.",
        "command": "Windows: tracert example.com\nLinux: traceroute example.com",
        "expectedOutput": "Lista de saltos com tempos ou asteriscos em alguns pontos.",
        "explanation": "Asteriscos podem significar bloqueio ou baixa prioridade para ICMP/TTL excedido. Não conclua perda real de aplicação apenas por isso."
      },
      {
        "number": 4,
        "title": "Medir tempo HTTP no Linux ou equivalente",
        "instruction": "No Linux, use curl para separar DNS, conexão, TLS, primeira resposta e total. No Windows sem curl adequado, use Test-NetConnection para porta 443 e registre resultado.",
        "command": "Linux/macOS/Windows com curl: curl -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' -o /dev/null -s https://example.com\nPowerShell: Test-NetConnection example.com -Port 443",
        "expectedOutput": "Tempos de DNS, conexão, TLS, início da transferência e total; ou sucesso TCP na porta 443.",
        "explanation": "HTTP pode estar lento mesmo com ping bom. Esse passo mostra que aplicação, TLS e servidor também contam."
      },
      {
        "number": 5,
        "title": "Registrar interpretação",
        "instruction": "Crie uma tabela simples com métrica, resultado e hipótese.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela com RTT, perda, caminho, conectividade TCP/HTTP e interpretação.",
        "explanation": "Troubleshooting profissional depende de evidência organizada, não apenas de comandos soltos."
      }
    ],
    "expectedResult": "O aluno deve produzir uma pequena tabela separando latência básica, caminho aproximado, conectividade TCP/HTTP e hipóteses sem concluir além das evidências.",
    "validation": [
      {
        "check": "RTT foi medido",
        "command": "ping 8.8.8.8 -n 10 ou ping -c 10 8.8.8.8",
        "expected": "Tempos em ms e estatísticas finais.",
        "ifFails": "Verifique conectividade local, DNS não é necessário para IP direto, e confirme se ICMP não está bloqueado."
      },
      {
        "check": "Caminho foi observado",
        "command": "tracert example.com ou traceroute example.com",
        "expected": "Lista de saltos ou alguns asteriscos.",
        "ifFails": "Instale traceroute no Linux se necessário ou use ferramenta equivalente."
      },
      {
        "check": "Tempo HTTP ou TCP foi observado",
        "command": "curl -w ... https://example.com ou Test-NetConnection example.com -Port 443",
        "expected": "Tempos HTTP ou teste TCP bem-sucedido.",
        "ifFails": "Verifique proxy, firewall local, DNS e suporte a TLS/porta 443."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Ping para IP funciona, mas domínio não resolve",
        "probableCause": "Problema de DNS",
        "howToConfirm": "Teste nslookup ou Resolve-DnsName",
        "fix": "Validar servidor DNS, conectividade com DNS e configuração do cliente."
      },
      {
        "symptom": "Ping tem perda, mas Wi‑Fi está fraco",
        "probableCause": "Sinal/interferência ou meio instável",
        "howToConfirm": "Comparar com cabo ou aproximar do AP",
        "fix": "Melhorar sinal, canal, posição, cabo ou infraestrutura."
      },
      {
        "symptom": "Ping bom, curl mostra tempo alto até primeira resposta",
        "probableCause": "Servidor, aplicação, TLS, proxy ou backend lento",
        "howToConfirm": "Comparar outros destinos e verificar logs/métricas do serviço",
        "fix": "Investigar aplicação, proxy, WAF, load balancer e backend."
      },
      {
        "symptom": "Traceroute tem asteriscos",
        "probableCause": "ICMP/TTL bloqueado ou despriorizado",
        "howToConfirm": "Testar HTTP/TCP e não concluir indisponibilidade apenas por asteriscos",
        "fix": "Usar ferramenta adequada e interpretar com cautela."
      }
    ],
    "improvements": [
      "Executar o mesmo teste em cabo e Wi‑Fi e comparar.",
      "Executar em horários diferentes e criar baseline.",
      "Adicionar medição com mtr quando disponível.",
      "Comparar destino próximo e destino em outro continente.",
      "Correlacionar com uso de CPU, VPN ou proxy."
    ],
    "evidenceToCollect": [
      "Saída do ping",
      "Saída do traceroute/tracert",
      "Resultado do curl ou Test-NetConnection",
      "Tabela de hipóteses",
      "Condição do acesso: cabo, Wi‑Fi, VPN ou rede corporativa"
    ],
    "questions": [
      "O que o ping mede e o que ele não mede?",
      "Por que ping bom não garante aplicação rápida?",
      "Quando comprar mais banda ajudaria?",
      "Quando comprar mais banda não ajudaria?",
      "Como perda afeta TCP e UDP de formas diferentes?"
    ],
    "challenge": "Compare dois cenários: uma API próxima com link limitado e uma API distante com link amplo. Explique qual pode responder mais rápido e qual pode transferir maior volume.",
    "solution": "A API próxima tende a ter menor latência inicial. A API distante pode ter maior capacidade de transferência se o caminho permitir, mas sofrerá maior RTT. A experiência depende do padrão da aplicação: muitas requisições pequenas sofrem mais com latência; grandes transferências sustentadas dependem mais de throughput."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que 'rede lenta' não é diagnóstico suficiente?",
      "hints": [
        "Pense em latência, capacidade e entrega real.",
        "Pense em sintomas diferentes: página, download, vídeo e API."
      ],
      "expectedIdeas": [
        "latência",
        "throughput",
        "largura de banda",
        "perda",
        "jitter",
        "aplicação"
      ],
      "explanation": "O aluno deve mostrar que sabe decompor a reclamação em métricas mensuráveis."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário tem ping baixo para o gateway, mas a aplicação cloud demora para responder. O que você verificaria depois?",
      "hints": [
        "O gateway local não é o destino final.",
        "Pense em DNS, rota, VPN, TLS, proxy e tempo HTTP."
      ],
      "expectedIdeas": [
        "traceroute",
        "curl",
        "DNS",
        "VPN",
        "proxy",
        "região cloud",
        "tempo de aplicação"
      ],
      "explanation": "O gateway local saudável só elimina parte do caminho. A investigação precisa seguir para os próximos trechos."
    },
    {
      "type": "cenário real",
      "question": "Um backup noturno demora demais, mas usuários não reclamam de navegação. Qual métrica provavelmente importa mais?",
      "hints": [
        "Backup transfere volume grande.",
        "Navegação costuma depender de resposta e múltiplas requisições."
      ],
      "expectedIdeas": [
        "throughput sustentado",
        "upload",
        "janela de backup",
        "limite do destino",
        "saturação"
      ],
      "explanation": "Backups dependem mais de vazão sustentada e capacidade de upload do que de latência baixa isolada."
    }
  ],
  "quiz": [
    {
      "id": "q0.6.1",
      "type": "conceito",
      "q": "Qual alternativa melhor define latência?",
      "opts": [
        "Tempo para um dado ir e voltar ou chegar ao destino",
        "Capacidade máxima contratada do link",
        "Quantidade de dados úteis entregue por segundo",
        "Quantidade de bytes em um arquivo"
      ],
      "a": 0,
      "exp": "Latência é tempo de resposta. Em muitos testes aparece como RTT, tempo de ida e volta.",
      "difficulty": "iniciante",
      "topic": "latência"
    },
    {
      "id": "q0.6.2",
      "type": "comparação",
      "q": "Qual diferença principal entre largura de banda e throughput?",
      "opts": [
        "Largura de banda é capacidade; throughput é entrega real",
        "Ambas são sempre iguais",
        "Throughput é sempre maior que largura de banda",
        "Largura de banda mede tempo de resposta"
      ],
      "a": 0,
      "exp": "A capacidade nominal pode ser maior que a taxa útil observada por overhead, perda, congestionamento e limites dos sistemas.",
      "difficulty": "iniciante",
      "topic": "throughput"
    },
    {
      "id": "q0.6.3",
      "type": "cenário",
      "q": "Uma chamada de vídeo engasga mesmo com link de alta capacidade. Qual métrica costuma ser especialmente importante?",
      "opts": [
        "Jitter e perda",
        "Tamanho do monitor",
        "Quantidade de arquivos no disco",
        "Número de caracteres ASCII"
      ],
      "a": 0,
      "exp": "Voz e vídeo em tempo real sofrem com variação de latência e perda, mesmo quando há banda nominal suficiente.",
      "difficulty": "iniciante",
      "topic": "jitter"
    },
    {
      "id": "q0.6.4",
      "type": "diagnóstico",
      "q": "Ping para o gateway local é baixo, mas uma API externa demora. O que isso indica?",
      "opts": [
        "A rede local até o gateway parece boa, mas o problema pode estar em outro trecho ou na aplicação",
        "O problema está resolvido",
        "DNS sempre está correto",
        "A largura de banda é infinita"
      ],
      "a": 0,
      "exp": "Ping para gateway avalia só o primeiro trecho. A lentidão pode estar em WAN, DNS, TLS, proxy, servidor, banco ou aplicação.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q0.6.5",
      "type": "segurança",
      "q": "Aumento incomum de throughput de saída para destino externo pode indicar qual risco?",
      "opts": [
        "Possível exfiltração ou transferência não autorizada",
        "Teclado com defeito",
        "Apenas latência baixa",
        "Unicode mal configurado"
      ],
      "a": 0,
      "exp": "Vazão de saída incomum, combinada com destino e contexto, pode ser sinal de exfiltração ou automação indevida.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q0.6.6",
      "type": "pegadinha",
      "q": "Qual afirmação é mais correta?",
      "opts": [
        "Mais banda nem sempre reduz latência",
        "Mais banda sempre reduz RTT para qualquer destino",
        "Ping baixo prova que HTTP está rápido",
        "Traceroute sem asteriscos prova ausência de gargalos"
      ],
      "a": 0,
      "exp": "Mais capacidade pode ajudar em saturação, mas não elimina distância, processamento, perda, filas ou lentidão de aplicação.",
      "difficulty": "intermediário",
      "topic": "boas práticas"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.6.1",
      "front": "O que é latência?",
      "back": "É o tempo de resposta entre origem e destino; muitas vezes observado como RTT, tempo de ida e volta.",
      "tags": [
        "latência"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.6.2",
      "front": "O que é largura de banda?",
      "back": "É a capacidade teórica ou contratada de transmissão de um caminho, normalmente expressa em bps, Mbps ou Gbps.",
      "tags": [
        "largura de banda"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.6.3",
      "front": "O que é throughput?",
      "back": "É a taxa real de dados úteis entregue em determinado período.",
      "tags": [
        "throughput"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.6.4",
      "front": "Por que ping bom não garante aplicação rápida?",
      "back": "Porque HTTP, TLS, proxy, servidor, banco, autenticação e aplicação podem adicionar tempo mesmo com conectividade básica boa.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.6.5",
      "front": "O que é jitter?",
      "back": "É a variação da latência ao longo do tempo, importante para voz, vídeo e tráfego em tempo real.",
      "tags": [
        "jitter"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.6.6",
      "front": "Quando mais banda ajuda?",
      "back": "Ajuda quando o gargalo é capacidade ou saturação, mas não resolve automaticamente distância, perda, fila, proxy ou aplicação lenta.",
      "tags": [
        "capacity planning"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.6.1",
      "type": "conceitual",
      "prompt": "Explique, com suas palavras, a diferença entre largura de banda e throughput.",
      "expectedAnswer": "Largura de banda é a capacidade máxima teórica ou contratada; throughput é quanto de dado útil realmente passa em determinado período.",
      "explanation": "Essa diferença evita confundir plano contratado com desempenho real."
    },
    {
      "id": "ex0.6.2",
      "type": "diagnóstico",
      "prompt": "Uma VPN tem ping médio de 180 ms, mas downloads grandes atingem boa taxa. Qual métrica está ruim e qual parece aceitável?",
      "expectedAnswer": "A latência está alta; o throughput para transferências grandes parece aceitável.",
      "explanation": "Alta latência prejudica interatividade, mas não impede necessariamente boa vazão sustentada."
    },
    {
      "id": "ex0.6.3",
      "type": "cenário",
      "prompt": "Uma chamada de voz falha em horários de pico, mas speedtest mostra alta taxa. Liste três hipóteses.",
      "expectedAnswer": "Jitter, perda, filas/congestionamento, Wi‑Fi instável, QoS ausente ou proxy/VPN sobrecarregado.",
      "explanation": "Voz e vídeo dependem de estabilidade, não só de banda nominal."
    },
    {
      "id": "ex0.6.4",
      "type": "segurança",
      "prompt": "Como uma anomalia de throughput pode ajudar em investigação de segurança?",
      "expectedAnswer": "Throughput de saída incomum pode indicar exfiltração, backup indevido, malware, túnel não autorizado ou automação mal planejada.",
      "explanation": "Métricas de volume e destino são evidências úteis quando correlacionadas com identidade, horário e logs."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de lentidão em filial com aplicação cloud",
    "scenario": "Uma filial reclama que o sistema de chamados em cloud está lento. Usuários dizem que a internet é de 500 Mbps, então 'não deveria travar'. A matriz acessa melhor. Usuários em VPN têm pior experiência. Chamadas de vídeo também falham em horários de pico.",
    "tasks": [
      "Separar o problema em hipóteses de latência, throughput, perda, jitter e aplicação.",
      "Definir pelo menos cinco medições que você faria.",
      "Indicar quais evidências coletaria no cliente, firewall/VPN e cloud.",
      "Explicar quando comprar mais banda ajudaria e quando não ajudaria.",
      "Listar dois riscos de segurança que poderiam aparecer nas métricas."
    ],
    "constraints": [
      "Não propor teste de carga sem autorização.",
      "Não concluir que o problema é DNS, firewall ou link sem evidência.",
      "Considerar Wi‑Fi, VPN, proxy, região cloud, aplicação e horários de pico."
    ],
    "expectedDeliverables": [
      "Tabela de hipóteses",
      "Plano de medição",
      "Lista de comandos",
      "Critérios de interpretação",
      "Recomendações defensivas"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta das métricas",
        "points": 25,
        "description": "Diferencia latência, throughput, largura de banda, jitter e perda."
      },
      {
        "criterion": "Plano de coleta de evidências",
        "points": 25,
        "description": "Inclui medições no cliente, caminho, VPN/firewall e aplicação."
      },
      {
        "criterion": "Interpretação sem salto lógico",
        "points": 20,
        "description": "Evita culpar um componente sem evidência."
      },
      {
        "criterion": "Relação com segurança e operação",
        "points": 15,
        "description": "Inclui egress, DoS, saturação e dimensionamento."
      },
      {
        "criterion": "Clareza dos entregáveis",
        "points": 15,
        "description": "Apresenta tabela e recomendações compreensíveis."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O primeiro passo é transformar a reclamação genérica em métricas. A filial pode sofrer com Wi‑Fi, link de saída, VPN, proxy ou rota até a cloud. Usuários em VPN piorarem sugere caminho adicional, criptografia, concentração de túnel ou região distante. Chamadas de vídeo falhando em pico sugerem jitter, perda ou filas. A internet de 500 Mbps não elimina essas hipóteses.",
    "steps": [
      "Medir RTT e perda para gateway, firewall/VPN e destino cloud.",
      "Comparar cabo e Wi‑Fi.",
      "Medir tempo HTTP com curl ou ferramenta de APM.",
      "Verificar utilização, drops, CPU e filas em firewall/VPN/proxy.",
      "Comparar horários normais e pico.",
      "Analisar egress e destinos incomuns por segurança.",
      "Correlacionar logs de aplicação e banco."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Comprar link maior imediatamente.",
        "whyItIsWrong": "Sem medir saturação, mais banda pode não reduzir latência, jitter, perda ou tempo de aplicação."
      },
      {
        "answer": "Culpar DNS porque tudo lento é DNS.",
        "whyItIsWrong": "DNS pode ser causa, mas precisa ser medido; chamadas de vídeo e VPN ruim podem apontar para jitter, perda ou fila."
      },
      {
        "answer": "Desativar inspeção de segurança para melhorar performance.",
        "whyItIsWrong": "Isso pode reduzir proteção sem provar que a inspeção é o gargalo. Deve-se medir e dimensionar."
      }
    ],
    "finalAnswer": "Um bom diagnóstico separa métricas e trechos: cliente/Wi‑Fi, LAN, firewall/VPN/proxy, WAN, cloud e aplicação. Mais banda só é recomendada se houver evidência de saturação. Se houver RTT alto, perda, jitter ou tempo de aplicação elevado, a solução pode envolver rota, região, VPN, QoS, Wi‑Fi, dimensionamento de segurança, otimização de aplicação ou arquitetura."
  },
  "glossary": [
    {
      "term": "Latência",
      "shortDefinition": "Tempo de resposta entre origem e destino.",
      "longDefinition": "Tempo que um dado leva para atravessar o caminho, muitas vezes medido como RTT, ida e volta.",
      "example": "Um ping de 30 ms tem menor latência que um ping de 180 ms.",
      "relatedTerms": [
        "RTT",
        "jitter",
        "perda"
      ],
      "relatedLessons": [
        "0.6",
        "6.1",
        "15.1"
      ]
    },
    {
      "term": "Largura de banda",
      "shortDefinition": "Capacidade máxima teórica ou contratada de transmissão.",
      "longDefinition": "Quantidade máxima de bits por segundo que um link ou caminho poderia transportar em condições específicas.",
      "example": "Um link de 1 Gbps tem maior largura de banda nominal que um link de 100 Mbps.",
      "relatedTerms": [
        "bps",
        "throughput",
        "capacidade"
      ],
      "relatedLessons": [
        "0.4",
        "0.6"
      ]
    },
    {
      "term": "Throughput",
      "shortDefinition": "Taxa real de dados úteis entregues por tempo.",
      "longDefinition": "Métrica prática que mede quanto dado útil efetivamente foi transferido, considerando overhead, perda e limitações.",
      "example": "Em um link de 500 Mbps, um download pode ter throughput real de 45 MB/s.",
      "relatedTerms": [
        "overhead",
        "largura de banda"
      ],
      "relatedLessons": [
        "0.4",
        "0.6"
      ]
    },
    {
      "term": "Jitter",
      "shortDefinition": "Variação da latência ao longo do tempo.",
      "longDefinition": "Oscilação no tempo de chegada de pacotes, especialmente importante para aplicações em tempo real.",
      "example": "Uma chamada de voz pode falhar se a latência variar muito, mesmo com média aceitável.",
      "relatedTerms": [
        "latência",
        "voz",
        "vídeo"
      ],
      "relatedLessons": [
        "0.6",
        "15.4"
      ]
    },
    {
      "term": "Perda de pacotes",
      "shortDefinition": "Situação em que pacotes não chegam ao destino.",
      "longDefinition": "Pode ocorrer por erro físico, congestionamento, fila, descarte por política ou falha no caminho.",
      "example": "2% de perda já pode prejudicar chamadas de vídeo e reduzir throughput TCP.",
      "relatedTerms": [
        "retransmissão",
        "TCP",
        "UDP"
      ],
      "relatedLessons": [
        "0.6",
        "6.1",
        "15.2"
      ]
    },
    {
      "term": "Bufferbloat",
      "shortDefinition": "Aumento de latência causado por filas excessivas em buffers.",
      "longDefinition": "Quando equipamentos acumulam pacotes demais em vez de descartar/controlar adequadamente, a latência sobe muito sob carga.",
      "example": "Durante upload pesado, a navegação fica lenta porque o roteador enfileira pacotes demais.",
      "relatedTerms": [
        "fila",
        "latência",
        "congestionamento"
      ],
      "relatedLessons": [
        "0.6",
        "15.5"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.4 Bit vs Byte em redes",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para taxa, unidades e throughput."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.5 Como sinais físicos carregam dados",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para perda, meio físico e interferência."
    },
    {
      "type": "official-doc",
      "title": "Linux ping, traceroute, iproute2 e curl manual pages",
      "organization": "Linux manual pages / projetos oficiais",
      "url": "",
      "note": "Referência operacional para comandos de diagnóstico."
    },
    {
      "type": "official-doc",
      "title": "Microsoft Test-NetConnection documentation",
      "organization": "Microsoft",
      "url": "",
      "note": "Referência para diagnóstico TCP no PowerShell."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e SRE",
      "lesson": "Métricas, logs e traces",
      "reason": "Latência e throughput são métricas essenciais de SRE e operação de plataformas."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e Plataformas",
      "lesson": "Service mesh, ingress e egress",
      "reason": "Microserviços adicionam saltos e políticas que impactam latência e throughput."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Autenticação moderna",
      "lesson": "Fluxos OIDC e chamadas a provedores de identidade",
      "reason": "Autenticação federada depende de HTTP, TLS, redirects e latência entre serviços."
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
      "0.7"
    ]
  }
};
