export const lesson1707 = {
  "id": "17.7",
  "moduleId": "m17",
  "order": 7,
  "title": "Estudo de caso I: incidente em aplicação web publicada",
  "subtitle": "Caso corporativo completo para investigar falha em aplicação web publicada usando DNS, TLS, WAF, Load Balancer, Ingress, logs, cloud audit e RCA.",
  "duration": "240-360 min",
  "estimatedStudyTimeMinutes": 360,
  "difficulty": "avançado",
  "type": "estudo-de-caso",
  "xp": 360,
  "tags": [
    "estudo de caso",
    "incidente web",
    "HTTP",
    "HTTPS",
    "TLS",
    "WAF",
    "Load Balancer",
    "Ingress",
    "DNS",
    "cloud audit",
    "SIEM",
    "RCA",
    "troubleshooting",
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
      "lesson": "17.6",
      "reason": "O Simulado IV consolidou wireless, segurança, cloud e troubleshooting antes dos estudos de caso."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking é base para Load Balancer, Private Endpoint, DNS privado, security groups e logs."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting profissional, linha do tempo, evidências, PCAP e RCA são usados no caso."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "A análise defensiva de WAF, SIEM, anomalias e resposta proporcional depende do módulo de segurança."
    }
  ],
  "objectives": [
    "Resolver um incidente web publicado usando método de troubleshooting profissional.",
    "Mapear a cadeia DNS, TLS, WAF, Load Balancer, Ingress, backend e dependências.",
    "Diferenciar sintomas HTTP de causas de rede, segurança, aplicação e cloud.",
    "Construir uma matriz hipótese-evidência para erro 403, 502, 503, 504 e falhas TLS.",
    "Definir mitigação mínima, rollback, comunicação e RCA sem enfraquecer controles.",
    "Transformar o estudo de caso em peça de portfólio técnico."
  ],
  "learningOutcomes": [
    "Desenhar o fluxo efetivo de uma aplicação web publicada em ambiente cloud.",
    "Interpretar logs de WAF, Load Balancer, Ingress, aplicação, DNS e cloud audit.",
    "Identificar quando um health check superficial mascara falha real de usuário.",
    "Avaliar mudanças recentes de certificado, WAF, security group e pipeline.",
    "Propor contenção proporcional com segurança, observabilidade e rollback.",
    "Escrever RCA técnico e executivo para incidente web."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Até aqui, você revisou fundamentos e fez simulados por blocos. Agora o curso muda de formato: em vez de perguntas isoladas, você receberá um incidente corporativo com sintomas incompletos, equipes pressionadas, logs espalhados e hipóteses concorrentes. Esse é o tipo de situação que separa quem sabe comandos de quem sabe investigar redes em produção.</p>\n  <p>Uma aplicação web publicada parece simples para o usuário: ele digita uma URL e espera uma página. Internamente, porém, o fluxo passa por DNS público, CDN ou WAF, Load Balancer, TLS, proxy reverso, rotas, firewalls, security groups, containers, backends, banco de dados, logs e observabilidade. Qualquer elo pode falhar, degradar, bloquear ou mascarar o problema.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> incidente web publicado não se resolve culpando “a aplicação” ou “a rede”. Resolve-se mapeando o fluxo real, testando hipóteses com evidências e aplicando mitigação mínima, reversível e comunicada.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>Aplicações web começaram como páginas simples servidas diretamente por um servidor. Com o crescimento da internet corporativa, surgiram balanceadores, proxies reversos, certificados TLS, firewalls de aplicação, CDNs, APIs, microserviços, containers, Kubernetes e serviços gerenciados. A publicação deixou de ser apenas abrir a porta 80 ou 443.</p>\n  <p>Ao mesmo tempo, incidentes web passaram a envolver mais camadas. Um erro 502 pode vir de backend indisponível, health check errado, timeout, TLS quebrado entre camadas, rota ausente, security group bloqueando, WAF rejeitando uma requisição legítima ou deployment mal sucedido. Um erro 403 pode ser política, autenticação, WAF, geoblock, IP reputation ou regra de proxy. Um certificado inválido pode ser SAN ausente, cadeia incompleta, SNI errado, rotação mal feita ou trust store desatualizada.</p>\n  <p>Por isso, o profissional moderno precisa conhecer rede, segurança, cloud, DevSecOps e observabilidade. O estudo de caso desta aula simula exatamente essa realidade.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema apresentado é um incidente em uma aplicação web publicada para usuários externos e internos. Parte dos usuários relata erro intermitente. O time de aplicação afirma que o serviço está saudável. O time de rede vê conexões chegando ao Load Balancer. O SOC observou aumento de bloqueios no WAF. O time de cloud nota mudança recente em security group e o pipeline de DevSecOps fez um deploy de configuração do Ingress.</p>\n  <p>O desafio é não cair em conclusões prematuras. Quando várias equipes têm uma evidência parcial, cada uma tende a defender sua camada. O trabalho profissional é unir essas evidências em uma linha do tempo única e identificar o ponto em que o fluxo esperado diverge do fluxo observado.</p>\n  <ul><li><strong>Sintoma principal:</strong> usuários externos recebem 502/504 intermitente ao acessar <code>app.empresa.exemplo</code>.</li><li><strong>Sintoma secundário:</strong> alguns usuários internos recebem 403 em chamadas específicas da API.</li><li><strong>Mudanças recentes:</strong> rotação de certificado, ajuste de WAF, mudança de health check e alteração de security group.</li><li><strong>Risco:</strong> ampliar liberação em produção pode mascarar o problema e reduzir segurança.</li></ul>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>Este estudo de caso evolui em quatro movimentos. Primeiro, você desenha o caminho esperado: DNS, CDN/WAF, Load Balancer, TLS, proxy/Ingress, serviço, backend e banco. Segundo, você coleta evidências por camada: resposta DNS, handshake TCP, certificado, status HTTP, logs do WAF, health checks, logs do Load Balancer, logs do Ingress, métricas de aplicação e auditoria de mudanças.</p>\n  <p>Terceiro, você testa hipóteses concorrentes: erro de DNS, certificado, WAF, rota, firewall, health check, backend, timeout, deploy ou autenticação. Quarto, você propõe mitigação controlada, rollback, comunicação e RCA. A aula não ensina exploração ofensiva; ela ensina investigação defensiva e operacional.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>Um incidente em aplicação web publicada é uma falha percebida no serviço exposto, mas a causa pode estar em qualquer dependência do caminho. O conceito central é <strong>fluxo web observável</strong>: cada etapa do caminho precisa ter objetivo, controle e evidência.</p>\n  <p>Para revisar o caso, use a pergunta: “o que deveria acontecer nesta etapa e qual evidência prova que aconteceu ou não aconteceu?” DNS deveria resolver para o endpoint correto. TCP deveria conectar. TLS deveria negociar com certificado válido e SNI correto. WAF deveria permitir requisições legítimas. Load Balancer deveria escolher alvo saudável. Ingress ou proxy reverso deveria rotear pelo Host header e path. Backend deveria responder no tempo esperado. Logs deveriam permitir reconstruir a jornada.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, o fluxo começa no cliente. O navegador resolve o nome, abre conexão TCP, negocia TLS, envia requisição HTTP com método, path, Host header, cookies, cabeçalhos e eventualmente corpo. Em seguida, a requisição atravessa controles como CDN, WAF, proxy, Load Balancer e Ingress. Cada camada pode encerrar TLS, reencriptar, repassar cabeçalhos, aplicar política, alterar timeouts ou bloquear.</p>\n  <p>No backend, a aplicação pode depender de banco, cache, fila, serviço de identidade, storage e APIs internas. Um timeout 504 no Load Balancer pode ser causado por backend lento, mas também por rota, política, DNS interno ou dependência downstream. Um 502 pode ocorrer quando o proxy não consegue falar corretamente com o backend. Um 403 pode ser decisão legítima de autorização, bloqueio WAF ou regra de API gateway.</p>\n  <p>O funcionamento interno, portanto, é uma cadeia. O profissional precisa identificar em qual elo o comportamento observado deixa de bater com o esperado.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura do caso possui usuários externos, DNS público, CDN/WAF, Load Balancer público, subnets privadas, Ingress, serviço Kubernetes, backends, banco gerenciado acessado por endpoint privado, logs centralizados e SIEM. Usuários internos chegam por rede corporativa e também consomem a aplicação por nome público, mas algumas chamadas resolvem serviços privados via split-horizon DNS.</p>\n  <p>A arquitetura também possui controles de segurança: TLS obrigatório, WAF em modo bloqueio, security groups restritivos, egress control, logs de auditoria, alertas de erro 5xx, trilha de mudanças em pipeline e segregação de ambientes. O caso exige olhar conectividade, segurança, aplicação e governança ao mesmo tempo.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Imagine um restaurante com pedido por aplicativo. O cliente reclama que o pedido falhou. A causa pode estar no aplicativo, internet do cliente, gateway de pagamento, cozinha, entregador, estoque ou regra antifraude. Se cada equipe olhar só seu pedaço, todas podem dizer “da minha parte está certo”.</p>\n  <p>Uma aplicação web publicada é igual. DNS é o endereço do restaurante. WAF é a segurança na entrada. Load Balancer é a recepção. Ingress é quem encaminha para a cozinha correta. Backend é a cozinha. Banco é o estoque. Logs são as câmeras e recibos. Troubleshooting profissional é reconstruir a jornada do pedido, não gritar com a primeira equipe disponível.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Exemplo simples: você acessa um site e recebe erro de certificado. Um iniciante pode dizer “o site está fora”. Um profissional testa DNS, verifica se o IP está correto, confere o certificado apresentado, observa SAN, validade, emissor, cadeia, SNI e se há proxy interceptando. A conclusão pode ser: o certificado do Load Balancer foi trocado, mas o listener de um domínio secundário ainda aponta para certificado antigo.</p>\n  <p>A solução não é reiniciar servidor. É corrigir a associação do certificado, validar TLS, testar pelo nome afetado, conferir logs e registrar a mudança.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, a aplicação de RH está publicada para empregados. Após uma mudança, parte dos usuários recebe 403 ao enviar anexos. O WAF registra bloqueios por regra de upload. O time de aplicação vê requisições ausentes no backend. O time de rede vê conexões aceitas no Load Balancer. O problema não é “rede fora”; é uma regra de WAF alterada que bloqueia um padrão legítimo.</p>\n  <p>A mitigação profissional pode ser criar exceção estreita para endpoint, método e tamanho esperados, com prazo, dono, evidência e revisão posterior. A correção definitiva pode envolver ajuste da aplicação, validação de payload e regra WAF mais precisa.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Na cloud, uma aplicação em Kubernetes é publicada por Ingress e Load Balancer. O banco gerenciado é acessado por endpoint privado. Após alteração de security group, o Ingress continua saudável, mas chamadas que dependem do banco começam a falhar. O Load Balancer mostra 200 para health check superficial, mas usuários recebem 504 em operações reais.</p>\n  <p>A investigação deve revisar health check, logs do Ingress, métricas de backend, security group do banco, DNS privado, endpoint privado, auditoria de mudança e tempo de resposta. O erro não aparece se o health check só testa <code>/health</code> sem validar dependências críticas.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, a publicação web deve ser tratada como código: DNS, certificado, WAF, Load Balancer, Ingress, security groups, health checks e alertas devem estar versionados e revisados. O pipeline deve executar validações antes e depois do deploy, como teste de DNS, TLS, status HTTP, headers, rota esperada, health check realista e checagem de política.</p>\n  <p>O caso mostra por que mudanças pequenas em YAML, Terraform ou regra WAF podem gerar incidente grande. O objetivo do pipeline não é apenas entregar rápido, mas entregar com guardrails, rollback, observabilidade e trilha de auditoria.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista de segurança, uma aplicação web publicada é uma superfície crítica. Ela precisa de TLS correto, WAF calibrado, headers seguros, exposição mínima, autenticação forte, logs, proteção contra abuso, segregação de backend e monitoramento de erro. Mas segurança mal calibrada também pode causar indisponibilidade.</p>\n  <p>O equilíbrio profissional é proteger sem cegar e sem quebrar. Se o WAF bloqueia tráfego legítimo, a solução não deve ser desligar o WAF inteiro; deve ser identificar regra, endpoint, evidência, falso positivo, exceção mínima, validade e melhoria definitiva.</p>\n\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama abaixo representa o fluxo do estudo de caso. Use-o como mapa para localizar onde cada evidência deve ser coletada.</p>\n  <div class=\"diagram-wrapper\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"title1707 desc1707\">\n      <title id=\"title1707\">Fluxo de incidente em aplicação web publicada</title>\n      <desc id=\"desc1707\">Usuários acessam DNS, WAF, Load Balancer, Ingress, serviços, banco privado, logs e SIEM.</desc>\n      <defs>\n        <marker id=\"arrow1707\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n        </marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"105\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Usuários</text>\n      <text x=\"105\" y=\"92\" text-anchor=\"middle\" class=\"svg-small\">externos/internos</text>\n\n      <rect x=\"220\" y=\"40\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"295\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n      <text x=\"295\" y=\"92\" text-anchor=\"middle\" class=\"svg-small\">público e privado</text>\n\n      <rect x=\"410\" y=\"40\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n      <text x=\"485\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">CDN / WAF</text>\n      <text x=\"485\" y=\"92\" text-anchor=\"middle\" class=\"svg-small\">política e logs</text>\n\n      <rect x=\"600\" y=\"40\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"675\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Load Balancer</text>\n      <text x=\"675\" y=\"92\" text-anchor=\"middle\" class=\"svg-small\">TLS / health</text>\n\n      <rect x=\"790\" y=\"40\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"865\" y=\"70\" text-anchor=\"middle\" class=\"svg-label\">Ingress</text>\n      <text x=\"865\" y=\"92\" text-anchor=\"middle\" class=\"svg-small\">host/path</text>\n\n      <rect x=\"250\" y=\"200\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"325\" y=\"230\" text-anchor=\"middle\" class=\"svg-label\">Serviço web</text>\n      <text x=\"325\" y=\"252\" text-anchor=\"middle\" class=\"svg-small\">pods/backends</text>\n\n      <rect x=\"470\" y=\"200\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node\"></rect>\n      <text x=\"545\" y=\"230\" text-anchor=\"middle\" class=\"svg-label\">Dependências</text>\n      <text x=\"545\" y=\"252\" text-anchor=\"middle\" class=\"svg-small\">API/cache/fila</text>\n\n      <rect x=\"690\" y=\"200\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--private\"></rect>\n      <text x=\"765\" y=\"230\" text-anchor=\"middle\" class=\"svg-label\">Banco privado</text>\n      <text x=\"765\" y=\"252\" text-anchor=\"middle\" class=\"svg-small\">endpoint privado</text>\n\n      <rect x=\"120\" y=\"360\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--evidence\"></rect>\n      <text x=\"205\" y=\"390\" text-anchor=\"middle\" class=\"svg-label\">Logs de acesso</text>\n      <text x=\"205\" y=\"412\" text-anchor=\"middle\" class=\"svg-small\">WAF/LB/Ingress</text>\n\n      <rect x=\"405\" y=\"360\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--evidence\"></rect>\n      <text x=\"490\" y=\"390\" text-anchor=\"middle\" class=\"svg-label\">Cloud audit</text>\n      <text x=\"490\" y=\"412\" text-anchor=\"middle\" class=\"svg-small\">mudanças recentes</text>\n\n      <rect x=\"690\" y=\"360\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--evidence\"></rect>\n      <text x=\"775\" y=\"390\" text-anchor=\"middle\" class=\"svg-label\">SIEM / RCA</text>\n      <text x=\"775\" y=\"412\" text-anchor=\"middle\" class=\"svg-small\">timeline única</text>\n\n      <path d=\"M180 75 H220\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M370 75 H410\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M560 75 H600\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M750 75 H790\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M865 110 C865 170 325 150 325 200\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M400 235 H470\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M620 235 H690\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M485 110 C485 235 205 270 205 360\" class=\"svg-line svg-line--dash\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M675 110 C675 245 490 265 490 360\" class=\"svg-line svg-line--dash\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M765 270 V360\" class=\"svg-line svg-line--dash\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M290 395 H405\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n      <path d=\"M575 395 H690\" class=\"svg-line\" marker-end=\"url(#arrow1707)\"></path>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um exercício de mesa, sem exploração ofensiva e sem necessidade de cloud real. Você criará um dossiê de investigação para um incidente web publicado, simulando evidências que uma equipe corporativa teria em WAF, Load Balancer, Ingress, aplicação, cloud audit e SIEM.</p>\n  <p>O objetivo é praticar método: mapear fluxo, listar hipóteses, associar evidências, decidir mitigação mínima, planejar rollback e escrever RCA.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam a leitura do caso e a tomada de decisão. Eles pedem que você diferencie 403, 502, 503, 504, falhas de TLS, problemas de DNS, bloqueios WAF, falhas de backend e mudanças de infraestrutura.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio é montar um relatório executivo e técnico para o incidente, com timeline única, causa provável, causa sistêmica, mitigação, rollback, evidências e ações preventivas.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra que a resposta mais madura não é escolher uma causa cedo demais, mas eliminar hipóteses com evidências. O caso possui sinais fortes de interação entre WAF, health check superficial e mudança recente de Ingress/security group.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Esta aula transforma o conhecimento acumulado em investigação de incidente realista. Uma aplicação web publicada é uma cadeia de DNS, TLS, WAF, Load Balancer, Ingress, backend, dependências, políticas e logs. O profissional precisa cruzar evidências, preservar segurança e comunicar decisões.</p>\n  <ul><li>Erro HTTP é sintoma, não causa raiz automática.</li><li>Logs isolados contam apenas parte da história.</li><li>Health check superficial pode mascarar dependência quebrada.</li><li>Mitigação deve ser mínima, reversível e documentada.</li><li>RCA deve separar causa técnica, causa sistêmica e prevenção.</li></ul>\n\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C05</td><td>HTTP, TLS, proxy, firewall, VPN e publicação segura</td><td>75%</td><td>90%</td><td>interpreta erros de aplicação/rede e propõe controles com rollback</td></tr><tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>17.8 — Estudo de caso II: rede corporativa híbrida</strong>, você resolverá um cenário mais amplo envolvendo matriz, filial, VPN, BGP, cloud, DNS privado, segmentação e troubleshooting entre ambientes.</p>\n\n</section>"
  },
  "diagramNotes": "O SVG apresenta o caminho da requisição e as principais fontes de evidência para investigação do incidente web publicado.",
  "lab": {
    "id": "lab-17.7",
    "title": "Laboratório — War room de aplicação web publicada",
    "labType": "cloud",
    "objective": "Construir um dossiê completo de investigação para uma aplicação web publicada com erros 403, 502 e 504 intermitentes. Ao final, produzir correção por competência, rubrica preenchida e plano de revisão baseado em evidências.",
    "scenario": "15. Laboratório O laboratório desta aula é um exercício de mesa, sem exploração ofensiva e sem necessidade de cloud real. Você criará um dossiê de investigação para um incidente web publicado, simulando evidências que uma equipe corporativa teria em WAF, Load Balancer, Ingress, aplicação, cloud audit e SIEM. O objetivo é praticar método: mapear fluxo, listar hipóteses, associar evidências, decidir mitigação mínima, planejar rollback e escrever RCA.",
    "topology": "Usuário externo -> DNS público -> CDN/WAF -> Load Balancer -> Ingress -> serviço Kubernetes -> dependências -> banco via endpoint privado -> logs/SIEM.",
    "architecture": "Ambiente cloud com subnets públicas e privadas, WAF em modo bloqueio, Load Balancer com TLS termination, Ingress com roteamento por host/path, backends privados, banco gerenciado com endpoint privado e logs centralizados.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 360,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir problem statement",
        "instruction": "Escreva o sintoma principal, população afetada, horário de início, impacto de negócio e serviços envolvidos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Problema descrito sem causa presumida e com critérios de impacto claros.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Desenhar fluxo esperado",
        "instruction": "Mapeie DNS, CDN/WAF, Load Balancer, TLS, Ingress, serviço, dependências, banco e logs.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Fluxo ponta a ponta com controles e evidências por etapa.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Normalizar linha do tempo",
        "instruction": "Crie timeline com deploy, rotação de certificado, mudança de WAF, alteração de security group, início dos erros e alertas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Linha do tempo única com timestamps normalizados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Analisar DNS e TLS",
        "instruction": "Valide resolução, TTL, CNAME, certificado apresentado, SAN, validade, cadeia, SNI e diferenças entre origem interna e externa.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Hipóteses de DNS/TLS confirmadas ou descartadas com evidência.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Analisar WAF e status HTTP",
        "instruction": "Compare requisições 403 com logs de regra WAF, path, método, origem, user agent e request ID.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Falsos positivos e bloqueios legítimos classificados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Analisar Load Balancer e health checks",
        "instruction": "Revise targets, backend status, códigos 5xx, latência, timeout, listener, certificado e regras de roteamento.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Diferença entre target saudável e jornada real do usuário documentada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Analisar Ingress e aplicação",
        "instruction": "Verifique host/path, service, endpoints, pods, logs de aplicação, erros downstream e mudança de manifesto.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Falhas de roteamento, backend ou dependência são avaliadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Analisar rede e segurança cloud",
        "instruction": "Revise security groups, NACL/NSG, rotas, endpoint privado, DNS privado, flow logs e cloud audit.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Bloqueios de rede ou mudanças recentes identificados sem liberar acesso amplo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Definir mitigação e rollback",
        "instruction": "Escolha a menor ação capaz de reduzir impacto: rollback de regra, ajuste de health check, exceção WAF estreita ou reversão de manifesto.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mitigação com dono, prazo, critério de sucesso e plano de retorno.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Escrever RCA e backlog",
        "instruction": "Documente causa técnica, causa sistêmica, evidências, lacunas de observabilidade, ação preventiva e reteste.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "RCA utilizável por rede, segurança, aplicação, cloud e gestão.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso I: incidente em aplicação web publicada” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Montar matriz de competências da aula",
        "instruction": "Crie uma tabela com as competências C05, C07, C08. Para cada uma, registre pontuação, confiança, evidência coletada e lacuna principal.",
        "command": "Tabela sugerida: Competência | Evidência | Pontuação | Confiança | Lacuna | Ação de revisão | Reteste",
        "expectedOutput": "Matriz preenchida com pelo menos uma evidência por competência avaliada.",
        "explanation": "A avaliação deixa de ser uma nota única e passa a mostrar exatamente onde o aluno domina ou precisa revisar."
      },
      {
        "number": 12,
        "title": "Classificar erros e hipóteses de aprendizagem",
        "instruction": "Para cada erro, classifique a causa usando a taxonomia E-CONCEITO, E-CAMADA, E-COMANDO, E-ARQUITETURA, E-SEGURANCA ou E-COMUNICACAO.",
        "command": "Erro | Resposta dada | Resposta correta | Causa | Competência | Aula de revisão | Evidência nova",
        "expectedOutput": "Lista de erros convertida em backlog de revisão objetivo.",
        "explanation": "Erro sem classificação vira repetição. Erro classificado vira plano de estudo e prática."
      },
      {
        "number": 13,
        "title": "Aplicar rubrica e decidir aprovação",
        "instruction": "Some os critérios da rubrica. A aprovação exige 75% geral e nenhuma competência crítica sem evidência mínima.",
        "command": "Pontuação final = soma dos critérios; decisão = aprovado, aprovado com ressalvas ou refazer competência crítica",
        "expectedOutput": "Rubrica preenchida, decisão explícita e justificativa técnica.",
        "explanation": "O aluno aprende a defender a própria conclusão, como aconteceria em revisão técnica, banca ou auditoria."
      },
      {
        "number": 14,
        "title": "Criar trilha de revisão e reteste",
        "instruction": "Para cada competência abaixo do mínimo, defina aula de revisão, mini laboratório, questão de reteste e prazo de nova tentativa.",
        "command": "Competência fraca | Aula de revisão | Mini lab | Reteste | Prazo | Evidência esperada",
        "expectedOutput": "Plano de revisão com ações executáveis em vez de releitura genérica.",
        "explanation": "A trilha de revisão transforma o M17 em sistema de fechamento do curso, não apenas em simulado final."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Estudo de caso I: incidente em aplicação web publicada”. O resultado final deve incluir matriz de competências, rubrica, feedback por tema, plano de revisão e evidências de reteste.",
    "validation": [
      {
        "check": "O aluno consegue defender a conclusão com evidências, sem abrir controles de forma ampla e sem culpar uma camada isoladamente.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O aluno consegue defender a conclusão com evidências, sem abrir controles de forma ampla e sem culpar uma camada isoladamente.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Matriz de competências preenchida",
        "command": "verificar tabela de competências",
        "expected": "C05, C07, C08 avaliadas com evidência",
        "ifFails": "volte ao simulado/lab e registre evidências por competência"
      },
      {
        "check": "Rubrica aplicada",
        "command": "somar critérios de avaliação",
        "expected": "75% mínimo geral e competências críticas acima do mínimo",
        "ifFails": "criar trilha de revisão antes de marcar a aula como concluída"
      },
      {
        "check": "Reteste planejado",
        "command": "verificar plano 24-48h",
        "expected": "cada lacuna crítica possui ação prática e prazo",
        "ifFails": "transforme lacunas genéricas em tarefas concretas"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se a causa parecer óbvia cedo demais, volte à matriz hipótese-evidência.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o WAF for suspeito, não desligue tudo: identifique regra, path, método, origem e falso positivo.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o backend parecer saudável, confirme se o health check representa a jornada real do usuário.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se a mudança recente não explica todos os sintomas, mantenha hipóteses paralelas abertas.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Criar testes sintéticos pós-deploy.",
      "Adicionar health check profundo por dependência crítica.",
      "Padronizar request ID entre WAF, LB, Ingress e aplicação.",
      "Criar política de exceções temporárias com expiração.",
      "Adicionar validação automática de TLS, DNS e WAF em pipeline.",
      "Adicionar pesos por competência conforme objetivo profissional do aluno.",
      "Repetir o bloco após uma semana para medir retenção real.",
      "Transformar evidências sanitizadas em portfólio técnico."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "matriz de competências preenchida",
      "rubrica com pontuação e justificativa",
      "lista de erros por taxonomia",
      "plano de revisão com mini laboratórios",
      "resultado do reteste ou critério de próxima tentativa"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Estudo de caso I: incidente em aplicação web publicada” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?",
      "Qual competência ficou mais fraca e qual evidência prova isso?",
      "Qual erro foi conceitual e qual erro foi falta de diagnóstico por evidência?",
      "O que você faria diferente em um ambiente corporativo real?",
      "Qual risco residual permanece mesmo após a correção?"
    ],
    "challenge": "Desafio — Relatório completo do incidente web Entregue também uma matriz de competências com feedback por tema, pontuação por rubrica e trilha de revisão baseada nos erros.",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns. Uma entrega madura não tenta esconder erro: ela mostra pontuação, lacuna, causa, evidência, revisão planejada e reteste. A aprovação só deve ser considerada confiável quando o aluno consegue explicar a resposta correta e demonstrá-la em laboratório ou cenário.",
    "expectedOutcome": "Dossiê completo de investigação, mitigação e RCA para incidente web publicado.",
    "evaluationMode": true,
    "competencyBased": true,
    "assessmentReference": "assessment-17.7"
  },
  "caseStudy": {
    "scenario": "A aplicação app.empresa.exemplo apresenta 502/504 intermitente para usuários externos e 403 em algumas chamadas internas. Mudanças recentes envolveram rotação de certificado, ajuste de WAF, alteração de health check e mudança de security group via IaC.",
    "artifacts": [
      "Timeline de mudanças",
      "Amostras de logs WAF",
      "Métricas do Load Balancer",
      "Logs de Ingress",
      "Cloud audit",
      "Flow logs",
      "Tickets de usuários",
      "Resultado de testes sintéticos"
    ],
    "expectedDeliverables": [
      "Mapa de fluxo",
      "Matriz hipótese-evidência",
      "Timeline única",
      "Plano de mitigação",
      "Plano de rollback",
      "RCA técnico e executivo",
      "Backlog preventivo"
    ]
  },
  "quiz": [
    {
      "question": "Usuários recebem 502 no navegador. Qual interpretação é mais correta?",
      "options": [
        "A causa é sempre DNS",
        "502 é sintoma de problema entre proxy/gateway e backend, exigindo logs e evidências da cadeia",
        "A solução é abrir todas as portas",
        "502 prova ataque confirmado"
      ],
      "answer": 1,
      "explanation": "502 indica que uma camada intermediária recebeu resposta inválida ou falhou ao falar com upstream; é preciso investigar proxy, LB, Ingress, backend, TLS, rota e logs."
    },
    {
      "question": "Um 403 após ajuste de WAF deve levar primeiro a qual ação?",
      "options": [
        "Desligar WAF inteiro",
        "Correlacionar request ID, regra acionada, path, método, origem e falso positivo antes de propor exceção mínima",
        "Reiniciar banco de dados",
        "Alterar TTL DNS para zero"
      ],
      "answer": 1,
      "explanation": "Bloqueios WAF devem ser analisados por regra e contexto. Exceções devem ser estreitas e temporárias."
    },
    {
      "question": "Por que health check superficial pode mascarar incidente?",
      "options": [
        "Porque ele pode testar apenas /health sem validar dependências reais da jornada do usuário",
        "Porque health check sempre derruba o serviço",
        "Porque DNS nunca afeta health check",
        "Porque TLS elimina todos os erros"
      ],
      "answer": 0,
      "explanation": "Um endpoint simples pode retornar 200 enquanto operações reais falham por banco, API downstream, autenticação ou política."
    },
    {
      "question": "Qual evidência ajuda a investigar falha TLS por domínio específico?",
      "options": [
        "Certificado apresentado, SAN, SNI, cadeia, validade e listener do Load Balancer",
        "Apenas uso de CPU do banco",
        "Somente tabela ARP do switch",
        "Apenas custo de storage"
      ],
      "answer": 0,
      "explanation": "Falhas TLS por nome dependem de SNI, certificado, cadeia e configuração do listener/proxy."
    },
    {
      "question": "Qual é a melhor mitigação para falso positivo WAF em endpoint crítico?",
      "options": [
        "Desabilitar WAF globalmente sem prazo",
        "Criar exceção mínima por regra/endpoint/método com dono, prazo, log e revisão",
        "Abrir security group para 0.0.0.0/0 em todas as portas",
        "Apagar logs para reduzir ruído"
      ],
      "answer": 1,
      "explanation": "A mitigação deve preservar segurança e reduzir impacto com escopo mínimo e controle de expiração."
    },
    {
      "question": "Cloud audit é útil porque mostra:",
      "options": [
        "Mudanças de configuração, autor, horário, recurso afetado e origem da alteração",
        "O conteúdo completo das senhas dos usuários",
        "A potência do sinal Wi-Fi",
        "A cor do certificado"
      ],
      "answer": 0,
      "explanation": "Auditoria cloud ajuda a relacionar mudança recente com início do incidente."
    }
  ],
  "exercises": [
    {
      "title": "Matriz de hipótese-evidência",
      "prompt": "Crie uma matriz com hipóteses para 403, 502, 504 e erro TLS, listando evidências necessárias para confirmar ou descartar cada uma.",
      "difficulty": "avançado",
      "expectedAnswer": "A matriz deve incluir WAF, LB, Ingress, backend, DNS, TLS, SG/NSG, rota, endpoint privado, aplicação e cloud audit."
    },
    {
      "title": "Timeline de mudança",
      "prompt": "Monte uma linha do tempo com deploy, alteração WAF, rotação TLS, mudança de SG e início dos sintomas.",
      "difficulty": "intermediário-avançado",
      "expectedAnswer": "A timeline deve normalizar horários e não presumir causalidade apenas por proximidade temporal."
    },
    {
      "title": "Mitigação segura",
      "prompt": "Proponha uma mitigação para 403 causado por WAF sem desligar o controle inteiro.",
      "difficulty": "avançado",
      "expectedAnswer": "Exceção estreita por regra, endpoint, método e condição, com dono, expiração, logging e revisão."
    },
    {
      "title": "RCA executivo",
      "prompt": "Escreva cinco linhas de RCA para diretoria explicando impacto, causa provável, mitigação, prevenção e risco residual.",
      "difficulty": "intermediário",
      "expectedAnswer": "Texto deve evitar jargão excessivo e mostrar ação preventiva concreta."
    },
    {
      "id": "ex17.7.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C05, C07, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "flashcards": [
    {
      "front": "502 significa o quê em estudo de caso web?",
      "back": "Sintoma de falha entre gateway/proxy e upstream; exige análise de LB, Ingress, backend, TLS, rota e logs."
    },
    {
      "front": "403 sempre é autenticação?",
      "back": "Não. Pode ser autorização, WAF, proxy, regra de API gateway, geoblock, IP reputation ou política."
    },
    {
      "front": "O que é health check superficial?",
      "back": "Teste que retorna sucesso sem validar dependências críticas da jornada real do usuário."
    },
    {
      "front": "Por que request ID é valioso?",
      "back": "Permite correlacionar a mesma requisição entre WAF, LB, Ingress, aplicação e SIEM."
    },
    {
      "front": "Qual é o risco de desligar WAF durante incidente?",
      "back": "Reduz proteção, mascara causa, aumenta superfície de ataque e pode criar risco maior que o incidente original."
    },
    {
      "front": "O que deve aparecer em uma RCA madura?",
      "back": "Causa técnica, causa sistêmica, evidências, impacto, mitigação, prevenção, dono e reteste."
    }
  ],
  "mentorQuestions": [
    "Em que momento você quase escolheu uma causa sem evidência suficiente?",
    "Qual fonte de log você mais negligenciaria em uma investigação real: WAF, LB, Ingress, aplicação ou cloud audit?",
    "Que teste sintético você criaria para detectar esse incidente antes dos usuários?"
  ],
  "challenge": {
    "title": "Desafio — Relatório completo do incidente web",
    "scenario": "A diretoria quer explicação em 30 minutos. O SOC quer saber se pode ser ataque. O time de aplicação quer rollback. O time de cloud vê mudança recente. Você deve liderar a análise sem causar nova indisponibilidade.",
    "tasks": [
      "Criar fluxo esperado",
      "Criar timeline única",
      "Listar hipóteses concorrentes",
      "Definir evidências por hipótese",
      "Selecionar mitigação mínima",
      "Escrever comunicado executivo",
      "Escrever RCA técnico preliminar",
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "successCriteria": [
      "Não culpar uma equipe sem evidência",
      "Não desligar controles inteiros sem justificativa",
      "Incluir rollback e critério de sucesso",
      "Diferenciar fato, hipótese e inferência",
      "Propor prevenção em pipeline e observabilidade",
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
        "criterion": "C05 — HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: interpreta erros de aplicação/rede e propõe controles com rollback."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
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
    "summary": "A melhor solução começa pela linha do tempo e pelo mapa de fluxo. O conjunto de evidências sugere investigar primeiro mudanças recentes em WAF, health check, Ingress e security group, mas sem descartar TLS, DNS e dependências. A mitigação deve ser estreita e reversível, e o RCA deve apontar falha sistêmica de validação pós-deploy e health check insuficiente.",
    "steps": [
      "Estabelecer problem statement",
      "Desenhar fluxo DNS-WAF-LB-Ingress-backend",
      "Correlacionar request ID e timestamps",
      "Analisar WAF para 403",
      "Analisar LB/Ingress para 502/504",
      "Validar certificado/SNI",
      "Conferir cloud audit e IaC",
      "Aplicar mitigação mínima",
      "Executar reteste sintético",
      "Registrar RCA e backlog preventivo",
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonMistakes": [
      "Tratar 502 como prova de aplicação fora",
      "Desligar WAF inteiro",
      "Confiar em health check superficial",
      "Ignorar mudança recente de IaC",
      "Não normalizar fuso horário",
      "Não comunicar risco residual"
    ],
    "reasoning": "A melhor solução começa pela linha do tempo e pelo mapa de fluxo. O conjunto de evidências sugere investigar primeiro mudanças recentes em WAF, health check, Ingress e security group, mas sem descartar TLS, DNS e dependências. A mitigação deve ser estreita e reversível, e o RCA deve apontar falha sistêmica de validação pós-deploy e health check insuficiente. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
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
      "term": "WAF",
      "definition": "Firewall de aplicação web que aplica regras sobre tráfego HTTP/HTTPS para reduzir riscos de exploração e abuso."
    },
    {
      "term": "502",
      "definition": "Status HTTP associado a gateway/proxy recebendo resposta inválida ou falhando ao comunicar com upstream."
    },
    {
      "term": "504",
      "definition": "Status HTTP associado a timeout em gateway/proxy ao esperar resposta de upstream."
    },
    {
      "term": "SNI",
      "definition": "Extensão TLS que permite ao cliente indicar o nome do servidor desejado durante o handshake."
    },
    {
      "term": "Request ID",
      "definition": "Identificador usado para correlacionar uma requisição entre múltiplas camadas de logs."
    },
    {
      "term": "Health check",
      "definition": "Teste usado por balanceadores ou orquestradores para avaliar se um alvo deve receber tráfego."
    }
  ],
  "references": [
    {
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
    },
    {
      "title": "NIST SP 800-44 Version 2 — Guidelines on Securing Public Web Servers",
      "url": "https://csrc.nist.gov/pubs/sp/800/44/ver2/final"
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/"
    },
    {
      "title": "OWASP WSTG — Testing for Weak Transport Layer Security",
      "url": "https://owasp.org/www-project-web-security-testing-guide/v42/4-Web_Application_Security_Testing/09-Testing_for_Weak_Cryptography/01-Testing_for_Weak_Transport_Layer_Security"
    },
    {
      "title": "RFC 9110 — HTTP Semantics",
      "url": "https://www.rfc-editor.org/rfc/rfc9110"
    },
    {
      "title": "RFC 8446 — TLS 1.3",
      "url": "https://www.rfc-editor.org/rfc/rfc8446"
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
              "name": "Risco de avaliação sem evidência — Estudo de caso I: incidente em aplicação web publicada",
              "description": "Em Estudo de caso I: incidente em aplicação web publicada, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.7."
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
      "Qual evidência comprova o entendimento da aula 17.7?"
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
      "17.8"
    ]
  },
  "assessmentBlueprint": {
    "id": "assessment-17.7",
    "title": "Avaliação por competência — Estudo de caso I: incidente em aplicação web publicada",
    "assessmentType": "estudo de caso avaliativo",
    "competencies": [
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
        "criterion": "C05 — HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: interpreta erros de aplicação/rede e propõe controles com rollback."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 20,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
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
        "competencyId": "C05",
        "competency": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M08, M09, M10 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para interpreta erros de aplicação/rede e propõe controles com rollback",
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
        "competencyId": "C05",
        "competency": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M08, M09, M10 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para interpreta erros de aplicação/rede e propõe controles com rollback",
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
