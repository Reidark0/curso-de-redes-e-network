export const lesson1202 = {
  "id": "12.2",
  "moduleId": "m12",
  "order": 2,
  "title": "RF, frequência, canais, RSSI e SNR",
  "subtitle": "Como o ar vira meio de transmissão: potência, ruído, canais, largura de canal, interferência e qualidade real do sinal Wi-Fi.",
  "duration": "85-115 min",
  "estimatedStudyTimeMinutes": 115,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 200,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "rf",
    "frequência",
    "canais",
    "rssi",
    "snr",
    "interferência",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.1",
      "reason": "Antes de estudar RF, é necessário entender que Wi-Fi é uma tecnologia de acesso local sem fio e não sinônimo de internet."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.x",
      "reason": "RF está principalmente na camada física; separar camada física, enlace, rede e aplicação evita diagnóstico errado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "O tráfego Wi-Fi precisa se integrar ao mundo de quadros, MAC, switches e VLANs depois do AP."
    }
  ],
  "objectives": [
    "Explicar por que RF é o fundamento invisível de qualquer rede Wi-Fi.",
    "Diferenciar frequência, banda, canal, largura de canal, potência, ruído, RSSI e SNR.",
    "Entender por que sinal forte não garante rede boa se houver ruído, interferência, saturação ou canal mal escolhido.",
    "Comparar 2.4 GHz, 5 GHz e 6 GHz em alcance, capacidade, interferência e uso corporativo.",
    "Coletar evidências básicas de RF em Windows, Linux ou ferramenta de análise Wi-Fi sem executar ações ofensivas.",
    "Relacionar decisões de RF com segurança, operação, custos e experiência do usuário."
  ],
  "learningOutcomes": [
    "Dado um relatório com RSSI, ruído e SNR, o aluno consegue interpretar se o problema parece cobertura, interferência ou saturação.",
    "Dado um ambiente com muitas redes próximas, o aluno consegue explicar por que canal, largura de canal e potência importam.",
    "Dado um caso em que o usuário vê muitas barras de sinal mas a rede está ruim, o aluno consegue formular hipóteses além de 'sinal fraco'.",
    "Dado um desenho de Wi-Fi corporativo, o aluno consegue propor uma abordagem inicial para 2.4 GHz, 5 GHz e 6 GHz sem prometer milagre técnico."
  ],
  "content": {
    "motivation": "\n      <section class=\"lesson-section lesson-section--motivation\">\n        <h2>1. Motivação</h2>\n        <p>\n          Na aula anterior, você separou Wi-Fi de internet e entendeu que o ponto de acesso é uma ponte entre clientes sem fio e a rede cabeada. Agora vem a parte que mais confunde profissionais de TI acostumados com cabo: no Wi-Fi, o primeiro enlace não é um par metálico, uma fibra ou uma porta de switch. O primeiro enlace é o ar. Isso muda tudo. O ar não tem conector, não tem LED de link, não respeita a parede da sala, não obedece ao limite do rack e não pertence apenas à sua empresa.\n        </p>\n        <p>\n          Imagine um escritório onde os usuários reclamam que a rede está lenta apenas em uma sala de reunião. O notebook mostra sinal cheio. O firewall não registra queda. O switch está normal. O link de internet está saudável. Mesmo assim, chamadas de vídeo travam, o ERP fica instável e alguns usuários caem do Wi-Fi por alguns segundos. Um diagnóstico apressado poderia culpar o provedor, o DNS ou o firewall. Mas a causa pode estar na camada física wireless: interferência, canal congestionado, ruído alto, AP longe demais, potência mal ajustada, largura de canal exagerada ou muitos clientes disputando o mesmo tempo de transmissão.\n        </p>\n        <div class=\"callout callout--problem\">\n          <strong>Problema real:</strong> em Wi-Fi, sinal forte não significa necessariamente rede boa. Uma rede pode ter RSSI aceitável e ainda assim sofrer com SNR ruim, canal saturado, interferência, retransmissões, baixa modulação, roaming ruim e alto consumo de airtime.\n        </div>\n        <p>\n          RF, ou radiofrequência, é o conjunto de conceitos que permite entender como o sinal viaja, por que ele enfraquece, por que canais colidem, por que bandas diferentes se comportam de forma diferente e por que um projeto wireless precisa considerar cobertura e capacidade. Sem esse fundamento, o profissional fica preso a explicações vagas como \"o sinal está fraco\" ou \"o roteador é ruim\". Com esse fundamento, ele começa a investigar evidências: banda, canal, largura de canal, RSSI, ruído, SNR, utilização de canal, quantidade de SSIDs, quantidade de clientes e tipo de aplicação.\n        </p>\n      </section>\n    ",
    "history": "\n      <section class=\"lesson-section lesson-section--history\">\n        <h2>2. História</h2>\n        <p>\n          A ideia de comunicação por rádio é muito anterior ao Wi-Fi. Rádio foi usado para comunicação militar, navegação, telefonia, televisão, comunicação pública, satélites e inúmeros sistemas industriais. O Wi-Fi aproveitou o princípio de transmitir informação por ondas eletromagnéticas, mas o colocou dentro de redes locais digitais, usando regras padronizadas para que diferentes fabricantes conseguissem interoperar.\n        </p>\n        <p>\n          A família IEEE 802.11 define especificações de redes locais sem fio nas camadas física e de controle de acesso ao meio. Essa família evoluiu ao longo de décadas para lidar com mais taxa de transmissão, mais usuários, ambientes mais densos, novas bandas e melhor eficiência. O IEEE descreve o 802.11be-2024 como uma alteração de PHY e MAC para permitir ao menos um modo de operação com até 30 Gbit/s no ponto de acesso de serviço MAC, mantendo compatibilidade e coexistência com dispositivos 802.11 legados nas bandas de 2.4 GHz, 5 GHz e 6 GHz.\n        </p>\n        <p>\n          Essa evolução não removeu o problema físico. Pelo contrário: quanto mais ambiciosa a rede, mais importante fica entender RF. Tecnologias como OFDM, MIMO, OFDMA, canais mais largos, modulações mais densas e operação em 6 GHz melhoram capacidade, mas exigem planejamento. Uma rede antiga em 2.4 GHz com poucos dispositivos podia funcionar de maneira aceitável com decisões simples. Uma rede moderna com notebooks, celulares, voz, vídeo, IoT, visitantes, WPA3, múltiplos APs e cloud exige projeto, telemetria e manutenção.\n        </p>\n        <p>\n          A segurança também acompanhou essa evolução. O NIST SP 800-97 explica que WEP era inerentemente falho e que 802.11i trouxe uma abordagem mais robusta para segurança wireless. Mas segurança de Wi-Fi não é apenas criptografia. Um ambiente com RF mal planejado pode empurrar usuários para redes alternativas, hotspots pessoais, SSIDs falsos ou redes guest indevidas. Uma rede instável vira risco operacional e também risco de segurança.\n        </p>\n      </section>\n    ",
    "problem": "\n      <section class=\"lesson-section lesson-section--problem\">\n        <h2>3. Problema</h2>\n        <p>\n          O problema técnico de RF em Wi-Fi é que vários transmissores precisam usar um meio compartilhado, sujeito a regras regulatórias, interferência, atenuação, reflexão e ruído. No cabo, você costuma diagnosticar enlace, velocidade negociada, duplex, erro de interface e caminho lógico. No Wi-Fi, você precisa também diagnosticar o ambiente físico invisível.\n        </p>\n        <p>\n          Um cliente Wi-Fi não fala quando quiser sem consequência. Ele precisa disputar o meio. Se o canal está ocupado, ele espera. Se o quadro não chega bem, há retransmissão. Se o ruído está alto, a modulação pode cair. Se a largura de canal é grande demais para um ambiente congestionado, a rede pode ter mais colisão e menos eficiência real. Se a potência do AP está alta demais, clientes podem ficar presos a APs distantes. Se está baixa demais, surgem buracos de cobertura.\n        </p>\n        <ul class=\"flow-list\">\n          <li><strong>Cobertura:</strong> o sinal chega com intensidade suficiente até o cliente?</li>\n          <li><strong>Qualidade:</strong> o sinal é suficientemente mais forte que o ruído?</li>\n          <li><strong>Capacidade:</strong> há airtime suficiente para a quantidade de clientes e aplicações?</li>\n          <li><strong>Coexistência:</strong> canais vizinhos, redes próximas e dispositivos não Wi-Fi estão atrapalhando?</li>\n          <li><strong>Regulamentação:</strong> a banda, o canal e a potência são permitidos no país e no tipo de ambiente?</li>\n          <li><strong>Segurança:</strong> o desenho de RF reduz exposição desnecessária e facilita detecção?</li>\n        </ul>\n        <div class=\"callout callout--warning\">\n          <strong>Erro comum:</strong> avaliar Wi-Fi apenas pela quantidade de barrinhas no sistema operacional. Barrinhas são simplificações visuais. O diagnóstico profissional precisa de métricas, contexto, comparação e evidência.\n        </div>\n      </section>\n    ",
    "evolution": "\n      <section class=\"lesson-section lesson-section--evolution\">\n        <h2>4. Evolução</h2>\n        <p>\n          A evolução do Wi-Fi pode ser vista como uma tentativa constante de usar melhor o espectro disponível. Em vez de apenas aumentar potência, a tecnologia melhorou modulação, codificação, múltiplas antenas, largura de canal, eficiência de acesso ao meio, agendamento e uso de bandas menos congestionadas. Isso não significa que padrões novos sempre resolvem redes ruins. Um AP moderno mal posicionado continua sendo um AP mal posicionado.\n        </p>\n        <table class=\"comparison-table\">\n          <thead>\n            <tr>\n              <th>Abordagem</th>\n              <th>Como funcionava</th>\n              <th>Limitação</th>\n              <th>O que veio depois</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>2.4 GHz dominante</td>\n              <td>Boa propagação e compatibilidade ampla.</td>\n              <td>Poucos canais não sobrepostos e muita interferência de redes vizinhas e dispositivos domésticos.</td>\n              <td>Uso mais intenso de 5 GHz e, depois, 6 GHz.</td>\n            </tr>\n            <tr>\n              <td>Canais estreitos</td>\n              <td>Menor taxa máxima, porém melhor coexistência em ambientes densos.</td>\n              <td>Capacidade limitada para aplicações modernas.</td>\n              <td>40, 80, 160 e 320 MHz em cenários compatíveis.</td>\n            </tr>\n            <tr>\n              <td>Mais potência</td>\n              <td>Tentativa simples de aumentar alcance.</td>\n              <td>Pode piorar roaming, aumentar interferência e criar assimetria entre AP e cliente.</td>\n              <td>Planejamento de células, potência controlada e site survey.</td>\n            </tr>\n            <tr>\n              <td>Rede baseada em cobertura</td>\n              <td>Garantir que o sinal chegue em todos os locais.</td>\n              <td>Não garante capacidade para muitos clientes ou aplicações sensíveis.</td>\n              <td>Projeto baseado em cobertura, capacidade, aplicação e experiência.</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi moderno</td>\n              <td>Usa recursos como OFDMA, MU-MIMO, 6 GHz e, em Wi-Fi 7, operação multi-link.</td>\n              <td>Exige clientes compatíveis, planejamento e validação real.</td>\n              <td>Arquiteturas com automação, telemetria, controladoras e troubleshooting orientado por evidência.</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n    ",
    "concept": "\n      <section class=\"lesson-section lesson-section--concept\">\n        <h2>5. Conceito</h2>\n        <p>\n          RF, no contexto de Wi-Fi, é o uso de ondas de rádio para transportar informação entre estações e pontos de acesso. Frequência indica quantas oscilações por segundo a onda possui. Banda é uma faixa de frequências disponível para uso. Canal é uma divisão lógica dessa faixa. Largura de canal é quanto espaço espectral aquele canal ocupa. Potência indica intensidade de transmissão. Ruído é energia indesejada no mesmo ambiente. RSSI estima a intensidade do sinal recebido. SNR compara a força do sinal útil com o ruído.\n        </p>\n        <div class=\"definition-box\">\n          <strong>Definição prática:</strong> uma rede Wi-Fi boa não é apenas uma rede com sinal forte. É uma rede em que o sinal útil chega com qualidade suficiente, em canal adequado, com ruído controlado, capacidade disponível, clientes bem distribuídos e políticas corretas de segurança e acesso.\n        </div>\n        <p>\n          As três bandas mais importantes para Wi-Fi moderno são 2.4 GHz, 5 GHz e 6 GHz. Em geral, 2.4 GHz alcança mais longe e atravessa melhor obstáculos, mas tem menos canais úteis e costuma ser mais congestionada. 5 GHz oferece mais canais e melhor capacidade, mas alcance menor que 2.4 GHz. 6 GHz amplia bastante o espectro disponível para Wi-Fi 6E e Wi-Fi 7 em regiões onde é permitido, mas exige equipamentos compatíveis e atenção regulatória.\n        </p>\n        <table class=\"comparison-table\">\n          <thead>\n            <tr>\n              <th>Métrica</th>\n              <th>O que mede</th>\n              <th>Como interpretar</th>\n              <th>Erro comum</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>RSSI</td>\n              <td>Intensidade do sinal recebido.</td>\n              <td>Quanto menos negativo, normalmente mais forte o sinal.</td>\n              <td>Achar que RSSI alto sempre significa boa experiência.</td>\n            </tr>\n            <tr>\n              <td>Ruído</td>\n              <td>Energia indesejada no ambiente.</td>\n              <td>Ruído alto reduz a capacidade de distinguir o sinal útil.</td>\n              <td>Ignorar ruído porque as barras de sinal parecem boas.</td>\n            </tr>\n            <tr>\n              <td>SNR</td>\n              <td>Diferença entre sinal e ruído.</td>\n              <td>Quanto maior, melhor a margem para comunicação estável.</td>\n              <td>Olhar só sinal e não comparar com ruído.</td>\n            </tr>\n            <tr>\n              <td>Utilização de canal</td>\n              <td>Quanto tempo o canal fica ocupado.</td>\n              <td>Canal muito ocupado gera espera, latência e retransmissões.</td>\n              <td>Achar que canal livre é apenas canal sem outro SSID visível.</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n    ",
    "internals": "\n      <section class=\"lesson-section lesson-section--internals\">\n        <h2>6. Funcionamento interno</h2>\n        <p>\n          Para entender Wi-Fi internamente, pense em uma sequência de decisões físicas e lógicas. Primeiro, o cliente escuta o ambiente. Ele procura beacons ou envia probes. Depois identifica SSIDs e BSSIDs disponíveis, observa banda, canal, capacidades e intensidade de sinal. Em seguida decide com qual BSSID tentar associação. Depois vêm autenticação, associação, negociação de recursos, criptografia e, finalmente, obtenção de IP e uso da rede.\n        </p>\n        <ol class=\"flow-list\">\n          <li><strong>Escuta do ambiente:</strong> o cliente verifica quais redes e APs estão visíveis em cada banda.</li>\n          <li><strong>Medição de sinal:</strong> o cliente observa RSSI, ruído estimado, capacidades e qualidade percebida.</li>\n          <li><strong>Escolha de canal e BSSID:</strong> o cliente escolhe uma célula Wi-Fi, nem sempre a ideal do ponto de vista da rede.</li>\n          <li><strong>Disputa pelo meio:</strong> transmissões precisam compartilhar o canal com outros clientes, APs e fontes de interferência.</li>\n          <li><strong>Modulação e taxa:</strong> dependendo da qualidade do enlace, a taxa física pode subir ou cair.</li>\n          <li><strong>Retransmissão:</strong> quadros perdidos ou corrompidos geram novas tentativas, consumindo airtime.</li>\n          <li><strong>Encaminhamento:</strong> depois de chegar ao AP, o tráfego segue para VLAN, switch, gateway, firewall e serviços.</li>\n        </ol>\n        <p>\n          Um ponto importante é que throughput real não é igual à taxa PHY exibida. A taxa PHY é uma taxa física bruta em condições específicas. O throughput percebido pela aplicação sofre overhead de protocolo, disputa pelo meio, ACKs, retransmissões, criptografia, direção do tráfego, capacidade do cliente, número de fluxos espaciais, interferência e políticas da rede. Por isso, prometer velocidade apenas pela geração Wi-Fi ou pela largura de canal é perigoso.\n        </p>\n        <div class=\"callout callout--mentor\">\n          <strong>Modelo mental:</strong> RSSI responde \"o sinal chega forte?\"; SNR responde \"o sinal chega distinguível do ruído?\"; canal responde \"há espaço no ar para falar?\"; capacidade responde \"há tempo suficiente para todos?\".\n        </div>\n      </section>\n    ",
    "architecture": "\n      <section class=\"lesson-section lesson-section--architecture\">\n        <h2>7. Arquitetura</h2>\n        <p>\n          Em uma arquitetura wireless corporativa, RF é a fundação invisível sobre a qual o resto é construído. Autenticação, VLAN, firewall, DNS e aplicação só entram em cena depois que a estação consegue manter um enlace minimamente estável com o AP. Quando RF está ruim, camadas superiores parecem falhar de forma intermitente. O usuário não diz \"meu SNR está baixo\"; ele diz \"o sistema cai\".\n        </p>\n        <ul>\n          <li><strong>Camada envolvida:</strong> principalmente camada física e camada de enlace.</li>\n          <li><strong>Componentes envolvidos:</strong> cliente, antena, rádio, AP, controladora, canal, banda, potência, obstáculos e fontes de interferência.</li>\n          <li><strong>Dependências:</strong> regulamentação local, hardware compatível, drivers, firmware, planejamento de canais, densidade de clientes e desenho de SSIDs.</li>\n          <li><strong>Pontos de falha:</strong> canal congestionado, ruído alto, AP mal posicionado, potência inadequada, banda errada, cliente antigo, driver ruim, muitos SSIDs e largura de canal incompatível com o ambiente.</li>\n        </ul>\n        <p>\n          Em empresas, o desenho de RF costuma ser separado em objetivos: cobertura para áreas comuns, capacidade para salas densas, baixa latência para voz e vídeo, segregação para visitantes e IoT, e estabilidade para dispositivos críticos. Em uma fábrica, o objetivo pode ser confiabilidade para coletores e equipamentos industriais. Em um hospital, pode ser mobilidade e baixa interrupção. Em uma escola, pode ser densidade em salas de aula. Cada cenário muda o projeto.\n        </p>\n      </section>\n    ",
    "analogy": "\n      <section class=\"lesson-section lesson-section--analogy\">\n        <h2>8. Analogia</h2>\n        <p>\n          Imagine uma sala cheia de pessoas tentando conversar. Frequência é como o tipo de voz usada. Canal é como uma mesa ou grupo de conversa. Largura de canal é como ocupar uma mesa pequena ou várias mesas ao mesmo tempo. Potência é o volume da fala. Ruído é o barulho de fundo. RSSI é o quão alto você escuta a pessoa que interessa. SNR é a diferença entre a voz dela e o barulho da sala.\n        </p>\n        <p>\n          Se a pessoa fala baixo, você não entende. Se ela fala alto, mas todo mundo também grita, você também não entende. Se ela ocupa várias mesas com uma conversa enorme, pode atrapalhar outros grupos. Se há muitas pessoas na mesma mesa, cada uma espera sua vez e a conversa fica lenta. Se alguém do lado de fora escuta a conversa, existe também um risco de privacidade.\n        </p>\n        <div class=\"callout callout--warning\">\n          <strong>Limite da analogia:</strong> rádio não funciona exatamente como som audível. Ondas eletromagnéticas têm propagação, reflexão, absorção, polarização, antenas, modulação e regras regulatórias. A analogia ajuda a entender disputa e ruído, mas não substitui medição.\n        </div>\n      </section>\n    ",
    "simpleExample": "\n      <section class=\"lesson-section lesson-section--example\">\n        <h2>9. Exemplo simples</h2>\n        <p>\n          Em casa, você pode notar que o Wi-Fi funciona bem perto do roteador, mas fica ruim no quarto mais distante. Esse é um caso clássico de atenuação: paredes, distância, móveis e interferências reduzem a qualidade do sinal. Mas também existe o caso inverso: você está perto do roteador, vê sinal forte, e mesmo assim a rede está ruim. Isso pode acontecer se o canal estiver congestionado, se houver muitos dispositivos transmitindo, se um forno de micro-ondas ou outro equipamento gerar interferência, ou se o roteador estiver usando largura de canal inadequada para o ambiente.\n        </p>\n        <p>\n          Outro exemplo comum é a diferença entre 2.4 GHz e 5 GHz. Às vezes 2.4 GHz aparece com sinal mais forte no fundo da casa, mas entrega menos desempenho porque há muitos vizinhos usando canais próximos. Já 5 GHz pode aparecer com sinal um pouco mais fraco, mas funcionar melhor por ter mais canais disponíveis e menos congestionamento. A escolha certa não é \"sempre 2.4\" nem \"sempre 5\"; depende de distância, obstáculos, cliente, interferência e aplicação.\n        </p>\n      </section>\n    ",
    "enterpriseExample": "\n      <section class=\"lesson-section lesson-section--enterprise\">\n        <h2>10. Exemplo empresarial</h2>\n        <p>\n          Em uma empresa, RF vira uma disciplina de projeto. Não basta instalar APs onde há tomada disponível. É preciso considerar planta baixa, materiais das paredes, densidade de usuários, aplicações críticas, dispositivos legados, canais, potência, largura de canal, roaming e separação por SSID ou perfil de acesso. Um auditório com 80 pessoas tem exigência diferente de um corredor. Uma sala de diretoria com videoconferência exige estabilidade. Um galpão com coletores exige cobertura contínua e previsível.\n        </p>\n        <p>\n          Um erro comum é aumentar potência dos APs para \"resolver\" cobertura. Isso pode causar células grandes demais, interferência entre APs e clientes presos a APs distantes. Outro erro é criar muitos SSIDs: cada SSID anuncia beacons periodicamente e consome airtime. A Cisco, em diretrizes de site survey, recomenda reduzir a quantidade de SSIDs transmitidos porque cada SSID envia beacons periodicamente e isso consome tempo de rádio.\n        </p>\n        <p>\n          O desenho profissional normalmente combina site survey, escolha de bandas, planejamento de canais, potência controlada, definição de SSIDs, autenticação forte, VLANs, firewall, monitoramento e documentação. Em ambientes críticos, também se coletam métricas de utilização de canal, retry rate, taxa de associação, falhas de autenticação, roaming e experiência de aplicação.\n        </p>\n      </section>\n    ",
    "cloudExample": "\n      <section class=\"lesson-section lesson-section--cloud\">\n        <h2>11. Exemplo em cloud</h2>\n        <p>\n          RF não existe dentro da VPC ou VNet do provedor cloud da mesma forma que existe em uma sala física. Porém, a experiência de cloud muitas vezes começa no Wi-Fi do usuário. Um usuário em uma rede wireless ruim pode culpar um sistema hospedado na AWS, Azure ou Google Cloud, quando a falha está no enlace local. Para troubleshooting de aplicações cloud, separar RF de DNS, TLS, proxy, firewall e serviço é essencial.\n        </p>\n        <p>\n          Cloud também aparece no gerenciamento wireless. Muitos fabricantes usam controladoras em nuvem, telemetria centralizada, dashboards, análise de experiência, alertas e inventário. Isso não elimina RF. A nuvem pode mostrar que uma área tem SNR ruim ou alta utilização de canal, mas não move parede, não remove interferência e não muda a física. O time ainda precisa interpretar métricas e agir no ambiente real.\n        </p>\n        <p>\n          Em projetos de filiais modernas, é comum que o Wi-Fi local dê acesso a aplicações SaaS, sistemas internos via VPN, ZTNA ou SD-WAN, e serviços hospedados em cloud. A experiência do usuário depende da corrente inteira: RF, AP, switch, firewall, DNS, proxy, internet, backbone do provedor, cloud e aplicação.\n        </p>\n      </section>\n    ",
    "devsecopsExample": "\n      <section class=\"lesson-section lesson-section--devsecops\">\n        <h2>12. Exemplo em DevSecOps</h2>\n        <p>\n          Em DevSecOps, RF aparece indiretamente em automação, observabilidade e confiabilidade de ambientes corporativos. Um pipeline pode estar perfeito, uma aplicação pode ter sido publicada corretamente, o TLS pode estar válido, mas usuários em uma área com Wi-Fi ruim terão experiência instável. Isso afeta testes, suporte, incidentes e percepção de qualidade.\n        </p>\n        <p>\n          Também há relação com infraestrutura como código e automação operacional. Configurações de SSID, VLAN, política, autenticação, potência e canais podem ser documentadas, versionadas ou aplicadas por controladoras e APIs, dependendo da plataforma. O ponto de maturidade é tratar Wi-Fi como infraestrutura gerenciável, não como um conjunto de roteadores isolados configurados manualmente.\n        </p>\n        <p>\n          Para times de plataforma, a lição é clara: métricas de aplicação não bastam. Se o usuário acessa por Wi-Fi, a experiência ponta a ponta inclui a borda wireless. Dashboards de SLO podem precisar correlacionar queixas de aplicação com local físico, SSID, AP, banda, canal, SNR, DHCP, DNS e política de acesso.\n        </p>\n      </section>\n    ",
    "securityExample": "\n      <section class=\"lesson-section lesson-section--security\">\n        <h2>13. Exemplo em Segurança</h2>\n        <p>\n          Segurança wireless começa antes da senha. O alcance do sinal, a exposição fora do prédio, a segmentação, a autenticação, os logs, o monitoramento de APs suspeitos e a resposta a anomalias fazem parte da defesa. RF mal planejado pode facilitar conexões fracas, roaming instável, queda para redes alternativas e dificuldade de investigação.\n        </p>\n        <table class=\"risk-table\">\n          <thead>\n            <tr>\n              <th>Risco</th>\n              <th>Como aparece</th>\n              <th>Impacto</th>\n              <th>Mitigação</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Sinal vazando além do necessário</td>\n              <td>SSID corporativo visível longe do perímetro físico.</td>\n              <td>Aumenta superfície de exposição e tentativas de associação.</td>\n              <td>Planejar potência, posicionamento, autenticação forte, logs e monitoramento.</td>\n            </tr>\n            <tr>\n              <td>SNR ruim</td>\n              <td>Retransmissões, quedas e baixa taxa física.</td>\n              <td>Usuários migram para hotspot pessoal ou redes não gerenciadas.</td>\n              <td>Site survey, ajuste de canal, remoção de interferência e melhoria de cobertura.</td>\n            </tr>\n            <tr>\n              <td>Canal saturado</td>\n              <td>Alta latência e baixa qualidade em chamadas.</td>\n              <td>Incidentes falsamente atribuídos à aplicação ou cloud.</td>\n              <td>Reduzir SSIDs, ajustar largura de canal, distribuir clientes e monitorar airtime.</td>\n            </tr>\n            <tr>\n              <td>Uso de banda inadequada</td>\n              <td>Clientes críticos presos em 2.4 GHz congestionado.</td>\n              <td>Instabilidade e degradação de experiência.</td>\n              <td>Band steering com validação, políticas por perfil e suporte a clientes compatíveis.</td>\n            </tr>\n          </tbody>\n        </table>\n        <div class=\"callout callout--security\">\n          <strong>Limite ético:</strong> nesta aula você irá observar apenas suas próprias redes ou ambientes autorizados. Não tente capturar, derrubar, interferir ou mapear redes de terceiros.\n        </div>\n      </section>\n    ",
    "diagram": "\n      <section class=\"lesson-section lesson-section--diagram\">\n        <h2>14. Diagrama SVG</h2>\n        <p>\n          O diagrama abaixo mostra que a experiência Wi-Fi nasce da diferença entre sinal útil, ruído e ocupação do canal. O cliente não depende apenas da distância até o AP; ele depende do ambiente inteiro.\n        </p>\n        <svg class=\"lesson-svg\" viewBox=\"0 0 980 520\" role=\"img\" aria-labelledby=\"rf-title rf-desc\">\n          <title id=\"rf-title\">RF, sinal, ruído, canal e SNR em Wi-Fi</title>\n          <desc id=\"rf-desc\">Um ponto de acesso transmite para um cliente. O sinal útil compete com ruído, interferência e outras redes no mesmo canal.</desc>\n          <defs>\n            <marker id=\"arrow-rf-1202\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n              <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n            </marker>\n          </defs>\n\n          <rect x=\"40\" y=\"60\" width=\"900\" height=\"390\" rx=\"18\" class=\"svg-zone\" />\n          <text x=\"490\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Meio compartilhado: o ar</text>\n\n          <rect x=\"90\" y=\"190\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--router\" />\n          <text x=\"170\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">AP</text>\n          <text x=\"170\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Canal 36 / 80 MHz</text>\n\n          <rect x=\"730\" y=\"190\" width=\"160\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n          <text x=\"810\" y=\"225\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n          <text x=\"810\" y=\"252\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RSSI e SNR</text>\n\n          <path d=\"M250 220 C390 120, 560 120, 730 220\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-rf-1202)\" />\n          <text x=\"490\" y=\"145\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Sinal útil</text>\n\n          <rect x=\"395\" y=\"290\" width=\"190\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--security\" />\n          <text x=\"490\" y=\"320\" text-anchor=\"middle\" class=\"svg-label\">Ruído</text>\n          <text x=\"490\" y=\"346\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Interferência / ocupação</text>\n\n          <path d=\"M420 290 C360 250, 350 215, 290 215\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-rf-1202)\" />\n          <path d=\"M560 290 C620 250, 650 220, 730 225\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-rf-1202)\" />\n\n          <rect x=\"110\" y=\"370\" width=\"230\" height=\"44\" rx=\"12\" class=\"svg-badge\" />\n          <text x=\"225\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RSSI: força recebida</text>\n\n          <rect x=\"380\" y=\"370\" width=\"230\" height=\"44\" rx=\"12\" class=\"svg-badge\" />\n          <text x=\"495\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SNR: sinal acima do ruído</text>\n\n          <rect x=\"650\" y=\"370\" width=\"230\" height=\"44\" rx=\"12\" class=\"svg-badge\" />\n          <text x=\"765\" y=\"398\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Canal: tempo compartilhado</text>\n\n          <text x=\"490\" y=\"475\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Diagnóstico profissional = sinal + ruído + canal + cliente + aplicação</text>\n        </svg>\n      </section>\n    ",
    "labIntro": "\n      <section class=\"lesson-section lesson-section--lab\">\n        <h2>15. Laboratório</h2>\n        <p>\n          O laboratório desta aula é defensivo e local. Você irá coletar evidências básicas de RF da sua própria rede ou de um ambiente autorizado: SSID, BSSID, banda, canal, intensidade de sinal, taxa e, quando possível, ruído ou qualidade estimada. O objetivo não é invadir, derrubar ou capturar tráfego de terceiros. O objetivo é aprender a observar o meio wireless com método.\n        </p>\n      </section>\n    ",
    "exercisesIntro": "\n      <section class=\"lesson-section lesson-section--exercises\">\n        <h2>16. Exercícios</h2>\n        <p>\n          Os exercícios pedem interpretação ativa. Não basta decorar que 5 GHz é mais rápido ou que 2.4 GHz alcança mais. Você deve justificar escolhas considerando ambiente, aplicação, densidade, interferência, segurança e custo operacional.\n        </p>\n      </section>\n    ",
    "challengeIntro": "\n      <section class=\"lesson-section lesson-section--challenge\">\n        <h2>17. Desafio</h2>\n        <p>\n          O desafio simula uma situação real: uma empresa com reclamações em salas específicas, múltiplos SSIDs, muitos clientes e suspeita de interferência. Você deverá propor um plano de investigação e melhoria sem sair alterando potência e canais às cegas.\n        </p>\n      </section>\n    ",
    "solutionIntro": "\n      <section class=\"lesson-section lesson-section--solution\">\n        <h2>18. Solução comentada</h2>\n        <p>\n          A solução comentada ensina a raciocinar: separar hipótese de evidência, evitar conclusões apressadas e transformar observações de RF em ações controladas.\n        </p>\n      </section>\n    ",
    "summary": "\n      <section class=\"lesson-section lesson-section--summary\">\n        <h2>19. Resumo</h2>\n        <ul>\n          <li><strong>Ideia central:</strong> Wi-Fi usa RF; o ar é um meio compartilhado, disputado e sujeito a ruído.</li>\n          <li><strong>O que lembrar:</strong> RSSI mede força recebida; SNR mede margem entre sinal e ruído; canal mede onde a conversa acontece.</li>\n          <li><strong>Erro comum:</strong> achar que barras de sinal ou velocidade nominal explicam a experiência real.</li>\n          <li><strong>Uso real:</strong> troubleshooting wireless exige evidência de banda, canal, potência, ruído, clientes, retransmissões, airtime e aplicação.</li>\n          <li><strong>Segurança:</strong> RF mal planejado aumenta exposição, instabilidade e uso de alternativas não gerenciadas.</li>\n        </ul>\n      </section>\n    ",
    "nextTheme": "\n      <section class=\"lesson-section lesson-section--next\">\n        <h2>20. Próximo tema</h2>\n        <p>\n          Agora que você entende RF, frequência, canais, RSSI e SNR, o próximo passo é estudar os padrões 802.11 e as gerações Wi-Fi. A aula 12.3 mostrará como Wi-Fi 4, 5, 6, 6E e 7 evoluíram para usar melhor o meio sem fio, aumentar eficiência, melhorar capacidade e lidar com ambientes densos.\n        </p>\n      </section>\n    "
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace"
    ],
    "tcpIpLayers": [
      "Acesso à rede"
    ],
    "relatedProtocols": [
      "IEEE 802.11",
      "802.11ax",
      "802.11be",
      "WPA2",
      "WPA3",
      "802.1X"
    ],
    "dependsOn": [
      "Modelo OSI",
      "Wi-Fi como acesso local",
      "Endereço MAC",
      "Quadros",
      "VLANs"
    ],
    "enables": [
      "Projeto de cobertura",
      "Troubleshooting Wi-Fi",
      "Roaming",
      "Wi-Fi corporativo",
      "Segurança wireless"
    ]
  },
  "wirelessMetrics": [
    {
      "metric": "RSSI",
      "meaning": "Received Signal Strength Indicator, uma estimativa da intensidade do sinal recebido pelo cliente.",
      "typicalInterpretation": "Valores menos negativos tendem a indicar sinal mais forte, mas escalas podem variar por fabricante.",
      "caution": "Não avalia sozinho ruído, canal, retransmissões nem experiência de aplicação."
    },
    {
      "metric": "SNR",
      "meaning": "Signal-to-Noise Ratio, relação entre sinal útil e ruído.",
      "typicalInterpretation": "Quanto maior a diferença entre sinal e ruído, melhor a margem para comunicação estável.",
      "caution": "SNR bom ainda pode coexistir com canal saturado ou problema em camada superior."
    },
    {
      "metric": "Channel utilization",
      "meaning": "Percentual de tempo em que o canal está ocupado.",
      "typicalInterpretation": "Alta utilização aumenta espera, latência e chance de degradação.",
      "caution": "Nem toda ocupação vem de SSID visível; pode haver fontes não Wi-Fi."
    },
    {
      "metric": "Channel width",
      "meaning": "Largura espectral usada por uma transmissão, como 20, 40, 80, 160 ou 320 MHz, quando suportado.",
      "typicalInterpretation": "Canais mais largos podem aumentar taxa máxima, mas reduzem opções de coexistência e podem piorar redes densas.",
      "caution": "Mais largura não significa melhor experiência em todo cenário."
    }
  ],
  "deepDive": {
    "mentalModel": "Wi-Fi é uma conversa digital no ar. Para a conversa ser boa, a voz do AP e do cliente precisa ser suficientemente forte, distinguível do ruído e transmitida em um canal com tempo disponível.",
    "keyTerms": [
      "RF",
      "frequência",
      "banda",
      "canal",
      "largura de canal",
      "RSSI",
      "SNR",
      "ruído",
      "interferência",
      "airtime"
    ],
    "limitations": [
      "Métricas de cliente variam por sistema operacional, driver, chipset e fabricante.",
      "RSSI não mede experiência fim a fim.",
      "SNR não substitui análise de utilização de canal e retransmissões.",
      "Ferramentas gratuitas podem não mostrar ruído real ou métricas avançadas.",
      "Sem site survey profissional, a análise é aproximada e deve ser tratada como triagem."
    ],
    "whenToUse": [
      "Ao investigar lentidão ou instabilidade em áreas específicas.",
      "Ao projetar APs, canais, bandas e largura de canal.",
      "Ao diferenciar problema de Wi-Fi de problema de DNS, gateway, firewall ou aplicação.",
      "Ao planejar ambientes com voz, vídeo, alta densidade, IoT ou mobilidade."
    ],
    "whenNotToUse": [
      "Não use RF como explicação automática para toda falha de aplicação.",
      "Não altere potência e canal em produção sem baseline, janela e plano de rollback.",
      "Não faça varredura, captura ou análise em redes de terceiros sem autorização explícita."
    ],
    "operationalImpact": [
      "Exige documentação de SSIDs, bandas, canais, potência e áreas atendidas.",
      "Exige monitoramento contínuo em ambientes corporativos, pois o ambiente de RF muda.",
      "Exige treinamento do suporte para separar RF, autenticação, DHCP, DNS e aplicação.",
      "Pode exigir site survey e revisão quando layout físico ou densidade de usuários muda."
    ],
    "financialImpact": [
      "Pode exigir APs corporativos, controladora, licenças, sensores, ferramentas de site survey ou consultoria especializada.",
      "APs demais ou mal posicionados aumentam custo e podem piorar interferência.",
      "APs de menos reduzem custo inicial, mas aumentam incidentes e perda de produtividade.",
      "Uso de plataformas cloud-managed pode gerar custo recorrente por dispositivo ou licença."
    ],
    "securityImpact": [
      "RF define até onde a rede é audível e influencia a superfície de exposição.",
      "Instabilidade incentiva usuários a usar hotspots ou redes não gerenciadas.",
      "Muitos SSIDs e segmentação ruim dificultam governança.",
      "Métricas e logs wireless ajudam investigação de incidentes e detecção de anomalias."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Avaliar Wi-Fi apenas pelas barras de sinal.",
      "whyItHappens": "O sistema operacional simplifica a experiência para o usuário final.",
      "consequence": "O suporte ignora ruído, canal, interferência, retransmissões e capacidade.",
      "correction": "Coletar SSID, BSSID, banda, canal, RSSI, taxa, ruído quando disponível, utilização e sintomas de aplicação."
    },
    {
      "mistake": "Aumentar potência de todos os APs para resolver cobertura.",
      "whyItHappens": "Parece uma solução intuitiva: se o sinal é fraco, transmita mais forte.",
      "consequence": "Pode gerar interferência, roaming ruim e clientes presos a APs distantes.",
      "correction": "Ajustar potência com base em célula, cliente, planta, canal, densidade e validação."
    },
    {
      "mistake": "Usar canais muito largos em ambiente congestionado.",
      "whyItHappens": "A largura maior promete velocidades máximas maiores no marketing.",
      "consequence": "Menos canais independentes, mais sobreposição, mais contenção e desempenho real menor.",
      "correction": "Escolher largura conforme densidade, banda, quantidade de APs, clientes e objetivo de capacidade."
    },
    {
      "mistake": "Ignorar 2.4 GHz porque 5 GHz ou 6 GHz parecem modernos.",
      "whyItHappens": "Gerações novas são associadas a melhor desempenho.",
      "consequence": "Dispositivos IoT, legados ou áreas distantes podem perder conectividade.",
      "correction": "Planejar cada banda conforme dispositivos, cobertura, aplicações e risco."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuários com sinal aparentemente bom relatam lentidão.",
      "Chamadas de vídeo travam em salas específicas.",
      "Clientes alternam entre APs ou bandas de forma instável.",
      "Dispositivos conectam, mas apresentam baixa taxa física.",
      "Rede funciona bem em alguns horários e mal em outros.",
      "Problema afeta apenas uma região física do prédio."
    ],
    "diagnosticQuestions": [
      "O problema ocorre em qual local físico?",
      "Afeta todos os dispositivos ou apenas um modelo/sistema operacional?",
      "O cliente está em 2.4 GHz, 5 GHz ou 6 GHz?",
      "Qual BSSID/AP atende o cliente no momento da falha?",
      "Qual canal e largura de canal estão em uso?",
      "Há muitos SSIDs visíveis no mesmo canal?",
      "O problema ocorre em horários de alta densidade?",
      "Há mudança recente de layout, AP, firmware, driver ou mobiliário?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, rádio, canal, velocidade de recepção/transmissão e intensidade aproximada do sinal.",
        "expectedObservation": "A saída deve mostrar o SSID conectado, BSSID do AP, tipo de rádio, canal e porcentagem de sinal.",
        "interpretation": "Ajuda a confirmar se o cliente está no AP e canal esperados, mas não substitui métricas profissionais de ruído e SNR."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show networks mode=bssid",
        "purpose": "Listar redes visíveis e BSSIDs percebidos pelo cliente.",
        "expectedObservation": "Lista de SSIDs, BSSIDs, intensidade de sinal e canais visíveis.",
        "interpretation": "Ajuda a perceber concorrência por canal e múltiplos APs anunciando o mesmo SSID."
      },
      {
        "platform": "Linux",
        "command": "nmcli dev wifi list",
        "purpose": "Listar redes Wi-Fi visíveis com canal, taxa, sinal e segurança.",
        "expectedObservation": "Tabela com SSID, BSSID, canal, frequência, sinal e segurança.",
        "interpretation": "Bom para triagem; a coluna de sinal é simplificada e não deve ser usada isoladamente."
      },
      {
        "platform": "Linux",
        "command": "iw dev wlan0 link",
        "purpose": "Ver informações do enlace atual, como SSID, frequência, sinal e taxa de transmissão.",
        "expectedObservation": "Informações do AP conectado, frequência, sinal em dBm e taxas.",
        "interpretation": "Útil para observar variação de sinal ao se mover pelo ambiente."
      },
      {
        "platform": "Linux",
        "command": "sudo iw dev wlan0 scan | egrep 'SSID|signal|freq|DS Parameter set'",
        "purpose": "Coletar sinais e frequências de redes visíveis, quando permitido pelo driver.",
        "expectedObservation": "Lista de redes com SSID, sinal e frequência.",
        "interpretation": "Ajuda a mapear o ambiente sem capturar payload de terceiros."
      },
      {
        "platform": "Cisco IOS / WLC",
        "command": "show ap auto-rf dot11 5ghz summary",
        "purpose": "Observar informações de RRM/Auto RF em ambientes Cisco compatíveis.",
        "expectedObservation": "Resumo de canais, potência e estado RF dos APs.",
        "interpretation": "Útil em ambiente autorizado com controladora; comandos variam conforme plataforma e versão."
      }
    ],
    "decisionTree": [
      {
        "if": "RSSI está fraco em um local específico",
        "then": "Investigar cobertura, distância, obstáculos, posição do AP, potência e banda usada."
      },
      {
        "if": "RSSI está bom mas experiência está ruim",
        "then": "Investigar SNR, ruído, utilização de canal, retransmissões, largura de canal, quantidade de clientes e camada superior."
      },
      {
        "if": "Somente alguns modelos falham",
        "then": "Investigar driver, chipset, suporte a banda, política de segurança, roaming e compatibilidade."
      },
      {
        "if": "Problema ocorre em horários de pico",
        "then": "Investigar capacidade, airtime, quantidade de clientes, aplicações e uso de canal."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Planejar potência e cobertura para atender áreas necessárias sem expor sinal além do razoável.",
      "Usar autenticação forte e segmentação, especialmente em redes corporativas.",
      "Manter inventário de APs autorizados, SSIDs, BSSIDs e canais esperados.",
      "Monitorar falhas de associação, autenticação, roaming, APs desconhecidos e mudanças anormais de RF.",
      "Documentar decisões de banda, canal, largura de canal e política por SSID."
    ],
    "badPractices": [
      "Deixar todos os APs com potência máxima sem estudo.",
      "Criar muitos SSIDs sem necessidade operacional.",
      "Usar a mesma rede para funcionários, visitantes, IoT e administração.",
      "Aceitar que usuários usem hotspots pessoais como solução permanente para Wi-Fi ruim.",
      "Fazer testes em redes de terceiros ou capturar tráfego sem autorização."
    ],
    "commonErrors": [
      "Confundir cobertura com capacidade.",
      "Confundir taxa PHY com throughput real.",
      "Confundir sinal forte com SNR bom.",
      "Ignorar que clientes também transmitem e têm potência menor que APs.",
      "Tratar RF como configuração única e não como ambiente vivo."
    ],
    "vulnerabilities": [
      {
        "name": "Exposição RF além do perímetro",
        "description": "Sinal corporativo audível em áreas públicas ou externas aumenta a oportunidade de tentativas de associação e reconhecimento.",
        "defensiveExplanation": "O risco não significa que a rede será quebrada, mas aumenta superfície e volume de eventos a monitorar.",
        "mitigation": "Ajustar potência, posicionamento, autenticação forte, monitoramento e resposta a APs/SSIDs suspeitos."
      },
      {
        "name": "Fuga para redes não gerenciadas",
        "description": "Quando Wi-Fi corporativo é instável, usuários podem usar hotspots pessoais ou redes abertas.",
        "defensiveExplanation": "Isso reduz visibilidade, controle de tráfego, aplicação de políticas e capacidade de investigação.",
        "mitigation": "Melhorar RF, oferecer rede guest adequada, educar usuários e monitorar exceções."
      },
      {
        "name": "Diagnóstico sem evidência",
        "description": "Mudanças de canal e potência feitas por tentativa e erro podem piorar a rede e mascarar causa raiz.",
        "defensiveExplanation": "Alterações não controladas criam instabilidade e dificultam RCA.",
        "mitigation": "Usar baseline, coleta de evidências, janela de mudança, rollback e documentação."
      }
    ],
    "monitoring": [
      "Lista de APs e BSSIDs autorizados.",
      "Uso de canal por banda e por área.",
      "Falhas de associação e autenticação.",
      "Clientes com RSSI baixo ou taxa ruim persistente.",
      "Mudanças anormais de canal, potência e vizinhança RF.",
      "Reclamações correlacionadas por local físico e horário."
    ],
    "hardening": [
      "Reduzir SSIDs ao necessário.",
      "Separar redes por perfil e aplicar firewall entre segmentos.",
      "Usar WPA2/WPA3 adequadamente conforme compatibilidade e política.",
      "Desabilitar recursos legados quando possível e validado.",
      "Manter firmware e controladoras atualizados em janelas planejadas."
    ],
    "detectionIdeas": [
      "Comparar BSSIDs visíveis com inventário autorizado.",
      "Alertar variações anormais de utilização de canal em áreas críticas.",
      "Correlacionar falhas de autenticação com localização e AP.",
      "Investigar aumento de clientes migrando para redes guest ou hotspots.",
      "Registrar evidências antes e depois de mudanças de RF."
    ]
  },
  "lab": {
    "id": "lab-12.2",
    "title": "Coleta defensiva de evidências RF no Windows ou Linux",
    "labType": "troubleshooting",
    "objective": "Observar SSID, BSSID, banda, canal, sinal e redes vizinhas para criar um diagnóstico inicial de RF sem interferir em redes de terceiros.",
    "scenario": "Você recebeu reclamações de lentidão no Wi-Fi e precisa separar hipótese de RF de hipótese de IP, DNS, firewall ou aplicação. O laboratório será feito na sua própria rede ou em ambiente explicitamente autorizado.",
    "topology": "Notebook Wi-Fi -> AP autorizado -> switch/rede local -> gateway/DNS/internet ou serviço interno",
    "architecture": "Um cliente sem fio associado a um AP, usando uma banda e canal específicos, com redes vizinhas possivelmente competindo pelo meio.",
    "prerequisites": [
      "Ter permissão para observar a rede Wi-Fi usada no laboratório.",
      "Ter Windows com PowerShell/CMD ou Linux com NetworkManager/iw instalado.",
      "Conhecer o SSID da rede autorizada.",
      "Não executar captura de payload, deauth, interferência ou testes contra terceiros."
    ],
    "tools": [
      "Windows: netsh wlan",
      "Linux: nmcli e iw",
      "Opcional: Wireshark apenas para observar metadados em ambiente próprio/autorizado",
      "Bloco de notas ou planilha para registrar evidências"
    ],
    "estimatedTimeMinutes": 55,
    "cost": "zero",
    "safetyNotes": [
      "Observe apenas redes próprias ou autorizadas.",
      "Não tente descobrir senhas, derrubar clientes, forçar reassociação ou capturar tráfego de terceiros.",
      "Não altere canal, potência ou largura de canal em rede corporativa sem autorização e plano de mudança.",
      "Registre evidências sem expor MACs reais em relatórios públicos; anonimize quando necessário."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar contexto físico",
        "instruction": "Anote onde você está, distância aproximada até o AP se souber, quantidade aproximada de paredes e horário do teste.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Uma linha de contexto para interpretar as medições.",
        "explanation": "RF depende do ambiente. Sem contexto físico, números isolados perdem valor."
      },
      {
        "number": 2,
        "title": "Identificar conexão atual no Windows",
        "instruction": "Se estiver no Windows, execute o comando para ver a interface Wi-Fi conectada.",
        "command": "netsh wlan show interfaces",
        "expectedOutput": "SSID, BSSID, tipo de rádio, canal, velocidade de recepção/transmissão e sinal em porcentagem.",
        "explanation": "O BSSID identifica o AP específico. O canal e o tipo de rádio ajudam a saber se você está em 2.4 GHz, 5 GHz ou outra banda suportada."
      },
      {
        "number": 3,
        "title": "Listar redes visíveis no Windows",
        "instruction": "Ainda no Windows, liste redes visíveis e seus BSSIDs.",
        "command": "netsh wlan show networks mode=bssid",
        "expectedOutput": "Lista de SSIDs, BSSIDs, intensidade de sinal e canais.",
        "explanation": "Isso mostra a vizinhança RF percebida pelo cliente. Muitas redes no mesmo canal podem indicar contenção ou interferência co-canal."
      },
      {
        "number": 4,
        "title": "Identificar conexão atual no Linux",
        "instruction": "Se estiver no Linux, identifique a interface Wi-Fi e o enlace atual. Ajuste wlan0 se sua interface tiver outro nome.",
        "command": "iw dev\niw dev wlan0 link",
        "expectedOutput": "Nome da interface, SSID conectado, frequência, sinal em dBm e taxa de transmissão.",
        "explanation": "O Linux costuma mostrar sinal em dBm, o que ajuda mais do que porcentagem visual."
      },
      {
        "number": 5,
        "title": "Listar redes visíveis no Linux",
        "instruction": "Use nmcli para listar redes visíveis de forma simples.",
        "command": "nmcli dev wifi list",
        "expectedOutput": "Tabela com SSID, BSSID, canal, frequência, sinal, barras e segurança.",
        "explanation": "A saída permite comparar sua rede com redes próximas, canais e intensidade relativa."
      },
      {
        "number": 6,
        "title": "Fazer uma caminhada curta controlada",
        "instruction": "Repita a coleta em dois ou três pontos do mesmo ambiente: perto do AP, no local de reclamação e em uma área intermediária.",
        "command": "Windows: netsh wlan show interfaces\nLinux: iw dev wlan0 link",
        "expectedOutput": "Variação de sinal, canal, BSSID ou taxa entre os locais.",
        "explanation": "A comparação espacial ajuda a diferenciar problema de cobertura, roaming e ambiente local."
      },
      {
        "number": 7,
        "title": "Correlacionar com teste de camada superior",
        "instruction": "Depois de registrar RF, teste conectividade básica para não culpar RF por problema de IP, DNS ou aplicação.",
        "command": "Windows: ipconfig /all && ping <gateway> && nslookup exemplo.com\nLinux: ip addr && ip route && ping -c 4 <gateway> && dig exemplo.com",
        "expectedOutput": "IP válido, rota default, resposta do gateway e resolução DNS.",
        "explanation": "RF ruim pode causar sintomas, mas gateway e DNS também precisam ser validados."
      },
      {
        "number": 8,
        "title": "Montar tabela de evidências",
        "instruction": "Crie uma tabela com local, SSID, BSSID, banda/frequência, canal, sinal, taxa, gateway/DNS e sintoma percebido.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela comparando pelo menos dois pontos físicos.",
        "explanation": "Troubleshooting profissional exige evidência organizada, não memória solta."
      }
    ],
    "expectedResult": "Ao final, o aluno deve conseguir explicar em qual banda/canal está conectado, qual BSSID atende o cliente, como o sinal muda por local e se há indícios iniciais de concorrência de canal ou problema de camada superior.",
    "validation": [
      {
        "check": "SSID e BSSID identificados",
        "command": "Windows: netsh wlan show interfaces | findstr /i \"SSID BSSID Canal Sinal\"\nLinux: iw dev wlan0 link",
        "expected": "O aluno consegue apontar SSID, BSSID e canal/frequência da conexão atual.",
        "ifFails": "Verifique se o Wi-Fi está conectado, se a interface correta foi usada e se há permissão para executar o comando."
      },
      {
        "check": "Redes vizinhas observadas",
        "command": "Windows: netsh wlan show networks mode=bssid\nLinux: nmcli dev wifi list",
        "expected": "Lista de redes visíveis com canais e sinais aproximados.",
        "ifFails": "Atualize drivers, confirme que a interface Wi-Fi está ativa ou execute com permissões adequadas no Linux."
      },
      {
        "check": "Conectividade superior validada",
        "command": "ping <gateway> && nslookup exemplo.com",
        "expected": "Gateway responde e DNS resolve nomes em condições normais.",
        "ifFails": "Não conclua que é RF antes de verificar IP, gateway, DNS e firewall."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Comando Linux não mostra wlan0",
        "probableCause": "A interface Wi-Fi possui outro nome, como wlp2s0.",
        "howToConfirm": "Execute iw dev ou ip link.",
        "fix": "Substitua wlan0 pelo nome real da interface."
      },
      {
        "symptom": "Windows mostra sinal em porcentagem, não dBm",
        "probableCause": "A ferramenta netsh simplifica a métrica para usuário final.",
        "howToConfirm": "Compare com ferramenta do fabricante ou controladora, se houver.",
        "fix": "Use a porcentagem apenas como triagem e registre limitações."
      },
      {
        "symptom": "Muitas redes aparecem no mesmo canal",
        "probableCause": "Ambiente denso, vizinhos próximos ou planejamento de canal inadequado.",
        "howToConfirm": "Coletar evidências em horários diferentes e comparar com controladora/AP, se disponível.",
        "fix": "Planejar canais, largura, potência e reduzir SSIDs, sempre com autorização."
      },
      {
        "symptom": "Sinal varia muito ao caminhar poucos metros",
        "probableCause": "Reflexão, obstáculos, multipath, antena do cliente ou área de sombra.",
        "howToConfirm": "Repetir coleta em pontos fixos e comparar com outro dispositivo.",
        "fix": "Avaliar posicionamento de AP, obstáculos, potência e necessidade de site survey."
      }
    ],
    "improvements": [
      "Repetir o teste em horários de pico e fora de pico.",
      "Comparar dois dispositivos diferentes no mesmo local.",
      "Adicionar evidências de controladora wireless, se houver.",
      "Criar mapa simples com pontos de medição.",
      "Correlacionar reclamações de usuários com BSSID e horário."
    ],
    "evidenceToCollect": [
      "Local físico do teste.",
      "SSID e BSSID conectado.",
      "Banda/frequência e canal.",
      "Sinal informado pela ferramenta.",
      "Lista resumida de redes vizinhas por canal.",
      "Resultado de gateway e DNS.",
      "Sintoma observado pelo usuário."
    ],
    "questions": [
      "O problema parece mais cobertura, interferência, saturação ou camada superior?",
      "O cliente está no AP esperado ou em um BSSID distante?",
      "Há redes próximas usando o mesmo canal?",
      "A experiência piora em horários de maior ocupação?",
      "Que evidência ainda falta antes de alterar configuração?"
    ],
    "challenge": "Com base nas evidências coletadas em dois pontos físicos, escreva uma hipótese principal e duas hipóteses alternativas para a lentidão Wi-Fi. Indique quais dados adicionais seriam necessários antes de mudar canal ou potência.",
    "solution": "Uma boa resposta não promete causa definitiva com uma única medição. Ela separa evidências de hipóteses: por exemplo, RSSI baixo em um ponto sugere cobertura; RSSI bom com muitas redes no mesmo canal sugere contenção; ping ao gateway falhando junto com sinal variável sugere enlace local; DNS falhando com gateway estável sugere camada superior. Antes de mudar canal ou potência, colete dados em horários diferentes, compare dispositivos, valide na controladora e documente plano de rollback."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma rede Wi-Fi pode estar ruim mesmo com sinal aparentemente forte?",
      "hints": [
        "Pense em ruído e canal, não apenas em potência.",
        "Pense em muitos clientes compartilhando o mesmo meio.",
        "Pense em retransmissões e largura de canal."
      ],
      "expectedIdeas": [
        "SNR",
        "interferência",
        "canal saturado",
        "airtime",
        "retransmissões",
        "capacidade"
      ],
      "explanation": "Sinal forte é apenas uma parte do diagnóstico. A experiência depende de qualidade do sinal, ruído, uso de canal, quantidade de clientes e camadas superiores."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário reclama de lentidão em uma sala específica. Quais evidências de RF você coletaria antes de culpar o firewall?",
      "hints": [
        "Comece por local físico, SSID e BSSID.",
        "Verifique banda, canal e sinal.",
        "Depois valide gateway e DNS."
      ],
      "expectedIdeas": [
        "local",
        "BSSID",
        "banda",
        "canal",
        "RSSI",
        "redes vizinhas",
        "gateway",
        "DNS"
      ],
      "explanation": "O firewall pode ser causa, mas antes é preciso separar RF e conectividade local de políticas de tráfego."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer melhorar o Wi-Fi de um auditório. Por que simplesmente aumentar potência dos APs pode piorar o ambiente?",
      "hints": [
        "Pense em células grandes demais.",
        "Pense em clientes presos ao AP errado.",
        "Pense em interferência entre APs."
      ],
      "expectedIdeas": [
        "roaming ruim",
        "interferência",
        "assimetria AP-cliente",
        "canal",
        "capacidade",
        "planejamento"
      ],
      "explanation": "Potência precisa ser planejada junto com canal, densidade e posição dos APs. Aumentar tudo pode elevar ruído e degradar roaming."
    }
  ],
  "quiz": [
    {
      "id": "q12.2.1",
      "type": "conceito",
      "q": "O que o RSSI representa em uma análise Wi-Fi?",
      "opts": [
        "Uma estimativa da intensidade do sinal recebido pelo cliente",
        "A velocidade real da aplicação em megabytes por segundo",
        "A quantidade de usuários autenticados no firewall",
        "A garantia de que não existe interferência no canal"
      ],
      "a": 0,
      "exp": "RSSI indica intensidade de sinal recebido. Ele não garante throughput, ausência de ruído nem sucesso da aplicação.",
      "difficulty": "iniciante",
      "topic": "rssi"
    },
    {
      "id": "q12.2.2",
      "type": "comparação",
      "q": "Qual frase melhor descreve SNR?",
      "opts": [
        "A diferença ou relação entre sinal útil e ruído percebido",
        "O nome público da rede Wi-Fi",
        "O endereço MAC do AP",
        "A senha usada no WPA2-Personal"
      ],
      "a": 0,
      "exp": "SNR mede o quanto o sinal útil se destaca do ruído. SNR alto tende a favorecer comunicação mais estável.",
      "difficulty": "iniciante",
      "topic": "snr"
    },
    {
      "id": "q12.2.3",
      "type": "diagnóstico",
      "q": "Um cliente tem sinal forte, mas alta latência e chamadas travando. Qual hipótese RF ainda deve ser investigada?",
      "opts": [
        "Canal saturado, ruído ou retransmissões",
        "Obrigatoriamente cabo rompido entre o notebook e o AP",
        "Sempre falha de certificado TLS",
        "Sempre ausência de endereço MAC"
      ],
      "a": 0,
      "exp": "Sinal forte não elimina problemas de canal, interferência, ruído, utilização e retransmissão.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q12.2.4",
      "type": "arquitetura",
      "q": "Por que canais mais largos nem sempre são melhores em empresas?",
      "opts": [
        "Porque podem reduzir opções de coexistência e aumentar contenção em ambientes densos",
        "Porque impedem o uso de criptografia",
        "Porque removem a necessidade de DHCP",
        "Porque transformam Wi-Fi em rede cabeada"
      ],
      "a": 0,
      "exp": "Canais largos podem aumentar taxa máxima, mas também ocupam mais espectro e podem piorar coexistência em ambientes densos.",
      "difficulty": "intermediário",
      "topic": "canais"
    },
    {
      "id": "q12.2.5",
      "type": "segurança",
      "q": "Qual prática é mais adequada em um laboratório RF defensivo?",
      "opts": [
        "Observar apenas redes próprias ou autorizadas e coletar metadados básicos",
        "Derrubar clientes para medir reassociação",
        "Tentar capturar senhas de redes próximas",
        "Interferir em canais para ver qual AP resiste melhor"
      ],
      "a": 0,
      "exp": "O laboratório é defensivo. Não envolve derrubar clientes, interferir em redes ou capturar tráfego de terceiros.",
      "difficulty": "iniciante",
      "topic": "ética"
    },
    {
      "id": "q12.2.6",
      "type": "cenário",
      "q": "Qual é uma consequência possível de colocar todos os APs em potência máxima?",
      "opts": [
        "Roaming ruim e aumento de interferência entre células",
        "Eliminação automática de ruído",
        "Garantia de SNR perfeito",
        "Desativação de todos os SSIDs vizinhos"
      ],
      "a": 0,
      "exp": "Potência excessiva pode aumentar interferência, gerar células grandes demais e prejudicar roaming.",
      "difficulty": "intermediário",
      "topic": "potência"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.2.1",
      "front": "O que é RF em Wi-Fi?",
      "back": "É o uso de radiofrequência para transportar dados entre clientes e pontos de acesso.",
      "tags": [
        "rf",
        "wi-fi"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.2.2",
      "front": "RSSI alto garante Wi-Fi bom?",
      "back": "Não. RSSI indica força do sinal recebido, mas não garante SNR bom, canal livre ou aplicação funcionando.",
      "tags": [
        "rssi",
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.2.3",
      "front": "O que é SNR?",
      "back": "É a relação entre o sinal útil e o ruído. Quanto maior a margem, melhor tende a ser a comunicação.",
      "tags": [
        "snr",
        "rf"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.2.4",
      "front": "Por que 2.4 GHz costuma alcançar mais?",
      "back": "Porque frequências menores tendem a sofrer menos atenuação em obstáculos, mas a banda tem menos canais e mais congestionamento.",
      "tags": [
        "2.4ghz",
        "frequência"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.2.5",
      "front": "Por que canal largo pode ser ruim em ambiente denso?",
      "back": "Porque ocupa mais espectro, reduz opções de canais independentes e pode aumentar contenção.",
      "tags": [
        "canais",
        "capacidade"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.2.6",
      "front": "O que é airtime?",
      "back": "É o tempo de uso do meio wireless. Mesmo clientes lentos podem consumir muito airtime e afetar outros.",
      "tags": [
        "airtime",
        "capacidade"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.2.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre RSSI e SNR.",
      "expectedAnswer": "RSSI indica a intensidade do sinal recebido; SNR compara o sinal útil com o ruído. Um sinal forte pode ser ruim se o ruído também estiver alto.",
      "explanation": "O objetivo é mostrar que força e qualidade não são a mesma coisa."
    },
    {
      "id": "ex12.2.2",
      "type": "diagnóstico",
      "prompt": "Um usuário vê sinal cheio, mas a chamada de vídeo trava. Liste quatro hipóteses que não sejam 'sinal fraco'.",
      "expectedAnswer": "Canal saturado, ruído/interferência, retransmissões, muitos clientes, largura de canal inadequada, problema de DNS/gateway/firewall ou aplicação.",
      "explanation": "Troubleshooting profissional evita concluir pela interface visual do sistema operacional."
    },
    {
      "id": "ex12.2.3",
      "type": "arquitetura",
      "prompt": "Por que um auditório exige planejamento diferente de uma sala pequena?",
      "expectedAnswer": "Porque há maior densidade de clientes, mais disputa por airtime, maior exigência de capacidade, possíveis aplicações de vídeo/voz e necessidade de canais/potência bem planejados.",
      "explanation": "Cobertura sozinha não resolve ambientes densos."
    },
    {
      "id": "ex12.2.4",
      "type": "segurança",
      "prompt": "Explique como Wi-Fi instável pode virar risco de segurança mesmo sem ataque técnico direto.",
      "expectedAnswer": "Usuários podem usar hotspots pessoais ou redes não gerenciadas, reduzindo visibilidade, controle de políticas, logs e proteção corporativa.",
      "explanation": "Disponibilidade e segurança estão conectadas: soluções improvisadas podem escapar dos controles."
    }
  ],
  "challenge": {
    "title": "Diagnóstico RF de uma sala problemática",
    "scenario": "Uma empresa relata que a sala de reunião principal tem Wi-Fi instável. O AP mais próximo fica no corredor. Há três SSIDs corporativos, um SSID guest e várias redes vizinhas visíveis. O firewall e o link de internet não mostram falhas. Os usuários reclamam principalmente durante reuniões com vídeo.",
    "tasks": [
      "Criar uma lista de evidências de RF a coletar antes de alterar configuração.",
      "Definir como diferenciar cobertura fraca de canal saturado.",
      "Explicar por que aumentar potência pode não ser a primeira ação correta.",
      "Indicar quais evidências de camada superior ainda devem ser validadas.",
      "Propor uma melhoria de curto prazo e uma melhoria estrutural."
    ],
    "constraints": [
      "Não alterar rede de produção sem autorização.",
      "Não executar testes ofensivos ou interferência.",
      "Não culpar aplicação, firewall ou provedor sem evidência.",
      "Considerar impacto em usuários, segurança e operação."
    ],
    "expectedDeliverables": [
      "Tabela de evidências RF.",
      "Hipótese principal e hipóteses alternativas.",
      "Plano de validação.",
      "Plano de mudança com rollback.",
      "Resumo executivo para gestor não técnico."
    ],
    "gradingRubric": [
      {
        "criterion": "Separação entre evidência e hipótese",
        "points": 25,
        "description": "A resposta não deve tratar uma medição isolada como causa definitiva."
      },
      {
        "criterion": "Compreensão de RF",
        "points": 25,
        "description": "Deve mencionar banda, canal, RSSI, SNR/ruído, airtime, clientes e largura de canal."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Deve evitar ações ofensivas e respeitar autorização."
      },
      {
        "criterion": "Plano operacional",
        "points": 20,
        "description": "Deve prever mudança controlada, documentação, validação e rollback."
      },
      {
        "criterion": "Comunicação",
        "points": 10,
        "description": "Deve conseguir explicar o problema para público técnico e não técnico."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O primeiro passo é não aceitar 'sinal cheio' como diagnóstico. A sala pode ter sinal forte e canal ruim, ou sinal fraco em alguns pontos, ou ainda problema de aplicação que aparece mais em vídeo. É preciso coletar evidências no local, comparar horários e validar camadas superiores.",
    "steps": [
      "Registrar local, horário, quantidade de pessoas e tipo de aplicação afetada.",
      "Coletar SSID, BSSID, banda, canal, sinal e redes vizinhas no ponto de reclamação.",
      "Comparar com um ponto próximo ao AP e outro fora da sala.",
      "Validar gateway, DNS e acesso à aplicação para separar RF de camada superior.",
      "Verificar na controladora, se houver, utilização de canal, retries, clientes por AP e roaming.",
      "Evitar aumentar potência sem avaliar célula, interferência e clientes.",
      "Propor mudança pequena e reversível, documentada e medida antes/depois."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Aumentar potência de todos os APs imediatamente.",
        "whyItIsWrong": "Pode piorar interferência, roaming e assimetria entre AP e cliente."
      },
      {
        "answer": "Culpar o firewall porque a aplicação é web.",
        "whyItIsWrong": "O firewall pode estar envolvido, mas a reclamação localizada em uma sala exige evidência de RF e camada local."
      },
      {
        "answer": "Criar mais um SSID para a sala de reunião.",
        "whyItIsWrong": "Mais SSIDs podem consumir airtime e aumentar complexidade sem resolver RF."
      }
    ],
    "finalAnswer": "A resposta madura é coletar evidências RF e de camada superior, formular hipóteses, validar com dados e só então propor mudança controlada. Uma melhoria de curto prazo pode ser reduzir SSIDs desnecessários, ajustar clientes para banda menos congestionada ou reposicionar uso da sala. Uma melhoria estrutural pode envolver site survey, revisão de canais/largura/potência, AP dedicado ou redesenho de cobertura e capacidade."
  },
  "glossary": [
    {
      "term": "RF",
      "shortDefinition": "Radiofrequência usada para transportar sinais sem fio.",
      "longDefinition": "No Wi-Fi, RF é o meio físico de transmissão por ondas eletromagnéticas entre clientes e pontos de acesso.",
      "example": "Um notebook se comunica com o AP usando rádio em 2.4 GHz, 5 GHz ou 6 GHz.",
      "relatedTerms": [
        "frequência",
        "canal",
        "RSSI",
        "SNR"
      ],
      "relatedLessons": [
        "12.1",
        "12.2",
        "12.3"
      ]
    },
    {
      "term": "RSSI",
      "shortDefinition": "Indicador de intensidade do sinal recebido.",
      "longDefinition": "RSSI estima a força com que o sinal chega ao receptor. Em muitas ferramentas aparece em dBm ou porcentagem.",
      "example": "Um cliente pode mostrar sinal de -55 dBm perto do AP e -75 dBm em uma sala distante.",
      "relatedTerms": [
        "sinal",
        "dBm",
        "SNR"
      ],
      "relatedLessons": [
        "12.2",
        "12.9"
      ]
    },
    {
      "term": "SNR",
      "shortDefinition": "Relação entre sinal útil e ruído.",
      "longDefinition": "SNR mede a margem entre o sinal recebido e o ruído do ambiente. SNR maior tende a favorecer estabilidade e taxas melhores.",
      "example": "Um sinal de -60 dBm com ruído de -90 dBm tem margem melhor do que sinal de -60 dBm com ruído de -68 dBm.",
      "relatedTerms": [
        "ruído",
        "RSSI",
        "interferência"
      ],
      "relatedLessons": [
        "12.2",
        "12.9"
      ]
    },
    {
      "term": "Canal Wi-Fi",
      "shortDefinition": "Divisão de uma banda de frequência usada para comunicação Wi-Fi.",
      "longDefinition": "Um canal define onde, dentro da banda, o AP e os clientes transmitem. Canais próximos ou iguais podem competir pelo meio.",
      "example": "Em 2.4 GHz, canais sobrepostos são uma causa comum de degradação.",
      "relatedTerms": [
        "banda",
        "largura de canal",
        "co-canal"
      ],
      "relatedLessons": [
        "12.2",
        "12.3"
      ]
    },
    {
      "term": "Largura de canal",
      "shortDefinition": "Quantidade de espectro usada por um canal.",
      "longDefinition": "Larguras maiores podem permitir taxas maiores, mas ocupam mais espectro e podem piorar coexistência em ambientes densos.",
      "example": "Usar 80 MHz pode ser bom em alguns cenários de 5 GHz, mas 20 ou 40 MHz pode ser mais adequado em redes densas.",
      "relatedTerms": [
        "canal",
        "capacidade",
        "interferência"
      ],
      "relatedLessons": [
        "12.2",
        "12.3"
      ]
    },
    {
      "term": "Airtime",
      "shortDefinition": "Tempo de ocupação do meio wireless.",
      "longDefinition": "Como Wi-Fi é meio compartilhado, cada transmissão consome tempo de canal. Clientes lentos, retransmissões e muitos SSIDs podem consumir airtime.",
      "example": "Um cliente distante transmitindo lentamente pode ocupar mais tempo de rádio do que um cliente próximo e eficiente.",
      "relatedTerms": [
        "capacidade",
        "canal",
        "retransmissão"
      ],
      "relatedLessons": [
        "12.2",
        "12.6",
        "12.9"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.11be-2024",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/ieee/802.11be/7516/",
      "note": "Referência usada para validar evolução recente de PHY/MAC, bandas e alta vazão em Wi-Fi 7."
    },
    {
      "type": "official-doc",
      "title": "Establishing Wireless Robust Security Networks: A Guide to IEEE 802.11i",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/97/final",
      "note": "Referência usada para contextualizar segurança wireless e evolução além de WEP."
    },
    {
      "type": "official-doc",
      "title": "WLAN Radio Frequency Design Considerations",
      "organization": "Cisco",
      "url": "https://www.cisco.com/en/US/docs/solutions/Enterprise/Mobility/emob30dg/RFDesign.html",
      "note": "Referência usada para reforçar a importância de RF em WLAN corporativa."
    },
    {
      "type": "official-doc",
      "title": "Understand Site Survey Guidelines for WLAN Deployment",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/wireless/5500-series-wireless-controllers/116057-site-survey-guidelines-wlan-00.html",
      "note": "Referência usada para boas práticas sobre utilização de canal e quantidade de SSIDs."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 - Aula 12.1",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/2.0/12.1",
      "note": "Aula anterior: Wi-Fi como tecnologia de acesso local sem fio."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m02",
      "lesson": "2.x",
      "reason": "RF está na camada física e precisa ser separado de enlace, rede, transporte e aplicação no troubleshooting."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Depois do AP, políticas de firewall e segmentação determinam o que o cliente wireless pode acessar."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs-metricas",
      "reason": "Troubleshooting Wi-Fi corporativo depende de métricas, telemetria, baseline e correlação de eventos."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "autenticação corporativa",
      "lesson": "802.1X-radius-certificados",
      "reason": "A segurança wireless corporativa avançada será conectada a 802.1X, RADIUS, certificados e identidade nas próximas aulas."
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
      "12.3"
    ]
  }
};
