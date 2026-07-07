export const lesson1708 = {
  "id": "17.8",
  "moduleId": "m17",
  "order": 8,
  "title": "Estudo de caso II: rede corporativa híbrida",
  "subtitle": "Caso corporativo integrado para investigar falhas em matriz, filial, usuários remotos e cloud usando DNS híbrido, VPN, BGP, firewalls, rotas, flow logs, SIEM e RCA.",
  "duration": "240-360 min",
  "estimatedStudyTimeMinutes": 360,
  "difficulty": "avançado",
  "type": "estudo-de-caso",
  "xp": 380,
  "tags": [
    "estudo de caso",
    "rede híbrida",
    "VPN",
    "BGP",
    "DNS privado",
    "hub-spoke",
    "firewall",
    "flow logs",
    "SIEM",
    "RCA",
    "cloud networking",
    "troubleshooting",
    "avaliação por competência",
    "rubrica",
    "feedback",
    "plano de revisão"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m17",
      "lesson": "17.7",
      "reason": "O primeiro estudo de caso treinou war room, evidências e RCA em aplicação web publicada."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m14",
      "reason": "Cloud Networking fornece base para VPC/VNet, VPN, BGP, Private Link, route tables e hub-spoke."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m15",
      "reason": "Troubleshooting profissional é necessário para linha do tempo, hipótese-evidência, PCAP, logs e RCA."
    },
    {
      "type": "module",
      "course": "Redes e Network",
      "module": "m16",
      "reason": "Segurança defensiva orienta segmentação, egress control, telemetria, resposta proporcional e preservação de evidências."
    }
  ],
  "objectives": [
    "Investigar uma falha em rede híbrida envolvendo matriz, filial, usuários remotos e cloud.",
    "Construir o caminho efetivo entre origem, DNS, rotas, firewall, VPN/BGP, hub, spoke e aplicação.",
    "Diferenciar falhas de DNS, rota, política, retorno, túnel, BGP, NAT e aplicação.",
    "Correlacionar flow logs, firewall logs, DNS logs, cloud audit, BGP, VPN e tickets de usuário.",
    "Definir mitigação segura, rollback, comunicação e RCA para rede híbrida.",
    "Transformar o estudo de caso em peça de portfólio técnico profissional."
  ],
  "learningOutcomes": [
    "Desenhar uma rede híbrida com matriz, filial, VPN, link dedicado, hub cloud, spokes e endpoints privados.",
    "Interpretar sintomas diferentes como manifestações de um mesmo problema de caminho efetivo.",
    "Montar uma matriz hipótese-evidência para DNS, BGP, firewall, rotas, retorno e políticas.",
    "Propor correções sem liberar tráfego amplo nem remover inspeção centralizada.",
    "Escrever um RCA com causa técnica, causa sistêmica, impacto, mitigação e prevenção.",
    "Documentar um estudo de caso híbrido para revisão e portfólio."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Este estudo de caso coloca você diante de uma situação muito comum em empresas modernas: a rede não é mais apenas “o switch e o roteador”. Ela envolve matriz, filial, usuários remotos, VPN, link dedicado, BGP, cloud hub-spoke, DNS privado, firewalls, proxies, identidades, aplicações, Kubernetes, serviços gerenciados, logs e times diferentes tentando resolver o mesmo incidente.</p>\n  <p>O objetivo não é decorar comandos. O objetivo é raciocinar como profissional: desenhar o caminho esperado, identificar onde o comportamento observado diverge, correlacionar evidências e propor uma correção que preserve segurança, disponibilidade e governança.</p>\n  <div class=\"callout callout--info\"><strong>Ideia central:</strong> redes híbridas falham quando conectividade, identidade, DNS, rotas e políticas evoluem em velocidades diferentes. O trabalho do profissional é reconstruir a verdade operacional a partir de evidências.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>Durante muito tempo, a rede corporativa era centrada no datacenter. Filiais acessavam sistemas internos por MPLS ou VPN, usuários ficavam na LAN e a internet era tratada como borda externa. A chegada da cloud mudou esse modelo. Recursos críticos passaram a existir em VPCs, VNets, serviços SaaS, clusters Kubernetes e endpoints privados.</p>\n  <p>Essa evolução trouxe ganho operacional, elasticidade e integração global, mas também criou novos pontos de falha. Um prefixo anunciado incorretamente por BGP pode afetar cloud e datacenter. Uma zona DNS privada mal associada pode quebrar apenas parte dos usuários. Uma rota UDR pode forçar tráfego por firewall sem regra correspondente. Um security group pode permitir ida, mas a rota de retorno pode sair por outro caminho.</p>\n  <p>O estudo de caso desta aula representa essa transição: uma empresa que saiu de uma rede centralizada para uma rede híbrida e agora precisa operar com disciplina de arquitetura, observabilidade e resposta.</p>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>A empresa fictícia Orion Saúde possui matriz, filial, usuários remotos, workloads em cloud e um hub de conectividade. Após uma janela de mudança, equipes relatam sintomas aparentemente desconectados:</p>\n  <ul><li>Usuários da filial acessam o portal interno, mas a API de faturamento falha por timeout.</li><li>Usuários da matriz acessam a API, mas percebem latência alta.</li><li>Usuários remotos conectados à VPN conseguem autenticar, mas não resolvem nomes internos da cloud.</li><li>O SOC observou aumento de denies no firewall hub.</li><li>O time de cloud vê flow logs com tráfego aceito em um sentido e ausente no retorno.</li><li>O time de rede informou alteração recente em anúncios BGP e em rota preferencial.</li></ul>\n  <p>O problema real não pode ser assumido. Pode ser DNS, rota, firewall, NAT, BGP, assimetria, endpoint privado, security group, split tunnel, política de identidade ou uma combinação desses fatores.</p>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>O caso evolui em três blocos. Primeiro, você constrói o mapa da rede híbrida: matriz, filial, VPN, link dedicado, hub cloud, spokes, DNS, firewalls, aplicações e logs. Segundo, você cria uma linha do tempo de mudanças: alteração de BGP, ajuste de UDR, mudança em DNS privado, atualização de regra de firewall e deploy de aplicação. Terceiro, você testa hipóteses por evidência, não por preferência.</p>\n  <p>A aula também mostra a maturidade operacional esperada: validar antes de mudar, executar mitigação mínima, preservar logs, comunicar impacto, documentar exceções e gerar backlog preventivo. Em uma rede híbrida, corrigir “abrindo tudo” costuma produzir uma dívida de segurança que aparece depois como incidente.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p>Uma rede corporativa híbrida é a integração operacional entre redes locais, usuários remotos, ambientes cloud e serviços externos. Ela combina tecnologias diferentes: VLANs, roteamento, VPN, BGP, DNS, firewalls, NAT, proxies, IAM, endpoints privados, observabilidade e automação.</p>\n  <p>O conceito mais importante deste estudo é <strong>caminho efetivo</strong>. O diagrama lógico diz como a rede deveria funcionar. O caminho efetivo mostra por onde o pacote realmente passa, qual nome foi resolvido, qual rota venceu, qual política foi aplicada, qual túnel foi usado, qual firewall inspecionou e qual log comprova cada etapa.</p>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Quando um usuário da filial acessa uma API privada na cloud, várias decisões acontecem em sequência. O cliente consulta DNS. O resolvedor pode encaminhar para DNS interno, cloud resolver ou zona privada. O IP retornado pode apontar para endpoint privado, Load Balancer interno ou serviço em outro spoke. Em seguida, o host decide se o destino está na rede local ou remota, encaminha ao gateway, passa por roteadores, VPN ou link dedicado, firewall hub, route table, security group e backend.</p>\n  <p>Em paralelo, BGP pode anunciar prefixos por caminhos diferentes. Uma rota mais específica pode vencer a rota esperada. Um túnel VPN pode estar ativo, mas sem prefixo correto. Um firewall stateful pode bloquear retorno se o tráfego voltar por outro caminho. Um DNS split-horizon pode retornar IP privado para alguns clientes e público para outros. Por isso, a investigação precisa unir plano de controle, plano de dados e plano de observabilidade.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura do caso possui quatro blocos principais. O primeiro é a rede corporativa tradicional: matriz, filial, VLANs de usuários, servidores de identidade e DNS interno. O segundo é o acesso remoto: VPN de usuários, MFA, postura de dispositivo e split tunnel. O terceiro é a cloud: hub de conectividade, firewall central, spokes de aplicação e dados, endpoints privados, DNS privado, route tables e flow logs. O quarto é a operação: SIEM, NDR, cloud audit, CMDB, pipeline de IaC e processo de mudança.</p>\n  <p>Essa arquitetura é realista porque não existe apenas um responsável. Rede, segurança, cloud, identidade, aplicação e DevSecOps participam da mesma cadeia. A falha pode estar em uma fronteira entre times, e não dentro de uma única tecnologia.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em uma rede híbrida como uma cidade com ruas locais, rodovias, túneis, pedágios, postos de controle, placas e centros de monitoramento. Se uma ambulância não chega ao hospital, não basta dizer “a estrada está ruim”. Talvez o GPS resolveu o endereço errado, talvez uma ponte esteja fechada, talvez o túnel alternativo esteja ativo mas leve a outro bairro, talvez o pedágio bloqueou a passagem ou talvez a volta use uma rota diferente.</p>\n  <p>DNS é o mapa. Rotas são as ruas. Firewall é o posto de controle. BGP é o sistema que anuncia caminhos. Logs são as câmeras. RCA é a investigação que descobre por que o caminho falhou e como impedir repetição.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Um usuário remoto conecta na VPN e tenta acessar <code>api.interno.empresa</code>. O ping por IP funciona, mas o nome não resolve. Um iniciante poderia dizer que “a VPN está ruim”. Um profissional separa o problema: autenticação VPN está OK, rota até o IP está OK, mas a resolução DNS interna falha.</p>\n  <p>A hipótese principal passa a ser perfil VPN sem DNS interno, zona privada não encaminhada, split DNS incorreto ou firewall bloqueando consulta DNS. A correção não é recriar a VPN inteira; é ajustar a parte comprovadamente quebrada.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Na Orion Saúde, a filial usa um link principal dedicado e uma VPN de contingência. Após uma manutenção, o link dedicado voltou com BGP ativo, mas passou a anunciar apenas parte dos prefixos. A filial ainda alcança alguns sistemas, mas falha ao acessar a API de faturamento. Enquanto isso, a VPN de contingência permanece ativa com anúncios sobrepostos.</p>\n  <p>O resultado é assimetria: a ida sai por um caminho e o retorno tenta voltar por outro, passando por firewall sem sessão correspondente. O SOC enxerga denies, o usuário enxerga timeout e o time de aplicação não vê requisição chegando. O diagnóstico correto exige comparar BGP, route tables, firewall session table e flow logs.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Na cloud, a API está em um spoke privado e depende de banco acessado por endpoint privado. Uma mudança de route table no spoke força todo tráfego para o firewall hub. Porém, a regra do firewall permite aplicação para banco apenas a partir de um range antigo. O health check da aplicação continua verde porque testa somente rota local, mas a jornada real falha quando chama dependência crítica.</p>\n  <p>Esse exemplo mostra uma armadilha clássica: recurso cloud saudável não significa serviço saudável. A saúde precisa representar o fluxo de negócio, não apenas o processo local.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>O pipeline de IaC alterou uma UDR, uma associação de zona DNS privada e uma regra de firewall em uma única janela. O plano foi aprovado, mas não havia teste sintético pós-deploy para validar filial, VPN, matriz e cloud. O incidente só apareceu quando usuários reais acessaram o sistema.</p>\n  <p>A melhoria DevSecOps é transformar o caso em guardrails: validação de rotas esperadas, teste de resolução DNS por origem, teste de conectividade de aplicação, aprovação para mudanças em prefixos críticos, detecção de drift e rollback automatizado para configurações de rede.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista de segurança, a tentação perigosa é resolver o incidente removendo inspeção do firewall, liberando <code>any-to-any</code> ou desativando o WAF/DNS privado. Isso pode restaurar conectividade, mas cria exposição silenciosa.</p>\n  <p>A abordagem correta é defensiva e proporcional: identificar fluxo legítimo, dono, origem, destino, protocolo, porta, identidade, justificativa e prazo. Se uma exceção for necessária, ela deve ser estreita, temporária, monitorada e vinculada a ticket. Segurança boa não impede operação; ela reduz risco sem destruir evidência.</p>\n\n</section>\n<p><strong>Critério de maturidade:</strong> em qualquer resposta que envolva segurança, o aluno deve indicar escopo autorizado, evidência, mitigação, risco residual e forma de monitoramento. Respostas que apenas dizem “bloquear no firewall” ou “usar Zero Trust” sem fluxo, regra, log e justificativa não atingem domínio.</p>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama abaixo representa a rede híbrida do caso. Observe que os sintomas podem surgir em DNS, BGP, rota, firewall, retorno, endpoint privado ou aplicação. A tarefa é descobrir o caminho efetivo com evidências.</p>\n  <div class=\"diagram diagram--hybrid-network-case\">\n  <h3>Diagrama — Rede corporativa híbrida em investigação</h3>\n  <svg class=\"lesson-svg\" viewBox=\"0 0 1180 620\" role=\"img\" aria-labelledby=\"case1708Title case1708Desc\">\n    <title id=\"case1708Title\">Estudo de caso de rede corporativa híbrida</title>\n    <desc id=\"case1708Desc\">Diagrama mostrando matriz, filial, usuários remotos, VPN, link dedicado, hub cloud, spokes, DNS privado, firewall, SIEM e dependências críticas.</desc>\n    <defs>\n      <marker id=\"arrow1708\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\">\n        <path d=\"M0,0 L0,6 L9,3 z\" class=\"svg-arrow-fill\"></path>\n      </marker>\n    </defs>\n    <rect x=\"20\" y=\"24\" width=\"1140\" height=\"560\" rx=\"22\" class=\"svg-bg\"></rect>\n    <rect x=\"60\" y=\"80\" width=\"260\" height=\"170\" rx=\"18\" class=\"svg-zone\"></rect>\n    <text x=\"190\" y=\"112\" text-anchor=\"middle\" class=\"svg-title\">Matriz</text>\n    <rect x=\"88\" y=\"138\" width=\"88\" height=\"56\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"132\" y=\"171\" text-anchor=\"middle\" class=\"svg-label\">Usuários</text>\n    <rect x=\"204\" y=\"138\" width=\"88\" height=\"56\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"248\" y=\"171\" text-anchor=\"middle\" class=\"svg-label\">DNS/AD</text>\n    <rect x=\"60\" y=\"332\" width=\"260\" height=\"150\" rx=\"18\" class=\"svg-zone\"></rect>\n    <text x=\"190\" y=\"364\" text-anchor=\"middle\" class=\"svg-title\">Filial</text>\n    <rect x=\"100\" y=\"392\" width=\"176\" height=\"54\" rx=\"12\" class=\"svg-node svg-node--warning\"></rect>\n    <text x=\"188\" y=\"425\" text-anchor=\"middle\" class=\"svg-label\">VLAN vendas</text>\n    <rect x=\"420\" y=\"92\" width=\"308\" height=\"380\" rx=\"22\" class=\"svg-zone svg-zone--cloud\"></rect>\n    <text x=\"574\" y=\"126\" text-anchor=\"middle\" class=\"svg-title\">Hub cloud / conectividade</text>\n    <rect x=\"456\" y=\"158\" width=\"108\" height=\"58\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"510\" y=\"192\" text-anchor=\"middle\" class=\"svg-label\">VPN/BGP</text>\n    <rect x=\"586\" y=\"158\" width=\"108\" height=\"58\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"640\" y=\"192\" text-anchor=\"middle\" class=\"svg-label\">Firewall</text>\n    <rect x=\"456\" y=\"254\" width=\"108\" height=\"58\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"510\" y=\"288\" text-anchor=\"middle\" class=\"svg-label\">Resolver</text>\n    <rect x=\"586\" y=\"254\" width=\"108\" height=\"58\" rx=\"12\" class=\"svg-node svg-node--warning\"></rect>\n    <text x=\"640\" y=\"288\" text-anchor=\"middle\" class=\"svg-label\">UDR/Rotas</text>\n    <rect x=\"486\" y=\"354\" width=\"178\" height=\"58\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"575\" y=\"389\" text-anchor=\"middle\" class=\"svg-label\">Flow logs / SIEM</text>\n    <rect x=\"820\" y=\"78\" width=\"280\" height=\"178\" rx=\"18\" class=\"svg-zone svg-zone--cloud\"></rect>\n    <text x=\"960\" y=\"110\" text-anchor=\"middle\" class=\"svg-title\">Spoke aplicação</text>\n    <rect x=\"850\" y=\"138\" width=\"98\" height=\"56\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"899\" y=\"171\" text-anchor=\"middle\" class=\"svg-label\">App</text>\n    <rect x=\"972\" y=\"138\" width=\"98\" height=\"56\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"1021\" y=\"171\" text-anchor=\"middle\" class=\"svg-label\">API</text>\n    <rect x=\"820\" y=\"326\" width=\"280\" height=\"156\" rx=\"18\" class=\"svg-zone svg-zone--cloud\"></rect>\n    <text x=\"960\" y=\"358\" text-anchor=\"middle\" class=\"svg-title\">Spoke dados</text>\n    <rect x=\"852\" y=\"392\" width=\"96\" height=\"54\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"900\" y=\"424\" text-anchor=\"middle\" class=\"svg-label\">DB priv.</text>\n    <rect x=\"974\" y=\"392\" width=\"96\" height=\"54\" rx=\"12\" class=\"svg-node\"></rect>\n    <text x=\"1022\" y=\"424\" text-anchor=\"middle\" class=\"svg-label\">Storage</text>\n    <path d=\"M292 166 C350 166, 390 180, 456 187\" class=\"svg-link\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M276 419 C350 420, 390 345, 456 283\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M564 187 L586 187\" class=\"svg-link\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M694 187 C760 170, 792 165, 850 166\" class=\"svg-link\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M640 216 L640 254\" class=\"svg-link\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M694 283 C760 300, 790 390, 852 419\" class=\"svg-link svg-link--dashed\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M248 194 C330 250, 390 270, 456 283\" class=\"svg-link svg-link--dotted\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M575 312 L575 354\" class=\"svg-link svg-link--dotted\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M899 194 C900 255, 900 335, 900 392\" class=\"svg-link\" marker-end=\"url(#arrow1708)\"></path>\n    <path d=\"M1021 194 C1020 255, 1020 335, 1022 392\" class=\"svg-link\" marker-end=\"url(#arrow1708)\"></path>\n    <text x=\"365\" y=\"150\" class=\"svg-small\">túnel primário</text>\n    <text x=\"338\" y=\"378\" class=\"svg-small\">túnel backup instável</text>\n    <text x=\"750\" y=\"150\" class=\"svg-small\">trânsito inspecionado</text>\n    <text x=\"736\" y=\"322\" class=\"svg-small\">rota/DNS divergente</text>\n  </svg>\n</div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório desta aula é um war room documental. Você não precisa provisionar recursos reais: o objetivo é construir um dossiê de investigação profissional, como se estivesse atuando em uma empresa com rede híbrida em produção.</p>\n  <p>Você produzirá mapa de fluxo, matriz de hipóteses, timeline, plano de evidências, mitigação, rollback, RCA e backlog preventivo. O foco é método, não improviso.</p>\n\n</section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam análise de caminho efetivo, DNS híbrido, BGP, rota de retorno, firewall stateful, flow logs e comunicação executiva. Responda como se estivesse em um incidente real: com evidências, limitações e próximos passos claros.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio é entregar uma solução executiva e técnica para a Orion Saúde. Você deve explicar por que a filial falha, por que a matriz tem latência, por que usuários remotos não resolvem nomes internos e como corrigir sem abrir a rede de forma ampla.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra como convergir hipóteses aparentemente concorrentes. A resposta ideal não aponta uma única tecnologia sem prova; ela conecta mudança recente, evidência por camada, impacto, mitigação e prevenção.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Nesta aula, você praticou investigação de uma rede corporativa híbrida. O ponto central foi entender que conectividade híbrida depende de DNS, rotas, políticas, identidade, observabilidade e processo de mudança funcionando juntos.</p>\n  <p>Você viu que VPN ativa não prova acesso funcional, BGP estabelecido não prova caminho correto, health check verde não prova jornada real, DNS respondendo não prova nome certo e firewall aceitando ida não prova retorno. O profissional valida o fluxo completo.</p>\n\n</section>\n<p><strong>Avaliação P1-M17:</strong> esta aula agora deve ser corrigida por competência. O aluno não deve olhar apenas a nota final; deve identificar quais competências ficaram abaixo do mínimo, criar trilha de revisão e coletar evidências de reteste.</p><div class=\"content-card\"><h4>Matriz de competências desta avaliação</h4><p>Use esta matriz para corrigir a aula por competência, não apenas por nota bruta.</p><table class=\"data-table\"><thead><tr><th>Código</th><th>Competência</th><th>Mínimo</th><th>Domínio</th><th>Evidência esperada</th></tr></thead><tbody><tr><td>C03</td><td>IPv4, subnetting, gateway e roteamento básico</td><td>75%</td><td>90%</td><td>calcula redes, identifica rota local/default e justifica escolha de caminho</td></tr><tr><td>C04</td><td>TCP, UDP, portas e serviços essenciais</td><td>75%</td><td>90%</td><td>diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs</td></tr><tr><td>C07</td><td>Cloud Networking, Kubernetes e arquitetura híbrida</td><td>75%</td><td>90%</td><td>projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos</td></tr><tr><td>C08</td><td>Troubleshooting profissional, RCA e comunicação</td><td>80%</td><td>92%</td><td>transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência</td></tr></tbody></table></div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima aula, <strong>17.9 — Checklist de laboratórios e portfólio profissional</strong>, você organizará os laboratórios, estudos de caso, simulados e entregáveis do curso em um portfólio técnico apresentável.</p>\n\n</section>"
  },
  "diagramNotes": "O SVG apresenta a topologia híbrida do caso: matriz, filial, VPN/BGP, hub cloud, firewall, DNS privado, spokes, aplicações, dados e SIEM.",
  "lab": {
    "id": "lab-17.8",
    "title": "Laboratório — War room de rede corporativa híbrida",
    "labType": "cloud",
    "objective": "Construir um dossiê completo de investigação para uma falha híbrida envolvendo filial, matriz, VPN, BGP, DNS privado, firewall hub, cloud spokes e aplicação crítica. Ao final, produzir correção por competência, rubrica preenchida e plano de revisão baseado em evidências.",
    "scenario": "15. Laboratório O laboratório desta aula é um war room documental. Você não precisa provisionar recursos reais: o objetivo é construir um dossiê de investigação profissional, como se estivesse atuando em uma empresa com rede híbrida em produção. Você produzirá mapa de fluxo, matriz de hipóteses, timeline, plano de evidências, mitigação, rollback, RCA e backlog preventivo. O foco é método, não improviso.",
    "topology": "Matriz e filial conectadas ao hub cloud por link dedicado e VPN; usuários remotos por VPN; cloud em modelo hub-spoke com firewall central, DNS privado, spokes de aplicação e dados, endpoints privados, flow logs e SIEM.",
    "architecture": "Rede híbrida com roteamento dinâmico, rotas estáticas complementares, split-horizon DNS, firewall stateful, inspeção centralizada, security groups/NSGs, Private Endpoint, logs centralizados e pipeline de IaC.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 360,
    "cost": "zero se feito como desenho/simulação; potencialmente pago se reproduzido em cloud real. Remova recursos ao final.",
    "safetyNotes": [
      "Execute apenas em laboratório, ambiente autorizado ou como exercício conceitual.",
      "Não altere ambientes produtivos sem aprovação, janela de mudança, backup e plano de rollback.",
      "Não colete, exponha ou compartilhe dados sensíveis durante o laboratório.",
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Definir problem statement",
        "instruction": "Documente sintomas por população: filial, matriz, usuários remotos, aplicação, API e banco.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Problema descrito por impacto, escopo, horário e serviço afetado, sem causa presumida.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 2,
        "title": "Mapear topologia e donos",
        "instruction": "Desenhe matriz, filial, VPN, link dedicado, hub, spokes, DNS, firewall, aplicação, dados e SIEM.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa lógico com donos técnicos por camada.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 3,
        "title": "Construir linha do tempo",
        "instruction": "Liste mudanças de BGP, UDR, firewall, DNS privado, endpoint privado, pipeline e relatos de usuários.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Timeline única em horário normalizado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Validar DNS híbrido",
        "instruction": "Compare resolução a partir da matriz, filial, VPN e cloud; registre IP retornado, TTL, zona e resolvedor.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Diferenças de split-horizon e encaminhamento DNS identificadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Validar rotas e BGP",
        "instruction": "Documente prefixos anunciados, rota vencedora, next hop, caminho primário, backup e alterações recentes.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Caminho esperado e caminho efetivo comparados.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Validar firewall e retorno",
        "instruction": "Revise sessão stateful, denies, regras efetivas, NAT, rota de retorno e logs por fluxo origem-destino-porta.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Bloqueios e assimetria classificados com evidência.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Validar cloud hub-spoke",
        "instruction": "Revise route tables, UDR, security groups/NSGs, Private Endpoint, DNS privado, flow logs e cloud audit.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Falhas entre hub, spoke de aplicação e spoke de dados identificadas ou descartadas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Validar experiência por origem",
        "instruction": "Teste a jornada lógica da matriz, filial, VPN e workload cloud, registrando onde cada fluxo diverge.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz comparativa de origem versus sintoma versus evidência.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Definir mitigação e rollback",
        "instruction": "Escolha ação mínima: corrigir prefixo BGP, ajustar UDR, restaurar regra, corrigir DNS privado ou reverter mudança IaC.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano com dono, janela, risco, critério de sucesso e rollback.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Escrever RCA e backlog preventivo",
        "instruction": "Documente causa técnica, causa sistêmica, evidências, impacto, prevenção, testes sintéticos e guardrails.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "RCA técnico e executivo pronto para revisão pós-incidente.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Estudo de caso II: rede corporativa híbrida” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Montar matriz de competências da aula",
        "instruction": "Crie uma tabela com as competências C03, C04, C07, C08. Para cada uma, registre pontuação, confiança, evidência coletada e lacuna principal.",
        "command": "Tabela sugerida: Competência | Evidência | Pontuação | Confiança | Lacuna | Ação de revisão | Reteste",
        "expectedOutput": "Matriz preenchida com pelo menos uma evidência por competência avaliada.",
        "explanation": "A avaliação deixa de ser uma nota única e passa a mostrar exatamente onde o aluno domina ou precisa revisar."
      },
      {
        "number": 12,
        "title": "Classificar erros e hipóteses de aprendizagem",
        "instruction": "Para cada erro, classifique a causa usando a taxonomia E-CONCEITO, E-CAMADA, E-COMANDO, E-ARQUITETURA, E-SEGURANCA ou E-COMUNICACAO.",
        "command": "Erro | Resposta dada | Resposta correta | Causa | Competência | Aula de revisão | Evidência nova",
        "expectedOutput": "Lista de erros convertida em backlog de revisão objetivo.",
        "explanation": "Erro sem classificação vira repetição. Erro classificado vira plano de estudo e prática."
      },
      {
        "number": 13,
        "title": "Aplicar rubrica e decidir aprovação",
        "instruction": "Some os critérios da rubrica. A aprovação exige 75% geral e nenhuma competência crítica sem evidência mínima.",
        "command": "Pontuação final = soma dos critérios; decisão = aprovado, aprovado com ressalvas ou refazer competência crítica",
        "expectedOutput": "Rubrica preenchida, decisão explícita e justificativa técnica.",
        "explanation": "O aluno aprende a defender a própria conclusão, como aconteceria em revisão técnica, banca ou auditoria."
      },
      {
        "number": 14,
        "title": "Criar trilha de revisão e reteste",
        "instruction": "Para cada competência abaixo do mínimo, defina aula de revisão, mini laboratório, questão de reteste e prazo de nova tentativa.",
        "command": "Competência fraca | Aula de revisão | Mini lab | Reteste | Prazo | Evidência esperada",
        "expectedOutput": "Plano de revisão com ações executáveis em vez de releitura genérica.",
        "explanation": "A trilha de revisão transforma o M17 em sistema de fechamento do curso, não apenas em simulado final."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Estudo de caso II: rede corporativa híbrida”. O resultado final deve incluir matriz de competências, rubrica, feedback por tema, plano de revisão e evidências de reteste.",
    "validation": [
      {
        "check": "O aluno consegue explicar o caminho efetivo por origem, provar a causa por evidência e propor correção segura sem degradar controles.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O aluno consegue explicar o caminho efetivo por origem, provar a causa por evidência e propor correção segura sem degradar controles.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Matriz de competências preenchida",
        "command": "verificar tabela de competências",
        "expected": "C03, C04, C07, C08 avaliadas com evidência",
        "ifFails": "volte ao simulado/lab e registre evidências por competência"
      },
      {
        "check": "Rubrica aplicada",
        "command": "somar critérios de avaliação",
        "expected": "75% mínimo geral e competências críticas acima do mínimo",
        "ifFails": "criar trilha de revisão antes de marcar a aula como concluída"
      },
      {
        "check": "Reteste planejado",
        "command": "verificar plano 24-48h",
        "expected": "cada lacuna crítica possui ação prática e prazo",
        "ifFails": "transforme lacunas genéricas em tarefas concretas"
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se a VPN estiver conectada, não conclua que o acesso está correto; valide rotas, DNS, perfil e política.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se BGP estiver estabelecido, valide prefixos, preferência, rota mais específica e retorno.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o firewall mostrar deny, descubra se ele é causa, sintoma de assimetria ou política esperada.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se apenas a filial falha, compare DNS, rota, NAT, MTU, proxy e caminho de retorno com a matriz.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se cloud flow logs mostram ida aceita e retorno ausente, investigue rota de retorno, firewall stateful e caminho assimétrico.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      }
    ],
    "improvements": [
      "Criar testes sintéticos por origem: matriz, filial, VPN e cloud.",
      "Versionar rotas, DNS, firewall e BGP como mudanças rastreáveis.",
      "Adicionar guardrails para prefixos sobrepostos e rotas mais específicas críticas.",
      "Padronizar matriz de fluxos aprovada por aplicação.",
      "Criar alertas de assimetria, aumento de denies e mudança em zonas DNS privadas.",
      "Adicionar pesos por competência conforme objetivo profissional do aluno.",
      "Repetir o bloco após uma semana para medir retenção real.",
      "Transformar evidências sanitizadas em portfólio técnico."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "matriz de competências preenchida",
      "rubrica com pontuação e justificativa",
      "lista de erros por taxonomia",
      "plano de revisão com mini laboratórios",
      "resultado do reteste ou critério de próxima tentativa"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Estudo de caso II: rede corporativa híbrida” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?",
      "Qual competência ficou mais fraca e qual evidência prova isso?",
      "Qual erro foi conceitual e qual erro foi falta de diagnóstico por evidência?",
      "O que você faria diferente em um ambiente corporativo real?",
      "Qual risco residual permanece mesmo após a correção?"
    ],
    "challenge": "Desafio — RCA de rede híbrida da Orion Saúde Entregue também uma matriz de competências com feedback por tema, pontuação por rubrica e trilha de revisão baseada nos erros.",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns. Uma entrega madura não tenta esconder erro: ela mostra pontuação, lacuna, causa, evidência, revisão planejada e reteste. A aprovação só deve ser considerada confiável quando o aluno consegue explicar a resposta correta e demonstrá-la em laboratório ou cenário.",
    "expectedOutcome": "Dossiê completo de investigação e RCA para incidente em rede corporativa híbrida.",
    "evaluationMode": true,
    "competencyBased": true,
    "assessmentReference": "assessment-17.8"
  },
  "caseStudy": {
    "scenario": "A Orion Saúde enfrenta falhas intermitentes em uma rede híbrida após janela de mudança envolvendo BGP, UDR, DNS privado e firewall. Filial, matriz e usuários remotos observam sintomas diferentes ao acessar a mesma aplicação crítica.",
    "symptoms": [
      "Timeout da filial para API de faturamento",
      "Latência alta da matriz",
      "Usuários remotos autenticados sem resolução DNS interna",
      "Aumento de denies no firewall hub",
      "Flow logs com ida aceita e retorno ausente",
      "Cloud audit indicando mudança de route table e zona privada"
    ],
    "artifacts": [
      "Mapa de topologia",
      "Tabela de prefixos BGP",
      "Route tables/UDR",
      "DNS query logs",
      "Firewall logs",
      "VPN logs",
      "Flow logs",
      "Cloud audit",
      "Tickets de usuários",
      "Pipeline de IaC"
    ],
    "expectedDeliverables": [
      "Mapa de fluxo efetivo",
      "Matriz hipótese-evidência",
      "Timeline única",
      "Plano de mitigação",
      "Plano de rollback",
      "RCA técnico e executivo",
      "Backlog preventivo"
    ]
  },
  "quiz": [
    {
      "question": "Usuários remotos autenticam na VPN, mas não resolvem nomes internos. Qual é a melhor hipótese inicial?",
      "options": [
        "A aplicação está necessariamente fora do ar",
        "O problema pode estar em perfil DNS, split DNS, encaminhamento ou zona privada",
        "BGP sempre é a causa",
        "A solução é desativar MFA"
      ],
      "answer": 1,
      "explanation": "Autenticação VPN bem-sucedida não prova resolução DNS interna. É preciso validar DNS recebido pelo cliente, zonas, encaminhamento e split-horizon."
    },
    {
      "question": "BGP está estabelecido, mas a filial não alcança uma API específica. O que isso prova?",
      "options": [
        "Prova que todas as rotas estão corretas",
        "Prova apenas que a sessão BGP existe; prefixos, preferência e retorno ainda precisam ser validados",
        "Prova que DNS falhou",
        "Prova ataque confirmado"
      ],
      "answer": 1,
      "explanation": "Sessão BGP up não garante que o prefixo correto foi anunciado, que a rota venceu ou que o retorno é simétrico."
    },
    {
      "question": "Flow logs mostram tráfego aceito de ida, mas sem retorno correspondente. Qual hipótese é forte?",
      "options": [
        "Assimetria, rota de retorno ausente ou bloqueio no caminho de volta",
        "Certificado expirado obrigatoriamente",
        "Erro de teclado do usuário",
        "TTL DNS alto obrigatoriamente"
      ],
      "answer": 0,
      "explanation": "Ausência de retorno sugere investigar caminho reverso, firewall stateful, NAT, rotas e políticas no destino."
    },
    {
      "question": "Qual é o risco de liberar any-to-any durante o incidente?",
      "options": [
        "Nenhum, pois acelera a correção",
        "Reduz segurança, mascara causa, cria dívida operacional e remove evidência útil",
        "Melhora o RCA automaticamente",
        "Impede logs de aplicação"
      ],
      "answer": 1,
      "explanation": "Liberações amplas podem restaurar conectividade, mas aumentam risco e dificultam identificar a causa real."
    },
    {
      "question": "Em rede híbrida, DNS split-horizon significa:",
      "options": [
        "O mesmo nome pode resolver para respostas diferentes conforme origem e zona",
        "Todo DNS é público",
        "DNS deixa de usar cache",
        "BGP altera registros DNS automaticamente"
      ],
      "answer": 0,
      "explanation": "Split-horizon permite respostas diferentes para o mesmo nome conforme origem ou resolvedor, comum em ambientes híbridos."
    },
    {
      "question": "Qual artefato é mais útil para correlacionar mudança recente e início do incidente?",
      "options": [
        "Timeline normalizada com cloud audit, pipeline, tickets, logs de firewall e BGP",
        "Print isolado do navegador",
        "Opinião do time mais sênior",
        "Lista de portas padrão"
      ],
      "answer": 0,
      "explanation": "A timeline normalizada permite correlacionar eventos de times e sistemas diferentes no mesmo eixo temporal."
    }
  ],
  "exercises": [
    {
      "title": "Mapa de caminho efetivo",
      "prompt": "Desenhe o fluxo da filial até a API privada e identifique DNS, rota, firewall, VPN/BGP, hub, spoke e retorno.",
      "expectedAnswer": "Um diagrama com origem, resolvedor, IP resolvido, gateway, túnel/link, firewall, route table, security group, destino e caminho de volta."
    },
    {
      "title": "Matriz hipótese-evidência",
      "prompt": "Monte uma matriz com hipóteses de DNS, BGP, firewall, rota de retorno e endpoint privado.",
      "expectedAnswer": "Cada hipótese deve ter fonte de evidência, teste, resultado esperado, risco e ação segura."
    },
    {
      "title": "Mitigação mínima",
      "prompt": "Proponha uma mitigação para rota assimétrica sem abrir tráfego amplo.",
      "expectedAnswer": "Corrigir prefixo/UDR ou regra específica do fluxo, com validação, dono, prazo, monitoramento e rollback."
    },
    {
      "title": "RCA executivo",
      "prompt": "Escreva um resumo executivo de cinco linhas para a diretoria.",
      "expectedAnswer": "Deve explicar impacto, causa técnica, causa sistêmica, mitigação, prevenção e status sem jargão excessivo."
    },
    {
      "id": "ex17.8.competencias",
      "type": "avaliação por competência",
      "prompt": "Monte uma matriz de competências para esta aula usando C03, C04, C07, C08. Para cada competência, registre pontuação, evidência, principal erro e ação de revisão.",
      "expectedAnswer": "A resposta deve conter pelo menos uma linha por competência, com evidência verificável e plano de reteste. Não basta dizer “preciso estudar mais”.",
      "explanation": "A matriz obriga o aluno a transformar avaliação em melhoria contínua."
    }
  ],
  "flashcards": [
    {
      "front": "VPN conectada prova acesso funcional?",
      "back": "Não. É preciso validar rotas, DNS, política, perfil, retorno, firewall e destino."
    },
    {
      "front": "BGP up prova caminho correto?",
      "back": "Não. Prova sessão estabelecida, mas não prefixos corretos, preferência, rota vencedora ou retorno."
    },
    {
      "front": "O que é caminho efetivo?",
      "back": "É o caminho real que o tráfego percorre, considerando DNS, rotas, políticas, túneis, firewall e retorno."
    },
    {
      "front": "Por que rota assimétrica quebra firewall stateful?",
      "back": "Porque o firewall pode ver apenas um sentido do fluxo e não reconhecer sessão válida no retorno."
    },
    {
      "front": "Qual é a função de flow logs no caso híbrido?",
      "back": "Mostrar metadados de tráfego aceito ou rejeitado por origem, destino, porta, protocolo, tempo e volume."
    },
    {
      "front": "Qual é uma boa exceção de firewall?",
      "back": "Estreita, justificada, temporária, monitorada, com dono, prazo, ticket e rollback."
    }
  ],
  "mentorQuestions": [
    "Qual evidência faria você descartar DNS como causa principal?",
    "Como você explicaria para gestão que BGP está up, mas o serviço ainda falha?",
    "Qual mitigação preserva segurança enquanto reduz impacto do incidente?"
  ],
  "challenge": {
    "title": "Desafio — RCA de rede híbrida da Orion Saúde",
    "description": "Produza um dossiê completo explicando por que matriz, filial e usuários remotos observam sintomas diferentes após uma mudança envolvendo BGP, UDR, DNS privado e firewall.",
    "requirements": [
      "Mapa de topologia e caminho efetivo",
      "Timeline normalizada",
      "Matriz hipótese-evidência",
      "Plano de mitigação e rollback",
      "RCA técnico e executivo",
      "Backlog preventivo com guardrails"
    ],
    "successCriteria": [
      "Conclusão sustentada por evidências",
      "Correção sem any-to-any permanente",
      "Separação entre causa técnica e sistêmica",
      "Recomendações aplicáveis a rede, cloud, segurança e DevSecOps",
      "Cada competência tem evidência observável.",
      "Cada erro tem causa classificada.",
      "A rubrica sustenta a decisão de aprovação.",
      "O plano de revisão tem tarefa prática e prazo."
    ],
    "constraints": [
      "não considerar a aula concluída sem rubrica preenchida",
      "não usar resposta decorada sem evidência técnica",
      "não avançar com competência crítica abaixo do mínimo sem plano de revisão"
    ],
    "tasks": [
      "Aplicar a rubrica de avaliação por competência.",
      "Gerar feedback por tema e por causa de erro.",
      "Criar trilha de revisão para competências abaixo do mínimo.",
      "Definir reteste objetivo e evidência esperada."
    ],
    "expectedDeliverables": [
      "Matriz de competências com pontuação e confiança.",
      "Rubrica preenchida com justificativa.",
      "Feedback por tema: fundamento, diagnóstico, arquitetura, segurança, cloud e comunicação.",
      "Plano de revisão baseado em erros e reteste.",
      "Checklist de aprovação ou decisão de refazer competência crítica."
    ],
    "gradingRubric": [
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 15,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
      },
      {
        "criterion": "C04 — TCP, UDP, portas e serviços essenciais",
        "points": 15,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 15,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 15,
        "description": "Demonstra domínio mínimo de 80% e produz evidência verificável: transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência."
      },
      {
        "criterion": "Evidência e rastreabilidade",
        "points": 15,
        "description": "Entrega prints, tabelas, comandos, hipóteses, logs, justificativas e rastreia cada decisão ao requisito correspondente."
      },
      {
        "criterion": "Correção comentada e melhoria contínua",
        "points": 25,
        "description": "Transforma erro em plano de revisão, reteste, laboratório curto e melhoria concreta do próprio mapa de conhecimento."
      }
    ]
  },
  "commentedSolution": {
    "title": "Solução comentada — convergência das evidências",
    "content": "A solução mais provável combina três fatores: anúncio BGP parcial ou preferencial incorreto para prefixos da API, UDR no hub direcionando tráfego por firewall sem regra correspondente para o novo range e DNS privado inconsistente para usuários remotos. A filial falha porque usa caminho diferente da matriz; a matriz sofre latência por hairpin ou rota menos eficiente; usuários remotos autenticam, mas não recebem resolução adequada. A mitigação correta é restaurar prefixos/rotas esperadas, corrigir associação/encaminhamento DNS e aplicar regra específica no firewall para fluxo legítimo, com logs e rollback. A prevenção envolve testes sintéticos por origem, validação automática de DNS/rota/política no pipeline e guardrails para prefixos críticos.",
    "keyLessons": [
      "Sintomas diferentes podem ter causa comum em caminho efetivo",
      "BGP, DNS e firewall precisam ser analisados juntos",
      "Correção segura é específica, reversível e observável",
      "RCA deve gerar melhoria sistêmica, não apenas correção pontual"
    ],
    "reasoning": "A solução comentada deve explicar o raciocínio. Nesta revisão P1-M17, a correção deve ser feita por competência: nota final, por si só, não prova domínio se o aluno não consegue justificar evidência, risco, decisão e próximo passo.",
    "steps": [
      "Separar nota geral de domínio por competência.",
      "Classificar erros pela taxonomia de causa.",
      "Vincular lacunas a aulas e laboratórios específicos.",
      "Criar mini laboratório ou exercício ativo para cada lacuna crítica.",
      "Retestar após intervalo e registrar evolução.",
      "Decidir aprovação, aprovação com ressalvas ou refazer bloco crítico."
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
      }
    ],
    "finalAnswer": "A aula está concluída quando o aluno entrega matriz de competências, rubrica, evidências, feedback por erro e plano de revisão/reteste para qualquer competência abaixo do mínimo."
  },
  "glossary": [
    {
      "term": "Rede híbrida",
      "definition": "Integração operacional entre datacenter, filiais, usuários remotos, cloud e serviços externos."
    },
    {
      "term": "Caminho efetivo",
      "definition": "Caminho real percorrido pelo tráfego após decisões de DNS, rota, política, NAT, túnel e retorno."
    },
    {
      "term": "Rota assimétrica",
      "definition": "Situação em que ida e volta passam por caminhos diferentes, podendo quebrar firewalls stateful e troubleshooting."
    },
    {
      "term": "Split-horizon DNS",
      "definition": "Modelo em que o mesmo nome recebe respostas diferentes conforme origem, resolvedor ou zona."
    },
    {
      "term": "Hub-spoke",
      "definition": "Arquitetura em que uma rede hub centraliza conectividade, segurança e serviços compartilhados para redes spoke."
    },
    {
      "term": "RCA híbrido",
      "definition": "Análise de causa raiz que considera rede, cloud, segurança, identidade, aplicação e processo de mudança."
    }
  ],
  "references": [
    {
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final",
      "note": "Referência para resposta a incidentes, risco, detecção, resposta e recuperação."
    },
    {
      "title": "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "note": "Referência para planejamento, execução, análise e relatório de avaliações técnicas."
    },
    {
      "title": "AWS Site-to-Site VPN — Concepts and Routing Options",
      "url": "https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html",
      "note": "Referência para túneis VPN, redundância e roteamento."
    },
    {
      "title": "Microsoft Azure ExpressRoute Overview",
      "url": "https://learn.microsoft.com/en-us/azure/expressroute/expressroute-introduction",
      "note": "Referência para conectividade privada híbrida com Azure."
    }
  ],
  "security": {
    "goodPractices": [
      "Usar simulados para diagnosticar lacunas, não apenas para memorizar respostas.",
      "Executar o capstone em ambiente controlado, documentado e sem impacto em terceiros.",
      "Coletar evidências de arquitetura, validação, logs, decisões e melhorias propostas.",
      "Revisar erros por tema: camada, protocolo, comando, segurança, cloud e troubleshooting.",
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
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar revisão integrada, simulados, estudos de caso, portfólio, capstone e consolidação profissional com impacto operacional, financeiro e de segurança."
    ],
    "vulnerabilities": [
      {
              "name": "Risco de avaliação sem evidência — Estudo de caso II: rede corporativa híbrida",
              "description": "Em Estudo de caso II: rede corporativa híbrida, o risco principal é transformar revisão, simulado, checklist ou capstone em aprovação subjetiva, sem evidências de arquitetura, fluxo, teste, segurança, troubleshooting e lacunas por domínio.",
              "defensiveExplanation": "O risco aparece quando o aluno sabe responder definições, mas não consegue demonstrar validação operacional com diagrama, matriz de fluxos, comandos, logs, RCA e rubrica.",
              "mitigation": "Exigir entregáveis objetivos, simulado por domínio, relatório de lacunas, rubrica de 100 pontos, evidências sanitizadas, revisão das falhas e plano de estudo antes de concluir a trilha."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
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
      "Comparar comportamento atual com baseline conhecido antes da mudança.",
      "Correlacionar falhas por camada: DNS, rota, porta, TLS, aplicação, identidade e política.",
      "Procurar assimetria: funciona de uma origem e falha de outra, funciona por IP e falha por nome, conecta mas não autoriza.",
      "Investigar picos de bloqueios, resets, NXDOMAIN, drops, latência ou volume anormal.",
      "Criar alerta ou consulta específica para sinais relacionados à aula 17.8."
    ]
  },
  "troubleshooting": {
    "symptoms": [
      "O aluno acerta questões isoladas, mas falha em cenários integrados.",
      "O projeto final tem diagrama, mas não possui validação ou evidências.",
      "A solução proposta funciona, mas ignora segurança, custo ou operação.",
      "O checklist mostra lacunas em fundamentos anteriores.",
      "A revisão não gera plano de melhoria mensurável."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 17.8?"
    ],
    "commands": [
      {
        "platform": "Revisão",
        "command": "preencher checklist de camada, protocolo, comando, segurança, cloud e evidência",
        "purpose": "Mapear lacunas antes de considerar o curso consolidado.",
        "expectedObservation": "Tópicos fracos aparecem agrupados por tema.",
        "interpretation": "A revisão deve orientar reforço dirigido, não repetição aleatória."
      },
      {
        "platform": "Capstone",
        "command": "validar DNS, rota, firewall, TLS, logs e evidências do cenário integrado",
        "purpose": "Comprovar que a arquitetura final funciona e é auditável.",
        "expectedObservation": "Entregáveis demonstram desenho, validação, riscos e mitigação.",
        "interpretation": "Sem evidência e rubrica, o projeto final vira texto, não avaliação técnica."
      },
      {
        "platform": "Portfólio",
        "command": "organizar diagramas, tabelas, comandos, prints, RCA e decisões arquiteturais",
        "purpose": "Gerar material revisável e demonstrável.",
        "expectedObservation": "Artefatos suficientes para explicar raciocínio técnico.",
        "interpretation": "Portfólio bom mostra processo, não apenas resultado final."
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
      "17.9"
    ]
  },
  "assessmentBlueprint": {
    "id": "assessment-17.8",
    "title": "Avaliação por competência — Estudo de caso II: rede corporativa híbrida",
    "assessmentType": "estudo de caso avaliativo",
    "competencies": [
      {
        "id": "C03",
        "name": "IPv4, subnetting, gateway e roteamento básico",
        "modules": [
          "M04",
          "M05",
          "M11"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "calcula redes, identifica rota local/default e justifica escolha de caminho"
      },
      {
        "id": "C04",
        "name": "TCP, UDP, portas e serviços essenciais",
        "modules": [
          "M06",
          "M07"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs"
      },
      {
        "id": "C07",
        "name": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "modules": [
          "M14"
        ],
        "minimum": 75,
        "mastery": 90,
        "evidence": "projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos"
      },
      {
        "id": "C08",
        "name": "Troubleshooting profissional, RCA e comunicação",
        "modules": [
          "M15",
          "M17"
        ],
        "minimum": 80,
        "mastery": 92,
        "evidence": "transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência"
      }
    ],
    "passingCriteria": {
      "minimumScorePercent": 75,
      "masteryScorePercent": 90,
      "requiredEvidence": "correção comentada, matriz de lacunas, evidências do laboratório e plano de revisão",
      "mustRedoWhen": "qualquer competência crítica ficar abaixo do mínimo ou quando a resposta correta não puder ser explicada com evidência"
    },
    "gradingRubric": [
      {
        "criterion": "C03 — IPv4, subnetting, gateway e roteamento básico",
        "points": 15,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: calcula redes, identifica rota local/default e justifica escolha de caminho."
      },
      {
        "criterion": "C04 — TCP, UDP, portas e serviços essenciais",
        "points": 15,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs."
      },
      {
        "criterion": "C07 — Cloud Networking, Kubernetes e arquitetura híbrida",
        "points": 15,
        "description": "Demonstra domínio mínimo de 75% e produz evidência verificável: projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos."
      },
      {
        "criterion": "C08 — Troubleshooting profissional, RCA e comunicação",
        "points": 15,
        "description": "Demonstra domínio mínimo de 80% e produz evidência verificável: transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência."
      },
      {
        "criterion": "Evidência e rastreabilidade",
        "points": 15,
        "description": "Entrega prints, tabelas, comandos, hipóteses, logs, justificativas e rastreia cada decisão ao requisito correspondente."
      },
      {
        "criterion": "Correção comentada e melhoria contínua",
        "points": 25,
        "description": "Transforma erro em plano de revisão, reteste, laboratório curto e melhoria concreta do próprio mapa de conhecimento."
      }
    ],
    "feedbackBands": [
      {
        "range": "0-59%",
        "status": "insuficiente para conclusão",
        "action": "Não avance. Refaça a revisão guiada, execute laboratórios essenciais e produza nova tentativa com evidências."
      },
      {
        "range": "60-74%",
        "status": "base parcial",
        "action": "Revise competências abaixo do mínimo, foque nos erros conceituais e refaça somente os blocos afetados."
      },
      {
        "range": "75-89%",
        "status": "aprovado",
        "action": "Avance, mas registre lacunas residuais e execute pelo menos um mini lab de reforço por competência fraca."
      },
      {
        "range": "90-100%",
        "status": "domínio forte",
        "action": "Use o resultado como artefato de portfólio, explique decisões em voz alta e ajude outro aluno a revisar o tema."
      }
    ],
    "remediationTracks": [
      {
        "competencyId": "C03",
        "competency": "IPv4, subnetting, gateway e roteamento básico",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M04, M05, M11 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para calcula redes, identifica rota local/default e justifica escolha de caminho",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C04",
        "competency": "TCP, UDP, portas e serviços essenciais",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M06, M07 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C07",
        "competency": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M14 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C08",
        "competency": "Troubleshooting profissional, RCA e comunicação",
        "trigger": "pontuação abaixo de 80% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M15, M17 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      }
    ],
    "evidenceRequired": [
      "pontuação bruta e pontuação por competência",
      "lista de erros classificados por causa raiz de aprendizagem",
      "print ou transcrição dos comandos/labs quando aplicável",
      "plano de revisão com prazo e reteste",
      "registro de confiança antes e depois da correção"
    ]
  },
  "adaptiveReview": {
    "enabled": true,
    "purpose": "transformar erros de simulado, laboratório ou capstone em trilha de revisão objetiva",
    "errorTaxonomy": [
      {
        "code": "E-CONCEITO",
        "label": "erro conceitual",
        "interpretation": "o aluno decorou termo, mas não explicou por que ele existe ou como funciona internamente"
      },
      {
        "code": "E-CAMADA",
        "label": "erro de camada",
        "interpretation": "confundiu camada 2, camada 3, transporte, aplicação ou controle de segurança"
      },
      {
        "code": "E-COMANDO",
        "label": "erro de evidência",
        "interpretation": "não soube escolher comando, log, métrica ou pacote para confirmar hipótese"
      },
      {
        "code": "E-ARQUITETURA",
        "label": "erro de desenho",
        "interpretation": "solução funciona isoladamente, mas ignora fluxo, dependência, custo, segurança ou operação"
      },
      {
        "code": "E-SEGURANCA",
        "label": "erro de risco",
        "interpretation": "confundiu conectividade com autorização, ignorou telemetria ou propôs exceção insegura"
      },
      {
        "code": "E-COMUNICACAO",
        "label": "erro de comunicação",
        "interpretation": "não conseguiu explicar impacto, decisão, rollback ou risco residual para outro público"
      }
    ],
    "revisionLoop": [
      "registrar resposta inicial e confiança antes do gabarito",
      "corrigir e classificar cada erro pela taxonomia",
      "vincular o erro à competência e às aulas de origem",
      "executar mini laboratório ou exercício ativo",
      "refazer questão/tarefa após intervalo",
      "registrar nova confiança e evidência de melhoria"
    ],
    "remediationTracks": [
      {
        "competencyId": "C03",
        "competency": "IPv4, subnetting, gateway e roteamento básico",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M04, M05, M11 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para calcula redes, identifica rota local/default e justifica escolha de caminho",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C04",
        "competency": "TCP, UDP, portas e serviços essenciais",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M06, M07 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para diferencia conectividade, serviço escutando, firewall, DNS, DHCP, NAT e logs",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C07",
        "competency": "Cloud Networking, Kubernetes e arquitetura híbrida",
        "trigger": "pontuação abaixo de 75% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M14 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para projeta VPC/VNet, subnets, rotas, Private Endpoint, DNS privado, egress e custos",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      },
      {
        "competencyId": "C08",
        "competency": "Troubleshooting profissional, RCA e comunicação",
        "trigger": "pontuação abaixo de 80% ou erro repetido em cenário prático",
        "reviewAction": "revisar módulos M15, M17 com recuperação ativa, sem releitura passiva isolada",
        "labAction": "executar um mini laboratório ou estudo de caso que gere evidência para transforma sintomas em hipóteses, coleta evidências, decide, comunica e previne recorrência",
        "retestAction": "refazer somente questões/tarefas da competência após 24-48 horas e registrar confiança antes de corrigir"
      }
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "IaC, automação e pipelines",
      "lesson": "Infraestrutura como código, validação em pipeline e GitOps",
      "reason": "As decisões de rede corporativa precisam ser versionadas, revisadas e validadas em automação para reduzir drift e erro operacional."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    }
  ]
};
