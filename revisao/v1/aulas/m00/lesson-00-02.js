export const lesson0002 = {
  "id": "0.2",
  "moduleId": "m00",
  "order": 2,
  "title": "Bits, bytes, binário e hexadecimal",
  "subtitle": "A linguagem numérica que aparece por trás de IPv4, máscaras, MAC, IPv6, dumps, logs e análise de pacotes.",
  "duration": "105-145 min",
  "estimatedStudyTimeMinutes": 145,
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
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>Motivação</h2>\n  <p>\n    No trabalho com redes e segurança você vai ler valores como <code>192.168.10.50</code>, <code>255.255.255.0</code>, <code>AA:BB:CC:DD:EE:FF</code>, <code>0x0800</code>, <code>fe80::1</code> e <code>C0 A8 0A 32</code>. Eles aparecem em configurações, dumps do Wireshark, logs de firewall, saídas de roteadores, certificados e hashes.\n  </p>\n  <p>\n    Sem entender bits, bytes, binário e hexadecimal, subnetting vira decoreba de fórmulas, o MAC parece uma placa de carro estranha e um dump vira uma parede de códigos. Em segurança, o risco é maior: você pode confundir dado apenas exibido em hexadecimal com dado criptografado, ou ler errado um campo de protocolo.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Problema real:</strong> um analista vê <code>FF</code> em uma captura e não sabe se aquilo significa 15, 255, erro, criptografia, broadcast ou apenas um byte com os 8 bits ligados. A confusão acontece porque ferramentas diferentes usam bases diferentes para escrever o mesmo valor.\n  </div>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>História</h2>\n  <p>\n    Humanos contam em base 10. Circuitos digitais, como você viu na aula 0.1, distinguem bem dois estados (alto/baixo, 1/0), por isso a base 2 virou a forma natural de representar informação na máquina. O problema é que binário fica longo demais para humanos: um MAC de 48 bits escrito em binário teria 48 caracteres, difíceis de ler, copiar e comparar.\n  </p>\n  <p>\n    A solução foi adotar o hexadecimal (base 16), porque <strong>cada dígito hexadecimal representa exatamente 4 bits</strong>. As redes herdaram essas escolhas: IPv4 em quatro octetos decimais, MAC em seis pares hexadecimais, IPv6 em grupos hexadecimais e dumps de pacotes em hexadecimal. As três bases não concorrem entre si: são formas diferentes de escrever os mesmos bits.\n  </p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table comparison-table\">\n    <thead>\n      <tr>\n        <th>Base</th>\n        <th>Símbolos</th>\n        <th>Vantagem</th>\n        <th>Limitação</th>\n        <th>Onde aparece em redes</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Decimal (base 10)</td>\n        <td>0 a 9</td>\n        <td>Familiar para humanos</td>\n        <td>Esconde a estrutura de bits</td>\n        <td>IPv4, portas, métricas, TTL</td>\n      </tr>\n      <tr>\n        <td>Binário (base 2)</td>\n        <td>0 e 1</td>\n        <td>Mostra exatamente os bits</td>\n        <td>Longo e difícil de ler em campos grandes</td>\n        <td>Máscaras, flags, campos de protocolo, cálculo de sub-redes</td>\n      </tr>\n      <tr>\n        <td>Hexadecimal (base 16)</td>\n        <td>0 a 9 e A a F</td>\n        <td>Compacto e alinhado a grupos de 4 bits</td>\n        <td>Exige conhecer os dígitos A a F</td>\n        <td>MAC, IPv6, EtherType, dumps, hashes, certificados</td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>Problema</h2>\n  <p>\n    Computadores operam com bits, mas humanos precisam configurar, documentar e diagnosticar. Exibir tudo em binário deixaria a operação lenta e cheia de erros; exibir tudo em decimal esconderia a relação com bytes e campos de protocolo. Por isso as ferramentas alternam entre bases, e você precisa saber ler as três.\n  </p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem binário:</strong> subnetting vira decoreba, porque a máscara é uma sequência de bits.</li>\n    <li><strong>Sem byte:</strong> fica difícil entender payload, tamanho de pacote, MTU, throughput e volume de logs.</li>\n    <li><strong>Sem hexadecimal:</strong> dumps, MAC, IPv6 e EtherType ficam ilegíveis.</li>\n    <li><strong>Sem zeros à esquerda:</strong> octetos e campos de tamanho fixo ficam ambíguos.</li>\n  </ul>\n  <div class=\"callout callout--warning\">\n    <strong>Confusão comum:</strong> hexadecimal não é criptografia. A base é só a forma de escrever o valor. Segurança depende de confidencialidade, integridade, autenticação e autorização, não da base usada para exibir o dado.\n  </div>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>Conceito</h2>\n  <p>\n    Um <strong>bit</strong> é a menor unidade de informação digital: dois estados possíveis, 0 ou 1. Um <strong>nibble</strong> é um grupo de 4 bits. Um <strong>byte</strong> é um grupo de 8 bits. Um <strong>octeto</strong> também tem 8 bits; as redes preferem esse termo porque ele garante o tamanho exato, já que em arquiteturas antigas o byte nem sempre tinha 8 bits. Uma <strong>palavra</strong> (word) é o bloco que um processador manipula de uma vez, e o tamanho dela muda conforme a arquitetura (16, 32 ou 64 bits); por isso protocolos de rede descrevem campos em bits e octetos, não em palavras.\n  </p>\n  <div class=\"definition-box\">\n    <strong>Definição essencial:</strong> binário é a escrita de números em base 2; decimal, em base 10; hexadecimal, em base 16. Em hexadecimal, os valores 10 a 15 são escritos com as letras A, B, C, D, E e F. O prefixo <code>0x</code> (como em <code>0x0800</code>) indica que o número está em hexadecimal.\n  </div>\n  <p>\n    Com <em>n</em> bits você representa 2<sup>n</sup> valores, de 0 até 2<sup>n</sup> − 1. É daí que vêm os limites que você verá em todo o curso:\n  </p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Unidade</th>\n        <th>Tamanho</th>\n        <th>Quantidade de valores</th>\n        <th>Exemplo em redes</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Bit</td>\n        <td>1 bit</td>\n        <td>2 valores: 0 ou 1</td>\n        <td>Uma flag TCP ligada ou desligada</td>\n      </tr>\n      <tr>\n        <td>Nibble</td>\n        <td>4 bits</td>\n        <td>16 valores: 0 a 15</td>\n        <td>Um dígito hexadecimal</td>\n      </tr>\n      <tr>\n        <td>Byte / octeto</td>\n        <td>8 bits</td>\n        <td>256 valores: 0 a 255</td>\n        <td>Um octeto IPv4, como 192</td>\n      </tr>\n      <tr>\n        <td>2 bytes</td>\n        <td>16 bits</td>\n        <td>65536 valores: 0 a 65535</td>\n        <td>Uma porta TCP/UDP</td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n  <p>\n    A regra mais importante desta aula: <strong>1 dígito hexadecimal = 4 bits; 2 dígitos hexadecimais = 8 bits = 1 byte</strong>. Por isso <code>FF</code> é um byte com todos os bits ligados, <code>11111111</code>, que vale 255 em decimal.\n  </p>\n  <p>\n    <strong>Bit ou byte nas unidades:</strong> em geral, <code>b</code> minúsculo é bit e <code>B</code> maiúsculo é byte. Velocidade de link costuma vir em bits (Mb/s); tamanho de arquivo e de log, em bytes (MB). Um link de 100 Mb/s transfere no máximo 100 ÷ 8 = 12,5 MB/s, sem contar overhead. Nem toda ferramenta respeita essa convenção, então confira a unidade antes de concluir.\n  </p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>Funcionamento interno</h2>\n  <p>\n    Toda conversão se apoia em posição e peso. No decimal, cada posição vale uma potência de 10; no binário, uma potência de 2; no hexadecimal, uma potência de 16. O número é a soma de cada símbolo multiplicado pelo peso da sua posição.\n  </p>\n  <h3>Como ler um byte em binário</h3>\n  <p>\n    Um octeto tem 8 posições. Da esquerda para a direita, os pesos são 128, 64, 32, 16, 8, 4, 2 e 1. Bit em 1: o peso entra na soma. Bit em 0: não entra.\n  </p>\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Bit</th>\n        <th>7</th>\n        <th>6</th>\n        <th>5</th>\n        <th>4</th>\n        <th>3</th>\n        <th>2</th>\n        <th>1</th>\n        <th>0</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Peso</td>\n        <td>128</td>\n        <td>64</td>\n        <td>32</td>\n        <td>16</td>\n        <td>8</td>\n        <td>4</td>\n        <td>2</td>\n        <td>1</td>\n      </tr>\n      <tr>\n        <td>192</td>\n        <td>1</td>\n        <td>1</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n        <td>0</td>\n      </tr>\n    </tbody>\n  </table>\n  <p>\n    Na tabela, <code>11000000</code> vale 128 + 64 = 192. Da mesma forma, <code>168</code> é <code>10101000</code> (128 + 32 + 8) e <code>10</code> é <code>00001010</code> (8 + 2). Para converter de decimal para binário, percorra os pesos da esquerda para a direita: se o peso cabe no que falta, marque 1 e subtraia; se não cabe, marque 0. Os zeros à esquerda importam porque o octeto IPv4 tem tamanho fixo de 8 bits.\n  </p>\n  <h3>Como hexadecimal compacta binário</h3>\n  <p>\n    Hexadecimal trabalha em grupos de 4 bits. O binário <code>1100</code> vale 12, que em hexadecimal é <code>C</code>; <code>0000</code> vale 0. Portanto <code>11000000</code> vira <code>C0</code>, e <code>10101000</code> (<code>1010</code> = A, <code>1000</code> = 8) vira <code>A8</code>. Assim, o IPv4 <code>192.168.10.50</code> aparece em bytes como <code>C0 A8 0A 32</code>.\n  </p>\n  <ol class=\"flow-list\">\n    <li>Separe o octeto em dois grupos de 4 bits.</li>\n    <li>Converta cada grupo para decimal entre 0 e 15.</li>\n    <li>Troque 10, 11, 12, 13, 14 e 15 por A, B, C, D, E e F.</li>\n    <li>Junte os dois dígitos hexadecimais.</li>\n  </ol>\n  <p>\n    No caminho inverso, de hexadecimal para decimal, multiplique o dígito da esquerda por 16 e some o da direita: <code>FF</code> = 15 × 16 + 15 = 255; <code>A8</code> = 10 × 16 + 8 = 168; <code>0A</code> = 0 × 16 + 10 = 10.\n  </p>\n  <div class=\"callout warning\">\n    <strong>Erros comuns:</strong>\n    <ul>\n      <li><strong>Confundir bit com byte:</strong> leva a erros de throughput, tamanho de arquivo e capacidade contratada. Lembre: 1 byte = 8 bits.</li>\n      <li><strong>Remover zeros à esquerda:</strong> <code>1010</code> é o valor 10, mas o octeto completo é <code>00001010</code>. Sem os zeros, você compara campos de tamanhos diferentes e erra máscara e subnetting.</li>\n      <li><strong>Achar que hexadecimal é criptografia:</strong> hexadecimal é só representação; criptografia exige algoritmo e chave.</li>\n      <li><strong>Decorar /24 sem ver os bits:</strong> relacione o prefixo com a quantidade de bits de rede ligados na máscara; só assim /25, /26 e VLSM fazem sentido.</li>\n    </ul>\n  </div>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>Arquitetura</h2>\n  <p>\n    Bits, bytes e bases aparecem em todas as camadas. Conhecer o tamanho de cada campo explica os limites que você encontra: um octeto IPv4 vai de 0 a 255, uma porta vai de 0 a 65535, o MAC tem 6 bytes e o IPv6 é muito maior que o IPv4.\n  </p>\n  <div class=\"responsive-table\">\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Camada</th>\n        <th>Campo</th>\n        <th>Tamanho</th>\n        <th>Como costuma ser exibido</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Física</td>\n        <td>Bits em trânsito</td>\n        <td>—</td>\n        <td>Sinais elétricos, ópticos ou de rádio</td>\n      </tr>\n      <tr>\n        <td>Enlace</td>\n        <td>Endereço MAC</td>\n        <td>48 bits (6 bytes)</td>\n        <td>Seis pares hexadecimais: <code>3c:52:82:1a:2b:3c</code> (Linux), <code>3C-52-82-1A-2B-3C</code> (Windows), <code>3c52.821a.2b3c</code> (Cisco)</td>\n      </tr>\n      <tr>\n        <td>Enlace</td>\n        <td>EtherType</td>\n        <td>16 bits</td>\n        <td>Hexadecimal: <code>0x0800</code> (IPv4), <code>0x86DD</code> (IPv6)</td>\n      </tr>\n      <tr>\n        <td>Rede</td>\n        <td>Endereço IPv4 e máscara</td>\n        <td>32 bits (4 octetos)</td>\n        <td>Decimal pontuado (<code>192.168.10.50</code>, <code>255.255.255.0</code>) ou prefixo (<code>/24</code>)</td>\n      </tr>\n      <tr>\n        <td>Rede</td>\n        <td>Endereço IPv6</td>\n        <td>128 bits</td>\n        <td>Grupos hexadecimais (<code>fe80::1</code>)</td>\n      </tr>\n      <tr>\n        <td>Transporte</td>\n        <td>Porta TCP/UDP</td>\n        <td>16 bits</td>\n        <td>Decimal (<code>443</code>)</td>\n      </tr>\n      <tr>\n        <td>Transporte</td>\n        <td>Flags TCP</td>\n        <td>1 bit cada</td>\n        <td>Nome da flag ou valor hexadecimal no dump</td>\n      </tr>\n      <tr>\n        <td>Aplicação</td>\n        <td>Payload</td>\n        <td>Sequência de bytes</td>\n        <td>Texto, JSON, Base64, binário, compactado ou criptografado; em dumps, hexadecimal</td>\n      </tr>\n    </tbody>\n  </table>\n  </div>\n  <p>\n    Repare que o mesmo MAC aparece com separadores diferentes conforme a ferramenta. Os bytes são os mesmos; só muda a forma de exibir.\n  </p>\n  <div class=\"callout callout--security\">\n    <strong>Ponto de segurança:</strong> uma ferramenta quase sempre mostra uma <em>interpretação</em> dos bytes. Antes de concluir algo, distinga valor bruto, representação visual, codificação, compressão, serialização e criptografia.\n  </div>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>Analogia</h2>\n  <p>\n    A mesma quantia de dinheiro pode ser dita (\"cento e noventa e dois reais\"), escrita (<code>192</code>) ou decomposta em notas (100 + 50 + 20 + 20 + 2). A quantia não muda; muda a forma de registrar. Com bases numéricas é igual: <code>192</code>, <code>11000000</code> e <code>C0</code> são o mesmo valor. O decimal é legível para humanos, o binário revela os bits e o hexadecimal compacta a escrita sem perder o alinhamento com bytes.\n  </p>\n  <div class=\"callout callout--warning\">\n    <strong>Limite da analogia:</strong> o significado de um byte não é fixo: o mesmo byte pode ser número, caractere, parte de um endereço ou instrução, conforme o protocolo e o contexto.\n  </div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>Exemplo simples</h2>\n  <p>\n    Pegue o endereço IPv4 <code>192.168.10.50</code>. Para humanos, ele parece quatro números decimais. Para a rede, ele é um endereço de 32 bits dividido em quatro octetos:\n  </p>\n  <table class=\"data-table\">\n    <thead>\n      <tr>\n        <th>Decimal</th>\n        <th>Binário</th>\n        <th>Hexadecimal</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><td>192</td><td>11000000</td><td>C0</td></tr>\n      <tr><td>168</td><td>10101000</td><td>A8</td></tr>\n      <tr><td>10</td><td>00001010</td><td>0A</td></tr>\n      <tr><td>50</td><td>00110010</td><td>32</td></tr>\n    </tbody>\n  </table>\n  <p>\n    Então, <code>192.168.10.50</code> pode ser visto como <code>11000000.10101000.00001010.00110010</code> em binário ou <code>C0 A8 0A 32</code> em hexadecimal. Quando o Wireshark mostra bytes em hexadecimal, ele não está inventando outra informação; ele está mostrando a mesma informação em uma escrita mais compacta.\n  </p>\n</section>",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>Exemplo empresarial</h2>\n  <p>\n    Em uma empresa, o time de redes pode receber uma tarefa aparentemente simples: criar uma nova VLAN para estações administrativas usando a rede <code>10.20.30.0/24</code>. O sufixo <code>/24</code> significa que os 24 primeiros bits identificam a rede. A máscara correspondente é <code>255.255.255.0</code>, que em binário é <code>11111111.11111111.11111111.00000000</code>. Os 8 bits restantes identificam o host; quando todos eles estão em 1 (último octeto 255, como em <code>10.20.30.255</code>), o endereço é o broadcast da sub-rede e não pode ser atribuído a um host. Sem enxergar os bits, você pode até decorar que /24 é 255.255.255.0, mas vai travar quando chegar em /25, /26, /27 ou VLSM.\n  </p>\n  <p>\n    Na operação, um analista de firewall pode ver um MAC como <code>00:1A:2B:3C:4D:5E</code>. Cada par é um byte em hexadecimal. Um engenheiro de redes pode verificar EtherType <code>0x0800</code> para IPv4 ou <code>0x86DD</code> para IPv6.\n  </p>\n</section>",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>\n    Em cloud você raramente vê os bits, mas eles governam o desenho da rede. Ao criar uma VPC ou VNet, você escolhe blocos CIDR como <code>10.0.0.0/16</code>, <code>10.0.1.0/24</code> ou <code>172.16.32.0/20</code>. O número depois da barra é a contagem de bits de rede. Um bloco mal escolhido pode impedir peering, integração com o datacenter ou expansão futura, e corrigir isso depois costuma exigir redes adicionais, NAT, rotas complexas ou migrações caras.\n  </p>\n  <div class=\"callout callout--problem\">\n    <strong>Exemplo realista:</strong> uma empresa cria várias VNets com faixas sobrepostas porque ninguém validou os blocos CIDR. Meses depois, a integração via VPN ou peering falha. A raiz do problema está nos bits de endereçamento, não no firewall nem no DNS.\n  </div>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>\n    Um pipeline pode validar se os blocos CIDR declarados em Terraform se sobrepõem, ou se desenvolvimento, homologação e produção usam faixas conflitantes. Uma política como código pode bloquear sub-redes grandes demais, que ampliam a exposição lateral.\n  </p>\n  <p>\n    Hexadecimal também aparece nos artefatos: o digest de uma imagem de container (<code>sha256:…</code>) tem 64 dígitos hexadecimais, ou seja, 32 bytes (256 bits); fingerprints de certificados também são exibidos em hexadecimal. Saber contar bytes a partir dos dígitos ajuda a reconhecer o que você está vendo: um número, um hash, uma codificação ou um dado criptografado.\n  </p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>Exemplo em Segurança</h2>\n  <p>\n    Um payload em hexadecimal pode ser só a exibição de bytes; um texto em Base64 pode ser só codificação; um hash em hexadecimal é uma impressão digital, não um segredo. O erro do analista é concluir antes de entender o contexto.\n  </p>\n  <table class=\"data-table risk-table\">\n    <thead>\n      <tr>\n        <th>Risco</th>\n        <th>Como aparece</th>\n        <th>Impacto</th>\n        <th>Mitigação defensiva</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Confundir hex com criptografia</td>\n        <td>Dump mostra bytes como <code>4D 5A</code> (assinatura \"MZ\" do início de executáveis Windows) ou <code>FF D8</code> (início de arquivos JPEG)</td>\n        <td>Análise incorreta do artefato</td>\n        <td>Identificar formato, cabeçalho, contexto e ferramenta de origem</td>\n      </tr>\n      <tr>\n        <td>Ignorar zeros à esquerda</td>\n        <td><code>10</code> tratado como <code>1010</code> em vez de <code>00001010</code></td>\n        <td>Erro em máscara, subnetting e interpretação de campo fixo</td>\n        <td>Respeitar o tamanho do campo: 8, 16, 32 ou 128 bits</td>\n      </tr>\n      <tr>\n        <td>Interpretar payload sem contexto</td>\n        <td>Bytes aparentemente aleatórios em captura de tráfego</td>\n        <td>Falso positivo ou falso negativo</td>\n        <td>Correlacionar protocolo, porta, TLS, logs, endpoint e comportamento</td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>Diagrama SVG</h2>\n  <p>O diagrama mostra como o mesmo valor pode ser visto em decimal, binário e hexadecimal, e como isso aparece em um IPv4 real.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 960 420\" role=\"img\" aria-labelledby=\"m00l02-title m00l02-desc\">\n    <title id=\"m00l02-title\">Conversão entre decimal, binário e hexadecimal</title>\n    <desc id=\"m00l02-desc\">O valor decimal 192 é representado como 11000000 em binário e C0 em hexadecimal. O IPv4 192.168.10.50 é dividido em quatro octetos.</desc>\n    <defs>\n      <marker id=\"m00l02-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n\n    <rect x=\"40\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"150\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Decimal</text>\n    <text x=\"150\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n\n    <line x1=\"260\" y1=\"80\" x2=\"370\" y2=\"80\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l02-arrow)\" />\n\n    <rect x=\"370\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"480\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Binário</text>\n    <text x=\"480\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">11000000</text>\n\n    <line x1=\"590\" y1=\"80\" x2=\"700\" y2=\"80\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m00l02-arrow)\" />\n\n    <rect x=\"700\" y=\"40\" width=\"220\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"810\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Hexadecimal</text>\n    <text x=\"810\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">C0</text>\n\n    <rect x=\"70\" y=\"185\" width=\"820\" height=\"170\" rx=\"18\" class=\"svg-zone\" />\n    <text x=\"480\" y=\"220\" text-anchor=\"middle\" class=\"svg-label\">IPv4 192.168.10.50 como quatro octetos</text>\n\n    <rect x=\"110\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"190\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">192</text>\n    <text x=\"190\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">C0</text>\n\n    <rect x=\"310\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"390\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">168</text>\n    <text x=\"390\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">A8</text>\n\n    <rect x=\"510\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"590\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">10</text>\n    <text x=\"590\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">0A</text>\n\n    <rect x=\"710\" y=\"250\" width=\"160\" height=\"70\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"790\" y=\"278\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">50</text>\n    <text x=\"790\" y=\"304\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">32</text>\n\n    <text x=\"480\" y=\"382\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Cada octeto tem 8 bits; cada par hexadecimal representa 1 byte.</text>\n  </svg>\n</section>",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> todo valor técnico é uma sequência de bits que pode ser exibida de formas diferentes: decimal é amigável para humanos, binário revela a estrutura e hexadecimal compacta bytes.</li>\n    <li><strong>O que lembrar:</strong> 1 byte = 8 bits; 1 dígito hexadecimal = 4 bits; 2 dígitos hexadecimais = 1 byte; n bits representam 2<sup>n</sup> valores (8 bits: 0 a 255; 16 bits: 0 a 65535).</li>\n    <li><strong>Erro comum:</strong> remover zeros à esquerda em campos fixos, como octetos IPv4 (10 = <code>00001010</code>), ou confundir Mb/s com MB/s.</li>\n    <li><strong>Uso real:</strong> IPv4, máscaras, MAC, IPv6, portas, EtherType, flags, dumps, hashes, certificados e logs.</li>\n    <li><strong>Segurança:</strong> representação não é proteção. Hexadecimal, Base64 e binário não significam criptografia.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>Próximo tema</h2>\n  <p>\n    Na aula 0.3 você verá ASCII, Unicode, UTF-8 e Base64: como textos e caracteres viram bytes, base para entender HTTP, APIs, logs, tokens e payloads.\n  </p>\n</section>\n"
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
        "expectedObservation": "Linhas como \"address is 0011.2233.4455 (bia 0011.2233.4455)\": o MAC aparece em três grupos de 4 dígitos hexadecimais separados por ponto.",
        "interpretation": "Cada par de dígitos continua sendo 1 byte: 0011.2233.4455 é o mesmo MAC que 00:11:22:33:44:55. \"bia\" é o endereço gravado de fábrica (burned-in address)."
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
      "Usar ferramentas confiáveis para validar conversões em mudanças críticas de rede."
    ],
    "badPractices": [
      "Fazer subnetting apenas por tabela decorada sem entender bits.",
      "Copiar blocos CIDR para cloud sem validar sobreposição.",
      "Remover zeros à esquerda em campos que exigem tamanho fixo."
    ],
    "commonErrors": [
      "Confundir MB/s com Mb/s ao estimar volume de dados em um incidente.",
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
      "Inventário de blocos CIDR em cloud e datacenter."
    ],
    "hardening": [
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
    "estimatedTimeMinutes": 35,
    "cost": "zero",
    "safetyNotes": [
      "Laboratório local: nenhum tráfego é enviado a terceiros. Use apenas os valores de exemplo ou dados da sua própria máquina."
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
      "Converter também 255.255.255.0 para binário e hexadecimal (FF FF FF 00) e contar os bits ligados da máscara /24.",
      "Abrir a calculadora do sistema em modo programador e comparar com as conversões manuais."
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
    "challenge": "Descubra o MAC da sua interface de rede (ipconfig /all no Windows ou ip link no Linux), conte quantos bytes ele tem e converta o primeiro byte para binário e decimal.",
    "solution": "No Windows, a linha Endereço Físico (Physical Address) mostra o MAC com hífens, como 3C-52-82-1A-2B-3C; no Linux, a linha link/ether mostra o MAC em minúsculas, separado por dois-pontos. São 6 pares hexadecimais, ou seja, 6 bytes (48 bits). Exemplo com o primeiro byte 3C: 3 = 0011 e C = 1100, logo 00111100; em decimal, 3 × 16 + 12 = 60."
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
      "id": "q0.2.2",
      "question": "Por que 2 dígitos hexadecimais representam exatamente 1 byte?",
      "options": [
        "Porque cada dígito hexadecimal representa 2 bits.",
        "Porque cada dígito hexadecimal representa 4 bits, então dois representam 8 bits.",
        "Porque hexadecimal sempre representa endereços IP.",
        "Porque todo número hexadecimal é criptografado."
      ],
      "answer": 1,
      "explanation": "A base 16 possui 16 valores possíveis por dígito, o que equivale a 4 bits. Dois dígitos hexadecimais representam 8 bits, ou 1 byte.",
      "topic": "hexadecimal",
      "difficulty": "iniciante",
      "type": "comparação"
    },
    {
      "id": "q0.2.3",
      "question": "Qual é o valor decimal de FF em hexadecimal?",
      "options": [
        "15",
        "127",
        "240",
        "255"
      ],
      "answer": 3,
      "explanation": "F vale 15. FF = 15 × 16 + 15 = 255. Também é o byte 11111111.",
      "topic": "conversão",
      "difficulty": "iniciante",
      "type": "cálculo"
    },
    {
      "id": "q0.2.4",
      "question": "Em IPv4, por que devemos representar o decimal 10 como 00001010 quando estamos mostrando o octeto completo?",
      "options": [
        "Porque 1010 está matematicamente errado.",
        "Porque todo octeto IPv4 tem 8 bits e os zeros à esquerda completam o campo.",
        "Porque 10 decimal sempre significa hexadecimal.",
        "Porque IPv4 usa 10 bits por octeto."
      ],
      "answer": 1,
      "explanation": "O valor 1010 está correto como valor binário mínimo, mas o octeto completo precisa de 8 bits: 00001010.",
      "topic": "ipv4",
      "difficulty": "iniciante",
      "type": "diagnóstico"
    },
    {
      "id": "q0.2.5",
      "question": "Qual afirmação está correta sobre hexadecimal em análise de segurança?",
      "options": [
        "Hexadecimal é uma forma de criptografia forte.",
        "Hexadecimal é sempre sinal de malware.",
        "Hexadecimal é uma representação compacta de valores binários e precisa de contexto para interpretação.",
        "Hexadecimal só existe em IPv6."
      ],
      "answer": 2,
      "explanation": "Hexadecimal é apenas representação. Pode aparecer em dados benignos, maliciosos, logs, dumps, hashes, MAC, IPv6 e muitos outros contextos.",
      "topic": "segurança",
      "difficulty": "iniciante",
      "type": "segurança"
    },
    {
      "id": "q0.2.6",
      "question": "Um MAC é exibido como AA:BB:CC:DD:EE:FF. Quantos bytes ele possui?",
      "options": [
        "3 bytes",
        "4 bytes",
        "6 bytes",
        "12 bytes"
      ],
      "answer": 2,
      "explanation": "Cada par hexadecimal representa 1 byte. O endereço possui seis pares: AA, BB, CC, DD, EE e FF. Portanto, são 6 bytes.",
      "topic": "mac",
      "difficulty": "iniciante",
      "type": "cenário"
    },
    {
      "id": "q0.2.7",
      "question": "Uma porta TCP ou UDP é um campo de 16 bits. Qual é o maior número de porta possível?",
      "options": [
        "65535",
        "255",
        "65536",
        "1023"
      ],
      "answer": 0,
      "explanation": "Com 16 bits há 2^16 = 65536 valores, de 0 a 65535. 255 é o limite de um campo de 8 bits, e 65536 é a quantidade de valores, não o maior deles.",
      "topic": "unidades",
      "difficulty": "iniciante",
      "type": "cálculo"
    },
    {
      "id": "q0.2.8",
      "question": "Em um dump, o EtherType aparece como 0x0800. O que o prefixo 0x indica?",
      "options": [
        "Que o valor está criptografado.",
        "Que o valor está escrito em binário.",
        "Que o campo é opcional e pode ser ignorado.",
        "Que o valor está escrito em hexadecimal."
      ],
      "answer": 3,
      "explanation": "0x é o prefixo usado para indicar hexadecimal. 0x0800 é o EtherType de IPv4: um valor de 16 bits escrito em hexadecimal, sem nada de criptografia.",
      "topic": "hexadecimal",
      "difficulty": "iniciante",
      "type": "conceito"
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
      "back": "Um grupo de 8 bits. Em redes se usa o termo octeto para garantir que o campo tem exatamente 8 bits.",
      "tags": [
        "byte",
        "octeto"
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
      "id": "fc0.2.6",
      "front": "Hexadecimal é criptografia?",
      "back": "Não. Hexadecimal é apenas uma forma de representar números e bytes de maneira compacta.",
      "tags": [
        "segurança",
        "hexadecimal"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.7",
      "front": "Quantos valores cabem em n bits?",
      "back": "2^n valores, de 0 a 2^n − 1. Ex.: 8 bits = 256 valores (0 a 255); 16 bits = 65536 valores (0 a 65535).",
      "tags": [
        "bits",
        "unidades"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.8",
      "front": "Mb/s ou MB/s: qual é bit e qual é byte?",
      "back": "Em geral, b minúsculo é bit e B maiúsculo é byte. Divida por 8: 100 Mb/s equivalem a no máximo 12,5 MB/s, sem contar overhead.",
      "tags": [
        "unidades",
        "byte"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc0.2.9",
      "front": "Como o mesmo MAC aparece no Linux, no Windows e no Cisco?",
      "back": "3c:52:82:1a:2b:3c, 3C-52-82-1A-2B-3C e 3c52.821a.2b3c. Os 6 bytes são os mesmos; só muda o separador.",
      "tags": [
        "mac",
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
      "id": "ex0.2.5",
      "type": "cálculo",
      "prompt": "Um dump mostra os bytes AC 10 20 01 no campo de endereço de destino IPv4. Converta-os para binário e para decimal pontuado.",
      "expectedAnswer": "AC 10 20 01 = 10101100.00010000.00100000.00000001 = 172.16.32.1.",
      "explanation": "Cada par hexadecimal é um octeto. AC = 10 × 16 + 12 = 172; 10 = 1 × 16 + 0 = 16; 20 = 2 × 16 + 0 = 32; 01 = 1. Em binário, cada dígito hex vira 4 bits: A = 1010, C = 1100, e assim por diante."
    },
    {
      "id": "ex0.2.6",
      "type": "cálculo",
      "prompt": "Um download mostra 25 MB/s. Qual é essa taxa em Mb/s? O link de 100 Mb/s contratado está saturado?",
      "expectedAnswer": "25 MB/s × 8 = 200 Mb/s. Isso é mais do que um link de 100 Mb/s comporta, então a taxa não pode estar passando por esse link (ou a unidade exibida está errada).",
      "explanation": "B maiúsculo indica byte e b minúsculo indica bit. Para passar de bytes para bits, multiplique por 8. Confundir as duas unidades gera erros de 8 vezes em diagnósticos de capacidade."
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
    "scenario": "Você está ajudando um colega que entende configuração básica de IP, mas não entende por que subnetting e Wireshark usam tantos números estranhos. Ele precisa documentar o endereço 10.0.1.255, a máscara 255.255.255.0 e um MAC AA:BB:CC:DD:EE:FF.",
    "tasks": [
      "Converter 10.0.1.255 para binário, preservando 8 bits por octeto.",
      "Converter 10.0.1.255 para hexadecimal, preservando 2 dígitos por octeto.",
      "Converter 255.255.255.0 para binário e explicar por que isso corresponde a /24.",
      "Explicar o que o último octeto de 10.0.1.255 (11111111) significa quando a máscara é /24.",
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
        "description": "O aluno explica que os 24 primeiros bits estão ligados na máscara 255.255.255.0 e reconhece que 10.0.1.255 tem todos os bits de host ligados (broadcast de 10.0.1.0/24)."
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
      "Com /24, o último octeto é a parte de host. Em 10.0.1.255 ele vale 11111111 (todos os bits de host ligados): é o endereço de broadcast de 10.0.1.0/24, que não pode ser atribuído a um host.",
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
    "finalAnswer": "10.0.1.255 = 00001010.00000000.00000001.11111111 = 0A 00 01 FF. A máscara 255.255.255.0 = 11111111.11111111.11111111.00000000, logo possui 24 bits de rede e pode ser escrita como /24; com ela, 10.0.1.255 é o broadcast da sub-rede 10.0.1.0/24. O MAC AA:BB:CC:DD:EE:FF possui 6 bytes. Hexadecimal é representação compacta de bytes, não criptografia."
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
