export const lesson0007 = {
  "id": "0.7",
  "moduleId": "m00",
  "order": 7,
  "title": "O que é um protocolo",
  "subtitle": "Como computadores combinam regras, mensagens, estados e expectativas para conseguir conversar sem improviso.",
  "duration": "75-105 min",
  "estimatedStudyTimeMinutes": 105,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 185,
  "tags": [
    "fundamentos",
    "protocolos",
    "regras",
    "mensagens",
    "estados",
    "handshake",
    "timeout",
    "troubleshooting",
    "segurança",
    "cloud",
    "devsecops",
    "apis"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação como dados digitais."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta bits, bytes e representações usadas em campos de protocolos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.6",
      "reason": "A aula 0.6 mostra que tempo, perda e throughput influenciam a comunicação entre sistemas."
    }
  ],
  "objectives": [
    "Explicar protocolo como conjunto de regras de comunicação, não apenas como nome de tecnologia.",
    "Diferenciar sintaxe, semântica, temporização, estados, mensagens, erros e negociação.",
    "Entender por que protocolos precisam de padrões para permitir interoperabilidade entre fabricantes, sistemas e linguagens.",
    "Relacionar protocolos com TCP, UDP, HTTP, DNS, TLS, APIs, autenticação, cloud e DevSecOps.",
    "Identificar falhas comuns de protocolo em logs, capturas, comandos e sintomas de troubleshooting.",
    "Analisar riscos de segurança quando protocolos são mal implementados, mal configurados ou usados fora de contexto."
  ],
  "learningOutcomes": [
    "Dado um protocolo desconhecido, o aluno consegue perguntar quais mensagens existem, em que ordem aparecem, quais campos carregam e quais erros são esperados.",
    "Dado um problema de comunicação, o aluno consegue separar falha de conectividade, falha de formato, falha de estado, falha de autenticação e falha de temporização.",
    "Dado um log de aplicação ou rede, o aluno consegue reconhecer que códigos, timeouts, rejeições e negociações fazem parte de protocolos.",
    "Dado um desenho de arquitetura, o aluno consegue apontar quais protocolos unem cliente, proxy, gateway, API, banco, serviço interno e identidade.",
    "Dado um cenário de segurança, o aluno consegue explicar por que validação, versão, criptografia, autenticação e logs importam em protocolos."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Até agora você estudou como computadores representam informação, como bits e bytes se organizam, como texto vira bytes, como sinais físicos carregam dados e como latência, largura de banda e throughput afetam a experiência. Mas ainda falta uma pergunta central: <strong>como dois sistemas combinam o que cada sequência de bytes significa?</strong>\n  </p>\n  <p>\n    Um computador pode enviar bytes para outro. Isso, sozinho, não garante comunicação. O receptor precisa saber onde uma mensagem começa, onde termina, que campos existem, qual valor é permitido, o que responder, quando desistir, como tratar erro, quando autenticar, quando criptografar, quando reenviar e quando encerrar a conversa. Essas regras formam um <strong>protocolo</strong>.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> um sistema interno parou de integrar com uma API depois de uma atualização. A rede responde ao ping, o DNS resolve, a porta está aberta e o firewall permite o tráfego. Mesmo assim, a chamada falha. O problema não está na existência do caminho físico; está na conversa: versão TLS incompatível, cabeçalho HTTP obrigatório ausente, token expirado ou payload JSON fora do formato esperado. Ou seja, a falha está no protocolo usado pela aplicação.\n  </div>\n  <p>\n    Para quem trabalha com TI e Segurança, entender protocolo muda a forma de diagnosticar. Você deixa de perguntar apenas “tem rede?” e passa a perguntar: a mensagem está no formato certo? A ordem está correta? O servidor esperava autenticação antes? Houve negociação de versão? O timeout faz sentido? O cliente entendeu o erro? O proxy alterou algum cabeçalho? O WAF bloqueou por política? O token representa o usuário correto?\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    Protocolos existem muito antes das redes de computadores modernas. Em telecomunicações, sistemas já precisavam combinar sinais, códigos, tempos, chamadas e respostas. Em comunicação humana, também usamos protocolos sociais: cumprimentar, esperar resposta, identificar o destinatário, falar em uma língua comum e encerrar a conversa. Computadores herdaram essa necessidade, mas com uma exigência maior: regras precisam ser precisas o suficiente para máquinas diferentes interpretarem a mesma coisa.\n  </p>\n  <p>\n    Nas primeiras redes, cada fabricante poderia criar seus próprios formatos e comportamentos. Isso funcionava em ambientes fechados, mas dificultava interoperabilidade. Se um computador de um fabricante não entendia as mensagens de outro, a rede virava um conjunto de ilhas incompatíveis. A evolução da internet dependeu de protocolos abertos, documentos públicos, implementação por múltiplos fornecedores e testes de interoperabilidade.\n  </p>\n  <p>\n    Com o tempo, protocolos foram organizados por função. Alguns cuidam do enlace local, como Ethernet. Outros cuidam de endereçamento e roteamento, como IP. Outros cuidam de transporte, como TCP e UDP. Outros cuidam da aplicação, como DNS, HTTP, SMTP, SSH e muitos protocolos de APIs. Em segurança, protocolos como TLS, Kerberos, SAML e OIDC definem como sistemas negociam confiança, identidade, chaves e sessões.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Fase</th><th>Como era o problema</th><th>Limitação</th><th>Evolução</th></tr></thead>\n    <tbody>\n      <tr><td>Sistemas fechados</td><td>Cada fornecedor definia suas próprias regras</td><td>Baixa interoperabilidade</td><td>Padrões abertos e documentação pública</td></tr>\n      <tr><td>Redes locais</td><td>Máquinas precisavam compartilhar meio e endereços</td><td>Conflitos, colisões e formatos distintos</td><td>Ethernet, endereçamento MAC e quadros padronizados</td></tr>\n      <tr><td>Internet</td><td>Redes diferentes precisavam se conectar</td><td>Roteamento e endereçamento global eram difíceis</td><td>IP, TCP, UDP, DNS e protocolos de roteamento</td></tr>\n      <tr><td>Web e cloud</td><td>Sistemas distribuídos precisavam trocar dados e identidade</td><td>APIs, segurança e versões se tornaram críticos</td><td>HTTP, TLS, JSON, OAuth, OIDC, service mesh e observabilidade</td></tr>\n    </tbody>\n  </table>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema técnico resolvido por protocolos é a ambiguidade. Bytes não carregam significado universal. A sequência <code>47 45 54</code>, por exemplo, pode ser apenas três bytes. Mas em uma requisição HTTP, esses bytes representam o texto <code>GET</code>, que indica um método de requisição. O significado nasce porque cliente e servidor concordam previamente sobre o protocolo.\n  </p>\n  <p>\n    Sem protocolo, cada sistema precisaria adivinhar formato, ordem e intenção. Isso quebraria automação, integração, troubleshooting, segurança e escalabilidade. Um servidor não saberia se o primeiro campo é tamanho, comando, versão, usuário, destino ou conteúdo. Um cliente não saberia se a ausência de resposta significa erro, processamento demorado, bloqueio, perda ou encerramento normal.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Formato:</strong> quais campos existem, como são separados e que tamanho possuem.</li>\n    <li><strong>Significado:</strong> o que cada campo quer dizer e quais valores são válidos.</li>\n    <li><strong>Ordem:</strong> qual mensagem deve vir antes e qual deve vir depois.</li>\n    <li><strong>Tempo:</strong> quanto esperar antes de tentar novamente ou desistir.</li>\n    <li><strong>Estado:</strong> em qual fase da conversa cliente e servidor estão.</li>\n    <li><strong>Erro:</strong> como rejeitar, redirecionar, negar, repetir ou encerrar.</li>\n    <li><strong>Segurança:</strong> como autenticar, autorizar, criptografar, validar e registrar.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Erro comum:</strong> achar que protocolo é sinônimo de porta. Porta é apenas um identificador usado em protocolos de transporte para separar conversas. O protocolo inclui regras de mensagem, estado, temporização, erro, versão e comportamento.\n  </div>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    Protocolos evoluíram de regras simples para ecossistemas complexos. Alguns protocolos antigos eram texto puro e fáceis de ler, mas não tinham autenticação forte ou criptografia. Outros eram binários, eficientes e compactos, mas mais difíceis de depurar manualmente. Protocolos modernos frequentemente combinam negociação de versão, criptografia, compressão, multiplexação, autenticação e observabilidade.\n  </p>\n  <p>\n    A evolução também trouxe separação de responsabilidades. Em vez de um único protocolo resolver tudo, camadas cooperam. Ethernet entrega quadros em uma rede local. IP endereça e encaminha pacotes entre redes. TCP oferece conexão confiável sobre IP. TLS protege a comunicação. HTTP organiza requisições e respostas de aplicações. OIDC, por cima de HTTP e TLS, organiza autenticação federada e tokens. Cada camada tem seu contrato.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Tipo de protocolo</th><th>Característica</th><th>Vantagem</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Texto simples</td><td>Mensagens legíveis por humanos</td><td>Facilita depuração e aprendizado</td><td>Pode ser verboso e exigir cuidado com parsing</td></tr>\n      <tr><td>Binário</td><td>Campos compactos e estruturados</td><td>Eficiência e controle de tamanho</td><td>Mais difícil de ler sem ferramenta</td></tr>\n      <tr><td>Orientado a conexão</td><td>Mantém estado de conversa</td><td>Permite confiabilidade e sequência</td><td>Mais complexo e sensível a timeouts</td></tr>\n      <tr><td>Sem conexão</td><td>Mensagens independentes</td><td>Menor overhead e simplicidade</td><td>Aplicação precisa lidar com perda e ordem</td></tr>\n      <tr><td>Seguro por negociação</td><td>Combina versões, chaves e algoritmos</td><td>Protege confidencialidade e integridade</td><td>Falhas de configuração geram incompatibilidade</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Um <strong>protocolo</strong> é um conjunto de regras que define como entidades se comunicam. Essas regras especificam formato das mensagens, significado dos campos, sequência esperada, tratamento de erros, temporização, estados, versões, responsabilidades e, quando aplicável, mecanismos de segurança.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> protocolo é o contrato de comunicação entre sistemas. Ele diz o que pode ser enviado, em que formato, em que ordem, em qual momento, com qual resposta esperada e como lidar com exceções.\n  </div>\n  <p>\n    Essa definição vale para redes e também para sistemas. TCP tem regras para estabelecer conexão, numerar bytes, confirmar recebimento e encerrar sessão. HTTP tem regras para método, URL, headers, status code e corpo. DNS tem regras para pergunta, tipo de registro e resposta. TLS tem regras para handshake, certificados, chaves e algoritmos. OIDC tem regras para autenticação federada, redirecionamento, tokens e validação.\n  </p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    Por dentro, um protocolo costuma combinar seis elementos: <strong>mensagens</strong>, <strong>campos</strong>, <strong>estados</strong>, <strong>temporização</strong>, <strong>erros</strong> e <strong>negociação</strong>. Nem todo protocolo tem todos esses elementos de forma complexa, mas quase todos possuem pelo menos parte deles.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Início:</strong> uma entidade decide iniciar comunicação. Pode ser um cliente abrindo conexão TCP, um navegador enviando HTTP ou um resolver perguntando DNS.</li>\n    <li><strong>Mensagem inicial:</strong> a primeira mensagem carrega campos esperados. Pode haver versão, método, identificador, tamanho, flags ou destino.</li>\n    <li><strong>Interpretação:</strong> o receptor lê os campos de acordo com o protocolo. Se o formato estiver inválido, responde erro ou descarta.</li>\n    <li><strong>Estado:</strong> algumas conversas mudam de fase. Exemplo: antes de autenticar, durante autenticação, autenticado, encerrando.</li>\n    <li><strong>Resposta:</strong> o receptor responde com sucesso, erro, redirecionamento, desafio de autenticação, confirmação ou dado solicitado.</li>\n    <li><strong>Timeout e repetição:</strong> se algo demora demais, a implementação decide esperar, reenviar, abrir nova conexão ou falhar.</li>\n    <li><strong>Encerramento:</strong> a conversa termina por mensagem explícita, timeout, reset, erro ou fechamento do transporte.</li>\n  </ol>\n  <p>\n    Um ponto essencial é que protocolos são implementados em software e hardware. A especificação define o comportamento esperado, mas sistemas reais podem ter bugs, configurações incorretas, versões incompatíveis, limites de buffer, parsing inseguro, timeouts agressivos ou logs insuficientes. Por isso, troubleshooting de protocolo exige tanto teoria quanto evidência prática.\n  </p>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Protocolos aparecem em todas as camadas de uma arquitetura corporativa. Um usuário acessando uma aplicação web pode usar Wi‑Fi, Ethernet, IP, TCP, TLS, HTTP, DNS, autenticação federada, APIs internas, conexão com banco, filas e protocolos de observabilidade. Cada trecho pode estar funcionando ou falhando de maneira diferente.\n  </p>\n  <ul>\n    <li><strong>Camadas inferiores:</strong> Ethernet, ARP, IP, ICMP, TCP, UDP e roteamento criam conectividade.</li>\n    <li><strong>Camadas de aplicação:</strong> DNS, HTTP, SSH, SMTP, APIs e bancos organizam serviços.</li>\n    <li><strong>Camadas de segurança:</strong> TLS, Kerberos, SAML, OIDC, OAuth e mTLS criam confiança, identidade e proteção.</li>\n    <li><strong>Camadas de plataforma:</strong> Kubernetes, service mesh, ingress, API gateway e observabilidade usam protocolos para automatizar comunicação.</li>\n    <li><strong>Pontos de falha:</strong> versão incompatível, porta errada, certificado inválido, token vencido, payload malformado, timeout, proxy alterando header ou WAF bloqueando padrão.</li>\n  </ul>\n  <p>\n    Pensar em protocolo como arquitetura evita um erro comum: culpar a rede por qualquer falha de comunicação. Às vezes a rede entrega os bytes perfeitamente, mas a aplicação rejeita a mensagem porque o contrato não foi cumprido.\n  </p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Imagine uma ligação para abrir um chamado técnico. Existe uma ordem: você cumprimenta, se identifica, informa o problema, responde perguntas, recebe um número de protocolo e encerra. Se você começar falando apenas “azul, 443, erro, ontem”, a pessoa pode ouvir os sons, mas não entender o sentido. Comunicação exige regras compartilhadas.\n  </p>\n  <p>\n    Em redes, os bytes são como sons ou letras. O protocolo é a gramática, o formulário, a sequência e a etiqueta da conversa. Ele define o que a outra parte espera receber e como deve responder.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> humanos toleram ambiguidade, improviso e contexto implícito. Computadores normalmente exigem formatos rígidos. Um caractere a mais, um campo ausente, uma versão incompatível ou uma assinatura inválida pode fazer a comunicação falhar completamente.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Um exemplo simples é acessar um site. Você digita um endereço no navegador. Antes de ver a página, vários protocolos cooperam. O DNS traduz o nome para um IP. O TCP, em muitos casos, estabelece conexão. O TLS negocia criptografia e valida certificado quando o acesso é HTTPS. O HTTP envia uma requisição com método, caminho, headers e talvez corpo. O servidor responde com status code, headers e conteúdo.\n  </p>\n  <p>\n    Se algo falhar, a mensagem de erro depende da etapa. Se DNS falhar, o nome não resolve. Se TCP falhar, a porta pode estar fechada ou bloqueada. Se TLS falhar, pode haver problema de certificado, versão ou inspeção. Se HTTP falhar, você pode receber 401, 403, 404, 429 ou 500. Cada erro pertence a uma parte diferente da conversa.\n  </p>\n  <pre class=\"code-block\"><code>GET / HTTP/1.1\nHost: exemplo.local\nUser-Agent: navegador\nAccept: text/html\n\n</code></pre>\n  <p>\n    Essa pequena mensagem só faz sentido porque cliente e servidor conhecem HTTP. Sem esse contrato, seriam apenas bytes em uma conexão.\n  </p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, protocolos aparecem em todos os serviços: Active Directory, DNS interno, DHCP, VPN, proxies, SIEM, EDR, email, bancos de dados, sistemas legados, APIs, monitoramento e backup. Uma falha de protocolo pode derrubar autenticação, impedir deploy, quebrar integração financeira ou gerar falso positivo no SOC.\n  </p>\n  <p>\n    Considere uma aplicação interna que autentica via SSO. O usuário abre a aplicação com HTTPS. A aplicação redireciona para o provedor de identidade. O navegador carrega cookies, parâmetros e tokens. O provedor autentica o usuário e devolve uma resposta assinada. A aplicação valida assinatura, emissor, audiência, expiração e claims. Tudo isso é protocolo. Um relógio errado, certificado expirado, redirect URI diferente ou token com audiência incorreta pode quebrar login mesmo com a rede perfeita.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Sintoma</th><th>Possível camada/protocolo</th><th>Evidência útil</th><th>Hipótese</th></tr></thead>\n    <tbody>\n      <tr><td>Nome não resolve</td><td>DNS</td><td>Resposta NXDOMAIN ou timeout</td><td>Registro ausente, split DNS ou bloqueio</td></tr>\n      <tr><td>Porta não conecta</td><td>TCP/firewall</td><td>Timeout ou connection refused</td><td>Serviço parado, ACL ou rota</td></tr>\n      <tr><td>Erro de certificado</td><td>TLS</td><td>Certificado expirado ou CN/SAN incorreto</td><td>Problema de PKI ou inspeção</td></tr>\n      <tr><td>403 após login</td><td>HTTP/autorização</td><td>Status code e logs de aplicação</td><td>Usuário autenticado sem permissão</td></tr>\n      <tr><td>Token rejeitado</td><td>OIDC/OAuth</td><td>Issuer, audience, expiração e assinatura</td><td>Contrato de identidade quebrado</td></tr>\n    </tbody>\n  </table>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, protocolos continuam existindo, mas muitas partes ficam escondidas atrás de serviços gerenciados. Um load balancer pode aceitar HTTPS na borda e falar HTTP com o backend. Um API Gateway pode validar JWT antes de encaminhar a requisição. Um Private Endpoint pode mudar o caminho de rede sem alterar o protocolo da aplicação. Um banco gerenciado pode exigir TLS, certificados ou autenticação por identidade.\n  </p>\n  <p>\n    Isso cria um risco operacional: achar que “cloud resolve a comunicação”. Cloud fornece blocos, mas os contratos continuam importantes. Security Groups, NACLs, route tables, DNS privado, certificados, WAF, políticas de API, service endpoints, mTLS e identity federation podem permitir, negar ou modificar a conversa.\n  </p>\n  <div class=\"callout callout--security\">\n    <strong>Exemplo cloud:</strong> uma API publicada por API Gateway exige TLS, header de autenticação, método permitido, rota correta e payload JSON válido. A VPC pode estar correta e o DNS pode resolver, mas a chamada ainda falha se o protocolo de aplicação não cumprir o contrato.\n  </div>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Pipelines, containers e plataformas modernas dependem de protocolos o tempo todo. O Git usa protocolos para clonar e enviar código. O registry usa HTTPS para publicar imagens. O Kubernetes usa API HTTP/TLS para receber manifests. O CI/CD conversa com provedores cloud usando APIs. O OIDC federation permite que um pipeline assuma identidade temporária sem guardar segredo fixo. O scanner de segurança envia resultados para plataformas de relatório via API.\n  </p>\n  <p>\n    Quando um pipeline falha, muitas vezes o erro é de protocolo: token expirado, certificado não confiável, proxy interceptando TLS, API retornando 429 por limite de taxa, endpoint exigindo método diferente, payload fora do schema, versão de API removida ou clock skew afetando assinatura. Saber ler protocolo ajuda a depurar automação sem adivinhar.\n  </p>\n  <ul>\n    <li><strong>IaC:</strong> providers conversam com APIs cloud por HTTP/TLS.</li>\n    <li><strong>Kubernetes:</strong> kubectl conversa com o API Server por HTTPS autenticado.</li>\n    <li><strong>GitOps:</strong> controladores sincronizam estado usando APIs, webhooks e autenticação.</li>\n    <li><strong>Segurança:</strong> scanners, SBOM, assinaturas e políticas dependem de formatos e contratos.</li>\n  </ul>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Protocolos são uma fronteira crítica de segurança. Eles definem o que é aceito, rejeitado, autenticado, registrado e criptografado. Um protocolo mal configurado pode permitir downgrade de versão, autenticação fraca, exposição de dados, parsing inseguro, replay, falta de validação ou bypass de controle.\n  </p>\n  <p>\n    O estudo defensivo de protocolos não significa aprender a atacar sistemas. Significa saber reconhecer riscos, interpretar logs, validar configurações, endurecer serviços e investigar incidentes. Em um SOC, entender protocolo ajuda a diferenciar tráfego normal de varredura, abuso, exfiltração, beaconing, tentativa de autenticação indevida ou erro operacional.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Versão insegura</td><td>Cliente ou servidor aceita protocolo antigo</td><td>Criptografia fraca ou comportamento legado</td><td>Desabilitar versões antigas e monitorar negociação</td></tr>\n      <tr><td>Parsing frágil</td><td>Campos malformados quebram aplicação</td><td>Falha, bypass ou indisponibilidade</td><td>Validação robusta, testes e limites de tamanho</td></tr>\n      <tr><td>Autenticação ausente</td><td>Serviço aceita comandos sem identidade</td><td>Acesso indevido</td><td>Autenticação forte, autorização e segmentação</td></tr>\n      <tr><td>Logs insuficientes</td><td>Erros sem contexto</td><td>Investigação lenta</td><td>Logs estruturados com correlação e códigos</td></tr>\n      <tr><td>Segredo em protocolo errado</td><td>Token em URL ou log</td><td>Vazamento de credencial</td><td>Não logar segredos, usar headers e mascaramento</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l07-title m00l07-desc\">\n    <title id=\"m00l07-title\">Protocolo como contrato de comunicação</title>\n    <desc id=\"m00l07-desc\">Diagrama mostrando cliente e servidor trocando mensagens com formato, ordem, estado, timeout, erro e segurança.</desc>\n    <defs>\n      <marker id=\"m00l07-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"45\" y=\"150\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"120\" y=\"184\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"120\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">implementação A</text>\n    <rect x=\"785\" y=\"150\" width=\"150\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"860\" y=\"184\" text-anchor=\"middle\" class=\"svg-label\">Servidor</text>\n    <text x=\"860\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">implementação B</text>\n    <rect x=\"300\" y=\"40\" width=\"380\" height=\"86\" rx=\"14\" class=\"svg-zone\" />\n    <text x=\"490\" y=\"72\" text-anchor=\"middle\" class=\"svg-label\">Contrato do protocolo</text>\n    <text x=\"490\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">formato + significado + ordem + tempo + erro + segurança</text>\n    <line x1=\"195\" y1=\"170\" x2=\"785\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l07-arrow)\" />\n    <text x=\"490\" y=\"155\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mensagem 1: versão, método, campos</text>\n    <line x1=\"785\" y1=\"205\" x2=\"195\" y2=\"205\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l07-arrow)\" />\n    <text x=\"490\" y=\"232\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">mensagem 2: status, dados ou erro</text>\n    <rect x=\"245\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"312\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Estado</text>\n    <text x=\"312\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">fase da conversa</text>\n    <rect x=\"422\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"490\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Timeout</text>\n    <text x=\"490\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">espera e retry</text>\n    <rect x=\"600\" y=\"285\" width=\"135\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"667\" y=\"309\" text-anchor=\"middle\" class=\"svg-label\">Erro</text>\n    <text x=\"667\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rejeitar ou corrigir</text>\n    <path d=\"M120 240 C170 310 205 315 245 315\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#m00l07-arrow)\" />\n    <path d=\"M860 240 C805 310 775 315 735 315\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m00l07-arrow)\" />\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>\n    O laboratório desta aula é local e seguro. Você irá observar protocolos em uso no próprio computador, sem gerar tráfego agressivo e sem testar terceiros de forma invasiva. O objetivo é perceber que cada ferramenta revela uma parte da conversa: portas, estados, DNS, HTTP, TLS e códigos de resposta.\n  </p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios treinam raciocínio de protocolo. Em vez de decorar nomes, você vai identificar contrato, ordem, campos, estados, erros e evidências.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula uma integração corporativa que falha mesmo com conectividade básica funcionando. Você deverá montar um plano de investigação orientado por protocolos.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra como diferenciar falha de rede, falha de transporte, falha TLS, falha HTTP, falha de autenticação e falha de contrato de API.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> protocolo é o contrato que dá significado aos bytes trocados entre sistemas.</li>\n    <li><strong>O que lembrar:</strong> protocolos definem formato, ordem, estado, temporização, erro, versão e segurança.</li>\n    <li><strong>Erro comum:</strong> reduzir protocolo a porta ou a nome de tecnologia.</li>\n    <li><strong>Uso real:</strong> diagnóstico de DNS, TCP, TLS, HTTP, APIs, SSO, pipelines, cloud e incidentes.</li>\n    <li><strong>Segurança:</strong> protocolos mal configurados podem expor dados, aceitar versões inseguras, falhar em validação ou ocultar evidências.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    A próxima aula será <strong>0.8 — Como pensar em camadas</strong>. Depois de entender que protocolos são contratos de comunicação, o próximo passo é organizar esses contratos em camadas para diagnosticar problemas sem se perder: físico, enlace, rede, transporte, aplicação e segurança.\n  </p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Todas as camadas, com foco conceitual em aplicação, transporte, rede e enlace"
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
      "IP",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "HTTP",
      "TLS",
      "SSH",
      "SMTP",
      "OIDC",
      "SAML"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "codificação",
      "sinais",
      "latência",
      "throughput"
    ],
    "enables": [
      "Modelo OSI",
      "TCP/IP",
      "HTTP",
      "DNS",
      "TLS",
      "APIs",
      "IAM",
      "troubleshooting",
      "análise de tráfego"
    ]
  },
  "deepDive": {
    "mentalModel": "Um protocolo é um contrato operacional. Para entendê-lo, pergunte: quem inicia, que mensagens existem, quais campos são obrigatórios, quais estados existem, quais erros são possíveis, quanto tempo esperar e que controles de segurança protegem a conversa.",
    "keyTerms": [
      "protocolo",
      "mensagem",
      "campo",
      "estado",
      "handshake",
      "timeout",
      "retry",
      "status code",
      "versão",
      "negociação",
      "interoperabilidade"
    ],
    "limitations": [
      "Um protocolo bem definido não garante implementação correta.",
      "Um protocolo seguro pode ser configurado de forma insegura.",
      "Protocolos diferentes podem compartilhar a mesma porta em cenários com proxy, multiplexação ou encapsulamento.",
      "Logs incompletos dificultam diferenciar falha de formato, autenticação, rede e aplicação."
    ],
    "whenToUse": [
      "Ao diagnosticar qualquer falha de comunicação entre sistemas.",
      "Ao desenhar integrações entre aplicações, APIs, serviços internos e provedores cloud.",
      "Ao avaliar exposição de serviços e regras de firewall.",
      "Ao configurar autenticação, criptografia e validação de mensagens."
    ],
    "whenNotToUse": [
      "Não use raciocínio de protocolo para ignorar evidências físicas básicas, como cabo, Wi-Fi ou link down.",
      "Não presuma erro de aplicação antes de validar DNS, rota, transporte e TLS quando necessário.",
      "Não trate protocolo como substituto de política de segurança, autenticação ou autorização."
    ],
    "operationalImpact": [
      "Protocolos exigem documentação de versões, portas, dependências, timeouts e códigos de erro.",
      "Integrações críticas precisam de observabilidade por etapa da conversa.",
      "Mudanças de versão em APIs, TLS ou autenticação podem quebrar clientes antigos."
    ],
    "financialImpact": [
      "Gateways, WAFs, API gateways, inspeção TLS, logs e observabilidade podem gerar custos em cloud.",
      "Falhas de protocolo aumentam tempo de troubleshooting e custo operacional.",
      "Protocolos verbosos podem aumentar tráfego, armazenamento de logs e consumo de recursos."
    ],
    "securityImpact": [
      "Protocolos definem fronteiras de validação, autenticação, criptografia e autorização.",
      "Versões antigas e parsing frágil podem criar riscos relevantes.",
      "Monitorar anomalias de protocolo ajuda a detectar abuso, varredura, exfiltração e erro operacional."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Confundir protocolo com porta.",
      "whyItHappens": "Muitos serviços são ensinados como pares simplificados, como HTTP 80 e HTTPS 443.",
      "consequence": "A pessoa acha que liberar uma porta resolve o contrato inteiro da comunicação.",
      "correction": "Porta ajuda a direcionar conversas; protocolo define formato, ordem, estado, erro e segurança."
    },
    {
      "mistake": "Achar que ping funcionando prova que a aplicação funciona.",
      "whyItHappens": "Ping é um teste visível e simples.",
      "consequence": "Falhas de TCP, TLS, HTTP, autenticação ou API são ignoradas.",
      "correction": "Ping testa ICMP e alcance básico; não valida o protocolo da aplicação."
    },
    {
      "mistake": "Tratar todo erro 4xx ou 5xx como problema de rede.",
      "whyItHappens": "Usuários chamam qualquer falha de acesso de problema de internet.",
      "consequence": "A investigação vai para firewall e link antes de ler logs de aplicação.",
      "correction": "Códigos HTTP são parte do protocolo de aplicação e precisam ser interpretados no contexto."
    },
    {
      "mistake": "Ignorar versão e negociação.",
      "whyItHappens": "Versões parecem detalhe até uma atualização quebrar compatibilidade.",
      "consequence": "Clientes e servidores deixam de se entender após mudanças de TLS, API ou schema.",
      "correction": "Documente versões suportadas, depreciações e testes de compatibilidade."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Conectividade básica funciona, mas aplicação falha",
      "Erro de certificado",
      "Status HTTP inesperado",
      "Timeout após autenticação",
      "API retorna payload inválido",
      "Pipeline falha em chamada a serviço externo"
    ],
    "diagnosticQuestions": [
      "Qual protocolo está sendo usado em cada trecho?",
      "O problema ocorre antes ou depois de DNS?",
      "A porta abre, mas o handshake TLS falha?",
      "Há status code, mensagem de erro ou correlation ID?",
      "Houve mudança de versão, certificado, token, schema ou proxy?",
      "Cliente e servidor concordam sobre método, headers, payload e autenticação?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Test-NetConnection exemplo.com -Port 443",
        "purpose": "Validar se há alcance TCP até uma porta específica.",
        "expectedObservation": "TcpTestSucceeded True quando a conexão TCP é possível.",
        "interpretation": "Confirma transporte básico, mas não valida TLS, HTTP ou autenticação."
      },
      {
        "platform": "Windows",
        "command": "curl.exe -I https://exemplo.com",
        "purpose": "Ver headers e status HTTP de forma simples.",
        "expectedObservation": "Status como HTTP/1.1 200, 301, 403 ou 500.",
        "interpretation": "Mostra resposta do protocolo HTTP e ajuda a separar rede de aplicação."
      },
      {
        "platform": "Linux",
        "command": "curl -v https://example.com/",
        "purpose": "Observar DNS, conexão, negociação TLS, headers e resposta HTTP.",
        "expectedObservation": "Linhas com connected, TLS handshake, certificado e status HTTP.",
        "interpretation": "Permite identificar em qual fase a conversa falha."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen",
        "purpose": "Listar sockets TCP/UDP em escuta e processos associados.",
        "expectedObservation": "Portas, endereços locais e processos.",
        "interpretation": "Ajuda a verificar se o serviço está ouvindo onde deveria."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Validar estado básico de interfaces antes de culpar protocolos superiores.",
        "expectedObservation": "Interfaces relevantes em up/up.",
        "interpretation": "Se a base está down, protocolos superiores naturalmente falharão."
      },
      {
        "platform": "Cisco IOS",
        "command": "show access-lists",
        "purpose": "Verificar se ACLs podem bloquear um protocolo ou porta.",
        "expectedObservation": "Regras permit/deny com contadores.",
        "interpretation": "Ajuda a correlacionar política de rede com falha de comunicação."
      }
    ],
    "decisionTree": [
      {
        "if": "DNS não resolve o nome",
        "then": "Investigar DNS antes de TCP, TLS ou HTTP."
      },
      {
        "if": "TCP não conecta na porta",
        "then": "Verificar serviço, rota, firewall, ACL, security group ou listener."
      },
      {
        "if": "TCP conecta, mas TLS falha",
        "then": "Verificar certificado, SNI, versão TLS, cadeia de confiança e inspeção."
      },
      {
        "if": "TLS funciona, mas HTTP retorna erro",
        "then": "Ler status code, headers, método, rota, autenticação e logs da aplicação."
      },
      {
        "if": "HTTP funciona manualmente, mas pipeline falha",
        "then": "Comparar token, proxy, variáveis, versão da API, payload e rate limit."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Documentar protocolos, portas, versões e fluxos autorizados.",
      "Desabilitar versões inseguras ou obsoletas quando houver alternativa segura.",
      "Validar formato, tamanho, origem, assinatura e autorização das mensagens.",
      "Registrar status, erro, correlation ID e etapa da falha sem expor segredos.",
      "Usar TLS, autenticação forte e autorização explícita quando o protocolo transportar dados sensíveis."
    ],
    "badPractices": [
      "Liberar portas sem entender o protocolo e o fluxo real.",
      "Aceitar qualquer versão por compatibilidade indefinida.",
      "Registrar tokens, senhas, cookies ou payloads sensíveis em logs.",
      "Assumir que rede interna é automaticamente confiável.",
      "Ignorar erros de certificado ou desativar validação TLS para 'funcionar rápido'."
    ],
    "commonErrors": [
      "Confundir autenticação com autorização.",
      "Confundir criptografia com validação de identidade.",
      "Concluir que porta aberta significa serviço seguro.",
      "Não testar comportamento de erro, timeout e retry.",
      "Não observar diferença entre cliente, proxy, gateway e backend."
    ],
    "vulnerabilities": [
      {
        "name": "Downgrade de protocolo",
        "description": "Cliente e servidor aceitam versão antiga ou mais fraca por compatibilidade.",
        "defensiveExplanation": "O risco é a comunicação cair para uma versão menos segura quando a configuração permite negociação fraca.",
        "mitigation": "Definir versões mínimas, monitorar negociação e remover legados com plano de transição."
      },
      {
        "name": "Validação insuficiente de mensagem",
        "description": "O serviço aceita campos fora do padrão, tamanhos inesperados ou formatos ambíguos.",
        "defensiveExplanation": "Parsing frágil pode causar erro, comportamento inesperado, bypass lógico ou indisponibilidade.",
        "mitigation": "Validar schema, limites de tamanho, tipos, assinatura, origem e autorização."
      },
      {
        "name": "Exposição de segredo em protocolo de aplicação",
        "description": "Tokens ou credenciais aparecem em URL, query string, headers logados ou mensagens de erro.",
        "defensiveExplanation": "Segredos em locais logados ou compartilhados podem vazar para SIEM, proxy, histórico ou suporte.",
        "mitigation": "Mascarar logs, usar headers apropriados, reduzir retenção sensível e rotacionar credenciais expostas."
      }
    ],
    "monitoring": [
      "Aumento de erros 4xx/5xx por rota ou cliente.",
      "Falhas de handshake TLS por versão ou certificado.",
      "Taxa anormal de resets, timeouts e retries.",
      "Mudança repentina de user-agent, método, payload ou endpoint.",
      "Tentativas repetidas de autenticação ou tokens inválidos."
    ],
    "hardening": [
      "Configurar versões mínimas seguras.",
      "Aplicar autenticação e autorização por serviço.",
      "Usar schema validation em APIs.",
      "Limitar tamanho de payload e taxa de requisições.",
      "Padronizar erros sem revelar detalhes sensíveis."
    ],
    "detectionIdeas": [
      "Criar alertas para spikes de status 401, 403, 404, 429 e 5xx.",
      "Correlacionar logs de proxy, WAF, aplicação e identidade.",
      "Monitorar uso de versões de protocolo legadas.",
      "Observar destinos, portas e protocolos incomuns por segmento.",
      "Usar correlation ID para seguir a conversa entre camadas."
    ]
  },
  "lab": {
    "id": "lab-0.7",
    "title": "Observando protocolos no próprio computador",
    "labType": "cloud",
    "objective": "Identificar evidências de protocolos em uso: sockets, DNS, TCP, TLS, HTTP, status codes e estados de conexão.",
    "scenario": "Você é analista de suporte ou segurança e recebeu a informação de que um serviço web não funciona. Antes de culpar a rede, você irá coletar evidências por etapa da conversa.",
    "topology": "Notebook do aluno -> rede local -> internet -> serviço HTTP/HTTPS público usado apenas para leitura de headers",
    "architecture": "Host cliente executando comandos locais de diagnóstico. Não há exploração, varredura agressiva ou teste de carga.",
    "prerequisites": [
      "Acesso a um terminal Windows PowerShell ou Linux.",
      "Conexão comum com a internet.",
      "Conhecimento das aulas 0.1 a 0.6."
    ],
    "tools": [
      "Windows PowerShell ou Terminal Linux",
      "curl",
      "Test-NetConnection no Windows",
      "ss ou netstat",
      "Opcional: navegador com DevTools"
    ],
    "estimatedTimeMinutes": 105,
    "cost": "zero",
    "safetyNotes": [
      "Não faça varreduras em redes de terceiros.",
      "Não execute testes de carga.",
      "Use apenas requisições simples de leitura.",
      "Não cole tokens, cookies ou credenciais em comandos.",
      "O objetivo é observar protocolos, não atacar serviços.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar conexões locais",
        "instruction": "Liste conexões ou sockets para perceber que aplicações usam endereços, portas e estados.",
        "command": "Windows: netstat -ano\nLinux: ss -tulpen",
        "expectedOutput": "Lista de conexões, portas locais/remotas, estados e, em alguns casos, processos.",
        "explanation": "Isso mostra que conversas de rede são separadas por protocolo de transporte, endereços, portas e estado."
      },
      {
        "number": 2,
        "title": "Testar alcance TCP até HTTPS",
        "instruction": "Verifique se o host consegue abrir conexão TCP na porta 443 de um destino conhecido.",
        "command": "Windows: Test-NetConnection example.com -Port 443\nLinux: nc -vz example.com 443  # se netcat estiver instalado",
        "expectedOutput": "Sucesso de conexão TCP ou indicação de falha.",
        "explanation": "Conexão TCP bem-sucedida prova transporte básico, mas ainda não prova TLS, HTTP, autenticação ou aplicação."
      },
      {
        "number": 3,
        "title": "Observar HTTP e TLS com curl",
        "instruction": "Use curl em modo verboso para observar fases da conversa.",
        "command": "curl -v https://example.com/",
        "expectedOutput": "Linhas indicando resolução, conexão, TLS handshake, certificado, requisição HTTP e status de resposta.",
        "explanation": "O modo verboso ajuda a separar etapas: DNS, TCP, TLS e HTTP."
      },
      {
        "number": 4,
        "title": "Comparar headers sem baixar corpo completo",
        "instruction": "Peça apenas os headers HTTP para observar status e metadados.",
        "command": "curl -I https://example.com/",
        "expectedOutput": "Status HTTP e headers, como content-type, server, cache-control ou date.",
        "explanation": "Headers são parte do protocolo HTTP e mostram como o servidor descreve a resposta."
      },
      {
        "number": 5,
        "title": "Provocar erro controlado de rota inexistente",
        "instruction": "Acesse um caminho improvável para observar um status de erro HTTP sem causar dano.",
        "command": "curl -I https://example.com/caminho-inexistente-para-lab-redes-v2",
        "expectedOutput": "Possível status 404 ou outro código controlado pelo servidor.",
        "explanation": "Erros também fazem parte do protocolo. Um 404 não significa que a rede caiu; significa que o servidor respondeu que o recurso não foi encontrado."
      },
      {
        "number": 6,
        "title": "Registrar evidências",
        "instruction": "Anote em uma tabela: comando, etapa observada, resultado, hipótese confirmada e hipótese não confirmada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de evidências do laboratório.",
        "explanation": "Troubleshooting profissional depende de evidências organizadas, não de impressões soltas."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar que uma comunicação web envolve múltiplos protocolos e que cada comando valida apenas uma parte da conversa.",
    "validation": [
      {
        "check": "Conexões locais foram listadas",
        "command": "netstat -ano ou ss -tulpen",
        "expected": "Saída com portas, endereços e estados.",
        "ifFails": "Executar o terminal com permissões normais e tentar também netstat sem opções avançadas."
      },
      {
        "check": "HTTP/TLS foi observado",
        "command": "curl -v https://example.com/",
        "expected": "Saída com etapas de conexão, TLS e resposta HTTP.",
        "ifFails": "Verificar conexão, proxy corporativo, bloqueio local ou ausência do curl."
      },
      {
        "check": "Headers foram coletados",
        "command": "curl -I https://example.com/",
        "expected": "Status HTTP e headers.",
        "ifFails": "Testar outro destino permitido pela rede ou usar navegador DevTools."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "curl não existe no sistema",
        "probableCause": "Ambiente antigo ou PATH não configurado.",
        "howToConfirm": "Executar curl --version.",
        "fix": "No Windows moderno, usar curl.exe; no Linux, instalar pelo gerenciador de pacotes se permitido."
      },
      {
        "symptom": "TLS falha em rede corporativa",
        "probableCause": "Proxy com inspeção TLS ou certificado raiz não confiável.",
        "howToConfirm": "Comparar certificado visto no navegador e no curl, se permitido pela política interna.",
        "fix": "Seguir política corporativa e validar cadeia de certificados com a equipe responsável."
      },
      {
        "symptom": "TCP conecta, mas HTTP retorna 403",
        "probableCause": "Servidor recusou autorização, política, região, user-agent ou rota.",
        "howToConfirm": "Ler status e headers, comparar com navegador e logs se for serviço interno.",
        "fix": "Investigar regra de aplicação, autenticação, WAF ou permissão."
      }
    ],
    "improvements": [
      "Repetir o teste em uma API interna de laboratório.",
      "Observar a aba Network do navegador e comparar com curl.",
      "Adicionar correlation ID em um serviço próprio de teste.",
      "Fazer o mesmo raciocínio com DNS usando nslookup ou dig."
    ],
    "evidenceToCollect": [
      "Saída de netstat ou ss com dados sensíveis ocultados.",
      "Saída resumida de curl -v mostrando as fases.",
      "Headers coletados com curl -I.",
      "Tabela com etapa, evidência e interpretação."
    ],
    "questions": [
      "Qual comando validou transporte, mas não validou aplicação?",
      "Qual evidência pertence ao protocolo HTTP?",
      "Um 404 significa queda de rede?",
      "Por que TLS pode falhar mesmo quando TCP conecta?"
    ],
    "challenge": "Explique como você investigaria uma API interna que responde ping, conecta na porta 443, mas falha no pipeline com erro 401.",
    "solution": "A investigação deve separar etapas: DNS, TCP 443, TLS, HTTP e autenticação. Ping e TCP provam alcance básico. Erro 401 indica que o servidor HTTP respondeu exigindo autenticação ou rejeitando credenciais. A análise deve verificar token, header Authorization, expiração, audience, issuer, permissões, segredo do pipeline e logs do provedor de identidade."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que bytes sozinhos não bastam para haver comunicação entre dois sistemas?",
      "hints": [
        "Pense em significado.",
        "Pense em ordem e formato."
      ],
      "expectedIdeas": [
        "contrato",
        "campos",
        "mensagens",
        "interpretação",
        "estado"
      ],
      "explanation": "Bytes precisam de regras compartilhadas. O protocolo transforma bytes em mensagens com significado."
    },
    {
      "type": "diagnóstico",
      "question": "Um servidor responde ping e a porta 443 conecta, mas a aplicação retorna 403. Que hipóteses você testaria?",
      "hints": [
        "Pense em TLS e HTTP.",
        "403 não é a mesma coisa que timeout."
      ],
      "expectedIdeas": [
        "autorização",
        "WAF",
        "token",
        "rota",
        "header",
        "política"
      ],
      "explanation": "403 indica resposta de camada de aplicação. A conectividade básica existe; agora o foco deve ir para autorização, política e contrato HTTP/API."
    },
    {
      "type": "cenário real",
      "question": "Em um pipeline, uma chamada para cloud falha após rotação de credenciais. Como o conceito de protocolo ajuda?",
      "hints": [
        "Pense em autenticação.",
        "Pense em contrato de API."
      ],
      "expectedIdeas": [
        "token",
        "assinatura",
        "headers",
        "expiração",
        "versão de API",
        "logs"
      ],
      "explanation": "O pipeline fala com APIs por protocolos. A falha pode estar na forma como credenciais, headers e assinaturas são enviados."
    }
  ],
  "quiz": [
    {
      "id": "q0.7.1",
      "type": "conceito",
      "q": "Qual é a melhor definição de protocolo em redes e sistemas?",
      "opts": [
        "Um conjunto de regras que define formato, ordem, significado, erro e comportamento da comunicação.",
        "Um cabo físico que transporta bits.",
        "Um número de porta usado exclusivamente por firewalls.",
        "Um programa de antivírus que bloqueia tráfego."
      ],
      "a": 0,
      "exp": "Protocolo é o contrato de comunicação. Porta, cabo e segurança podem estar relacionados, mas não definem protocolo.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q0.7.2",
      "type": "diagnóstico",
      "q": "Ping funciona, mas uma chamada HTTPS falha por certificado. Qual camada/protocolo deve ser investigado com prioridade?",
      "opts": [
        "TLS e cadeia de certificados.",
        "Apenas camada física.",
        "Somente largura de banda.",
        "Somente ARP."
      ],
      "a": 0,
      "exp": "Ping indica alcance ICMP básico. Erro de certificado pertence à negociação TLS e confiança.",
      "difficulty": "iniciante",
      "topic": "tls"
    },
    {
      "id": "q0.7.3",
      "type": "comparação",
      "q": "Por que porta não é sinônimo de protocolo?",
      "opts": [
        "Porque porta identifica uma conversa no transporte, mas protocolo define regras de mensagem e comportamento.",
        "Porque portas só existem em Wi-Fi.",
        "Porque protocolos nunca usam portas.",
        "Porque porta é sempre criptografada."
      ],
      "a": 0,
      "exp": "Portas ajudam a separar fluxos, mas o protocolo é o contrato completo da comunicação.",
      "difficulty": "iniciante",
      "topic": "portas"
    },
    {
      "id": "q0.7.4",
      "type": "segurança",
      "q": "Qual prática reduz risco em protocolos que transportam dados sensíveis?",
      "opts": [
        "Usar TLS, autenticação, autorização, validação de entrada e logs sem segredos.",
        "Desativar validação de certificado para evitar erros.",
        "Registrar tokens completos para facilitar suporte.",
        "Aceitar todas as versões antigas por compatibilidade."
      ],
      "a": 0,
      "exp": "Segurança de protocolo depende de proteção, validação, controle e evidência sem vazamento de segredos.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q0.7.5",
      "type": "cenário",
      "q": "Uma API retorna 401 no pipeline, mas funciona no notebook do desenvolvedor. Qual hipótese é mais coerente?",
      "opts": [
        "Credencial, token, header, identidade ou contexto do pipeline estão diferentes.",
        "O cabo do notebook está sempre quebrado.",
        "O protocolo HTTP não existe em pipelines.",
        "A porta 443 não pode estar aberta."
      ],
      "a": 0,
      "exp": "401 indica problema de autenticação no protocolo de aplicação. Comparar identidade, token e headers é essencial.",
      "difficulty": "intermediário",
      "topic": "devsecops"
    },
    {
      "id": "q0.7.6",
      "type": "troubleshooting",
      "q": "O que o comando curl -v ajuda a observar em uma comunicação HTTPS?",
      "opts": [
        "Etapas como DNS, conexão, TLS, headers e resposta HTTP.",
        "A temperatura da placa de rede.",
        "A senha descriptografada do usuário.",
        "A topologia física completa do provedor."
      ],
      "a": 0,
      "exp": "curl -v mostra detalhes úteis da conversa, respeitando limites do que o cliente pode observar.",
      "difficulty": "iniciante",
      "topic": "ferramentas"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.7.1",
      "front": "O que é um protocolo?",
      "back": "É um conjunto de regras que define como sistemas trocam mensagens, interpretam campos, seguem ordem, tratam erros e encerram comunicação.",
      "tags": [
        "protocolo"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.2",
      "front": "Porta é protocolo?",
      "back": "Não. Porta ajuda a identificar conversas no transporte. O protocolo define o contrato de comunicação.",
      "tags": [
        "porta",
        "protocolo"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.3",
      "front": "O que é handshake?",
      "back": "É uma sequência inicial de mensagens usada para negociar parâmetros, estabelecer estado ou preparar uma comunicação.",
      "tags": [
        "handshake"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.4",
      "front": "Por que protocolos têm códigos de erro?",
      "back": "Para que o receptor informe de forma previsível o motivo de falha, rejeição, redirecionamento ou indisponibilidade.",
      "tags": [
        "erros"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.7.5",
      "front": "O que significa estado em um protocolo?",
      "back": "É a fase atual da conversa, como conectando, autenticando, autenticado, transferindo ou encerrando.",
      "tags": [
        "estado"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc0.7.6",
      "front": "Qual risco de aceitar versões antigas de protocolo?",
      "back": "Pode permitir comportamento legado, criptografia fraca, downgrade ou incompatibilidade difícil de monitorar.",
      "tags": [
        "segurança",
        "versão"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.7.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre bytes transmitidos e protocolo.",
      "expectedAnswer": "Bytes são os dados brutos transmitidos. Protocolo é o conjunto de regras que diz como esses bytes devem ser organizados, interpretados e respondidos.",
      "explanation": "Sem protocolo, o receptor pode receber bytes, mas não necessariamente entender o significado."
    },
    {
      "id": "ex0.7.2",
      "type": "diagnóstico",
      "prompt": "Um sistema retorna HTTP 404. Liste duas hipóteses que não sejam 'a internet caiu'.",
      "expectedAnswer": "Rota inexistente, URL errada, recurso removido, proxy encaminhando para backend incorreto ou aplicação não publicando aquele caminho.",
      "explanation": "404 é uma resposta do protocolo HTTP indicando que o servidor respondeu, mas não encontrou o recurso no contexto da requisição."
    },
    {
      "id": "ex0.7.3",
      "type": "arquitetura",
      "prompt": "Liste pelo menos cinco protocolos que podem participar do acesso a uma aplicação web com login corporativo.",
      "expectedAnswer": "DNS, TCP, TLS, HTTP, OIDC/SAML/OAuth, além de possivelmente Kerberos, LDAP, mTLS ou protocolos internos de banco/API.",
      "explanation": "Aplicações modernas combinam várias camadas de protocolo."
    },
    {
      "id": "ex0.7.4",
      "type": "segurança",
      "prompt": "Por que desativar validação de certificado TLS para 'resolver rápido' é perigoso?",
      "expectedAnswer": "Porque remove uma verificação de identidade e confiança, permitindo conexões com destinos falsos ou intermediários não confiáveis.",
      "explanation": "A falha de certificado deve ser investigada, não ignorada permanentemente."
    }
  ],
  "challenge": {
    "title": "Diagnosticar falha de integração mesmo com conectividade básica funcionando",
    "scenario": "Uma aplicação em Kubernetes chama uma API de pagamentos externa. DNS resolve, TCP 443 conecta e ping para a internet funciona. Mesmo assim, o pipeline de testes falha com 401 em ambiente de homologação e 403 em produção.",
    "tasks": [
      "Separar as etapas de protocolo envolvidas.",
      "Listar evidências que você coletaria em cada etapa.",
      "Explicar diferença provável entre 401 e 403.",
      "Indicar quais logs procurar em aplicação, proxy, API gateway e provedor de identidade.",
      "Propor mitigação sem expor tokens em logs."
    ],
    "constraints": [
      "Não executar teste de carga.",
      "Não registrar tokens completos.",
      "Não desativar TLS.",
      "Não liberar firewall any-any como solução.",
      "Usar raciocínio defensivo e evidências."
    ],
    "expectedDeliverables": [
      "Tabela de etapas DNS/TCP/TLS/HTTP/Auth/API.",
      "Lista de comandos seguros.",
      "Hipóteses priorizadas.",
      "Plano de correção e validação.",
      "Cuidados de segurança com segredos."
    ],
    "gradingRubric": [
      {
        "criterion": "Separação correta por protocolo",
        "points": 30,
        "description": "Distingue DNS, transporte, TLS, HTTP e autenticação."
      },
      {
        "criterion": "Evidências adequadas",
        "points": 25,
        "description": "Coleta logs e comandos sem vazar credenciais."
      },
      {
        "criterion": "Interpretação de 401 e 403",
        "points": 20,
        "description": "Diferencia autenticação ausente/inválida de autorização/política."
      },
      {
        "criterion": "Segurança operacional",
        "points": 15,
        "description": "Não propõe bypass inseguro como solução permanente."
      },
      {
        "criterion": "Clareza da solução",
        "points": 10,
        "description": "Apresenta plano aplicável e validável."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A conectividade básica já foi parcialmente validada: DNS resolve e TCP 443 conecta. Portanto, a investigação deve subir de camada: TLS, HTTP, autenticação, autorização e contrato da API. 401 normalmente indica credencial ausente, inválida ou expirada. 403 normalmente indica que a identidade foi reconhecida ou a requisição chegou, mas a ação foi negada por permissão, política, WAF ou regra de acesso.",
    "steps": [
      "Confirmar DNS e destino correto em homologação e produção.",
      "Validar conexão TCP 443 sem assumir sucesso de aplicação.",
      "Verificar TLS, certificado, SNI e cadeia de confiança.",
      "Coletar status HTTP, headers e correlation ID sem expor token.",
      "Comparar identidade usada pelo pipeline em homologação e produção.",
      "Validar audience, issuer, expiração, escopo e permissões do token.",
      "Consultar logs do API gateway, WAF, aplicação e provedor de identidade.",
      "Corrigir credencial, permissão, escopo, rota ou política e repetir teste controlado."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Liberar todo tráfego no firewall.",
        "whyItIsWrong": "O transporte já conecta; a falha é de protocolo de aplicação/autenticação. Any-any aumenta risco e não resolve contrato de API."
      },
      {
        "answer": "Desativar validação TLS.",
        "whyItIsWrong": "Isso remove proteção de identidade e confidencialidade, além de mascarar a causa real."
      },
      {
        "answer": "Colar o token completo no log para depurar.",
        "whyItIsWrong": "Isso pode vazar credencial para SIEM, suporte, histórico de pipeline e terceiros."
      }
    ],
    "finalAnswer": "A solução correta é investigar por protocolo e por etapa: DNS, TCP, TLS, HTTP, autenticação e autorização. 401 aponta para credencial/token; 403 aponta para permissão/política. Corrigir o contrato de identidade e API é mais seguro do que abrir rede ou desativar TLS."
  },
  "glossary": [
    {
      "term": "Protocolo",
      "shortDefinition": "Conjunto de regras de comunicação entre sistemas.",
      "longDefinition": "Define formato, significado, ordem, estados, temporização, erro, versões e, quando aplicável, segurança da comunicação.",
      "example": "HTTP define métodos, headers, status codes e corpo de mensagem.",
      "relatedTerms": [
        "mensagem",
        "estado",
        "handshake"
      ],
      "relatedLessons": [
        "0.7",
        "0.8",
        "6.1",
        "8.1"
      ]
    },
    {
      "term": "Mensagem",
      "shortDefinition": "Unidade de comunicação definida por um protocolo.",
      "longDefinition": "Pode conter campos, cabeçalhos, corpo, flags, códigos e identificadores interpretados segundo regras específicas.",
      "example": "Uma requisição HTTP GET é uma mensagem do cliente para o servidor.",
      "relatedTerms": [
        "campo",
        "payload"
      ],
      "relatedLessons": [
        "0.7",
        "8.1"
      ]
    },
    {
      "term": "Handshake",
      "shortDefinition": "Troca inicial de mensagens para estabelecer parâmetros ou estado.",
      "longDefinition": "Usado em protocolos como TCP e TLS para iniciar uma conversa com regras e parâmetros conhecidos.",
      "example": "O handshake TLS negocia versão, chaves e certificado.",
      "relatedTerms": [
        "estado",
        "TLS",
        "TCP"
      ],
      "relatedLessons": [
        "0.7",
        "6.2",
        "8.4"
      ]
    },
    {
      "term": "Timeout",
      "shortDefinition": "Tempo máximo de espera por uma resposta antes de considerar falha.",
      "longDefinition": "Evita que sistemas esperem indefinidamente e influencia retry, erro e experiência do usuário.",
      "example": "Uma API pode desistir após 30 segundos sem resposta do backend.",
      "relatedTerms": [
        "latência",
        "retry"
      ],
      "relatedLessons": [
        "0.6",
        "0.7",
        "15.1"
      ]
    },
    {
      "term": "Status code",
      "shortDefinition": "Código de resposta que resume o resultado de uma operação em alguns protocolos.",
      "longDefinition": "No HTTP, códigos como 200, 401, 403, 404 e 500 ajudam a classificar sucesso, autenticação, autorização, recurso ausente e erro interno.",
      "example": "HTTP 403 indica acesso proibido no contexto da requisição.",
      "relatedTerms": [
        "HTTP",
        "erro",
        "autorização"
      ],
      "relatedLessons": [
        "0.7",
        "8.1",
        "13.4"
      ]
    },
    {
      "term": "Interoperabilidade",
      "shortDefinition": "Capacidade de sistemas diferentes funcionarem juntos seguindo o mesmo padrão.",
      "longDefinition": "Protocolos padronizados permitem que implementações de fornecedores, linguagens e plataformas diferentes se comuniquem.",
      "example": "Um navegador e um servidor de fabricantes diferentes conseguem conversar usando HTTP e TLS.",
      "relatedTerms": [
        "padrão",
        "RFC",
        "versão"
      ],
      "relatedLessons": [
        "0.7",
        "0.8"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.1",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre representação digital da informação."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.6",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Base sobre latência, largura de banda e throughput."
    },
    {
      "type": "rfc",
      "title": "RFC 791 — Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc791",
      "note": "Exemplo clássico de especificação de protocolo de rede."
    },
    {
      "type": "rfc",
      "title": "RFC 768 — User Datagram Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc768",
      "note": "Exemplo de protocolo simples de transporte."
    },
    {
      "type": "rfc",
      "title": "RFC 9110 — HTTP Semantics",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc9110",
      "note": "Exemplo moderno de semântica de protocolo de aplicação."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Pipelines e automação",
      "lesson": "APIs e integrações de pipeline",
      "reason": "Pipelines dependem de protocolos HTTP/TLS, autenticação e contratos de API."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Protocolos de identidade",
      "lesson": "SAML, OIDC e OAuth",
      "reason": "Protocolos de identidade são contratos de autenticação e autorização sobre HTTP/TLS."
    }
  ],
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
      "0.8"
    ]
  }
};
