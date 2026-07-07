export const lesson1511 = {
  "id": "15.11",
  "moduleId": "m15",
  "order": 11,
  "title": "Wireshark, tcpdump e análise de pacotes",
  "subtitle": "Como capturar, filtrar, interpretar e preservar pacotes para transformar sintomas de rede em evidências técnicas confiáveis — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "240-320 min",
  "estimatedStudyTimeMinutes": 320,
  "difficulty": "avançado",
  "type": "fundamental",
  "xp": 320,
  "tags": [
    "troubleshooting",
    "Wireshark",
    "tcpdump",
    "tshark",
    "PCAP",
    "BPF",
    "capture filter",
    "display filter",
    "TCP",
    "UDP",
    "DNS",
    "TLS",
    "HTTP",
    "Kubernetes",
    "cloud",
    "forense",
    "evidência",
    "segurança",
    "caso real",
    "hipótese-evidência",
    "runbook",
    "war room",
    "RCA"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "OSI e TCP/IP",
      "reason": "Análise de pacotes exige leitura por camadas."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Coleta de evidências, baseline e linha do tempo orientam a captura."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.6",
      "reason": "TCP, UDP, portas e serviços são sinais centrais em PCAP."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.8",
      "reason": "HTTP, HTTPS, TLS e proxies aparecem frequentemente em análise com Wireshark."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.10",
      "reason": "Troubleshooting cloud exige correlacionar PCAP com flow logs e configuração efetiva."
    }
  ],
  "objectives": [
    "Explicar quando usar captura de pacotes e quando logs/métricas são suficientes.",
    "Diferenciar filtros de captura e filtros de exibição.",
    "Escolher pontos de captura adequados em cliente, servidor, firewall, load balancer, container e cloud.",
    "Interpretar sinais de DNS, ARP, ICMP, TCP, UDP, TLS e HTTP em PCAP.",
    "Preservar capturas como evidência sensível com escopo, hash, autorização e retenção.",
    "Transformar observações de pacotes em hipóteses, mitigação segura, rollback e RCA.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um timeout TCP, o aluno identifica SYN sem SYN-ACK, retransmissões e próximos pontos de captura.",
    "Dado um erro TLS, o aluno diferencia falha de certificado, SNI, versão TLS, cipher e alerta do servidor.",
    "Dado um problema DNS, o aluno verifica consulta, resposta, TTL, NXDOMAIN, SERVFAIL e resolvedor usado.",
    "Dado um PCAP com RST, o aluno evita concluir firewall automaticamente e valida origem do reset.",
    "Dado um ambiente cloud/Kubernetes, o aluno escolhe onde capturar e quando usar flow logs em vez de PCAP.",
    "Dado um incidente, o aluno entrega dossiê com ponto de captura, filtro, evidência, interpretação e risco de dados.",
    "Dado o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Wireshark, tcpdump e análise de pacotes existem porque, em algum momento, logs, métricas e dashboards não bastam. O log pode dizer que houve timeout, o firewall pode dizer que permitiu, o load balancer pode dizer que o target está unhealthy, mas o pacote mostra o que realmente atravessou a interface: houve SYN? Houve SYN-ACK? Houve retransmissão? O servidor respondeu com RST? O cliente enviou SNI correto? O DNS retornou o IP esperado?</p>\n  <p>A motivação desta aula é ensinar o aluno a usar captura de pacotes como evidência técnica, não como curiosidade. Em um ambiente profissional, uma captura mal feita pode gerar falso diagnóstico, expor dados sensíveis, violar privacidade ou desperdiçar horas. Uma captura bem feita reduz achismo e transforma o troubleshooting em investigação verificável.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> dois times discutem: aplicação diz que a rede bloqueia; rede diz que liberou; segurança diz que o firewall permitiu; cloud diz que o flow log está ACCEPT. A captura mostra que o servidor responde com RST porque o serviço não está escutando na porta esperada. Uma evidência encerra a discussão.</div>\n  <p>Para Segurança da Informação, PCAP pode revelar credenciais, tokens, cookies, metadados, domínios consultados e padrões de tráfego. Para DevSecOps, capturas controladas ajudam a validar health checks, TLS, DNS, proxies, service mesh e mudanças de rede. Para operação, Wireshark e tcpdump são ferramentas de precisão quando usadas com escopo, autorização e método.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>A análise de pacotes acompanha a história das redes. Quando os primeiros ambientes TCP/IP começaram a crescer, administradores precisavam enxergar datagramas e segmentos para entender perdas, retransmissões, ARP, rotas e protocolos. Ferramentas em linha de comando como tcpdump se tornaram essenciais em sistemas Unix porque permitiam capturar e filtrar tráfego diretamente da interface.</p>\n  <p>Com o tempo, analisadores gráficos como Wireshark popularizaram a inspeção de protocolos, reconstrução de fluxos e leitura visual de campos. O que antes exigia interpretar bytes manualmente passou a ser apresentado em camadas: Ethernet, IP, TCP, TLS, HTTP, DNS e muitos outros protocolos.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Era do cabo:</strong> analisadores e taps físicos eram usados para observar tráfego no fio.</div><div class=\"timeline-item\"><strong>Unix e tcpdump:</strong> captura em CLI com filtros BPF tornou troubleshooting remoto mais prático.</div><div class=\"timeline-item\"><strong>Wireshark:</strong> análise visual e decodificação de protocolos tornaram PCAP acessível para times maiores.</div><div class=\"timeline-item\"><strong>Datacenter virtual:</strong> capturar no host, VM, container, firewall e load balancer passou a exigir escolha cuidadosa do ponto.</div><div class=\"timeline-item\"><strong>Cloud e Kubernetes:</strong> flow logs, service mesh, CNI e overlays aumentaram a importância de correlacionar PCAP com telemetria.</div></div>\n  <p>A evolução principal foi sair de “ver tudo” para “capturar o necessário”. Em redes modernas, capturar tráfego sem filtro pode gerar volume enorme, risco de exposição e ruído. O profissional maduro define hipótese, ponto de captura, janela de tempo e filtro antes de iniciar.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema desta aula é aprender a responder: “o que aconteceu no fio ou na interface?” sem confundir observação com conclusão. Capturas de pacotes são poderosas, mas perigosas quando interpretadas sem contexto.</p>\n  <p>Erros comuns em análise de pacotes incluem:</p>\n  <ul>\n    <li><strong>Capturar no ponto errado:</strong> observar o cliente e concluir sobre o servidor sem capturar o outro lado;</li>\n    <li><strong>Confundir filtro de captura e filtro de exibição:</strong> perder pacotes porque o filtro foi aplicado antes da captura;</li>\n    <li><strong>Ignorar NAT e proxies:</strong> procurar IP original depois que ele foi traduzido ou encapsulado;</li>\n    <li><strong>Interpretar ausência como bloqueio:</strong> não ver resposta pode significar perda, rota, firewall, serviço fora, assimetria ou captura incorreta;</li>\n    <li><strong>Ignorar TLS:</strong> esperar ver conteúdo HTTP em tráfego criptografado;</li>\n    <li><strong>Expor dados sensíveis:</strong> compartilhar PCAP com tokens, cookies, IPs internos ou payloads sem sanitização;</li>\n    <li><strong>Não correlacionar horário:</strong> analisar captura fora da janela do incidente;</li>\n    <li><strong>Ver pacote e pular para solução:</strong> a captura mostra sinal, mas a causa raiz exige correlação com configuração, logs e mudanças.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha:</strong> um PCAP raramente “fala sozinho”. Ele precisa ser lido junto com topologia, rota, firewall, NAT, DNS, logs da aplicação, horário, mudanças recentes e ponto de captura.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado</h3>\n  <p><strong>Sintoma observado:</strong> Aplicação carrega cabeçalho, mas trava em respostas maiores; Wireshark mostra retransmissions e duplicate ACKs.</p>\n  <p><strong>Impacto operacional:</strong> Sem interpretação correta, a equipe culpa aplicação e aumenta timeout em vez de corrigir caminho/MTU.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente → ponto de captura A → túnel/firewall → ponto de captura B → servidor → resposta grande</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>10:00: túnel alterado</li><li>10:05: downloads grandes falham</li><li>10:10: health check pequeno OK</li><li>10:30: retransmissões observadas</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>MSS/MTU</td><td>Payload grande falha, pequeno OK</td><td>tcpdump + ping DF/tracepath</td><td>Alta</td></tr><tr><td>Perda no caminho</td><td>Retransmissions em um ponto, não em outro</td><td>captura dupla</td><td>Alta</td></tr><tr><td>RST de intermediário</td><td>Conexão encerrada abruptamente</td><td>flags TCP/log firewall</td><td>Média</td></tr><tr><td>Ponto de captura errado</td><td>Não vê tráfego real</td><td>mapa do fluxo/SPAN</td><td>Alta</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>A análise de pacotes evoluiu de capturas simples em uma interface para investigação distribuída em ambientes com múltiplas camadas. Hoje é comum precisar comparar captura no cliente, no servidor, no firewall, no load balancer, no pod Kubernetes e, quando possível, no ponto de saída cloud.</p>\n  <p>Em redes antigas, estar no mesmo segmento Ethernet permitia observar grande parte do tráfego. Com switches, VLANs, microsegmentação, criptografia, NAT, proxies, overlays e cloud, cada ponto de captura mostra apenas uma parte da verdade. Isso exige método: definir o fluxo esperado e escolher pontos de observação estratégicos.</p>\n  <p>Outra evolução importante foi a separação entre captura e análise. tcpdump é excelente para capturar em servidores remotos, appliances, VMs e containers. Wireshark é excelente para análise visual. tshark permite análise automatizada em linha de comando. Em ambientes maduros, o PCAP vira artefato do incidente, com hash, retenção, classificação de sensibilidade e vínculo com ticket ou RCA.</p>\n  <div class=\"callout callout--info\"><strong>Evolução prática:</strong> antes o objetivo era “capturar pacotes”. Hoje é “capturar a menor evidência necessária, no ponto correto, no horário correto, com autorização, sem vazar dados e com interpretação reproduzível”.</div>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>Análise de pacotes é o processo de capturar, filtrar, decodificar e interpretar unidades de comunicação de rede para validar hipóteses sobre conectividade, desempenho, segurança ou comportamento de aplicações.</p>\n  <p><strong>tcpdump</strong> é uma ferramenta de linha de comando usada para capturar e exibir pacotes. Ela é especialmente útil em servidores, roteadores Linux, appliances, containers e ambientes sem interface gráfica. <strong>Wireshark</strong> é um analisador gráfico de protocolos que permite abrir arquivos PCAP, aplicar filtros de exibição, seguir fluxos, inspecionar campos e navegar pelas camadas dos pacotes.</p>\n  <p>Existem dois conceitos que o aluno deve separar desde o início:</p>\n  <ul>\n    <li><strong>Filtro de captura:</strong> aplicado antes da captura. Reduz o que será coletado. Se estiver errado, o pacote nunca será salvo.</li>\n    <li><strong>Filtro de exibição:</strong> aplicado depois da captura. Esconde ou mostra pacotes já coletados. Pode ser alterado livremente durante a análise.</li>\n  </ul>\n  <p>Outro conceito central é <strong>ponto de captura</strong>. Capturar no cliente responde perguntas sobre o que saiu e o que voltou ao cliente. Capturar no servidor responde se a requisição chegou e como o servidor respondeu. Capturar no firewall ou load balancer ajuda a validar tradução, política, health check e caminho intermediário.</p>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Quando uma interface de rede recebe ou envia quadros, o sistema operacional pode copiar esses pacotes para uma biblioteca de captura, como libpcap/Npcap. Ferramentas como tcpdump, dumpcap, tshark e Wireshark usam essa camada para receber os pacotes e salvá-los em formatos como PCAP ou PCAPNG.</p>\n  <p>Internamente, a captura acontece antes de muitas interpretações humanas. O arquivo contém timestamps, interfaces, tamanho do quadro, bytes capturados, protocolo e payload disponível. O analisador então decodifica os bytes em campos: MAC de origem, MAC de destino, EtherType, IP de origem, IP de destino, TTL, protocolo, portas TCP/UDP, flags TCP, sequência, ACK, janelas, opções, handshake TLS, consultas DNS e assim por diante.</p>\n  <p>Nem tudo que aparece na tela é “tráfego real da rede” do jeito que você imagina. Offloading de placa, segmentação TCP no host, checksum offload, captura em interface virtual, NAT, overlay, VXLAN, service mesh e containers podem alterar a aparência da captura. Por isso, análise profissional sempre pergunta: <em>em qual interface capturei, antes ou depois de qual transformação?</em></p>\n  <p>Em TCP, sinais importantes incluem SYN sem resposta, SYN retransmitido, SYN-ACK sem ACK, RST imediato, FIN normal, retransmissões, duplicate ACKs e zero window. Em UDP, a ausência de resposta não prova falha por si só; é preciso correlacionar com aplicação, ICMP, logs e expectativa do protocolo.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>Em uma arquitetura corporativa, análise de pacotes deve ser planejada como capacidade operacional. Não basta instalar Wireshark no notebook. É necessário saber onde capturar, quem autoriza, como preservar arquivos, como proteger dados sensíveis e como correlacionar PCAP com outras fontes.</p>\n  <p>Os pontos típicos de captura são:</p>\n  <ul>\n    <li><strong>Cliente:</strong> bom para DNS, proxy, TLS, rota local, retransmissões percebidas pelo usuário e erros de certificado;</li>\n    <li><strong>Servidor:</strong> bom para validar se a requisição chega, se a porta responde, se há RST, TLS alert ou resposta da aplicação;</li>\n    <li><strong>Firewall/NVA:</strong> bom para observar NAT, policy, sessões, resets e fluxo entre zonas;</li>\n    <li><strong>Load balancer/reverse proxy:</strong> bom para separar cliente-LB de LB-backend;</li>\n    <li><strong>Kubernetes node/pod:</strong> bom para CNI, Service, Ingress, DNS interno e egress;</li>\n    <li><strong>Ambiente cloud:</strong> quando PCAP não é possível, usar flow logs, mirroring, traffic analytics e ferramentas equivalentes.</li>\n  </ul>\n  <p>Arquiteturalmente, PCAP é plano de dados. Ele deve ser correlacionado com plano de controle: configuração de rota, política, DNS, certificado, deploy, mudança de firewall, health check e logs de auditoria. Só assim vira diagnóstico confiável.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Imagine um hospital investigando uma doença. O relato do paciente é o sintoma. O prontuário é o log. O monitor cardíaco é a métrica. A medicação recente é a mudança. A captura de pacotes é como um exame de sangue: mostra sinais concretos, mas precisa ser interpretada por alguém que entende o organismo.</p>\n  <p>Um exame isolado raramente conta a história inteira. Um valor alterado pode indicar várias causas. Da mesma forma, um SYN retransmitido pode indicar firewall, rota, host desligado, serviço fora, perda, captura no ponto errado ou política assimétrica. A análise correta vem da combinação entre exame, contexto e hipótese.</p>\n  <div class=\"callout callout--analogy\"><strong>Analogia:</strong> tcpdump é como coletar a amostra no leito do paciente. Wireshark é como o laboratório que permite olhar cada componente da amostra em detalhe. O profissional de redes é quem interpreta o resultado dentro do quadro clínico completo.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Um usuário tenta acessar <code>https://app.exemplo.local</code> e recebe timeout. Um teste simples com captura no cliente pode mostrar:</p>\n  <ul>\n    <li>consulta DNS para <code>app.exemplo.local</code>;</li>\n    <li>resposta DNS com IP <code>10.20.30.40</code>;</li>\n    <li>SYN do cliente para <code>10.20.30.40:443</code>;</li>\n    <li>três retransmissões de SYN;</li>\n    <li>nenhum SYN-ACK.</li>\n  </ul>\n  <p>Essa captura não prova sozinha que “é firewall”, mas prova que o cliente resolveu DNS, tentou TCP na porta 443 e não recebeu resposta TCP. O próximo passo profissional é capturar ou consultar evidências no caminho: gateway, firewall, servidor, load balancer, flow logs e logs de política.</p>\n  <p>Se, no servidor, não houver SYN chegando, a falha está no caminho. Se o SYN chegar e o servidor não responder, pode ser firewall local, serviço parado, binding incorreto ou rota de retorno. Se o servidor responder e o cliente não receber, investigar retorno, NAT, assimetria ou política intermediária.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, um sistema de RH acessado por filial apresenta lentidão intermitente. Logs da aplicação mostram requisições demoradas, mas não explicam a causa. O time coleta PCAP no cliente da filial e no servidor durante a janela do problema.</p>\n  <p>A captura do cliente mostra retransmissões TCP, duplicate ACKs e aumento de RTT. A captura do servidor mostra que as requisições chegam, mas há perda no caminho de retorno. Logs do firewall indicam troca automática de rota para um link secundário com MTU menor. O problema não era “aplicação lenta”; era perda/fragmentação no caminho WAN após failover.</p>\n  <p>A correção profissional não é aumentar timeout da aplicação. A correção é ajustar MTU/MSS, validar rota de retorno, revisar monitoramento do link, documentar o failover e criar teste sintético para detectar degradação antes dos usuários.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em cloud, a aplicação em Kubernetes retorna 502 no Load Balancer. O time captura tráfego no pod e no node, consulta logs do Ingress, health check do Load Balancer e flow logs da subnet.</p>\n  <p>O PCAP no node mostra o health check chegando ao node, mas não chegando ao pod. O Ingress mostra backend sem endpoint saudável. O Kubernetes revela que a readiness probe usa caminho <code>/health</code>, mas a aplicação mudou para <code>/ready</code> no último deploy. O problema parecia rede, mas a captura ajudou a provar que o tráfego chegava até parte do caminho e que a falha estava na camada de publicação do serviço.</p>\n  <p>Em outro caso, o PCAP dentro do pod mostra consulta DNS para banco gerenciado retornando IP público. Isso indica que o Private Endpoint existe, mas a resolução privada não está funcionando para aquela origem. A correção está em DNS privado/associação de zona, não em liberar firewall para internet.</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, análise de pacotes entra como validação de comportamento, não como prática manual isolada. Depois de alterar Ingress, TLS, proxy, service mesh ou NetworkPolicy, o pipeline pode executar testes sintéticos: resolver DNS, abrir TCP, validar certificado, verificar HTTP status, medir latência e registrar request ID.</p>\n  <p>Quando um ambiente falha, o time pode coletar tcpdump limitado por tempo e filtro em um runner autorizado, salvar PCAP como artefato protegido e anexar ao incidente. O objetivo não é coletar todo o tráfego, mas confirmar hipótese específica: o pod envia SYN? O proxy responde CONNECT? O servidor envia TLS alert? O DNS interno retorna IP privado?</p>\n  <p>Policy as code também pode controlar a prática: impedir captura sem ticket, limitar retenção, classificar PCAP como sensível, bloquear compartilhamento público e exigir sanitização antes de treinamento ou documentação.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Para Segurança da Informação, PCAP é ferramenta defensiva de investigação e também material sensível. Em resposta a incidente, uma captura pode revelar beaconing, DNS tunneling, varredura, exfiltração, tentativa de exploração, handshake TLS suspeito, conexões para domínios recém-criados ou uso indevido de protocolos.</p>\n  <p>Ao mesmo tempo, PCAP pode conter senhas em texto claro, cookies, tokens bearer, dados pessoais, nomes internos, endereços privados e payloads confidenciais. Por isso, capturas devem ter autorização, escopo, tempo limitado, armazenamento seguro, controle de acesso e descarte definido.</p>\n  <div class=\"callout callout--security\"><strong>Boa prática:</strong> trate PCAP como evidência sensível. Registre quem coletou, onde, quando, por quê, com qual filtro, hash do arquivo, ticket associado, classificação de dados e prazo de retenção.</div>\n  <p>Em ambiente corporativo, o objetivo de segurança não é capturar tudo. É capturar o suficiente para responder uma pergunta defensiva com menor exposição possível.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra o ciclo de análise de pacotes: começar com uma hipótese, escolher o ponto correto de captura, aplicar filtro seguro, preservar o arquivo, analisar camadas e transformar observação em evidência.</p>\n\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Ciclo de captura e análise de pacotes com Wireshark e tcpdump\">\n    <svg viewBox=\"0 0 1200 620\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-15-11-content-diagram-1-title svg-15-11-content-diagram-1-desc\">\n      <title id=\"svg-15-11-content-diagram-1-title\">Wireshark, tcpdump e análise de pacotes</title>\n      <desc id=\"svg-15-11-content-diagram-1-desc\">Diagrama pedagógico da aula 15.11, Wireshark, tcpdump e análise de pacotes, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-pcap-1511\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n        </marker>\n      </defs>\n\n      <rect x=\"25\" y=\"20\" width=\"1150\" height=\"560\" rx=\"24\" class=\"svg-frame\"></rect>\n      <text x=\"600\" y=\"62\" text-anchor=\"middle\" class=\"svg-title\">Análise de Pacotes: hipótese → captura → evidência → decisão</text>\n\n      <rect x=\"80\" y=\"120\" width=\"175\" height=\"120\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"168\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Hipótese</text>\n      <text x=\"168\" y=\"174\" text-anchor=\"middle\" class=\"svg-small\">qual fluxo?</text>\n      <text x=\"168\" y=\"194\" text-anchor=\"middle\" class=\"svg-small\">origem/destino</text>\n      <text x=\"168\" y=\"214\" text-anchor=\"middle\" class=\"svg-small\">protocolo/porta</text>\n\n      <rect x=\"310\" y=\"120\" width=\"175\" height=\"120\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"398\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Ponto de captura</text>\n      <text x=\"398\" y=\"174\" text-anchor=\"middle\" class=\"svg-small\">cliente</text>\n      <text x=\"398\" y=\"194\" text-anchor=\"middle\" class=\"svg-small\">servidor</text>\n      <text x=\"398\" y=\"214\" text-anchor=\"middle\" class=\"svg-small\">firewall/LB</text>\n\n      <rect x=\"540\" y=\"120\" width=\"175\" height=\"120\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"628\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Filtro</text>\n      <text x=\"628\" y=\"174\" text-anchor=\"middle\" class=\"svg-small\">capture filter</text>\n      <text x=\"628\" y=\"194\" text-anchor=\"middle\" class=\"svg-small\">display filter</text>\n      <text x=\"628\" y=\"214\" text-anchor=\"middle\" class=\"svg-small\">tempo/escopo</text>\n\n      <rect x=\"770\" y=\"120\" width=\"175\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--logs\"></rect>\n      <text x=\"858\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">PCAP</text>\n      <text x=\"858\" y=\"174\" text-anchor=\"middle\" class=\"svg-small\">arquivo bruto</text>\n      <text x=\"858\" y=\"194\" text-anchor=\"middle\" class=\"svg-small\">hash/retenção</text>\n      <text x=\"858\" y=\"214\" text-anchor=\"middle\" class=\"svg-small\">dados sensíveis</text>\n\n      <rect x=\"1000\" y=\"120\" width=\"140\" height=\"120\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"1070\" y=\"150\" text-anchor=\"middle\" class=\"svg-label\">Contexto</text>\n      <text x=\"1070\" y=\"174\" text-anchor=\"middle\" class=\"svg-small\">logs</text>\n      <text x=\"1070\" y=\"194\" text-anchor=\"middle\" class=\"svg-small\">métricas</text>\n      <text x=\"1070\" y=\"214\" text-anchor=\"middle\" class=\"svg-small\">mudanças</text>\n\n      <rect x=\"140\" y=\"350\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"235\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">Camadas</text>\n      <text x=\"235\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">Ethernet / ARP / IP</text>\n      <text x=\"235\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">TCP / UDP</text>\n      <text x=\"235\" y=\"446\" text-anchor=\"middle\" class=\"svg-small\">TLS / HTTP / DNS</text>\n\n      <rect x=\"410\" y=\"350\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"505\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">Sinais</text>\n      <text x=\"505\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">SYN sem SYN-ACK</text>\n      <text x=\"505\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">RST / retransmissão</text>\n      <text x=\"505\" y=\"446\" text-anchor=\"middle\" class=\"svg-small\">TLS alert / 5xx</text>\n\n      <rect x=\"680\" y=\"350\" width=\"190\" height=\"120\" rx=\"16\" class=\"svg-node svg-node--decision\"></rect>\n      <text x=\"775\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">Evidência</text>\n      <text x=\"775\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">observação verificável</text>\n      <text x=\"775\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">não é palpite</text>\n      <text x=\"775\" y=\"446\" text-anchor=\"middle\" class=\"svg-small\">explica o sintoma</text>\n\n      <rect x=\"950\" y=\"350\" width=\"170\" height=\"120\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"1035\" y=\"382\" text-anchor=\"middle\" class=\"svg-label\">Ação segura</text>\n      <text x=\"1035\" y=\"406\" text-anchor=\"middle\" class=\"svg-small\">mitigação mínima</text>\n      <text x=\"1035\" y=\"426\" text-anchor=\"middle\" class=\"svg-small\">rollback</text>\n      <text x=\"1035\" y=\"446\" text-anchor=\"middle\" class=\"svg-small\">RCA</text>\n\n      <line x1=\"255\" y1=\"180\" x2=\"310\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-pcap-1511)\"></line>\n      <line x1=\"485\" y1=\"180\" x2=\"540\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-pcap-1511)\"></line>\n      <line x1=\"715\" y1=\"180\" x2=\"770\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-pcap-1511)\"></line>\n      <line x1=\"945\" y1=\"180\" x2=\"1000\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-pcap-1511)\"></line>\n      <path d=\"M1070 240 C1070 300 235 290 235 350\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-pcap-1511)\"></path>\n      <line x1=\"330\" y1=\"410\" x2=\"410\" y2=\"410\" class=\"svg-link\" marker-end=\"url(#arrow-pcap-1511)\"></line>\n      <line x1=\"600\" y1=\"410\" x2=\"680\" y2=\"410\" class=\"svg-link\" marker-end=\"url(#arrow-pcap-1511)\"></line>\n      <line x1=\"870\" y1=\"410\" x2=\"950\" y2=\"410\" class=\"svg-link\" marker-end=\"url(#arrow-pcap-1511)\"></line>\n      <path d=\"M775 350 C760 285 640 285 628 240\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-pcap-1511)\"></path>\n\n      <text x=\"600\" y=\"535\" text-anchor=\"middle\" class=\"svg-note\">Pacote capturado fora do ponto certo pode provar apenas que você capturou no lugar errado.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um exercício de análise de pacotes com escopo profissional. Você pode executá-lo em ambiente local autorizado, laboratório próprio ou de forma conceitual se não tiver ferramentas instaladas. O objetivo é produzir um dossiê de evidências, não apenas abrir o Wireshark.</p>\n  <p>Você vai investigar três sintomas: falha DNS, conexão TCP sem resposta e erro TLS/HTTP. Para cada sintoma, deve escolher ponto de captura, filtro, hipótese, evidência observável, interpretação e próxima ação segura.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado. <strong>Causa provável a ser comprovada ou descartada:</strong> Perda, PMTU bloqueado, MSS não ajustado em túnel ou captura feita no ponto errado.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios treinam leitura de sinais. Para cada cenário, identifique o que a captura prova, o que ela não prova, qual evidência adicional é necessária e qual seria a próxima captura.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio simula um incidente em que vários times discordam sobre a causa. Você precisará usar PCAP, logs e topologia para separar DNS, TCP, TLS, proxy e aplicação.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como ler PCAP sem pular para conclusões. O método é observar sinais, formular hipótese, comparar pontos de captura e correlacionar com logs.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Wireshark, tcpdump e análise de pacotes são ferramentas de precisão para troubleshooting profissional. Elas mostram o plano de dados real, mas só geram diagnóstico confiável quando usadas com hipótese, ponto de captura correto, filtro adequado, contexto e cuidado com dados sensíveis.</p>\n  <p>Você aprendeu a separar filtro de captura e filtro de exibição, escolher onde capturar, interpretar sinais TCP/UDP/DNS/TLS/HTTP, preservar PCAP como evidência e transformar observações em ação segura, rollback e RCA.</p>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Perda, PMTU bloqueado, MSS não ajustado em túnel ou captura feita no ponto errado..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>15.12 — Projeto final: war room, RCA e playbook integrado</strong>, você vai juntar tudo que aprendeu no módulo: método, evidências, L2, IPv4, DNS, TCP/UDP, firewall, HTTP/TLS, VPN, cloud e análise de pacotes em um exercício completo de incidente corporativo.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 5/6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Enlace",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Ethernet",
      "ARP",
      "IPv4",
      "ICMP",
      "TCP",
      "UDP",
      "DNS",
      "TLS",
      "HTTP",
      "HTTPS",
      "BGP",
      "IPsec",
      "QUIC"
    ],
    "relatedConcepts": [
      "PCAP",
      "PCAPNG",
      "BPF",
      "Capture Filter",
      "Display Filter",
      "Retransmission",
      "RST",
      "SYN",
      "SNI",
      "MTU",
      "MSS",
      "NAT",
      "Proxy",
      "Load Balancer",
      "CNI",
      "Flow Logs",
      "Evidence Handling"
    ],
    "ports": [
      "53/UDP/TCP",
      "80/TCP",
      "443/TCP",
      "500/UDP",
      "4500/UDP",
      "8080/TCP",
      "8443/TCP"
    ],
    "tools": [
      "Wireshark",
      "tcpdump",
      "tshark",
      "dumpcap",
      "termshark",
      "curl",
      "dig",
      "nslookup",
      "ss",
      "netstat",
      "mtr",
      "traceroute",
      "kubectl sniff",
      "flow logs",
      "SIEM"
    ]
  },
  "lab": {
    "id": "lab-15.11",
    "title": "Caso guiado: Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Aplicação carrega cabeçalho, mas trava em respostas maiores; Wireshark mostra retransmissions e duplicate ACKs. Impacto: Sem interpretação correta, a equipe culpa aplicação e aumenta timeout em vez de corrigir caminho/MTU. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente → ponto de captura A → túnel/firewall → ponto de captura B → servidor → resposta grande",
    "architecture": "Arquitetura investigada: Cliente → ponto de captura A → túnel/firewall → ponto de captura B → servidor → resposta grande. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
    "prerequisites": [
      "Ambiente de laboratório, simulação, Packet Tracer/GNS3/cloud de teste ou execução conceitual autorizada.",
      "Conhecimento dos módulos anteriores de Redes, Segurança e Cloud.",
      "Não alterar produção sem aprovação, janela, backup e rollback."
    ],
    "tools": [
      "Editor de texto para dossiê",
      "Planilha para matriz hipótese-evidência",
      "Windows PowerShell/CMD",
      "Linux terminal",
      "Wireshark ou tcpdump quando aplicável",
      "Logs de firewall/LB/DNS/cloud/SIEM quando disponíveis",
      "Wireshark",
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Docker local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "240-320 min",
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Executar somente em ambiente autorizado.",
      "Não abrir regras amplas nem desativar controles como atalho.",
      "Preservar logs e evidências antes de mudanças.",
      "Sanitizar dados sensíveis em capturas e prints.",
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir pergunta investigativa",
        "instruction": "Exemplo: o SYN chega? o MSS é adequado? a resposta grande volta?",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Pergunta clara para a captura.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Escolher ponto de captura",
        "instruction": "Mapeie onde capturar: cliente, servidor, firewall, túnel ou SPAN.",
        "command": "sudo tcpdump -ni any -s 0 -w incidente.pcap host <ip> and port 443; tracepath <destino>; ping -M do -s 1372 <destino>",
        "expectedOutput": "Ponto justificado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Definir filtro seguro",
        "instruction": "Capture só IPs/portas necessários e limite duração.",
        "command": "Filtros: tcp.analysis.retransmission || tcp.analysis.duplicate_ack || tcp.flags.reset==1 || tls || dns",
        "expectedOutput": "Filtro que reduz dados sensíveis.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Capturar tráfego pequeno e grande",
        "instruction": "Compare health check pequeno com transação que falha.",
        "command": "pktmon start --capture --pkt-size 0; pktmon stop; pktmon pcapng PktMon.etl -o captura.pcapng",
        "expectedOutput": "Diferença observável.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Analisar handshake",
        "instruction": "Ver SYN, SYN-ACK, ACK, MSS, SACK e window scale.",
        "command": "pktmon start --capture --pkt-size 0; pktmon stop; pktmon pcapng PktMon.etl -o captura.pcapng",
        "expectedOutput": "Handshake interpretado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Analisar perda/retransmissão",
        "instruction": "Localize onde começam retransmissões/duplicate ACKs.",
        "command": "pktmon start --capture --pkt-size 0; pktmon stop; pktmon pcapng PktMon.etl -o captura.pcapng",
        "expectedOutput": "Hipótese de perda ou MTU.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Correlacionar logs",
        "instruction": "Compare captura com firewall/túnel/LB.",
        "command": "pktmon start --capture --pkt-size 0; pktmon stop; pktmon pcapng PktMon.etl -o captura.pcapng",
        "expectedOutput": "Evidência cruzada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Preservar e sanitizar",
        "instruction": "Nomeie arquivo, registre hash e remova payload sensível quando necessário.",
        "command": "pktmon start --capture --pkt-size 0; pktmon stop; pktmon pcapng PktMon.etl -o captura.pcapng",
        "expectedOutput": "Evidência preservada com ética.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Captura responde à pergunta",
        "command": "Revisão da pcap",
        "expected": "Mostra fluxo, flags e ponto de falha.",
        "ifFails": "Refazer captura no ponto correto."
      },
      {
        "check": "MSS/MTU avaliados",
        "command": "tracepath/ping DF/tcpdump",
        "expected": "Tamanho máximo e MSS coerentes com túnel.",
        "ifFails": "Ajustar MSS clamp/MTU."
      },
      {
        "check": "Dados sensíveis protegidos",
        "command": "Checklist de privacidade",
        "expected": "Captura mínima e armazenada com controle.",
        "ifFails": "Sanitizar/descartar payload indevido."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Retransmission não diz causa",
        "probableCause": "É sintoma de perda ou atraso",
        "howToConfirm": "Capturar em dois pontos",
        "fix": "Localizar onde pacote desaparece."
      },
      {
        "symptom": "Health check OK, usuário falha",
        "probableCause": "Transação real tem payload maior",
        "howToConfirm": "Comparar tamanhos",
        "fix": "Investigar MTU/MSS ou backend real."
      },
      {
        "symptom": "Captura enorme e inútil",
        "probableCause": "Sem pergunta/filtro",
        "howToConfirm": "Ver se pcap responde uma hipótese",
        "fix": "Refazer com escopo menor."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "pergunta investigativa",
      "ponto de captura",
      "filtro usado",
      "pcap/pcapng",
      "MSS/MTU",
      "flags TCP",
      "hash da evidência",
      "observações sanitizadas"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Analise uma captura com SYN OK, TLS iniciado e travamento em resposta grande. Explique por que aumentar timeout não é correção raiz.",
    "solution": "A interpretação correta identifica que timeout maior mascara perda/MTU. Capturas em dois pontos, MSS e PMTU indicam onde ajustar túnel, MSS clamp ou ICMP necessário, preservando evidências sem expor payload.",
    "expectedOutcome": "Dossiê contendo pergunta, topologia, ponto de captura, filtro, PCAP, análise por camadas, evidências, conclusão, mitigação, rollback e cuidados de segurança."
  },
  "exercises": [
    {
      "id": "ex15.11.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.11.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.11.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.11.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado”, qual atitude é mais profissional antes de alterar configuração?",
      "opts": [
        "Coletar evidências ligadas às hipóteses principais",
        "Reiniciar todos os equipamentos do caminho",
        "Liberar any-any temporariamente sem registro",
        "Apagar caches e logs para começar limpo"
      ],
      "a": 0,
      "exp": "A alteração deve vir depois de evidência suficiente, com escopo e rollback.",
      "difficulty": "intermediário",
      "topic": "método"
    },
    {
      "id": "q15.11.p1.2",
      "type": "evidência",
      "q": "O que diferencia evidência de opinião durante um incidente?",
      "opts": [
        "Evidência pode ser verificada por log, comando, métrica, captura ou configuração",
        "Evidência é a hipótese defendida pelo profissional mais experiente",
        "Evidência é qualquer relato de usuário",
        "Evidência é sempre um print de tela"
      ],
      "a": 0,
      "exp": "Relatos são importantes, mas evidência técnica precisa ser verificável e interpretada no contexto.",
      "difficulty": "iniciante",
      "topic": "evidência"
    },
    {
      "id": "q15.11.p1.3",
      "type": "segurança",
      "q": "Por que uma mitigação emergencial deve ter escopo, expiração e rollback?",
      "opts": [
        "Para evitar que uma exceção temporária vire risco permanente",
        "Para deixar a mudança mais lenta sem benefício",
        "Porque toda mitigação deve desligar logs",
        "Porque rollback só é necessário em cloud"
      ],
      "a": 0,
      "exp": "Mudanças emergenciais sem governança tendem a virar dívida operacional e vulnerabilidade.",
      "difficulty": "intermediário",
      "topic": "mitigação"
    },
    {
      "id": "q15.11.p1.4",
      "type": "RCA",
      "q": "Uma boa RCA deve conter:",
      "opts": [
        "Causa sustentada por evidências, fatores contribuintes e ações preventivas",
        "Apenas o comando que resolveu",
        "O nome da pessoa culpada",
        "Todos os logs brutos sem interpretação"
      ],
      "a": 0,
      "exp": "RCA transforma incidente em aprendizado operacional e melhoria do sistema.",
      "difficulty": "intermediário",
      "topic": "RCA"
    },
    {
      "question": "Qual é a principal diferença entre filtro de captura e filtro de exibição?",
      "options": [
        "Filtro de captura é aplicado antes de salvar pacotes; filtro de exibição atua sobre pacotes já capturados.",
        "Filtro de captura só existe no Wireshark; filtro de exibição só existe no tcpdump.",
        "Filtro de captura descriptografa TLS; filtro de exibição criptografa payload.",
        "Não existe diferença prática."
      ],
      "correctIndex": 0,
      "explanation": "Filtro de captura define o que será coletado. Se excluir algo, não será possível recuperar depois. Filtro de exibição apenas muda a visualização do que já foi capturado."
    },
    {
      "question": "Uma captura mostra SYN retransmitido e nenhum SYN-ACK. Qual conclusão é segura?",
      "options": [
        "O pacote de resposta não foi visto no ponto de captura.",
        "O firewall é definitivamente a causa.",
        "O DNS está incorreto com certeza.",
        "TLS falhou por certificado expirado."
      ],
      "correctIndex": 0,
      "explanation": "A conclusão segura é limitada à observação. A causa requer comparar pontos de captura e outras evidências."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.11.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.11.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.11.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.11.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.11.p1.5",
      "front": "O que uma RCA não deve ser?",
      "back": "Não deve ser caça a culpados nem lista de comandos; deve explicar causa, fatores contribuintes e prevenção.",
      "tags": [
        "RCA",
        "postmortem"
      ],
      "difficulty": "iniciante"
    }
  ],
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual parte do caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” é sintoma e qual parte ainda é apenas hipótese?",
      "hints": [
        "Separe o que foi observado do que foi inferido.",
        "Procure frases que parecem causa sem evidência."
      ],
      "expectedIdeas": [
        "sintoma observável",
        "hipótese",
        "evidência",
        "escopo"
      ],
      "explanation": "A maturidade de troubleshooting começa quando o aluno para de tratar hipótese como fato."
    },
    {
      "type": "diagnóstico",
      "question": "Qual evidência você coletaria primeiro para reduzir mais incerteza nesse caso?",
      "hints": [
        "Prefira evidência não destrutiva.",
        "Escolha algo que diferencie duas hipóteses fortes."
      ],
      "expectedIdeas": [
        "comando",
        "log",
        "métrica",
        "captura",
        "comparação afetado/não afetado"
      ],
      "explanation": "A primeira evidência deve separar caminhos de investigação, não apenas gerar mais dados."
    },
    {
      "type": "cenário real",
      "question": "Que mitigação temporária reduz impacto sem aumentar demais o risco de segurança?",
      "hints": [
        "Evite any-any.",
        "Defina escopo, expiração, monitoramento e rollback."
      ],
      "expectedIdeas": [
        "mitigação limitada",
        "aprovação",
        "rollback",
        "monitoramento",
        "menor privilégio"
      ],
      "explanation": "Incidentes pressionam por atalhos; o profissional reduz impacto preservando controle."
    }
  ],
  "challenge": {
    "title": "Desafio P1 — Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado",
    "scenario": "Aplicação carrega cabeçalho, mas trava em respostas maiores; Wireshark mostra retransmissions e duplicate ACKs.",
    "tasks": [
      "Montar problem statement.",
      "Construir matriz afetado/não afetado.",
      "Criar matriz hipótese-evidência.",
      "Executar ou simular comandos e coleta de logs.",
      "Definir mitigação com rollback.",
      "Produzir RCA com ações preventivas."
    ],
    "constraints": [
      "Não assumir causa sem evidência.",
      "Não usar mudança ampla como primeira resposta.",
      "Toda conclusão deve apontar para comando, log, métrica, captura ou configuração.",
      "Toda mitigação deve ter escopo e rollback."
    ],
    "expectedDeliverables": [
      "Dossiê do incidente",
      "Matriz hipótese-evidência",
      "Linha do tempo",
      "Plano de validação",
      "RCA",
      "Runbook atualizado"
    ],
    "gradingRubric": [
      {
        "criterion": "Escopo e problem statement",
        "points": 15,
        "description": "Delimita afetados, serviço, janela e sintoma sem causa prematura."
      },
      {
        "criterion": "Evidências",
        "points": 25,
        "description": "Liga hipóteses a evidências verificáveis e interpreta resultados corretamente."
      },
      {
        "criterion": "Mitigação segura",
        "points": 20,
        "description": "Reduz impacto sem criar exposição ampla, com rollback e monitoramento."
      },
      {
        "criterion": "RCA",
        "points": 25,
        "description": "Explica causa, fatores contribuintes e prevenção com dono e critério de aceite."
      },
      {
        "criterion": "Comunicação",
        "points": 15,
        "description": "Comunica impacto, estado e próximas ações com clareza."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A interpretação correta identifica que timeout maior mascara perda/MTU. Capturas em dois pontos, MSS e PMTU indicam onde ajustar túnel, MSS clamp ou ICMP necessário, preservando evidências sem expor payload.",
    "steps": [
      "Começar pelo sintoma observável e escopo.",
      "Desenhar o fluxo esperado.",
      "Priorizar hipóteses que explicam afetado e não afetado.",
      "Coletar evidências não destrutivas.",
      "Tomar decisão com base em evidência.",
      "Mitigar com escopo e rollback.",
      "Validar recuperação.",
      "Produzir RCA e ações preventivas."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar várias correções ao mesmo tempo.",
        "whyItIsWrong": "Pode recuperar o serviço, mas destrói a capacidade de saber a causa e cria risco de regressão."
      },
      {
        "answer": "Liberar tráfego amplo sem evidência.",
        "whyItIsWrong": "Aumenta superfície de ataque e transforma incidente operacional em risco de segurança."
      },
      {
        "answer": "Encerrar após o serviço voltar.",
        "whyItIsWrong": "Sem RCA e prevenção, a falha tende a voltar."
      }
    ],
    "finalAnswer": "A resposta correta para “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "PCAP",
      "shortDefinition": "Arquivo de captura de pacotes.",
      "longDefinition": "Formato usado para armazenar pacotes capturados e seus metadados, permitindo análise posterior em ferramentas como Wireshark e tshark.",
      "example": "Um PCAP mostra SYN retransmitido para 10.0.0.5:443.",
      "relatedTerms": [
        "Wireshark",
        "tcpdump",
        "Evidência"
      ],
      "relatedLessons": [
        "15.11"
      ]
    },
    {
      "term": "tcpdump",
      "shortDefinition": "Ferramenta CLI de captura de pacotes.",
      "longDefinition": "Ferramenta usada para capturar, filtrar e exibir tráfego de rede em sistemas compatíveis, frequentemente usada em servidores e ambientes remotos.",
      "example": "tcpdump captura tráfego DNS em uma interface durante uma janela de teste.",
      "relatedTerms": [
        "BPF",
        "PCAP",
        "libpcap"
      ],
      "relatedLessons": [
        "15.11"
      ]
    },
    {
      "term": "Wireshark",
      "shortDefinition": "Analisador gráfico de protocolos.",
      "longDefinition": "Ferramenta que decodifica pacotes em camadas e permite aplicar filtros de exibição, seguir fluxos e inspecionar campos de protocolos.",
      "example": "Wireshark mostra um TLS alert após o ClientHello.",
      "relatedTerms": [
        "Display Filter",
        "TShark",
        "PCAP"
      ],
      "relatedLessons": [
        "15.11"
      ]
    },
    {
      "term": "BPF",
      "shortDefinition": "Linguagem/filtro de captura de pacotes.",
      "longDefinition": "Berkeley Packet Filter é usado em filtros de captura para selecionar pacotes antes de salvá-los, reduzindo volume e ruído.",
      "example": "host 10.0.0.10 and tcp port 443 é um filtro de captura típico.",
      "relatedTerms": [
        "Capture Filter",
        "tcpdump",
        "libpcap"
      ],
      "relatedLessons": [
        "15.11"
      ]
    },
    {
      "term": "Display Filter",
      "shortDefinition": "Filtro de visualização no Wireshark/TShark.",
      "longDefinition": "Expressão aplicada sobre pacotes já capturados para exibir apenas tráfego relevante, sem alterar o arquivo bruto.",
      "example": "tcp.analysis.retransmission mostra retransmissões TCP detectadas.",
      "relatedTerms": [
        "Wireshark",
        "TShark",
        "PCAP"
      ],
      "relatedLessons": [
        "15.11"
      ]
    },
    {
      "term": "Checksum offload",
      "shortDefinition": "Cálculo de checksum delegado ao hardware.",
      "longDefinition": "Recurso de NIC/sistema operacional que pode fazer uma captura local mostrar checksum inválido antes de o hardware calcular o valor final.",
      "example": "Wireshark marca checksum TCP inválido em pacotes de saída, mas o problema é offload local.",
      "relatedTerms": [
        "NIC",
        "TCP",
        "Troubleshooting"
      ],
      "relatedLessons": [
        "15.11"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.11"
      ]
    },
    {
      "term": "Matriz hipótese-evidência",
      "shortDefinition": "Tabela que conecta hipóteses a evidências verificáveis.",
      "longDefinition": "Ferramenta de troubleshooting usada para priorizar testes, evitar achismo e registrar por que uma hipótese foi confirmada ou descartada.",
      "example": "Hipótese DNS deve apontar para evidências como resolvedor usado, resposta autoritativa, TTL e diferença entre origens.",
      "relatedTerms": [
        "evidência",
        "diagnóstico",
        "linha do tempo"
      ],
      "relatedLessons": [
        "15.1",
        "15.2",
        "15.11"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de explicar causa, fatores contribuintes, impacto, detecção, resposta e ações preventivas após um incidente.",
      "example": "Uma RCA madura não culpa pessoas; ela melhora processo, monitoramento, automação e validação.",
      "relatedTerms": [
        "postmortem",
        "runbook",
        "ação preventiva"
      ],
      "relatedLessons": [
        "15.12"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "Wireshark User's Guide",
      "organization": "Wireshark Foundation",
      "url": "https://www.wireshark.org/docs/wsug_html_chunked/",
      "note": "Guia oficial do Wireshark, incluindo captura, análise e filtros."
    },
    {
      "type": "official-doc",
      "title": "Wireshark Display Filter Manual Page",
      "organization": "Wireshark Foundation",
      "url": "https://www.wireshark.org/docs/man-pages/wireshark-filter.html",
      "note": "Referência oficial sobre filtros de exibição no Wireshark e TShark."
    },
    {
      "type": "official-doc",
      "title": "Wireshark — Capturing with tcpdump for viewing with Wireshark",
      "organization": "Wireshark Foundation",
      "url": "https://www.wireshark.org/docs/wsug_html_chunked/AppToolstcpdump.html",
      "note": "Orientação oficial sobre capturar com tcpdump e analisar no Wireshark."
    },
    {
      "type": "official-doc",
      "title": "tcpdump source and project documentation",
      "organization": "The Tcpdump Group",
      "url": "https://github.com/the-tcpdump-group/tcpdump",
      "note": "Projeto oficial do tcpdump, ferramenta de monitoramento e aquisição de dados de rede."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 15.6 — Troubleshooting TCP, UDP, portas e serviços",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15/lesson-15-06",
      "note": "Base para interpretar SYN, RST, portas e serviços."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 15.8 — Troubleshooting HTTP, HTTPS, TLS e proxies",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15/lesson-15-08",
      "note": "Base para interpretar TLS, HTTP, proxies e códigos de erro."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Wireshark, tcpdump e análise de pacotes\".",
      "Preservar evidências antes de aplicar mudanças destrutivas ou rollback.",
      "Usar menor privilégio, segmentação e escopo explícito em qualquer teste prático.",
      "Registrar comandos, horários, origem, destino, resultado esperado e resultado observado.",
      "Transformar aprendizados em checklist, runbook, teste automatizado ou melhoria de monitoramento."
    ],
    "badPractices": [
      "Liberar any-any, desativar firewall, ignorar TLS ou remover controles sem evidência e aprovação.",
      "Executar vários ajustes ao mesmo tempo e depois não saber qual ação mudou o sintoma.",
      "Apagar caches, reiniciar serviços ou rotacionar logs antes de coletar evidências.",
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir mitigação com causa raiz.",
      "Confundir correlação temporal com prova de causalidade.",
      "Testar a partir de uma origem que não representa os usuários afetados.",
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar troubleshooting profissional, evidências, hipóteses, testes controlados, RCA e comunicação de incidentes com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
        "name": "Exceção emergencial permanente",
        "description": "No caso “Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Wireshark, tcpdump e análise de pacotes",
              "description": "Em Wireshark, tcpdump e análise de pacotes, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
              "defensiveExplanation": "O risco aparece quando comandos, PCAPs, logs, métricas, rotas, DNS, firewall e mudanças recentes não são correlacionados em uma linha do tempo única.",
              "mitigation": "Coletar evidências mínimas antes de alterar, registrar horário/fonte/comando, testar uma hipótese por vez, manter plano de rollback, validar regressão e transformar achados recorrentes em runbooks."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Alertar mudanças emergenciais sem expiração.",
      "Correlacionar logs de rede, identidade, cloud e aplicação durante a janela do incidente.",
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
    ],
    "hardening": [
      "Padronizar runbooks de coleta antes de mudança.",
      "Exigir revisão pós-incidente com ações preventivas rastreáveis.",
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Detectar aumento súbito de regras temporárias, bypass TLS, queda de logs ou tráfego fora do baseline.",
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.11."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Aplicação carrega cabeçalho, mas trava em respostas maiores; Wireshark mostra retransmissions e duplicate ACKs.",
      "Impacto: Sem interpretação correta, a equipe culpa aplicação e aumenta timeout em vez de corrigir caminho/MTU.",
      "Causa provável a validar: Perda, PMTU bloqueado, MSS não ajustado em túnel ou captura feita no ponto errado.",
      "Falha ou comportamento inesperado relacionado a Wireshark, tcpdump e análise de pacotes.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Quem é afetado e quem não é afetado?",
      "Qual hipótese explica melhor todos os sintomas sem contradizer evidências?",
      "Que evidência confirmaria ou negaria a hipótese mais provável?",
      "A mitigação proposta preserva segurança, logs e rollback?",
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 15.11?"
    ],
    "commands": [
      {
        "platform": "Linux",
        "command": "sudo tcpdump -ni any -s 0 -w incidente.pcap host <ip> and port 443; tracepath <destino>; ping -M do -s 1372 <destino>",
        "purpose": "Capturar tráfego e estimar PMTU.",
        "expectedObservation": "Pacotes, MSS negociado e maior tamanho sem fragmentar.",
        "interpretation": "Retransmissão é sintoma; precisa descobrir onde o pacote se perde."
      },
      {
        "platform": "Wireshark",
        "command": "Filtros: tcp.analysis.retransmission || tcp.analysis.duplicate_ack || tcp.flags.reset==1 || tls || dns",
        "purpose": "Interpretar sintomas TCP/TLS/DNS.",
        "expectedObservation": "Sequência, ACKs, RSTs e handshake.",
        "interpretation": "Filtros de análise ajudam, mas devem ser lidos com topologia e ponto de captura."
      },
      {
        "platform": "Windows",
        "command": "pktmon start --capture --pkt-size 0; pktmon stop; pktmon pcapng PktMon.etl -o captura.pcapng",
        "purpose": "Coletar captura quando Wireshark não está disponível.",
        "expectedObservation": "Arquivo pcapng para análise.",
        "interpretation": "Captura deve ter escopo e proteção de dados sensíveis."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “MSS/MTU” está com prioridade Alta e a evidência necessária é “tcpdump + ping DF/tracepath”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Perda no caminho” está com prioridade Alta e a evidência necessária é “captura dupla”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “RST de intermediário” está com prioridade Média e a evidência necessária é “flags TCP/log firewall”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Ponto de captura errado” está com prioridade Alta e a evidência necessária é “mapa do fluxo/SPAN”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A evidência contradiz a hipótese favorita",
        "then": "Não force a conclusão. Atualize a matriz, registre a hipótese descartada e avance para a próxima explicação compatível com os sintomas."
      },
      {
        "if": "A mitigação proposta amplia acesso, desativa controle ou apaga evidência",
        "then": "Pausar, documentar risco, obter aprovação formal, reduzir escopo e definir rollback antes de agir."
      }
    ]
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
      "15.12"
    ]
  },
  "diagnosticCase": {
    "title": "Captura mostra retransmissões, mas o problema real é perda no retorno e MSS inadequado",
    "symptom": "Aplicação carrega cabeçalho, mas trava em respostas maiores; Wireshark mostra retransmissions e duplicate ACKs.",
    "businessImpact": "Sem interpretação correta, a equipe culpa aplicação e aumenta timeout em vez de corrigir caminho/MTU.",
    "likelyRootCause": "Perda, PMTU bloqueado, MSS não ajustado em túnel ou captura feita no ponto errado.",
    "timeline": [
      "10:00: túnel alterado",
      "10:05: downloads grandes falham",
      "10:10: health check pequeno OK",
      "10:30: retransmissões observadas"
    ],
    "expectedFlow": "Cliente → ponto de captura A → túnel/firewall → ponto de captura B → servidor → resposta grande",
    "hypothesisMatrix": [
      {
        "hypothesis": "MSS/MTU",
        "why": "Payload grande falha, pequeno OK",
        "evidence": "tcpdump + ping DF/tracepath",
        "priority": "Alta"
      },
      {
        "hypothesis": "Perda no caminho",
        "why": "Retransmissions em um ponto, não em outro",
        "evidence": "captura dupla",
        "priority": "Alta"
      },
      {
        "hypothesis": "RST de intermediário",
        "why": "Conexão encerrada abruptamente",
        "evidence": "flags TCP/log firewall",
        "priority": "Média"
      },
      {
        "hypothesis": "Ponto de captura errado",
        "why": "Não vê tráfego real",
        "evidence": "mapa do fluxo/SPAN",
        "priority": "Alta"
      }
    ],
    "requiredArtifacts": [
      "problem statement",
      "escopo afetado/não afetado",
      "mapa do fluxo",
      "matriz hipótese-evidência",
      "comandos/logs/capturas",
      "decisão",
      "mitigação",
      "validação",
      "RCA"
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    }
  ]
};
