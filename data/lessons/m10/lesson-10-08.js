export const lesson1008 = {
  "id": "10.8",
  "moduleId": "m10",
  "order": 8,
  "title": "Troubleshooting VPN: rotas, MTU, DNS e firewall",
  "subtitle": "Método prático para sair do “a VPN não funciona” e encontrar a camada que realmente falhou.",
  "duration": "70-100 min",
  "estimatedStudyTimeMinutes": 95,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 180,
  "tags": [
    "redes",
    "vpn",
    "tunelamento",
    "acesso-remoto",
    "zero-trust",
    "ztna",
    "segurança",
    "troubleshooting",
    "ipsec",
    "wireguard",
    "openvpn",
    "mfa",
    "certificados",
    "mtu",
    "mss",
    "sase",
    "siem"
  ],
  "prerequisites": [
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m06",
      "reason": "TCP/UDP e portas ajudam a entender transporte de túneis e aplicações."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m07",
      "reason": "DNS, DHCP e NAT aparecem em praticamente todo problema de VPN."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m09",
      "reason": "Firewalls e políticas controlam o caminho do acesso remoto."
    }
  ],
  "objectives": [
    "Explicar o problema real por trás do tema da aula.",
    "Separar conectividade, autenticação, autorização, rotas, DNS e logs.",
    "Aplicar o conceito em cenário doméstico, empresarial, cloud, DevSecOps e segurança.",
    "Diagnosticar falhas comuns de acesso remoto com método por camadas.",
    "Propor controles defensivos e critérios de validação.",
    "Validar tecnicamente decisões de VPN, túnel, ZTNA ou SASE com evidências observáveis.",
    "Diferenciar plano de controle, plano de dados, autenticação, autorização, rotas, DNS, firewall e aplicação.",
    "Documentar riscos residuais, custos, rollback, revogação e logs mínimos para operação segura."
  ],
  "learningOutcomes": [
    "Dado um cenário envolvendo metodologia de diagnóstico, handshake, rotas, DNS, MTU/MSS, firewall, logs, traceroute e captura controlada, o aluno identifica requisitos, riscos e evidências.",
    "O aluno consegue explicar por que VPN não substitui menor privilégio.",
    "O aluno consegue propor validações de rota, DNS, firewall, identidade e logs.",
    "Dado um cenário de acesso remoto, o aluno consegue escolher entre VPN, ZTNA, bastion, private endpoint ou combinação híbrida.",
    "Dado um túnel conectado com falha de aplicação, o aluno separa rota, DNS, firewall, NAT, MTU/MSS e autorização.",
    "Dado um incidente de acesso remoto, o aluno sabe quais logs preservar e quais ações de contenção aplicar."
  ],
  "content": {
    "motivation": "<p>Em redes corporativas modernas, o trabalho não acontece apenas dentro de uma sala cabeada. Usuários trabalham de casa, fornecedores precisam suporte temporário, filiais acessam sistemas centrais, workloads em cloud precisam falar com serviços privados e administradores precisam operar ambientes críticos sem expor portas sensíveis diretamente na Internet. A aula <strong>Troubleshooting VPN: rotas, MTU, DNS e firewall</strong> existe para explicar esse problema antes da ferramenta.</p> <p>O erro comum é enxergar VPN como um botão mágico de conexão. Na prática, acesso remoto seguro combina identidade, criptografia, rotas, DNS, firewall, logs, operação e governança. Quando uma dessas peças falha, o sintoma aparece como “conectou, mas não acessa”, “acessa por IP, mas não por nome”, “fica lento”, “só funciona fora do proxy” ou “o fornecedor enxerga mais rede do que deveria”.</p> <div class=\"callout callout--problem\"><strong>Problema real:</strong> permitir acesso a recursos privados por redes que a empresa não controla, sem publicar serviços internos na Internet e sem entregar uma rede inteira a quem só precisa de uma aplicação.</div>",
    "history": "<p>Historicamente, empresas resolviam conectividade privada com links dedicados, redes MPLS, acesso discado, modems, circuitos caros ou presença física. Esses modelos eram previsíveis, mas pouco flexíveis. Com a popularização da Internet, surgiu a possibilidade de transportar comunicação privada sobre infraestrutura pública, reduzindo dependência de circuitos exclusivos.</p> <p>A evolução passou por VPNs IPsec entre sites, VPNs de acesso remoto para usuários, SSL VPNs mais amigáveis para ambientes restritivos, soluções baseadas em clientes, WireGuard e, mais recentemente, modelos de Zero Trust Network Access e SASE. A direção geral é sair de “estar dentro da rede é confiável” para “cada acesso precisa ser explicitamente avaliado”.</p> <table class=\"data-table\"><thead><tr><th>Fase</th><th>Como resolvia</th><th>Limitação</th><th>Evolução</th></tr></thead><tbody><tr><td>Links dedicados</td><td>Caminho privado físico/lógico</td><td>Custo e pouca flexibilidade</td><td>VPN sobre Internet</td></tr><tr><td>VPN ampla</td><td>Usuário entra na rede</td><td>Excesso de alcance</td><td>Políticas granulares e ZTNA</td></tr><tr><td>Acesso por aplicação</td><td>Recurso publicado por política</td><td>Exige identidade e operação maduras</td><td>SASE e Zero Trust</td></tr></tbody></table>",
    "problem": "<p>O problema técnico de Troubleshooting VPN: rotas, MTU, DNS e firewall envolve <strong>metodologia de diagnóstico, handshake, rotas, DNS, MTU/MSS, firewall, logs, traceroute e captura controlada</strong>. Sem esse entendimento, a equipe tende a diagnosticar pela camada errada. Um túnel pode estar ativo e, ainda assim, a aplicação falhar por DNS. A rota pode estar correta, mas o firewall bloquear. A autenticação pode funcionar, mas a autorização permitir demais. A criptografia pode estar forte, mas o endpoint pode estar comprometido.</p> <ul class=\"flow-list\"><li>O que quebra sem este conceito: recursos privados precisam ser expostos ou acessos ficam improvisados.</li><li>Que confusão ele evita: separar túnel, autenticação, autorização, rota, DNS e aplicação.</li><li>Que escala ele permite: home office, filiais, cloud híbrida, suporte remoto e fornecedores controlados.</li><li>Que risco ele reduz ou aumenta: reduz exposição direta, mas aumenta impacto se políticas forem amplas demais.</li></ul>",
    "evolution": "<p>A evolução do acesso remoto mostra uma troca constante entre conectividade, segurança, experiência do usuário e operação. VPNs tradicionais resolvem conectividade de rede. ZTNA tenta reduzir o alcance de rede e entregar acesso por aplicação. Bastions controlam administração. Private endpoints reduzem exposição de serviços cloud. Nenhum modelo elimina a necessidade de inventário, identidade, logs e resposta a incidentes.</p> <table class=\"comparison-table\"><thead><tr><th>Abordagem</th><th>Resolve bem</th><th>Não resolve sozinha</th><th>Quando considerar</th></tr></thead><tbody><tr><td>VPN site-to-site</td><td>Interligar redes</td><td>Controle por usuário</td><td>Matriz, filial e cloud híbrida</td></tr><tr><td>VPN remote access</td><td>Usuário remoto</td><td>Menor privilégio por app</td><td>Times internos e suporte</td></tr><tr><td>ZTNA</td><td>Acesso por aplicação</td><td>Tráfego de rede genérico</td><td>SaaS, apps web e acesso baseado em identidade</td></tr><tr><td>Bastion</td><td>Administração controlada</td><td>Acesso comum de usuário</td><td>SSH/RDP e operações privilegiadas</td></tr></tbody></table>",
    "concept": "<div class=\"definition-box\"><strong>Definição:</strong> Troubleshooting de VPN exige separar estabelecimento do túnel, instalação de rotas, resolução DNS, encaminhamento, política de firewall, MTU e funcionamento da aplicação.</div> <p>O ponto essencial é não confundir conectividade com permissão. Um caminho de rede apenas cria a possibilidade de comunicação. A segurança real depende de autenticar quem acessa, autorizar o que pode ser acessado, registrar evidências e limitar o impacto caso a credencial, o dispositivo ou o túnel sejam comprometidos.</p>",
    "internals": "<p>Por dentro, uma solução de acesso remoto normalmente segue uma sequência de decisões. Primeiro, o cliente ou gateway inicia conexão com um ponto de controle. Depois, credenciais, certificados, MFA ou identidade federada são avaliados. Em seguida, políticas definem quais redes, aplicações ou portas serão alcançáveis. Só então rotas, proxy, túnel ou encaminhamento privado entram em ação.</p> <ol><li>O solicitante inicia conexão ou tenta acessar uma aplicação.</li><li>O serviço valida identidade, dispositivo, certificado, MFA ou contexto.</li><li>A política decide recursos permitidos, rotas, grupos e restrições.</li><li>O tráfego é encapsulado, proxyado ou encaminhado por caminho privado.</li><li>Firewall, DNS e rotas precisam concordar com a decisão de acesso.</li><li>Logs registram autenticação, autorização, origem, destino, volume e falhas.</li></ol> <div class=\"callout callout--warning\"><strong>Atenção:</strong> se a rota aponta para um caminho e o DNS resolve para outro, o usuário verá erro de aplicação, mas a causa pode estar na arquitetura de acesso.</div>\n<div class=\"callout callout--warning\"><strong>Revisão técnica fina:</strong> o sintoma “VPN conectou, mas não funciona” é amplo demais. A resposta profissional é quebrar em etapas: autenticação, túnel, rota, DNS, firewall, NAT, MTU/MSS, aplicação e logs. Problemas de MTU/MSS são clássicos em túneis porque encapsulamento adiciona overhead; um pacote que cabia no caminho sem túnel pode precisar fragmentar ou falhar quando DF/PMTUD não funcionam bem.</div>\n<ol class=\"flow-list\"><li>Validar autenticação e política aplicada.</li><li>Confirmar rota instalada no cliente/gateway.</li><li>Testar resolução DNS interna e externa.</li><li>Verificar firewall/ACL/NAT nos dois sentidos.</li><li>Testar MTU/MSS quando há lentidão, travamento em páginas grandes ou timeout seletivo.</li><li>Correlacionar logs de cliente, gateway, firewall, DNS, IdP e aplicação.</li></ol>",
    "architecture": "<p>Na arquitetura, Troubleshooting VPN: rotas, MTU, DNS e firewall aparece entre usuários, gateways, firewalls, provedores de identidade, DNS, SIEM, redes privadas e recursos em datacenter ou cloud. Em ambientes simples, isso pode ser um cliente VPN falando com um appliance. Em ambientes maduros, envolve IdP, MFA, postura de dispositivo, proxy de aplicação, segmentação, logs, automação e revisão de acesso.</p> <ul><li><strong>Camadas envolvidas:</strong> L3 para rotas, L4 para portas, L7 para aplicações e identidade.</li><li><strong>Componentes:</strong> cliente, gateway, IdP, DNS, firewall, SIEM, recurso privado e política.</li><li><strong>Dependências:</strong> endereçamento, roteamento, DNS, TLS, firewall, certificados e IAM.</li><li><strong>Pontos de falha:</strong> credencial, certificado, rota, NAT, MTU, DNS, ACL, proxy, log e autorização.</li></ul>",
    "analogy": "<p>Uma boa analogia é a portaria de um prédio corporativo. O fato de alguém chegar ao prédio não significa que pode entrar em todas as salas. Primeiro a pessoa se identifica, depois recebe autorização para áreas específicas, e as entradas ficam registradas. VPN ampla é como entregar uma chave de vários corredores. ZTNA é mais parecido com liberar portas específicas conforme necessidade e contexto.</p> <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes não têm paredes físicas claras. Rotas, NAT, DNS e políticas podem criar caminhos invisíveis, assimétricos e temporários.</div>",
    "simpleExample": "<p>Em um laboratório simples, imagine um notebook em casa acessando um servidor interno chamado <code>intranet.empresa.local</code>. Para funcionar, não basta o cliente “conectar na VPN”. Ele precisa receber rotas para a rede privada, resolver o nome interno pelo DNS correto, passar por firewall e ter permissão de aplicação. Se qualquer etapa falhar, o sintoma para o usuário pode ser apenas “não abre”.</p>",
    "enterpriseExample": "<p>Em uma empresa, perfis diferentes precisam de acessos diferentes. Funcionários acessam sistemas internos. Administradores acessam servidores por bastion ou VPN restrita. Fornecedores acessam apenas aplicações específicas e por tempo limitado. Filiais usam VPN site-to-site. O SOC precisa logs para detectar horários incomuns, países improváveis, volume estranho, falhas repetidas e tentativas de movimento lateral.</p>",
    "cloudExample": "<p>Em cloud, o mesmo raciocínio aparece em VPN site-to-site, Client VPN, bastion, private endpoints, peering, Transit Gateway, Virtual WAN, Direct Connect, ExpressRoute, Cloud Interconnect e soluções de acesso por identidade. O custo também muda: tráfego, gateways gerenciados, appliances, logs, links privados e zonas podem gerar cobrança recorrente. Por isso, o desenho precisa equilibrar segurança, operação e orçamento.</p>\n<p><strong>Cloud e custos:</strong> em cloud, VPN gateway, NAT gateway, private endpoints, firewalls gerenciados, logs e tráfego entre regiões/zonas podem gerar custo recorrente. Todo laboratório ou projeto deve indicar alternativa local, custo estimado, retenção de logs e limpeza obrigatória.</p>",
    "devsecopsExample": "<p>Em DevSecOps, runners de pipeline, automações IaC e tarefas administrativas não deveriam depender de uma VPN ampla permanente sem rastreabilidade. Muitas arquiteturas modernas preferem identidade federada, OIDC, secrets de curta duração, private endpoints, bastions automatizados, policies as code e logs centralizados. A pergunta não é apenas “como conectar”, mas “quem conectou, por qual motivo, por quanto tempo e com qual evidência”.</p>\n<p><strong>DevSecOps:</strong> mudanças de VPN/ZTNA devem ser tratadas como mudança controlada: IaC ou configuração versionada, revisão por pares, janela de alteração, plano de rollback, validação automatizada de rotas/DNS/políticas e evidência anexada ao ticket.</p>",
    "securityExample": "<p>O foco de segurança é defensivo: reduzir exposição, limitar alcance, validar identidade, monitorar comportamento e ter revogação rápida. Ataques contra acesso remoto costumam explorar credenciais fracas, MFA ausente, certificados vazados, grupos permissivos, appliances desatualizados, logs pobres e redes internas planas. A mitigação combina MFA resistente a phishing quando possível, menor privilégio, segmentação, hardening, atualização, telemetria e revisão de acesso.</p> <table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody><tr><td>Credencial comprometida</td><td>Login remoto fora de padrão</td><td>Acesso inicial indevido</td><td>MFA, alerta, revisão e revogação</td></tr><tr><td>Acesso amplo demais</td><td>Usuário vê redes desnecessárias</td><td>Movimento lateral</td><td>Segmentação e política por função</td></tr><tr><td>DNS incorreto</td><td>Nome interno resolve errado</td><td>Falha ou vazamento</td><td>DNS split-horizon planejado</td></tr></tbody></table>\n<p><strong>Complemento defensivo:</strong> em Troubleshooting VPN: rotas, MTU, DNS e firewall, a segurança deve ser validada por evidências. O desenho precisa mostrar quem acessa, qual recurso, por qual política, quais rotas e nomes são usados, quais logs são gerados, como detectar abuso e como revogar rapidamente o acesso.</p>",
    "diagram": "<svg class=\"lesson-svg\" viewBox=\"0 0 960 390\" role=\"img\" aria-labelledby=\"vpn108-title vpn108-desc\"> <title id=\"vpn108-title\">Arquitetura conceitual de Troubleshooting VPN: rotas, MTU, DNS e firewall</title> <desc id=\"vpn108-desc\">Fluxo de acesso remoto passando por identidade, política, túnel ou proxy, firewall, logs e recurso privado.</desc> <defs><marker id=\"vpn108-arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path></marker></defs> <rect x=\"30\" y=\"125\" width=\"140\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--client\"></rect><text x=\"100\" y=\"158\" text-anchor=\"middle\" class=\"svg-label\">Usuário</text><text x=\"100\" y=\"181\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">remoto</text> <rect x=\"220\" y=\"70\" width=\"150\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--security\"></rect><text x=\"295\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Identidade</text><text x=\"295\" y=\"127\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">MFA/cert</text> <rect x=\"220\" y=\"210\" width=\"150\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--router\"></rect><text x=\"295\" y=\"244\" text-anchor=\"middle\" class=\"svg-label\">Rotas/DNS</text><text x=\"295\" y=\"267\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">decisão</text> <rect x=\"445\" y=\"125\" width=\"165\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--firewall\"></rect><text x=\"528\" y=\"158\" text-anchor=\"middle\" class=\"svg-label\">VPN / ZTNA</text><text x=\"528\" y=\"181\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política</text> <rect x=\"675\" y=\"70\" width=\"135\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--server\"></rect><text x=\"742\" y=\"104\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text><text x=\"742\" y=\"127\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">privada</text> <rect x=\"675\" y=\"210\" width=\"135\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--cloud\"></rect><text x=\"742\" y=\"244\" text-anchor=\"middle\" class=\"svg-label\">Cloud</text><text x=\"742\" y=\"267\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">híbrida</text> <rect x=\"835\" y=\"125\" width=\"100\" height=\"76\" rx=\"14\" class=\"svg-node svg-node--security\"></rect><text x=\"885\" y=\"158\" text-anchor=\"middle\" class=\"svg-label\">Logs</text><text x=\"885\" y=\"181\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SIEM</text> <line x1=\"170\" y1=\"163\" x2=\"220\" y2=\"108\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <line x1=\"170\" y1=\"163\" x2=\"220\" y2=\"248\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <line x1=\"370\" y1=\"108\" x2=\"445\" y2=\"150\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <line x1=\"370\" y1=\"248\" x2=\"445\" y2=\"176\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <line x1=\"610\" y1=\"150\" x2=\"675\" y2=\"108\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <line x1=\"610\" y1=\"176\" x2=\"675\" y2=\"248\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <line x1=\"810\" y1=\"108\" x2=\"835\" y2=\"150\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <line x1=\"810\" y1=\"248\" x2=\"835\" y2=\"176\" class=\"svg-flow animated-flow\" marker-end=\"url(#vpn108-arrow)\"></line> <rect x=\"60\" y=\"330\" width=\"840\" height=\"42\" rx=\"14\" class=\"svg-zone\"></rect><text x=\"480\" y=\"357\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Acesso seguro depende de identidade, política, rotas, DNS, segmentação, logs e operação disciplinada.</text> </svg>",
    "labIntro": "<p>O laboratório desta aula é do tipo <strong>troubleshooting</strong>. Ele não exige atacar redes nem contornar controles. A proposta é aprender a desenhar, validar e diagnosticar acesso remoto em ambiente próprio, autorizado ou simulado.</p>",
    "exercisesIntro": "<p>Os exercícios forçam produção ativa: comparar alternativas, interpretar sintomas, propor validações e justificar decisões de arquitetura.</p>",
    "challengeIntro": "<p>O desafio coloca você em um cenário realista de empresa híbrida, com usuários, fornecedores, cloud e requisitos de segurança. A resposta deve trazer desenho, política, validação e riscos residuais.</p>",
    "solutionIntro": "<p>A solução comentada deve mostrar raciocínio. Não basta escolher uma ferramenta; é necessário explicar por que ela reduz risco, quais limitações mantém e como será operada.</p>",
    "summary": "<ul><li><strong>Ideia central:</strong> Troubleshooting de VPN exige separar estabelecimento do túnel, instalação de rotas, resolução DNS, encaminhamento, política de firewall, MTU e funcionamento da aplicação.</li><li><strong>O que lembrar:</strong> conectividade não é autorização.</li><li><strong>Erro comum:</strong> tratar VPN como segurança automática.</li><li><strong>Uso real:</strong> home office, filiais, cloud híbrida, fornecedores e administração segura.</li></ul>\n<div class=\"evidence-box\"><strong>Resumo da revisão técnica fina:</strong> Validação técnica fina: troubleshooting de VPN com rota, DNS, firewall, MTU/MSS e evidência. O domínio da aula exige explicar diagnóstico por camadas, MTU/MSS/PMTUD, assimetria, NAT, logs correlacionados, validar por logs e comandos, e justificar trade-offs de segurança, operação e custo.</div>",
    "nextTheme": "<p>A próxima aula aprofunda segurança operacional: MFA, certificados, logs, revogação e riscos.</p>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPsec",
      "IKE",
      "TLS",
      "UDP",
      "TCP",
      "DNS",
      "HTTP",
      "WireGuard"
    ],
    "dependsOn": [
      "IPv4",
      "Roteamento",
      "DNS",
      "NAT",
      "Firewall",
      "TLS"
    ],
    "enables": [
      "Acesso remoto",
      "Cloud híbrida",
      "ZTNA",
      "Administração segura",
      "Conectividade entre sites"
    ]
  },
  "deepDive": {
    "mentalModel": "Acesso remoto seguro é uma arquitetura de decisão: identidade decide quem, política decide o quê, rota/DNS decidem por onde, logs provam o que aconteceu.",
    "keyTerms": [
      "VPN",
      "túnel",
      "encapsulamento",
      "MFA",
      "certificado",
      "split tunnel",
      "full tunnel",
      "ZTNA",
      "SASE",
      "bastion",
      "private endpoint"
    ],
    "limitations": [
      "VPN não garante autorização granular por si só.",
      "Criptografia não corrige credencial comprometida.",
      "ZTNA não substitui inventário e governança.",
      "Full tunnel pode aumentar custo e latência."
    ],
    "whenToUse": [
      "Quando recursos privados precisam ser acessados por usuários, filiais ou cloud híbrida.",
      "Quando exposição pública direta seria inadequada.",
      "Quando é necessário registrar e controlar acesso remoto."
    ],
    "whenNotToUse": [
      "Como atalho para liberar rede inteira sem necessidade.",
      "Como substituto de IAM, segmentação ou hardening.",
      "Para publicar aplicações públicas que deveriam passar por proxy/WAF apropriado."
    ],
    "operationalImpact": [
      "Exige suporte, documentação, revisão de acessos, gestão de certificados, DNS e troubleshooting."
    ],
    "financialImpact": [
      "Pode gerar custo com appliance, licenciamento, gateway cloud, tráfego, logs e links privados."
    ],
    "securityImpact": [
      "Reduz exposição direta, mas aumenta impacto se o acesso for amplo e pouco monitorado."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que conectar na VPN significa ter permissão correta.",
      "whyItHappens": "A ferramenta mostra status conectado e passa sensação de sucesso.",
      "consequence": "A equipe ignora DNS, rota, firewall, autorização e aplicação.",
      "correction": "Diagnosticar por camadas e validar cada decisão separadamente."
    },
    {
      "mistake": "Liberar sub-redes inteiras para todos os perfis.",
      "whyItHappens": "É mais fácil operacionalmente no curto prazo.",
      "consequence": "Aumenta movimento lateral e exposição em caso de credencial comprometida.",
      "correction": "Aplicar menor privilégio, segmentação, grupos e revisão periódica."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Não autentica.",
      "Conecta, mas não acessa.",
      "Acessa por IP, mas não por nome.",
      "Acesso intermitente ou lento.",
      "Apenas algumas aplicações funcionam."
    ],
    "diagnosticQuestions": [
      "A identidade foi aceita?",
      "MFA/certificado passou?",
      "A rota foi instalada?",
      "O DNS retornou endereço esperado?",
      "Firewall/ACL permite origem e destino?",
      "Existe suspeita de MTU/MSS?",
      "A falha está no plano de controle ou no plano de dados?",
      "Existe diferença entre acessar por IP e acessar por FQDN?",
      "O caminho de retorno está documentado e permitido?",
      "Há evidência de MTU/MSS/fragmentação ou bloqueio de PMTUD?",
      "Qual log prova a decisão de permitir ou negar?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup intranet.empresa.local",
        "purpose": "Ver DNS, interface e rotas do cliente.",
        "expectedObservation": "DNS/rotas coerentes com o desenho.",
        "interpretation": "Sem rota ou DNS correto, a aplicação não será alcançada."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && dig intranet.empresa.local",
        "purpose": "Ver interface, rotas e resolução de nomes.",
        "expectedObservation": "Rota para destino privado e resposta DNS correta.",
        "interpretation": "Falha aqui indica problema antes da aplicação."
      },
      {
        "platform": "Rede/Firewall",
        "command": "verificar logs de autenticação, política permitida/negada e NAT",
        "purpose": "Confirmar decisão do ponto de controle.",
        "expectedObservation": "Evento de autenticação e acesso ao recurso.",
        "interpretation": "Sem log, a operação não consegue provar o que ocorreu."
      },
      {
        "platform": "Windows",
        "command": "ping -f -l 1372 10.30.0.10\ntracert 10.30.0.10\nTest-NetConnection 10.30.0.10 -Port 443",
        "purpose": "Testar tamanho de pacote, caminho e porta TCP.",
        "expectedObservation": "Pacotes sem fragmentação no tamanho adequado e porta alcançável.",
        "interpretation": "Falha por tamanho com porta ok aponta para MTU/MSS/PMTUD."
      },
      {
        "platform": "Linux",
        "command": "tracepath 10.30.0.10\nping -M do -s 1372 10.30.0.10\ncurl -vk https://intranet.empresa.local",
        "purpose": "Investigar PMTU, DF e comportamento da aplicação.",
        "expectedObservation": "PMTU coerente e handshake TLS avançando.",
        "interpretation": "Timeout após ClientHello ou páginas grandes pode indicar fragmentação/MTU."
      },
      {
        "platform": "Cisco/Firewall",
        "command": "show crypto ipsec sa\nshow access-lists\nshow log | include VPN|IKE|IPsec|MTU|fragment",
        "purpose": "Correlacionar contadores, bloqueios e eventos do túnel.",
        "expectedObservation": "Encaps/decaps crescendo e ausência de denies inesperados.",
        "interpretation": "Decaps sem resposta indicam rota/firewall no destino; encaps sem decaps indicam retorno remoto."
      }
    ],
    "decisionTree": [
      {
        "if": "Não conecta",
        "then": "Validar credenciais, MFA, certificado, horário, cliente e reachability do gateway."
      },
      {
        "if": "Conecta mas não acessa",
        "then": "Validar rotas, DNS, firewall, ACL e política por grupo."
      },
      {
        "if": "Acessa lento",
        "then": "Investigar MTU/MSS, inspeção, proxy, rota longa, full tunnel e capacidade."
      },
      {
        "if": "Autenticação falha antes do túnel ou sessão",
        "then": "Validar credencial, MFA, certificado/chave, horário, IdP, grupo, CA/CRL/OCSP quando aplicável e reachability do gateway."
      },
      {
        "if": "Sessão/túnel sobe, mas recurso não responde por IP",
        "then": "Validar rota, seletor/AllowedIPs, firewall/ACL, NAT, retorno assimétrico e logs de data plane."
      },
      {
        "if": "Recurso responde por IP, mas não por nome",
        "then": "Validar DNS entregue pela VPN, split DNS, sufixo, zona privada, forwarder e resposta externa indevida."
      },
      {
        "if": "Aplicações grandes travam, mas ping/porta simples funciona",
        "then": "Testar MTU/MSS/PMTUD, fragmentação, TCP MSS clamping e inspeção intermediária."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "MFA para acesso remoto e administração privilegiada.",
      "Menor privilégio por aplicação, grupo, horário e contexto.",
      "Segmentar redes acessíveis pela VPN ou ZTNA.",
      "Registrar autenticação, autorização, falhas, origem, destino e volume.",
      "Revisar usuários, certificados e exceções periodicamente.",
      "Exigir MFA e, quando possível, certificados ou chaves com dono, validade e processo de revogação.",
      "Restringir rotas, recursos e portas por grupo, função e necessidade real, evitando acesso amplo por padrão.",
      "Registrar autenticação, autorização, IP de origem, dispositivo, recurso acessado, bytes transferidos e decisões negadas.",
      "Testar periodicamente revogação, expiração de certificados/chaves, DPD/keepalive, failover e restauração.",
      "Integrar logs de VPN/ZTNA com SIEM/NDR, IdP, firewall, DNS, proxy e EDR."
    ],
    "badPractices": [
      "VPN com acesso any-any à rede interna.",
      "Usuários compartilhando credenciais ou perfis.",
      "Certificados sem ciclo de vida e sem revogação.",
      "Sem logs ou com logs que não indicam usuário/recurso.",
      "Publicar serviços internos diretamente por conveniência.",
      "Tratar status “conectado” como prova de autorização correta.",
      "Usar uma única política VPN para todos os usuários, fornecedores e administradores.",
      "Permitir redes inteiras quando o requisito é acessar uma aplicação específica.",
      "Manter certificados, chaves ou perfis antigos sem dono e sem validade clara.",
      "Não revisar custos de gateway cloud, tráfego, logs e retenção."
    ],
    "commonErrors": [
      "Confundir túnel estabelecido com autorização concedida.",
      "Esquecer DNS interno ou rotas específicas.",
      "Permitir fornecedor por tempo indeterminado.",
      "Não documentar split tunnel/full tunnel.",
      "Confundir túnel criptografado com autorização granular.",
      "Não documentar rotas, DNS e recursos realmente necessários.",
      "Ignorar logs de negação e aceitar exceções permanentes sem dono.",
      "Não testar revogação de usuário, certificado, chave ou peer."
    ],
    "vulnerabilities": [
      {
        "name": "Acesso remoto amplo demais",
        "description": "Credencial comprometida pode alcançar redes e serviços além do necessário.",
        "defensiveExplanation": "O risco cresce quando a VPN entrega várias sub-redes sem política granular.",
        "mitigation": "Segmentação, ACLs, ZTNA por aplicação, MFA, postura de dispositivo e logs."
      },
      {
        "name": "Falha de revogação",
        "description": "Usuários, certificados ou fornecedores antigos continuam válidos.",
        "defensiveExplanation": "Acesso remoto exige controle de ciclo de vida.",
        "mitigation": "Processo de offboarding, expiração, revisão periódica e automação IAM."
      },
      {
        "name": "Acesso remoto amplo demais em 10.8",
        "description": "Política de VPN/ZTNA permite alcançar mais redes, portas ou aplicações do que o necessário para a função do usuário ou do peer.",
        "defensiveExplanation": "O risco principal é ampliar o raio de impacto de credencial comprometida, dispositivo infectado, fornecedor indevido ou erro operacional.",
        "mitigation": "Aplicar menor privilégio, segmentação, grupos específicos, ZTNA por aplicação quando adequado, revisão periódica, logs e alertas SIEM/NDR."
      },
      {
        "name": "Falha de revogação em 10.8",
        "description": "Usuário, certificado, chave, peer ou perfil temporário continua válido após fim de contrato, teste ou incidente.",
        "defensiveExplanation": "Credenciais remotas esquecidas são difíceis de perceber sem inventário e logs de uso.",
        "mitigation": "Exigir dono, validade, expiração, inventário, revisão de último uso, automação de revogação e teste periódico de bloqueio."
      }
    ],
    "monitoring": [
      "Logins fora de horário ou geografia esperada.",
      "Falhas repetidas de MFA ou certificado.",
      "Novo volume de tráfego lateral após conexão remota.",
      "Acessos de fornecedores fora da janela aprovada.",
      "Múltiplas falhas de autenticação por usuário, IP, país, ASN ou dispositivo em janela curta.",
      "Login bem-sucedido de origem incomum seguido de alto volume ou acesso a recurso sensível.",
      "Peer VPN ativo fora de janela aprovada ou certificado/chave próximo do vencimento.",
      "Aumento de denies entre segmento VPN e redes internas, sugerindo política ampla ou tentativa lateral.",
      "Túnel flapping, renegociações excessivas, DPD timeout ou queda de BGP/rota associada."
    ],
    "hardening": [
      "Desabilitar protocolos e cifras obsoletas.",
      "Atualizar gateways e clientes.",
      "Usar certificados com proteção adequada.",
      "Bloquear acesso por padrão e liberar por necessidade."
    ],
    "detectionIdeas": [
      "Correlacionar login VPN/ZTNA com acesso ao recurso.",
      "Alertar uso de conta privilegiada em origem incomum.",
      "Detectar varreduras internas após conexão remota.",
      "Comparar volume de dados por usuário e destino.",
      "Múltiplas falhas de autenticação por usuário, IP, país, ASN ou dispositivo em janela curta.",
      "Login bem-sucedido de origem incomum seguido de alto volume ou acesso a recurso sensível.",
      "Peer VPN ativo fora de janela aprovada ou certificado/chave próximo do vencimento.",
      "Aumento de denies entre segmento VPN e redes internas, sugerindo política ampla ou tentativa lateral.",
      "Túnel flapping, renegociações excessivas, DPD timeout ou queda de BGP/rota associada."
    ],
    "ethicalLimits": [
      "Executar testes apenas em laboratório próprio, ambiente autorizado ou simulação documentada.",
      "Não testar credenciais, túneis, varreduras, bypass ou enumeração contra redes de terceiros.",
      "Preservar dados sensíveis em evidências com mascaramento e retenção adequada."
    ]
  },
  "lab": {
    "id": "lab-10.8",
    "title": "Árvore de decisão para incidente de VPN",
    "labType": "security",
    "objective": "Criar uma árvore de diagnóstico para três sintomas clássicos: não conecta, conecta sem acessar, acessa com lentidão.",
    "scenario": "Você atua como analista de infraestrutura e segurança. A empresa precisa lidar com metodologia de diagnóstico, handshake, rotas, DNS, MTU/MSS, firewall, logs, traceroute e captura controlada sem expor recursos internos diretamente na Internet.",
    "topology": "Usuário remoto -> Internet -> ponto de controle VPN/ZTNA -> firewall/rotas/DNS -> recurso privado -> logs/SIEM.",
    "architecture": "Arquitetura conceitual com cliente remoto, IdP/MFA, gateway VPN ou ZTNA, DNS interno, firewall, recurso privado e coleta de logs.",
    "prerequisites": [
      "Conhecer IPv4, DNS, TCP/UDP, firewalls e HTTP/TLS dos módulos anteriores.",
      "Executar apenas em ambiente próprio, autorizado ou simulado.",
      "Não testar credenciais, túneis ou varreduras em redes de terceiros."
    ],
    "tools": [
      "Windows PowerShell",
      "Terminal Linux",
      "Wireshark opcional apenas em rede própria",
      "Editor de texto"
    ],
    "estimatedTimeMinutes": 70,
    "cost": "zero em modo conceitual/local; pode haver custo se o aluno reproduzir em cloud com gateway gerenciado ou logs pagos.",
    "safetyNotes": [
      "Não execute testes contra redes reais sem autorização formal.",
      "Não compartilhe credenciais, certificados, arquivos de configuração ou chaves privadas.",
      "Use dados fictícios em diagramas e matrizes de acesso.",
      "Em cloud, remova recursos ao final para evitar custo."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir o recurso protegido",
        "instruction": "Escolha um recurso fictício que precisa de acesso remoto e descreva por que ele não deve ficar público.",
        "command": "# Exemplo de inventário\nRecurso: intranet.empresa.local\nRede: 10.20.30.0/24\nUsuários: suporte, empregados, fornecedores",
        "expectedOutput": "Recurso, rede, usuários e justificativa documentados.",
        "explanation": "Sem inventário mínimo, a solução vira “abrir acesso” em vez de resolver uma necessidade específica."
      },
      {
        "number": 2,
        "title": "Mapear identidade e autorização",
        "instruction": "Liste grupos de usuários, métodos de autenticação, MFA, certificados e recursos permitidos.",
        "command": "# Modelo\nGrupo | Método | Recurso permitido | Horário | Evidência\nSuporte | MFA + aprovação | app suporte | expediente | log SIEM",
        "expectedOutput": "Matriz de acesso por perfil.",
        "explanation": "A matriz impede que todos recebam a mesma permissão ampla."
      },
      {
        "number": 3,
        "title": "Planejar rotas, DNS e política",
        "instruction": "Defina se o acesso será split tunnel, full tunnel, ZTNA por aplicação, bastion ou site-to-site.",
        "command": "# Decisão\nModo: split tunnel controlado\nDNS interno: apenas domínios privados\nRotas: somente sub-redes necessárias\nFirewall: negar por padrão",
        "expectedOutput": "Decisão técnica com justificativa.",
        "explanation": "Rotas e DNS determinam se o tráfego realmente chega ao recurso correto."
      },
      {
        "number": 4,
        "title": "Definir validação",
        "instruction": "Crie checks para autenticação, rota, DNS, firewall, aplicação e logs.",
        "command": "Windows: ipconfig /all && route print && nslookup intranet.empresa.local\nLinux: ip addr && ip route && dig intranet.empresa.local\nAplicação: curl -vk https://intranet.empresa.local",
        "expectedOutput": "Lista de comandos ou verificações por camada.",
        "explanation": "A validação por camadas evita culpar a aplicação quando a falha está em DNS ou rota."
      },
      {
        "number": 5,
        "title": "Documentar riscos residuais e limpeza",
        "instruction": "Liste riscos que continuam existindo e como revogar o acesso. Se usar cloud, inclua destruição dos recursos.",
        "command": "# Limpeza cloud\nRemover gateway/endpoint criado\nRemover logs temporários pagos\nRevogar usuário/certificado de teste\nExcluir regras temporárias de firewall",
        "expectedOutput": "Plano de revogação, limpeza e riscos residuais.",
        "explanation": "Acesso remoto seguro precisa ter fim controlado, especialmente para fornecedores e testes."
      },
      {
        "number": 6,
        "title": "Revisão técnica fina do desenho",
        "instruction": "Criar um runbook de diagnóstico com cinco falhas intencionais: rota ausente, DNS errado, ACL bloqueando, NAT/retorno assimétrico e MTU/MSS.",
        "command": "# Dossiê M10 10.8\nTema: Troubleshooting VPN: rotas, MTU, DNS e firewall\nFoco: diagnóstico por camadas | MTU/MSS/PMTUD | assimetria | NAT | logs correlacionados\nEntregável: matriz técnica com decisão, evidência e risco residual",
        "expectedOutput": "Matriz técnica preenchida com decisão, justificativa, evidência esperada, risco residual e dono operacional.",
        "explanation": "A revisão técnica impede que a aula fique apenas conceitual; o aluno precisa provar como validaria a solução em ambiente real ou simulado."
      },
      {
        "number": 7,
        "title": "Coletar evidências mínimas por camada",
        "instruction": "Liste quais evidências provariam autenticação, autorização, rota, DNS, firewall, túnel, aplicação e logs.",
        "command": "Camada | Evidência | Ferramenta | Resultado esperado | Se falhar\nIdentidade | MFA/log IdP | IdP/SIEM | usuário e política | revisar grupo\nRede | rota/DNS | route/dig/nslookup | caminho correto | corrigir perfil\nSegurança | allow/deny | firewall/SIEM | decisão auditável | ajustar política",
        "expectedOutput": "Tabela de evidências por camada, com resultado esperado e ação caso falhe.",
        "explanation": "Troubleshooting profissional depende de evidência observável. Sem evidência, a equipe apenas troca configurações no escuro."
      },
      {
        "number": 8,
        "title": "Definir rollback e revogação",
        "instruction": "Descreva como desfazer a configuração, revogar acesso e limpar recursos temporários ou cloud.",
        "command": "# Rollback/revogação\n1. Remover usuário/grupo temporário\n2. Revogar certificado/chave/token\n3. Remover rotas/regras temporárias\n4. Desabilitar gateway/endpoint de teste\n5. Confirmar ausência de sessão ativa\n6. Registrar evidência no ticket/RCA",
        "expectedOutput": "Plano de rollback e revogação com passos executáveis e evidência de fechamento.",
        "explanation": "Acesso remoto seguro precisa de começo, justificativa, monitoramento e fim controlado."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um desenho ou matriz operacional capaz de explicar quem acessa, o que acessa, por qual caminho, com quais controles, como validar e como revogar.",
    "validation": [
      {
        "check": "Existe matriz de acesso",
        "command": "Verificar se cada grupo tem recurso permitido e justificativa.",
        "expected": "Nenhum grupo com acesso any-any sem justificativa.",
        "ifFails": "Reduzir escopo por aplicação, rede ou função."
      },
      {
        "check": "Existe plano de DNS e rotas",
        "command": "Conferir nomes privados, sub-redes e modo split/full tunnel.",
        "expected": "DNS e rotas compatíveis com o desenho.",
        "ifFails": "Separar falha de resolução, encaminhamento e autorização."
      },
      {
        "check": "Existe evidência de logs",
        "command": "Listar quais eventos seriam enviados ao SIEM.",
        "expected": "Autenticação, autorização, falhas e acessos relevantes.",
        "ifFails": "Adicionar fontes de log antes de aprovar o desenho."
      },
      {
        "check": "Plano de controle validado",
        "command": "Confirmar autenticação, MFA/certificado/chave, política e logs do IdP/VPN/ZTNA.",
        "expected": "Decisão de acesso registrada com usuário/peer, grupo, dispositivo e motivo.",
        "ifFails": "Não aprovar o desenho até existir trilha de auditoria."
      },
      {
        "check": "Plano de dados validado",
        "command": "Confirmar rota, DNS, firewall/ACL/NAT, MTU/MSS e acesso à aplicação.",
        "expected": "Cada camada possui evidência e resultado esperado.",
        "ifFails": "Isolar a camada de falha antes de alterar configuração."
      },
      {
        "check": "Revogação testável",
        "command": "Simular remoção de grupo, certificado/chave, peer ou política temporária em ambiente de laboratório.",
        "expected": "Acesso removido e evidência registrada.",
        "ifFails": "Definir processo de revogação antes de publicar acesso remoto."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Conecta mas não acessa recurso",
        "probableCause": "Rota, DNS ou firewall incompatível.",
        "howToConfirm": "Comparar route print/ip route, nslookup/dig e regra de firewall.",
        "fix": "Corrigir rota específica, DNS interno ou política de acesso."
      },
      {
        "symptom": "Acessa por IP mas não por nome",
        "probableCause": "DNS interno ausente, split DNS incorreto ou sufixo não aplicado.",
        "howToConfirm": "Resolver o nome com nslookup ou dig usando DNS esperado.",
        "fix": "Ajustar DNS entregue pela VPN/ZTNA ou zona interna."
      },
      {
        "symptom": "Acesso lento",
        "probableCause": "Full tunnel desnecessário, MTU/MSS, proxy, inspeção ou rota longa.",
        "howToConfirm": "Testar latência, caminho e tamanho de pacote em ambiente controlado.",
        "fix": "Ajustar política, MTU/MSS, rota ou arquitetura."
      },
      {
        "symptom": "Túnel ou sessão ativa sem acesso à aplicação",
        "probableCause": "Plano de controle funcionando, mas plano de dados falhando por rota, DNS, ACL, NAT, MTU/MSS ou retorno.",
        "howToConfirm": "Comparar logs de autenticação com route print/ip route, dig/nslookup, firewall logs e teste de porta.",
        "fix": "Corrigir camada específica e registrar evidência antes de encerrar o chamado."
      },
      {
        "symptom": "Acesso permanece após remoção aparente do usuário",
        "probableCause": "Sessão persistente, certificado/chave ainda válido, grupo herdado ou token não revogado.",
        "howToConfirm": "Consultar logs de sessão ativa, inventário de certificados/chaves e memberships efetivos.",
        "fix": "Encerrar sessão, revogar credencial, remover grupos herdados e validar novo bloqueio."
      }
    ],
    "improvements": [
      "Adicionar diagrama de sequência autenticação -> política -> acesso.",
      "Criar runbook de revogação para fornecedores.",
      "Adicionar alertas de login anômalo, volume incomum e falhas repetidas.",
      "Adicionar alerta SIEM para falha repetida, país incomum, acesso fora de janela e túnel flapping.",
      "Criar teste semestral de revogação de certificado/chave/peer e anexar evidência ao processo.",
      "Comparar custo de VPN gateway, tráfego, logs e alternativas como ZTNA, bastion ou private endpoint."
    ],
    "evidenceToCollect": [
      "Matriz de acesso",
      "Diagrama do caminho",
      "Lista de rotas/DNS planejadas",
      "Checklist de logs",
      "Riscos residuais",
      "Critério de revogação",
      "Matriz VPN/ZTNA/bastion/private endpoint com justificativa",
      "Evidência de plano de controle",
      "Evidência de plano de dados",
      "Teste de DNS e rotas",
      "Teste ou justificativa de MTU/MSS quando aplicável",
      "Logs de acesso permitido e negado",
      "Plano de rollback e revogação"
    ],
    "questions": [
      "Qual problema este acesso resolve?",
      "Que recurso realmente precisa ser acessado?",
      "Quem aprova exceções?",
      "Que evidência provaria que a política funcionou?",
      "Qual evidência prova que o usuário/peer era realmente autorizado?",
      "Qual evidência prova que o recurso acessado era o correto?",
      "O que aconteceria se essa credencial fosse comprometida?",
      "Qual seria o primeiro controle a reduzir para aplicar menor privilégio?",
      "Qual custo operacional ou cloud esta solução cria?"
    ],
    "challenge": "Reduza o desenho para menor privilégio: remova qualquer rede, porta ou grupo que não seja necessário para o cenário.",
    "solution": "Uma solução adequada evita acesso amplo, usa MFA, restringe recursos por perfil, documenta DNS/rotas/firewall, coleta logs úteis e define revogação. A resposta fraca é “criar VPN para todos”; a resposta madura explica escopo, validação e operação.\n\nSolução comentada adicional P1-M10: a resposta madura para Troubleshooting VPN: rotas, MTU, DNS e firewall deve apresentar decisão técnica, evidências por camada, logs de segurança, riscos residuais, custos, rollback e revogação. Uma resposta incompleta apenas diz “usar VPN” sem provar autenticação, autorização, rotas, DNS, firewall, MTU/MSS e monitoramento.",
    "technicalReviewRequired": true,
    "authorizationRequired": true
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual problema existia antes desta solução e por que simplesmente expor o serviço na Internet seria ruim?",
      "hints": [
        "Pense em superfície de ataque.",
        "Pense em autorização e logs."
      ],
      "expectedIdeas": [
        "exposição pública",
        "identidade",
        "menor privilégio",
        "controle de acesso",
        "evidência"
      ],
      "explanation": "A resposta deve começar pelo problema de negócio e segurança, não pela ferramenta."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário conecta, mas não acessa a intranet. O que você verificaria antes de culpar a aplicação?",
      "hints": [
        "Rota?",
        "DNS?",
        "Firewall?",
        "Grupo de acesso?"
      ],
      "expectedIdeas": [
        "route print/ip route",
        "nslookup/dig",
        "logs do gateway",
        "política de firewall"
      ],
      "explanation": "Conexão de túnel é apenas uma etapa do fluxo."
    },
    {
      "type": "cenário real",
      "question": "Um fornecedor precisa suporte por 7 dias. Como liberar sem criar risco permanente?",
      "hints": [
        "Tempo limitado.",
        "Escopo mínimo.",
        "Logs e aprovação."
      ],
      "expectedIdeas": [
        "grupo temporário",
        "MFA",
        "recurso específico",
        "expiração",
        "auditoria"
      ],
      "explanation": "O desenho precisa incluir revogação e evidência."
    }
  ],
  "quiz": [
    {
      "id": "q10.8.1",
      "type": "conceito",
      "q": "Qual afirmação é mais correta sobre VPN?",
      "opts": [
        "VPN cria conectividade, mas não substitui autorização e menor privilégio.",
        "VPN torna qualquer dispositivo automaticamente seguro.",
        "VPN elimina a necessidade de logs.",
        "VPN sempre deve liberar a rede inteira."
      ],
      "a": 0,
      "exp": "VPN é apenas parte da arquitetura de acesso. Segurança depende também de identidade, política, segmentação e logs.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q10.8.2",
      "type": "diagnóstico",
      "q": "Usuário conecta, acessa por IP, mas não por nome. Qual hipótese vem primeiro?",
      "opts": [
        "DNS interno/split DNS incorreto.",
        "Cabo desconectado no datacenter.",
        "Sempre é problema de senha.",
        "Sempre é problema de BGP."
      ],
      "a": 0,
      "exp": "Se IP funciona e nome falha, DNS é uma hipótese forte.",
      "difficulty": "intermediário",
      "topic": "dns"
    },
    {
      "id": "q10.8.3",
      "type": "segurança",
      "q": "Qual prática reduz movimento lateral em acesso remoto?",
      "opts": [
        "Liberar todas as sub-redes para todos.",
        "Aplicar menor privilégio e segmentação.",
        "Remover MFA para reduzir atrito.",
        "Desativar logs para privacidade operacional."
      ],
      "a": 1,
      "exp": "Menor privilégio e segmentação reduzem alcance de uma credencial comprometida.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q10.8.4",
      "type": "arquitetura",
      "q": "Qual informação deve aparecer em uma matriz de acesso remoto?",
      "opts": [
        "Grupo, recurso permitido, método de autenticação, justificativa e evidência.",
        "Apenas nome comercial da ferramenta.",
        "Somente a senha do usuário.",
        "Apenas velocidade do link."
      ],
      "a": 0,
      "exp": "A matriz transforma acesso remoto em controle auditável.",
      "difficulty": "intermediário",
      "topic": "arquitetura"
    },
    {
      "id": "q10.8.5",
      "type": "operação",
      "q": "Por que logs são essenciais em VPN/ZTNA?",
      "opts": [
        "Para provar quem acessou o quê, quando e com qual decisão de política.",
        "Para substituir backup.",
        "Para aumentar latência propositalmente.",
        "Para dispensar revisão de acesso."
      ],
      "a": 0,
      "exp": "Sem logs úteis, a operação não investiga nem audita adequadamente.",
      "difficulty": "intermediário",
      "topic": "logs"
    }
  ],
  "flashcards": [
    {
      "id": "fc10.8.1",
      "front": "VPN garante segurança automaticamente?",
      "back": "Não. VPN cria caminho protegido, mas segurança depende de identidade, autorização, segmentação, hardening e logs.",
      "tags": [
        "vpn",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc10.8.2",
      "front": "O que é split tunnel?",
      "back": "Modelo em que apenas tráfego destinado a redes ou aplicações específicas passa pelo túnel.",
      "tags": [
        "split-tunnel"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc10.8.3",
      "front": "O que é full tunnel?",
      "back": "Modelo em que todo tráfego do cliente passa pela VPN ou ponto corporativo.",
      "tags": [
        "full-tunnel"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc10.8.4",
      "front": "O que ZTNA tenta reduzir?",
      "back": "A confiança implícita baseada em estar dentro da rede e o acesso amplo a sub-redes inteiras.",
      "tags": [
        "zero-trust",
        "ztna"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc10.8.5",
      "front": "Qual tríade operacional investigar em VPN conectada sem acesso?",
      "back": "Rotas, DNS e firewall/política.",
      "tags": [
        "troubleshooting"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex10.8.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre túnel estabelecido e autorização concedida.",
      "expectedAnswer": "Túnel estabelecido indica conectividade até o ponto de controle; autorização define quais recursos, portas ou aplicações podem ser acessados.",
      "explanation": "Separar esses conceitos evita diagnósticos e políticas permissivas."
    },
    {
      "id": "ex10.8.2",
      "type": "diagnóstico",
      "prompt": "Um usuário conecta na VPN e não resolve nomes internos. Liste três verificações.",
      "expectedAnswer": "Ver DNS entregue ao cliente, sufixo/zona interna e se o nome resolve para IP privado correto; também validar rota para o DNS.",
      "explanation": "Problemas de DNS são frequentes em split tunnel e ambientes híbridos."
    },
    {
      "id": "ex10.8.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma política mínima para fornecedor temporário.",
      "expectedAnswer": "MFA, grupo temporário, recurso específico, janela de acesso, logs, aprovação e expiração automática.",
      "explanation": "Acesso de terceiros precisa de menor privilégio e ciclo de vida."
    },
    {
      "id": "ex10.8.p1m10.1",
      "type": "diagnóstico",
      "prompt": "Em Troubleshooting VPN: rotas, MTU, DNS e firewall, a sessão aparece como conectada, mas a aplicação falha. Separe hipóteses de plano de controle e plano de dados.",
      "expectedAnswer": "Plano de controle: identidade, MFA, certificado/chave, política e sessão. Plano de dados: rota, DNS, seletor/AllowedIPs, firewall, NAT, MTU/MSS, retorno e aplicação.",
      "explanation": "Essa separação evita alterar credenciais quando o problema é rota, ou alterar rota quando o problema é autorização."
    },
    {
      "id": "ex10.8.p1m10.2",
      "type": "arquitetura",
      "prompt": "Crie uma matriz comparando VPN tradicional, ZTNA, bastion e private endpoint para um recurso sensível.",
      "expectedAnswer": "A matriz deve indicar necessidade, recurso, usuário/grupo, método, controles, logs, custos, limitações e motivo da escolha.",
      "explanation": "A ferramenta deve vir depois do problema, não antes."
    },
    {
      "id": "ex10.8.p1m10.3",
      "type": "segurança",
      "prompt": "Liste três eventos que deveriam gerar alerta SIEM em acesso remoto.",
      "expectedAnswer": "Exemplos: falhas repetidas de MFA, login de local incomum, túnel flapping, peer antigo ativo, alto volume para segmento sensível, denies laterais ou uso fora de janela aprovada.",
      "explanation": "O objetivo é transformar acesso remoto em operação auditável e detectável."
    }
  ],
  "challenge": {
    "title": "Desafio 10.8: aplicar Troubleshooting VPN: rotas, MTU, DNS e firewall em empresa híbrida",
    "scenario": "Uma empresa com matriz, cloud e 80 usuários remotos precisa permitir acesso a intranet, administração de servidores e suporte de fornecedor sem expor serviços diretamente na Internet.",
    "tasks": [
      "Definir perfis de acesso.",
      "Escolher VPN, ZTNA, bastion ou caminho privado para cada caso.",
      "Criar matriz de rotas/DNS/políticas.",
      "Listar logs e alertas.",
      "Definir revogação e revisão."
    ],
    "constraints": [
      "Não liberar rede inteira para todos.",
      "Fornecedor deve ter acesso temporário.",
      "Administração privilegiada precisa MFA e logs.",
      "Custos cloud devem ser considerados."
    ],
    "expectedDeliverables": [
      "Diagrama",
      "Matriz de acesso",
      "Plano de validação",
      "Riscos residuais",
      "Runbook de revogação"
    ],
    "gradingRubric": [
      {
        "criterion": "Menor privilégio",
        "points": 25,
        "description": "Acesso limitado por perfil e recurso."
      },
      {
        "criterion": "Diagnóstico",
        "points": 25,
        "description": "Inclui validação de identidade, rota, DNS, firewall e aplicação."
      },
      {
        "criterion": "Segurança operacional",
        "points": 25,
        "description": "Inclui MFA, logs, revogação e revisão."
      },
      {
        "criterion": "Clareza arquitetural",
        "points": 25,
        "description": "Diagrama e decisões justificadas."
      },
      {
        "criterion": "Decisão técnica justificada",
        "points": 20,
        "description": "Compara VPN, ZTNA, bastion e private endpoint em relação ao problema real."
      },
      {
        "criterion": "Evidências por camada",
        "points": 20,
        "description": "Demonstra autenticação, autorização, rota, DNS, firewall, MTU/MSS quando aplicável e aplicação."
      },
      {
        "criterion": "Segurança operacional",
        "points": 20,
        "description": "Inclui MFA, certificados/chaves, logs, alertas, menor privilégio e revogação."
      },
      {
        "criterion": "Custos e rollback",
        "points": 20,
        "description": "Mapeia custos de gateway, tráfego, logs, operação e plano de limpeza/reversão."
      },
      {
        "criterion": "Defesa técnica",
        "points": 20,
        "description": "Explica riscos residuais, trade-offs e validação pós-mudança."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Comece pelo recurso, não pela ferramenta. Depois defina quem precisa acessar, qual caminho minimiza exposição, quais controles provam identidade e quais logs permitem investigação.",
    "steps": [
      "Inventariar recursos privados.",
      "Separar perfis de usuário.",
      "Escolher VPN, ZTNA, bastion ou caminho privado por caso.",
      "Definir DNS, rotas e firewall.",
      "Adicionar MFA, logs, alertas e revogação.",
      "Validar por camadas.",
      "Separar o problema em identidade, política, caminho de rede, DNS, firewall, túnel, aplicação e logs.",
      "Escolher a arquitetura com base no recurso e no risco, não na ferramenta favorita.",
      "Definir evidências mínimas antes da mudança: sucesso, negação, falha e revogação.",
      "Criar rollback e limpeza para usuários, chaves, certificados, rotas, regras e recursos cloud.",
      "Registrar riscos residuais e monitoramento contínuo."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Criar uma VPN para todos na rede inteira.",
        "whyItIsWrong": "Funciona rapidamente, mas amplia superfície de ataque e movimento lateral."
      },
      {
        "answer": "Publicar RDP/SSH diretamente na Internet.",
        "whyItIsWrong": "Aumenta muito a exposição e dificulta controle de identidade e logs."
      },
      {
        "answer": "Colocar todos os usuários na VPN com acesso à rede inteira.",
        "whyItIsWrong": "Resolve conectividade rapidamente, mas amplia movimento lateral, dificulta auditoria e viola menor privilégio."
      },
      {
        "answer": "Aprovar a mudança porque o túnel ficou up.",
        "whyItIsWrong": "Túnel ativo não prova que DNS, rotas, firewall, aplicação, logs e revogação funcionam."
      }
    ],
    "finalAnswer": "A solução madura usa acesso por perfil, recurso mínimo, MFA, rotas/DNS planejados, segmentação, logs e processo de revogação."
  },
  "glossary": [
    {
      "term": "VPN",
      "shortDefinition": "Rede privada virtual para transportar tráfego protegido por rede pública ou compartilhada.",
      "longDefinition": "Conjunto de técnicas que criam caminho lógico controlado, frequentemente criptografado, entre cliente, sites ou ambientes.",
      "example": "Usuário remoto acessa intranet por cliente VPN.",
      "relatedTerms": [
        "túnel",
        "IPsec",
        "ZTNA",
        "MFA"
      ],
      "relatedLessons": [
        "10.1",
        "10.2"
      ]
    },
    {
      "term": "ZTNA",
      "shortDefinition": "Acesso de rede Zero Trust baseado em identidade e política.",
      "longDefinition": "Modelo que evita confiança implícita por localização de rede e tende a liberar aplicações ou recursos de forma granular.",
      "example": "Fornecedor acessa apenas um portal específico após MFA.",
      "relatedTerms": [
        "Zero Trust",
        "SASE",
        "identidade"
      ],
      "relatedLessons": [
        "10.7",
        "13.8"
      ]
    },
    {
      "term": "Security Association (SA)",
      "shortDefinition": "Estado negociado que define como pares IPsec/IKE protegem comunicação.",
      "longDefinition": "Em IPsec/IKE, uma SA representa parâmetros acordados, como algoritmos, chaves, SPI, lifetimes e direção do tráfego. Troubleshooting profissional verifica se a SA existe e se os contadores crescem nos dois sentidos.",
      "example": "Uma IKE SA pode estar ativa enquanto a IPsec SA de dados não tem decaps, indicando falha de retorno, seletor ou firewall.",
      "relatedTerms": [
        "IKEv2",
        "IPsec",
        "ESP",
        "SPI"
      ],
      "relatedLessons": [
        "10.2",
        "10.3",
        "10.8"
      ]
    },
    {
      "term": "NAT Traversal (NAT-T)",
      "shortDefinition": "Mecanismo usado para IPsec atravessar NAT encapsulando tráfego em UDP quando necessário.",
      "longDefinition": "NAT-T evita que NAT intermediário quebre a associação entre endpoints IPsec, normalmente envolvendo UDP 4500 em muitos cenários. É um ponto comum de falha quando há firewalls ou roteadores entre os pares.",
      "example": "Um túnel que funciona em link direto, mas falha atrás de um roteador residencial, pode depender de NAT-T e regras UDP.",
      "relatedTerms": [
        "IPsec",
        "NAT",
        "UDP 4500"
      ],
      "relatedLessons": [
        "7.8",
        "10.3",
        "10.8"
      ]
    },
    {
      "term": "Split DNS",
      "shortDefinition": "Uso de respostas DNS diferentes para o mesmo domínio conforme origem ou contexto.",
      "longDefinition": "Em VPN, split DNS permite que nomes internos resolvam para IPs privados enquanto nomes públicos continuam usando resolução normal. Erros de split DNS são uma causa comum de “acessa por IP, mas não por nome”.",
      "example": "intranet.empresa.com resolve para 10.20.30.10 quando conectado à VPN, mas para endereço público ou NXDOMAIN fora dela.",
      "relatedTerms": [
        "DNS",
        "VPN",
        "split tunnel"
      ],
      "relatedLessons": [
        "7.1",
        "10.6",
        "15.5"
      ]
    },
    {
      "term": "Cryptokey Routing",
      "shortDefinition": "Modelo do WireGuard que associa chaves públicas a endereços permitidos no túnel.",
      "longDefinition": "No WireGuard, cada peer possui chave pública e AllowedIPs. Essa associação funciona ao mesmo tempo como controle de identidade do peer e decisão de quais endereços são aceitos ou roteados pelo túnel.",
      "example": "Se AllowedIPs estiver amplo demais, um peer pode receber ou anunciar tráfego além do necessário.",
      "relatedTerms": [
        "WireGuard",
        "AllowedIPs",
        "VPN"
      ],
      "relatedLessons": [
        "10.5",
        "10.8"
      ]
    },
    {
      "term": "ZTNA",
      "shortDefinition": "Zero Trust Network Access: acesso controlado por aplicação ou recurso com base em identidade, contexto e política.",
      "longDefinition": "ZTNA reduz dependência de acesso amplo à rede. Em vez de colocar o usuário em uma sub-rede interna inteira, o acesso é mediado por políticas que consideram usuário, dispositivo, recurso, contexto e evidências.",
      "example": "Um fornecedor acessa apenas o painel de suporte aprovado, sem rota para a rede de servidores.",
      "relatedTerms": [
        "Zero Trust",
        "SASE",
        "Policy Enforcement Point"
      ],
      "relatedLessons": [
        "10.7",
        "13.10",
        "16.7"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "NIST SP 800-207 Zero Trust Architecture",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/publications/detail/sp/800-207/final",
      "note": "Base conceitual para Zero Trust."
    },
    {
      "type": "rfc",
      "title": "RFC 4301 Security Architecture for the Internet Protocol",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc4301",
      "note": "Referência de arquitetura IPsec."
    },
    {
      "type": "rfc",
      "title": "RFC 8446 The Transport Layer Security Protocol Version 1.3",
      "organization": "IETF",
      "url": "https://www.rfc-editor.org/rfc/rfc8446",
      "note": "Referência moderna para TLS."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aprofunda identidade, MFA, OIDC, SAML, service accounts e governança."
    },
    {
      "type": "official-doc",
      "title": "Resolve IPv4 Fragmentation, MTU, MSS, and PMTUD Issues with GRE and IPsec",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/ip/generic-routing-encapsulation-gre/25885-pmtud-ipfrag.html",
      "note": "Referência para troubleshooting de fragmentação, MTU, MSS e PMTUD em túneis."
    },
    {
      "type": "official-doc",
      "title": "AWS Site-to-Site VPN logs",
      "organization": "AWS",
      "url": "https://docs.aws.amazon.com/vpn/latest/s2svpn/monitoring-logs.html",
      "note": "Referência para logs de VPN site-to-site, troubleshooting, visibilidade centralizada e compliance."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud/IaC/Kubernetes",
      "lesson": "referência cruzada",
      "reason": "Acesso privado em pipelines e workloads precisa de automação, identidade e logs."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "MFA/OIDC/SAML",
      "reason": "ZTNA e acesso remoto moderno dependem de identidade forte e governança."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "m14",
      "lesson": "14.4",
      "reason": "Mudanças de VPN, ZTNA, DNS e firewall devem ser versionadas, revisadas e validadas como IaC ou mudança controlada."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "m04",
      "lesson": "4.2",
      "reason": "MFA, federação, grupos, certificados e políticas condicionais sustentam acesso remoto seguro."
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
      "10.9"
    ]
  },
  "reviewStatus": "p1-m10-revisao-tecnica-fina-aplicada",
  "vpnTechnicalReview": {
    "status": "aplicada",
    "focusAreas": [
      "diagnóstico por camadas",
      "MTU/MSS/PMTUD",
      "assimetria",
      "NAT",
      "logs correlacionados"
    ],
    "validatedAgainst": [
      "Resolve IPv4 Fragmentation, MTU, MSS, and PMTUD Issues with GRE and IPsec",
      "AWS Site-to-Site VPN logs"
    ],
    "decisionMatrix": [
      {
        "situation": "Recurso é aplicação web interna para grupo específico",
        "recommendedChoice": "ZTNA/proxy por aplicação com MFA e logs por usuário",
        "why": "Reduz alcance de rede e melhora auditoria por recurso.",
        "risk": "Integração com IdP, headers, sessão e grupos precisa ser bem testada."
      },
      {
        "situation": "Duas redes privadas precisam trocar tráfego contínuo",
        "recommendedChoice": "Site-to-site VPN route-based com rotas explícitas e logs",
        "why": "Resolve conectividade entre redes com governança de sub-redes.",
        "risk": "Seletores amplos e rotas de retorno incorretas aumentam exposição."
      },
      {
        "situation": "Administração privilegiada de servidores",
        "recommendedChoice": "Bastion/PAM/JIT com MFA e gravação de sessão",
        "why": "Acesso administrativo exige trilha forte e menor privilégio.",
        "risk": "VPN ampla para SSH/RDP dificulta auditoria e aumenta movimento lateral."
      },
      {
        "situation": "Serviço PaaS cloud sensível",
        "recommendedChoice": "Private endpoint/PrivateLink com DNS privado e regras restritivas",
        "why": "Reduz exposição pública e centraliza caminho privado.",
        "risk": "DNS privado e custos de endpoint/logs precisam ser acompanhados."
      }
    ],
    "controlPlaneVsDataPlane": {
      "controlPlane": [
        "identidade do par ou usuário",
        "MFA/certificado/chave",
        "negociação de parâmetros",
        "timers/keepalive/DPD",
        "política de autorização"
      ],
      "dataPlane": [
        "rotas instaladas",
        "seletores/AllowedIPs",
        "encapsulamento",
        "firewall/ACL/NAT",
        "MTU/MSS",
        "aplicação e DNS"
      ],
      "commonFailureMode": "Controle parece ativo, mas o plano de dados falha por rota, DNS, seletor, NAT, firewall, MTU/MSS ou retorno assimétrico."
    },
    "evidenceChecklist": [
      "log de autenticação/autorização com usuário, grupo, dispositivo e política",
      "rotas entregues/instaladas no cliente ou gateway",
      "resolução DNS esperada para FQDN interno e externo",
      "logs de firewall/ACL/NAT com allow/deny justificado",
      "contadores de túnel, bytes, handshakes ou SAs quando aplicável",
      "teste de MTU/MSS quando houver lentidão ou timeout seletivo",
      "plano de rollback, revogação e limpeza de recursos"
    ],
    "costAndOperations": [
      "Mapear custo de gateway, tráfego processado, logs, retenção e suporte operacional.",
      "Definir dono da política, dono do recurso e dono da revogação.",
      "Criar calendário de revisão de acessos, certificados, chaves e regras temporárias."
    ]
  },
  "blueTeamDetections": [
    {
      "name": "Acesso remoto anômalo em 10.8",
      "signal": "Login VPN/ZTNA bem-sucedido fora do padrão de usuário, dispositivo, país, ASN ou horário.",
      "pseudoQuery": "vpn_success where user_baseline_mismatch=true or country not in user_expected_countries | group by user, source_ip, device_id, policy",
      "falsePositive": "Viagem corporativa, troca de provedor, novo dispositivo autorizado ou plantão fora do horário.",
      "response": "Validar contexto, exigir step-up MFA, revisar sessão, acionar usuário e bloquear se não houver justificativa."
    },
    {
      "name": "Tráfego excessivo ou lateral após sessão remota em 10.8",
      "signal": "Aumento incomum de conexões, denies ou volume a partir da faixa VPN/ZTNA.",
      "pseudoQuery": "flow_logs where src_zone=\"vpn\" and (bytes_out > baseline*3 or deny_count > threshold) | group by user, src_ip, dst_subnet, dst_port",
      "falsePositive": "Backup, atualização, troubleshooting autorizado ou migração planejada.",
      "response": "Correlacionar com ticket, limitar política, isolar sessão e preservar logs para RCA."
    }
  ]
};
