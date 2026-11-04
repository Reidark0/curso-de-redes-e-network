export const lesson0101 = {
  "id": "1.1",
  "moduleId": "m01",
  "order": 1,
  "title": "O que é uma rede e por que existe",
  "subtitle": "A rede como resposta ao problema de compartilhar informação, serviços e recursos entre pessoas, sistemas e organizações.",
  "duration": "15-25 min + 30 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 185,
  "tags": [
    "redes",
    "fundamentos",
    "comunicação",
    "dispositivos",
    "protocolos",
    "diagnóstico"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.10",
      "reason": "Antes de definir rede, é necessário entender bits, sinais, protocolos, métricas e pensamento em camadas vistos no Módulo 0."
    }
  ],
  "objectives": [
    "Explicar por que redes existem (compartilhar informação, serviços e recursos) e por que, por isso, também precisam de controle, operação e segurança.",
    "Identificar numa rede as partes que a compõem: dispositivos finais e intermediários, meios, endereços, protocolos, serviços e políticas.",
    "Localizar em qual etapa de um acesso (endereçamento, meio, intermediários, destino ou controle) um \"não acessa\" quebrou, sem confundir conectividade com autorização."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Você já ouviu, ou disse, “a internet caiu”. O celular mostra o Wi-Fi conectado, mas nenhum site abre. Ou, no trabalho, o e-mail funciona e só o sistema da empresa não entra. A reação comum é reiniciar o roteador, ligar para o provedor e esperar. Às vezes resolve; muitas vezes, não, porque o defeito estava num nome que não foi traduzido em endereço ou numa permissão negada, e nada disso melhora com o roteador reiniciado.</p>\n  <p>“A rede” parece uma coisa só, e é por isso que ela é culpada por tudo. Nesta aula você vai ver de que partes uma rede é feita e em que ordem elas entram quando você acessa algo. Em suporte, infraestrutura ou segurança, separar essas partes antes de mexer em qualquer coisa é a primeira habilidade que se espera de você.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>É isso que acontece quando se trata a rede como um bloco único: ela tem várias partes, e cada uma pode falhar sozinha. Para entender por que há tantas partes, comece pelo motivo de a rede existir.</p>\n  <p>Sem rede, cada computador é uma ilha: arquivos circulam por pendrive e cada máquina precisa da própria impressora. As primeiras redes surgiram para compartilhar recursos caros. Mas compartilhar cria exigências novas: <strong>controle</strong> (nem todo mundo deve acessar tudo), <strong>operação</strong> (achar a causa de uma falha sem adivinhar), <strong>segurança</strong> e <strong>custo</strong>. Numa <strong>rede plana</strong>, em que todos os aparelhos se alcançam, um notebook invadido chega ao servidor de arquivos e às câmeras; esse avanço se chama <strong>movimento lateral</strong>. Por isso, conectar só faz sentido quando há necessidade, e alguns sistemas ficam isolados de propósito. Esta aula mostra as partes que atendem a essas exigências e a ordem em que entram num acesso.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> uma rede de computadores é um conjunto de dispositivos, meios de transmissão, endereços, protocolos, serviços e políticas que permite a um participante enviar dados a outro, diretamente ou por intermediários, seguindo regras comuns e controles que decidem o que é permitido.</div>\n  <p>Cada parte da definição tem um papel:</p>\n  <ul>\n    <li><strong>Dispositivos finais:</strong> onde a comunicação começa ou termina. Notebook, celular, servidor e impressora consomem ou oferecem serviços.</li>\n    <li><strong>Dispositivos intermediários:</strong> levam a comunicação adiante. O switch liga os aparelhos de uma mesma rede local, o access point é o aparelho que cria o Wi-Fi, o roteador liga redes diferentes e o firewall filtra o que passa.</li>\n    <li><strong>Meios de transmissão:</strong> por onde os bits viajam como sinal: cobre, fibra ou rádio (aula 0.5).</li>\n    <li><strong>Endereços:</strong> para onde enviar. Cada aparelho tem um endereço IP; nomes como <code>www.exemplo.com</code> são traduzidos em IP pelo DNS.</li>\n    <li><strong>Protocolos:</strong> as regras combinadas da conversa (aula 0.7).</li>\n    <li><strong>Serviços:</strong> o que se quer acessar: um site, uma pasta compartilhada, a impressão, o próprio DNS.</li>\n    <li><strong>Políticas:</strong> regras que decidem quem pode acessar o quê, como as do firewall e as permissões de uma pasta.</li>\n  </ul>\n  <p>Alguns elementos acumulam papéis: o DNS é um serviço que roda num servidor, e o firewall encaminha tráfego e também aplica política. A aula 1.2 detalha esses papéis.</p>\n  <div class=\"callout warning\"><strong>Erros comuns</strong>\n    <ul>\n      <li><strong>Achar que rede é só internet.</strong> A internet é uma rede de redes. A rede da sua casa e a da empresa também são redes, com serviços próprios que funcionam mesmo sem internet.</li>\n      <li><strong>Confundir conectividade com autorização.</strong> Conectividade é existir caminho até o destino; autorização é a decisão de quem pode acessar o quê. Chegar ao servidor, por exemplo com um ping que responde, não dá permissão para abrir os arquivos dele.</li>\n      <li><strong>Chamar tudo de problema de rede.</strong> Sem separar dispositivo, meio, endereço, protocolo, serviço e política, o diagnóstico vira tentativa e erro.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>Quando um computador acessa um serviço, as partes da rede entram numa ordem. Enxergue o acesso como uma cadeia de dependências:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Etapa</th><th>O que acontece</th><th>Exemplo de falha nessa etapa</th></tr></thead>\n    <tbody>\n      <tr><td>1. Origem</td><td>Uma aplicação decide enviar dados, como abrir um site ou uma pasta compartilhada.</td><td>O próprio programa trava ou está mal configurado.</td></tr>\n      <tr><td>2. Formato</td><td>Os dados seguem um protocolo, como HTTP (sites) ou DNS.</td><td>Cliente e servidor não falam o mesmo protocolo ou versão.</td></tr>\n      <tr><td>3. Endereçamento</td><td>O sistema descobre o IP do destino (pelo DNS, se tiver só o nome) e o gateway, o roteador que leva para fora da rede local.</td><td>Aparelho sem IP válido ou nome que não resolve.</td></tr>\n      <tr><td>4. Meio</td><td>Os bits viram sinais elétricos, luz ou rádio.</td><td>Cabo solto, fibra danificada, Wi-Fi fraco.</td></tr>\n      <tr><td>5. Intermediários</td><td>Switches, access points, roteadores e firewalls levam os dados adiante.</td><td>Gateway errado ou roteador desligado.</td></tr>\n      <tr><td>6. Destino</td><td>O serviço recebe, interpreta e responde.</td><td>Serviço parado.</td></tr>\n      <tr><td>7. Controle</td><td>Políticas permitem, bloqueiam ou registram o acesso.</td><td>Firewall bloqueia ou o usuário recebe “acesso negado”.</td></tr>\n    </tbody>\n  </table></div>\n  <p>Quando qualquer etapa falha, o sintoma parece o mesmo (“não acessa”), mas a causa está em lugares diferentes. Diagnosticar é descobrir em qual etapa a cadeia quebrou, começando pelo seu lado: o aparelho tem IP? Alcança o gateway? O nome resolve? O serviço responde? A política permite? Se o caminho funciona e só a última pergunta falha, o problema não é de conectividade.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense numa rede como a circulação de uma cidade. Casas e prédios são os dispositivos finais; ruas e cruzamentos, os meios e os intermediários; o endereço diz para onde ir e as regras de trânsito são os protocolos. Portarias e bloqueios são as políticas: chegar à porta de um prédio não garante que você possa entrar.</p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, você abre um site no celular. Todas as partes da definição aparecem nessa cena:</p>\n  <ul>\n    <li><strong>Dispositivo final:</strong> o celular, de um lado, e o servidor do site, do outro.</li>\n    <li><strong>Intermediário e meio:</strong> o roteador doméstico, que normalmente já traz o access point dentro; entre ele e o celular, o meio é o rádio do Wi-Fi.</li>\n    <li><strong>Endereços:</strong> o roteador entrega ao celular um IP, por exemplo <code>192.168.0.15</code>, e se apresenta como gateway, <code>192.168.0.1</code>.</li>\n    <li><strong>Serviço:</strong> o DNS traduz o nome do site no IP do servidor; depois, o próprio site responde.</li>\n    <li><strong>Protocolos:</strong> HTTP para pedir a página e TLS para criptografar a conexão (o <code>https://</code>).</li>\n    <li><strong>Política:</strong> a senha do Wi-Fi decide quem entra na rede da casa.</li>\n  </ul>\n  <p>No caso da Motivação, o Wi-Fi conectado mostra que o meio e o access point funcionam. Se nenhum site abre, a falha está em outra parte da lista: o endereço, o gateway ou o DNS.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <p>Dois dispositivos finais chegam ao switch/AP da rede local; o roteador (gateway) encaminha o tráfego para um servidor interno ou para fora da rede local.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 460\" role=\"img\" aria-labelledby=\"m01l01-title m01l01-desc\">\n  <title id=\"m01l01-title\">Uma rede como sistema de comunicação entre dispositivos</title>\n  <desc id=\"m01l01-desc\">Diagrama mostrando dois dispositivos finais, um switch, um roteador, um serviço interno e uma nuvem externa, e o gateway que separa a rede local do que está fora dela.</desc>\n  <defs>\n    <marker id=\"m01l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n      <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n    </marker>\n  </defs>\n  <rect x=\"35\" y=\"70\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"120\" y=\"106\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n  <text x=\"120\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Dispositivo final</text>\n\n  <rect x=\"35\" y=\"270\" width=\"170\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n  <text x=\"120\" y=\"306\" text-anchor=\"middle\" class=\"svg-label\">Celular</text>\n  <text x=\"120\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi / usuário</text>\n\n  <rect x=\"285\" y=\"170\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n  <text x=\"365\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Switch/AP</text>\n  <text x=\"365\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Conecta a rede local</text>\n\n  <rect x=\"525\" y=\"170\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--router\" />\n  <text x=\"605\" y=\"207\" text-anchor=\"middle\" class=\"svg-label\">Roteador</text>\n  <text x=\"605\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Encaminha redes</text>\n\n  <rect x=\"760\" y=\"70\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\" />\n  <text x=\"850\" y=\"106\" text-anchor=\"middle\" class=\"svg-label\">Servidor interno</text>\n  <text x=\"850\" y=\"130\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Arquivos / sistemas</text>\n\n  <rect x=\"760\" y=\"270\" width=\"180\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n  <text x=\"850\" y=\"306\" text-anchor=\"middle\" class=\"svg-label\">Internet / Cloud</text>\n  <text x=\"850\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sites / serviços</text>\n\n  <line x1=\"205\" y1=\"111\" x2=\"285\" y2=\"194\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"205\" y1=\"311\" x2=\"285\" y2=\"236\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"445\" y1=\"215\" x2=\"525\" y2=\"215\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"685\" y1=\"195\" x2=\"760\" y2=\"125\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n  <line x1=\"685\" y1=\"235\" x2=\"760\" y2=\"300\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m01l01-arrow)\" />\n\n  <rect x=\"250\" y=\"380\" width=\"480\" height=\"52\" rx=\"12\" class=\"svg-boundary\" />\n  <text x=\"490\" y=\"412\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Rede = dispositivos + meios + endereços + protocolos + serviços + políticas</text>\n\n  <text x=\"350\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">LAN</text>\n  <text x=\"610\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Gateway</text>\n  <text x=\"850\" y=\"245\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Fora da rede local</text>\n</svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> rede é um sistema de comunicação feito de dispositivos, meios, endereços, protocolos, serviços e políticas, não só cabo ou Wi-Fi.</li>\n    <li>Redes existem para compartilhar informação, serviços e recursos; por isso também precisam de controle, operação e segurança.</li>\n    <li>Dispositivos finais consomem ou oferecem serviços; intermediários conectam, encaminham ou filtram.</li>\n    <li>“A rede caiu” não é diagnóstico: descubra em qual etapa do acesso a cadeia quebrou.</li>\n    <li>Conectividade não é autorização: ter caminho não dá permissão.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>A próxima aula, “Dispositivos finais, intermediários e serviços”, detalha os papéis dos participantes da rede, para você não confundir switch, roteador, access point, firewall, servidor e serviço.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Visão geral de todas as camadas"
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
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "sinais físicos",
      "protocolos",
      "pensamento em camadas"
    ],
    "enables": [
      "modelo OSI",
      "Ethernet",
      "IPv4",
      "subnetting",
      "TCP/UDP",
      "DNS",
      "HTTP",
      "firewalls",
      "VPN",
      "cloud networking"
    ]
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "Um usuário diz que 'a rede caiu'. Quais perguntas você faria antes de mexer em firewall ou roteador?",
      "hints": [
        "Comece pelo escopo: quem é afetado e qual serviço.",
        "Siga a cadeia: IP, gateway, DNS, serviço e política."
      ],
      "expectedIdeas": [
        "quem é afetado",
        "qual serviço",
        "IP válido",
        "gateway",
        "DNS",
        "mensagem de erro exata",
        "desde quando"
      ],
      "explanation": "Perguntar antes de mexer reduz a ambiguidade: o escopo diz se o problema é de um aparelho ou de muitos, e a cadeia diz em que etapa procurar."
    },
    {
      "type": "cenário real",
      "question": "Uma clínica tem um computador que só controla um equipamento de exame e não precisa de internet nem de acesso remoto. Faz sentido ligá-lo à rede da clínica por padrão? Quando não vale a pena conectar um sistema?",
      "hints": [
        "Pense no que se ganha e no que se arrisca ao conectar.",
        "Lembre do movimento lateral numa rede plana."
      ],
      "expectedIdeas": [
        "conectar só quando há necessidade operacional",
        "cada conexão amplia a superfície de ataque",
        "isolamento exigido por segurança ou regulação",
        "se precisar conectar, segmentar e registrar"
      ],
      "explanation": "A rede existe para atender a uma necessidade de comunicação. Quando ela não existe, ou quando a segurança ou a regulação exigem isolamento, manter o sistema desconectado faz parte do desenho."
    }
  ],
  "quiz": [
    {
      "id": "q1.1.1",
      "question": "Qual definição de rede é mais útil em contexto profissional?",
      "options": [
        "Um conjunto de computadores ligados por cabo ou Wi-Fi.",
        "Um conjunto de dispositivos, meios, protocolos, endereços, serviços e políticas que permite comunicação.",
        "A conexão com a internet fornecida pelo provedor.",
        "O conjunto de switches e roteadores de uma organização."
      ],
      "answer": 1,
      "explanation": "Rede envolve comunicação e controle: além de dispositivos e meio, inclui protocolos, endereços, serviços e políticas. Cabo, internet e equipamentos são só partes dela.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.1.2",
      "question": "Um notebook tem IP e pinga o gateway, mas não abre sites pelo nome. Qual hipótese fica forte?",
      "options": [
        "Cabo de rede rompido.",
        "Notebook sem endereço IP.",
        "Problema de DNS.",
        "Gateway padrão ausente."
      ],
      "answer": 2,
      "explanation": "Se o aparelho tem IP e o gateway responde, o endereço, o meio e o caminho local funcionam. A falha só por nome aponta para o DNS, que traduz nomes em IP, embora outras hipóteses ainda possam existir.",
      "topic": "dns",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q1.1.3",
      "question": "Por que uma rede plana é arriscada?",
      "options": [
        "Porque um aparelho invadido pode alcançar muitos outros (movimento lateral).",
        "Porque impede o uso de DHCP e DNS.",
        "Porque exige um roteador para cada dispositivo.",
        "Porque só funciona com cabo, não com Wi-Fi."
      ],
      "answer": 0,
      "explanation": "Numa rede plana, todos os aparelhos se alcançam: um notebook invadido pode chegar ao servidor de arquivos e às câmeras. É por isso que políticas fazem parte da rede.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q1.1.4",
      "question": "Qual destes é um dispositivo intermediário?",
      "options": [
        "Notebook do usuário",
        "Servidor de arquivos",
        "Impressora de rede",
        "Switch"
      ],
      "answer": 3,
      "explanation": "O switch encaminha a comunicação dentro da rede local. Notebook, servidor e impressora são dispositivos finais: consomem ou oferecem serviços.",
      "topic": "papéis",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.1.7",
      "question": "O ping para o servidor de arquivos responde, mas, ao abrir a pasta compartilhada, o usuário recebe “acesso negado”. O que isso indica?",
      "options": [
        "O caminho existe; a falha está na autorização do serviço, não na conectividade.",
        "O cabo do usuário está com defeito.",
        "O DNS não está resolvendo o nome do servidor.",
        "Como o ping respondeu, o acesso deveria estar liberado, então o servidor está com defeito."
      ],
      "answer": 0,
      "explanation": "Ping prova só um tipo de conectividade. “Acesso negado” é uma resposta do próprio serviço: o caminho funciona e a decisão de autorização negou o acesso. Conectividade não é autorização.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q1.1.8",
      "question": "Numa empresa sem rede, os arquivos circulam por pendrive e cada computador tem a própria impressora. Qual problema uma rede resolve nesse caso?",
      "options": [
        "Aumenta a velocidade de cada computador.",
        "Dispensa senhas e permissões, já que todos ficam conectados.",
        "Permite que os participantes compartilhem informação, serviços e recursos, como arquivos e a impressora.",
        "Substitui os computadores por equipamentos de rede."
      ],
      "answer": 2,
      "explanation": "Redes existem para compartilhar informação, serviços e recursos. Compartilhar não elimina o controle: pelo contrário, cria a necessidade de políticas que decidam quem acessa o quê.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.1.1",
      "front": "O que é uma rede?",
      "back": "Um sistema de comunicação entre participantes usando dispositivos, meios, protocolos, endereços, serviços e políticas.",
      "tags": [
        "rede",
        "conceito"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.2",
      "front": "Internet e rede são sinônimos?",
      "back": "Não. A internet é uma grande rede de redes. LANs, redes corporativas e redes cloud também são redes.",
      "tags": [
        "internet",
        "lan"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.3",
      "front": "O que é um dispositivo final?",
      "back": "É onde a comunicação começa ou termina: um participante que consome ou oferece serviços, como notebook, celular, servidor ou impressora.",
      "tags": [
        "host",
        "endpoint"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.4",
      "front": "O que é um dispositivo intermediário?",
      "back": "É um elemento que leva a comunicação adiante: conecta, encaminha ou filtra tráfego, como switch, access point, roteador ou firewall.",
      "tags": [
        "switch",
        "roteador",
        "firewall"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.5",
      "front": "Conectividade significa autorização?",
      "back": "Não. Conectividade é existir caminho técnico; autorização é permissão para acessar um recurso.",
      "tags": [
        "segurança",
        "iam"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.1.7",
      "front": "\"A rede caiu\" é um diagnóstico?",
      "back": "Não. É um sintoma. Descubra em qual etapa do acesso a cadeia quebrou: o aparelho tem IP? Alcança o gateway? O nome resolve? O serviço responde? A política permite?",
      "tags": [
        "diagnóstico",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.1.5",
      "type": "diagnóstico",
      "prompt": "Para cada sintoma, indique em qual etapa da cadeia (endereçamento, meio, destino ou controle) você investigaria primeiro: (a) o notebook não tem endereço IP válido; (b) o aparelho alcança um IP na internet, mas nenhum site abre por nome; (c) o nome resolve, mas o serviço não responde; (d) a conexão abre, mas o sistema responde \"acesso negado\"; (e) o cabo foi trocado e a luz da placa de rede continua apagada.",
      "expectedAnswer": "(a) Endereçamento: o aparelho não recebeu IP ou foi configurado errado. (b) Endereçamento por nome: DNS. (c) Destino: o serviço pode estar parado; um firewall no caminho também entra na lista. (d) Controle: autorização; o caminho funciona. (e) Meio: cabo, porta do switch ou placa de rede.",
      "explanation": "O mesmo \"não acessa\" tem causas em etapas diferentes. Localizar a etapa evita mexer no firewall quando o problema é DNS, ou trocar cabo quando o problema é permissão."
    },
    {
      "id": "ex1.1.3",
      "type": "arquitetura",
      "prompt": "Classifique notebook, switch, roteador, firewall, DNS e um site da empresa em dispositivo final, dispositivo intermediário ou serviço. Algum deles tem mais de um papel?",
      "expectedAnswer": "Notebook: dispositivo final. Switch, roteador e firewall: intermediários; o firewall também aplica política. DNS e o site: serviços, que rodam em servidores (dispositivos finais).",
      "explanation": "Alguns elementos acumulam papéis, mas classificar pelo papel organiza o raciocínio. A aula 1.2 aprofunda essa classificação."
    }
  ],
  "challenge": {
    "title": "Tudo no mesmo Wi-Fi?",
    "scenario": "Uma pequena empresa tem 8 notebooks, 1 impressora, 1 servidor de arquivos e acesso à internet. Clientes que esperam na recepção pedem a senha do Wi-Fi. O dono quer colocar todos, funcionários e visitantes, no mesmo Wi-Fi, porque parece mais simples.",
    "tasks": [
      "Classificar os participantes em dispositivos finais, intermediários e serviços.",
      "Apontar dois riscos de colocar visitantes e funcionários na mesma rede.",
      "Propor uma separação inicial e dizer que regra deve existir entre as partes."
    ],
    "expectedDeliverables": [
      "Uma lista de papéis e um parágrafo de 5 a 8 linhas com os riscos e a separação proposta."
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece pelos participantes e pelo que cada um precisa acessar. Só depois decida o que pode alcançar o quê.",
    "steps": [
      "Dispositivos finais: os 8 notebooks, a impressora, o servidor de arquivos e os celulares dos visitantes. Intermediário: o roteador com Wi-Fi (e um switch, se houver cabos). Serviços: o compartilhamento de arquivos, a impressão e o acesso à internet.",
      "Riscos da rede única: um celular de visitante, ou um notebook invadido, alcança o servidor de arquivos e a impressora (rede plana, movimento lateral); e a senha do Wi-Fi passa de mão em mão, sem controle de quem entra.",
      "Separação: uma rede para funcionários, com o servidor e a impressora, e outra só para visitantes. Muitos roteadores já oferecem uma rede de convidados separada.",
      "Regra entre as partes: a rede de visitantes só sai para a internet e não alcança nada da rede interna."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Colocar tudo no mesmo Wi-Fi com uma senha forte.",
        "whyItIsWrong": "A senha controla quem entra na rede, mas quem entrou alcança tudo: o visitante continua chegando ao servidor."
      },
      {
        "answer": "Se o visitante consegue pingar o servidor, é porque ele tem permissão.",
        "whyItIsWrong": "Conectividade não é autorização. Ter caminho até o servidor é justamente o risco que a separação remove."
      }
    ],
    "finalAnswer": "Separe funcionários (com servidor e impressora) e visitantes em redes diferentes, com uma regra que deixa os visitantes sair só para a internet. A rede deixa de ser um Wi-Fi único e passa a ter controle de quem alcança o quê."
  },
  "glossary": [
    {
      "term": "Endereço IP",
      "shortDefinition": "Número que identifica um aparelho na rede e diz para onde enviar os dados.",
      "example": "192.168.0.15 é um IP típico de um celular numa rede doméstica.",
      "relatedLessons": [
        "4.1"
      ]
    },
    {
      "term": "Gateway padrão",
      "shortDefinition": "O roteador para onde um aparelho envia tudo o que é destinado a fora da sua rede local.",
      "example": "Numa rede doméstica, o gateway costuma ser o próprio roteador, como 192.168.0.1.",
      "relatedLessons": [
        "4.5"
      ]
    },
    {
      "term": "DNS",
      "shortDefinition": "Serviço que traduz nomes, como www.exemplo.com, no endereço IP do servidor.",
      "example": "Se o DNS falha, o site não abre pelo nome, mesmo com a internet funcionando.",
      "relatedLessons": [
        "7.1"
      ]
    },
    {
      "term": "Ping",
      "shortDefinition": "Teste que envia uma mensagem curta a um endereço e espera a resposta, para ver se há caminho até ele.",
      "longDefinition": "Uma resposta ao ping mostra que há caminho, não que o serviço funciona nem que você tem permissão.",
      "relatedLessons": [
        "1.9",
        "4.8"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Módulo 0 — Fundamentos da Computação",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base para bits, sinais, protocolos, métricas e pensamento em camadas."
    },
    {
      "type": "standard",
      "title": "Modelo OSI — referência conceitual para camadas",
      "organization": "ISO",
      "url": "",
      "note": "Será aprofundado no Módulo 2."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Fundamentos de infraestrutura",
      "lesson": "Redes em ambientes automatizados",
      "reason": "Pipelines, runners, Kubernetes e IaC dependem de conectividade, DNS, rotas e políticas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Fundamentos de identidade",
      "lesson": "Autenticação, autorização e federação",
      "reason": "Conectividade não substitui autorização; IAM depende de protocolos de rede seguros."
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
      "1.2"
    ]
  }
};
