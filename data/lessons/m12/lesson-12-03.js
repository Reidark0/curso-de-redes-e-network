export const lesson1203 = {
  "id": "12.3",
  "moduleId": "m12",
  "order": 3,
  "title": "Padrões 802.11: Wi-Fi 4, 5, 6, 6E e 7",
  "subtitle": "Como cada geração Wi-Fi muda a capacidade, a eficiência, a latência, a compatibilidade e as decisões de arquitetura corporativa.",
  "duration": "80-110 min",
  "estimatedStudyTimeMinutes": 110,
  "difficulty": "intermediário",
  "type": "intermediária",
  "xp": 190,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "802.11",
    "wi-fi 4",
    "wi-fi 5",
    "wi-fi 6",
    "wi-fi 6e",
    "wi-fi 7",
    "compatibilidade",
    "arquitetura"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.1",
      "reason": "É necessário entender Wi-Fi como tecnologia de acesso local sem fio e não como sinônimo de internet."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.2",
      "reason": "As gerações Wi-Fi só fazem sentido quando o aluno entende RF, canais, largura de canal, RSSI, ruído e SNR."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Mesmo redes Wi-Fi modernas continuam transportando quadros e endereços MAC e se integram à LAN cabeada."
    }
  ],
  "objectives": [
    "Diferenciar padrão IEEE 802.11, geração comercial Wi-Fi e recurso de fabricante.",
    "Comparar Wi-Fi 4, Wi-Fi 5, Wi-Fi 6, Wi-Fi 6E e Wi-Fi 7 sem reduzir a decisão a velocidade nominal.",
    "Entender como MIMO, OFDM, OFDMA, modulação, largura de canal e bandas influenciam capacidade real.",
    "Avaliar compatibilidade entre clientes antigos, APs modernos e requisitos corporativos.",
    "Relacionar gerações Wi-Fi com segurança, custos, switches, cabeamento, PoE, logs, cloud management e ciclo de vida.",
    "Criar uma matriz técnica simples para decidir quando manter, atualizar ou segmentar dispositivos por geração."
  ],
  "learningOutcomes": [
    "Dado um inventário com APs e clientes, o aluno consegue identificar limitações causadas por clientes legados.",
    "Dado um requisito de baixa latência, o aluno consegue explicar por que Wi-Fi 7 pode ajudar, mas não resolve RF ruim nem rede cabeada mal dimensionada.",
    "Dado um projeto corporativo, o aluno consegue justificar escolhas de banda, canal, geração, segurança e ciclo de atualização.",
    "Dado um problema de performance, o aluno evita concluir que trocar para o padrão mais novo resolverá tudo sem validar SNR, airtime, DHCP, DNS, firewall e aplicação."
  ],
  "content": {
    "motivation": "\n      <section class=\"lesson-section lesson-section--motivation\">\n        <h2>1. Motivação</h2>\n        <p>\n          Em muitas empresas, a conversa sobre Wi-Fi começa de forma errada: alguém pergunta se o roteador é Wi-Fi 6, Wi-Fi 6E ou Wi-Fi 7, como se a geração impressa na caixa resolvesse automaticamente cobertura, latência, segurança e estabilidade. Essa pergunta é importante, mas incompleta. A geração Wi-Fi define capacidades técnicas possíveis. Ela não garante que o ambiente terá RF saudável, clientes compatíveis, switch adequado, uplink suficiente, energia PoE suficiente, autenticação correta, segmentação bem feita ou monitoramento eficaz.\n        </p>\n        <p>\n          Imagine uma empresa que troca todos os APs antigos por modelos Wi-Fi 7, mas mantém muitos notebooks Wi-Fi 5, celulares antigos, IoT barato em 2.4 GHz, switches de 1 Gb/s, múltiplos SSIDs, canalização ruim e uma controladora sem telemetria revisada. O investimento foi alto, mas as reclamações continuam. O problema não é que Wi-Fi 7 não sirva. O problema é tratar geração Wi-Fi como solução isolada, e não como uma peça dentro de uma arquitetura.\n        </p>\n        <div class=\"callout callout--problem\">\n          <strong>Problema real:</strong> escolher uma geração Wi-Fi sem entender compatibilidade, bandas, canais, clientes, segurança, switches e operação cria compras caras que não entregam o benefício esperado.\n        </div>\n        <p>\n          Esta aula existe para transformar nomes comerciais em raciocínio técnico. Você vai aprender que Wi-Fi 4, 5, 6, 6E e 7 são nomes amigáveis para evoluções da família IEEE 802.11. Vai entender por que Wi-Fi 6 não é apenas mais velocidade, por que Wi-Fi 6E é essencialmente Wi-Fi 6 expandido para 6 GHz, por que Wi-Fi 7 promete mais vazão e menor latência, e por que a decisão profissional depende de requisitos, ambiente, clientes, risco e custo.\n        </p>\n      </section>\n    ",
    "history": "\n      <section class=\"lesson-section lesson-section--history\">\n        <h2>2. História</h2>\n        <p>\n          A família IEEE 802.11 nasceu como uma forma de padronizar redes locais sem fio. Ao longo do tempo, várias emendas adicionaram novas capacidades físicas e de controle de acesso ao meio. Para o mercado, nomes como 802.11n, 802.11ac, 802.11ax e 802.11be eram difíceis de memorizar. Por isso, a indústria passou a usar nomes geracionais mais simples: Wi-Fi 4 para 802.11n, Wi-Fi 5 para 802.11ac, Wi-Fi 6 para 802.11ax, Wi-Fi 6E para 802.11ax operando também em 6 GHz e Wi-Fi 7 para 802.11be.\n        </p>\n        <p>\n          Cada geração surgiu para resolver gargalos diferentes. No começo, o foco era aumentar a taxa bruta de transmissão. Depois, a prioridade passou a incluir eficiência em ambientes densos, melhor uso do espectro, mais previsibilidade, menor latência, economia de bateria e suporte a aplicações como vídeo, voz, realidade aumentada, colaboração em tempo real, IoT e automação industrial.\n        </p>\n        <p>\n          O IEEE descreve o 802.11ax como uma emenda de alta eficiência para frequências entre 1 GHz e 7.125 GHz. Já o IEEE 802.11be-2024, base do Wi-Fi 7, define modificações de PHY e MAC para ao menos um modo capaz de atingir 30 Gbit/s no ponto de serviço MAC, com operação entre 1 GHz e 7.250 GHz, compatibilidade com dispositivos legados e coexistência nas bandas de 2.4 GHz, 5 GHz e 6 GHz. Isso mostra que as gerações não são apenas propaganda: elas refletem mudanças reais nas camadas física e de enlace.\n        </p>\n        <p>\n          Porém, a história também ensina prudência. Toda geração nova convive com clientes antigos. Empresas raramente trocam todos os endpoints ao mesmo tempo. Um AP moderno pode falar com clientes legados, mas a presença de clientes antigos, canais congestionados, SSIDs demais e aplicações sensíveis a latência continua afetando a experiência. O padrão cria possibilidades; o projeto define o resultado.\n        </p>\n      </section>\n    ",
    "problem": "\n      <section class=\"lesson-section lesson-section--problem\">\n        <h2>3. Problema</h2>\n        <p>\n          O problema central é decidir tecnologia wireless com base em nomes comerciais, sem entender o que muda por baixo. Muitos profissionais veem uma tabela de velocidade máxima e concluem que a geração mais nova sempre será melhor em qualquer cenário. Isso ignora que a velocidade nominal costuma ser medida em condições ideais, com larguras de canal específicas, modulação alta, vários fluxos espaciais, baixa interferência e clientes compatíveis.\n        </p>\n        <ul class=\"flow-list\">\n          <li><strong>Compatibilidade:</strong> um cliente Wi-Fi 5 conectado a um AP Wi-Fi 7 não vira Wi-Fi 7.</li>\n          <li><strong>Ambiente:</strong> modulações altas exigem boa qualidade de sinal, baixo ruído e baixa interferência.</li>\n          <li><strong>Canalização:</strong> canais largos aumentam vazão potencial, mas podem piorar coexistência em ambientes densos.</li>\n          <li><strong>Infraestrutura cabeada:</strong> APs rápidos podem exigir uplinks multigigabit, switches melhores e PoE adequado.</li>\n          <li><strong>Segurança:</strong> gerações modernas favorecem WPA3 e recursos mais atuais, mas a política precisa ser desenhada corretamente.</li>\n          <li><strong>Operação:</strong> mais capacidade também significa mais telemetria, mais documentação e mais decisões de ciclo de vida.</li>\n        </ul>\n        <div class=\"callout callout--warning\">\n          <strong>Armadilha comum:</strong> comprar APs modernos para resolver um problema que era de canal, ruído, roaming, DNS, DHCP, firewall, aplicação ou autenticação.\n        </div>\n      </section>\n    ",
    "evolution": "\n      <section class=\"lesson-section lesson-section--evolution\">\n        <h2>4. Evolução</h2>\n        <p>\n          A evolução das gerações Wi-Fi pode ser entendida como uma tentativa progressiva de usar melhor o meio compartilhado. Wi-Fi 4 popularizou MIMO e melhorou muito a capacidade em relação a gerações anteriores. Wi-Fi 5 elevou a capacidade principalmente em 5 GHz. Wi-Fi 6 mudou o foco para eficiência em ambientes densos. Wi-Fi 6E abriu a faixa de 6 GHz para reduzir congestionamento e oferecer canais mais limpos. Wi-Fi 7 amplia a ambição com canais ainda mais largos, modulação mais densa e operação multi-link.\n        </p>\n        <table class=\"comparison-table\">\n          <thead>\n            <tr>\n              <th>Geração</th>\n              <th>Base técnica</th>\n              <th>Ideia principal</th>\n              <th>Benefício esperado</th>\n              <th>Cuidado operacional</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Wi-Fi 4</td>\n              <td>802.11n</td>\n              <td>MIMO e melhorias em 2.4/5 GHz</td>\n              <td>Mais throughput que gerações antigas</td>\n              <td>Ambientes legados podem consumir airtime e limitar experiência</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi 5</td>\n              <td>802.11ac</td>\n              <td>Mais capacidade em 5 GHz</td>\n              <td>Boa base para notebooks e uso corporativo comum</td>\n              <td>Não resolve congestionamento de 2.4 GHz nem IoT antigo</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi 6</td>\n              <td>802.11ax</td>\n              <td>Alta eficiência, OFDMA, 1024-QAM e melhor densidade</td>\n              <td>Melhor experiência em redes com muitos clientes</td>\n              <td>Benefícios dependem de clientes compatíveis e bom projeto</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi 6E</td>\n              <td>802.11ax em 6 GHz</td>\n              <td>Expansão para espectro menos congestionado</td>\n              <td>Mais canais e menor interferência para clientes compatíveis</td>\n              <td>Exige dispositivos 6E, APs compatíveis e atenção à cobertura</td>\n            </tr>\n            <tr>\n              <td>Wi-Fi 7</td>\n              <td>802.11be</td>\n              <td>Extremely High Throughput, MLO, 4096-QAM e até 320 MHz</td>\n              <td>Mais vazão, menor latência e maior confiabilidade potencial</td>\n              <td>Pode exigir switches, PoE, endpoints e planejamento mais caros</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n    ",
    "concept": "\n      <section class=\"lesson-section lesson-section--concept\">\n        <h2>5. Conceito</h2>\n        <p>\n          Um padrão 802.11 define mecanismos técnicos de operação wireless, principalmente nas camadas física e de enlace. Uma geração Wi-Fi é um nome comercial mais amigável para um conjunto de capacidades associadas a uma ou mais versões desses padrões. O padrão diz como o rádio e o MAC podem operar; a geração ajuda pessoas e empresas a comparar produtos.\n        </p>\n        <div class=\"definition-box\">\n          <strong>Definição:</strong> geração Wi-Fi é uma forma de agrupar capacidades da família IEEE 802.11 em uma nomenclatura comercial compreensível, como Wi-Fi 5, Wi-Fi 6, Wi-Fi 6E e Wi-Fi 7. Ela indica potencial técnico, mas não substitui análise de ambiente, cliente, segurança, infraestrutura e operação.\n        </div>\n        <p>\n          O ponto mais importante é separar três coisas: o que o AP suporta, o que o cliente suporta e o que o ambiente permite. Um AP pode anunciar Wi-Fi 7, mas um cliente Wi-Fi 5 usará recursos compatíveis com ele. Um cliente moderno pode suportar 6 GHz, mas ficar em 5 GHz se o SSID, a política, o país, o driver ou o AP não permitirem 6 GHz. Um enlace pode suportar modulação alta, mas cair para modulação menor se o SNR estiver ruim.\n        </p>\n      </section>\n    ",
    "internals": "\n      <section class=\"lesson-section lesson-section--internals\">\n        <h2>6. Funcionamento interno</h2>\n        <p>\n          Internamente, as gerações Wi-Fi melhoram a forma como dados são modulados, divididos, transmitidos, coordenados e confirmados no meio sem fio. Quando falamos que uma geração é mais rápida, isso pode vir de canais mais largos, mais fluxos espaciais, modulação mais densa, melhor uso do tempo de rádio ou transmissões multiusuário mais eficientes.\n        </p>\n        <ol class=\"flow-list\">\n          <li><strong>Modulação:</strong> define quantos bits podem ser representados por símbolo. Modulações mais densas, como 1024-QAM e 4096-QAM, carregam mais dados, mas exigem sinal de melhor qualidade.</li>\n          <li><strong>Largura de canal:</strong> canais de 20, 40, 80, 160 e 320 MHz aumentam capacidade potencial, mas usam mais espectro.</li>\n          <li><strong>MIMO:</strong> usa múltiplas antenas e fluxos espaciais para aumentar capacidade e robustez.</li>\n          <li><strong>OFDMA:</strong> no Wi-Fi 6, ajuda a dividir o canal em unidades menores para atender múltiplos clientes com mais eficiência.</li>\n          <li><strong>Agendamento e eficiência:</strong> o AP pode coordenar melhor transmissões em ambientes densos, reduzindo overhead e contenção.</li>\n          <li><strong>MLO:</strong> no Wi-Fi 7, Multi-Link Operation permite usar múltiplos links/bandas de forma coordenada para aumentar vazão potencial, reduzir latência ou melhorar resiliência.</li>\n        </ol>\n        <p>\n          Em troubleshooting, essas capacidades aparecem como taxa de enlace, MCS, largura de canal, banda usada, número de fluxos espaciais, retransmissões, utilização de canal, roaming e latência. O profissional não precisa decorar todos os detalhes matemáticos no começo, mas precisa saber que velocidade nominal é resultado de várias condições simultâneas. Quando uma delas falha, o desempenho real cai.\n        </p>\n      </section>\n    ",
    "architecture": "\n      <section class=\"lesson-section lesson-section--architecture\">\n        <h2>7. Arquitetura</h2>\n        <p>\n          Dentro de uma arquitetura corporativa, a geração Wi-Fi afeta mais do que o AP. Ela influencia o switch de acesso, o tipo de PoE, a velocidade das portas, a controladora, o NAC, a autenticação, a política de segmentação, a coleta de logs, o desenho de SSIDs, a rede guest, a rede IoT e o ciclo de vida dos endpoints.\n        </p>\n        <ul>\n          <li><strong>Camada física:</strong> banda, canal, largura, antenas, potência, SNR e interferência.</li>\n          <li><strong>Camada de enlace:</strong> associação, quadros 802.11, BSSID, roaming e compatibilidade.</li>\n          <li><strong>Camada de rede:</strong> VLAN, IP, DHCP, gateway, DNS e roteamento após a associação.</li>\n          <li><strong>Segurança:</strong> WPA2/WPA3, 802.1X, segmentação, logs, detecção de rogue AP e política de guest.</li>\n          <li><strong>Operação:</strong> inventário de clientes, firmware, telemetria, troubleshooting e planejamento de substituição.</li>\n        </ul>\n        <p>\n          Um projeto Wi-Fi 7, por exemplo, pode exigir uplinks multigigabit se houver alta densidade de clientes e aplicações pesadas. Também pode exigir revisão de PoE, porque APs mais potentes podem consumir mais energia. Em ambientes cloud-managed, as gerações modernas trazem dashboards ricos, mas também podem depender de licença, conectividade de gerenciamento e políticas de retenção de dados.\n        </p>\n      </section>\n    ",
    "analogy": "\n      <section class=\"lesson-section lesson-section--analogy\">\n        <h2>8. Analogia</h2>\n        <p>\n          Pense nas gerações Wi-Fi como gerações de estradas e veículos. Wi-Fi 4 seria uma estrada melhor que a antiga, com mais faixas do que antes. Wi-Fi 5 melhora a estrada em uma região menos congestionada. Wi-Fi 6 introduz semáforos inteligentes e melhor organização para muitos veículos ao mesmo tempo. Wi-Fi 6E abre uma avenida nova, menos congestionada. Wi-Fi 7 permite veículos mais rápidos e rotas coordenadas por múltiplas avenidas.\n        </p>\n        <div class=\"callout callout--warning\">\n          <strong>Limite da analogia:</strong> no mundo real, rádio não é estrada fixa. O meio muda com paredes, pessoas, ruído, potência, regulamentação e dispositivos vizinhos. Além disso, carros antigos não passam a usar recursos de carros novos só porque a estrada foi modernizada.\n        </div>\n      </section>\n    ",
    "simpleExample": "\n      <section class=\"lesson-section lesson-section--example\">\n        <h2>9. Exemplo simples</h2>\n        <p>\n          Em casa, você pode ter um roteador Wi-Fi 6 e um celular antigo Wi-Fi 5. O roteador suporta recursos modernos, mas o celular negociará apenas o que ele entende. Se o celular estiver longe, atrás de paredes, em 2.4 GHz congestionado e com SNR baixo, a experiência pode ser pior que a de um notebook moderno perto do AP em 5 GHz ou 6 GHz.\n        </p>\n        <p>\n          Outro exemplo: trocar para Wi-Fi 6E pode melhorar muito um notebook compatível em 6 GHz no mesmo cômodo, mas não ajudará uma impressora antiga que só trabalha em 2.4 GHz. Por isso, redes reais costumam precisar de desenho por perfil: usuários corporativos, visitantes, IoT, dispositivos legados e aplicações críticas.\n        </p>\n      </section>\n    ",
    "enterpriseExample": "\n      <section class=\"lesson-section lesson-section--enterprise\">\n        <h2>10. Exemplo empresarial</h2>\n        <p>\n          Em uma empresa, a decisão não é simplesmente comprar o AP mais novo. Primeiro se levanta o inventário de clientes: quantos são Wi-Fi 5, Wi-Fi 6, 6E ou 7? Quais aplicações são críticas? Há voz sobre Wi-Fi? Há coletores, câmeras, tablets industriais ou dispositivos médicos? Há dependência de 2.4 GHz? Depois se avalia a infraestrutura: switches, PoE, uplink, VLANs, firewall, NAC, RADIUS, controladora e logs.\n        </p>\n        <p>\n          Um campus pode decidir usar Wi-Fi 6 em áreas comuns, Wi-Fi 6E em salas de colaboração e Wi-Fi 7 em ambientes de alta demanda, como laboratórios, mídia, engenharia ou realidade aumentada. Ao mesmo tempo, pode manter uma rede IoT separada em 2.4 GHz com políticas restritivas, sem misturar dispositivos fracos com notebooks corporativos. Essa decisão une performance, segurança, custo e suporte.\n        </p>\n      </section>\n    ",
    "cloudExample": "\n      <section class=\"lesson-section lesson-section--cloud\">\n        <h2>11. Exemplo em cloud</h2>\n        <p>\n          Muitos ambientes Wi-Fi modernos são gerenciados por controladoras cloud. Isso facilita inventário, dashboards, mapas de calor, logs, alertas, configuração centralizada e atualização de firmware. Porém, cloud management não elimina a camada física. Um painel pode mostrar clientes em Wi-Fi 6, 6E ou 7, mas a causa raiz de um problema pode continuar sendo SNR ruim, canal saturado ou cliente preso a um AP distante.\n        </p>\n        <p>\n          Também há impacto financeiro. Licenças de gerenciamento cloud, retenção de logs, suporte, análise avançada, APIs e integração com SIEM podem gerar custo recorrente. Em contrapartida, a operação centralizada pode reduzir tempo de diagnóstico, padronizar configuração e melhorar auditoria. A decisão correta compara custo recorrente com redução de risco operacional.\n        </p>\n      </section>\n    ",
    "devsecopsExample": "\n      <section class=\"lesson-section lesson-section--devsecops\">\n        <h2>12. Exemplo em DevSecOps</h2>\n        <p>\n          Em DevSecOps, padrões Wi-Fi aparecem menos como comando de pipeline e mais como governança de infraestrutura. Um time maduro pode versionar políticas de SSID, segmentação, autenticação, nomes, tags de sites, perfis de RF e padrões mínimos de segurança. APIs de controladoras podem alimentar inventário, dashboards e validações automatizadas.\n        </p>\n        <p>\n          Um exemplo prático: um pipeline de infraestrutura pode verificar se novos sites usam WPA3 quando possível, se SSIDs de visitantes estão separados, se redes IoT possuem VLAN própria, se APs legados estão em lista de exceção documentada e se versões de firmware estão dentro do padrão corporativo. Isso conecta Wi-Fi a policy as code, compliance e gestão de configuração.\n        </p>\n      </section>\n    ",
    "securityExample": "\n      <section class=\"lesson-section lesson-section--security\">\n        <h2>13. Exemplo em Segurança</h2>\n        <p>\n          A geração Wi-Fi influencia segurança, mas não substitui arquitetura defensiva. Wi-Fi 6E e Wi-Fi 7 tendem a vir acompanhados de recursos modernos e exigências de segurança mais atuais em determinados modos, mas a empresa ainda precisa decidir autenticação, segmentação, logs, rotação de credenciais, resposta a dispositivos perdidos, redes guest e tratamento de legados.\n        </p>\n        <table class=\"risk-table\">\n          <thead>\n            <tr>\n              <th>Risco</th>\n              <th>Como aparece</th>\n              <th>Impacto</th>\n              <th>Mitigação</th>\n            </tr>\n          </thead>\n          <tbody>\n            <tr>\n              <td>Cliente legado</td>\n              <td>Dispositivo só suporta padrões e segurança antigos</td>\n              <td>Reduz postura de segurança ou força exceções</td>\n              <td>Segmentar, inventariar, limitar acesso e planejar substituição</td>\n            </tr>\n            <tr>\n              <td>Falsa sensação de segurança</td>\n              <td>Equipe acredita que AP novo resolve arquitetura fraca</td>\n              <td>Redes guest, IoT e corporativa ficam mal isoladas</td>\n              <td>Aplicar VLANs, firewall, 802.1X, logs e revisão periódica</td>\n            </tr>\n            <tr>\n              <td>Exposição RF desnecessária</td>\n              <td>Potência alta e SSIDs propagados além da área útil</td>\n              <td>Aumenta superfície para observação e tentativas externas</td>\n              <td>Ajustar potência, posicionamento, cobertura e monitoramento</td>\n            </tr>\n            <tr>\n              <td>Gestão cloud sem controle</td>\n              <td>Console cloud sem MFA, papéis amplos ou logs insuficientes</td>\n              <td>Alteração indevida da rede sem fio corporativa</td>\n              <td>MFA, RBAC, trilha de auditoria, revisão de acessos e integração com SIEM</td>\n            </tr>\n          </tbody>\n        </table>\n      </section>\n    ",
    "diagram": "\n      <section class=\"lesson-section lesson-section--diagram\">\n        <h2>14. Diagrama SVG</h2>\n        <p>\n          O diagrama mostra que a geração Wi-Fi é apenas uma parte do caminho. O cliente negocia capacidades com o AP, o AP depende da rede cabeada, e a segurança depende de autenticação, segmentação e políticas.\n        </p>\n        <svg class=\"lesson-svg\" viewBox=\"0 0 980 420\" role=\"img\" aria-labelledby=\"wifi-gen-title wifi-gen-desc\">\n          <title id=\"wifi-gen-title\">Gerações Wi-Fi dentro da arquitetura corporativa</title>\n          <desc id=\"wifi-gen-desc\">Clientes com diferentes gerações Wi-Fi negociam capacidades com um ponto de acesso moderno, que depende de switch, firewall, identidade, cloud management e serviços corporativos.</desc>\n          <defs>\n            <marker id=\"arrow-wifi-gen\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n              <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n            </marker>\n          </defs>\n          <rect x=\"30\" y=\"45\" width=\"185\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n          <text x=\"122\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Cliente Wi-Fi 5</text>\n          <text x=\"122\" y=\"98\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">usa recursos compatíveis</text>\n\n          <rect x=\"30\" y=\"175\" width=\"185\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n          <text x=\"122\" y=\"205\" text-anchor=\"middle\" class=\"svg-label\">Cliente Wi-Fi 6E</text>\n          <text x=\"122\" y=\"228\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pode usar 6 GHz</text>\n\n          <rect x=\"30\" y=\"305\" width=\"185\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n          <text x=\"122\" y=\"335\" text-anchor=\"middle\" class=\"svg-label\">Cliente Wi-Fi 7</text>\n          <text x=\"122\" y=\"358\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">pode usar MLO</text>\n\n          <rect x=\"310\" y=\"145\" width=\"180\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--security\"></rect>\n          <text x=\"400\" y=\"182\" text-anchor=\"middle\" class=\"svg-label\">AP moderno</text>\n          <text x=\"400\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">2.4 / 5 / 6 GHz</text>\n          <text x=\"400\" y=\"230\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">negocia capacidades</text>\n\n          <rect x=\"590\" y=\"145\" width=\"150\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n          <text x=\"665\" y=\"182\" text-anchor=\"middle\" class=\"svg-label\">Switch</text>\n          <text x=\"665\" y=\"207\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">PoE / VLAN / uplink</text>\n\n          <rect x=\"805\" y=\"55\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--cloud\"></rect>\n          <text x=\"878\" y=\"86\" text-anchor=\"middle\" class=\"svg-label\">Cloud Mgmt</text>\n          <text x=\"878\" y=\"109\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">telemetria</text>\n\n          <rect x=\"805\" y=\"175\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--firewall\"></rect>\n          <text x=\"878\" y=\"206\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n          <text x=\"878\" y=\"229\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">políticas</text>\n\n          <rect x=\"805\" y=\"295\" width=\"145\" height=\"75\" rx=\"12\" class=\"svg-node svg-node--server\"></rect>\n          <text x=\"878\" y=\"326\" text-anchor=\"middle\" class=\"svg-label\">IAM/RADIUS</text>\n          <text x=\"878\" y=\"349\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">identidade</text>\n\n          <line x1=\"215\" y1=\"80\" x2=\"310\" y2=\"175\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-gen)\"></line>\n          <line x1=\"215\" y1=\"210\" x2=\"310\" y2=\"205\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-gen)\"></line>\n          <line x1=\"215\" y1=\"340\" x2=\"310\" y2=\"235\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-gen)\"></line>\n          <line x1=\"490\" y1=\"205\" x2=\"590\" y2=\"190\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-wifi-gen)\"></line>\n          <line x1=\"740\" y1=\"175\" x2=\"805\" y2=\"95\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-wifi-gen)\"></line>\n          <line x1=\"740\" y1=\"200\" x2=\"805\" y2=\"212\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-wifi-gen)\"></line>\n          <line x1=\"740\" y1=\"222\" x2=\"805\" y2=\"332\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-wifi-gen)\"></line>\n\n          <path d=\"M285 35 L520 35 L520 390 L285 390 Z\" class=\"svg-boundary\"></path>\n          <text x=\"402\" y=\"32\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Domínio RF e negociação wireless</text>\n        </svg>\n      </section>\n    ",
    "labIntro": "\n      <section class=\"lesson-section lesson-section--lab\">\n        <h2>15. Laboratório</h2>\n        <p>\n          O laboratório desta aula é defensivo e de inventário. Você irá coletar informações do adaptador wireless e da conexão atual para descobrir o que o seu cliente realmente suporta e negocia. O objetivo não é testar invasão, quebrar senhas ou interferir em redes próximas. O objetivo é aprender a separar capacidade nominal, capacidade negociada e condição real de uso.\n        </p>\n      </section>\n    ",
    "exercisesIntro": "\n      <section class=\"lesson-section lesson-section--exercises\">\n        <h2>16. Exercícios</h2>\n        <p>\n          Os exercícios fazem você produzir raciocínio técnico: comparar gerações, justificar atualização, identificar limitações e explicar por que velocidade nominal não é diagnóstico suficiente.\n        </p>\n      </section>\n    ",
    "challengeIntro": "\n      <section class=\"lesson-section lesson-section--challenge\">\n        <h2>17. Desafio</h2>\n        <p>\n          O desafio simula uma decisão de arquitetura: uma empresa quer modernizar Wi-Fi, mas possui clientes mistos, orçamento limitado, aplicações críticas e preocupações de segurança.\n        </p>\n      </section>\n    ",
    "solutionIntro": "\n      <section class=\"lesson-section lesson-section--solution\">\n        <h2>18. Solução comentada</h2>\n        <p>\n          A solução correta não é simplesmente escolher a geração mais nova. A resposta precisa separar perfis de usuário, requisitos de aplicação, compatibilidade de clientes, segurança, infraestrutura cabeada, operação e custo.\n        </p>\n      </section>\n    ",
    "summary": "\n      <section class=\"lesson-section lesson-section--summary\">\n        <h2>19. Resumo</h2>\n        <ul>\n          <li><strong>Ideia central:</strong> geração Wi-Fi indica potencial técnico, não garantia de experiência.</li>\n          <li><strong>O que lembrar:</strong> AP moderno, cliente antigo e RF ruim resultam em experiência limitada.</li>\n          <li><strong>Erro comum:</strong> comparar apenas velocidade nominal e ignorar capacidade, airtime, segurança e infraestrutura.</li>\n          <li><strong>Uso real:</strong> decisões de Wi-Fi corporativo exigem inventário, requisitos, segmentação, telemetria e ciclo de vida.</li>\n        </ul>\n      </section>\n    ",
    "nextTheme": "\n      <section class=\"lesson-section lesson-section--next\">\n        <h2>20. Próximo tema</h2>\n        <p>\n          Depois de entender as gerações Wi-Fi, o próximo passo é estudar SSID, BSSID, associação e autenticação. Até aqui você aprendeu o que o rádio e o padrão podem oferecer. Agora precisa entender como o cliente encontra uma rede, escolhe um AP, associa, autentica e passa a participar da LAN.\n        </p>\n      </section>\n    "
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
      "IEEE 802.11n",
      "IEEE 802.11ac",
      "IEEE 802.11ax",
      "IEEE 802.11be",
      "WPA2",
      "WPA3",
      "802.1X"
    ],
    "dependsOn": [
      "RF",
      "canais",
      "RSSI",
      "SNR",
      "MAC",
      "AP",
      "SSID",
      "BSSID"
    ],
    "enables": [
      "roaming",
      "Wi-Fi corporativo",
      "WPA3",
      "802.1X",
      "segmentação wireless",
      "cloud-managed WLAN"
    ]
  },
  "protocolFields": [
    {
      "field": "PHY capability",
      "size": "variável por geração",
      "purpose": "Indicar capacidades físicas como largura de canal, modulação, fluxos espaciais e bandas suportadas.",
      "securityObservation": "Capacidades modernas não eliminam necessidade de autenticação forte, segmentação e monitoramento."
    },
    {
      "field": "Supported rates / MCS",
      "size": "variável",
      "purpose": "Representar taxas e esquemas de modulação/codificação que podem ser usados no enlace.",
      "securityObservation": "Taxas baixas persistentes podem indicar RF ruim, cliente distante, interferência ou dispositivo legado afetando operação."
    },
    {
      "field": "Management frames",
      "size": "variável",
      "purpose": "Permitir descoberta, associação, capacidades e coordenação entre STA e AP.",
      "securityObservation": "Quadros de gerenciamento precisam de proteção adequada em redes modernas para reduzir abusos como desautenticação indevida."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente wireless",
      "action": "Escaneia redes e lê beacons/probe responses.",
      "detail": "Obtém SSID, BSSID, banda, canal, capacidades e parâmetros de segurança.",
      "possibleFailure": "Driver antigo pode não enxergar 6 GHz ou interpretar mal capacidades modernas."
    },
    {
      "step": 2,
      "actor": "Cliente e AP",
      "action": "Negociam capacidades compatíveis.",
      "detail": "A conexão usa o conjunto comum entre AP, cliente, configuração e regulamentação.",
      "possibleFailure": "AP moderno não transforma cliente legado em cliente moderno."
    },
    {
      "step": 3,
      "actor": "AP",
      "action": "Encaminha tráfego para LAN cabeada.",
      "detail": "Após associação e autenticação, o tráfego segue por VLAN, switch, firewall, DHCP, DNS e serviços.",
      "possibleFailure": "Trocar geração Wi-Fi não corrige VLAN, DHCP, DNS ou firewall mal configurado."
    }
  ],
  "deepDive": {
    "mentalModel": "Geração Wi-Fi é capacidade potencial negociada. Experiência real é o menor denominador entre AP, cliente, RF, canal, segurança, rede cabeada, aplicação e operação.",
    "keyTerms": [
      "802.11",
      "Wi-Fi 4",
      "Wi-Fi 5",
      "Wi-Fi 6",
      "Wi-Fi 6E",
      "Wi-Fi 7",
      "OFDMA",
      "MIMO",
      "MLO",
      "QAM",
      "largura de canal"
    ],
    "decisionTable": [
      {
        "situation": "Ambiente com muitos clientes Wi-Fi 5 e poucos Wi-Fi 6E",
        "recommendedChoice": "Atualização gradual e inventário por perfil",
        "why": "APs modernos ajudam, mas muitos clientes não usarão recursos novos.",
        "risk": "Investimento alto sem melhora proporcional se o gargalo for cliente legado ou RF."
      },
      {
        "situation": "Ambiente de alta densidade com voz e vídeo",
        "recommendedChoice": "Priorizar Wi-Fi 6/6E/7 com desenho RF, QoS, roaming e monitoramento",
        "why": "Eficiência e menor contenção são mais importantes que velocidade nominal isolada.",
        "risk": "Sem planejamento, canais largos e muitos SSIDs podem piorar airtime."
      },
      {
        "situation": "IoT antigo apenas em 2.4 GHz",
        "recommendedChoice": "Segmentar IoT em SSID/VLAN própria e política restritiva",
        "why": "Dispositivos antigos podem exigir exceções e reduzir postura de segurança.",
        "risk": "Misturar IoT com rede corporativa aumenta superfície lateral."
      }
    ],
    "limitations": [
      "Velocidade máxima teórica raramente representa throughput real de aplicação.",
      "Clientes legados continuam limitados às capacidades que suportam.",
      "Canais mais largos exigem espectro disponível e ambiente menos congestionado.",
      "Wi-Fi moderno não corrige sozinho problemas de DHCP, DNS, firewall, proxy ou aplicação.",
      "6 GHz e Wi-Fi 7 podem exigir troca de clientes, switches, PoE, licenças e processos."
    ],
    "whenToUse": [
      "Use Wi-Fi 6 ou superior em ambientes densos e com muitos clientes modernos.",
      "Use Wi-Fi 6E quando houver clientes compatíveis e necessidade de espectro menos congestionado.",
      "Use Wi-Fi 7 quando baixa latência, alta vazão e ciclo de vida justificarem custo e infraestrutura.",
      "Use segmentação por perfil para legados, visitantes e IoT."
    ],
    "whenNotToUse": [
      "Não use geração nova como substituto de site survey, análise RF e troubleshooting.",
      "Não force 6 GHz se os clientes críticos não suportam a banda.",
      "Não ative recursos avançados sem validar compatibilidade e impacto operacional.",
      "Não mantenha clientes legados na mesma política de acesso de ativos corporativos críticos."
    ],
    "operationalImpact": [
      "Exige inventário de clientes por capacidade wireless.",
      "Exige revisão de firmware, drivers, controladora, licenças e suporte.",
      "Exige monitoramento de banda, canal, taxa negociada, roaming e falhas de associação.",
      "Pode exigir atualização de switches, portas multigigabit e PoE."
    ],
    "financialImpact": [
      "APs Wi-Fi 6E/7 podem custar mais e exigir licenças de gerenciamento.",
      "Clientes antigos podem impedir retorno imediato do investimento.",
      "Switches multigigabit, PoE e cabeamento podem virar custo oculto.",
      "Gerenciamento cloud e retenção de logs podem gerar despesa recorrente."
    ],
    "securityImpact": [
      "Gerações modernas facilitam adoção de WPA3 e políticas mais fortes.",
      "Clientes legados podem forçar exceções inseguras.",
      "Gestão cloud precisa de MFA, RBAC, logs e revisão de acesso.",
      "Segmentação continua obrigatória, independentemente da geração Wi-Fi."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Comparar apenas velocidade máxima teórica.",
      "whyItHappens": "Materiais comerciais destacam números altos e omitem condições ideais.",
      "consequence": "Compra-se tecnologia que não resolve o gargalo real.",
      "correction": "Comparar requisitos, clientes, RF, canal, airtime, segurança, switches e operação."
    },
    {
      "mistake": "Achar que AP Wi-Fi 7 faz cliente Wi-Fi 5 operar como Wi-Fi 7.",
      "whyItHappens": "Confusão entre capacidade do AP e capacidade negociada do cliente.",
      "consequence": "Expectativa falsa de melhora imediata em todos os dispositivos.",
      "correction": "Inventariar clientes e planejar ciclo de substituição."
    },
    {
      "mistake": "Usar canais muito largos em ambiente congestionado.",
      "whyItHappens": "A equipe associa largura maior a desempenho sempre maior.",
      "consequence": "Mais interferência, mais contenção e menos eficiência real.",
      "correction": "Planejar largura por banda, densidade, espectro disponível e aplicação."
    },
    {
      "mistake": "Ignorar infraestrutura cabeada por trás do AP.",
      "whyItHappens": "O foco fica no rádio e esquece switch, PoE e uplink.",
      "consequence": "AP moderno fica limitado por porta, energia ou VLAN incorreta.",
      "correction": "Validar switch, PoE, VLAN, uplink, firewall e serviços essenciais."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Cliente moderno conecta em geração inferior à esperada.",
      "AP moderno não melhora performance de certos dispositivos.",
      "Dispositivos 6E não aparecem em 6 GHz.",
      "Alta taxa de enlace, mas aplicação continua ruim.",
      "Rede fica instável quando muitos clientes entram no mesmo ambiente."
    ],
    "diagnosticQuestions": [
      "O cliente suporta a geração e a banda esperadas?",
      "O driver e o sistema operacional estão atualizados?",
      "O país/região permite a banda e o canal configurados?",
      "O SSID está anunciado na banda correta?",
      "A segurança configurada é compatível com o cliente?",
      "A porta do switch e o PoE suportam o AP no modo desejado?",
      "O problema é wireless ou aparece também na rede cabeada?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show drivers",
        "purpose": "Ver padrões de rádio suportados pelo adaptador wireless.",
        "expectedObservation": "Lista de tipos de rádio suportados, como 802.11n, 802.11ac, 802.11ax ou equivalente conforme driver.",
        "interpretation": "Se o cliente não suporta a geração desejada, ele não usará os recursos do AP moderno."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, tipo de rádio, canal, taxa de recepção/transmissão e sinal.",
        "expectedObservation": "Informações da conexão atual e do rádio negociado.",
        "interpretation": "Ajuda a comparar capacidade suportada com capacidade realmente negociada."
      },
      {
        "platform": "Linux",
        "command": "iw dev",
        "purpose": "Listar interfaces wireless reconhecidas pelo sistema.",
        "expectedObservation": "Interface wireless, como wlan0 ou wlp2s0.",
        "interpretation": "Confirma se o sistema reconhece a interface antes de analisar capacidades."
      },
      {
        "platform": "Linux",
        "command": "iw list | less",
        "purpose": "Inspecionar bandas, frequências e capacidades suportadas pelo adaptador.",
        "expectedObservation": "Bandas, canais, modos e capacidades anunciadas pelo driver.",
        "interpretation": "Permite verificar se o cliente suporta 5 GHz, 6 GHz e recursos modernos."
      },
      {
        "platform": "Linux",
        "command": "nmcli dev wifi list",
        "purpose": "Listar redes visíveis com SSID, canal, taxa e segurança.",
        "expectedObservation": "Redes próximas, canais e modos de segurança.",
        "interpretation": "Ajuda a identificar ambiente, banda e possível congestionamento."
      },
      {
        "platform": "Cisco IOS / controladora",
        "command": "show wireless client summary",
        "purpose": "Ver clientes associados e informações resumidas de conexão em ambiente Cisco compatível.",
        "expectedObservation": "Clientes, APs, WLANs, estado e parâmetros conforme plataforma.",
        "interpretation": "A validação corporativa deve ocorrer também na controladora, não apenas no endpoint."
      }
    ],
    "decisionTree": [
      {
        "if": "Cliente não usa geração esperada",
        "then": "Verificar suporte do cliente, driver, banda, configuração do SSID, segurança e domínio regulatório."
      },
      {
        "if": "Taxa de enlace é alta mas aplicação está lenta",
        "then": "Testar rede cabeada, DNS, DHCP, firewall, proxy, servidor e latência fim a fim."
      },
      {
        "if": "Só dispositivos antigos têm problema",
        "then": "Separar análise de compatibilidade, segurança, banda, RSSI e política de legados."
      }
    ]
  },
  "trafficCapture": {
    "tool": "Wireshark em modo monitor quando permitido pelo hardware e sistema operacional, ou telemetria da controladora WLAN",
    "filter": "wlan.fc.type_subtype == 8 or wlan.fc.type_subtype == 5 or wlan.fc.type_subtype == 0 or wlan.fc.type_subtype == 1",
    "whatToObserve": [
      "Beacon frames anunciando SSID, BSSID e capacidades",
      "Probe Request e Probe Response",
      "Association Request e Association Response",
      "Parâmetros de segurança e capacidades suportadas"
    ],
    "interpretation": "A captura defensiva mostra que cliente e AP negociam capacidades. Sem hardware adequado para modo monitor, use logs e painel da controladora."
  },
  "security": {
    "goodPractices": [
      "Inventariar clientes por geração, banda, sistema operacional, driver e criticidade.",
      "Priorizar WPA3/802.1X quando suportado e manter exceções legadas isoladas.",
      "Separar dispositivos legados, IoT, visitantes e corporativos por SSID/VLAN/política.",
      "Ativar MFA, RBAC e auditoria no gerenciamento cloud da WLAN.",
      "Planejar substituição de clientes que forçam padrões ou segurança obsoletos."
    ],
    "badPractices": [
      "Misturar IoT legado e notebooks corporativos no mesmo segmento.",
      "Comprar APs novos sem inventário de clientes.",
      "Usar PSK compartilhada em ambiente corporativo sensível sem rotação e controle.",
      "Desativar segurança moderna para acomodar dispositivos antigos sem segmentação.",
      "Permitir administração cloud da WLAN sem MFA e trilha de auditoria."
    ],
    "commonErrors": [
      "Confundir geração do AP com geração negociada pelo cliente.",
      "Achar que 6 GHz sempre terá melhor alcance que 5 GHz.",
      "Ignorar que canais largos podem piorar coexistência.",
      "Não revisar switches e PoE ao atualizar APs."
    ],
    "vulnerabilities": [
      {
        "name": "Exceção insegura para cliente legado",
        "description": "Dispositivos antigos podem exigir segurança mais fraca ou configurações especiais.",
        "defensiveExplanation": "O risco não é apenas o padrão antigo, mas o acesso que esse dispositivo recebe na rede.",
        "mitigation": "Criar rede/VLAN restrita, regras de firewall, inventário, monitoramento e plano de substituição."
      },
      {
        "name": "Console WLAN cloud mal protegido",
        "description": "Controladoras cloud concentram configuração de APs, SSIDs, políticas e logs.",
        "defensiveExplanation": "Comprometimento do console pode alterar a superfície wireless inteira.",
        "mitigation": "MFA, RBAC, logs, alertas, revisão de acessos e integração com IAM corporativo."
      },
      {
        "name": "Falsa segurança por tecnologia nova",
        "description": "A equipe acredita que usar Wi-Fi 6E ou 7 remove a necessidade de segmentação.",
        "defensiveExplanation": "A geração melhora capacidades do enlace, mas não define autorização de rede por si só.",
        "mitigation": "Aplicar autenticação forte, segmentação, firewall, logs e revisão de arquitetura."
      }
    ],
    "monitoring": [
      "Clientes por geração e banda negociada.",
      "Falhas de associação e autenticação por tipo de cliente.",
      "Uso de SSIDs legados e exceções de segurança.",
      "Mudanças administrativas na controladora WLAN.",
      "Quantidade de clientes em 2.4 GHz versus 5/6 GHz."
    ],
    "hardening": [
      "Desabilitar padrões e taxas muito antigas quando o ambiente permitir.",
      "Aplicar WPA3/802.1X para perfis corporativos compatíveis.",
      "Isolar legados com menor privilégio.",
      "Manter firmware de APs e drivers de clientes atualizados.",
      "Auditar permissões administrativas do console WLAN."
    ],
    "detectionIdeas": [
      "Alerta para cliente corporativo conectando em SSID legado.",
      "Alerta para queda incomum de clientes para bandas antigas.",
      "Correlação entre falhas de associação e atualização de firmware/configuração.",
      "Detecção de mudanças em SSID, segurança ou VLAN fora da janela aprovada."
    ]
  },
  "lab": {
    "id": "lab-12.3",
    "title": "Inventário defensivo de geração Wi-Fi no cliente",
    "labType": "architecture",
    "objective": "Identificar o que o adaptador wireless suporta, o que a conexão atual negociou e quais hipóteses isso permite levantar em um diagnóstico.",
    "scenario": "Você é responsável por avaliar se uma reclamação de Wi-Fi lento pode estar relacionada a clientes antigos ou incompatibilidade de geração. O laboratório será feito no seu próprio computador, sem testar redes de terceiros e sem interferir no ambiente.",
    "topology": "Notebook do aluno -> AP autorizado -> switch/rede local -> serviços internos ou internet",
    "architecture": "Cliente wireless associado a uma rede permitida, coletando informações locais do adaptador, da conexão e das redes visíveis para fins de inventário e troubleshooting.",
    "prerequisites": [
      "Ter permissão para analisar o próprio computador e a própria rede.",
      "Ter Windows ou Linux com interface Wi-Fi.",
      "Não executar captura ou varredura em redes de terceiros sem autorização.",
      "Ter concluído as aulas 12.1 e 12.2."
    ],
    "tools": [
      "Windows PowerShell ou Prompt de Comando",
      "Linux com iw e nmcli quando disponível",
      "Opcional: painel do roteador/AP ou controladora WLAN autorizada",
      "Opcional: Wireshark apenas em ambiente próprio e com modo monitor suportado"
    ],
    "estimatedTimeMinutes": 45,
    "cost": "zero",
    "safetyNotes": [
      "Não tente quebrar senhas, derrubar clientes, enviar deauth ou interferir em redes próximas.",
      "Colete informações apenas de redes próprias ou autorizadas.",
      "Não publique BSSID, MAC, SSID corporativo ou detalhes sensíveis em locais públicos.",
      "Use o laboratório para inventário defensivo e aprendizagem."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Identificar capacidades do adaptador no Windows",
        "instruction": "No Windows, liste os drivers e tipos de rádio suportados pelo adaptador.",
        "command": "netsh wlan show drivers",
        "expectedOutput": "Campos como tipos de rádio suportados, autenticação e criptografia suportadas, fornecedor e versão do driver.",
        "explanation": "Esse comando ajuda a separar o que o cliente suporta do que o AP anuncia. Se o adaptador não suporta 802.11ax ou 6 GHz, ele não usará esses recursos."
      },
      {
        "number": 2,
        "title": "Ver conexão atual no Windows",
        "instruction": "Ainda no Windows, veja a conexão atual e identifique SSID, BSSID, tipo de rádio, canal, taxa e sinal.",
        "command": "netsh wlan show interfaces",
        "expectedOutput": "SSID, BSSID, tipo de rádio, canal, Receive rate, Transmit rate e sinal.",
        "explanation": "A conexão atual mostra o que foi negociado naquele momento, não apenas o que o equipamento teoricamente suporta."
      },
      {
        "number": 3,
        "title": "Identificar interface no Linux",
        "instruction": "No Linux, descubra o nome da interface wireless.",
        "command": "iw dev",
        "expectedOutput": "Nome da interface, por exemplo wlan0 ou wlp2s0.",
        "explanation": "Antes de coletar detalhes, é necessário saber qual interface está sendo usada."
      },
      {
        "number": 4,
        "title": "Ver capacidades do adaptador no Linux",
        "instruction": "Liste capacidades do rádio suportadas pelo driver.",
        "command": "iw list | less",
        "expectedOutput": "Bandas, frequências, larguras de canal e capacidades anunciadas pelo adaptador.",
        "explanation": "Esse comando pode indicar se o adaptador enxerga 2.4 GHz, 5 GHz, 6 GHz e quais recursos são suportados."
      },
      {
        "number": 5,
        "title": "Listar redes visíveis no Linux",
        "instruction": "Liste redes próximas para observar canal, taxa e segurança sem se conectar a redes de terceiros.",
        "command": "nmcli dev wifi list",
        "expectedOutput": "Lista de SSIDs visíveis, canais, sinal, segurança e taxas conforme suporte do sistema.",
        "explanation": "A listagem ajuda a contextualizar o ambiente RF e verificar se há muitas redes competindo no mesmo espaço."
      },
      {
        "number": 6,
        "title": "Comparar capacidade, negociação e experiência",
        "instruction": "Monte uma pequena tabela com três colunas: capacidade do cliente, conexão negociada e experiência percebida.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela com geração suportada, rádio atual, canal/banda, taxa negociada, sinal e sintomas percebidos.",
        "explanation": "A comparação impede conclusões simplistas e força o raciocínio profissional baseado em evidências."
      },
      {
        "number": 7,
        "title": "Criar hipótese defensiva",
        "instruction": "Escreva uma hipótese: o problema parece limitação de cliente, RF, geração, segurança, DHCP/DNS/firewall ou aplicação?",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Hipótese com evidências e próximos testes.",
        "explanation": "Troubleshooting profissional exige hipótese verificável, não palpite."
      }
    ],
    "expectedResult": "O aluno deve produzir um inventário básico do cliente wireless, identificar a geração suportada e a geração negociada, e explicar por que isso pode ou não justificar problemas de desempenho.",
    "validation": [
      {
        "check": "Capacidade do adaptador identificada",
        "command": "netsh wlan show drivers  ou  iw list",
        "expected": "Lista de tipos de rádio, bandas ou capacidades.",
        "ifFails": "Verifique se há interface Wi-Fi ativa, driver instalado e permissões adequadas."
      },
      {
        "check": "Conexão atual identificada",
        "command": "netsh wlan show interfaces  ou  nmcli dev wifi list",
        "expected": "SSID, BSSID/canal/banda ou informações equivalentes.",
        "ifFails": "Confirme que o computador está conectado a uma rede Wi-Fi autorizada."
      },
      {
        "check": "Hipótese escrita com evidências",
        "command": "Revisar anotações do laboratório",
        "expected": "A hipótese cita pelo menos duas evidências coletadas.",
        "ifFails": "Repetir coleta separando capacidade suportada, conexão negociada e sintomas."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O comando netsh não mostra 802.11ax mesmo em notebook moderno.",
        "probableCause": "Driver antigo, tradução diferente do fornecedor ou adaptador sem suporte real.",
        "howToConfirm": "Verificar modelo do adaptador, versão do driver e documentação do fabricante.",
        "fix": "Atualizar driver pelo fabricante ou registrar limitação no inventário."
      },
      {
        "symptom": "O Linux não mostra 6 GHz.",
        "probableCause": "Adaptador sem suporte, driver limitado, kernel antigo ou domínio regulatório.",
        "howToConfirm": "Verificar iw list, kernel, firmware e país configurado.",
        "fix": "Atualizar kernel/firmware quando apropriado e validar regulamentação local."
      },
      {
        "symptom": "A taxa negociada muda muito durante o teste.",
        "probableCause": "Variação de RF, distância, ruído, roaming, economia de energia ou tráfego concorrente.",
        "howToConfirm": "Repetir medições em pontos diferentes e comparar com RSSI/SNR quando disponível.",
        "fix": "Coletar baseline, aproximar do AP, reduzir interferências e analisar logs da controladora."
      }
    ],
    "improvements": [
      "Adicionar dados da controladora WLAN corporativa quando disponível.",
      "Comparar dois clientes de gerações diferentes no mesmo local.",
      "Registrar resultados por sala para criar baseline.",
      "Repetir o teste em 2.4 GHz, 5 GHz e 6 GHz quando permitido e suportado."
    ],
    "evidenceToCollect": [
      "Saída do comando de capacidades do adaptador.",
      "Saída do comando da conexão atual.",
      "Tabela com geração suportada e geração negociada.",
      "Hipótese defensiva escrita.",
      "Observação sobre limitações de cliente ou ambiente."
    ],
    "questions": [
      "O AP suporta mais recursos do que o cliente?",
      "A conexão atual corresponde ao que você esperava?",
      "Há evidência de que o problema seja geração Wi-Fi ou parece RF/rede/aplicação?",
      "Que dado faltou para uma conclusão mais segura?"
    ],
    "challenge": "Compare dois dispositivos diferentes, se possível, e explique por que eles negociam capacidades diferentes no mesmo SSID.",
    "solution": "A resposta deve mencionar que cada cliente possui adaptador, antenas, driver, sistema operacional e suporte de geração diferentes. O AP anuncia capacidades, mas a conexão usa o conjunto compatível entre cliente, AP, banda, segurança, regulamentação e ambiente RF."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que a geração Wi-Fi não deve ser analisada apenas pela velocidade máxima anunciada?",
      "hints": [
        "Pense em cliente, RF, canal e aplicação.",
        "Compare velocidade nominal com throughput real."
      ],
      "expectedIdeas": [
        "compatibilidade",
        "ambiente",
        "SNR",
        "airtime",
        "infraestrutura",
        "segurança"
      ],
      "explanation": "Velocidade nominal é apenas potencial. A experiência real depende do menor denominador entre várias partes."
    },
    {
      "type": "diagnóstico",
      "question": "Um AP Wi-Fi 7 foi instalado, mas um notebook continua conectando como Wi-Fi 5. O que você verificaria?",
      "hints": [
        "Comece pelo cliente.",
        "Depois olhe banda, driver, SSID e segurança."
      ],
      "expectedIdeas": [
        "suporte do adaptador",
        "driver",
        "banda",
        "configuração do SSID",
        "segurança",
        "região"
      ],
      "explanation": "O AP pode suportar Wi-Fi 7, mas o cliente só usa recursos que também suporta e que estão permitidos pela configuração."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa tem orçamento para trocar APs, mas metade dos clientes ainda é antiga. Como você conduziria a decisão?",
      "hints": [
        "Pense em inventário e fases.",
        "Pense em segmentação e ciclo de vida."
      ],
      "expectedIdeas": [
        "inventário",
        "piloto",
        "áreas críticas",
        "legados",
        "segmentação",
        "custo",
        "roadmap"
      ],
      "explanation": "A resposta madura propõe atualização gradual, baseada em requisitos, dados e risco, não compra cega."
    }
  ],
  "quiz": [
    {
      "id": "q12.3.1",
      "type": "conceito",
      "q": "O que uma geração Wi-Fi indica em um projeto corporativo?",
      "opts": [
        "Um conjunto de capacidades potenciais associadas a padrões 802.11",
        "Uma garantia de velocidade real para qualquer cliente",
        "Uma substituição automática de firewall e segmentação",
        "Um protocolo de roteamento entre VLANs"
      ],
      "a": 0,
      "exp": "Geração Wi-Fi indica capacidades possíveis, não garante experiência real nem substitui arquitetura de rede.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q12.3.2",
      "type": "comparação",
      "q": "Qual relação está correta?",
      "opts": [
        "Wi-Fi 4 é associado ao 802.11n",
        "Wi-Fi 5 é associado ao 802.11be",
        "Wi-Fi 6E é uma tecnologia exclusiva de 2.4 GHz",
        "Wi-Fi 7 elimina a necessidade de AP"
      ],
      "a": 0,
      "exp": "Wi-Fi 4 corresponde ao 802.11n. Wi-Fi 7 é associado ao 802.11be, e Wi-Fi 6E expande 802.11ax para 6 GHz.",
      "difficulty": "iniciante",
      "topic": "gerações"
    },
    {
      "id": "q12.3.3",
      "type": "diagnóstico",
      "q": "Um cliente antigo conectado a um AP Wi-Fi 7 apresenta baixa performance. Qual hipótese deve ser testada cedo?",
      "opts": [
        "O cliente pode não suportar recursos modernos e estar usando modo legado",
        "O firewall sempre é o único culpado",
        "Wi-Fi 7 não é compatível com clientes antigos",
        "A solução é sempre aumentar a largura de canal para 320 MHz"
      ],
      "a": 0,
      "exp": "Compatibilidade do cliente é uma hipótese básica. O AP moderno não transforma o cliente antigo em moderno.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q12.3.4",
      "type": "segurança",
      "q": "Qual é uma boa prática ao manter dispositivos legados na rede Wi-Fi?",
      "opts": [
        "Segmentar e restringir acesso por política",
        "Desativar toda segurança moderna para todos os usuários",
        "Misturar IoT legado com servidores críticos",
        "Ignorar logs para reduzir armazenamento"
      ],
      "a": 0,
      "exp": "Legados devem ser controlados por segmentação, políticas restritivas, monitoramento e plano de substituição.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q12.3.5",
      "type": "arquitetura",
      "q": "Além dos APs, o que pode precisar de revisão ao adotar gerações Wi-Fi mais novas?",
      "opts": [
        "Switches, PoE, uplinks, controladora, clientes, segurança e logs",
        "Apenas o papel de parede da sala",
        "Somente o nome do SSID",
        "Somente o DNS público"
      ],
      "a": 0,
      "exp": "Atualização wireless pode impactar infraestrutura cabeada, energia, gerenciamento, endpoint e segurança.",
      "difficulty": "intermediário",
      "topic": "arquitetura"
    },
    {
      "id": "q12.3.6",
      "type": "cloud",
      "q": "Qual é um risco operacional de WLAN gerenciada em cloud?",
      "opts": [
        "Console sem MFA, RBAC ou auditoria adequada",
        "Não existir mais camada física",
        "O AP não precisar de energia elétrica",
        "A rede deixar de usar clientes"
      ],
      "a": 0,
      "exp": "Controladoras cloud centralizam poder operacional e precisam de controles fortes de identidade, acesso e auditoria.",
      "difficulty": "intermediário",
      "topic": "cloud-management"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.3.1",
      "front": "Wi-Fi 4 corresponde a qual base técnica?",
      "back": "Wi-Fi 4 é associado ao IEEE 802.11n.",
      "tags": [
        "wi-fi",
        "802.11"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.3.2",
      "front": "Wi-Fi 5 corresponde a qual base técnica?",
      "back": "Wi-Fi 5 é associado ao IEEE 802.11ac.",
      "tags": [
        "wi-fi",
        "802.11ac"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.3.3",
      "front": "O que diferencia Wi-Fi 6E de Wi-Fi 6?",
      "back": "Wi-Fi 6E estende capacidades do Wi-Fi 6 para a banda de 6 GHz, exigindo clientes e APs compatíveis.",
      "tags": [
        "wi-fi 6e",
        "6 ghz"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.3.4",
      "front": "Por que AP moderno não garante cliente moderno?",
      "back": "Porque a conexão usa capacidades compatíveis entre AP, cliente, configuração, banda, segurança e ambiente.",
      "tags": [
        "compatibilidade",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.3.5",
      "front": "O que é MLO no contexto de Wi-Fi 7?",
      "back": "Multi-Link Operation permite operação coordenada por múltiplos links/bandas para aumentar vazão potencial, reduzir latência ou melhorar resiliência.",
      "tags": [
        "wi-fi 7",
        "mlo"
      ],
      "difficulty": "avançado"
    },
    {
      "id": "fc12.3.6",
      "front": "Qual é a armadilha da velocidade nominal?",
      "back": "Ela representa potencial em condições ideais, não throughput real garantido em ambiente corporativo.",
      "tags": [
        "performance",
        "arquitetura"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.3.1",
      "type": "comparação",
      "prompt": "Explique, em uma tabela curta, a diferença entre Wi-Fi 5, Wi-Fi 6 e Wi-Fi 6E para uma empresa que usa muitos notebooks e videoconferência.",
      "expectedAnswer": "A resposta deve mencionar Wi-Fi 5 como base forte em 5 GHz, Wi-Fi 6 como melhoria de eficiência e densidade, e Wi-Fi 6E como expansão para 6 GHz com clientes compatíveis e menor congestionamento potencial.",
      "explanation": "O objetivo é comparar valor arquitetural, não decorar números de marketing."
    },
    {
      "id": "ex12.3.2",
      "type": "diagnóstico",
      "prompt": "Um usuário com notebook antigo reclama que não percebeu melhora após a troca de APs para Wi-Fi 7. Liste quatro hipóteses técnicas.",
      "expectedAnswer": "Cliente não suporta Wi-Fi 7; driver antigo; cliente está em 2.4/5 GHz congestionado; problema real está em DHCP/DNS/firewall/aplicação; RF ruim; switch/uplink limitado.",
      "explanation": "Troca de AP é apenas uma variável. Diagnóstico precisa considerar todo o caminho."
    },
    {
      "id": "ex12.3.3",
      "type": "arquitetura",
      "prompt": "Defina uma política simples para legados, visitantes, IoT e usuários corporativos em uma rede Wi-Fi moderna.",
      "expectedAnswer": "Legados e IoT em redes separadas e restritas; visitantes isolados da rede interna; usuários corporativos com autenticação forte; logs e monitoramento para todos os perfis.",
      "explanation": "Geração Wi-Fi não substitui segmentação e política de acesso."
    },
    {
      "id": "ex12.3.4",
      "type": "segurança",
      "prompt": "Por que console WLAN cloud precisa de MFA e RBAC?",
      "expectedAnswer": "Porque ele pode controlar SSIDs, políticas, VLANs, firmware e logs. Acesso indevido pode alterar a superfície wireless da empresa inteira.",
      "explanation": "Gerenciamento de rede é ativo crítico e deve ser tratado como plano de controle."
    }
  ],
  "challenge": {
    "title": "Plano de atualização Wi-Fi por gerações",
    "scenario": "Uma empresa tem 400 usuários, 70 APs Wi-Fi 5, muitos notebooks Wi-Fi 6, alguns dispositivos 6E, IoT antigo em 2.4 GHz, reclamações em salas de reunião e orçamento para atualizar apenas parte da rede no primeiro ano.",
    "tasks": [
      "Criar uma estratégia de atualização em fases.",
      "Definir quais áreas receberiam Wi-Fi 6E ou Wi-Fi 7 primeiro.",
      "Explicar como tratar clientes legados e IoT.",
      "Listar evidências que precisam ser coletadas antes da compra.",
      "Indicar impactos em switch, PoE, segurança e gerenciamento."
    ],
    "constraints": [
      "Não trocar todos os endpoints no primeiro ano.",
      "Não misturar IoT com usuários corporativos.",
      "Não prometer melhora sem baseline.",
      "Manter rede guest isolada.",
      "Considerar custo de licenças e operação."
    ],
    "expectedDeliverables": [
      "Matriz de clientes por geração",
      "Mapa de áreas prioritárias",
      "Plano de segmentação",
      "Checklist de infraestrutura cabeada",
      "Plano de monitoramento e validação"
    ],
    "gradingRubric": [
      {
        "criterion": "Inventário e evidência",
        "points": 25,
        "description": "A solução começa por dados de clientes, RF, aplicações e reclamações."
      },
      {
        "criterion": "Arquitetura segura",
        "points": 25,
        "description": "A solução segmenta legados, IoT, visitantes e usuários corporativos."
      },
      {
        "criterion": "Viabilidade operacional",
        "points": 25,
        "description": "A solução considera switches, PoE, licenças, suporte e implantação gradual."
      },
      {
        "criterion": "Validação pós-mudança",
        "points": 25,
        "description": "A solução define como medir sucesso e comparar com baseline."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A decisão madura começa por inventário e baseline. Não se escolhe Wi-Fi 7 só porque é mais novo; escolhe-se tecnologia adequada ao perfil de cliente, aplicação, RF, risco e orçamento.",
    "steps": [
      "Inventariar APs, clientes, bandas, tipos de rádio, drivers e aplicações críticas.",
      "Mapear áreas com reclamação e correlacionar com RF, airtime, roaming e logs.",
      "Priorizar salas de reunião e áreas densas para Wi-Fi 6E/7 se houver clientes compatíveis.",
      "Manter IoT em SSID/VLAN próprio com políticas restritivas.",
      "Validar switches, uplinks multigigabit, PoE e licenciamento.",
      "Executar piloto, comparar baseline e expandir por fases."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar todos os APs por Wi-Fi 7 imediatamente.",
        "whyItIsWrong": "Pode ser caro e não resolver clientes legados, RF, switches, PoE, DNS, DHCP ou aplicação."
      },
      {
        "answer": "Manter todos os dispositivos no mesmo SSID para simplificar.",
        "whyItIsWrong": "Mistura riscos, legados, IoT e usuários corporativos, reduzindo segurança e controle."
      },
      {
        "answer": "Usar sempre o canal mais largo possível.",
        "whyItIsWrong": "Canais largos podem piorar coexistência em ambientes congestionados."
      }
    ],
    "finalAnswer": "A empresa deve executar uma atualização faseada, orientada por inventário e baseline. Áreas densas e com clientes compatíveis recebem Wi-Fi 6E/7 primeiro; legados e IoT ficam segmentados; switches e PoE são validados; segurança e logs são revisados; o sucesso é medido por métricas antes/depois."
  },
  "pedagogicalMap": {
    "problem": "Escolher Wi-Fi por nome comercial ou velocidade nominal gera decisões caras e incompletas.",
    "concept": "Geração Wi-Fi representa capacidades potenciais de padrões 802.11, mas a conexão real depende de AP, cliente, RF e arquitetura.",
    "internalMechanism": "Melhorias ocorrem por modulação, largura de canal, MIMO, OFDMA, eficiência MAC e MLO.",
    "realUse": "Empresas precisam inventariar clientes, planejar bandas, segmentar perfis e validar infraestrutura antes de atualizar.",
    "commonMistake": "Achar que AP novo transforma todos os clientes em clientes modernos.",
    "securityImpact": "Legados e gestão cloud exigem controles fortes, segmentação e auditoria.",
    "operationalImpact": "Atualização Wi-Fi pode exigir firmware, drivers, switch, PoE, licenças e monitoramento.",
    "summary": "Padrões Wi-Fi modernos são ferramentas poderosas, mas só entregam valor quando aplicados com arquitetura, evidência e segurança."
  },
  "glossary": [
    {
      "term": "IEEE 802.11",
      "shortDefinition": "Família de padrões para redes locais sem fio.",
      "longDefinition": "IEEE 802.11 define mecanismos de camada física e enlace usados por redes Wi-Fi, incluindo diferentes emendas como 802.11n, 802.11ac, 802.11ax e 802.11be.",
      "example": "Wi-Fi 6 é associado ao 802.11ax.",
      "relatedTerms": [
        "Wi-Fi",
        "PHY",
        "MAC"
      ],
      "relatedLessons": [
        "12.1",
        "12.2",
        "12.3"
      ]
    },
    {
      "term": "Wi-Fi 6E",
      "shortDefinition": "Extensão do Wi-Fi 6 para a banda de 6 GHz.",
      "longDefinition": "Wi-Fi 6E usa capacidades do 802.11ax com acesso à banda de 6 GHz, oferecendo mais espectro e menos congestionamento para clientes compatíveis.",
      "example": "Um notebook compatível pode usar 6 GHz em um AP 6E quando a configuração e a regulamentação permitem.",
      "relatedTerms": [
        "Wi-Fi 6",
        "6 GHz",
        "802.11ax"
      ],
      "relatedLessons": [
        "12.2",
        "12.3"
      ]
    },
    {
      "term": "Wi-Fi 7",
      "shortDefinition": "Geração associada ao IEEE 802.11be.",
      "longDefinition": "Wi-Fi 7 é associado ao 802.11be e traz capacidades como canais mais largos, modulação mais densa e operação multi-link, dependendo de suporte de AP, cliente e ambiente.",
      "example": "Um AP Wi-Fi 7 pode oferecer recursos avançados, mas clientes antigos continuam limitados.",
      "relatedTerms": [
        "802.11be",
        "MLO",
        "4096-QAM"
      ],
      "relatedLessons": [
        "12.3",
        "12.6"
      ]
    },
    {
      "term": "OFDMA",
      "shortDefinition": "Técnica para dividir o canal em unidades menores e atender múltiplos clientes com mais eficiência.",
      "longDefinition": "Orthogonal Frequency Division Multiple Access melhora eficiência em ambientes densos ao permitir que transmissões sejam coordenadas em unidades de recurso.",
      "example": "Wi-Fi 6 usa OFDMA para melhorar experiência em redes com muitos clientes.",
      "relatedTerms": [
        "Wi-Fi 6",
        "802.11ax",
        "airtime"
      ],
      "relatedLessons": [
        "12.2",
        "12.3"
      ]
    },
    {
      "term": "MLO",
      "shortDefinition": "Multi-Link Operation, recurso associado ao Wi-Fi 7.",
      "longDefinition": "MLO permite operação coordenada por múltiplos links, potencialmente melhorando vazão, latência ou resiliência conforme implementação e cenário.",
      "example": "Um cliente Wi-Fi 7 pode usar links em bandas diferentes quando AP, cliente e configuração suportam.",
      "relatedTerms": [
        "Wi-Fi 7",
        "802.11be",
        "latência"
      ],
      "relatedLessons": [
        "12.3",
        "12.6"
      ]
    },
    {
      "term": "Cliente legado",
      "shortDefinition": "Dispositivo que suporta apenas gerações, bandas ou segurança antigas.",
      "longDefinition": "Clientes legados podem limitar a experiência, exigir exceções de segurança e consumir airtime de forma menos eficiente, precisando de inventário e segmentação.",
      "example": "Uma impressora 2.4 GHz antiga deve ficar isolada de servidores e notebooks corporativos.",
      "relatedTerms": [
        "IoT",
        "segmentação",
        "WPA2"
      ],
      "relatedLessons": [
        "12.3",
        "12.5",
        "12.7"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.11be-2024",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/ieee/802.11be/7516/",
      "note": "Referência usada para validar a descrição oficial de EHT, throughput, latência, jitter, compatibilidade e publicação do 802.11be."
    },
    {
      "type": "official-doc",
      "title": "What is Wi-Fi 6 vs. Wi-Fi 6E vs. Wi-Fi 7?",
      "organization": "Cisco",
      "url": "https://www.cisco.com/site/us/en/learn/topics/networking/what-is-wifi-6-vs-wifi-6e.html",
      "note": "Referência usada para validar diferenças entre Wi-Fi 6, 6E e 7 e a exigência de WPA3 em Wi-Fi 6E."
    },
    {
      "type": "official-doc",
      "title": "IEEE 802.11ax: The Sixth Generation of Wi-Fi White Paper",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/products/collateral/wireless/white-paper-c11-740788.html",
      "note": "Referência usada para validar OFDMA, 1024-QAM, densidade e compatibilidade em 802.11ax."
    },
    {
      "type": "official-doc",
      "title": "Establishing Wireless Robust Security Networks: A Guide to IEEE 802.11i",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/97/final",
      "note": "Referência usada para manter a linha de segurança wireless defensiva e a evolução além de WEP."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 - Aula 12.2",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/2.0/12.2",
      "note": "Aula anterior sobre RF, canais, RSSI e SNR."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Clientes Wi-Fi continuam usando endereços MAC e se integram ao domínio Ethernet por APs e switches."
    },
    {
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "Depois da associação wireless, clientes dependem de DHCP, DNS e serviços essenciais."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Segmentação, firewalls, ACLs e políticas definem o alcance real de cada perfil wireless."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "telemetria-e-baseline",
      "reason": "A decisão de atualizar Wi-Fi deve ser baseada em dados, baseline, logs e métricas."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "autenticação corporativa",
      "lesson": "802.1X-radius-certificados",
      "reason": "As próximas aulas conectam Wi-Fi corporativo a 802.1X, RADIUS, certificados e identidade."
    }
  ],
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
      "12.4"
    ]
  }
};
