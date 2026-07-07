export const lesson1303 = {
  "id": "13.3",
  "moduleId": "m13",
  "order": 3,
  "title": "Hardening de Switches, Roteadores, Firewalls, APs e Hosts",
  "subtitle": "Como transformar configuração segura em baseline operacional para ativos de rede, segurança e sistemas.",
  "duration": "120-180 min",
  "estimatedStudyTimeMinutes": 180,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 330,
  "tags": [
    "redes",
    "segurança",
    "hardening",
    "baseline",
    "switch",
    "roteador",
    "firewall",
    "ap",
    "hosts",
    "aaa",
    "logs",
    "siem",
    "devsecops"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m03",
      "lesson": "3.x",
      "reason": "Switches, VLANs, trunks e camada 2 são base para hardening de acesso."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewalls e ACLs são necessários para entender plano de gestão e política de tráfego."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.7",
      "reason": "APs e Wi‑Fi corporativo entram no escopo de hardening de borda de acesso."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.2",
      "reason": "Segmentação define zonas e origem administrativa segura para hardening."
    }
  ],
  "objectives": [
    "Explicar por que hardening é processo contínuo, não checklist único.",
    "Identificar superfícies administrativas em switches, roteadores, firewalls, APs e hosts.",
    "Diferenciar hardening de gestão, hardening de plano de dados e hardening de telemetria.",
    "Criar baseline mínimo com serviços permitidos, serviços proibidos, logs e evidências.",
    "Relacionar hardening com IAM, AAA, DevSecOps, SIEM, auditoria e resposta a incidentes.",
    "Priorizar correções sem derrubar produção ou perder acesso administrativo."
  ],
  "learningOutcomes": [
    "Dado um ativo, o aluno consegue listar superfície administrativa e controles mínimos.",
    "Dado um checklist, o aluno consegue explicar o risco que cada item reduz.",
    "Dado um cenário de rede, o aluno consegue propor plano de hardening por fases.",
    "Dado um incidente, o aluno consegue identificar quais falhas de hardening aumentaram impacto.",
    "Dado um ambiente cloud ou DevSecOps, o aluno consegue traduzir hardening para policy as code e validação contínua."
  ],
  "content": {
    "motivation": "\n<section class=\"lesson-section lesson-section--motivation\">\n  <h2>1. Motivação</h2>\n  <p>Imagine uma empresa que investiu em firewall moderno, EDR, SIEM e Wi-Fi corporativo com 802.1X, mas ainda mantém switches com senha local antiga, roteadores aceitando gerenciamento por protocolos inseguros, APs sem atualização, firewalls com contas compartilhadas e servidores com serviços desnecessários expostos. A arquitetura pode até parecer sofisticada no desenho, mas cada equipamento mal configurado vira uma porta administrativa para erro, abuso ou persistência.</p>\n  <p>Hardening existe porque sistemas e dispositivos geralmente nascem flexíveis demais para facilitar implantação, compatibilidade e suporte. Essa flexibilidade ajuda no início, mas vira risco quando serviços padrão, contas locais, senhas fracas, protocolos legados, interfaces de gestão abertas e logs ausentes permanecem em produção. Em segurança de redes, o problema raramente é apenas “não ter ferramenta”. Muitas vezes é ter ferramenta crítica operando com configuração frágil.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> um incidente começa em uma estação comum, mas cresce porque um switch aceita acesso administrativo de qualquer VLAN, um firewall usa conta local compartilhada, um AP está fora do inventário e um servidor mantém serviço antigo ativo sem necessidade.</div>\n  <p>Nesta aula, você vai aprender hardening como processo operacional e auditável. O objetivo não é decorar checklist. É entender por que cada controle existe, como ele reduz superfície de ataque, que risco ele não resolve, como validá-lo e como manter a configuração segura ao longo do tempo.</p>\n</section>\n",
    "history": "\n<section class=\"lesson-section lesson-section--history\">\n  <h2>2. História</h2>\n  <p>No início de muitas redes corporativas, o foco principal era disponibilidade e conectividade. Equipamentos eram configurados para funcionar rapidamente: interfaces ativas, protocolos de gestão simples, senhas compartilhadas, serviços de descoberta ligados, logs mínimos e pouca separação entre plano de gestão e plano de dados. Em ambientes menores, isso parecia aceitável; em ambientes grandes, virou dívida técnica.</p>\n  <p>Com a profissionalização da segurança, surgiram guias de baseline, benchmarks, políticas de configuração, AAA centralizado, gestão por SSH/HTTPS, SNMPv3, logging remoto, controle de mudanças e auditoria. O conceito de hardening passou a significar reduzir o sistema ao necessário, protegendo o que fica habilitado. Em vez de confiar que a rede interna é segura, a arquitetura passou a tratar cada ativo como parte da superfície de ataque.</p>\n  <p>Hoje, hardening precisa considerar equipamentos físicos, VMs, firewalls virtuais, APs cloud-managed, servidores Linux/Windows, containers, Kubernetes, IaC e serviços gerenciados. O princípio permanece: configuração segura deve ser definida, aplicada, monitorada, versionada e revisada.</p>\n</section>\n",
    "problem": "\n<section class=\"lesson-section lesson-section--problem\">\n  <h2>3. Problema</h2>\n  <p>O problema técnico do hardening é que a configuração padrão raramente representa o menor risco aceitável para produção. Um dispositivo pode vir com serviços habilitados para conveniência, exemplos de configuração, usuário administrativo inicial, protocolos legados, portas abertas, interfaces de gestão expostas e permissões amplas. Mesmo quando o padrão é razoável, mudanças emergenciais e exceções acumuladas degradam a segurança ao longo do tempo.</p>\n  <ul>\n    <li><strong>Superfície administrativa ampla:</strong> muitos pontos aceitam login, API ou protocolo de gestão.</li>\n    <li><strong>Protocolos inseguros:</strong> Telnet, HTTP sem TLS, SNMPv1/v2c, cifras antigas e serviços sem autenticação forte.</li>\n    <li><strong>Contas frágeis:</strong> senhas locais compartilhadas, contas sem MFA, usuários órfãos e ausência de AAA.</li>\n    <li><strong>Configuração drift:</strong> mudanças manuais tornam o ambiente diferente do baseline aprovado.</li>\n    <li><strong>Logs insuficientes:</strong> mesmo que um abuso ocorra, não há evidência para investigação.</li>\n  </ul>\n  <p>Hardening não impede todos os ataques. Ele reduz probabilidade, limita oportunidades, melhora detecção e aumenta custo para abuso. Sem hardening, os demais controles precisam compensar falhas que poderiam ter sido evitadas na configuração básica.</p>\n</section>\n",
    "evolution": "\n<section class=\"lesson-section lesson-section--evolution\">\n  <h2>4. Evolução</h2>\n  <p>A prática evoluiu de listas manuais para baselines versionados, automação, compliance contínuo e infraestrutura como código. A tabela resume essa evolução.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Abordagem</th><th>Como funcionava</th><th>Limitação</th><th>Prática moderna</th></tr></thead>\n    <tbody>\n      <tr><td>Configuração manual</td><td>Cada administrador ajustava equipamentos conforme experiência.</td><td>Inconsistência, dependência de pessoa e pouca evidência.</td><td>Baseline documentado e revisão por mudança.</td></tr>\n      <tr><td>Checklist estático</td><td>Lista de itens aplicada durante implantação.</td><td>Não detecta drift após produção.</td><td>Validação recorrente e auditoria contínua.</td></tr>\n      <tr><td>AAA centralizado</td><td>Autenticação e autorização via RADIUS/TACACS+/IdP.</td><td>Depende de desenho de contingência e logs.</td><td>Integração com IAM, MFA, grupos e trilha de auditoria.</td></tr>\n      <tr><td>Hardening automatizado</td><td>Templates, scripts, Ansible, GitOps e IaC aplicam padrão.</td><td>Erro em template pode propagar falha em escala.</td><td>Revisão, testes, ambientes de homologação e rollback.</td></tr>\n      <tr><td>Compliance contínuo</td><td>Configuração real é comparada com política esperada.</td><td>Exige inventário e telemetria confiáveis.</td><td>Drift detection, evidência, exceções com prazo e relatório executivo.</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "concept": "\n<section class=\"lesson-section lesson-section--concept\">\n  <h2>5. Conceito</h2>\n  <p>Hardening é o processo de reduzir a superfície de ataque e aumentar a resistência operacional de um ativo por meio de configuração segura, serviços mínimos, controle de acesso, atualização, logs, criptografia, baseline e revisão contínua.</p>\n  <div class=\"definition-box\"><strong>Definição:</strong> hardening de rede é aplicar e manter configurações defensivas em switches, roteadores, firewalls, APs, hosts e sistemas relacionados para que apenas funções necessárias permaneçam expostas, administradas de forma segura e monitoradas.</div>\n  <p>Hardening não é apenas “desativar coisas”. É decidir o que precisa existir, como será acessado, quem pode alterar, como a alteração será registrada, como detectar desvio, como recuperar configuração e como provar que o controle está funcionando.</p>\n</section>\n",
    "internals": "\n<section class=\"lesson-section lesson-section--internals\">\n  <h2>6. Funcionamento interno</h2>\n  <p>O funcionamento interno do hardening pode ser visto como um ciclo de engenharia. Primeiro, você identifica o ativo e sua função. Depois define baseline esperado. Em seguida reduz serviços, protege gestão, aplica autenticação forte, registra eventos, valida exposição e monitora drift.</p>\n  <ol class=\"flow-list\">\n    <li><strong>Inventariar:</strong> identificar tipo, modelo, versão, dono, localização, função e criticidade.</li>\n    <li><strong>Classificar:</strong> decidir se o ativo é borda, core, acesso, gestão, segurança, servidor, AP ou host.</li>\n    <li><strong>Definir baseline:</strong> estabelecer padrão mínimo de configuração por classe de ativo.</li>\n    <li><strong>Reduzir superfície:</strong> desativar serviços, portas, protocolos e contas não necessários.</li>\n    <li><strong>Proteger gestão:</strong> restringir origem administrativa, usar SSH/HTTPS/TLS, AAA, MFA quando aplicável e contas nominativas.</li>\n    <li><strong>Registrar:</strong> enviar logs para destino central, sincronizar horário e manter trilha de auditoria.</li>\n    <li><strong>Validar:</strong> testar se o permitido funciona e se o proibido está bloqueado.</li>\n    <li><strong>Monitorar:</strong> detectar mudanças fora do processo, versão obsoleta, serviço reativado e conta indevida.</li>\n  </ol>\n  <p>Em switches, isso aparece como portas não usadas desativadas, VLANs corretas, proteção de camada 2, gestão restrita e logs. Em roteadores, aparece como proteção do plano de controle, protocolos de roteamento autenticados, ACL de gestão e SNMP seguro. Em firewalls, aparece como política revisada, contas segregadas, logs úteis e atualização. Em hosts, aparece como patching, firewall local, serviços mínimos, EDR e configuração segura.</p>\n</section>\n",
    "architecture": "\n<section class=\"lesson-section lesson-section--architecture\">\n  <h2>7. Arquitetura</h2>\n  <p>Hardening precisa entrar na arquitetura como controle transversal. Não basta endurecer um equipamento isolado; a rede inteira deve ter plano de gestão separado, origem administrativa restrita, AAA centralizado, bastion ou jump host quando necessário, logging central, backup de configuração, gestão de vulnerabilidades e processo de mudança.</p>\n  <ul>\n    <li><strong>Plano de gestão:</strong> rede ou zona usada para administrar ativos críticos, separada do tráfego comum.</li>\n    <li><strong>AAA:</strong> autenticação, autorização e accounting centralizados para reduzir contas locais compartilhadas.</li>\n    <li><strong>Syslog/SIEM:</strong> logs de login, alteração, falha, política, interface e eventos críticos.</li>\n    <li><strong>NTP:</strong> horário consistente para correlação de eventos.</li>\n    <li><strong>Backup de configuração:</strong> cópias versionadas e testadas para recuperação.</li>\n    <li><strong>Automação:</strong> templates e pipelines para aplicar baseline e detectar drift.</li>\n    <li><strong>Exceções:</strong> toda exceção deve ter motivo, dono, prazo e risco aceito.</li>\n  </ul>\n  <p>A arquitetura segura não depende de um único controle. Ela cria sobreposição: mesmo se uma senha vazar, origem administrativa é restrita; mesmo se alguém tentar alterar regra, a ação gera log; mesmo se um serviço antigo reaparecer, varredura defensiva detecta; mesmo se uma configuração falhar, backup permite recuperação.</p>\n</section>\n",
    "analogy": "\n<section class=\"lesson-section lesson-section--analogy\">\n  <h2>8. Analogia</h2>\n  <p>Hardening é como preparar um prédio corporativo para operação segura. Você não deixa todas as portas abertas “porque talvez alguém precise”. Você fecha acessos desnecessários, coloca controle nas entradas, registra visitantes, revisa chaves, testa alarmes, remove crachás antigos, documenta exceções e treina a equipe. O prédio continua útil, mas fica menos exposto.</p>\n  <div class=\"callout callout--warning\"><strong>Limite da analogia:</strong> em tecnologia, uma “porta” pode ser serviço de rede, API, conta local, protocolo de roteamento, console cloud, regra de firewall, interface wireless ou dependência de software. Por isso hardening exige inventário técnico, não apenas bom senso.</div>\n</section>\n",
    "simpleExample": "\n<section class=\"lesson-section lesson-section--example\">\n  <h2>9. Exemplo simples</h2>\n  <p>Em um laboratório doméstico, hardening pode significar trocar senhas padrão do roteador, desativar WPS, atualizar firmware, usar WPA2/WPA3 forte, desabilitar administração pela WAN, separar rede de visitantes, remover portas encaminhadas desnecessárias e anotar quais dispositivos existem.</p>\n  <p>Esse exemplo é simples, mas ensina a lógica: reduzir o que está exposto, proteger o que precisa ficar disponível e criar evidência mínima para saber se algo mudou.</p>\n</section>\n",
    "enterpriseExample": "\n<section class=\"lesson-section lesson-section--enterprise\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Em uma empresa, hardening envolve switches com portas não usadas desabilitadas, trunk permitido apenas onde necessário, VLAN nativa não usada para tráfego comum, BPDU Guard/Root Guard quando aplicável, roteadores com plano de controle protegido, firewalls com política revisada, APs atualizados, servidores com serviços mínimos e hosts com firewall local/EDR.</p>\n  <p>Também envolve gestão: contas nominativas, integração com TACACS+/RADIUS/IdP, privilégios por função, logs centralizados, backup automático de configuração, revisão de firmware, documentação de exceções e validação periódica. Sem processo, a configuração segura se degrada.</p>\n</section>\n",
    "cloudExample": "\n<section class=\"lesson-section lesson-section--cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, hardening aparece em security groups restritivos, NSGs, firewalls gerenciados, bastion, private endpoints, remoção de IP público desnecessário, IAM de menor privilégio, logs de atividade, flow logs, criptografia, imagens base endurecidas e políticas preventivas. A superfície de ataque muda: em vez de uma porta console física, você tem API, credenciais, roles, metadados, storage público e regras de rede.</p>\n  <p>O custo financeiro aparece em logs, retenção, firewalls gerenciados, scanners, soluções CSPM e tráfego. O custo operacional aparece em revisão de políticas, exceções e automação. Mesmo assim, o custo de não endurecer costuma aparecer como exposição pública, incidente, auditoria malsucedida ou indisponibilidade.</p>\n</section>\n",
    "devsecopsExample": "\n<section class=\"lesson-section lesson-section--devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, hardening deve virar código e evidência. Templates Terraform podem negar criação de recursos com IP público desnecessário. Ansible pode aplicar baseline em Linux, switches suportados e appliances. Pipelines podem rodar validação de IaC, policy as code e testes de configuração antes do deploy. Git pode registrar revisão e aprovação.</p>\n  <p>O risco é automatizar erro. Um playbook mal testado pode derrubar acesso de gestão, aplicar regra ampla ou remover configuração necessária. Por isso, hardening automatizado precisa de ambiente de teste, janela de mudança, rollback, validação pós-mudança e monitoramento.</p>\n</section>\n",
    "securityExample": "\n<section class=\"lesson-section lesson-section--security\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Para Segurança, hardening reduz oportunidades de abuso e melhora investigação. Um atacante que obtém uma credencial comum não deveria conseguir administrar switch. Um host comprometido não deveria alcançar interface de gestão de firewall. Um protocolo legado não deveria permitir captura de credencial. Uma alteração crítica deveria gerar log com usuário, origem, horário e objeto alterado.</p>\n  <table class=\"risk-table\">\n    <thead><tr><th>Risco</th><th>Como aparece</th><th>Impacto</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>Gestão exposta</td><td>SSH/HTTPS/SNMP acessível de redes comuns</td><td>Abuso de credencial ou tentativa de força bruta</td><td>Rede de gestão, ACL administrativa, MFA/AAA e bastion</td></tr>\n      <tr><td>Protocolo legado</td><td>Telnet, HTTP, SNMPv1/v2c ou cifras antigas</td><td>Credenciais e configuração expostas</td><td>SSH, HTTPS/TLS, SNMPv3 e política criptográfica</td></tr>\n      <tr><td>Conta compartilhada</td><td>admin genérico usado por várias pessoas</td><td>Sem responsabilização e difícil auditoria</td><td>Contas nominativas, AAA e break-glass controlado</td></tr>\n      <tr><td>Sem logs</td><td>Alterações e logins não enviados ao SIEM</td><td>Investigação fraca e baixa visibilidade</td><td>Syslog, NTP, accounting e retenção adequada</td></tr>\n    </tbody>\n  </table>\n</section>\n",
    "diagram": "\n<section class=\"lesson-section lesson-section--diagram\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra hardening como uma sequência de camadas: inventário, plano de gestão, configuração segura, controle de acesso, logs e revisão contínua. A ideia principal é que cada ativo de rede deve ter uma superfície administrativa menor, credenciais fortes, serviços mínimos, atualização e telemetria.</p>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1100 520\" role=\"img\" aria-labelledby=\"hardening-title hardening-desc\">\n    <title id=\"hardening-title\">Hardening de ativos de rede</title>\n    <desc id=\"hardening-desc\">Fluxo de hardening envolvendo inventário, baseline, switches, roteadores, firewalls, APs, hosts, IAM, SIEM e revisão contínua.</desc>\n    <defs>\n      <marker id=\"arrow-hardening\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" />\n      </marker>\n    </defs>\n    <rect x=\"40\" y=\"60\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"125\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Inventário</text>\n    <text x=\"125\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">ativos e versões</text>\n\n    <rect x=\"270\" y=\"60\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--security\" />\n    <text x=\"355\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Baseline</text>\n    <text x=\"355\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">configuração esperada</text>\n\n    <rect x=\"500\" y=\"60\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"585\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Gestão segura</text>\n    <text x=\"585\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">SSH, HTTPS, AAA</text>\n\n    <rect x=\"730\" y=\"60\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"815\" y=\"92\" text-anchor=\"middle\" class=\"svg-label\">Serviços mínimos</text>\n    <text x=\"815\" y=\"114\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">desativar exposição</text>\n\n    <rect x=\"40\" y=\"230\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--switch\" />\n    <text x=\"125\" y=\"262\" text-anchor=\"middle\" class=\"svg-label\">Switches</text>\n    <text x=\"125\" y=\"284\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">porta, VLAN, STP</text>\n\n    <rect x=\"270\" y=\"230\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--router\" />\n    <text x=\"355\" y=\"262\" text-anchor=\"middle\" class=\"svg-label\">Roteadores</text>\n    <text x=\"355\" y=\"284\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">rotas, SNMP, ACL</text>\n\n    <rect x=\"500\" y=\"230\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--firewall\" />\n    <text x=\"585\" y=\"262\" text-anchor=\"middle\" class=\"svg-label\">Firewalls</text>\n    <text x=\"585\" y=\"284\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">política e logs</text>\n\n    <rect x=\"730\" y=\"230\" width=\"170\" height=\"70\" rx=\"12\" class=\"svg-node svg-node--server\" />\n    <text x=\"815\" y=\"262\" text-anchor=\"middle\" class=\"svg-label\">APs e Hosts</text>\n    <text x=\"815\" y=\"284\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">patch e telemetria</text>\n\n    <rect x=\"930\" y=\"145\" width=\"130\" height=\"90\" rx=\"12\" class=\"svg-node svg-node--cloud\" />\n    <text x=\"995\" y=\"178\" text-anchor=\"middle\" class=\"svg-label\">SIEM</text>\n    <text x=\"995\" y=\"200\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">logs e alertas</text>\n    <text x=\"995\" y=\"220\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">auditoria</text>\n\n    <line x1=\"210\" y1=\"95\" x2=\"270\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"440\" y1=\"95\" x2=\"500\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"670\" y1=\"95\" x2=\"730\" y2=\"95\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"125\" y1=\"130\" x2=\"125\" y2=\"230\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"355\" y1=\"130\" x2=\"355\" y2=\"230\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"585\" y1=\"130\" x2=\"585\" y2=\"230\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"815\" y1=\"130\" x2=\"815\" y2=\"230\" class=\"svg-flow svg-flow--response\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"900\" y1=\"265\" x2=\"930\" y2=\"205\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hardening)\" />\n    <line x1=\"900\" y1=\"95\" x2=\"930\" y2=\"170\" class=\"svg-flow svg-flow--request animated-flow\" marker-end=\"url(#arrow-hardening)\" />\n\n    <rect x=\"170\" y=\"380\" width=\"760\" height=\"70\" rx=\"14\" class=\"svg-zone svg-boundary\" />\n    <text x=\"550\" y=\"408\" text-anchor=\"middle\" class=\"svg-label\">Ciclo contínuo</text>\n    <text x=\"550\" y=\"432\" text-anchor=\"middle\" class=\"svg-label svg-label--small\">inventariar → comparar baseline → corrigir drift → validar → registrar evidência → revisar exceções</text>\n  </svg>\n</section>\n",
    "labIntro": "\n<section class=\"lesson-section lesson-section--lab\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é defensivo e conceitual-operacional. Você não executará ataque. O objetivo é construir um checklist de hardening auditável para uma rede corporativa fictícia e validar controles por evidência, comandos seguros e raciocínio.</p>\n</section>\n",
    "exercisesIntro": "\n<section class=\"lesson-section lesson-section--exercises\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam classificação de risco, priorização de hardening, análise de comandos e desenho de evidências para auditoria.</p>\n</section>\n",
    "challengeIntro": "\n<section class=\"lesson-section lesson-section--challenge\">\n  <h2>17. Desafio</h2>\n  <p>O desafio simula uma empresa que precisa criar baseline mínimo de segurança para switches, roteadores, firewalls, APs e hosts sem interromper produção.</p>\n</section>\n",
    "solutionIntro": "\n<section class=\"lesson-section lesson-section--solution\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada demonstra como priorizar gestão segura, inventário, redução de superfície, logs e correção gradual, evitando aplicar checklist cego sem entender impacto operacional.</p>\n</section>\n",
    "summary": "\n<section class=\"lesson-section lesson-section--summary\">\n  <h2>19. Resumo</h2>\n  <ul>\n    <li>Hardening reduz superfície de ataque e aumenta qualidade operacional.</li>\n    <li>Configuração segura precisa ser definida, aplicada, validada e monitorada.</li>\n    <li>Switches, roteadores, firewalls, APs e hosts exigem baselines diferentes.</li>\n    <li>Gestão segura, AAA, logs, NTP, backup e revisão são tão importantes quanto comandos específicos.</li>\n    <li>Hardening sem inventário vira checklist incompleto; hardening sem logs vira controle difícil de provar.</li>\n  </ul>\n</section>\n",
    "nextTheme": "\n<section class=\"lesson-section lesson-section--next\">\n  <h2>20. Próximo tema</h2>\n  <p>A próxima aula será <strong>13.4 — IDS, IPS, NDR, NetFlow e Sensores de Rede</strong>. Depois de reduzir superfície e endurecer ativos, precisamos aprender a observar tráfego e detectar comportamento suspeito. Hardening diminui oportunidades; sensores ajudam a perceber quando algo ainda escapou.</p>\n</section>\n"
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
      "SSH",
      "HTTPS",
      "SNMPv3",
      "Syslog",
      "NTP",
      "TACACS+",
      "RADIUS",
      "802.1X",
      "TLS"
    ],
    "dependsOn": [
      "VLAN",
      "ACL",
      "Firewall",
      "AAA",
      "Logs",
      "Segmentação"
    ],
    "enables": [
      "Auditoria",
      "SIEM",
      "Resposta a incidente",
      "Compliance",
      "Gestão segura"
    ]
  },
  "protocolFields": [
    {
      "field": "Origem administrativa",
      "size": "variável",
      "purpose": "Definir de onde é permitido administrar o ativo.",
      "securityObservation": "Permitir gestão de qualquer rede aumenta risco de abuso de credenciais."
    },
    {
      "field": "Protocolo de gestão",
      "size": "variável",
      "purpose": "Definir canal usado para administração, como SSH ou HTTPS.",
      "securityObservation": "Protocolos sem criptografia expõem credenciais e comandos."
    },
    {
      "field": "Registro de auditoria",
      "size": "variável",
      "purpose": "Registrar login, logout, falha, alteração e evento crítico.",
      "securityObservation": "Sem logs, investigação depende de suposição."
    }
  ],
  "packetFlow": [
    {
      "step": 1,
      "actor": "Administrador",
      "action": "Acessa ativo pela zona de gestão",
      "detail": "Origem deve passar por bastion, VPN ou rede administrativa autorizada.",
      "possibleFailure": "Gestão exposta a redes de usuários permite tentativas indevidas."
    },
    {
      "step": 2,
      "actor": "Ativo",
      "action": "Consulta AAA",
      "detail": "Usuário é autenticado e autorizado por perfil.",
      "possibleFailure": "Conta local compartilhada remove rastreabilidade."
    },
    {
      "step": 3,
      "actor": "Ativo",
      "action": "Registra evento",
      "detail": "Syslog/accounting envia evento ao SIEM com horário sincronizado.",
      "possibleFailure": "Sem NTP e logs, a linha do tempo fica fraca."
    }
  ],
  "trafficCapture": {
    "tool": "Wireshark, tcpdump ou logs de firewall/SIEM",
    "filter": "tcp.port == 22 or tcp.port == 443 or udp.port == 514 or udp.port == 123",
    "whatToObserve": [
      "Origem de conexões administrativas",
      "Protocolos de gestão usados",
      "Eventos de syslog",
      "Sincronização NTP",
      "Tentativas negadas por ACL de gestão"
    ],
    "interpretation": "O aluno deve observar que hardening também se valida por tráfego e logs, não apenas por declaração em documento."
  },
  "deepDive": {
    "mentalModel": "Hardening é transformar cada ativo em uma superfície menor, administrada por caminhos conhecidos, com privilégios rastreáveis e evidência centralizada.",
    "keyTerms": [
      "baseline",
      "drift",
      "AAA",
      "plano de gestão",
      "serviço mínimo",
      "syslog",
      "NTP",
      "break-glass",
      "SNMPv3",
      "conta nominativa"
    ],
    "limitations": [
      "Não substitui segmentação.",
      "Não corrige aplicação vulnerável sozinho.",
      "Não protege se credenciais fortes forem abusadas sem monitoramento.",
      "Pode causar indisponibilidade se aplicado sem teste.",
      "Exige manutenção contínua."
    ],
    "whenToUse": [
      "Sempre que um ativo entra em produção.",
      "Antes de auditoria ou exposição a ambientes críticos.",
      "Após incidente ou descoberta de drift.",
      "Durante padronização de filiais, datacenters e cloud.",
      "Antes de automação em larga escala."
    ],
    "whenNotToUse": [
      "Não aplicar mudanças destrutivas sem janela e rollback.",
      "Não copiar benchmark sem entender impacto.",
      "Não aplicar em ativo crítico sem inventário e backup.",
      "Não tratar hardening como substituto de patching e monitoramento."
    ],
    "operationalImpact": [
      "Exige inventário, documentação e dono por ativo.",
      "Pode alterar fluxos administrativos e gerar chamados iniciais.",
      "Exige processo de exceção e revisão.",
      "Melhora troubleshooting ao padronizar logs e acesso.",
      "Reduz variação entre ambientes."
    ],
    "financialImpact": [
      "Pode exigir solução de AAA, SIEM, automação, backup de configuração e gestão de vulnerabilidades.",
      "Aumenta custo de armazenamento de logs.",
      "Reduz custo potencial de incidente e retrabalho.",
      "Pode exigir suporte/licença para firmware atualizado."
    ],
    "securityImpact": [
      "Reduz superfície de ataque.",
      "Melhora rastreabilidade.",
      "Dificulta abuso de credenciais.",
      "Aumenta chance de detecção.",
      "Reduz persistência por serviços esquecidos."
    ]
  },
  "commonMistakes": [
    {
      "mistake": "Aplicar checklist sem entender o ativo.",
      "whyItHappens": "Benchmarks parecem universais.",
      "consequence": "Pode derrubar serviço legítimo ou deixar risco real fora do escopo.",
      "correction": "Classificar função do ativo e testar baseline em homologação."
    },
    {
      "mistake": "Manter conta admin compartilhada.",
      "whyItHappens": "Facilita operação rápida.",
      "consequence": "Não há responsabilização nem trilha de auditoria confiável.",
      "correction": "Usar contas nominativas via AAA e break-glass controlado."
    },
    {
      "mistake": "Endurecer firewall e esquecer switches/APs.",
      "whyItHappens": "Firewall costuma receber mais atenção da segurança.",
      "consequence": "A borda de acesso continua vulnerável.",
      "correction": "Criar baseline por classe de ativo."
    },
    {
      "mistake": "Desativar serviços sem plano de rollback.",
      "whyItHappens": "Pressa em corrigir auditoria.",
      "consequence": "Pode bloquear gestão e causar indisponibilidade.",
      "correction": "Fazer backup, janela, teste e validação pós-mudança."
    }
  ],
  "troubleshooting": {
    "symptoms": [
      "Acesso administrativo falha após mudança.",
      "Logs não chegam ao SIEM.",
      "NTP inconsistente entre ativos.",
      "Usuário consegue administrar ativo fora da rede de gestão.",
      "Serviço legado reapareceu após atualização.",
      "Configuração real difere do baseline."
    ],
    "diagnosticQuestions": [
      "Qual ativo mudou?",
      "Há backup de configuração anterior?",
      "A origem administrativa está correta?",
      "AAA está disponível?",
      "Existe conta break-glass documentada?",
      "Logs indicam quem alterou?",
      "O problema está no controle ou na dependência, como DNS/NTP/RADIUS?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Get-NetTCPConnection -State Listen\nGet-Service | Where-Object {$_.Status -eq 'Running'}\nGet-EventLog -LogName Security -Newest 20",
        "purpose": "Ver serviços locais, portas em escuta e eventos recentes.",
        "expectedObservation": "Somente serviços necessários e eventos com horário coerente.",
        "interpretation": "Porta ou serviço inesperado pode indicar exposição indevida ou drift."
      },
      {
        "platform": "Linux",
        "command": "ss -tulpen\nsystemctl --type=service --state=running\ntimedatectl\njournalctl -p warning -n 50",
        "purpose": "Ver portas, serviços, sincronização de horário e eventos relevantes.",
        "expectedObservation": "Serviços mínimos, NTP ativo e logs disponíveis.",
        "interpretation": "Serviço antigo em escuta ou horário incorreto prejudica hardening e investigação."
      },
      {
        "platform": "Cisco IOS",
        "command": "show running-config | include line vty|transport input|logging|ntp|aaa|snmp\nshow users\nshow logging",
        "purpose": "Ver gestão remota, AAA, SNMP, NTP, usuários e logs.",
        "expectedObservation": "Gestão por SSH, logging/NTP configurados e AAA quando aplicável.",
        "interpretation": "Telnet, SNMP fraco ou ausência de logging indicam baseline frágil."
      }
    ],
    "decisionTree": [
      {
        "if": "Acesso administrativo falhou após hardening",
        "then": "Validar ACL de gestão, AAA, DNS/NTP, rota de retorno e conta break-glass antes de reverter tudo."
      },
      {
        "if": "Logs não aparecem no SIEM",
        "then": "Verificar destino syslog, rota, firewall, formato, horário, severidade e parsing."
      },
      {
        "if": "Auditoria encontrou serviço inseguro",
        "then": "Confirmar necessidade, dono, exposição, alternativa segura e plano de desativação."
      },
      {
        "if": "Configuração diverge do baseline",
        "then": "Verificar mudança aprovada, exceção, drift manual ou atualização que restaurou padrão."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Manter inventário atualizado de ativos, versões e donos.",
      "Usar contas nominativas com AAA centralizado sempre que possível.",
      "Restringir gestão a rede administrativa ou bastion.",
      "Desativar protocolos inseguros e serviços não usados.",
      "Enviar logs para SIEM com NTP correto.",
      "Manter backup versionado de configuração.",
      "Revisar exceções com prazo e dono."
    ],
    "badPractices": [
      "Usar conta admin compartilhada.",
      "Permitir gestão de qualquer VLAN.",
      "Manter Telnet, HTTP ou SNMPv2c em produção sem necessidade.",
      "Não registrar alterações administrativas.",
      "Aplicar benchmark sem teste.",
      "Esquecer APs, impressoras, IoT e hosts no hardening."
    ],
    "commonErrors": [
      "Confundir patching com hardening.",
      "Achar que firewall compensa gestão exposta.",
      "Criar baseline impossível de operar.",
      "Não prever conta de emergência.",
      "Não revisar drift."
    ],
    "vulnerabilities": [
      {
        "name": "Gestão administrativa exposta",
        "description": "Interfaces de administração acessíveis a partir de redes comuns ou internet.",
        "defensiveExplanation": "Aumenta chance de tentativa de abuso de credencial, exploração de falha ou alteração indevida.",
        "mitigation": "Rede de gestão, ACLs, VPN/bastion, MFA/AAA, logs e atualização."
      },
      {
        "name": "Protocolos inseguros",
        "description": "Uso de Telnet, HTTP sem TLS, SNMP fraco ou cifras antigas.",
        "defensiveExplanation": "Pode expor credenciais, configuração e metadados.",
        "mitigation": "SSH, HTTPS/TLS, SNMPv3, política criptográfica e remoção do legado."
      },
      {
        "name": "Configuração drift",
        "description": "Ativo real diverge do baseline aprovado.",
        "defensiveExplanation": "Cria risco invisível e quebra previsibilidade operacional.",
        "mitigation": "Automação, auditoria recorrente, comparação de config e processo de mudança."
      }
    ],
    "monitoring": [
      "Logins administrativos fora do horário.",
      "Falhas repetidas de autenticação.",
      "Alteração de configuração em ativo crítico.",
      "Serviço de gestão acessado de origem incomum.",
      "Ativo sem enviar logs.",
      "Versão de firmware/OS fora do padrão."
    ],
    "hardening": [
      "SSH/HTTPS em vez de Telnet/HTTP.",
      "SNMPv3 quando SNMP for necessário.",
      "AAA centralizado com perfis por função.",
      "NTP e syslog obrigatórios.",
      "Desativar portas e serviços não usados.",
      "Backup de configuração e rollback testado."
    ],
    "detectionIdeas": [
      "Comparar configuração real com baseline.",
      "Alertar gestão de ativos a partir de segmentos não administrativos.",
      "Alertar alterações fora de janela.",
      "Detectar reaparecimento de serviços legados.",
      "Correlacionar login administrativo com chamado de mudança."
    ]
  },
  "lab": {
    "id": "lab-13.3",
    "title": "Criando um baseline de hardening defensivo para ativos de rede",
    "labType": "security",
    "objective": "Construir e validar um baseline mínimo para switches, roteadores, firewalls, APs e hosts, sem executar ações ofensivas.",
    "scenario": "Você entrou em uma equipe de segurança que encontrou ativos críticos com configurações inconsistentes. Sua missão é criar um baseline inicial, priorizar riscos e definir evidências para auditoria.",
    "topology": "Usuários -> switches de acesso -> firewall interno -> servidores; APs conectados a switches PoE; zona de gestão separada; SIEM recebendo logs.",
    "architecture": "Arquitetura com plano de gestão restrito, AAA centralizado, syslog/SIEM, NTP, backup de configuração e políticas por classe de ativo.",
    "prerequisites": [
      "Conhecer VLAN, firewall, logs e segmentação.",
      "Ter terminal Windows ou Linux para simular coleta local.",
      "Não alterar equipamentos reais sem autorização e janela de mudança."
    ],
    "tools": [
      "Editor de texto ou planilha",
      "Windows PowerShell",
      "Terminal Linux",
      "Opcional: Cisco Packet Tracer/GNS3 para simulação",
      "Opcional: Wireshark para observação defensiva"
    ],
    "estimatedTimeMinutes": 90,
    "cost": "zero",
    "safetyNotes": [
      "Não execute varreduras agressivas em redes reais sem autorização.",
      "Não altere configurações de produção durante o laboratório.",
      "Não teste senhas, não tente bypass e não acesse interfaces administrativas sem permissão.",
      "Trate o laboratório como desenho, auditoria e validação defensiva."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Inventariar classes de ativos",
        "instruction": "Crie uma tabela com as classes: switches, roteadores, firewalls, APs e hosts. Para cada classe, liste função, dono, criticidade e superfície administrativa.",
        "command": "Ativo | Função | Dono | Criticidade | Gestão | Logs | Baseline",
        "expectedOutput": "Tabela inicial de inventário por classe de ativo.",
        "explanation": "Sem inventário, hardening vira opinião. A equipe precisa saber o que existe antes de definir controle."
      },
      {
        "number": 2,
        "title": "Definir plano de gestão",
        "instruction": "Defina de quais redes ou bastions a administração será permitida e quais origens serão bloqueadas.",
        "command": "Zona de gestão: 10.10.99.0/24\nOrigem permitida: bastion, VPN administrativa\nOrigem negada: usuários, guest, IoT",
        "expectedOutput": "Política de origem administrativa por classe de ativo.",
        "explanation": "Restringir gestão reduz abuso mesmo quando credenciais são expostas."
      },
      {
        "number": 3,
        "title": "Criar baseline mínimo por classe",
        "instruction": "Para cada classe, defina serviços permitidos, proibidos, AAA, logs, NTP, backup e exceções.",
        "command": "Switch: permitir SSH, AAA, syslog, NTP; negar Telnet, HTTP, SNMPv2c; desativar portas não usadas.",
        "expectedOutput": "Baseline mínimo documentado por classe.",
        "explanation": "O baseline converte intenção de segurança em configuração esperada."
      },
      {
        "number": 4,
        "title": "Coletar evidência local em host Windows",
        "instruction": "Em um host de laboratório, liste conexões e serviços para praticar evidência de hardening.",
        "command": "Get-NetTCPConnection -State Listen\nGet-Service | Where-Object {$_.Status -eq 'Running'}",
        "expectedOutput": "Lista de portas em escuta e serviços em execução.",
        "explanation": "Hosts também têm superfície. Mesmo em redes seguras, serviços locais desnecessários aumentam risco."
      },
      {
        "number": 5,
        "title": "Coletar evidência local em Linux",
        "instruction": "Em um host Linux de laboratório, liste portas, serviços e horário.",
        "command": "ss -tulpen\nsystemctl --type=service --state=running\ntimedatectl",
        "expectedOutput": "Portas em escuta, serviços ativos e estado de sincronização de horário.",
        "explanation": "NTP e serviços mínimos são evidências fundamentais para investigação e hardening."
      },
      {
        "number": 6,
        "title": "Planejar validação segura de equipamentos de rede",
        "instruction": "Sem acessar produção, escreva quais comandos seguros seriam usados para validar gestão, logs, NTP e SNMP em equipamento Cisco-like.",
        "command": "show running-config | include line vty|transport input|logging|ntp|aaa|snmp\nshow users\nshow logging",
        "expectedOutput": "Lista de comandos de leitura, sem alteração.",
        "explanation": "Auditoria defensiva começa com comandos read-only e autorização clara."
      },
      {
        "number": 7,
        "title": "Definir evidências para SIEM",
        "instruction": "Liste quais eventos devem ser enviados ao SIEM: login, falha, alteração, reboot, interface down/up, política de firewall, alteração de AP, falha AAA.",
        "command": "Evento | Fonte | Severidade | Campo-chave | Alerta?",
        "expectedOutput": "Matriz de eventos mínimos para monitoramento.",
        "explanation": "Hardening sem logs é difícil de provar e investigar."
      },
      {
        "number": 8,
        "title": "Criar plano de correção por fases",
        "instruction": "Priorize ações em ondas: risco alto sem impacto, gestão segura, logs, serviços legados, atualização, automação e revisão recorrente.",
        "command": "Fase 1: inventário e logs\nFase 2: gestão restrita\nFase 3: remover legado\nFase 4: automação e drift detection",
        "expectedOutput": "Roadmap de hardening com risco, esforço e rollback.",
        "explanation": "Mudança segura precisa respeitar produção e evitar correções cegas."
      }
    ],
    "expectedResult": "Ao final, o aluno terá um baseline mínimo de hardening, uma matriz de evidências, uma lista de comandos read-only e um plano de correção por fases.",
    "validation": [
      {
        "check": "Inventário possui classes principais",
        "command": "Revisar tabela de inventário",
        "expected": "Switches, roteadores, firewalls, APs e hosts aparecem com dono e criticidade.",
        "ifFails": "Volte ao passo 1 e classifique ativos antes de criar controles."
      },
      {
        "check": "Gestão está restrita",
        "command": "Revisar política de origem administrativa",
        "expected": "Usuários, guest e IoT não administram ativos críticos.",
        "ifFails": "Criar zona de gestão e bastion antes de aplicar regras."
      },
      {
        "check": "Baseline é verificável",
        "command": "Revisar baseline por classe",
        "expected": "Cada item possui evidência de validação.",
        "ifFails": "Converter itens genéricos em comandos, logs ou configurações verificáveis."
      },
      {
        "check": "Plano possui rollback",
        "command": "Revisar plano de correção",
        "expected": "Mudanças críticas possuem backup, janela e reversão.",
        "ifFails": "Adicionar rollback antes de qualquer execução real."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "O baseline ficou genérico demais",
        "probableCause": "Itens não foram ligados a riscos e evidências.",
        "howToConfirm": "Pergunte como validar cada item.",
        "fix": "Adicionar comando, log, configuração esperada ou teste seguro."
      },
      {
        "symptom": "A equipe teme perder acesso administrativo",
        "probableCause": "Ausência de plano de gestão e break-glass.",
        "howToConfirm": "Verificar se há conta de emergência controlada e rota administrativa.",
        "fix": "Criar plano de contingência antes de restringir gestão."
      },
      {
        "symptom": "Logs não são úteis",
        "probableCause": "Sem NTP, campos insuficientes ou parsing ruim.",
        "howToConfirm": "Comparar evento real com necessidade de investigação.",
        "fix": "Padronizar NTP, formato, severidade e campos-chave."
      }
    ],
    "improvements": [
      "Transformar baseline em template Ansible ou policy as code.",
      "Adicionar comparação automática de configuração real versus esperada.",
      "Criar dashboard de ativos fora do baseline.",
      "Relacionar mudanças de configuração a chamados aprovados.",
      "Adicionar matriz de exceções com prazo de expiração."
    ],
    "evidenceToCollect": [
      "Tabela de inventário",
      "Baseline por classe de ativo",
      "Política de gestão administrativa",
      "Saída de comandos Windows/Linux",
      "Lista de comandos read-only para equipamentos",
      "Matriz de eventos para SIEM",
      "Plano de correção por fases"
    ],
    "questions": [
      "Qual item do baseline reduz mais risco com menor impacto?",
      "Qual mudança poderia derrubar produção se aplicada sem teste?",
      "Como provar que um ativo está dentro do baseline?",
      "Qual exceção exigiria aceite formal de risco?"
    ],
    "challenge": "Crie um baseline mínimo para uma filial com 2 switches, 1 roteador, 1 firewall, 4 APs e 40 hosts. Inclua controles, evidências, riscos e ordem de implantação.",
    "solution": "A solução deve priorizar inventário, logs/NTP, gestão restrita, remoção de protocolos inseguros, contas nominativas/AAA, backup de configuração, atualização planejada e revisão recorrente. Não é aceitável apenas listar 'aplicar hardening' sem evidências e rollback."
  },
  "mentorQuestions": [
    {
      "type": "reflexão",
      "question": "Por que hardening não deve ser tratado como checklist único aplicado uma vez?",
      "hints": [
        "Pense em drift.",
        "Pense em mudanças emergenciais.",
        "Pense em novas versões e exceções."
      ],
      "expectedIdeas": [
        "processo contínuo",
        "baseline",
        "validação",
        "monitoramento",
        "revisão"
      ],
      "explanation": "Configurações mudam. Sem revisão, o ambiente se afasta do padrão seguro."
    },
    {
      "type": "diagnóstico",
      "question": "Um switch aceita SSH a partir da rede de usuários. Qual risco isso cria e como reduzir?",
      "hints": [
        "Pense em origem administrativa.",
        "Pense em credenciais vazadas.",
        "Pense em logs."
      ],
      "expectedIdeas": [
        "gestão exposta",
        "ACL de gestão",
        "bastion",
        "AAA",
        "logs"
      ],
      "explanation": "Mesmo com senha forte, expor gestão a redes comuns aumenta tentativas e superfície de abuso."
    },
    {
      "type": "cenário real",
      "question": "Uma auditoria pediu evidência de hardening. Que evidências você apresentaria?",
      "hints": [
        "Não basta dizer que está seguro.",
        "Pense em comandos, logs, baseline e exceções."
      ],
      "expectedIdeas": [
        "inventário",
        "baseline",
        "configuração",
        "logs",
        "NTP",
        "backup",
        "mudanças aprovadas"
      ],
      "explanation": "Auditoria defensiva exige prova verificável, não apenas intenção."
    }
  ],
  "quiz": [
    {
      "id": "q13.3.1",
      "type": "conceito",
      "q": "Qual é a melhor definição de hardening?",
      "opts": [
        "Reduzir superfície de ataque e manter configuração segura de forma validável.",
        "Instalar apenas um firewall de borda.",
        "Bloquear todo tráfego interno sem exceção.",
        "Executar pentest em todos os ativos semanalmente."
      ],
      "a": 0,
      "exp": "Hardening envolve configuração segura, serviços mínimos, controle de acesso, logs, atualização e validação contínua.",
      "difficulty": "iniciante",
      "topic": "conceito"
    },
    {
      "id": "q13.3.2",
      "type": "segurança",
      "q": "Por que contas administrativas compartilhadas são uma má prática?",
      "opts": [
        "Porque removem rastreabilidade e dificultam responsabilização.",
        "Porque impedem login local em qualquer situação.",
        "Porque sempre quebram SSH.",
        "Porque aumentam automaticamente largura de banda."
      ],
      "a": 0,
      "exp": "Sem conta nominativa, é difícil saber quem alterou o quê e quando.",
      "difficulty": "iniciante",
      "topic": "aaa"
    },
    {
      "id": "q13.3.3",
      "type": "diagnóstico",
      "q": "Após hardening, logs de firewall não aparecem no SIEM. Qual hipótese deve ser testada?",
      "opts": [
        "Destino syslog, rota, firewall, severidade, NTP e parsing.",
        "Apenas trocar o firewall.",
        "Desativar o SIEM definitivamente.",
        "Liberar any-any entre todas as zonas."
      ],
      "a": 0,
      "exp": "Falha de logs pode estar em rede, configuração, formato, severidade, horário ou parser.",
      "difficulty": "intermediário",
      "topic": "logs"
    },
    {
      "id": "q13.3.4",
      "type": "arquitetura",
      "q": "Qual controle reduz risco de gestão administrativa exposta?",
      "opts": [
        "Restringir administração à rede de gestão ou bastion.",
        "Permitir SSH de qualquer VLAN para facilitar suporte.",
        "Usar apenas senha longa compartilhada.",
        "Desativar todos os logs para reduzir custo."
      ],
      "a": 0,
      "exp": "Origem administrativa restrita reduz superfície mesmo quando credenciais são alvo.",
      "difficulty": "intermediário",
      "topic": "gestão segura"
    },
    {
      "id": "q13.3.5",
      "type": "devsecops",
      "q": "Qual é um risco de automatizar hardening sem testes?",
      "opts": [
        "Propagar erro em escala e causar indisponibilidade.",
        "Impedir qualquer documentação.",
        "Eliminar necessidade de rollback.",
        "Tornar logs inúteis por definição."
      ],
      "a": 0,
      "exp": "Automação aumenta consistência, mas também pode propagar erro rapidamente.",
      "difficulty": "intermediário",
      "topic": "automação"
    },
    {
      "id": "q13.3.6",
      "type": "comando",
      "q": "Em Linux, qual comando ajuda a listar portas em escuta?",
      "opts": [
        "ss -tulpen",
        "cd /tmp",
        "whoami",
        "clear"
      ],
      "a": 0,
      "exp": "ss -tulpen mostra sockets TCP/UDP em escuta e processos associados, útil para evidência de superfície local.",
      "difficulty": "iniciante",
      "topic": "diagnóstico"
    }
  ],
  "flashcards": [
    {
      "id": "fc13.3.1",
      "front": "O que é hardening?",
      "back": "É reduzir superfície de ataque e manter configuração segura, mínima, auditável e monitorada.",
      "tags": [
        "hardening"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.3.2",
      "front": "O que é baseline?",
      "back": "É o padrão esperado de configuração segura para uma classe de ativo.",
      "tags": [
        "baseline"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.3.3",
      "front": "O que é drift de configuração?",
      "back": "É quando a configuração real diverge do padrão aprovado.",
      "tags": [
        "drift"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc13.3.4",
      "front": "Por que NTP importa para segurança?",
      "back": "Porque horários consistentes permitem correlacionar logs e reconstruir linha do tempo.",
      "tags": [
        "logs",
        "ntp"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.3.5",
      "front": "Qual é o risco de Telnet?",
      "back": "Telnet não protege adequadamente credenciais e comandos; prefira SSH.",
      "tags": [
        "gestão"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc13.3.6",
      "front": "O que é break-glass?",
      "back": "É uma conta ou procedimento de emergência, controlado e auditado, para recuperar acesso quando sistemas centrais falham.",
      "tags": [
        "iam",
        "aaa"
      ],
      "difficulty": "intermediário"
    }
  ],
  "exercises": [
    {
      "id": "ex13.3.1",
      "type": "conceitual",
      "prompt": "Explique a diferença entre patching e hardening.",
      "expectedAnswer": "Patching corrige vulnerabilidades conhecidas por atualização. Hardening reduz superfície, configura serviços mínimos, protege gestão, logs e permissões.",
      "explanation": "Ambos são complementares, não substitutos."
    },
    {
      "id": "ex13.3.2",
      "type": "diagnóstico",
      "prompt": "Um roteador aceita Telnet e SSH. Qual ação você proporia e qual evidência coletaria?",
      "expectedAnswer": "Planejar desativação de Telnet, manter SSH, restringir origem administrativa e coletar configuração/validação de acesso e logs.",
      "explanation": "O objetivo é remover protocolo inseguro sem perder gestão."
    },
    {
      "id": "ex13.3.3",
      "type": "arquitetura",
      "prompt": "Liste cinco itens mínimos de hardening para switches de acesso.",
      "expectedAnswer": "Portas não usadas desativadas, VLAN correta, gestão restrita, SSH/AAA, logs/NTP, proteção L2 quando aplicável, trunk limitado.",
      "explanation": "Switch de acesso é borda crítica e precisa de baseline próprio."
    },
    {
      "id": "ex13.3.4",
      "type": "devsecops",
      "prompt": "Como transformar hardening em processo de pipeline?",
      "expectedAnswer": "Versionar baseline, validar IaC/config, testar em homologação, aplicar com automação, coletar evidência, detectar drift e exigir aprovação para exceções.",
      "explanation": "DevSecOps torna hardening repetível e auditável."
    }
  ],
  "challenge": {
    "title": "Baseline mínimo para ativos críticos de rede",
    "scenario": "Uma empresa possui switches, roteadores, firewall, APs e servidores com configurações inconsistentes. A auditoria pediu um plano de hardening em 30 dias sem indisponibilidade relevante.",
    "tasks": [
      "Criar inventário por classe de ativo.",
      "Definir plano de gestão segura.",
      "Criar baseline mínimo por classe.",
      "Definir evidências de validação.",
      "Priorizar ações por risco e impacto.",
      "Definir rollback e exceções."
    ],
    "constraints": [
      "Não pode interromper produção sem janela aprovada.",
      "Não pode depender apenas de compra de ferramenta.",
      "Deve gerar evidência para auditoria.",
      "Deve preservar acesso emergencial controlado.",
      "Deve integrar logs ao SIEM."
    ],
    "expectedDeliverables": [
      "Tabela de inventário",
      "Baseline por classe",
      "Matriz de risco",
      "Plano de mudança por fases",
      "Plano de validação",
      "Plano de logs e auditoria"
    ],
    "gradingRubric": [
      {
        "criterion": "Inventário e classificação",
        "points": 20,
        "description": "Ativos classificados por função, dono, criticidade e exposição."
      },
      {
        "criterion": "Baseline técnico",
        "points": 25,
        "description": "Controles mínimos claros por classe de ativo."
      },
      {
        "criterion": "Operação segura",
        "points": 20,
        "description": "Inclui janela, rollback, break-glass e validação."
      },
      {
        "criterion": "Evidência e logs",
        "points": 20,
        "description": "Define como provar conformidade e investigar eventos."
      },
      {
        "criterion": "Priorização",
        "points": 15,
        "description": "Ordena ações por risco e impacto operacional."
      }
    ]
  },
  "commentedSolution": {
    "reasoning": "A solução correta começa pelo risco e pela operação. Antes de alterar configuração, é preciso saber quais ativos existem, como são administrados, quais serviços expõem, como geram logs e como recuperar acesso se algo falhar.",
    "steps": [
      "Inventariar ativos e versões.",
      "Classificar criticidade e superfície administrativa.",
      "Definir origem de gestão e AAA.",
      "Criar baseline mínimo por classe.",
      "Ativar NTP, logs e backup de configuração.",
      "Remover protocolos inseguros por janela de mudança.",
      "Validar acesso permitido e bloqueio esperado.",
      "Registrar exceções com prazo e dono.",
      "Automatizar validação de drift gradualmente."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Aplicar checklist da internet em todos os ativos imediatamente.",
        "whyItIsWrong": "Pode derrubar produção e ignorar função específica de cada ativo."
      },
      {
        "answer": "Comprar uma ferramenta e considerar o problema resolvido.",
        "whyItIsWrong": "Ferramenta sem baseline, processo e dono não mantém segurança."
      },
      {
        "answer": "Desativar todas as formas de acesso remoto.",
        "whyItIsWrong": "Pode impedir operação e resposta a incidentes; o correto é restringir e auditar gestão."
      }
    ],
    "finalAnswer": "Um plano maduro combina inventário, baseline por classe, gestão segura, AAA, logs, NTP, backup, remoção gradual de legado, validação, exceções controladas e monitoramento de drift."
  },
  "glossary": [
    {
      "term": "Hardening",
      "shortDefinition": "Redução da superfície de ataque por configuração segura.",
      "longDefinition": "Processo de configurar ativos para operar com serviços mínimos, acesso controlado, logs, atualização, baseline e revisão contínua.",
      "example": "Desativar Telnet, restringir SSH à rede de gestão e enviar logs ao SIEM.",
      "relatedTerms": [
        "baseline",
        "drift",
        "AAA"
      ],
      "relatedLessons": [
        "13.1",
        "13.2",
        "13.3"
      ]
    },
    {
      "term": "Baseline",
      "shortDefinition": "Padrão esperado de configuração segura.",
      "longDefinition": "Conjunto de configurações mínimas aprovadas para uma classe de ativo, usado para implantação, auditoria e detecção de drift.",
      "example": "Switches devem usar SSH, AAA, NTP, syslog e portas não usadas desativadas.",
      "relatedTerms": [
        "hardening",
        "compliance"
      ],
      "relatedLessons": [
        "13.3"
      ]
    },
    {
      "term": "Drift de configuração",
      "shortDefinition": "Diferença entre configuração real e configuração esperada.",
      "longDefinition": "Desvio causado por mudança manual, emergência, atualização, erro ou exceção não documentada.",
      "example": "SNMPv2c reaparece após substituição de equipamento.",
      "relatedTerms": [
        "baseline",
        "auditoria"
      ],
      "relatedLessons": [
        "13.3",
        "15.2"
      ]
    },
    {
      "term": "AAA",
      "shortDefinition": "Autenticação, autorização e accounting.",
      "longDefinition": "Modelo que controla quem acessa, o que pode fazer e como a ação será registrada.",
      "example": "TACACS+ para administração de switches com perfis por função.",
      "relatedTerms": [
        "RADIUS",
        "TACACS+",
        "IAM"
      ],
      "relatedLessons": [
        "12.5",
        "13.3"
      ]
    },
    {
      "term": "Plano de gestão",
      "shortDefinition": "Caminho controlado para administração dos ativos.",
      "longDefinition": "Rede, zona ou fluxo administrativo usado para acessar equipamentos e sistemas críticos com restrição de origem e logs.",
      "example": "Administradores acessam firewalls apenas via bastion na VLAN de gestão.",
      "relatedTerms": [
        "bastion",
        "ACL",
        "segmentação"
      ],
      "relatedLessons": [
        "13.2",
        "13.3"
      ]
    },
    {
      "term": "Break-glass",
      "shortDefinition": "Acesso emergencial controlado.",
      "longDefinition": "Conta ou procedimento de emergência usado quando mecanismos normais falham, com proteção, registro e revisão rigorosa.",
      "example": "Conta local selada e auditada para recuperar firewall se AAA ficar indisponível.",
      "relatedTerms": [
        "IAM",
        "AAA",
        "continuidade"
      ],
      "relatedLessons": [
        "13.3"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "SP 800-123 Guide to General Server Security",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/123/final",
      "note": "Referência para atividades fundamentais de segurança e manutenção de servidores."
    },
    {
      "type": "official-doc",
      "title": "SP 800-153 Guidelines for Securing Wireless Local Area Networks",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/153/final",
      "note": "Referência para configuração e monitoramento de WLANs."
    },
    {
      "type": "official-doc",
      "title": "Enhanced Visibility and Hardening Guidance for Communications Infrastructure",
      "organization": "CISA",
      "url": "https://www.cisa.gov/resources-tools/resources/enhanced-visibility-and-hardening-guidance-communications-infrastructure",
      "note": "Referência atual para visibilidade e hardening em infraestrutura de comunicação."
    },
    {
      "type": "internal-course",
      "title": "Redes e Network — Módulo 13",
      "organization": "Deixando de ser TBN",
      "url": "",
      "note": "Continuação direta de defesa em profundidade e segmentação."
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Redes e Network",
      "module": "m09",
      "lesson": "9.x",
      "reason": "Firewall e ACLs são usados para restringir plano de gestão e tráfego administrativo."
    },
    {
      "course": "Redes e Network",
      "module": "m12",
      "lesson": "12.7",
      "reason": "APs e controladoras Wi‑Fi precisam de hardening dentro da arquitetura corporativa."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "automação",
      "lesson": "Ansible/IaC",
      "reason": "Hardening deve evoluir para automação, templates e validação contínua."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "AAA/IAM",
      "lesson": "Autenticação administrativa",
      "reason": "Contas nominativas, MFA e autorização por perfil dependem de IAM maduro."
    }
  ],
  "pedagogicalMap": {
    "problem": "Ativos de rede e hosts expostos por configurações frágeis.",
    "concept": "Hardening como redução de superfície e manutenção de baseline seguro.",
    "internalMechanism": "Inventário, baseline, gestão segura, serviços mínimos, logs, validação e drift detection.",
    "realUse": "Auditoria, resposta a incidente, implantação de filiais, cloud e operação de SOC.",
    "commonMistake": "Aplicar checklist sem evidência, rollback ou entendimento do ativo.",
    "securityImpact": "Reduz abuso de credenciais, exposição administrativa, persistência e investigação fraca.",
    "operationalImpact": "Aumenta previsibilidade e auditoria, mas exige processo de mudança e documentação.",
    "summary": "Hardening é uma disciplina contínua de engenharia operacional, não uma lista mágica."
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
      "13.4"
    ]
  }
};
