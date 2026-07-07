export const lesson1305 = {
  "id": "13.5",
  "moduleId": "m13",
  "order": 5,
  "title": "SIEM, Logs, Telemetria e Correlação de Eventos de Rede",
  "subtitle": "Como transformar eventos dispersos de rede, identidade, endpoint e cloud em investigação acionável para SOC e resposta a incidente.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 340,
  "tags": [
    "redes",
    "segurança",
    "siem",
    "logs",
    "telemetria",
    "soc",
    "correlação",
    "syslog",
    "dns",
    "dhcp",
    "firewall",
    "radius",
    "edr",
    "cloud",
    "resposta a incidente"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m06",
      "lesson": "6.x",
      "reason": "TCP, UDP e portas ajudam a interpretar eventos de conexão."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "DNS, DHCP e NAT são fontes centrais de evidência em investigação de rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewalls e ACLs geram logs de decisão de tráfego."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "802.1X, RADIUS e Wi-Fi corporativo produzem eventos importantes de identidade na rede."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.4",
      "reason": "IDS, IPS, NDR e NetFlow geram alertas e telemetria que alimentam SIEM."
    }
  ],
  "objectives": [
    "Diferenciar log, evento, alerta, telemetria, SIEM, correlação e caso de uso.",
    "Explicar por que centralização sem normalização não basta para investigação.",
    "Identificar fontes de logs críticas para segurança de redes corporativas.",
    "Construir uma linha do tempo correlacionando firewall, DNS, DHCP, RADIUS, EDR e cloud.",
    "Entender impactos operacionais e financeiros de ingestão, retenção, parsing e ruído.",
    "Projetar um plano de logs defensivo com campos mínimos, retenção e playbooks."
  ],
  "learningOutcomes": [
    "Dado um alerta de rede, o aluno escolhe fontes adicionais para validar hipótese.",
    "Dado um evento bruto, o aluno identifica campos mínimos para normalização.",
    "Dado um IP interno, o aluno sabe buscar usuário, host, DHCP, autenticação e tráfego relacionado.",
    "Dado um SIEM ruidoso, o aluno propõe tuning e priorização por risco.",
    "Dado um ambiente cloud/híbrido, o aluno inclui logs de plano de controle e plano de dados."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Uma empresa pode ter firewall, segmentação, hardening, IDS, IPS e NDR e ainda assim falhar na investigação de um incidente por um motivo simples: os eventos ficam espalhados. O firewall sabe que uma conexão foi permitida. O DNS sabe qual nome foi resolvido. O DHCP sabe qual IP estava com qual estação. O RADIUS sabe quem autenticou no Wi-Fi ou na VPN. O proxy sabe qual URL foi acessada. O EDR sabe qual processo abriu conexão. O controlador Wi-Fi sabe a qual BSSID o usuário estava associado. O servidor sabe que houve uma tentativa de login. Separadamente, cada registro parece pequeno. Juntos, eles contam uma história.</p>\n  <p>SIEM, logs, telemetria e correlação existem para transformar sinais isolados em linha do tempo, contexto e decisão. O objetivo não é apenas guardar logs. Guardar log sem contexto é como empilhar recibos sem saber qual compra foi fraude. Segurança de rede precisa responder perguntas como: quem fez, de onde veio, para onde foi, quando começou, quais ativos foram tocados, qual regra permitiu, qual autenticação ocorreu, qual volume trafegou, qual alerta disparou e qual evidência confirma ou enfraquece a hipótese.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> o SOC recebe um alerta de comunicação suspeita para um domínio externo. O alerta sozinho não diz se foi malware, usuário legítimo, atualização de software, teste de TI ou falso positivo. Para decidir, o analista precisa correlacionar DNS, proxy, firewall, EDR, DHCP, autenticação, inventário e sensores de rede.</div>\n  <p>Nesta aula você aprenderá a pensar em logs como evidência operacional. A partir daqui, segurança de redes deixa de ser apenas controle de tráfego e passa a ser capacidade de investigação.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No início das redes corporativas, muitos dispositivos registravam eventos localmente: switches tinham logs em memória, firewalls guardavam eventos próprios, servidores escreviam arquivos em disco e administradores acessavam cada equipamento manualmente. Isso funcionava em ambientes pequenos, mas não escalava. Quando havia incidente, a investigação dependia de entrar em vários consoles, copiar trechos de log, comparar horários manualmente e torcer para que os relógios estivessem sincronizados.</p>\n  <p>Com o crescimento de firewalls, proxies, VPNs, Active Directory, servidores web, bancos de dados, Wi-Fi corporativo, EDRs, cloud, Kubernetes e aplicações distribuídas, a quantidade de eventos explodiu. Surgiram servidores de syslog, coletores centralizados, plataformas de SIEM, data lakes de segurança, pipelines de telemetria e ferramentas de correlação. O foco evoluiu de “guardar eventos” para “detectar padrões, responder incidentes, investigar hipóteses e produzir evidência auditável”.</p>\n  <p>Hoje, o SIEM não deve ser visto como uma caixa mágica que detecta tudo. Ele é uma plataforma de ingestão, normalização, busca, correlação, alerta e investigação. A qualidade do SIEM depende diretamente da qualidade das fontes, do relógio, da normalização, dos campos, dos casos de uso e do processo do SOC.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema central é que incidentes de rede raramente aparecem completos em uma única fonte. Um alerta de IDS pode indicar tráfego suspeito, mas não sabe se o usuário estava autenticado via VPN. Um log de firewall pode mostrar IP de origem, mas não sabe qual notebook recebeu aquele IP por DHCP no horário do evento. Um log de DNS pode mostrar domínio, mas não sabe qual processo no endpoint fez a consulta. Um log de RADIUS pode mostrar autenticação bem-sucedida, mas não sabe se depois houve transferência anormal de dados.</p>\n  <ul>\n    <li><strong>Sem centralização:</strong> cada equipe olha uma ferramenta diferente e a linha do tempo fica fragmentada.</li>\n    <li><strong>Sem normalização:</strong> campos iguais recebem nomes diferentes, dificultando busca e correlação.</li>\n    <li><strong>Sem sincronização de tempo:</strong> eventos reais parecem fora de ordem.</li>\n    <li><strong>Sem contexto:</strong> IP, usuário, ativo, criticidade e localização ficam desconectados.</li>\n    <li><strong>Sem retenção adequada:</strong> o incidente é descoberto depois que o log já foi sobrescrito.</li>\n    <li><strong>Sem casos de uso:</strong> o SIEM vira depósito caro de eventos que ninguém consulta.</li>\n  </ul>\n  <p>A consequência operacional é grave: investigações lentas, falsos positivos em excesso, baixa confiança nos alertas, falha em auditoria, dificuldade de resposta e incapacidade de explicar o que aconteceu de forma executiva.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A evolução de logs em segurança de rede passou por várias fases. Cada fase resolveu um problema e criou outro. O erro comum é pular direto para uma ferramenta moderna sem resolver fundamentos como fonte, tempo, campo, retenção e caso de uso.</p>\n  <table class=\"comparison-table\">\n    <thead>\n      <tr>\n        <th>Abordagem</th>\n        <th>Como funcionava</th>\n        <th>Limitação</th>\n        <th>O que veio depois</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Log local</td>\n        <td>Cada dispositivo gravava eventos em memória, arquivo ou console próprio.</td>\n        <td>Difícil investigar incidentes distribuídos e sujeito a perda de evidência.</td>\n        <td>Syslog e coletores centralizados.</td>\n      </tr>\n      <tr>\n        <td>Servidor de syslog</td>\n        <td>Eventos eram enviados para um ponto central.</td>\n        <td>Centraliza, mas não necessariamente normaliza, correlaciona ou alerta bem.</td>\n        <td>SIEM com parsing, busca e regras.</td>\n      </tr>\n      <tr>\n        <td>SIEM tradicional</td>\n        <td>Ingestão de logs, regras de correlação, alertas e dashboards.</td>\n        <td>Alto volume, custo, ruído e dependência de tuning contínuo.</td>\n        <td>Analytics, UEBA, SOAR e data lake.</td>\n      </tr>\n      <tr>\n        <td>Telemetria moderna</td>\n        <td>Combina logs, métricas, traces, flow logs, EDR, cloud audit e contexto de identidade.</td>\n        <td>Exige governança, engenharia de dados e casos de uso bem definidos.</td>\n        <td>Detecção orientada a risco, automação e investigação integrada.</td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p><strong>Log</strong> é um registro de algo que aconteceu. Em segurança, log útil precisa ter tempo, origem, destino, ator, ação, resultado, severidade e contexto suficiente para investigação. <strong>Telemetria</strong> é o conjunto de sinais coletados sobre o ambiente: logs, métricas, traces, fluxos de rede, alertas, eventos de autenticação, dados de endpoint, auditoria cloud e estado de configuração. <strong>SIEM</strong> é a plataforma que ingere, normaliza, armazena, busca, correlaciona e alerta sobre esses sinais.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> em segurança de redes, SIEM e correlação de eventos são mecanismos para transformar eventos técnicos dispersos em evidência analisável, permitindo detecção, investigação, resposta, auditoria e melhoria contínua.</div>\n  <p>Correlação é o ato de conectar eventos diferentes por chaves comuns: tempo, IP, usuário, host, sessão, porta, protocolo, domínio, certificado, regra de firewall, identificador de alerta ou ativo. O objetivo é reduzir incerteza. Um evento isolado diz “algo aconteceu”. Eventos correlacionados dizem “algo aconteceu com este usuário, neste host, depois desta autenticação, usando este IP, acessando este destino, permitido por esta regra, com este volume e este risco”.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Por dentro, uma operação de logs e SIEM passa por uma cadeia técnica. Se qualquer etapa falhar, a detecção fica frágil.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Geração:</strong> firewall, switch, AP, VPN, DNS, DHCP, proxy, servidor, EDR, cloud ou aplicação gera um evento.</li>\n    <li><strong>Transporte:</strong> o evento é enviado por syslog, agente, API, collector, streaming, arquivo, webhook ou serviço gerenciado.</li>\n    <li><strong>Parsing:</strong> o texto bruto é transformado em campos estruturados, como origem, destino, ação, resultado e usuário.</li>\n    <li><strong>Normalização:</strong> campos de fontes diferentes são convertidos para um modelo comum. Por exemplo, <code>src_ip</code>, <code>source.address</code> e <code>client.ip</code> precisam ser interpretáveis.</li>\n    <li><strong>Enriquecimento:</strong> adiciona contexto: inventário, criticidade, geolocalização, dono do ativo, grupo do usuário, CMDB, identidade e ameaça conhecida.</li>\n    <li><strong>Armazenamento e retenção:</strong> define por quanto tempo o evento fica pesquisável, arquivado ou descartado.</li>\n    <li><strong>Correlação:</strong> regras, consultas, detecções ou analytics conectam eventos relacionados.</li>\n    <li><strong>Alerta e triagem:</strong> um evento correlacionado vira alerta, caso ou incidente, com severidade e prioridade.</li>\n    <li><strong>Investigação:</strong> o analista constrói linha do tempo, valida hipóteses e coleta evidências.</li>\n    <li><strong>Resposta e melhoria:</strong> playbook, contenção, tuning de regra, atualização de baseline e lições aprendidas.</li>\n  </ol>\n  <p>Um detalhe técnico essencial é o tempo. Sem NTP confiável, correlação falha. Um evento de DNS às 10:02, uma autenticação às 10:01 e uma conexão de firewall às 10:03 só fazem sentido se os relógios estiverem alinhados. Em investigação, minutos importam.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Uma arquitetura de SIEM para segurança de redes normalmente envolve fontes, coletores, pipeline, armazenamento, motor de correlação, dashboards, alertas, casos e integrações de resposta.</p>\n  <ul>\n    <li><strong>Fontes de rede:</strong> firewall, IDS/IPS, NDR, NetFlow/IPFIX, DNS, DHCP, VPN, proxy, WAF, load balancer, controladora Wi-Fi e roteadores.</li>\n    <li><strong>Fontes de identidade:</strong> Active Directory, Entra ID, LDAP, RADIUS, SSO, MFA, PAM e IAM cloud.</li>\n    <li><strong>Fontes de endpoint:</strong> EDR, antivírus, logs do sistema, eventos de processo e inventário.</li>\n    <li><strong>Fontes cloud:</strong> flow logs, audit logs, security group logs, DNS privado, load balancer logs e trilhas de auditoria.</li>\n    <li><strong>Camada de processamento:</strong> parsing, normalização, enriquecimento, deduplicação, roteamento e retenção.</li>\n    <li><strong>Camada de uso:</strong> alertas, busca, dashboards, regras, threat hunting, casos, relatórios e resposta.</li>\n  </ul>\n  <p>O desenho correto não começa pela ferramenta. Começa por perguntas de detecção: “Quais incidentes queremos perceber?”, “quais fontes provam isso?”, “quais campos são necessários?”, “quanto tempo precisamos reter?”, “quem responde?”, “qual ação será tomada?”.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Pense em um SIEM como a central de investigação de um prédio. As câmeras mostram corredores, a catraca mostra quem entrou, o elevador mostra qual andar foi acessado, o crachá mostra identidade, o sensor de porta mostra abertura, o alarme mostra anomalia e o livro de visitantes mostra contexto. Cada fonte isolada é limitada. A investigação melhora quando os registros são reunidos em uma linha do tempo.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em redes, os eventos são muito mais volumosos, técnicos e ambíguos. Um log não é verdade absoluta; ele é uma observação produzida por um sistema. Pode faltar campo, pode haver relógio errado, pode haver NAT, pode haver proxy, pode haver perda de evento e pode haver interpretação incorreta.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Imagine seu notebook em casa. Você tenta acessar um site e falha. Para investigar, você pode olhar o horário, o Wi-Fi conectado, o IP recebido por DHCP, o gateway, o DNS configurado, a resposta do <code>nslookup</code>, o resultado do <code>ping</code> e o log do roteador. Isso é uma versão pequena de correlação: você junta sinais para descobrir se o problema está no rádio, no IP, no DNS, na rota ou no destino.</p>\n  <p>Em ambiente corporativo, o mesmo raciocínio cresce. O IP do notebook muda, o usuário autentica via 802.1X, o firewall aplica política, o proxy registra URL, o DNS registra nome, o EDR registra processo e o SIEM junta tudo.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa recebe alerta: um notebook iniciou conexões SMB para vários servidores internos. O firewall interno registrou tráfego permitido entre a VLAN de usuários e alguns servidores. O NetFlow mostra aumento de conexões leste-oeste. O DNS mostra consultas para nomes internos. O DHCP mostra que o IP pertencia ao notebook de um usuário específico. O RADIUS mostra que esse usuário autenticou na rede cabeada às 08:11. O EDR mostra um processo suspeito iniciando conexões às 08:14. O Active Directory mostra autenticação falha para várias contas às 08:16.</p>\n  <p>Nenhum desses eventos sozinho prova tudo. A correlação cria uma narrativa: identidade, ativo, rede, protocolo, destino, processo e tempo. Com essa linha do tempo, o SOC pode isolar o host, bloquear fluxos, revogar sessão, acionar o time de endpoint, preservar evidência e informar o impacto.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, SIEM e telemetria precisam incluir eventos que não existem no datacenter tradicional. Uma VPC/VNet pode gerar flow logs. Um security group ou NSG pode permitir tráfego que não passaria por um firewall central. Um load balancer gera logs de acesso. Um DNS privado registra resolução interna. Um serviço de auditoria registra quem alterou rota, regra, IAM policy, bucket, função serverless ou endpoint privado.</p>\n  <p>Um incidente cloud pode exigir correlação entre: flow log, audit log, IAM, DNS, load balancer, WAF, Kubernetes audit, container runtime, secrets manager e pipeline CI/CD. O erro comum é enviar apenas logs de firewall tradicional e esquecer que o plano de controle cloud também é superfície de ataque.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>DevSecOps entra em SIEM de duas formas. Primeiro, a infraestrutura de logs pode ser definida como código: fontes obrigatórias, retenção, parsing, tags, alertas e dashboards podem ser versionados, revisados e promovidos entre ambientes. Segundo, pipelines também são fonte de telemetria: execução de build, acesso a secrets, uso de OIDC federation, deploy, mudança de firewall, alteração de DNS e criação de recursos cloud são eventos de segurança.</p>\n  <p>Em uma prática madura, uma mudança de Terraform que abre porta para a internet deve gerar evidência: pull request, aprovação, pipeline, plano aplicado, evento de auditoria cloud, regra efetiva e alerta se violar política. Isso conecta rede, cloud, IAM e governança.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Em segurança, logs só são úteis se ajudam a responder perguntas. Coletar tudo sem critério aumenta custo e ruído. Coletar pouco cria cegueira. A decisão correta considera risco, criticidade, retenção, privacidade, custo, capacidade de resposta e valor investigativo.</p>\n  <table class=\"risk-table\">\n    <thead>\n      <tr>\n        <th>Risco</th>\n        <th>Como aparece</th>\n        <th>Impacto</th>\n        <th>Mitigação</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>Log sem contexto</td>\n        <td>Eventos têm IP, mas não usuário, ativo ou zona.</td>\n        <td>Investigação lenta e inconclusiva.</td>\n        <td>Enriquecimento com DHCP, IAM, inventário e CMDB.</td>\n      </tr>\n      <tr>\n        <td>Relógio inconsistente</td>\n        <td>Eventos parecem fora de ordem.</td>\n        <td>Linha do tempo incorreta.</td>\n        <td>NTP confiável e monitoramento de drift.</td>\n      </tr>\n      <tr>\n        <td>Retenção insuficiente</td>\n        <td>Incidente descoberto depois que logs expiraram.</td>\n        <td>Perda de evidência e falha de auditoria.</td>\n        <td>Retenção por criticidade e requisitos legais.</td>\n      </tr>\n      <tr>\n        <td>Excesso de ruído</td>\n        <td>Muitos alertas sem ação possível.</td>\n        <td>Fadiga de alerta e baixa confiança no SIEM.</td>\n        <td>Tuning, priorização por risco e playbooks.</td>\n      </tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra como eventos de várias fontes entram em um pipeline de telemetria, são normalizados, enriquecidos e transformados em investigação.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 520\" role=\"img\" aria-labelledby=\"siem-title siem-desc\">\n    <title id=\"siem-title\">Pipeline de logs, SIEM e correlação de eventos de rede</title>\n    <desc id=\"siem-desc\">Fontes como firewall, DNS, DHCP, RADIUS, EDR, cloud e sensores enviam eventos para coletores, normalização, enriquecimento, SIEM e SOC.</desc>\n    <defs>\n      <marker id=\"arrow-siem\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"30\" y=\"45\" width=\"190\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"125\" y=\"78\" text-anchor=\"middle\" class=\"svg-label\">Firewall / VPN</text>\n    <rect x=\"30\" y=\"120\" width=\"190\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"125\" y=\"153\" text-anchor=\"middle\" class=\"svg-label\">DNS / DHCP</text>\n    <rect x=\"30\" y=\"195\" width=\"190\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"125\" y=\"228\" text-anchor=\"middle\" class=\"svg-label\">RADIUS / IAM</text>\n    <rect x=\"30\" y=\"270\" width=\"190\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--client\" />\n    <text x=\"125\" y=\"303\" text-anchor=\"middle\" class=\"svg-label\">EDR / Host</text>\n    <rect x=\"30\" y=\"345\" width=\"190\" height=\"55\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"125\" y=\"378\" text-anchor=\"middle\" class=\"svg-label\">Cloud Audit / Flow</text>\n    <rect x=\"300\" y=\"135\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"385\" y=\"172\" text-anchor=\"middle\" class=\"svg-label\">Coletores</text>\n    <text x=\"385\" y=\"196\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">syslog, agente, API</text>\n    <rect x=\"535\" y=\"135\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"630\" y=\"168\" text-anchor=\"middle\" class=\"svg-label\">Normalização</text>\n    <text x=\"630\" y=\"193\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">campos, tempo, parsing</text>\n    <rect x=\"535\" y=\"285\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node\" />\n    <text x=\"630\" y=\"318\" text-anchor=\"middle\" class=\"svg-label\">Enriquecimento</text>\n    <text x=\"630\" y=\"343\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativo, usuário, zona</text>\n    <rect x=\"795\" y=\"170\" width=\"190\" height=\"130\" rx=\"16\" class=\"svg-node svg-node--server\" />\n    <text x=\"890\" y=\"212\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n    <text x=\"890\" y=\"238\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">busca, correlação</text>\n    <text x=\"890\" y=\"264\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">alerta, retenção</text>\n    <rect x=\"815\" y=\"365\" width=\"150\" height=\"70\" rx=\"14\" class=\"svg-node svg-node--security\" />\n    <text x=\"890\" y=\"395\" text-anchor=\"middle\" class=\"svg-label\">SOC</text>\n    <text x=\"890\" y=\"417\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">caso e resposta</text>\n    <line x1=\"220\" y1=\"72\" x2=\"300\" y2=\"160\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"220\" y1=\"148\" x2=\"300\" y2=\"172\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"220\" y1=\"223\" x2=\"300\" y2=\"184\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"220\" y1=\"298\" x2=\"300\" y2=\"196\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"220\" y1=\"373\" x2=\"300\" y2=\"208\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"470\" y1=\"180\" x2=\"535\" y2=\"180\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"630\" y1=\"225\" x2=\"630\" y2=\"285\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"725\" y1=\"180\" x2=\"795\" y2=\"215\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"725\" y1=\"330\" x2=\"795\" y2=\"260\" class=\"svg-flow animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <line x1=\"890\" y1=\"300\" x2=\"890\" y2=\"365\" class=\"svg-flow svg-flow--response animated-flow\" marker-end=\"url(#arrow-siem)\" />\n    <rect x=\"500\" y=\"95\" width=\"520\" height=\"370\" rx=\"24\" class=\"svg-boundary\" />\n    <text x=\"760\" y=\"485\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">Pipeline de telemetria: qualidade dos campos + contexto + tempo confiável = investigação útil</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é defensivo e conceitual-prático: você vai desenhar um plano de fontes de log e correlação para investigar um incidente de rede. O foco não é instalar um SIEM específico, mas construir a capacidade mental de escolher fontes, campos, retenção, evidências e regras de correlação.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios treinam a diferença entre evento bruto, campo normalizado, contexto, correlação e alerta acionável. A meta é produzir raciocínio de SOC, não decorar nomes de ferramentas.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>Você receberá um cenário de possível movimentação lateral e deverá propor quais logs coletar, quais campos correlacionar e qual linha do tempo mínima construir para orientar a resposta.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada mostra como transformar um alerta genérico em investigação estruturada: hipótese, fontes, campos, correlação, evidência, lacunas e ação.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>SIEM não é apenas armazenamento: é busca, normalização, correlação, alerta e investigação.</li>\n    <li>Logs sem tempo confiável, campo consistente e contexto têm valor limitado.</li>\n    <li>Correlação conecta rede, identidade, endpoint, cloud e aplicação.</li>\n    <li>Detecção útil precisa de caso de uso, fonte certa, tuning e resposta possível.</li>\n    <li>O custo de logs exige priorização por risco, retenção planejada e descarte consciente.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, você estudará <strong>Threat Modeling de Rede: Ativos, Caminhos e Riscos</strong>. Depois de aprender a coletar e correlacionar evidências, o próximo passo é prever onde os riscos provavelmente aparecem, quais caminhos um incidente pode seguir e quais controles reduzem impacto antes da crise.</p>\n</section>\n"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "Syslog",
      "DNS",
      "DHCP",
      "RADIUS",
      "HTTP",
      "TLS",
      "NetFlow",
      "IPFIX",
      "SNMP",
      "NTP"
    ],
    "dependsOn": [
      "firewall",
      "ACL",
      "DNS",
      "DHCP",
      "NAT",
      "VPN",
      "IDS/IPS",
      "NDR",
      "Wi-Fi corporativo"
    ],
    "enables": [
      "SOC",
      "detecção",
      "threat hunting",
      "resposta a incidente",
      "auditoria",
      "RCA",
      "Zero Trust"
    ]
  },
  "protocolFields": [
    {
      "field": "timestamp",
      "size": "variável",
      "purpose": "Ordenar eventos em linha do tempo.",
      "securityObservation": "Relógio incorreto compromete correlação e auditoria."
    },
    {
      "field": "source.ip",
      "size": "32 ou 128 bits",
      "purpose": "Identificar origem lógica do evento de rede.",
      "securityObservation": "NAT, proxy e DHCP exigem contexto adicional."
    },
    {
      "field": "destination.ip",
      "size": "32 ou 128 bits",
      "purpose": "Identificar destino do fluxo ou evento.",
      "securityObservation": "Pode precisar de enriquecimento com zona, criticidade e dono."
    },
    {
      "field": "user.name",
      "size": "variável",
      "purpose": "Associar atividade a identidade autenticada.",
      "securityObservation": "Conta compartilhada reduz valor investigativo."
    },
    {
      "field": "event.action",
      "size": "variável",
      "purpose": "Descrever ação: allowed, denied, login, query, connect, alert.",
      "securityObservation": "Sem normalização, regras de correlação ficam frágeis."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Cliente",
      "action": "Gera tráfego ou autenticação.",
      "detail": "Pode consultar DNS, autenticar no RADIUS, abrir conexão TCP ou acessar aplicação.",
      "possibleFailure": "O evento não é logado ou não contém usuário/host."
    },
    {
      "step": 2,
      "actor": "Dispositivos de rede",
      "action": "Registram decisão ou observação.",
      "detail": "Firewall registra allow/deny, DNS registra query, DHCP registra lease, sensor registra alerta.",
      "possibleFailure": "Campos inconsistentes, horário errado ou perda de eventos."
    },
    {
      "step": 3,
      "actor": "Coletor/SIEM",
      "action": "Normaliza e correlaciona.",
      "detail": "Eventos são estruturados e conectados por tempo, IP, usuário, host e destino.",
      "possibleFailure": "Parsing incorreto ou falta de fonte crítica."
    },
    {
      "step": 4,
      "actor": "SOC",
      "action": "Investiga e responde.",
      "detail": "Analista valida hipótese, coleta evidência, abre caso e aciona playbook.",
      "possibleFailure": "Alerta sem contexto gera falso positivo ou atraso."
    }
  ],
  "trafficCapture": {
    "tool": "SIEM, syslog, flow logs, tcpdump/Wireshark em ambiente autorizado",
    "filter": "dns or radius or tcp.port == 443 or udp.port == 514",
    "whatToObserve": [
      "horário do evento",
      "origem e destino",
      "ação permitida ou bloqueada",
      "usuário ou host associado",
      "volume e frequência",
      "correlação com DNS/DHCP/RADIUS"
    ],
    "interpretation": "Captura de pacote mostra detalhe técnico; SIEM e logs correlacionam esse detalhe com identidade, inventário e linha do tempo. As duas visões são complementares."
  },
  "deepDive": {
    "mentalModel": "Log é evidência de observação. Telemetria é conjunto de sinais. SIEM é mecanismo de busca e correlação. SOC é processo humano/técnico que transforma evidência em decisão.",
    "keyTerms": [
      "log",
      "evento",
      "telemetria",
      "SIEM",
      "correlação",
      "normalização",
      "parsing",
      "enriquecimento",
      "retenção",
      "caso de uso",
      "falso positivo",
      "linha do tempo"
    ],
    "limitations": [
      "SIEM não detecta o que não foi coletado.",
      "Logs podem mentir por configuração ruim, horário incorreto, NAT, proxy ou perda de evento.",
      "Correlação exige campos consistentes e contexto de identidade/ativo.",
      "Coletar tudo pode ser financeiramente inviável.",
      "Alerta sem playbook não melhora resposta."
    ],
    "whenToUse": [
      "Investigação de incidente.",
      "Monitoramento de segurança.",
      "Auditoria e conformidade.",
      "Threat hunting.",
      "Correlação entre rede, identidade, endpoint e cloud.",
      "Medição de eficácia de controles."
    ],
    "whenNotToUse": [
      "Como substituto de firewall, EDR ou hardening.",
      "Como depósito indiscriminado sem caso de uso.",
      "Como prova única sem validação cruzada.",
      "Como solução mágica sem processo de SOC."
    ],
    "operationalImpact": [
      "Exige engenharia de ingestão, parsing, normalização e retenção.",
      "Exige donos para alertas, playbooks e tuning.",
      "Exige NTP, inventário e CMDB minimamente confiáveis.",
      "Pode aumentar complexidade de investigação se fontes forem mal configuradas."
    ],
    "financialImpact": [
      "Volume de ingestão e retenção pode gerar custo alto em licenciamento, storage e cloud.",
      "PCAP completo e logs verbosos devem ser usados com critério.",
      "Fontes críticas devem ser priorizadas por risco e valor investigativo.",
      "Arquivamento frio pode reduzir custo sem eliminar evidência."
    ],
    "securityImpact": [
      "Melhora detecção e resposta quando há fonte, contexto e caso de uso.",
      "Logs podem conter dados sensíveis e exigem controle de acesso.",
      "Ausência de logs favorece permanência e movimentação lateral sem detecção.",
      "Alertas mal calibrados geram fadiga e reduzem confiança do SOC."
    ]
  },
  "realWorld": {
    "homeScenario": "Verificar log do roteador, IP do notebook, DNS e horário para entender falha de acesso.",
    "smallBusinessScenario": "Centralizar logs de firewall, VPN e servidores em um syslog com retenção mínima.",
    "enterpriseScenario": "Correlacionar firewall, DNS, DHCP, RADIUS, EDR, proxy, AD e SIEM para investigar movimento lateral.",
    "cloudScenario": "Unir flow logs, audit logs, DNS privado, load balancer logs e IAM para investigar exposição ou acesso suspeito.",
    "incidentScenario": "Alerta de conexão suspeita é validado com usuário, host, DHCP, DNS, processo, regra de firewall e histórico de comportamento."
  },
  "commonMistakes": [
    {
      "mistake": "Achar que SIEM detecta tudo automaticamente.",
      "whyItHappens": "Ferramentas são vendidas como plataformas inteligentes, mas dependem de fontes e casos de uso.",
      "consequence": "Falsa sensação de segurança.",
      "correction": "Definir casos de uso, fontes, campos, regras, playbooks e tuning contínuo."
    },
    {
      "mistake": "Coletar muitos logs sem normalização.",
      "whyItHappens": "Centralização parece progresso suficiente.",
      "consequence": "Busca difícil, correlação fraca e custo alto.",
      "correction": "Padronizar campos e mapear fontes para casos de uso."
    },
    {
      "mistake": "Ignorar NTP.",
      "whyItHappens": "Tempo parece detalhe operacional, não controle de segurança.",
      "consequence": "Linha do tempo errada e investigação inconclusiva.",
      "correction": "Monitorar sincronização de tempo em fontes críticas."
    },
    {
      "mistake": "Não correlacionar DHCP/NAT.",
      "whyItHappens": "Analistas tratam IP como identidade permanente.",
      "consequence": "Atribuição incorreta de atividade.",
      "correction": "Guardar lease DHCP, NAT translation, VPN session e contexto de usuário."
    },
    {
      "mistake": "Criar alerta sem ação possível.",
      "whyItHappens": "Busca por cobertura de detecção sem playbook.",
      "consequence": "Ruído e fadiga de alerta.",
      "correction": "Cada alerta deve ter severidade, triagem, evidências e ação sugerida."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "SIEM recebe eventos sem campos úteis.",
      "Alertas aparecem duplicados.",
      "Eventos chegam com horário errado.",
      "Não é possível descobrir qual usuário usava um IP.",
      "Busca por incidente antigo não encontra logs.",
      "SOC recebe muitos falsos positivos."
    ],
    "diagnosticQuestions": [
      "A fonte está enviando eventos?",
      "O parser está extraindo campos corretamente?",
      "O relógio da fonte está sincronizado?",
      "Existe contexto de DHCP, NAT, VPN e IAM?",
      "A regra de correlação tem caso de uso claro?",
      "A retenção cobre a janela de investigação?"
    ],
    "commands": [
      {
        "platform": "Linux",
        "command": "timedatectl status",
        "purpose": "Verificar sincronização de tempo do host/coletor.",
        "expectedObservation": "NTP ativo e horário correto.",
        "interpretation": "Tempo confiável é pré-requisito para correlação."
      },
      {
        "platform": "Linux",
        "command": "logger 'teste-siem-aula-13-5' && journalctl -n 20",
        "purpose": "Gerar e visualizar evento local de teste.",
        "expectedObservation": "Mensagem de teste aparece no journal/syslog local.",
        "interpretation": "Ajuda a validar geração de evento antes de culpar o SIEM."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Get-WinEvent -LogName Security -MaxEvents 5",
        "purpose": "Consultar eventos recentes de segurança no Windows.",
        "expectedObservation": "Eventos com horário, ID e provedor.",
        "interpretation": "Mostra que endpoint também é fonte de telemetria."
      },
      {
        "platform": "Windows PowerShell",
        "command": "Get-Date",
        "purpose": "Verificar horário local para comparação com eventos.",
        "expectedObservation": "Horário coerente com timezone esperado.",
        "interpretation": "Diferença de horário afeta linha do tempo."
      },
      {
        "platform": "Cisco IOS",
        "command": "show logging",
        "purpose": "Verificar logs locais e destino de syslog em equipamentos Cisco.",
        "expectedObservation": "Eventos recentes e configuração de logging.",
        "interpretation": "Confirma se o equipamento possui eventos e para onde envia."
      }
    ],
    "decisionTree": [
      {
        "if": "Nenhum evento chega ao SIEM",
        "then": "Verificar se a fonte gera log, rota até coletor, firewall, protocolo de envio e credenciais/API."
      },
      {
        "if": "Evento chega sem campos",
        "then": "Verificar parser, formato, timezone, versão da fonte e normalização."
      },
      {
        "if": "Alerta dispara demais",
        "then": "Revisar lógica, baseline, exceções, severidade, janela temporal e contexto de risco."
      },
      {
        "if": "Não há atribuição de usuário",
        "then": "Correlacionar DHCP, VPN, RADIUS, IAM, AD, EDR e inventário."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Sincronizar tempo com NTP confiável.",
      "Definir fontes críticas por caso de uso.",
      "Normalizar campos essenciais.",
      "Enriquecer eventos com usuário, ativo, zona e criticidade.",
      "Controlar acesso aos logs.",
      "Proteger integridade e retenção de evidências.",
      "Criar playbooks para alertas importantes.",
      "Revisar ruído e falsos positivos periodicamente."
    ],
    "badPractices": [
      "Coletar logs sem dono e sem caso de uso.",
      "Usar conta compartilhada para administração.",
      "Não guardar DHCP, VPN e NAT translation.",
      "Não monitorar falha de ingestão.",
      "Permitir acesso amplo aos logs sensíveis.",
      "Criar alerta que ninguém investiga."
    ],
    "commonErrors": [
      "Confundir evento com incidente.",
      "Confundir alerta com prova final.",
      "Achar que IP identifica pessoa sem contexto.",
      "Ignorar timezone e drift de relógio.",
      "Manter logs críticos por poucos dias."
    ],
    "vulnerabilities": [
      {
        "name": "Cegueira operacional por falta de logs",
        "description": "Fontes críticas não enviam eventos ou enviam eventos incompletos.",
        "defensiveExplanation": "Sem evidência, resposta e auditoria ficam limitadas.",
        "mitigation": "Mapear fontes críticas, monitorar ingestão e testar casos de uso."
      },
      {
        "name": "Exposição de dados sensíveis em logs",
        "description": "Logs podem conter nomes, IPs, URLs, tokens, e-mails e detalhes de infraestrutura.",
        "defensiveExplanation": "O SIEM vira alvo de alto valor.",
        "mitigation": "Controle de acesso, mascaramento quando aplicável, retenção e auditoria de consulta."
      },
      {
        "name": "Fadiga de alerta",
        "description": "Alertas demais e pouco qualificados levam analistas a ignorar eventos reais.",
        "defensiveExplanation": "Ruído reduz capacidade de resposta.",
        "mitigation": "Tuning, severidade por risco, supressão, enriquecimento e playbooks."
      }
    ],
    "monitoring": [
      "Falha de ingestão por fonte.",
      "Atraso de eventos.",
      "Volume anormal de logs.",
      "Campos obrigatórios ausentes.",
      "Acesso administrativo ao SIEM.",
      "Alteração em regras de correlação.",
      "Desativação de logging em ativos críticos."
    ],
    "hardening": [
      "Separar privilégios de administração e leitura.",
      "Habilitar MFA para consoles de SIEM.",
      "Usar TLS/API segura para transporte quando possível.",
      "Restringir quem pode apagar ou alterar retenção.",
      "Versionar regras e dashboards críticos.",
      "Fazer backup de configurações do SIEM."
    ],
    "detectionIdeas": [
      "Conexão externa após autenticação VPN incomum.",
      "Muitas consultas DNS para domínios recém-observados.",
      "Aumento de conexões leste-oeste a partir de estação de usuário.",
      "Firewall permitiu acesso raro a servidor crítico.",
      "Falhas de login seguidas de sucesso e novo padrão de tráfego.",
      "Alteração de regra de segurança seguida de tráfego antes bloqueado."
    ]
  },
  "lab": {
    "id": "lab-13.5",
    "title": "Construindo um plano de correlação de logs para investigação de rede",
    "labType": "cloud",
    "objective": "Criar um plano defensivo de fontes, campos, correlação e evidências para investigar um alerta de rede no SOC.",
    "scenario": "O SOC recebeu um alerta de que o host 10.20.30.45 iniciou conexões para múltiplos servidores internos e consultou um domínio externo incomum. Você deve descobrir quais logs são necessários para validar a hipótese sem executar ações ofensivas.",
    "topology": "Usuário/Host -> Switch/AP/VPN -> DHCP/DNS/RADIUS -> Firewall interno -> Servidores -> Proxy/Internet -> SIEM/SOC",
    "architecture": "Ambiente corporativo segmentado com logs de rede, identidade, endpoint e cloud enviados ao SIEM por syslog, agentes ou APIs.",
    "prerequisites": [
      "Conhecer DNS, DHCP, firewall, VPN, RADIUS e sensores de rede.",
      "Ter concluído as aulas 13.1 a 13.4.",
      "Usar apenas ambiente autorizado ou simulação documental."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Terminal Linux opcional",
      "PowerShell opcional",
      "SIEM real ou simulado",
      "Documentação de topologia"
    ],
    "estimatedTimeMinutes": 180,
    "cost": "zero",
    "safetyNotes": [
      "Não gere tráfego ofensivo.",
      "Não colete logs de terceiros sem autorização.",
      "Não exponha dados pessoais em evidências compartilhadas.",
      "Mascarar usuários, IPs públicos e domínios sensíveis quando necessário.",
      "O laboratório é defensivo e baseado em planejamento/correlação.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir a pergunta de investigação",
        "instruction": "Escreva a pergunta principal que o SOC precisa responder.",
        "command": "Pergunta: o host 10.20.30.45 realizou atividade lateral suspeita e comunicação externa anômala?",
        "expectedOutput": "Uma pergunta objetiva de investigação.",
        "explanation": "Sem pergunta clara, a coleta de logs vira busca infinita."
      },
      {
        "number": 2,
        "title": "Mapear fontes mínimas",
        "instruction": "Liste fontes necessárias para responder quem, o quê, quando, de onde, para onde e com qual resultado.",
        "command": "Fontes: DHCP, DNS, firewall, RADIUS/VPN, EDR, inventário, NetFlow/NDR, proxy, AD/IAM.",
        "expectedOutput": "Lista de fontes associadas a perguntas investigativas.",
        "explanation": "Cada fonte cobre uma lacuna: IP, usuário, destino, processo, autenticação, volume ou regra."
      },
      {
        "number": 3,
        "title": "Definir campos obrigatórios",
        "instruction": "Crie uma tabela com campos mínimos por fonte.",
        "command": "Campos: timestamp, source.ip, destination.ip, user.name, host.name, event.action, event.outcome, rule.name, dns.question.name, network.bytes.",
        "expectedOutput": "Tabela de campos essenciais.",
        "explanation": "Campos padronizados permitem correlação entre ferramentas."
      },
      {
        "number": 4,
        "title": "Construir linha do tempo",
        "instruction": "Monte uma linha do tempo hipotética com eventos relacionados.",
        "command": "08:11 RADIUS auth; 08:12 DHCP lease; 08:14 DNS query; 08:15 firewall allow; 08:16 EDR process; 08:17 NetFlow spike.",
        "expectedOutput": "Sequência temporal coerente.",
        "explanation": "Linha do tempo ajuda a separar causa, consequência e coincidência."
      },
      {
        "number": 5,
        "title": "Identificar lacunas",
        "instruction": "Marque quais evidências faltariam se uma fonte não existisse.",
        "command": "Sem DHCP: IP não vira host. Sem EDR: conexão não vira processo. Sem RADIUS: rede não vira usuário.",
        "expectedOutput": "Lista de lacunas e impacto investigativo.",
        "explanation": "Lacunas mostram prioridades de melhoria de telemetria."
      },
      {
        "number": 6,
        "title": "Desenhar regra de correlação",
        "instruction": "Escreva uma lógica defensiva em linguagem natural.",
        "command": "Se estação de usuário iniciar conexões para mais de 10 servidores em 5 minutos e houver DNS incomum no mesmo período, gerar alerta médio/alto com enriquecimento de usuário e host.",
        "expectedOutput": "Regra de correlação com janela temporal e contexto.",
        "explanation": "Regra útil precisa de condição, janela, contexto e ação."
      },
      {
        "number": 7,
        "title": "Definir validação e resposta",
        "instruction": "Liste como validar o alerta e qual ação inicial tomar.",
        "command": "Validar com EDR, usuário, inventário, mudança autorizada, volume, destino e histórico; se confirmado, isolar host ou restringir segmento conforme playbook.",
        "expectedOutput": "Plano de triagem e ação defensiva.",
        "explanation": "Detecção sem resposta operacional não reduz risco."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um plano de correlação com fontes, campos, linha do tempo, lacunas, regra e ação de resposta defensiva.",
    "validation": [
      {
        "check": "Há fontes suficientes para atribuir IP a host e usuário?",
        "command": "Verificar presença de DHCP, RADIUS/VPN/IAM e inventário.",
        "expected": "IP, usuário e host podem ser correlacionados por horário.",
        "ifFails": "Adicionar fonte ausente ou reconhecer lacuna no relatório."
      },
      {
        "check": "Há evidência de tráfego e destino?",
        "command": "Verificar firewall, NetFlow/NDR, DNS e proxy.",
        "expected": "É possível saber quem falou com quem e qual nome foi resolvido.",
        "ifFails": "Adicionar logs de rede ou reduzir confiança da conclusão."
      },
      {
        "check": "Há contexto de endpoint?",
        "command": "Verificar EDR ou logs de host.",
        "expected": "Conexão pode ser associada a processo ou usuário local.",
        "ifFails": "Tratar como lacuna crítica de investigação."
      },
      {
        "check": "Linha do tempo é coerente?",
        "command": "Comparar timestamps e timezone.",
        "expected": "Eventos ordenados sem saltos inexplicáveis.",
        "ifFails": "Validar NTP e timezone das fontes."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Não consigo atribuir IP a usuário.",
        "probableCause": "Falta de DHCP, VPN, RADIUS ou inventário correlacionável.",
        "howToConfirm": "Verificar logs de lease e autenticação no mesmo horário.",
        "fix": "Habilitar retenção de DHCP/VPN/RADIUS e enriquecer SIEM com inventário."
      },
      {
        "symptom": "Eventos aparecem fora de ordem.",
        "probableCause": "Timezone ou NTP incorreto.",
        "howToConfirm": "Comparar horário das fontes com referência confiável.",
        "fix": "Corrigir NTP/timezone e documentar incerteza em eventos antigos."
      },
      {
        "symptom": "Alerta dispara para atividades legítimas.",
        "probableCause": "Regra sem baseline ou exceções de operação.",
        "howToConfirm": "Comparar com histórico, janela de manutenção e ativos de administração.",
        "fix": "Adicionar contexto, allowlist controlada, severidade dinâmica e tuning."
      }
    ],
    "improvements": [
      "Adicionar inventário de criticidade dos ativos.",
      "Versionar regras de correlação.",
      "Criar dashboard por caso de uso.",
      "Medir tempo médio de triagem.",
      "Criar teste periódico de ingestão por fonte.",
      "Integrar alertas críticos com sistema de casos."
    ],
    "evidenceToCollect": [
      "Tabela de fontes e campos.",
      "Linha do tempo do incidente.",
      "Lista de lacunas.",
      "Lógica de correlação.",
      "Plano de retenção.",
      "Ação de resposta proposta."
    ],
    "questions": [
      "Qual fonte transforma IP em usuário?",
      "Qual fonte transforma conexão em processo?",
      "Qual fonte prova decisão de firewall?",
      "Qual campo é indispensável para linha do tempo?",
      "Qual lacuna impediria conclusão executiva?"
    ],
    "challenge": "Crie uma regra de correlação para detectar possível movimento lateral sem gerar alerta sempre que administradores fazem manutenção legítima.",
    "solution": "A regra deve combinar volume incomum, múltiplos destinos, tipo de host, horário, usuário, grupo administrativo, janela de manutenção, histórico e criticidade. Também deve gerar evidências de suporte e não bloquear automaticamente sem validação quando houver risco de impacto operacional."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que um log isolado raramente basta para concluir um incidente?",
      "hints": [
        "Pense em IP dinâmico.",
        "Pense em NAT, usuário, processo e horário."
      ],
      "expectedIdeas": [
        "contexto",
        "correlação",
        "identidade",
        "linha do tempo",
        "validação cruzada"
      ],
      "explanation": "Incidentes atravessam rede, identidade, endpoint e aplicação. Cada fonte mostra apenas uma parte."
    },
    {
      "type": "diagnóstico",
      "question": "Um alerta mostra conexão suspeita a partir de 10.20.30.45. O que você consulta antes de culpar um usuário?",
      "hints": [
        "Quem tinha esse IP?",
        "Qual processo abriu conexão?",
        "Houve VPN ou Wi-Fi?"
      ],
      "expectedIdeas": [
        "DHCP",
        "RADIUS/VPN",
        "EDR",
        "inventário",
        "firewall",
        "DNS"
      ],
      "explanation": "IP sozinho não identifica pessoa nem processo. É preciso correlacionar fontes."
    },
    {
      "type": "cenário real",
      "question": "Seu SIEM recebe muitos logs, mas o SOC não confia nos alertas. Qual melhoria você priorizaria?",
      "hints": [
        "Pense em caso de uso.",
        "Pense em tuning e contexto."
      ],
      "expectedIdeas": [
        "casos de uso",
        "normalização",
        "enriquecimento",
        "redução de ruído",
        "playbooks",
        "métricas"
      ],
      "explanation": "Volume não é maturidade. Detecção útil exige qualidade, contexto e ação."
    }
  ],
  "quiz": [
    {
      "id": "q13.5.1",
      "type": "conceito",
      "q": "Qual é a melhor definição de correlação em SIEM?",
      "opts": [
        "Conectar eventos de fontes diferentes por chaves como tempo, IP, usuário e ativo para formar contexto investigativo.",
        "Guardar todos os logs indefinidamente.",
        "Bloquear automaticamente todo tráfego suspeito.",
        "Substituir firewall por regras de busca."
      ],
      "a": 0,
      "exp": "Correlação conecta eventos relacionados para reduzir incerteza e orientar investigação.",
      "difficulty": "intermediário",
      "topic": "correlação"
    },
    {
      "id": "q13.5.2",
      "type": "diagnóstico",
      "q": "Um alerta mostra tráfego suspeito de um IP interno. Qual fonte ajuda a descobrir qual host recebeu aquele IP no horário?",
      "opts": [
        "DHCP",
        "WAF",
        "NTP",
        "Certificado TLS público"
      ],
      "a": 0,
      "exp": "DHCP registra leases e ajuda a associar IP dinâmico a host/MAC em um horário.",
      "difficulty": "intermediário",
      "topic": "dhcp"
    },
    {
      "id": "q13.5.3",
      "type": "segurança",
      "q": "Qual é um risco de permitir acesso amplo aos logs do SIEM?",
      "opts": [
        "Logs podem conter dados sensíveis e detalhes de infraestrutura úteis a atacantes.",
        "O SIEM deixa de receber eventos automaticamente.",
        "O firewall para de rotear pacotes.",
        "O DNS passa a resolver apenas nomes internos."
      ],
      "a": 0,
      "exp": "Logs são ativos sensíveis. Podem revelar usuários, IPs, URLs, regras, falhas e topologia.",
      "difficulty": "intermediário",
      "topic": "privacidade"
    },
    {
      "id": "q13.5.4",
      "type": "arquitetura",
      "q": "Por que NTP é essencial em investigação?",
      "opts": [
        "Porque eventos precisam ser ordenados corretamente em uma linha do tempo.",
        "Porque substitui o SIEM.",
        "Porque criptografa logs por padrão.",
        "Porque impede consultas DNS maliciosas."
      ],
      "a": 0,
      "exp": "Correlação depende de tempo confiável. Relógios desalinhados distorcem causa e consequência.",
      "difficulty": "iniciante",
      "topic": "tempo"
    },
    {
      "id": "q13.5.5",
      "type": "cloud",
      "q": "Em cloud, além de flow logs, qual fonte é crítica para saber quem alterou regras, rotas ou permissões?",
      "opts": [
        "Audit logs do plano de controle",
        "Somente ping ICMP",
        "ARP cache local",
        "Tabela CAM do switch físico do provedor"
      ],
      "a": 0,
      "exp": "Audit logs registram ações no plano de controle, como alterações de IAM, rede e recursos.",
      "difficulty": "intermediário",
      "topic": "cloud"
    },
    {
      "id": "q13.5.6",
      "type": "pegadinha",
      "q": "Qual afirmação é mais correta?",
      "opts": [
        "Evento não é automaticamente incidente; precisa de contexto e validação.",
        "Todo alerta deve bloquear tráfego automaticamente.",
        "IP interno sempre identifica uma pessoa.",
        "Coletar todos os logs sempre reduz custo."
      ],
      "a": 0,
      "exp": "Evento e alerta são sinais. Incidente exige análise, validação e impacto confirmado ou provável.",
      "difficulty": "intermediário",
      "topic": "soc"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.5.1",
      "front": "O que é SIEM?",
      "back": "Plataforma para ingerir, normalizar, armazenar, buscar, correlacionar e alertar sobre eventos de segurança.",
      "tags": [
        "siem"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.5.2",
      "front": "O que é correlação?",
      "back": "Conectar eventos por tempo, IP, usuário, ativo, destino ou ação para formar contexto investigativo.",
      "tags": [
        "correlação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.5.3",
      "front": "Por que DHCP é importante em investigação?",
      "back": "Porque ajuda a descobrir qual host usava um IP dinâmico em determinado horário.",
      "tags": [
        "dhcp",
        "logs"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.5.4",
      "front": "Por que NTP é crítico?",
      "back": "Porque relógios alinhados permitem linha do tempo confiável entre fontes diferentes.",
      "tags": [
        "ntp",
        "timeline"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.5.5",
      "front": "Evento é igual a incidente?",
      "back": "Não. Evento é algo observado; incidente exige contexto, validação e impacto de segurança real ou provável.",
      "tags": [
        "soc"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.5.6",
      "front": "Qual o perigo de coletar tudo sem critério?",
      "back": "Custo alto, ruído, dificuldade de busca, fadiga de alerta e pouca ação prática.",
      "tags": [
        "telemetria",
        "custo"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex13.5.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre log, alerta e incidente.",
      "expectedAnswer": "Log é registro de evento; alerta é sinal gerado por regra ou análise; incidente é evento ou conjunto de eventos com impacto real ou provável de segurança.",
      "explanation": "A distinção evita tratar todo evento como crise e todo alerta como verdade final."
    },
    {
      "id": "ex13.5.2",
      "type": "diagnóstico",
      "prompt": "Um IP interno acessou domínio suspeito. Liste cinco fontes para investigar.",
      "expectedAnswer": "DNS, DHCP, firewall/proxy, EDR, RADIUS/VPN/IAM, inventário e NetFlow/NDR são fontes úteis.",
      "explanation": "Cada fonte responde uma parte: nome, IP-host, tráfego, processo, usuário e volume."
    },
    {
      "id": "ex13.5.3",
      "type": "arquitetura",
      "prompt": "Desenhe uma política mínima de retenção para firewall, DNS, DHCP e autenticação.",
      "expectedAnswer": "Priorizar retenção pesquisável para fontes de atribuição e tráfego; DHCP/autenticação devem cobrir janela de investigação; firewall/DNS podem ter retenção quente e arquivamento frio conforme risco e custo.",
      "explanation": "Retenção deve equilibrar valor investigativo, custo e requisitos legais."
    },
    {
      "id": "ex13.5.4",
      "type": "segurança",
      "prompt": "Por que logs do SIEM precisam de controle de acesso forte?",
      "expectedAnswer": "Porque contêm dados sensíveis, detalhes de topologia, usuários, falhas, URLs, regras e evidências de incidentes.",
      "explanation": "SIEM é ativo crítico e pode ser usado para espionagem interna ou apagamento de rastros se mal protegido."
    }
  ],
  "challenge": {
    "title": "Criar um caso de uso de SIEM para possível movimento lateral",
    "scenario": "A empresa quer detectar quando uma estação de usuário começa a acessar muitos servidores internos em curto período, especialmente fora do padrão histórico.",
    "tasks": [
      "Definir fontes necessárias.",
      "Definir campos mínimos.",
      "Criar lógica de correlação em linguagem natural.",
      "Indicar como reduzir falsos positivos.",
      "Definir evidências para o analista.",
      "Sugerir ação inicial de resposta."
    ],
    "constraints": [
      "Não bloquear automaticamente sem validação.",
      "Considerar administradores e janelas de manutenção.",
      "Correlacionar usuário, host, IP, destino, portas e volume.",
      "Incluir pelo menos uma fonte de identidade e uma de endpoint."
    ],
    "expectedDeliverables": [
      "Tabela de fontes e campos.",
      "Regra em linguagem natural.",
      "Linha do tempo esperada.",
      "Critérios de severidade.",
      "Playbook inicial de triagem."
    ],
    "gradingRubric": [
      {
        "criterion": "Fontes adequadas",
        "points": 25,
        "description": "Inclui firewall/flow, DHCP, identidade, endpoint e inventário."
      },
      {
        "criterion": "Correlação clara",
        "points": 25,
        "description": "Define janela temporal, volume, destinos e chaves de correlação."
      },
      {
        "criterion": "Redução de falso positivo",
        "points": 20,
        "description": "Considera baseline, administradores, mudanças e manutenção."
      },
      {
        "criterion": "Resposta operacional",
        "points": 20,
        "description": "Define triagem, evidências e ações defensivas proporcionais."
      },
      {
        "criterion": "Segurança e privacidade",
        "points": 10,
        "description": "Protege dados sensíveis e limita acesso aos logs."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "O caso de uso deve começar pela pergunta: uma estação comum está se comportando como ponto de exploração lateral? Para responder, precisamos associar IP a host, host a usuário, conexões a destinos, destinos a criticidade, processo a conexão e horário a uma linha do tempo confiável.",
    "steps": [
      "Coletar logs de firewall interno ou NetFlow para conexões leste-oeste.",
      "Correlacionar DHCP para transformar IP em host no horário.",
      "Correlacionar RADIUS/VPN/IAM/AD para identificar usuário e sessão.",
      "Usar EDR para associar conexão a processo.",
      "Enriquecer destinos com criticidade e zona.",
      "Comparar com baseline e janela de manutenção.",
      "Gerar alerta com evidências e ação de triagem."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Alertar sempre que houver mais de cinco conexões internas.",
        "whyItIsWrong": "Isso gera falso positivo em atualizações, scanners autorizados e ferramentas administrativas."
      },
      {
        "answer": "Usar apenas firewall sem DHCP ou identidade.",
        "whyItIsWrong": "O firewall mostra fluxo, mas não atribui corretamente host, usuário e processo."
      },
      {
        "answer": "Bloquear automaticamente toda atividade suspeita.",
        "whyItIsWrong": "Pode derrubar operação legítima. Bloqueio automático exige alta confiança e desenho cuidadoso."
      }
    ],
    "finalAnswer": "Uma boa solução combina firewall/NetFlow, DHCP, IAM/RADIUS, EDR, inventário, criticidade e baseline. A regra deve observar múltiplos destinos internos em janela curta, fora do padrão do host/usuário, com portas sensíveis ou servidores críticos, gerando alerta enriquecido para triagem. A resposta inicial deve validar processo, mudança autorizada e risco antes de isolar o host ou bloquear fluxos."
  },
  "glossary": [
    {
      "term": "SIEM",
      "shortDefinition": "Plataforma de gerenciamento de eventos e informações de segurança.",
      "longDefinition": "Sistema que ingere, normaliza, armazena, busca, correlaciona e alerta sobre eventos de segurança de várias fontes.",
      "example": "Correlacionar firewall, DNS, DHCP e EDR para investigar um host suspeito.",
      "relatedTerms": [
        "SOC",
        "correlação",
        "telemetria"
      ],
      "relatedLessons": [
        "13.4",
        "13.5",
        "13.9"
      ]
    },
    {
      "term": "Correlação",
      "shortDefinition": "Conexão de eventos relacionados para formar contexto.",
      "longDefinition": "Processo de relacionar eventos por tempo, IP, usuário, ativo, destino, ação ou outros campos comuns.",
      "example": "Relacionar uma consulta DNS com conexão de firewall e processo no endpoint.",
      "relatedTerms": [
        "linha do tempo",
        "alerta",
        "caso de uso"
      ],
      "relatedLessons": [
        "13.5"
      ]
    },
    {
      "term": "Telemetria",
      "shortDefinition": "Conjunto de sinais coletados do ambiente.",
      "longDefinition": "Inclui logs, métricas, traces, flow logs, alertas, eventos de identidade, endpoint, cloud e rede.",
      "example": "Flow logs, logs de firewall, eventos de login e EDR enviados ao SIEM.",
      "relatedTerms": [
        "logs",
        "observabilidade",
        "SIEM"
      ],
      "relatedLessons": [
        "13.4",
        "13.5",
        "15.2"
      ]
    },
    {
      "term": "Normalização",
      "shortDefinition": "Padronização de campos de eventos.",
      "longDefinition": "Transformação de formatos diferentes em campos comuns para permitir busca e correlação.",
      "example": "Mapear src_ip, source.ip e client_ip para um campo comum de origem.",
      "relatedTerms": [
        "parser",
        "schema",
        "ECS"
      ],
      "relatedLessons": [
        "13.5"
      ]
    },
    {
      "term": "Retenção",
      "shortDefinition": "Tempo durante o qual logs são mantidos.",
      "longDefinition": "Política que define armazenamento pesquisável, arquivamento e descarte conforme risco, custo e requisitos legais.",
      "example": "Manter DNS e autenticação por período suficiente para investigar incidentes descobertos semanas depois.",
      "relatedTerms": [
        "storage",
        "auditoria",
        "forense"
      ],
      "relatedLessons": [
        "13.5",
        "16.11"
      ]
    },
    {
      "term": "Fadiga de alerta",
      "shortDefinition": "Perda de atenção causada por excesso de alertas de baixo valor.",
      "longDefinition": "Condição operacional em que analistas passam a ignorar alertas por volume, ruído e falsos positivos.",
      "example": "Regra que dispara centenas de vezes por dia sem gerar investigação útil.",
      "relatedTerms": [
        "falso positivo",
        "tuning",
        "SOC"
      ],
      "relatedLessons": [
        "13.4",
        "13.5",
        "13.9"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "NIST SP 800-92: Guide to Computer Security Log Management",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/92/final",
      "note": "Referência para práticas de gerenciamento de logs de segurança."
    },
    {
      "type": "official-doc",
      "title": "NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Base para relacionar logs com detectar, responder e recuperar."
    },
    {
      "type": "official-doc",
      "title": "MITRE ATT&CK Data Component: Network Traffic Flow",
      "organization": "MITRE",
      "url": "https://attack.mitre.org/datacomponents/DC0078/",
      "note": "Referência para fluxo de rede como componente de dado defensivo."
    },
    {
      "type": "official-doc",
      "title": "Elastic Common Schema: Event fields",
      "organization": "Elastic",
      "url": "https://www.elastic.co/docs/reference/ecs/ecs-event",
      "note": "Exemplo de schema comum para normalização de eventos."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — IDS, IPS, NDR, NetFlow e Sensores de Rede",
      "organization": "Deixando de ser TBN",
      "url": "internal://redes-e-network/m13/13.4",
      "note": "A aula anterior fornece fontes de telemetria que alimentam SIEM."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.x",
      "reason": "DNS, DHCP e NAT são fontes essenciais de contexto investigativo."
    },
    {
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.5",
      "reason": "Wi-Fi Enterprise e RADIUS geram eventos de identidade importantes para correlação."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "observabilidade",
      "lesson": "logs-metricas-traces",
      "reason": "Telemetria operacional e segurança compartilham fundamentos de coleta e análise."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "autenticacao",
      "lesson": "radius-oidc-saml",
      "reason": "Eventos de identidade são essenciais para transformar IP em ator autenticado."
    }
  ],
  "pedagogicalMap": {
    "problem": "Eventos de segurança ficam dispersos entre rede, identidade, endpoint, cloud e aplicação.",
    "concept": "SIEM centraliza, normaliza, busca, correlaciona e alerta sobre eventos.",
    "internalMechanism": "Fontes geram logs; coletores transportam; parsers estruturam; enriquecimento adiciona contexto; regras correlacionam; SOC investiga.",
    "realUse": "Investigar movimento lateral, acesso suspeito, alteração de regra, DNS anômalo e falha de autenticação.",
    "commonMistake": "Coletar muito log sem campo, contexto, retenção ou caso de uso.",
    "securityImpact": "Melhora detecção e resposta, mas logs sensíveis exigem proteção forte.",
    "operationalImpact": "Exige donos, tuning, playbooks, NTP, inventário e monitoramento de ingestão.",
    "summary": "SIEM útil não é depósito de logs; é processo de transformar eventos em evidência acionável."
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
      "13.6"
    ]
  }
};
