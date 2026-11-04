export const lesson1712 = {
  "id": "17.12",
  "moduleId": "m17",
  "order": 12,
  "title": "Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta",
  "subtitle": "Construa, defenda e diagnostique uma arquitetura corporativa híbrida, segura, observável e governável, consolidando todo o curso Redes e Network.",
  "duration": "260-370 min",
  "estimatedStudyTimeMinutes": 370,
  "difficulty": "avançado",
  "type": "capstone",
  "xp": 650,
  "tags": [
    "capstone",
    "arquitetura",
    "segurança",
    "troubleshooting",
    "cloud networking",
    "wireless",
    "DFIR",
    "DevSecOps",
    "Zero Trust",
    "SIEM",
    "RCA",
    "portfólio",
    "governança",
    "FinOps",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão",
    "matriz de competências",
    "capstone avaliável",
    "critérios de aprovação",
    "entregáveis objetivos",
    "matriz de fluxos",
    "plano DNS",
    "plano VPN",
    "observabilidade",
    "rubrica objetiva"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.11",
      "reason": "A auditoria de consolidação fornece o pacote de entrada e os critérios de prontidão para o capstone final."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking sustenta VPC/VNet, rotas, DNS privado, Private Link, Kubernetes e observabilidade."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting, war room, PCAP, RCA e playbooks são usados na investigação final."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Segurança defensiva, escopo, telemetria e DFIR estruturam a resposta ao incidente simulado."
    }
  ],
  "objectives": [
    "Projetar uma arquitetura de rede corporativa híbrida e cloud com controles defensivos.",
    "Construir matriz de fluxos, plano CIDR, zonas, rotas, DNS e políticas de acesso.",
    "Definir telemetria mínima para troubleshooting, SOC, DFIR, FinOps e auditoria.",
    "Diagnosticar um incidente simulado com método hipótese-evidência.",
    "Produzir RCA técnico e executivo com ações preventivas e riscos residuais.",
    "Entregar um dossiê de portfólio sanitizado e profissional.",
    "Entregar os 12 artefatos obrigatórios do capstone: arquitetura, endereçamento, matriz de fluxos, firewall, DNS, VPN/acesso remoto, cloud, observabilidade, testes, troubleshooting, RCA e rubrica.",
    "Defender a arquitetura usando evidências, trade-offs, riscos residuais, custo, rollback e critérios de aprovação."
  ],
  "learningOutcomes": [
    "Explicar uma arquitetura ponta a ponta do usuário ao serviço gerenciado.",
    "Justificar decisões de segmentação, egress control, Private Endpoint, DNS e logs.",
    "Criar playbook integrado de investigação e resposta proporcional.",
    "Correlacionar evidências de rede, cloud, aplicação, identidade, endpoint e custo.",
    "Defender trade-offs entre segurança, operação, performance, custo e simplicidade.",
    "Transformar o projeto final em artefato de portfólio e base para estudos avançados.",
    "Produzir um dossiê final auditável com entregáveis rastreáveis e pontuação por rubrica.",
    "Executar uma validação ponta a ponta sem depender de ambiente pago, usando simulação local/documental quando necessário."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>Motivação</h2>\n  <p>Um profissional de redes não é avaliado por saber o que é VLAN, DNS, TLS, BGP ou VPC, e sim por desenhar um ambiente coerente, defendê-lo contra riscos previsíveis, diagnosticar falhas sob pressão e explicar as decisões para pessoas técnicas e não técnicas. O problema deixou de ser \"conectar máquinas\" e passou a ser conectar com segurança, governança, custo controlado e evidência.</p>\n  <p>O capstone junta o curso inteiro numa única entrega. A pergunta deixa de ser \"você lembra o conceito?\" e passa a ser \"você consegue construir, justificar, validar, operar e melhorar uma arquitetura ponta a ponta?\".</p>\n  <div class=\"callout\"><strong>Ideia central:</strong> redes profissionais são sistemas vivos. Elas transportam tráfego, impõem controles, geram evidências, consomem orçamento e precisam sobreviver a falhas, mudanças e incidentes.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>Problema</h2>\n  <p>A empresa fictícia do capstone cresceu rápido. Ela tem matriz, filial, funcionários remotos, Wi-Fi corporativo, aplicações internas, uma aplicação web publicada, workloads em cloud, cluster Kubernetes, banco gerenciado, pipelines DevSecOps e um SOC em amadurecimento. O ambiente funciona, mas a arquitetura está fragmentada: subnets mal documentadas, exceções de firewall, DNS híbrido pouco claro, logs incompletos, endpoints públicos desnecessários e custos de egress crescendo.</p>\n  <p>Houve também um incidente recente: usuários remotos relataram lentidão, a aplicação web apresentou erros 503 intermitentes e o SOC viu tráfego incomum saindo de um workload. Ainda não se sabe se a causa foi falha operacional, mudança mal aplicada, DNS, rota assimétrica, regra de firewall, health check incorreto, C2, exfiltração ou uma combinação de fatores.</p>\n  <p>Seu trabalho é desenhar uma arquitetura melhor, defender os fluxos críticos, investigar o incidente e produzir artefatos auditáveis. \"Liberar tudo para funcionar\" não é solução: a entrega precisa equilibrar conectividade, segurança, custo, operação e capacidade investigativa.</p>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>Conceito</h2>\n  <p>O capstone é um projeto integrador em que você produz uma arquitetura de rede corporativa moderna e demonstra que ela é:</p>\n  <ul>\n    <li><strong>Conectável:</strong> os fluxos legítimos funcionam.</li>\n    <li><strong>Defensável:</strong> os fluxos desnecessários são bloqueados e os controles reduzem impacto.</li>\n    <li><strong>Diagnosticável:</strong> quando algo falha, há evidência suficiente para investigar.</li>\n    <li><strong>Governável:</strong> mudanças, exceções, custos e riscos têm dono e critério.</li>\n  </ul>\n  <p>O objetivo não é decorar ferramentas, mas demonstrar raciocínio: por que cada componente existe, qual problema resolve, que risco adiciona, como é validado e como aparece nos logs. A ordem de trabalho segue essa lógica: primeiro a arquitetura (quais fluxos devem e não devem existir, onde ficam os controles), depois a defesa (segmentação, egress control, endpoints privados, identidade, logs), depois o diagnóstico (linha do tempo, matriz hipótese-evidência, RCA) e, por fim, a operação (documentação versionada, revisão por pares, testes em pipeline e ajuste após incidentes).</p>\n\n  <h3>Os 12 entregáveis obrigatórios (dossiê)</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Código</th><th>Entregável e conteúdo mínimo</th><th>Passos do lab</th></tr></thead>\n    <tbody>\n      <tr><td>D01</td><td><strong>Arquitetura lógica ponta a ponta:</strong> matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança (diagrama SVG ou ASCII).</td><td>1, 2, 8</td></tr>\n      <tr><td>D02</td><td><strong>Plano de endereçamento:</strong> CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.</td><td>3</td></tr>\n      <tr><td>D03</td><td><strong>Matriz de fluxos:</strong> origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.</td><td>4</td></tr>\n      <tr><td>D04</td><td><strong>Política de firewall/ACL/SG/NSG/NACL:</strong> allowlist, deny explícito, ordem das regras, shadowing, tráfego de retorno e exceções com expiração.</td><td>4</td></tr>\n      <tr><td>D05</td><td><strong>Plano DNS:</strong> público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.</td><td>5</td></tr>\n      <tr><td>D06</td><td><strong>Plano VPN/acesso remoto:</strong> autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.</td><td>6</td></tr>\n      <tr><td>D07</td><td><strong>Desenho cloud/híbrido:</strong> hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking, custos e checklist de limpeza se houver recurso real.</td><td>7, 8, 9</td></tr>\n      <tr><td>D08</td><td><strong>Plano de observabilidade:</strong> flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.</td><td>9, 10</td></tr>\n      <tr><td>D09</td><td><strong>Evidências de testes:</strong> DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.</td><td>11</td></tr>\n      <tr><td>D10</td><td><strong>Runbook de troubleshooting:</strong> árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.</td><td>12, 13</td></tr>\n      <tr><td>D11</td><td><strong>RCA do incidente simulado:</strong> timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.</td><td>14</td></tr>\n      <tr><td>D12</td><td><strong>Rubrica objetiva preenchida:</strong> pontuação por critério e por competência, decisão final, lacunas, reteste e plano de melhoria contínua.</td><td>16 a 19</td></tr>\n    </tbody>\n  </table></div>\n  <p>O passo 15 do lab organiza os 12 entregáveis num portfólio sanitizado (README, diagramas, matrizes, playbooks, RCA, riscos residuais e custos).</p>\n\n  <h3>Rubrica de 100 pontos</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Critério</th><th>Pontos</th><th>Entregáveis</th><th>O que a banca verifica</th></tr></thead>\n    <tbody>\n      <tr><td>Arquitetura, endereçamento e segmentação</td><td>15</td><td>D01, D02, D05</td><td>CIDR, VLANs, subnets, rotas, DNS e zonas coerentes, sem sobreposição e com crescimento reservado.</td></tr>\n      <tr><td>Matriz de fluxos e firewall</td><td>15</td><td>D03, D04</td><td>Fluxos legítimos documentados, regras justificadas, ordem e shadowing revisados, retorno tratado e exceções com dono e prazo.</td></tr>\n      <tr><td>VPN, acesso remoto e identidade</td><td>10</td><td>D06</td><td>MFA, DNS, rotas, perfis, logs, fallback e menor privilégio.</td></tr>\n      <tr><td>Cloud networking e custos</td><td>12</td><td>D07</td><td>Hub-spoke, endpoints privados, egress control, route tables, Kubernetes networking, NAT/firewall/logs, custo e limpeza.</td></tr>\n      <tr><td>Observabilidade, testes e evidências</td><td>15</td><td>D08, D09</td><td>Flow logs, DNS, proxy, WAF/LB, VPN, cloud audit, SIEM e testes com evidências sanitizadas sustentam as decisões.</td></tr>\n      <tr><td>Troubleshooting e RCA</td><td>15</td><td>D10, D11</td><td>Timeline, hipótese-evidência, comandos e fontes, mitigação, rollback, causa técnica, causa sistêmica e prevenção.</td></tr>\n      <tr><td>Segurança defensiva, governança e risco residual</td><td>10</td><td>transversal</td><td>Controles defensivos, escopo autorizado, riscos residuais, exceções, auditoria e backlog priorizado.</td></tr>\n      <tr><td>Comunicação, portfólio e melhoria contínua</td><td>8</td><td>D12 e defesa</td><td>Resumo executivo, defesa técnica, rubrica preenchida, lacunas, reteste e portfólio sanitizado.</td></tr>\n    </tbody>\n  </table></div>\n\n  <h3>Matriz de competências (autoavaliação)</h3>\n  <p>A nota da rubrica não basta: uma pontuação geral alta pode esconder uma competência fraca. Avalie cada competência com evidência e compare com o mínimo dela.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Código</th><th>Competência</th><th>Módulos</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead>\n    <tbody>\n      <tr><td>C01</td><td>Fundamentos, OSI e encapsulamento</td><td>M00–M02</td><td>70%</td><td>90%</td><td>explica o fluxo de dados por camadas e reconhece onde cada evidência aparece</td></tr>\n      <tr><td>C02</td><td>Ethernet, ARP, VLAN, switching e camada 2</td><td>M03</td><td>70%</td><td>90%</td><td>diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast</td></tr>\n      <tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>M04, M05, M11</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica a escolha de caminho</td></tr>\n      <tr><td>C04</td><td>TCP, UDP, portas e serviços essenciais</td><td>M06, M07</td><td>75%</td><td>90%</td><td>diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs</td></tr>\n      <tr><td>C05</td><td>HTTP, TLS, proxy, firewall, VPN e publicação segura</td><td>M08–M10</td><td>75%</td><td>90%</td><td>interpreta erros de aplicação/rede e propõe controles com rollback</td></tr>\n      <tr><td>C06</td><td>Wireless, segurança defensiva e Blue Team</td><td>M12, M13, M16</td><td>75%</td><td>90%</td><td>define escopo autorizado, telemetria, detecção, contenção e mitigação</td></tr>\n      <tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>M14</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr>\n      <tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>M15, M17</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr>\n    </tbody>\n  </table></div>\n\n  <h3>Decisão final</h3>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Decisão</th><th>Condição</th></tr></thead>\n    <tbody>\n      <tr><td>Aprovado</td><td>80 pontos ou mais na rubrica, D01–D12 presentes e todas as competências no mínimo ou acima.</td></tr>\n      <tr><td>Aprovado com ressalvas</td><td>80 pontos ou mais e D01–D12 presentes, mas alguma competência abaixo do próprio mínimo (nunca abaixo de 70%), com lacuna registrada e plano de reteste.</td></tr>\n      <tr><td>Refazer a competência crítica</td><td>Menos de 80 pontos, entregável ausente, competência abaixo de 70% ou resposta correta que você não consegue explicar com evidência.</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout\"><strong>Critério de maturidade:</strong> toda resposta que envolva segurança indica escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. \"Bloquear no firewall\" ou \"usar Zero Trust\" sem fluxo, regra, log e justificativa não atinge domínio.</div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>Funcionamento interno</h2>\n  <p>A arquitetura do capstone é uma cadeia de dependências. O usuário resolve o nome da aplicação por DNS, passa pela rede local ou remota, atravessa controles de identidade e firewall, chega a um balanceador, negocia TLS, alcança um backend, consulta serviços privados, registra logs e gera métricas. Qualquer elo pode falhar.</p>\n  <p>Ao mesmo tempo, a arquitetura tem quatro planos, e o dossiê precisa deixá-los explícitos:</p>\n  <ul>\n    <li><strong>Plano de dados:</strong> transporta os pacotes.</li>\n    <li><strong>Plano de controle:</strong> define rotas, políticas, DNS, identidade e configuração.</li>\n    <li><strong>Plano de observabilidade:</strong> coleta os sinais.</li>\n    <li><strong>Plano de governança:</strong> define o que é permitido, quem aprova exceções e como mudanças são auditadas.</li>\n  </ul>\n  <p>É essa visão que evita conclusões apressadas. Quando a aplicação retorna 503, você não conclui que \"a rede caiu\": verifica DNS, TCP, TLS, WAF, LB, health check, rota, firewall, backend, readiness, logs e mudança recente. Quando há tráfego suspeito, cruza fluxo, DNS, proxy, EDR, identidade, cloud audit, custo e contexto do ativo.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>Arquitetura</h2>\n  <p>A arquitetura alvo é organizada em camadas:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Camada</th><th>Componentes e decisões</th></tr></thead>\n    <tbody>\n      <tr><td>Borda pública</td><td>DNS público, CDN/WAF e Load Balancer com TLS. A aplicação fica em subnets privadas ou num cluster Kubernetes com Ingress controlado.</td></tr>\n      <tr><td>Dados e serviços</td><td>Banco gerenciado e storage acessados por endpoints privados e DNS privado.</td></tr>\n      <tr><td>Saída (egress)</td><td>Tráfego de saída passa por egress control, proxy ou firewall com logs.</td></tr>\n      <tr><td>Conectividade híbrida</td><td>VPN ou link dedicado com BGP, rotas filtradas e hub de conectividade.</td></tr>\n      <tr><td>Matriz e filial</td><td>Segmentação por função: usuários, servidores, gerenciamento, voz, Wi-Fi corporativo, convidados e dispositivos especiais. O Wi-Fi usa autenticação corporativa e VLAN dinâmica quando aplicável.</td></tr>\n      <tr><td>Acesso remoto</td><td>Identidade, MFA, postura do dispositivo e escopo mínimo.</td></tr>\n      <tr><td>Segurança</td><td>Segmentação, firewall, SG/NSG/NACL, WAF, NAC, EDR, NDR, DLP, SIEM e playbooks.</td></tr>\n      <tr><td>Operação</td><td>IaC, revisão de mudanças, testes sintéticos, alertas, runbooks, custos monitorados e RCA.</td></tr>\n      <tr><td>Evidência</td><td>Flow logs, DNS logs, proxy logs, WAF/LB logs, cloud audit, Kubernetes audit, EDR e eventos de identidade.</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>Exemplo simples</h2>\n  <p>Um usuário remoto precisa acessar uma aplicação interna. O fluxo esperado é: autenticação com MFA, VPN ou acesso privado, DNS interno resolvendo o nome correto, rota para a subnet da aplicação, firewall permitindo só a porta necessária, aplicação respondendo via TLS e logs registrando identidade, origem, destino, horário e resultado.</p>\n  <p>Se falhar, você não altera tudo de uma vez. Confirme, nesta ordem:</p>\n  <ol>\n    <li>o usuário está autenticado;</li>\n    <li>recebeu as rotas;</li>\n    <li>o DNS interno resolve o nome;</li>\n    <li>o TCP conecta;</li>\n    <li>o TLS é válido;</li>\n    <li>a aplicação responde;</li>\n    <li>não há bloqueio em firewall, WAF, LB ou backend.</li>\n  </ol>\n  <p>Esse é o capstone em miniatura: fluxo legítimo, controle mínimo necessário, evidência em cada etapa e diagnóstico disciplinado.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>Exemplo empresarial</h2>\n  <p>A matriz tem usuários administrativos, equipe de TI, servidores legados, impressoras, Wi-Fi corporativo, Wi-Fi convidado e sistemas internos. A filial precisa acessar só aplicações específicas. O datacenter tem AD/DNS, repositórios, ferramentas de monitoramento e um firewall central.</p>\n  <p>A arquitetura separa zonas por função e criticidade, e cada decisão vira uma linha da matriz de fluxos (D03) e da política (D04):</p>\n  <ul>\n    <li>usuários não acessam bancos diretamente;</li>\n    <li>o Wi-Fi convidado só sai para a internet;</li>\n    <li>a administração usa bastion e MFA;</li>\n    <li>servidores críticos têm fluxos explicitamente documentados;</li>\n    <li>logs de firewall e DNS vão para o SIEM;</li>\n    <li>exceções têm dono e expiração.</li>\n  </ul>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Na cloud, a empresa tem uma Landing Zone com contas ou subscriptions separadas para segurança, logs, conectividade, produção, homologação e desenvolvimento. A rede usa hub-spoke, firewall central, DNS privado, endpoints privados para serviços gerenciados e flow logs nas subnets críticas.</p>\n  <p>A aplicação web é publicada por DNS público, WAF, Load Balancer e TLS. O backend roda em Kubernetes ou VMs privadas, o banco gerenciado é acessado por Private Endpoint e o egress passa por NAT ou firewall com logs. O pipeline valida que nenhuma subnet de dados tenha rota pública indevida e que nenhum security group exponha administração para a internet.</p>\n  <p>No D07 você justifica os custos: NAT, egress, logs, firewall gerenciado, transit, tráfego entre regiões, WAF e retenção. Segurança sem FinOps vira susto financeiro; economia sem segurança vira risco operacional.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a arquitetura não é entregue como desenho solto: ela vira código, política, teste e documentação. Terraform, Bicep, CloudFormation ou módulos equivalentes criam redes, subnets, rotas, SG/NSG, endpoints e logs, e o pipeline executa validações antes do merge.</p>\n  <p>Exemplos de guardrails: bloquear porta administrativa pública, exigir flow logs em subnets críticas, exigir tags de dono e custo, impedir CIDR sobreposto, validar que bancos usam endpoints privados, verificar que WAF e TLS estão habilitados em serviços públicos e exigir aprovação para exceções temporárias.</p>\n  <p>Inclua no dossiê um plano de automação: quais componentes seriam versionados, quais políticas seriam testadas, que evidências o pipeline gera e como seria o rollback se uma mudança quebrasse a conectividade (o rollback entra no D10).</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>Exemplo em Segurança</h2>\n  <p>Do ponto de vista de segurança, a arquitetura precisa reduzir movimento lateral, controlar egress, detectar beaconing, investigar possível exfiltração, proteger o DNS, evitar exposição pública indevida, registrar eventos de identidade e preservar evidências. A pergunta não é \"tem firewall?\", mas \"os fluxos essenciais são permitidos, os perigosos são negados e os eventos relevantes são visíveis?\".</p>\n  <p>No incidente do capstone, construa hipóteses defensivas sem pular para conclusões. O tráfego incomum saindo do workload pode ser processo legítimo ruidoso, C2 ou tentativa de exfiltração; o 503 pode ser falha de health check; a lentidão remota pode vir de DNS privado incorreto, rota assimétrica ou política mal aplicada.</p>\n  <p>A resposta precisa ser proporcional: contenção mínima, preservação de evidências, comunicação clara, rollback quando necessário, RCA e backlog de melhoria. A investigação não inclui exploração ofensiva nem ações fora do escopo autorizado.</p>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>Diagrama SVG</h2>\n  <p>A primeira linha mostra o caminho do usuário até a borda pública; a segunda, workloads, dados, controles e automação; a terceira, telemetria, SOC e governança. A seta tracejada fecha o ciclo de melhoria: o que a governança aprende volta para a telemetria.</p>\n  <div class=\"svg-diagram\">\n    <svg viewBox=\"0 0 1200 720\" xmlns=\"http://www.w3.org/2000/svg\" class=\"course-svg lesson-svg course-svg--capstone-final\" role=\"img\" aria-labelledby=\"svg-title-17-12 svg-desc-17-12\">\n      <title id=\"svg-title-17-12\">Capstone final de arquitetura, defesa e diagnóstico ponta a ponta</title>\n      <desc id=\"svg-desc-17-12\">Diagrama integrando usuários, rede corporativa, hub cloud, borda pública, workloads privados, serviços gerenciados, telemetria, SOC, governança, custos e melhoria contínua.</desc>\n      <defs>\n        <marker id=\"arrow1712\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"220\" height=\"130\" rx=\"14\" class=\"svg-box\"></rect><text x=\"140\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Usuários</text><text x=\"140\" y=\"105\" text-anchor=\"middle\">Matriz • Filial</text><text x=\"140\" y=\"130\" text-anchor=\"middle\">Wi-Fi • Remoto</text><text x=\"140\" y=\"155\" text-anchor=\"middle\">Identidade • MFA</text>\n      <rect x=\"310\" y=\"40\" width=\"230\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--network\"></rect><text x=\"425\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Rede corporativa</text><text x=\"425\" y=\"105\" text-anchor=\"middle\">VLANs • Gateway</text><text x=\"425\" y=\"130\" text-anchor=\"middle\">DNS • DHCP • NAT</text><text x=\"425\" y=\"155\" text-anchor=\"middle\">Firewall • NAC</text>\n      <rect x=\"600\" y=\"40\" width=\"250\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--cloud\"></rect><text x=\"725\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Hub Cloud</text><text x=\"725\" y=\"105\" text-anchor=\"middle\">VPC/VNet • Rotas</text><text x=\"725\" y=\"130\" text-anchor=\"middle\">VPN/BGP • Transit</text><text x=\"725\" y=\"155\" text-anchor=\"middle\">DNS privado • Logs</text>\n      <rect x=\"910\" y=\"40\" width=\"240\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--security\"></rect><text x=\"1030\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Borda pública</text><text x=\"1030\" y=\"105\" text-anchor=\"middle\">DNS público • CDN</text><text x=\"1030\" y=\"130\" text-anchor=\"middle\">WAF • LB • TLS</text><text x=\"1030\" y=\"155\" text-anchor=\"middle\">Health checks</text>\n      <rect x=\"600\" y=\"250\" width=\"250\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--app\"></rect><text x=\"725\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Workloads privados</text><text x=\"725\" y=\"315\" text-anchor=\"middle\">Kubernetes • Ingress</text><text x=\"725\" y=\"340\" text-anchor=\"middle\">Services • Pods • CNI</text><text x=\"725\" y=\"365\" text-anchor=\"middle\">NetworkPolicy</text>\n      <rect x=\"910\" y=\"250\" width=\"240\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--data\"></rect><text x=\"1030\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Dados e serviços</text><text x=\"1030\" y=\"315\" text-anchor=\"middle\">Private Endpoint</text><text x=\"1030\" y=\"340\" text-anchor=\"middle\">Banco • Storage</text><text x=\"1030\" y=\"365\" text-anchor=\"middle\">IAM • Criptografia</text>\n      <rect x=\"310\" y=\"250\" width=\"230\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--control\"></rect><text x=\"425\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Controles</text><text x=\"425\" y=\"315\" text-anchor=\"middle\">Segmentação</text><text x=\"425\" y=\"340\" text-anchor=\"middle\">Egress control</text><text x=\"425\" y=\"365\" text-anchor=\"middle\">SG/NSG/NACL</text>\n      <rect x=\"30\" y=\"250\" width=\"220\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--ops\"></rect><text x=\"140\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">DevSecOps</text><text x=\"140\" y=\"315\" text-anchor=\"middle\">IaC • Pipeline</text><text x=\"140\" y=\"340\" text-anchor=\"middle\">Policy as code</text><text x=\"140\" y=\"365\" text-anchor=\"middle\">Rollback</text>\n      <rect x=\"120\" y=\"500\" width=\"300\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--telemetry\"></rect><text x=\"270\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">Telemetria</text><text x=\"270\" y=\"565\" text-anchor=\"middle\">Flow • DNS • Proxy • WAF</text><text x=\"270\" y=\"590\" text-anchor=\"middle\">EDR • Cloud audit • PCAP</text><text x=\"270\" y=\"615\" text-anchor=\"middle\">Billing • Métricas</text>\n      <rect x=\"500\" y=\"500\" width=\"300\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--soc\"></rect><text x=\"650\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">SOC / War Room</text><text x=\"650\" y=\"565\" text-anchor=\"middle\">Hipótese → Evidência</text><text x=\"650\" y=\"590\" text-anchor=\"middle\">Mitigação • RCA</text><text x=\"650\" y=\"615\" text-anchor=\"middle\">Playbooks</text>\n      <rect x=\"880\" y=\"500\" width=\"250\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--governance\"></rect><text x=\"1005\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">Governança</text><text x=\"1005\" y=\"565\" text-anchor=\"middle\">Risco • Custo</text><text x=\"1005\" y=\"590\" text-anchor=\"middle\">Exceções • Auditoria</text><text x=\"1005\" y=\"615\" text-anchor=\"middle\">Melhoria contínua</text>\n      <line x1=\"250\" y1=\"105\" x2=\"310\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"540\" y1=\"105\" x2=\"600\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"850\" y1=\"105\" x2=\"910\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <line x1=\"725\" y1=\"170\" x2=\"725\" y2=\"250\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"850\" y1=\"325\" x2=\"910\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"540\" y1=\"325\" x2=\"600\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"250\" y1=\"325\" x2=\"310\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <line x1=\"425\" y1=\"400\" x2=\"270\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"725\" y1=\"400\" x2=\"650\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"1030\" y1=\"400\" x2=\"1005\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"420\" y1=\"565\" x2=\"500\" y2=\"565\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"800\" y1=\"565\" x2=\"880\" y2=\"565\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <path d=\"M1005 630 C900 690, 350 690, 270 630\" class=\"svg-arrow svg-arrow--dashed\" marker-end=\"url(#arrow1712)\"></path>\n    </svg>\n  </div>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>Resumo</h2>\n  <ul>\n    <li>O capstone consolida o curso: redes físicas e lógicas, protocolos, wireless, cloud networking, segurança, troubleshooting, DFIR, DevSecOps, governança, custo e portfólio.</li>\n    <li>Você entrega um dossiê com 12 artefatos (D01–D12) que prova que a arquitetura é conectável, defensável, diagnosticável e governável.</li>\n    <li>O incidente simulado (503 intermitente, lentidão VPN e egress anômalo) é investigado com matriz hipótese-evidência, mitigação que preserva evidências e RCA com causa técnica e causa sistêmica.</li>\n    <li>A avaliação combina a rubrica de 100 pontos (mínimo 80) com a matriz de competências C01–C08: nota alta não esconde competência abaixo do mínimo.</li>\n    <li>Toda lacuna vira erro classificado, mini laboratório e reteste com prazo, e o dossiê sanitizado vira seu portfólio.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>Próximo tema</h2>\n  <p>Esta aula encerra o curso Redes e Network. O dossiê que você produziu é a ponte para os cursos de Infraestrutura Moderna, Platform Engineering e DevSecOps e de Enterprise Identity/IAM, e para trilhas futuras de Cloud Security, Observabilidade/SRE e Sistemas Operacionais.</p>\n</section>\n"
  },
  "lab": {
    "id": "lab-17.12",
    "title": "Laboratório Capstone — 12 entregáveis objetivos de arquitetura, defesa e diagnóstico ponta a ponta",
    "labType": "cloud",
    "objective": "Produzir e defender um dossiê final com 12 entregáveis obrigatórios: arquitetura, endereçamento, matriz de fluxos, firewall, DNS, VPN/acesso remoto, cloud, observabilidade, testes, troubleshooting, RCA e rubrica objetiva.",
    "scenario": "Projeto de arquitetura e investigação: você produz um dossiê com arquitetura alvo, matriz de fluxos, desenho defensivo, plano de observabilidade, playbooks, simulação de incidente, RCA e roadmap de melhoria. O dossiê precisa ser legível para três públicos: um engenheiro de rede, um analista de segurança e um gestor que precisa entender risco, custo e continuidade.",
    "topology": "Empresa fictícia com matriz, filial, Wi-Fi corporativo, Wi-Fi convidado, usuários remotos, VPN/link dedicado, hub-spoke cloud, aplicação web publicada, cluster Kubernetes, banco gerenciado via endpoint privado, SOC e pipeline DevSecOps.",
    "architecture": "Arquitetura em camadas: conectividade, segmentação, publicação de serviços, acesso privado, egress control, telemetria, resposta a incidentes, governança e melhoria contínua.",
    "prerequisites": [
      "Simulado final e relatório de lacunas da aula 17.11 (pacote de entrada do capstone).",
      "Módulos M14 (cloud networking), M15 (troubleshooting e RCA) e M16 (segurança defensiva)."
    ],
    "tools": [
      "Editor de texto ou planilha para matrizes e tabelas",
      "Ferramenta de desenho, SVG ou ASCII para os diagramas",
      "Terminal Linux para os testes e os comandos do runbook",
      "Ambiente Kubernetes local (opcional)",
      "Conta cloud de laboratório (opcional; o desenho arquitetural equivalente basta)"
    ],
    "estimatedTimeMinutes": 220,
    "cost": "Zero como desenho, simulação local e dados sintéticos; pago só se você optar por reproduzir partes em cloud real autorizada (veja os cuidados de limpeza abaixo).",
    "safetyNotes": [
      "Trabalhe com desenho, simulação local e dados sintéticos; não execute ataque nem testes em ambientes de terceiros.",
      "Não crie recursos cloud reais sem autorização explícita, orçamento e tag de laboratório.",
      "Se usar cloud real, registre região, recurso, dono, custo estimado e o procedimento de destruição; ao final, remova NAT Gateway, firewall gerenciado, load balancer, IP público, endpoints, clusters, discos e logs temporários.",
      "Guarde só evidências sanitizadas, sem tokens, chaves, IPs sensíveis, nomes reais de clientes ou dados pessoais."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir cenário e premissas",
        "instruction": "Descreva a empresa, usuários, localidades, aplicações críticas, requisitos de disponibilidade, restrições de custo, requisitos de compliance e limites do projeto.",
        "artifact": "Base do D01 e do README do dossiê.",
        "expectedOutput": "Documento de escopo com premissas explícitas."
      },
      {
        "number": 2,
        "title": "Criar inventário e criticidade",
        "instruction": "Liste ativos: usuários, VLANs, subnets, servidores, aplicações, bancos, endpoints privados, contas cloud, clusters, firewalls, DNS, VPN e logs.",
        "artifact": "Base do D01 e do D02.",
        "expectedOutput": "Inventário com dono, criticidade, exposição, dependência e evidência esperada."
      },
      {
        "number": 3,
        "title": "Desenhar plano CIDR, zonas e segmentação",
        "instruction": "Defina blocos CIDR, VLANs, subnets cloud, gateways, reservas de crescimento, zonas de segurança e fronteiras entre usuário, gestão, dados, aplicação, convidados, remotos e workloads críticos.",
        "artifact": "D02 — Plano de endereçamento.",
        "expectedOutput": "Mapa de zonas e endereçamento sem sobreposição."
      },
      {
        "number": 4,
        "title": "Montar matriz de fluxos e política de firewall",
        "instruction": "Crie a matriz com uma linha por fluxo legítimo. Depois derive dela a política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem das regras sem shadowing, tráfego de retorno e exceções com dono e expiração.",
        "command": "Origem | Destino | Protocolo | Porta | Justificativa | Controle | Log esperado | Dono | Criticidade | Risco residual",
        "artifact": "D03 — Matriz de fluxos e D04 — Política de firewall.",
        "expectedOutput": "Matriz de fluxos aprovada para a arquitetura alvo e política coerente com ela."
      },
      {
        "number": 5,
        "title": "Escrever o plano DNS",
        "instruction": "Defina zonas públicas e privadas, split-horizon, delegação, registros críticos (como api.interno.corp) e como clientes VPN resolvem nomes internos. Para cada resolução crítica, registre a evidência de troubleshooting que a comprova.",
        "artifact": "D05 — Plano DNS.",
        "expectedOutput": "DNS público e privado separados e testáveis."
      },
      {
        "number": 6,
        "title": "Definir o acesso remoto/VPN",
        "instruction": "Especifique autenticação forte (MFA), perfis, rotas entregues ao cliente (split tunnel ou túnel completo), DNS entregue, logs, procedimento de troubleshooting e fallback.",
        "artifact": "D06 — Plano VPN/acesso remoto.",
        "expectedOutput": "Acesso remoto com rotas, DNS, MFA, logs e fallback documentados."
      },
      {
        "number": 7,
        "title": "Desenhar conectividade híbrida e cloud",
        "instruction": "Inclua VPN ou link dedicado, BGP, route tables, UDR, hub-spoke, firewall central, NAT, Private Endpoint/Private Link, DNS privado e DNS público. Estime os custos recorrentes: NAT, egress, logs, firewall, transit e retenção.",
        "artifact": "D07 — Desenho cloud/híbrido.",
        "expectedOutput": "Arquitetura híbrida com roteamento, DNS e custos coerentes."
      },
      {
        "number": 8,
        "title": "Publicar serviço web seguro",
        "instruction": "Desenhe DNS público, CDN/WAF, Load Balancer, TLS, health checks, Ingress, backend privado e dependências privadas.",
        "artifact": "Borda pública do D01 e do D07.",
        "expectedOutput": "Fluxo da aplicação web publicado com controles e logs."
      },
      {
        "number": 9,
        "title": "Projetar egress control e detecção",
        "instruction": "Defina como workloads saem para a internet, quais destinos são permitidos, onde ficam proxy/firewall/NAT, quais logs entram no SIEM e quais alertas detectam anomalias.",
        "artifact": "D07 (egress) e D08 (detecção).",
        "expectedOutput": "Plano de egress control e detecção comportamental."
      },
      {
        "number": 10,
        "title": "Definir observabilidade e retenção",
        "instruction": "Especifique flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, Kubernetes audit, EDR, SIEM, métricas de custo e retenção mínima.",
        "artifact": "D08 — Plano de observabilidade.",
        "expectedOutput": "Plano de evidências para operação, segurança, DFIR, auditoria e FinOps."
      },
      {
        "number": 11,
        "title": "Planejar e registrar os testes ponta a ponta",
        "instruction": "Monte a tabela de testes cobrindo DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado. Sem ambiente real, descreva o teste e a saída esperada (simulação documental).",
        "command": "Teste | Resultado esperado | Resultado obtido | Evidência | Decisão",
        "artifact": "D09 — Evidências de testes.",
        "expectedOutput": "Tabela de testes preenchida, com evidência para cada linha."
      },
      {
        "number": 12,
        "title": "Simular o incidente",
        "instruction": "Use o pacote sintético abaixo (todos os registros são fictícios e sanitizados) ou crie o seu com os mesmos três sintomas: erro intermitente web, lentidão VPN e egress anômalo. Não execute ataque; trabalhe só com evidências simuladas ou sanitizadas.",
        "command": "LINHA DO TEMPO (fictícia)\n08:40  mudança de rota cloud aprovada em janela de laboratório\n09:05  usuários remotos relatam lentidão ao acessar aplicação interna\n09:18  WAF/LB registra aumento de HTTP 503 intermitente\n09:27  flow log mostra egress acima do baseline a partir de workload privado\n09:35  DNS privado dá respostas inconsistentes para serviço interno em uma origem\n09:50  equipe abre war room e cria a matriz hipótese-evidência\n10:20  mitigação reduz impacto sem destruir evidências\n11:00  RCA separa causa técnica, causa sistêmica e ações preventivas\n\nDNS\n2026-07-01T09:34:11Z client=10.20.8.45 query=api.interno.corp type=A answer=10.40.3.21 view=private rcode=NOERROR ttl=30\n2026-07-01T09:34:12Z client=10.88.4.17 query=api.interno.corp type=A answer=198.51.100.44 view=public rcode=NOERROR ttl=300\nFLOW\nstart=2026-07-01T09:27:00Z src=10.40.3.21 dst=203.0.113.80 proto=tcp dport=443 bytes_out=9845120 action=allow tag=egress-anomaly\nstart=2026-07-01T09:28:00Z src=10.40.3.21 dst=203.0.113.80 proto=tcp dport=443 bytes_out=10022744 action=allow tag=egress-anomaly\nWAF\ntime=2026-07-01T09:18:31Z host=app.exemplo.test path=/api/pedidos status=503 upstream_status=unhealthy request_id=req-1712-a\ntime=2026-07-01T09:19:03Z host=app.exemplo.test path=/health status=200 upstream_status=healthy request_id=req-1712-b\nVPN\ntime=2026-07-01T09:05:00Z user=usuario.remoto group=vpn-corp assigned_routes=10.0.0.0/8 dns=10.10.10.10 latency_ms=240 warning=high_latency\ntime=2026-07-01T09:06:30Z user=usuario.remoto split_tunnel=true route_missing=10.40.0.0/16 result=partial_connectivity",
        "expectedOutput": "Pacote de incidente com sintomas, horários, logs sintéticos e hipóteses iniciais."
      },
      {
        "number": 13,
        "title": "Executar a matriz hipótese-evidência",
        "instruction": "Monte hipóteses para DNS, rota, firewall, TLS, WAF, LB, Kubernetes, VPN, C2, exfiltração e custo, e relacione cada uma a fontes de evidência e a uma conclusão. Depois transforme a matriz em runbook: árvore de decisão, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
        "command": "Hipótese | Fonte de evidência | Achado | Lacuna | Conclusão (confirmada, descartada ou aberta)",
        "artifact": "D10 — Runbook de troubleshooting.",
        "expectedOutput": "Dossiê de investigação com hipóteses classificadas e runbook reutilizável."
      },
      {
        "number": 14,
        "title": "Criar mitigação, rollback e RCA",
        "instruction": "Proponha mitigação mínima, plano de rollback, comunicação técnica e executiva, causa técnica, causa sistêmica e ações preventivas com dono e prazo (backlog preventivo). Escreva o RCA em duas versões: técnica e executiva.",
        "artifact": "D11 — RCA do incidente simulado.",
        "expectedOutput": "RCA completo e plano de melhoria pós-incidente."
      },
      {
        "number": 15,
        "title": "Preparar o portfólio final",
        "instruction": "Organize README, diagramas, matrizes, playbooks, RCA, checklist, riscos residuais, custos estimados e aprendizados. Sanitize os dados sensíveis.",
        "expectedOutput": "Dossiê final publicável ou apresentável em entrevista técnica."
      },
      {
        "number": 16,
        "title": "Preencher a matriz de competências",
        "instruction": "Preencha a matriz C01–C08 do Conceito: para cada competência, registre pontuação, confiança, evidência coletada e lacuna principal. Registre a confiança antes de conferir a correção e de novo depois.",
        "command": "Competência | Evidência | Pontuação | Confiança | Lacuna | Ação de revisão | Reteste",
        "artifact": "D12 (parte 1).",
        "expectedOutput": "Matriz preenchida com pelo menos uma evidência por competência.",
        "explanation": "A avaliação deixa de ser uma nota única e mostra onde você domina e onde precisa revisar."
      },
      {
        "number": 17,
        "title": "Classificar erros e hipóteses de aprendizagem",
        "instruction": "Para cada erro encontrado na autoavaliação, na rubrica ou na defesa, classifique a causa: E-CONCEITO (decorou o termo, mas não explica por que ele existe ou como funciona); E-CAMADA (confundiu camada 2, camada 3, transporte, aplicação ou controle de segurança); E-COMANDO (não soube escolher o comando, log, métrica ou pacote que confirma a hipótese); E-ARQUITETURA (a solução funciona isolada, mas ignora fluxo, dependência, custo, segurança ou operação); E-SEGURANCA (confundiu conectividade com autorização, ignorou telemetria ou propôs exceção insegura); E-COMUNICACAO (não explicou impacto, decisão, rollback ou risco residual para outro público).",
        "command": "Erro | Resposta dada | Resposta correta | Causa | Competência | Aula de revisão | Evidência nova",
        "artifact": "D12 (parte 2).",
        "expectedOutput": "Lista de erros convertida em backlog de revisão objetivo.",
        "explanation": "Erro sem classificação vira repetição; erro classificado vira plano de estudo e prática."
      },
      {
        "number": 18,
        "title": "Aplicar a rubrica e decidir",
        "instruction": "Some os oito critérios da rubrica de 100 pontos e aplique a regra de decisão do Conceito: aprovado, aprovado com ressalvas ou refazer competência crítica.",
        "command": "Pontuação final = soma dos critérios; decisão = aprovado | aprovado com ressalvas | refazer competência crítica",
        "artifact": "D12 (parte 3).",
        "expectedOutput": "Rubrica preenchida, decisão explícita e justificativa técnica.",
        "explanation": "Você defende a própria conclusão, como numa revisão técnica, banca ou auditoria."
      },
      {
        "number": 19,
        "title": "Criar trilha de revisão e reteste",
        "instruction": "Para cada competência abaixo do mínimo, defina: revisão dos módulos da coluna Módulos com recuperação ativa (não releitura passiva), um mini laboratório que gere a evidência esperada da competência, uma questão de reteste e o prazo. Refaça só as questões e tarefas da competência após 24–48 horas, registrando a confiança antes de corrigir.",
        "command": "Competência fraca | Aula de revisão | Mini lab | Reteste | Prazo | Evidência esperada",
        "artifact": "D12 (parte 4).",
        "expectedOutput": "Plano de revisão com ações executáveis em vez de releitura genérica."
      }
    ],
    "expectedResult": "Dossiê capstone completo e sanitizado com os 12 entregáveis D01–D12, a matriz de competências C01–C08, a rubrica preenchida com a decisão final, os erros classificados e o plano de revisão e reteste.",
    "validation": [
      "D01–D12: cada entregável tem evidência, dono e critério de aceite. Se faltar algum, registre a pendência e corrija antes de concluir.",
      "Nenhum fluxo any-any permanece sem justificativa, expiração e dono.",
      "DNS público e privado estão separados e testáveis.",
      "O acesso remoto/VPN tem rotas, DNS, MFA, logs e fallback documentados.",
      "O desenho cloud/híbrido inclui Private Endpoint/Private Link, egress, route tables, custos e limpeza.",
      "A observabilidade cobre operação, segurança, DFIR, auditoria e FinOps.",
      "O RCA tem timeline, causa técnica, causa sistêmica, mitigação e prevenção.",
      "A matriz C01–C08 tem evidência por competência. Se falhar, volte ao lab ou ao simulado e registre a evidência que falta.",
      "A rubrica soma 100 pontos e a decisão segue a regra do Conceito (mínimo de 80 pontos). Se falhar, crie a trilha de revisão antes de marcar a aula como concluída.",
      "Cada lacuna crítica tem ação prática, reteste em 24–48 h e prazo. Se falhar, transforme lacunas genéricas em tarefas concretas.",
      "Na defesa, você explica decisões, alternativas rejeitadas e riscos residuais.",
      "O plano de melhoria está priorizado por risco, custo e esforço."
    ],
    "troubleshooting": [
      "A arquitetura ficou grande demais para o tempo disponível: reduza o desenho mantendo pelo menos um fluxo web, um fluxo privado, um fluxo remoto e um fluxo de egress.",
      "Falta evidência para uma decisão: volte ao plano de observabilidade (D08) antes de concluir o RCA.",
      "Uma regra ampla parece necessária: documente risco, alternativa, prazo e dono da exceção.",
      "Os custos ficaram invisíveis: inclua NAT, egress, logs, firewall, transit e retenção no D07.",
      "O diagnóstico ficou opinativo: reestruture em matriz hipótese-evidência."
    ],
    "improvements": [
      "Versionar o dossiê como repositório de portfólio com README, diagramas SVG e dados sanitizados.",
      "Criar módulos IaC fictícios para rede, logs e controles defensivos.",
      "Converter a matriz de fluxos e as políticas em testes de policy as code que bloqueiem exposição pública indevida.",
      "Repetir a simulação de war room periodicamente, com novos sintomas e logs sintéticos.",
      "Adicionar orçamento FinOps para NAT, egress, firewall, logs, retenção e tráfego entre regiões.",
      "Dar pesos às competências conforme seu objetivo profissional.",
      "Repetir a autoavaliação após uma semana para medir a retenção real."
    ],
    "evidenceToCollect": [
      "Os 12 entregáveis D01–D12 (tabela do Conceito).",
      "Resumo do cenário e das premissas.",
      "Tabela de testes ponta a ponta com resultado esperado, resultado obtido, evidência e decisão.",
      "Matriz hipótese-evidência do incidente simulado.",
      "Matriz de competências C01–C08, com a confiança antes e depois da correção.",
      "Rubrica com pontuação, decisão e justificativa.",
      "Lista de erros por taxonomia.",
      "Plano de revisão com mini laboratórios e resultado do reteste (ou critério da próxima tentativa).",
      "Checklist de limpeza e custo, quando houver qualquer recurso cloud real."
    ],
    "questions": [
      "Qual entregável é o mais fraco e que evidência objetiva falta para aprová-lo?",
      "Qual fluxo legítimo não está bem justificado na matriz de fluxos?",
      "Qual controle de firewall ou egress depende de exceção temporária e quem é o dono dela?",
      "Qual fonte de log provaria ou refutaria a hipótese principal do incidente?",
      "Qual competência ficou mais fraca e qual evidência prova isso?",
      "Qual erro foi conceitual e qual foi falta de diagnóstico por evidência?",
      "Qual risco residual permanece mesmo após a correção?"
    ]
  },
  "quiz": [
    {
      "id": "q6",
      "question": "No pacote do incidente, para o mesmo nome api.interno.corp, o cliente 10.20.8.45 recebe 10.40.3.21 (view=private, TTL 30) e o cliente 10.88.4.17 recebe 198.51.100.44 (view=public, TTL 300). Qual hipótese esse par de registros sustenta primeiro?",
      "options": [
        "Exfiltração confirmada a partir do workload privado",
        "Certificado TLS expirado no Load Balancer",
        "Health check do backend mal configurado",
        "Uma origem está recebendo a view pública do DNS (split-horizon ou resolver errado)"
      ],
      "answer": 3,
      "explanation": "As duas respostas vêm de views diferentes para o mesmo nome: uma origem resolve o IP público e não alcança o backend privado. O TTL de 300 s mantém a resposta errada em cache por até 5 minutos depois da correção."
    },
    {
      "id": "1",
      "question": "Por que a matriz de fluxos é um entregável central do capstone?",
      "options": [
        "Porque substitui logs",
        "Porque permite justificar origem, destino, porta, protocolo, controle, evidência e risco",
        "Porque elimina a necessidade de firewall",
        "Porque serve apenas para documentação estética"
      ],
      "answer": 1,
      "explanation": "A matriz de fluxos transforma conectividade em decisão auditável e conecta rede, segurança, operação e evidências."
    },
    {
      "id": "2",
      "question": "Em um erro 503 intermitente em aplicação publicada, qual abordagem é mais profissional?",
      "options": [
        "Desativar WAF e TLS imediatamente",
        "Abrir todas as portas do backend",
        "Correlacionar DNS, LB, health check, WAF, Ingress, backend, logs e mudanças recentes",
        "Assumir que é problema de usuário"
      ],
      "answer": 2,
      "explanation": "Erros web dependem de uma cadeia. A investigação deve correlacionar componentes antes de alterar controles."
    },
    {
      "id": "3",
      "question": "Qual decisão reduz exposição de serviços gerenciados em cloud?",
      "options": [
        "Colocar banco com IP público temporariamente",
        "Usar endpoint privado com DNS privado e controle de IAM",
        "Permitir acesso direto da internet para facilitar suporte",
        "Remover logs para reduzir ruído"
      ],
      "answer": 1,
      "explanation": "Endpoint privado com DNS privado, IAM e logs reduz exposição e mantém rastreabilidade."
    },
    {
      "id": "4",
      "question": "O que diferencia um RCA maduro de uma lista de sintomas?",
      "options": [
        "O RCA identifica causa técnica, causa sistêmica, impacto, mitigação, prevenção e evidências",
        "O RCA evita mencionar falhas",
        "O RCA busca culpados",
        "O RCA é sempre curto e sem detalhes técnicos"
      ],
      "answer": 0,
      "explanation": "RCA maduro separa fatos, causa técnica, causa sistêmica, ações e prevenção sem cultura de culpa."
    },
    {
      "id": "5",
      "question": "Por que custos devem aparecer no capstone de redes?",
      "options": [
        "Porque segurança e rede não têm relação com orçamento",
        "Porque NAT, egress, logs, transit, firewall e retenção podem impactar a viabilidade operacional",
        "Porque custo substitui segurança",
        "Porque só cloud pública possui custo"
      ],
      "answer": 1,
      "explanation": "Decisões de rede e observabilidade geram custo recorrente. FinOps faz parte de arquitetura sustentável."
    },
    {
      "id": "q7",
      "question": "Seu dossiê soma 84 pontos, os 12 entregáveis estão presentes e C08 ficou em 74% (mínimo de C08: 80%). Qual é a decisão?",
      "options": [
        "Aprovado sem ressalvas, porque a nota passou de 80",
        "Refazer o capstone inteiro",
        "Aprovado com ressalvas: registrar a lacuna de C08 e cumprir o plano de reteste",
        "Reprovado, porque nenhuma competência pode ficar abaixo de 80%"
      ],
      "answer": 2,
      "explanation": "Nota e entregáveis atendem ao mínimo, mas C08 está abaixo do próprio mínimo (sem cair abaixo de 70%). A regra pede aprovação com ressalvas, lacuna registrada e reteste: nota alta não esconde competência fraca."
    }
  ],
  "flashcards": [
    {
      "front": "Arquitetura diagnosticável",
      "back": "Arquitetura com sinais suficientes para investigar falhas e incidentes por evidência, não por suposição."
    },
    {
      "front": "Matriz de fluxos",
      "back": "Tabela que documenta origem, destino, porta, protocolo, justificativa, controle, evidência, dono e risco residual."
    },
    {
      "front": "Egress control",
      "back": "Conjunto de políticas e pontos de inspeção que governam saídas para internet, SaaS, APIs e outros ambientes."
    },
    {
      "front": "RCA sem culpa",
      "back": "Análise que busca causa técnica e sistêmica, prevenção e melhoria contínua, não culpados individuais."
    },
    {
      "front": "Risco residual",
      "back": "Risco que permanece após controles e é documentado com justificativa, dono, prazo ou aceitação formal."
    },
    {
      "front": "Taxonomia de erros do capstone",
      "back": "E-CONCEITO, E-CAMADA, E-COMANDO (evidência), E-ARQUITETURA, E-SEGURANCA e E-COMUNICACAO: classifica a causa de cada erro para virar revisão dirigida e reteste."
    }
  ],
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Qual parte da sua arquitetura você teria mais dificuldade de defender em uma revisão técnica?",
      "expectedIdeas": [
        "Aponte o entregável específico (por exemplo, D04 ou D07) e a evidência que falta nele.",
        "Diga que alternativa você rejeitou e por quê.",
        "Proponha o que fortaleceria essa parte antes da banca."
      ]
    },
    {
      "type": "cenário",
      "question": "Se amanhã ocorresse um incidente nessa topologia, quais três fontes de evidência seriam indispensáveis?",
      "expectedIdeas": [
        "Flow logs das subnets críticas.",
        "DNS logs com a view (pública ou privada) por origem.",
        "Logs de WAF/LB com o status do upstream, ou de VPN/firewall, conforme o sintoma.",
        "Justifique cada fonte pela hipótese que ela confirma ou nega."
      ]
    },
    {
      "type": "decisão",
      "question": "Qual risco residual você aceitaria temporariamente e qual você consideraria bloqueador de produção?",
      "expectedIdeas": [
        "Risco aceitável temporariamente: tem dono, prazo, monitoramento e mitigação compensatória.",
        "Bloqueador de produção: dado exposto publicamente, any-any sem dono ou fluxo crítico sem logs.",
        "Registre a decisão como risco residual no dossiê."
      ]
    }
  ],
  "exercises": [
    {
      "type": "arquitetura",
      "prompt": "Crie 12 fluxos essenciais para a empresa fictícia, incluindo usuário remoto, aplicação web, banco privado, DNS, egress, administração e logs.",
      "expectedAnswer": "Tabela com origem, destino, porta, protocolo, justificativa, controle, evidência e risco."
    },
    {
      "type": "observabilidade",
      "prompt": "Defina quais logs e métricas seriam necessários para investigar erro 503, lentidão VPN e egress anômalo.",
      "expectedAnswer": "Lista correlacionando WAF/LB/Ingress/app, VPN/firewall/DNS e flow/proxy/EDR/cloud audit/billing."
    },
    {
      "type": "comunicação",
      "prompt": "Escreva duas versões de RCA: uma para engenharia e outra para gestão.",
      "expectedAnswer": "Versão técnica com evidências e causa raiz; versão executiva com impacto, decisão, risco e prevenção."
    },
    {
      "type": "DevSecOps",
      "prompt": "Liste dez validações de pipeline para impedir erros recorrentes de rede e segurança.",
      "expectedAnswer": "Regras sobre CIDR, rotas públicas, SG/NSG, endpoints privados, logs, tags, WAF/TLS, DNS e exceções."
    }
  ],
  "challenge": {
    "title": "Defesa técnica do capstone final",
    "scenario": "Monte e apresente o dossiê final de arquitetura, defesa e diagnóstico ponta a ponta da empresa híbrida (aplicação publicada, workloads privados, usuários remotos, Wi-Fi, cloud, Kubernetes, SOC e incidente simulado). Prepare-se para uma banca que vai perguntar: por que esse CIDR? Por que esse DNS? Por que esse WAF? Por que esse NAT? Como investigar o 503? Como provar que não houve exfiltração? Como reduzir custo sem perder visibilidade? O desafio é de integração, não de memória.",
    "tasks": [
      "Apresentar a arquitetura e defender cada decisão diante da banca.",
      "Responder às perguntas da banca citando o entregável e a evidência que sustentam cada resposta.",
      "Explicar riscos aceitos, riscos mitigados e próximos investimentos recomendados.",
      "Aplicar a rubrica de 100 pontos e a matriz de competências, com feedback por tema e por causa de erro.",
      "Criar trilha de revisão e reteste objetivo para as competências abaixo do mínimo.",
      "Apresentar a decisão final: aprovado, aprovado com ressalvas ou refazer competência crítica."
    ],
    "constraints": [
      "Sem exploração ofensiva.",
      "Sem dados reais sensíveis.",
      "Sem liberar regras amplas como solução definitiva.",
      "Toda exceção tem dono, prazo e justificativa.",
      "Toda conclusão cita evidência ou lacuna.",
      "A aula não está concluída sem a rubrica preenchida.",
      "Resposta decorada sem evidência técnica não conta.",
      "Não avançar com competência crítica abaixo do mínimo sem plano de revisão."
    ],
    "expectedDeliverables": [
      "D01 — Arquitetura lógica ponta a ponta (diagrama SVG ou ASCII)",
      "D02 — Plano de endereçamento",
      "D03 — Matriz de fluxos",
      "D04 — Política de firewall/ACL/SG/NSG/NACL",
      "D05 — Plano DNS",
      "D06 — Plano VPN/acesso remoto",
      "D07 — Desenho cloud/híbrido, com custos e checklist de limpeza",
      "D08 — Plano de observabilidade",
      "D09 — Evidências de testes",
      "D10 — Runbook de troubleshooting",
      "D11 — RCA técnico e executivo do incidente simulado",
      "D12 — Rubrica e matriz de competências preenchidas, com decisão e plano de reteste",
      "Feedback por tema: fundamento, diagnóstico, arquitetura, segurança, cloud e comunicação",
      "Backlog preventivo priorizado por risco, custo e esforço",
      "Portfólio sanitizado"
    ],
    "successCriteria": [
      "Os 12 entregáveis estão completos, coerentes entre si e sustentados por evidência.",
      "Cada competência tem evidência observável e cada erro tem causa classificada.",
      "A rubrica justifica a decisão: aprovado, aprovado com ressalvas ou refazer competência crítica.",
      "O plano de revisão tem tarefa prática e prazo.",
      "O dossiê pode ser apresentado como portfólio sem expor dados sensíveis."
    ],
    "gradingRubric": [
      {
        "criterion": "Arquitetura, endereçamento e segmentação",
        "points": 15,
        "description": "Arquitetura lógica, CIDR, VLANs, subnets, rotas, DNS e zonas coerentes, sem sobreposição e com crescimento reservado."
      },
      {
        "criterion": "Matriz de fluxos e firewall",
        "points": 15,
        "description": "Fluxos legítimos documentados, regras justificadas, ordem/shadowing revisados, retorno tratado e exceções com dono/prazo."
      },
      {
        "criterion": "VPN, acesso remoto e identidade",
        "points": 10,
        "description": "Acesso remoto com MFA, DNS, rotas, perfis, logs, fallback e menor privilégio."
      },
      {
        "criterion": "Cloud networking e custos",
        "points": 12,
        "description": "Hub-spoke, endpoints privados, egress control, route tables, Kubernetes networking, NAT/firewall/logs e limpeza/custo considerados."
      },
      {
        "criterion": "Observabilidade, testes e evidências",
        "points": 15,
        "description": "Flow logs, DNS, proxy, WAF/LB, VPN, cloud audit, SIEM, testes e evidências sanitizadas sustentam decisões."
      },
      {
        "criterion": "Troubleshooting e RCA",
        "points": 15,
        "description": "Timeline, hipótese-evidência, comandos/fontes, mitigação, rollback, causa técnica, causa sistêmica e prevenção."
      },
      {
        "criterion": "Segurança defensiva, governança e risco residual",
        "points": 10,
        "description": "Controles defensivos, escopo autorizado, riscos residuais, exceções, auditoria e backlog priorizado."
      },
      {
        "criterion": "Comunicação, portfólio e melhoria contínua",
        "points": 8,
        "description": "Resumo executivo, defesa técnica, rubrica preenchida, lacunas, reteste e portfólio sanitizado."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "Uma solução madura começa com escopo claro e mapa de ativos. A arquitetura separa matriz, filial, Wi-Fi corporativo, convidados, gestão, servidores, cloud hub, spokes, aplicação web e serviços de dados. O plano CIDR evita sobreposição e deixa crescimento reservado. A aplicação pública usa DNS público, WAF/CDN, Load Balancer, TLS e backends privados. O banco usa endpoint privado e DNS privado. Usuários remotos usam MFA, perfil limitado, DNS interno e rotas específicas. O tráfego de saída passa por controle de egress com logs. A investigação do incidente simulado não assume causa única: compara logs de WAF/LB/Ingress, flow logs, DNS, VPN, firewall, EDR, cloud audit e billing. A mitigação reduz impacto sem destruir evidências. O RCA aponta causa técnica, causa sistêmica, prevenção, dono e prazo. O portfólio final remove dados sensíveis e apresenta decisões, trade-offs e aprendizados. Essa não é a única arquitetura possível, mas mostra o nível esperado: decisões explícitas, trade-offs, riscos residuais, evidências e plano de melhoria. Uma entrega madura também não esconde erro: mostra pontuação, lacuna, causa, evidência, revisão planejada e reteste.",
    "steps": [
      "Leia o DNS: para o mesmo api.interno.corp, 10.20.8.45 recebe a view privada (10.40.3.21, TTL 30) e 10.88.4.17 recebe a view pública (198.51.100.44, TTL 300). Hipótese: split-horizon ou resolver errado para essa origem; com TTL de 300 s, a resposta errada pode persistir em cache por até 5 minutos depois da correção.",
      "Leia a VPN: latência de 240 ms e, no segundo registro, split_tunnel=true com route_missing=10.40.0.0/16 e result=partial_connectivity, ou seja, a rota para a subnet do backend não chegou ao cliente. Compare com a mudança de rota cloud das 08:40.",
      "Leia o WAF/LB: /api/pedidos devolve 503 com upstream_status=unhealthy e, 30 s depois, /health devolve 200 healthy. O backend oscila entre saudável e não saudável: verifique health check, readiness dos pods e a rota alterada antes de mexer em WAF ou TLS.",
      "Leia o flow log: 10.40.3.21, o mesmo IP privado de api.interno.corp, enviou cerca de 10 MB em cada registro de um minuto para 203.0.113.80:443, com action=allow. Isso é anomalia, não prova de exfiltração: confirme com proxy, DNS, EDR, baseline e dono do processo antes de concluir.",
      "Mitigue o mínimo e preserve as evidências: exporte os logs antes de alterar, corrija rota ou DNS com rollback definido e contenha o egress de forma proporcional.",
      "Escreva o RCA separando causa técnica, causa sistêmica (por exemplo, mudança de rota sem teste de DNS e VPN) e ações preventivas com dono e prazo.",
      "Corrija por competência: separe a nota geral do domínio por competência, classifique os erros pela taxonomia, vincule cada lacuna a aulas e mini laboratórios, refaça o reteste após o intervalo e decida pela regra do Conceito."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Passei porque acertei 75%, sem analisar onde errei.",
        "whyItIsWrong": "A pontuação geral pode esconder uma competência crítica fraca, como DNS, rotas, firewall, cloud ou evidência de incidente."
      },
      {
        "answer": "Vou revisar lendo tudo novamente.",
        "whyItIsWrong": "Releitura passiva é pouco diagnóstica. A revisão precisa de erro classificado, exercício ativo, laboratório e reteste."
      },
      {
        "answer": "O capstone está bom porque a arquitetura ficou bonita.",
        "whyItIsWrong": "Arquitetura profissional precisa de fluxos, controles, custos, logs, evidências, rollback e justificativa."
      },
      {
        "answer": "O egress anômalo prova exfiltração; vou bloquear tudo e apagar o workload.",
        "whyItIsWrong": "Anomalia é hipótese. Bloqueio amplo e destruição do workload apagam evidências e podem derrubar serviço legítimo; a contenção precisa ser proporcional e preservar o estado."
      }
    ],
    "finalAnswer": "O capstone está concluído quando os 12 entregáveis estão no dossiê, a rubrica soma 80 pontos ou mais, a matriz C01–C08 tem evidência por competência e toda competência abaixo do mínimo tem erro classificado e plano de revisão e reteste."
  },
  "glossary": [
    {
      "term": "Capstone",
      "definition": "Projeto final integrador usado para demonstrar domínio aplicado de múltiplos temas."
    },
    {
      "term": "Arquitetura ponta a ponta",
      "definition": "Desenho que acompanha o fluxo desde o usuário até a aplicação, dados, controles, logs e operação."
    },
    {
      "term": "Matriz hipótese-evidência",
      "definition": "Instrumento que relaciona possíveis causas a fontes de evidência, achados, lacunas e conclusões."
    },
    {
      "term": "Backlog preventivo",
      "definition": "Lista priorizada de melhorias para reduzir recorrência de falhas, incidentes e riscos."
    },
    {
      "term": "Dossiê de portfólio",
      "definition": "Pacote organizado e sanitizado de artefatos técnicos que demonstra competência profissional."
    },
    {
      "term": "Governança de exceções",
      "definition": "Processo para registrar, aprovar, expirar e revisar desvios temporários de políticas e padrões."
    }
  ],
  "references": [
    {
      "title": "NIST Cybersecurity Framework 2.0",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Referência para governança, identificação, proteção, detecção, resposta e recuperação."
    },
    {
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "note": "Base para resposta a incidentes integrada à gestão de risco."
    },
    {
      "title": "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "note": "Referência para planejamento, condução e reporte de avaliações técnicas autorizadas."
    },
    {
      "title": "AWS Well-Architected Framework",
      "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html",
      "note": "Referência de pilares para arquitetura cloud segura, confiável, eficiente e otimizada."
    },
    {
      "title": "Azure Well-Architected Framework",
      "url": "https://learn.microsoft.com/en-us/azure/well-architected/",
      "note": "Referência de revisão arquitetural para workloads Azure."
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "note": "Referência para validações defensivas e estruturadas em aplicações web."
    },
    {
      "type": "internal-course",
      "title": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "organization": "Deixando de ser TBN",
      "note": "Pré-requisito recomendado para transformar o capstone em IaC, pipelines e operação contínua."
    },
    {
      "type": "internal-course",
      "title": "Enterprise Identity, IAM e Segurança de Acessos",
      "organization": "Deixando de ser TBN",
      "note": "Pré-requisito recomendado para aprofundar MFA, RBAC, identidade de workload e Zero Trust."
    }
  ],
  "security": {
    "goodPractices": [
      "Executar o capstone em ambiente controlado, documentado e sem impacto em terceiros.",
      "Usar no dossiê só dados sintéticos ou sanitizados.",
      "Dar a toda exceção de firewall ou egress um dono, uma justificativa e uma data de expiração.",
      "Coletar e exportar evidências antes de qualquer mitigação.",
      "Consolidar o portfólio com entregáveis verificáveis e limites éticos claros."
    ],
    "badPractices": [
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta, sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar várias mudanças ao mesmo tempo e perder a rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante."
    ],
    "vulnerabilities": [
      {
        "name": "Aprovação sem evidência",
        "description": "O capstone é aprovado por nota geral ou por um diagrama bem desenhado, sem matriz de fluxos, testes, logs e RCA que sustentem as decisões.",
        "defensiveExplanation": "Quem só responde definições não demonstra validação operacional; a banca precisa ver diagrama, matriz de fluxos, comandos, logs, RCA e rubrica.",
        "mitigation": "Exigir os 12 entregáveis, a rubrica de 100 pontos, a matriz C01–C08 com evidências sanitizadas e o plano de reteste antes de concluir."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      }
    ],
    "monitoring": [
      "Flow logs das subnets críticas, com bytes de saída por workload e destino.",
      "DNS logs com a view (pública ou privada) e o resolver usados por origem.",
      "Logs de WAF/LB com status HTTP e saúde do upstream.",
      "Logs de VPN com rotas atribuídas, DNS entregue e latência.",
      "Eventos de mudança (deploy, IaC, configuração manual) e custo de NAT/egress correlacionados no tempo."
    ],
    "hardening": [
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente."
    ],
    "detectionIdeas": [
      "Comparar o comportamento atual com o baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Alertar quando um workload privado envia volume acima do baseline para um destino externo novo (como 10.40.3.21 → 203.0.113.80 no incidente)."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "A aplicação web devolve 503 de forma intermitente, mas /health às vezes responde 200.",
      "Usuários remotos têm lentidão ou alcançam só parte dos serviços internos.",
      "O mesmo nome interno resolve para IPs diferentes conforme a origem.",
      "Um workload privado envia volume de saída acima do baseline para um destino externo.",
      "O dossiê tem diagrama, mas não tem validação nem evidências."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "A mudança de rota das 08:40 coincide com o início dos sintomas?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz o impacto sem ampliar o risco de segurança nem apagar evidências?"
    ],
    "commands": [
      {
        "platform": "Linux/macOS",
        "command": "dig +short api.interno.corp @10.10.10.10",
        "purpose": "Ver o que o resolver entregue pela VPN (dns=10.10.10.10 no pacote) responde para o nome interno.",
        "expectedObservation": "O IP privado do serviço (10.40.3.21 no pacote do incidente).",
        "interpretation": "Se vier o IP público (198.51.100.44), o cliente está na view errada: investigue split-horizon, resolver configurado e cache (TTL)."
      },
      {
        "platform": "Linux",
        "command": "ip route get 10.40.3.21",
        "purpose": "Descobrir por qual interface e gateway o cliente alcança o backend.",
        "expectedObservation": "Saída pela interface do túnel VPN.",
        "interpretation": "Se sair pelo gateway local, a rota para 10.40.0.0/16 não foi entregue (split tunnel incompleto): corrija o perfil de rotas da VPN."
      },
      {
        "platform": "Linux/macOS",
        "command": "curl -sv -o /dev/null https://app.exemplo.test/api/pedidos",
        "purpose": "Separar falha de DNS, TCP, TLS e HTTP numa única chamada.",
        "expectedObservation": "Handshake TLS concluído e status HTTP 200.",
        "interpretation": "TLS concluído com status 503 aponta para backend ou health check, não para a rede nem para o certificado: compare com os logs de WAF/LB pelo horário."
      },
      {
        "platform": "Kubernetes",
        "command": "kubectl get endpoints <serviço> -n <namespace>",
        "purpose": "Ver se o Service tem pods prontos atrás dele.",
        "expectedObservation": "Endereços de pods listados na coluna ENDPOINTS.",
        "interpretation": "Lista vazia ou oscilando indica pods falhando no readiness: o Ingress/LB fica sem backend saudável e devolve 503."
      }
    ],
    "decisionTree": [
      {
        "if": "O problema ocorre para todos os usuários e todas as origens",
        "then": "Priorizar serviço, DNS global, mudança central, firewall compartilhado, cloud regional ou dependência comum."
      },
      {
        "if": "O problema ocorre apenas para uma origem, filial, subnet ou usuário",
        "then": "Priorizar rota, política local, DNS específico, VPN, segmentação, identidade ou configuração do cliente."
      },
      {
        "if": "Funciona por IP, mas falha por nome",
        "then": "Investigar DNS, split-horizon, cache, search suffix, resolver usado e registros privados/públicos."
      },
      {
        "if": "Conecta, mas falha após handshake ou autenticação",
        "then": "Investigar TLS, proxy, WAF, identidade, autorização, cabeçalhos, sessão e logs de aplicação."
      },
      {
        "if": "A evidência aponta para mudança recente",
        "then": "Comparar antes/depois, avaliar rollback seguro, registrar impacto e transformar causa em controle preventivo."
      }
    ]
  },
  "progressRules": {
    "completeWhen": {
      "deliverablesMarked": true,
      "rubricCompleted": true,
      "selfAssessmentDone": true,
      "capstoneDossierComplete": true,
      "rcaCompleted": true,
      "finalScoreAtLeast": 80
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": []
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud, Kubernetes e Platform Engineering",
      "lesson": "Kubernetes Service, Ingress, NetworkPolicy e GitOps",
      "reason": "O capstone usa Kubernetes networking, Ingress, NetworkPolicy, IaC, policy as code e rollback operacional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e automação",
      "lesson": "Logs, métricas, traces, incident response e RCA",
      "reason": "O plano de observabilidade, war room, rollback e RCA dependem de práticas de SRE e operação moderna."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "IAM corporativo, federação e acesso remoto",
      "lesson": "MFA, RBAC, service principals, workload identity e acesso mínimo",
      "reason": "O capstone usa MFA, identidade, menor privilégio, workloads privados e controles de acesso em cloud."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust e governança de acessos",
      "lesson": "Políticas condicionais, revisão de acesso e evidências de auditoria",
      "reason": "A defesa técnica precisa provar quem acessa o quê, por qual caminho, com qual autorização e com quais logs."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    }
  ]
};
