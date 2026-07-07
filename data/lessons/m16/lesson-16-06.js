export const lesson1606 = {
  "id": "16.6",
  "moduleId": "m16",
  "order": 6,
  "title": "MITM, ARP spoofing, rogue DHCP e defesas L2",
  "subtitle": "Como reconhecer riscos de adversary-in-the-middle local, manipulação ARP, DHCP não autorizado e implementar defesas L2 com evidências, governança e resposta segura.",
  "duration": "280-420 min",
  "estimatedStudyTimeMinutes": 420,
  "difficulty": "intermediário-avançado",
  "type": "segurança defensiva",
  "xp": 420,
  "tags": [
    "MITM",
    "Adversary-in-the-Middle",
    "ARP spoofing",
    "ARP poisoning",
    "rogue DHCP",
    "DHCP Snooping",
    "Dynamic ARP Inspection",
    "IP Source Guard",
    "802.1X",
    "NAC",
    "port security",
    "WIDS",
    "WIPS",
    "camada 2",
    "Blue Team",
    "SOC",
    "defesa L2",
    "ética",
    "escopo autorizado",
    "SIEM",
    "NDR",
    "evidências",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "Zeek",
    "NetFlow",
    "timeline de incidente",
    "flow logs"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m5",
      "lesson": "5.1",
      "reason": "Ethernet, switches, VLANs e camada 2 são pré-requisitos para entender a origem do risco."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m6",
      "lesson": "6.1",
      "reason": "ARP, IPv4, gateway e roteamento local são necessários para interpretar manipulação IP-MAC."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.8",
      "reason": "Ameaças wireless como rogue AP e evil twin se conectam com MITM e defesa local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.3",
      "reason": "Troubleshooting físico, LAN, VLAN e camada 2 dá o método operacional de diagnóstico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.2",
      "reason": "Escopo, ética, legalidade e ROE delimitam qualquer validação defensiva."
    }
  ],
  "objectives": [
    "Explicar MITM, ARP spoofing e rogue DHCP do ponto de vista defensivo.",
    "Identificar sinais de manipulação local em logs, tabelas ARP, DHCP, switch, Wi-Fi, EDR e SIEM.",
    "Relacionar sintomas de usuário com gateway, DNS, certificado, rota, VLAN e camada 2.",
    "Desenhar controles L2 como 802.1X, DHCP Snooping, DAI, IP Source Guard, port security e WIDS/WIPS.",
    "Planejar implantação segura desses controles com piloto, exceções, rollback e comunicação.",
    "Criar playbook de resposta defensiva sem executar exploração ou coleta indevida de tráfego."
  ],
  "learningOutcomes": [
    "Dado um incidente de DNS/gateway errado, o aluno identifica evidências de rogue DHCP sem assumir causa única.",
    "Dado um alerta de MAC do gateway alterado, o aluno propõe validação defensiva com logs de switch, ARP e NAC.",
    "Dado um ambiente com hosts estáticos, o aluno planeja DAI e IP Source Guard sem indisponibilizar serviços.",
    "Dado um SSID suspeito, o aluno diferencia rogue AP, evil twin, AP autorizado mal inventariado e falso positivo.",
    "Dado um problema TLS em uma VLAN, o aluno correlaciona possível MITM com proxy legítimo, certificado, DNS e L2.",
    "Dado um plano de mudança, o aluno define piloto, critérios de parada, monitoramento, rollback e RCA."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Até aqui, você aprendeu que a rede é uma fonte de controle e de telemetria. Agora vamos descer para um ponto muito negligenciado: a segurança de camada 2. Muitos profissionais de segurança passam anos analisando firewall, proxy, WAF, EDR e cloud, mas esquecem que, dentro de uma LAN, vários controles dependem de algo mais básico: quem consegue se conectar ao segmento, quem entrega configuração IP, quem responde por um endereço MAC e quem pode se posicionar entre cliente e gateway.</p>\n  <p>MITM, ARP spoofing e rogue DHCP são temas clássicos porque exploram a confiança implícita de redes locais. O objetivo desta aula não é ensinar ataque. O objetivo é ensinar o defensor a reconhecer riscos, reduzir superfície, configurar controles, criar alertas, validar evidências e responder com segurança quando um ativo recebe gateway, DNS ou associação ARP inesperados.</p>\n  <div class=\"callout callout--warning\"><strong>Regra da aula:</strong> todos os exemplos são defensivos, autorizados e orientados a diagnóstico. Não há instrução de execução ofensiva, exploração, evasão, captura indevida de tráfego ou acesso fora de escopo.</div>\n  <p>Em ambientes corporativos, esse conhecimento protege redes cabeadas, Wi-Fi, impressoras, estações, IoT, laboratórios, VLANs de usuários, redes de convidados, filiais e até ambientes industriais. Um ataque de camada 2 bem-sucedido pode transformar uma rede aparentemente segmentada em uma fonte de interceptação, redirecionamento, indisponibilidade ou roubo de credenciais.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>Ethernet, ARP e DHCP nasceram em um contexto de redes cooperativas. O objetivo original era permitir comunicação local eficiente, descoberta de endereços e configuração automática. ARP resolve a pergunta: “qual MAC corresponde a este IP na minha rede local?”. DHCP resolve outra pergunta: “qual IP, máscara, gateway e DNS devo usar?”. Essas perguntas são legítimas, mas historicamente não traziam autenticação forte embutida.</p>\n  <p>Quando redes locais ficaram maiores, conectadas à internet e cheias de ativos críticos, a confiança implícita virou problema. Se um host consegue enganar outros sobre quem é o gateway, pode se colocar no caminho. Se um servidor DHCP não autorizado responder mais rápido ou com configuração maliciosa, clientes podem usar gateway, DNS ou rotas indevidas. Se um ponto de acesso falso imitar uma rede legítima, usuários podem se conectar a uma infraestrutura não confiável.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>LAN cooperativa:</strong> protocolos simples priorizam conectividade.</div><div class=\"timeline-item\"><strong>Ambiente corporativo:</strong> redes passam a carregar autenticação, dados sensíveis e aplicações críticas.</div><div class=\"timeline-item\"><strong>Defesa L2:</strong> surgem DHCP Snooping, Dynamic ARP Inspection, IP Source Guard, port security, 802.1X, NAC, WIDS/WIPS e segmentação.</div><div class=\"timeline-item\"><strong>Operação moderna:</strong> a defesa precisa unir switch, Wi-Fi, EDR, SIEM, IAM, cloud e processo de mudança.</div></div>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema central é que camada 2 fica perto demais do usuário e longe demais dos controles tradicionais de borda. Firewalls corporativos podem nunca ver o que acontece entre dois hosts na mesma VLAN. Um SIEM pode receber alertas tarde demais se switches e controladoras Wi-Fi não enviam logs. Um EDR pode ver sintomas, mas não saber qual porta de switch, AP ou VLAN originou o desvio. E, em redes planas, uma falha local pode virar movimento lateral.</p>\n  <p>MITM e ataques relacionados são perigosos porque alteram o caminho percebido pelo tráfego. O cliente acredita estar falando com o gateway, DNS ou serviço legítimo, mas parte do caminho foi manipulado. Em outros casos, o problema não é interceptação, mas indisponibilidade: um rogue DHCP entrega configuração errada, um conflito ARP derruba comunicação, uma VLAN nativa mal definida cria vazamento, ou uma exceção temporária de switch vira brecha permanente.</p>\n  <ul><li><strong>Visibilidade limitada:</strong> muitas equipes não coletam logs de camada 2.</li><li><strong>Confiança local:</strong> ARP e DHCP dependem de controles adicionais para ambientes hostis.</li><li><strong>Diagnóstico ambíguo:</strong> sintomas parecem DNS, gateway, certificado, proxy ou aplicação.</li><li><strong>Impacto alto:</strong> gateway ou DNS errado pode afetar todo um andar, filial ou SSID.</li><li><strong>Operação delicada:</strong> controles como DAI, DHCP Snooping e 802.1X exigem implantação planejada para não derrubar serviços legítimos.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A defesa evoluiu de confiança por cabo para confiança baseada em identidade, postura e evidência. Antes, conectar um cabo à porta de rede bastava. Depois vieram VLANs, port security, autenticação 802.1X, NAC, DHCP Snooping, Dynamic ARP Inspection, IP Source Guard, controle de trunk, BPDU Guard, Root Guard, WIDS/WIPS e segmentação por função.</p>\n  <p>No Wi-Fi, a evolução passou de redes abertas ou PSK compartilhada para WPA2/WPA3 Enterprise, 802.1X, certificados, controle de SSID, segmentação por VLAN, detecção de rogue AP e políticas por identidade. Em cloud e DevSecOps, o equivalente conceitual é não confiar em qualquer origem apenas porque está “dentro”: usar menor privilégio, identidade, política como código e validação contínua.</p>\n  <p>A maturidade defensiva ocorre quando a equipe não apenas configura controles, mas sabe validá-los, monitorá-los e explicar o risco residual. Uma empresa madura não pergunta apenas “temos DHCP Snooping?”. Ela pergunta: em quais VLANs, quais portas são trusted, quem aprovou, onde estão os logs, como testamos, qual impacto em telefones IP, impressoras, Wi-Fi, IoT e hosts estáticos, e qual playbook aciona o SOC se houver violação?</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p><strong>MITM</strong>, ou adversary-in-the-middle, é uma posição em que um ator se coloca entre duas partes que acreditam estar se comunicando diretamente. No contexto defensivo desta aula, interessa entender os sinais: alteração inesperada de gateway, MAC do gateway mudando, conflitos ARP, respostas DHCP não autorizadas, certificado inesperado, DNS divergente, tráfego saindo por caminho incomum e logs de switch indicando anomalias.</p>\n  <p><strong>ARP spoofing</strong> é a manipulação de associações IP-MAC em uma LAN. Como ARP foi desenhado para resolver endereços locais, defesas como Dynamic ARP Inspection dependem de uma base confiável de bindings, frequentemente construída com DHCP Snooping ou entradas estáticas. <strong>Rogue DHCP</strong> ocorre quando um servidor DHCP não autorizado fornece configuração a clientes, podendo causar indisponibilidade ou redirecionamento por gateway, DNS ou rotas indevidas.</p>\n  <p><strong>Defesas L2</strong> são controles aplicados em switches, controladoras Wi-Fi, NAC e políticas de acesso para reduzir abuso local: 802.1X, segmentação, portas access bem definidas, trunks controlados, DHCP Snooping, DAI, IP Source Guard, port security, BPDU Guard, Root Guard, desativação de portas não usadas, logging e monitoramento.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Para entender a defesa, visualize o fluxo legítimo. Um cliente conecta na rede, autentica ou é colocado em uma VLAN, solicita configuração via DHCP, recebe IP, máscara, gateway e DNS, resolve o MAC do gateway via ARP e envia tráfego para fora da rede local. Se qualquer etapa for manipulada, o sintoma pode aparecer como DNS errado, gateway inacessível, certificado estranho, rota anômala, lentidão, perda de pacotes ou alerta de segurança.</p>\n  <p>DHCP Snooping classifica portas como confiáveis ou não confiáveis. Servidores DHCP legítimos ficam atrás de portas trusted. Respostas DHCP vindas de portas untrusted são bloqueadas e registradas. O switch também pode criar uma tabela de bindings IP-MAC-VLAN-porta. Dynamic ARP Inspection usa essa tabela para validar respostas ARP e bloquear associações incompatíveis. IP Source Guard usa bindings para impedir que uma porta envie tráfego IP usando origem que não pertence àquele host.</p>\n  <p>Esses controles são poderosos, mas exigem cuidado. Hosts com IP estático, telefones IP, impressoras, APs, trunks, servidores legítimos, hipervisores e ambientes industriais podem precisar de tratamento específico. A implantação profissional começa em modo monitor, inventário, documentação, piloto, janela, rollback e comunicação.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura defensiva de camada 2 combina controle preventivo, detecção e resposta. Na borda de acesso, portas de usuário são access, não trunks. Portas não usadas ficam desativadas. 802.1X/NAC identifica usuário, dispositivo e postura. VLANs separam usuários, servidores, gestão, visitantes, IoT e voz. DHCP Snooping protege a origem da configuração IP. DAI protege resolução ARP. IP Source Guard reduz spoofing de origem. Controladoras Wi-Fi detectam rogue AP e SSIDs falsos. Logs seguem para SIEM.</p>\n  <p>Na camada de distribuição, roteamento inter-VLAN passa por firewall ou política adequada. No SOC, alertas de MAC flapping, ARP inspection drops, DHCP violation, rogue AP, portas err-disabled, mudança de trunk e autenticação 802.1X falha são correlacionados com usuário, porta, switch, localização, ticket de mudança e EDR.</p>\n  <div class=\"callout callout--info\"><strong>Arquitetura saudável:</strong> camada 2 não deve ser invisível. Ela precisa de dono, padrão, automação, logs, baseline, validação e playbook de resposta.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um prédio corporativo. DHCP é a recepção dizendo a cada visitante qual sala usar, qual elevador pegar e qual ramal ligar. ARP é a pessoa perguntando no corredor: “quem é o responsável pela sala 501?”. Em um prédio sem controle, qualquer pessoa poderia fingir ser recepcionista ou apontar para a sala errada. O visitante obedeceria, porque confia no ambiente.</p>\n  <p>DHCP Snooping é o segurança que só permite que a recepção oficial dê instruções. Dynamic ARP Inspection é o controle que verifica se a pessoa apontada como responsável pela sala realmente está cadastrada. 802.1X é a catraca que identifica quem entrou. Segmentação é separar visitantes, funcionários, servidores e áreas restritas. SIEM é a central que recebe avisos quando alguém tenta atuar como recepção falsa ou mudar placas no corredor.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma pequena rede de escritório, alguns usuários relatam que a internet caiu, mas apenas em uma VLAN. Ao verificar evidências, a equipe percebe que clientes receberam DNS e gateway diferentes do padrão. Em vez de trocar cabos aleatoriamente, a equipe compara leases DHCP, porta de origem das respostas, logs do switch e tabela ARP. O diagnóstico aponta para um dispositivo não autorizado conectado a uma porta de usuário e respondendo DHCP.</p>\n  <p>A resposta defensiva é remover o dispositivo, registrar evidência, habilitar DHCP Snooping na VLAN após validação, marcar apenas uplinks e porta do servidor DHCP como trusted, testar clientes, monitorar violações e documentar o padrão para outras VLANs. O aprendizado não é “alguém ligou algo errado”, mas “a rede permitia que qualquer porta entregasse configuração crítica”.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa com matriz e filiais, o SOC recebe alertas de certificados TLS inesperados em estações de um andar. A aplicação SaaS está correta para outros usuários, mas aquele segmento apresenta cadeia de certificado diferente. O time de redes consulta logs de switch e detecta mudanças incomuns na associação MAC do gateway, além de ARP inspection drops em modo monitor. O time não conclui imediatamente comprometimento; ele cria uma linha do tempo, valida mudanças recentes, verifica portas de acesso, compara ARP tables, confere EDR e correlaciona com autenticação 802.1X.</p>\n  <p>O plano corporativo envolve contenção por porta, análise de switch, preservação de logs, comunicação ao SOC, ativação controlada de DAI, revisão de DHCP Snooping, auditoria de trunks, revisão de portas não usadas, checagem de exceções de 802.1X e atualização de playbooks. O resultado é uma melhoria de arquitetura, não apenas correção pontual.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, ARP spoofing tradicional não aparece da mesma forma para workloads gerenciados, porque o provedor controla boa parte do plano de rede virtual. Porém, o conceito defensivo permanece: não confiar em qualquer caminho interno. Em VPCs/VNets, riscos equivalentes incluem rota indevida, DNS privado mal configurado, endpoint privado ignorado, egress sem controle, NAT inesperado, proxy bypass, security group amplo e imagem de container tentando usar DNS externo.</p>\n  <p>O paralelo com camada 2 ajuda: se no ambiente físico você protege quem entrega gateway e DNS, na cloud você protege route tables, resolvers, private endpoints, políticas de egress, service discovery e identidade. A mentalidade é a mesma: configuração de rede é superfície de segurança.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>DevSecOps reduz risco de camada 2 quando transforma padrões defensivos em configuração versionada. Templates de switches, VLANs, SSIDs, NAC, DHCP Snooping, DAI, logs e alertas devem passar por revisão, teste em laboratório, mudança controlada e rollback. O pipeline não configura ARP ou DHCP diretamente em toda empresa, mas pode validar inventário, gerar documentação, comparar drift e impedir que portas de usuário sejam transformadas em trunk sem aprovação.</p>\n  <p>Em plataformas modernas, o mesmo raciocínio vale para Kubernetes e cloud: policy as code impede egress irrestrito, DNS privado errado, LoadBalancer público indevido ou namespace sem NetworkPolicy. O defensor aprende a procurar a causa sistêmica: por que a configuração insegura chegou à produção?</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de Blue Team, sinais de MITM, ARP spoofing e rogue DHCP precisam virar detecção. Exemplos defensivos: múltiplos MACs para o gateway, mudança súbita de MAC do default gateway, DHCP Offer vindo de porta não autorizada, DNS entregue fora do padrão, cliente recebendo gateway inexistente, aumento de erros TLS, alerta de rogue AP, MAC flapping, porta entrando em err-disabled, queda massiva de leases e tráfego local anômalo.</p>\n  <p>As mitigações combinam prevenção e investigação: 802.1X/NAC, DHCP Snooping, DAI, IP Source Guard, segmentação, port security, WIDS/WIPS, logs de switch, logs de controladora, SIEM, EDR, playbook de contenção por porta e inventário de ativos autorizados. A pior prática é reagir liberando tudo: desabilitar controles, transformar portas em trunk, permitir qualquer DHCP, ignorar logs ou capturar tráfego de usuários sem autorização.</p>\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente simulação conceitual, Packet Tracer/GNS3 ou laboratório isolado. Não executar ARP spoofing ou rogue DHCP em rede real.</p><p><strong>Ações proibidas:</strong> Enviar respostas ARP falsas em rede corporativa; Subir DHCP não autorizado; Capturar credenciais; Interferir no tráfego de terceiros.</p><p><strong>Meta defensiva:</strong> Reconhecer sinais de ataque ou erro de camada 2 e desenhar mitigação com DHCP Snooping, Dynamic ARP Inspection, segmentação e NAC.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra como os controles defensivos reduzem a confiança implícita da LAN.</p>\n  <div class=\"diagram-wrapper\" role=\"img\" aria-label=\"Diagrama defensivo de MITM, ARP spoofing, rogue DHCP e controles L2\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 1180 560\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-6-content-diagram-1-title svg-16-6-content-diagram-1-desc\">\n      <title id=\"svg-16-6-content-diagram-1-title\">MITM, ARP spoofing, rogue DHCP e defesas L2</title>\n      <desc id=\"svg-16-6-content-diagram-1-desc\">Diagrama pedagógico da aula 16.6, MITM, ARP spoofing, rogue DHCP e defesas L2, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs><marker id=\"arrow1606\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path></marker></defs>\n      <rect x=\"30\" y=\"40\" width=\"1120\" height=\"480\" rx=\"22\" class=\"svg-panel\"></rect>\n      <text x=\"70\" y=\"85\" class=\"svg-title\">Defesa L2: reduzir confiança implícita e aumentar evidência</text>\n      <rect x=\"70\" y=\"140\" width=\"170\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect><text x=\"105\" y=\"178\" class=\"svg-label\">Cliente</text><text x=\"93\" y=\"203\" class=\"svg-small\">VLAN usuário</text>\n      <rect x=\"300\" y=\"120\" width=\"220\" height=\"135\" rx=\"14\" class=\"svg-node svg-node--security\"></rect><text x=\"335\" y=\"157\" class=\"svg-label\">Switch acesso</text><text x=\"323\" y=\"184\" class=\"svg-small\">802.1X • NAC</text><text x=\"323\" y=\"208\" class=\"svg-small\">DHCP Snooping • DAI</text><text x=\"323\" y=\"232\" class=\"svg-small\">IP Source Guard</text>\n      <rect x=\"600\" y=\"105\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect><text x=\"636\" y=\"143\" class=\"svg-label\">Gateway</text><text x=\"630\" y=\"168\" class=\"svg-small\">rota inter-VLAN</text>\n      <rect x=\"600\" y=\"235\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect><text x=\"630\" y=\"273\" class=\"svg-label\">DHCP legítimo</text><text x=\"627\" y=\"298\" class=\"svg-small\">porta trusted</text>\n      <rect x=\"870\" y=\"120\" width=\"210\" height=\"125\" rx=\"14\" class=\"svg-node svg-node--danger\"></rect><text x=\"910\" y=\"156\" class=\"svg-label\">Risco L2</text><text x=\"900\" y=\"183\" class=\"svg-small\">rogue DHCP</text><text x=\"900\" y=\"207\" class=\"svg-small\">ARP spoofing</text><text x=\"900\" y=\"231\" class=\"svg-small\">MITM local</text>\n      <rect x=\"300\" y=\"360\" width=\"230\" height=\"95\" rx=\"14\" class=\"svg-node\"></rect><text x=\"335\" y=\"397\" class=\"svg-label\">Controladora Wi‑Fi</text><text x=\"325\" y=\"423\" class=\"svg-small\">rogue AP • WIDS/WIPS</text>\n      <rect x=\"625\" y=\"370\" width=\"190\" height=\"80\" rx=\"14\" class=\"svg-node\"></rect><text x=\"660\" y=\"405\" class=\"svg-label\">Logs</text><text x=\"652\" y=\"430\" class=\"svg-small\">switch • AP • NAC</text>\n      <rect x=\"890\" y=\"360\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--security\"></rect><text x=\"942\" y=\"397\" class=\"svg-label\">SIEM/SOC</text><text x=\"915\" y=\"423\" class=\"svg-small\">correlação e resposta</text>\n      <line x1=\"240\" y1=\"188\" x2=\"300\" y2=\"188\" class=\"svg-line\" marker-end=\"url(#arrow1606)\"></line>\n      <line x1=\"520\" y1=\"160\" x2=\"600\" y2=\"150\" class=\"svg-line\" marker-end=\"url(#arrow1606)\"></line>\n      <line x1=\"520\" y1=\"215\" x2=\"600\" y2=\"280\" class=\"svg-line\" marker-end=\"url(#arrow1606)\"></line>\n      <line x1=\"870\" y1=\"185\" x2=\"525\" y2=\"185\" class=\"svg-line svg-line--danger\" marker-end=\"url(#arrow1606)\"></line>\n      <line x1=\"515\" y1=\"255\" x2=\"670\" y2=\"370\" class=\"svg-line\" marker-end=\"url(#arrow1606)\"></line>\n      <line x1=\"530\" y1=\"405\" x2=\"625\" y2=\"410\" class=\"svg-line\" marker-end=\"url(#arrow1606)\"></line>\n      <line x1=\"815\" y1=\"410\" x2=\"890\" y2=\"410\" class=\"svg-line\" marker-end=\"url(#arrow1606)\"></line>\n      <text x=\"76\" y=\"500\" class=\"svg-small\">Controles preventivos reduzem abuso local; logs e playbooks transformam anomalia L2 em investigação defensiva.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio-intro\">\n  <h2>15. Laboratório</h2>\n<p>Você construirá um plano defensivo para detectar e mitigar MITM local, ARP spoofing e rogue DHCP em uma rede corporativa simulada, sem executar ataques. O laboratório é baseado em inventário, configuração segura, evidências, alertas e resposta.</p>\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — ARP/DHCP anômalo defensivo</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>timestamp,vlan,event,ip,mac,port,expected_gateway_mac,observation\n2026-07-01T13:00:10Z,20,arp-reply,10.20.0.1,00:11:22:33:44:55,Gi1/0/1,00:11:22:33:44:55,ok\n2026-07-01T13:02:15Z,20,arp-reply,10.20.0.1,66:66:66:66:66:66,Gi1/0/18,00:11:22:33:44:55,gateway-mac-change\n2026-07-01T13:03:02Z,20,dhcp-offer,10.20.0.200,66:66:66:66:66:66,Gi1/0/18,n/a,rogue-dhcp-suspected\n2026-07-01T13:04:40Z,20,port-security,10.20.0.89,aa:bb:cc:dd:ee:ff,Gi1/0/18,n/a,violation</code></pre><p><strong>Tarefa:</strong> Classifique sinais de L2 usando apenas logs sintéticos. Proponha mitigação defensiva: DHCP snooping, DAI, port-security e contenção de porta.</p><p><strong>Ideia de detecção:</strong> <code>gateway_mac_change OR rogue_dhcp_offer OR port_security_violation</code></p><p><strong>Achado esperado:</strong> Gi1/0/18 apresenta múltiplos sinais defensivos de risco L2 e deve ser contido conforme processo autorizado.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios-intro\">\n  <h2>16. Exercícios</h2>\n<p>Os exercícios treinam diferenciação entre sintoma operacional, anomalia de camada 2, falha de configuração e possível incidente.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio-intro\">\n  <h2>17. Desafio</h2>\n<p>O desafio pede um playbook corporativo para implantação segura de defesas L2 em uma rede com usuários, Wi-Fi, IoT, impressoras, telefonia IP e filiais.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-intro\">\n  <h2>18. Solução comentada</h2>\n<p>A solução comentada mostra como criar defesa de camada 2 sem quebrar operação: inventário, piloto, modo monitor, exceções documentadas, logs, rollback e reteste.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n<p>MITM, ARP spoofing e rogue DHCP exploram confiança local. A defesa profissional não depende de um controle isolado: combina segmentação, 802.1X/NAC, DHCP Snooping, DAI, IP Source Guard, port security, Wi-Fi seguro, logs, SIEM, playbooks e governança de mudanças. O objetivo é reduzir a chance de manipulação local, detectar desvios rapidamente e responder com evidência sem violar privacidade ou disponibilidade.</p>\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Reconhecer sinais de ataque ou erro de camada 2 e desenhar mitigação com DHCP Snooping, Dynamic ARP Inspection, segmentação e NAC. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n<p>Na próxima aula, você estudará <strong>Movimento lateral e segmentação defensiva</strong>, conectando controles de rede, identidade, fluxo permitido e detecção de deslocamento indevido entre zonas.</p>\n</section>"
  },
  "lab": {
    "id": "lab-16.6",
    "title": "Laboratório: plano defensivo contra MITM local, ARP spoofing e rogue DHCP",
    "labType": "security",
    "objective": "Criar um plano de prevenção, detecção e resposta para riscos de camada 2 usando cenário simulado, sem execução ofensiva e com foco em evidência autorizada.",
    "scenario": "15. Laboratório Você construirá um plano defensivo para detectar e mitigar MITM local, ARP spoofing e rogue DHCP em uma rede corporativa simulada, sem executar ataques. O laboratório é baseado em inventário, configuração segura, evidências, alertas e resposta.",
    "topology": [
      "Switch de acesso",
      "VLAN de usuários",
      "Gateway inter-VLAN",
      "Servidor DHCP legítimo",
      "Controladora Wi-Fi",
      "NAC/802.1X",
      "EDR",
      "SIEM",
      "Time de redes",
      "Time SOC"
    ],
    "architecture": "Usuário/Wi-Fi → switch/controladora → controles L2/NAC → gateway/DHCP/DNS legítimos → logs → SIEM → playbook → mitigação → reteste → melhoria preventiva.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 420,
    "cost": "zero",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Este laboratório é exclusivamente defensivo e exige escopo autorizado.",
      "Não execute exploração, evasão, persistência, brute force, interceptação de tráfego real ou coleta de credenciais.",
      "Use dados sintéticos sempre que possível e preserve apenas metadados necessários.",
      "Informe SOC/NOC antes de testes que possam gerar alertas.",
      "Pare imediatamente se houver impacto operacional não previsto ou alvo fora do escopo.",
      "Usar somente os dados sintéticos fornecidos nesta aula ou dados internos autorizados e sanitizados.",
      "Não executar consulta, conexão, download, varredura ou teste contra domínios e IPs reais a partir do dataset.",
      "Não incluir payload, credencial, segredo, dado pessoal ou conteúdo de pacote real no relatório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Confirmar escopo autorizado e critérios de parada",
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente simulação conceitual, Packet Tracer/GNS3 ou laboratório isolado. Não executar ARP spoofing ou rogue DHCP em rede real.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Tabela ARP antes/depois | MAC address table | DHCP binding | Porta do switch | Logs NAC/NDR | Registro de mudança planejada",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Definir escopo e ROE",
        "instruction": "Descreva VLANs, SSIDs, switches, APs, horários, donos, fontes de logs e ações permitidas. Declare explicitamente que não haverá exploração nem captura de conteúdo de usuários.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "ROE defensiva aprovada para análise e melhoria de controles L2.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Inventariar caminhos legítimos",
        "instruction": "Liste gateway, DHCP, DNS, VLAN, trunk, porta trusted, APs autorizados, servidores estáticos, telefones IP, impressoras e exceções conhecidas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa de fontes legítimas de configuração e conectividade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Criar baseline de ARP e DHCP",
        "instruction": "Defina comportamento esperado: MAC do gateway por VLAN, origem de DHCP Offer, opções DHCP, DNS entregue, duração de lease e padrão de renovações.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Baseline comparável para detectar desvio.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Projetar DHCP Snooping",
        "instruction": "Classifique portas trusted e untrusted, VLANs cobertas, uplinks, trunks, relay, rate limit, logging e armazenamento de bindings.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de DHCP Snooping com baixo risco operacional.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Projetar Dynamic ARP Inspection e IP Source Guard",
        "instruction": "Defina como DAI usará bindings, como tratar hosts estáticos, como monitorar violações e como habilitar por fases.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano para impedir associações IP-MAC indevidas sem derrubar ativos legítimos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Revisar portas access, trunks e controles físicos",
        "instruction": "Valide portas desativadas, trunks autorizados, native VLAN, BPDU Guard, Root Guard, port security, descrição de portas e localização física.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Redução da superfície local de abuso.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Incluir Wi-Fi e rogue AP",
        "instruction": "Liste SSIDs autorizados, BSSIDs esperados, política WPA2/WPA3 Enterprise, detecção WIDS/WIPS, resposta a rogue AP e processo de exceção.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano para diferenciar AP autorizado, rogue AP e falso positivo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Criar detecções e correlação SIEM",
        "instruction": "Defina alertas para DHCP violation, ARP inspection drop, gateway MAC change, MAC flapping, rogue AP, porta err-disabled, 802.1X failure e DNS/gateway divergente.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Regras de detecção com contexto e severidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Desenhar playbook de resposta",
        "instruction": "Crie fluxo: triagem, confirmação, contenção por porta/VLAN/NAC, preservação de logs, comunicação, reteste, rollback e RCA.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Playbook executável por rede, SOC, service desk e segurança.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Planejar implantação gradual",
        "instruction": "Defina piloto em VLAN pequena, modo monitor, métricas de sucesso, janela, comunicação, expansão por ondas e revisão pós-implantação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Roadmap realista de hardening L2.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “MITM, ARP spoofing, rogue DHCP e defesas L2” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Gateway MAC mudou abruptamente | Sinal: Muitos hosts veem novo MAC para gateway | Query: arp_gateway_mac changes BY vlan within 5m | FP: Troca planejada de roteador/HA failover\nDetecção: DHCP Offer não autorizado | Sinal: Servidor DHCP fora da lista confiável | Query: dhcp_offer_server NOT IN approved_dhcp_servers | FP: Lab conectado por engano\nDetecção: MAC flapping | Sinal: Mesmo MAC aparece em portas diferentes | Query: mac_move_count > threshold BY mac,vlan | FP: Virtualização/HA legítima",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Isolar porta suspeita | Habilitar DHCP Snooping/DAI em modo planejado | Forçar renovação DHCP após correção | Validar gateway real | Coletar evidências antes de limpar cache",
        "expectedOutput": "Plano de contenção com dono, risco, impacto, comunicação, rollback e validação.",
        "explanation": "Resposta de segurança deve ser precisa. Bloqueios amplos podem esconder evidências e quebrar serviços críticos."
      },
      {
        "number": 15,
        "title": "Fazer debrief e lições aprendidas",
        "instruction": "Finalize registrando achados, evidências, falsos positivos, melhorias, controles permanentes e pendências.",
        "command": "Debrief: achado → evidência → risco → mitigação → detecção → dono → prazo.",
        "expectedOutput": "Relatório defensivo reproduzível e acionável.",
        "explanation": "O valor do laboratório aparece quando o resultado vira melhoria operacional, não apenas conhecimento individual."
      },
      {
        "number": 16,
        "title": "Analisar dataset sintético do caso",
        "instruction": "Classifique sinais de L2 usando apenas logs sintéticos. Proponha mitigação defensiva: DHCP snooping, DAI, port-security e contenção de porta.",
        "artifact": "timestamp,vlan,event,ip,mac,port,expected_gateway_mac,observation\n2026-07-01T13:00:10Z,20,arp-reply,10.20.0.1,00:11:22:33:44:55,Gi1/0/1,00:11:22:33:44:55,ok\n2026-07-01T13:02:15Z,20,arp-reply,10.20.0.1,66:66:66:66:66:66,Gi1/0/18,00:11:22:33:44:55,gateway-mac-change\n2026-07-01T13:03:02Z,20,dhcp-offer,10.20.0.200,66:66:66:66:66:66,Gi1/0/18,n/a,rogue-dhcp-suspected\n2026-07-01T13:04:40Z,20,port-security,10.20.0.89,aa:bb:cc:dd:ee:ff,Gi1/0/18,n/a,violation",
        "analysisTask": "Aplicar a ideia de detecção: gateway_mac_change OR rogue_dhcp_offer OR port_security_violation",
        "evidence": "Log ARP/DHCP sintético | Porta afetada | MAC esperado versus observado | Plano de contenção e rollback",
        "expectedOutput": "Gi1/0/18 apresenta múltiplos sinais defensivos de risco L2 e deve ser contido conforme processo autorizado.",
        "explanation": "O objetivo é treinar raciocínio defensivo usando metadados fictícios e seguros, sem execução ofensiva nem interação com infraestrutura real."
      },
      {
        "number": 17,
        "title": "Separar fato, hipótese e falso positivo",
        "instruction": "Crie uma tabela com três colunas: fatos observados no dataset, hipóteses defensivas e falsos positivos prováveis.",
        "analysisTask": "Classificar cada evidência como fato, inferência ou lacuna. Não declarar incidente sem correlação suficiente.",
        "expectedOutput": "Tabela com fatos, hipóteses, falsos positivos e próximos dados necessários.",
        "explanation": "Essa separação evita conclusões precipitadas e ensina investigação baseada em evidência."
      },
      {
        "number": 18,
        "title": "Construir mini timeline defensiva",
        "instruction": "Ordene os eventos sintéticos por horário e indique qual fonte confirma cada etapa.",
        "analysisTask": "Montar timeline com timestamp, fonte, evento, interpretação, confiança e próxima ação.",
        "expectedOutput": "Timeline curta capaz de sustentar decisão de contenção, hunting ou descarte como falso positivo.",
        "explanation": "Timeline é o elo entre log isolado e narrativa técnica defensável."
      }
    ],
    "expectedResult": "Documento defensivo com inventário, baseline, controles L2, detecções, playbook, plano de implantação, rollback e melhoria contínua.",
    "validation": [
      {
        "check": "A entrega deve provar que defesas foram planejadas com autorização, sem instruções ofensivas, sem coleta indevida e com proteção à disponibilidade.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega deve provar que defesas foram planejadas com autorização, sem instruções ofensivas, sem coleta indevida e com proteção à disponibilidade.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Escopo autorizado comprovado",
        "command": "Revisar ROE/checklist",
        "expected": "Alvos, janela, origem, ações permitidas, proibidas e critérios de parada estão documentados.",
        "ifFails": "Não executar o laboratório até formalizar escopo."
      },
      {
        "check": "Detecções com falso positivo tratado",
        "command": "Revisar tabela de detecção",
        "expected": "Cada detecção possui sinal, fonte de log, falso positivo provável e resposta.",
        "ifFails": "Adicionar contexto, exceções e enriquecimento antes de operacionalizar."
      },
      {
        "check": "Mitigação com rollback",
        "command": "Revisar plano de contenção",
        "expected": "Toda ação de contenção tem dono, impacto, retorno e validação.",
        "ifFails": "Trocar bloqueio amplo por ação específica e reversível."
      },
      {
        "check": "Dataset sintético analisado com evidência e falso positivo",
        "command": "Revisar relatório do laboratório",
        "expected": "O relatório contém dataset analisado, fatos, hipóteses, falsos positivos, timeline e contenção proporcional.",
        "ifFails": "Revisar o dataset e separar evidência objetiva de inferência antes de concluir."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se o plano depender de um único controle, revise: defesa L2 madura exige segmentação, identidade, bindings, logging, SIEM, operação e governança.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "O SOC abriu alerta durante o laboratório",
        "probableCause": "A atividade defensiva foi confundida com incidente ou estava fora da janela comunicada.",
        "howToConfirm": "Compare timestamp, origem e técnica com o ROE.",
        "fix": "Pausar execução, comunicar o ponto focal, registrar evidência e retomar apenas com autorização."
      },
      {
        "symptom": "O achado parece grave, mas há pouco contexto",
        "probableCause": "Falta enriquecimento de identidade, dono, criticidade, processo ou baseline.",
        "howToConfirm": "Verifique CMDB, IAM, EDR, janela de mudança e histórico do ativo.",
        "fix": "Classificar como hipótese até obter evidência suficiente."
      },
      {
        "symptom": "A mitigação proposta quebra serviço crítico",
        "probableCause": "Ação ampla demais ou dependência não mapeada.",
        "howToConfirm": "Cruze matriz de fluxos, dono do serviço e logs de uso.",
        "fix": "Criar contenção específica, exceção temporária ou tabletop antes de produção."
      }
    ],
    "improvements": [
      "Integrar switch, NAC, controladora Wi-Fi e DHCP ao SIEM.",
      "Automatizar inventário de IP-MAC-porta-VLAN com revisão periódica.",
      "Criar templates de configuração segura para portas de usuário, AP, telefone e IoT.",
      "Executar piloto de DHCP Snooping/DAI por VLAN antes de expansão.",
      "Adicionar revisão de exceções L2 ao processo mensal de governança.",
      "Converter achados repetíveis em detecções no SIEM/NDR.",
      "Adicionar owner, validade e revisão periódica para exceções.",
      "Automatizar validações defensivas em pipeline ou policy as code quando seguro.",
      "Criar runbook de resposta com evidências mínimas e rollback.",
      "Revisar retenção e qualidade dos logs necessários para investigação."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Tabela ARP antes/depois",
      "MAC address table",
      "DHCP binding",
      "Porta do switch",
      "Logs NAC/NDR",
      "Registro de mudança planejada",
      "Log ARP/DHCP sintético",
      "Porta afetada",
      "MAC esperado versus observado",
      "Plano de contenção e rollback"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “MITM, ARP spoofing, rogue DHCP e defesas L2” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: playbook corporativo de defesa L2",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Reconhecer sinais de ataque ou erro de camada 2 e desenhar mitigação com DHCP Snooping, Dynamic ARP Inspection, segmentação e NAC.",
    "authorizedScope": "Somente simulação conceitual, Packet Tracer/GNS3 ou laboratório isolado. Não executar ARP spoofing ou rogue DHCP em rede real.",
    "allowedActions": [
      "Analisar tabelas ARP/MAC",
      "Revisar configuração de switch",
      "Simular defesa em ambiente isolado",
      "Planejar alertas de gateway/MAC"
    ],
    "prohibitedActions": [
      "Enviar respostas ARP falsas em rede corporativa",
      "Subir DHCP não autorizado",
      "Capturar credenciais",
      "Interferir no tráfego de terceiros"
    ],
    "telemetrySources": [
      "ARP table changes",
      "Switch MAC address table",
      "DHCP snooping bindings",
      "NAC alerts",
      "NDR L2 anomalies",
      "Endpoint gateway change events",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Gateway MAC mudou abruptamente",
        "signal": "Muitos hosts veem novo MAC para gateway",
        "queryIdea": "arp_gateway_mac changes BY vlan within 5m",
        "commonFalsePositive": "Troca planejada de roteador/HA failover",
        "response": "Validar mudança; se não planejada, isolar porta suspeita."
      },
      {
        "name": "DHCP Offer não autorizado",
        "signal": "Servidor DHCP fora da lista confiável",
        "queryIdea": "dhcp_offer_server NOT IN approved_dhcp_servers",
        "commonFalsePositive": "Lab conectado por engano",
        "response": "Desabilitar porta, acionar dono e revisar DHCP Snooping."
      },
      {
        "name": "MAC flapping",
        "signal": "Mesmo MAC aparece em portas diferentes",
        "queryIdea": "mac_move_count > threshold BY mac,vlan",
        "commonFalsePositive": "Virtualização/HA legítima",
        "response": "Confirmar topologia; se indevido, aplicar port security/NAC."
      }
    ],
    "containmentActions": [
      "Isolar porta suspeita",
      "Habilitar DHCP Snooping/DAI em modo planejado",
      "Forçar renovação DHCP após correção",
      "Validar gateway real",
      "Coletar evidências antes de limpar cache"
    ],
    "evidenceChecklist": [
      "Tabela ARP antes/depois",
      "MAC address table",
      "DHCP binding",
      "Porta do switch",
      "Logs NAC/NDR",
      "Registro de mudança planejada"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — ARP/DHCP anômalo defensivo",
      "theme": "defesas L2 e sinais de MITM",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "timestamp,vlan,event,ip,mac,port,expected_gateway_mac,observation",
        "2026-07-01T13:00:10Z,20,arp-reply,10.20.0.1,00:11:22:33:44:55,Gi1/0/1,00:11:22:33:44:55,ok",
        "2026-07-01T13:02:15Z,20,arp-reply,10.20.0.1,66:66:66:66:66:66,Gi1/0/18,00:11:22:33:44:55,gateway-mac-change",
        "2026-07-01T13:03:02Z,20,dhcp-offer,10.20.0.200,66:66:66:66:66:66,Gi1/0/18,n/a,rogue-dhcp-suspected",
        "2026-07-01T13:04:40Z,20,port-security,10.20.0.89,aa:bb:cc:dd:ee:ff,Gi1/0/18,n/a,violation"
      ],
      "analysisPrompt": "Classifique sinais de L2 usando apenas logs sintéticos. Proponha mitigação defensiva: DHCP snooping, DAI, port-security e contenção de porta.",
      "detectionIdea": "gateway_mac_change OR rogue_dhcp_offer OR port_security_violation",
      "expectedFinding": "Gi1/0/18 apresenta múltiplos sinais defensivos de risco L2 e deve ser contido conforme processo autorizado.",
      "evidenceToCollect": [
        "Log ARP/DHCP sintético",
        "Porta afetada",
        "MAC esperado versus observado",
        "Plano de contenção e rollback"
      ],
      "constraints": [
        "Não executar tráfego contra destinos reais a partir do dataset.",
        "Tratar todos os nomes, IPs e usuários como fictícios.",
        "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
        "Preservar somente metadados necessários para o exercício."
      ]
    }
  },
  "exercises": [
    {
      "question": "Usuários de uma VLAN recebem DNS diferente do padrão. Quais evidências você coleta antes de concluir rogue DHCP?",
      "answer": "Leases DHCP, origem dos DHCP Offers, porta/VLAN, logs de switch, tabela de bindings, configuração de relay, mudanças recentes, EDR e comparação com hosts não afetados."
    },
    {
      "question": "Por que Dynamic ARP Inspection pode causar indisponibilidade se implantado sem planejamento?",
      "answer": "Porque depende de bindings confiáveis; hosts estáticos, exceções, trunks e inventário incompleto podem gerar bloqueio de tráfego legítimo."
    },
    {
      "question": "Quais sinais podem sugerir manipulação ARP ou MITM local?",
      "answer": "Mudança de MAC do gateway, MAC flapping, ARP inspection drops, certificados inesperados, DNS/gateway divergente, tráfego por caminho incomum e alertas correlacionados."
    },
    {
      "question": "Qual diferença entre rogue AP e evil twin no olhar defensivo?",
      "answer": "Rogue AP é ponto de acesso não autorizado conectado ou operando no ambiente; evil twin imita uma rede legítima para induzir conexão. Ambos exigem validação de BSSID, local, inventário e autorização."
    },
    {
      "id": "ex16.6.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “MITM local, ARP spoofing e rogue DHCP em visão defensiva” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como ARP table changes, Switch MAC address table, DHCP snooping bindings, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.6.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Enviar respostas ARP falsas em rede corporativa: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Subir DHCP não autorizado: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Capturar credenciais: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.6.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — ARP/DHCP anômalo defensivo”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "Gi1/0/18 apresenta múltiplos sinais defensivos de risco L2 e deve ser contido conforme processo autorizado. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual afirmação descreve melhor a abordagem desta aula?",
      "options": [
        "Executar técnicas ofensivas em qualquer rede",
        "Entender riscos L2 e planejar defesas autorizadas",
        "Ignorar camada 2 porque firewalls resolvem tudo",
        "Desativar logs para reduzir ruído"
      ],
      "answer": 1,
      "explanation": "A aula é defensiva: reconhecer risco, configurar controles, coletar evidências e responder dentro de escopo."
    },
    {
      "question": "Qual controle ajuda a bloquear respostas DHCP vindas de portas não autorizadas?",
      "options": [
        "DHCP Snooping",
        "HTTP Strict Transport Security",
        "NAT estático",
        "TTL DNS"
      ],
      "answer": 0,
      "explanation": "DHCP Snooping diferencia portas trusted/untrusted e pode bloquear respostas indevidas."
    },
    {
      "question": "Qual controle valida associações ARP usando bindings confiáveis?",
      "options": [
        "Dynamic ARP Inspection",
        "WAF",
        "CDN",
        "Split tunneling"
      ],
      "answer": 0,
      "explanation": "DAI valida ARP com base em bindings e reduz risco de associação IP-MAC indevida."
    },
    {
      "question": "Qual é uma má prática durante troubleshooting de possível MITM local?",
      "options": [
        "Preservar logs",
        "Correlacionar switch, DHCP, ARP e EDR",
        "Capturar conteúdo de usuários sem autorização",
        "Documentar linha do tempo"
      ],
      "answer": 2,
      "explanation": "Coleta de conteúdo sem autorização viola privacidade, ética e regras de engajamento."
    },
    {
      "question": "Por que 802.1X/NAC é relevante para defesa L2?",
      "options": [
        "Porque identifica e controla quem entra na rede",
        "Porque substitui DNS público",
        "Porque elimina a necessidade de VLANs",
        "Porque impede todo erro de aplicação"
      ],
      "answer": 0,
      "explanation": "802.1X/NAC adiciona identidade e política ao acesso de rede."
    },
    {
      "question": "Qual estratégia reduz risco de implantação de DAI/DHCP Snooping?",
      "options": [
        "Ativar em toda empresa sem inventário",
        "Piloto, modo monitor, exceções documentadas, logs e rollback",
        "Remover SIEM",
        "Transformar portas de usuário em trunk"
      ],
      "answer": 1,
      "explanation": "Controles L2 precisam de implantação gradual e evidências para evitar indisponibilidade."
    }
  ],
  "flashcards": [
    {
      "front": "MITM/AiTM",
      "back": "Posição em que um ator fica entre duas partes. No Blue Team, interessa detectar sinais e reduzir caminhos de manipulação."
    },
    {
      "front": "ARP spoofing",
      "back": "Manipulação de associações IP-MAC em rede local, mitigada com DAI, bindings confiáveis e segmentação."
    },
    {
      "front": "Rogue DHCP",
      "back": "Servidor DHCP não autorizado que entrega configuração de rede indevida, causando redirecionamento ou indisponibilidade."
    },
    {
      "front": "DHCP Snooping",
      "back": "Controle que separa portas confiáveis/não confiáveis para mensagens DHCP e cria bindings IP-MAC-VLAN-porta."
    },
    {
      "front": "Dynamic ARP Inspection",
      "back": "Valida mensagens ARP usando bindings para impedir associações IP-MAC não autorizadas."
    },
    {
      "front": "IP Source Guard",
      "back": "Restringe tráfego IP de uma porta aos endereços associados a ela por binding ou configuração estática."
    }
  ],
  "mentorQuestions": [
    "Como você provaria que o problema é L2 e não DNS, TLS ou aplicação?",
    "Quais exceções legítimas podem quebrar se DHCP Snooping e DAI forem ativados sem piloto?",
    "Qual seria o menor conjunto de logs para investigar rogue DHCP em uma filial?"
  ],
  "challenge": {
    "title": "Desafio: playbook corporativo de defesa L2",
    "description": "Crie um playbook para uma empresa com matriz, filiais, Wi-Fi corporativo, visitantes, impressoras, telefones IP e IoT. O playbook deve prevenir, detectar e responder a MITM local, ARP spoofing e rogue DHCP sem indisponibilizar serviços críticos.",
    "requirements": [
      "Escopo e ROE",
      "Inventário mínimo",
      "Controles preventivos",
      "Detecções SIEM",
      "Plano de implantação por ondas",
      "Critérios de parada",
      "Rollback",
      "RCA e melhoria contínua"
    ],
    "deliverable": "Documento de arquitetura defensiva L2 com matriz de controles, fontes de evidência, playbook e riscos residuais.",
    "constraints": [
      "Não executar ações fora do escopo autorizado.",
      "Não usar dados sensíveis reais quando dados sintéticos ou metadados bastarem.",
      "Toda detecção deve citar falso positivo provável.",
      "Toda mitigação deve possuir rollback e comunicação.",
      "Usar somente dados sintéticos ou logs internos autorizados e sanitizados.",
      "Não interagir com infraestrutura real de terceiros a partir de IOCs ou nomes do exercício."
    ],
    "expectedDeliverables": [
      "Regras de engajamento ou escopo defensivo",
      "Matriz de telemetria e evidências",
      "Detecções com falsos positivos",
      "Plano de contenção e rollback",
      "Debrief com lições aprendidas",
      "Análise de dataset sintético",
      "Timeline defensiva com fatos e hipóteses",
      "Tabela de falsos positivos e próximos dados necessários"
    ],
    "gradingRubric": [
      {
        "criterion": "Ética, escopo e segurança operacional",
        "points": 20,
        "description": "Define claramente autorização, limites, ações proibidas, critérios de parada e proteção de evidências."
      },
      {
        "criterion": "Detecção e resposta defensiva",
        "points": 20,
        "description": "Cria detecções com telemetria adequada, falsos positivos, resposta proporcional e rollback."
      }
    ]
  },
  "commentedSolution": {
    "overview": "Uma boa solução começa pelo inventário e pela governança. Antes de bloquear, a equipe entende quem entrega DHCP, quem é gateway, quais portas são trunks, quais hosts são estáticos, quais APs são legítimos e quais logs existem.",
    "keyPoints": [
      "Habilitar DHCP Snooping primeiro em piloto e modo monitor quando possível.",
      "Usar DAI com atenção a hosts estáticos e exceções documentadas.",
      "Integrar logs de switch, NAC, Wi-Fi, DHCP, EDR e SIEM.",
      "Criar alertas para mudanças de gateway MAC, DHCP violation, ARP drops e rogue AP.",
      "Garantir rollback e comunicação antes de expansão.",
      "Tratar exceções como risco temporário com dono e prazo."
    ],
    "commonMistakes": [
      "Ativar controles em massa sem inventário.",
      "Marcar portas de usuário como trusted sem justificativa.",
      "Ignorar Wi-Fi e visitantes.",
      "Não enviar logs de switch ao SIEM.",
      "Confundir proxy TLS corporativo legítimo com MITM sem análise.",
      "Coletar tráfego sensível sem autorização."
    ],
    "steps": [
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar teste ativo sem ROE porque é apenas laboratório",
        "whyItIsWrong": "Mesmo laboratório pode alcançar ativos errados, gerar alertas, coletar dados sensíveis ou ensinar um hábito inseguro. Segurança profissional começa por escopo."
      }
    ],
    "finalAnswer": "Complemento P1-M16: uma solução completa precisa demonstrar ética operacional, escopo autorizado, evidências protegidas, detecções com falsos positivos, contenção proporcional e melhoria contínua."
  },
  "glossary": [
    {
      "term": "Adversary-in-the-Middle",
      "definition": "Situação em que um ator se posiciona entre duas comunicações. Na defesa, o foco é detectar sinais e impedir caminhos de manipulação."
    },
    {
      "term": "ARP cache",
      "definition": "Tabela local que associa IPs a endereços MAC em uma rede local."
    },
    {
      "term": "DHCP Snooping",
      "definition": "Controle de switch que valida mensagens DHCP e ajuda a construir bindings confiáveis."
    },
    {
      "term": "Dynamic ARP Inspection",
      "definition": "Controle que valida mensagens ARP contra uma base confiável de bindings."
    },
    {
      "term": "Rogue DHCP",
      "definition": "Servidor DHCP não autorizado que entrega configuração indevida a clientes."
    },
    {
      "term": "WIDS/WIPS",
      "definition": "Sistemas de detecção/prevenção wireless usados para identificar APs suspeitos, SSIDs falsos e anomalias Wi-Fi."
    },
    {
      "term": "Regras de engajamento",
      "shortDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "longDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.6",
        "16.12"
      ]
    },
    {
      "term": "Falso positivo",
      "shortDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "longDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.6",
        "16.12"
      ]
    },
    {
      "term": "NDR",
      "shortDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "longDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.6",
        "16.12"
      ]
    },
    {
      "term": "Pacote de evidências",
      "shortDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "longDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.6",
        "16.12"
      ]
    },
    {
      "term": "Dataset sintético",
      "shortDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "longDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "PCAP textual",
      "shortDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "longDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "Timeline de incidente",
      "shortDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "longDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    }
  ],
  "references": [
    {
      "title": "MITRE ATT&CK — ARP Cache Poisoning",
      "url": "https://attack.mitre.org/techniques/T1557/002/"
    },
    {
      "title": "MITRE ATT&CK — DHCP Spoofing",
      "url": "https://attack.mitre.org/techniques/T1557/003/"
    },
    {
      "title": "Cisco — Troubleshoot Dynamic ARP Inspection and IP Source Guard",
      "url": "https://www.cisco.com/c/en/us/support/docs/switches/lan-switch-software/222274-troubleshoot-dynamic-arp-inspection-dai.html"
    },
    {
      "title": "NIST SP 800-153 — Guidelines for Securing Wireless Local Area Networks",
      "url": "https://csrc.nist.gov/publications/detail/sp/800-153/final"
    }
  ],
  "nextLesson": "16.7 — Movimento lateral e segmentação defensiva",
  "security": {
    "goodPractices": [
      "Executar atividades práticas apenas em laboratório, ambiente próprio ou escopo formalmente autorizado.",
      "Registrar regras de engajamento, janelas de teste, alvos permitidos e contatos de emergência.",
      "Priorizar validação defensiva: logs, detecção, contenção, mitigação e redução de superfície.",
      "Evitar instruções que ensinem abuso contra redes reais fora de autorização explícita.",
      "Conectar cada técnica estudada a controles de prevenção, monitoramento e resposta.",
      "Definir escopo, autorização, janela, origem dos testes e critérios de parada antes de qualquer validação.",
      "Tratar logs e evidências como dados sensíveis, com mínimo necessário, retenção definida e controle de acesso.",
      "Correlacionar rede, identidade, endpoint e cloud antes de concluir causa ou gravidade.",
      "Preferir mitigação específica, reversível e documentada em vez de bloqueios amplos.",
      "Transformar achados recorrentes em detecções, runbooks e controles automatizados."
    ],
    "badPractices": [
      "Testar redes, serviços ou terceiros sem autorização formal e escopo definido.",
      "Confundir laboratório educacional com permissão para atuar em ambiente real.",
      "Guardar credenciais, PCAPs ou logs sensíveis sem proteção e sem necessidade.",
      "Publicar detalhes exploráveis sem mitigação, contexto defensivo ou autorização.",
      "Executar varreduras agressivas sem janela, rate limit, owner e plano de rollback.",
      "Executar teste ativo sem regras de engajamento formalizadas.",
      "Confundir validação defensiva com permissão para exploração.",
      "Usar ferramenta de segurança sem entender impacto, taxa, escopo e logs gerados.",
      "Bloquear ativos críticos sem plano de rollback e comunicação.",
      "Registrar achado sem evidência reproduzível."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar segurança de redes, Blue Team, pentest autorizado, detecção, resposta e limites éticos com impacto operacional, financeiro e de segurança.",
      "Concluir incidente a partir de um único IOC sem contexto.",
      "Ignorar falsos positivos de ferramentas corporativas legítimas.",
      "Não preservar timestamp, fonte e integridade mínima da evidência.",
      "Criar regra de firewall ou SIEM sem dono, validade e revisão.",
      "Testar fora da janela aprovada por parecer tecnicamente simples."
    ],
    "vulnerabilities": [
      {
              "name": "Risco Blue Team específico — MITM, ARP spoofing, rogue DHCP e defesas L2",
              "description": "Em MITM, ARP spoofing, rogue DHCP e defesas L2, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
              "defensiveExplanation": "O risco aparece quando datasets, PCAPs, flow logs e indicadores são analisados sem baseline, autorização, falso positivo, cadeia mínima de evidência ou contenção proporcional.",
              "mitigation": "Usar datasets sintéticos ou logs autorizados e sanitizados, definir ROE, preservar evidências, correlacionar múltiplas fontes, documentar falso positivo e aplicar mitigação reversível e proporcional."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      },
      {
        "name": "Validação defensiva sem escopo formal",
        "description": "Mesmo atividades de Blue Team podem causar impacto, expor dados ou violar regras quando não há escopo, janela, alvos e critérios de parada documentados.",
        "defensiveExplanation": "O risco não está apenas na técnica, mas na ausência de governança operacional. Segurança profissional exige autorização, evidência e proporcionalidade.",
        "mitigation": "Criar ROE, comunicar SOC/NOC, limitar taxa e escopo, preservar logs e definir rollback antes da execução."
      }
    ],
    "monitoring": [
      "Logs de firewall, proxy, DNS, DHCP, VPN, EDR, NDR, SIEM, NetFlow/IPFIX e autenticação.",
      "Alertas de varredura, beaconing, conexões laterais, exfiltração e anomalias de volume.",
      "Evidências de escopo autorizado, horários de teste e owners dos ativos analisados.",
      "ARP table changes",
      "Switch MAC address table",
      "DHCP snooping bindings",
      "NAC alerts",
      "NDR L2 anomalies",
      "Endpoint gateway change events"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.6.",
      "Gateway MAC mudou abruptamente — sinal: Muitos hosts veem novo MAC para gateway; ideia de consulta: arp_gateway_mac changes BY vlan within 5m; falso positivo comum: Troca planejada de roteador/HA failover.",
      "DHCP Offer não autorizado — sinal: Servidor DHCP fora da lista confiável; ideia de consulta: dhcp_offer_server NOT IN approved_dhcp_servers; falso positivo comum: Lab conectado por engano.",
      "MAC flapping — sinal: Mesmo MAC aparece em portas diferentes; ideia de consulta: mac_move_count > threshold BY mac,vlan; falso positivo comum: Virtualização/HA legítima."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente simulação conceitual, Packet Tracer/GNS3 ou laboratório isolado. Não executar ARP spoofing ou rogue DHCP em rede real.",
      "allowedActions": [
        "Analisar tabelas ARP/MAC",
        "Revisar configuração de switch",
        "Simular defesa em ambiente isolado",
        "Planejar alertas de gateway/MAC"
      ],
      "prohibitedActions": [
        "Enviar respostas ARP falsas em rede corporativa",
        "Subir DHCP não autorizado",
        "Capturar credenciais",
        "Interferir no tráfego de terceiros"
      ],
      "stopConditions": [
        "Indício de impacto em produção não previsto.",
        "Alvo, técnica ou origem fora do escopo aprovado.",
        "Coleta acidental de dado sensível além do mínimo necessário.",
        "Alerta do SOC/NOC indicando risco operacional.",
        "Ausência de responsável disponível para decisão."
      ]
    }
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a MITM, ARP spoofing, rogue DHCP e defesas L2.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 16.6?"
    ],
    "commands": [
      {
        "platform": "Defensivo/SIEM",
        "command": "consultar logs de firewall, DNS, proxy, VPN, EDR e NetFlow dentro do escopo autorizado",
        "purpose": "Validar evidências de comportamento suspeito ou de teste controlado.",
        "expectedObservation": "Eventos correlacionados por origem, destino, horário, usuário e ação.",
        "interpretation": "Sem correlação temporal e escopo, a evidência pode ser ruído ou falso positivo."
      },
      {
        "platform": "Linux laboratório",
        "command": "ss -tulpen && ip route && tcpdump -ni <iface> host <ip_autorizado>",
        "purpose": "Observar serviços, rotas e pacotes apenas em ambiente autorizado.",
        "expectedObservation": "Tráfego compatível com o cenário de laboratório.",
        "interpretation": "Pacotes fora do esperado indicam hipótese defensiva para investigação, não autorização para atacar terceiros."
      },
      {
        "platform": "Blue Team",
        "command": "documentar IOC, hipótese, fonte de log, severidade, impacto e mitigação",
        "purpose": "Transformar observação técnica em investigação defensiva acionável.",
        "expectedObservation": "Registro claro, reprodutível e útil para resposta.",
        "interpretation": "Achados sem contexto e mitigação não amadurecem a defesa."
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
      "oneOf": [
        "exerciseDone",
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
      "16.7"
    ]
  },
  "blueTeamEnhancement": {
    "title": "MITM local, ARP spoofing e rogue DHCP em visão defensiva",
    "defensiveGoal": "Reconhecer sinais de ataque ou erro de camada 2 e desenhar mitigação com DHCP Snooping, Dynamic ARP Inspection, segmentação e NAC.",
    "authorizedScope": "Somente simulação conceitual, Packet Tracer/GNS3 ou laboratório isolado. Não executar ARP spoofing ou rogue DHCP em rede real.",
    "allowedActions": [
      "Analisar tabelas ARP/MAC",
      "Revisar configuração de switch",
      "Simular defesa em ambiente isolado",
      "Planejar alertas de gateway/MAC"
    ],
    "prohibitedActions": [
      "Enviar respostas ARP falsas em rede corporativa",
      "Subir DHCP não autorizado",
      "Capturar credenciais",
      "Interferir no tráfego de terceiros"
    ],
    "telemetrySources": [
      "ARP table changes",
      "Switch MAC address table",
      "DHCP snooping bindings",
      "NAC alerts",
      "NDR L2 anomalies",
      "Endpoint gateway change events"
    ],
    "detectionEngineering": [
      {
        "name": "Gateway MAC mudou abruptamente",
        "signal": "Muitos hosts veem novo MAC para gateway",
        "queryIdea": "arp_gateway_mac changes BY vlan within 5m",
        "commonFalsePositive": "Troca planejada de roteador/HA failover",
        "response": "Validar mudança; se não planejada, isolar porta suspeita."
      },
      {
        "name": "DHCP Offer não autorizado",
        "signal": "Servidor DHCP fora da lista confiável",
        "queryIdea": "dhcp_offer_server NOT IN approved_dhcp_servers",
        "commonFalsePositive": "Lab conectado por engano",
        "response": "Desabilitar porta, acionar dono e revisar DHCP Snooping."
      },
      {
        "name": "MAC flapping",
        "signal": "Mesmo MAC aparece em portas diferentes",
        "queryIdea": "mac_move_count > threshold BY mac,vlan",
        "commonFalsePositive": "Virtualização/HA legítima",
        "response": "Confirmar topologia; se indevido, aplicar port security/NAC."
      }
    ],
    "ndrSiemMapping": {
      "minimumFields": [
        "timestamp",
        "src_ip",
        "src_zone",
        "src_user_or_identity",
        "dst_ip",
        "dst_fqdn",
        "dst_port",
        "protocol",
        "action",
        "bytes_in",
        "bytes_out",
        "device_or_sensor",
        "rule_or_policy",
        "correlation_id"
      ],
      "enrichment": [
        "CMDB owner",
        "criticidade do ativo",
        "zona de rede",
        "identidade",
        "geolocalização aproximada",
        "categoria do destino",
        "janela de mudança"
      ],
      "retentionGuidance": "Manter metadados de rede por tempo compatível com investigação, auditoria e requisitos legais. Evitar armazenar conteúdo sensível quando metadados bastam."
    },
    "containmentPlaybook": [
      "Isolar porta suspeita",
      "Habilitar DHCP Snooping/DAI em modo planejado",
      "Forçar renovação DHCP após correção",
      "Validar gateway real",
      "Coletar evidências antes de limpar cache"
    ],
    "evidencePackage": [
      "Tabela ARP antes/depois",
      "MAC address table",
      "DHCP binding",
      "Porta do switch",
      "Logs NAC/NDR",
      "Registro de mudança planejada"
    ],
    "successCriteria": [
      "O escopo autorizado está explícito e verificável.",
      "As ações proibidas estão documentadas antes de qualquer teste.",
      "Cada achado possui evidência, fonte, horário e interpretação.",
      "A detecção proposta possui hipótese, campo de log, falso positivo provável e resposta.",
      "A mitigação é proporcional, reversível e não cria risco maior que o problema."
    ],
    "debriefQuestions": [
      "Que evidência permitiria defender essa conclusão em uma revisão técnica?",
      "Qual falso positivo mais provável precisa ser tratado?",
      "Qual ação de contenção reduziria risco sem destruir evidência?",
      "O que deve virar controle contínuo depois do laboratório?"
    ]
  },
  "blueTeamSyntheticDataset": {
    "title": "Dataset sintético — ARP/DHCP anômalo defensivo",
    "theme": "defesas L2 e sinais de MITM",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "timestamp,vlan,event,ip,mac,port,expected_gateway_mac,observation",
      "2026-07-01T13:00:10Z,20,arp-reply,10.20.0.1,00:11:22:33:44:55,Gi1/0/1,00:11:22:33:44:55,ok",
      "2026-07-01T13:02:15Z,20,arp-reply,10.20.0.1,66:66:66:66:66:66,Gi1/0/18,00:11:22:33:44:55,gateway-mac-change",
      "2026-07-01T13:03:02Z,20,dhcp-offer,10.20.0.200,66:66:66:66:66:66,Gi1/0/18,n/a,rogue-dhcp-suspected",
      "2026-07-01T13:04:40Z,20,port-security,10.20.0.89,aa:bb:cc:dd:ee:ff,Gi1/0/18,n/a,violation"
    ],
    "analysisPrompt": "Classifique sinais de L2 usando apenas logs sintéticos. Proponha mitigação defensiva: DHCP snooping, DAI, port-security e contenção de porta.",
    "detectionIdea": "gateway_mac_change OR rogue_dhcp_offer OR port_security_violation",
    "expectedFinding": "Gi1/0/18 apresenta múltiplos sinais defensivos de risco L2 e deve ser contido conforme processo autorizado.",
    "evidenceToCollect": [
      "Log ARP/DHCP sintético",
      "Porta afetada",
      "MAC esperado versus observado",
      "Plano de contenção e rollback"
    ],
    "constraints": [
      "Não executar tráfego contra destinos reais a partir do dataset.",
      "Tratar todos os nomes, IPs e usuários como fictícios.",
      "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
      "Preservar somente metadados necessários para o exercício."
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    }
  ]
};
