export const lesson1712 = {
  "id": "17.12",
  "moduleId": "m17",
  "order": 12,
  "title": "Projeto final capstone: arquitetura, defesa e diagnóstico ponta a ponta",
  "subtitle": "Construa, defenda e diagnostique uma arquitetura corporativa híbrida, segura, observável e governável, consolidando todo o curso Redes e Network.",
  "duration": "490-695 min",
  "estimatedStudyTimeMinutes": 695,
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
    "P1-11",
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
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>Motivação</h2>\n  <p>Um profissional de redes não é avaliado por saber o que é VLAN, DNS, TLS, BGP ou VPC. Ele é avaliado por desenhar um ambiente coerente, defendê-lo contra riscos previsíveis, diagnosticar falhas sob pressão e explicar as decisões para pessoas técnicas e não técnicas.</p>\n  <p>O capstone junta o curso inteiro numa só entrega: wireless, segurança de redes, cloud networking, troubleshooting, segurança defensiva e a auditoria de lacunas da aula anterior. A pergunta deixa de ser “você lembra o conceito?” e passa a ser “você consegue construir, justificar, validar, operar e melhorar uma arquitetura ponta a ponta?”. Você sai daqui com um dossiê de 12 entregáveis, avaliado por rubrica, que também serve de portfólio.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> uma rede profissional transporta tráfego, impõe controles, gera evidências, consome orçamento e precisa sobreviver a falhas, mudanças e incidentes.</div>\n</section>\n",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>Problema</h2>\n  <p>A empresa fictícia do capstone cresceu rápido. Ela tem matriz, filial, funcionários remotos, Wi-Fi corporativo, aplicações internas, uma aplicação web publicada, workloads em cloud, cluster Kubernetes, banco gerenciado, pipelines DevSecOps e um SOC em amadurecimento. Tudo funciona, mas a arquitetura está fragmentada: subnets mal documentadas, exceções de firewall, DNS híbrido pouco claro, logs incompletos, endpoints públicos desnecessários e custo de egress crescendo.</p>\n  <p>Num incidente recente, usuários remotos relataram lentidão, a aplicação web apresentou erros 503 intermitentes e o SOC observou tráfego incomum saindo de um workload. A causa ainda não está clara: falha operacional, mudança mal aplicada, DNS, rota assimétrica, regra de firewall, health check incorreto, processo legítimo ruidoso, C2, exfiltração ou uma combinação de fatores.</p>\n  <p>Sua tarefa é redesenhar a arquitetura, defender os fluxos críticos, investigar o incidente e produzir artefatos auditáveis. “Liberar tudo para funcionar” não é solução: a resposta precisa equilibrar conectividade, segurança, custo, operação e capacidade investigativa.</p>\n  <h3>Pacote do incidente simulado</h3>\n  <p>Este é o material de partida dos passos de incidente do laboratório. Todos os registros são fictícios e sanitizados, para uso em análise defensiva, RCA e treinamento.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Horário</th><th>Evento</th></tr></thead>\n    <tbody>\n      <tr><td>08:40</td><td>Mudança de rota cloud aprovada em janela de laboratório.</td></tr>\n      <tr><td>09:05</td><td>Usuários remotos relatam lentidão ao acessar aplicação interna.</td></tr>\n      <tr><td>09:18</td><td>WAF/LB registra aumento de HTTP 503 intermitente.</td></tr>\n      <tr><td>09:27</td><td>Flow log mostra egress acima do baseline a partir de workload privado.</td></tr>\n      <tr><td>09:35</td><td>DNS privado dá respostas inconsistentes para serviço interno em uma origem.</td></tr>\n      <tr><td>09:50</td><td>Equipe abre war room e cria matriz hipótese-evidência.</td></tr>\n      <tr><td>10:20</td><td>Mitigação reduz impacto sem destruir evidências.</td></tr>\n      <tr><td>11:00</td><td>RCA separa causa técnica, causa sistêmica e ações preventivas.</td></tr>\n    </tbody>\n  </table></div>\n  <p>Das 09:50 em diante, a linha do tempo marca as etapas de resposta que o seu dossiê precisa documentar (runbook D10 e RCA D11). Os logs sintéticos do período:</p>\n  <pre class=\"code-block\"><code># DNS\n2026-07-01T09:34:11Z client=10.20.8.45 query=api.interno.corp type=A answer=10.40.3.21 view=private rcode=NOERROR ttl=30\n2026-07-01T09:34:12Z client=10.88.4.17 query=api.interno.corp type=A answer=198.51.100.44 view=public rcode=NOERROR ttl=300\n\n# Flow\nstart=2026-07-01T09:27:00Z src=10.40.3.21 dst=203.0.113.80 proto=tcp dport=443 bytes_out=9845120 action=allow tag=egress-anomaly\nstart=2026-07-01T09:28:00Z src=10.40.3.21 dst=203.0.113.80 proto=tcp dport=443 bytes_out=10022744 action=allow tag=egress-anomaly\n\n# WAF\ntime=2026-07-01T09:18:31Z host=app.exemplo.test path=/api/pedidos status=503 upstream_status=unhealthy request_id=req-1712-a\ntime=2026-07-01T09:19:03Z host=app.exemplo.test path=/health status=200 upstream_status=healthy request_id=req-1712-b\n\n# VPN\ntime=2026-07-01T09:05:00Z user=usuario.remoto group=vpn-corp assigned_routes=10.0.0.0/8 dns=10.10.10.10 latency_ms=240 warning=high_latency\ntime=2026-07-01T09:06:30Z user=usuario.remoto split_tunnel=true route_missing=10.40.0.0/16 result=partial_connectivity</code></pre>\n</section>\n",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>Conceito</h2>\n  <p>O capstone é um projeto integrador: você produz uma arquitetura de rede corporativa híbrida e demonstra que ela tem quatro propriedades.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Propriedade</th><th>O que significa</th></tr></thead>\n    <tbody>\n      <tr><td>Conectável</td><td>Os fluxos legítimos funcionam.</td></tr>\n      <tr><td>Defensável</td><td>Os fluxos desnecessários são bloqueados e os controles reduzem impacto.</td></tr>\n      <tr><td>Diagnosticável</td><td>Quando algo falha, há evidência suficiente para investigar.</td></tr>\n      <tr><td>Governável</td><td>Mudanças, exceções, custos e riscos têm dono e critério.</td></tr>\n    </tbody>\n  </table></div>\n  <p>A resposta imatura ataca sintomas isolados: abre portas, reinicia serviços, troca DNS, desativa o WAF ou ignora o custo. A resposta profissional segue uma ordem. Primeiro vem a arquitetura: quais fluxos devem e não devem existir, onde ficam os controles e como a evidência é coletada. Depois a defesa: segmentação, egress control, endpoints privados, identidade, WAF e detecções. Depois o diagnóstico: linha do tempo, matriz hipótese-evidência, logs, PCAP quando necessário e RCA. Por fim, a operação: documentação versionada, revisão por pares, testes em pipeline, indicadores e ajustes após incidentes. Para cada componente, você precisa dizer por que ele existe, que problema resolve, que risco adiciona, como é validado e como aparece nos logs.</p>\n\n  <h3>Os 12 entregáveis</h3>\n  <p>O dossiê tem 12 entregáveis obrigatórios. O conteúdo exigido de cada um está em “Entregáveis”, no painel do Desafio. A tabela mostra em que passo do laboratório cada um é produzido.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Código</th><th>Entregável</th><th>Passos do lab</th></tr></thead>\n    <tbody>\n      <tr><td>D01</td><td>Arquitetura lógica ponta a ponta</td><td>1, 2, 6, 7</td></tr>\n      <tr><td>D02</td><td>Plano de endereçamento e zonas</td><td>3</td></tr>\n      <tr><td>D03</td><td>Matriz de fluxos</td><td>4</td></tr>\n      <tr><td>D04</td><td>Política de firewall/ACL/SG/NSG/NACL</td><td>4</td></tr>\n      <tr><td>D05</td><td>Plano DNS</td><td>5</td></tr>\n      <tr><td>D06</td><td>Plano VPN/acesso remoto</td><td>5</td></tr>\n      <tr><td>D07</td><td>Desenho cloud/híbrido</td><td>6, 8</td></tr>\n      <tr><td>D08</td><td>Plano de observabilidade</td><td>8, 9</td></tr>\n      <tr><td>D09</td><td>Evidências de testes</td><td>10</td></tr>\n      <tr><td>D10</td><td>Runbook de troubleshooting</td><td>11, 12</td></tr>\n      <tr><td>D11</td><td>RCA do incidente simulado</td><td>13</td></tr>\n      <tr><td>D12</td><td>Rubrica objetiva preenchida</td><td>15 a 18</td></tr>\n    </tbody>\n  </table></div>\n  <p>O passo 14 empacota tudo como portfólio sanitizado e registra a limpeza de qualquer recurso cloud real.</p>\n\n  <h3>Como o dossiê é avaliado</h3>\n  <p>A avaliação tem duas partes. A <strong>pontuação</strong> vem da rubrica de 100 pontos em 8 critérios (painel do Desafio). A <strong>matriz de competências</strong> mostra se cada bloco do curso atingiu o mínimo; uma nota geral alta não compensa uma competência fraca.</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Código</th><th>Competência</th><th>Módulos de revisão</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead>\n    <tbody>\n      <tr><td>C01</td><td>Fundamentos, OSI e encapsulamento</td><td>M00, M01, M02</td><td>70%</td><td>90%</td><td>explica o fluxo de dados por camadas e reconhece onde cada evidência aparece</td></tr>\n      <tr><td>C02</td><td>Ethernet, ARP, VLAN, switching e camada 2</td><td>M03</td><td>70%</td><td>90%</td><td>diagnostica MAC, ARP, VLAN, trunk, STP e domínio de broadcast</td></tr>\n      <tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>M04, M05, M11</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica a escolha de caminho</td></tr>\n      <tr><td>C04</td><td>TCP, UDP, portas e serviços essenciais</td><td>M06, M07</td><td>75%</td><td>90%</td><td>diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs</td></tr>\n      <tr><td>C05</td><td>HTTP, TLS, proxy, firewall, VPN e publicação segura</td><td>M08, M09, M10</td><td>75%</td><td>90%</td><td>interpreta erros de aplicação/rede e propõe controles com rollback</td></tr>\n      <tr><td>C06</td><td>Wireless, segurança defensiva e Blue Team</td><td>M12, M13, M16</td><td>75%</td><td>90%</td><td>define escopo autorizado, telemetria, detecção, contenção e mitigação</td></tr>\n      <tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>M14</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr>\n      <tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>M15, M17</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr>\n    </tbody>\n  </table></div>\n  <p>Decisão final, pela pontuação da rubrica:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Pontuação</th><th>Decisão</th><th>O que fazer</th></tr></thead>\n    <tbody>\n      <tr><td>90–100</td><td>Aprovado, domínio forte</td><td>Use o dossiê como portfólio, explique as decisões em voz alta e ajude outro aluno a revisar o tema.</td></tr>\n      <tr><td>80–89</td><td>Aprovado com ressalvas</td><td>Registre as lacunas residuais e faça pelo menos um mini lab de reforço por competência fraca.</td></tr>\n      <tr><td>60–79</td><td>Não aprovado, base parcial</td><td>Revise as competências abaixo do mínimo, foque nos erros conceituais e refaça só os blocos afetados.</td></tr>\n      <tr><td>0–59</td><td>Não aprovado, insuficiente</td><td>Refaça a revisão guiada, execute os laboratórios essenciais e produza nova tentativa com evidências.</td></tr>\n    </tbody>\n  </table></div>\n  <div class=\"callout warning\"><strong>Regra que vale em qualquer faixa:</strong> um entregável ausente, uma competência abaixo do seu mínimo ou uma resposta que você não consegue explicar com evidência impede a conclusão. Refaça a competência afetada (revisão ativa, mini lab e reteste após 24–48 h) antes de concluir, mesmo com 80 pontos ou mais.</div>\n</section>\n",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>Funcionamento interno</h2>\n  <p>A arquitetura do capstone é uma cadeia de dependências. Um usuário resolve o nome da aplicação por DNS, passa pela rede local ou remota, atravessa controles de identidade e firewall, chega a um balanceador, negocia TLS, alcança um backend, consulta serviços privados, registra logs e gera métricas. Qualquer elo pode falhar.</p>\n  <p>Essa cadeia atravessa quatro planos, e o seu projeto precisa explicitar cada um:</p>\n  <ul>\n    <li><strong>Dados:</strong> transporta os pacotes.</li>\n    <li><strong>Controle:</strong> define rotas, políticas, DNS, identidade e configuração.</li>\n    <li><strong>Observabilidade:</strong> coleta os sinais.</li>\n    <li><strong>Governança:</strong> define o que é permitido, quem aprova exceções e como as mudanças são auditadas.</li>\n  </ul>\n  <p>Por isso, quando a aplicação retorna 503, você não conclui que “a rede caiu”: verifica DNS, TCP, TLS, WAF, LB, health check, rota, firewall, backend, readiness, logs e mudança recente. Quando há tráfego suspeito, cruza fluxo, DNS, proxy, EDR, identidade, cloud audit, custo e contexto do ativo.</p>\n</section>\n",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>Arquitetura</h2>\n  <p>A arquitetura de referência do capstone é organizada em camadas:</p>\n  <div class=\"responsive-table\"><table class=\"data-table\">\n    <thead><tr><th>Camada</th><th>Componentes e decisões</th></tr></thead>\n    <tbody>\n      <tr><td>Borda pública</td><td>DNS público, CDN/WAF e Load Balancer.</td></tr>\n      <tr><td>Aplicação</td><td>Subnets privadas ou cluster Kubernetes com Ingress controlado.</td></tr>\n      <tr><td>Dados</td><td>Banco gerenciado e storage acessados por endpoints privados e DNS privado.</td></tr>\n      <tr><td>Saída</td><td>Egress control por proxy ou firewall, com logs.</td></tr>\n      <tr><td>Conectividade híbrida</td><td>VPN ou link dedicado com BGP, rotas filtradas e hub de conectividade.</td></tr>\n      <tr><td>Matriz e filial</td><td>Segmentação por função: usuários, servidores, gerenciamento, voz, Wi-Fi corporativo, convidados e dispositivos especiais. Wi-Fi com autenticação corporativa e VLAN dinâmica quando aplicável.</td></tr>\n      <tr><td>Acesso remoto</td><td>Identidade, MFA, postura do dispositivo e escopo mínimo.</td></tr>\n      <tr><td>Segurança</td><td>Segmentação, firewall, SG/NSG/NACL, WAF, NAC, EDR, NDR, DLP, SIEM e playbooks.</td></tr>\n      <tr><td>Operação</td><td>IaC, revisão de mudanças, testes sintéticos, alertas, runbooks, custos monitorados e RCA.</td></tr>\n      <tr><td>Evidência</td><td>Flow logs, DNS logs, proxy logs, WAF/LB logs, cloud audit, Kubernetes audit, EDR e eventos de identidade.</td></tr>\n    </tbody>\n  </table></div>\n</section>\n",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>Analogia</h2>\n  <p>Pense numa cidade. As ruas são as redes, os bairros são as zonas, semáforos e pedágios são firewalls e políticas, os mapas são rotas e DNS, as câmeras são logs e telemetria, e o centro de operações é o SOC. Uma cidade segura não fecha todas as ruas, porque as pessoas precisam circular, mas também não deixa qualquer veículo entrar em qualquer área. O capstone é o planejamento dessa cidade: desenhar caminhos, justificar bloqueios, monitorar eventos, responder a incidentes e melhorar depois de cada falha.</p>\n  <p>Limite da analogia: numa cidade, boa parte do que acontece é visível a olho nu; numa rede, você só vê o que planejou registrar.</p>\n</section>\n",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>Exemplo simples</h2>\n  <p>Um usuário remoto precisa acessar uma aplicação interna. O fluxo esperado é: autenticação com MFA, VPN ou acesso privado, DNS interno resolvendo o nome correto, rota para a subnet da aplicação, firewall permitindo só a porta necessária, aplicação respondendo via TLS e logs registrando identidade, origem, destino, horário e resultado.</p>\n  <p>Se falhar, você não altera tudo de uma vez. Confirma, nesta ordem:</p>\n  <ol>\n    <li>o usuário está autenticado;</li>\n    <li>o cliente recebeu as rotas;</li>\n    <li>o DNS interno resolve o nome;</li>\n    <li>o TCP conecta;</li>\n    <li>o TLS é válido;</li>\n    <li>a aplicação responde;</li>\n    <li>não há bloqueio em firewall, WAF, LB ou backend.</li>\n  </ol>\n  <p>Esse exemplo resume o capstone: fluxo legítimo, controle mínimo necessário, evidência em cada etapa e diagnóstico disciplinado.</p>\n</section>\n",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>Exemplo empresarial</h2>\n  <p>A matriz tem usuários administrativos, equipe de TI, servidores legados, impressoras, Wi-Fi corporativo, Wi-Fi convidado e sistemas internos. A filial precisa acessar só aplicações específicas. O datacenter tem AD/DNS, repositórios, ferramentas de monitoramento e um firewall central.</p>\n  <p>A arquitetura separa zonas por função e criticidade. Usuários não acessam bancos diretamente. O Wi-Fi convidado só sai para a internet. A administração usa bastion e MFA. Servidores críticos têm fluxos explicitamente documentados. Logs de firewall e DNS vão para o SIEM. Exceções têm dono e expiração. Cada uma dessas regras vira uma ou mais linhas da matriz de fluxos (D03).</p>\n</section>\n",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>Exemplo em cloud</h2>\n  <p>Na cloud, a empresa tem uma Landing Zone com contas ou subscriptions separadas para segurança, logs, conectividade, produção, homologação e desenvolvimento. A rede usa hub-spoke, firewall central, DNS privado, endpoints privados para serviços gerenciados e flow logs habilitados nas subnets críticas.</p>\n  <p>A aplicação web é publicada por DNS público, WAF, Load Balancer e TLS. O backend roda em Kubernetes ou VMs privadas. O banco gerenciado é acessado por Private Endpoint. O egress passa por NAT ou firewall com logs.</p>\n  <p>Você deve justificar os custos: NAT, egress, logs, firewall gerenciado, transit, tráfego entre regiões, WAF e retenção. Segurança sem FinOps vira susto financeiro; economia sem segurança vira risco operacional.</p>\n</section>\n",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, a arquitetura do capstone não é um desenho solto: ela vira código, política, teste e documentação. Terraform, Bicep, CloudFormation ou módulos equivalentes criam redes, subnets, rotas, SG/NSG, endpoints e logs, e o pipeline valida tudo antes do merge. Exemplos de guardrails:</p>\n  <ul>\n    <li>bloquear porta administrativa exposta à internet;</li>\n    <li>impedir rota pública em subnet de dados;</li>\n    <li>exigir flow logs em subnets críticas e tags de dono e custo;</li>\n    <li>impedir CIDR sobreposto;</li>\n    <li>validar que bancos usam endpoints privados e que serviços públicos têm WAF e TLS;</li>\n    <li>exigir aprovação para exceções temporárias.</li>\n  </ul>\n  <p>O dossiê deve incluir um plano de automação: que componentes seriam versionados, que políticas seriam testadas, que evidências o pipeline gera e como seria o rollback se uma mudança quebrasse a conectividade.</p>\n</section>\n",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>Exemplo em Segurança</h2>\n  <p>A pergunta de segurança não é “tem firewall?”, e sim “os fluxos essenciais são permitidos, os perigosos são negados e os eventos relevantes são visíveis?”. A arquitetura precisa reduzir movimento lateral, controlar egress, detectar beaconing, investigar possível exfiltração, proteger o DNS, evitar exposição pública indevida, registrar eventos de identidade e preservar evidências.</p>\n  <p>No incidente do capstone, construa hipóteses defensivas sem pular para conclusões (a lista de causas possíveis está na seção Problema). A resposta precisa ser proporcional: contenção mínima, preservação de evidências, comunicação clara, rollback quando necessário, RCA e backlog de melhoria. A investigação não inclui exploração ofensiva nem ações fora do escopo autorizado.</p>\n  <div class=\"callout\"><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, indique escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que só dizem “bloquear no firewall” ou “usar Zero Trust”, sem fluxo, regra, log e justificativa, não atingem domínio.</div>\n</section>\n",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>Diagrama</h2>\n  <p>O diagrama liga usuários, rede corporativa, hub cloud, borda pública, workloads privados, dados, controles e DevSecOps à telemetria, ao SOC e à governança. A seta tracejada fecha o ciclo: o que a governança aprende volta como melhoria da telemetria e da arquitetura.</p>\n  <div class=\"svg-diagram\">\n    <svg viewBox=\"0 0 1200 720\" xmlns=\"http://www.w3.org/2000/svg\" class=\"course-svg lesson-svg course-svg--capstone-final\" role=\"img\" aria-labelledby=\"svg-title-17-12 svg-desc-17-12\">\n      <title id=\"svg-title-17-12\">Capstone final de arquitetura, defesa e diagnóstico ponta a ponta</title>\n      <desc id=\"svg-desc-17-12\">Diagrama integrando usuários, rede corporativa, hub cloud, borda pública, workloads privados, serviços gerenciados, telemetria, SOC, governança, custos e melhoria contínua.</desc>\n      <defs>\n        <marker id=\"arrow1712\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n      </defs>\n      <rect x=\"30\" y=\"40\" width=\"220\" height=\"130\" rx=\"14\" class=\"svg-box\"></rect><text x=\"140\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Usuários</text><text x=\"140\" y=\"105\" text-anchor=\"middle\">Matriz • Filial</text><text x=\"140\" y=\"130\" text-anchor=\"middle\">Wi-Fi • Remoto</text><text x=\"140\" y=\"155\" text-anchor=\"middle\">Identidade • MFA</text>\n      <rect x=\"310\" y=\"40\" width=\"230\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--network\"></rect><text x=\"425\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Rede corporativa</text><text x=\"425\" y=\"105\" text-anchor=\"middle\">VLANs • Gateway</text><text x=\"425\" y=\"130\" text-anchor=\"middle\">DNS • DHCP • NAT</text><text x=\"425\" y=\"155\" text-anchor=\"middle\">Firewall • NAC</text>\n      <rect x=\"600\" y=\"40\" width=\"250\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--cloud\"></rect><text x=\"725\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Hub Cloud</text><text x=\"725\" y=\"105\" text-anchor=\"middle\">VPC/VNet • Rotas</text><text x=\"725\" y=\"130\" text-anchor=\"middle\">VPN/BGP • Transit</text><text x=\"725\" y=\"155\" text-anchor=\"middle\">DNS privado • Logs</text>\n      <rect x=\"910\" y=\"40\" width=\"240\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--security\"></rect><text x=\"1030\" y=\"75\" text-anchor=\"middle\" class=\"svg-title\">Borda pública</text><text x=\"1030\" y=\"105\" text-anchor=\"middle\">DNS público • CDN</text><text x=\"1030\" y=\"130\" text-anchor=\"middle\">WAF • LB • TLS</text><text x=\"1030\" y=\"155\" text-anchor=\"middle\">Health checks</text>\n      <rect x=\"600\" y=\"250\" width=\"250\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--app\"></rect><text x=\"725\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Workloads privados</text><text x=\"725\" y=\"315\" text-anchor=\"middle\">Kubernetes • Ingress</text><text x=\"725\" y=\"340\" text-anchor=\"middle\">Services • Pods • CNI</text><text x=\"725\" y=\"365\" text-anchor=\"middle\">NetworkPolicy</text>\n      <rect x=\"910\" y=\"250\" width=\"240\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--data\"></rect><text x=\"1030\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Dados e serviços</text><text x=\"1030\" y=\"315\" text-anchor=\"middle\">Private Endpoint</text><text x=\"1030\" y=\"340\" text-anchor=\"middle\">Banco • Storage</text><text x=\"1030\" y=\"365\" text-anchor=\"middle\">IAM • Criptografia</text>\n      <rect x=\"310\" y=\"250\" width=\"230\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--control\"></rect><text x=\"425\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">Controles</text><text x=\"425\" y=\"315\" text-anchor=\"middle\">Segmentação</text><text x=\"425\" y=\"340\" text-anchor=\"middle\">Egress control</text><text x=\"425\" y=\"365\" text-anchor=\"middle\">SG/NSG/NACL</text>\n      <rect x=\"30\" y=\"250\" width=\"220\" height=\"150\" rx=\"14\" class=\"svg-box svg-box--ops\"></rect><text x=\"140\" y=\"285\" text-anchor=\"middle\" class=\"svg-title\">DevSecOps</text><text x=\"140\" y=\"315\" text-anchor=\"middle\">IaC • Pipeline</text><text x=\"140\" y=\"340\" text-anchor=\"middle\">Policy as code</text><text x=\"140\" y=\"365\" text-anchor=\"middle\">Rollback</text>\n      <rect x=\"120\" y=\"500\" width=\"300\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--telemetry\"></rect><text x=\"270\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">Telemetria</text><text x=\"270\" y=\"565\" text-anchor=\"middle\">Flow • DNS • Proxy • WAF</text><text x=\"270\" y=\"590\" text-anchor=\"middle\">EDR • Cloud audit • PCAP</text><text x=\"270\" y=\"615\" text-anchor=\"middle\">Billing • Métricas</text>\n      <rect x=\"500\" y=\"500\" width=\"300\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--soc\"></rect><text x=\"650\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">SOC / War Room</text><text x=\"650\" y=\"565\" text-anchor=\"middle\">Hipótese → Evidência</text><text x=\"650\" y=\"590\" text-anchor=\"middle\">Mitigação • RCA</text><text x=\"650\" y=\"615\" text-anchor=\"middle\">Playbooks</text>\n      <rect x=\"880\" y=\"500\" width=\"250\" height=\"130\" rx=\"14\" class=\"svg-box svg-box--governance\"></rect><text x=\"1005\" y=\"535\" text-anchor=\"middle\" class=\"svg-title\">Governança</text><text x=\"1005\" y=\"565\" text-anchor=\"middle\">Risco • Custo</text><text x=\"1005\" y=\"590\" text-anchor=\"middle\">Exceções • Auditoria</text><text x=\"1005\" y=\"615\" text-anchor=\"middle\">Melhoria contínua</text>\n      <line x1=\"250\" y1=\"105\" x2=\"310\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"540\" y1=\"105\" x2=\"600\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"850\" y1=\"105\" x2=\"910\" y2=\"105\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <line x1=\"725\" y1=\"170\" x2=\"725\" y2=\"250\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"850\" y1=\"325\" x2=\"910\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"540\" y1=\"325\" x2=\"600\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"250\" y1=\"325\" x2=\"310\" y2=\"325\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <line x1=\"425\" y1=\"400\" x2=\"270\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"725\" y1=\"400\" x2=\"650\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"1030\" y1=\"400\" x2=\"1005\" y2=\"500\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"420\" y1=\"565\" x2=\"500\" y2=\"565\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line><line x1=\"800\" y1=\"565\" x2=\"880\" y2=\"565\" class=\"svg-arrow\" marker-end=\"url(#arrow1712)\"></line>\n      <path d=\"M1005 630 C900 690, 350 690, 270 630\" class=\"svg-arrow svg-arrow--dashed\" marker-end=\"url(#arrow1712)\"></path>\n    </svg>\n  </div>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>Resumo</h2>\n  <ul>\n    <li>Uma arquitetura profissional é conectável, defensável, diagnosticável e governável; o capstone pede que você prove as quatro propriedades com evidência.</li>\n    <li>Você produz 12 entregáveis (D01–D12), da arquitetura e do endereçamento até testes, runbook, RCA e rubrica, e os defende numa banca técnica.</li>\n    <li>O incidente simulado (503 intermitente, lentidão na VPN e egress anômalo) é investigado pelo método hipótese-evidência, com mitigação que preserva evidências e RCA com causa técnica e causa sistêmica.</li>\n    <li>A aprovação exige pelo menos 80 pontos na rubrica e todas as competências C01–C08 no mínimo; cada lacuna vira revisão, mini lab e reteste.</li>\n    <li>O resultado final é um dossiê sanitizado que serve de portfólio.</li>\n  </ul>\n</section>\n",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>Próximo tema</h2>\n  <p>Esta aula encerra o curso Redes e Network. O próximo passo é levar o dossiê para os cursos de Infraestrutura Moderna, Platform Engineering e DevSecOps e de Enterprise Identity/IAM, onde a arquitetura vira IaC, pipelines e políticas de identidade, e depois para as trilhas de Cloud Security, Observabilidade/SRE e Sistemas Operacionais.</p>\n</section>\n"
  },
  "lab": {
    "id": "lab-17.12",
    "title": "Laboratório Capstone — 12 entregáveis objetivos de arquitetura, defesa e diagnóstico ponta a ponta",
    "labType": "cloud",
    "objective": "Produzir e defender um dossiê final com 12 entregáveis obrigatórios: arquitetura, endereçamento, matriz de fluxos, firewall, DNS, VPN/acesso remoto, cloud, observabilidade, testes, troubleshooting, RCA e rubrica objetiva.",
    "scenario": "O laboratório final é um projeto de arquitetura e investigação: você produz o dossiê com os 12 entregáveis (arquitetura, endereçamento, matriz de fluxos, firewall, DNS, VPN, cloud, observabilidade, testes, runbook, RCA e rubrica) para a empresa fictícia da seção Problema, usando o pacote do incidente simulado. O dossiê deve ser legível para três públicos: um engenheiro de rede, um analista de segurança e um gestor que precisa entender risco, custo e continuidade.",
    "topology": "Empresa fictícia com matriz, filial, Wi-Fi corporativo, Wi-Fi convidado, usuários remotos, VPN/link dedicado, hub-spoke cloud, aplicação web publicada, cluster Kubernetes, banco gerenciado via endpoint privado, SOC e pipeline DevSecOps.",
    "architecture": "Arquitetura em camadas: conectividade, segmentação, publicação de serviços, acesso privado, egress control, telemetria, resposta a incidentes, governança e melhoria contínua.",
    "prerequisites": [
      "Relatório de lacunas da aula 17.11 e o conteúdo dos módulos M14 (cloud), M15 (troubleshooting) e M16 (segurança defensiva).",
      "Editor de texto, planilha ou ferramenta de desenho."
    ],
    "tools": [
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 480,
    "cost": "Zero quando feito como desenho, simulação local e dados sintéticos. Só há custo se você optar por reproduzir partes em cloud real autorizada; nesse caso, remova os recursos ao final (passo 14).",
    "safetyNotes": [
      "Trabalhe em laboratório, simulação local ou desenho: nenhuma etapa exige tocar ambiente produtivo nem executar ataque.",
      "Não crie recursos cloud reais sem autorização explícita, orçamento e tag de laboratório; se criar, registre região, recurso, dono e custo e destrua-os ao final.",
      "Use só dados fictícios ou sanitizados: nada de tokens, chaves, IPs sensíveis, nomes reais de clientes ou dados pessoais."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir cenário e premissas",
        "instruction": "Descreva a empresa fictícia da seção Problema: usuários, localidades, aplicações críticas, requisitos de disponibilidade, restrições de custo, requisitos de compliance e limites do projeto.",
        "expectedOutput": "Documento de escopo com premissas explícitas."
      },
      {
        "number": 2,
        "title": "Criar inventário e criticidade",
        "instruction": "Liste os ativos: usuários, VLANs, subnets, servidores, aplicações, bancos, endpoints privados, contas cloud, clusters, firewalls, DNS, VPN e logs.",
        "expectedOutput": "Inventário com dono, criticidade, exposição, dependência e evidência esperada (base do D01)."
      },
      {
        "number": 3,
        "title": "Desenhar plano CIDR, zonas e segmentação",
        "instruction": "Defina blocos CIDR, VLANs, subnets cloud, gateways, zonas de segurança e fronteiras entre usuário, gestão, dados, aplicação, convidados, remotos e workloads críticos. Reserve blocos para crescimento.",
        "expectedOutput": "D02: mapa de zonas e plano de endereçamento sem sobreposição entre on-premises, VPN e cloud."
      },
      {
        "number": 4,
        "title": "Montar matriz de fluxos e política de firewall",
        "instruction": "Crie uma tabela com origem, destino, porta, protocolo, justificativa, controle, log esperado, dono, criticidade e risco residual, com pelo menos 12 fluxos essenciais: usuário remoto, aplicação web, banco privado, DNS, egress, administração e envio de logs. Derive dela a política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem das regras, regras sombreadas (shadowing), tráfego de retorno e exceções com expiração.",
        "expectedOutput": "D03 (matriz de fluxos) e D04 (política de firewall) coerentes entre si.",
        "explanation": "Cada regra do D04 deve corresponder a uma linha do D03; regra sem fluxo correspondente é candidata a remoção."
      },
      {
        "number": 5,
        "title": "Planejar DNS e acesso remoto",
        "instruction": "Defina DNS público e privado, split-horizon, delegação, registros críticos e como clientes VPN resolvem nomes internos. Para a VPN, defina autenticação forte (MFA), rotas entregues ao cliente, uso ou não de split tunnel, DNS, perfis, logs e fallback.",
        "expectedOutput": "D05 (plano DNS) e D06 (plano VPN/acesso remoto).",
        "explanation": "No pacote do incidente, uma origem recebe a resposta pública de um nome interno e um cliente VPN fica sem a rota 10.40.0.0/16. Os dois planos precisam explicar como isso seria evitado e detectado."
      },
      {
        "number": 6,
        "title": "Desenhar conectividade híbrida e cloud",
        "instruction": "Inclua VPN ou link dedicado, BGP, route tables, UDR, hub-spoke, firewall central, NAT, Private Endpoint/Private Link e Kubernetes networking. Estime os custos de NAT, egress, firewall gerenciado, transit, tráfego entre regiões e logs.",
        "expectedOutput": "D07: arquitetura híbrida com roteamento coerente, endpoints privados e custos estimados."
      },
      {
        "number": 7,
        "title": "Publicar serviço web seguro",
        "instruction": "Desenhe DNS público, CDN/WAF, Load Balancer, TLS, health checks, Ingress, backend privado e dependências privadas.",
        "expectedOutput": "Fluxo da aplicação web publicado com controles e logs, incorporado ao D01 e ao D03."
      },
      {
        "number": 8,
        "title": "Projetar egress control e detecção",
        "instruction": "Defina como os workloads saem para a internet, quais destinos são permitidos, onde ficam proxy, firewall e NAT, quais logs entram no SIEM e quais alertas detectam anomalias.",
        "expectedOutput": "Plano de egress control (parte do D07) e alertas de detecção comportamental (parte do D08)."
      },
      {
        "number": 9,
        "title": "Definir observabilidade e retenção",
        "instruction": "Especifique flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, Kubernetes audit, EDR, SIEM, métricas de custo e retenção mínima. Para cada sintoma do incidente, indique quais fontes você correlacionaria.",
        "expectedOutput": "D08: plano de evidências para operação, segurança, DFIR, auditoria e FinOps, com fontes por sintoma: WAF/LB/Ingress/aplicação para o 503; VPN, firewall e DNS para a lentidão; flow logs, proxy, EDR, cloud audit e billing para o egress."
      },
      {
        "number": 10,
        "title": "Executar ou planejar os testes ponta a ponta",
        "instruction": "Monte uma tabela de testes com resultado esperado, resultado obtido, evidência e decisão, cobrindo DNS, TCP, TLS, HTTP, rota, firewall (allow e deny), endpoint privado, VPN, egress, chegada dos logs e custo estimado. Em ambiente local ou de laboratório, execute os testes; sem ambiente, registre o comando planejado e o resultado esperado.",
        "command": "dig <nome> @<resolvedor>\nnc -vz <destino> <porta>\nopenssl s_client -connect <host>:443 -servername <host>\ncurl -sv https://<host>/<caminho>\ntraceroute <destino>        (Windows: tracert <destino>)",
        "expectedOutput": "D09: tabela de testes com evidência de cada item, incluindo pelo menos um teste de deny.",
        "explanation": "Um teste de deny prova que o controle existe; um teste de allow só prova que o fluxo funciona."
      },
      {
        "number": 11,
        "title": "Analisar o incidente simulado",
        "instruction": "Use o pacote da seção Problema (linha do tempo e logs de DNS, flow, WAF e VPN). Organize os três sintomas (503 intermitente, lentidão na VPN e egress anômalo) com horário, população afetada e impacto. Você pode enriquecer o pacote com novos logs sintéticos, mas não execute ataque: trabalhe só com evidências simuladas ou sanitizadas.",
        "expectedOutput": "Pacote de incidente com sintomas, horários, logs sintéticos e hipóteses iniciais."
      },
      {
        "number": 12,
        "title": "Executar matriz hipótese-evidência",
        "instruction": "Monte hipóteses para DNS, rota, firewall, TLS, WAF, LB, Kubernetes, VPN, C2, exfiltração e custo. Relacione cada hipótese às fontes que a confirmam ou negam e à conclusão.",
        "expectedOutput": "D10: runbook com a árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
        "explanation": "Classifique cada hipótese como confirmada, descartada ou sem evidência suficiente. Hipótese descartada também fica registrada."
      },
      {
        "number": 13,
        "title": "Criar mitigação, rollback e RCA",
        "instruction": "Proponha mitigação mínima, plano de rollback, comunicação técnica e executiva, causa técnica, causa sistêmica e ações preventivas. Escreva o RCA em duas versões: técnica (evidências e causa raiz) e executiva (impacto, decisão, risco e prevenção).",
        "expectedOutput": "D11: RCA com timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos."
      },
      {
        "number": 14,
        "title": "Preparar o portfólio final e a limpeza",
        "instruction": "Organize README, diagramas, matrizes, playbooks, RCA, checklist, riscos residuais, custos estimados, backlog de melhoria priorizado por risco, custo e esforço e aprendizados. Remova tokens, chaves, IPs sensíveis, nomes reais de clientes e dados pessoais. Se usou cloud real, destrua NAT Gateway, firewall gerenciado, load balancer, IPs públicos, endpoints, clusters, discos e logs temporários e registre a comprovação.",
        "expectedOutput": "Dossiê sanitizado, apresentável em entrevista técnica, com checklist de limpeza e custo quando houver recurso cloud real.",
        "explanation": "Um bom portfólio mostra o processo (decisões, hipóteses descartadas, trade-offs), não só o resultado final."
      },
      {
        "number": 15,
        "title": "Montar a matriz de competências",
        "instruction": "Para cada competência C01–C08 (tabela no Conceito), registre pontuação, confiança, evidência coletada e lacuna principal. Registre a confiança antes de corrigir.",
        "command": "Competência | Evidência | Pontuação | Confiança | Lacuna | Ação de revisão | Reteste",
        "expectedOutput": "Matriz com pelo menos uma evidência verificável por competência. “Preciso estudar mais” não conta como lacuna.",
        "explanation": "A avaliação deixa de ser uma nota única e passa a mostrar exatamente onde você domina e onde precisa revisar."
      },
      {
        "number": 16,
        "title": "Classificar erros",
        "instruction": "Classifique a causa de cada erro: E-CONCEITO (decorou o termo, mas não explica por que ele existe ou como funciona); E-CAMADA (confundiu camada 2, camada 3, transporte, aplicação ou controle de segurança); E-COMANDO (não soube escolher comando, log, métrica ou pacote para confirmar a hipótese); E-ARQUITETURA (a solução funciona isolada, mas ignora fluxo, dependência, custo, segurança ou operação); E-SEGURANCA (confundiu conectividade com autorização, ignorou telemetria ou propôs exceção insegura); E-COMUNICACAO (não explicou impacto, decisão, rollback ou risco residual para outro público).",
        "command": "Erro | Resposta dada | Resposta correta | Causa | Competência | Aula de revisão | Evidência nova",
        "expectedOutput": "Lista de erros convertida em backlog de revisão objetivo.",
        "explanation": "Erro sem classificação vira repetição. Erro classificado vira plano de estudo e prática."
      },
      {
        "number": 17,
        "title": "Aplicar a rubrica e decidir",
        "instruction": "Pontue o dossiê com a rubrica de 100 pontos do Desafio e aplique a regra de decisão do Conceito: pelo menos 80 pontos, os 12 entregáveis presentes e todas as competências no mínimo.",
        "command": "Pontuação final = soma dos critérios; decisão = aprovado, aprovado com ressalvas ou refazer competência",
        "expectedOutput": "D12: rubrica preenchida, decisão explícita e justificativa técnica.",
        "explanation": "Você aprende a defender a própria conclusão, como numa revisão técnica, banca ou auditoria."
      },
      {
        "number": 18,
        "title": "Criar trilha de revisão e reteste",
        "instruction": "Para cada competência abaixo do mínimo, defina aula de revisão (módulos na tabela do Conceito), mini laboratório, questão de reteste e prazo. Revise com recuperação ativa, não com releitura; refaça só as questões e tarefas da competência após 24–48 h e registre a confiança antes de corrigir.",
        "command": "Competência fraca | Aula de revisão | Mini lab | Reteste | Prazo | Evidência esperada",
        "expectedOutput": "Plano de revisão com ações executáveis em vez de releitura genérica.",
        "explanation": "A trilha fecha o curso com ações concretas, não só com uma nota."
      }
    ],
    "expectedResult": "Dossiê com os 12 entregáveis coerentes entre si e sustentados por evidência, mais matriz de competências, rubrica pontuada, feedback por tema, plano de revisão e evidência de reteste.",
    "validation": [
      "Os 12 entregáveis D01–D12 têm evidência, dono e critério de aceite.",
      "Nenhum fluxo any-any permanece sem justificativa, expiração e dono.",
      "DNS público e privado estão separados e testáveis.",
      "Acesso remoto/VPN tem rotas, DNS, MFA, logs e fallback documentados.",
      "Cloud/híbrido inclui Private Endpoint/Private Link, egress, route tables, custos e limpeza.",
      "A observabilidade cobre operação, segurança, DFIR, auditoria e FinOps.",
      "A tabela de testes (D09) traz resultado esperado, resultado obtido e evidência, com pelo menos um teste de deny.",
      "O RCA tem timeline, causa técnica, causa sistêmica, mitigação e prevenção.",
      "A matriz de competências C01–C08 está preenchida com evidência, e cada lacuna crítica tem ação prática e prazo de reteste.",
      "A rubrica soma 100 pontos e a decisão segue a regra do Conceito (pelo menos 80 pontos e todas as competências no mínimo). Se não seguir, crie a trilha de revisão antes de marcar a aula como concluída.",
      "Você consegue defender o projeto para rede, segurança, cloud, DevSecOps e gestão, explicando decisões, alternativas rejeitadas e riscos residuais.",
      "O plano de melhoria está priorizado por risco, custo e esforço.",
      "Se algum item falhar: registre a pendência, corrija o artefato, colete nova evidência e atualize a rubrica antes de concluir."
    ],
    "troubleshooting": [
      "A arquitetura ficou grande demais para o tempo disponível: reduza o detalhamento mantendo ao menos um fluxo web, um fluxo privado, um fluxo remoto e um fluxo de egress cobertos de ponta a ponta. Os 12 entregáveis continuam obrigatórios.",
      "Falta evidência para uma decisão: volte ao plano de observabilidade (D08) antes de concluir o RCA.",
      "Uma regra ampla parece necessária: documente risco, alternativa, prazo e dono da exceção.",
      "Os custos ficaram invisíveis: inclua NAT, egress, logs, firewall, transit e retenção no dossiê.",
      "O diagnóstico ficou opinativo: reestruture em matriz hipótese-evidência; “acho que” não conta como evidência.",
      "O diagrama existe, mas não há validação: ligue cada componente a um teste do D09 e a uma fonte de log do D08.",
      "A solução funciona, mas ignora segurança, custo ou operação: revise com a rubrica e classifique como E-ARQUITETURA.",
      "Você acerta questões isoladas, mas falha no cenário integrado, ou a matriz mostra lacunas em fundamentos: classifique os erros (passo 16) e revise só as competências afetadas.",
      "A revisão não gera plano mensurável: cada lacuna precisa de mini lab, reteste e prazo (passo 18)."
    ],
    "improvements": [
      "Versionar o dossiê como repositório de portfólio com README, diagramas SVG e dados sanitizados.",
      "Criar módulos IaC fictícios para rede, logs e controles defensivos e converter a matriz de fluxos em testes de policy as code que bloqueiem exposição pública indevida.",
      "Repetir periodicamente a simulação de war room com novos sintomas e logs sintéticos.",
      "Adicionar orçamento FinOps para NAT, egress, firewall, logs, retenção e tráfego entre regiões.",
      "Refazer a matriz de competências após uma semana para medir retenção real e ajustar pesos ao seu objetivo profissional.",
      "Integrar o capstone aos cursos de DevSecOps e IAM."
    ],
    "evidenceToCollect": [
      "Os 12 entregáveis D01–D12 (conteúdo exigido em “Entregáveis”, no Desafio).",
      "Documento de escopo e inventário (passos 1 e 2).",
      "Tabela de testes ponta a ponta com resultado esperado, resultado obtido, evidência e decisão.",
      "Pacote do incidente analisado e matriz hipótese-evidência.",
      "Saídas de comandos e capturas relevantes, sanitizadas.",
      "Matriz de competências com pontuação bruta e por competência e confiança antes e depois da correção.",
      "Lista de erros por taxonomia e plano de revisão com mini laboratórios.",
      "Rubrica com pontuação e justificativa; resultado do reteste ou critério da próxima tentativa.",
      "Checklist de limpeza e custo quando houver qualquer recurso cloud real."
    ],
    "questions": [
      "Qual entregável é mais fraco e qual evidência objetiva falta para considerá-lo aprovado?",
      "Qual fluxo legítimo não está bem justificado na matriz de fluxos?",
      "Qual controle de firewall ou egress depende de exceção temporária e quem é o dono dessa exceção?",
      "Qual fonte de log provaria ou refutaria a hipótese principal do incidente?",
      "Qual risco residual permanece mesmo após a correção?",
      "Qual competência ficou mais fraca? Qual erro foi conceitual e qual foi falta de diagnóstico por evidência?",
      "O que você faria diferente em um ambiente corporativo real?"
    ],
    "challenge": "Defenda o dossiê como numa banca técnica, respondendo às perguntas do cenário do Desafio, e entregue junto a matriz de competências com feedback por tema, a rubrica pontuada e a trilha de revisão baseada nos erros.",
    "solution": "Uma entrega madura justifica decisões, apresenta evidências, valida o resultado e não esconde erro: mostra pontuação, lacuna, causa, evidência, revisão planejada e reteste. A aprovação só é confiável quando você consegue explicar a resposta correta e demonstrá-la no laboratório ou no cenário."
  },
  "quiz": [
    {
      "id": "0",
      "question": "Qual é a principal diferença entre uma arquitetura apenas conectável e uma arquitetura profissional?",
      "options": [
        "A profissional sempre usa mais ferramentas",
        "A profissional também é defensável, diagnosticável, governável e justificável",
        "A profissional evita qualquer uso de cloud",
        "A profissional dispensa documentação"
      ],
      "answer": 1,
      "explanation": "Conectividade é apenas um requisito. Arquiteturas profissionais também precisam de controles, evidências, governança, custo e capacidade de diagnóstico."
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
      "id": "q6",
      "question": "No pacote do incidente, o cliente 10.20.8.45 recebe api.interno.corp = 10.40.3.21 (view=private, TTL 30) e o cliente 10.88.4.17 recebe 198.51.100.44 (view=public, TTL 300). Qual hipótese priorizar e qual evidência coletar?",
      "options": [
        "O banco gerenciado caiu; reinicie o endpoint privado e repita a consulta",
        "O TTL de 30 s é curto demais e causa o 503; aumente-o para 300 s",
        "Exfiltração por DNS; bloqueie todo o tráfego DNS da origem 10.88.4.17",
        "Split-horizon mal aplicado para a origem 10.88.4.17; confirme qual resolvedor ela usa e se está associada à view privada"
      ],
      "answer": 3,
      "explanation": "O mesmo nome com respostas diferentes conforme a origem é o sinal de split-horizon: a origem 10.88.4.17 está recebendo a view pública. Confirme o resolvedor e a associação dessa origem à view/zona privada. Como a resposta pública tem TTL de 300 s, clientes podem mantê-la em cache por até 5 minutos depois da correção."
    },
    {
      "id": "q7",
      "question": "O dossiê soma 86 pontos na rubrica e tem os 12 entregáveis, mas a matriz mostra C08 (troubleshooting, RCA e comunicação) em 72%. Qual é a decisão?",
      "options": [
        "Aprovado, porque a pontuação geral passou de 80",
        "Aprovado com ressalvas, porque 72% está acima de 70%",
        "Refazer C08 (revisão, mini lab e reteste) antes de concluir, porque o mínimo de C08 é 80%",
        "Reprovado no curso inteiro; refazer todos os módulos"
      ],
      "answer": 2,
      "explanation": "Cada competência tem o seu mínimo, e o de C08 é 80%. Uma competência abaixo do mínimo impede a conclusão em qualquer faixa de pontuação; refaz-se só a competência afetada, não o curso inteiro."
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
      "front": "Mitigação proporcional",
      "back": "Ação mínima, temporária, aprovada e monitorada, com rollback, que reduz o impacto sem destruir evidências nem criar risco permanente."
    }
  ],
  "mentorQuestions": [
    {
      "type": "defesa técnica",
      "question": "Qual parte da sua arquitetura você teria mais dificuldade de defender numa banca técnica?",
      "hints": [
        "Releia as perguntas da banca no cenário do Desafio (por que esse CIDR, esse DNS, esse NAT?).",
        "Procure a decisão que não tem evidência, alternativa rejeitada ou dono."
      ],
      "expectedIdeas": [
        "Apontar uma decisão concreta (ex.: split tunnel, uma exceção de firewall, NAT centralizado).",
        "Citar a alternativa rejeitada e o motivo.",
        "Dizer qual evidência ou teste falta para sustentá-la."
      ]
    },
    {
      "type": "observabilidade",
      "question": "Se amanhã ocorresse um incidente nessa topologia, quais três fontes de evidência seriam indispensáveis?",
      "hints": [
        "Pense nos três sintomas do pacote: 503, lentidão na VPN e egress anômalo."
      ],
      "expectedIdeas": [
        "WAF/LB/Ingress para o 503 (status do upstream e health checks).",
        "Logs de VPN e DNS para a lentidão (rotas entregues, resolvedor usado, view).",
        "Flow logs com DNS/proxy e EDR para o egress (destino, volume, processo, baseline)."
      ],
      "explanation": "A escolha mostra se o plano de observabilidade (D08) cobre os incidentes previsíveis da sua própria arquitetura."
    },
    {
      "type": "risco",
      "question": "Qual risco residual você aceitaria temporariamente e qual consideraria bloqueador de produção?",
      "hints": [
        "Compare uma exceção com dono e prazo com uma exposição permanente."
      ],
      "expectedIdeas": [
        "Aceitável: exceção temporária com dono, prazo, justificativa e monitoramento.",
        "Bloqueador: banco com IP público, porta administrativa exposta, egress sem controle nem log, any-any permanente.",
        "Registrar a aceitação formal do risco no dossiê."
      ]
    },
    {
      "type": "defesa técnica",
      "question": "Como você provaria à banca que não houve exfiltração no incidente simulado? E se não conseguir provar, o que diria?",
      "hints": [
        "Compare volume e destino com o baseline do workload.",
        "Pense no que cada fonte consegue e não consegue mostrar."
      ],
      "expectedIdeas": [
        "Correlacionar o flow log (10.40.3.21 para 203.0.113.80:443) com DNS, proxy, EDR (processo) e cloud audit.",
        "Verificar se destino e volume têm explicação legítima (backup, atualização, integração).",
        "Se a evidência não fecha a questão, declarar a lacuna, o risco residual e a contenção proporcional, em vez de afirmar que não houve exfiltração."
      ]
    }
  ],
  "exercises": [
    {
      "id": "ex17.12.dns",
      "type": "análise de evidência",
      "prompt": "No pacote do incidente, compare as duas respostas DNS para api.interno.corp. O que elas indicam, que hipótese você registra na matriz e que evidência a confirma ou nega?",
      "expectedAnswer": "O mesmo nome recebe respostas diferentes conforme a origem: 10.20.8.45 recebe o IP privado 10.40.3.21 (view=private, TTL 30) e 10.88.4.17 recebe o IP público 198.51.100.44 (view=public, TTL 300). Hipótese: split-horizon mal aplicado para a origem 10.88.4.17 (resolvedor errado ou origem não associada à view privada). Confirma: identificar o resolvedor que essa origem usa e verificar a associação à view/zona privada. Nega: a origem passar a receber a resposta privada e o sintoma continuar.",
      "explanation": "Com TTL de 300 s na resposta pública, clientes podem manter a resposta errada em cache por até 5 minutos depois da correção."
    },
    {
      "id": "ex17.12.vpn",
      "type": "análise de evidência",
      "prompt": "Os logs de VPN mostram latency_ms=240 com warning=high_latency e, em seguida, split_tunnel=true route_missing=10.40.0.0/16 result=partial_connectivity. Liste duas hipóteses para a lentidão dos usuários remotos e, para cada uma, uma evidência que confirma e uma que nega.",
      "expectedAnswer": "H1: com split tunnel, a rota para 10.40.0.0/16 (rede de 10.40.3.21, o IP privado de api.interno.corp) não está no cliente, e o tráfego para o backend não segue pelo túnel. Confirma: tabela de rotas do cliente sem esse prefixo pelo túnel; nega: rota presente e teste para 10.40.3.21 passando pelo túnel. H2: latência alta no próprio túnel ou no concentrador. Confirma: latência alta também para destinos internos com rota correta; nega: latência normal para esses destinos. Registre a divergência do log (assigned_routes=10.0.0.0/8, mas route_missing=10.40.0.0/16) e relacione-a com a mudança de rota cloud das 08:40 antes de concluir."
    },
    {
      "id": "ex17.12.egress",
      "type": "análise de evidência",
      "prompt": "O flow log mostra 10.40.3.21 enviando cerca de 10 MB por registro para 203.0.113.80:443 (action=allow, tag=egress-anomaly). Que fontes você cruza para decidir entre processo legítimo ruidoso e exfiltração, e que contenção proporcional aplicaria enquanto investiga?",
      "expectedAnswer": "Cruzar: o baseline de egress desse workload; DNS e proxy (que nome resolveu para 203.0.113.80 e se o destino está na allowlist); EDR ou Kubernetes (que processo ou pod abriu a conexão); cloud audit (mudanças recentes, como a rota das 08:40); billing (custo de egress). Contenção proporcional: depois de preservar flow logs e demais evidências, restringir o egress desse workload ao destino necessário ou isolá-lo por política, com aprovação, monitoramento e rollback. Não desligue o workload nem apague logs antes de coletar evidências.",
      "explanation": "10.40.3.21 é o mesmo IP da resposta privada de api.interno.corp: o workload com egress anômalo é o que atende a API interna, então a contenção afeta um serviço crítico e precisa ser proporcional."
    },
    {
      "id": "ex17.12.waf",
      "type": "análise de evidência",
      "prompt": "No WAF, /api/pedidos retorna 503 com upstream_status=unhealthy às 09:18:31, e /health retorna 200 com upstream_status=healthy às 09:19:03. O que isso indica e qual é a próxima verificação?",
      "expectedAnswer": "A requisição chegou ao WAF e teve resposta, então DNS público e TLS até a borda funcionaram para ela. O 503 vem da falta de upstream saudável naquele instante, e o upstream aparece unhealthy e, 32 segundos depois, healthy. Hipóteses: backend instável (readiness, recursos, dependência privada como banco ou API) ou health check em /health que não exercita as dependências de /api/pedidos. Próxima verificação: logs do Ingress e do backend e eventos de readiness no horário, latência das dependências privadas e comparação entre o que o health check valida e o que a rota real exige."
    },
    {
      "id": "ex17.12.guardrails",
      "type": "DevSecOps",
      "prompt": "Liste dez validações de pipeline para impedir erros recorrentes de rede e segurança na sua arquitetura.",
      "expectedAnswer": "Regras sobre CIDR sobreposto, rotas públicas em subnets de dados, SG/NSG expondo administração, endpoints privados para bancos, flow logs em subnets críticas, tags de dono e custo, WAF/TLS em serviços públicos, registros DNS, exceções sem dono ou expiração e regras any-any."
    }
  ],
  "challenge": {
    "title": "Defesa técnica do capstone final",
    "constraints": [
      "Sem exploração ofensiva.",
      "Sem dados reais sensíveis.",
      "Sem liberar regras amplas como solução definitiva.",
      "Toda exceção deve ter dono, prazo e justificativa.",
      "Toda conclusão deve citar evidência ou lacuna; resposta decorada sem evidência técnica não conta.",
      "Não conclua a aula com a rubrica em branco nem com competência abaixo do mínimo: refaça a competência (revisão, mini lab e reteste) antes."
    ],
    "tasks": [
      "Produzir os 12 entregáveis no laboratório (passos 1 a 14).",
      "Defender a arquitetura como numa banca técnica, respondendo às perguntas do cenário.",
      "Explicar riscos aceitos, riscos mitigados, alternativas rejeitadas e próximos investimentos recomendados.",
      "Pontuar o dossiê com a rubrica de 100 pontos e aplicar a regra de decisão do Conceito (passo 17).",
      "Gerar feedback por tema e por causa de erro e criar trilha de revisão e reteste para as competências abaixo do mínimo (passos 15, 16 e 18)."
    ],
    "expectedDeliverables": [
      "D01 — Arquitetura lógica ponta a ponta com matriz, filial, Wi-Fi, acesso remoto, hub cloud, workloads privados, borda pública, telemetria e governança, em diagrama SVG ou ASCII.",
      "D02 — Plano de endereçamento: CIDR, subnets, VLANs, gateways, reservas de crescimento e ausência de sobreposição.",
      "D03 — Matriz de fluxos: origem, destino, protocolo, porta, justificativa, controle, log esperado, dono, criticidade e risco residual.",
      "D04 — Política de firewall/ACL/SG/NSG/NACL: allowlist, deny explícito, ordem de regras, shadowing, retorno e exceções com expiração.",
      "D05 — Plano DNS: público, privado, split-horizon, delegação, registros críticos, resolução em VPN e evidência de troubleshooting.",
      "D06 — Plano VPN/acesso remoto: autenticação forte, rotas, split tunnel, DNS, logs, perfis, troubleshooting e fallback.",
      "D07 — Desenho cloud/híbrido: hub-spoke, route tables, Private Endpoint/Private Link, egress control, NAT/firewall, Kubernetes networking e custos.",
      "D08 — Plano de observabilidade: flow logs, DNS logs, firewall, proxy, WAF/LB, VPN, cloud audit, EDR/NDR/SIEM, métricas e retenção.",
      "D09 — Evidências de testes: DNS, TCP, TLS, HTTP, rota, firewall allow/deny, endpoint privado, VPN, egress, logs e custo estimado.",
      "D10 — Runbook de troubleshooting: árvore hipótese-evidência, comandos, fontes de log, critérios de decisão, rollback e comunicação.",
      "D11 — RCA de incidente simulado: timeline, impacto, causa técnica, causa sistêmica, mitigação, prevenção, riscos residuais e donos.",
      "D12 — Rubrica objetiva preenchida: pontuação por competência, aprovação/reprovação, lacunas, reteste e plano de melhoria contínua.",
      "Matriz de competências C01–C08 com pontuação, confiança e feedback por tema (fundamento, diagnóstico, arquitetura, segurança, cloud e comunicação), como parte do D12.",
      "Pacote de portfólio: README, resumo executivo, backlog de melhoria priorizado por risco, custo e esforço e checklist de limpeza e custos (quando houver recurso cloud real)."
    ],
    "successCriteria": [
      "Os 12 entregáveis estão completos, coerentes entre si e sustentados por evidência.",
      "A defesa explica decisões, alternativas rejeitadas e riscos residuais.",
      "O plano de melhoria está priorizado por risco, custo e esforço.",
      "Cada competência tem evidência observável e cada erro tem causa classificada.",
      "A rubrica sustenta a decisão: pelo menos 80 pontos e todas as competências no mínimo (C01 e C02: 70%; C03 a C07: 75%; C08: 80%).",
      "O plano de revisão tem tarefa prática, reteste e prazo.",
      "O dossiê pode ser publicado como portfólio sem expor dados sensíveis."
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
        "description": "Hub-spoke, endpoints privados, egress control, route tables, Kubernetes networking, NAT/firewall/logs e limpeza/custo considerados; IaC e guardrails de pipeline com rollback."
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
        "description": "Controles defensivos, escopo autorizado, detecções com falso positivo considerado, contenção proporcional, riscos residuais, exceções, auditoria e backlog priorizado."
      },
      {
        "criterion": "Comunicação, portfólio e melhoria contínua",
        "points": 8,
        "description": "Resumo executivo, defesa técnica com alternativas rejeitadas, rubrica preenchida, matriz de competências, lacunas, reteste e portfólio sanitizado."
      }
    ],
    "scenario": "Monte e apresente o dossiê final de arquitetura, defesa e diagnóstico ponta a ponta para a empresa híbrida da seção Problema: datacenter, filial, Wi-Fi, acesso remoto, cloud, Kubernetes, aplicação web publicada, workloads privados e SOC, passando por instabilidade e suspeita de egress anômalo. Prepare-se para uma banca que vai perguntar: por que esse CIDR? por que esse DNS? por que esse WAF? por que esse NAT? como investigar o 503? como provar que não houve exfiltração? como reduzir custo sem perder visibilidade? Não é uma prova de memória, é uma prova de integração."
  },
  "commentedSolution": {
    "reasoning": "Esta é uma solução de referência, não a única arquitetura possível. Ela mostra o nível de profundidade esperado: decisões explícitas, trade-offs, o que foi priorizado, o que ficou como risco aceito, quais controles reduzem impacto e quais sinais permitirão investigar no futuro. A nota final, sozinha, não prova domínio: a correção é feita por competência, e você precisa justificar evidência, risco, decisão e próximo passo.",
    "steps": [
      "Comece pelo escopo e pelo mapa de ativos, com dono e criticidade.",
      "Separe as zonas: matriz, filial, Wi-Fi corporativo, convidados, gestão, servidores, hub cloud, spokes, aplicação web e serviços de dados. O plano CIDR evita sobreposição e reserva crescimento.",
      "Publique a aplicação com DNS público, WAF/CDN, Load Balancer, TLS e backends privados. O banco usa endpoint privado e DNS privado.",
      "Dê aos usuários remotos MFA, perfil limitado, DNS interno e rotas específicas. Faça o tráfego de saída passar por controle de egress com logs.",
      "Investigue sem presumir causa única: compare WAF/LB/Ingress, flow logs, DNS, VPN, firewall, EDR, cloud audit e billing. No pacote, o 503 com upstream unhealthy, a resposta DNS pública para uma origem, a rota 10.40.0.0/16 ausente no cliente VPN e o egress de 10.40.3.21 são quatro sinais distintos; avalie com evidência se a mudança de rota das 08:40 explica algum deles antes de aceitá-la ou descartá-la como causa comum.",
      "Mitigue reduzindo o impacto sem destruir evidências e com rollback. No RCA, aponte causa técnica, causa sistêmica, prevenção, dono e prazo, em versão técnica e executiva.",
      "Monte o portfólio sem dados sensíveis, apresentando decisões, trade-offs e aprendizados.",
      "Corrija por competência: separe a nota geral do domínio por competência, classifique os erros pela taxonomia, vincule cada lacuna a aulas e laboratórios, crie um mini lab para cada lacuna crítica, refaça o teste após o intervalo e decida entre aprovado, aprovado com ressalvas ou refazer competência."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Passei porque fiz 85 pontos, sem analisar onde errei.",
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
        "answer": "Liberei any-any, o 503 sumiu e o incidente está resolvido.",
        "whyItIsWrong": "Pode recuperar o serviço, mas destrói a capacidade de saber a causa, amplia o risco e não explica a lentidão na VPN nem o egress anômalo."
      }
    ],
    "finalAnswer": "A aula está concluída quando o dossiê tem os 12 entregáveis, a rubrica soma pelo menos 80 pontos, todas as competências C01–C08 estão no mínimo e há feedback por erro e plano de revisão e reteste para cada lacuna. Se alguma competência ficar abaixo do mínimo, a decisão é refazê-la antes de concluir."
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
      "note": "Referência para governança, identificação, proteção, detecção, resposta e recuperação.",
      "organization": "NIST"
    },
    {
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "note": "Base para resposta a incidentes integrada à gestão de risco.",
      "organization": "NIST"
    },
    {
      "title": "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "note": "Referência para planejamento, condução e reporte de avaliações técnicas autorizadas.",
      "organization": "NIST"
    },
    {
      "title": "AWS Well-Architected Framework",
      "url": "https://docs.aws.amazon.com/wellarchitected/latest/framework/the-pillars-of-the-framework.html",
      "note": "Referência de pilares para arquitetura cloud segura, confiável, eficiente e otimizada.",
      "organization": "Amazon Web Services"
    },
    {
      "title": "Azure Well-Architected Framework",
      "url": "https://learn.microsoft.com/en-us/azure/well-architected/",
      "note": "Referência de revisão arquitetural para workloads Azure.",
      "organization": "Microsoft"
    },
    {
      "title": "OWASP Web Security Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/",
      "note": "Referência para validações defensivas e estruturadas em aplicações web.",
      "organization": "OWASP"
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
      "Coletar evidências de arquitetura, validação, logs, decisões e melhorias propostas.",
      "Dar dono, prazo e justificativa a toda exceção e revisar as exceções antes de fechar o dossiê.",
      "Separar DNS público e privado e acessar serviços gerenciados por endpoint privado.",
      "Consolidar o portfólio com entregáveis verificáveis e limites éticos claros."
    ],
    "badPractices": [
      "Abrir regras amplas temporárias sem expiração, justificativa ou dono responsável.",
      "Ignorar logs e métricas por focar apenas em comandos de conectividade.",
      "Misturar ambientes de teste e produção sem isolamento ou controle de mudança.",
      "Tratar conectividade bem-sucedida como autorização de segurança suficiente.",
      "Encerrar a investigação quando o serviço volta sem registrar causa, risco e prevenção."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante."
    ],
    "vulnerabilities": [
      {
        "name": "Aprovação sem evidência",
        "description": "O capstone vira aprovação subjetiva quando o dossiê não traz evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por competência.",
        "defensiveExplanation": "O risco aparece quando você sabe responder definições, mas não demonstra validação operacional com diagrama, matriz de fluxos, comandos, logs, RCA e rubrica.",
        "mitigation": "Exigir os 12 entregáveis, a rubrica de 100 pontos, a matriz de competências, evidências sanitizadas, revisão das falhas e reteste antes de concluir."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      },
      {
        "name": "Vazamento de dados no portfólio",
        "description": "Um dossiê publicado com tokens, chaves, IPs sensíveis, nomes reais de clientes ou dados pessoais expõe o ambiente que deveria proteger.",
        "defensiveExplanation": "Portfólio é material para mostrar a terceiros: tudo o que entra nele deve ser tratado como divulgado.",
        "mitigation": "Usar só dados fictícios ou sanitizados e revisar capturas, logs e diagramas antes de publicar, removendo segredos e identificadores reais."
      },
      {
        "name": "Recursos cloud esquecidos",
        "description": "NAT Gateway, firewall gerenciado, load balancer, IPs públicos, endpoints, clusters e discos criados para teste continuam gerando custo e superfície de ataque.",
        "defensiveExplanation": "Recurso de laboratório sem dono e sem tag não aparece em nenhuma revisão e fica exposto indefinidamente.",
        "mitigation": "Criar só com autorização, orçamento e tag de laboratório; registrar região, recurso, dono e custo; destruir ao final e guardar a comprovação."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, balanceadores, endpoints e provedores cloud.",
      "Métricas de disponibilidade, latência, perda, retransmissões, resets e erros de TLS/HTTP.",
      "Eventos de mudança, deploy, IaC, configuração manual e alertas correlacionados no tempo."
    ],
    "hardening": [
      "Reduzir acessos any-any e exceções permanentes.",
      "Usar autenticação forte, segregação de funções e revisão periódica de permissões.",
      "Versionar configurações críticas e exigir revisão para mudanças de rede e segurança.",
      "Padronizar logs mínimos, retenção, alertas e evidências por tipo de incidente.",
      "Executar laboratórios destrutivos apenas em ambiente isolado."
    ],
    "detectionIdeas": [
      "Comparar o egress de cada workload com o baseline (no pacote, 10.40.3.21 envia cerca de 10 MB por registro para 203.0.113.80:443).",
      "Alertar quando o mesmo nome interno recebe respostas de views diferentes conforme a origem.",
      "Correlacionar HTTP 503 com upstream_status=unhealthy no WAF/LB e com eventos de readiness do backend.",
      "Alertar quando um cliente VPN conecta sem as rotas esperadas ou com latência acima do normal.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "HTTP 503 intermitente na aplicação publicada, com o upstream alternando entre unhealthy e healthy.",
      "Lentidão ou acesso parcial para usuários remotos na VPN.",
      "Egress acima do baseline a partir de um workload privado.",
      "O mesmo nome interno resolve para IPs diferentes conforme a origem."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação? (No pacote: a mudança de rota cloud das 08:40.)",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?"
    ],
    "commands": [
      {
        "platform": "Linux/macOS",
        "command": "dig api.interno.corp @<resolvedor>",
        "purpose": "Ver que resposta e que TTL um resolvedor entrega para o nome interno.",
        "expectedObservation": "Da rede interna e da VPN, o IP privado (no pacote, 10.40.3.21).",
        "interpretation": "IP público (198.51.100.44) para um cliente interno indica split-horizon mal aplicado ou resolvedor errado para aquela origem."
      },
      {
        "platform": "Linux / Windows",
        "command": "ip route get 10.40.3.21   (Windows: route print)",
        "purpose": "Conferir se o cliente VPN tem rota para a rede do backend.",
        "expectedObservation": "Rota para 10.40.0.0/16, ou um prefixo que a contenha, saindo pela interface do túnel.",
        "interpretation": "Sem rota pelo túnel, o tráfego para o backend sai por outro caminho ou falha: acesso parcial com split tunnel."
      },
      {
        "platform": "Linux/macOS/Windows",
        "command": "curl -sv https://app.exemplo.test/api/pedidos",
        "purpose": "Ver resolução, handshake TLS e status HTTP da rota que falha.",
        "expectedObservation": "Handshake TLS concluído e status 200.",
        "interpretation": "TLS concluído com 503 aponta para o upstream (health check, readiness, dependência); falha antes do TLS aponta para DNS, rota ou firewall."
      },
      {
        "platform": "SIEM / flow logs",
        "command": "filtrar flow logs por src=10.40.3.21 e dst=203.0.113.80 na janela de 09:00 a 10:00",
        "purpose": "Medir volume, duração e periodicidade do egress anômalo.",
        "expectedObservation": "Volume compatível com o baseline do workload.",
        "interpretation": "Volume muito acima do baseline exige correlação com DNS, proxy, EDR e cloud audit antes de concluir entre exfiltração e processo legítimo."
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
