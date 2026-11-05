export const lesson0110 = {
  "id": "1.10",
  "moduleId": "m01",
  "order": 10,
  "title": "Revisão e mini-projeto: mapear sua rede",
  "subtitle": "Consolide os fundamentos do Módulo 1 criando um mapa físico e lógico com inventário, evidências, métricas, riscos e próximos passos.",
  "duration": "15-25 min + 65 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "ligação/revisão",
  "xp": 205,
  "tags": [
    "redes",
    "fundamentos",
    "revisão",
    "mini-projeto",
    "mapeamento",
    "inventário",
    "topologia",
    "diagnóstico",
    "segurança",
    "documentação"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.1",
      "reason": "É necessário entender o conceito de rede como sistema de comunicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.7",
      "reason": "É necessário distinguir papéis de NIC, switch, roteador, AP e firewall."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.9",
      "reason": "O mini-projeto usa comandos de diagnóstico inicial para coletar evidências."
    }
  ],
  "objectives": [
    "Montar o inventário de uma rede pequena, classificando cada item como dispositivo final, intermediário, serviço ou meio, e separar a visão física da visão lógica.",
    "Usar ipconfig, arp, ping, tracert e nslookup como evidências do mapa, registrando data, origem e limite de cada uma e separando fato, hipótese e lacuna.",
    "Apontar riscos iniciais revelados pelo mapa e sanitizá-lo antes de compartilhar."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Imagine que você acabou de assumir o suporte de um escritório pequeno. Na primeira semana chegam três queixas: “a internet está lenta”, “a impressora sumiu” e “o Wi-Fi da sala de reunião não pega”. Ninguém sabe dizer qual aparelho é o roteador, quem configurou o Wi-Fi nem onde fica o servidor de arquivos.</p>\n  <p>A tentação é agir no chute: reiniciar tudo, trocar o roteador, contratar um link mais rápido. Se o problema era só o Wi-Fi fraco numa sala longe do roteador, o link novo custa caro e não resolve nada.</p>\n  <p>Esta aula fecha o Módulo 1 com o primeiro trabalho profissional numa rede desconhecida: mapeá-la com os conceitos e comandos que você já viu. Em segurança vale o mesmo: não se protege o que não se conhece.</p>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando a rede não tem mapa: o diagnóstico começa no escuro. Um incidente parece problema de aplicação quando é DNS, problema de internet quando é o gateway, ou falha do servidor quando é o cabo ou o Wi-Fi. E sem inventário não há segurança: um aparelho que ninguém sabe que existe também não é protegido nem atualizado.</p>\n  <p>Um desenho bonito também não resolve. Ele mostra um roteador e alguns computadores, mas não diz qual comando confirmou cada informação, quando ela foi coletada nem o que ainda é suposição. Uma semana depois, ninguém sabe se ele continua valendo.</p>\n  <p>Esta aula mostra como montar um mapa sustentado por evidências: perguntas feitas em ordem, do seu host para fora, com os comandos da aula 1.9 e o limite de cada um anotado.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> um mapa de rede é um documento que reúne visão física, visão lógica, inventário, serviços, evidências, métricas e riscos de uma rede, para apoiar diagnóstico, operação e segurança.</div>\n  <p>Pense no mapa como uma <strong>hipótese documentada</strong> sobre como a comunicação acontece. Ele mostra o que você sabe, como sabe (qual comando, quando e de qual máquina) e o que ainda não sabe. Cada afirmação recebe uma de três etiquetas:</p>\n  <ul>\n    <li><strong>Fato:</strong> confirmado por evidência com data e origem. Ex.: “gateway 192.168.0.1, visto no <code>ipconfig /all</code> do notebook em 05/11, 14h”.</li>\n    <li><strong>Hipótese:</strong> deduzido, ainda não confirmado. Ex.: “o tráfego provavelmente sai pelo roteador do provedor”.</li>\n    <li><strong>Lacuna:</strong> o que você não conseguiu confirmar. Ex.: “não sei o que é o aparelho 192.168.0.30”.</li>\n  </ul>\n  <h3>Inventário e as duas visões</h3>\n  <p>O <strong>inventário</strong> é a lista do que existe na rede, com cada item classificado pelo papel que exerce (aula 1.2): <strong>dispositivo final</strong> (notebook, celular, impressora), <strong>intermediário</strong> (switch, AP, roteador), <strong>serviço</strong> (DNS, DHCP, internet) ou <strong>meio</strong> (cabo, fibra, rádio). Classifique pelo papel, não pelo nome comercial: o “roteador” de casa costuma ser roteador, switch e AP ao mesmo tempo.</p>\n  <p>A <strong>visão física</strong> mostra onde as coisas estão e como se ligam: cabos, Wi-Fi, portas, aparelhos e cômodos. A <strong>visão lógica</strong> mostra como a comunicação acontece: IPs, gateway, DNS, serviços e o caminho provável até a internet. As duas ficam em seções separadas, porque um mesmo cabo pode levar tráfego para destinos muito diferentes (aula 1.4).</p>\n  <h3>Mapa é documento sensível</h3>\n  <p>Um mapa revela IPs, nomes internos, caminhos e controles de segurança: tudo o que um atacante gostaria de saber antes de agir. Por isso, mapeie só redes suas ou com autorização, sem varreduras, e <strong>sanitize</strong> antes de compartilhar: mascare o que identifica a rede, como <code>192.168.1.23</code> → <code>192.168.x.23</code> e <code>servidor-financeiro.empresa.local</code> → <code>servidor-A</code>. Faça o mesmo com MACs e nomes de usuário.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Misturar físico e lógico:</strong> parece que o cabo decide sozinho o caminho do tráfego. Separe as visões.</li>\n      <li><strong>Concluir com uma única evidência:</strong> o primeiro comando parece confirmar a hipótese favorita. Cruze configuração, alcance, nome e caminho.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Um mapa útil nasce de perguntas feitas em ordem: do seu host para fora. Cada etapa tem uma evidência típica e um limite que você precisa anotar.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Etapa</th><th>O que registrar</th><th>Evidência (Windows · Linux)</th><th>Limite da evidência</th></tr></thead>\n    <tbody>\n      <tr><td>1. Host</td><td>Nome, interface, IP, máscara, gateway, DNS e tipo de conexão (cabo ou Wi-Fi)</td><td><code>ipconfig /all</code> · <code>ip addr</code>, <code>ip route</code></td><td>Mostra só o host onde você rodou o comando</td></tr>\n      <tr><td>2. Vizinhança</td><td>Gateway e seu MAC, outros vizinhos, meio usado</td><td><code>arp -a</code> · <code>ip neigh</code></td><td>Mostra só vizinhos da rede local com quem o host falou há pouco. Um servidor de outra rede nunca aparece: o host fala com ele pelo gateway</td></tr>\n      <tr><td>3. Serviços</td><td>DNS, DHCP, internet, impressora, servidor interno</td><td><code>nslookup example.com</code> e a lista de serviços conhecidos</td><td>Serviço que você não usa não aparece</td></tr>\n      <tr><td>4. Caminho</td><td>Saltos visíveis até um destino externo</td><td><code>tracert 8.8.8.8</code> · <code>tracepath 8.8.8.8</code></td><td>Saltos que não respondem aparecem como asteriscos, o que não prova queda; o comando não mostra regras de firewall</td></tr>\n      <tr><td>5. Métricas</td><td>Latência, perda e sintomas relatados (horário, local, quem é afetado)</td><td><code>ping &lt;gateway&gt;</code>, <code>ping 8.8.8.8</code></td><td>O ICMP pode ser bloqueado; um teste rápido pode não reproduzir um problema intermitente</td></tr>\n      <tr><td>6. Riscos</td><td>Wi-Fi fraco, aparelho sem dono conhecido, visitantes na mesma rede dos computadores de trabalho, falta de documentação</td><td>Observação + resultado das etapas anteriores</td><td>O que não foi confirmado entra como lacuna, não como fato</td></tr>\n    </tbody>\n  </table></div>\n  <p>A ordem também guia o diagnóstico: se o host tem IP mas não alcança o gateway, o problema está antes dele (cabo ou Wi-Fi, switch ou AP, o próprio gateway), e DNS, provedor e aplicação ficam para depois.</p>\n  <p>Toda a tabela vale para um momento: o DHCP troca endereços, a qualidade do Wi-Fi varia e aparelhos entram e saem. Por isso cada evidência leva <strong>data e origem</strong>, e o mapa precisa ser atualizado, ou fica obsoleto.</p>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Mapear uma rede é como mapear um hospital: não basta saber que existe uma recepção; é preciso saber onde ficam as salas, quais corredores ligam os setores e quais portas são restritas. A diferença é que a rede muda sozinha, todos os dias, por isso cada informação do mapa leva data.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Um inventário inicial de uma casa, já classificado e sanitizado:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Item</th><th>Tipo</th><th>Meio</th><th>Evidência</th></tr></thead>\n    <tbody>\n      <tr><td>Notebook (host-A)</td><td>Dispositivo final</td><td>Wi-Fi</td><td><code>ipconfig /all</code>: IP 192.168.x.23, gateway 192.168.x.1</td></tr>\n      <tr><td>Celular e smart TV</td><td>Dispositivos finais</td><td>Wi-Fi</td><td>Lista de dispositivos conectados no roteador (se você o administra)</td></tr>\n      <tr><td>Impressora</td><td>Dispositivo final</td><td>Rede local</td><td>Aparece em <code>arp -a</code> depois de você imprimir</td></tr>\n      <tr><td>Roteador do provedor</td><td>Intermediário (gateway, switch e AP Wi-Fi no mesmo aparelho)</td><td>Fibra até o provedor</td><td><code>arp -a</code> mostra o gateway; ping responde</td></tr>\n      <tr><td>DNS entregue por DHCP</td><td>Serviço</td><td>—</td><td><code>ipconfig /all</code> e <code>nslookup</code></td></tr>\n      <tr><td>Internet via fibra</td><td>Serviço (link)</td><td>Fibra</td><td><code>tracert 8.8.8.8</code></td></tr>\n    </tbody>\n  </table></div>\n  <p>O mapa também anota os sintomas: Wi-Fi ruim no quarto, latência maior em jogos à noite. Mesmo simples, ele já orienta o diagnóstico. Se só o notebook falha, o problema pode estar no host. Se todos falham, a suspeita vai para gateway, link ou provedor. Se nomes não resolvem, o DNS entra na investigação. Se só o quarto tem problema, o meio rádio e a posição do roteador viram hipótese.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 470\" role=\"img\" aria-labelledby=\"m01l10-title m01l10-desc\">\n    <title id=\"m01l10-title\">Mini-projeto de mapeamento de rede</title>\n    <desc id=\"m01l10-desc\">Diagrama mostrando host do aluno, rede local, gateway, serviços e internet, e embaixo as evidências que alimentam o mapa e os riscos que ele revela.</desc>\n    <defs>\n      <marker id=\"m01l10-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"112\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Seu host</text>\n    <text x=\"112\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP, DNS, gateway</text>\n    <rect x=\"250\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"322\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Acesso</text>\n    <text x=\"322\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">switch/AP/meio</text>\n    <rect x=\"460\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"532\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"532\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota padrão</text>\n    <rect x=\"670\" y=\"70\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"742\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n    <text x=\"742\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">firewall</text>\n    <rect x=\"835\" y=\"70\" width=\"110\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"890\" y=\"100\" text-anchor=\"middle\" class=\"svg-label\">Serviços</text>\n    <text x=\"890\" y=\"123\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS, web</text>\n    <line x1=\"185\" y1=\"108\" x2=\"250\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"395\" y1=\"108\" x2=\"460\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"605\" y1=\"108\" x2=\"670\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"815\" y1=\"108\" x2=\"835\" y2=\"108\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <rect x=\"90\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"200\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n    <text x=\"200\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ipconfig, ping, arp</text>\n    <text x=\"200\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tracert, nslookup</text>\n    <rect x=\"380\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"490\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Mapa</text>\n    <text x=\"490\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">físico + lógico</text>\n    <text x=\"490\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">serviços + métricas</text>\n    <rect x=\"670\" y=\"230\" width=\"220\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--attacker\"></rect>\n    <text x=\"780\" y=\"260\" text-anchor=\"middle\" class=\"svg-label\">Riscos</text>\n    <text x=\"780\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede plana, Wi-Fi</text>\n    <text x=\"780\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativo desconhecido</text>\n    <line x1=\"310\" y1=\"282\" x2=\"380\" y2=\"282\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <line x1=\"600\" y1=\"282\" x2=\"670\" y2=\"282\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m01l10-arrow)\"></line>\n    <text x=\"490\" y=\"405\" text-anchor=\"middle\" class=\"svg-label\">Mini-projeto: desenhar, evidenciar, interpretar, apontar riscos e preparar o Modelo OSI.</text>\n  </svg>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> o mapa registra o que você sabe, como sabe (comando, data, origem) e o que falta: fato, hipótese ou lacuna.</li>\n    <li>Classifique cada item por papel: final, intermediário, serviço ou meio.</li>\n    <li>Separe a visão física (cabos, Wi-Fi, aparelhos) da lógica (IP, gateway, DNS, caminho).</li>\n    <li>Cada comando tem um limite: o ARP só mostra vizinhos locais; asterisco no <code>tracert</code> não prova queda.</li>\n    <li>Mapa interno é sensível: só rede autorizada, e sanitize antes de compartilhar.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>No Módulo 2, a aula “Por que o Modelo OSI existe” organiza em camadas tudo o que você mapeou aqui. Em vez de dizer “a rede caiu”, você vai perguntar em qual camada está o problema.</p>\n</section>\n"
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
      "ARP",
      "ICMP",
      "DNS",
      "DHCP",
      "HTTP",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "bits e sinais",
      "protocolos",
      "métricas",
      "equipamentos de rede",
      "diagnóstico inicial"
    ],
    "enables": [
      "Modelo OSI",
      "troubleshooting estruturado",
      "segmentação",
      "segurança de redes",
      "cloud networking"
    ]
  },
  "lab": {
    "id": "lab-1.10",
    "title": "Mini-projeto: mapear sua rede com evidências",
    "labType": "security",
    "objective": "Montar um mapa inicial da sua rede (inventário, visão física e lógica, riscos e lacunas) com evidências dos comandos do módulo, sem expor dados sensíveis.",
    "prerequisites": [
      "Usar apenas a sua rede (de casa, por exemplo) ou uma rede com autorização explícita.",
      "Ter um terminal: Windows PowerShell ou Prompt de Comando, ou Linux."
    ],
    "tools": [
      "Terminal Windows ou Linux",
      "Editor de texto ou planilha"
    ],
    "estimatedTimeMinutes": 30,
    "steps": [
      {
        "number": 1,
        "title": "Coletar a configuração do host",
        "instruction": "Anote a data, a hora e a máquina de onde você coleta. Registre IP, máscara, gateway, DNS e tipo de conexão (cabo ou Wi-Fi).",
        "command": "Windows: ipconfig /all\nLinux: ip addr; ip route",
        "expectedOutput": "IP, máscara, gateway e DNS da interface ativa. No Linux, o gateway aparece na linha default via.",
        "explanation": "Esses são os primeiros fatos do mapa e a base da visão lógica."
      },
      {
        "number": 2,
        "title": "Ver a vizinhança e testar o alcance",
        "instruction": "Liste os vizinhos locais e teste o gateway e um destino externo. Anote latência média e perda.",
        "command": "Windows: arp -a, depois ping <gateway> e ping 8.8.8.8\nLinux: ip neigh, depois ping -c 4 <gateway> e ping -c 4 8.8.8.8 (o -c 4 para depois de 4 pacotes)",
        "expectedOutput": "O gateway na lista de vizinhos, com seu MAC, e respostas do ping com latência e perda, ou as falhas registradas.",
        "explanation": "Gateway no ARP e respondendo ao ping é fato. Ping sem resposta não prova queda, porque o ICMP pode ser bloqueado: anote como limite."
      },
      {
        "number": 3,
        "title": "Verificar caminho e nomes",
        "instruction": "Veja os saltos até um destino externo e teste a resolução de um nome comum.",
        "command": "Windows: tracert 8.8.8.8\nLinux: tracepath 8.8.8.8\nAmbos: nslookup example.com",
        "expectedOutput": "Saltos visíveis ou asteriscos; o nome resolvido para um endereço IP e o servidor DNS que respondeu.",
        "explanation": "Asteriscos entram como limite, não como prova de queda. Se o destino responde por IP e o nome falha, a hipótese passa para o DNS."
      },
      {
        "number": 4,
        "title": "Montar e sanitizar o mapa",
        "instruction": "Monte o inventário (item, tipo, meio, evidência), separe a visão física da lógica e marque cada afirmação como fato, hipótese ou lacuna. Liste pelo menos dois riscos ou lacunas. Antes de compartilhar, mascare IPs, MACs e nomes.",
        "command": "Exemplo de sanitização: 192.168.1.23 -> 192.168.x.23; nome interno -> host-A",
        "expectedOutput": "Um documento de uma página com inventário, visão física, visão lógica, riscos e lacunas, sem dados que identifiquem a rede.",
        "explanation": "Aparelhos que o ARP não mostrou são lacuna, não prova de que eles não existem."
      }
    ],
    "expectedResult": "Um mapa curto da sua rede: inventário classificado, visões física e lógica separadas, cada afirmação marcada como fato (com comando, data e origem), hipótese ou lacuna, e nenhum dado sensível exposto."
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Seu mapa mostra o gateway respondendo e o ping para 8.8.8.8 funcionando, mas nenhum site abre pelo nome. Qual hipótese ganha força e qual comando a testa?",
      "hints": [
        "O destino responde por IP?",
        "O que transforma nome em IP?"
      ],
      "expectedIdeas": [
        "DNS",
        "resolução de nomes",
        "nslookup"
      ],
      "explanation": "Se a conectividade por IP funciona e os nomes falham, o DNS vira a hipótese principal. O nslookup mostra se o nome resolve e qual servidor respondeu."
    },
    {
      "type": "cenário real",
      "question": "No mapa de um escritório, aparece um aparelho que ninguém sabe o que é. O que fazer de forma segura e profissional?",
      "hints": [
        "Não ataque nem tente acessar o aparelho.",
        "Pense em registro, responsável e autorização."
      ],
      "expectedIdeas": [
        "registrar como lacuna, com IP, MAC, data e origem",
        "perguntar ao responsável pela rede",
        "consultar a lista de dispositivos do roteador, se autorizado",
        "não varrer sem permissão"
      ],
      "explanation": "Ativo desconhecido é risco, mas a resposta segue processo autorizado: registrar a evidência, perguntar a quem responde pela rede e conferir nas fontes que você pode consultar."
    }
  ],
  "quiz": [
    {
      "id": "q1.10.1",
      "question": "Qual é a melhor definição de mapa de rede no contexto deste módulo?",
      "options": [
        "Um desenho decorativo da internet",
        "Um documento com visão física, lógica, serviços, evidências, métricas e riscos",
        "Uma lista de senhas de roteadores",
        "Um comando que descobre tudo automaticamente"
      ],
      "answer": 1,
      "explanation": "Mapa útil combina várias visões e evidências, não apenas desenho.",
      "topic": "mapeamento",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.10.2",
      "question": "Qual item pertence mais claramente à visão física?",
      "options": [
        "DNS primário",
        "Cabo entre tomada e switch",
        "Regra de firewall",
        "Nome de um site, como example.com"
      ],
      "answer": 1,
      "explanation": "Cabos, portas, rack, patch panel e APs fazem parte da visão física.",
      "topic": "topologia",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.10.7",
      "question": "No seu mapa, o host tem IP válido, mas o ping para o gateway falha. Onde a investigação deve começar?",
      "options": [
        "No servidor DNS configurado",
        "No provedor de internet",
        "Na aplicação que o usuário tentou abrir",
        "No caminho até o gateway: cabo ou Wi-Fi, switch ou AP, ou o próprio gateway"
      ],
      "answer": 3,
      "explanation": "Sem alcançar o gateway, o problema está antes dele. DNS, provedor e aplicação só entram depois que o gateway responde.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q1.10.4",
      "question": "Por que mapas de rede devem ser protegidos?",
      "options": [
        "Porque sempre consomem muita CPU",
        "Porque podem revelar IPs, caminhos, nomes internos e controles",
        "Porque impedem DHCP",
        "Porque substituem firewall"
      ],
      "answer": 1,
      "explanation": "Mapas internos ajudam defesa, mas também podem ajudar reconhecimento ofensivo se vazarem.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.10.5",
      "question": "Um tracert mostra asteriscos em alguns saltos. Qual interpretação é mais correta?",
      "options": [
        "A internet inteira caiu",
        "Asteriscos sempre indicam invasão",
        "Alguns dispositivos podem não responder ICMP ou filtrar respostas",
        "O DNS está sempre incorreto"
      ],
      "answer": 2,
      "explanation": "Ausência de resposta em um salto não prova queda: o equipamento pode não responder ICMP ou filtrar as respostas.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q1.10.8",
      "question": "Você rodou arp -a no notebook e o servidor de arquivos, que fica em outra rede, não aparece na lista. O que registrar no mapa?",
      "options": [
        "Uma lacuna: ARP só mostra a vizinhança local recente",
        "Que o servidor de arquivos está desligado",
        "Que o switch bloqueou o servidor",
        "Que a tabela ARP está corrompida"
      ],
      "answer": 0,
      "explanation": "Para falar com um servidor de outra rede, o host usa o gateway; por isso o servidor nunca aparece no ARP local, e a ausência não prova nada sobre ele.",
      "topic": "evidências",
      "difficulty": "intermediário",
      "type": "cenário"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.10.1",
      "front": "O que é mapa físico?",
      "back": "Representação de cabos, portas, Wi-Fi, aparelhos, localização e meios de transmissão.",
      "tags": [
        "topologia"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.2",
      "front": "O que é mapa lógico?",
      "back": "Representação de IPs, gateway, DNS, serviços e caminho provável até a internet.",
      "tags": [
        "topologia"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.3",
      "front": "Por que registrar data da evidência?",
      "back": "Porque redes mudam; sem data, a evidência pode estar obsoleta.",
      "tags": [
        "documentação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.7",
      "front": "Como sanitizar 192.168.1.23 e servidor-financeiro.empresa.local antes de compartilhar?",
      "back": "Mascare: 192.168.x.23 e servidor-A (ou host-A). Faça o mesmo com MACs, domínios e nomes de usuário.",
      "tags": [
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.5",
      "front": "Qual comando mostra gateway e DNS no Windows?",
      "back": "ipconfig /all.",
      "tags": [
        "comandos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.10.8",
      "front": "No mapa, qual a diferença entre fato, hipótese e lacuna?",
      "back": "Fato: confirmado por evidência com data e origem. Hipótese: deduzido, como o caminho provável. Lacuna: o que ainda não foi confirmado.",
      "tags": [
        "documentação"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.10.5",
      "type": "classificação",
      "prompt": "Classifique cada item como dispositivo final, intermediário, serviço ou meio, e diga se ele entra na visão física, na lógica ou nas duas: notebook, AP, roteador doméstico, servidor DNS, impressora, cabo do notebook até o switch.",
      "expectedAnswer": "Notebook e impressora: finais, físicos e lógicos (têm IP). AP: intermediário, físico. Roteador doméstico: intermediário que acumula gateway, switch e AP, físico e lógico. Servidor DNS: serviço, lógico. Cabo: meio, só físico.",
      "explanation": "Classifique pelo papel, não pelo nome comercial."
    },
    {
      "id": "ex1.10.3",
      "type": "segurança",
      "prompt": "Você vai pedir ajuda num fórum e quer colar estas linhas que anotou do ipconfig /all: nome do host FIN-NOTE-07; IPv4 192.168.10.23; endereço físico 3C-52-82-1A-4F-9B; gateway 192.168.10.1; sufixo DNS financeiro.empresa.local. Reescreva as linhas sanitizadas, mantendo o que ajuda no diagnóstico.",
      "expectedAnswer": "host-A; 192.168.x.23; 3C-52-82-xx-xx-xx (ou omitido); gateway 192.168.x.1; empresa-A.local (ou omitido). Continua visível o que ajuda no diagnóstico: host e gateway na mesma rede.",
      "explanation": "Sanitizar é mascarar o que identifica a empresa, a pessoa ou o aparelho, sem apagar a informação técnica de que quem ajuda precisa."
    },
    {
      "id": "ex1.10.4",
      "type": "arquitetura",
      "prompt": "Num escritório, visitantes e funcionários usam o mesmo Wi-Fi, com a mesma senha, e o servidor de arquivos está nessa rede. Que risco você registra no mapa e que melhoria inicial propõe?",
      "expectedAnswer": "Risco: qualquer visitante fica na mesma rede do servidor de arquivos e dos computadores de trabalho e pode tentar acessá-los. Melhoria inicial: uma rede separada para visitantes (muitos roteadores e APs têm a opção de rede de convidados) e nova senha na rede interna.",
      "explanation": "O mapa transforma uma observação em recomendação. Em empresas, essa separação é feita com VLANs e firewall, temas das aulas 3.7 e 9.4."
    }
  ],
  "challenge": {
    "title": "Fato, hipótese ou lacuna?",
    "scenario": "No escritório da Motivação, você coletou no notebook da recepção, em 05/11 às 14h: ipconfig /all mostra IP 192.168.0.42, gateway 192.168.0.1 e DNS 192.168.0.1; arp -a lista 192.168.0.1 e 192.168.0.30; ping 192.168.0.1 responde com 0% de perda e 2 ms; nslookup intranet.escritorio.local responde que o nome não existe. A dona diz que há um servidor de arquivos no armário, mas ninguém sabe o IP dele.",
    "tasks": [
      "Separar o que é fato, hipótese e lacuna.",
      "Apontar um risco que o mapa já revela.",
      "Propor o próximo passo para a lacuna mais importante, sem varrer a rede."
    ],
    "expectedDeliverables": [
      "Uma lista em três blocos (fatos, hipóteses, lacunas), um risco e um próximo passo."
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece pelo que tem comando, data e origem: isso é fato. O que você deduz é hipótese; o que só foi dito ou não foi visto é lacuna.",
    "steps": [
      "Fatos (notebook da recepção, 05/11, 14h): IP 192.168.0.42; gateway e DNS em 192.168.0.1, que responde ao ping (0% de perda, 2 ms); o notebook falou há pouco com 192.168.0.30; o DNS diz que intranet.escritorio.local não existe.",
      "Hipóteses: 192.168.0.1 é o roteador, que também responde como DNS; 192.168.0.30 pode ser o servidor de arquivos ou a impressora.",
      "Lacunas: o que é 192.168.0.30; o IP do servidor do armário (é relato, não evidência); que outros aparelhos existem (o ARP só mostra vizinhos recentes); se a intranet existe com outro nome.",
      "Risco: um servidor de arquivos sem documentação nem responsável técnico.",
      "Próximo passo: perguntar à dona quem instalou o servidor e, com autorização, ver a lista de dispositivos no painel do roteador para identificar 192.168.0.30."
    ],
    "commonMistakes": [
      "Escrever servidor de arquivos = 192.168.0.30 como fato: é só hipótese.",
      "Concluir que a intranet está fora do ar: o DNS só disse que não conhece esse nome.",
      "Achar que a rede tem poucos aparelhos porque o ARP listou poucos."
    ],
    "finalAnswer": "Quatro fatos com comando, data e origem, duas hipóteses e quatro lacunas. O risco imediato é o servidor sem documentação; identifique-o pelas fontes autorizadas (a dona e o painel do roteador), não por varredura."
  },
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base de bits, sinais, métricas, protocolos e pensamento em camadas."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Fundamentos de redes usados no mini-projeto."
    },
    {
      "type": "standard",
      "title": "ISO/IEC 7498-1 — Basic Reference Model",
      "organization": "ISO/IEC",
      "url": "",
      "note": "Referência conceitual para o próximo módulo sobre OSI."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos de infraestrutura",
      "reason": "Mapas de rede evoluem para documentação de infraestrutura e automação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "fundamentos de identidade",
      "reason": "Serviços e acessos dependem de rede, DNS, caminhos e políticas bem documentadas."
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
      "2.1"
    ]
  }
};
