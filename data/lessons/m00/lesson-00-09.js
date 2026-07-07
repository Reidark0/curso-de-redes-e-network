export const lesson0009 = {
  "id": "0.9",
  "moduleId": "m00",
  "order": 9,
  "title": "Laboratório integrador do Módulo 0",
  "subtitle": "Reunindo representação digital, bases numéricas, codificação, métricas, sinais, protocolos e pensamento em camadas em um diagnóstico único.",
  "duration": "80-120 min",
  "estimatedStudyTimeMinutes": 120,
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
    "segurança",
    "cloud",
    "devsecops"
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
    "Integrar os conceitos das aulas 0.1 a 0.8 em uma investigação prática e segura.",
    "Coletar evidências técnicas sem depender de achismo ou conclusão prematura.",
    "Relacionar bytes, codificação, sinais, métricas, protocolos e camadas em um mesmo fluxo de comunicação.",
    "Construir um relatório de diagnóstico básico com comandos, observações, interpretação e riscos.",
    "Preparar o aluno para o Módulo 1, onde redes deixam de ser abstração e passam a ser topologia, enlace, endereçamento e serviços."
  ],
  "learningOutcomes": [
    "Dado um computador conectado a uma rede comum, o aluno consegue coletar IP, gateway, DNS, interface, evidências de link e caminho.",
    "Dado um endereço IPv4, o aluno consegue relacionar decimal, binário, hexadecimal e octetos.",
    "Dado um texto simples, o aluno consegue observar representação em UTF-8 e Base64 sem confundir codificação com criptografia.",
    "Dado um sintoma de rede lenta, o aluno consegue separar latência, throughput, perda, DNS, porta e aplicação.",
    "Dado um conjunto de evidências, o aluno consegue montar um diagnóstico por camadas com próximos testes recomendados."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Até aqui você estudou várias peças que parecem separadas: bits, bytes, binário, hexadecimal, texto, UTF-8, Base64, bit por segundo, byte por segundo, sinais físicos, latência, throughput, protocolo e pensamento em camadas. O risco natural é guardar tudo em gavetas isoladas e, no trabalho, continuar dizendo apenas: <strong>\"a rede está ruim\"</strong>, <strong>\"o sistema caiu\"</strong> ou <strong>\"deve ser DNS\"</strong>.\n  </p>\n  <p>\n    Este laboratório integrador existe para mudar essa postura. Um bom profissional de redes, segurança, cloud ou DevSecOps não tenta adivinhar. Ele coleta evidências, interpreta cada evidência dentro de uma camada, entende o que aquela evidência prova e, principalmente, entende o que ela <strong>não</strong> prova.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> uma aplicação interna está lenta. O usuário diz que \"a internet está ruim\". O time de aplicação diz que \"deve ser rede\". O time de redes diz que \"ping está normal\". O time de segurança suspeita de proxy. Sem método, cada equipe olha uma parte. Com um laboratório integrador, você aprende a organizar evidências: interface, endereço, gateway, DNS, latência, rota, porta, protocolo, payload, codificação, logs e risco.\n  </div>\n  <p>\n    Esta aula não é uma revisão passiva. Ela é uma prática guiada para transformar fundamento em investigação. O objetivo é criar seu primeiro pequeno dossiê técnico: comandos executados, saídas relevantes, interpretações, hipóteses descartadas, riscos de segurança e próximos passos.\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    No início da computação, muitos diagnósticos eram locais: o programa executa ou não executa, o arquivo existe ou não existe, o terminal responde ou não responde. Com redes, sistemas distribuídos, internet, cloud, containers, pipelines e identidade federada, um sintoma simples passou a atravessar muitas fronteiras técnicas.\n  </p>\n  <p>\n    Ao longo do tempo, a operação profissional aprendeu a criar evidências: tabelas de roteamento, logs, contadores de interface, dumps de pacote, códigos HTTP, métricas de latência, gráficos de throughput, eventos de autenticação, alertas de firewall e rastros de auditoria. O laboratório integrador é uma forma didática de simular essa evolução em escala pequena.\n  </p>\n  <p>\n    A história importante aqui é que a profissão saiu do \"funciona na minha máquina\" para o \"mostre a evidência\". Em ambientes modernos, uma decisão sem evidência pode abrir uma regra de firewall desnecessária, expor uma credencial em log, comprar banda sem resolver latência ou culpar DNS quando o erro real está em TLS, autorização ou aplicação.\n  </p>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema deste laboratório é a fragmentação do conhecimento. O aluno pode entender que um byte tem oito bits, mas não enxergar isso em um endereço IP. Pode saber que Base64 não é criptografia, mas não reconhecer um segredo codificado em um arquivo de configuração. Pode medir ping, mas não saber se ping prova acesso à aplicação. Pode saber que existe camada física, mas ignorar velocidade negociada, Wi-Fi instável ou cabo ruim.\n  </p>\n  <ul>\n    <li><strong>O que quebra sem integração:</strong> o diagnóstico vira lista de comandos sem interpretação.</li>\n    <li><strong>Que confusão ela evita:</strong> misturar codificação com criptografia, banda com throughput, ping com saúde da aplicação e autenticação com autorização.</li>\n    <li><strong>Que escala ela permite:</strong> raciocinar de um notebook doméstico até ambientes corporativos, cloud e pipelines.</li>\n    <li><strong>Que risco ela reduz:</strong> alterações inseguras feitas por tentativa, como liberar portas, expor logs ou ignorar sinais de incidente.</li>\n  </ul>\n  <p>\n    A meta não é decorar saídas de comando. A meta é escrever uma interpretação honesta: \"este teste mostra X, não mostra Y, e por isso o próximo teste deve ser Z\".\n  </p>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    A forma de aprender redes também evolui. Primeiro você aprende conceitos isolados. Depois aprende comandos. Em seguida aprende topologias. Mas o salto profissional acontece quando você transforma conceitos e comandos em evidências correlacionadas.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funciona</th><th>Limitação</th><th>O que vem depois</th></tr></thead>\n    <tbody>\n      <tr><td>Decorar conceito</td><td>Saber definir bit, byte, protocolo ou latência</td><td>Não garante aplicação prática</td><td>Relacionar conceito a evidência</td></tr>\n      <tr><td>Rodar comando</td><td>Executar ping, ipconfig, curl ou traceroute</td><td>Pode virar ritual sem interpretação</td><td>Explicar o que a saída prova e não prova</td></tr>\n      <tr><td>Diagnóstico por camada</td><td>Separar físico, enlace, rede, transporte, aplicação e identidade</td><td>Exige disciplina e documentação</td><td>Correlacionar logs, métricas e pacotes</td></tr>\n      <tr><td>Operação profissional</td><td>Usar evidências para decidir ação segura</td><td>Demanda ferramentas e processo</td><td>Automação, observabilidade e resposta a incidentes</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Um laboratório integrador é uma atividade prática desenhada para unir conceitos que foram ensinados separadamente. Em vez de perguntar apenas \"o que é um byte?\" ou \"o que é latência?\", ele pergunta: como bytes, codificação, sinais, métricas, protocolos e camadas aparecem juntos quando um computador fala com outro sistema?\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> neste curso, laboratório integrador é uma prática guiada de coleta, organização e interpretação de evidências técnicas, conectando fundamentos digitais a um cenário real de comunicação em rede, troubleshooting e segurança defensiva.\n  </div>\n  <p>\n    O resultado esperado é um pequeno relatório técnico. Esse relatório deve conter comandos, saídas relevantes, tabelas de conversão, hipóteses, interpretação por camada, riscos e próximos passos. Ele não precisa ser perfeito. Ele precisa ser rastreável.\n  </p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    O laboratório funciona como uma cadeia de evidências. Você começa na máquina local, observa como ela representa dados, verifica como está conectada, mede sinais indiretos de rede, testa resolução de nomes, testa um protocolo de aplicação e organiza tudo em camadas.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Representação:</strong> texto e números são transformados em bytes, binário, hexadecimal e codificações.</li>\n    <li><strong>Interface:</strong> o sistema operacional mostra adaptadores, endereços, gateway e DNS.</li>\n    <li><strong>Meio e enlace:</strong> velocidade negociada, Wi-Fi, cabo ou interface virtual indicam a base física/lógica.</li>\n    <li><strong>Rede:</strong> endereço IP, máscara, gateway e rota mostram o caminho inicial.</li>\n    <li><strong>Métrica:</strong> ping, traceroute e testes HTTP mostram latência, caminho e tempo de resposta.</li>\n    <li><strong>Protocolo:</strong> curl ou navegador expõem headers, status, TLS e comportamento de aplicação.</li>\n    <li><strong>Segurança:</strong> logs, codificações e evidências indicam o que não deve ser exposto e quais conclusões seriam perigosas.</li>\n    <li><strong>Relatório:</strong> o aluno transforma observações em diagnóstico por camadas.</li>\n  </ol>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    A arquitetura do laboratório é propositalmente simples: seu computador, sua rede local, o gateway, o DNS configurado, um destino de teste e o relatório. Mesmo simples, essa arquitetura já contém muitos conceitos: representação de dados, interface de rede, camada física, endereçamento, roteamento, protocolo, resposta de aplicação e segurança.\n  </p>\n  <ul>\n    <li><strong>Host:</strong> notebook ou desktop onde os comandos serão executados.</li>\n    <li><strong>Interface:</strong> Wi-Fi, Ethernet, WSL, VM ou adaptador virtual.</li>\n    <li><strong>Rede local:</strong> ambiente onde gateway, DNS e rota padrão aparecem.</li>\n    <li><strong>Destino:</strong> um endereço ou domínio seguro para testar resolução, caminho e resposta HTTP.</li>\n    <li><strong>Relatório:</strong> artefato final com evidências, interpretação e próximos passos.</li>\n  </ul>\n  <p>\n    Em empresa, a mesma lógica se expande: estações, switches, roteadores, firewalls, proxies, VPN, DNS interno, balanceadores, IdP, SIEM, EDR, cloud e pipelines. A escala muda, mas a disciplina de evidência permanece.\n  </p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Pense no laboratório como uma perícia simples em uma entrega. Você quer descobrir por que uma encomenda atrasou. Não basta dizer \"os Correios estão ruins\". Você verifica se o pacote foi embalado, se o endereço estava correto, se saiu do remetente, por quais centros passou, onde parou, quem assinou e se houve restrição de acesso no prédio.\n  </p>\n  <p>\n    Em redes, a \"encomenda\" são dados. A embalagem são protocolos e encapsulamentos. O endereço aparece em diferentes camadas. O caminho envolve rotas. A entrada no prédio lembra firewall, proxy, TLS, autenticação e autorização. O recibo lembra logs e evidências.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> redes digitais não transportam pacotes físicos intactos como caixas. Dados podem ser fragmentados, retransmitidos, criptografados, encapsulados, cacheados, balanceados e reprocessados por múltiplos sistemas. A analogia ajuda a entender evidência e caminho, mas não substitui o funcionamento técnico.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Em casa, você percebe que um site demora a abrir. Um diagnóstico fraco seria: \"minha internet está ruim\". Um diagnóstico melhor coleta evidências: o Wi-Fi está conectado? O IP foi recebido? O gateway responde? O DNS resolve o nome? O caminho tem perda? A porta 443 responde? O site retorna status HTTP? A lentidão ocorre em todos os destinos ou só em um?\n  </p>\n  <p>\n    Depois você relaciona isso com os fundamentos: o plano contratado usa bits por segundo, o download aparece em bytes por segundo, a latência mede tempo, o HTTP é protocolo, o texto da resposta usa codificação, o TLS protege o conteúdo e o diagnóstico por camadas evita conclusões apressadas.\n  </p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, um usuário não consegue acessar um sistema financeiro. O caminho pode envolver notebook corporativo, Wi-Fi com 802.1X, VLAN, switch, roteador, firewall, proxy, DNS interno, balanceador, TLS, aplicação, banco de dados e autenticação no diretório corporativo.\n  </p>\n  <p>\n    O laboratório integrador ensina a não pular etapas. Se o notebook não tem IP, a falha está antes da aplicação. Se DNS resolve para IP errado, o problema é outro. Se a porta responde mas HTTP retorna 403, conectividade básica existe e a investigação sobe para autorização ou política. Se o acesso falha apenas via VPN, o escopo muda para rota, split tunnel, DNS interno, firewall ou política de acesso remoto.\n  </p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, a mesma disciplina evita custos e riscos. Uma aplicação pode falhar por security group, network security group, route table, subnet, DNS privado, endpoint privado, NAT Gateway, load balancer, certificado, WAF, IAM ou código da aplicação. Comprar mais capacidade ou abrir \"any-any\" no firewall pode mascarar o problema e criar exposição.\n  </p>\n  <p>\n    O relatório por camadas ajuda a conversar com equipes diferentes: cloud networking valida rota e política de rede; segurança valida WAF, logs e exposição; plataforma valida ingress, service mesh e DNS interno; aplicação valida código, dependências e status HTTP; IAM valida identidade, token, claims e autorização.\n  </p>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em pipelines, muitos erros parecem \"rede\", mas podem estar em camadas diferentes: runner sem saída para internet, proxy sem configuração, DNS interno inacessível, TLS interceptado, token expirado, registry fora do ar, secret mal codificado, política de egress bloqueando ou permissão insuficiente no provedor cloud.\n  </p>\n  <p>\n    O laboratório integrador prepara uma mentalidade importante para automação: todo teste deve produzir evidência. Um pipeline maduro não diz apenas \"deploy failed\". Ele mostra resolução de nome, conectividade de porta, status HTTP, autenticação, autorização, logs e correlação com mudanças recentes de infraestrutura como código.\n  </p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Em Segurança da Informação, integrar fundamentos é essencial. Um alerta de exfiltração pode depender de volume em bytes, taxa em bits por segundo, destino, protocolo, porta, codificação de payload, padrão de DNS, logs de proxy, autenticação e horário. Um segredo em Base64 pode parecer protegido para quem não entende codificação. Um ping normal pode esconder uma aplicação vulnerável. Um bloqueio de WAF pode parecer erro de rede para o usuário.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Conclusão por evidência fraca</td><td>\"Ping funciona, então não é rede\"</td><td>Incidente ou falha real passa despercebida</td><td>Validar por camadas e registrar limites do teste</td></tr>\n      <tr><td>Segredo codificado exposto</td><td>Token em Base64 no log ou arquivo</td><td>Credencial reutilizada por atacante</td><td>Mascaramento, cofre de segredos e revisão de logs</td></tr>\n      <tr><td>Alteração insegura</td><td>Abrir firewall sem prova da causa</td><td>Ampliação de superfície de ataque</td><td>Mudança controlada, escopo mínimo e evidência</td></tr>\n      <tr><td>Confundir autenticação e autorização</td><td>Usuário loga, mas recebe 403</td><td>Diagnóstico e escalonamento incorretos</td><td>Separar identidade, token, grupos, claims e política</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1040 520\" role=\"img\" aria-labelledby=\"m00l09-title m00l09-desc\">\n    <title id=\"m00l09-title\">Laboratório integrador do Módulo 0</title>\n    <desc id=\"m00l09-desc\">Fluxo de coleta de evidências conectando representação digital, interface, rede local, caminho, protocolo, segurança e relatório final.</desc>\n    <defs>\n      <marker id=\"m00l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"125\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"125\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bytes, IP, interface</text>\n    <rect x=\"260\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"345\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Rede local</text>\n    <text x=\"345\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wi-Fi, gateway, DNS</text>\n    <rect x=\"480\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--router\" />\n    <text x=\"565\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Caminho</text>\n    <text x=\"565\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rota, RTT, perda</text>\n    <rect x=\"700\" y=\"70\" width=\"170\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"785\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Protocolo</text>\n    <text x=\"785\" y=\"128\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">HTTP, TLS, status</text>\n    <line x1=\"210\" y1=\"109\" x2=\"260\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <line x1=\"430\" y1=\"109\" x2=\"480\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <line x1=\"650\" y1=\"109\" x2=\"700\" y2=\"109\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <rect x=\"170\" y=\"225\" width=\"700\" height=\"78\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"520\" y=\"257\" text-anchor=\"middle\" class=\"svg-label\">Interpretação defensiva</text>\n    <text x=\"520\" y=\"282\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">o que a evidência prova, o que não prova, riscos e próximos testes</text>\n    <line x1=\"785\" y1=\"148\" x2=\"785\" y2=\"225\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <line x1=\"125\" y1=\"148\" x2=\"255\" y2=\"225\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <rect x=\"260\" y=\"375\" width=\"520\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"520\" y=\"407\" text-anchor=\"middle\" class=\"svg-label\">Relatório técnico</text>\n    <text x=\"520\" y=\"432\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">comandos, saídas, interpretação, camadas, segurança e próximos passos</text>\n    <line x1=\"520\" y1=\"303\" x2=\"520\" y2=\"375\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n    <rect x=\"910\" y=\"214\" width=\"90\" height=\"100\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"955\" y=\"250\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Riscos</text>\n    <text x=\"955\" y=\"274\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs</text>\n    <text x=\"955\" y=\"296\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">segredos</text>\n    <line x1=\"870\" y1=\"264\" x2=\"910\" y2=\"264\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l09-arrow)\" />\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>\n    O laboratório completo está no campo <code>lab</code> da aula. Ele foi desenhado para ser executado em Windows PowerShell ou Linux, com alternativa em Python quando disponível. O foco é coletar evidências seguras, sem varredura ofensiva, sem ataque, sem acesso a terceiros e sem custo cloud.\n  </p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios reforçam produção ativa: montar tabela, interpretar comando, separar camadas e apontar o limite de cada evidência. Responder apenas com definição não é suficiente.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula um chamado corporativo de lentidão e falha intermitente. Você deverá montar um plano de investigação sem executar ações arriscadas e sem concluir mais do que as evidências permitem.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra como transformar as evidências do laboratório em raciocínio. A resposta ideal não é uma causa única inventada; é um conjunto de hipóteses priorizadas com próximos testes.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> fundamento só vira habilidade profissional quando é aplicado a evidências.</li>\n    <li><strong>O que lembrar:</strong> cada comando prova uma coisa limitada; registre também o que ele não prova.</li>\n    <li><strong>Erro comum:</strong> transformar um teste parcial em conclusão total.</li>\n    <li><strong>Uso real:</strong> troubleshooting, SOC, cloud, DevSecOps, IAM, resposta a incidentes e arquitetura.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    A próxima aula será a revisão do Módulo 0. Ela organizará os conceitos em mapa mental, checklist e simulado antes de iniciar o Módulo 1 — Fundamentos de Redes. Depois deste laboratório, você já tem base para entender por que redes precisam de topologias, endereços, enlaces, protocolos e modelos de diagnóstico.\n  </p>\n</section>"
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
  "deepDive": {
    "mentalModel": "Um laboratório integrador não procura uma resposta mágica. Ele constrói uma trilha de evidências: dado bruto, comando, observação, interpretação, limite da evidência, hipótese e próximo teste.",
    "keyTerms": [
      "evidência",
      "hipótese",
      "interpretação",
      "camada",
      "relatório técnico",
      "escopo",
      "limite do teste"
    ],
    "limitations": [
      "O laboratório usa comandos locais e destinos comuns; ele não substitui ferramentas corporativas de observabilidade.",
      "Ping, traceroute e curl podem ser filtrados, alterados por proxy ou tratados de forma diferente por redes reais.",
      "Sem captura de pacote ou logs do servidor, algumas conclusões permanecem hipóteses.",
      "Ambientes corporativos podem bloquear comandos ou mascarar informações por política de segurança."
    ],
    "whenToUse": [
      "Ao consolidar fundamentos antes de estudar redes em profundidade.",
      "Ao receber chamados vagos de lentidão, indisponibilidade ou falha de acesso.",
      "Ao montar evidências para conversa entre times de rede, segurança, plataforma e aplicação.",
      "Ao revisar incidentes e separar fato, hipótese e próximo teste."
    ],
    "whenNotToUse": [
      "Não use o laboratório para testar sistemas de terceiros sem autorização.",
      "Não transforme comandos de diagnóstico em varredura ofensiva.",
      "Não use resultados de uma rede doméstica como prova definitiva de comportamento corporativo.",
      "Não exponha tokens, IPs internos sensíveis ou nomes reais de sistemas ao compartilhar relatório."
    ],
    "operationalImpact": [
      "Melhora a qualidade de chamados e reduz escalonamentos imprecisos.",
      "Exige disciplina para registrar evidências e não apenas executar comandos.",
      "Ajuda equipes diferentes a falarem a mesma língua técnica.",
      "Prepara o aluno para runbooks e playbooks de troubleshooting."
    ],
    "financialImpact": [
      "Evita compras incorretas de banda quando o problema é latência, DNS, proxy, TLS ou aplicação.",
      "Reduz tempo de indisponibilidade ao melhorar triagem inicial.",
      "Em cloud, evita criar recursos pagos desnecessários por diagnóstico errado.",
      "Pode exigir investimento futuro em logs, métricas, SIEM, APM e observabilidade."
    ],
    "securityImpact": [
      "Reduz risco de abrir portas ou regras sem evidência.",
      "Ajuda a reconhecer segredo codificado e exposição em logs.",
      "Cria hábito de registrar limite ético e escopo do laboratório.",
      "Melhora a separação entre conectividade, autenticação, autorização e aplicação."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Executar comandos sem anotar a saída relevante.",
      "whyItHappens": "O aluno acredita que o objetivo é apenas ver se funcionou.",
      "consequence": "Não há evidência para comparar, escalar ou revisar.",
      "correction": "Registrar comando, horário aproximado, saída relevante e interpretação."
    },
    {
      "mistake": "Confundir Base64 com criptografia.",
      "whyItHappens": "A saída parece ilegível para humanos.",
      "consequence": "Segredos podem ser expostos em logs, repositórios ou tickets.",
      "correction": "Tratar Base64 como codificação reversível e mascarar conteúdo sensível."
    },
    {
      "mistake": "Concluir que não há problema de rede porque ping responde.",
      "whyItHappens": "Ping é um teste famoso e simples.",
      "consequence": "Porta, TLS, HTTP, proxy, autenticação e autorização podem ser ignorados.",
      "correction": "Registrar ping como evidência de ICMP/caminho parcial e continuar subindo as camadas."
    },
    {
      "mistake": "Medir download em MB/s e comparar diretamente com plano em Mbps.",
      "whyItHappens": "As siglas são parecidas.",
      "consequence": "Interpretação errada de performance e SLA.",
      "correction": "Converter bits e bytes, considerar overhead e throughput útil."
    },
    {
      "mistake": "Compartilhar relatório com IPs, tokens ou nomes internos sensíveis.",
      "whyItHappens": "O aluno foca no diagnóstico e esquece sigilo.",
      "consequence": "Vazamento de informação operacional.",
      "correction": "Anonimizar destinos, mascarar tokens e remover dados internos antes de compartilhar."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Sistema lento",
      "Site não abre",
      "API retorna timeout",
      "Pipeline falha ao baixar dependência",
      "Usuário autentica mas recebe acesso negado",
      "Download abaixo do esperado"
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato e quando começou?",
      "A interface está ativa e com endereço válido?",
      "O gateway e o DNS estão configurados?",
      "O nome resolve para um IP esperado?",
      "Há latência alta, perda ou caminho inesperado?",
      "A porta de aplicação responde?",
      "O protocolo retorna status ou erro legível?",
      "Existe autenticação e autorização envolvida?",
      "Alguma mudança recente em rede, firewall, proxy, cloud, pipeline ou IAM coincide com o problema?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all\nroute print\nResolve-DnsName example.com\nping example.com\ntracert example.com\nTest-NetConnection example.com -Port 443\ncurl.exe -I https://example.com",
        "purpose": "Coletar evidências de interface, rota, DNS, latência, porta TCP e resposta HTTP.",
        "expectedObservation": "IP, gateway e DNS configurados; resolução de nome; alguma resposta ICMP ou caminho; porta 443 acessível; headers HTTP.",
        "interpretation": "Cada comando valida uma parte limitada. Falhas devem ser organizadas por camada antes de concluir causa."
      },
      {
        "platform": "Linux",
        "command": "ip addr\nip route\ngetent hosts example.com\nping -c 4 example.com\ntraceroute example.com\ncurl -I https://example.com",
        "purpose": "Coletar evidências equivalentes em Linux.",
        "expectedObservation": "Interface ativa, rota default, resolução de nome, RTT aproximado, caminho e status HTTP.",
        "interpretation": "Ausência de rota default, DNS falhando, perda alta ou erro HTTP apontam para camadas diferentes."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief\nshow interfaces status\nshow ip route\nshow cdp neighbors",
        "purpose": "Em laboratório Cisco, observar estado de interfaces, rotas e vizinhos.",
        "expectedObservation": "Interfaces up/up, rotas esperadas e vizinhos coerentes.",
        "interpretation": "Interface down, rota ausente ou vizinho inesperado são evidências de camadas inferiores ou topologia."
      }
    ],
    "decisionTree": [
      {
        "if": "Sem IP válido na interface",
        "then": "Investigar DHCP, configuração manual, adaptador, Wi-Fi, cabo ou VLAN antes de testar aplicação."
      },
      {
        "if": "DNS não resolve nome",
        "then": "Testar servidor DNS, sufixo de busca, VPN, DNS privado ou bloqueio de saída."
      },
      {
        "if": "Porta TCP não responde mas DNS resolve",
        "then": "Investigar rota, firewall, proxy, serviço de destino ou política de egress."
      },
      {
        "if": "Porta responde mas HTTP retorna 401 ou 403",
        "then": "Subir para autenticação, autorização, token, grupos, claims ou política de aplicação."
      },
      {
        "if": "Throughput baixo com latência e perda altas",
        "then": "Investigar Wi-Fi, congestionamento, caminho, VPN, proxy, QoS ou problemas físicos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Executar apenas testes autorizados e não invasivos.",
      "Mascarar tokens, IPs internos sensíveis, nomes reais de sistemas e dados pessoais antes de compartilhar evidências.",
      "Registrar o limite de cada evidência para evitar decisões perigosas.",
      "Separar conectividade de autenticação e autorização.",
      "Documentar alterações propostas com escopo mínimo e justificativa técnica."
    ],
    "badPractices": [
      "Abrir firewall sem prova de que a porta é a causa do problema.",
      "Colar logs com credenciais em tickets ou chats.",
      "Executar varreduras em redes sem autorização.",
      "Tratar Base64 como proteção de segredo.",
      "Concluir causa definitiva sem evidências suficientes."
    ],
    "commonErrors": [
      "Confundir codificação com criptografia.",
      "Confundir disponibilidade de porta com autorização de usuário.",
      "Ignorar proxy, VPN, WAF e IdP em diagnósticos modernos.",
      "Compartilhar evidências sem sanitização."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de segredo em evidência técnica",
        "description": "Tokens, cookies, Basic Auth, chaves ou strings em Base64 podem aparecer em headers, logs ou comandos.",
        "defensiveExplanation": "O laboratório deve ensinar a reconhecer e mascarar dados sensíveis, não a explorá-los.",
        "mitigation": "Mascarar valores, usar cofre de segredos, evitar logs verbosos com credenciais e revisar evidências antes de compartilhar."
      },
      {
        "name": "Ampliação indevida de superfície de ataque",
        "description": "Uma equipe pode abrir portas ou regras amplas por concluir incorretamente que firewall é a causa.",
        "defensiveExplanation": "Mudanças de rede devem ser baseadas em evidência e com escopo mínimo.",
        "mitigation": "Testar porta específica, origem específica, janela controlada, aprovação e rollback."
      },
      {
        "name": "Diagnóstico sem escopo ético",
        "description": "Comandos simples podem virar varredura ou coleta indevida se usados fora do ambiente autorizado.",
        "defensiveExplanation": "O foco é diagnóstico local e educativo.",
        "mitigation": "Usar destinos próprios, ambientes de laboratório ou serviços de teste legítimos; não testar terceiros sem autorização."
      }
    ],
    "monitoring": [
      "Logs de proxy e firewall",
      "Eventos de DNS",
      "Métricas de latência e perda",
      "Falhas de autenticação",
      "Códigos HTTP 401, 403, 404, 429 e 5xx",
      "Volume de tráfego anormal"
    ],
    "hardening": [
      "Menor privilégio em regras de rede",
      "Mascaramento de segredo em logs",
      "Controle de acesso a evidências",
      "Padronização de runbooks",
      "Observabilidade por camadas"
    ],
    "detectionIdeas": [
      "Comparar falhas por origem, destino e usuário",
      "Correlacionar mudanças recentes com aumento de erro",
      "Detectar tráfego incomum por taxa e volume",
      "Alertar exposição de padrões de segredo em logs"
    ]
  },
  "lab": {
    "id": "lab-0.9",
    "title": "Dossiê técnico de fundamentos: do byte ao diagnóstico por camadas",
    "labType": "cloud",
    "objective": "Criar um relatório técnico simples que integre representação digital, codificação, métricas, interface de rede, DNS, latência, protocolo e segurança defensiva.",
    "scenario": "Você recebeu um chamado genérico: 'o acesso a um site ou sistema está lento/intermitente'. Seu trabalho é coletar evidências locais e montar uma análise por camadas, sem executar testes invasivos e sem concluir mais do que as evidências permitem.",
    "topology": "Host do aluno -> interface Wi-Fi/Ethernet/virtual -> rede local -> gateway/DNS -> destino HTTPS de teste",
    "architecture": "Laboratório local sem custo, usando terminal do sistema operacional, comandos de rede, conversões simples e relatório manual.",
    "prerequisites": [
      "Ter concluído as aulas 0.1 a 0.8",
      "Ter acesso a um terminal Windows PowerShell ou Linux",
      "Ter conexão de rede comum",
      "Opcional: Python 3 instalado"
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "Comandos ipconfig/ip/route/ping/traceroute/curl",
      "Editor de texto para relatório",
      "Opcional: Python 3",
      "Opcional: Wireshark apenas para observação passiva"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Execute apenas comandos de diagnóstico local e destinos próprios ou públicos de teste legítimos.",
      "Não faça varredura de portas em terceiros.",
      "Não publique IPs internos, tokens, cookies ou nomes reais de sistemas corporativos.",
      "Mascarar qualquer dado sensível antes de compartilhar evidências.",
      "Se estiver em rede corporativa, respeite políticas internas antes de executar comandos.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Criar o arquivo de relatório",
        "instruction": "Abra um editor de texto e crie seções: ambiente, representação, interface, DNS, latência, protocolo, segurança, diagnóstico por camadas e próximos passos.",
        "command": "# Exemplo de estrutura\nAmbiente:\nRepresentação digital:\nInterface e rede local:\nDNS e caminho:\nProtocolo e resposta:\nSegurança:\nDiagnóstico por camadas:\nPróximos passos:",
        "expectedOutput": "Um arquivo de relatório vazio com seções preparadas.",
        "explanation": "Antes de executar comandos, prepare onde registrar evidências. Isso evita perder informação e melhora a interpretação."
      },
      {
        "number": 2,
        "title": "Registrar ambiente local",
        "instruction": "Identifique sistema operacional, tipo de conexão e horário aproximado do teste.",
        "command": "# Windows\nGet-ComputerInfo | Select-Object OsName, OsVersion\nGet-Date\n\n# Linux\nuname -a\ndate",
        "expectedOutput": "Nome do sistema, versão e horário aproximado.",
        "explanation": "Ambiente e horário ajudam a correlacionar evidências com mudanças, logs e sintomas."
      },
      {
        "number": 3,
        "title": "Observar representação de texto em bytes",
        "instruction": "Converta uma palavra curta para bytes UTF-8 e Base64. Use Python se disponível; caso contrário, use PowerShell.",
        "command": "# Python\npython - <<'PY'\nimport base64\ntexto = 'Rede'\nb = texto.encode('utf-8')\nprint('texto:', texto)\nprint('bytes decimais:', list(b))\nprint('hex:', b.hex())\nprint('base64:', base64.b64encode(b).decode())\nPY\n\n# PowerShell\n$texto='Rede'; $bytes=[Text.Encoding]::UTF8.GetBytes($texto); $bytes; [BitConverter]::ToString($bytes); [Convert]::ToBase64String($bytes)",
        "expectedOutput": "Bytes decimais, representação hexadecimal e Base64 da palavra escolhida.",
        "explanation": "Esse passo conecta texto, byte, hexadecimal, UTF-8 e Base64. Reforce no relatório que Base64 é codificação, não proteção."
      },
      {
        "number": 4,
        "title": "Converter um IPv4 em octetos binários e hexadecimais",
        "instruction": "Escolha um IP privado fictício, como 192.168.10.50, e converta seus octetos.",
        "command": "# Python\npython - <<'PY'\nip = '192.168.10.50'\nfor octeto in ip.split('.'):\n    n=int(octeto)\n    print(octeto, format(n,'08b'), format(n,'02X'))\nPY",
        "expectedOutput": "Cada octeto exibido em decimal, binário de 8 bits e hexadecimal.",
        "explanation": "Esse passo prepara o aluno para IPv4, máscaras, MAC, dumps e leitura de bytes em ferramentas de rede."
      },
      {
        "number": 5,
        "title": "Coletar interface, IP, gateway e DNS",
        "instruction": "Cole no relatório apenas as linhas relevantes, mascarando dados sensíveis se necessário.",
        "command": "# Windows\nipconfig /all\nroute print\n\n# Linux\nip addr\nip route\nresolvectl status 2>/dev/null || cat /etc/resolv.conf",
        "expectedOutput": "Interface ativa, IP, máscara/prefixo, gateway/rota default e DNS.",
        "explanation": "Esse passo valida a base local. Sem IP, gateway ou DNS coerente, testes de aplicação podem falhar por motivos inferiores."
      },
      {
        "number": 6,
        "title": "Medir latência básica",
        "instruction": "Execute ping para o gateway, se você souber o endereço, e para um destino de teste legítimo. Registre RTT aproximado e perda.",
        "command": "# Windows\nping 8.8.8.8\n\n# Linux\nping -c 4 8.8.8.8",
        "expectedOutput": "Respostas com tempo aproximado ou indicação de bloqueio/perda.",
        "explanation": "Ping mede ICMP e RTT aproximado. Se falhar, não conclua automaticamente que o destino está fora; ICMP pode ser bloqueado."
      },
      {
        "number": 7,
        "title": "Testar resolução de nomes",
        "instruction": "Resolva um domínio de teste. Compare falha de DNS com falha de conectividade.",
        "command": "# Windows\nResolve-DnsName example.com\nnslookup example.com\n\n# Linux\ngetent hosts example.com\nnslookup example.com 2>/dev/null || true",
        "expectedOutput": "Um ou mais endereços IP associados ao nome.",
        "explanation": "DNS traduz nome em endereço. Ele não prova que a porta está aberta, que TLS é válido ou que o usuário tem permissão."
      },
      {
        "number": 8,
        "title": "Observar caminho até o destino",
        "instruction": "Execute traceroute/tracert e registre se há saltos, perda aparente ou bloqueio. Não force testes repetitivos.",
        "command": "# Windows\ntracert example.com\n\n# Linux\ntraceroute example.com 2>/dev/null || tracepath example.com",
        "expectedOutput": "Lista de saltos ou indicação de bloqueio/limitação.",
        "explanation": "Caminho ajuda, mas pode ser filtrado. Saltos que não respondem não provam necessariamente queda; roteadores podem bloquear ICMP."
      },
      {
        "number": 9,
        "title": "Testar protocolo de aplicação",
        "instruction": "Use curl para solicitar apenas headers HTTP de um destino HTTPS de teste.",
        "command": "curl -I https://example.com",
        "expectedOutput": "Headers HTTP, status como 200, 301, 403 ou outro código, e sinais de TLS negociado implicitamente.",
        "explanation": "Esse passo sobe para camada de aplicação. Se curl retorna status HTTP, existe uma comunicação acima de TCP/TLS; o significado depende do código."
      },
      {
        "number": 10,
        "title": "Relacionar bit, byte, taxa e volume",
        "instruction": "Calcule quanto tempo teórico levaria para transferir 100 MB em um link útil de 40 MB/s e compare com um link anunciado em 500 Mbps.",
        "command": "100 MB / 40 MB/s = 2,5 s\n500 Mbps / 8 = 62,5 MB/s antes de overhead",
        "expectedOutput": "Cálculo registrado no relatório.",
        "explanation": "Esse passo reforça diferença entre taxa nominal em bits, volume em bytes e throughput útil."
      },
      {
        "number": 11,
        "title": "Montar tabela por camadas",
        "instruction": "Classifique suas evidências em físico/enlace, rede, transporte, aplicação, identidade/segurança e observabilidade.",
        "command": "Camada | Evidência | O que prova | O que não prova | Próximo teste",
        "expectedOutput": "Tabela preenchida com pelo menos seis evidências.",
        "explanation": "A tabela força o aluno a não misturar camadas nem superestimar comandos."
      },
      {
        "number": 12,
        "title": "Escrever conclusão defensiva",
        "instruction": "Escreva uma conclusão curta com hipóteses priorizadas, riscos e próximos passos. Evite afirmar causa definitiva sem evidência.",
        "command": "Conclusão sugerida:\nAs evidências indicam que...\nAinda não foi provado que...\nPróximos testes seguros são...\nDados sensíveis foram mascarados? Sim/Não.",
        "expectedOutput": "Conclusão com fatos, limites e próximos passos.",
        "explanation": "A habilidade central é raciocinar com responsabilidade técnica e segurança."
      }
    ],
    "expectedResult": "Um relatório técnico simples contendo evidências de representação digital, interface, DNS, latência, caminho, protocolo, segurança e diagnóstico por camadas.",
    "validation": [
      {
        "check": "Relatório possui evidências de representação digital",
        "command": "Verificar se há bytes, hex e Base64 de uma palavra",
        "expected": "Bytes decimais, hexadecimal e Base64 registrados",
        "ifFails": "Refazer passos 3 e 4 com comandos alternativos ou calculadora local."
      },
      {
        "check": "Relatório possui evidências de rede local",
        "command": "Verificar se há IP, gateway/rota default e DNS",
        "expected": "Interface ativa e configuração mínima registrada",
        "ifFails": "Reexecutar comandos de interface e mascarar dados sensíveis."
      },
      {
        "check": "Relatório separa camadas",
        "command": "Verificar tabela Camada | Evidência | O que prova | O que não prova | Próximo teste",
        "expected": "Pelo menos seis evidências classificadas",
        "ifFails": "Revisar aula 0.8 e reorganizar evidências."
      },
      {
        "check": "Relatório evita conclusão indevida",
        "command": "Ler conclusão final",
        "expected": "Há limites explícitos e próximos passos seguros",
        "ifFails": "Reescrever conclusão separando fato, hipótese e ação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Python não está instalado",
        "probableCause": "Ambiente não possui Python no PATH",
        "howToConfirm": "Executar python --version ou python3 --version",
        "fix": "Usar alternativa em PowerShell ou fazer conversão manual com tabela."
      },
      {
        "symptom": "traceroute não existe no Linux",
        "probableCause": "Pacote não instalado",
        "howToConfirm": "Executar which traceroute",
        "fix": "Usar tracepath se disponível ou registrar indisponibilidade da ferramenta."
      },
      {
        "symptom": "ping falha para destino público",
        "probableCause": "ICMP bloqueado, firewall, rede restritiva ou destino filtrando",
        "howToConfirm": "Testar curl -I https://example.com e DNS separadamente",
        "fix": "Registrar que ICMP falhou e não concluir indisponibilidade total."
      },
      {
        "symptom": "curl não está disponível no Windows antigo",
        "probableCause": "Versão antiga ou PATH sem curl",
        "howToConfirm": "Executar curl.exe --version",
        "fix": "Usar navegador, PowerShell Invoke-WebRequest -Method Head ou instalar ferramenta autorizada."
      },
      {
        "symptom": "Saída contém dados sensíveis",
        "probableCause": "Comandos mostram DNS interno, domínio corporativo, IP privado ou token",
        "howToConfirm": "Revisar relatório antes de compartilhar",
        "fix": "Mascarar valores, substituir por exemplos e remover segredos."
      }
    ],
    "improvements": [
      "Adicionar captura passiva no Wireshark de DNS e TLS ClientHello em laboratório autorizado.",
      "Repetir testes em Wi-Fi e cabo para comparar estabilidade.",
      "Criar um template reutilizável de relatório de troubleshooting.",
      "Executar o mesmo roteiro dentro de uma VM ou WSL e comparar adaptadores virtuais.",
      "Transformar a tabela por camadas em checklist para chamados reais."
    ],
    "evidenceToCollect": [
      "Arquivo de relatório preenchido",
      "Tabela de conversão de texto e IPv4",
      "Saída sanitizada de interface/rota/DNS",
      "Medição de latência",
      "Resultado de resolução de nome",
      "Resultado de curl ou equivalente",
      "Tabela por camadas",
      "Conclusão final com limites"
    ],
    "questions": [
      "Qual evidência mostra apenas camada de rede e não aplicação?",
      "Qual evidência poderia conter dado sensível?",
      "Qual teste você faria depois de DNS resolver corretamente mas a porta 443 falhar?",
      "Por que Base64 no relatório deve ser tratado com cuidado?",
      "Qual conclusão seria exagerada com base apenas em ping?"
    ],
    "challenge": "Monte o relatório como se fosse anexar a um chamado real. Ele deve permitir que outra pessoa entenda o que foi testado, o que foi observado, o que foi descartado e o que ainda precisa ser investigado.",
    "solution": "Uma solução adequada registra evidências sem exagerar conclusões. Por exemplo: IP e rota default confirmam configuração local básica; DNS resolvendo confirma tradução de nome; ping com RTT razoável sugere caminho ICMP funcional, mas não prova HTTP; curl com status HTTP confirma comunicação de aplicação, mas não prova autorização do usuário. Dados sensíveis devem ser mascarados e próximos testes devem respeitar escopo e autorização."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um laboratório integrador é mais útil do que uma lista de comandos soltos?",
      "hints": [
        "Pense em evidência e interpretação.",
        "Pense no que cada comando prova e não prova."
      ],
      "expectedIdeas": [
        "correlação",
        "limite da evidência",
        "camadas",
        "relatório",
        "hipóteses"
      ],
      "explanation": "Comandos sem interpretação não produzem diagnóstico. O laboratório integra evidência, camada, risco e próximo passo."
    },
    {
      "type": "diagnóstico",
      "question": "DNS resolve, ping responde, mas curl para HTTPS falha. Que camadas você investigaria antes de culpar a aplicação?",
      "hints": [
        "Pense em porta, firewall, proxy e TLS.",
        "Ping não testa TCP 443."
      ],
      "expectedIdeas": [
        "transporte",
        "porta",
        "firewall",
        "proxy",
        "TLS",
        "rota"
      ],
      "explanation": "DNS e ICMP funcionando não provam que TCP/TLS/HTTP funcionam. O próximo teste deve focar porta e protocolo de aplicação."
    },
    {
      "type": "cenário real",
      "question": "Você precisa enviar o relatório do laboratório para outro time. O que deve ser removido ou mascarado antes de compartilhar?",
      "hints": [
        "Pense em dados internos e segredos.",
        "Pense em IPs, nomes, tokens e cookies."
      ],
      "expectedIdeas": [
        "tokens",
        "cookies",
        "IPs internos sensíveis",
        "nomes de sistemas",
        "usuários",
        "domínios internos"
      ],
      "explanation": "Evidência técnica pode conter informação sensível. Segurança também é saber compartilhar contexto sem vazar detalhes desnecessários."
    }
  ],
  "quiz": [
    {
      "id": "q0.9.1",
      "type": "conceito",
      "q": "Qual é o principal objetivo de um laboratório integrador neste módulo?",
      "opts": [
        "Unir conceitos em evidências práticas e interpretáveis",
        "Decorar todos os comandos de rede",
        "Substituir o estudo de Modelo OSI",
        "Executar testes ofensivos em redes reais"
      ],
      "a": 0,
      "exp": "O laboratório integrador conecta conceitos a evidências e interpretação, sem substituir módulos futuros nem executar ações ofensivas.",
      "difficulty": "iniciante",
      "topic": "integração"
    },
    {
      "id": "q0.9.2",
      "type": "diagnóstico",
      "q": "Se ping responde, qual conclusão é segura?",
      "opts": [
        "Há alguma resposta ICMP/caminho parcial, mas isso não prova HTTP, TLS ou autorização",
        "A aplicação está saudável",
        "O usuário tem permissão",
        "Não existe firewall no caminho"
      ],
      "a": 0,
      "exp": "Ping é evidência limitada. Ele não valida porta TCP, TLS, HTTP, autenticação ou autorização.",
      "difficulty": "iniciante",
      "topic": "limite de evidência"
    },
    {
      "id": "q0.9.3",
      "type": "segurança",
      "q": "Por que Base64 deve ser tratado com cuidado em relatórios?",
      "opts": [
        "Porque pode carregar segredos codificados de forma reversível",
        "Porque é criptografia forte",
        "Porque não pode representar bytes",
        "Porque só existe em redes Wi-Fi"
      ],
      "a": 0,
      "exp": "Base64 é codificação reversível. Se codificar um segredo, o segredo continua exposto.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q0.9.4",
      "type": "métricas",
      "q": "Um plano de 500 Mbps equivale teoricamente a quantos MB/s antes de overhead?",
      "opts": [
        "62,5 MB/s",
        "500 MB/s",
        "40 MB/s",
        "8 MB/s"
      ],
      "a": 0,
      "exp": "500 megabits por segundo dividido por 8 resulta em 62,5 megabytes por segundo, antes de overhead e limitações reais.",
      "difficulty": "iniciante",
      "topic": "bit vs byte"
    },
    {
      "id": "q0.9.5",
      "type": "arquitetura",
      "q": "Qual item melhor representa uma conclusão responsável?",
      "opts": [
        "DNS resolveu, porta 443 falhou; investigar firewall, proxy, rota ou serviço antes de concluir causa",
        "Ping falhou, então o servidor está invadido",
        "Curl retornou 403, então o cabo está ruim",
        "Base64 apareceu, então está criptografado"
      ],
      "a": 0,
      "exp": "A conclusão responsável separa evidência de hipótese e sugere próximos testes coerentes.",
      "difficulty": "intermediário",
      "topic": "diagnóstico"
    },
    {
      "id": "q0.9.6",
      "type": "cloud",
      "q": "Em cloud, por que o mesmo método por camadas é útil?",
      "opts": [
        "Porque evita confundir rota, DNS privado, security group, load balancer, WAF, IAM e aplicação",
        "Porque cloud elimina problemas de rede",
        "Porque ping sempre funciona em cloud",
        "Porque IAM substitui firewall"
      ],
      "a": 0,
      "exp": "Cloud adiciona camadas gerenciadas; o método ajuda a separar responsabilidades e evitar mudanças inseguras.",
      "difficulty": "intermediário",
      "topic": "cloud"
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
      "id": "fc0.9.3",
      "front": "Base64 protege segredo?",
      "back": "Não. Base64 é codificação reversível, não criptografia.",
      "tags": [
        "base64",
        "segurança"
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
      "back": "É organizar hipóteses e evidências por responsabilidades: físico/enlace, rede, transporte, aplicação, identidade, segurança e observabilidade.",
      "tags": [
        "camadas"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.9.1",
      "type": "conceitual",
      "prompt": "Explique por que executar comandos sem registrar interpretação não é suficiente para troubleshooting profissional.",
      "expectedAnswer": "Porque o valor está na evidência interpretada: o comando precisa ser acompanhado do que foi observado, do que aquilo prova, do que não prova e do próximo teste coerente.",
      "explanation": "Diagnóstico profissional não é ritual de comando; é raciocínio rastreável."
    },
    {
      "id": "ex0.9.2",
      "type": "prático",
      "prompt": "Converta 300 Mbps para MB/s teórico antes de overhead.",
      "expectedAnswer": "37,5 MB/s.",
      "explanation": "300 megabits por segundo dividido por 8 resulta em 37,5 megabytes por segundo."
    },
    {
      "id": "ex0.9.3",
      "type": "diagnóstico",
      "prompt": "DNS resolve o nome, mas Test-NetConnection/curl para porta 443 falha. Liste três hipóteses coerentes.",
      "expectedAnswer": "Firewall bloqueando, serviço indisponível, proxy exigido, rota incorreta, política de egress ou problema de TLS/porta no destino.",
      "explanation": "Como DNS funcionou, a investigação deve subir para transporte, política de caminho e serviço."
    },
    {
      "id": "ex0.9.4",
      "type": "segurança",
      "prompt": "Você encontrou um valor Base64 em um log de aplicação. Quais cuidados deve tomar antes de anexar esse log a um chamado?",
      "expectedAnswer": "Verificar se representa segredo ou dado sensível, mascarar o valor, remover tokens/cookies/credenciais, limitar compartilhamento e indicar que Base64 é codificação reversível.",
      "explanation": "Logs podem vazar segredos mesmo quando o valor parece ilegível."
    }
  ],
  "challenge": {
    "title": "Relatório de triagem para sistema lento",
    "scenario": "Um usuário relata que um sistema HTTPS está lento e às vezes não abre. Você não tem acesso ao servidor, mas pode coletar evidências no host do usuário e propor próximos testes.",
    "tasks": [
      "Coletar evidências de interface, IP, gateway e DNS.",
      "Testar resolução de nome e caminho.",
      "Testar porta/protocolo de aplicação sem varredura ofensiva.",
      "Calcular diferença entre taxa nominal e throughput útil em um exemplo.",
      "Montar tabela por camadas.",
      "Escrever conclusão com fatos, limites e próximos passos."
    ],
    "constraints": [
      "Não executar varredura de portas.",
      "Não expor tokens, IPs sensíveis ou nomes internos no relatório compartilhado.",
      "Não concluir causa definitiva sem evidência.",
      "Usar apenas comandos locais e destinos autorizados."
    ],
    "expectedDeliverables": [
      "Relatório sanitizado",
      "Tabela de evidências por camada",
      "Cálculo de bit/byte",
      "Lista de hipóteses priorizadas",
      "Próximos testes seguros"
    ],
    "gradingRubric": [
      {
        "criterion": "Coleta de evidências",
        "points": 25,
        "description": "Inclui comandos e saídas relevantes de interface, DNS, caminho e protocolo."
      },
      {
        "criterion": "Interpretação por camadas",
        "points": 25,
        "description": "Separa corretamente físico/enlace, rede, transporte, aplicação e segurança."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Mascarou dados sensíveis e evitou testes não autorizados."
      },
      {
        "criterion": "Conclusão responsável",
        "points": 20,
        "description": "Diferencia fato, hipótese, limite e próximo passo."
      },
      {
        "criterion": "Clareza",
        "points": 10,
        "description": "Relatório organizado e compreensível por outro time."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa pela base: ambiente e interface. Depois valida DNS e caminho. Em seguida testa protocolo de aplicação. Por fim, organiza evidências por camada e evita conclusões indevidas.",
    "steps": [
      "Registrar ambiente e horário.",
      "Coletar IP, gateway, DNS e rota default.",
      "Testar DNS antes de culpar aplicação.",
      "Medir latência com cuidado, reconhecendo bloqueios de ICMP.",
      "Testar headers HTTP/TLS com curl ou equivalente.",
      "Classificar evidências por camada.",
      "Mascarar dados sensíveis.",
      "Escrever conclusão com fatos, hipóteses e próximos testes."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Ping respondeu, então não é rede.",
        "whyItIsWrong": "Ping não valida TCP, TLS, HTTP, proxy, autenticação nem autorização."
      },
      {
        "answer": "Base64 apareceu no log, então está seguro.",
        "whyItIsWrong": "Base64 é reversível e pode expor segredo."
      },
      {
        "answer": "Abrir any-any no firewall para testar.",
        "whyItIsWrong": "É mudança ampla e insegura sem evidência suficiente."
      },
      {
        "answer": "Comprar mais banda resolve lentidão.",
        "whyItIsWrong": "Lentidão pode ser latência, perda, DNS, proxy, servidor, TLS ou aplicação."
      }
    ],
    "finalAnswer": "Um relatório correto apresenta evidências sanitizadas, organiza cada teste por camada, registra limites do que foi provado e propõe próximos testes seguros. Ele não transforma uma observação parcial em causa definitiva."
  },
  "glossary": [
    {
      "term": "Evidência técnica",
      "shortDefinition": "Observação registrada que sustenta ou enfraquece uma hipótese.",
      "longDefinition": "Pode vir de comando, log, métrica, captura, status HTTP, tabela de roteamento ou saída de ferramenta. Deve ser interpretada dentro de escopo e camada.",
      "example": "Test-NetConnection indicando falha na porta 443 é evidência para investigar transporte, firewall, proxy ou serviço.",
      "relatedTerms": [
        "hipótese",
        "troubleshooting",
        "observabilidade"
      ],
      "relatedLessons": [
        "0.6",
        "0.8",
        "0.9"
      ]
    },
    {
      "term": "Hipótese",
      "shortDefinition": "Explicação possível para um sintoma, ainda não comprovada.",
      "longDefinition": "Uma hipótese deve gerar próximos testes. Ela não deve ser apresentada como causa enquanto as evidências forem insuficientes.",
      "example": "DNS resolveu, mas porta falhou; uma hipótese é bloqueio de firewall.",
      "relatedTerms": [
        "diagnóstico",
        "evidência"
      ],
      "relatedLessons": [
        "0.8",
        "0.9"
      ]
    },
    {
      "term": "Relatório técnico",
      "shortDefinition": "Documento com comandos, evidências, interpretação, limites e próximos passos.",
      "longDefinition": "Em troubleshooting, um relatório técnico ajuda outros times a entender o que foi testado e evita repetição ou conclusões equivocadas.",
      "example": "Um relatório pode listar IP, rota, DNS, RTT, status HTTP e hipóteses por camada.",
      "relatedTerms": [
        "runbook",
        "playbook",
        "evidência"
      ],
      "relatedLessons": [
        "0.9"
      ]
    },
    {
      "term": "Sanitização de evidência",
      "shortDefinition": "Remoção ou mascaramento de dados sensíveis antes de compartilhar logs ou saídas.",
      "longDefinition": "Inclui esconder tokens, cookies, IPs internos sensíveis, nomes reais de sistemas, usuários e informações que possam ajudar um atacante.",
      "example": "Substituir Authorization: Bearer eyJ... por Authorization: Bearer <mascarado>.",
      "relatedTerms": [
        "segredo",
        "log",
        "Base64"
      ],
      "relatedLessons": [
        "0.3",
        "0.9"
      ]
    },
    {
      "term": "Limite da evidência",
      "shortDefinition": "Aquilo que um teste não consegue provar.",
      "longDefinition": "Todo teste tem escopo. Ping pode mostrar resposta ICMP, mas não prova aplicação. DNS pode resolver nome, mas não prova porta aberta.",
      "example": "curl -I pode provar resposta HTTP, mas não prova que um usuário específico tem autorização.",
      "relatedTerms": [
        "camada",
        "diagnóstico"
      ],
      "relatedLessons": [
        "0.7",
        "0.8",
        "0.9"
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
    },
    {
      "type": "standard",
      "title": "The Unicode Standard",
      "organization": "Unicode Consortium",
      "url": "https://www.unicode.org/standard/standard.html",
      "note": "Referência conceitual para Unicode e codificação de texto."
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
      "0.10"
    ]
  }
};
