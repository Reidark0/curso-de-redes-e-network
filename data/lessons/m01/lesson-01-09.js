export const lesson0109 = {
  "id": "1.9",
  "moduleId": "m01",
  "order": 9,
  "title": "Diagnóstico inicial: ipconfig, ping, arp, tracert e nslookup",
  "subtitle": "Como coletar evidências básicas de configuração, alcance, vizinhança local, caminho e DNS antes de formular hipóteses.",
  "duration": "80-115 min",
  "estimatedStudyTimeMinutes": 115,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 195,
  "tags": [
    "redes",
    "fundamentos",
    "diagnóstico",
    "troubleshooting",
    "ipconfig",
    "ping",
    "arp",
    "tracert",
    "nslookup",
    "dns",
    "icmp",
    "gateway",
    "evidências",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m00",
      "lesson": "0.8",
      "reason": "Pensamento em camadas é necessário para diagnosticar sem pular etapas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.7",
      "reason": "É necessário entender os papéis de equipamentos como NIC, switch, roteador, AP e firewall."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m01",
      "lesson": "1.8",
      "reason": "Métricas ajudam a interpretar latência, perda e disponibilidade durante os testes iniciais."
    }
  ],
  "objectives": [
    "Explicar para que servem ipconfig, ping, arp, tracert e nslookup.",
    "Construir uma sequência de diagnóstico inicial antes de culpar rede, aplicação, firewall ou DNS.",
    "Interpretar configuração local: IP, máscara, gateway, DNS, DHCP e interface.",
    "Diferenciar alcance ICMP, resolução ARP, caminho de roteamento e resolução DNS.",
    "Registrar evidências úteis para suporte, redes, SOC, cloud e DevSecOps.",
    "Aplicar limites éticos e sanitização ao coletar e compartilhar evidências."
  ],
  "learningOutcomes": [
    "Dado um host sem acesso, o aluno identifica quais comandos executar primeiro.",
    "Dado um resultado de ipconfig ou ip addr, o aluno reconhece ausência de gateway, IP inválido ou DNS suspeito.",
    "Dado um ping com falha, o aluno diferencia hipóteses de bloqueio ICMP, destino fora, rota ausente ou falha local.",
    "Dado um nslookup bem-sucedido ou falho, o aluno separa problema de DNS de problema de conectividade.",
    "Dado um cenário corporativo, o aluno registra evidências de forma útil e segura."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Quando alguém diz que a internet caiu, que o sistema não abre, que o Wi‑Fi está ruim ou que um servidor “sumiu”, o profissional de redes não deve começar reiniciando equipamentos no escuro. O primeiro passo é coletar evidências básicas: qual IP o host recebeu, qual é o gateway, se existe rota, se o destino responde, se o endereço MAC foi resolvido, por onde o tráfego tenta passar e se o nome DNS vira um endereço IP.</p>\n  <p>É aqui que entram comandos clássicos como <code>ipconfig</code>, <code>ping</code>, <code>arp</code>, <code>tracert</code> e <code>nslookup</code>. Eles parecem simples, mas formam o kit inicial de diagnóstico de qualquer profissional de infraestrutura, suporte, segurança, cloud, redes e DevSecOps. A força desses comandos não está em decorar a sintaxe, mas em entender que pergunta cada um responde.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um usuário consegue abrir alguns sites, mas não acessa o sistema interno. O time de aplicação diz que o serviço está online. O firewall não mostra bloqueio evidente. Antes de abrir um chamado genérico para “a rede”, você precisa verificar IP, gateway, ARP, rota até o destino e DNS.</div>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>Desde os primeiros sistemas conectados em rede, operadores precisaram de ferramentas mínimas para responder perguntas simples: “qual é meu endereço?”, “o outro host responde?”, “por onde o pacote passa?” e “esse nome resolve?”. Com o crescimento do TCP/IP, surgiram utilitários padronizados ou amplamente adotados em sistemas Unix, Windows, equipamentos Cisco e ferramentas de suporte.</p>\n  <p>O <code>ping</code> se popularizou como teste de alcance usando ICMP. O <code>traceroute</code> e seu equivalente Windows <code>tracert</code> ajudaram a visualizar saltos de caminho. O <code>arp</code> permitiu enxergar a associação local entre IP e MAC. O <code>ipconfig</code> no Windows e comandos como <code>ip addr</code> e <code>ip route</code> no Linux expuseram configuração local. O <code>nslookup</code> e depois ferramentas como <code>dig</code> ajudaram a investigar DNS.</p>\n  <p>Em ambientes modernos, essas ferramentas continuam úteis, mesmo com cloud, VPN, Zero Trust, containers e Kubernetes. Elas não resolvem tudo, mas criam a primeira linha de evidência antes de usar ferramentas avançadas como Wireshark, tcpdump, NetFlow, logs de firewall, SIEM, APM ou tracing distribuído.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema é que sintomas de rede são ambíguos. “Não acessa” pode significar IP inválido, gateway ausente, DNS quebrado, ARP não resolvido, firewall bloqueando, rota incorreta, servidor fora, porta fechada, proxy mal configurado ou autenticação falhando. Sem uma sequência mínima, o diagnóstico vira tentativa e erro.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Sem verificar IP:</strong> você pode investigar DNS enquanto o host nem recebeu endereço válido.</li>\n    <li><strong>Sem verificar gateway:</strong> você pode culpar a internet quando falta rota padrão.</li>\n    <li><strong>Sem verificar ARP:</strong> você pode ignorar uma falha local entre host, switch, VLAN e gateway.</li>\n    <li><strong>Sem testar alcance:</strong> você não sabe se o destino responde ou se o bloqueio ocorre antes.</li>\n    <li><strong>Sem verificar DNS:</strong> você pode confundir problema de nome com problema de conectividade.</li>\n    <li><strong>Sem registrar evidências:</strong> você não consegue comparar antes/depois, acionar outro time ou provar a causa.</li>\n  </ul>\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>O diagnóstico inicial evoluiu de comandos isolados para uma sequência de investigação. Antes, muitos testes eram feitos manualmente em hosts físicos dentro de uma LAN simples. Hoje, o mesmo raciocínio precisa funcionar em redes domésticas, empresas, VPN, cloud, VMs, containers e ambientes híbridos.</p>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Fase</th><th>Ferramenta comum</th><th>O que respondia</th><th>Limitação</th></tr></thead>\n    <tbody>\n      <tr><td>Configuração local</td><td><code>ipconfig</code>, <code>ip addr</code></td><td>Qual IP, máscara, gateway e DNS o host possui?</td><td>Não prova que o caminho funciona.</td></tr>\n      <tr><td>Alcance básico</td><td><code>ping</code></td><td>Há resposta ICMP do destino?</td><td>ICMP pode ser bloqueado ou tratado diferente da aplicação.</td></tr>\n      <tr><td>Vizinhança local</td><td><code>arp</code></td><td>O IP local foi resolvido para um MAC?</td><td>Não mostra roteamento além da LAN.</td></tr>\n      <tr><td>Caminho</td><td><code>tracert</code>, <code>traceroute</code></td><td>Quais saltos aparecem até o destino?</td><td>Rotas assimétricas e filtros podem esconder saltos.</td></tr>\n      <tr><td>Nome para IP</td><td><code>nslookup</code>, <code>dig</code></td><td>DNS resolve corretamente?</td><td>Não testa aplicação nem autorização.</td></tr>\n      <tr><td>Serviço e porta</td><td><code>Test-NetConnection</code>, <code>curl</code>, <code>nc</code></td><td>A porta ou aplicação responde?</td><td>Já é uma etapa além do diagnóstico inicial.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Diagnóstico inicial de rede é a coleta ordenada de evidências básicas para descobrir se o problema está na configuração local, na conectividade local, no caminho até o destino, na resolução de nomes ou em uma camada superior.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> comandos de diagnóstico inicial são ferramentas de linha de comando usadas para observar configuração de rede, alcance, vizinhança ARP, caminho de roteamento e resolução DNS antes de formular hipóteses mais avançadas.</div>\n  <table class=\"data-table comparison-table\">\n    <thead><tr><th>Comando</th><th>Pergunta principal</th><th>Camada mental</th><th>Erro comum</th></tr></thead>\n    <tbody>\n      <tr><td><code>ipconfig</code></td><td>Meu host está configurado corretamente?</td><td>Configuração local</td><td>Ignorar máscara, gateway e DNS.</td></tr>\n      <tr><td><code>ping</code></td><td>O destino responde a ICMP?</td><td>Alcance básico</td><td>Concluir que a aplicação está saudável.</td></tr>\n      <tr><td><code>arp</code></td><td>O IP local virou MAC?</td><td>Camada local</td><td>Achar que ARP funciona pela internet.</td></tr>\n      <tr><td><code>tracert</code></td><td>Quais saltos aparecem até o destino?</td><td>Caminho</td><td>Interpretar salto sem resposta como falha definitiva.</td></tr>\n      <tr><td><code>nslookup</code></td><td>O nome resolve para IP?</td><td>DNS</td><td>Confundir DNS com conectividade completa.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O valor desses comandos aparece quando você entende o mecanismo por trás deles.</p>\n  <ol class=\"flow-list\">\n    <li><strong><code>ipconfig /all</code>:</strong> lê a configuração de interfaces no Windows, incluindo endereço IPv4, máscara, gateway, DNS, DHCP, sufixo DNS e estado da interface.</li>\n    <li><strong><code>ping</code>:</strong> normalmente envia mensagens ICMP Echo Request e aguarda ICMP Echo Reply. Ele mede tempo de ida e volta, mas não testa TCP, UDP, HTTP ou autenticação.</li>\n    <li><strong><code>arp -a</code>:</strong> mostra a tabela ARP, isto é, associações conhecidas entre IPs locais e endereços MAC. Ela ajuda a investigar comunicação dentro da mesma rede local ou com o gateway.</li>\n    <li><strong><code>tracert</code>:</strong> envia pacotes com TTL crescente. Cada roteador que decrementa o TTL até zero pode responder, revelando um salto do caminho.</li>\n    <li><strong><code>nslookup</code>:</strong> consulta servidores DNS para descobrir como um nome é resolvido em registros como A, AAAA, CNAME ou MX, dependendo da consulta.</li>\n  </ol>\n  <div class=\"callout callout--warning\"><strong>Atenção:</strong> respostas ausentes nem sempre significam falha. Firewalls e roteadores podem bloquear ICMP, não responder a TTL expirado, aplicar rate limit ou responder por caminhos diferentes.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma arquitetura real, o diagnóstico inicial deve seguir uma ordem que reduz hipóteses. Primeiro o host. Depois a rede local. Depois o gateway. Depois o caminho. Depois DNS. Depois serviço e aplicação.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Host:</strong> interface ativa, IP, máscara, gateway, DNS, rota default.</li>\n    <li><strong>Rede local:</strong> link, Wi‑Fi, VLAN, ARP, switch, AP, porta física.</li>\n    <li><strong>Gateway:</strong> primeiro salto para sair da rede local.</li>\n    <li><strong>Caminho:</strong> roteadores, firewall, WAN, VPN, internet, cloud.</li>\n    <li><strong>DNS:</strong> nome, servidor consultado, resposta esperada, split DNS, cache.</li>\n    <li><strong>Serviço:</strong> porta, protocolo, TLS, autenticação, autorização e aplicação.</li>\n  </ul>\n  <p>Essa arquitetura mental evita pular direto para conclusões. Um problema de DNS pode parecer “sistema fora”. Uma falha de ARP pode parecer “internet caiu”. Um firewall bloqueando ICMP pode parecer “servidor desligado”.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em uma entrega. Antes de culpar a transportadora, você verifica se sua casa tem endereço, se a rua existe, se o porteiro sabe para onde encaminhar, se há rota até o bairro, se o nome do destinatário está correto e se alguém pode receber o pacote.</p>\n  <p>Na rede, <code>ipconfig</code> confirma seu endereço. <code>arp</code> verifica a entrega local até o próximo vizinho. <code>ping</code> testa se alguém responde. <code>tracert</code> mostra alguns pontos do caminho. <code>nslookup</code> confirma se o nome do destino vira endereço.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes têm caches, políticas, caminhos assimétricos, NAT, firewall, protocolos diferentes e respostas bloqueadas. Nem todo ponto do caminho é obrigado a responder ao diagnóstico.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Seu notebook está conectado ao Wi‑Fi, mas nenhum site abre. Uma sequência básica seria:</p>\n  <ol class=\"flow-list\">\n    <li>Rodar <code>ipconfig /all</code> para ver se recebeu IP válido, gateway e DNS.</li>\n    <li>Rodar <code>ping &lt;gateway&gt;</code> para testar alcance até o roteador local.</li>\n    <li>Rodar <code>arp -a</code> para verificar se o gateway tem endereço MAC conhecido.</li>\n    <li>Rodar <code>ping 8.8.8.8</code> ou outro destino autorizado para testar saída por IP.</li>\n    <li>Rodar <code>nslookup exemplo.com</code> para testar resolução de nomes.</li>\n    <li>Se IP funciona e nome não, a hipótese de DNS ganha força.</li>\n  </ol>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, um usuário não acessa o ERP interno. O suporte coleta <code>ipconfig /all</code> e percebe que o notebook está em uma VLAN de visitantes. O <code>ping</code> para o gateway responde, mas o <code>tracert</code> para o ERP para no firewall. O <code>nslookup</code> resolve o nome para um IP interno correto. A evidência indica que o problema não é DNS nem link físico; é segmentação ou política entre VLANs.</p>\n  <p>Esse exemplo mostra que comandos simples ajudam a acionar o time certo. Em vez de “o sistema caiu”, o chamado pode dizer: “host na rede de visitantes resolve o nome do ERP, alcança gateway, mas o tráfego até a rede do ERP é interrompido no caminho de firewall”.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, você pode diagnosticar uma VM que não acessa um banco privado. O equivalente ao diagnóstico local inclui verificar IP privado, subnet, route table, security group ou NSG, DNS privado, peering, private endpoint, firewall gerenciado e resolução de nome.</p>\n  <p>O comando no sistema operacional ainda importa: <code>ip addr</code>, <code>ip route</code>, <code>nslookup</code> e <code>ping</code> ajudam a separar problema dentro da VM de problema na rede virtual. Mas cloud adiciona camadas invisíveis: política de segurança, rota efetiva, DNS privado, endpoint gerenciado e controle de identidade.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Um pipeline falha ao baixar dependências de um registry interno. Antes de culpar o artefato, o diagnóstico verifica se o runner possui DNS correto, rota para a rede interna, acesso ao proxy, resolução do nome do registry e porta liberada. Em runners efêmeros, containers e Kubernetes, comandos equivalentes como <code>ip addr</code>, <code>ip route</code>, <code>nslookup</code>, <code>curl -v</code> e <code>ss</code> ajudam a provar se a falha é rede, DNS, TLS, proxy, credencial ou autorização.</p>\n  <p>Em IaC, essas evidências viram requisitos: rotas declaradas, regras mínimas, DNS privado, NetworkPolicy, service accounts, secrets corretos e testes automatizados de conectividade.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Para segurança, comandos básicos são úteis tanto para defesa quanto para investigação. Eles ajudam a identificar gateway inesperado, DNS suspeito, ARP estranho, rota não prevista, perda anormal e resolução de nomes para destinos indevidos. O foco deve ser defensivo: coletar evidências em sistemas autorizados, sem varrer redes sem permissão.</p>\n  <table class=\"data-table risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>DNS malicioso</td><td><code>ipconfig /all</code> mostra DNS desconhecido</td><td>Redirecionamento, phishing ou perda de acesso</td><td>DHCP controlado, DNS corporativo, EDR, hardening</td></tr>\n      <tr><td>Gateway incorreto</td><td>Gateway diferente do esperado</td><td>Tráfego passa por caminho não autorizado</td><td>Controle de DHCP, NAC, segmentação e monitoramento</td></tr>\n      <tr><td>ARP suspeito</td><td>MAC do gateway muda de forma inesperada</td><td>Interceptação ou negação de serviço</td><td>Port security, DHCP snooping, Dynamic ARP Inspection, logs</td></tr>\n      <tr><td>Exposição de evidências</td><td>Prints com IPs, nomes internos e domínios</td><td>Vazamento de informação sensível</td><td>Sanitização antes de compartilhar</td></tr>\n    </tbody>\n  </table>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 430\" role=\"img\" aria-labelledby=\"m01l09-title m01l09-desc\">\n    <title id=\"m01l09-title\">Sequência de diagnóstico inicial de rede</title>\n    <desc id=\"m01l09-desc\">Fluxo mostrando host, configuração local, ARP, gateway, caminho, DNS e serviço, associado aos comandos ipconfig, ping, arp, tracert e nslookup.</desc>\n    <defs>\n      <marker id=\"m01l09-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\"></rect>\n    <text x=\"107\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Host</text>\n    <text x=\"107\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ipconfig</text>\n\n    <rect x=\"235\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\"></rect>\n    <text x=\"307\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Rede local</text>\n    <text x=\"307\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">arp -a</text>\n\n    <rect x=\"435\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\"></rect>\n    <text x=\"507\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Gateway</text>\n    <text x=\"507\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ping gateway</text>\n\n    <rect x=\"635\" y=\"60\" width=\"145\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\"></rect>\n    <text x=\"707\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Caminho</text>\n    <text x=\"707\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">tracert</text>\n\n    <rect x=\"835\" y=\"60\" width=\"110\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\"></rect>\n    <text x=\"890\" y=\"88\" text-anchor=\"middle\" class=\"svg-label\">Serviço</text>\n    <text x=\"890\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">destino</text>\n\n    <line x1=\"180\" y1=\"95\" x2=\"235\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"380\" y1=\"95\" x2=\"435\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"580\" y1=\"95\" x2=\"635\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"780\" y1=\"95\" x2=\"835\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#m01l09-arrow)\"></line>\n\n    <rect x=\"90\" y=\"210\" width=\"180\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--cloud\"></rect>\n    <text x=\"180\" y=\"240\" text-anchor=\"middle\" class=\"svg-label\">DNS</text>\n    <text x=\"180\" y=\"265\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">nslookup</text>\n    <text x=\"180\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">nome → IP</text>\n\n    <rect x=\"360\" y=\"205\" width=\"255\" height=\"105\" rx=\"12\" class=\"svg-node svg-node--security\"></rect>\n    <text x=\"487\" y=\"235\" text-anchor=\"middle\" class=\"svg-label\">Interpretação</text>\n    <text x=\"487\" y=\"260\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">configuração, alcance, ARP, rota, DNS</text>\n    <text x=\"487\" y=\"282\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">evidência antes da hipótese</text>\n\n    <rect x=\"700\" y=\"210\" width=\"200\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--attacker\"></rect>\n    <text x=\"800\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Riscos</text>\n    <text x=\"800\" y=\"263\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">DNS suspeito</text>\n    <text x=\"800\" y=\"285\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">gateway/ARP inesperado</text>\n\n    <line x1=\"235\" y1=\"210\" x2=\"360\" y2=\"250\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#m01l09-arrow)\"></line>\n    <line x1=\"615\" y1=\"250\" x2=\"700\" y2=\"250\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#m01l09-arrow)\"></line>\n\n    <text x=\"490\" y=\"370\" text-anchor=\"middle\" class=\"svg-label\">Diagnóstico inicial: colete sinais pequenos, interprete em ordem e só então formule a hipótese.</text>\n  </svg>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula cria um roteiro seguro de diagnóstico inicial. Você vai coletar configuração local, testar gateway, observar ARP, testar DNS e registrar evidências. O objetivo não é invadir, varrer ou forçar tráfego: é aprender a observar a própria máquina e a rede em que você está autorizado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam interpretação. O foco é responder: qual comando usar, que evidência esperar e que hipótese ganha ou perde força.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário de usuário sem acesso a um sistema interno. Seu trabalho será montar uma árvore de diagnóstico inicial com comandos, evidências esperadas e próximos encaminhamentos.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como raciocinar em ordem: primeiro configuração local, depois rede local, gateway, caminho, DNS e somente depois serviço, aplicação, autenticação e autorização.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> comandos básicos não são “comandos mágicos”; eles respondem perguntas específicas.</li>\n    <li><strong>O que lembrar:</strong> verifique IP, gateway, ARP, alcance, caminho e DNS antes de culpar aplicação ou firewall.</li>\n    <li><strong>Erro comum:</strong> achar que <code>ping</code> sozinho prova que a aplicação funciona ou que o servidor está saudável.</li>\n    <li><strong>Uso real:</strong> suporte, SOC, cloud, DevSecOps e redes usam essas evidências para acionar o time correto.</li>\n    <li><strong>Segurança:</strong> sanitize evidências antes de compartilhar e execute testes apenas em ambientes autorizados.</li>\n  </ul>\n</section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você fará a revisão e o mini-projeto do Módulo 1: mapear sua rede. A aula 1.9 fornece os comandos básicos que alimentam esse mini-projeto com evidências reais.</p>\n</section>"
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
      "ARP",
      "ICMP",
      "IPv4",
      "IPv6",
      "DNS",
      "TCP",
      "UDP"
    ],
    "dependsOn": [
      "pensamento em camadas",
      "equipamentos de rede",
      "métricas",
      "gateway",
      "DNS",
      "endereçamento"
    ],
    "enables": [
      "troubleshooting profissional",
      "mapeamento de rede",
      "análise de incidentes",
      "diagnóstico de DNS",
      "diagnóstico de conectividade"
    ]
  },
  "deepDive": {
    "mentalModel": "Diagnóstico inicial é uma escada: configuração local, vizinhança, gateway, caminho, nome e serviço. Suba um degrau por vez e registre o que cada teste prova e o que ele não prova.",
    "keyTerms": [
      "ipconfig",
      "ping",
      "arp",
      "tracert",
      "nslookup",
      "gateway",
      "DNS",
      "ICMP",
      "ARP cache",
      "TTL",
      "rota",
      "evidência"
    ],
    "limitations": [
      "Ping pode ser bloqueado sem que a aplicação esteja fora.",
      "Tracert pode mostrar saltos incompletos por filtros, rate limit ou caminhos assimétricos.",
      "ARP só ajuda no domínio local ou no próximo salto, não atravessa roteadores.",
      "Nslookup testa resolução de nomes, não testa porta, TLS, autenticação ou autorização.",
      "Ipconfig mostra configuração, mas não garante que o caminho esteja funcional."
    ],
    "whenToUse": [
      "Use ipconfig ou ip addr no início de qualquer diagnóstico de host.",
      "Use ping para testar alcance básico e latência aproximada quando ICMP for permitido.",
      "Use arp quando suspeitar de falha local até gateway ou conflito de vizinhança.",
      "Use tracert/traceroute quando precisar observar saltos até um destino.",
      "Use nslookup/dig quando o problema ocorre por nome, mas talvez não por IP."
    ],
    "whenNotToUse": [
      "Não use esses comandos para varrer redes sem autorização.",
      "Não conclua saúde de aplicação apenas com ping.",
      "Não trate ausência de resposta ICMP como prova definitiva de queda.",
      "Não compartilhe outputs com IPs, nomes internos e domínios sensíveis sem sanitizar.",
      "Não altere configurações de produção apenas com base em uma evidência isolada."
    ],
    "operationalImpact": [
      "Reduz tempo de atendimento porque separa configuração, rede local, DNS e caminho.",
      "Melhora comunicação entre suporte, redes, segurança, cloud e aplicação.",
      "Exige padronização de coleta de evidências para evitar chamados vagos.",
      "Ajuda a comparar antes e depois de mudanças de rede."
    ],
    "financialImpact": [
      "Evita compra desnecessária de link quando o problema é DNS, gateway, Wi-Fi ou política.",
      "Reduz horas de troubleshooting por tentativa e erro.",
      "Ajuda a justificar ferramentas de monitoramento mais avançadas quando os comandos básicos não bastam.",
      "Em cloud, evita manter recursos ou rotas erradas por diagnóstico incompleto."
    ],
    "securityImpact": [
      "Pode revelar gateway, DNS e rotas suspeitas em incidentes.",
      "Evidências podem conter informação sensível e devem ser protegidas.",
      "Comandos básicos devem ser usados de forma defensiva e autorizada.",
      "Resultados anômalos precisam ser correlacionados com logs, EDR, DHCP, firewall e identidade."
    ],
    "decisionTable": [
      {
        "situation": "Host sem internet e IP 169.254.x.x",
        "recommendedChoice": "Investigar DHCP, cabo, Wi‑Fi, VLAN ou AP antes de DNS externo",
        "why": "Endereço APIPA indica que o host não recebeu configuração IPv4 via DHCP",
        "risk": "Culpar DNS quando o host nem possui configuração válida"
      },
      {
        "situation": "Ping por IP funciona, acesso por nome falha",
        "recommendedChoice": "Testar nslookup e servidores DNS configurados",
        "why": "Conectividade por IP existe, mas resolução de nomes pode estar quebrada",
        "risk": "Abrir chamado para aplicação sem testar DNS"
      },
      {
        "situation": "Gateway não responde e não aparece no ARP",
        "recommendedChoice": "Verificar link, VLAN, Wi‑Fi, gateway configurado e porta local",
        "why": "A falha parece local antes de sair da rede",
        "risk": "Investigar WAN ou cloud antes de resolver camada local"
      }
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Usar ping como único teste de rede.",
      "whyItHappens": "Ping é rápido, conhecido e fácil de executar.",
      "consequence": "Problemas de DNS, porta, TLS, autenticação e aplicação ficam ocultos.",
      "correction": "Use ping como uma evidência de alcance ICMP, não como teste completo."
    },
    {
      "mistake": "Ignorar gateway e DNS no ipconfig.",
      "whyItHappens": "Muitos olham apenas o endereço IPv4.",
      "consequence": "A causa real pode ser rota default ausente ou DNS errado.",
      "correction": "Sempre verifique IP, máscara, gateway, DNS, DHCP e interface."
    },
    {
      "mistake": "Achar que ARP mostra todos os dispositivos da internet.",
      "whyItHappens": "ARP lista IPs e MACs e parece uma tabela geral.",
      "consequence": "Interpretação errada do escopo local.",
      "correction": "ARP resolve vizinhos locais e o próximo salto, não destinos remotos através de roteadores."
    },
    {
      "mistake": "Interpretar salto sem resposta no tracert como falha definitiva.",
      "whyItHappens": "O aluno espera que todo roteador responda.",
      "consequence": "Diagnóstico falso de queda no meio do caminho.",
      "correction": "Roteadores podem filtrar ICMP/TTL; observe se o destino final responde e correlacione evidências."
    },
    {
      "mistake": "Compartilhar prints completos sem sanitizar.",
      "whyItHappens": "Pressa para abrir chamado ou pedir ajuda.",
      "consequence": "Vazamento de IPs internos, domínios, nomes de host e estrutura de rede.",
      "correction": "Remova ou mascare dados sensíveis antes de compartilhar externamente."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Sem internet",
      "Acessa por IP mas não por nome",
      "Gateway não responde",
      "Sistema interno inacessível",
      "Wi‑Fi conectado sem acesso",
      "Tracert para antes do destino",
      "DNS retorna IP inesperado"
    ],
    "diagnosticQuestions": [
      "O host tem IP válido?",
      "Existe gateway padrão?",
      "Qual DNS está configurado?",
      "O gateway responde?",
      "O gateway aparece na tabela ARP?",
      "O destino por IP responde?",
      "O nome resolve?",
      "O problema ocorre em todos os hosts ou apenas um?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all",
        "purpose": "Ver configuração completa de interfaces, gateway, DNS e DHCP.",
        "expectedObservation": "IPv4 válido, máscara, gateway padrão e DNS esperado.",
        "interpretation": "Ausência de gateway ou DNS estranho muda a hipótese inicial."
      },
      {
        "platform": "Windows",
        "command": "ping <gateway>",
        "purpose": "Testar alcance básico até o gateway local.",
        "expectedObservation": "Respostas com tempo em ms ou falha clara.",
        "interpretation": "Falha sugere problema local, VLAN, Wi‑Fi, cabo, gateway ou bloqueio ICMP."
      },
      {
        "platform": "Windows",
        "command": "arp -a",
        "purpose": "Observar associações IP-MAC conhecidas no host.",
        "expectedObservation": "Entrada para o gateway após tráfego local.",
        "interpretation": "Ausência do gateway após ping pode indicar falha local ou bloqueio."
      },
      {
        "platform": "Windows",
        "command": "tracert <destino>",
        "purpose": "Observar saltos até um destino.",
        "expectedObservation": "Primeiro salto normalmente é o gateway local.",
        "interpretation": "Ajuda a identificar onde o caminho deixa de responder, com cautela."
      },
      {
        "platform": "Windows",
        "command": "nslookup <nome>",
        "purpose": "Testar resolução DNS.",
        "expectedObservation": "Servidor consultado e IPs retornados.",
        "interpretation": "Erro de resolução aponta para DNS, domínio, conectividade com DNS ou política."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route",
        "purpose": "Ver IPs locais e rota default.",
        "expectedObservation": "Interface com IP e rota default via gateway.",
        "interpretation": "Sem rota default, tráfego externo não sai corretamente."
      },
      {
        "platform": "Linux",
        "command": "ping -c 4 <gateway> && ip neigh",
        "purpose": "Testar gateway e observar vizinhança local.",
        "expectedObservation": "Respostas ICMP e entrada REACHABLE/STALE para o gateway.",
        "interpretation": "Ajuda a correlacionar alcance local e resolução de vizinho."
      },
      {
        "platform": "Linux",
        "command": "traceroute <destino> || tracepath <destino>",
        "purpose": "Observar caminho e possíveis problemas de rota/MTU.",
        "expectedObservation": "Saltos ou pontos sem resposta.",
        "interpretation": "Use como pista, não como prova isolada."
      },
      {
        "platform": "Linux",
        "command": "nslookup <nome> || dig <nome>",
        "purpose": "Testar DNS.",
        "expectedObservation": "Resposta A/AAAA/CNAME ou erro.",
        "interpretation": "Se IP funciona e DNS falha, DNS vira hipótese principal."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip interface brief",
        "purpose": "Ver estado das interfaces e IPs.",
        "expectedObservation": "Interfaces relevantes up/up.",
        "interpretation": "Interface down/down ou administratively down indica problema físico ou configuração."
      },
      {
        "platform": "Cisco IOS",
        "command": "show ip route",
        "purpose": "Ver tabela de roteamento.",
        "expectedObservation": "Rotas conectadas, default ou rotas esperadas.",
        "interpretation": "Ausência de rota explica falha de encaminhamento."
      },
      {
        "platform": "Cisco IOS",
        "command": "show arp",
        "purpose": "Ver tabela ARP do equipamento.",
        "expectedObservation": "Associações IP-MAC para vizinhos locais.",
        "interpretation": "Ajuda a confirmar comunicação local e gateways."
      }
    ],
    "decisionTree": [
      {
        "if": "Host sem IP válido",
        "then": "Investigar DHCP, link, Wi‑Fi, VLAN e interface antes de DNS ou aplicação."
      },
      {
        "if": "Host tem IP mas não tem gateway",
        "then": "Corrigir configuração, DHCP ou perfil de rede; sem gateway não há saída para outras redes."
      },
      {
        "if": "Gateway não responde e não aparece no ARP",
        "then": "Investigar rede local, switch, AP, VLAN, cabo, porta, firewall local ou bloqueio ICMP."
      },
      {
        "if": "Ping por IP funciona, mas nome falha",
        "then": "Investigar DNS configurado, split DNS, cache, domínio e conectividade com servidor DNS."
      },
      {
        "if": "DNS resolve e ping responde, mas aplicação falha",
        "then": "Avançar para porta, protocolo, TLS, proxy, autenticação, autorização e logs de aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Executar testes apenas em sistemas e redes autorizados.",
      "Registrar data, hora, origem, destino e comando usado.",
      "Sanitizar outputs antes de compartilhar fora do time autorizado.",
      "Correlacionar evidências com logs de DHCP, DNS, firewall, EDR e SIEM.",
      "Padronizar roteiro de diagnóstico para evitar coletas invasivas ou irrelevantes."
    ],
    "badPractices": [
      "Rodar varreduras amplas sem autorização.",
      "Compartilhar prints com IPs internos, nomes de domínio e usuários.",
      "Concluir ataque apenas por um resultado isolado.",
      "Alterar DNS, gateway ou rota em produção sem mudança aprovada.",
      "Ignorar políticas corporativas de coleta de evidências."
    ],
    "commonErrors": [
      "Confundir teste ICMP com teste de aplicação.",
      "Confundir DNS com autorização.",
      "Confundir ARP local com roteamento remoto.",
      "Tratar traceroute incompleto como prova definitiva.",
      "Não preservar evidências antes de mudar configuração."
    ],
    "vulnerabilities": [
      {
        "name": "DNS não autorizado",
        "description": "Um host pode estar usando servidor DNS inesperado por configuração manual, DHCP indevido ou comprometimento.",
        "defensiveExplanation": "O diagnóstico deve identificar o servidor DNS usado e comparar com o padrão esperado.",
        "mitigation": "Controle de DHCP, políticas de endpoint, DNS corporativo, bloqueio de DNS externo quando apropriado e monitoramento."
      },
      {
        "name": "Gateway ou ARP suspeito",
        "description": "Alterações inesperadas no gateway ou no MAC associado podem indicar erro de rede ou tentativa de interceptação local.",
        "defensiveExplanation": "A análise deve ser feita com logs de switch, DHCP, NAC e EDR, sem executar ataque de ARP spoofing.",
        "mitigation": "Port security, DHCP snooping, Dynamic ARP Inspection, segmentação e monitoramento."
      },
      {
        "name": "Vazamento de topologia",
        "description": "Outputs de diagnóstico podem revelar estrutura interna da rede.",
        "defensiveExplanation": "Evidências são úteis para troubleshooting, mas devem ser tratadas como informação sensível.",
        "mitigation": "Sanitização, controle de acesso a chamados e compartilhamento apenas com times autorizados."
      }
    ],
    "monitoring": [
      "Mudança de DNS em endpoints",
      "Gateways inesperados por segmento",
      "Aumento de falhas de resolução DNS",
      "Muitos hosts com IP APIPA",
      "Alterações incomuns em ARP ou MAC do gateway",
      "Falhas recorrentes no primeiro salto"
    ],
    "hardening": [
      "DHCP controlado",
      "DNS corporativo com logging",
      "NAC ou 802.1X onde aplicável",
      "Segmentação por VLAN",
      "Controle de portas físicas",
      "Políticas de endpoint para impedir DNS/gateway manual indevido"
    ],
    "detectionIdeas": [
      "Comparar DNS configurado em endpoints com inventário aprovado.",
      "Alertar para gateways não esperados por VLAN.",
      "Correlacionar chamados de indisponibilidade com logs DHCP/DNS/firewall.",
      "Monitorar queda de disponibilidade do gateway por segmento."
    ]
  },
  "lab": {
    "id": "lab-1.9",
    "title": "Roteiro seguro de diagnóstico inicial com comandos básicos",
    "labType": "security",
    "objective": "Coletar e interpretar evidências iniciais de rede usando comandos básicos, sem alterar configurações e sem testar redes não autorizadas.",
    "scenario": "Você está em um computador autorizado e precisa montar um relatório inicial para explicar se a conectividade local, gateway, ARP, caminho e DNS parecem saudáveis.",
    "topology": "Seu computador → rede local/Wi‑Fi → gateway → internet ou serviço autorizado → DNS configurado",
    "architecture": "Diagnóstico em camadas: host, rede local, gateway, caminho, DNS e próximo passo para serviço/aplicação.",
    "prerequisites": [
      "Ter concluído as aulas 1.1 a 1.8.",
      "Usar apenas sua própria máquina ou ambiente autorizado.",
      "Ter permissão para executar comandos de diagnóstico básicos."
    ],
    "tools": [
      "Windows PowerShell ou Prompt de Comando",
      "Terminal Linux opcional",
      "Conexão de rede autorizada",
      "Editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não faça varredura de redes sem autorização.",
      "Não teste destinos internos sensíveis sem permissão.",
      "Não compartilhe outputs com IPs, nomes internos ou domínios sem sanitizar.",
      "Não altere DNS, gateway, rotas ou interface durante este laboratório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar contexto do teste",
        "instruction": "Anote data, hora, local lógico e objetivo do diagnóstico. Não inclua dados sensíveis desnecessários.",
        "command": "# Exemplo de registro manual:\nData/hora: ____\nRede: doméstica/laboratório/corporativa autorizada\nSintoma: ____",
        "expectedOutput": "Contexto documentado antes dos comandos.",
        "explanation": "Sem contexto, evidência perde valor. Horário e origem ajudam a correlacionar logs."
      },
      {
        "number": 2,
        "title": "Coletar configuração local no Windows",
        "instruction": "No Windows, colete IP, máscara, gateway, DNS e DHCP.",
        "command": "ipconfig /all",
        "expectedOutput": "Lista de adaptadores com IPv4, gateway padrão, servidores DNS e DHCP.",
        "explanation": "Esse comando responde se o host está configurado para participar da rede."
      },
      {
        "number": 3,
        "title": "Coletar configuração local no Linux, se aplicável",
        "instruction": "No Linux, colete endereços e rotas.",
        "command": "ip addr\nip route",
        "expectedOutput": "Interfaces com endereços e uma rota default via gateway, quando houver saída externa.",
        "explanation": "A rota default indica para onde o host envia tráfego fora da rede local."
      },
      {
        "number": 4,
        "title": "Testar gateway padrão",
        "instruction": "Identifique o gateway e teste alcance básico até ele.",
        "command": "ping <IP_DO_GATEWAY>",
        "expectedOutput": "Respostas com tempo em ms ou falha clara.",
        "explanation": "Se o gateway não responde, a hipótese local ganha força, embora ICMP possa ser bloqueado."
      },
      {
        "number": 5,
        "title": "Observar tabela ARP ou vizinhança",
        "instruction": "Veja se o gateway aparece associado a um MAC após o teste.",
        "command": "arp -a  # Windows\nip neigh  # Linux",
        "expectedOutput": "Entrada associando o IP do gateway a um endereço MAC ou vizinho.",
        "explanation": "Isso mostra resolução local para o próximo salto."
      },
      {
        "number": 6,
        "title": "Testar destino por IP autorizado",
        "instruction": "Teste um IP autorizado ou público permitido pela sua política. Evite destinos sensíveis.",
        "command": "ping <IP_AUTORIZADO>",
        "expectedOutput": "Respostas ou falhas que indiquem se há alcance por IP além da rede local.",
        "explanation": "Se o gateway responde, mas IP externo não, investigue rota, firewall, provedor, VPN ou política."
      },
      {
        "number": 7,
        "title": "Observar caminho até o destino",
        "instruction": "Execute tracert/traceroute para observar saltos, lembrando que nem todos respondem.",
        "command": "tracert <DESTINO>  # Windows\ntraceroute <DESTINO>  # Linux, se instalado",
        "expectedOutput": "Lista de saltos ou asteriscos em alguns pontos.",
        "explanation": "O caminho é uma pista, não uma prova absoluta. Interprete com cautela."
      },
      {
        "number": 8,
        "title": "Testar resolução DNS",
        "instruction": "Consulte um nome autorizado e registre qual servidor DNS respondeu.",
        "command": "nslookup <NOME_AUTORIZADO>",
        "expectedOutput": "Servidor DNS consultado e endereço(s) retornado(s).",
        "explanation": "Se por IP funciona e por nome não, DNS vira uma hipótese forte."
      },
      {
        "number": 9,
        "title": "Montar matriz de interpretação",
        "instruction": "Classifique as evidências por camada mental: configuração, local, gateway, caminho, DNS e próximo passo.",
        "command": "# Tabela manual:\nItem | Evidência | Interpretação | Próxima hipótese",
        "expectedOutput": "Tabela preenchida com evidências e hipóteses.",
        "explanation": "Diagnóstico profissional comunica evidência e interpretação, não apenas prints."
      },
      {
        "number": 10,
        "title": "Sanitizar relatório",
        "instruction": "Remova dados sensíveis antes de compartilhar fora do ambiente autorizado.",
        "command": "# Mascarar exemplos:\n192.168.10.25 -> 192.168.x.x\nhost-financeiro01 -> host-interno-01\nempresa.local -> dominio-interno",
        "expectedOutput": "Relatório com informação suficiente para diagnóstico e sem exposição desnecessária.",
        "explanation": "Evidência de rede é informação sensível e deve ser protegida."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um relatório com configuração local, teste de gateway, ARP/vizinhança, caminho, DNS, interpretação e próxima hipótese.",
    "validation": [
      {
        "check": "Configuração local registrada",
        "command": "ipconfig /all ou ip addr && ip route",
        "expected": "IP, gateway e DNS identificados.",
        "ifFails": "Verifique se a interface correta foi analisada e se há conexão ativa."
      },
      {
        "check": "Gateway identificado e testado",
        "command": "ping <gateway>",
        "expected": "Resposta ou falha documentada.",
        "ifFails": "Se não houver gateway, investigue DHCP ou configuração da interface."
      },
      {
        "check": "Tabela ARP/vizinhança observada",
        "command": "arp -a ou ip neigh",
        "expected": "Entrada do gateway ou ausência interpretada.",
        "ifFails": "Gere tráfego para o gateway e observe novamente."
      },
      {
        "check": "DNS testado",
        "command": "nslookup <nome>",
        "expected": "Servidor consultado e resposta ou erro.",
        "ifFails": "Verifique DNS configurado, conectividade com DNS e nome consultado."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "IP 169.254.x.x no Windows",
        "probableCause": "Falha ao obter DHCP.",
        "howToConfirm": "ipconfig /all mostra DHCP habilitado, mas sem servidor válido.",
        "fix": "Verificar Wi‑Fi/cabo, VLAN, AP, DHCP e política da rede."
      },
      {
        "symptom": "Gateway ausente",
        "probableCause": "Configuração incompleta ou DHCP incorreto.",
        "howToConfirm": "ipconfig /all ou ip route sem default gateway.",
        "fix": "Revisar DHCP, perfil de rede ou configuração manual autorizada."
      },
      {
        "symptom": "DNS não resolve, mas ping por IP funciona",
        "probableCause": "DNS incorreto, inacessível ou split DNS ausente.",
        "howToConfirm": "nslookup mostra timeout, NXDOMAIN ou servidor inesperado.",
        "fix": "Validar DNS configurado e política com time responsável."
      },
      {
        "symptom": "Tracert mostra asteriscos no meio",
        "probableCause": "Filtro, rate limit ou roteador que não responde TTL expirado.",
        "howToConfirm": "Verificar se destino final responde e comparar com outras evidências.",
        "fix": "Não concluir falha apenas por esse sinal; correlacionar logs e testes."
      }
    ],
    "improvements": [
      "Adicionar Test-NetConnection ou curl para testar porta específica em aula futura.",
      "Comparar resultado dentro e fora de VPN autorizada.",
      "Repetir teste em cabo e Wi‑Fi para comparar evidências.",
      "Criar template padronizado de chamado com campos de evidência."
    ],
    "evidenceToCollect": [
      "IP/máscara/gateway/DNS sanitizados",
      "Resultado de ping para gateway",
      "Entrada ARP/vizinhança do gateway",
      "Resultado de tracert/traceroute sanitizado",
      "Resultado de nslookup",
      "Tabela de interpretação"
    ],
    "questions": [
      "Qual comando responde se o host tem gateway?",
      "Por que ping não prova que HTTP funciona?",
      "O que ARP mostra e o que ele não mostra?",
      "Quando DNS vira hipótese principal?",
      "Que dados devem ser sanitizados antes de compartilhar evidências?"
    ],
    "challenge": "Monte um relatório de diagnóstico inicial para um usuário que acessa a internet por IP, mas não acessa sistemas por nome. Inclua comandos, evidências esperadas, interpretação e próximo encaminhamento.",
    "solution": "A solução deve verificar configuração local, DNS configurado, ping por IP autorizado, nslookup para nome afetado, comparação com outro nome conhecido e sanitização. Se IP funciona e nomes falham, encaminhar com evidência para DNS/rede, sem concluir problema de aplicação."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um comando simples como ipconfig pode ser mais importante do que uma ferramenta avançada no início do diagnóstico?",
      "hints": [
        "Pense em configuração local.",
        "Pense em gateway e DNS antes de caminho remoto."
      ],
      "expectedIdeas": [
        "IP",
        "máscara",
        "gateway",
        "DNS",
        "DHCP",
        "interface"
      ],
      "explanation": "Se a base local está errada, ferramentas avançadas só tornam o erro mais caro e confuso."
    },
    {
      "type": "diagnóstico",
      "question": "Um host pinga 8.8.8.8, mas não acessa intranet.empresa.local. Qual hipótese você testaria primeiro?",
      "hints": [
        "Compare IP e nome.",
        "Use nslookup."
      ],
      "expectedIdeas": [
        "DNS",
        "split DNS",
        "servidor DNS configurado",
        "zona interna",
        "VPN"
      ],
      "explanation": "Se um IP externo responde, há alguma conectividade. Falha por nome interno aponta fortemente para DNS interno, split DNS ou VPN."
    },
    {
      "type": "cenário real",
      "question": "O gateway aparece com um MAC diferente do esperado em vários hosts. O que você faria de forma defensiva?",
      "hints": [
        "Não execute ataque.",
        "Correlacione com logs de switch e DHCP."
      ],
      "expectedIdeas": [
        "validar inventário",
        "logs de switch",
        "DHCP snooping",
        "NAC",
        "Dynamic ARP Inspection",
        "SOC"
      ],
      "explanation": "Mudança inesperada de MAC do gateway pode ser erro ou risco. A investigação deve ser autorizada, defensiva e correlacionada."
    }
  ],
  "quiz": [
    {
      "id": "q1.9.1",
      "type": "conceito",
      "q": "Qual pergunta o comando ipconfig /all responde melhor?",
      "opts": [
        "Se a aplicação está autorizando o usuário",
        "Qual configuração de rede local o host possui",
        "Qual senha foi usada no login",
        "Qual regra exata do firewall bloqueou o tráfego"
      ],
      "a": 1,
      "exp": "ipconfig /all mostra configuração local: IP, máscara, gateway, DNS, DHCP e interfaces.",
      "difficulty": "iniciante",
      "topic": "configuração local"
    },
    {
      "id": "q1.9.2",
      "type": "diagnóstico",
      "q": "Um host acessa um destino por IP, mas falha por nome. Qual comando é mais apropriado para investigar a próxima hipótese?",
      "opts": [
        "arp -a",
        "nslookup",
        "format",
        "show version"
      ],
      "a": 1,
      "exp": "Se por IP funciona e por nome falha, DNS deve ser investigado com nslookup ou dig.",
      "difficulty": "iniciante",
      "topic": "DNS"
    },
    {
      "id": "q1.9.3",
      "type": "segurança",
      "q": "Qual prática é correta ao compartilhar evidências de ipconfig e tracert fora do time autorizado?",
      "opts": [
        "Enviar tudo sem alteração",
        "Sanitizar IPs, nomes internos e domínios sensíveis",
        "Alterar o gateway antes de enviar",
        "Rodar varredura ampla para completar o relatório"
      ],
      "a": 1,
      "exp": "Outputs de rede podem revelar topologia e nomes internos. Devem ser sanitizados.",
      "difficulty": "iniciante",
      "topic": "segurança"
    },
    {
      "id": "q1.9.4",
      "type": "comparação",
      "q": "O que a tabela ARP mostra principalmente?",
      "opts": [
        "Associações locais entre IP e MAC",
        "Todas as senhas salvas no navegador",
        "A lista completa de sites visitados",
        "A capacidade contratada do link"
      ],
      "a": 0,
      "exp": "ARP associa IPs locais ao endereço MAC correspondente dentro do escopo local ou próximo salto.",
      "difficulty": "iniciante",
      "topic": "ARP"
    },
    {
      "id": "q1.9.5",
      "type": "cenário",
      "q": "O tracert mostra asteriscos em um salto intermediário, mas o destino final responde. Qual interpretação é mais prudente?",
      "opts": [
        "A rede está necessariamente quebrada no salto com asteriscos",
        "O roteador pode estar filtrando ou limitando respostas, e é preciso correlacionar evidências",
        "O DNS sempre está errado",
        "O cabo local está sempre desconectado"
      ],
      "a": 1,
      "exp": "Nem todo roteador responde a TTL expirado. Asteriscos não são prova isolada de falha.",
      "difficulty": "intermediário",
      "topic": "tracert"
    },
    {
      "id": "q1.9.6",
      "type": "diagnóstico",
      "q": "Se o host não tem gateway padrão configurado, qual efeito é esperado?",
      "opts": [
        "Ele pode ter dificuldade para alcançar redes fora da rede local",
        "Ele automaticamente ganha mais throughput",
        "Ele ignora DNS para sempre",
        "Ele passa a funcionar apenas com IPv6 público"
      ],
      "a": 0,
      "exp": "Sem gateway, o host não sabe para onde enviar tráfego destinado a outras redes.",
      "difficulty": "iniciante",
      "topic": "gateway"
    }
  ],
  "flashcards": [
    {
      "id": "fc1.9.1",
      "front": "Para que serve ipconfig /all?",
      "back": "Para ver configuração local de rede no Windows: IP, máscara, gateway, DNS, DHCP e interfaces.",
      "tags": [
        "ipconfig",
        "windows"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.2",
      "front": "Ping testa aplicação?",
      "back": "Não. Ping geralmente testa alcance ICMP e RTT aproximado; não prova HTTP, TCP, TLS ou autenticação.",
      "tags": [
        "ping",
        "icmp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.3",
      "front": "O que arp -a mostra?",
      "back": "Mostra associações conhecidas entre IPs locais e endereços MAC na tabela ARP do host.",
      "tags": [
        "arp",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.4",
      "front": "Para que serve tracert?",
      "back": "Para observar saltos no caminho até um destino usando TTL crescente, com limitações por filtros e caminhos assimétricos.",
      "tags": [
        "tracert",
        "rota"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.5",
      "front": "Quando usar nslookup?",
      "back": "Quando você precisa investigar resolução DNS: nome para IP, servidor consultado e tipo de resposta.",
      "tags": [
        "dns",
        "nslookup"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc1.9.6",
      "front": "Qual é a primeira regra ao coletar evidências?",
      "back": "Coletar apenas em ambiente autorizado e sanitizar dados sensíveis antes de compartilhar.",
      "tags": [
        "segurança",
        "evidência"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex1.9.1",
      "type": "conceitual",
      "prompt": "Explique por que ping sozinho não prova que uma aplicação web está funcionando.",
      "expectedAnswer": "Porque ping testa ICMP e alcance básico, enquanto uma aplicação web depende de DNS, TCP, porta, TLS, HTTP, autenticação, autorização e servidor.",
      "explanation": "Cada protocolo responde uma pergunta diferente. ICMP não substitui teste de aplicação."
    },
    {
      "id": "ex1.9.2",
      "type": "diagnóstico",
      "prompt": "Um host tem IP válido, gateway configurado e ping para gateway responde. Ping para IP externo falha. Liste três hipóteses.",
      "expectedAnswer": "Rota/firewall após o gateway, problema de provedor/WAN/VPN, bloqueio ICMP, política de saída ou destino indisponível.",
      "explanation": "Como a rede local parece responder, a investigação avança para saída, política, caminho e destino."
    },
    {
      "id": "ex1.9.3",
      "type": "comando/output",
      "prompt": "O usuário acessa 10.10.10.20, mas não acessa sistema.empresa.local. Qual comando você executa e por quê?",
      "expectedAnswer": "nslookup sistema.empresa.local, porque é preciso verificar se o nome resolve para o IP esperado e qual DNS respondeu.",
      "explanation": "A diferença entre acesso por IP e por nome aponta para DNS como hipótese inicial."
    },
    {
      "id": "ex1.9.4",
      "type": "segurança",
      "prompt": "Liste três informações que devem ser mascaradas em um output de diagnóstico antes de compartilhar externamente.",
      "expectedAnswer": "IPs internos, nomes de host, domínios internos, nomes de usuário, endereços MAC, nomes de VLANs ou caminhos internos.",
      "explanation": "Evidências de rede podem revelar topologia e ativos sensíveis."
    }
  ],
  "challenge": {
    "title": "Árvore de diagnóstico inicial para acesso a sistema interno",
    "scenario": "Um usuário conectado ao Wi‑Fi corporativo diz que não consegue acessar https://sistema.interno.empresa.local. Outros sites públicos funcionam. O time de aplicação afirma que o sistema está online.",
    "tasks": [
      "Definir a ordem dos comandos iniciais.",
      "Explicar que pergunta cada comando responde.",
      "Indicar evidências esperadas e interpretações possíveis.",
      "Separar hipóteses de DNS, rede local, gateway, caminho, firewall e aplicação.",
      "Informar como sanitizar o relatório antes de compartilhar."
    ],
    "constraints": [
      "Não executar varredura de portas ampla.",
      "Não alterar DNS, gateway ou rota.",
      "Usar apenas comandos de diagnóstico autorizados.",
      "Não expor nomes internos reais no relatório final."
    ],
    "expectedDeliverables": [
      "Árvore de diagnóstico",
      "Tabela comando → evidência → interpretação",
      "Hipótese mais provável",
      "Próximo encaminhamento",
      "Relatório sanitizado"
    ],
    "gradingRubric": [
      {
        "criterion": "Ordem lógica de diagnóstico",
        "points": 25,
        "description": "Começa por configuração local, gateway, DNS e caminho antes de aplicação."
      },
      {
        "criterion": "Interpretação correta dos comandos",
        "points": 25,
        "description": "Explica o que cada comando prova e o que não prova."
      },
      {
        "criterion": "Segurança e sanitização",
        "points": 20,
        "description": "Evita testes não autorizados e protege dados sensíveis."
      },
      {
        "criterion": "Hipótese e encaminhamento",
        "points": 20,
        "description": "Encaminha para o time certo com evidências úteis."
      },
      {
        "criterion": "Clareza do relatório",
        "points": 10,
        "description": "Organiza dados de forma compreensível."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O sintoma diz que sites públicos funcionam, mas um nome interno falha. Isso reduz a chance de falha geral de internet e aumenta hipóteses de DNS interno, split DNS, VPN, segmentação ou política até o sistema.",
    "steps": [
      "Coletar ipconfig /all para verificar IP, gateway, DNS e perfil de rede.",
      "Testar ping para gateway para validar alcance local básico.",
      "Verificar arp -a para observar o gateway na vizinhança local.",
      "Executar nslookup sistema.interno.empresa.local para verificar DNS e servidor consultado.",
      "Se o nome resolver, testar caminho com tracert para o IP retornado, se permitido.",
      "Se DNS falhar, comparar com outro nome interno autorizado e verificar se o DNS configurado é corporativo.",
      "Sanitizar IPs e nomes antes de anexar ao chamado."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Reiniciar o firewall sem evidência.",
        "whyItIsWrong": "Mudança de produção sem diagnóstico pode causar indisponibilidade e não testa a hipótese principal."
      },
      {
        "answer": "Concluir que o sistema caiu porque o navegador não abre.",
        "whyItIsWrong": "O problema pode estar em DNS interno, VPN, rota, firewall ou certificado."
      },
      {
        "answer": "Rodar varredura ampla na rede corporativa.",
        "whyItIsWrong": "Isso viola o escopo do diagnóstico inicial e pode gerar alerta ou risco operacional."
      }
    ],
    "finalAnswer": "A hipótese inicial mais forte é DNS interno, split DNS, VPN ou segmentação para o nome interno, porque sites públicos funcionam. O relatório deve apresentar ipconfig /all sanitizado, teste de gateway, nslookup do nome interno, servidor DNS consultado, eventual tracert autorizado e recomendação de encaminhamento para rede/DNS/VPN/firewall conforme a evidência."
  },
  "glossary": [
    {
      "term": "ipconfig",
      "shortDefinition": "Comando Windows para visualizar e gerenciar configuração de rede.",
      "longDefinition": "Comando usado para exibir IP, máscara, gateway, DNS, DHCP e informações de interfaces de rede no Windows.",
      "example": "ipconfig /all mostra servidores DNS e gateway padrão.",
      "relatedTerms": [
        "gateway",
        "DNS",
        "DHCP"
      ],
      "relatedLessons": [
        "1.9",
        "7.2"
      ]
    },
    {
      "term": "ping",
      "shortDefinition": "Comando de teste de alcance usando ICMP na maioria dos casos.",
      "longDefinition": "Ferramenta que envia mensagens ICMP Echo Request e mede respostas, quando permitidas.",
      "example": "ping 192.168.1.1 testa alcance básico até o gateway.",
      "relatedTerms": [
        "ICMP",
        "RTT",
        "latência"
      ],
      "relatedLessons": [
        "1.8",
        "2.8"
      ]
    },
    {
      "term": "ARP cache",
      "shortDefinition": "Tabela local de associações IP-MAC conhecidas.",
      "longDefinition": "Cache usado por hosts para lembrar qual endereço MAC corresponde a um IP local ou próximo salto.",
      "example": "arp -a mostra o MAC associado ao gateway.",
      "relatedTerms": [
        "ARP",
        "MAC",
        "gateway"
      ],
      "relatedLessons": [
        "3.8",
        "4.6"
      ]
    },
    {
      "term": "tracert",
      "shortDefinition": "Comando Windows para observar saltos até um destino.",
      "longDefinition": "Ferramenta que usa TTL crescente para receber respostas de saltos intermediários quando permitido.",
      "example": "tracert exemplo.com mostra pistas do caminho até o destino.",
      "relatedTerms": [
        "TTL",
        "rota",
        "roteador"
      ],
      "relatedLessons": [
        "11.1",
        "15.2"
      ]
    },
    {
      "term": "nslookup",
      "shortDefinition": "Ferramenta de consulta DNS.",
      "longDefinition": "Comando usado para consultar servidores DNS e verificar resolução de nomes em registros como A, AAAA e CNAME.",
      "example": "nslookup sistema.empresa.local mostra qual IP foi retornado e qual DNS respondeu.",
      "relatedTerms": [
        "DNS",
        "registro A",
        "CNAME"
      ],
      "relatedLessons": [
        "7.1",
        "8.1"
      ]
    },
    {
      "term": "Evidência de rede",
      "shortDefinition": "Resultado coletado que apoia ou enfraquece uma hipótese de diagnóstico.",
      "longDefinition": "Saída de comando, log, métrica ou observação usada para raciocinar sobre conectividade, DNS, caminho, política ou serviço.",
      "example": "Um nslookup com timeout é evidência para investigar DNS, não prova sozinho que o servidor caiu.",
      "relatedTerms": [
        "troubleshooting",
        "log",
        "métrica"
      ],
      "relatedLessons": [
        "0.9",
        "1.9",
        "15.1"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Windows ipconfig",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/ipconfig",
      "note": "Referência oficial para uso do ipconfig."
    },
    {
      "type": "official-doc",
      "title": "Windows ping",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/ping",
      "note": "Referência oficial para uso do ping no Windows."
    },
    {
      "type": "official-doc",
      "title": "Windows tracert",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/windows-server/administration/windows-commands/tracert",
      "note": "Referência oficial para uso do tracert."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 — Módulo 0",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m00",
      "note": "Fundamentos de bits, protocolos, métricas e camadas."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade e Operação",
      "lesson": "diagnóstico de pipelines e runners",
      "reason": "Falhas de pipeline frequentemente exigem separar DNS, proxy, rota, TLS e autorização."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Federação e Protocolos de Identidade",
      "lesson": "OIDC/SAML em troubleshooting",
      "reason": "Falhas de login podem parecer rede, mas dependem de DNS, HTTPS, redirects, cookies, TLS e identidade."
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
      "1.10"
    ]
  }
};
