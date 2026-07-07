export const lesson0004 = {
  "id": "0.4",
  "moduleId": "m00",
  "order": 4,
  "title": "Bit vs Byte em redes",
  "subtitle": "Como interpretar Mbps, MB/s, throughput, overhead e velocidade real sem cair em conclusões erradas.",
  "duration": "60-85 min",
  "estimatedStudyTimeMinutes": 85,
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
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Uma das confusões mais comuns em redes aparece quando alguém contrata um link de <strong>500 Mbps</strong> e espera ver downloads a <strong>500 MB/s</strong>. Essa expectativa está errada por uma razão simples: Mbps mede <em>megabits por segundo</em>, enquanto MB/s mede <em>megabytes por segundo</em>. Como 1 byte tem 8 bits, um link de 500 Mbps tem um teto teórico próximo de 62,5 MB/s antes de considerar overhead, perdas, Wi-Fi, servidor de origem, criptografia, VPN, disco e processamento.\n  </p>\n  <p>\n    Essa diferença não é detalhe acadêmico. Ela aparece em chamados de suporte, testes de internet, dimensionamento de links, cópias de backup, replicação entre datacenters, ingestão de logs no SIEM, tráfego de cloud, pipelines que baixam imagens Docker, sincronização de repositórios, coleta forense e investigação de possível exfiltração. Uma leitura errada da unidade pode levar a conclusões completamente erradas.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> um usuário diz que a internet de 300 Mbps está ruim porque o navegador mostra 32 MB/s. Sem converter as unidades, alguém pode abrir chamado com o provedor, trocar equipamento ou alterar firewall sem necessidade. Na verdade, 32 MB/s equivalem a aproximadamente 256 Mbps úteis, o que pode ser aceitável dependendo do cenário.\n  </div>\n  <p>\n    Nesta aula, você vai aprender a pensar como profissional: primeiro identificar a unidade, depois converter, depois considerar overhead e só então diagnosticar. Essa habilidade será usada em todos os módulos seguintes, especialmente em Ethernet, Wi-Fi, TCP, VPN, cloud networking, firewalls, proxies e troubleshooting profissional.\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    A distinção entre bit e byte vem da própria história da computação. O bit surgiu como a menor unidade lógica de informação: um estado binário, como 0 ou 1. Já o byte se consolidou como um agrupamento prático de bits, normalmente 8, suficiente para representar muitos valores úteis em sistemas digitais. Nas aulas anteriores, vimos que bytes podem representar números, caracteres, partes de endereços, campos de protocolos e dados de aplicações.\n  </p>\n  <p>\n    Em comunicação, porém, o interesse inicial era medir quantos sinais ou bits conseguiam atravessar um meio por segundo. Por isso redes, telecomunicações e operadoras usam unidades como bps, Kbps, Mbps e Gbps. Essas unidades descrevem taxa de transmissão no meio ou no link. Em armazenamento e arquivos, a unidade natural passou a ser byte, porque arquivos são contados como conjuntos de bytes: KB, MB, GB, TB.\n  </p>\n  <p>\n    Essa diferença histórica criou uma fronteira prática: redes vendem e medem capacidade em bits por segundo; sistemas operacionais, navegadores e gerenciadores de download frequentemente exibem transferência em bytes por segundo. Quando o usuário cruza esses mundos sem converter, surge a confusão.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Área</th><th>Unidade comum</th><th>O que mede</th><th>Exemplo</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Telecom/rede</td><td>bps, Mbps, Gbps</td><td>Taxa de bits transmitidos por segundo</td><td>Link de 1 Gbps</td></tr>\n      <tr><td>Arquivos/sistemas</td><td>B/s, MB/s, GB/s</td><td>Quantidade de bytes movidos por segundo</td><td>Download a 40 MB/s</td></tr>\n      <tr><td>Armazenamento</td><td>GB, TB</td><td>Volume de dados armazenado</td><td>Backup de 200 GB</td></tr>\n      <tr><td>Cloud billing</td><td>GB transferidos</td><td>Volume trafegado cobrado</td><td>Egress de 500 GB/mês</td></tr>\n    </tbody>\n  </table>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema técnico é que a mesma transferência pode ser descrita por unidades diferentes. Um arquivo de 1 GB sendo baixado por uma conexão de 100 Mbps não baixa em 10 segundos apenas porque 100 parece maior que 1. É preciso converter unidades e lembrar que há overhead. A rede não transporta apenas o conteúdo do arquivo; ela transporta também quadros, pacotes, segmentos, cabeçalhos, confirmações, criptografia, retransmissões e controle.\n  </p>\n  <p>\n    Essa confusão causa erros operacionais. Um técnico pode interpretar um teste normal como problema. Um gestor pode comprar link acima do necessário ou abaixo do necessário. Um analista de segurança pode subestimar a velocidade de exfiltração de dados. Um engenheiro de cloud pode errar custo de tráfego por confundir taxa com volume. Um pipeline de DevSecOps pode parecer lento por causa da rede, quando o gargalo real está no registry, no disco, na CPU ou no TLS inspection.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Erro 1:</strong> comparar Mbps com MB/s diretamente.</li>\n    <li><strong>Erro 2:</strong> ignorar que 1 byte equivale a 8 bits.</li>\n    <li><strong>Erro 3:</strong> esperar que a taxa útil seja igual à taxa nominal do link.</li>\n    <li><strong>Erro 4:</strong> testar por Wi-Fi e concluir que o link contratado está ruim.</li>\n    <li><strong>Erro 5:</strong> medir um download de um servidor lento e culpar automaticamente a rede local.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Regra mental:</strong> links são anunciados em bits por segundo; arquivos normalmente aparecem em bytes. Para estimar MB/s a partir de Mbps, divida por 8. Para estimar Mbps a partir de MB/s, multiplique por 8.\n  </div>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    Em redes antigas, velocidades eram baixas e a diferença entre bits e bytes aparecia de forma mais visível. Com links de Kbps, cada byte importava. À medida que Ethernet, banda larga, fibra, Wi-Fi e links de datacenter evoluíram para centenas de Mbps, Gbps e Tbps, a confusão não desapareceu; ela ficou mais cara. Errar uma ordem de grandeza em um link de 10 Gbps pode significar comprar equipamento errado, subdimensionar firewall, pagar cloud egress desnecessário ou criar gargalo em backup.\n  </p>\n  <p>\n    Outra evolução foi a distância entre velocidade nominal e experiência real. Um cabo pode negociar 1 Gbps, mas o throughput útil pode ser menor por causa de TCP, TLS, MTU, VPN, inspeção de segurança, latência, perda, janela TCP, servidor remoto, armazenamento e CPU. No Wi-Fi, a diferença é ainda maior: velocidade de link não é o mesmo que throughput útil. O meio é compartilhado, sujeito a interferência e half-duplex na prática.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Conceito</th><th>O que significa</th><th>Exemplo</th><th>Limitação</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Velocidade nominal</td><td>Capacidade anunciada ou negociada do link</td><td>1 Gbps na placa de rede</td><td>Não garante taxa útil de aplicação</td></tr>\n      <tr><td>Throughput útil</td><td>Dados reais entregues à aplicação por tempo</td><td>90 MB/s copiando arquivo</td><td>Depende de protocolos e gargalos</td></tr>\n      <tr><td>Overhead</td><td>Bytes extras de controle, cabeçalho, criptografia e retransmissão</td><td>Ethernet + IP + TCP + TLS</td><td>Reduz a carga útil visível</td></tr>\n      <tr><td>Volume transferido</td><td>Total de dados movimentados</td><td>500 GB/mês em cloud</td><td>Não informa velocidade instantânea</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    <strong>Bit</strong> é a menor unidade lógica de informação binária, representada por 0 ou 1. <strong>Byte</strong> é um agrupamento de 8 bits. Em redes, usamos muito bits por segundo para medir capacidade de transmissão: bps, Kbps, Mbps, Gbps. Em arquivos, usamos muito bytes e bytes por segundo: B, KB, MB, GB, MB/s.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição operacional:</strong> Mbps mede quantos milhões de bits podem ser transmitidos por segundo. MB/s mede quantos milhões de bytes são transferidos por segundo. Como 1 byte = 8 bits, 100 Mbps equivalem teoricamente a 12,5 MB/s antes de overhead.\n  </div>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Link anunciado</th><th>Conta rápida</th><th>Teto teórico em MB/s</th><th>Observação</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>100 Mbps</td><td>100 ÷ 8</td><td>12,5 MB/s</td><td>Antes de overhead</td></tr>\n      <tr><td>300 Mbps</td><td>300 ÷ 8</td><td>37,5 MB/s</td><td>Wi-Fi e servidor podem reduzir</td></tr>\n      <tr><td>500 Mbps</td><td>500 ÷ 8</td><td>62,5 MB/s</td><td>Boa referência para fibra doméstica</td></tr>\n      <tr><td>1 Gbps</td><td>1000 ÷ 8</td><td>125 MB/s</td><td>Porta gigabit raramente entrega 125 MB/s úteis</td></tr>\n      <tr><td>10 Gbps</td><td>10000 ÷ 8</td><td>1250 MB/s</td><td>Exige NIC, cabo, switch, CPU e storage adequados</td></tr>\n    </tbody>\n  </table>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    Quando você baixa um arquivo, a aplicação recebe bytes úteis. Para esses bytes chegarem, várias camadas adicionam informações de controle. Em uma rede Ethernet comum usando TCP e HTTPS, um pedaço do arquivo pode estar dentro de um payload HTTP, que passa por TLS, TCP, IP e Ethernet. Cada camada adiciona cabeçalhos ou metadados necessários para entrega, segurança, confiabilidade ou controle.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>A aplicação</strong> solicita dados, por exemplo um arquivo via HTTPS.</li>\n    <li><strong>HTTP</strong> organiza requisição e resposta em mensagens de aplicação.</li>\n    <li><strong>TLS</strong> protege confidencialidade e integridade, adicionando custo de criptografia e registros próprios.</li>\n    <li><strong>TCP</strong> divide o fluxo, controla ordem, confirma recebimento e retransmite quando necessário.</li>\n    <li><strong>IP</strong> endereça origem e destino entre redes.</li>\n    <li><strong>Ethernet ou Wi-Fi</strong> transporta quadros no enlace local.</li>\n    <li><strong>A placa de rede e o meio físico</strong> transmitem sinais que representam bits.</li>\n  </ol>\n  <p>\n    O throughput útil é o que sobra para a aplicação depois de todo esse trabalho. Em redes boas, a perda por cabeçalhos pode parecer pequena, mas em cenários com VPN, túneis, fragmentação, retransmissão, Wi-Fi ruim, inspeção de TLS ou alta latência, a diferença pode ficar grande.\n  </p>\n  <div class=\"content-card\">\n    <strong>Fórmulas práticas:</strong>\n    <ul>\n      <li><code>MB/s ≈ Mbps ÷ 8</code></li>\n      <li><code>Mbps ≈ MB/s × 8</code></li>\n      <li><code>tempo em segundos ≈ tamanho em megabits ÷ taxa em Mbps</code></li>\n      <li><code>tamanho em megabits = tamanho em megabytes × 8</code></li>\n    </ul>\n  </div>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Em uma arquitetura corporativa, bit e byte aparecem em pontos diferentes. O link de internet pode ser contratado em Mbps ou Gbps. Interfaces de switch negociam 1G, 10G, 25G ou mais. Firewalls têm throughput máximo divulgado em Gbps, mas esse valor pode cair quando IPS, inspeção SSL, VPN ou logs detalhados são ativados. Storage e sistemas de backup costumam mostrar MB/s ou GB/s. Cloud cobra volume de dados trafegados, frequentemente em GB.\n  </p>\n  <ul>\n    <li><strong>Camada física/enlace:</strong> velocidade de interface, duplex, negociação, Wi-Fi rate.</li>\n    <li><strong>Camada de rede/transporte:</strong> overhead IP/TCP/UDP, perda, retransmissão, janela TCP.</li>\n    <li><strong>Camada de segurança:</strong> TLS, VPN, inspeção, proxy, WAF, firewall e criptografia.</li>\n    <li><strong>Camada de aplicação:</strong> tamanho de arquivos, compressão, cache, servidor de origem e cliente.</li>\n    <li><strong>Operação/cloud:</strong> billing por GB, ingestão de logs, egress, replicação e backup.</li>\n  </ul>\n  <p>\n    O erro arquitetural comum é dimensionar apenas pelo número de marketing. Um firewall anunciado como 5 Gbps pode não entregar 5 Gbps com todas as inspeções ligadas. Um link de 1 Gbps pode não resolver um backup lento se o gargalo estiver no disco. Um cluster Kubernetes pode demorar para baixar imagens não por causa do link, mas por limite do registry, autenticação, proxy ou armazenamento local.\n  </p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Imagine uma estrada e caminhões de entrega. A capacidade da estrada seria parecida com Mbps: quantos pequenos pedaços de informação podem passar por segundo. Já o arquivo entregue seria como a carga dentro dos caminhões, parecida com bytes. Só que os caminhões também carregam documentos, lacres, etiquetas, rotas e combustível. Esses itens não são a carga final, mas são necessários para a entrega. Isso se parece com overhead.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> redes não são estradas simples. Protocolos podem retransmitir, reordenar, criptografar, dividir pacotes, controlar congestionamento e compartilhar meio físico. A analogia ajuda a separar capacidade, carga útil e custo de transporte, mas não representa todos os mecanismos internos.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Você contratou 500 Mbps em casa. Ao baixar um arquivo, o navegador mostra 55 MB/s. A conta rápida é:\n  </p>\n  <pre class=\"code-block\"><code>55 MB/s × 8 = 440 Mbps</code></pre>\n  <p>\n    Isso não significa necessariamente problema. O teto teórico de 500 Mbps seria 62,5 MB/s, mas você está vendo 55 MB/s de dados úteis. Considerando overhead, servidor de origem, variação do link, Wi-Fi ou cabo, essa taxa pode estar muito boa. O diagnóstico correto começa pela conversão, não pela reclamação.\n  </p>\n  <div class=\"content-card\">\n    <strong>Atalho mental:</strong> se o download em MB/s multiplicado por 8 chega perto do plano em Mbps, o resultado pode estar normal. Se fica muito distante, investigue meio físico, Wi-Fi, cabo, duplex, roteador, CPU, VPN, firewall, servidor e horário.\n  </div>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Uma empresa tem um link de 1 Gbps entre matriz e filial. O time de backup reclama que a cópia de 500 GB está demorando. O cálculo bruto ajuda a criar expectativa: 500 GB são cerca de 4000 gigabits. Em um mundo ideal, a 1 Gbps, isso levaria cerca de 4000 segundos, ou pouco mais de 1 hora. Mas esse é o mínimo teórico. Na prática, há criptografia, janela TCP, latência, perda, armazenamento, deduplicação, compressão, firewall, IPS, horário de pico e limite do servidor.\n  </p>\n  <p>\n    O profissional não deve apenas dizer “o link é de 1 Gbps”. Ele precisa medir throughput útil, verificar gráficos de interface, erros, descarte, CPU do firewall, retransmissões TCP, taxa do storage, política de QoS e concorrência com outros tráfegos. Bit vs byte é o primeiro passo para transformar reclamação genérica em diagnóstico técnico.\n  </p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, a confusão ganha outra dimensão: velocidade e custo. Um serviço pode transferir dados a centenas de Mbps, mas a cobrança costuma aparecer por volume, como GB transferidos para fora da região, entre zonas ou para a internet. Um pipeline que baixa imagens grandes todos os dias pode não parecer pesado em velocidade instantânea, mas pode gerar custo relevante de egress e armazenamento de cache.\n  </p>\n  <p>\n    Outro exemplo: um NAT Gateway, load balancer, firewall gerenciado ou appliance virtual pode ter custo por hora, por GB processado ou por unidade de capacidade. Se o time confunde MB/s com Mbps, pode dimensionar errado ou interpretar métricas de forma ruim. Em arquitetura cloud, você precisa perguntar: qual é a taxa de pico, qual é o volume mensal, onde está o tráfego, há cobrança entre zonas, existe compressão, cache ou private endpoint, e quais logs serão armazenados?\n  </p>\n  <div class=\"callout callout--security\">\n    <strong>Impacto financeiro:</strong> mesmo que a ferramenta seja gratuita, tráfego cloud, armazenamento de logs e processamento por firewall/proxy podem gerar custo recorrente. Unidade correta evita surpresa na fatura.\n  </div>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em DevSecOps, pipelines baixam dependências, imagens de container, artefatos, pacotes, scanners e bases de vulnerabilidades. Um build lento pode ser atribuído à rede, mas o gargalo real pode estar em cache mal configurado, registry distante, proxy corporativo, autenticação, inspeção TLS, limite do runner, disco lento ou concorrência de jobs.\n  </p>\n  <p>\n    Ao analisar um pipeline, diferencie volume e taxa. Baixar uma imagem de 1,2 GB em 60 segundos equivale a aproximadamente 20 MB/s, ou 160 Mbps úteis. Isso pode estar normal para um runner compartilhado. Se a organização tem muitos builds paralelos, o tráfego total pode saturar link, NAT, proxy ou registry interno. A solução pode ser cache local, mirror de registry, compressão, imagens menores, camadas otimizadas, runners próximos do registry ou políticas de retenção.\n  </p>\n  <p>\n    Segurança também entra aqui: scanners, SBOMs, logs e artefatos geram dados. Se tudo é enviado para fora da rede ou para outra região, há impacto financeiro e risco de exposição. Unidade correta ajuda a dimensionar controles sem achismo.\n  </p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Em segurança, bits e bytes aparecem em estimativa de impacto. Se um alerta indica transferência de 80 MB/s para um destino externo por 10 minutos, isso não é “80 Mbps”. São 640 Mbps úteis. Em 10 minutos, o volume pode passar de dezenas de gigabytes. Essa diferença muda severidade, resposta a incidente, bloqueio, contenção e comunicação com gestão.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead>\n      <tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Subestimar exfiltração</td><td>Confundir MB/s com Mbps</td><td>Resposta lenta ou severidade incorreta</td><td>Converter unidades e calcular volume por tempo</td></tr>\n      <tr><td>Dimensionar SIEM errado</td><td>Confundir eventos, bytes e taxa de ingestão</td><td>Perda de logs ou custo inesperado</td><td>Medir EPS, GB/dia e retenção separadamente</td></tr>\n      <tr><td>Firewall subdimensionado</td><td>Ignorar queda de throughput com IPS/TLS</td><td>Gargalo ou desativação de controles</td><td>Validar throughput com recursos reais ativados</td></tr>\n      <tr><td>Falsa conclusão em speedtest</td><td>Teste por Wi-Fi ou VPN</td><td>Trocas desnecessárias e diagnóstico ruim</td><td>Testar cabeado, sem VPN, com múltiplas origens e métricas</td></tr>\n    </tbody>\n  </table>\n  <p>\n    Esta aula não ensina ataque. Ela ensina interpretação defensiva de métricas. Em ambientes reais, qualquer coleta de tráfego, teste de carga ou medição ativa deve ser autorizada e planejada para não causar indisponibilidade.\n  </p>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1000 430\" role=\"img\" aria-labelledby=\"m00l04-title m00l04-desc\">\n    <title id=\"m00l04-title\">Relação entre Mbps, MB/s, overhead e throughput útil</title>\n    <desc id=\"m00l04-desc\">Diagrama mostrando um link anunciado em Mbps, conversão para MB/s, perda por overhead e entrega de throughput útil para a aplicação.</desc>\n    <defs>\n      <marker id=\"m00l04-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"170\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"125\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Link nominal</text>\n    <text x=\"125\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">500 Mbps</text>\n    <rect x=\"280\" y=\"70\" width=\"190\" height=\"78\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"375\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Conversão</text>\n    <text x=\"375\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">500 ÷ 8 = 62,5 MB/s</text>\n    <rect x=\"550\" y=\"70\" width=\"190\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"645\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Overhead</text>\n    <text x=\"645\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Ethernet + IP + TCP + TLS</text>\n    <rect x=\"810\" y=\"70\" width=\"150\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"885\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"885\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">55 MB/s úteis</text>\n    <line x1=\"210\" y1=\"109\" x2=\"280\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"470\" y1=\"109\" x2=\"550\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"740\" y1=\"109\" x2=\"810\" y2=\"109\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <rect x=\"110\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"225\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Download observado</text>\n    <text x=\"225\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">55 MB/s × 8 = 440 Mbps</text>\n    <rect x=\"390\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"505\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Diagnóstico</text>\n    <text x=\"505\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">converter antes de concluir</text>\n    <rect x=\"670\" y=\"245\" width=\"230\" height=\"86\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"785\" y=\"278\" text-anchor=\"middle\" class=\"svg-label\">Risco</text>\n    <text x=\"785\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">unidade errada = decisão errada</text>\n    <line x1=\"885\" y1=\"148\" x2=\"225\" y2=\"245\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"340\" y1=\"288\" x2=\"390\" y2=\"288\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <line x1=\"620\" y1=\"288\" x2=\"670\" y2=\"288\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l04-arrow)\" />\n    <text x=\"500\" y=\"390\" text-anchor=\"middle\" class=\"svg-label\">A velocidade nominal do link não é igual à taxa útil vista pela aplicação.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios trabalham conversão e diagnóstico. O objetivo não é decorar números, mas ganhar fluência para interpretar speedtests, gráficos, downloads, backups, tráfego cloud e alertas de segurança.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula um chamado empresarial em que usuários, time de backup e segurança usam unidades diferentes. Você precisa organizar os dados, converter unidades e escrever uma recomendação técnica sem achismo.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra como separar capacidade nominal, throughput útil, volume total, overhead e gargalos externos. Essa separação é a base do troubleshooting profissional de performance.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Bit:</strong> menor unidade lógica de informação binária.</li>\n    <li><strong>Byte:</strong> conjunto de 8 bits.</li>\n    <li><strong>Mbps:</strong> megabits por segundo, comum em links de rede.</li>\n    <li><strong>MB/s:</strong> megabytes por segundo, comum em downloads e cópias de arquivo.</li>\n    <li><strong>Conta rápida:</strong> Mbps ÷ 8 ≈ MB/s teórico; MB/s × 8 ≈ Mbps.</li>\n    <li><strong>Overhead:</strong> custo de transporte, controle, cabeçalhos, criptografia e retransmissões.</li>\n    <li><strong>Erro comum:</strong> comparar Mbps e MB/s sem converter.</li>\n    <li><strong>Uso real:</strong> speedtest, backup, cloud billing, SIEM, VPN, firewall, Wi-Fi e pipelines.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    A próxima aula será <strong>0.5 — Como sinais físicos carregam dados</strong>. Depois de entender unidades de informação e velocidade, precisamos descer para o mundo físico: como cabos, fibra e rádio transportam sinais que representam bits. Isso abrirá caminho para Ethernet, Wi-Fi, interferência, duplex, ruído, perda e troubleshooting de camada física.\n  </p>\n</section>"
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
  "deepDive": {
    "mentalModel": "Capacidade de rede é medida em bits por segundo; dados úteis de arquivo normalmente são percebidos em bytes. Entre a capacidade nominal e a aplicação existe overhead e existem gargalos.",
    "keyTerms": [
      "bit",
      "byte",
      "bps",
      "Mbps",
      "MB/s",
      "Gbps",
      "throughput",
      "overhead",
      "goodput",
      "egress",
      "latência"
    ],
    "limitations": [
      "A conversão por 8 fornece teto teórico, não garantia de desempenho real.",
      "Speedtests medem um cenário específico, não todas as aplicações.",
      "Wi-Fi pode reduzir throughput por interferência, distância, canal, padrão e concorrência.",
      "VPN, TLS inspection, proxy e firewall podem mudar a taxa útil.",
      "Taxa de transferência não é igual a volume total nem a custo cloud."
    ],
    "whenToUse": [
      "Ao interpretar plano de internet, link corporativo ou porta de switch.",
      "Ao diagnosticar download, backup, replicação ou pipeline lento.",
      "Ao estimar tempo de transferência de arquivos.",
      "Ao analisar alertas de exfiltração ou tráfego incomum.",
      "Ao dimensionar firewall, proxy, VPN, NAT Gateway, SIEM ou registry."
    ],
    "whenNotToUse": [
      "Não use apenas a conversão por 8 para concluir SLA sem medir condições reais.",
      "Não compare speedtest por Wi-Fi com capacidade contratada sem isolar variáveis.",
      "Não use taxa média para estimar picos de tráfego sem observar métricas temporais.",
      "Não trate MB, MiB, GB e GiB como sempre idênticos em auditoria precisa."
    ],
    "operationalImpact": [
      "Ajuda a reduzir chamados indevidos por interpretação errada de velocidade.",
      "Melhora comunicação entre suporte, redes, segurança, cloud e desenvolvimento.",
      "Exige padronização de unidades em dashboards e relatórios.",
      "Facilita dimensionamento de janelas de backup e replicação."
    ],
    "financialImpact": [
      "Evita compra desnecessária de links ou appliances por erro de interpretação.",
      "Ajuda a estimar custos de egress, ingestão de logs e transferência entre regiões.",
      "Permite justificar cache, compressão, mirrors e otimização de artefatos.",
      "Reduz risco de subdimensionar firewall ou proxy e precisar trocar equipamento depois."
    ],
    "securityImpact": [
      "Melhora estimativa de volume em possível exfiltração.",
      "Ajuda a dimensionar ingestão de logs e retenção no SIEM.",
      "Evita desativar controles de segurança por culpá-los sem medição correta.",
      "Permite avaliar impacto de VPN, TLS inspection e proxy com mais precisão."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que 500 Mbps deveriam aparecer como 500 MB/s no navegador.",
      "whyItHappens": "As siglas são parecidas e muitos usuários não diferenciam b minúsculo de B maiúsculo.",
      "consequence": "Diagnóstico incorreto e chamados desnecessários.",
      "correction": "Dividir Mbps por 8 para obter o teto teórico em MB/s."
    },
    {
      "mistake": "Ignorar overhead dos protocolos.",
      "whyItHappens": "A conta Mbps ÷ 8 parece exata demais.",
      "consequence": "Expectativa irreal sobre taxa útil.",
      "correction": "Considerar cabeçalhos, criptografia, retransmissões e gargalos."
    },
    {
      "mistake": "Testar link corporativo por Wi-Fi e concluir problema no provedor.",
      "whyItHappens": "Wi-Fi é mais conveniente para testar rapidamente.",
      "consequence": "Culpa atribuída ao ponto errado.",
      "correction": "Testar cabeado, próximo ao roteador/switch, sem VPN, com múltiplos destinos."
    },
    {
      "mistake": "Confundir velocidade instantânea com volume mensal.",
      "whyItHappens": "Ambos aparecem como números de dados trafegados.",
      "consequence": "Erro em custo cloud, backup e capacidade de SIEM.",
      "correction": "Separar taxa por segundo de volume acumulado por período."
    }
  ],
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
        "then": "Considerar overhead normal e encerrar como comportamento aceitável ou monitorar."
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
      "Separar métricas de taxa, volume, latência, perda e retransmissão."
    ],
    "badPractices": [
      "Comparar Mbps e MB/s sem conversão.",
      "Usar um único speedtest por Wi-Fi como prova definitiva.",
      "Desativar inspeção de segurança sem medir gargalos corretamente.",
      "Subdimensionar SIEM olhando apenas eventos e ignorando bytes ingeridos.",
      "Confundir tráfego criptografado com tráfego seguro sem análise de destino, volume e comportamento."
    ],
    "commonErrors": [
      "Interpretar 50 MB/s como 50 Mbps.",
      "Esperar throughput útil igual à velocidade de interface.",
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
      "Dimensionar VPN e TLS inspection com margem.",
      "Segmentar redes para limitar impacto de transferências anômalas.",
      "Definir alertas por volume e por taxa, não apenas por conexão."
    ],
    "detectionIdeas": [
      "Alertar quando um host mantém taxa de saída incomum por muitos minutos.",
      "Correlacionar upload externo com processo, usuário e destino.",
      "Comparar taxa atual com baseline por horário e função do ativo.",
      "Verificar se aumento de tráfego coincide com backup, pipeline ou incidente.",
      "Converter unidades automaticamente nos relatórios para evitar ambiguidade."
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
      "type": "conceito",
      "q": "100 Mbps equivalem teoricamente a aproximadamente quanto em MB/s?",
      "opts": [
        "100 MB/s",
        "80 MB/s",
        "12,5 MB/s",
        "1,25 MB/s"
      ],
      "a": 2,
      "exp": "Como 1 byte tem 8 bits, 100 Mbps ÷ 8 = 12,5 MB/s antes de overhead.",
      "difficulty": "iniciante",
      "topic": "conversão"
    },
    {
      "id": "q0.4.2",
      "type": "diagnóstico",
      "q": "Um download aparece como 50 MB/s. Qual é a taxa aproximada em Mbps?",
      "opts": [
        "50 Mbps",
        "100 Mbps",
        "250 Mbps",
        "400 Mbps"
      ],
      "a": 3,
      "exp": "50 MB/s × 8 = 400 Mbps.",
      "difficulty": "iniciante",
      "topic": "conversão"
    },
    {
      "id": "q0.4.3",
      "type": "comparação",
      "q": "Qual afirmação está correta?",
      "opts": [
        "Mbps e MB/s são a mesma unidade.",
        "MB/s mede megabits por segundo.",
        "Mbps é comum para links; MB/s é comum para downloads.",
        "1 byte tem 10 bits em redes."
      ],
      "a": 2,
      "exp": "Links são normalmente medidos em bits por segundo; downloads e arquivos frequentemente aparecem em bytes por segundo.",
      "difficulty": "iniciante",
      "topic": "unidades"
    },
    {
      "id": "q0.4.4",
      "type": "cenário",
      "q": "Por que um link de 1 Gbps raramente entrega 125 MB/s úteis exatos para a aplicação?",
      "opts": [
        "Porque 1 Gbps não existe.",
        "Por causa de overhead, gargalos e condições reais.",
        "Porque byte e bit são iguais.",
        "Porque HTTP sempre limita tudo a 10 MB/s."
      ],
      "a": 1,
      "exp": "O teto teórico é 125 MB/s, mas protocolos, criptografia, retransmissões, servidor, disco e outros fatores reduzem a taxa útil.",
      "difficulty": "intermediário",
      "topic": "overhead"
    },
    {
      "id": "q0.4.5",
      "type": "segurança",
      "q": "Em um alerta de possível exfiltração, por que é perigoso confundir 80 MB/s com 80 Mbps?",
      "opts": [
        "Porque 80 MB/s equivalem a aproximadamente 640 Mbps.",
        "Porque 80 MB/s sempre significam zero tráfego.",
        "Porque Mbps é unidade de armazenamento.",
        "Porque exfiltração não usa rede."
      ],
      "a": 0,
      "exp": "80 MB/s multiplicados por 8 equivalem a 640 Mbps, alterando a estimativa de volume e severidade.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q0.4.6",
      "type": "cloud",
      "q": "Em cloud, qual diferença é essencial para estimar custo de tráfego?",
      "opts": [
        "Taxa instantânea e volume acumulado.",
        "Mouse e teclado.",
        "ASCII e monitor.",
        "CPU e cor do cabo."
      ],
      "a": 0,
      "exp": "Velocidade indica taxa; cobrança costuma considerar volume transferido, como GB de egress.",
      "difficulty": "intermediário",
      "topic": "cloud"
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
