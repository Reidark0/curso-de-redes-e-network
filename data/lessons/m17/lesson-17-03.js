export const lesson1703 = {
  "id": "17.3",
  "moduleId": "m17",
  "order": 3,
  "title": "Simulado I: Fundamentos, OSI, Ethernet e IPv4",
  "subtitle": "Avaliação comentada para revisar os fundamentos que sustentam todo o curso: camadas, encapsulamento, Ethernet, VLAN, ARP, IPv4, CIDR, gateway, rotas e ICMP.",
  "duration": "180-260 min",
  "estimatedStudyTimeMinutes": 260,
  "difficulty": "intermediário-avançado",
  "type": "simulado",
  "xp": 260,
  "tags": [
    "simulado",
    "fundamentos",
    "OSI",
    "TCP/IP",
    "Ethernet",
    "VLAN",
    "ARP",
    "IPv4",
    "CIDR",
    "gateway",
    "ICMP",
    "troubleshooting",
    "revisão",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão",
    "relatório de lacunas",
    "simulado por bloco"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.1",
      "reason": "A aula 17.1 ensina o método de revisão profissional usado para corrigir o simulado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.2",
      "reason": "O mapa mental da aula 17.2 ajuda a localizar lacunas do simulado."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting profissional orienta a análise de evidências nas questões de cenário."
    }
  ],
  "objectives": [
    "Avaliar domínio de Fundamentos, OSI, Ethernet e IPv4.",
    "Identificar lacunas em camadas, encapsulamento, VLAN, ARP, CIDR, gateway e ICMP.",
    "Praticar interpretação de cenários em vez de memorização isolada.",
    "Transformar erros em plano de revisão e laboratório.",
    "Preparar a base para os simulados II, III e IV.",
    "Criar um registro de evolução para portfólio de estudos."
  ],
  "learningOutcomes": [
    "Dado um par origem-destino, o aluno decide se o tráfego é local ou remoto.",
    "Dado um sintoma, o aluno diferencia hipótese de camada física, L2 e L3.",
    "Dado um cenário de VLAN, o aluno identifica impacto de access, trunk e domínio de broadcast.",
    "Dado um endereço IPv4 com máscara, o aluno interpreta rede, gateway e decisão de roteamento.",
    "Dado um erro no simulado, o aluno registra lacuna, causa e ação de revisão.",
    "Dado um resultado de ICMP, o aluno interpreta com cautela e busca evidências complementares."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Esta aula existe para verificar se os fundamentos realmente viraram raciocínio. O aluno pode ter lido sobre modelo OSI, Ethernet, ARP, IPv4, CIDR e gateway, mas a prova profissional é conseguir usar esses conceitos para explicar um fluxo, diagnosticar uma falha e justificar uma decisão técnica.</p>\n  <p>O Simulado I cobre a base que sustenta todos os módulos posteriores. Cloud Networking, VPN, firewall, Kubernetes, Wi-Fi corporativo e threat hunting parecem assuntos avançados, mas quebram quando o profissional não domina endereço MAC, VLAN, broadcast, máscara, gateway, rota e ICMP.</p>\n  <p>Este simulado não é uma lista de pegadinhas. Ele é um instrumento de diagnóstico. Cada erro deve virar uma lacuna registrada, uma revisão direcionada e, se necessário, um mini laboratório.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> fundamentos fracos produzem diagnósticos frágeis. O objetivo do simulado é revelar lacunas antes que elas apareçam em incidentes reais.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>A avaliação de redes sempre acompanhou a evolução da própria área. Em redes locais antigas, o foco era cabo, hub, colisão e endereçamento. Com switches, VLANs e roteadores, passou a ser necessário entender domínios de broadcast, tabelas MAC, ARP e roteamento. Com cloud, os mesmos fundamentos continuam presentes, mas aparecem como subnets, route tables, security groups e flow logs.</p>\n  <p>Por isso, simulados de fundamentos não são apenas preparação acadêmica. Eles representam a forma como entrevistas, certificações, troubleshooting e revisão de incidentes testam se o profissional sabe raciocinar sobre a base.</p>\n  <ul>\n    <li><strong>Camada física:</strong> sinal, cabo, RF, transceiver, speed, duplex e erros.</li>\n    <li><strong>Camada de enlace:</strong> quadro Ethernet, MAC, switch, VLAN, trunk e ARP.</li>\n    <li><strong>Camada de rede:</strong> IPv4, CIDR, gateway, rota e ICMP.</li>\n    <li><strong>Operação:</strong> usar evidências para separar falha física, L2 e L3.</li>\n  </ul>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema mais comum em redes é pular a base. Um profissional vê “não acessa o sistema” e imediatamente suspeita de firewall, DNS ou aplicação. Mas, se o host não tem IP correto, se a VLAN está errada, se o gateway não responde ARP, se a máscara coloca o destino na rede errada ou se a rota de retorno não existe, nenhuma camada superior vai funcionar direito.</p>\n  <p>Outro problema é decorar respostas. Saber que “camada 2 usa MAC” é pouco. O profissional precisa saber o que isso significa em uma rede com switch, VLAN, ARP, gateway e broadcast. Saber que “ping usa ICMP” é pouco. É preciso interpretar sucesso, falha, filtragem e assimetria.</p>\n  <ul>\n    <li><strong>Erro de diagnóstico:</strong> tratar todo timeout como firewall.</li>\n    <li><strong>Erro conceitual:</strong> confundir VLAN com subnet.</li>\n    <li><strong>Erro operacional:</strong> testar sem registrar origem, destino, horário e evidência.</li>\n    <li><strong>Erro de arquitetura:</strong> desenhar cloud sem plano CIDR e sem rota de retorno.</li>\n    <li><strong>Erro de segurança:</strong> liberar tráfego amplo para “ver se funciona”.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A forma correta de revisar fundamentos evolui em quatro fases. Primeiro, o aluno reconhece termos. Depois, explica funcionamento. Em seguida, aplica em cenários. Por fim, diagnostica falhas com evidências. Este simulado foi desenhado para empurrar o aluno da memorização para a aplicação.</p>\n  <p>As questões misturam conceitos e cenários porque redes reais não perguntam de forma isolada. Um problema de IPv4 pode envolver ARP. Um problema de VLAN pode aparecer como falha de DHCP. Um problema de máscara pode parecer problema de roteamento. Um problema físico pode se manifestar como retransmissão, perda ou oscilação.</p>\n  <div class=\"callout callout--success\"><strong>Como usar o simulado:</strong> responda, corrija, classifique o erro, revise o conceito e transforme a lacuna em exercício prático.</div>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p>Um simulado profissional é um mecanismo de calibração. Ele mede domínio técnico, qualidade do raciocínio e capacidade de justificar decisões. Nesta aula, o foco é Fundamentos, OSI, Ethernet e IPv4. Isso inclui não apenas nomes de camadas, mas como dados são encapsulados, encaminhados, endereçados e diagnosticados.</p>\n  <p>O modelo OSI será usado como mapa didático, não como dogma. Na prática, o profissional combina OSI, TCP/IP, evidências de sistema operacional, logs de switch, tabela ARP, tabela MAC, tabela de rotas e captura de pacotes.</p>\n  <ul>\n    <li><strong>Fundamento:</strong> conceito que aparece em muitos cenários diferentes.</li>\n    <li><strong>Questão de cenário:</strong> pergunta que exige aplicar conceito em uma situação operacional.</li>\n    <li><strong>Distrator:</strong> alternativa plausível para quem decorou, mas não entendeu.</li>\n    <li><strong>Comentário:</strong> explicação que transforma erro em aprendizado.</li>\n    <li><strong>Lacuna:</strong> tema que precisa voltar para revisão ou laboratório.</li>\n  </ul>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Internamente, o simulado testa três competências. A primeira é identificação: reconhecer em qual camada ou componente o problema provavelmente está. A segunda é causalidade: explicar por que uma configuração ou falha produz determinado sintoma. A terceira é evidência: apontar que dado confirmaria ou negaria a hipótese.</p>\n  <p>Uma boa questão não pergunta apenas “qual é a camada?”. Ela pergunta o que acontece quando um host precisa falar com outro host na mesma subnet, quando precisa falar com outra rede, quando o ARP falha, quando a máscara está incorreta, quando uma VLAN não está permitida em trunk ou quando o gateway está errado.</p>\n  <ul>\n    <li><strong>Identificação:</strong> localizar camada, protocolo ou componente.</li>\n    <li><strong>Causalidade:</strong> conectar causa técnica e sintoma observado.</li>\n    <li><strong>Evidência:</strong> definir o que provaria a hipótese.</li>\n    <li><strong>Correção:</strong> propor ação segura, específica e reversível.</li>\n    <li><strong>Reteste:</strong> verificar se a ação resolveu sem criar novo problema.</li>\n  </ul>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>A arquitetura do simulado está dividida em quatro blocos. O primeiro revisa modelos e encapsulamento. O segundo revisa Ethernet, MAC, switches, VLANs e ARP. O terceiro revisa IPv4, CIDR, gateway, rotas e ICMP. O quarto revisa troubleshooting básico com evidências.</p>\n  <p>Cada bloco contém questões com alternativas comentadas. O aluno deve responder sem consultar material, marcar confiança alta, média ou baixa, corrigir com calma e registrar lacunas. A pontuação importa menos que a qualidade do pós-simulado.</p>\n  <ul>\n    <li><strong>Bloco A:</strong> fundamentos, OSI, TCP/IP e encapsulamento.</li>\n    <li><strong>Bloco B:</strong> Ethernet, MAC, switching, VLAN, trunk e ARP.</li>\n    <li><strong>Bloco C:</strong> IPv4, CIDR, gateway, rotas e ICMP.</li>\n    <li><strong>Bloco D:</strong> cenários de diagnóstico e evidências.</li>\n    <li><strong>Bloco E:</strong> plano de revisão depois da correção.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Imagine uma cidade. O endereço IP é o endereço da casa em uma região. A máscara define o bairro. O gateway é a saída do bairro para outras regiões. O endereço MAC é a identificação local usada dentro da rua ou condomínio. A VLAN é como um condomínio separado usando a mesma infraestrutura física. O switch é o porteiro que sabe em qual porta cada morador está. O roteador é a avenida que conecta bairros diferentes.</p>\n  <p>O simulado é como dirigir por essa cidade sem GPS automático. Você precisa saber quando o destino está no mesmo bairro, quando precisa sair pelo gateway, quando perguntar “quem tem este endereço?” via ARP e quando suspeitar que a rua, o porteiro, a saída do bairro ou a rota estão errados.</p>\n  <div class=\"callout callout--info\"><strong>Analogia útil:</strong> L2 entrega dentro do bairro; L3 decide caminhos entre bairros. ARP encontra o endereço local necessário para dar o próximo passo.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Um computador tem IP 192.168.10.20/24 e gateway 192.168.10.1. Ele precisa acessar 192.168.10.50. Como o destino está na mesma subnet, o computador não envia o quadro ao gateway. Ele usa ARP para descobrir o MAC de 192.168.10.50 e envia diretamente no domínio local.</p>\n  <p>Agora o mesmo computador precisa acessar 8.8.8.8. O destino não está na subnet local. O computador usa ARP para descobrir o MAC do gateway 192.168.10.1 e envia o quadro ao gateway. O pacote IP continua destinado a 8.8.8.8, mas o quadro Ethernet local vai para o MAC do gateway.</p>\n  <ul>\n    <li><strong>Mesmo /24:</strong> ARP para o destino.</li>\n    <li><strong>Fora do /24:</strong> ARP para o gateway.</li>\n    <li><strong>Gateway errado:</strong> o host pode até ter IP, mas não sai da rede local.</li>\n    <li><strong>Máscara errada:</strong> o host pode tentar entregar localmente algo que deveria ir ao gateway.</li>\n    <li><strong>ARP falhando:</strong> pode indicar L2, VLAN, host desligado, firewall local ou gateway inacessível.</li>\n  </ul>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, usuários da VLAN 20 reclamam que não acessam um sistema interno. A aplicação está online. O DNS resolve corretamente. O firewall não registra bloqueio. A investigação mostra que a VLAN 20 não foi permitida no trunk entre o switch de acesso e o switch de distribuição após uma mudança. O sintoma parecia aplicação, mas a causa era camada 2.</p>\n  <p>Outro caso: uma nova rede de câmeras foi configurada como 10.30.0.0/16, mas o plano corporativo previa 10.30.10.0/24. Alguns equipamentos passam a considerar destinos remotos como locais, fazem ARP indevido e não chegam ao gateway. O problema parece intermitente, mas a causa é máscara e plano de endereçamento.</p>\n  <div class=\"callout callout--warning\"><strong>Lição empresarial:</strong> mudanças em VLAN, trunk, máscara e gateway devem ser tratadas como mudanças críticas, com evidência, rollback e validação.</div>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, os fundamentos aparecem com nomes diferentes. A VPC ou VNet é a rede lógica. A subnet tem CIDR. A route table decide o próximo salto. Security groups e NSGs controlam tráfego. Flow logs fornecem evidências. Um problema de conectividade entre uma VM e um banco privado pode envolver CIDR, rota, DNS privado, política de segurança e retorno.</p>\n  <p>Se um workload está em uma subnet privada e precisa acessar a internet, ele provavelmente depende de rota para NAT Gateway ou solução equivalente. Se a rota default aponta para o alvo errado, se o NAT não existe na zona correta ou se o security group bloqueia egress, a falha se manifesta como timeout, mesmo que a aplicação esteja saudável.</p>\n  <ul>\n    <li><strong>CIDR cloud:</strong> equivalente ao plano IPv4 da rede virtual.</li>\n    <li><strong>Route table:</strong> equivalente lógico das decisões de roteamento.</li>\n    <li><strong>Security group/NSG:</strong> controle de fluxo próximo ao workload.</li>\n    <li><strong>Flow log:</strong> evidência de accept/reject e metadados de fluxo.</li>\n    <li><strong>Private endpoint:</strong> depende fortemente de DNS privado e rota correta.</li>\n  </ul>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, fundamentos de rede viram testes e guardrails. Um pipeline pode validar se subnets não se sobrepõem, se uma rota default não foi criada em subnet sensível, se uma porta administrativa não foi exposta, se security groups não aceitam origem ampla e se tags de dono e ambiente existem.</p>\n  <p>Também é possível transformar o simulado em qualidade de engenharia: cada erro frequente vira checklist, teste de IaC, documentação ou módulo reutilizável. Se a equipe sempre erra CIDR, o pipeline deve validar CIDR. Se sempre esquece DNS privado, o módulo de private endpoint deve criar zona e vínculo automaticamente.</p>\n  <ul>\n    <li><strong>Teste de CIDR:</strong> bloquear sobreposição antes do merge.</li>\n    <li><strong>Teste de exposição:</strong> rejeitar portas administrativas públicas.</li>\n    <li><strong>Teste de rota:</strong> exigir revisão para 0.0.0.0/0.</li>\n    <li><strong>Teste de tags:</strong> exigir dono, criticidade, ambiente e custo.</li>\n    <li><strong>Teste de logs:</strong> garantir flow logs em redes críticas.</li>\n  </ul>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, fundamentos evitam conclusões erradas. Um alerta de movimento lateral pode ser tráfego legítimo de backup. Um volume incomum pode ser atualização. Um bloqueio de firewall pode parecer ataque, mas ser rota assimétrica. O analista precisa entender ARP, VLAN, IP, rota, TCP, ICMP e logs para separar incidente de ruído.</p>\n  <p>O Simulado I prepara essa base. Antes de falar em C2, exfiltração, DLP e DFIR, o aluno precisa interpretar origem, destino, porta, protocolo, subnet, gateway e caminho. Segurança de rede é defesa baseada em fluxo e evidência.</p>\n  <div class=\"callout callout--danger\"><strong>Má prática:</strong> alterar firewall, VLAN ou rota durante investigação sem escopo, evidência, dono, janela e rollback.</div>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama abaixo resume o escopo do Simulado I: modelos, Ethernet, IPv4 e evidências básicas de troubleshooting.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Diagrama do Simulado I de fundamentos, OSI, Ethernet e IPv4\">\n    <svg viewBox=\"0 0 1100 560\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-17-3-content-diagram-1-title svg-17-3-content-diagram-1-desc\">\n      <title id=\"svg-17-3-content-diagram-1-title\">Simulado I: Fundamentos, OSI, Ethernet e IPv4</title>\n      <desc id=\"svg-17-3-content-diagram-1-desc\">Diagrama pedagógico da aula 17.3, Simulado I: Fundamentos, OSI, Ethernet e IPv4, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-1703\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n          <path d=\"M0,0 L0,6 L9,3 z\"></path>\n        </marker>\n      </defs>\n      <rect class=\"svg-panel\" x=\"30\" y=\"30\" width=\"1040\" height=\"500\" rx=\"24\"></rect>\n      <text class=\"svg-title\" x=\"550\" y=\"75\" text-anchor=\"middle\">Simulado I — Fundamentos, OSI, Ethernet e IPv4</text>\n\n      <g class=\"svg-node\">\n        <rect x=\"70\" y=\"130\" width=\"180\" height=\"90\" rx=\"16\"></rect>\n        <text x=\"160\" y=\"165\" text-anchor=\"middle\">Fundamentos</text>\n        <text x=\"160\" y=\"190\" text-anchor=\"middle\">bits, sinal, MTU</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"300\" y=\"130\" width=\"180\" height=\"90\" rx=\"16\"></rect>\n        <text x=\"390\" y=\"165\" text-anchor=\"middle\">Modelos</text>\n        <text x=\"390\" y=\"190\" text-anchor=\"middle\">OSI e TCP/IP</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"530\" y=\"130\" width=\"180\" height=\"90\" rx=\"16\"></rect>\n        <text x=\"620\" y=\"165\" text-anchor=\"middle\">Ethernet</text>\n        <text x=\"620\" y=\"190\" text-anchor=\"middle\">MAC, VLAN, ARP</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"760\" y=\"130\" width=\"180\" height=\"90\" rx=\"16\"></rect>\n        <text x=\"850\" y=\"165\" text-anchor=\"middle\">IPv4</text>\n        <text x=\"850\" y=\"190\" text-anchor=\"middle\">CIDR, gateway, rota</text>\n      </g>\n\n      <g class=\"svg-node svg-node--accent\">\n        <rect x=\"185\" y=\"310\" width=\"210\" height=\"100\" rx=\"16\"></rect>\n        <text x=\"290\" y=\"345\" text-anchor=\"middle\">Sintoma</text>\n        <text x=\"290\" y=\"370\" text-anchor=\"middle\">não acessa, perda, timeout</text>\n      </g>\n      <g class=\"svg-node svg-node--accent\">\n        <rect x=\"445\" y=\"310\" width=\"210\" height=\"100\" rx=\"16\"></rect>\n        <text x=\"550\" y=\"345\" text-anchor=\"middle\">Evidência</text>\n        <text x=\"550\" y=\"370\" text-anchor=\"middle\">ARP, MAC, rota, ICMP</text>\n      </g>\n      <g class=\"svg-node svg-node--accent\">\n        <rect x=\"705\" y=\"310\" width=\"210\" height=\"100\" rx=\"16\"></rect>\n        <text x=\"810\" y=\"345\" text-anchor=\"middle\">Lacuna</text>\n        <text x=\"810\" y=\"370\" text-anchor=\"middle\">revisão e laboratório</text>\n      </g>\n\n      <path class=\"svg-arrow\" d=\"M250 175 H300\" marker-end=\"url(#arrow-1703)\"></path>\n      <path class=\"svg-arrow\" d=\"M480 175 H530\" marker-end=\"url(#arrow-1703)\"></path>\n      <path class=\"svg-arrow\" d=\"M710 175 H760\" marker-end=\"url(#arrow-1703)\"></path>\n      <path class=\"svg-arrow\" d=\"M850 220 C850 270 810 285 810 310\" marker-end=\"url(#arrow-1703)\"></path>\n      <path class=\"svg-arrow\" d=\"M705 360 H655\" marker-end=\"url(#arrow-1703)\"></path>\n      <path class=\"svg-arrow\" d=\"M445 360 H395\" marker-end=\"url(#arrow-1703)\"></path>\n      <path class=\"svg-arrow\" d=\"M290 310 C250 260 180 245 160 220\" marker-end=\"url(#arrow-1703)\"></path>\n\n      <text class=\"svg-caption\" x=\"550\" y=\"470\" text-anchor=\"middle\">Responder → corrigir → classificar lacuna → revisar → praticar → retestar</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam raciocínio por camadas, decisão local/remoto, ARP, VLAN, gateway e evidência. Eles devem ser feitos depois do simulado para consolidar os pontos que mais geram erro.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio é transformar o resultado do simulado em um plano de revisão de 7 dias, com lacunas priorizadas, exercícios práticos e critérios de reteste.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada apresenta o método de correção esperado: não basta saber a alternativa correta; é preciso entender por que as outras alternativas são distratores e qual evidência técnica resolveria o cenário.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>O Simulado I revisa a base: Fundamentos, OSI, Ethernet e IPv4. Esses temas sustentam tudo que vem depois: DNS, TCP/UDP, firewalls, cloud, VPN, troubleshooting, segurança e DFIR.</p>\n  <p>A melhor pontuação não é apenas acertar muito. É transformar erros em lacunas claras, lacunas em revisão e revisão em prática. Um profissional maduro não esconde lacunas; ele cria um sistema para eliminá-las.</p>\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C01</td><td>Fundamentos, OSI e encapsulamento</td><td>70%</td><td>90%</td><td>explica fluxo de dados por camadas e reconhece onde cada evidência aparece</td></tr><tr><td>C02</td><td>Ethernet, ARP, VLAN, switching e camada 2</td><td>70%</td><td>90%</td><td>diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast</td></tr><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, o aluno fará o Simulado II: Subnetting, TCP/UDP, DNS, DHCP e NAT. Ele avançará da base Ethernet/IPv4 para os serviços e protocolos que aparecem em quase todo incidente corporativo.</p>\n</section>"
  },
  "exercises": [
    {
      "title": "Decisão local ou remota",
      "prompt": "Para os pares 10.10.5.20/24 → 10.10.5.80 e 10.10.5.20/24 → 10.10.8.80, diga quando o host usa ARP para o destino e quando usa ARP para o gateway.",
      "difficulty": "básico-intermediário",
      "expectedAnswer": "Mesmo /24 usa ARP para o destino; fora do /24 usa ARP para o gateway."
    },
    {
      "title": "VLAN versus subnet",
      "prompt": "Explique em até cinco linhas por que VLAN e subnet costumam andar juntas, mas não são o mesmo conceito.",
      "difficulty": "intermediário",
      "expectedAnswer": "VLAN segmenta camada 2/domínio de broadcast; subnet organiza endereçamento camada 3. Frequentemente uma subnet é associada a uma VLAN, mas são camadas diferentes."
    },
    {
      "title": "Evidência de gateway",
      "prompt": "Liste quatro evidências para investigar um host que tem IP, mas não acessa nada fora da rede local.",
      "difficulty": "intermediário",
      "expectedAnswer": "IP/máscara/gateway, ARP do gateway, ping ao gateway, tabela de rotas, VLAN da porta, logs de switch ou captura local."
    },
    {
      "title": "ICMP com cautela",
      "prompt": "Explique por que ping com falha não deve ser tratado automaticamente como destino fora do ar.",
      "difficulty": "intermediário",
      "expectedAnswer": "ICMP pode ser bloqueado, limitado ou roteado de forma diferente. É necessário correlacionar com TCP, logs, ARP, rota e firewall."
    },
    {
      "id": "ex17.3.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C01, C02, C03, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "quiz": [
    {
      "id": "q17.3.01",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um host 192.168.10.20/24 precisa acessar 192.168.10.50. Qual endereço MAC ele precisa descobrir primeiro?",
      "opts": [
        "MAC do gateway padrão",
        "MAC do destino 192.168.10.50",
        "MAC do servidor DNS",
        "MAC do roteador da internet"
      ],
      "a": 1,
      "exp": "Como o destino está na mesma subnet /24, o host usa ARP para descobrir o MAC do próprio destino, não do gateway.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.02",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um host 192.168.10.20/24 precisa acessar 10.0.0.10. Para qual MAC o primeiro quadro Ethernet deve ser enviado?",
      "opts": [
        "MAC do destino 10.0.0.10",
        "MAC de broadcast",
        "MAC do gateway padrão",
        "MAC do servidor DHCP"
      ],
      "a": 2,
      "exp": "Como 10.0.0.10 está fora da subnet local, o pacote IP mantém destino 10.0.0.10, mas o quadro Ethernet local vai para o MAC do gateway.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.03",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual afirmação diferencia melhor VLAN e subnet?",
      "opts": [
        "VLAN é camada 3 e subnet é camada 2",
        "VLAN segmenta domínio de broadcast em L2; subnet organiza endereçamento L3",
        "VLAN sempre exige internet e subnet não",
        "VLAN substitui roteador"
      ],
      "a": 1,
      "exp": "VLAN é segmentação lógica de camada 2. Subnet é divisão de endereçamento IP em camada 3. Elas costumam ser mapeadas juntas, mas não são a mesma coisa.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.04",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Uma porta de switch em modo access está na VLAN 30, mas o host deveria estar na VLAN 20. Qual sintoma é provável?",
      "opts": [
        "O host recebe ou tenta usar rede incorreta",
        "O cabo sempre fica fisicamente desconectado",
        "O TCP deixa de existir",
        "O DNS público para de funcionar globalmente"
      ],
      "a": 0,
      "exp": "VLAN errada pode colocar o host no domínio L2 incorreto, causando IP errado via DHCP, gateway errado ou isolamento do serviço esperado.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.05",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual evidência é mais direta para investigar se um switch aprendeu o MAC de um host em uma porta?",
      "opts": [
        "Tabela MAC/CAM do switch",
        "Registro MX do domínio",
        "Certificado TLS",
        "TTL de DNS"
      ],
      "a": 0,
      "exp": "A tabela MAC/CAM mostra quais endereços MAC foram aprendidos em quais portas/VLANs.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.06",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em troubleshooting, por que ping falhar não prova sozinho que o host destino está fora?",
      "opts": [
        "Porque ICMP pode ser filtrado por firewall ou política",
        "Porque ping usa DNS obrigatoriamente",
        "Porque ping só funciona em redes Wi-Fi",
        "Porque ping altera a rota default"
      ],
      "a": 0,
      "exp": "ICMP pode ser bloqueado ou limitado. Falha de ping é evidência útil, mas precisa ser correlacionada com ARP, rota, TCP, logs e política.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.07",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um host com máscara /16 tenta acessar 192.168.20.10, mas o desenho correto era /24 e o destino está em outra VLAN. Qual erro pode ocorrer?",
      "opts": [
        "O host pode tentar ARP local para um destino que deveria ir ao gateway",
        "O host sempre vai usar o servidor DNS como gateway",
        "O switch converte automaticamente /16 em /24",
        "O TCP passa a usar UDP"
      ],
      "a": 0,
      "exp": "Com máscara ampla demais, o host considera destinos como locais e tenta ARP no domínio L2, em vez de enviar ao gateway.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.08",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual camada do modelo OSI é mais associada ao endereçamento IPv4 e roteamento?",
      "opts": [
        "Camada 1",
        "Camada 2",
        "Camada 3",
        "Camada 7"
      ],
      "a": 2,
      "exp": "IPv4 e roteamento são conceitos de camada de rede, geralmente associada à camada 3 do modelo OSI.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.09",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual camada é mais associada a quadros Ethernet e endereços MAC?",
      "opts": [
        "Camada 2",
        "Camada 3",
        "Camada 4",
        "Camada 7"
      ],
      "a": 0,
      "exp": "Ethernet e MAC operam na camada de enlace, normalmente associada à camada 2.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.10",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Uma rota mais específica e uma rota default existem para o mesmo destino. Qual tende a ser escolhida?",
      "opts": [
        "A rota default sempre vence",
        "A rota mais específica vence",
        "A rota mais antiga vence obrigatoriamente",
        "A rota com menor endereço IP sempre vence"
      ],
      "a": 1,
      "exp": "A regra de longest prefix match escolhe a rota com prefixo mais específico para o destino.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.11",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual evidência ajuda a diferenciar falha L2 local de falha de rota remota?",
      "opts": [
        "Tabela ARP e alcance do gateway local",
        "Tamanho do arquivo HTML",
        "Assunto do e-mail",
        "Nome do usuário no navegador"
      ],
      "a": 0,
      "exp": "Se o host não resolve ARP do gateway ou não alcança gateway local, o problema pode estar antes do roteamento remoto.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.12",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual é a melhor postura após errar uma questão do simulado?",
      "opts": [
        "Ignorar para manter motivação",
        "Registrar lacuna, causa do erro, aula relacionada e ação prática de revisão",
        "Trocar a resposta no gabarito",
        "Liberar firewall para testar"
      ],
      "a": 1,
      "exp": "O valor do simulado está no pós-simulado: transformar erro em lacuna tratável e retestável.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.3.13",
      "type": "simulado",
      "domain": "Fundamentos/OSI",
      "q": "Durante uma investigação, um cabo desconectado causa ausência total de link. Em qual camada começa a hipótese mais básica?",
      "opts": [
        "Aplicação",
        "Transporte",
        "Física",
        "Sessão"
      ],
      "a": 2,
      "exp": "Sem link físico, a investigação começa pela camada física antes de subir para IP, DNS ou aplicação.",
      "difficulty": "intermediário",
      "topic": "Fundamentos/OSI"
    },
    {
      "id": "q17.3.14",
      "type": "simulado",
      "domain": "Fundamentos/OSI",
      "q": "Um switch aprende endereços MAC observando qual campo dos quadros?",
      "opts": [
        "MAC de origem",
        "MAC de destino",
        "IP de origem",
        "Porta TCP de origem"
      ],
      "a": 0,
      "exp": "Switches constroem a tabela CAM a partir do MAC de origem visto em cada porta.",
      "difficulty": "intermediário",
      "topic": "Fundamentos/OSI"
    },
    {
      "id": "q17.3.15",
      "type": "simulado",
      "domain": "Ethernet/L2",
      "q": "Dois hosts na mesma VLAN e mesma subnet precisam se comunicar. Qual mecanismo resolve IP para MAC?",
      "opts": [
        "DNS",
        "ARP",
        "DHCP relay",
        "BGP"
      ],
      "a": 1,
      "exp": "Em IPv4 local, ARP descobre o MAC correspondente ao IP de destino ou ao próximo salto local.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2"
    },
    {
      "id": "q17.3.16",
      "type": "simulado",
      "domain": "Ethernet/L2",
      "q": "Uma porta configurada como access na VLAN errada causa qual efeito típico?",
      "opts": [
        "O host recebe IP/gateway de outro domínio lógico",
        "O TLS sempre falha por SAN",
        "O navegador troca GET por POST",
        "O DNS raiz deixa de responder"
      ],
      "a": 0,
      "exp": "VLAN errada coloca o host em outro domínio L2/L3, podendo receber DHCP/gateway incorretos.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2"
    },
    {
      "id": "q17.3.17",
      "type": "simulado",
      "domain": "Ethernet/L2",
      "q": "Qual comando Cisco ajuda a confirmar se uma interface está administrativamente down?",
      "opts": [
        "show ip interface brief",
        "show clock",
        "show version | include uptime",
        "show ntp associations"
      ],
      "a": 0,
      "exp": "show ip interface brief mostra estado físico/protocolo e indica administratively down.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2"
    },
    {
      "id": "q17.3.18",
      "type": "simulado",
      "domain": "IPv4",
      "q": "O que um host faz para decidir se envia ao destino local ou ao gateway?",
      "opts": [
        "Compara IP e máscara para calcular a rede",
        "Consulta sempre o DNS",
        "Abre conexão TCP com o gateway",
        "Lê o certificado TLS"
      ],
      "a": 0,
      "exp": "A decisão local/remoto é feita aplicando a máscara/prefixo ao próprio IP e ao destino.",
      "difficulty": "intermediário",
      "topic": "IPv4"
    },
    {
      "id": "q17.3.19",
      "type": "simulado",
      "domain": "IPv4",
      "q": "Em 192.168.20.77/26, qual é a rede?",
      "opts": [
        "192.168.20.0",
        "192.168.20.64",
        "192.168.20.77",
        "192.168.20.128"
      ],
      "a": 1,
      "exp": "Um /26 usa blocos de 64 no último octeto: 0, 64, 128, 192. O 77 cai no bloco 64.",
      "difficulty": "intermediário",
      "topic": "IPv4"
    },
    {
      "id": "q17.3.20",
      "type": "simulado",
      "domain": "IPv4",
      "q": "Se o gateway configurado está fora da subnet local do host, qual sintoma é provável?",
      "opts": [
        "Falha para sair da rede local",
        "Certificado expirado",
        "HTTP 201 em todas as APIs",
        "Aumento de SNR Wi-Fi"
      ],
      "a": 0,
      "exp": "O host precisa alcançar o gateway em L2; se o gateway não é local, a saída quebra.",
      "difficulty": "intermediário",
      "topic": "IPv4"
    },
    {
      "id": "q17.3.21",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Qual sequência separa melhor pilha local, gateway e DNS?",
      "opts": [
        "ping 127.0.0.1, ping gateway, ping IP externo, testar nome",
        "Trocar firewall antes de testar IP",
        "Reiniciar DNS raiz",
        "Mudar MTU sem evidência"
      ],
      "a": 0,
      "exp": "A sequência reduz suposições e isola camada local, gateway, saída por IP e resolução de nomes.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    },
    {
      "id": "q17.3.22",
      "type": "simulado",
      "domain": "Ethernet/L2",
      "q": "Qual problema STP tenta evitar em redes com caminhos redundantes?",
      "opts": [
        "Loop de camada 2",
        "Handshake TLS inválido",
        "Esgotamento de NAT",
        "TTL DNS baixo"
      ],
      "a": 0,
      "exp": "STP evita loops L2 que podem causar tempestade de broadcast e instabilidade de MAC table.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2"
    },
    {
      "id": "q17.3.23",
      "type": "simulado",
      "domain": "IPv4",
      "q": "Qual endereço normalmente não deve ser atribuído a host em uma rede /24 tradicional?",
      "opts": [
        ".1 quando usado como gateway",
        ".50 como estação",
        ".0 como endereço de rede",
        ".200 como impressora"
      ],
      "a": 2,
      "exp": "Em uma rede tradicional, o endereço de rede representa o bloco e não um host.",
      "difficulty": "intermediário",
      "topic": "IPv4"
    },
    {
      "id": "q17.3.24",
      "type": "simulado",
      "domain": "Fundamentos/OSI",
      "q": "Um erro HTTP 404 prova que qual camada já respondeu?",
      "opts": [
        "Aplicação/HTTP",
        "Física apenas",
        "ARP apenas",
        "DHCP apenas"
      ],
      "a": 0,
      "exp": "404 é uma resposta HTTP; há componente de aplicação/proxy respondendo, mesmo que a rota da URL esteja errada.",
      "difficulty": "intermediário",
      "topic": "Fundamentos/OSI"
    },
    {
      "id": "q17.3.25",
      "type": "simulado",
      "domain": "Ethernet/L2",
      "q": "Qual evidência ajuda a confirmar que ARP resolveu o gateway local?",
      "opts": [
        "arp -a mostrando IP do gateway associado a um MAC",
        "dig +trace do domínio público",
        "openssl s_client sem SNI",
        "show bgp summary"
      ],
      "a": 0,
      "exp": "A tabela ARP mostra a associação IP-MAC conhecida pelo host.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2"
    },
    {
      "id": "q17.3.26",
      "type": "simulado",
      "domain": "IPv4",
      "q": "Dois hosts 10.0.1.10/24 e 10.0.2.10/24 se comunicam por qual caminho esperado?",
      "opts": [
        "Via gateway/roteador",
        "Diretamente por ARP do destino",
        "Por DNS autoritativo",
        "Por STP root bridge"
      ],
      "a": 0,
      "exp": "São redes diferentes para /24; o tráfego precisa de roteamento.",
      "difficulty": "intermediário",
      "topic": "IPv4"
    },
    {
      "id": "q17.3.27",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Se ping para IP funciona, mas nome falha, qual hipótese fica mais forte?",
      "opts": [
        "DNS",
        "Cabo desconectado",
        "Interface sem link",
        "STP bloqueando todas as portas"
      ],
      "a": 0,
      "exp": "Conectividade por IP funcionando e falha por nome apontam primeiro para DNS/resolução.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    },
    {
      "id": "q17.3.28",
      "type": "simulado",
      "domain": "Ethernet/L2",
      "q": "Em trunk 802.1Q, qual informação identifica a VLAN no quadro?",
      "opts": [
        "Tag VLAN",
        "Porta TCP",
        "TTL IP",
        "Header HTTP Host"
      ],
      "a": 0,
      "exp": "A tag 802.1Q carrega o VLAN ID em enlaces trunk.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2"
    },
    {
      "id": "q17.3.29",
      "type": "simulado",
      "domain": "IPv4",
      "q": "Qual comando Linux mostra rotas e gateway default?",
      "opts": [
        "ip route",
        "lsblk",
        "systemctl status ssh",
        "journalctl -k | grep usb"
      ],
      "a": 0,
      "exp": "ip route mostra rotas, incluindo default via.",
      "difficulty": "intermediário",
      "topic": "IPv4"
    },
    {
      "id": "q17.3.30",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Qual atitude é mais profissional ao errar uma questão de simulado?",
      "opts": [
        "Classificar lacuna, revisar aula relacionada e retestar com evidência",
        "Ignorar porque a nota geral passou",
        "Trocar respostas até acertar",
        "Remover o tema do curso"
      ],
      "a": 0,
      "exp": "O objetivo do simulado é produzir diagnóstico de lacunas e plano de reforço.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    }
  ],
  "simulado": {
    "title": "Simulado I — Fundamentos, OSI, Ethernet e IPv4",
    "instructions": [
      "Responda sem consulta.",
      "Marque confiança em cada resposta.",
      "Corrija usando os comentários.",
      "Registre lacunas por tema.",
      "Refaça somente questões erradas após revisão."
    ],
    "passingScorePercent": 75,
    "masteryScorePercent": 90,
    "questions": [
      {
        "question": "Um host 192.168.10.20/24 precisa acessar 192.168.10.50. Qual endereço MAC ele precisa descobrir primeiro?",
        "options": [
          "MAC do gateway padrão",
          "MAC do destino 192.168.10.50",
          "MAC do servidor DNS",
          "MAC do roteador da internet"
        ],
        "answer": 1,
        "explanation": "Como o destino está na mesma subnet /24, o host usa ARP para descobrir o MAC do próprio destino, não do gateway."
      },
      {
        "question": "Um host 192.168.10.20/24 precisa acessar 10.0.0.10. Para qual MAC o primeiro quadro Ethernet deve ser enviado?",
        "options": [
          "MAC do destino 10.0.0.10",
          "MAC de broadcast",
          "MAC do gateway padrão",
          "MAC do servidor DHCP"
        ],
        "answer": 2,
        "explanation": "Como 10.0.0.10 está fora da subnet local, o pacote IP mantém destino 10.0.0.10, mas o quadro Ethernet local vai para o MAC do gateway."
      },
      {
        "question": "Qual afirmação diferencia melhor VLAN e subnet?",
        "options": [
          "VLAN é camada 3 e subnet é camada 2",
          "VLAN segmenta domínio de broadcast em L2; subnet organiza endereçamento L3",
          "VLAN sempre exige internet e subnet não",
          "VLAN substitui roteador"
        ],
        "answer": 1,
        "explanation": "VLAN é segmentação lógica de camada 2. Subnet é divisão de endereçamento IP em camada 3. Elas costumam ser mapeadas juntas, mas não são a mesma coisa."
      },
      {
        "question": "Uma porta de switch em modo access está na VLAN 30, mas o host deveria estar na VLAN 20. Qual sintoma é provável?",
        "options": [
          "O host recebe ou tenta usar rede incorreta",
          "O cabo sempre fica fisicamente desconectado",
          "O TCP deixa de existir",
          "O DNS público para de funcionar globalmente"
        ],
        "answer": 0,
        "explanation": "VLAN errada pode colocar o host no domínio L2 incorreto, causando IP errado via DHCP, gateway errado ou isolamento do serviço esperado."
      },
      {
        "question": "Qual evidência é mais direta para investigar se um switch aprendeu o MAC de um host em uma porta?",
        "options": [
          "Tabela MAC/CAM do switch",
          "Registro MX do domínio",
          "Certificado TLS",
          "TTL de DNS"
        ],
        "answer": 0,
        "explanation": "A tabela MAC/CAM mostra quais endereços MAC foram aprendidos em quais portas/VLANs."
      },
      {
        "question": "Em troubleshooting, por que ping falhar não prova sozinho que o host destino está fora?",
        "options": [
          "Porque ICMP pode ser filtrado por firewall ou política",
          "Porque ping usa DNS obrigatoriamente",
          "Porque ping só funciona em redes Wi-Fi",
          "Porque ping altera a rota default"
        ],
        "answer": 0,
        "explanation": "ICMP pode ser bloqueado ou limitado. Falha de ping é evidência útil, mas precisa ser correlacionada com ARP, rota, TCP, logs e política."
      },
      {
        "question": "Um host com máscara /16 tenta acessar 192.168.20.10, mas o desenho correto era /24 e o destino está em outra VLAN. Qual erro pode ocorrer?",
        "options": [
          "O host pode tentar ARP local para um destino que deveria ir ao gateway",
          "O host sempre vai usar o servidor DNS como gateway",
          "O switch converte automaticamente /16 em /24",
          "O TCP passa a usar UDP"
        ],
        "answer": 0,
        "explanation": "Com máscara ampla demais, o host considera destinos como locais e tenta ARP no domínio L2, em vez de enviar ao gateway."
      },
      {
        "question": "Qual camada do modelo OSI é mais associada ao endereçamento IPv4 e roteamento?",
        "options": [
          "Camada 1",
          "Camada 2",
          "Camada 3",
          "Camada 7"
        ],
        "answer": 2,
        "explanation": "IPv4 e roteamento são conceitos de camada de rede, geralmente associada à camada 3 do modelo OSI."
      },
      {
        "question": "Qual camada é mais associada a quadros Ethernet e endereços MAC?",
        "options": [
          "Camada 2",
          "Camada 3",
          "Camada 4",
          "Camada 7"
        ],
        "answer": 0,
        "explanation": "Ethernet e MAC operam na camada de enlace, normalmente associada à camada 2."
      },
      {
        "question": "Uma rota mais específica e uma rota default existem para o mesmo destino. Qual tende a ser escolhida?",
        "options": [
          "A rota default sempre vence",
          "A rota mais específica vence",
          "A rota mais antiga vence obrigatoriamente",
          "A rota com menor endereço IP sempre vence"
        ],
        "answer": 1,
        "explanation": "A regra de longest prefix match escolhe a rota com prefixo mais específico para o destino."
      },
      {
        "question": "Qual evidência ajuda a diferenciar falha L2 local de falha de rota remota?",
        "options": [
          "Tabela ARP e alcance do gateway local",
          "Tamanho do arquivo HTML",
          "Assunto do e-mail",
          "Nome do usuário no navegador"
        ],
        "answer": 0,
        "explanation": "Se o host não resolve ARP do gateway ou não alcança gateway local, o problema pode estar antes do roteamento remoto."
      },
      {
        "question": "Qual é a melhor postura após errar uma questão do simulado?",
        "options": [
          "Ignorar para manter motivação",
          "Registrar lacuna, causa do erro, aula relacionada e ação prática de revisão",
          "Trocar a resposta no gabarito",
          "Liberar firewall para testar"
        ],
        "answer": 1,
        "explanation": "O valor do simulado está no pós-simulado: transformar erro em lacuna tratável e retestável."
      }
    ],
    "competencyScoring": {
      "enabled": true,
      "competencies": [
        {
          "id": "C01",
          "name": "Fundamentos, OSI e encapsulamento",
          "minimum": 70,
          "mastery": 90
        },
        {
          "id": "C02",
          "name": "Ethernet, ARP, VLAN, switching e camada 2",
          "minimum": 70,
          "mastery": 90
        },
        {
          "id": "C03",
          "name": "IPv4, subnetting, gateway e roteamento básico",
          "minimum": 75,
          "mastery": 90
        },
        {
          "id": "C08",
          "name": "Troubleshooting profissional, RCA e comunicação",
          "minimum": 80,
          "mastery": 92
        }
      ],
      "scoringMethod": "corrigir cada questão marcando também competência, causa do erro, confiança e ação de revisão",
      "passRule": "pontuação geral mínima de 75% e nenhuma competência crítica abaixo de 70%",
      "masteryRule": "90% geral, explicação correta de todos os erros e plano de revisão fechado",
      "feedbackByScoreBand": [
        {
          "range": "0-59%",
          "status": "insuficiente para conclusão",
          "action": "Não avance. Refaça a revisão guiada, execute laboratórios essenciais e produza nova tentativa com evidências."
        },
        {
          "range": "60-74%",
          "status": "base parcial",
          "action": "Revise competências abaixo do mínimo, foque nos erros conceituais e refaça somente os blocos afetados."
        },
        {
          "range": "75-89%",
          "status": "aprovado",
          "action": "Avance, mas registre lacunas residuais e execute pelo menos um mini lab de reforço por competência fraca."
        },
        {
          "range": "90-100%",
          "status": "domínio forte",
          "action": "Use o resultado como artefato de portfólio, explique decisões em voz alta e ajude outro aluno a revisar o tema."
        }
      ]
    },
    "postExamProtocol": [
      "não olhar o gabarito antes da tentativa completa",
      "registrar confiança por questão: baixa, média ou alta",
      "corrigir por competência, não apenas por acerto/erro",
      "classificar cada erro usando a taxonomia E-CONCEITO, E-CAMADA, E-COMANDO, E-ARQUITETURA, E-SEGURANCA ou E-COMUNICACAO",
      "criar uma ação de revisão e uma ação prática para cada competência abaixo do mínimo",
      "retestar depois de 24-48 horas sem consulta"
    ]
  },
  "flashcards": [
    {
      "front": "Quando um host usa ARP para o destino?",
      "back": "Quando o IP de destino está na mesma subnet local segundo IP e máscara do host."
    },
    {
      "front": "Quando um host usa ARP para o gateway?",
      "back": "Quando o destino está fora da subnet local e precisa ser encaminhado pelo gateway padrão."
    },
    {
      "front": "VLAN é camada 2 ou camada 3?",
      "back": "VLAN é segmentação lógica de camada 2; subnet é endereçamento de camada 3."
    },
    {
      "front": "O que é longest prefix match?",
      "back": "Critério de roteamento que escolhe a rota mais específica para o destino."
    },
    {
      "front": "Falha de ping prova que o destino está fora?",
      "back": "Não. ICMP pode ser filtrado; é preciso correlacionar com outras evidências."
    },
    {
      "front": "Qual é o valor do pós-simulado?",
      "back": "Transformar erro em lacuna, lacuna em revisão e revisão em prática retestável."
    }
  ],
  "mentorQuestions": [
    "Quais temas você acerta por memorização, mas ainda tem dificuldade de explicar em fluxo?",
    "Qual erro do simulado poderia gerar uma mudança perigosa em ambiente real se você não percebesse a lacuna?",
    "Você consegue desenhar a diferença entre tráfego local e remoto usando MAC, IP, ARP e gateway?"
  ],
  "challenge": {
    "title": "Plano de revisão de 7 dias após o Simulado I",
    "scenario": "Você realizou o Simulado I e identificou lacunas em VLAN, ARP, máscara IPv4 e interpretação de ICMP. Agora precisa criar um plano de revisão profissional.",
    "tasks": [
      "Agrupar erros por tema.",
      "Classificar causa de cada erro.",
      "Criar pelo menos três mini laboratórios.",
      "Criar cinco flashcards próprios.",
      "Refazer questões erradas em 48 horas.",
      "Atualizar o mapa mental da aula 17.2.",
      "Registrar evolução de confiança.",
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "successCriteria": [
      "Plano tem ações concretas.",
      "Cada lacuna possui aula ou laboratório associado.",
      "Há critério de reteste.",
      "O aluno explica a causa do erro.",
      "O plano não depende apenas de releitura passiva.",
      "Cada competência tem evidência observável.",
      "Cada erro tem causa classificada.",
      "A rubrica sustenta a decisão de aprovação.",
      "O plano de revisão tem tarefa prática e prazo."
    ],
    "constraints": [
      "não considerar a aula concluída sem rubrica preenchida",
      "não usar resposta decorada sem evidência técnica",
      "não avançar com competência crítica abaixo do mínimo sem plano de revisão"
    ],
    "expectedDeliverables": [
      "Matriz de competências com pontuação e confiança.",
      "Rubrica preenchida com justificativa.",
      "Feedback por tema: fundamento, diagnóstico, arquitetura, segurança, cloud e comunicação.",
      "Plano de revisão baseado em erros e reteste.",
      "Checklist de aprovação ou decisão de refazer competência crítica."
    ],
    "gradingRubric": [
      {
        "criterion": "C01 — Fundamentos, OSI e encapsulamento",
        "points": 15,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: explica fluxo de dados por camadas e reconhece onde cada evidência aparece."
      },
      {
        "criterion": "C02 — Ethernet, ARP, VLAN, switching e camada 2",
        "points": 15,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast."
      },
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 15,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 15,
        "description": "Demonstra domínio mínimo de 80% e produz evidência verificável: transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência."
      },
      {
        "criterion": "Evidência e rastreabilidade",
        "points": 15,
        "description": "Entrega prints, tabelas, comandos, hipóteses, logs, justificativas e rastreia cada decisão ao requisito correspondente."
      },
      {
        "criterion": "Correção comentada e melhoria contínua",
        "points": 25,
        "description": "Transforma erro em plano de revisão, reteste, laboratório curto e melhoria concreta do próprio mapa de conhecimento."
      }
    ]
  },
  "commentedSolution": {
    "summary": "Uma correção madura separa pontuação, confiança e lacunas. O objetivo é descobrir quais fundamentos precisam de reforço antes dos simulados seguintes.",
    "steps": [
      "Responder sem consulta.",
      "Registrar confiança e justificativa.",
      "Corrigir questão por questão.",
      "Classificar erro por tema e causa.",
      "Ligar lacunas ao mapa mental.",
      "Definir mini laboratório para lacunas críticas.",
      "Revisar com recuperação ativa.",
      "Refazer questões erradas.",
      "Registrar evolução.",
      "Avançar ao Simulado II somente após lacunas críticas tratadas.",
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonMistakes": [
      "Olhar gabarito antes de tentar.",
      "Contar acertos sem classificar lacunas.",
      "Confundir VLAN com subnet.",
      "Ignorar ARP em problemas IPv4 locais.",
      "Tratar ping como prova absoluta.",
      "Revisar apenas lendo, sem laboratório ou reteste."
    ],
    "reasoning": "Uma correção madura separa pontuação, confiança e lacunas. O objetivo é descobrir quais fundamentos precisam de reforço antes dos simulados seguintes. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
    "commonWrongAnswers": [
      {
        "answer": "Passei porque acertei 75%, sem analisar onde errei.",
        "whyItIsWrong": "A pontuação geral pode esconder uma competência crítica fraca, como DNS, rotas, firewall, cloud ou evidência de incidente."
      },
      {
        "answer": "Vou revisar lendo tudo novamente.",
        "whyItIsWrong": "Releitura passiva é pouco diagnóstica. A revisão precisa de erro classificado, exercício ativo, laboratório e reteste."
      },
      {
        "answer": "O capstone está bom porque a arquitetura ficou bonita.",
        "whyItIsWrong": "Arquitetura profissional precisa de fluxos, controles, custos, logs, evidências, rollback e justificativa."
      }
    ],
    "finalAnswer": "A aula está concluída quando o aluno entrega matriz de competências, rubrica, evidências, feedback por erro e plano de revisão/reteste para qualquer competência abaixo do mínimo."
  },
  "glossary": [
    {
      "term": "Simulado diagnóstico",
      "shortDefinition": "Avaliação usada para revelar lacunas.",
      "longDefinition": "Simulado cujo objetivo principal é identificar fragilidades conceituais e orientar revisão prática, não apenas gerar nota.",
      "example": "Errar questões de ARP e criar um laboratório de tráfego local/remoto.",
      "relatedTerms": [
        "lacuna",
        "reteste"
      ],
      "relatedLessons": [
        "17.1",
        "17.3"
      ]
    },
    {
      "term": "ARP",
      "shortDefinition": "Protocolo usado para descobrir MAC associado a um IPv4 local.",
      "longDefinition": "Mecanismo usado em redes IPv4 para mapear endereço IP a endereço MAC dentro do domínio local de broadcast.",
      "example": "Host usa ARP para descobrir o MAC do gateway antes de sair da subnet.",
      "relatedTerms": [
        "MAC",
        "gateway"
      ],
      "relatedLessons": [
        "15.4",
        "17.3"
      ]
    },
    {
      "term": "VLAN",
      "shortDefinition": "Segmentação lógica de camada 2.",
      "longDefinition": "Recurso que separa domínios de broadcast em uma infraestrutura Ethernet compartilhada.",
      "example": "VLAN 20 para usuários e VLAN 30 para câmeras.",
      "relatedTerms": [
        "trunk",
        "camada 2"
      ],
      "relatedLessons": [
        "15.3",
        "17.3"
      ]
    },
    {
      "term": "Gateway padrão",
      "shortDefinition": "Próximo salto usado para destinos fora da subnet local.",
      "longDefinition": "Endereço IP do roteador local para onde o host envia tráfego destinado a redes remotas.",
      "example": "192.168.10.1 como saída da rede 192.168.10.0/24.",
      "relatedTerms": [
        "rota default",
        "ARP"
      ],
      "relatedLessons": [
        "15.4",
        "17.3"
      ]
    },
    {
      "term": "ICMP",
      "shortDefinition": "Protocolo de mensagens de controle do IP.",
      "longDefinition": "Protocolo usado para mensagens de erro e controle, frequentemente utilizado por ping e traceroute para diagnóstico.",
      "example": "Echo Request e Echo Reply em teste de ping.",
      "relatedTerms": [
        "ping",
        "traceroute"
      ],
      "relatedLessons": [
        "15.4",
        "17.3"
      ]
    },
    {
      "term": "Lacuna de conhecimento",
      "shortDefinition": "Tema que precisa de revisão ou prática.",
      "longDefinition": "Diferença entre o domínio esperado e o domínio real do aluno, identificada por erro, baixa confiança ou dificuldade de explicação.",
      "example": "Acertar IPv4, mas não conseguir explicar rota de retorno.",
      "relatedTerms": [
        "revisão ativa",
        "plano de estudo"
      ],
      "relatedLessons": [
        "17.1",
        "17.3"
      ]
    }
  ],
  "references": [
    {
      "type": "official-standard",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência para IPv4 e datagramas IP."
    },
    {
      "type": "official-standard",
      "title": "RFC 792 — Internet Control Message Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc792",
      "note": "Referência para ICMP."
    },
    {
      "type": "official-standard",
      "title": "RFC 826 — Address Resolution Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc826",
      "note": "Referência para ARP."
    },
    {
      "type": "official-standard",
      "title": "IEEE 802.1Q — Bridges and Bridged Networks",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/standard/802_1Q-2022.html",
      "note": "Referência para VLANs e bridging."
    },
    {
      "type": "official-doc",
      "title": "Cisco — Troubleshooting Switch Port and Interface Problems",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/switches/catalyst-6500-series-switches/12027-53.html",
      "note": "Referência operacional para diagnóstico de camada física e camada 2."
    }
  ],
  "security": {
    "goodPractices": [
      "Usar simulados para diagnosticar lacunas, não apenas para memorizar respostas.",
      "Executar o capstone em ambiente controlado, documentado e sem impacto em terceiros.",
      "Coletar evidências de arquitetura, validação, logs, decisões e melhorias propostas.",
      "Revisar erros por tema: camada, protocolo, comando, segurança, cloud e troubleshooting.",
      "Consolidar o portfólio com entregáveis verificáveis e limites éticos claros."
    ],
    "badPractices": [
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar revisão integrada, simulados, estudos de caso, portfólio, capstone e consolidação profissional com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Risco de avaliação sem evidência — Simulado I: Fundamentos, OSI, Ethernet e IPv4",
        "description": "Em Simulado I: Fundamentos, OSI, Ethernet e IPv4, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
        "defensiveExplanation": "O risco aparece quando o aluno sabe responder definições, mas não consegue demonstrar validação operacional com diagrama, matriz de fluxos, comandos, logs, RCA e rubrica.",
        "mitigation": "Exigir entregáveis objetivos, simulado por domínio, relatório de lacunas, rubrica de 100 pontos, evidências sanitizadas, revisão das falhas e plano de estudo antes de concluir a trilha."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
    ],
    "hardening": [
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.3."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O aluno acerta questões isoladas, mas falha em cenários integrados.",
      "O projeto final tem diagrama, mas não possui validação ou evidências.",
      "A solução proposta funciona, mas ignora segurança, custo ou operação.",
      "O checklist mostra lacunas em fundamentos anteriores.",
      "A revisão não gera plano de melhoria mensurável."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 17.3?"
    ],
    "commands": [
      {
        "platform": "Revisão",
        "command": "preencher checklist de camada, protocolo, comando, segurança, cloud e evidência",
        "purpose": "Mapear lacunas antes de considerar o curso consolidado.",
        "expectedObservation": "Tópicos fracos aparecem agrupados por tema.",
        "interpretation": "A revisão deve orientar reforço dirigido, não repetição aleatória."
      },
      {
        "platform": "Capstone",
        "command": "validar DNS, rota, firewall, TLS, logs e evidências do cenário integrado",
        "purpose": "Comprovar que a arquitetura final funciona e é auditável.",
        "expectedObservation": "Entregáveis demonstram desenho, validação, riscos e mitigação.",
        "interpretation": "Sem evidência e rubrica, o projeto final vira texto, não avaliação técnica."
      },
      {
        "platform": "Portfólio",
        "command": "organizar diagramas, tabelas, comandos, prints, RCA e decisões arquiteturais",
        "purpose": "Gerar material revisável e demonstrável.",
        "expectedObservation": "Artefatos suficientes para explicar raciocínio técnico.",
        "interpretation": "Portfólio bom mostra processo, não apenas resultado final."
      }
    ],
    "decisionTree": [
      {
        "if": "O problema ocorre para todos os usuários e todas as origens",
        "then": "Priorizar serviço, DNS global, mudança central, firewall compartilhado, cloud regional ou dependência comum."
      },
      {
        "if": "O problema ocorre apenas para uma origem, filial, subnet ou usuário",
        "then": "Priorizar rota, política local, DNS específico, VPN, segmentação, identidade ou configuração do cliente."
      },
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, split-horizon, cache, search suffix, resolver usado e registros privados/públicos."
      },
      {
        "if": "Conecta, mas falha após handshake ou autenticação",
        "then": "Investigar TLS, proxy, WAF, identidade, autorização, cabeçalhos, sessão e logs de aplicação."
      },
      {
        "if": "A evidência aponta para mudança recente",
        "then": "Comparar antes/depois, avaliar rollback seguro, registrar impacto e transformar causa em controle preventivo."
      }
    ]
  },
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
      "17.4"
    ]
  },
  "assessmentBlueprint": {
    "mode": "simulado por bloco",
    "questionCount": 30,
    "minimumScore": 70,
    "masteryScore": 90,
    "correctionMethod": "corrigir por domínio, registrar lacuna, revisar aula relacionada e executar reteste com evidência",
    "gapReportRequired": true
  },
  "adaptiveReview": {
    "enabled": true,
    "purpose": "transformar erros de simulado, laboratório ou capstone em trilha de revisão objetiva",
    "errorTaxonomy": [
      {
        "code": "E-CONCEITO",
        "label": "erro conceitual",
        "interpretation": "o aluno decorou termo, mas não explicou por que ele existe ou como funciona internamente"
      },
      {
        "code": "E-CAMADA",
        "label": "erro de camada",
        "interpretation": "confundiu camada 2, camada 3, transporte, aplicação ou controle de segurança"
      },
      {
        "code": "E-COMANDO",
        "label": "erro de evidência",
        "interpretation": "não soube escolher comando, log, métrica ou pacote para confirmar hipótese"
      },
      {
        "code": "E-ARQUITETURA",
        "label": "erro de desenho",
        "interpretation": "solução funciona isoladamente, mas ignora fluxo, dependência, custo, segurança ou operação"
      },
      {
        "code": "E-SEGURANCA",
        "label": "erro de risco",
        "interpretation": "confundiu conectividade com autorização, ignorou telemetria ou propôs exceção insegura"
      },
      {
        "code": "E-COMUNICACAO",
        "label": "erro de comunicação",
        "interpretation": "não conseguiu explicar impacto, decisão, rollback ou risco residual para outro público"
      }
    ],
    "revisionLoop": [
      "registrar resposta inicial e confiança antes do gabarito",
      "corrigir e classificar cada erro pela taxonomia",
      "vincular o erro à competência e às aulas de origem",
      "executar mini laboratório ou exercício ativo",
      "refazer questão/tarefa após intervalo",
      "registrar nova confiança e evidência de melhoria"
    ],
    "remediationTracks": [
      {
        "competencyId": "C01",
        "competency": "Fundamentos, OSI e encapsulamento",
        "trigger": "pontuação abaixo de 70% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M00, M01, M02 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para explica fluxo de dados por camadas e reconhece onde cada evidência aparece",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C02",
        "competency": "Ethernet, ARP, VLAN, switching e camada 2",
        "trigger": "pontuação abaixo de 70% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M03 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C03",
        "competency": "IPv4, subnetting, gateway e roteamento básico",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M04, M05, M11 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para calcula redes, identifica rota local/default e justifica escolha de caminho",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C08",
        "competency": "Troubleshooting profissional, RCA e comunicação",
        "trigger": "pontuação abaixo de 80% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M15, M17 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      }
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    }
  ],
  "domainGapReport": {
    "required": true,
    "fields": [
      "domínio",
      "questões erradas",
      "causa provável",
      "aulas de revisão",
      "prática de reforço",
      "evidência de reteste"
    ],
    "actionRule": "qualquer domínio abaixo de 70% exige revisão; abaixo de 50% exige laboratório de reforço antes de seguir para o capstone"
  }
};
