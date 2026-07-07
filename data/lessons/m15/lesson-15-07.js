export const lesson1507 = {
  "id": "15.7",
  "moduleId": "m15",
  "order": 7,
  "title": "Troubleshooting firewall, ACL, NAT e políticas",
  "subtitle": "Como diagnosticar regras, estado de conexão, ordem, retorno, tradução de endereços, logs, exceções e políticas em redes corporativas e cloud — agora aplicado como caso real com hipóteses, evidências, decisão e RCA.",
  "duration": "180-240 min",
  "estimatedStudyTimeMinutes": 240,
  "difficulty": "intermediário-avançado",
  "type": "fundamental",
  "xp": 270,
  "tags": [
    "troubleshooting",
    "firewall",
    "ACL",
    "NAT",
    "SNAT",
    "DNAT",
    "stateful",
    "stateless",
    "security groups",
    "NSG",
    "NACL",
    "cloud firewall",
    "egress control",
    "policy as code",
    "flow logs",
    "RCA",
    "caso real",
    "hipótese-evidência",
    "runbook",
    "war room"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.1",
      "reason": "Define método, escopo, hipóteses, comunicação e RCA."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.2",
      "reason": "Ensina baseline, linha do tempo e coleta de evidências."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.4",
      "reason": "Firewall e NAT dependem de IPv4, rotas, gateway, ICMP e retorno."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.6",
      "reason": "Políticas interferem diretamente em TCP, UDP, portas e serviços."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.5",
      "reason": "Security Groups, NSG, NACL e Cloud Firewalls são controles equivalentes em cloud."
    }
  ],
  "objectives": [
    "Diagnosticar fluxos bloqueados ou traduzidos por firewall, ACL, NAT e políticas.",
    "Diferenciar controles stateful e stateless e seus impactos no tráfego de retorno.",
    "Interpretar sintomas como timeout, reset, deny, allow sem resposta e ausência de log.",
    "Validar ordem de regra, regra efetiva, hit count, sessão, NAT e rota de retorno.",
    "Aplicar troubleshooting seguro com exceção mínima, expiração, rollback e evidência.",
    "Transformar incidentes de política em governança, testes, policy as code e prevenção.",
    "Conduzir um caso real de diagnóstico usando sintomas, hipóteses, evidências, decisão, mitigação, validação e RCA."
  ],
  "learningOutcomes": [
    "Dado um fluxo TCP com timeout, o aluno identifica hipóteses de deny silencioso, retorno quebrado, NACL stateless, NAT ausente ou rota assimétrica.",
    "Dada uma regra aparentemente correta, o aluno valida prioridade, ordem, escopo, associação ao recurso e hit count.",
    "Dado um NAT de saída, o aluno identifica endereço antes/depois, porta efêmera, log de tradução e caminho de retorno.",
    "Dado um ambiente cloud, o aluno correlaciona SG/NSG, NACL, route table, firewall central, flow logs e política organizacional.",
    "Dada uma solicitação de exceção, o aluno propõe liberação mínima com dono, justificativa, prazo, evidência e rollback.",
    "Dado o caso “Regra permite a ida, mas NAT e retorno quebram a sessão”, o aluno monta matriz hipótese-evidência e RCA defensável."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n  <p>Em muitos incidentes de rede, o serviço está funcionando, o DNS resolve, a rota existe e o servidor escuta na porta correta, mas o acesso ainda falha. A causa costuma estar em uma camada de decisão intermediária: firewall, ACL, NAT, security group, NSG, NACL, proxy, política de egress, regra de retorno ou exceção temporária que virou permanente.</p>\n  <p>A motivação desta aula é ensinar você a diagnosticar essas políticas sem cair em dois extremos perigosos: culpar o firewall por tudo ou liberar tráfego demais para “testar rapidinho”. Em ambiente corporativo, firewall e NAT são partes da segurança, da disponibilidade, da auditoria e do custo. Um diagnóstico mal feito pode abrir exposição pública, quebrar segmentação, mascarar a causa real, gerar rota assimétrica ou transformar uma exceção de emergência em dívida permanente.</p>\n  <div class=\"callout callout--problem\"><strong>Problema real:</strong> quando alguém diz “a porta está liberada”, a frase pode significar apenas que uma regra parece permitir o tráfego em uma direção. Troubleshooting profissional exige perguntar: qual origem, destino, protocolo, porta, identidade, zona, tabela, NAT, ordem de regra, estado da conexão, caminho de retorno, log e horário confirmam essa liberação?</div>\n  <p>Essa aula conecta diretamente as aulas 15.4 e 15.6. Você já aprendeu a investigar IP, rota, gateway, ICMP, TCP, UDP, portas e serviços. Agora vai investigar os controles que decidem se esse tráfego pode passar, se será traduzido, se será inspecionado, se terá retorno e se deixará evidência suficiente para RCA.</p>\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n  <p>No início das redes corporativas, muitos ambientes confiavam principalmente na separação física e em filtros simples em roteadores. Com o crescimento da internet, surgiram firewalls de borda para separar redes internas de redes externas. As primeiras políticas eram fortemente baseadas em endereço IP, porta e direção.</p>\n  <p>Depois vieram firewalls stateful, que passaram a entender estados de conexão, permitindo o retorno de fluxos iniciados de dentro sem exigir regra explícita em todos os sentidos. Em paralelo, o NAT tornou possível traduzir endereços privados para públicos e ajudou empresas a conectar redes internas à internet, mas também adicionou complexidade operacional: tabelas de tradução, portas efêmeras, sobreposição de endereços, logs de tradução e dependência de rota de retorno.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Filtros simples:</strong> ACLs em roteadores baseadas em origem, destino, protocolo e porta.</div><div class=\"timeline-item\"><strong>Firewall de borda:</strong> separação entre rede interna, DMZ e internet.</div><div class=\"timeline-item\"><strong>Stateful inspection:</strong> controle baseado no estado da conexão.</div><div class=\"timeline-item\"><strong>NAT/NAPT:</strong> tradução de endereços e portas para saída, publicação e integração.</div><div class=\"timeline-item\"><strong>Cloud:</strong> SG, NSG, NACL, cloud firewall, rotas efetivas, private endpoints e política como código.</div><div class=\"timeline-item\"><strong>Zero Trust:</strong> tráfego avaliado por identidade, contexto, segmentação e menor privilégio.</div></div>\n  <p>O ponto histórico mais importante para o aluno é perceber que firewall, ACL e NAT não são “botões de liberar ou bloquear”. Eles são mecanismos acumulados ao longo da evolução das redes. Cada um resolve um problema, mas também cria novos pontos de falha, logs, exceções e dependências.</p>\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n  <p>O problema desta aula é diagnosticar fluxos que falham por decisão de política, tradução de endereço, estado de conexão, ordem de regra, rota de retorno ou assimetria.</p>\n  <p>Sintomas comuns:</p>\n  <ul>\n    <li>TCP timeout mesmo com serviço ativo;</li>\n    <li>RST gerado por firewall, proxy ou equipamento intermediário;</li>\n    <li>conexão funciona de uma origem, mas falha de outra;</li>\n    <li>serviço publicado funciona externamente, mas não internamente;</li>\n    <li>VPN conecta, mas tráfego interno não passa;</li>\n    <li>NAT de saída funciona para internet, mas não para rede parceira;</li>\n    <li>regra aparentemente correta não é aplicada por prioridade ou regra anterior;</li>\n    <li>NACL stateless permite ida, mas bloqueia retorno;</li>\n    <li>SG/NSG permite inbound, mas rota de retorno ou NAT quebra o fluxo;</li>\n    <li>cloud firewall inspeciona tráfego em um caminho, mas o retorno passa por outro;</li>\n    <li>logs mostram allow, mas outro componente descarta depois;</li>\n    <li>exceção temporária sem expiração vira falha de governança.</li>\n  </ul>\n  <div class=\"callout callout--warning\"><strong>Armadilha clássica:</strong> olhar apenas a regra de entrada. Muitos incidentes estão no retorno, na tabela NAT, na prioridade de regra, na rota assimétrica, em uma política organizacional, em um security group aplicado ao recurso errado ou em uma regra ampla que mascara o problema real.</div>\n</section>\n<div class=\"case-study case-study--troubleshooting\">\n  <h3>Caso real guiado: Regra permite a ida, mas NAT e retorno quebram a sessão</h3>\n  <p><strong>Sintoma observado:</strong> O firewall mostra allow na ida, mas o cliente recebe timeout e o servidor registra origem inesperada.</p>\n  <p><strong>Impacto operacional:</strong> A operação quer duplicar regras, criando exceções permanentes e difíceis de auditar.</p>\n  <p><strong>Fluxo esperado:</strong> Cliente → firewall de borda → DNAT/SNAT → firewall interno → servidor → retorno stateful</p>\n  <p><strong>Risco de diagnóstico ruim:</strong> agir antes de coletar evidências pode mascarar a causa, ampliar permissões, apagar logs ou criar uma segunda falha.</p>\n  <h4>Linha do tempo inicial</h4>\n  <ul><li>14:00: publicação de serviço</li><li>14:10: DNAT criado</li><li>14:20: SNAT não documentado</li><li>14:30: timeout externo</li></ul>\n  <h4>Matriz hipótese → evidência</h4>\n  <table class=\"data-table\"><thead><tr><th>Hipótese</th><th>Por que faz sentido</th><th>Evidência necessária</th><th>Prioridade</th></tr></thead><tbody><tr><td>Regra errada/prioridade</td><td>Allow esperado não é regra efetiva</td><td>policy lookup/log rule id</td><td>Alta</td></tr><tr><td>NAT incompleto</td><td>Destino ou origem traduzido de forma inesperada</td><td>NAT table/session log</td><td>Alta</td></tr><tr><td>Retorno assimétrico</td><td>Resposta não volta pelo mesmo firewall</td><td>session table/route</td><td>Alta</td></tr><tr><td>Objeto desatualizado</td><td>IP do grupo não contém novo servidor</td><td>config diff</td><td>Média</td></tr></tbody></table>\n</div>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n  <p>O troubleshooting de políticas amadurece quando você troca a pergunta “está liberado?” por uma cadeia de verificação. Uma política moderna envolve múltiplas camadas: ACL de roteador, firewall de perímetro, firewall de host, security group, NSG, NACL, cloud firewall, proxy, WAF, endpoint policy, IAM, rota efetiva e NAT.</p>\n  <table class=\"comparison-table\">\n    <thead><tr><th>Controle</th><th>Problema que resolve</th><th>Como quebra troubleshooting</th><th>Evidência útil</th></tr></thead>\n    <tbody>\n      <tr><td>ACL</td><td>Filtro simples por tupla de rede.</td><td>Ordem errada, deny implícito, retorno esquecido.</td><td>Configuração, hit count, logs e posição da regra.</td></tr>\n      <tr><td>Firewall stateful</td><td>Controla fluxos por estado de conexão.</td><td>Assimetria, sessão expirada, inspeção incorreta.</td><td>Session table, logs allow/deny/reset e regra aplicada.</td></tr>\n      <tr><td>NAT</td><td>Traduz endereços e portas.</td><td>Tradução errada, pool esgotado, log ausente, retorno quebrado.</td><td>Tabela NAT, logs de tradução, origem antes/depois.</td></tr>\n      <tr><td>SG/NSG</td><td>Controle próximo ao recurso cloud.</td><td>Regra no recurso errado, prioridade, origem incorreta.</td><td>Regras efetivas, flow logs e associação do recurso.</td></tr>\n      <tr><td>NACL</td><td>Filtro stateless em subnet.</td><td>Portas efêmeras de retorno bloqueadas.</td><td>Regras inbound/outbound e flow logs.</td></tr>\n      <tr><td>Cloud firewall/NVA</td><td>Inspeção central, segmentação e logs.</td><td>Bypass, rota assimétrica, custo, gargalo.</td><td>Logs, rotas efetivas, health do appliance e métricas.</td></tr>\n    </tbody>\n  </table>\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n  <p><strong>Firewall</strong> é um controle que decide se determinado tráfego pode atravessar uma fronteira de segurança. Essa fronteira pode estar entre internet e datacenter, entre VLANs, entre VPCs, entre subnets, entre pods, entre workloads ou até dentro do próprio host.</p>\n  <p><strong>ACL</strong> é uma lista de controle de acesso, normalmente avaliada em ordem, que permite ou nega tráfego com base em atributos como origem, destino, protocolo e porta. ACLs costumam ser mais simples e menos contextuais que firewalls modernos, mas ainda aparecem em roteadores, switches, cloud NACLs e políticas de infraestrutura.</p>\n  <p><strong>NAT</strong> é tradução de endereço de rede. Ele altera endereço IP e, em muitos casos, porta de origem ou destino. NAT pode ser usado para saída para internet, publicação de serviços, integração com redes parceiras, resolução de sobreposição de CIDR e mascaramento de endereços internos.</p>\n  <p><strong>Política</strong> é a intenção declarada: quem pode falar com quem, por qual protocolo, em qual porta, com qual inspeção, por quanto tempo, com qual justificativa e com qual evidência. A regra técnica é apenas a implementação dessa política.</p>\n  <div class=\"callout callout--info\"><strong>Conceito-chave:</strong> troubleshooting profissional de firewall, ACL e NAT não começa mudando regra. Começa reconstruindo o fluxo esperado e comparando a intenção da política com a regra efetiva, o caminho real, a tradução aplicada e os logs.</div>\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n  <p>Internamente, um fluxo atravessando controles de rede passa por decisões sucessivas. Primeiro, o equipamento precisa saber por qual interface o pacote entrou, qual zona ou interface lógica representa essa origem e qual rota aponta para o destino. Depois, a política verifica se a tupla origem-destino-protocolo-porta é permitida. Em firewalls stateful, o equipamento também consulta uma tabela de sessões para saber se aquele pacote pertence a uma conexão já autorizada.</p>\n  <p>Em NAT, o dispositivo mantém uma tabela de tradução. Um cliente interno pode sair como IP público compartilhado, usando uma porta de origem traduzida. Na volta, o dispositivo precisa encontrar a entrada correspondente para reconstruir o endereço original. Se a tradução expirar, se a rota de retorno não passa pelo mesmo ponto, ou se as portas efêmeras forem bloqueadas por um controle stateless, o fluxo falha mesmo que a regra pareça correta.</p>\n  <p>O pipeline lógico de decisão costuma incluir:</p>\n  <ol>\n    <li>interface de entrada e zona;</li>\n    <li>classificação do fluxo;</li>\n    <li>verificação de sessão existente;</li>\n    <li>avaliação de regra por prioridade ou ordem;</li>\n    <li>aplicação de NAT de origem ou destino;</li>\n    <li>roteamento para o próximo salto;</li>\n    <li>inspeção adicional, se existir;</li>\n    <li>registro em log conforme nível configurado;</li>\n    <li>processamento do retorno pela sessão ou por regra explícita.</li>\n  </ol>\n  <div class=\"callout callout--warning\"><strong>Detalhe importante:</strong> a ordem entre NAT, roteamento e política varia por plataforma. Em troubleshooting real, sempre consulte a documentação do produto e colete logs da regra efetivamente aplicada.</div>\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n  <p>Em arquitetura corporativa, firewall, ACL e NAT aparecem em várias posições. Um fluxo aparentemente simples pode atravessar controles no endpoint, na VLAN, no roteador, na borda, na VPN, no hub cloud, no security group, no load balancer, no Kubernetes Ingress e no próprio host.</p>\n  <p>Uma arquitetura madura separa responsabilidades:</p>\n  <ul>\n    <li><strong>controle próximo ao workload:</strong> SG, NSG, firewall de host, NetworkPolicy ou microsegmentação;</li>\n    <li><strong>controle de subnet ou zona:</strong> ACL, NACL, roteamento e segmentação;</li>\n    <li><strong>controle central:</strong> firewall corporativo, NVA, cloud firewall, proxy e inspeção de egress;</li>\n    <li><strong>tradução:</strong> NAT gateway, firewall NAT, SNAT/DNAT, publicação e integração com parceiros;</li>\n    <li><strong>governança:</strong> dono da regra, justificativa, expiração, mudança, evidência e revisão periódica;</li>\n    <li><strong>observabilidade:</strong> logs, flow logs, session table, métricas, SIEM e billing.</li>\n  </ul>\n  <p>O erro arquitetural comum é usar apenas uma camada de controle e presumir que ela cobre todos os cenários. O erro oposto é empilhar controles sem documentação, criando um labirinto em que ninguém sabe qual regra autorizou ou bloqueou o tráfego.</p>\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n  <p>Imagine um prédio corporativo. O firewall é a portaria principal, a ACL é uma lista de autorização objetiva, o NAT é uma etiqueta temporária que troca a identificação visível do visitante, e a política é o regulamento que explica por que aquela pessoa pode entrar, para onde pode ir e por quanto tempo.</p>\n  <p>Se alguém diz “o visitante foi autorizado”, ainda faltam perguntas. Ele foi autorizado em qual portaria? Para qual andar? Com qual crachá? Em qual horário? A autorização ainda é válida? A saída dele passa pela mesma portaria? A câmera registrou o evento? O nome dele foi trocado por um crachá genérico? A autorização era temporária ou virou permanente?</p>\n  <div class=\"callout callout--info\"><strong>Analogia prática:</strong> em redes, uma regra de firewall sem log, sem dono e sem expiração é como uma autorização de portaria sem registro. Pode resolver um problema imediato, mas cria risco operacional e de segurança.</div>\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n  <p>Um usuário tenta acessar <code>https://app.exemplo.local</code>. O DNS resolve para <code>10.20.30.40</code>. O cliente envia SYN para TCP/443, mas recebe timeout. O servidor está ativo e o processo escuta em <code>0.0.0.0:443</code>.</p>\n  <p>Um diagnóstico superficial diria: “o firewall está bloqueando”. Um diagnóstico profissional monta o fluxo:</p>\n  <ol>\n    <li>Origem: <code>10.10.5.25</code>.</li>\n    <li>Destino: <code>10.20.30.40</code>.</li>\n    <li>Protocolo/porta: TCP/443.</li>\n    <li>Gateway da origem: roteia para firewall interno.</li>\n    <li>Firewall: regra permite <code>10.10.0.0/16</code> para <code>10.20.30.0/24</code> TCP/443?</li>\n    <li>Retorno: servidor tem rota para <code>10.10.5.25</code> pelo mesmo firewall?</li>\n    <li>Logs: existe deny, allow, drop silencioso ou ausência de log?</li>\n  </ol>\n  <p>Ao verificar, a equipe descobre que o firewall permite ida, mas uma ACL de saída no segmento do servidor bloqueia portas efêmeras de retorno. A correção não é “abrir tudo”; é ajustar a política de retorno conforme o modelo de estado do controle usado.</p>\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n  <p>Uma empresa possui rede de usuários, rede de servidores, DMZ, VPN de fornecedores e conexão com uma adquirente financeira. Uma nova aplicação precisa acessar um serviço legado em TCP/1521. O time de aplicação pede “liberar a porta do servidor para o banco”.</p>\n  <p>O time de redes transforma o pedido em política:</p>\n  <ul>\n    <li>qual aplicação realmente precisa acessar o banco?</li>\n    <li>qual IP ou grupo de workloads representa a origem?</li>\n    <li>qual destino e porta são necessários?</li>\n    <li>há NAT entre redes?</li>\n    <li>a conexão é iniciada por quem?</li>\n    <li>há necessidade de inspeção?</li>\n    <li>qual ambiente: dev, homologação ou produção?</li>\n    <li>qual expiração ou revisão da regra?</li>\n    <li>qual log deve ir para o SIEM?</li>\n  </ul>\n  <p>Durante a implantação, a aplicação falha. Os logs mostram allow no firewall de saída, mas deny no firewall de entrada do segmento do banco. A RCA identifica que a regra foi criada apenas em uma fronteira. A melhoria é criar fluxo de mudança com matriz origem-destino, validação em todos os controles e teste sintético após implantação.</p>\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n  <p>Em cloud, um fluxo de aplicação pode ser afetado por Security Group, NSG, NACL, route table, NAT Gateway, firewall central, endpoint policy, private endpoint, IAM, load balancer e DNS privado. O sintoma “timeout” não aponta automaticamente para um único componente.</p>\n  <p>Exemplo: uma instância privada precisa acessar uma API externa. A subnet privada tem rota default para NAT Gateway. O Security Group permite saída. Porém, o firewall central não recebe o tráfego porque a rota efetiva aponta diretamente para NAT, contornando a inspeção exigida pela Landing Zone. A conexão até funciona, mas viola governança. Em outro cenário, a rota aponta para firewall, mas o retorno sai por NAT direto, gerando assimetria e sessão inválida.</p>\n  <p>Um diagnóstico cloud maduro valida:</p>\n  <ul>\n    <li>regras efetivas aplicadas ao recurso;</li>\n    <li>rotas efetivas da subnet;</li>\n    <li>associação de route table;</li>\n    <li>stateful versus stateless;</li>\n    <li>NAT aplicado e logs de tradução;</li>\n    <li>flow logs e logs do firewall;</li>\n    <li>custos de tráfego, inspeção, NAT e logs;</li>\n    <li>policy as code e drift de configuração.</li>\n  </ul>\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n  <p>Em DevSecOps, firewall, ACL e NAT não devem depender apenas de tickets manuais e memória operacional. Regras críticas precisam ser descritas como código, revisadas por pares, testadas, versionadas e vinculadas a uma necessidade de negócio.</p>\n  <p>Um pipeline maduro para regras de rede pode validar:</p>\n  <ul>\n    <li>se a origem e o destino usam grupos ou tags em vez de IPs soltos;</li>\n    <li>se a regra possui dono, justificativa e expiração;</li>\n    <li>se não há <code>0.0.0.0/0</code> indevido;</li>\n    <li>se portas administrativas não ficam públicas;</li>\n    <li>se o caminho obrigatório por firewall central não foi contornado;</li>\n    <li>se NAT e rotas são coerentes com a matriz de fluxos;</li>\n    <li>se há logs habilitados para investigação;</li>\n    <li>se uma exceção temporária tem rollback automatizado.</li>\n  </ul>\n  <div class=\"callout callout--success\"><strong>Boa prática:</strong> transformar incidentes recorrentes em testes automatizados. Se uma aplicação depende de TCP/443 entre A e B, o pipeline e o monitoramento devem validar regra, rota, DNS, health check e logs antes que o usuário descubra a falha.</div>\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n  <p>Do ponto de vista de segurança, firewall e NAT não devem ser tratados apenas como mecanismos de conectividade. Eles são fontes de controle, contenção, detecção e investigação. Uma regra excessiva pode permitir movimento lateral. Um NAT sem log pode dificultar atribuição. Um egress amplo pode facilitar exfiltração. Um deny silencioso pode atrasar resposta a incidente.</p>\n  <p>Durante um incidente, o SOC identifica tráfego suspeito de um servidor interno para um endereço externo em TCP/443. O firewall mostra allow por uma regra genérica de saída para internet. O NAT mostra que vários servidores usam o mesmo IP público. Sem logs de tradução com porta e horário, fica difícil atribuir qual host originou cada conexão. A mitigação correta envolve restringir egress por destino ou proxy, habilitar logs, criar regra específica e preservar evidências antes de remover a regra antiga.</p>\n  <p>Más práticas comuns:</p>\n  <ul>\n    <li>permitir saída irrestrita para internet;</li>\n    <li>usar regras <code>any-any</code> permanentes;</li>\n    <li>desabilitar firewall durante troubleshooting;</li>\n    <li>não registrar NAT de saída;</li>\n    <li>não revisar exceções temporárias;</li>\n    <li>usar IPs compartilhados sem atribuição;</li>\n    <li>permitir portas administrativas a partir da internet;</li>\n    <li>não enviar logs ao SIEM.</li>\n  </ul>\n</section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n  <p>O diagrama mostra como um fluxo passa por várias decisões: origem, regra local, rota, firewall, NAT, cloud policy, destino, retorno e evidências. Em troubleshooting, cada seta precisa ser validada com log, contador, tabela de sessão ou captura.</p>\n  <div class=\"diagram-wrapper\">\n    <svg class=\"svg-diagram svg-diagram--firewall-nat\" viewBox=\"0 0 1120 620\" role=\"img\" aria-labelledby=\"fw-nat-title fw-nat-desc\">\n      <title id=\"fw-nat-title\">Troubleshooting de firewall, ACL, NAT e políticas</title>\n      <desc id=\"fw-nat-desc\">Fluxo com origem, ACL local, firewall stateful, NAT, cloud policies, destino, retorno, logs e RCA.</desc>\n      <defs>\n        <marker id=\"arrow-fw-nat\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow\" /></marker>\n      </defs>\n\n      <rect x=\"35\" y=\"55\" width=\"145\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--client\" />\n      <text x=\"107\" y=\"88\" text-anchor=\"middle\" class=\"svg-title\">Origem</text>\n      <text x=\"107\" y=\"114\" text-anchor=\"middle\" class=\"svg-caption\">IP · porta efêmera</text>\n\n      <rect x=\"230\" y=\"55\" width=\"145\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--policy\" />\n      <text x=\"302\" y=\"88\" text-anchor=\"middle\" class=\"svg-title\">ACL local</text>\n      <text x=\"302\" y=\"114\" text-anchor=\"middle\" class=\"svg-caption\">ordem · deny</text>\n\n      <rect x=\"425\" y=\"55\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--firewall\" />\n      <text x=\"505\" y=\"88\" text-anchor=\"middle\" class=\"svg-title\">Firewall</text>\n      <text x=\"505\" y=\"114\" text-anchor=\"middle\" class=\"svg-caption\">state · sessão</text>\n\n      <rect x=\"635\" y=\"55\" width=\"145\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--nat\" />\n      <text x=\"707\" y=\"88\" text-anchor=\"middle\" class=\"svg-title\">NAT</text>\n      <text x=\"707\" y=\"114\" text-anchor=\"middle\" class=\"svg-caption\">SNAT · DNAT</text>\n\n      <rect x=\"830\" y=\"55\" width=\"145\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--cloud\" />\n      <text x=\"902\" y=\"88\" text-anchor=\"middle\" class=\"svg-title\">SG/NSG</text>\n      <text x=\"902\" y=\"114\" text-anchor=\"middle\" class=\"svg-caption\">efetivas</text>\n\n      <rect x=\"830\" y=\"235\" width=\"145\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--server\" />\n      <text x=\"902\" y=\"268\" text-anchor=\"middle\" class=\"svg-title\">Destino</text>\n      <text x=\"902\" y=\"294\" text-anchor=\"middle\" class=\"svg-caption\">serviço · porta</text>\n\n      <rect x=\"635\" y=\"235\" width=\"145\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--route\" />\n      <text x=\"707\" y=\"268\" text-anchor=\"middle\" class=\"svg-title\">Retorno</text>\n      <text x=\"707\" y=\"294\" text-anchor=\"middle\" class=\"svg-caption\">rota · estado</text>\n\n      <rect x=\"425\" y=\"235\" width=\"160\" height=\"82\" rx=\"14\" class=\"svg-node svg-node--inspection\" />\n      <text x=\"505\" y=\"268\" text-anchor=\"middle\" class=\"svg-title\">Inspeção</text>\n      <text x=\"505\" y=\"294\" text-anchor=\"middle\" class=\"svg-caption\">proxy · IPS · WAF</text>\n\n      <rect x=\"55\" y=\"420\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"150\" y=\"454\" text-anchor=\"middle\" class=\"svg-title\">Flow logs</text>\n      <text x=\"150\" y=\"482\" text-anchor=\"middle\" class=\"svg-caption\">accept · reject</text>\n\n      <rect x=\"310\" y=\"420\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"405\" y=\"454\" text-anchor=\"middle\" class=\"svg-title\">Session table</text>\n      <text x=\"405\" y=\"482\" text-anchor=\"middle\" class=\"svg-caption\">estado · timeout</text>\n\n      <rect x=\"565\" y=\"420\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--evidence\" />\n      <text x=\"660\" y=\"454\" text-anchor=\"middle\" class=\"svg-title\">NAT logs</text>\n      <text x=\"660\" y=\"482\" text-anchor=\"middle\" class=\"svg-caption\">antes · depois</text>\n\n      <rect x=\"820\" y=\"420\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--siem\" />\n      <text x=\"915\" y=\"454\" text-anchor=\"middle\" class=\"svg-title\">SIEM/RCA</text>\n      <text x=\"915\" y=\"482\" text-anchor=\"middle\" class=\"svg-caption\">causa · prevenção</text>\n\n      <line x1=\"180\" y1=\"96\" x2=\"230\" y2=\"96\" class=\"svg-link\" marker-end=\"url(#arrow-fw-nat)\" />\n      <line x1=\"375\" y1=\"96\" x2=\"425\" y2=\"96\" class=\"svg-link\" marker-end=\"url(#arrow-fw-nat)\" />\n      <line x1=\"585\" y1=\"96\" x2=\"635\" y2=\"96\" class=\"svg-link\" marker-end=\"url(#arrow-fw-nat)\" />\n      <line x1=\"780\" y1=\"96\" x2=\"830\" y2=\"96\" class=\"svg-link\" marker-end=\"url(#arrow-fw-nat)\" />\n      <line x1=\"902\" y1=\"137\" x2=\"902\" y2=\"235\" class=\"svg-link\" marker-end=\"url(#arrow-fw-nat)\" />\n      <path d=\"M830 276 C790 276, 780 276, 780 276\" class=\"svg-link\" marker-end=\"url(#arrow-fw-nat)\" />\n      <line x1=\"635\" y1=\"276\" x2=\"585\" y2=\"276\" class=\"svg-link\" marker-end=\"url(#arrow-fw-nat)\" />\n      <path d=\"M505 317 C505 360, 405 360, 405 420\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-fw-nat)\" />\n      <path d=\"M707 137 C707 350, 660 350, 660 420\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-fw-nat)\" />\n      <path d=\"M902 137 C1030 210, 1010 340, 915 420\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-fw-nat)\" />\n      <path d=\"M302 137 C260 260, 170 320, 150 420\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow-fw-nat)\" />\n      <text x=\"560\" y=\"575\" text-anchor=\"middle\" class=\"svg-caption\">Cada decisão precisa ser validada: regra, prioridade, estado, NAT, retorno, logs e política.</text>\n    </svg>\n  </div>\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n  <p>O laboratório desta aula é um diagnóstico completo de política e tradução. Você vai investigar um fluxo que falha em ambiente híbrido, envolvendo firewall stateful, ACL stateless, NAT de saída, publicação DNAT, security group, flow logs e rota de retorno.</p>\n  <p>O objetivo é produzir um dossiê com matriz de fluxo, regra efetiva, logs, tradução, causa provável, correção mínima, rollback e prevenção.</p>\n</section>\n<section class=\"lesson-section lesson-section--laboratório-extra\">\n  <h3>Lab revisado P1: diagnóstico completo com sintomas intencionais</h3>\n  <p>Este laboratório foi reescrito para funcionar como um caso de troubleshooting profissional. O objetivo não é “rodar comandos por rodar”, mas produzir um dossiê de investigação com sintoma, escopo, hipóteses, evidências, decisão, mitigação, validação, RCA e melhoria preventiva.</p>\n  <p><strong>Caso usado:</strong> Regra permite a ida, mas NAT e retorno quebram a sessão. <strong>Causa provável a ser comprovada ou descartada:</strong> Ordem de regras, SNAT/DNAT incompleto, regra sem retorno, objeto errado ou assimetria entre firewalls.</p>\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n  <p>Os exercícios reforçam ordem de regra, stateful versus stateless, retorno, NAT, logs, exceções temporárias, egress control e interpretação de sintomas como timeout, RST, deny e ausência de log.</p>\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n  <p>O desafio apresenta uma aplicação híbrida que falha para usuários de VPN, funciona parcialmente a partir da rede interna e gera custo anômalo de NAT em cloud. Você deverá diagnosticar política, NAT, rota efetiva e governança.</p>\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n  <p>A solução comentada demonstra como separar problema de regra, problema de NAT, rota assimétrica, ausência de log, exceção indevida e configuração correta no componente errado.</p>\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n  <p>Nesta aula, você aprendeu a diagnosticar firewalls, ACLs, NAT e políticas como cadeia de decisão, não como uma única caixa preta.</p>\n  <ul>\n    <li>“Porta liberada” precisa ser comprovada por origem, destino, protocolo, direção, regra e log;</li>\n    <li>firewall stateful depende de tabela de sessão e caminho de retorno coerente;</li>\n    <li>controles stateless exigem regras explícitas para ida e volta;</li>\n    <li>NAT exige tabela de tradução, logs e cuidado com portas efêmeras;</li>\n    <li>ordem e prioridade de regra podem invalidar uma regra aparentemente correta;</li>\n    <li>rotas e políticas precisam ser analisadas juntas;</li>\n    <li>exceções devem ter escopo, dono, justificativa, expiração e rollback;</li>\n    <li>troubleshooting seguro preserva evidências e não troca segurança por pressa.</li>\n  </ul>\n</section>\n<section class=\"lesson-section lesson-section--resumo-p1\"><h3>Resumo operacional do caso P1</h3><p>O caso “Regra permite a ida, mas NAT e retorno quebram a sessão” deve ser encerrado somente quando houver evidência suficiente para explicar o sintoma, validação pós-mitigação, decisão registrada e RCA com ações preventivas. A causa provável trabalhada foi: Ordem de regras, SNAT/DNAT incompleto, regra sem retorno, objeto errado ou assimetria entre firewalls..</p></section>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n  <p>Na próxima aula, <strong>15.8 — Troubleshooting HTTP, HTTPS, TLS e proxies</strong>, você vai subir para a camada de aplicação e aprender a diagnosticar certificados, handshake TLS, SNI, proxy, WAF, status codes, headers, redirects e erros HTTP.</p>\n</section>"
  },
  "networkContext": {
    "osiLayers": [
      "Camada 3",
      "Camada 4",
      "Camada 7"
    ],
    "tcpIpLayers": [
      "Internet",
      "Transporte",
      "Aplicação"
    ],
    "relatedProtocols": [
      "IPv4",
      "TCP",
      "UDP",
      "ICMP",
      "DNS",
      "HTTP",
      "TLS",
      "IPsec",
      "BGP"
    ],
    "relatedConcepts": [
      "Firewall",
      "ACL",
      "NAT",
      "SNAT",
      "DNAT",
      "NAPT",
      "Stateful",
      "Stateless",
      "Security Group",
      "NSG",
      "NACL",
      "Cloud Firewall",
      "Session table",
      "Hit count",
      "Implicit deny",
      "Rule priority",
      "Egress control",
      "Rota de retorno",
      "Assimetria",
      "Flow logs"
    ],
    "ports": [
      "TCP/22",
      "TCP/80",
      "TCP/443",
      "UDP/TCP 53",
      "UDP/500",
      "UDP/4500",
      "TCP/3389",
      "TCP/5432",
      "TCP/1521",
      "TCP/3306"
    ]
  },
  "lab": {
    "id": "lab-15.7",
    "title": "Caso guiado: Regra permite a ida, mas NAT e retorno quebram a sessão",
    "labType": "troubleshooting",
    "objective": "Investigar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” produzindo problem statement, escopo, matriz hipótese-evidência, comandos/logs/capturas, decisão, mitigação, validação e RCA.",
    "scenario": "O firewall mostra allow na ida, mas o cliente recebe timeout e o servidor registra origem inesperada. Impacto: A operação quer duplicar regras, criando exceções permanentes e difíceis de auditar. A causa provável não deve ser assumida; deve ser comprovada ou descartada com evidências.",
    "topology": "Cliente → firewall de borda → DNAT/SNAT → firewall interno → servidor → retorno stateful",
    "architecture": "Arquitetura investigada: Cliente → firewall de borda → DNAT/SNAT → firewall interno → servidor → retorno stateful. O aluno deve marcar pontos de observação, pontos de decisão, fontes de log e possíveis locais de mudança.",
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
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": "180-240 min",
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
        "title": "Definir matriz de fluxo",
        "instruction": "Documente origem, destino antes/depois do NAT, protocolo, porta e zona.",
        "command": "Criar arquivo de dossiê: incidente-15.x.md com seções Sintoma, Escopo, Hipóteses, Evidências, Decisão, Mitigação, Validação e RCA.",
        "expectedOutput": "Matriz com IP real e traduzido.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 2,
        "title": "Executar policy lookup",
        "instruction": "Teste a tupla no firewall sem alterar regra.",
        "command": "Executar policy lookup/packet tracer com origem, destino, protocolo e porta reais; consultar logs pelo session id",
        "expectedOutput": "Regra efetiva e prioridade.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 3,
        "title": "Rastrear NAT",
        "instruction": "Identifique SNAT, DNAT, PAT e exceções aplicadas.",
        "command": "conntrack -L 2>/dev/null | grep <ip> ; sudo tcpdump -ni any host <cliente> and port <porta>",
        "expectedOutput": "Mapa de tradução.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 4,
        "title": "Verificar sessão",
        "instruction": "Confirme estado, bytes ida/volta e timeout da sessão.",
        "command": "Test-NetConnection <fqdn> -Port <porta>; tracert <fqdn>",
        "expectedOutput": "Sessão stateful analisada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 5,
        "title": "Validar retorno",
        "instruction": "Confira rota do servidor e firewall de volta.",
        "command": "Test-NetConnection <fqdn> -Port <porta>; tracert <fqdn>",
        "expectedOutput": "Caminho simétrico ou assimetria comprovada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 6,
        "title": "Analisar logs",
        "instruction": "Filtre por rule id, NAT id, session id e ação.",
        "command": "Test-NetConnection <fqdn> -Port <porta>; tracert <fqdn>",
        "expectedOutput": "Evidência auditável.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 7,
        "title": "Corrigir de forma mínima",
        "instruction": "Ajuste objeto/regra/NAT com validade e rollback.",
        "command": "Test-NetConnection <fqdn> -Port <porta>; tracert <fqdn>",
        "expectedOutput": "Mudança pequena e rastreável.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      },
      {
        "number": 8,
        "title": "Revisar governança",
        "instruction": "Documente dono, justificativa, expiração e monitoramento da exceção.",
        "command": "Test-NetConnection <fqdn> -Port <porta>; tracert <fqdn>",
        "expectedOutput": "Regra governada.",
        "explanation": "Este passo obriga o aluno a transformar o caso “Regra permite a ida, mas NAT e retorno quebram a sessão” em uma evidência verificável antes de propor correção. A decisão só deve avançar quando a evidência confirmar ou negar uma hipótese."
      }
    ],
    "expectedResult": "Dossiê completo do caso “Regra permite a ida, mas NAT e retorno quebram a sessão” com hipótese priorizada, evidências, decisão, mitigação segura, validação pós-correção e RCA.",
    "validation": [
      {
        "check": "Regra efetiva correta",
        "command": "policy lookup",
        "expected": "Allow na regra esperada, com zonas corretas.",
        "ifFails": "Corrigir prioridade/objeto."
      },
      {
        "check": "NAT esperado",
        "command": "logs de sessão/NAT",
        "expected": "Origem/destino traduzidos conforme desenho.",
        "ifFails": "Corrigir SNAT/DNAT/PAT."
      },
      {
        "check": "Bytes nos dois sentidos",
        "command": "session table",
        "expected": "Contadores de ida e volta crescem.",
        "ifFails": "Investigar retorno/servidor."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Log mostra allow, mas não funciona",
        "probableCause": "Allow só prova decisão de ida",
        "howToConfirm": "Ver bytes de retorno e sessão",
        "fix": "Validar stateful e rota de volta."
      },
      {
        "symptom": "Servidor vê IP inesperado",
        "probableCause": "SNAT aplicado sem documentação",
        "howToConfirm": "Logs NAT e captura no servidor",
        "fix": "Documentar ou corrigir política NAT."
      },
      {
        "symptom": "Regra nova não pega",
        "probableCause": "Regra anterior mais ampla/específica ganha",
        "howToConfirm": "Policy lookup com rule id",
        "fix": "Reordenar com controle e revisão."
      }
    ],
    "improvements": [
      "Transformar o dossiê em runbook reutilizável.",
      "Adicionar monitoramento ou alerta que teria detectado o problema antes.",
      "Criar teste sintético pós-mudança para evitar recorrência.",
      "Revisar processo de mudança, rollback e evidências obrigatórias."
    ],
    "evidenceToCollect": [
      "matriz 5-tuple",
      "policy lookup",
      "rule id",
      "NAT aplicado",
      "session table",
      "logs allow/deny",
      "captura no servidor",
      "plano de expiração"
    ],
    "questions": [
      "Qual evidência mais reduziu incerteza?",
      "Qual hipótese foi descartada e por quê?",
      "Que mitigação seria perigosa apesar de parecer rápida?",
      "Como o incidente poderia ter sido detectado antes?",
      "Que ação preventiva tem maior impacto?"
    ],
    "challenge": "Crie um checklist de revisão para publicar serviço sem deixar regra órfã, NAT invisível ou exceção permanente.",
    "solution": "A investigação correta trata firewall como ponto de decisão stateful com NAT e retorno. A regra efetiva, a tradução e os bytes de ida/volta são mais importantes do que a existência visual de uma regra allow.",
    "deliverables": [
      "Matriz de fluxos",
      "Mapa de controles",
      "Tabela de regras efetivas",
      "Evidências de logs",
      "Tabela NAT antes/depois",
      "Plano de correção",
      "Plano de rollback",
      "RCA"
    ]
  },
  "exercises": [
    {
      "id": "ex15.7.p1.1",
      "type": "diagnóstico",
      "prompt": "No caso “Regra permite a ida, mas NAT e retorno quebram a sessão”, escreva um problem statement com população afetada, janela, serviço, sintoma e impacto.",
      "expectedAnswer": "Uma resposta adequada menciona o serviço afetado, quem é afetado e não afetado, quando começou, qual sintoma mensurável aparece e qual impacto operacional existe, sem declarar causa antes das evidências.",
      "explanation": "Problem statement bom reduz ambiguidade e evita que a equipe investigue causas diferentes ao mesmo tempo."
    },
    {
      "id": "ex15.7.p1.2",
      "type": "evidência",
      "prompt": "Escolha duas hipóteses da matriz e indique uma evidência que confirmaria e uma evidência que negaria cada uma.",
      "expectedAnswer": "A resposta deve ligar hipótese a comando, log, métrica, captura ou configuração verificável; opinião ou “acho que” não conta como evidência.",
      "explanation": "Troubleshooting profissional troca intuição por evidência rastreável."
    },
    {
      "id": "ex15.7.p1.3",
      "type": "RCA",
      "prompt": "Proponha uma causa raiz provável, dois fatores contribuintes e duas ações preventivas com dono e critério de aceite.",
      "expectedAnswer": "A causa raiz deve ser sustentada por evidências; fatores contribuintes podem incluir monitoramento ausente, mudança sem teste, documentação incompleta ou controle fraco; ações precisam ter dono e validação.",
      "explanation": "RCA não é caça a culpados; é melhoria de sistema operacional."
    }
  ],
  "quiz": [
    {
      "id": "q15.7.p1.1",
      "type": "diagnóstico",
      "q": "No caso “Regra permite a ida, mas NAT e retorno quebram a sessão”, qual atitude é mais profissional antes de alterar configuração?",
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
      "id": "q15.7.p1.2",
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
      "id": "q15.7.p1.3",
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
      "id": "q15.7.p1.4",
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
      "question": "Qual pergunta é mais profissional do que 'a porta está liberada?'",
      "options": [
        "Qual origem, destino, protocolo, porta, direção, regra efetiva, estado, NAT, retorno e log comprovam o fluxo?",
        "O firewall está ligado?",
        "O ping funciona?",
        "A aplicação foi reiniciada?"
      ],
      "correctAnswer": 0,
      "explanation": "Troubleshooting de política precisa reconstruir o fluxo completo e suas evidências."
    },
    {
      "question": "Qual diferença central entre controle stateful e stateless?",
      "options": [
        "Stateful mantém estado de conexão; stateless exige regras explícitas conforme direção e porta.",
        "Stateless é sempre mais seguro.",
        "Stateful nunca usa regras.",
        "Stateless só existe em Wi-Fi."
      ],
      "correctAnswer": 0,
      "explanation": "Controles stateful acompanham sessões, enquanto stateless avaliam pacotes sem memória de conexão."
    }
  ],
  "flashcards": [
    {
      "id": "fc15.7.p1.1",
      "front": "O que é problem statement investigável?",
      "back": "É uma descrição objetiva do incidente com serviço, população afetada, janela, sintoma e impacto, sem declarar causa não comprovada.",
      "tags": [
        "troubleshooting",
        "método"
      ],
      "difficulty": "iniciante"
    },
    {
      "id": "fc15.7.p1.2",
      "front": "O que é matriz hipótese-evidência?",
      "back": "Tabela que liga cada hipótese à evidência necessária para confirmá-la ou descartá-la.",
      "tags": [
        "evidência",
        "diagnóstico"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.7.p1.3",
      "front": "Por que comparar afetado e não afetado?",
      "back": "Porque o contraste reduz o espaço de hipóteses e mostra onde o problema provavelmente está.",
      "tags": [
        "escopo",
        "incidente"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.7.p1.4",
      "front": "O que é mitigação segura?",
      "back": "Ação temporária, limitada, aprovada, monitorada e com rollback para reduzir impacto sem criar risco permanente.",
      "tags": [
        "segurança",
        "operação"
      ],
      "difficulty": "intermediário"
    },
    {
      "id": "fc15.7.p1.5",
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
      "question": "Qual parte do caso “Regra permite a ida, mas NAT e retorno quebram a sessão” é sintoma e qual parte ainda é apenas hipótese?",
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
    "title": "Desafio P1 — Regra permite a ida, mas NAT e retorno quebram a sessão",
    "scenario": "O firewall mostra allow na ida, mas o cliente recebe timeout e o servidor registra origem inesperada.",
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
    "reasoning": "A investigação correta trata firewall como ponto de decisão stateful com NAT e retorno. A regra efetiva, a tradução e os bytes de ida/volta são mais importantes do que a existência visual de uma regra allow.",
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
    "finalAnswer": "A resposta correta para “Regra permite a ida, mas NAT e retorno quebram a sessão” é um dossiê que prova ou descarta hipóteses com evidências, aplica mitigação mínima e documenta RCA com prevenção."
  },
  "glossary": [
    {
      "term": "Firewall",
      "shortDefinition": "Controle de tráfego entre zonas ou hosts.",
      "longDefinition": "Dispositivo, serviço ou software que permite, nega ou inspeciona tráfego com base em política de segurança.",
      "example": "Firewall permite TCP/443 da subnet web para a API e nega demais destinos.",
      "relatedTerms": [
        "ACL",
        "Stateful",
        "Policy"
      ],
      "relatedLessons": [
        "13.3",
        "14.5",
        "15.7"
      ]
    },
    {
      "term": "ACL",
      "shortDefinition": "Lista de controle de acesso.",
      "longDefinition": "Conjunto ordenado ou priorizado de regras que permitem ou negam tráfego conforme atributos como origem, destino, protocolo e porta.",
      "example": "ACL nega tráfego de convidados para rede administrativa.",
      "relatedTerms": [
        "NACL",
        "Implicit deny"
      ],
      "relatedLessons": [
        "15.7"
      ]
    },
    {
      "term": "NAT",
      "shortDefinition": "Tradução de endereço de rede.",
      "longDefinition": "Mecanismo que altera endereços IP e, em muitos casos, portas, para permitir saída, publicação ou integração entre domínios de endereçamento.",
      "example": "Servidor interno 10.0.1.10 sai para internet como 203.0.113.10:50444.",
      "relatedTerms": [
        "SNAT",
        "DNAT",
        "Porta efêmera"
      ],
      "relatedLessons": [
        "10.4",
        "14.4",
        "15.7"
      ]
    },
    {
      "term": "Session table",
      "shortDefinition": "Tabela de sessões de um firewall stateful.",
      "longDefinition": "Registro mantido por firewalls stateful para acompanhar conexões autorizadas, estado, timeout e informações de retorno.",
      "example": "Firewall mostra sessão TCP estabelecida entre cliente e servidor em TCP/443.",
      "relatedTerms": [
        "Stateful",
        "Timeout"
      ],
      "relatedLessons": [
        "15.6",
        "15.7"
      ]
    },
    {
      "term": "Implicit deny",
      "shortDefinition": "Negação padrão ao fim da política.",
      "longDefinition": "Comportamento em que tráfego não permitido explicitamente é negado automaticamente.",
      "example": "Nenhuma regra permite TCP/3389, então o acesso é negado por padrão.",
      "relatedTerms": [
        "Least privilege",
        "Firewall"
      ],
      "relatedLessons": [
        "13.2",
        "15.7"
      ]
    },
    {
      "term": "Egress control",
      "shortDefinition": "Controle de tráfego de saída.",
      "longDefinition": "Prática de restringir, registrar e governar conexões iniciadas por workloads internos para destinos externos ou outras zonas.",
      "example": "Servidores só podem acessar repositórios aprovados por proxy e firewall.",
      "relatedTerms": [
        "Exfiltração",
        "NAT",
        "Proxy"
      ],
      "relatedLessons": [
        "13.7",
        "14.4",
        "15.7"
      ]
    },
    {
      "term": "Problem statement",
      "shortDefinition": "Descrição objetiva e verificável de um incidente.",
      "longDefinition": "Declaração que delimita serviço, população afetada, janela, sintoma e impacto sem assumir causa não comprovada.",
      "example": "No caso “Regra permite a ida, mas NAT e retorno quebram a sessão”, o problem statement deve evitar frases como “o firewall quebrou” antes dos logs.",
      "relatedTerms": [
        "escopo",
        "hipótese",
        "RCA"
      ],
      "relatedLessons": [
        "15.1",
        "15.7"
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
        "15.7"
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
      "type": "standard",
      "title": "NIST SP 800-41 Rev. 1 — Guidelines on Firewalls and Firewall Policy",
      "organization": "NIST",
      "url": "https://csrc.nist.gov/pubs/sp/800/41/r1/final",
      "note": "Referência para conceitos, política, implantação e gestão de firewalls."
    },
    {
      "type": "standard",
      "title": "RFC 3022 — Traditional IP Network Address Translator (Traditional NAT)",
      "organization": "IETF / RFC Editor",
      "url": "https://www.rfc-editor.org/rfc/rfc3022.html",
      "note": "Define conceitos tradicionais de NAT e NAPT."
    },
    {
      "type": "vendor-doc",
      "title": "AWS VPC — Security groups",
      "organization": "Amazon Web Services",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html",
      "note": "Documentação de security groups como controle de tráfego para recursos AWS."
    },
    {
      "type": "vendor-doc",
      "title": "AWS VPC — Network ACLs",
      "organization": "Amazon Web Services",
      "url": "https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html",
      "note": "Documentação de NACLs e diferença stateful/stateless com security groups."
    },
    {
      "type": "vendor-doc",
      "title": "Azure Network security groups overview",
      "organization": "Microsoft",
      "url": "https://learn.microsoft.com/en-us/azure/virtual-network/network-security-groups-overview",
      "note": "Documentação de regras, propriedades, prioridade e comportamento de NSGs."
    },
    {
      "type": "course-link",
      "title": "Redes e Network 15.6 — Troubleshooting TCP, UDP, portas e serviços",
      "organization": "Universidade técnica interna",
      "url": "internal://redes/m15/lesson-15-06",
      "note": "Base imediata para análise de políticas que afetam portas e serviços."
    }
  ],
  "security": {
    "goodPractices": [
      "Preservar logs, capturas e linha do tempo antes de mudanças destrutivas.",
      "Aplicar mitigação emergencial com menor privilégio, expiração, monitoramento e rollback.",
      "Registrar quem executou cada teste, quando, em qual origem e com qual resultado.",
      "Documentar premissas, dependências e limites do tema \"Troubleshooting firewall, ACL, NAT e políticas\".",
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
        "description": "No caso “Regra permite a ida, mas NAT e retorno quebram a sessão”, uma liberação ampla pode resolver o sintoma e criar exposição lateral duradoura.",
        "defensiveExplanation": "Toda exceção deve ter escopo, dono, justificativa, expiração, monitoramento e revisão.",
        "mitigation": "Usar regra mínima, temporária, auditada e substituída por correção definitiva."
      },
      {
              "name": "Risco de troubleshooting sem evidência — Troubleshooting firewall, ACL, NAT e políticas",
              "description": "Em Troubleshooting firewall, ACL, NAT e políticas, o risco principal é aplicar correções rápidas sem preservar estado, confundindo sintoma com causa raiz e apagando evidências necessárias para incident response, auditoria, RCA ou rollback.",
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 15.7."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O firewall mostra allow na ida, mas o cliente recebe timeout e o servidor registra origem inesperada.",
      "Impacto: A operação quer duplicar regras, criando exceções permanentes e difíceis de auditar.",
      "Causa provável a validar: Ordem de regras, SNAT/DNAT incompleto, regra sem retorno, objeto errado ou assimetria entre firewalls.",
      "Falha ou comportamento inesperado relacionado a Troubleshooting firewall, ACL, NAT e políticas.",
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
      "Qual evidência comprova o entendimento da aula 15.7?"
    ],
    "commands": [
      {
        "platform": "Firewall",
        "command": "Executar policy lookup/packet tracer com origem, destino, protocolo e porta reais; consultar logs pelo session id",
        "purpose": "Ver regra efetiva, NAT e decisão stateful.",
        "expectedObservation": "Rule ID, NAT aplicado, ação e zona de saída.",
        "interpretation": "A regra “existir” não significa que ela é a regra efetiva."
      },
      {
        "platform": "Linux",
        "command": "conntrack -L 2>/dev/null | grep <ip> ; sudo tcpdump -ni any host <cliente> and port <porta>",
        "purpose": "Observar estado e pacotes no host/lab.",
        "expectedObservation": "Fluxo traduzido e respostas.",
        "interpretation": "Ajuda a provar se pacote chega ao servidor e como retorna."
      },
      {
        "platform": "Windows",
        "command": "Test-NetConnection <fqdn> -Port <porta>; tracert <fqdn>",
        "purpose": "Gerar teste reprodutível do cliente.",
        "expectedObservation": "Falha/sucesso TCP e caminho aproximado.",
        "interpretation": "O teste deve ser correlacionado com logs pelo mesmo horário."
      }
    ],
    "decisionTree": [
      {
        "if": "A hipótese “Regra errada/prioridade” está com prioridade Alta e a evidência necessária é “policy lookup/log rule id”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “NAT incompleto” está com prioridade Alta e a evidência necessária é “NAT table/session log”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Retorno assimétrico” está com prioridade Alta e a evidência necessária é “session table/route”",
        "then": "Coletar a evidência indicada, registrar resultado, comparar com afetados/não afetados e só então decidir mitigação ou descarte da hipótese."
      },
      {
        "if": "A hipótese “Objeto desatualizado” está com prioridade Média e a evidência necessária é “config diff”",
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
      "15.8"
    ]
  },
  "diagnosticCase": {
    "title": "Regra permite a ida, mas NAT e retorno quebram a sessão",
    "symptom": "O firewall mostra allow na ida, mas o cliente recebe timeout e o servidor registra origem inesperada.",
    "businessImpact": "A operação quer duplicar regras, criando exceções permanentes e difíceis de auditar.",
    "likelyRootCause": "Ordem de regras, SNAT/DNAT incompleto, regra sem retorno, objeto errado ou assimetria entre firewalls.",
    "timeline": [
      "14:00: publicação de serviço",
      "14:10: DNAT criado",
      "14:20: SNAT não documentado",
      "14:30: timeout externo"
    ],
    "expectedFlow": "Cliente → firewall de borda → DNAT/SNAT → firewall interno → servidor → retorno stateful",
    "hypothesisMatrix": [
      {
        "hypothesis": "Regra errada/prioridade",
        "why": "Allow esperado não é regra efetiva",
        "evidence": "policy lookup/log rule id",
        "priority": "Alta"
      },
      {
        "hypothesis": "NAT incompleto",
        "why": "Destino ou origem traduzido de forma inesperada",
        "evidence": "NAT table/session log",
        "priority": "Alta"
      },
      {
        "hypothesis": "Retorno assimétrico",
        "why": "Resposta não volta pelo mesmo firewall",
        "evidence": "session table/route",
        "priority": "Alta"
      },
      {
        "hypothesis": "Objeto desatualizado",
        "why": "IP do grupo não contém novo servidor",
        "evidence": "config diff",
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
