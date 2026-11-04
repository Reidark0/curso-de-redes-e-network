export const lesson0010 = {
  "id": "0.10",
  "moduleId": "m00",
  "order": 10,
  "title": "Revisão do Módulo 0",
  "subtitle": "Mapa do módulo, pares que confundem e checklist de prontidão para começar Fundamentos de Redes.",
  "duration": "15-25 min + 35 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 200,
  "tags": [
    "fundamentos",
    "revisão",
    "checklist",
    "mapa mental",
    "métricas",
    "codificação",
    "camadas",
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
    "Ligar os fundamentos do Módulo 0 numa cadeia de perguntas (dado, bytes, codificação, sinal, métricas, protocolo, camada e evidência) e usá-la num sintoma vago como \"está lento\".",
    "Distinguir os pares que mais geram diagnóstico errado: Mbps × MB/s, codificação × criptografia, banda × throughput × latência e conectividade × autorização.",
    "Identificar suas lacunas com o checklist de prontidão e saber a qual aula voltar antes do Módulo 1."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Nenhum chamado chega dizendo \"há perda no Wi-Fi e o servidor está a 180 ms de distância\". Ele chega como <strong>\"está lento\"</strong>, <strong>\"não acessa\"</strong> ou <strong>\"o login não funciona\"</strong>. Quem não sabe decompor esse sintoma chuta: pede mais banda quando o problema é atraso, culpa a rede por um erro de permissão ou cola num chamado um log com uma senha em Base64, achando que ela está protegida. Cada chute custa tempo, dinheiro ou, no último caso, uma credencial exposta.\n  </p>\n  <p>\n    Você já tem as peças para não errar assim, mas elas estão espalhadas em nove aulas. Nesta revisão você as junta num mapa único, confere os pares de conceitos que mais confundem e descobre o que ainda está frágil antes do Módulo 1. Separar um sintoma em partes verificáveis é o que o trabalho em redes e em segurança cobra todos os dias.\n  </p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    Esses chutes acontecem quando os fundamentos ficam soltos. Abrir uma única página já envolve sinal físico, endereço, resolução de nome, transporte, criptografia, protocolo de aplicação, login e permissão. Cada parte esconde complexidade, mas não a elimina: quando algo falha, sem um mapa qualquer falha parece misteriosa.\n  </p>\n  <p>\n    O Módulo 0 deu uma ferramenta para cada uma dessas partes, mas ferramentas soltas não formam um método. Estudar IP, TCP, DNS e HTTP no Módulo 1 sem ligar os fundamentos leva a decorar definições e travar na hora de diagnosticar. Esta aula liga as ferramentas numa sequência, separa os pares de conceitos que mais se confundem e ajuda você a encontrar suas lacunas.\n  </p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> revisar não é reler tudo. É reconstruir como os fundamentos se ligam e verificar se você consegue usá-los num caso novo, sem consultar.\n  </div>\n\n  <h3>Pares que você não pode confundir</h3>\n  <p>Quase todo diagnóstico errado do Módulo 0 nasce de tratar dois conceitos vizinhos como se fossem o mesmo.</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Par</th><th>Diferença</th><th>Na prática</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>Informação × dado</td><td>Informação é o significado; dado é a representação que um programa manipula.</td><td>\"Senha do usuário\" é informação; os bytes gravados são dado.</td></tr>\n        <tr><td>Bit × byte</td><td>Bit é a menor unidade (0 ou 1); byte é um grupo de 8 bits.</td><td>Link de 100 Mbps entrega no máximo 100 ÷ 8 = 12,5 MB/s, antes do overhead. Um arquivo de 1 GB (1.000 MB) leva pelo menos 80 s.</td></tr>\n        <tr><td>Codificação × criptografia</td><td>UTF-8 e Base64 só mudam a forma, e qualquer um reverte; criptografia só se reverte com a chave.</td><td>Token em Base64 num log está exposto, não protegido.</td></tr>\n        <tr><td>Largura de banda × throughput</td><td>Banda é a capacidade nominal; throughput é a vazão útil observada.</td><td>Overhead, Wi-Fi, servidor remoto e congestionamento reduzem o throughput.</td></tr>\n        <tr><td>Latência × largura de banda</td><td>Latência mede tempo (ms, o RTT do ping); banda mede capacidade.</td><td>Página que demora a cada clique pode ter banda sobrando e latência alta.</td></tr>\n        <tr><td>Perda × jitter</td><td>Perda é o percentual de pacotes que não chegam; jitter é a variação da latência entre pacotes.</td><td>Os dois degradam voz e vídeo mesmo com banda sobrando.</td></tr>\n        <tr><td>Conectividade × autorização</td><td>Ping ou porta respondendo mostra que há caminho; não mostra permissão nem aplicação saudável.</td><td>HTTP 403 prova que houve resposta: o serviço recebeu o pedido e negou o acesso.</td></tr>\n        <tr><td>Protocolo × aplicação</td><td>Protocolo é o contrato (formato, ordem, erros, significado); a aplicação usa esse contrato.</td><td>HTTP funcionando não garante que a regra de negócio esteja certa.</td></tr>\n      </tbody>\n    </table>\n  </div>\n\n  <div class=\"callout warning\">\n    <strong>Erros comuns na revisão</strong>\n    <ul>\n      <li><strong>Só reler.</strong> Reler dá sensação de familiaridade, não de domínio. Explique cada par em voz alta com um exemplo seu e resolva os exercícios sem consultar.</li>\n      <li><strong>Começar pela aplicação porque é onde o erro aparece.</strong> O usuário vê o sintoma na tela, mas a causa pode estar no meio, no endereço ou no nome. Teste de baixo para cima, com evidência em cada etapa.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    O Módulo 0 forma uma cadeia: cada etapa depende da anterior e acrescenta uma pergunta. Diante de qualquer comunicação, ou de qualquer falha, percorra-a em ordem:\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Dado (0.1):</strong> o que está sendo representado? Um texto, um número, uma imagem, uma credencial?</li>\n    <li><strong>Bytes (0.2):</strong> como ler esses bytes: em decimal, binário ou hexadecimal?</li>\n    <li><strong>Codificação (0.3):</strong> se é texto, qual regra transforma caracteres em bytes? A forma mudou (UTF-8, Base64) ou o conteúdo foi protegido (criptografia)?</li>\n    <li><strong>Sinal (0.5):</strong> como os bits saem da máquina: tensão no cobre, luz na fibra ou ondas de rádio?</li>\n    <li><strong>Métricas (0.4, 0.6):</strong> a taxa está em bits ou em bytes? Qual é a latência, a perda, o jitter e o throughput útil?</li>\n    <li><strong>Protocolo (0.7):</strong> qual contrato define o formato, a ordem, os erros e o significado das mensagens?</li>\n    <li><strong>Camada (0.8):</strong> em qual nível a evidência aponta a falha: meio, endereço, nome, porta, aplicação, identidade ou política?</li>\n    <li><strong>Evidência (0.9):</strong> o que este teste mostra, o que não mostra e qual é o próximo teste? Antes de compartilhar, o que precisa ser mascarado?</li>\n  </ol>\n\n  <h3>Checklist de prontidão para o Módulo 1</h3>\n  <p>Marque só o que você consegue fazer sem consultar. Cada item que travar é uma lacuna: volte à aula indicada antes de avançar.</p>\n  <ul>\n    <li>Explicar a diferença entre informação, dado, bit, byte e sinal (0.1, 0.5).</li>\n    <li>Ler um byte em binário, decimal e hexadecimal (0.2).</li>\n    <li>Dizer por que Base64 não é criptografia e por que isso importa em segurança (0.3).</li>\n    <li>Converter Mbps em MB/s e estimar o tempo de uma transferência, lembrando do overhead (0.4).</li>\n    <li>Diferenciar latência, largura de banda, throughput, perda e jitter num cenário real (0.6).</li>\n    <li>Explicar protocolo como contrato e dizer o que um teste prova e o que não prova (0.7, 0.9).</li>\n    <li>Montar um diagnóstico inicial por camadas sem pular direto para a conclusão (0.8).</li>\n  </ul>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Um usuário abre um chamado: \"o sistema financeiro está lento\". A empresa tem um link de 100 Mbps. Em vez de pedir mais banda, você percorre a cadeia:\n  </p>\n  <ul>\n    <li><strong>Unidade:</strong> um relatório de 110 MB baixa em 10 s, ou seja, 11 MB/s. Em bits: 11 × 8 = 88 Mbps, perto dos 100 Mbps do link. A banda não é o gargalo; a diferença é overhead.</li>\n    <li><strong>Latência:</strong> o ping até o gateway (a saída da rede local) responde em 2 ms, mas até o servidor do sistema leva 180 ms. Cada clique faz várias idas e voltas, e cada uma paga esse atraso.</li>\n    <li><strong>Limite da evidência:</strong> o ping mostra o atraso do caminho, não a saúde da aplicação nem a permissão do usuário. Próximo teste: medir quanto a própria aplicação demora para responder.</li>\n  </ul>\n  <p>\n    Comprar um link de 500 Mbps não mudaria nada: o sintoma é tempo, não capacidade.\n  </p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1080 620\" role=\"img\" aria-labelledby=\"m00l10-title m00l10-desc\">\n    <title id=\"m00l10-title\">Mapa mental do Módulo 0</title>\n    <desc id=\"m00l10-desc\">Diagrama conectando informação, bits, bytes, codificação, sinais, métricas, protocolos, camadas, evidências e o Módulo 1.</desc>\n    <defs>\n      <marker id=\"m00l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"420\" y=\"40\" width=\"240\" height=\"70\" rx=\"16\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"540\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Módulo 0</text>\n    <text x=\"540\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fundamentos antes das redes</text>\n\n    <rect x=\"60\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"150\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Informação</text>\n    <text x=\"150\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sentido humano</text>\n\n    <rect x=\"290\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"380\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Bits e bytes</text>\n    <text x=\"380\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">representação</text>\n\n    <rect x=\"520\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"610\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Codificação</text>\n    <text x=\"610\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">UTF-8, Base64</text>\n\n    <rect x=\"750\" y=\"170\" width=\"180\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"840\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Sinais</text>\n    <text x=\"840\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cobre, fibra, rádio</text>\n\n    <rect x=\"160\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"255\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Métricas</text>\n    <text x=\"255\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">latência, vazão, perda</text>\n\n    <rect x=\"445\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"540\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Protocolos</text>\n    <text x=\"540\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">contratos e estados</text>\n\n    <rect x=\"730\" y=\"330\" width=\"190\" height=\"72\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"825\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Camadas</text>\n    <text x=\"825\" y=\"386\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">diagnóstico</text>\n\n    <rect x=\"295\" y=\"500\" width=\"490\" height=\"78\" rx=\"16\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"540\" y=\"532\" text-anchor=\"middle\" class=\"svg-label\">Módulo 1 — Fundamentos de Redes</text>\n    <text x=\"540\" y=\"556\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">topologia, enlace, endereço, serviço e troubleshooting inicial</text>\n\n    <line x1=\"540\" y1=\"110\" x2=\"150\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"380\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"610\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"110\" x2=\"840\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"380\" y1=\"242\" x2=\"255\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"610\" y1=\"242\" x2=\"540\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"840\" y1=\"242\" x2=\"825\" y2=\"330\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"255\" y1=\"402\" x2=\"430\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"540\" y1=\"402\" x2=\"540\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n    <line x1=\"825\" y1=\"402\" x2=\"650\" y2=\"500\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l10-arrow)\" />\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> dado → bytes → codificação → sinal → métricas → protocolo → camada → evidência. Cada etapa é uma pergunta do diagnóstico.</li>\n    <li>Mbps ÷ 8 = MB/s, antes do overhead: 100 Mbps dão no máximo 12,5 MB/s.</li>\n    <li>Base64 e UTF-8 só mudam a forma dos dados; quem protege é a criptografia.</li>\n    <li>Banda é capacidade, throughput é vazão útil, latência é tempo: \"lento\" pode ser qualquer um deles.</li>\n    <li>Ping ou porta respondendo mostra caminho, não permissão nem aplicação saudável.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula 1.1, <strong>O que é uma rede e por que existe</strong>, o Módulo 1 — Fundamentos de Redes começa a estudar a rede por dentro: dispositivos, meios, endereços, protocolos, serviços e políticas. Cada fundamento revisado aqui volta a ser usado a partir dela.\n  </p>\n</section>\n"
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
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual item do checklist de prontidão você marcou com menos segurança? Explique-o em voz alta, sem consultar, usando um exemplo seu, e depois confira na aula indicada.",
      "hints": [
        "Escolha o item em que você hesitou, não o mais difícil.",
        "Um exemplo seu vale mais que a definição decorada: um download, um site lento, um log."
      ],
      "expectedIdeas": [
        "lacuna identificada",
        "exemplo concreto",
        "volta à aula indicada"
      ],
      "explanation": "Explicar sem consultar revela a lacuna que a releitura esconde. Se o exemplo não sai, volte à aula do item antes do Módulo 1."
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
      "question": "Ao acessar um sistema interno, o navegador mostra HTTP 403. Qual conclusão é mais segura inicialmente?",
      "options": [
        "A rede física certamente caiu.",
        "Há resposta do serviço, mas pode haver problema de autorização, política, identidade ou escopo de credencial.",
        "O DNS certamente está quebrado.",
        "A largura de banda está insuficiente."
      ],
      "answer": 1,
      "explanation": "403 é uma resposta HTTP de negação: houve caminho até o serviço, e ele recusou o acesso. Investigue permissão, política ou credencial antes de culpar a rede.",
      "topic": "conectividade × autorização",
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
      "back": "Dado -> bytes -> codificação -> sinal -> métricas -> protocolo -> camada -> evidência. Cada etapa é uma pergunta do diagnóstico.",
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
      "back": "Uma observação coletada por comando, log, métrica ou teste, registrada com o que ela mostra, o que não mostra e o próximo teste.",
      "tags": [
        "evidências"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.10.3",
      "type": "diagnóstico",
      "prompt": "Um site abre no navegador, mas o login retorna 403. Liste três hipóteses que não sejam 'rede caiu'.",
      "expectedAnswer": "Exemplos: usuário sem permissão para aquela área, sessão ou token expirado, credencial com escopo errado, política de acesso que bloqueia o grupo do usuário, bloqueio por um proxy ou regra da própria aplicação. Em todos, a rede funcionou: o 403 é uma resposta.",
      "explanation": "A conectividade básica pode existir mesmo quando autorização falha."
    },
    {
      "id": "ex0.10.4",
      "type": "segurança",
      "prompt": "Você precisa compartilhar um print de erro com outro time. O que deve verificar antes?",
      "expectedAnswer": "Tokens, cookies, IPs internos, nomes de hosts, usuários, e-mails, caminhos internos, headers sensíveis e dados pessoais.",
      "explanation": "Evidência técnica pode vazar informações sensíveis."
    },
    {
      "id": "ex0.10.5",
      "type": "cálculo",
      "prompt": "Um backup de 45 GB (45.000 MB) precisa terminar em 1 hora, num link de 100 Mbps reservado só para ele. Cabe na janela? Mostre a conta.",
      "expectedAnswer": "100 Mbps ÷ 8 = 12,5 MB/s no máximo. 45.000 MB ÷ 12,5 MB/s = 3.600 s = 60 min. Isso já é o limite teórico, antes do overhead; o throughput real será menor, então o backup não cabe em 1 hora.",
      "explanation": "O exercício aplica a conversão Mbps → MB/s e a diferença entre banda nominal e throughput útil."
    }
  ],
  "challenge": {
    "title": "Passagem de bastão para Fundamentos de Redes",
    "scenario": "Uma empresa pequena relata que usuários às vezes não conseguem acessar um sistema interno, às vezes acessam com lentidão e às vezes recebem erro de autorização. Você ainda não estudou profundamente redes, mas concluiu o Módulo 0.",
    "tasks": [
      "Separar os três sintomas em camadas ou áreas de investigação.",
      "Listar as evidências iniciais que você coletaria para cada um.",
      "Indicar quais conclusões você ainda não pode tirar.",
      "Dizer o que mascarar antes de compartilhar as evidências."
    ],
    "constraints": [
      "Não abrir regras amplas de firewall como teste.",
      "Não concluir causa única sem evidência."
    ],
    "expectedDeliverables": [
      "Uma tabela com sintoma, hipótese, evidência e limite da evidência."
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece transformando cada sintoma em pergunta. Lentidão pede métricas; falha de acesso pode estar no meio, no endereço, no nome, na porta ou na aplicação; erro de autorização aponta para permissão ou credencial, não necessariamente para a rede.",
    "steps": [
      "Definir o escopo: quem é afetado, quando, de onde e em qual sistema.",
      "\"Não acessa\": coletar IP, gateway, DNS e teste de porta, de baixo para cima.",
      "\"Lento\": medir latência e perda até o gateway e até o servidor, e comparar o throughput com a banda na mesma unidade.",
      "\"Erro de autorização\": houve resposta do serviço, então há caminho; investigar credencial e permissão.",
      "Registrar limites: ping não prova a aplicação, 403 não prova queda de rede, Base64 não protege segredo.",
      "Mascarar senhas, tokens e nomes internos antes de anexar as evidências."
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
    "finalAnswer": "Três sintomas, três perguntas diferentes: conectividade, métricas e autorização. A boa resposta organiza hipóteses por camada, coleta evidências mínimas, declara o que cada uma não prova e protege os dados antes de compartilhar."
  },
  "glossary": [
    {
      "term": "Overhead",
      "shortDefinition": "A parte do tráfego gasta com controle (cabeçalhos, confirmações, criptografia), e não com o conteúdo útil.",
      "example": "Por causa do overhead, um link de 100 Mbps entrega menos que 12,5 MB/s de arquivo.",
      "relatedLessons": [
        "0.4"
      ]
    },
    {
      "term": "RTT",
      "shortDefinition": "Round-trip time: o tempo de ida e volta de uma mensagem, em milissegundos. É o valor que o ping mostra.",
      "example": "Ping até o servidor com RTT de 180 ms: cada ida e volta leva quase 0,2 s.",
      "relatedLessons": [
        "0.6"
      ]
    },
    {
      "term": "HTTP 403",
      "shortDefinition": "Código de resposta HTTP que significa \"proibido\": o servidor recebeu o pedido e recusou o acesso.",
      "example": "Um usuário sem permissão abre uma página administrativa e recebe 403.",
      "relatedLessons": [
        "8.2"
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
      "quizScoreAtLeast": 70
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
