export const lesson0009 = {
  "id": "0.9",
  "moduleId": "m00",
  "order": 9,
  "title": "Laboratório integrador do Módulo 0",
  "subtitle": "Reunindo representação digital, bases numéricas, codificação, métricas, sinais, protocolos e pensamento em camadas em um diagnóstico único.",
  "duration": "15-25 min + 65 min de prática extra",
  "estimatedStudyTimeMinutes": 25,
  "difficulty": "iniciante-intermediário",
  "type": "ligação integradora",
  "xp": 190,
  "tags": [
    "fundamentos",
    "laboratório",
    "troubleshooting",
    "evidências",
    "camadas",
    "protocolo",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "O laboratório parte da ideia de que toda informação digital precisa ser representada em bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A conversão entre decimal, binário e hexadecimal será usada para interpretar endereços, bytes e evidências."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.3",
      "reason": "A análise de texto, UTF-8 e Base64 será aplicada em payloads, logs e exemplos de API."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.4",
      "reason": "O aluno precisará diferenciar Mbps, MB/s, volume, throughput e overhead."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.5",
      "reason": "O laboratório inclui coleta de evidências de camada física e enlace."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.6",
      "reason": "O laboratório mede latência, caminho e tempo de resposta."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.7",
      "reason": "A análise usa a ideia de protocolo como contrato de comunicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "O relatório final organiza hipóteses por camadas."
    }
  ],
  "objectives": [
    "Coletar evidências de uma conexão (endereço, gateway, DNS, latência, caminho, porta e resposta HTTP) com comandos do Windows ou do Linux.",
    "Interpretar cada evidência no formato \"mostra X, não mostra Y, próximo teste Z\" e organizá-las de baixo para cima, sem tirar conclusão maior do que o teste permite.",
    "Usar os fundamentos do módulo ao ler e compartilhar evidências: octetos em binário e hexadecimal, Mbps e MB/s na mesma unidade e segredos em Base64 mascarados antes de anexar a um chamado."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Uma aplicação interna está lenta. O usuário diz que “a internet está ruim”. O time da aplicação diz que “deve ser rede”. O time de redes responde que “o ping está normal”. Cada um rodou um teste, olhou uma parte e tirou uma conclusão maior do que o teste permitia. O problema continua, e alguém sugere “liberar tudo no firewall só para testar”.\n  </p>\n  <p>\n    Sem método, o diagnóstico vira troca de palpites e mudanças arriscadas. Neste laboratório você junta o que viu no módulo (bytes, Base64, bits e bytes por segundo, latência, protocolos e camadas) para coletar evidências reais no seu computador e dizer, para cada uma, o que ela prova e o que não prova. É assim que se escreve um chamado que outro time consegue usar, e é o mesmo raciocínio de um analista de segurança que precisa separar lentidão comum de ataque.\n  </p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    É isso que acontece quando cada teste é lido sozinho. Você pode saber que um byte tem 8 bits e não enxergar isso nos quatro números de um endereço IPv4; saber que Base64 não é criptografia e colar num chamado um cabeçalho com senha; medir o ping e achar que ele prova que o site funciona.\n  </p>\n  <p>\n    O diagnóstico vira uma lista de comandos sem interpretação, e as decisões erram: abre-se uma regra de firewall desnecessária, contrata-se mais banda quando o problema é perda no Wi-Fi, culpa-se o DNS quando o servidor recusou o acesso. Esta aula resolve isso com um método simples: cada teste vira uma evidência com limite declarado, e as evidências são organizadas de baixo para cima, da sua máquina até a aplicação.\n  </p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> evidência técnica é uma observação registrada (o comando, o horário e a parte relevante da saída) que sustenta ou enfraquece uma hipótese. Hipótese é uma explicação possível para o sintoma, ainda não comprovada.\n  </div>\n  <p>\n    Um comando sozinho não é evidência: o que conta é a leitura dele. Para cada teste, escreva uma frase neste formato:\n  </p>\n  <div class=\"callout\">\n    <strong>“Este teste mostra X, não mostra Y, e por isso o próximo teste é Z.”</strong>\n  </div>\n  <p>Três regras organizam o relatório:</p>\n  <ul>\n    <li><strong>Suba de baixo para cima:</strong> interface e endereço, gateway e DNS, caminho, porta, aplicação. Como você viu na aula 0.8, uma falha embaixo derruba tudo o que está em cima; não adianta testar o site antes de saber se o computador tem endereço.</li>\n    <li><strong>Anote o horário de cada rodada:</strong> um teste que passou agora só prova o estado agora. Em falha intermitente, repita os mesmos testes no momento da falha e compare as rodadas.</li>\n    <li><strong>Mascare antes de compartilhar:</strong> saídas e logs podem conter senhas, tokens, cookies, IPs e nomes internos. Tire o que quem recebe não precisa ver. Um <code>Authorization: Basic</code> em Base64 é uma senha legível para qualquer um que o decodifique; troque o valor por <code>&lt;mascarado&gt;</code>.</li>\n  </ul>\n  <p>\n    O relatório não precisa achar a causa; precisa ser rastreável: outra pessoa refaz cada teste e chega à mesma leitura. E os próprios comandos têm limites: ping e traceroute podem ser bloqueados, um proxy pode responder no lugar do site, e um teste feito em casa não prova como a rede da empresa se comporta.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    O laboratório segue o caminho de uma conexão comum: <strong>seu computador → interface (Wi-Fi ou cabo) → rede local (gateway e DNS) → caminho pela internet → site HTTPS de teste</strong>. Cada etapa tem um comando e um limite:\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead><tr><th>Etapa</th><th>Comando (Windows / Linux)</th><th>O que mostra</th><th>O que não mostra</th></tr></thead>\n      <tbody>\n        <tr><td>Interface e endereço</td><td><code>ipconfig /all</code> / <code>ip addr</code></td><td>Adaptador ativo, IP e máscara ou prefixo</td><td>Que o enlace está estável ou na velocidade esperada</td></tr>\n        <tr><td>Gateway e DNS</td><td><code>ipconfig /all</code> / <code>ip route</code> e <code>resolvectl status</code></td><td>Qual gateway (rota default) e quais servidores DNS estão configurados</td><td>Que eles estão respondendo</td></tr>\n        <tr><td>Latência e perda</td><td><code>ping</code> / <code>ping -c 4</code>, primeiro ao gateway, depois a um destino na internet</td><td>Resposta ICMP, tempo de ida e volta (RTT) e perda</td><td>Porta, TLS ou HTTP. Se falhar, não prova que o destino caiu: ICMP pode ser bloqueado</td></tr>\n        <tr><td>Nome</td><td><code>Resolve-DnsName</code> / <code>getent hosts</code></td><td>O nome vira um ou mais IPs</td><td>Que a porta está aberta ou que o site responde</td></tr>\n        <tr><td>Caminho</td><td><code>tracert</code> / <code>traceroute</code> ou <code>tracepath</code></td><td>Os saltos (roteadores) até o destino</td><td>Que um salto marcado com <code>*</code> caiu: roteadores podem não responder ICMP; se o destino final responde, o tráfego passou por ele</td></tr>\n        <tr><td>Porta</td><td><code>Test-NetConnection -Port 443</code> / no Linux, o próprio <code>curl</code></td><td>O destino aceita conexão TCP na porta</td><td>Que o HTTP responde. Se falhar com o nome resolvendo, as hipóteses são rota, firewall, proxy ou serviço parado</td></tr>\n        <tr><td>Aplicação</td><td><code>curl -I https://…</code></td><td>O servidor respondeu em HTTP, por cima de TCP e TLS; o código (200, 301, 403…) diz o resultado</td><td>Que um usuário específico tem permissão. Um 403 é o servidor recusando o acesso: a investigação sobe para permissão, não desce para cabo ou DNS</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <h3>Os fundamentos do módulo dentro das evidências</h3>\n  <ul>\n    <li><strong>Octetos:</strong> cada um dos quatro números de um IPv4 é um byte. Em <code>192.168.10.50</code>, 168 = 128 + 32 + 8 = <code>10101000</code> em binário e <code>A8</code> em hexadecimal (aula 0.2).</li>\n    <li><strong>Taxas:</strong> planos e testes de velocidade falam em bits por segundo; downloads mostram bytes por segundo. 500 Mbps ÷ 8 = 62,5 MB/s antes de overhead (aula 0.4). Compare sempre na mesma unidade.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense numa encomenda atrasada. Dizer “os Correios estão ruins” não ajuda; o rastreio mostra se o pacote saiu, por quais centros passou, onde parou e se o prédio recusou a entrega. Cada linha do rastreio é uma evidência com limite: “saiu do centro de distribuição” não prova que chegou.\n  </p>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Em casa, os sites demoram a abrir no notebook. Você roda os testes de baixo para cima e anota:\n  </p>\n  <pre class=\"code-block\">ipconfig /all      → IP 192.168.0.23, gateway 192.168.0.1, DNS 192.168.0.1\nping 192.168.0.1   → tempos entre 3 ms e 210 ms, 25% de perda\nping 8.8.8.8       → tempos entre 20 ms e 240 ms, 25% de perda</pre>\n  <p>\n    A perda já aparece no primeiro trecho, entre o notebook e o roteador de casa, antes de qualquer site, DNS ou provedor. O teste mostra que o problema está na rede local; não mostra se a causa é interferência, distância ou o próprio roteador. Próximo teste: repetir o ping ao gateway com cabo ou ao lado do roteador. Se com cabo a perda some, o suspeito é o Wi-Fi (sinal fraco ou interferência, como na aula 0.5), e contratar mais banda não resolveria nada.\n  </p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 520\" role=\"img\" aria-labelledby=\"m00l09-title m00l09-desc\">\n    <title id=\"m00l09-title\">Laboratório integrador do Módulo 0</title>\n    <desc id=\"m00l09-desc\">Fluxo de coleta de evidências conectando representação digital, interface, rede local, caminho, protocolo, segurança e relatório final.</desc>\n    <defs>\n      <marker id=\"m00l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"125\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"125\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bytes, IP, interface</text>\n    <rect x=\"260\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"345\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Rede local</text>\n    <text x=\"345\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi, gateway, DNS</text>\n    <rect x=\"480\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"565\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Caminho</text>\n    <text x=\"565\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota, RTT, perda</text>\n    <rect x=\"700\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"785\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Protocolo</text>\n    <text x=\"785\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">HTTP, TLS, status</text>\n    <line x1=\"210\" y1=\"109\" x2=\"260\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <line x1=\"430\" y1=\"109\" x2=\"480\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <line x1=\"650\" y1=\"109\" x2=\"700\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <rect x=\"170\" y=\"225\" width=\"700\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"520\" y=\"257\" text-anchor=\"middle\" class=\"svg-label\">Interpretação defensiva</text>\n    <text x=\"520\" y=\"282\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">o que a evidência prova, o que não prova, riscos e próximos testes</text>\n    <line x1=\"785\" y1=\"148\" x2=\"785\" y2=\"225\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <line x1=\"125\" y1=\"148\" x2=\"255\" y2=\"225\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <rect x=\"260\" y=\"375\" width=\"520\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"520\" y=\"407\" text-anchor=\"middle\" class=\"svg-label\">Relatório técnico</text>\n    <text x=\"520\" y=\"432\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">comandos, saídas, interpretação, camadas, segurança e próximos passos</text>\n    <line x1=\"520\" y1=\"303\" x2=\"520\" y2=\"375\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <rect x=\"910\" y=\"214\" width=\"90\" height=\"100\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"955\" y=\"250\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Riscos</text>\n    <text x=\"955\" y=\"274\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs</text>\n    <text x=\"955\" y=\"296\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">segredos</text>\n    <line x1=\"870\" y1=\"264\" x2=\"910\" y2=\"264\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> para cada teste, registre o que ele mostra, o que não mostra e qual é o próximo teste.</li>\n    <li>Teste de baixo para cima: interface, gateway e DNS, caminho, porta, aplicação.</li>\n    <li>Ping mostra resposta ICMP; DNS, a tradução do nome; curl, a resposta HTTP. Nenhum prova a permissão do usuário.</li>\n    <li>Compare na mesma unidade: 500 Mbps ÷ 8 = 62,5 MB/s antes de overhead.</li>\n    <li>Antes de compartilhar, mascare senhas e tokens, mesmo em Base64.</li>\n  </ul>\n  <p><em>Já domina isso? Faça o quiz: com 70% ou mais, você pode seguir.</em></p>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula 0.10, Revisão do Módulo 0, você junta os conceitos do módulo num mapa único e confere as lacunas antes do Módulo 1 — Fundamentos de Redes, onde endereço, gateway e DNS passam a ser estudados por dentro.\n  </p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Preparatório para Camada 1",
      "Preparatório para Camada 2",
      "Preparatório para Camada 3",
      "Preparatório para Camada 4",
      "Preparatório para Camada 7"
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
      "TLS",
      "HTTP"
    ],
    "dependsOn": [
      "representação digital",
      "binário",
      "hexadecimal",
      "UTF-8",
      "Base64",
      "bit vs byte",
      "sinais físicos",
      "latência",
      "throughput",
      "protocolos",
      "camadas"
    ],
    "enables": [
      "fundamentos de redes",
      "Modelo OSI",
      "troubleshooting profissional",
      "análise de tráfego",
      "segurança defensiva"
    ]
  },
  "lab": {
    "id": "lab-0.9",
    "title": "Dossiê de diagnóstico: da sua máquina até um site HTTPS",
    "labType": "troubleshooting",
    "objective": "Coletar evidências reais da sua conexão, de baixo para cima, e escrever o que cada uma mostra e não mostra.",
    "prerequisites": [
      "Saber abrir um terminal. Em rede de empresa ou escola, só com autorização."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "Editor de texto"
    ],
    "estimatedTimeMinutes": 30,
    "steps": [
      {
        "number": 1,
        "title": "Base local: interface, gateway e DNS",
        "instruction": "Mostre a configuração da interface em uso e anote IP, máscara ou prefixo, gateway, servidores DNS e o horário.",
        "command": "Windows: ipconfig /all\nLinux: ip addr; ip route; resolvectl status",
        "expectedOutput": "Adaptador ativo com IP (ex.: 192.168.0.23), prefixo (/24), gateway padrão (no Linux, default via ...) e DNS.",
        "explanation": "Mostra a configuração, não que gateway e DNS respondem. Sem IP ou gateway, pare aqui: nenhum teste acima vai funcionar."
      },
      {
        "number": 2,
        "title": "Latência, perda e caminho",
        "instruction": "Faça ping ao gateway do passo 1 e a um destino na internet; depois, veja o caminho até um site de teste. Anote RTT e perda.",
        "command": "Windows (PowerShell): ping <IP do gateway>; ping 8.8.8.8; tracert example.com\nLinux: ping -c 4 <IP do gateway>; ping -c 4 8.8.8.8; traceroute example.com",
        "expectedOutput": "Tempo em ms e porcentagem de perda de cada ping; no tracert, uma lista de saltos, alguns talvez marcados com *.",
        "explanation": "Perda já no gateway aponta para a rede local; só no destino externo, para depois dela."
      },
      {
        "number": 3,
        "title": "Nome, porta e aplicação",
        "instruction": "Resolva o nome do site, teste a porta 443 e peça só os cabeçalhos HTTP.",
        "command": "Windows (PowerShell): Resolve-DnsName example.com; Test-NetConnection example.com -Port 443; curl.exe -I https://example.com\nLinux: getent hosts example.com; curl -I https://example.com",
        "expectedOutput": "IPs para o nome; TcpTestSucceeded : True; uma linha como HTTP/1.1 200 OK (ou HTTP/2 200) e os cabeçalhos. Se o TLS falhar, o curl mostra um erro de certificado.",
        "explanation": "No Windows PowerShell, curl sem .exe chama outro comando. Um status HTTP mostra que nome, caminho, porta e TLS funcionaram; não mostra permissão de usuário."
      },
      {
        "number": 4,
        "title": "Montar a tabela e a conclusão",
        "instruction": "Monte uma tabela com uma linha por evidência e escreva uma conclusão de três linhas: o que as evidências indicam, o que ainda não foi provado e o próximo teste. Mascare o que quem recebe não precisa ver.",
        "command": "Evidência (comando, horário, saída) | Mostra | Não mostra | Próximo teste",
        "expectedOutput": "Pelo menos seis evidências classificadas e uma conclusão que separa fato, hipótese e próximo teste.",
        "explanation": "Se tudo funcionou, a conclusão honesta é \"funcionou neste horário\", não \"a rede está perfeita\"."
      }
    ],
    "expectedResult": "Um dossiê que outra pessoa consegue refazer, evidência por evidência."
  },
  "mentorQuestions": [
    {
      "type": "diagnóstico",
      "question": "O ping para example.com não responde, mas o curl -I https://example.com retorna HTTP 200. O que você escreve no relatório?",
      "hints": [
        "O que o ping testa e o que o curl testa?"
      ],
      "expectedIdeas": [
        "ICMP filtrado",
        "a conexão HTTPS funciona",
        "não concluir que o site caiu",
        "registrar o limite do ping"
      ],
      "explanation": "O curl prova que nome, caminho, porta 443, TLS e HTTP funcionaram. O ping só mostra que o ICMP não voltou, provavelmente filtrado. Registre os dois fatos e não conclua queda."
    },
    {
      "type": "segurança",
      "question": "O sistema não abre e um colega quer liberar todo o tráfego no firewall \"só para testar\". Que evidências você pede antes, e por que a mudança é arriscada mesmo que pareça resolver?",
      "hints": [
        "O que ainda não foi testado: nome, porta, status HTTP?"
      ],
      "expectedIdeas": [
        "testar o nome e a porta",
        "um 403 não é firewall",
        "regra mínima e reversível"
      ],
      "explanation": "Liberar tudo aumenta a exposição sem provar a causa; se o problema for DNS ou permissão, nada muda. Primeiro mostre onde falha. Se for o firewall, peça uma regra só para a porta e a origem necessárias, com plano para desfazer."
    }
  ],
  "quiz": [
    {
      "id": "q0.9.2",
      "question": "Se ping responde, qual conclusão é segura?",
      "options": [
        "A aplicação está saudável",
        "Há alguma resposta ICMP/caminho parcial, mas isso não prova HTTP, TLS ou autorização",
        "O usuário tem permissão",
        "Não existe firewall no caminho"
      ],
      "answer": 1,
      "explanation": "Ping é evidência limitada. Ele não valida porta TCP, TLS, HTTP, autenticação ou autorização.",
      "topic": "limite de evidência",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.9.3",
      "question": "Por que Base64 deve ser tratado com cuidado em relatórios?",
      "options": [
        "Porque não pode representar bytes",
        "Porque é criptografia forte",
        "Porque pode carregar segredos codificados de forma reversível",
        "Porque só existe em redes Wi-Fi"
      ],
      "answer": 2,
      "explanation": "Base64 é codificação reversível. Se codificar um segredo, o segredo continua exposto.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.9.4",
      "question": "Um plano de 500 Mbps equivale teoricamente a quantos MB/s antes de overhead?",
      "options": [
        "62,5 MB/s",
        "500 MB/s",
        "40 MB/s",
        "8 MB/s"
      ],
      "answer": 0,
      "explanation": "500 megabits por segundo dividido por 8 resulta em 62,5 megabytes por segundo, antes de overhead e limitações reais.",
      "topic": "bit vs byte",
      "difficulty": "iniciante",
      "type": "métricas"
    },
    {
      "id": "q0.9.8",
      "question": "No IP 192.168.10.50, como o octeto 168 aparece em binário de 8 bits e em hexadecimal?",
      "options": [
        "11000000 e C0",
        "10100100 e A4",
        "10101000 e 168",
        "10101000 e A8"
      ],
      "answer": 3,
      "explanation": "168 = 128 + 32 + 8, logo 10101000. Em hex, 1010 = A e 1000 = 8, logo A8. 11000000 e C0 correspondem ao octeto 192.",
      "topic": "bases numéricas",
      "difficulty": "iniciante",
      "type": "conversão"
    },
    {
      "id": "q0.9.5",
      "question": "Qual item melhor representa uma conclusão responsável?",
      "options": [
        "Ping falhou, então o servidor está invadido",
        "DNS resolveu, porta 443 falhou; investigar firewall, proxy, rota ou serviço antes de concluir causa",
        "Curl retornou 403, então o cabo está ruim",
        "Base64 apareceu, então está criptografado"
      ],
      "answer": 1,
      "explanation": "A conclusão responsável separa evidência de hipótese e sugere próximos testes coerentes.",
      "topic": "diagnóstico",
      "difficulty": "intermediário",
      "type": "arquitetura"
    },
    {
      "id": "q0.9.7",
      "question": "No tracert para example.com, alguns saltos intermediários aparecem como * (sem resposta), mas o destino final responde. O que isso indica?",
      "options": [
        "O DNS falhou ao resolver o nome desses roteadores",
        "O caminho está quebrado nesses saltos e o tráfego não chega ao destino",
        "Os roteadores desses saltos podem não responder ICMP; isso sozinho não prova queda",
        "A porta 443 está bloqueada nesses saltos"
      ],
      "answer": 2,
      "explanation": "Roteadores intermediários podem filtrar ou não gerar respostas ICMP. Se o destino final responde, o tráfego passou por esses saltos.",
      "topic": "limite de evidência",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.9.1",
      "front": "O que é evidência técnica?",
      "back": "É uma observação registrada, obtida por comando, log, métrica ou teste, que sustenta uma hipótese dentro de um escopo.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.9.2",
      "front": "Por que ping não prova que uma aplicação funciona?",
      "back": "Porque ping testa ICMP/caminho parcial, não TCP, TLS, HTTP, autenticação, autorização ou lógica da aplicação.",
      "tags": [
        "icmp",
        "camadas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.9.4",
      "front": "O que deve existir em uma conclusão técnica responsável?",
      "back": "Fatos observados, limites da evidência, hipóteses, riscos e próximos testes seguros.",
      "tags": [
        "relatório"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.9.5",
      "front": "Qual é a diferença entre Mbps e MB/s?",
      "back": "Mbps mede megabits por segundo; MB/s mede megabytes por segundo. Em teoria, divide-se Mbps por 8 para converter para MB/s antes de overhead.",
      "tags": [
        "métricas"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.9.6",
      "front": "O que é diagnóstico por camadas?",
      "back": "É testar e organizar as evidências de baixo para cima: interface e endereço, gateway e DNS, caminho, porta e aplicação. Uma falha embaixo explica as falhas de cima.",
      "tags": [
        "camadas"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.9.7",
      "front": "A porta 443 responde, mas o HTTP retorna 403. Para onde a investigação sobe?",
      "back": "Para permissão: autenticação, autorização ou uma regra da aplicação. A conectividade básica já existe; cabo e DNS não explicam um 403.",
      "tags": [
        "camadas",
        "autorização"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.9.5",
      "type": "diagnóstico",
      "prompt": "Test-NetConnection para o sistema na porta 443 mostra TcpTestSucceeded : True, e curl -I retorna HTTP 403. Escreva a leitura no formato: mostra X, não mostra Y, próximo teste Z.",
      "expectedAnswer": "Mostra que o nome resolveu, que há caminho, que a porta 443 aceita conexão e que o servidor respondeu em HTTP. Não mostra problema de cabo, Wi-Fi ou DNS, nem permissão do usuário. Próximo teste: login e permissões do usuário, a regra da aplicação ou um bloqueio de proxy.",
      "explanation": "403 é uma resposta: a investigação sobe para permissão, não desce para a rede."
    },
    {
      "id": "ex0.9.6",
      "type": "segurança",
      "prompt": "Um log de aplicação contém Authorization: Basic dXN1YXJpbzpzZW5oYTEyMw==. Decodifique o valor (Linux: echo 'dXN1YXJpbzpzZW5oYTEyMw==' | base64 -d; PowerShell: [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('dXN1YXJpbzpzZW5oYTEyMw==')) ) e diga o que fazer antes de anexar o log a um chamado.",
      "expectedAnswer": "Decodificado, é usuario:senha123: usuário e senha legíveis. Antes de anexar: trocar o valor por <mascarado>, remover outros tokens e cookies e avisar o responsável para trocar a senha.",
      "explanation": "Basic Auth só codifica usuario:senha; quem lê o log recupera a credencial."
    },
    {
      "id": "ex0.9.7",
      "type": "cálculo",
      "prompt": "Um teste de velocidade mostra 40 MB/s, e o plano é de 500 Mbps. O usuário diz que recebe menos de 10% do contratado. Ele tem razão?",
      "expectedAnswer": "40 MB/s × 8 = 320 Mbps, cerca de 64% dos 500 Mbps: ele comparou bytes com bits. Se 64% ainda parecer pouco, repita o teste com cabo e em outro horário, lembrando que o overhead já reduz a taxa útil.",
      "explanation": "Converta para a mesma unidade antes de comparar."
    }
  ],
  "challenge": {
    "title": "Duas rodadas de um sistema que às vezes não abre",
    "scenario": "Um usuário relata que o sistema interno https://financeiro.empresa.local às vezes não abre. Você rodou os mesmos testes duas vezes no notebook dele. Às 09:10: ping ao gateway 10.0.5.1 com 2 ms e 0% de perda; o nome resolve para 10.20.30.40; Test-NetConnection na porta 443 dá True; curl -I retorna HTTP/1.1 200. Às 14:30, com o sistema fora: ping ao gateway com 60% de perda e até 400 ms; Resolve-DnsName e curl esgotam o tempo. O relatório vai para o time de redes.",
    "tasks": [
      "Escrever, para a rodada das 14:30, o que cada teste mostra e o que não mostra.",
      "Dizer qual é a hipótese mais provável e por que o DNS não é o primeiro suspeito.",
      "Propor dois próximos testes e dizer o que mascarar antes de enviar."
    ],
    "expectedDeliverables": [
      "Um relatório de 8 a 12 linhas com a leitura das 14:30, a hipótese e os próximos testes."
    ]
  },
  "commentedSolution": {
    "reasoning": "Compare as duas rodadas de baixo para cima. A primeira diferença que aparece na base explica as falhas que vêm depois.",
    "steps": [
      "09:10: tudo funciona, mas isso só prova o estado naquele horário.",
      "14:30: a perda de 60% já aparece no ping ao gateway. Mostra um problema entre o notebook e a rede local; não mostra se é o Wi-Fi, o cabo ou o próprio gateway.",
      "DNS e curl esgotam o tempo porque os pacotes se perdem antes. Culpá-los seria explicar uma falha de baixo com um teste de cima.",
      "Próximos testes: no próximo episódio, repetir o ping ao gateway com cabo e de outro computador da mesma rede.",
      "Antes de enviar: o time de redes precisa dos IPs; mascare o nome do usuário e qualquer token ou cookie."
    ],
    "commonMistakes": [
      "Concluir que o DNS caiu porque o Resolve-DnsName falhou.",
      "Achar que a rodada das 09:10 prova que está tudo bem."
    ],
    "finalAnswer": "Hipótese principal: instabilidade entre o notebook e a rede local (60% de perda já no gateway), que derruba DNS e HTTPS. Próximo teste: repetir na falha, com cabo e de outro computador."
  },
  "glossary": [
    {
      "term": "Gateway",
      "shortDefinition": "O roteador que leva o tráfego da rede local para outras redes, como a internet. Em casa, costuma ser o próprio roteador Wi-Fi.",
      "example": "Gateway padrão 192.168.0.1 na saída do ipconfig /all.",
      "relatedLessons": [
        "1.9",
        "2.5"
      ]
    },
    {
      "term": "DNS",
      "shortDefinition": "Serviço que traduz nomes, como example.com, em endereços IP.",
      "example": "Resolve-DnsName example.com mostra o IP do site.",
      "relatedLessons": [
        "7.1"
      ]
    },
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de mensagens de controle usado pelo ping e pelo traceroute. Muitos roteadores e servidores o filtram.",
      "relatedLessons": [
        "4.8"
      ]
    },
    {
      "term": "TLS",
      "shortDefinition": "Protocolo que criptografa a conexão entre o programa e o servidor; é o que faz o https.",
      "relatedLessons": [
        "8.3"
      ]
    },
    {
      "term": "Código de status HTTP",
      "shortDefinition": "Número de três dígitos com que o servidor resume a resposta: 200 (deu certo), 301 (o endereço mudou), 403 (acesso recusado).",
      "example": "A primeira linha do curl -I, como HTTP/1.1 200 OK.",
      "relatedLessons": [
        "8.2"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre representação de informação."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.8",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre pensamento em camadas."
    },
    {
      "type": "official-doc",
      "title": "curl manual",
      "organization": "curl project",
      "url": "https://curl.se/docs/manpage.html",
      "note": "Referência para uso defensivo de curl em testes HTTP."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Troubleshooting e Observabilidade",
      "lesson": "a definir",
      "reason": "O relatório por evidências será usado em pipelines, logs, métricas e automação."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Fundamentos de autenticação e autorização",
      "lesson": "a definir",
      "reason": "A separação entre conectividade, autenticação e autorização será essencial em IAM."
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
      "0.10"
    ]
  }
};
