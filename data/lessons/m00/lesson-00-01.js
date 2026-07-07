export const lesson0001 = {
  "id": "0.1",
  "moduleId": "m00",
  "order": 1,
  "title": "Como computadores representam informação",
  "subtitle": "Antes de existir IP, porta, firewall ou cloud, existe uma pergunta mais básica: como uma máquina transforma o mundo real em bits transportáveis?",
  "duration": "55-80 min",
  "estimatedStudyTimeMinutes": 80,
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
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Imagine que você trabalha em Segurança da Informação e recebe um alerta do SOC: uma estação interna enviou dados para um servidor externo. A ferramenta mostra endereços IP, portas, protocolo, tamanho do pacote e alguns bytes do payload. A primeira tentação é olhar aquilo como se fosse apenas uma tela cheia de números. Mas, por trás daquela tela, existe uma cadeia inteira de transformações: uma intenção humana virou dados de aplicação, esses dados viraram bytes, os bytes foram organizados por protocolos, os protocolos foram encapsulados em pacotes e quadros, e tudo isso precisou atravessar algum meio físico como cobre, fibra ou rádio.</p>\n  <p>\n    Antes de estudar IP, Ethernet, DNS, TCP, TLS, firewall, VPN, cloud networking ou Zero Trust, precisamos entender uma ideia básica: computadores não entendem significado humano diretamente. Eles não entendem naturalmente a ideia de uma foto, uma senha, uma requisição HTTP, um token OIDC ou um arquivo PDF. Eles trabalham com representações. Essas representações são construídas a partir de estados físicos controláveis e distinguíveis.</p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> sem compreender representação digital, o aluno pode decorar comandos de rede, mas terá dificuldade para interpretar pacotes, entender codificação, analisar logs, diferenciar texto de binário, diagnosticar corrupção de dados e perceber por que campos de protocolo são medidos em bits e bytes.\n  </div>\n  <p>\n    Esta aula é a base invisível de todo o curso. Quando você estudar endereço MAC, IPv4, subnetting, TCP flags, TLS, Base64, certificados, payloads, logs e análise de tráfego, estará lidando com variações da mesma pergunta: como uma informação foi representada para que pudesse ser armazenada, transmitida, validada e interpretada?</p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    A necessidade de representar informação é muito anterior aos computadores modernos. Telégrafos, cartões perfurados, fitas magnéticas, válvulas, transistores e circuitos integrados são capítulos diferentes da mesma história: transformar alguma informação em um padrão físico que possa ser registrado, transportado e lido novamente.</p>\n  <p>\n    O telégrafo, por exemplo, representava letras usando sequências de sinais curtos e longos. Cartões perfurados representavam instruções ou dados pela presença ou ausência de furos. Em sistemas eletrônicos, a presença ou ausência de determinado nível de tensão passou a representar estados. Depois, com semicondutores, transistores e circuitos digitais, ficou cada vez mais eficiente construir máquinas capazes de distinguir dois estados estáveis: ligado/desligado, alto/baixo, verdadeiro/falso, 1/0.</p>\n  <p>\n    Essa escolha não aconteceu porque o mundo humano seja binário. A realidade é cheia de gradações: som, luz, cor, temperatura e movimento variam continuamente. A computação digital escolheu representar informação em estados discretos porque isso torna armazenamento, transmissão e processamento muito mais confiáveis. Dois estados são mais fáceis de distinguir em hardware real do que muitos estados parecidos. Em redes, essa confiabilidade é essencial: se um bit muda durante a transmissão, o dado interpretado pode mudar completamente.</p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr>\n        <th>Época/abordagem</th>\n        <th>Como representava informação</th>\n        <th>Limitação</th>\n        <th>Ideia que permaneceu</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Telégrafo</td>\n        <td>Padrões de sinais curtos e longos</td>\n        <td>Baixa taxa de transmissão e dependência de operadores</td>\n        <td>Informação pode virar sequência de sinais</td>\n      </tr>\n      <tr>\n        <td>Cartões perfurados</td>\n        <td>Presença ou ausência de furos</td>\n        <td>Pouca flexibilidade e armazenamento físico volumoso</td>\n        <td>Estados discretos podem codificar instruções e dados</td>\n      </tr>\n      <tr>\n        <td>Eletrônica digital</td>\n        <td>Níveis elétricos interpretados como 0 ou 1</td>\n        <td>Exige controle de ruído, sincronização e energia</td>\n        <td>Bits permitem processamento confiável em escala</td>\n      </tr>\n      <tr>\n        <td>Redes modernas</td>\n        <td>Bits organizados em quadros, pacotes, segmentos e mensagens</td>\n        <td>Exige protocolos, correção de erro, endereçamento e segurança</td>\n        <td>Comunicação digital é uma cadeia de representações</td>\n      </tr>\n    </tbody>\n  </table>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema central é que significado humano não atravessa cabos, fibras ou ondas de rádio diretamente. O que atravessa o meio físico são sinais. Para que uma mensagem seja transmitida, o emissor precisa converter a informação em uma forma física; o receptor precisa reconstruir essa forma física em bits; e o software precisa interpretar os bits como algum tipo de dado.</p>\n  <p>\n    Sem uma representação confiável, cada máquina poderia interpretar a mesma sequência física de forma diferente. Um lado poderia achar que recebeu a letra A, enquanto o outro enviou um número, um comando, um endereço, uma flag ou parte de uma chave criptográfica. Por isso, redes dependem de camadas de interpretação: padrões elétricos, codificação de bits, quadros, pacotes, protocolos de transporte, protocolos de aplicação e formatos de dados.</p>\n  <ul class=\"flow-list\">\n    <li><strong>O que quebra sem esse conceito?</strong> O aluno não entende por que um pacote tem campos em bits, por que endereços são números, por que payloads podem parecer ilegíveis e por que uma captura de rede é uma interpretação.</li>\n    <li><strong>Que confusão ele evita?</strong> Evita misturar dado, codificação, criptografia, compressão, protocolo e sinal físico como se fossem a mesma coisa.</li>\n    <li><strong>Que escala ele permite?</strong> Permite que bilhões de dispositivos diferentes usem padrões comuns para armazenar e transmitir informações.</li>\n    <li><strong>Que risco ele reduz?</strong> Reduz diagnósticos errados, como concluir que todo texto ilegível é criptografia ou que todo erro de aplicação é problema de rede.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Erro comum:</strong> achar que o computador “envia um site”, “envia uma senha” ou “envia uma imagem” diretamente. Na prática, ele envia sequências de bits organizadas por padrões. O significado só aparece porque origem e destino concordam em como interpretar essas sequências.\n  </div>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    A evolução da representação digital pode ser entendida como uma busca por confiabilidade, velocidade, densidade e padronização. No começo, representar informação era uma tarefa muito próxima do meio físico: um furo no cartão, uma marca no papel, um pulso elétrico. Com o tempo, surgiram abstrações mais fortes. Hoje, quando você faz uma requisição HTTPS, muitas camadas trabalham sem que você veja: codificação de texto, serialização de dados, criptografia, compressão, segmentação, endereçamento, encapsulamento e transmissão física.</p>\n  <p>\n    Redes modernas dependem dessa evolução. Um byte isolado não diz muita coisa. O significado vem do contexto. O mesmo valor binário pode representar um número, uma letra, uma cor, uma instrução, uma flag TCP, parte de um endereço IP, parte de uma chave criptográfica ou um pedaço de arquivo. Por isso, protocolos são acordos de interpretação.</p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr>\n        <th>Nível</th>\n        <th>Exemplo</th>\n        <th>Quem interpreta</th>\n        <th>Falha típica</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Sinal físico</td>\n        <td>Tensão, luz, rádio</td>\n        <td>Placa de rede, transceptor, rádio Wi-Fi</td>\n        <td>Ruído, atenuação, interferência, cabo ruim</td>\n      </tr>\n      <tr>\n        <td>Bit</td>\n        <td>0 ou 1</td>\n        <td>Circuitos digitais</td>\n        <td>Erro de leitura ou bit flip</td>\n      </tr>\n      <tr>\n        <td>Byte</td>\n        <td>8 bits agrupados</td>\n        <td>CPU, sistema operacional, aplicações</td>\n        <td>Encoding incorreto ou byte inesperado</td>\n      </tr>\n      <tr>\n        <td>Estrutura de protocolo</td>\n        <td>Frame Ethernet, pacote IP, segmento TCP</td>\n        <td>Stack de rede</td>\n        <td>Campo inválido, checksum, MTU, fragmentação</td>\n      </tr>\n      <tr>\n        <td>Dado de aplicação</td>\n        <td>HTTP, JSON, HTML, token, arquivo</td>\n        <td>Aplicação, biblioteca, serviço</td>\n        <td>Formato inválido, codificação errada, parsing inseguro</td>\n      </tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Representação digital é o processo de transformar informação em sequências de bits que podem ser armazenadas, processadas, transmitidas e reinterpretadas por sistemas computacionais. Um bit é uma unidade de informação com dois estados possíveis, normalmente representados como 0 e 1. Um byte é um grupo de 8 bits. A partir desses blocos simples, computadores representam números, textos, imagens, áudio, vídeo, programas, pacotes de rede, certificados digitais, chaves criptográficas e logs.</p>\n  <div class=\"definition-box\">\n    <strong>Definição:</strong> um computador representa informação quando converte algo significativo para humanos ou aplicações em uma sequência padronizada de bits, capaz de ser manipulada por hardware e software.\n  </div>\n  <p>\n    O ponto mais importante é separar três ideias: informação, representação e interpretação. A informação é o que queremos comunicar. A representação é como essa informação vira bits. A interpretação é o processo de atribuir significado aos bits. A sequência binária <strong>01000001</strong>, por exemplo, pode representar o número 65, a letra A em uma codificação textual, parte de uma instrução de máquina ou simplesmente um byte dentro de um arquivo. Sem contexto, bits são apenas bits.</p>\n  <p>\n    Em redes, esse contexto é fornecido por protocolos. O Ethernet define como organizar certos bytes em um quadro local. O IPv4 define como interpretar campos como versão, tamanho, origem e destino. O TCP define portas, sequência, confirmação e flags. O HTTP define mensagens de aplicação. O TLS define como proteger a comunicação. Cada camada acrescenta significado a bytes que, isoladamente, não explicam sua própria função.</p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    Por dentro, a representação digital funciona como uma cadeia de transformação e reconstrução. O usuário não digita bits. Ele clica, escreve, grava áudio, tira uma foto ou executa um comando. A aplicação transforma essa ação em dados. O sistema operacional e as bibliotecas organizam esses dados em estruturas. A pilha de rede encapsula os dados em protocolos. A placa de rede transforma bits em sinais. O destino faz o caminho inverso.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Intenção:</strong> uma pessoa ou processo quer realizar algo, como abrir um site, enviar uma mensagem ou consultar uma API.</li>\n    <li><strong>Dado de aplicação:</strong> a aplicação cria uma representação lógica, como uma requisição HTTP, um documento JSON ou um arquivo.</li>\n    <li><strong>Codificação:</strong> textos, números e estruturas são convertidos para bytes segundo regras, como UTF-8, binário próprio, JSON, ASN.1 ou outros formatos.</li>\n    <li><strong>Encapsulamento:</strong> a rede adiciona cabeçalhos e metadados: portas, IPs, endereços MAC, checksums, tamanho, flags e outros campos.</li>\n    <li><strong>Bits:</strong> os bytes são vistos como sequências de 0 e 1.</li>\n    <li><strong>Sinais físicos:</strong> bits são convertidos em variações físicas no meio: tensão elétrica, luz em fibra ou ondas de rádio.</li>\n    <li><strong>Reconstrução:</strong> o receptor mede os sinais, reconstrói bits, agrupa bytes, valida protocolos e entrega dados para a aplicação.</li>\n  </ol>\n  <p>\n    Esse processo precisa lidar com imperfeições físicas. Cabos sofrem interferência. Rádio sofre ruído, reflexão e disputa pelo meio. Fibra sofre atenuação e problemas de conectorização. Hardware real não enxerga zeros e uns abstratos; ele mede fenômenos físicos e decide se aquilo representa 0 ou 1. Por isso existem tolerâncias, sincronização, codificação de linha, checksums, CRCs, retransmissões e protocolos de correção ou detecção de erro.</p>\n  <div class=\"callout callout--security\">\n    <strong>Ligação com segurança:</strong> muitos controles de segurança funcionam porque validam interpretação. Um parser seguro rejeita dados malformados. Um certificado digital ajuda a validar identidade. Um checksum detecta alteração acidental. Um MAC criptográfico detecta alteração maliciosa. Um SIEM interpreta logs para transformar bytes em evidência operacional.\n  </div>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    A representação da informação aparece em toda a arquitetura computacional. No hardware, transistores armazenam e processam estados. Na memória, bytes ficam em endereços. No sistema operacional, arquivos, processos e sockets manipulam dados. Na rede, interfaces transformam bytes em sinais e sinais em bytes. Na aplicação, bibliotecas interpretam formatos. Na segurança, ferramentas analisam evidências para distinguir comportamento legítimo, erro e abuso.</p>\n  <ul>\n    <li><strong>Camada física:</strong> transporta sinais que representam bits.</li>\n    <li><strong>Camada de enlace:</strong> organiza bytes em quadros e identifica dispositivos locais.</li>\n    <li><strong>Camada de rede:</strong> organiza endereçamento lógico e caminho entre redes.</li>\n    <li><strong>Camada de transporte:</strong> organiza comunicação entre processos usando portas, estado e controle de fluxo.</li>\n    <li><strong>Camada de aplicação:</strong> interpreta bytes como requisições, respostas, arquivos, comandos, tokens e mensagens.</li>\n  </ul>\n  <p>\n    Para troubleshooting, essa arquitetura evita diagnósticos aleatórios. Se os sinais físicos falham, a aplicação nem recebe dados. Se os bytes chegam, mas são interpretados com encoding errado, o problema pode parecer aplicação, não rede. Se o tráfego está criptografado, o analista pode ver metadados, mas não conteúdo. Se a captura mostra payload binário, isso não prova ataque; pode ser compressão, formato binário, serialização ou criptografia legítima.</p>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Pense em uma empresa que precisa enviar instruções para uma filial usando lâmpadas. Em vez de mandar uma frase diretamente, a matriz combina um código: lâmpada apagada significa 0, lâmpada acesa significa 1. Grupos de oito sinais formam um byte. Certas sequências representam letras. Outras representam números. Outras representam comandos. A filial só entende a mensagem porque conhece o mesmo código.</p>\n  <p>\n    Essa analogia ajuda a entender por que computadores usam estados físicos para representar informação. O fio, a fibra ou o rádio não transportam o “significado” sozinho. Eles transportam sinais. O significado surge quando os dois lados concordam em como mapear sinais para bits, bits para bytes e bytes para estruturas.</p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> redes reais são muito mais complexas do que lâmpadas acesas e apagadas. Existem temporização, modulação, ruído, multiplexação, criptografia, buffers, protocolos, retransmissões, endereçamento e várias camadas de interpretação. A analogia serve para entender a ideia de representação, não para explicar toda a engenharia física das redes.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Suponha que você digite a letra A em um editor de texto. Para você, é uma letra. Para o computador, essa letra precisa virar uma representação numérica. Em uma codificação comum, a letra A pode ser representada pelo valor decimal 65, que em binário é 01000001. Quando esse texto é salvo em um arquivo ou enviado por rede, o sistema não transmite a ideia abstrata de “A”; ele transmite bytes que outro sistema interpreta como A porque usa a mesma convenção.</p>\n  <p>\n    Agora imagine que você envie a palavra “rede”. Essa palavra vira uma sequência de bytes. Se o receptor interpretar os bytes como texto usando a codificação correta, verá “rede”. Se interpretar os mesmos bytes como outro formato, poderá ver caracteres estranhos ou dados aparentemente sem sentido. Essa diferença é essencial para entender problemas de encoding, payloads em APIs, logs quebrados e análise de tráfego.</p>\n  <div class=\"content-card\">\n    <h3>Mini fluxo</h3>\n    <ol class=\"flow-list\">\n      <li>Você digita: rede.</li>\n      <li>O editor armazena caracteres.</li>\n      <li>A codificação transforma caracteres em bytes.</li>\n      <li>O sistema salva ou envia os bytes.</li>\n      <li>Outro sistema lê os bytes e precisa interpretá-los com a regra correta.</li>\n    </ol>\n  </div>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, a representação digital aparece em praticamente todo incidente, mudança e diagnóstico. Um firewall registra logs como texto estruturado. Um SIEM transforma eventos em campos pesquisáveis. Um proxy registra URL, método HTTP, tamanho da resposta e usuário autenticado. Um EDR coleta eventos do sistema operacional. Um balanceador mede conexões e bytes transferidos. Tudo isso depende de transformar fatos em dados representáveis.</p>\n  <p>\n    Quando um analista investiga vazamento de dados, ele pode comparar volume de bytes, tipos de arquivo, domínios, user agents, horários, processos e destinos. Mas essas informações não são a realidade diretamente; são interpretações geradas por sensores. Se o sensor interpreta errado, perde dados, usa encoding inadequado ou não coleta o campo certo, a investigação fica comprometida.</p>\n  <p>\n    Um exemplo clássico: uma aplicação legada grava logs com caracteres especiais quebrados. O time de segurança pode perder nomes de usuários, caminhos de arquivo ou parâmetros de requisição. O problema não é “a rede caiu”; é uma falha de codificação e interpretação de dados. Outro exemplo: um appliance mostra payload em hexadecimal. Sem entender bytes e representação, o analista enxerga ruído; com fundamento, ele sabe procurar padrões, cabeçalhos, strings e formatos.</p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, a infraestrutura é altamente abstrata, mas a representação digital continua existindo. Quando uma aplicação em uma VPC ou VNet envia dados para outra aplicação, o provedor pode encapsular tráfego, aplicar políticas, registrar flow logs, medir bytes, cobrar transferência, criptografar discos, armazenar objetos e entregar métricas. Tudo isso são representações de eventos, estados e tráfego.</p>\n  <p>\n    Um flow log não é o pacote original completo. Ele é uma representação resumida: origem, destino, porta, protocolo, ação, quantidade de bytes, quantidade de pacotes e horário. Isso é excelente para auditoria e custo, mas não substitui captura de pacote quando o problema exige ver payload ou detalhes de handshake. Da mesma forma, métricas de cloud podem indicar aumento de tráfego, mas não necessariamente explicar o conteúdo desse tráfego.</p>\n  <p>\n    Financeiramente, representação também importa. Provedores cobram por armazenamento, transferência de dados, logs ingeridos, métricas, consultas, retenção e processamento. Um erro de configuração que gera logs excessivos não muda apenas a operação; muda o custo. Entender o que está sendo representado ajuda a decidir o que coletar, por quanto tempo reter e como investigar sem gerar custo desnecessário.</p>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em DevSecOps, pipelines transformam código, configuração e evidências em artefatos digitais. Um commit vira diff. Um build vira imagem de container. Uma política vira resultado de validação. Um teste vira relatório. Um segredo mal tratado pode virar string exposta em log. Um token OIDC usado em pipeline é uma estrutura de dados codificada, assinada e interpretada por serviços de identidade.</p>\n  <p>\n    Quando uma pipeline envia uma imagem para um registry, a imagem não é uma “caixa mágica”. Ela é um conjunto de camadas, manifestos, hashes e blobs. Quando o Kubernetes baixa essa imagem, ele valida referências, baixa bytes e monta o filesystem do container. Quando uma ferramenta SAST ou IaC scanner aponta uma falha, ela está interpretando arquivos e estruturas segundo regras.</p>\n  <p>\n    Esta aula prepara o aluno para não tratar automação como magia. Cada etapa do pipeline recebe, transforma e entrega representações. Erros de encoding, serialização, escaping, truncamento de log, formatação YAML, Base64 em secrets e manipulação incorreta de variáveis são falhas comuns em ambientes automatizados.</p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Segurança da Informação depende profundamente de representação correta. Um controle de acesso precisa interpretar identidade e permissões. Um WAF precisa interpretar requisições. Um antivírus precisa interpretar arquivos. Um IDS precisa interpretar tráfego. Um parser de aplicação precisa interpretar entradas de usuário. Se a interpretação falha, surgem vulnerabilidades.</p>\n  <table class=\"data-table risk-table\">\n    <thead>\n      <tr>\n        <th>Risco</th>\n        <th>Como aparece</th>\n        <th>Impacto</th>\n        <th>Mitigação</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Confundir codificação com criptografia</td>\n        <td>Base64 tratado como se protegesse segredo</td>\n        <td>Exposição de tokens, senhas ou dados sensíveis</td>\n        <td>Usar criptografia real, controle de acesso e gestão segura de segredos</td>\n      </tr>\n      <tr>\n        <td>Parsing inseguro</td>\n        <td>Aplicação interpreta entrada malformada de modo inesperado</td>\n        <td>Falhas de validação, bypass ou execução indevida</td>\n        <td>Validar entrada, usar parsers seguros e testar casos malformados</td>\n      </tr>\n      <tr>\n        <td>Logs incompletos</td>\n        <td>Eventos críticos não são representados nos logs</td>\n        <td>Investigação lenta ou inconclusiva</td>\n        <td>Definir modelo de logging, campos obrigatórios e retenção adequada</td>\n      </tr>\n      <tr>\n        <td>Interpretação precipitada de payload</td>\n        <td>Bytes ilegíveis classificados automaticamente como ataque</td>\n        <td>Falso positivo e perda de confiança na monitoração</td>\n        <td>Verificar protocolo, formato, compressão, encoding e contexto</td>\n      </tr>\n    </tbody>\n  </table>\n  <div class=\"callout callout--security\">\n    <strong>Limite ético:</strong> nesta aula, a análise de representação é usada para diagnóstico, defesa, auditoria e compreensão. Não há instruções para explorar sistemas reais. Laboratórios devem ser feitos apenas em ambiente próprio e controlado.\n  </div>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m00l01-svg-title m00l01-svg-desc\">\n    <title id=\"m00l01-svg-title\">Cadeia de representação da informação em redes</title>\n    <desc id=\"m00l01-svg-desc\">O diagrama mostra uma intenção humana sendo convertida em dado de aplicação, bytes, bits, sinais físicos e reconstruída no destino.</desc>\n    <defs>\n      <marker id=\"m00l01-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"30\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"95\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Intenção</text>\n    <text x=\"95\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">abrir um site</text>\n\n    <rect x=\"205\" y=\"70\" width=\"140\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"275\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"275\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">HTTP, JSON, texto</text>\n\n    <rect x=\"390\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"455\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Bytes</text>\n    <text x=\"455\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">valores 0-255</text>\n\n    <rect x=\"565\" y=\"70\" width=\"130\" height=\"72\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"630\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Bits</text>\n    <text x=\"630\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">0 e 1</text>\n\n    <rect x=\"740\" y=\"70\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"825\" y=\"101\" text-anchor=\"middle\" class=\"svg-label\">Sinal físico</text>\n    <text x=\"825\" y=\"124\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tensão, luz, rádio</text>\n\n    <line x1=\"160\" y1=\"106\" x2=\"205\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"345\" y1=\"106\" x2=\"390\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"520\" y1=\"106\" x2=\"565\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <line x1=\"695\" y1=\"106\" x2=\"740\" y2=\"106\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n\n    <rect x=\"120\" y=\"235\" width=\"170\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"205\" y=\"266\" text-anchor=\"middle\" class=\"svg-label\">Destino</text>\n    <text x=\"205\" y=\"289\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">interpreta dados</text>\n\n    <rect x=\"375\" y=\"235\" width=\"210\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"480\" y=\"266\" text-anchor=\"middle\" class=\"svg-label\">Ferramentas</text>\n    <text x=\"480\" y=\"289\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Wireshark, logs, SIEM</text>\n\n    <rect x=\"670\" y=\"235\" width=\"190\" height=\"72\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"765\" y=\"266\" text-anchor=\"middle\" class=\"svg-label\">Cloud</text>\n    <text x=\"765\" y=\"289\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">flow logs, métricas</text>\n\n    <path d=\"M825 142 C825 190 765 190 765 235\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <path d=\"M765 307 C700 360 540 360 480 307\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n    <path d=\"M375 271 L290 271\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#m00l01-arrow)\" />\n\n    <text x=\"480\" y=\"375\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">O significado não viaja sozinho: ele é reconstruído por camadas de interpretação.</text>\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>\n    O laboratório desta aula não tenta ensinar ainda DNS, TCP ou HTTP em profundidade. Ele treina o raciocínio fundamental: uma ação humana vira bytes, os bytes podem ser observados por ferramentas e a interpretação depende do contexto. O objetivo é criar uma base mental antes de entrar nas próximas aulas sobre bits, bytes, binário e hexadecimal.</p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios forçam produção ativa. Não basta reconhecer a definição de bit; é necessário explicar a cadeia de representação, classificar exemplos e evitar confusões comuns entre sinal, dado, encoding, compressão e criptografia.</p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula uma situação real de trabalho: explicar para outra pessoa técnica, mas iniciante em redes, o que realmente acontece quando uma mensagem sai de uma aplicação e atravessa a rede.</p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada não deve apenas dizer “tudo vira bit”. Ela deve mostrar o raciocínio correto: intenção humana, dado de aplicação, codificação, bytes, bits, sinal físico, transporte, reconstrução e interpretação no destino.</p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> computadores representam informação por meio de bits, e bits precisam ser fisicamente transportados como sinais.</li>\n    <li><strong>O que lembrar:</strong> informação, dado, byte, bit e sinal não são a mesma coisa.</li>\n    <li><strong>Erro comum:</strong> achar que bytes ilegíveis significam automaticamente criptografia ou ataque.</li>\n    <li><strong>Uso real:</strong> análise de pacotes, logs, payloads, APIs, cloud flow logs, SIEM e troubleshooting dependem de interpretação correta.</li>\n    <li><strong>Segurança:</strong> muitos incidentes envolvem falhas de interpretação, codificação incorreta, logs insuficientes ou tratamento inseguro de entrada.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    Na próxima aula, vamos estudar bits, bytes, binário e hexadecimal. Esta aula mostrou que tudo precisa virar representação digital. A próxima mostra como ler e manipular essas representações. Esse conhecimento será essencial para entender endereço IPv4, máscara de rede, endereço MAC, IPv6, portas, flags TCP, dumps em hexadecimal e análise de pacotes.</p>\n</section>"
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
  "deepDive": {
    "mentalModel": "Redes são uma cadeia de traduções: intenção humana vira dado, dado vira bytes, bytes viram bits, bits viram sinais, sinais viram bits novamente e os bits só ganham significado quando interpretados pelo protocolo correto.",
    "keyTerms": [
      "informação",
      "dado",
      "representação digital",
      "bit",
      "byte",
      "sinal físico",
      "codificação",
      "interpretação",
      "protocolo"
    ],
    "limitations": [
      "Entender representação digital não substitui o estudo posterior de eletrônica, modulação, protocolos ou criptografia.",
      "Um byte isolado raramente explica seu próprio significado sem contexto.",
      "Ferramentas de rede mostram interpretações, não a realidade completa do sistema observado."
    ],
    "whenToUse": [
      "Ao interpretar capturas de tráfego, logs, payloads, arquivos, tokens, cabeçalhos e métricas.",
      "Ao diferenciar encoding, compressão, criptografia, serialização e formato binário.",
      "Ao diagnosticar corrupção de dados, caracteres quebrados, payload ilegível ou diferença entre tamanho lógico e tamanho transmitido."
    ],
    "whenNotToUse": [
      "Não usar o conceito como substituto para análise protocolar detalhada.",
      "Não concluir que algo é malicioso apenas porque os bytes não são legíveis como texto.",
      "Não ignorar camadas superiores quando o meio físico está saudável e os bytes chegam corretamente."
    ],
    "operationalImpact": [
      "Melhora a qualidade do troubleshooting porque separa problema físico, problema de codificação, problema de protocolo e problema de aplicação.",
      "Exige documentação de formatos, logs e protocolos usados em integrações críticas.",
      "Ajuda times de rede, segurança e desenvolvimento a falarem a mesma linguagem ao analisar tráfego e evidências."
    ],
    "financialImpact": [
      "Coletar, armazenar e consultar representações como logs, métricas e capturas tem custo de armazenamento e processamento.",
      "Em cloud, tráfego, flow logs, observabilidade e retenção de eventos podem gerar cobrança recorrente.",
      "Diagnósticos ruins custam tempo de equipe e podem levar à compra desnecessária de ferramentas ou appliances."
    ],
    "securityImpact": [
      "Ajuda a evitar exposição de dados por confundir codificação com proteção.",
      "Melhora análise defensiva de payloads, logs, alertas e artefatos.",
      "Reduz falso positivo e falso negativo ao exigir interpretação contextual dos bytes observados."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que computadores entendem texto diretamente.",
      "whyItHappens": "Interfaces gráficas escondem a conversão entre caracteres, bytes e bits.",
      "consequence": "O aluno tem dificuldade com encoding, payloads, logs e análise de tráfego.",
      "correction": "Texto é uma interpretação de bytes segundo uma codificação, como UTF-8."
    },
    {
      "mistake": "Confundir dado com sinal físico.",
      "whyItHappens": "No uso cotidiano, dizemos que enviamos um arquivo pela rede, mas não vemos a transformação em sinais.",
      "consequence": "O diagnóstico mistura problema de aplicação com problema de camada física.",
      "correction": "Dado é a informação representada; sinal é a forma física usada para transportar bits."
    },
    {
      "mistake": "Concluir que todo payload ilegível é criptografia ou ataque.",
      "whyItHappens": "Ferramentas exibem bytes que podem não ser texto humano legível.",
      "consequence": "Gera falsos positivos e investigações mal direcionadas.",
      "correction": "Verificar protocolo, formato, compressão, serialização, encoding e contexto antes de concluir."
    },
    {
      "mistake": "Pular binário e hexadecimal por parecerem teoria demais.",
      "whyItHappens": "O aluno quer chegar logo em IP, firewall e cloud.",
      "consequence": "Subnetting, MAC, IPv6, flags e dumps ficam parecendo decoreba.",
      "correction": "Tratar bases numéricas como ferramenta prática de leitura de redes."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Caracteres especiais aparecem quebrados em logs ou aplicação.",
      "Ferramenta de captura mostra payload aparentemente ilegível.",
      "Arquivo chega corrompido, incompleto ou com tamanho inesperado.",
      "Métricas de bytes transferidos não batem com o tamanho percebido pelo usuário.",
      "Time confunde falha de aplicação com falha de rede física."
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
        "expectedObservation": "Sequência hexadecimal dos caracteres enviados ao comando.",
        "interpretation": "A palavra é convertida para bytes segundo a codificação do ambiente."
      },
      {
        "platform": "Linux",
        "command": "printf 'rede' | base64",
        "purpose": "Demonstrar uma codificação textual comum usada em APIs, tokens e integrações.",
        "expectedObservation": "Texto Base64 correspondente à entrada.",
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
        "if": "Logs não permitem investigação",
        "then": "Revisar modelo de eventos, campos obrigatórios, encoding, retenção e normalização."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Diferenciar claramente codificação, compressão, criptografia e hashing.",
      "Registrar logs com campos estruturados, encoding consistente e dados suficientes para auditoria.",
      "Validar entradas de usuário antes de interpretar dados em parsers, APIs e integrações.",
      "Tratar dados sensíveis como sensíveis mesmo quando estiverem codificados em Base64 ou hexadecimal.",
      "Coletar evidências técnicas preservando contexto: horário, origem, destino, protocolo, ferramenta e formato."
    ],
    "badPractices": [
      "Armazenar segredo em Base64 achando que está criptografado.",
      "Copiar bytes ou payloads de produção sem avaliar exposição de dados sensíveis.",
      "Classificar tráfego como malicioso apenas porque não é legível como texto.",
      "Ignorar erros de encoding em logs de autenticação, auditoria ou transações críticas.",
      "Executar testes de payload em sistemas reais sem autorização."
    ],
    "commonErrors": [
      "Confundir representação com significado.",
      "Confundir codificação reversível com proteção criptográfica.",
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
      "Monitorar aumento incomum de bytes transferidos por host, usuário ou aplicação.",
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
      "Alertar quando logs contiverem padrões de chaves, tokens ou credenciais codificadas.",
      "Criar consultas para volume anormal de bytes enviados para destinos externos.",
      "Investigar erros repetidos de encoding ou parser em endpoints expostos.",
      "Comparar tamanho esperado e tamanho real de artefatos transferidos."
    ]
  },
  "lab": {
    "id": "lab-0.1",
    "title": "Da palavra ao byte: observando representação digital antes da rede",
    "labType": "security",
    "objective": "Demonstrar que uma informação simples, como uma palavra, precisa ser representada como bytes antes de ser armazenada, transmitida ou analisada por ferramentas de rede e segurança.",
    "scenario": "Você é um analista iniciante investigando por que payloads e logs aparecem como texto, hexadecimal ou Base64. Antes de analisar pacotes reais, irá observar localmente como uma palavra vira bytes e como a mesma informação pode ser exibida em representações diferentes.",
    "topology": "Aluno -> terminal local -> arquivo de texto -> visualização hexadecimal/Base64 -> interpretação humana",
    "architecture": "Laboratório local sem tráfego externo obrigatório. O foco é a cadeia: entrada humana, codificação textual, bytes, representação hexadecimal, codificação Base64 e interpretação.",
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
      "Não envie dados sensíveis para ferramentas online de conversão.",
      "O objetivo é defensivo e educacional: compreender representação e evitar interpretações incorretas."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Criar uma informação humana simples",
        "instruction": "Crie um arquivo de texto contendo apenas a palavra rede. Essa palavra será nossa informação de origem.",
        "command": "Windows PowerShell: Set-Content -Path .\\m00-aula01.txt -Value 'rede' -NoNewline\nLinux: printf 'rede' > m00-aula01.txt",
        "expectedOutput": "Um arquivo chamado m00-aula01.txt com quatro caracteres visíveis: rede.",
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
        "expectedOutput": "Uma visualização hexadecimal dos bytes que representam a palavra rede.",
        "explanation": "A palavra não desapareceu; apenas está sendo exibida em outra representação. Hexadecimal é comum em redes porque compacta a visualização de bytes."
      },
      {
        "number": 4,
        "title": "Codificar a mesma informação em Base64",
        "instruction": "Gere uma representação Base64 do arquivo para observar uma codificação textual reversível.",
        "command": "Windows PowerShell: [Convert]::ToBase64String([System.IO.File]::ReadAllBytes('.\\m00-aula01.txt'))\nLinux: base64 m00-aula01.txt",
        "expectedOutput": "Uma string Base64 representando os mesmos bytes do arquivo.",
        "explanation": "Base64 não criptografa. Ela apenas representa bytes usando caracteres seguros para transporte textual em certos contextos."
      },
      {
        "number": 5,
        "title": "Comparar significado e representação",
        "instruction": "Anote três formas observadas: texto normal, hexadecimal e Base64. Explique por que elas podem representar a mesma informação.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma comparação escrita entre texto, hexadecimal e Base64.",
        "explanation": "A mesma informação pode aparecer de formas diferentes dependendo da ferramenta e da camada de interpretação."
      },
      {
        "number": 6,
        "title": "Relacionar com análise de tráfego",
        "instruction": "Imagine que esses bytes aparecessem em uma captura de rede. Descreva o que uma ferramenta como Wireshark estaria fazendo ao mostrar campos interpretados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma explicação conectando bytes capturados, protocolos e interpretação humana.",
        "explanation": "Ferramentas de rede organizam bytes segundo protocolos conhecidos. Quando não reconhecem o formato, mostram bytes brutos ou interpretações limitadas."
      },
      {
        "number": 7,
        "title": "Registrar evidências",
        "instruction": "Cole no seu material de estudo a saída textual, a visualização hexadecimal e a representação Base64, junto com uma conclusão de cinco linhas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Registro com três representações e uma conclusão.",
        "explanation": "Criar evidência é um hábito profissional de troubleshooting, auditoria e segurança."
      }
    ],
    "expectedResult": "O aluno deve conseguir demonstrar que a palavra rede pode ser vista como texto, bytes em hexadecimal e Base64, compreendendo que a ferramenta muda a representação exibida, não necessariamente a informação original.",
    "validation": [
      {
        "check": "Arquivo foi criado corretamente",
        "command": "Windows PowerShell: Get-Content .\\m00-aula01.txt\nLinux: cat m00-aula01.txt",
        "expected": "A saída deve mostrar rede.",
        "ifFails": "Verifique o diretório atual, o nome do arquivo e se o comando de criação foi executado."
      },
      {
        "check": "Bytes foram visualizados",
        "command": "Windows PowerShell: Format-Hex -Path .\\m00-aula01.txt\nLinux: xxd -g 1 m00-aula01.txt || hexdump -C m00-aula01.txt",
        "expected": "Deve aparecer uma sequência hexadecimal correspondente aos caracteres.",
        "ifFails": "No Linux, instale ou use hexdump se xxd não estiver disponível. No Windows, confirme que está usando PowerShell."
      },
      {
        "check": "Base64 foi gerado",
        "command": "Windows PowerShell: [Convert]::ToBase64String([System.IO.File]::ReadAllBytes('.\\m00-aula01.txt'))\nLinux: base64 m00-aula01.txt",
        "expected": "Deve aparecer uma string textual codificada.",
        "ifFails": "Confirme o caminho do arquivo e se o comando foi copiado sem alterações indevidas."
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
        "symptom": "A saída hexadecimal mostra bytes extras no final.",
        "probableCause": "O arquivo foi criado com quebra de linha automática.",
        "howToConfirm": "Comparar criação com e sem -NoNewline no Windows ou printf no Linux.",
        "fix": "Recriar o arquivo sem quebra de linha se quiser observar apenas os bytes da palavra."
      },
      {
        "symptom": "A string Base64 muda entre sistemas.",
        "probableCause": "Diferença de quebra de linha ou codificação do arquivo.",
        "howToConfirm": "Verificar bytes em hexadecimal e tamanho do arquivo.",
        "fix": "Padronizar a criação do arquivo sem newline e com texto simples."
      },
      {
        "symptom": "O aluno acha que Base64 protegeu o conteúdo.",
        "probableCause": "Confusão entre codificação e criptografia.",
        "howToConfirm": "Decodificar o Base64 e recuperar o texto original.",
        "fix": "Reforçar que Base64 é reversível sem segredo."
      }
    ],
    "improvements": [
      "Repetir o laboratório com uma palavra acentuada, como ação, e observar diferenças de codificação.",
      "Repetir com um pequeno arquivo binário e comparar com texto puro.",
      "Capturar uma requisição HTTP em laboratório futuro e procurar payload textual e campos de protocolo.",
      "Registrar as saídas em um caderno de evidências do curso."
    ],
    "evidenceToCollect": [
      "Conteúdo textual do arquivo.",
      "Saída hexadecimal.",
      "Saída Base64.",
      "Conclusão explicando a diferença entre informação, bytes e representação.",
      "Lista de dúvidas para revisar na aula 0.2."
    ],
    "questions": [
      "A palavra rede é a mesma coisa que os bytes que a representam?",
      "Por que a visualização hexadecimal é útil para redes?",
      "Base64 protege o conteúdo contra leitura?",
      "Por que uma quebra de linha altera os bytes do arquivo?",
      "Como isso se relaciona com payloads em uma captura de rede?"
    ],
    "challenge": "Crie um exemplo próprio com uma palavra acentuada, observe a saída hexadecimal e explique por que ela pode usar mais bytes do que a quantidade de letras visíveis.",
    "solution": "Caracteres acentuados podem ser representados por mais de um byte em codificações como UTF-8. A quantidade de letras percebidas por humanos não necessariamente corresponde à quantidade de bytes armazenados ou transmitidos."
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
      "id": "q0.1.1",
      "type": "conceito",
      "q": "Qual é a menor unidade de informação digital usada como base para representação em computadores?",
      "opts": [
        "Byte",
        "Bit",
        "Pacote",
        "Arquivo"
      ],
      "a": 1,
      "exp": "O bit é a menor unidade de informação digital e pode assumir dois estados possíveis, normalmente representados como 0 e 1.",
      "difficulty": "iniciante",
      "topic": "bits"
    },
    {
      "id": "q0.1.2",
      "type": "comparação",
      "q": "Qual alternativa diferencia corretamente dado e sinal físico?",
      "opts": [
        "Dado é a informação representada; sinal físico é o fenômeno usado para transportar bits.",
        "Dado e sinal físico são sinônimos em redes.",
        "Sinal físico só existe em Wi-Fi, nunca em cabo.",
        "Dado é sempre criptografado; sinal físico é sempre texto."
      ],
      "a": 0,
      "exp": "Dados são representações interpretáveis. Sinais físicos são variações de tensão, luz ou rádio usadas para transportar bits.",
      "difficulty": "iniciante",
      "topic": "representação"
    },
    {
      "id": "q0.1.3",
      "type": "segurança",
      "q": "Por que Base64 não deve ser tratado como mecanismo de proteção de segredo?",
      "opts": [
        "Porque Base64 só funciona em Linux.",
        "Porque Base64 é uma codificação reversível, não criptografia.",
        "Porque Base64 remove todos os bytes do arquivo.",
        "Porque Base64 impede logs de serem coletados."
      ],
      "a": 1,
      "exp": "Base64 representa bytes usando caracteres textuais. Qualquer pessoa que tenha a string pode decodificá-la sem uma chave secreta.",
      "difficulty": "iniciante",
      "topic": "codificação vs criptografia"
    },
    {
      "id": "q0.1.4",
      "type": "diagnóstico",
      "q": "Uma captura mostra payload ilegível. Qual é a conclusão correta?",
      "opts": [
        "É definitivamente um ataque.",
        "É definitivamente erro de cabo.",
        "Pode ser binário, compressão, criptografia, codificação ou outro formato; é preciso contexto.",
        "Não pode ser tráfego legítimo."
      ],
      "a": 2,
      "exp": "Bytes ilegíveis não bastam para concluir ataque. A interpretação depende de protocolo, formato, aplicação, codificação e contexto.",
      "difficulty": "iniciante",
      "topic": "análise de payload"
    },
    {
      "id": "q0.1.5",
      "type": "arquitetura",
      "q": "Em uma comunicação de rede, onde o significado humano é reconstruído?",
      "opts": [
        "Apenas no cabo de rede.",
        "Apenas no roteador.",
        "Nas camadas de interpretação, especialmente protocolos, sistema operacional e aplicação.",
        "No endereço IP de origem."
      ],
      "a": 2,
      "exp": "O meio físico transporta sinais. O significado é reconstruído quando hardware e software interpretam bits e bytes segundo padrões e protocolos.",
      "difficulty": "iniciante",
      "topic": "camadas"
    },
    {
      "id": "q0.1.6",
      "type": "cloud",
      "q": "Por que um flow log de cloud não é equivalente a uma captura completa de pacote?",
      "opts": [
        "Porque flow logs não existem em cloud.",
        "Porque flow logs são resumos de metadados, não necessariamente o pacote completo com payload.",
        "Porque flow logs sempre descriptografam TLS.",
        "Porque flow logs só mostram imagens."
      ],
      "a": 1,
      "exp": "Flow logs representam metadados como origem, destino, portas, protocolo, ação, bytes e pacotes. Eles não substituem uma captura completa quando detalhes de payload são necessários.",
      "difficulty": "iniciante",
      "topic": "cloud networking"
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
      "id": "fc0.1.3",
      "front": "Dado vs sinal físico",
      "back": "Dado é a informação representada. Sinal físico é a forma usada para transportar bits, como tensão, luz ou rádio.",
      "tags": [
        "sinais",
        "representação"
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
      "id": "fc0.1.5",
      "front": "Base64 é criptografia?",
      "back": "Não. Base64 é uma codificação reversível para representar bytes usando texto. Não fornece confidencialidade.",
      "tags": [
        "base64",
        "segurança"
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
      "prompt": "Um colega afirma que um payload em Base64 está seguro porque não é legível. Corrija a afirmação de forma técnica e educada.",
      "expectedAnswer": "Base64 não é segurança, é codificação reversível. O conteúdo pode ser recuperado sem chave. Se houver dado sensível, deve ser protegido com criptografia, controle de acesso e gestão de segredos.",
      "explanation": "O objetivo é combater uma confusão muito comum entre codificação e criptografia."
    },
    {
      "id": "ex0.1.4",
      "type": "arquitetura",
      "prompt": "Desenhe ou descreva um fluxo de cinco etapas mostrando como uma mensagem de chat sai do usuário e chega ao servidor.",
      "expectedAnswer": "Intenção humana -> dado de aplicação -> bytes/codificação -> encapsulamento em protocolos de rede -> sinais físicos -> reconstrução e interpretação no destino.",
      "explanation": "A resposta precisa mostrar cadeia de representação, não apenas dizer que a mensagem foi enviada."
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
      "Não confundir Base64 com criptografia.",
      "Manter foco defensivo e educacional."
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
