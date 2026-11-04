export const lesson0006 = {
  "id": "0.6",
  "moduleId": "m00",
  "order": 6,
  "title": "Latência, largura de banda e throughput",
  "subtitle": "Como separar capacidade, tempo de resposta e vazão real para diagnosticar redes lentas.",
  "duration": "20-25 min + 45 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
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
    "troubleshooting"
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
    "Diferenciar largura de banda (capacidade), throughput (o que realmente passa) e latência (tempo de ida e volta), além de jitter e perda.",
    "Explicar do que a latência é feita (propagação, transmissão, processamento e fila) e por que mais banda nem sempre deixa a rede mais rápida.",
    "Medir RTT, variação e perda com ping e separar o tempo de rede do tempo de resposta do servidor."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Você paga por uma internet de 500 Mbps, e o teste de velocidade confirma um número alto. Mesmo assim, à noite a chamada de vídeo engasga, o jogo “trava” e as páginas demoram para começar a abrir. A conclusão costuma ser: “a internet está lenta, preciso de um plano maior”.\n  </p>\n  <p>\n    Muitas vezes o plano maior não muda nada. “Lento” pode querer dizer que a resposta demora para chegar, que pouco dado passa por segundo ou que o tempo de resposta oscila, e cada caso tem uma causa e uma solução diferentes. Quem confunde os três gasta dinheiro com o remédio errado. No trabalho, “a rede está lenta” é uma das reclamações mais comuns que suporte, infraestrutura e segurança recebem; separar essas medidas evita trocar equipamento ao acaso e ajuda até a notar um volume de saída fora do normal, que pode ser vazamento de dados.\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando “velocidade” é tratada como um número só. O plano contratado diz quanto o caminho comporta, mas a experiência depende também do tempo que cada resposta leva para ir e voltar, de quantos pacotes se perdem e de quanto esse tempo varia. Essas medidas mudam de forma independente: um link pode ter muita capacidade e resposta lenta, ou ir bem num teste e falhar numa chamada.\n  </p>\n  <p>\n    A diferença entre a taxa anunciada e o que o usuário sente existe desde os modems discados; com a internet, a distância até o servidor passou a pesar tanto quanto a taxa. Esta aula separa as três medidas, mostra do que o tempo de resposta é feito e por que mais banda só resolve uma parte dele.\n  </p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> <strong>largura de banda</strong> é a capacidade máxima de um caminho, teórica ou contratada. <strong>Throughput</strong> (vazão) é a taxa de dados úteis que realmente passa num período. <strong>Latência</strong> é o tempo que um dado leva de um ponto a outro; na prática, quase sempre se mede o <strong>RTT</strong> (round-trip time), o tempo de ida e volta.\n  </div>\n  <p>\n    Cada uma responde a uma pergunta diferente: largura de banda, “quanto caberia por segundo?”; throughput, “quanto passou de fato por segundo?”; latência, “quanto tempo a resposta demorou?”. As duas primeiras se medem em bits por segundo (Mbps, Gbps, como na aula 0.4); a latência, em milissegundos (ms). Um link de 1 Gbps diz quanto cabe no caminho, não quanto tempo a resposta leva.\n  </p>\n  <p>\n    Duas medidas completam o quadro:\n  </p>\n  <ul>\n    <li><strong>Jitter:</strong> a variação da latência. Um RTT que oscila entre 15 e 200 ms atrapalha mais uma chamada de vídeo do que um RTT estável de 60 ms.</li>\n    <li><strong>Perda:</strong> pacotes que não chegam. Num download, o pacote perdido é enviado de novo e a transferência desacelera, mas termina completa. Numa chamada ou num jogo não dá tempo de reenviar: o áudio picota e a imagem falha.</li>\n  </ul>\n  <div class=\"callout warning\">\n    <strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Olhar só a média do ping.</strong> Média de 20 ms com picos de 300 ms é jitter alto: a planilha abre bem, mas a chamada engasga. Olhe também o mínimo, o máximo e a perda.</li>\n      <li><strong>Tratar o teste de velocidade como prova de que tudo está bem.</strong> Ele mede o throughput até um servidor de teste próximo, naquele momento; o site ou sistema que você usa pode estar longe ou sobrecarregado.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Entre você e o servidor há vários trechos: o Wi‑Fi ou o cabo, o roteador de casa, a rede do provedor, a internet e a rede onde o servidor está. Em cada trecho, na ida e na volta, o tempo gasto é a soma de quatro parcelas, e a latência total soma todos os trechos:\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Parcela</th><th>Depende de</th><th>Ordem de grandeza</th></tr></thead>\n      <tbody>\n        <tr><td>Propagação</td><td>Distância e meio físico</td><td>Na fibra, a luz percorre cerca de 200.000 km/s: aproximadamente 5 ms a cada 1.000 km, só de ida. Um destino a 6.000 km soma cerca de 60 ms de RTT, com qualquer banda.</td></tr>\n        <tr><td>Transmissão</td><td>Taxa do link e tamanho do dado</td><td>Um pacote de 1.500 bytes (12.000 bits) leva 12 µs para sair em 1 Gbps e 1,2 ms em 10 Mbps.</td></tr>\n        <tr><td>Processamento</td><td>Equipamentos e programas no caminho e no destino</td><td>Roteadores, firewalls e o próprio servidor gastam tempo para examinar e tratar cada pacote ou pedido.</td></tr>\n        <tr><td>Fila</td><td>Tráfego maior do que o equipamento consegue encaminhar naquele momento</td><td>Cresce e diminui com a carga; é a parcela mais variável e a principal fonte de jitter.</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <h3>Por que mais banda nem sempre ajuda</h3>\n  <p>\n    Mais banda só reduz a parcela de <strong>transmissão</strong>. Propagação e processamento continuam iguais, e a fila só diminui se o problema era excesso de tráfego. Uma página que faz 20 requisições (pedidos ao servidor) em sequência, com RTT de 100 ms, gasta pelo menos 2 s só esperando respostas, seja o link de 50 Mbps ou de 1 Gbps. Já um arquivo grande depende muito da transmissão: aí mais banda ajuda.\n  </p>\n  <p>\n    A fila explica um caso comum em casa: durante um upload ou download pesado (enviar um vídeo grande para a nuvem, por exemplo), o roteador de casa ou o do provedor acumula pacotes à espera de saída, o RTT sobe de 20 ms para centenas de milissegundos e a navegação fica lenta. Esse efeito de buffers grandes demais tem nome: <strong>bufferbloat</strong>.\n  </p>\n  <h3>O que deixa o throughput abaixo da banda</h3>\n  <p>\n    O throughput fica abaixo da largura de banda por vários motivos: o overhead dos protocolos (aula 0.4), os pacotes perdidos que precisam ser reenviados, o Wi‑Fi negociando uma taxa menor (aula 0.5), outros dispositivos dividindo o mesmo link e o limite do próprio servidor. A latência também pesa: em muitas transferências o emissor espera a confirmação do destino antes de mandar mais dados, então um RTT alto pode reduzir a vazão de uma única transferência (detalhes na aula 6.4).\n  </p>\n  <h3>Medir por partes</h3>\n  <p>\n    O <strong>ping</strong> mede o RTT até um destino: só o caminho, sem o tempo que um servidor gasta para preparar uma página. Por isso um ping baixo até o roteador ou até a internet só inocenta aquele trecho; a demora pode estar mais adiante ou no servidor. Ferramentas como o <code>curl</code> separam o tempo de rede do tempo de resposta do servidor, como o laboratório mostra.\n  </p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense numa estrada entre duas cidades. A <strong>largura de banda</strong> é o número de faixas, o <strong>throughput</strong> é quantos caminhões realmente chegam por hora e a <strong>latência</strong> é quanto tempo cada caminhão leva na viagem. Uma rodovia larga até uma cidade a 2.000 km comporta muitos caminhões, mas o primeiro demora a chegar; uma rua estreita até o bairro vizinho entrega rápido, mas pouco volume.\n  </p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Sua internet é de 500 Mbps. Dividindo por 8, isso dá no máximo 62,5 MB/s, antes de qualquer overhead. Na prática, um download fica abaixo disso: o servidor de onde você baixa pode limitar a taxa, o Wi‑Fi pode ter negociado uma taxa menor, outras pessoas da casa estão usando o mesmo link e pacotes perdidos precisam ser reenviados. Um download a 45 MB/s nesse plano é normal.\n  </p>\n  <p>\n    Agora compare dois usos. Um jogo online envia pouco dado, mas precisa de latência baixa e estável: 1 Gbps num Wi‑Fi instável pode jogar pior do que 100 Mbps no cabo. Um backup de 50 GB para a nuvem é o oposto: ninguém percebe 30 ms a mais de RTT, mas o throughput de upload decide tudo: a 100 Mbps, ele leva pouco mais de 1 hora; a 10 Mbps, mais de 11 horas.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l06-title m00l06-desc\">\n    <title id=\"m00l06-title\">Latência, largura de banda e throughput em um caminho de rede</title>\n    <desc id=\"m00l06-desc\">O diagrama mostra um cliente acessando uma aplicação através do roteador, da internet e do servidor, destacando largura de banda, latência, throughput, fila, distância, perda e processamento.</desc>\n    <defs>\n      <marker id=\"m00l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"95\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"95\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi/cabo</text>\n    <rect x=\"210\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"275\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n    <text x=\"275\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fila</text>\n    <rect x=\"405\" y=\"150\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"480\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Internet/WAN</text>\n    <text x=\"480\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">distância + perda</text>\n    <rect x=\"625\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"690\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"690\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">processamento</text>\n    <rect x=\"820\" y=\"150\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"885\" y=\"180\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"885\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">resposta</text>\n    <line x1=\"160\" y1=\"185\" x2=\"210\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <line x1=\"340\" y1=\"185\" x2=\"405\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <line x1=\"555\" y1=\"185\" x2=\"625\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <line x1=\"755\" y1=\"185\" x2=\"820\" y2=\"185\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <path d=\"M885 235 C700 330 310 330 95 235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l06-arrow)\" />\n    <rect x=\"70\" y=\"50\" width=\"250\" height=\"58\" rx=\"10\" class=\"svg-zone\" />\n    <text x=\"195\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Largura de banda</text>\n    <text x=\"195\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">capacidade máxima do trecho</text>\n    <rect x=\"365\" y=\"50\" width=\"250\" height=\"58\" rx=\"10\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Latência / RTT</text>\n    <text x=\"490\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tempo de ida e volta</text>\n    <rect x=\"660\" y=\"50\" width=\"250\" height=\"58\" rx=\"10\" class=\"svg-zone\" />\n    <text x=\"785\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Throughput</text>\n    <text x=\"785\" y=\"96\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dados úteis entregues</text>\n    <text x=\"275\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fila aumenta latência</text>\n    <text x=\"480\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">distância soma RTT</text>\n    <text x=\"480\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">perda reduz throughput</text>\n    <text x=\"690\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">processamento soma tempo</text>\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> largura de banda é quanto cabe; throughput é quanto passa; latência (RTT) é quanto a resposta demora.</li>\n    <li>Jitter é a variação da latência; perda são pacotes que não chegam. Ambos derrubam chamadas e jogos.</li>\n    <li>Latência = propagação + transmissão + processamento + fila.</li>\n    <li>Mais banda só reduz a transmissão; não encurta a distância nem acelera o servidor.</li>\n    <li>Ping mede o caminho, não o servidor: meça por partes.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    A próxima aula, <strong>0.7 — O que é um protocolo</strong>, mostra como sistemas combinam regras de formato, ordem, estados, mensagens e erros para conversar de maneira previsível.\n  </p>\n</section>\n"
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
  "lab": {
    "id": "lab-0.6",
    "title": "Medindo latência, variação e tempo de resposta",
    "labType": "local",
    "objective": "Medir o RTT e a perda da sua conexão, separar o tempo de rede do tempo do servidor e comparar throughput com o plano contratado.",
    "prerequisites": [
      "Saber abrir um terminal e ter acesso à internet."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux/macOS",
      "ping e curl (no Windows 10 e 11, digite curl.exe)",
      "Navegador"
    ],
    "estimatedTimeMinutes": 15,
    "steps": [
      {
        "number": 1,
        "title": "Medir RTT, variação e perda",
        "instruction": "Envie 10 pings para um destino público e anote o mínimo, a média, o máximo e a porcentagem de perda.",
        "command": "Windows: ping 8.8.8.8 -n 10\nLinux/macOS: ping -c 10 8.8.8.8",
        "expectedOutput": "Dez linhas com o tempo de cada resposta em ms e, no fim, a perda (de preferência 0%) e o mínimo, a média e o máximo.",
        "explanation": "Cada tempo é um RTT. A distância entre o mínimo e o máximo mostra a variação (jitter); mínimo de 12 ms e máximo de 150 ms indicam fila em algum ponto. Se nada responder, a rede pode estar bloqueando o ping: isso não prova que a internet está fora."
      },
      {
        "number": 2,
        "title": "Separar tempo de rede e tempo do servidor",
        "instruction": "Peça uma página com curl e mostre quanto tempo levou cada etapa: descobrir o endereço do nome (dns), abrir a conexão (connect), combinar a criptografia (tls), receber o primeiro byte da resposta (starttransfer) e terminar (total).",
        "command": "Linux/macOS: curl -o /dev/null -s -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' https://example.com\nWindows: curl.exe -o NUL -s -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' https://example.com",
        "expectedOutput": "Uma linha com cinco tempos em segundos, acumulados desde o início, por exemplo: dns=0.012 connect=0.045 tls=0.090 starttransfer=0.140 total=0.141.",
        "explanation": "Os tempos são acumulados. Abrir a conexão custa cerca de um RTT: connect menos dns fica perto de um RTT até esse servidor. O intervalo entre tls e starttransfer inclui o tempo que o servidor gastou preparando a resposta, algo que o ping não mostra."
      },
      {
        "number": 3,
        "title": "Comparar throughput com o plano",
        "instruction": "Abra um teste de velocidade no navegador (por exemplo, speedtest.net ou fast.com), de preferência com o computador no cabo, e compare o download e o upload medidos com o plano contratado. Se o teste mostrar a latência sem carga e com carga (loaded), compare as duas.",
        "expectedOutput": "Download e upload abaixo do valor do plano, e uma latência com carga maior do que a latência sem carga.",
        "explanation": "O teste mede throughput até um servidor próximo, não a largura de banda. A latência com carga é medida enquanto o link está cheio: se ela sobe muito, os pacotes estão esperando em fila (bufferbloat)."
      }
    ],
    "expectedResult": "Uma pequena tabela com RTT mínimo, médio e máximo, perda, tempo até o primeiro byte do servidor e throughput medido, e a comparação de cada valor com o que você esperava."
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Uma empresa muda o servidor do seu sistema para um data center a cerca de 8.000 km dos usuários. Qual é, no mínimo, o RTT que eles vão ter? Contratar um link 10 vezes maior reduz esse valor?",
      "hints": [
        "Na fibra, são cerca de 5 ms a cada 1.000 km, só de ida.",
        "Qual parcela da latência a banda reduz?"
      ],
      "expectedIdeas": [
        "cerca de 40 ms de ida e 80 ms de ida e volta",
        "propagação",
        "mais banda não reduz",
        "servidor mais perto"
      ],
      "explanation": "8 × 5 ms = 40 ms de ida, cerca de 80 ms de RTT, antes de fila ou processamento. Mais banda só reduz a transmissão; para diminuir a propagação, é preciso aproximar o servidor dos usuários."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário reclama que um sistema está lento. O curl do laboratório mostra: dns=0.010 connect=0.040 tls=0.080 starttransfer=1.900 total=1.950 (em segundos, acumulados). A rede está lenta? Onde você investigaria?",
      "hints": [
        "connect menos dns é cerca de um RTT. Ele é alto?",
        "Quanto tempo passou entre tls e starttransfer, e quem estava trabalhando nesse intervalo?"
      ],
      "expectedIdeas": [
        "RTT de cerca de 30 ms, normal",
        "1,8 s entre tls e o primeiro byte",
        "o servidor demorou para responder",
        "investigar o servidor ou a aplicação, não o link"
      ],
      "explanation": "Abrir a conexão levou 30 ms (0,040 − 0,010): o caminho está bom. Do fim do tls ao primeiro byte passaram 1,82 s, tempo em que o servidor preparava a resposta. A investigação vai para o servidor e a aplicação; trocar de plano não ajudaria."
    }
  ],
  "quiz": [
    {
      "id": "q0.6.1",
      "question": "Qual alternativa melhor define latência?",
      "options": [
        "Capacidade máxima contratada do link",
        "Tempo para um dado ir e voltar ou chegar ao destino",
        "Quantidade de dados úteis entregue por segundo",
        "Variação do tempo de resposta entre pacotes"
      ],
      "answer": 1,
      "explanation": "Latência é tempo de resposta; em muitos testes aparece como RTT, tempo de ida e volta. Capacidade contratada é largura de banda, dados úteis por segundo é throughput e a variação do tempo de resposta é jitter.",
      "topic": "latência",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.6.2",
      "question": "Qual diferença principal entre largura de banda e throughput?",
      "options": [
        "Throughput é sempre maior que largura de banda",
        "Throughput é capacidade; largura de banda é entrega real",
        "Largura de banda é capacidade; throughput é entrega real",
        "Largura de banda mede tempo de resposta"
      ],
      "answer": 2,
      "explanation": "Largura de banda é quanto caberia no caminho; throughput é quanto passou de fato. O throughput fica abaixo por overhead, perda, Wi-Fi, outros dispositivos usando o link e limites do servidor.",
      "topic": "throughput",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.6.9",
      "type": "diagnóstico",
      "question": "Enquanto alguém da casa baixa um jogo de 80 GB, o ping para um site sobe de 20 ms para 400 ms. Quando o download termina, volta a 20 ms. Qual parcela da latência mais cresceu?",
      "options": [
        "Propagação, porque o site ficou mais longe",
        "Fila, porque pacotes passaram a esperar a vez num equipamento sobrecarregado do caminho",
        "Transmissão, porque os pacotes do ping ficaram maiores",
        "Processamento, porque o site passou a demorar mais para responder ao ping"
      ],
      "answer": 1,
      "explanation": "A distância e o tamanho dos pacotes do ping não mudaram. O download pesado encheu o link, e os pacotes do ping passaram a esperar na fila atrás dos pacotes do jogo; quando o download acaba, a fila esvazia. Com buffers grandes demais, esse efeito se chama bufferbloat.",
      "difficulty": "iniciante",
      "topic": "latência"
    },
    {
      "id": "q0.6.3",
      "question": "Uma chamada de vídeo engasga mesmo com link de alta capacidade. Qual métrica costuma ser especialmente importante?",
      "options": [
        "Jitter e perda",
        "Largura de banda contratada",
        "Tamanho médio dos pacotes",
        "Número de equipamentos no caminho"
      ],
      "answer": 0,
      "explanation": "Voz e vídeo em tempo real sofrem com variação de latência e com perda, porque não dá tempo de reenviar o que se perdeu. A banda já é alta no cenário, e o tamanho dos pacotes ou o número de equipamentos no caminho não explicam o engasgo.",
      "topic": "jitter",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q0.6.4",
      "question": "O ping para o roteador da sua casa responde em 2 ms, mas uma API na internet demora vários segundos para responder. O que isso indica?",
      "options": [
        "A largura de banda do link está saturada",
        "A rede está saudável e a API está fora do ar",
        "O roteador é o culpado, porque foi o único testado",
        "O trecho até o roteador parece bom, mas a demora pode estar mais adiante no caminho ou no servidor"
      ],
      "answer": 3,
      "explanation": "O ping até o roteador mede só o primeiro trecho. A demora pode estar no resto do caminho (distância, fila, perda) ou no tempo que o servidor leva para responder, que o ping não mostra.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.6.7",
      "type": "cálculo",
      "question": "Uma página faz 20 requisições em sequência, e o RTT até o servidor é de 100 ms. O link passa de 100 Mbps para 1 Gbps. O que acontece com o tempo mínimo de espera por respostas?",
      "options": [
        "Cai para cerca de 0,2 s, porque a banda aumentou 10 vezes",
        "Cai pela metade, porque metade do tempo é transmissão",
        "Dobra, porque o link maior gera mais fila",
        "Continua em cerca de 2 s, porque mais banda não reduz a propagação nem o RTT"
      ],
      "answer": 3,
      "explanation": "20 × 100 ms = 2 s de espera que dependem do RTT. Mais banda só reduz o tempo de transmissão, que é pequeno em requisições curtas; propagação e processamento continuam iguais.",
      "difficulty": "intermediário",
      "topic": "latência"
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
      "back": "Porque o ping mede só o caminho até o destino. O tempo que o servidor e a aplicação gastam para preparar a resposta não aparece nele.",
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
      "back": "Quando o gargalo é capacidade: transferências grandes ou link saturado. Não resolve distância, perda nem servidor lento, porque só reduz o tempo de transmissão.",
      "tags": [
        "capacity planning"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.6.7",
      "front": "Quais são os quatro componentes da latência?",
      "back": "Propagação (distância e meio), transmissão (taxa do link e tamanho do dado), processamento (equipamentos e softwares no caminho) e fila (tráfego acima do que o dispositivo encaminha). Mais banda só reduz a transmissão.",
      "tags": [
        "latência"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.6.2",
      "type": "diagnóstico",
      "prompt": "O acesso a um servidor em outro continente tem ping médio de 180 ms, mas downloads grandes desse servidor atingem boa taxa. Qual medida está ruim e qual parece aceitável? Que tipo de uso vai sofrer?",
      "expectedAnswer": "A latência está alta (por propagação, pela distância); o throughput para transferências grandes parece aceitável. Sofrem os usos interativos: páginas com muitas requisições, sistemas em que cada clique espera resposta, chamadas e jogos.",
      "explanation": "Alta latência prejudica a interatividade (cada clique espera a resposta), mas não impede uma boa vazão numa transferência grande."
    },
    {
      "id": "ex0.6.5",
      "type": "cálculo",
      "prompt": "Um escritório tem link de 100 Mbps e RTT de 80 ms até o servidor. Uma tela do sistema faz 30 requisições pequenas em sequência, e um relatório é um arquivo de 500 MB. (a) Quanto tempo, no mínimo, cada um leva? (b) O que muda se o link dobrar para 200 Mbps?",
      "expectedAnswer": "(a) Tela: 30 × 80 ms = 2,4 s só de espera por respostas. Relatório: 500 MB × 8 = 4.000 Mb; 4.000 ÷ 100 = 40 s, no mínimo. (b) A tela continua em cerca de 2,4 s, porque o RTT não muda; o relatório cai para cerca de 20 s.",
      "explanation": "Requisições pequenas em sequência dependem da latência; arquivos grandes dependem da transmissão. Por isso o mesmo upgrade de link resolve um caso e não o outro."
    }
  ],
  "challenge": {
    "title": "A chamada que engasga às 21h",
    "scenario": "Numa casa com internet de 300 Mbps de download e 30 Mbps de upload, as chamadas de vídeo do trabalho engasgam e o jogo online trava todas as noites por volta das 21h. O teste de velocidade feito de manhã mostrou 290 Mbps. Às 21h, um computador da casa começa a enviar o backup das fotos para a nuvem. A família quer contratar um plano de 1 Gbps de download.",
    "tasks": [
      "Dizer qual medida provavelmente piora às 21h e qual parcela da latência explica isso.",
      "Descrever como confirmar a hipótese com o ping do laboratório.",
      "Dizer se o plano de 1 Gbps de download resolve e propor uma solução mais barata."
    ],
    "expectedDeliverables": [
      "Uma explicação de 6 a 10 linhas com a hipótese, o teste e a recomendação."
    ]
  },
  "commentedSolution": {
    "reasoning": "Os sintomas só aparecem com o backup rodando e afetam chamadas e jogos, que dependem de latência estável. O teste da manhã mediu throughput de download com o link vazio.",
    "steps": [
      "Hipótese: o backup ocupa todo o upload de 30 Mbps; os pacotes da chamada e do jogo esperam na fila do roteador atrás das fotos, e o RTT e o jitter sobem (bufferbloat).",
      "Teste: rode ping -c 30 8.8.8.8 (ou ping 8.8.8.8 -n 30) com o backup parado e depois rodando. Se a média e o máximo sobem muito só com o backup, a fila é a causa.",
      "Conclusão: o gargalo é o upload e a fila. Um plano de 1 Gbps de download não muda nenhum dos dois.",
      "Solução: agendar o backup para a madrugada ou limitar a taxa de upload no programa de backup."
    ],
    "commonMistakes": [
      "Confiar no teste de velocidade da manhã, feito com o link vazio.",
      "Achar que mais download resolve um problema de upload e fila."
    ],
    "finalAnswer": "O backup enche o upload e cria fila no roteador; latência e jitter sobem. Confirme com ping com e sem o backup e resolva agendando ou limitando o backup, não com mais download."
  },
  "glossary": [
    {
      "term": "Pacote",
      "shortDefinition": "Bloco de dados que a rede transporta de uma vez, com informações de origem e destino.",
      "example": "Um pacote típico tem até 1.500 bytes; um download grande vira milhares de pacotes.",
      "relatedLessons": [
        "2.2"
      ]
    },
    {
      "term": "Overhead",
      "shortDefinition": "Bytes de controle que os protocolos acrescentam aos dados úteis; ocupam banda, mas não são o conteúdo que você queria.",
      "example": "Por causa do overhead, um link de 100 Mbps entrega menos de 100 Mbps de arquivo.",
      "relatedLessons": [
        "0.4"
      ]
    },
    {
      "term": "Ping",
      "shortDefinition": "Comando que envia pequenos pacotes de teste a um destino e mostra quanto tempo cada resposta levou (RTT) e quantas se perderam.",
      "example": "ping -c 10 8.8.8.8 no Linux; ping 8.8.8.8 -n 10 no Windows.",
      "relatedLessons": [
        "1.9",
        "4.8"
      ]
    },
    {
      "term": "curl",
      "shortDefinition": "Programa de linha de comando que faz pedidos a sites e APIs e pode mostrar o tempo de cada etapa da resposta.",
      "example": "curl -w com time_starttransfer mostra quando chegou o primeiro byte da resposta do servidor.",
      "relatedLessons": [
        "8.8"
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
      "quizScoreAtLeast": 70
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
