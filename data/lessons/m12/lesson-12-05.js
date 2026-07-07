export const lesson1205 = {
  "id": "12.5",
  "moduleId": "m12",
  "order": 5,
  "title": "WPA2, WPA3, PSK, Enterprise e 802.1X",
  "subtitle": "Como Wi-Fi deixa de ser apenas uma rede com senha e passa a ser controle de acesso com identidade, chaves, certificados, RADIUS, segmentação e logs.",
  "duration": "100-140 min",
  "estimatedStudyTimeMinutes": 140,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 240,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "wpa2",
    "wpa3",
    "psk",
    "sae",
    "802.1x",
    "eap",
    "radius",
    "certificados",
    "iam",
    "segurança"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.1",
      "reason": "É necessário entender Wi-Fi como meio de acesso local por rádio."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.2",
      "reason": "Falhas de autenticação podem ser confundidas com RF ruim; RSSI, ruído e SNR precisam estar claros."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.3",
      "reason": "WPA3, PMF, 6 GHz e Wi-Fi 7 dependem de compatibilidade de geração entre cliente e AP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.4",
      "reason": "Antes de WPA/802.1X o cliente precisa descobrir SSID, escolher BSSID e associar."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "autenticação corporativa",
      "lesson": "conceitos de identidade, certificados e autorização",
      "reason": "802.1X corporativo se conecta diretamente a identidade, diretório, certificados e políticas."
    }
  ],
  "objectives": [
    "Diferenciar rede aberta, WPA2-Personal, WPA3-Personal, WPA2/WPA3-Enterprise e OWE.",
    "Explicar por que PSK compartilhada é operacionalmente fraca para redes corporativas.",
    "Descrever o papel de 802.1X, EAP, EAPOL, RADIUS, supplicant, authenticator e authentication server.",
    "Relacionar EAP-TLS, certificados e validação de servidor com proteção contra redes falsas.",
    "Entender PMF, SAE, modo de transição e riscos de compatibilidade com clientes legados.",
    "Planejar segmentação, logs e troubleshooting para redes wireless corporativas."
  ],
  "learningOutcomes": [
    "Dado um cenário, o aluno escolhe entre PSK, WPA3-Personal e Enterprise justificando segurança, operação e custo.",
    "Dado um erro de autenticação, o aluno separa RF, associação, 802.1X, RADIUS, certificado, DHCP e firewall.",
    "Dado um desenho de rede com visitantes, funcionários e IoT, o aluno propõe SSIDs, VLANs, método de autenticação e logs.",
    "Dado um perfil Wi-Fi Enterprise, o aluno reconhece riscos de não validar certificado do servidor.",
    "Dado um parque legado, o aluno cria plano de transição sem reduzir permanentemente a segurança."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n\n  <p>Na aula anterior você viu que o cliente não “entra na internet” quando clica em um SSID. Ele primeiro descobre uma WLAN, escolhe um BSSID, executa etapas de autenticação e associação 802.11, e só depois tenta obter IP, DNS, rota e acesso a serviços. Agora vem a pergunta crítica: como a rede prova que o cliente pode entrar, como o cliente prova que está falando com a rede correta, e como o tráfego sem fio é protegido contra leitura ou adulteração?</p>\n  <p>Essa pergunta é mais importante em Wi-Fi do que em rede cabeada por um motivo simples: o rádio atravessa paredes, corredores, estacionamento, recepção e, às vezes, até o prédio vizinho. Em uma porta cabeada, alguém normalmente precisa acesso físico ao ponto de rede. Em Wi-Fi, a superfície de exposição começa onde o sinal chega. Por isso, senha fraca, rede aberta, PSK compartilhada por anos, certificado ignorado ou 802.1X mal configurado não são detalhes; são decisões de arquitetura de acesso.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> uma empresa usa o mesmo WPA2-PSK para funcionários, visitantes, prestadores e IoT. A senha circula em grupos, ex-funcionários continuam sabendo a chave, câmeras e notebooks ficam na mesma VLAN, não há logs por identidade e ninguém sabe qual usuário estava em qual IP durante um incidente. A rede “tem senha”, mas não tem controle corporativo de acesso.</div>\n  <p>O objetivo desta aula é separar os modelos de segurança wireless: redes abertas, OWE, WPA2-Personal, WPA3-Personal com SAE, WPA2/WPA3-Enterprise com 802.1X, EAP, RADIUS, certificados, PSK, PMF, VLAN dinâmica e logs. Ao final, você deve conseguir explicar quando PSK é aceitável, quando Enterprise é necessário, por que certificado importa, por que WPA3 não resolve tudo sozinho e como diagnosticar falhas de autenticação sem confundir RF, associação, DHCP e firewall.</p>\n\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n\n  <p>As primeiras redes Wi-Fi nasceram em um contexto em que mobilidade era novidade e segurança muitas vezes era tratada como complemento. O WEP tentou oferecer uma proteção parecida com a “privacidade equivalente ao cabeado”, mas a história mostrou que esse modelo era frágil. O problema não era apenas o algoritmo: era a combinação de desenho criptográfico inadequado, chaves compartilhadas, baixa rotação de chaves e falsa sensação de segurança.</p>\n  <p>A evolução passou por WPA, WPA2 e pelo modelo RSN, Robust Security Network, que consolidou autenticação, negociação de chaves e criptografia mais robusta. O WPA2 tornou-se por muitos anos o padrão prático dominante, tanto em modo Personal, com senha compartilhada, quanto em modo Enterprise, com 802.1X e autenticação centralizada.</p>\n  <p>Com o crescimento de BYOD, IoT, trabalho híbrido, cloud, auditoria, LGPD, SOC e Zero Trust, uma única senha de Wi-Fi deixou de ser aceitável para redes corporativas críticas. Surgiu a necessidade de associar acesso a identidade, certificado, postura, grupo, dispositivo, horário, localização, VLAN e logs. É aí que 802.1X, EAP, RADIUS, certificados e NAC entram no desenho.</p>\n  <p>O WPA3 surgiu para elevar a segurança, especialmente substituindo PSK puro por SAE no modo Personal, tornando PMF obrigatório em muitos cenários modernos e adicionando perfis Enterprise mais fortes. Porém, a evolução não eliminou todos os desafios: compatibilidade com clientes legados, IoT antigo, transição WPA2/WPA3, certificados mal validados e operação de RADIUS continuam sendo pontos críticos.</p>\n\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n\n  <p>O problema técnico não é apenas “colocar uma senha no Wi-Fi”. O problema é controlar acesso a uma rede exposta por rádio, com clientes variados, mobilidade, múltiplos APs, roaming, dispositivos pessoais, dispositivos corporativos, convidados, IoT e integração com sistemas internos.</p>\n  <ul class=\"flow-list\">\n    <li><strong>Confidencialidade:</strong> quem está no alcance do rádio pode tentar observar quadros; a rede precisa proteger dados no enlace.</li>\n    <li><strong>Autenticação:</strong> a rede precisa decidir quem pode entrar, e o cliente precisa ter meios de confiar que está falando com a rede correta.</li>\n    <li><strong>Autorização:</strong> entrar no SSID não deve significar acesso irrestrito a tudo; usuário, dispositivo e contexto devem influenciar políticas.</li>\n    <li><strong>Revogação:</strong> quando uma pessoa sai da empresa, trocar a senha de todos os dispositivos é operacionalmente ruim; credenciais individuais são mais auditáveis.</li>\n    <li><strong>Auditoria:</strong> em incidente, é preciso responder quem autenticou, em qual AP, quando, com qual método, recebeu qual IP e foi colocado em qual VLAN.</li>\n    <li><strong>Compatibilidade:</strong> clientes antigos podem não suportar WPA3, PMF obrigatório, certificados modernos ou métodos EAP mais seguros.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Erro comum:</strong> achar que WPA2/WPA3 é uma decisão puramente criptográfica. Em empresa, segurança wireless é também identidade, inventário, PKI, RADIUS, logs, segmentação, ciclo de vida de dispositivos e resposta a incidente.</div>\n\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n\n  <p>A evolução da segurança Wi-Fi pode ser entendida como uma saída gradual de “todo mundo compartilha uma chave” para “cada usuário ou dispositivo prova sua identidade e recebe autorização adequada”.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Modelo</th><th>Como funciona</th><th>Vantagem</th><th>Limitação</th><th>Uso recomendado</th></tr></thead>\n    <tbody>\n      <tr><td>Aberta</td><td>Associação sem senha e sem criptografia de enlace tradicional.</td><td>Baixa fricção.</td><td>Exposição e pouca garantia de privacidade no enlace.</td><td>Evitar para redes internas; usar apenas com portal/segmentação/OWE quando aplicável.</td></tr>\n      <tr><td>OWE / Enhanced Open</td><td>Criptografa enlace em redes abertas, sem autenticar o usuário como uma senha faria.</td><td>Melhora privacidade em hotspots.</td><td>Não substitui autenticação corporativa.</td><td>Visitantes e ambientes públicos com segmentação forte.</td></tr>\n      <tr><td>WPA2-Personal</td><td>Usa PSK compartilhada entre clientes autorizados.</td><td>Simples e amplamente compatível.</td><td>Senha compartilhada, difícil revogação individual e risco com PSK fraca.</td><td>Casa, laboratório, pequenos ambientes de baixo risco.</td></tr>\n      <tr><td>WPA3-Personal</td><td>Usa SAE no lugar do PSK clássico.</td><td>Melhor resistência contra ataques de dicionário offline e melhora o handshake.</td><td>Ainda depende de senha boa e compatibilidade de clientes.</td><td>Redes pessoais e pequenas redes modernas.</td></tr>\n      <tr><td>WPA2/WPA3-Enterprise</td><td>Usa 802.1X, EAP e servidor de autenticação, normalmente RADIUS.</td><td>Identidade individual, logs, revogação e políticas por usuário/dispositivo.</td><td>Exige PKI, configuração de clientes, RADIUS e operação madura.</td><td>Empresas, órgãos públicos, universidades e ambientes auditáveis.</td></tr>\n    </tbody>\n  </table>\n  <p>A grande virada não é apenas de WPA2 para WPA3, mas de segurança baseada em segredo compartilhado para segurança baseada em identidade, certificados, política e monitoramento.</p>\n\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n\n  <p>WPA, Wi-Fi Protected Access, é uma família de mecanismos de segurança para redes Wi-Fi. Em termos práticos, ela define como clientes e access points autenticam, derivam chaves e protegem quadros de dados. WPA2 e WPA3 são gerações diferentes dessa família.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> WPA2/WPA3-Personal usa uma credencial compartilhada ou um protocolo de senha para redes menores; WPA2/WPA3-Enterprise usa 802.1X/EAP para autenticação centralizada, normalmente com RADIUS, permitindo identidade individual, certificados e políticas.</div>\n  <p>Os componentes principais são:</p>\n  <ul>\n    <li><strong>Supplicant:</strong> o cliente que quer acessar a rede, como notebook, celular ou equipamento IoT.</li>\n    <li><strong>Authenticator:</strong> o AP ou controladora que controla a entrada do cliente na WLAN.</li>\n    <li><strong>Authentication Server:</strong> normalmente um servidor RADIUS, que valida credenciais, certificados e políticas.</li>\n    <li><strong>EAP:</strong> framework que permite múltiplos métodos de autenticação, como EAP-TLS, PEAP e EAP-TTLS.</li>\n    <li><strong>EAPOL:</strong> encapsulamento usado no enlace entre cliente e AP durante 802.1X.</li>\n    <li><strong>PMK/PTK/GTK:</strong> chaves derivadas e usadas para proteger tráfego unicast e de grupo.</li>\n    <li><strong>PMF:</strong> proteção de certos quadros de gerenciamento para reduzir abusos contra a própria administração da conexão.</li>\n  </ul>\n\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Para entender WPA2/WPA3 e 802.1X, separe o fluxo em camadas. Primeiro o cliente descobre e associa ao BSSID. Depois ocorre a autenticação de segurança. Só depois a porta controlada é aberta para tráfego de dados normal.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Descoberta:</strong> o cliente vê beacons ou envia probes para encontrar o SSID.</li>\n    <li><strong>Associação 802.11:</strong> o cliente negocia capacidades básicas com o AP.</li>\n    <li><strong>Autenticação de segurança:</strong> em Personal, usa PSK ou SAE; em Enterprise, inicia EAPOL e 802.1X.</li>\n    <li><strong>Validação pelo servidor:</strong> no modo Enterprise, o AP encaminha a conversa EAP para o RADIUS. O servidor valida usuário, dispositivo, certificado, grupo e política.</li>\n    <li><strong>Derivação de chaves:</strong> cliente e infraestrutura derivam chaves para proteger tráfego unicast e de grupo.</li>\n    <li><strong>Abertura da porta controlada:</strong> após sucesso, o cliente pode enviar dados normais, como DHCP, ARP, DNS, HTTP e tráfego corporativo.</li>\n    <li><strong>Autorização e segmentação:</strong> a resposta RADIUS pode indicar VLAN, ACL, perfil, grupo ou regra aplicada ao cliente.</li>\n    <li><strong>Logs e auditoria:</strong> AP, controladora, RADIUS, NAC, DHCP, DNS e firewall registram evidências complementares.</li>\n  </ol>\n  <p>No 802.1X, o cliente não precisa de IP para começar a autenticação EAP. Isso é essencial: se a falha ocorre antes da autenticação, olhar DHCP ou DNS pode ser perda de tempo. A autenticação acontece no enlace, antes do tráfego IP comum ser liberado.</p>\n  <div class=\"callout callout--mentor\"><strong>Modelo mental:</strong> associação cria a relação rádio; WPA/802.1X decide se a relação é confiável; DHCP/DNS/firewall entram depois que o acesso de dados foi liberado.</div>\n\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Em uma arquitetura corporativa, segurança Wi-Fi não fica só no AP. Ela cruza access point, controladora, RADIUS, diretório, PKI, MDM, NAC, switches, VLANs, firewall, SIEM e processos de suporte.</p>\n  <ul>\n    <li><strong>AP/controladora:</strong> anuncia SSID, aplica método de segurança, conversa com RADIUS e aplica perfil de acesso.</li>\n    <li><strong>RADIUS/NAC:</strong> decide se o cliente pode entrar e qual política será aplicada.</li>\n    <li><strong>Diretório/IAM:</strong> fornece identidade, grupos, status de conta e, às vezes, MFA em fluxos complementares.</li>\n    <li><strong>PKI:</strong> em EAP-TLS, emite certificados para usuários/dispositivos e permite autenticação forte mútua.</li>\n    <li><strong>MDM/gestão de endpoints:</strong> distribui perfis Wi-Fi, certificados e configurações seguras para reduzir erro humano.</li>\n    <li><strong>Firewall/segmentação:</strong> limita o que cada classe de cliente acessa após entrar na rede.</li>\n    <li><strong>SIEM/SOC:</strong> correlaciona autenticação, DHCP, DNS, proxy, firewall e logs wireless.</li>\n  </ul>\n  <p>A arquitetura correta separa ao menos funcionários, visitantes, IoT e administração. Em ambientes maduros, a separação pode ser dinâmica: o mesmo SSID corporativo autentica usuários diferentes e os coloca em VLANs ou políticas diferentes com base na identidade, certificado, postura ou grupo.</p>\n\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em um prédio corporativo. O SSID é a placa na entrada: “Empresa-Corporativo”. O BSSID é uma porta específica daquele prédio. A associação é chegar à recepção. WPA2/WPA3-Personal é como uma senha única compartilhada com todos. WPA Enterprise com 802.1X é como apresentar crachá individual, documento, autorização no sistema e receber acesso apenas aos andares permitidos.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes reais, autenticação e criptografia não são apenas “mostrar crachá”. Elas também derivam chaves temporárias, protegem quadros, integram servidores e registram eventos para auditoria.</div>\n\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Em casa, usar WPA3-Personal com uma senha longa e exclusiva é uma escolha razoável se seus dispositivos suportam. Se houver dispositivos antigos, talvez seja necessário usar WPA2/WPA3 transition mode, mas isso pode reduzir parte do benefício esperado e precisa ser entendido como transição, não como destino ideal.</p>\n  <p>Um erro doméstico comum é usar a senha padrão do roteador, repetir senha usada em outros serviços, compartilhar a senha com visitantes e manter IoT na mesma rede dos notebooks. Mesmo em casa, uma rede de convidados ou IoT separada reduz risco.</p>\n\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, o SSID de funcionários deve preferencialmente usar WPA2/WPA3-Enterprise com 802.1X. O melhor cenário costuma ser EAP-TLS, com certificados gerenciados em dispositivos corporativos. Isso permite revogar acesso por usuário/dispositivo, reduzir dependência de senha humana, aplicar políticas por grupo e registrar eventos por identidade.</p>\n  <p>Visitantes não devem usar a mesma rede dos funcionários. Prestadores podem ter SSID ou perfil dedicado. IoT deve ser segmentado, porque muitos dispositivos não suportam métodos modernos e possuem ciclo de vida fraco. A segurança não termina na autenticação: firewall, VLAN, logs e inventário continuam obrigatórios.</p>\n\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em arquiteturas modernas, a controladora Wi-Fi, o NAC, o RADIUS ou a gestão de certificados podem estar em cloud ou integrados a serviços SaaS. Isso permite padronizar SSIDs em filiais, distribuir políticas, coletar telemetria, empurrar perfis para dispositivos e correlacionar identidade com logs.</p>\n  <p>O cuidado é que autenticação wireless se torna dependente de conectividade, disponibilidade e desenho híbrido. Se o RADIUS ou serviço de identidade cloud fica inacessível, novos clientes podem falhar ao autenticar. Em projetos corporativos, é comum planejar redundância, servidores locais, cache, failover, timeouts coerentes e plano de contingência.</p>\n\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, a configuração de WLAN deve ser tratada como configuração crítica, não como ajuste manual esquecido na controladora. SSIDs, métodos de segurança, políticas RADIUS, grupos, VLANs, certificados e exceções precisam de revisão, versionamento e fluxo de aprovação.</p>\n  <p>Um pipeline de infraestrutura pode validar que SSIDs corporativos não usam PSK, que redes guest não acessam sub-redes internas, que PMF está habilitado quando exigido, que logs são enviados ao SIEM e que exceções para IoT possuem prazo de revisão. A lógica é a mesma de firewall as code: segurança wireless também precisa ser governada por processo.</p>\n\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista defensivo, os riscos variam conforme o modelo de autenticação.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>PSK compartilhada</td><td>A mesma senha é usada por muitos usuários e dispositivos.</td><td>Sem revogação individual e baixa rastreabilidade.</td><td>Usar 802.1X para rede corporativa; usar PSKs individuais quando suportado; segmentar.</td></tr>\n      <tr><td>Senha fraca</td><td>PSK curta, previsível, padrão ou reaproveitada.</td><td>Risco de descoberta da senha e acesso indevido.</td><td>Senha longa, rotação planejada, WPA3-SAE quando possível e monitoramento.</td></tr>\n      <tr><td>Certificado não validado</td><td>Cliente aceita qualquer servidor RADIUS ou usuário ignora alerta.</td><td>Risco de captura de credenciais em rede falsa.</td><td>Distribuir perfil Wi-Fi gerenciado, validar CA e nome do servidor, preferir EAP-TLS.</td></tr>\n      <tr><td>IoT legado</td><td>Dispositivo só suporta WPA2-PSK ou método fraco.</td><td>Ponto fraco dentro da rede.</td><td>Rede dedicada, ACL mínima, inventário, atualização ou substituição planejada.</td></tr>\n      <tr><td>PMF ausente</td><td>Quadros de gerenciamento ficam menos protegidos.</td><td>Maior exposição a abuso de gerenciamento.</td><td>Habilitar PMF onde suportado e planejar compatibilidade.</td></tr>\n    </tbody>\n  </table>\n  <div class=\"callout callout--security\"><strong>Limite ético:</strong> esta aula explica riscos para defesa, arquitetura e diagnóstico. Não execute captura de credenciais, impersonação de AP, ataques de desautenticação ou testes contra redes sem autorização formal.</div>\n\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 460\" role=\"img\" aria-labelledby=\"wpa-8021x-title wpa-8021x-desc\">\n    <title id=\"wpa-8021x-title\">Fluxo WPA Enterprise com 802.1X, RADIUS e segmentação</title>\n    <desc id=\"wpa-8021x-desc\">Cliente Wi-Fi se associa ao access point, executa EAPOL/802.1X, o AP consulta o servidor RADIUS, recebe política e libera tráfego para VLAN e firewall.</desc>\n    <defs>\n      <marker id=\"arrow-wpa\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"35\" y=\"165\" width=\"150\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"110\" y=\"198\" text-anchor=\"middle\" class=\"svg-label\">Supplicant</text>\n    <text x=\"110\" y=\"222\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">notebook/celular</text>\n    <text x=\"110\" y=\"244\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">sem IP ainda</text>\n\n    <rect x=\"280\" y=\"145\" width=\"170\" height=\"130\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"365\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">AP</text>\n    <text x=\"365\" y=\"203\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Authenticator</text>\n    <text x=\"365\" y=\"226\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta controlada</text>\n    <text x=\"365\" y=\"249\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">EAPOL</text>\n\n    <rect x=\"560\" y=\"55\" width=\"170\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"645\" y=\"90\" text-anchor=\"middle\" class=\"svg-label\">RADIUS/NAC</text>\n    <text x=\"645\" y=\"116\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Authentication</text>\n    <text x=\"645\" y=\"139\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Server</text>\n\n    <rect x=\"560\" y=\"245\" width=\"170\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"645\" y=\"280\" text-anchor=\"middle\" class=\"svg-label\">IAM/PKI</text>\n    <text x=\"645\" y=\"306\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">usuário</text>\n    <text x=\"645\" y=\"329\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">certificado</text>\n\n    <rect x=\"835\" y=\"95\" width=\"205\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"937\" y=\"130\" text-anchor=\"middle\" class=\"svg-label\">VLAN/Perfil</text>\n    <text x=\"937\" y=\"156\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">funcionário</text>\n    <text x=\"937\" y=\"179\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">guest / IoT</text>\n\n    <rect x=\"835\" y=\"270\" width=\"205\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"937\" y=\"306\" text-anchor=\"middle\" class=\"svg-label\">Firewall + SIEM</text>\n    <text x=\"937\" y=\"332\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política</text>\n    <text x=\"937\" y=\"355\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs</text>\n\n    <line x1=\"185\" y1=\"200\" x2=\"280\" y2=\"200\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wpa)\" />\n    <text x=\"232\" y=\"180\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">associação</text>\n    <line x1=\"185\" y1=\"230\" x2=\"280\" y2=\"245\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wpa)\" />\n    <text x=\"233\" y=\"270\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">EAPOL</text>\n    <line x1=\"450\" y1=\"177\" x2=\"560\" y2=\"110\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wpa)\" />\n    <text x=\"505\" y=\"118\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RADIUS</text>\n    <line x1=\"645\" y1=\"165\" x2=\"645\" y2=\"245\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wpa)\" />\n    <text x=\"690\" y=\"214\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">validar</text>\n    <line x1=\"730\" y1=\"112\" x2=\"835\" y2=\"146\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-wpa)\" />\n    <text x=\"785\" y=\"110\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Access-Accept</text>\n    <line x1=\"940\" y1=\"205\" x2=\"940\" y2=\"270\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-wpa)\" />\n    <line x1=\"450\" y1=\"247\" x2=\"835\" y2=\"320\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-wpa)\" />\n    <text x=\"610\" y=\"390\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Depois do sucesso: DHCP, DNS, aplicações e logs</text>\n    <rect x=\"250\" y=\"25\" width=\"520\" height=\"390\" rx=\"18\" class=\"svg-boundary\" />\n    <text x=\"510\" y=\"437\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Autenticação antes do acesso IP normal</text>\n  </svg>\n\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n\n  <p>Este laboratório é uma análise defensiva do método de segurança da sua rede Wi-Fi atual e um exercício de desenho de uma arquitetura 802.1X. Ele não exige montar um servidor RADIUS real, mas prepara você para reconhecer evidências, separar camadas e documentar riscos.</p>\n  <p>Você vai coletar o método de autenticação e cifra anunciados pelo sistema operacional, identificar se está em PSK ou Enterprise, mapear o que deveria aparecer em logs e propor uma migração segura para rede corporativa com 802.1X.</p>\n\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios forçam produção ativa: escolher modelo de segurança, interpretar sintomas, separar autenticação de IP e desenhar políticas para diferentes tipos de dispositivos.</p>\n\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n\n  <p>Você receberá um cenário de empresa que ainda usa PSK compartilhada e precisa migrar para Wi-Fi corporativo auditável sem derrubar operação, sem expor IoT e sem criar custo desnecessário.</p>\n\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra o raciocínio de migração: primeiro inventário, depois classificação de clientes, depois desenho de SSIDs, depois 802.1X/certificados, depois segmentação, logs, exceções e plano de rollback.</p>\n\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n\n  <ul>\n    <li><strong>Ideia central:</strong> WPA2/WPA3 protegem o acesso wireless, mas o modelo Personal e o Enterprise resolvem problemas diferentes.</li>\n    <li><strong>O que lembrar:</strong> PSK é simples, mas fraco para auditoria corporativa; 802.1X traz identidade, política e revogação individual.</li>\n    <li><strong>Erro comum:</strong> achar que WPA3 sozinho substitui gestão de certificados, segmentação, logs e inventário.</li>\n    <li><strong>Uso real:</strong> redes corporativas seguras combinam 802.1X, RADIUS, PKI, VLAN/ACL, MDM/NAC, firewall e SIEM.</li>\n  </ul>\n\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, você vai estudar roaming, múltiplos APs e experiência do usuário. A segurança desta aula impacta diretamente o roaming: autenticação lenta, certificados mal distribuídos, PMF incompatível, 802.1X sem otimização e APs mal planejados podem transformar mobilidade em desconexão.</p>\n\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede após autorização"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet após liberação"
    ],
    "relatedProtocols": [
      "IEEE 802.11",
      "WPA2",
      "WPA3",
      "802.1X",
      "EAP",
      "EAPOL",
      "RADIUS",
      "DHCP",
      "DNS",
      "TLS"
    ],
    "dependsOn": [
      "RF",
      "SSID",
      "BSSID",
      "associação",
      "quadros 802.11",
      "identidade",
      "certificados"
    ],
    "enables": [
      "Wi-Fi corporativo",
      "NAC",
      "VLAN dinâmica",
      "auditoria",
      "Zero Trust",
      "roaming seguro",
      "segmentação por identidade"
    ]
  },
  "protocolFields": [
    {
      "field": "AKM",
      "size": "campo/seleção variável",
      "purpose": "Indicar o método de autenticação e gerenciamento de chaves, como PSK, SAE ou 802.1X.",
      "securityObservation": "AKM define o modelo de confiança; escolher PSK em rede corporativa reduz auditoria e revogação."
    },
    {
      "field": "EAPOL",
      "size": "quadros de enlace",
      "purpose": "Transportar autenticação 802.1X entre cliente e AP antes do tráfego IP normal.",
      "securityObservation": "Falhas em EAPOL indicam problema antes de DHCP/DNS; capturar EAPOL em laboratório autorizado ajuda diagnóstico."
    },
    {
      "field": "RADIUS Access-Request/Accept/Reject",
      "size": "mensagens UDP variáveis",
      "purpose": "Levar credenciais, atributos e decisão entre AP/controladora e servidor RADIUS.",
      "securityObservation": "Logs RADIUS são evidência central de autenticação, autorização, motivo de rejeição e perfil aplicado."
    },
    {
      "field": "PMF",
      "size": "capacidade/obrigatoriedade anunciada",
      "purpose": "Proteger quadros de gerenciamento selecionados.",
      "securityObservation": "PMF obrigatório melhora segurança, mas pode quebrar clientes legados; exige inventário."
    },
    {
      "field": "EAP certificate validation",
      "size": "configuração de cliente/perfil",
      "purpose": "Garantir que o cliente confia no servidor de autenticação correto.",
      "securityObservation": "Sem validação de CA e nome do servidor, o usuário pode entregar credenciais a infraestrutura falsa."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Descobre SSID e escolhe BSSID.",
      "detail": "Usa beacons/probes e critérios de RF/capacidade.",
      "possibleFailure": "SSID não aparece, BSSID fraco, banda incompatível ou política regional."
    },
    {
      "step": 2,
      "actor": "Cliente e AP",
      "action": "Executam autenticação/associação 802.11.",
      "detail": "Criam vínculo de enlace com o AP.",
      "possibleFailure": "Associação rejeitada por capacidade, limite de clientes ou política."
    },
    {
      "step": 3,
      "actor": "Cliente e AP",
      "action": "Iniciam segurança WPA/802.1X.",
      "detail": "Personal usa PSK/SAE; Enterprise usa EAPOL/802.1X.",
      "possibleFailure": "Senha errada, método incompatível, certificado inválido ou PMF incompatível."
    },
    {
      "step": 4,
      "actor": "AP/controladora",
      "action": "Consulta RADIUS em modo Enterprise.",
      "detail": "Envia Access-Request e recebe Access-Accept/Reject com atributos.",
      "possibleFailure": "RADIUS indisponível, shared secret errado, relógio/certificado, regra de firewall ou política negada."
    },
    {
      "step": 5,
      "actor": "Infraestrutura",
      "action": "Aplica política e libera dados.",
      "detail": "VLAN, ACL, grupo, perfil ou role podem ser aplicados.",
      "possibleFailure": "Autenticou mas caiu na VLAN errada, sem DHCP, sem DNS ou bloqueado no firewall."
    }
  ],
  "trafficCapture": {
    "tool": "Wireshark, tcpdump ou captura da controladora em ambiente autorizado",
    "filter": "eapol or radius or wlan.rsn",
    "whatToObserve": [
      "EAPOL Start",
      "EAP Request/Identity",
      "EAP Success ou Failure",
      "RADIUS Access-Accept/Reject",
      "RSN information elements",
      "DHCP apenas após sucesso"
    ],
    "interpretation": "Se só há EAPOL Failure, o problema ocorre antes do IP. Se EAP Success aparece mas não há DHCP, a falha provavelmente está em VLAN, DHCP, relay, firewall ou política pós-autenticação."
  },
  "deepDive": {
    "mentalModel": "Wi-Fi corporativo seguro é uma porta de rede sem fio controlada por identidade. O rádio permite chegar à porta; 802.1X decide se ela abre; VLAN/firewall limitam o que há depois da porta.",
    "keyTerms": [
      "WPA2",
      "WPA3",
      "PSK",
      "SAE",
      "802.1X",
      "EAP",
      "EAPOL",
      "RADIUS",
      "EAP-TLS",
      "PMF",
      "OWE",
      "VLAN dinâmica"
    ],
    "limitations": [
      "WPA3 não corrige senha ruim, gestão ruim de clientes ou segmentação inexistente.",
      "802.1X mal configurado pode expor credenciais se clientes não validarem certificado do servidor.",
      "EAP-TLS exige PKI e ciclo de vida de certificados.",
      "Clientes IoT antigos podem não suportar WPA3/802.1X/PMF obrigatório.",
      "RADIUS indisponível pode impedir novas autenticações se não houver alta disponibilidade."
    ],
    "whenToUse": [
      "Usar WPA3-Personal em redes pequenas modernas com poucos usuários e senha forte.",
      "Usar WPA2/WPA3-Enterprise em redes corporativas que exigem identidade, auditoria, revogação e segmentação.",
      "Usar EAP-TLS quando dispositivos são gerenciados e há PKI madura.",
      "Usar OWE ou guest isolado para redes públicas/visitantes quando aplicável."
    ],
    "whenNotToUse": [
      "Não usar PSK compartilhada como rede principal corporativa de funcionários.",
      "Não usar rede aberta para acesso interno.",
      "Não usar transition mode indefinidamente sem plano de saída.",
      "Não permitir método EAP inseguro ou perfil sem validação de servidor."
    ],
    "operationalImpact": [
      "Enterprise exige RADIUS/NAC, certificados, MDM, suporte e monitoramento.",
      "Mudanças de certificado podem causar incidente em massa se não forem planejadas.",
      "Logs precisam ser correlacionados entre AP, RADIUS, DHCP, DNS e firewall.",
      "IoT legado exige exceções documentadas e revisadas."
    ],
    "financialImpact": [
      "Pode haver custo de controladora, NAC, RADIUS gerenciado, certificados, MDM e licenças de AP.",
      "Mais logs aumentam armazenamento e custo de SIEM.",
      "Alternativas open source existem, mas aumentam custo operacional de manutenção."
    ],
    "securityImpact": [
      "802.1X reduz uso de senha compartilhada e melhora auditoria.",
      "EAP-TLS reduz phishing de credenciais, mas depende de proteção de chaves privadas e PKI.",
      "Segmentação pós-autenticação limita movimento lateral.",
      "PMF reduz certos abusos de gerenciamento, mas exige compatibilidade."
    ]
  },
  "realWorld": {
    "homeScenario": "Roteador doméstico com WPA3-Personal, senha longa e rede guest separada para visitantes.",
    "smallBusinessScenario": "Pequena empresa ainda com WPA2-PSK, mas com senha forte, troca programada, guest isolado e plano para migrar a funcionários para Enterprise.",
    "enterpriseScenario": "Funcionários autenticam via 802.1X/EAP-TLS, visitantes usam portal isolado, IoT usa rede dedicada com ACL mínima e todos os eventos vão para SIEM.",
    "cloudScenario": "Controladora cloud aplica políticas, RADIUS/NAC integrado ao diretório decide VLAN e SIEM recebe eventos de autenticação e firewall.",
    "incidentScenario": "Durante investigação, SOC correlaciona RADIUS Access-Accept, MAC do cliente, AP/BSSID, lease DHCP, logs DNS e conexões no firewall."
  },
  "commonMistakes": [
    {
      "mistake": "Usar a mesma PSK para todos os usuários e dispositivos.",
      "whyItHappens": "É simples de configurar e funciona rapidamente.",
      "consequence": "Sem revogação individual, baixa auditoria e risco quando a senha vaza.",
      "correction": "Migrar rede de funcionários para 802.1X e manter PSK apenas em redes específicas e segmentadas."
    },
    {
      "mistake": "Não validar certificado do servidor RADIUS no cliente.",
      "whyItHappens": "Usuários clicam para aceitar qualquer certificado ou perfis são criados manualmente.",
      "consequence": "Credenciais podem ser expostas a infraestrutura falsa.",
      "correction": "Distribuir perfil por MDM/GPO, travar CA e nome do servidor, preferir EAP-TLS."
    },
    {
      "mistake": "Achar que autenticação bem-sucedida garante acesso à aplicação.",
      "whyItHappens": "O ícone de Wi-Fi aparece como conectado.",
      "consequence": "Diagnóstico ignora VLAN, DHCP, DNS, firewall e proxy.",
      "correction": "Verificar logs por etapa: associação, 802.1X, DHCP, DNS, rota e aplicação."
    },
    {
      "mistake": "Manter WPA2/WPA3 transition mode para sempre.",
      "whyItHappens": "Resolve compatibilidade imediata com clientes antigos.",
      "consequence": "A rede permanece presa a compromissos de segurança e operação.",
      "correction": "Inventariar clientes, substituir legados e definir prazo para WPA3/PMF adequado."
    },
    {
      "mistake": "Colocar IoT e funcionários na mesma VLAN após Wi-Fi.",
      "whyItHappens": "Facilita instalação inicial.",
      "consequence": "Aumenta movimento lateral e exposição de ativos críticos.",
      "correction": "Segmentar IoT, restringir destinos, registrar exceções e revisar ciclo de vida."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Cliente pede senha repetidamente",
      "Falha de certificado",
      "Conecta mas não recebe IP",
      "Autentica em alguns APs e falha em outros",
      "Apenas clientes antigos falham",
      "RADIUS mostra Access-Reject",
      "Usuário cai em VLAN errada"
    ],
    "diagnosticQuestions": [
      "O cliente está associado ao BSSID correto?",
      "O problema acontece antes ou depois de EAP Success?",
      "O método EAP configurado no cliente é o esperado?",
      "O cliente valida CA e nome do servidor?",
      "RADIUS está acessível a partir da controladora/AP?",
      "A resposta RADIUS traz VLAN/role/ACL correta?",
      "Há falha de horário/certificado?",
      "PMF obrigatório quebrou clientes legados?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, autenticação, cifra, canal e estado.",
        "expectedObservation": "Campos Authentication, Cipher, SSID, BSSID e State.",
        "interpretation": "Confirma se o cliente usa WPA2/WPA3, Personal/Enterprise e a que BSSID está associado."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show profiles",
        "purpose": "Listar perfis Wi-Fi salvos sem exibir chaves.",
        "expectedObservation": "Lista de perfis por usuário e todos os usuários.",
        "interpretation": "Ajuda a identificar perfil antigo ou duplicado; não use key=clear em ambiente real."
      },
      {
        "platform": "Linux",
        "command": "nmcli -f active,ssid,bssid,chan,security,signal dev wifi list",
        "purpose": "Listar redes visíveis, BSSID, canal, segurança e sinal.",
        "expectedObservation": "SSID/BSSID com coluna SECURITY indicando WPA2/WPA3/802.1X quando suportado.",
        "interpretation": "Ajuda a comparar redes visíveis e método anunciado."
      },
      {
        "platform": "Linux",
        "command": "nmcli connection show \"NOME_DO_PERFIL\" | egrep '802-11-wireless-security|802-1x|connection.id'",
        "purpose": "Ver propriedades relevantes do perfil sem publicar segredos.",
        "expectedObservation": "Campos de segurança wireless e 802.1X.",
        "interpretation": "Identifica método EAP, identidade anônima, CA e opções de certificado; redigir dados sensíveis."
      },
      {
        "platform": "Cisco IOS/WLC",
        "command": "show client detail <MAC>  # sintaxe varia por plataforma",
        "purpose": "Ver estado do cliente, método de segurança, AP, VLAN e motivo de falha.",
        "expectedObservation": "Estado de associação/autenticação, policy profile, VLAN e event log.",
        "interpretation": "Confirma se a falha está no cliente, AP, RADIUS ou política."
      },
      {
        "platform": "RADIUS/NAC",
        "command": "Consultar logs por usuário, MAC, NAS/AP e horário",
        "purpose": "Ver Access-Accept, Access-Reject, método EAP e motivo.",
        "expectedObservation": "Decisão, regra aplicada, certificado/usuário e atributos de resposta.",
        "interpretation": "É a evidência mais importante para falhas de 802.1X."
      }
    ],
    "decisionTree": [
      {
        "if": "SSID aparece e associa, mas EAP falha",
        "then": "Verificar método EAP, certificado, usuário, senha, CA, horário e logs RADIUS."
      },
      {
        "if": "EAP Success ocorre, mas não há IP",
        "then": "Verificar VLAN/role atribuída, DHCP, relay, escopo, firewall e trunk."
      },
      {
        "if": "Só clientes antigos falham",
        "then": "Verificar WPA3/PMF obrigatório, suporte de driver, banda 6 GHz e modo de transição."
      },
      {
        "if": "Usuário autentica, mas acessa recursos indevidos",
        "then": "Revisar autorização RADIUS, VLAN, ACL, grupos IAM e regras de firewall."
      },
      {
        "if": "Falha em alguns APs",
        "then": "Comparar configuração de WLAN, reachability RADIUS, certificados, controladora, tags/sites e versão de firmware."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Usar WPA2/WPA3-Enterprise para rede corporativa de funcionários.",
      "Preferir EAP-TLS com certificados gerenciados em dispositivos corporativos.",
      "Validar CA e nome do servidor RADIUS no cliente.",
      "Segmentar funcionários, visitantes, IoT e administração.",
      "Enviar logs de AP/controladora/RADIUS/DHCP/firewall para SIEM.",
      "Habilitar PMF quando suportado e planejar compatibilidade.",
      "Manter inventário de clientes que exigem exceções."
    ],
    "badPractices": [
      "Usar a mesma PSK para funcionários e visitantes.",
      "Aceitar qualquer certificado em rede Enterprise.",
      "Usar rede aberta para acesso interno.",
      "Dar acesso any-any após autenticação Wi-Fi.",
      "Manter transition mode sem plano de encerramento.",
      "Criar exceções de IoT sem prazo, dono e revisão."
    ],
    "commonErrors": [
      "Confundir autenticação com autorização.",
      "Confundir associação com acesso IP.",
      "Tratar WPA3 como solução automática para senha fraca.",
      "Ignorar logs RADIUS durante troubleshooting.",
      "Não testar renovação/expiração de certificado antes de produção."
    ],
    "vulnerabilities": [
      {
        "name": "PSK fraca ou compartilhada",
        "description": "Uma senha única conhecida por muitos usuários reduz controle e auditoria.",
        "defensiveExplanation": "O risco principal é acesso indevido persistente e dificuldade de revogação individual.",
        "mitigation": "Migrar para 802.1X, usar senha longa em redes pequenas, segmentar e monitorar."
      },
      {
        "name": "Validação de certificado ausente",
        "description": "Clientes podem aceitar infraestrutura de autenticação não confiável.",
        "defensiveExplanation": "Pode expor credenciais se o usuário conectar a rede falsa com mesmo SSID.",
        "mitigation": "Distribuir perfil gerenciado, fixar CA/servidor e usar EAP-TLS quando possível."
      },
      {
        "name": "IoT em rede plana",
        "description": "Dispositivos fracos entram na mesma rede de ativos críticos.",
        "defensiveExplanation": "Aumenta superfície lateral e dificulta contenção.",
        "mitigation": "Rede IoT dedicada, ACL mínima, inventário e substituição de legados."
      },
      {
        "name": "RADIUS sem alta disponibilidade",
        "description": "Falha no serviço impede novas autenticações.",
        "defensiveExplanation": "Cria risco operacional e pode virar incidente amplo.",
        "mitigation": "Redundância, monitoramento, testes de failover e documentação."
      }
    ],
    "monitoring": [
      "RADIUS Access-Reject por usuário/grupo/AP",
      "Mudança incomum de método de autenticação",
      "Muitos erros EAP por SSID",
      "Clientes em VLAN inesperada",
      "APs com falha de reachability ao RADIUS",
      "Autenticações fora de horário ou local incomum",
      "Clientes legados conectando em SSID corporativo"
    ],
    "hardening": [
      "Desabilitar WEP/WPA/TKIP.",
      "Padronizar WPA2/WPA3-Enterprise conforme compatibilidade.",
      "Aplicar PMF nos SSIDs adequados.",
      "Usar perfis Wi-Fi gerenciados por MDM/GPO.",
      "Restringir administração dos APs e controladoras.",
      "Rotacionar shared secrets RADIUS com processo controlado.",
      "Revisar exceções e redes PSK periodicamente."
    ],
    "detectionIdeas": [
      "Correlacionar SSID, BSSID, usuário, MAC, IP, VLAN e destino.",
      "Criar alerta para aumento de Access-Reject.",
      "Criar alerta para autenticação em SSID legado.",
      "Criar alerta para cliente de funcionário em VLAN guest ou IoT.",
      "Comparar logs wireless com DHCP/DNS/firewall durante incidentes."
    ]
  },
  "lab": {
    "id": "lab-12.5",
    "title": "Análise defensiva de segurança Wi-Fi: PSK, WPA3, Enterprise e 802.1X",
    "labType": "security",
    "objective": "Identificar o método de segurança de uma WLAN autorizada, separar evidências de associação/autenticação/IP e desenhar uma arquitetura corporativa com 802.1X.",
    "scenario": "Você é analista de rede/segurança e recebeu a tarefa de documentar a segurança wireless atual e propor migração de uma rede WPA2-PSK compartilhada para Wi-Fi corporativo com identidade, segmentação e logs.",
    "topology": "Cliente Windows/Linux -> AP/BSSID autorizado -> controladora/AP -> RADIUS/NAC conceitual -> VLAN/firewall/SIEM conceitual",
    "architecture": "O laboratório usa coleta local no cliente e desenho conceitual. Não exige modificar roteador, criar RADIUS ou capturar tráfego de terceiros.",
    "prerequisites": [
      "Ter acesso autorizado a uma rede Wi-Fi própria, doméstica ou de laboratório.",
      "Não executar testes em redes de terceiros.",
      "Ter Windows PowerShell ou Linux com NetworkManager; Wireshark é opcional."
    ],
    "tools": [
      "Windows PowerShell",
      "Linux terminal",
      "nmcli",
      "netsh",
      "opcional: Wireshark",
      "editor de texto para relatório"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não use comandos que exibem senha em texto claro.",
      "Não compartilhe prints contendo SSID corporativo sensível, usuário, MAC real ou certificados sem mascarar.",
      "Não tente capturar credenciais ou simular AP falso.",
      "Não altere configuração de rede corporativa sem aprovação formal.",
      "Use apenas redes sob sua autorização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar contexto",
        "instruction": "Descreva qual rede autorizada será analisada e qual é o objetivo defensivo.",
        "command": "Documento: Rede analisada = <SSID mascarado>; ambiente = casa/lab/empresa autorizada; objetivo = identificar método de segurança",
        "expectedOutput": "Um bloco de contexto no relatório.",
        "explanation": "Todo trabalho de segurança começa por escopo e autorização."
      },
      {
        "number": 2,
        "title": "Coletar estado no Windows",
        "instruction": "Se estiver no Windows, verifique SSID, BSSID, autenticação e cifra.",
        "command": "netsh wlan show interfaces",
        "expectedOutput": "Campos como State, SSID, BSSID, Authentication, Cipher, Channel e Signal.",
        "explanation": "Authentication e Cipher indicam se a rede usa WPA2/WPA3, Personal ou Enterprise quando o driver expõe essa informação."
      },
      {
        "number": 3,
        "title": "Listar perfis sem expor senha",
        "instruction": "Liste perfis salvos, mas não exiba chaves em texto claro.",
        "command": "netsh wlan show profiles",
        "expectedOutput": "Lista de perfis Wi-Fi salvos.",
        "explanation": "Perfis antigos e duplicados podem causar conexão no SSID errado. Evite key=clear para não vazar segredo."
      },
      {
        "number": 4,
        "title": "Coletar redes visíveis no Linux",
        "instruction": "Se estiver no Linux com NetworkManager, liste redes visíveis com segurança anunciada.",
        "command": "nmcli -f active,ssid,bssid,chan,security,signal dev wifi list",
        "expectedOutput": "Tabela com SSID, BSSID, canal, segurança e sinal.",
        "explanation": "A coluna SECURITY ajuda a identificar WPA2, WPA3 e 802.1X quando suportado."
      },
      {
        "number": 5,
        "title": "Inspecionar perfil Linux com cuidado",
        "instruction": "Se estiver no Linux e o perfil for seu, veja campos de segurança sem publicar segredos.",
        "command": "nmcli connection show \"NOME_DO_PERFIL\" | egrep 'connection.id|802-11-wireless-security|802-1x'",
        "expectedOutput": "Campos de segurança wireless e, se houver, 802.1X/EAP.",
        "explanation": "Redija nomes reais, identidades e caminhos de certificado antes de compartilhar evidências."
      },
      {
        "number": 6,
        "title": "Classificar o modelo",
        "instruction": "Classifique a rede observada em aberta, OWE, WPA2/WPA3-Personal ou Enterprise.",
        "command": "Tabela manual: SSID | BSSID | Auth | Cipher | Personal/Enterprise | Evidência",
        "expectedOutput": "Uma tabela preenchida com evidência.",
        "explanation": "A classificação fundamentada evita decisões baseadas em achismo."
      },
      {
        "number": 7,
        "title": "Separar autenticação de IP",
        "instruction": "Após confirmar autenticação/associação, valide IP, rota e DNS.",
        "command": "Windows: ipconfig /all && route print\nLinux: ip addr && ip route && resolvectl status",
        "expectedOutput": "IP, gateway e DNS coerentes com a rede.",
        "explanation": "Se a autenticação funciona mas IP não vem, o problema mudou de 802.1X/WPA para DHCP/VLAN/rede."
      },
      {
        "number": 8,
        "title": "Criar desenho 802.1X",
        "instruction": "Desenhe uma arquitetura alvo com supplicant, AP, RADIUS, IAM/PKI, VLAN, firewall e SIEM.",
        "command": "Documento/diagrama: Cliente -> AP -> RADIUS/NAC -> IAM/PKI -> VLAN/firewall -> SIEM",
        "expectedOutput": "Diagrama textual ou SVG simples.",
        "explanation": "O objetivo é enxergar Wi-Fi como controle de acesso integrado, não só criptografia."
      },
      {
        "number": 9,
        "title": "Definir políticas por grupo",
        "instruction": "Crie uma matriz de acesso para funcionários, visitantes, IoT e administração.",
        "command": "Tabela: Grupo | Método | VLAN/Role | Destinos permitidos | Logs | Observações",
        "expectedOutput": "Matriz de política.",
        "explanation": "Autenticação sem autorização pós-login deixa a rede plana."
      },
      {
        "number": 10,
        "title": "Listar riscos e mitigação",
        "instruction": "Registre pelo menos cinco riscos e mitigação.",
        "command": "Tabela: Risco | Evidência | Impacto | Mitigação | Dono | Prazo",
        "expectedOutput": "Lista priorizada de riscos.",
        "explanation": "Transformar achado técnico em plano de ação é parte do trabalho profissional."
      }
    ],
    "expectedResult": "Um relatório curto com evidências do método de segurança atual, separação entre autenticação e rede IP, proposta de arquitetura 802.1X e matriz de segmentação.",
    "validation": [
      {
        "check": "Método de segurança identificado",
        "command": "netsh wlan show interfaces ou nmcli dev wifi list",
        "expected": "Authentication/Security e Cipher preenchidos.",
        "ifFails": "Atualize driver, use outro sistema ou consulte logs/controladora autorizada."
      },
      {
        "check": "Não houve exposição de senha",
        "command": "Revisar relatório",
        "expected": "Nenhuma chave, senha, usuário sensível ou MAC real sem mascaramento.",
        "ifFails": "Remover dados sensíveis e refazer evidências."
      },
      {
        "check": "Autenticação e IP foram separados",
        "command": "Comparar se há evidência de auth e depois ipconfig/ip addr",
        "expected": "Relatório distingue WPA/802.1X de DHCP/DNS/firewall.",
        "ifFails": "Reorganizar diagnóstico por etapas."
      },
      {
        "check": "Arquitetura alvo contém RADIUS/IAM/PKI/segmentação/logs",
        "command": "Revisar diagrama",
        "expected": "Todos os blocos aparecem com função clara.",
        "ifFails": "Adicionar componentes ausentes e justificar."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Comando não mostra WPA3",
        "probableCause": "Driver/OS não expõe campo ou AP está em transition mode.",
        "howToConfirm": "Comparar com controladora/AP ou outro cliente.",
        "fix": "Atualizar driver ou consultar logs da infraestrutura."
      },
      {
        "symptom": "Cliente Enterprise pede senha repetidamente",
        "probableCause": "Credencial inválida, certificado não confiável, método EAP errado ou política RADIUS negada.",
        "howToConfirm": "Ver logs RADIUS e eventos do cliente.",
        "fix": "Corrigir perfil, certificado, usuário/grupo ou política."
      },
      {
        "symptom": "EAP funciona mas não há IP",
        "probableCause": "VLAN dinâmica errada, trunk, DHCP, relay ou ACL.",
        "howToConfirm": "Ver atributos RADIUS, VLAN aplicada e logs DHCP.",
        "fix": "Corrigir mapeamento de VLAN/role, trunk e DHCP."
      },
      {
        "symptom": "Clientes antigos não conectam",
        "probableCause": "PMF obrigatório, WPA3-only, 6 GHz ou cipher não suportado.",
        "howToConfirm": "Ver capacidade do cliente e logs de associação.",
        "fix": "Atualizar/substituir cliente ou usar SSID legado segmentado temporário."
      }
    ],
    "improvements": [
      "Montar laboratório FreeRADIUS em rede isolada em aula futura de IAM/lab avançado.",
      "Adicionar logs reais de controladora, RADIUS e firewall ao relatório.",
      "Criar política de expiração e renovação de certificados.",
      "Criar dashboard de Access-Reject por AP/SSID/usuário.",
      "Testar failover de RADIUS em janela controlada."
    ],
    "evidenceToCollect": [
      "SSID/BSSID mascarado",
      "Método de autenticação e cifra",
      "Print ou texto de comandos sem segredos",
      "Tabela de classificação Personal/Enterprise",
      "Matriz de política",
      "Diagrama alvo",
      "Lista de riscos e mitigação"
    ],
    "questions": [
      "Por que PSK compartilhada dificulta revogação individual?",
      "Por que o cliente deve validar o certificado do servidor RADIUS?",
      "Qual evidência mostra que a falha ocorreu antes do DHCP?",
      "Que dispositivos exigiriam exceção e por quanto tempo?",
      "Quais logs seriam úteis em incidente?"
    ],
    "challenge": "Transforme uma rede WPA2-PSK única em uma proposta corporativa com SSID de funcionários usando 802.1X, guest isolado, IoT segmentado, logs e plano de transição.",
    "solution": "A solução deve começar por inventário, classificar clientes, criar SSID corporativo 802.1X preferencialmente com EAP-TLS, guest isolado com política restritiva, IoT em VLAN própria, RADIUS/NAC redundante, logs no SIEM, validação de certificado por perfil gerenciado e prazo para aposentar PSK compartilhada."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma senha forte de Wi-Fi ainda pode ser insuficiente para uma rede corporativa?",
      "hints": [
        "Pense em revogação individual.",
        "Pense em auditoria e logs."
      ],
      "expectedIdeas": [
        "PSK é compartilhada",
        "sem identidade individual",
        "difícil saber quem usou",
        "troca afeta todos"
      ],
      "explanation": "A força criptográfica da senha não resolve governança de acesso quando todos usam o mesmo segredo."
    },
    {
      "type": "diagnóstico",
      "question": "Um cliente mostra EAP Failure e não recebe IP. Você investiga DHCP primeiro?",
      "hints": [
        "EAP acontece antes do IP.",
        "Procure logs RADIUS."
      ],
      "expectedIdeas": [
        "não",
        "ver método EAP",
        "certificado",
        "credencial",
        "RADIUS",
        "política"
      ],
      "explanation": "Se EAP falhou, a porta controlada ainda não foi aberta para tráfego DHCP normal."
    },
    {
      "type": "cenário real",
      "question": "Uma empresa tem notebooks gerenciados, celulares pessoais e câmeras antigas. Como separaria os modelos de acesso?",
      "hints": [
        "Nem todo dispositivo suporta o mesmo método.",
        "Pense em risco por grupo."
      ],
      "expectedIdeas": [
        "notebooks com EAP-TLS",
        "BYOD com política específica",
        "IoT em VLAN restrita",
        "guest isolado",
        "logs e prazo de exceção"
      ],
      "explanation": "A arquitetura deve balancear segurança, compatibilidade e operação, sem nivelar todos pelo dispositivo mais fraco."
    }
  ],
  "quiz": [
    {
      "id": "q12.5.1",
      "type": "conceito",
      "q": "Qual é a principal diferença operacional entre WPA-Personal e WPA-Enterprise?",
      "opts": [
        "Personal usa segredo compartilhado; Enterprise usa autenticação centralizada por identidade",
        "Enterprise só funciona em 2.4 GHz",
        "Personal sempre usa certificados",
        "Enterprise dispensa logs"
      ],
      "a": 0,
      "exp": "O ponto central é o modelo de autenticação: Personal usa senha compartilhada; Enterprise usa 802.1X/EAP e servidor de autenticação.",
      "difficulty": "intermediário",
      "topic": "wpa"
    },
    {
      "id": "q12.5.2",
      "type": "diagnóstico",
      "q": "Um cliente falha em 802.1X antes de receber IP. Qual evidência deve ser verificada primeiro?",
      "opts": [
        "Logs RADIUS/EAP",
        "Tabela DNS pública",
        "Tempo de resposta HTTP",
        "TTL do traceroute externo"
      ],
      "a": 0,
      "exp": "802.1X acontece antes do tráfego IP normal; logs RADIUS/EAP são a evidência correta.",
      "difficulty": "intermediário",
      "topic": "troubleshooting"
    },
    {
      "id": "q12.5.3",
      "type": "segurança",
      "q": "Por que não validar o certificado do servidor em WPA-Enterprise é perigoso?",
      "opts": [
        "Porque o cliente pode aceitar servidor falso e expor credenciais",
        "Porque reduz o RSSI",
        "Porque impede DHCP em redes abertas",
        "Porque muda o canal automaticamente"
      ],
      "a": 0,
      "exp": "A validação do servidor evita que o cliente entregue credenciais a uma infraestrutura de autenticação não confiável.",
      "difficulty": "avançado",
      "topic": "certificados"
    },
    {
      "id": "q12.5.4",
      "type": "comparação",
      "q": "Qual tecnologia substitui o PSK clássico no WPA3-Personal?",
      "opts": [
        "SAE",
        "DHCP",
        "BGP",
        "SNMP"
      ],
      "a": 0,
      "exp": "WPA3-Personal usa SAE, Simultaneous Authentication of Equals.",
      "difficulty": "intermediário",
      "topic": "wpa3"
    },
    {
      "id": "q12.5.5",
      "type": "arquitetura",
      "q": "Em uma rede corporativa com 802.1X, qual componente normalmente decide Access-Accept ou Access-Reject?",
      "opts": [
        "Servidor RADIUS/NAC",
        "Servidor DNS recursivo",
        "NAT Gateway",
        "Cliente DHCP"
      ],
      "a": 0,
      "exp": "O AP/controladora encaminha a autenticação ao RADIUS/NAC, que decide e pode retornar atributos de política.",
      "difficulty": "intermediário",
      "topic": "radius"
    },
    {
      "id": "q12.5.6",
      "type": "cenário",
      "q": "Um cliente autentica com sucesso, mas cai em uma VLAN sem DHCP. Qual hipótese é mais coerente?",
      "opts": [
        "A resposta RADIUS ou mapeamento de VLAN/role pode estar errado",
        "O SSID não está sendo transmitido",
        "O cliente não suporta beacons",
        "O canal de 2.4 GHz está sempre proibido"
      ],
      "a": 0,
      "exp": "Depois de EAP Success, falta de IP aponta para VLAN, DHCP, relay, trunk, ACL ou política pós-autenticação.",
      "difficulty": "intermediário",
      "topic": "vlan dinâmica"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.5.1",
      "front": "O que é 802.1X?",
      "back": "Controle de acesso baseado em porta que usa autenticação antes de liberar comunicação normal em uma LAN/WLAN.",
      "tags": [
        "802.1x",
        "acesso"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.5.2",
      "front": "Quem é o supplicant?",
      "back": "O cliente que solicita acesso à rede, como notebook, celular ou dispositivo IoT.",
      "tags": [
        "802.1x"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.5.3",
      "front": "O que é RADIUS no Wi-Fi Enterprise?",
      "back": "Servidor/protocolo usado para autenticar, autorizar e registrar acesso, retornando decisões e atributos ao AP/controladora.",
      "tags": [
        "radius",
        "enterprise"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.5.4",
      "front": "Por que PSK é problemática em empresas?",
      "back": "Porque muitos usuários compartilham o mesmo segredo, dificultando revogação individual, auditoria e responsabilização.",
      "tags": [
        "psk",
        "segurança"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.5.5",
      "front": "O que é EAP-TLS?",
      "back": "Método EAP baseado em TLS e certificados, usado para autenticação forte, geralmente com certificados de cliente e servidor.",
      "tags": [
        "eap",
        "certificados"
      ],
      "difficulty": "avançado"
    },
    {
      "id": "fc12.5.6",
      "front": "O que é PMF?",
      "back": "Protected Management Frames: proteção para certos quadros de gerenciamento 802.11, reduzindo abusos contra a conexão.",
      "tags": [
        "pmf",
        "wpa3"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.5.1",
      "type": "comparação",
      "prompt": "Compare WPA3-Personal e WPA3-Enterprise em uma tabela com autenticação, operação, auditoria e uso recomendado.",
      "expectedAnswer": "Personal usa SAE/senha e é adequado para redes pequenas; Enterprise usa 802.1X/EAP/RADIUS, suporta identidade individual, políticas e auditoria corporativa.",
      "explanation": "A escolha não depende apenas de criptografia, mas também de governança de acesso."
    },
    {
      "id": "ex12.5.2",
      "type": "diagnóstico",
      "prompt": "Um usuário recebe erro de certificado ao conectar no Wi-Fi Enterprise. Liste três hipóteses defensivas.",
      "expectedAnswer": "CA não instalada/confiável, nome do servidor RADIUS diferente do esperado, certificado expirado/renovado sem atualização do perfil, horário incorreto ou tentativa de rede falsa.",
      "explanation": "Erro de certificado não deve ser ignorado; pode indicar falha operacional ou risco de segurança."
    },
    {
      "id": "ex12.5.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma matriz para funcionários, visitantes e IoT com método de autenticação, VLAN e destinos permitidos.",
      "expectedAnswer": "Funcionários: 802.1X/EAP-TLS, VLAN corporativa por perfil, destinos internos necessários; visitantes: guest isolado/portal/OWE ou PSK temporária, internet apenas; IoT: rede dedicada, ACL para serviços específicos.",
      "explanation": "A matriz força separação entre autenticação e autorização."
    },
    {
      "id": "ex12.5.4",
      "type": "comando-output",
      "prompt": "No Windows, qual comando ajuda a ver o método de autenticação Wi-Fi atual sem exibir a senha?",
      "expectedAnswer": "netsh wlan show interfaces",
      "explanation": "Esse comando mostra campos como Authentication e Cipher sem solicitar a chave em texto claro."
    }
  ],
  "challenge": {
    "title": "Migrar Wi-Fi corporativo de PSK compartilhada para 802.1X",
    "scenario": "Uma empresa com 180 funcionários, 40 visitantes por semana, 70 dispositivos IoT e 4 filiais usa um único SSID WPA2-PSK. A senha vazou para prestadores e ex-funcionários. O SOC não consegue associar incidentes a usuários e não há segmentação efetiva.",
    "tasks": [
      "Inventariar tipos de cliente e capacidades.",
      "Definir SSIDs ou perfis necessários.",
      "Escolher método de autenticação por grupo.",
      "Desenhar integração com RADIUS/IAM/PKI.",
      "Definir segmentação e regras de firewall.",
      "Definir logs e evidências para SOC.",
      "Criar plano de migração e rollback."
    ],
    "constraints": [
      "Não derrubar operação de IoT crítica.",
      "Não manter PSK compartilhada para funcionários como estado final.",
      "Permitir acesso de visitantes apenas à internet.",
      "Reduzir suporte manual usando perfis gerenciados.",
      "Prever clientes legados com exceção temporária documentada."
    ],
    "expectedDeliverables": [
      "Arquitetura alvo",
      "Matriz de SSID/grupo/VLAN/política",
      "Plano de certificados",
      "Plano de logs",
      "Plano de migração por fases",
      "Riscos e mitigação"
    ],
    "gradingRubric": [
      {
        "criterion": "Identidade e autenticação",
        "points": 25,
        "description": "Escolhe 802.1X/EAP adequado e justifica certificados/perfis."
      },
      {
        "criterion": "Segmentação",
        "points": 25,
        "description": "Separa funcionários, guest e IoT com regras coerentes."
      },
      {
        "criterion": "Operação",
        "points": 20,
        "description": "Inclui inventário, transição, rollback, suporte e clientes legados."
      },
      {
        "criterion": "Monitoramento",
        "points": 20,
        "description": "Define logs RADIUS/AP/DHCP/DNS/firewall e correlação no SIEM."
      },
      {
        "criterion": "Risco e custo",
        "points": 10,
        "description": "Explica custos, limitações e trade-offs."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A migração não começa ativando 802.1X no AP. Primeiro é preciso entender quem conecta, que dispositivos suportam o quê, qual identidade existe, se há PKI, como os perfis serão distribuídos, o que será segmentado e quais logs o SOC precisa.",
    "steps": [
      "Inventariar dispositivos e sistemas operacionais.",
      "Criar SSID corporativo 802.1X para dispositivos gerenciados.",
      "Preferir EAP-TLS para notebooks corporativos com certificados distribuídos por MDM/GPO.",
      "Criar rede guest isolada com acesso somente à internet.",
      "Criar rede IoT dedicada com ACL mínima por destino necessário.",
      "Configurar RADIUS/NAC redundante e integrado ao IAM/PKI.",
      "Validar certificado do servidor nos clientes.",
      "Enviar logs de AP/controladora/RADIUS/DHCP/DNS/firewall ao SIEM.",
      "Migrar por piloto, medir falhas e só então expandir.",
      "Definir prazo para retirar PSK compartilhada."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Trocar a PSK e manter tudo igual.",
        "whyItIsWrong": "Resolve vazamento momentâneo, mas não cria identidade, auditoria ou revogação individual."
      },
      {
        "answer": "Colocar WPA3 em todos os SSIDs imediatamente.",
        "whyItIsWrong": "Pode quebrar clientes legados e não resolve segmentação ou IAM."
      },
      {
        "answer": "Usar 802.1X, mas permitir qualquer certificado.",
        "whyItIsWrong": "Enfraquece a confiança do cliente no servidor de autenticação e cria risco de exposição de credenciais."
      },
      {
        "answer": "Manter IoT na rede de funcionários para facilitar operação.",
        "whyItIsWrong": "Aumenta movimento lateral e expõe ativos corporativos a dispositivos fracos."
      }
    ],
    "finalAnswer": "A solução recomendada é rede corporativa 802.1X, preferencialmente EAP-TLS para dispositivos gerenciados, com RADIUS/NAC redundante, perfis distribuídos por MDM/GPO, validação forte de certificado, VLAN/role por grupo, guest isolado, IoT segmentado, logs centralizados e plano gradual para eliminar PSK compartilhada."
  },
  "glossary": [
    {
      "term": "WPA2",
      "shortDefinition": "Geração de segurança Wi-Fi amplamente usada baseada no modelo RSN.",
      "longDefinition": "WPA2 define mecanismos de autenticação e criptografia para redes Wi-Fi, em modos Personal e Enterprise.",
      "example": "SSID doméstico com WPA2-Personal e senha compartilhada.",
      "relatedTerms": [
        "WPA3",
        "PSK",
        "802.1X"
      ],
      "relatedLessons": [
        "12.5"
      ]
    },
    {
      "term": "WPA3",
      "shortDefinition": "Geração mais moderna de segurança Wi-Fi, incluindo SAE no Personal e requisitos reforçados em Enterprise.",
      "longDefinition": "WPA3 melhora aspectos do WPA2, especialmente no modo Personal com SAE e em cenários modernos com PMF e perfis Enterprise mais fortes.",
      "example": "Rede moderna configurada com WPA3-Personal SAE.",
      "relatedTerms": [
        "SAE",
        "PMF",
        "WPA2"
      ],
      "relatedLessons": [
        "12.3",
        "12.5"
      ]
    },
    {
      "term": "802.1X",
      "shortDefinition": "Controle de acesso baseado em porta para autenticar antes de liberar comunicação normal.",
      "longDefinition": "Em Wi-Fi Enterprise, 802.1X usa EAPOL entre cliente e AP e normalmente RADIUS no backend para autenticar e autorizar.",
      "example": "Notebook corporativo autentica no SSID Empresa usando certificado.",
      "relatedTerms": [
        "EAP",
        "EAPOL",
        "RADIUS"
      ],
      "relatedLessons": [
        "12.5"
      ]
    },
    {
      "term": "EAP",
      "shortDefinition": "Framework de autenticação extensível usado em 802.1X.",
      "longDefinition": "EAP permite diferentes métodos de autenticação, como EAP-TLS, PEAP e EAP-TTLS, sem ser um método único por si só.",
      "example": "EAP-TLS usa certificados para autenticação forte.",
      "relatedTerms": [
        "EAP-TLS",
        "802.1X"
      ],
      "relatedLessons": [
        "12.5"
      ]
    },
    {
      "term": "RADIUS",
      "shortDefinition": "Serviço/protocolo de autenticação, autorização e accounting usado com 802.1X.",
      "longDefinition": "RADIUS recebe solicitações de AP/controladoras, valida credenciais/certificados/políticas e retorna decisão e atributos de acesso.",
      "example": "Servidor RADIUS retorna Access-Accept com VLAN 120 para usuário financeiro.",
      "relatedTerms": [
        "NAC",
        "AAA",
        "802.1X"
      ],
      "relatedLessons": [
        "12.5",
        "13.5"
      ]
    },
    {
      "term": "PMF",
      "shortDefinition": "Protected Management Frames, proteção de certos quadros de gerenciamento Wi-Fi.",
      "longDefinition": "PMF reduz riscos associados a quadros de gerenciamento não protegidos, sendo obrigatório em muitos cenários WPA3 modernos.",
      "example": "SSID WPA3 com PMF obrigatório pode bloquear clientes antigos que não suportam o recurso.",
      "relatedTerms": [
        "WPA3",
        "802.11w"
      ],
      "relatedLessons": [
        "12.5"
      ]
    }
  ],
  "references": [
    {
      "type": "standard",
      "title": "802.1X: Port-Based Network Access Control",
      "organization": "IEEE 802.1",
      "url": "https://1.ieee802.org/security/802-1x/",
      "note": "Descrição oficial de controle de acesso baseado em porta, controlled/uncontrolled port, EAP e EAPOL."
    },
    {
      "type": "standard",
      "title": "IEEE 802.1X-2020",
      "organization": "IEEE Standards Association",
      "url": "https://standards.ieee.org/ieee/802.1X/7345/",
      "note": "Padrão de Port-Based Network Access Control e autenticação mútua."
    },
    {
      "type": "rfc",
      "title": "RFC 3748: Extensible Authentication Protocol",
      "organization": "IETF",
      "url": "https://datatracker.ietf.org/doc/html/rfc3748",
      "note": "Define EAP como framework de autenticação extensível."
    },
    {
      "type": "official-doc",
      "title": "Extensible Authentication Protocol for network access",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/windows-server/networking/technologies/extensible-authentication-protocol/network-access",
      "note": "Explica EAP em Windows e métodos como EAP-TLS."
    },
    {
      "type": "official-doc",
      "title": "WPA3 Encryption and Configuration Guide",
      "organization": "Cisco Meraki",
      "url": "https://documentation.meraki.com/Wireless/Design_and_Configure/Configuration_Guides/Encryption_and_Authentication/WPA3_Encryption_and_Configuration_Guide",
      "note": "Referência operacional sobre WPA3, SAE, Enterprise, PMF e 6 GHz."
    },
    {
      "type": "official-doc",
      "title": "Guidelines for Securing Wireless Local Area Networks",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/153/final",
      "note": "Recomendações para configuração e monitoramento de WLANs."
    },
    {
      "type": "official-doc",
      "title": "SP 800-97 Establishing Wireless Robust Security Networks",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/97/final",
      "note": "Referência histórica sobre 802.11i; retirada em 2025 por estar tecnologicamente desatualizada."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Autenticar no Wi-Fi não substitui firewall, ACLs e política de tráfego."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação e movimento lateral serão aprofundados no módulo de Segurança de Redes."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "autenticação e autorização",
      "lesson": "certificados, MFA, service accounts e políticas",
      "reason": "802.1X Enterprise depende de identidade, certificados, diretório, grupos e autorização."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade e automação",
      "lesson": "IaC, logs e política como código",
      "reason": "Configuração de SSIDs, RADIUS, certificados e logs pode ser governada por automação e revisão."
    }
  ],
  "pedagogicalMap": {
    "problem": "Wi-Fi por rádio exige controle de acesso, confidencialidade, autorização, revogação e auditoria.",
    "concept": "WPA2/WPA3 protegem redes Wi-Fi; Personal usa senha/SAE, Enterprise usa 802.1X/EAP/RADIUS.",
    "internalMechanism": "Depois da associação, o cliente executa handshake ou EAPOL; RADIUS decide acesso; chaves são derivadas; política é aplicada.",
    "realUse": "Rede corporativa com funcionários, guest, IoT, BYOD, RADIUS, certificados, VLAN e logs para SOC.",
    "commonMistake": "Achar que uma senha forte compartilhada resolve governança corporativa de acesso.",
    "securityImpact": "802.1X e EAP-TLS melhoram identidade e auditoria, mas exigem certificados e configuração segura do cliente.",
    "operationalImpact": "Aumenta maturidade e controle, mas exige RADIUS, PKI, MDM, documentação, suporte e monitoramento.",
    "summary": "Wi-Fi seguro corporativo é integração entre rádio, criptografia, identidade, autorização, segmentação e evidências."
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
      "12.6"
    ]
  }
};
