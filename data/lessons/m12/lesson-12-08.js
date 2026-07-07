export const lesson1208 = {
  "id": "12.8",
  "moduleId": "m12",
  "order": 8,
  "title": "Ameaças wireless: rogue AP, evil twin, deauth e boas defesas",
  "subtitle": "Como reconhecer, investigar e mitigar ameaças sem fio de forma defensiva, ética e corporativa.",
  "duration": "120-170 min",
  "estimatedStudyTimeMinutes": 170,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 260,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "segurança",
    "rogue ap",
    "evil twin",
    "deauth",
    "wids",
    "wips",
    "pmf",
    "soc",
    "blue team",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.1",
      "reason": "É necessário entender Wi-Fi como meio de acesso local e não como sinônimo de internet."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.4",
      "reason": "SSID, BSSID, associação e autenticação são a base para entender rogue AP e evil twin."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "WPA2, WPA3, Enterprise, 802.1X e PMF definem muitos controles defensivos contra ameaças wireless."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.7",
      "reason": "Arquitetura com APs, VLANs, controladora, RADIUS/NAC e SIEM é necessária para detecção e resposta."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall, ACLs, zonas e logs são necessários para conter impacto de redes guest, rogue e IoT."
    }
  ],
  "objectives": [
    "Explicar o que são rogue AP, evil twin, deauth/disassociation abusivo e redes guest mal isoladas.",
    "Diferenciar ameaça real, erro operacional e SSID vizinho legítimo usando evidências.",
    "Entender como SSID, BSSID, segurança anunciada, certificado, RADIUS, DHCP e logs ajudam na investigação.",
    "Relacionar WPA Enterprise, EAP-TLS, PMF, MDM, WIDS/WIPS, segmentação e SIEM a boas defesas.",
    "Executar um laboratório defensivo de inventário e triagem sem criar ataques ou capturar credenciais.",
    "Criar um playbook ético de resposta para suspeita de ameaça wireless."
  ],
  "learningOutcomes": [
    "Dado um SSID duplicado, o aluno consegue listar hipóteses e evidências antes de concluir que é ataque.",
    "Dado um BSSID desconhecido, o aluno consegue comparar com inventário, OUI, canal, RSSI, localização e logs.",
    "Dado um alerta de deauth, o aluno consegue propor investigação defensiva e controles como PMF e atualização de clientes.",
    "Dado um incidente de rede guest, o aluno consegue verificar isolamento, DHCP, DNS, firewall e logs.",
    "Dado um cenário de evil twin, o aluno propõe mitigação com EAP-TLS, validação de certificado, MDM, usuário treinado e monitoramento."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine que o SOC recebe um alerta incomum: vários notebooks corporativos apareceram conectados a um BSSID desconhecido, com o mesmo nome do SSID corporativo. Alguns usuários relatam que o Wi-Fi caiu, voltou, pediu autenticação de novo e depois a navegação ficou estranha. Ao mesmo tempo, a equipe de suporte vê reclamações de instabilidade em uma sala de reunião específica. O time de redes olha a controladora e não encontra nenhum AP corporativo novo naquele local. O time de segurança pergunta: isso é interferência, falha de roaming, AP doméstico ligado por engano, tentativa de phishing, rogue AP ou evil twin?</p>\n  <p>Essa situação é comum porque ataques e erros wireless acontecem perto do usuário, muitas vezes antes do tráfego chegar ao firewall, proxy, EDR ou SIEM tradicional. Uma rede cabeada normalmente exige acesso físico a uma porta. Uma rede sem fio anuncia presença pelo ar. Qualquer pessoa nas proximidades pode enxergar SSIDs, BSSIDs, canais, potência, tipos de segurança e, em alguns casos, induzir o usuário a escolher a rede errada. Por isso, defender Wi-Fi exige pensar em rádio, identidade, inventário, comportamento do cliente, autenticação, telemetria e educação do usuário.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um atacante não precisa invadir o datacenter para causar dano. Ele pode tentar se posicionar próximo ao escritório, criar um SSID parecido, induzir usuários a autenticar no lugar errado, explorar clientes mal configurados ou causar indisponibilidade com quadros de gerenciamento. O Blue Team precisa saber identificar sinais, coletar evidências e acionar mitigação sem transformar a investigação em ação ofensiva não autorizada.</div>\n  <p>Esta aula ensina ameaças wireless com foco defensivo. Você não vai aprender a atacar redes. Vai aprender a reconhecer padrões de risco, entender por que eles funcionam, quais evidências procurar, quais controles reduzem impacto e como construir um processo profissional de resposta para rogue AP, evil twin, deauth e más configurações de segurança sem fio.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>As primeiras WLANs corporativas eram frágeis por desenho e por operação. WEP tentou oferecer confidencialidade, mas se mostrou insuficiente. WPA e WPA2 melhoraram criptografia e autenticação, especialmente com 802.1X no modo Enterprise. Com o tempo, o problema deixou de ser apenas quebrar uma senha e passou a envolver engenharia social, configuração incorreta, dispositivos legados, certificados mal validados, redes de visitantes mal isoladas, IoT com autenticação fraca e APs não autorizados.</p>\n  <p>Rogue APs surgiram como um problema operacional e de segurança. Às vezes eram maliciosos; às vezes eram funcionários tentando “melhorar o sinal” ligando um roteador doméstico na tomada de rede. O efeito podia ser o mesmo: ponte não autorizada para a rede corporativa, DHCP indevido, SSID enganoso, ausência de logs e política fora do controle da organização.</p>\n  <p>O evil twin evoluiu como uma variação mais enganosa: em vez de apenas existir um AP não autorizado, ele tenta parecer legítimo. Pode copiar SSID, imitar portal, usar potência mais alta ou explorar clientes configurados para conectar automaticamente. Mesmo quando WPA3 e EAP-TLS reduzem riscos criptográficos, ainda existem riscos de usuário, certificado, captive portal falso, transição WPA2/WPA3 e redes abertas de visitantes.</p>\n  <p>Deauth e disassociation também chamaram atenção porque muitos quadros de gerenciamento em Wi-Fi historicamente não tinham proteção forte. Protected Management Frames, definido no ecossistema 802.11w e tornado obrigatório em cenários WPA3, surgiu para reduzir a eficácia de certos abusos contra quadros de gerenciamento. Mesmo assim, compatibilidade, clientes antigos e modo de transição podem manter riscos residuais.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>A ameaça wireless é difícil porque mistura proximidade física, rádio, comportamento do cliente, autenticação e operação. Um firewall de borda pode estar perfeito e, ainda assim, o usuário pode se conectar a uma rede falsa antes de chegar à borda. Um SSID pode ter nome correto e BSSID errado. Um AP pode estar conectado à rede cabeada sem autorização. Um cliente pode abandonar o AP corporativo legítimo por causa de sinal, roaming, configuração salva ou engenharia social.</p>\n  <ul>\n    <li><strong>Rogue AP:</strong> equipamento não autorizado transmitindo ou conectado à rede corporativa.</li>\n    <li><strong>Evil twin:</strong> AP falso que imita uma rede legítima para induzir conexão, captura de credenciais ou interceptação.</li>\n    <li><strong>Deauth/disassociation abusivo:</strong> uso indevido de quadros de gerenciamento para derrubar ou forçar reconexões.</li>\n    <li><strong>SSID parecido:</strong> nome visualmente semelhante ao corporativo, usado para confundir usuários.</li>\n    <li><strong>Rede guest mal isolada:</strong> visitante alcança ativos internos por erro de VLAN, ACL ou firewall.</li>\n    <li><strong>Cliente mal configurado:</strong> ignora validação de certificado, aceita servidor RADIUS falso ou conecta automaticamente a redes inseguras.</li>\n  </ul>\n  <p>O problema defensivo não é apenas “bloquear tudo”. O desafio é diferenciar ruído normal de ameaça real, coletar evidência suficiente, evitar contenção indevida, preservar disponibilidade e corrigir causa raiz. Um prédio comercial pode ter dezenas de SSIDs vizinhos legítimos. Nem todo AP desconhecido é malicioso; nem todo SSID duplicado é ataque; nem toda desconexão é deauth. A defesa profissional exige contexto.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A defesa wireless evoluiu de senha e ocultação de SSID para inventário, autenticação forte, proteção de gerenciamento, WIDS/WIPS, correlação com identidade e resposta a incidente. Ocultar SSID, filtrar MAC e trocar senha raramente são controles suficientes. Hoje, a defesa madura combina arquitetura, monitoramento e educação.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Fase</th><th>Como era tratada</th><th>Limitação</th><th>Abordagem moderna</th></tr></thead>\n    <tbody>\n      <tr><td>Senha compartilhada</td><td>Todos usavam a mesma chave PSK.</td><td>Vaza facilmente, não identifica usuário e dificulta revogação individual.</td><td>WPA Enterprise, 802.1X, certificados, grupos e VLAN dinâmica.</td></tr>\n      <tr><td>Ocultar SSID</td><td>Tentativa de reduzir visibilidade da rede.</td><td>Não elimina exposição e pode aumentar comportamento ativo do cliente.</td><td>Assumir que SSID é visível e proteger autenticação, segmentação e logs.</td></tr>\n      <tr><td>Filtro de MAC</td><td>Permitir apenas endereços conhecidos.</td><td>MAC pode ser aleatório ou falsificado; escala mal.</td><td>Identidade forte, MDM/NAC, postura de dispositivo e certificados.</td></tr>\n      <tr><td>Rogue manual</td><td>Alguém andava pelo prédio procurando AP desconhecido.</td><td>Lento, subjetivo e sem histórico.</td><td>WIDS/WIPS, inventário de BSSID, localização aproximada, logs e processo de triagem.</td></tr>\n      <tr><td>Resposta improvisada</td><td>Trocar senha ou desligar APs sem análise.</td><td>Pode derrubar produção e não resolver causa raiz.</td><td>Playbook com severidade, evidências, contenção autorizada e comunicação.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Ameaças wireless são riscos que exploram o fato de que a rede sem fio usa rádio, anuncia informações de gerenciamento, depende de decisões do cliente e fica exposta ao ambiente físico. Elas podem afetar confidencialidade, integridade, disponibilidade, autenticação, segmentação e confiança do usuário.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> no contexto desta aula, ameaça wireless é qualquer condição maliciosa ou insegura que permita conexão não autorizada, rede falsa, degradação de disponibilidade, captura indevida de credenciais, desvio de tráfego ou bypass de política usando a camada sem fio ou sua integração com a rede cabeada.</div>\n  <p>Três ideias são essenciais. Primeiro, SSID é apenas um nome de rede, não uma garantia de legitimidade. Segundo, BSSID identifica uma interface de rádio/AP, mas precisa ser comparado com inventário autorizado. Terceiro, segurança wireless não termina na criptografia: ela depende de autenticação correta, validação de certificados, segmentação, firewall, logs, detecção e resposta.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Para entender ameaças wireless, pense no caminho do cliente antes de acessar qualquer aplicação. Ele escuta beacons, pode enviar probes, escolhe um BSSID, associa, autentica, negocia segurança, recebe IP, resolve DNS e só então começa a acessar serviços. Um risco pode aparecer em qualquer etapa.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Descoberta:</strong> o cliente vê SSIDs e BSSIDs anunciados. Um SSID falso ou parecido pode aparecer nessa etapa.</li>\n    <li><strong>Escolha de BSSID:</strong> o cliente decide com base em sinal, histórico, perfil salvo, política do sistema e recursos suportados. Um AP falso com sinal alto pode influenciar a decisão.</li>\n    <li><strong>Associação:</strong> cliente e AP estabelecem relação de camada 2. Associação não prova que a rede é confiável.</li>\n    <li><strong>Autenticação e chaveamento:</strong> PSK, SAE ou 802.1X/EAP determinam se o cliente entra. Configuração fraca pode permitir rede falsa ou credenciais expostas.</li>\n    <li><strong>Camada 3:</strong> DHCP, gateway, DNS e rotas determinam para onde o tráfego vai. Um rogue AP pode entregar DHCP próprio se estiver mal posicionado.</li>\n    <li><strong>Aplicação:</strong> TLS, validação de certificado, proxy e identidade ainda protegem o usuário mesmo em rede hostil, se configurados corretamente.</li>\n  </ol>\n  <p>Deauth/disassociation atua antes ou durante a permanência do cliente no BSS. Em vez de roubar dados diretamente, pode derrubar sessões, forçar reconexão, degradar serviço ou induzir cliente a procurar outra rede. PMF reduz esse risco protegendo determinados quadros de gerenciamento, mas sua efetividade depende de suporte e configuração.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura defensiva para ameaças wireless combina prevenção, detecção e resposta. Prevenção inclui WPA Enterprise, certificados, PMF, segmentação, guest isolation, desativação de protocolos fracos, inventário de APs e boas políticas de cliente. Detecção inclui WIDS/WIPS, logs de controladora, inventário de BSSIDs, alertas de SSID duplicado, análise de autenticação falha, DHCP anômalo e relatos de usuários. Resposta inclui triagem, validação física, contenção autorizada, comunicação, correção e lições aprendidas.</p>\n  <ul>\n    <li><strong>Camada física/RF:</strong> localização aproximada, canal, potência, BSSID, fabricante/OUI e horário.</li>\n    <li><strong>Camada 2:</strong> SSID, BSSID, tipo de segurança, beacons, probes, autenticação, associação e PMF.</li>\n    <li><strong>Camada 3:</strong> DHCP, gateway, DNS, rotas e sub-rede recebida pelo cliente.</li>\n    <li><strong>Identidade:</strong> método EAP, certificado, RADIUS, usuário, dispositivo, grupo e política.</li>\n    <li><strong>Segurança:</strong> WIDS/WIPS, firewall, SIEM, EDR, proxy, logs e playbook.</li>\n  </ul>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense no Wi-Fi corporativo como a recepção de um prédio. O SSID é a placa na porta dizendo “Empresa X”. O BSSID é a identificação daquela porta específica. A autenticação é o processo de verificar crachá, documento e autorização. Um rogue AP seria uma porta improvisada que alguém abriu sem autorização. Um evil twin seria uma recepção falsa com uma placa parecida, tentando convencer visitantes a entregar credenciais. Deauth seria alguém gritando no corredor para as pessoas saírem e tentarem entrar por outra porta.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> no mundo real, pessoas percebem facilmente portas físicas falsas. Em Wi-Fi, o cliente decide com base em sinais técnicos invisíveis, perfis salvos e políticas do sistema. Por isso, a defesa precisa de inventário, certificados, validação automática e monitoramento, não apenas treinamento humano.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, você vê duas redes: <code>MinhaCasa</code> e <code>MinhaCasa-5G</code>. Um vizinho ou atacante poderia criar <code>MinhaCasa Gratis</code> ou até um SSID igual, dependendo do ambiente. Se seu dispositivo tiver um perfil salvo inseguro, pode tentar conectar automaticamente. Se você usa sites com HTTPS corretamente validado, muito ainda permanece protegido; mas DNS, captive portals falsos, aplicativos mal configurados e usuários digitando senhas em páginas falsas continuam sendo risco.</p>\n  <p>Esse exemplo mostra que nome de rede não basta. Você precisa olhar segurança, BSSID, certificado, comportamento do sistema e destino real do tráfego.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa usa o SSID <code>Corp-Secure</code> com WPA Enterprise e EAP-TLS. Um dispositivo desconhecido aparece anunciando o mesmo SSID em um canal diferente, com BSSID fora do inventário. Usuários próximos relatam desconexões. O SOC precisa verificar: o BSSID pertence a um AP novo ainda não cadastrado? É AP de laboratório? É SSID vizinho com nome igual? Há falhas de autenticação RADIUS no mesmo horário? Algum cliente recebeu IP fora das VLANs esperadas? A controladora viu eventos de deauth? Há aumento de tickets em uma área física?</p>\n  <p>A resposta correta não é simplesmente “atacar de volta” ou derrubar tudo. O processo profissional envolve triagem, evidência, validação com inventário, confirmação física, contenção autorizada e melhoria de controles. Em alguns países e ambientes, contenção ativa por rádio pode ter restrições legais e deve ser feita apenas por equipe autorizada, em conformidade com política interna e legislação.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em arquiteturas cloud-managed, a controladora ou painel em nuvem recebe telemetria dos APs, inventário, eventos de associação, autenticação, canal, potência, cliente e alertas de rogue. Isso ajuda filiais distribuídas, mas cria novas dependências: conectividade de gestão, licença, retenção de logs, API do fabricante, integração com SIEM e controle de acesso ao portal.</p>\n  <p>O tráfego do usuário pode nem sempre passar pela nuvem do fornecedor; muitas vezes apenas a gestão é cloud. Por isso, o time precisa entender onde estão os dados: logs no provedor de WLAN, eventos no RADIUS, DHCP local, DNS interno, firewall, proxy, EDR e SIEM. Em resposta a incidente, a pergunta correta é: qual fonte prova que o cliente se conectou a qual BSSID, em qual horário, com qual método de autenticação, recebendo qual IP e acessando quais destinos?</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a defesa wireless aparece como configuração versionável, política como código e integração de logs. SSIDs, VLANs, regras de firewall, perfis de autenticação, certificados, grupos de usuários, alertas e integrações com SIEM devem ser tratados como artefatos revisáveis. Uma mudança em WPA, PMF, rede guest ou política de IoT deveria passar por revisão, janela, rollback e validação.</p>\n  <p>Um pipeline de governança pode verificar se todo SSID tem dono, descrição, tipo de autenticação, VLAN, política de firewall, retenção de logs e justificativa. Uma automação pode comparar inventário de BSSIDs autorizados com dados exportados da controladora. Outra pode abrir ticket se surgir SSID corporativo duplicado fora do inventário. O objetivo não é automatizar punição; é reduzir tempo de detecção e tornar a operação auditável.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>O foco de segurança é reconhecer sinais e reduzir impacto. A tabela abaixo resume ameaças comuns, como aparecem, impacto e mitigação defensiva.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Rogue AP</td><td>BSSID desconhecido, AP fora do inventário, equipamento ligado em porta interna.</td><td>Bypass de política, DHCP indevido, ponte não autorizada.</td><td>Inventário, WIDS/WIPS, controle de portas, NAC cabeado, inspeção física e segmentação.</td></tr>\n      <tr><td>Evil twin</td><td>SSID igual ou parecido, BSSID desconhecido, portal suspeito, certificado inválido.</td><td>Phishing, captura de credenciais, desvio de tráfego.</td><td>EAP-TLS, validação de certificado, treinamento, MDM, bloqueio de autojoin inseguro e monitoramento.</td></tr>\n      <tr><td>Deauth abusivo</td><td>Desconexões em massa, aumento de eventos de gerenciamento, clientes reconectando repetidamente.</td><td>Indisponibilidade, degradação de voz e tentativa de induzir reconexão.</td><td>PMF quando suportado, atualização de clientes, WIDS, análise de RF e resposta autorizada.</td></tr>\n      <tr><td>Guest mal isolado</td><td>Visitante alcança gateway interno, impressoras ou servidores.</td><td>Movimento lateral e exposição de ativos.</td><td>Firewall deny-by-default, VLAN guest, client isolation, testes periódicos e logs.</td></tr>\n      <tr><td>Cliente inseguro</td><td>Aceita certificado errado, conecta em SSID parecido ou usa redes abertas.</td><td>Roubo de credenciais ou tráfego exposto.</td><td>MDM, perfil Wi-Fi gerenciado, EAP-TLS, bloqueio de redes abertas e educação.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1180 620\" role=\"img\" aria-labelledby=\"wireless-threats-title wireless-threats-desc\">\n    <title id=\"wireless-threats-title\">Ameaças wireless e fluxo defensivo</title>\n    <desc id=\"wireless-threats-desc\">Um cliente corporativo vê um AP legítimo, um rogue AP e um evil twin. A controladora, o WIDS, o RADIUS, o firewall e o SIEM ajudam a detectar, validar e responder.</desc>\n    <defs><marker id=\"arrow-wireless-threats\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n\n    <rect x=\"30\" y=\"80\" width=\"250\" height=\"420\" rx=\"22\" class=\"svg-zone\" />\n    <text x=\"155\" y=\"112\" text-anchor=\"middle\" class=\"svg-label\">Área do usuário</text>\n    <rect x=\"75\" y=\"205\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"155\" y=\"238\" text-anchor=\"middle\" class=\"svg-label\">Notebook</text>\n    <text x=\"155\" y=\"263\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">decide em qual BSSID entrar</text>\n\n    <rect x=\"350\" y=\"80\" width=\"210\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"455\" y=\"113\" text-anchor=\"middle\" class=\"svg-label\">AP legítimo</text>\n    <text x=\"455\" y=\"139\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SSID Corp / BSSID autorizado</text>\n\n    <rect x=\"350\" y=\"260\" width=\"210\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"455\" y=\"293\" text-anchor=\"middle\" class=\"svg-label\">Evil twin</text>\n    <text x=\"455\" y=\"319\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SSID parecido ou clonado</text>\n\n    <rect x=\"350\" y=\"430\" width=\"210\" height=\"86\" rx=\"14\" class=\"svg-node svg-node--attacker\" />\n    <text x=\"455\" y=\"463\" text-anchor=\"middle\" class=\"svg-label\">Rogue AP</text>\n    <text x=\"455\" y=\"489\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">não autorizado / fora do inventário</text>\n\n    <rect x=\"650\" y=\"90\" width=\"190\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"745\" y=\"122\" text-anchor=\"middle\" class=\"svg-label\">Controladora</text>\n    <text x=\"745\" y=\"148\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">inventário e eventos</text>\n\n    <rect x=\"650\" y=\"250\" width=\"190\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"745\" y=\"282\" text-anchor=\"middle\" class=\"svg-label\">WIDS / WIPS</text>\n    <text x=\"745\" y=\"308\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">detecção e triagem</text>\n\n    <rect x=\"650\" y=\"420\" width=\"190\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"745\" y=\"452\" text-anchor=\"middle\" class=\"svg-label\">RADIUS / IAM</text>\n    <text x=\"745\" y=\"478\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">usuário, cert, método EAP</text>\n\n    <rect x=\"930\" y=\"165\" width=\"190\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"1025\" y=\"197\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"1025\" y=\"223\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">isolamento e egress</text>\n\n    <rect x=\"930\" y=\"360\" width=\"190\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"1025\" y=\"392\" text-anchor=\"middle\" class=\"svg-label\">SIEM / SOC</text>\n    <text x=\"1025\" y=\"418\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">correlação e resposta</text>\n\n    <line x1=\"235\" y1=\"235\" x2=\"350\" y2=\"123\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"235\" y1=\"250\" x2=\"350\" y2=\"302\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"235\" y1=\"268\" x2=\"350\" y2=\"473\" class=\"svg-flow svg-flow--blocked animated-flow\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"560\" y1=\"123\" x2=\"650\" y2=\"130\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"560\" y1=\"303\" x2=\"650\" y2=\"291\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"560\" y1=\"473\" x2=\"650\" y2=\"291\" class=\"svg-flow svg-flow--blocked\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"840\" y1=\"290\" x2=\"930\" y2=\"400\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"840\" y1=\"130\" x2=\"930\" y2=\"206\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-wireless-threats)\" />\n    <line x1=\"840\" y1=\"462\" x2=\"930\" y2=\"400\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-wireless-threats)\" />\n\n    <text x=\"590\" y=\"560\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Defesa madura: inventário + autenticação forte + PMF + segmentação + WIDS/WIPS + logs + resposta autorizada</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é defensivo. Você vai criar uma matriz de inventário wireless, coletar informações visíveis do ambiente, comparar SSIDs/BSSIDs com uma lista autorizada fictícia e classificar achados. Não execute deauth, não tente capturar senha, não crie evil twin, não realize contenção ativa e não faça monitoramento em redes de terceiros. O objetivo é treinar triagem e evidência.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios trabalham interpretação de evidências: SSIDs duplicados, BSSID desconhecido, falhas RADIUS, reclamações de usuários, DHCP suspeito e isolamento guest. A ideia é separar hipótese plausível de conclusão precipitada.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário de filial com alerta de SSID duplicado e usuários desconectando. O desafio é montar um playbook defensivo, listar evidências, classificar severidade e propor mitigação sem usar técnicas ofensivas.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como conduzir a investigação por camadas: primeiro inventário e RF, depois associação/autenticação, depois DHCP/DNS/firewall, depois identidade e impacto. A resposta correta depende de evidência, não de medo.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> ameaças wireless exploram rádio, confiança do cliente, SSID/BSSID, autenticação e configuração.</li>\n    <li><strong>O que lembrar:</strong> SSID não prova legitimidade; inventário de BSSID e validação de certificado são essenciais.</li>\n    <li><strong>Erro comum:</strong> concluir que todo SSID duplicado é ataque ou ignorar SSID duplicado como se fosse apenas interferência.</li>\n    <li><strong>Uso real:</strong> o Blue Team precisa correlacionar controladora, WIDS/WIPS, RADIUS, DHCP, firewall, EDR, SIEM e relato de usuário.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você vai estudar troubleshooting Wi-Fi com Windows, Linux e controladora. Depois de conhecer ameaças e controles, é hora de aprender a investigar falhas reais de forma metódica: RF, associação, autenticação, DHCP, DNS, rota, firewall e aplicação.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Rede",
      "Camada 7 - Aplicação e identidade"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IEEE 802.11",
      "802.11w/PMF",
      "WPA2",
      "WPA3",
      "SAE",
      "802.1X",
      "EAP",
      "EAPOL",
      "RADIUS",
      "DHCP",
      "DNS",
      "TLS",
      "Syslog"
    ],
    "dependsOn": [
      "RF",
      "SSID",
      "BSSID",
      "associação",
      "autenticação",
      "WPA Enterprise",
      "VLAN",
      "firewall",
      "logs"
    ],
    "enables": [
      "WIDS/WIPS",
      "triagem defensiva",
      "resposta a incidente wireless",
      "hardening de WLAN",
      "SOC e Blue Team"
    ]
  },
  "protocolFields": [
    {
      "field": "SSID",
      "size": "variável",
      "purpose": "Nome lógico anunciado ou procurado pelo cliente.",
      "securityObservation": "Pode ser clonado ou imitado; não prova legitimidade."
    },
    {
      "field": "BSSID",
      "size": "48 bits",
      "purpose": "Identificar a interface rádio/AP que anuncia um BSS.",
      "securityObservation": "Deve ser comparado com inventário autorizado; sozinho não prova segurança."
    },
    {
      "field": "Management frame subtype",
      "size": "campo de subtipo",
      "purpose": "Diferenciar beacon, probe, authentication, association, deauthentication e disassociation.",
      "securityObservation": "Alguns abusos visam quadros de gerenciamento; PMF reduz riscos quando suportado."
    },
    {
      "field": "RSN information",
      "size": "variável",
      "purpose": "Anunciar capacidades de segurança como AKM, cifra e PMF.",
      "securityObservation": "Configurações de transição e compatibilidade podem abrir exceções operacionais."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Escuta beacons e probes",
      "detail": "Identifica SSIDs/BSSIDs e tipos de segurança no ambiente.",
      "possibleFailure": "Cliente escolhe SSID parecido ou BSSID desconhecido."
    },
    {
      "step": 2,
      "actor": "Cliente",
      "action": "Associa ao BSSID escolhido",
      "detail": "A decisão pode considerar sinal, perfil salvo e histórico.",
      "possibleFailure": "Evil twin com sinal mais forte pode atrair cliente mal configurado."
    },
    {
      "step": 3,
      "actor": "AP/RADIUS",
      "action": "Autentica e negocia chaves",
      "detail": "PSK, SAE ou 802.1X/EAP validam acesso.",
      "possibleFailure": "Certificado de servidor não validado permite risco de autenticação contra infraestrutura falsa."
    },
    {
      "step": 4,
      "actor": "Rede",
      "action": "Entrega IP, DNS e política",
      "detail": "DHCP, VLAN e firewall definem alcance real do cliente.",
      "possibleFailure": "Rogue AP pode entregar DHCP indevido ou guest pode acessar rede interna por erro de política."
    },
    {
      "step": 5,
      "actor": "SOC",
      "action": "Correlaciona evidências",
      "detail": "Controladora, WIDS, RADIUS, DHCP, firewall e SIEM ajudam a reconstruir o evento.",
      "possibleFailure": "Sem logs e inventário, a investigação vira opinião."
    }
  ],
  "trafficCapture": {
    "tool": "Wireshark ou tcpdump em ambiente autorizado e, quando suportado, interface em monitor mode",
    "filter": "wlan.fc.type == 0 or wlan.fc.type_subtype == 0x0c or wlan.fc.type_subtype == 0x0a",
    "whatToObserve": [
      "Beacon frames",
      "Probe request/response",
      "Authentication/association",
      "Deauthentication/disassociation",
      "BSSID e canal",
      "RSN/AKM/PMF quando visível"
    ],
    "interpretation": "O objetivo é observar sinais defensivos e metadados 802.11, não capturar credenciais nem atacar redes. Use apenas redes próprias ou ambiente autorizado."
  },
  "deepDive": {
    "mentalModel": "Ameaças wireless são investigadas por confiança declarada versus confiança comprovada: nome do SSID, BSSID autorizado, segurança anunciada, autenticação real, IP recebido, caminho de rede e logs.",
    "keyTerms": [
      "rogue AP",
      "evil twin",
      "deauthentication",
      "disassociation",
      "PMF",
      "WIDS",
      "WIPS",
      "BSSID",
      "OUI",
      "EAP-TLS"
    ],
    "limitations": [
      "WIDS pode gerar falso positivo em prédios com muitas redes vizinhas.",
      "PMF depende de suporte de cliente e configuração.",
      "Inventário desatualizado torna detecção frágil.",
      "Contenção ativa pode ter restrição legal e operacional.",
      "SIEM tradicional pode não enxergar eventos que ficam apenas na camada wireless."
    ],
    "whenToUse": [
      "Ao investigar SSID duplicado ou BSSID desconhecido.",
      "Ao revisar segurança WLAN corporativa.",
      "Ao criar playbook de SOC para Wi-Fi.",
      "Ao validar isolamento de guest e IoT.",
      "Ao migrar para WPA Enterprise/EAP-TLS."
    ],
    "whenNotToUse": [
      "Não usar técnicas de ataque em redes reais sem autorização formal.",
      "Não executar contenção ativa sem política e autorização.",
      "Não tratar SSID vizinho como ameaça sem evidência.",
      "Não substituir segmentação e identidade por ocultação de SSID."
    ],
    "operationalImpact": [
      "Exige inventário permanente de APs/BSSIDs.",
      "Exige integração entre rede, segurança, suporte físico e SOC.",
      "Pode aumentar volume de alertas e falsos positivos.",
      "Demanda playbooks e treinamento de suporte."
    ],
    "financialImpact": [
      "WIDS/WIPS e WLAN corporativa podem exigir licença.",
      "Retenção de logs gera custo de armazenamento e SIEM.",
      "EAP-TLS exige PKI/MDM ou processo equivalente.",
      "APs dedicados a sensor podem elevar custo, mas reduzir tempo de detecção."
    ],
    "securityImpact": [
      "Reduz risco de phishing wireless, rogue AP e bypass de segmentação.",
      "Melhora investigação e atribuição.",
      "Evita falsa sensação de segurança baseada apenas em senha de Wi-Fi.",
      "Exige cuidado para não gerar contenção indevida ou violar regras de rádio."
    ],
    "decisionTable": [
      {
        "situation": "SSID corporativo duplicado com BSSID fora do inventário",
        "recommendedChoice": "Triar como suspeita, coletar canal/RSSI/OUI/localização e correlacionar logs",
        "why": "Pode ser vizinho, AP novo não registrado ou evil twin",
        "risk": "Responder sem evidência pode causar falso incidente ou ignorar ameaça real"
      },
      {
        "situation": "Visitante alcança impressora interna",
        "recommendedChoice": "Revisar VLAN, firewall, client isolation e regras interzonas",
        "why": "É falha de segmentação, não apenas problema wireless",
        "risk": "Movimento lateral a partir de rede de baixa confiança"
      },
      {
        "situation": "Muitos eventos de desconexão em área específica",
        "recommendedChoice": "Comparar RF, roaming, logs de deauth, PMF e relatos de usuários",
        "why": "Pode ser interferência, AP sobrecarregado ou abuso de gerenciamento",
        "risk": "Culpar ataque sem descartar problema operacional"
      }
    ]
  },
  "realWorld": {
    "homeScenario": "SSID parecido aparece no condomínio; usuário precisa verificar segurança e não digitar senhas em portal estranho.",
    "smallBusinessScenario": "Funcionário conecta roteador doméstico na rede cabeada para melhorar sinal, criando rogue AP e DHCP indevido.",
    "enterpriseScenario": "SOC recebe alerta de BSSID desconhecido anunciando SSID corporativo e cruza com logs de RADIUS e controladora.",
    "cloudScenario": "Controladora cloud-managed envia alerta de rogue e exporta eventos por API para SIEM.",
    "incidentScenario": "Usuários de uma sala relatam quedas e novo portal de login; investigação encontra SSID parecido com certificado inválido."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que SSID oculto é segurança.",
      "whyItHappens": "Parece intuitivo que algo invisível seja mais seguro.",
      "consequence": "A organização ignora autenticação forte, inventário e logs.",
      "correction": "Assuma que SSID e metadados podem ser descobertos; proteja autenticação, criptografia, segmentação e clientes."
    },
    {
      "mistake": "Concluir que todo SSID duplicado é evil twin.",
      "whyItHappens": "O nome igual assusta e parece prova suficiente.",
      "consequence": "Gera falso incidente e perda de confiança no processo.",
      "correction": "Verifique BSSID, OUI, canal, localização, inventário, segurança anunciada e logs."
    },
    {
      "mistake": "Responder com contenção ativa sem autorização.",
      "whyItHappens": "A equipe tenta resolver rápido.",
      "consequence": "Pode causar indisponibilidade, atingir terceiros ou violar regras internas/legais.",
      "correction": "Use playbook aprovado, autorização formal e evidências."
    },
    {
      "mistake": "Usar PSK compartilhado em SSID corporativo sensível.",
      "whyItHappens": "É mais simples de configurar.",
      "consequence": "Não há revogação individual nem atribuição confiável.",
      "correction": "Preferir WPA Enterprise/EAP-TLS, MDM/NAC e grupos."
    },
    {
      "mistake": "Confiar apenas no firewall de borda.",
      "whyItHappens": "A equipe pensa em segurança somente depois do gateway.",
      "consequence": "A ameaça acontece antes do tráfego chegar aos controles tradicionais.",
      "correction": "Adicionar controle na borda wireless, cliente, identidade e monitoramento RF."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "SSID corporativo aparece duplicado",
      "usuários desconectam repetidamente",
      "cliente recebe IP fora da faixa esperada",
      "falhas RADIUS aumentam em uma área",
      "rede guest acessa ativos internos",
      "portal captive suspeito aparece",
      "BSSID desconhecido anuncia nome parecido"
    ],
    "diagnosticQuestions": [
      "O BSSID está no inventário autorizado?",
      "O tipo de segurança anunciado é igual ao esperado?",
      "Há logs de associação/autenticação na controladora?",
      "O RADIUS registrou falhas ou servidor desconhecido?",
      "O cliente recebeu IP de qual DHCP?",
      "Há aumento de eventos de deauth/disassociation?",
      "A ocorrência está limitada a uma área física?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show networks mode=bssid",
        "purpose": "Listar SSIDs visíveis, BSSIDs, canal, sinal e tipo de autenticação.",
        "expectedObservation": "Redes próximas com BSSID, autenticação e sinal.",
        "interpretation": "Compare SSID/BSSID com inventário autorizado e procure duplicidade suspeita."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, rádio, canal, sinal e estado atual da conexão.",
        "expectedObservation": "BSSID atual e detalhes do perfil conectado.",
        "interpretation": "Confirme se o cliente está no BSSID autorizado esperado."
      },
      {
        "platform": "Linux",
        "command": "nmcli -f SSID,BSSID,CHAN,SIGNAL,SECURITY dev wifi list",
        "purpose": "Listar redes visíveis com BSSID, canal, sinal e segurança.",
        "expectedObservation": "Tabela com SSIDs, BSSIDs e segurança.",
        "interpretation": "Identifique nomes duplicados, segurança divergente e BSSIDs desconhecidos."
      },
      {
        "platform": "Linux",
        "command": "iw dev wlan0 link",
        "purpose": "Ver BSSID atual, frequência, sinal e taxa.",
        "expectedObservation": "Connected to <BSSID> com SSID e sinal.",
        "interpretation": "Valide se o cliente está no AP esperado."
      },
      {
        "platform": "Linux",
        "command": "ip addr && ip route && resolvectl status",
        "purpose": "Validar IP, rota e DNS após conexão.",
        "expectedObservation": "IP, gateway e DNS compatíveis com a VLAN esperada.",
        "interpretation": "IP ou DNS inesperado pode indicar VLAN errada, DHCP indevido ou rede falsa."
      },
      {
        "platform": "Wireshark",
        "command": "wlan.fc.type == 0 or wlan.fc.type_subtype == 0x0c or wlan.fc.type_subtype == 0x0a",
        "purpose": "Filtrar quadros de gerenciamento e eventos de deauth/disassociation em ambiente autorizado.",
        "expectedObservation": "Beacons, probes e possíveis quadros de gerenciamento relevantes.",
        "interpretation": "Use apenas para análise defensiva e correlacione com logs; não capture credenciais."
      },
      {
        "platform": "Cisco IOS XE Wireless",
        "command": "show wireless wps rogue ap summary",
        "purpose": "Ver resumo de rogue APs detectados em controladoras compatíveis.",
        "expectedObservation": "Lista ou contagem de rogue APs classificados.",
        "interpretation": "Use como ponto de triagem, não como prova isolada."
      }
    ],
    "decisionTree": [
      {
        "if": "SSID igual ao corporativo aparece com BSSID fora do inventário",
        "then": "Coletar canal, RSSI, OUI, localização, segurança anunciada e correlacionar com controladora/RADIUS."
      },
      {
        "if": "Clientes recebem IP fora da faixa esperada",
        "then": "Investigar DHCP indevido, VLAN errada, rogue AP ou rede guest mal segmentada."
      },
      {
        "if": "Eventos de desconexão em massa ocorrem em área específica",
        "then": "Verificar RF, interferência, AP sobrecarregado, roaming, PMF e eventos de gerenciamento."
      },
      {
        "if": "Usuário viu portal de login inesperado",
        "then": "Preservar evidências, validar URL/certificado, checar BSSID, orientar usuário a não digitar senha e acionar SOC."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter inventário de APs, BSSIDs, SSIDs, canais e locais.",
      "Preferir WPA Enterprise com EAP-TLS para rede corporativa.",
      "Validar certificado do servidor de autenticação nos perfis Wi-Fi gerenciados.",
      "Ativar PMF quando compatível e obrigatório onde possível.",
      "Separar guest, IoT, corporativo e gerenciamento com VLANs e firewall.",
      "Integrar controladora/WIDS/RADIUS/DHCP/firewall ao SIEM.",
      "Criar playbook de resposta para SSID duplicado, rogue AP e suspeita de evil twin."
    ],
    "badPractices": [
      "Usar PSK compartilhado para todos os usuários corporativos.",
      "Confiar em SSID oculto como controle principal.",
      "Aceitar qualquer certificado em 802.1X.",
      "Permitir guest acessar rede interna.",
      "Fazer contenção ativa sem autorização.",
      "Ignorar logs de associação e autenticação.",
      "Não revisar APs conectados em portas cabeadas."
    ],
    "commonErrors": [
      "Confundir rogue AP com evil twin.",
      "Tratar SSID como identidade confiável.",
      "Não registrar BSSID autorizado.",
      "Achar que firewall externo detecta todo ataque wireless.",
      "Desabilitar PMF por compatibilidade sem plano de mitigação."
    ],
    "vulnerabilities": [
      {
        "name": "Rogue AP conectado à LAN",
        "description": "AP não autorizado cria ponte ou DHCP indevido dentro da rede corporativa.",
        "defensiveExplanation": "Pode ser causado por erro de funcionário ou intenção maliciosa; o risco é bypass de controles WLAN corporativos.",
        "mitigation": "NAC cabeado, port security, inventário, WIDS/WIPS, inspeção física e segmentação."
      },
      {
        "name": "Evil twin",
        "description": "AP falso tenta imitar rede legítima para induzir conexão ou captura de credenciais.",
        "defensiveExplanation": "Funciona melhor contra clientes mal configurados, redes abertas, PSK fraco ou validação de certificado ausente.",
        "mitigation": "EAP-TLS, validação de certificado, MDM, PMF, treinamento e detecção de SSID/BSSID anômalo."
      },
      {
        "name": "Deauth/disassociation abusivo",
        "description": "Quadros de gerenciamento são usados para causar desconexões ou induzir reconexão.",
        "defensiveExplanation": "Afeta disponibilidade e experiência; pode ser confundido com roaming ou interferência.",
        "mitigation": "PMF, atualização de clientes, WIDS, análise de RF e resposta autorizada."
      },
      {
        "name": "Guest sem isolamento",
        "description": "Rede de visitantes alcança ativos internos por erro de política.",
        "defensiveExplanation": "É falha de arquitetura e firewall, não apenas de Wi-Fi.",
        "mitigation": "VLAN guest, client isolation, firewall deny-by-default, testes regulares e logs."
      }
    ],
    "monitoring": [
      "Alertas de SSID duplicado",
      "BSSID desconhecido anunciando SSID corporativo",
      "Aumento de falhas RADIUS",
      "Eventos de deauth/disassociation fora do padrão",
      "DHCP anômalo",
      "Mudança inesperada de gateway/DNS",
      "AP conectado a porta cabeada sem autorização"
    ],
    "hardening": [
      "WPA Enterprise/EAP-TLS",
      "PMF required onde suportado",
      "MDM para perfis Wi-Fi",
      "bloqueio de autojoin em redes abertas",
      "VLANs por função",
      "firewall interzonas",
      "NAC cabeado",
      "retenção de logs"
    ],
    "detectionIdeas": [
      "Comparar BSSIDs vistos por clientes com inventário autorizado.",
      "Correlacionar SSID duplicado com falhas RADIUS e tickets de suporte.",
      "Verificar se clientes receberam IP fora do escopo esperado.",
      "Alertar quando segurança anunciada divergir da política do SSID.",
      "Cruzar localização de AP suspeito com planta física e APs vizinhos."
    ]
  },
  "lab": {
    "id": "lab-12.8",
    "title": "Inventário e triagem defensiva de SSIDs, BSSIDs e sinais de ameaça wireless",
    "labType": "security",
    "objective": "Coletar informações wireless visíveis, comparar com um inventário autorizado fictício e classificar achados sem executar ações ofensivas.",
    "scenario": "Você faz parte do Blue Team. Usuários relatam desconexões e um SSID parecido com o corporativo apareceu. Você precisa criar evidências para decidir se é vizinho legítimo, erro operacional, rogue AP ou possível evil twin.",
    "topology": "Notebook do analista -> ambiente Wi-Fi autorizado -> APs corporativos -> controladora/RADIUS/firewall/SIEM conceituais.",
    "architecture": "Laboratório local defensivo com coleta passiva/administrativa de metadados visíveis. Não há criação de AP falso, deauth, captura de credenciais ou ataque.",
    "prerequisites": [
      "Ter concluído as aulas 12.1 a 12.7.",
      "Usar apenas rede própria ou ambiente autorizado.",
      "Conhecer o SSID/BSSID esperado ou criar inventário fictício para exercício.",
      "Ter permissão para coletar metadados do ambiente."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Linux com NetworkManager ou iw",
      "Opcional: Wireshark em ambiente autorizado",
      "Editor de texto ou planilha local para matriz de evidências",
      "Opcional: portal/controladora corporativa em ambiente real autorizado"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não execute deauth/disassociation.",
      "Não crie AP falso ou evil twin.",
      "Não capture senhas, cookies ou tráfego de terceiros.",
      "Não realize contenção ativa por rádio sem autorização formal.",
      "Não investigue redes de terceiros; use apenas ambiente próprio/autorizado.",
      "Quando houver suspeita real, preserve evidências e siga o processo da organização."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Criar inventário autorizado fictício",
        "instruction": "Monte uma tabela com SSID, BSSID autorizado, local, canal esperado, tipo de segurança e VLAN esperada. Se você não tiver ambiente corporativo, use valores fictícios e compare com sua rede doméstica apenas para treino.",
        "command": "SSID: Corp-Secure | BSSID: aa:bb:cc:11:22:33 | Canal: 36 | Segurança: WPA2/WPA3 Enterprise | VLAN: 120\nSSID: Corp-Guest | BSSID: aa:bb:cc:11:22:44 | Canal: 36 | Segurança: OWE/Captive Portal | VLAN: 220",
        "expectedOutput": "Uma matriz autorizada com pelo menos dois SSIDs/BSSIDs esperados.",
        "explanation": "Sem inventário, BSSID desconhecido não pode ser classificado com confiança."
      },
      {
        "number": 2,
        "title": "Listar redes visíveis no Windows",
        "instruction": "Se estiver no Windows, liste SSIDs, BSSIDs, canais, sinal e autenticação.",
        "command": "netsh wlan show networks mode=bssid",
        "expectedOutput": "Lista de redes com SSID, BSSID, Signal, Radio type, Channel e Authentication.",
        "explanation": "Esse comando permite comparar redes visíveis com o inventário autorizado sem capturar tráfego."
      },
      {
        "number": 3,
        "title": "Listar redes visíveis no Linux",
        "instruction": "Se estiver no Linux, liste redes visíveis com BSSID, canal, sinal e segurança.",
        "command": "nmcli -f SSID,BSSID,CHAN,SIGNAL,SECURITY dev wifi list",
        "expectedOutput": "Tabela com SSID, BSSID, canal, sinal e segurança.",
        "explanation": "A coleta ajuda a identificar duplicidades, segurança divergente e BSSIDs fora do inventário."
      },
      {
        "number": 4,
        "title": "Registrar conexão atual",
        "instruction": "Verifique em qual BSSID seu cliente está conectado e registre canal, sinal e SSID.",
        "command": "netsh wlan show interfaces  # Windows\niw dev wlan0 link              # Linux",
        "expectedOutput": "SSID atual, BSSID atual, sinal/frequência/canal quando disponível.",
        "explanation": "O cliente pode estar conectado a um BSSID diferente do esperado mesmo quando o SSID parece correto."
      },
      {
        "number": 5,
        "title": "Validar camada 3 após associação",
        "instruction": "Verifique IP, gateway e DNS. Compare com o segmento esperado para aquele SSID.",
        "command": "ipconfig /all  # Windows\nip addr && ip route && resolvectl status  # Linux",
        "expectedOutput": "IP, gateway e DNS compatíveis com a VLAN esperada.",
        "explanation": "Um IP inesperado pode indicar VLAN errada, DHCP indevido, rede falsa ou erro de arquitetura."
      },
      {
        "number": 6,
        "title": "Classificar achados",
        "instruction": "Classifique cada achado em benigno, suspeito, crítico ou inconclusivo. Use evidências, não intuição.",
        "command": "Achado | Evidência | Hipótese | Severidade | Próxima ação\nSSID Corp-Secure com BSSID desconhecido | canal 11, sinal alto, segurança WPA2-Personal | possível SSID clonado ou AP não autorizado | alto | validar fisicamente e acionar SOC",
        "expectedOutput": "Tabela de triagem preenchida.",
        "explanation": "Classificação profissional evita tanto alarmismo quanto negligência."
      },
      {
        "number": 7,
        "title": "Planejar correlação de logs",
        "instruction": "Liste quais fontes você consultaria em ambiente corporativo real.",
        "command": "Fontes: controladora WLAN, WIDS/WIPS, RADIUS/NPS/ISE/ClearPass, DHCP, DNS, firewall, EDR, SIEM, tickets de suporte, planta física.",
        "expectedOutput": "Lista de fontes de evidência e motivo de consulta.",
        "explanation": "A ameaça wireless raramente é provada por uma única fonte."
      },
      {
        "number": 8,
        "title": "Definir mitigação sem ação ofensiva",
        "instruction": "Para cada hipótese, escreva mitigação defensiva proporcional.",
        "command": "Hipótese: evil twin provável\nMitigação: orientar usuários a não autenticar, validar certificado/perfil MDM, confirmar BSSID físico, abrir incidente, acionar equipe autorizada de WLAN, revisar PMF/EAP-TLS e alertas.",
        "expectedOutput": "Plano de resposta com ações autorizadas e seguras.",
        "explanation": "Mitigação madura protege usuários e preserva evidências sem violar limites éticos."
      }
    ],
    "expectedResult": "Ao final, o aluno deve ter uma matriz de inventário, uma coleta de redes visíveis, uma classificação de achados e um plano de resposta defensivo.",
    "validation": [
      {
        "check": "Inventário existe",
        "command": "Verificar se há SSID, BSSID, canal, segurança, VLAN e local",
        "expected": "Tabela preenchida",
        "ifFails": "Criar valores fictícios e repetir a coleta."
      },
      {
        "check": "Coleta contém BSSID",
        "command": "netsh wlan show networks mode=bssid ou nmcli -f SSID,BSSID,CHAN,SIGNAL,SECURITY dev wifi list",
        "expected": "BSSIDs visíveis",
        "ifFails": "Verificar adaptador Wi-Fi, permissões e drivers."
      },
      {
        "check": "Conexão atual foi registrada",
        "command": "netsh wlan show interfaces ou iw dev wlan0 link",
        "expected": "SSID/BSSID atual",
        "ifFails": "Conectar a uma rede autorizada ou registrar que não há conexão."
      },
      {
        "check": "Plano de mitigação respeita ética",
        "command": "Revisar se não há deauth, evil twin, captura de credencial ou contenção ativa não autorizada",
        "expected": "Somente ações defensivas",
        "ifFails": "Remover ações ofensivas e reescrever como triagem/controle autorizado."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Comando não mostra BSSID",
        "probableCause": "Driver, sistema operacional ou adaptador limita detalhes",
        "howToConfirm": "Testar outro comando ou adaptador",
        "fix": "Usar ferramenta alternativa ou registrar limitação."
      },
      {
        "symptom": "Muitos SSIDs duplicados aparecem",
        "probableCause": "Ambiente denso, vizinhos, mesh ou múltiplos APs legítimos",
        "howToConfirm": "Comparar BSSID/OUI/localização/inventário",
        "fix": "Classificar por evidência e não apenas por nome."
      },
      {
        "symptom": "IP recebido não bate com esperado",
        "probableCause": "VLAN errada, DHCP indevido, rede guest ou AP não autorizado",
        "howToConfirm": "Verificar gateway, DNS, escopo DHCP e logs",
        "fix": "Corrigir mapeamento de VLAN/DHCP ou acionar incidente se suspeito."
      },
      {
        "symptom": "Wireshark não captura 802.11 real",
        "probableCause": "Adaptador sem monitor mode ou captura traduzida para Ethernet",
        "howToConfirm": "Verificar modo de captura e documentação do adaptador",
        "fix": "Usar coleta administrativa por netsh/nmcli ou adaptador compatível em lab autorizado."
      }
    ],
    "improvements": [
      "Criar inventário real de BSSIDs autorizados.",
      "Exportar logs de controladora para SIEM.",
      "Criar alerta de SSID corporativo duplicado.",
      "Padronizar perfis Wi-Fi por MDM.",
      "Ativar PMF onde compatível.",
      "Testar isolamento guest trimestralmente."
    ],
    "evidenceToCollect": [
      "Data e horário",
      "SSID e BSSID",
      "canal/frequência",
      "RSSI/sinal",
      "tipo de segurança anunciado",
      "IP/gateway/DNS recebidos",
      "logs de RADIUS",
      "logs de controladora",
      "local físico aproximado",
      "relatos de usuários"
    ],
    "questions": [
      "Por que SSID sozinho não prova legitimidade?",
      "Qual evidência diferencia rogue AP de SSID vizinho?",
      "Por que EAP-TLS reduz risco de evil twin?",
      "Por que contenção ativa exige autorização?",
      "Como DHCP e DNS ajudam a detectar rede falsa ou VLAN errada?"
    ],
    "challenge": "Com base na coleta, monte um relatório executivo de uma página classificando o risco, impacto, evidências e próximas ações para um SSID corporativo duplicado.",
    "solution": "A solução deve declarar hipótese, não certeza absoluta, salvo evidência forte. Exemplo: 'Foi identificado SSID Corp-Secure anunciado por BSSID não cadastrado, em canal 11, com segurança WPA2-Personal divergente da política WPA Enterprise. Usuários próximos relataram portal inesperado. A recomendação é abrir incidente de segurança, orientar usuários a não autenticar, validar fisicamente a área, correlacionar RADIUS/controladora/DHCP/firewall e revisar MDM/EAP-TLS/PMF. Nenhuma contenção ativa deve ser realizada sem autorização formal.'"
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que uma rede com o mesmo SSID da empresa não deve ser considerada automaticamente legítima?",
      "hints": [
        "Pense em BSSID e inventário.",
        "Pense em validação de certificado."
      ],
      "expectedIdeas": [
        "SSID é apenas nome",
        "BSSID precisa ser autorizado",
        "certificado e autenticação importam",
        "logs comprovam"
      ],
      "explanation": "Legitimidade exige cadeia de evidências: BSSID autorizado, segurança correta, autenticação válida, IP esperado e logs."
    },
    {
      "type": "diagnóstico",
      "question": "Usuários relatam queda de Wi-Fi em uma sala. Quais hipóteses você testa antes de declarar ataque de deauth?",
      "hints": [
        "RF e roaming também causam queda.",
        "Verifique logs e área física."
      ],
      "expectedIdeas": [
        "interferência",
        "saturação",
        "roaming",
        "AP sobrecarregado",
        "PMF",
        "eventos de gerenciamento",
        "relatos correlacionados"
      ],
      "explanation": "Ataque é hipótese, não conclusão inicial. O método profissional compara evidências operacionais e de segurança."
    },
    {
      "type": "cenário real",
      "question": "Como você reduziria risco de evil twin em uma empresa com notebooks gerenciados?",
      "hints": [
        "Pense em EAP-TLS.",
        "Pense em MDM e certificado."
      ],
      "expectedIdeas": [
        "perfil Wi-Fi gerenciado",
        "validação de certificado RADIUS",
        "EAP-TLS",
        "PMF",
        "bloqueio de autojoin inseguro",
        "treinamento",
        "WIDS"
      ],
      "explanation": "A defesa forte combina cliente configurado corretamente, identidade forte e monitoramento."
    }
  ],
  "quiz": [
    {
      "id": "q12.8.1",
      "type": "conceito",
      "q": "Qual afirmação sobre SSID é correta?",
      "opts": [
        "SSID é apenas o nome lógico da rede e pode ser imitado.",
        "SSID prova que o AP pertence à empresa.",
        "SSID substitui certificado em 802.1X.",
        "SSID oculto impede detecção da rede."
      ],
      "a": 0,
      "exp": "SSID é um identificador visível/lógico. Ele não prova legitimidade nem substitui autenticação forte.",
      "difficulty": "iniciante",
      "topic": "SSID"
    },
    {
      "id": "q12.8.2",
      "type": "segurança",
      "q": "O que caracteriza melhor um evil twin?",
      "opts": [
        "Um AP falso que tenta imitar rede legítima para induzir conexão.",
        "Um AP corporativo com firmware atualizado.",
        "Uma VLAN guest bem isolada.",
        "Um roteador BGP externo."
      ],
      "a": 0,
      "exp": "Evil twin explora confiança visual/técnica no SSID e configuração do cliente.",
      "difficulty": "intermediário",
      "topic": "evil twin"
    },
    {
      "id": "q12.8.3",
      "type": "diagnóstico",
      "q": "Um BSSID desconhecido anuncia o SSID corporativo. Qual ação vem primeiro?",
      "opts": [
        "Coletar evidências e comparar com inventário autorizado.",
        "Executar contenção ativa imediatamente.",
        "Trocar todos os switches.",
        "Ignorar porque SSID duplicado é sempre normal."
      ],
      "a": 0,
      "exp": "A resposta profissional começa por evidência: BSSID, OUI, canal, localização, segurança e logs.",
      "difficulty": "intermediário",
      "topic": "triagem"
    },
    {
      "id": "q12.8.4",
      "type": "segurança",
      "q": "Qual controle reduz risco de cliente autenticar em infraestrutura falsa quando bem configurado?",
      "opts": [
        "EAP-TLS com validação correta de certificado do servidor.",
        "SSID oculto.",
        "Senha PSK compartilhada entre todos.",
        "Aumentar potência do AP."
      ],
      "a": 0,
      "exp": "EAP-TLS e validação correta de certificado dificultam falsificação de servidor de autenticação.",
      "difficulty": "intermediário-avançado",
      "topic": "802.1X"
    },
    {
      "id": "q12.8.5",
      "type": "diagnóstico",
      "q": "Cliente conectado a SSID guest recebe gateway interno e acessa impressoras. O problema mais provável é:",
      "opts": [
        "Falha de segmentação/VLAN/firewall.",
        "Sinal RSSI sempre baixo.",
        "Obrigatoriamente ataque de deauth.",
        "Erro de DNS público apenas."
      ],
      "a": 0,
      "exp": "Guest acessando interno indica falha de arquitetura e política, mesmo que o Wi-Fi esteja funcionando.",
      "difficulty": "intermediário",
      "topic": "segmentação"
    },
    {
      "id": "q12.8.6",
      "type": "ética",
      "q": "Por que o laboratório desta aula não ensina a executar deauth ou criar evil twin?",
      "opts": [
        "Porque o objetivo é defesa, evidência e mitigação sem instrução ofensiva perigosa.",
        "Porque essas ameaças não existem.",
        "Porque Wi-Fi não tem quadros de gerenciamento.",
        "Porque rogue AP só acontece em cloud."
      ],
      "a": 0,
      "exp": "O curso mantém limite ético: entender risco e detecção sem fornecer procedimento ofensivo indevido.",
      "difficulty": "iniciante",
      "topic": "ética"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.8.1",
      "front": "O que é rogue AP?",
      "back": "Um AP não autorizado no ambiente, podendo estar ou não conectado à rede corporativa.",
      "tags": [
        "wireless",
        "segurança"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.8.2",
      "front": "O que é evil twin?",
      "back": "Um AP falso que imita uma rede legítima para induzir conexão, phishing ou desvio de tráfego.",
      "tags": [
        "evil twin"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.8.3",
      "front": "SSID prova legitimidade?",
      "back": "Não. SSID é apenas nome; legitimidade depende de BSSID autorizado, autenticação, certificado, IP esperado e logs.",
      "tags": [
        "ssid",
        "bssid"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.8.4",
      "front": "Para que serve PMF?",
      "back": "Protected Management Frames protege certos quadros de gerenciamento, reduzindo riscos como abusos de deauth/disassociation quando suportado.",
      "tags": [
        "pmf",
        "802.11w"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.8.5",
      "front": "Qual risco do PSK compartilhado?",
      "back": "Não identifica usuário individual, dificulta revogação e pode vazar para pessoas fora do grupo autorizado.",
      "tags": [
        "psk",
        "wpa"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.8.6",
      "front": "O que um WIDS/WIPS faz?",
      "back": "Ajuda a detectar, classificar e, quando autorizado, responder a eventos wireless como rogue AP, SSID duplicado e anomalias.",
      "tags": [
        "wids",
        "wips"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.8.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre rogue AP e evil twin.",
      "expectedAnswer": "Rogue AP é qualquer AP não autorizado; evil twin é um AP falso que tenta imitar uma rede legítima para induzir conexão ou enganar usuários.",
      "explanation": "Todo evil twin pode ser tratado como não autorizado, mas nem todo rogue AP tenta imitar a rede corporativa."
    },
    {
      "id": "ex12.8.2",
      "type": "diagnóstico",
      "prompt": "Você vê SSID Corp-Secure com BSSID desconhecido, canal 11 e WPA2-Personal, enquanto a política corporativa exige WPA Enterprise. Liste três evidências e duas ações defensivas.",
      "expectedAnswer": "Evidências: BSSID fora do inventário, segurança divergente, canal/localização/RSSI. Ações: acionar SOC/equipe WLAN, orientar usuários, correlacionar logs e validar fisicamente.",
      "explanation": "A divergência de segurança é sinal forte de suspeita, mas ainda requer validação."
    },
    {
      "id": "ex12.8.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma arquitetura mínima para reduzir risco em rede guest.",
      "expectedAnswer": "SSID guest em VLAN própria, client isolation, DHCP/DNS controlados, firewall deny-by-default para redes internas e apenas egress necessário para internet, logs e testes periódicos.",
      "explanation": "Guest seguro depende de política real, não apenas nome separado."
    },
    {
      "id": "ex12.8.4",
      "type": "comando/output",
      "prompt": "Qual comando você usaria no Windows para listar BSSIDs visíveis? E no Linux com NetworkManager?",
      "expectedAnswer": "Windows: netsh wlan show networks mode=bssid. Linux: nmcli -f SSID,BSSID,CHAN,SIGNAL,SECURITY dev wifi list.",
      "explanation": "Esses comandos ajudam na triagem sem técnicas ofensivas."
    }
  ],
  "challenge": {
    "title": "Playbook defensivo para suspeita de evil twin em filial",
    "scenario": "Uma filial relata quedas de Wi-Fi e usuários viram um portal de login diferente. O painel da WLAN mostra SSID corporativo duplicado com BSSID desconhecido e segurança divergente em uma área do prédio.",
    "tasks": [
      "Classificar severidade inicial.",
      "Listar evidências a coletar.",
      "Indicar fontes de log.",
      "Definir comunicação para usuários.",
      "Propor mitigação técnica sem ação ofensiva.",
      "Descrever correções preventivas."
    ],
    "constraints": [
      "Não executar deauth.",
      "Não criar AP falso.",
      "Não capturar credenciais.",
      "Não fazer contenção ativa sem autorização formal.",
      "Manter disponibilidade da filial."
    ],
    "expectedDeliverables": [
      "Matriz de evidências",
      "linha do tempo",
      "hipóteses",
      "plano de comunicação",
      "plano de mitigação",
      "ações de melhoria"
    ],
    "gradingRubric": [
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Coleta BSSID, canal, segurança, logs, IP/DNS e relatos."
      },
      {
        "criterion": "Ética e segurança",
        "points": 25,
        "description": "Não propõe ações ofensivas ou contenção sem autorização."
      },
      {
        "criterion": "Arquitetura",
        "points": 25,
        "description": "Relaciona EAP-TLS, PMF, MDM, WIDS/WIPS, VLAN e firewall."
      },
      {
        "criterion": "Comunicação",
        "points": 25,
        "description": "Comunica risco, impacto, orientação e próximos passos de forma clara."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O cenário tem sinais suficientes para tratar como suspeita relevante, mas não como conclusão definitiva. A divergência de segurança e o BSSID fora do inventário elevam severidade. A resposta deve proteger usuários, preservar evidências e acionar equipe autorizada.",
    "steps": [
      "Registrar horário, local, SSID, BSSID, canal, RSSI e segurança anunciada.",
      "Comparar BSSID com inventário e OUI esperado.",
      "Consultar controladora/WIDS para eventos de rogue e clientes afetados.",
      "Consultar RADIUS para falhas de autenticação e métodos usados.",
      "Consultar DHCP/DNS/firewall para IPs e tráfego inesperado.",
      "Orientar usuários a não digitar credenciais em portal suspeito.",
      "Validar fisicamente a área com equipe autorizada.",
      "Revisar EAP-TLS, validação de certificado, PMF, MDM e alertas."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Derrubar o AP suspeito por conta própria",
        "whyItIsWrong": "Contenção ativa pode violar política, lei e disponibilidade; exige autorização e ferramenta apropriada."
      },
      {
        "answer": "Trocar a senha do Wi-Fi e encerrar",
        "whyItIsWrong": "Se a rede é Enterprise/EAP-TLS, o problema pode estar em perfil/certificado/inventário; trocar senha não resolve evil twin."
      },
      {
        "answer": "Ignorar porque o usuário provavelmente errou",
        "whyItIsWrong": "BSSID desconhecido e segurança divergente são sinais objetivos que exigem triagem."
      }
    ],
    "finalAnswer": "Classifique como suspeita alta até validação. Colete evidências, preserve logs, oriente usuários, acione SOC/WLAN, valide fisicamente, não realize contenção não autorizada e fortaleça EAP-TLS, PMF, MDM, WIDS/WIPS e inventário."
  },
  "glossary": [
    {
      "term": "Rogue AP",
      "shortDefinition": "Access point não autorizado no ambiente.",
      "longDefinition": "Pode ser dispositivo malicioso ou equipamento instalado por engano, com risco de bypass de política, DHCP indevido e exposição da rede.",
      "example": "Funcionário conecta roteador doméstico na porta de rede para melhorar sinal.",
      "relatedTerms": [
        "evil twin",
        "WIDS",
        "BSSID"
      ],
      "relatedLessons": [
        "12.7",
        "12.8"
      ]
    },
    {
      "term": "Evil twin",
      "shortDefinition": "AP falso que imita uma rede legítima.",
      "longDefinition": "Tenta induzir clientes a conectar em uma infraestrutura falsa, muitas vezes usando SSID parecido, portal falso ou configuração de segurança enganosa.",
      "example": "SSID Corp-Secure anunciado por BSSID desconhecido com portal de login suspeito.",
      "relatedTerms": [
        "SSID",
        "BSSID",
        "EAP-TLS"
      ],
      "relatedLessons": [
        "12.4",
        "12.5",
        "12.8"
      ]
    },
    {
      "term": "Deauthentication",
      "shortDefinition": "Quadro de gerenciamento usado para encerrar autenticação 802.11.",
      "longDefinition": "Pode ser legítimo em operação normal, mas abusos podem causar indisponibilidade ou forçar reconexões.",
      "example": "Clientes desconectam repetidamente em uma área sem causa aparente.",
      "relatedTerms": [
        "PMF",
        "disassociation",
        "WIDS"
      ],
      "relatedLessons": [
        "12.6",
        "12.8"
      ]
    },
    {
      "term": "PMF",
      "shortDefinition": "Protected Management Frames.",
      "longDefinition": "Proteção para determinados quadros de gerenciamento 802.11, reduzindo riscos contra abusos de gerenciamento quando cliente e AP suportam e estão configurados corretamente.",
      "example": "WPA3 Enterprise normalmente exige PMF.",
      "relatedTerms": [
        "802.11w",
        "WPA3",
        "deauth"
      ],
      "relatedLessons": [
        "12.5",
        "12.8"
      ]
    },
    {
      "term": "WIDS",
      "shortDefinition": "Wireless Intrusion Detection System.",
      "longDefinition": "Sistema de detecção que monitora eventos wireless como rogue AP, SSID duplicado, anomalias e possíveis ataques.",
      "example": "Controladora gera alerta de BSSID desconhecido anunciando SSID corporativo.",
      "relatedTerms": [
        "WIPS",
        "rogue AP",
        "SOC"
      ],
      "relatedLessons": [
        "12.8",
        "13.4"
      ]
    },
    {
      "term": "WIPS",
      "shortDefinition": "Wireless Intrusion Prevention System.",
      "longDefinition": "Sistema que, além de detectar, pode executar ações de prevenção ou contenção quando autorizado e configurado conforme política.",
      "example": "Equipe autorizada usa função de contenção do fabricante após validação formal.",
      "relatedTerms": [
        "WIDS",
        "contenção",
        "rogue AP"
      ],
      "relatedLessons": [
        "12.8",
        "13.9"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Guidelines for Securing Wireless Local Area Networks (WLANs) - SP 800-153",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/153/final",
      "note": "Referência para recomendações de configuração, segurança e monitoramento de WLAN."
    },
    {
      "type": "official-doc",
      "title": "WPA3 Encryption and Configuration Guide",
      "organization": "Cisco Meraki",
      "url": "https://documentation.meraki.com/Wireless/Design_and_Configure/Configuration_Guides/Encryption_and_Authentication/WPA3_Encryption_and_Configuration_Guide",
      "note": "Referência operacional para WPA3, PMF, modos de segurança e compatibilidade."
    },
    {
      "type": "official-doc",
      "title": "Cisco Catalyst 9800 Series Wireless Controller - Manage Rogue Devices",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/17-17/config-guide/b_wl_17_17_cg/m_manage_rogue.html",
      "note": "Referência de configuração e operação para rogue device detection/containment em controladoras Cisco."
    },
    {
      "type": "official-doc",
      "title": "Wi-Fi (WLAN, IEEE 802.11)",
      "organization": "Wireshark Wiki",
      "url": "https://wiki.wireshark.org/Wi-Fi",
      "note": "Referência para captura e filtros 802.11 em Wireshark."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 - Módulo 12",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Depende das aulas 12.1 a 12.7 sobre Wi-Fi, RF, SSID/BSSID, WPA e arquitetura corporativa."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall, ACLs, WAF e políticas ajudam a conter impacto de guest e IoT mal segmentados."
    },
    {
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.4",
      "reason": "IDS/IPS/NDR/SIEM expandirão a detecção de rede após o módulo wireless."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "mXX",
      "lesson": "802.1X/EAP-TLS",
      "reason": "EAP-TLS, certificados, identidade de dispositivo e autenticação forte dependem de IAM/PKI."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs e automação",
      "reason": "Integração com SIEM, APIs de controladora e policy-as-code dependem de observabilidade e automação."
    }
  ],
  "pedagogicalMap": {
    "problem": "Ameaças wireless exploram SSID/BSSID, rádio, clientes e configuração antes do tráfego chegar aos controles tradicionais.",
    "concept": "Rogue AP, evil twin e deauth são riscos diferentes e exigem evidência para classificação.",
    "internalMechanism": "Cliente descobre SSIDs/BSSIDs, associa, autentica, recebe IP e passa por política; a ameaça pode atuar em qualquer etapa.",
    "realUse": "SOC e equipe WLAN investigam BSSID desconhecido, SSID duplicado, falhas RADIUS e relatos de usuários.",
    "commonMistake": "Tratar SSID como prova de legitimidade ou responder com contenção ativa sem autorização.",
    "securityImpact": "A defesa reduz phishing wireless, bypass de segmentação, indisponibilidade e exposição de visitantes/IoT.",
    "operationalImpact": "Exige inventário, logs, playbook, treinamento, integração com SIEM e governança de mudanças.",
    "summary": "A defesa wireless madura combina arquitetura, identidade, PMF, WIDS/WIPS, segmentação, logs e resposta ética."
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
      "12.9"
    ]
  }
};
