export const lesson1210 = {
  "id": "12.10",
  "moduleId": "m12",
  "order": 10,
  "title": "Revisão prática: projetar Wi-Fi seguro",
  "subtitle": "Como transformar RF, SSID, BSSID, WPA, 802.1X, VLANs, roaming, ameaças e troubleshooting em uma arquitetura corporativa coerente.",
  "duration": "150-210 min",
  "estimatedStudyTimeMinutes": 210,
  "difficulty": "intermediário-avançado",
  "type": "ligação",
  "xp": 320,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "arquitetura",
    "segurança",
    "wpa3",
    "802.1x",
    "vlans",
    "guest",
    "iot",
    "troubleshooting",
    "blue-team"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.1",
      "reason": "A arquitetura parte do entendimento de Wi‑Fi como acesso local sem fio, não como sinônimo de internet."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.2",
      "reason": "O desenho precisa considerar RF, frequência, canais, RSSI e SNR."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.4",
      "reason": "SSID, BSSID, associação e autenticação são a base do fluxo de entrada do cliente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "WPA2/WPA3, 802.1X, RADIUS e certificados definem o controle de acesso."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.7",
      "reason": "APs, controladoras, VLANs, NAC, firewall e SIEM compõem a arquitetura corporativa."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.9",
      "reason": "Um projeto seguro precisa ser diagnosticável, não apenas funcional no dia da implantação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall, ACLs, zonas e políticas são necessários para segmentar SSIDs."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM",
      "lesson": "802.1X/RADIUS/PKI",
      "reason": "A autenticação corporativa wireless depende de identidade, certificados e ciclo de vida de usuários/dispositivos."
    }
  ],
  "objectives": [
    "Consolidar o Módulo 12 em um projeto de Wi‑Fi seguro, segmentado e diagnosticável.",
    "Criar uma arquitetura com SSIDs, VLANs, autenticação, firewall, guest, IoT, logs e troubleshooting.",
    "Definir decisões de RF sem confundir cobertura com capacidade.",
    "Escolher WPA Enterprise, WPA3, PSK, captive portal ou isolamento conforme o tipo de usuário/dispositivo.",
    "Mapear riscos wireless e controles defensivos sem instruções ofensivas.",
    "Produzir entregáveis de arquitetura: diagrama, matriz de acesso, checklist de validação, plano de logs e plano de evolução."
  ],
  "learningOutcomes": [
    "Dado um cenário empresarial, o aluno consegue propor SSIDs mínimos e VLANs por função.",
    "Dado um requisito de segurança, o aluno escolhe autenticação adequada sem criar rede plana.",
    "Dado um problema de experiência, o aluno relaciona RF, roaming, DHCP, DNS, firewall e aplicação.",
    "Dado um pedido de rede guest, o aluno isola visitantes sem expor sistemas internos.",
    "Dado um desenho de WLAN, o aluno identifica riscos, custos, pontos de falha e evidências de monitoramento."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Agora imagine que a diretoria pediu “um Wi‑Fi seguro para a empresa”. Essa frase parece simples, mas pode esconder dezenas de decisões: quem são os usuários, quais dispositivos são confiáveis, como visitantes acessam internet, como IoT se comunica, onde ficam os logs, quais sistemas internos podem ser alcançados, como será feito offboarding, como diagnosticar uma queda em reunião e como impedir que uma rede sem fio vire uma ponte lateral para o datacenter.</p>\n  <p>A motivação desta aula é transformar o Módulo 12 em competência prática. Até aqui você estudou por que Wi‑Fi existe, RF, canais, RSSI, SNR, padrões 802.11, SSID, BSSID, associação, autenticação, WPA2, WPA3, 802.1X, roaming, arquitetura corporativa, ameaças e troubleshooting. Agora o objetivo é juntar tudo em um projeto único, como seria exigido em uma empresa.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> muitas organizações compram APs modernos, mas mantêm PSK compartilhado, guest mal isolado, IoT na rede interna, firewall permissivo, logs insuficientes e ausência de inventário de BSSIDs. O resultado é uma rede aparentemente funcional, mas frágil, difícil de auditar e ruim de diagnosticar.</div>\n  <p>Projetar Wi‑Fi seguro não significa apenas “usar WPA3”. Significa desenhar uma borda de acesso com autenticação, autorização, segmentação, controle de tráfego, operação, logs, resposta a incidente e experiência do usuário. Esta aula é a ponte entre Wireless e o próximo módulo, Segurança de Redes.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As primeiras redes sem fio corporativas eram frequentemente tratadas como comodidade: um AP em uma sala, uma senha compartilhada e acesso à rede interna. Com o tempo, o Wi‑Fi deixou de ser extra e virou infraestrutura primária para notebooks, celulares, coletores, impressoras, câmeras, dispositivos médicos, salas de reunião, logística e visitantes.</p>\n  <p>Esse crescimento trouxe uma mudança histórica: a borda da rede deixou de ser apenas a porta física do switch. A borda passou a incluir rádio, AP, controladora, SSID, BSSID, WPA, 802.1X, RADIUS, MDM, NAC, certificados, VLAN dinâmica, firewall, DNS, DHCP e telemetria. O cabo ainda importa, mas o perímetro físico ficou menos óbvio. Um usuário no estacionamento pode enxergar um SSID; um dispositivo IoT pode aparecer em uma sala; um visitante pode se conectar perto da recepção.</p>\n  <p>A evolução da segurança wireless também foi moldada por falhas anteriores. WEP mostrou que criptografia fraca e desenho ruim não protegem uma WLAN. WPA/WPA2 melhoraram muito o cenário, e WPA3 trouxe avanços importantes. Mas, em ambiente corporativo, a lição principal permanece: protocolo forte não compensa arquitetura fraca, senha compartilhada sem ciclo de vida, ausência de logs ou segmentação inexistente.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema central é que Wi‑Fi concentra conveniência e risco no mesmo lugar. Ele facilita mobilidade, reduz dependência de cabos e permite onboarding rápido, mas também amplia a superfície de acesso. Se a arquitetura for plana, qualquer cliente autorizado ou indevidamente conectado pode ficar próximo demais de serviços internos.</p>\n  <ul>\n    <li><strong>Problema de identidade:</strong> quem é o usuário ou dispositivo conectado?</li>\n    <li><strong>Problema de autorização:</strong> o que esse usuário ou dispositivo pode acessar?</li>\n    <li><strong>Problema de segmentação:</strong> a rede separa funcionários, visitantes e IoT de forma real?</li>\n    <li><strong>Problema de RF:</strong> a cobertura suporta a experiência esperada sem causar interferência e roaming ruim?</li>\n    <li><strong>Problema de operação:</strong> há logs suficientes para diagnosticar falhas e incidentes?</li>\n    <li><strong>Problema financeiro:</strong> licenças, APs, switches PoE, NAC, SIEM e suporte cabem no orçamento?</li>\n    <li><strong>Problema de segurança:</strong> há caminho lateral indevido entre segmentos?</li>\n  </ul>\n  <p>A solução não é escolher uma ferramenta isolada. A solução é arquitetura: decisões documentadas, controles compatíveis, validação e operação.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>O desenho de WLAN evoluiu de “um SSID e uma senha” para “uma arquitetura de acesso baseada em identidade, contexto, segmentação e observabilidade”. A tabela abaixo resume essa evolução.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Fase</th><th>Como era</th><th>Limitação</th><th>Modelo recomendado</th></tr></thead>\n    <tbody>\n      <tr><td>Wi‑Fi doméstico reaproveitado</td><td>AP simples, PSK único, todos na mesma rede.</td><td>Sem rastreabilidade, segmentação ou operação corporativa.</td><td>AP corporativo, logs, VLANs e políticas.</td></tr>\n      <tr><td>SSID por grupo</td><td>Muitos SSIDs para departamentos e dispositivos.</td><td>Aumenta complexidade e overhead sem garantir autorização correta.</td><td>Poucos SSIDs com identidade, VLAN dinâmica e firewall.</td></tr>\n      <tr><td>Guest como “segunda senha”</td><td>Visitantes tinham SSID separado, mas com acesso lateral.</td><td>SSID diferente não significa isolamento real.</td><td>Guest em zona não confiável, saída controlada e bloqueio interno.</td></tr>\n      <tr><td>Sem observabilidade</td><td>Logs só eram vistos durante incidentes.</td><td>RCA fraco e troubleshooting baseado em opinião.</td><td>Logs de controladora, RADIUS, DHCP, DNS, firewall e SIEM desde o projeto.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Projetar Wi‑Fi seguro é desenhar uma rede sem fio como serviço corporativo completo: rádio, acesso, identidade, autorização, segmentação, política, logs, operação e evolução. A WLAN deve ser funcional, segura, auditável e diagnosticável.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> uma arquitetura Wi‑Fi segura é aquela em que cada tipo de cliente entra por um caminho conhecido, autentica de forma adequada ao risco, recebe autorização compatível, fica em segmento controlado, gera evidências e pode ser diagnosticado sem relaxar controles.</div>\n  <p>O conceito mais importante é separar autenticação de autorização. Autenticação responde “quem é?”. Autorização responde “o que pode acessar?”. No Wi‑Fi corporativo, 802.1X/RADIUS pode identificar usuário ou dispositivo, mas VLAN, firewall, ACL, DNS e políticas definem o acesso real.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, o projeto seguro precisa encadear decisões. Um cliente não “entra na internet”; ele passa por etapas sucessivas.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Descoberta:</strong> o cliente enxerga SSIDs e BSSIDs anunciados por APs.</li>\n    <li><strong>Associação:</strong> o cliente escolhe um BSSID e entra no BSS.</li>\n    <li><strong>Autenticação:</strong> PSK/SAE ou 802.1X/EAP valida o acesso inicial.</li>\n    <li><strong>Autorização:</strong> RADIUS/NAC/controladora podem aplicar VLAN, ACL ou política.</li>\n    <li><strong>Endereçamento:</strong> DHCP entrega IP, máscara, gateway e DNS do segmento correto.</li>\n    <li><strong>Controle:</strong> firewall e políticas determinam destinos permitidos.</li>\n    <li><strong>Observabilidade:</strong> logs permitem responder quem conectou, onde, quando, com qual IP e qual política.</li>\n  </ol>\n  <p>Quando qualquer etapa fica implícita, o projeto vira risco. Se não há inventário de BSSID, fica difícil detectar rogue AP. Se não há matriz de acesso, regras de firewall viram exceções permanentes. Se não há logs RADIUS, falhas 802.1X viram chamados genéricos. Se não há baseline RF, qualquer lentidão vira “problema de internet”.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura corporativa típica separa planos e zonas. O plano de RF cuida de cobertura, canal e capacidade. O plano de controle cuida de APs, controladora e configuração. O plano de segurança cuida de autenticação, autorização, VLANs, firewall, logs e resposta. O plano de serviços cuida de DHCP, DNS, gateway e aplicações.</p>\n  <ul>\n    <li><strong>SSID corporativo:</strong> dispositivos gerenciados, WPA Enterprise, 802.1X/EAP-TLS, RADIUS, certificados e logs.</li>\n    <li><strong>SSID guest:</strong> visitantes, isolamento, internet controlada, sem acesso lateral a redes internas.</li>\n    <li><strong>SSID IoT:</strong> dispositivos com capacidade limitada, inventário, acesso mínimo e monitoramento.</li>\n    <li><strong>VLAN de gerenciamento:</strong> APs e controladora fora das VLANs de usuários.</li>\n    <li><strong>Firewall:</strong> políticas entre zonas com deny-by-default e exceções justificadas.</li>\n    <li><strong>SIEM:</strong> correlação de AP, usuário, MAC, BSSID, IP, VLAN, RADIUS e firewall.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense no Wi‑Fi corporativo como a recepção de um prédio empresarial. O SSID é a placa na porta. O BSSID é a porta física específica. A autenticação é mostrar crachá ou documento. A autorização é saber em quais andares você pode entrar. A VLAN é o corredor para onde você é direcionado. O firewall é a catraca entre áreas. O SIEM é o livro de registros e câmeras.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em rede, o acesso não é apenas físico. Um cliente autenticado pode tentar muitos destinos em milissegundos, automatizar tráfego, gerar logs distribuídos e explorar falhas de segmentação. Por isso, autenticação sem autorização não basta.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em uma casa, você talvez use um SSID principal e uma rede de visitantes. O princípio já aparece: visitantes não deveriam acessar impressoras, computadores pessoais ou dispositivos sensíveis. Mesmo em casa, um bom desenho separa confiança.</p>\n  <p>O erro comum é achar que “senha forte” resolve tudo. Ela protege a entrada, mas não define o que cada dispositivo pode acessar depois que entrou. Se câmera, notebook, celular de visita e computador de trabalho ficam na mesma rede, qualquer comprometimento pode afetar outros ativos.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, a solução recomendada costuma ser: SSID corporativo com WPA Enterprise e certificados para notebooks gerenciados; SSID guest isolado; SSID IoT restrito; VLAN de gerenciamento para APs; firewall entre zonas; RADIUS integrado ao IAM; logs no SIEM; inventário de BSSIDs; checklist de RF e troubleshooting.</p>\n  <p>Quando um usuário é desligado, o acesso Wi‑Fi deve ser removido pelo ciclo de vida de identidade/certificado, não por troca manual de uma senha compartilhada para toda a empresa. Quando um dispositivo IoT tenta acessar um servidor não previsto, o firewall deve bloquear e registrar. Quando um BSSID desconhecido anuncia SSID parecido, WIDS/WIPS ou monitoramento deve gerar investigação.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Mesmo que Wi‑Fi seja local, ele se conecta à cloud de várias formas. Muitas controladoras são cloud-managed; RADIUS pode estar integrado a identidade híbrida; logs podem ir para SIEM/SOAR em cloud; DNS pode resolver serviços privados; VPN ou SD-WAN pode levar tráfego da filial para workloads em VPC/VNet.</p>\n  <p>O erro é tratar cloud como “internet liberada”. Se o SSID corporativo acessa sistemas em AWS, Azure ou Google Cloud, a política precisa definir rotas, DNS, firewall, private endpoints, logs e custos de tráfego. Visitantes não devem ganhar caminho lateral para VPC/VNet só porque estão fisicamente na empresa.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, o desenho Wi‑Fi pode virar código e governança. SSIDs, VLANs, políticas de firewall, grupos de identidade, certificados, rotação, dashboards e alertas podem ser documentados e versionados. Mudanças devem passar por revisão, teste e rollback.</p>\n  <p>Exemplo: uma alteração de firewall para liberar IoT até um broker MQTT deve ter justificativa, origem/destino/porta, prazo, logs e validação. Um pipeline de infraestrutura pode validar que a VLAN guest nunca possui rota para redes internas. Um dashboard pode alertar aumento de falhas 802.1X após troca de certificado.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de Segurança, Wi‑Fi é uma borda de acesso e uma fonte de telemetria. Ele deve reduzir movimento lateral, permitir investigação e evitar confiança implícita. O foco é defensivo: inventariar, autenticar, autorizar, isolar, monitorar e responder.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>PSK compartilhado</td><td>Senha única para muitos usuários.</td><td>Baixa rastreabilidade e offboarding fraco.</td><td>WPA Enterprise, 802.1X, certificados e IAM.</td></tr>\n      <tr><td>Guest lateral</td><td>Visitante alcança rede interna.</td><td>Exposição de ativos internos.</td><td>Zona guest isolada, firewall deny-by-default e logs.</td></tr>\n      <tr><td>IoT excessivo</td><td>Dispositivo acessa destinos além do necessário.</td><td>Movimento lateral e abuso de dispositivo frágil.</td><td>Segmento IoT restrito, inventário e allowlist.</td></tr>\n      <tr><td>Rogue AP</td><td>BSSID não inventariado anuncia SSID parecido.</td><td>Engano de usuário, coleta indevida ou bypass.</td><td>Inventário, WIDS/WIPS, validação de certificado e investigação.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1200 620\" role=\"img\" aria-labelledby=\"wifi-secure-design-title wifi-secure-design-desc\">\n    <title id=\"wifi-secure-design-title\">Projeto de Wi‑Fi corporativo seguro</title>\n    <desc id=\"wifi-secure-design-desc\">Diagrama mostra clientes corporativos, visitantes e IoT conectando a APs, controladora, RADIUS, VLANs, firewall, serviços, internet e SIEM.</desc>\n    <defs>\n      <marker id=\"arrow-1210\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n    </defs>\n    <rect x=\"40\" y=\"60\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"125\" y=\"90\" text-anchor=\"middle\" class=\"svg-label\">Notebooks</text>\n    <text x=\"125\" y=\"112\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">CORP-SECURE</text>\n    <rect x=\"40\" y=\"170\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"125\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Visitantes</text>\n    <text x=\"125\" y=\"224\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">GUEST</text>\n    <rect x=\"40\" y=\"280\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"125\" y=\"312\" text-anchor=\"middle\" class=\"svg-label\">IoT</text>\n    <text x=\"125\" y=\"334\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IOT-RESTRICTED</text>\n    <rect x=\"290\" y=\"150\" width=\"170\" height=\"100\" rx=\"12\" class=\"svg-node\" />\n    <text x=\"375\" y=\"188\" text-anchor=\"middle\" class=\"svg-label\">APs</text>\n    <text x=\"375\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSID + RF</text>\n    <rect x=\"530\" y=\"150\" width=\"190\" height=\"100\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"625\" y=\"186\" text-anchor=\"middle\" class=\"svg-label\">Switch PoE</text>\n    <text x=\"625\" y=\"212\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Trunk VLANs</text>\n    <rect x=\"800\" y=\"60\" width=\"180\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"890\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">RADIUS/IAM/PKI</text>\n    <text x=\"890\" y=\"116\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">802.1X/EAP-TLS</text>\n    <rect x=\"800\" y=\"170\" width=\"180\" height=\"78\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"890\" y=\"202\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"890\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Zonas e políticas</text>\n    <rect x=\"1040\" y=\"60\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"1105\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Serviços</text>\n    <text x=\"1105\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Internos</text>\n    <rect x=\"1040\" y=\"190\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"1105\" y=\"222\" text-anchor=\"middle\" class=\"svg-label\">Internet</text>\n    <rect x=\"1040\" y=\"320\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"1105\" y=\"350\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n    <text x=\"1105\" y=\"372\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Logs</text>\n    <line x1=\"210\" y1=\"95\" x2=\"290\" y2=\"175\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"210\" y1=\"205\" x2=\"290\" y2=\"200\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"210\" y1=\"315\" x2=\"290\" y2=\"225\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"460\" y1=\"200\" x2=\"530\" y2=\"200\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"720\" y1=\"190\" x2=\"800\" y2=\"105\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"720\" y1=\"210\" x2=\"800\" y2=\"210\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"980\" y1=\"200\" x2=\"1040\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"980\" y1=\"220\" x2=\"1040\" y2=\"225\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"890\" y1=\"248\" x2=\"1040\" y2=\"350\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <line x1=\"890\" y1=\"138\" x2=\"1040\" y2=\"335\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-1210)\" />\n    <rect x=\"280\" y=\"430\" width=\"650\" height=\"120\" rx=\"16\" class=\"svg-zone svg-boundary\" />\n    <text x=\"605\" y=\"462\" text-anchor=\"middle\" class=\"svg-label\">Decisões obrigatórias</text>\n    <text x=\"605\" y=\"492\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">1 RF e capacidade  •  2 SSIDs mínimos  •  3 autenticação por risco</text>\n    <text x=\"605\" y=\"522\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4 VLANs e firewall  •  5 DHCP/DNS  •  6 logs  •  7 troubleshooting</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é um projeto guiado de arquitetura. Você não precisa comprar AP, criar SSID real nem tocar em rede de produção. O objetivo é produzir entregáveis profissionais: diagrama, tabela de SSIDs, matriz de acesso, plano de logs, checklist de validação e plano de troubleshooting.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios consolidam o raciocínio arquitetural: separar perfis, escolher autenticação, provar isolamento, pensar em logs e justificar custo operacional.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio final do módulo simula uma filial real. Ele exige que você use todo o Módulo 12 para desenhar uma WLAN segura e sustentavelmente operável.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra uma resposta possível e, principalmente, o raciocínio. Em arquitetura, respostas podem variar, mas decisões ruins normalmente têm o mesmo cheiro: rede plana, PSK compartilhado, guest lateral, IoT sem restrição, logs ausentes e troubleshooting sem método.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> Wi‑Fi seguro é arquitetura, não apenas criptografia.</li>\n    <li><strong>O que lembrar:</strong> autenticação identifica; firewall e segmentação autorizam; logs provam.</li>\n    <li><strong>Erro comum:</strong> usar SSID diferente como se fosse isolamento suficiente.</li>\n    <li><strong>Uso real:</strong> projeto WLAN precisa ser seguro, auditável, diagnosticável e financeiramente sustentável.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Com o Módulo 12 concluído, o próximo passo é o Módulo 13: Segurança de Redes. Lá você vai ampliar a visão de defesa em profundidade, segmentação, IDS/IPS, NDR, SIEM, Zero Trust, detecção e resposta. A rede Wi‑Fi desenhada aqui passa a ser uma das bordas a proteger dentro de uma arquitetura de segurança maior.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede",
      "Camada 4 - Transporte",
      "Camada 7 - Aplicação"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IEEE 802.11",
      "WPA2",
      "WPA3",
      "802.1X",
      "EAPOL",
      "RADIUS",
      "DHCP",
      "DNS",
      "802.1Q",
      "ICMP",
      "TCP",
      "UDP",
      "TLS",
      "Syslog"
    ],
    "dependsOn": [
      "RF",
      "SSID",
      "BSSID",
      "associação",
      "autenticação",
      "VLAN",
      "firewall",
      "RADIUS",
      "DHCP",
      "DNS"
    ],
    "enables": [
      "Wi‑Fi corporativo",
      "NAC",
      "Zero Trust na borda",
      "guest isolation",
      "SOC",
      "troubleshooting",
      "arquitetura segura"
    ]
  },
  "protocolFields": [
    {
      "field": "SSID",
      "size": "identificador textual",
      "purpose": "Representar a rede lógica apresentada ao usuário ou dispositivo.",
      "securityObservation": "SSIDs demais aumentam exposição, beacons, complexidade e risco de políticas inconsistentes."
    },
    {
      "field": "BSSID",
      "size": "48 bits",
      "purpose": "Identificar o rádio/AP específico que anuncia o SSID.",
      "securityObservation": "BSSID fora do inventário pode indicar rogue AP, vizinho, teste não documentado ou erro operacional."
    },
    {
      "field": "VLAN ID",
      "size": "12 bits no 802.1Q",
      "purpose": "Separar domínios de broadcast e aplicar política por segmento.",
      "securityObservation": "Mapeamento SSID-VLAN errado pode colocar visitante, IoT ou dispositivo pessoal dentro da rede interna."
    },
    {
      "field": "RADIUS attributes",
      "size": "variável",
      "purpose": "Transportar autorização, decisão de acesso, grupos e eventualmente VLAN dinâmica.",
      "securityObservation": "Atributos incorretos podem autorizar acesso excessivo ou negar usuários legítimos."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Seleciona SSID/BSSID",
      "detail": "O cliente enxerga beacons/probes e escolhe um AP conforme driver, sinal, política e histórico.",
      "possibleFailure": "Cliente escolhe AP distante, SSID errado ou BSSID não autorizado."
    },
    {
      "step": 2,
      "actor": "AP/controladora",
      "action": "Associa e aplica perfil WLAN",
      "detail": "O AP usa perfil de SSID, segurança, VLAN e políticas definidas na controladora.",
      "possibleFailure": "Perfil errado, VLAN ausente no trunk ou política aplicada ao SSID incorreto."
    },
    {
      "step": 3,
      "actor": "RADIUS/IAM/PKI",
      "action": "Autentica e autoriza",
      "detail": "Credenciais, certificados e postura do dispositivo podem definir acesso e VLAN.",
      "possibleFailure": "Certificado expirado, CA não confiável, grupo errado, servidor indisponível ou política NAC incorreta."
    },
    {
      "step": 4,
      "actor": "DHCP/DNS/Gateway",
      "action": "Entrega conectividade básica",
      "detail": "Cliente recebe IP, gateway e DNS compatíveis com o segmento autorizado.",
      "possibleFailure": "Escopo esgotado, relay incorreto, DNS bloqueado ou gateway errado."
    },
    {
      "step": 5,
      "actor": "Firewall/SIEM",
      "action": "Aplica controle e registra evidência",
      "detail": "Políticas entre zonas definem o que cada segmento pode acessar e geram logs úteis.",
      "possibleFailure": "Regra permissiva demais, regra ausente, log insuficiente ou exceções não documentadas."
    }
  ],
  "deepDive": {
    "mentalModel": "Projetar Wi‑Fi seguro é desenhar uma borda de acesso sem fio: RF define alcance e capacidade; SSID/BSSID definem entrada; WPA/802.1X definem confiança; VLAN/firewall definem autorização; logs definem auditabilidade; troubleshooting define sustentabilidade operacional.",
    "keyTerms": [
      "WLAN",
      "RF",
      "SSID",
      "BSSID",
      "ESS",
      "WPA Enterprise",
      "802.1X",
      "RADIUS",
      "VLAN",
      "NAC",
      "guest isolation",
      "WIDS/WIPS",
      "roaming",
      "baseline"
    ],
    "limitations": [
      "Wi‑Fi não substitui cabeamento para todos os casos; aplicações críticas podem exigir cabo, QoS, site survey e validação contínua.",
      "WPA3 não corrige arquitetura ruim, PSK compartilhado, VLAN errada ou firewall permissivo.",
      "Mais APs não significam automaticamente melhor Wi‑Fi; potência, canal e sobreposição precisam ser planejados.",
      "Rede guest isolada não é segura se possuir rota lateral para redes internas.",
      "Captive portal identifica aceitação de termo, mas não deve ser confundido com autenticação corporativa forte."
    ],
    "whenToUse": [
      "Quando a empresa precisa de mobilidade corporativa com autenticação forte.",
      "Quando visitantes precisam de internet sem acesso lateral à rede interna.",
      "Quando IoT precisa de conectividade controlada e monitorada.",
      "Quando o ambiente precisa de logs suficientes para SOC, auditoria e troubleshooting.",
      "Quando o Wi‑Fi é serviço crítico para operação, atendimento, logística ou colaboração."
    ],
    "whenNotToUse": [
      "Quando uma aplicação exige latência, estabilidade ou isolamento que só cabo dedicado consegue entregar no cenário específico.",
      "Quando não há capacidade operacional para monitorar RF, logs, RADIUS, DHCP, DNS e firewall.",
      "Quando o desenho depende de PSK único compartilhado com toda a empresa para acesso interno sensível.",
      "Quando a organização quer usar Wi‑Fi guest como extensão informal da rede corporativa."
    ],
    "operationalImpact": [
      "Exige documentação de SSIDs, VLANs, escopos DHCP, políticas de firewall e exceções.",
      "Exige processo para troca de certificados, onboarding/offboarding, atualização de firmware e revisão de clientes legados.",
      "Exige baseline de RF, logs de controladora, logs RADIUS, DHCP, DNS e firewall.",
      "Exige rotina de validação após mudança de layout físico, novas paredes, novos APs ou aumento de densidade."
    ],
    "financialImpact": [
      "APs corporativos, controladoras, licenças cloud, sensores, NAC, PKI, switches PoE e suporte podem gerar custo recorrente.",
      "Logs de WLAN, RADIUS, DHCP, DNS e firewall podem aumentar custo de armazenamento/SIEM.",
      "Site survey profissional reduz risco de retrabalho, mas tem custo inicial.",
      "Economizar em projeto pode sair caro em incidentes, produtividade perdida e troubleshooting permanente."
    ],
    "securityImpact": [
      "Segmentação reduz movimento lateral, mas só funciona se firewall, VLANs e autenticação estiverem coerentes.",
      "802.1X com certificado reduz risco de credencial compartilhada, mas exige PKI e gestão de ciclo de vida.",
      "Rede guest deve ser tratada como não confiável e isolada por padrão.",
      "Monitoramento de rogue AP e BSSID desconhecido melhora detecção, mas precisa inventário atualizado."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Criar um SSID para cada departamento sem necessidade.",
      "whyItHappens": "Parece simples separar redes pelo nome visível.",
      "consequence": "Aumenta beacons, complexidade, troubleshooting e risco de políticas divergentes.",
      "correction": "Usar poucos SSIDs e segmentar com VLAN dinâmica, grupos, NAC e firewall quando possível."
    },
    {
      "mistake": "Usar WPA2/WPA3-PSK compartilhado para rede corporativa interna.",
      "whyItHappens": "É mais fácil de implantar que 802.1X.",
      "consequence": "Senha vaza, ex-funcionários continuam tendo acesso e não há rastreabilidade por identidade.",
      "correction": "Preferir WPA Enterprise com 802.1X/EAP-TLS para dispositivos gerenciados."
    },
    {
      "mistake": "Achar que rede guest é segura só porque possui outro SSID.",
      "whyItHappens": "SSID diferente parece rede diferente.",
      "consequence": "Visitantes podem alcançar sistemas internos se VLAN/firewall/rotas estiverem errados.",
      "correction": "Isolar guest em VLAN/zona própria com saída controlada para internet e bloqueio lateral."
    },
    {
      "mistake": "Planejar cobertura olhando só barras de sinal.",
      "whyItHappens": "É a métrica mais visível para o usuário.",
      "consequence": "Pode haver SNR ruim, canal saturado, roaming ruim e baixa capacidade apesar de sinal alto.",
      "correction": "Medir RF, canal, SNR, utilização, densidade, roaming e experiência real."
    },
    {
      "mistake": "Não projetar logs antes do incidente.",
      "whyItHappens": "Logs parecem detalhe operacional até o primeiro war room.",
      "consequence": "Sem evidência, a equipe não prova causa, impacto nem correção.",
      "correction": "Definir desde o projeto quais eventos vão para SIEM e como correlacionar usuário, dispositivo, AP, SSID, VLAN e IP."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Usuários conectam mas não recebem IP",
      "Clientes corporativos falham no 802.1X",
      "Visitantes acessam internet mas não captive portal",
      "IoT perde conexão após roaming",
      "Videochamada cai em salas específicas",
      "BSSID desconhecido aparece com SSID parecido"
    ],
    "diagnosticQuestions": [
      "O problema é de RF, associação, autenticação, DHCP, DNS, rota, firewall ou aplicação?",
      "Quais SSID, BSSID, AP, canal, banda, RSSI e SNR estão envolvidos?",
      "O usuário autenticou via RADIUS? Recebeu VLAN esperada?",
      "O cliente recebeu IP, gateway e DNS da rede correta?",
      "O firewall registrou bloqueio ou ausência de tráfego?",
      "Existe mudança recente de layout, firmware, política, certificado, DHCP ou DNS?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces\nnetsh wlan show networks mode=bssid\nipconfig /all\nroute print\nnslookup intranet.empresa.local",
        "purpose": "Coletar SSID, BSSID, rádio, sinal, IP, gateway, DNS e rota.",
        "expectedObservation": "Cliente associado ao SSID/BSSID correto, com IP e DNS da VLAN esperada.",
        "interpretation": "Se BSSID está correto mas IP está errado, investigar VLAN/DHCP; se IP está certo mas nomes falham, investigar DNS."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show wlanreport",
        "purpose": "Gerar relatório histórico de sessões WLAN para análise de desconexões e falhas.",
        "expectedObservation": "Relatório HTML com eventos de conexão, desconexão e falhas.",
        "interpretation": "Útil para linha do tempo e correlação com logs de controladora/RADIUS."
      },
      {
        "platform": "Linux",
        "command": "nmcli -f IN-USE,SSID,BSSID,CHAN,FREQ,RATE,SIGNAL,SECURITY dev wifi list\niw dev\nip addr\nip route\nresolvectl status",
        "purpose": "Coletar redes vistas, BSSID, canal, frequência, segurança, IP, rota e DNS.",
        "expectedObservation": "Rede em uso marcada, BSSID esperado e configuração IP coerente.",
        "interpretation": "Permite separar problema wireless de problema IP/DNS."
      },
      {
        "platform": "Cisco IOS / WLC",
        "command": "show wlan summary\nshow client summary\nshow wireless client mac-address <MAC> detail\nshow logging | include <MAC>",
        "purpose": "Validar SSIDs, clientes, AP, política, autenticação, VLAN e eventos.",
        "expectedObservation": "Cliente associado/autenticado na WLAN esperada e com política correta.",
        "interpretation": "Se o cliente falha antes de DHCP, olhar associação/autenticação; se autentica, olhar VLAN/DHCP/firewall."
      },
      {
        "platform": "Wireshark",
        "command": "wlan.fc.type_subtype == 8 or eapol or bootp or dns",
        "purpose": "Filtro defensivo para beacons, EAPOL, DHCP e DNS em captura autorizada.",
        "expectedObservation": "Evidências de anúncio, autenticação, endereço IP e resolução de nomes.",
        "interpretation": "Ajuda a visualizar onde o fluxo para, sem coletar credenciais ou atacar redes."
      }
    ],
    "decisionTree": [
      {
        "if": "SSID não aparece",
        "then": "Validar RF, banda suportada, potência, canal, AP ativo, ocultação de SSID e compatibilidade do cliente."
      },
      {
        "if": "SSID aparece mas não associa",
        "then": "Validar perfil do cliente, compatibilidade, BSSID, logs de AP e política WLAN."
      },
      {
        "if": "Associa mas 802.1X falha",
        "then": "Validar RADIUS, certificado, CA, método EAP, grupo, MDM/NAC e logs de identidade."
      },
      {
        "if": "Autentica mas não recebe IP",
        "then": "Validar VLAN, trunk, DHCP scope, relay, ACL e logs DHCP."
      },
      {
        "if": "Recebe IP mas não navega",
        "then": "Validar DNS, gateway, rota, firewall, proxy, captive portal e aplicação."
      },
      {
        "if": "BSSID desconhecido anuncia SSID corporativo",
        "then": "Tratar como investigação de rogue/evil twin até provar que é AP autorizado ou vizinho benigno."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar WPA Enterprise com 802.1X/EAP-TLS para dispositivos corporativos gerenciados.",
      "Separar funcionários, visitantes e IoT em segmentos com políticas diferentes.",
      "Manter inventário de APs, BSSIDs, SSIDs, VLANs, escopos DHCP e responsáveis.",
      "Enviar logs de controladora, RADIUS, DHCP, DNS e firewall para SIEM quando aplicável.",
      "Habilitar PMF quando compatível e avaliar modo de transição com cuidado.",
      "Planejar rede guest como zona não confiável com acesso mínimo e saída controlada."
    ],
    "badPractices": [
      "Liberar PSK compartilhado para rede interna sensível.",
      "Colocar guest, IoT e funcionários na mesma VLAN.",
      "Criar muitos SSIDs sem justificativa técnica.",
      "Desabilitar validação de certificado para resolver erro 802.1X.",
      "Usar firewall any-any entre VLANs wireless e datacenter.",
      "Não documentar exceções temporárias."
    ],
    "commonErrors": [
      "Confundir autenticação com autorização.",
      "Confundir SSID separado com segmentação real.",
      "Confundir sinal forte com experiência boa.",
      "Confundir captive portal com segurança corporativa forte.",
      "Achar que Wi‑Fi moderno elimina a necessidade de firewall interno."
    ],
    "vulnerabilities": [
      {
        "name": "Rede plana wireless",
        "description": "Todos os clientes wireless ficam no mesmo segmento e alcançam ativos internos sem controle suficiente.",
        "defensiveExplanation": "Um incidente em notebook, celular ou IoT pode se transformar em exposição lateral.",
        "mitigation": "Segmentação, firewall interno, NAC, logs, menor privilégio e revisão periódica."
      },
      {
        "name": "PSK compartilhado",
        "description": "Uma única senha dá acesso a muitos usuários e dispositivos.",
        "defensiveExplanation": "Quando vaza, é difícil saber quem usou e custoso rotacionar sem impacto.",
        "mitigation": "Migrar para WPA Enterprise/802.1X, usar identidade, certificados e processo de offboarding."
      },
      {
        "name": "Evil twin / SSID imitador",
        "description": "Um SSID visualmente semelhante pode enganar usuários ou dispositivos mal configurados.",
        "defensiveExplanation": "O risco aumenta quando clientes não validam certificado do servidor 802.1X.",
        "mitigation": "EAP-TLS, validação de certificado, treinamento, WIDS/WIPS e inventário de BSSIDs."
      },
      {
        "name": "Guest mal isolado",
        "description": "Visitantes recebem acesso além da internet ou conseguem alcançar redes internas.",
        "defensiveExplanation": "A separação visual por SSID não basta se roteamento/firewall permitir lateralidade.",
        "mitigation": "VLAN/zona guest própria, firewall deny-by-default, DNS controlado e logs."
      }
    ],
    "monitoring": [
      "Novos BSSIDs com SSID corporativo",
      "Falhas 802.1X por motivo",
      "Mudanças de VLAN dinâmica",
      "Clientes em VLAN inesperada",
      "DHCP starvation ou escopo esgotado",
      "Acesso lateral a partir de guest/IoT",
      "Picos de deauth/disassoc",
      "Roaming anormal por área"
    ],
    "hardening": [
      "Atualizar firmware de APs/controladora",
      "Usar senhas administrativas fortes e MFA na gestão",
      "Segregar plano de gerenciamento",
      "Restringir trunks de AP às VLANs necessárias",
      "Desabilitar SSIDs legados",
      "Auditar exceções de firewall",
      "Validar certificados 802.1X",
      "Revisar logs e retenção"
    ],
    "detectionIdeas": [
      "Comparar inventário de BSSIDs com varreduras autorizadas",
      "Correlacionar usuário-dispositivo-SSID-BSSID-IP-VLAN",
      "Alertar falhas 802.1X por pico",
      "Alertar tráfego de guest para RFC1918 interno",
      "Alertar dispositivos IoT tentando destinos não previstos"
    ]
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um projeto Wi‑Fi seguro não pode começar apenas pela pergunta ‘quantos APs preciso?’",
      "hints": [
        "Pense em identidade, VLAN, firewall, logs e usuários diferentes.",
        "Cobertura não é o mesmo que autorização."
      ],
      "expectedIdeas": [
        "RF",
        "capacidade",
        "segmentação",
        "autenticação",
        "operação",
        "segurança"
      ],
      "explanation": "A quantidade de APs é consequência do desenho. Antes dela, é preciso entender quem acessa, o que acessa, como autentica, qual risco aceita e como será diagnosticado."
    },
    {
      "type": "diagnóstico",
      "question": "Um visitante conectado ao SSID guest consegue pingar um servidor interno. Qual hipótese deve ser testada primeiro?",
      "hints": [
        "SSID diferente não garante isolamento.",
        "Pense em VLAN, rota e firewall."
      ],
      "expectedIdeas": [
        "VLAN guest",
        "política firewall",
        "rota",
        "ACL",
        "NAT",
        "segmentação"
      ],
      "explanation": "A suspeita inicial é falha de segmentação ou firewall. O diagnóstico deve validar IP/VLAN do visitante, gateway, rota e regras entre zonas."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa quer migrar de PSK compartilhado para 802.1X sem derrubar operação. Como você faria por fases?",
      "hints": [
        "Pense em piloto, certificados, grupo de usuários, logs e rollback.",
        "Não migre IoT e notebook corporativo do mesmo jeito."
      ],
      "expectedIdeas": [
        "piloto",
        "EAP-TLS",
        "PKI",
        "MDM",
        "NAC",
        "VLAN dinâmica",
        "monitoramento",
        "rollback"
      ],
      "explanation": "A migração precisa mapear dispositivos, preparar PKI/MDM/RADIUS, testar grupos pequenos, manter SSID temporário controlado e medir falhas antes de expandir."
    }
  ],
  "quiz": [
    {
      "id": "q12.10.1",
      "type": "arquitetura",
      "q": "Qual decisão melhor representa um desenho Wi‑Fi corporativo seguro para notebooks gerenciados?",
      "opts": [
        "Um SSID interno com PSK compartilhado por todos",
        "WPA Enterprise com 802.1X/EAP-TLS, logs e política por identidade",
        "SSID aberto oculto com firewall desligado",
        "Rede guest com acesso total ao datacenter"
      ],
      "a": 1,
      "exp": "WPA Enterprise com 802.1X/EAP-TLS permite autenticação forte, rastreabilidade e integração com IAM/PKI/NAC.",
      "difficulty": "intermediário",
      "topic": "802.1X"
    },
    {
      "id": "q12.10.2",
      "type": "segurança",
      "q": "Por que SSID separado não garante isolamento?",
      "opts": [
        "Porque SSID nunca aparece em beacons",
        "Porque isolamento real depende de VLAN, roteamento, firewall e políticas",
        "Porque todo SSID usa a mesma senha automaticamente",
        "Porque BSSID não existe em Wi‑Fi corporativo"
      ],
      "a": 1,
      "exp": "SSID é a rede lógica apresentada ao cliente; isolamento efetivo depende do caminho depois do AP: VLAN, gateway, firewall, ACLs e políticas.",
      "difficulty": "intermediário",
      "topic": "segmentação"
    },
    {
      "id": "q12.10.3",
      "type": "diagnóstico",
      "q": "Um cliente autentica via 802.1X, mas recebe IP de VLAN guest. O que investigar primeiro?",
      "opts": [
        "Trocar canal RF",
        "Atributos RADIUS/VLAN dinâmica e mapeamento de política",
        "Aumentar potência de todos os APs",
        "Desligar DNS"
      ],
      "a": 1,
      "exp": "Se a autenticação ocorre, mas a VLAN é errada, a hipótese forte é autorização/mapeamento, atributos RADIUS ou política NAC/controladora.",
      "difficulty": "avançado",
      "topic": "RADIUS"
    },
    {
      "id": "q12.10.4",
      "type": "operação",
      "q": "Qual item torna uma WLAN mais diagnosticável?",
      "opts": [
        "Não coletar logs para reduzir custo",
        "Ter inventário de SSIDs, BSSIDs, VLANs, escopos DHCP e políticas",
        "Usar a mesma VLAN para tudo",
        "Desabilitar 802.1X em incidentes"
      ],
      "a": 1,
      "exp": "Inventário e logs permitem correlacionar cliente, AP, SSID, VLAN, IP, autenticação e política.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q12.10.5",
      "type": "rf",
      "q": "Qual afirmação é mais correta sobre cobertura e capacidade?",
      "opts": [
        "Sinal cheio sempre significa rede rápida",
        "Cobertura e capacidade são dimensões diferentes do projeto RF",
        "Adicionar AP sempre melhora o ambiente",
        "Canais largos sempre reduzem interferência"
      ],
      "a": 1,
      "exp": "Cobertura indica alcance; capacidade envolve airtime, densidade, canais, interferência, clientes e aplicações.",
      "difficulty": "intermediário",
      "topic": "RF"
    },
    {
      "id": "q12.10.6",
      "type": "segurança",
      "q": "Qual é uma boa prática para rede guest?",
      "opts": [
        "Permitir acesso lateral para facilitar suporte",
        "Colocar guest na VLAN interna",
        "Isolar em zona própria com saída controlada para internet e logs",
        "Usar guest como fallback de notebooks corporativos"
      ],
      "a": 2,
      "exp": "Guest deve ser zona não confiável, com acesso mínimo, bloqueio lateral e rastreabilidade suficiente.",
      "difficulty": "iniciante-intermediário",
      "topic": "guest"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.10.1",
      "front": "Qual é a diferença entre SSID e segmentação?",
      "back": "SSID é o nome/rede lógica apresentada ao cliente; segmentação real depende de VLAN, roteamento, firewall e políticas.",
      "tags": [
        "ssid",
        "segmentação"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.10.2",
      "front": "Por que WPA Enterprise é preferível para rede corporativa interna?",
      "back": "Porque usa identidade, 802.1X/EAP e pode integrar certificados, RADIUS, grupos, VLAN dinâmica e logs por usuário/dispositivo.",
      "tags": [
        "wpa enterprise",
        "802.1x"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.10.3",
      "front": "O que deve existir no inventário wireless?",
      "back": "SSIDs, BSSIDs, APs, localização, VLANs, escopos DHCP, políticas, responsáveis, firmware e integrações de logs.",
      "tags": [
        "inventário",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.10.4",
      "front": "Qual é o risco de PSK compartilhado?",
      "back": "Dificulta rastreabilidade, offboarding e rotação; se vazar, muitos dispositivos podem acessar a rede.",
      "tags": [
        "psk",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.10.5",
      "front": "O que é Wi‑Fi diagnosticável?",
      "back": "É uma WLAN projetada com logs, inventário, baseline e comandos que permitem saber onde a falha ocorre: RF, associação, autenticação, DHCP, DNS, firewall ou aplicação.",
      "tags": [
        "troubleshooting",
        "logs"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.10.6",
      "front": "Qual é o papel do firewall em Wi‑Fi corporativo?",
      "back": "Aplicar autorização entre zonas/segmentos após a autenticação, impedindo que conectividade vire acesso irrestrito.",
      "tags": [
        "firewall",
        "vlan"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.10.1",
      "type": "arquitetura",
      "prompt": "Uma empresa possui funcionários, visitantes e câmeras IoT. Proponha SSIDs e segmentos mínimos.",
      "expectedAnswer": "Um SSID corporativo com WPA Enterprise/802.1X para funcionários, um SSID guest isolado para visitantes e um SSID/segmento IoT restrito para câmeras, cada um em VLAN/zona própria com firewall deny-by-default.",
      "explanation": "O objetivo é separar confiança, identidade e padrões de tráfego. Funcionários, visitantes e IoT têm riscos diferentes."
    },
    {
      "id": "ex12.10.2",
      "type": "segurança",
      "prompt": "Liste três evidências que você coletaria para investigar suspeita de evil twin sem executar ataque.",
      "expectedAnswer": "Inventário de BSSIDs autorizados, varredura passiva/autorizada de SSIDs/BSSIDs/canais, logs da controladora/WIDS/WIPS e relatos de certificado inválido em 802.1X.",
      "explanation": "A investigação é defensiva: identificar anúncio suspeito, comparar com inventário e correlacionar logs."
    },
    {
      "id": "ex12.10.3",
      "type": "diagnóstico",
      "prompt": "Um cliente no SSID corporativo autentica, recebe IP, mas não acessa sistema interno. Qual sequência de teste você usaria?",
      "expectedAnswer": "Validar IP/VLAN/gateway, testar gateway, testar DNS interno, testar rota/porta com Test-NetConnection ou curl, verificar firewall e logs da aplicação.",
      "explanation": "Após autenticação e IP, o foco passa para DNS, rota, firewall, proxy/TLS e aplicação."
    },
    {
      "id": "ex12.10.4",
      "type": "financeiro-operacional",
      "prompt": "Explique por que reduzir custo comprando AP doméstico para empresa pode sair caro.",
      "expectedAnswer": "Pode faltar 802.1X robusto, logs, controle centralizado, WIDS/WIPS, VLAN por SSID, firmware corporativo, suporte, visibilidade e escalabilidade, aumentando risco de incidente e tempo de troubleshooting.",
      "explanation": "O custo total inclui operação, segurança, suporte, auditoria e indisponibilidade, não apenas preço do equipamento."
    }
  ],
  "lab": {
    "id": "lab-12.10",
    "title": "Projeto completo de Wi‑Fi corporativo seguro e diagnosticável",
    "labType": "security",
    "objective": "Criar uma arquitetura WLAN completa com SSIDs, VLANs, autenticação, firewall, guest, IoT, logs, validação e plano de troubleshooting.",
    "scenario": "Uma empresa com 120 funcionários, 20 visitantes por dia, 30 dispositivos IoT, duas salas de reunião críticas e um pequeno SOC precisa redesenhar o Wi‑Fi. A rede atual usa um PSK compartilhado, guest mal isolado e não possui inventário de BSSIDs. O objetivo é propor uma arquitetura segura e operável sem executar nenhum ataque.",
    "topology": "Clientes corporativos e móveis -> APs corporativos -> switch PoE trunk -> controladora/cloud management -> firewall -> serviços internos, internet, RADIUS/IAM/PKI, DHCP, DNS, SIEM.",
    "architecture": "WLAN com SSID corporativo 802.1X/EAP-TLS, SSID guest isolado, SSID IoT restrito, VLAN de gerenciamento, firewall deny-by-default entre zonas, logs centralizados e checklist de RF/troubleshooting.",
    "prerequisites": [
      "Concluir aulas 12.1 a 12.9.",
      "Conhecer VLANs, DHCP, DNS, firewall e 802.1X em nível conceitual.",
      "Ter editor de texto ou planilha para documentar matriz de acesso.",
      "Opcional: Cisco Packet Tracer ou ferramenta de desenho para topologia."
    ],
    "tools": [
      "Editor de texto",
      "Planilha",
      "Opcional: draw.io offline, Packet Tracer ou ferramenta de desenho",
      "Windows PowerShell ou terminal Linux para exemplos de validação",
      "Checklist do curso"
    ],
    "estimatedTimeMinutes": 210,
    "cost": "zero",
    "safetyNotes": [
      "Não crie redes imitadoras de SSID corporativo real.",
      "Não execute deauth, captura de credenciais, força bruta ou varredura em redes de terceiros.",
      "O laboratório é de arquitetura, documentação e validação defensiva.",
      "Use dados fictícios e ambiente autorizado."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir perfis de usuários e dispositivos",
        "instruction": "Liste grupos que usarão Wi‑Fi: funcionários, visitantes, IoT, TI/administração e dispositivos pessoais.",
        "command": "Documento: perfis = funcionarios, visitantes, iot, administracao, byod",
        "expectedOutput": "Lista de perfis com nível de confiança, necessidade de acesso e risco.",
        "explanation": "Arquitetura começa por quem acessa e o que precisa acessar, não por APs."
      },
      {
        "number": 2,
        "title": "Definir SSIDs mínimos",
        "instruction": "Proponha poucos SSIDs, evitando um SSID por departamento sem necessidade.",
        "command": "Tabela: SSID | público | autenticação | VLAN | objetivo | risco",
        "expectedOutput": "Exemplo: CORP-SECURE, GUEST-INTERNET, IOT-RESTRICTED.",
        "explanation": "Poucos SSIDs reduzem overhead, complexidade e erro operacional."
      },
      {
        "number": 3,
        "title": "Definir autenticação por SSID",
        "instruction": "Escolha método de autenticação adequado para cada SSID.",
        "command": "CORP-SECURE = WPA Enterprise/EAP-TLS\nGUEST-INTERNET = captive portal ou PSK rotativo isolado\nIOT-RESTRICTED = PSK individual/PPSK/MAB/NAC conforme capacidade",
        "expectedOutput": "Método coerente com risco e capacidade dos dispositivos.",
        "explanation": "Nem todo dispositivo suporta 802.1X, mas isso não justifica rede plana."
      },
      {
        "number": 4,
        "title": "Criar matriz de segmentação",
        "instruction": "Defina VLANs/zonas e quais destinos cada uma pode acessar.",
        "command": "Tabela: origem | destino | portas | decisão | log | justificativa",
        "expectedOutput": "Guest apenas internet; IoT apenas servidores necessários; corp acesso controlado a serviços internos.",
        "explanation": "Autenticação responde quem é; firewall responde o que pode acessar."
      },
      {
        "number": 5,
        "title": "Planejar serviços de rede",
        "instruction": "Defina DHCP, DNS, gateway e logs por segmento.",
        "command": "Tabela: VLAN | CIDR | DHCP | DNS | gateway | logs",
        "expectedOutput": "Cada VLAN possui escopo, gateway e DNS coerentes.",
        "explanation": "Muitos incidentes de Wi‑Fi ocorrem depois da associação, em DHCP/DNS/gateway."
      },
      {
        "number": 6,
        "title": "Planejar RF e capacidade",
        "instruction": "Documente critérios de banda, canal, largura de canal, densidade e salas críticas.",
        "command": "Checklist RF: bandas, canais, largura, SNR alvo, áreas críticas, roaming, capacidade",
        "expectedOutput": "Plano conceitual de cobertura e capacidade com validação posterior por site survey.",
        "explanation": "RF ruim derruba a experiência mesmo quando autenticação e firewall estão corretos."
      },
      {
        "number": 7,
        "title": "Definir logs e evidências",
        "instruction": "Liste eventos que precisam ir para SIEM ou repositório de logs.",
        "command": "Eventos: associação, autenticação RADIUS, VLAN atribuída, DHCP lease, DNS, firewall deny/allow, rogue AP",
        "expectedOutput": "Plano de observabilidade wireless com correlação por usuário, MAC, IP, SSID, BSSID e VLAN.",
        "explanation": "Sem logs, não há RCA confiável."
      },
      {
        "number": 8,
        "title": "Criar checklist de validação",
        "instruction": "Monte testes para cada SSID e segmento.",
        "command": "Teste: associar, autenticar, receber IP, resolver DNS, acessar permitido, bloquear proibido, validar logs",
        "expectedOutput": "Checklist com resultado esperado e evidência a coletar.",
        "explanation": "Projeto seguro precisa provar tanto o acesso permitido quanto o bloqueio esperado."
      },
      {
        "number": 9,
        "title": "Criar plano de troubleshooting",
        "instruction": "Defina ordem de investigação para incidentes comuns.",
        "command": "Fluxo: RF -> associação -> autenticação -> DHCP -> DNS -> rota -> firewall -> aplicação",
        "expectedOutput": "Playbook curto para suporte, redes e segurança.",
        "explanation": "A operação precisa saber diagnosticar sem relaxar controles."
      },
      {
        "number": 10,
        "title": "Produzir entregáveis finais",
        "instruction": "Consolide diagrama, matriz de acesso, checklist, plano de logs, riscos e mitigação.",
        "command": "Entregáveis: diagrama.svg/ou textual, matriz.csv, checklist.md, riscos.md, troubleshooting.md",
        "expectedOutput": "Pacote de arquitetura revisável por redes, segurança, IAM e operação.",
        "explanation": "A qualidade do projeto aparece na clareza das decisões e na capacidade de operar depois."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um desenho completo de WLAN corporativa com SSIDs, VLANs, autenticação, políticas, logs, checklist de validação e plano de troubleshooting.",
    "validation": [
      {
        "check": "Cada SSID tem objetivo claro",
        "command": "Revisar tabela SSID | público | autenticação | VLAN | objetivo",
        "expected": "Nenhum SSID existe sem justificativa.",
        "ifFails": "Remova ou consolide SSIDs redundantes."
      },
      {
        "check": "Guest não acessa rede interna",
        "command": "Revisar matriz origem=guest destino=RFC1918 interno",
        "expected": "Bloqueado por padrão, salvo exceção documentada.",
        "ifFails": "Corrigir firewall/rotas e registrar logs de bloqueio."
      },
      {
        "check": "Corporativo usa autenticação forte",
        "command": "Revisar CORP-SECURE",
        "expected": "WPA Enterprise/802.1X, preferencialmente EAP-TLS para dispositivos gerenciados.",
        "ifFails": "Planejar migração por fases com PKI/MDM/RADIUS."
      },
      {
        "check": "IoT tem acesso mínimo",
        "command": "Revisar origem=IOT destino=serviços necessários",
        "expected": "Apenas destinos e portas justificadas.",
        "ifFails": "Aplicar deny-by-default e liberar exceções por necessidade."
      },
      {
        "check": "Há plano de logs",
        "command": "Revisar eventos de controladora, RADIUS, DHCP, DNS e firewall",
        "expected": "Eventos suficientes para RCA.",
        "ifFails": "Adicionar origem de log, retenção e correlação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Cliente corporativo associa mas falha login",
        "probableCause": "Falha 802.1X, certificado, RADIUS, grupo, MDM ou política NAC.",
        "howToConfirm": "Ver logs RADIUS/controladora e relatório do cliente.",
        "fix": "Corrigir certificado/política, não desabilitar 802.1X como solução permanente."
      },
      {
        "symptom": "Guest acessa servidor interno",
        "probableCause": "VLAN/rota/firewall incorreto ou regra permissiva.",
        "howToConfirm": "Validar IP do guest, rota, traceroute e logs de firewall.",
        "fix": "Isolar zona guest, bloquear RFC1918 interno e registrar deny."
      },
      {
        "symptom": "IoT perde conectividade após mudança",
        "probableCause": "VLAN, PSK, política NAC, DHCP ou firewall alterado sem validação.",
        "howToConfirm": "Ver logs por MAC, DHCP lease, firewall e AP.",
        "fix": "Restaurar política mínima necessária e documentar exceção."
      },
      {
        "symptom": "Usuários reclamam em salas de reunião",
        "probableCause": "RF, roaming, airtime, interferência ou capacidade insuficiente.",
        "howToConfirm": "Coletar BSSID, RSSI, SNR, canal, utilização e teste de aplicação.",
        "fix": "Ajustar RF com evidência, canal, potência, APs e validação de roaming."
      }
    ],
    "improvements": [
      "Adicionar site survey profissional",
      "Adicionar WIDS/WIPS ou sensores dedicados",
      "Migrar PSK legado para 802.1X/EAP-TLS",
      "Automatizar inventário de BSSID",
      "Criar dashboard de falhas 802.1X, DHCP e roaming",
      "Testar PMF e WPA3 em piloto"
    ],
    "evidenceToCollect": [
      "Diagrama lógico",
      "Tabela de SSIDs",
      "Matriz de acesso",
      "Plano de DHCP/DNS",
      "Plano de logs",
      "Checklist de validação",
      "Lista de riscos e mitigação",
      "Plano de migração"
    ],
    "questions": [
      "Qual SSID tem maior risco?",
      "Que evidência provaria isolamento guest?",
      "Como offboarding remove acesso Wi‑Fi?",
      "Que logs permitem correlacionar usuário, dispositivo, IP e BSSID?",
      "Que exceções precisam expirar?"
    ],
    "challenge": "Desenhe a WLAN de uma filial com funcionários, visitantes, IoT e sala de reunião crítica, usando no máximo três SSIDs e garantindo isolamento, logs e troubleshooting.",
    "solution": "Uma solução forte usa CORP-SECURE com WPA Enterprise/EAP-TLS e VLAN dinâmica ou corporativa, GUEST-INTERNET isolado com saída apenas à internet, IOT-RESTRICTED com acesso mínimo a serviços necessários, firewall deny-by-default entre zonas, DHCP/DNS por segmento, logs de controladora/RADIUS/DHCP/DNS/firewall no SIEM e checklist de validação para acesso permitido e bloqueado."
  },
  "challenge": {
    "title": "Projeto de Wi‑Fi seguro para filial corporativa",
    "scenario": "Uma filial terá 80 funcionários, visitantes diários, impressoras, câmeras, coletores IoT e duas salas de reunião usadas para videoconferência com diretoria. A rede atual possui um SSID único com PSK compartilhado e reclamações de lentidão.",
    "tasks": [
      "Definir até três SSIDs",
      "Definir VLANs/zonas",
      "Escolher autenticação por perfil",
      "Criar matriz de acesso",
      "Definir logs",
      "Criar checklist de validação",
      "Listar riscos e mitigação"
    ],
    "constraints": [
      "Visitantes não podem acessar redes internas",
      "IoT só pode acessar serviços necessários",
      "Funcionários devem usar autenticação individual",
      "Mudança precisa permitir migração gradual",
      "A solução deve ser diagnosticável"
    ],
    "expectedDeliverables": [
      "Diagrama",
      "Tabela SSID-VLAN-autenticação",
      "Matriz de firewall",
      "Plano DHCP/DNS",
      "Plano de logs",
      "Checklist de testes",
      "RCA modelo para falha comum"
    ],
    "gradingRubric": [
      {
        "criterion": "Segmentação",
        "points": 20,
        "description": "Separa corretamente funcionários, guest e IoT com políticas entre zonas."
      },
      {
        "criterion": "Autenticação",
        "points": 20,
        "description": "Usa método coerente com risco e capacidade dos dispositivos."
      },
      {
        "criterion": "Operação",
        "points": 20,
        "description": "Inclui logs, inventário, checklist e troubleshooting."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "Evita PSK compartilhado interno, rede plana e guest com lateralidade."
      },
      {
        "criterion": "Clareza",
        "points": 20,
        "description": "Entregáveis são compreensíveis por redes, segurança, IAM e gestão."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução começa separando perfis de confiança. Funcionário gerenciado pode usar 802.1X/EAP-TLS; visitante deve ser não confiável; IoT deve ser restrito porque costuma ter ciclo de vida e segurança piores. Depois conectamos isso a VLANs, firewall, DHCP, DNS, logs e troubleshooting.",
    "steps": [
      "Listar perfis e riscos",
      "Reduzir SSIDs ao mínimo funcional",
      "Escolher autenticação por perfil",
      "Definir VLANs e zonas",
      "Criar matriz deny-by-default",
      "Definir DHCP/DNS/gateway por segmento",
      "Definir logs e correlação",
      "Criar testes de acesso permitido e bloqueado",
      "Planejar migração e rollback"
    ],
    "commonWrongAnswers": [
      {
        "answer": "Um SSID único com PSK forte para todos.",
        "whyItIsWrong": "A senha pode vazar, não há identidade individual, guest e IoT ficam próximos demais da rede interna e o offboarding é fraco."
      },
      {
        "answer": "Um SSID diferente para cada departamento.",
        "whyItIsWrong": "Aumenta overhead e complexidade sem necessariamente melhorar autorização; políticas podem ser melhor tratadas por identidade/VLAN dinâmica/firewall."
      },
      {
        "answer": "Guest com acesso a servidores internos para facilitar reuniões.",
        "whyItIsWrong": "Visitantes são não confiáveis por padrão; qualquer exceção deve ser muito específica, temporária e monitorada."
      },
      {
        "answer": "Desabilitar validação de certificado para evitar chamados.",
        "whyItIsWrong": "Remove proteção crítica contra SSIDs imitadores e autenticação em servidor indevido."
      }
    ],
    "finalAnswer": "Projeto recomendado: CORP-SECURE com WPA Enterprise/EAP-TLS, integração RADIUS/IAM/PKI e VLAN corporativa ou dinâmica; GUEST-INTERNET em VLAN/zona isolada com saída à internet e bloqueio a redes internas; IOT-RESTRICTED com autenticação compatível, inventário por MAC/certificado quando possível e acesso apenas a serviços necessários; firewall deny-by-default entre zonas; DHCP/DNS por segmento; logs de controladora, RADIUS, DHCP, DNS e firewall; inventário de BSSIDs; checklist de RF, autenticação, IP, DNS, política e aplicação."
  },
  "glossary": [
    {
      "term": "WLAN segura",
      "shortDefinition": "Rede local sem fio projetada com autenticação, segmentação, política, logs e operação.",
      "longDefinition": "Não é apenas Wi‑Fi com senha. É uma arquitetura que combina RF, SSID/BSSID, WPA/802.1X, VLANs, firewall, DHCP, DNS, logs e troubleshooting.",
      "example": "SSID corporativo com 802.1X, VLAN controlada e logs no SIEM.",
      "relatedTerms": [
        "Wi‑Fi",
        "802.1X",
        "VLAN",
        "firewall"
      ],
      "relatedLessons": [
        "12.1",
        "12.5",
        "12.7",
        "12.9"
      ]
    },
    {
      "term": "Matriz de acesso",
      "shortDefinition": "Tabela que define origem, destino, portas, decisão e justificativa.",
      "longDefinition": "Documento usado para transformar segmentação em política auditável, evitando regras any-any sem razão.",
      "example": "Guest -> internet TCP/443 permitido; Guest -> rede interna bloqueado.",
      "relatedTerms": [
        "firewall",
        "ACL",
        "segmentação"
      ],
      "relatedLessons": [
        "9.x",
        "12.7",
        "13.2"
      ]
    },
    {
      "term": "Guest isolation",
      "shortDefinition": "Isolamento de visitantes em zona própria com acesso limitado.",
      "longDefinition": "Conjunto de VLAN, firewall, NAT, DNS e políticas que impedem visitantes de acessar redes internas ou outros clientes indevidamente.",
      "example": "Visitantes acessam somente internet e captive portal.",
      "relatedTerms": [
        "guest",
        "VLAN",
        "firewall"
      ],
      "relatedLessons": [
        "12.7",
        "12.8",
        "13.2"
      ]
    },
    {
      "term": "Baseline wireless",
      "shortDefinition": "Estado esperado de RF, clientes, APs, autenticação e tráfego.",
      "longDefinition": "Serve como comparação para identificar mudanças anormais em sinal, canal, roaming, falhas 802.1X, DHCP e tráfego.",
      "example": "Taxa normal de falhas 802.1X por hora e SNR típico por área.",
      "relatedTerms": [
        "troubleshooting",
        "observabilidade"
      ],
      "relatedLessons": [
        "12.2",
        "12.9",
        "15.2"
      ]
    },
    {
      "term": "VLAN dinâmica",
      "shortDefinition": "VLAN atribuída no momento da autenticação com base em política.",
      "longDefinition": "Pode usar RADIUS/NAC/IAM para colocar usuários ou dispositivos em segmentos diferentes mesmo usando o mesmo SSID.",
      "example": "Funcionário comum e administrador entram no mesmo SSID, mas recebem VLANs diferentes.",
      "relatedTerms": [
        "RADIUS",
        "NAC",
        "802.1X"
      ],
      "relatedLessons": [
        "12.5",
        "12.7"
      ]
    },
    {
      "term": "Wi‑Fi diagnosticável",
      "shortDefinition": "WLAN projetada para permitir investigação rápida por evidência.",
      "longDefinition": "Inclui inventário, logs, correlação, checklist, baseline e comandos para separar RF, associação, autenticação, IP, DNS, firewall e aplicação.",
      "example": "Um chamado informa usuário, MAC, AP, BSSID, VLAN, IP, RADIUS e logs de firewall.",
      "relatedTerms": [
        "RCA",
        "logs",
        "SIEM"
      ],
      "relatedLessons": [
        "12.9",
        "15.1",
        "15.12"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Guidelines for Securing Wireless Local Area Networks (WLANs)",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/153/final",
      "note": "Base para recomendações de segurança, configuração e monitoramento de WLANs."
    },
    {
      "type": "official-doc",
      "title": "IEEE 802.1X Port-Based Network Access Control",
      "organization": "IEEE 802.1",
      "url": "https://1.ieee802.org/security/802-1x/",
      "note": "Referência para controle de acesso baseado em porta e EAPOL."
    },
    {
      "type": "official-doc",
      "title": "WPA3 Encryption and Configuration Guide",
      "organization": "Cisco Meraki",
      "url": "https://documentation.meraki.com/Wireless/Design_and_Configure/Configuration_Guides/Encryption_and_Authentication/WPA3_Encryption_and_Configuration_Guide",
      "note": "Referência operacional para WPA3, PMF e compatibilidade."
    },
    {
      "type": "official-doc",
      "title": "Cisco Catalyst 9800 Wireless Controller Best Practices",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/technical-reference/c9800-best-practices.html",
      "note": "Referência para arquitetura e operação de controladoras corporativas."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 9",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m09",
      "note": "Firewall, ACLs, WAF e políticas de tráfego."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "url": "internal://enterprise-identity-iam",
      "note": "Base para identidade, certificados, autorização e ciclo de vida de acessos."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "A segmentação do Wi‑Fi depende de firewall, ACLs e políticas de tráfego."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.1",
      "reason": "O próximo módulo aprofunda segurança de redes, defesa em profundidade e monitoramento."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs e monitoramento",
      "reason": "Wi‑Fi diagnosticável depende de telemetria, logs e dashboards."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM/PKI",
      "lesson": "802.1X, certificados e RADIUS",
      "reason": "WPA Enterprise depende de identidade, PKI e ciclo de vida de dispositivos."
    }
  ],
  "progressRules": {
    "completeWhen": {
        "read": true,
        "quizScoreAtLeast": 70,
        "anyOf": [
          "quizScoreAtLeast",
          "checklistDone"
        ]
      },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "13.1"
    ]
  }
};
