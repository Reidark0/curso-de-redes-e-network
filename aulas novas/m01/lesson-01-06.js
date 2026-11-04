export const lesson0106 = {
  "id": "1.6",
  "moduleId": "m01",
  "order": 6,
  "title": "Cabeamento estruturado e padrões RJ-45",
  "subtitle": "Como organizar a rede física de forma padronizada, documentada, testável e segura, da tomada de rede até o patch panel e o switch.",
  "duration": "130-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "cabeamento estruturado",
    "RJ-45",
    "Ethernet",
    "patch panel",
    "rack",
    "T568A",
    "T568B",
    "PoE",
    "troubleshooting",
    "segurança física"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.4",
      "reason": "Topologias físicas e lógicas ajudam a entender por que o cabeamento precisa ser planejado e documentado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.5",
      "reason": "A aula anterior explicou os meios de transmissão, especialmente cobre, fibra e rádio."
    }
  ],
  "objectives": [
    "Entender o que é cabeamento estruturado e por que ele existe.",
    "Diferenciar cabo, tomada, patch cord, patch panel, rack, switch e ponto de rede.",
    "Compreender os padrões T568A e T568B sem decorar pinagem de forma cega.",
    "Relacionar categoria de cabo, distância, interferência, PoE e velocidade negociada.",
    "Diagnosticar problemas comuns de cabeamento com evidências e sem achismo.",
    "Entender impactos de segurança física e operação em ambientes corporativos."
  ],
  "learningOutcomes": [
    "Dado um rack simples, o aluno consegue explicar o caminho lógico e físico entre uma tomada e um switch.",
    "Dado um cabo ou patch panel mal documentado, o aluno identifica riscos operacionais e de segurança.",
    "Dado um sintoma como porta em 100 Mbps em vez de 1 Gbps, o aluno levanta hipóteses físicas coerentes.",
    "Dado um cenário de empresa pequena, o aluno propõe organização mínima de cabeamento, documentação e validação."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>Imagine uma empresa pequena que cresceu rápido. No começo havia um roteador, um switch em cima de uma mesa e alguns cabos soltos. Depois vieram câmeras IP, telefones VoIP, access points, impressoras, servidores, visitantes e um firewall. Em algum momento, ninguém sabe mais qual cabo vai para qual sala, qual porta alimenta qual access point ou por que uma estação negocia 100 Mbps quando deveria negociar 1 Gbps. Cada manutenção vira tentativa e erro.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o SOC detecta tráfego suspeito vindo de um ponto de rede, mas o inventário não diz qual tomada, sala ou equipamento está ligado ali. O incidente deixa de ser só técnico e vira problema de documentação física, controle de acesso e rastreabilidade.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>Nos primeiros ambientes de rede, cada cabo era instalado de forma pontual: um para o computador, outro para a impressora, outro improvisado para a sala nova. Isso funciona enquanto a rede é pequena. O problema aparece quando ela precisa crescer, passar para outra equipe, ser auditada ou ser diagnosticada com pressa. O desafio não é \"fazer o cabo funcionar\", e sim ter uma infraestrutura física que continue funcionando depois de mudanças, expansões, incidentes e troca de equipamentos. A instalação estruturada custa mais no início (rack, patch panels, certificação, mão de obra qualificada), mas reduz o custo de manutenção e de indisponibilidade; só um teste temporário e pequeno, sem risco operacional, dispensa esse investimento.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Sem…</th><th>O que acontece</th><th>O que o cabeamento estruturado faz</th></tr></thead>\n    <tbody>\n      <tr><td>Padronização</td><td>Cabos terminados com pinagens diferentes, falhas intermitentes e manutenção difícil</td><td>Um padrão de terminação (T568A ou T568B) adotado e documentado no ambiente inteiro</td></tr>\n      <tr><td>Documentação</td><td>Ninguém sabe qual tomada corresponde a qual porta do patch panel ou do switch</td><td>Etiquetas iguais na tomada e no patch panel, e inventário ligando ponto, porta, VLAN e responsável</td></tr>\n      <tr><td>Certificação</td><td>O cabo \"dá link\", mas não sustenta a taxa esperada; o teste de continuidade só mostra se os fios têm contato</td><td>Teste com certificador que mede parâmetros físicos (perda, diafonia, comprimento)</td></tr>\n      <tr><td>Organização física</td><td>Rack vira emaranhado, ventilação piora e a troca de equipamento arrisca desligar serviço crítico</td><td>Cabeamento horizontal terminado em patch panel, guias de cabos e patch cords curtos</td></tr>\n      <tr><td>Segurança física</td><td>Qualquer tomada aceita qualquer dispositivo: portas ativas em local público permitem conexão indevida</td><td>Portas ociosas desativadas, 802.1X, VLANs por função e port security</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\"><strong>Definição:</strong> cabeamento estruturado é a infraestrutura física planejada que liga as áreas de trabalho ao rack de telecomunicações de forma padronizada, identificável, testável e preparada para mudanças. Inclui cabos, tomadas, patch panels, racks, caminhos, etiquetas, documentação, testes e critérios de instalação.</div>\n  <h3>O conector RJ-45</h3>\n  <p>O conector das pontas dos cabos Ethernet de par trançado é chamado de RJ-45 na prática de TI. O nome técnico é <strong>8P8C</strong> (8 posições, 8 contatos): \"RJ-45\" vem da telefonia, mas virou o nome popular. O cabo tem <strong>4 pares trançados</strong> (laranja, verde, azul e marrom), e cada par tem um fio de cor sólida e um fio branco listrado.</p>\n  <h3>T568A e T568B: o que muda de verdade</h3>\n  <p>T568A e T568B são as duas ordens padronizadas para encaixar os 8 fios nos pinos do conector. Elas são eletricamente equivalentes. A única diferença é que <strong>os pares laranja e verde trocam de lugar</strong>; azul e marrom ficam nos mesmos pinos. Você não precisa decorar a tabela: basta lembrar que o pino 1 é branco-verde no A e branco-laranja no B, e que os pinos 4, 5, 7 e 8 são iguais nos dois.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Pino</th><th>T568A</th><th>T568B</th><th>Uso em 10/100 Mbps</th></tr></thead>\n    <tbody>\n      <tr><td>1</td><td>branco-verde</td><td>branco-laranja</td><td>transmissão</td></tr>\n      <tr><td>2</td><td>verde</td><td>laranja</td><td>transmissão</td></tr>\n      <tr><td>3</td><td>branco-laranja</td><td>branco-verde</td><td>recepção</td></tr>\n      <tr><td>4</td><td>azul</td><td>azul</td><td>não usado</td></tr>\n      <tr><td>5</td><td>branco-azul</td><td>branco-azul</td><td>não usado</td></tr>\n      <tr><td>6</td><td>laranja</td><td>verde</td><td>recepção</td></tr>\n      <tr><td>7</td><td>branco-marrom</td><td>branco-marrom</td><td>não usado</td></tr>\n      <tr><td>8</td><td>marrom</td><td>marrom</td><td>não usado</td></tr>\n    </tbody>\n  </table></div>\n  <ul>\n    <li><strong>Cabo direto:</strong> o mesmo padrão nas duas pontas (A–A ou B–B). É o cabo comum entre computador e tomada, ou entre patch panel e switch. Escolha um padrão e documente-o para o ambiente inteiro.</li>\n    <li><strong>Cabo cruzado (crossover):</strong> A numa ponta e B na outra, o que liga a transmissão de um lado à recepção do outro. Era usado entre equipamentos iguais (PC–PC, switch–switch). Hoje a maioria das portas tem <strong>Auto-MDI-X</strong>, que detecta e corrige isso sozinha; por isso um cabo misturado por engano pode até funcionar, mas foge do padrão documentado e confunde a manutenção.</li>\n    <li><strong>Por que os pares importam no diagnóstico:</strong> 10 e 100 Mbps usam só os pinos 1, 2, 3 e 6 (dois pares). 1 Gbps (1000BASE-T) usa os <strong>quatro pares</strong>. Um cabo com o par azul ou marrom rompido, mal crimpado ou trocado pode dar link a 100 Mbps e nunca chegar a 1 Gbps. É a causa clássica do sintoma \"porta em 100 Mbps em vez de 1 Gbps\".</li>\n  </ul>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>O caminho de um ponto de rede</h3>\n  <p>Um ponto de rede estruturado não é um cabo único entre o computador e o switch. É um caminho com várias partes, e cada uma pode introduzir falhas.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Dispositivo final:</strong> notebook, desktop, telefone IP, impressora, câmera ou access point.</li>\n    <li><strong>Patch cord da área de trabalho:</strong> cabo flexível que liga o equipamento à tomada de rede.</li>\n    <li><strong>Tomada/keystone:</strong> ponto fixo onde o cabo horizontal termina no ambiente do usuário.</li>\n    <li><strong>Cabo horizontal:</strong> cabo fixo, instalado pela infraestrutura do prédio (parede, piso, eletrocalha), da tomada até o rack.</li>\n    <li><strong>Patch panel:</strong> painel no rack onde os cabos horizontais terminam de forma organizada e identificada.</li>\n    <li><strong>Patch cord de rack:</strong> cabo curto que liga a porta do patch panel à porta do switch.</li>\n    <li><strong>Switch:</strong> equipamento ativo que negocia velocidade e duplex, fornece PoE quando aplicável e encaminha quadros Ethernet.</li>\n  </ol>\n  <p>Quando uma estação não conecta, verifique cada etapa. Um link apagado pode ser cabo solto, tomada errada, patch panel mal identificado, conector danificado, porta ou interface desabilitada, equipamento sem energia ou política de segurança bloqueando o acesso.</p>\n  <h3>Categoria, distância e interferência</h3>\n  <p>A categoria diz até que frequência o cabo foi projetado e, portanto, que velocidade ele sustenta. Em todas elas o limite do canal de par trançado é <strong>100 m</strong>: até 90 m de cabo horizontal fixo mais até 10 m somados de patch cords (área de trabalho e rack). Acima disso a atenuação cresce, os erros aumentam e a porta pode negociar velocidade menor ou nem subir.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Categoria</th><th>Frequência</th><th>O que sustenta</th></tr></thead>\n    <tbody>\n      <tr><td>Cat5e</td><td>100 MHz</td><td>1 Gbps (1000BASE-T) até 100 m</td></tr>\n      <tr><td>Cat6</td><td>250 MHz</td><td>1 Gbps até 100 m; 10 Gbps só em trechos curtos (até cerca de 55 m)</td></tr>\n      <tr><td>Cat6A</td><td>500 MHz</td><td>10 Gbps (10GBASE-T) até 100 m</td></tr>\n    </tbody>\n  </table></div>\n  <p>O trançado dos pares é o que cancela o ruído. Por isso a interferência aparece quando a instalação desfaz essa proteção: cabo UTP correndo junto de cabos de energia, motores ou reatores de iluminação; pares destrançados demais na terminação (o recomendado é destrançar o mínimo possível, por volta de 13 mm); dobras fechadas ou abraçadeiras apertadas que esmagam o cabo. O sintoma típico são erros CRC e lentidão intermitente, não a falta total de link.</p>\n  <h3>PoE: energia pelo mesmo cabo</h3>\n  <p>Com PoE (Power over Ethernet), a porta do switch envia energia pelo mesmo cabo dos dados para APs, câmeras e telefones IP. Os padrões IEEE mais comuns são 802.3af (PoE, até 15,4 W por porta), 802.3at (PoE+, até 30 W) e 802.3bt (até 60 W ou 90 W). Além do limite por porta, o switch tem um <strong>orçamento PoE</strong>: a potência total que consegue entregar a todas as portas juntas. Exemplo com valores ilustrativos: 3 APs de 25 W e 6 câmeras de 7 W somam 75 + 42 = 117 W. Se o orçamento do switch for menor, alguns dispositivos não ligam ou reiniciam. Confira o consumo no datasheet de cada equipamento.</p>\n  <h3>Continuidade não é certificação</h3>\n  <ul>\n    <li><strong>Testador de continuidade:</strong> mostra se cada fio chega ao pino certo na outra ponta (mapa de fios). Detecta fio aberto, curto, fios de um par invertidos entre si e pares trocados de posição.</li>\n    <li><strong>O que ele não pega:</strong> desempenho. O caso clássico é o <strong>par dividido</strong> (split pair): cada pino está ligado ao pino correto do outro lado, mas os dois fios de um sinal pertencem a pares diferentes. A continuidade passa, o trançado não cancela o ruído, e a porta gera erros sob carga.</li>\n    <li><strong>Certificador:</strong> mede comprimento, perda (atenuação), diafonia (NEXT) e perda de retorno, e compara com os limites da categoria. É o que garante que um ponto Cat6 se comporta como Cat6.</li>\n  </ul>\n  <div class=\"callout warning\"><strong>Erros comuns:</strong>\n    <ul>\n      <li>Achar que qualquer cabo com RJ-45 serve para qualquer velocidade. Por fora os cabos parecem iguais; confira categoria, comprimento, terminação e os contadores da porta.</li>\n      <li>Misturar T568A e T568B sem motivo, por decorar cores sem entender o padrão de ponta a ponta. O resultado são cabos cruzados por acidente e manutenção confusa.</li>\n      <li>Não identificar tomadas e patch panel porque \"a rede é pequena\". Cada mudança vira tentativa e erro, e a documentação fica obsoleta se as mudanças não forem registradas.</li>\n      <li>Deixar portas ativas em áreas públicas por conveniência. Um ponto físico correto não garante autorização nem segurança lógica.</li>\n    </ul>\n  </div>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>Na arquitetura física, o cabeamento estruturado divide o ambiente em áreas com função definida:</p>\n  <ul class=\"flow-list\">\n    <li><strong>Área de trabalho:</strong> onde ficam usuários, estações, telefones, impressoras e access points.</li>\n    <li><strong>Cabeamento horizontal:</strong> liga as tomadas da área de trabalho à sala de telecomunicações (o trecho de até 90 m).</li>\n    <li><strong>Sala de telecomunicações:</strong> concentra rack, patch panels, switches de acesso e organização de cabos.</li>\n    <li><strong>Backbone:</strong> interliga racks, andares, prédios ou datacenters, frequentemente com fibra, porque as distâncias passam dos 100 m do cobre.</li>\n    <li><strong>Documentação:</strong> liga o mundo físico ao inventário lógico: tomada, porta do patch panel, porta do switch, sala, VLAN, serviço e responsável.</li>\n  </ul>\n  <h3>Decisões típicas por ponto</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Situação</th><th>Escolha recomendada</th><th>Por quê</th><th>Risco se não fizer</th></tr></thead>\n    <tbody>\n      <tr><td>Mesa nova em área administrativa</td><td>Ponto identificado no patch panel e no inventário</td><td>Permite manutenção e rastreabilidade</td><td>Incidentes e mudanças ficam lentos</td></tr>\n      <tr><td>Access point no teto</td><td>Cabo estruturado com PoE dimensionado</td><td>Dispensa fonte externa e simplifica a instalação</td><td>Sem orçamento PoE, o AP reinicia ou não liga</td></tr>\n      <tr><td>Porta na recepção</td><td>Desativada, ou em VLAN restrita com autenticação</td><td>Área pública aumenta o risco de conexão indevida</td><td>Acesso físico vira acesso lógico</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>Pense no cabeamento estruturado como a instalação elétrica e hidráulica de um prédio. Você não quer fios passando aleatoriamente pelo chão nem canos improvisados sem identificação. Você quer quadros, tomadas, conduítes, etiquetas, planta, manutenção e pontos previsíveis.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> depois do cabo ainda existem protocolos, VLANs, autenticação e firewalls; um ponto físico bem instalado não garante autorização nem segurança lógica.</div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>Em casa, você liga um cabo do roteador ao computador e a internet parece lenta. No PowerShell, <code>Get-NetAdapter</code> mostra <code>LinkSpeed 100 Mbps</code>, embora o roteador e a placa sejam de 1 Gbps. Você talvez culpe o provedor, mas o problema está entre a placa de rede e a porta: um conector mal crimpado, um cabo dobrado demais ou partido parcialmente pode romper o par azul ou marrom, e sem os quatro pares não há 1 Gbps. Trocar o patch cord por um Cat5e ou Cat6 em bom estado e conferir de novo o <code>LinkSpeed</code> resolve ou descarta essa hipótese em um minuto.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>Em uma empresa, cada ponto de rede deve ter identificação. Por exemplo: <code>2A-034</code> pode indicar prédio 2, andar A, ponto 034. No rack, o patch panel mostra o mesmo código. O inventário informa que esse ponto está na sala financeira, ligado ao switch de acesso 3, porta 18, VLAN corporativa, com autenticação 802.1X habilitada.</p>\n  <p>Essa rastreabilidade muda tudo. Se a porta gera muitos erros, você sabe aonde ir. Se há tráfego suspeito, você sabe que tomada investigar. Se o usuário muda de mesa, a equipe sabe quais patches alterar. Se a porta fica em área pública, ela pode ficar desligada até ser necessária.</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Na cloud pública você não gerencia cabo, patch panel nem rack: o provedor abstrai isso atrás de VPCs, subnets e interfaces virtuais. O cabeamento volta a ser problema seu na conectividade híbrida. Um link dedicado com a cloud passa por cross-connect no datacenter de colocation, transceptor, fibra, porta física do roteador de borda e VLAN de transporte. Quando ele cai, sem documentação do circuito, do rack e das portas, o troubleshooting fica lento e caro.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 430\" role=\"img\" aria-labelledby=\"m01l06-title m01l06-desc\">\n    <title id=\"m01l06-title\">Caminho do cabeamento estruturado até o switch</title>\n    <desc id=\"m01l06-desc\">O diagrama mostra dispositivo final, patch cord, tomada, cabo horizontal, patch panel, patch cord de rack, switch e documentação de porta.</desc>\n    <defs>\n      <marker id=\"m01l06-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"97\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"97\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">dispositivo final</text>\n    <rect x=\"220\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"287\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Tomada</text>\n    <text x=\"287\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">keystone</text>\n    <rect x=\"410\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"477\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Cabo horizontal</text>\n    <text x=\"477\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">infraestrutura</text>\n    <rect x=\"600\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"667\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Patch panel</text>\n    <text x=\"667\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta identificada</text>\n    <rect x=\"790\" y=\"95\" width=\"135\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"857\" y=\"125\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n    <text x=\"857\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta/VLAN/PoE</text>\n    <line x1=\"165\" y1=\"131\" x2=\"220\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"355\" y1=\"131\" x2=\"410\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"545\" y1=\"131\" x2=\"600\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <line x1=\"735\" y1=\"131\" x2=\"790\" y2=\"131\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l06-arrow)\" />\n    <rect x=\"70\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"200\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Padrão físico</text>\n    <text x=\"200\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">categoria, distância, terminação</text>\n    <text x=\"200\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">T568A/B e qualidade do conector</text>\n    <rect x=\"390\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"520\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Operação</text>\n    <text x=\"520\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">etiqueta, inventário, patching</text>\n    <text x=\"520\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">teste, certificação e mudança</text>\n    <rect x=\"710\" y=\"245\" width=\"260\" height=\"105\" rx=\"14\" class=\"svg-zone svg-node--security\" />\n    <text x=\"840\" y=\"275\" text-anchor=\"middle\" class=\"svg-label\">Segurança</text>\n    <text x=\"840\" y=\"302\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta física, 802.1X, VLAN</text>\n    <text x=\"840\" y=\"328\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rastreabilidade e menor exposição</text>\n  </svg>\n</section>\n",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> cabeamento estruturado transforma fios soltos em infraestrutura rastreável. Antes de culpar IP ou aplicação, confirme o caminho físico, a identificação, a porta, a velocidade negociada, os erros e a documentação.</li>\n    <li><strong>O caminho:</strong> dispositivo → patch cord → tomada → cabo horizontal (até 90 m) → patch panel → patch cord de rack → switch; o canal inteiro tem no máximo 100 m.</li>\n    <li><strong>T568A × T568B:</strong> só os pares laranja e verde trocam de lugar. Use o mesmo padrão nas duas pontas e documente-o; 1 Gbps precisa dos quatro pares.</li>\n    <li><strong>Erro comum:</strong> achar que \"deu link\" significa cabeamento adequado. Continuidade não mede desempenho; categoria, interferência e PoE também contam.</li>\n    <li><strong>Uso real:</strong> bons padrões físicos reduzem tempo de troubleshooting, erro humano, indisponibilidade e risco de acesso indevido.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula você estuda os equipamentos de rede: NIC, hub, switch, roteador, access point e firewall. A pergunta muda de \"por onde o sinal passa?\" para \"quem recebe, encaminha, filtra ou distribui esse tráfego?\".</p>\n</section>\n"
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
      "PoE",
      "LLDP",
      "CDP",
      "802.1X"
    ],
    "dependsOn": [
      "meios de transmissão",
      "topologia física",
      "sinais físicos"
    ],
    "enables": [
      "switching",
      "VLAN",
      "port security",
      "troubleshooting físico",
      "inventário de rede"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Link apagado",
      "Porta negociando 100 Mbps em vez de 1 Gbps",
      "Perda ou lentidão intermitente",
      "Telefone IP ou AP não liga via PoE",
      "Usuário conectado à VLAN errada",
      "Erros CRC ou input errors na porta"
    ],
    "diagnosticQuestions": [
      "Qual tomada e porta de patch panel estão envolvidas?",
      "A porta do switch está ativa?",
      "Há velocidade e duplex negociados?",
      "Existe PoE suficiente?",
      "Há erros físicos na interface?",
      "O cabo foi testado ou certificado?",
      "A documentação bate com a realidade?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed",
        "purpose": "Verificar se a interface está ativa e qual velocidade foi negociada.",
        "expectedObservation": "Status Up e LinkSpeed compatível com o esperado.",
        "interpretation": "Velocidade menor pode indicar cabo, porta, categoria, negociação ou equipamento."
      },
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Confirmar interface, endereço, DHCP, gateway e DNS após o link físico subir.",
        "expectedObservation": "Interface com endereço válido e gateway quando aplicável.",
        "interpretation": "Se não há link, IP pode nem aparecer corretamente; se há link sem IP, investigar DHCP/VLAN."
      },
      {
        "platform": "Linux",
        "command": "ip link show && ethtool <interface>",
        "purpose": "Ver estado da interface e velocidade/duplex quando ethtool estiver disponível.",
        "expectedObservation": "Link detected: yes e Speed compatível.",
        "interpretation": "Sem link detectado aponta para camada física, porta, cabo ou NIC."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces status",
        "purpose": "Listar portas, VLAN, duplex, speed e tipo.",
        "expectedObservation": "Portas conectadas com VLAN e velocidade esperadas.",
        "interpretation": "notconnect, disabled ou speed inesperado orientam o diagnóstico físico/lógico."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces <interface>",
        "purpose": "Ver erros, CRC, input errors, resets e estatísticas físicas.",
        "expectedObservation": "Baixo ou nenhum erro físico em operação normal.",
        "interpretation": "CRC/input errors sugerem cabo, conector, interferência ou porta problemática."
      },
      {
        "platform": "Cisco IOS",
        "command": "show power inline",
        "purpose": "Ver consumo e disponibilidade de PoE.",
        "expectedObservation": "Dispositivos PoE alimentados e orçamento suficiente.",
        "interpretation": "Sem energia ou potência insuficiente pode afetar APs, câmeras e telefones."
      }
    ],
    "decisionTree": [
      {
        "if": "Link apagado",
        "then": "Verificar cabo, porta, patch panel, tomada, interface e se a porta está administrativamente habilitada."
      },
      {
        "if": "Link sobe em velocidade menor",
        "then": "Suspeitar dos pares azul e marrom (1 Gbps usa os quatro pares): verificar conector, patch cord, categoria, comprimento do canal (até 100 m), porta e negociação; trocar o patch cord e conferir de novo."
      },
      {
        "if": "Há muitos CRC",
        "then": "Suspeitar de cabo, conector, par destrançado ou dividido, interferência ou porta; testar substituição controlada e, em ponto crítico, certificar o cabo."
      },
      {
        "if": "PoE não liga dispositivo",
        "then": "Verificar orçamento PoE, padrão suportado, cabo, porta e consumo do equipamento."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter racks e salas técnicas trancados e com controle de acesso.",
      "Identificar tomadas, portas de patch panel e portas de switch.",
      "Desativar portas não utilizadas.",
      "Usar autenticação 802.1X ou port security quando aplicável.",
      "Separar portas de visitantes, IoT, câmeras e usuários corporativos em VLANs e políticas por função.",
      "Registrar mudanças físicas de patching e revisar a documentação periodicamente."
    ],
    "badPractices": [
      "Deixar cabos, switches de mesa e cabos de câmera acessíveis em áreas públicas.",
      "Manter portas ativas sem inventário.",
      "Misturar cabos sem categoria conhecida em produção.",
      "Não registrar alterações de patch panel.",
      "Compartilhar diagramas físicos sensíveis sem controle: eles revelam caminhos físicos e lógicos."
    ],
    "commonErrors": [
      "Confundir link físico com autorização de acesso.",
      "Achar que rack trancado resolve VLAN mal configurada.",
      "Tratar documentação física como detalhe sem valor de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso físico a porta ativa",
        "description": "Uma tomada ativa em área não controlada pode permitir conexão indevida à rede.",
        "defensiveExplanation": "O risco não exige exploração sofisticada; basta disponibilidade física e ausência de controle lógico.",
        "mitigation": "Desativar portas ociosas, usar 802.1X, VLAN restrita, port security e monitoramento."
      },
      {
        "name": "Rastreabilidade insuficiente",
        "description": "Sem documentação, um evento de rede não pode ser rapidamente ligado a uma tomada, sala ou ativo.",
        "defensiveExplanation": "A investigação perde tempo e pode preservar evidências de forma inadequada.",
        "mitigation": "Etiquetas, inventário, CMDB, controle de mudança e revisão periódica."
      },
      {
        "name": "Sabotagem ou erro humano no rack",
        "description": "Rack aberto e patch cords sem organização permitem desconexão acidental, alteração não autorizada ou espelhamento físico de tráfego.",
        "defensiveExplanation": "Ambientes bagunçados dificultam detectar o que foi alterado.",
        "mitigation": "Controle físico, guias de cabos, lacres quando necessário, registro de acesso e revisão."
      },
      {
        "name": "PoE sem planejamento",
        "description": "Quando o orçamento PoE do switch se esgota, câmeras e APs desligam ou reiniciam.",
        "defensiveExplanation": "Câmera sem energia é perda de visibilidade de segurança, e AP reiniciando derruba usuários; o efeito parece ataque ou falha lógica, mas a causa é física.",
        "mitigation": "Dimensionar o orçamento PoE somando o consumo de cada dispositivo, monitorar o consumo com show power inline e reservar margem para expansão."
      }
    ],
    "monitoring": [
      "Mudança inesperada de status de porta",
      "Mudança de velocidade negociada",
      "Aumento de CRC/input errors",
      "Eventos de autenticação 802.1X",
      "Consumo PoE anormal"
    ],
    "detectionIdeas": [
      "Alertas de link up em portas não autorizadas ou ociosas",
      "Relatórios periódicos de portas ativas sem dono no inventário",
      "Comparação entre inventário e estado real do switch",
      "Correlação entre porta física, MAC address e autenticação 802.1X"
    ]
  },
  "lab": {
    "id": "lab-1.6",
    "title": "Inventário seguro de cabeamento estruturado",
    "labType": "security",
    "objective": "Mapear um caminho físico de rede, identificar componentes e coletar evidências sem desconectar serviços críticos.",
    "scenario": "Você precisa explicar como um dispositivo final chega ao switch: cabo, tomada, patch panel, rack, porta, VLAN provável, velocidade e riscos físicos.",
    "topology": "Dispositivo final -> patch cord -> tomada/keystone -> cabo horizontal -> patch panel -> patch cord de rack -> switch -> rede local",
    "architecture": "Ambiente de acesso cabeado com pelo menos um dispositivo conectado por Ethernet. Pode ser casa, laboratório, empresa com autorização ou simulação desenhada.",
    "prerequisites": [
      "Ter estudado as aulas 1.4 e 1.5.",
      "Ter autorização para observar o ambiente físico, se for corporativo."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "Acesso visual ao cabo/tomada/rack quando permitido",
      "Opcional: testador de cabo",
      "Opcional: acesso somente leitura ao switch",
      "Planilha ou arquivo de texto para inventário"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não desconecte cabos de produção sem autorização.",
      "Não fotografe racks ou etiquetas sensíveis sem permissão.",
      "Remova informações sensíveis antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Escolher um ponto de rede",
        "instruction": "Escolha um dispositivo cabeado que possa ser observado com segurança.",
        "expectedOutput": "Dispositivo e ponto escolhidos.",
        "explanation": "Começar por um ponto controlado evita interferir em serviços críticos."
      },
      {
        "number": 2,
        "title": "Registrar o dispositivo final",
        "instruction": "Anote tipo de dispositivo, local físico e se usa cabo ou Wi-Fi.",
        "command": "hostname  # Linux/macOS\n$env:COMPUTERNAME  # PowerShell",
        "expectedOutput": "Nome do host ou identificação local.",
        "explanation": "Inventário físico precisa se conectar ao ativo lógico."
      },
      {
        "number": 3,
        "title": "Verificar estado e velocidade da interface",
        "instruction": "Colete evidência de link e velocidade negociada.",
        "command": "Get-NetAdapter | Format-Table Name, Status, LinkSpeed  # Windows\nip link show && ethtool <interface>  # Linux, se disponível",
        "expectedOutput": "Interface ativa e velocidade negociada.",
        "explanation": "Velocidade inesperada pode indicar problema físico ou limitação de porta/equipamento. 100 Mbps numa placa de 1 Gbps sugere par azul ou marrom com defeito, patch cord ruim ou porta limitada."
      },
      {
        "number": 4,
        "title": "Mapear caminho físico visível",
        "instruction": "Descreva, sem desconectar, o caminho entre dispositivo e tomada, e da tomada ao rack se houver acesso autorizado. Se o conector do patch cord for transparente, observe o fio do pino 1 (com a trava para baixo e os contatos virados para você, o pino 1 fica à esquerda): branco-laranja indica T568B; branco-verde indica T568A.",
        "expectedOutput": "Descrição textual do caminho físico e, se visível, o padrão de terminação do patch cord.",
        "explanation": "Nem toda evidência é comando; documentação visual/textual é parte do trabalho de redes."
      },
      {
        "number": 5,
        "title": "Identificar tomada e patch panel",
        "instruction": "Registre códigos de tomada, patch panel e porta do switch quando disponíveis.",
        "command": "show interfaces status  # Cisco IOS, se houver acesso autorizado",
        "expectedOutput": "Porta, status, VLAN e velocidade quando possível.",
        "explanation": "A correlação entre tomada e porta é o coração da rastreabilidade."
      },
      {
        "number": 6,
        "title": "Checar indícios de erro físico",
        "instruction": "Se houver acesso ao switch, verifique erros físicos da porta observada.",
        "command": "show interfaces <interface>",
        "expectedOutput": "Contadores de erro baixos ou ausentes.",
        "explanation": "CRC e input errors apontam hipóteses de cabo, conector, interferência ou porta."
      },
      {
        "number": 7,
        "title": "Avaliar segurança do ponto",
        "instruction": "Classifique se a tomada fica em área controlada, pública, de visitante, estoque ou sala técnica.",
        "expectedOutput": "Classificação de risco físico.",
        "explanation": "O mesmo cabo pode ser aceitável em sala interna e arriscado em recepção pública."
      },
      {
        "number": 8,
        "title": "Produzir inventário resumido",
        "instruction": "Monte uma tabela com ponto, local, dispositivo, porta, velocidade, VLAN conhecida, riscos e evidências.",
        "expectedOutput": "Tabela de inventário do ponto escolhido.",
        "explanation": "O objetivo final é transformar observação em documentação útil para operação e segurança."
      }
    ],
    "expectedResult": "O aluno deve produzir um inventário mínimo de um ponto cabeado, conectando dispositivo, tomada, caminho físico, switch, evidências e riscos.",
    "validation": [
      {
        "check": "A interface mostra link ativo",
        "command": "Get-NetAdapter ou ip link show",
        "expected": "Status Up ou equivalente",
        "ifFails": "Verificar cabo, porta, interface desabilitada ou falta de conexão."
      },
      {
        "check": "A velocidade negociada faz sentido",
        "command": "Get-NetAdapter ou ethtool",
        "expected": "LinkSpeed compatível com equipamento e cabeamento",
        "ifFails": "Suspeitar de cabo ruim, porta limitada, categoria inferior ou negociação."
      },
      {
        "check": "O ponto foi documentado",
        "command": "Revisar tabela do laboratório",
        "expected": "Tabela contém local, ponto, dispositivo, porta e riscos",
        "ifFails": "Completar campos ausentes antes de considerar o lab concluído."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não há link",
        "probableCause": "Cabo desconectado, tomada sem patch, porta desligada ou interface inativa.",
        "howToConfirm": "Ver LEDs, status da interface e patch panel com autorização.",
        "fix": "Reconectar corretamente ou solicitar ativação/correção conforme processo."
      },
      {
        "symptom": "Velocidade menor que esperada",
        "probableCause": "Cabo ruim, par danificado, categoria inadequada, porta antiga ou negociação.",
        "howToConfirm": "Testar outro cabo/porta em janela segura e verificar status no switch.",
        "fix": "Substituir patch cord, testar ponto, corrigir conector ou porta."
      },
      {
        "symptom": "AP ou telefone IP não liga",
        "probableCause": "PoE desabilitado, orçamento insuficiente ou cabo inadequado.",
        "howToConfirm": "Verificar show power inline e especificação do dispositivo.",
        "fix": "Habilitar PoE, trocar porta/switch ou ajustar orçamento."
      }
    ],
    "improvements": [
      "Criar padrão de nomenclatura para pontos e registrar portas ociosas para desativá-las.",
      "Adicionar campos de VLAN e responsável no inventário.",
      "Planejar certificação dos cabos críticos e correlacionar o inventário físico com a ferramenta de monitoramento."
    ],
    "evidenceToCollect": [
      "Tabela de inventário do ponto",
      "Status de link e velocidade",
      "Identificação de tomada/patch panel se permitido",
      "Riscos físicos observados",
      "Ações recomendadas"
    ],
    "questions": [
      "Qual parte do caminho físico é mais frágil no seu cenário?",
      "O ponto observado fica em área controlada ou pública?",
      "A documentação existente seria suficiente em um incidente?",
      "A velocidade negociada bate com o esperado?"
    ],
    "challenge": "Escolha três pontos de rede hipotéticos: uma estação administrativa, um access point e uma câmera IP. Defina identificação, VLAN sugerida, PoE, risco físico e evidência mínima de validação.",
    "solution": "A estação administrativa deve ter ponto identificado e VLAN corporativa; o AP deve ter PoE dimensionado e VLANs conforme SSIDs; a câmera deve ficar em VLAN restrita e porta protegida. Todos precisam de documentação física, validação de link, velocidade/PoE e risco físico registrado."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que cabeamento estruturado é mais do que simplesmente crimpar cabos?",
      "hints": [
        "Pense em manutenção e auditoria.",
        "Pense em incidentes e mudanças."
      ],
      "expectedIdeas": [
        "padronização",
        "documentação",
        "rastreabilidade",
        "segurança",
        "troubleshooting"
      ],
      "explanation": "O valor está na infraestrutura previsível e testável, não apenas no cabo individual."
    },
    {
      "type": "diagnóstico",
      "question": "Um computador negocia 100 Mbps em uma rede que deveria ser 1 Gbps. O que você verificaria primeiro?",
      "hints": [
        "Pense em cabo, porta e categoria.",
        "Pense em evidências do sistema e do switch."
      ],
      "expectedIdeas": [
        "patch cord",
        "categoria",
        "conector",
        "pares azul e marrom (1 Gbps usa os quatro pares)",
        "porta",
        "velocidade negociada",
        "erros físicos"
      ],
      "explanation": "Antes de culpar DNS ou aplicação, valide camada física e negociação."
    },
    {
      "type": "cenário real",
      "question": "Uma tomada ativa fica na recepção. Como você reduziria o risco sem remover a utilidade operacional?",
      "hints": [
        "Pense em desativação quando ociosa.",
        "Pense em autenticação e VLAN restrita."
      ],
      "expectedIdeas": [
        "802.1X",
        "port security",
        "VLAN visitante",
        "porta desativada",
        "monitoramento"
      ],
      "explanation": "Controle físico e controle lógico precisam trabalhar juntos."
    }
  ],
  "quiz": [
    {
      "id": "q1.6.1",
      "question": "Qual é a melhor definição de cabeamento estruturado?",
      "options": [
        "A instalação de cabos da categoria mais alta disponível em todos os pontos",
        "Infraestrutura física planejada, identificada, documentada e testada que liga as áreas de trabalho ao rack",
        "A ligação direta de cada equipamento ao switch com cabos cortados sob medida",
        "O conjunto de VLANs e regras de firewall que separa os setores da empresa"
      ],
      "answer": 1,
      "explanation": "Cabeamento estruturado é organização e padrão: componentes, identificação, documentação e testes. Categoria alta sem documentação não é estruturado, e VLAN/firewall são controles lógicos.",
      "topic": "conceito",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.6.2",
      "question": "Uma porta deveria negociar 1 Gbps, mas aparece em 100 Mbps. Qual hipótese física é plausível?",
      "options": [
        "Gateway padrão configurado errado na estação",
        "Escopo do servidor DHCP sem endereços livres",
        "Cabo ou conector com um dos pares azul ou marrom danificado",
        "VLAN errada configurada na porta do switch"
      ],
      "answer": 2,
      "explanation": "Velocidade de link é negociada na camada física. 1 Gbps usa os quatro pares; com um par azul ou marrom com defeito o link pode subir só a 100 Mbps. DHCP, gateway e VLAN afetam endereço e alcance, não a velocidade negociada.",
      "topic": "troubleshooting",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q1.6.3",
      "question": "Para um cabo direto comum, qual prática reduz confusão operacional?",
      "options": [
        "Usar o mesmo padrão de terminação nas duas pontas e documentá-lo",
        "Usar T568A numa ponta e T568B na outra",
        "Escolher o padrão de cada ponta conforme a cor do cabo",
        "Terminar o patch panel em T568B e a tomada no padrão que o instalador preferir"
      ],
      "answer": 0,
      "explanation": "Cabo direto tem o mesmo padrão nas duas pontas. A numa ponta e B na outra forma um cabo cruzado; padrão escolhido ponto a ponto impede a manutenção previsível.",
      "topic": "T568A/T568B",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q1.6.4",
      "question": "Qual risco existe em manter tomadas ativas em áreas públicas?",
      "options": [
        "Esgotamento imediato do orçamento PoE do switch",
        "Queda da velocidade negociada nas outras portas do switch",
        "Aumento de erros CRC no cabo horizontal",
        "Conexão indevida de um dispositivo à rede interna"
      ],
      "answer": 3,
      "explanation": "Uma porta ativa sem controle lógico (802.1X, port security, VLAN restrita) permite que qualquer pessoa ligue um dispositivo na rede. Ela não afeta velocidade, CRC ou PoE das outras portas por estar ativa.",
      "topic": "segurança",
      "difficulty": "intermediário",
      "type": "segurança"
    },
    {
      "id": "q1.6.5",
      "question": "Qual componente normalmente concentra a terminação dos cabos horizontais no rack?",
      "options": [
        "Keystone",
        "Patch panel",
        "Patch cord de rack",
        "Switch de acesso"
      ],
      "answer": 1,
      "explanation": "Os cabos horizontais terminam no patch panel. O keystone fica na ponta da área de trabalho, o patch cord de rack liga patch panel e switch, e o switch é o equipamento ativo.",
      "topic": "componentes",
      "difficulty": "iniciante",
      "type": "operação"
    },
    {
      "id": "q1.6.6",
      "question": "Um AP no teto reinicia várias vezes ao dia. Qual item de cabeamento/infra deve ser verificado?",
      "options": [
        "Escopo DHCP da VLAN dos APs",
        "Canal Wi-Fi configurado no AP",
        "Orçamento PoE do switch e qualidade do cabo",
        "Padrão T568A ou T568B usado nas duas pontas do cabo"
      ],
      "answer": 2,
      "explanation": "O AP recebe energia e dados pelo cabo; PoE insuficiente ou cabo ruim faz o equipamento reiniciar. Canal e DHCP não desligam o AP, e A–A ou B–B funcionam igualmente.",
      "topic": "PoE",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q1.6.7",
      "question": "Qual é a diferença entre os padrões T568A e T568B?",
      "options": [
        "Os pares azul e marrom trocam de posição; laranja e verde ficam nos mesmos pinos",
        "T568B usa os quatro pares e T568A usa apenas dois",
        "T568A é para cabo Cat5e e T568B é para Cat6",
        "Os pares laranja e verde trocam de posição; azul e marrom ficam nos mesmos pinos"
      ],
      "answer": 3,
      "explanation": "Os dois padrões são eletricamente equivalentes e usam os mesmos 8 fios; só os pares laranja e verde mudam de lugar. O padrão não depende da categoria do cabo.",
      "topic": "T568A/T568B",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q1.6.8",
      "question": "Um cabo com o par marrom rompido dá link a 100 Mbps, mas não a 1 Gbps. Por quê?",
      "options": [
        "10/100 Mbps usa só os pinos 1, 2, 3 e 6, enquanto 1000BASE-T precisa dos quatro pares",
        "O par marrom transporta a energia PoE que o 1 Gbps exige",
        "O par marrom é o único que tem trançado, e sem ele a interferência limita a velocidade",
        "O switch reduz a velocidade de propósito para economizar energia quando falta um par"
      ],
      "answer": 0,
      "explanation": "Em 10/100 Mbps os pares azul e marrom não são usados, então o link sobe. 1 Gbps transmite pelos quatro pares e não funciona com um deles rompido.",
      "topic": "pares e velocidade",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.6.2",
      "front": "O que é patch panel?",
      "back": "Painel no rack onde os cabos horizontais terminam de forma organizada e identificada.",
      "tags": [
        "rack",
        "patch panel"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.4",
      "front": "Por que 'deu link' não basta?",
      "back": "Porque o cabo pode ter link, mas negociar velocidade menor, gerar erros ou falhar sob carga.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.6.6",
      "front": "O que PoE adiciona ao cabeamento?",
      "back": "Além de dados, a porta fornece energia para dispositivos como APs, câmeras e telefones IP.",
      "tags": [
        "PoE"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.7",
      "front": "Ordem dos fios no T568B (pinos 1 a 8)?",
      "back": "Branco-laranja, laranja, branco-verde, azul, branco-azul, verde, branco-marrom, marrom. No T568A, laranja e verde trocam de lugar.",
      "tags": [
        "T568B"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.8",
      "front": "Qual é o limite de comprimento de um canal de par trançado?",
      "back": "100 m: até 90 m de cabo horizontal fixo mais até 10 m somados de patch cords.",
      "tags": [
        "distância"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.6.9",
      "front": "O que é par dividido (split pair) e por que o testador de continuidade não pega?",
      "back": "Os fios de um sinal estão em pares diferentes; cada pino chega ao pino certo, então a continuidade passa, mas o trançado não cancela ruído e surgem erros. Só a certificação (diafonia) detecta.",
      "tags": [
        "certificação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc1.6.10",
      "front": "O que é Auto-MDI-X?",
      "back": "Recurso da porta que detecta se transmissão e recepção precisam ser cruzadas e corrige sozinho, dispensando o cabo crossover.",
      "tags": [
        "crossover"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex1.6.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre patch cord, cabo horizontal e patch panel.",
      "expectedAnswer": "Patch cord é o cabo flexível de conexão; cabo horizontal é o trecho instalado entre tomada e rack; patch panel é o painel onde esses cabos terminam no rack.",
      "explanation": "Separar componentes evita tratar todo problema físico como 'o cabo'."
    },
    {
      "id": "ex1.6.2",
      "type": "diagnóstico",
      "prompt": "Uma porta aparece como connected, mas com muitos CRC errors. Liste três hipóteses.",
      "expectedAnswer": "Cabo danificado, conector ruim, interferência, porta com problema ou patch cord inadequado.",
      "explanation": "CRC errors são indícios físicos/enlace e merecem investigação de cabo, porta e ambiente."
    },
    {
      "id": "ex1.6.5",
      "type": "pinagem",
      "prompt": "Uma ponta de um cabo está em T568B. Na outra, a ordem dos fios do pino 1 ao 8 é: branco-verde, verde, branco-laranja, azul, branco-azul, laranja, branco-marrom, marrom. Que padrão é essa ponta, que tipo de cabo resulta e o que você faz com ele num ambiente que padronizou T568B?",
      "expectedAnswer": "A outra ponta está em T568A, então o cabo é cruzado (crossover). Com Auto-MDI-X ele provavelmente funciona, mas foge do padrão documentado: refaça a ponta em T568B para ter um cabo direto B–B.",
      "explanation": "Pino 1 branco-verde identifica T568A. Funcionar não basta: um cabo fora do padrão confunde a manutenção e o próximo diagnóstico."
    },
    {
      "id": "ex1.6.6",
      "type": "cálculo",
      "prompt": "Um AP fica a 95 m de cabo horizontal do rack. Ele usa 2 m de patch cord no teto e 2 m no rack. O canal está dentro do padrão? Se não estiver, que alternativas você propõe?",
      "expectedAnswer": "Não. O canal tem 99 m no total, mas o cabo horizontal passa do limite de 90 m para o trecho fixo. Alternativas: reposicionar o AP para encurtar o trecho horizontal ou instalar um switch de acesso mais perto (com uplink adequado, por exemplo em fibra).",
      "explanation": "O limite de 100 m é do canal inteiro, com no máximo 90 m de cabo fixo. Fora dele a atenuação aumenta e surgem erros, velocidade menor ou falha de PoE."
    }
  ],
  "challenge": {
    "title": "Organizar o cabeamento de uma pequena empresa",
    "scenario": "Uma empresa com 20 usuários, 3 APs, 6 câmeras IP e 2 impressoras usa cabos improvisados. O dono quer reduzir quedas e melhorar segurança sem gastar com datacenter completo.",
    "tasks": [
      "Propor organização de rack e patch panel.",
      "Escolher a categoria de cabo e conferir se os pontos respeitam o limite de 100 m por canal.",
      "Criar padrão de identificação de tomadas e definir o padrão de terminação (T568A ou T568B).",
      "Definir quais portas devem usar PoE e estimar o orçamento PoE.",
      "Indicar controles para portas ociosas e áreas públicas.",
      "Criar plano mínimo de validação e documentação."
    ],
    "constraints": [
      "Usar infraestrutura simples e de baixo custo.",
      "Evitar desconexões durante horário comercial.",
      "Separar visitantes/câmeras da rede administrativa quando o conteúdo futuro de VLAN for estudado.",
      "Não expor documentação sensível fora da equipe autorizada."
    ],
    "expectedDeliverables": [
      "Tabela de pontos",
      "Mapa físico simplificado",
      "Lista de portas PoE",
      "Checklist de segurança física",
      "Plano de teste e rollback"
    ],
    "gradingRubric": [
      {
        "criterion": "Rastreabilidade",
        "points": 25,
        "description": "Pontos, patch panel e portas de switch conseguem ser correlacionados."
      },
      {
        "criterion": "Operação",
        "points": 25,
        "description": "O plano reduz erro humano e facilita manutenção."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Portas ociosas, áreas públicas e racks foram tratados."
      },
      {
        "criterion": "Validação",
        "points": 25,
        "description": "Há testes de link, velocidade, PoE e documentação."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O problema não é apenas trocar cabos. Primeiro identificamos os tipos de ponto, depois organizamos terminação no rack, criamos padrão de identificação, definimos PoE e tratamos riscos físicos.",
    "steps": [
      "Listar todos os pontos necessários e separar usuários, APs, câmeras e impressoras.",
      "Escolher a categoria (Cat6 cobre 1 Gbps com folga; Cat6A se houver plano de 10 Gbps) e medir as distâncias até o rack.",
      "Criar padrão de etiquetas por sala e número e adotar um único padrão de terminação.",
      "Terminar cabos horizontais em patch panel.",
      "Ligar patch panel ao switch com patch cords curtos e organizados.",
      "Dimensionar PoE para APs e câmeras somando o consumo de cada um.",
      "Desativar portas ociosas e proteger áreas públicas.",
      "Validar link, velocidade, PoE e documentação."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Comprar um switch maior e deixar os cabos soltos.",
        "whyItIsWrong": "Aumenta portas, mas não resolve rastreabilidade, segurança física nem manutenção."
      },
      {
        "answer": "Ativar todas as tomadas para facilitar.",
        "whyItIsWrong": "Conveniência aumenta superfície de acesso físico indevido."
      },
      {
        "answer": "Não documentar para evitar vazamento.",
        "whyItIsWrong": "Documentação deve ser protegida, não eliminada; sem ela a operação e resposta a incidentes pioram."
      }
    ],
    "finalAnswer": "Uma solução adequada cria rack organizado com patch panel, cabo de categoria compatível (Cat6 ou superior) dentro de 100 m por canal, padrão de identificação por sala/ponto, um único padrão de terminação, portas PoE dimensionadas para APs e câmeras, portas ociosas desativadas, controle físico do rack e inventário que correlaciona tomada, patch panel, switch, VLAN futura e responsável. A validação inclui link, velocidade, PoE, ausência de erros físicos e revisão de documentação."
  },
  "glossary": [
    {
      "term": "Cabeamento estruturado",
      "shortDefinition": "Infraestrutura física padronizada para rede.",
      "longDefinition": "Conjunto de práticas, componentes e documentação usados para organizar cabos, tomadas, patch panels, racks e caminhos de telecomunicações.",
      "example": "Tomada 2A-034 terminada no patch panel PP1 porta 34 e conectada ao switch SW-AC-01 porta 18.",
      "relatedTerms": [
        "patch panel",
        "rack",
        "RJ-45"
      ]
    },
    {
      "term": "RJ-45",
      "shortDefinition": "Nome comum do conector usado em Ethernet de par trançado.",
      "longDefinition": "Nome popular do conector modular de oito posições e oito contatos (8P8C) usado no cabeamento Ethernet de cobre.",
      "example": "Patch cord Ethernet com conectores RJ-45 nas duas pontas.",
      "relatedTerms": [
        "T568A",
        "T568B",
        "Ethernet"
      ]
    },
    {
      "term": "Patch panel",
      "shortDefinition": "Painel de terminação de cabos no rack.",
      "longDefinition": "Componente passivo onde cabos horizontais terminam e podem ser conectados ao switch por patch cords.",
      "example": "A tomada da sala financeira termina no patch panel e é ligada ao switch por patch cord.",
      "relatedTerms": [
        "rack",
        "patch cord",
        "cabo horizontal"
      ]
    },
    {
      "term": "T568A/T568B",
      "shortDefinition": "Padrões de ordem dos fios no conector.",
      "longDefinition": "Duas ordens padronizadas dos 8 fios nos pinos do conector. São eletricamente equivalentes; só os pares laranja e verde trocam de lugar. O ponto central é adotar um padrão consistente e documentado.",
      "example": "Um cabo direto comum usa o mesmo padrão nas duas pontas.",
      "relatedTerms": [
        "pinagem",
        "RJ-45"
      ]
    },
    {
      "term": "PoE",
      "shortDefinition": "Energia elétrica entregue pelo cabo de rede.",
      "longDefinition": "Power over Ethernet permite alimentar APs, telefones IP e câmeras pelo mesmo cabo usado para dados. Padrões IEEE 802.3af (até 15,4 W por porta), 802.3at (até 30 W) e 802.3bt (até 60 W ou 90 W).",
      "example": "Um access point no teto recebe dados e energia pela porta PoE do switch.",
      "relatedTerms": [
        "switch",
        "AP",
        "câmera IP"
      ]
    },
    {
      "term": "Cabo horizontal",
      "shortDefinition": "Trecho fixo entre tomada e sala de telecomunicações.",
      "longDefinition": "Cabo instalado na infraestrutura do prédio, normalmente entre ponto de telecomunicações da área de trabalho e patch panel no rack.",
      "example": "O cabo dentro da parede que liga a tomada de rede ao patch panel.",
      "relatedTerms": [
        "tomada",
        "keystone",
        "patch panel"
      ]
    },
    {
      "term": "Patch cord",
      "shortDefinition": "Cabo flexível e curto com conectores nas duas pontas.",
      "longDefinition": "Liga o equipamento à tomada na área de trabalho, ou a porta do patch panel à porta do switch no rack. Os patch cords somados entram no limite de 10 m do canal.",
      "example": "Patch cord de 1,5 m entre o patch panel PP1 porta 34 e o switch SW-AC-01 porta 18.",
      "relatedTerms": [
        "patch panel",
        "cabo horizontal"
      ]
    },
    {
      "term": "Certificação de cabo",
      "shortDefinition": "Teste que mede se o ponto atende aos limites da categoria.",
      "longDefinition": "Feita com certificador, mede comprimento, perda, diafonia (NEXT) e perda de retorno. Vai além do teste de continuidade, que só confere se cada fio chega ao pino certo.",
      "example": "Um ponto passa no testador de continuidade, mas reprova na certificação por diafonia causada por par dividido.",
      "relatedTerms": [
        "categoria",
        "par dividido"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "ANSI/TIA-568 (série de normas de cabeamento de telecomunicações)",
      "organization": "TIA",
      "url": "",
      "note": "Norma de cabeamento estruturado; define os padrões de terminação T568A/T568B, categorias e limites de distância."
    },
    {
      "type": "standard",
      "title": "IEEE 802.3 Ethernet",
      "organization": "IEEE",
      "url": "",
      "note": "Padrão Ethernet: 10/100/1000BASE-T, 10GBASE-T e PoE (802.3af/at/bt)."
    },
    {
      "type": "internal-course",
      "title": "Meios de transmissão: cobre, fibra e rádio",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula 1.5 deste curso."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "infraestrutura física e ambientes",
      "reason": "Racks, energia, cabeamento e mudança física impactam plataformas e pipelines."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m00",
      "lesson": "controle de acesso físico e lógico",
      "reason": "Portas físicas e autenticação de rede se conectam a identidade, autorização e Zero Trust."
    }
  ],
  "progressRules": {
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "labMarkedDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "1.7"
    ]
  }
};
