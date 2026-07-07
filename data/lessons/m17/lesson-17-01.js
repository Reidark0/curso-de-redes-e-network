export const lesson1701 = {
  "id": "17.1",
  "moduleId": "m17",
  "order": 1,
  "title": "Como revisar redes de forma profissional",
  "subtitle": "Como transformar um curso extenso de redes em competência prática, portfólio, diagnóstico, arquitetura e revisão ativa baseada em evidências.",
  "duration": "180-260 min",
  "estimatedStudyTimeMinutes": 260,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "revisão profissional",
    "mapa mental",
    "simulados",
    "portfólio",
    "competências",
    "troubleshooting",
    "arquitetura",
    "segurança",
    "cloud",
    "DevSecOps",
    "RCA",
    "aprendizagem ativa",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m12",
      "reason": "Wireless aparece nos simulados e estudos de caso finais."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "reason": "Segurança de redes será consolidada nos estudos de caso e capstone."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking será cobrado em arquitetura e troubleshooting."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting fornece método de evidência, hipótese, RCA e playbook."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Cibersegurança defensiva baseada em redes será revisada nos cenários finais."
    }
  ],
  "objectives": [
    "Diferenciar revisão passiva de revisão profissional baseada em aplicação e evidência.",
    "Criar um sistema de revisão com competências, lacunas, entregáveis e critérios de domínio.",
    "Organizar o curso inteiro por dependências, e não apenas por ordem cronológica.",
    "Usar simulados, estudos de caso, laboratórios e projetos como mecanismos complementares de consolidação.",
    "Transformar erros recorrentes em flashcards, checklists, labs, diagramas e melhorias de portfólio.",
    "Preparar o aluno para o mapa mental, simulados e capstone final do Módulo 17."
  ],
  "learningOutcomes": [
    "Dado um tema de redes, o aluno define se domina explicação, diagnóstico, desenho e comunicação.",
    "Dada uma lacuna, o aluno transforma o erro em ação de revisão verificável.",
    "Dado um fluxo corporativo, o aluno identifica dependências entre camadas e controles.",
    "Dado um simulado, o aluno extrai diagnóstico de lacunas em vez de apenas contar acertos.",
    "Dado um estudo de caso, o aluno produz mapa, hipótese, evidência e solução comentada.",
    "Dado o curso completo, o aluno monta um plano de revisão até o capstone final."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Depois de dezenas de aulas, laboratórios, diagramas, simulados parciais e projetos, surge uma pergunta inevitável: <strong>como revisar redes sem apenas reler tudo passivamente?</strong> Revisão profissional não é voltar ao começo e decorar definições. Revisão profissional é transformar conhecimento espalhado em capacidade operacional: explicar, diagnosticar, desenhar, defender, justificar e melhorar uma rede real.</p>\n  <p>Este módulo final existe para consolidar o curso inteiro. A partir daqui, o aluno deixa de estudar cada assunto isoladamente e passa a enxergar dependências: Ethernet depende de camada física, VLAN depende de switching, subnetting depende de binário e CIDR, DNS depende de IP e transporte, TLS depende de TCP e certificados, cloud networking depende de rotas, DNS, políticas, identidade e observabilidade.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> revisar profissionalmente é testar se você consegue aplicar o conhecimento sob contexto, restrição, evidência e risco. Quem apenas reconhece termos ainda não domina redes. Quem explica fluxos, encontra falhas e justifica decisões começa a operar como profissional.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>Durante muito tempo, o estudo de redes foi organizado em torno de listas de protocolos e modelos em camadas. Isso foi útil para padronizar vocabulário: OSI, TCP/IP, Ethernet, IPv4, TCP, UDP, DNS, HTTP, routing, switching e segurança. Porém, no mundo corporativo, problemas reais raramente aparecem com uma etiqueta dizendo “sou problema de camada 3”.</p>\n  <p>Com a evolução de data centers, virtualização, Wi-Fi corporativo, VPN, cloud, Kubernetes, DevSecOps e Zero Trust, a revisão também precisou evoluir. O profissional moderno não revisa apenas para prova. Ele revisa para atuar em mudanças, incidentes, auditorias, entrevistas, desenho de arquitetura, troubleshooting, SOC, cloud e segurança.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Estudo por protocolo:</strong> aprender definições e comandos isolados.</div><div class=\"timeline-item\"><strong>Estudo por camada:</strong> entender dependências entre física, enlace, rede, transporte e aplicação.</div><div class=\"timeline-item\"><strong>Estudo por cenário:</strong> investigar problemas reais com sintomas, hipóteses e evidências.</div><div class=\"timeline-item\"><strong>Estudo por arquitetura:</strong> justificar desenho, custo, segurança, operação e governança.</div><div class=\"timeline-item\"><strong>Estudo por competência:</strong> demonstrar capacidade prática, comunicável e repetível.</div></div>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema desta aula é que revisões ruins criam falsa confiança. O aluno relê um capítulo sobre DNS e acha que sabe DNS, mas não consegue explicar por que um cliente recebe NXDOMAIN em uma rede e resposta correta em outra. Ele decora que TCP usa three-way handshake, mas não distingue timeout, reset e refused em um incidente. Ele entende que cloud tem VPC, mas não sabe justificar CIDR, subnets, rotas, NAT, private endpoints e flow logs juntos.</p>\n  <p>Isso acontece porque conhecimento técnico pode ficar fragmentado. O profissional lembra termos, mas não constrói modelos mentais. Ele sabe comandos, mas não sabe formular hipótese. Ele sabe “o que é”, mas não sabe “quando usar”, “quando não usar”, “qual evidência confirma”, “qual risco cria” e “qual impacto financeiro ou operacional gera”.</p>\n  <ul>\n    <li><strong>Revisão passiva:</strong> reler conteúdo sem produzir nada verificável;</li>\n    <li><strong>Revisão por memorização:</strong> decorar siglas sem entender fluxo;</li>\n    <li><strong>Revisão sem evidência:</strong> responder por intuição sem validar;</li>\n    <li><strong>Revisão sem contexto:</strong> não considerar negócio, segurança, custo e operação;</li>\n    <li><strong>Revisão sem lacunas:</strong> não registrar o que ainda precisa ser reforçado.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>A revisão profissional evolui em cinco níveis. No primeiro, o aluno reconhece termos. No segundo, explica conceitos com suas próprias palavras. No terceiro, resolve exercícios controlados. No quarto, diagnostica cenários com evidências. No quinto, desenha arquitetura e defende escolhas diante de restrições reais.</p>\n  <p>Essa evolução combina prática deliberada, recuperação ativa da memória, resolução de problemas, simulação de incidentes, documentação e feedback. Em redes, isso significa alternar entre mapas mentais, diagramas, flashcards, quizzes, labs, estudos de caso, war rooms, simulados e projetos. Cada formato treina uma habilidade diferente.</p>\n  <div class=\"callout callout--success\"><strong>Meta do Módulo 17:</strong> transformar o curso inteiro em um sistema de revisão, simulação e portfólio. O objetivo não é terminar o HTML; é sair com evidências de competência.</div>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>Revisão profissional de redes é o processo estruturado de consolidar fundamentos, identificar lacunas, aplicar conhecimento em cenários e produzir evidências de domínio. Ela não depende de “sentir que entendeu”. Ela depende de entregáveis: explicações, mapas, checklists, matrizes de fluxo, diagnósticos, simulados, relatórios e projetos.</p>\n  <p>Uma boa revisão sempre responde quatro perguntas:</p>\n  <ul>\n    <li><strong>Eu consigo explicar?</strong> Sem copiar, com analogia e exemplo prático;</li>\n    <li><strong>Eu consigo diagnosticar?</strong> A partir de sintoma, hipótese, evidência e teste;</li>\n    <li><strong>Eu consigo desenhar?</strong> Com segurança, custo, operação e escalabilidade;</li>\n    <li><strong>Eu consigo comunicar?</strong> Para técnico, gestor, auditor e time de segurança.</li>\n  </ul>\n  <p>Essa definição combina redes, troubleshooting, segurança, cloud e DevSecOps. Por isso, esta aula abre o módulo final como uma mudança de postura: a revisão passa a ser tratada como prática profissional.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, uma revisão profissional funciona como um ciclo. Primeiro vem o inventário de conhecimento: quais módulos, temas e competências existem. Depois vem o diagnóstico de lacunas: onde o aluno erra, hesita, confunde conceitos ou depende de memorização. Em seguida vem a prática ativa: explicar, resolver, diagramar e simular. Por fim, vem a correção: comparar com solução comentada, registrar erro e refazer depois.</p>\n  <p>Em redes, esse ciclo precisa seguir dependências. Não adianta revisar Private Link sem entender DNS privado, rotas e segurança. Não adianta revisar TLS sem entender TCP e certificados. Não adianta revisar SIEM sem entender quais logs existem. Portanto, a revisão deve ser orientada por grafo de dependências, não por lista aleatória.</p>\n  <ol>\n    <li><strong>Recuperar:</strong> tentar lembrar sem olhar o material;</li>\n    <li><strong>Aplicar:</strong> resolver cenário ou desenhar fluxo;</li>\n    <li><strong>Validar:</strong> comparar com critérios técnicos;</li>\n    <li><strong>Corrigir:</strong> registrar lacuna e causa do erro;</li>\n    <li><strong>Repetir:</strong> voltar ao tema em outro contexto.</li>\n  </ol>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura da revisão do Módulo 17 será dividida em cinco blocos. O primeiro bloco organiza a revisão profissional e o mapa mental do curso. O segundo bloco traz simulados por grupos de temas: fundamentos, subnetting, transporte, DNS, HTTP/TLS, firewall, VPN, wireless, segurança, cloud e troubleshooting. O terceiro bloco traz estudos de caso. O quarto bloco transforma labs em portfólio. O quinto bloco fecha com auditoria e capstone final.</p>\n  <p>Essa arquitetura evita dois erros comuns: revisar apenas o que é confortável e fazer simulados sem aprender com os erros. Cada simulado deve gerar uma lista de lacunas. Cada estudo de caso deve gerar um raciocínio documentado. Cada projeto deve gerar um artefato reutilizável.</p>\n  <div class=\"callout callout--info\"><strong>Ligação entre cursos:</strong> esta aula depende de todo o curso Redes e Network até o Módulo 16. Ao revisar identidade, acesso, Zero Trust e service accounts, conecte com o curso Enterprise Identity, IAM, Segurança e Acessos. Ao revisar pipelines, IaC e Kubernetes, conecte com o curso Infraestrutura Moderna, Platform Engineering e DevSecOps.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Imagine um médico revisando anatomia, fisiologia, diagnóstico por imagem, farmacologia e emergência. Ele não se torna bom apenas relendo livros. Ele melhora ao discutir casos, levantar hipóteses, pedir exames, interpretar sinais, decidir conduta, avaliar risco e aprender com o desfecho. Redes funcionam de forma parecida.</p>\n  <p>O aluno que revisa redes profissionalmente não apenas diz “DNS traduz nomes”. Ele recebe um caso: usuários internos acessam uma aplicação, usuários remotos não; cloud funciona por IP, mas não por nome; o certificado parece correto, mas o navegador mostra erro. A partir disso, ele investiga DNS, split-horizon, cache, rota, firewall, TLS, proxy e logs. Essa é a diferença entre lembrar e praticar.</p>\n  <div class=\"callout callout--success\"><strong>Analogia:</strong> revisão passiva é olhar um mapa. Revisão profissional é dirigir pela cidade, explicar o trajeto, lidar com bloqueios, justificar rotas alternativas e chegar com segurança.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Um exemplo simples: você quer revisar DNS. Em vez de reler apenas a definição, responda sem consultar: qual é a diferença entre resolvedor recursivo e servidor autoritativo? O que TTL muda durante um incidente? O que significa NXDOMAIN? Como split-horizon pode fazer dois usuários receberem respostas diferentes? Que logs ajudam a investigar?</p>\n  <p>Depois, desenhe o fluxo: cliente → cache local → resolvedor → autoritativo → resposta → conexão TCP/TLS. Em seguida, crie dois sintomas e explique hipóteses. Por fim, compare com a aula 15.5 e registre o que errou. Isso transforma revisão em prática.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, uma revisão profissional pode virar trilha interna de capacitação. A equipe escolhe um fluxo crítico, como acesso ao ERP. Cada participante desenha o caminho completo: usuário, DNS, proxy, firewall, VPN, load balancer, aplicação, banco, logs, identidade, backup e monitoramento. Depois, cada pessoa identifica três riscos e três evidências necessárias para troubleshooting.</p>\n  <p>O resultado não é só estudo individual. A empresa ganha documentação, matriz de dependências, lacunas de observabilidade, riscos de segurança e material para onboarding. Esse é um exemplo de estudo gerando valor operacional.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Na cloud, revisar redes exige pensar em arquitetura e cobrança. Um bom exercício é escolher uma aplicação publicada em nuvem e responder: qual VPC/VNet ela usa? Quais subnets são públicas, privadas ou isoladas? Existe NAT Gateway? O tráfego passa por WAF? O banco usa endpoint privado? Há flow logs? Quem paga egress? Existe peering ou transit? DNS privado está correto?</p>\n  <p>Essa revisão conecta Módulo 14 e Módulo 15. Cloud networking não é apenas criar recurso. É entender caminho efetivo, política efetiva, logs, custo, governança e risco residual.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, revisão profissional vira automação. Se você percebe que sempre erra regras de Security Group, crie um checklist de IaC. Se percebe que esquece logs, crie guardrail de pipeline exigindo flow logs, tags e owner. Se percebe que serviços são publicados sem health check, crie teste automatizado para impedir deploy incompleto.</p>\n  <p>O objetivo é transformar erro de revisão em melhoria de plataforma. Assim, o aprendizado deixa de ser só pessoal e passa a proteger ambientes futuros.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Em Segurança da Informação, revisão profissional precisa conectar prevenção, detecção, resposta e recuperação. Ao revisar movimento lateral, por exemplo, não basta saber a definição. É necessário saber quais fluxos seriam abusados, quais controles limitam, quais logs detectam, qual playbook responde e qual melhoria evita recorrência.</p>\n  <p>Ao revisar C2, exfiltração ou MITM, o foco deve ser defensivo: indicadores, anomalias, telemetria, contenção proporcional, privacidade e evidência. O Módulo 17 vai cobrar esse tipo de maturidade nos estudos de caso e no capstone final.</p>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra a revisão profissional como um ciclo: mapear conhecimento, recuperar ativamente, aplicar em cenário, validar, registrar lacuna e transformar em melhoria.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Ciclo de revisão profissional de redes\">\n    <svg viewBox=\"0 0 1180 640\" class=\"course-svg course-svg--wide\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-17-1-content-diagram-1-title svg-17-1-content-diagram-1-desc\">\n      <title id=\"svg-17-1-content-diagram-1-title\">Como revisar redes de forma profissional</title>\n      <desc id=\"svg-17-1-content-diagram-1-desc\">Diagrama pedagógico da aula 17.1, Como revisar redes de forma profissional, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-1701\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n          <path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-marker\" />\n        </marker>\n      </defs>\n      <rect x=\"35\" y=\"35\" width=\"1110\" height=\"570\" rx=\"24\" class=\"svg-frame\" />\n      <text x=\"590\" y=\"78\" text-anchor=\"middle\" class=\"svg-title\">Revisão profissional de redes</text>\n\n      <rect x=\"80\" y=\"145\" width=\"185\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--process\" />\n      <text x=\"172\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Mapa do curso</text>\n      <text x=\"172\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">módulos, temas</text>\n      <text x=\"172\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">dependências</text>\n\n      <rect x=\"335\" y=\"145\" width=\"185\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--analysis\" />\n      <text x=\"428\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Recuperação ativa</text>\n      <text x=\"428\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">explicar sem olhar</text>\n      <text x=\"428\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">flashcards, quiz</text>\n\n      <rect x=\"590\" y=\"145\" width=\"185\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--control\" />\n      <text x=\"682\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n      <text x=\"682\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">labs, estudos</text>\n      <text x=\"682\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">casos e desenho</text>\n\n      <rect x=\"845\" y=\"145\" width=\"185\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--sensor\" />\n      <text x=\"938\" y=\"176\" text-anchor=\"middle\" class=\"svg-label\">Validação</text>\n      <text x=\"938\" y=\"202\" text-anchor=\"middle\" class=\"svg-small\">evidência</text>\n      <text x=\"938\" y=\"224\" text-anchor=\"middle\" class=\"svg-small\">critérios e feedback</text>\n\n      <rect x=\"210\" y=\"365\" width=\"230\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--warning\" />\n      <text x=\"325\" y=\"398\" text-anchor=\"middle\" class=\"svg-label\">Lacunas</text>\n      <text x=\"325\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">erros, hesitações</text>\n      <text x=\"325\" y=\"446\" text-anchor=\"middle\" class=\"svg-small\">confusões recorrentes</text>\n\n      <rect x=\"505\" y=\"365\" width=\"230\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--outcome\" />\n      <text x=\"620\" y=\"398\" text-anchor=\"middle\" class=\"svg-label\">Melhoria</text>\n      <text x=\"620\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">checklist, mapa</text>\n      <text x=\"620\" y=\"446\" text-anchor=\"middle\" class=\"svg-small\">novo lab e reteste</text>\n\n      <rect x=\"800\" y=\"365\" width=\"230\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--security\" />\n      <text x=\"915\" y=\"398\" text-anchor=\"middle\" class=\"svg-label\">Portfólio</text>\n      <text x=\"915\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">diagramas, RCA</text>\n      <text x=\"915\" y=\"446\" text-anchor=\"middle\" class=\"svg-small\">simulados e projetos</text>\n\n      <path d=\"M265 195 L335 195\" class=\"svg-arrow\" marker-end=\"url(#arrow-1701)\" />\n      <path d=\"M520 195 L590 195\" class=\"svg-arrow\" marker-end=\"url(#arrow-1701)\" />\n      <path d=\"M775 195 L845 195\" class=\"svg-arrow\" marker-end=\"url(#arrow-1701)\" />\n      <path d=\"M938 245 C930 315 390 305 325 365\" class=\"svg-arrow\" marker-end=\"url(#arrow-1701)\" />\n      <path d=\"M440 418 L505 418\" class=\"svg-arrow\" marker-end=\"url(#arrow-1701)\" />\n      <path d=\"M735 418 L800 418\" class=\"svg-arrow\" marker-end=\"url(#arrow-1701)\" />\n      <path d=\"M915 365 C900 290 200 300 172 245\" class=\"svg-arrow svg-arrow--muted\" marker-end=\"url(#arrow-1701)\" />\n\n      <text x=\"590\" y=\"540\" text-anchor=\"middle\" class=\"svg-caption\">Revisar é produzir evidência de domínio: explicação, diagnóstico, arquitetura, documentação e melhoria.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios treinam a passagem de revisão passiva para revisão ativa. Em todos eles, a resposta deve incluir conceito, exemplo, evidência e relação com segurança ou operação.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio desta aula é criar seu plano de revisão para o Módulo 17 inteiro, incluindo simulados, estudos de caso, laboratórios pendentes, lacunas pessoais e entregáveis de portfólio.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra um modelo de plano de revisão profissional com priorização por risco, dependência e frequência de erro. Ela também mostra como transformar lacunas em ações concretas.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Nesta aula, você aprendeu que revisar redes profissionalmente não é reler conteúdo. É recuperar conhecimento ativamente, aplicar em cenários, validar com evidências, registrar lacunas e transformar erros em melhoria.</p>\n  <p>O Módulo 17 será a reta final do curso. Ele vai consolidar fundamentos, simulados, estudos de caso, portfólio e projeto capstone. A qualidade da sua revisão determinará a qualidade do seu domínio.</p>\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C01</td><td>Fundamentos, OSI e encapsulamento</td><td>70%</td><td>90%</td><td>explica fluxo de dados por camadas e reconhece onde cada evidência aparece</td></tr><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, você construirá o <strong>Mapa mental completo: do bit à cloud</strong>. A ideia será visualizar todo o curso em uma única estrutura: camada física, Ethernet, VLAN, IP, roteamento, transporte, DNS, HTTP/TLS, wireless, segurança, cloud, troubleshooting e cibersegurança.</p>\n</section>"
  },
  "exercises": [
    {
      "title": "Revisão ativa de DNS",
      "prompt": "Explique DNS em cinco níveis: conceito, fluxo, troubleshooting, segurança e cloud.",
      "difficulty": "intermediário",
      "expectedAnswer": "Deve mencionar resolvedor, autoritativo, cache/TTL, split-horizon, logs, DNS privado e relação com incidentes."
    },
    {
      "title": "Dependências de TLS",
      "prompt": "Liste os pré-requisitos que precisam funcionar antes de culpar TLS por uma falha HTTPS.",
      "difficulty": "intermediário",
      "expectedAnswer": "DNS, rota, firewall, TCP, SNI, certificado, cadeia, trust store, listener, proxy/LB e backend."
    },
    {
      "title": "Erro de simulado",
      "prompt": "Você errou uma questão sobre NAT Gateway. Transforme o erro em plano de revisão.",
      "difficulty": "intermediário",
      "expectedAnswer": "Registrar conceito errado, revisar rota default, egress, custo, logs, retorno, comparar cloud providers e refazer cenário."
    },
    {
      "title": "Critério de domínio",
      "prompt": "Defina como provar que você domina troubleshooting de firewall/NAT.",
      "difficulty": "avançado",
      "expectedAnswer": "Deve incluir matriz origem-destino-porta, regra efetiva, hit count, sessão, NAT, rota de retorno, logs, rollback e RCA."
    },
    {
      "id": "ex17.1.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C01, C03, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "quiz": [
    {
      "question": "Qual é a principal diferença entre revisão passiva e revisão profissional?",
      "options": [
        "Revisão passiva usa mais tempo; revisão profissional usa menos tempo.",
        "Revisão passiva relê conteúdo; revisão profissional produz aplicação, evidência e correção.",
        "Revisão passiva é para iniciantes; revisão profissional elimina teoria.",
        "Revisão profissional depende apenas de simulados."
      ],
      "answer": 1,
      "explanation": "Revisão profissional exige recuperação ativa, aplicação, validação e registro de lacunas."
    },
    {
      "question": "Por que revisar por dependências é melhor que revisar aleatoriamente?",
      "options": [
        "Porque elimina necessidade de labs.",
        "Porque temas avançados dependem de fundamentos que precisam estar sólidos.",
        "Porque evita estudar segurança.",
        "Porque serve apenas para cloud."
      ],
      "answer": 1,
      "explanation": "Private endpoints, TLS, VPN, Kubernetes e SIEM dependem de conceitos de IP, DNS, transporte, rotas, políticas e logs."
    },
    {
      "question": "Qual artefato melhor prova domínio profissional?",
      "options": [
        "Uma lista de siglas decoradas.",
        "Um print de uma ferramenta aberta.",
        "Um relatório com problema, hipótese, evidência, solução e impacto.",
        "Uma leitura completa sem anotações."
      ],
      "answer": 2,
      "explanation": "Domínio profissional aparece quando o aluno consegue documentar raciocínio e justificar ações."
    },
    {
      "question": "O que deve acontecer após errar uma questão de simulado?",
      "options": [
        "Ignorar se a nota geral foi boa.",
        "Decorar a alternativa correta.",
        "Registrar a lacuna, causa do erro, correção e data de reteste.",
        "Trocar imediatamente de tema."
      ],
      "answer": 2,
      "explanation": "O erro é matéria-prima da revisão profissional."
    },
    {
      "question": "Qual coluna NÃO deveria faltar em uma matriz de domínio?",
      "options": [
        "Explico.",
        "Diagnostico.",
        "Desenho.",
        "Cor favorita."
      ],
      "answer": 3,
      "explanation": "As colunas precisam medir competências técnicas e comunicáveis."
    },
    {
      "question": "Por que o Módulo 17 inclui estudos de caso e capstone?",
      "options": [
        "Para substituir fundamentos.",
        "Para aplicar fundamentos em cenários integrados e gerar portfólio.",
        "Para evitar simulados.",
        "Para focar apenas em certificações."
      ],
      "answer": 1,
      "explanation": "Estudos de caso e capstone verificam aplicação integrada, não apenas memorização."
    }
  ],
  "flashcards": [
    {
      "front": "O que é revisão profissional?",
      "back": "Revisão ativa, aplicada e validada por evidências, entregáveis e correção de lacunas."
    },
    {
      "front": "Por que matriz de domínio ajuda?",
      "back": "Porque separa sensação de conhecimento de competências mensuráveis: explicar, diagnosticar, desenhar e comunicar."
    },
    {
      "front": "O que é banco de lacunas?",
      "back": "Registro de erros, causas, correções e datas de reteste."
    },
    {
      "front": "O que transforma erro em aprendizado?",
      "back": "Análise da causa do erro, revisão direcionada, prática e reteste."
    },
    {
      "front": "Por que revisar por cenário?",
      "back": "Porque problemas reais misturam camadas, protocolos, segurança, cloud e operação."
    },
    {
      "front": "Qual é o objetivo do Módulo 17?",
      "back": "Consolidar todo o curso com revisão, simulados, estudos de caso, portfólio e capstone final."
    }
  ],
  "mentorQuestions": [
    "Qual tema você reconhece, mas ainda não consegue explicar sem olhar?",
    "Qual erro de troubleshooting você provavelmente cometeria sob pressão?",
    "Qual artefato de portfólio provaria melhor sua evolução em redes?"
  ],
  "challenge": {
    "title": "Plano de revisão profissional do Módulo 17",
    "scenario": "Você terminou os módulos técnicos e precisa se preparar para simulados, estudos de caso, entrevistas e aplicação real no trabalho. Crie um plano de revisão que gere evidências de domínio.",
    "tasks": [
      "Criar matriz de competências por tema.",
      "Listar 10 lacunas pessoais prováveis.",
      "Definir cinco artefatos de portfólio.",
      "Criar agenda de simulados e retestes.",
      "Escolher três estudos de caso para aprofundar.",
      "Definir critérios objetivos de prontidão para o capstone.",
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "successCriteria": [
      "O plano é específico e verificável.",
      "Cada lacuna tem ação e reteste.",
      "Os artefatos demonstram aplicação real.",
      "O plano inclui segurança, cloud e troubleshooting.",
      "A revisão evita leitura passiva como método principal.",
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
        "points": 20,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: explica fluxo de dados por camadas e reconhece onde cada evidência aparece."
      },
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
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
    "summary": "Uma solução madura organiza revisão por competência. O aluno deve mapear temas, medir domínio, registrar lacunas, praticar cenários, corrigir erros e produzir artefatos.",
    "steps": [
      "Criar lista de temas do curso por blocos.",
      "Avaliar cada tema em explicar, diagnosticar, desenhar e comunicar.",
      "Priorizar notas baixas em temas fundamentais e recorrentes.",
      "Criar flashcards para conceitos e labs para cenários.",
      "Usar simulados para medir aplicação e não apenas memória.",
      "Transformar erros em banco de lacunas com data de reteste.",
      "Produzir portfólio com mapas, matrizes, playbooks, RCA e arquiteturas.",
      "Revisar até conseguir explicar o fluxo ponta a ponta sem depender de texto pronto.",
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonMistakes": [
      "Reler sem tentar lembrar.",
      "Medir domínio apenas por sensação.",
      "Ignorar erros pequenos em fundamentos.",
      "Não conectar cloud, segurança e troubleshooting.",
      "Fazer simulado sem revisar a causa dos erros."
    ],
    "reasoning": "Uma solução madura organiza revisão por competência. O aluno deve mapear temas, medir domínio, registrar lacunas, praticar cenários, corrigir erros e produzir artefatos. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
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
      "term": "Revisão ativa",
      "shortDefinition": "Revisão que exige recuperar e aplicar conhecimento.",
      "longDefinition": "Método de estudo no qual o aluno tenta explicar, resolver ou desenhar antes de consultar a resposta.",
      "example": "Explicar DNS sem olhar a aula e depois comparar com a solução.",
      "relatedTerms": [
        "recuperação ativa",
        "simulado"
      ],
      "relatedLessons": [
        "17.1"
      ]
    },
    {
      "term": "Matriz de domínio",
      "shortDefinition": "Tabela de competências por tema.",
      "longDefinition": "Ferramenta para avaliar se o aluno consegue explicar, diagnosticar, desenhar e comunicar cada assunto.",
      "example": "Marcar subnetting como 3 em cálculo, mas 1 em troubleshooting.",
      "relatedTerms": [
        "competência",
        "lacuna"
      ],
      "relatedLessons": [
        "17.1"
      ]
    },
    {
      "term": "Banco de lacunas",
      "shortDefinition": "Registro organizado de erros e dúvidas.",
      "longDefinition": "Lista de lacunas com tema, causa, correção, ação prática e data de reteste.",
      "example": "Erro em rota de retorno vira lab de firewall/NAT.",
      "relatedTerms": [
        "reteste",
        "RCA"
      ],
      "relatedLessons": [
        "15.12",
        "17.1"
      ]
    },
    {
      "term": "Recuperação ativa",
      "shortDefinition": "Tentar lembrar antes de consultar.",
      "longDefinition": "Prática de puxar conhecimento da memória para fortalecer retenção e revelar lacunas.",
      "example": "Responder como funciona TCP handshake antes de abrir a aula.",
      "relatedTerms": [
        "flashcard",
        "quiz"
      ],
      "relatedLessons": [
        "17.1"
      ]
    },
    {
      "term": "Portfólio técnico",
      "shortDefinition": "Conjunto de artefatos que demonstram competência.",
      "longDefinition": "Diagramas, relatórios, playbooks, matrizes, labs e projetos que provam capacidade prática e comunicável.",
      "example": "Arquitetura cloud segura com matriz de fluxos e plano de observabilidade.",
      "relatedTerms": [
        "capstone",
        "documentação"
      ],
      "relatedLessons": [
        "17.9",
        "17.12"
      ]
    },
    {
      "term": "Critério de prontidão",
      "shortDefinition": "Regra objetiva para saber se um tema foi dominado.",
      "longDefinition": "Condição verificável que indica domínio, como explicar, diagnosticar e desenhar um tema em cenário real.",
      "example": "Dominar DNS significa explicar fluxo, cache, split-horizon, logs e troubleshooting.",
      "relatedTerms": [
        "competência",
        "validação"
      ],
      "relatedLessons": [
        "17.1"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "NICE Framework Resource Center",
      "organization": "NIST",
      "url": "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center",
      "note": "Usado como referência para a ideia de linguagem comum, conhecimentos e habilidades em cibersegurança."
    },
    {
      "type": "official-doc",
      "title": "The NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.29.pdf",
      "note": "Base para conectar revisão com Govern, Identify, Protect, Detect, Respond e Recover."
    },
    {
      "type": "official-doc",
      "title": "Cisco Troubleshooting Overview",
      "organization": "Cisco",
      "url": "https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1901.html",
      "note": "Referência de metodologia geral de troubleshooting: sintomas, problemas e soluções."
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
        "name": "Risco de avaliação sem evidência — Como revisar redes de forma profissional",
        "description": "Em Como revisar redes de forma profissional, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.1."
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
      "Qual evidência comprova o entendimento da aula 17.1?"
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
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "17.2"
    ]
  },
  "assessmentBlueprint": {
    "id": "assessment-17.1",
    "title": "Avaliação por competência — Como revisar redes de forma profissional",
    "assessmentType": "revisão estratégica",
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
        "points": 20,
        "description": "Demonstra domínio mínimo de 70% e produz evidência verificável: explica fluxo de dados por camadas e reconhece onde cada evidência aparece."
      },
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
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
