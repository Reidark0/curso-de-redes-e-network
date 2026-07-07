export const lesson1206 = {
  "id": "12.6",
  "moduleId": "m12",
  "order": 6,
  "title": "Roaming, múltiplos APs e experiência do usuário",
  "subtitle": "Por que mobilidade Wi-Fi depende de cliente, RF, BSSID, 802.11k/r/v, autenticação, política e telemetria — não apenas de colocar mais access points.",
  "duration": "90-130 min",
  "estimatedStudyTimeMinutes": 130,
  "difficulty": "intermediário",
  "type": "intermediária",
  "xp": 210,
  "tags": [
    "redes",
    "wireless",
    "wi-fi",
    "roaming",
    "802.11k",
    "802.11r",
    "802.11v",
    "bssid",
    "rf",
    "voz",
    "troubleshooting",
    "segurança"
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
      "lesson": "12.2",
      "reason": "Roaming depende de RF, RSSI, SNR, canais, potência e interferência."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.4",
      "reason": "Roaming é troca de associação entre BSSIDs dentro de um SSID/ESS."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "WPA2/WPA3 Enterprise, 802.1X, RADIUS e certificados influenciam diretamente o tempo de roaming."
    }
  ],
  "objectives": [
    "Explicar o que é roaming Wi-Fi e por que múltiplos APs não garantem mobilidade automaticamente.",
    "Diferenciar cobertura, capacidade, sticky client, sobreposição de célula e experiência real.",
    "Descrever o papel de 802.11k, 802.11r e 802.11v em roaming corporativo.",
    "Relacionar roaming com 802.1X, RADIUS, VLAN, DHCP, firewall, voz e aplicações sensíveis.",
    "Executar diagnóstico defensivo de BSSID atual, candidatos, sinal, canal, banda e evento de troca.",
    "Propor melhorias de arquitetura sem recorrer automaticamente a mais APs."
  ],
  "learningOutcomes": [
    "Dado um relato de chamada caindo ao caminhar, o aluno separa hipóteses de RF, sticky client, autenticação, DHCP e aplicação.",
    "Dado um ambiente com múltiplos APs, o aluno identifica BSSID atual e BSSIDs candidatos do mesmo SSID.",
    "Dado um desenho corporativo, o aluno decide quando testar 802.11k/r/v e quais riscos validar.",
    "Dado um conjunto de logs, o aluno relaciona roam events, falhas 802.1X e experiência percebida.",
    "Dado um cenário de escritório, o aluno propõe plano de melhoria baseado em evidência."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Imagine um hospital, um centro de distribuição, uma universidade ou um escritório com chamadas de voz pelo Teams, coletores móveis, leitores de código de barras, carrinhos de enfermagem, tablets de vistoria e notebooks andando de uma sala para outra. O usuário não pensa em rádio, BSSID, reautenticação, tabela de vizinhos ou handoff. Ele só percebe uma coisa: a chamada picotou, o coletor perdeu sessão, o aplicativo travou ou o notebook ficou “conectado sem internet” ao mudar de ambiente.</p>\n  <p>Esse problema aparece mesmo quando a empresa instalou vários APs modernos e mesmo quando o sinal mostrado pelo sistema operacional parece “forte”. A experiência wireless não depende apenas de ter cobertura. Ela depende de o cliente escolher o AP certo, abandonar o AP antigo no momento correto, renegociar segurança rapidamente, receber política compatível, manter IP/rota quando aplicável, não cair em uma célula congestionada e não ficar preso em uma decisão ruim tomada pelo próprio cliente.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> a empresa instalou seis APs com o mesmo SSID. Em pontos de reunião, os notebooks continuam presos ao AP do corredor, mesmo com outro AP mais perto. Em chamadas de voz, há quedas de 2 a 5 segundos quando o usuário caminha. O fornecedor diz que “o roaming é decisão do cliente”; o time de rede diz que “o sinal está bom”; o SOC vê muitas reassociações; e a diretoria só enxerga uma rede Wi-Fi ruim.</div>\n  <p>Esta aula existe para explicar o roaming como uma consequência de projeto, RF, autenticação, compatibilidade de cliente, recursos 802.11k/r/v, controladora, potência, sobreposição de células, latência de autenticação e comportamento de aplicação. Você vai aprender por que roaming não é apenas trocar de AP, por que múltiplos APs não garantem mobilidade, como diagnosticar experiência ruim e como desenhar WLAN corporativa para reduzir interrupções.</p>\n\n\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n\n\n  <p>No começo das WLANs, muitas redes eram pequenas: um AP em uma sala, poucos notebooks e baixa exigência de mobilidade. O usuário se conectava e permanecia perto do mesmo rádio. Conforme Wi-Fi virou infraestrutura principal em escritórios, hospitais, fábricas, escolas e varejo, a rede sem fio deixou de ser “comodidade” e virou meio de acesso crítico.</p>\n  <p>O problema cresceu quando aplicações sensíveis a tempo real passaram a depender de Wi-Fi: voz sobre IP, vídeo, telemedicina, operação logística, POS, dispositivos médicos, tablets de atendimento e autenticação corporativa. Uma navegação web comum tolera pequenas pausas. Uma chamada de voz ou uma sessão de coletor de estoque não tolera vários segundos de reassociação, nova autenticação 802.1X, DHCP repetido ou perda de pacotes.</p>\n  <p>Recursos como 802.11k, 802.11r e 802.11v surgiram para tornar a transição entre BSSIDs mais previsível. O 802.11k ajuda o cliente a conhecer vizinhos e medições de rádio; o 802.11r acelera a transição de segurança entre APs; o 802.11v permite que a rede sugira transições de BSS e melhore o gerenciamento de clientes. Ainda assim, eles não eliminam a natureza fundamental do Wi-Fi: o cliente tem papel decisivo, cada fabricante implementa algoritmos próprios e compatibilidade precisa ser validada.</p>\n  <p>O desenho moderno também incorporou controladoras físicas ou cloud-managed, telemetria, mapas de cobertura, análise de roaming, logs por cliente, steering, band steering, load balancing, perfis de RF e integração com NAC/IAM. A maturidade saiu de “colocar mais AP” para “projetar células, potência, canais, segurança, aplicação e observabilidade”.</p>\n\n\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema técnico é que uma WLAN corporativa tem vários BSSIDs oferecendo o mesmo SSID, mas o cliente precisa decidir quando sair de um BSSID e entrar em outro. Se ele sair cedo demais, pode gerar instabilidade. Se sair tarde demais, fica em sticky client: preso a um AP distante, com taxa baixa, retransmissões altas e experiência ruim. Se o processo de autenticação for lento, o usuário percebe queda. Se a rede empurrar o cliente para um AP inadequado, a experiência piora.</p>\n  <ul>\n    <li><strong>Sem roaming eficiente:</strong> mobilidade real vira desconexão, especialmente em voz, vídeo e aplicações persistentes.</li>\n    <li><strong>Com potência mal planejada:</strong> células ficam grandes demais, clientes permanecem em AP distante e consomem airtime com taxas baixas.</li>\n    <li><strong>Com pouca sobreposição:</strong> o cliente perde sinal antes de encontrar um AP alternativo adequado.</li>\n    <li><strong>Com sobreposição excessiva:</strong> há co-channel interference, competição por airtime e decisões ruins de roaming.</li>\n    <li><strong>Com autenticação lenta:</strong> 802.1X, certificado, RADIUS, VLAN dinâmica e DHCP podem transformar uma troca de AP em interrupção perceptível.</li>\n  </ul>\n  <p>Em ambientes corporativos, o diagnóstico é difícil porque o problema pode estar em RF, firmware, driver do cliente, perfil MDM, autenticação, controladora, DHCP, firewall, aplicação, latência até RADIUS ou configuração de 802.11k/r/v. A pergunta correta raramente é “o sinal está bom?”. A pergunta correta é: <em>o cliente está no AP certo, no momento certo, com taxa adequada, pouca perda, autenticação rápida e caminho de rede consistente?</em></p>\n\n\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A evolução do roaming wireless pode ser vista como uma transição de redes baseadas em cobertura para redes baseadas em experiência. Primeiro tentava-se cobrir a área. Depois percebeu-se que cobertura não bastava: era preciso capacidade, célula adequada, suporte a voz, autenticação rápida e observabilidade.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>O que veio depois</th></tr></thead>\n    <tbody>\n      <tr><td>Um AP isolado</td><td>Um único rádio atendia o ambiente.</td><td>Sem mobilidade real e com áreas de sombra.</td><td>Múltiplos APs com mesmo SSID.</td></tr>\n      <tr><td>Múltiplos APs sem planejamento</td><td>Vários APs com mesmo SSID eram instalados para “melhorar sinal”.</td><td>Sticky clients, interferência, roaming lento e canais ruins.</td><td>Planejamento de células, potência e canais.</td></tr>\n      <tr><td>Roaming puramente reativo</td><td>O cliente procurava outro AP quando a conexão ficava ruim.</td><td>Queda perceptível em voz, vídeo e sessões sensíveis.</td><td>802.11k/v para informação e sugestão de transição.</td></tr>\n      <tr><td>Reautenticação completa</td><td>O cliente repetia etapas de segurança ao trocar de AP.</td><td>Roaming lento em redes Enterprise.</td><td>802.11r Fast BSS Transition e otimizações de chaveamento.</td></tr>\n      <tr><td>Rede gerenciada por telemetria</td><td>Controladora/cloud coleta RSSI, SNR, taxa, roam events e falhas.</td><td>Exige ferramenta, disciplina operacional e interpretação correta.</td><td>Operação baseada em experiência, baseline e automação.</td></tr>\n    </tbody>\n  </table>\n  <p>Essa evolução não elimina a responsabilidade de projeto. Recursos de roaming ajudam, mas não consertam AP mal posicionado, potência exagerada, canais sobrepostos, cliente antigo, SSID demais, RADIUS distante, certificado vencido ou aplicação sem tolerância a perda.</p>\n\n\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n\n\n  <p>Roaming Wi-Fi é o processo pelo qual uma estação wireless deixa de usar um BSSID e passa a usar outro BSSID, normalmente mantendo o mesmo SSID e a mesma rede lógica. Em termos práticos, é a troca entre APs dentro da mesma WLAN para preservar conectividade enquanto o usuário se move ou enquanto a rede tenta melhorar a qualidade da conexão.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> roaming é a transição de associação de um cliente entre pontos de acesso, dentro de um mesmo domínio de mobilidade ou serviço, tentando manter a continuidade da comunicação com menor interrupção possível.</div>\n  <p>Há três ideias importantes. Primeiro, o roaming é majoritariamente dirigido pelo cliente: o AP pode sugerir, informar, preparar ou incentivar, mas a decisão final costuma depender da estação. Segundo, o melhor AP não é necessariamente o mais próximo; ele é o AP com melhor combinação de sinal, SNR, carga, taxa suportada, política, banda, canal e estabilidade. Terceiro, roaming não é apenas RF: em redes corporativas, segurança, RADIUS, VLAN, DHCP, firewall e aplicação influenciam a percepção final.</p>\n  <p>Quando falamos em 802.11k/r/v, estamos falando de mecanismos que ajudam esse processo: 802.11k fornece informações de vizinhança e medições; 802.11r acelera a transição de segurança; 802.11v permite gerenciamento de transição de BSS e recomendações da rede. Eles são úteis, mas dependem de suporte de cliente, AP, controladora e configuração correta.</p>\n\n\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Por dentro, o roaming envolve rádio, decisão local do cliente, troca de quadros 802.11 e, em redes Enterprise, mecanismos de chave e autenticação. Um fluxo simplificado é:</p>\n  <ol class=\"flow-list\">\n    <li><strong>Monitoramento:</strong> o cliente acompanha RSSI, SNR, taxa, perda, beacons, retries e qualidade percebida do BSSID atual.</li>\n    <li><strong>Gatilho de roam:</strong> o driver decide procurar alternativa quando a qualidade cai, quando há sugestão da rede ou quando outro BSSID parece melhor.</li>\n    <li><strong>Descoberta de vizinhos:</strong> o cliente usa scan ativo/passivo; com 802.11k pode receber neighbor reports para reduzir busca.</li>\n    <li><strong>Escolha de alvo:</strong> o cliente avalia BSSID candidato por sinal, banda, canal, carga, recursos suportados e política.</li>\n    <li><strong>Transição:</strong> o cliente autentica/associa no novo BSSID. Com 802.11r, parte do material de chave pode ser preparado para reduzir tempo.</li>\n    <li><strong>Continuidade lógica:</strong> se VLAN, IP, gateway e sessão forem mantidos, a aplicação pode nem perceber; se algo mudar ou atrasar, haverá queda perceptível.</li>\n    <li><strong>Telemetria:</strong> AP/controladora registra roam event, motivo, BSSID origem/destino, RSSI, tempo e possíveis falhas.</li>\n  </ol>\n  <p>O ponto essencial é que “roaming rápido” não significa apenas trocar de rádio. Em uma rede WPA2/WPA3-Enterprise, a troca pode envolver 802.1X/EAP, RADIUS, PMK, derivação de chaves, VLAN dinâmica e autorização. Se o RADIUS está distante, se o certificado causa validação lenta, se o cliente não suporta 802.11r, ou se a rede tem configuração híbrida mal testada, o tempo de transição pode aumentar.</p>\n  <p>Outra causa comum de problema é potência. Se APs transmitem forte demais, o cliente escuta o AP antigo por muito tempo e não vê motivo para trocar. Porém o caminho reverso, do cliente para o AP, pode ser fraco porque o celular/notebook transmite com potência menor. Isso cria uma assimetria: o cliente “ouve” o AP, mas o AP recebe mal o cliente. A interface mostra barras boas, mas há retransmissões, latência e baixa taxa.</p>\n\n\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Em uma arquitetura corporativa, roaming envolve mais componentes do que o AP isolado. O desenho típico inclui clientes, múltiplos APs, controladora ou cloud management, switch PoE, VLANs, gateway, firewall, RADIUS/NAC, DHCP, DNS, SIEM e aplicações sensíveis a latência.</p>\n  <ul>\n    <li><strong>Camada envolvida:</strong> principalmente camada 1 e 2, mas com efeitos em IP, DNS, TLS e aplicação.</li>\n    <li><strong>Componentes:</strong> cliente, driver, rádio, AP origem, AP destino, controladora, RADIUS, DHCP, firewall e aplicação.</li>\n    <li><strong>Dependências:</strong> RF bem planejado, segurança compatível, VLAN consistente, DHCP estável e baixa latência até serviços de autenticação.</li>\n    <li><strong>Pontos de falha:</strong> potência alta, cobertura baixa, canal congestionado, SSID demais, cliente legado, firmware antigo, 802.11r incompatível, RADIUS lento e política dinâmica inconsistente.</li>\n  </ul>\n  <p>Em campus, hospital ou indústria, é comum usar mesmo SSID em muitos APs, mas isso não significa uma única célula. Cada AP/radio anuncia BSSID próprio. O cliente transita entre BSSIDs. A arquitetura precisa garantir que a troca não gere mudança inesperada de rede, queda de autenticação, alteração de ACL ou perda de sessão.</p>\n\n\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Pense em um telefone celular se movimentando pela cidade. Você não quer que a chamada caia ao passar de uma antena para outra. A rede precisa ter cobertura sobreposta, capacidade, sinal adequado e um processo de transição. No Wi-Fi acontece algo parecido, mas com uma diferença importante: em WLAN, o cliente tem muito poder de decisão e os APs nem sempre conseguem obrigar a estação a trocar na hora ideal.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> redes celulares têm controle centralizado mais forte sobre mobilidade. No Wi-Fi, a decisão de roaming depende muito do cliente, driver, sistema operacional e suporte a 802.11k/r/v. Portanto, “mais AP” não equivale automaticamente a “melhor handoff”.</div>\n\n\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Em uma casa com dois roteadores mesh anunciando o mesmo SSID, seu celular pode continuar preso ao AP da sala mesmo estando no quarto. Você vê duas ou três barras, mas a chamada de vídeo engasga. Ao desligar e ligar o Wi-Fi, o celular conecta no AP do quarto e melhora. Esse é um sintoma clássico de decisão de roaming ruim ou célula mal planejada.</p>\n  <p>O diagnóstico simples não é “o mesh é ruim”. É observar: qual BSSID está conectado, qual RSSI, qual banda, qual canal, qual taxa, se há congestionamento e se o dispositivo troca sozinho quando se move. Em Windows, `netsh wlan show interfaces` ajuda a ver BSSID, sinal e rádio. Em Linux, `nmcli` e `iw` ajudam a listar APs e conexão atual.</p>\n\n\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em um hospital, tablets de enfermagem circulam entre alas. O SSID corporativo usa WPA2/WPA3-Enterprise com 802.1X. Se o roaming exigir reautenticação completa a cada AP, o prontuário pode congelar por alguns segundos. Se o cliente não validar corretamente o certificado do RADIUS, há risco de aceitar infraestrutura falsa. Se a potência for alta demais, os tablets ficam presos em APs distantes. Se a VLAN dinâmica mudar durante o roam, aplicações podem perder sessão.</p>\n  <p>Um desenho maduro define células por área, reduz potência onde necessário, planeja canais, evita SSIDs em excesso, habilita recursos de roaming testados, valida compatibilidade de dispositivos críticos, monitora roam time e coleta logs de autenticação. Para voz, geralmente há exigências mais rígidas de latência, jitter e perda.</p>\n\n\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Cloud aparece em wireless de duas formas. Primeiro, muitas soluções WLAN são gerenciadas por cloud: APs enviam telemetria, eventos de roaming, health, firmware e estatísticas para um painel central. Segundo, serviços de autenticação, identidade, NAC, MDM e SIEM podem estar em cloud ou em datacenter híbrido.</p>\n  <p>Isso melhora operação, mas cria novas dependências. O AP pode continuar encaminhando tráfego local se a gestão cloud ficar indisponível, mas o troubleshooting histórico pode ser afetado. Se RADIUS, IdP, CA, MDM ou SIEM estiverem distantes, a latência e disponibilidade desses serviços passam a influenciar autenticação e resposta a incidentes. Em projetos cloud-managed, sempre documente o que continua funcionando offline e o que depende da nuvem.</p>\n\n\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, roaming aparece quando infraestrutura wireless passa a ser tratada como configuração versionada e auditável. SSIDs, perfis de RF, potência, canais, políticas de 802.11r/k/v, VLANs, tags de AP, certificados e integração RADIUS podem ser gerenciados por API, revisados por mudança, validados em ambiente piloto e monitorados por métricas.</p>\n  <p>Um pipeline maduro não deve simplesmente aplicar configuração em todos os APs. Ele deve ter controle de mudança: ambiente piloto, janela de manutenção, rollback, validação de clientes críticos, coleta de baseline antes/depois e checagem de indicadores como falhas de autenticação, roam failures, retransmissões, utilização de canal e reclamações de aplicação. Segurança e operação se encontram: uma mudança em 802.11r pode melhorar voz, mas quebrar cliente legado; uma mudança em PMF pode aumentar segurança, mas exigir validação de compatibilidade.</p>\n\n\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Roaming também é tema de segurança. Um cliente que aceita qualquer BSSID com SSID conhecido sem validar bem o ambiente pode ser induzido a decisões ruins. Uma rede com potência e cobertura descontroladas expõe sinal além do necessário. Uma transição mal configurada pode reduzir requisitos de segurança para compatibilidade. Logs incompletos dificultam investigar qual dispositivo estava em qual AP, horário, IP, VLAN e identidade durante um incidente.</p>\n  <table class=\"risk-table\"><thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead><tbody>\n    <tr><td>Sticky client</td><td>Cliente preso em AP distante</td><td>Baixa taxa, retransmissão, DoS acidental por airtime</td><td>Planejamento de potência, células, minimum data rate e análise de roaming</td></tr>\n    <tr><td>Roaming lento em 802.1X</td><td>Reautenticação perceptível</td><td>Queda de voz, vídeo e sessão</td><td>Validar 802.11r, RADIUS local/adequado, certificados e compatibilidade</td></tr>\n    <tr><td>Configuração permissiva por compatibilidade</td><td>Recursos de segurança desligados para suportar legado</td><td>Redução permanente de postura de segurança</td><td>Segmentar legado, planejar substituição e documentar exceções</td></tr>\n    <tr><td>Telemetria insuficiente</td><td>Sem eventos de roam/autenticação</td><td>Investigação fraca</td><td>Enviar logs de AP, controladora, RADIUS, DHCP e firewall ao SIEM</td></tr>\n  </tbody></table>\n  <div class=\"callout callout--security\"><strong>Limite ético:</strong> nesta aula, qualquer captura ou análise deve ocorrer apenas em rede própria ou laboratório autorizado. Não execute deauth, impersonação de AP, coleta de credenciais ou interferência deliberada em redes reais.</div>\n\n\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1120 520\" role=\"img\" aria-labelledby=\"roaming-title roaming-desc\">\n    <title id=\"roaming-title\">Roaming entre múltiplos APs com 802.11k/r/v</title>\n    <desc id=\"roaming-desc\">Cliente se move entre AP origem e AP destino; 802.11k informa vizinhos, 802.11v sugere transição, 802.11r acelera a troca de segurança, e logs são enviados para controladora e SIEM.</desc>\n    <defs><marker id=\"arrow-roam\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker></defs>\n\n    <rect x=\"40\" y=\"120\" width=\"260\" height=\"260\" rx=\"22\" class=\"svg-zone\" />\n    <text x=\"170\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Célula AP A</text>\n    <rect x=\"120\" y=\"220\" width=\"120\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"180\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">AP A</text>\n    <text x=\"180\" y=\"273\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSID origem</text>\n\n    <rect x=\"410\" y=\"120\" width=\"260\" height=\"260\" rx=\"22\" class=\"svg-zone\" />\n    <text x=\"540\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Sobreposição planejada</text>\n    <rect x=\"480\" y=\"220\" width=\"120\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"540\" y=\"250\" text-anchor=\"middle\" class=\"svg-label\">AP B</text>\n    <text x=\"540\" y=\"273\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">BSSID destino</text>\n\n    <rect x=\"785\" y=\"80\" width=\"265\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"917\" y=\"115\" text-anchor=\"middle\" class=\"svg-label\">Controladora / Cloud</text>\n    <text x=\"917\" y=\"142\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">telemetria, vizinhos, eventos</text>\n    <text x=\"917\" y=\"165\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">RF profile</text>\n\n    <rect x=\"785\" y=\"245\" width=\"265\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"917\" y=\"280\" text-anchor=\"middle\" class=\"svg-label\">RADIUS / NAC / SIEM</text>\n    <text x=\"917\" y=\"307\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">802.1X, política, logs</text>\n    <text x=\"917\" y=\"330\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">evidência de incidente</text>\n\n    <rect x=\"292\" y=\"400\" width=\"130\" height=\"68\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"357\" y=\"428\" text-anchor=\"middle\" class=\"svg-label\">Cliente</text>\n    <text x=\"357\" y=\"450\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">em movimento</text>\n\n    <line x1=\"245\" y1=\"255\" x2=\"480\" y2=\"255\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-roam)\" />\n    <text x=\"360\" y=\"235\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">roam: AP A → AP B</text>\n    <path d=\"M180 290 C230 360, 290 390, 357 400\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-roam)\" />\n    <path d=\"M540 290 C500 360, 430 390, 357 400\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-roam)\" />\n\n    <line x1=\"600\" y1=\"230\" x2=\"785\" y2=\"130\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-roam)\" />\n    <text x=\"704\" y=\"152\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">802.11k/v</text>\n    <line x1=\"600\" y1=\"275\" x2=\"785\" y2=\"295\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-roam)\" />\n    <text x=\"700\" y=\"305\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">802.1X / logs</text>\n    <line x1=\"917\" y1=\"185\" x2=\"917\" y2=\"245\" class=\"svg-flow svg-flow--request\" marker-end=\"url(#arrow-roam)\" />\n\n    <text x=\"555\" y=\"450\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Roaming bom = RF + cliente + segurança + política + telemetria</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula é defensivo e local. Você vai mapear BSSID atual, BSSIDs candidatos do mesmo SSID, sinal, banda, canal e evidências de troca ao se movimentar dentro de uma área autorizada. O objetivo não é forçar roaming nem interferir no rádio; é aprender a observar a decisão do cliente e transformar percepção subjetiva em evidência.</p>\n  <p>Quando possível, compare o comportamento parado perto de um AP, em ponto intermediário e perto de outro AP. Em ambiente doméstico mesh ou laboratório com dois APs, isso permite visualizar sticky client e diferença entre sinal mostrado e experiência real.</p>\n\n\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios trabalham raciocínio de diagnóstico: separar cobertura de capacidade, identificar sticky client, avaliar impacto de 802.11r em rede Enterprise e propor ações sem cair na solução simplista de “colocar mais AP”.</p>\n\n\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n\n\n  <p>Você receberá um cenário de escritório com múltiplos APs, chamadas de voz caindo e usuários presos em APs distantes. O desafio é criar um plano de investigação, correção gradual e validação sem derrubar a rede inteira.</p>\n\n\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada prioriza método: coletar baseline, identificar clientes afetados, mapear BSSID origem/destino, validar RF e segurança, testar 802.11k/r/v em piloto, ajustar potência e canais, medir antes/depois e documentar riscos.</p>\n\n\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n\n\n  <ul>\n    <li><strong>Ideia central:</strong> roaming é troca de BSSID para preservar experiência, mas depende de cliente, RF, segurança, política e aplicação.</li>\n    <li><strong>O que lembrar:</strong> sinal forte não garante roaming bom; potência exagerada pode piorar sticky clients.</li>\n    <li><strong>Erro comum:</strong> achar que múltiplos APs com mesmo SSID resolvem mobilidade automaticamente.</li>\n    <li><strong>Uso real:</strong> empresas precisam medir roam events, falhas 802.1X, RSSI/SNR, utilização de canal, retransmissões e impacto em aplicações.</li>\n  </ul>\n\n\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, você vai estudar arquitetura Wi-Fi corporativa: APs, controladoras e VLANs. O roaming desta aula só funciona bem quando a arquitetura por trás está correta: SSIDs bem desenhados, VLANs consistentes, política de firewall, rede guest, IoT isolado, controladora observável e integração adequada com autenticação.</p>\n\n\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1 - Física",
      "Camada 2 - Enlace",
      "Camada 3 - Continuidade IP quando preservada",
      "Camada 7 - Experiência da aplicação"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IEEE 802.11",
      "802.11k",
      "802.11r",
      "802.11v",
      "802.1X",
      "EAPOL",
      "RADIUS",
      "DHCP",
      "DNS",
      "RTP",
      "TLS"
    ],
    "dependsOn": [
      "RF",
      "RSSI",
      "SNR",
      "SSID",
      "BSSID",
      "associação",
      "WPA Enterprise",
      "VLAN"
    ],
    "enables": [
      "mobilidade corporativa",
      "voz sobre Wi-Fi",
      "experiência de usuário",
      "operação WLAN",
      "troubleshooting wireless",
      "telemetria de roaming"
    ]
  },
  "protocolFields": [
    {
      "field": "Neighbor Report",
      "size": "elemento variável",
      "purpose": "Informar ao cliente BSSIDs vizinhos que podem ser candidatos de roaming.",
      "securityObservation": "Ajuda reduzir scans demorados, mas precisa ser validado com clientes reais e não substitui RF correto."
    },
    {
      "field": "Fast Transition",
      "size": "informações de mobilidade e chaves",
      "purpose": "Acelerar transição de segurança entre APs em ambientes compatíveis.",
      "securityObservation": "Pode melhorar aplicações sensíveis, mas compatibilidade e configuração precisam ser testadas para não quebrar clientes."
    },
    {
      "field": "BSS Transition Management",
      "size": "quadros de gerenciamento",
      "purpose": "Permitir que a rede sugira ao cliente mudar para outro BSSID.",
      "securityObservation": "É sugestão, não garantia; logs ajudam avaliar se o cliente aceitou a recomendação."
    },
    {
      "field": "Roam event",
      "size": "registro de controladora/cloud",
      "purpose": "Registrar origem, destino, motivo, RSSI, tempo e possível falha de roaming.",
      "securityObservation": "É evidência essencial para SOC, RCA e auditoria de experiência wireless."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Monitora qualidade do BSSID atual.",
      "detail": "Observa RSSI, SNR, beacons, taxa, retries, perda e experiência da aplicação.",
      "possibleFailure": "Cliente permanece preso ao AP antigo mesmo com alternativas melhores."
    },
    {
      "step": 2,
      "actor": "AP/controladora",
      "action": "Fornece informações ou sugestões.",
      "detail": "802.11k pode entregar neighbor reports; 802.11v pode sugerir transição; controladora coleta telemetria.",
      "possibleFailure": "Cliente não suporta o recurso ou ignora a recomendação."
    },
    {
      "step": 3,
      "actor": "Cliente",
      "action": "Seleciona BSSID candidato.",
      "detail": "Avalia sinal, canal, banda, recursos, carga e política.",
      "possibleFailure": "Escolhe AP mais forte, mas congestionado ou inadequado para aplicação."
    },
    {
      "step": 4,
      "actor": "Cliente e AP destino",
      "action": "Executam transição de associação e segurança.",
      "detail": "Com 802.11r, parte da autenticação pode ser acelerada; sem isso, pode haver reautenticação mais lenta.",
      "possibleFailure": "Falha de 802.1X, RADIUS lento, certificado inválido ou VLAN inconsistente."
    },
    {
      "step": 5,
      "actor": "Aplicação",
      "action": "Sente ou não sente a interrupção.",
      "detail": "Web pode tolerar; voz e vídeo percebem latência, jitter e perda.",
      "possibleFailure": "Chamada cai, sessão expira ou aplicativo reconecta."
    }
  ],
  "trafficCapture": {
    "tool": "Wireshark ou captura suportada pelo adaptador em ambiente autorizado",
    "filter": "wlan.fc.type_subtype == 0x08 or wlan.fc.type_subtype == 0x00 or wlan.fc.type_subtype == 0x01 or wlan.fc.type_subtype == 0x0b",
    "whatToObserve": [
      "Beacon frames",
      "Authentication frames",
      "Association/Reassociation frames",
      "BSSID origem e destino",
      "elementos relacionados a recursos de roaming quando visíveis"
    ],
    "interpretation": "A captura ajuda a enxergar que roaming é troca de associação em camada 2 antes de qualquer troubleshooting de DNS, HTTP ou aplicação. Nem todo adaptador permite modo monitor. Não capture redes sem autorização."
  },
  "deepDive": {
    "mentalModel": "Roaming bom é uma coreografia: RF cria células usáveis, o cliente decide, a rede informa/sugere, a segurança não atrasa demais, a política mantém coerência, e a aplicação tolera a microinterrupção.",
    "keyTerms": [
      "roaming",
      "sticky client",
      "BSSID",
      "ESS",
      "802.11k",
      "802.11r",
      "802.11v",
      "Fast BSS Transition",
      "BSS Transition Management",
      "roam event",
      "airtime"
    ],
    "limitations": [
      "A rede nem sempre controla a decisão final do cliente.",
      "802.11r/k/v dependem de suporte e compatibilidade.",
      "Mais APs podem piorar se potência e canais forem mal planejados.",
      "Roaming rápido não corrige aplicação frágil, RADIUS lento ou VLAN inconsistente."
    ],
    "whenToUse": [
      "Ambientes com múltiplos APs e usuários móveis.",
      "Voz sobre Wi-Fi, hospitais, varejo, logística, escolas, armazéns e escritórios grandes.",
      "WLAN corporativa com 802.1X e aplicações sensíveis."
    ],
    "whenNotToUse": [
      "Não habilitar recursos avançados globalmente sem piloto em clientes críticos.",
      "Não usar roaming como compensação para RF mal projetado.",
      "Não criar transição insegura apenas para suportar legado sem segmentação."
    ],
    "operationalImpact": [
      "Exige baseline, mapas, coleta de eventos, padronização de drivers e validação por tipo de cliente.",
      "Mudanças de potência/canais podem afetar áreas vizinhas.",
      "Requer integração entre rede, segurança, service desk e donos de aplicação."
    ],
    "financialImpact": [
      "Pode exigir controladora/cloud management, APs compatíveis, licenças, ferramentas de survey e horas de especialista.",
      "Reduzir incidentes de voz e produtividade pode justificar investimento.",
      "Logs e telemetria aumentam custo de armazenamento/observabilidade."
    ],
    "securityImpact": [
      "Roaming mal observado dificulta atribuição de eventos a cliente, AP, usuário e local.",
      "Exceções para legado podem reduzir postura de segurança.",
      "802.1X, logs e segmentação preservam rastreabilidade durante mobilidade."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Instalar mais APs sem survey ou ajuste de potência.",
      "whyItHappens": "Parece intuitivo que mais sinal melhora tudo.",
      "consequence": "Mais interferência, sticky clients e airtime desperdiçado.",
      "correction": "Planejar células, canais, potência e capacidade com medição."
    },
    {
      "mistake": "Achar que barras de sinal indicam experiência real.",
      "whyItHappens": "Sistemas operacionais simplificam qualidade em ícones.",
      "consequence": "Problemas de SNR, retries, carga e roaming são ignorados.",
      "correction": "Coletar BSSID, RSSI, SNR, canal, taxa, perda, jitter e eventos."
    },
    {
      "mistake": "Habilitar 802.11r em todos os SSIDs sem piloto.",
      "whyItHappens": "Roaming rápido parece sempre desejável.",
      "consequence": "Clientes legados ou IoT podem falhar ou se comportar mal.",
      "correction": "Testar por SSID, grupo de dispositivos e janela controlada."
    },
    {
      "mistake": "Diagnosticar queda de voz como problema de internet.",
      "whyItHappens": "Usuário relata que a chamada caiu, não que houve reassociação.",
      "consequence": "Equipe investiga WAN enquanto a causa está no roam local.",
      "correction": "Correlacionar horário da queda com BSSID, roam event, RSSI e RADIUS."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Chamada de voz cai ao caminhar",
      "Notebook fica conectado ao AP distante",
      "Aplicação reconecta entre salas",
      "Latência sobe em corredores",
      "Falhas 802.1X durante deslocamento",
      "Usuários reclamam apesar de sinal forte"
    ],
    "diagnosticQuestions": [
      "Qual BSSID o cliente estava usando antes e depois?",
      "O roam ocorreu ou o cliente ficou preso?",
      "A queda coincide com autenticação RADIUS?",
      "RSSI/SNR eram adequados no ponto de transição?",
      "Há canais congestionados ou APs com potência excessiva?",
      "Todos os clientes sofrem ou apenas modelo/driver específico?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "netsh wlan show interfaces",
        "purpose": "Ver SSID, BSSID, rádio, canal, sinal e perfil atual.",
        "expectedObservation": "BSSID atual, porcentagem de sinal, tipo de rádio e canal.",
        "interpretation": "Execute em pontos diferentes para ver se o BSSID muda ao se mover."
      },
      {
        "platform": "Windows",
        "command": "netsh wlan show networks mode=bssid",
        "purpose": "Listar BSSIDs visíveis por SSID e sinais relativos.",
        "expectedObservation": "Múltiplos BSSIDs para o mesmo SSID quando há vários APs.",
        "interpretation": "Ajuda identificar candidatos de roaming e diferença de sinal."
      },
      {
        "platform": "Linux",
        "command": "nmcli -f IN-USE,SSID,BSSID,CHAN,FREQ,RATE,SIGNAL,SECURITY dev wifi list",
        "purpose": "Listar redes e BSSIDs com canal, frequência e sinal.",
        "expectedObservation": "Lista de BSSIDs candidatos e conexão atual marcada.",
        "interpretation": "Mostra se o cliente tem alternativas melhores próximas."
      },
      {
        "platform": "Linux",
        "command": "iw dev wlan0 link",
        "purpose": "Ver BSSID atual, frequência, sinal e taxa de transmissão.",
        "expectedObservation": "Connected to <BSSID>, signal e tx bitrate.",
        "interpretation": "Útil para correlacionar movimento e troca de AP."
      },
      {
        "platform": "Cisco/Meraki/Controladora",
        "command": "Consultar client timeline / roaming events / RADIUS events",
        "purpose": "Ver eventos de roam, autenticação e falha por cliente.",
        "expectedObservation": "AP origem/destino, horário, RSSI, motivo, sucesso ou falha.",
        "interpretation": "Correlaciona percepção do usuário com evento real da infraestrutura."
      }
    ],
    "decisionTree": [
      {
        "if": "Cliente não troca mesmo perto de AP melhor",
        "then": "Investigar sticky client, potência alta, driver, minimum data rate e 802.11k/v."
      },
      {
        "if": "Troca ocorre, mas chamada cai",
        "then": "Medir tempo de roam, 802.1X/RADIUS, 802.11r, jitter, perda e comportamento da aplicação."
      },
      {
        "if": "Apenas um modelo de dispositivo sofre",
        "then": "Verificar driver, firmware, suporte a 802.11k/r/v e perfil MDM."
      },
      {
        "if": "Todos sofrem em uma área",
        "then": "Investigar RF, canais, interferência, sobreposição, AP sobrecarregado e uplink."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Testar 802.11k/r/v em piloto antes de produção ampla.",
      "Manter logs de roam, RADIUS, DHCP, firewall e aplicação correlacionáveis.",
      "Segmentar dispositivos legados que não suportam recursos modernos.",
      "Documentar exceções de compatibilidade e prazo de substituição.",
      "Validar roaming de dispositivos críticos por modelo e versão de firmware."
    ],
    "badPractices": [
      "Abaixar permanentemente segurança para todos por causa de alguns clientes legados.",
      "Habilitar recursos avançados sem medir antes/depois.",
      "Ignorar logs de RADIUS em quedas de roaming 802.1X.",
      "Confiar apenas em ícone de sinal do sistema operacional."
    ],
    "commonErrors": [
      "Confundir roaming com DHCP.",
      "Confundir BSSID com SSID.",
      "Achar que AP pode sempre forçar cliente a mudar.",
      "Investigar WAN antes de confirmar camada wireless local."
    ],
    "vulnerabilities": [
      {
        "name": "Exceção insegura para legado",
        "description": "Clientes antigos podem levar a rede a manter modos menos seguros ou SSIDs paralelos permissivos.",
        "defensiveExplanation": "A compatibilidade precisa ser tratada por segmentação, prazo e risco aceito, não por redução global de segurança.",
        "mitigation": "Criar SSID/VLAN legado isolado, monitorar uso, limitar acesso e planejar substituição."
      },
      {
        "name": "Baixa rastreabilidade durante mobilidade",
        "description": "Sem logs de roam e autenticação, a investigação não sabe onde o cliente estava nem em qual AP entrou.",
        "defensiveExplanation": "Roaming muda o ponto de associação; o SOC precisa correlacionar identidade, BSSID, IP e tempo.",
        "mitigation": "Enviar logs de controladora/AP, RADIUS, DHCP e firewall para SIEM com horário sincronizado."
      },
      {
        "name": "Superexposição de sinal",
        "description": "Potência excessiva amplia área de alcance além do necessário.",
        "defensiveExplanation": "Mais alcance pode aumentar superfície de observação e dificultar roaming adequado.",
        "mitigation": "Ajustar potência, posicionamento, antenas e célula conforme survey e necessidade real."
      }
    ],
    "monitoring": [
      "Roam time por cliente",
      "Roam failures",
      "Falhas EAP/RADIUS durante mobilidade",
      "RSSI/SNR no ponto de roam",
      "Clientes sticky",
      "Retransmissões e data rates baixos",
      "Eventos por AP e por área"
    ],
    "hardening": [
      "Manter WPA2/WPA3 Enterprise onde aplicável",
      "Validar certificados",
      "Controlar clientes legados",
      "Reduzir SSIDs desnecessários",
      "Sincronizar NTP de APs/controladora/RADIUS",
      "Revisar firmware e drivers críticos"
    ],
    "detectionIdeas": [
      "Alertar aumento de roam failures em área específica",
      "Correlacionar falhas RADIUS com reclamações de voz",
      "Detectar clientes presos em AP distante por muito tempo",
      "Detectar uso excessivo de data rates baixos"
    ]
  },
  "lab": {
    "id": "lab-12.6",
    "title": "Observando roaming, BSSID atual e candidatos de uma WLAN autorizada",
    "labType": "security",
    "objective": "Coletar evidências locais sobre BSSID atual, BSSIDs candidatos, sinal, canal e possível troca de AP ao se mover em uma rede autorizada.",
    "scenario": "Você é analista de rede/segurança e precisa transformar a reclamação 'o Wi-Fi cai quando caminho' em evidências: BSSID, sinal, canal, banda, horário, sintomas e hipótese.",
    "topology": "Cliente Windows/Linux -> AP A/BSSID origem -> área de sobreposição -> AP B/BSSID destino -> gateway/DHCP/DNS",
    "architecture": "Laboratório local, passivo e defensivo. Usa comandos do sistema operacional e, opcionalmente, Wireshark apenas em ambiente autorizado. Não altera configuração da rede.",
    "prerequisites": [
      "Ter acesso autorizado a uma rede Wi-Fi própria, doméstica, laboratório ou ambiente corporativo com permissão.",
      "Idealmente ter dois APs/mesh com mesmo SSID; se houver apenas um AP, realizar a parte de inventário e análise conceitual.",
      "Não executar ataques, deauth, spoofing, captura de credenciais ou interferência."
    ],
    "tools": [
      "Windows PowerShell ou Prompt",
      "Linux com NetworkManager/iw",
      "opcional: Wireshark com adaptador compatível",
      "planilha ou editor de texto para registrar evidências"
    ],
    "estimatedTimeMinutes": 75,
    "cost": "zero",
    "safetyNotes": [
      "Não teste redes de terceiros.",
      "Não publique BSSID, SSID corporativo, usuário ou localização sem mascarar.",
      "Não use comandos para revelar senha Wi-Fi.",
      "Não force roaming com ataques ou interferência.",
      "Em ambiente corporativo, execute apenas com autorização formal."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Registrar ponto inicial",
        "instruction": "Escolha um ponto próximo ao AP ou onde a conexão costuma funcionar bem. Registre horário, local e aplicação afetada.",
        "command": "echo Registrar horario, local, SSID e sintoma observado",
        "expectedOutput": "Anotação manual com contexto do teste.",
        "explanation": "Sem contexto temporal e físico, logs de roaming perdem valor investigativo."
      },
      {
        "number": 2,
        "title": "Coletar BSSID atual no Windows",
        "instruction": "No Windows, colete SSID, BSSID, canal, rádio e sinal.",
        "command": "netsh wlan show interfaces",
        "expectedOutput": "Campos como SSID, BSSID, Radio type, Channel e Signal.",
        "explanation": "O BSSID identifica qual AP/radio atende o cliente neste momento."
      },
      {
        "number": 3,
        "title": "Listar BSSIDs candidatos no Windows",
        "instruction": "Liste as redes visíveis agrupadas por SSID e BSSID.",
        "command": "netsh wlan show networks mode=bssid",
        "expectedOutput": "Um ou mais BSSIDs para o SSID autorizado, com sinal relativo.",
        "explanation": "Múltiplos BSSIDs no mesmo SSID indicam múltiplos APs/radios candidatos."
      },
      {
        "number": 4,
        "title": "Coletar BSSID atual no Linux",
        "instruction": "No Linux, identifique a conexão atual. Ajuste o nome da interface se não for wlan0.",
        "command": "iw dev wlan0 link",
        "expectedOutput": "Connected to <BSSID>, freq, signal, tx bitrate.",
        "explanation": "Mostra AP atual, frequência e qualidade percebida pelo cliente."
      },
      {
        "number": 5,
        "title": "Listar candidatos no Linux",
        "instruction": "Use NetworkManager para listar BSSIDs, canal, frequência e sinal.",
        "command": "nmcli -f IN-USE,SSID,BSSID,CHAN,FREQ,RATE,SIGNAL,SECURITY dev wifi list",
        "expectedOutput": "Lista de BSSIDs visíveis e conexão atual marcada com asterisco.",
        "explanation": "Permite comparar AP atual com alternativas próximas."
      },
      {
        "number": 6,
        "title": "Mover para ponto intermediário",
        "instruction": "Caminhe lentamente para uma área entre APs ou onde a reclamação ocorre. Repita a coleta a cada 15 a 30 segundos.",
        "command": "netsh wlan show interfaces  # Windows\niw dev wlan0 link          # Linux",
        "expectedOutput": "Mudança ou permanência do BSSID, variação de sinal e taxa.",
        "explanation": "Se o BSSID permanece o mesmo apesar de alternativa melhor, pode haver sticky client ou célula grande demais."
      },
      {
        "number": 7,
        "title": "Testar experiência com tráfego simples",
        "instruction": "Durante o deslocamento, execute ping para gateway ou destino interno permitido. Não use teste agressivo.",
        "command": "ping <gateway>\nping -n 30 <gateway>  # Windows",
        "expectedOutput": "Latência estável e baixa perda; possíveis picos no momento da troca.",
        "explanation": "Ajuda correlacionar roam com perda/latência, mas não substitui logs da controladora."
      },
      {
        "number": 8,
        "title": "Correlacionar com autenticação e IP",
        "instruction": "Após possível troca, confirme se IP, gateway e DNS permaneceram coerentes.",
        "command": "ipconfig /all  # Windows\nip addr && ip route && resolvectl status  # Linux com systemd-resolved",
        "expectedOutput": "IP/gateway/DNS compatíveis com a rede esperada.",
        "explanation": "Se o roam muda VLAN, IP ou política, a aplicação pode sofrer mesmo que RF esteja bom."
      },
      {
        "number": 9,
        "title": "Documentar hipótese",
        "instruction": "Monte uma tabela com ponto, horário, BSSID, sinal, canal, sintoma e hipótese.",
        "command": "Ponto | Hora | BSSID | Canal | Sinal | Sintoma | Hipótese",
        "expectedOutput": "Tabela de evidências.",
        "explanation": "Troubleshooting profissional transforma percepção em dados comparáveis."
      },
      {
        "number": 10,
        "title": "Planejar validação com controladora",
        "instruction": "Se houver controladora/cloud, liste quais eventos pedir ao time responsável.",
        "command": "Solicitar client timeline, roaming events, RADIUS events, RSSI/SNR, retries e AP origem/destino",
        "expectedOutput": "Checklist de logs necessários.",
        "explanation": "O cliente mostra parte da história; a infraestrutura confirma eventos, motivos e falhas."
      }
    ],
    "expectedResult": "O aluno deve conseguir identificar BSSID atual, BSSIDs candidatos, variação de sinal/canal, possível troca de AP e hipótese fundamentada para roaming ruim.",
    "validation": [
      {
        "check": "BSSID atual identificado",
        "command": "netsh wlan show interfaces ou iw dev wlan0 link",
        "expected": "Um endereço BSSID associado ao SSID atual.",
        "ifFails": "Verifique se está conectado ao Wi-Fi e se a interface correta foi usada."
      },
      {
        "check": "BSSIDs candidatos listados",
        "command": "netsh wlan show networks mode=bssid ou nmcli dev wifi list",
        "expected": "Lista de APs/radios visíveis para o SSID autorizado.",
        "ifFails": "Pode haver apenas um AP ou driver sem permissão de varredura; registre a limitação."
      },
      {
        "check": "Movimento documentado",
        "command": "Tabela de evidências preenchida",
        "expected": "Pelo menos três pontos de coleta com horário e BSSID.",
        "ifFails": "Repita o teste com deslocamento mais lento e anotações padronizadas."
      },
      {
        "check": "Hipótese técnica criada",
        "command": "Revisar tabela e sintomas",
        "expected": "Hipótese separando RF, sticky client, autenticação, DHCP ou aplicação.",
        "ifFails": "Volte às perguntas diagnósticas da aula e colete evidência adicional."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O comando não mostra BSSID",
        "probableCause": "Permissão, driver, interface errada ou sistema ocultando detalhes.",
        "howToConfirm": "Verificar interface Wi-Fi ativa e comandos alternativos.",
        "fix": "Usar terminal administrativo, confirmar nome da interface ou usar ferramenta da controladora."
      },
      {
        "symptom": "Há apenas um BSSID visível",
        "probableCause": "A rede tem um AP só ou os outros APs estão fora de alcance.",
        "howToConfirm": "Executar varredura em outro ponto ou consultar desenho da WLAN.",
        "fix": "Fazer a parte conceitual do lab e documentar limitação."
      },
      {
        "symptom": "Cliente não troca de AP",
        "probableCause": "Sticky client, potência alta, driver, ausência de 802.11k/v ou algoritmo conservador.",
        "howToConfirm": "Comparar BSSID atual com candidatos e sinais em diferentes pontos.",
        "fix": "Planejar ajuste de potência/célula e validar recursos de roaming em piloto."
      },
      {
        "symptom": "Troca ocorre mas há queda perceptível",
        "probableCause": "Reautenticação lenta, falha RADIUS, DHCP/ARP, mudança de VLAN ou aplicação sensível.",
        "howToConfirm": "Correlacionar ping, logs RADIUS, client timeline e horário da queda.",
        "fix": "Testar 802.11r, otimizar RADIUS, manter política coerente e validar aplicação."
      }
    ],
    "improvements": [
      "Repetir o teste com outro modelo de cliente.",
      "Comparar 2.4 GHz, 5 GHz e 6 GHz quando disponíveis.",
      "Coletar logs da controladora/cloud para o mesmo horário.",
      "Criar mapa simples de pontos de coleta e BSSIDs.",
      "Executar teste antes/depois de ajuste de potência em ambiente controlado."
    ],
    "evidenceToCollect": [
      "Print ou texto do BSSID atual",
      "Lista de BSSIDs candidatos",
      "Tabela de ponto/horário/sinal/canal/sintoma",
      "Resultado de ping durante deslocamento",
      "Logs de roaming/RADIUS se disponíveis",
      "Hipótese e recomendação final"
    ],
    "questions": [
      "O cliente troca para o AP mais próximo ou permanece no antigo?",
      "O problema aparece em todos os dispositivos ou apenas em um modelo?",
      "A queda coincide com troca de BSSID ou com reautenticação?",
      "O IP/gateway muda após o roam?",
      "Há evidência suficiente para propor mudança de potência/canal/802.11k/r/v?"
    ],
    "challenge": "Monte um relatório de até uma página explicando a causa mais provável de roaming ruim em seu ambiente de teste e proponha três ações de melhoria com risco, impacto e validação.",
    "solution": "Uma boa solução não afirma causa sem evidência. Ela mostra BSSID atual e candidatos, pontos de coleta, sintomas, hipótese principal, hipóteses descartadas e próximos testes. Exemplo: se o cliente permanece em AP distante com sinal inferior enquanto há BSSID melhor, a hipótese é sticky client/célula grande. Ações: reduzir potência do AP antigo em piloto, revisar minimum data rates, habilitar/testar 802.11k/v, medir roam events e comparar antes/depois."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que colocar mais APs pode piorar roaming em vez de melhorar?",
      "hints": [
        "Pense em potência, canal, airtime e sticky client.",
        "Mais cobertura não significa melhor célula."
      ],
      "expectedIdeas": [
        "sobreposição excessiva",
        "interferência",
        "potência alta",
        "decisão do cliente",
        "airtime"
      ],
      "explanation": "O aluno deve mostrar que roaming depende de desenho de células e não apenas quantidade de APs."
    },
    {
      "type": "diagnóstico",
      "question": "Um usuário caminha durante uma chamada e há corte de três segundos. O que você verificaria antes de culpar a internet?",
      "hints": [
        "Pense em BSSID origem/destino.",
        "Pense em 802.1X/RADIUS e logs de roam."
      ],
      "expectedIdeas": [
        "BSSID",
        "roam event",
        "RSSI/SNR",
        "RADIUS",
        "perda/jitter",
        "cliente específico"
      ],
      "explanation": "Primeiro correlacione o sintoma com evento wireless local; WAN vem depois."
    },
    {
      "type": "cenário real",
      "question": "Você habilitaria 802.11r em todos os SSIDs corporativos de uma vez? Por quê?",
      "hints": [
        "Pense em compatibilidade.",
        "Pense em dispositivos críticos e legado."
      ],
      "expectedIdeas": [
        "piloto",
        "inventário de clientes",
        "rollback",
        "medição antes/depois",
        "riscos de compatibilidade"
      ],
      "explanation": "A resposta madura usa mudança controlada, não habilitação global cega."
    }
  ],
  "quiz": [
    {
      "id": "q12.6.1",
      "type": "conceito",
      "q": "O que é roaming Wi-Fi em uma WLAN corporativa?",
      "opts": [
        "Troca de associação de um cliente entre BSSIDs, geralmente mantendo o mesmo SSID.",
        "Mudança de senha WPA do roteador.",
        "Acesso à internet por rede celular quando o Wi-Fi falha.",
        "Troca automática de DNS durante navegação."
      ],
      "a": 0,
      "exp": "Roaming é transição entre BSSIDs/APs dentro de uma WLAN/ESS, buscando continuidade de conexão.",
      "difficulty": "iniciante",
      "topic": "roaming"
    },
    {
      "id": "q12.6.2",
      "type": "diagnóstico",
      "q": "Um cliente permanece conectado ao AP distante mesmo perto de outro AP melhor. Qual termo descreve esse comportamento?",
      "opts": [
        "Sticky client",
        "NAT hairpin",
        "DNS split-horizon",
        "ARP cache poisoning"
      ],
      "a": 0,
      "exp": "Sticky client é o cliente que permanece preso ao AP anterior apesar de alternativa melhor.",
      "difficulty": "iniciante",
      "topic": "sticky client"
    },
    {
      "id": "q12.6.3",
      "type": "comparação",
      "q": "Qual associação está correta?",
      "opts": [
        "802.11k: relatórios de vizinhos; 802.11r: transição rápida; 802.11v: sugestão/gerenciamento de transição.",
        "802.11k: criptografia; 802.11r: DHCP; 802.11v: DNS.",
        "802.11k: NAT; 802.11r: VLAN; 802.11v: BGP.",
        "802.11k: cabo; 802.11r: fibra; 802.11v: rádio AM."
      ],
      "a": 0,
      "exp": "Essa é a relação prática para roaming: k informa, r acelera segurança, v ajuda a rede sugerir transições.",
      "difficulty": "intermediário",
      "topic": "802.11k/r/v"
    },
    {
      "id": "q12.6.4",
      "type": "segurança",
      "q": "Por que logs de roaming e RADIUS são importantes para segurança?",
      "opts": [
        "Ajudam correlacionar usuário, dispositivo, AP/BSSID, IP, horário e falhas de autenticação.",
        "Substituem firewall de borda.",
        "Permitem remover certificados de todos os clientes.",
        "Aumentam potência de rádio automaticamente."
      ],
      "a": 0,
      "exp": "Rastreabilidade durante mobilidade depende de logs correlacionados de wireless, identidade e rede.",
      "difficulty": "intermediário",
      "topic": "logs"
    },
    {
      "id": "q12.6.5",
      "type": "cenário",
      "q": "Após habilitar 802.11r, alguns coletores antigos falham ao conectar. Qual resposta é mais profissional?",
      "opts": [
        "Reverter/testar em piloto, segmentar legado e validar compatibilidade por modelo.",
        "Desligar segurança de todos os SSIDs permanentemente.",
        "Adicionar NAT Gateway.",
        "Trocar DNS público."
      ],
      "a": 0,
      "exp": "Mudanças de roaming exigem piloto, compatibilidade e rollback; não se reduz segurança global por legado sem controle.",
      "difficulty": "intermediário",
      "topic": "mudança"
    },
    {
      "id": "q12.6.6",
      "type": "troubleshooting",
      "q": "Qual evidência local ajuda a confirmar se o cliente trocou de AP durante deslocamento?",
      "opts": [
        "Mudança de BSSID observado em comandos como netsh wlan show interfaces ou iw dev wlan0 link.",
        "Apenas o nome do navegador usado.",
        "Quantidade de abas abertas.",
        "Modelo do monitor externo."
      ],
      "a": 0,
      "exp": "O BSSID identifica o AP/radio atual; comparar antes/depois confirma roam ou sticky client.",
      "difficulty": "iniciante",
      "topic": "comandos"
    }
  ],
  "flashcards": [
    {
      "id": "fc12.6.1",
      "front": "O que é roaming Wi-Fi?",
      "back": "É a troca de associação de um cliente entre BSSIDs/APs, normalmente mantendo o mesmo SSID, para preservar conectividade durante mobilidade.",
      "tags": [
        "roaming"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.6.2",
      "front": "O que é sticky client?",
      "back": "É o cliente que permanece conectado a um AP distante ou ruim mesmo havendo alternativa melhor próxima.",
      "tags": [
        "sticky-client"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc12.6.3",
      "front": "Para que serve 802.11k?",
      "back": "Ajuda o cliente com informações de vizinhança e medições para reduzir busca por APs candidatos.",
      "tags": [
        "802.11k"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.6.4",
      "front": "Para que serve 802.11r?",
      "back": "Acelera a transição de segurança entre APs, especialmente útil em redes Enterprise e aplicações sensíveis.",
      "tags": [
        "802.11r"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.6.5",
      "front": "Para que serve 802.11v?",
      "back": "Permite recursos de gerenciamento, incluindo sugestões de transição de BSS para melhorar decisão de roaming.",
      "tags": [
        "802.11v"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc12.6.6",
      "front": "Por que sinal forte pode ser ruim para roaming?",
      "back": "Potência alta demais pode manter clientes presos ao AP antigo, aumentar interferência e desperdiçar airtime.",
      "tags": [
        "rf",
        "potência"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex12.6.1",
      "type": "conceitual",
      "prompt": "Explique por que o roaming é majoritariamente decisão do cliente e por que isso dificulta troubleshooting.",
      "expectedAnswer": "O cliente monitora qualidade, escolhe quando procurar alternativas e decide aceitar ou não sugestões. Isso dificulta porque AP/controladora podem ajudar, mas comportamento varia por driver, sistema operacional e fabricante.",
      "explanation": "A infraestrutura influencia, mas não controla totalmente a estação."
    },
    {
      "id": "ex12.6.2",
      "type": "diagnóstico",
      "prompt": "Um notebook mostra sinal alto, mas chamada de voz falha ao andar. Liste cinco evidências que você coletaria.",
      "expectedAnswer": "BSSID antes/depois, RSSI/SNR, canal/banda, roam events, logs RADIUS, perda/jitter, modelo/driver, IP/gateway após roam.",
      "explanation": "Sinal alto isolado não explica experiência; é preciso correlacionar camadas."
    },
    {
      "id": "ex12.6.3",
      "type": "arquitetura",
      "prompt": "Dê duas razões para não habilitar 802.11r em produção sem piloto.",
      "expectedAnswer": "Compatibilidade de clientes legados/IoT e impacto em autenticação/segurança. É necessário testar modelos críticos e ter rollback.",
      "explanation": "Recursos modernos podem melhorar roaming, mas mudanças globais podem quebrar clientes."
    },
    {
      "id": "ex12.6.4",
      "type": "segurança",
      "prompt": "Por que logs de AP/controladora sozinhos podem ser insuficientes em um incidente wireless?",
      "expectedAnswer": "Porque é preciso correlacionar também identidade/RADIUS, IP/DHCP, política/firewall e horário para saber usuário, dispositivo, AP, endereço e acesso realizado.",
      "explanation": "Investigação exige cadeia de evidências, não um único log."
    }
  ],
  "challenge": {
    "title": "Plano de correção para roaming ruim em escritório corporativo",
    "scenario": "Uma empresa tem dois andares, seis APs, SSID corporativo WPA2-Enterprise, chamadas de voz caindo em corredores e reclamações de notebooks presos em APs distantes. O time de suporte só verifica 'sinal' e não consegue resolver.",
    "tasks": [
      "Criar plano de coleta de evidências.",
      "Separar hipóteses de RF, sticky client, 802.1X/RADIUS, DHCP e aplicação.",
      "Propor teste piloto de ajustes sem impactar toda a empresa.",
      "Indicar métricas antes/depois.",
      "Definir comunicação para usuários e janela de mudança."
    ],
    "constraints": [
      "Não adicionar APs antes de validar RF.",
      "Não reduzir segurança global.",
      "Não executar ataques ou interferência.",
      "Manter funcionamento do SSID corporativo.",
      "Considerar clientes legados."
    ],
    "expectedDeliverables": [
      "Tabela de evidências",
      "Mapa lógico de APs e áreas afetadas",
      "Lista de hipóteses priorizadas",
      "Plano piloto",
      "Critérios de sucesso",
      "Plano de rollback"
    ],
    "gradingRubric": [
      {
        "criterion": "Método de diagnóstico",
        "points": 30,
        "description": "Coleta BSSID, RSSI/SNR, eventos de roam, RADIUS, perda e aplicação antes de mudar configuração."
      },
      {
        "criterion": "Segurança",
        "points": 20,
        "description": "Não reduz WPA/802.1X globalmente e trata legado com segmentação."
      },
      {
        "criterion": "Arquitetura RF",
        "points": 20,
        "description": "Considera potência, canais, sobreposição, sticky clients e airtime."
      },
      {
        "criterion": "Validação operacional",
        "points": 20,
        "description": "Define piloto, métricas, comparação antes/depois e rollback."
      },
      {
        "criterion": "Comunicação",
        "points": 10,
        "description": "Explica impacto, janela, responsáveis e evidências para gestão."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O erro comum é começar instalando AP ou culpando internet. A solução profissional parte de evidência: onde ocorre, em quais clientes, com qual BSSID, em que horário, com qual RSSI/SNR, com quais eventos de roam e autenticação.",
    "steps": [
      "Listar áreas e horários com reclamação.",
      "Coletar BSSID atual e candidatos em pontos afetados.",
      "Correlacionar quedas com roam events e RADIUS.",
      "Separar clientes por modelo/driver e SSID.",
      "Verificar potência, canais e sobreposição.",
      "Testar 802.11k/v/r em piloto com clientes compatíveis.",
      "Ajustar potência/canais/minimum data rates de forma controlada.",
      "Medir antes/depois: perda, jitter, roam time, falhas e tickets.",
      "Documentar exceções de legado e plano de substituição."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Adicionar mais APs imediatamente.",
        "whyItIsWrong": "Pode aumentar interferência e sticky clients se o problema for célula/potência/canal."
      },
      {
        "answer": "Desligar 802.1X para roaming ficar rápido.",
        "whyItIsWrong": "Reduz segurança e rastreabilidade; a resposta correta é otimizar autenticação e compatibilidade."
      },
      {
        "answer": "Culpar a internet sem medir BSSID e roam events.",
        "whyItIsWrong": "A queda pode estar na camada wireless local, antes de WAN ou aplicação."
      }
    ],
    "finalAnswer": "Um plano maduro começa com baseline e evidência, executa piloto controlado, valida impacto em clientes críticos, preserva segurança, mede antes/depois e só então expande ajustes. A causa provável pode ser sticky client, potência alta, sobreposição ruim, roaming lento com 802.1X ou incompatibilidade de cliente — a evidência define a prioridade."
  },
  "glossary": [
    {
      "term": "Roaming Wi-Fi",
      "shortDefinition": "Troca de associação de um cliente entre BSSIDs/APs.",
      "longDefinition": "Processo em que uma estação wireless deixa um AP e passa a usar outro, buscando manter conectividade e experiência durante mobilidade.",
      "example": "Um notebook sai da sala de reunião e passa do AP A para o AP B mantendo o mesmo SSID.",
      "relatedTerms": [
        "BSSID",
        "ESS",
        "802.11k",
        "802.11r",
        "802.11v"
      ],
      "relatedLessons": [
        "12.4",
        "12.5",
        "12.6"
      ]
    },
    {
      "term": "Sticky client",
      "shortDefinition": "Cliente preso a um AP ruim ou distante.",
      "longDefinition": "Comportamento em que a estação continua associada ao BSSID antigo apesar de haver AP melhor disponível.",
      "example": "Celular permanece no AP da sala mesmo estando ao lado do AP do quarto.",
      "relatedTerms": [
        "roaming",
        "RSSI",
        "SNR",
        "potência"
      ],
      "relatedLessons": [
        "12.2",
        "12.6"
      ]
    },
    {
      "term": "802.11k",
      "shortDefinition": "Recurso de medições e vizinhança para roaming.",
      "longDefinition": "Mecanismos que ajudam clientes a obter informações de rádio e APs vizinhos para tomar decisões de roaming com menos varredura.",
      "example": "Cliente recebe lista de APs candidatos em vez de procurar todos os canais cegamente.",
      "relatedTerms": [
        "neighbor report",
        "roaming"
      ],
      "relatedLessons": [
        "12.6"
      ]
    },
    {
      "term": "802.11r",
      "shortDefinition": "Fast BSS Transition.",
      "longDefinition": "Mecanismo para acelerar a transição de segurança entre APs, reduzindo tempo de roaming quando há suporte e configuração adequada.",
      "example": "Telefone de voz sobre Wi-Fi troca de AP com menor interrupção em rede Enterprise compatível.",
      "relatedTerms": [
        "Fast Transition",
        "802.1X",
        "RADIUS"
      ],
      "relatedLessons": [
        "12.5",
        "12.6"
      ]
    },
    {
      "term": "802.11v",
      "shortDefinition": "Gerenciamento de rede e sugestão de transição de BSS.",
      "longDefinition": "Conjunto de recursos que permite à rede fornecer informações e recomendações ao cliente, incluindo sugestões para migrar para outro BSSID.",
      "example": "Controladora recomenda que o cliente vá para AP menos carregado.",
      "relatedTerms": [
        "BSS Transition Management",
        "steering"
      ],
      "relatedLessons": [
        "12.6"
      ]
    },
    {
      "term": "Roam event",
      "shortDefinition": "Registro de uma troca de AP/BSSID.",
      "longDefinition": "Evento registrado por AP/controladora/cloud com origem, destino, horário, motivo e qualidade associada ao roaming.",
      "example": "Timeline mostra cliente saindo do AP A para AP B às 10:42 com RSSI -68 dBm.",
      "relatedTerms": [
        "telemetria",
        "SIEM",
        "RADIUS"
      ],
      "relatedLessons": [
        "12.6",
        "15.11"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "802.11k and 802.11r Overview",
      "organization": "Cisco Meraki",
      "url": "https://documentation.meraki.com/Wireless/Design_and_Configure/Architecture_and_Best_Practices/802.11k_and_802.11r_Overview",
      "note": "Usado para validar a explicação de 802.11k/802.11r e impacto em aplicações sensíveis como voz."
    },
    {
      "type": "official-doc",
      "title": "Understand 802.11r/11k/11v Fast Roams on 9800 WLCs",
      "organization": "Cisco",
      "url": "https://www.cisco.com/c/en/us/support/docs/wireless/catalyst-9800-series-wireless-controllers/221671-understand-802-11r-11k-11v-fast-roams-on.html",
      "note": "Usado para validar diferenças práticas entre métodos de roaming rápido."
    },
    {
      "type": "official-doc",
      "title": "Wi-Fi Alliance Agile Multiband",
      "organization": "Cisco Catalyst 9800 documentation",
      "url": "https://www.cisco.com/c/en/us/td/docs/wireless/controller/9800/17-10/config-guide/b_wl_17_10_cg/m_mbo.html",
      "note": "Usado para validar relação entre Agile Multiband, 802.11k, 802.11v e experiência de roaming."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network v2.0 - Módulo 12.5",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Aula anterior sobre WPA2, WPA3, PSK, Enterprise e 802.1X."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.2",
      "reason": "RF, RSSI, SNR, canais e potência são pré-requisitos para entender roaming."
    },
    {
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "Roaming em redes Enterprise depende de WPA/802.1X/RADIUS e certificados."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs e métricas",
      "reason": "Roaming profissional exige telemetria, baseline, eventos e validação antes/depois."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "autenticação corporativa",
      "lesson": "certificados e identidade",
      "reason": "802.1X/RADIUS durante roaming depende de identidade e certificados bem operados."
    }
  ],
  "pedagogicalMap": {
    "problem": "Mobilidade Wi-Fi falha quando cliente, RF, autenticação e política não transicionam bem entre APs.",
    "concept": "Roaming é troca de BSSID/AP dentro de um SSID/ESS para preservar conectividade.",
    "internalMechanism": "Cliente monitora qualidade, escolhe candidato, reassocia e executa transição de segurança; 802.11k/r/v ajudam o processo.",
    "realUse": "Voz, vídeo, hospitais, armazéns, escolas, escritórios e dispositivos móveis críticos.",
    "commonMistake": "Colocar mais APs sem planejar potência, canais, sobreposição e compatibilidade.",
    "securityImpact": "Logs de roaming e autenticação são essenciais para rastreabilidade e incidentes.",
    "operationalImpact": "Exige baseline, piloto, validação por cliente e integração entre rede, segurança e aplicação.",
    "summary": "Roaming bom é experiência, não apenas cobertura."
  },
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
      "12.7"
    ]
  }
};
