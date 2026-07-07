export const lesson1704 = {
  "id": "17.4",
  "moduleId": "m17",
  "order": 4,
  "title": "Simulado II: Subnetting, TCP/UDP, DNS, DHCP e NAT",
  "subtitle": "Avaliação comentada para revisar conectividade lógica: cálculo CIDR, concessão DHCP, resolução DNS, portas TCP/UDP, sockets, NAT, retorno e evidências de troubleshooting.",
  "duration": "180-280 min",
  "estimatedStudyTimeMinutes": 280,
  "difficulty": "intermediário-avançado",
  "type": "simulado",
  "xp": 280,
  "tags": [
    "simulado",
    "subnetting",
    "CIDR",
    "TCP",
    "UDP",
    "DNS",
    "DHCP",
    "NAT",
    "PAT",
    "troubleshooting",
    "portas",
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
      "lesson": "17.3",
      "reason": "O Simulado I revisou OSI, Ethernet e IPv4, base necessária para entender subnetting, DHCP, DNS e NAT."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "O módulo de troubleshooting ensina coleta de evidências, baseline, DNS, TCP/UDP, firewall, NAT e cloud networking."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking usa subnets, NAT, DNS privado, route tables e endpoints privados em cenários reais."
    }
  ],
  "objectives": [
    "Avaliar domínio prático de subnetting, DHCP, DNS, TCP/UDP e NAT.",
    "Diferenciar falhas de configuração IP, resolução, transporte, política e tradução.",
    "Interpretar sintomas como NXDOMAIN, timeout, reset, refused, lease incorreto e NAT sem retorno.",
    "Transformar erros em lacunas rastreáveis e mini laboratórios.",
    "Preparar o aluno para simulados de HTTP/TLS, firewall, VPN e roteamento.",
    "Reforçar troubleshooting baseado em evidências e não em tentativa aleatória."
  ],
  "learningOutcomes": [
    "Calcular rede, faixa, broadcast e hosts válidos em cenários CIDR comuns.",
    "Explicar quando DHCP precisa de relay e quais opções impactam conectividade.",
    "Diferenciar falhas DNS de falhas TCP/UDP e aplicação.",
    "Interpretar timeout, reset, refused e ausência de resposta UDP com cautela.",
    "Explicar SNAT, DNAT, PAT e impacto em logs, retorno e rastreabilidade.",
    "Criar plano de revisão a partir dos erros do simulado."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Esta aula existe para testar a parte do curso que mais aparece em diagnósticos reais: endereçamento, resolução de nomes, concessão automática de configuração, portas, transporte e tradução de endereços. Subnetting, TCP/UDP, DNS, DHCP e NAT parecem assuntos separados quando estudados em capítulos, mas aparecem juntos quando uma aplicação não abre, quando uma VPN não acessa um serviço, quando um pod não resolve um nome ou quando um usuário recebe IP errado.</p>\n  <p>O Simulado II continua a lógica da aula 17.3. O objetivo não é apenas contar acertos. O objetivo é descobrir se o aluno consegue explicar por que um host considera um destino local ou remoto, por que DHCP depende de broadcast e relay, por que DNS pode falhar mesmo com conectividade IP, por que TCP e UDP se diagnosticam de formas diferentes e por que NAT pode quebrar retorno, logs, identidade de origem e custos.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> se você entende subnetting, DNS, DHCP, NAT e transporte, deixa de dizer apenas “a rede caiu” e passa a descrever exatamente qual etapa do fluxo falhou.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>As primeiras redes IP exigiam configuração manual cuidadosa: endereço, máscara, gateway e servidores de nomes. Com o crescimento das redes corporativas, DHCP reduziu erro operacional ao automatizar a entrega dessas configurações. DNS tornou a internet e as redes empresariais utilizáveis por humanos, substituindo a memorização de endereços por nomes. TCP e UDP organizaram a comunicação entre aplicações. NAT surgiu como resposta prática à escassez de IPv4 e se tornou também um elemento de arquitetura, publicação e egress.</p>\n  <p>Na cloud e no DevSecOps, esses fundamentos continuam vivos. Um container precisa resolver DNS. Um runner precisa sair por NAT. Um banco gerenciado pode exigir endpoint privado e DNS correto. Um load balancer precisa alcançar backends em portas específicas. Uma pipeline pode falhar por proxy, egress, resolução, rota ou política. Por isso, este simulado revisa os fundamentos com foco operacional.</p>\n  <ul>\n    <li><strong>IPv4 e subnetting:</strong> permitem separar redes, calcular escopo e tomar decisões de roteamento.</li>\n    <li><strong>DHCP:</strong> automatiza configuração, mas depende de camada 2, relay e opções corretas.</li>\n    <li><strong>DNS:</strong> transforma nomes em respostas úteis para aplicações.</li>\n    <li><strong>TCP/UDP:</strong> definem como aplicações conversam por portas e sessões.</li>\n    <li><strong>NAT:</strong> traduz endereços e portas, mas cria dependência de estado, retorno e logs.</li>\n  </ul>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema recorrente é que muitos profissionais tratam sintomas parecidos como se tivessem a mesma causa. “Não acessa” pode significar DNS inexistente, DHCP incorreto, máscara errada, rota default ausente, porta fechada, serviço escutando apenas em localhost, firewall bloqueando retorno, NAT sem estado, pool esgotado ou timeout de aplicação.</p>\n  <p>Outro problema é confundir ferramentas com diagnóstico. Um <code>ping</code> bem-sucedido não prova que TCP/443 funciona. Um <code>nslookup</code> bem-sucedido não prova que a aplicação está saudável. Um <code>telnet</code> conectado não prova que HTTP está correto. Um flow log permitindo tráfego não prova que TLS validou certificado. O simulado exige que o aluno separe camada, evidência e conclusão.</p>\n  <ul>\n    <li><strong>Erro conceitual:</strong> calcular uma subnet errada e investigar o componente errado.</li>\n    <li><strong>Erro operacional:</strong> ignorar lease DHCP, DNS entregue e rota default.</li>\n    <li><strong>Erro de transporte:</strong> tratar UDP como se tivesse handshake TCP.</li>\n    <li><strong>Erro de NAT:</strong> esquecer estado, porta de origem, rota de retorno e logs.</li>\n    <li><strong>Erro de segurança:</strong> abrir qualquer origem/porta durante troubleshooting sem prazo nem dono.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A revisão deste bloco evolui do cálculo para o fluxo. Primeiro, o aluno revisa CIDR, hosts válidos, rede, broadcast e gateway. Depois, conecta essa base ao DHCP, que entrega parâmetros de rede. Em seguida, revisa DNS como dependência antes de acessar serviços por nome. Depois, diferencia TCP e UDP por comportamento. Por fim, integra NAT como tradução que altera o que os lados enxergam.</p>\n  <p>O salto de maturidade acontece quando o aluno deixa de perguntar “qual comando eu rodo?” e passa a perguntar “qual hipótese quero provar?”. Se a hipótese é DNS, as evidências são consulta, resposta, servidor usado, TTL, cache e zona. Se é TCP, as evidências são SYN, SYN-ACK, RST, timeout, socket e logs. Se é NAT, as evidências são tradução, tabela de sessões, IP de saída, porta de origem e rota de retorno.</p>\n  <div class=\"callout callout--success\"><strong>Uso recomendado:</strong> resolva o simulado sem consulta, corrija por domínio, registre lacunas e refaça apenas as questões erradas após revisar.</div>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p>O Simulado II é uma avaliação diagnóstica de conectividade lógica. Ele mede se o aluno consegue raciocinar sobre endereçamento, configuração automática, resolução de nomes, transporte e tradução. Isso é diferente de saber definições isoladas. A pergunta profissional não é “o que é DHCP?”, mas “por que este host recebeu IP, mas não consegue resolver nomes internos?”.</p>\n  <p>O conceito central é cadeia de dependências. Um acesso por nome e porta depende de configuração IP, decisão local/remoto, gateway, DNS, transporte, política, NAT, retorno e aplicação. Uma falha em qualquer elo muda o sintoma.</p>\n  <ul>\n    <li><strong>Subnetting:</strong> determina escopo de rede, broadcast, hosts e decisão de gateway.</li>\n    <li><strong>DHCP:</strong> entrega endereço, máscara, gateway, DNS e outras opções.</li>\n    <li><strong>DNS:</strong> resolve nomes, mas também sofre com cache, TTL, split-horizon e zona errada.</li>\n    <li><strong>TCP/UDP:</strong> transportam aplicações com modelos diferentes de sessão e confiabilidade.</li>\n    <li><strong>NAT:</strong> traduz endereços e, muitas vezes, portas, exigindo estado e rastreabilidade.</li>\n  </ul>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Internamente, uma tentativa de acesso costuma seguir uma sequência: o host valida sua configuração IP; decide se o destino é local ou remoto; usa DNS se o destino for nome; escolhe protocolo e porta; tenta abrir sessão ou enviar datagrama; atravessa políticas; pode sofrer NAT; precisa receber resposta de volta; e só então a aplicação interpreta o resultado.</p>\n  <p>As questões deste simulado exploram exatamente esses pontos. Um erro de máscara pode fazer o host tentar ARP para um destino que deveria ir ao gateway. Um DHCP relay ausente pode impedir hosts de receberem IP em outra VLAN. Um registro CNAME pode resolver corretamente, mas apontar para nome que resolve diferente em DNS público e privado. Um timeout TCP pode indicar descarte silencioso, enquanto um RST pode indicar host alcançado, mas porta/serviço recusando. Um NAT pode esconder origem real se não houver logs.</p>\n  <ul>\n    <li><strong>Plano de configuração:</strong> IP, máscara, gateway, DNS e rotas.</li>\n    <li><strong>Plano de resolução:</strong> cache, resolvedor, autoridade, TTL e resposta.</li>\n    <li><strong>Plano de transporte:</strong> socket, porta, estado TCP ou datagrama UDP.</li>\n    <li><strong>Plano de tradução:</strong> SNAT, DNAT, PAT, estado e logs.</li>\n    <li><strong>Plano de evidência:</strong> comandos, logs, PCAP, flow logs e auditoria.</li>\n  </ul>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>A arquitetura do simulado possui cinco blocos. O primeiro testa subnetting e decisão de roteamento. O segundo testa DHCP e entrega de parâmetros. O terceiro testa DNS em cenários públicos, privados e híbridos. O quarto testa TCP/UDP, portas, sockets e interpretação de sintomas. O quinto testa NAT e troubleshooting integrado.</p>\n  <p>Cada questão foi escrita para ter uma alternativa correta e distratores plausíveis. O aluno deve registrar não apenas a resposta, mas a justificativa. No final, cada erro vira uma lacuna classificada por tema, causa e ação.</p>\n  <ul>\n    <li><strong>Bloco A:</strong> CIDR, hosts, rede, broadcast, gateway e rota local/remota.</li>\n    <li><strong>Bloco B:</strong> DHCP, lease, opções, relay, escopo e conflito.</li>\n    <li><strong>Bloco C:</strong> DNS, registros, TTL, NXDOMAIN, SERVFAIL e split-horizon.</li>\n    <li><strong>Bloco D:</strong> TCP, UDP, portas, estado, timeout, reset e serviço em listen.</li>\n    <li><strong>Bloco E:</strong> NAT, PAT, DNAT, SNAT, logs, retorno e custo operacional.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma empresa com prédios, ramais, recepção, lista telefônica, portaria e protocolo de entrega. Subnetting define quais salas pertencem ao mesmo andar. DHCP é a recepção entregando crachá, sala, ramal e instruções. DNS é a lista telefônica que transforma “financeiro” em ramal real. TCP é uma conversa confirmada, em que cada lado sabe que a ligação foi estabelecida. UDP é um recado enviado sem confirmação de conversa longa. NAT é a portaria que troca o ramal interno pelo número geral da empresa quando alguém liga para fora.</p>\n  <p>Quando algo falha, não basta dizer “ninguém atende”. Você precisa descobrir se a pessoa recebeu crachá errado, se o ramal não existe, se a chamada nem saiu da portaria, se a portaria trocou o número, se o destino recusou ou se a resposta voltou para outro lugar.</p>\n  <div class=\"callout callout--warning\"><strong>Analogia operacional:</strong> diagnosticar redes é reconstruir a rota da mensagem, não apenas olhar o último sintoma.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Imagine um notebook com IP <code>192.168.10.25/24</code>, gateway <code>192.168.10.1</code> e DNS <code>192.168.10.53</code>. Ele tenta acessar <code>app.local:443</code>. Primeiro, o notebook precisa saber se o destino final, após DNS, está na mesma rede ou fora dela. Se o DNS responder <code>192.168.10.80</code>, o notebook usa ARP para o próprio destino. Se responder <code>10.20.30.40</code>, ele usa ARP para o gateway.</p>\n  <p>Se o DNS não responder, o problema aparece antes do TCP. Se o DNS resolver, mas a porta 443 der timeout, o problema pode ser rota, firewall, serviço, NAT ou retorno. Se der connection refused, há forte indicação de que o host respondeu, mas a porta/serviço recusou. Se o certificado TLS não bater com o nome, a rede pode estar funcional, mas a camada de segurança da aplicação falhou.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, usuários de uma VLAN administrativa recebem IP via DHCP, resolvem nomes internos por DNS privado e acessam sistemas por proxy ou load balancer. Um incidente informa que “ninguém da filial acessa o ERP”. A investigação profissional separa perguntas: a VLAN recebeu IP correto? O relay DHCP aponta para o servidor certo? O DNS entregue pelo DHCP é o corporativo? O nome do ERP resolve para IP privado ou público? A porta TCP está aberta? Há NAT ou firewall no caminho? A rota de retorno conhece a rede da filial?</p>\n  <p>Esse cenário exige os temas do simulado. Subnetting define se a rede da filial conflita com outra. DHCP define configuração inicial. DNS define o destino. TCP/UDP define o comportamento da aplicação. NAT e firewall definem tradução, política e rastreabilidade.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na cloud, os mesmos fundamentos aparecem com nomes de serviços gerenciados. Uma instância em subnet privada recebe IP, rota default para NAT Gateway e DNS fornecido pela VPC/VNet. Ela precisa acessar um serviço SaaS externo por HTTPS e um banco gerenciado via endpoint privado. Se a rota para o NAT está ausente, o acesso externo falha. Se o DNS privado do endpoint não está vinculado à VPC/VNet, o banco resolve para endpoint público. Se o security group permite saída, mas o NACL bloqueia retorno efêmero, o sintoma pode ser timeout.</p>\n  <p>Em Kubernetes, a situação é ainda mais composta. Pods usam CNI, CoreDNS, Services, NetworkPolicy, NAT de saída e, às vezes, private endpoints. Uma falha pode parecer “aplicação fora”, mas a causa pode estar em DNS, porta, policy, NAT ou subnet sem IP disponível.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, pipelines frequentemente falham por dependências de rede. Um runner privado pode não resolver o registry interno, sair pelo NAT errado, não acessar artifact repository, usar proxy sem variável correta ou tentar conectar em porta bloqueada. O profissional que entende este simulado consegue transformar “pipeline falhou” em perguntas verificáveis: qual DNS foi usado? Qual IP foi resolvido? A porta TCP conectou? Houve reset ou timeout? O proxy registrou a requisição? O NAT log mostra saída?</p>\n  <p>Esse conhecimento também vira prevenção. Testes sintéticos em pipeline podem validar DNS, porta, TLS, rota e política antes do deploy. IaC pode impedir subnets sobrepostas, DNS privado ausente, rota default indevida e NAT sem logs. Policy as code pode bloquear liberação ampla de egress.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em Segurança da Informação, DNS, DHCP, TCP/UDP e NAT são fontes de controle e evidência. DHCP ajuda a mapear qual dispositivo usava determinado IP em certo horário. DNS revela nomes consultados e pode indicar destino suspeito. TCP/UDP e portas mostram comportamento de aplicações. NAT logs são essenciais para atribuir conexões de saída a origens internas. Sem esses dados, uma investigação perde rastreabilidade.</p>\n  <p>Ao mesmo tempo, esses componentes podem virar risco quando mal geridos: DNS privado vazando nomes internos, DHCP rogue entregando gateway indevido, NAT sem logging, egress amplo, portas administrativas expostas, DNS tunneling não monitorado e split-horizon mal configurado. O simulado reforça o raciocínio defensivo necessário para detectar e corrigir esses problemas.</p>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama resume o escopo do Simulado II. A lógica é seguir a jornada de um cliente que recebe configuração por DHCP, resolve nomes via DNS, decide portas TCP/UDP, atravessa NAT e precisa ser interpretado com raciocínio de subnetting.</p>\n  <div class=\"diagram-card\">\n    <svg class=\"svg-diagram svg-diagram--simulado-17-04\" viewBox=\"0 0 1180 680\" role=\"img\" aria-labelledby=\"simulado1704Title simulado1704Desc\">\n      <title id=\"simulado1704Title\">Mapa do Simulado II: Subnetting, TCP/UDP, DNS, DHCP e NAT</title>\n      <desc id=\"simulado1704Desc\">Fluxo de revisão que conecta subnetting, DHCP, DNS, transporte TCP UDP e NAT com evidências de troubleshooting.</desc>\n      <defs>\n        <marker id=\"arrow1704\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow-fill\"></path>\n        </marker>\n      </defs>\n      <rect x=\"30\" y=\"30\" width=\"1120\" height=\"620\" rx=\"26\" class=\"svg-surface\"></rect>\n      <text x=\"590\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Simulado II — fluxo mental de revisão</text>\n      <g class=\"svg-node\">\n        <rect x=\"70\" y=\"140\" width=\"190\" height=\"100\" rx=\"18\" class=\"svg-box\"></rect>\n        <text x=\"165\" y=\"175\" text-anchor=\"middle\" class=\"svg-label\">1. Subnetting</text>\n        <text x=\"165\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">rede, host, broadcast</text>\n        <text x=\"165\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">CIDR e gateway</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"330\" y=\"140\" width=\"190\" height=\"100\" rx=\"18\" class=\"svg-box\"></rect>\n        <text x=\"425\" y=\"175\" text-anchor=\"middle\" class=\"svg-label\">2. DHCP</text>\n        <text x=\"425\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">DORA, lease</text>\n        <text x=\"425\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">opções e relay</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"590\" y=\"140\" width=\"190\" height=\"100\" rx=\"18\" class=\"svg-box\"></rect>\n        <text x=\"685\" y=\"175\" text-anchor=\"middle\" class=\"svg-label\">3. DNS</text>\n        <text x=\"685\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">recursivo, autoritativo</text>\n        <text x=\"685\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">TTL e respostas</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"850\" y=\"140\" width=\"240\" height=\"100\" rx=\"18\" class=\"svg-box\"></rect>\n        <text x=\"970\" y=\"175\" text-anchor=\"middle\" class=\"svg-label\">4. TCP/UDP</text>\n        <text x=\"970\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">porta, socket, handshake</text>\n        <text x=\"970\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">timeout, reset, refused</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"190\" y=\"360\" width=\"230\" height=\"110\" rx=\"18\" class=\"svg-box svg-box--accent\"></rect>\n        <text x=\"305\" y=\"398\" text-anchor=\"middle\" class=\"svg-label\">5. NAT</text>\n        <text x=\"305\" y=\"425\" text-anchor=\"middle\" class=\"svg-small\">SNAT, DNAT, PAT</text>\n        <text x=\"305\" y=\"448\" text-anchor=\"middle\" class=\"svg-small\">estado e retorno</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"500\" y=\"360\" width=\"230\" height=\"110\" rx=\"18\" class=\"svg-box svg-box--accent\"></rect>\n        <text x=\"615\" y=\"398\" text-anchor=\"middle\" class=\"svg-label\">6. Evidências</text>\n        <text x=\"615\" y=\"425\" text-anchor=\"middle\" class=\"svg-small\">ipconfig, ss, dig</text>\n        <text x=\"615\" y=\"448\" text-anchor=\"middle\" class=\"svg-small\">logs, flow logs, PCAP</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"810\" y=\"360\" width=\"230\" height=\"110\" rx=\"18\" class=\"svg-box svg-box--accent\"></rect>\n        <text x=\"925\" y=\"398\" text-anchor=\"middle\" class=\"svg-label\">7. Lacunas</text>\n        <text x=\"925\" y=\"425\" text-anchor=\"middle\" class=\"svg-small\">erro → causa</text>\n        <text x=\"925\" y=\"448\" text-anchor=\"middle\" class=\"svg-small\">revisão → reteste</text>\n      </g>\n      <path d=\"M260 190 H330\" class=\"svg-line\" marker-end=\"url(#arrow1704)\"></path>\n      <path d=\"M520 190 H590\" class=\"svg-line\" marker-end=\"url(#arrow1704)\"></path>\n      <path d=\"M780 190 H850\" class=\"svg-line\" marker-end=\"url(#arrow1704)\"></path>\n      <path d=\"M970 240 C970 300 305 300 305 360\" class=\"svg-line\" marker-end=\"url(#arrow1704)\"></path>\n      <path d=\"M420 415 H500\" class=\"svg-line\" marker-end=\"url(#arrow1704)\"></path>\n      <path d=\"M730 415 H810\" class=\"svg-line\" marker-end=\"url(#arrow1704)\"></path>\n      <path d=\"M925 470 C925 560 165 560 165 240\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1704)\"></path>\n      <text x=\"590\" y=\"610\" text-anchor=\"middle\" class=\"svg-note\">A correção profissional transforma acerto e erro em domínio mensurável: conceito, evidência, causa e ação.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios complementares obrigam o aluno a aplicar os temas do simulado fora do formato de múltipla escolha. Eles incluem cálculo de subnets, análise de sintomas DNS, interpretação de TCP/UDP e explicação de NAT.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio propõe um cenário corporativo integrado: usuários recebem IP, resolvem nomes, acessam serviço interno e externo, passam por NAT e apresentam sintomas diferentes. O aluno deve montar uma matriz de hipóteses e evidências, identificando a causa mais provável sem liberar tráfego amplo nem alterar produção sem rollback.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada demonstra como um profissional organiza o raciocínio: começa pela configuração IP e subnet, valida DHCP, confirma DNS, testa transporte, verifica NAT e política, cruza logs e só então propõe correção. O objetivo é ensinar processo, não decorar gabarito.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>O Simulado II revisa o coração da conectividade lógica. Subnetting define fronteiras. DHCP entrega parâmetros. DNS transforma nomes em destinos. TCP e UDP transportam aplicações com comportamentos distintos. NAT traduz endereços e portas, exigindo estado, retorno e logs. Quem domina esses temas diagnostica problemas com muito mais precisão.</p>\n  <p>O principal aprendizado é que acertos e erros devem ser convertidos em plano. Um erro de cálculo CIDR pede prática de subnetting. Um erro de DNS pede revisão de cache, TTL e zonas. Um erro de transporte pede revisão de handshake, timeout e reset. Um erro de NAT pede revisão de SNAT, DNAT, PAT e logs.</p>\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C04</td><td>TCP, UDP, portas e serviços essenciais</td><td>75%</td><td>90%</td><td>diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, o aluno fará o <strong>Simulado III: HTTP/TLS, Firewalls, VPN e Roteamento</strong>. Ela eleva o nível ao combinar transporte, segurança, publicação de serviços, túneis, políticas e caminhos de rede.</p>\n</section>"
  },
  "exercises": [
    {
      "title": "Cálculo CIDR",
      "prompt": "Calcule rede, broadcast e faixa de hosts válidos para 192.168.44.77/27.",
      "difficulty": "intermediário",
      "expectedAnswer": "Bloco /27 tem incremento 32. Rede 192.168.44.64, broadcast 192.168.44.95, hosts 192.168.44.65 a 192.168.44.94."
    },
    {
      "title": "DHCP relay",
      "prompt": "Explique por que hosts em VLAN diferente do servidor DHCP podem precisar de relay.",
      "difficulty": "intermediário",
      "expectedAnswer": "A descoberta DHCP inicial usa broadcast local. O relay no gateway L3 encaminha a solicitação ao servidor DHCP em outra rede."
    },
    {
      "title": "DNS versus TCP",
      "prompt": "Uma aplicação funciona por IP:443, mas não por nome. Liste três hipóteses prováveis.",
      "difficulty": "intermediário",
      "expectedAnswer": "Registro DNS errado/ausente, cache/TTL antigo, split-horizon/zona privada incorreta, search suffix indevido ou certificado/SNI quando o nome muda."
    },
    {
      "title": "NAT e rastreabilidade",
      "prompt": "Explique por que NAT sem logs prejudica investigação de segurança.",
      "difficulty": "intermediário-avançado",
      "expectedAnswer": "Após NAT, o destino externo vê o IP traduzido. Sem logs de tradução por horário e porta, é difícil associar conexão à origem interna real."
    },
    {
      "id": "ex17.4.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C03, C04, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "quiz": [
    {
      "id": "q17.4.01",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um host 10.10.20.50/24 precisa acessar 10.10.20.80. Qual comportamento é esperado antes do envio do quadro Ethernet?",
      "opts": [
        "Enviar o pacote ao gateway padrão",
        "Fazer ARP para 10.10.20.80",
        "Consultar DHCP para descobrir a rota",
        "Executar NAT antes de enviar"
      ],
      "a": 1,
      "exp": "Como origem e destino estão no mesmo /24, o host considera o destino local e precisa descobrir o MAC do próprio destino via ARP.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.02",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um host 172.16.10.25/20 tem gateway 172.16.0.1. Qual faixa pertence à mesma rede /20?",
      "opts": [
        "172.16.10.0 a 172.16.10.255",
        "172.16.0.0 a 172.16.15.255",
        "172.16.8.0 a 172.16.23.255",
        "172.16.10.0 a 172.16.25.255"
      ],
      "a": 1,
      "exp": "Um /20 tem blocos de 16 no terceiro octeto. O endereço 172.16.10.25 pertence à rede 172.16.0.0/20, cujo intervalo vai até 172.16.15.255.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.03",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual opção DHCP normalmente informa o gateway padrão ao cliente?",
      "opts": [
        "Opção 3",
        "Opção 6",
        "Opção 15",
        "Opção 53"
      ],
      "a": 0,
      "exp": "A opção 3 informa roteadores/gateway padrão. A opção 6 informa servidores DNS.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.04",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Clientes em uma VLAN diferente do servidor DHCP não recebem IP. O servidor está ativo e o escopo existe. Qual hipótese é mais provável?",
      "opts": [
        "Falta de DHCP relay/ip helper no gateway da VLAN",
        "TTL DNS muito baixo",
        "Porta TCP 443 fechada",
        "Certificado TLS expirado"
      ],
      "a": 0,
      "exp": "DHCP usa broadcast no segmento local. Para atender outra subnet/VLAN, é comum precisar de relay no gateway L3.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.05",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Uma consulta DNS retorna NXDOMAIN. O que isso indica com mais precisão?",
      "opts": [
        "O servidor DNS está inacessível",
        "A porta TCP da aplicação está fechada",
        "O nome consultado não existe naquela visão/zona",
        "O NAT está sem rota de retorno"
      ],
      "a": 2,
      "exp": "NXDOMAIN indica que o nome não existe no contexto da resolução consultada. Pode ser erro de zona, nome, split-horizon ou ambiente.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.06",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um nome interno resolve para IP público quando consultado de dentro da VPC/VNet. Qual tema deve ser investigado primeiro?",
      "opts": [
        "Split-horizon DNS ou zona privada vinculada",
        "Duplex mismatch",
        "MTU de IPsec",
        "Opção DHCP de broadcast"
      ],
      "a": 0,
      "exp": "Serviços internos e private endpoints dependem de DNS privado/split-horizon correto para resolver para endereços privados.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.07",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em TCP, o cliente envia SYN e recebe RST imediatamente. Qual interpretação é mais provável?",
      "opts": [
        "O pacote foi descartado silenciosamente no caminho",
        "O destino ou intermediário respondeu recusando a conexão",
        "O DNS não resolveu",
        "UDP confirmou a entrega"
      ],
      "a": 1,
      "exp": "RST indica recusa/encerramento explícito por host ou intermediário. Timeout seria mais compatível com descarte silencioso.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.08",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Por que UDP é mais difícil de validar apenas com teste de porta?",
      "opts": [
        "Porque UDP sempre usa TLS",
        "Porque UDP não possui handshake como TCP",
        "Porque UDP não usa IP",
        "Porque UDP não usa porta de origem"
      ],
      "a": 1,
      "exp": "UDP é orientado a datagramas e não possui handshake. A ausência de resposta não prova sozinha que o serviço está indisponível.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.09",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um serviço escuta em 127.0.0.1:8080 dentro de um servidor. Clientes remotos não acessam. Qual causa é mais provável?",
      "opts": [
        "O serviço está vinculado apenas ao loopback",
        "O DNS está com TTL alto",
        "O DHCP lease expirou",
        "A subnet tem muitos hosts"
      ],
      "a": 0,
      "exp": "Binding em 127.0.0.1 permite acesso local, mas não por interfaces de rede externas.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.10",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual afirmação descreve melhor PAT/NAPT?",
      "opts": [
        "Traduz apenas nomes DNS",
        "Traduz endereço e porta para permitir múltiplas conexões internas usando um IP externo",
        "Substitui a necessidade de firewall",
        "Cria VLANs automaticamente"
      ],
      "a": 1,
      "exp": "PAT/NAPT usa portas para multiplexar várias conexões internas atrás de um ou poucos endereços externos.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.11",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em investigação de saída para internet, por que logs de NAT são importantes?",
      "opts": [
        "Porque mostram sempre o conteúdo HTTP completo",
        "Porque ajudam a mapear IP/porta traduzidos para a origem interna",
        "Porque substituem DNS logs",
        "Porque provam que a aplicação estava saudável"
      ],
      "a": 1,
      "exp": "Após NAT, sistemas externos veem o endereço traduzido. Logs de NAT ajudam a atribuir conexão à origem interna e ao horário correto.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.12",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Uma aplicação falha por nome, mas funciona quando acessada diretamente por IP e porta. Qual domínio deve ser priorizado?",
      "opts": [
        "DNS ou resolução de nomes",
        "Camada física do cabo",
        "STP root bridge",
        "Tamanho da subnet"
      ],
      "a": 0,
      "exp": "Se IP e porta funcionam, mas o nome falha, a prioridade é investigar DNS, cache, registro, search suffix, split-horizon ou certificado quando aplicável.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.4.13",
      "type": "simulado",
      "domain": "Subnetting",
      "q": "Qual é o broadcast de 10.10.10.64/26?",
      "opts": [
        "10.10.10.127",
        "10.10.10.126",
        "10.10.10.255",
        "10.10.10.64"
      ],
      "a": 0,
      "exp": "Um /26 possui 64 endereços; o bloco iniciado em 64 termina em 127.",
      "difficulty": "intermediário",
      "topic": "Subnetting"
    },
    {
      "id": "q17.4.14",
      "type": "simulado",
      "domain": "Subnetting",
      "q": "Para 50 hosts úteis tradicionais, qual prefixo é suficiente sem desperdiçar tanto quanto /24?",
      "opts": [
        "/26",
        "/30",
        "/32",
        "/29"
      ],
      "a": 0,
      "exp": "/26 oferece 62 hosts úteis tradicionais.",
      "difficulty": "intermediário",
      "topic": "Subnetting"
    },
    {
      "id": "q17.4.15",
      "type": "simulado",
      "domain": "TCP/UDP",
      "q": "Qual evidência indica serviço escutando localmente no Linux?",
      "opts": [
        "ss -tulpen mostrando LISTEN",
        "dig +trace mostrando NS",
        "arp -a vazio",
        "show vlan brief sem VLAN"
      ],
      "a": 0,
      "exp": "ss -tulpen mostra portas escutando e processos associados quando permitido.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP"
    },
    {
      "id": "q17.4.16",
      "type": "simulado",
      "domain": "TCP/UDP",
      "q": "Um SYN sai, mas não há SYN-ACK. Qual hipótese é plausível?",
      "opts": [
        "Bloqueio no caminho, serviço indisponível ou retorno quebrado",
        "Erro HTTP 404 confirmado",
        "Senha RADIUS inválida sempre",
        "CNAME em loop necessariamente"
      ],
      "a": 0,
      "exp": "Sem SYN-ACK, investigue caminho, firewall, serviço, roteamento de retorno ou host destino.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP"
    },
    {
      "id": "q17.4.17",
      "type": "simulado",
      "domain": "UDP",
      "q": "Por que UDP pode parecer “silencioso” em troubleshooting?",
      "opts": [
        "Porque não há handshake obrigatório nem garantia de resposta",
        "Porque sempre usa TLS",
        "Porque não tem portas",
        "Porque depende de STP"
      ],
      "a": 0,
      "exp": "UDP não estabelece sessão como TCP; ausência de resposta pode ser normal ou falha.",
      "difficulty": "intermediário",
      "topic": "UDP"
    },
    {
      "id": "q17.4.18",
      "type": "simulado",
      "domain": "DNS",
      "q": "Qual comando mostra uma trilha de delegação DNS?",
      "opts": [
        "dig +trace exemplo.com",
        "curl -X POST",
        "ss -ltnp",
        "show ip route"
      ],
      "a": 0,
      "exp": "dig +trace percorre raiz, TLD e servidores autoritativos.",
      "difficulty": "intermediário",
      "topic": "DNS"
    },
    {
      "id": "q17.4.19",
      "type": "simulado",
      "domain": "DNS",
      "q": "O que TTL DNS influencia diretamente?",
      "opts": [
        "Tempo de cache de respostas",
        "Tamanho máximo de pacote Ethernet",
        "Número de VLANs",
        "Distância administrativa"
      ],
      "a": 0,
      "exp": "TTL orienta quanto tempo uma resposta pode ser mantida em cache.",
      "difficulty": "intermediário",
      "topic": "DNS"
    },
    {
      "id": "q17.4.20",
      "type": "simulado",
      "domain": "DHCP",
      "q": "Um host recebe 169.254.x.x. Qual hipótese inicial é forte?",
      "opts": [
        "Falha em obter lease DHCP válido",
        "Certificado TLS expirado",
        "Rota BGP vazada",
        "HTTP 500 da API"
      ],
      "a": 0,
      "exp": "Endereço link-local/APIPA geralmente indica que o cliente não obteve configuração DHCP válida.",
      "difficulty": "intermediário",
      "topic": "DHCP"
    },
    {
      "id": "q17.4.21",
      "type": "simulado",
      "domain": "NAT",
      "q": "Qual diferença resume NAT e firewall?",
      "opts": [
        "NAT traduz endereços/portas; firewall decide política de tráfego",
        "NAT sempre autentica usuários; firewall sempre faz DNS",
        "Ambos são sinônimos",
        "Firewall só funciona com IPv6"
      ],
      "a": 0,
      "exp": "NAT não deve ser tratado como substituto de controle de acesso.",
      "difficulty": "intermediário",
      "topic": "NAT"
    },
    {
      "id": "q17.4.22",
      "type": "simulado",
      "domain": "Subnetting",
      "q": "VLSM deve normalmente começar por qual segmento?",
      "opts": [
        "O de maior necessidade de hosts",
        "O menor segmento sempre",
        "O segmento com nome alfabeticamente menor",
        "A VLAN de visitantes sempre"
      ],
      "a": 0,
      "exp": "Ordenar por maiores necessidades reduz fragmentação e facilita alocação.",
      "difficulty": "intermediário",
      "topic": "Subnetting"
    },
    {
      "id": "q17.4.23",
      "type": "simulado",
      "domain": "TCP/UDP",
      "q": "Qual comando Windows testa conectividade TCP a uma porta?",
      "opts": [
        "Test-NetConnection host -Port 443",
        "ipconfig /flushdns sempre",
        "arp -d *",
        "route delete 0.0.0.0"
      ],
      "a": 0,
      "exp": "Test-NetConnection com -Port testa caminho TCP até a porta indicada.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP"
    },
    {
      "id": "q17.4.24",
      "type": "simulado",
      "domain": "DNS",
      "q": "Split DNS significa:",
      "opts": [
        "respostas diferentes conforme origem/rede/visão",
        "DNS dividido em dois cabos físicos",
        "usar sempre 8.8.8.8",
        "desativar zonas privadas"
      ],
      "a": 0,
      "exp": "Split DNS fornece visões públicas e privadas distintas para o mesmo nome ou domínio.",
      "difficulty": "intermediário",
      "topic": "DNS"
    },
    {
      "id": "q17.4.25",
      "type": "simulado",
      "domain": "NAT",
      "q": "PAT/NAT overload diferencia fluxos usando principalmente:",
      "opts": [
        "portas de origem traduzidas",
        "somente endereço MAC",
        "TTL DNS",
        "SAN do certificado"
      ],
      "a": 0,
      "exp": "PAT usa portas para multiplexar vários hosts internos em um ou poucos IPs externos.",
      "difficulty": "intermediário",
      "topic": "NAT"
    },
    {
      "id": "q17.4.26",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Se DNS resolve para IP privado fora da VPN, qual cenário é provável?",
      "opts": [
        "Split DNS ou resolvedor errado",
        "ARP spoofing necessariamente",
        "STP root errado necessariamente",
        "Wi-Fi 6 GHz saturado"
      ],
      "a": 0,
      "exp": "Nome resolvendo para IP privado fora da rede esperada sugere visão DNS/resolvedor inadequado.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    },
    {
      "id": "q17.4.27",
      "type": "simulado",
      "domain": "Subnetting",
      "q": "Qual gateway é válido para 192.168.50.64/27?",
      "opts": [
        "192.168.50.65",
        "192.168.50.64",
        "192.168.50.95",
        "192.168.50.96"
      ],
      "a": 0,
      "exp": "Em /27 iniciado em 64, hosts úteis tradicionais vão de 65 a 94; 95 é broadcast.",
      "difficulty": "intermediário",
      "topic": "Subnetting"
    },
    {
      "id": "q17.4.28",
      "type": "simulado",
      "domain": "UDP",
      "q": "Qual protocolo costuma usar UDP/53 em consultas tradicionais?",
      "opts": [
        "DNS",
        "SSH",
        "HTTPS clássico",
        "SMTP submission"
      ],
      "a": 0,
      "exp": "DNS tradicional frequentemente usa UDP/53, embora também use TCP em alguns casos.",
      "difficulty": "intermediário",
      "topic": "UDP"
    },
    {
      "id": "q17.4.29",
      "type": "simulado",
      "domain": "DHCP",
      "q": "Qual opção DHCP informa gateway padrão ao cliente IPv4?",
      "opts": [
        "Router/default gateway",
        "MX record",
        "SAN",
        "CNAME"
      ],
      "a": 0,
      "exp": "A opção de router/default gateway entrega o próximo salto padrão ao cliente.",
      "difficulty": "intermediário",
      "topic": "DHCP"
    },
    {
      "id": "q17.4.30",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Qual evidência diferencia porta fechada de problema DNS?",
      "opts": [
        "Testar IP:porta diretamente com nc/Test-NetConnection após resolver o IP",
        "Trocar máscara sem medir",
        "Reiniciar switches",
        "Aumentar TTL DNS"
      ],
      "a": 0,
      "exp": "Separar resolução de nome de conexão por IP/porta evita diagnóstico misturado.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    }
  ],
  "simulado": {
    "title": "Simulado II — Subnetting, TCP/UDP, DNS, DHCP e NAT",
    "instructions": "Responda sem consulta. Registre confiança em cada questão. Depois corrija usando o comentário, classifique a lacuna e crie plano de revisão.",
    "passingScorePercent": 70,
    "masteryScorePercent": 90,
    "questions": [
      {
        "id": "SII-01",
        "question": "Um host 10.10.20.50/24 precisa acessar 10.10.20.80. Qual comportamento é esperado antes do envio do quadro Ethernet?",
        "options": [
          "Enviar o pacote ao gateway padrão",
          "Fazer ARP para 10.10.20.80",
          "Consultar DHCP para descobrir a rota",
          "Executar NAT antes de enviar"
        ],
        "answer": 1,
        "commentary": "Como origem e destino estão no mesmo /24, o host considera o destino local e precisa descobrir o MAC do próprio destino via ARP.",
        "domain": "Subnetting",
        "difficulty": "intermediário"
      },
      {
        "id": "SII-02",
        "question": "Um host 172.16.10.25/20 tem gateway 172.16.0.1. Qual faixa pertence à mesma rede /20?",
        "options": [
          "172.16.10.0 a 172.16.10.255",
          "172.16.0.0 a 172.16.15.255",
          "172.16.8.0 a 172.16.23.255",
          "172.16.10.0 a 172.16.25.255"
        ],
        "answer": 1,
        "commentary": "Um /20 tem blocos de 16 no terceiro octeto. O endereço 172.16.10.25 pertence à rede 172.16.0.0/20, cujo intervalo vai até 172.16.15.255.",
        "domain": "Subnetting",
        "difficulty": "intermediário"
      },
      {
        "id": "SII-03",
        "question": "Qual opção DHCP normalmente informa o gateway padrão ao cliente?",
        "options": [
          "Opção 3",
          "Opção 6",
          "Opção 15",
          "Opção 53"
        ],
        "answer": 0,
        "commentary": "A opção 3 informa roteadores/gateway padrão. A opção 6 informa servidores DNS.",
        "domain": "Subnetting",
        "difficulty": "intermediário"
      },
      {
        "id": "SII-04",
        "question": "Clientes em uma VLAN diferente do servidor DHCP não recebem IP. O servidor está ativo e o escopo existe. Qual hipótese é mais provável?",
        "options": [
          "Falta de DHCP relay/ip helper no gateway da VLAN",
          "TTL DNS muito baixo",
          "Porta TCP 443 fechada",
          "Certificado TLS expirado"
        ],
        "answer": 0,
        "commentary": "DHCP usa broadcast no segmento local. Para atender outra subnet/VLAN, é comum precisar de relay no gateway L3.",
        "domain": "DHCP",
        "difficulty": "intermediário"
      },
      {
        "id": "SII-05",
        "question": "Uma consulta DNS retorna NXDOMAIN. O que isso indica com mais precisão?",
        "options": [
          "O servidor DNS está inacessível",
          "A porta TCP da aplicação está fechada",
          "O nome consultado não existe naquela visão/zona",
          "O NAT está sem rota de retorno"
        ],
        "answer": 2,
        "commentary": "NXDOMAIN indica que o nome não existe no contexto da resolução consultada. Pode ser erro de zona, nome, split-horizon ou ambiente.",
        "domain": "DHCP",
        "difficulty": "intermediário"
      },
      {
        "id": "SII-06",
        "question": "Um nome interno resolve para IP público quando consultado de dentro da VPC/VNet. Qual tema deve ser investigado primeiro?",
        "options": [
          "Split-horizon DNS ou zona privada vinculada",
          "Duplex mismatch",
          "MTU de IPsec",
          "Opção DHCP de broadcast"
        ],
        "answer": 0,
        "commentary": "Serviços internos e private endpoints dependem de DNS privado/split-horizon correto para resolver para endereços privados.",
        "domain": "DHCP",
        "difficulty": "intermediário"
      },
      {
        "id": "SII-07",
        "question": "Em TCP, o cliente envia SYN e recebe RST imediatamente. Qual interpretação é mais provável?",
        "options": [
          "O pacote foi descartado silenciosamente no caminho",
          "O destino ou intermediário respondeu recusando a conexão",
          "O DNS não resolveu",
          "UDP confirmou a entrega"
        ],
        "answer": 1,
        "commentary": "RST indica recusa/encerramento explícito por host ou intermediário. Timeout seria mais compatível com descarte silencioso.",
        "domain": "DNS",
        "difficulty": "intermediário-avançado"
      },
      {
        "id": "SII-08",
        "question": "Por que UDP é mais difícil de validar apenas com teste de porta?",
        "options": [
          "Porque UDP sempre usa TLS",
          "Porque UDP não possui handshake como TCP",
          "Porque UDP não usa IP",
          "Porque UDP não usa porta de origem"
        ],
        "answer": 1,
        "commentary": "UDP é orientado a datagramas e não possui handshake. A ausência de resposta não prova sozinha que o serviço está indisponível.",
        "domain": "DNS",
        "difficulty": "intermediário-avançado"
      },
      {
        "id": "SII-09",
        "question": "Um serviço escuta em 127.0.0.1:8080 dentro de um servidor. Clientes remotos não acessam. Qual causa é mais provável?",
        "options": [
          "O serviço está vinculado apenas ao loopback",
          "O DNS está com TTL alto",
          "O DHCP lease expirou",
          "A subnet tem muitos hosts"
        ],
        "answer": 0,
        "commentary": "Binding em 127.0.0.1 permite acesso local, mas não por interfaces de rede externas.",
        "domain": "DNS",
        "difficulty": "intermediário-avançado"
      },
      {
        "id": "SII-10",
        "question": "Qual afirmação descreve melhor PAT/NAPT?",
        "options": [
          "Traduz apenas nomes DNS",
          "Traduz endereço e porta para permitir múltiplas conexões internas usando um IP externo",
          "Substitui a necessidade de firewall",
          "Cria VLANs automaticamente"
        ],
        "answer": 1,
        "commentary": "PAT/NAPT usa portas para multiplexar várias conexões internas atrás de um ou poucos endereços externos.",
        "domain": "TCP/UDP",
        "difficulty": "intermediário-avançado"
      },
      {
        "id": "SII-11",
        "question": "Em investigação de saída para internet, por que logs de NAT são importantes?",
        "options": [
          "Porque mostram sempre o conteúdo HTTP completo",
          "Porque ajudam a mapear IP/porta traduzidos para a origem interna",
          "Porque substituem DNS logs",
          "Porque provam que a aplicação estava saudável"
        ],
        "answer": 1,
        "commentary": "Após NAT, sistemas externos veem o endereço traduzido. Logs de NAT ajudam a atribuir conexão à origem interna e ao horário correto.",
        "domain": "TCP/UDP",
        "difficulty": "intermediário-avançado"
      },
      {
        "id": "SII-12",
        "question": "Uma aplicação falha por nome, mas funciona quando acessada diretamente por IP e porta. Qual domínio deve ser priorizado?",
        "options": [
          "DNS ou resolução de nomes",
          "Camada física do cabo",
          "STP root bridge",
          "Tamanho da subnet"
        ],
        "answer": 0,
        "commentary": "Se IP e porta funcionam, mas o nome falha, a prioridade é investigar DNS, cache, registro, search suffix, split-horizon ou certificado quando aplicável.",
        "domain": "TCP/UDP",
        "difficulty": "intermediário-avançado"
      }
    ],
    "competencyScoring": {
      "enabled": true,
      "competencies": [
        {
          "id": "C03",
          "name": "IPv4, subnetting, gateway e roteamento básico",
          "minimum": 75,
          "mastery": 90
        },
        {
          "id": "C04",
          "name": "TCP, UDP, portas e serviços essenciais",
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
      "back": "Quando o destino está na mesma rede/subnet local segundo IP e máscara."
    },
    {
      "front": "Qual é a função comum da opção DHCP 3?",
      "back": "Informar o gateway padrão/roteador ao cliente."
    },
    {
      "front": "Qual é a função comum da opção DHCP 6?",
      "back": "Informar os servidores DNS ao cliente."
    },
    {
      "front": "O que NXDOMAIN indica?",
      "back": "Que o nome consultado não existe naquela visão ou zona DNS."
    },
    {
      "front": "Qual diferença prática entre TCP timeout e RST?",
      "back": "Timeout sugere ausência de resposta ou descarte; RST sugere recusa explícita por host ou intermediário."
    },
    {
      "front": "Por que NAT logs são importantes?",
      "back": "Porque associam endereços/portas traduzidos à origem interna em determinado horário."
    }
  ],
  "mentorQuestions": [
    "Qual tema você acertou, mas com baixa confiança, e que evidência aumentaria sua segurança?",
    "Em quais questões você confundiu resolução de nomes com conectividade de transporte?",
    "Que mini laboratório você criaria para provar que entende NAT, retorno e logs?"
  ],
  "challenge": {
    "title": "Desafio — Diagnóstico integrado de DHCP, DNS, porta e NAT",
    "scenario": "Uma equipe relata que notebooks de uma filial receberam IP normalmente, acessam alguns sites, mas não acessam o sistema interno por nome. Por IP privado, a conexão TCP falha com timeout. A saída para internet passa por NAT e os logs mostram aumento de conexões externas. Você deve diagnosticar sem liberar regras amplas.",
    "tasks": [
      "Montar matriz origem-destino-protocolo-porta",
      "Validar IP, máscara, gateway e DNS recebidos por DHCP",
      "Comparar resolução DNS interna e externa",
      "Diferenciar falha DNS, TCP, rota e NAT",
      "Listar logs necessários",
      "Propor mitigação segura com rollback",
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "successCriteria": [
      "Hipóteses separadas por camada",
      "Evidências claras",
      "Sem mudanças amplas sem aprovação",
      "Plano de reteste",
      "RCA preliminar e ação preventiva",
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
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
      },
      {
        "criterion": "C04 — TCP, UDP, portas e serviços essenciais",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 20,
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
    "summary": "A investigação deve começar pela configuração entregue ao cliente, seguir para resolução DNS, validar transporte até destino, verificar políticas/NAT/retorno e correlacionar logs antes de qualquer mudança.",
    "steps": [
      "Confirmar IP, máscara, gateway, DNS e lease",
      "Validar se o nome interno resolve para IP esperado a partir da filial",
      "Testar conectividade por IP e porta com registro de horário",
      "Verificar rotas, firewall, NAT e logs de retorno",
      "Comparar com baseline de filial saudável",
      "Aplicar correção específica e retestar",
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonMistakes": [
      "Trocar DNS sem verificar DHCP",
      "Abrir any-any para testar",
      "Ignorar rota de retorno",
      "Confundir timeout TCP com serviço recusando",
      "Não registrar horário e origem",
      "Esquecer logs de NAT"
    ],
    "reasoning": "A investigação deve começar pela configuração entregue ao cliente, seguir para resolução DNS, validar transporte até destino, verificar políticas/NAT/retorno e correlacionar logs antes de qualquer mudança. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
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
      "term": "CIDR",
      "definition": "Notação que representa prefixo de rede e tamanho da máscara, como /24 ou /27."
    },
    {
      "term": "DHCP Relay",
      "definition": "Função que encaminha solicitações DHCP de uma subnet para servidor DHCP em outra rede."
    },
    {
      "term": "NXDOMAIN",
      "definition": "Resposta DNS indicando que o nome consultado não existe naquela zona/visão."
    },
    {
      "term": "Socket",
      "definition": "Combinação de endereço IP, protocolo e porta usada por uma aplicação para comunicação."
    },
    {
      "term": "PAT/NAPT",
      "definition": "Forma de NAT que traduz endereços e portas para multiplexar várias conexões internas."
    },
    {
      "term": "Rota de retorno",
      "definition": "Caminho usado pela resposta para voltar à origem; sem ele, a ida pode funcionar e a sessão ainda falhar."
    }
  ],
  "references": [
    {
      "title": "RFC 4632 — Classless Inter-domain Routing (CIDR)",
      "url": "https://www.rfc-editor.org/rfc/rfc4632"
    },
    {
      "title": "RFC 2131 — Dynamic Host Configuration Protocol",
      "url": "https://www.rfc-editor.org/rfc/rfc2131"
    },
    {
      "title": "RFC 1034 — Domain Names Concepts and Facilities",
      "url": "https://www.rfc-editor.org/rfc/rfc1034"
    },
    {
      "title": "RFC 9293 — Transmission Control Protocol",
      "url": "https://www.rfc-editor.org/rfc/rfc9293"
    },
    {
      "title": "RFC 3022 — Traditional IP Network Address Translator",
      "url": "https://www.rfc-editor.org/rfc/rfc3022"
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
        "name": "Risco de avaliação sem evidência — Simulado II: Subnetting, TCP/UDP, DNS, DHCP e NAT",
        "description": "Em Simulado II: Subnetting, TCP/UDP, DNS, DHCP e NAT, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.4."
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
      "Qual evidência comprova o entendimento da aula 17.4?"
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
      "17.5"
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
        "competencyId": "C03",
        "competency": "IPv4, subnetting, gateway e roteamento básico",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M04, M05, M11 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para calcula redes, identifica rota local/default e justifica escolha de caminho",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C04",
        "competency": "TCP, UDP, portas e serviços essenciais",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M06, M07 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs",
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
