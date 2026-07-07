export const lesson1501 = {
  "id": "15.1",
  "moduleId": "m15",
  "order": 1,
  "title": "Mentalidade de troubleshooting profissional",
  "subtitle": "Como investigar falhas de rede com método, evidências, hipóteses, comunicação, mitigação segura e aprendizado operacional — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 220,
  "tags": [
    "troubleshooting",
    "metodologia",
    "incidentes",
    "RCA",
    "evidências",
    "baseline",
    "linha do tempo",
    "redes",
    "segurança",
    "operações",
    "SRE",
    "DevSecOps",
    "caso real",
    "hipótese-evidência",
    "runbook",
    "war room"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m11",
      "reason": "Troubleshooting profissional depende de entender o fluxo ponta a ponta, incluindo Ethernet, IPv4, DNS, TCP/UDP, HTTP/TLS, firewall, VPN e roteamento."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.9",
      "title": "Playbooks de Investigação de Rede para SOC e Blue Team",
      "reason": "Investigação operacional e playbooks de SOC ajudam a preservar evidências e comunicar incidentes."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.12",
      "title": "Observabilidade e troubleshooting: flow logs, métricas e auditoria",
      "reason": "Observabilidade cloud, flow logs, métricas e auditoria são fontes importantes para troubleshooting moderno."
    }
  ],
  "objectives": [
    "Diferenciar troubleshooting amador de troubleshooting profissional.",
    "Construir problem statement, escopo e linha do tempo inicial.",
    "Relacionar sintomas, hipóteses, evidências e testes controlados.",
    "Aplicar raciocínio por camadas sem virar refém do modelo OSI.",
    "Evitar mudanças destrutivas durante incidentes.",
    "Produzir comunicação, mitigação e RCA inicial com qualidade profissional.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um relato ambíguo, o aluno escreve um problem statement investigável.",
    "Dado um fluxo de aplicação, o aluno identifica pontos possíveis de falha e evidências necessárias.",
    "Dado um conjunto de sintomas, o aluno prioriza hipóteses e define testes controlados.",
    "Dado um incidente, o aluno separa mitigação, correção definitiva e causa raiz.",
    "Dado um ambiente corporativo, o aluno propõe comunicação e documentação adequadas.",
    "Dado o caso “Aplicação corporativa indisponível após mudança de rede”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Quando uma rede falha, a primeira reação humana costuma ser procurar um comando milagroso: reiniciar o roteador, limpar cache DNS, trocar uma regra de firewall, desabilitar uma interface, aumentar um timeout ou culpar “a internet”. Em ambientes domésticos isso às vezes resolve. Em ambientes corporativos, esse comportamento pode aumentar o incidente, apagar evidências, mascarar a causa raiz e criar uma segunda falha.</p>\n  <p>A motivação desta aula é mudar sua postura mental: de operador que tenta coisas para profissional que investiga. Troubleshooting profissional não é decorar comandos. É um método para reduzir incerteza usando evidências, escopo, linha do tempo, hipóteses, testes controlados, comunicação e recuperação segura.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> quando uma aplicação crítica fica indisponível, a empresa não quer apenas que “volte”. Ela quer saber impacto, causa provável, risco de recorrência, ações tomadas, evidências, responsáveis, horário de início, horário de recuperação, clientes afetados e como evitar repetição.</div>\n  <p>Esta aula inicia o Módulo 15. Depois de aprender fundamentos, segurança e cloud, agora você vai aprender a pensar como alguém chamado para resolver incidentes reais sem pânico, sem chute e sem destruir o ambiente enquanto investiga.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n\n  <p>No início das redes corporativas, troubleshooting era muito associado ao técnico local: verificar cabo, placa de rede, hub, switch, endereço IP e gateway. A topologia era menor, os sistemas eram menos distribuídos e a quantidade de camadas era relativamente limitada.</p>\n  <p>Com a evolução para VLANs, roteamento dinâmico, firewalls, NAT, proxies, VPNs, balanceadores, Wi-Fi corporativo, aplicações web, microsserviços, cloud, Kubernetes e Zero Trust, a falha deixou de ter um único lugar óbvio. Um erro percebido como “sistema fora do ar” pode estar em DNS, TLS, rota, política de firewall, health check, autoscaling, CNI, NAT, token de identidade, endpoint privado, WAF, cache, BGP, MTU ou mudança de pipeline.</p>\n  <p>Por isso, o troubleshooting moderno se aproximou de práticas de incident response, SRE, observabilidade, gestão de mudanças, postmortem e engenharia de confiabilidade. A pergunta deixou de ser apenas “qual comando resolve?” e passou a ser “qual hipótese explica melhor os sintomas, quais evidências a confirmam e qual ação reduz impacto com menor risco?”.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Rede física:</strong> cabo, porta, luz, duplex e IP.</div><div class=\"timeline-item\"><strong>Rede corporativa:</strong> VLAN, roteamento, ACL, firewall, DNS e proxy.</div><div class=\"timeline-item\"><strong>Ambiente híbrido:</strong> VPN, BGP, cloud, NAT, private endpoints e logs distribuídos.</div><div class=\"timeline-item\"><strong>Operação moderna:</strong> observabilidade, runbooks, mudança controlada, RCA e aprendizado contínuo.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema central do troubleshooting é que sintomas são ambíguos. “Não consigo acessar o sistema” pode significar problemas completamente diferentes:</p>\n  <ul>\n    <li>o usuário está sem conectividade local;</li>\n    <li>o DNS resolve para IP incorreto;</li>\n    <li>o caminho passa por uma rota errada;</li>\n    <li>um firewall bloqueia a porta;</li>\n    <li>o TLS está expirado ou com cadeia inválida;</li>\n    <li>o load balancer não tem backends saudáveis;</li>\n    <li>o banco está recusando conexão;</li>\n    <li>o provedor cloud alterou o estado de um recurso;</li>\n    <li>uma mudança recente de IaC quebrou uma regra;</li>\n    <li>há um incidente de segurança em andamento.</li>\n  </ul>\n  <p>Sem método, o profissional pula entre hipóteses, aplica correções contraditórias e perde a linha do tempo. Com método, ele delimita escopo, coleta evidências, testa uma variável por vez, comunica impacto e documenta aprendizado.</p>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> confundir urgência com improviso. Em incidente crítico, a velocidade vem de preparação, clareza e método — não de tentar comandos aleatórios mais rápido.</div>\n\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Aplicação corporativa indisponível após mudança de rede</h3>\n  <p><strong>Sintoma observado:</strong> Usuários da filial e alguns usuários remotos relatam que o portal financeiro abre de forma intermitente; usuários no datacenter acessam normalmente.</p>\n  <p><strong>Impacto operacional:</strong> Fechamento financeiro atrasado, chamados duplicados e pressão para liberar regras amplas no firewall.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente → DNS → gateway/VPN → firewall → balanceador → aplicação → banco</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>08:20: mudança de firewall aprovada</li><li>08:45: primeiros relatos da filial</li><li>09:05: VPN também apresenta sintoma parcial</li><li>09:20: datacenter interno sem impacto</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>DNS split-horizon</td><td>Resolver compara IP por origem</td><td>Resolve-DnsName/dig em filial, VPN e datacenter</td><td>Alta</td></tr><tr><td>Firewall/NAT</td><td>Fluxo permitido em um sentido, retorno falha</td><td>logs allow/deny + tabela de sessões</td><td>Alta</td></tr><tr><td>LB/backend</td><td>Health check ou pool degradado</td><td>status do pool + logs 5xx</td><td>Média</td></tr><tr><td>Aplicação</td><td>Erro interno independente de rede</td><td>logs app e APM</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A mentalidade profissional evolui em camadas. O aluno iniciante procura uma causa única. O profissional experiente trabalha com hipóteses concorrentes, evidências parciais e risco operacional.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Postura</th><th>Como age</th><th>Risco</th><th>Evolução profissional</th></tr></thead>\n    <tbody>\n      <tr><td>Chute operacional</td><td>Reinicia serviços e altera regras sem registrar.</td><td>Apaga evidências e cria mudanças invisíveis.</td><td>Registrar estado inicial e criar plano de ação.</td></tr>\n      <tr><td>Comando solto</td><td>Executa ping, traceroute e nslookup sem pergunta clara.</td><td>Coleta dados que não respondem à hipótese.</td><td>Associar cada teste a uma hipótese específica.</td></tr>\n      <tr><td>Foco em tecnologia</td><td>Olha apenas switch, firewall ou cloud.</td><td>Ignora dependências de aplicação, DNS, IAM e usuário.</td><td>Mapear fluxo ponta a ponta.</td></tr>\n      <tr><td>Correção rápida</td><td>Abre acesso amplo para “voltar logo”.</td><td>Cria risco de segurança e dívida operacional.</td><td>Aplicar mitigação mínima, temporária e rastreada.</td></tr>\n      <tr><td>Incidente sem aprendizado</td><td>Encerra quando o serviço volta.</td><td>A falha retorna.</td><td>Produzir RCA, lições aprendidas e ação preventiva.</td></tr>\n    </tbody>\n  </table>\n  <p>O objetivo do Módulo 15 é treinar essa evolução até que investigar redes se torne um processo reproduzível.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Troubleshooting profissional</strong> é o processo estruturado de identificar, isolar, explicar, mitigar e prevenir falhas a partir de evidências. Ele combina conhecimento técnico com disciplina operacional.</p>\n  <p>O método pode ser resumido em nove movimentos:</p>\n  <ol>\n    <li><strong>Definir o sintoma:</strong> o que exatamente falhou, para quem, desde quando e com qual impacto?</li>\n    <li><strong>Delimitar o escopo:</strong> todos os usuários, uma filial, uma aplicação, uma região, um protocolo, um horário?</li>\n    <li><strong>Construir o fluxo esperado:</strong> origem, DNS, rota, firewall, balanceador, serviço, banco e resposta.</li>\n    <li><strong>Coletar evidências:</strong> comandos, logs, métricas, eventos de mudança e relatos.</li>\n    <li><strong>Criar hipóteses:</strong> possíveis causas compatíveis com os sintomas.</li>\n    <li><strong>Priorizar hipóteses:</strong> por probabilidade, impacto e facilidade de validação.</li>\n    <li><strong>Testar uma variável por vez:</strong> para não confundir causa e coincidência.</li>\n    <li><strong>Mitigar com controle:</strong> recuperar serviço sem abrir risco desnecessário.</li>\n    <li><strong>Aprender:</strong> documentar causa raiz, gatilhos, prevenção e monitoramento.</li>\n  </ol>\n  <p>Essa mentalidade é aplicável a cabo físico, VLAN, IPv4, DNS, TCP, firewall, VPN, Wi-Fi, cloud, Kubernetes e incidentes de segurança.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Internamente, troubleshooting funciona como redução progressiva de incerteza. Você começa com muitos possíveis pontos de falha e usa evidências para eliminar caminhos improváveis.</p>\n  <p>Imagine uma requisição HTTPS de um usuário até uma aplicação:</p>\n  <ol>\n    <li>o usuário precisa ter conectividade local;</li>\n    <li>o cliente precisa resolver o nome no DNS;</li>\n    <li>o tráfego precisa sair pelo gateway correto;</li>\n    <li>rotas intermediárias precisam existir;</li>\n    <li>firewalls precisam permitir o fluxo;</li>\n    <li>o servidor ou load balancer precisa aceitar conexão TCP;</li>\n    <li>o handshake TLS precisa funcionar;</li>\n    <li>o backend precisa estar saudável;</li>\n    <li>a aplicação precisa responder;</li>\n    <li>o caminho de retorno precisa ser permitido.</li>\n  </ol>\n  <p>Cada teste observa uma parte desse fluxo. <code>ping</code> pode indicar alcance ICMP, mas não prova que HTTPS funciona. <code>traceroute</code> sugere caminho, mas pode ser filtrado. <code>nslookup</code> valida resolução, mas não porta. <code>curl -v</code> mostra DNS, TCP, TLS e HTTP, mas não explica sozinho uma rota assimétrica. Logs de firewall mostram decisão de política, mas não payload. Flow logs mostram metadados, mas não conteúdo. O profissional entende o limite de cada evidência.</p>\n  <div class=\"callout callout--info\"><strong>Regra prática:</strong> nenhuma ferramenta “vê a verdade inteira”. Troubleshooting sério cruza sinais de cliente, rede, controle, servidor, aplicação e mudança.</div>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>A arquitetura de um processo de troubleshooting profissional possui papéis, dados e artefatos.</p>\n  <ul>\n    <li><strong>Entrada:</strong> alerta, chamado, relato de usuário, dashboard, incidente de segurança ou mudança malsucedida.</li>\n    <li><strong>Triagem:</strong> impacto, severidade, escopo, horário de início e necessidade de war room.</li>\n    <li><strong>Mapa de fluxo:</strong> origem, destino, DNS, rota, NAT, firewall, LB, proxy, serviço e dependências.</li>\n    <li><strong>Coleta:</strong> comandos, logs, métricas, auditoria, configuração e histórico de mudança.</li>\n    <li><strong>Hipóteses:</strong> lista priorizada de causas possíveis.</li>\n    <li><strong>Testes:</strong> validação controlada, uma variável por vez.</li>\n    <li><strong>Mitigação:</strong> ação temporária para reduzir impacto.</li>\n    <li><strong>Correção definitiva:</strong> mudança revisada que remove a causa raiz.</li>\n    <li><strong>RCA:</strong> relatório com causa, impacto, timeline, ações e prevenção.</li>\n  </ul>\n  <p>Em empresas maduras, essa arquitetura é apoiada por runbooks, dashboards, CMDB, inventário, versionamento de configuração, observabilidade e processo de mudanças.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Troubleshooting profissional se parece com medicina clínica. Um bom médico não vê febre e prescreve antibiótico automaticamente. Ele pergunta início dos sintomas, contexto, histórico, sinais vitais, exames, exposição, evolução, riscos e hipóteses diferenciais. Depois decide tratamento e acompanha resposta.</p>\n  <p>Em rede, o sintoma “sistema lento” é como “dor”. Pode ser DNS, perda de pacote, latência, CPU, banco, firewall, proxy, TLS, rota assimétrica, Wi-Fi ruim, MTU ou saturação. Tratar sem diagnóstico pode piorar.</p>\n  <p>A analogia também mostra a importância da anamnese: perguntar corretamente economiza horas. “Não funciona” é relato bruto. “Usuários da filial Brasília não acessam o ERP via VPN desde 09:42, mas conseguem navegar na internet e usuários da matriz acessam normalmente” já reduz muito o espaço de investigação.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Exemplo doméstico: você tenta acessar <code>https://exemplo.local</code> e recebe erro. Um troubleshooting amador começa reiniciando tudo. Um troubleshooting profissional segue perguntas:</p>\n  <ol>\n    <li>O problema ocorre só nesse site ou em todos?</li>\n    <li>O nome resolve? Teste: <code>nslookup exemplo.local</code>.</li>\n    <li>O IP responde? Teste: <code>ping</code>, sabendo que ICMP pode ser bloqueado.</li>\n    <li>A porta TCP abre? Teste: <code>curl -v https://exemplo.local</code> ou ferramenta equivalente.</li>\n    <li>O erro é DNS, conexão recusada, timeout, TLS ou HTTP?</li>\n    <li>Houve mudança recente em DNS, certificado, firewall ou aplicação?</li>\n  </ol>\n  <p>Esse exemplo simples já mostra a lógica: o comando não vem primeiro; a pergunta vem primeiro.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Cenário: usuários de uma filial não conseguem acessar o sistema financeiro hospedado no datacenter. A matriz acessa normalmente. A internet da filial funciona. O alerta começou às 10:15, logo após uma mudança de firewall.</p>\n  <p>Um profissional organiza:</p>\n  <ul>\n    <li><strong>Escopo:</strong> apenas filial, apenas sistema financeiro, não é queda geral.</li>\n    <li><strong>Fluxo esperado:</strong> cliente → switch → roteador filial → túnel/MPLS/VPN → firewall datacenter → servidor financeiro.</li>\n    <li><strong>Hipóteses:</strong> rota da filial, túnel, regra de firewall, NAT, DNS interno, servidor.</li>\n    <li><strong>Evidências:</strong> logs do firewall, tabela de rotas, status do túnel, teste da matriz, teste da filial, eventos de mudança.</li>\n    <li><strong>Teste controlado:</strong> validar se pacotes chegam ao firewall e se são permitidos.</li>\n  </ul>\n  <p>Se os logs mostram deny para origem da filial após a mudança, a mitigação pode ser restaurar regra anterior ou aplicar regra mínima temporária. A correção definitiva exige revisão da política e documentação do fluxo permitido.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Cenário: uma API privada em cloud parou de acessar um banco gerenciado via private endpoint. O deploy da aplicação não mudou, mas houve alteração de Terraform na VNet/VPC.</p>\n  <p>O troubleshooting profissional evita culpar a aplicação de imediato. Ele cruza:</p>\n  <ul>\n    <li>resolução DNS privada do endpoint;</li>\n    <li>route table da subnet da aplicação;</li>\n    <li>security group/NSG da aplicação e do endpoint;</li>\n    <li>política do private endpoint;</li>\n    <li>logs de auditoria da mudança;</li>\n    <li>flow logs entre aplicação e IP privado do serviço;</li>\n    <li>métricas do serviço gerenciado.</li>\n  </ul>\n  <p>Uma causa comum é DNS privado quebrado: o nome do banco passa a resolver para endpoint público ou para IP incorreto. Outra causa é mudança de NSG/SG bloqueando a porta. A mentalidade correta é seguir o fluxo e comparar estado antes/depois.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, troubleshooting profissional precisa conversar com pipelines, IaC e observabilidade. Uma falha de rede pode ter sido introduzida por um merge em Terraform, por uma policy as code mal configurada, por alteração de Helm chart, por mudança de Ingress ou por rotação de certificado.</p>\n  <p>Um fluxo maduro inclui:</p>\n  <ul>\n    <li>identificar mudanças recentes por repositório, commit, pipeline e autor;</li>\n    <li>comparar plano esperado e estado aplicado;</li>\n    <li>validar se testes de conectividade existiam no pipeline;</li>\n    <li>verificar se houve drift manual fora de IaC;</li>\n    <li>acionar rollback quando a mitigação segura for reverter mudança;</li>\n    <li>transformar a causa em novo teste automatizado.</li>\n  </ul>\n  <p>O objetivo não é usar DevSecOps apenas para entregar mais rápido. É usar automação para reduzir falhas repetidas e tornar evidências rastreáveis.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Nem toda falha de conectividade é incidente de segurança, mas todo troubleshooting sério deve considerar risco de segurança. Um pico de falhas DNS pode ser erro de configuração, mas também pode indicar tentativa de resolução para domínios maliciosos. Um aumento de egress pode ser backup, atualização legítima, erro de aplicação ou exfiltração. Um túnel VPN caindo pode ser instabilidade, mudança de BGP ou tentativa de interferência.</p>\n  <p>A postura defensiva inclui preservar evidências, evitar abrir regras amplas para “testar”, registrar comandos executados, envolver SOC quando houver indicadores suspeitos e separar mitigação operacional de investigação de segurança.</p>\n  <div class=\"callout callout--danger\"><strong>Má prática:</strong> durante um incidente, abrir <code>0.0.0.0/0</code> para qualquer porta “só para ver se volta”. Isso pode recuperar o serviço às custas de criar exposição crítica e confundir a investigação.</div>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama mostra o ciclo de troubleshooting profissional. Repare que ele não é linear rígido: novas evidências podem levar de volta à hipótese, ao escopo ou ao mapa de fluxo.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Ciclo de troubleshooting profissional baseado em sintomas, escopo, evidências, hipóteses, testes, mitigação e RCA\">\n    <svg viewBox=\"0 0 980 520\" class=\"network-svg\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-15-1-content-diagram-1-title svg-15-1-content-diagram-1-desc\">\n      <title id=\"svg-15-1-content-diagram-1-title\">Mentalidade de troubleshooting profissional</title>\n      <desc id=\"svg-15-1-content-diagram-1-desc\">Diagrama pedagógico da aula 15.1, Mentalidade de troubleshooting profissional, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1501\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n        </marker>\n      </defs>\n      <rect x=\"30\" y=\"30\" width=\"920\" height=\"460\" rx=\"24\" class=\"svg-frame\" />\n      <text x=\"490\" y=\"68\" text-anchor=\"middle\" class=\"svg-title\">Troubleshooting profissional: reduzir incerteza com evidências</text>\n\n      <g class=\"svg-node\">\n        <rect x=\"70\" y=\"120\" width=\"160\" height=\"70\" rx=\"14\" />\n        <text x=\"150\" y=\"148\" text-anchor=\"middle\">Sintoma</text>\n        <text x=\"150\" y=\"172\" text-anchor=\"middle\" class=\"svg-small\">impacto e horário</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"280\" y=\"120\" width=\"160\" height=\"70\" rx=\"14\" />\n        <text x=\"360\" y=\"148\" text-anchor=\"middle\">Escopo</text>\n        <text x=\"360\" y=\"172\" text-anchor=\"middle\" class=\"svg-small\">quem, onde, quando</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"490\" y=\"120\" width=\"160\" height=\"70\" rx=\"14\" />\n        <text x=\"570\" y=\"148\" text-anchor=\"middle\">Fluxo esperado</text>\n        <text x=\"570\" y=\"172\" text-anchor=\"middle\" class=\"svg-small\">DNS, rota, firewall</text>\n      </g>\n      <g class=\"svg-node\">\n        <rect x=\"700\" y=\"120\" width=\"180\" height=\"70\" rx=\"14\" />\n        <text x=\"790\" y=\"148\" text-anchor=\"middle\">Evidências</text>\n        <text x=\"790\" y=\"172\" text-anchor=\"middle\" class=\"svg-small\">logs, métricas, testes</text>\n      </g>\n\n      <g class=\"svg-node svg-node--accent\">\n        <rect x=\"120\" y=\"300\" width=\"170\" height=\"80\" rx=\"14\" />\n        <text x=\"205\" y=\"330\" text-anchor=\"middle\">Hipóteses</text>\n        <text x=\"205\" y=\"354\" text-anchor=\"middle\" class=\"svg-small\">priorizar causas</text>\n      </g>\n      <g class=\"svg-node svg-node--accent\">\n        <rect x=\"360\" y=\"300\" width=\"170\" height=\"80\" rx=\"14\" />\n        <text x=\"445\" y=\"330\" text-anchor=\"middle\">Teste controlado</text>\n        <text x=\"445\" y=\"354\" text-anchor=\"middle\" class=\"svg-small\">uma variável</text>\n      </g>\n      <g class=\"svg-node svg-node--accent\">\n        <rect x=\"600\" y=\"300\" width=\"170\" height=\"80\" rx=\"14\" />\n        <text x=\"685\" y=\"330\" text-anchor=\"middle\">Mitigação</text>\n        <text x=\"685\" y=\"354\" text-anchor=\"middle\" class=\"svg-small\">reduzir impacto</text>\n      </g>\n      <g class=\"svg-node svg-node--success\">\n        <rect x=\"780\" y=\"300\" width=\"120\" height=\"80\" rx=\"14\" />\n        <text x=\"840\" y=\"330\" text-anchor=\"middle\">RCA</text>\n        <text x=\"840\" y=\"354\" text-anchor=\"middle\" class=\"svg-small\">prevenir</text>\n      </g>\n\n      <path d=\"M230 155 H280\" class=\"svg-link\" marker-end=\"url(#arrow1501)\" />\n      <path d=\"M440 155 H490\" class=\"svg-link\" marker-end=\"url(#arrow1501)\" />\n      <path d=\"M650 155 H700\" class=\"svg-link\" marker-end=\"url(#arrow1501)\" />\n      <path d=\"M790 190 C790 250 220 240 205 300\" class=\"svg-link\" marker-end=\"url(#arrow1501)\" />\n      <path d=\"M290 340 H360\" class=\"svg-link\" marker-end=\"url(#arrow1501)\" />\n      <path d=\"M530 340 H600\" class=\"svg-link\" marker-end=\"url(#arrow1501)\" />\n      <path d=\"M770 340 H780\" class=\"svg-link\" marker-end=\"url(#arrow1501)\" />\n      <path d=\"M445 380 C445 450 205 450 205 382\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1501)\" />\n      <text x=\"325\" y=\"445\" text-anchor=\"middle\" class=\"svg-small\">se a evidência negar a hipótese, volte e refine</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratório\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula não exige equipamento real. Ele treina o processo mental: transformar um relato ambíguo em investigação estruturada. Você vai receber um cenário de falha e produzir artefatos de troubleshooting profissional: problem statement, escopo, fluxo esperado, hipóteses, evidências, plano de teste, mitigação, comunicação e RCA preliminar.</p>\n  <p>Esse laboratório prepara o terreno para as próximas aulas, nas quais os testes serão aplicados a camada física, VLAN, IPv4, DNS, TCP/UDP, firewall, HTTP/TLS, VPN, cloud e pacotes.</p>\n\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Aplicação corporativa indisponível após mudança de rede. <strong>Causa provável a ser comprovada ou descartada:</strong> Hipóteses concorrentes sem escopo: mudança de DNS, regra de firewall, rota assimétrica ou falha no balanceador. A aula força separar sintoma de causa.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios reforçam a diferença entre sintoma, hipótese, evidência e causa raiz. O objetivo é fazer você pensar antes de agir.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio desta aula é criar um playbook de troubleshooting profissional para um incidente de aplicação web indisponível em ambiente híbrido.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra como um profissional organiza investigação, evita mudanças destrutivas, comunica impacto e transforma o incidente em aprendizado operacional.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Nesta aula, você aprendeu que troubleshooting profissional é método, não coleção de comandos. A sequência começa por sintoma, escopo e fluxo esperado; passa por evidências, hipóteses e testes controlados; termina em mitigação, correção definitiva e RCA.</p>\n  <p>Os principais aprendizados foram:</p>\n  <ul>\n    <li>sintomas são ambíguos;</li>\n    <li>cada teste precisa responder uma hipótese;</li>\n    <li>uma variável por vez reduz confusão;</li>\n    <li>mudanças precisam ser registradas;</li>\n    <li>mitigação não é necessariamente causa raiz;</li>\n    <li>observabilidade e histórico de mudança são essenciais;</li>\n    <li>segurança deve ser preservada durante a investigação;</li>\n    <li>RCA transforma incidente em melhoria.</li>\n  </ul>\n\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Aplicação corporativa indisponível após mudança de rede” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Hipóteses concorrentes sem escopo: mudança de DNS, regra de firewall, rota assimétrica ou falha no balanceador. A aula força separar sintoma de causa..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, <strong>15.2 — Coleta de evidências, baseline e linha do tempo</strong>, você vai aprofundar como coletar dados sem se perder, como comparar estado atual com baseline, como montar uma timeline confiável e como documentar evidências para operação, segurança e auditoria.</p>\n\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 5",
      "Camada 6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "802.1Q",
      "ARP",
      "IPv4",
      "IPv6",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "DHCP",
      "HTTP",
      "HTTPS",
      "TLS",
      "BGP",
      "IPsec"
    ],
    "dependsOn": [
      "topologia",
      "endereçamento",
      "subnetting",
      "roteamento",
      "NAT",
      "firewall",
      "DNS",
      "TCP/UDP",
      "TLS",
      "logs",
      "métricas",
      "auditoria",
      "baseline"
    ],
    "enables": [
      "troubleshooting físico",
      "troubleshooting LAN",
      "troubleshooting DNS",
      "troubleshooting TCP/UDP",
      "troubleshooting firewall",
      "troubleshooting cloud",
      "RCA",
      "war room"
    ]
  },
  "lab": {
    "id": "lab-15.1",
    "title": "Caso guiado: Aplicação corporativa indisponível após mudança de rede",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Aplicação corporativa indisponível após mudança de rede” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Usuários da filial e alguns usuários remotos relatam que o portal financeiro abre de forma intermitente; usuários no datacenter acessam normalmente. Impacto: Fechamento financeiro atrasado, chamados duplicados e pressão para liberar regras amplas no firewall. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente → DNS → gateway/VPN → firewall → balanceador → aplicação → banco",
    "architecture": "Arquitetura investigada: Cliente → DNS → gateway/VPN → firewall → balanceador → aplicação → banco. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
    "prerequisites": [
      "Ambiente de laboratório, simulação, Packet Tracer/GNS3/cloud de teste ou execução conceitual autorizada.",
      "Conhecimento dos módulos anteriores de Redes, Segurança e Cloud.",
      "Não alterar produção sem aprovação, janela, backup e rollback."
    ],
    "tools": [
      "Editor de texto para dossiê",
      "Planilha para matriz hipótese-evidência",
      "Windows PowerShell/CMD",
      "Linux terminal",
      "Wireshark ou tcpdump quando aplicável",
      "Logs de firewall/LB/DNS/cloud/SIEM quando disponíveis",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "120-180 min",
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Executar somente em ambiente autorizado.",
      "Não abrir regras amplas nem desativar controles como atalho.",
      "Preservar logs e evidências antes de mudanças.",
      "Sanitizar dados sensíveis em capturas e prints.",
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar relato bruto",
        "instruction": "Anote quem reclamou, de onde acessa, horário, serviço, mensagem de erro e impacto sem concluir a causa.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Relato bruto com fonte, horário e sintoma observável.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Escrever problem statement",
        "instruction": "Converta o relato em frase verificável: população afetada, serviço, janela, sintoma e impacto.",
        "command": "Resolve-DnsName portal.empresa.local; Test-NetConnection portal.empresa.local -Port 443; tracert portal.empresa.local",
        "expectedOutput": "Problem statement que poderia ser lido em um war room.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Separar afetado e não afetado",
        "instruction": "Monte tabela com filial, VPN, datacenter, usuário externo, navegador, rede e horário.",
        "command": "dig portal.empresa.local +short && curl -vkI https://portal.empresa.local && mtr -rw portal.empresa.local",
        "expectedOutput": "Escopo com colunas afetado, não afetado e desconhecido.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Desenhar fluxo esperado",
        "instruction": "Mapeie cliente, DNS, caminho, firewall, LB, aplicação e banco.",
        "command": "Consultar mudanças, logs de firewall, logs do WAF/LB e eventos do SIEM no intervalo do incidente",
        "expectedOutput": "Fluxo ponta a ponta com dependências e pontos de falha.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Criar matriz hipótese-evidência",
        "instruction": "Para cada hipótese, defina evidência necessária, comando/log e responsável.",
        "command": "Consultar mudanças, logs de firewall, logs do WAF/LB e eventos do SIEM no intervalo do incidente",
        "expectedOutput": "Matriz com hipótese, evidência, fonte e prioridade.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Planejar testes controlados",
        "instruction": "Ordene testes para mudar uma variável por vez, começando por observação não destrutiva.",
        "command": "Consultar mudanças, logs de firewall, logs do WAF/LB e eventos do SIEM no intervalo do incidente",
        "expectedOutput": "Plano de teste que não altera produção.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Definir mitigação segura",
        "instruction": "Proponha alternativa temporária sem abrir any-any nem desativar controles de segurança.",
        "command": "Consultar mudanças, logs de firewall, logs do WAF/LB e eventos do SIEM no intervalo do incidente",
        "expectedOutput": "Mitigação com escopo, risco, dono e rollback.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Comunicar status executivo",
        "instruction": "Escreva atualização curta com impacto, estado, próxima evidência e prazo de próxima atualização.",
        "command": "Consultar mudanças, logs de firewall, logs do WAF/LB e eventos do SIEM no intervalo do incidente",
        "expectedOutput": "Mensagem de comunicação operacional.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 9,
        "title": "Produzir RCA preliminar",
        "instruction": "Registre causa provável, evidências que sustentam, lacunas e ações preventivas.",
        "command": "Consultar mudanças, logs de firewall, logs do WAF/LB e eventos do SIEM no intervalo do incidente",
        "expectedOutput": "RCA preliminar sem fingir certeza onde só há hipótese.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Aplicação corporativa indisponível após mudança de rede” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Aplicação corporativa indisponível após mudança de rede” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Problem statement verificável",
        "command": "Revisão por pares",
        "expected": "Contém serviço, população afetada, janela, sintoma e impacto.",
        "ifFails": "Reescreva removendo conclusões não comprovadas."
      },
      {
        "check": "Matriz hipótese-evidência completa",
        "command": "Checklist do lab",
        "expected": "Cada hipótese possui evidência, fonte, comando/log e prioridade.",
        "ifFails": "Inclua evidências observáveis antes de sugerir correção."
      },
      {
        "check": "Mitigação não destrutiva",
        "command": "Revisão de risco",
        "expected": "Nenhuma ação remove controles críticos sem aprovação e rollback.",
        "ifFails": "Substitua por mitigação limitada e monitorada."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "A equipe quer liberar any-any",
        "probableCause": "Pressão por recuperação rápida sem evidência",
        "howToConfirm": "Compare risco da mudança com escopo real dos afetados",
        "fix": "Proponha liberação mínima, temporária, monitorada e com rollback."
      },
      {
        "symptom": "Hipóteses demais travam o time",
        "probableCause": "Falta de priorização por impacto e probabilidade",
        "howToConfirm": "Verifique quais hipóteses explicam afetados e não afetados",
        "fix": "Priorize as hipóteses que explicam melhor o escopo."
      },
      {
        "symptom": "RCA vira opinião",
        "probableCause": "Evidências não foram preservadas",
        "howToConfirm": "Confirme se cada conclusão aponta para log, captura ou métrica",
        "fix": "Separar causa comprovada, causa provável e lacunas."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "Relato bruto",
      "Problem statement",
      "Tabela afetado/não afetado",
      "Mapa do fluxo",
      "Matriz hipótese-evidência",
      "Plano de comunicação",
      "RCA preliminar"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Receba um relato de “sistema lento” e produza em 30 minutos um dossiê inicial que permita iniciar um war room sem chutes.",
    "solution": "Uma boa solução começa delimitando escopo, não executando comandos aleatórios. O fluxo esperado orienta hipóteses; as evidências confirmam ou negam cada hipótese; a mitigação reduz impacto sem destruir a investigação; o RCA registra causa, fatores contribuintes e ações preventivas."
  },
  "exercises": [
    {
      "id": "ex15.1.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Aplicação corporativa indisponível após mudança de rede”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.1.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.1.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.1.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Aplicação corporativa indisponível após mudança de rede”, qual atitude é mais profissional antes de alterar configuração?",
      "opts": [
        "Coletar evidências ligadas às hipóteses principais",
        "Reiniciar todos os equipamentos do caminho",
        "Liberar any-any temporariamente sem registro",
        "Apagar caches e logs para começar limpo"
      ],
      "a": 0,
      "exp": "A alteração deve vir depois de evidência suficiente, com escopo e rollback.",
      "difficulty": "intermediário",
      "topic": "método"
    },
    {
      "id": "q15.1.p1.2",
      "type": "evidência",
      "q": "O que diferencia evidência de opinião durante um incidente?",
      "opts": [
        "Evidência pode ser verificada por log, comando, métrica, captura ou configuração",
        "Evidência é a hipótese defendida pelo profissional mais experiente",
        "Evidência é qualquer relato de usuário",
        "Evidência é sempre um print de tela"
      ],
      "a": 0,
      "exp": "Relatos são importantes, mas evidência técnica precisa ser verificável e interpretada no contexto.",
      "difficulty": "iniciante",
      "topic": "evidência"
    },
    {
      "id": "q15.1.p1.3",
      "type": "segurança",
      "q": "Por que uma mitigação emergencial deve ter escopo, expiração e rollback?",
      "opts": [
        "Para evitar que uma exceção temporária vire risco permanente",
        "Para deixar a mudança mais lenta sem benefício",
        "Porque toda mitigação deve desligar logs",
        "Porque rollback só é necessário em cloud"
      ],
      "a": 0,
      "exp": "Mudanças emergenciais sem governança tendem a virar dívida operacional e vulnerabilidade.",
      "difficulty": "intermediário",
      "topic": "mitigação"
    },
    {
      "id": "q15.1.p1.4",
      "type": "RCA",
      "q": "Uma boa RCA deve conter:",
      "opts": [
        "Causa sustentada por evidências, fatores contribuintes e ações preventivas",
        "Apenas o comando que resolveu",
        "O nome da pessoa culpada",
        "Todos os logs brutos sem interpretação"
      ],
      "a": 0,
      "exp": "RCA transforma incidente em aprendizado operacional e melhoria do sistema.",
      "difficulty": "intermediário",
      "topic": "RCA"
    },
    {
      "question": "Qual é a primeira atitude mais profissional diante de um relato ambíguo de falha?",
      "options": [
        "Reiniciar o serviço mais próximo",
        "Abrir todas as regras de firewall para testar",
        "Criar um problem statement e delimitar escopo",
        "Trocar DNS público imediatamente"
      ],
      "correctAnswer": 2,
      "explanation": "O problem statement e o escopo reduzem ambiguidade antes de qualquer ação de risco."
    },
    {
      "question": "O que significa testar uma variável por vez?",
      "options": [
        "Executar todos os comandos disponíveis",
        "Fazer uma mudança ampla para acelerar",
        "Alterar ou observar apenas um fator para interpretar o resultado",
        "Ignorar logs e confiar no relato"
      ],
      "correctAnswer": 2,
      "explanation": "Testes controlados evitam confundir causa, coincidência e efeito colateral."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.1.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.1.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.1.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.1.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.1.p1.5",
      "front": "O que uma RCA não deve ser?",
      "back": "Não deve ser caça a culpados nem lista de comandos; deve explicar causa, fatores contribuintes e prevenção.",
      "tags": [
        "RCA",
        "postmortem"
      ],
      "difficulty": "iniciante"
    }
  ],
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual parte do caso “Aplicação corporativa indisponível após mudança de rede” é sintoma e qual parte ainda é apenas hipótese?",
      "hints": [
        "Separe o que foi observado do que foi inferido.",
        "Procure frases que parecem causa sem evidência."
      ],
      "expectedIdeas": [
        "sintoma observável",
        "hipótese",
        "evidência",
        "escopo"
      ],
      "explanation": "A maturidade de troubleshooting começa quando o aluno para de tratar hipótese como fato."
    },
    {
      "type": "diagnóstico",
      "question": "Qual evidência você coletaria primeiro para reduzir mais incerteza nesse caso?",
      "hints": [
        "Prefira evidência não destrutiva.",
        "Escolha algo que diferencie duas hipóteses fortes."
      ],
      "expectedIdeas": [
        "comando",
        "log",
        "métrica",
        "captura",
        "comparação afetado/não afetado"
      ],
      "explanation": "A primeira evidência deve separar caminhos de investigação, não apenas gerar mais dados."
    },
    {
      "type": "cenário real",
      "question": "Que mitigação temporária reduz impacto sem aumentar demais o risco de segurança?",
      "hints": [
        "Evite any-any.",
        "Defina escopo, expiração, monitoramento e rollback."
      ],
      "expectedIdeas": [
        "mitigação limitada",
        "aprovação",
        "rollback",
        "monitoramento",
        "menor privilégio"
      ],
      "explanation": "Incidentes pressionam por atalhos; o profissional reduz impacto preservando controle."
    }
  ],
  "challenge": {
    "title": "Desafio P1 — Aplicação corporativa indisponível após mudança de rede",
    "scenario": "Usuários da filial e alguns usuários remotos relatam que o portal financeiro abre de forma intermitente; usuários no datacenter acessam normalmente.",
    "tasks": [
      "Montar problem statement.",
      "Construir matriz afetado/não afetado.",
      "Criar matriz hipótese-evidência.",
      "Executar ou simular comandos e coleta de logs.",
      "Definir mitigação com rollback.",
      "Produzir RCA com ações preventivas."
    ],
    "constraints": [
      "Não assumir causa sem evidência.",
      "Não usar mudança ampla como primeira resposta.",
      "Toda conclusão deve apontar para comando, log, métrica, captura ou configuração.",
      "Toda mitigação deve ter escopo e rollback."
    ],
    "expectedDeliverables": [
      "Dossiê do incidente",
      "Matriz hipótese-evidência",
      "Linha do tempo",
      "Plano de validação",
      "RCA",
      "Runbook atualizado"
    ],
    "gradingRubric": [
      {
        "criterion": "Escopo e problem statement",
        "points": 15,
        "description": "Delimita afetados, serviço, janela e sintoma sem causa prematura."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Liga hipóteses a evidências verificáveis e interpreta resultados corretamente."
      },
      {
        "criterion": "Mitigação segura",
        "points": 20,
        "description": "Reduz impacto sem criar exposição ampla, com rollback e monitoramento."
      },
      {
        "criterion": "RCA",
        "points": 25,
        "description": "Explica causa, fatores contribuintes e prevenção com dono e critério de aceite."
      },
      {
        "criterion": "Comunicação",
        "points": 15,
        "description": "Comunica impacto, estado e próximas ações com clareza."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Uma boa solução começa delimitando escopo, não executando comandos aleatórios. O fluxo esperado orienta hipóteses; as evidências confirmam ou negam cada hipótese; a mitigação reduz impacto sem destruir a investigação; o RCA registra causa, fatores contribuintes e ações preventivas.",
    "steps": [
      "Começar pelo sintoma observável e escopo.",
      "Desenhar o fluxo esperado.",
      "Priorizar hipóteses que explicam afetado e não afetado.",
      "Coletar evidências não destrutivas.",
      "Tomar decisão com base em evidência.",
      "Mitigar com escopo e rollback.",
      "Validar recuperação.",
      "Produzir RCA e ações preventivas."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar várias correções ao mesmo tempo.",
        "whyItIsWrong": "Pode recuperar o serviço, mas destrói a capacidade de saber a causa e cria risco de regressão."
      },
      {
        "answer": "Liberar tráfego amplo sem evidência.",
        "whyItIsWrong": "Aumenta superfície de ataque e transforma incidente operacional em risco de segurança."
      },
      {
        "answer": "Encerrar após o serviço voltar.",
        "whyItIsWrong": "Sem RCA e prevenção, a falha tende a voltar."
      }
    ],
    "finalAnswer": "A resposta correta para “Aplicação corporativa indisponível após mudança de rede” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Troubleshooting",
      "shortDefinition": "Investigação estruturada de falhas.",
      "longDefinition": "Processo de identificar, isolar, explicar, mitigar e prevenir problemas usando evidências, hipóteses e testes controlados.",
      "example": "Investigar por que usuários remotos não acessam uma aplicação após mudança de WAF.",
      "relatedTerms": [
        "RCA",
        "baseline",
        "evidência"
      ],
      "relatedLessons": [
        "15.1"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva do problema.",
      "longDefinition": "Frase ou parágrafo que descreve o sintoma, escopo, horário e impacto sem assumir causa não confirmada.",
      "example": "Usuários remotos não acessam o portal desde 09:40, enquanto usuários da matriz acessam normalmente.",
      "relatedTerms": [
        "escopo",
        "sintoma"
      ],
      "relatedLessons": [
        "15.1"
      ]
    },
    {
      "term": "Hipótese",
      "shortDefinition": "Causa possível a ser testada.",
      "longDefinition": "Explicação plausível para os sintomas que pode ser confirmada ou descartada por evidências.",
      "example": "Uma regra nova de WAF está bloqueando usuários remotos.",
      "relatedTerms": [
        "evidência",
        "teste controlado"
      ],
      "relatedLessons": [
        "15.1"
      ]
    },
    {
      "term": "Mitigação",
      "shortDefinition": "Redução temporária de impacto.",
      "longDefinition": "Ação aplicada para recuperar ou aliviar serviço enquanto a causa raiz é investigada ou corrigida definitivamente.",
      "example": "Aplicar exceção temporária e restrita no WAF para falso positivo confirmado.",
      "relatedTerms": [
        "rollback",
        "RCA"
      ],
      "relatedLessons": [
        "15.1"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de documentar causa confirmada, fatores contribuintes, impacto, timeline, ações corretivas e prevenção de recorrência.",
      "example": "Relatório pós-incidente mostrando que uma mudança de DNS sem teste sintético causou indisponibilidade parcial.",
      "relatedTerms": [
        "postmortem",
        "linha do tempo"
      ],
      "relatedLessons": [
        "15.1"
      ]
    },
    {
      "term": "War room",
      "shortDefinition": "Coordenação temporária de incidente.",
      "longDefinition": "Espaço ou reunião de resposta com responsáveis técnicos e de negócio para coordenar investigação, mitigação, comunicação e decisões.",
      "example": "War room com rede, segurança, DevOps e suporte durante queda de aplicação crítica.",
      "relatedTerms": [
        "incidente",
        "comunicação"
      ],
      "relatedLessons": [
        "15.1",
        "13.9"
      ]
    },
    {
      "term": "Matriz hipótese-evidência",
      "shortDefinition": "Tabela que conecta hipóteses a evidências verificáveis.",
      "longDefinition": "Ferramenta de troubleshooting usada para priorizar testes, evitar achismo e registrar por que uma hipótese foi confirmada ou descartada.",
      "example": "Hipótese DNS deve apontar para evidências como resolvedor usado, resposta autoritativa, TTL e diferença entre origens.",
      "relatedTerms": [
        "evidência",
        "diagnóstico",
        "linha do tempo"
      ],
      "relatedLessons": [
        "15.1",
        "15.2",
        "15.1"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "SP 800-61 Rev. 3: Incident Response Recommendations and Considerations for Cybersecurity Risk Management",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "note": "Base para conectar investigação, resposta, recuperação e melhoria contínua em incidentes."
    },
    {
      "type": "official-doc",
      "title": "The NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Organiza resultados de cybersecurity nas funções Govern, Identify, Protect, Detect, Respond e Recover."
    },
    {
      "type": "vendor-doc",
      "title": "Troubleshooting Overview",
      "organization": "Cisco",
      "url": "https://www.cisco.com/en/US/docs/internetworking/troubleshooting/guide/tr1901.html",
      "note": "Referência histórica sobre definir sintomas, identificar problemas e implementar soluções em redes."
    },
    {
      "type": "vendor-doc",
      "title": "System Troubleshooting Methodology",
      "organization": "Cisco",
      "url": "https://www.cisco.com/cisco/web/docs/iam/unified/ipcc611/System_Troubleshooting_Methodology.html",
      "note": "Apresenta passos gerais: coletar informações, isolar pontos de falha e aplicar ferramentas para determinar causa raiz."
    },
    {
      "type": "rfc",
      "title": "RFC 5706: Guidelines for Considering Operations and Management of New Protocols and Protocol Extensions",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/info/rfc5706/",
      "note": "Reforça a importância de considerações operacionais, gerenciamento e diagnóstico em tecnologias de rede."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Mentalidade de troubleshooting profissional\".",
      "Preservar evidências antes de aplicar mudanças destrutivas ou rollback.",
      "Usar menor privilégio, segmentação e escopo explícito em qualquer teste prático.",
      "Registrar comandos, horários, origem, destino, resultado esperado e resultado observado.",
      "Transformar aprendizados em checklist, runbook, teste automatizado ou melhoria de monitoramento."
    ],
    "badPractices": [
      "Liberar any-any, desativar firewall, ignorar TLS ou remover controles sem evidência e aprovação.",
      "Executar vários ajustes ao mesmo tempo e depois não saber qual ação mudou o sintoma.",
      "Apagar caches, reiniciar serviços ou rotacionar logs antes de coletar evidências.",
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir mitigação com causa raiz.",
      "Confundir correlação temporal com prova de causalidade.",
      "Testar a partir de uma origem que não representa os usuários afetados.",
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar troubleshooting profissional, evidências, hipóteses, testes controlados, RCA e comunicação de incidentes com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Exceção emergencial permanente",
        "description": "No caso “Aplicação corporativa indisponível após mudança de rede”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Mentalidade de troubleshooting profissional",
              "description": "Em Mentalidade de troubleshooting profissional, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
              "defensiveExplanation": "O risco aparece quando comandos, PCAPs, logs, métricas, rotas, DNS, firewall e mudanças recentes não são correlacionados em uma linha do tempo única.",
              "mitigation": "Coletar evidências mínimas antes de alterar, registrar horário/fonte/comando, testar uma hipótese por vez, manter plano de rollback, validar regressão e transformar achados recorrentes em runbooks."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Alertar mudanças emergenciais sem expiração.",
      "Correlacionar logs de rede, identidade, cloud e aplicação durante a janela do incidente.",
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
    ],
    "hardening": [
      "Padronizar runbooks de coleta antes de mudança.",
      "Exigir revisão pós-incidente com ações preventivas rastreáveis.",
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Detectar aumento súbito de regras temporárias, bypass TLS, queda de logs ou tráfego fora do baseline.",
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.1."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Usuários da filial e alguns usuários remotos relatam que o portal financeiro abre de forma intermitente; usuários no datacenter acessam normalmente.",
      "Impacto: Fechamento financeiro atrasado, chamados duplicados e pressão para liberar regras amplas no firewall.",
      "Causa provável a validar: Hipóteses concorrentes sem escopo: mudança de DNS, regra de firewall, rota assimétrica ou falha no balanceador. A aula força separar sintoma de causa.",
      "Falha ou comportamento inesperado relacionado a Mentalidade de troubleshooting profissional.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Quem é afetado e quem não é afetado?",
      "Qual hipótese explica melhor todos os sintomas sem contradizer evidências?",
      "Que evidência confirmaria ou negaria a hipótese mais provável?",
      "A mitigação proposta preserva segurança, logs e rollback?",
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 15.1?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Resolve-DnsName portal.empresa.local; Test-NetConnection portal.empresa.local -Port 443; tracert portal.empresa.local",
        "purpose": "Separar resolução DNS, conectividade TCP e caminho inicial.",
        "expectedObservation": "IP resolvido, sucesso/falha na porta 443 e saltos até o destino.",
        "interpretation": "Se DNS muda por origem, suspeite split-horizon; se TCP falha após rota, suspeite firewall/caminho."
      },
      {
        "platform": "Linux",
        "command": "dig portal.empresa.local +short && curl -vkI https://portal.empresa.local && mtr -rw portal.empresa.local",
        "purpose": "Coletar resolução, TLS/HTTP e perda/latência em um único dossiê.",
        "expectedObservation": "IP, certificado apresentado, código HTTP e caminho com perda.",
        "interpretation": "Permite decidir se o problema está antes da aplicação, no TLS, no HTTP ou no caminho."
      },
      {
        "platform": "Operação/SOC",
        "command": "Consultar mudanças, logs de firewall, logs do WAF/LB e eventos do SIEM no intervalo do incidente",
        "purpose": "Correlacionar sintoma com mudanças e eventos.",
        "expectedObservation": "Linha do tempo com mudança e evidências técnicas.",
        "interpretation": "Correlação temporal não prova causa, mas orienta hipóteses priorizadas."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “DNS split-horizon” está com prioridade Alta e a evidência necessária é “Resolve-DnsName/dig em filial, VPN e datacenter”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Firewall/NAT” está com prioridade Alta e a evidência necessária é “logs allow/deny + tabela de sessões”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “LB/backend” está com prioridade Média e a evidência necessária é “status do pool + logs 5xx”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Aplicação” está com prioridade Média e a evidência necessária é “logs app e APM”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A evidência contradiz a hipótese favorita",
        "then": "Não force a conclusão. Atualize a matriz, registre a hipótese descartada e avance para a próxima explicação compatível com os sintomas."
      },
      {
        "if": "A mitigação proposta amplia acesso, desativa controle ou apaga evidência",
        "then": "Pausar, documentar risco, obter aprovação formal, reduzir escopo e definir rollback antes de agir."
      }
    ]
  },
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
      "15.2"
    ]
  },
  "diagnosticCase": {
    "title": "Aplicação corporativa indisponível após mudança de rede",
    "symptom": "Usuários da filial e alguns usuários remotos relatam que o portal financeiro abre de forma intermitente; usuários no datacenter acessam normalmente.",
    "businessImpact": "Fechamento financeiro atrasado, chamados duplicados e pressão para liberar regras amplas no firewall.",
    "likelyRootCause": "Hipóteses concorrentes sem escopo: mudança de DNS, regra de firewall, rota assimétrica ou falha no balanceador. A aula força separar sintoma de causa.",
    "timeline": [
      "08:20: mudança de firewall aprovada",
      "08:45: primeiros relatos da filial",
      "09:05: VPN também apresenta sintoma parcial",
      "09:20: datacenter interno sem impacto"
    ],
    "expectedFlow": "Cliente → DNS → gateway/VPN → firewall → balanceador → aplicação → banco",
    "hypothesisMatrix": [
      {
        "hypothesis": "DNS split-horizon",
        "why": "Resolver compara IP por origem",
        "evidence": "Resolve-DnsName/dig em filial, VPN e datacenter",
        "priority": "Alta"
      },
      {
        "hypothesis": "Firewall/NAT",
        "why": "Fluxo permitido em um sentido, retorno falha",
        "evidence": "logs allow/deny + tabela de sessões",
        "priority": "Alta"
      },
      {
        "hypothesis": "LB/backend",
        "why": "Health check ou pool degradado",
        "evidence": "status do pool + logs 5xx",
        "priority": "Média"
      },
      {
        "hypothesis": "Aplicação",
        "why": "Erro interno independente de rede",
        "evidence": "logs app e APM",
        "priority": "Média"
      }
    ],
    "requiredArtifacts": [
      "problem statement",
      "escopo afetado/não afetado",
      "mapa do fluxo",
      "matriz hipótese-evidência",
      "comandos/logs/capturas",
      "decisão",
      "mitigação",
      "validação",
      "RCA"
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
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    }
  ]
};
