export const lesson1711 = {
  "id": "17.11",
  "moduleId": "m17",
  "order": 11,
  "title": "Auditoria, simulado final e relatório de lacunas por domínio",
  "subtitle": "Avaliação final de 90 questões cobrindo todos os domínios do curso, com correção por competência e plano de revisão antes do capstone.",
  "duration": "300-420 min",
  "estimatedStudyTimeMinutes": 420,
  "difficulty": "avançado",
  "type": "simulado-final",
  "xp": 380,
  "tags": [
    "auditoria",
    "checklist",
    "consolidação",
    "prontidão",
    "capstone",
    "portfólio",
    "RCA",
    "NIST CSF",
    "NICE",
    "evidências",
    "redes",
    "cloud",
    "segurança",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão",
    "simulado final",
    "90 questões",
    "relatório de lacunas",
    "avaliação por domínio",
    "competências C01-C08"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.10",
      "reason": "O roadmap pós-curso ajuda a contextualizar a auditoria como ponto de transição entre aprendizado e evolução profissional."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking deve ser auditado como domínio próprio antes do capstone."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting, war room, RCA e playbooks são critérios centrais de prontidão."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Segurança defensiva, escopo, evidências e DFIR precisam estar consolidados."
    }
  ],
  "objectives": [
    "Auditar a cobertura dos módulos finais do curso com critérios objetivos.",
    "Transformar aprendizado em evidências verificáveis de competência.",
    "Criar checklist de prontidão para o capstone final.",
    "Classificar domínios como aprovado, parcial, pendente ou risco aceito.",
    "Definir plano de remediação para lacunas técnicas antes do projeto final.",
    "Conectar revisão, portfólio, simulados, estudos de caso e roadmap em um dossiê único.",
    "Executar simulado final de 90 questões por domínio.",
    "Produzir relatório de lacunas por domínio antes do capstone.",
    "Definir plano de revisão e reteste para domínios abaixo do mínimo."
  ],
  "learningOutcomes": [
    "Montar uma matriz de auditoria de conhecimento técnico.",
    "Definir critérios de aceite para redes, cloud, segurança e troubleshooting.",
    "Selecionar evidências adequadas para comprovar competência.",
    "Identificar lacunas sem transformar a revisão em culpa ou ansiedade.",
    "Priorizar remediação por risco, dependência e impacto no capstone.",
    "Preparar um pacote de prontidão para a aula final.",
    "Dado o resultado do simulado final, o aluno classifica lacunas por domínio e define revisão prática.",
    "Dado um domínio abaixo de 70%, o aluno associa aulas, labs e evidência de reteste.",
    "Dado o relatório final, o aluno decide se está pronto para defender o capstone."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\"><h2>1. Motivação</h2><p>Antes do capstone, o aluno precisa saber se domina o curso inteiro ou se apenas acumulou aulas concluídas. Este simulado final de 90 questões transforma a revisão em diagnóstico por domínio: fundamentos, OSI, Ethernet, IPv4, transporte, DNS, HTTP, firewall, VPN, wireless, cloud, troubleshooting e Blue Team.</p><div class=\"callout callout--problem\"><strong>Problema real:</strong> em ambientes corporativos, uma lacuna pequena em rota, DNS, firewall ou TLS pode gerar horas de incidente. A auditoria final existe para revelar essas lacunas antes que elas apareçam em produção.</div></section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>Em ambientes corporativos, auditoria nasceu como resposta a um problema recorrente: sistemas complexos crescem, mudanças acontecem, pessoas saem, exceções se acumulam e ninguém sabe exatamente se o desenho atual ainda corresponde ao desenho desejado.</p>\n  <p>Na educação técnica acontece algo parecido. O aluno estuda fundamentos, depois protocolos, depois segurança, depois cloud, depois troubleshooting. Cada parte parece fazer sentido isoladamente, mas a competência real aparece quando ele consegue conectar tudo: um erro de DNS pode parecer aplicação fora, uma regra de firewall pode parecer rota quebrada, uma subnet mal desenhada pode virar custo de NAT, e um fluxo sem logs pode inviabilizar DFIR.</p>\n  <p>Por isso, cursos profissionais, certificações, revisões de arquitetura, readiness reviews, postmortems, assessments e programas de melhoria contínua usam checklists. O checklist não substitui entendimento, mas evita que o entendimento seja aplicado de forma incompleta.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema que esta aula resolve é a lacuna entre consumir conteúdo e estar pronto para aplicar. Um aluno pode assistir aulas sobre VLAN, DNS, firewall e cloud, mas ainda não conseguir desenhar uma matriz de fluxos, explicar por que um serviço falhou ou montar um relatório de RCA.</p>\n  <p>Outra dificuldade é que redes são interdependentes. Não existe “apenas DNS” em produção: há DNS, cache, rota, firewall, proxy, TLS, aplicação, logs, identidade, cloud audit e custo. Se a revisão for feita por assunto isolado, o aluno pode passar em perguntas teóricas e falhar em cenários reais.</p>\n  <ul><li>Quais módulos estão realmente consolidados?</li><li>Quais laboratórios foram feitos com evidências e quais ficaram apenas conceituais?</li><li>Quais tópicos ainda dependem de revisão antes do capstone?</li><li>Quais artefatos do portfólio precisam ser sanitizados?</li><li>Quais riscos de segurança, custo e operação ainda aparecem nos desenhos?</li><li>Quais critérios indicam prontidão para concluir a versão consolidada do curso?</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A forma imatura de fechar um curso é dizer: “terminei a última aula”. A forma profissional é realizar uma auditoria de consolidação. Primeiro você define o escopo da auditoria; depois cria critérios de aceite; em seguida coleta evidências; então identifica lacunas; por fim transforma lacunas em plano de remediação.</p>\n  <p>Essa evolução é semelhante à maturidade de segurança. No início, times confiam em esforço individual. Depois criam padrões. Em seguida medem aderência. Por fim, tratam exceções, riscos residuais e melhoria contínua.</p>\n  <p>Nesta aula, você aplicará essa lógica ao próprio curso. A “v1.0” mencionada no título não significa voltar ao curso antigo; significa consolidar uma versão final auditável do seu aprendizado e dos artefatos que serão usados no capstone.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p>Auditoria do curso é o processo estruturado de verificar se os objetivos de aprendizado, laboratórios, simulados, estudos de caso, glossário, portfólio e critérios de prontidão foram cumpridos com qualidade suficiente.</p>\n  <p>Checklist de consolidação é a lista objetiva de itens que precisam estar prontos antes de declarar o curso consolidado. Ele transforma aprendizado em evidência: diagrama, matriz de fluxos, tabela de subnets, configuração comentada, captura sanitizada, consulta de log, plano de rollback, RCA, simulado corrigido e backlog de melhoria.</p>\n  <p>Em termos simples, esta aula ensina você a perguntar: “se eu precisasse defender meu conhecimento em uma entrevista técnica, em um incidente real ou em uma revisão de arquitetura, quais evidências eu apresentaria?”.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Uma auditoria de consolidação funciona por domínios. Cada domínio possui objetivos, evidências, critérios de aceite e riscos residuais. Por exemplo: no domínio IPv4, não basta saber que /24 tem 256 endereços. Você precisa demonstrar cálculo de rede, broadcast, gateway, rota, retorno e troubleshooting com ICMP e ARP.</p>\n  <p>No domínio cloud, não basta saber o que é VPC. Você precisa mostrar CIDR sem sobreposição, subnets por função, route tables, NAT, endpoints privados, DNS privado, flow logs, custos e controles de segurança. No domínio segurança, não basta conhecer nomes de ataques. Você precisa demonstrar segmentação, egress control, detecção, playbooks e evidências.</p>\n  <p>A auditoria gera três saídas: itens aprovados, itens com lacuna e itens com risco residual aceito. Itens aprovados seguem para o capstone. Lacunas entram em plano de remediação. Riscos residuais são documentados com justificativa, dono e prazo.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>A arquitetura da auditoria possui cinco camadas. A primeira é cobertura: verificar se todos os módulos foram estudados. A segunda é evidência: verificar se existem artefatos produzidos. A terceira é integração: verificar se os assuntos conversam entre si. A quarta é prontidão: verificar se o aluno consegue resolver cenários. A quinta é melhoria: transformar lacunas em plano de estudo.</p>\n  <p>Essa arquitetura evita uma revisão superficial. Não basta marcar “DNS estudado”. O checklist precisa perguntar: você consegue diferenciar NXDOMAIN, SERVFAIL, REFUSED e timeout? consegue analisar TTL e cache? consegue explicar split-horizon? consegue correlacionar DNS com proxy, EDR e SIEM? consegue diagnosticar Private Endpoint resolvendo para IP público?</p>\n  <p>O mesmo vale para cada domínio. A auditoria deve atravessar fundamentos, camadas, protocolos, wireless, segurança, cloud, troubleshooting, DFIR, portfólio e roadmap.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Pense no curso como a construção de um hospital. Cada módulo construiu uma parte: fundação, energia, rede hidráulica, salas, segurança, emergência, documentação e equipe. Antes de inaugurar, não basta dizer que todas as obras terminaram. É preciso fazer vistoria.</p>\n  <p>A vistoria verifica se portas abrem, alarmes funcionam, geradores entram em operação, rotas de fuga existem, documentação está acessível e a equipe sabe agir em emergência. A auditoria do curso faz o mesmo: ela testa se seu conhecimento funciona sob pressão, em cenários integrados e com evidências.</p>\n  <p>Sem vistoria, o prédio pode parecer bonito e falhar no primeiro incidente. Sem auditoria de aprendizado, o aluno pode parecer preparado e travar diante de um problema real.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Imagine que você revisou DNS e marcou o item como concluído. A auditoria pergunta: você consegue explicar o caminho de uma consulta DNS desde o cliente até o resolvedor? sabe o papel do cache local? consegue interpretar um NXDOMAIN? sabe quando usar um resolvedor diferente no teste? entende o risco de TTL muito alto durante migração?</p>\n  <p>Se a resposta for parcial, o item não está reprovado; ele vira lacuna. A lacuna recebe ação: revisar aula de DNS, refazer laboratório, documentar três cenários de falha e criar um flashcard sobre códigos de resposta.</p>\n  <p>O objetivo não é punir. O objetivo é transformar incerteza em melhoria planejada.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, uma auditoria de consolidação poderia verificar se a equipe de redes possui documentação atualizada de VLANs, trunks, roteamento, VPNs, NAT, firewalls, DNS, wireless, cloud e contatos de escalonamento.</p>\n  <p>Se a equipe não tem matriz de fluxos, cada mudança de firewall vira discussão subjetiva. Se não tem baseline, cada lentidão vira “a rede está ruim”. Se não tem playbook, cada incidente começa do zero. Se não tem RCA, problemas se repetem.</p>\n  <p>A aula replica esse raciocínio para o aluno: seu conhecimento precisa ser documentado, testável, revisável e aplicável em cenários corporativos.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, a auditoria pergunta se o aluno consegue desenhar uma landing zone mínima: contas ou subscriptions separadas, VPC/VNet com CIDR planejado, subnets por função, route tables, NAT controlado, Private Endpoints, DNS privado, flow logs, hub de segurança e governança por policy as code.</p>\n  <p>Também pergunta se ele entende custos: NAT Gateway, egress, inter-region, firewall gerenciado, load balancer, logs e armazenamento. Uma arquitetura tecnicamente funcional pode ser financeiramente ruim se todo tráfego privado sair por NAT desnecessariamente.</p>\n  <p>Por isso, cloud networking consolidado precisa demonstrar conectividade, segurança, observabilidade, custo e governança ao mesmo tempo.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a auditoria verifica se os controles de rede podem ser reproduzidos por código. Security groups, NSGs, route tables, DNS privado, Kubernetes NetworkPolicy, Ingress, WAF e logging precisam ser versionados, revisados e testados.</p>\n  <p>Um aluno consolidado deve entender que pipeline não é apenas deploy. Pipeline também pode validar se uma regra é ampla demais, se uma subnet pública foi criada sem justificativa, se logs estão desligados, se um endpoint privado perdeu DNS correto ou se um Ingress foi publicado sem TLS adequado.</p>\n  <p>A auditoria, portanto, conecta redes com automação: conhecimento manual vira guardrail, teste, template, documentação e evidência.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, a auditoria pergunta se o aluno consegue defender uma rede, não apenas conectá-la. Isso inclui segmentação, menor privilégio, egress control, DNS/proxy logs, flow logs, detecção de C2, DLP, threat hunting, DFIR, preservação de evidências e resposta proporcional.</p>\n  <p>Também exige ética e escopo. Qualquer validação de segurança precisa de autorização, regras de engajamento, janela, critério de parada e proteção de dados. Um portfólio bom não expõe IPs reais, chaves, nomes internos sensíveis, clientes ou dados pessoais.</p>\n  <p>Segurança consolidada é a capacidade de equilibrar controle, evidência, privacidade, continuidade operacional e melhoria contínua.</p>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama abaixo resume a auditoria de consolidação como um pipeline de qualidade do aprendizado: escopo, domínios, evidências, critérios, lacunas, remediação e prontidão para o capstone.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Pipeline de auditoria de consolidação do curso\">\n<svg viewBox=\"0 0 980 520\" xmlns=\"http://www.w3.org/2000/svg\" class=\"lesson-svg lesson-svg--wide\" role=\"img\" aria-labelledby=\"svg-17-11-content-diagram-1-title svg-17-11-content-diagram-1-desc\">\n      <title id=\"svg-17-11-content-diagram-1-title\">Auditoria do curso e checklist de consolidação da v1.0</title>\n      <desc id=\"svg-17-11-content-diagram-1-desc\">Diagrama pedagógico da aula 17.11, Auditoria do curso e checklist de consolidação da v1.0, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n  <defs>\n    <marker id=\"arrow-1711\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path></marker>\n  </defs>\n  <rect x=\"30\" y=\"35\" width=\"160\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--primary\"></rect>\n  <text x=\"110\" y=\"65\" text-anchor=\"middle\" class=\"svg-label\">Escopo</text>\n  <text x=\"110\" y=\"88\" text-anchor=\"middle\" class=\"svg-small\">M12–M17</text>\n  <rect x=\"235\" y=\"35\" width=\"170\" height=\"70\" rx=\"14\" class=\"svg-node\"></rect>\n  <text x=\"320\" y=\"65\" text-anchor=\"middle\" class=\"svg-label\">Domínios</text>\n  <text x=\"320\" y=\"88\" text-anchor=\"middle\" class=\"svg-small\">Rede • Cloud • Segurança</text>\n  <rect x=\"455\" y=\"35\" width=\"170\" height=\"70\" rx=\"14\" class=\"svg-node\"></rect>\n  <text x=\"540\" y=\"65\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n  <text x=\"540\" y=\"88\" text-anchor=\"middle\" class=\"svg-small\">Labs • Logs • RCA</text>\n  <rect x=\"675\" y=\"35\" width=\"170\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--success\"></rect>\n  <text x=\"760\" y=\"65\" text-anchor=\"middle\" class=\"svg-label\">Critérios</text>\n  <text x=\"760\" y=\"88\" text-anchor=\"middle\" class=\"svg-small\">Aceite mensurável</text>\n  <line x1=\"190\" y1=\"70\" x2=\"235\" y2=\"70\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"405\" y1=\"70\" x2=\"455\" y2=\"70\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"625\" y1=\"70\" x2=\"675\" y2=\"70\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <rect x=\"80\" y=\"170\" width=\"180\" height=\"78\" rx=\"14\" class=\"svg-node\"></rect>\n  <text x=\"170\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Checklist técnico</text>\n  <text x=\"170\" y=\"225\" text-anchor=\"middle\" class=\"svg-small\">Protocolos e fluxos</text>\n  <rect x=\"300\" y=\"170\" width=\"180\" height=\"78\" rx=\"14\" class=\"svg-node\"></rect>\n  <text x=\"390\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Checklist operacional</text>\n  <text x=\"390\" y=\"225\" text-anchor=\"middle\" class=\"svg-small\">Troubleshooting e RCA</text>\n  <rect x=\"520\" y=\"170\" width=\"180\" height=\"78\" rx=\"14\" class=\"svg-node\"></rect>\n  <text x=\"610\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Checklist segurança</text>\n  <text x=\"610\" y=\"225\" text-anchor=\"middle\" class=\"svg-small\">Controles e telemetria</text>\n  <rect x=\"740\" y=\"170\" width=\"180\" height=\"78\" rx=\"14\" class=\"svg-node\"></rect>\n  <text x=\"830\" y=\"200\" text-anchor=\"middle\" class=\"svg-label\">Checklist portfólio</text>\n  <text x=\"830\" y=\"225\" text-anchor=\"middle\" class=\"svg-small\">Artefatos sanitizados</text>\n  <line x1=\"760\" y1=\"105\" x2=\"170\" y2=\"170\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"760\" y1=\"105\" x2=\"390\" y2=\"170\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"760\" y1=\"105\" x2=\"610\" y2=\"170\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"760\" y1=\"105\" x2=\"830\" y2=\"170\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <rect x=\"165\" y=\"330\" width=\"190\" height=\"80\" rx=\"16\" class=\"svg-node svg-node--warning\"></rect>\n  <text x=\"260\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Lacunas</text>\n  <text x=\"260\" y=\"388\" text-anchor=\"middle\" class=\"svg-small\">Ação, dono e prazo</text>\n  <rect x=\"420\" y=\"330\" width=\"190\" height=\"80\" rx=\"16\" class=\"svg-node svg-node--accent\"></rect>\n  <text x=\"515\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Remediação</text>\n  <text x=\"515\" y=\"388\" text-anchor=\"middle\" class=\"svg-small\">Revisar • Refazer • Retestar</text>\n  <rect x=\"675\" y=\"330\" width=\"190\" height=\"80\" rx=\"16\" class=\"svg-node svg-node--success\"></rect>\n  <text x=\"770\" y=\"362\" text-anchor=\"middle\" class=\"svg-label\">Pronto para capstone</text>\n  <text x=\"770\" y=\"388\" text-anchor=\"middle\" class=\"svg-small\">Evidência suficiente</text>\n  <line x1=\"260\" y1=\"248\" x2=\"260\" y2=\"330\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"480\" y1=\"248\" x2=\"515\" y2=\"330\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"700\" y1=\"248\" x2=\"515\" y2=\"330\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"830\" y1=\"248\" x2=\"770\" y2=\"330\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"355\" y1=\"370\" x2=\"420\" y2=\"370\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <line x1=\"610\" y1=\"370\" x2=\"675\" y2=\"370\" class=\"svg-line\" marker-end=\"url(#arrow-1711)\"></line>\n  <path d=\"M515 410 C515 465 260 465 260 410\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow-1711)\"></path>\n  <text x=\"388\" y=\"468\" text-anchor=\"middle\" class=\"svg-small\">lacuna volta para checklist após remediação</text>\n</svg></div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\"><h2>16. Exercícios</h2><p>Após o simulado, produza a matriz de lacunas por domínio. Cada domínio abaixo de 70% deve gerar pelo menos uma ação prática: refazer lab, responder exercícios, desenhar arquitetura ou repetir troubleshooting com comandos.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\"><h2>17. Desafio</h2><p>Transforme o resultado do simulado em um plano de revisão de 14 dias. O plano deve priorizar domínios críticos, associar aulas e laboratórios, e definir critérios de reteste antes do capstone.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\"><h2>18. Solução comentada</h2><p>A solução comentada não é uma lista de gabarito isolada. Para cada questão errada, explique a hipótese que levou ao erro, a evidência correta e a aula que deve ser revisada.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\"><h2>19. Resumo</h2><p>Esta aula agora concentra o simulado final do curso. São 90 questões distribuídas em 12 domínios. A nota geral importa, mas a aprovação real depende de identificar domínios fracos, revisar com evidência e chegar ao capstone com uma matriz honesta de competências.</p><p>O resultado esperado não é decorar alternativas. É produzir um relatório de lacunas por domínio, retestar pontos críticos e entrar no projeto final sabendo exatamente quais decisões técnicas precisam de mais atenção.</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next-theme\"><h2>20. Próximo tema</h2><p>Depois do simulado final, avance para o capstone 17.12 levando a matriz de lacunas. O projeto final deve compensar lacunas críticas com entregáveis, evidências, rubrica e defesa técnica.</p></section>"
  },
  "diagram": {
    "type": "svg-inline",
    "title": "Pipeline de auditoria de consolidação",
    "description": "Fluxo visual de escopo, domínios, evidências, critérios, lacunas, remediação e prontidão para capstone."
  },
  "auditChecklist": {
    "statuses": [
      "aprovado",
      "parcial",
      "pendente",
      "risco aceito"
    ],
    "domains": [
      {
        "domain": "Fundamentos e modelos",
        "acceptanceCriteria": [
          "Explica OSI/TCP-IP sem decorar camadas isoladas",
          "Descreve encapsulamento e fluxo ponta a ponta",
          "Relaciona camada física, enlace, rede, transporte e aplicação"
        ],
        "evidenceExamples": [
          "Mapa mental 17.2",
          "Simulado 17.3 corrigido",
          "Diagrama autoral"
        ]
      },
      {
        "domain": "Ethernet, VLAN e L2",
        "acceptanceCriteria": [
          "Diferencia access, trunk e native VLAN",
          "Interpreta tabela MAC, ARP, STP e loops",
          "Propõe controles L2 defensivos"
        ],
        "evidenceExamples": [
          "Laboratório 15.3",
          "Aula 16.6",
          "Checklist de troubleshooting L2"
        ]
      },
      {
        "domain": "IPv4, roteamento e ICMP",
        "acceptanceCriteria": [
          "Calcula CIDR e identifica gateway",
          "Analisa rota default e rota mais específica",
          "Diferencia falha de ida, retorno e filtro ICMP"
        ],
        "evidenceExamples": [
          "Simulado 17.4",
          "Laboratório 15.4",
          "Matriz de rotas"
        ]
      },
      {
        "domain": "DNS, DHCP e NAT",
        "acceptanceCriteria": [
          "Interpreta TTL, cache e códigos DNS",
          "Entende DHCP lease, relay e opções",
          "Explica SNAT, DNAT, PAT e retorno"
        ],
        "evidenceExamples": [
          "Aulas 15.5 e 15.7",
          "Simulado 17.4",
          "Dossiê DNS"
        ]
      },
      {
        "domain": "TCP, UDP e aplicações",
        "acceptanceCriteria": [
          "Interpreta timeout, refused, reset e handshake",
          "Diferencia serviço em listen de aplicação saudável",
          "Correlaciona porta, processo, firewall e LB"
        ],
        "evidenceExamples": [
          "Aula 15.6",
          "Simulado 17.5",
          "Teste sintético documentado"
        ]
      },
      {
        "domain": "HTTP, TLS e publicação web",
        "acceptanceCriteria": [
          "Analisa certificado, SAN, SNI e cadeia",
          "Interpreta 403, 404, 502, 503 e 504",
          "Relaciona CDN/WAF/LB/Ingress/backend"
        ],
        "evidenceExamples": [
          "Aula 15.8",
          "Estudo 17.7",
          "Logs correlacionados"
        ]
      },
      {
        "domain": "Wireless",
        "acceptanceCriteria": [
          "Explica RSSI, SNR, canais e roaming",
          "Relaciona WPA Enterprise, 802.1X e RADIUS",
          "Identifica riscos de rogue AP e evil twin"
        ],
        "evidenceExamples": [
          "Módulo 12",
          "Simulado 17.6",
          "Checklist Wi-Fi"
        ]
      },
      {
        "domain": "Cloud Networking",
        "acceptanceCriteria": [
          "Desenha VPC/VNet com subnets e rotas",
          "Explica Private Endpoint, DNS privado e NAT",
          "Considera custos, logs e governança"
        ],
        "evidenceExamples": [
          "Módulo 14",
          "Aula 15.10",
          "Projeto 14.14"
        ]
      },
      {
        "domain": "Segurança defensiva",
        "acceptanceCriteria": [
          "Define segmentação e egress control",
          "Correlaciona DNS/proxy/flow logs/EDR/SIEM",
          "Cria playbook defensivo com resposta proporcional"
        ],
        "evidenceExamples": [
          "Módulo 16",
          "Simulado 17.6",
          "Playbooks e hunts"
        ]
      },
      {
        "domain": "Troubleshooting e RCA",
        "acceptanceCriteria": [
          "Usa hipótese-evidência",
          "Cria timeline e problem statement",
          "Propõe mitigação, rollback e RCA sem culpa"
        ],
        "evidenceExamples": [
          "Módulo 15",
          "Aula 15.12",
          "Estudos 17.7 e 17.8"
        ]
      },
      {
        "domain": "DFIR e evidências",
        "acceptanceCriteria": [
          "Preserva evidências e timestamps",
          "Diferencia PCAP, flow logs, proxy e audit logs",
          "Separa fato, hipótese e inferência"
        ],
        "evidenceExamples": [
          "Aula 16.11",
          "PCAP sanitizado",
          "Timeline de incidente"
        ]
      },
      {
        "domain": "Portfólio e comunicação",
        "acceptanceCriteria": [
          "Documenta laboratórios com README",
          "Sanitiza informações sensíveis",
          "Explica decisões para público técnico e executivo"
        ],
        "evidenceExamples": [
          "Aula 17.9",
          "Roadmap 17.10",
          "Relatório executivo"
        ]
      }
    ]
  },
  "quiz": [
    {
      "id": "q17.11.final.001",
      "type": "simulado",
      "domain": "Fundamentos de Computação",
      "q": "Por que binário é essencial para entender redes?",
      "opts": [
        "Porque endereços, máscaras e campos de protocolo são representações de bits",
        "Porque substitui todos os protocolos",
        "Porque elimina latência",
        "Porque autentica usuários"
      ],
      "a": 0,
      "exp": "Máscaras, endereços e campos são valores binários representados de forma humana.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Computação"
    },
    {
      "id": "q17.11.final.002",
      "type": "simulado",
      "domain": "Fundamentos de Computação",
      "q": "Qual conversão explica por que um octeto vai de 0 a 255?",
      "opts": [
        "8 bits permitem 256 valores, de 0 a 255",
        "8 bits permitem 8 valores",
        "255 bits formam um octeto",
        "Um octeto depende de DNS"
      ],
      "a": 0,
      "exp": "2^8 = 256 valores; contando do zero, o máximo é 255.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Computação"
    },
    {
      "id": "q17.11.final.003",
      "type": "simulado",
      "domain": "Fundamentos de Computação",
      "q": "Em troubleshooting, por que diferenciar dado, sinal e protocolo importa?",
      "opts": [
        "Evita misturar problema físico, codificação e regra de comunicação",
        "Permite ignorar camada física",
        "Substitui logs",
        "Elimina risco de firewall"
      ],
      "a": 0,
      "exp": "Diagnóstico profissional separa nível físico, representação e regras de comunicação.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Computação"
    },
    {
      "id": "q17.11.final.004",
      "type": "simulado",
      "domain": "Fundamentos de Computação",
      "q": "Qual atitude indica raciocínio técnico maduro?",
      "opts": [
        "Formular hipótese testável e buscar evidência",
        "Trocar componentes aleatoriamente",
        "Assumir DNS para todo erro",
        "Abrir firewall sem escopo"
      ],
      "a": 0,
      "exp": "Hipóteses testáveis reduzem tentativa e erro.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Computação"
    },
    {
      "id": "q17.11.final.005",
      "type": "simulado",
      "domain": "Fundamentos de Computação",
      "q": "Por que tabelas são recorrentes em redes?",
      "opts": [
        "Equipamentos tomam decisões por tabelas como ARP, MAC, rotas e estados",
        "Porque todo pacote é SQL",
        "Porque substituem pacotes",
        "Porque impedem logs"
      ],
      "a": 0,
      "exp": "Muitos mecanismos de rede consultam tabelas locais para decidir encaminhamento.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Computação"
    },
    {
      "id": "q17.11.final.006",
      "type": "simulado",
      "domain": "Fundamentos de Computação",
      "q": "Qual evidência é mais forte que “acho que caiu”?",
      "opts": [
        "Comando, log ou captura com horário e interpretação",
        "Memória do usuário",
        "Cor do LED apenas",
        "Opinião sem teste"
      ],
      "a": 0,
      "exp": "Evidência reproduzível dá base para decisão.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Computação"
    },
    {
      "id": "q17.11.final.007",
      "type": "simulado",
      "domain": "Fundamentos de Computação",
      "q": "Ao documentar um incidente, horário e fuso são importantes porque:",
      "opts": [
        "Permitem correlacionar eventos entre sistemas",
        "Aumentam banda",
        "Mudam máscara CIDR",
        "Autenticam TLS"
      ],
      "a": 0,
      "exp": "Correlação temporal é central em troubleshooting e segurança.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Computação"
    },
    {
      "id": "q17.11.final.008",
      "type": "simulado",
      "domain": "Fundamentos de Redes",
      "q": "Qual problema redes resolvem em essência?",
      "opts": [
        "Permitir comunicação entre sistemas separados fisicamente ou logicamente",
        "Eliminar necessidade de sistemas operacionais",
        "Garantir segurança automática",
        "Substituir armazenamento"
      ],
      "a": 0,
      "exp": "Redes conectam sistemas, mas não garantem segurança por si só.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Redes"
    },
    {
      "id": "q17.11.final.009",
      "type": "simulado",
      "domain": "Fundamentos de Redes",
      "q": "A diferença entre conectividade e autorização é:",
      "opts": [
        "Conectividade alcança; autorização permite ou nega uso",
        "São sinônimos",
        "Autorização só existe em camada física",
        "Conectividade é sempre criptografia"
      ],
      "a": 0,
      "exp": "Um pacote pode chegar e ainda assim ser negado por aplicação/IAM/política.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Redes"
    },
    {
      "id": "q17.11.final.010",
      "type": "simulado",
      "domain": "Fundamentos de Redes",
      "q": "Qual item é melhor evidência de caminho?",
      "opts": [
        "traceroute/tracert ou rota efetiva, interpretados com limites",
        "Somente print do navegador",
        "Nome do SSID",
        "Tamanho do monitor"
      ],
      "a": 0,
      "exp": "Ferramentas de caminho ajudam, mas devem ser interpretadas com filtros e ICMP bloqueado em mente.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Redes"
    },
    {
      "id": "q17.11.final.011",
      "type": "simulado",
      "domain": "Fundamentos de Redes",
      "q": "Topologia física e lógica diferem porque:",
      "opts": [
        "Cabos/dispositivos físicos podem sustentar múltiplas redes/VLANs lógicas",
        "São sempre iguais",
        "A lógica substitui energia",
        "Física só existe em cloud"
      ],
      "a": 0,
      "exp": "Virtualização, VLANs e overlays separam desenho lógico do físico.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Redes"
    },
    {
      "id": "q17.11.final.012",
      "type": "simulado",
      "domain": "Fundamentos de Redes",
      "q": "Qual risco existe em uma rede sem inventário?",
      "opts": [
        "Dificuldade de troubleshooting, auditoria e controle de exposição",
        "Melhora automática de segurança",
        "DNS mais rápido",
        "VLANs ilimitadas"
      ],
      "a": 0,
      "exp": "Sem inventário, não se sabe o que existe, onde está e o que deve comunicar.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Redes"
    },
    {
      "id": "q17.11.final.013",
      "type": "simulado",
      "domain": "Fundamentos de Redes",
      "q": "Por que baseline é útil?",
      "opts": [
        "Permite comparar estado atual com comportamento esperado",
        "Substitui monitoramento",
        "Remove incidentes",
        "Ignora sazonalidade"
      ],
      "a": 0,
      "exp": "Baseline ajuda a detectar desvios reais.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Redes"
    },
    {
      "id": "q17.11.final.014",
      "type": "simulado",
      "domain": "Fundamentos de Redes",
      "q": "Qual pergunta deve vir antes de liberar um fluxo?",
      "opts": [
        "Quem precisa falar com quem, em qual porta, por quê e como será monitorado?",
        "Qual regra any-any é mais rápida?",
        "Como evitar documentação?",
        "Qual cor usar no diagrama?"
      ],
      "a": 0,
      "exp": "Fluxos devem ser justificados, mínimos e observáveis.",
      "difficulty": "intermediário",
      "topic": "Fundamentos de Redes"
    },
    {
      "id": "q17.11.final.015",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "O modelo OSI é mais útil como:",
      "opts": [
        "modelo mental de diagnóstico por camadas",
        "protocolo real de transporte",
        "substituto de TCP/IP",
        "ferramenta para emitir certificado"
      ],
      "a": 0,
      "exp": "OSI ajuda a organizar hipóteses mesmo quando a pilha real é TCP/IP.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.016",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "Encapsulamento significa:",
      "opts": [
        "cada camada adiciona informações para cumprir sua função",
        "criptografar sempre todo pacote",
        "trocar DNS por ARP",
        "remover cabeçalhos"
      ],
      "a": 0,
      "exp": "Dados de aplicação são encapsulados em segmentos, pacotes e quadros.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.017",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "Qual camada decide portas TCP/UDP?",
      "opts": [
        "Transporte",
        "Enlace",
        "Física",
        "DNS"
      ],
      "a": 0,
      "exp": "Portas pertencem à camada de transporte.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.018",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "Qual camada lida com MAC e quadros Ethernet?",
      "opts": [
        "Enlace/camada 2",
        "Aplicação",
        "Transporte",
        "Sessão"
      ],
      "a": 0,
      "exp": "Ethernet e MAC são L2.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.019",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "Um erro de certificado TLS está mais ligado a:",
      "opts": [
        "TLS/PKI acima de TCP",
        "ARP físico",
        "STP",
        "DHCP offer"
      ],
      "a": 0,
      "exp": "TLS ocorre após conectividade TCP e envolve identidade/certificado.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.020",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "Por que camada não deve virar dogma?",
      "opts": [
        "Porque problemas reais atravessam camadas e exigem correlação",
        "Porque OSI não ajuda nunca",
        "Porque TCP não existe",
        "Porque DNS é camada física"
      ],
      "a": 0,
      "exp": "Camadas organizam, mas investigação real correlaciona evidências.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.021",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "Se TCP conecta mas HTTP retorna 500, a hipótese inicial vai para:",
      "opts": [
        "aplicação/upstream, não conectividade básica",
        "cabo desconectado",
        "ARP inexistente",
        "DHCP ausente"
      ],
      "a": 0,
      "exp": "Conexão TCP e resposta HTTP indicam caminho básico funcional.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.022",
      "type": "simulado",
      "domain": "OSI/TCP-IP",
      "q": "MTU costuma impactar qual aspecto?",
      "opts": [
        "tamanho de pacote/fragmentação/túneis",
        "nome do certificado",
        "VLAN nativa apenas",
        "CNAME"
      ],
      "a": 0,
      "exp": "MTU define tamanho máximo de quadro/pacote no caminho.",
      "difficulty": "intermediário",
      "topic": "OSI/TCP-IP"
    },
    {
      "id": "q17.11.final.023",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "ARP Request em IPv4 local normalmente é:",
      "opts": [
        "broadcast",
        "unicast TCP",
        "multicast BGP",
        "HTTP POST"
      ],
      "a": 0,
      "exp": "ARP Request pergunta na LAN quem possui determinado IP.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.024",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "Tabela CAM de switch mapeia:",
      "opts": [
        "MAC para porta",
        "IP para rota BGP",
        "nome para IP",
        "porta TCP para processo"
      ],
      "a": 0,
      "exp": "Switch usa MAC table para encaminhamento L2.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.025",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "VLAN ajuda a:",
      "opts": [
        "separar domínios de broadcast e políticas lógicas",
        "aumentar automaticamente criptografia",
        "dispensar roteamento",
        "trocar TCP por UDP"
      ],
      "a": 0,
      "exp": "VLAN segmenta L2, mas comunicação entre VLANs exige roteamento/política.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.026",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "Trunk carrega:",
      "opts": [
        "múltiplas VLANs tagueadas",
        "apenas uma porta TCP",
        "somente DNS",
        "apenas pacotes ICMP"
      ],
      "a": 0,
      "exp": "Trunk 802.1Q transporta múltiplas VLANs.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.027",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "Port security pode ajudar a:",
      "opts": [
        "limitar MACs por porta e reduzir abuso acidental/malicioso",
        "resolver DNS",
        "corrigir TLS",
        "calcular CIDR"
      ],
      "a": 0,
      "exp": "É controle L2 de acesso/limitação por porta.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.028",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "STP bloqueia caminhos para:",
      "opts": [
        "evitar loops L2",
        "melhorar CORS",
        "renovar DHCP",
        "trocar NAT"
      ],
      "a": 0,
      "exp": "Loops L2 podem derrubar redes com broadcast storm.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.029",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "ARP spoofing é mitigado por combinação de:",
      "opts": [
        "segmentação, inspeção dinâmica, criptografia e monitoramento",
        "aumentar TTL DNS",
        "desativar logs",
        "abrir firewall"
      ],
      "a": 0,
      "exp": "ARP não autentica nativamente; mitigação exige controles em camadas.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.030",
      "type": "simulado",
      "domain": "Ethernet/L2/ARP/VLAN/STP",
      "q": "Qual evidência sugere VLAN errada?",
      "opts": [
        "IP/gateway de outro segmento após conectar à porta",
        "HTTP 200 sempre",
        "SAN correto",
        "TTL DNS baixo"
      ],
      "a": 0,
      "exp": "Receber configuração de outro segmento indica porta/SSID/VLAN incorretos.",
      "difficulty": "intermediário",
      "topic": "Ethernet/L2/ARP/VLAN/STP"
    },
    {
      "id": "q17.11.final.031",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "Qual é a rede de 192.168.30.130/25?",
      "opts": [
        "192.168.30.128",
        "192.168.30.0",
        "192.168.30.64",
        "192.168.30.130"
      ],
      "a": 0,
      "exp": "/25 divide em blocos 0-127 e 128-255.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.032",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "Rota default representa:",
      "opts": [
        "caminho usado quando nenhuma rota mais específica casa",
        "rota mais específica sempre",
        "servidor DNS",
        "MAC do switch"
      ],
      "a": 0,
      "exp": "0.0.0.0/0 é fallback de roteamento.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.033",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "Longest prefix match escolhe 10.0.1.0/24 sobre 10.0.0.0/8 porque:",
      "opts": [
        "é mais específico",
        "tem menos caracteres",
        "é rota antiga",
        "é default"
      ],
      "a": 0,
      "exp": "Prefixo mais longo é mais específico.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.034",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "Sobreposição CIDR entre cloud e datacenter causa:",
      "opts": [
        "ambiguidade/colisão de rotas e dificuldade de VPN/peering",
        "melhor segurança automática",
        "eliminação de NAT",
        "HTTP mais rápido"
      ],
      "a": 0,
      "exp": "CIDRs sobrepostos prejudicam roteamento entre ambientes.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.035",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "VLSM serve para:",
      "opts": [
        "dimensionar sub-redes com tamanhos diferentes conforme necessidade",
        "forçar todas as redes /24",
        "substituir DHCP",
        "criptografar tráfego"
      ],
      "a": 0,
      "exp": "VLSM reduz desperdício e organiza crescimento.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.036",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "Rota estática flutuante usa:",
      "opts": [
        "distância administrativa maior para backup",
        "DNS split",
        "porta efêmera",
        "VLAN nativa"
      ],
      "a": 0,
      "exp": "Ela fica menos preferida e assume quando rota principal some.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.037",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "Rota de retorno deve ser validada porque:",
      "opts": [
        "respostas precisam voltar ao originador por caminho permitido",
        "DNS resolve sozinho retorno",
        "ARP atravessa roteadores",
        "TLS cria rota"
      ],
      "a": 0,
      "exp": "Caminho bidirecional precisa existir e ser permitido.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.038",
      "type": "simulado",
      "domain": "IPv4/Subnetting/Roteamento",
      "q": "Qual comando Cisco vê rotas?",
      "opts": [
        "show ip route",
        "show vlan brief apenas",
        "show cdp neighbors apenas",
        "show clock"
      ],
      "a": 0,
      "exp": "show ip route exibe tabela de roteamento.",
      "difficulty": "intermediário",
      "topic": "IPv4/Subnetting/Roteamento"
    },
    {
      "id": "q17.11.final.039",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "5-tuple de conexão inclui:",
      "opts": [
        "IP origem, porta origem, IP destino, porta destino e protocolo",
        "somente DNS",
        "MAC origem e VLAN apenas",
        "SSID e canal"
      ],
      "a": 0,
      "exp": "O 5-tuple identifica fluxos em transporte/rede.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.040",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "Porta efêmera é normalmente:",
      "opts": [
        "porta temporária do cliente",
        "porta fixa do servidor DNS sempre",
        "endereço MAC",
        "rota default"
      ],
      "a": 0,
      "exp": "Clientes usam portas temporárias para iniciar conexões.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.041",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "TIME_WAIT existe para:",
      "opts": [
        "evitar confusão com segmentos atrasados e encerrar conexão corretamente",
        "aumentar DNS TTL",
        "forçar VLAN trunk",
        "substituir firewall"
      ],
      "a": 0,
      "exp": "TIME_WAIT é parte do ciclo de vida TCP.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.042",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "DNS autoritativo é:",
      "opts": [
        "servidor que possui autoridade pela zona",
        "cliente HTTP",
        "gateway default",
        "switch access"
      ],
      "a": 0,
      "exp": "Autoritativo responde pelos registros da zona.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.043",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "DHCP DORA representa:",
      "opts": [
        "Discover, Offer, Request, Acknowledge",
        "DNS, OSI, Route, ARP",
        "Data, Output, Retry, ACK",
        "Default, Open, Relay, Audit"
      ],
      "a": 0,
      "exp": "É o fluxo clássico de obtenção de lease.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.044",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "NAT de saída em cloud pode gerar custo por:",
      "opts": [
        "gateway gerenciado e tráfego processado/egresso",
        "endereços MAC",
        "camada OSI",
        "STP"
      ],
      "a": 0,
      "exp": "NAT gerenciado e egress têm custos recorrentes.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.045",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "UDP timeout em firewall stateful impacta:",
      "opts": [
        "fluxos sem handshake que dependem de janela de estado curta",
        "somente HTTP 404",
        "certificado SAN",
        "VLAN access"
      ],
      "a": 0,
      "exp": "Firewalls criam estado temporário para UDP e podem expirar fluxos.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.046",
      "type": "simulado",
      "domain": "TCP/UDP/DNS/DHCP/NAT",
      "q": "Qual evidência separa DNS de TCP?",
      "opts": [
        "Resolver nome e depois testar IP:porta diretamente",
        "Apenas reiniciar navegador",
        "Trocar VLAN sem medir",
        "Apagar logs"
      ],
      "a": 0,
      "exp": "Separar resolução e conexão evita conclusão errada.",
      "difficulty": "intermediário",
      "topic": "TCP/UDP/DNS/DHCP/NAT"
    },
    {
      "id": "q17.11.final.047",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "curl -v é útil porque:",
      "opts": [
        "mostra conexão, TLS básico, headers e resposta",
        "configura VLAN",
        "descobre MAC do gateway",
        "calcula VLSM"
      ],
      "a": 0,
      "exp": "curl detalha requisição/resposta HTTP e etapas úteis.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.048",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "Status 415 indica:",
      "opts": [
        "tipo de mídia/Content-Type não suportado",
        "rota default ausente sempre",
        "ARP ausente",
        "canal Wi-Fi ruim"
      ],
      "a": 0,
      "exp": "415 ocorre quando o servidor não aceita o formato enviado.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.049",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "API REST bem diagnosticada exige observar:",
      "opts": [
        "método, URL, headers, body, status e correlação de logs",
        "apenas ping",
        "somente MAC",
        "apenas SSID"
      ],
      "a": 0,
      "exp": "APIs falham por contrato, autenticação, payload, rota e upstream.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.050",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "TLS sem SNI pode retornar:",
      "opts": [
        "certificado padrão errado",
        "ARP duplicado",
        "DHCP NAK",
        "rota BGP"
      ],
      "a": 0,
      "exp": "Servidores com múltiplos nomes dependem de SNI para escolher certificado.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.051",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "Proxy reverso fica normalmente:",
      "opts": [
        "entre cliente e aplicação/upstream",
        "entre teclado e monitor",
        "apenas dentro do switch L2",
        "no servidor DHCP sempre"
      ],
      "a": 0,
      "exp": "Ele recebe requisições e encaminha a upstreams.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.052",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "WAF não substitui:",
      "opts": [
        "correção da aplicação, autenticação, segmentação e logs",
        "nenhuma ferramenta",
        "um header Host",
        "status HTTP"
      ],
      "a": 0,
      "exp": "WAF é camada de controle, não cura falhas de arquitetura.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.053",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "Cookies com Secure e HttpOnly ajudam a:",
      "opts": [
        "reduzir exposição de sessão em alguns cenários",
        "corrigir rota default",
        "aumentar SNR",
        "resolver ARP"
      ],
      "a": 0,
      "exp": "São flags de segurança de sessão HTTP.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.054",
      "type": "simulado",
      "domain": "HTTP/TLS/Proxy/API",
      "q": "Qual header ajuda contra clickjacking?",
      "opts": [
        "Content-Security-Policy frame-ancestors ou X-Frame-Options",
        "TTL",
        "Via-MAC",
        "DHCP-Ack"
      ],
      "a": 0,
      "exp": "Esses controles limitam enquadramento por outros sites.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS/Proxy/API"
    },
    {
      "id": "q17.11.final.055",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "Stateful firewall difere de stateless porque:",
      "opts": [
        "mantém estado de conexões/fluxos",
        "sempre faz TLS",
        "sempre resolve DNS",
        "não usa regras"
      ],
      "a": 0,
      "exp": "Stateful usa tabela de estado para retorno relacionado.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.056",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "NAT port forwarding deve sempre considerar:",
      "opts": [
        "origem permitida, porta, destino real, logs, risco e rollback",
        "somente nome bonito",
        "CORS do navegador apenas",
        "canal Wi-Fi"
      ],
      "a": 0,
      "exp": "Publicação controlada exige política e evidência.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.057",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "VPN site-to-site conecta:",
      "opts": [
        "redes entre ambientes, não apenas usuário individual",
        "apenas navegador",
        "somente DNS",
        "somente VLAN access"
      ],
      "a": 0,
      "exp": "Site-to-site cria conectividade entre redes/domínios.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.058",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "ZTNA tende a focar em:",
      "opts": [
        "acesso por identidade, contexto e aplicação, reduzindo confiança implícita",
        "abrir rede inteira",
        "desativar MFA",
        "substituir todos os logs"
      ],
      "a": 0,
      "exp": "ZTNA controla acesso de forma mais granular que VPN ampla.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.059",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "Qual dado é essencial em matriz de regras?",
      "opts": [
        "origem, destino, porta, protocolo, justificativa, dono e expiração",
        "cor do cabo",
        "tamanho da tela",
        "nome do navegador"
      ],
      "a": 0,
      "exp": "Matriz torna regras auditáveis.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.060",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "Logs de deny com contador alto indicam:",
      "opts": [
        "tráfego bloqueado que precisa ser explicado ou corrigido",
        "sucesso garantido",
        "erro de certificado sempre",
        "DHCP correto"
      ],
      "a": 0,
      "exp": "Deny recorrente pode ser tentativa legítima mal desenhada ou comportamento suspeito.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.061",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "MFA reduz risco, mas não substitui:",
      "opts": [
        "autorização por menor privilégio e monitoramento",
        "energia elétrica",
        "HTTP status",
        "SSID"
      ],
      "a": 0,
      "exp": "Autenticação forte precisa ser combinada com autorização e observabilidade.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.062",
      "type": "simulado",
      "domain": "Firewall/VPN/Zero Trust",
      "q": "Split tunnel deve ser documentado porque:",
      "opts": [
        "define quais destinos passam pela VPN e quais saem localmente",
        "define octetos IPv4",
        "cria ARP estático",
        "desativa TLS"
      ],
      "a": 0,
      "exp": "Sem documentação, troubleshooting e segurança ficam ambíguos.",
      "difficulty": "intermediário",
      "topic": "Firewall/VPN/Zero Trust"
    },
    {
      "id": "q17.11.final.063",
      "type": "simulado",
      "domain": "Wireless",
      "q": "2.4 GHz tende a ter:",
      "opts": [
        "maior alcance e mais interferência/congestionamento",
        "sempre maior velocidade que 6 GHz",
        "nenhum canal sobreposto",
        "TLS nativo"
      ],
      "a": 0,
      "exp": "2.4 GHz propaga melhor, mas é mais congestionado.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.11.final.064",
      "type": "simulado",
      "domain": "Wireless",
      "q": "6 GHz exige atenção porque:",
      "opts": [
        "tem mais canais, mas alcance/compatibilidade e regulamentação importam",
        "substitui cabeamento todo",
        "funciona em qualquer cliente antigo",
        "dispensa segurança"
      ],
      "a": 0,
      "exp": "Wi-Fi 6E/7 em 6 GHz depende de clientes, desenho RF e regras locais.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.11.final.065",
      "type": "simulado",
      "domain": "Wireless",
      "q": "Canal congestionado causa:",
      "opts": [
        "retransmissões, latência e baixa experiência",
        "certificado expirado",
        "rota default errada sempre",
        "DHCP sem lease sempre"
      ],
      "a": 0,
      "exp": "Meio compartilhado impacta throughput e latência.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.11.final.066",
      "type": "simulado",
      "domain": "Wireless",
      "q": "WPA3 melhora segurança, mas:",
      "opts": [
        "não corrige RF ruim nem políticas de rede mal desenhadas",
        "elimina IAM",
        "remove DNS",
        "cria VLAN sozinho"
      ],
      "a": 0,
      "exp": "Criptografia/autenticação não substituem design RF e segmentação.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.11.final.067",
      "type": "simulado",
      "domain": "Wireless",
      "q": "SSID de convidados deve normalmente:",
      "opts": [
        "isolar visitantes de redes internas",
        "ter acesso irrestrito a servidores",
        "usar mesma VLAN de administração",
        "desativar logs"
      ],
      "a": 0,
      "exp": "Guest deve ter acesso limitado, geralmente internet apenas.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.11.final.068",
      "type": "simulado",
      "domain": "Wireless",
      "q": "Problema de roaming deve ser investigado com:",
      "opts": [
        "logs de AP/controladora, RSSI/SNR e eventos de reassociação",
        "apenas curl",
        "show ip route apenas",
        "dig +trace"
      ],
      "a": 0,
      "exp": "Roaming envolve RF, cliente e controladora.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.11.final.069",
      "type": "simulado",
      "domain": "Wireless",
      "q": "802.1X em Wi-Fi corporativo depende de:",
      "opts": [
        "identidade, supplicant, AP/controladora e RADIUS/NAC",
        "apenas NAT",
        "somente BGP",
        "CNAME"
      ],
      "a": 0,
      "exp": "WPA Enterprise usa autenticação centralizada.",
      "difficulty": "intermediário",
      "topic": "Wireless"
    },
    {
      "id": "q17.11.final.070",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "VPC/VNet é:",
      "opts": [
        "domínio lógico de rede na cloud",
        "servidor DNS raiz",
        "porta TCP",
        "switch físico doméstico"
      ],
      "a": 0,
      "exp": "É a base de rede virtual cloud.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.071",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "Subnet pública em cloud normalmente tem:",
      "opts": [
        "rota para gateway de internet e políticas adequadas",
        "banco de dados exposto por padrão",
        "ausência de logs sempre",
        "DNS privado obrigatório sempre"
      ],
      "a": 0,
      "exp": "Subnets públicas têm caminho para internet, mas exigem controles.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.072",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "Private DNS em cloud é importante para:",
      "opts": [
        "resolver nomes privados de endpoints internos/gerenciados",
        "aumentar potência Wi-Fi",
        "calcular CRC",
        "substituir IAM"
      ],
      "a": 0,
      "exp": "Private endpoints dependem frequentemente de DNS privado correto.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.073",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "Peering entre redes exige atenção a:",
      "opts": [
        "CIDR não sobreposto, rotas, DNS e política",
        "apenas nome do recurso",
        "status HTTP",
        "SSID"
      ],
      "a": 0,
      "exp": "Peering não funciona bem com sobreposição e requer rotas/políticas.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.074",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "Kubernetes Service expõe:",
      "opts": [
        "um conjunto de pods por IP/DNS/porta virtual conforme tipo",
        "um cabo físico",
        "um certificado raiz",
        "um switch STP"
      ],
      "a": 0,
      "exp": "Service abstrai pods e balanceia acesso interno/externo conforme tipo.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.075",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "NetworkPolicy em Kubernetes depende de:",
      "opts": [
        "CNI compatível e política aplicada corretamente",
        "apenas DNS público",
        "NAT Gateway sempre",
        "WPA3"
      ],
      "a": 0,
      "exp": "Nem todo CNI aplica NetworkPolicy da mesma forma.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.076",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "Observabilidade cloud deve incluir:",
      "opts": [
        "flow logs, métricas, logs de firewall, DNS e auditoria",
        "apenas prints",
        "nenhum custo",
        "somente nome de VPC"
      ],
      "a": 0,
      "exp": "Rede cloud precisa de telemetria para diagnóstico e segurança.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.077",
      "type": "simulado",
      "domain": "Cloud Networking",
      "q": "Landing Zone deve tratar:",
      "opts": [
        "governança, IAM, rede, logging, segurança, custo e padrões",
        "somente deploy rápido",
        "apenas uma subnet",
        "apenas firewall externo"
      ],
      "a": 0,
      "exp": "Base corporativa cloud precisa ser governável e segura.",
      "difficulty": "intermediário",
      "topic": "Cloud Networking"
    },
    {
      "id": "q17.11.final.078",
      "type": "simulado",
      "domain": "Troubleshooting Profissional",
      "q": "Primeiro passo profissional diante de incidente é:",
      "opts": [
        "definir impacto, escopo e evidências iniciais",
        "apontar culpado",
        "mudar regra sem aprovação",
        "apagar logs"
      ],
      "a": 0,
      "exp": "Escopo/impacto/evidência orientam prioridade e ação.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting Profissional"
    },
    {
      "id": "q17.11.final.079",
      "type": "simulado",
      "domain": "Troubleshooting Profissional",
      "q": "Hipótese deve ser:",
      "opts": [
        "testável e falsificável",
        "uma certeza sem dados",
        "sempre DNS",
        "sempre firewall"
      ],
      "a": 0,
      "exp": "Hipóteses boas podem ser confirmadas ou descartadas.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting Profissional"
    },
    {
      "id": "q17.11.final.080",
      "type": "simulado",
      "domain": "Troubleshooting Profissional",
      "q": "Rollback deve existir porque:",
      "opts": [
        "mudanças podem piorar o incidente e precisam ser revertidas",
        "é burocracia inútil",
        "substitui teste",
        "remove logs"
      ],
      "a": 0,
      "exp": "Plano de retorno reduz risco operacional.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting Profissional"
    },
    {
      "id": "q17.11.final.081",
      "type": "simulado",
      "domain": "Troubleshooting Profissional",
      "q": "RCA deve conter:",
      "opts": [
        "linha do tempo, causa, fatores contribuintes, evidências e prevenção",
        "somente opinião",
        "apenas culpado",
        "prints sem contexto"
      ],
      "a": 0,
      "exp": "RCA útil previne recorrência.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting Profissional"
    },
    {
      "id": "q17.11.final.082",
      "type": "simulado",
      "domain": "Troubleshooting Profissional",
      "q": "War room eficiente evita:",
      "opts": [
        "ruído, ações paralelas sem coordenação e falta de dono",
        "evidências",
        "registro de decisões",
        "comunicação de impacto"
      ],
      "a": 0,
      "exp": "Coordenação evita danos e duplicidade.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting Profissional"
    },
    {
      "id": "q17.11.final.083",
      "type": "simulado",
      "domain": "Troubleshooting Profissional",
      "q": "Teste de regressão confirma:",
      "opts": [
        "que a correção não quebrou fluxos relacionados",
        "que DNS sempre falhou",
        "que não há custo",
        "que logs são desnecessários"
      ],
      "a": 0,
      "exp": "Após correção, é preciso validar o serviço e dependências.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting Profissional"
    },
    {
      "id": "q17.11.final.084",
      "type": "simulado",
      "domain": "Troubleshooting Profissional",
      "q": "Evidência sanitizada significa:",
      "opts": [
        "remover segredos/dados sensíveis antes de compartilhar",
        "apagar todo conteúdo técnico",
        "inventar logs",
        "desativar auditoria"
      ],
      "a": 0,
      "exp": "Compartilhar evidência exige privacidade e segurança.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting Profissional"
    },
    {
      "id": "q17.11.final.085",
      "type": "simulado",
      "domain": "Segurança/Blue Team",
      "q": "Detecção defensiva deve priorizar:",
      "opts": [
        "sinais correlacionados, contexto e redução de falso positivo",
        "um indicador isolado como prova final",
        "execução ofensiva fora de escopo",
        "apagamento de dados"
      ],
      "a": 0,
      "exp": "Blue Team trabalha com correlação e contexto.",
      "difficulty": "intermediário",
      "topic": "Segurança/Blue Team"
    },
    {
      "id": "q17.11.final.086",
      "type": "simulado",
      "domain": "Segurança/Blue Team",
      "q": "Zeek conn.log registra principalmente:",
      "opts": [
        "metadados de conexões/fluxos",
        "senhas em claro por padrão",
        "configuração de VLAN",
        "certificados raiz sempre"
      ],
      "a": 0,
      "exp": "conn.log é útil para análise de fluxo.",
      "difficulty": "intermediário",
      "topic": "Segurança/Blue Team"
    },
    {
      "id": "q17.11.final.087",
      "type": "simulado",
      "domain": "Segurança/Blue Team",
      "q": "DNS tunneling pode aparecer como:",
      "opts": [
        "muitas consultas estranhas/longas para domínio raro",
        "rota default correta",
        "RSSI alto",
        "DHCP ACK normal"
      ],
      "a": 0,
      "exp": "Consultas anômalas podem indicar abuso de DNS e exigem correlação.",
      "difficulty": "intermediário",
      "topic": "Segurança/Blue Team"
    },
    {
      "id": "q17.11.final.088",
      "type": "simulado",
      "domain": "Segurança/Blue Team",
      "q": "Containment defensivo deve considerar:",
      "opts": [
        "impacto no negócio, evidência, escopo e autorização",
        "desligar tudo sem comunicar",
        "apagar host",
        "abrir firewall"
      ],
      "a": 0,
      "exp": "Contenção precisa reduzir risco sem causar dano desnecessário.",
      "difficulty": "intermediário",
      "topic": "Segurança/Blue Team"
    },
    {
      "id": "q17.11.final.089",
      "type": "simulado",
      "domain": "Segurança/Blue Team",
      "q": "Menor privilégio ajuda contra:",
      "opts": [
        "movimento lateral e exposição desnecessária",
        "interferência RF",
        "CIDR inválido apenas",
        "SNI incorreto"
      ],
      "a": 0,
      "exp": "Controle de acesso mínimo reduz alcance de abuso.",
      "difficulty": "intermediário",
      "topic": "Segurança/Blue Team"
    },
    {
      "id": "q17.11.final.090",
      "type": "simulado",
      "domain": "Segurança/Blue Team",
      "q": "Em curso defensivo, datasets sintéticos são usados para:",
      "opts": [
        "treinar análise sem expor dados reais ou ensinar abuso operacional",
        "substituir ética",
        "permitir ataque real",
        "burlar autorização"
      ],
      "a": 0,
      "exp": "Dados sintéticos permitem prática segura e controlada.",
      "difficulty": "intermediário",
      "topic": "Segurança/Blue Team"
    }
  ],
  "flashcards": [
    {
      "front": "Auditoria de consolidação",
      "back": "Processo de verificar cobertura, evidências, lacunas e prontidão antes de concluir um curso ou projeto."
    },
    {
      "front": "Critério de aceite",
      "back": "Condição objetiva usada para decidir se um domínio está aprovado, parcial ou pendente."
    },
    {
      "front": "Evidência",
      "back": "Artefato que comprova competência: lab, log, diagrama, simulado corrigido, RCA, matriz de fluxos ou PCAP sanitizado."
    },
    {
      "front": "Risco residual",
      "back": "Risco conhecido que permanece após controles ou remediações e precisa ser documentado com impacto e justificativa."
    },
    {
      "front": "Plano de remediação",
      "back": "Lista de ações para corrigir lacunas, com prioridade, prazo, evidência esperada e aula de referência."
    },
    {
      "front": "Prontidão para capstone",
      "back": "Estado em que o aluno possui evidências suficientes para aplicar o conhecimento em projeto final integrado."
    }
  ],
  "mentorQuestions": [
    "Qual domínio você marcaria como parcial hoje e qual evidência falta para aprová-lo?",
    "Se alguém pedisse para você provar domínio de Cloud Networking, quais três artefatos apresentaria?",
    "Qual risco residual você aceitaria antes do capstone e qual você não aceitaria de forma alguma?"
  ],
  "exercises": [
    {
      "title": "Critérios de aceite por domínio",
      "prompt": "Escolha três domínios e escreva cinco critérios de aceite para cada um.",
      "expectedAnswer": "Critérios objetivos, mensuráveis e associados a evidências."
    },
    {
      "title": "Banco de lacunas",
      "prompt": "Revise dois simulados anteriores e agrupe erros por tema.",
      "expectedAnswer": "Lista de lacunas por domínio, com ação de remediação."
    },
    {
      "title": "Evidência de portfólio",
      "prompt": "Escolha um laboratório e transforme-o em artefato de portfólio com README, diagrama e lições aprendidas.",
      "expectedAnswer": "Artefato sanitizado, explicável e tecnicamente verificável."
    },
    {
      "title": "Declaração de prontidão",
      "prompt": "Escreva uma decisão: pronto, pronto com ressalvas ou ainda não pronto para o capstone.",
      "expectedAnswer": "Decisão sustentada por checklist, evidências e plano de remediação."
    },
    {
      "id": "ex17.11.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C01, C02, C03, C04, C05, C06, C07, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "challenge": {
    "title": "Plano de revisão orientado por lacunas do simulado final",
    "description": "Monte um dossiê de auditoria com 12 domínios, critérios de aceite, evidências, status, lacunas, riscos residuais e plano de remediação antes do capstone final.",
    "deliverables": [
      "Checklist de domínios",
      "Matriz critério-evidência-status",
      "Banco de lacunas",
      "Plano de remediação",
      "Declaração de prontidão",
      "Pacote de artefatos para 17.12"
    ],
    "constraints": [
      "Não avance para defender domínio crítico sem reteste.",
      "Não use dados sensíveis em evidências.",
      "Não altere a navegação livre do curso."
    ],
    "tasks": [
      "Calcular pontuação geral e por domínio.",
      "Classificar domínios em crítico, atenção, aprovado com ressalvas e domínio forte.",
      "Escolher pelo menos uma aula e um laboratório de reforço para cada domínio abaixo de 70%.",
      "Definir reteste objetivo para cada domínio fraco.",
      "Anexar a matriz ao pacote do capstone 17.12."
    ],
    "expectedDeliverables": [
      "Pontuação geral",
      "Matriz de lacunas por domínio",
      "Plano de revisão de 14 dias",
      "Evidências de reteste",
      "Decisão de prontidão para capstone"
    ],
    "successCriteria": [
      "Cada competência tem evidência observável.",
      "Cada erro tem causa classificada.",
      "A rubrica sustenta a decisão de aprovação.",
      "O plano de revisão tem tarefa prática e prazo."
    ],
    "gradingRubric": [
      {
        "criterion": "Correção por domínio",
        "points": 25,
        "description": "Pontuação e lacunas calculadas por tema, não apenas nota geral."
      },
      {
        "criterion": "Plano de revisão",
        "points": 25,
        "description": "Ações concretas por domínio abaixo do mínimo."
      },
      {
        "criterion": "Evidência de reteste",
        "points": 25,
        "description": "Revisão comprovada por exercício, lab ou nova tentativa."
      },
      {
        "criterion": "Decisão de prontidão",
        "points": 25,
        "description": "Decisão honesta e justificada para avançar ao capstone."
      }
    ],
    "scenario": "Você terminou o simulado final e precisa decidir se está pronto para defender o capstone. A decisão não pode depender de impressão subjetiva; ela precisa vir de domínio, evidência e reteste."
  },
  "commentedSolution": {
    "reasoning": "A correção ideal começa pela nota geral, mas não termina nela. O aluno cruza cada erro com domínio, tipo de erro e evidência que faltou. Depois transforma lacunas em plano de revisão e reteste.",
    "steps": [
      "Responder as 90 questões sem consulta.",
      "Corrigir por domínio.",
      "Separar erro conceitual, erro de interpretação e falta de prática.",
      "Associar cada lacuna a aulas/labs.",
      "Executar reforço.",
      "Retestar domínios abaixo do mínimo.",
      "Levar relatório para o capstone."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Olhar apenas a nota final.",
        "whyItIsWrong": "Uma média alta pode esconder domínio crítico abaixo do mínimo."
      },
      {
        "answer": "Refazer questões até decorar alternativa.",
        "whyItIsWrong": "Isso mascara lacuna conceitual e não produz competência operacional."
      },
      {
        "answer": "Avançar para o capstone ignorando lacunas de rota/firewall/DNS.",
        "whyItIsWrong": "Essas lacunas quebram a defesa técnica do projeto final."
      }
    ],
    "finalAnswer": "O aluno está pronto para o capstone quando atinge pelo menos 80% geral, nenhum domínio crítico abaixo de 70% sem reteste e possui evidências para justificar pontos fracos residuais."
  },
  "glossary": [
    {
      "term": "Auditoria de consolidação",
      "definition": "Revisão estruturada que verifica se conhecimento e artefatos atingem critérios de prontidão."
    },
    {
      "term": "Critério de aceite",
      "definition": "Condição objetiva usada para aceitar ou rejeitar um item avaliado."
    },
    {
      "term": "Evidência verificável",
      "definition": "Artefato que permite confirmar uma competência sem depender apenas de declaração do aluno."
    },
    {
      "term": "Lacuna",
      "definition": "Diferença entre competência esperada e evidência disponível."
    },
    {
      "term": "Risco residual",
      "definition": "Risco restante após controles, mitigação ou decisão consciente de aceite."
    },
    {
      "term": "Prontidão",
      "definition": "Condição de estar suficientemente preparado para executar uma atividade mais complexa, como o capstone."
    }
  ],
  "references": [
    {
      "title": "NIST Cybersecurity Framework 2.0",
      "url": "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf",
      "note": "Referência para funções Govern, Identify, Protect, Detect, Respond e Recover."
    },
    {
      "title": "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "note": "Referência para planejamento, execução, análise e relatório de testes técnicos."
    },
    {
      "title": "NICE Framework Resource Center",
      "url": "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center",
      "note": "Referência para linguagem comum de trabalho, conhecimentos e habilidades em cibersegurança."
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
        "name": "Risco de avaliação sem evidência — Auditoria, simulado final e relatório de lacunas por domínio",
        "description": "Em Auditoria, simulado final e relatório de lacunas por domínio, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.11."
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
      "Qual evidência comprova o entendimento da aula 17.11?"
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
      "17.12"
    ]
  },
  "assessmentBlueprint": {
    "id": "assessment-17.11",
    "title": "Avaliação por competência — Auditoria do curso e checklist de consolidação da v1.0",
    "assessmentType": "auditoria final",
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
  "auditReadiness": {
    "requiredBeforeCapstone": true,
    "checks": [
      "todas as competências C01-C08 possuem evidência mínima",
      "simulados 17.3-17.6 corrigidos por competência",
      "estudos de caso 17.7-17.8 possuem RCA e solução comentada",
      "portfólio 17.9 está sanitizado",
      "roadmap 17.10 tem trilha de 30/60/90 dias",
      "capstone 17.12 possui pacote de entrada pronto"
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
  ],
  "finalExamBlueprint": {
    "mode": "simulado final integral",
    "questionCount": 90,
    "minimumScore": 80,
    "masteryScore": 92,
    "domains": [
      {
        "name": "Fundamentos de Computação",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "Fundamentos de Redes",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "OSI/TCP-IP",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "Ethernet/L2/ARP/VLAN/STP",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "IPv4/Subnetting/Roteamento",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "TCP/UDP/DNS/DHCP/NAT",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "HTTP/TLS/Proxy/API",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "Firewall/VPN/Zero Trust",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "Wireless",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "Cloud Networking",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "Troubleshooting Profissional",
        "minimum": 70,
        "mastery": 90
      },
      {
        "name": "Segurança/Blue Team",
        "minimum": 70,
        "mastery": 90
      }
    ],
    "correctionMethod": "corrigir por domínio, produzir matriz de lacunas, retestar domínios fracos e anexar evidências ao capstone",
    "freeAccess": true,
    "navigationBlocked": false
  },
  "domainGapReport": {
    "required": true,
    "title": "Relatório de lacunas por domínio — Simulado Final",
    "domains": [
      "Fundamentos de Computação",
      "Fundamentos de Redes",
      "OSI/TCP-IP",
      "Ethernet/L2/ARP/VLAN/STP",
      "IPv4/Subnetting/Roteamento",
      "TCP/UDP/DNS/DHCP/NAT",
      "HTTP/TLS/Proxy/API",
      "Firewall/VPN/Zero Trust",
      "Wireless",
      "Cloud Networking",
      "Troubleshooting Profissional",
      "Segurança/Blue Team"
    ],
    "requiredFields": [
      "Domínio",
      "Questões respondidas",
      "Acertos",
      "Percentual",
      "Erros conceituais",
      "Erros de interpretação",
      "Aulas de revisão",
      "Laboratório ou exercício de reforço",
      "Evidência de reteste",
      "Status final"
    ],
    "thresholds": {
      "critical": "abaixo de 50%: refazer bloco antes do capstone",
      "attention": "50%-69%: revisão obrigatória e reteste",
      "acceptable": "70%-89%: aprovado com ressalvas e reforço pontual",
      "mastery": "90%-100%: domínio forte"
    }
  }
};
