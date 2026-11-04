export const lesson0004 = {
  "id": "0.4",
  "moduleId": "m00",
  "order": 4,
  "title": "Bit vs Byte em redes",
  "subtitle": "Como interpretar Mbps, MB/s, throughput, overhead e velocidade real sem cair em conclusões erradas.",
  "duration": "75-110 min",
  "estimatedStudyTimeMinutes": 110,
  "difficulty": "iniciante",
  "type": "intermediária",
  "xp": 145,
  "tags": [
    "fundamentos",
    "bit",
    "byte",
    "mbps",
    "mb/s",
    "throughput",
    "overhead",
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
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que informação digital é representada por estados interpretados como bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta a relação entre bit, byte, binário e hexadecimal."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.3",
      "reason": "A aula 0.3 mostra como bytes podem representar texto em protocolos, logs e APIs."
    }
  ],
  "objectives": [
    "Diferenciar bit, byte, bps, B/s, Mbps, MB/s, Gbps e GiB com clareza operacional.",
    "Converter velocidades de rede para taxas aproximadas de transferência de arquivos.",
    "Explicar por que a velocidade útil costuma ser menor que a velocidade nominal do link.",
    "Relacionar overhead de protocolos com Ethernet, IP, TCP, TLS, HTTP, VPN, Wi-Fi e cloud.",
    "Evitar diagnósticos incorretos em testes de velocidade, downloads, backups, logs e transferência entre serviços."
  ],
  "learningOutcomes": [
    "Dado um plano em Mbps, o aluno consegue estimar o máximo teórico em MB/s dividindo por 8.",
    "Dado um download em MB/s, o aluno consegue converter para Mbps multiplicando por 8.",
    "Dado um resultado abaixo do teórico, o aluno considera overhead, Wi-Fi, servidor de origem, disco, CPU, VPN e congestionamento antes de concluir falha no provedor.",
    "Dado um custo cloud por GB trafegado, o aluno entende a diferença entre velocidade instantânea e volume transferido.",
    "Dado um alerta de exfiltração ou transferência incomum, o aluno interpreta unidades corretamente para estimar impacto."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Uma das confusões mais comuns em redes aparece quando alguém contrata um link de <strong>500 Mbps</strong> e espera ver downloads a <strong>500 MB/s</strong>. Mbps mede <em>megabits por segundo</em>; MB/s mede <em>megabytes por segundo</em>. Como 1 byte tem 8 bits, um link de 500 Mbps tem teto teórico de 62,5 MB/s, e isso antes de descontar overhead, Wi-Fi, servidor de origem, criptografia, VPN, disco e processamento.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> um usuário diz que a internet de 300 Mbps está ruim porque o navegador mostra 32 MB/s. Sem converter as unidades, alguém pode abrir chamado com o provedor, trocar equipamento ou alterar o firewall sem necessidade. Na verdade, 32 MB/s equivalem a cerca de 256 Mbps úteis, o que pode ser aceitável.\n  </div>\n  <p>\n    A mesma leitura errada aparece em backups, replicação, ingestão de logs no SIEM, custo de cloud, pipelines e investigação de exfiltração. O método que você vai usar daqui em diante é sempre o mesmo: identificar a unidade, converter, considerar o overhead e só então diagnosticar.\n  </p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>História</h2>\n  <p>\n    Em comunicação, o que interessa é quantos bits atravessam o meio por segundo, porque o meio transmite sinais que representam bits um após o outro. Por isso redes, telecomunicações e operadoras medem em bps, Kbps, Mbps e Gbps. Já arquivos são contados como conjuntos de bytes (KB, MB, GB, TB), e sistemas operacionais, navegadores e gerenciadores de download costumam exibir a transferência em bytes por segundo. Quando você cruza esses dois mundos sem converter, surge a confusão.\n  </p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Área</th><th>Unidade comum</th><th>O que mede</th><th>Exemplo</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Telecom/rede</td><td>bps, Mbps, Gbps</td><td>Taxa de bits transmitidos por segundo</td><td>Link de 1 Gbps</td></tr>\n      <tr><td>Arquivos/sistemas</td><td>B/s, MB/s, GB/s</td><td>Quantidade de bytes movidos por segundo</td><td>Download a 40 MB/s</td></tr>\n      <tr><td>Armazenamento</td><td>GB, TB</td><td>Volume de dados armazenado</td><td>Backup de 200 GB</td></tr>\n      <tr><td>Cloud billing</td><td>GB transferidos</td><td>Volume trafegado cobrado</td><td>Egress de 500 GB/mês</td></tr>\n    </tbody>\n  </table>\n  </div>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    A mesma transferência pode ser descrita por unidades diferentes. Um arquivo de 1 GB numa conexão de 100 Mbps não baixa em 10 segundos só porque 100 parece maior que 1: 1 GB são cerca de 8000 megabits, e 8000 ÷ 100 = 80 segundos no melhor caso. E ainda há overhead, porque a rede não transporta só o conteúdo do arquivo: transporta também quadros, pacotes, segmentos, cabeçalhos, confirmações, criptografia, retransmissões e controle.\n  </p>\n  <p>\n    Errar a unidade leva a decisões erradas: tratar um teste normal como falha, comprar link acima ou abaixo do necessário, subestimar uma exfiltração, errar o custo de tráfego em cloud ou culpar a rede por um pipeline cujo gargalo está no registry, no disco, na CPU ou na inspeção TLS.\n  </p>\n  <h3>Erros comuns</h3>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead>\n      <tr><th>Erro</th><th>Por que acontece</th><th>Consequência</th><th>Correção</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Esperar ver 500 Mbps como 500 MB/s no navegador (comparar Mbps com MB/s diretamente)</td><td>As siglas são parecidas e muita gente não diferencia b minúsculo de B maiúsculo</td><td>Diagnóstico incorreto e chamados desnecessários</td><td>Dividir Mbps por 8 para obter o teto teórico em MB/s</td></tr>\n      <tr><td>Esperar taxa útil igual à taxa nominal do link</td><td>A conta Mbps ÷ 8 parece exata demais</td><td>Expectativa irreal sobre a taxa útil</td><td>Considerar cabeçalhos, criptografia, retransmissões e gargalos</td></tr>\n      <tr><td>Testar o link por Wi-Fi e concluir que o provedor está ruim</td><td>Wi-Fi é mais conveniente para um teste rápido</td><td>Culpa atribuída ao ponto errado</td><td>Testar cabeado, perto do roteador/switch, sem VPN e com vários destinos</td></tr>\n      <tr><td>Baixar de um servidor lento e culpar a rede local</td><td>O teste mede o caminho inteiro, inclusive a origem</td><td>Investigação no lugar errado</td><td>Repetir com outro servidor antes de concluir</td></tr>\n      <tr><td>Confundir velocidade instantânea com volume mensal</td><td>Os dois aparecem como \"dados trafegados\"</td><td>Erro em custo cloud, janela de backup e capacidade do SIEM</td><td>Separar taxa por segundo (Mbps, MB/s) de volume acumulado (GB/dia, GB/mês)</td></tr>\n    </tbody>\n  </table>\n  </div>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>\n    <strong>Bit</strong> é a menor unidade lógica de informação binária, 0 ou 1. <strong>Byte</strong> é um grupo de 8 bits. Em redes, a capacidade de transmissão é medida em bits por segundo (bps, Kbps, Mbps, Gbps). Arquivos são medidos em bytes (B, KB, MB, GB) e a transferência deles, em bytes por segundo (MB/s). Repare na letra: <strong>b</strong> minúsculo é bit; <strong>B</strong> maiúsculo é byte.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição operacional:</strong> Mbps mede quantos milhões de bits podem ser transmitidos por segundo. MB/s mede quantos milhões de bytes são transferidos por segundo. Como 1 byte = 8 bits, divida Mbps por 8 para obter MB/s e multiplique MB/s por 8 para obter Mbps. Exemplo: 100 Mbps equivalem teoricamente a 12,5 MB/s antes de overhead.\n  </div>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Link anunciado</th><th>Conta rápida</th><th>Teto teórico em MB/s</th><th>Observação</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>100 Mbps</td><td>100 ÷ 8</td><td>12,5 MB/s</td><td>Antes de overhead</td></tr>\n      <tr><td>300 Mbps</td><td>300 ÷ 8</td><td>37,5 MB/s</td><td>Wi-Fi e servidor podem reduzir</td></tr>\n      <tr><td>500 Mbps</td><td>500 ÷ 8</td><td>62,5 MB/s</td><td>Boa referência para fibra doméstica</td></tr>\n      <tr><td>1 Gbps</td><td>1000 ÷ 8</td><td>125 MB/s</td><td>Porta gigabit raramente entrega 125 MB/s úteis</td></tr>\n      <tr><td>10 Gbps</td><td>10000 ÷ 8</td><td>1250 MB/s</td><td>Exige NIC, cabo, switch, CPU e storage adequados</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <h3>Nominal, útil, overhead e volume</h3>\n  <p>Quatro números diferentes costumam ser chamados de \"velocidade\". Separe-os antes de qualquer diagnóstico:</p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Conceito</th><th>O que significa</th><th>Exemplo</th><th>Limitação</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Velocidade nominal</td><td>Capacidade anunciada ou negociada do link</td><td>1 Gbps na placa de rede</td><td>Não garante taxa útil de aplicação</td></tr>\n      <tr><td>Throughput útil (goodput)</td><td>Dados reais entregues à aplicação por tempo</td><td>90 MB/s copiando arquivo</td><td>Depende de protocolos e gargalos</td></tr>\n      <tr><td>Overhead</td><td>Bytes extras de controle, cabeçalho, criptografia e retransmissão</td><td>Ethernet + IP + TCP + TLS</td><td>Reduz a carga útil visível</td></tr>\n      <tr><td>Volume transferido</td><td>Total de dados movimentados num período</td><td>500 GB/mês em cloud</td><td>Não informa velocidade instantânea</td></tr>\n    </tbody>\n  </table>\n  </div>\n  <h3>Prefixos decimais e binários: GB × GiB</h3>\n  <p>\n    Em taxas de rede, os prefixos são decimais: 1 Mbps = 1.000.000 bits por segundo e 1 Gbps = 1.000 Mbps. Em armazenamento existem duas convenções. A decimal (SI) usa 1 GB = 10<sup>9</sup> bytes. A binária (IEC) usa 1 KiB = 1024 bytes, 1 MiB = 1024 KiB e 1 GiB = 1.073.741.824 bytes, cerca de 7% a mais que 1 GB. Alguns sistemas mostram \"GB\" calculando em GiB: é por isso que um disco de 1 TB (10<sup>12</sup> bytes) aparece no Windows como cerca de 931 GB. Para a conta rápida de velocidade a diferença é pequena; em auditoria, cobrança ou estimativa de volume precisa, confira qual convenção cada ferramenta usa.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Quando você baixa um arquivo, a aplicação recebe bytes úteis. Para esses bytes chegarem, cada camada adiciona informações de controle. Num download HTTPS por Ethernet, um pedaço do arquivo vai dentro de uma mensagem HTTP, que passa por TLS, TCP, IP e Ethernet:\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>A aplicação</strong> solicita dados, por exemplo um arquivo via HTTPS.</li>\n    <li><strong>HTTP</strong> organiza requisição e resposta em mensagens de aplicação.</li>\n    <li><strong>TLS</strong> protege confidencialidade e integridade, adicionando custo de criptografia e registros próprios.</li>\n    <li><strong>TCP</strong> divide o fluxo, controla a ordem, confirma o recebimento e retransmite quando necessário.</li>\n    <li><strong>IP</strong> endereça origem e destino entre redes.</li>\n    <li><strong>Ethernet ou Wi-Fi</strong> transporta quadros no enlace local.</li>\n    <li><strong>A placa de rede e o meio físico</strong> transmitem sinais que representam bits.</li>\n  </ol>\n  <h3>Quanto o overhead custa num caso bom</h3>\n  <p>\n    Em Ethernet com MTU de 1500 bytes, cada quadro ocupa no fio cerca de 1538 bytes (preâmbulo, cabeçalho Ethernet, FCS e intervalo entre quadros incluídos). Desses, 20 bytes vão para o cabeçalho IPv4 e 20 para o TCP, sobrando 1460 bytes de dados. Então 1460 ÷ 1538 ≈ 95%: numa porta de 1 Gbps, o máximo útil do TCP fica perto de 949 Mbps, ou cerca de 118 MB/s, e não 125 MB/s. Opções TCP, TLS, túneis de VPN (que acrescentam cabeçalhos e reduzem o espaço útil de cada pacote) e retransmissões tiram mais um pouco.\n  </p>\n  <p>\n    Em redes boas, essa perda é pequena. A distância entre nominal e útil cresce com VPN, fragmentação, retransmissões, alta latência, janela TCP pequena, inspeção de TLS, servidor remoto lento, storage ou CPU. No Wi-Fi ela é ainda maior: a taxa de link anunciada não é throughput útil, porque o meio é compartilhado, sujeito a interferência e, na prática, half-duplex.\n  </p>\n  <div class=\"content-card\">\n    <strong>Fórmulas práticas:</strong>\n    <ul>\n      <li><code>MB/s ≈ Mbps ÷ 8</code></li>\n      <li><code>Mbps ≈ MB/s × 8</code></li>\n      <li><code>tamanho em megabits = tamanho em megabytes × 8</code></li>\n      <li><code>tempo em segundos ≈ tamanho em megabits ÷ taxa em Mbps</code></li>\n      <li><code>volume ≈ taxa × tempo</code> (ex.: 25 MB/s × 60 s = 1500 MB)</li>\n    </ul>\n  </div>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>\n    Numa arquitetura corporativa, bit e byte aparecem em pontos diferentes, e cada ponto pode ser o gargalo:\n  </p>\n  <ul>\n    <li><strong>Camada física/enlace:</strong> link de internet em Mbps ou Gbps, portas de switch em 1G, 10G, 25G ou mais, duplex, negociação, taxa do Wi-Fi.</li>\n    <li><strong>Camada de rede/transporte:</strong> overhead IP/TCP/UDP, perda, retransmissão, janela TCP.</li>\n    <li><strong>Camada de segurança:</strong> TLS, VPN, inspeção, proxy, WAF e firewall. O throughput divulgado de um firewall (em Gbps) pode cair quando IPS, inspeção SSL, VPN ou logs detalhados são ativados.</li>\n    <li><strong>Camada de aplicação:</strong> tamanho de arquivos, compressão, cache, servidor de origem e cliente. Storage e backup costumam mostrar MB/s ou GB/s.</li>\n    <li><strong>Operação/cloud:</strong> cobrança por GB, ingestão de logs, egress, replicação e backup.</li>\n  </ul>\n  <p>\n    O erro arquitetural comum é dimensionar pelo número de marketing. Um firewall anunciado como 5 Gbps pode não entregar 5 Gbps com todas as inspeções ligadas, e um link de 1 Gbps não resolve um backup lento se o gargalo estiver no disco.\n  </p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Imagine uma estrada com caminhões de entrega. A capacidade da estrada é como os Mbps: quanto pode passar por segundo. O arquivo é a carga dentro dos caminhões, medida em bytes. Mas os caminhões também levam documentos, lacres, etiquetas e combustível, que não são a carga final e mesmo assim são necessários para a entrega: isso é o overhead.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> protocolos também retransmitem, reordenam, criptografam, controlam congestionamento e compartilham o meio, coisas que uma estrada não representa.\n  </div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Você contratou 500 Mbps em casa. Ao baixar um arquivo, o navegador mostra 55 MB/s. A conta rápida é:\n  </p>\n  <pre class=\"code-block\"><code>55 MB/s × 8 = 440 Mbps</code></pre>\n  <p>\n    Isso não indica problema. O teto teórico de 500 Mbps seria 62,5 MB/s, e você está vendo 55 MB/s de dados úteis. Considerando overhead, servidor de origem e variação do link, essa taxa está boa. O diagnóstico começa pela conversão, não pela reclamação.\n  </p>\n  <div class=\"content-card\">\n    <strong>Atalho mental:</strong> se o download em MB/s multiplicado por 8 chega perto do plano em Mbps, o resultado provavelmente está normal. Se fica muito distante, investigue meio físico, Wi-Fi, cabo, duplex, roteador, CPU, VPN, firewall, servidor e horário.\n  </div>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Uma empresa tem um link de 1 Gbps entre matriz e filial, e o time de backup reclama que a cópia de 500 GB está demorando. O cálculo bruto cria a expectativa: 500 GB são cerca de 4000 gigabits; a 1 Gbps, isso leva cerca de 4000 segundos, pouco mais de 1 hora. Esse é o mínimo teórico. Na prática entram criptografia, janela TCP, latência, perda, armazenamento, deduplicação, compressão, firewall, IPS, horário de pico e limite do servidor.\n  </p>\n  <p>\n    Em vez de repetir \"o link é de 1 Gbps\", meça o throughput útil e verifique gráficos de interface, erros, descartes, CPU do firewall, retransmissões TCP, taxa do storage, política de QoS e concorrência com outros tráfegos.\n  </p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>\n    Em cloud, a confusão vira custo. Um serviço pode transferir a centenas de Mbps, mas a cobrança costuma vir por volume: GB transferidos para fora da região, entre zonas ou para a internet. NAT Gateway, load balancer, firewall gerenciado ou appliance virtual podem cobrar por hora, por GB processado ou por unidade de capacidade.\n  </p>\n  <p>\n    Converta taxa em volume para ver o tamanho da fatura: um fluxo sustentado de 100 Mbps são 12,5 MB/s; em um dia (86.400 s), isso dá cerca de 1.080.000 MB, ou aproximadamente 1 TB. Um pipeline que baixa imagens grandes todos os dias pode não parecer pesado em velocidade instantânea e mesmo assim gerar egress relevante. Pergunte sempre: qual é a taxa de pico, qual é o volume mensal, onde está o tráfego, há cobrança entre zonas, existe compressão, cache ou private endpoint, e quais logs serão armazenados?\n  </p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>\n    Pipelines baixam dependências, imagens de container, artefatos, scanners e bases de vulnerabilidades. Baixar uma imagem de 1,2 GB em 60 segundos equivale a cerca de 20 MB/s, ou 160 Mbps úteis, o que pode ser normal para um runner compartilhado. Um build lento pode ser atribuído à rede quando o gargalo real está em cache mal configurado, registry distante, proxy corporativo, autenticação, inspeção TLS, limite do runner, disco lento ou concorrência de jobs.\n  </p>\n  <p>\n    Com muitos builds paralelos, o volume total pode saturar link, NAT, proxy ou registry interno. As saídas típicas são cache local, mirror de registry, imagens menores com camadas otimizadas, runners próximos do registry e políticas de retenção.\n  </p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>\n    Em segurança, bits e bytes definem a estimativa de impacto. Se um alerta indica transferência de 80 MB/s para um destino externo por 10 minutos, isso não é \"80 Mbps\": são 640 Mbps úteis. O volume é 80 MB/s × 600 s = 48.000 MB, cerca de 48 GB. Ler \"80 Mbps\" daria um oitavo disso (cerca de 6 GB), e essa diferença muda a severidade, a contenção e a comunicação com a gestão.\n  </p>\n  <p>\n    A mesma conta vale para dimensionar o SIEM (eventos por segundo e GB/dia) e para validar se firewall, proxy e VPN aguentam o tráfego com as inspeções ativadas. Os controles e alertas correspondentes estão na seção de Segurança.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1000 430\" role=\"img\" aria-labelledby=\"m00l04-title m00l04-desc\">\n    <title id=\"m00l04-title\">Relação entre Mbps, MB/s, overhead e throughput útil</title>\n    <desc id=\"m00l04-desc\">Diagrama mostrando um link anunciado em Mbps, conversão para MB/s, perda por overhead e entrega de throughput útil para a aplicação.</desc>\n    <defs>\n      <marker id=\"m00l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"170\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"125\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Link nominal</text>\n    <text x=\"125\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">500 Mbps</text>\n    <rect x=\"280\" y=\"70\" width=\"190\" height=\"78\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"375\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Conversão</text>\n    <text x=\"375\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">500 ÷ 8 = 62,5 MB/s</text>\n    <rect x=\"550\" y=\"70\" width=\"190\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"645\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Overhead</text>\n    <text x=\"645\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ethernet + IP + TCP + TLS</text>\n    <rect x=\"810\" y=\"70\" width=\"150\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"885\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"885\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">55 MB/s úteis</text>\n    <line x1=\"210\" y1=\"109\" x2=\"280\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"470\" y1=\"109\" x2=\"550\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"740\" y1=\"109\" x2=\"810\" y2=\"109\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <rect x=\"110\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"225\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Download observado</text>\n    <text x=\"225\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">55 MB/s × 8 = 440 Mbps</text>\n    <rect x=\"390\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"505\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Diagnóstico</text>\n    <text x=\"505\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">converter antes de concluir</text>\n    <rect x=\"670\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"785\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Risco</text>\n    <text x=\"785\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">unidade errada = decisão errada</text>\n    <line x1=\"885\" y1=\"148\" x2=\"225\" y2=\"245\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"340\" y1=\"288\" x2=\"390\" y2=\"288\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"620\" y1=\"288\" x2=\"670\" y2=\"288\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <text x=\"500\" y=\"390\" text-anchor=\"middle\" class=\"svg-label\">A velocidade nominal do link não é igual à taxa útil vista pela aplicação.</text>\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> capacidade de rede é medida em bits por segundo; arquivos são percebidos em bytes. Entre a capacidade nominal e a aplicação existem overhead e gargalos.</li>\n    <li><strong>Conta rápida:</strong> 1 byte = 8 bits, então Mbps ÷ 8 ≈ MB/s teórico e MB/s × 8 ≈ Mbps. Ex.: 500 Mbps → 62,5 MB/s.</li>\n    <li><strong>Taxa útil &lt; nominal:</strong> cabeçalhos Ethernet/IP/TCP tiram cerca de 5% num caso bom; TLS, VPN, Wi-Fi, servidor, disco e CPU podem tirar muito mais.</li>\n    <li><strong>Taxa ≠ volume:</strong> Mbps e MB/s são taxas; GB/dia e GB/mês são volumes (volume = taxa × tempo). Cloud e SIEM cobram volume. GB (10<sup>9</sup> bytes) e GiB (2<sup>30</sup> bytes) também não são iguais.</li>\n    <li><strong>Uso real:</strong> speedtest, backup, custo de cloud, SIEM, VPN, firewall, Wi-Fi, pipelines e estimativa de exfiltração. Converta antes de concluir.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.5 — Como sinais físicos carregam dados</strong>, você desce para o mundo físico: como cabo, fibra e rádio transportam os sinais que representam bits, base para entender Ethernet, Wi-Fi, interferência, duplex, perda e troubleshooting de camada física.\n  </p>\n</section>\n"
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
      "Ethernet",
      "Wi-Fi",
      "IP",
      "TCP",
      "UDP",
      "TLS",
      "HTTP",
      "VPN"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "binário",
      "codificação"
    ],
    "enables": [
      "throughput",
      "overhead",
      "performance",
      "troubleshooting",
      "dimensionamento",
      "cloud networking",
      "segurança operacional"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Download parece menor que o plano contratado.",
      "Backup demora mais que o esperado.",
      "Pipeline baixa imagens lentamente.",
      "Firewall atinge CPU alta durante tráfego intenso.",
      "Speedtest por Wi-Fi varia muito.",
      "Custo cloud de tráfego aumenta sem clareza."
    ],
    "diagnosticQuestions": [
      "A métrica está em bits ou bytes?",
      "A taxa é nominal, média, pico ou throughput útil?",
      "O teste foi feito por cabo, Wi-Fi, VPN ou proxy?",
      "O servidor de origem consegue entregar nessa velocidade?",
      "Há TLS inspection, IPS, WAF, VPN ou NAT no caminho?",
      "O gargalo pode estar no disco, CPU, storage, registry ou aplicação?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Select-Object Name, LinkSpeed\nGet-Counter '\\Network Interface(*)\\Bytes Total/sec'",
        "purpose": "Ver velocidade negociada da interface e taxa de bytes por segundo.",
        "expectedObservation": "Interface com LinkSpeed coerente e contador de bytes variando durante transferência.",
        "interpretation": "LinkSpeed mostra capacidade negociada; Bytes/sec mostra tráfego observado, que pode ser convertido para bits multiplicando por 8."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection exemplo.com -Port 443",
        "purpose": "Validar conectividade básica até um serviço antes de culpar throughput.",
        "expectedObservation": "TcpTestSucceeded como True quando a porta está acessível.",
        "interpretation": "Conectividade não garante performance, mas separa falha de acesso de lentidão."
      },
      {
        "platform": "Linux",
        "command": "ip -s link\ncat /sys/class/net/eth0/speed 2>/dev/null || true",
        "purpose": "Ver estatísticas de interface e velocidade negociada quando disponível.",
        "expectedObservation": "Contadores RX/TX aumentando e velocidade como 1000 para 1 Gbps, se suportado.",
        "interpretation": "Erros, drops e velocidade negociada abaixo do esperado podem explicar throughput ruim."
      },
      {
        "platform": "Linux",
        "command": "sar -n DEV 1 5  # se sysstat estiver instalado\nss -ti",
        "purpose": "Observar tráfego por interface e detalhes TCP durante uma transferência.",
        "expectedObservation": "Taxas de RX/TX e informações de retransmissão/congestionamento quando aplicável.",
        "interpretation": "Ajuda a distinguir uso real, retransmissão e gargalos de transporte."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status\nshow interfaces counters errors\nshow interfaces gigabitEthernet 0/1",
        "purpose": "Ver velocidade, duplex, erros e drops em portas de switch/roteador.",
        "expectedObservation": "Porta em velocidade esperada, full-duplex, sem erros relevantes.",
        "interpretation": "Erros, duplex incorreto ou negociação abaixo do esperado podem reduzir throughput."
      }
    ],
    "decisionTree": [
      {
        "if": "Download em MB/s parece baixo",
        "then": "Multiplicar por 8 e comparar com o link em Mbps antes de abrir incidente."
      },
      {
        "if": "Conversão mostra valor próximo do esperado",
        "then": "Considerar overhead normal (só os cabeçalhos Ethernet/IP/TCP já tiram cerca de 5%) e encerrar como comportamento aceitável ou monitorar."
      },
      {
        "if": "Valor fica muito abaixo do esperado",
        "then": "Testar cabeado, sem VPN, com outro servidor e verificar interface, erros, CPU e firewall."
      },
      {
        "if": "Somente Wi-Fi está ruim",
        "then": "Investigar sinal, canal, interferência, padrão Wi-Fi, distância e quantidade de clientes."
      },
      {
        "if": "Somente tráfego via VPN está ruim",
        "then": "Verificar MTU, criptografia, CPU, split tunneling, rota e gateway da VPN."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Padronizar dashboards com unidade explícita: Mbps, MB/s, GB/dia, eventos por segundo.",
      "Registrar metodologia de teste: cabo/Wi-Fi, com/sem VPN, origem, destino, horário e ferramenta.",
      "Dimensionar firewall, proxy, VPN e SIEM com recursos reais ativados.",
      "Calcular volume estimado em incidentes de possível exfiltração.",
      "Separar métricas de taxa, volume, latência, perda e retransmissão.",
      "Fazer testes de carga e medições ativas só com autorização e em janela planejada, para não causar indisponibilidade."
    ],
    "badPractices": [
      "Usar um único speedtest por Wi-Fi como prova definitiva.",
      "Desativar inspeção de segurança sem medir gargalos corretamente.",
      "Subdimensionar SIEM olhando apenas eventos e ignorando bytes ingeridos.",
      "Confundir tráfego criptografado com tráfego seguro sem análise de destino, volume e comportamento."
    ],
    "commonErrors": [
      "Ignorar overhead de VPN e TLS.",
      "Confundir GB transferidos com Gbps.",
      "Não diferenciar MB decimal de MiB binário em medições precisas."
    ],
    "vulnerabilities": [
      {
        "name": "Subestimação de exfiltração",
        "description": "Um analista confunde MB/s com Mbps e calcula impacto menor do que o real.",
        "defensiveExplanation": "A resposta a incidente depende de estimar taxa e volume corretamente. Multiplicar MB/s por 8 antes de comparar com Mbps evita subestimação.",
        "mitigation": "Padronizar playbooks de incidente com conversão de unidades, cálculo de volume e janela temporal."
      },
      {
        "name": "Controle de segurança subdimensionado",
        "description": "Firewall, proxy ou VPN é escolhido apenas pelo throughput nominal de marketing.",
        "defensiveExplanation": "Recursos como IPS, TLS inspection e VPN reduzem capacidade efetiva. Testes devem refletir o cenário real.",
        "mitigation": "Validar sizing com funcionalidades ativas, tráfego realista, picos e margem de crescimento."
      },
      {
        "name": "Perda de logs por ingestão mal calculada",
        "description": "O SIEM recebe mais dados do que o licenciamento ou pipeline suporta.",
        "defensiveExplanation": "Logs devem ser calculados em eventos por segundo e volume por dia, não apenas quantidade de fontes.",
        "mitigation": "Medir EPS, bytes por evento, compressão, retenção, filtragem e custo por GB."
      }
    ],
    "monitoring": [
      "Gráficos de interface em bits por segundo e bytes por segundo com legenda clara.",
      "Erros, drops, retransmissões TCP e saturação de CPU em firewalls/proxies.",
      "Volume de egress cloud por serviço, região e conta/projeto.",
      "Ingestão de logs em GB/dia e eventos por segundo.",
      "Tráfego externo incomum por host, usuário, processo ou workload."
    ],
    "hardening": [
      "Aplicar QoS quando tráfegos críticos competem com backups ou downloads grandes.",
      "Usar cache, compressão e mirrors internos para reduzir tráfego repetitivo.",
      "Segmentar redes para limitar impacto de transferências anômalas.",
      "Definir alertas por volume e por taxa, não apenas por conexão."
    ],
    "detectionIdeas": [
      "Alertar quando um host mantém taxa de saída incomum por muitos minutos.",
      "Correlacionar upload externo com processo, usuário e destino.",
      "Comparar taxa atual com baseline por horário e função do ativo.",
      "Verificar se aumento de tráfego coincide com backup, pipeline ou incidente."
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que operadoras anunciam links em Mbps, mas navegadores muitas vezes mostram downloads em MB/s?",
      "hints": [
        "Pense em transmissão versus arquivo.",
        "Lembre que 1 byte tem 8 bits."
      ],
      "expectedIdeas": [
        "bits",
        "bytes",
        "transmissão",
        "arquivo",
        "dividir por 8"
      ],
      "explanation": "Redes medem taxa de bits transmitidos; arquivos são agrupamentos de bytes. As unidades pertencem a contextos diferentes."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário com link de 300 Mbps baixa a 34 MB/s por cabo. Isso prova problema?",
      "hints": [
        "Multiplique 34 por 8.",
        "Considere overhead."
      ],
      "expectedIdeas": [
        "272 Mbps",
        "próximo",
        "overhead",
        "não necessariamente",
        "testar mais"
      ],
      "explanation": "34 MB/s equivalem a 272 Mbps úteis. Pode ser normal dependendo do servidor, overhead e condições do teste."
    },
    {
      "type": "cenário real",
      "question": "Como você explicaria para um gestor que um firewall de 5 Gbps pode não entregar 5 Gbps com inspeção TLS e IPS ativados?",
      "hints": [
        "Pense em throughput nominal versus real.",
        "Pense em processamento de segurança."
      ],
      "expectedIdeas": [
        "recursos ativados",
        "CPU",
        "inspeção",
        "throughput efetivo",
        "teste realista"
      ],
      "explanation": "Capacidade de appliance depende dos recursos ativados e do perfil de tráfego. Sizing precisa refletir o uso real."
    }
  ],
  "quiz": [
    {
      "id": "q0.4.1",
      "question": "100 Mbps equivalem teoricamente a aproximadamente quanto em MB/s?",
      "options": [
        "100 MB/s",
        "80 MB/s",
        "12,5 MB/s",
        "1,25 MB/s"
      ],
      "answer": 2,
      "explanation": "Como 1 byte tem 8 bits, 100 Mbps ÷ 8 = 12,5 MB/s antes de overhead.",
      "topic": "conversão",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.4.2",
      "question": "Um download aparece como 50 MB/s. Qual é a taxa aproximada em Mbps?",
      "options": [
        "50 Mbps",
        "100 Mbps",
        "250 Mbps",
        "400 Mbps"
      ],
      "answer": 3,
      "explanation": "50 MB/s × 8 = 400 Mbps.",
      "topic": "conversão",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.4.3",
      "question": "Qual afirmação está correta?",
      "options": [
        "Mbps e MB/s são a mesma unidade.",
        "MB/s mede megabits por segundo.",
        "Mbps é comum para links; MB/s é comum para downloads.",
        "1 byte tem 10 bits em redes."
      ],
      "answer": 2,
      "explanation": "Links são normalmente medidos em bits por segundo; downloads e arquivos frequentemente aparecem em bytes por segundo.",
      "topic": "unidades",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.4.4",
      "question": "Por que um link de 1 Gbps raramente entrega 125 MB/s úteis exatos para a aplicação?",
      "options": [
        "Porque 1 Gbps não existe.",
        "Por causa de overhead, gargalos e condições reais.",
        "Porque byte e bit são iguais.",
        "Porque HTTP sempre limita tudo a 10 MB/s."
      ],
      "answer": 1,
      "explanation": "O teto teórico é 125 MB/s, mas protocolos, criptografia, retransmissões, servidor, disco e outros fatores reduzem a taxa útil.",
      "topic": "overhead",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q0.4.5",
      "question": "Em um alerta de possível exfiltração, por que é perigoso confundir 80 MB/s com 80 Mbps?",
      "options": [
        "Porque 80 MB/s equivalem a aproximadamente 640 Mbps.",
        "Porque 80 MB/s sempre significam zero tráfego.",
        "Porque Mbps é unidade de armazenamento.",
        "Porque exfiltração não usa rede."
      ],
      "answer": 0,
      "explanation": "80 MB/s multiplicados por 8 equivalem a 640 Mbps, alterando a estimativa de volume e severidade.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q0.4.7",
      "question": "Um serviço em cloud envia dados a 100 Mbps sustentados durante 24 horas. Qual é o volume aproximado transferido, que é o que a cobrança de egress costuma considerar?",
      "options": [
        "100 MB",
        "12,5 GB",
        "100 GB",
        "Cerca de 1 TB"
      ],
      "answer": 3,
      "explanation": "100 Mbps ÷ 8 = 12,5 MB/s; 12,5 MB/s × 86.400 s ≈ 1.080.000 MB, cerca de 1 TB. A velocidade indica a taxa; a cobrança considera o volume acumulado.",
      "topic": "cloud",
      "difficulty": "intermediário",
      "type": "cloud"
    },
    {
      "id": "q0.4.8",
      "question": "Um disco vendido como 1 TB aparece no Windows como cerca de 931 GB. Qual é a explicação?",
      "options": [
        "O fabricante entrega menos bytes do que anuncia.",
        "O sistema calcula em unidades binárias (GiB): 10^12 bytes ÷ 1.073.741.824 ≈ 931.",
        "O overhead de TCP/IP consome cerca de 7% do disco.",
        "Como 1 byte tem 8 bits, parte da capacidade vira bits de controle."
      ],
      "answer": 1,
      "explanation": "O fabricante usa o prefixo decimal (1 TB = 10^12 bytes); o sistema divide por 2^30 (GiB) e mostra o rótulo \"GB\". Os bytes são os mesmos; muda só a convenção.",
      "topic": "unidades",
      "difficulty": "intermediário",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.4.1",
      "front": "O que é Mbps?",
      "back": "Megabits por segundo. Unidade comum para velocidade de links de rede.",
      "tags": [
        "unidades",
        "redes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.2",
      "front": "O que é MB/s?",
      "back": "Megabytes por segundo. Unidade comum para taxa de transferência de arquivos e downloads.",
      "tags": [
        "unidades",
        "download"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.3",
      "front": "Conta rápida para Mbps virar MB/s",
      "back": "Divida Mbps por 8 para obter o teto teórico em MB/s.",
      "tags": [
        "conversão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.4",
      "front": "Conta rápida para MB/s virar Mbps",
      "back": "Multiplique MB/s por 8 para estimar Mbps.",
      "tags": [
        "conversão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.4.5",
      "front": "O que é overhead?",
      "back": "Custo adicional de transporte e controle, como cabeçalhos, criptografia, confirmações e retransmissões.",
      "tags": [
        "overhead",
        "protocolos"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.4.6",
      "front": "Por que Wi-Fi não é ideal para testar link contratado?",
      "back": "Porque adiciona variáveis como interferência, distância, canal, padrão, sinal e concorrência.",
      "tags": [
        "wifi",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.4.7",
      "front": "GB × GiB",
      "back": "1 GB = 10^9 bytes (decimal, SI). 1 GiB = 2^30 = 1.073.741.824 bytes (binário, IEC), cerca de 7% maior. Taxas de rede usam prefixos decimais.",
      "tags": [
        "unidades"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.4.8",
      "front": "Como estimar o tempo mínimo de uma transferência?",
      "back": "Converta o tamanho para megabits (MB × 8) e divida pela taxa em Mbps. Ex.: 1 GB a 100 Mbps ≈ 8000 ÷ 100 = 80 s, antes de overhead.",
      "tags": [
        "conversão"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.4.1",
      "type": "cálculo",
      "prompt": "Converta 300 Mbps para MB/s teóricos.",
      "expectedAnswer": "37,5 MB/s.",
      "explanation": "300 ÷ 8 = 37,5."
    },
    {
      "id": "ex0.4.2",
      "type": "cálculo",
      "prompt": "Um download mostra 42 MB/s. Qual é a taxa aproximada em Mbps?",
      "expectedAnswer": "336 Mbps.",
      "explanation": "42 × 8 = 336."
    },
    {
      "id": "ex0.4.3",
      "type": "diagnóstico",
      "prompt": "Um usuário com plano de 500 Mbps baixa a 58 MB/s por cabo. Escreva uma conclusão técnica curta.",
      "expectedAnswer": "58 MB/s equivalem a 464 Mbps úteis. O resultado parece próximo do contratado considerando overhead; não há prova imediata de falha no link.",
      "explanation": "A conclusão correta converte unidade e considera overhead antes de culpar o provedor."
    },
    {
      "id": "ex0.4.4",
      "type": "segurança",
      "prompt": "Um alerta mostra upload sustentado de 25 MB/s por 20 minutos. Estime o volume aproximado transferido.",
      "expectedAnswer": "25 MB/s × 1200 s = 30000 MB, aproximadamente 30 GB.",
      "explanation": "Para impacto de incidente, volume acumulado importa tanto quanto taxa instantânea."
    }
  ],
  "challenge": {
    "title": "Parecer técnico sobre link, Wi-Fi e possível gargalo",
    "scenario": "A empresa contratou 500 Mbps. Em cabo, um notebook baixa a 54 MB/s. No Wi-Fi, outro baixa a 28 MB/s. O gestor quer abrir chamado com o provedor e trocar o firewall porque acredita que a empresa está recebendo apenas 54 Mbps.",
    "tasks": [
      "Converter 54 MB/s para Mbps.",
      "Converter 28 MB/s para Mbps.",
      "Comparar os valores com o teto teórico de 500 Mbps.",
      "Explicar por que Wi-Fi não prova problema no link contratado.",
      "Listar três testes adicionais antes de trocar equipamento ou acionar o provedor."
    ],
    "constraints": [
      "Usar linguagem compreensível para gestor, mas tecnicamente correta.",
      "Não afirmar certeza sem evidência.",
      "Separar link contratado, throughput útil e meio de acesso.",
      "Não recomendar desativar controles de segurança sem autorização."
    ],
    "expectedDeliverables": [
      "Cálculos de conversão.",
      "Conclusão sobre o teste cabeado.",
      "Conclusão sobre o teste Wi-Fi.",
      "Lista de testes adicionais.",
      "Recomendação final."
    ],
    "gradingRubric": [
      {
        "criterion": "Conversão correta",
        "points": 30,
        "description": "Converte MB/s para Mbps e Mbps para MB/s sem erro."
      },
      {
        "criterion": "Diagnóstico sem achismo",
        "points": 25,
        "description": "Não culpa provedor, Wi-Fi ou firewall sem evidência."
      },
      {
        "criterion": "Consideração de overhead",
        "points": 20,
        "description": "Reconhece diferença entre taxa nominal e throughput útil."
      },
      {
        "criterion": "Plano de validação",
        "points": 15,
        "description": "Propõe testes cabeados, múltiplos destinos, sem VPN e verificação de interface."
      },
      {
        "criterion": "Comunicação",
        "points": 10,
        "description": "Explica em linguagem clara para público não especialista."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro, identificamos unidades. O gestor confundiu MB/s com Mbps. Depois convertemos as taxas observadas e comparamos com o teto teórico de 500 Mbps, lembrando que o teto útil será menor por overhead. Em seguida, separamos o resultado cabeado do resultado Wi-Fi, porque Wi-Fi tem variáveis próprias.",
    "steps": [
      "Calcular teto teórico: 500 Mbps ÷ 8 = 62,5 MB/s.",
      "Converter teste cabeado: 54 MB/s × 8 = 432 Mbps.",
      "Converter teste Wi-Fi: 28 MB/s × 8 = 224 Mbps.",
      "Interpretar: 432 Mbps úteis em cabo está plausivelmente próximo do link de 500 Mbps considerando overhead.",
      "Interpretar: 224 Mbps no Wi-Fi aponta para investigação do meio sem fio antes de culpar provedor.",
      "Recomendar novos testes: cabo, outro servidor, sem VPN/proxy quando autorizado, checar LinkSpeed, erros de interface, CPU do firewall e horário."
    ],
    "commonWrongAnswers": [
      {
        "answer": "A empresa recebe só 54 Mbps.",
        "whyItIsWrong": "O valor observado era 54 MB/s, que equivale a 432 Mbps."
      },
      {
        "answer": "O provedor está errado porque Wi-Fi deu 28 MB/s.",
        "whyItIsWrong": "Wi-Fi não isola o link contratado; ele adiciona interferência, distância, padrão e compartilhamento do meio."
      },
      {
        "answer": "Trocar firewall imediatamente.",
        "whyItIsWrong": "Não há evidência suficiente. É preciso medir CPU, throughput, recursos ativos e interfaces."
      }
    ],
    "finalAnswer": "O teste cabeado de 54 MB/s equivale a aproximadamente 432 Mbps úteis. Para um link de 500 Mbps, esse valor pode ser aceitável considerando overhead e condições reais. O teste Wi-Fi de 28 MB/s equivale a 224 Mbps e deve ser investigado como limitação do ambiente sem fio. Antes de acionar o provedor ou trocar firewall, recomenda-se testar por cabo, sem VPN quando autorizado, em múltiplos destinos, checar velocidade negociada da interface, erros, CPU do firewall e repetir em horários diferentes."
  },
  "glossary": [
    {
      "term": "Bit",
      "shortDefinition": "Menor unidade lógica de informação binária.",
      "longDefinition": "Unidade que representa um estado binário, normalmente 0 ou 1, usada como base para transmissão e representação digital.",
      "example": "Um link de 100 Mbps transmite milhões de bits por segundo.",
      "relatedTerms": [
        "byte",
        "bps",
        "binário"
      ],
      "relatedLessons": [
        "0.1",
        "0.2",
        "0.4"
      ]
    },
    {
      "term": "Byte",
      "shortDefinition": "Grupo de 8 bits.",
      "longDefinition": "Unidade comum para medir dados armazenados ou transferidos como arquivos, memória, payloads e logs.",
      "example": "Um arquivo de 10 MB possui cerca de 80 megabits.",
      "relatedTerms": [
        "bit",
        "MB/s",
        "octeto"
      ],
      "relatedLessons": [
        "0.2",
        "0.4"
      ]
    },
    {
      "term": "Mbps",
      "shortDefinition": "Megabits por segundo.",
      "longDefinition": "Unidade de taxa de transmissão comum em links de rede e planos de internet.",
      "example": "Um link de 500 Mbps tem teto teórico de 62,5 MB/s.",
      "relatedTerms": [
        "bps",
        "Gbps",
        "throughput"
      ],
      "relatedLessons": [
        "0.4",
        "0.6"
      ]
    },
    {
      "term": "MB/s",
      "shortDefinition": "Megabytes por segundo.",
      "longDefinition": "Unidade comum para taxa de transferência de arquivos e downloads percebida por aplicações.",
      "example": "Um download de 50 MB/s equivale a cerca de 400 Mbps.",
      "relatedTerms": [
        "byte",
        "Mbps",
        "download"
      ],
      "relatedLessons": [
        "0.4"
      ]
    },
    {
      "term": "Overhead",
      "shortDefinition": "Custo adicional de transporte e controle.",
      "longDefinition": "Dados ou processamento extras necessários para que protocolos entreguem, protejam, confirmem, roteiem ou controlem a comunicação.",
      "example": "Ethernet, IP, TCP e TLS adicionam overhead antes dos bytes úteis da aplicação.",
      "relatedTerms": [
        "throughput",
        "goodput",
        "cabeçalho"
      ],
      "relatedLessons": [
        "0.4",
        "6.1",
        "8.3"
      ]
    },
    {
      "term": "Throughput",
      "shortDefinition": "Taxa real de dados transferidos em determinado período.",
      "longDefinition": "Métrica de desempenho que representa quanto tráfego foi efetivamente transmitido ou recebido, normalmente menor que a velocidade nominal.",
      "example": "Um link de 1 Gbps pode entregar 900 Mbps úteis em um teste real.",
      "relatedTerms": [
        "Mbps",
        "MB/s",
        "latência",
        "perda"
      ],
      "relatedLessons": [
        "0.4",
        "0.6",
        "15.1"
      ]
    },
    {
      "term": "GiB",
      "shortDefinition": "Gibibyte: 2^30 bytes.",
      "longDefinition": "Unidade binária (IEC) igual a 1.073.741.824 bytes, cerca de 7% maior que 1 GB decimal (10^9 bytes). Alguns sistemas exibem \"GB\" calculando em GiB.",
      "example": "Um disco de 1 TB (10^12 bytes) aparece como cerca de 931 GiB.",
      "relatedTerms": [
        "byte",
        "GB",
        "MiB"
      ],
      "relatedLessons": [
        "0.2",
        "0.4"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base conceitual sobre representação digital."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.2",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre bit, byte, binário e hexadecimal."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.6",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aprofundará latência, largura de banda, throughput e perda."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "conceitos de pipelines",
      "reason": "Pipelines dependem de download de dependências, imagens, artefatos e logs; a interpretação correta de taxa e volume ajuda a diagnosticar lentidão."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "módulos de autenticação e logs",
      "lesson": "logs e auditoria",
      "reason": "Eventos de autenticação, tokens e auditoria geram volume de dados que precisa ser dimensionado corretamente em SIEM e cloud."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "0.5"
    ]
  }
};
