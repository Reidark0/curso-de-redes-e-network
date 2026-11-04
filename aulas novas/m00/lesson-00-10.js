export const lesson0010 = {
  "id": "0.10",
  "moduleId": "m00",
  "order": 10,
  "title": "Revisão do Módulo 0",
  "subtitle": "Mapa mental, pares que confundem, checklist de prontidão e prática para começar Fundamentos de Redes.",
  "duration": "70-100 min",
  "estimatedStudyTimeMinutes": 100,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 200,
  "tags": [
    "fundamentos",
    "revisão",
    "simulado",
    "checklist",
    "mapa mental",
    "troubleshooting",
    "segurança",
    "preparação"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A revisão começa pela ideia de que computadores representam informação em estados digitais."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A revisão cobra diferença entre bit, byte, binário, hexadecimal e octetos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.3",
      "reason": "A revisão cobra codificação de texto, UTF-8, Base64 e o erro de confundir codificação com criptografia."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.4",
      "reason": "A revisão cobra conversão entre bps, B/s, volume, overhead e throughput útil."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "A revisão cobra a diferença entre dado abstrato e sinal físico em cobre, fibra e rádio."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.6",
      "reason": "A revisão cobra latência, largura de banda, throughput, perda, jitter e gargalos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.7",
      "reason": "A revisão cobra protocolo como contrato de comunicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "A revisão cobra pensamento em camadas como método de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.9",
      "reason": "A revisão usa o laboratório integrador como evidência de aprendizagem."
    }
  ],
  "objectives": [
    "Revisar os conceitos essenciais do Módulo 0 sem transformar a revisão em lista decorada.",
    "Criar um mapa mental que conecte informação, bits, bytes, codificação, sinais, métricas, protocolos e camadas.",
    "Identificar lacunas antes de iniciar Fundamentos de Redes.",
    "Treinar interpretação de cenários, comandos, evidências e sintomas comuns.",
    "Preparar o aluno para entender topologia, enlace, endereço, protocolo, serviço e troubleshooting no Módulo 1."
  ],
  "learningOutcomes": [
    "O aluno consegue explicar a diferença entre informação, dado, bit, byte, sinal e interpretação.",
    "O aluno consegue converter mentalmente conceitos básicos entre bps, B/s, volume e throughput útil.",
    "O aluno consegue explicar por que Base64 não é criptografia e por que isso importa em segurança.",
    "O aluno consegue diferenciar latência, largura de banda, throughput, perda e jitter em um cenário real.",
    "O aluno consegue montar um diagnóstico inicial por camadas sem pular diretamente para conclusões."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Nenhum chamado chega dizendo \"há perda intermitente na camada física, RTT alto, falha de resolução de nome e timeout na aplicação\". Ele chega como <strong>\"está lento\"</strong>, <strong>\"não acessa\"</strong>, <strong>\"o sistema caiu\"</strong> ou <strong>\"o login não funciona\"</strong>. O que separa o iniciante perdido do profissional em evolução é decompor esse sintoma em partes verificáveis.\n  </p>\n  <p>\n    Bits, bytes, hexadecimal, UTF-8, Base64, sinal físico, latência, throughput, protocolo e camadas são as ferramentas dessa decomposição. Nesta revisão você junta essas peças num modelo mental único, confere o que ainda está frágil e chega ao Módulo 1 sabendo o que atravessa a rede, como isso vira sinal, como é medido e em que camada investigar cada falha.\n  </p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    Um único acesso a uma página envolve sinal físico, enlace local, endereço lógico, resolução de nome, transporte, criptografia, protocolo de aplicação, autenticação, autorização, logs e políticas. Cada camada esconde complexidade, mas não a elimina: quando algo falha, sem um mapa mental qualquer falha parece misteriosa. Cada fundamento do Módulo 0 resolve uma parte disso:\n  </p>\n  <ul>\n    <li>Sem bits e bytes, você não entende o que está sendo transportado.</li>\n    <li>Sem binário e hexadecimal, você sofre para interpretar endereços, máscaras, dumps e identificadores.</li>\n    <li>Sem codificação, você confunde texto, bytes, Base64, criptografia e serialização.</li>\n    <li>Sem métricas, você chama qualquer problema de lentidão.</li>\n    <li>Sem protocolo, bytes não têm significado.</li>\n    <li>Sem camadas, você pula etapas e diagnostica por achismo.</li>\n  </ul>\n  <div class=\"callout warning\">\n    <strong>Erro de base:</strong> estudar IP, TCP, DNS e HTTP sem entender representação, métrica, protocolo e camada gera memorização frágil: você repete definições, mas trava na hora de diagnosticar.\n  </div>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> revisar tecnicamente não é reler tudo. É reconstruir o caminho lógico dos fundamentos (representação, codificação, transmissão, medição, protocolo, camada, evidência e segurança) e verificar se você consegue usá-los num cenário novo.\n  </div>\n\n  <h3>O módulo, aula a aula</h3>\n  <p>Cada aula acrescentou um tipo de raciocínio, não só um termo novo.</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table comparison-table\">\n      <thead>\n        <tr><th>Aula</th><th>Ideia central</th><th>Problema que resolve</th><th>Prepara para</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>0.1</td><td>Informação precisa virar estados digitais</td><td>Entender o que é dado para o computador</td><td>bits, bytes, pacotes e sinais</td></tr>\n        <tr><td>0.2</td><td>Bits e bytes podem ser lidos em bases diferentes</td><td>Interpretar endereços e dumps</td><td>MAC, IPv4, IPv6, máscaras e hex dumps</td></tr>\n        <tr><td>0.3</td><td>Texto precisa de codificação</td><td>Evitar confundir texto, bytes e segredo</td><td>HTTP, APIs, tokens, logs e IAM</td></tr>\n        <tr><td>0.4</td><td>Bit e byte medem coisas diferentes</td><td>Interpretar velocidade, volume e overhead</td><td>throughput, links, cloud billing e backups</td></tr>\n        <tr><td>0.5</td><td>Bits viajam como sinais físicos</td><td>Entender falhas de cabo, fibra e rádio</td><td>Ethernet, Wi-Fi e camada física</td></tr>\n        <tr><td>0.6</td><td>Desempenho tem várias métricas</td><td>Separar latência, banda, vazão e perda</td><td>troubleshooting, VPN, proxy e cloud</td></tr>\n        <tr><td>0.7</td><td>Protocolo é contrato</td><td>Dar significado e ordem aos bytes</td><td>TCP, UDP, DNS, HTTP, TLS e APIs</td></tr>\n        <tr><td>0.8</td><td>Camadas organizam diagnóstico</td><td>Evitar conclusões prematuras</td><td>Modelo OSI e TCP/IP</td></tr>\n        <tr><td>0.9</td><td>Evidência transforma teoria em prática</td><td>Documentar investigação técnica</td><td>troubleshooting profissional</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n  <h3>Pares que você não pode confundir</h3>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Par</th><th>Diferença</th><th>Na prática</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>Informação × dado</td><td>Informação é o significado humano ou operacional; dado é a representação processável.</td><td>\"Senha do usuário\" é informação; os bytes gravados são dado.</td></tr>\n        <tr><td>Bit × byte</td><td>Bit é a menor unidade binária (0 ou 1); byte é um grupo de 8 bits.</td><td>Link de 100 Mbps entrega no máximo 100 ÷ 8 = 12,5 MB/s, antes do overhead. Um arquivo de 1 GB (1.000 MB) leva pelo menos 80 s.</td></tr>\n        <tr><td>Codificação × criptografia</td><td>UTF-8 e Base64 só mudam a representação e qualquer um reverte; criptografia protege a confidencialidade.</td><td>Token em Base64 num log está exposto, não protegido.</td></tr>\n        <tr><td>Largura de banda × throughput</td><td>Banda é a capacidade nominal; throughput é a vazão útil observada.</td><td>Overhead, Wi-Fi, servidor remoto, proxy e congestionamento reduzem o throughput.</td></tr>\n        <tr><td>Latência × largura de banda</td><td>Latência mede tempo (ms, RTT no ping); banda mede capacidade.</td><td>Página que demora a cada clique pode ter banda sobrando e latência alta.</td></tr>\n        <tr><td>Perda × jitter</td><td>Perda é o percentual de pacotes que não chegam; jitter é a variação da latência entre pacotes.</td><td>Os dois degradam voz e vídeo mesmo com banda sobrando.</td></tr>\n        <tr><td>Conectividade × autorização</td><td>Ping ou porta respondendo mostra caminho; não mostra permissão.</td><td>HTTP 403 prova que houve resposta: o serviço negou o acesso.</td></tr>\n        <tr><td>Protocolo × aplicação</td><td>Protocolo é o contrato (formato, ordem, estado, erro, significado); a aplicação usa esse contrato.</td><td>HTTP funcionando não garante que a regra de negócio esteja certa.</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"callout warning\">\n    <strong>Erros comuns na revisão:</strong>\n    <ul>\n      <li><strong>Só reler o conteúdo.</strong> Reler dá sensação de familiaridade, mas não de aplicação. Responda os exercícios, explique em voz alta e monte relações.</li>\n      <li><strong>Confundir termos parecidos.</strong> Os pares acima aparecem juntos e geram diagnósticos errados; revise-os pela tabela, com exemplos.</li>\n      <li><strong>Pular camadas no diagnóstico.</strong> O sintoma visível quase sempre aparece na aplicação, e daí se culpa aplicação, DNS ou firewall sem evidência. Comece por perguntas simples e suba a pilha com evidências.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    O raciocínio do Módulo 0 é uma cadeia: cada etapa depende da anterior e acrescenta um novo tipo de pergunta. É o primeiro ensaio do que você fará em redes, decompor um sistema complexo em partes observáveis e testáveis.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Informação:</strong> o que queremos representar? Um número, um texto, uma imagem, uma instrução, um pacote, uma credencial?</li>\n    <li><strong>Representação:</strong> como essa informação vira bits e bytes?</li>\n    <li><strong>Forma humana:</strong> vamos ler esses bytes em decimal, binário, hexadecimal ou texto?</li>\n    <li><strong>Codificação:</strong> se for texto, qual encoding transforma caracteres em bytes?</li>\n    <li><strong>Transmissão:</strong> como os bits saem da máquina como sinal elétrico, óptico ou rádio?</li>\n    <li><strong>Medição:</strong> qual é a taxa, latência, perda, jitter e throughput útil?</li>\n    <li><strong>Protocolo:</strong> qual contrato define formato, ordem, estado, erro e significado?</li>\n    <li><strong>Camada:</strong> em qual nível da pilha a evidência aponta uma falha?</li>\n    <li><strong>Segurança:</strong> quais dados podem vazar, ser adulterados, mal interpretados ou registrados indevidamente?</li>\n  </ol>\n\n  <h3>Checklist de prontidão para o Módulo 1</h3>\n  <p>Marque só o que você consegue fazer sem consultar. Cada item que travar é uma lacuna de fundamento: volte à aula indicada antes de avançar.</p>\n  <ul>\n    <li>Explicar a diferença entre informação, dado, bit, byte, sinal e interpretação (0.1, 0.2, 0.5).</li>\n    <li>Ler um byte em binário, decimal e hexadecimal (0.2).</li>\n    <li>Dizer por que Base64 não é criptografia e por que isso importa em segurança (0.3).</li>\n    <li>Converter Mbps em MB/s e estimar o tempo de uma transferência, lembrando do overhead (0.4).</li>\n    <li>Diferenciar latência, largura de banda, throughput, perda e jitter num cenário real (0.6).</li>\n    <li>Explicar protocolo como contrato e dizer o que um teste prova e o que não prova (0.7, 0.9).</li>\n    <li>Montar um diagnóstico inicial por camadas sem pular direto para a conclusão (0.8).</li>\n  </ul>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense no Módulo 0 como aprender a ler antes de frequentar bibliotecas. Bits são as letras na forma mais básica; bytes são pequenos blocos; codificações dizem como letras viram símbolos compreensíveis; protocolos são as regras da conversa; métricas dizem se a conversa está rápida, lenta, interrompida ou congestionada. Camadas ajudam a descobrir se o problema está na voz, no idioma, na regra da conversa, no correio ou na autorização para entrar na sala.\n  </p>\n  <p><strong>Limite da analogia:</strong> computadores não entendem significado; processam estados, bytes e regras formais.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Você abre um site. Nessa ação simples aparece o módulo inteiro: o texto da URL é codificado; o navegador envia bytes; esses bytes atravessam o Wi-Fi como sinal de rádio; a conexão tem latência; o download mede throughput; os protocolos definem as mensagens; e o diagnóstico pode ser separado por camadas.\n  </p>\n  <p>\n    Se o site demora, a causa pode ser sinal Wi-Fi ruim, DNS lento, proxy, servidor distante, perda de pacotes, largura de banda saturada, erro de TLS, aplicação lenta ou autenticação falhando. O Módulo 0 não resolve tudo sozinho, mas ensina a não tratar essas hipóteses como a mesma coisa.\n  </p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Um usuário reclama que o sistema financeiro está lento. A revisão orienta perguntas em ordem, de baixo para cima: o sinal físico está estável? O problema ocorre no cabo e no Wi-Fi? A latência até o gateway está normal? A resolução de nome responde? A porta está acessível? O protocolo retorna erro? O problema está no login? Há proxy ou inspeção TLS? Existem logs de bloqueio?\n  </p>\n  <p>\n    Esse raciocínio evita que o time compre mais banda quando o problema é DNS, troque o firewall quando o problema é a aplicação ou culpe a autenticação quando o problema é conectividade básica.\n  </p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps e cloud</h2>\n  <p>\n    Pipelines acessam registries, APIs, clusters, cofres de segredo, provedores cloud e sistemas de identidade. Quando uma etapa falha, o log pode mostrar timeout, erro TLS, HTTP 403, DNS inexistente, conexão recusada ou token inválido. Cada mensagem aponta uma camada ou contrato diferente:\n  </p>\n  <ul>\n    <li>timeout não é necessariamente senha errada;</li>\n    <li>403 não é necessariamente rede;</li>\n    <li>Base64 em um secret não significa criptografia;</li>\n    <li>throughput baixo num runner pode ser gargalo de rede, disco, CPU, proxy ou serviço remoto.</li>\n  </ul>\n  <p>\n    Cloud não elimina esses fundamentos, só os desloca para serviços gerenciados. Você não vê o cabo nem a fibra entre regiões, mas continua pagando por tráfego, sofrendo com latência e depurando DNS e TLS. Quanto mais gerenciado o serviço, mais você depende de evidências: métricas, logs, códigos de erro, políticas, rotas, security groups, endpoints privados e custos de transferência.\n  </p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>\n    Ataques, falhas e incidentes deixam rastros em bytes, protocolos, logs, métricas e camadas. O analista precisa reconhecer quando um dado foi apenas codificado, quando um protocolo está em texto claro, quando uma latência anormal pode indicar túnel, quando um volume de saída pode sugerir exfiltração e quando uma política de bloqueio está funcionando.\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table risk-table\">\n      <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n      <tbody>\n        <tr><td>Diagnóstico sem camada</td><td>Abertura de regra any-any para \"testar\"</td><td>Aumento da superfície de ataque</td><td>Testes mínimos, temporários, registrados e justificados</td></tr>\n        <tr><td>Métrica mal interpretada</td><td>Volume alto de saída tratado como normal</td><td>Possível vazamento despercebido</td><td>Baselines, alertas e investigação por protocolo/destino</td></tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1080 620\" role=\"img\" aria-labelledby=\"m00l10-title m00l10-desc\">\n    <title id=\"m00l10-title\">Mapa mental do Módulo 0</title>\n    <desc id=\"m00l10-desc\">Diagrama conectando informação, bits, bytes, codificação, sinais, métricas, protocolos, camadas, evidências e o Módulo 1.</desc>\n    <defs>\n      <marker id=\"m00l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"420\" y=\"40\" width=\"240\" height=\"70\" rx=\"16\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"540\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Módulo 0</text>\n    <text x=\"540\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fundamentos antes das redes</text>\n\n    <rect x=\"60\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"150\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Informação</text>\n    <text x=\"150\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sentido humano</text>\n\n    <rect x=\"290\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"380\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Bits e bytes</text>\n    <text x=\"380\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">representação</text>\n\n    <rect x=\"520\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"610\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Codificação</text>\n    <text x=\"610\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">UTF-8, Base64</text>\n\n    <rect x=\"750\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"840\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Sinais</text>\n    <text x=\"840\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cobre, fibra, rádio</text>\n\n    <rect x=\"160\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"255\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Métricas</text>\n    <text x=\"255\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">latência, vazão, perda</text>\n\n    <rect x=\"445\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"540\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Protocolos</text>\n    <text x=\"540\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">contratos e estados</text>\n\n    <rect x=\"730\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"825\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Camadas</text>\n    <text x=\"825\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">diagnóstico</text>\n\n    <rect x=\"295\" y=\"500\" width=\"490\" height=\"78\" rx=\"16\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"540\" y=\"532\" text-anchor=\"middle\" class=\"svg-label\">Módulo 1 — Fundamentos de Redes</text>\n    <text x=\"540\" y=\"556\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">topologia, enlace, endereço, serviço e troubleshooting inicial</text>\n\n    <line x1=\"540\" y1=\"110\" x2=\"150\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"380\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"610\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"840\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"380\" y1=\"242\" x2=\"255\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"610\" y1=\"242\" x2=\"540\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"840\" y1=\"242\" x2=\"825\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"255\" y1=\"402\" x2=\"430\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"402\" x2=\"540\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"825\" y1=\"402\" x2=\"650\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Modelo mental:</strong> informação → representação → codificação → sinal → métrica → protocolo → camada → evidência → decisão.</li>\n    <li><strong>O que lembrar:</strong> bits formam bytes; bytes precisam de interpretação; sinais transportam bits; métricas medem comportamento; protocolos definem contratos; camadas organizam o diagnóstico.</li>\n    <li><strong>Pares críticos:</strong> Mbps ≠ MB/s (÷ 8); Base64 ≠ criptografia; banda ≠ throughput; latência ≠ banda; ping ou porta aberta ≠ autorização.</li>\n    <li><strong>Erro comum:</strong> decorar termos sem conseguir usá-los em sintomas reais; todo teste prova algo limitado.</li>\n    <li><strong>Uso real:</strong> ler logs, interpretar dumps, entender métricas, diagnosticar conectividade, proteger evidências e conversar melhor com times técnicos.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    O Módulo 1 — Fundamentos de Redes começa por <strong>O que é uma rede e por que existe</strong>: com a base do Módulo 0, você passa a estudar a rede como sistema de dispositivos, meios, endereços, protocolos, serviços e políticas, rumo a topologias, LAN, WAN, switches, roteadores e endereçamento.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Preparatório para todas as camadas",
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
      "Ethernet",
      "IPv4",
      "ICMP",
      "DNS",
      "TCP",
      "UDP",
      "TLS",
      "HTTP"
    ],
    "dependsOn": [
      "aulas 0.1 até 0.9"
    ],
    "enables": [
      "Fundamentos de Redes",
      "Modelo OSI",
      "Ethernet",
      "IPv4",
      "TCP/UDP",
      "DNS",
      "HTTP/TLS",
      "Troubleshooting"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O aluno não consegue explicar a diferença entre Mbps e MB/s.",
      "O aluno confunde Base64 com criptografia.",
      "O aluno não sabe onde começar diante de uma falha de acesso.",
      "O aluno sabe comandos, mas não sabe interpretar o que eles provam."
    ],
    "diagnosticQuestions": [
      "Eu consigo explicar este conceito sem usar apenas a definição decorada?",
      "Eu consigo dar um exemplo doméstico e um exemplo empresarial?",
      "Eu sei qual evidência provaria ou enfraqueceria minha hipótese?",
      "Eu sei o que este teste não prova?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\nping 8.8.8.8\ntracert 8.8.8.8\nTest-NetConnection example.com -Port 443",
        "purpose": "Revisar a coleta básica de IP, gateway, DNS, RTT, caminho e porta (o último comando roda no PowerShell).",
        "expectedObservation": "Endereço local, gateway, servidores DNS, respostas ICMP ou falhas, caminho e teste TCP.",
        "interpretation": "Essas evidências ajudam a separar configuração local, caminho, latência e porta, mas não provam autorização nem saúde da aplicação."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\nping -c 4 8.8.8.8\ntraceroute 8.8.8.8\ncurl -I https://example.com",
        "purpose": "Revisar a mesma coleta básica em Linux.",
        "expectedObservation": "Interfaces, rota default, RTT, caminho e headers HTTP.",
        "interpretation": "ip addr mostra interfaces e IPs; ip route, a rota default (gateway); ping, RTT e perda; traceroute, o caminho e onde o atraso aparece; curl -I, o código de status HTTP (ex.: 200, 403) e os headers. Nenhum deles prova autorização do usuário nem saúde completa da aplicação."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow interfaces status\nshow running-config | include hostname",
        "purpose": "Revisar a ideia de estado de interface e evidência em equipamento de rede.",
        "expectedObservation": "Lista de interfaces com IP, Status e Protocol; em switches Catalyst, show interfaces status mostra connected/notconnect, VLAN, duplex e velocidade; e o hostname do equipamento.",
        "interpretation": "up/up indica camadas 1 e 2 ativas; administratively down indica interface desligada por shutdown; down/down aponta para cabo, porta ou o equipamento do outro lado. Equipamentos de rede também fornecem evidências por camada."
      }
    ],
    "decisionTree": [
      {
        "if": "Não há conectividade nem com o gateway",
        "then": "Revisar camada física, Wi-Fi, IP, máscara, VLAN e estado da interface."
      },
      {
        "if": "Gateway responde, mas nomes não resolvem",
        "then": "Investigar DNS antes de culpar aplicação."
      },
      {
        "if": "Porta TCP responde, mas login falha",
        "then": "Separar conectividade de autenticação/autorização."
      },
      {
        "if": "Download é menor que o plano contratado",
        "then": "Verificar unidade, overhead, Wi-Fi, servidor remoto, congestionamento e gargalo local."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Sanitizar evidências antes de compartilhar: mascarar tokens, IPs internos, nomes de hosts e dados pessoais em prints.",
      "Diferenciar codificação de criptografia.",
      "Registrar hipóteses e limites de cada teste.",
      "Usar testes autorizados, mínimos e defensivos."
    ],
    "badPractices": [
      "Abrir regra ampla de firewall só para testar sem justificativa.",
      "Colar secrets em tickets ou chats.",
      "Compartilhar logs brutos sem revisão.",
      "Assumir que todo erro 403 é problema de rede.",
      "Assumir que todo timeout é problema de aplicação."
    ],
    "commonErrors": [
      "Confundir disponibilidade com autorização.",
      "Confundir encoding com criptografia.",
      "Confundir ping bem-sucedido com aplicação saudável."
    ],
    "vulnerabilities": [
      {
        "name": "Vazamento de evidências técnicas",
        "description": "Relatórios e prints podem conter tokens, nomes internos, IPs, caminhos, headers e informações de infraestrutura.",
        "defensiveExplanation": "Evidência é necessária, mas deve ser minimizada e sanitizada.",
        "mitigation": "Mascarar dados sensíveis, usar canais corretos e manter retenção adequada."
      },
      {
        "name": "Falsa sensação de segurança por Base64",
        "description": "Dados codificados podem parecer protegidos, mas são reversíveis.",
        "defensiveExplanation": "Base64 é representação textual, não controle de confidencialidade.",
        "mitigation": "Usar criptografia, cofres de segredo e políticas de log seguro."
      }
    ],
    "monitoring": [
      "Logs de autenticação",
      "Logs de proxy e firewall",
      "Métricas de latência e throughput",
      "Eventos de erro HTTP",
      "Alertas de exposição de segredo"
    ],
    "hardening": [
      "Mascaramento de logs",
      "Menor privilégio",
      "Segregação de ambientes",
      "Revisão de evidências antes de compartilhamento"
    ],
    "detectionIdeas": [
      "Detectar aumento anormal de tráfego",
      "Detectar tokens em logs",
      "Detectar abertura excessiva de regras",
      "Detectar falhas repetidas de autenticação/autorização"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual foi a ideia mais importante do Módulo 0 para sua atuação em segurança?",
      "hints": [
        "Pense em evidências, codificação, protocolos e camadas.",
        "Evite responder apenas com o conceito mais difícil."
      ],
      "expectedIdeas": [
        "evidência",
        "camadas",
        "Base64 não é criptografia",
        "protocolos",
        "métricas"
      ],
      "explanation": "A resposta ideal liga um fundamento a uma situação real de trabalho (ex.: Base64 num log, 403 num pipeline), em vez de só citar o conceito mais difícil."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário diz que o sistema está fora. Que perguntas do Módulo 0 ajudam a organizar o diagnóstico inicial?",
      "hints": [
        "Conectividade é diferente de aplicação.",
        "Autenticação é diferente de autorização."
      ],
      "expectedIdeas": [
        "sinal",
        "IP",
        "DNS",
        "latência",
        "porta",
        "protocolo",
        "login",
        "política"
      ],
      "explanation": "A pergunta testa se o aluno consegue decompor um sintoma vago."
    },
    {
      "type": "cenário real",
      "question": "Você encontrou uma string em Base64 em um log. O que pode e o que não pode concluir?",
      "hints": [
        "Base64 é reversível.",
        "Não assuma que é segredo sem contexto."
      ],
      "expectedIdeas": [
        "codificação",
        "não criptografia",
        "decodificação segura",
        "sanitização",
        "verificar contexto"
      ],
      "explanation": "A resposta deve evitar tanto alarmismo quanto negligência."
    }
  ],
  "quiz": [
    {
      "id": "q0.10.2",
      "question": "Por que Base64 não deve ser tratado como proteção de segredo?",
      "options": [
        "Porque só funciona em Linux.",
        "Porque é uma codificação reversível, não criptografia.",
        "Porque altera a senha permanentemente.",
        "Porque impede leitura por aplicações."
      ],
      "answer": 1,
      "explanation": "Base64 representa bytes em texto e pode ser revertido facilmente.",
      "topic": "codificação",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.10.3",
      "question": "Ping para um destino responde. O que isso NÃO prova sozinho?",
      "options": [
        "Que houve resposta dentro de certo tempo.",
        "Que há algum tipo de conectividade ICMP.",
        "Que a aplicação web está saudável e que o usuário tem autorização.",
        "Que o destino estava alcançável por ICMP naquele momento."
      ],
      "answer": 2,
      "explanation": "Ping pode indicar conectividade básica, mas não prova HTTP, TLS, login, autorização ou saúde da aplicação.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q0.10.4",
      "question": "Qual é a diferença prática entre largura de banda e throughput?",
      "options": [
        "Largura de banda é a capacidade nominal; throughput é a vazão útil observada.",
        "Largura de banda é a vazão medida no download; throughput é o tempo de resposta do servidor.",
        "Throughput é a capacidade contratada do link; largura de banda é o que sobra depois do overhead.",
        "Largura de banda mede atraso em ms; throughput mede perda de pacotes."
      ],
      "answer": 0,
      "explanation": "Throughput real sofre impacto de overhead, congestionamento, servidor, cliente, Wi-Fi, proxy e outras condições.",
      "topic": "métricas",
      "difficulty": "iniciante-intermediário",
      "type": "comparação"
    },
    {
      "id": "q0.10.5",
      "question": "Qual atitude representa melhor pensamento em camadas?",
      "options": [
        "Liberar temporariamente o firewall para eliminar a camada de política e simplificar o teste.",
        "Começar pela aplicação, porque é onde o usuário vê o erro, e só olhar a rede se o log da aplicação estiver limpo.",
        "Rodar todos os comandos disponíveis de uma vez e escolher a causa que aparecer em mais saídas.",
        "Separar hipóteses físicas, de rede, transporte, aplicação, identidade e política e testar cada uma com evidência antes de concluir."
      ],
      "answer": 3,
      "explanation": "Pensar em camadas é organizar investigação por dependências e evidências.",
      "topic": "camadas",
      "difficulty": "iniciante",
      "type": "camadas"
    },
    {
      "id": "q0.10.6",
      "question": "Um pipeline falha com HTTP 403. Qual conclusão é mais segura inicialmente?",
      "options": [
        "A rede física certamente caiu.",
        "Há resposta do serviço, mas pode haver problema de autorização, política, identidade ou escopo de credencial.",
        "O DNS certamente está quebrado.",
        "A largura de banda está insuficiente."
      ],
      "answer": 1,
      "explanation": "403 indica resposta HTTP de negação; não deve ser confundido automaticamente com queda de rede.",
      "topic": "DevSecOps",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q0.10.7",
      "type": "cálculo",
      "question": "Um link de 200 Mbps está livre. Qual é o máximo teórico de download em MB/s, antes do overhead?",
      "options": [
        "1.600 MB/s",
        "200 MB/s",
        "25 MB/s",
        "20 MB/s"
      ],
      "answer": 2,
      "explanation": "1 byte = 8 bits, então 200 ÷ 8 = 25 MB/s. Na prática o throughput fica abaixo disso por overhead, Wi-Fi, servidor remoto e congestionamento.",
      "difficulty": "iniciante",
      "topic": "métricas"
    },
    {
      "id": "q0.10.8",
      "type": "cenário",
      "question": "Um download grande atinge quase toda a velocidade contratada, mas um sistema web interativo demora a responder a cada clique. Qual métrica investigar primeiro?",
      "options": [
        "Volume transferido, porque arquivos grandes sempre deixam o link lento.",
        "Largura de banda, porque é preciso contratar um link maior.",
        "Throughput, porque o download está muito abaixo do plano.",
        "Latência (RTT), porque o sintoma é tempo de resposta, não capacidade."
      ],
      "answer": 3,
      "explanation": "Se o download usa quase toda a banda, capacidade não é o gargalo. Muitas idas e voltas pequenas sofrem com latência: investigue RTT, DNS e o tempo de resposta da aplicação.",
      "difficulty": "iniciante-intermediário",
      "topic": "métricas"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.10.1",
      "front": "Qual é a cadeia mental do Módulo 0?",
      "back": "Informação -> bits/bytes -> codificação -> sinais -> métricas -> protocolos -> camadas -> evidências.",
      "tags": [
        "revisão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.10.7",
      "front": "Perda × jitter: qual a diferença?",
      "back": "Perda é o percentual de pacotes que não chegam; jitter é a variação da latência entre pacotes. Os dois degradam voz e vídeo mesmo com banda sobrando.",
      "tags": [
        "métricas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.10.3",
      "front": "O que ping prova?",
      "back": "Pode indicar resposta ICMP e RTT aproximado, mas não prova aplicação, autorização, TLS ou saúde do serviço.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.10.4",
      "front": "Diferença entre Mbps e MB/s?",
      "back": "Mbps mede megabits por segundo; MB/s mede megabytes por segundo. 1 byte = 8 bits, antes de considerar overhead.",
      "tags": [
        "métricas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.10.5",
      "front": "Por que pensar em camadas?",
      "back": "Para organizar diagnóstico, evitar achismo e separar falhas físicas, lógicas, de transporte, aplicação, identidade e política.",
      "tags": [
        "camadas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.10.6",
      "front": "O que é evidência técnica?",
      "back": "Uma observação coletada por comando, log, métrica ou teste, interpretada com seu escopo e limite.",
      "tags": [
        "evidências"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.10.1",
      "type": "conceitual",
      "prompt": "Explique em suas palavras a diferença entre informação, dado, bit e byte.",
      "expectedAnswer": "Informação é significado humano ou operacional; dado é a representação processável; bit é a menor unidade binária; byte é um grupo usual de 8 bits usado para representar valores e conteúdo.",
      "explanation": "O objetivo é separar significado, representação e unidade técnica."
    },
    {
      "id": "ex0.10.2",
      "type": "comparação",
      "prompt": "Monte uma tabela com latência, largura de banda, throughput, perda e jitter: o que cada um mede e um sintoma típico.",
      "expectedAnswer": "Latência: tempo de ida e volta (RTT, em ms); sintoma: resposta demorada a cada clique. Largura de banda: capacidade nominal do link (Mbps); sintoma: link saturado no horário de pico. Throughput: vazão útil observada; sintoma: download abaixo do plano por overhead, Wi-Fi ou servidor. Perda: pacotes que não chegam (%); sintoma: retransmissões e chamadas cortando. Jitter: variação da latência; sintoma: áudio e vídeo picotando.",
      "explanation": "Essa comparação evita o erro de chamar qualquer lentidão de falta de banda."
    },
    {
      "id": "ex0.10.3",
      "type": "diagnóstico",
      "prompt": "Um site abre no navegador, mas o login retorna 403. Liste três hipóteses que não sejam 'rede caiu'.",
      "expectedAnswer": "Credencial sem permissão, token expirado, política de autorização, escopo incorreto, bloqueio por WAF/proxy ou regra de aplicação.",
      "explanation": "A conectividade básica pode existir mesmo quando autorização falha."
    },
    {
      "id": "ex0.10.4",
      "type": "segurança",
      "prompt": "Você precisa compartilhar um print de erro com outro time. O que deve verificar antes?",
      "expectedAnswer": "Tokens, cookies, IPs internos, nomes de hosts, usuários, e-mails, caminhos internos, headers sensíveis e dados pessoais.",
      "explanation": "Evidência técnica pode vazar informações sensíveis."
    }
  ],
  "challenge": {
    "title": "Passagem de bastão para Fundamentos de Redes",
    "scenario": "Uma empresa pequena relata que usuários às vezes não conseguem acessar um sistema interno, às vezes acessam com lentidão e às vezes recebem erro de autorização. Você ainda não estudou profundamente redes, mas concluiu o Módulo 0.",
    "tasks": [
      "Separar o problema em camadas ou áreas de investigação.",
      "Listar evidências iniciais que você coletaria.",
      "Indicar quais conclusões você não pode tirar ainda.",
      "Apontar cuidados de segurança ao compartilhar evidências.",
      "Criar uma lista de assuntos do Módulo 1 que provavelmente serão necessários."
    ],
    "constraints": [
      "Não executar varredura ofensiva.",
      "Não abrir regras amplas de firewall como primeiro teste.",
      "Não compartilhar dados sensíveis sem sanitização.",
      "Não concluir causa única sem evidências."
    ],
    "expectedDeliverables": [
      "Tabela de hipóteses por camada",
      "Lista de comandos/evidências",
      "Limites das evidências",
      "Cuidados de segurança",
      "Assuntos para estudar no Módulo 1"
    ],
    "gradingRubric": [
      {
        "criterion": "Organização por camadas",
        "points": 25,
        "description": "Separa físico/enlace, rede, transporte, aplicação, identidade e política."
      },
      {
        "criterion": "Qualidade das evidências",
        "points": 25,
        "description": "Cada teste tem objetivo, interpretação e limite."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "Sanitiza dados e evita ações arriscadas."
      },
      {
        "criterion": "Raciocínio",
        "points": 20,
        "description": "Não tira conclusões além do que as evidências suportam."
      },
      {
        "criterion": "Preparação para Módulo 1",
        "points": 10,
        "description": "Identifica assuntos futuros relevantes."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A investigação madura começa transformando sintomas em perguntas. Lentidão pode envolver métrica; falha de acesso pode envolver DNS, rota, porta, aplicação ou identidade; erro de autorização aponta para política ou credencial, não necessariamente rede.",
    "steps": [
      "Definir escopo: quem é afetado, quando, de onde e em qual sistema.",
      "Coletar evidências locais: IP, gateway, DNS, RTT e porta.",
      "Separar sintomas por camadas.",
      "Distinguir conectividade de aplicação e autorização.",
      "Registrar limites: ping não prova HTTP, HTTP 403 não prova queda de rede, Base64 não prova segredo protegido.",
      "Sanitizar evidências.",
      "Listar assuntos do Módulo 1: topologia, host, enlace, endereço, gateway, DNS inicial e troubleshooting."
    ],
    "commonWrongAnswers": [
      {
        "answer": "É só aumentar a internet.",
        "whyItIsWrong": "Não há evidência de que largura de banda seja o gargalo."
      },
      {
        "answer": "É firewall, libera tudo para testar.",
        "whyItIsWrong": "Abertura ampla aumenta risco e não é diagnóstico controlado."
      },
      {
        "answer": "403 é rede fora.",
        "whyItIsWrong": "403 é resposta HTTP de negação; indica que houve comunicação suficiente para uma resposta da aplicação ou intermediário."
      }
    ],
    "finalAnswer": "A resposta correta organiza hipóteses por camadas, coleta evidências mínimas, respeita limites, protege dados sensíveis e aponta que o Módulo 1 aprofundará a parte de topologia, enlace, endereçamento e serviços de rede."
  },
  "glossary": [
    {
      "term": "Revisão ativa",
      "shortDefinition": "Revisão baseada em explicação, aplicação e resolução de cenários.",
      "longDefinition": "Método de revisão em que o aluno não apenas relê conteúdo, mas reconstrói relações, responde perguntas, interpreta evidências e identifica lacunas.",
      "example": "Explicar por que ping não prova que uma aplicação web está saudável.",
      "relatedTerms": [
        "exercício",
        "simulado",
        "checklist"
      ],
      "relatedLessons": [
        "0.10"
      ]
    },
    {
      "term": "Mapa mental técnico",
      "shortDefinition": "Representação visual das relações entre conceitos técnicos.",
      "longDefinition": "Ferramenta para organizar dependências e conexões entre fundamentos, como bits, bytes, protocolos, métricas e camadas.",
      "example": "O SVG da aula conecta informação, codificação, sinal, métrica, protocolo e diagnóstico.",
      "relatedTerms": [
        "modelo mental",
        "camadas"
      ],
      "relatedLessons": [
        "0.8",
        "0.10"
      ]
    },
    {
      "term": "Prontidão técnica",
      "shortDefinition": "Grau de preparação para avançar para um tema mais complexo.",
      "longDefinition": "Estado em que o aluno possui os conceitos mínimos, sabe aplicá-los e reconhece suas lacunas antes de avançar.",
      "example": "Estar pronto para Módulo 1 significa diferenciar bit, byte, protocolo, sinal, métrica e camada.",
      "relatedTerms": [
        "checklist",
        "lacuna"
      ],
      "relatedLessons": [
        "0.10"
      ]
    },
    {
      "term": "Lacuna de fundamento",
      "shortDefinition": "Conceito básico ainda frágil que prejudica temas futuros.",
      "longDefinition": "Ponto de conhecimento que, se ignorado, dificulta aprender assuntos mais avançados como subnetting, DNS, TLS ou troubleshooting.",
      "example": "Não entender binário prejudica subnetting.",
      "relatedTerms": [
        "pré-requisito",
        "revisão"
      ],
      "relatedLessons": [
        "0.2",
        "0.10"
      ]
    },
    {
      "term": "Limite da evidência",
      "shortDefinition": "O que um teste ou comando não consegue provar.",
      "longDefinition": "Toda evidência tem escopo. Saber o limite evita conclusões erradas e diagnósticos prematuros.",
      "example": "Ping responde, mas isso não prova login funcionando.",
      "relatedTerms": [
        "evidência",
        "hipótese",
        "troubleshooting"
      ],
      "relatedLessons": [
        "0.9",
        "0.10"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0, aulas 0.1 a 0.9",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base direta desta revisão."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Os conceitos de evidência, pipeline, observabilidade e automação serão reaplicados em DevSecOps."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Os conceitos de codificação, protocolo, autenticação e autorização serão aprofundados em IAM."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos",
      "reason": "A leitura de logs, métricas e falhas de pipeline depende dos fundamentos revisados aqui."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "fundamentos de identidade",
      "reason": "A diferença entre conectividade, autenticação e autorização prepara o aluno para IAM."
    }
  ],
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
      "1.1"
    ]
  }
};
