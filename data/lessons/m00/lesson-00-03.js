export const lesson0003 = {
  "id": "0.3",
  "moduleId": "m00",
  "order": 3,
  "title": "ASCII, Unicode, UTF-8 e Base64",
  "subtitle": "Como texto vira bytes em redes, logs, APIs, autenticação, tokens e análise de segurança.",
  "duration": "70-95 min",
  "estimatedStudyTimeMinutes": 95,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 170,
  "tags": [
    "fundamentos",
    "texto",
    "ascii",
    "unicode",
    "utf-8",
    "base64",
    "http",
    "apis",
    "logs",
    "tokens",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação como estados interpretados como bits."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.2",
      "reason": "A aula 0.2 apresenta bits, bytes, binário e hexadecimal, que são a base para entender caracteres, codificações e Base64."
    }
  ],
  "objectives": [
    "Diferenciar caractere, código, codificação, byte e representação textual.",
    "Explicar por que ASCII foi suficiente para alguns cenários antigos, mas insuficiente para idiomas, símbolos e sistemas globais.",
    "Entender o papel do Unicode como repertório universal de caracteres e do UTF-8 como codificação em bytes.",
    "Explicar o que Base64 resolve e por que Base64 não é criptografia, hash ou mecanismo de segurança.",
    "Relacionar codificação de texto com HTTP, APIs, logs, tokens, certificados, headers, troubleshooting e segurança defensiva."
  ],
  "learningOutcomes": [
    "Dado um caractere ASCII simples, o aluno consegue relacioná-lo com um valor decimal, hexadecimal e binário.",
    "Dado um texto com acento, o aluno entende por que ele pode ocupar mais de 1 byte em UTF-8.",
    "Dado um valor Base64, o aluno reconhece que ele pode ser decodificado e não deve ser tratado como segredo protegido.",
    "Dado um problema de caracteres quebrados em logs ou APIs, o aluno consegue investigar charset, encoding e interpretação incorreta.",
    "Dado um token, cabeçalho HTTP ou payload, o aluno evita confundir codificação com autenticação, autorização, criptografia ou assinatura."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Redes transportam bytes, mas grande parte do trabalho humano em TI e Segurança aparece como texto: nomes de domínio, URLs, cabeçalhos HTTP, JSON, logs, mensagens de erro, nomes de usuário, claims de tokens, parâmetros de API, comandos, arquivos de configuração e eventos de SIEM. Quando esse texto é convertido para bytes de forma errada, surgem problemas difíceis de diagnosticar: acentos quebrados, autenticação falhando, payloads rejeitados, logs ilegíveis, assinaturas inválidas, integrações entre sistemas quebradas e investigações de incidente com evidências interpretadas de maneira incorreta.\n  </p>\n  <p>\n    Imagine um SOC analisando um alerta de API. O log mostra um campo com aparência estranha: <code>Usuário</code>, outro campo aparece como <code>UsuÃ¡rio</code>, e um cabeçalho contém <code>Basic YWRtaW46YWRtaW4=</code>. Sem entender codificação, o analista pode interpretar errado o evento. Ele pode achar que Base64 é criptografia, pode achar que o texto foi corrompido por malware, ou pode perder tempo investigando rede quando o problema real é conversão de caracteres.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> duas aplicações estão funcionando na rede, o firewall permite o tráfego, o TLS está válido, mas a integração falha porque uma API espera UTF-8 e outra envia texto em outra codificação. O pacote chega, porém a interpretação dos bytes está errada.\n  </div>\n  <p>\n    Esta aula mostra como texto vira número, número vira byte e byte vira tráfego. Esse fundamento será usado mais tarde em HTTP, DNS, TLS, APIs, logs, proxies, autenticação, IAM, DevSecOps, Kubernetes, SIEM e análise forense.\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    No começo da computação comercial, muitos sistemas precisavam representar texto em inglês: letras maiúsculas e minúsculas, números, pontuação e alguns caracteres de controle. O ASCII surgiu nesse contexto como uma tabela padronizada que associava números a caracteres. Por exemplo, a letra <code>A</code> é associada ao valor decimal 65, que em hexadecimal é <code>0x41</code>. Para sistemas simples, isso resolvia bastante coisa.\n  </p>\n  <p>\n    O mundo, porém, não cabe no inglês básico. Idiomas têm acentos, alfabetos diferentes, símbolos matemáticos, moedas, ideogramas, sinais gráficos, emojis e marcas culturais. Vários padrões locais surgiram para tentar representar caracteres além do ASCII, mas isso criou fragmentação: o mesmo valor numérico poderia significar caracteres diferentes dependendo da tabela usada. Esse é o tipo de problema que gera o famoso texto quebrado, como <code>UsuÃ¡rio</code> no lugar de <code>Usuário</code>.\n  </p>\n  <p>\n    O Unicode surgiu para organizar um repertório universal de caracteres. Ele atribui pontos de código a caracteres, como <code>U+0041</code> para <code>A</code> e <code>U+00E1</code> para <code>á</code>. Mas ponto de código não é ainda a sequência de bytes transmitida. Para isso existem codificações, como UTF-8, UTF-16 e UTF-32. Na web e em sistemas modernos, UTF-8 se tornou dominante porque preserva compatibilidade com ASCII para caracteres básicos e representa caracteres adicionais usando múltiplos bytes.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Época/abordagem</th><th>Problema resolvido</th><th>Limitação</th><th>Impacto em redes</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>ASCII</td><td>Padronizar texto básico em inglês</td><td>Não cobre adequadamente idiomas globais</td><td>Ainda aparece em protocolos, headers e comandos</td></tr>\n      <tr><td>Tabelas locais</td><td>Adicionar caracteres regionais</td><td>Geram incompatibilidade entre sistemas</td><td>Podem quebrar logs, e-mails, APIs e integrações</td></tr>\n      <tr><td>Unicode</td><td>Unificar repertório de caracteres</td><td>Precisa de uma codificação em bytes</td><td>Permite sistemas globais e multilíngues</td></tr>\n      <tr><td>UTF-8</td><td>Codificar Unicode em bytes de forma eficiente</td><td>Caracteres podem ocupar tamanhos diferentes</td><td>Base prática da web, APIs, Linux e muitos logs modernos</td></tr>\n      <tr><td>Base64</td><td>Transportar bytes usando caracteres seguros de texto</td><td>Aumenta tamanho e não protege segredo</td><td>Aparece em HTTP, e-mail, tokens, certificados e payloads</td></tr>\n    </tbody>\n  </table>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema central é que texto não é armazenado nem transmitido como uma ideia abstrata. Ele precisa virar bytes. Para que dois sistemas conversem, ambos precisam concordar sobre a interpretação desses bytes. Se um sistema escreve bytes usando uma codificação e outro interpreta usando outra, o tráfego pode chegar intacto e mesmo assim o resultado ficar errado.\n  </p>\n  <p>\n    Isso é essencial para redes porque protocolos normalmente transportam sequências de bytes. Alguns campos são binários, outros são texto. HTTP usa muito texto em headers e payloads. JSON é texto. DNS usa nomes. SMTP transporta mensagens. Logs são texto. Autenticação Basic usa Base64. Certificados PEM usam Base64 envolto por marcadores textuais. JWT possui partes codificadas em Base64URL. A camada de rede pode estar perfeita, mas a aplicação falha se interpretar mal o conteúdo.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Texto sem codificação definida:</strong> sistemas diferentes podem interpretar os mesmos bytes de formas diferentes.</li>\n    <li><strong>Caracteres não ASCII:</strong> acentos, símbolos e emojis podem ocupar mais bytes que o esperado.</li>\n    <li><strong>Base64 mal compreendido:</strong> dados facilmente decodificáveis podem ser tratados como segredo seguro.</li>\n    <li><strong>Logs quebrados:</strong> evidências de auditoria e incidente podem ficar difíceis de pesquisar e correlacionar.</li>\n    <li><strong>Assinaturas inválidas:</strong> mudar bytes ao converter texto pode invalidar HMAC, assinatura digital ou hash.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Armadilha comum:</strong> se dois textos parecem iguais na tela, não significa que seus bytes sejam iguais. Normalização Unicode, acentos compostos e caracteres visualmente parecidos podem causar diferenças importantes em autenticação, logs e validações.\n  </div>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    A evolução pode ser vista como uma tentativa de responder a três perguntas: quais caracteres existem, qual número representa cada caractere e como esse número vira bytes. ASCII respondia quase tudo junto para um universo pequeno. Unicode separou melhor o repertório de caracteres da forma de codificá-los. UTF-8 virou uma escolha prática para transmitir e armazenar texto moderno.\n  </p>\n  <p>\n    Base64 resolve outro problema. Nem todo canal textual aceita qualquer byte. Alguns sistemas antigos eram sensíveis a bytes de controle, quebras de linha, caracteres especiais ou valores binários arbitrários. Base64 transforma bytes em um subconjunto seguro de caracteres imprimíveis. Isso é útil para transportar dados binários em meios textuais, como e-mail, JSON, XML, certificados PEM e alguns campos HTTP.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr><th>Conceito</th><th>O que é</th><th>O que não é</th><th>Exemplo prático</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>ASCII</td><td>Tabela de caracteres básicos</td><td>Não representa todos os idiomas</td><td><code>A</code> = decimal 65 = <code>0x41</code></td></tr>\n      <tr><td>Unicode</td><td>Repertório universal de caracteres</td><td>Não é, sozinho, a sequência final de bytes</td><td><code>á</code> = <code>U+00E1</code></td></tr>\n      <tr><td>UTF-8</td><td>Codificação de Unicode em bytes</td><td>Não é criptografia</td><td><code>á</code> vira bytes <code>C3 A1</code></td></tr>\n      <tr><td>Base64</td><td>Representação textual de bytes</td><td>Não é proteção de segredo</td><td><code>admin:admin</code> pode virar <code>YWRtaW46YWRtaW4=</code></td></tr>\n    </tbody>\n  </table>\n  <p>\n    Na prática moderna, a recomendação operacional é simples: prefira UTF-8 de ponta a ponta, declare explicitamente a codificação quando necessário, valide entradas, normalize texto quando isso for requisito de comparação e nunca use Base64 como mecanismo de sigilo.\n  </p>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Um <strong>caractere</strong> é uma unidade textual percebida por humanos, como <code>A</code>, <code>ç</code>, <code>?</code> ou <code>€</code>. Um <strong>ponto de código</strong> é o número atribuído a um caractere em um repertório como Unicode. Uma <strong>codificação</strong> é a regra que transforma esse ponto de código em bytes. Um <strong>charset</strong>, em muitos contextos práticos, indica o conjunto/codificação esperada para interpretar texto, embora o uso histórico do termo varie.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição essencial:</strong> ASCII é uma tabela histórica de caracteres básicos; Unicode é um padrão amplo que atribui números a caracteres; UTF-8 é uma codificação que transforma pontos de código Unicode em bytes; Base64 é uma forma de representar bytes usando caracteres textuais seguros.\n  </div>\n  <p>\n    A diferença mais importante para redes é esta: a rede transporta bytes. O significado desses bytes depende do protocolo e da codificação combinada. Quando uma API diz que envia JSON em UTF-8, ela está dizendo que o corpo da mensagem é texto JSON e que os caracteres desse texto devem ser interpretados como UTF-8. Quando um certificado aparece em PEM, ele contém dados binários codificados em Base64 para caber em um arquivo textual.\n  </p>\n  <table class=\"data-table\">\n    <thead>\n      <tr><th>Termo</th><th>Pergunta que responde</th><th>Exemplo</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Caractere</td><td>Qual símbolo humano?</td><td><code>A</code>, <code>á</code>, <code>你</code></td></tr>\n      <tr><td>Ponto de código</td><td>Qual número representa o símbolo?</td><td><code>U+0041</code>, <code>U+00E1</code></td></tr>\n      <tr><td>Codificação</td><td>Como esse número vira bytes?</td><td>UTF-8, UTF-16</td></tr>\n      <tr><td>Base64</td><td>Como representar bytes como texto seguro?</td><td><code>SGVsbG8=</code></td></tr>\n    </tbody>\n  </table>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    Vamos acompanhar uma frase simples: <code>Olá</code>. Para um humano, isso é texto. Para uma aplicação, primeiro existem caracteres: <code>O</code>, <code>l</code> e <code>á</code>. No Unicode, cada caractere possui um ponto de código. Em UTF-8, cada ponto de código é transformado em um ou mais bytes. Os caracteres ASCII básicos, como <code>O</code> e <code>l</code>, ocupam 1 byte em UTF-8. O caractere <code>á</code> ocupa 2 bytes: <code>C3 A1</code> em hexadecimal.\n  </p>\n  <ol class=\"flow-list\">\n    <li><strong>Passo 1:</strong> o usuário digita um caractere em uma aplicação.</li>\n    <li><strong>Passo 2:</strong> a aplicação representa esse caractere internamente usando um modelo de texto.</li>\n    <li><strong>Passo 3:</strong> ao salvar ou transmitir, a aplicação escolhe uma codificação, como UTF-8.</li>\n    <li><strong>Passo 4:</strong> a codificação transforma os caracteres em bytes.</li>\n    <li><strong>Passo 5:</strong> os bytes são enviados pela rede dentro de protocolos como HTTP/TCP/IP.</li>\n    <li><strong>Passo 6:</strong> o sistema receptor interpreta os bytes usando a codificação esperada.</li>\n    <li><strong>Passo 7:</strong> se a interpretação estiver errada, o texto exibido ou processado será incorreto.</li>\n  </ol>\n  <p>\n    Base64 funciona de forma diferente. Ele não mapeia caracteres humanos para bytes. Ele pega bytes já existentes e os reagrupa em blocos de 6 bits, usando uma tabela de 64 caracteres. Como 6 bits permitem 64 combinações, é possível representar dados binários usando letras, números e alguns símbolos. O caractere <code>=</code> pode aparecer como preenchimento para indicar alinhamento no final.\n  </p>\n  <div class=\"content-card\">\n    <h3>Fluxo mental</h3>\n    <p><strong>Texto humano</strong> → caracteres → pontos de código Unicode → bytes em UTF-8 → pacotes na rede → bytes recebidos → interpretação → texto novamente.</p>\n    <p><strong>Bytes binários</strong> → Base64 → texto seguro para transporte → decodificação → bytes originais.</p>\n  </div>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Codificação de texto aparece acima das camadas de transporte, mas seus efeitos atravessam toda a operação. O TCP pode entregar bytes corretamente. O TLS pode proteger o canal corretamente. O balanceador pode encaminhar para o backend correto. Mesmo assim, se o serviço interpretar bytes com codificação errada, o resultado será falha funcional.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Aplicação:</strong> define formato de dados, como JSON, HTML, XML, logs ou arquivo de configuração.</li>\n    <li><strong>Protocolo de aplicação:</strong> pode declarar tipo e charset, por exemplo em HTTP.</li>\n    <li><strong>Transporte:</strong> TCP ou QUIC transporta bytes, sem entender o significado textual.</li>\n    <li><strong>Segurança:</strong> TLS protege bytes em trânsito, mas não corrige codificação errada.</li>\n    <li><strong>Observabilidade:</strong> logs, traces e SIEM precisam preservar texto corretamente para busca e correlação.</li>\n    <li><strong>Automação:</strong> pipelines, scripts e IaC precisam lidar com arquivos em UTF-8 para evitar mudanças invisíveis.</li>\n  </ul>\n  <p>\n    Em arquitetura corporativa, a recomendação é documentar contratos de API, padronizar UTF-8, evitar transformações implícitas, validar entrada, registrar logs de forma segura e manter testes automatizados com caracteres acentuados, símbolos e casos internacionais.\n  </p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Imagine que caracteres são ideias escritas em um idioma. Unicode seria uma grande lista internacional dizendo: “este símbolo existe e tem este número”. UTF-8 seria o método de empacotar esse número em envelopes menores para envio. A rede seria o serviço de transporte que leva os envelopes. O receptor precisa saber como abrir os envelopes corretamente para reconstruir a mensagem.\n  </p>\n  <p>\n    Base64 é como colocar um objeto que não poderia viajar solto dentro de uma caixa padronizada com etiquetas aceitas pelo transporte. A caixa não tranca o objeto; ela só permite que ele passe por canais que aceitam apenas certos formatos.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> na computação, a transformação é exata e byte a byte. Se um único byte mudar, uma assinatura pode falhar, um hash muda completamente, um caractere pode quebrar ou uma autenticação pode ser rejeitada.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    No seu notebook, crie um arquivo de texto contendo <code>Ola</code> e outro contendo <code>Olá</code>. Visualmente, a diferença parece pequena: apenas o acento. Em bytes, a diferença é maior. Em UTF-8, <code>O</code>, <code>l</code> e <code>a</code> ocupam 1 byte cada. O <code>á</code>, por outro lado, ocupa 2 bytes. Isso explica por que contagem de caracteres e contagem de bytes não são sempre a mesma coisa.\n  </p>\n  <p>\n    Outro exemplo simples: <code>Hello</code> em Base64 vira <code>SGVsbG8=</code>. Isso não está secreto. Qualquer ferramenta comum consegue decodificar. Base64 é útil para transporte, não para sigilo.\n  </p>\n  <table class=\"data-table\">\n    <thead>\n      <tr><th>Texto</th><th>Bytes em UTF-8 aproximados</th><th>Observação</th></tr>\n    </thead>\n    <tbody>\n      <tr><td><code>Ola</code></td><td><code>4F 6C 61</code></td><td>Apenas ASCII básico</td></tr>\n      <tr><td><code>Olá</code></td><td><code>4F 6C C3 A1</code></td><td>O acento ocupa mais bytes em UTF-8</td></tr>\n      <tr><td><code>Hello</code> em Base64</td><td><code>SGVsbG8=</code></td><td>Representação textual dos bytes de Hello</td></tr>\n    </tbody>\n  </table>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, sistemas legados e modernos convivem. Um ERP antigo pode exportar CSV em uma codificação local. Um serviço moderno espera UTF-8. Um pipeline de dados importa o arquivo, envia para uma API e grava logs no SIEM. Se a codificação for inferida de forma errada, nomes de clientes, cidades, usuários e descrições podem ficar corrompidos. Isso não é apenas um problema estético: pode quebrar reconciliação, alertas, busca por usuário, evidências de auditoria e relatórios regulatórios.\n  </p>\n  <p>\n    Em segurança, isso também aparece em autenticação e autorização. Um nome de usuário com caractere especial pode ser tratado de forma diferente por dois sistemas. Um WAF pode aplicar normalização diferente da aplicação. Um log pode registrar uma versão escapada de um valor, enquanto a aplicação processa outra. Em investigações, o analista precisa perguntar: “estou vendo o texto original, uma versão escapada, uma versão codificada, uma versão normalizada ou uma versão truncada?”\n  </p>\n  <div class=\"callout callout--security\">\n    <strong>Uso corporativo:</strong> padronizar UTF-8, testar caracteres internacionais, registrar charset nos contratos de API e evitar múltiplas conversões implícitas reduz incidentes operacionais e melhora rastreabilidade.\n  </div>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, codificação aparece em funções serverless, filas, eventos, logs gerenciados, objetos em storage, API gateways, balanceadores, secrets, certificados e serviços de observabilidade. Um evento JSON enviado para uma fila é texto codificado em bytes. Um segredo pode estar em texto, Base64 ou formato binário. Um certificado armazenado em PEM contém Base64. Logs em serviços gerenciados precisam preservar caracteres corretamente para busca e alertas.\n  </p>\n  <p>\n    Também é comum encontrar Base64 em integrações. Algumas plataformas exigem que dados binários sejam enviados em Base64 dentro de JSON, porque JSON é textual. Isso aumenta o tamanho dos dados e pode impactar custo de tráfego, armazenamento e logs. Em cargas grandes, essa decisão deixa de ser apenas técnica e vira decisão financeira.\n  </p>\n  <table class=\"data-table\">\n    <thead>\n      <tr><th>Cenário cloud</th><th>Onde entra codificação</th><th>Risco</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>API Gateway</td><td>Headers, query string e corpo JSON</td><td>Charset inconsistente ou payload rejeitado</td></tr>\n      <tr><td>Fila/event bus</td><td>Evento textual ou binário codificado</td><td>Aumento de tamanho com Base64</td></tr>\n      <tr><td>Logs gerenciados</td><td>Mensagens em UTF-8</td><td>Busca e correlação prejudicadas por texto quebrado</td></tr>\n      <tr><td>Secrets/certificados</td><td>PEM, Base64, JSON e variáveis de ambiente</td><td>Confundir codificação com proteção</td></tr>\n    </tbody>\n  </table>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em DevSecOps, codificação aparece em repositórios Git, pipelines, arquivos YAML, manifests Kubernetes, variáveis de ambiente, secrets, scanners, artefatos, templates, scripts e policy as code. Um arquivo salvo em codificação inesperada pode quebrar pipeline. Um segredo codificado em Base64 em um manifesto Kubernetes não está criptografado. Um scanner pode mostrar um achado em formato escapado, e o time precisa saber interpretar.\n  </p>\n  <p>\n    Kubernetes é um exemplo didático: objetos Secret frequentemente exibem valores em Base64. Isso não significa que o conteúdo esteja seguro por causa do Base64. A segurança depende de RBAC, criptografia em repouso, controle de acesso ao etcd, auditoria, rotação e boas práticas de gestão de segredo. Base64 só torna os bytes representáveis dentro de YAML/JSON.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Erro comum em pipelines:</strong> commitar um segredo em Base64 achando que ele está protegido. A forma correta é usar cofres de segredo, variáveis protegidas, OIDC federation, rotação e menor privilégio.\n  </div>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Segurança da informação depende de interpretar evidências corretamente. Muitos alertas, payloads e tokens usam codificações. Um analista pode encontrar Base64 em HTTP Basic, em partes de JWT, em scripts, em malware, em anexos, em certificados, em dados enviados por API ou em logs. O ponto essencial é: codificação é reversível quando você conhece a regra. Criptografia depende de chave. Hash é função unidirecional. Assinatura digital prova integridade e autoria dentro de um modelo criptográfico. Misturar esses conceitos causa decisões inseguras.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead>\n      <tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>Base64 tratado como segredo</td><td>Credenciais codificadas em scripts, YAML ou logs</td><td>Exposição direta após decodificação</td><td>Usar cofre de segredos, RBAC, rotação e evitar logs sensíveis</td></tr>\n      <tr><td>Texto quebrado em logs</td><td>Caracteres acentuados ou símbolos ilegíveis</td><td>Busca, correlação e auditoria prejudicadas</td><td>Padronizar UTF-8 e validar pipeline de logging</td></tr>\n      <tr><td>Normalização inconsistente</td><td>WAF, aplicação e banco interpretam texto de formas distintas</td><td>Bypass lógico, falso positivo ou falso negativo</td><td>Normalizar entrada e alinhar validações por camada</td></tr>\n      <tr><td>Caracteres visualmente parecidos</td><td>Domínios, usuários ou identificadores semelhantes</td><td>Phishing, confusão operacional ou fraude</td><td>Monitorar homógrafos, validar domínios e aplicar políticas de nomes</td></tr>\n    </tbody>\n  </table>\n  <p>\n    Em laboratórios, é aceitável decodificar exemplos controlados e entender formatos. Não é aceitável usar esse conhecimento para tentar expor credenciais de terceiros, burlar controles ou acessar sistemas sem autorização.\n  </p>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l03-title m00l03-desc\">\n    <title id=\"m00l03-title\">Texto, Unicode, UTF-8, Base64 e transporte em rede</title>\n    <desc id=\"m00l03-desc\">Fluxo mostrando um texto humano sendo convertido em ponto de código, depois em bytes UTF-8, opcionalmente em Base64, e finalmente transportado por HTTP sobre a rede.</desc>\n    <defs>\n      <marker id=\"m00l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"70\" width=\"150\" height=\"74\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"105\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Texto</text>\n    <text x=\"105\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Olá</text>\n    <rect x=\"230\" y=\"70\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"310\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Unicode</text>\n    <text x=\"310\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">U+004F U+006C U+00E1</text>\n    <rect x=\"450\" y=\"70\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"530\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">UTF-8</text>\n    <text x=\"530\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4F 6C C3 A1</text>\n    <rect x=\"690\" y=\"70\" width=\"190\" height=\"74\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"785\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">HTTP/API</text>\n    <text x=\"785\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bytes no payload</text>\n    <line x1=\"180\" y1=\"107\" x2=\"230\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"390\" y1=\"107\" x2=\"450\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"610\" y1=\"107\" x2=\"690\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <rect x=\"140\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"245\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Base64</text>\n    <text x=\"245\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">representa bytes como texto</text>\n    <rect x=\"430\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"535\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Logs/SIEM</text>\n    <text x=\"535\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interpretação correta</text>\n    <rect x=\"720\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"825\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Risco</text>\n    <text x=\"825\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">codificação ≠ sigilo</text>\n    <line x1=\"530\" y1=\"144\" x2=\"245\" y2=\"235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"785\" y1=\"144\" x2=\"535\" y2=\"235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"785\" y1=\"144\" x2=\"825\" y2=\"235\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <text x=\"490\" y=\"378\" text-anchor=\"middle\" class=\"svg-label\">A rede entrega bytes; a aplicação precisa interpretá-los com a codificação correta.</text>\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>\n    O laboratório desta aula é local e seguro. Você vai transformar texto em bytes UTF-8, observar hexadecimal, codificar e decodificar Base64 e comparar o tamanho de textos com e sem acento. O objetivo não é decorar tabela, mas criar a percepção prática de que texto em redes é uma sequência de bytes interpretada por regras.\n  </p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios reforçam a diferença entre texto, bytes, Unicode, UTF-8 e Base64. Eles também treinam uma habilidade essencial para troubleshooting: olhar para um valor textual e perguntar se você está vendo texto original, texto escapado, bytes em hexadecimal, Base64 ou outro formato de representação.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula uma falha de integração entre sistemas corporativos. Você deverá investigar um problema de acentuação, Base64 em credenciais e impacto em logs. A ideia é aplicar raciocínio defensivo e operacional, não explorar sistemas reais.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra como separar hipóteses: falha de rede, falha de TLS, falha de autenticação, falha de codificação, falha de logging e falsa sensação de segurança por uso de Base64.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> texto precisa virar bytes para ser armazenado ou transmitido.</li>\n    <li><strong>ASCII:</strong> tabela histórica útil para caracteres básicos.</li>\n    <li><strong>Unicode:</strong> repertório amplo de caracteres, representado por pontos de código.</li>\n    <li><strong>UTF-8:</strong> codificação que transforma caracteres Unicode em bytes e domina a web moderna.</li>\n    <li><strong>Base64:</strong> representação textual de bytes, útil para transporte, mas não para sigilo.</li>\n    <li><strong>Erro comum:</strong> confundir codificação com criptografia ou tratar Base64 como segredo.</li>\n    <li><strong>Uso real:</strong> HTTP, APIs, JSON, logs, SIEM, certificados, tokens, Kubernetes Secrets e pipelines.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    A próxima aula será <strong>0.4 — Bit vs Byte em redes</strong>. Depois de entender como informação e texto viram bytes, precisamos diferenciar corretamente bit e byte em medições de rede. Essa diferença aparece em velocidade de link, download, throughput, armazenamento de logs, custos cloud e diagnóstico de performance.\n  </p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 7 - Aplicação",
      "Camada 6 - Apresentação como modelo conceitual"
    ],
    "tcpIpLayers": [
      "Aplicação"
    ],
    "relatedProtocols": [
      "HTTP",
      "SMTP",
      "DNS",
      "TLS",
      "SSH",
      "Syslog"
    ],
    "dependsOn": [
      "bits",
      "bytes",
      "binário",
      "hexadecimal"
    ],
    "enables": [
      "HTTP",
      "APIs",
      "logs",
      "tokens",
      "certificados",
      "análise de payload",
      "segurança de aplicações"
    ]
  },
  "deepDive": {
    "mentalModel": "A rede transporta bytes; a aplicação dá significado aos bytes. Codificação é a ponte entre símbolos humanos e bytes transmitidos.",
    "keyTerms": [
      "ASCII",
      "Unicode",
      "UTF-8",
      "Base64",
      "caractere",
      "ponto de código",
      "charset",
      "encoding",
      "normalização"
    ],
    "limitations": [
      "ASCII não representa adequadamente idiomas globais.",
      "UTF-8 não protege dados; apenas define representação em bytes.",
      "Base64 aumenta o tamanho dos dados e não oferece confidencialidade.",
      "Dois textos visualmente parecidos podem ter sequências de bytes diferentes.",
      "Logs podem escapar caracteres e esconder a forma original do payload."
    ],
    "whenToUse": [
      "Usar UTF-8 como padrão para APIs, logs, arquivos de configuração e integrações modernas.",
      "Usar Base64 para transportar bytes binários em canais textuais quando necessário.",
      "Declarar charset em contratos de API quando houver risco de ambiguidade.",
      "Normalizar texto quando comparação exata de identidade textual for requisito."
    ],
    "whenNotToUse": [
      "Não usar Base64 como substituto de criptografia.",
      "Não assumir que tamanho em caracteres é igual a tamanho em bytes.",
      "Não converter texto repetidas vezes sem controle de encoding.",
      "Não registrar credenciais ou tokens apenas porque parecem codificados."
    ],
    "operationalImpact": [
      "Padronizar UTF-8 reduz falhas de integração, mas exige testes com caracteres acentuados e internacionais.",
      "Pipelines de logs precisam preservar codificação para permitir busca, correlação e auditoria.",
      "Troubleshooting de APIs deve incluir análise de headers, payload, charset e bytes reais."
    ],
    "financialImpact": [
      "Base64 aumenta o tamanho dos dados, podendo elevar custo de tráfego, armazenamento e logs em cloud.",
      "Erros de codificação geram custo operacional por retrabalho, falhas de integração e investigações longas.",
      "Guardar payloads completos em logs pode aumentar custo de retenção e também risco de exposição de dados sensíveis."
    ],
    "securityImpact": [
      "Credenciais em Base64 são facilmente recuperáveis e devem ser tratadas como exposição de segredo.",
      "Normalização inconsistente pode causar bypass lógico entre WAF, aplicação e banco.",
      "Caracteres visualmente semelhantes podem ser usados em phishing, fraude ou confusão operacional.",
      "Logs com codificação quebrada reduzem capacidade de detecção e resposta a incidentes."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que Base64 é criptografia.",
      "whyItHappens": "O texto codificado parece ilegível para humanos à primeira vista.",
      "consequence": "Credenciais, tokens ou dados sensíveis podem ser expostos sem proteção real.",
      "correction": "Base64 é reversível sem chave; use criptografia, assinatura, cofre de segredo e controle de acesso quando precisar de segurança."
    },
    {
      "mistake": "Achar que um caractere sempre ocupa 1 byte.",
      "whyItHappens": "Em ASCII e em muitos exemplos básicos, caracteres comuns ocupam 1 byte.",
      "consequence": "Validações de tamanho, truncamento e armazenamento podem falhar com acentos, símbolos e emojis.",
      "correction": "Diferencie quantidade de caracteres, pontos de código e bytes em uma codificação como UTF-8."
    },
    {
      "mistake": "Culpar a rede por texto quebrado.",
      "whyItHappens": "A falha aparece em uma integração remota, então parece problema de conectividade.",
      "consequence": "Tempo é perdido investigando firewall, DNS ou TLS quando o problema é interpretação dos bytes.",
      "correction": "Valide se os bytes chegam, verifique charset, Content-Type, logs e transformação na aplicação."
    },
    {
      "mistake": "Copiar valores Base64 para logs ou tickets sem cuidado.",
      "whyItHappens": "O valor parece não legível e é tratado como inofensivo.",
      "consequence": "Segredos podem ser expostos em ferramentas de suporte, chat, tickets ou SIEM.",
      "correction": "Trate Base64 como dado potencialmente sensível e mascare valores antes de compartilhar."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Acentos aparecem como caracteres estranhos, como UsuÃ¡rio.",
      "API rejeita payload JSON com caracteres especiais.",
      "Assinatura HMAC ou JWT falha após manipulação de texto.",
      "Logs não permitem buscar nomes com acento corretamente.",
      "Segredo em Base64 aparece em manifesto, log ou variável de ambiente."
    ],
    "diagnosticQuestions": [
      "Qual codificação o sistema emissor usa?",
      "Qual codificação o receptor espera?",
      "O Content-Type ou contrato da API declara charset?",
      "O texto foi convertido, escapado, normalizado ou truncado no caminho?",
      "O valor Base64 contém credencial, token, certificado, imagem, binário ou outro payload?"
    ],
    "commands": [
      {
        "platform": "Windows PowerShell",
        "command": "[Text.Encoding]::UTF8.GetBytes('Olá') | ForEach-Object { $_.ToString('X2') }",
        "purpose": "Visualizar os bytes UTF-8 de uma string com acento.",
        "expectedObservation": "Sequência hexadecimal incluindo C3 A1 para o caractere á.",
        "interpretation": "O acento ocupa mais de 1 byte em UTF-8."
      },
      {
        "platform": "Windows PowerShell",
        "command": "[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('admin:admin'))",
        "purpose": "Codificar uma string em Base64 para entender o mecanismo usado em muitos exemplos de autenticação Basic.",
        "expectedObservation": "Saída YWRtaW46YWRtaW4=.",
        "interpretation": "O valor pode ser revertido sem chave; não é segredo protegido."
      },
      {
        "platform": "Linux",
        "command": "printf 'Olá' | xxd -p",
        "purpose": "Ver os bytes UTF-8 de um texto no terminal.",
        "expectedObservation": "Saída semelhante a 4f6cc3a1.",
        "interpretation": "O caractere á aparece como dois bytes: c3 a1."
      },
      {
        "platform": "Linux",
        "command": "printf 'admin:admin' | base64",
        "purpose": "Gerar Base64 de uma string controlada.",
        "expectedObservation": "Saída YWRtaW46YWRtaW4=.",
        "interpretation": "Base64 representa bytes em texto e pode ser decodificado."
      },
      {
        "platform": "Cisco IOS",
        "command": "show logging",
        "purpose": "Observar logs textuais do equipamento e discutir preservação de caracteres e mensagens.",
        "expectedObservation": "Mensagens de log em texto, geralmente ASCII/inglês técnico.",
        "interpretation": "Equipamentos de rede também produzem texto; logs precisam ser interpretados e transportados corretamente."
      }
    ],
    "decisionTree": [
      {
        "if": "Conectividade funciona, mas texto chega quebrado",
        "then": "Investigar codificação, charset, Content-Type, serialização e conversões na aplicação."
      },
      {
        "if": "Valor parece ilegível e termina com =",
        "then": "Considerar hipótese de Base64, mas tratar como potencialmente sensível antes de decodificar ou compartilhar."
      },
      {
        "if": "Assinatura ou hash muda após reformatar texto",
        "then": "Comparar bytes antes e depois da conversão, incluindo quebras de linha, normalização e encoding."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Padronizar UTF-8 em APIs, logs, arquivos e automações.",
      "Declarar charset quando o protocolo ou contrato permitir.",
      "Tratar Base64 como dado potencialmente sensível.",
      "Mascarar credenciais, tokens e segredos antes de registrar logs.",
      "Testar entradas com acentos, símbolos, emojis e caracteres internacionais.",
      "Aplicar validação e normalização de entrada de forma consistente."
    ],
    "badPractices": [
      "Usar Base64 como proteção de segredo.",
      "Registrar Authorization headers completos em logs.",
      "Misturar codificações sem documentação.",
      "Assumir que todo texto tem 1 byte por caractere.",
      "Comparar strings sensíveis sem considerar normalização e formato canônico."
    ],
    "commonErrors": [
      "Confundir encoding com encryption.",
      "Confundir hash com Base64.",
      "Decodificar payloads sensíveis e colar em tickets ou chats.",
      "Ignorar caracteres invisíveis, espaços especiais ou diferenças de normalização."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de credenciais codificadas",
        "description": "Credenciais ou tokens em Base64 podem ser facilmente decodificados se forem expostos em logs, repositórios ou tickets.",
        "defensiveExplanation": "O risco não está no Base64 em si, mas em tratá-lo como se oferecesse sigilo.",
        "mitigation": "Não registrar segredos, usar cofres, mascaramento, rotação, RBAC e revisão de logs."
      },
      {
        "name": "Bypass por normalização inconsistente",
        "description": "Camadas diferentes podem interpretar caracteres equivalentes ou escapados de formas diferentes.",
        "defensiveExplanation": "Um controle pode validar uma forma textual enquanto a aplicação processa outra.",
        "mitigation": "Normalizar entrada antes de validar, alinhar WAF e aplicação e testar casos de encoding."
      },
      {
        "name": "Perda de evidência por logs corrompidos",
        "description": "Texto mal codificado reduz a capacidade de busca e correlação em incidentes.",
        "defensiveExplanation": "Mesmo que o evento exista, ele pode não ser encontrado por pesquisas ou regras esperadas.",
        "mitigation": "Padronizar UTF-8, validar pipeline de logs e monitorar falhas de parsing."
      }
    ],
    "monitoring": [
      "Alertar sobre headers Authorization registrados em logs.",
      "Detectar strings Base64 longas em locais incomuns, como parâmetros, logs ou mensagens de erro.",
      "Monitorar falhas de parsing em pipelines de logs.",
      "Criar testes para payloads com caracteres fora de ASCII."
    ],
    "hardening": [
      "Desabilitar logging de cabeçalhos sensíveis.",
      "Usar secret scanning em repositórios e pipelines.",
      "Aplicar políticas de encoding em contratos de API.",
      "Usar controles de acesso e criptografia para armazenamento de logs sensíveis."
    ],
    "detectionIdeas": [
      "Buscar padrões como Basic seguido de Base64 em logs.",
      "Procurar mensagens com caracteres substitutos ou sequências quebradas.",
      "Comparar aumento de erros 400/401 após mudança de encoding em uma API.",
      "Correlacionar falhas de autenticação com usuários contendo caracteres especiais."
    ]
  },
  "lab": {
    "id": "lab-0.3",
    "title": "Observando UTF-8 e Base64 na prática",
    "labType": "security",
    "objective": "Ver como texto vira bytes em UTF-8, como Base64 representa bytes como texto e por que Base64 não protege segredos.",
    "scenario": "Você está investigando uma integração de API que falha com acentos e encontrou um valor Base64 em um cabeçalho de autenticação. O objetivo é reproduzir o comportamento localmente com dados controlados.",
    "topology": "Notebook local -> terminal/PowerShell -> saída textual e bytes observados. Opcionalmente: navegador ou ferramenta HTTP em aula futura.",
    "architecture": "Laboratório local sem tráfego externo. O aluno gera texto, observa bytes, codifica em Base64, decodifica e interpreta os resultados.",
    "prerequisites": [
      "Ter concluído as aulas 0.1 e 0.2.",
      "Ter acesso a Windows PowerShell ou terminal Linux.",
      "Usar apenas exemplos controlados, sem credenciais reais."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "Opcional: Python 3",
      "Opcional: editor de texto configurado para UTF-8"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não use credenciais reais nos comandos.",
      "Não cole tokens reais em decodificadores online.",
      "Não registre Authorization headers reais em tickets, prints ou logs.",
      "O objetivo é entender codificação defensivamente, não expor dados de terceiros."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Observar bytes UTF-8 no Windows",
        "instruction": "No PowerShell, gere os bytes UTF-8 do texto Olá.",
        "command": "[Text.Encoding]::UTF8.GetBytes('Olá') | ForEach-Object { $_.ToString('X2') }",
        "expectedOutput": "4F, 6C, C3, A1 em linhas ou formato equivalente.",
        "explanation": "O e l são ASCII básico; á ocupa dois bytes em UTF-8: C3 A1."
      },
      {
        "number": 2,
        "title": "Observar bytes UTF-8 no Linux",
        "instruction": "No Linux, use printf e xxd para ver a sequência hexadecimal.",
        "command": "printf 'Olá' | xxd -p",
        "expectedOutput": "4f6cc3a1",
        "explanation": "A saída hexadecimal confirma que o texto visual Olá ocupa 4 bytes, não 3."
      },
      {
        "number": 3,
        "title": "Codificar texto controlado em Base64",
        "instruction": "Codifique uma string de exemplo, sem credenciais reais.",
        "command": "printf 'admin:admin' | base64  # Linux\n[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('admin:admin'))  # PowerShell",
        "expectedOutput": "YWRtaW46YWRtaW4=",
        "explanation": "Esse valor é apenas a representação Base64 dos bytes de admin:admin."
      },
      {
        "number": 4,
        "title": "Decodificar Base64",
        "instruction": "Decodifique o valor gerado para provar que não há sigilo.",
        "command": "printf 'YWRtaW46YWRtaW4=' | base64 -d  # Linux\n[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('YWRtaW46YWRtaW4='))  # PowerShell",
        "expectedOutput": "admin:admin",
        "explanation": "Qualquer pessoa com o valor pode recuperar o texto original se ele não estiver criptografado."
      },
      {
        "number": 5,
        "title": "Comparar caracteres e bytes",
        "instruction": "Compare o tamanho em caracteres e bytes de textos com e sem acento.",
        "command": "python - <<'PY'\nfor s in ['Ola', 'Olá', 'ação', 'rede']:\n    b = s.encode('utf-8')\n    print(s, 'caracteres=', len(s), 'bytes=', len(b), 'hex=', b.hex())\nPY",
        "expectedOutput": "Textos com acento podem ter mais bytes do que caracteres.",
        "explanation": "Isso reforça a diferença entre texto percebido e bytes transmitidos."
      }
    ],
    "expectedResult": "O aluno deve demonstrar que texto em UTF-8 vira bytes, que caracteres acentuados podem ocupar múltiplos bytes e que Base64 é reversível sem chave.",
    "validation": [
      {
        "check": "Bytes de Olá foram observados",
        "command": "printf 'Olá' | xxd -p ou comando equivalente no PowerShell",
        "expected": "Sequência contendo 4F 6C C3 A1 ou equivalente em minúsculas.",
        "ifFails": "Verifique se o terminal está usando UTF-8 e se o texto foi digitado corretamente."
      },
      {
        "check": "Base64 foi decodificado",
        "command": "printf 'YWRtaW46YWRtaW4=' | base64 -d",
        "expected": "admin:admin",
        "ifFails": "Verifique quebra de linha, comando disponível e se o valor Base64 foi copiado corretamente."
      },
      {
        "check": "Diferença entre caracteres e bytes foi compreendida",
        "command": "Script Python de comparação",
        "expected": "Textos com acento mostrando mais bytes que caracteres.",
        "ifFails": "Confirme que o Python está executando com suporte UTF-8 no ambiente."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O terminal mostra caracteres quebrados",
        "probableCause": "Codificação do terminal ou fonte incompatível.",
        "howToConfirm": "Teste outro terminal, verifique locale no Linux ou configuração de encoding no Windows Terminal.",
        "fix": "Configurar terminal para UTF-8 e repetir com texto simples."
      },
      {
        "symptom": "base64 -d não funciona",
        "probableCause": "Opção diferente em algumas plataformas ou comando indisponível.",
        "howToConfirm": "Execute base64 --help ou use Python/PowerShell.",
        "fix": "Usar alternativa com Python ou PowerShell."
      },
      {
        "symptom": "Saída tem bytes diferentes",
        "probableCause": "Texto copiado com caractere visualmente diferente, normalização distinta ou aspas diferentes.",
        "howToConfirm": "Digite manualmente a string e compare caractere por caractere.",
        "fix": "Usar exemplos simples e documentar exatamente a entrada usada."
      }
    ],
    "improvements": [
      "Testar emojis e observar que eles ocupam mais bytes em UTF-8.",
      "Criar um pequeno arquivo JSON em UTF-8 e observar seus bytes.",
      "Comparar um valor Base64 com o mesmo conteúdo criptografado em uma aula futura.",
      "Observar no Wireshark, em aula futura de HTTP, como payload textual aparece em uma requisição sem TLS em laboratório controlado."
    ],
    "evidenceToCollect": [
      "Print ou cópia da saída hexadecimal de Olá.",
      "Valor Base64 gerado para string controlada.",
      "Saída decodificada demonstrando reversibilidade.",
      "Tabela com quantidade de caracteres e bytes de três exemplos."
    ],
    "questions": [
      "Por que Olá ocupa mais bytes que Ola em UTF-8?",
      "Por que Base64 não deve ser tratado como segredo?",
      "Que tipo de problema surgiria se uma API enviasse UTF-8 e a outra interpretasse outra codificação?",
      "Por que é perigoso colar tokens reais em decodificadores online?"
    ],
    "challenge": "Receba o valor YWRtaW46YWRtaW4= em um exemplo de cabeçalho Authorization controlado. Explique o que ele representa, por que isso não é seguro como segredo e quais controles seriam necessários em ambiente real.",
    "solution": "O valor é Base64 para admin:admin. Ele não oferece confidencialidade, pois pode ser decodificado sem chave. Em ambiente real, deve-se usar TLS, não registrar o header, evitar credenciais estáticas, aplicar autenticação adequada, rotacionar segredos, usar cofres e monitorar exposição."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que a rede pode entregar os bytes corretamente e, ainda assim, a aplicação exibir texto errado?",
      "hints": [
        "Pense na diferença entre transporte e interpretação.",
        "TCP não sabe o que é um caractere acentuado."
      ],
      "expectedIdeas": [
        "bytes",
        "codificação",
        "interpretação",
        "UTF-8",
        "aplicação"
      ],
      "explanation": "A rede transporta bytes. Se o receptor interpretar esses bytes com a codificação errada, o texto reconstruído fica incorreto mesmo sem perda de pacotes."
    },
    {
      "type": "diagnóstico",
      "question": "Uma API começou a falhar apenas quando nomes possuem acento. O que você verificaria antes de culpar firewall ou DNS?",
      "hints": [
        "Verifique Content-Type.",
        "Compare bytes enviados e recebidos.",
        "Teste payloads com e sem acento."
      ],
      "expectedIdeas": [
        "charset",
        "UTF-8",
        "payload",
        "logs",
        "serialização",
        "normalização"
      ],
      "explanation": "Como a falha depende de caracteres, a hipótese de codificação/serialização deve ser testada antes de investigar conectividade básica."
    },
    {
      "type": "cenário real",
      "question": "Você encontrou um valor Base64 em um manifesto Kubernetes Secret. Como explicar para o time por que isso não significa que o segredo está criptografado?",
      "hints": [
        "Base64 é reversível sem chave.",
        "Segurança depende de controles ao redor.",
        "Pense em RBAC, etcd e cofres."
      ],
      "expectedIdeas": [
        "Base64 não é criptografia",
        "RBAC",
        "criptografia em repouso",
        "secret scanning",
        "cofre de segredos",
        "rotação"
      ],
      "explanation": "Kubernetes usa Base64 para representar bytes em YAML/JSON. A proteção vem de controle de acesso, armazenamento seguro, auditoria e práticas de gestão de segredos."
    }
  ],
  "quiz": [
    {
      "id": "q0.3.1",
      "type": "conceito",
      "q": "Qual afirmação descreve melhor o papel do UTF-8?",
      "opts": [
        "É uma codificação que transforma caracteres Unicode em bytes.",
        "É um algoritmo de criptografia para proteger texto.",
        "É um protocolo de roteamento entre redes.",
        "É um tipo de endereço MAC."
      ],
      "a": 0,
      "exp": "UTF-8 é uma codificação de Unicode em bytes. Ele não oferece sigilo e não é protocolo de rede.",
      "difficulty": "iniciante",
      "topic": "utf-8"
    },
    {
      "id": "q0.3.2",
      "type": "segurança",
      "q": "Por que Base64 não deve ser usado como mecanismo de proteção de segredo?",
      "opts": [
        "Porque pode ser revertido sem chave.",
        "Porque só funciona em sistemas Linux.",
        "Porque altera o endereço IP de origem.",
        "Porque sempre corrompe dados binários."
      ],
      "a": 0,
      "exp": "Base64 é uma representação reversível de bytes em texto. Qualquer pessoa com o valor pode decodificar se conhecer a regra.",
      "difficulty": "iniciante",
      "topic": "base64"
    },
    {
      "id": "q0.3.3",
      "type": "diagnóstico",
      "q": "Uma integração falha apenas com nomes que possuem acento. Qual hipótese deve ser investigada cedo?",
      "opts": [
        "Problema de codificação ou charset.",
        "Falha obrigatória de cabo físico.",
        "Ataque BGP.",
        "Conflito de endereço MAC."
      ],
      "a": 0,
      "exp": "Quando a falha depende de caracteres especiais, codificação, serialização e interpretação dos bytes são hipóteses fortes.",
      "difficulty": "iniciante",
      "topic": "troubleshooting"
    },
    {
      "id": "q0.3.4",
      "type": "comparação",
      "q": "Qual diferença entre Unicode e UTF-8 está correta?",
      "opts": [
        "Unicode define pontos de código; UTF-8 define como codificá-los em bytes.",
        "Unicode é criptografia; UTF-8 é firewall.",
        "Unicode é usado apenas em IPv4; UTF-8 apenas em switches.",
        "Não há diferença: os termos são sempre sinônimos perfeitos."
      ],
      "a": 0,
      "exp": "Unicode organiza o repertório de caracteres. UTF-8 é uma forma de representar esses caracteres em bytes.",
      "difficulty": "intermediário",
      "topic": "unicode"
    },
    {
      "id": "q0.3.5",
      "type": "cenário",
      "q": "Um manifesto contém um Secret em Base64. Qual prática é correta?",
      "opts": [
        "Tratar o valor como sensível e controlar acesso ao manifesto e ao cluster.",
        "Publicar no repositório porque Base64 é seguro.",
        "Enviar em chat porque não é legível.",
        "Desabilitar TLS porque Base64 já protege."
      ],
      "a": 0,
      "exp": "Base64 não protege o segredo. O valor deve ser tratado como sensível e protegido por controles adequados.",
      "difficulty": "intermediário",
      "topic": "devsecops"
    },
    {
      "id": "q0.3.6",
      "type": "arquitetura",
      "q": "Em qual camada conceitual problemas de charset costumam aparecer mais diretamente?",
      "opts": [
        "Aplicação e representação dos dados.",
        "Camada física do cabo exclusivamente.",
        "Somente camada de roteamento IP.",
        "Somente tabela ARP."
      ],
      "a": 0,
      "exp": "Charset e encoding são problemas de interpretação de dados pela aplicação, mesmo que dependam de bytes entregues pelas camadas inferiores.",
      "difficulty": "iniciante",
      "topic": "arquitetura"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.3.1",
      "front": "O que é ASCII?",
      "back": "Uma tabela histórica que associa números a caracteres básicos, especialmente úteis para texto em inglês e controles simples.",
      "tags": [
        "ascii",
        "texto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.2",
      "front": "O que é Unicode?",
      "back": "Um padrão que atribui pontos de código a um repertório amplo de caracteres do mundo todo.",
      "tags": [
        "unicode",
        "texto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.3",
      "front": "O que é UTF-8?",
      "back": "Uma codificação que transforma pontos de código Unicode em sequências de bytes.",
      "tags": [
        "utf-8",
        "bytes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.4",
      "front": "Base64 é criptografia?",
      "back": "Não. Base64 é uma representação reversível de bytes como texto e não oferece sigilo.",
      "tags": [
        "base64",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.5",
      "front": "Por que um caractere pode ocupar mais de 1 byte?",
      "back": "Porque codificações como UTF-8 usam múltiplos bytes para representar caracteres fora do ASCII básico.",
      "tags": [
        "utf-8",
        "bytes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.3.6",
      "front": "Qual risco de logs com encoding quebrado?",
      "back": "Eles prejudicam busca, correlação, auditoria e investigação de incidentes.",
      "tags": [
        "logs",
        "segurança"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex0.3.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre caractere, ponto de código e codificação.",
      "expectedAnswer": "Caractere é o símbolo percebido; ponto de código é o número que o representa em Unicode; codificação é a regra que transforma esse número em bytes.",
      "explanation": "Essa distinção evita confundir Unicode com UTF-8 e ajuda a diagnosticar problemas de texto."
    },
    {
      "id": "ex0.3.2",
      "type": "prático",
      "prompt": "Decodifique o valor Base64 SGVsbG8= usando ferramenta local e explique o resultado.",
      "expectedAnswer": "O resultado é Hello. Isso demonstra que Base64 é reversível e não é sigilo.",
      "explanation": "O objetivo é perceber que Base64 é transporte/representação, não proteção."
    },
    {
      "id": "ex0.3.3",
      "type": "diagnóstico",
      "prompt": "Uma API recebe corretamente payloads sem acento, mas falha com João e Ação. Liste três hipóteses técnicas.",
      "expectedAnswer": "Charset divergente, serialização incorreta, validação mal implementada, normalização diferente, banco ou log usando encoding incompatível.",
      "explanation": "A dependência de acento aponta para interpretação textual antes de apontar para rede física."
    },
    {
      "id": "ex0.3.4",
      "type": "segurança",
      "prompt": "Explique por que um Kubernetes Secret em Base64 ainda precisa de controle de acesso e proteção em repouso.",
      "expectedAnswer": "Porque Base64 pode ser decodificado sem chave. A proteção depende de RBAC, criptografia do armazenamento, auditoria, rotação e gestão adequada de segredos.",
      "explanation": "Esse exercício conecta fundamentos de codificação com DevSecOps e segurança de identidades."
    }
  ],
  "challenge": {
    "title": "Investigue uma falha de integração causada por codificação",
    "scenario": "Uma empresa integrou um sistema legado com uma API moderna. Registros sem acento são processados. Registros com acento aparecem quebrados nos logs e alguns tokens ou credenciais de teste aparecem em Base64 em mensagens de erro.",
    "tasks": [
      "Listar hipóteses técnicas relacionadas a codificação.",
      "Propor testes locais para comparar caracteres e bytes.",
      "Explicar por que a rede pode não ser a causa principal.",
      "Classificar o risco de Base64 em logs.",
      "Propor mitigação operacional, de segurança e de DevSecOps."
    ],
    "constraints": [
      "Não usar credenciais reais.",
      "Não usar decodificadores online para dados sensíveis.",
      "Preservar evidências sem expor segredo.",
      "Separar falha de transporte de falha de interpretação."
    ],
    "expectedDeliverables": [
      "Relatório com hipóteses e testes.",
      "Tabela diferenciando texto, bytes, UTF-8 e Base64.",
      "Plano de correção para API e logs.",
      "Lista de controles para evitar vazamento de segredos codificados."
    ],
    "gradingRubric": [
      {
        "criterion": "Diagnóstico técnico de encoding",
        "points": 30,
        "description": "Identifica corretamente charset, UTF-8, normalização e serialização como hipóteses."
      },
      {
        "criterion": "Separação entre rede e aplicação",
        "points": 20,
        "description": "Explica por que conectividade pode estar correta mesmo com texto quebrado."
      },
      {
        "criterion": "Segurança defensiva",
        "points": 30,
        "description": "Reconhece Base64 como reversível e propõe controles de segredo."
      },
      {
        "criterion": "Clareza operacional",
        "points": 20,
        "description": "Propõe evidências, testes e mitigação de forma aplicável."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O primeiro passo é separar entrega de bytes de interpretação dos bytes. Se a integração funciona sem acento e falha com acento, a hipótese de rede física, roteamento ou firewall perde força. A investigação deve olhar para charset, UTF-8, serialização, normalização, logs e tratamento de erro. O Base64 em mensagens de erro deve ser tratado como dado sensível, porque pode conter credenciais ou tokens reversíveis.",
    "steps": [
      "Confirmar que a conectividade básica e o TLS estão funcionando.",
      "Criar payloads mínimos com e sem acento.",
      "Comparar bytes enviados e recebidos.",
      "Verificar Content-Type, charset e contrato da API.",
      "Verificar se logs escapam, truncam ou recodificam valores.",
      "Decodificar apenas exemplos controlados de Base64 localmente.",
      "Mascarar valores sensíveis e corrigir logging.",
      "Padronizar UTF-8 e adicionar testes automatizados com caracteres internacionais."
    ],
    "commonWrongAnswers": [
      {
        "answer": "É problema de firewall porque acontece pela rede.",
        "whyItIsWrong": "Se bytes chegam e apenas caracteres específicos falham, a causa provável está na interpretação ou serialização, não necessariamente em firewall."
      },
      {
        "answer": "Base64 nos logs não importa porque ninguém entende.",
        "whyItIsWrong": "Base64 é facilmente decodificado sem chave e pode expor segredos."
      },
      {
        "answer": "Remover todos os acentos resolve.",
        "whyItIsWrong": "Isso mascara o problema, prejudica qualidade dos dados e não resolve a causa de encoding."
      }
    ],
    "finalAnswer": "A solução correta é padronizar UTF-8 entre produtor e consumidor, declarar charset quando aplicável, testar payloads com caracteres acentuados, corrigir pipeline de logs, mascarar valores sensíveis e tratar qualquer Base64 como dado potencialmente exposto. A rede deve ser verificada, mas a causa central provável é codificação/interpretação de texto."
  },
  "glossary": [
    {
      "term": "ASCII",
      "shortDefinition": "Tabela histórica de caracteres básicos.",
      "longDefinition": "Padrão que associa valores numéricos a caracteres como letras, números, pontuação e controles básicos, com forte presença em protocolos e sistemas antigos.",
      "example": "A letra A é representada pelo valor decimal 65, hexadecimal 0x41.",
      "relatedTerms": [
        "Unicode",
        "UTF-8",
        "caractere"
      ],
      "relatedLessons": [
        "0.2",
        "0.3",
        "8.1"
      ]
    },
    {
      "term": "Unicode",
      "shortDefinition": "Padrão que organiza um repertório amplo de caracteres.",
      "longDefinition": "Unicode atribui pontos de código a caracteres de muitos idiomas e símbolos, permitindo representação textual global.",
      "example": "O caractere á possui ponto de código U+00E1.",
      "relatedTerms": [
        "ponto de código",
        "UTF-8"
      ],
      "relatedLessons": [
        "0.3"
      ]
    },
    {
      "term": "UTF-8",
      "shortDefinition": "Codificação de Unicode em bytes.",
      "longDefinition": "Forma de transformar pontos de código Unicode em sequências de 1 a 4 bytes, mantendo compatibilidade com ASCII para caracteres básicos.",
      "example": "O caractere á é codificado em UTF-8 como C3 A1.",
      "relatedTerms": [
        "Unicode",
        "encoding",
        "byte"
      ],
      "relatedLessons": [
        "0.2",
        "0.3"
      ]
    },
    {
      "term": "Base64",
      "shortDefinition": "Representação textual reversível de bytes.",
      "longDefinition": "Codificação que representa dados binários usando caracteres textuais seguros para transporte em canais que esperam texto.",
      "example": "admin:admin pode ser representado como YWRtaW46YWRtaW4=.",
      "relatedTerms": [
        "encoding",
        "token",
        "segredo"
      ],
      "relatedLessons": [
        "0.3",
        "8.4",
        "10.5"
      ]
    },
    {
      "term": "Encoding",
      "shortDefinition": "Regra para representar informação em bytes ou texto.",
      "longDefinition": "Processo ou padrão usado para transformar caracteres, números ou bytes em uma forma armazenável ou transportável.",
      "example": "UTF-8 é encoding de texto; Base64 é encoding textual de bytes.",
      "relatedTerms": [
        "charset",
        "UTF-8",
        "Base64"
      ],
      "relatedLessons": [
        "0.3"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "The Unicode Standard",
      "organization": "Unicode Consortium",
      "url": "https://www.unicode.org/standard/standard.html",
      "note": "Referência conceitual para Unicode e pontos de código."
    },
    {
      "type": "rfc",
      "title": "RFC 3629 - UTF-8, a transformation format of ISO 10646",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc3629",
      "note": "Referência técnica estável sobre UTF-8."
    },
    {
      "type": "rfc",
      "title": "RFC 4648 - The Base16, Base32, and Base64 Data Encodings",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc4648",
      "note": "Referência técnica sobre Base64 e outras codificações."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 - Aula 0.2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m00/0.2",
      "note": "Base necessária sobre bits, bytes, binário e hexadecimal."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Kubernetes e Segurança de Workloads",
      "lesson": "Secrets e configuração",
      "reason": "Kubernetes Secrets usam Base64 para representar bytes em YAML/JSON, mas exigem RBAC, criptografia e gestão segura."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Tokens, Claims e Federação",
      "lesson": "JWT, claims e representação de tokens",
      "reason": "JWT usa Base64URL em suas partes, o que não deve ser confundido com criptografia do conteúdo."
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
      "0.4"
    ]
  }
};
