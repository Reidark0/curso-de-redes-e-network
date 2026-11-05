export const lesson0105 = {
  "id": "1.5",
  "moduleId": "m01",
  "order": 5,
  "title": "Meios de transmissão: cobre, fibra e rádio",
  "subtitle": "Como sinais atravessam cabos metálicos, fibras ópticas e o ar, e como isso muda desempenho, custo, risco e troubleshooting.",
  "duration": "15-25 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 190,
  "tags": [
    "redes",
    "fundamentos",
    "camada física",
    "cobre",
    "fibra",
    "rádio",
    "wi-fi",
    "interferência",
    "atenuação",
    "troubleshooting",
    "segurança física"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "A aula 0.5 explicou como sinais físicos carregam dados em nível introdutório."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias dizem como os pontos se conectam; meios de transmissão explicam por onde os sinais passam."
    }
  ],
  "objectives": [
    "Diferenciar cobre, fibra óptica e rádio pelo tipo de sinal, pelo alcance, pelo custo e pelo uso típico.",
    "Explicar como atenuação, ruído, interferência e meio compartilhado degradam o sinal e aparecem como erros CRC, velocidade negociada menor, reenvios e quedas.",
    "Escolher o meio adequado para um caso simples (ponto fixo, ligação longa, usuário móvel) e reconhecer quando um sintoma aponta para o meio físico, e não para IP, DNS ou aplicação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Uma filial reclama que o sistema da empresa cai várias vezes ao dia. A equipe do sistema culpa o servidor, alguém da segurança suspeita de ataque e a operadora garante que o link de internet está no ar. Dias depois, um técnico olha a porta do switch que atende a filial: milhares de erros acumulados. A causa era um cabo amassado atrás de um armário. Trocado o cabo, as quedas acabaram.</p>\n  <p>Ninguém errou a configuração. O sinal é que chegava estragado ao outro lado, e um problema físico apareceu como “o sistema caiu”. Sem saber como cobre, fibra e rádio carregam o sinal e o que o degrada, você perde dias procurando a falha no lugar errado. Em suporte, infraestrutura ou segurança, conferir o meio antes de culpar o protocolo evita esse desperdício e falsos alarmes de ataque.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando se esquece que toda rede, antes de endereço, protocolo e aplicação, depende de um sinal chegando bem ao outro lado. Na aula 0.5 você viu que bits viram sinais; agora a pergunta é por onde esse sinal passa e que limites cada caminho impõe.</p>\n  <p>Cada meio se firmou onde resolve melhor um problema: o par trançado de cobre tomou o acesso por ser barato e fácil de instalar, a fibra ganhou as ligações longas e de alta capacidade, e o rádio trouxe mobilidade ao preço de interferência e de um meio dividido entre todos. Nenhum é melhor em tudo. Esta aula mostra como cada um funciona, o que degrada o sinal e como isso aparece para você: erros na porta, velocidade menor, quedas e lentidão.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> meio de transmissão é o caminho físico ou sem fio pelo qual o sinal de rede se propaga entre dispositivos. O cobre usa variações elétricas; a fibra usa luz; o rádio usa ondas eletromagnéticas no ar.</div>\n  <p>O meio não define o protocolo, o endereço nem a aplicação, mas impõe limites de velocidade, distância, estabilidade, custo e exposição. Perda, quedas e lentidão intermitente podem nascer aqui.</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table comparison-table\">\n      <thead><tr><th>Aspecto</th><th>Cobre (par trançado)</th><th>Fibra óptica</th><th>Rádio (Wi‑Fi)</th></tr></thead>\n      <tbody>\n        <tr><td>Sinal</td><td>Elétrico, em pares de fios</td><td>Pulsos de luz em vidro ou plástico</td><td>Ondas eletromagnéticas pelo ar</td></tr>\n        <tr><td>Vantagens</td><td>Barato, comum; pode levar energia pelo mesmo cabo (PoE) para câmeras e access points</td><td>Longo alcance, alta taxa, não sofre interferência elétrica e isola eletricamente as duas pontas</td><td>Mobilidade, instalação rápida, menos cabos</td></tr>\n        <tr><td>Limitações</td><td>Canal Ethernet de até 100 m; sensível a cabo de categoria errada, conector mal feito e interferência</td><td>Exige transceptor compatível nas pontas, conectores limpos e cuidado com curvas; custa mais por ponto</td><td>Meio compartilhado; sofre com obstáculos, distância e outras redes no mesmo canal; o sinal atravessa paredes</td></tr>\n        <tr><td>Uso típico</td><td>Computadores, impressoras, câmeras, telefones IP, access points</td><td>Ligações entre switches, salas e prédios; datacenter; operadoras</td><td>Notebooks e celulares, visitantes, sensores, locais sem cabo</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Luz da porta acesa = link saudável.</strong> Erros e retransmissões ficam escondidos: confira a velocidade do link e os contadores de erro da porta.</li>\n      <li><strong>Wi‑Fi como cabo invisível.</strong> O rádio é dividido entre todos no mesmo canal e varia com distância e obstáculos; cabeie o que é fixo e crítico.</li>\n      <li><strong>Link ativo = acesso autorizado.</strong> Uma tomada ativa na recepção deixa qualquer visitante conectar um equipamento. Desative as portas sem uso e proteja racks e salas técnicas.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Nos três meios, o transmissor converte bits em sinal, o meio o propaga e o receptor tenta reconhecer os bits no que recebeu.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Cobre:</strong> a placa de rede ou a porta do switch transforma bits em variações elétricas nos pares de fios. Ao conectar, as duas pontas combinam a velocidade do link (a <em>velocidade negociada</em>). Em 1 Gbps (1000BASE-T) o cabo usa os quatro pares; em 100 Mbps (100BASE-TX), só dois. Por isso um par danificado pode fazer a porta subir a 100 Mbps, ou nem subir.</li>\n    <li><strong>Fibra:</strong> um transceptor converte o sinal elétrico em pulsos de luz, e o transceptor da outra ponta converte a luz de volta em sinal elétrico.</li>\n    <li><strong>Rádio:</strong> o rádio modula a informação em ondas eletromagnéticas. O receptor precisa separar o sinal útil do ruído e da interferência.</li>\n    <li><strong>Validação:</strong> cada bloco de dados enviado (o quadro) leva um código de verificação, o CRC. Se o sinal chegou degradado, o código não confere, o quadro é descartado e precisa ser reenviado. O usuário percebe lentidão ou queda.</li>\n  </ol>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Fenômeno</th><th>O que é</th><th>Exemplo</th><th>Como reduzir</th></tr></thead>\n      <tbody>\n        <tr><td>Atenuação</td><td>Perda de intensidade do sinal ao longo do meio; cresce com a distância</td><td>Cabo longo demais, conector de fibra sujo, cliente longe do access point</td><td>Respeitar a distância, limpar conectores, aproximar ou reposicionar o access point</td></tr>\n        <tr><td>Ruído e interferência</td><td>Energia indesejada somada ao sinal. Com SNR (relação sinal-ruído) baixa, o receptor erra mais bits e, no Wi‑Fi, a taxa cai</td><td>Cabo de cobre passando junto a fiação elétrica; muitas redes Wi‑Fi no mesmo canal</td><td>Instalar e testar os cabos corretamente; escolher canais menos ocupados</td></tr>\n        <tr><td>Meio compartilhado</td><td>No rádio, todos no mesmo canal disputam o tempo de transmissão</td><td>Access point lotado, rede lenta no horário de pico</td><td>Distribuir os clientes, separar canais, cabear o que é fixo</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>É por isso que um problema físico aparece como problema de aplicação: os dados precisam ser reenviados várias vezes, a página demora a carregar e o usuário diz apenas “o sistema caiu”.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense nos meios como caminhos para entregar mensagens. O cobre é uma rua do bairro: barata e prática, mas boa só para trechos curtos. A fibra é uma rodovia expressa entre cidades. O rádio é falar por alto-falante num salão aberto: todos ouvem, só um fala de cada vez e o barulho atrapalha.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, os três meios convivem: o celular usa rádio até o roteador Wi‑Fi, o roteador usa cobre até o modem ou a ONT (o aparelho da operadora) e a operadora usa fibra até o prédio ou até a sua casa. Quando o Wi‑Fi fica ruim no quarto, a internet pode estar ótima: o problema pode ser distância, parede, canal ocupado pelas redes dos vizinhos ou muitos aparelhos disputando o mesmo roteador.</p>\n  <p>Se você liga o notebook por cabo e tudo melhora, isso não prova que a internet era ruim; mostra que o trecho sem fio era o gargalo. Dá para ver a diferença nos números: no Windows, <code>Get-NetAdapter</code> mostra a velocidade negociada do cabo (por exemplo, 1 Gbps), e <code>netsh wlan show interfaces</code> mostra o canal, o sinal e a taxa do Wi‑Fi.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m01l05-title m01l05-desc\">\n    <title id=\"m01l05-title\">Cobre, fibra e rádio como meios de transmissão</title>\n    <desc id=\"m01l05-desc\">O diagrama mostra um caminho com os três meios: rádio entre o notebook e o access point, cobre do access point até o switch e fibra do switch até o core. Abaixo, as vantagens e os limites de cada meio.</desc>\n    <defs>\n      <marker id=\"m01l05-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"120\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"120\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cliente sem fio</text>\n    <rect x=\"285\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"370\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Access Point</text>\n    <text x=\"370\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">recebe energia (PoE)</text>\n    <rect x=\"535\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"620\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"620\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">acesso</text>\n    <rect x=\"785\" y=\"70\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"870\" y=\"105\" text-anchor=\"middle\" class=\"svg-label\">Core/Serviço</text>\n    <text x=\"870\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ligação principal</text>\n    <path d=\"M205 110 C235 40, 255 180, 285 110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <line x1=\"455\" y1=\"110\" x2=\"535\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <line x1=\"705\" y1=\"110\" x2=\"785\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l05-arrow)\" />\n    <text x=\"245\" y=\"185\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rádio</text>\n    <text x=\"495\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cobre</text>\n    <text x=\"745\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fibra</text>\n    <rect x=\"60\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"180\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Rádio</text>\n    <text x=\"180\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mobilidade, canal, obstáculos</text>\n    <text x=\"180\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interferência e meio compartilhado</text>\n    <rect x=\"370\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Cobre</text>\n    <text x=\"490\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">baixo custo, PoE, até o acesso</text>\n    <text x=\"490\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">distância, conector, ruído</text>\n    <rect x=\"680\" y=\"235\" width=\"240\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"800\" y=\"265\" text-anchor=\"middle\" class=\"svg-label\">Fibra</text>\n    <text x=\"800\" y=\"292\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">alta taxa e longo alcance</text>\n    <text x=\"800\" y=\"318\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">transceptor, limpeza, curvatura</text>\n  </svg>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> o meio limita distância, velocidade e estabilidade; sinal ruim vira erro e reenvio.</li>\n    <li>Cobre: sinal elétrico, até 100 m, pode levar energia (PoE). Fibra: luz, longo alcance, imune a interferência elétrica.</li>\n    <li>Rádio: mobilidade, mas meio compartilhado, sensível a obstáculos.</li>\n    <li>Atenuação, ruído e disputa pelo canal viram erros CRC, velocidade menor e quedas.</li>\n    <li>Luz acesa não prova link saudável: confira velocidade e erros antes de culpar IP, DNS ou aplicação.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na aula 1.6, cabeamento estruturado e padrões RJ‑45, você sai da visão geral do meio e entra na organização prática do cobre: tomadas, patch panels, racks, categorias de cabo e documentação física.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "Ethernet",
      "Wi-Fi",
      "PoE",
      "LLDP",
      "CDP"
    ],
    "dependsOn": [
      "representação digital",
      "sinais físicos",
      "topologia física e lógica"
    ],
    "enables": [
      "cabeamento estruturado",
      "switching",
      "Wi-Fi",
      "troubleshooting físico",
      "segurança de portas"
    ]
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Num escritório, um usuário reclama de lentidão pelo Wi‑Fi, mas pelo cabo o mesmo sistema funciona bem. Que hipóteses você testaria primeiro, e por quê?",
      "hints": [
        "Pelo cabo funciona: o que muda é só o trecho de rádio."
      ],
      "expectedIdeas": [
        "sinal fraco ou distância",
        "interferência ou canal congestionado",
        "access point sobrecarregado"
      ],
      "explanation": "Pelo cabo funciona, então servidor, DNS e aplicação estão bem. Sobra o rádio: distância e obstáculos (atenuação), redes no mesmo canal (interferência) e muitos clientes no access point (meio compartilhado)."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa vai interligar dois prédios a 300 m um do outro. Por que fibra é mais justificável do que cobre nesse caso, e quando a fibra seria exagero?",
      "hints": [
        "Lembre o limite do par trançado.",
        "Pense em interferência e em ligar eletricamente dois prédios."
      ],
      "expectedIdeas": [
        "300 m passa dos 100 m do cobre",
        "imune a interferência elétrica",
        "isolamento elétrico",
        "exagero para pontos perto do switch"
      ],
      "explanation": "300 m passam do limite de 100 m do par trançado, e a fibra não sofre interferência elétrica e isola os prédios. Para um computador a 20 m do switch, fibra seria custo sem necessidade."
    }
  ],
  "quiz": [
    {
      "id": "q1.5.1",
      "question": "Qual alternativa descreve corretamente a diferença entre cobre, fibra e rádio?",
      "options": [
        "Cobre e fibra usam sinais elétricos; só o rádio usa ondas eletromagnéticas.",
        "Cobre usa sinais elétricos, fibra usa luz e rádio usa ondas eletromagnéticas.",
        "Fibra usa ondas de rádio guiadas; cobre usa pulsos de luz.",
        "Os três usam o mesmo sinal elétrico; muda só o conector."
      ],
      "answer": 1,
      "explanation": "Cobre leva variações elétricas, a fibra leva pulsos de luz gerados por transceptores e o rádio modula ondas eletromagnéticas no ar.",
      "topic": "meios",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.5.2",
      "question": "Uma porta de switch mostra muitos erros CRC. Qual hipótese deve ser considerada?",
      "options": [
        "DNS respondendo com o endereço errado.",
        "Senha incorreta do usuário na aplicação.",
        "Problema físico: cabo, conector, porta ou interferência.",
        "Certificado TLS expirado."
      ],
      "answer": 2,
      "explanation": "O CRC é o código de verificação que viaja com cada quadro. Muitos erros CRC significam quadros corrompidos no caminho, quase sempre por cabo, conector, porta ou interferência. Senha, DNS e certificado não corrompem quadros.",
      "topic": "troubleshooting",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q1.5.3",
      "question": "Qual é uma vantagem comum da fibra óptica?",
      "options": [
        "Maior alcance e menor suscetibilidade a interferência eletromagnética.",
        "Dispensa transceptores nas portas do switch.",
        "Custa menos que o cobre por ponto de usuário.",
        "Tolera curvatura e conector sujo sem perder sinal."
      ],
      "answer": 0,
      "explanation": "A fibra é forte em ligações longas e de alta capacidade e não sofre interferência elétrica, mas exige transceptores, conectores limpos e cuidado com curvas, e custa mais por ponto.",
      "topic": "fibra",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.5.4",
      "question": "Qual prática reduz risco de portas físicas expostas?",
      "options": [
        "Trocar os cabos por Wi‑Fi com uma senha única para todos.",
        "Deixar as portas ativas para facilitar o suporte.",
        "Confiar que só funcionários usam as tomadas da recepção.",
        "Desativar as portas que não estão em uso e proteger racks e salas técnicas."
      ],
      "answer": 3,
      "explanation": "Link ativo não é autorização: uma tomada ativa deixa qualquer pessoa conectar um equipamento. Com a porta desativada e o rack trancado, conectar um cabo não dá acesso à rede.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q1.5.5",
      "question": "Por que Wi‑Fi não deve ser tratado como cabo invisível?",
      "options": [
        "Porque o Wi‑Fi não usa protocolos de camada 2.",
        "Porque rádio é meio compartilhado, sujeito a interferência, obstáculos e variação de sinal.",
        "Porque o Wi‑Fi sempre entrega mais banda que o cabo.",
        "Porque o sinal do Wi‑Fi fica restrito à sala do AP."
      ],
      "answer": 1,
      "explanation": "Quem está no mesmo canal disputa o tempo de transmissão, o sinal varia com distância e obstáculos e atravessa paredes. Wi‑Fi não oferece a estabilidade de um cabo dedicado.",
      "topic": "wi-fi",
      "difficulty": "iniciante-intermediário",
      "type": "cenário"
    },
    {
      "id": "q1.5.7",
      "question": "Uma câmera IP está ligada ao switch por um cabo de par trançado de 130 m, e o link cai e volta várias vezes ao dia. Qual é a causa mais provável?",
      "options": [
        "O servidor DNS está respondendo devagar.",
        "O canal Wi‑Fi do local está congestionado.",
        "O firewall bloqueia a câmera em alguns horários.",
        "O cabo passa do limite de 100 m do par trançado, e a atenuação deixa o sinal no limite."
      ],
      "answer": 3,
      "explanation": "O canal Ethernet em par trançado vai até 100 m; acima disso a atenuação gera erros e o link cai e volta. DNS e firewall não derrubam o link físico, e a câmera está cabeada, não no Wi‑Fi.",
      "topic": "cobre",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.5.1",
      "front": "O que é meio de transmissão?",
      "back": "É o caminho físico ou sem fio pelo qual o sinal de rede se propaga: cobre (eletricidade), fibra (luz) ou rádio (ondas no ar).",
      "tags": [
        "camada física"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.2",
      "front": "Como o cobre transporta dados?",
      "back": "Por variações elétricas em fios, normalmente pares trançados em redes Ethernet modernas.",
      "tags": [
        "cobre"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.3",
      "front": "Como a fibra transporta dados?",
      "back": "Por pulsos de luz convertidos por transceptores ópticos.",
      "tags": [
        "fibra"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.7",
      "front": "O que é atenuação?",
      "back": "Perda de intensidade do sinal ao longo do meio. Cresce com a distância e piora com cabo longo demais, conector sujo ou obstáculos no Wi‑Fi.",
      "tags": [
        "atenuação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.5.8",
      "front": "O que significa SNR baixa?",
      "back": "O sinal útil está pouco acima do ruído: o receptor erra mais bits e, no Wi‑Fi, a taxa cai.",
      "tags": [
        "rádio",
        "interferência"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.5.9",
      "front": "Por que o rádio é um meio compartilhado?",
      "back": "Porque os dispositivos de um mesmo canal disputam o tempo de transmissão; mais clientes significam menos tempo de ar para cada um.",
      "tags": [
        "rádio",
        "wi-fi"
      ],
      "difficulty": "iniciante-intermediário"
    },
    {
      "id": "fc1.5.6",
      "front": "Qual risco existe em portas de rede ativas em áreas públicas?",
      "back": "Qualquer pessoa pode conectar um equipamento e ganhar acesso à rede: link ativo não é autorização. Desative portas sem uso e proteja racks e salas técnicas.",
      "tags": [
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.5.2",
      "type": "diagnóstico",
      "prompt": "Um desktop cabeado negocia a 100 Mbps em uma rede esperada de 1 Gbps. Liste três hipóteses.",
      "expectedAnswer": "Um par danificado ou conector mal crimpado (sem os quatro pares, o link cai para 100 Mbps); cabo de categoria inadequada ou longo demais; porta, placa ou equipamento no caminho limitado a 100 Mbps.",
      "explanation": "1 Gbps em cobre precisa dos quatro pares. Velocidade negociada abaixo do esperado aponta primeiro para o meio e para os equipamentos, não para IP ou aplicação."
    },
    {
      "id": "ex1.5.5",
      "type": "prática",
      "prompt": "Veja por qual meio seu computador está conectado e com que qualidade. Windows: Get-NetAdapter | Select-Object Name, Status, LinkSpeed e, no Wi-Fi, netsh wlan show interfaces. Linux: ethtool <interface> (cabo) ou iw dev <interface> link (Wi-Fi). Se estiver no Wi-Fi, afaste-se do roteador e rode de novo.",
      "expectedAnswer": "No cabo, uma velocidade fixa, como 1 Gbps. No Wi-Fi, canal, sinal e taxa; longe do roteador, sinal e taxa caem. Cabo em 100 Mbps numa rede de 1 Gbps indica suspeita de cabo ou porta.",
      "explanation": "O cabo negocia uma velocidade estável; no rádio, a taxa acompanha o sinal, que cai com distância e obstáculos (atenuação)."
    }
  ],
  "challenge": {
    "title": "Escolha de meios para uma pequena empresa",
    "scenario": "Uma empresa tem recepção aberta ao público, sala administrativa com computadores fixos, estoque com coletores móveis, câmeras IP, Wi‑Fi para visitantes e um rack central. No ano que vem, vai ocupar um segundo prédio a 250 m.",
    "tasks": [
      "Definir onde usar cobre, fibra e rádio, justificando cada escolha.",
      "Apontar um risco ou limite de cada meio nesse cenário.",
      "Dizer como verificaria se cada meio está saudável."
    ],
    "constraints": [
      "Evitar gasto desnecessário.",
      "Visitantes não podem entrar na rede interna pelas tomadas da recepção."
    ],
    "expectedDeliverables": [
      "Tabela com área, meio, justificativa, risco e verificação."
    ]
  },
  "commentedSolution": {
    "reasoning": "Separe o que é fixo, móvel, crítico e público; depois escolha por distância, mobilidade, estabilidade, custo e exposição.",
    "steps": [
      "Cobre para computadores e câmeras, fixos e a menos de 100 m do rack; com PoE, as câmeras recebem energia pelo cabo.",
      "Rádio para coletores e visitantes, que precisam de mobilidade; visitantes numa rede separada.",
      "Fibra até o segundo prédio: 250 m passam do limite do cobre.",
      "Tomadas sem uso da recepção desativadas e rack trancado.",
      "Verificação: velocidade e erros nas portas de cobre, sinal e taxa do Wi‑Fi no galpão, estado do link de fibra."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Wi‑Fi para tudo, porque é mais fácil.",
        "whyItIsWrong": "Câmeras e computadores fixos ficam mais estáveis no cabo; o rádio é compartilhado."
      },
      {
        "answer": "Cobre até o segundo prédio.",
        "whyItIsWrong": "250 m passam do limite de 100 m do par trançado."
      },
      {
        "answer": "Fibra para todos os pontos.",
        "whyItIsWrong": "Caro e desnecessário perto do rack."
      }
    ],
    "finalAnswer": "Cobre com PoE para pontos fixos e câmeras, rádio para mobilidade e visitantes (rede separada), fibra entre os prédios e tomadas públicas desativadas."
  },
  "glossary": [
    {
      "term": "Quadro",
      "shortDefinition": "O bloco de dados que a placa de rede envia de uma vez pelo meio, com endereços e um código de verificação.",
      "example": "Um quadro corrompido por um cabo ruim é descartado ao chegar.",
      "relatedLessons": [
        "2.4"
      ]
    },
    {
      "term": "CRC",
      "shortDefinition": "Código de verificação calculado sobre o quadro e enviado junto com ele; o receptor recalcula e compara para detectar erros.",
      "example": "Uma porta de switch com o contador de erros CRC subindo indica quadros corrompidos no caminho.",
      "relatedLessons": [
        "3.1"
      ]
    },
    {
      "term": "PoE",
      "shortDefinition": "Power over Ethernet: energia elétrica entregue pelo mesmo cabo de rede que leva os dados.",
      "example": "Um access point ou uma câmera IP alimentados pelo switch, sem tomada elétrica separada.",
      "relatedLessons": [
        "1.6"
      ]
    },
    {
      "term": "SNR",
      "shortDefinition": "Relação sinal-ruído: quanto o sinal útil está acima do ruído.",
      "example": "Um notebook longe do access point, com muitas redes vizinhas no mesmo canal, tem SNR baixa.",
      "relatedLessons": [
        "12.2"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_3-2022.html",
      "note": "Referência técnica para Ethernet cabeada."
    },
    {
      "type": "standard",
      "title": "IEEE 802.11 Wireless LAN",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_11-2020.html",
      "note": "Referência técnica para redes sem fio Wi‑Fi."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.5",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes/m00/0.5",
      "note": "Base conceitual sobre sinais físicos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m02",
      "lesson": "infra física e virtualização",
      "reason": "Racks, servidores, links e redes físicas sustentam plataformas e clusters."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m01",
      "lesson": "controle de acesso",
      "reason": "Controle físico e acesso à rede são parte da superfície de identidade e autorização do ambiente."
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
      "1.6"
    ]
  }
};
