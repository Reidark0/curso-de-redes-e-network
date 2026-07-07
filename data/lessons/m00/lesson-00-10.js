export const lesson0010 = {
  "id": "0.10",
  "moduleId": "m00",
  "order": 10,
  "title": "Revisão do Módulo 0",
  "subtitle": "Mapa mental, checklist, simulado e preparação para começar Fundamentos de Redes com uma base sólida.",
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
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Ao final de um módulo introdutório, existe uma armadilha comum: o aluno sente que viu muitos conceitos, mas ainda não sabe quando usar cada um. Bits, bytes, hexadecimal, UTF-8, Base64, sinal físico, latência, throughput, protocolo e camadas podem parecer peças soltas. Esta aula existe para juntar essas peças em um modelo mental único.\n  </p>\n  <p>\n    Em redes, segurança, cloud e DevSecOps, a maioria dos problemas reais não chega com o nome correto. Ninguém abre um chamado dizendo: \"há perda intermitente na camada física, aumento de RTT, falha de resolução de nome e timeouts na aplicação\". O chamado costuma chegar como: <strong>\"está lento\"</strong>, <strong>\"não acessa\"</strong>, <strong>\"o sistema caiu\"</strong> ou <strong>\"o login não funciona\"</strong>. A diferença entre um iniciante perdido e um profissional em evolução é a capacidade de decompor o sintoma em partes verificáveis.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> antes de estudar redes propriamente ditas, você precisa saber o que está atravessando a rede, como isso é representado, como vira sinal, como é medido, qual protocolo dá significado aos bytes e em que camada investigar cada falha.\n  </div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    A história da computação em rede é a história de abstrações empilhadas. Primeiro, computadores precisaram representar informação em estados físicos controláveis. Depois, esses estados foram organizados em bits e bytes. Em seguida, surgiram tabelas de caracteres, bases numéricas, codificações e formatos. Quando máquinas diferentes começaram a se comunicar, foi necessário criar protocolos para que uma sequência de bytes tivesse significado compartilhado.\n  </p>\n  <p>\n    À medida que redes cresceram, diagnosticar problemas apenas olhando uma máquina deixou de ser suficiente. Cabos, placas de rede, rádio, switches, roteadores, firewalls, proxies, aplicações, credenciais e políticas passaram a interferir no resultado final. Por isso surgiram modelos em camadas, metodologias de troubleshooting, logs, métricas, capturas de tráfego e runbooks operacionais.\n  </p>\n  <p>\n    Esta revisão reproduz essa evolução em escala didática: do bit ao diagnóstico. A ideia não é decorar uma linha do tempo, mas entender por que cada abstração foi criada para esconder complexidade sem eliminá-la completamente.\n  </p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema central é que redes conectam muitas abstrações ao mesmo tempo. Um único acesso a uma página pode envolver sinal físico, enlace local, endereço lógico, resolução de nome, transporte, criptografia, protocolo de aplicação, autenticação, autorização, logs e políticas de segurança. Se você não tem um mapa mental, qualquer falha parece misteriosa.\n  </p>\n  <ul>\n    <li>Sem bits e bytes, você não entende o que está sendo transportado.</li>\n    <li>Sem binário e hexadecimal, você sofre para interpretar endereços, máscaras, dumps e identificadores.</li>\n    <li>Sem codificação, você confunde texto, bytes, Base64, criptografia e serialização.</li>\n    <li>Sem métricas, você chama qualquer problema de lentidão.</li>\n    <li>Sem protocolo, bytes não têm significado.</li>\n    <li>Sem camadas, você pula etapas e diagnostica por achismo.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Erro de base:</strong> estudar IP, TCP, DNS e HTTP sem entender representação, métrica, protocolo e camada cria memorização frágil. A pessoa até sabe repetir definições, mas trava quando precisa diagnosticar.\n  </div>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    A evolução do Módulo 0 saiu do mais fundamental para o mais operacional. Cada aula adicionou uma camada de raciocínio, não apenas um novo termo.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Aula</th><th>Ideia central</th><th>Problema que resolve</th><th>Prepara para</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>0.1</td><td>Informação precisa virar estados digitais</td><td>Entender o que é dado para o computador</td><td>bits, bytes, pacotes e sinais</td></tr>\n      <tr><td>0.2</td><td>Bits e bytes podem ser lidos em bases diferentes</td><td>Interpretar endereços e dumps</td><td>MAC, IPv4, IPv6, máscaras e hex dumps</td></tr>\n      <tr><td>0.3</td><td>Texto precisa de codificação</td><td>Evitar confundir texto, bytes e segredo</td><td>HTTP, APIs, tokens, logs e IAM</td></tr>\n      <tr><td>0.4</td><td>Bit e byte medem coisas diferentes</td><td>Interpretar velocidade, volume e overhead</td><td>throughput, links, cloud billing e backups</td></tr>\n      <tr><td>0.5</td><td>Bits viajam como sinais físicos</td><td>Entender falhas de cabo, fibra e rádio</td><td>Ethernet, Wi-Fi e camada física</td></tr>\n      <tr><td>0.6</td><td>Desempenho tem várias métricas</td><td>Separar latência, banda, vazão e perda</td><td>troubleshooting, VPN, proxy e cloud</td></tr>\n      <tr><td>0.7</td><td>Protocolo é contrato</td><td>Dar significado e ordem aos bytes</td><td>TCP, UDP, DNS, HTTP, TLS e APIs</td></tr>\n      <tr><td>0.8</td><td>Camadas organizam diagnóstico</td><td>Evitar conclusões prematuras</td><td>Modelo OSI e TCP/IP</td></tr>\n      <tr><td>0.9</td><td>Evidência transforma teoria em prática</td><td>Documentar investigação técnica</td><td>troubleshooting profissional</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Revisar tecnicamente não é reler tudo. Revisar é reconstruir o caminho lógico e verificar se você consegue usar os conceitos em cenários novos. Uma boa revisão transforma termos isolados em relações: um bit compõe bytes; bytes podem representar texto via UTF-8; bytes podem ser exibidos em hexadecimal; bytes atravessam meios físicos como sinais; protocolos definem o significado desses bytes; camadas ajudam a localizar onde algo falhou.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> nesta aula, revisão significa consolidar um modelo mental operacional dos fundamentos da computação necessários para estudar redes: representação, codificação, transmissão, medição, protocolo, camada, evidência e segurança.\n  </div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    O funcionamento interno do raciocínio do Módulo 0 pode ser visto como uma cadeia. Cada etapa depende da anterior, mas adiciona um novo tipo de pergunta.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Informação:</strong> o que queremos representar? Um número, um texto, uma imagem, uma instrução, um pacote, uma credencial?</li>\n    <li><strong>Representação:</strong> como essa informação vira bits e bytes?</li>\n    <li><strong>Forma humana:</strong> vamos ler esses bytes em decimal, binário, hexadecimal ou texto?</li>\n    <li><strong>Codificação:</strong> se for texto, qual encoding transforma caracteres em bytes?</li>\n    <li><strong>Transmissão:</strong> como os bits saem da máquina como sinal elétrico, óptico ou rádio?</li>\n    <li><strong>Medição:</strong> qual é a taxa, latência, perda, jitter e throughput útil?</li>\n    <li><strong>Protocolo:</strong> qual contrato define formato, ordem, estado, erro e significado?</li>\n    <li><strong>Camada:</strong> em qual nível da pilha a evidência aponta uma falha?</li>\n    <li><strong>Segurança:</strong> quais dados podem vazar, ser adulterados, mal interpretados ou registrados indevidamente?</li>\n  </ol>\n  <p>\n    Esse fluxo é o primeiro ensaio do que você fará em redes: decompor sistemas complexos em partes observáveis e testáveis.\n  </p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Em uma arquitetura real, os fundamentos do Módulo 0 aparecem em todos os pontos: no endpoint, na rede local, no firewall, no proxy, no balanceador, na aplicação, no provedor cloud, no pipeline e no SIEM.\n  </p>\n  <ul>\n    <li><strong>Endpoint:</strong> representa dados, codifica texto, envia bytes e registra logs.</li>\n    <li><strong>Rede física e sem fio:</strong> carrega sinais sujeitos a ruído, distância e interferência.</li>\n    <li><strong>Rede lógica:</strong> usa endereços, protocolos e camadas para transportar dados.</li>\n    <li><strong>Aplicação:</strong> interpreta bytes conforme HTTP, JSON, TLS, autenticação e regras internas.</li>\n    <li><strong>Segurança:</strong> monitora evidências, identifica anomalias e protege confidencialidade, integridade e disponibilidade.</li>\n    <li><strong>Cloud e DevSecOps:</strong> transformam esses conceitos em políticas, automação, observabilidade, custos e confiabilidade.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Pense no Módulo 0 como aprender a ler antes de estudar bibliotecas. Bits são letras em sua forma mais básica. Bytes são pequenos blocos. Codificações dizem como letras viram símbolos compreensíveis. Protocolos são regras de conversa. Métricas dizem se a conversa está rápida, lenta, interrompida ou congestionada. Camadas ajudam a descobrir se o problema está na voz, no idioma, na regra da conversa, no correio ou na autorização para entrar na sala.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> computadores não entendem significado humano do jeito que pessoas entendem. Eles processam estados, bytes e regras formais. A analogia ajuda a organizar, mas a prática exige comandos, evidências e leitura técnica.\n  </div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Você abre um site. Parece uma ação simples, mas vários conceitos do Módulo 0 aparecem: o texto da URL é codificado; o navegador envia bytes; esses bytes atravessam Wi-Fi como sinal de rádio; a conexão tem latência; o download mede throughput; os protocolos definem mensagens; e o diagnóstico pode ser separado por camadas.\n  </p>\n  <p>\n    Se o site demora, talvez o problema seja sinal Wi-Fi ruim, DNS lento, proxy, servidor distante, perda de pacotes, largura de banda saturada, TLS com erro, aplicação lenta ou autenticação falhando. O Módulo 0 não resolve tudo sozinho, mas ensina a não tratar todas essas hipóteses como a mesma coisa.\n  </p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, um usuário reclama que o sistema financeiro está lento. A revisão do Módulo 0 orienta perguntas melhores: há sinal físico estável? O problema ocorre no cabo e no Wi-Fi? A latência até o gateway está normal? A resolução de nome responde? A porta está acessível? O protocolo retorna erro? O problema está no login? Há proxy ou inspeção TLS? Existem logs de bloqueio?\n  </p>\n  <p>\n    Esse raciocínio evita que o time compre mais banda quando o problema é DNS, troque o firewall quando o problema é aplicação ou culpe autenticação quando o problema é conectividade básica.\n  </p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, fundamentos continuam existindo, mas muitas partes ficam abstraídas. Você talvez não veja o cabo, o switch físico ou a fibra entre regiões, mas ainda paga por tráfego, sofre com latência, precisa entender throughput, interpreta logs, configura protocolos, depura DNS, controla TLS e diferencia falha de rede de falha de identidade.\n  </p>\n  <p>\n    Um erro comum é acreditar que cloud elimina fundamentos. Ela apenas desloca parte deles para serviços gerenciados. Quanto mais gerenciado o serviço, mais importante é saber interpretar evidência: métricas, logs, códigos de erro, políticas, rotas, security groups, endpoints privados e custos de transferência.\n  </p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em DevSecOps, pipelines acessam registries, APIs, clusters, cofres de segredo, provedores cloud e sistemas de identidade. Quando uma etapa falha, o log pode mostrar timeout, erro TLS, HTTP 403, DNS inexistente, conexão recusada ou token inválido. Cada mensagem aponta uma camada ou contrato diferente.\n  </p>\n  <p>\n    A revisão do Módulo 0 ajuda a ler essas falhas sem misturar tudo: timeout não é necessariamente senha errada; 403 não é necessariamente rede; Base64 em um secret não significa criptografia; e throughput baixo em um runner pode ser gargalo de rede, disco, CPU, proxy ou serviço remoto.\n  </p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Segurança depende de fundamentos porque ataques, falhas e incidentes deixam rastros em bytes, protocolos, logs, métricas e camadas. Um analista precisa reconhecer quando um dado foi apenas codificado, quando um protocolo está em texto claro, quando uma latência anormal pode indicar túnel, quando um volume de saída pode sugerir exfiltração e quando uma política de bloqueio está funcionando.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Confundir Base64 com proteção</td><td>Secrets em YAML, logs ou tickets</td><td>Exposição de credenciais</td><td>Mascarar, criptografar, usar cofre e revisar logs</td></tr>\n      <tr><td>Diagnóstico sem camada</td><td>Abertura de regra any-any para \"testar\"</td><td>Aumento da superfície de ataque</td><td>Testes mínimos, temporários, registrados e justificados</td></tr>\n      <tr><td>Métrica mal interpretada</td><td>Volume alto tratado como normal</td><td>Possível vazamento despercebido</td><td>Baselines, alertas e investigação por protocolo/destino</td></tr>\n      <tr><td>Evidência sensível</td><td>Prints com IPs, tokens e nomes internos</td><td>Vazamento operacional</td><td>Sanitização antes de compartilhar</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1080 620\" role=\"img\" aria-labelledby=\"m00l10-title m00l10-desc\">\n    <title id=\"m00l10-title\">Mapa mental do Módulo 0</title>\n    <desc id=\"m00l10-desc\">Diagrama conectando informação, bits, bytes, codificação, sinais, métricas, protocolos, camadas, evidências e o Módulo 1.</desc>\n    <defs>\n      <marker id=\"m00l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"420\" y=\"40\" width=\"240\" height=\"70\" rx=\"16\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"540\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Módulo 0</text>\n    <text x=\"540\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fundamentos antes das redes</text>\n\n    <rect x=\"60\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"150\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Informação</text>\n    <text x=\"150\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sentido humano</text>\n\n    <rect x=\"290\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"380\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Bits e bytes</text>\n    <text x=\"380\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">representação</text>\n\n    <rect x=\"520\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"610\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Codificação</text>\n    <text x=\"610\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">UTF-8, Base64</text>\n\n    <rect x=\"750\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"840\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Sinais</text>\n    <text x=\"840\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cobre, fibra, rádio</text>\n\n    <rect x=\"160\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"255\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Métricas</text>\n    <text x=\"255\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">latência, vazão, perda</text>\n\n    <rect x=\"445\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"540\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Protocolos</text>\n    <text x=\"540\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">contratos e estados</text>\n\n    <rect x=\"730\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"825\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Camadas</text>\n    <text x=\"825\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">diagnóstico</text>\n\n    <rect x=\"295\" y=\"500\" width=\"490\" height=\"78\" rx=\"16\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"540\" y=\"532\" text-anchor=\"middle\" class=\"svg-label\">Módulo 1 — Fundamentos de Redes</text>\n    <text x=\"540\" y=\"556\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">topologia, enlace, endereço, serviço e troubleshooting inicial</text>\n\n    <line x1=\"540\" y1=\"110\" x2=\"150\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"380\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"610\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"840\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"380\" y1=\"242\" x2=\"255\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"610\" y1=\"242\" x2=\"540\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"840\" y1=\"242\" x2=\"825\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"255\" y1=\"402\" x2=\"430\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"402\" x2=\"540\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"825\" y1=\"402\" x2=\"650\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios foram desenhados para forçar produção ativa: explicar com suas palavras, classificar sintomas, identificar camadas e apontar riscos. Não basta reconhecer a alternativa correta; você deve conseguir justificar.\n  </p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio final do Módulo 0 simula uma passagem de bastão: você receberá sintomas de um ambiente pequeno e deverá organizar quais fundamentos do módulo usaria para iniciar a investigação.\n  </p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra uma forma madura de raciocinar: primeiro separar evidências por camada, depois identificar hipóteses, depois propor próximos testes. A resposta não deve ser um chute elegante.\n  </p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> o Módulo 0 constrói a base mental para redes, segurança, cloud, DevSecOps e IAM.</li>\n    <li><strong>O que lembrar:</strong> informação vira bits, bits formam bytes, bytes precisam de interpretação, sinais transportam bits, métricas medem comportamento, protocolos definem contratos e camadas organizam diagnóstico.</li>\n    <li><strong>Erro comum:</strong> decorar termos sem conseguir usá-los em sintomas reais.</li>\n    <li><strong>Uso real:</strong> ler logs, interpretar dumps, entender métricas, diagnosticar conectividade, proteger evidências e conversar melhor com times técnicos.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    O próximo tema é o <strong>Módulo 1 — Fundamentos de Redes</strong>. Agora que você entende como informação é representada, transmitida, medida, estruturada por protocolos e diagnosticada por camadas, o curso pode avançar para topologias, LAN, WAN, hosts, switches, roteadores, serviços, endereçamento inicial e a ideia de rede como sistema organizado.\n  </p>\n</section>"
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
  "deepDive": {
    "mentalModel": "O Módulo 0 deve ser lembrado como uma cadeia de transformação: informação -> representação -> codificação -> sinal -> métrica -> protocolo -> camada -> evidência -> decisão.",
    "keyTerms": [
      "informação",
      "bit",
      "byte",
      "hexadecimal",
      "UTF-8",
      "Base64",
      "sinal",
      "latência",
      "throughput",
      "protocolo",
      "camada",
      "evidência"
    ],
    "limitations": [
      "A revisão não substitui a prática futura com Packet Tracer, Wireshark, Linux, Windows e equipamentos de rede.",
      "O Módulo 0 prepara o raciocínio, mas ainda não ensina profundamente Ethernet, IP, TCP, DNS ou HTTP.",
      "Saber comandos isolados não garante diagnóstico; é preciso interpretar evidências no contexto correto."
    ],
    "whenToUse": [
      "Antes de iniciar o Módulo 1.",
      "Quando um conceito posterior parecer abstrato demais.",
      "Quando aparecer confusão entre bit e byte, encoding e criptografia, banda e throughput, protocolo e aplicação.",
      "Quando precisar organizar um diagnóstico por camadas."
    ],
    "whenNotToUse": [
      "Não use a revisão como desculpa para adiar prática real indefinidamente.",
      "Não tente decorar todos os detalhes; foque relações e aplicação.",
      "Não pule para módulos avançados se os conceitos desta revisão ainda estiverem confusos."
    ],
    "operationalImpact": [
      "Melhora a qualidade de chamados, relatórios e comunicação entre times.",
      "Reduz diagnósticos baseados em achismo.",
      "Ajuda a escolher o próximo teste em vez de executar comandos aleatórios."
    ],
    "financialImpact": [
      "Ajuda a evitar compras ou mudanças erradas, como aumentar banda quando o problema é latência, DNS, aplicação ou autenticação.",
      "Ajuda a interpretar custos de tráfego, logs e serviços cloud posteriormente.",
      "Reduz tempo improdutivo ao acelerar triagem inicial."
    ],
    "securityImpact": [
      "Ajuda a evitar exposição de segredo codificado como se fosse criptografado.",
      "Ajuda a registrar evidências sem vazar dados sensíveis.",
      "Ajuda a diferenciar falha de conectividade, autenticação, autorização e política."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que revisão é apenas reler conteúdo.",
      "whyItHappens": "É mais confortável reler do que produzir respostas e resolver cenários.",
      "consequence": "O aluno sente familiaridade, mas não consegue aplicar.",
      "correction": "Responder exercícios, explicar em voz alta e montar mapas de relação."
    },
    {
      "mistake": "Confundir termos parecidos.",
      "whyItHappens": "Bit/byte, encoding/criptografia, latência/throughput e protocolo/aplicação aparecem juntos.",
      "consequence": "Diagnósticos e decisões técnicas ficam errados.",
      "correction": "Criar tabela de contraste e usar exemplos práticos."
    },
    {
      "mistake": "Pular camadas no diagnóstico.",
      "whyItHappens": "O sintoma visível geralmente aparece na aplicação.",
      "consequence": "A pessoa culpa aplicação, DNS ou firewall sem evidência.",
      "correction": "Começar por perguntas simples e subir a pilha com evidências."
    }
  ],
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
        "purpose": "Revisar coleta básica de IP, gateway, DNS, RTT, caminho e porta.",
        "expectedObservation": "Endereço local, gateway, servidores DNS, respostas ICMP ou falhas, caminho e teste TCP.",
        "interpretation": "Essas evidências ajudam a separar configuração local, caminho, latência e porta, mas não provam autorização nem saúde da aplicação."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\nping -c 4 8.8.8.8\ntraceroute 8.8.8.8\ncurl -I https://example.com",
        "purpose": "Revisar coleta básica em Linux.",
        "expectedObservation": "Interfaces, rota default, RTT, caminho e headers HTTP.",
        "interpretation": "Permite relacionar camada local, rede, transporte e aplicação de forma inicial."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow interfaces status\nshow running-config | include hostname",
        "purpose": "Revisar a ideia de estado de interface e evidência em equipamento de rede.",
        "expectedObservation": "Interfaces, estado operacional, IPs configurados e identificação do dispositivo.",
        "interpretation": "Ajuda a entender que equipamentos também fornecem evidências por camada."
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
      "Sanitizar evidências antes de compartilhar.",
      "Diferenciar codificação de criptografia.",
      "Registrar hipóteses e limites do teste.",
      "Usar testes autorizados, mínimos e defensivos.",
      "Evitar expor tokens, IPs internos, nomes de hosts e dados pessoais em prints."
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
      "Confundir ping bem-sucedido com aplicação saudável.",
      "Confundir largura de banda nominal com throughput útil."
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
      "Runbooks de diagnóstico",
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
      "explanation": "A resposta ideal conecta fundamento com trabalho real."
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
      "id": "q0.10.1",
      "type": "conceito",
      "q": "Qual frase resume melhor o Módulo 0?",
      "opts": [
        "Ele ensina a base de representação, transmissão, medição, protocolo e diagnóstico antes das redes.",
        "Ele substitui o estudo de Ethernet e IP.",
        "Ele ensina apenas comandos de terminal.",
        "Ele ensina apenas história da computação."
      ],
      "a": 0,
      "exp": "O módulo prepara a base mental para estudar redes, não substitui os módulos técnicos seguintes.",
      "difficulty": "iniciante",
      "topic": "síntese"
    },
    {
      "id": "q0.10.2",
      "type": "segurança",
      "q": "Por que Base64 não deve ser tratado como proteção de segredo?",
      "opts": [
        "Porque é uma codificação reversível, não criptografia.",
        "Porque só funciona em Linux.",
        "Porque altera a senha permanentemente.",
        "Porque impede leitura por aplicações."
      ],
      "a": 0,
      "exp": "Base64 representa bytes em texto e pode ser revertido facilmente.",
      "difficulty": "iniciante",
      "topic": "codificação"
    },
    {
      "id": "q0.10.3",
      "type": "diagnóstico",
      "q": "Ping para um destino responde. O que isso NÃO prova sozinho?",
      "opts": [
        "Que a aplicação web está saudável e que o usuário tem autorização.",
        "Que há algum tipo de conectividade ICMP.",
        "Que houve resposta dentro de certo tempo.",
        "Que o destino respondeu ao ICMP, se não houver bloqueio intermediário."
      ],
      "a": 0,
      "exp": "Ping pode indicar conectividade básica, mas não prova HTTP, TLS, login, autorização ou saúde da aplicação.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q0.10.4",
      "type": "comparação",
      "q": "Qual é a diferença prática entre largura de banda e throughput?",
      "opts": [
        "Largura de banda é capacidade nominal; throughput é vazão útil observada.",
        "São sempre exatamente iguais.",
        "Throughput só existe em Wi-Fi.",
        "Largura de banda mede apenas latência."
      ],
      "a": 0,
      "exp": "Throughput real sofre impacto de overhead, congestionamento, servidor, cliente, Wi-Fi, proxy e outras condições.",
      "difficulty": "iniciante-intermediário",
      "topic": "métricas"
    },
    {
      "id": "q0.10.5",
      "type": "camadas",
      "q": "Qual atitude representa melhor pensamento em camadas?",
      "opts": [
        "Separar hipóteses físicas, rede, transporte, aplicação, identidade e política antes de concluir.",
        "Culpar DNS em todos os casos.",
        "Abrir qualquer regra de firewall para testar.",
        "Ignorar evidências locais."
      ],
      "a": 0,
      "exp": "Pensar em camadas é organizar investigação por dependências e evidências.",
      "difficulty": "iniciante",
      "topic": "camadas"
    },
    {
      "id": "q0.10.6",
      "type": "cenário",
      "q": "Um pipeline falha com HTTP 403. Qual conclusão é mais segura inicialmente?",
      "opts": [
        "Há resposta do serviço, mas pode haver problema de autorização, política, identidade ou escopo de credencial.",
        "A rede física certamente caiu.",
        "O DNS certamente está quebrado.",
        "A largura de banda está insuficiente."
      ],
      "a": 0,
      "exp": "403 indica resposta HTTP de negação; não deve ser confundido automaticamente com queda de rede.",
      "difficulty": "intermediário",
      "topic": "DevSecOps"
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
      "id": "fc0.10.2",
      "front": "Base64 é criptografia?",
      "back": "Não. É codificação reversível para representar bytes como texto.",
      "tags": [
        "segurança",
        "base64"
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
      "prompt": "Compare latência, largura de banda e throughput em uma tabela de três linhas.",
      "expectedAnswer": "Latência mede tempo; largura de banda mede capacidade nominal; throughput mede vazão útil observada.",
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
