export const lesson0108 = {
  "id": "1.8",
  "moduleId": "m01",
  "order": 8,
  "title": "Métricas: latência, jitter, perda, throughput e disponibilidade",
  "subtitle": "Como medir uma rede antes de culpar link, firewall, Wi‑Fi, cloud ou aplicação.",
  "duration": "20-25 min + 50 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
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
    "Associar sintomas comuns (resposta lenta, áudio picotando, download lento, quedas recorrentes) à métrica que os explica: latência, jitter, perda, throughput ou disponibilidade.",
    "Medir por trecho (gateway, destino externo, aplicação) e analisar uma série de pings: média, picos que ela esconde (percentil) e estimativa de jitter.",
    "Calcular a indisponibilidade permitida por uma meta de disponibilidade (99%, 99,9%, 99,99%) e diferenciar SLA de SLO."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Segunda-feira, 9 h, chega o chamado: “o sistema está lento”. O provedor responde que o link de 1 Gbps está com folga. O time da aplicação mostra que o servidor está com processador e memória tranquilos. O fornecedor do Wi‑Fi diz que os access points estão todos no ar. Cada um tem um gráfico que o inocenta, e o usuário continua esperando vários segundos a cada tela.</p>\n  <p>A discussão só termina quando alguém mede o caminho trecho por trecho, do computador do usuário ao roteador, do roteador à internet e até o próprio sistema, e mostra em qual trecho o número piora. Sem saber medir, o chamado fica dias rodando entre equipes, alguém troca cabo, reinicia roteador ou compra mais banda, e a lentidão continua no mesmo lugar.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Por trás de chamados assim está uma confusão comum: tomar conectividade por qualidade. Dois computadores podem se alcançar e, ainda assim, a experiência ser ruim: o ping responde e a aplicação demora, o teste de velocidade é alto e a chamada picota, o serviço funciona agora mas caiu três vezes de manhã.</p>\n  <p>Na aula 0.6 você separou latência, largura de banda e throughput e viu que mais banda nem sempre deixa a rede mais rápida. Falta transformar isso num método: saber qual das cinco métricas (latência, jitter, perda, throughput e disponibilidade) explica cada sintoma, medir por trecho para descobrir onde ela piora e ler os números sem ser enganado pela média. É o que esta aula resolve.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>Métricas de rede descrevem a qualidade da comunicação. Cada uma responde a uma pergunta diferente, e cada sintoma aponta primeiro para uma delas.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> latência é o tempo que um pacote leva pelo caminho, de um ponto a outro; o ping a mede como RTT, o tempo de ida e volta; jitter é a variação da latência entre pacotes seguidos; perda é a fração de pacotes que não chega; throughput é a vazão útil que de fato passa; disponibilidade é a fração do tempo em que o serviço esteve acessível. Largura de banda é só o teto do link, a capacidade nominal (aula 0.6).</div>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Métrica</th><th>Pergunta que responde</th><th>Unidade</th><th>Sintoma típico</th></tr></thead>\n    <tbody>\n      <tr><td>Latência</td><td>Quanto tempo o pacote leva pelo caminho?</td><td>ms</td><td>Sistema ou site demora a responder a cada clique</td></tr>\n      <tr><td>Jitter</td><td>Esse tempo varia muito?</td><td>ms de variação</td><td>Voz picota, vídeo congela, jogo online “dá lag”</td></tr>\n      <tr><td>Perda</td><td>Quantos pacotes se perdem?</td><td>%</td><td>Chamada corta, páginas travam e recomeçam</td></tr>\n      <tr><td>Throughput</td><td>Quanto dado útil passa por segundo?</td><td>Mbps (MB/s × 8)</td><td>Download ou backup lento</td></tr>\n      <tr><td>Disponibilidade</td><td>Esteve acessível no período?</td><td>% ou minutos fora do ar</td><td>Quedas recorrentes, “às vezes não abre”</td></tr>\n    </tbody>\n  </table></div>\n  <p>O tipo de tráfego diz qual pergunta fazer primeiro. Voz, vídeo e jogos enviam pacotes pequenos o tempo todo e precisam deles no ritmo certo: sofrem com jitter e perda mesmo usando pouca banda. Backups e downloads grandes dependem de throughput. Sistemas que fazem muitas idas e voltas a cada clique sentem cada milissegundo de latência. E um serviço rápido quando está no ar ainda pode ter disponibilidade ruim, se cai várias vezes ao dia.</p>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>Medir por trecho</h3>\n  <p>Uma medição feita só de ponta a ponta diz que algo piorou, não onde. Como você viu na aula 1.7, o tráfego sai pela placa de rede, passa pelo switch ou access point, chega ao roteador (o gateway da rede) e segue pela internet até o serviço. Meça em três pontos, do mais próximo ao mais distante:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Gateway:</strong> 20 pings para o roteador da sua rede (<code>ping -n 20</code> no Windows, <code>ping -c 20</code> no Linux). Numa rede local saudável, o RTT fica em poucos milissegundos, sem perda. Perda ou tempos muito variados aqui apontam para o trecho local: Wi‑Fi, cabo, placa de rede ou o próprio roteador.</li>\n    <li><strong>Destino externo:</strong> o mesmo teste para um endereço na internet, como <code>8.8.8.8</code>. Se o gateway está bom e só aqui aparecem perda ou picos, o problema está do roteador para fora: link, provedor ou caminho.</li>\n    <li><strong>Aplicação:</strong> se os dois pings estão bons e o sistema continua lento, a demora está no serviço, não no caminho. A ferramenta <code>curl</code> divide o tempo de um acesso a um site em etapas (o laboratório mostra o comando): resolver o nome (DNS), conectar, negociar a criptografia (TLS) e receber a resposta. Em <code>dns=1.9 total=2.3</code>, quase todo o tempo foi gasto resolvendo o nome.</li>\n  </ol>\n\n  <h3>Média, percentil e jitter numa série</h3>\n  <p>Dez pings seguidos para o mesmo destino: <code>20, 21, 20, 22, 21, 20, 120, 21, 20, 115 ms</code>.</p>\n  <ul>\n    <li><strong>Média:</strong> 400 ÷ 10 = 40 ms. Parece aceitável.</li>\n    <li><strong>Distribuição:</strong> 2 de 10 respostas (20%) passaram de 100 ms, e é isso que o usuário sente. Por isso medições profissionais usam percentis: o <strong>p95</strong> é o valor abaixo do qual ficam 95% das medições (o p99, 99%). Aqui o p95 passa de 100 ms. Médias escondem picos; percentis os mostram.</li>\n    <li><strong>Jitter:</strong> uma estimativa simples é a média das diferenças entre respostas consecutivas: (1+1+2+1+1+100+99+1+95) ÷ 9 ≈ 33 ms. Para uma chamada de voz, isso já é ruim, mesmo com média de 40 ms.</li>\n  </ul>\n\n  <h3>Disponibilidade em números</h3>\n  <p>Disponibilidade é o tempo no ar dividido pelo tempo total. Um mês de 30 dias tem 43.200 minutos, e cada “nove” a mais divide por 10 o tempo fora do ar permitido:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Disponibilidade</th><th>Indisponibilidade permitida em 30 dias</th></tr></thead>\n    <tbody>\n      <tr><td>99%</td><td>432 min ≈ 7,2 h</td></tr>\n      <tr><td>99,9%</td><td>≈ 43 min</td></tr>\n      <tr><td>99,99%</td><td>≈ 4,3 min</td></tr>\n    </tbody>\n  </table></div>\n  <p>Essas metas aparecem em <strong>SLA</strong> (acordo de nível de serviço: o compromisso formal com cliente ou fornecedor, normalmente com consequência se for descumprido) e em <strong>SLO</strong> (objetivo de nível de serviço: a meta interna que o time persegue, em geral mais exigente que o SLA para dar margem).</p>\n\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li>Concluir que o serviço caiu porque o ping não responde: muitos servidores e firewalls bloqueiam o ping (ICMP). Se o site abre no navegador, ele está disponível.</li>\n      <li>Tomar o teste de velocidade como prova de que a rede está boa: ele mede o throughput até um servidor de teste, num momento e de um ponto; não mede o jitter durante uma chamada nem o caminho até o sistema da empresa.</li>\n      <li>Medir a disponibilidade de um só ponto: um sistema que nunca caiu visto de dentro do datacenter pode ter ficado inacessível para uma filial cujo link caiu.</li>\n    </ul>\n  </div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa estrada até o trabalho. A largura de banda é o número de faixas; o throughput, quantos carros passam por minuto; a latência, quanto dura a viagem; o jitter, a viagem levar 10 minutos num dia e 40 no outro; a perda, carros que não chegam; a disponibilidade, a estrada estar aberta. Alargar a estrada não resolve um semáforo quebrado no meio do caminho.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Um caso de casa: a chamada de vídeo trava no quarto, embora o teste de velocidade feito na sala mostre quase toda a banda contratada. Você mede por trecho, com 20 pings em cada teste:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Teste</th><th>Perda</th><th>Tempos (mínimo–máximo)</th></tr></thead>\n    <tbody>\n      <tr><td>Do quarto (Wi‑Fi) para o gateway</td><td>10% (2 de 20)</td><td>4–180 ms</td></tr>\n      <tr><td>Da sala, perto do roteador, para o gateway</td><td>0%</td><td>2–5 ms</td></tr>\n      <tr><td>Da sala para <code>8.8.8.8</code></td><td>0%</td><td>14–19 ms</td></tr>\n    </tbody>\n  </table></div>\n  <p>Perto do roteador, o trecho local e a internet estão bons. Do quarto, já no primeiro trecho há perda e tempos que vão de 4 a 180 ms: jitter e perda no Wi‑Fi, por causa de paredes, distância ou interferência. O teste de velocidade não mostrou isso porque foi feito na sala e mede quanto passa num download contínuo, não a variação durante uma chamada. Um plano de 1 Gbps não muda nada; aproximar o roteador, usar cabo ou instalar um access point no quarto resolve.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <p>O diagrama mostra o caminho medido em trechos (local até o gateway; do gateway até o serviço) e as cinco métricas, cada uma respondendo a uma pergunta diferente.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 500\" role=\"img\" aria-labelledby=\"m01l08-title m01l08-desc\">\n    <title id=\"m01l08-title\">Métricas de rede no caminho entre cliente e serviço</title>\n    <desc id=\"m01l08-desc\">Cliente envia tráfego por switch, gateway e internet até o serviço. O caminho é dividido em trecho local e trecho externo, e o diagrama destaca latência, jitter, perda, throughput e disponibilidade.</desc>\n    <defs>\n      <marker id=\"m01l08-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <rect x=\"240\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"310\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <rect x=\"440\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"510\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <rect x=\"640\" y=\"90\" width=\"140\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"710\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n    <rect x=\"820\" y=\"90\" width=\"120\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"880\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n\n    <line x1=\"40\" y1=\"60\" x2=\"580\" y2=\"60\" class=\"svg-flow svg-flow--request\" />\n    <text x=\"310\" y=\"48\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">trecho local: ping para o gateway</text>\n    <line x1=\"600\" y1=\"60\" x2=\"940\" y2=\"60\" class=\"svg-flow svg-flow--response\" />\n    <text x=\"770\" y=\"48\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">trecho externo: ping para a internet, tempo da aplicação</text>\n\n    <line x1=\"180\" y1=\"125\" x2=\"240\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"380\" y1=\"125\" x2=\"440\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"580\" y1=\"125\" x2=\"640\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n    <line x1=\"780\" y1=\"125\" x2=\"820\" y2=\"125\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l08-arrow)\" />\n\n    <path d=\"M880 170 C760 235, 510 235, 110 170\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l08-arrow)\" />\n    <text x=\"500\" y=\"245\" text-anchor=\"middle\" class=\"svg-label\">RTT: ida + processamento + volta</text>\n\n    <rect x=\"75\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"157\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Latência</text>\n    <text x=\"157\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tempo por operação</text>\n    <text x=\"157\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ms / RTT</text>\n\n    <rect x=\"285\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"367\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Jitter</text>\n    <text x=\"367\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">variação da latência</text>\n    <text x=\"367\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">voz e vídeo sofrem</text>\n\n    <rect x=\"495\" y=\"300\" width=\"165\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"577\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Perda</text>\n    <text x=\"577\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pacotes não chegam</text>\n    <text x=\"577\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">retransmissão/queda</text>\n\n    <rect x=\"705\" y=\"300\" width=\"190\" height=\"85\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"800\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">Throughput</text>\n    <text x=\"800\" y=\"352\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">vazão útil real</text>\n    <text x=\"800\" y=\"374\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">menor que a banda nominal</text>\n\n    <line x1=\"110\" y1=\"405\" x2=\"880\" y2=\"405\" class=\"svg-flow svg-flow--blocked\" />\n    <text x=\"500\" y=\"438\" text-anchor=\"middle\" class=\"svg-label\">Disponibilidade: capacidade de o serviço estar acessível no período combinado</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> troque “está lento” por uma pergunta (tempo, variação, descarte, vazão ou queda?) e meça por trecho.</li>\n    <li>Latência mede tempo; jitter, variação; perda, descarte; throughput, vazão útil; disponibilidade, tempo no ar.</li>\n    <li>Médias escondem picos: olhe o p95 e o jitter.</li>\n    <li>99,9% em 30 dias ainda permite ≈ 43 min fora do ar; SLA é o compromisso, SLO a meta interna.</li>\n    <li>Ping bom não prova aplicação saudável; ping sem resposta não prova serviço fora do ar.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
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
  "lab": {
    "id": "lab-1.8",
    "title": "Medindo por trecho: gateway, internet e aplicação",
    "labType": "security",
    "objective": "Medir RTT, perda e variação até o gateway e até um destino externo, medir o tempo de um acesso a um site e decidir qual trecho investigar.",
    "prerequisites": [
      "Terminal do Windows (PowerShell) ou do Linux/macOS.",
      "Use poucos pacotes (20) e destinos seus ou públicos, como 8.8.8.8."
    ],
    "estimatedTimeMinutes": 20,
    "steps": [
      {
        "title": "Achar o gateway e medir o trecho local",
        "instruction": "Descubra o endereço do gateway (no Windows, a linha Gateway Padrão; no Linux, o IP depois de default via) e envie 20 pings para ele. Anote perda, mínimo, máximo e média.",
        "command": "Windows: ipconfig\nWindows: ping -n 20 <gateway>\nLinux: ip route | grep default\nLinux: ping -c 20 <gateway>",
        "expectedOutput": "Em rede local saudável: 0% de perda e tempos de poucos milissegundos, com mínimo e máximo próximos.",
        "explanation": "Perda ou máximo muito acima do mínimo já no gateway apontam para o trecho local. No Wi‑Fi, repita perto do roteador e compare."
      },
      {
        "title": "Medir o trecho externo",
        "instruction": "Repita o teste para um destino na internet e compare com o resultado do gateway.",
        "command": "Windows: ping -n 20 8.8.8.8\nLinux: ping -c 20 8.8.8.8",
        "expectedOutput": "Tempos maiores que os do gateway (dezenas de milissegundos é comum) e perda zero ou quase zero.",
        "explanation": "Gateway bom e destino externo com perda ou picos indicam o trecho do roteador para fora: link, provedor ou caminho."
      },
      {
        "title": "Medir o tempo da aplicação",
        "instruction": "Meça o terceiro ponto, a aplicação, com o mesmo curl da aula 0.6, agora para um site que você usa no dia a dia (ou example.com). Rode-o logo depois dos pings e compare: veja qual etapa concentra a maior parte do total.",
        "command": "Linux/macOS: curl -o /dev/null -s -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' https://example.com\nWindows: curl.exe -o NUL -s -w 'dns=%{time_namelookup} connect=%{time_connect} tls=%{time_appconnect} starttransfer=%{time_starttransfer} total=%{time_total}\\n' https://example.com",
        "expectedOutput": "Uma linha com os tempos em segundos: dns=…, connect=…, tls=…, starttransfer=…, total=….",
        "explanation": "Os tempos são acumulados desde o início (connect já inclui o dns). Se os pings dos passos 1 e 2 estão bons e uma etapa concentra quase todo o total, a demora está nela (DNS, TLS ou servidor), não no caminho."
      },
      {
        "title": "Analisar a série e decidir",
        "instruction": "Pegue os 10 primeiros tempos do passo 2. Calcule a média, conte quantos passam do dobro do mínimo e estime o jitter pela média das diferenças entre respostas seguidas. Depois diga qual trecho você investigaria primeiro, se algum.",
        "expectedOutput": "Média, quantidade de picos, jitter estimado e uma conclusão, por exemplo: gateway 0% e 2–4 ms; externo 0% e 14–19 ms; jitter ≈ 2 ms; nenhum trecho suspeito.",
        "explanation": "A média esconde picos; os picos e o jitter mostram se voz e vídeo sofreriam nesse caminho."
      }
    ],
    "expectedResult": "Você mediu os dois trechos e o tempo da aplicação, calculou média e jitter de uma série real e sabe dizer qual trecho investigar."
  },
  "mentorQuestions": [
    {
      "type": "aplicação",
      "question": "Uma empresa faz o backup noturno pela internet e, de dia, os atendentes usam telefone pela rede (voz sobre IP). Para cada um, qual métrica você acompanharia primeiro e por quê?",
      "hints": [
        "Um transfere muito dado de uma vez; o outro envia pacotes pequenos o tempo todo.",
        "O que importa para a voz: quantidade ou ritmo?"
      ],
      "expectedIdeas": [
        "backup: throughput",
        "voz: jitter e perda",
        "tráfego em tempo real",
        "volume contínuo"
      ],
      "explanation": "O backup depende de vazão útil sustentada (throughput) para terminar na janela da noite. A voz usa pouca banda, mas precisa dos pacotes no ritmo certo: jitter e perda estragam a chamada mesmo com o link folgado."
    },
    {
      "type": "cenário real",
      "question": "O monitoramento instalado no datacenter mostra 100% de disponibilidade do sistema no mês, mas a filial teve três quedas de link de 20 minutos. Para os usuários da filial, qual foi a disponibilidade? O que muda no jeito de medir?",
      "hints": [
        "Disponibilidade para quem?",
        "30 dias têm 43.200 minutos."
      ],
      "expectedIdeas": [
        "60 min fora do ar",
        "cerca de 99,86%",
        "medir de onde o usuário está",
        "mais de um ponto de medição"
      ],
      "explanation": "Para a filial, foram 60 minutos sem acesso: 1 − 60 ÷ 43.200 ≈ 99,86%. Medir só de dentro do datacenter esconde isso; a disponibilidade precisa ser medida também de onde os usuários estão."
    }
  ],
  "quiz": [
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
      "id": "q1.8.10",
      "question": "O ping para o servidor de um site mostra 100% de perda, mas o site abre normalmente no navegador. O que concluir?",
      "options": [
        "O servidor ou um firewall no caminho provavelmente bloqueia o ping (ICMP); o site está disponível.",
        "O site está fora do ar e o navegador mostra uma cópia antiga.",
        "O link tem perda total e precisa ser trocado.",
        "O jitter está alto demais para o ping funcionar."
      ],
      "answer": 0,
      "explanation": "Muitos servidores e firewalls bloqueiam o ping. Se o serviço responde quando acessado de verdade, ele está disponível; ping sem resposta não prova queda.",
      "topic": "disponibilidade",
      "difficulty": "iniciante-intermediário",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
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
      "id": "fc1.8.9",
      "front": "Ping para o gateway está bom, mas para 8.8.8.8 há perda e picos. Onde investigar?",
      "back": "Do roteador para fora: link, provedor ou caminho. O trecho local (Wi‑Fi, cabo, placa, roteador) está saudável.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.8.5",
      "type": "comando/output",
      "prompt": "Dez pings para um servidor de voz retornam 30, 31, 30, 150, 29, 30, 160, 31, 30, 29 ms, com 0% de perda. Calcule a média, diga o que ela esconde e qual métrica explica as reclamações de áudio picotado.",
      "expectedAnswer": "Média = 550 ÷ 10 = 55 ms, que parece aceitável. Ela esconde que 2 de 10 respostas (20%) chegaram a 150 ms ou mais. A métrica é o jitter: as diferenças entre respostas consecutivas somam 1+1+120+121+1+130+129+1+1 = 505, cerca de 56 ms em média, ruim para voz. O próximo passo é medir por trecho (gateway e destino externo) para achar onde a variação começa e comparar Wi‑Fi com cabo.",
      "explanation": "Média e perda zero não bastam para tráfego em tempo real; a variação (jitter) e os picos (percentis) é que definem a experiência."
    },
    {
      "id": "ex1.8.6",
      "type": "cálculo",
      "prompt": "Um provedor promete 99,9% de disponibilidade mensal (30 dias). No mês, o link caiu três vezes: 10, 15 e 20 minutos. O SLA foi cumprido? Qual foi a disponibilidade real?",
      "expectedAnswer": "Não, por pouco. 99,9% permite 0,1% de 43.200 minutos = 43,2 minutos fora do ar, e o link ficou 10 + 15 + 20 = 45 minutos fora, 1,8 minuto acima do limite. Disponibilidade real: 1 − 45 ÷ 43.200 ≈ 99,896%, abaixo de 99,9% (arredondada, parece 99,90%: compare os minutos).",
      "explanation": "O exercício aplica o cálculo da tabela de disponibilidade a um caso de cobrança de fornecedor: quedas curtas somadas podem estourar a meta."
    }
  ],
  "challenge": {
    "title": "Transforme 'a rede está lenta' em investigação mensurável",
    "scenario": "Os atendentes de uma filial reclamam que o sistema de atendimento, que fica na internet, está lento em alguns momentos do dia. Na matriz, ninguém reclama. O gerente quer contratar mais banda para a filial.",
    "tasks": [
      "Dizer quais métricas você mediria e de onde (filial e matriz).",
      "Montar a sequência de testes por trecho com os comandos da aula e o que cada resultado indicaria.",
      "Explicar ao gerente quando mais banda resolveria e quando não."
    ],
    "expectedDeliverables": [
      "Um plano de 5 a 10 linhas com os testes, o que cada resultado indicaria e a resposta ao gerente."
    ]
  },
  "commentedSolution": {
    "reasoning": "A reclamação está concentrada na filial e é intermitente. Isso aponta para o caminho da filial, não para o sistema, mas só a comparação de medições confirma.",
    "steps": [
      "Na filial, nos horários de reclamação: 20 pings para o gateway. Perda ou tempos variados aqui = trecho local (Wi‑Fi, cabo, roteador).",
      "Ainda na filial: 20 pings para um destino externo. Gateway bom e externo com perda ou picos = link ou provedor da filial.",
      "Medir o tempo de acesso ao sistema (curl) na filial e na matriz. Pings bons e tempo alto nos dois lugares = o sistema; só na filial = o caminho da filial.",
      "Repetir em horário sem reclamação: se tudo melhora, o link pode estar saturado nos horários de pico."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Comprar mais banda imediatamente",
        "whyItIsWrong": "Só resolve se a medição mostrar o link da filial saturado nos horários de pico. Não resolve perda no Wi‑Fi, jitter nem lentidão do sistema."
      },
      {
        "answer": "Culpar o sistema sem medir",
        "whyItIsWrong": "A matriz usa o mesmo sistema e não reclama: a diferença está no caminho da filial até ele."
      }
    ],
    "finalAnswer": "Meça na filial e na matriz, por trecho (gateway, destino externo, aplicação), nos horários de reclamação e fora deles. Mais banda só resolve se o link da filial estiver saturado nos horários de pico; perda local, jitter ou sistema lento pedem outra correção."
  },
  "glossary": [
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de mensagens de controle da rede; é o que o ping usa para pedir e receber respostas.",
      "example": "Um firewall pode bloquear o ICMP e deixar o site acessível.",
      "relatedLessons": [
        "4.8"
      ]
    },
    {
      "term": "DNS",
      "shortDefinition": "Serviço que transforma nomes, como example.com, em endereços IP.",
      "example": "Se o DNS demora, todo acesso por nome demora, mesmo com o ping bom.",
      "relatedLessons": [
        "7.1"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo que criptografa a conexão entre o navegador (ou outro programa) e o servidor; é o que faz o https.",
      "example": "No curl, o tempo tls mostra quanto levou para negociar essa criptografia.",
      "relatedLessons": [
        "8.3"
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
      "quizScoreAtLeast": 70
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
