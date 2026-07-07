export const lesson1508 = {
  "id": "15.8",
  "moduleId": "m15",
  "order": 8,
  "title": "Troubleshooting HTTP, HTTPS, TLS e proxies",
  "subtitle": "Como diagnosticar falhas de aplicação web sem confundir DNS, TCP, TLS, proxy, WAF, load balancer, backend, certificado e código HTTP — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "210-270 min",
  "estimatedStudyTimeMinutes": 270,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 285,
  "tags": [
    "troubleshooting",
    "HTTP",
    "HTTPS",
    "TLS",
    "certificados",
    "SNI",
    "proxy",
    "proxy reverso",
    "WAF",
    "load balancer",
    "headers",
    "status codes",
    "timeout",
    "502",
    "503",
    "504",
    "DevSecOps",
    "observabilidade",
    "caso real",
    "hipótese-evidência",
    "runbook",
    "war room",
    "RCA"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.1",
      "reason": "Define método profissional, hipóteses, escopo, mitigação e RCA."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Ensina coleta de evidências, baseline e linha do tempo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.5",
      "reason": "HTTP/HTTPS começa com nome, resolução e cache DNS."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.6",
      "reason": "TLS e HTTP dependem de TCP, portas, sockets e serviços."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.6",
      "reason": "Load balancers, health checks, TLS e publicação de serviços são base para publicar aplicações web."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.7",
      "reason": "DNS público, DNS privado e split-horizon afetam diretamente HTTP e TLS."
    }
  ],
  "objectives": [
    "Diagnosticar falhas HTTP/HTTPS separando DNS, TCP, TLS, proxy, WAF, load balancer, backend e aplicação.",
    "Interpretar códigos 3xx, 4xx e 5xx como sinais técnicos, sem assumir que todo erro é rede.",
    "Validar certificado, cadeia, validade, CN/SAN, SNI, protocolo TLS, cipher suite e hostname.",
    "Diferenciar proxy direto, proxy reverso, túnel CONNECT, WAF, CDN e load balancer.",
    "Correlacionar logs de cliente, proxy, WAF, LB, backend, aplicação, DNS, TLS e SIEM.",
    "Propor correções seguras com rollback, testes sintéticos, health checks e prevenção em pipeline.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um erro 502, o aluno identifica hipóteses entre proxy/LB e backend, não apenas problema de internet.",
    "Dado um erro de certificado, o aluno diferencia expiração, cadeia incompleta, hostname inválido, SNI incorreto e trust store desatualizada.",
    "Dado um timeout em HTTPS, o aluno separa falha de DNS, TCP, firewall, proxy, TLS handshake, WAF ou aplicação lenta.",
    "Dado um ambiente com proxy corporativo, o aluno valida variável de proxy, regra PAC, CONNECT, inspeção TLS e bypass controlado.",
    "Dado um incidente web, o aluno produz linha do tempo com request ID, trace ID, IP original, headers, status code e logs correlacionados.",
    "Dado o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Depois que DNS resolve, TCP conecta e firewall permite, muita gente assume que o problema de rede acabou. Na prática corporativa, uma aplicação web moderna ainda passa por camadas que podem alterar completamente o comportamento observado: TLS, certificado, SNI, proxy corporativo, proxy reverso, WAF, CDN, load balancer, health check, service mesh, container, backend, aplicação, autenticação e cache.</p>\n  <p>A motivação desta aula é ensinar você a diagnosticar HTTP e HTTPS como uma cadeia de evidências. Quando alguém diz “o site está fora”, isso pode significar muitas coisas diferentes: nome não resolve, IP errado, TCP timeout, TLS handshake falhando, certificado inválido, proxy negando, WAF bloqueando, LB sem backend saudável, backend lento, redirect infinito, cookie incorreto, header ausente, autenticação falhando, API retornando 500 ou cliente usando proxy errado.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> erros web são visualmente parecidos para o usuário, mas tecnicamente muito diferentes. Um navegador pode mostrar “não foi possível acessar”, “conexão não segura”, “erro 502”, “erro 403” ou “timeout”, e cada mensagem aponta para uma parte distinta da cadeia DNS → TCP → TLS → HTTP → proxy/WAF/LB → backend → aplicação.</div>\n  <p>Esta aula é essencial para quem trabalha em Segurança, DevSecOps, cloud e operação. Ambientes modernos publicam aplicações por HTTPS, roteiam via proxies e load balancers, aplicam WAF, terminam TLS em diferentes pontos e dependem de logs distribuídos. Diagnosticar isso sem método leva a liberações inseguras, rollback incorreto, culpa indevida em firewall e perda de evidências para RCA.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>O HTTP nasceu como um protocolo simples de requisição e resposta para transferência de hipertexto. Com o crescimento da web, ele se tornou a camada comum para aplicações, APIs, autenticação, integrações B2B, consoles administrativos e serviços corporativos. O HTTPS adicionou TLS para proteger confidencialidade, integridade e autenticidade na comunicação entre cliente e servidor.</p>\n  <p>À medida que aplicações ficaram críticas, surgiram intermediários: proxies para controlar saída de usuários, reverse proxies para publicar aplicações internas, load balancers para distribuir tráfego, CDNs para aproximar conteúdo do usuário, WAFs para filtrar requisições maliciosas e gateways de API para autenticação, rate limit e observabilidade.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>HTTP simples:</strong> cliente envia requisição, servidor responde.</div><div class=\"timeline-item\"><strong>HTTPS:</strong> TLS protege a sessão e autentica o nome por certificado.</div><div class=\"timeline-item\"><strong>Proxy corporativo:</strong> tráfego de usuários passa por controle, cache, filtro e autenticação.</div><div class=\"timeline-item\"><strong>Reverse proxy/LB:</strong> uma entrada pública distribui requisições para backends privados.</div><div class=\"timeline-item\"><strong>WAF/CDN:</strong> proteção e otimização passam a ficar antes da aplicação.</div><div class=\"timeline-item\"><strong>Cloud/Kubernetes:</strong> Ingress, service mesh, certificados automatizados e observabilidade distribuída viram parte do caminho.</div></div>\n  <p>A evolução trouxe segurança e escala, mas também criou novos pontos de falha. Hoje, um erro HTTPS pode estar no certificado, no DNS split-horizon, no proxy, no SNI, na política de inspeção TLS, no WAF, no target group, no Ingress, no backend ou na aplicação. Por isso, troubleshooting web moderno precisa reconstruir o caminho completo.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema desta aula é diagnosticar falhas HTTP/HTTPS sem misturar sintomas de camadas diferentes. HTTP é aplicação, mas depende de DNS, IP, TCP, TLS, certificados, proxies, políticas, load balancers e backends. Quando uma dessas etapas falha, o usuário geralmente reporta apenas “o site não abre”.</p>\n  <p>Sintomas comuns:</p>\n  <ul>\n    <li><strong>Timeout:</strong> pode indicar rota, firewall, proxy, backend lento, LB sem resposta ou aplicação travada;</li>\n    <li><strong>Connection refused:</strong> TCP chegou ao destino, mas não havia serviço aceitando naquela porta ou houve rejeição ativa;</li>\n    <li><strong>Erro de certificado:</strong> pode envolver expiração, cadeia incompleta, hostname incorreto, SAN ausente, SNI errado ou CA não confiável;</li>\n    <li><strong>403:</strong> geralmente indica negação por aplicação, WAF, autorização, proxy ou política, não falha de conectividade;</li>\n    <li><strong>404:</strong> pode ser rota de aplicação, virtual host, path, Ingress ou backend incorreto;</li>\n    <li><strong>502:</strong> gateway/proxy recebeu resposta inválida ou não conseguiu falar corretamente com backend;</li>\n    <li><strong>503:</strong> serviço indisponível, backends unhealthy, overload, manutenção ou capacidade insuficiente;</li>\n    <li><strong>504:</strong> gateway/proxy/LB aguardou o backend por tempo demais;</li>\n    <li><strong>Redirect loop:</strong> regra de HTTP→HTTPS, proxy headers, aplicação ou cookie podem estar inconsistentes;</li>\n    <li><strong>Funciona fora da empresa, falha dentro:</strong> split DNS, proxy, inspeção TLS, rota interna ou política corporativa podem estar envolvidos.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha clássica:</strong> tratar todo 5xx como problema da aplicação ou todo timeout como problema de firewall. Em troubleshooting profissional, o código HTTP é uma evidência, não uma conclusão.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Erro TLS intermitente atrás de proxy e WAF com SNI diferente</h3>\n  <p><strong>Sintoma observado:</strong> Alguns clientes recebem erro de certificado, outros recebem 502 do proxy, e curl por IP funciona sem validar hostname.</p>\n  <p><strong>Impacto operacional:</strong> Há risco de desabilitar validação TLS para “resolver”, criando vulnerabilidade grave.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente → DNS → TCP 443 → TLS/SNI → proxy/WAF/LB → TLS backend → HTTP → aplicação</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>00:30: renovação de certificado</li><li>01:00: proxy recarregado parcialmente</li><li>08:00: clientes começam a falhar</li><li>08:30: 502 no WAF</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Certificado errado</td><td>Erro por hostname/SNI</td><td>openssl s_client/curl -v</td><td>Alta</td></tr><tr><td>Cadeia incompleta</td><td>Alguns clientes confiam, outros não</td><td>openssl verify/cadeia</td><td>Alta</td></tr><tr><td>Proxy 502</td><td>Backend indisponível ou TLS backend falha</td><td>logs proxy/LB</td><td>Alta</td></tr><tr><td>HTTP app</td><td>TLS OK, status 4xx/5xx</td><td>headers/log app</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>O troubleshooting HTTP evolui quando você deixa de olhar apenas para o navegador e passa a separar etapas. Cada etapa possui sintomas, ferramentas e logs próprios.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Etapa</th><th>O que valida</th><th>Sintoma típico</th><th>Evidência útil</th></tr></thead>\n    <tbody>\n      <tr><td>DNS</td><td>Nome → IP correto.</td><td>NXDOMAIN, IP errado, ambiente errado.</td><td>Consulta recursiva/autoritativa, TTL, cache e zona.</td></tr>\n      <tr><td>TCP</td><td>Porta alcançável.</td><td>Timeout, refused, reset.</td><td>Teste de porta, SYN/SYN-ACK/RST e firewall logs.</td></tr>\n      <tr><td>TLS</td><td>Criptografia, certificado, SNI e confiança.</td><td>Handshake failure, certificado inválido, protocolo incompatível.</td><td>Cadeia, SAN, validade, cipher, versão TLS e SNI.</td></tr>\n      <tr><td>HTTP</td><td>Método, path, host header, headers e resposta.</td><td>3xx, 4xx, 5xx, redirect loop.</td><td>Status code, headers, request ID e body reduzido.</td></tr>\n      <tr><td>Proxy/WAF/LB</td><td>Intermediação, roteamento, segurança e saúde.</td><td>403, 502, 503, 504, bloqueio por política.</td><td>Access logs, WAF logs, target health, trace ID.</td></tr>\n      <tr><td>Backend</td><td>Aplicação real e dependências.</td><td>500, lentidão, erro de dependência.</td><td>Logs da aplicação, métricas, APM e banco.</td></tr>\n    </tbody>\n  </table>\n  <p>Essa evolução também muda a responsabilidade operacional. Em redes antigas, muitas falhas eram diagnosticadas por ping e telnet. Em redes modernas, você precisa correlacionar curl, openssl, logs do proxy, WAF, LB, Ingress, aplicação, SIEM, métricas de latência e eventos de deploy.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p><strong>Troubleshooting HTTP/HTTPS</strong> é o processo de validar, em ordem lógica, todas as etapas necessárias para uma requisição web sair do cliente, chegar ao serviço correto, negociar segurança, ser aceita por intermediários, ser processada pelo backend e retornar uma resposta coerente.</p>\n  <p>Um fluxo HTTPS típico possui esta sequência conceitual:</p>\n  <ol>\n    <li>cliente resolve o nome por DNS;</li>\n    <li>cliente abre TCP na porta 443;</li>\n    <li>cliente envia ClientHello com SNI;</li>\n    <li>servidor ou proxy apresenta certificado compatível com o hostname;</li>\n    <li>TLS negocia versão e algoritmo;</li>\n    <li>cliente envia requisição HTTP com método, path, Host e headers;</li>\n    <li>proxy, WAF ou LB avalia política e roteia;</li>\n    <li>backend processa ou encaminha para dependências;</li>\n    <li>resposta volta com status code, headers e corpo;</li>\n    <li>logs registram IP original, request ID, rota, status, latência e backend.</li>\n  </ol>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> HTTP/HTTPS não é “só aplicação”. É uma pilha de dependências. A pergunta correta é: em qual transição a evidência mostra que o fluxo deixou de seguir o comportamento esperado?</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Para diagnosticar bem, você precisa entender o que acontece internamente em cada camada. O cliente não “abre um site” de uma vez. Ele consulta DNS, abre conexão TCP, negocia TLS, envia HTTP e interpreta resposta.</p>\n  <h3>DNS e Host</h3>\n  <p>O nome usado pelo usuário influencia DNS, certificado, SNI, Host header, virtual host, roteamento no proxy e regras de WAF. Se você testa pelo IP direto, pode quebrar SNI e Host header, recebendo certificado ou rota incorreta.</p>\n  <h3>TCP</h3>\n  <p>Antes do TLS, é preciso abrir TCP. Timeout sugere ausência de resposta, bloqueio silencioso ou caminho quebrado. Refused sugere rejeição ativa. Reset pode vir do destino, firewall, proxy ou equipamento intermediário.</p>\n  <h3>TLS</h3>\n  <p>No TLS, o cliente informa capacidades, nome esperado por SNI e valida certificado. Falhas podem ocorrer por protocolo obsoleto, cipher incompatível, cadeia incompleta, hostname fora do SAN, certificado expirado, inspeção TLS corporativa ou trust store desatualizada.</p>\n  <h3>HTTP</h3>\n  <p>Depois do TLS, a aplicação usa método, path, query string, headers, cookies e body. O código de resposta é semântico: 2xx indica sucesso, 3xx redirecionamento, 4xx problema percebido na requisição ou autorização, 5xx problema no servidor ou intermediário.</p>\n  <h3>Intermediários</h3>\n  <p>Proxy direto controla saída do cliente. Proxy reverso publica serviço. WAF aplica regras de segurança HTTP. Load balancer escolhe backend. CDN pode responder de cache. Cada um pode adicionar, remover ou depender de headers como <code>X-Forwarded-For</code>, <code>X-Forwarded-Proto</code>, <code>Host</code>, <code>Via</code> e identificadores de request.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura web corporativa raramente é cliente → servidor. Normalmente ela envolve várias decisões encadeadas.</p>\n  <pre class=\"code-block\"><code>Usuário/Navegador\n  → DNS público ou privado\n  → Proxy corporativo ou saída direta\n  → CDN/WAF\n  → Load Balancer / Reverse Proxy\n  → TLS termination ou TLS pass-through\n  → Backend pool / Ingress / Service\n  → Aplicação\n  → Banco, API interna, fila ou serviço gerenciado\n  → Logs, métricas, trace e SIEM</code></pre>\n  <p>A arquitetura também pode ter variações importantes:</p>\n  <ul>\n    <li><strong>TLS termination no LB:</strong> o LB descriptografa e envia HTTP ou HTTPS para backend;</li>\n    <li><strong>TLS re-encryption:</strong> o LB termina TLS e abre novo TLS até o backend;</li>\n    <li><strong>TLS pass-through:</strong> o LB encaminha TCP e o backend termina TLS;</li>\n    <li><strong>Proxy corporativo:</strong> cliente não fala diretamente com destino externo;</li>\n    <li><strong>WAF antes do LB:</strong> bloqueios podem ocorrer antes da aplicação ver a requisição;</li>\n    <li><strong>Kubernetes Ingress:</strong> regras de host/path podem rotear para service errado;</li>\n    <li><strong>Service mesh:</strong> sidecars podem aplicar mTLS, retry, timeout e policy.</li>\n  </ul>\n  <div class=\"callout callout--security\"><strong>Impacto em segurança:</strong> quanto mais intermediários, mais importante preservar IP original, request ID, headers confiáveis e logs íntegros. Caso contrário, investigação, rate limiting, auditoria e resposta a incidentes ficam frágeis.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Imagine que acessar um site corporativo seja como entrar em um prédio empresarial.</p>\n  <ul>\n    <li><strong>DNS</strong> é descobrir o endereço do prédio;</li>\n    <li><strong>TCP</strong> é chegar até a porta de entrada;</li>\n    <li><strong>TLS</strong> é conferir se o crachá e a identidade do prédio são legítimos;</li>\n    <li><strong>Proxy</strong> é uma portaria da sua empresa autorizando sua saída;</li>\n    <li><strong>WAF</strong> é uma revista de segurança na entrada;</li>\n    <li><strong>Load balancer</strong> é a recepção escolhendo qual guichê vai atender você;</li>\n    <li><strong>Backend</strong> é o setor que realmente resolve sua solicitação;</li>\n    <li><strong>Status code</strong> é a resposta formal: atendido, redirecionado, acesso negado, setor indisponível ou erro interno.</li>\n  </ul>\n  <p>Se você não sabe em qual etapa a pessoa foi barrada, não adianta culpar “o prédio”. Pode ser endereço errado, portaria da empresa, crachá vencido, recepção sem guichê saudável, setor errado ou política de segurança.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Um usuário tenta acessar <code>https://portal.exemplo.local</code> e recebe erro de certificado. O ping para o IP funciona e TCP/443 conecta. Um diagnóstico superficial diria: “rede está ok, é problema do site”. Um diagnóstico profissional separa:</p>\n  <ol>\n    <li>o DNS resolve para o IP esperado?</li>\n    <li>o teste foi feito usando o nome, não apenas o IP?</li>\n    <li>o certificado apresentado contém <code>portal.exemplo.local</code> no SAN?</li>\n    <li>a cadeia intermediária está completa?</li>\n    <li>a CA é confiável para aquele cliente?</li>\n    <li>o SNI enviado pelo cliente corresponde ao host?</li>\n    <li>existe proxy corporativo fazendo inspeção TLS?</li>\n  </ol>\n  <p>Esse exemplo mostra que TCP/443 aberto não prova que HTTPS está saudável. HTTPS adiciona validação de identidade e confiança. A rede pode transportar pacotes corretamente, mas a segurança TLS pode rejeitar a sessão.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa publica um portal interno por reverse proxy. Usuários internos recebem redirect infinito entre HTTP e HTTPS. Usuários externos conseguem acessar normalmente. O time de aplicação diz que “o proxy está quebrado”; o time de rede diz que “porta 443 está aberta”.</p>\n  <p>O diagnóstico profissional verifica headers e desenho:</p>\n  <ul>\n    <li>o proxy termina TLS e encaminha HTTP para backend?</li>\n    <li>o backend sabe que a requisição original era HTTPS por <code>X-Forwarded-Proto</code>?</li>\n    <li>há regra interna de DNS apontando para endpoint diferente do externo?</li>\n    <li>o reverse proxy interno preserva Host header?</li>\n    <li>o cookie possui atributo Secure e domínio correto?</li>\n    <li>o WAF ou proxy interno altera algum header relevante?</li>\n  </ul>\n  <p>A causa provável pode ser o backend acreditando que a requisição chegou por HTTP e redirecionando para HTTPS repetidamente, enquanto o proxy já recebeu HTTPS do cliente. A correção pode ser ajustar headers de encaminhamento e configuração de trusted proxy, não “abrir firewall”.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Uma API em cloud está atrás de WAF, Application Load Balancer e Kubernetes Ingress. Clientes recebem 503 após um deploy. DNS resolve, TCP conecta, TLS é válido e o WAF mostra allow. O erro aparece no LB.</p>\n  <p>Hipóteses cloud:</p>\n  <ul>\n    <li>target group sem targets saudáveis;</li>\n    <li>health check apontando para path errado;</li>\n    <li>readiness probe do Kubernetes falhando;</li>\n    <li>Ingress roteando host/path para service incorreto;</li>\n    <li>security group/NSG permitindo cliente→LB, mas bloqueando LB→backend;</li>\n    <li>backend ouvindo em porta diferente da configurada no service;</li>\n    <li>timeout do LB menor que tempo real da aplicação;</li>\n    <li>deploy mudou path base ou dependência externa.</li>\n  </ul>\n  <p>Em cloud, 503 frequentemente é evidência de publicação sem backend saudável, não necessariamente indisponibilidade total da rede. A análise precisa correlacionar WAF logs, LB logs, target health, eventos do cluster, logs de pods, métricas e mudança de pipeline.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, falhas HTTP/HTTPS devem ser prevenidas por testes e guardrails antes do deploy. Um pipeline maduro pode validar:</p>\n  <ul>\n    <li>certificado não expira nos próximos dias definidos pela política;</li>\n    <li>domínios esperados aparecem no SAN;</li>\n    <li>health check aponta para endpoint leve e autenticado quando necessário;</li>\n    <li>Ingress possui host/path corretos;</li>\n    <li>redirecionamento HTTP→HTTPS não gera loop;</li>\n    <li>headers de segurança estão presentes;</li>\n    <li>WAF está em modo adequado e logs estão habilitados;</li>\n    <li>testes sintéticos validam DNS, TCP, TLS e HTTP após deploy;</li>\n    <li>rollout tem rollback automático se erro 5xx ou latência exceder baseline.</li>\n  </ul>\n  <div class=\"callout callout--devsecops\"><strong>Princípio:</strong> o melhor troubleshooting é aquele que vira prevenção. Se um incidente foi causado por certificado vencido, path de health check errado ou header ausente, o pipeline deve passar a detectar isso.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>HTTP/HTTPS também é campo de investigação de segurança. Um WAF pode bloquear requisições suspeitas com 403. Um proxy pode negar categoria de domínio. Uma política de inspeção TLS pode quebrar aplicações que usam certificate pinning. Um atacante pode tentar esconder exfiltração em tráfego HTTPS permitido. Um erro de proxy pode vazar IP interno ou header sensível.</p>\n  <p>Boas práticas defensivas:</p>\n  <ul>\n    <li>habilitar logs de WAF, proxy, LB e aplicação com request ID correlacionável;</li>\n    <li>preservar IP original com cadeia confiável de proxies;</li>\n    <li>não confiar cegamente em headers enviados pelo cliente;</li>\n    <li>validar certificado e hostname, não apenas criptografia;</li>\n    <li>restringir administração web por identidade, rede e MFA;</li>\n    <li>auditar mudanças de regra WAF, proxy e certificados;</li>\n    <li>monitorar aumentos de 401, 403, 429, 500, 502, 503 e 504;</li>\n    <li>proteger logs contra alteração e retenção insuficiente.</li>\n  </ul>\n  <p>Más práticas incluem desativar validação de certificado para “resolver”, colocar WAF em bypass permanente, liberar qualquer origem no LB, ignorar 403 como falso positivo sem evidência ou remover proxy corporativo sem controle compensatório.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra os pontos de decisão e evidência em uma requisição HTTPS corporativa.</p>\n  <div class=\"svg-lab-container\">\n    <svg class=\"lesson-svg lesson-svg--http-troubleshooting\" viewBox=\"0 0 1180 640\" role=\"img\" aria-labelledby=\"title1508 desc1508\">\n      <title id=\"title1508\">Troubleshooting HTTP, HTTPS, TLS e proxies</title>\n      <desc id=\"desc1508\">Fluxo entre usuário, DNS, proxy, WAF, load balancer, TLS, backend, aplicação e observabilidade.</desc>\n      <defs>\n        <marker id=\"arrow1508\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--client\"></rect>\n      <text x=\"115\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Usuário</text>\n      <text x=\"115\" y=\"100\" text-anchor=\"middle\" class=\"svg-small\">Browser/curl</text>\n      <rect x=\"250\" y=\"40\" width=\"160\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--dns\"></rect>\n      <text x=\"330\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n      <text x=\"330\" y=\"100\" text-anchor=\"middle\" class=\"svg-small\">público/privado</text>\n      <rect x=\"470\" y=\"40\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--proxy\"></rect>\n      <text x=\"555\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Proxy</text>\n      <text x=\"555\" y=\"100\" text-anchor=\"middle\" class=\"svg-small\">CONNECT/saída</text>\n      <rect x=\"700\" y=\"40\" width=\"170\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--security\"></rect>\n      <text x=\"785\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">CDN/WAF</text>\n      <text x=\"785\" y=\"100\" text-anchor=\"middle\" class=\"svg-small\">policy/logs</text>\n      <rect x=\"940\" y=\"40\" width=\"180\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--lb\"></rect>\n      <text x=\"1030\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Load Balancer</text>\n      <text x=\"1030\" y=\"100\" text-anchor=\"middle\" class=\"svg-small\">TLS/health</text>\n      <rect x=\"340\" y=\"245\" width=\"190\" height=\"92\" rx=\"14\" class=\"svg-node svg-node--tls\"></rect>\n      <text x=\"435\" y=\"280\" text-anchor=\"middle\" class=\"svg-label\">TLS</text>\n      <text x=\"435\" y=\"305\" text-anchor=\"middle\" class=\"svg-small\">SNI/cert/cipher</text>\n      <rect x=\"610\" y=\"245\" width=\"190\" height=\"92\" rx=\"14\" class=\"svg-node svg-node--http\"></rect>\n      <text x=\"705\" y=\"280\" text-anchor=\"middle\" class=\"svg-label\">HTTP</text>\n      <text x=\"705\" y=\"305\" text-anchor=\"middle\" class=\"svg-small\">method/path/headers</text>\n      <rect x=\"880\" y=\"245\" width=\"190\" height=\"92\" rx=\"14\" class=\"svg-node svg-node--backend\"></rect>\n      <text x=\"975\" y=\"280\" text-anchor=\"middle\" class=\"svg-label\">Backend</text>\n      <text x=\"975\" y=\"305\" text-anchor=\"middle\" class=\"svg-small\">app/API/pod</text>\n      <rect x=\"470\" y=\"470\" width=\"260\" height=\"92\" rx=\"14\" class=\"svg-node svg-node--logs\"></rect>\n      <text x=\"600\" y=\"505\" text-anchor=\"middle\" class=\"svg-label\">Observabilidade</text>\n      <text x=\"600\" y=\"530\" text-anchor=\"middle\" class=\"svg-small\">request ID, logs, métricas, trace</text>\n      <line x1=\"200\" y1=\"83\" x2=\"250\" y2=\"83\" class=\"svg-link\" marker-end=\"url(#arrow1508)\"></line>\n      <line x1=\"410\" y1=\"83\" x2=\"470\" y2=\"83\" class=\"svg-link\" marker-end=\"url(#arrow1508)\"></line>\n      <line x1=\"640\" y1=\"83\" x2=\"700\" y2=\"83\" class=\"svg-link\" marker-end=\"url(#arrow1508)\"></line>\n      <line x1=\"870\" y1=\"83\" x2=\"940\" y2=\"83\" class=\"svg-link\" marker-end=\"url(#arrow1508)\"></line>\n      <path d=\"M1030 126 C1030 190 975 210 975 245\" class=\"svg-link\" marker-end=\"url(#arrow1508)\"></path>\n      <line x1=\"530\" y1=\"291\" x2=\"610\" y2=\"291\" class=\"svg-link\" marker-end=\"url(#arrow1508)\"></line>\n      <line x1=\"800\" y1=\"291\" x2=\"880\" y2=\"291\" class=\"svg-link\" marker-end=\"url(#arrow1508)\"></line>\n      <path d=\"M435 337 C455 400 520 430 600 470\" class=\"svg-link svg-link--dash\" marker-end=\"url(#arrow1508)\"></path>\n      <path d=\"M705 337 C700 405 665 430 620 470\" class=\"svg-link svg-link--dash\" marker-end=\"url(#arrow1508)\"></path>\n      <path d=\"M975 337 C900 420 760 445 680 470\" class=\"svg-link svg-link--dash\" marker-end=\"url(#arrow1508)\"></path>\n      <text x=\"285\" y=\"155\" class=\"svg-small\">1 DNS?</text>\n      <text x=\"505\" y=\"155\" class=\"svg-small\">2 proxy?</text>\n      <text x=\"732\" y=\"155\" class=\"svg-small\">3 WAF?</text>\n      <text x=\"952\" y=\"155\" class=\"svg-small\">4 LB?</text>\n      <text x=\"350\" y=\"385\" class=\"svg-small\">5 TLS?</text>\n      <text x=\"640\" y=\"385\" class=\"svg-small\">6 HTTP?</text>\n      <text x=\"900\" y=\"385\" class=\"svg-small\">7 backend?</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é um dossiê de troubleshooting HTTP/HTTPS. Você vai investigar uma aplicação publicada por HTTPS que apresenta sintomas diferentes conforme a origem: alguns usuários recebem erro de certificado, outros 403, outros 502 e outros timeout.</p>\n  <p>O objetivo é provar em qual etapa cada sintoma ocorre, correlacionando DNS, TCP, TLS, HTTP, proxy, WAF, load balancer, backend e logs.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Erro TLS intermitente atrás de proxy e WAF com SNI diferente. <strong>Causa provável a ser comprovada ou descartada:</strong> SNI/Host header inconsistente, cadeia intermediária ausente, certificado expirado em camada intermediária ou backend fora do pool.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam diagnóstico por camadas: status codes, certificado, SNI, proxy, headers, WAF, LB, health checks e logs correlacionados.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio apresenta uma aplicação web corporativa que falha de formas diferentes para usuários internos, externos e automações de pipeline. Você deverá separar problemas de DNS, TLS, proxy, WAF, LB e backend.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada demonstra como transformar sintomas web em evidências, evitando culpar “rede”, “firewall” ou “aplicação” antes de reconstruir a cadeia completa.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>Nesta aula, você aprendeu a diagnosticar HTTP, HTTPS, TLS e proxies como uma cadeia integrada de rede, segurança e aplicação.</p>\n  <ul>\n    <li>HTTP/HTTPS depende de DNS, TCP, TLS, proxy, WAF, LB e backend;</li>\n    <li>código HTTP é evidência, não conclusão;</li>\n    <li>erros de certificado exigem validar nome, SAN, cadeia, validade, SNI e confiança;</li>\n    <li>502, 503 e 504 costumam envolver intermediários e backends;</li>\n    <li>proxy direto, proxy reverso, WAF e CDN têm papéis diferentes;</li>\n    <li>headers e request IDs são essenciais para correlação;</li>\n    <li>troubleshooting seguro não desativa TLS, WAF ou proxy sem controle e rollback;</li>\n    <li>incidentes web devem virar testes sintéticos e guardrails no pipeline.</li>\n  </ul>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: SNI/Host header inconsistente, cadeia intermediária ausente, certificado expirado em camada intermediária ou backend fora do pool..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, <strong>15.9 — Troubleshooting VPN, túneis e acesso remoto</strong>, você vai diagnosticar VPN, autenticação, IPsec/SSL, rotas empurradas, DNS interno, split tunneling, MFA, postura do dispositivo e falhas de acesso remoto.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 5",
      "Camada 6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Aplicação",
      "Transporte",
      "Internet"
    ],
    "relatedProtocols": [
      "DNS",
      "TCP",
      "TLS",
      "HTTP",
      "HTTPS",
      "HTTP/2",
      "HTTP/3",
      "QUIC",
      "OCSP",
      "SNI"
    ],
    "relatedConcepts": [
      "Proxy",
      "Reverse proxy",
      "WAF",
      "CDN",
      "Load Balancer",
      "TLS termination",
      "TLS re-encryption",
      "TLS pass-through",
      "Certificate chain",
      "SAN",
      "SNI",
      "Host header",
      "X-Forwarded-For",
      "X-Forwarded-Proto",
      "Status codes",
      "Health check",
      "Request ID",
      "Trace ID"
    ],
    "ports": [
      "TCP/80",
      "TCP/443",
      "UDP/443",
      "TCP/8080",
      "TCP/8443",
      "TCP/3128",
      "TCP/53",
      "UDP/53"
    ]
  },
  "lab": {
    "id": "lab-15.8",
    "title": "Caso guiado: Erro TLS intermitente atrás de proxy e WAF com SNI diferente",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Alguns clientes recebem erro de certificado, outros recebem 502 do proxy, e curl por IP funciona sem validar hostname. Impacto: Há risco de desabilitar validação TLS para “resolver”, criando vulnerabilidade grave. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente → DNS → TCP 443 → TLS/SNI → proxy/WAF/LB → TLS backend → HTTP → aplicação",
    "architecture": "Arquitetura investigada: Cliente → DNS → TCP 443 → TLS/SNI → proxy/WAF/LB → TLS backend → HTTP → aplicação. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
      "Terminal Linux",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "210-270 min",
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
        "title": "Separar camadas",
        "instruction": "Valide DNS, TCP, TLS, HTTP e backend separadamente.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Tabela por camada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Inspecionar certificado",
        "instruction": "Verifique CN/SAN, validade, emissor e cadeia.",
        "command": "curl -vkI https://app.empresa.com; openssl s_client -connect app.empresa.com:443 -servername app.empresa.com -showcerts </dev/null",
        "expectedOutput": "Certificado correto para hostname.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Testar SNI explicitamente",
        "instruction": "Compare openssl com e sem -servername.",
        "command": "Test-NetConnection app.empresa.com -Port 443; curl.exe -vkI https://app.empresa.com",
        "expectedOutput": "Diferença de SNI identificada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Analisar proxy/WAF",
        "instruction": "Filtre request id, Host, SNI e upstream.",
        "command": "Consultar logs por request id, SNI, Host header, upstream status e backend selecionado",
        "expectedOutput": "Evidência de intermediário.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Validar backend",
        "instruction": "Teste health check e TLS entre LB/proxy e backend.",
        "command": "Consultar logs por request id, SNI, Host header, upstream status e backend selecionado",
        "expectedOutput": "Backend realmente saudável.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Evitar bypass inseguro",
        "instruction": "Não desabilite verificação TLS; use correção de cadeia/certificado.",
        "command": "Consultar logs por request id, SNI, Host header, upstream status e backend selecionado",
        "expectedOutput": "Mitigação segura.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Aplicar rollback ou reload",
        "instruction": "Corrija certificado/cadeia/reload em todos os nós.",
        "command": "Consultar logs por request id, SNI, Host header, upstream status e backend selecionado",
        "expectedOutput": "Camada TLS restaurada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Gerar RCA",
        "instruction": "Explique falha de renovação, reload parcial ou falta de teste SNI.",
        "command": "Consultar logs por request id, SNI, Host header, upstream status e backend selecionado",
        "expectedOutput": "Ação preventiva em pipeline de certificados.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Certificado válido por hostname",
        "command": "openssl s_client -servername",
        "expected": "SAN contém hostname e cadeia completa.",
        "ifFails": "Instalar certificado/cadeia correta."
      },
      {
        "check": "HTTP responde após TLS",
        "command": "curl -vI",
        "expected": "Handshake OK e status esperado.",
        "ifFails": "Investigar proxy/backend."
      },
      {
        "check": "Proxy sem 502",
        "command": "logs WAF/LB",
        "expected": "Upstream status saudável.",
        "ifFails": "Corrigir backend, pool ou TLS upstream."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "curl -k funciona",
        "probableCause": "Validação TLS foi ignorada",
        "howToConfirm": "Repetir sem -k e inspecionar cadeia",
        "fix": "Corrigir certificado, não ensinar cliente a ignorar TLS."
      },
      {
        "symptom": "Por IP funciona",
        "probableCause": "SNI/Host diferente",
        "howToConfirm": "Testar com hostname correto",
        "fix": "Corrigir virtual host/certificado."
      },
      {
        "symptom": "502 aparece depois do TLS",
        "probableCause": "Intermediário não alcança backend",
        "howToConfirm": "Logs proxy e health checks",
        "fix": "Corrigir upstream."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "curl -v",
      "openssl s_client",
      "SAN/validade/cadeia",
      "logs WAF/proxy",
      "request id",
      "health check backend",
      "plano de renovação"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Monte um runbook para renovação de certificado com teste de SNI, cadeia, proxy, backend e rollback.",
    "solution": "O runbook profissional testa o hostname real com SNI, valida cadeia completa, confirma reload em todos os nós, correlaciona request id no proxy e nunca usa -k como solução. O RCA deve atacar processo de renovação e monitoramento de validade.",
    "deliverables": [
      "Problem statement",
      "Matriz DNS/TCP/TLS/HTTP",
      "Tabela de status codes e origem da resposta",
      "Validação de certificado e SNI",
      "Correlação de logs por request ID",
      "Linha do tempo",
      "Correção mínima e rollback",
      "RCA com prevenção em pipeline"
    ]
  },
  "exercises": [
    {
      "id": "ex15.8.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.8.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.8.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.8.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.8.p1.2",
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
      "id": "q15.8.p1.3",
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
      "id": "q15.8.p1.4",
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
      "question": "Qual sequência representa melhor troubleshooting HTTPS profissional?",
      "options": [
        "DNS → TCP → TLS → HTTP → proxy/WAF/LB → backend → logs",
        "Ping → reiniciar servidor → abrir firewall",
        "Trocar certificado → limpar cache → encerrar incidente",
        "Testar por IP → ignorar certificado → culpar aplicação"
      ],
      "correctAnswer": 0,
      "explanation": "HTTPS depende de uma cadeia. Diagnóstico confiável valida cada etapa com evidência."
    },
    {
      "question": "Por que testar uma aplicação HTTPS apenas pelo IP pode enganar?",
      "options": [
        "Porque pode quebrar SNI, Host header e validação do certificado",
        "Porque HTTP não usa IP",
        "Porque certificados sempre usam portas UDP",
        "Porque DNS deixa de existir no servidor"
      ],
      "correctAnswer": 0,
      "explanation": "Virtual hosts, certificados e roteamento HTTP geralmente dependem do nome usado pelo cliente."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.8.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.8.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.8.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.8.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.8.p1.5",
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
      "question": "Qual parte do caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — Erro TLS intermitente atrás de proxy e WAF com SNI diferente",
    "scenario": "Alguns clientes recebem erro de certificado, outros recebem 502 do proxy, e curl por IP funciona sem validar hostname.",
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
    "reasoning": "O runbook profissional testa o hostname real com SNI, valida cadeia completa, confirma reload em todos os nós, correlaciona request id no proxy e nunca usa -k como solução. O RCA deve atacar processo de renovação e monitoramento de validade.",
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
    "finalAnswer": "A resposta correta para “Erro TLS intermitente atrás de proxy e WAF com SNI diferente” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "SNI",
      "shortDefinition": "Nome enviado pelo cliente no handshake TLS.",
      "longDefinition": "Server Name Indication é uma extensão TLS que permite ao cliente informar o hostname esperado, permitindo ao servidor escolher certificado e configuração corretos.",
      "example": "Um LB usa SNI para apresentar certificado de api.empresa.com em vez de portal.empresa.com.",
      "relatedTerms": [
        "TLS",
        "Certificado",
        "Hostname"
      ],
      "relatedLessons": [
        "11.4",
        "14.6",
        "15.8"
      ]
    },
    {
      "term": "Reverse proxy",
      "shortDefinition": "Proxy no lado do serviço.",
      "longDefinition": "Intermediário que recebe requisições de clientes e encaminha para servidores internos, podendo aplicar TLS, roteamento, headers, cache, autenticação e logs.",
      "example": "Nginx publica uma aplicação interna em HTTPS e encaminha para backends privados.",
      "relatedTerms": [
        "Proxy",
        "Load Balancer",
        "WAF"
      ],
      "relatedLessons": [
        "10.5",
        "14.6",
        "15.8"
      ]
    },
    {
      "term": "WAF",
      "shortDefinition": "Firewall de aplicação web.",
      "longDefinition": "Controle que analisa requisições HTTP/HTTPS para aplicar regras contra abusos, padrões suspeitos, bots, ataques conhecidos e violações de política.",
      "example": "WAF retorna 403 para requisição bloqueada por regra de segurança.",
      "relatedTerms": [
        "HTTP",
        "403",
        "Proxy"
      ],
      "relatedLessons": [
        "13.7",
        "14.6",
        "15.8"
      ]
    },
    {
      "term": "502 Bad Gateway",
      "shortDefinition": "Erro de gateway ao falar com upstream.",
      "longDefinition": "Status HTTP geralmente emitido por proxy ou gateway quando recebe resposta inválida ou falha ao comunicar corretamente com o backend.",
      "example": "Load balancer retorna 502 porque o backend fala HTTP em porta configurada como HTTPS.",
      "relatedTerms": [
        "Gateway",
        "Backend",
        "Load Balancer"
      ],
      "relatedLessons": [
        "14.6",
        "15.6",
        "15.8"
      ]
    },
    {
      "term": "TLS termination",
      "shortDefinition": "Encerramento da sessão TLS em um intermediário.",
      "longDefinition": "Ponto em que load balancer, proxy ou gateway descriptografa a conexão TLS do cliente para processar ou encaminhar a requisição.",
      "example": "ALB termina TLS e encaminha HTTP para instâncias privadas.",
      "relatedTerms": [
        "TLS",
        "Certificado",
        "Load Balancer"
      ],
      "relatedLessons": [
        "11.4",
        "14.6",
        "15.8"
      ]
    },
    {
      "term": "Request ID",
      "shortDefinition": "Identificador único de requisição.",
      "longDefinition": "Valor usado para rastrear a mesma requisição em vários logs, como proxy, WAF, load balancer, aplicação e SIEM.",
      "example": "O mesmo request ID aparece no WAF allow, no LB 502 e no log do backend com erro de conexão.",
      "relatedTerms": [
        "Trace ID",
        "Logs",
        "Observabilidade"
      ],
      "relatedLessons": [
        "14.12",
        "15.2",
        "15.8"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.8"
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
        "15.8"
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
      "type": "standard",
      "title": "RFC 9110 — HTTP Semantics",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc9110.html",
      "note": "Referência para semântica HTTP, métodos, headers e status codes."
    },
    {
      "type": "standard",
      "title": "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc8446.html",
      "note": "Especificação do TLS 1.3 e base conceitual para handshake e proteção de comunicação."
    },
    {
      "type": "standard",
      "title": "NIST SP 800-52 Rev. 2 — Guidelines for TLS Implementations",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/52/r2/final",
      "note": "Orientações para seleção, configuração e uso seguro de TLS."
    },
    {
      "type": "documentation",
      "title": "MDN Web Docs — Proxy servers and tunneling",
      "organization": "Mozilla / MDN",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Proxy_servers_and_tunneling",
      "note": "Referência didática para proxies HTTP e túneis."
    },
    {
      "type": "documentation",
      "title": "MDN Web Docs — CONNECT request method",
      "organization": "Mozilla / MDN",
      "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/CONNECT",
      "note": "Documentação sobre o método CONNECT usado por proxies para criar túneis."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 14.6 — Load Balancers, health checks, TLS e publicação de serviços",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m14/lesson-14-06",
      "note": "Base para entender LB, TLS termination, health checks e publicação segura."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting HTTP, HTTPS, TLS e proxies\".",
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
        "description": "No caso “Erro TLS intermitente atrás de proxy e WAF com SNI diferente”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting HTTP, HTTPS, TLS e proxies",
              "description": "Em Troubleshooting HTTP, HTTPS, TLS e proxies, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.8."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Alguns clientes recebem erro de certificado, outros recebem 502 do proxy, e curl por IP funciona sem validar hostname.",
      "Impacto: Há risco de desabilitar validação TLS para “resolver”, criando vulnerabilidade grave.",
      "Causa provável a validar: SNI/Host header inconsistente, cadeia intermediária ausente, certificado expirado em camada intermediária ou backend fora do pool.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting HTTP, HTTPS, TLS e proxies.",
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
      "Qual evidência comprova o entendimento da aula 15.8?"
    ],
    "commands": [
      {
        "platform": "Linux",
        "command": "curl -vkI https://app.empresa.com; openssl s_client -connect app.empresa.com:443 -servername app.empresa.com -showcerts </dev/null",
        "purpose": "Inspecionar TLS, SNI, cadeia e HTTP.",
        "expectedObservation": "Certificado, SAN, emissor, validade e status HTTP.",
        "interpretation": "Usar IP sem SNI pode testar outro certificado e enganar."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection app.empresa.com -Port 443; curl.exe -vkI https://app.empresa.com",
        "purpose": "Validar TCP e TLS/HTTP no cliente Windows.",
        "expectedObservation": "Conexão TCP, handshake e headers.",
        "interpretation": "Se TCP OK e TLS falha, não culpe rota."
      },
      {
        "platform": "Proxy/WAF/LB",
        "command": "Consultar logs por request id, SNI, Host header, upstream status e backend selecionado",
        "purpose": "Correlacionar frontend e backend.",
        "expectedObservation": "Código 502/503, erro TLS upstream ou backend unhealthy.",
        "interpretation": "HTTP 502 normalmente aponta intermediário/backend, não DNS."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Certificado errado” está com prioridade Alta e a evidência necessária é “openssl s_client/curl -v”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Cadeia incompleta” está com prioridade Alta e a evidência necessária é “openssl verify/cadeia”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Proxy 502” está com prioridade Alta e a evidência necessária é “logs proxy/LB”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “HTTP app” está com prioridade Média e a evidência necessária é “headers/log app”",
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
      "15.9"
    ]
  },
  "diagnosticCase": {
    "title": "Erro TLS intermitente atrás de proxy e WAF com SNI diferente",
    "symptom": "Alguns clientes recebem erro de certificado, outros recebem 502 do proxy, e curl por IP funciona sem validar hostname.",
    "businessImpact": "Há risco de desabilitar validação TLS para “resolver”, criando vulnerabilidade grave.",
    "likelyRootCause": "SNI/Host header inconsistente, cadeia intermediária ausente, certificado expirado em camada intermediária ou backend fora do pool.",
    "timeline": [
      "00:30: renovação de certificado",
      "01:00: proxy recarregado parcialmente",
      "08:00: clientes começam a falhar",
      "08:30: 502 no WAF"
    ],
    "expectedFlow": "Cliente → DNS → TCP 443 → TLS/SNI → proxy/WAF/LB → TLS backend → HTTP → aplicação",
    "hypothesisMatrix": [
      {
        "hypothesis": "Certificado errado",
        "why": "Erro por hostname/SNI",
        "evidence": "openssl s_client/curl -v",
        "priority": "Alta"
      },
      {
        "hypothesis": "Cadeia incompleta",
        "why": "Alguns clientes confiam, outros não",
        "evidence": "openssl verify/cadeia",
        "priority": "Alta"
      },
      {
        "hypothesis": "Proxy 502",
        "why": "Backend indisponível ou TLS backend falha",
        "evidence": "logs proxy/LB",
        "priority": "Alta"
      },
      {
        "hypothesis": "HTTP app",
        "why": "TLS OK, status 4xx/5xx",
        "evidence": "headers/log app",
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
