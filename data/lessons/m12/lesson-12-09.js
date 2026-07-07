export const lesson1209 = {
  "id": "12.9",
  "moduleId": "m12",
  "order": 9,
  "title": "Troubleshooting Wi-Fi com Windows, Linux e controladora",
  "subtitle": "Como diagnosticar falhas wireless por evidência: RF, associação, autenticação, DHCP, DNS, rota, firewall e aplicação.",
  "duration": "130-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 280,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "troubleshooting",
    "windows",
    "linux",
    "controladora",
    "dhcp",
    "dns",
    "radius",
    "firewall",
    "wireshark",
    "soc"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.1",
      "reason": "É necessário entender Wi‑Fi como meio de acesso local."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.2",
      "reason": "RF, RSSI, SNR e canal sustentam o diagnóstico físico."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.4",
      "reason": "SSID, BSSID, associação e autenticação definem os estados iniciais do cliente."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "WPA2/WPA3, 802.1X e RADIUS são essenciais para diagnosticar autenticação corporativa."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "DHCP, DNS e NAT aparecem logo após a associação/autenticação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall, ACLs e políticas podem bloquear tráfego mesmo com Wi‑Fi associado."
    }
  ],
  "objectives": [
    "Criar um método de diagnóstico Wi‑Fi por camadas e hipóteses testáveis.",
    "Coletar evidências no Windows, Linux e controladora sem depender apenas de percepção do usuário.",
    "Diferenciar falhas de RF, associação, autenticação, DHCP, DNS, rota, firewall e aplicação.",
    "Interpretar sintomas como sem internet, conectado sem IP, 802.1X negado, roaming ruim e lentidão intermitente.",
    "Montar linha do tempo e relatório técnico com evidências, impacto, causa provável e próximos passos.",
    "Evitar correções inseguras como desabilitar 802.1X, liberar any-any ou colocar clientes em VLAN errada."
  ],
  "learningOutcomes": [
    "Dado um cliente sem conectividade, o aluno consegue identificar em qual etapa o fluxo parou.",
    "Dado um output de Windows ou Linux, o aluno identifica SSID, BSSID, frequência, IP, gateway e DNS.",
    "Dado um log de RADIUS ou controladora, o aluno separa falha de autenticação de falha de DHCP.",
    "Dado um incidente de lentidão, o aluno propõe evidências de RF e de rede antes de alterar configuração.",
    "Dado um cenário empresarial, o aluno produz um RCA inicial sem pular camadas."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine uma segunda-feira de manhã em que metade da empresa reclama que o Wi‑Fi está lento. Alguns usuários dizem que “não conecta”. Outros conectam, mas recebem “sem internet”. A equipe de segurança vê autenticações 802.1X negadas. O time de redes percebe que o AP está online. O time de sistemas garante que o DNS está funcionando. O firewall não mostra bloqueios óbvios. A pergunta vira uma guerra de opiniões: é sinal fraco, problema de senha, RADIUS, DHCP, DNS, rota, firewall, proxy, aplicação ou saturação?</p>\n  <p>O troubleshooting profissional de Wi‑Fi existe porque “Wi‑Fi ruim” é uma frase vaga. Ela pode significar rádio ruim, canal congestionado, cliente grudado em AP distante, driver antigo, perfil salvo incorreto, certificado inválido, servidor RADIUS indisponível, DHCP esgotado, DNS inacessível, gateway errado, captive portal, firewall bloqueando, proxy exigido ou aplicação instável. A mesma reclamação do usuário pode nascer em camadas completamente diferentes.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> sem método, o suporte reinicia AP, troca senha, culpa o provedor, desabilita segurança ou cria exceções perigosas. Com método, você separa RF, associação, autenticação, endereço IP, DNS, rota, política e aplicação, coleta evidência e evita mudanças aleatórias.</div>\n  <p>Esta aula ensina um modelo de investigação que funciona no notebook do aluno, em ambiente corporativo com controladora e em SOC. O objetivo não é decorar comandos, mas saber qual evidência cada comando entrega, qual hipótese ele testa e qual próximo passo faz sentido.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No começo, diagnosticar Wi‑Fi era quase sempre olhar se o cliente “enxergava a rede” e se a senha estava correta. Em redes pequenas, isso bastava muitas vezes. Com a adoção corporativa, o Wi‑Fi virou infraestrutura crítica: voz, videoconferência, laptops, celulares, coletores, IoT, visitantes, autenticação corporativa, NAC, MDM, telemetria e integração com SIEM.</p>\n  <p>A complexidade aumentou porque a WLAN deixou de ser um roteador isolado. Hoje existem APs controlados, controladoras físicas ou cloud, RADIUS, certificados, VLAN dinâmica, DHCP por segmento, DNS interno, firewalls internos, proxies, captive portals, políticas por identidade e logs distribuídos. Um cliente “conectado” pode ter passado por associação 802.11, mas ainda falhar em 802.1X. Pode autenticar, mas não receber IP. Pode receber IP, mas não resolver DNS. Pode resolver DNS, mas ser bloqueado pelo firewall.</p>\n  <p>Ferramentas também evoluíram. Windows passou a gerar relatórios WLAN com histórico de sessões; Linux oferece ferramentas como NetworkManager, nmcli e iw; Wireshark permite filtros 802.11 quando a captura é possível; controladoras corporativas permitem logs por cliente, AP, SSID, RADIUS e eventos de roaming. O profissional moderno precisa combinar essas fontes, não escolher apenas uma.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico é que Wi‑Fi junta um meio físico compartilhado e invisível com uma pilha lógica longa. Diferente de um cabo, onde você vê a porta e pode testar link físico com mais previsibilidade, o rádio sofre com distância, parede, metal, interferência, potência, canal, largura de canal, airtime e comportamento de cliente.</p>\n  <ul>\n    <li><strong>Falha de RF:</strong> RSSI baixo, SNR ruim, canal congestionado, interferência, retransmissão ou saturação de airtime.</li>\n    <li><strong>Falha de associação:</strong> cliente não encontra SSID, escolhe BSSID ruim, não associa ou fica preso em AP distante.</li>\n    <li><strong>Falha de autenticação:</strong> PSK errada, 802.1X negado, certificado inválido, RADIUS indisponível ou política NAC bloqueando.</li>\n    <li><strong>Falha de endereçamento:</strong> DHCP não entrega IP, escopo esgotado, VLAN errada ou gateway incorreto.</li>\n    <li><strong>Falha de resolução:</strong> DNS inacessível, split-DNS incorreto, servidor errado ou bloqueio de porta.</li>\n    <li><strong>Falha de política:</strong> firewall, ACL, proxy, captive portal, segmentação ou regra por identidade.</li>\n    <li><strong>Falha de aplicação:</strong> serviço fora, TLS quebrado, latência alta, perda ou backend instável.</li>\n  </ul>\n  <p>Sem separar essas hipóteses, o troubleshooting vira tentativa e erro. O risco operacional é aumentar indisponibilidade. O risco de segurança é criar bypass: “libera any-any para testar”, “desliga 802.1X”, “coloca todo mundo na VLAN interna”, “troca para PSK compartilhado”. A aula treina justamente o contrário: reduzir o problema com evidência.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>O troubleshooting Wi‑Fi evoluiu de reinicialização e observação visual para análise por camadas, telemetria de controladora e correlação de logs. O bom diagnóstico combina perspectiva do cliente, perspectiva da infraestrutura e perspectiva da segurança.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Abordagem moderna</th></tr></thead>\n    <tbody>\n      <tr><td>Reiniciar AP</td><td>Tentava limpar estado e recuperar conectividade.</td><td>Pode mascarar causa raiz e derrubar usuários saudáveis.</td><td>Coletar evidência por cliente, SSID, AP, canal, autenticação e DHCP antes de mudar.</td></tr>\n      <tr><td>Olhar barras de sinal</td><td>Usuário via “sinal cheio” e concluía que a rede estava boa.</td><td>Barras não mostram SNR, canal, airtime, autenticação, DNS ou firewall.</td><td>Medir RSSI/SNR, BSSID, frequência, taxa, retransmissões e caminho lógico.</td></tr>\n      <tr><td>Trocar senha</td><td>Tratava qualquer falha como autenticação PSK.</td><td>Inútil para DHCP, DNS, firewall, RF ou RADIUS.</td><td>Separar associação, autenticação, IP, DNS, rota e aplicação.</td></tr>\n      <tr><td>Ver apenas firewall</td><td>Investigava tráfego depois que o cliente já tinha IP.</td><td>Não enxerga falha antes da camada 3.</td><td>Correlacionar cliente, AP, controladora, RADIUS, DHCP, DNS, firewall e SIEM.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Troubleshooting Wi‑Fi é o processo sistemático de transformar uma reclamação vaga em hipóteses testáveis, coletar evidências em ordem lógica, isolar a camada com falha, corrigir com menor impacto e validar o resultado. Ele começa pela experiência do usuário, mas não termina nela.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> troubleshooting Wi‑Fi profissional é a investigação estruturada de conectividade sem fio considerando RF, associação, autenticação, endereçamento, resolução de nomes, roteamento, política de segurança, aplicação e evidências de infraestrutura.</div>\n  <p>O segredo é não pular camadas. Se o cliente nem está associado ao BSSID, não adianta investigar DNS. Se ele não recebeu IP, não adianta culpar TLS. Se ele acessa por IP mas não por nome, DNS é hipótese forte. Se DNS resolve, mas porta não abre, política, rota, NAT, proxy ou aplicação entram no foco.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Um cliente Wi‑Fi passa por uma cadeia de estados. Cada estado gera perguntas, evidências e comandos diferentes.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Descoberta:</strong> o cliente escuta beacons ou envia probes para encontrar SSIDs e BSSIDs disponíveis.</li>\n    <li><strong>Escolha:</strong> o cliente decide um BSSID com base em perfil salvo, sinal, banda, segurança, histórico e algoritmo do driver.</li>\n    <li><strong>Associação:</strong> o cliente estabelece relação com o AP; aqui ainda não significa que tem acesso à rede.</li>\n    <li><strong>Autenticação e chaves:</strong> PSK, SAE ou 802.1X/EAP negociam acesso e material criptográfico.</li>\n    <li><strong>Autorização e VLAN:</strong> em redes corporativas, RADIUS/NAC pode atribuir VLAN, ACL ou política.</li>\n    <li><strong>Endereçamento:</strong> DHCP entrega IP, máscara, gateway e DNS, ou o cliente usa configuração estática.</li>\n    <li><strong>Conectividade local:</strong> o cliente precisa alcançar gateway e serviços locais necessários.</li>\n    <li><strong>Resolução de nomes:</strong> DNS traduz nomes para IPs, incluindo domínios internos e externos.</li>\n    <li><strong>Política e aplicação:</strong> firewall, proxy, TLS, servidor e aplicação determinam o acesso final.</li>\n  </ol>\n  <p>Esse fluxo cria uma regra prática: sempre pergunte “em qual estado o cliente está?”. Um print de “conectado” no sistema operacional pode significar apenas associação e chave; não garante DHCP, DNS, rota ou aplicação. Um log de firewall vazio pode significar que o pacote nunca chegou ao firewall.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Em uma empresa, o diagnóstico atravessa componentes diferentes. O cliente fornece visão local; o AP mostra rádio e associação; a controladora mostra estado centralizado; o RADIUS mostra autenticação; DHCP e DNS mostram serviços essenciais; firewall mostra política; SIEM e NDR mostram correlação e comportamento.</p>\n  <ul>\n    <li><strong>Camada física/RF:</strong> canal, potência, ruído, SNR, interferência, distância e airtime.</li>\n    <li><strong>Camada 2 wireless:</strong> SSID, BSSID, associação, roaming, WPA, 802.1X e VLAN.</li>\n    <li><strong>Camada 3:</strong> IP, máscara, gateway, rota e reachability.</li>\n    <li><strong>Serviços essenciais:</strong> DHCP, DNS, NTP, RADIUS, captive portal e proxy.</li>\n    <li><strong>Segurança:</strong> firewall, NAC, SIEM, WIDS/WIPS, EDR e logs de identidade.</li>\n  </ul>\n  <p>Por isso, a arquitetura de troubleshooting precisa de acesso mínimo a evidências. Um operador de suporte pode coletar BSSID, IP e relatório WLAN. Um analista de redes pode verificar controladora, AP e DHCP. Um analista de segurança pode correlacionar RADIUS, firewall, SIEM e alertas. O processo precisa ser combinado antes do incidente, não improvisado durante a crise.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Diagnosticar Wi‑Fi é como investigar por que uma pessoa não conseguiu entrar em um prédio corporativo. Ela pode não ter encontrado o prédio certo, pode ter ido para a porta errada, pode ter apresentado crachá inválido, pode ter sido direcionada ao andar errado, pode ter encontrado elevador quebrado ou pode ter chegado à sala correta e descoberto que o sistema estava fora.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> no Wi‑Fi, as etapas acontecem em milissegundos, o meio físico é rádio compartilhado e a decisão de roaming fica majoritariamente no cliente. A analogia ajuda a separar etapas, mas não representa airtime, interferência, criptografia e logs distribuídos.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em casa, o notebook aparece conectado ao Wi‑Fi, mas não navega. O diagnóstico simples não começa trocando roteador. Primeiro você verifica se está no SSID correto e qual BSSID foi escolhido. Depois verifica IP, gateway e DNS. Se o IP está como 169.254.x.x, houve falha de DHCP. Se há IP correto e gateway responde, mas nomes não resolvem, o foco vai para DNS. Se nomes resolvem e apenas um site falha, o problema pode estar na aplicação, TLS, rota ou serviço remoto.</p>\n  <p>Essa mesma lógica se aplica à empresa. A diferença é que a empresa adiciona RADIUS, VLAN dinâmica, firewall, proxy, SIEM e escopo de impacto. O método é o mesmo; as evidências são mais ricas.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma filial usa SSID <code>Corp-Secure</code> com WPA Enterprise e EAP-TLS. Usuários do terceiro andar relatam quedas em chamadas. A primeira hipótese pode ser RF ou roaming, mas a evidência mostra autenticações RADIUS bem-sucedidas, DHCP normal e quedas apenas quando o cliente se desloca entre duas salas. O comando no Windows mostra troca frequente de BSSID e queda de taxa. A controladora mostra eventos de reassociação e RSSI limítrofe. O problema não era firewall nem senha; era desenho de célula, potência e roaming.</p>\n  <p>Em outro caso, usuários conectam ao SSID, mas recebem IP de uma VLAN de quarentena. O rádio está bom, a associação ocorre, o RADIUS responde, mas a política NAC classifica o dispositivo como não conforme. O problema é de postura, certificado, MDM ou grupo, não de Wi‑Fi físico.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Mesmo quando a controladora é cloud-managed, os sintomas continuam locais. A diferença é que parte da telemetria, configuração e logs fica no painel do fornecedor. Isso ajuda suporte remoto, comparação entre sites, histórico de cliente e alertas, mas cria dependência de acesso à nuvem de gestão e de licenças.</p>\n  <p>Cloud também aparece no destino do tráfego. Um usuário pode associar ao AP, autenticar em RADIUS, receber IP, resolver DNS e ainda falhar ao acessar uma aplicação privada em Azure, AWS ou Google Cloud por erro de VPN, DNS privado, rota ou política de firewall. A conclusão correta exige separar Wi‑Fi de conectividade cloud. Nem todo problema percebido no Wi‑Fi é problema de WLAN.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, troubleshooting Wi‑Fi aparece na automação e na padronização. Configurações de SSID, VLAN, RADIUS, perfis de AP, tags, redes guest, syslog e alertas podem ser documentadas e versionadas como intenção arquitetural, mesmo quando a aplicação prática acontece em controladoras ou plataformas cloud-managed.</p>\n  <p>Um pipeline de infraestrutura pode validar se todos os sites têm SSID corporativo com WPA Enterprise, rede guest isolada, syslog habilitado, SNMP/telemetria ativa, NTP correto e integração com SIEM. O valor não está em “automatizar por automatizar”, mas em reduzir drift: aquele AP de filial não deve ficar com SSID temporário aberto porque alguém esqueceu uma mudança manual.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Para Segurança da Informação, troubleshooting Wi‑Fi não serve apenas para disponibilidade. Ele ajuda a detectar bypass, rogue AP, rede guest mal isolada, autenticações anômalas, falhas de certificado, dispositivos não gerenciados, variação incomum de BSSID e tráfego que deveria passar por controles mas não passa.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Bypass de 802.1X</td><td>SSID temporário com PSK compartilhado criado para “resolver rápido”.</td><td>Perda de identidade individual e dificuldade de revogação.</td><td>Processo de exceção, expiração, auditoria e aprovação de segurança.</td></tr>\n      <tr><td>Rede guest alcançando interna</td><td>Cliente guest resolve nomes internos ou acessa portas corporativas.</td><td>Exposição lateral.</td><td>VLAN isolada, firewall deny-by-default, DNS controlado e testes recorrentes.</td></tr>\n      <tr><td>Cliente não gerenciado</td><td>RADIUS/NAC coloca dispositivo em VLAN inesperada.</td><td>Risco de acesso indevido ou indisponibilidade.</td><td>MDM, certificados, postura e política clara.</td></tr>\n      <tr><td>Falha sem log</td><td>Usuários reclamam, mas controladora/RADIUS/DHCP não têm histórico.</td><td>Investigação fraca e RCA inconclusivo.</td><td>Centralizar logs, sincronizar NTP, definir retenção e campos mínimos.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1180 680\" role=\"img\" aria-labelledby=\"wifi-ts-title wifi-ts-desc\">\n    <title id=\"wifi-ts-title\">Fluxo de troubleshooting Wi-Fi por camadas</title>\n    <desc id=\"wifi-ts-desc\">Diagrama mostrando cliente, AP, controladora, RADIUS, DHCP, DNS, firewall, SIEM e aplicação, com pontos de evidência em cada etapa.</desc>\n    <defs>\n      <marker id=\"arrow-wifi-ts\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"60\" width=\"160\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--client\" />\n    <text x=\"120\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"120\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSID, IP, DNS</text>\n\n    <rect x=\"270\" y=\"60\" width=\"160\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--switch\" />\n    <text x=\"350\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">AP</text>\n    <text x=\"350\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RF, canal, SNR</text>\n\n    <rect x=\"500\" y=\"60\" width=\"180\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"590\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Controladora</text>\n    <text x=\"590\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">associação, roaming</text>\n\n    <rect x=\"750\" y=\"40\" width=\"170\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"835\" y=\"73\" text-anchor=\"middle\" class=\"svg-label\">RADIUS/NAC</text>\n    <text x=\"835\" y=\"95\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">802.1X, política</text>\n\n    <rect x=\"750\" y=\"135\" width=\"170\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--server\" />\n    <text x=\"835\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">DHCP/DNS</text>\n    <text x=\"835\" y=\"190\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">IP, nomes</text>\n\n    <rect x=\"980\" y=\"60\" width=\"160\" height=\"80\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"1060\" y=\"95\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <text x=\"1060\" y=\"120\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política, logs</text>\n\n    <rect x=\"980\" y=\"255\" width=\"160\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"1060\" y=\"288\" text-anchor=\"middle\" class=\"svg-label\">Aplicação</text>\n    <text x=\"1060\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">serviço/TLS/API</text>\n\n    <rect x=\"500\" y=\"255\" width=\"180\" height=\"75\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"590\" y=\"288\" text-anchor=\"middle\" class=\"svg-label\">SIEM/NDR</text>\n    <text x=\"590\" y=\"310\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">correlação</text>\n\n    <line x1=\"200\" y1=\"100\" x2=\"270\" y2=\"100\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"430\" y1=\"100\" x2=\"500\" y2=\"100\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"680\" y1=\"90\" x2=\"750\" y2=\"75\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"680\" y1=\"115\" x2=\"750\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"920\" y1=\"100\" x2=\"980\" y2=\"100\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"1060\" y1=\"140\" x2=\"1060\" y2=\"255\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"590\" y1=\"140\" x2=\"590\" y2=\"255\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"835\" y1=\"205\" x2=\"680\" y2=\"275\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n    <line x1=\"980\" y1=\"290\" x2=\"680\" y2=\"290\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-wifi-ts)\" />\n\n    <rect x=\"60\" y=\"430\" width=\"1060\" height=\"145\" rx=\"18\" class=\"svg-zone svg-boundary\" />\n    <text x=\"590\" y=\"462\" text-anchor=\"middle\" class=\"svg-label\">Ordem de hipótese</text>\n    <text x=\"110\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">1 RF</text>\n    <text x=\"230\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">2 Associação</text>\n    <text x=\"370\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">3 Autenticação</text>\n    <text x=\"520\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">4 DHCP/IP</text>\n    <text x=\"660\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">5 DNS/Rota</text>\n    <text x=\"810\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">6 Firewall</text>\n    <text x=\"960\" y=\"505\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">7 Aplicação</text>\n    <text x=\"590\" y=\"545\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Não pule etapas: evidência primeiro, alteração depois.</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório é local e defensivo. Você vai coletar evidências no Windows ou Linux, montar uma linha do tempo curta e classificar onde a falha provavelmente ocorreria. Não haverá ataque, captura de credenciais nem interferência em redes de terceiros. Execute somente na sua rede ou em laboratório autorizado.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios forçam produção ativa: interpretar sintomas, escolher comandos, separar hipóteses e propor evidências mínimas para cada camada.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma sala de reunião com queda intermitente em videochamadas. Você deve montar um plano de diagnóstico e explicar por que cada evidência será coletada.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra o raciocínio: não culpar o Wi‑Fi por qualquer falha percebida no Wi‑Fi, não culpar DNS antes de validar IP e gateway, e não mudar política de segurança sem evidência.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li><strong>Ideia central:</strong> troubleshooting Wi‑Fi profissional é investigação por camadas com evidência.</li>\n    <li><strong>O que lembrar:</strong> “conectado ao Wi‑Fi” não significa “autorizado, com IP, DNS, rota e aplicação funcionando”.</li>\n    <li><strong>Erro comum:</strong> reiniciar AP ou relaxar segurança antes de saber onde a falha ocorre.</li>\n    <li><strong>Uso real:</strong> combine cliente, AP, controladora, RADIUS, DHCP, DNS, firewall e SIEM para fechar RCA.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você vai consolidar o módulo projetando uma rede Wi‑Fi segura. A aula 12.10 usará tudo que foi visto: RF, canais, gerações Wi‑Fi, SSID/BSSID, WPA Enterprise, roaming, arquitetura, ameaças e troubleshooting.</p>\n</section>\n"
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
      "ICMP",
      "TCP",
      "UDP",
      "TLS",
      "Syslog",
      "SNMP/telemetria"
    ],
    "dependsOn": [
      "RF",
      "SSID",
      "BSSID",
      "associação",
      "autenticação",
      "DHCP",
      "DNS",
      "roteamento",
      "firewall"
    ],
    "enables": [
      "RCA",
      "war room",
      "observabilidade wireless",
      "SOC",
      "troubleshooting profissional",
      "playbooks"
    ]
  },
  "protocolFields": [
    {
      "field": "BSSID",
      "size": "48 bits",
      "purpose": "Identificar o AP/radio real ao qual o cliente está associado.",
      "securityObservation": "BSSID fora do inventário pode indicar rogue, erro operacional ou vizinho; exige validação."
    },
    {
      "field": "RSSI/Sinal",
      "size": "valor de driver/controladora",
      "purpose": "Indicar potência recebida pelo cliente ou AP.",
      "securityObservation": "Sinal forte não garante legitimidade nem autorização."
    },
    {
      "field": "EAP failure reason",
      "size": "depende do fornecedor",
      "purpose": "Explicar falhas 802.1X/RADIUS.",
      "securityObservation": "Ajuda a diferenciar senha/certificado/política de ataque ou dispositivo não conforme."
    },
    {
      "field": "DHCP lease",
      "size": "campos IP, máscara, gateway, DNS e tempo",
      "purpose": "Comprovar endereçamento recebido pelo cliente.",
      "securityObservation": "Lease de escopo errado pode revelar VLAN incorreta ou DHCP não autorizado."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Lista redes e seleciona BSSID",
      "detail": "Coleta SSID, BSSID, banda, canal e sinal.",
      "possibleFailure": "SSID não aparece, BSSID errado, sinal ruim ou canal congestionado."
    },
    {
      "step": 2,
      "actor": "Cliente/AP",
      "action": "Associação wireless",
      "detail": "Cliente entra no BSS escolhido.",
      "possibleFailure": "Driver, perfil, compatibilidade ou política do AP impedem associação."
    },
    {
      "step": 3,
      "actor": "Cliente/RADIUS",
      "action": "Autenticação e autorização",
      "detail": "PSK/SAE ou 802.1X/EAP validam acesso e podem atribuir VLAN.",
      "possibleFailure": "Certificado, credencial, grupo, MDM, RADIUS ou NAC."
    },
    {
      "step": 4,
      "actor": "Cliente/DHCP",
      "action": "Endereçamento",
      "detail": "Cliente recebe IP, máscara, gateway e DNS.",
      "possibleFailure": "Escopo esgotado, VLAN errada, DHCP bloqueado ou relay incorreto."
    },
    {
      "step": 5,
      "actor": "Cliente/DNS/Gateway",
      "action": "Teste de rede e nomes",
      "detail": "Ping gateway, resolver nomes e testar porta.",
      "possibleFailure": "DNS, rota, firewall, proxy ou aplicação."
    }
  ],
  "trafficCapture": {
    "tool": "Wireshark/tcpdump em ambiente autorizado; monitor mode quando hardware e autorização permitirem",
    "filter": "wlan.fc.type == 0 or eapol or bootp or dns or icmp or tcp.port == 443",
    "whatToObserve": [
      "beacons/probes",
      "authentication/association",
      "EAPOL",
      "DHCP Discover/Offer/Request/Ack",
      "DNS queries/responses",
      "ICMP e TCP handshake"
    ],
    "interpretation": "A captura ajuda a localizar a etapa da falha, mas deve respeitar privacidade e autorização. Em muitos casos, logs de controladora substituem captura em RF."
  },
  "deepDive": {
    "mentalModel": "Trate Wi‑Fi como uma esteira de estados. A falha mais provável é o primeiro estado não comprovado por evidência.",
    "keyTerms": [
      "baseline",
      "linha do tempo",
      "hipótese",
      "evidência",
      "BSSID",
      "RADIUS",
      "DHCP lease",
      "roaming",
      "RCA"
    ],
    "limitations": [
      "O cliente nem sempre expõe SNR real.",
      "Captura 802.11 completa depende de hardware, driver, modo monitor e autorização.",
      "Controladoras diferentes usam nomes distintos para eventos semelhantes.",
      "Problemas intermitentes podem exigir coleta durante a falha."
    ],
    "whenToUse": [
      "Incidentes de Wi‑Fi lento ou instável.",
      "Falhas de autenticação corporativa.",
      "Clientes conectados sem internet.",
      "Mudanças de arquitetura WLAN.",
      "RCA de indisponibilidade em filial."
    ],
    "whenNotToUse": [
      "Como desculpa para varredura ofensiva em rede de terceiros.",
      "Para coletar tráfego de usuários sem autorização.",
      "Para alterar segurança sem análise de risco."
    ],
    "operationalImpact": [
      "Exige documentação de SSIDs, VLANs, RADIUS, DHCP, DNS e firewall.",
      "Reduz MTTR quando há playbook.",
      "Melhora comunicação entre suporte, redes e segurança."
    ],
    "financialImpact": [
      "Ferramentas enterprise de WLAN, WIDS/WIPS e gestão cloud podem exigir licença.",
      "Logs e telemetria aumentam armazenamento.",
      "Troubleshooting ruim gera custo de horas, indisponibilidade e mudanças desnecessárias."
    ],
    "securityImpact": [
      "Evita bypass inseguro durante incidente.",
      "Ajuda a detectar rogue, guest mal isolado e falha 802.1X.",
      "Permite auditoria e RCA com evidência."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Achar que barras de sinal provam Wi‑Fi saudável.",
      "whyItHappens": "Sistemas operacionais simplificam RF para o usuário final.",
      "consequence": "Ignora SNR, canal, airtime, autenticação e serviços de rede.",
      "correction": "Coletar BSSID, frequência, sinal, taxa, IP, gateway, DNS e logs."
    },
    {
      "mistake": "Culpar DNS quando o cliente nem recebeu IP.",
      "whyItHappens": "Usuário relata que sites não abrem.",
      "consequence": "Perde tempo investigando camada errada.",
      "correction": "Validar DHCP e gateway antes de DNS."
    },
    {
      "mistake": "Desabilitar 802.1X para testar.",
      "whyItHappens": "Pressão para restaurar conectividade rapidamente.",
      "consequence": "Cria bypass de segurança e pode ampliar incidente.",
      "correction": "Usar VLAN de contingência aprovada, logs RADIUS e escopo controlado."
    },
    {
      "mistake": "Reiniciar todos os APs sem coletar evidência.",
      "whyItHappens": "Parece uma solução rápida.",
      "consequence": "Apaga estado, derruba clientes saudáveis e prejudica RCA.",
      "correction": "Coletar dados por cliente/AP antes da ação, salvo emergência documentada."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "SSID não aparece",
      "Conecta e cai",
      "Conectado sem internet",
      "Sem IP",
      "IP 169.254.x.x",
      "Falha 802.1X",
      "DNS falha",
      "Gateway não responde",
      "Aplicação específica falha",
      "Roaming derruba chamada"
    ],
    "diagnosticQuestions": [
      "O cliente está associado a qual BSSID?",
      "Qual banda/canal/frequência?",
      "Recebeu IP correto?",
      "Gateway responde?",
      "DNS resolve?",
      "RADIUS aceitou ou negou?",
      "Firewall recebeu o tráfego?",
      "O problema é por usuário, dispositivo, área, SSID, AP ou aplicação?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, rádio, autenticação, canal, sinal e estado.",
        "expectedObservation": "SSID e BSSID corretos, sinal coerente, autenticação esperada.",
        "interpretation": "Se BSSID inesperado ou sinal ruim, investigar RF/roaming/inventário."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show wlanreport",
        "purpose": "Gerar relatório HTML com histórico de sessões Wi‑Fi.",
        "expectedObservation": "Arquivo HTML com eventos dos últimos dias.",
        "interpretation": "Útil para linha do tempo e falhas intermitentes."
      },
      {
        "platform": "Windows",
        "command": "ipconfig /all && route print && nslookup intranet.exemplo.local",
        "purpose": "Validar IP, gateway, DNS, rotas e resolução.",
        "expectedObservation": "IP da VLAN correta, gateway e DNS esperados.",
        "interpretation": "Se IP ausente ou DNS errado, a falha não é aplicação."
      },
      {
        "platform": "Linux",
        "command": "nmcli dev wifi list && nmcli -f GENERAL,IP4 device show wlan0",
        "purpose": "Listar redes e ver estado/IP da interface.",
        "expectedObservation": "SSID/BSSID visíveis e IP correto na interface.",
        "interpretation": "Compara ambiente RF e configuração IP."
      },
      {
        "platform": "Linux",
        "command": "iw dev wlan0 link && ip addr show wlan0 && ip route && resolvectl status",
        "purpose": "Ver BSSID associado, sinal, IP, rota e DNS.",
        "expectedObservation": "Connected to BSSID, signal, default route e DNS coerentes.",
        "interpretation": "Ajuda a separar RF, IP, rota e DNS."
      },
      {
        "platform": "Cisco Catalyst 9800",
        "command": "show wireless client mac-address <MAC> detail",
        "purpose": "Ver estado do cliente, WLAN, AP, política, autenticação e estatísticas.",
        "expectedObservation": "Cliente em estado Run com política esperada.",
        "interpretation": "Se falha antes de Run, investigar etapa indicada pelo log."
      },
      {
        "platform": "Cisco Catalyst 9800",
        "command": "show logging profile wireless filter mac <MAC>",
        "purpose": "Coletar eventos por cliente.",
        "expectedObservation": "Linha do tempo de associação, autenticação e eventuais erros.",
        "interpretation": "Base para RCA por cliente específico."
      }
    ],
    "decisionTree": [
      {
        "if": "SSID não aparece",
        "then": "Verificar RF, banda suportada, perfil, SSID oculto, AP ativo e política de broadcast."
      },
      {
        "if": "Associa mas 802.1X falha",
        "then": "Verificar certificado, usuário/dispositivo, RADIUS, NAC, tempo/NTP e logs EAP."
      },
      {
        "if": "Autentica mas não recebe IP",
        "then": "Verificar VLAN atribuída, escopo DHCP, relay, ACL e trunk do AP."
      },
      {
        "if": "Recebe IP mas gateway não responde",
        "then": "Verificar VLAN, gateway, firewall local, isolamento guest e rota."
      },
      {
        "if": "Gateway responde mas nomes falham",
        "then": "Investigar DNS, split-DNS, firewall porta 53/DoH/DoT e servidores configurados."
      },
      {
        "if": "Só uma aplicação falha",
        "then": "Testar porta, TLS, proxy, firewall, rota até backend e logs da aplicação."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Coletar evidências antes de alterar segurança.",
      "Manter inventário de SSIDs, BSSIDs, VLANs, RADIUS e escopos DHCP.",
      "Centralizar logs de controladora, RADIUS, DHCP, DNS, firewall e SIEM.",
      "Usar 802.1X/EAP-TLS quando possível.",
      "Documentar exceções temporárias com expiração.",
      "Sincronizar NTP para linha do tempo confiável."
    ],
    "badPractices": [
      "Desligar 802.1X para resolver incidente sem aprovação.",
      "Liberar any-any no firewall para teste permanente.",
      "Colocar guest na VLAN corporativa.",
      "Apagar logs reiniciando infraestrutura antes da coleta.",
      "Fazer captura de tráfego de terceiros sem autorização."
    ],
    "commonErrors": [
      "Confundir associação com autorização.",
      "Confundir Wi‑Fi com internet.",
      "Ignorar RADIUS/NAC.",
      "Usar PSK compartilhado como contingência sem controle.",
      "Não registrar BSSID e horário do problema."
    ],
    "vulnerabilities": [
      {
        "name": "Bypass operacional de segurança",
        "description": "Mudanças emergenciais relaxam controles para restaurar acesso.",
        "defensiveExplanation": "O incidente de disponibilidade vira incidente de segurança se o bypass não for controlado.",
        "mitigation": "Playbook de contingência aprovado, escopo limitado, expiração e revisão."
      },
      {
        "name": "Falta de evidência para RCA",
        "description": "Sem logs sincronizados e coleta por cliente, a causa raiz fica indeterminada.",
        "defensiveExplanation": "A organização repete incidentes porque não aprende com eles.",
        "mitigation": "Logging mínimo, NTP, retenção, SIEM e checklist de coleta."
      },
      {
        "name": "Guest mal isolado",
        "description": "Cliente visitante alcança serviços internos por erro de VLAN/ACL.",
        "defensiveExplanation": "Troubleshooting de guest deve testar acesso negado, não apenas internet funcionando.",
        "mitigation": "Deny-by-default, firewall entre zonas, DNS controlado e teste recorrente."
      }
    ],
    "monitoring": [
      "Falhas 802.1X por usuário/dispositivo",
      "Mudança de VLAN atribuída",
      "DHCP scope exhaustion",
      "Aumento de reassociações",
      "Clientes com BSSID inesperado",
      "Quedas concentradas por AP/canal",
      "Bloqueios de firewall por segmento wireless"
    ],
    "hardening": [
      "WPA Enterprise/EAP-TLS",
      "PMF quando compatível",
      "rede guest isolada",
      "logs centralizados",
      "MDM/NAC",
      "inventário de APs",
      "controle de mudanças"
    ],
    "detectionIdeas": [
      "Comparar BSSID do cliente com inventário",
      "Correlacionar falhas RADIUS com eventos de WLAN",
      "Alertar DHCP de VLAN errada",
      "Monitorar clients flapping entre APs",
      "Alertar exceções de firewall criadas durante incidente"
    ]
  },
  "lab": {
    "id": "lab-12.9",
    "title": "Coletando evidências de troubleshooting Wi‑Fi no Windows ou Linux",
    "labType": "local",
    "objective": "Montar uma linha do tempo mínima de diagnóstico Wi‑Fi separando RF, associação, autenticação, IP, DNS, rota e aplicação.",
    "scenario": "Você recebeu uma reclamação: o notebook conecta ao Wi‑Fi, mas a navegação falha de forma intermitente. Você vai coletar evidências sem alterar configuração da rede.",
    "topology": "Notebook Wi‑Fi -> AP/roteador -> gateway -> DNS -> internet/aplicação de teste",
    "architecture": "Ambiente local ou corporativo autorizado, com cliente Wi‑Fi, rede IP, DNS e acesso a pelo menos um destino de teste.",
    "prerequisites": [
      "Permissão para testar a própria rede ou laboratório autorizado.",
      "Windows PowerShell ou terminal Linux.",
      "Conhecer o SSID autorizado.",
      "Opcional: acesso a logs da controladora/AP."
    ],
    "tools": [
      "Windows: netsh, ipconfig, route, nslookup, Test-NetConnection",
      "Linux: nmcli, iw, ip, resolvectl, ping, dig ou nslookup",
      "Opcional: Wireshark em ambiente autorizado",
      "Editor de texto para registrar evidências"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não capture tráfego de terceiros sem autorização.",
      "Não execute ataques, deauth, evil twin ou interferência.",
      "Não altere segurança da rede durante o laboratório.",
      "Mascare MACs, nomes de usuários e domínios internos se for compartilhar evidências."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar contexto",
        "instruction": "Anote horário, local, SSID esperado, usuário/dispositivo, sintoma e impacto.",
        "command": "# Exemplo de anotação\nData/hora: ____\nLocal: ____\nSSID esperado: ____\nSintoma: ____\nImpacto: ____",
        "expectedOutput": "Um registro básico para linha do tempo.",
        "explanation": "Sem horário e contexto, fica difícil correlacionar logs de cliente, controladora, RADIUS e firewall."
      },
      {
        "number": 2,
        "title": "Coletar estado Wi‑Fi no Windows",
        "instruction": "Se estiver no Windows, colete interface, BSSID, sinal, canal e autenticação.",
        "command": "netsh wlan show interfaces\nnetsh wlan show networks mode=bssid",
        "expectedOutput": "SSID, BSSID, Signal, Radio type, Authentication, Cipher e Channel.",
        "explanation": "Esses dados testam hipóteses de SSID errado, BSSID inesperado, RF ruim e segurança incorreta."
      },
      {
        "number": 3,
        "title": "Coletar estado Wi‑Fi no Linux",
        "instruction": "Se estiver no Linux, colete redes visíveis e link atual.",
        "command": "nmcli dev wifi list\niw dev wlan0 link",
        "expectedOutput": "Lista de SSIDs/BSSIDs e link atual com sinal/frequência quando suportado.",
        "explanation": "Substitua wlan0 pelo nome real da interface se necessário."
      },
      {
        "number": 4,
        "title": "Verificar IP, gateway e DNS",
        "instruction": "Confirme se o cliente recebeu configuração IP coerente.",
        "command": "ipconfig /all  # Windows\nip addr show && ip route && resolvectl status  # Linux",
        "expectedOutput": "IP da rede correta, gateway default e servidores DNS esperados.",
        "explanation": "Se não há IP ou gateway, ainda não é hora de culpar aplicação."
      },
      {
        "number": 5,
        "title": "Testar gateway e DNS",
        "instruction": "Teste alcance do gateway e resolução de nomes.",
        "command": "ping <gateway>\nnslookup exemplo.com\n# Linux opcional\ndig exemplo.com",
        "expectedOutput": "Gateway responde e DNS retorna endereço.",
        "explanation": "Gateway sem resposta indica problema local/VLAN/firewall. DNS sem resposta aponta para serviço, rota ou política DNS."
      },
      {
        "number": 6,
        "title": "Testar porta de aplicação",
        "instruction": "Teste uma porta conhecida sem depender do navegador.",
        "command": "Test-NetConnection exemplo.com -Port 443  # Windows\ncurl -Iv https://exemplo.com  # Linux/macOS",
        "expectedOutput": "Conexão TCP/TLS ou erro explícito.",
        "explanation": "Se DNS resolve mas a porta falha, investigue firewall, proxy, TLS, rota ou serviço."
      },
      {
        "number": 7,
        "title": "Gerar relatório WLAN no Windows",
        "instruction": "Se estiver no Windows, gere relatório de histórico de sessões.",
        "command": "netsh wlan show wlanreport",
        "expectedOutput": "Caminho de um arquivo HTML com eventos Wi‑Fi.",
        "explanation": "O relatório ajuda em falhas intermitentes porque mostra sessões e eventos dos últimos dias."
      },
      {
        "number": 8,
        "title": "Montar matriz de hipótese",
        "instruction": "Preencha uma tabela com etapa, evidência, status e próxima ação.",
        "command": "Etapa | Evidência | OK/Falha | Próxima ação\nRF | ____ | ____ | ____\nAssociação | ____ | ____ | ____\nAutenticação | ____ | ____ | ____\nDHCP/IP | ____ | ____ | ____\nDNS | ____ | ____ | ____\nFirewall/aplicação | ____ | ____ | ____",
        "expectedOutput": "Matriz preenchida com evidências coletadas.",
        "explanation": "A matriz impede salto lógico e melhora comunicação com times de rede/segurança."
      }
    ],
    "expectedResult": "O aluno deve produzir uma linha do tempo e uma matriz indicando em qual etapa a falha é mais provável, sem realizar alteração insegura.",
    "validation": [
      {
        "check": "BSSID e SSID registrados",
        "command": "netsh wlan show interfaces ou iw dev wlan0 link",
        "expected": "SSID/BSSID atuais identificados.",
        "ifFails": "Verifique se a interface está conectada e se o nome da interface está correto."
      },
      {
        "check": "IP e gateway coerentes",
        "command": "ipconfig /all ou ip addr && ip route",
        "expected": "IP da rede correta e rota default.",
        "ifFails": "Investigue DHCP, VLAN, escopo, relay ou autenticação/NAC."
      },
      {
        "check": "DNS testado",
        "command": "nslookup exemplo.com ou dig exemplo.com",
        "expected": "Resposta DNS válida.",
        "ifFails": "Verifique DNS configurado, firewall, rota e split-DNS."
      },
      {
        "check": "Aplicação testada por porta",
        "command": "Test-NetConnection exemplo.com -Port 443 ou curl -Iv https://exemplo.com",
        "expected": "Conexão estabelecida ou erro claro.",
        "ifFails": "Investigue firewall, proxy, TLS, rota ou aplicação."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Comando iw não existe",
        "probableCause": "Pacote iw não instalado ou distribuição sem ferramenta.",
        "howToConfirm": "Executar which iw.",
        "fix": "Instalar pacote apropriado ou usar nmcli."
      },
      {
        "symptom": "Interface Linux não é wlan0",
        "probableCause": "Nome previsível de interface, como wlp2s0.",
        "howToConfirm": "Executar ip link.",
        "fix": "Substituir wlan0 pelo nome correto."
      },
      {
        "symptom": "Gateway não responde, mas há IP",
        "probableCause": "Isolamento, firewall local, VLAN errada ou gateway bloqueando ICMP.",
        "howToConfirm": "Testar ARP/rota e outra porta permitida.",
        "fix": "Validar VLAN, gateway, política e logs."
      },
      {
        "symptom": "DNS falha somente para domínios internos",
        "probableCause": "Split-DNS, VPN, DNS privado ou servidor interno inacessível.",
        "howToConfirm": "Comparar domínio público e interno.",
        "fix": "Validar DNS entregue por DHCP e rota até DNS interno."
      }
    ],
    "improvements": [
      "Adicionar coleta automática em script somente leitura.",
      "Padronizar template de RCA para Wi‑Fi.",
      "Integrar logs de RADIUS e controladora ao SIEM.",
      "Criar dashboard por SSID/AP/canal/falhas 802.1X."
    ],
    "evidenceToCollect": [
      "Horário e local do sintoma",
      "SSID e BSSID",
      "Sinal/canal/frequência",
      "IP/máscara/gateway/DNS",
      "Resultado de gateway/DNS/porta",
      "Logs RADIUS/controladora quando disponíveis",
      "Print ou export do relatório WLAN"
    ],
    "questions": [
      "Qual foi a primeira etapa sem evidência OK?",
      "O problema é por cliente, área, AP, SSID ou aplicação?",
      "Que mudança insegura alguém poderia propor e como evitá-la?",
      "Quais logs externos seriam necessários para RCA definitivo?"
    ],
    "challenge": "Monte um relatório de 10 linhas para um gerente técnico explicando causa provável, evidências, impacto, mitigação temporária segura e próximos passos.",
    "solution": "Uma boa solução separa fatos de hipóteses: informa horário, clientes afetados, BSSID/AP, IP/DNS, resultado de testes, logs disponíveis, causa provável e ação recomendada. Não recomenda desabilitar segurança nem liberar tráfego amplo sem aprovação."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que 'conectado ao Wi‑Fi' não prova que a rede está funcionando?",
      "hints": [
        "Pense em estados depois da associação.",
        "Considere DHCP, DNS, firewall e aplicação."
      ],
      "expectedIdeas": [
        "associação não é autorização",
        "IP pode faltar",
        "DNS pode falhar",
        "firewall pode bloquear",
        "aplicação pode estar fora"
      ],
      "explanation": "A resposta deve separar conexão wireless de conectividade fim a fim."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário tem IP 169.254.x.x. Qual camada você investigaria antes de DNS?",
      "hints": [
        "Esse endereço costuma aparecer quando DHCP falha.",
        "Pense em VLAN e escopo."
      ],
      "expectedIdeas": [
        "DHCP",
        "VLAN",
        "relay",
        "escopo esgotado",
        "autenticação/NAC"
      ],
      "explanation": "Sem IP válido, DNS e aplicação são sintomas secundários."
    },
    {
      "type": "cenário real",
      "question": "Durante incidente, alguém propõe desativar 802.1X para todos. Como você responderia tecnicamente?",
      "hints": [
        "Pense em risco, escopo e alternativa controlada.",
        "Considere logs RADIUS."
      ],
      "expectedIdeas": [
        "risco de bypass",
        "coleta de logs",
        "contingência limitada",
        "aprovação",
        "expiração"
      ],
      "explanation": "Disponibilidade importa, mas a correção não pode destruir o controle de acesso."
    }
  ],
  "quiz": [
    {
      "id": "q12.9.1",
      "type": "conceito",
      "q": "Qual é a melhor interpretação de 'conectado ao Wi‑Fi, mas sem internet'?",
      "opts": [
        "O rádio sempre está ruim",
        "A senha está sempre errada",
        "O cliente pode ter associado, mas falhar em IP, DNS, rota, firewall ou aplicação",
        "O problema nunca é Wi‑Fi"
      ],
      "a": 2,
      "exp": "Conectado pode significar apenas associação/autenticação. A falha pode estar em etapas posteriores.",
      "difficulty": "iniciante",
      "topic": "método"
    },
    {
      "id": "q12.9.2",
      "type": "comando",
      "q": "Qual comando Windows gera um relatório HTML com histórico de sessões Wi‑Fi?",
      "opts": [
        "ipconfig /flushdns",
        "netsh wlan show wlanreport",
        "route print /wifi",
        "Get-DnsClientCache"
      ],
      "a": 1,
      "exp": "O comando netsh wlan show wlanreport gera o relatório WLAN.",
      "difficulty": "intermediário",
      "topic": "windows"
    },
    {
      "id": "q12.9.3",
      "type": "diagnóstico",
      "q": "Um cliente autentica em 802.1X, mas não recebe IP. Qual hipótese deve ser priorizada?",
      "opts": [
        "TLS do site externo",
        "DHCP, VLAN atribuída, relay ou escopo",
        "Senha do usuário sempre inválida",
        "Canal 6 sempre congestionado"
      ],
      "a": 1,
      "exp": "Após autenticar, a etapa seguinte é endereçamento. VLAN/DHCP/relay/escopo são hipóteses fortes.",
      "difficulty": "intermediário",
      "topic": "dhcp"
    },
    {
      "id": "q12.9.4",
      "type": "segurança",
      "q": "Qual ação é mais segura durante troubleshooting de falha 802.1X generalizada?",
      "opts": [
        "Desativar 802.1X permanentemente",
        "Criar SSID aberto para todos",
        "Coletar logs RADIUS/controladora e aplicar contingência aprovada, limitada e temporária",
        "Liberar firewall any-any"
      ],
      "a": 2,
      "exp": "A contingência deve ser controlada, aprovada e temporária, com coleta de evidências.",
      "difficulty": "avançado",
      "topic": "segurança"
    },
    {
      "id": "q12.9.5",
      "type": "linux",
      "q": "Qual conjunto ajuda a ver BSSID associado, IP, rota e DNS no Linux?",
      "opts": [
        "iw dev wlan0 link, ip addr, ip route, resolvectl status",
        "chmod, lsblk, fdisk, mount",
        "docker ps, kubectl get pods",
        "whoami, history, date"
      ],
      "a": 0,
      "exp": "Esses comandos cobrem link Wi‑Fi, endereçamento, rota e DNS.",
      "difficulty": "intermediário",
      "topic": "linux"
    },
    {
      "id": "q12.9.6",
      "type": "arquitetura",
      "q": "Por que logs de firewall podem ficar vazios durante uma falha Wi‑Fi?",
      "opts": [
        "Porque firewall nunca registra Wi‑Fi",
        "Porque o cliente pode falhar antes de chegar ao firewall, por exemplo em associação, 802.1X ou DHCP",
        "Porque DNS apaga logs do firewall",
        "Porque ICMP desativa firewall"
      ],
      "a": 1,
      "exp": "Se o pacote não chega à camada onde o firewall atua, o log do firewall não mostra o evento principal.",
      "difficulty": "intermediário",
      "topic": "correlação"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.9.1",
      "front": "Qual é a primeira regra do troubleshooting Wi‑Fi?",
      "back": "Transformar o sintoma em hipóteses por camada e procurar a primeira etapa sem evidência OK.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.9.2",
      "front": "BSSID ajuda a diagnosticar o quê?",
      "back": "Ajuda a identificar o AP/radio real ao qual o cliente está associado.",
      "tags": [
        "bssid",
        "wireless"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.9.3",
      "front": "O que indica IP 169.254.x.x?",
      "back": "Geralmente indica autoconfiguração link-local após falha em obter IP via DHCP.",
      "tags": [
        "dhcp",
        "ip"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.9.4",
      "front": "Por que RADIUS é importante no troubleshooting Wi‑Fi corporativo?",
      "back": "Porque 802.1X depende de autenticação/autorização, e o RADIUS registra aceites, negações e políticas.",
      "tags": [
        "radius",
        "802.1x"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.9.5",
      "front": "Qual risco de desativar 802.1X durante incidente?",
      "back": "Criar bypass de controle de acesso, perdendo identidade individual e abrindo acesso indevido.",
      "tags": [
        "segurança",
        "802.1x"
      ],
      "difficulty": "avançado"
    },
    {
      "id": "fc12.9.6",
      "front": "O que é RCA?",
      "back": "Root Cause Analysis: análise de causa raiz baseada em evidências e linha do tempo.",
      "tags": [
        "rca",
        "operação"
      ],
      "difficulty": "iniciante"
    }
  ],
  "exercises": [
    {
      "id": "ex12.9.1",
      "type": "diagnóstico",
      "prompt": "Um usuário vê o SSID, associa, mas recebe IP 169.254.10.20. Liste três hipóteses prováveis.",
      "expectedAnswer": "Falha DHCP, VLAN errada, relay DHCP ausente/bloqueado, escopo esgotado ou NAC atribuindo política incorreta.",
      "explanation": "O sintoma indica que a falha ocorreu após associação/autenticação e antes de endereçamento válido."
    },
    {
      "id": "ex12.9.2",
      "type": "comando/output",
      "prompt": "No Windows, qual comando você usaria para descobrir BSSID e tipo de autenticação atual?",
      "expectedAnswer": "netsh wlan show interfaces.",
      "explanation": "Esse comando exibe detalhes da interface WLAN atual, incluindo SSID, BSSID, autenticação e sinal."
    },
    {
      "id": "ex12.9.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma sequência mínima de logs para investigar falha 802.1X em SSID corporativo.",
      "expectedAnswer": "Cliente/OS, AP/controladora, RADIUS/NAC, diretório/PKI/MDM, DHCP, firewall/SIEM conforme o caso.",
      "explanation": "Falhas 802.1X podem depender de certificado, identidade, política, horário/NTP e integração."
    },
    {
      "id": "ex12.9.4",
      "type": "segurança",
      "prompt": "Explique por que liberar any-any no firewall não é um bom teste inicial para Wi‑Fi lento.",
      "expectedAnswer": "Porque pode criar risco de acesso indevido e nem testa RF, associação, autenticação, DHCP ou DNS. Testes devem ser específicos e reversíveis.",
      "explanation": "Troubleshooting seguro minimiza mudança e mede hipótese concreta."
    }
  ],
  "challenge": {
    "title": "War room Wi‑Fi: videochamadas caindo na sala de reunião",
    "scenario": "Uma sala de reunião executiva sofre quedas em chamadas. Usuários dizem que o Wi‑Fi mostra sinal alto. O SSID é corporativo com 802.1X. O problema ocorre principalmente quando há muitas pessoas na sala.",
    "tasks": [
      "Listar hipóteses por camada.",
      "Definir evidências a coletar no cliente.",
      "Definir evidências a coletar na controladora/AP.",
      "Definir evidências de RADIUS, DHCP, DNS e firewall.",
      "Propor mitigação temporária segura.",
      "Escrever um resumo executivo de 8 linhas."
    ],
    "constraints": [
      "Não desativar 802.1X.",
      "Não criar SSID aberto.",
      "Não reiniciar AP antes de coletar evidência, salvo emergência aprovada.",
      "Não capturar tráfego de usuários sem autorização."
    ],
    "expectedDeliverables": [
      "Matriz de hipóteses",
      "Checklist de comandos",
      "Lista de logs",
      "Plano de mitigação",
      "Resumo executivo"
    ],
    "gradingRubric": [
      {
        "criterion": "Separação por camadas",
        "points": 25,
        "description": "Não pula de Wi‑Fi para aplicação sem validar estados intermediários."
      },
      {
        "criterion": "Evidências adequadas",
        "points": 25,
        "description": "Coleta cliente, AP/controladora, RADIUS, DHCP, DNS e firewall conforme hipótese."
      },
      {
        "criterion": "Segurança",
        "points": 25,
        "description": "Evita bypass e respeita autorização."
      },
      {
        "criterion": "Comunicação",
        "points": 25,
        "description": "Resumo claro para suporte, redes, segurança e gestão."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O cenário aponta para hipótese de capacidade/airtime, roaming ou RF, mas sinal alto não elimina autenticação, DHCP, DNS ou firewall. Como ocorre com muitas pessoas, airtime, canal, densidade, interferência e capacidade do AP entram forte. Ainda assim, o método exige evidência.",
    "steps": [
      "Registrar horário, sala, usuários e aplicações afetadas.",
      "Coletar BSSID, sinal, frequência, taxa e relatório WLAN em clientes afetados.",
      "Verificar controladora: AP, canal, utilização, retransmissões, clientes associados e eventos de roaming.",
      "Confirmar RADIUS aceitando autenticações e sem negações em massa.",
      "Confirmar DHCP sem escopo esgotado e DNS/gateway saudáveis.",
      "Verificar firewall/proxy apenas depois de confirmar que tráfego chega à rede.",
      "Aplicar mitigação segura: redistribuir clientes, ajustar potência/canal conforme change, usar cabo temporário para reunião crítica ou realocar sala.",
      "Registrar RCA inicial e plano de correção definitiva."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Desativar 802.1X para a sala.",
        "whyItIsWrong": "Não testa RF/capacidade e cria bypass crítico."
      },
      {
        "answer": "Reiniciar todos os APs do andar imediatamente.",
        "whyItIsWrong": "Apaga evidência, impacta usuários e pode não resolver capacidade."
      },
      {
        "answer": "Culpar DNS porque videochamada usa nomes.",
        "whyItIsWrong": "DNS pode nem estar envolvido se a sessão já estava estabelecida e caiu por RF/roaming/perda."
      }
    ],
    "finalAnswer": "A resposta madura coleta evidência de cliente, AP/controladora, RADIUS, DHCP, DNS e firewall. A causa provável inicial é capacidade/airtime ou RF na sala durante alta densidade, mas a conclusão final depende dos logs e medições. A mitigação deve ser temporária, segura e registrada."
  },
  "glossary": [
    {
      "term": "Troubleshooting Wi‑Fi",
      "shortDefinition": "Diagnóstico estruturado de falhas em redes sem fio.",
      "longDefinition": "Processo de investigar RF, associação, autenticação, endereçamento, DNS, rota, política e aplicação para localizar a etapa da falha.",
      "example": "Separar cliente sem IP de cliente com DNS falhando.",
      "relatedTerms": [
        "RF",
        "BSSID",
        "RADIUS",
        "DHCP",
        "RCA"
      ],
      "relatedLessons": [
        "12.2",
        "12.4",
        "12.5",
        "12.9"
      ]
    },
    {
      "term": "Linha do tempo",
      "shortDefinition": "Sequência ordenada de eventos e evidências.",
      "longDefinition": "Organização temporal de sintomas, logs, mudanças e testes para investigar incidentes.",
      "example": "Comparar horário da falha do usuário com log RADIUS e evento da controladora.",
      "relatedTerms": [
        "RCA",
        "SIEM",
        "logs"
      ],
      "relatedLessons": [
        "12.8",
        "12.9",
        "15.2"
      ]
    },
    {
      "term": "Baseline",
      "shortDefinition": "Estado normal usado como comparação.",
      "longDefinition": "Medição ou comportamento esperado da rede em condições saudáveis.",
      "example": "Utilização normal de canal antes de um evento de lentidão.",
      "relatedTerms": [
        "métrica",
        "observabilidade",
        "capacidade"
      ],
      "relatedLessons": [
        "12.2",
        "12.9",
        "15.2"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de identificar por que um incidente ocorreu, não apenas como restaurar o serviço.",
      "example": "Concluir que a queda era causada por escopo DHCP esgotado na VLAN wireless.",
      "relatedTerms": [
        "postmortem",
        "linha do tempo",
        "evidência"
      ],
      "relatedLessons": [
        "12.9",
        "15.12"
      ]
    },
    {
      "term": "Relatório WLAN",
      "shortDefinition": "Relatório de eventos Wi‑Fi gerado no Windows.",
      "longDefinition": "Arquivo HTML gerado pelo netsh com histórico de sessões e eventos de rede sem fio.",
      "example": "Usar netsh wlan show wlanreport para falhas intermitentes.",
      "relatedTerms": [
        "netsh",
        "Windows",
        "troubleshooting"
      ],
      "relatedLessons": [
        "12.9"
      ]
    },
    {
      "term": "Controlled change",
      "shortDefinition": "Mudança controlada com aprovação, escopo e rollback.",
      "longDefinition": "Alteração feita de forma documentada para testar ou mitigar sem criar risco desnecessário.",
      "example": "Aplicar ajuste de potência em um AP específico com janela e rollback.",
      "relatedTerms": [
        "change management",
        "segurança",
        "operação"
      ],
      "relatedLessons": [
        "12.7",
        "12.9",
        "15.12"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Analyze the wireless network report",
      "organization": "Microsoft Support",
      "url": "https://support.microsoft.com/en-us/windows/analyze-the-wireless-network-report-76da0daa-1db2-6049-d154-7bb679eb03ed",
      "note": "Referência para relatório WLAN no Windows."
    },
    {
      "type": "official-doc",
      "title": "netsh wlan",
      "organization": "Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/netsh-wlan",
      "note": "Referência do comando netsh wlan."
    },
    {
      "type": "official-doc",
      "title": "nmcli Reference Manual",
      "organization": "NetworkManager",
      "url": "https://networkmanager.dev/docs/api/latest/nmcli.html",
      "note": "Referência para nmcli em Linux."
    },
    {
      "type": "official-doc",
      "title": "Display Filter Reference: IEEE 802.11 wireless LAN",
      "organization": "Wireshark",
      "url": "https://www.wireshark.org/docs/dfref/w/wlan.html",
      "note": "Campos de filtro 802.11 para análise autorizada."
    },
    {
      "type": "official-doc",
      "title": "Troubleshoot Catalyst 9800 Client Connectivity Issues Flow",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/218395-troubleshoot-catalyst-9800-client-connec.html",
      "note": "Fluxo e comandos para troubleshooting de clientes em controladoras Catalyst 9800."
    },
    {
      "type": "internal-course",
      "title": "DNS, DHCP, NAT e Serviços Essenciais",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m07",
      "note": "Pré-requisito para diagnosticar IP, DNS e serviços essenciais."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "DHCP e DNS são etapas centrais após associação/autenticação Wi‑Fi."
    },
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall e ACLs podem bloquear clientes wireless mesmo com IP correto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs e métricas",
      "reason": "Troubleshooting profissional depende de telemetria e linha do tempo."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "autenticação corporativa",
      "lesson": "certificados e identidade",
      "reason": "802.1X/EAP-TLS depende de identidade, certificados e política de acesso."
    }
  ],
  "pedagogicalMap": {
    "problem": "Wi‑Fi ruim é sintoma vago que pode nascer em várias camadas.",
    "concept": "Troubleshooting Wi‑Fi é investigação por estados e evidências.",
    "internalMechanism": "Cliente passa por descoberta, associação, autenticação, autorização, DHCP, DNS, rota, política e aplicação.",
    "realUse": "War rooms, suporte de filial, SOC, RCA e mudanças de arquitetura WLAN.",
    "commonMistake": "Pular direto para reiniciar AP, trocar senha ou liberar firewall sem evidência.",
    "securityImpact": "Reduz bypass operacional e melhora detecção de rogue, falha 802.1X e guest mal isolado.",
    "operationalImpact": "Diminui MTTR e melhora comunicação entre suporte, redes, segurança e aplicação.",
    "summary": "Evidência primeiro; alteração depois."
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
      "12.10"
    ]
  }
};
