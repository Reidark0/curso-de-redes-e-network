export const lesson0001 = {
  "id": "0.1",
  "moduleId": "m00",
  "order": 1,
  "title": "Como computadores representam informação",
  "subtitle": "Antes de IP, porta, firewall ou cloud: como uma máquina transforma o mundo real em bits que podem ser transportados e interpretados?",
  "duration": "105-150 min",
  "estimatedStudyTimeMinutes": 150,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 150,
  "tags": [
    "fundamentos",
    "bits",
    "bytes",
    "representação digital",
    "sinais",
    "redes",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [],
  "objectives": [
    "Explicar por que computadores representam informação usando estados físicos interpretados como bits.",
    "Diferenciar informação humana, dado digital, bit, byte, sinal físico e interpretação por protocolo.",
    "Conectar representação digital com redes, análise de pacotes, logs, cloud, DevSecOps e segurança defensiva.",
    "Reconhecer por que fundamentos como binário e hexadecimal aparecem em IPv4, MAC, TLS, payloads, logs e troubleshooting.",
    "Executar um laboratório conceitual e local para observar a transformação de texto em bytes e relacionar isso com tráfego de rede."
  ],
  "learningOutcomes": [
    "Dado um exemplo cotidiano, o aluno consegue separar intenção humana, dado de aplicação, bytes, bits e sinais físicos.",
    "Dado um payload simples em texto, o aluno consegue explicar que ele será codificado em bytes antes de ser transmitido.",
    "Dado um problema de rede, o aluno consegue evitar a confusão entre conteúdo, codificação, protocolo e meio físico.",
    "Dada uma captura de tráfego ou log, o aluno entende que a ferramenta exibe uma interpretação amigável de bytes observados.",
    "Dado um cenário de segurança, o aluno consegue explicar por que bytes aparentemente estranhos podem indicar codificação, compressão, serialização, binário ou criptografia, sem concluir precipitadamente."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    Imagine que você trabalha em Segurança da Informação e recebe um alerta do SOC: uma estação interna enviou dados para um servidor externo. A ferramenta mostra endereços IP, portas, protocolo, tamanho do pacote e alguns bytes do payload. Parece só uma tela cheia de números, mas por trás dela existe uma cadeia de transformações: uma intenção humana virou dados de aplicação, os dados viraram bytes, os bytes foram organizados por protocolos em pacotes e quadros, e tudo atravessou um meio físico como cobre, fibra ou rádio.</p>\n  <p>\n    Computadores não entendem significado humano diretamente: não sabem o que é uma foto, uma senha ou uma requisição HTTP. Eles trabalham com representações construídas a partir de estados físicos que conseguem distinguir. Quando você estudar endereço MAC, IPv4, subnetting, flags TCP, TLS, Base64, payloads e logs, estará respondendo variações da mesma pergunta: como essa informação foi representada para ser armazenada, transmitida e interpretada?</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    Significado humano não atravessa cabos, fibras ou ondas de rádio. O que atravessa o meio físico são sinais. O emissor converte a informação em uma forma física; o receptor reconstrói essa forma física em bits; e o software interpreta os bits como algum tipo de dado.</p>\n  <p>\n    Sem uma representação combinada, cada máquina poderia interpretar a mesma sequência física de forma diferente: um lado acharia que recebeu a letra A, enquanto o outro enviou um número, um endereço, uma flag ou parte de uma chave criptográfica. Por isso, redes dependem de camadas de interpretação: padrões elétricos, codificação de bits, quadros, pacotes, protocolos de transporte e de aplicação e formatos de dados. É isso que permite que bilhões de dispositivos diferentes troquem informação usando padrões comuns.</p>\n  <h3>Por que dois estados?</h3>\n  <p>\n    Telégrafos (sinais curtos e longos), cartões perfurados (furo ou ausência de furo) e circuitos eletrônicos (nível de tensão alto ou baixo) fizeram a mesma coisa: transformar informação em um padrão físico que pode ser registrado, transportado e lido de novo. O mundo real é contínuo (som, luz, temperatura), mas a computação digital escolheu estados discretos porque dois estados são muito mais fáceis de distinguir em hardware real, sujeito a ruído e variação, do que muitos níveis parecidos. Em redes, essa confiabilidade é essencial: se um único bit muda durante a transmissão, o dado interpretado pode mudar completamente.</p>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> representação digital é a conversão de algo significativo para humanos ou aplicações em uma sequência padronizada de bits, que pode ser armazenada, processada, transmitida e reinterpretada por hardware e software.\n  </div>\n  <p>\n    Um <strong>bit</strong> é a menor unidade de informação digital: tem dois estados possíveis, normalmente escritos como 0 e 1. Um <strong>byte</strong> é um grupo de 8 bits. Com esses blocos, computadores representam números, textos, imagens, programas, pacotes de rede, certificados, chaves criptográficas e logs.</p>\n  <p>\n    Separe três ideias: a <strong>informação</strong> é o que se quer comunicar; a <strong>representação</strong> é como essa informação vira bits; a <strong>interpretação</strong> é o processo de atribuir significado aos bits. A sequência <strong>01000001</strong>, por exemplo, pode ser o número 65, a letra A em uma codificação de texto, parte de uma instrução de máquina ou só um byte dentro de um arquivo. Sem contexto, bits são apenas bits.</p>\n  <p>\n    Em redes, esse contexto vem dos protocolos. O Ethernet define como organizar bytes em um quadro local. O IPv4 define como interpretar campos como versão, tamanho, origem e destino. O TCP define portas, sequência, confirmação e flags. O HTTP define mensagens de aplicação. O TLS define como proteger a comunicação. Cada camada dá significado a bytes que, isolados, não explicam a própria função.</p>\n  <h3>Mudar a representação não é o mesmo que proteger</h3>\n  <p>\n    Quando bytes parecem “estranhos”, eles podem ter passado por transformações muito diferentes:</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th>Transformação</th>\n          <th>Para que serve</th>\n          <th>Como se reverte</th>\n          <th>Exemplo</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Codificação</td>\n          <td>Representar dados em outro formato ou alfabeto</td>\n          <td>Qualquer um reverte, sem segredo</td>\n          <td>UTF-8, Base64, hexadecimal</td>\n        </tr>\n        <tr>\n          <td>Serialização</td>\n          <td>Transformar uma estrutura (objeto, lista) em sequência de bytes</td>\n          <td>Lendo com o mesmo formato</td>\n          <td>JSON, ASN.1</td>\n        </tr>\n        <tr>\n          <td>Compressão</td>\n          <td>Reduzir o tamanho</td>\n          <td>Descompactando, sem segredo</td>\n          <td>gzip</td>\n        </tr>\n        <tr>\n          <td>Criptografia</td>\n          <td>Proteger a confidencialidade</td>\n          <td>Só com a chave</td>\n          <td>TLS</td>\n        </tr>\n        <tr>\n          <td>Hash</td>\n          <td>Gerar um resumo de tamanho fixo para verificar integridade</td>\n          <td>Não se reverte</td>\n          <td>SHA-256</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <div class=\"callout warning\">\n    <strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Achar que o computador “envia um site”, “uma senha” ou entende texto diretamente.</strong> Ele envia sequências de bits; texto é a interpretação de bytes segundo uma codificação, como UTF-8. O significado só aparece porque origem e destino concordam em como interpretar.</li>\n      <li><strong>Confundir dado com sinal físico.</strong> Dado é a informação representada; sinal é a forma física que transporta os bits. Misturar os dois faz o diagnóstico confundir problema de aplicação com problema de camada física.</li>\n      <li><strong>Concluir que todo payload ilegível é criptografia ou ataque.</strong> Antes, verifique protocolo, formato, compressão, serialização, codificação e contexto.</li>\n      <li><strong>Pular binário e hexadecimal por parecerem teoria demais.</strong> Sem eles, subnetting, MAC, IPv6, flags e dumps viram decoreba.</li>\n    </ul>\n  </div>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Você não digita bits: você clica, escreve ou executa um comando. A partir daí, a informação passa por uma cadeia de transformação, e o destino faz o caminho inverso:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Intenção:</strong> uma pessoa ou processo quer realizar algo, como abrir um site, enviar uma mensagem ou consultar uma API.</li>\n    <li><strong>Dado de aplicação:</strong> a aplicação cria uma representação lógica, como uma requisição HTTP, um documento JSON ou um arquivo.</li>\n    <li><strong>Codificação:</strong> textos, números e estruturas são convertidos para bytes segundo regras, como UTF-8, JSON, ASN.1 ou formatos binários próprios.</li>\n    <li><strong>Encapsulamento:</strong> a pilha de rede adiciona cabeçalhos e metadados: portas, IPs, endereços MAC, checksums, tamanho, flags e outros campos.</li>\n    <li><strong>Bits:</strong> os bytes são tratados como sequências de 0 e 1.</li>\n    <li><strong>Sinais físicos:</strong> a placa de rede converte bits em variações físicas no meio: tensão elétrica, luz em fibra ou ondas de rádio.</li>\n    <li><strong>Reconstrução:</strong> o receptor mede os sinais, reconstrói bits, agrupa bytes, valida os protocolos e entrega os dados para a aplicação.</li>\n  </ol>\n  <p>\n    Esse processo precisa lidar com imperfeições físicas. Cabos sofrem interferência. Rádio sofre ruído, reflexão e disputa pelo meio. Fibra sofre atenuação e problemas de conectorização. O hardware não enxerga zeros e uns abstratos: ele mede um fenômeno físico e decide se aquilo representa 0 ou 1. Por isso existem tolerâncias, sincronização, codificação de linha, checksums, CRCs, retransmissões e protocolos de detecção ou correção de erro.</p>\n  <div class=\"callout security\">\n    <strong>Ligação com segurança:</strong> muitos controles funcionam porque validam a interpretação. Um parser seguro rejeita dados malformados. Um certificado digital ajuda a validar identidade. Um checksum ou CRC detecta alteração acidental, mas qualquer um pode recalculá-lo; um MAC criptográfico (código de autenticação de mensagem, que usa uma chave secreta e não tem relação com o endereço MAC) detecta alteração maliciosa. Um SIEM interpreta logs para transformar bytes em evidência operacional.\n  </div>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>\n    A mesma informação é representada em vários níveis, e cada nível tem quem o interprete e falhas típicas. Esta tabela é um mapa para o troubleshooting:</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th>Nível</th>\n          <th>Exemplo</th>\n          <th>Quem interpreta</th>\n          <th>Falha típica</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr>\n          <td>Sinal físico (camada física)</td>\n          <td>Tensão, luz, rádio</td>\n          <td>Placa de rede, transceptor, rádio Wi-Fi</td>\n          <td>Ruído, atenuação, interferência, cabo ruim</td>\n        </tr>\n        <tr>\n          <td>Bit</td>\n          <td>0 ou 1</td>\n          <td>Circuitos digitais</td>\n          <td>Erro de leitura ou bit trocado (bit flip)</td>\n        </tr>\n        <tr>\n          <td>Byte</td>\n          <td>8 bits agrupados</td>\n          <td>CPU, sistema operacional, aplicações</td>\n          <td>Encoding incorreto ou byte inesperado</td>\n        </tr>\n        <tr>\n          <td>Estrutura de protocolo: enlace, rede e transporte</td>\n          <td>Quadro Ethernet (identifica dispositivos locais), pacote IP (endereçamento lógico e caminho entre redes), segmento TCP (portas, estado e controle de fluxo entre processos)</td>\n          <td>Pilha de rede</td>\n          <td>Campo inválido, checksum, MTU, fragmentação</td>\n        </tr>\n        <tr>\n          <td>Dado de aplicação</td>\n          <td>HTTP, JSON, HTML, token, arquivo</td>\n          <td>Aplicação, biblioteca, serviço</td>\n          <td>Formato inválido, codificação errada, parsing inseguro</td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    Esse mapa evita diagnósticos aleatórios. Se os sinais físicos falham, a aplicação nem recebe dados. Se os bytes chegam, mas são interpretados com o encoding errado, o problema parece de aplicação, não de rede. Se o tráfego está criptografado, o analista vê metadados, mas não o conteúdo. Se a captura mostra payload binário, isso não prova ataque: pode ser compressão, formato binário, serialização ou criptografia legítima.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    Pense em uma empresa que precisa enviar instruções para uma filial usando lâmpadas. A matriz combina um código: lâmpada apagada significa 0, acesa significa 1. Grupos de oito sinais formam um byte. Certas sequências representam letras, outras números, outras comandos. A filial só entende a mensagem porque conhece o mesmo código. Fio, fibra e rádio funcionam assim: transportam sinais, e o significado surge porque os dois lados concordam em como mapear sinais para bits, bits para bytes e bytes para estruturas.</p>\n  <div class=\"callout warning\">\n    <strong>Limite da analogia:</strong> redes reais acrescentam temporização, modulação, ruído, retransmissões e várias camadas de interpretação; a analogia explica só a ideia de representação.\n  </div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Você digita a letra A em um editor de texto. Para você, é uma letra; para o computador, é um número. Nas codificações mais comuns (ASCII e UTF-8), A é o valor decimal 65, que em binário é 01000001. Ao salvar o arquivo ou enviá-lo pela rede, o sistema não transmite a ideia de “A”: transmite um byte que o outro lado interpreta como A porque usa a mesma convenção.</p>\n  <p>\n    A palavra “rede” vira quatro bytes, um por letra:</p>\n  <div class=\"responsive-table\">\n    <table class=\"data-table\">\n      <thead>\n        <tr>\n          <th>Caractere</th>\n          <th>Decimal</th>\n          <th>Hexadecimal</th>\n          <th>Binário</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr><td>r</td><td>114</td><td>72</td><td>01110010</td></tr>\n        <tr><td>e</td><td>101</td><td>65</td><td>01100101</td></tr>\n        <tr><td>d</td><td>100</td><td>64</td><td>01100100</td></tr>\n        <tr><td>e</td><td>101</td><td>65</td><td>01100101</td></tr>\n      </tbody>\n    </table>\n  </div>\n  <p>\n    São essas quatro colunas que você vai ver no laboratório (a conversão entre bases é o tema da aula 0.2). Se o receptor interpretar esses bytes como texto com a codificação correta, verá “rede”; se os interpretar como outro formato, verá caracteres estranhos ou dados sem sentido. É a origem de logs quebrados e payloads “ilegíveis”. Caracteres acentuados mostram que letra e byte não são a mesma coisa: em UTF-8, “ação” tem 4 letras e ocupa 6 bytes (61 c3 a7 c3 a3 6f), porque “ç” e “ã” usam 2 bytes cada.</p>\n  <p>\n    O mesmo vale para endereços de rede: um endereço IPv4 como 192.168.0.1 são 4 bytes (32 bits) escritos em decimal, e um endereço MAC como 00:1A:2B:3C:4D:5E são 6 bytes (48 bits) escritos em hexadecimal. Por isso binário e hexadecimal aparecem o tempo todo em redes.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Firewall, proxy, SIEM e EDR não mostram a realidade diretamente: mostram interpretações geradas por sensores. Se o sensor usa o encoding errado, perde dados ou não coleta o campo certo, a investigação fica comprometida. Caso típico: uma aplicação legada grava logs com caracteres especiais quebrados, e o time de segurança perde nomes de usuários, caminhos de arquivo ou parâmetros de requisição. O problema não é “a rede caiu”; é uma falha de codificação e interpretação. Outro caso: um appliance mostra o payload em hexadecimal. Sem entender bytes, o analista enxerga ruído; com o fundamento, ele procura padrões, cabeçalhos, strings legíveis e formatos conhecidos.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>\n    Em uma VPC ou VNet, um flow log não é o pacote original: é uma representação resumida, com origem, destino, porta, protocolo, ação, quantidade de bytes, quantidade de pacotes e horário. Ele é ótimo para auditoria e custo, mas não substitui uma captura de pacotes quando você precisa ver o payload ou os detalhes de um handshake. Da mesma forma, uma métrica pode mostrar que o tráfego aumentou, mas não explica o conteúdo desse tráfego.</p>\n  <p>\n    Representação também tem custo: provedores cobram por logs ingeridos, retenção, consultas e transferência de dados. Saber o que cada fonte representa ajuda a decidir o que coletar e por quanto tempo guardar.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>\n    Cada etapa de uma pipeline recebe, transforma e entrega representações. Uma imagem de container não é uma “caixa mágica”: é um conjunto de camadas, manifestos, hashes e blobs que o Kubernetes baixa, confere pelas referências e hashes e monta como filesystem do container. Um token OIDC usado na pipeline é uma estrutura codificada e assinada. E os valores de um Secret do Kubernetes aparecem em Base64 no manifesto: quem lê o arquivo consegue decodificá-los, então Base64 ali não é proteção. Erros de encoding, serialização, escaping, truncamento de log e formatação YAML estão entre as falhas mais comuns em ambientes automatizados.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>\n    Controles de segurança interpretam o tempo todo: um WAF interpreta requisições, um antivírus interpreta arquivos, um IDS interpreta tráfego e um parser interpreta a entrada do usuário. Quando a interpretação falha, surgem vulnerabilidades.</p>\n  <p>\n    Um exemplo concreto de “codificação não é proteção”: na autenticação HTTP Basic, o navegador envia o cabeçalho <code>Authorization: Basic dXN1YXJpbzpzZW5oYQ==</code>. Parece embaralhado, mas é só Base64 de <code>usuario:senha</code>, e qualquer pessoa que capture o cabeçalho decodifica a senha em um comando. Por isso esse tipo de autenticação só é aceitável dentro de TLS, que é quem de fato protege o conteúdo em trânsito.</p>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m00l01-svg-title m00l01-svg-desc\">\n    <title id=\"m00l01-svg-title\">Cadeia de representação da informação em redes</title>\n    <desc id=\"m00l01-svg-desc\">O diagrama mostra uma intenção humana sendo convertida em dado de aplicação, bytes, bits e sinais físicos, que o destino reconstrói e interpreta. Ferramentas de captura, logs, SIEM e flow logs de cloud observam cópias ou resumos desse tráfego, ou seja, representações, não o significado original.</desc>\n    <defs>\n      <marker id=\"m00l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"30\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"95\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Intenção</text>\n    <text x=\"95\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">abrir um site</text>\n\n    <rect x=\"205\" y=\"70\" width=\"140\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"275\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"275\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">HTTP, JSON, texto</text>\n\n    <rect x=\"390\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"455\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Bytes</text>\n    <text x=\"455\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">valores 0-255</text>\n\n    <rect x=\"565\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"630\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Bits</text>\n    <text x=\"630\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">0 e 1</text>\n\n    <rect x=\"740\" y=\"70\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"825\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Sinal físico</text>\n    <text x=\"825\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tensão, luz, rádio</text>\n\n    <line x1=\"160\" y1=\"106\" x2=\"205\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"345\" y1=\"106\" x2=\"390\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"520\" y1=\"106\" x2=\"565\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"695\" y1=\"106\" x2=\"740\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n\n    <rect x=\"740\" y=\"250\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"825\" y=\"281\" text-anchor=\"middle\" class=\"svg-label\">Destino</text>\n    <text x=\"825\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">reconstrói e interpreta</text>\n\n    <line x1=\"825\" y1=\"142\" x2=\"825\" y2=\"250\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n\n    <rect x=\"40\" y=\"215\" width=\"600\" height=\"125\" rx=\"12\" class=\"svg-boundary\" />\n    <text x=\"340\" y=\"236\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Observadores: veem representações do tráfego</text>\n\n    <rect x=\"70\" y=\"250\" width=\"250\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"195\" y=\"281\" text-anchor=\"middle\" class=\"svg-label\">Ferramentas</text>\n    <text x=\"195\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wireshark, logs, SIEM</text>\n\n    <rect x=\"360\" y=\"250\" width=\"250\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"485\" y=\"281\" text-anchor=\"middle\" class=\"svg-label\">Cloud</text>\n    <text x=\"485\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">flow logs, métricas</text>\n\n    <path d=\"M825 196 C760 196 700 200 642 236\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <text x=\"735\" y=\"186\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">cópias e resumos</text>\n\n    <text x=\"480\" y=\"378\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O significado não viaja sozinho: ele é reconstruído por camadas de interpretação.</text>\n    <text x=\"480\" y=\"400\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Captura, log e flow log mostram uma interpretação dos bytes, não a realidade completa.</text>\n  </svg>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> redes são uma cadeia de traduções: intenção humana vira dado, dado vira bytes, bytes viram bits, bits viram sinais físicos, e no destino os sinais voltam a ser bits, que só ganham significado quando interpretados pelo protocolo correto.</li>\n    <li><strong>O que lembrar:</strong> informação, dado, byte, bit e sinal não são a mesma coisa. 1 byte = 8 bits; “rede” são 4 bytes (72 65 64 65 em hexadecimal); a mesma sequência de bits pode ser número, letra ou campo de protocolo, conforme o contexto.</li>\n    <li><strong>Erro comum:</strong> achar que bytes ilegíveis significam automaticamente criptografia ou ataque; podem ser codificação, serialização, compressão ou formato binário.</li>\n    <li><strong>Uso real:</strong> análise de pacotes, logs, payloads, APIs, flow logs de cloud, SIEM e troubleshooting dependem de interpretação correta; ferramentas mostram interpretações, não a realidade completa.</li>\n    <li><strong>Segurança:</strong> Base64 e hexadecimal mudam a representação, não protegem; confidencialidade exige criptografia, como TLS.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula 0.2, “Bits, bytes, binário e hexadecimal”, você aprende a ler e converter essas representações, base para entender endereços IPv4 e MAC, máscaras, IPv6, portas, flags TCP e dumps hexadecimais.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Base conceitual da Camada Física",
      "Preparação para Camada de Enlace",
      "Preparação para Camada de Aplicação"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "IPv4",
      "TCP",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [],
    "enables": [
      "bits e bytes",
      "binário e hexadecimal",
      "endereçamento MAC",
      "IPv4",
      "captura de tráfego",
      "troubleshooting",
      "análise de payloads"
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Caracteres especiais aparecem quebrados em logs ou na aplicação.",
      "A ferramenta de captura mostra payload aparentemente ilegível.",
      "Um arquivo chega corrompido, incompleto ou com tamanho inesperado.",
      "Métricas de bytes transferidos não batem com o tamanho percebido pelo usuário.",
      "O time não sabe dizer se a falha é da aplicação ou da rede física."
    ],
    "diagnosticQuestions": [
      "O dado original era texto, binário, compactado, criptografado ou serializado?",
      "Origem e destino concordam no formato e na codificação?",
      "O problema acontece antes ou depois da transmissão pela rede?",
      "A ferramenta está mostrando payload bruto, interpretação de protocolo ou resumo estatístico?",
      "Há perda, retransmissão, truncamento, encoding incorreto ou parsing inválido?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Format-Hex -Path .\\arquivo.txt -Count 64",
        "purpose": "Visualizar os bytes iniciais de um arquivo no PowerShell.",
        "expectedObservation": "Exibição hexadecimal e representação textual quando aplicável.",
        "interpretation": "Mostra que o arquivo é armazenado como bytes, não como letras abstratas."
      },
      {
        "platform": "Windows",
        "command": "certutil -encode .\\arquivo.txt .\\arquivo-base64.txt",
        "purpose": "Demonstrar que Base64 é codificação, não criptografia.",
        "expectedObservation": "Arquivo de saída com texto Base64 reversível.",
        "interpretation": "O conteúdo foi representado em outro alfabeto textual; não foi protegido por segredo."
      },
      {
        "platform": "Linux",
        "command": "printf 'rede' | xxd -g 1",
        "purpose": "Mostrar os bytes correspondentes à palavra rede.",
        "expectedObservation": "Os bytes 72 65 64 65, com a palavra rede na coluna de texto.",
        "interpretation": "A palavra é convertida para bytes segundo a codificação do ambiente."
      },
      {
        "platform": "Linux",
        "command": "printf 'rede' | base64",
        "purpose": "Demonstrar uma codificação textual comum usada em APIs, tokens e integrações.",
        "expectedObservation": "cmVkZQ==",
        "interpretation": "Base64 facilita transporte textual de bytes, mas não fornece confidencialidade."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces",
        "purpose": "Observar estatísticas de camada física e enlace em interfaces de rede.",
        "expectedObservation": "Contadores como input errors, CRC, collisions ou interface status.",
        "interpretation": "Erros físicos ou de enlace afetam a reconstrução confiável dos dados transmitidos."
      }
    ],
    "decisionTree": [
      {
        "if": "O conteúdo está ilegível, mas a conexão funciona",
        "then": "Verificar encoding, compressão, criptografia, formato binário e ferramenta de visualização."
      },
      {
        "if": "Há corrupção ou perda durante transmissão",
        "then": "Verificar meio físico, interface, erros, MTU, retransmissões e integridade do arquivo."
      },
      {
        "if": "A aplicação rejeita uma entrada",
        "then": "Verificar formato esperado, parser, escaping, charset, tamanho e validação."
      },
      {
        "if": "Os logs não permitem investigar",
        "then": "Revisar campos obrigatórios, encoding, timezone, retenção e normalização dos eventos."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Diferenciar claramente codificação, compressão, criptografia e hashing.",
      "Registrar logs com campos estruturados, encoding consistente e dados suficientes para auditoria.",
      "Validar entradas de usuário antes de interpretá-las em parsers, APIs e integrações.",
      "Coletar evidências técnicas preservando contexto: horário, origem, destino, protocolo, ferramenta e formato."
    ],
    "badPractices": [
      "Armazenar ou transmitir segredo em Base64 ou hexadecimal achando que está protegido.",
      "Copiar bytes ou payloads de produção sem avaliar a exposição de dados sensíveis.",
      "Classificar tráfego como malicioso só porque não é legível como texto: gera falso positivo e perda de confiança na monitoração.",
      "Ignorar erros de encoding em logs de autenticação, auditoria ou transações críticas."
    ],
    "commonErrors": [
      "Confundir representação com significado.",
      "Ignorar que ferramentas podem truncar, resumir ou interpretar dados.",
      "Não documentar o formato esperado em integrações entre sistemas."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição de segredo codificado",
        "description": "Segredos são armazenados ou transmitidos em uma codificação reversível e tratados como se estivessem protegidos.",
        "defensiveExplanation": "Base64, hexadecimal e outras codificações não fornecem confidencialidade. Qualquer pessoa com acesso ao dado pode reverter a representação.",
        "mitigation": "Usar criptografia adequada, cofres de segredo, controle de acesso, rotação e mascaramento em logs."
      },
      {
        "name": "Interpretação ambígua de entrada",
        "description": "A aplicação interpreta bytes de entrada de forma diferente do esperado, abrindo margem para bypass ou comportamento inesperado.",
        "defensiveExplanation": "Falhas de canonicalização, encoding e parsing podem fazer sistemas diferentes enxergarem a mesma entrada de formas diferentes.",
        "mitigation": "Normalizar entrada, validar formato, usar bibliotecas seguras e criar testes com dados malformados."
      },
      {
        "name": "Falha de evidência por logging fraco",
        "description": "Eventos relevantes não são representados nos logs com qualidade suficiente para investigação.",
        "defensiveExplanation": "Sem campos consistentes, timestamps e contexto, o time de segurança perde capacidade de reconstruir o evento.",
        "mitigation": "Definir padrão de logging, normalizar eventos, preservar timezone, proteger integridade e revisar retenção."
      }
    ],
    "monitoring": [
      "Observar falhas de parsing, erros de encoding, payload rejeitado e mensagens de formato inválido.",
      "Correlacionar flow logs, logs de aplicação, autenticação e eventos de endpoint.",
      "Detectar segredos aparentes em logs, artefatos de build e variáveis de ambiente."
    ],
    "hardening": [
      "Padronizar encoding em aplicações e integrações.",
      "Mascarar dados sensíveis antes de gravar logs.",
      "Usar TLS para proteger dados em trânsito quando houver risco de interceptação.",
      "Usar validação de schema em APIs e pipelines.",
      "Definir política de retenção e acesso a logs e capturas."
    ],
    "detectionIdeas": [
      "Alertar quando logs contiverem padrões de chaves, tokens ou credenciais codificadas (por exemplo, cabeçalhos Authorization: Basic).",
      "Criar consultas para volume anormal de bytes enviados por host, usuário ou aplicação para destinos externos.",
      "Investigar erros repetidos de encoding ou parser em endpoints expostos.",
      "Comparar o tamanho esperado com o tamanho real de artefatos transferidos."
    ]
  },
  "lab": {
    "id": "lab-0.1",
    "title": "Da palavra ao byte: observando representação digital antes da rede",
    "labType": "security",
    "objective": "Demonstrar que uma informação simples, como uma palavra, precisa ser representada como bytes antes de ser armazenada, transmitida ou analisada por ferramentas de rede e segurança.",
    "scenario": "Você é um analista iniciante investigando por que payloads e logs aparecem como texto, hexadecimal ou Base64. Antes de analisar pacotes reais, irá observar localmente como uma palavra vira bytes e como a mesma informação pode ser exibida em representações diferentes.",
    "topology": "Aluno -> terminal local -> arquivo de texto -> visualização hexadecimal/Base64 -> interpretação humana",
    "architecture": "Laboratório local, sem tráfego externo: entrada humana, codificação de texto, bytes, visualização hexadecimal, codificação Base64 e decodificação.",
    "prerequisites": [
      "Ter Windows com PowerShell ou Linux/macOS com terminal.",
      "Saber abrir um terminal.",
      "Não é necessário conhecimento prévio de redes."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "Opcional no Linux: xxd ou hexdump",
      "Editor de texto simples"
    ],
    "estimatedTimeMinutes": 35,
    "cost": "zero",
    "safetyNotes": [
      "Use apenas textos de teste, sem senhas, tokens, dados pessoais ou informações reais de empresa.",
      "Não colete payloads de terceiros.",
      "Não envie dados sensíveis para ferramentas online de conversão."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Criar uma informação humana simples",
        "instruction": "Crie um arquivo de texto contendo apenas a palavra rede, sem quebra de linha no final.",
        "command": "Windows PowerShell: Set-Content -Path .\\m00-aula01.txt -Value 'rede' -NoNewline\nLinux: printf 'rede' > m00-aula01.txt",
        "expectedOutput": "Um arquivo chamado m00-aula01.txt com quatro caracteres: rede (4 bytes).",
        "explanation": "Para você, o arquivo contém uma palavra. Para o computador, ele contém bytes que representam caracteres."
      },
      {
        "number": 2,
        "title": "Visualizar o conteúdo como texto",
        "instruction": "Leia o arquivo normalmente, como uma aplicação de texto faria.",
        "command": "Windows PowerShell: Get-Content .\\m00-aula01.txt\nLinux: cat m00-aula01.txt",
        "expectedOutput": "rede",
        "explanation": "A ferramenta interpreta os bytes do arquivo como caracteres e mostra uma forma amigável para humanos."
      },
      {
        "number": 3,
        "title": "Visualizar os bytes em hexadecimal",
        "instruction": "Agora veja o mesmo arquivo como bytes. No Windows, use Format-Hex. No Linux, use xxd ou hexdump.",
        "command": "Windows PowerShell: Format-Hex -Path .\\m00-aula01.txt\nLinux: xxd -g 1 m00-aula01.txt || hexdump -C m00-aula01.txt",
        "expectedOutput": "Os bytes 72 65 64 65 (em hexadecimal), um por letra, com a palavra rede ao lado na coluna de texto.",
        "explanation": "A palavra não desapareceu: está exibida em outra representação. Cada par de dígitos hexadecimais é um byte (r = 72, e = 65, d = 64). Hexadecimal é comum em redes porque mostra bytes de forma compacta."
      },
      {
        "number": 4,
        "title": "Codificar a mesma informação em Base64",
        "instruction": "Gere uma representação Base64 do arquivo para observar uma codificação textual reversível.",
        "command": "Windows PowerShell: [Convert]::ToBase64String([System.IO.File]::ReadAllBytes('.\\m00-aula01.txt'))\nLinux: base64 m00-aula01.txt",
        "expectedOutput": "cmVkZQ==",
        "explanation": "Base64 não criptografa: só representa os mesmos bytes com caracteres seguros para transporte em texto, como cabeçalhos HTTP, JSON e e-mail."
      },
      {
        "number": 5,
        "title": "Decodificar o Base64",
        "instruction": "Reverta a string Base64 do passo anterior, sem usar nenhuma chave ou senha.",
        "command": "Windows PowerShell: [System.Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('cmVkZQ=='))\nLinux: echo 'cmVkZQ==' | base64 -d",
        "expectedOutput": "rede",
        "explanation": "Qualquer pessoa com a string recupera o conteúdo original. É por isso que Base64 não protege segredos."
      },
      {
        "number": 6,
        "title": "Relacionar com análise de tráfego",
        "instruction": "Imagine que esses bytes aparecessem em uma captura de rede. Descreva o que uma ferramenta como Wireshark estaria fazendo ao mostrar campos interpretados.",
        "expectedOutput": "Uma explicação conectando bytes capturados, protocolos e interpretação humana.",
        "explanation": "Ferramentas de rede organizam bytes segundo protocolos conhecidos. Quando não reconhecem o formato, mostram bytes brutos ou interpretações limitadas."
      },
      {
        "number": 7,
        "title": "Comparar e registrar evidências",
        "instruction": "Registre no seu material de estudo as três representações (texto, hexadecimal e Base64) e escreva uma conclusão de até cinco linhas explicando por que elas representam a mesma informação.",
        "expectedOutput": "Registro com as três representações e a conclusão.",
        "explanation": "A mesma informação aparece de formas diferentes conforme a ferramenta e a camada de interpretação. Registrar evidências é hábito de troubleshooting, auditoria e segurança."
      }
    ],
    "expectedResult": "Você demonstra que a palavra rede pode ser vista como texto, como os bytes 72 65 64 65 em hexadecimal e como cmVkZQ== em Base64, e que a ferramenta muda a representação exibida, não a informação original.",
    "validation": [
      {
        "check": "Passo 2 (arquivo criado)",
        "expected": "A leitura do arquivo mostra rede.",
        "ifFails": "Verifique o diretório atual, o nome do arquivo e se o comando de criação foi executado."
      },
      {
        "check": "Passo 3 (bytes visualizados)",
        "expected": "Aparecem os bytes 72 65 64 65.",
        "ifFails": "No Linux, use hexdump -C se xxd não estiver disponível. No Windows, confirme que está no PowerShell."
      },
      {
        "check": "Passos 4 e 5 (Base64 gerado e revertido)",
        "expected": "A codificação mostra cmVkZQ== e a decodificação devolve rede.",
        "ifFails": "Confirme o caminho do arquivo e se o comando foi copiado sem alterações."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O comando xxd não existe no Linux.",
        "probableCause": "O pacote que fornece xxd não está instalado.",
        "howToConfirm": "Executar which xxd.",
        "fix": "Usar hexdump -C m00-aula01.txt como alternativa."
      },
      {
        "symptom": "A saída hexadecimal mostra um byte 0a (ou 0d 0a) a mais no final, e o Base64 vira cmVkZQo=.",
        "probableCause": "O arquivo foi criado com quebra de linha (0a é LF; 0d 0a é CR LF, padrão do Windows). A diferença também aparece quando o mesmo texto é gravado em sistemas diferentes.",
        "howToConfirm": "Comparar a criação com e sem -NoNewline no Windows, ou usar printf em vez de echo no Linux.",
        "fix": "Recriar o arquivo sem quebra de linha se quiser observar apenas os bytes da palavra."
      },
      {
        "symptom": "No Windows, a palavra acentuada do desafio ocupa só 1 byte por letra.",
        "probableCause": "O Windows PowerShell 5.1 grava com Set-Content na página de código do sistema (ANSI), e não em UTF-8; o PowerShell 7 grava em UTF-8 por padrão.",
        "howToConfirm": "Conferir a versão com $PSVersionTable.PSVersion e o tamanho do arquivo.",
        "fix": "Usar o PowerShell 7 ou o Linux para observar a codificação UTF-8."
      },
      {
        "symptom": "O aluno acha que Base64 protegeu o conteúdo.",
        "probableCause": "Confusão entre codificação e criptografia.",
        "howToConfirm": "Decodificar o Base64 e recuperar o texto original.",
        "fix": "Reforçar que Base64 é reversível sem segredo."
      }
    ],
    "improvements": [
      "Repetir com um pequeno arquivo binário (por exemplo, uma imagem) e comparar com texto puro.",
      "Em um laboratório futuro, capturar uma requisição HTTP e procurar o payload textual e os campos de protocolo."
    ],
    "evidenceToCollect": [
      "Conteúdo textual do arquivo.",
      "Saída hexadecimal.",
      "Saída Base64 e resultado da decodificação.",
      "Conclusão explicando a diferença entre informação, bytes e representação.",
      "Lista de dúvidas para revisar na aula 0.2."
    ],
    "questions": [
      "A palavra rede é a mesma coisa que os bytes que a representam?",
      "Por que a visualização hexadecimal é útil para redes?",
      "Por que uma quebra de linha altera os bytes do arquivo?",
      "Como isso se relaciona com payloads em uma captura de rede?"
    ],
    "challenge": "Crie um arquivo com a palavra ação, observe a saída hexadecimal e explique por que ela usa mais bytes do que a quantidade de letras visíveis.",
    "solution": "Em UTF-8, ação ocupa 6 bytes: 61 c3 a7 c3 a3 6f. As letras a e o usam 1 byte cada; ç (c3 a7) e ã (c3 a3) usam 2 bytes cada. A quantidade de letras percebidas por humanos não corresponde necessariamente à quantidade de bytes armazenados ou transmitidos."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que usar dois estados físicos principais, interpretados como 0 e 1, é mais confiável do que tentar representar muitos níveis diferentes diretamente?",
      "hints": [
        "Pense em ruído, tolerância e hardware real.",
        "Distinguir dois estados é mais simples do que distinguir muitos estados próximos."
      ],
      "expectedIdeas": [
        "ruído",
        "margem",
        "confiabilidade",
        "hardware",
        "estado físico",
        "erro"
      ],
      "explanation": "Dois estados criam uma separação maior entre valores possíveis. Isso facilita a decisão do hardware mesmo quando há ruído, perda ou pequenas variações físicas."
    },
    {
      "type": "diagnóstico",
      "question": "Você recebeu um log com caracteres quebrados, mas a aplicação continua funcionando. Antes de culpar a rede, o que deveria verificar?",
      "hints": [
        "Pense em codificação e interpretação.",
        "A transmissão pode estar correta, mas a leitura pode estar errada."
      ],
      "expectedIdeas": [
        "encoding",
        "UTF-8",
        "parser",
        "formato",
        "origem",
        "destino",
        "log"
      ],
      "explanation": "Caracteres quebrados frequentemente indicam desacordo de codificação ou interpretação, não necessariamente perda de pacotes ou falha física."
    },
    {
      "type": "cenário real",
      "question": "Um analista vê payload ilegível em uma captura. Quais hipóteses defensivas devem ser consideradas antes de classificar como ataque?",
      "hints": [
        "Nem todo dado ilegível é malicioso.",
        "Pense em formatos legítimos que não são texto claro."
      ],
      "expectedIdeas": [
        "binário",
        "compressão",
        "criptografia",
        "Base64",
        "serialização",
        "protocolo",
        "contexto"
      ],
      "explanation": "A análise correta exige contexto: protocolo, porta, aplicação, formato esperado, criptografia, compressão e comportamento do host. Bytes ilegíveis sem contexto não bastam para concluir ataque."
    }
  ],
  "quiz": [
    {
      "id": "q0.1.2",
      "question": "Qual alternativa diferencia corretamente dado e sinal físico?",
      "options": [
        "Dado é a informação representada; sinal físico é o fenômeno usado para transportar bits.",
        "Dado e sinal físico são sinônimos em redes.",
        "Sinal físico só existe em Wi-Fi, nunca em cabo.",
        "Dado é sempre criptografado; sinal físico é sempre texto."
      ],
      "answer": 0,
      "explanation": "Dados são representações interpretáveis. Sinais físicos são variações de tensão, luz ou rádio usadas para transportar bits.",
      "topic": "representação",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.1.3",
      "question": "Por que Base64 não deve ser tratado como mecanismo de proteção de segredo?",
      "options": [
        "Porque Base64 só funciona em Linux.",
        "Porque Base64 é uma codificação reversível, não criptografia.",
        "Porque Base64 remove todos os bytes do arquivo.",
        "Porque Base64 impede logs de serem coletados."
      ],
      "answer": 1,
      "explanation": "Base64 representa bytes usando caracteres textuais. Qualquer pessoa que tenha a string pode decodificá-la sem uma chave secreta.",
      "topic": "codificação vs criptografia",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.1.4",
      "question": "Uma captura mostra payload ilegível. Qual é a conclusão correta?",
      "options": [
        "É definitivamente um ataque.",
        "É definitivamente erro de cabo.",
        "Pode ser binário, compressão, criptografia, codificação ou outro formato; é preciso contexto.",
        "Não pode ser tráfego legítimo."
      ],
      "answer": 2,
      "explanation": "Bytes ilegíveis não bastam para concluir ataque. A interpretação depende de protocolo, formato, aplicação, codificação e contexto.",
      "topic": "análise de payload",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.1.5",
      "question": "Em uma comunicação de rede, onde o significado humano é reconstruído?",
      "options": [
        "Apenas no cabo de rede.",
        "Apenas no roteador.",
        "Nas camadas de interpretação, especialmente protocolos, sistema operacional e aplicação.",
        "No endereço IP de origem."
      ],
      "answer": 2,
      "explanation": "O meio físico transporta sinais. O significado é reconstruído quando hardware e software interpretam bits e bytes segundo padrões e protocolos.",
      "topic": "camadas",
      "difficulty": "iniciante",
      "type": "arquitetura"
    },
    {
      "id": "q0.1.6",
      "question": "Por que um flow log de cloud não é equivalente a uma captura completa de pacote?",
      "options": [
        "Porque flow logs não existem em cloud.",
        "Porque flow logs são resumos de metadados, não necessariamente o pacote completo com payload.",
        "Porque flow logs sempre descriptografam TLS.",
        "Porque flow logs só mostram imagens."
      ],
      "answer": 1,
      "explanation": "Flow logs representam metadados como origem, destino, portas, protocolo, ação, bytes e pacotes. Eles não substituem uma captura completa quando detalhes de payload são necessários.",
      "topic": "cloud networking",
      "difficulty": "iniciante",
      "type": "cloud"
    },
    {
      "id": "q0.1.7",
      "question": "Em um dump aparece o byte 01000001. O que você pode afirmar sem conhecer o formato dos dados?",
      "options": [
        "É obrigatoriamente a letra A.",
        "É um pedaço de payload criptografado.",
        "É um endereço IP inválido.",
        "É um byte de valor 65, que pode ser a letra A, o número 65 ou parte de outro campo, conforme o contexto."
      ],
      "answer": 3,
      "explanation": "Sem contexto, bits são apenas bits. 01000001 vale 65 e, em ASCII/UTF-8, corresponde à letra A, mas pode ser número, instrução ou parte de um campo de protocolo; quem define o significado é o formato ou protocolo.",
      "topic": "interpretação",
      "difficulty": "iniciante",
      "type": "conceito"
    },
    {
      "id": "q0.1.8",
      "question": "Um arquivo em UTF-8 contém apenas a palavra ação (4 letras) e ocupa 6 bytes. Por quê?",
      "options": [
        "Porque ç e ã ocupam 2 bytes cada em UTF-8.",
        "Porque todo arquivo UTF-8 reserva 2 bytes para cabeçalho.",
        "Porque cada letra ocupa 1,5 byte.",
        "Porque o arquivo foi criptografado ao ser salvo."
      ],
      "answer": 0,
      "explanation": "Em UTF-8, letras sem acento ocupam 1 byte e caracteres como ç e ã ocupam 2: 61 c3 a7 c3 a3 6f. Letras visíveis e bytes não são a mesma coisa.",
      "topic": "codificação",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.1.1",
      "front": "O que é um bit?",
      "back": "É a menor unidade de informação digital, com dois estados possíveis, normalmente representados como 0 e 1.",
      "tags": [
        "bit",
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.2",
      "front": "O que é um byte?",
      "back": "É um grupo de 8 bits. Bytes são usados para representar números, caracteres, campos de protocolo, arquivos e muitos outros dados.",
      "tags": [
        "byte",
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.4",
      "front": "Por que computadores usam representação binária?",
      "back": "Porque dois estados são mais fáceis e confiáveis de distinguir em hardware real sujeito a ruído, variação e imperfeições.",
      "tags": [
        "binário",
        "hardware"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.6",
      "front": "O que o Wireshark mostra?",
      "back": "Uma interpretação organizada de bytes capturados, usando conhecimento sobre protocolos. Nem tudo que aparece na tela é o pacote bruto completo.",
      "tags": [
        "wireshark",
        "pacotes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.7",
      "front": "Como fica a palavra rede em bytes (hexadecimal)?",
      "back": "72 65 64 65: um byte por letra (r = 72, e = 65, d = 64).",
      "tags": [
        "bytes",
        "hexadecimal"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.8",
      "front": "O que é o byte 0a no fim de um arquivo de texto?",
      "back": "A quebra de linha (LF). No Windows ela costuma ser 0d 0a (CR LF). Ela muda o tamanho do arquivo e o Base64 gerado.",
      "tags": [
        "bytes",
        "quebra de linha"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.1.9",
      "front": "Checksum/CRC x MAC criptográfico",
      "back": "Checksum e CRC detectam alteração acidental, mas qualquer um pode recalculá-los. Um MAC criptográfico usa uma chave secreta e detecta alteração maliciosa (não tem relação com o endereço MAC).",
      "tags": [
        "integridade",
        "segurança"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.1.1",
      "type": "conceitual",
      "prompt": "Explique, com suas palavras, a diferença entre informação, dado digital, bit e sinal físico.",
      "expectedAnswer": "Informação é o significado que queremos representar. Dado digital é a informação organizada em formato manipulável por sistemas. Bit é a unidade mínima dessa representação. Sinal físico é a manifestação usada para transportar ou armazenar bits.",
      "explanation": "O exercício verifica se o aluno separa camadas conceituais que costumam ser misturadas no começo do estudo de redes."
    },
    {
      "id": "ex0.1.2",
      "type": "comparação",
      "prompt": "Dê dois exemplos de situações em que a mesma sequência de bytes pode ser interpretada de formas diferentes.",
      "expectedAnswer": "Exemplos possíveis: bytes podem ser texto UTF-8 ou parte de um arquivo binário; um valor pode ser número decimal ou caractere; payload pode ser JSON, dados compactados ou criptografados dependendo do protocolo.",
      "explanation": "Bytes precisam de contexto. Protocolos e formatos definem como interpretá-los."
    },
    {
      "id": "ex0.1.3",
      "type": "diagnóstico",
      "prompt": "Um colega afirma que o cabeçalho Authorization: Basic YWRtaW46MTIzNDU2 está seguro porque não é legível. Decodifique o valor (no Linux, echo YWRtaW46MTIzNDU2 | base64 -d; no Windows, o comando do passo 5 do laboratório) e corrija a afirmação de forma técnica e educada.",
      "expectedAnswer": "O valor decodifica para admin:123456, ou seja, usuário e senha em texto claro. Base64 é codificação reversível, sem chave. Quem capturar o cabeçalho recupera a credencial; ela precisa trafegar dentro de TLS, e segredos devem ser protegidos com criptografia, controle de acesso e gestão de segredos.",
      "explanation": "O objetivo é combater uma confusão muito comum entre codificação e criptografia."
    },
    {
      "id": "ex0.1.5",
      "type": "classificação",
      "prompt": "Classifique cada item como sinal físico, byte, estrutura de protocolo ou dado de aplicação: (a) pulso de luz em uma fibra; (b) o valor 72 em hexadecimal; (c) o cabeçalho de um pacote IPv4; (d) o documento JSON {\"msg\": \"rede\"}.",
      "expectedAnswer": "(a) sinal físico; (b) byte (em texto UTF-8, a letra r); (c) estrutura de protocolo, interpretada pela pilha de rede; (d) dado de aplicação, interpretado pela aplicação.",
      "explanation": "O exercício verifica se você separa os níveis da tabela de arquitetura e sabe quem interpreta cada um."
    }
  ],
  "challenge": {
    "title": "Explique a cadeia invisível de uma mensagem",
    "scenario": "Você está ajudando um colega de TI que sabe usar ferramentas, mas ainda não entende o que acontece por baixo. Ele pergunta: se eu envio a palavra rede em uma aplicação, o que realmente atravessa a rede?",
    "tasks": [
      "Explicar a diferença entre palavra visível e bytes transmitidos.",
      "Descrever a transformação em pelo menos cinco etapas.",
      "Indicar onde protocolos entram na história.",
      "Explicar por que payload ilegível não significa automaticamente ataque.",
      "Apontar pelo menos um impacto operacional e um impacto de segurança."
    ],
    "constraints": [
      "Não usar jargão sem explicar.",
      "Não dizer apenas que tudo vira bit.",
      "Não confundir Base64 com criptografia."
    ],
    "expectedDeliverables": [
      "Texto explicativo de 10 a 15 linhas.",
      "Um mini fluxo numerado.",
      "Uma observação de segurança.",
      "Uma dúvida que deve ser respondida na próxima aula."
    ],
    "gradingRubric": [
      {
        "criterion": "Separação entre informação, bytes, bits e sinais",
        "points": 30,
        "description": "A resposta distingue corretamente significado humano, dado digital e transmissão física."
      },
      {
        "criterion": "Fluxo de transformação",
        "points": 30,
        "description": "A resposta apresenta uma sequência lógica desde a intenção até a interpretação no destino."
      },
      {
        "criterion": "Relação com redes e segurança",
        "points": 25,
        "description": "A resposta conecta representação com protocolos, análise de tráfego, logs ou segurança."
      },
      {
        "criterion": "Clareza didática",
        "points": 15,
        "description": "A resposta ensina sem simplificar demais nem usar termos soltos."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A forma correta de responder começa separando o que o usuário quer comunicar da forma como a máquina representa essa comunicação. Depois, é preciso lembrar que a rede não transporta significado humano diretamente; transporta sinais que representam bits. Por fim, os bits só voltam a ter significado quando são interpretados pelas camadas corretas no destino.",
    "steps": [
      "Identificar a intenção humana: enviar a palavra rede.",
      "Mostrar que a aplicação representa a palavra como caracteres.",
      "Explicar que os caracteres são codificados em bytes.",
      "Explicar que bytes são sequências de bits.",
      "Explicar que a interface de rede transforma bits em sinais físicos.",
      "Explicar que protocolos organizam esses bytes para que origem e destino concordem na interpretação.",
      "Explicar que o destino reconstrói os bits, agrupa bytes e interpreta a mensagem."
    ],
    "commonWrongAnswers": [
      {
        "answer": "A rede envia a palavra rede diretamente.",
        "whyItIsWrong": "A palavra é uma interpretação humana. O que atravessa o meio físico são sinais que representam bits."
      },
      {
        "answer": "Se o payload não é legível, é porque está criptografado.",
        "whyItIsWrong": "Payload ilegível pode ser binário, compactado, serializado, codificado, criptografado ou simplesmente exibido pela ferramenta de forma limitada."
      },
      {
        "answer": "Base64 protege o conteúdo porque embaralha o texto.",
        "whyItIsWrong": "Base64 é reversível sem segredo. Ela muda a representação, mas não protege a confidencialidade."
      }
    ],
    "finalAnswer": "Quando alguém envia a palavra rede, a aplicação não joga uma ideia abstrata no cabo. Ela transforma a palavra em caracteres, os caracteres em bytes segundo uma codificação, os bytes em bits e os bits em sinais físicos. Protocolos adicionam contexto para que origem e destino saibam como interpretar esses bytes. No destino, os sinais são reconstruídos em bits, agrupados em bytes e entregues à aplicação, que volta a mostrar a palavra para humanos. Em segurança, isso importa porque logs, pacotes e payloads são representações: é preciso contexto antes de concluir se algo é normal, erro ou ataque."
  },
  "glossary": [
    {
      "term": "Informação",
      "shortDefinition": "Significado que uma pessoa ou sistema deseja comunicar, armazenar ou processar.",
      "longDefinition": "Informação é o conteúdo semântico percebido por humanos ou aplicações. Para ser processada por computadores, precisa ser representada em dados digitais.",
      "example": "A ideia de enviar a palavra rede para outra pessoa é informação antes de ser transformada em bytes.",
      "relatedTerms": [
        "dado",
        "representação digital",
        "protocolo"
      ],
      "relatedLessons": [
        "0.1",
        "0.2",
        "0.3"
      ]
    },
    {
      "term": "Dado digital",
      "shortDefinition": "Informação organizada em uma forma manipulável por sistemas computacionais.",
      "longDefinition": "Dado digital é uma representação estruturada que pode ser armazenada, transmitida, validada e interpretada por hardware e software.",
      "example": "Uma requisição HTTP, um arquivo JSON e um log são dados digitais.",
      "relatedTerms": [
        "byte",
        "encoding",
        "payload"
      ],
      "relatedLessons": [
        "0.1",
        "0.3",
        "8.1"
      ]
    },
    {
      "term": "Bit",
      "shortDefinition": "Menor unidade de informação digital, representada como 0 ou 1.",
      "longDefinition": "Um bit representa uma escolha entre dois estados possíveis. Em hardware real, esses estados são associados a fenômenos físicos distinguíveis.",
      "example": "O valor binário 01000001 possui oito bits.",
      "relatedTerms": [
        "byte",
        "binário",
        "sinal físico"
      ],
      "relatedLessons": [
        "0.1",
        "0.2"
      ]
    },
    {
      "term": "Byte",
      "shortDefinition": "Grupo de 8 bits usado como unidade comum para representar dados.",
      "longDefinition": "Bytes são usados para representar caracteres, números, campos de protocolos, partes de arquivos, instruções e muitos outros tipos de dados.",
      "example": "Em muitas codificações, uma letra ASCII simples ocupa um byte.",
      "relatedTerms": [
        "bit",
        "hexadecimal",
        "payload"
      ],
      "relatedLessons": [
        "0.1",
        "0.2",
        "0.4"
      ]
    },
    {
      "term": "Sinal físico",
      "shortDefinition": "Manifestação física usada para transportar ou armazenar bits.",
      "longDefinition": "Sinais físicos podem aparecer como variações de tensão elétrica, pulsos de luz em fibra óptica ou ondas de rádio em redes sem fio.",
      "example": "Em Wi-Fi, bits são transmitidos por modulações em ondas de rádio.",
      "relatedTerms": [
        "camada física",
        "bit",
        "meio físico"
      ],
      "relatedLessons": [
        "0.1",
        "0.5",
        "12.1"
      ]
    },
    {
      "term": "Codificação",
      "shortDefinition": "Regra para transformar informação em uma representação específica e reversível.",
      "longDefinition": "Codificação define como dados são representados. Ela não deve ser confundida com criptografia, pois normalmente não exige segredo para reverter.",
      "example": "Base64 representa bytes usando caracteres textuais, mas não protege o conteúdo.",
      "relatedTerms": [
        "Base64",
        "UTF-8",
        "criptografia"
      ],
      "relatedLessons": [
        "0.1",
        "0.3",
        "8.5"
      ]
    },
    {
      "term": "UTF-8",
      "shortDefinition": "Codificação de texto que representa cada caractere com 1 a 4 bytes.",
      "longDefinition": "Em UTF-8, letras sem acento ocupam 1 byte, com os mesmos valores do ASCII; caracteres acentuados, como ç e ã, ocupam 2 bytes. É a codificação mais usada em web, APIs e logs.",
      "example": "A palavra rede ocupa 4 bytes (72 65 64 65); ação ocupa 6 bytes (61 c3 a7 c3 a3 6f).",
      "relatedTerms": [
        "codificação",
        "byte",
        "Base64"
      ],
      "relatedLessons": [
        "0.1",
        "0.3"
      ]
    },
    {
      "term": "Payload",
      "shortDefinition": "A parte de uma mensagem ou pacote que carrega os dados úteis, sem os cabeçalhos de controle.",
      "longDefinition": "Em um pacote, os cabeçalhos dizem como entregar e interpretar a mensagem; o payload é o conteúdo transportado. Ele pode ser texto, formato binário, dado compactado ou criptografado, e sua interpretação depende do protocolo.",
      "example": "Em uma requisição HTTP sem TLS, o corpo JSON aparece no payload do segmento TCP.",
      "relatedTerms": [
        "dado digital",
        "protocolo",
        "byte"
      ],
      "relatedLessons": [
        "0.1"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Esta aula fundamenta as próximas aulas sobre bits, bytes, binário, hexadecimal, codificação e sinais físicos."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "A noção de artefatos, logs, manifestos e imagens de container depende de representação digital."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Tokens, claims, certificados e credenciais são estruturas digitais que precisam ser codificadas, assinadas, transmitidas e interpretadas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Fundamentos de automação e pipelines",
      "lesson": "Artefatos, logs e evidências de build",
      "reason": "Pipelines manipulam representações digitais como imagens, manifestos, relatórios e logs."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Tokens, claims e federação",
      "lesson": "Base conceitual para entender tokens codificados e assinados",
      "reason": "Tokens de identidade dependem de codificação, serialização, assinatura e interpretação correta."
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
      "0.2"
    ]
  }
};
