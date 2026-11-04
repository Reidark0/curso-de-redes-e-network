export const lesson0003 = {
  "id": "0.3",
  "moduleId": "m00",
  "order": 3,
  "title": "ASCII, Unicode, UTF-8 e Base64",
  "subtitle": "Como texto vira bytes em redes, logs, APIs, tokens e análise de segurança.",
  "duration": "100-145 min",
  "estimatedStudyTimeMinutes": 145,
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
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Redes transportam bytes, mas boa parte do que você lê em TI e Segurança é texto: domínios, URLs, cabeçalhos HTTP, JSON, logs, nomes de usuário, tokens e eventos de SIEM. Quando esse texto vira bytes de um jeito e é lido de outro, aparecem falhas difíceis de diagnosticar: acentos quebrados, autenticação falhando, payloads rejeitados, assinaturas inválidas e evidências de incidente mal interpretadas.\n  </p>\n  <p>\n    Imagine um SOC analisando um alerta de API. Um campo mostra <code>Usuário</code>, outro mostra <code>UsuÃ¡rio</code>, e um cabeçalho contém <code>Basic YWRtaW46YWRtaW4=</code>. Sem entender codificação, o analista pode achar que Base64 é criptografia, que o texto foi corrompido por malware, ou perder tempo investigando a rede quando o problema real é conversão de caracteres.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> duas aplicações estão funcionando na rede, o firewall permite o tráfego, o TLS está válido, mas a integração falha porque uma API espera UTF-8 e outra envia texto em outra codificação. O pacote chega, porém a interpretação dos bytes está errada.\n  </div>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>História</h2>\n  <p>\n    Os primeiros sistemas comerciais precisavam representar texto em inglês: letras, dígitos, pontuação e alguns caracteres de controle. O <strong>ASCII</strong> resolveu isso com uma tabela de 7 bits (128 valores, de 0 a 127) que associa números a caracteres. A letra <code>A</code>, por exemplo, é o decimal 65, o hexadecimal <code>0x41</code> e o binário <code>0100 0001</code>.\n  </p>\n  <p>\n    Acentos, outros alfabetos, símbolos e ideogramas não cabem em 128 valores. Surgiram então tabelas locais de 8 bits (como ISO-8859-1, também chamada Latin-1, e Windows-1252) que usam os valores de 128 a 255 para caracteres regionais. Isso criou fragmentação: o mesmo byte significa caracteres diferentes conforme a tabela usada. É daí que vem o texto quebrado, como <code>UsuÃ¡rio</code> no lugar de <code>Usuário</code>.\n  </p>\n  <p>\n    O <strong>Unicode</strong> organizou um repertório universal, atribuindo a cada caractere um ponto de código, como <code>U+0041</code> para <code>A</code> e <code>U+00E1</code> para <code>á</code>. Ponto de código ainda não é a sequência de bytes transmitida: para isso existem codificações como UTF-8, UTF-16 e UTF-32. O <strong>UTF-8</strong> dominou a web e os sistemas modernos porque os caracteres ASCII continuam ocupando 1 byte, com os mesmos valores, e os demais usam de 2 a 4 bytes.\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Padrão</th><th>O que resolveu</th><th>Limitação / o que não é</th><th>Exemplo</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>ASCII</td><td>Texto básico em inglês; ainda é a base de headers e comandos de protocolos</td><td>Só 128 caracteres; não cobre idiomas globais</td><td><code>A</code> = 65 = <code>0x41</code></td></tr>\n        <tr><td>Tabelas locais (Latin-1, Windows-1252)</td><td>Caracteres regionais em 1 byte</td><td>O mesmo byte muda de sentido entre tabelas</td><td><code>0xE1</code> = <code>á</code> em Latin-1</td></tr>\n        <tr><td>Unicode</td><td>Repertório universal de caracteres</td><td>Não é, sozinho, a sequência de bytes</td><td><code>á</code> = <code>U+00E1</code></td></tr>\n        <tr><td>UTF-8</td><td>Codificar Unicode em bytes, compatível com ASCII</td><td>Caracteres têm tamanhos diferentes; não é criptografia</td><td><code>á</code> = <code>C3 A1</code></td></tr>\n        <tr><td>Base64</td><td>Transportar bytes quaisquer em canais de texto</td><td>Aumenta o tamanho; não protege segredo</td><td><code>admin:admin</code> = <code>YWRtaW46YWRtaW4=</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    Texto não é transmitido como ideia abstrata: ele precisa virar bytes, e os dois lados precisam concordar sobre como interpretá-los. Se o emissor grava com uma codificação e o receptor lê com outra, o tráfego chega intacto e o resultado sai errado.\n  </p>\n  <p>\n    Protocolos transportam sequências de bytes; alguns campos são binários, outros são texto. HTTP usa texto em headers e payloads, JSON é texto, DNS carrega nomes, logs são texto. Autenticação Basic usa Base64, certificados PEM são Base64 entre marcadores textuais e JWT tem partes em Base64URL. A rede pode estar perfeita e a aplicação falhar ao interpretar o conteúdo.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Caracteres não ASCII:</strong> acentos, símbolos e emojis ocupam mais bytes que o esperado.</li>\n    <li><strong>Base64 mal compreendido:</strong> dados decodificáveis por qualquer um são tratados como segredo.</li>\n    <li><strong>Logs quebrados:</strong> evidências de auditoria e incidente ficam difíceis de pesquisar e correlacionar.</li>\n    <li><strong>Assinaturas inválidas:</strong> mudar bytes ao converter texto invalida HMAC, assinatura digital ou hash.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Armadilha comum:</strong> dois textos iguais na tela não têm necessariamente os mesmos bytes. Normalização Unicode, acentos compostos e caracteres visualmente parecidos causam diferenças importantes em autenticação, logs e validações. Exemplo: <code>á</code> pode ser o ponto de código único <code>U+00E1</code> (bytes <code>C3 A1</code>) ou <code>a</code> seguido do acento combinante <code>U+0301</code> (bytes <code>61 CC 81</code>). Normalizar (por exemplo, para a forma NFC) faz as duas virarem a mesma sequência antes de comparar.\n  </div>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>\n    Um <strong>caractere</strong> é a unidade textual que você percebe, como <code>A</code>, <code>ç</code>, <code>?</code> ou <code>€</code>. Um <strong>ponto de código</strong> é o número atribuído a esse caractere no Unicode. Uma <strong>codificação</strong> (encoding) é a regra que transforma pontos de código em bytes. <strong>Charset</strong>, na prática, indica qual codificação usar para interpretar o texto (por exemplo, <code>charset=utf-8</code> num cabeçalho HTTP), embora o uso histórico do termo varie.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição essencial:</strong> ASCII é uma tabela histórica de caracteres básicos; Unicode é um padrão amplo que atribui números a caracteres; UTF-8 é uma codificação que transforma pontos de código Unicode em bytes; Base64 é uma forma de representar bytes quaisquer usando caracteres de texto seguros.\n  </div>\n  <p>\n    Para redes, o ponto central é: a rede transporta bytes, e o significado deles depende do protocolo e da codificação combinada. Quando uma API diz que envia JSON em UTF-8, o corpo é texto JSON cujos bytes devem ser lidos como UTF-8. Quando um certificado está em PEM, os bytes binários do certificado foram codificados em Base64 para caber num arquivo de texto.\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Termo</th><th>Pergunta que responde</th><th>Exemplo</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>Caractere</td><td>Qual símbolo humano?</td><td><code>A</code>, <code>á</code>, <code>你</code></td></tr>\n        <tr><td>Ponto de código</td><td>Qual número representa o símbolo?</td><td><code>U+0041</code>, <code>U+00E1</code></td></tr>\n        <tr><td>Codificação</td><td>Como esse número vira bytes?</td><td>UTF-8, UTF-16</td></tr>\n        <tr><td>Base64</td><td>Como representar bytes como texto seguro?</td><td><code>SGVsbG8=</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n  <h3>Codificação não é criptografia, hash nem assinatura</h3>\n  <p>\n    Base64 aparece em HTTP Basic, em partes de JWT, em certificados, em anexos, em scripts e em malware. Saber em qual categoria um valor está evita decisões inseguras:\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Mecanismo</th><th>Precisa de chave?</th><th>Reversível?</th><th>Para que serve</th></tr>\n      </thead>\n      <tbody>\n        <tr><td>Codificação (UTF-8, Base64)</td><td>Não</td><td>Sim, por qualquer um que conheça a regra</td><td>Representar dados</td></tr>\n        <tr><td>Criptografia</td><td>Sim</td><td>Só com a chave</td><td>Confidencialidade</td></tr>\n        <tr><td>Hash</td><td>Não</td><td>Não (função unidirecional)</td><td>Detectar alteração, comparar sem guardar o original</td></tr>\n        <tr><td>Assinatura digital / HMAC</td><td>Sim</td><td>Não se aplica: é verificada</td><td>Provar integridade e origem; muda se um único byte mudar</td></tr>\n      </tbody>\n    </table>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <h3>Do texto aos bytes (UTF-8)</h3>\n  <p>\n    Acompanhe a palavra <code>Olá</code>. Ela tem três caracteres: <code>O</code>, <code>l</code> e <code>á</code>, com pontos de código <code>U+004F</code>, <code>U+006C</code> e <code>U+00E1</code>. Em UTF-8, <code>O</code> e <code>l</code> ocupam 1 byte cada (<code>4F</code> e <code>6C</code>, os mesmos valores do ASCII), e <code>á</code> ocupa 2 bytes: <code>C3 A1</code>. Resultado: 3 caracteres, 4 bytes. Ao salvar ou transmitir, a aplicação escolhe a codificação e gera esses bytes; eles viajam dentro de HTTP sobre TCP/IP sem que a rede saiba que são texto; o receptor os interpreta com a codificação que ele espera. Se ela for diferente da do emissor, o texto sai errado.\n  </p>\n  <p>O tamanho em UTF-8 depende do ponto de código:</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Faixa de pontos de código</th><th>Bytes em UTF-8</th><th>Exemplo</th></tr>\n      </thead>\n      <tbody>\n        <tr><td><code>U+0000</code> a <code>U+007F</code> (ASCII)</td><td>1</td><td><code>A</code> = <code>41</code></td></tr>\n        <tr><td><code>U+0080</code> a <code>U+07FF</code></td><td>2</td><td><code>á</code> = <code>C3 A1</code>, <code>ç</code> = <code>C3 A7</code></td></tr>\n        <tr><td><code>U+0800</code> a <code>U+FFFF</code></td><td>3</td><td><code>€</code> (<code>U+20AC</code>) = <code>E2 82 AC</code></td></tr>\n        <tr><td><code>U+10000</code> em diante</td><td>4</td><td>😀 (<code>U+1F600</code>) = <code>F0 9F 98 80</code></td></tr>\n      </tbody>\n    </table>\n  </div>\n  <h3>Por que aparece <code>UsuÃ¡rio</code></h3>\n  <p>\n    Esse texto quebrado (às vezes chamado de <em>mojibake</em>) tem uma causa exata: os bytes UTF-8 de <code>á</code>, <code>C3 A1</code>, foram lidos com uma tabela de 1 byte por caractere, como Latin-1 ou Windows-1252. Nessas tabelas, <code>C3</code> é <code>Ã</code> e <code>A1</code> é <code>¡</code>. Por isso <code>á</code> vira <code>Ã¡</code>, <code>ã</code> (<code>C3 A3</code>) vira <code>Ã£</code> e <code>ç</code> (<code>C3 A7</code>) vira <code>Ã§</code>. Ver <code>Ã</code> seguido de outro símbolo é uma pista forte de UTF-8 interpretado como Latin-1. O caminho inverso também acontece: o byte Latin-1 <code>E1</code> (<code>á</code>) não é UTF-8 válido sozinho, e o receptor costuma exibir o caractere de substituição <code>�</code>.\n  </p>\n  <h3>Base64: bytes como texto</h3>\n  <p>\n    Base64 resolve outro problema: nem todo canal de texto aceita qualquer byte. Bytes de controle, quebras de linha e valores binários arbitrários podem ser alterados ou rejeitados em e-mail, JSON, XML ou campos HTTP. Base64 não mapeia caracteres humanos para bytes; ele pega bytes já existentes e os reescreve com 64 caracteres seguros: <code>A–Z</code>, <code>a–z</code>, <code>0–9</code>, <code>+</code> e <code>/</code>.\n  </p>\n  <ol class=\"flow-list\">\n    <li>Junte os bytes em blocos de 3 (24 bits).</li>\n    <li>Divida cada bloco em 4 grupos de 6 bits; 6 bits dão 64 combinações.</li>\n    <li>Troque cada grupo pelo caractere correspondente da tabela.</li>\n    <li>Se o último bloco tiver só 1 ou 2 bytes, complete a saída com <code>==</code> ou <code>=</code> (preenchimento).</li>\n  </ol>\n  <p>\n    Exemplo: <code>Hel</code> = <code>48 65 6C</code> = <code>01001000 01100101 01101100</code>. Em grupos de 6 bits: <code>010010</code> <code>000110</code> <code>010101</code> <code>101100</code> = 18, 6, 21, 44 = <code>S</code>, <code>G</code>, <code>V</code>, <code>s</code>. Por isso <code>Hello</code> (5 bytes) começa com <code>SGVs</code> e termina como <code>SGVsbG8=</code>: o último bloco tem 2 bytes e ganha um <code>=</code>. Da mesma forma, <code>admin:admin</code> (11 bytes) vira 16 caracteres, <code>YWRtaW46YWRtaW4=</code>.\n  </p>\n  <p>\n    Consequência prática: cada 3 bytes viram 4 caracteres, então Base64 aumenta o tamanho em cerca de 33%. A variante <strong>Base64URL</strong>, usada em JWT e URLs, troca <code>+</code> por <code>-</code> e <code>/</code> por <code>_</code> e costuma omitir o <code>=</code>.\n  </p>\n  <div class=\"content-card\">\n    <h3>Fluxo mental</h3>\n    <p><strong>Texto humano</strong> → caracteres → pontos de código Unicode → bytes em UTF-8 → pacotes na rede → bytes recebidos → interpretação → texto novamente.</p>\n    <p><strong>Bytes binários</strong> → Base64 → texto seguro para transporte → decodificação → bytes originais.</p>\n  </div>\n  <div class=\"callout warning\">\n    <strong>Erro comum: achar que 1 caractere = 1 byte.</strong> Isso vale em ASCII, mas em UTF-8 limites de tamanho, truncamento e colunas de banco medidos em bytes falham com acentos e emojis. Diferencie caracteres, pontos de código e bytes.\n  </div>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>\n    Codificação de texto vive acima do transporte, mas seus efeitos atravessam toda a operação. O TCP pode entregar os bytes corretamente, o TLS pode proteger o canal e o balanceador pode encaminhar ao backend certo; se o serviço interpretar os bytes com a codificação errada, o resultado ainda é falha funcional.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Aplicação:</strong> define o formato dos dados, como JSON, HTML, XML, logs ou arquivo de configuração.</li>\n    <li><strong>Protocolo de aplicação:</strong> pode declarar tipo e charset, por exemplo <code>Content-Type: application/json; charset=utf-8</code> em HTTP.</li>\n    <li><strong>Transporte:</strong> TCP ou QUIC transporta bytes sem entender o significado textual.</li>\n    <li><strong>Segurança:</strong> TLS protege bytes em trânsito, mas não corrige codificação errada.</li>\n    <li><strong>Observabilidade:</strong> logs, traces e SIEM precisam preservar o texto para busca e correlação.</li>\n    <li><strong>Automação:</strong> pipelines, scripts e IaC precisam tratar arquivos em UTF-8 para evitar mudanças invisíveis.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense no Unicode como uma grande lista internacional que diz “este símbolo existe e tem este número”. O UTF-8 é o método de empacotar esse número em envelopes para envio, e a rede é o serviço que leva os envelopes. O receptor precisa saber como abri-los para reconstruir a mensagem.\n  </p>\n  <p>\n    Base64 é como colocar um objeto que não poderia viajar solto dentro de uma caixa padronizada aceita pelo transporte. A caixa não tranca o objeto; só permite que ele passe por canais que aceitam certos formatos.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> na computação a transformação é exata, byte a byte: um único byte diferente quebra um caractere, muda um hash ou invalida uma assinatura.\n  </div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    No seu notebook, crie um arquivo com <code>Ola</code> e outro com <code>Olá</code>. Na tela, a diferença é só o acento; em bytes, o segundo arquivo é maior. É por isso que contagem de caracteres e contagem de bytes nem sempre coincidem.\n  </p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr><th>Texto</th><th>Caracteres</th><th>Bytes em UTF-8 (hex)</th><th>Total de bytes</th></tr>\n      </thead>\n      <tbody>\n        <tr><td><code>Ola</code></td><td>3</td><td><code>4F 6C 61</code></td><td>3</td></tr>\n        <tr><td><code>Olá</code></td><td>3</td><td><code>4F 6C C3 A1</code></td><td>4</td></tr>\n        <tr><td><code>ação</code></td><td>4</td><td><code>61 C3 A7 C3 A3 6F</code></td><td>6</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    Outro exemplo: <code>Hello</code> em Base64 vira <code>SGVsbG8=</code>. Isso não é segredo: qualquer ferramenta comum decodifica de volta para <code>Hello</code>. Base64 serve para transporte, não para sigilo.\n  </p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Um ERP antigo exporta CSV em Windows-1252; um serviço moderno espera UTF-8. O pipeline importa o arquivo, envia para uma API e grava logs no SIEM. Se a codificação for inferida errado, nomes de clientes, cidades e usuários ficam corrompidos. Não é só estética: isso quebra reconciliação, alertas, busca por usuário, evidências de auditoria e relatórios regulatórios.\n  </p>\n  <p>\n    Em segurança, o mesmo acontece com autenticação e autorização. Um nome de usuário com caractere especial pode ser tratado de forma diferente por dois sistemas, um WAF pode normalizar diferente da aplicação, e um log pode registrar uma versão escapada do valor enquanto a aplicação processa outra. Numa investigação, pergunte: “estou vendo o texto original, uma versão escapada, codificada, normalizada ou truncada?”\n  </p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>\n    Muitas plataformas cloud exigem que dados binários (imagens, arquivos, payloads de eventos) sejam enviados em Base64 dentro de JSON, porque JSON é texto. Como Base64 aumenta o tamanho em cerca de 33%, 1 GB de anexos vira cerca de 1,33 GB em tráfego, filas, armazenamento e logs. Em cargas grandes, a escolha deixa de ser só técnica e vira decisão de custo. Segredos e certificados guardados em Base64 ou PEM, por sua vez, continuam exigindo controle de acesso: a codificação não os protege.\n  </p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>\n    Em repositórios, YAML e pipelines, um arquivo salvo numa codificação inesperada pode quebrar o build, e um scanner pode mostrar um achado em formato escapado que o time precisa saber ler.\n  </p>\n  <p>\n    O caso mais didático é o Kubernetes: objetos Secret exibem os valores em Base64. Isso não significa que o conteúdo esteja protegido. A segurança depende de RBAC, criptografia em repouso, controle de acesso ao etcd, auditoria e rotação. Base64 só torna os bytes representáveis dentro de YAML/JSON.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Erro comum em pipelines:</strong> commitar um segredo em Base64 achando que ele está protegido. Use cofres de segredo, variáveis protegidas, OIDC federation, rotação e menor privilégio.\n  </div>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"m00l03-title m00l03-desc\">\n    <title id=\"m00l03-title\">Texto, Unicode, UTF-8, Base64 e transporte em rede</title>\n    <desc id=\"m00l03-desc\">Fluxo mostrando um texto humano sendo convertido em ponto de código, depois em bytes UTF-8, opcionalmente em Base64, e finalmente transportado por HTTP sobre a rede.</desc>\n    <defs>\n      <marker id=\"m00l03-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"70\" width=\"150\" height=\"74\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"105\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Texto</text>\n    <text x=\"105\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Olá</text>\n    <rect x=\"230\" y=\"70\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"310\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">Unicode</text>\n    <text x=\"310\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">U+004F U+006C U+00E1</text>\n    <rect x=\"450\" y=\"70\" width=\"160\" height=\"74\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"530\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">UTF-8</text>\n    <text x=\"530\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4F 6C C3 A1</text>\n    <rect x=\"690\" y=\"70\" width=\"190\" height=\"74\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"785\" y=\"102\" text-anchor=\"middle\" class=\"svg-label\">HTTP/API</text>\n    <text x=\"785\" y=\"126\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">bytes no payload</text>\n    <line x1=\"180\" y1=\"107\" x2=\"230\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"390\" y1=\"107\" x2=\"450\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"610\" y1=\"107\" x2=\"690\" y2=\"107\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <rect x=\"140\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"245\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Base64</text>\n    <text x=\"245\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">representa bytes como texto</text>\n    <rect x=\"430\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"535\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Logs/SIEM</text>\n    <text x=\"535\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interpretação correta</text>\n    <rect x=\"720\" y=\"235\" width=\"210\" height=\"82\" rx=\"12\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"825\" y=\"268\" text-anchor=\"middle\" class=\"svg-label\">Risco</text>\n    <text x=\"825\" y=\"293\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">codificação ≠ sigilo</text>\n    <line x1=\"530\" y1=\"144\" x2=\"245\" y2=\"235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"785\" y1=\"144\" x2=\"535\" y2=\"235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <line x1=\"785\" y1=\"144\" x2=\"825\" y2=\"235\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#m00l03-arrow)\" />\n    <text x=\"490\" y=\"378\" text-anchor=\"middle\" class=\"svg-label\">A rede entrega bytes; a aplicação precisa interpretá-los com a codificação correta.</text>\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> a rede transporta bytes; a aplicação dá significado a eles. Codificação é a ponte entre símbolos humanos e bytes transmitidos.</li>\n    <li><strong>ASCII, Unicode e UTF-8:</strong> ASCII tem 128 caracteres básicos; Unicode dá um ponto de código a cada caractere (<code>á</code> = <code>U+00E1</code>); UTF-8 transforma esses pontos em 1 a 4 bytes (<code>á</code> = <code>C3 A1</code>) e mantém o ASCII em 1 byte.</li>\n    <li><strong>Base64:</strong> reescreve cada 3 bytes como 4 caracteres de texto (cerca de 33% maior). Serve para transporte, é reversível sem chave e não é sigilo.</li>\n    <li><strong>Diagnóstico:</strong> <code>Ã¡</code> no lugar de <code>á</code> indica bytes UTF-8 lidos como Latin-1; compare os bytes reais e o charset declarado antes de culpar a rede.</li>\n    <li><strong>Uso real:</strong> HTTP, APIs, JSON, logs, SIEM, certificados PEM, Basic, JWT (Base64URL), Kubernetes Secrets e pipelines.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula <strong>0.4 — Bit vs Byte em redes</strong>, você vai diferenciar bit e byte nas medições de rede (Mbps × MB/s), diferença que aparece em velocidade de link, download, throughput, armazenamento de logs e custos cloud.\n  </p>\n</section>\n"
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
        "platform": "Linux",
        "command": "printf 'Olá' | xxd -p",
        "purpose": "Ver os bytes UTF-8 de um texto no terminal.",
        "expectedObservation": "Saída semelhante a 4f6cc3a1.",
        "interpretation": "O caractere á aparece como dois bytes: c3 a1."
      },
      {
        "platform": "Linux",
        "command": "file -i arquivo.csv",
        "purpose": "Estimar a codificação de um arquivo recebido de outro sistema.",
        "expectedObservation": "Algo como text/plain; charset=utf-8 ou text/plain; charset=iso-8859-1.",
        "interpretation": "O file deduz a codificação pelo conteúdo: é uma pista, não prova. Produtor em Latin-1 e consumidor esperando UTF-8 é a divergência que você procura."
      },
      {
        "platform": "Linux",
        "command": "printf 'Usuário' | iconv -f ISO-8859-1 -t UTF-8",
        "purpose": "Reproduzir o texto quebrado: ler bytes UTF-8 como se fossem Latin-1 (com o terminal em UTF-8).",
        "expectedObservation": "UsuÃ¡rio",
        "interpretation": "Se o log mostra o mesmo padrão, algum componente está lendo UTF-8 como Latin-1/Windows-1252. Procure esse leitor, não a rede."
      },
      {
        "platform": "Linux",
        "command": "curl -sI https://SEU-ENDPOINT | grep -i '^content-type'",
        "purpose": "Ver o tipo de conteúdo e o charset que o servidor declara.",
        "expectedObservation": "Uma linha como Content-Type: application/json; charset=utf-8, ou a linha sem charset.",
        "interpretation": "Charset ausente ou diferente do contrato da API é a primeira suspeita; confirme comparando com os bytes reais do corpo. Se o endpoint não aceitar HEAD (-I), use curl -s -D - -o /dev/null https://SEU-ENDPOINT."
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
      "Aplicar validação e normalização de entrada de forma consistente.",
      "Registrar em logs só os campos necessários: payload completo aumenta o custo de retenção e o risco de expor dados sensíveis."
    ],
    "badPractices": [
      "Usar Base64 como proteção de segredo.",
      "Registrar Authorization headers completos em logs.",
      "Converter texto repetidas vezes entre codificações sem controle explícito.",
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
        "description": "Camadas diferentes (WAF, aplicação, banco) podem interpretar caracteres equivalentes ou escapados de formas diferentes, gerando bypass lógico, falso positivo ou falso negativo.",
        "defensiveExplanation": "Um controle pode validar uma forma textual enquanto a aplicação processa outra.",
        "mitigation": "Normalizar entrada antes de validar, alinhar WAF e aplicação e testar casos de encoding."
      },
      {
        "name": "Perda de evidência por logs corrompidos",
        "description": "Texto mal codificado reduz a capacidade de busca e correlação em incidentes.",
        "defensiveExplanation": "Mesmo que o evento exista, ele pode não ser encontrado por pesquisas ou regras esperadas.",
        "mitigation": "Padronizar UTF-8, validar pipeline de logs e monitorar falhas de parsing."
      },
      {
        "name": "Homógrafos (caracteres visualmente parecidos)",
        "description": "Domínios, usuários ou identificadores usam caracteres de outro alfabeto que parecem iguais aos legítimos, como o а cirílico (U+0430) no lugar do a latino (U+0061).",
        "defensiveExplanation": "Na tela o texto parece idêntico, mas pontos de código e bytes são diferentes; revisões visuais e listas de bloqueio por texto falham. É usado em phishing, fraude e confusão operacional.",
        "mitigation": "Monitorar homógrafos, validar domínios, aplicar políticas de nomes e comparar identificadores normalizados."
      }
    ],
    "monitoring": [
      "Alertar sobre headers Authorization registrados em logs.",
      "Detectar strings Base64 longas em locais incomuns, como parâmetros, logs ou mensagens de erro.",
      "Monitorar falhas de parsing em pipelines de logs."
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
    "topology": "Notebook local -> terminal/PowerShell -> saída textual e bytes observados.",
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
    "estimatedTimeMinutes": 30,
    "cost": "zero",
    "safetyNotes": [
      "Não use credenciais reais nos comandos.",
      "Não cole tokens reais em decodificadores online.",
      "Não registre Authorization headers reais em tickets, prints ou logs."
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
        "instruction": "No Linux, use printf e xxd para ver a sequência hexadecimal. Sem xxd instalado, use printf 'Olá' | od -An -tx1 (saída 4f 6c c3 a1).",
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
        "instruction": "Compare o tamanho em caracteres e bytes de textos com e sem acento. O comando abaixo é para Linux/macOS; no Windows, salve as três linhas do meio num arquivo .py e rode com python.",
        "command": "python3 - <<'PY'\nfor s in ['Ola', 'Olá', 'ação', 'rede']:\n    b = s.encode('utf-8')\n    print(s, 'caracteres=', len(s), 'bytes=', len(b), 'hex=', b.hex())\nPY",
        "expectedOutput": "Ola caracteres= 3 bytes= 3 hex= 4f6c61\nOlá caracteres= 3 bytes= 4 hex= 4f6cc3a1\nação caracteres= 4 bytes= 6 hex= 61c3a7c3a36f\nrede caracteres= 4 bytes= 4 hex= 72656465",
        "explanation": "Só os textos com acento têm mais bytes do que caracteres: cada á, ç ou ã ocupa 2 bytes em UTF-8."
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
      "Criar um pequeno arquivo JSON em UTF-8 e observar seus bytes."
    ],
    "evidenceToCollect": [
      "Print ou cópia da saída hexadecimal de Olá.",
      "Valor Base64 gerado para string controlada.",
      "Saída decodificada demonstrando reversibilidade.",
      "Tabela com quantidade de caracteres e bytes de três exemplos."
    ],
    "questions": [
      "Por que Olá ocupa mais bytes que Ola em UTF-8?",
      "Por que é perigoso colar tokens reais em decodificadores online?"
    ],
    "challenge": "Receba o valor YWRtaW46YWRtaW4= em um exemplo de cabeçalho Authorization controlado. Explique o que ele representa, por que isso não é seguro como segredo e quais controles seriam necessários em ambiente real.",
    "solution": "O valor é Base64 de admin:admin e pode ser decodificado sem chave, então não oferece confidencialidade. Em ambiente real: proteger o canal com TLS, não registrar o header, evitar credenciais estáticas, rotacionar segredos, usar cofres e monitorar exposição."
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
      "question": "Um proxy reescreveu o corpo JSON de uma requisição. O texto visível é idêntico, mas a validação HMAC no destino passou a falhar. Como isso é possível e como você provaria?",
      "hints": [
        "HMAC e assinaturas são calculados sobre bytes, não sobre o texto que você vê.",
        "Em JSON, á e \\u00e1 representam o mesmo caractere com bytes diferentes.",
        "Pense também em normalização (U+00E1 × a + U+0301), quebras de linha e espaços."
      ],
      "expectedIdeas": [
        "assinatura sobre bytes",
        "escape",
        "normalização",
        "quebra de linha",
        "comparar hex antes e depois"
      ],
      "explanation": "Qualquer mudança de bytes (escape \\u00e1 no lugar de á, NFC × NFD, CRLF × LF, espaços) muda o HMAC mesmo com o texto igual na tela. A prova é comparar em hexadecimal os bytes que saíram do emissor com os que chegaram ao validador."
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
      "question": "Qual afirmação descreve melhor o papel do UTF-8?",
      "options": [
        "É uma codificação que transforma caracteres Unicode em bytes.",
        "É um algoritmo de criptografia para proteger texto.",
        "É um protocolo de roteamento entre redes.",
        "É um tipo de endereço MAC."
      ],
      "answer": 0,
      "explanation": "UTF-8 é uma codificação de Unicode em bytes. Ele não oferece sigilo e não é protocolo de rede.",
      "topic": "utf-8",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.3.2",
      "question": "Por que Base64 não deve ser usado como mecanismo de proteção de segredo?",
      "options": [
        "Porque pode ser revertido sem chave.",
        "Porque só funciona em sistemas Linux.",
        "Porque altera o endereço IP de origem.",
        "Porque sempre corrompe dados binários."
      ],
      "answer": 0,
      "explanation": "Base64 é uma representação reversível de bytes em texto. Qualquer pessoa com o valor pode decodificar se conhecer a regra.",
      "topic": "base64",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.3.4",
      "question": "Qual diferença entre Unicode e UTF-8 está correta?",
      "options": [
        "Unicode define pontos de código; UTF-8 define como codificá-los em bytes.",
        "Unicode é criptografia; UTF-8 é firewall.",
        "Unicode é usado apenas em IPv4; UTF-8 apenas em switches.",
        "Não há diferença: os termos são sempre sinônimos perfeitos."
      ],
      "answer": 0,
      "explanation": "Unicode organiza o repertório de caracteres. UTF-8 é uma forma de representar esses caracteres em bytes.",
      "topic": "unicode",
      "difficulty": "intermediário",
      "type": "comparação"
    },
    {
      "id": "q0.3.5",
      "question": "Um manifesto contém um Secret em Base64. Qual prática é correta?",
      "options": [
        "Tratar o valor como sensível e controlar acesso ao manifesto e ao cluster.",
        "Publicar no repositório porque Base64 é seguro.",
        "Enviar em chat porque não é legível.",
        "Desabilitar TLS porque Base64 já protege."
      ],
      "answer": 0,
      "explanation": "Base64 não protege o segredo. O valor deve ser tratado como sensível e protegido por controles adequados.",
      "topic": "devsecops",
      "difficulty": "intermediário",
      "type": "cenário"
    },
    {
      "id": "q0.3.7",
      "question": "Um log mostra JoÃ£o no lugar de João. Qual é a explicação mais provável?",
      "options": [
        "O pacote perdeu bytes no caminho e o TCP não retransmitiu.",
        "O nome foi criptografado por um malware.",
        "Os bytes UTF-8 de ã (C3 A3) foram lidos como Latin-1/Windows-1252, em que C3 = Ã e A3 = £.",
        "O nome foi convertido para Base64 antes de ser gravado."
      ],
      "answer": 2,
      "explanation": "O padrão Ã seguido de outro símbolo é típico de UTF-8 interpretado como tabela de 1 byte. O TCP entrega bytes íntegros; o erro está na interpretação.",
      "topic": "troubleshooting",
      "difficulty": "intermediário",
      "type": "diagnóstico"
    },
    {
      "id": "q0.3.8",
      "question": "Uma coluna aceita no máximo 10 bytes. Por que Conceição (9 caracteres) não cabe se for gravada em UTF-8?",
      "options": [
        "Porque UTF-8 usa sempre 2 bytes por caractere, totalizando 18 bytes.",
        "Porque ç e ã ocupam 2 bytes cada em UTF-8, totalizando 11 bytes.",
        "Porque UTF-8 acrescenta um byte de preenchimento = ao final do texto.",
        "Porque o texto é convertido para Base64 antes de ser gravado."
      ],
      "answer": 1,
      "explanation": "Os 7 caracteres ASCII ocupam 1 byte cada e ç (C3 A7) e ã (C3 A3) ocupam 2 cada: 7 + 4 = 11 bytes. Limites em bytes não são limites em caracteres.",
      "topic": "utf-8",
      "difficulty": "intermediário",
      "type": "cálculo"
    },
    {
      "id": "q0.3.9",
      "question": "Um serviço envia um arquivo de 300 bytes em Base64 dentro de um JSON. Quantos caracteres terá o valor Base64?",
      "options": [
        "300",
        "225",
        "600",
        "400"
      ],
      "answer": 3,
      "explanation": "Base64 converte cada bloco de 3 bytes em 4 caracteres: 300 ÷ 3 = 100 blocos × 4 = 400 caracteres, cerca de 33% a mais. Como 300 é múltiplo de 3, não há =.",
      "topic": "base64",
      "difficulty": "intermediário",
      "type": "cálculo"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.3.1",
      "front": "O que é ASCII?",
      "back": "Uma tabela de 7 bits (128 valores, 0 a 127) que associa números a caracteres básicos do inglês e a controles. Ex.: A = 65 = 0x41.",
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
    },
    {
      "id": "fc0.3.7",
      "front": "Qual a diferença entre Base64 e Base64URL?",
      "back": "Base64URL troca + por - e / por _ e costuma omitir o =, para caber em URLs e tokens como JWT.",
      "tags": [
        "base64",
        "tokens"
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
      "id": "ex0.3.5",
      "type": "diagnóstico",
      "prompt": "Um relatório exportado mostra SÃ£o Paulo e AÃ§Ã£o. Explique, byte a byte, o que aconteceu com o ã e diga como confirmar e corrigir.",
      "expectedAnswer": "ã é U+00E3, codificado em UTF-8 como C3 A3. Um leitor configurado como Latin-1/Windows-1252 tratou cada byte como um caractere: C3 = Ã e A3 = £ (com ç, C3 A7 vira Ã§). Confirme olhando os bytes reais (xxd, Format-Hex ou file -i) e o charset declarado; corrija lendo o arquivo como UTF-8 ou alinhando produtor e consumidor em UTF-8, sem remover acentos.",
      "explanation": "Reconhecer o padrão Ã + símbolo leva direto à causa (UTF-8 lido como Latin-1) e evita investigar a rede."
    },
    {
      "id": "ex0.3.6",
      "type": "prático",
      "prompt": "Calcule sem ferramenta e depois confira no terminal: (a) quantos bytes Coração ocupa em UTF-8; (b) quantos caracteres Base64 resultam de 12 bytes e de 11 bytes, e quantos = aparecem em cada caso.",
      "expectedAnswer": "(a) 9 bytes: 7 caracteres, dos quais ç e ã ocupam 2 bytes cada. (b) 12 bytes = 4 blocos de 3 = 16 caracteres, sem =. 11 bytes = 3 blocos completos + 2 bytes = 16 caracteres com um = no final (como YWRtaW46YWRtaW4=, de admin:admin).",
      "explanation": "O exercício fixa as duas contas que mais causam erro em validações e limites: bytes por caractere em UTF-8 e o crescimento de 4/3 do Base64."
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
      "longDefinition": "Padrão de 7 bits (128 valores) que associa números a letras, dígitos, pontuação e controles básicos, com forte presença em protocolos e sistemas antigos.",
      "example": "A letra A é representada pelo valor decimal 65, hexadecimal 0x41, binário 0100 0001.",
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
      "term": "Ponto de código",
      "shortDefinition": "Número que o Unicode atribui a um caractere.",
      "longDefinition": "Identificador numérico de um caractere no Unicode, escrito como U+ seguido de hexadecimal. Ainda não é a sequência de bytes: a codificação (UTF-8, UTF-16) define os bytes.",
      "example": "á = U+00E1; em UTF-8 vira C3 A1.",
      "relatedTerms": [
        "Unicode",
        "UTF-8",
        "caractere"
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
