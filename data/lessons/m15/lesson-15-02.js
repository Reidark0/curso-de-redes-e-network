export const lesson1502 = {
  "id": "15.2",
  "moduleId": "m15",
  "order": 2,
  "title": "Coleta de evidências, baseline e linha do tempo",
  "subtitle": "Como coletar dados úteis, comparar com o estado normal e montar uma timeline confiável para diagnóstico, comunicação e RCA — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "150-210 min",
  "estimatedStudyTimeMinutes": 210,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 230,
  "tags": [
    "troubleshooting",
    "evidências",
    "baseline",
    "linha do tempo",
    "logs",
    "métricas",
    "flow logs",
    "auditoria",
    "SIEM",
    "RCA",
    "DevSecOps",
    "segurança",
    "caso real",
    "hipótese-evidência",
    "runbook",
    "war room"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.1",
      "reason": "A aula anterior define mentalidade, hipóteses, escopo e método investigativo."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.5",
      "reason": "SIEM, logs e correlação são fontes centrais para evidências."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.12",
      "reason": "Observabilidade cloud fornece flow logs, métricas e auditoria para troubleshooting moderno."
    }
  ],
  "objectives": [
    "Diferenciar dado bruto, evidência, baseline e conclusão.",
    "Montar uma linha do tempo confiável para incidentes de rede.",
    "Escolher fontes de evidência adequadas para cada hipótese.",
    "Normalizar horário, origem, escopo e fonte dos artefatos coletados.",
    "Comparar estado atual com baseline técnico, operacional e financeiro.",
    "Preservar evidências úteis para RCA, segurança e auditoria.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um incidente, o aluno cria uma matriz hipótese-evidência-fonte.",
    "Dado um conjunto de logs e relatos, o aluno monta timeline ordenada e coerente.",
    "Dado um serviço crítico, o aluno define baseline mínimo de rede e aplicação.",
    "Dado um erro de conectividade, o aluno seleciona evidências por camada e por componente.",
    "Dado um ambiente cloud, o aluno separa evidências de plano de dados e plano de controle.",
    "Dado o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivação\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Na aula anterior, você aprendeu que troubleshooting profissional começa com método. Agora entra a parte que separa uma investigação séria de uma conversa de corredor: <strong>evidência</strong>. Sem evidência, o time discute opinião. Com evidência, o time compara fatos, reduz incerteza e decide com menor risco.</p>\n  <p>Imagine que uma aplicação ficou lenta às 10:12. Um analista culpa DNS. Outro culpa firewall. Outro culpa banco. Outro culpa a cloud. Todos podem estar parcialmente certos, mas nenhum deles deveria vencer por falar com mais confiança. A pergunta correta é: <em>qual era o comportamento normal, o que mudou, quando mudou, quem foi afetado, quais medições confirmam isso e quais eventos aconteceram perto do início do sintoma?</em></p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> em incidentes corporativos, a equipe frequentemente começa pelo comando, não pela pergunta. Isso gera capturas incompletas, logs perdidos, horários inconsistentes, prints sem contexto e RCA baseado em memória.</div>\n  <p>A motivação desta aula é ensinar você a coletar evidências como um profissional: com escopo, horário, fonte, confiabilidade, cadeia lógica e comparação com baseline.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--história\">\n  <h2>2. História</h2>\n\n\n  <p>No começo das redes, muitas evidências vinham de observação física: LEDs, cabos, contadores de interface, tabelas ARP e rotas. Em redes corporativas maiores, surgiram logs de switches, roteadores, firewalls, servidores, proxies e controladoras Wi-Fi. Com cloud, Kubernetes, Zero Trust e automação, as fontes se multiplicaram: flow logs, auditoria de API, métricas de load balancer, eventos de autoscaling, logs de DNS, trilhas de pipeline, configurações versionadas e billing.</p>\n  <p>A evolução trouxe um paradoxo: hoje existe mais telemetria do que nunca, mas também é mais fácil se afogar em dados. Coletar “tudo” sem pergunta clara não resolve. A maturidade está em saber <strong>qual evidência responde qual hipótese</strong>.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Operação local:</strong> cabo, porta, IP, gateway e logs do sistema.</div><div class=\"timeline-item\"><strong>Rede corporativa:</strong> SNMP, syslog, NetFlow, firewall, proxy e DNS.</div><div class=\"timeline-item\"><strong>Cloud:</strong> flow logs, eventos de controle, métricas gerenciadas e tags.</div><div class=\"timeline-item\"><strong>DevSecOps:</strong> commits, pipelines, IaC, aprovações, deploys e policy as code.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema central desta aula é que evidências ruins levam a conclusões ruins. Uma evidência pode estar incompleta, sem horário, sem origem, sem fuso, sem comparação, sem contexto de mudança ou sem relação direta com o sintoma.</p>\n  <p>Exemplos comuns:</p>\n  <ul>\n    <li>um print de erro sem URL, horário, usuário, IP de origem ou ambiente;</li>\n    <li>um ping que falha, mas o serviço real usa HTTPS e ICMP é bloqueado por política;</li>\n    <li>um traceroute interpretado como prova absoluta, ignorando assimetria e filtros;</li>\n    <li>um log de firewall sem correlação com DNS, NAT, LB e aplicação;</li>\n    <li>uma métrica de CPU alta tratada como causa, quando pode ser efeito;</li>\n    <li>um evento de mudança sem confirmação de que afetou o fluxo investigado;</li>\n    <li>horários misturados entre UTC, horário local, navegador, servidor e SIEM.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> tentar montar a linha do tempo no fim do incidente. A timeline deve nascer desde o primeiro minuto, porque memória humana e mensagens soltas envelhecem mal.</div>\n\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Incidente depois de janela de mudança com relógios e logs inconsistentes</h3>\n  <p><strong>Sintoma observado:</strong> O serviço começou a falhar “por volta das 10h”, mas firewall, proxy, aplicação e cloud registram horários divergentes.</p>\n  <p><strong>Impacto operacional:</strong> A investigação perde tempo discutindo quem causou o problema porque a timeline não é confiável.</p>\n  <p><strong>Fluxo esperado:</strong> Chamado → baseline → logs por camada → auditoria de mudança → timeline única → hipótese priorizada</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>09:50: deploy de pipeline</li><li>10:02: alteração de rota</li><li>10:07: aumento de 5xx</li><li>10:10: primeiro chamado</li><li>10:18: rollback parcial</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Mudança de rota</td><td>Aumento de falhas após alteração</td><td>route table/audit log/flow log</td><td>Alta</td></tr><tr><td>Deploy de aplicação</td><td>5xx no backend sem falha de rede</td><td>APM/log app</td><td>Média</td></tr><tr><td>Relógio divergente</td><td>Eventos fora de ordem</td><td>NTP/offset/timestamp source</td><td>Alta</td></tr><tr><td>Capacidade</td><td>Latência e filas aumentaram</td><td>métricas de CPU/conexões</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolução\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A coleta de evidências evolui em quatro níveis. O objetivo do aluno é sair do nível reativo e chegar ao nível operacionalmente confiável.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Nível</th><th>Como coleta</th><th>Limitação</th><th>Maturidade esperada</th></tr></thead>\n    <tbody>\n      <tr><td>Relato</td><td>Baseia-se em “usuário disse que caiu”.</td><td>Ambíguo e emocional.</td><td>Transformar relato em sintoma verificável.</td></tr>\n      <tr><td>Comando isolado</td><td>Executa ping, nslookup, curl ou traceroute.</td><td>Sem hipótese clara, pode enganar.</td><td>Ligar cada teste a uma pergunta.</td></tr>\n      <tr><td>Logs e métricas</td><td>Consulta firewall, DNS, LB, aplicação e cloud.</td><td>Volume alto e horários diferentes.</td><td>Normalizar tempo, fonte e escopo.</td></tr>\n      <tr><td>Baseline e timeline</td><td>Compara estado atual com normal e correlaciona eventos.</td><td>Exige disciplina prévia.</td><td>Produzir evidência auditável e RCA confiável.</td></tr>\n    </tbody>\n  </table>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Evidência</strong> é qualquer dado observável que ajuda a confirmar, negar ou refinar uma hipótese. Ela pode ser técnica, operacional ou contextual.</p>\n  <p><strong>Baseline</strong> é o estado normal conhecido usado como comparação: latência típica, perda aceitável, throughput, rotas esperadas, resolução DNS correta, portas abertas, volume de logs, taxa de erro, consumo de NAT, resposta de health check, topologia e configuração aprovada.</p>\n  <p><strong>Linha do tempo</strong> é a sequência ordenada de fatos relevantes: início do sintoma, primeiro alerta, mudança recente, piora, mitigação, recuperação, recorrência e evidências associadas.</p>\n  <p>Uma evidência profissional deve responder pelo menos seis perguntas:</p>\n  <ol>\n    <li>Quem ou o que gerou a evidência?</li>\n    <li>Quando foi observada, com qual fuso ou padrão de horário?</li>\n    <li>De qual origem, rede, zona, região, usuário ou serviço?</li>\n    <li>Qual hipótese ela confirma, nega ou enfraquece?</li>\n    <li>Ela representa o fluxo real ou apenas um teste auxiliar?</li>\n    <li>Qual era o baseline para comparação?</li>\n  </ol>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Internamente, uma investigação baseada em evidências funciona como um funil. No topo há muitos sintomas e possibilidades. A cada evidência confiável, hipóteses incompatíveis são descartadas ou rebaixadas.</p>\n  <p>Considere um acesso HTTPS falhando. O caminho real envolve:</p>\n  <ul>\n    <li><strong>Cliente:</strong> IP, rota local, DNS configurado, proxy, certificado confiável e horário correto.</li>\n    <li><strong>Resolução:</strong> consulta DNS, TTL, cache, split-horizon, resposta pública ou privada.</li>\n    <li><strong>Rede:</strong> gateway, NAT, firewall, rota, VPN, peering, MTU e assimetria.</li>\n    <li><strong>Borda:</strong> CDN, WAF, Load Balancer, TLS termination e health checks.</li>\n    <li><strong>Backend:</strong> serviço, porta, pod, VM, banco, dependência e política de segurança.</li>\n    <li><strong>Plano de controle:</strong> mudanças de IaC, console, API, autoscaling, rotação de certificado e política.</li>\n  </ul>\n  <p>Cada ponto gera evidências diferentes. Flow logs mostram metadados de fluxo, mas não provam conteúdo HTTP. Logs de aplicação mostram erro interno, mas talvez não mostrem bloqueio de firewall. Auditoria de cloud mostra quem alterou uma regra, mas não prova que aquela regra afetou o tráfego sem correlação.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura mínima de evidências para troubleshooting de rede deve incluir fontes distribuídas e um local de correlação.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Fonte</th><th>O que responde</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Cliente</td><td>Erro percebido, DNS local, rota inicial, proxy, certificado.</td><td>Pode refletir cache, rede doméstica ou configuração individual.</td></tr>\n      <tr><td>DNS</td><td>Nome resolvido, TTL, zona pública/privada, split-horizon.</td><td>Resposta pode variar por origem e cache.</td></tr>\n      <tr><td>Firewall/LB/WAF</td><td>Permissão, bloqueio, código HTTP, saúde de backend.</td><td>Pode não mostrar causa no backend.</td></tr>\n      <tr><td>Flow logs/NetFlow</td><td>Quem falou com quem, porta, aceito/rejeitado, volume.</td><td>Normalmente não mostra payload.</td></tr>\n      <tr><td>Aplicação</td><td>Erro de negócio, exceção, dependência, autenticação.</td><td>Pode não registrar falhas antes de chegar à aplicação.</td></tr>\n      <tr><td>Auditoria/IaC</td><td>Mudança de configuração, autor, horário e método.</td><td>Precisa ser correlacionada com impacto.</td></tr>\n      <tr><td>SIEM/Observabilidade</td><td>Correlação, alertas, timeline e busca centralizada.</td><td>Depende de ingestão, retenção e normalização corretas.</td></tr>\n    </tbody>\n  </table>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Pense em troubleshooting como investigação veterinária em um animal que chegou apático. Um profissional não aplica qualquer medicamento forte sem histórico, exame físico e sinais vitais. Ele pergunta quando começou, o que mudou, quais sintomas são observáveis, quais exames existem, qual era o estado normal e quais hipóteses são perigosas demais para ignorar.</p>\n  <p>Na rede acontece o mesmo. “O sistema caiu” é como “o animal está estranho”: é um relato, não um diagnóstico. Baseline é conhecer os sinais normais. Evidência é exame, medição, imagem, histórico e resposta a teste controlado. Linha do tempo é saber se o sintoma começou antes ou depois de uma mudança, pico, deploy, queda de link ou alerta de segurança.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Um usuário diz: “não consigo acessar <code>portal.empresa.local</code>”. Uma resposta amadora seria trocar DNS ou reiniciar a máquina. Uma resposta profissional começa por evidências:</p>\n  <ol>\n    <li>Qual erro aparece: timeout, NXDOMAIN, certificado, 403, 502 ou 503?</li>\n    <li>O problema acontece com todos ou só com esse usuário?</li>\n    <li>O nome resolve para qual IP agora? Qual deveria resolver no baseline?</li>\n    <li>O usuário está na VPN, Wi-Fi, cabo ou rede doméstica?</li>\n    <li>O acesso falha por navegador, curl e outro dispositivo?</li>\n    <li>Há mudança recente de DNS, certificado, WAF, LB ou firewall?</li>\n  </ol>\n  <p>Com esses dados, a investigação deixa de ser “portal não abre” e vira um conjunto de hipóteses testáveis.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em uma empresa com matriz, filiais, Wi-Fi corporativo, VPN, firewall e aplicações internas, uma falha parcial exige baseline por segmento. Latência normal da filial A pode ser diferente da matriz. DNS interno pode responder diferente para usuários remotos. Um firewall pode registrar tráfego aceito enquanto a aplicação retorna 500. Um proxy pode alterar comportamento HTTP sem afetar ping.</p>\n  <p>O troubleshooting empresarial precisa de inventário e baseline: topologia, VLANs, subnets, gateways, rotas, regras críticas, serviços dependentes, owner de aplicação, janela de mudança, contatos de fornecedores e criticidade de negócio.</p>\n  <div class=\"callout callout--info\"><strong>Boa prática:</strong> mantenha uma ficha por serviço crítico contendo URL, IPs esperados, portas, dependências, health checks, donos, logs relevantes, dashboards e procedimento de rollback.</div>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-em-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Na cloud, a coleta de evidências inclui dois mundos: <strong>plano de dados</strong> e <strong>plano de controle</strong>. O plano de dados mostra tráfego: flow logs, métricas de LB, NAT, firewall, DNS e aplicação. O plano de controle mostra mudanças: quem alterou security group, route table, private endpoint, policy, certificado, autoscaling ou Kubernetes ingress.</p>\n  <p>Um erro comum é olhar apenas conectividade e ignorar auditoria. Se um serviço parou às 02:13 e às 02:11 houve aplicação de Terraform alterando uma route table, esse evento não prova causa sozinho, mas entra fortemente na linha do tempo.</p>\n  <p>Também há baseline financeiro: aumento repentino de NAT Gateway, egress, logs ou inter-region traffic pode indicar bug, exfiltração, loop, rota errada ou mudança de arquitetura.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-em-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, evidência não nasce apenas em logs de produção. Ela também vem de repositórios, commits, pull requests, pipelines, artefatos, aprovações, scans, policy as code e histórico de deploy.</p>\n  <p>Um bom pipeline ajuda o troubleshooting quando registra: versão aplicada, autor, commit, hash do artefato, mudanças de IaC, diff de política, ambiente, horário, resultado de testes e rollback disponível. Isso permite responder: “o que mudou?” com precisão.</p>\n  <p>Para segurança, isso também evita exceções invisíveis. Se alguém abriu <code>0.0.0.0/0</code> em porta administrativa para “testar”, o histórico deve mostrar quem fez, por quê, quando expira e qual controle compensatório existe.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-em-segurança\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Em segurança, evidências precisam ser preservadas com cuidado. Durante um incidente, reiniciar serviços, limpar logs, alterar regras amplas ou executar comandos invasivos pode destruir rastros importantes.</p>\n  <p>Falhas de rede também podem ser sintomas de ataque: varredura causando saturação, C2 usando DNS, exfiltração gerando egress anômalo, MITM alterando certificados, rogue DHCP, alteração indevida de rota ou firewall, conta comprometida mudando security group.</p>\n  <p>A coleta defensiva deve incluir horário preciso, origem, destino, porta, ação, usuário, identidade cloud, recurso afetado, regra acionada, volume, hash quando aplicável e cópia segura dos artefatos relevantes.</p>\n  <div class=\"callout callout--warning\"><strong>Más práticas:</strong> apagar logs para “liberar espaço”, coletar evidências só por print, não registrar fuso horário, misturar arquivos sem nome padronizado e deixar artefatos sensíveis em local público.</div>\n\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama mostra como evidências de cliente, rede, cloud, aplicação, DevSecOps e segurança convergem para baseline e linha do tempo.</p>\n  <div class=\"diagram-container\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"diag1502title diag1502desc\">\n      <title id=\"diag1502title\">Coleta de evidências, baseline e linha do tempo</title>\n      <desc id=\"diag1502desc\">Fontes de evidência alimentam um funil de correlação que produz hipóteses, timeline e RCA.</desc>\n      <defs>\n        <marker id=\"arrow1502\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n      <text x=\"115\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n      <text x=\"115\" y=\"94\" text-anchor=\"middle\" class=\"svg-small\">erro, IP, DNS, proxy</text>\n      <rect x=\"30\" y=\"150\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--network\" />\n      <text x=\"115\" y=\"182\" text-anchor=\"middle\" class=\"svg-label\">Rede</text>\n      <text x=\"115\" y=\"204\" text-anchor=\"middle\" class=\"svg-small\">rota, firewall, flow</text>\n      <rect x=\"30\" y=\"260\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n      <text x=\"115\" y=\"292\" text-anchor=\"middle\" class=\"svg-label\">Cloud</text>\n      <text x=\"115\" y=\"314\" text-anchor=\"middle\" class=\"svg-small\">API, LB, NAT, logs</text>\n      <rect x=\"30\" y=\"370\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n      <text x=\"115\" y=\"402\" text-anchor=\"middle\" class=\"svg-label\">Segurança</text>\n      <text x=\"115\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">SIEM, WAF, EDR</text>\n      <rect x=\"285\" y=\"95\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--process\" />\n      <text x=\"375\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Baseline</text>\n      <text x=\"375\" y=\"154\" text-anchor=\"middle\" class=\"svg-small\">estado normal</text>\n      <rect x=\"285\" y=\"250\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--process\" />\n      <text x=\"375\" y=\"285\" text-anchor=\"middle\" class=\"svg-label\">Evidências</text>\n      <text x=\"375\" y=\"309\" text-anchor=\"middle\" class=\"svg-small\">fonte + horário + escopo</text>\n      <rect x=\"555\" y=\"95\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--timeline\" />\n      <text x=\"645\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">Linha do tempo</text>\n      <text x=\"645\" y=\"154\" text-anchor=\"middle\" class=\"svg-small\">eventos ordenados</text>\n      <rect x=\"555\" y=\"250\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--hypothesis\" />\n      <text x=\"645\" y=\"285\" text-anchor=\"middle\" class=\"svg-label\">Hipóteses</text>\n      <text x=\"645\" y=\"309\" text-anchor=\"middle\" class=\"svg-small\">confirmar ou negar</text>\n      <rect x=\"805\" y=\"170\" width=\"145\" height=\"100\" rx=\"14\" class=\"svg-node svg-node--outcome\" />\n      <text x=\"877\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">RCA</text>\n      <text x=\"877\" y=\"229\" text-anchor=\"middle\" class=\"svg-small\">causa + prevenção</text>\n      <line x1=\"200\" y1=\"75\" x2=\"285\" y2=\"135\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"200\" y1=\"185\" x2=\"285\" y2=\"285\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"200\" y1=\"295\" x2=\"285\" y2=\"295\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"200\" y1=\"405\" x2=\"285\" y2=\"305\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"465\" y1=\"140\" x2=\"555\" y2=\"140\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"465\" y1=\"295\" x2=\"555\" y2=\"295\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"645\" y1=\"185\" x2=\"645\" y2=\"250\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"735\" y1=\"140\" x2=\"805\" y2=\"205\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <line x1=\"735\" y1=\"295\" x2=\"805\" y2=\"235\" class=\"svg-link\" marker-end=\"url(#arrow1502)\" />\n      <circle cx=\"645\" cy=\"220\" r=\"18\" class=\"svg-pulse\" />\n      <text x=\"645\" y=\"226\" text-anchor=\"middle\" class=\"svg-small\">?</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratório\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula é documental e operacional. Você vai montar um pacote de evidências para um incidente simulado, sem alterar produção. O objetivo é treinar coleta limpa, linha do tempo, baseline e matriz de hipóteses.</p>\n\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Incidente depois de janela de mudança com relógios e logs inconsistentes. <strong>Causa provável a ser comprovada ou descartada:</strong> Ausência de baseline, relógios desalinhados e coleta de evidências sem cadeia mínima de preservação.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercícios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios reforçam a diferença entre dado bruto, evidência útil, baseline e conclusão. Responda como se estivesse documentando para outro analista continuar a investigação.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio é montar um dossiê de evidências para uma lentidão intermitente, distinguindo causa provável de coincidências e preservando informações suficientes para RCA.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solução-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada mostra como organizar artefatos, normalizar horários, comparar com baseline e transformar observações soltas em uma timeline defensável.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Nesta aula, você aprendeu que evidência sem contexto pode enganar. Uma coleta profissional registra fonte, horário, fuso, origem, escopo, hipótese associada e comparação com baseline.</p>\n  <p>Os principais aprendizados foram:</p>\n  <ul>\n    <li>baseline define o que é normal;</li>\n    <li>linha do tempo conecta sintoma, mudança, alerta e mitigação;</li>\n    <li>logs, métricas, flow logs e auditoria respondem perguntas diferentes;</li>\n    <li>horários precisam ser normalizados;</li>\n    <li>prints sem contexto são evidências fracas;</li>\n    <li>cada evidência deve confirmar, negar ou refinar uma hipótese;</li>\n    <li>segurança exige preservação cuidadosa de artefatos;</li>\n    <li>bons registros aceleram RCA e reduzem recorrência.</li>\n  </ul>\n\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Ausência de baseline, relógios desalinhados e coleta de evidências sem cadeia mínima de preservação..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--próximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, <strong>15.3 — Troubleshooting físico, LAN, VLAN e camada 2</strong>, você vai aplicar essa mentalidade nas camadas mais próximas do enlace: cabo, porta, duplex, VLAN, MAC address table, ARP, loops, STP e sintomas típicos de rede local.</p>\n\n</section>"
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
      "IPsec",
      "SNMP",
      "Syslog",
      "NetFlow",
      "IPFIX"
    ],
    "dependsOn": [
      "troubleshooting profissional",
      "logs",
      "métricas",
      "observabilidade",
      "DNS",
      "rotas",
      "firewall",
      "cloud audit logs",
      "SIEM"
    ],
    "enables": [
      "troubleshooting LAN",
      "troubleshooting IPv4",
      "troubleshooting DNS",
      "troubleshooting TCP/UDP",
      "war room",
      "RCA",
      "análise de pacotes"
    ]
  },
  "lab": {
    "id": "lab-15.2",
    "title": "Caso guiado: Incidente depois de janela de mudança com relógios e logs inconsistentes",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "O serviço começou a falhar “por volta das 10h”, mas firewall, proxy, aplicação e cloud registram horários divergentes. Impacto: A investigação perde tempo discutindo quem causou o problema porque a timeline não é confiável. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Chamado → baseline → logs por camada → auditoria de mudança → timeline única → hipótese priorizada",
    "architecture": "Arquitetura investigada: Chamado → baseline → logs por camada → auditoria de mudança → timeline única → hipótese priorizada. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
    "estimatedTimeMinutes": "150-210 min",
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
        "title": "Padronizar horário",
        "instruction": "Escolha UTC ou fuso oficial, registre fonte de tempo e offsets conhecidos.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Padrão temporal documentado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Listar fontes de evidência",
        "instruction": "Inclua chamados, logs de firewall, LB, aplicação, cloud audit, pipeline, DNS e métricas.",
        "command": "w32tm /query /status; Get-Date; Test-NetConnection api.empresa.local -Port 443",
        "expectedOutput": "Catálogo de fontes com dono e retenção.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Coletar baseline",
        "instruction": "Registre comportamento normal: latência, taxa de erro, rotas, DNS, regras e health checks.",
        "command": "timedatectl; journalctl --since \"2026-06-28 09:45\" --until \"2026-06-28 10:30\"; curl -w \"%{time_connect} %{time_starttransfer}\n\" -o /dev/null -s https://api.empresa.local/health",
        "expectedOutput": "Baseline mínimo para comparação.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Montar timeline bruta",
        "instruction": "Adicione eventos sem ainda concluir causalidade.",
        "command": "Consultar audit logs, flow logs, WAF/LB logs e eventos de pipeline no mesmo fuso horário",
        "expectedOutput": "Timeline inicial com fonte e confiança.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Classificar confiabilidade",
        "instruction": "Marque cada evidência como direta, indireta, testemunhal ou inferida.",
        "command": "Consultar audit logs, flow logs, WAF/LB logs e eventos de pipeline no mesmo fuso horário",
        "expectedOutput": "Tabela de confiabilidade.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Correlacionar mudanças",
        "instruction": "Compare início dos sintomas com deploys, regras, rotas, certificados, DNS e capacidade.",
        "command": "Consultar audit logs, flow logs, WAF/LB logs e eventos de pipeline no mesmo fuso horário",
        "expectedOutput": "Lista de mudanças correlacionadas.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Identificar lacunas",
        "instruction": "Declare quais evidências faltam e qual risco isso cria para o RCA.",
        "command": "Consultar audit logs, flow logs, WAF/LB logs e eventos de pipeline no mesmo fuso horário",
        "expectedOutput": "Lacunas explícitas.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Gerar pacote de evidências",
        "instruction": "Organize prints, comandos, logs e timeline em dossiê reproduzível.",
        "command": "Consultar audit logs, flow logs, WAF/LB logs e eventos de pipeline no mesmo fuso horário",
        "expectedOutput": "Dossiê de incidente pronto para revisão.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Timeline normalizada",
        "command": "Revisar timestamps",
        "expected": "Todos os eventos usam padrão temporal único e citam fonte.",
        "ifFails": "Converter horários e registrar offsets."
      },
      {
        "check": "Baseline comparável",
        "command": "Comparar antes/depois",
        "expected": "Há métrica ou configuração anterior para comparar com o estado atual.",
        "ifFails": "Criar baseline mínimo retrospectivo com dados disponíveis."
      },
      {
        "check": "Evidência classificada",
        "command": "Auditar dossiê",
        "expected": "Cada item indica fonte, confiabilidade e interpretação.",
        "ifFails": "Adicionar metadados antes de concluir causa."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Eventos parecem fora de ordem",
        "probableCause": "Fusos diferentes ou relógios desalinhados",
        "howToConfirm": "Verifique NTP e formato dos timestamps",
        "fix": "Normalize para UTC e registre offset."
      },
      {
        "symptom": "Não existe baseline",
        "probableCause": "Ambiente não media o estado normal",
        "howToConfirm": "Procure dados históricos em monitoramento, backups de configuração e tickets",
        "fix": "Crie baseline mínimo e registre limitação no RCA."
      },
      {
        "symptom": "Logs já expiraram",
        "probableCause": "Retenção insuficiente",
        "howToConfirm": "Verifique SIEM, backups e snapshots",
        "fix": "Registrar ação preventiva de retenção adequada."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "Fonte de horário",
      "Baseline antes/depois",
      "Timeline normalizada",
      "Lista de mudanças",
      "Logs por camada",
      "Classificação de confiabilidade",
      "Lacunas"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Construa uma timeline única para um incidente com cinco fontes de log em fusos diferentes e identifique qual mudança merece investigação primeiro.",
    "solution": "A solução correta não escolhe a primeira mudança por preferência. Ela normaliza horário, classifica evidências, compara baseline e escolhe a hipótese que melhor explica início, escopo e sintomas."
  },
  "exercises": [
    {
      "id": "ex15.2.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Incidente depois de janela de mudança com relógios e logs inconsistentes”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.2.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.2.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.2.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Incidente depois de janela de mudança com relógios e logs inconsistentes”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.2.p1.2",
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
      "id": "q15.2.p1.3",
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
      "id": "q15.2.p1.4",
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
      "question": "Qual item melhor define baseline?",
      "options": [
        "O estado normal conhecido usado para comparação",
        "Qualquer log coletado durante incidente",
        "Uma hipótese ainda não testada",
        "Uma regra temporária de firewall"
      ],
      "correctAnswer": 0,
      "explanation": "Baseline é a referência de normalidade contra a qual o comportamento atual é comparado."
    },
    {
      "question": "Qual evidência é mais fraca isoladamente?",
      "options": [
        "Log correlacionado com horário, origem e destino",
        "Print de erro sem horário, URL ou usuário",
        "Evento de auditoria com autor e timestamp",
        "Métrica de LB durante a janela do incidente"
      ],
      "correctAnswer": 1,
      "explanation": "Print sem contexto é fraco porque não permite correlação confiável."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.2.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.2.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.2.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.2.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.2.p1.5",
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
      "question": "Qual parte do caso “Incidente depois de janela de mudança com relógios e logs inconsistentes” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — Incidente depois de janela de mudança com relógios e logs inconsistentes",
    "scenario": "O serviço começou a falhar “por volta das 10h”, mas firewall, proxy, aplicação e cloud registram horários divergentes.",
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
    "reasoning": "A solução correta não escolhe a primeira mudança por preferência. Ela normaliza horário, classifica evidências, compara baseline e escolhe a hipótese que melhor explica início, escopo e sintomas.",
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
    "finalAnswer": "A resposta correta para “Incidente depois de janela de mudança com relógios e logs inconsistentes” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Evidência",
      "shortDefinition": "Dado contextualizado de investigação.",
      "longDefinition": "Informação observável com fonte, horário, escopo e relação com hipótese, usada para confirmar, negar ou refinar conclusões.",
      "example": "Flow log mostrando rejeição TCP 443 da subnet da filial para o load balancer durante a janela do incidente.",
      "relatedTerms": [
        "hipótese",
        "baseline",
        "timeline"
      ],
      "relatedLessons": [
        "15.2"
      ]
    },
    {
      "term": "Baseline",
      "shortDefinition": "Estado normal conhecido.",
      "longDefinition": "Referência técnica, operacional ou financeira que descreve comportamento esperado para comparação durante incidentes.",
      "example": "Latência p95 normal de 80 ms da filial para o portal financeiro.",
      "relatedTerms": [
        "métrica",
        "SLO"
      ],
      "relatedLessons": [
        "15.2",
        "14.12"
      ]
    },
    {
      "term": "Timeline",
      "shortDefinition": "Linha do tempo do incidente.",
      "longDefinition": "Sequência ordenada de relatos, alertas, logs, mudanças, testes, mitigações e recuperação, com fontes e horários normalizados.",
      "example": "13:55 mudança de rota VPN; 14:12 aumento de p95; 14:20 primeiro chamado da filial.",
      "relatedTerms": [
        "RCA",
        "auditoria"
      ],
      "relatedLessons": [
        "15.2",
        "15.12"
      ]
    },
    {
      "term": "Plano de dados",
      "shortDefinition": "Caminho do tráfego real.",
      "longDefinition": "Parte da infraestrutura por onde pacotes, conexões e requisições efetivamente passam.",
      "example": "Fluxo TCP entre cliente da filial e load balancer.",
      "relatedTerms": [
        "flow logs",
        "firewall"
      ],
      "relatedLessons": [
        "14.12",
        "15.2"
      ]
    },
    {
      "term": "Plano de controle",
      "shortDefinition": "Camada de configuração e APIs.",
      "longDefinition": "Sistema que cria, altera e governa recursos, políticas, rotas, identidades e configurações.",
      "example": "Evento de auditoria indicando alteração de route table via pipeline de IaC.",
      "relatedTerms": [
        "auditoria",
        "IaC"
      ],
      "relatedLessons": [
        "14.12",
        "15.2"
      ]
    },
    {
      "term": "Lacuna de observabilidade",
      "shortDefinition": "Evidência necessária indisponível.",
      "longDefinition": "Ausência de log, métrica, retenção, tag, dashboard ou correlação necessária para investigar com confiança.",
      "example": "Não há logs de DNS por origem, impedindo comparar matriz e filial.",
      "relatedTerms": [
        "observabilidade",
        "SIEM"
      ],
      "relatedLessons": [
        "14.12",
        "15.2"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Incidente depois de janela de mudança com relógios e logs inconsistentes”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.2"
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
        "15.2"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de explicar causa, fatores contribuintes, impacto, detecção, resposta e ações preventivas após um incidente.",
      "example": "Uma RCA madura não culpa pessoas; ela melhora processo, monitoramento, automação e validação.",
      "relatedTerms": [
        "postmortem",
        "runbook",
        "ação preventiva"
      ],
      "relatedLessons": [
        "15.12"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "SP 800-61 Rev. 3: Incident Response Recommendations and Considerations for Cybersecurity Risk Management",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "note": "Referência para resposta a incidentes conectada a gestão de risco, detecção, resposta e recuperação."
    },
    {
      "type": "official-doc",
      "title": "SP 800-92: Guide to Computer Security Log Management",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/92/final",
      "note": "Referência para práticas de gestão de logs de segurança em ambiente corporativo."
    },
    {
      "type": "rfc",
      "title": "RFC 3339: Date and Time on the Internet: Timestamps",
      "organization": "IETF",
      "url": "https://datatracker.ietf.org/doc/html/rfc3339",
      "note": "Define perfil de timestamps usado em protocolos de internet, útil para padronização temporal de evidências."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 14.12 — Observabilidade e troubleshooting",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m14/lesson-14-12",
      "note": "A aula anterior de Cloud Networking aprofunda flow logs, métricas e auditoria."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Coleta de evidências, baseline e linha do tempo\".",
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
        "description": "No caso “Incidente depois de janela de mudança com relógios e logs inconsistentes”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Coleta de evidências, baseline e linha do tempo",
              "description": "Em Coleta de evidências, baseline e linha do tempo, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.2."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O serviço começou a falhar “por volta das 10h”, mas firewall, proxy, aplicação e cloud registram horários divergentes.",
      "Impacto: A investigação perde tempo discutindo quem causou o problema porque a timeline não é confiável.",
      "Causa provável a validar: Ausência de baseline, relógios desalinhados e coleta de evidências sem cadeia mínima de preservação.",
      "Falha ou comportamento inesperado relacionado a Coleta de evidências, baseline e linha do tempo.",
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
      "Qual evidência comprova o entendimento da aula 15.2?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "w32tm /query /status; Get-Date; Test-NetConnection api.empresa.local -Port 443",
        "purpose": "Validar horário local e teste controlado no cliente.",
        "expectedObservation": "Fonte de tempo, offset aproximado e conectividade atual.",
        "interpretation": "Offset alto reduz confiabilidade da timeline do cliente."
      },
      {
        "platform": "Linux",
        "command": "timedatectl; journalctl --since \"2026-06-28 09:45\" --until \"2026-06-28 10:30\"; curl -w \"%{time_connect} %{time_starttransfer}\n\" -o /dev/null -s https://api.empresa.local/health",
        "purpose": "Coletar horário, logs e tempos de conexão/resposta.",
        "expectedObservation": "NTP ativo, eventos ordenados e tempos de rede/aplicação.",
        "interpretation": "Permite distinguir latência de conexão, TLS e resposta do backend."
      },
      {
        "platform": "Cloud/SIEM",
        "command": "Consultar audit logs, flow logs, WAF/LB logs e eventos de pipeline no mesmo fuso horário",
        "purpose": "Normalizar evidências distribuídas.",
        "expectedObservation": "Eventos alinhados em UTC ou fuso único.",
        "interpretation": "Sem normalização, a causa aparente pode ser apenas erro de relógio."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Mudança de rota” está com prioridade Alta e a evidência necessária é “route table/audit log/flow log”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Deploy de aplicação” está com prioridade Média e a evidência necessária é “APM/log app”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Relógio divergente” está com prioridade Alta e a evidência necessária é “NTP/offset/timestamp source”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Capacidade” está com prioridade Média e a evidência necessária é “métricas de CPU/conexões”",
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
      "15.3"
    ]
  },
  "diagnosticCase": {
    "title": "Incidente depois de janela de mudança com relógios e logs inconsistentes",
    "symptom": "O serviço começou a falhar “por volta das 10h”, mas firewall, proxy, aplicação e cloud registram horários divergentes.",
    "businessImpact": "A investigação perde tempo discutindo quem causou o problema porque a timeline não é confiável.",
    "likelyRootCause": "Ausência de baseline, relógios desalinhados e coleta de evidências sem cadeia mínima de preservação.",
    "timeline": [
      "09:50: deploy de pipeline",
      "10:02: alteração de rota",
      "10:07: aumento de 5xx",
      "10:10: primeiro chamado",
      "10:18: rollback parcial"
    ],
    "expectedFlow": "Chamado → baseline → logs por camada → auditoria de mudança → timeline única → hipótese priorizada",
    "hypothesisMatrix": [
      {
        "hypothesis": "Mudança de rota",
        "why": "Aumento de falhas após alteração",
        "evidence": "route table/audit log/flow log",
        "priority": "Alta"
      },
      {
        "hypothesis": "Deploy de aplicação",
        "why": "5xx no backend sem falha de rede",
        "evidence": "APM/log app",
        "priority": "Média"
      },
      {
        "hypothesis": "Relógio divergente",
        "why": "Eventos fora de ordem",
        "evidence": "NTP/offset/timestamp source",
        "priority": "Alta"
      },
      {
        "hypothesis": "Capacidade",
        "why": "Latência e filas aumentaram",
        "evidence": "métricas de CPU/conexões",
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
