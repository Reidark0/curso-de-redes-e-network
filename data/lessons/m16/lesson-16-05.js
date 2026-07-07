export const lesson1605 = {
  "id": "16.5",
  "moduleId": "m16",
  "order": 5,
  "title": "DNS, HTTP/TLS e indicadores de comprometimento",
  "subtitle": "Como interpretar sinais defensivos em DNS, HTTP, HTTPS e TLS, correlacionando IOCs com baseline, endpoint, identidade, proxy, WAF, flow logs e SIEM.",
  "duration": "260-380 min",
  "estimatedStudyTimeMinutes": 380,
  "difficulty": "intermediário-avançado",
  "type": "segurança defensiva",
  "xp": 380,
  "tags": [
    "DNS",
    "HTTP",
    "HTTPS",
    "TLS",
    "IOC",
    "indicadores de comprometimento",
    "proxy",
    "WAF",
    "SIEM",
    "EDR",
    "threat hunting",
    "flow logs",
    "cloud security",
    "DevSecOps",
    "Zero Trust",
    "Blue Team",
    "ética",
    "escopo autorizado",
    "NDR",
    "evidências",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "Zeek",
    "NetFlow",
    "timeline de incidente"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m10",
      "lesson": "10.1",
      "reason": "DNS e HTTP/TLS foram estudados como fundamentos de aplicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.7",
      "reason": "DNS público, DNS privado e service discovery são essenciais para interpretar sinais em cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.8",
      "reason": "Troubleshooting HTTP, HTTPS, TLS e proxies fornece a base operacional para a análise defensiva."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.2",
      "reason": "Escopo, ética e legalidade limitam toda investigação defensiva."
    }
  ],
  "objectives": [
    "Explicar por que DNS, HTTP e TLS são fontes centrais de telemetria defensiva.",
    "Diferenciar IOC, anomalia, falso positivo, problema operacional e evidência insuficiente.",
    "Interpretar sinais como domínio raro, NXDOMAIN, User-Agent incomum, status HTTP, certificado inválido e falha TLS.",
    "Construir uma linha do tempo correlacionando endpoint, usuário, processo, DNS, proxy, WAF, firewall, flow logs e SIEM.",
    "Planejar contenções proporcionais sem quebrar serviços legítimos ou violar privacidade.",
    "Criar regras defensivas e melhorias DevSecOps para reduzir recorrência de exposições e tráfego suspeito."
  ],
  "learningOutcomes": [
    "Dado um domínio suspeito, o aluno identifica quais fontes consultar antes de recomendar bloqueio.",
    "Dado um erro TLS, o aluno separa problema de certificado, interceptação, proxy, SNI, cadeia e destino incorreto.",
    "Dado um padrão HTTP anômalo, o aluno correlaciona status, path, método, User-Agent, request ID e logs de aplicação.",
    "Dado um alerta de IOC, o aluno constrói hipótese, confiança, impacto, ação e critério de expiração.",
    "Dado um ambiente cloud, o aluno identifica quando DNS privado ou Private Endpoint mal configurado gera saída pública indevida.",
    "Dado um pipeline, o aluno propõe guardrails para TLS, logs, DNS, headers, egress e exposição web."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Depois de aprender reconhecimento autorizado e validação defensiva de portas, o próximo salto é aprender a ler os rastros que aplicações deixam na rede. Em muitos incidentes, o primeiro sinal observável não é um arquivo malicioso, nem um alerta perfeito do antivírus, mas uma consulta DNS estranha, um domínio recém-visto, um padrão HTTP incomum, um certificado TLS inesperado, um User-Agent fora do padrão, um pico de erros 403/404/5xx ou uma sequência de conexões curtas para destinos que a empresa nunca havia acessado.</p>\n  <p>DNS, HTTP e TLS são protocolos extremamente comuns em ambientes corporativos. Justamente por serem comuns, eles aparecem tanto no tráfego legítimo quanto em tráfego suspeito. O trabalho defensivo não é tratar qualquer anomalia como comprometimento, mas construir hipóteses, comparar com baseline e correlacionar sinais: quem consultou, quando consultou, qual domínio, qual IP respondeu, qual certificado foi apresentado, qual caminho HTTP foi acessado, qual proxy registrou a saída, qual endpoint estava envolvido e qual controle deveria ter bloqueado ou registrado o fluxo.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> indicadores de comprometimento não são verdades isoladas. Eles são pistas técnicas que ganham valor quando conectadas a contexto, escopo, linha do tempo, identidade, ativo, logs e comportamento esperado.</div>\n  <p>Esta aula é defensiva. Você aprenderá a interpretar DNS, HTTP e TLS como fontes de telemetria para detecção, investigação e melhoria de controles, sem executar exploração, sem coletar dados fora de autorização e sem transformar IOC em caça às bruxas.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>DNS nasceu para transformar nomes em endereços de forma distribuída e escalável. HTTP nasceu para transportar hipertexto e, depois, aplicações web inteiras. TLS surgiu para proteger comunicações contra espionagem, adulteração e falsificação. Com o crescimento da internet, esses três elementos viraram a base da navegação, de APIs, de SaaS, de aplicações móveis, de pipelines, de integrações corporativas e de serviços cloud.</p>\n  <p>Ao mesmo tempo, defensores perceberam que a rede expõe metadados valiosos. Mesmo quando o conteúdo HTTPS está criptografado, ainda podem existir sinais úteis: resolução DNS, destino, SNI em cenários onde visível, certificado, JA3/JA4 em soluções específicas, volume, frequência, duração, geolocalização aproximada, reputação do domínio, proxy logs, WAF logs, status HTTP, método, caminho, tamanho de resposta e padrão temporal.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>DNS:</strong> nomeia recursos e revela intenção de comunicação.</div><div class=\"timeline-item\"><strong>HTTP:</strong> estrutura requisições, respostas, métodos, status e caminhos.</div><div class=\"timeline-item\"><strong>TLS:</strong> protege conteúdo, mas ainda exige validação de identidade, cadeia de confiança e comportamento criptográfico.</div><div class=\"timeline-item\"><strong>Blue Team:</strong> correlaciona esses sinais com endpoint, identidade, proxy, firewall, SIEM e baseline.</div></div>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema é que sinais de rede são ambíguos. Um domínio estranho pode ser telemetria legítima de um fornecedor. Um certificado novo pode ser rotação normal de CDN. Um HTTP 404 pode ser crawler, erro de deploy ou tentativa de enumeração. Um pico de DNS pode ser atualização de software, malware, teste de segurança autorizado ou problema de cache. Uma conexão TLS para um país incomum pode ser SaaS global, CDN, proxy corporativo ou exfiltração.</p>\n  <p>Sem método, o analista cai em dois erros: ignorar sinais importantes ou gerar falsos positivos em massa. Em ambientes reais, ambos são perigosos. Ignorar sinais permite permanência e movimento lateral. Alarmar sem contexto consome SOC, desgasta times, bloqueia negócio e cria cultura de exceção.</p>\n  <ul>\n    <li><strong>Ambiguidade técnica:</strong> o mesmo protocolo atende aplicações legítimas e tráfego suspeito;</li>\n    <li><strong>Criptografia:</strong> TLS reduz visibilidade de conteúdo, exigindo análise de metadados e endpoints autorizados;</li>\n    <li><strong>Cloud e SaaS:</strong> CDNs, proxies e serviços compartilhados dificultam atribuição por IP;</li>\n    <li><strong>Privacidade:</strong> logs podem conter dados pessoais ou sensíveis e precisam de minimização e proteção;</li>\n    <li><strong>Operação:</strong> bloquear domínio, categoria ou certificado sem análise pode derrubar sistemas críticos.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>A evolução defensiva vai de listas estáticas de IOCs para detecção contextual. No início, muitos times dependiam de listas de domínios, IPs e hashes. Isso ainda ajuda, mas é insuficiente: infraestrutura muda, CDNs compartilham endereços, domínios podem expirar, fornecedores legítimos usam padrões incomuns e atacantes podem trocar indicadores rapidamente.</p>\n  <p>Defesa moderna combina IOC com comportamento. Em vez de apenas perguntar “este domínio está em uma lista?”, o analista pergunta: este ativo costuma consultar esse domínio? O domínio é novo para a empresa? A consulta veio de uma máquina sensível? Houve autenticação suspeita antes? O proxy permitiu upload grande depois? O certificado bate com o domínio esperado? O User-Agent combina com o software instalado? O tráfego ocorreu fora do horário normal? Houve alerta de EDR no mesmo minuto?</p>\n  <p>Esse raciocínio conecta o Módulo 13, sobre segurança de redes, o Módulo 14, sobre cloud networking, e o Módulo 15, sobre troubleshooting. Em segurança, evidência isolada raramente basta; a força vem da correlação.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p><strong>Indicador de comprometimento</strong> é uma pista observável que pode sugerir atividade maliciosa, abuso, configuração indevida ou comprometimento. Em rede, exemplos defensivos incluem domínios suspeitos, resoluções incomuns, conexões para destinos raros, padrões HTTP anômalos, certificados inesperados, falhas TLS, uso incomum de métodos HTTP, tráfego periódico e volume incompatível com o baseline.</p>\n  <p><strong>DNS como evidência</strong> mostra intenção de resolver nomes. <strong>HTTP como evidência</strong> mostra interação de aplicação quando o tráfego é visível por proxy, WAF, servidor ou inspeção autorizada. <strong>TLS como evidência</strong> mostra identidade criptográfica, negociação, certificado, versão, erros e, em alguns casos, metadados suficientes para investigação sem descriptografar conteúdo.</p>\n  <div class=\"comparison-table\"><table><thead><tr><th>Fonte</th><th>O que pode indicar</th><th>Cuidado</th></tr></thead><tbody><tr><td>DNS</td><td>Domínio novo, raro, aleatório, recém-criado, sinkhole ou consulta excessiva.</td><td>CDN, SaaS e telemetria legítima podem parecer estranhos.</td></tr><tr><td>HTTP</td><td>Método, caminho, status, User-Agent, upload, redirect ou erro incomum.</td><td>Conteúdo pode estar criptografado fora do ponto de inspeção autorizado.</td></tr><tr><td>TLS</td><td>Certificado inválido, cadeia inesperada, SNI divergente, versão fraca ou alerta TLS.</td><td>Privacidade e criptografia limitam análise de conteúdo.</td></tr><tr><td>Correlação</td><td>Sequência temporal conectando usuário, endpoint, destino, controle e impacto.</td><td>Correlação ruim cria narrativa falsa.</td></tr></tbody></table></div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Em uma navegação típica, o endpoint consulta DNS, recebe um ou mais endereços, abre conexão TCP ou QUIC, negocia TLS quando HTTPS é usado e então troca requisições e respostas HTTP. Cada etapa pode gerar evidência em lugares diferentes: cache local, resolvedor DNS, DNS corporativo, proxy, firewall, endpoint, EDR, WAF, load balancer, servidor web, CDN, cloud flow logs e SIEM.</p>\n  <p>No DNS, sinais importantes incluem nome consultado, tipo de registro, resolvedor usado, cliente, resposta, TTL, NXDOMAIN, volume e periodicidade. Em HTTP, sinais incluem método, host, path, status, tamanho, referer, User-Agent, request ID e tempo de resposta. Em TLS, sinais incluem certificado, emissor, validade, SAN, SNI quando disponível, versão, cipher suite, alertas e falhas de validação.</p>\n  <p>O funcionamento interno também explica limitações. Um firewall pode ver IP e porta, mas não path HTTP. Um DNS corporativo pode ver consultas, mas não conexões feitas por IP literal. Um proxy pode ver URL, mas apenas se o tráfego passar por ele. Um endpoint pode ver processo de origem, mas depende de agente instalado e saudável. Um flow log pode mostrar 5-tupla e bytes, mas não payload. Por isso, investigação boa é multimodal.</p>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> dizer “não há IOC” só porque uma fonte não registrou nada. Antes de concluir, verifique se o fluxo realmente passava pelo sensor, se havia retenção, se o timestamp está correto e se o log contém o campo necessário.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura defensiva para DNS, HTTP/TLS e IOCs precisa combinar controle, visibilidade e resposta. O DNS deve preferir resolvedores corporativos ou controlados, com logs e política. A saída web deve passar por proxy, firewall, SWG, CASB, WAF ou controles equivalentes conforme o caso. Aplicações publicadas devem ter WAF, load balancer, TLS correto, logs de acesso e correlação com request ID. Endpoints devem fornecer processo, usuário e postura.</p>\n  <p>Em cloud, a arquitetura inclui DNS público e privado, Private Endpoints, flow logs, logs de load balancer, WAF, CloudTrail/Azure Activity/Cloud Audit, e integração com SIEM. Em Kubernetes, entram CoreDNS, Ingress, service mesh quando existente, logs de ingress controller e NetworkPolicy. Em DevSecOps, entram testes de TLS, validação de headers, revisão de DNS, certificados, exposição e logs obrigatórios.</p>\n  <ul>\n    <li><strong>Camada de nome:</strong> DNS corporativo, DNS privado, logs, bloqueios e allowlists justificadas;</li>\n    <li><strong>Camada web:</strong> proxy, WAF, CDN, load balancer, headers, status e trilha de requisições;</li>\n    <li><strong>Camada criptográfica:</strong> TLS, certificados, CA, validade, SNI e falhas de handshake;</li>\n    <li><strong>Camada de correlação:</strong> SIEM, EDR, identidade, inventário, CMDB, tags e tickets;</li>\n    <li><strong>Camada de resposta:</strong> playbook, contenção, exceção, comunicação, reteste e RCA.</li>\n  </ul>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um prédio corporativo. O DNS é como a lista telefônica e o concierge: ele ajuda pessoas a encontrarem departamentos. O HTTP é como o conteúdo das solicitações no balcão: “quero abrir este processo”, “quero enviar este formulário”, “quero baixar este documento”. O TLS é como o lacre e o crachá criptográfico: ele tenta garantir que você está falando com o balcão correto e que ninguém adulterou a conversa.</p>\n  <p>Um IOC é como uma pista de segurança: alguém perguntou por uma sala inexistente, tentou entrar repetidamente em portas erradas, apresentou um crachá vencido, foi ao depósito fora do horário ou enviou muitas caixas para um endereço incomum. Nenhuma pista isolada prova crime. Mas várias pistas, na ordem certa, com câmera, crachá, horário e testemunha, formam uma investigação consistente.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Um usuário relata lentidão ao acessar um sistema. O analista consulta logs DNS e vê que o endpoint resolveu <code>app.empresa.exemplo</code> para um IP esperado. No proxy, vê requisições HTTP 502 vindas do mesmo usuário. No load balancer, vê backends unhealthy. No certificado, tudo está válido. O IOC aqui não é “domínio malicioso”, mas uma cadeia de evidências: DNS correto, TLS válido, proxy alcançando, aplicação falhando no backend.</p>\n  <p>Em outro caso, um endpoint que nunca acessava domínios externos passa a consultar nomes longos, com alta entropia e periodicidade fixa, sempre antes de pequenas conexões HTTPS para destinos raros. Ainda não é conclusão automática, mas é uma hipótese forte para investigação defensiva: verificar processo de origem no EDR, usuário logado, instalação recente, proxy logs, reputação, inventário e outros hosts com padrão semelhante.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa possui filiais, VPN, proxy corporativo, DNS interno, WAF e SIEM. O SOC recebe alerta de múltiplos acessos HTTPS para um domínio recém-visto por esta organização. A investigação começa pelo DNS: quais hosts consultaram? Em seguida, proxy: qual URL, método, status, volume, User-Agent e categoria? Depois, EDR: qual processo gerou a conexão? Em seguida, identidade: qual usuário estava logado? Por fim, firewall/flow logs: houve conexões diretas contornando proxy?</p>\n  <p>A resposta madura não é bloquear tudo imediatamente. O time verifica se o domínio pertence a fornecedor legítimo, CDN, atualização de software, campanha de phishing, malware ou teste autorizado. Se o risco for confirmado, aplica contenção proporcional: bloquear domínio ou categoria, isolar endpoint, revogar sessão, abrir incidente, preservar logs, notificar dono, caçar padrão semelhante e atualizar detecção.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, DNS e HTTP/TLS aparecem em serviços gerenciados, APIs, storage, load balancers, WAF, private endpoints e clusters Kubernetes. Uma aplicação em subnet privada pode resolver um serviço gerenciado por DNS privado e acessar via Private Link. Se o DNS privado estiver errado, a aplicação pode sair por NAT para endpoint público. Isso gera custo, risco e fuga de controle.</p>\n  <p>Um bom desenho coleta logs de DNS privado, flow logs, WAF/LB logs, auditoria de alterações e métricas. Quando um serviço começa a acessar endpoint público inesperado, o time cruza: alteração recente de DNS? Private Endpoint removido? Route table mudou? Security group liberou egress amplo? Pipeline alterou variável? Certificado do endpoint mudou? Esse tipo de investigação conecta Cloud Networking com Segurança.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, DNS, HTTP/TLS e IOCs entram antes e depois do deploy. Antes do deploy, o pipeline pode validar se domínios públicos seguem padrão, se certificados são gerenciados, se TLS fraco não é aceito, se headers de segurança existem, se endpoints privados foram configurados e se logs obrigatórios estão habilitados. Depois do deploy, testes sintéticos confirmam resolução DNS, cadeia TLS, status HTTP esperado, WAF ativo e roteamento correto.</p>\n  <p>Também há risco em pipelines. Runners privados podem acessar repositórios, registries, APIs cloud e secrets managers. Um runner comprometido pode gerar tráfego DNS/HTTPS incomum. Por isso, o pipeline deve ter egress control, allowlist bem justificada, logs de proxy, identidade de workload, rotação de credenciais, detecção de downloads incomuns e trilha de auditoria.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Um playbook defensivo de IOC começa com uma pergunta: qual comportamento observável justificou o alerta? Pode ser domínio novo, consulta DNS suspeita, HTTP para caminho incomum, certificado inválido, TLS para destino raro, User-Agent anômalo ou tráfego periódico. Em seguida, o analista busca contexto: ativo, usuário, processo, horário, localização, dados transferidos, mudanças recentes e outros hosts afetados.</p>\n  <p>Mitigações devem ser proporcionais. Bloquear um domínio pode conter risco, mas também pode quebrar serviço de negócio. Isolar um endpoint pode ser necessário, mas precisa de comunicação. Alterar DNS pode ter cache. Revogar certificado ou mudar WAF pode impactar clientes. Segurança profissional usa evidência, coordenação e rollback.</p>\n  <div class=\"callout callout--success\"><strong>Boa prática:</strong> registre cada IOC com fonte, primeira observação, última observação, ativos afetados, confiança, severidade, ação tomada, falso positivo conhecido e critério de expiração.</div>\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Análise de logs e amostras sintéticas/autorizadas. Não acessar conteúdo privado, não interceptar tráfego real de usuários sem base legal e autorização.</p><p><strong>Ações proibidas:</strong> Quebrar TLS de usuários sem autorização; Baixar payload suspeito; Interagir com infraestrutura maliciosa real; Publicar dados sensíveis de logs.</p><p><strong>Meta defensiva:</strong> Correlacionar nomes, certificados, SNI, códigos HTTP, user-agent, proxy e reputação para investigar sinais sem assumir culpa por um único indicador.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra como DNS, HTTP/TLS e telemetria se unem em uma investigação defensiva.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Fluxo defensivo de DNS HTTP TLS e indicadores de comprometimento\">\n    <svg viewBox=\"0 0 980 440\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-5-content-diagram-1-title svg-16-5-content-diagram-1-desc\">\n      <title id=\"svg-16-5-content-diagram-1-title\">DNS, HTTP/TLS e indicadores de comprometimento</title>\n      <desc id=\"svg-16-5-content-diagram-1-desc\">Diagrama pedagógico da aula 16.5, DNS, HTTP/TLS e indicadores de comprometimento, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1605\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n      </defs>\n      <rect x=\"20\" y=\"30\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n      <text x=\"85\" y=\"60\" text-anchor=\"middle\" class=\"svg-title\">Endpoint</text>\n      <text x=\"85\" y=\"82\" text-anchor=\"middle\" class=\"svg-small\">usuário/processo</text>\n      <rect x=\"210\" y=\"30\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n      <text x=\"275\" y=\"60\" text-anchor=\"middle\" class=\"svg-title\">DNS</text>\n      <text x=\"275\" y=\"82\" text-anchor=\"middle\" class=\"svg-small\">consulta/resposta</text>\n      <rect x=\"400\" y=\"30\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n      <text x=\"465\" y=\"60\" text-anchor=\"middle\" class=\"svg-title\">Proxy/WAF</text>\n      <text x=\"465\" y=\"82\" text-anchor=\"middle\" class=\"svg-small\">HTTP logs</text>\n      <rect x=\"590\" y=\"30\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n      <text x=\"655\" y=\"60\" text-anchor=\"middle\" class=\"svg-title\">TLS</text>\n      <text x=\"655\" y=\"82\" text-anchor=\"middle\" class=\"svg-small\">certificado/SNI</text>\n      <rect x=\"780\" y=\"30\" width=\"150\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n      <text x=\"855\" y=\"60\" text-anchor=\"middle\" class=\"svg-title\">Destino</text>\n      <text x=\"855\" y=\"82\" text-anchor=\"middle\" class=\"svg-small\">SaaS/API/CDN</text>\n      <line x1=\"150\" y1=\"65\" x2=\"210\" y2=\"65\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"340\" y1=\"65\" x2=\"400\" y2=\"65\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"530\" y1=\"65\" x2=\"590\" y2=\"65\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"720\" y1=\"65\" x2=\"780\" y2=\"65\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <rect x=\"80\" y=\"180\" width=\"160\" height=\"80\" rx=\"12\" class=\"svg-box svg-box--accent\"></rect>\n      <text x=\"160\" y=\"212\" text-anchor=\"middle\" class=\"svg-title\">EDR</text>\n      <text x=\"160\" y=\"236\" text-anchor=\"middle\" class=\"svg-small\">processo e usuário</text>\n      <rect x=\"310\" y=\"180\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-box svg-box--accent\"></rect>\n      <text x=\"395\" y=\"212\" text-anchor=\"middle\" class=\"svg-title\">Flow logs</text>\n      <text x=\"395\" y=\"236\" text-anchor=\"middle\" class=\"svg-small\">5-tupla e volume</text>\n      <rect x=\"550\" y=\"180\" width=\"170\" height=\"80\" rx=\"12\" class=\"svg-box svg-box--accent\"></rect>\n      <text x=\"635\" y=\"212\" text-anchor=\"middle\" class=\"svg-title\">SIEM</text>\n      <text x=\"635\" y=\"236\" text-anchor=\"middle\" class=\"svg-small\">correlação</text>\n      <rect x=\"770\" y=\"180\" width=\"160\" height=\"80\" rx=\"12\" class=\"svg-box svg-box--danger\"></rect>\n      <text x=\"850\" y=\"212\" text-anchor=\"middle\" class=\"svg-title\">IOC</text>\n      <text x=\"850\" y=\"236\" text-anchor=\"middle\" class=\"svg-small\">pista contextual</text>\n      <line x1=\"85\" y1=\"100\" x2=\"160\" y2=\"180\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"275\" y1=\"100\" x2=\"395\" y2=\"180\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"465\" y1=\"100\" x2=\"395\" y2=\"180\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"655\" y1=\"100\" x2=\"635\" y2=\"180\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"720\" y1=\"220\" x2=\"770\" y2=\"220\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <rect x=\"230\" y=\"330\" width=\"520\" height=\"70\" rx=\"12\" class=\"svg-box\"></rect>\n      <text x=\"490\" y=\"360\" text-anchor=\"middle\" class=\"svg-title\">Decisão defensiva</text>\n      <text x=\"490\" y=\"384\" text-anchor=\"middle\" class=\"svg-small\">conter, investigar, liberar, ajustar detecção, abrir RCA ou expirar falso positivo</text>\n      <line x1=\"635\" y1=\"260\" x2=\"500\" y2=\"330\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n      <line x1=\"850\" y1=\"260\" x2=\"650\" y2=\"330\" class=\"svg-line\" marker-end=\"url(#arrow1605)\"></line>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio-intro\"><h2>15. Laboratório</h2><p>Você criará um dossiê defensivo de indicadores em DNS, HTTP/TLS e telemetria relacionada. O objetivo é praticar raciocínio de investigação, não executar ataque. O exercício usa cenário fictício, dados simulados e fontes autorizadas.</p></section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — DNS raro, SNI e proxy</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>timestamp,host,user,dns_query,answer,sni,http_status,bytes_out,proxy_category,process\n2026-07-01T12:00:00Z,ws-044,rafael,updates.vendor.example,198.51.100.50,updates.vendor.example,200,12000,software-update,agent.exe\n2026-07-01T12:03:20Z,ws-044,rafael,cdn-backup.example,198.51.100.77,cdn-backup.example,200,180000,cloud-storage,browser.exe\n2026-07-01T12:04:08Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,420,unknown,powershell.exe\n2026-07-01T12:04:38Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,418,unknown,powershell.exe</code></pre><p><strong>Tarefa:</strong> Correlacione DNS, SNI, categoria de proxy, processo e usuário. Classifique indicadores fracos versus hipótese que merece investigação.</p><p><strong>Ideia de detecção:</strong> <code>domain_rarity=high AND category=unknown AND repeat_interval_regular=true</code></p><p><strong>Achado esperado:</strong> ws-031 tem domínio raro, categoria desconhecida, processo incomum e repetição; é hipótese de investigação, não conclusão isolada.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios-intro\"><h2>16. Exercícios</h2><p>Os exercícios treinam diferenciação entre IOC, anomalia, falso positivo, problema operacional e evidência insuficiente.</p></section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio-intro\"><h2>17. Desafio</h2><p>O desafio pede um playbook defensivo para investigar sinais DNS, HTTP/TLS e tráfego web suspeito sem quebrar serviços legítimos.</p></section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-intro\"><h2>18. Solução comentada</h2><p>A solução comentada mostra como transformar pistas ambíguas em decisão proporcional, documentada e auditável.</p></section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\"><h2>19. Resumo</h2><p>DNS revela intenção de resolver nomes, HTTP revela interação de aplicação quando visível, e TLS revela identidade criptográfica e estado da negociação. IOCs são pistas, não provas isoladas. A investigação profissional cruza endpoint, usuário, processo, DNS, proxy, WAF, firewall, flow logs, cloud logs, SIEM, baseline e linha do tempo. O objetivo é reduzir risco com contenção proporcional, preservação de evidência, melhoria de detecção e prevenção de recorrência.</p></section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Correlacionar nomes, certificados, SNI, códigos HTTP, user-agent, proxy e reputação para investigar sinais sem assumir culpa por um único indicador. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\"><h2>20. Próximo tema</h2><p>Na próxima aula, você estudará <strong>MITM, ARP spoofing, rogue DHCP e defesas L2</strong>, conectando segurança de camada 2 com detecção, prevenção e resposta defensiva.</p></section>"
  },
  "lab": {
    "id": "lab-16.5",
    "title": "Laboratório: dossiê defensivo de DNS, HTTP/TLS e IOCs",
    "labType": "cloud",
    "objective": "Construir um dossiê de investigação defensiva usando dados simulados de DNS, proxy, TLS, flow logs, EDR e SIEM, classificando sinais com contexto e propondo ação proporcional.",
    "scenario": "15. Laboratório Você criará um dossiê defensivo de indicadores em DNS, HTTP/TLS e telemetria relacionada. O objetivo é praticar raciocínio de investigação, não executar ataque. O exercício usa cenário fictício, dados simulados e fontes autorizadas.",
    "topology": [
      "Endpoint corporativo",
      "Resolvedor DNS corporativo",
      "Proxy/SWG",
      "Firewall/flow logs",
      "WAF/load balancer",
      "Aplicação/SaaS",
      "EDR",
      "SIEM",
      "Time de resposta"
    ],
    "architecture": "Endpoint → DNS → proxy/WAF/firewall → destino HTTP/TLS → logs → SIEM → hipótese → contenção proporcional → reteste → melhoria preventiva.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 380,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes.",
      "Este laboratório é exclusivamente defensivo e exige escopo autorizado.",
      "Não execute exploração, evasão, persistência, brute force, interceptação de tráfego real ou coleta de credenciais.",
      "Use dados sintéticos sempre que possível e preserve apenas metadados necessários.",
      "Informe SOC/NOC antes de testes que possam gerar alertas.",
      "Pare imediatamente se houver impacto operacional não previsto ou alvo fora do escopo.",
      "Usar somente os dados sintéticos fornecidos nesta aula ou dados internos autorizados e sanitizados.",
      "Não executar consulta, conexão, download, varredura ou teste contra domínios e IPs reais a partir do dataset.",
      "Não incluir payload, credencial, segredo, dado pessoal ou conteúdo de pacote real no relatório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Confirmar escopo autorizado e critérios de parada",
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Análise de logs e amostras sintéticas/autorizadas. Não acessar conteúdo privado, não interceptar tráfego real de usuários sem base legal e autorização.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Queries DNS | Proxy/WAF metadata | Certificado/SNI | Processo de origem | Timeline | Decisão e justificativa",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Definir escopo e fontes autorizadas",
        "instruction": "Liste quais logs podem ser usados: DNS, proxy, WAF, firewall, flow logs, EDR, identidade, aplicação e SIEM. Defina retenção, dono e limitação de privacidade.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Escopo de investigação claro e compatível com a ROE.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Criar baseline de comportamento esperado",
        "instruction": "Defina domínios, SaaS, APIs, certificados, User-Agents, horários e volumes esperados para três perfis fictícios: usuário, servidor e runner DevSecOps.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Baseline mínimo para comparar anomalias.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Analisar sinais DNS",
        "instruction": "Classifique consultas simuladas por raridade, NXDOMAIN, domínio recém-observado, padrão aleatório, resolvedor usado, TTL e volume.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista de sinais DNS com confiança preliminar.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Analisar sinais HTTP",
        "instruction": "Revise métodos, paths, status codes, User-Agent, volume, redirects, uploads e request IDs em logs de proxy/WAF simulados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Hipóteses separando erro operacional, uso legítimo e possível atividade suspeita.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Analisar sinais TLS",
        "instruction": "Verifique validade, emissor, SAN, cadeia, SNI quando disponível, versão, cipher suite, alertas e divergência entre hostname e certificado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Classificação de problemas TLS e sinais potencialmente relevantes.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Correlacionar endpoint e identidade",
        "instruction": "Relacione cada sinal com host, usuário, processo, grupo, postura do dispositivo, horário e eventos de autenticação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "IOC ganha contexto de ativo e identidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Construir linha do tempo",
        "instruction": "Ordene primeira observação, consulta DNS, conexão, resposta HTTP/TLS, alerta, ação do usuário, mudança recente e evento de segurança.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Narrativa temporal verificável.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Classificar confiança e severidade",
        "instruction": "Para cada sinal, atribua confiança, impacto, escopo, ativos afetados, falso positivo possível e ação recomendada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de decisão defensiva.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Definir contenção proporcional",
        "instruction": "Proponha ações: bloquear domínio, ajustar proxy, isolar endpoint, revogar sessão, corrigir DNS privado, aplicar egress control, abrir ticket ou expirar IOC falso positivo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de resposta com rollback e dono.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Prevenir recorrência",
        "instruction": "Crie melhorias: logs obrigatórios, regra SIEM, allowlist com dono, policy as code, teste TLS em pipeline, revisão de DNS e alerta de egress raro.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Aprendizado incorporado ao processo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “DNS, HTTP/TLS e indicadores de comprometimento” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Domínio recém-criado consultado por host interno | Sinal: Consulta DNS para domínio novo ou raro | Query: domain_age<30d AND internal_hosts_count>0 | FP: Serviço SaaS novo\nDetecção: SNI divergente do Host esperado | Sinal: Metadata TLS/HTTP inconsistente | Query: tls_sni != http_host OR cert_cn mismatch | FP: CDN/proxy legítimo\nDetecção: User-Agent raro com beacon periódico | Sinal: Mesmo host faz requisições pequenas em intervalo fixo | Query: stddev(interval)<threshold AND bytes_out small | FP: Health check legítimo",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Bloquear domínio no DNS/proxy | Adicionar detecção com janela e exceções | Isolar endpoint somente com múltiplas evidências | Preservar logs e amostras de metadata | Notificar dono do sistema",
        "expectedOutput": "Plano de contenção com dono, risco, impacto, comunicação, rollback e validação.",
        "explanation": "Resposta de segurança deve ser precisa. Bloqueios amplos podem esconder evidências e quebrar serviços críticos."
      },
      {
        "number": 15,
        "title": "Fazer debrief e lições aprendidas",
        "instruction": "Finalize registrando achados, evidências, falsos positivos, melhorias, controles permanentes e pendências.",
        "command": "Debrief: achado → evidência → risco → mitigação → detecção → dono → prazo.",
        "expectedOutput": "Relatório defensivo reproduzível e acionável.",
        "explanation": "O valor do laboratório aparece quando o resultado vira melhoria operacional, não apenas conhecimento individual."
      },
      {
        "number": 16,
        "title": "Analisar dataset sintético do caso",
        "instruction": "Correlacione DNS, SNI, categoria de proxy, processo e usuário. Classifique indicadores fracos versus hipótese que merece investigação.",
        "artifact": "timestamp,host,user,dns_query,answer,sni,http_status,bytes_out,proxy_category,process\n2026-07-01T12:00:00Z,ws-044,rafael,updates.vendor.example,198.51.100.50,updates.vendor.example,200,12000,software-update,agent.exe\n2026-07-01T12:03:20Z,ws-044,rafael,cdn-backup.example,198.51.100.77,cdn-backup.example,200,180000,cloud-storage,browser.exe\n2026-07-01T12:04:08Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,420,unknown,powershell.exe\n2026-07-01T12:04:38Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,418,unknown,powershell.exe",
        "analysisTask": "Aplicar a ideia de detecção: domain_rarity=high AND category=unknown AND repeat_interval_regular=true",
        "evidence": "DNS query log sintético | SNI/proxy log sintético | Processo/usuário | Falso positivo considerado",
        "expectedOutput": "ws-031 tem domínio raro, categoria desconhecida, processo incomum e repetição; é hipótese de investigação, não conclusão isolada.",
        "explanation": "O objetivo é treinar raciocínio defensivo usando metadados fictícios e seguros, sem execução ofensiva nem interação com infraestrutura real."
      },
      {
        "number": 17,
        "title": "Separar fato, hipótese e falso positivo",
        "instruction": "Crie uma tabela com três colunas: fatos observados no dataset, hipóteses defensivas e falsos positivos prováveis.",
        "analysisTask": "Classificar cada evidência como fato, inferência ou lacuna. Não declarar incidente sem correlação suficiente.",
        "expectedOutput": "Tabela com fatos, hipóteses, falsos positivos e próximos dados necessários.",
        "explanation": "Essa separação evita conclusões precipitadas e ensina investigação baseada em evidência."
      },
      {
        "number": 18,
        "title": "Construir mini timeline defensiva",
        "instruction": "Ordene os eventos sintéticos por horário e indique qual fonte confirma cada etapa.",
        "analysisTask": "Montar timeline com timestamp, fonte, evento, interpretação, confiança e próxima ação.",
        "expectedOutput": "Timeline curta capaz de sustentar decisão de contenção, hunting ou descarte como falso positivo.",
        "explanation": "Timeline é o elo entre log isolado e narrativa técnica defensável."
      }
    ],
    "expectedResult": "Dossiê com sinais DNS/HTTP/TLS, contexto, linha do tempo, hipótese, confiança, severidade, ação, rollback, reteste e prevenção.",
    "validation": [
      {
        "check": "A entrega deve provar que nenhum IOC foi tratado como certeza isolada e que toda ação proposta é proporcional e autorizada.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega deve provar que nenhum IOC foi tratado como certeza isolada e que toda ação proposta é proporcional e autorizada.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Escopo autorizado comprovado",
        "command": "Revisar ROE/checklist",
        "expected": "Alvos, janela, origem, ações permitidas, proibidas e critérios de parada estão documentados.",
        "ifFails": "Não executar o laboratório até formalizar escopo."
      },
      {
        "check": "Detecções com falso positivo tratado",
        "command": "Revisar tabela de detecção",
        "expected": "Cada detecção possui sinal, fonte de log, falso positivo provável e resposta.",
        "ifFails": "Adicionar contexto, exceções e enriquecimento antes de operacionalizar."
      },
      {
        "check": "Mitigação com rollback",
        "command": "Revisar plano de contenção",
        "expected": "Toda ação de contenção tem dono, impacto, retorno e validação.",
        "ifFails": "Trocar bloqueio amplo por ação específica e reversível."
      },
      {
        "check": "Dataset sintético analisado com evidência e falso positivo",
        "command": "Revisar relatório do laboratório",
        "expected": "O relatório contém dataset analisado, fatos, hipóteses, falsos positivos, timeline e contenção proporcional.",
        "ifFails": "Revisar o dataset e separar evidência objetiva de inferência antes de concluir."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se a análise virar lista de domínios, volte ao método: fonte, ativo, usuário, processo, horário, controle, baseline, evidência e impacto.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "O SOC abriu alerta durante o laboratório",
        "probableCause": "A atividade defensiva foi confundida com incidente ou estava fora da janela comunicada.",
        "howToConfirm": "Compare timestamp, origem e técnica com o ROE.",
        "fix": "Pausar execução, comunicar o ponto focal, registrar evidência e retomar apenas com autorização."
      },
      {
        "symptom": "O achado parece grave, mas há pouco contexto",
        "probableCause": "Falta enriquecimento de identidade, dono, criticidade, processo ou baseline.",
        "howToConfirm": "Verifique CMDB, IAM, EDR, janela de mudança e histórico do ativo.",
        "fix": "Classificar como hipótese até obter evidência suficiente."
      },
      {
        "symptom": "A mitigação proposta quebra serviço crítico",
        "probableCause": "Ação ampla demais ou dependência não mapeada.",
        "howToConfirm": "Cruze matriz de fluxos, dono do serviço e logs de uso.",
        "fix": "Criar contenção específica, exceção temporária ou tabletop antes de produção."
      }
    ],
    "improvements": [
      "Integrar logs DNS, proxy, WAF, EDR e flow logs no SIEM.",
      "Criar catálogo de SaaS e domínios aprovados com dono.",
      "Adicionar testes de TLS e headers em pipelines.",
      "Criar regra para domínios recém-vistos por ativos críticos.",
      "Revisar exceções de proxy e allowlists mensalmente.",
      "Converter achados repetíveis em detecções no SIEM/NDR.",
      "Adicionar owner, validade e revisão periódica para exceções.",
      "Automatizar validações defensivas em pipeline ou policy as code quando seguro.",
      "Criar runbook de resposta com evidências mínimas e rollback.",
      "Revisar retenção e qualidade dos logs necessários para investigação."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "Queries DNS",
      "Proxy/WAF metadata",
      "Certificado/SNI",
      "Processo de origem",
      "Timeline",
      "Decisão e justificativa",
      "DNS query log sintético",
      "SNI/proxy log sintético",
      "Processo/usuário",
      "Falso positivo considerado"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “DNS, HTTP/TLS e indicadores de comprometimento” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: playbook defensivo de IOC em DNS e HTTP/TLS",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Correlacionar nomes, certificados, SNI, códigos HTTP, user-agent, proxy e reputação para investigar sinais sem assumir culpa por um único indicador.",
    "authorizedScope": "Análise de logs e amostras sintéticas/autorizadas. Não acessar conteúdo privado, não interceptar tráfego real de usuários sem base legal e autorização.",
    "allowedActions": [
      "Consultar logs de DNS/proxy/WAF",
      "Validar certificado de destino autorizado",
      "Criar IOCs defensivos",
      "Correlacionar domínio, IP, SNI e processo"
    ],
    "prohibitedActions": [
      "Quebrar TLS de usuários sem autorização",
      "Baixar payload suspeito",
      "Interagir com infraestrutura maliciosa real",
      "Publicar dados sensíveis de logs"
    ],
    "telemetrySources": [
      "DNS query logs",
      "Proxy logs",
      "WAF/LB logs",
      "TLS SNI/cert metadata",
      "EDR process network events",
      "Threat intel interna",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Domínio recém-criado consultado por host interno",
        "signal": "Consulta DNS para domínio novo ou raro",
        "queryIdea": "domain_age<30d AND internal_hosts_count>0",
        "commonFalsePositive": "Serviço SaaS novo",
        "response": "Enriquecer com processo, usuário, proxy e volume antes de bloquear."
      },
      {
        "name": "SNI divergente do Host esperado",
        "signal": "Metadata TLS/HTTP inconsistente",
        "queryIdea": "tls_sni != http_host OR cert_cn mismatch",
        "commonFalsePositive": "CDN/proxy legítimo",
        "response": "Validar cadeia, destino e aplicação; bloquear se associado a evasão."
      },
      {
        "name": "User-Agent raro com beacon periódico",
        "signal": "Mesmo host faz requisições pequenas em intervalo fixo",
        "queryIdea": "stddev(interval)<threshold AND bytes_out small",
        "commonFalsePositive": "Health check legítimo",
        "response": "Correlacionar com processo e destino; isolar se suspeito."
      }
    ],
    "containmentActions": [
      "Bloquear domínio no DNS/proxy",
      "Adicionar detecção com janela e exceções",
      "Isolar endpoint somente com múltiplas evidências",
      "Preservar logs e amostras de metadata",
      "Notificar dono do sistema"
    ],
    "evidenceChecklist": [
      "Queries DNS",
      "Proxy/WAF metadata",
      "Certificado/SNI",
      "Processo de origem",
      "Timeline",
      "Decisão e justificativa"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — DNS raro, SNI e proxy",
      "theme": "DNS, HTTP/TLS e indicadores defensivos",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "timestamp,host,user,dns_query,answer,sni,http_status,bytes_out,proxy_category,process",
        "2026-07-01T12:00:00Z,ws-044,rafael,updates.vendor.example,198.51.100.50,updates.vendor.example,200,12000,software-update,agent.exe",
        "2026-07-01T12:03:20Z,ws-044,rafael,cdn-backup.example,198.51.100.77,cdn-backup.example,200,180000,cloud-storage,browser.exe",
        "2026-07-01T12:04:08Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,420,unknown,powershell.exe",
        "2026-07-01T12:04:38Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,418,unknown,powershell.exe"
      ],
      "analysisPrompt": "Correlacione DNS, SNI, categoria de proxy, processo e usuário. Classifique indicadores fracos versus hipótese que merece investigação.",
      "detectionIdea": "domain_rarity=high AND category=unknown AND repeat_interval_regular=true",
      "expectedFinding": "ws-031 tem domínio raro, categoria desconhecida, processo incomum e repetição; é hipótese de investigação, não conclusão isolada.",
      "evidenceToCollect": [
        "DNS query log sintético",
        "SNI/proxy log sintético",
        "Processo/usuário",
        "Falso positivo considerado"
      ],
      "constraints": [
        "Não executar tráfego contra destinos reais a partir do dataset.",
        "Tratar todos os nomes, IPs e usuários como fictícios.",
        "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
        "Preservar somente metadados necessários para o exercício."
      ]
    }
  },
  "exercises": [
    {
      "question": "Um domínio novo aparece em logs DNS de cinco estações. Quais perguntas vêm antes do bloqueio?",
      "answer": "Quais hosts, usuários e processos consultaram; se é fornecedor legítimo; se há ticket de mudança; volume; horário; proxy logs; EDR; reputação; impacto de bloqueio; e se existem outros sinais correlacionados."
    },
    {
      "question": "Por que certificado inválido não significa automaticamente comprometimento?",
      "answer": "Pode ser cadeia incompleta, relógio errado, proxy corporativo, rotação mal feita, certificado interno não confiável, ambiente de teste ou destino errado. Exige contexto."
    },
    {
      "question": "Qual diferença entre IOC e anomalia?",
      "answer": "IOC é pista associada a possível atividade maliciosa ou comprometimento; anomalia é desvio do baseline. Uma anomalia pode virar IOC com correlação e contexto."
    },
    {
      "question": "Como DevSecOps reduz risco em HTTP/TLS?",
      "answer": "Com validação de certificados, TLS mínimo, headers, WAF, logs, DNS correto, endpoints privados, testes sintéticos e policy as code antes do deploy."
    },
    {
      "id": "ex16.5.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “DNS, HTTP/TLS e indicadores defensivos” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como DNS query logs, Proxy logs, WAF/LB logs, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.5.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Quebrar TLS de usuários sem autorização: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Baixar payload suspeito: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Interagir com infraestrutura maliciosa real: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.5.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — DNS raro, SNI e proxy”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "ws-031 tem domínio raro, categoria desconhecida, processo incomum e repetição; é hipótese de investigação, não conclusão isolada. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual afirmação descreve melhor um IOC?",
      "options": [
        "Uma prova absoluta de comprometimento",
        "Uma pista técnica que precisa de contexto e correlação",
        "Um comando para bloqueio imediato",
        "Um substituto para investigação"
      ],
      "answer": 1,
      "explanation": "IOC é pista observável. Ele ganha valor com contexto, confiança e correlação."
    },
    {
      "question": "Qual sinal DNS deve ser analisado com cuidado defensivo?",
      "options": [
        "Domínio raro e recém-visto por ativo sensível",
        "Gateway padrão configurado",
        "Máscara de rede local",
        "Nome do switch de acesso"
      ],
      "answer": 0,
      "explanation": "Domínio raro e recém-visto pode ser sinal relevante, mas ainda exige contexto."
    },
    {
      "question": "Em HTTPS, qual limitação defensiva é importante?",
      "options": [
        "TLS sempre expõe todo conteúdo",
        "Criptografia pode limitar visibilidade de conteúdo fora de pontos autorizados",
        "DNS deixa de existir",
        "HTTP status nunca é registrado"
      ],
      "answer": 1,
      "explanation": "TLS protege conteúdo; defensores dependem de metadados, logs autorizados e endpoints de inspeção legítimos."
    },
    {
      "question": "Qual conjunto é mais útil para investigar um alerta web?",
      "options": [
        "Somente IP de destino",
        "DNS, proxy/WAF, flow logs, EDR, identidade e linha do tempo",
        "Apenas reputação externa",
        "Apenas print do navegador"
      ],
      "answer": 1,
      "explanation": "A força da investigação vem da correlação de múltiplas fontes."
    },
    {
      "question": "Qual ação é mais segura antes de bloquear um domínio compartilhado por CDN/SaaS?",
      "options": [
        "Bloquear imediatamente sem análise",
        "Verificar dependências, escopo, dono, impacto e alternativa de contenção",
        "Apagar logs para reduzir ruído",
        "Desabilitar TLS"
      ],
      "answer": 1,
      "explanation": "Domínios compartilhados podem sustentar serviços legítimos; bloqueio exige análise de impacto."
    },
    {
      "question": "Qual prática melhora detecção sem depender apenas de lista estática de IOCs?",
      "options": [
        "Baseline comportamental e correlação por ativo, usuário, processo e destino",
        "Ignorar DNS",
        "Permitir qualquer egress HTTPS",
        "Remover logs de proxy"
      ],
      "answer": 0,
      "explanation": "Detecção contextual reduz falsos positivos e aumenta a chance de identificar comportamento relevante."
    }
  ],
  "flashcards": [
    {
      "front": "IOC",
      "back": "Pista observável que pode indicar comprometimento, abuso ou risco, mas precisa de contexto."
    },
    {
      "front": "DNS como telemetria",
      "back": "Mostra intenção de resolver nomes e pode revelar domínio raro, NXDOMAIN, volume e padrão temporal."
    },
    {
      "front": "HTTP como telemetria",
      "back": "Quando visível por proxy, WAF ou aplicação, mostra método, path, status, User-Agent, volume e request ID."
    },
    {
      "front": "TLS como telemetria",
      "back": "Mostra certificado, cadeia, validade, SNI quando disponível, versão e falhas de handshake."
    },
    {
      "front": "Falso positivo",
      "back": "Sinal que parece suspeito, mas tem explicação legítima após contexto e evidência."
    },
    {
      "front": "Contenção proporcional",
      "back": "Ação defensiva que reduz risco com menor impacto possível e rollback planejado."
    }
  ],
  "mentorQuestions": [
    "Como você explicaria para um gestor por que um domínio suspeito não deve ser bloqueado sem análise de impacto?",
    "Quais campos mínimos você exigiria em um registro de IOC interno para que ele seja útil ao SOC?",
    "Como você desenharia uma detecção que combine DNS raro, processo incomum e egress HTTPS fora do baseline?"
  ],
  "challenge": {
    "title": "Desafio: playbook defensivo de IOC em DNS e HTTP/TLS",
    "scenario": "O SOC recebeu alerta de domínio recém-visto, conexões HTTPS periódicas e User-Agent incomum vindos de três endpoints. Você precisa investigar sem causar bloqueio indevido.",
    "tasks": [
      "Definir fontes autorizadas de evidência.",
      "Montar linha do tempo.",
      "Classificar sinais DNS, HTTP e TLS.",
      "Correlacionar usuário, endpoint, processo e destino.",
      "Definir confiança e severidade.",
      "Propor contenção proporcional e rollback.",
      "Criar melhoria preventiva para SIEM e DevSecOps."
    ],
    "successCriteria": [
      "Nenhum IOC tratado como prova isolada.",
      "A análise usa múltiplas fontes.",
      "A contenção considera impacto de negócio.",
      "Há plano de reteste e expiração de IOC.",
      "A melhoria preventiva reduz recorrência."
    ],
    "constraints": [
      "Não executar ações fora do escopo autorizado.",
      "Não usar dados sensíveis reais quando dados sintéticos ou metadados bastarem.",
      "Toda detecção deve citar falso positivo provável.",
      "Toda mitigação deve possuir rollback e comunicação.",
      "Usar somente dados sintéticos ou logs internos autorizados e sanitizados.",
      "Não interagir com infraestrutura real de terceiros a partir de IOCs ou nomes do exercício."
    ],
    "expectedDeliverables": [
      "Regras de engajamento ou escopo defensivo",
      "Matriz de telemetria e evidências",
      "Detecções com falsos positivos",
      "Plano de contenção e rollback",
      "Debrief com lições aprendidas",
      "Análise de dataset sintético",
      "Timeline defensiva com fatos e hipóteses",
      "Tabela de falsos positivos e próximos dados necessários"
    ],
    "gradingRubric": [
      {
        "criterion": "Ética, escopo e segurança operacional",
        "points": 20,
        "description": "Define claramente autorização, limites, ações proibidas, critérios de parada e proteção de evidências."
      },
      {
        "criterion": "Detecção e resposta defensiva",
        "points": 20,
        "description": "Cria detecções com telemetria adequada, falsos positivos, resposta proporcional e rollback."
      }
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução madura transforma sinais ambíguos em decisão defensiva por meio de correlação, baseline e ação proporcional.",
    "steps": [
      "Confirmar escopo e autorização.",
      "Normalizar timestamps.",
      "Coletar DNS, proxy/WAF, firewall, flow logs, EDR, identidade e aplicação.",
      "Separar anomalia operacional de possível IOC.",
      "Verificar dependências legítimas, SaaS e CDNs.",
      "Classificar confiança e severidade.",
      "Aplicar contenção mínima necessária com rollback.",
      "Retestar e ajustar detecção.",
      "Registrar falso positivo ou incidente confirmado.",
      "Atualizar playbook, baseline e pipeline.",
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonMistakes": [
      "Bloquear domínio compartilhado sem análise.",
      "Ignorar privacidade nos logs.",
      "Confiar apenas em reputação externa.",
      "Não verificar processo de origem.",
      "Não considerar DNS privado e Private Endpoint.",
      "Criar regra SIEM ruidosa sem baseline."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar teste ativo sem ROE porque é apenas laboratório",
        "whyItIsWrong": "Mesmo laboratório pode alcançar ativos errados, gerar alertas, coletar dados sensíveis ou ensinar um hábito inseguro. Segurança profissional começa por escopo."
      }
    ],
    "finalAnswer": "Complemento P1-M16: uma solução completa precisa demonstrar ética operacional, escopo autorizado, evidências protegidas, detecções com falsos positivos, contenção proporcional e melhoria contínua."
  },
  "glossary": [
    {
      "term": "Indicador de comprometimento",
      "definition": "Pista observável que pode sugerir comprometimento, abuso, configuração insegura ou atividade suspeita."
    },
    {
      "term": "Domínio recém-visto",
      "definition": "Domínio observado pela primeira vez em determinado ambiente, usuário ou ativo dentro de uma janela de análise."
    },
    {
      "term": "SNI",
      "definition": "Extensão TLS que permite indicar o nome do servidor durante a negociação, quando visível e aplicável."
    },
    {
      "term": "User-Agent",
      "definition": "Campo HTTP usado para identificar cliente ou software, útil como pista mas fácil de variar em ambientes legítimos."
    },
    {
      "term": "Falso positivo",
      "definition": "Alerta ou IOC que parece indicar risco, mas possui explicação legítima após análise."
    },
    {
      "term": "Contenção proporcional",
      "definition": "Ação de redução de risco calibrada para evidência, confiança, impacto e continuidade do negócio."
    },
    {
      "term": "Regras de engajamento",
      "shortDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "longDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.5",
        "16.12"
      ]
    },
    {
      "term": "NDR",
      "shortDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "longDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.5",
        "16.12"
      ]
    },
    {
      "term": "Pacote de evidências",
      "shortDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "longDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.5",
        "16.12"
      ]
    },
    {
      "term": "Dataset sintético",
      "shortDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "longDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "PCAP textual",
      "shortDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "longDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "Timeline de incidente",
      "shortDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "longDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    }
  ],
  "references": [
    {
      "title": "MITRE ATT&CK — Application Layer Protocol: DNS (T1071.004)",
      "url": "https://attack.mitre.org/techniques/T1071/004/",
      "type": "framework"
    },
    {
      "title": "MITRE ATT&CK — Command and Control tactic",
      "url": "https://attack.mitre.org/tactics/TA0011/",
      "type": "framework"
    },
    {
      "title": "RFC 9110 — HTTP Semantics",
      "url": "https://www.rfc-editor.org/info/rfc9110/",
      "type": "standard"
    },
    {
      "title": "RFC 8446 — TLS 1.3",
      "url": "https://www.rfc-editor.org/info/rfc8446/",
      "type": "standard"
    },
    {
      "title": "CISA — Encrypted DNS Implementation Guidance",
      "url": "https://www.cisa.gov/sites/default/files/2024-05/Encrypted%20DNS%20Implementation%20Guidance_508c.pdf",
      "type": "guidance"
    }
  ],
  "security": {
    "goodPractices": [
      "Executar atividades práticas apenas em laboratório, ambiente próprio ou escopo formalmente autorizado.",
      "Registrar regras de engajamento, janelas de teste, alvos permitidos e contatos de emergência.",
      "Priorizar validação defensiva: logs, detecção, contenção, mitigação e redução de superfície.",
      "Evitar instruções que ensinem abuso contra redes reais fora de autorização explícita.",
      "Conectar cada técnica estudada a controles de prevenção, monitoramento e resposta.",
      "Definir escopo, autorização, janela, origem dos testes e critérios de parada antes de qualquer validação.",
      "Tratar logs e evidências como dados sensíveis, com mínimo necessário, retenção definida e controle de acesso.",
      "Correlacionar rede, identidade, endpoint e cloud antes de concluir causa ou gravidade.",
      "Preferir mitigação específica, reversível e documentada em vez de bloqueios amplos.",
      "Transformar achados recorrentes em detecções, runbooks e controles automatizados."
    ],
    "badPractices": [
      "Testar redes, serviços ou terceiros sem autorização formal e escopo definido.",
      "Confundir laboratório educacional com permissão para atuar em ambiente real.",
      "Guardar credenciais, PCAPs ou logs sensíveis sem proteção e sem necessidade.",
      "Publicar detalhes exploráveis sem mitigação, contexto defensivo ou autorização.",
      "Executar varreduras agressivas sem janela, rate limit, owner e plano de rollback.",
      "Executar teste ativo sem regras de engajamento formalizadas.",
      "Confundir validação defensiva com permissão para exploração.",
      "Usar ferramenta de segurança sem entender impacto, taxa, escopo e logs gerados.",
      "Bloquear ativos críticos sem plano de rollback e comunicação.",
      "Registrar achado sem evidência reproduzível."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar segurança de redes, Blue Team, pentest autorizado, detecção, resposta e limites éticos com impacto operacional, financeiro e de segurança.",
      "Concluir incidente a partir de um único IOC sem contexto.",
      "Ignorar falsos positivos de ferramentas corporativas legítimas.",
      "Não preservar timestamp, fonte e integridade mínima da evidência.",
      "Criar regra de firewall ou SIEM sem dono, validade e revisão.",
      "Testar fora da janela aprovada por parecer tecnicamente simples."
    ],
    "vulnerabilities": [
      {
              "name": "Risco Blue Team específico — DNS, HTTP/TLS e indicadores de comprometimento",
              "description": "Em DNS, HTTP/TLS e indicadores de comprometimento, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
              "defensiveExplanation": "O risco aparece quando datasets, PCAPs, flow logs e indicadores são analisados sem baseline, autorização, falso positivo, cadeia mínima de evidência ou contenção proporcional.",
              "mitigation": "Usar datasets sintéticos ou logs autorizados e sanitizados, definir ROE, preservar evidências, correlacionar múltiplas fontes, documentar falso positivo e aplicar mitigação reversível e proporcional."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      },
      {
        "name": "Validação defensiva sem escopo formal",
        "description": "Mesmo atividades de Blue Team podem causar impacto, expor dados ou violar regras quando não há escopo, janela, alvos e critérios de parada documentados.",
        "defensiveExplanation": "O risco não está apenas na técnica, mas na ausência de governança operacional. Segurança profissional exige autorização, evidência e proporcionalidade.",
        "mitigation": "Criar ROE, comunicar SOC/NOC, limitar taxa e escopo, preservar logs e definir rollback antes da execução."
      }
    ],
    "monitoring": [
      "Logs de firewall, proxy, DNS, DHCP, VPN, EDR, NDR, SIEM, NetFlow/IPFIX e autenticação.",
      "Alertas de varredura, beaconing, conexões laterais, exfiltração e anomalias de volume.",
      "Evidências de escopo autorizado, horários de teste e owners dos ativos analisados.",
      "DNS query logs",
      "Proxy logs",
      "WAF/LB logs",
      "TLS SNI/cert metadata",
      "EDR process network events",
      "Threat intel interna"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.5.",
      "Domínio recém-criado consultado por host interno — sinal: Consulta DNS para domínio novo ou raro; ideia de consulta: domain_age<30d AND internal_hosts_count>0; falso positivo comum: Serviço SaaS novo.",
      "SNI divergente do Host esperado — sinal: Metadata TLS/HTTP inconsistente; ideia de consulta: tls_sni != http_host OR cert_cn mismatch; falso positivo comum: CDN/proxy legítimo.",
      "User-Agent raro com beacon periódico — sinal: Mesmo host faz requisições pequenas em intervalo fixo; ideia de consulta: stddev(interval)<threshold AND bytes_out small; falso positivo comum: Health check legítimo."
    ],
    "ethicalLimits": {
      "authorizedScope": "Análise de logs e amostras sintéticas/autorizadas. Não acessar conteúdo privado, não interceptar tráfego real de usuários sem base legal e autorização.",
      "allowedActions": [
        "Consultar logs de DNS/proxy/WAF",
        "Validar certificado de destino autorizado",
        "Criar IOCs defensivos",
        "Correlacionar domínio, IP, SNI e processo"
      ],
      "prohibitedActions": [
        "Quebrar TLS de usuários sem autorização",
        "Baixar payload suspeito",
        "Interagir com infraestrutura maliciosa real",
        "Publicar dados sensíveis de logs"
      ],
      "stopConditions": [
        "Indício de impacto em produção não previsto.",
        "Alvo, técnica ou origem fora do escopo aprovado.",
        "Coleta acidental de dado sensível além do mínimo necessário.",
        "Alerta do SOC/NOC indicando risco operacional.",
        "Ausência de responsável disponível para decisão."
      ]
    }
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a DNS, HTTP/TLS e indicadores de comprometimento.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 16.5?"
    ],
    "commands": [
      {
        "platform": "Defensivo/SIEM",
        "command": "consultar logs de firewall, DNS, proxy, VPN, EDR e NetFlow dentro do escopo autorizado",
        "purpose": "Validar evidências de comportamento suspeito ou de teste controlado.",
        "expectedObservation": "Eventos correlacionados por origem, destino, horário, usuário e ação.",
        "interpretation": "Sem correlação temporal e escopo, a evidência pode ser ruído ou falso positivo."
      },
      {
        "platform": "Linux laboratório",
        "command": "ss -tulpen && ip route && tcpdump -ni <iface> host <ip_autorizado>",
        "purpose": "Observar serviços, rotas e pacotes apenas em ambiente autorizado.",
        "expectedObservation": "Tráfego compatível com o cenário de laboratório.",
        "interpretation": "Pacotes fora do esperado indicam hipótese defensiva para investigação, não autorização para atacar terceiros."
      },
      {
        "platform": "Blue Team",
        "command": "documentar IOC, hipótese, fonte de log, severidade, impacto e mitigação",
        "purpose": "Transformar observação técnica em investigação defensiva acionável.",
        "expectedObservation": "Registro claro, reprodutível e útil para resposta.",
        "interpretation": "Achados sem contexto e mitigação não amadurecem a defesa."
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
      "16.6"
    ]
  },
  "blueTeamEnhancement": {
    "title": "DNS, HTTP/TLS e indicadores defensivos",
    "defensiveGoal": "Correlacionar nomes, certificados, SNI, códigos HTTP, user-agent, proxy e reputação para investigar sinais sem assumir culpa por um único indicador.",
    "authorizedScope": "Análise de logs e amostras sintéticas/autorizadas. Não acessar conteúdo privado, não interceptar tráfego real de usuários sem base legal e autorização.",
    "allowedActions": [
      "Consultar logs de DNS/proxy/WAF",
      "Validar certificado de destino autorizado",
      "Criar IOCs defensivos",
      "Correlacionar domínio, IP, SNI e processo"
    ],
    "prohibitedActions": [
      "Quebrar TLS de usuários sem autorização",
      "Baixar payload suspeito",
      "Interagir com infraestrutura maliciosa real",
      "Publicar dados sensíveis de logs"
    ],
    "telemetrySources": [
      "DNS query logs",
      "Proxy logs",
      "WAF/LB logs",
      "TLS SNI/cert metadata",
      "EDR process network events",
      "Threat intel interna"
    ],
    "detectionEngineering": [
      {
        "name": "Domínio recém-criado consultado por host interno",
        "signal": "Consulta DNS para domínio novo ou raro",
        "queryIdea": "domain_age<30d AND internal_hosts_count>0",
        "commonFalsePositive": "Serviço SaaS novo",
        "response": "Enriquecer com processo, usuário, proxy e volume antes de bloquear."
      },
      {
        "name": "SNI divergente do Host esperado",
        "signal": "Metadata TLS/HTTP inconsistente",
        "queryIdea": "tls_sni != http_host OR cert_cn mismatch",
        "commonFalsePositive": "CDN/proxy legítimo",
        "response": "Validar cadeia, destino e aplicação; bloquear se associado a evasão."
      },
      {
        "name": "User-Agent raro com beacon periódico",
        "signal": "Mesmo host faz requisições pequenas em intervalo fixo",
        "queryIdea": "stddev(interval)<threshold AND bytes_out small",
        "commonFalsePositive": "Health check legítimo",
        "response": "Correlacionar com processo e destino; isolar se suspeito."
      }
    ],
    "ndrSiemMapping": {
      "minimumFields": [
        "timestamp",
        "src_ip",
        "src_zone",
        "src_user_or_identity",
        "dst_ip",
        "dst_fqdn",
        "dst_port",
        "protocol",
        "action",
        "bytes_in",
        "bytes_out",
        "device_or_sensor",
        "rule_or_policy",
        "correlation_id"
      ],
      "enrichment": [
        "CMDB owner",
        "criticidade do ativo",
        "zona de rede",
        "identidade",
        "geolocalização aproximada",
        "categoria do destino",
        "janela de mudança"
      ],
      "retentionGuidance": "Manter metadados de rede por tempo compatível com investigação, auditoria e requisitos legais. Evitar armazenar conteúdo sensível quando metadados bastam."
    },
    "containmentPlaybook": [
      "Bloquear domínio no DNS/proxy",
      "Adicionar detecção com janela e exceções",
      "Isolar endpoint somente com múltiplas evidências",
      "Preservar logs e amostras de metadata",
      "Notificar dono do sistema"
    ],
    "evidencePackage": [
      "Queries DNS",
      "Proxy/WAF metadata",
      "Certificado/SNI",
      "Processo de origem",
      "Timeline",
      "Decisão e justificativa"
    ],
    "successCriteria": [
      "O escopo autorizado está explícito e verificável.",
      "As ações proibidas estão documentadas antes de qualquer teste.",
      "Cada achado possui evidência, fonte, horário e interpretação.",
      "A detecção proposta possui hipótese, campo de log, falso positivo provável e resposta.",
      "A mitigação é proporcional, reversível e não cria risco maior que o problema."
    ],
    "debriefQuestions": [
      "Que evidência permitiria defender essa conclusão em uma revisão técnica?",
      "Qual falso positivo mais provável precisa ser tratado?",
      "Qual ação de contenção reduziria risco sem destruir evidência?",
      "O que deve virar controle contínuo depois do laboratório?"
    ]
  },
  "blueTeamSyntheticDataset": {
    "title": "Dataset sintético — DNS raro, SNI e proxy",
    "theme": "DNS, HTTP/TLS e indicadores defensivos",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "timestamp,host,user,dns_query,answer,sni,http_status,bytes_out,proxy_category,process",
      "2026-07-01T12:00:00Z,ws-044,rafael,updates.vendor.example,198.51.100.50,updates.vendor.example,200,12000,software-update,agent.exe",
      "2026-07-01T12:03:20Z,ws-044,rafael,cdn-backup.example,198.51.100.77,cdn-backup.example,200,180000,cloud-storage,browser.exe",
      "2026-07-01T12:04:08Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,420,unknown,powershell.exe",
      "2026-07-01T12:04:38Z,ws-031,svc-build,a1b2c3d4.lab-tunnel.example,203.0.113.77,a1b2c3d4.lab-tunnel.example,204,418,unknown,powershell.exe"
    ],
    "analysisPrompt": "Correlacione DNS, SNI, categoria de proxy, processo e usuário. Classifique indicadores fracos versus hipótese que merece investigação.",
    "detectionIdea": "domain_rarity=high AND category=unknown AND repeat_interval_regular=true",
    "expectedFinding": "ws-031 tem domínio raro, categoria desconhecida, processo incomum e repetição; é hipótese de investigação, não conclusão isolada.",
    "evidenceToCollect": [
      "DNS query log sintético",
      "SNI/proxy log sintético",
      "Processo/usuário",
      "Falso positivo considerado"
    ],
    "constraints": [
      "Não executar tráfego contra destinos reais a partir do dataset.",
      "Tratar todos os nomes, IPs e usuários como fictícios.",
      "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
      "Preservar somente metadados necessários para o exercício."
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    }
  ]
};
