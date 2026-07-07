export const lesson1512 = {
  "id": "15.12",
  "moduleId": "m15",
  "order": 12,
  "title": "Projeto final: war room, RCA e playbook integrado",
  "subtitle": "Como conduzir um incidente de rede ponta a ponta, coordenando pessoas, evidências, mitigação, comunicação, causa raiz e melhoria contínua — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "300-420 min",
  "estimatedStudyTimeMinutes": 420,
  "difficulty": "avançado",
  "type": "projeto",
  "xp": 420,
  "tags": [
    "troubleshooting",
    "war room",
    "RCA",
    "playbook",
    "incidente",
    "evidências",
    "linha do tempo",
    "mitigação",
    "rollback",
    "comunicação",
    "postmortem",
    "SRE",
    "DevSecOps",
    "SOC",
    "cloud",
    "VPN",
    "DNS",
    "firewall",
    "Kubernetes",
    "PCAP",
    "caso real",
    "hipótese-evidência",
    "runbook"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.1",
      "reason": "A mentalidade profissional de troubleshooting sustenta o war room."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Linha do tempo e evidências são artefatos centrais do projeto final."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.3-15.11",
      "reason": "O projeto final integra todos os diagnósticos específicos do módulo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m13",
      "lesson": "13.9",
      "reason": "Playbooks SOC e Blue Team ajudam a estruturar resposta e comunicação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.14",
      "reason": "O cenário final usa cloud networking híbrido, seguro e observável."
    }
  ],
  "objectives": [
    "Conduzir um war room com papéis, escopo, canal, decisões e linha do tempo.",
    "Construir problem statement e mapa de fluxo ponta a ponta.",
    "Criar matriz de hipóteses e evidências cruzando L2, IPv4, DNS, TCP/UDP, firewall, HTTP/TLS, VPN, cloud e PCAP.",
    "Definir mitigação segura com rollback, dono, risco e critério de sucesso.",
    "Produzir RCA com causa técnica, fatores contribuintes, causa sistêmica e ações preventivas.",
    "Transformar aprendizados em playbook versionado, testes e melhorias de observabilidade.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um incidente ambíguo, o aluno organiza papéis e canal de war room.",
    "Dado um sintoma, o aluno transforma relatos em problem statement verificável.",
    "Dado um fluxo híbrido, o aluno escolhe fontes de evidência por camada.",
    "Dada uma mitigação arriscada, o aluno exige rollback, aprovação e monitoramento.",
    "Dado o retorno do serviço, o aluno produz RCA sem culpa e com ações rastreáveis.",
    "Dado um incidente recorrente, o aluno cria playbook e controles para reduzir repetição.",
    "Dado o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>War room, RCA e playbook integrado existem porque incidentes reais não respeitam a divisão bonita entre redes, sistemas, cloud, segurança, aplicação e suporte. O usuário percebe apenas uma coisa: “o serviço não funciona”. Por trás dessa frase pode haver erro de DNS, VLAN incorreta, rota quebrada, NAT sem retorno, firewall negando, certificado expirado, proxy mal configurado, health check incorreto, CNI consumindo IPs, Private Endpoint resolvendo para IP público ou uma mudança de pipeline aplicada minutos antes.</p>\n  <p>A motivação desta aula é transformar o aluno em alguém capaz de conduzir uma investigação técnica organizada quando a pressão está alta. Um profissional de troubleshooting não é apenas quem conhece comandos; é quem consegue estruturar uma sala de crise, separar sintoma de causa, proteger evidências, reduzir impacto sem quebrar mais coisas, comunicar com clareza e transformar o incidente em aprendizado permanente.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> durante um incidente, cada time olha apenas sua ferramenta. Rede vê flow log ACCEPT. Segurança vê firewall allow. Aplicação vê erro 504. Cloud vê load balancer unhealthy. Usuário vê indisponibilidade. O war room existe para juntar essas verdades parciais em uma linha do tempo coerente.</div>\n  <p>Esta aula fecha o Módulo 15 porque integra tudo: mentalidade, evidências, baseline, L2, IPv4, DNS, TCP/UDP, firewall, NAT, HTTP/TLS, VPN, cloud e análise de pacotes. O objetivo final não é decorar uma sequência fixa, mas aprender a construir um método reproduzível para incidentes diferentes.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>No início das redes corporativas, troubleshooting muitas vezes era responsabilidade de poucos administradores que conheciam fisicamente os cabos, switches, servidores e aplicações. O diagnóstico era local, artesanal e dependia de experiência acumulada. Com o crescimento de datacenters, internet, VPN, cloud, SaaS, Kubernetes, microserviços e DevSecOps, o incidente deixou de caber na cabeça de uma única pessoa.</p>\n  <p>O war room surgiu como resposta organizacional a sistemas distribuídos e equipes especializadas. Quando o problema atravessa várias fronteiras, é necessário coordenar investigação, comunicação, tomada de decisão e registro. A RCA evoluiu de “quem causou?” para “quais condições técnicas, processuais e organizacionais permitiram que isso acontecesse?”.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Redes locais:</strong> diagnóstico centrado em cabos, portas, IPs e servidores.</div><div class=\"timeline-item\"><strong>Datacenter:</strong> VLANs, firewalls, balanceadores, storage e virtualização exigem colaboração entre equipes.</div><div class=\"timeline-item\"><strong>Internet e VPN:</strong> DNS, TLS, proxies, provedores, acesso remoto e terceiros entram no caminho.</div><div class=\"timeline-item\"><strong>Cloud:</strong> rotas, SG/NSG, NAT, endpoints privados, logs e billing viram evidências críticas.</div><div class=\"timeline-item\"><strong>SRE/DevSecOps:</strong> postmortem sem culpa, automação, observabilidade, testes sintéticos e melhoria contínua tornam-se parte do ciclo.</div></div>\n  <p>A evolução madura é enxergar incidente como oportunidade controlada de aprendizado. O objetivo não é punir quem executou uma mudança, mas corrigir o sistema que permitiu mudança arriscada sem validação, rollback, monitoramento ou revisão suficientes.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema central de um incidente complexo é a fragmentação de evidências. Cada ferramenta mostra um recorte: o monitoramento mostra sintoma, o SIEM mostra eventos de segurança, o firewall mostra decisões de política, o DNS mostra nomes, o load balancer mostra saúde, o Kubernetes mostra objetos, a aplicação mostra exceções e o usuário mostra impacto. Sem método, esses recortes viram discussão.</p>\n  <p>Erros comuns em war rooms incluem:</p>\n  <ul>\n    <li><strong>Começar pela solução:</strong> reiniciar, liberar regra ou fazer rollback antes de formular hipótese;</li>\n    <li><strong>Falta de dono:</strong> todos investigam, mas ninguém coordena decisão, comunicação e registro;</li>\n    <li><strong>Ruído no canal:</strong> prints, palpites e comandos soltos sem horário, origem ou interpretação;</li>\n    <li><strong>Diagnóstico por autoridade:</strong> aceitar a opinião da pessoa mais experiente sem evidência;</li>\n    <li><strong>Mudar várias coisas ao mesmo tempo:</strong> impossibilitar identificar o que mitigou ou piorou;</li>\n    <li><strong>Ignorar segurança:</strong> abrir firewall, remover WAF, desativar TLS ou dar acesso amplo para “testar rápido”;</li>\n    <li><strong>Encerrar ao normalizar:</strong> restaurar serviço e nunca fazer RCA, playbook ou prevenção.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Regra de ouro:</strong> incidente não termina quando o gráfico volta ao normal. Ele termina quando a organização entende o que aconteceu, reduz a chance de recorrência e melhora detecção, resposta ou recuperação.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo</h3>\n  <p><strong>Sintoma observado:</strong> Usuários VPN não acessam o ERP; pods no Kubernetes acessam parcialmente; filial resolve IP público; WAF registra 502 intermitente.</p>\n  <p><strong>Impacto operacional:</strong> Incidente executivo com múltiplas equipes, risco de abertura emergencial indevida e necessidade de RCA completo.</p>\n  <p><strong>Fluxo esperado:</strong> Usuário VPN/filial/pod → DNS → rota → firewall/NAT → WAF/LB → backend → banco/serviço gerenciado</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>20:00: mudança de landing zone</li><li>20:20: private DNS reassociado parcialmente</li><li>20:35: objeto firewall atualizado incompleto</li><li>21:00: VPN falha</li><li>21:15: WAF 502</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>DNS privado parcial</td><td>Origem resolve IP diferente</td><td>dig por origem</td><td>Alta</td></tr><tr><td>Objeto firewall incompleto</td><td>Algumas origens bloqueadas</td><td>policy lookup/logs</td><td>Alta</td></tr><tr><td>Rota cloud alterada</td><td>Next-hop diferente por subnet</td><td>effective routes</td><td>Alta</td></tr><tr><td>Health check fraco</td><td>LB saudável, usuário falha</td><td>logs LB/APM</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>O troubleshooting profissional evolui em três camadas. A primeira é técnica: comandos, logs, PCAP, rotas, DNS e políticas. A segunda é operacional: severidade, papéis, comunicação, mudança controlada, rollback e janela de decisão. A terceira é sistêmica: RCA, ações preventivas, automação, teste, observabilidade e governança.</p>\n  <p>Ambientes modernos exigem que o war room seja menos improvisado. Ele precisa de papéis definidos: incident commander, scribe, especialistas técnicos, comunicação, responsável por mudanças e aprovador de risco. Também precisa de artefatos: linha do tempo, mapa de fluxo, matriz de hipóteses, evidências, decisões, mitigação, rollback e plano pós-incidente.</p>\n  <p>Outra evolução importante é sair do postmortem culpabilizador. Um RCA maduro pergunta quais barreiras falharam: faltou alerta? faltou teste? a mudança passou sem revisão? a topologia estava documentada? o rollback era confiável? o runbook estava desatualizado? o time tinha permissão correta? o custo de observabilidade fez logs críticos ficarem desligados?</p>\n  <div class=\"callout callout--info\"><strong>Visão madura:</strong> a causa técnica restaura o serviço; a causa sistêmica evita reincidência.</div>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>Um war room é uma estrutura temporária de coordenação para restaurar serviço, reduzir impacto e preservar evidências durante um incidente. Ele não é uma reunião infinita. É um mecanismo de decisão: define escopo, coordena especialistas, controla mudanças, comunica status e registra fatos.</p>\n  <p>RCA, ou análise de causa raiz, é o processo de explicar por que o incidente aconteceu e por que as barreiras existentes não impediram, detectaram ou limitaram o impacto. Em troubleshooting profissional, RCA não se limita a “a rota estava errada”. Uma análise melhor diria: “uma rota default foi alterada por pipeline sem teste de reachability; o monitoramento detectava indisponibilidade externa, mas não identificava perda de rota de retorno; o rollback existia, mas não era automatizado; o playbook não incluía validação de UDR/route table”.</p>\n  <p>Playbook integrado é o procedimento reutilizável que nasce da investigação. Ele combina gatilhos, perguntas, fontes de evidência, comandos seguros, consultas de logs, critérios de escalonamento, mitigação, rollback, comunicação e checklist de RCA. Um bom playbook reduz tempo de resposta sem transformar incidentes em execução cega de comandos.</p>\n  <div class=\"definition-box\"><strong>Definição operacional:</strong> war room coordena a resposta; RCA explica tecnicamente e sistemicamente; playbook transforma aprendizado em capacidade repetível.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, um war room eficaz funciona como um loop de controle. Primeiro entra um sinal: alerta, chamado, reclamação, métrica ou evento de segurança. Depois vem a triagem: severidade, impacto, escopo, horário, serviços afetados e risco. Em seguida, o time cria um problem statement claro e um mapa de fluxo esperado.</p>\n  <p>A investigação então se divide por hipóteses. Cada hipótese precisa ter evidência esperada, fonte de validação e critério de descarte. Por exemplo: “se o problema é DNS, então clientes afetados devem resolver nome para IP incorreto ou receber NXDOMAIN/SERVFAIL”; “se o problema é firewall, deve existir deny, ausência de sessão, reset, rota de retorno quebrada ou divergência entre política esperada e efetiva”; “se o problema é aplicação, o fluxo de rede chega ao backend e há erro HTTP, log de exceção ou health check falho”.</p>\n  <p>O scribe registra fatos com horário, autor, evidência, decisão e resultado. O incident commander evita dispersão, controla mudanças e cobra próximas ações. Especialistas investigam dentro de escopo e reportam evidências, não palpites. A comunicação externa resume impacto e progresso sem despejar detalhes técnicos desnecessários.</p>\n  <p>Quando uma mitigação é proposta, ela deve ter: hipótese associada, risco, blast radius, rollback, responsável, aprovação e critério de sucesso. Depois da recuperação, a RCA organiza causa imediata, fatores contribuintes, impacto, detecção, resposta, recuperação e ações preventivas.</p>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura de um war room integrado tem quatro planos. O primeiro é o <strong>plano técnico</strong>: topologia, fluxo, logs, métricas, pacotes, rotas, DNS, firewall, cloud, Kubernetes e aplicação. O segundo é o <strong>plano de coordenação</strong>: papéis, canal, cadência, decisões e escalonamento. O terceiro é o <strong>plano de comunicação</strong>: stakeholders, usuários, gestão, segurança, fornecedor e status page. O quarto é o <strong>plano de melhoria</strong>: RCA, ações, dono, prazo, prioridade e validação.</p>\n  <p>Em uma empresa madura, o war room não depende de improviso. Existem templates de incidente, checklist de severidade, matriz de contatos, consultas prontas no SIEM, dashboards de serviço, runbooks de rede, padrão de RCA, modelo de postmortem, política de exceção emergencial e trilha de auditoria de mudanças.</p>\n  <p>A arquitetura técnica do projeto final deve cruzar todas as aulas do módulo: coleta de evidências, baseline, L2, IPv4, DNS, TCP/UDP, firewall/NAT, HTTP/TLS, VPN, cloud e PCAP. O aluno deve entregar um dossiê final que mostre não apenas “o que falhou”, mas como chegou à conclusão e o que será feito para evitar repetição.</p>\n  <div class=\"callout callout--security\"><strong>Arquitetura segura:</strong> até em crise, mudanças devem ser mínimas, registradas, reversíveis e alinhadas a risco. War room não é licença para desativar controles críticos sem governança.</div>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em um war room como uma equipe médica em uma emergência. O paciente chega com sintoma: dor, febre, queda de pressão. Um médico experiente não sai aplicando todos os remédios ao mesmo tempo. Primeiro estabiliza, coleta sinais vitais, pergunta histórico, solicita exames, formula hipóteses, monitora resposta e registra condutas.</p>\n  <p>Em rede, o paciente é o serviço. Os sinais vitais são métricas, logs, flow logs, status de interfaces, DNS, RTT, health checks e PCAP. A medicação emergencial é a mitigação. O prontuário é a linha do tempo. A investigação pós-evento é a RCA. O protocolo atualizado é o playbook.</p>\n  <p>A analogia ajuda a entender por que culpa não resolve. Em medicina, o objetivo é salvar o paciente e melhorar o protocolo. Em TI, o objetivo é restaurar serviço, proteger a organização e melhorar o sistema operacional, técnico e humano que lida com falhas.</p>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine que um usuário não consegue acessar <code>intranet.empresa.local</code>. Uma abordagem amadora começa com “reinicia o notebook” ou “deve ser DNS”. Uma abordagem profissional começa com problem statement: “usuário X, rede Y, desde 09:12, não acessa intranet via navegador; erro: DNS_PROBE_FINISHED_NXDOMAIN; outros usuários na mesma VLAN acessam”.</p>\n  <p>O war room simples identifica escopo: um usuário ou todos? uma VLAN ou todas? nome ou IP? rede cabeada ou Wi-Fi? Depois coleta evidências: DNS configurado no cliente, cache local, consulta ao resolvedor, resposta autoritativa, conectividade ao gateway, logs do DNS e mudanças recentes.</p>\n  <p>A conclusão pode ser simples: o cliente recebeu DNS incorreto via DHCP após trocar de VLAN. A mitigação é renovar lease ou corrigir escopo DHCP. A RCA pergunta: por que a VLAN tinha opção DNS errada? por que monitoramento não detectou? por que o template de DHCP permitiu divergência?</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma empresa, o portal de atendimento fica indisponível para filiais, mas funciona na matriz. O war room reúne redes, segurança, aplicação, infraestrutura, cloud e service desk. O incident commander define severidade alta porque há impacto em operação. O scribe cria linha do tempo: 08:40 mudança de firewall, 08:55 primeiros chamados, 09:03 alerta de aumento de 503, 09:10 abertura de incidente.</p>\n  <p>A equipe monta mapa de fluxo: filial → SD-WAN → firewall → load balancer → aplicação → banco. Hipóteses são distribuídas: DNS regional, rota SD-WAN, política de firewall, NAT, health check, backend, TLS entre LB e aplicação. Cada hipótese precisa retornar evidência em 10 minutos, não opinião.</p>\n  <p>O achado: a mudança de firewall permitiu tráfego da matriz, mas removeu objeto de rede das filiais. Logs mostram deny para sub-redes específicas. A mitigação temporária restaura objeto anterior com rollback documentado. A RCA identifica falha de processo: teste pré-mudança validava apenas origem da matriz; playbook e pipeline de firewall serão atualizados para testar múltiplas origens.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em cloud, uma aplicação privada em Kubernetes deixa de acessar banco gerenciado via Private Endpoint. A aplicação retorna timeout. O time de aplicação vê pods saudáveis. O time de cloud vê VPC/VNet sem incidentes. O time de segurança vê nenhuma alteração manual. O war room precisa reconstruir o fluxo: pod → CNI → subnet de nodes → route table → DNS privado → private endpoint → serviço gerenciado → política/IAM → resposta.</p>\n  <p>As evidências incluem logs do Ingress, CoreDNS, NetworkPolicy, flow logs, DNS query logs, route table efetiva, SG/NSG, eventos de auditoria, alterações IaC e status do endpoint privado. Uma descoberta comum é DNS privado quebrado: o nome do banco voltou a resolver para endpoint público, mas a política bloqueia egress para internet.</p>\n  <p>A mitigação pode ser restaurar zona privada, link com VNet/VPC, registro ou forwarding. A RCA deve perguntar por que a alteração passou: falta de policy as code? ausência de teste de resolução privada? ausência de alerta quando nome crítico resolve para IP público? falta de dono para zona privada?</p>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, o playbook integrado deve virar automação e prevenção. Se o incidente mostrou que uma rota cloud foi alterada sem teste, o pipeline deve incluir análise de rota efetiva, teste sintético de reachability e validação de impacto antes do merge. Se mostrou que uma regra de firewall liberou origem errada, o repositório de policy as code deve impedir ranges amplos sem exceção aprovada.</p>\n  <p>O war room também se beneficia de automação: dashboards por serviço, consultas prontas de logs, runbooks versionados, botões de rollback, templates de comunicação, criação automática de timeline a partir de eventos e integração com calendário de mudanças.</p>\n  <p>O ponto crítico é não transformar automação em risco. Um script de mitigação precisa de escopo, confirmação, logs, idempotência e rollback. Um playbook que manda “liberar any-any temporariamente” é uma dívida de segurança escrita em forma de procedimento.</p>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Para Segurança da Informação, war room de rede pode ser incidente operacional, incidente de segurança ou ambos. Uma queda de VPN pode ser falha técnica; também pode ser efeito de expiração de certificado, ataque de negação, bloqueio por reputação, alteração indevida de política ou comprometimento de credenciais. Por isso, o SOC deve participar quando há indícios de abuso, anomalia, exfiltração, lateral movement, mudança suspeita ou acesso fora de padrão.</p>\n  <p>Durante troubleshooting, é comum existir pressão para desativar controles. A postura correta é reduzir impacto sem abrir a organização. Se for necessária exceção emergencial, ela deve ter dono, prazo, escopo, justificativa, aprovação, monitoramento reforçado e remoção programada.</p>\n  <p>PCAPs, logs e timelines podem conter dados sensíveis. O dossiê do incidente deve controlar acesso, retenção, sanitização e classificação. A RCA deve incluir falhas de controle: ausência de MFA, regra excessiva, logs desligados por custo, segredo em configuração, certificado sem renovação automatizada ou falta de segregação de ambientes.</p>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra um war room profissional como sistema de decisão: entrada de sintomas, triagem, evidências por camada, hipóteses, mitigação segura, comunicação, RCA e transformação em melhoria permanente.</p>\n\n  <div class=\"diagram-wrapper\">\n    <svg class=\"lesson-svg lesson-svg--war-room\" viewBox=\"0 0 1200 660\" role=\"img\" aria-labelledby=\"warroom1512Title warroom1512Desc\">\n      <title id=\"warroom1512Title\">War room, RCA e playbook integrado</title>\n      <desc id=\"warroom1512Desc\">Fluxo de investigação de incidente de rede desde sintoma até RCA e melhoria contínua.</desc>\n      <defs>\n        <marker id=\"arrow-warroom-1512\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n          <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\"></path>\n        </marker>\n      </defs>\n\n      <rect x=\"35\" y=\"40\" width=\"1130\" height=\"580\" rx=\"24\" class=\"svg-frame\"></rect>\n      <text x=\"600\" y=\"85\" text-anchor=\"middle\" class=\"svg-title\">Incidente de rede como sistema de investigação</text>\n\n      <rect x=\"80\" y=\"125\" width=\"160\" height=\"110\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"160\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">Sintoma</text>\n      <text x=\"160\" y=\"180\" text-anchor=\"middle\" class=\"svg-small\">usuário / alerta</text>\n      <text x=\"160\" y=\"200\" text-anchor=\"middle\" class=\"svg-small\">impacto / horário</text>\n\n      <rect x=\"300\" y=\"125\" width=\"170\" height=\"110\" rx=\"16\" class=\"svg-node svg-node--decision\"></rect>\n      <text x=\"385\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">Triagem</text>\n      <text x=\"385\" y=\"180\" text-anchor=\"middle\" class=\"svg-small\">severidade</text>\n      <text x=\"385\" y=\"200\" text-anchor=\"middle\" class=\"svg-small\">escopo</text>\n\n      <rect x=\"530\" y=\"125\" width=\"170\" height=\"110\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"615\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">War room</text>\n      <text x=\"615\" y=\"180\" text-anchor=\"middle\" class=\"svg-small\">papéis</text>\n      <text x=\"615\" y=\"200\" text-anchor=\"middle\" class=\"svg-small\">canal único</text>\n\n      <rect x=\"760\" y=\"125\" width=\"170\" height=\"110\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"845\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">Timeline</text>\n      <text x=\"845\" y=\"180\" text-anchor=\"middle\" class=\"svg-small\">eventos</text>\n      <text x=\"845\" y=\"200\" text-anchor=\"middle\" class=\"svg-small\">mudanças</text>\n\n      <rect x=\"990\" y=\"125\" width=\"140\" height=\"110\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"1060\" y=\"155\" text-anchor=\"middle\" class=\"svg-label\">Comms</text>\n      <text x=\"1060\" y=\"180\" text-anchor=\"middle\" class=\"svg-small\">status</text>\n      <text x=\"1060\" y=\"200\" text-anchor=\"middle\" class=\"svg-small\">decisões</text>\n\n      <rect x=\"80\" y=\"330\" width=\"150\" height=\"125\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"155\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">L2/L3</text>\n      <text x=\"155\" y=\"384\" text-anchor=\"middle\" class=\"svg-small\">VLAN/IP/rota</text>\n      <text x=\"155\" y=\"404\" text-anchor=\"middle\" class=\"svg-small\">gateway/ICMP</text>\n      <text x=\"155\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">ARP/retorno</text>\n\n      <rect x=\"265\" y=\"330\" width=\"150\" height=\"125\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"340\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">DNS/TCP</text>\n      <text x=\"340\" y=\"384\" text-anchor=\"middle\" class=\"svg-small\">resolver</text>\n      <text x=\"340\" y=\"404\" text-anchor=\"middle\" class=\"svg-small\">porta</text>\n      <text x=\"340\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">RST/timeout</text>\n\n      <rect x=\"450\" y=\"330\" width=\"150\" height=\"125\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"525\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">Política</text>\n      <text x=\"525\" y=\"384\" text-anchor=\"middle\" class=\"svg-small\">firewall</text>\n      <text x=\"525\" y=\"404\" text-anchor=\"middle\" class=\"svg-small\">NAT</text>\n      <text x=\"525\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">SG/NSG</text>\n\n      <rect x=\"635\" y=\"330\" width=\"150\" height=\"125\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"710\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">App/TLS</text>\n      <text x=\"710\" y=\"384\" text-anchor=\"middle\" class=\"svg-small\">HTTP</text>\n      <text x=\"710\" y=\"404\" text-anchor=\"middle\" class=\"svg-small\">proxy/WAF</text>\n      <text x=\"710\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">cert/SNI</text>\n\n      <rect x=\"820\" y=\"330\" width=\"150\" height=\"125\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"895\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">Cloud/K8s</text>\n      <text x=\"895\" y=\"384\" text-anchor=\"middle\" class=\"svg-small\">flow logs</text>\n      <text x=\"895\" y=\"404\" text-anchor=\"middle\" class=\"svg-small\">Ingress/CNI</text>\n      <text x=\"895\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">custos</text>\n\n      <rect x=\"1005\" y=\"330\" width=\"125\" height=\"125\" rx=\"16\" class=\"svg-node\"></rect>\n      <text x=\"1067\" y=\"360\" text-anchor=\"middle\" class=\"svg-label\">PCAP</text>\n      <text x=\"1067\" y=\"384\" text-anchor=\"middle\" class=\"svg-small\">pacotes</text>\n      <text x=\"1067\" y=\"404\" text-anchor=\"middle\" class=\"svg-small\">hash</text>\n      <text x=\"1067\" y=\"424\" text-anchor=\"middle\" class=\"svg-small\">sensível</text>\n\n      <rect x=\"160\" y=\"525\" width=\"190\" height=\"65\" rx=\"14\" class=\"svg-node svg-node--safe\"></rect>\n      <text x=\"255\" y=\"553\" text-anchor=\"middle\" class=\"svg-label\">Mitigação segura</text>\n      <text x=\"255\" y=\"575\" text-anchor=\"middle\" class=\"svg-small\">menor mudança + rollback</text>\n\n      <rect x=\"505\" y=\"525\" width=\"190\" height=\"65\" rx=\"14\" class=\"svg-node svg-node--decision\"></rect>\n      <text x=\"600\" y=\"553\" text-anchor=\"middle\" class=\"svg-label\">RCA</text>\n      <text x=\"600\" y=\"575\" text-anchor=\"middle\" class=\"svg-small\">causa técnica + sistêmica</text>\n\n      <rect x=\"850\" y=\"525\" width=\"190\" height=\"65\" rx=\"14\" class=\"svg-node svg-node--safe\"></rect>\n      <text x=\"945\" y=\"553\" text-anchor=\"middle\" class=\"svg-label\">Playbook</text>\n      <text x=\"945\" y=\"575\" text-anchor=\"middle\" class=\"svg-small\">prevenção + automação</text>\n\n      <line x1=\"240\" y1=\"180\" x2=\"300\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-warroom-1512)\"></line>\n      <line x1=\"470\" y1=\"180\" x2=\"530\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-warroom-1512)\"></line>\n      <line x1=\"700\" y1=\"180\" x2=\"760\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-warroom-1512)\"></line>\n      <line x1=\"930\" y1=\"180\" x2=\"990\" y2=\"180\" class=\"svg-link\" marker-end=\"url(#arrow-warroom-1512)\"></line>\n      <path d=\"M615 235 C615 285 155 285 155 330\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n      <path d=\"M615 235 C615 285 340 285 340 330\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n      <path d=\"M615 235 C615 285 525 285 525 330\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n      <path d=\"M615 235 C615 285 710 285 710 330\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n      <path d=\"M615 235 C615 285 895 285 895 330\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n      <path d=\"M615 235 C615 285 1067 285 1067 330\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n      <path d=\"M525 455 C500 500 350 500 255 525\" class=\"svg-link\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n      <line x1=\"350\" y1=\"557\" x2=\"505\" y2=\"557\" class=\"svg-link\" marker-end=\"url(#arrow-warroom-1512)\"></line>\n      <line x1=\"695\" y1=\"557\" x2=\"850\" y2=\"557\" class=\"svg-link\" marker-end=\"url(#arrow-warroom-1512)\"></line>\n      <path d=\"M945 525 C980 485 1040 470 1067 455\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-warroom-1512)\"></path>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório final do Módulo 15 é um war room simulado. Você receberá um cenário corporativo com indisponibilidade intermitente de uma aplicação publicada em cloud híbrida. O objetivo é produzir um dossiê completo: problem statement, linha do tempo, mapa de fluxo, hipóteses, evidências, mitigação, rollback, RCA e playbook.</p>\n  <p>O laboratório pode ser feito sem provisionar recursos. O foco está no raciocínio, nos artefatos e na capacidade de integrar evidências de diferentes camadas. Se você tiver ambiente local, Packet Tracer, GNS3, laboratório cloud ou Kubernetes, pode adaptar os passos para coletar evidências reais.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo. <strong>Causa provável a ser comprovada ou descartada:</strong> Mudança de landing zone alterou DNS privado e rotas; firewall recebeu objeto incompleto; health check do LB não representava o fluxo real.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios treinam tomada de decisão sob pressão. Para cada cenário, diga qual papel assume, quais hipóteses abre, quais evidências precisa, qual mitigação seria aceitável e como documentaria a RCA.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio final exige desenhar e conduzir um war room de ponta a ponta para uma falha complexa envolvendo DNS privado, firewall cloud, load balancer, Kubernetes e VPN híbrida. O aluno deve separar causa imediata, fatores contribuintes, mitigação e ações preventivas.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada demonstra uma investigação madura: não acusa times, não pula para comandos destrutivos e não encerra na primeira mitigação. Ela usa evidências por camada, controla mudanças, comunica impacto e converte aprendizado em playbook.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Neste módulo você aprendeu que troubleshooting profissional é método. A aula final conectou todos os temas em um processo completo de war room, RCA e playbook integrado. O ponto central é que incidentes complexos exigem coordenação, evidência, comunicação e melhoria contínua.</p>\n  <p>Um bom profissional de redes e segurança não apenas “resolve o problema”. Ele reduz impacto, preserva evidência, evita mudanças perigosas, explica causa técnica e sistêmica, cria prevenção e melhora a capacidade da organização de detectar, responder e recuperar.</p>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Mudança de landing zone alterou DNS privado e rotas; firewall recebeu objeto incompleto; health check do LB não representava o fluxo real..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>O próximo módulo é <strong>16 — Redes como fundação da cibersegurança</strong>. Ele usará tudo que você aprendeu sobre redes, cloud e troubleshooting para explicar como reconhecimento autorizado, detecção, threat hunting, DFIR de rede e defesa contra movimento lateral dependem de fundamentos sólidos de rede.</p>\n  <p>Próxima aula: <strong>16.1 — Redes como fundação da cibersegurança</strong>.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 1",
      "Camada 2",
      "Camada 3",
      "Camada 4",
      "Camada 5/6",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Acesso à rede",
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "dependsOn": [
      "Módulo 12 Wireless",
      "Módulo 13 Segurança de Redes",
      "Módulo 14 Cloud Networking",
      "Módulo 15 aulas 15.1 a 15.11"
    ],
    "connectsTo": [
      "Módulo 16 Segurança ofensiva/defensiva autorizada",
      "Curso Infraestrutura, Platform Engineering e DevSecOps",
      "Curso Enterprise Identity e IAM"
    ]
  },
  "lab": {
    "id": "lab-15.12",
    "title": "Caso guiado: Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "Usuários VPN não acessam o ERP; pods no Kubernetes acessam parcialmente; filial resolve IP público; WAF registra 502 intermitente. Impacto: Incidente executivo com múltiplas equipes, risco de abertura emergencial indevida e necessidade de RCA completo. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Usuário VPN/filial/pod → DNS → rota → firewall/NAT → WAF/LB → backend → banco/serviço gerenciado",
    "architecture": "Arquitetura investigada: Usuário VPN/filial/pod → DNS → rota → firewall/NAT → WAF/LB → backend → banco/serviço gerenciado. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 420,
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
        "title": "Abrir war room",
        "instruction": "Defina comandante, escriba, donos técnicos, canal e cadência de atualização.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "War room organizado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Escrever problem statement",
        "instruction": "Descreva impacto, populações, serviços e janela sem causa prematura.",
        "command": "Manter quadro: problem statement, escopo, timeline, hipóteses, evidências, dono, próxima ação e rollback",
        "expectedOutput": "Problem statement executivo e técnico.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Construir matriz afetado/não afetado",
        "instruction": "Compare VPN, filial, Kubernetes, datacenter e externo.",
        "command": "dig/Resolve-DnsName por origem; effective routes; policy lookup; flow logs; curl -v; tcpdump quando necessário",
        "expectedOutput": "Escopo real.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Mapear fluxo integrado",
        "instruction": "Desenhe DNS, rota, firewall, WAF/LB, backend e banco.",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "expectedOutput": "Mapa ponta a ponta.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Priorizar hipóteses",
        "instruction": "Escolha hipóteses que explicam o maior número de sintomas.",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "expectedOutput": "Matriz priorizada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Delegar evidências",
        "instruction": "Atribua coleta por equipe com prazo e formato.",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "expectedOutput": "Evidências paralelas sem conflito.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Executar mitigação segura",
        "instruction": "Aplique rollback/ajuste mínimo com autorização e monitoramento.",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "expectedOutput": "Serviço recuperado com risco controlado.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Validar recuperação",
        "instruction": "Teste todos os perfis afetados e monitore erro/latência/custo.",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "expectedOutput": "Validação ampla.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 9,
        "title": "Produzir RCA final",
        "instruction": "Documente causa raiz, fatores contribuintes, impacto, detecção, ações e donos.",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "expectedOutput": "RCA completo.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 10,
        "title": "Atualizar playbooks",
        "instruction": "Transforme aprendizado em checklist, teste automatizado e alerta.",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "expectedOutput": "Melhoria contínua.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Recuperação por todos os perfis",
        "command": "testes VPN/filial/Kubernetes/datacenter",
        "expected": "Todos os fluxos críticos funcionam.",
        "ifFails": "Voltar à matriz de hipóteses."
      },
      {
        "check": "Evidência sustenta RCA",
        "command": "Revisão do dossiê",
        "expected": "Cada conclusão aponta para log, comando ou métrica.",
        "ifFails": "Marcar lacunas e não inventar certeza."
      },
      {
        "check": "Ações preventivas têm dono",
        "command": "RCA final",
        "expected": "Cada ação tem responsável, prazo e critério de aceite.",
        "ifFails": "Reformular ações vagas."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "War room vira caos",
        "probableCause": "Sem papéis e cadência",
        "howToConfirm": "Ver quadro de ações duplicadas",
        "fix": "Definir comandante/escriba/donos."
      },
      {
        "symptom": "Recupera um perfil e quebra outro",
        "probableCause": "Validação incompleta",
        "howToConfirm": "Testar matriz afetado/não afetado",
        "fix": "Validar por origem antes de encerrar."
      },
      {
        "symptom": "RCA culpa uma pessoa",
        "probableCause": "Foco em blame, não sistema",
        "howToConfirm": "Verificar fatores contribuintes",
        "fix": "Escrever RCA sem culpa e com controles preventivos."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "quadro do war room",
      "problem statement",
      "timeline",
      "matriz afetado/não afetado",
      "fluxo integrado",
      "logs DNS/firewall/WAF/cloud",
      "comandos executados",
      "RCA final",
      "ações preventivas"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Conduza o capstone como se fosse incidente real: entregue dossiê, comunicação executiva, mitigação, validação e RCA com rubrica.",
    "solution": "A solução final integra método e técnica: coordena pessoas, compara origens, valida DNS/rota/política/aplicação, aplica mudança mínima, prova recuperação, registra evidências e transforma o incidente em controles preventivos.",
    "expectedDeliverables": [
      "Ata do war room",
      "Problem statement",
      "Linha do tempo",
      "Mapa de fluxo",
      "Matriz hipótese-evidência",
      "Dossiê de logs/PCAP/métricas",
      "Plano de mitigação e rollback",
      "RCA sem culpa",
      "Playbook integrado",
      "Backlog de ações preventivas"
    ]
  },
  "exercises": [
    {
      "id": "ex15.12.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.12.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.12.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.12.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.12.p1.2",
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
      "id": "q15.12.p1.3",
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
      "id": "q15.12.p1.4",
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
      "question": "Qual é a principal função do incident commander?",
      "options": [
        "Executar todos os comandos técnicos",
        "Coordenar resposta, decisões, escopo e comunicação",
        "Substituir especialistas de todas as áreas",
        "Escrever código de correção"
      ],
      "answer": 1,
      "explanation": "O incident commander coordena o processo, não centraliza todo trabalho técnico."
    },
    {
      "question": "Qual item não deve faltar em uma mitigação profissional?",
      "options": [
        "Dono, risco, critério de sucesso e rollback",
        "Aprovação verbal sem registro",
        "Mudança ampla para testar rápido",
        "Remoção temporária de todos os controles"
      ],
      "answer": 0,
      "explanation": "Mitigação deve ser controlada, reversível e registrada."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.12.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.12.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.12.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.12.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.12.p1.5",
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
      "question": "Qual parte do caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo",
    "scenario": "Usuários VPN não acessam o ERP; pods no Kubernetes acessam parcialmente; filial resolve IP público; WAF registra 502 intermitente.",
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
    "reasoning": "A solução final integra método e técnica: coordena pessoas, compara origens, valida DNS/rota/política/aplicação, aplica mudança mínima, prova recuperação, registra evidências e transforma o incidente em controles preventivos.",
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
    "finalAnswer": "A resposta correta para “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "War room",
      "shortDefinition": "Coordenação temporária de incidente.",
      "longDefinition": "Estrutura operacional para reunir responsáveis, organizar evidências, tomar decisões e comunicar status durante um incidente crítico.",
      "example": "Um war room é aberto quando o portal corporativo fica indisponível para filiais.",
      "relatedTerms": [
        "Incidente",
        "RCA",
        "Playbook"
      ],
      "relatedLessons": [
        "15.12"
      ]
    },
    {
      "term": "RCA",
      "shortDefinition": "Análise de causa raiz.",
      "longDefinition": "Processo de identificar causa imediata, fatores contribuintes e falhas sistêmicas que permitiram o incidente.",
      "example": "A RCA mostra que uma alteração DNS passou sem teste de resolução privada.",
      "relatedTerms": [
        "Postmortem",
        "Causa sistêmica",
        "Ação preventiva"
      ],
      "relatedLessons": [
        "15.12"
      ]
    },
    {
      "term": "Incident Commander",
      "shortDefinition": "Coordenador do incidente.",
      "longDefinition": "Pessoa responsável por conduzir escopo, prioridades, comunicação, decisões e cadência do war room.",
      "example": "O incident commander impede que várias mudanças sejam feitas ao mesmo tempo.",
      "relatedTerms": [
        "War room",
        "Scribe",
        "Comunicação"
      ],
      "relatedLessons": [
        "15.12"
      ]
    },
    {
      "term": "Scribe",
      "shortDefinition": "Registrador da timeline e decisões.",
      "longDefinition": "Papel responsável por documentar fatos, evidências, decisões, horários, responsáveis e resultados durante o incidente.",
      "example": "O scribe registra que a regra foi revertida às 10:42 e o erro 504 caiu às 10:46.",
      "relatedTerms": [
        "Timeline",
        "Evidência",
        "RCA"
      ],
      "relatedLessons": [
        "15.12"
      ]
    },
    {
      "term": "Mitigação",
      "shortDefinition": "Ação para reduzir impacto.",
      "longDefinition": "Mudança temporária ou definitiva para restaurar serviço ou reduzir dano, idealmente com escopo mínimo, critério de sucesso e rollback.",
      "example": "Restaurar uma rota anterior é mitigação se reduz o impacto enquanto a causa completa é analisada.",
      "relatedTerms": [
        "Rollback",
        "Mudança emergencial",
        "Risco"
      ],
      "relatedLessons": [
        "15.12"
      ]
    },
    {
      "term": "Playbook",
      "shortDefinition": "Procedimento reutilizável de resposta.",
      "longDefinition": "Documento ou automação versionada que descreve gatilhos, evidências, passos seguros, comunicação, escalonamento, mitigação e pós-incidente.",
      "example": "O playbook de DNS privado inclui consulta por origem, verificação de zona privada e alerta de resolução pública.",
      "relatedTerms": [
        "Runbook",
        "RCA",
        "Automação"
      ],
      "relatedLessons": [
        "15.12"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.12"
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
        "15.12"
      ]
    }
  ],
  "references": [
    {
      "type": "official-doc",
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations for Cybersecurity Risk Management",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "note": "Referência para resposta a incidentes integrada à gestão de risco e ao NIST CSF 2.0."
    },
    {
      "type": "official-doc",
      "title": "NIST Cybersecurity Framework 2.0",
      "organization": "NIST",
      "url": "https://www.nist.gov/cyberframework",
      "note": "Base para funções Govern, Identify, Protect, Detect, Respond e Recover usadas na maturidade de resposta."
    },
    {
      "type": "official-doc",
      "title": "Blameless Postmortem for System Resilience",
      "organization": "Google SRE",
      "url": "https://sre.google/sre-book/postmortem-culture/",
      "note": "Referência cultural para postmortems sem culpa e aprendizado sistêmico."
    },
    {
      "type": "official-doc",
      "title": "Postmortem Practices for Incident Management",
      "organization": "Google SRE Workbook",
      "url": "https://sre.google/workbook/postmortem-culture/",
      "note": "Boas práticas de documentação factual, linguagem neutra e ações pós-incidente."
    },
    {
      "type": "course-link",
      "title": "Redes e Network Módulo 15 — Troubleshooting de Redes",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15",
      "note": "Módulo base para o projeto final de war room, RCA e playbook."
    },
    {
      "type": "course-link",
      "title": "Redes e Network Módulo 14 — Cloud Networking",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m14",
      "note": "Base para o cenário de cloud networking híbrido usado no projeto final."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Projeto final: war room, RCA e playbook integrado\".",
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
        "description": "No caso “Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Projeto final: war room, RCA e playbook integrado",
              "description": "Em Projeto final: war room, RCA e playbook integrado, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.12."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "Usuários VPN não acessam o ERP; pods no Kubernetes acessam parcialmente; filial resolve IP público; WAF registra 502 intermitente.",
      "Impacto: Incidente executivo com múltiplas equipes, risco de abertura emergencial indevida e necessidade de RCA completo.",
      "Causa provável a validar: Mudança de landing zone alterou DNS privado e rotas; firewall recebeu objeto incompleto; health check do LB não representava o fluxo real.",
      "Falha ou comportamento inesperado relacionado a Projeto final: war room, RCA e playbook integrado.",
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
      "Qual evidência comprova o entendimento da aula 15.12?"
    ],
    "commands": [
      {
        "platform": "War room",
        "command": "Manter quadro: problem statement, escopo, timeline, hipóteses, evidências, dono, próxima ação e rollback",
        "purpose": "Coordenar pessoas e evidências.",
        "expectedObservation": "Todos sabem o estado atual e a próxima validação.",
        "interpretation": "Sem coordenação, equipes executam mudanças conflitantes."
      },
      {
        "platform": "Rede/Cloud",
        "command": "dig/Resolve-DnsName por origem; effective routes; policy lookup; flow logs; curl -v; tcpdump quando necessário",
        "purpose": "Validar fluxo por camada e por origem.",
        "expectedObservation": "Diferenças entre VPN, filial, Kubernetes e datacenter.",
        "interpretation": "O capstone exige comparar afetado/não afetado, não testar só um ponto."
      },
      {
        "platform": "DevSecOps/SOC",
        "command": "Consultar pipeline, audit logs, SIEM, mudanças aprovadas, alertas WAF/LB e evidências de segurança",
        "purpose": "Correlacionar mudança, incidente e risco.",
        "expectedObservation": "Linha do tempo com mudanças e sinais de segurança.",
        "interpretation": "RCA deve incluir processo, detecção e prevenção, não só comando de correção."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “DNS privado parcial” está com prioridade Alta e a evidência necessária é “dig por origem”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Objeto firewall incompleto” está com prioridade Alta e a evidência necessária é “policy lookup/logs”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Rota cloud alterada” está com prioridade Alta e a evidência necessária é “effective routes”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Health check fraco” está com prioridade Média e a evidência necessária é “logs LB/APM”",
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
      "deliverablesMarked": true,
      "rubricCompleted": true,
      "selfAssessmentDone": true
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "16.1"
    ]
  },
  "diagnosticCase": {
    "title": "Incidente integrado: mudança cloud quebra DNS privado, firewall e VPN ao mesmo tempo",
    "symptom": "Usuários VPN não acessam o ERP; pods no Kubernetes acessam parcialmente; filial resolve IP público; WAF registra 502 intermitente.",
    "businessImpact": "Incidente executivo com múltiplas equipes, risco de abertura emergencial indevida e necessidade de RCA completo.",
    "likelyRootCause": "Mudança de landing zone alterou DNS privado e rotas; firewall recebeu objeto incompleto; health check do LB não representava o fluxo real.",
    "timeline": [
      "20:00: mudança de landing zone",
      "20:20: private DNS reassociado parcialmente",
      "20:35: objeto firewall atualizado incompleto",
      "21:00: VPN falha",
      "21:15: WAF 502"
    ],
    "expectedFlow": "Usuário VPN/filial/pod → DNS → rota → firewall/NAT → WAF/LB → backend → banco/serviço gerenciado",
    "hypothesisMatrix": [
      {
        "hypothesis": "DNS privado parcial",
        "why": "Origem resolve IP diferente",
        "evidence": "dig por origem",
        "priority": "Alta"
      },
      {
        "hypothesis": "Objeto firewall incompleto",
        "why": "Algumas origens bloqueadas",
        "evidence": "policy lookup/logs",
        "priority": "Alta"
      },
      {
        "hypothesis": "Rota cloud alterada",
        "why": "Next-hop diferente por subnet",
        "evidence": "effective routes",
        "priority": "Alta"
      },
      {
        "hypothesis": "Health check fraco",
        "why": "LB saudável, usuário falha",
        "evidence": "logs LB/APM",
        "priority": "Média"
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
