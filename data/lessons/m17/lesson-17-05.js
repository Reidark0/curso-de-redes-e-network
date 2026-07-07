export const lesson1705 = {
  "id": "17.5",
  "moduleId": "m17",
  "order": 5,
  "title": "Simulado III: HTTP/TLS, Firewalls, VPN e Roteamento",
  "subtitle": "Avaliação comentada para revisar publicação de serviços, criptografia TLS, políticas de firewall, túneis VPN, roteamento, retorno e evidências de troubleshooting.",
  "duration": "190-300 min",
  "estimatedStudyTimeMinutes": 300,
  "difficulty": "intermediário-avançado",
  "type": "simulado",
  "xp": 300,
  "tags": [
    "simulado",
    "HTTP",
    "HTTPS",
    "TLS",
    "firewall",
    "ACL",
    "VPN",
    "roteamento",
    "WAF",
    "proxy",
    "load balancer",
    "troubleshooting",
    "revisão",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão",
    "relatório de lacunas",
    "simulado por bloco"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.4",
      "reason": "O Simulado II revisou DNS, TCP/UDP e NAT, base direta para HTTP/TLS, firewalls, VPN e roteamento."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "O módulo de troubleshooting ensina HTTP/TLS, firewall, VPN, cloud networking e análise de pacotes."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking fornece contexto de load balancers, WAF, private endpoints, VPN/BGP e route tables."
    }
  ],
  "objectives": [
    "Avaliar domínio diagnóstico de HTTP, HTTPS, TLS, firewalls, VPN e roteamento.",
    "Diferenciar falhas de aplicação, proxy, WAF, certificado, política, túnel, rota e retorno.",
    "Interpretar sintomas como 403, 404, 502, 503, 504, TLS alert, timeout e reset.",
    "Construir matriz de fluxo origem-destino-protocolo-porta-política-rota.",
    "Transformar erros do simulado em plano de revisão e mini laboratórios.",
    "Reforçar postura segura: alteração mínima, aprovada, observável e reversível."
  ],
  "learningOutcomes": [
    "Explicar a sequência DNS, TCP, TLS e HTTP em um acesso web.",
    "Distinguir status HTTP de falha de rede e falha TLS.",
    "Interpretar logs de firewall, WAF, load balancer, proxy e VPN.",
    "Identificar efeitos de rota mais específica, assimetria e rota de retorno.",
    "Diagnosticar VPN conectada sem acesso funcional usando evidências.",
    "Criar plano de correção do simulado com lacunas e reteste."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Este simulado existe porque boa parte dos incidentes e chamados corporativos acontece exatamente na fronteira entre aplicação, criptografia, política de rede, túnel e rota. Quando um serviço web falha, o problema pode estar no DNS, no TCP, no certificado, no SNI, no WAF, no proxy, no load balancer, no backend, no firewall, na VPN, na rota de retorno ou na política de acesso. O profissional de redes precisa conseguir separar esses domínios sem cair na frase genérica: <em>está fora</em>.</p>\n<p>A aula 17.5 avalia se você consegue diagnosticar a cadeia HTTP/TLS, interpretar sintomas de firewall, diferenciar problemas de VPN e explicar por que o roteamento pode estar correto em um sentido e errado no retorno. O objetivo não é decorar respostas. O objetivo é treinar raciocínio profissional sob pressão.</p>\n<div class=\"callout callout--info\"><strong>Ideia central:</strong> HTTP/TLS, firewall, VPN e roteamento raramente falham isoladamente. O diagnóstico bom reconstrói o fluxo ponta a ponta.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>HTTP nasceu como protocolo simples para troca de documentos, mas se tornou a base de APIs, portais, autenticação federada, aplicações internas, SaaS, serviços cloud e pipelines. TLS evoluiu para proteger confidencialidade, integridade e autenticação em comunicações cliente-servidor. Firewalls surgiram para controlar tráfego entre zonas com posturas de segurança diferentes. VPNs permitiram conectar redes e usuários por túneis sobre infraestruturas não confiáveis. O roteamento continuou sendo o mecanismo que decide por onde os pacotes seguem.</p>\n<p>Com cloud, DevSecOps e Zero Trust, esses conceitos ficaram mais distribuídos. Um mesmo acesso pode passar por CDN, WAF, load balancer, proxy, firewall de borda, security group, service mesh, private endpoint, VPN e rota propagada por BGP. Isso tornou o troubleshooting mais poderoso, mas também mais complexo.</p>\n<ul><li><strong>HTTP:</strong> entrega semântica de requisição e resposta.</li><li><strong>TLS:</strong> protege a sessão e valida identidade criptográfica.</li><li><strong>Firewall:</strong> aplica política entre zonas, origens, destinos e portas.</li><li><strong>VPN:</strong> cria caminho lógico sobre rede compartilhada.</li><li><strong>Roteamento:</strong> decide próximo salto e retorno do fluxo.</li></ul>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema central deste bloco é que sintomas de camadas diferentes parecem iguais para o usuário. O navegador mostra erro. A API retorna 502. O cliente VPN conecta, mas não acessa. O ping funciona, mas HTTPS falha. A rota aparece na tabela, mas o retorno não volta. O WAF bloqueia uma chamada que o firewall permitiu. A aplicação responde 403, mas a equipe de rede é acionada como se fosse bloqueio de porta.</p>\n<p>Este simulado força o aluno a separar evidências. Status HTTP não é o mesmo que handshake TLS. Handshake TLS não é o mesmo que autorização da aplicação. Regra de firewall permitindo ida não garante retorno. Túnel VPN ativo não garante DNS, rota, política e permissão. Rota default não substitui rota mais específica.</p>\n<ul><li><strong>Erro comum:</strong> ver 403 e abrir firewall, quando o problema é autorização ou WAF.</li><li><strong>Erro comum:</strong> ver certificado inválido e investigar roteamento.</li><li><strong>Erro comum:</strong> ver VPN conectada e concluir que toda rede privada está acessível.</li><li><strong>Erro comum:</strong> ignorar assimetria e rota de retorno.</li><li><strong>Erro comum:</strong> liberar regra ampla sem evidência, dono, prazo e rollback.</li></ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>Este simulado evolui do acesso web para a arquitetura corporativa. Primeiro, revisa HTTP e códigos de resposta. Depois, introduz TLS como etapa própria, com certificado, SAN, cadeia, SNI e versões. Em seguida, testa firewall, ACL e políticas stateful/stateless. Depois, aborda VPN, túnel, autenticação, rotas empurradas, split/full tunnel, MTU e BGP. Por fim, integra roteamento e retorno.</p>\n<p>A maturidade esperada é perceber que cada sintoma tem evidência própria. Um 502 aponta para proxy/load balancer/backend. Um 503 pode indicar indisponibilidade ou health check falhando. Um 504 sugere timeout entre intermediários. Um erro de certificado aponta para identidade TLS. Um túnel IPsec up com tráfego down aponta para rota, política, NAT, ACL ou retorno.</p>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p>O Simulado III é uma avaliação diagnóstica de serviços publicados, políticas de rede, túneis e caminhos. Ele mede se você consegue responder: <strong>em qual etapa o fluxo parou?</strong> Para isso, você precisa desenhar origem, destino, nome, IP, porta, protocolo, proxy, TLS, política, rota, tradução, retorno e logs.</p>\n<p>O conceito central é <strong>cadeia de publicação e caminho efetivo</strong>. Um serviço web publicado pode depender de DNS público, CDN, WAF, load balancer, certificado, backend pool, rota, firewall, health check e aplicação. Uma VPN pode depender de identidade, postura, perfil, pool, DNS interno, rotas, firewall, NAT e retorno. O simulado usa cenários para avaliar essa cadeia.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Em um fluxo HTTPS típico, o cliente resolve DNS, abre conexão TCP com o destino, negocia TLS, valida certificado, envia requisição HTTP e recebe uma resposta com status e corpo. Intermediários podem terminar TLS, recriptografar, preservar ou alterar headers, aplicar WAF, balancear backends e gerar logs. Firewalls avaliam política conforme estado, origem, destino, porta, aplicação ou identidade. VPNs encapsulam tráfego em túneis e precisam que rotas e políticas incluam os prefixos corretos.</p>\n<p>O roteamento escolhe o próximo salto com base na tabela e na rota mais específica. Isso vale para cliente, gateway, firewall, cloud route table, túnel VPN e destino. Em muitos incidentes, o pacote vai, mas a resposta retorna por outro caminho, é descartada por um firewall stateful, perde NAT state ou não encontra rota de volta.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>A arquitetura avaliada nesta aula combina usuário, DNS, proxy/CDN/WAF, load balancer, firewall, VPN, roteadores, subnets privadas e aplicação. Ela também inclui fontes de evidência: logs HTTP, TLS, WAF, LB, firewall, VPN, flow logs, DNS logs, auditoria cloud e SIEM.</p>\n<p>Em empresas maduras, o troubleshooting não depende de acesso irrestrito aos equipamentos. Ele depende de desenho, matriz de fluxos, logs preservados, correlação temporal e mudanças controladas. A arquitetura do diagnóstico precisa ser tão planejada quanto a arquitetura da rede.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Pense em um prédio corporativo com recepção, crachá, catraca, elevador, portas internas e salas. HTTP é a conversa no balcão. TLS é a conferência do documento e a conversa protegida. O firewall é a catraca que permite ou nega passagem. A VPN é um corredor privado temporário para quem está fora do prédio. O roteamento é a sinalização que diz por qual corredor seguir.</p>\n<p>Se a pessoa não chega à recepção, talvez seja rota ou firewall. Se chega, mas o documento é inválido, é TLS/certificado. Se passa pela recepção, mas recebe “não autorizado”, pode ser WAF ou aplicação. Se entra pelo corredor VPN, mas não acha a sala, pode ser DNS interno ou rota empurrada ausente.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Um usuário acessa <code>https://portal.empresa.local</code> e recebe erro de certificado. O DNS resolve, a porta 443 responde, mas o nome no certificado não corresponde ao host acessado. O problema não é firewall nem rota. A evidência principal está na cadeia TLS: SAN, CN, validade, emissora e SNI.</p>\n<p>Outro usuário conecta na VPN, mas não acessa <code>10.20.30.40:443</code>. O túnel aparece conectado. Isso não prova conectividade ao recurso. É preciso verificar se a rota para <code>10.20.30.0/24</code> foi instalada, se o firewall permite origem do pool VPN, se existe rota de retorno e se o serviço escuta na porta correta.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa publica um sistema interno por proxy reverso e WAF. Após mudança de certificado e backend pool, usuários recebem 502. O DNS resolve corretamente e TLS termina no proxy. O WAF permite a requisição. O load balancer, porém, marca todos os backends como unhealthy porque o health check usa caminho antigo. A correção não é abrir firewall, mas alinhar health check, backend e rota de aplicação.</p>\n<p>Em outro cenário, uma filial acessa matriz por VPN IPsec. O túnel está up, BGP anuncia prefixos, mas apenas algumas aplicações falham. A análise mostra MTU/MSS inadequado para tráfego encapsulado e sessões TLS grandes. A mitigação envolve ajuste controlado de MSS, validação por aplicação e documentação no playbook.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Na cloud, um Application Load Balancer recebe tráfego HTTPS público, termina TLS, aplica regras e encaminha para workloads privados. A falha pode estar no security group do LB, no security group do backend, no target group, no health check, na rota da subnet, no WAF, no certificado gerenciado, no DNS público ou na aplicação.</p>\n<p>Quando há conectividade híbrida, uma aplicação na VPC/VNet pode depender de VPN ou link dedicado para consultar um serviço on-premises. Túnel ativo não significa que DNS privado, rota de retorno, firewall on-premises e política cloud estejam corretos. Flow logs e ferramentas de reachability ajudam, mas precisam ser interpretados junto com logs de aplicação.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, falhas HTTP/TLS e VPN aparecem em pipelines, runners privados, deploys em clusters e testes sintéticos. Uma pipeline pode falhar porque o runner não tem rota para um endpoint privado, porque o proxy corporativo exige autenticação, porque o certificado interno não está na trust store do container ou porque uma regra de egress bloqueia o repositório.</p>\n<p>O simulado reforça que pipelines devem validar DNS, TLS, reachability, portas e políticas antes do deploy. Também devem impedir mudanças perigosas, como publicação HTTP sem TLS, certificado sem SAN correto, regra <code>0.0.0.0/0</code> sem justificativa ou VPN sem segmentação.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de segurança, HTTP/TLS, firewall, VPN e roteamento são fontes de controle e evidência. Logs de proxy e WAF ajudam a investigar abuso. Logs TLS podem apontar versões fracas ou certificado inesperado. Logs de firewall mostram negações, resets e sessão. Logs de VPN mostram usuário, grupo, MFA, origem e perfil. Flow logs ajudam a reconstruir fluxo e volume.</p>\n<p>O risco está em confundir troubleshooting com enfraquecimento de segurança. Desativar WAF, ignorar certificado, liberar portas administrativas, ampliar VPN para toda rede ou remover inspeção de egress pode resolver o sintoma e criar incidente maior. O padrão correto é mitigação mínima, aprovada, temporária, monitorada e com rollback.</p>\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG — Caminho efetivo web, firewall, VPN e rota</h2>\n  <div class=\"diagram-wrapper\">\n    <svg class=\"lesson-svg\" viewBox=\"0 0 1180 620\" role=\"img\" aria-labelledby=\"title1705 desc1705\">\n      <title id=\"title1705\">Simulado III de fluxo HTTP/TLS, firewall, VPN e roteamento</title>\n      <desc id=\"desc1705\">Diagrama mostra cliente, DNS, proxy, TLS, WAF, load balancer, firewall, VPN, rotas, backend e SIEM.</desc>\n      <defs><marker id=\"arrow1705\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\"><path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-fill-primary\" /></marker></defs>\n      <rect x=\"30\" y=\"40\" width=\"1120\" height=\"520\" rx=\"24\" class=\"svg-surface\" />\n      <g class=\"svg-node\"><rect x=\"70\" y=\"120\" width=\"140\" height=\"90\" rx=\"14\"/><text x=\"140\" y=\"155\" text-anchor=\"middle\">Cliente</text><text x=\"140\" y=\"180\" text-anchor=\"middle\">Browser/API</text></g>\n      <g class=\"svg-node\"><rect x=\"260\" y=\"80\" width=\"140\" height=\"80\" rx=\"14\"/><text x=\"330\" y=\"115\" text-anchor=\"middle\">DNS</text><text x=\"330\" y=\"138\" text-anchor=\"middle\">público/privado</text></g>\n      <g class=\"svg-node\"><rect x=\"260\" y=\"220\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"335\" y=\"255\" text-anchor=\"middle\">Proxy/WAF</text><text x=\"335\" y=\"280\" text-anchor=\"middle\">TLS + logs</text></g>\n      <g class=\"svg-node\"><rect x=\"470\" y=\"220\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"545\" y=\"255\" text-anchor=\"middle\">Load Balancer</text><text x=\"545\" y=\"280\" text-anchor=\"middle\">health check</text></g>\n      <g class=\"svg-node\"><rect x=\"680\" y=\"220\" width=\"140\" height=\"90\" rx=\"14\"/><text x=\"750\" y=\"255\" text-anchor=\"middle\">Firewall</text><text x=\"750\" y=\"280\" text-anchor=\"middle\">stateful</text></g>\n      <g class=\"svg-node\"><rect x=\"900\" y=\"190\" width=\"170\" height=\"120\" rx=\"14\"/><text x=\"985\" y=\"230\" text-anchor=\"middle\">Backend</text><text x=\"985\" y=\"255\" text-anchor=\"middle\">serviço</text><text x=\"985\" y=\"280\" text-anchor=\"middle\">HTTP/TLS</text></g>\n      <g class=\"svg-node\"><rect x=\"470\" y=\"400\" width=\"160\" height=\"90\" rx=\"14\"/><text x=\"550\" y=\"435\" text-anchor=\"middle\">VPN</text><text x=\"550\" y=\"460\" text-anchor=\"middle\">rotas/túnel</text></g>\n      <g class=\"svg-node\"><rect x=\"700\" y=\"400\" width=\"160\" height=\"90\" rx=\"14\"/><text x=\"780\" y=\"435\" text-anchor=\"middle\">Roteamento</text><text x=\"780\" y=\"460\" text-anchor=\"middle\">ida + retorno</text></g>\n      <g class=\"svg-node\"><rect x=\"940\" y=\"400\" width=\"150\" height=\"90\" rx=\"14\"/><text x=\"1015\" y=\"435\" text-anchor=\"middle\">SIEM</text><text x=\"1015\" y=\"460\" text-anchor=\"middle\">correlação</text></g>\n      <line x1=\"210\" y1=\"160\" x2=\"260\" y2=\"120\" class=\"svg-line\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"210\" y1=\"185\" x2=\"260\" y2=\"250\" class=\"svg-line\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"410\" y1=\"265\" x2=\"470\" y2=\"265\" class=\"svg-line\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"620\" y1=\"265\" x2=\"680\" y2=\"265\" class=\"svg-line\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"820\" y1=\"265\" x2=\"900\" y2=\"250\" class=\"svg-line\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"550\" y1=\"400\" x2=\"550\" y2=\"310\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"780\" y1=\"400\" x2=\"760\" y2=\"310\" class=\"svg-line svg-line--dashed\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"820\" y1=\"445\" x2=\"940\" y2=\"445\" class=\"svg-line\" marker-end=\"url(#arrow1705)\" />\n      <line x1=\"410\" y1=\"285\" x2=\"940\" y2=\"430\" class=\"svg-line svg-line--muted\" marker-end=\"url(#arrow1705)\" />\n      <text x=\"590\" y=\"570\" text-anchor=\"middle\" class=\"svg-caption\">Diagnóstico: nome → TCP → TLS → HTTP → política → túnel → rota → retorno → logs</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam interpretação de sintomas. O objetivo é explicar o que um erro significa, o que ele não prova e qual evidência deve ser coletada antes de alterar política ou rota.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma falha corporativa em aplicação publicada e acesso remoto. Você deve montar a linha do tempo, separar hipóteses, coletar evidências e propor mitigação segura.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada privilegia raciocínio por fluxo: primeiro nome e IP, depois TCP, TLS, HTTP, políticas, túnel, roteamento e retorno. Nenhuma liberação ampla deve ser proposta sem escopo e rollback.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>HTTP/TLS, firewalls, VPNs e roteamento formam o núcleo de muitos diagnósticos corporativos. O profissional maduro entende que um status HTTP, um erro TLS, uma negação de firewall, uma VPN conectada ou uma rota presente são apenas evidências parciais. A conclusão nasce da correlação.</p>\n<ul><li>HTTP mostra semântica da resposta.</li><li>TLS valida identidade e protege sessão.</li><li>Firewall aplica política e estado.</li><li>VPN cria caminho lógico, mas não garante acesso completo.</li><li>Roteamento precisa ser validado na ida e no retorno.</li></ul>\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C05</td><td>HTTP, TLS, proxy, firewall, VPN e publicação segura</td><td>75%</td><td>90%</td><td>interpreta erros de aplicação/rede e propõe controles com rollback</td></tr><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, <strong>17.6 — Simulado IV: Wireless, Segurança, Cloud e Troubleshooting</strong>, você revisará os temas mais avançados do curso: Wi-Fi corporativo, segurança defensiva, cloud networking, observabilidade e troubleshooting integrado.</p>\n</section>"
  },
  "diagramNotes": "O SVG destaca que o diagnóstico profissional acompanha o fluxo por nome, porta, TLS, HTTP, políticas, VPN, rotas e logs.",
  "quiz": [
    {
      "id": "q17.5.01",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um usuário recebe HTTP 403 ao acessar uma aplicação publicada. Qual interpretação é mais defensável antes de alterar firewall?",
      "opts": [
        "A porta TCP está necessariamente bloqueada",
        "O servidor ou intermediário entendeu a requisição e negou autorização ou política",
        "O DNS falhou antes da conexão",
        "O túnel VPN caiu"
      ],
      "a": 1,
      "exp": "403 é resposta HTTP. Isso sugere que a requisição chegou a algum componente HTTP, como aplicação, proxy ou WAF, e foi negada por política/autorização.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.02",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um cliente recebe erro de certificado porque o nome acessado não está no SAN. Qual camada/tema está mais diretamente envolvido?",
      "opts": [
        "ARP",
        "TLS e identidade do certificado",
        "DHCP relay",
        "NAT de saída"
      ],
      "a": 1,
      "exp": "A validação do nome do certificado ocorre na camada TLS/PKI. Firewall pode permitir a conexão e ainda assim TLS falhar por identidade incorreta.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.03",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em um fluxo web, qual sintoma é mais associado a load balancer/proxy sem resposta adequada do backend?",
      "opts": [
        "NXDOMAIN",
        "HTTP 502/503/504 dependendo do caso",
        "ARP incomplete",
        "DHCP Discover sem Offer"
      ],
      "a": 1,
      "exp": "502, 503 e 504 costumam envolver gateway/proxy/LB/backend/health check/timeout, embora a causa exata dependa dos logs.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.04",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Uma VPN de acesso remoto mostra 'conectada', mas o usuário não acessa rede interna. Qual evidência deve ser verificada?",
      "opts": [
        "Apenas se o cabo está conectado",
        "Rotas instaladas, DNS entregue, perfil/grupo, política de firewall e retorno",
        "Somente se o site público abre",
        "Apenas o número de série do notebook"
      ],
      "a": 1,
      "exp": "Túnel conectado não garante autorização, rotas, DNS, firewall e retorno. O diagnóstico exige validar todos esses elementos.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.05",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Uma conexão TCP chega ao firewall e é permitida na ida, mas a resposta volta por outro caminho. Que problema isso pode causar?",
      "opts": [
        "Assimetria quebrando controle stateful",
        "Aumento de TTL DNS",
        "Renovação DHCP antecipada",
        "Erro exclusivo de SAN"
      ],
      "a": 0,
      "exp": "Firewalls stateful dependem de ver o fluxo em ambos os sentidos. Caminho assimétrico pode fazer a resposta ser descartada.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.06",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual regra de roteamento normalmente vence quando há várias rotas compatíveis?",
      "opts": [
        "A rota com menor descrição textual",
        "A rota criada há mais tempo sempre",
        "A rota mais específica, considerando métricas quando aplicável",
        "A rota de DNS primário"
      ],
      "a": 2,
      "exp": "A decisão de roteamento privilegia o prefixo mais específico; métricas/preferências entram conforme o sistema/protocolo.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.07",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em TLS, o SNI é importante porque permite ao servidor/intermediário:",
      "opts": [
        "Saber qual nome o cliente deseja acessar durante o handshake",
        "Enviar DHCP Offer",
        "Recalcular máscara CIDR",
        "Desativar NAT"
      ],
      "a": 0,
      "exp": "SNI permite seleção de certificado/virtual host no handshake TLS, especialmente quando múltiplos nomes compartilham IP.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.08",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um health check de LB usa /healthz, mas a aplicação passou a responder apenas em /ready. Qual sintoma é provável?",
      "opts": [
        "Targets marcados como unhealthy apesar de a aplicação responder em outro caminho",
        "NXDOMAIN público",
        "Porta switch em err-disable",
        "BGP hold timer expirado"
      ],
      "a": 0,
      "exp": "Health check desalinhado pode retirar backends saudáveis para usuários, causando 503 ou indisponibilidade no LB.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.09",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual é a abordagem correta diante de suspeita de bloqueio de firewall em produção?",
      "opts": [
        "Liberar any-any por tempo indefinido",
        "Coletar logs, definir origem-destino-porta, validar hit count, propor exceção mínima com prazo e rollback",
        "Desativar todos os controles",
        "Trocar certificado TLS"
      ],
      "a": 1,
      "exp": "Troubleshooting seguro usa evidência e alteração mínima, temporária, aprovada, monitorada e reversível.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.10",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Em VPN site-to-site com BGP, o túnel IPsec está up, mas prefixos não aparecem. Qual componente investigar?",
      "opts": [
        "Peering BGP, ASN, filtros de prefixo e propagação de rota",
        "Apenas HTML da aplicação",
        "Somente TTL DNS",
        "Cabo do usuário remoto"
      ],
      "a": 0,
      "exp": "Túnel up indica canal criptográfico, mas a troca/propagação de rotas via BGP pode estar falhando.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.11",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Um erro HTTP 404 prova que o firewall bloqueou a porta?",
      "opts": [
        "Sim, sempre",
        "Não. Indica que algum servidor/intermediário HTTP respondeu que o recurso não foi encontrado",
        "Sim, se for HTTPS",
        "Somente em VPN"
      ],
      "a": 1,
      "exp": "404 é resposta HTTP. A conexão chegou a um componente HTTP; o problema pode ser caminho, rota de aplicação, virtual host ou publicação.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.12",
      "type": "simulado",
      "domain": "domínio do simulado",
      "q": "Qual evidência melhor ajuda a correlacionar fluxo web em cadeia com proxy, LB e backend?",
      "opts": [
        "Request ID/trace ID com timestamps normalizados nos logs",
        "Cor do cabo",
        "Nome do usuário sem horário",
        "Somente print do navegador"
      ],
      "a": 0,
      "exp": "Request/trace ID e timestamps permitem seguir a requisição por intermediários e separar rede, TLS, proxy e aplicação.",
      "difficulty": "intermediário",
      "topic": "simulado"
    },
    {
      "id": "q17.5.13",
      "type": "simulado",
      "domain": "HTTP/TLS",
      "q": "HTTP 502 em proxy/gateway normalmente indica:",
      "opts": [
        "problema entre proxy/gateway e upstream",
        "MAC table cheia sempre",
        "DHCP esgotado sempre",
        "ARP local obrigatório"
      ],
      "a": 0,
      "exp": "502 costuma indicar que um intermediário HTTP não conseguiu resposta válida do upstream.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS"
    },
    {
      "id": "q17.5.14",
      "type": "simulado",
      "domain": "HTTP/TLS",
      "q": "Qual header HTTP é central em virtual hosts e troubleshooting de proxy?",
      "opts": [
        "Host",
        "TTL",
        "ARP-Cache",
        "DHCP-Offer"
      ],
      "a": 0,
      "exp": "O header Host indica o nome lógico solicitado e influencia roteamento L7.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS"
    },
    {
      "id": "q17.5.15",
      "type": "simulado",
      "domain": "HTTP/TLS",
      "q": "Qual comando ajuda a validar SNI e certificado TLS?",
      "opts": [
        "openssl s_client -connect host:443 -servername nome",
        "show vlan brief",
        "ip neigh flush all",
        "netstat -r only"
      ],
      "a": 0,
      "exp": "openssl s_client com -servername envia SNI e mostra cadeia/certificado.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS"
    },
    {
      "id": "q17.5.16",
      "type": "simulado",
      "domain": "Firewall",
      "q": "Uma regra any-any temporária sem expiração cria qual risco?",
      "opts": [
        "exposição permanente e dívida de governança",
        "melhora automática de auditoria",
        "eliminação de logs",
        "correção de certificado"
      ],
      "a": 0,
      "exp": "Exceções amplas sem dono/expiração tendem a virar risco permanente.",
      "difficulty": "intermediário",
      "topic": "Firewall"
    },
    {
      "id": "q17.5.17",
      "type": "simulado",
      "domain": "Firewall",
      "q": "Shadowing de regra acontece quando:",
      "opts": [
        "uma regra anterior torna outra posterior inalcançável",
        "o DNS tem dois A records",
        "o cabo passa atrás do rack",
        "o cliente usa HTTP/2"
      ],
      "a": 0,
      "exp": "Em listas ordenadas, regras anteriores podem capturar tráfego antes de regras mais específicas.",
      "difficulty": "intermediário",
      "topic": "Firewall"
    },
    {
      "id": "q17.5.18",
      "type": "simulado",
      "domain": "Firewall",
      "q": "Firewall stateful permite retorno porque:",
      "opts": [
        "mantém tabela de estado da conexão/fluxo",
        "remove a necessidade de rota",
        "ignora portas efêmeras",
        "substitui DNS"
      ],
      "a": 0,
      "exp": "A state table permite reconhecer tráfego de retorno relacionado a conexões permitidas.",
      "difficulty": "intermediário",
      "topic": "Firewall"
    },
    {
      "id": "q17.5.19",
      "type": "simulado",
      "domain": "VPN",
      "q": "Split tunnel mal planejado pode causar:",
      "opts": [
        "rotas assimétricas, DNS errado e exposição de tráfego fora do túnel",
        "melhoria automática de MTU",
        "eliminação de MFA",
        "remover necessidade de firewall"
      ],
      "a": 0,
      "exp": "Split tunnel exige desenho de rotas, DNS, segurança e observabilidade.",
      "difficulty": "intermediário",
      "topic": "VPN"
    },
    {
      "id": "q17.5.20",
      "type": "simulado",
      "domain": "VPN",
      "q": "Sintomas de MTU/MSS em túnel podem aparecer como:",
      "opts": [
        "conexões que abrem mas travam em payload maior",
        "erro de senha local apenas",
        "ARP duplicado sempre",
        "TTL DNS zerado"
      ],
      "a": 0,
      "exp": "Encapsulamento reduz MTU efetiva; problemas surgem em pacotes maiores.",
      "difficulty": "intermediário",
      "topic": "VPN"
    },
    {
      "id": "q17.5.21",
      "type": "simulado",
      "domain": "Roteamento",
      "q": "Longest prefix match escolhe:",
      "opts": [
        "a rota mais específica compatível com o destino",
        "a rota mais antiga sempre",
        "a rota com nome mais curto",
        "a rota default mesmo havendo /24"
      ],
      "a": 0,
      "exp": "Roteadores preferem o prefixo mais específico antes de métrica/AD entre rotas comparáveis.",
      "difficulty": "intermediário",
      "topic": "Roteamento"
    },
    {
      "id": "q17.5.22",
      "type": "simulado",
      "domain": "Roteamento",
      "q": "Rota de retorno ausente pode causar:",
      "opts": [
        "requisição chega ao destino mas resposta volta por caminho errado ou não volta",
        "DNS sempre quebra antes",
        "TLS troca SAN",
        "HTTP vira UDP"
      ],
      "a": 0,
      "exp": "Conectividade bidirecional exige caminho de ida e retorno coerentes.",
      "difficulty": "intermediário",
      "topic": "Roteamento"
    },
    {
      "id": "q17.5.23",
      "type": "simulado",
      "domain": "HTTP/TLS",
      "q": "HTTP 401 difere de 403 porque:",
      "opts": [
        "401 indica autenticação necessária/falha; 403 indica acesso negado mesmo entendido",
        "401 é sempre erro de cabo",
        "403 é sempre DNS",
        "ambos significam SYN perdido"
      ],
      "a": 0,
      "exp": "A distinção ajuda a não culpar firewall por erro de autenticação/autorização.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS"
    },
    {
      "id": "q17.5.24",
      "type": "simulado",
      "domain": "HTTP/TLS",
      "q": "CORS é aplicado principalmente por:",
      "opts": [
        "navegadores diante de chamadas cross-origin",
        "switches L2",
        "roteadores BGP",
        "DHCP server"
      ],
      "a": 0,
      "exp": "CORS é uma política de navegador baseada em headers HTTP.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS"
    },
    {
      "id": "q17.5.25",
      "type": "simulado",
      "domain": "Firewall",
      "q": "Security Group em cloud costuma ser:",
      "opts": [
        "stateful",
        "sempre stateless",
        "sinônimo de rota",
        "igual a DNS privado"
      ],
      "a": 0,
      "exp": "Em provedores comuns, SG é stateful; NACL frequentemente é stateless.",
      "difficulty": "intermediário",
      "topic": "Firewall"
    },
    {
      "id": "q17.5.26",
      "type": "simulado",
      "domain": "Firewall",
      "q": "NACL stateless exige atenção porque:",
      "opts": [
        "regras de ida e retorno precisam ser consideradas explicitamente",
        "ela autentica usuário final",
        "ela resolve DNS",
        "ela ajusta MTU"
      ],
      "a": 0,
      "exp": "Controles stateless não lembram estado; retorno precisa de regra/política adequada.",
      "difficulty": "intermediário",
      "topic": "Firewall"
    },
    {
      "id": "q17.5.27",
      "type": "simulado",
      "domain": "Roteamento",
      "q": "Qual comando Linux mostra a rota efetiva para um destino?",
      "opts": [
        "ip route get 8.8.8.8",
        "dig 8.8.8.8",
        "curl -I 8.8.8.8",
        "arp -a 8.8.8.8"
      ],
      "a": 0,
      "exp": "ip route get mostra a decisão de rota para o destino.",
      "difficulty": "intermediário",
      "topic": "Roteamento"
    },
    {
      "id": "q17.5.28",
      "type": "simulado",
      "domain": "HTTP/TLS",
      "q": "Em troubleshooting de API, por que registrar request ID é útil?",
      "opts": [
        "correlacionar cliente, proxy, WAF, aplicação e logs",
        "substituir autenticação",
        "calcular máscara CIDR",
        "descobrir canal Wi-Fi"
      ],
      "a": 0,
      "exp": "Request IDs permitem correlação ponta a ponta em logs distribuídos.",
      "difficulty": "intermediário",
      "topic": "HTTP/TLS"
    },
    {
      "id": "q17.5.29",
      "type": "simulado",
      "domain": "VPN",
      "q": "Zero Trust não significa:",
      "opts": [
        "liberar qualquer acesso por estar autenticado",
        "verificar identidade, dispositivo, contexto e autorização",
        "reduzir confiança implícita",
        "registrar acesso"
      ],
      "a": 0,
      "exp": "Zero Trust reduz confiança implícita; autenticação não autoriza tudo automaticamente.",
      "difficulty": "intermediário",
      "topic": "VPN"
    },
    {
      "id": "q17.5.30",
      "type": "simulado",
      "domain": "Troubleshooting",
      "q": "Qual decisão evita mudança arriscada de firewall?",
      "opts": [
        "coletar evidência de fluxo, log e teste controlado antes da regra",
        "abrir any-any primeiro",
        "remover WAF sem aprovação",
        "desativar logs para simplificar"
      ],
      "a": 0,
      "exp": "Mudança defensável exige evidência, escopo, rollback e validação.",
      "difficulty": "intermediário",
      "topic": "Troubleshooting"
    }
  ],
  "simulado": {
    "title": "Simulado III — HTTP/TLS, Firewalls, VPN e Roteamento",
    "instructions": [
      "Responda sem consulta na primeira tentativa.",
      "Marque confiança alta, média ou baixa para cada questão.",
      "Após corrigir, classifique erros por domínio: HTTP, TLS, firewall, VPN, roteamento ou evidência.",
      "Crie mini laboratórios para os dois domínios com menor confiança."
    ],
    "passingScorePercent": 75,
    "excellentScorePercent": 90,
    "questions": [
      {
        "question": "Um usuário recebe HTTP 403 ao acessar uma aplicação publicada. Qual interpretação é mais defensável antes de alterar firewall?",
        "options": [
          "A porta TCP está necessariamente bloqueada",
          "O servidor ou intermediário entendeu a requisição e negou autorização ou política",
          "O DNS falhou antes da conexão",
          "O túnel VPN caiu"
        ],
        "answer": 1,
        "explanation": "403 é resposta HTTP. Isso sugere que a requisição chegou a algum componente HTTP, como aplicação, proxy ou WAF, e foi negada por política/autorização."
      },
      {
        "question": "Um cliente recebe erro de certificado porque o nome acessado não está no SAN. Qual camada/tema está mais diretamente envolvido?",
        "options": [
          "ARP",
          "TLS e identidade do certificado",
          "DHCP relay",
          "NAT de saída"
        ],
        "answer": 1,
        "explanation": "A validação do nome do certificado ocorre na camada TLS/PKI. Firewall pode permitir a conexão e ainda assim TLS falhar por identidade incorreta."
      },
      {
        "question": "Em um fluxo web, qual sintoma é mais associado a load balancer/proxy sem resposta adequada do backend?",
        "options": [
          "NXDOMAIN",
          "HTTP 502/503/504 dependendo do caso",
          "ARP incomplete",
          "DHCP Discover sem Offer"
        ],
        "answer": 1,
        "explanation": "502, 503 e 504 costumam envolver gateway/proxy/LB/backend/health check/timeout, embora a causa exata dependa dos logs."
      },
      {
        "question": "Uma VPN de acesso remoto mostra 'conectada', mas o usuário não acessa rede interna. Qual evidência deve ser verificada?",
        "options": [
          "Apenas se o cabo está conectado",
          "Rotas instaladas, DNS entregue, perfil/grupo, política de firewall e retorno",
          "Somente se o site público abre",
          "Apenas o número de série do notebook"
        ],
        "answer": 1,
        "explanation": "Túnel conectado não garante autorização, rotas, DNS, firewall e retorno. O diagnóstico exige validar todos esses elementos."
      },
      {
        "question": "Uma conexão TCP chega ao firewall e é permitida na ida, mas a resposta volta por outro caminho. Que problema isso pode causar?",
        "options": [
          "Assimetria quebrando controle stateful",
          "Aumento de TTL DNS",
          "Renovação DHCP antecipada",
          "Erro exclusivo de SAN"
        ],
        "answer": 0,
        "explanation": "Firewalls stateful dependem de ver o fluxo em ambos os sentidos. Caminho assimétrico pode fazer a resposta ser descartada."
      },
      {
        "question": "Qual regra de roteamento normalmente vence quando há várias rotas compatíveis?",
        "options": [
          "A rota com menor descrição textual",
          "A rota criada há mais tempo sempre",
          "A rota mais específica, considerando métricas quando aplicável",
          "A rota de DNS primário"
        ],
        "answer": 2,
        "explanation": "A decisão de roteamento privilegia o prefixo mais específico; métricas/preferências entram conforme o sistema/protocolo."
      },
      {
        "question": "Em TLS, o SNI é importante porque permite ao servidor/intermediário:",
        "options": [
          "Saber qual nome o cliente deseja acessar durante o handshake",
          "Enviar DHCP Offer",
          "Recalcular máscara CIDR",
          "Desativar NAT"
        ],
        "answer": 0,
        "explanation": "SNI permite seleção de certificado/virtual host no handshake TLS, especialmente quando múltiplos nomes compartilham IP."
      },
      {
        "question": "Um health check de LB usa /healthz, mas a aplicação passou a responder apenas em /ready. Qual sintoma é provável?",
        "options": [
          "Targets marcados como unhealthy apesar de a aplicação responder em outro caminho",
          "NXDOMAIN público",
          "Porta switch em err-disable",
          "BGP hold timer expirado"
        ],
        "answer": 0,
        "explanation": "Health check desalinhado pode retirar backends saudáveis para usuários, causando 503 ou indisponibilidade no LB."
      },
      {
        "question": "Qual é a abordagem correta diante de suspeita de bloqueio de firewall em produção?",
        "options": [
          "Liberar any-any por tempo indefinido",
          "Coletar logs, definir origem-destino-porta, validar hit count, propor exceção mínima com prazo e rollback",
          "Desativar todos os controles",
          "Trocar certificado TLS"
        ],
        "answer": 1,
        "explanation": "Troubleshooting seguro usa evidência e alteração mínima, temporária, aprovada, monitorada e reversível."
      },
      {
        "question": "Em VPN site-to-site com BGP, o túnel IPsec está up, mas prefixos não aparecem. Qual componente investigar?",
        "options": [
          "Peering BGP, ASN, filtros de prefixo e propagação de rota",
          "Apenas HTML da aplicação",
          "Somente TTL DNS",
          "Cabo do usuário remoto"
        ],
        "answer": 0,
        "explanation": "Túnel up indica canal criptográfico, mas a troca/propagação de rotas via BGP pode estar falhando."
      },
      {
        "question": "Um erro HTTP 404 prova que o firewall bloqueou a porta?",
        "options": [
          "Sim, sempre",
          "Não. Indica que algum servidor/intermediário HTTP respondeu que o recurso não foi encontrado",
          "Sim, se for HTTPS",
          "Somente em VPN"
        ],
        "answer": 1,
        "explanation": "404 é resposta HTTP. A conexão chegou a um componente HTTP; o problema pode ser caminho, rota de aplicação, virtual host ou publicação."
      },
      {
        "question": "Qual evidência melhor ajuda a correlacionar fluxo web em cadeia com proxy, LB e backend?",
        "options": [
          "Request ID/trace ID com timestamps normalizados nos logs",
          "Cor do cabo",
          "Nome do usuário sem horário",
          "Somente print do navegador"
        ],
        "answer": 0,
        "explanation": "Request/trace ID e timestamps permitem seguir a requisição por intermediários e separar rede, TLS, proxy e aplicação."
      }
    ],
    "competencyScoring": {
      "enabled": true,
      "competencies": [
        {
          "id": "C05",
          "name": "HTTP, TLS, proxy, firewall, VPN e publicação segura",
          "minimum": 75,
          "mastery": 90
        },
        {
          "id": "C03",
          "name": "IPv4, subnetting, gateway e roteamento básico",
          "minimum": 75,
          "mastery": 90
        },
        {
          "id": "C08",
          "name": "Troubleshooting profissional, RCA e comunicação",
          "minimum": 80,
          "mastery": 92
        }
      ],
      "scoringMethod": "corrigir cada questão marcando também competência, causa do erro, confiança e ação de revisão",
      "passRule": "pontuação geral mínima de 75% e nenhuma competência crítica abaixo de 70%",
      "masteryRule": "90% geral, explicação correta de todos os erros e plano de revisão fechado",
      "feedbackByScoreBand": [
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
      ]
    },
    "postExamProtocol": [
      "não olhar o gabarito antes da tentativa completa",
      "registrar confiança por questão: baixa, média ou alta",
      "corrigir por competência, não apenas por acerto/erro",
      "classificar cada erro usando a taxonomia E-CONCEITO, E-CAMADA, E-COMANDO, E-ARQUITETURA, E-SEGURANCA ou E-COMUNICACAO",
      "criar uma ação de revisão e uma ação prática para cada competência abaixo do mínimo",
      "retestar depois de 24-48 horas sem consulta"
    ]
  },
  "exercises": [
    {
      "title": "Separar HTTP de firewall",
      "prompt": "Explique por que um HTTP 403 não deve ser tratado automaticamente como porta bloqueada.",
      "difficulty": "intermediário",
      "expectedAnswer": "403 é uma resposta HTTP. A requisição chegou a algum componente que entendeu o protocolo e negou por autorização, regra de WAF ou política de aplicação."
    },
    {
      "title": "TLS e SAN",
      "prompt": "Um serviço responde em 443, mas o certificado não contém o nome acessado. Qual é a falha e qual evidência coletar?",
      "difficulty": "intermediário",
      "expectedAnswer": "Falha de identidade TLS. Coletar certificado apresentado, SAN, SNI usado, cadeia, validade e hostname acessado."
    },
    {
      "title": "VPN conectada sem acesso",
      "prompt": "Liste cinco itens a verificar quando a VPN conecta, mas o recurso interno não abre.",
      "difficulty": "intermediário-avançado",
      "expectedAnswer": "Perfil/grupo, pool de IP, rotas instaladas, DNS interno, firewall/ACL, rota de retorno, logs VPN e reachability até destino/porta."
    },
    {
      "title": "Assimetria de rota",
      "prompt": "Explique por que caminho assimétrico pode quebrar um firewall stateful.",
      "difficulty": "avançado",
      "expectedAnswer": "O firewall stateful precisa acompanhar estado da sessão. Se a ida passa por ele e a volta passa por outro caminho, a resposta pode ser descartada por ausência de estado ou política."
    },
    {
      "id": "ex17.5.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C05, C03, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "flashcards": [
    {
      "front": "O que um HTTP 502 geralmente sugere?",
      "back": "Problema em gateway/proxy/LB ao obter resposta válida do backend, dependendo dos logs."
    },
    {
      "front": "O que SNI permite no TLS?",
      "back": "Informar o nome desejado durante o handshake para seleção de certificado/virtual host."
    },
    {
      "front": "VPN conectada prova acesso ao recurso?",
      "back": "Não. Ainda é preciso validar rotas, DNS, políticas, retorno e serviço."
    },
    {
      "front": "Qual risco de rota assimétrica com firewall stateful?",
      "back": "A resposta pode não passar pelo firewall que viu a ida, quebrando o estado da sessão."
    },
    {
      "front": "Qual é a regra geral de seleção de rotas?",
      "back": "A rota mais específica costuma vencer; métricas/preferências refinam a escolha conforme o ambiente."
    },
    {
      "front": "Qual é a mudança segura em troubleshooting de firewall?",
      "back": "Exceção mínima, aprovada, temporária, monitorada e com rollback."
    }
  ],
  "mentorQuestions": [
    "Em quais questões você confundiu status HTTP com bloqueio de rede?",
    "Que evidências diferenciam falha TLS de falha de aplicação?",
    "Como você provaria que uma VPN está conectada, mas sem rota ou política correta?"
  ],
  "challenge": {
    "title": "Desafio — Aplicação publicada falhando para usuários internos e remotos",
    "scenario": "Usuários internos acessam uma aplicação por HTTPS e recebem 502. Usuários remotos conectados à VPN recebem timeout. O DNS público e privado resolvem nomes diferentes. Houve mudança recente de certificado, WAF e rota de retorno no firewall. Você deve diagnosticar sem desativar controles críticos.",
    "tasks": [
      "Montar mapa de fluxo para usuário interno e remoto",
      "Separar DNS, TCP, TLS, HTTP, WAF, LB, firewall, VPN e rota",
      "Definir evidências para cada hipótese",
      "Criar linha do tempo com mudança recente",
      "Propor mitigação mínima e rollback",
      "Escrever RCA preliminar",
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "successCriteria": [
      "Hipóteses separadas por camada",
      "Evidências correlacionadas",
      "Sem liberação ampla",
      "Plano de reteste",
      "RCA com causa técnica e causa sistêmica",
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
    "summary": "A investigação deve tratar usuários internos e remotos como fluxos diferentes, validar DNS e caminho, separar TLS de HTTP, checar health checks e WAF, confirmar políticas e rotas de retorno e só então propor mudança mínima.",
    "steps": [
      "Comparar DNS público e privado",
      "Validar TCP/443 e handshake TLS por origem",
      "Coletar logs WAF/LB/backend para 502",
      "Verificar health check e backend pool",
      "Validar perfil VPN, rotas, firewall e retorno",
      "Correlacionar mudança recente com início do incidente",
      "Aplicar mitigação específica e retestar",
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
    ],
    "commonMistakes": [
      "Desativar WAF sem evidência",
      "Trocar certificado sem verificar SNI/SAN",
      "Assumir que VPN conectada garante acesso",
      "Ignorar rota de retorno",
      "Confundir 502 com bloqueio de porta",
      "Não registrar timestamps"
    ],
    "reasoning": "A investigação deve tratar usuários internos e remotos como fluxos diferentes, validar DNS e caminho, separar TLS de HTTP, checar health checks e WAF, confirmar políticas e rotas de retorno e só então propor mudança mínima. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
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
      "term": "SNI",
      "definition": "Extensão TLS que informa o nome do servidor desejado durante o handshake."
    },
    {
      "term": "HTTP 502",
      "definition": "Status que indica resposta inválida recebida por gateway ou proxy ao tentar acessar servidor upstream."
    },
    {
      "term": "Health check",
      "definition": "Verificação usada por load balancers para decidir se um backend deve receber tráfego."
    },
    {
      "term": "Firewall stateful",
      "definition": "Firewall que acompanha estado das conexões para permitir respostas esperadas e bloquear tráfego não associado."
    },
    {
      "term": "Split tunnel",
      "definition": "Modelo em que apenas parte do tráfego passa pela VPN e o restante sai pela rede local do usuário."
    },
    {
      "term": "Rota assimétrica",
      "definition": "Situação em que ida e volta de um fluxo seguem caminhos diferentes, podendo quebrar inspeção stateful e troubleshooting."
    }
  ],
  "references": [
    {
      "title": "RFC 9110 — HTTP Semantics",
      "url": "https://www.rfc-editor.org/rfc/rfc9110"
    },
    {
      "title": "RFC 8446 — The Transport Layer Security (TLS) Protocol Version 1.3",
      "url": "https://www.rfc-editor.org/rfc/rfc8446"
    },
    {
      "title": "NIST SP 800-41 Rev. 1 — Guidelines on Firewalls and Firewall Policy",
      "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final"
    },
    {
      "title": "NIST SP 800-77 Rev. 1 — Guide to IPsec VPNs",
      "url": "https://csrc.nist.gov/pubs/sp/800/77/r1/final"
    },
    {
      "title": "RFC 4271 — A Border Gateway Protocol 4 (BGP-4)",
      "url": "https://www.rfc-editor.org/rfc/rfc4271"
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
        "name": "Risco de avaliação sem evidência — Simulado III: HTTP/TLS, Firewalls, VPN e Roteamento",
        "description": "Em Simulado III: HTTP/TLS, Firewalls, VPN e Roteamento, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.5."
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
      "Qual evidência comprova o entendimento da aula 17.5?"
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
      "17.6"
    ]
  },
  "assessmentBlueprint": {
    "mode": "simulado por bloco",
    "questionCount": 30,
    "minimumScore": 70,
    "masteryScore": 90,
    "correctionMethod": "corrigir por domínio, registrar lacuna, revisar aula relacionada e executar reteste com evidência",
    "gapReportRequired": true
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
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    }
  ],
  "domainGapReport": {
    "required": true,
    "fields": [
      "domínio",
      "questões erradas",
      "causa provável",
      "aulas de revisão",
      "prática de reforço",
      "evidência de reteste"
    ],
    "actionRule": "qualquer domínio abaixo de 70% exige revisão; abaixo de 50% exige laboratório de reforço antes de seguir para o capstone"
  }
};
