export const lesson0002 = {
  "id": "0.2",
  "moduleId": "m00",
  "order": 2,
  "title": "Bits, bytes, binário e hexadecimal",
  "subtitle": "A linguagem numérica que aparece por trás de IPv4, máscaras, MAC, IPv6, dumps, logs e análise de pacotes.",
  "duration": "65-90 min",
  "estimatedStudyTimeMinutes": 90,
  "difficulty": "iniciante",
  "type": "fundamental",
  "xp": 160,
  "tags": [
    "fundamentos",
    "bits",
    "bytes",
    "binário",
    "hexadecimal",
    "ipv4",
    "mac",
    "subnetting",
    "wireshark",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.1",
      "reason": "A aula 0.1 explica que computadores representam informação usando estados físicos interpretados como bits. Esta aula aprofunda como esses bits são agrupados, escritos e lidos em bases numéricas."
    }
  ],
  "objectives": [
    "Diferenciar bit, byte, nibble, octeto e palavra numérica em contexto de redes.",
    "Converter valores simples entre decimal, binário e hexadecimal sem depender apenas de calculadoras.",
    "Explicar por que hexadecimal é tão comum em MAC, IPv6, EtherType, dumps, hashes, certificados e payloads.",
    "Ler um octeto IPv4 em binário e entender por que zeros à esquerda importam.",
    "Preparar a base para subnetting, máscaras, flags de protocolo, análise de tráfego e troubleshooting."
  ],
  "learningOutcomes": [
    "Dado um octeto decimal entre 0 e 255, o aluno consegue explicar sua representação binária em 8 bits.",
    "Dado um par hexadecimal como FF, C0 ou A8, o aluno consegue relacioná-lo com decimal e binário.",
    "Dado um endereço MAC, o aluno reconhece que cada par hexadecimal representa 1 byte.",
    "Dado um IPv4 como 192.168.10.50, o aluno consegue enxergar cada octeto como um grupo de 8 bits.",
    "Dado um dump hexadecimal ou log técnico, o aluno evita confundir representação hexadecimal, codificação, criptografia e hash."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>\n    Em algum momento do trabalho com redes, segurança ou infraestrutura, você vai encontrar números que parecem pouco amigáveis: <code>192.168.10.50</code>, <code>255.255.255.0</code>, <code>AA:BB:CC:DD:EE:FF</code>, <code>0x0800</code>, <code>fe80::1</code>, <code>FF</code>, <code>C0 A8 0A 32</code>. Eles aparecem em configurações de rede, dumps do Wireshark, logs de firewall, saídas de roteadores, certificados, hashes, endereços IPv6, endereços MAC, máscaras de rede e payloads.\n  </p>\n  <p>\n    Sem entender bits, bytes, binário e hexadecimal, muitos assuntos viram decoreba. Subnetting vira uma sequência de fórmulas sem sentido. IPv4 parece apenas quatro números separados por pontos. MAC parece uma placa de carro estranha. Wireshark parece uma parede de códigos. E segurança fica perigosa, porque o analista pode confundir dado codificado com dado criptografado, ou interpretar errado um campo de protocolo.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> um analista vê o valor <code>FF</code> em uma captura e não sabe se aquilo significa 15, 255, erro, criptografia, broadcast ou apenas uma forma compacta de escrever 8 bits. Essa confusão é comum porque sistemas diferentes usam bases numéricas diferentes para representar o mesmo valor.\n  </div>\n  <p>\n    Esta aula existe para construir a base matemática mínima, mas sem transformar isso em aula abstrata de matemática. Aqui, cada conceito será conectado a redes: octetos IPv4, endereços MAC, máscaras, flags, dumps, logs, cloud, automação e segurança defensiva.\n  </p>\n</section>",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>\n    Humanos usam predominantemente o sistema decimal porque temos dez dedos e nossa cultura consolidou a contagem em base 10. Computadores, porém, não foram projetados para contar como humanos. Como vimos na aula anterior, circuitos digitais lidam muito bem com dois estados distinguíveis: ligado/desligado, alto/baixo, verdadeiro/falso, 1/0. Por isso, a base 2, chamada binária, se tornou natural para representar informação em sistemas digitais.\n  </p>\n  <p>\n    O problema é que binário puro fica longo demais para humanos. O decimal 255, por exemplo, é escrito em binário como <code>11111111</code>. Um endereço MAC de 48 bits escrito em binário seria muito difícil de ler, copiar, comparar e depurar. Para resolver isso, sistemas técnicos passaram a usar notações mais compactas. O hexadecimal, base 16, tornou-se muito popular porque cada dígito hexadecimal representa exatamente 4 bits. Dois dígitos hexadecimais representam exatamente 8 bits, ou seja, 1 byte.\n  </p>\n  <p>\n    Redes herdaram essas escolhas. IPv4 usa quatro octetos, cada um com 8 bits. MAC costuma ser exibido como seis pares hexadecimais. IPv6 usa grupos hexadecimais. Ferramentas de análise de tráfego mostram bytes em hexadecimal porque é uma forma compacta de visualizar dados binários. Assim, decimal, binário e hexadecimal não são concorrentes: são formas diferentes de escrever valores que a máquina manipula como bits.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr>\n        <th>Base</th>\n        <th>Símbolos</th>\n        <th>Uso humano/técnico</th>\n        <th>Onde aparece em redes</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Decimal</td>\n        <td>0 a 9</td>\n        <td>Mais familiar para humanos</td>\n        <td>IPv4, portas, métricas, TTL exibido em decimal</td>\n      </tr>\n      <tr>\n        <td>Binário</td>\n        <td>0 e 1</td>\n        <td>Representa diretamente bits</td>\n        <td>Máscaras, flags, campos de protocolo, cálculo de sub-redes</td>\n      </tr>\n      <tr>\n        <td>Hexadecimal</td>\n        <td>0 a 9 e A a F</td>\n        <td>Compacta grupos de 4 bits</td>\n        <td>MAC, IPv6, EtherType, dumps, hashes, certificados</td>\n      </tr>\n    </tbody>\n  </table>\n</section>",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>\n    O problema técnico é simples: computadores operam com bits, mas humanos precisam configurar, documentar, monitorar e diagnosticar sistemas. Se tudo fosse exibido em binário puro, a operação seria lenta e propensa a erro. Se tudo fosse exibido apenas em decimal, perderíamos a relação direta com grupos de bits, bytes e campos de protocolo.\n  </p>\n  <p>\n    Em redes, muitos campos têm tamanho fixo. Um octeto IPv4 tem 8 bits. Uma porta TCP ou UDP tem 16 bits. Um endereço MAC tem 48 bits. Um endereço IPv6 tem 128 bits. Flags de protocolos podem ocupar bits individuais. Máscaras de rede são padrões de bits. Quando você entende o tamanho desses campos, começa a enxergar por que certos limites existem: por que um octeto IPv4 vai de 0 a 255, por que portas vão de 0 a 65535, por que MAC tem 6 bytes e por que IPv6 é muito maior que IPv4.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem binário:</strong> subnetting vira decoreba, porque a máscara é essencialmente uma sequência de bits.</li>\n    <li><strong>Sem byte:</strong> fica difícil entender payload, tamanho de pacote, MTU, throughput e armazenamento de logs.</li>\n    <li><strong>Sem hexadecimal:</strong> dumps, MAC, IPv6, EtherType e muitos identificadores ficam difíceis de ler.</li>\n    <li><strong>Sem zeros à esquerda:</strong> octetos e campos fixos ficam ambíguos, principalmente em IPv4, máscaras e binários.</li>\n    <li><strong>Sem contexto:</strong> o aluno pode confundir hexadecimal com criptografia, Base64 com segurança ou hash com encoding.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Confusão comum:</strong> hexadecimal não é criptografia. Binário não é necessariamente baixo nível ofensivo. Base numérica é apenas uma forma de escrever valores. Segurança depende de propriedades como confidencialidade, integridade, autenticação e autorização, não da base usada para exibir o dado.\n  </div>\n</section>",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>\n    O caminho prático foi uma evolução de conveniência e precisão. Primeiro, a máquina precisa de bits. Depois, para manipular grupos de bits com eficiência, surgem agrupamentos como nibble, byte, word e registradores. Para humanos, aparecem notações que equilibram legibilidade e fidelidade técnica. O decimal é amigável, o binário mostra a estrutura real de bits, e o hexadecimal cria uma ponte compacta entre os dois mundos.\n  </p>\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr>\n        <th>Representação</th>\n        <th>Vantagem</th>\n        <th>Limitação</th>\n        <th>Uso ideal</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Binário puro</td>\n        <td>Mostra exatamente os bits</td>\n        <td>Longo e difícil de ler em campos grandes</td>\n        <td>Máscaras, flags e estudo de funcionamento interno</td>\n      </tr>\n      <tr>\n        <td>Decimal</td>\n        <td>Familiar para humanos</td>\n        <td>Esconde a estrutura de bits</td>\n        <td>IPv4, portas, métricas e valores de configuração</td>\n      </tr>\n      <tr>\n        <td>Hexadecimal</td>\n        <td>Compacto e alinhado a grupos de 4 bits</td>\n        <td>Exige conhecer A a F</td>\n        <td>MAC, IPv6, dumps, campos binários e identificadores</td>\n      </tr>\n    </tbody>\n  </table>\n  <p>\n    Essa evolução explica por que ferramentas modernas alternam entre bases. Uma interface gráfica pode mostrar uma porta como decimal, um MAC como hexadecimal e uma máscara como decimal pontuado, enquanto internamente todos são bits. A maturidade técnica consiste em reconhecer que a representação muda, mas o valor lógico continua sendo interpretado conforme o contexto do protocolo.\n  </p>\n</section>",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>\n    Um <strong>bit</strong> é a menor unidade de informação em sistemas digitais, representando dois estados possíveis: 0 ou 1. Um <strong>byte</strong> é um grupo de 8 bits. Um <strong>nibble</strong> é um grupo de 4 bits. Um <strong>octeto</strong> é um grupo de 8 bits; em redes, o termo é usado com frequência porque reforça o tamanho exato de 8 bits, independentemente de detalhes históricos de arquiteturas de computador.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição essencial:</strong> binário é uma forma de escrever números usando base 2; decimal usa base 10; hexadecimal usa base 16. Em hexadecimal, os valores 10 a 15 são representados pelas letras A, B, C, D, E e F.\n  </div>\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Unidade</th>\n        <th>Tamanho</th>\n        <th>Quantidade de valores</th>\n        <th>Exemplo em redes</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Bit</td>\n        <td>1 bit</td>\n        <td>2 valores: 0 ou 1</td>\n        <td>Uma flag TCP ligada ou desligada</td>\n      </tr>\n      <tr>\n        <td>Nibble</td>\n        <td>4 bits</td>\n        <td>16 valores: 0 a 15</td>\n        <td>Um dígito hexadecimal</td>\n      </tr>\n      <tr>\n        <td>Byte / octeto</td>\n        <td>8 bits</td>\n        <td>256 valores: 0 a 255</td>\n        <td>Um octeto IPv4, como 192</td>\n      </tr>\n      <tr>\n        <td>2 bytes</td>\n        <td>16 bits</td>\n        <td>65536 valores: 0 a 65535</td>\n        <td>Uma porta TCP/UDP</td>\n      </tr>\n    </tbody>\n  </table>\n  <p>\n    A regra mais importante desta aula é: <strong>1 dígito hexadecimal representa 4 bits; 2 dígitos hexadecimais representam 8 bits; 2 dígitos hexadecimais representam 1 byte</strong>. Por isso, <code>FF</code> representa um byte com todos os bits ligados: <code>11111111</code>, que em decimal vale 255.\n  </p>\n</section>",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>\n    Para entender conversões, pense em posição e peso. No decimal, cada posição vale uma potência de 10. No binário, cada posição vale uma potência de 2. No hexadecimal, cada posição vale uma potência de 16. O número não é mágico: ele é a soma dos símbolos multiplicados pelo peso de suas posições.\n  </p>\n  <h3>Como ler um byte em binário</h3>\n  <p>\n    Um octeto possui 8 posições. Da esquerda para a direita, os pesos são: 128, 64, 32, 16, 8, 4, 2 e 1. Quando um bit está em 1, aquele peso entra na soma. Quando está em 0, não entra.\n  </p>\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Bit</th>\n        <th>7</th>\n        <th>6</th>\n        <th>5</th>\n        <th>4</th>\n        <th>3</th>\n        <th>2</th>\n        <th>1</th>\n        <th>0</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Peso</td>\n        <td>128</td>\n        <td>64</td>\n        <td>32</td>\n        <td>16</td>\n        <td>8</td>\n        <td>4</td>\n        <td>2</td>\n        <td>1</td>\n      </tr>\n      <tr>\n        <td>192</td>\n        <td>1</td>\n        <td>1</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n      </tr>\n    </tbody>\n  </table>\n  <p>\n    No exemplo acima, <code>11000000</code> vale 128 + 64 = 192. O valor <code>168</code> é <code>10101000</code>, porque 128 + 32 + 8 = 168. O valor <code>10</code> é <code>00001010</code>, porque 8 + 2 = 10. Os zeros à esquerda importam porque um octeto IPv4 tem tamanho fixo de 8 bits.\n  </p>\n  <h3>Como hexadecimal compacta binário</h3>\n  <p>\n    Hexadecimal trabalha em grupos de 4 bits. O binário <code>1100</code> vale 12, que em hexadecimal é <code>C</code>. O binário <code>0000</code> vale 0. Portanto <code>11000000</code> vira <code>C0</code>. O binário <code>10101000</code> vira <code>A8</code>. Assim, o IPv4 <code>192.168.10.50</code> pode ser visualizado em bytes como <code>C0 A8 0A 32</code>.\n  </p>\n  <ol class=\"flow-list\">\n    <li>Separe o octeto em dois grupos de 4 bits.</li>\n    <li>Converta cada grupo para decimal entre 0 e 15.</li>\n    <li>Troque 10, 11, 12, 13, 14 e 15 por A, B, C, D, E e F.</li>\n    <li>Junte os dois dígitos hexadecimais.</li>\n  </ol>\n</section>",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>\n    Bits, bytes e bases numéricas aparecem em praticamente todas as camadas de uma arquitetura de redes. Na camada física, bits são transportados como sinais. Na camada de enlace, endereços MAC são exibidos em hexadecimal. Na camada de rede, IPv4 é exibido em decimal pontuado, IPv6 em hexadecimal e máscaras dependem de padrões binários. Na camada de transporte, portas são números de 16 bits. Na aplicação, payloads podem ser texto, JSON, binário, Base64, compactados ou criptografados.\n  </p>\n  <ul>\n    <li><strong>Camada física:</strong> bits são transportados como sinais elétricos, ópticos ou de rádio.</li>\n    <li><strong>Camada de enlace:</strong> MAC de 48 bits costuma ser exibido como seis bytes em hexadecimal.</li>\n    <li><strong>Camada de rede:</strong> IPv4 tem 32 bits; IPv6 tem 128 bits.</li>\n    <li><strong>Camada de transporte:</strong> portas TCP/UDP têm 16 bits.</li>\n    <li><strong>Camada de aplicação:</strong> payloads são sequências de bytes interpretadas por protocolos e programas.</li>\n  </ul>\n  <div class=\"callout callout--security\">\n    <strong>Ponto de segurança:</strong> uma ferramenta de segurança quase sempre mostra uma interpretação dos bytes. O analista precisa distinguir valor bruto, representação visual, codificação, compressão, serialização e criptografia antes de tirar conclusões.\n  </div>\n</section>",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>\n    Imagine que você precisa representar a mesma quantidade de dinheiro de formas diferentes. Você pode dizer \"cento e noventa e dois reais\", escrever <code>192</code>, decompor em notas de 100, 50, 20, 20 e 2, ou registrar em um sistema contábil com outro formato. A quantidade é a mesma, mas a representação muda conforme o contexto.\n  </p>\n  <p>\n    Bits, decimal e hexadecimal funcionam de forma parecida. O valor pode ser o mesmo, mas a forma de escrita muda. <code>192</code> em decimal, <code>11000000</code> em binário e <code>C0</code> em hexadecimal representam o mesmo valor. A diferença está na finalidade: decimal é legível para humanos, binário revela a estrutura de bits, hexadecimal compacta a escrita sem perder alinhamento com bytes.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> dinheiro é interpretado socialmente, enquanto bits dependem de regras técnicas rígidas. Um mesmo byte pode representar número, caractere, parte de um pacote, cor de imagem ou instrução, dependendo do protocolo e do contexto.\n  </div>\n</section>",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>\n    Pegue o endereço IPv4 <code>192.168.10.50</code>. Para humanos, ele parece quatro números decimais. Para a rede, ele é um endereço de 32 bits dividido em quatro octetos:\n  </p>\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Decimal</th>\n        <th>Binário</th>\n        <th>Hexadecimal</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><td>192</td><td>11000000</td><td>C0</td></tr>\n      <tr><td>168</td><td>10101000</td><td>A8</td></tr>\n      <tr><td>10</td><td>00001010</td><td>0A</td></tr>\n      <tr><td>50</td><td>00110010</td><td>32</td></tr>\n    </tbody>\n  </table>\n  <p>\n    Então, <code>192.168.10.50</code> pode ser visto como <code>11000000.10101000.00001010.00110010</code> em binário ou <code>C0 A8 0A 32</code> em hexadecimal. Quando o Wireshark mostra bytes em hexadecimal, ele não está inventando outra informação; ele está mostrando a mesma informação em uma escrita mais compacta.\n  </p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, o time de redes pode receber uma tarefa aparentemente simples: criar uma nova VLAN para estações administrativas usando a rede <code>10.20.30.0/24</code>. O sufixo <code>/24</code> significa que os 24 primeiros bits identificam a rede. A máscara correspondente é <code>255.255.255.0</code>, que em binário é <code>11111111.11111111.11111111.00000000</code>. Sem enxergar os bits, o aluno pode até decorar que /24 é 255.255.255.0, mas terá dificuldade quando chegar em /25, /26, /27 ou VLSM.\n  </p>\n  <p>\n    O mesmo acontece em segurança. Um analista de firewall pode ver um MAC como <code>00:1A:2B:3C:4D:5E</code>. Cada par é um byte em hexadecimal. Um engenheiro de redes pode verificar EtherType <code>0x0800</code> para IPv4 ou <code>0x86DD</code> para IPv6. Um analista de SOC pode ver bytes suspeitos em payload. Em todos os casos, bases numéricas deixam de ser teoria e viram ferramenta de interpretação operacional.\n  </p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>\n    Em cloud, você raramente vê os bits diretamente, mas eles continuam governando o desenho da rede. Ao criar uma VPC ou VNet, você escolhe blocos CIDR como <code>10.0.0.0/16</code>, <code>10.0.1.0/24</code> ou <code>172.16.32.0/20</code>. Esses prefixos são contagens de bits de rede. Uma escolha errada de bloco pode impedir peering, integração com datacenter, expansão futura ou comunicação entre ambientes.\n  </p>\n  <p>\n    Custos também entram na conversa. Blocos mal planejados podem forçar redes adicionais, NAT Gateways, firewalls gerenciados, rotas complexas, appliances ou migrações caras. A matemática de bits parece pequena, mas decisões de endereçamento em cloud têm impacto financeiro e operacional real.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Exemplo realista:</strong> uma empresa cria várias VNets usando faixas sobrepostas porque ninguém validou os blocos CIDR. Meses depois, a integração via VPN ou peering falha. A raiz do problema está em bits de endereçamento, não em firewall ou DNS.\n  </div>\n</section>",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>\n    Em DevSecOps, bits, bytes e hexadecimal aparecem em automação, IaC, pipelines e observabilidade. Um pipeline pode validar se blocos CIDR declarados em Terraform se sobrepõem. Um script pode converter valores para verificar máscaras. Uma política como código pode bloquear criação de sub-redes muito grandes, evitando exposição lateral excessiva. Um teste automatizado pode garantir que ambientes de desenvolvimento, homologação e produção não usem faixas conflitantes.\n  </p>\n  <p>\n    Também aparecem em análise de artefatos: hashes de imagens de container são exibidos em hexadecimal; fingerprints de certificados usam hexadecimal; tokens podem conter dados codificados; logs podem registrar payloads em bytes; ferramentas de SAST/DAST podem apontar manipulação insegura de encoding. O profissional não precisa virar matemático, mas precisa saber quando está olhando para número, byte, codificação, hash ou criptografia.\n  </p>\n</section>",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>\n    Segurança depende muito de interpretação correta. Um atacante pode esconder dados em formatos pouco familiares, mas isso não significa que hexadecimal seja malicioso. Um payload em hex pode ser apenas exibição de bytes. Um texto em Base64 pode ser apenas codificação. Um hash em hexadecimal pode ser uma impressão digital criptográfica. Uma sequência binária pode ser parte legítima de um arquivo. O erro do analista é concluir antes de entender o contexto.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead>\n      <tr>\n        <th>Risco</th>\n        <th>Como aparece</th>\n        <th>Impacto</th>\n        <th>Mitigação defensiva</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Confundir hex com criptografia</td>\n        <td>Dump mostra bytes como <code>4D 5A</code> ou <code>FF D8</code></td>\n        <td>Análise incorreta do artefato</td>\n        <td>Identificar formato, cabeçalho, contexto e ferramenta de origem</td>\n      </tr>\n      <tr>\n        <td>Ignorar zeros à esquerda</td>\n        <td><code>10</code> tratado como <code>1010</code> em vez de <code>00001010</code></td>\n        <td>Erro em máscara, subnetting e interpretação de campo fixo</td>\n        <td>Respeitar tamanho do campo: octeto, 16 bits, 32 bits ou 128 bits</td>\n      </tr>\n      <tr>\n        <td>Interpretar payload sem contexto</td>\n        <td>Bytes aleatórios em captura de tráfego</td>\n        <td>Falso positivo ou falso negativo</td>\n        <td>Correlacionar protocolo, porta, TLS, logs, endpoint e comportamento</td>\n      </tr>\n    </tbody>\n  </table>\n  <p>\n    O limite ético é claro: nesta aula, o objetivo é interpretação defensiva, troubleshooting e compreensão. Não há instrução para burlar controles, esconder tráfego ou explorar sistemas. O aprendizado serve para analisar evidências e reduzir erros técnicos.\n  </p>\n</section>",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra como o mesmo valor pode ser visto em decimal, binário e hexadecimal, e como isso aparece em um IPv4 real.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m00l02-title m00l02-desc\">\n    <title id=\"m00l02-title\">Conversão entre decimal, binário e hexadecimal</title>\n    <desc id=\"m00l02-desc\">O valor decimal 192 é representado como 11000000 em binário e C0 em hexadecimal. O IPv4 192.168.10.50 é dividido em quatro octetos.</desc>\n    <defs>\n      <marker id=\"m00l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"150\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Decimal</text>\n    <text x=\"150\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n\n    <line x1=\"260\" y1=\"80\" x2=\"370\" y2=\"80\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l02-arrow)\" />\n\n    <rect x=\"370\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"480\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Binário</text>\n    <text x=\"480\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">11000000</text>\n\n    <line x1=\"590\" y1=\"80\" x2=\"700\" y2=\"80\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l02-arrow)\" />\n\n    <rect x=\"700\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"810\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Hexadecimal</text>\n    <text x=\"810\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">C0</text>\n\n    <rect x=\"70\" y=\"185\" width=\"820\" height=\"170\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">IPv4 192.168.10.50 como quatro octetos</text>\n\n    <rect x=\"110\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"190\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n    <text x=\"190\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">C0</text>\n\n    <rect x=\"310\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"390\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">168</text>\n    <text x=\"390\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">A8</text>\n\n    <rect x=\"510\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"590\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10</text>\n    <text x=\"590\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">0A</text>\n\n    <rect x=\"710\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"790\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">50</text>\n    <text x=\"790\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">32</text>\n\n    <text x=\"480\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cada octeto tem 8 bits; cada par hexadecimal representa 1 byte.</text>\n  </svg>\n</section>",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>\n    O laboratório desta aula transforma um endereço IPv4 em decimal, binário e hexadecimal usando raciocínio manual e comandos locais. O objetivo não é decorar conversão, mas enxergar por que IPv4, MAC, máscaras e dumps usam essas representações.\n  </p>\n</section>",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>\n    Os exercícios forçam produção ativa: converter, explicar, comparar e diagnosticar erros. Não basta reconhecer a alternativa correta; você precisa demonstrar o raciocínio.\n  </p>\n</section>",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>\n    O desafio simula uma tarefa real: documentar uma pequena rede explicando o significado dos valores em decimal, binário e hexadecimal para alguém que trabalha com TI, mas ainda confunde bases numéricas.\n  </p>\n</section>",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>\n    A solução comentada mostra o raciocínio passo a passo. O foco é entender o tamanho dos campos e preservar zeros à esquerda quando o campo tem tamanho fixo.\n  </p>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> decimal, binário e hexadecimal são formas diferentes de representar valores.</li>\n    <li><strong>O que lembrar:</strong> 1 byte tem 8 bits; 1 dígito hexadecimal tem 4 bits; 2 dígitos hexadecimais formam 1 byte.</li>\n    <li><strong>Erro comum:</strong> remover zeros à esquerda em campos fixos, como octetos IPv4.</li>\n    <li><strong>Uso real:</strong> IPv4, MAC, IPv6, máscaras, portas, flags, dumps, hashes, certificados e logs.</li>\n    <li><strong>Segurança:</strong> representação não é proteção. Hexadecimal, Base64 e binário não significam automaticamente criptografia.</li>\n  </ul>\n</section>",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>\n    Na próxima aula, vamos estudar ASCII, Unicode, UTF-8 e Base64. Agora que você entende bits, bytes e formas de escrever números, o próximo passo é entender como textos, caracteres e dados de aplicação são codificados para virar bytes. Isso será essencial para HTTP, APIs, logs, tokens, autenticação, payloads e análise de segurança.\n  </p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
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
      "IPv4",
      "IPv6",
      "TCP",
      "UDP",
      "ICMP",
      "HTTP",
      "TLS"
    ],
    "dependsOn": [
      "Representação digital da informação",
      "Estados físicos interpretados como bits"
    ],
    "enables": [
      "Subnetting",
      "Máscaras IPv4",
      "Endereços MAC",
      "IPv6",
      "Flags TCP",
      "Análise de pacotes",
      "Codificações de aplicação"
    ]
  },
  "deepDive": {
    "mentalModel": "Pense em cada valor técnico como uma sequência de bits que pode ser exibida de formas diferentes. Decimal é amigável para humanos, binário revela estrutura, hexadecimal compacta bytes.",
    "keyTerms": [
      "bit",
      "byte",
      "nibble",
      "octeto",
      "base 2",
      "base 10",
      "base 16",
      "hexadecimal",
      "zeros à esquerda",
      "campo fixo"
    ],
    "limitations": [
      "Converter bases não substitui entendimento de protocolos.",
      "Hexadecimal não revela sozinho se um dado é texto, binário, hash, criptografia ou encoding.",
      "Calculadoras ajudam, mas sem entendimento o aluno erra prefixos, máscaras e campos fixos.",
      "Representações podem ser exibidas de forma diferente por ferramentas distintas."
    ],
    "whenToUse": [
      "Ao estudar IPv4, subnetting, máscaras e CIDR.",
      "Ao ler endereços MAC, IPv6 e dumps hexadecimais.",
      "Ao interpretar flags, cabeçalhos, payloads e campos de protocolo.",
      "Ao revisar logs técnicos, certificados, hashes e identificadores."
    ],
    "whenNotToUse": [
      "Não use conversão manual como substituta de validação por ferramenta em mudanças críticas.",
      "Não use hexadecimal como mecanismo de segurança ou ofuscação confiável.",
      "Não tire conclusão de segurança apenas pela aparência de bytes em uma captura."
    ],
    "operationalImpact": [
      "Melhora troubleshooting porque o profissional entende máscaras, tamanhos de campo e valores-limite.",
      "Reduz erros de documentação em endereçamento e análise de pacotes.",
      "Facilita comunicação entre redes, segurança, infraestrutura, cloud e desenvolvimento."
    ],
    "financialImpact": [
      "Evita redes cloud mal endereçadas que exigem retrabalho, novos gateways, appliances ou migrações.",
      "Reduz tempo de diagnóstico em incidentes, o que diminui custo operacional.",
      "Ajuda a dimensionar logs, tráfego e armazenamento com mais clareza sobre bits e bytes."
    ],
    "securityImpact": [
      "Ajuda a distinguir codificação, representação, hash e criptografia.",
      "Melhora análise defensiva de pacotes, payloads, certificados e identificadores.",
      "Reduz falsos positivos causados por interpretação incorreta de dumps ou logs."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Confundir bit com byte.",
      "whyItHappens": "Ambos aparecem em medições de rede, armazenamento e documentação, muitas vezes com abreviações parecidas.",
      "consequence": "Erro de cálculo de throughput, tamanho de arquivo, velocidade contratada e capacidade de tráfego.",
      "correction": "Lembrar que 1 byte tem 8 bits. Em geral, b minúsculo representa bit e B maiúsculo representa byte, embora ferramentas nem sempre sejam consistentes."
    },
    {
      "mistake": "Remover zeros à esquerda em octetos IPv4.",
      "whyItHappens": "Na matemática cotidiana, zeros à esquerda parecem desnecessários.",
      "consequence": "O aluno passa a comparar campos com tamanhos diferentes e erra subnetting, máscara e leitura de bytes.",
      "correction": "Em campos fixos, preserve o tamanho. Um octeto sempre deve ser lido como 8 bits."
    },
    {
      "mistake": "Achar que hexadecimal é criptografia.",
      "whyItHappens": "Hexadecimal parece técnico e pouco legível para humanos.",
      "consequence": "Falsas conclusões em segurança e análise de payload.",
      "correction": "Hexadecimal é apenas representação. Criptografia depende de algoritmo, chave e propriedades de segurança."
    },
    {
      "mistake": "Decorar /24 sem entender os bits da máscara.",
      "whyItHappens": "Muitos materiais ensinam subnetting como tabela pronta.",
      "consequence": "O aluno trava em /25, /26, /27, VLSM e troubleshoot de máscara incorreta.",
      "correction": "Relacionar prefixo CIDR com quantidade de bits de rede e host."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Aluno não entende por que um octeto IPv4 só vai até 255.",
      "Erro ao converter 10 para binário sem zeros à esquerda.",
      "Confusão ao ler MAC, IPv6 ou dump hexadecimal.",
      "Interpretação errada de velocidade em Mb/s versus MB/s.",
      "Falha ao entender por que /24 corresponde a 255.255.255.0."
    ],
    "diagnosticQuestions": [
      "Qual é o tamanho do campo: 4 bits, 8 bits, 16 bits, 32 bits ou 128 bits?",
      "A ferramenta está mostrando decimal, binário, hexadecimal ou texto interpretado?",
      "O valor precisa preservar zeros à esquerda?",
      "O dado é apenas representado em hex ou foi criptografado/codificado?",
      "Estou olhando para valor bruto ou interpretação feita por uma ferramenta?"
    ],
    "commands": [
      {
        "platform": "Windows PowerShell",
        "command": "[Convert]::ToString(192,2).PadLeft(8,'0'); [Convert]::ToString(192,16).ToUpper()",
        "purpose": "Converter o valor decimal 192 para binário de 8 bits e hexadecimal.",
        "expectedObservation": "11000000 e C0.",
        "interpretation": "Mostra que 192 decimal é o mesmo valor que 11000000 binário e C0 hexadecimal."
      },
      {
        "platform": "Linux",
        "command": "python3 - <<'PY'\nfor n in [192,168,10,50,255]:\n    print(n, format(n, '08b'), format(n, '02X'))\nPY",
        "purpose": "Converter octetos comuns de IPv4 para binário e hexadecimal.",
        "expectedObservation": "192 11000000 C0; 168 10101000 A8; 10 00001010 0A; 50 00110010 32; 255 11111111 FF.",
        "interpretation": "Demonstra a relação entre decimal, binário de 8 bits e pares hexadecimais."
      },
      {
        "platform": "Cisco IOS",
        "command": "show interfaces | include bia|address",
        "purpose": "Observar endereços MAC exibidos em formato hexadecimal em equipamentos Cisco.",
        "expectedObservation": "Endereços MAC em notação hexadecimal, dependendo da plataforma e versão.",
        "interpretation": "Cada par hexadecimal representa 1 byte do endereço MAC."
      }
    ],
    "decisionTree": [
      {
        "if": "O valor está entre 0 e 255 e aparece em IPv4",
        "then": "Trate como octeto de 8 bits e preserve zeros à esquerda em binário."
      },
      {
        "if": "O valor aparece como pares separados por dois-pontos em MAC",
        "then": "Leia cada par hexadecimal como 1 byte."
      },
      {
        "if": "O valor parece ilegível em payload",
        "then": "Identifique primeiro a representação e o protocolo antes de concluir que é criptografia ou ataque."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Registrar nos relatórios se um valor está em decimal, binário, hexadecimal ou outra codificação.",
      "Preservar zeros à esquerda ao documentar campos de tamanho fixo.",
      "Correlacionar dumps com protocolo, porta, direção, timestamp e host antes de classificar risco.",
      "Usar ferramentas confiáveis para validar conversões em mudanças críticas de rede.",
      "Explicar em documentação interna a diferença entre codificação, hash, compressão e criptografia."
    ],
    "badPractices": [
      "Tratar hexadecimal como se fosse criptografia.",
      "Fazer subnetting apenas por tabela decorada sem entender bits.",
      "Copiar blocos CIDR para cloud sem validar sobreposição.",
      "Ignorar unidade de medida em incidentes envolvendo volume de dados.",
      "Remover zeros à esquerda em campos que exigem tamanho fixo."
    ],
    "commonErrors": [
      "Confundir MB/s com Mb/s.",
      "Interpretar FF como 15 em vez de 255 quando são dois dígitos hexadecimais.",
      "Achar que C0 A8 sempre é malicioso, sem perceber que representa 192.168 em muitos endereços privados.",
      "Concluir que payload ilegível está criptografado sem checar encoding, compressão ou formato binário."
    ],
    "vulnerabilities": [
      {
        "name": "Interpretação incorreta de evidência técnica",
        "description": "Um analista pode classificar erroneamente tráfego ou arquivo porque não entende a representação numérica exibida pela ferramenta.",
        "defensiveExplanation": "Dumps e logs frequentemente mostram bytes em hexadecimal. Isso é uma forma de visualização, não uma conclusão sobre risco.",
        "mitigation": "Treinar leitura de bases, validar com ferramentas, correlacionar contexto e documentar a unidade ou base usada."
      },
      {
        "name": "Planejamento incorreto de endereçamento",
        "description": "Blocos CIDR mal compreendidos podem gerar redes sobrepostas, sub-redes pequenas demais ou exposição lateral excessiva.",
        "defensiveExplanation": "CIDR é contagem de bits. Erros em bits de rede e host afetam roteamento, firewall e cloud.",
        "mitigation": "Usar plano de endereçamento revisado, validação automática em IaC e revisão por pares antes de aplicar."
      }
    ],
    "monitoring": [
      "Alertas de tráfego para faixas inesperadas ou sobrepostas.",
      "Logs de firewall com origem/destino, porta, protocolo e volume.",
      "Inventário de blocos CIDR em cloud e datacenter.",
      "Evidências de payload analisadas com contexto de protocolo."
    ],
    "hardening": [
      "Padronizar documentação de redes com base, unidade e tamanho de campo.",
      "Validar blocos CIDR em pipelines de IaC antes do deploy.",
      "Evitar decisões de firewall baseadas em interpretação visual incompleta de payload.",
      "Revisar documentação de incidentes para separar fato observado de inferência."
    ],
    "detectionIdeas": [
      "Procurar inconsistências entre blocos CIDR planejados e implantados.",
      "Identificar logs com unidades ambíguas de tráfego ou armazenamento.",
      "Revisar alertas classificados como criptografia suspeita quando podem ser apenas dados binários ou codificados."
    ]
  },
  "lab": {
    "id": "lab-0.2",
    "title": "Converter IPv4 para binário e hexadecimal",
    "labType": "local",
    "objective": "Praticar a conversão de octetos IPv4 e relacionar decimal, binário e hexadecimal com valores usados em redes.",
    "scenario": "Você recebeu o endereço 192.168.10.50 em um ticket de troubleshooting e precisa explicar como ele aparece em binário e hexadecimal para preparar as próximas aulas de subnetting e análise de pacotes.",
    "topology": "Notebook do aluno -> terminal local -> conversão de valores -> documentação da evidência",
    "architecture": "Laboratório local sem tráfego externo. O aluno trabalha com valores estáticos, comandos locais e raciocínio manual.",
    "prerequisites": [
      "Ter concluído a aula 0.1.",
      "Ter acesso a Windows PowerShell, terminal Linux ou WSL.",
      "Saber copiar e registrar evidências simples em um arquivo de notas."
    ],
    "tools": [
      "Windows PowerShell ou terminal Linux",
      "Opcional: Python 3",
      "Bloco de notas, VS Code ou editor de texto",
      "Opcional: calculadora do sistema em modo programador"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Este laboratório não executa varredura, exploração ou tráfego contra terceiros.",
      "Não use dados sensíveis reais em exemplos compartilhados.",
      "O objetivo é defensivo: entender representação numérica e reduzir erros de interpretação."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Separar os octetos do IPv4",
        "instruction": "Escreva o endereço 192.168.10.50 como quatro valores independentes.",
        "command": "192 | 168 | 10 | 50",
        "expectedOutput": "Quatro octetos: 192, 168, 10 e 50.",
        "explanation": "IPv4 possui 32 bits divididos em quatro octetos de 8 bits. Cada parte vai de 0 a 255."
      },
      {
        "number": 2,
        "title": "Converter manualmente 192 para binário",
        "instruction": "Use os pesos 128, 64, 32, 16, 8, 4, 2 e 1. Marque 1 quando o peso entra na soma e 0 quando não entra.",
        "command": "192 = 128 + 64 = 11000000",
        "expectedOutput": "192 decimal = 11000000 binário.",
        "explanation": "Os bits de 128 e 64 ficam ligados; os demais ficam desligados."
      },
      {
        "number": 3,
        "title": "Converter os demais octetos",
        "instruction": "Repita o processo para 168, 10 e 50, preservando 8 bits em cada octeto.",
        "command": "168 = 10101000\n10 = 00001010\n50 = 00110010",
        "expectedOutput": "168 decimal = 10101000; 10 decimal = 00001010; 50 decimal = 00110010.",
        "explanation": "Zeros à esquerda são obrigatórios quando queremos representar o octeto completo."
      },
      {
        "number": 4,
        "title": "Validar no Windows PowerShell",
        "instruction": "No Windows, valide a conversão usando PowerShell.",
        "command": "192,168,10,50 | ForEach-Object { \"$($_) -> $([Convert]::ToString($_,2).PadLeft(8,'0')) -> $([Convert]::ToString($_,16).ToUpper().PadLeft(2,'0'))\" }",
        "expectedOutput": "Linhas mostrando 192 -> 11000000 -> C0, 168 -> 10101000 -> A8, 10 -> 00001010 -> 0A e 50 -> 00110010 -> 32.",
        "explanation": "O comando confirma a conversão manual e mostra o par hexadecimal correspondente a cada octeto."
      },
      {
        "number": 5,
        "title": "Validar no Linux ou WSL",
        "instruction": "No Linux, use Python para validar a mesma conversão.",
        "command": "python3 - <<'PY'\nfor n in [192,168,10,50]:\n    print(f'{n} -> {n:08b} -> {n:02X}')\nPY",
        "expectedOutput": "192 -> 11000000 -> C0; 168 -> 10101000 -> A8; 10 -> 00001010 -> 0A; 50 -> 00110010 -> 32.",
        "explanation": "A formatação 08b força 8 bits; 02X força 2 dígitos hexadecimais em maiúsculas."
      },
      {
        "number": 6,
        "title": "Criar evidência técnica",
        "instruction": "Registre a representação final em decimal, binário e hexadecimal.",
        "command": "Decimal: 192.168.10.50\nBinário: 11000000.10101000.00001010.00110010\nHexadecimal: C0 A8 0A 32",
        "expectedOutput": "Uma pequena evidência textual com as três representações.",
        "explanation": "Essa evidência será útil quando você estudar captura de pacotes, subnetting e dumps hexadecimais."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar que 192.168.10.50 é um IPv4 de 32 bits composto por quatro octetos e que os mesmos bytes podem ser exibidos como C0 A8 0A 32 em hexadecimal.",
    "validation": [
      {
        "check": "Cada octeto possui 8 bits",
        "command": "Conferir visualmente: 11000000, 10101000, 00001010, 00110010",
        "expected": "Todos os grupos têm exatamente 8 caracteres.",
        "ifFails": "Adicionar zeros à esquerda até completar 8 bits por octeto."
      },
      {
        "check": "Cada par hexadecimal possui 2 dígitos",
        "command": "Conferir: C0 A8 0A 32",
        "expected": "Cada octeto virou um par hexadecimal.",
        "ifFails": "Adicionar zero à esquerda quando o valor hexadecimal tiver um único dígito, como 0A."
      },
      {
        "check": "Conversão de 255",
        "command": "Converter 255 para binário e hexadecimal",
        "expected": "255 = 11111111 = FF",
        "ifFails": "Revisar pesos binários e regra de 4 bits por dígito hexadecimal."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O valor 10 aparece como 1010 em vez de 00001010.",
        "probableCause": "A ferramenta removeu zeros à esquerda ou o aluno esqueceu que octeto tem 8 bits.",
        "howToConfirm": "Contar a quantidade de bits exibidos.",
        "fix": "Usar PadLeft no PowerShell ou formatação 08b no Python."
      },
      {
        "symptom": "O hexadecimal de 10 aparece como A em vez de 0A.",
        "probableCause": "A ferramenta exibiu o valor mínimo sem completar o byte.",
        "howToConfirm": "Verificar se há 2 dígitos hexadecimais por octeto.",
        "fix": "Adicionar zero à esquerda ou usar formatação 02X."
      },
      {
        "symptom": "O comando Python não funciona no Windows.",
        "probableCause": "Python não instalado ou não disponível no PATH.",
        "howToConfirm": "Executar python --version ou py --version.",
        "fix": "Usar PowerShell ou a calculadora em modo programador."
      }
    ],
    "improvements": [
      "Converter também 255.255.255.0 para entender a base da máscara /24.",
      "Converter um endereço MAC real da própria máquina e contar seus 6 bytes.",
      "Abrir a calculadora em modo programador e comparar as conversões manuais.",
      "Registrar os valores em uma tabela para reutilizar em subnetting."
    ],
    "evidenceToCollect": [
      "Tabela com decimal, binário e hexadecimal dos octetos 192, 168, 10 e 50.",
      "Print ou cópia da saída do PowerShell ou Linux.",
      "Resposta explicando por que 10 deve virar 00001010 e não apenas 1010.",
      "Conversão adicional de 255 para FF."
    ],
    "questions": [
      "Por que cada octeto IPv4 precisa ter 8 bits?",
      "Por que 255 é o maior valor de um octeto?",
      "Por que hexadecimal é mais prático que binário para dumps?",
      "O que significa dizer que C0 A8 0A 32 representa os bytes de 192.168.10.50?"
    ],
    "challenge": "Converta 10.0.1.255 para binário e hexadecimal, preservando o tamanho de cada octeto, e explique por que o último octeto é especial em muitos contextos de rede.",
    "solution": "10.0.1.255 em binário é 00001010.00000000.00000001.11111111 e em hexadecimal é 0A 00 01 FF. O último octeto vale 255, ou seja, todos os seus bits estão ligados. Em muitas redes, dependendo da máscara, um endereço com todos os bits de host ligados pode ser broadcast da sub-rede; a confirmação depende da máscara usada."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que hexadecimal é mais usado para MAC, IPv6 e dumps do que binário puro?",
      "hints": [
        "Compare o tamanho da escrita.",
        "Lembre que 1 dígito hexadecimal representa 4 bits.",
        "Pense no que é mais fácil para humanos revisarem em logs."
      ],
      "expectedIdeas": [
        "compactação",
        "legibilidade",
        "4 bits",
        "byte",
        "MAC",
        "IPv6",
        "dump"
      ],
      "explanation": "Hexadecimal reduz drasticamente o tamanho da escrita e preserva alinhamento com grupos de bits. Dois dígitos hexadecimais equivalem a um byte."
    },
    {
      "type": "diagnóstico",
      "question": "Um aluno converte o octeto decimal 10 para 1010. O valor está matematicamente errado? E tecnicamente incompleto para IPv4?",
      "hints": [
        "Pense na diferença entre valor e campo fixo.",
        "Um octeto IPv4 tem 8 bits.",
        "Zeros à esquerda podem ser tecnicamente importantes."
      ],
      "expectedIdeas": [
        "valor correto",
        "representação incompleta",
        "octeto",
        "8 bits",
        "zeros à esquerda"
      ],
      "explanation": "1010 representa o valor decimal 10, mas para exibir um octeto completo precisamos escrever 00001010. O valor é o mesmo, mas o campo técnico exige tamanho fixo."
    },
    {
      "type": "cenário real",
      "question": "Você encontrou C0 A8 01 01 em um dump. Que hipótese simples você testaria antes de considerar isso suspeito?",
      "hints": [
        "Converta C0 e A8 para decimal.",
        "Pense em endereços privados comuns.",
        "Não classifique risco sem contexto."
      ],
      "expectedIdeas": [
        "C0=192",
        "A8=168",
        "192.168.1.1",
        "endereço privado",
        "contexto"
      ],
      "explanation": "C0 A8 01 01 representa 192.168.1.1, um endereço privado comum. Isso não prova benignidade nem malícia; apenas mostra que a interpretação correta vem antes da conclusão de segurança."
    }
  ],
  "quiz": [
    {
      "id": "q0.2.1",
      "type": "conceito",
      "q": "Quantos bits existem em 1 byte?",
      "opts": [
        "4",
        "8",
        "16",
        "32"
      ],
      "a": 1,
      "exp": "1 byte possui 8 bits. Em redes, um octeto também possui 8 bits.",
      "difficulty": "iniciante",
      "topic": "unidades"
    },
    {
      "id": "q0.2.2",
      "type": "comparação",
      "q": "Por que 2 dígitos hexadecimais representam exatamente 1 byte?",
      "opts": [
        "Porque cada dígito hexadecimal representa 2 bits.",
        "Porque cada dígito hexadecimal representa 4 bits, então dois representam 8 bits.",
        "Porque hexadecimal sempre representa endereços IP.",
        "Porque todo número hexadecimal é criptografado."
      ],
      "a": 1,
      "exp": "A base 16 possui 16 valores possíveis por dígito, o que equivale a 4 bits. Dois dígitos hexadecimais representam 8 bits, ou 1 byte.",
      "difficulty": "iniciante",
      "topic": "hexadecimal"
    },
    {
      "id": "q0.2.3",
      "type": "cálculo",
      "q": "Qual é o valor decimal de FF em hexadecimal?",
      "opts": [
        "15",
        "127",
        "240",
        "255"
      ],
      "a": 3,
      "exp": "F vale 15. FF = 15 × 16 + 15 = 255. Também é o byte 11111111.",
      "difficulty": "iniciante",
      "topic": "conversão"
    },
    {
      "id": "q0.2.4",
      "type": "diagnóstico",
      "q": "Em IPv4, por que devemos representar o decimal 10 como 00001010 quando estamos mostrando o octeto completo?",
      "opts": [
        "Porque 1010 está matematicamente errado.",
        "Porque todo octeto IPv4 tem 8 bits e os zeros à esquerda completam o campo.",
        "Porque 10 decimal sempre significa hexadecimal.",
        "Porque IPv4 usa 10 bits por octeto."
      ],
      "a": 1,
      "exp": "O valor 1010 está correto como valor binário mínimo, mas o octeto completo precisa de 8 bits: 00001010.",
      "difficulty": "iniciante",
      "topic": "ipv4"
    },
    {
      "id": "q0.2.5",
      "type": "segurança",
      "q": "Qual afirmação está correta sobre hexadecimal em análise de segurança?",
      "opts": [
        "Hexadecimal é uma forma de criptografia forte.",
        "Hexadecimal é sempre sinal de malware.",
        "Hexadecimal é uma representação compacta de valores binários e precisa de contexto para interpretação.",
        "Hexadecimal só existe em IPv6."
      ],
      "a": 2,
      "exp": "Hexadecimal é apenas representação. Pode aparecer em dados benignos, maliciosos, logs, dumps, hashes, MAC, IPv6 e muitos outros contextos.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q0.2.6",
      "type": "cenário",
      "q": "Um MAC é exibido como AA:BB:CC:DD:EE:FF. Quantos bytes ele possui?",
      "opts": [
        "3 bytes",
        "4 bytes",
        "6 bytes",
        "12 bytes"
      ],
      "a": 2,
      "exp": "Cada par hexadecimal representa 1 byte. O endereço possui seis pares: AA, BB, CC, DD, EE e FF. Portanto, são 6 bytes.",
      "difficulty": "iniciante",
      "topic": "mac"
    }
  ],
  "flashcards": [
    {
      "id": "fc0.2.1",
      "front": "O que é um bit?",
      "back": "A menor unidade de informação digital, com dois estados possíveis: 0 ou 1.",
      "tags": [
        "bit",
        "fundamentos"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.2",
      "front": "O que é um byte?",
      "back": "Um grupo de 8 bits. Em redes, um octeto também possui 8 bits.",
      "tags": [
        "byte",
        "octeto"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.3",
      "front": "Quanto vale FF em decimal?",
      "back": "255. FF é o maior valor representável em 1 byte.",
      "tags": [
        "hexadecimal",
        "conversão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.4",
      "front": "Por que hexadecimal é útil em redes?",
      "back": "Porque compacta binário: 1 dígito hex representa 4 bits e 2 dígitos representam 1 byte.",
      "tags": [
        "hexadecimal",
        "redes"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.5",
      "front": "Por que 10 vira 00001010 em um octeto IPv4?",
      "back": "Porque o valor 10 precisa ser representado dentro de um campo fixo de 8 bits.",
      "tags": [
        "ipv4",
        "binário"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.6",
      "front": "Hexadecimal é criptografia?",
      "back": "Não. Hexadecimal é apenas uma forma de representar números e bytes de maneira compacta.",
      "tags": [
        "segurança",
        "hexadecimal"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex0.2.1",
      "type": "cálculo",
      "prompt": "Converta o decimal 255 para binário de 8 bits e hexadecimal.",
      "expectedAnswer": "255 = 11111111 = FF.",
      "explanation": "255 é a soma de todos os pesos de um octeto: 128+64+32+16+8+4+2+1. Em hexadecimal, 1111 vira F e 1111 vira F."
    },
    {
      "id": "ex0.2.2",
      "type": "cálculo",
      "prompt": "Converta o decimal 10 para binário de 8 bits e hexadecimal de 2 dígitos.",
      "expectedAnswer": "10 = 00001010 = 0A.",
      "explanation": "O valor mínimo em binário seria 1010, mas o octeto completo precisa de 8 bits. Em hexadecimal, A precisa ser exibido como 0A para representar 1 byte."
    },
    {
      "id": "ex0.2.3",
      "type": "conceitual",
      "prompt": "Explique por que hexadecimal aparece em endereços MAC.",
      "expectedAnswer": "MAC possui 48 bits, geralmente exibidos como 6 bytes. Cada byte pode ser representado por 2 dígitos hexadecimais, tornando o endereço mais curto e legível.",
      "explanation": "Escrever MAC em binário puro seria longo demais. Hexadecimal preserva alinhamento com bytes e melhora a leitura humana."
    },
    {
      "id": "ex0.2.4",
      "type": "segurança",
      "prompt": "Você recebeu um alerta contendo bytes em hexadecimal. O que você deve verificar antes de afirmar que é criptografia ou malware?",
      "expectedAnswer": "Verificar protocolo, origem, destino, porta, contexto, ferramenta que gerou o alerta, formato do dado, possibilidade de encoding, compressão, hash ou binário legítimo.",
      "explanation": "Hexadecimal é representação. A classificação de segurança exige contexto e correlação, não apenas aparência."
    }
  ],
  "challenge": {
    "title": "Documentar uma rede pequena em três representações",
    "scenario": "Você está ajudando um colega que entende configuração básica de IP, mas não entende por que subnetting e Wireshark usam tantos números estranhos. Ele precisa documentar o host 10.0.1.255, sua máscara 255.255.255.0 e um MAC AA:BB:CC:DD:EE:FF.",
    "tasks": [
      "Converter 10.0.1.255 para binário, preservando 8 bits por octeto.",
      "Converter 10.0.1.255 para hexadecimal, preservando 2 dígitos por octeto.",
      "Converter 255.255.255.0 para binário e explicar por que isso corresponde a /24.",
      "Explicar quantos bytes existem no MAC AA:BB:CC:DD:EE:FF.",
      "Escrever uma observação de segurança explicando por que hexadecimal não significa criptografia."
    ],
    "constraints": [
      "Não usar apenas calculadora; explicar o raciocínio.",
      "Preservar zeros à esquerda em binário e hexadecimal.",
      "Não classificar nenhum valor como malicioso sem contexto.",
      "A entrega deve ser compreensível para alguém de TI que está começando em redes."
    ],
    "expectedDeliverables": [
      "Tabela de conversão do IPv4.",
      "Tabela de conversão da máscara.",
      "Explicação sobre bytes do MAC.",
      "Nota defensiva sobre hexadecimal, encoding e criptografia."
    ],
    "gradingRubric": [
      {
        "criterion": "Conversão correta do IPv4",
        "points": 30,
        "description": "O aluno preserva 8 bits por octeto e 2 dígitos hexadecimais por byte."
      },
      {
        "criterion": "Interpretação correta da máscara /24",
        "points": 25,
        "description": "O aluno explica que os 24 primeiros bits estão ligados na máscara 255.255.255.0."
      },
      {
        "criterion": "Explicação de MAC em bytes",
        "points": 20,
        "description": "O aluno reconhece seis pares hexadecimais como seis bytes."
      },
      {
        "criterion": "Raciocínio de segurança",
        "points": 25,
        "description": "O aluno diferencia representação hexadecimal, codificação, hash e criptografia em nível conceitual."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Primeiro identificamos o tamanho dos campos. IPv4 tem quatro octetos de 8 bits. Máscara IPv4 também tem quatro octetos. MAC tem seis bytes normalmente exibidos como pares hexadecimais. Depois convertemos cada campo mantendo seu tamanho, porque redes usam campos fixos.",
    "steps": [
      "Separar o IPv4 10.0.1.255 em 10, 0, 1 e 255.",
      "Converter cada octeto para 8 bits: 00001010, 00000000, 00000001 e 11111111.",
      "Converter cada octeto para hexadecimal: 0A, 00, 01 e FF.",
      "Converter a máscara 255.255.255.0 para binário: 11111111.11111111.11111111.00000000.",
      "Contar os bits ligados da máscara: 24, portanto /24.",
      "Ler o MAC AA:BB:CC:DD:EE:FF como seis pares hexadecimais, ou seja, seis bytes.",
      "Registrar que hexadecimal é forma de representação, não mecanismo de segurança."
    ],
    "commonWrongAnswers": [
      {
        "answer": "10.0.1.255 em binário é 1010.0.1.11111111.",
        "whyItIsWrong": "Os valores estão matematicamente reconhecíveis, mas os octetos não foram preservados com 8 bits. Em redes, isso atrapalha máscara e comparação de bits."
      },
      {
        "answer": "AA:BB:CC:DD:EE:FF tem 12 bytes porque tem 12 caracteres hexadecimais.",
        "whyItIsWrong": "Cada byte é representado por dois dígitos hexadecimais. Portanto 12 dígitos hexadecimais equivalem a 6 bytes."
      },
      {
        "answer": "FF indica criptografia ou ataque.",
        "whyItIsWrong": "FF é apenas o valor 255 em hexadecimal ou um byte com todos os bits ligados. O significado depende do campo e do contexto."
      }
    ],
    "finalAnswer": "10.0.1.255 = 00001010.00000000.00000001.11111111 = 0A 00 01 FF. A máscara 255.255.255.0 = 11111111.11111111.11111111.00000000, logo possui 24 bits de rede e pode ser escrita como /24. O MAC AA:BB:CC:DD:EE:FF possui 6 bytes. Hexadecimal é representação compacta de bytes, não criptografia."
  },
  "glossary": [
    {
      "term": "Bit",
      "shortDefinition": "Menor unidade de informação digital, com valor 0 ou 1.",
      "longDefinition": "Bit representa um de dois estados possíveis. Em redes, bits compõem campos de protocolos, endereços, máscaras, flags e payloads.",
      "example": "Uma flag TCP pode ser pensada como um bit ligado ou desligado.",
      "relatedTerms": [
        "byte",
        "binário",
        "flag"
      ],
      "relatedLessons": [
        "0.1",
        "0.2",
        "6.3"
      ]
    },
    {
      "term": "Byte",
      "shortDefinition": "Grupo de 8 bits.",
      "longDefinition": "Byte é uma unidade central para representar dados. Em redes, tamanhos de payload, endereços MAC e octetos IPv4 dependem dessa ideia.",
      "example": "O valor hexadecimal FF representa um byte com todos os bits ligados.",
      "relatedTerms": [
        "bit",
        "octeto",
        "hexadecimal"
      ],
      "relatedLessons": [
        "0.2",
        "0.4",
        "3.2"
      ]
    },
    {
      "term": "Octeto",
      "shortDefinition": "Grupo de 8 bits, termo muito usado em redes.",
      "longDefinition": "Octeto é usado para reforçar que o campo possui exatamente 8 bits. Cada parte de um endereço IPv4 é um octeto.",
      "example": "192 em 192.168.10.50 é um octeto IPv4.",
      "relatedTerms": [
        "byte",
        "IPv4",
        "máscara"
      ],
      "relatedLessons": [
        "0.2",
        "4.1",
        "5.1"
      ]
    },
    {
      "term": "Hexadecimal",
      "shortDefinition": "Sistema numérico de base 16, usando 0 a 9 e A a F.",
      "longDefinition": "Hexadecimal é usado porque compacta binário de forma alinhada: cada dígito representa 4 bits, e dois dígitos representam 1 byte.",
      "example": "C0 A8 0A 32 representa os bytes do IPv4 192.168.10.50.",
      "relatedTerms": [
        "binário",
        "byte",
        "MAC",
        "IPv6"
      ],
      "relatedLessons": [
        "0.2",
        "3.2",
        "4.1",
        "8.1"
      ]
    },
    {
      "term": "Zeros à esquerda",
      "shortDefinition": "Zeros adicionados antes do valor para completar o tamanho de um campo.",
      "longDefinition": "Em campos fixos, zeros à esquerda preservam a largura correta. Isso é importante em octetos IPv4, bytes em hexadecimal e campos de protocolo.",
      "example": "10 decimal em um octeto IPv4 deve ser escrito como 00001010.",
      "relatedTerms": [
        "octeto",
        "campo fixo",
        "binário"
      ],
      "relatedLessons": [
        "0.2",
        "5.1"
      ]
    }
  ],
  "references": [
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Aula 0.1: Como computadores representam informação",
      "organization": "Deixando de ser TBN",
      "url": "internal:0.1",
      "note": "Base conceitual para entender bits como representação de estados físicos."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v1.1 — Aula 0.2: Bits, bytes, binário e hexadecimal",
      "organization": "Deixando de ser TBN",
      "url": "internal:v1.1:0.2",
      "note": "Fonte pedagógica congelada usada para preservar ID, título e objetivos aproveitáveis."
    },
    {
      "type": "standard",
      "title": "Conceitos fundamentais de representação binária e hexadecimal",
      "organization": "Base técnica consolidada",
      "url": "internal:foundations",
      "note": "Conteúdo estável usado como base para redes, sistemas e segurança."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m00",
      "lesson": "fundamentos",
      "reason": "Pipelines, IaC e validação de CIDR dependem de entendimento de bits, bytes e representação de valores."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "tokens-e-codificacao",
      "lesson": "base64-tokens-claims",
      "reason": "A próxima aula sobre codificação prepara a base para entender tokens, claims, payloads e representações em autenticação moderna."
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
      "0.3"
    ]
  }
};
