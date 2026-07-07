export const lesson1204 = {
  "id": "12.4",
  "moduleId": "m12",
  "order": 4,
  "title": "SSID, BSSID, associação e autenticação",
  "subtitle": "O passo a passo invisível que acontece entre o cliente Wi-Fi e o access point antes de DHCP, DNS e acesso real à rede.",
  "duration": "85-120 min",
  "estimatedStudyTimeMinutes": 120,
  "difficulty": "intermediário",
  "type": "fundamental",
  "xp": 210,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "ssid",
    "bssid",
    "802.11",
    "beacon",
    "probe",
    "association",
    "authentication",
    "troubleshooting",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.1",
      "reason": "É necessário entender Wi-Fi como tecnologia de acesso local sem fio, não como sinônimo de internet."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.2",
      "reason": "Associação depende de RF, canal, RSSI, ruído e SNR; um cliente só consegue associar bem a um BSSID que consiga ouvir com qualidade."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.3",
      "reason": "As capacidades anunciadas e negociadas dependem da geração 802.11 suportada por cliente e AP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "SSID/BSSID dependem de endereços MAC, quadros de camada 2 e integração com switching/VLAN no lado cabeado."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "Depois de associar, o cliente normalmente precisa de DHCP, DNS e gateway para realmente usar a rede."
    }
  ],
  "objectives": [
    "Diferenciar SSID, BSSID, ESS e rede IP sem confundir nome de rede com gateway ou internet.",
    "Explicar o processo de descoberta, beacon, probe, autenticação 802.11, associação e autorização posterior.",
    "Entender por que autenticação 802.11 open authentication não é a mesma coisa que WPA2/WPA3 ou 802.1X.",
    "Relacionar associação Wi-Fi com logs de controladora, RSSI, canal, motivo de desconexão e troubleshooting.",
    "Identificar riscos defensivos associados a SSID oculto, redes abertas, rogue AP, evil twin e excesso de SSIDs.",
    "Coletar evidências locais no Windows/Linux para saber a qual BSSID um cliente está conectado e que redes estão visíveis."
  ],
  "learningOutcomes": [
    "Dado um print com SSID e BSSID, o aluno consegue explicar qual é o nome lógico da WLAN e qual é a célula/AP rádio específico usado pelo cliente.",
    "Dado um problema de 'conecta mas não navega', o aluno consegue separar associação Wi-Fi de DHCP, DNS, gateway, firewall e aplicação.",
    "Dado um ambiente com vários APs e um mesmo SSID, o aluno consegue entender por que o cliente escolhe um BSSID e não simplesmente 'a rede'.",
    "Dado um log de associação/desassociação, o aluno consegue levantar hipóteses sobre RF, autenticação, política, roaming e capacidade.",
    "Dado um desenho de Wi-Fi corporativo, o aluno consegue sugerir boas práticas de SSID, segmentação e evidências de monitoramento."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n\n  <p>Quando alguém diz “meu Wi-Fi não conecta”, essa frase pode significar muitas coisas diferentes. O notebook pode não enxergar o SSID. Pode enxergar a rede, mas escolher um BSSID ruim. Pode autenticar em 802.11, mas falhar no WPA. Pode associar, mas não conseguir DHCP. Pode receber IP, mas falhar no DNS. Pode resolver nomes, mas ser bloqueado no firewall. Pode parecer conectado, mas estar preso em captive portal. Para diagnosticar profissionalmente, você precisa separar cada etapa.</p>\n  <p>Esta aula trata da entrada do cliente na WLAN. Antes de falar de IP, gateway, DNS, HTTP ou cloud, existe um diálogo de camada 2 entre a estação cliente e o access point. Esse diálogo envolve descoberta, beacons, probes, SSID, BSSID, autenticação 802.11, associação e, depois, mecanismos de segurança e autorização como WPA2, WPA3, PSK, SAE, 802.1X e RADIUS.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma empresa troca senha do Wi-Fi corporativo, altera um SSID, adiciona um AP novo ou cria uma rede guest. De repente, parte dos usuários “conecta”, parte “não vê a rede”, parte “pede senha toda hora” e parte “conecta mas não acessa nada”. Sem entender SSID, BSSID e associação, o analista trata tudo como um único problema e perde horas no diagnóstico.</div>\n  <p>O objetivo aqui é criar um mapa mental claro: SSID é o nome lógico da WLAN; BSSID é a identidade MAC da célula específica; associação é o vínculo do cliente com um AP; autenticação 802.11 inicial não é a mesma coisa que autenticação corporativa; e estar associado não significa estar autorizado a acessar a rede IP.</p>\n\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n\n  <p>As primeiras redes locais cabeadas dependiam de conexões físicas previsíveis. Um host estava ligado a uma porta de switch, e aquela porta podia ser configurada, documentada, monitorada e protegida. O Wi-Fi trouxe mobilidade, mas também criou uma pergunta nova: como um dispositivo descobre que uma rede existe se não há cabo conectado?</p>\n  <p>A família IEEE 802.11 resolveu isso usando quadros de gerenciamento. Access points anunciam periodicamente a existência de uma BSS por meio de beacons, e clientes podem procurar redes com probe requests. O SSID passou a ser o nome lógico que o usuário reconhece, enquanto o BSSID passou a identificar a célula/radio/AP específico dentro daquela WLAN.</p>\n  <p>Com o crescimento das empresas, uma única rede sem fio deixou de ser suficiente. Surgiram múltiplos APs com o mesmo SSID para formar uma área de cobertura maior, redes de visitantes separadas, redes de IoT, SSIDs com autenticação corporativa, integração com controladoras, VLANs dinâmicas e políticas por identidade. O processo básico de descoberta e associação continuou existindo, mas passou a fazer parte de uma arquitetura maior.</p>\n  <p>A documentação técnica de fornecedores como Cisco e Meraki descreve esse processo como uma sequência de descoberta, autenticação 802.11, associação e etapas posteriores de segurança/autorização. A própria distinção entre associação 802.11 e autenticação WPA/802.1X é essencial: em redes com WPA/WPA2/802.1X, o cliente só consegue enviar dados úteis depois que os mecanismos de chaveamento e autenticação posteriores à associação acontecem.</p>\n\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n\n  <p>O problema técnico é que “conectar ao Wi-Fi” é uma expressão humana para várias etapas diferentes. O sistema operacional mostra um ícone simples, mas por baixo existem decisões de rádio, quadros de gerenciamento, seleção de BSSID, associação, segurança, DHCP, DNS e política de rede.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Se o SSID não aparece:</strong> pode ser banda incompatível, SSID não anunciado, canal não suportado, sinal fraco, driver, política regional ou AP fora do ar.</li>\n    <li><strong>Se o SSID aparece, mas não conecta:</strong> pode ser senha, política de segurança, 802.1X, certificado, incompatibilidade WPA, limite de clientes ou rejeição pela controladora.</li>\n    <li><strong>Se conecta, mas não navega:</strong> a associação pode estar correta, mas DHCP, DNS, gateway, VLAN, captive portal, firewall ou proxy podem estar falhando.</li>\n    <li><strong>Se conecta no AP errado:</strong> o cliente pode estar preso em um BSSID distante, em banda congestionada ou em canal com baixa qualidade.</li>\n    <li><strong>Se a rede é insegura:</strong> SSID mal desenhado, rede aberta, PSK compartilhada, ausência de segmentação e falta de logs ampliam risco.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Confusão comum:</strong> SSID não é uma sub-rede IP; BSSID não é gateway; associação não é autorização; autenticação 802.11 open system não significa necessariamente que a rede seja aberta para dados.</div>\n\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n\n  <p>A forma de entrar em uma rede Wi-Fi evoluiu junto com segurança, mobilidade e escala corporativa. No começo, o foco era apenas permitir que clientes descobrissem e se associassem a um AP. Depois surgiram criptografia, autenticação robusta, múltiplos SSIDs, roaming, redes guest e integração com identidade.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Rede aberta simples</td><td>Cliente descobre SSID, autentica de forma aberta e associa.</td><td>Sem proteção efetiva de dados e sem identidade forte.</td><td>Criptografia e autenticação com WPA/WPA2/WPA3.</td></tr>\n      <tr><td>WEP/shared key</td><td>Tentava proteger rede com chave compartilhada fraca.</td><td>Modelo historicamente inseguro e inadequado.</td><td>WPA/WPA2 e depois WPA3.</td></tr>\n      <tr><td>PSK doméstico</td><td>Uma senha compartilhada protege a WLAN.</td><td>Senha compartilhada entre muitos usuários dificulta auditoria e revogação individual.</td><td>WPA Enterprise e 802.1X em ambientes corporativos.</td></tr>\n      <tr><td>SSID único com vários APs</td><td>Vários BSSIDs anunciam o mesmo SSID para ampliar cobertura.</td><td>Roaming e seleção de BSSID dependem do cliente e da qualidade do desenho RF.</td><td>Recursos como 802.11k/v/r, controladoras e otimização de roaming.</td></tr>\n      <tr><td>Arquitetura corporativa</td><td>SSID, BSSID, 802.1X, VLAN, NAC, logs e firewall trabalham juntos.</td><td>Aumenta complexidade operacional e exige documentação.</td><td>Automação, telemetria, cloud management e integração com IAM/SIEM.</td></tr>\n    </tbody>\n  </table>\n\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n\n  <p>SSID, BSSID, autenticação e associação são peças diferentes do processo de entrada em uma WLAN.</p>\n  <div class=\"definition-box\"><strong>SSID:</strong> Service Set Identifier. É o nome lógico de uma rede Wi-Fi, normalmente o nome que aparece para o usuário, como <code>Empresa-Corporativo</code>, <code>Empresa-Visitantes</code> ou <code>Casa-5G</code>.</div>\n  <div class=\"definition-box\"><strong>BSSID:</strong> Basic Service Set Identifier. É o endereço MAC que identifica uma célula/AP rádio específico anunciando aquele SSID. Em uma empresa com o mesmo SSID em vários APs, cada AP/radio/SSID terá um BSSID diferente.</div>\n  <div class=\"definition-box\"><strong>Associação:</strong> é o vínculo de camada 2 entre a estação cliente e um BSSID. Depois dela, o AP reconhece aquele cliente como associado àquela BSS.</div>\n  <div class=\"definition-box\"><strong>Autenticação 802.11 inicial:</strong> é uma etapa de gerenciamento do padrão 802.11. Em redes modernas, frequentemente ocorre como open system authentication e não deve ser confundida com WPA2, WPA3, PSK, SAE, EAP, 802.1X ou RADIUS.</div>\n  <p>Uma forma profissional de pensar é: o SSID responde “qual rede lógica eu quero?”; o BSSID responde “qual AP/célula específica estou usando?”; a associação responde “este cliente está vinculado a este AP?”; e a autorização posterior responde “este usuário/dispositivo pode trafegar, em qual VLAN, com quais políticas?”.</p>\n\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>O processo interno pode variar conforme driver, sistema operacional, banda, padrão e segurança configurada, mas o fluxo conceitual é consistente.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Beacon:</strong> o AP anuncia periodicamente a BSS. O beacon pode incluir SSID, BSSID, canal, capacidades, intervalo de beacon, taxas suportadas e elementos de segurança.</li>\n    <li><strong>Scanning passivo:</strong> o cliente escuta beacons nos canais para descobrir redes sem transmitir.</li>\n    <li><strong>Scanning ativo:</strong> o cliente envia probe requests, às vezes para um SSID específico, às vezes wildcard, e APs respondem com probe responses.</li>\n    <li><strong>Seleção de BSSID:</strong> o cliente escolhe um AP/célula com base em sinal, banda, capacidade, histórico, política do driver, segurança e preferências do sistema.</li>\n    <li><strong>Autenticação 802.11:</strong> o cliente envia Authentication Request e recebe Authentication Response. Em redes modernas isso normalmente não é a autenticação corporativa final.</li>\n    <li><strong>Associação:</strong> o cliente envia Association Request com capacidades e SSID desejado; o AP responde aceitando ou rejeitando.</li>\n    <li><strong>Segurança posterior:</strong> dependendo da rede, ocorre WPA2/WPA3, SAE, 4-way handshake, 802.1X/EAP e validação RADIUS.</li>\n    <li><strong>Integração com rede IP:</strong> o cliente recebe VLAN/política, obtém IP por DHCP, aprende gateway, resolve DNS e só então acessa serviços.</li>\n  </ol>\n  <p>Em troubleshooting, essa sequência evita pular etapas. Antes de culpar DNS, confirme se o cliente está associado. Antes de culpar senha, confirme se o SSID é visível e se o cliente suporta a banda. Antes de culpar RF, verifique se há rejeição por política, limite de associação ou falha de autenticação.</p>\n\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Em uma arquitetura corporativa, SSID e BSSID são apenas a borda visível de um desenho maior. O AP anuncia SSIDs; cada SSID pode mapear para uma VLAN, uma política de firewall, um método de autenticação, uma rede guest, uma política de QoS e um conjunto de logs. A controladora ou plataforma cloud registra associações, desassociações, RSSI, canal, método de segurança, falhas de autenticação e, em muitos casos, a política aplicada.</p>\n  <ul>\n    <li><strong>Camada física:</strong> canal, banda, potência, ruído, RSSI, SNR e interferência.</li>\n    <li><strong>Camada 2 wireless:</strong> beacons, probes, autenticação 802.11, associação, BSSID e quadros de gerenciamento.</li>\n    <li><strong>Camada 2 cabeada:</strong> uplink do AP, trunk, VLANs, PoE e switch.</li>\n    <li><strong>Camada 3:</strong> DHCP, gateway, roteamento, ACLs e firewall.</li>\n    <li><strong>Identidade:</strong> PSK, SAE, 802.1X, RADIUS, certificados e grupos.</li>\n    <li><strong>Operação:</strong> logs, monitoramento, WIDS/WIPS, SIEM, inventário e resposta a incidente.</li>\n  </ul>\n  <p>Em redes modernas, um mesmo SSID corporativo pode existir em dezenas de APs e centenas de BSSIDs. O usuário vê um nome; o time de rede enxerga células, rádios, canais, clientes, associações, roaming, políticas e logs.</p>\n\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em um aeroporto. O SSID é como o nome da companhia aérea no painel: “Empresa-Corporativo”. O BSSID é como o portão específico de embarque: portão A12, B5 ou C20. A associação é o momento em que você entra na fila daquele portão e o sistema reconhece que você está tentando embarcar por ali. A autenticação corporativa posterior é a verificação do seu documento, bilhete e autorização para entrar no avião.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> no aeroporto, o portão normalmente é escolhido pela companhia. No Wi-Fi, o cliente tem papel forte na escolha do BSSID. Ele pode escolher mal, ficar preso a um AP distante ou demorar para migrar para outro AP melhor.</div>\n\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Na sua casa, você pode ter um roteador com dois nomes: <code>Casa-2G</code> e <code>Casa-5G</code>. Cada nome é um SSID. Se o roteador transmite em duas bandas, cada rádio pode ter seu próprio BSSID. Seu celular mostra o SSID, mas internamente ele se associa ao BSSID de um rádio específico em um canal específico.</p>\n  <p>Quando você troca de cômodo e o sinal piora, o celular pode manter a associação no mesmo BSSID mesmo com qualidade ruim. Em uma casa pequena isso passa despercebido; em uma empresa, esse comportamento pode causar chamadas VoIP ruins, quedas em videoconferência e reclamações intermitentes.</p>\n\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Uma empresa possui três SSIDs: <code>Empresa-Corp</code>, <code>Empresa-Guest</code> e <code>Empresa-IoT</code>. O SSID corporativo usa 802.1X e pode atribuir VLAN por grupo. O guest usa captive portal e firewall restritivo. O IoT usa segmentação rígida e permite apenas tráfego necessário para brokers, APIs ou controladores.</p>\n  <p>Em cada andar existem vários APs. O mesmo SSID <code>Empresa-Corp</code> aparece em todos eles, mas cada AP/radio anuncia um BSSID diferente. Quando um colaborador anda pelo prédio, o dispositivo precisa escolher quando sair de um BSSID e associar a outro. A qualidade da experiência depende de RF, roaming, políticas, capacidade e tempo de autenticação.</p>\n  <p>O time de segurança não deve olhar apenas “quem está no Wi-Fi”. Deve olhar: em qual SSID, em qual BSSID, em qual VLAN, com qual usuário, com qual método de autenticação, em qual horário, com qual RSSI, em qual AP, com quais falhas e com qual política aplicada.</p>\n\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Cloud networking não substitui o processo de associação Wi-Fi, mas muitas plataformas modernas de Wi-Fi são gerenciadas em cloud. A controladora em nuvem pode armazenar logs de associação, autenticação, roaming, falhas de DHCP, qualidade de cliente, mapas de AP e alertas de rogue AP. Isso ajuda operação distribuída, principalmente em empresas com filiais.</p>\n  <p>O cuidado é que gestão em cloud também cria dependência operacional: conectividade de gerenciamento, licenças, retenção de logs, RBAC administrativo, integração com SSO, MFA e trilhas de auditoria. Um SSID mal configurado em portal cloud pode ser propagado para várias filiais rapidamente. Automação ajuda, mas erro automatizado também escala.</p>\n\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, SSIDs e políticas wireless podem ser tratados como configuração versionada quando a plataforma oferece API ou integração com IaC. Uma mudança em SSID guest, VLAN de IoT, método WPA ou política de firewall deve passar por revisão, aprovação, teste e rollback, da mesma forma que mudanças em infraestrutura cloud.</p>\n  <p>Um pipeline maduro não deve apenas “aplicar configuração”. Ele deve validar padrões: número máximo de SSIDs por AP, proibição de rede aberta corporativa, exigência de WPA2/WPA3 adequado, nomes padronizados, mapeamento de VLAN, integração com RADIUS, logs habilitados e documentação atualizada.</p>\n  <p>Esse raciocínio conecta este módulo ao curso de Infraestrutura Moderna, Platform Engineering e DevSecOps: a rede wireless passa a ser infraestrutura governada, observável e auditável, não uma configuração manual esquecida em uma controladora.</p>\n\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>SSID não é segredo. Ocultar SSID não deve ser tratado como controle de segurança principal, porque o nome pode aparecer em outros quadros e porque o risco real está em autenticação fraca, criptografia inadequada, AP falso, redes abertas, segmentação ruim e falta de monitoramento.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>SSID corporativo com PSK compartilhada</td><td>Todos usam a mesma senha por anos.</td><td>Dificulta revogação individual e auditoria.</td><td>Preferir 802.1X/Enterprise quando possível; rotacionar e segmentar quando PSK for inevitável.</td></tr>\n      <tr><td>Rogue AP</td><td>AP não autorizado anuncia nome parecido ou conecta rede interna indevidamente.</td><td>Bypass de controles, interceptação ou exposição lateral.</td><td>WIDS/WIPS, inventário, NAC, inspeção física e alertas de BSSID desconhecido.</td></tr>\n      <tr><td>Evil twin</td><td>AP falso imita SSID conhecido para induzir associação.</td><td>Roubo de credenciais, captura de tráfego ou phishing.</td><td>WPA Enterprise com validação de certificado, treinamento, PMF quando aplicável e detecção de duplicidade.</td></tr>\n      <tr><td>Excesso de SSIDs</td><td>Muitos nomes anunciados por rádio.</td><td>Consumo de airtime, operação confusa e políticas inconsistentes.</td><td>Reduzir SSIDs, usar VLAN/política dinâmica e padronizar arquitetura.</td></tr>\n    </tbody>\n  </table>\n  <p>O limite ético é claro: nesta aula, a análise de BSSID, beacon e associação é feita para diagnóstico, inventário e defesa. Não execute impersonação de AP, captura indevida de tráfego, tentativas de associação em redes de terceiros ou ataques de desautenticação.</p>\n\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama abaixo mostra a diferença entre SSID visível para o usuário, BSSID real escolhido pelo cliente e etapas posteriores até a rede IP.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 980 460\" role=\"img\" aria-labelledby=\"ssid-bssid-title ssid-bssid-desc\">\n    <title id=\"ssid-bssid-title\">SSID, BSSID, associação e acesso à rede</title>\n    <desc id=\"ssid-bssid-desc\">Um cliente vê um SSID corporativo, escolhe um BSSID específico, associa ao AP, passa por autenticação e só então recebe acesso à rede IP.</desc>\n    <defs>\n      <marker id=\"arrow-ssid-bssid\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n    </defs>\n    <rect x=\"30\" y=\"40\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"125\" y=\"75\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"125\" y=\"102\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">vê SSID</text>\n    <rect x=\"330\" y=\"35\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"425\" y=\"68\" text-anchor=\"middle\" class=\"svg-label\">AP 1 / Rádio 5 GHz</text>\n    <text x=\"425\" y=\"95\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SSID: Empresa-Corp</text>\n    <text x=\"425\" y=\"115\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSID: aa:aa:aa:01</text>\n    <rect x=\"330\" y=\"175\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"425\" y=\"208\" text-anchor=\"middle\" class=\"svg-label\">AP 2 / Rádio 5 GHz</text>\n    <text x=\"425\" y=\"235\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SSID: Empresa-Corp</text>\n    <text x=\"425\" y=\"255\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSID: aa:aa:aa:02</text>\n    <rect x=\"330\" y=\"315\" width=\"190\" height=\"95\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"425\" y=\"348\" text-anchor=\"middle\" class=\"svg-label\">AP Guest</text>\n    <text x=\"425\" y=\"375\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SSID: Empresa-Guest</text>\n    <text x=\"425\" y=\"395\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSID: bb:bb:bb:01</text>\n    <rect x=\"650\" y=\"80\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"715\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">802.1X/RADIUS</text>\n    <text x=\"715\" y=\"134\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">autorização</text>\n    <rect x=\"650\" y=\"210\" width=\"130\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"715\" y=\"242\" text-anchor=\"middle\" class=\"svg-label\">VLAN/Gateway</text>\n    <text x=\"715\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rede IP</text>\n    <rect x=\"835\" y=\"145\" width=\"120\" height=\"110\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"895\" y=\"183\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"895\" y=\"208\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política</text>\n    <text x=\"895\" y=\"230\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs</text>\n    <line x1=\"220\" y1=\"85\" x2=\"330\" y2=\"82\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-ssid-bssid)\" />\n    <text x=\"275\" y=\"65\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">beacon/probe</text>\n    <line x1=\"220\" y1=\"105\" x2=\"330\" y2=\"222\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-ssid-bssid)\" />\n    <line x1=\"520\" y1=\"82\" x2=\"650\" y2=\"115\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-ssid-bssid)\" />\n    <text x=\"585\" y=\"82\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">associação + segurança</text>\n    <line x1=\"715\" y1=\"150\" x2=\"715\" y2=\"210\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-ssid-bssid)\" />\n    <line x1=\"780\" y1=\"245\" x2=\"835\" y2=\"200\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-ssid-bssid)\" />\n    <rect x=\"300\" y=\"20\" width=\"250\" height=\"410\" rx=\"18\" class=\"svg-boundary\" />\n    <text x=\"425\" y=\"438\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Mesmo SSID pode existir em vários BSSIDs</text>\n  </svg>\n\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n\n  <p>Neste laboratório, você vai coletar evidências locais para responder perguntas simples e profissionais: qual SSID estou usando, a qual BSSID estou associado, que canal aparece, que segurança é anunciada, que redes estão visíveis e como separar problema de associação de problema de IP.</p>\n  <p>O laboratório é defensivo. Não capture tráfego de terceiros sem autorização, não tente se associar a redes que não são suas e não execute impersonação de AP.</p>\n\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam a separação entre nome lógico, célula rádio, associação e rede IP. Eles também treinam interpretação de sintomas comuns em suporte corporativo.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n\n  <p>Você receberá um cenário de empresa com múltiplos APs, SSIDs e reclamações de conexão. O desafio é produzir uma análise separando RF, associação, autenticação, DHCP, DNS e política.</p>\n\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como um analista experiente evita conclusões precipitadas: primeiro confirma visibilidade e BSSID, depois associação, depois segurança, depois rede IP e só então aplicação.</p>\n\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n\n  <ul>\n    <li><strong>Ideia central:</strong> SSID é o nome lógico; BSSID é a célula/AP específico; associação é vínculo de camada 2; autorização e tráfego IP vêm depois.</li>\n    <li><strong>O que lembrar:</strong> o usuário vê um nome, mas o cliente escolhe um BSSID com base em RF, capacidades e política local.</li>\n    <li><strong>Erro comum:</strong> tratar “conectado ao Wi-Fi” como sinônimo de “autorizado, com IP, DNS e acesso à aplicação”.</li>\n    <li><strong>Uso real:</strong> logs de associação, BSSID, canal, RSSI e método de segurança são evidências centrais em troubleshooting e segurança.</li>\n  </ul>\n\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Agora que você entende como o cliente descobre uma WLAN e se associa a um BSSID, a próxima aula aprofunda a segurança dessa entrada: WPA2, WPA3, PSK, SAE, Enterprise e 802.1X. A pergunta deixa de ser apenas “como o cliente entra?” e passa a ser “como provar, proteger e autorizar quem entra?”.</p>\n\n</section>\n"
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
      "802.1X",
      "EAPOL",
      "DHCP",
      "DNS",
      "ARP",
      "IPv4",
      "IPv6"
    ],
    "dependsOn": [
      "RF",
      "canal",
      "RSSI",
      "SNR",
      "MAC address",
      "quadros 802.11"
    ],
    "enables": [
      "WPA2/WPA3",
      "802.1X",
      "roaming",
      "VLAN wireless",
      "rede guest",
      "NAC",
      "troubleshooting Wi-Fi"
    ]
  },
  "protocolFields": [
    {
      "field": "SSID",
      "size": "até 32 octetos",
      "purpose": "Identificar logicamente uma WLAN para humanos e clientes.",
      "securityObservation": "Não deve ser tratado como segredo; ocultar SSID não substitui criptografia nem autenticação forte."
    },
    {
      "field": "BSSID",
      "size": "48 bits",
      "purpose": "Identificar a célula/radio virtual de um AP para um SSID específico.",
      "securityObservation": "É usado em monitoramento e detecção de AP falso, mas pode ser imitado em ataques de impersonação; precisa de correlação com localização, canal, fabricante, logs e autenticação."
    },
    {
      "field": "Capability Information",
      "size": "16 bits no quadro de gerenciamento clássico",
      "purpose": "Anunciar capacidades básicas da BSS, como tipo de rede e requisitos.",
      "securityObservation": "Ajuda o cliente a decidir compatibilidade, mas não substitui verificação de política e segurança."
    },
    {
      "field": "Supported Rates / Extended Supported Rates",
      "size": "variável",
      "purpose": "Anunciar taxas suportadas pela BSS e pelo cliente.",
      "securityObservation": "Taxas legadas mantidas por compatibilidade podem aumentar airtime e prejudicar ambientes densos."
    },
    {
      "field": "RSN Information Element",
      "size": "variável",
      "purpose": "Anunciar métodos de segurança, cifras, AKM e capacidades RSN.",
      "securityObservation": "É evidência importante para validar WPA2/WPA3, Enterprise, PSK, transição e política mínima aceitável."
    },
    {
      "field": "AID",
      "size": "16 bits",
      "purpose": "Association ID atribuído ao cliente após associação bem-sucedida.",
      "securityObservation": "Ajuda o AP a gerenciar clientes associados, economia de energia e tráfego; não é identidade corporativa do usuário."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "AP",
      "action": "Envia beacons periodicamente",
      "detail": "Beacon anuncia SSID, BSSID, canal, capacidades e parâmetros de segurança.",
      "possibleFailure": "SSID excessivo aumenta airtime consumido por beacons; canal ruim reduz chance de descoberta confiável."
    },
    {
      "step": 2,
      "actor": "Cliente",
      "action": "Realiza scanning passivo ou ativo",
      "detail": "Pode ouvir beacons ou enviar probe requests para encontrar redes compatíveis.",
      "possibleFailure": "Driver, política de privacidade, banda não suportada ou RSSI fraco podem ocultar redes esperadas."
    },
    {
      "step": 3,
      "actor": "Cliente",
      "action": "Escolhe um BSSID candidato",
      "detail": "A decisão considera sinal, capacidades, histórico, banda, política do driver e, em ambiente corporativo, sugestões de roaming.",
      "possibleFailure": "Cliente pode grudar em AP distante, escolher 2.4 GHz congestionado ou ignorar AP melhor por política do driver."
    },
    {
      "step": 4,
      "actor": "Cliente e AP",
      "action": "Executam autenticação 802.11 inicial",
      "detail": "Em redes modernas, normalmente é open system authentication; a segurança real vem depois com WPA/WPA2/WPA3/802.1X.",
      "possibleFailure": "Confundir open authentication com rede aberta leva a diagnósticos e decisões de segurança erradas."
    },
    {
      "step": 5,
      "actor": "Cliente e AP",
      "action": "Executam associação",
      "detail": "O cliente envia Association Request e o AP responde com Association Response e parâmetros aceitos.",
      "possibleFailure": "Rejeição por capacidade, limite de clientes, política, banda, ACL, falha de controladora ou incompatibilidade."
    },
    {
      "step": 6,
      "actor": "Cliente, AP e infraestrutura",
      "action": "Executam autenticação/criptografia/autorizações posteriores",
      "detail": "Dependendo do SSID, ocorre PSK/SAE, 802.1X/EAP, 4-way handshake, atribuição de VLAN, DHCP e DNS.",
      "possibleFailure": "Associação pode ocorrer, mas tráfego de dados falha por senha, certificado, RADIUS, DHCP, DNS, firewall ou VLAN."
    }
  ],
  "deepDive": {
    "mentalModel": "Wi-Fi não conecta diretamente a 'internet'. Primeiro o cliente escolhe uma célula 802.11 específica, associa em camada 2, passa por segurança/autorização e só depois usa serviços IP.",
    "keyTerms": [
      "SSID",
      "BSSID",
      "ESS",
      "BSS",
      "beacon",
      "probe request",
      "probe response",
      "authentication",
      "association",
      "RSN",
      "AID"
    ],
    "decisionTable": [
      {
        "situation": "Usuário não vê o SSID",
        "recommendedChoice": "Verificar banda/canal suportado, beacon, política de SSID, driver e RF.",
        "why": "O problema acontece antes da associação.",
        "risk": "Perder tempo em DHCP/DNS quando a rede nem foi descoberta."
      },
      {
        "situation": "Usuário vê o SSID, mas falha ao conectar",
        "recommendedChoice": "Verificar método de segurança, logs de autenticação, associação e capacidades do cliente.",
        "why": "A descoberta funcionou; a falha está entre autenticação, associação e segurança.",
        "risk": "Trocar AP ou canal sem evidência."
      },
      {
        "situation": "Usuário conecta, mas não navega",
        "recommendedChoice": "Validar IP, gateway, DNS, firewall, proxy e captive portal.",
        "why": "A associação provavelmente ocorreu; o problema pode estar em camadas superiores.",
        "risk": "Culpar Wi-Fi por falha de rede IP."
      },
      {
        "situation": "Cliente escolhe AP distante",
        "recommendedChoice": "Analisar BSSID, RSSI, SNR, banda, roaming e potência dos APs.",
        "why": "O cliente decide roaming, mas a arquitetura influencia a decisão.",
        "risk": "Experiência ruim mesmo com vários APs disponíveis."
      }
    ],
    "limitations": [
      "SSID não identifica fisicamente um AP específico.",
      "BSSID identifica uma célula, mas pode haver virtualização de BSSID e variações por rádio/SSID.",
      "Associação não garante que DHCP, DNS, gateway ou firewall estejam corretos.",
      "Ocultar SSID não é controle de segurança robusto.",
      "Logs de cliente podem ser incompletos sem controladora ou plataforma de gerenciamento."
    ],
    "whenToUse": [
      "Diagnóstico de conexão Wi-Fi.",
      "Planejamento de SSIDs corporativos.",
      "Análise de roaming e escolha de AP.",
      "Investigação de rogue AP ou SSID suspeito.",
      "Integração de WLAN com VLAN, RADIUS, SIEM e firewall."
    ],
    "whenNotToUse": [
      "Não usar SSID como segredo de segurança.",
      "Não usar número excessivo de SSIDs para substituir política dinâmica.",
      "Não diagnosticar aplicação olhando apenas associação Wi-Fi.",
      "Não aceitar BSSID desconhecido como confiável sem inventário e correlação."
    ],
    "operationalImpact": [
      "Exige inventário de SSIDs, BSSIDs, APs, bandas, VLANs e políticas.",
      "Facilita troubleshooting quando logs de associação são coletados corretamente.",
      "Aumenta complexidade quando há muitos SSIDs e exceções por filial.",
      "Requer documentação de nomes, segmentação, segurança e integrações."
    ],
    "financialImpact": [
      "Plataformas de controladora/cloud podem exigir licença por AP para logs e telemetria.",
      "Mais SSIDs e políticas podem aumentar tempo operacional, mesmo sem custo direto de software.",
      "WIDS/WIPS, NAC e RADIUS resiliente podem exigir appliances, licenças ou infraestrutura adicional.",
      "Diagnóstico ruim gera custo indireto por suporte, perda de produtividade e troca desnecessária de hardware."
    ],
    "securityImpact": [
      "SSID mal desenhado pode expor propósito interno ou induzir usuários a redes falsas.",
      "BSSID e beacons são evidências úteis para detectar AP não autorizado.",
      "802.1X e validação de certificado reduzem risco de evil twin quando bem configurados.",
      "Redes abertas ou PSK compartilhada ampliam risco em ambientes corporativos."
    ]
  },
  "realWorld": {
    "homeScenario": "Um roteador doméstico anuncia Casa-2G e Casa-5G; cada SSID/banda tem BSSID próprio, e o celular pode escolher a opção com sinal mais forte mesmo que não seja a melhor em capacidade.",
    "smallBusinessScenario": "Uma pequena empresa usa o mesmo SSID para funcionários e visitantes; isso simplifica operação, mas mistura riscos e dificulta políticas.",
    "enterpriseScenario": "Uma corporação usa SSID corporativo com 802.1X, SSID guest com portal e SSID IoT segmentado, todos distribuídos por vários APs e BSSIDs.",
    "cloudScenario": "A controladora cloud registra eventos de associação, falhas de autenticação e qualidade por BSSID, permitindo troubleshooting remoto em filiais.",
    "incidentScenario": "Um usuário relata conexão instável. Logs mostram alternância frequente entre dois BSSIDs com RSSI ruim, sugerindo problema de cobertura/roaming em vez de firewall."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que SSID é a rede IP.",
      "whyItHappens": "O usuário vê apenas o nome do Wi-Fi e associa isso à conectividade completa.",
      "consequence": "Diagnóstico ignora VLAN, DHCP, DNS, gateway e firewall.",
      "correction": "Trate SSID como nome lógico da WLAN; rede IP e políticas vêm depois."
    },
    {
      "mistake": "Achar que esconder SSID protege a rede.",
      "whyItHappens": "Parece intuitivo que algo invisível seja mais seguro.",
      "consequence": "Falsa sensação de segurança e manutenção de autenticação fraca.",
      "correction": "Use criptografia forte, autenticação adequada, segmentação e monitoramento."
    },
    {
      "mistake": "Confundir autenticação 802.11 com autenticação corporativa.",
      "whyItHappens": "Ambas usam a palavra autenticação.",
      "consequence": "Interpretação errada de logs e etapas de falha.",
      "correction": "Separe autenticação 802.11 inicial de WPA/WPA3/802.1X/EAP/RADIUS."
    },
    {
      "mistake": "Criar muitos SSIDs para resolver toda exceção.",
      "whyItHappens": "Parece simples criar uma rede para cada grupo.",
      "consequence": "Aumenta airtime de beacons, complexidade e risco de política inconsistente.",
      "correction": "Use poucos SSIDs e políticas/VLANs dinâmicas quando possível."
    },
    {
      "mistake": "Culpar Wi-Fi quando o cliente já está associado, com bom sinal e o problema é DNS.",
      "whyItHappens": "Para o usuário tudo é 'Wi-Fi'.",
      "consequence": "Tempo gasto no AP enquanto a falha está em camada superior.",
      "correction": "Validar etapa por etapa: associação, IP, gateway, DNS, firewall e aplicação."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "SSID não aparece",
      "SSID aparece, mas conexão falha",
      "Conecta e desconecta",
      "Conecta mas não recebe IP",
      "Conecta mas não resolve nomes",
      "Cliente preso em AP distante",
      "Falhas intermitentes por andar ou sala"
    ],
    "diagnosticQuestions": [
      "O cliente enxerga o SSID?",
      "Qual BSSID foi escolhido?",
      "Qual canal e banda estão em uso?",
      "O método de segurança do cliente é compatível com o SSID?",
      "Há logs de association reject, auth failure ou deauth/disassoc?",
      "Depois da associação, DHCP e DNS funcionam?",
      "A falha ocorre com todos os clientes ou apenas um modelo/driver?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, rádio, canal, sinal e método de autenticação da conexão atual.",
        "expectedObservation": "Campos SSID, BSSID, Radio type, Authentication, Cipher, Channel e Signal.",
        "interpretation": "Confirma a célula exata e evita tratar 'Wi-Fi' como uma entidade única."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show networks mode=bssid",
        "purpose": "Listar redes visíveis e BSSIDs anunciados.",
        "expectedObservation": "SSIDs com BSSIDs, sinal, canal e autenticação quando disponível.",
        "interpretation": "Ajuda a identificar múltiplos APs anunciando o mesmo SSID e redes suspeitas."
      },
      {
        "platform": "Linux",
        "command": "nmcli -f SSID,BSSID,CHAN,FREQ,RATE,SIGNAL,SECURITY dev wifi list",
        "purpose": "Listar SSIDs, BSSIDs, canais, frequência, sinal e segurança.",
        "expectedObservation": "Tabela com redes visíveis e seus BSSIDs.",
        "interpretation": "Permite comparar células e verificar segurança anunciada."
      },
      {
        "platform": "Linux",
        "command": "iw dev",
        "purpose": "Identificar interface wireless e estado de conexão.",
        "expectedObservation": "Interface wlan/phy, tipo managed e, quando conectado, informações de link em comandos complementares.",
        "interpretation": "Base para comandos mais específicos como scan ou link."
      },
      {
        "platform": "Linux",
        "command": "iw dev wlan0 link",
        "purpose": "Ver BSSID conectado, SSID, frequência, sinal e taxa quando a interface se chama wlan0.",
        "expectedObservation": "Connected to <BSSID>, SSID, freq, signal e tx bitrate.",
        "interpretation": "Confirma associação atual e qualidade básica do link."
      },
      {
        "platform": "Wireshark",
        "command": "wlan.fc.type_subtype == 8 || wlan.fc.type_subtype == 4 || wlan.fc.type_subtype == 5 || wlan.fc.type_subtype == 11 || wlan.fc.type_subtype == 0 || wlan.fc.type_subtype == 1",
        "purpose": "Filtrar beacons, probe requests/responses, authentication e association frames em captura autorizada.",
        "expectedObservation": "Quadros de gerenciamento 802.11 quando a placa e o modo de captura suportam monitor mode.",
        "interpretation": "Mostra visualmente as etapas de descoberta e associação, sem executar ataque."
      }
    ],
    "decisionTree": [
      {
        "if": "SSID não aparece",
        "then": "Verificar banda/canal suportado, beacon, potência, distância, política regional e driver."
      },
      {
        "if": "SSID aparece mas associação falha",
        "then": "Verificar método de segurança, logs de AP/controladora, limite de clientes e compatibilidade."
      },
      {
        "if": "Associação ocorre mas não há IP",
        "then": "Verificar VLAN, DHCP, ACL, relay, escopo e logs de servidor DHCP."
      },
      {
        "if": "IP existe mas nomes falham",
        "then": "Verificar DNS recebido, resolução, firewall, proxy e captive portal."
      },
      {
        "if": "Cliente alterna BSSIDs com frequência",
        "then": "Analisar roaming, RSSI, SNR, potência, sobreposição e política do driver."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar SSIDs padronizados, poucos e documentados.",
      "Preferir WPA2/WPA3 Enterprise com 802.1X para rede corporativa quando viável.",
      "Separar guest, IoT e corporativo por política e segmentação.",
      "Monitorar BSSIDs esperados e alertar APs desconhecidos ou nomes similares.",
      "Validar certificados em ambientes 802.1X para reduzir risco de evil twin.",
      "Registrar associação, desassociação, falhas de autenticação, VLAN aplicada e identidade quando possível."
    ],
    "badPractices": [
      "Usar SSID oculto como principal controle de segurança.",
      "Usar PSK compartilhada por toda a empresa sem rotação e sem segmentação.",
      "Criar muitos SSIDs por conveniência operacional.",
      "Permitir rede aberta conectada a recursos internos.",
      "Não manter inventário de BSSIDs autorizados.",
      "Ignorar logs de association reject, deauth e falhas 802.1X."
    ],
    "commonErrors": [
      "Confundir SSID com VLAN.",
      "Achar que BSSID é o MAC físico único do AP inteiro, ignorando rádios e SSIDs virtuais.",
      "Achar que associação bem-sucedida significa acesso autorizado.",
      "Não diferenciar falha de senha, falha de certificado, falha de DHCP e falha de DNS."
    ],
    "vulnerabilities": [
      {
        "name": "Evil twin",
        "description": "AP falso anuncia SSID conhecido para induzir clientes a se conectarem.",
        "defensiveExplanation": "O risco aumenta quando usuários aceitam certificados inválidos, redes usam PSK fraca ou não há detecção de BSSID suspeito.",
        "mitigation": "WPA Enterprise com validação de certificado, treinamento, WIDS/WIPS, inventário de BSSID e alertas."
      },
      {
        "name": "Rogue AP",
        "description": "AP não autorizado conectado à rede ou anunciando rede parecida.",
        "defensiveExplanation": "Pode criar caminho fora da arquitetura de firewall, NAC e logs.",
        "mitigation": "Controle físico, NAC, detecção wireless, varreduras autorizadas e correlação com switches."
      },
      {
        "name": "Falsa segurança por SSID oculto",
        "description": "A rede não aparece em lista comum, mas isso não equivale a segurança criptográfica.",
        "defensiveExplanation": "O SSID pode ser revelado por tráfego de gerenciamento e não substitui autenticação forte.",
        "mitigation": "Usar WPA2/WPA3 adequado, 802.1X, segmentação e monitoramento."
      },
      {
        "name": "Exposição por rede guest mal isolada",
        "description": "SSID de visitantes alcança recursos internos por VLAN/firewall mal configurado.",
        "defensiveExplanation": "O problema não está no SSID em si, mas no mapeamento de política após associação.",
        "mitigation": "Isolamento de cliente, VLAN separada, firewall restritivo, captive portal e logs."
      }
    ],
    "monitoring": [
      "Eventos de associação/desassociação por cliente e BSSID",
      "Falhas de autenticação por SSID",
      "BSSIDs não inventariados",
      "SSIDs similares ao corporativo",
      "Mudanças de canal/RSSI por cliente",
      "Falhas de DHCP após associação"
    ],
    "hardening": [
      "Reduzir SSIDs",
      "Desabilitar métodos legados inseguros",
      "Preferir WPA2/WPA3 Enterprise",
      "Exigir validação de certificado",
      "Configurar rede guest isolada",
      "Ativar PMF quando compatível e apropriado",
      "Integrar logs com SIEM"
    ],
    "detectionIdeas": [
      "Comparar lista de BSSIDs vistos com inventário autorizado",
      "Alertar SSID corporativo em canal/local não esperado",
      "Investigar aumento súbito de deauth/disassoc",
      "Correlacionar falhas 802.1X com mudanças de certificado ou RADIUS",
      "Detectar clientes associados a SSID guest tentando acessar redes internas"
    ]
  },
  "trafficCapture": {
    "tool": "Wireshark com placa compatível com monitor mode, apenas em ambiente próprio/autorizado",
    "filter": "wlan.fc.type_subtype == 8 || wlan.fc.type_subtype == 4 || wlan.fc.type_subtype == 5 || wlan.fc.type_subtype == 11 || wlan.fc.type_subtype == 0 || wlan.fc.type_subtype == 1",
    "whatToObserve": [
      "Beacon",
      "Probe Request",
      "Probe Response",
      "Authentication",
      "Association Request",
      "Association Response",
      "SSID",
      "BSSID",
      "RSN Information",
      "Supported Rates"
    ],
    "interpretation": "O aluno deve perceber que a entrada em uma WLAN é composta por quadros de gerenciamento antes do tráfego IP. A captura deve ser usada apenas para aprendizado e defesa em ambiente autorizado."
  },
  "lab": {
    "id": "lab-12.4",
    "title": "Mapeando SSID, BSSID e associação do seu próprio cliente",
    "labType": "security",
    "objective": "Coletar evidências locais para diferenciar SSID, BSSID, canal, segurança e estado de associação.",
    "scenario": "Você atua no suporte de uma empresa e precisa provar se a estação realmente está associada ao Wi-Fi, a qual BSSID, em qual canal e com qual método de segurança aparente.",
    "topology": "Notebook/desktop com Wi-Fi -> AP/roteador autorizado -> rede local -> gateway/DHCP/DNS.",
    "architecture": "Cliente 802.11 em modo managed associado a um BSSID de uma WLAN autorizada. A validação separa descoberta wireless de conectividade IP.",
    "prerequisites": [
      "Acesso a uma rede Wi-Fi própria ou explicitamente autorizada.",
      "Windows PowerShell ou terminal Linux.",
      "Permissão para coletar informações locais do próprio dispositivo.",
      "Opcional: Wireshark e adaptador compatível com monitor mode em laboratório próprio."
    ],
    "tools": [
      "Windows: PowerShell ou CMD com netsh",
      "Linux: nmcli e iw",
      "Opcional: Wireshark",
      "Editor de texto para anotar evidências"
    ],
    "estimatedTimeMinutes": 60,
    "cost": "zero",
    "safetyNotes": [
      "Não tente associar a redes de terceiros.",
      "Não capture tráfego wireless de terceiros sem autorização formal.",
      "Não execute deauth, evil twin, spoofing de BSSID ou impersonação de AP.",
      "Mascare SSIDs/BSSIDs reais se for compartilhar evidências publicamente.",
      "Use o laboratório para diagnóstico defensivo e inventário."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar o estado atual da conexão no Windows",
        "instruction": "Em um cliente Windows conectado ao Wi-Fi autorizado, identifique SSID, BSSID, canal, sinal e autenticação.",
        "command": "netsh wlan show interfaces",
        "expectedOutput": "Saída contendo SSID, BSSID, Radio type, Authentication, Cipher, Channel e Signal.",
        "explanation": "Este comando prova se o cliente está associado e mostra a célula específica usada, não apenas o nome da rede."
      },
      {
        "number": 2,
        "title": "Listar BSSIDs visíveis no Windows",
        "instruction": "Liste redes visíveis em modo detalhado para observar que um mesmo SSID pode aparecer com múltiplos BSSIDs.",
        "command": "netsh wlan show networks mode=bssid",
        "expectedOutput": "Lista de SSIDs com um ou mais BSSIDs, sinal, canal e autenticação.",
        "explanation": "Em ambientes com múltiplos APs, o mesmo SSID pode ser anunciado por vários BSSIDs."
      },
      {
        "number": 3,
        "title": "Registrar o estado atual da conexão no Linux",
        "instruction": "Em Linux, se aplicável, veja a interface wireless e o BSSID conectado.",
        "command": "iw dev\niw dev wlan0 link",
        "expectedOutput": "Interface wireless e, se conectado, linha 'Connected to <BSSID>' com SSID, frequência e sinal.",
        "explanation": "O BSSID conectado é a célula real, útil para troubleshooting de roaming e cobertura."
      },
      {
        "number": 4,
        "title": "Listar redes visíveis no Linux",
        "instruction": "Liste SSIDs, BSSIDs, canal, frequência, sinal e segurança.",
        "command": "nmcli -f SSID,BSSID,CHAN,FREQ,RATE,SIGNAL,SECURITY dev wifi list",
        "expectedOutput": "Tabela com redes visíveis e seus BSSIDs.",
        "explanation": "A comparação entre SSIDs e BSSIDs ajuda a identificar APs múltiplos, redes duplicadas e segurança anunciada."
      },
      {
        "number": 5,
        "title": "Separar associação de rede IP",
        "instruction": "Depois de confirmar associação, verifique IP, gateway e DNS para provar que são etapas posteriores.",
        "command": "ipconfig /all  # Windows\nip addr && ip route  # Linux\nnslookup exemplo.com  # Windows/Linux",
        "expectedOutput": "Endereço IP, gateway padrão, DNS e resultado de resolução ou erro claro.",
        "explanation": "Um cliente pode estar associado ao Wi-Fi e ainda falhar em DHCP, gateway ou DNS."
      },
      {
        "number": 6,
        "title": "Anotar evidências em uma tabela",
        "instruction": "Crie uma tabela com SSID, BSSID, canal, banda, sinal, segurança, IP, gateway, DNS e sintoma observado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela preenchida com evidências locais.",
        "explanation": "Troubleshooting profissional depende de evidência organizada, não apenas percepção do usuário."
      },
      {
        "number": 7,
        "title": "Opcional: observar quadros de gerenciamento autorizados",
        "instruction": "Em laboratório próprio e com adaptador compatível, use Wireshark para observar beacons/probes/associação sem capturar conteúdo de terceiros.",
        "command": "Filtro Wireshark: wlan.fc.type_subtype == 8 || wlan.fc.type_subtype == 4 || wlan.fc.type_subtype == 5 || wlan.fc.type_subtype == 11 || wlan.fc.type_subtype == 0 || wlan.fc.type_subtype == 1",
        "expectedOutput": "Quadros Beacon, Probe, Authentication e Association quando o ambiente e o adaptador suportam monitor mode.",
        "explanation": "A visualização reforça que antes do IP existem quadros de gerenciamento 802.11."
      }
    ],
    "expectedResult": "O aluno deve conseguir explicar a qual SSID e BSSID está associado, em qual canal, com qual segurança aparente e se a falha observada ocorre antes ou depois da associação.",
    "validation": [
      {
        "check": "Cliente associado tem BSSID identificado",
        "command": "netsh wlan show interfaces  # Windows\niw dev wlan0 link  # Linux",
        "expected": "BSSID ou 'Connected to <BSSID>' aparece na saída.",
        "ifFails": "Confirme se o Wi-Fi está conectado, se a interface correta foi usada e se o driver expõe a informação."
      },
      {
        "check": "Redes visíveis listam SSID e BSSID",
        "command": "netsh wlan show networks mode=bssid  # Windows\nnmcli -f SSID,BSSID,CHAN,FREQ,RATE,SIGNAL,SECURITY dev wifi list  # Linux",
        "expected": "Lista de SSIDs com BSSIDs e sinais.",
        "ifFails": "Verifique se o rádio Wi-Fi está ativado, se há permissão de localização no Windows e se o NetworkManager está em uso no Linux."
      },
      {
        "check": "Associação separada de IP",
        "command": "ipconfig /all  # Windows\nip addr && ip route  # Linux",
        "expected": "IP, máscara/prefixo, gateway e DNS identificáveis.",
        "ifFails": "A associação pode ter ocorrido, mas DHCP/VLAN/gateway pode estar falhando."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Comando mostra SSID, mas BSSID vazio ou indisponível",
        "probableCause": "Driver, sistema operacional ou permissão não expõe a informação.",
        "howToConfirm": "Testar comando alternativo ou verificar em controladora/AP.",
        "fix": "Atualizar driver, usar ferramenta do fabricante ou consultar logs de controladora."
      },
      {
        "symptom": "SSID esperado não aparece",
        "probableCause": "Banda/canal incompatível, sinal fraco, SSID não anunciado, AP fora do ar ou política regional.",
        "howToConfirm": "Comparar com outro dispositivo e verificar controladora/AP.",
        "fix": "Validar configuração de rádio, canal, potência, SSID e compatibilidade do cliente."
      },
      {
        "symptom": "Conecta, mas não recebe IP",
        "probableCause": "VLAN incorreta, DHCP indisponível, ACL, relay ou escopo esgotado.",
        "howToConfirm": "Verificar logs de DHCP, gateway, VLAN do SSID e captura autorizada.",
        "fix": "Corrigir mapeamento SSID-VLAN, DHCP relay, escopo ou política de firewall."
      },
      {
        "symptom": "Cliente associa a BSSID distante",
        "probableCause": "Roaming pegajoso, potência mal ajustada ou ausência de AP adequado próximo.",
        "howToConfirm": "Comparar BSSID, RSSI e localização física.",
        "fix": "Ajustar potência/canais, revisar posicionamento de APs e políticas de roaming."
      }
    ],
    "improvements": [
      "Repetir coleta em dois pontos físicos diferentes e comparar BSSID/RSSI.",
      "Comparar comportamento em 2.4 GHz, 5 GHz e 6 GHz quando disponíveis.",
      "Cruzar evidências locais com logs da controladora.",
      "Criar inventário autorizado de BSSIDs por filial.",
      "Adicionar evidências de DHCP/DNS para completar diagnóstico fim a fim."
    ],
    "evidenceToCollect": [
      "Saída de netsh ou nmcli/iw com SSID e BSSID",
      "Canal e banda/frequência",
      "Método de autenticação/cifra anunciado",
      "IP/gateway/DNS recebidos",
      "Sintoma e horário",
      "Opcional: captura Wireshark de quadros de gerenciamento em laboratório autorizado"
    ],
    "questions": [
      "Qual é a diferença entre SSID e BSSID?",
      "O cliente está associado antes de receber IP?",
      "Que evidência mostra que o problema é depois da associação?",
      "Por que o mesmo SSID pode aparecer várias vezes?",
      "Quais riscos surgem se um BSSID desconhecido anuncia nome parecido com o corporativo?"
    ],
    "challenge": "Você está em uma filial onde usuários reclamam que o SSID corporativo aparece, mas alguns conectam sem internet. Colete evidências para separar falha de associação, falha de autenticação, falha de DHCP, falha de DNS e falha de firewall.",
    "solution": "Primeiro confirme se o SSID aparece e qual BSSID foi escolhido. Depois confirme se a associação ocorreu e se há falhas de autenticação nos logs. Em seguida valide IP, gateway e DNS. Se o cliente tem IP e DNS, teste conectividade com gateway e serviços permitidos. Documente horário, BSSID, canal, RSSI/sinal, método de segurança, IP, gateway, DNS e mensagens de erro. A correção depende da etapa que falhou, e não da frase genérica 'Wi-Fi ruim'."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que SSID e BSSID precisam ser conceitos separados?",
      "hints": [
        "Pense no nome que o usuário vê.",
        "Pense em vários APs anunciando a mesma rede."
      ],
      "expectedIdeas": [
        "SSID é nome lógico",
        "BSSID identifica célula/AP",
        "mesmo SSID pode existir em muitos APs",
        "troubleshooting precisa saber a célula real"
      ],
      "explanation": "Sem BSSID, você sabe qual rede lógica o usuário escolheu, mas não sabe qual AP, rádio, canal e célula estão envolvidos."
    },
    {
      "type": "diagnóstico",
      "question": "Um cliente aparece como associado, mas não recebe IP. Qual hipótese vem depois?",
      "hints": [
        "Associação é camada 2.",
        "IP depende de DHCP/VLAN/gateway."
      ],
      "expectedIdeas": [
        "verificar VLAN",
        "DHCP",
        "relay",
        "escopo",
        "ACL",
        "logs"
      ],
      "explanation": "A associação Wi-Fi pode estar correta; a falha pode estar na integração com a rede cabeada/IP."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa usa o mesmo SSID em todos os andares. Por que isso não significa que todos estão usando o mesmo AP?",
      "hints": [
        "Mesmo nome pode ser anunciado por vários rádios.",
        "O cliente escolhe um BSSID."
      ],
      "expectedIdeas": [
        "ESS",
        "vários BSSIDs",
        "roaming",
        "RSSI",
        "canal",
        "logs por AP"
      ],
      "explanation": "O SSID cria continuidade lógica; o BSSID mostra a célula real escolhida pelo cliente."
    }
  ],
  "quiz": [
    {
      "id": "q12.4.1",
      "type": "conceito",
      "q": "Qual afirmação diferencia corretamente SSID e BSSID?",
      "opts": [
        "SSID é o nome lógico da WLAN; BSSID identifica uma célula/AP rádio específico.",
        "SSID é o endereço MAC do gateway; BSSID é o nome da rede.",
        "SSID é sempre secreto; BSSID é sempre público.",
        "SSID é endereço IP; BSSID é servidor DNS."
      ],
      "a": 0,
      "exp": "SSID é o nome lógico visto pelo usuário; BSSID é um identificador MAC de uma BSS/célula específica.",
      "difficulty": "iniciante",
      "topic": "ssid-bssid"
    },
    {
      "id": "q12.4.2",
      "type": "diagnóstico",
      "q": "Um usuário está associado ao Wi-Fi, mas não recebe endereço IP. Qual camada/serviço deve ser investigado em seguida?",
      "opts": [
        "DHCP/VLAN/gateway, pois associação Wi-Fi não garante configuração IP.",
        "Apenas trocar o SSID.",
        "Apenas aumentar a largura do canal.",
        "Apenas ocultar o SSID."
      ],
      "a": 0,
      "exp": "Depois da associação, DHCP e integração com VLAN/gateway são etapas críticas para conectividade IP.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q12.4.3",
      "type": "segurança",
      "q": "Por que ocultar SSID não deve ser tratado como controle principal de segurança?",
      "opts": [
        "Porque não substitui criptografia, autenticação forte, segmentação e monitoramento.",
        "Porque impede o uso de WPA3.",
        "Porque remove todos os beacons do padrão 802.11.",
        "Porque transforma a rede em cabeada."
      ],
      "a": 0,
      "exp": "SSID oculto pode reduzir visibilidade casual, mas não fornece segurança robusta contra análise ou associação não autorizada.",
      "difficulty": "intermediário",
      "topic": "segurança"
    },
    {
      "id": "q12.4.4",
      "type": "arquitetura",
      "q": "Em uma empresa com 20 APs anunciando o mesmo SSID corporativo, o que provavelmente muda entre eles?",
      "opts": [
        "O BSSID de cada célula/radio/SSID.",
        "O nome lógico do SSID obrigatoriamente.",
        "O protocolo IP usado pelo navegador.",
        "O endereço do site acessado."
      ],
      "a": 0,
      "exp": "O mesmo SSID pode ser anunciado por vários BSSIDs diferentes, permitindo cobertura contínua.",
      "difficulty": "iniciante",
      "topic": "arquitetura"
    },
    {
      "id": "q12.4.5",
      "type": "comando",
      "q": "Qual comando no Windows ajuda a ver o BSSID da conexão Wi-Fi atual?",
      "opts": [
        "netsh wlan show interfaces",
        "ipconfig /flushdns",
        "tracert 8.8.8.8",
        "route print"
      ],
      "a": 0,
      "exp": "netsh wlan show interfaces mostra informações wireless como SSID, BSSID, canal, sinal e autenticação.",
      "difficulty": "iniciante",
      "topic": "comandos"
    },
    {
      "id": "q12.4.6",
      "type": "diagnóstico",
      "q": "O cliente vê o SSID, mas falha antes de receber IP. Qual conclusão é mais cuidadosa?",
      "opts": [
        "A descoberta funcionou; a falha pode estar em associação, segurança, política ou etapa posterior como DHCP.",
        "Com certeza o DNS está errado.",
        "Com certeza o cabo do switch está rompido.",
        "Com certeza o site está fora do ar."
      ],
      "a": 0,
      "exp": "Ver o SSID prova descoberta, mas não prova associação, autenticação, DHCP ou acesso à aplicação.",
      "difficulty": "intermediário",
      "topic": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.4.1",
      "front": "O que é SSID?",
      "back": "É o nome lógico de uma WLAN, normalmente o nome de rede Wi-Fi exibido ao usuário.",
      "tags": [
        "ssid",
        "wireless"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.4.2",
      "front": "O que é BSSID?",
      "back": "É o identificador MAC de uma BSS/célula específica, geralmente associado a um AP/radio/SSID.",
      "tags": [
        "bssid",
        "camada 2"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.4.3",
      "front": "Associação Wi-Fi garante acesso à internet?",
      "back": "Não. Associação é camada 2; depois ainda podem falhar segurança, DHCP, DNS, gateway, firewall ou aplicação.",
      "tags": [
        "associação",
        "troubleshooting"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.4.4",
      "front": "Por que o mesmo SSID pode ter vários BSSIDs?",
      "back": "Porque vários APs/radios podem anunciar a mesma rede lógica para ampliar cobertura e permitir roaming.",
      "tags": [
        "ess",
        "roaming"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.4.5",
      "front": "SSID oculto é segurança forte?",
      "back": "Não. Ele não substitui WPA2/WPA3, 802.1X, segmentação e monitoramento.",
      "tags": [
        "segurança",
        "ssid"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.4.6",
      "front": "Qual evidência local mostra a célula Wi-Fi usada?",
      "back": "O BSSID da conexão atual, visível em comandos como netsh wlan show interfaces ou iw dev wlan0 link.",
      "tags": [
        "evidência",
        "comandos"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex12.4.1",
      "type": "conceitual",
      "prompt": "Explique com suas palavras a diferença entre SSID, BSSID e VLAN.",
      "expectedAnswer": "SSID é o nome lógico da WLAN; BSSID identifica uma célula/AP/radio específica; VLAN é segmentação lógica da rede cabeada/IP aplicada após ou junto à política da WLAN.",
      "explanation": "A confusão entre esses termos causa diagnósticos errados e arquiteturas inseguras."
    },
    {
      "id": "ex12.4.2",
      "type": "diagnóstico",
      "prompt": "Um cliente vê o SSID Empresa-Corp, mas não consegue conectar. Liste cinco hipóteses antes de culpar DNS.",
      "expectedAnswer": "Senha/método WPA, incompatibilidade do cliente, falha 802.1X/certificado/RADIUS, limite/política da controladora, RSSI/SNR ruim, rejeição por ACL ou banda/canal não suportado.",
      "explanation": "DNS só entra depois de associação, segurança e configuração IP."
    },
    {
      "id": "ex12.4.3",
      "type": "comando-output",
      "prompt": "Você rodou netsh wlan show interfaces e viu SSID Empresa-Corp, BSSID aa:bb:cc:11:22:33, Channel 36, Signal 82%. O que cada dado ajuda a diagnosticar?",
      "expectedAnswer": "SSID identifica a rede lógica; BSSID identifica a célula/AP; canal indica frequência/banda usada; sinal ajuda a avaliar qualidade inicial do link.",
      "explanation": "Esses dados permitem cruzar cliente, AP, RF e logs."
    },
    {
      "id": "ex12.4.4",
      "type": "segurança",
      "prompt": "Por que uma rede guest não deve apenas ter SSID diferente, mas também política diferente?",
      "expectedAnswer": "Porque SSID separa o nome lógico, mas o isolamento real depende de VLAN, firewall, ACL, captive portal, isolamento de cliente e logs.",
      "explanation": "Criar SSID sem segmentação pode dar falsa sensação de separação."
    }
  ],
  "challenge": {
    "title": "Diagnóstico de entrada na WLAN corporativa",
    "scenario": "Uma filial possui três APs e um SSID corporativo único. Usuários próximos à sala de reunião reclamam que 'o Wi-Fi conecta, mas cai'. A controladora mostra múltiplas associações e desassociações no mesmo horário.",
    "tasks": [
      "Identificar quais evidências coletar no cliente.",
      "Identificar quais evidências coletar na controladora/AP.",
      "Separar hipóteses de RF, associação, autenticação, DHCP, DNS e firewall.",
      "Propor um plano de teste sem interromper a filial.",
      "Propor mitigação temporária e correção definitiva."
    ],
    "constraints": [
      "Não executar ataques ou testes de desautenticação.",
      "Não alterar todos os APs sem evidência.",
      "Preservar logs e horário dos eventos.",
      "Usar apenas redes autorizadas."
    ],
    "expectedDeliverables": [
      "Tabela de evidências",
      "Linha do tempo",
      "Hipóteses priorizadas",
      "Comandos usados",
      "Plano de validação",
      "Recomendação final"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação por camadas",
        "points": 25,
        "description": "Distingue descoberta, associação, segurança, IP, DNS e aplicação."
      },
      {
        "criterion": "Uso de evidências",
        "points": 25,
        "description": "Usa BSSID, canal, sinal/RSSI, logs e horário em vez de opinião."
      },
      {
        "criterion": "Segurança e ética",
        "points": 20,
        "description": "Não propõe ações ofensivas ou captura indevida."
      },
      {
        "criterion": "Plano operacional",
        "points": 20,
        "description": "Propõe teste de baixo impacto e rollback."
      },
      {
        "criterion": "Clareza executiva",
        "points": 10,
        "description": "Explica para gestão o que está falhando e o impacto."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O primeiro erro seria tratar a reclamação como 'internet ruim'. A análise deve provar onde a falha acontece. Se o cliente alterna BSSIDs, pode ser roaming/RF. Se associa e falha em 802.1X, pode ser certificado/RADIUS. Se associa e autentica, mas fica sem IP, pode ser VLAN/DHCP. Se tem IP e falha por nome, pode ser DNS. Se DNS funciona e serviço não abre, pode ser firewall/proxy/aplicação.",
    "steps": [
      "Coletar SSID, BSSID, canal, sinal, autenticação e horário no cliente.",
      "Coletar logs de associação/desassociação e falhas na controladora.",
      "Comparar BSSID escolhido com localização física do usuário.",
      "Validar IP, gateway e DNS após associação.",
      "Testar com dois modelos de cliente para separar driver de infraestrutura.",
      "Propor ajuste baseado na etapa que falhou: RF/roaming, segurança, DHCP, DNS ou firewall."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar todos os APs imediatamente.",
        "whyItIsWrong": "Sem evidência, a falha pode estar em DHCP, RADIUS, DNS ou configuração."
      },
      {
        "answer": "Ocultar o SSID para melhorar segurança.",
        "whyItIsWrong": "Não resolve instabilidade e não é controle forte."
      },
      {
        "answer": "Aumentar potência máxima de todos os APs.",
        "whyItIsWrong": "Pode piorar co-canal, roaming pegajoso e interferência."
      }
    ],
    "finalAnswer": "A solução profissional é montar uma linha do tempo com BSSID, canal, sinal/RSSI, eventos de associação/desassociação, autenticação, IP, DNS e testes de aplicação. A correção só deve ser aplicada após identificar a etapa falha. Para sala de reunião, hipóteses fortes são RF/roaming, capacidade, potência/canal, interferência ou falhas intermitentes de autenticação se os logs mostrarem rejeição."
  },
  "glossary": [
    {
      "term": "SSID",
      "shortDefinition": "Nome lógico de uma rede Wi-Fi.",
      "longDefinition": "Service Set Identifier é o identificador textual de uma WLAN, geralmente exibido ao usuário como o nome da rede.",
      "example": "Empresa-Corp ou Empresa-Guest.",
      "relatedTerms": [
        "BSSID",
        "ESS",
        "WLAN"
      ],
      "relatedLessons": [
        "12.1",
        "12.4",
        "12.5"
      ]
    },
    {
      "term": "BSSID",
      "shortDefinition": "Identificador MAC de uma célula Wi-Fi específica.",
      "longDefinition": "Basic Service Set Identifier normalmente representa a célula/radio/AP específico que anuncia um SSID.",
      "example": "Um prédio pode ter o SSID Empresa-Corp anunciado por vários BSSIDs.",
      "relatedTerms": [
        "SSID",
        "BSS",
        "AP",
        "MAC"
      ],
      "relatedLessons": [
        "3.x",
        "12.4",
        "12.6"
      ]
    },
    {
      "term": "Beacon",
      "shortDefinition": "Quadro de gerenciamento que anuncia uma BSS.",
      "longDefinition": "Beacon frames são transmitidos periodicamente por APs para anunciar presença, capacidades e parâmetros da rede.",
      "example": "Um cliente pode descobrir redes ouvindo beacons.",
      "relatedTerms": [
        "probe",
        "SSID",
        "BSSID"
      ],
      "relatedLessons": [
        "12.2",
        "12.4"
      ]
    },
    {
      "term": "Probe Request",
      "shortDefinition": "Quadro usado pelo cliente para procurar redes.",
      "longDefinition": "Probe Request permite scanning ativo, onde o cliente pergunta por redes disponíveis ou por um SSID específico.",
      "example": "Um notebook pode enviar probe para descobrir se Empresa-Corp está disponível.",
      "relatedTerms": [
        "Probe Response",
        "scanning ativo"
      ],
      "relatedLessons": [
        "12.4"
      ]
    },
    {
      "term": "Associação 802.11",
      "shortDefinition": "Vínculo de camada 2 entre cliente e AP.",
      "longDefinition": "Processo pelo qual a estação cliente passa a ser reconhecida como associada a uma BSS específica.",
      "example": "Após Association Response bem-sucedido, o cliente está associado ao BSSID.",
      "relatedTerms": [
        "Authentication",
        "AID",
        "BSSID"
      ],
      "relatedLessons": [
        "12.4",
        "12.5",
        "12.6"
      ]
    },
    {
      "term": "ESS",
      "shortDefinition": "Conjunto estendido de serviço formado por múltiplas BSSs.",
      "longDefinition": "Extended Service Set permite que múltiplos APs ofereçam uma rede lógica contínua, geralmente com o mesmo SSID.",
      "example": "Um campus com vários APs anunciando Empresa-Corp.",
      "relatedTerms": [
        "BSS",
        "SSID",
        "roaming"
      ],
      "relatedLessons": [
        "12.4",
        "12.6",
        "12.7"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "IEEE 802.11-2020 - Wireless LAN Medium Access Control and Physical Layer Specifications",
      "organization": "IEEE",
      "url": "https://standards.ieee.org/ieee/802.11/7028/",
      "note": "Referência primária da família 802.11 para WLANs."
    },
    {
      "type": "official-doc",
      "title": "802.11 Association Process Explained",
      "organization": "Cisco Meraki",
      "url": "https://documentation.meraki.com/Wireless/Design_and_Configure/Architecture_and_Best_Practices/802.11_Association_Process_Explained",
      "note": "Documentação operacional sobre processo de associação e etapas posteriores."
    },
    {
      "type": "official-doc",
      "title": "Service Set Identifiers",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/td/docs/routers/access/wireless/software/guide/ServiceSetID.html",
      "note": "Referência sobre SSID, beacon e probe em configuração Cisco."
    },
    {
      "type": "official-doc",
      "title": "Display Filter Reference: IEEE 802.11 wireless LAN",
      "organization": "Wireshark",
      "url": "https://www.wireshark.org/docs/dfref/w/wlan.html",
      "note": "Referência oficial de campos e filtros 802.11 no Wireshark."
    },
    {
      "type": "official-doc",
      "title": "Common Wireless Event Log Messages and Issues",
      "organization": "Cisco Meraki",
      "url": "https://documentation.meraki.com/Wireless/Troubleshooting_and_Support/Troubleshooting/Common_Wireless_Event_Log_Messages_and_Issues",
      "note": "Referência operacional para logs de associação, canal e RSSI."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "BSSID usa endereço MAC e depende do entendimento de quadros e camada 2."
    },
    {
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "Após associação, o cliente depende de DHCP, DNS e gateway."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "SSID guest e corporativo precisam de firewall, ACLs e políticas de tráfego."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "módulos de autenticação corporativa",
      "lesson": "802.1X/RADIUS/certificados",
      "reason": "A próxima aula conecta associação Wi-Fi com identidade, certificados e autorização corporativa."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "automação e observabilidade",
      "lesson": "IaC, logs e políticas",
      "reason": "Configurações de SSID e políticas wireless podem ser governadas por automação e revisão."
    }
  ],
  "pedagogicalMap": {
    "problem": "Conectar ao Wi-Fi mistura descoberta, associação, segurança, IP, DNS e aplicação em uma frase só.",
    "concept": "SSID é nome lógico; BSSID é célula específica; associação é vínculo 802.11; autorização vem depois.",
    "internalMechanism": "Beacon/probe descobrem a rede, autenticação 802.11 inicial prepara a associação, associação cria vínculo com AP e segurança/IP ocorrem depois.",
    "realUse": "Diagnóstico de conexão, roaming, AP falso, rede guest, 802.1X e logs de controladora.",
    "commonMistake": "Culpar DNS ou internet quando a falha ainda está em descoberta ou associação; ou culpar Wi-Fi quando a falha está em DHCP/firewall.",
    "securityImpact": "SSID/BSSID são evidências de defesa, mas não substituem criptografia, autenticação forte e segmentação.",
    "operationalImpact": "Exige inventário de SSIDs/BSSIDs, logs e padronização para reduzir suporte reativo.",
    "summary": "Entender a entrada na WLAN é pré-requisito para WPA/WPA3, 802.1X, roaming e troubleshooting profissional."
  },
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
      "12.5"
    ]
  }
};
