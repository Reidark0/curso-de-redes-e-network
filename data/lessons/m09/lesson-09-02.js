export const lesson0902 = {
  "id": "9.2",
  "moduleId": "m09",
  "order": 2,
  "title": "ACLs, regras e ordem de processamento",
  "subtitle": "Como regras de tráfego são avaliadas, por que a ordem muda o resultado, como detectar shadowing e como transformar intenção de segurança em ACLs mínimas, testáveis e auditáveis.",
  "duration": "125-185 min",
  "estimatedStudyTimeMinutes": 185,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 285,
  "tags": [
    "redes",
    "network",
    "firewall",
    "acl",
    "ordem de regras",
    "permit",
    "deny",
    "reject",
    "shadowing",
    "deny implícito",
    "logs",
    "contadores",
    "cloud",
    "segurança",
    "p1-07",
    "firewall-lab-v2-final"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.1",
      "title": "Por que firewalls existem",
      "reason": "A aula anterior explica por que controlar tráfego. Esta aula mostra como transformar essa intenção em regras avaliáveis."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.2",
      "title": "Portas, sockets e multiplexação",
      "reason": "ACLs dependem de protocolo, porta de destino e, em alguns cenários, portas efêmeras de retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.7",
      "title": "NAT, PAT, firewalls stateful e rastreamento de conexão",
      "reason": "NAT e estado alteram como regras de ida e retorno precisam ser desenhadas."
    }
  ],
  "objectives": [
    "Explicar o que é uma ACL e como regras de tráfego são avaliadas.",
    "Diferenciar permit, deny/drop, reject, log, inspect e rate limit.",
    "Entender primeira regra compatível, prioridade, deny implícito e regra default.",
    "Identificar shadowing, redundância, regra órfã, regra ampla e exceção vencida.",
    "Construir regras mínimas com origem, destino, protocolo, porta, direção, dono, justificativa, validade e logging.",
    "Comparar ACL ordenada, security group, NACL/NSG, WAF rule, Kubernetes NetworkPolicy e policy as code.",
    "Criar um método de teste para provar tanto o fluxo permitido quanto o fluxo bloqueado."
  ],
  "learningOutcomes": [
    "Ler uma lista de ACLs e prever exatamente qual regra será aplicada a um pacote ou fluxo.",
    "Corrigir uma ACL mal ordenada sem abrir tráfego além do necessário.",
    "Explicar por que uma regra específica pode nunca receber hits quando está abaixo de uma regra genérica.",
    "Projetar logging, contadores e evidências para troubleshooting e auditoria.",
    "Diferenciar o raciocínio de regra em controles stateful e stateless.",
    "Documentar exceções temporárias com dono, prazo, risco e plano de remoção."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Na aula 10.1 você aprendeu que firewalls existem para aplicar intenção de segurança ao tráfego. Agora vem a parte perigosa: transformar essa intenção em regras reais. Em produção, uma única linha mal posicionada pode liberar acesso indevido, quebrar uma aplicação crítica ou esconder um incidente porque não gera log.</p>\n  <p>ACLs parecem listas simples, mas elas carregam decisões de negócio, segurança e operação. Uma regra como <code>permit any any</code> pode ter sido criada para resolver uma emergência, mas meses depois vira uma porta permanente para movimento lateral. Uma regra <code>deny</code> sem log pode bloquear algo importante e não deixar evidência. Uma regra específica abaixo de uma regra genérica pode nunca ser usada.</p>\n  <div class='callout'><strong>Ideia central:</strong> em ACLs ordenadas, a pergunta não é apenas “existe uma regra para isso?”. A pergunta correta é: “qual é a primeira regra que casa com este tráfego e qual ação ela aplica?”.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>As primeiras ACLs eram filtros simples em roteadores. Elas olhavam atributos básicos do pacote, como endereço de origem, endereço de destino e protocolo. Esse modelo ajudava a impedir tráfego indesejado sem exigir um firewall dedicado.</p>\n  <p>Com a popularização da Internet corporativa, o filtro por IP deixou de ser suficiente. Surgiram regras por porta TCP/UDP, direção, interface, estado de conexão, zona, usuário, aplicação e conteúdo HTTP. Mesmo com NGFW, WAF, security groups, NACLs, NSGs, Kubernetes NetworkPolicies e policy as code, a base mental continua a mesma: condições são avaliadas e uma ação é aplicada.</p>\n  <p>A evolução não eliminou a complexidade; ela a distribuiu. Hoje uma conexão pode ser permitida por um security group, bloqueada por uma NACL, redirecionada por um load balancer, filtrada por um WAF e negada por uma NetworkPolicy. Entender ordem, prioridade e local de aplicação virou essencial.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema mais comum de ACL não é sintaxe. É semântica: a regra tecnicamente existe, mas não expressa a intenção correta. Ela permite demais, nega no lugar errado, está fora de ordem, não tem dono, não tem validade, não gera log ou está aplicada no ponto errado do caminho.</p>\n  <p>Outro problema é assumir que todas as plataformas avaliam regras da mesma forma. Em uma ACL tradicional, a ordem geralmente é decisiva. Em muitos security groups, as regras permissivas são somadas e o retorno é permitido por estado. Em NACLs, pode haver prioridade numérica e necessidade de regra explícita de ida e volta. Em WAF, a prioridade pode envolver regras gerenciadas, exceções, modo monitor e ação de bloqueio.</p>\n  <div class='callout callout--problem'><strong>Falha clássica:</strong> colocar uma regra ampla antes de uma regra restritiva. A regra restritiva fica “sombreada”, não recebe hits e cria a falsa impressão de que a política é segura.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <table class='comparison-table'>\n    <thead><tr><th>Modelo</th><th>Como avalia</th><th>O que o aluno deve observar</th><th>Erro comum</th></tr></thead>\n    <tbody>\n      <tr><td>ACL clássica</td><td>Lista ordenada; primeira regra compatível vence</td><td>Ordem, direção, interface e deny implícito</td><td>Regra genérica acima de regra específica</td></tr>\n      <tr><td>Firewall stateful</td><td>Avalia início do fluxo e rastreia estado</td><td>Fluxo de ida, retorno relacionado e timeouts</td><td>Criar regras de retorno desnecessárias ou esquecer assimetria</td></tr>\n      <tr><td>NACL/NSG de subnet</td><td>Prioridade numérica ou ordem; pode ser stateless</td><td>Inbound, outbound e prioridade</td><td>Permitir ida e esquecer retorno em controle stateless</td></tr>\n      <tr><td>Security group</td><td>Conjunto de allows associados ao recurso; geralmente stateful</td><td>Origem/destino por recurso, tag ou grupo</td><td>0.0.0.0/0 em porta administrativa</td></tr>\n      <tr><td>WAF rule</td><td>Prioridade e condições HTTP</td><td>Host, path, método, header, cookie, body e exceções</td><td>Criar exceção ampla que desativa proteção crítica</td></tr>\n      <tr><td>Policy as code</td><td>Validação antes/depois do deploy</td><td>Regras versionadas, testes e guardrails</td><td>Validar apenas sintaxe e ignorar risco</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>ACL</strong>, ou lista de controle de acesso, é um conjunto de regras que decide o destino de um pacote, fluxo ou requisição. Cada regra possui critérios de correspondência e uma ação. Os critérios mais comuns são origem, destino, protocolo, porta, direção, interface, zona, estado e, em camadas superiores, método HTTP, path, header ou identidade.</p>\n  <p>Ações comuns incluem <code>permit</code>, <code>deny</code>, <code>drop</code>, <code>reject</code>, <code>log</code>, <code>inspect</code>, <code>rate-limit</code> e <code>challenge</code>. <code>deny/drop</code> normalmente descarta silenciosamente. <code>reject</code> responde ao cliente informando que o tráfego foi recusado. <code>log</code> registra evidência. <code>inspect</code> aprofunda a análise do tráfego.</p>\n  <div class='definition-box'>Uma ACL segura não é a que tem mais regras. É a que permite o mínimo necessário, nega o restante, é previsível, possui evidência e pode ser revisada sem depender da memória de quem a criou.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>O motor de decisão de uma ACL recebe um pacote ou fluxo e compara seus atributos com uma lista de regras. Em ACLs ordenadas, a avaliação começa no topo. Quando uma regra casa, a ação é aplicada e a busca termina. Se nenhuma regra casa, entra a ação padrão, que em arquiteturas defensivas deve ser negar.</p>\n  <ol class='flow-list'>\n    <li>O pacote chega ao ponto de inspeção: interface, zona, firewall, subnet, security group, WAF ou proxy.</li>\n    <li>O controle identifica direção, origem, destino, protocolo, porta, estado e metadados disponíveis.</li>\n    <li>A primeira regra é comparada. Se não casar, a próxima regra é avaliada.</li>\n    <li>Ao encontrar match, a ação é executada: permitir, negar, rejeitar, registrar, inspecionar ou limitar.</li>\n    <li>Contadores de hit e logs podem ser atualizados.</li>\n    <li>Se nenhuma regra casar, a política default decide. Em segurança, o padrão desejado é deny implícito.</li>\n  </ol>\n  <pre><code>Exemplo de ACL mal ordenada:\n10 permit 10.0.0.0/8 any tcp any\n20 deny   10.0.5.0/24 10.0.20.10 tcp 5432 log\n30 permit 10.0.5.0/24 10.0.20.10 tcp 5432 log\n40 deny   any any log\n\nProblema: a regra 10 é ampla demais. O tráfego de 10.0.5.0/24 para 10.0.20.10:5432 casa na regra 10 antes de chegar à regra 20 ou 30.</code></pre>\n  <p>Esse é o efeito de <strong>shadowing</strong>: uma regra anterior torna uma regra posterior inalcançável para parte ou todo o seu escopo.</p>\n</section>\n",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>Uma ACL madura começa com uma matriz de comunicação. Antes de escrever uma regra, defina origem, destino, serviço, porta, direção, dono, justificativa, criticidade, validade, evidência esperada e plano de rollback.</p>\n  <table class='data-table'>\n    <thead><tr><th>Campo</th><th>Boa prática</th><th>Risco quando ausente</th></tr></thead>\n    <tbody>\n      <tr><td>Origem</td><td>Objeto, zona, subnet ou identidade específica</td><td>Regra vira ampla demais</td></tr>\n      <tr><td>Destino</td><td>Serviço ou recurso nomeado</td><td>Movimento lateral</td></tr>\n      <tr><td>Protocolo/porta</td><td>TCP/443, TCP/5432, UDP/53 etc.</td><td>Exposição desnecessária</td></tr>\n      <tr><td>Direção</td><td>Inbound, outbound, zona A→zona B</td><td>Regra aplicada no lado errado</td></tr>\n      <tr><td>Ação</td><td>permit/deny/reject/log/inspect conforme objetivo</td><td>Comportamento ambíguo</td></tr>\n      <tr><td>Ordem/prioridade</td><td>Mais específico antes do mais genérico</td><td>Shadowing e bypass</td></tr>\n      <tr><td>Dono e validade</td><td>Responsável, prazo e justificativa</td><td>Exceção eterna</td></tr>\n      <tr><td>Log</td><td>Logs em denies críticos e permits sensíveis</td><td>Sem evidência para investigação</td></tr>\n    </tbody>\n  </table>\n  <p>Em ambientes grandes, use objetos nomeados. <code>APP_PAGAMENTOS</code>, <code>DB_PAGAMENTOS</code> e <code>BASTION_PROD</code> comunicam intenção melhor do que uma sequência de IPs sem contexto.</p>\n</section>\n",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma portaria com uma lista de instruções. A primeira linha diz: “Qualquer funcionário pode entrar em qualquer sala”. A segunda diz: “Funcionários do setor X não podem entrar na sala do cofre”. Na prática, a segunda linha nunca será usada, porque a primeira já permitiu a entrada.</p>\n  <p>ACL funciona de forma parecida quando é ordenada: a posição da regra muda o resultado. Por isso não basta ter uma regra de bloqueio no arquivo; ela precisa estar antes de permissões que tornariam o bloqueio inútil.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você quer permitir que apenas o notebook administrativo <code>192.168.10.50</code> acesse o servidor <code>192.168.20.10</code> por SSH.</p>\n  <pre><code>Boa intenção:\n10 permit 192.168.10.50 192.168.20.10 tcp 22 log\n20 deny   any any log\n\nErro comum:\n10 permit 192.168.10.0/24 192.168.20.0/24 tcp any\n20 permit 192.168.10.50 192.168.20.10 tcp 22 log\n30 deny   any any log</code></pre>\n  <p>No segundo caso, a regra 20 é quase decorativa. O tráfego já foi permitido pela regra 10, que é mais ampla.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma empresa tem usuários, API, banco, bastion, SIEM e Internet. A intenção é: usuários acessam a API via HTTPS; API acessa banco em TCP/5432; bastion acessa servidores por SSH/RDP; logs vão para o SIEM; banco nunca recebe tráfego direto de usuários ou Internet.</p>\n  <pre><code>Exemplo conceitual de ordem defensiva:\n10 deny   INTERNET DB_PAGAMENTOS any any log\n20 deny   USUARIOS DB_PAGAMENTOS any any log\n30 permit WAF_PUBLICO API_PAGAMENTOS tcp 443 log\n40 permit API_PAGAMENTOS DB_PAGAMENTOS tcp 5432 log\n50 permit BASTION SERVIDORES tcp 22,3389 log\n60 permit SERVIDORES SIEM tcp 6514 log\n90 deny   any any log</code></pre>\n  <p>Observe que bloqueios críticos aparecem antes de permissões genéricas e que o deny final registra tentativas não previstas.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, a mesma lógica aparece em security groups, NACLs/NSGs, cloud firewalls e WAFs. Um security group de banco não deveria aceitar origem <code>0.0.0.0/0</code>. Ele deve aceitar somente o security group da aplicação ou uma subnet específica.</p>\n  <table class='comparison-table'>\n    <thead><tr><th>Controle</th><th>Uso adequado</th><th>Erro comum</th></tr></thead>\n    <tbody>\n      <tr><td>Security group</td><td>Permitir APP_SG → DB_SG TCP/5432</td><td>Permitir 0.0.0.0/0 → DB TCP/5432</td></tr>\n      <tr><td>NACL/NSG</td><td>Filtrar por subnet com prioridade clara</td><td>Bloquear retorno em controle stateless</td></tr>\n      <tr><td>WAF</td><td>Filtrar HTTP antes da API pública</td><td>Criar exceção path /* para resolver falso positivo</td></tr>\n      <tr><td>Cloud firewall</td><td>Centralizar tráfego entre zonas/VPCs/VNets</td><td>Deixar rota alternativa contornar inspeção</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, regras de tráfego devem ser tratadas como código sempre que possível. Pull requests de infraestrutura precisam mostrar a mudança de política, o motivo, o dono, a validade e o impacto. Pipelines podem bloquear padrões perigosos antes do deploy.</p>\n  <pre><code>Guardrails úteis em policy as code:\n- Bloquear inbound 0.0.0.0/0 para SSH/RDP.\n- Bloquear banco de dados público.\n- Exigir descrição, owner e validade em exceções.\n- Exigir logs para regras de administração.\n- Alertar regra com any-any ou porta any.\n- Detectar regra sem hits por longo período.</code></pre>\n  <p>Essa abordagem reduz drift, melhora auditoria e impede que regras emergenciais virem permissões permanentes invisíveis.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Durante um incidente de ransomware, uma ACL bem construída ajuda a conter movimento lateral. Se usuários não acessam banco diretamente, se servidores não fazem egress livre, se administração passa por bastion e se negações críticas geram log, a equipe de resposta tem mais chance de entender e conter o ataque.</p>\n  <div class='callout callout--security'><strong>Visão defensiva:</strong> ACL não substitui EDR, identidade, patching, criptografia ou hardening. Ela reduz caminhos possíveis e gera evidência sobre tráfego permitido ou bloqueado.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama</h2>\n  <p>O diagrama mostra uma ACL ordenada recebendo um fluxo e decidindo com base na primeira regra compatível. Repare no risco de uma regra ampla sombrear regras posteriores.</p>\n  <svg class='lesson-svg' viewBox='0 0 980 560' role='img' aria-labelledby='m09l02-title m09l02-desc'>\n    <title id='m09l02-title'>Avaliação de ACL ordenada</title>\n    <desc id='m09l02-desc'>Cliente envia fluxo para firewall, regras são avaliadas em ordem, regra ampla pode sombrear regra específica e deny implícito bloqueia o restante.</desc>\n    <defs>\n      <marker id='m09l02-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto'>\n        <path class='svg-flow' d='M0,0 L0,6 L9,3 z'></path>\n      </marker>\n    </defs>\n    <rect class='svg-zone' x='30' y='40' width='180' height='120' rx='18'></rect>\n    <text class='svg-label' x='120' y='80' text-anchor='middle'>Origem</text>\n    <text class='svg-label svg-label--small' x='120' y='110' text-anchor='middle'>10.0.5.25</text>\n    <text class='svg-label svg-label--small' x='120' y='135' text-anchor='middle'>TCP/5432</text>\n\n    <rect class='svg-node svg-node--firewall' x='300' y='35' width='360' height='440' rx='18'></rect>\n    <text class='svg-label' x='480' y='75' text-anchor='middle'>ACL ordenada</text>\n\n    <rect class='svg-node svg-node--security' x='330' y='105' width='300' height='52' rx='10'></rect>\n    <text class='svg-label svg-label--small' x='480' y='128' text-anchor='middle'>10 permit 10.0.0.0/8 → any tcp any</text>\n    <text class='svg-label svg-label--small' x='480' y='147' text-anchor='middle'>MATCH: regra ampla permite</text>\n\n    <rect class='svg-node' x='330' y='180' width='300' height='52' rx='10'></rect>\n    <text class='svg-label svg-label--small' x='480' y='203' text-anchor='middle'>20 deny 10.0.5.0/24 → DB tcp 5432</text>\n    <text class='svg-label svg-label--small' x='480' y='222' text-anchor='middle'>Sombreada: nunca avaliada para esse fluxo</text>\n\n    <rect class='svg-node' x='330' y='255' width='300' height='52' rx='10'></rect>\n    <text class='svg-label svg-label--small' x='480' y='278' text-anchor='middle'>30 permit APP → DB tcp 5432 log</text>\n    <text class='svg-label svg-label--small' x='480' y='297' text-anchor='middle'>Regra específica correta, mas tarde demais</text>\n\n    <rect class='svg-node svg-node--attacker' x='330' y='330' width='300' height='52' rx='10'></rect>\n    <text class='svg-label svg-label--small' x='480' y='353' text-anchor='middle'>90 deny any any log</text>\n    <text class='svg-label svg-label--small' x='480' y='372' text-anchor='middle'>Deny final para tráfego não previsto</text>\n\n    <rect class='svg-zone' x='760' y='70' width='180' height='120' rx='18'></rect>\n    <text class='svg-label' x='850' y='110' text-anchor='middle'>Destino</text>\n    <text class='svg-label svg-label--small' x='850' y='140' text-anchor='middle'>DB 10.0.20.10</text>\n    <text class='svg-label svg-label--small' x='850' y='165' text-anchor='middle'>TCP/5432</text>\n\n    <line class='svg-flow svg-flow--request animated-flow' x1='210' y1='100' x2='300' y2='130' marker-end='url(#m09l02-arrow)'></line>\n    <line class='svg-flow svg-flow--request animated-flow' x1='660' y1='130' x2='760' y2='130' marker-end='url(#m09l02-arrow)'></line>\n\n    <rect class='svg-badge' x='110' y='260' width='210' height='74' rx='14'></rect>\n    <text class='svg-label svg-label--small' x='215' y='288' text-anchor='middle'>Pergunta certa:</text>\n    <text class='svg-label svg-label--small' x='215' y='312' text-anchor='middle'>qual regra casa primeiro?</text>\n\n    <rect class='svg-badge' x='690' y='270' width='240' height='110' rx='14'></rect>\n    <text class='svg-label svg-label--small' x='810' y='300' text-anchor='middle'>Correção:</text>\n    <text class='svg-label svg-label--small' x='810' y='324' text-anchor='middle'>regras específicas antes</text>\n    <text class='svg-label svg-label--small' x='810' y='348' text-anchor='middle'>regras genéricas depois</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class='lesson-section lesson-section--lab'>\n  <h2>Laboratório</h2>\n  <p>Neste laboratório, você vai analisar uma ACL propositalmente errada, prever qual regra será aplicada, detectar shadowing, reorganizar a política e criar evidências de teste. A ideia é praticar leitura de regra, não apenas desenhar zonas.</p>\n</section>\n\n<div class=\"content-card\" data-enhancement=\"p1-07-9.2\"><h4>Reforço v2.0: laboratório de firewall orientado por evidência</h4><p>Este laboratório foi revisado na v2.0 para exigir matriz de fluxo, regra mínima, retorno, logs, contadores, evidências e rollback. O acesso à aula permanece livre; a conclusão usa critérios de progresso, não bloqueio de navegação.</p></div>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios trabalham previsão de match, correção de ordem, redução de permissões e escolha de logging.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá uma ACL com regra ampla, regra sombreada, exceção vencida e ausência de logs. O objetivo é corrigir sem abrir tráfego além do necessário.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como reordenar regras, remover redundâncias, adicionar deny explícito com log e documentar exceções.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>ACLs transformam intenção de segurança em decisões técnicas. O ponto mais importante é entender o modelo de avaliação da plataforma: ordem, prioridade, primeira regra compatível, deny implícito, stateful/stateless e logging.</p>\n  <p>Uma regra segura precisa ser específica, documentada, posicionada corretamente, testada e revisada. Regras genéricas, exceções vencidas, shadowing e ausência de logs são sinais de risco operacional e de segurança.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você vai aprofundar a diferença entre firewalls stateless e stateful. Isso explica por que alguns controles exigem regras explícitas de retorno e outros rastreiam automaticamente conexões estabelecidas.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 3",
      "Camada 4",
      "Camada 7",
      "Política de tráfego",
      "Segurança operacional"
    ],
    "beforeThisLesson": "O aluno já entende por que firewalls existem e por que tráfego precisa passar por pontos de controle.",
    "afterThisLesson": "O aluno conseguirá ler, prever e corrigir listas de regras com base em ordem, prioridade, match, ação e logging.",
    "dependsOn": [
      "IPv4",
      "Subnets",
      "TCP",
      "UDP",
      "Portas",
      "NAT",
      "HTTP",
      "Zonas",
      "Logs"
    ]
  },
  "protocolFields": [
    {
      "field": "Origem",
      "meaning": "IP, subnet, zona, objeto, security group, identidade ou workload que inicia o fluxo.",
      "securityNote": "Origem ampla como any ou 0.0.0.0/0 deve ser tratada como exceção de alto risco."
    },
    {
      "field": "Destino",
      "meaning": "IP, host, serviço, subnet, VIP, load balancer, API, banco ou zona de destino.",
      "securityNote": "Destino amplo facilita movimento lateral e acesso indevido a sistemas críticos."
    },
    {
      "field": "Direção",
      "meaning": "Sentido em que a regra é aplicada: inbound, outbound, interface, zona de origem para zona de destino.",
      "securityNote": "Regra aplicada na direção errada cria falso diagnóstico: parece correta, mas nunca casa."
    },
    {
      "field": "Protocolo",
      "meaning": "TCP, UDP, ICMP, protocolo IP ou aplicação reconhecida pelo controle.",
      "securityNote": "Protocolo errado pode bloquear o fluxo legítimo ou permitir um fluxo diferente do esperado."
    },
    {
      "field": "Porta/serviço",
      "meaning": "Porta de destino ou serviço: TCP/443, TCP/22, UDP/53, ICMP etc.",
      "securityNote": "Porta any aumenta superfície e dificulta auditoria."
    },
    {
      "field": "Estado",
      "meaning": "Informação de conexão, como NEW, ESTABLISHED, RELATED ou equivalente.",
      "securityNote": "Assumir stateful em controle stateless causa falhas de retorno."
    },
    {
      "field": "Ação",
      "meaning": "permit, deny/drop, reject, log, inspect, rate-limit, redirect, challenge.",
      "securityNote": "Ação sem log em fluxo sensível reduz visibilidade."
    },
    {
      "field": "Ordem/prioridade",
      "meaning": "Posição ou número usado para decidir qual regra vence.",
      "securityNote": "Regra genérica antes de regra específica causa shadowing."
    },
    {
      "field": "Default policy",
      "meaning": "Ação aplicada quando nenhuma regra casa.",
      "securityNote": "Default allow é perigoso; deny-by-default é o modelo defensivo."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "name": "Chegada ao ponto de controle",
      "description": "O pacote ou fluxo chega a uma interface, subnet, firewall, security group, WAF ou proxy.",
      "securityNote": "Se o tráfego não passa pelo ponto de controle, nenhuma ACL ali terá efeito."
    },
    {
      "step": 2,
      "name": "Extração de atributos",
      "description": "O controle lê origem, destino, direção, protocolo, porta, estado e metadados disponíveis.",
      "securityNote": "NAT, proxy e TLS termination podem alterar quais atributos são visíveis."
    },
    {
      "step": 3,
      "name": "Avaliação de regras",
      "description": "As regras são avaliadas por ordem, prioridade ou modelo específico da plataforma.",
      "securityNote": "Conhecer o modelo evita confundir ACL ordenada com security group stateful."
    },
    {
      "step": 4,
      "name": "Primeiro match ou combinação",
      "description": "Em ACL ordenada, a primeira regra compatível define a ação. Em outros modelos, permissões podem ser combinadas.",
      "securityNote": "Shadowing ocorre quando uma regra anterior torna outra inútil."
    },
    {
      "step": 5,
      "name": "Ação e evidência",
      "description": "A ação é aplicada e logs/contadores podem ser atualizados.",
      "securityNote": "Sem log e contador, troubleshooting e auditoria ficam frágeis."
    },
    {
      "step": 6,
      "name": "Default",
      "description": "Se nada casa, entra a ação padrão, idealmente deny implícito.",
      "securityNote": "Deny implícito precisa ser entendido para evitar liberar tráfego só para resolver erro sem análise."
    }
  ],
  "deepDive": {
    "title": "Shadowing, redundância e regras órfãs",
    "content": "Shadowing acontece quando uma regra anterior cobre o mesmo tráfego de uma regra posterior, impedindo que ela seja atingida. Redundância ocorre quando duas regras fazem a mesma coisa sem necessidade. Regra órfã é aquela que não tem dono, justificativa, validade ou hits relevantes. Em auditoria, esses três sinais indicam risco acumulado: a política pode estar permitindo tráfego que ninguém consegue defender tecnicamente."
  },
  "commonMistakes": [
    "Colocar regra ampla antes de regra específica.",
    "Achar que uma regra deny posterior protege tráfego já permitido antes.",
    "Não considerar deny implícito no final da lista.",
    "Aplicar regra no sentido errado: inbound quando o problema é outbound, ou vice-versa.",
    "Confundir security group stateful com NACL stateless.",
    "Usar any-any durante incidente e não remover.",
    "Criar exceção sem dono, validade ou log.",
    "Não testar o fluxo negado; testar apenas o fluxo permitido.",
    "Desabilitar logs por volume sem manter evidência mínima para incidentes.",
    "Permitir porta administrativa da Internet por conveniência."
  ],
  "troubleshooting": {
    "method": "Comece identificando o fluxo exato: origem, destino, porta, protocolo, direção, horário e sintoma. Depois confirme rota, ponto de controle, regra que deveria casar, regra que realmente casou, contador, log, estado, NAT e política default.",
    "commands": [
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "conf t\nip access-list extended FILIAL-IN\n permit tcp 192.168.99.0 0.0.0.255 host 10.10.10.10 eq 22\n deny   tcp 192.168.20.0 0.0.0.255 host 10.10.10.10 eq 22 log\n permit tcp 192.168.20.0 0.0.0.255 host 10.10.10.10 eq 443\n deny   ip any any log\nend",
        "purpose": "Configurar ACL",
        "expectedObservation": "ACL criada.",
        "interpretation": "A ordem define a decisão."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "conf t\ninterface g0/0\n ip access-group FILIAL-IN in\nend\nshow ip interface g0/0",
        "purpose": "Aplicar na interface/direção correta",
        "expectedObservation": "Inbound access list FILIAL-IN.",
        "interpretation": "ACL certa no ponto errado não protege o fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "nc -vz 10.10.10.10 443\nshow access-lists FILIAL-IN",
        "purpose": "Validar tráfego permitido",
        "expectedObservation": "Permit 443 recebe hits.",
        "interpretation": "Contador prova chegada do fluxo."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "nc -vz 10.10.10.10 22\nshow access-lists FILIAL-IN",
        "purpose": "Validar bloqueio",
        "expectedObservation": "Bloqueio e hit no deny.",
        "interpretation": "Teste negativo faz parte do aceite."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "conf t\nip access-list extended FILIAL-IN\n 90 permit tcp 192.168.20.50 0.0.0.0 host 10.10.10.10 eq 22\nend\nshow access-lists FILIAL-IN",
        "purpose": "Criar e identificar shadowing",
        "expectedObservation": "Regra sombreada identificada.",
        "interpretation": "Regra anterior torna a nova inalcançável."
      },
      {
        "platform": "Multiplataforma / conforme lab",
        "command": "conf t\nip access-list extended FILIAL-IN\n no 90\nend\nshow access-lists FILIAL-IN",
        "purpose": "Corrigir ordem",
        "expectedObservation": "Sem regra inalcançável.",
        "interpretation": "Revisão de ACL é operação contínua."
      }
    ],
    "decisionTree": [
      {
        "if": "Sem hits na regra",
        "then": "Verificar ponto de aplicação, direção, rota e origem real do fluxo."
      },
      {
        "if": "Allow existe mas aplicação falha",
        "then": "Separar transporte, TLS, WAF, backend e autorização."
      },
      {
        "if": "Retorno falha",
        "then": "Verificar state table, NACL/ACL stateless, portas efêmeras e caminho assimétrico."
      },
      {
        "if": "Regra ampla aparece",
        "then": "Substituir por matriz mínima com owner, validade, log e rollback."
      }
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a ACLs, regras e ordem de processamento.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "Qual é o 5-tuple do fluxo e em qual horário ele falhou?",
      "Qual controle tomou a decisão e qual evidência prova isso?",
      "A falha está na ida, no retorno, no estado, no NAT, no WAF ou no backend?"
    ]
  },
  "security": {
    "badPractices": [
      "Permitir 0.0.0.0/0 para SSH, RDP, banco ou painel administrativo.",
      "Criar regra genérica acima de regra restritiva.",
      "Desativar regra de bloqueio por falso positivo sem análise.",
      "Aplicar exceção sem prazo.",
      "Não registrar negações críticas.",
      "Copiar regra antiga sem entender o fluxo de negócio.",
      "Manter backend acessível diretamente apesar de WAF/API Gateway.",
      "Confundir NAT com autorização de tráfego."
    ],
    "vulnerabilities": [
      {
        "name": "Movimento lateral por regra ampla entre zonas.",
        "description": "Risco relacionado à aula 9.2 — ACLs, regras e ordem de processamento.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Matriz de comunicação antes da regra."
      },
      {
        "name": "Exposição pública de administração.",
        "description": "Risco relacionado à aula 9.2 — ACLs, regras e ordem de processamento.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Revisão de ordem e shadowing."
      },
      {
        "name": "Bypass de WAF por acesso direto ao backend.",
        "description": "Risco relacionado à aula 9.2 — ACLs, regras e ordem de processamento.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Contadores e logs integrados ao SIEM."
      },
      {
        "name": "Exfiltração por egress irrestrito.",
        "description": "Risco relacionado à aula 9.2 — ACLs, regras e ordem de processamento.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Expiração automática de exceções temporárias."
      },
      {
        "name": "Persistência de exceções antigas.",
        "description": "Risco relacionado à aula 9.2 — ACLs, regras e ordem de processamento.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Policy as code com bloqueio de padrões perigosos."
      },
      {
        "name": "Falta de evidência em resposta a incidente.",
        "description": "Risco relacionado à aula 9.2 — ACLs, regras e ordem de processamento.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Testes automatizados de conectividade autorizada e proibida."
      },
      {
        "name": "Shadowing que torna controles restritivos ineficazes.",
        "description": "Risco relacionado à aula 9.2 — ACLs, regras e ordem de processamento.",
        "defensiveExplanation": "Deve ser tratado em contexto defensivo, com monitoramento, evidência e mitigação.",
        "mitigation": "Rotina de recertificação de regras por dono técnico e dono de negócio."
      }
    ],
    "mitigations": [
      "Matriz de comunicação antes da regra.",
      "Revisão de ordem e shadowing.",
      "Contadores e logs integrados ao SIEM.",
      "Expiração automática de exceções temporárias.",
      "Policy as code com bloqueio de padrões perigosos.",
      "Testes automatizados de conectividade autorizada e proibida.",
      "Rotina de recertificação de regras por dono técnico e dono de negócio."
    ],
    "goodPractices": [
      "Usar deny-by-default.",
      "Colocar regras específicas antes de regras genéricas em ACLs ordenadas.",
      "Evitar any-any e porta any.",
      "Documentar dono, justificativa, ticket, validade e risco.",
      "Habilitar logs em denies relevantes e permits críticos.",
      "Revisar regras sem hits, regras amplas e exceções vencidas.",
      "Usar objetos nomeados, tags e grupos para reduzir erro humano.",
      "Testar fluxo permitido e fluxo bloqueado.",
      "Versionar regras em IaC quando possível.",
      "Diferenciar claramente controles stateful e stateless."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Matriz de comunicação antes da regra.",
      "Revisão de ordem e shadowing.",
      "Contadores e logs integrados ao SIEM.",
      "Expiração automática de exceções temporárias.",
      "Policy as code com bloqueio de padrões perigosos.",
      "Testes automatizados de conectividade autorizada e proibida.",
      "Rotina de recertificação de regras por dono técnico e dono de negócio."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "lab": {
    "id": "lab-9.2",
    "title": "ACL, ordem de processamento, deny implícito e shadowing",
    "labType": "packet-tracer",
    "objective": "Criar e revisar ACL com ordem correta, contadores, regra sombreada e deny implícito usando Cisco IOS ou simulação equivalente.",
    "scenario": "Filial precisa permitir HTTPS para servidor, bloquear SSH de usuários e permitir gestão só da rede administrativa.",
    "topology": "LAN usuários 192.168.20.0/24 -> R1/firewall -> servidor 10.10.10.10; gestão 192.168.99.0/24.",
    "architecture": "ACL estendida aplicada próxima à origem, com regra específica antes de regra geral e logging em deny relevante.",
    "prerequisites": [
      "Revisar as aulas anteriores do M09 e os fundamentos de TCP/UDP, portas, IPv4, DNS e HTTP.",
      "Usar somente laboratório, simulação, dados fictícios ou ambiente explicitamente autorizado."
    ],
    "tools": [
      "Cisco IOS/Packet Tracer",
      "show access-lists",
      "show ip interface",
      "nc/Test-NetConnection",
      "matriz de regras"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não aplique mudanças em produção sem change, janela, backup e rollback.",
      "Não use any-any como solução de troubleshooting.",
      "Sanitize IPs, tokens, cookies, payloads e nomes internos antes de compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Criar matriz de intenção",
        "instruction": "Defina regras na ordem lógica.",
        "expectedOutput": "Política legível antes da CLI.",
        "evidence": "Matriz com HTTPS permitido, SSH restrito e deny final.",
        "explanation": "Sem matriz, ACL vira tentativa e erro.",
        "artifact": "Tabela prioridade | ação | origem | destino | protocolo | porta | motivo."
      },
      {
        "number": 2,
        "title": "Configurar ACL",
        "instruction": "Crie ACL com regras específicas antes das gerais.",
        "expectedOutput": "ACL criada.",
        "evidence": "Configuração ACL.",
        "explanation": "A ordem define a decisão.",
        "command": "conf t\nip access-list extended FILIAL-IN\n permit tcp 192.168.99.0 0.0.0.255 host 10.10.10.10 eq 22\n deny   tcp 192.168.20.0 0.0.0.255 host 10.10.10.10 eq 22 log\n permit tcp 192.168.20.0 0.0.0.255 host 10.10.10.10 eq 443\n deny   ip any any log\nend"
      },
      {
        "number": 3,
        "title": "Aplicar na interface/direção correta",
        "instruction": "Aplique inbound na interface da LAN de usuários ou conforme desenho.",
        "expectedOutput": "Inbound access list FILIAL-IN.",
        "evidence": "show ip interface.",
        "explanation": "ACL certa no ponto errado não protege o fluxo.",
        "command": "conf t\ninterface g0/0\n ip access-group FILIAL-IN in\nend\nshow ip interface g0/0"
      },
      {
        "number": 4,
        "title": "Validar tráfego permitido",
        "instruction": "Teste HTTPS e veja contador.",
        "expectedOutput": "Permit 443 recebe hits.",
        "evidence": "Contador da regra permit.",
        "explanation": "Contador prova chegada do fluxo.",
        "command": "nc -vz 10.10.10.10 443\nshow access-lists FILIAL-IN"
      },
      {
        "number": 5,
        "title": "Validar bloqueio",
        "instruction": "Teste SSH a partir da rede comum.",
        "expectedOutput": "Bloqueio e hit no deny.",
        "evidence": "Contador/log do deny SSH.",
        "explanation": "Teste negativo faz parte do aceite.",
        "command": "nc -vz 10.10.10.10 22\nshow access-lists FILIAL-IN"
      },
      {
        "number": 6,
        "title": "Criar e identificar shadowing",
        "instruction": "Adicione regra específica abaixo do deny e explique por que não será atingida.",
        "expectedOutput": "Regra sombreada identificada.",
        "evidence": "Análise de shadowing.",
        "explanation": "Regra anterior torna a nova inalcançável.",
        "command": "conf t\nip access-list extended FILIAL-IN\n 90 permit tcp 192.168.20.50 0.0.0.0 host 10.10.10.10 eq 22\nend\nshow access-lists FILIAL-IN"
      },
      {
        "number": 7,
        "title": "Corrigir ordem",
        "instruction": "Remova/reordene a regra sombreada.",
        "expectedOutput": "Sem regra inalcançável.",
        "evidence": "ACL corrigida.",
        "explanation": "Revisão de ACL é operação contínua.",
        "command": "conf t\nip access-list extended FILIAL-IN\n no 90\nend\nshow access-lists FILIAL-IN"
      },
      {
        "number": 8,
        "title": "Documentar deny implícito",
        "instruction": "Compare deny implícito silencioso vs deny explícito com log.",
        "expectedOutput": "Deny implícito compreendido.",
        "evidence": "Parágrafo de análise.",
        "explanation": "Deny final com log acelera troubleshooting.",
        "analysisTask": "Explicar valor operacional do deny explícito com log."
      }
    ],
    "expectedResult": "Entrega com matriz de fluxo, evidências, validação objetiva, análise de risco e rollback.",
    "validation": [
      {
        "check": "ACL aplicada",
        "expected": "Inbound access list is FILIAL-IN.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "command": "show ip interface g0/0"
      },
      {
        "check": "Permit 443 com hits",
        "expected": "Contador aumenta na regra permit 443.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "command": "show access-lists FILIAL-IN"
      },
      {
        "check": "Deny SSH com hits",
        "expected": "Contador aumenta na regra deny 22.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "command": "show access-lists FILIAL-IN"
      },
      {
        "check": "Sem shadowing",
        "expected": "Nenhuma regra específica fica abaixo de bloqueio que a torne inalcançável.",
        "ifFails": "Revisar matriz, logs e ponto de coleta antes de alterar regra.",
        "method": "Revisão da ordem"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Regra sem hits",
        "probableCause": "Interface/direção errada ou fluxo não passa pelo dispositivo.",
        "howToConfirm": "show ip interface e rota.",
        "fix": "Aplicar no ponto correto."
      },
      {
        "symptom": "Tráfego legítimo bloqueado",
        "probableCause": "Deny anterior ou wildcard incorreto.",
        "howToConfirm": "show access-lists com contadores.",
        "fix": "Reordenar regra/corrigir wildcard."
      },
      {
        "symptom": "Gestão bloqueada",
        "probableCause": "Regra de gestão ausente antes do deny.",
        "howToConfirm": "Testar da rede de gestão e revisar console.",
        "fix": "Criar allow específico e rollback."
      }
    ],
    "improvements": [
      "Adicionar integração com SIEM.",
      "Automatizar revisão periódica de regras.",
      "Transformar a matriz em policy as code quando fizer sentido."
    ],
    "evidenceToCollect": [
      "Matriz de intenção",
      "Configuração ACL",
      "show ip interface",
      "show access-lists antes/depois",
      "Contadores allow/deny",
      "Análise de shadowing"
    ],
    "questions": [
      "Por que ordem importa?",
      "Como provar que regra recebeu tráfego?"
    ],
    "challenge": "Identifique regra sombreada, regra ampla e regra faltante.",
    "solution": "Leia top-down, compare regras gerais/específicas, valide contadores e corrija mantendo menor privilégio."
  },
  "mentorQuestions": [
    "Qual regra casa primeiro para este fluxo?",
    "Existe alguma regra posterior que parece proteger algo, mas nunca será atingida?",
    "Esta regra permite um fluxo de negócio específico ou apenas resolve um problema de conectividade de forma ampla?",
    "Que evidência mostrará que o tráfego foi permitido ou negado pela regra correta?",
    "O que muda se este controle for stateless?",
    {
      "type": "diagnóstico",
      "question": "Que evidência provaria que o firewall tomou a decisão correta neste cenário?",
      "hints": [
        "Pense em log, contador, state table, flow log ou packet capture.",
        "Separe ida, retorno e camada de aplicação."
      ],
      "expectedIdeas": [
        "matriz de fluxo",
        "log de regra",
        "contador",
        "state table",
        "pcap",
        "rollback"
      ],
      "explanation": "Firewall profissional é operado por evidências, não por palpites."
    }
  ],
  "quiz": [
    {
      "question": "Em uma ACL ordenada tradicional, o que normalmente acontece quando uma regra casa com o tráfego?",
      "options": [
        "Todas as regras continuam sendo avaliadas",
        "A primeira regra compatível define a ação",
        "O pacote é sempre criptografado",
        "A regra é convertida em DNS"
      ],
      "answer": "A primeira regra compatível define a ação",
      "explanation": "Em muitos modelos de ACL ordenada, a avaliação para naquele match; por isso a ordem muda o resultado."
    },
    {
      "question": "O que é shadowing em ACL?",
      "options": [
        "Criptografia de logs",
        "Uma regra anterior impede que uma regra posterior seja alcançada",
        "Tradução de IP privado para público",
        "Falha de DNS reverso"
      ],
      "answer": "Uma regra anterior impede que uma regra posterior seja alcançada",
      "explanation": "Regra ampla acima de regra específica pode tornar a específica inútil."
    },
    {
      "question": "Qual regra deve aparecer primeiro em uma ACL ordenada?",
      "options": [
        "A mais genérica",
        "A mais específica",
        "A que não tem log",
        "A regra any-any"
      ],
      "answer": "A mais específica",
      "explanation": "Regras específicas antes de genéricas reduzem risco de shadowing."
    },
    {
      "question": "O que é deny implícito?",
      "options": [
        "Permitir todo tráfego sem regra",
        "Negar tráfego que não casou com regra permitida",
        "Transformar TCP em UDP",
        "Desativar logs"
      ],
      "answer": "Negar tráfego que não casou com regra permitida",
      "explanation": "Em modelo deny-by-default, o que não foi explicitamente autorizado é bloqueado."
    },
    {
      "question": "Qual evidência ajuda a provar que a regra correta foi usada?",
      "options": [
        "Contador de hits e log da regra",
        "Apenas o nome do servidor",
        "Print sem horário",
        "Nenhuma evidência é necessária"
      ],
      "answer": "Contador de hits e log da regra",
      "explanation": "Contadores e logs mostram match, ação, horário e contexto."
    },
    {
      "question": "Por que uma regra deny sem log pode ser problemática?",
      "options": [
        "Porque sempre libera tráfego",
        "Porque dificulta troubleshooting e investigação",
        "Porque muda a porta TCP",
        "Porque impede uso de HTTPS"
      ],
      "answer": "Porque dificulta troubleshooting e investigação",
      "explanation": "Sem log, a equipe pode não saber se o bloqueio veio daquela regra."
    },
    {
      "question": "Em cloud, qual diferença geral costuma existir entre security group e NACL?",
      "options": [
        "Security group costuma ser stateful; NACL pode ser stateless e ordenada",
        "Security group é sempre DNS",
        "NACL é sempre WAF HTTP",
        "Não existe diferença operacional"
      ],
      "answer": "Security group costuma ser stateful; NACL pode ser stateless e ordenada",
      "explanation": "O modelo varia por provedor, mas essa diferença é central em muitos ambientes cloud."
    },
    {
      "question": "Qual é a melhor forma de tratar uma exceção temporária?",
      "options": [
        "Sem dono para ser mais rápida",
        "Com dono, justificativa, validade, risco, log e rollback",
        "Com any-any permanente",
        "Sem registro em ticket"
      ],
      "answer": "Com dono, justificativa, validade, risco, log e rollback",
      "explanation": "Exceções precisam de governança para não virarem risco permanente."
    }
  ],
  "flashcards": [
    {
      "front": "ACL",
      "back": "Lista de regras que decide permitir, negar, registrar ou inspecionar tráfego com base em critérios."
    },
    {
      "front": "Primeiro match",
      "back": "Modelo em que a primeira regra compatível define a ação e interrompe a avaliação."
    },
    {
      "front": "Shadowing",
      "back": "Quando uma regra anterior cobre o tráfego de uma regra posterior, impedindo que ela seja atingida."
    },
    {
      "front": "Deny implícito",
      "back": "Negação automática do tráfego que não foi explicitamente permitido."
    },
    {
      "front": "Deny/drop vs reject",
      "back": "Drop descarta silenciosamente; reject responde informando recusa."
    },
    {
      "front": "Contador de regra",
      "back": "Métrica que mostra quantas vezes uma regra recebeu match; ajuda em troubleshooting e auditoria."
    },
    {
      "front": "Regra órfã",
      "back": "Regra sem dono, justificativa, validade ou uso comprovado."
    },
    {
      "front": "Exceção temporária",
      "back": "Permissão fora do padrão com prazo, dono, risco documentado e plano de remoção."
    }
  ],
  "exercises": [
    {
      "title": "Prever o match",
      "prompt": "Dada a ACL: 10 permit 10.0.0.0/8 any tcp any; 20 deny 10.0.5.0/24 10.0.20.10 tcp 5432 log; 90 deny any any log. Qual regra casa para 10.0.5.25 → 10.0.20.10 TCP/5432?",
      "expectedAnswer": "A regra 10 casa primeiro. A regra 20 está sombreada para esse fluxo porque a regra 10 é ampla e aparece antes."
    },
    {
      "title": "Corrigir ordem",
      "prompt": "Reordene as regras para bloquear usuários acessando DB diretamente, mas permitir APP→DB TCP/5432.",
      "expectedAnswer": "Colocar deny USERS→DB antes de qualquer permissão ampla, permitir APP→DB TCP/5432 com log, remover regra interna ampla e manter deny final com log."
    },
    {
      "title": "Escolher ação",
      "prompt": "Quando você usaria reject em vez de drop?",
      "expectedAnswer": "Reject pode ser útil em ambiente interno controlado para acelerar troubleshooting. Drop é preferível quando não se quer revelar informação ao solicitante, especialmente em bordas expostas."
    },
    {
      "title": "Detectar regra órfã",
      "prompt": "Uma regra permite 10.10.0.0/16 para 10.20.0.0/16 em qualquer porta, não tem owner, não tem hits há 180 dias e foi criada durante incidente. O que fazer?",
      "expectedAnswer": "Tratar como regra de alto risco: identificar dono, validar necessidade, planejar remoção ou redução, registrar evidências e criar mudança com rollback."
    },
    {
      "title": "Modelo cloud",
      "prompt": "Explique por que uma NACL stateless pode exigir regras que um security group stateful não exige.",
      "expectedAnswer": "No controle stateless, retorno precisa ser permitido explicitamente, incluindo portas efêmeras. No stateful, o retorno relacionado a uma conexão permitida é rastreado."
    },
    {
      "id": "ex-9.2-p1-07-matriz",
      "type": "diagnóstico",
      "prompt": "Monte uma matriz de fluxo com origem, destino, protocolo, porta, direção, controle, log esperado e critério de rollback para o cenário da aula.",
      "expectedAnswer": "A resposta deve conter fluxo específico, sem any-any, com regra mínima, fonte de log, teste positivo/negativo e rollback.",
      "explanation": "Matriz de fluxo é a base para firewall operável e auditável."
    }
  ],
  "challenge": {
    "title": "Corrigir uma ACL com shadowing e exceção vencida",
    "scenario": "Você recebeu uma ACL de borda interna. Há uma permissão ampla no topo, uma negação que nunca recebe hits, SSH liberado de qualquer origem para o bastion, uma permissão APP→DB sem log e uma exceção temporária vencida para fornecedor.",
    "initialRules": [
      "10 permit 10.0.0.0/8 any tcp any",
      "20 deny 10.0.5.0/24 10.0.20.10 tcp 5432 log",
      "30 permit 10.0.10.20 10.0.20.10 tcp 5432",
      "40 permit any 10.0.30.10 tcp 22",
      "50 permit 203.0.113.50 10.0.10.20 tcp 8443 // exceção vencida",
      "90 deny any any"
    ],
    "tasks": [
      "Indicar qual regra está causando shadowing e quais regras ficam ineficazes.",
      "Reescrever a ACL com regras específicas antes de qualquer regra genérica.",
      "Remover ou redesenhar a exceção vencida do fornecedor.",
      "Adicionar logging adequado para banco, administração e deny final.",
      "Criar quatro testes: dois permitidos e dois negados.",
      "Explicar o que mudaria em um controle stateless."
    ],
    "successCriteria": [
      "Usuários não acessam DB diretamente.",
      "APP acessa DB apenas em TCP/5432.",
      "Bastion aceita administração apenas de origem autorizada.",
      "Exceção vencida não permanece ativa sem novo aceite de risco.",
      "Deny final possui log ou mecanismo equivalente de evidência.",
      "A ACL final não contém any-any permanente."
    ]
  },
  "commentedSolution": {
    "summary": "A solução remove a permissão ampla do topo, prioriza bloqueios e permissões específicas, adiciona logs e trata exceções vencidas como risco formal.",
    "correctedAclExample": [
      "10 deny   INTERNET DB_PAGAMENTOS any any log",
      "20 deny   USERS DB_PAGAMENTOS any any log",
      "30 permit USERS API_PAGAMENTOS tcp 443 log",
      "40 permit APP_PAGAMENTOS DB_PAGAMENTOS tcp 5432 log",
      "50 permit ADMIN_VPN BASTION tcp 22 log",
      "60 permit SERVIDORES SIEM tcp 6514 log",
      "70 permit SERVIDORES DNS udp 53",
      "80 permit SERVIDORES NTP udp 123",
      "90 deny   any any log"
    ],
    "steps": [
      "Identifique primeiro a regra que casa com os fluxos críticos. A regra ampla do topo permite tráfego interno antes das restrições.",
      "Remova ou substitua a regra ampla por permissões específicas baseadas na matriz de comunicação.",
      "Coloque negações críticas antes de permissões genéricas quando houver risco de shadowing.",
      "Adicione log em acesso ao banco, administração, exceções e deny final.",
      "Trate a exceção vencida do fornecedor como bloqueada até nova aprovação com prazo e owner.",
      "Valide com testes positivos e negativos, registrando contador da regra e evidência de log.",
      "Documente diferença se a plataforma for stateless, incluindo necessidade de retorno/portas efêmeras."
    ],
    "mentorComment": "Uma ACL boa conta uma história operacional: por que cada fluxo existe, quem é responsável por ele, onde ele deve passar, qual regra permite ou nega e qual evidência prova a decisão. Quando a política não conta essa história, ela vira dívida de segurança."
  },
  "glossary": [
    {
      "term": "ACL",
      "definition": "Lista de controle de acesso usada para permitir, negar, registrar ou inspecionar tráfego conforme critérios."
    },
    {
      "term": "Regra",
      "definition": "Entrada de política com condições de match e ação."
    },
    {
      "term": "Match",
      "definition": "Quando o tráfego corresponde aos critérios de uma regra."
    },
    {
      "term": "Primeiro match",
      "definition": "Modelo em que a primeira regra compatível vence e interrompe a avaliação."
    },
    {
      "term": "Shadowing",
      "definition": "Quando uma regra anterior impede que uma regra posterior seja alcançada para determinado tráfego."
    },
    {
      "term": "Deny implícito",
      "definition": "Negação aplicada quando nenhuma regra permitida casa com o tráfego."
    },
    {
      "term": "Deny/drop",
      "definition": "Ação que descarta tráfego, geralmente sem resposta ao solicitante."
    },
    {
      "term": "Reject",
      "definition": "Ação que nega e responde explicitamente ao solicitante."
    },
    {
      "term": "Contador de hit",
      "definition": "Contador que indica quantas vezes uma regra foi acionada."
    },
    {
      "term": "Regra órfã",
      "definition": "Regra sem dono, justificativa, validade ou uso comprovável."
    },
    {
      "term": "Exceção temporária",
      "definition": "Permissão fora do padrão com prazo, dono, risco e plano de remoção."
    },
    {
      "term": "Policy as code",
      "definition": "Prática de declarar e validar políticas em código versionado."
    }
  ],
  "references": [
    "Material interno da Deixando de ser TBN",
    "Conceitos consolidados de ACLs, firewalls, security groups, NACLs, WAF rules, Kubernetes NetworkPolicy e policy as code",
    "Boas práticas defensivas de segmentação, mínimo privilégio, logging, auditoria e governança de regras"
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Módulo de IaC e automação",
      "reason": "Policy as code, validação de regras em pipeline e revisão por pull request dependem de IaC e automação."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Controle de acesso e autenticação",
      "reason": "ACL controla caminho de rede; IAM controla sujeito, identidade e autorização da ação."
    },
    {
      "course": "Redes e Network",
      "module": "Módulo 8 — TCP, UDP, portas e transporte",
      "reason": "Portas, sockets e estado de conexão são pré-requisitos para interpretar regras de tráfego."
    }
  ],
  "progressRules": {
    "requiredSections": [
      "motivation",
      "concept",
      "internals",
      "architecture",
      "diagram",
      "lab",
      "security",
      "challenge",
      "summary"
    ],
    "requiredQuizScore": 70,
    "requiredLabCompletion": true,
    "unlocksNextLesson": "9.3",
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
      "9.3"
    ]
  },
  "accessPolicy": {
    "freeAccess": true,
    "navigationBlocked": false
  }
};
