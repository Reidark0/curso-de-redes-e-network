export const lesson1709 = {
  "id": "17.9",
  "moduleId": "m17",
  "order": 9,
  "title": "Checklist de laboratórios e portfólio profissional",
  "subtitle": "Transforme os laboratórios do curso em evidências profissionais: checklist, rubrica, README, diagramas, artefatos sanitizados, dossiês técnicos e portfólio de redes.",
  "duration": "210-300 min",
  "estimatedStudyTimeMinutes": 300,
  "difficulty": "avançado",
  "type": "portfólio",
  "xp": 340,
  "tags": [
    "portfólio",
    "checklist",
    "laboratórios",
    "README",
    "evidências",
    "rubrica",
    "carreira",
    "Git",
    "documentação",
    "redes",
    "cloud",
    "segurança",
    "avaliação por competência",
    "feedback",
    "plano de revisão"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.8",
      "reason": "Os estudos de caso anteriores fornecem material para transformar investigação em artefato de portfólio."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting profissional fornece base para evidências, RCA, rollback e playbooks."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Segurança defensiva fornece base para sanitização, telemetria, resposta e ética."
    }
  ],
  "objectives": [
    "Criar um checklist profissional para laboratórios de redes.",
    "Transformar laboratórios em artefatos de portfólio com problema, topologia, evidências e validações.",
    "Definir uma rubrica de qualidade para avaliar clareza, profundidade, segurança, operação e custo.",
    "Aprender a sanitizar dados técnicos antes de publicar ou compartilhar artefatos.",
    "Organizar um repositório de portfólio com README, índice, templates e estudos de caso.",
    "Conectar portfólio com entrevistas, revisão contínua, certificações e evolução profissional."
  ],
  "learningOutcomes": [
    "Montar uma estrutura de diretórios para portfólio técnico de redes.",
    "Escrever README técnico com objetivo, topologia, validação, troubleshooting e riscos.",
    "Diferenciar evidência real de print sem contexto.",
    "Criar checklist de cobertura para fundamentos, cloud, segurança e troubleshooting.",
    "Aplicar sanitização de dados técnicos e pessoais antes de compartilhar artefatos.",
    "Planejar melhorias contínuas a partir das lacunas identificadas."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Depois de dezenas de aulas, laboratórios, simulados e estudos de caso, o maior risco é deixar o conhecimento preso dentro do curso. Um profissional evolui quando transforma prática em evidência: diagramas, matrizes, relatórios, decisões justificadas, RCA, playbooks e repositórios que mostram raciocínio técnico.</p>\n  <p>Esta aula existe para resolver um problema comum: estudantes fazem muitos laboratórios, mas não conseguem provar para si mesmos, para uma equipe ou para uma entrevista que realmente dominaram o assunto. O checklist de laboratórios e o portfólio profissional convertem estudo em documentação verificável.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> um portfólio técnico forte não é uma vitrine de prints. É uma coleção organizada de problemas, hipóteses, decisões, evidências, validações, riscos e melhorias.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>Na infraestrutura tradicional, muita aprendizagem acontecia de forma invisível: o profissional configurava switches, corrigia rotas, resolvia incidentes e o conhecimento ficava em tickets, conversas ou memória operacional. Com DevOps, cloud, Git, automação e documentação como código, ficou cada vez mais importante registrar decisões de forma versionada.</p>\n  <p>A evolução do mercado também mudou a forma de avaliar competência. Certificados continuam úteis, mas equipes maduras querem ver evidências: como você desenha uma rede, como isola um problema, como justifica uma regra de firewall, como trata exceções, como documenta rollback e como transforma incidentes em melhoria contínua.</p>\n  <p>O portfólio técnico nasce dessa mudança: não para expor dados sensíveis ou ambientes reais indevidamente, mas para demonstrar pensamento, método e maturidade operacional usando cenários fictícios, laboratórios próprios, diagramas sanitizados e relatórios reproduzíveis.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>Sem checklist, o aluno pode concluir o curso com lacunas invisíveis. Ele talvez saiba responder perguntas isoladas sobre VLAN, DNS, NAT ou TLS, mas não consiga montar um fluxo ponta a ponta, explicar uma decisão de segmentação ou escrever um RCA profissional.</p>\n  <p>Sem portfólio, o aprendizado também perde rastreabilidade. Se alguém perguntar “o que você sabe fazer em redes?”, uma resposta genérica como “sei TCP/IP, DNS, firewall e cloud” é fraca. Uma resposta forte mostra artefatos: diagrama de topologia, matriz de fluxos, plano CIDR, relatório de troubleshooting, checklist de segurança, simulado corrigido e projeto final.</p>\n  <ul><li>Como provar que um laboratório foi realmente entendido?</li><li>Como evitar portfólio cheio de prints sem contexto?</li><li>Como documentar sem vazar IPs, nomes internos, credenciais ou dados reais?</li><li>Como conectar laboratórios de redes a segurança, cloud e DevSecOps?</li><li>Como transformar o curso em um material útil para revisão, entrevista e crescimento profissional?</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A evolução correta começa com laboratórios soltos, passa por checklists padronizados e termina em estudos de caso documentados. No começo, o aluno registra “configurei uma VLAN”. Depois, evolui para “projetei segmentação por zonas, validei fluxo permitido, provei bloqueio de movimento lateral, registrei logs e escrevi rollback”.</p>\n  <p>Esse salto é o objetivo da aula: transformar execução técnica em evidência profissional. O checklist garante cobertura mínima. A rubrica mede qualidade. O portfólio organiza narrativas técnicas. O roadmap posterior ajuda a escolher quais lacunas merecem estudo adicional.</p>\n  <p>A partir daqui, cada laboratório do curso deve ser visto como um artefato de carreira. O conteúdo não termina no navegador do curso; ele se converte em repositório, documentação pessoal, mapa mental, relatório e base de revisão contínua.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p>Um checklist de laboratórios é uma lista estruturada de competências práticas esperadas. Ele não pergunta apenas se você “fez” a atividade, mas se você entendeu o objetivo, desenhou a topologia, executou passos, validou resultado, documentou troubleshooting, identificou riscos e sugeriu melhorias.</p>\n  <p>Um portfólio profissional é uma coleção sanitizada e organizada de artefatos que demonstram capacidade técnica. Em redes, bons artefatos incluem diagramas, tabelas CIDR, matrizes de fluxo, políticas de firewall, evidências de troubleshooting, consultas de logs, relatórios de RCA, playbooks defensivos e decisões arquiteturais.</p>\n  <div class=\"callout callout--warning\"><strong>Atenção:</strong> portfólio não deve conter credenciais, dados pessoais, IPs reais sensíveis, nomes internos de empresas, dumps de tráfego com dados privados ou informações que violem contrato, LGPD ou política interna.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno de um portfólio técnico maduro tem quatro camadas. A primeira é a camada de cenário: qual problema existia, qual ambiente foi simulado e quais restrições foram assumidas. A segunda é a camada de arquitetura: topologia, fluxos, zonas, endereçamento, dependências e controles. A terceira é a camada de evidência: comandos, logs, capturas, resultados de teste, prints sanitizados e tabelas. A quarta é a camada de decisão: por que uma solução foi escolhida, quais alternativas existiam, quais riscos permaneceram e quais melhorias seriam feitas.</p>\n  <p>Esse modelo impede que o portfólio vire apenas um álbum de imagens. Cada artefato precisa responder: problema, hipótese, implementação, validação, segurança, custo, operação e aprendizado. Essa estrutura também facilita entrevistas, revisões e evolução contínua.</p>\n  <p>Internamente, o checklist funciona como controle de qualidade. Ele revela lacunas: talvez o aluno tenha feito roteamento, mas não documentou retorno; talvez tenha desenhado firewall, mas não criou matriz de fluxos; talvez tenha usado cloud, mas ignorou custo de NAT e logs.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>A arquitetura recomendada do portfólio possui uma estrutura simples e repetível. Um repositório principal organiza os domínios do curso: fundamentos, Ethernet, IPv4, DNS, TCP/UDP, HTTP/TLS, firewall, VPN, wireless, cloud networking, troubleshooting, segurança defensiva e capstone.</p>\n  <p>Cada laboratório deve ter seu próprio diretório com README, diagrama SVG ou Markdown Mermaid quando permitido fora deste curso, topologia, objetivos, pré-requisitos, passos, validações, evidências sanitizadas, troubleshooting, riscos, melhorias e links internos para conceitos relacionados.</p>\n  <ul><li>README principal: explica objetivo, escopo, ética e índice do portfólio.</li><li>Diretórios por domínio: facilitam revisão modular.</li><li>Templates: mantêm padrão entre laboratórios.</li><li>Evidências sanitizadas: mostram resultado sem expor dados sensíveis.</li><li>RCA e playbooks: demonstram maturidade além de configuração.</li><li>Checklist de progresso: mostra domínio, pendências e próximos estudos.</li></ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Pense no portfólio como um prontuário técnico. Um prontuário ruim diz apenas “paciente melhorou”. Um prontuário bom registra sintomas, exames, hipóteses, conduta, resposta ao tratamento e acompanhamento. Em redes, o mesmo vale: “DNS corrigido” é pouco; “cliente consultava resolvedor errado por opção DHCP, evidenciado por comparação entre resolvers, corrigido por ajuste de escopo, validado com consulta interna e registrado com rollback” é profissional.</p>\n  <p>Outra analogia é a de um engenheiro civil. Ele não prova competência mostrando uma foto de uma ponte pronta. Ele apresenta cálculo, planta, material, restrições, inspeção, teste de carga e manutenção. Em redes, diagramas, matrizes, logs, PCAPs sanitizados e decisões arquiteturais fazem esse papel.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Um exemplo simples de artefato seria um laboratório de DNS local. Em vez de salvar apenas um print do comando funcionando, o aluno documenta: objetivo, topologia, zona, registros criados, consulta esperada, resultado real, efeito do cache, TTL, erro proposital NXDOMAIN, troubleshooting e resumo.</p>\n  <p>O README do laboratório poderia conter: “Problema: aplicações dependem de nomes, não de IPs. Objetivo: entender resolução direta e reversa. Validação: consultas A, CNAME e PTR a partir de dois clientes. Falha simulada: registro incorreto com TTL alto. Aprendizado: DNS pode continuar falhando após correção por causa de cache”.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um bom artefato de portfólio poderia ser um desenho sanitizado de segmentação. O cenário fictício descreve usuários, servidores, banco, backup, administração, Wi-Fi convidado e SOC. A documentação mostra matriz de fluxos, regras permitidas, bloqueios esperados, logs gerados e exceções com prazo.</p>\n  <p>Esse artefato demonstra mais do que conhecimento de VLAN ou firewall. Ele mostra capacidade de pensar em risco, operação e governança: quem precisa falar com quem, por qual porta, com qual justificativa, qual log comprova, qual impacto se bloquear e qual processo aprova exceção.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, um laboratório de portfólio pode documentar uma landing zone conceitual: VPC/VNet, subnets públicas e privadas, route tables, NAT, private endpoints, DNS privado, flow logs, security groups, hub-spoke e custos esperados.</p>\n  <p>O diferencial é incluir decisões. Por exemplo: “banco não terá endpoint público porque o acesso será por private endpoint”; “egress passará por NAT e firewall para auditoria”; “logs terão retenção mínima”; “ambientes dev e prod terão CIDRs diferentes para evitar conflito futuro”; “mudanças serão propostas por IaC e revisadas por política”.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, o portfólio deve mostrar que infraestrutura de rede pode ser validada antes do deploy. Um exemplo é um pipeline fictício que checa se uma regra de firewall contém `0.0.0.0/0` para porta administrativa, se uma subnet pública foi criada sem justificativa, se flow logs estão desabilitados ou se um endpoint crítico não tem tag de dono.</p>\n  <p>O artefato não precisa provisionar recursos reais. Ele pode conter exemplos de policy as code, checklist de revisão, testes sintéticos e plano de rollback. O importante é demonstrar que segurança e rede entram no ciclo de entrega, não apenas depois do incidente.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, um artefato forte pode ser um playbook defensivo de exfiltração suspeita. Ele descreve sinais de proxy, DNS, flow logs, EDR, DLP e billing; define critérios de severidade; lista ações proporcionais; protege evidências; e fecha com RCA e melhorias.</p>\n  <p>O portfólio deve evitar conteúdo ofensivo operacional e focar em defesa: hipótese, telemetria, classificação, contenção, erradicação, recuperação e melhoria. Isso mostra maturidade ética e operacional, especialmente para quem trabalha ou deseja trabalhar em Segurança da Informação.</p>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama abaixo mostra como laboratórios viram portfólio profissional quando passam por padronização, evidência, sanitização e revisão.</p>\n  <div class=\"diagram-container\" role=\"img\" aria-label=\"Fluxo de criação de portfólio profissional a partir de laboratórios de redes\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 1120 620\" xmlns=\"http://www.w3.org/2000/svg\" aria-labelledby=\"portfolio-title portfolio-desc\" role=\"img\">\n      <title id=\"portfolio-title\">Checklist de laboratórios e portfólio profissional</title>\n      <desc id=\"portfolio-desc\">Fluxo que transforma laboratório em artefato profissional com cenário, arquitetura, evidência, sanitização, revisão e publicação.</desc>\n      <defs>\n        <marker id=\"arrow-1709\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-fill-accent\" />\n        </marker>\n      </defs>\n      <rect x=\"20\" y=\"20\" width=\"1080\" height=\"580\" rx=\"24\" class=\"svg-bg\" />\n      <text x=\"560\" y=\"60\" text-anchor=\"middle\" class=\"svg-title\">Do laboratório ao portfólio profissional</text>\n\n      <g class=\"svg-node\">\n        <rect x=\"60\" y=\"120\" width=\"180\" height=\"90\" rx=\"16\" class=\"svg-box\" />\n        <text x=\"150\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Laboratório</text>\n        <text x=\"150\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">problema + topologia</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"285\" y=\"120\" width=\"180\" height=\"90\" rx=\"16\" class=\"svg-box\" />\n        <text x=\"375\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Execução</text>\n        <text x=\"375\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">passos + validação</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"510\" y=\"120\" width=\"180\" height=\"90\" rx=\"16\" class=\"svg-box\" />\n        <text x=\"600\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n        <text x=\"600\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">logs + testes + RCA</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"735\" y=\"120\" width=\"180\" height=\"90\" rx=\"16\" class=\"svg-box\" />\n        <text x=\"825\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Sanitização</text>\n        <text x=\"825\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">sem dados sensíveis</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"940\" y=\"120\" width=\"120\" height=\"90\" rx=\"16\" class=\"svg-box\" />\n        <text x=\"1000\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">README</text>\n        <text x=\"1000\" y=\"178\" text-anchor=\"middle\" class=\"svg-small\">narrativa</text>\n      </g>\n\n      <path d=\"M240 165 H285\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n      <path d=\"M465 165 H510\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n      <path d=\"M690 165 H735\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n      <path d=\"M915 165 H940\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n\n      <rect x=\"90\" y=\"290\" width=\"220\" height=\"110\" rx=\"18\" class=\"svg-box-secondary\" />\n      <text x=\"200\" y=\"320\" text-anchor=\"middle\" class=\"svg-label\">Checklist técnico</text>\n      <text x=\"200\" y=\"348\" text-anchor=\"middle\" class=\"svg-small\">camadas, fluxos, riscos</text>\n      <text x=\"200\" y=\"374\" text-anchor=\"middle\" class=\"svg-small\">troubleshooting e segurança</text>\n\n      <rect x=\"450\" y=\"290\" width=\"220\" height=\"110\" rx=\"18\" class=\"svg-box-secondary\" />\n      <text x=\"560\" y=\"320\" text-anchor=\"middle\" class=\"svg-label\">Rubrica de qualidade</text>\n      <text x=\"560\" y=\"348\" text-anchor=\"middle\" class=\"svg-small\">clareza, evidência</text>\n      <text x=\"560\" y=\"374\" text-anchor=\"middle\" class=\"svg-small\">operação, custo, segurança</text>\n\n      <rect x=\"810\" y=\"290\" width=\"220\" height=\"110\" rx=\"18\" class=\"svg-box-secondary\" />\n      <text x=\"920\" y=\"320\" text-anchor=\"middle\" class=\"svg-label\">Portfólio</text>\n      <text x=\"920\" y=\"348\" text-anchor=\"middle\" class=\"svg-small\">repositório + índice</text>\n      <text x=\"920\" y=\"374\" text-anchor=\"middle\" class=\"svg-small\">estudos de caso + capstone</text>\n\n      <path d=\"M200 400 C250 500 450 500 560 400\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n      <path d=\"M560 400 C670 500 870 500 920 400\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n      <path d=\"M150 210 V290\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n      <path d=\"M600 210 V290\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n      <path d=\"M1000 210 V290\" class=\"svg-link\" marker-end=\"url(#arrow-1709)\" />\n\n      <rect x=\"270\" y=\"485\" width=\"580\" height=\"70\" rx=\"18\" class=\"svg-highlight\" />\n      <text x=\"560\" y=\"515\" text-anchor=\"middle\" class=\"svg-label\">Resultado final</text>\n      <text x=\"560\" y=\"540\" text-anchor=\"middle\" class=\"svg-small\">um conjunto verificável de problemas, decisões, evidências, validações, riscos e melhorias</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios ajudam a transformar conhecimento em documentação verificável. Responda pensando em artefatos concretos, não em frases genéricas.</p>\n  <ul><li>Escolha três laboratórios do curso e defina quais evidências provariam que você entendeu cada um.</li><li>Crie uma matriz de lacunas com domínio, evidência disponível, evidência faltante e próxima ação.</li><li>Escreva um README curto para um laboratório de DNS, incluindo problema, topologia, validação e troubleshooting.</li><li>Revise um artefato antigo e remova informações sensíveis, substituindo-as por dados fictícios consistentes.</li></ul>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio é montar um índice de portfólio com pelo menos oito artefatos: fundamentos, subnetting, DNS, firewall/NAT, HTTP/TLS, wireless, cloud networking e segurança defensiva. Cada artefato precisa ter objetivo, cenário, diagrama, evidência, troubleshooting, riscos e melhorias.</p>\n  <p>Depois, escolha um desses artefatos e escreva um README completo em nível profissional, como se ele fosse apresentado em uma entrevista técnica ou revisão interna de equipe.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n  <p>Uma boa solução não precisa ser bonita primeiro; precisa ser auditável. O índice deve permitir que outra pessoa entenda rapidamente o que foi estudado, qual problema foi resolvido e onde estão as evidências.</p>\n  <p>O README completo deve conter: contexto, objetivo, topologia, pré-requisitos, passos resumidos, validações, evidências sanitizadas, troubleshooting, riscos, custos, segurança, melhorias e próximos estudos. Se o artefato contém apenas comandos ou prints, ainda não é portfólio profissional.</p>\n  <div class=\"callout callout--success\"><strong>Critério de qualidade:</strong> um bom artefato permite que alguém avalie seu raciocínio mesmo sem executar o laboratório.</div>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>Nesta aula, você aprendeu que checklist e portfólio são ferramentas de consolidação profissional. O checklist revela lacunas; o portfólio demonstra raciocínio. Juntos, eles transformam estudo em evidência.</p>\n  <p>Um portfólio técnico de redes deve mostrar problemas, arquitetura, execução, validação, troubleshooting, segurança, custo, operação e melhoria contínua. Ele também deve ser sanitizado para não expor dados sensíveis ou informações de ambientes reais.</p>\n  <p>A partir daqui, o curso entra na reta final: roadmap pós-curso, auditoria da consolidação e capstone final.</p>\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C01</td><td>Fundamentos, OSI e encapsulamento</td><td>70%</td><td>90%</td><td>explica fluxo de dados por camadas e reconhece onde cada evidência aparece</td></tr><tr><td>C02</td><td>Ethernet, ARP, VLAN, switching e camada 2</td><td>70%</td><td>90%</td><td>diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast</td></tr><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C04</td><td>TCP, UDP, portas e serviços essenciais</td><td>75%</td><td>90%</td><td>diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs</td></tr><tr><td>C05</td><td>HTTP, TLS, proxy, firewall, VPN e publicação segura</td><td>75%</td><td>90%</td><td>interpreta erros de aplicação/rede e propõe controles com rollback</td></tr><tr><td>C06</td><td>Wireless, segurança defensiva e Blue Team</td><td>75%</td><td>90%</td><td>define escopo autorizado, telemetria, detecção, contenção e mitigação</td></tr><tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você organizará o caminho pós-curso: certificações, cloud, segurança, DevSecOps, projetos práticos, comunidades e trilhas de aprofundamento. O objetivo será transformar o curso em um plano de evolução profissional de médio prazo.</p>\n  <p>Próxima aula: <strong>17.10 — Roadmap pós-curso: certificações, cloud, segurança e DevSecOps</strong>.</p>\n</section>"
  },
  "diagram": {
    "type": "svg-inline",
    "title": "Do laboratório ao portfólio profissional",
    "description": "Fluxo de transformação de laboratório em artefato profissional com evidência e sanitização."
  },
  "portfolioChecklist": {
    "minimumArtifacts": [
      "Fundamentos e modelo OSI",
      "Ethernet, VLAN e ARP",
      "IPv4, CIDR e roteamento",
      "DNS e DHCP",
      "TCP/UDP, portas e NAT",
      "HTTP/TLS, proxy, WAF e LB",
      "Wireless corporativo",
      "Cloud Networking",
      "Troubleshooting e RCA",
      "Segurança defensiva e telemetria"
    ],
    "artifactTemplate": [
      "Contexto e problema",
      "Objetivo",
      "Topologia",
      "Arquitetura",
      "Pré-requisitos",
      "Passo a passo",
      "Validação",
      "Evidências sanitizadas",
      "Troubleshooting",
      "Riscos e segurança",
      "Custos e operação",
      "Melhorias e próximos passos"
    ],
    "qualityRubric": [
      "Clareza do problema",
      "Correção técnica",
      "Profundidade da validação",
      "Qualidade das evidências",
      "Segurança e privacidade",
      "Raciocínio operacional",
      "Comunicação executiva",
      "Potencial de revisão futura"
    ]
  },
  "quiz": [
    {
      "question": "Qual é a principal diferença entre um laboratório feito e um artefato de portfólio?",
      "options": [
        "O artefato tem prints coloridos",
        "O artefato documenta problema, decisão, evidência, validação e aprendizado",
        "O artefato usa apenas comandos avançados",
        "O artefato precisa ser feito em cloud paga"
      ],
      "answer": 1,
      "explanation": "Portfólio profissional demonstra raciocínio e evidência, não apenas execução."
    },
    {
      "question": "Qual item NÃO deve aparecer em um portfólio público?",
      "options": [
        "Diagrama fictício",
        "Matriz de fluxos sanitizada",
        "Credenciais reais ou tokens",
        "RCA de cenário simulado"
      ],
      "answer": 2,
      "explanation": "Credenciais, tokens e dados sensíveis nunca devem ser publicados."
    },
    {
      "question": "Por que uma rubrica ajuda no aprendizado?",
      "options": [
        "Substitui todos os laboratórios",
        "Elimina a necessidade de revisão",
        "Define critérios objetivos para avaliar qualidade e lacunas",
        "Garante aprovação em certificações"
      ],
      "answer": 2,
      "explanation": "A rubrica transforma qualidade em critérios observáveis."
    },
    {
      "question": "Um bom README técnico deve priorizar:",
      "options": [
        "Comandos sem explicação",
        "Narrativa com contexto, objetivo, validação e evidências",
        "Apenas imagens finais",
        "Texto mínimo para ficar curto"
      ],
      "answer": 1,
      "explanation": "O README precisa guiar a leitura do artefato e explicar o raciocínio."
    },
    {
      "question": "Qual prática melhora a segurança do portfólio?",
      "options": [
        "Publicar PCAPs reais completos",
        "Usar dados fictícios e sanitizar evidências",
        "Manter nomes internos para parecer real",
        "Remover todos os diagramas"
      ],
      "answer": 1,
      "explanation": "Sanitização permite demonstrar competência sem expor informações indevidas."
    },
    {
      "question": "Qual é um sinal de maturidade em um artefato de troubleshooting?",
      "options": [
        "Abrir any-to-any para resolver rápido",
        "Ignorar rollback",
        "Separar hipótese, evidência, ação e RCA",
        "Evitar registrar falhas"
      ],
      "answer": 2,
      "explanation": "Troubleshooting profissional separa hipótese, evidência, decisão e melhoria."
    }
  ],
  "flashcards": [
    {
      "front": "O que é checklist de laboratório?",
      "back": "Lista estruturada de critérios que comprovam conclusão, validação, segurança, troubleshooting e aprendizado."
    },
    {
      "front": "O que é portfólio técnico?",
      "back": "Coleção organizada e sanitizada de artefatos que demonstram raciocínio, prática e maturidade profissional."
    },
    {
      "front": "O que é evidência sanitizada?",
      "back": "Evidência técnica sem credenciais, dados pessoais, nomes internos sensíveis ou informações reais indevidas."
    },
    {
      "front": "O que é rubrica?",
      "back": "Critério de avaliação com níveis de qualidade para medir clareza, profundidade, evidência e segurança."
    },
    {
      "front": "Por que README é importante?",
      "back": "Porque transforma comandos e diagramas em narrativa técnica compreensível."
    },
    {
      "front": "Qual erro comum em portfólios de TI?",
      "back": "Mostrar prints ou comandos sem contexto, hipótese, validação, risco ou aprendizado."
    }
  ],
  "mentorQuestions": [
    "Qual artefato do seu portfólio melhor demonstra raciocínio de troubleshooting ponta a ponta?",
    "Quais dados você jamais publicaria, mesmo em um projeto educacional?",
    "Se um recrutador tivesse cinco minutos, qual README mostraria melhor sua evolução em redes?"
  ],
  "exercises": [
    {
      "title": "Checklist por domínio",
      "prompt": "Crie uma tabela com 10 domínios do curso e pelo menos 3 evidências esperadas para cada um.",
      "expectedAnswer": "A tabela deve cobrir fundamentos, L2, IPv4, DNS, TCP/UDP, HTTP/TLS, wireless, cloud, troubleshooting e segurança."
    },
    {
      "title": "README de laboratório",
      "prompt": "Escreva o esqueleto de README para um laboratório de firewall/NAT.",
      "expectedAnswer": "Deve incluir problema, topologia, matriz de fluxo, regras, validação, logs, riscos e rollback."
    },
    {
      "title": "Sanitização",
      "prompt": "Liste 10 tipos de informação que devem ser removidos ou ficticiamente substituídos antes da publicação.",
      "expectedAnswer": "Credenciais, tokens, IPs reais sensíveis, domínios internos, nomes de pessoas, e-mails, chaves, prints com dados pessoais, PCAPs brutos e detalhes contratuais."
    },
    {
      "title": "Rubrica",
      "prompt": "Defina nota 0 a 3 para qualidade de evidência em um artefato técnico.",
      "expectedAnswer": "0 sem evidência; 1 evidência solta; 2 evidência contextualizada; 3 evidência correlacionada com hipótese, validação e conclusão."
    },
    {
      "id": "ex17.9.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C01, C02, C03, C04, C05, C06, C07, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "challenge": {
    "title": "Montar o índice inicial do seu portfólio",
    "description": "Crie um índice com pelo menos oito artefatos derivados do curso. Para cada artefato, defina objetivo, problema, evidência esperada, risco de segurança, lacuna atual e próxima ação.",
    "deliverables": [
      "README principal",
      "Template de laboratório",
      "Checklist mínimo",
      "Rubrica de qualidade",
      "Índice com oito artefatos",
      "Plano de sanitização",
      "Backlog de lacunas"
    ],
    "constraints": [
      "não considerar a aula concluída sem rubrica preenchida",
      "não usar resposta decorada sem evidência técnica",
      "não avançar com competência crítica abaixo do mínimo sem plano de revisão"
    ],
    "tasks": [
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "expectedDeliverables": [
      "Matriz de competências com pontuação e confiança.",
      "Rubrica preenchida com justificativa.",
      "Feedback por tema: fundamento, diagnóstico, arquitetura, segurança, cloud e comunicação.",
      "Plano de revisão baseado em erros e reteste.",
      "Checklist de aprovação ou decisão de refazer competência crítica."
    ],
    "successCriteria": [
      "Cada competência tem evidência observável.",
      "Cada erro tem causa classificada.",
      "A rubrica sustenta a decisão de aprovação.",
      "O plano de revisão tem tarefa prática e prazo."
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
    "summary": "Uma solução madura organiza o portfólio por problemas e competências, não apenas por tecnologias. Cada artefato deve mostrar contexto, arquitetura, evidência, validação, risco, troubleshooting e melhoria.",
    "example": "Um artefato chamado dns-split-horizon poderia conter cenário fictício, diagrama, tabela de registros, consultas de validação, falha simulada de TTL/cache, troubleshooting e lições aprendidas.",
    "commonMistakes": [
      "Publicar prints sem contexto",
      "Expor dados reais",
      "Não explicar hipóteses",
      "Não registrar validação",
      "Não incluir rollback ou riscos",
      "Misturar muitos assuntos em um único artefato sem índice"
    ],
    "reasoning": "Uma solução madura organiza o portfólio por problemas e competências, não apenas por tecnologias. Cada artefato deve mostrar contexto, arquitetura, evidência, validação, risco, troubleshooting e melhoria. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
    "steps": [
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
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
      "term": "Portfólio técnico",
      "definition": "Conjunto organizado de artefatos que demonstra conhecimento prático e raciocínio profissional."
    },
    {
      "term": "Checklist",
      "definition": "Lista de critérios usada para verificar completude e qualidade de uma atividade."
    },
    {
      "term": "Rubrica",
      "definition": "Modelo de avaliação com critérios e níveis de qualidade."
    },
    {
      "term": "Evidência sanitizada",
      "definition": "Registro técnico editado para remover informações sensíveis ou identificáveis."
    },
    {
      "term": "README",
      "definition": "Documento inicial que explica objetivo, uso, estrutura e contexto de um projeto ou laboratório."
    },
    {
      "term": "Backlog de lacunas",
      "definition": "Lista priorizada de assuntos que ainda precisam de revisão, prática ou melhoria."
    }
  ],
  "references": [
    {
      "title": "NIST NICE Framework Resource Center",
      "url": "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center",
      "note": "Referência para linguagem comum de trabalho e habilidades em cibersegurança."
    },
    {
      "title": "NIST Cybersecurity Framework 2.0",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Referência para organizar resultados de segurança em governança, identificação, proteção, detecção, resposta e recuperação."
    },
    {
      "title": "GitHub Docs — About READMEs",
      "url": "https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-readmes",
      "note": "Referência para propósito de README em repositórios."
    },
    {
      "title": "GitHub Docs — GitHub Pages",
      "url": "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages",
      "note": "Referência opcional para publicação de site estático de portfólio."
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
        "name": "Risco de avaliação sem evidência — Checklist de laboratórios e portfólio profissional",
        "description": "Em Checklist de laboratórios e portfólio profissional, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.9."
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
      "Qual evidência comprova o entendimento da aula 17.9?"
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
      "deliverablesMarked": true,
      "rubricCompleted": true,
      "selfAssessmentDone": true
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "17.10"
    ]
  },
  "assessmentBlueprint": {
    "id": "assessment-17.9",
    "title": "Avaliação por competência — Checklist de laboratórios e portfólio profissional",
    "assessmentType": "portfólio avaliativo",
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
