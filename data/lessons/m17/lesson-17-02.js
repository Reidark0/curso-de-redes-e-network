export const lesson1702 = {
  "id": "17.2",
  "moduleId": "m17",
  "order": 2,
  "title": "Mapa mental completo: do bit à cloud",
  "subtitle": "Uma visão integrada de todo o curso de redes, conectando fundamentos físicos, camadas, protocolos, serviços, segurança, cloud, troubleshooting e evidências.",
  "duration": "200-300 min",
  "estimatedStudyTimeMinutes": 300,
  "difficulty": "avançado",
  "type": "revisao",
  "xp": 300,
  "tags": [
    "mapa mental",
    "revisão",
    "OSI",
    "TCP/IP",
    "Ethernet",
    "IPv4",
    "DNS",
    "HTTP",
    "TLS",
    "cloud networking",
    "segurança",
    "troubleshooting",
    "DevSecOps",
    "portfólio",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.1",
      "reason": "A aula anterior ensina o método de revisão profissional que será aplicado ao mapa mental."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking é parte essencial do bloco final do mapa mental."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting fornece a trilha de evidência do mapa."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Cibersegurança defensiva fornece a trilha de controle, detecção e resposta."
    }
  ],
  "objectives": [
    "Construir uma visão integrada do curso de redes do bit à cloud.",
    "Relacionar camadas, protocolos, serviços, controles e evidências.",
    "Usar mapa mental como ferramenta de troubleshooting, arquitetura e segurança.",
    "Identificar dependências entre temas básicos e avançados.",
    "Criar um artefato de revisão e portfólio técnico.",
    "Preparar o aluno para os simulados e estudos de caso do Módulo 17."
  ],
  "learningOutcomes": [
    "Dado um fluxo de aplicação, o aluno identifica os blocos de rede envolvidos.",
    "Dado um sintoma, o aluno localiza possíveis camadas de falha no mapa mental.",
    "Dado um desenho cloud, o aluno conecta VPC/VNet, DNS, rotas, políticas, logs e custo.",
    "Dado um alerta de segurança, o aluno identifica fontes de telemetria e controles de resposta.",
    "Dado um tema avançado, o aluno aponta fundamentos pré-requisitos.",
    "Dado o curso completo, o aluno produz um mapa mental autoral e explicável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Esta aula existe para transformar todo o curso em um único mapa mental. Até aqui, o aluno estudou temas profundos: meio físico, Ethernet, VLAN, IPv4, subnetting, roteamento, TCP, UDP, DNS, DHCP, NAT, HTTP, TLS, firewalls, VPN, wireless, cloud, troubleshooting e cibersegurança. O risco agora é guardar cada assunto em uma gaveta separada.</p>\n  <p>O profissional de redes não trabalha com gavetas. Ele trabalha com fluxos. Quando um usuário não acessa uma aplicação, o problema pode envolver cabo, Wi-Fi, VLAN, IP, gateway, DNS, firewall, NAT, proxy, TLS, load balancer, Kubernetes, cloud routing, IAM, WAF, certificado, health check ou aplicação. O mapa mental serve para lembrar que redes são uma cadeia de dependências.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> do bit à cloud, todo serviço depende de um caminho. Quem entende o caminho consegue diagnosticar, proteger, publicar e explicar. Quem só decora siglas enxerga peças soltas.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>O ensino de redes começou muito ligado a telecomunicações, sinais, circuitos, comutação e protocolos. Depois vieram LANs Ethernet, endereçamento IP, roteadores corporativos, firewalls, Wi-Fi, data centers, virtualização, cloud pública, Kubernetes, Zero Trust e automação. Cada nova camada não eliminou as anteriores. Ela se apoiou nelas.</p>\n  <p>Por isso, uma aplicação moderna em cloud ainda depende de conceitos antigos: bits atravessam meios físicos, quadros Ethernet carregam pacotes, pacotes IP seguem rotas, segmentos TCP estabelecem sessões, DNS traduz nomes, TLS protege comunicação, logs registram evidências e políticas definem quem pode falar com quem.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Telecom e sinal:</strong> transmitir bits de forma confiável.</div><div class=\"timeline-item\"><strong>LAN e Ethernet:</strong> conectar máquinas no mesmo domínio local.</div><div class=\"timeline-item\"><strong>IP e roteamento:</strong> interligar redes diferentes.</div><div class=\"timeline-item\"><strong>Aplicações web:</strong> publicar serviços com DNS, HTTP e TLS.</div><div class=\"timeline-item\"><strong>Cloud e segurança:</strong> transformar rede em infraestrutura programável, observável e governada.</div></div>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema é que muitos profissionais sabem resolver pedaços, mas se perdem no encadeamento. Eles conhecem DNS, mas esquecem que DNS depende de rota e firewall. Conhecem TLS, mas esquecem SNI, cadeia de certificados, proxy e load balancer. Conhecem VPC, mas esquecem CIDR, subnet, route table, NAT, security group, DNS privado e flow logs.</p>\n  <p>Sem mapa mental, o aluno tenta diagnosticar incidentes por ferramenta: abre Wireshark, roda ping, consulta logs ou altera firewall sem uma hipótese clara. Isso aumenta risco operacional, gera mudanças desnecessárias, dificulta RCA e pode mascarar problemas reais.</p>\n  <ul>\n    <li><strong>Fragmentação:</strong> conceitos estudados isoladamente não viram raciocínio operacional;</li>\n    <li><strong>Diagnóstico por tentativa:</strong> comandos são usados sem pergunta técnica clara;</li>\n    <li><strong>Falsa causalidade:</strong> correlação é confundida com causa;</li>\n    <li><strong>Ausência de dependências:</strong> temas avançados são revisados sem pré-requisitos;</li>\n    <li><strong>Comunicação fraca:</strong> o profissional sabe algo, mas não consegue explicar fluxo, impacto e risco.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>O mapa mental evolui de uma lista de assuntos para uma arquitetura de raciocínio. Primeiro, o aluno organiza as camadas: física, enlace, rede, transporte e aplicação. Depois adiciona serviços auxiliares: DNS, DHCP, NAT, certificados, logs e autenticação. Em seguida conecta controles: firewall, ACL, proxy, WAF, VPN, segmentação, IAM e observabilidade. Por fim, aplica tudo em cloud, DevSecOps e segurança defensiva.</p>\n  <p>A evolução mais importante é sair da pergunta “qual comando eu uso?” para “qual fluxo deveria acontecer, qual evidência espero ver e qual componente poderia quebrar esse fluxo?”. Esse é o salto de estudante para operador, arquiteto e analista de segurança.</p>\n  <div class=\"callout callout--success\"><strong>Regra de ouro:</strong> primeiro desenhe o fluxo esperado. Depois colete evidências. Só então altere configurações.</div>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>Um mapa mental de redes é uma representação organizada das dependências entre conceitos, camadas, protocolos, controles e evidências. Ele não é apenas um desenho bonito. Ele é uma ferramenta de pensamento. Ajuda a responder: onde estou no fluxo? O que depende do quê? Qual evidência confirma ou nega uma hipótese? Qual mudança pode causar impacto colateral?</p>\n  <p>Nesta aula, o mapa mental será organizado em dez blocos: bits e meio físico, Ethernet/VLAN, IPv4/roteamento, transporte, serviços de rede, aplicação, wireless, segurança, cloud, troubleshooting e cibersegurança. Esses blocos aparecem separados para estudo, mas operam juntos em ambientes reais.</p>\n  <p>O mapa mental completo também conecta três visões: <strong>funcionamento</strong>, <strong>controle</strong> e <strong>evidência</strong>. Funcionamento mostra como o tráfego passa. Controle mostra quem permite, bloqueia ou transforma. Evidência mostra como provar o que ocorreu.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, o mapa funciona como um grafo de dependências. Cada nó representa um conceito. Cada ligação representa uma dependência técnica ou operacional. Por exemplo: HTTPS depende de DNS, IP, TCP, TLS, certificado, política de firewall, rota de retorno e aplicação. Cloud Load Balancer depende de DNS, listener, target group, health check, security groups, subnets e logs.</p>\n  <p>Quando você usa o mapa para troubleshooting, percorre o grafo em ordem: origem, meio, camada 2, IP, gateway, rota, política, NAT, transporte, DNS, TLS, aplicação, observabilidade e retorno. Quando usa o mapa para arquitetura, percorre por requisitos: disponibilidade, latência, segmentação, publicação, acesso privado, logs, custo, governança e operação.</p>\n  <ul>\n    <li><strong>Nó técnico:</strong> VLAN, rota, DNS, TCP, TLS, NAT, VPN, WAF;</li>\n    <li><strong>Nó operacional:</strong> mudança, baseline, rollback, RCA, runbook;</li>\n    <li><strong>Nó de segurança:</strong> segmentação, menor privilégio, egress, telemetria, resposta;</li>\n    <li><strong>Nó de cloud:</strong> VPC/VNet, subnet, route table, private endpoint, flow log;</li>\n    <li><strong>Nó de evidência:</strong> PCAP, flow log, DNS log, firewall log, proxy log, auditoria.</li>\n  </ul>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura do mapa mental segue uma lógica em camadas, mas não fica presa ao modelo OSI. Para revisão profissional, o mais útil é organizar por jornada do tráfego:</p>\n  <ol>\n    <li><strong>Origem:</strong> usuário, endpoint, workload, pod, serviço, identidade;</li>\n    <li><strong>Acesso local:</strong> cabo, Wi-Fi, VLAN, switch, ARP, gateway;</li>\n    <li><strong>Rede intermediária:</strong> roteamento, firewall, NAT, VPN, proxy, transit;</li>\n    <li><strong>Nome e destino:</strong> DNS público/privado, service discovery, endpoint;</li>\n    <li><strong>Transporte e sessão:</strong> TCP, UDP, portas, TLS, certificado;</li>\n    <li><strong>Publicação:</strong> load balancer, WAF, ingress, health check;</li>\n    <li><strong>Controle:</strong> SG/NSG, ACL, IAM, policy as code, Zero Trust;</li>\n    <li><strong>Evidência:</strong> logs, métricas, PCAP, SIEM, auditoria e billing;</li>\n    <li><strong>Operação:</strong> troubleshooting, mitigação, rollback, RCA e melhoria.</li>\n  </ol>\n  <p>Essa arquitetura permite revisar tanto um problema simples, como “não consigo pingar o gateway”, quanto um caso complexo, como “aplicação em Kubernetes na cloud retorna 502 apenas para usuários conectados via VPN”.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em redes como uma cidade. O meio físico são ruas e cabos subterrâneos. Ethernet e Wi-Fi são os bairros locais. IP é o sistema de endereçamento. Roteadores são cruzamentos e estradas entre bairros. DNS é a lista telefônica que transforma nomes em endereços. TCP é uma entrega com confirmação. UDP é uma mensagem rápida sem confirmação formal. Firewalls são portarias e barreiras. Cloud é uma cidade planejada por software. Observabilidade são câmeras, recibos, sensores e registros de pedágio.</p>\n  <p>Sem mapa da cidade, você pode até dirigir por tentativa, mas não consegue explicar congestionamento, bloqueio, rota alternativa, pedágio caro ou área proibida. O mapa mental cumpre esse papel: ele evita que você confunda o sintoma no destino com a causa no caminho.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine que seu notebook não acessa <code>https://app.exemplo.local</code>. Um mapa mental simples força a sequência correta:</p>\n  <ol>\n    <li>O notebook está conectado ao Wi-Fi ou cabo?</li>\n    <li>Recebeu IP, máscara, gateway e DNS?</li>\n    <li>Resolve o nome para o IP correto?</li>\n    <li>Consegue alcançar o gateway?</li>\n    <li>A rota até o destino existe?</li>\n    <li>A porta TCP 443 responde ou dá timeout/reset?</li>\n    <li>O certificado TLS é válido para o nome acessado?</li>\n    <li>O proxy, firewall ou WAF bloqueou?</li>\n    <li>A aplicação está saudável no backend?</li>\n  </ol>\n  <p>O mapa evita pular direto para “o site caiu” quando o problema pode ser DNS, gateway, proxy, certificado ou health check.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, o mapa mental precisa incluir dependências corporativas: VLAN de usuários, NAC, proxy, DNS interno, firewall de borda, VPN, datacenter, Active Directory, SIEM, EDR, WAF e cloud. Um usuário pode abrir chamado dizendo “o sistema financeiro não funciona”, mas o fluxo pode atravessar várias zonas: estação, switch de acesso, VLAN, firewall interno, proxy, DNS, VPN, load balancer, backend e banco.</p>\n  <p>O mapa mental ajuda o time a separar responsabilidades sem criar jogo de empurra. Rede verifica caminho e política. Segurança verifica bloqueios e telemetria. Sistemas verifica aplicação e logs. Identidade verifica autenticação. Cloud verifica subnets, rotas e private endpoints. O atendimento melhora porque todos falam a mesma linguagem de fluxo.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em cloud, o mapa mental precisa expandir conceitos tradicionais. Uma subnet não é apenas um segmento; ela se liga a route tables, NAT Gateway, Internet Gateway, endpoints privados, security groups, NSG, NACL, flow logs e políticas de organização. Um serviço gerenciado não é “magicamente acessível”; ele depende de DNS, IAM, private endpoint, rota e política.</p>\n  <p>Exemplo: uma API em AKS/EKS/GKE não acessa um banco privado. O mapa mental pergunta: o pod tem IP e rota? A NetworkPolicy permite? O DNS privado resolve para IP privado? O security group/NSG permite? O private endpoint está vinculado à VPC/VNet correta? O IAM/service account permite? Há flow logs mostrando tentativa? O problema é rede, identidade, DNS, política ou aplicação?</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, o mapa mental vira teste automatizado. Uma pipeline pode validar se uma nova aplicação possui DNS planejado, TLS válido, health check, security group restritivo, egress control, logs habilitados, tags de custo, rota correta e política de acesso privado. Assim, conhecimento de redes deixa de ser documentação esquecida e vira guardrail.</p>\n  <p>Exemplo: antes de aplicar Terraform, a pipeline pode rejeitar uma regra <code>0.0.0.0/0</code> para SSH, exigir flow logs em subnets críticas, validar que bancos usam private endpoint, conferir que load balancer tem HTTPS e WAF, e garantir que mudanças de rota tenham aprovação. O mapa mental orienta quais controles viram testes.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Em segurança, o mapa mental conecta ataque, defesa e evidência. Movimento lateral depende de caminhos internos. C2 e beaconing dependem de egress. Exfiltração depende de saída, identidade, armazenamento e volume. MITM depende de camada 2 ou confiança indevida. Investigação depende de DNS logs, proxy, firewall, flow logs, EDR, PCAP, IAM e SIEM.</p>\n  <p>O mapa mental também reduz resposta impulsiva. Ao investigar um possível C2, por exemplo, o profissional não bloqueia tudo sem contexto. Ele identifica ativo, processo, destino, DNS, frequência, volume, usuário, reputação, logs de proxy, EDR, firewall, baseline e impacto de contenção. Segurança madura usa rede como fonte de evidência e controle proporcional.</p>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O mapa abaixo resume o curso inteiro como uma cadeia de dependências. A leitura correta não é apenas da esquerda para a direita. Um incidente real pode começar em qualquer ponto e exigir retorno aos fundamentos.</p>\n  <div class=\"diagram diagram--mental-map\" role=\"img\" aria-label=\"Mapa mental do curso de redes do bit à cloud\">\n    <svg viewBox=\"0 0 1200 760\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-17-2-content-diagram-1-title svg-17-2-content-diagram-1-desc\">\n      <title id=\"svg-17-2-content-diagram-1-title\">Mapa mental completo: do bit à cloud</title>\n      <desc id=\"svg-17-2-content-diagram-1-desc\">Diagrama pedagógico da aula 17.2, Mapa mental completo: do bit à cloud, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1702\" viewBox=\"0 0 10 10\" refX=\"8\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n          <path d=\"M 0 0 L 10 5 L 0 10 z\"></path>\n        </marker>\n      </defs>\n      <rect x=\"20\" y=\"20\" width=\"1160\" height=\"720\" rx=\"24\" class=\"svg-bg\"></rect>\n      <text x=\"600\" y=\"62\" text-anchor=\"middle\" class=\"svg-title\">Mapa mental completo — do bit à cloud</text>\n\n      <g class=\"svg-node svg-node--core\">\n        <rect x=\"480\" y=\"325\" width=\"240\" height=\"90\" rx=\"18\"></rect>\n        <text x=\"600\" y=\"360\" text-anchor=\"middle\">Redes</text>\n        <text x=\"600\" y=\"386\" text-anchor=\"middle\">fluxo + controle + evidência</text>\n      </g>\n\n      <g class=\"svg-node\"><rect x=\"70\" y=\"110\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"162\" y=\"143\" text-anchor=\"middle\">Bits e meio físico</text><text x=\"162\" y=\"168\" text-anchor=\"middle\">sinal, cabo, RF</text></g>\n      <g class=\"svg-node\"><rect x=\"300\" y=\"110\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"392\" y=\"143\" text-anchor=\"middle\">Ethernet e VLAN</text><text x=\"392\" y=\"168\" text-anchor=\"middle\">quadros, MAC, STP</text></g>\n      <g class=\"svg-node\"><rect x=\"530\" y=\"110\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"622\" y=\"143\" text-anchor=\"middle\">IP e rotas</text><text x=\"622\" y=\"168\" text-anchor=\"middle\">CIDR, gateway, ICMP</text></g>\n      <g class=\"svg-node\"><rect x=\"760\" y=\"110\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"852\" y=\"143\" text-anchor=\"middle\">Transporte</text><text x=\"852\" y=\"168\" text-anchor=\"middle\">TCP, UDP, portas</text></g>\n      <g class=\"svg-node\"><rect x=\"990\" y=\"110\" width=\"145\" height=\"82\" rx=\"16\"></rect><text x=\"1062\" y=\"143\" text-anchor=\"middle\">Aplicação</text><text x=\"1062\" y=\"168\" text-anchor=\"middle\">DNS, HTTP, TLS</text></g>\n\n      <g class=\"svg-node\"><rect x=\"70\" y=\"560\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"162\" y=\"593\" text-anchor=\"middle\">Wireless</text><text x=\"162\" y=\"618\" text-anchor=\"middle\">RF, WPA, roaming</text></g>\n      <g class=\"svg-node\"><rect x=\"300\" y=\"560\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"392\" y=\"593\" text-anchor=\"middle\">Segurança</text><text x=\"392\" y=\"618\" text-anchor=\"middle\">segmentação, logs</text></g>\n      <g class=\"svg-node\"><rect x=\"530\" y=\"560\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"622\" y=\"593\" text-anchor=\"middle\">Cloud</text><text x=\"622\" y=\"618\" text-anchor=\"middle\">VPC, LB, private link</text></g>\n      <g class=\"svg-node\"><rect x=\"760\" y=\"560\" width=\"185\" height=\"82\" rx=\"16\"></rect><text x=\"852\" y=\"593\" text-anchor=\"middle\">Troubleshooting</text><text x=\"852\" y=\"618\" text-anchor=\"middle\">hipótese, evidência, RCA</text></g>\n      <g class=\"svg-node\"><rect x=\"990\" y=\"560\" width=\"145\" height=\"82\" rx=\"16\"></rect><text x=\"1062\" y=\"593\" text-anchor=\"middle\">Cyber</text><text x=\"1062\" y=\"618\" text-anchor=\"middle\">Blue Team, DFIR</text></g>\n\n      <g class=\"svg-links\">\n        <path d=\"M255 151 L300 151\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M485 151 L530 151\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M715 151 L760 151\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M945 151 L990 151\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M162 192 C200 270 330 330 480 360\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M392 192 C440 260 500 300 545 325\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M622 192 L622 325\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M852 192 C800 260 720 305 675 325\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M1062 192 C960 270 820 320 720 355\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M480 385 C330 430 210 500 162 560\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M520 415 C470 470 420 520 392 560\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M600 415 L622 560\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M680 415 C730 470 805 515 852 560\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M720 386 C840 430 1000 500 1062 560\" marker-end=\"url(#arrow1702)\"></path>\n        <path d=\"M1062 560 C1040 475 900 410 720 385\" marker-end=\"url(#arrow1702)\" class=\"svg-link--feedback\"></path>\n        <path d=\"M852 560 C820 505 760 450 695 410\" marker-end=\"url(#arrow1702)\" class=\"svg-link--feedback\"></path>\n      </g>\n\n      <g class=\"svg-note\">\n        <rect x=\"390\" y=\"690\" width=\"420\" height=\"34\" rx=\"12\"></rect>\n        <text x=\"600\" y=\"713\" text-anchor=\"middle\">Regra mental: fluxo antes da ferramenta, evidência antes da conclusão.</text>\n      </g>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios verificam se o aluno consegue usar o mapa mental como ferramenta de raciocínio. O foco não é decorar todos os nós, mas explicar dependências e trajetos.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio é montar um mapa mental autoral, com pelo menos 40 nós, conectando do bit à cloud e incluindo uma trilha de troubleshooting e uma trilha de segurança defensiva.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como avaliar se o mapa mental realmente ajuda a pensar. Um bom mapa não é o mais cheio; é o que revela dependências, pontos de controle e fontes de evidência.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Nesta aula, você consolidou o curso inteiro em um mapa mental do bit à cloud. Redes foram vistas como fluxo, controle e evidência. O mapa conectou fundamentos físicos, Ethernet, VLAN, IP, rotas, transporte, DNS, HTTP/TLS, wireless, segurança, cloud, troubleshooting e cibersegurança.</p>\n  <p>O aprendizado principal é que a competência profissional surge quando você consegue navegar entre camadas. Um problema de aplicação pode nascer em DNS. Um problema de TLS pode nascer em proxy. Um problema de cloud pode nascer em CIDR. Um incidente de segurança pode ser visível primeiro em flow logs. O mapa mental impede análise estreita demais.</p>\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C01</td><td>Fundamentos, OSI e encapsulamento</td><td>70%</td><td>90%</td><td>explica fluxo de dados por camadas e reconhece onde cada evidência aparece</td></tr><tr><td>C02</td><td>Ethernet, ARP, VLAN, switching e camada 2</td><td>70%</td><td>90%</td><td>diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast</td></tr><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C04</td><td>TCP, UDP, portas e serviços essenciais</td><td>75%</td><td>90%</td><td>diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs</td></tr><tr><td>C05</td><td>HTTP, TLS, proxy, firewall, VPN e publicação segura</td><td>75%</td><td>90%</td><td>interpreta erros de aplicação/rede e propõe controles com rollback</td></tr><tr><td>C06</td><td>Wireless, segurança defensiva e Blue Team</td><td>75%</td><td>90%</td><td>define escopo autorizado, telemetria, detecção, contenção e mitigação</td></tr><tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, começaremos os simulados. A aula 17.3 será o <strong>Simulado I: Fundamentos, OSI, Ethernet e IPv4</strong>. O mapa mental desta aula será usado como referência para revisar os primeiros blocos do curso antes da avaliação.</p>\n</section>"
  },
  "exercises": [
    {
      "title": "Fluxo HTTPS ponta a ponta",
      "prompt": "Liste todos os blocos do mapa mental envolvidos quando um usuário acessa uma aplicação HTTPS publicada atrás de WAF e Load Balancer.",
      "difficulty": "intermediário",
      "expectedAnswer": "Deve incluir origem, DNS, rota, firewall/proxy, TCP 443, TLS/SNI/certificado, WAF, LB, health check, backend, logs e retorno."
    },
    {
      "title": "Dependência cloud",
      "prompt": "Explique por que Private Link depende de DNS privado e política de acesso.",
      "difficulty": "intermediário-avançado",
      "expectedAnswer": "Sem DNS privado o nome pode resolver para endpoint público; sem política/IAM/SG/NSG o acesso privado não garante autorização correta."
    },
    {
      "title": "Mapa de segurança",
      "prompt": "Conecte movimento lateral, segmentação, flow logs e SIEM em uma sequência defensiva.",
      "difficulty": "avançado",
      "expectedAnswer": "Movimento lateral tenta alcançar ativos internos; segmentação reduz caminhos; flow logs registram tentativas; SIEM correlaciona e aciona resposta."
    },
    {
      "title": "Mapa de troubleshooting",
      "prompt": "Um serviço retorna 503. Quais blocos do mapa você investigaria antes de culpar a aplicação?",
      "difficulty": "avançado",
      "expectedAnswer": "DNS, rota, firewall, TCP, TLS, proxy/WAF, load balancer, health check, target group/backend, Kubernetes Service/Ingress e logs."
    },
    {
      "id": "ex17.2.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C01, C02, C03, C04, C05, C06, C07, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "quiz": [
    {
      "question": "Qual é a principal função do mapa mental nesta aula?",
      "options": [
        "Substituir todos os laboratórios.",
        "Organizar dependências entre conceitos, controles e evidências.",
        "Decorar nomes de protocolos.",
        "Eliminar a necessidade de troubleshooting."
      ],
      "answer": 1,
      "explanation": "O mapa mental organiza relações para apoiar diagnóstico, arquitetura e revisão."
    },
    {
      "question": "Qual trio resume melhor redes profissionais nesta aula?",
      "options": [
        "Velocidade, marca e preço.",
        "Fluxo, controle e evidência.",
        "Comando, senha e terminal.",
        "Memorização, sorte e tentativa."
      ],
      "answer": 1,
      "explanation": "Fluxo mostra o caminho, controle mostra permissões e transformações, evidência prova o que ocorreu."
    },
    {
      "question": "Por que temas avançados dependem dos fundamentos?",
      "options": [
        "Porque cloud elimina rede tradicional.",
        "Porque tecnologias novas ainda usam endereçamento, rotas, DNS, transporte e políticas.",
        "Porque fundamentos servem apenas para provas.",
        "Porque segurança dispensa conectividade."
      ],
      "answer": 1,
      "explanation": "Cloud, Kubernetes e segurança se apoiam em fundamentos de rede."
    },
    {
      "question": "Em troubleshooting, o mapa mental ajuda principalmente a evitar o quê?",
      "options": [
        "Documentação.",
        "Coleta de evidências.",
        "Tentativa e erro sem hipótese.",
        "Comunicação entre times."
      ],
      "answer": 2,
      "explanation": "O mapa orienta hipóteses e evidências antes de alterações."
    },
    {
      "question": "Qual item pertence à trilha de evidência do mapa?",
      "options": [
        "Flow logs.",
        "Cor do cabo.",
        "Nome comercial do notebook.",
        "Preferência pessoal do analista."
      ],
      "answer": 0,
      "explanation": "Flow logs são fonte de evidência de tráfego."
    },
    {
      "question": "Um bom mapa mental de redes deve ser avaliado por quê?",
      "options": [
        "Quantidade de siglas sem ligação.",
        "Capacidade de explicar fluxos, falhas, controles e evidências.",
        "Uso de imagens externas.",
        "Tamanho visual apenas."
      ],
      "answer": 1,
      "explanation": "O valor do mapa está em apoiar raciocínio técnico aplicável."
    }
  ],
  "flashcards": [
    {
      "front": "Qual é a regra mental da aula 17.2?",
      "back": "Fluxo antes da ferramenta, evidência antes da conclusão."
    },
    {
      "front": "O que significa 'do bit à cloud'?",
      "back": "Entender a cadeia completa desde sinal e enlace até serviços cloud, segurança, observabilidade e operação."
    },
    {
      "front": "Quais são as três trilhas de um mapa mental profissional de redes?",
      "back": "Conectividade, segurança/controle e evidência/operação."
    },
    {
      "front": "Por que DNS aparece em tantas partes do mapa?",
      "back": "Porque nomes conectam usuários, serviços, cloud, private endpoints, Kubernetes e investigação."
    },
    {
      "front": "Qual erro o mapa mental ajuda a evitar?",
      "back": "Diagnóstico por tentativa e erro sem hipótese técnica clara."
    },
    {
      "front": "Como usar o mapa em portfólio?",
      "back": "Explicando um fluxo real ponta a ponta, com pontos de falha, controles, logs e decisões arquiteturais."
    }
  ],
  "mentorQuestions": [
    "Qual bloco do seu mapa mental ainda parece uma lista decorada e não uma dependência real?",
    "Você consegue explicar um acesso HTTPS corporativo usando o mapa sem pular DNS, rota, TCP, TLS e logs?",
    "Qual caminho do mapa seria mais útil no seu trabalho atual: cloud, segurança, troubleshooting ou wireless?"
  ],
  "challenge": {
    "title": "Mapa mental autoral do bit à cloud",
    "scenario": "Você precisa apresentar para um colega de TI como o curso de redes se conecta ao trabalho real de infraestrutura, cloud, DevSecOps e segurança. Seu artefato será um mapa mental completo e explicável.",
    "tasks": [
      "Criar pelo menos 40 nós organizados por blocos.",
      "Incluir setas de dependência entre conceitos.",
      "Criar uma trilha de conectividade ponta a ponta.",
      "Criar uma trilha de segurança defensiva.",
      "Criar uma trilha de troubleshooting com fontes de evidência.",
      "Explicar um fluxo HTTPS cloud usando o mapa.",
      "Registrar três lacunas descobertas durante a criação.",
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "successCriteria": [
      "O mapa não é apenas lista de siglas.",
      "Há relações explícitas entre fundamentos e temas avançados.",
      "O mapa permite diagnosticar um sintoma real.",
      "O mapa inclui controles e logs.",
      "O mapa pode ser usado como artefato de portfólio.",
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
        "points": 7,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: explica fluxo de dados por camadas e reconhece onde cada evidência aparece."
      },
      {
        "criterion": "C02 — Ethernet, ARP, VLAN, switching e camada 2",
        "points": 7,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast."
      },
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
      },
      {
        "criterion": "C04 — TCP, UDP, portas e serviços essenciais",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs."
      },
      {
        "criterion": "C05 — HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: interpreta erros de aplicação/rede e propõe controles com rollback."
      },
      {
        "criterion": "C06 — Wireless, segurança defensiva e Blue Team",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: define escopo autorizado, telemetria, detecção, contenção e mitigação."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 7,
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
    "summary": "Uma solução madura organiza o mapa em trilhas: conectividade, serviços, publicação, cloud, segurança, observabilidade e operação. Cada trilha possui dependências e evidências.",
    "steps": [
      "Começar pelo centro: redes como fluxo, controle e evidência.",
      "Adicionar fundamentos físicos e camada 2.",
      "Conectar IPv4, CIDR, gateway e rotas.",
      "Adicionar transporte, DNS, DHCP e NAT.",
      "Adicionar HTTP/TLS, proxy, WAF e load balancer.",
      "Adicionar cloud: VPC/VNet, subnets, rotas, private endpoints, VPN/BGP e Kubernetes.",
      "Adicionar segurança: segmentação, Zero Trust, egress, C2, exfiltração, DLP e DFIR.",
      "Adicionar evidências: PCAP, flow logs, DNS logs, firewall logs, proxy logs, EDR, SIEM e auditoria.",
      "Revisar se cada nó avançado possui pré-requisitos ligados.",
      "Usar o mapa para explicar um fluxo real e corrigir lacunas.",
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonMistakes": [
      "Criar lista de tecnologias sem relações.",
      "Esquecer rota de retorno.",
      "Tratar cloud como algo separado de redes tradicionais.",
      "Não incluir evidências e logs.",
      "Misturar ataque e defesa sem limites éticos.",
      "Não transformar lacunas em revisão prática."
    ],
    "reasoning": "Uma solução madura organiza o mapa em trilhas: conectividade, serviços, publicação, cloud, segurança, observabilidade e operação. Cada trilha possui dependências e evidências. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
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
      "term": "Mapa mental técnico",
      "shortDefinition": "Representação de conceitos e dependências técnicas.",
      "longDefinition": "Ferramenta visual que conecta fundamentos, protocolos, controles, serviços e evidências para apoiar revisão, diagnóstico e arquitetura.",
      "example": "Mapa que liga DNS a resolvedor, TTL, split-horizon, Private Endpoint e logs.",
      "relatedTerms": [
        "dependência",
        "revisão ativa"
      ],
      "relatedLessons": [
        "17.1",
        "17.2"
      ]
    },
    {
      "term": "Fluxo ponta a ponta",
      "shortDefinition": "Caminho completo entre origem e destino.",
      "longDefinition": "Sequência de componentes atravessados por uma comunicação, incluindo origem, rede local, roteamento, políticas, transporte, aplicação e retorno.",
      "example": "Usuário → DNS → proxy → firewall → LB → backend → logs.",
      "relatedTerms": [
        "troubleshooting",
        "rota de retorno"
      ],
      "relatedLessons": [
        "15.12",
        "17.2"
      ]
    },
    {
      "term": "Dependência técnica",
      "shortDefinition": "Relação em que um recurso precisa de outro para funcionar.",
      "longDefinition": "Vínculo entre componentes, como TLS depender de TCP e certificados, ou Private Link depender de DNS privado e política de acesso.",
      "example": "Kubernetes Ingress depende de Service, endpoints, DNS e Load Balancer.",
      "relatedTerms": [
        "arquitetura",
        "pré-requisito"
      ],
      "relatedLessons": [
        "14.11",
        "17.2"
      ]
    },
    {
      "term": "Trilha de evidência",
      "shortDefinition": "Conjunto de fontes usadas para provar o que ocorreu.",
      "longDefinition": "Caminho de investigação que combina logs, métricas, PCAP, auditoria e eventos para confirmar ou negar hipóteses.",
      "example": "PCAP, flow logs, firewall logs, proxy logs e SIEM em um incidente HTTP.",
      "relatedTerms": [
        "DFIR",
        "SIEM"
      ],
      "relatedLessons": [
        "16.11",
        "17.2"
      ]
    },
    {
      "term": "Trilha de controle",
      "shortDefinition": "Conjunto de pontos que permitem, bloqueiam ou transformam tráfego.",
      "longDefinition": "Camada lógica de políticas e dispositivos como firewall, ACL, SG/NSG, proxy, WAF, IAM e NAC.",
      "example": "Security Group permite 443 apenas do Load Balancer.",
      "relatedTerms": [
        "menor privilégio",
        "segmentação"
      ],
      "relatedLessons": [
        "13.2",
        "16.7"
      ]
    },
    {
      "term": "Modelo mental",
      "shortDefinition": "Forma interna de entender e prever funcionamento.",
      "longDefinition": "Estrutura cognitiva que ajuda o profissional a raciocinar sobre sistemas, antecipar falhas e explicar relações.",
      "example": "Pensar em HTTP como dependente de DNS, TCP, TLS, proxy e backend.",
      "relatedTerms": [
        "mapa mental",
        "arquitetura"
      ],
      "relatedLessons": [
        "17.1",
        "17.2"
      ]
    }
  ],
  "references": [
    {
      "type": "official-standard",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Referência histórica para o bloco IP do mapa mental."
    },
    {
      "type": "official-standard",
      "title": "RFC 9293 — Transmission Control Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9293",
      "note": "Referência para a trilha de transporte TCP."
    },
    {
      "type": "official-standard",
      "title": "RFC 9110 — HTTP Semantics",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9110",
      "note": "Referência para o bloco de aplicação HTTP."
    },
    {
      "type": "official-doc",
      "title": "NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Referência para conectar redes a governança, proteção, detecção, resposta e recuperação."
    },
    {
      "type": "official-doc",
      "title": "Kubernetes Services, Load Balancing, and Networking",
      "organization": "Kubernetes",
      "url": "https://kubernetes.io/docs/concepts/services-networking/",
      "note": "Referência para o bloco de Kubernetes Networking em cloud."
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
        "name": "Risco de avaliação sem evidência — Mapa mental completo: do bit à cloud",
        "description": "Em Mapa mental completo: do bit à cloud, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.2."
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
      "Qual evidência comprova o entendimento da aula 17.2?"
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
      "17.3"
    ]
  },
  "assessmentBlueprint": {
    "id": "assessment-17.2",
    "title": "Avaliação por competência — Mapa mental completo: do bit à cloud",
    "assessmentType": "mapa mental avaliativo",
    "competencies": [
      {
        "id": "C01",
        "name": "Fundamentos, OSI e encapsulamento",
        "modules": [
          "M00",
          "M01",
          "M02"
        ],
        "minimum": 70,
        "mastery": 90,
        "evidence": "explica fluxo de dados por camadas e reconhece onde cada evidência aparece"
      },
      {
        "id": "C02",
        "name": "Ethernet, ARP, VLAN, switching e camada 2",
        "modules": [
          "M03"
        ],
        "minimum": 70,
        "mastery": 90,
        "evidence": "diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast"
      },
      {
        "id": "C03",
        "name": "IPv4, subnetting, gateway e roteamento básico",
        "modules": [
          "M04",
          "M05",
          "M11"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "calcula redes, identifica rota local/default e justifica escolha de caminho"
      },
      {
        "id": "C04",
        "name": "TCP, UDP, portas e serviços essenciais",
        "modules": [
          "M06",
          "M07"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs"
      },
      {
        "id": "C05",
        "name": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "modules": [
          "M08",
          "M09",
          "M10"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "interpreta erros de aplicação/rede e propõe controles com rollback"
      },
      {
        "id": "C06",
        "name": "Wireless, segurança defensiva e Blue Team",
        "modules": [
          "M12",
          "M13",
          "M16"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "define escopo autorizado, telemetria, detecção, contenção e mitigação"
      },
      {
        "id": "C07",
        "name": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "modules": [
          "M14"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos"
      },
      {
        "id": "C08",
        "name": "Troubleshooting profissional, RCA e comunicação",
        "modules": [
          "M15",
          "M17"
        ],
        "minimum": 80,
        "mastery": 92,
        "evidence": "transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência"
      }
    ],
    "passingCriteria": {
      "minimumScorePercent": 75,
      "masteryScorePercent": 90,
      "requiredEvidence": "correção comentada, matriz de lacunas, evidências do laboratório e plano de revisão",
      "mustRedoWhen": "qualquer competência crítica ficar abaixo do mínimo ou quando a resposta correta não puder ser explicada com evidência"
    },
    "gradingRubric": [
      {
        "criterion": "C01 — Fundamentos, OSI e encapsulamento",
        "points": 7,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: explica fluxo de dados por camadas e reconhece onde cada evidência aparece."
      },
      {
        "criterion": "C02 — Ethernet, ARP, VLAN, switching e camada 2",
        "points": 7,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast."
      },
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
      },
      {
        "criterion": "C04 — TCP, UDP, portas e serviços essenciais",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs."
      },
      {
        "criterion": "C05 — HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: interpreta erros de aplicação/rede e propõe controles com rollback."
      },
      {
        "criterion": "C06 — Wireless, segurança defensiva e Blue Team",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: define escopo autorizado, telemetria, detecção, contenção e mitigação."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 7,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 7,
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
    ],
    "feedbackBands": [
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
        "competencyId": "C04",
        "competency": "TCP, UDP, portas e serviços essenciais",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M06, M07 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C05",
        "competency": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M08, M09, M10 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para interpreta erros de aplicação/rede e propõe controles com rollback",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C06",
        "competency": "Wireless, segurança defensiva e Blue Team",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M12, M13, M16 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para define escopo autorizado, telemetria, detecção, contenção e mitigação",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C07",
        "competency": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M14 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos",
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
    ],
    "evidenceRequired": [
      "pontuação bruta e pontuação por competência",
      "lista de erros classificados por causa raiz de aprendizagem",
      "print ou transcrição dos comandos/labs quando aplicável",
      "plano de revisão com prazo e reteste",
      "registro de confiança antes e depois da correção"
    ]
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
        "competencyId": "C04",
        "competency": "TCP, UDP, portas e serviços essenciais",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M06, M07 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C05",
        "competency": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M08, M09, M10 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para interpreta erros de aplicação/rede e propõe controles com rollback",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C06",
        "competency": "Wireless, segurança defensiva e Blue Team",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M12, M13, M16 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para define escopo autorizado, telemetria, detecção, contenção e mitigação",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C07",
        "competency": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M14 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos",
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
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
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
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    }
  ]
};
