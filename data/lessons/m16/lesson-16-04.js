export const lesson1604 = {
  "id": "16.4",
  "moduleId": "m16",
  "order": 4,
  "title": "Varredura de portas e validação defensiva",
  "subtitle": "Como validar portas, serviços e controles de rede dentro de escopo aprovado, com baixa intensidade, evidências, logs, comunicação com SOC e interpretação defensiva.",
  "duration": "240-360 min",
  "estimatedStudyTimeMinutes": 360,
  "difficulty": "intermediário-avançado",
  "type": "segurança defensiva",
  "xp": 360,
  "tags": [
    "varredura de portas",
    "validação defensiva",
    "Nmap",
    "TCP",
    "UDP",
    "firewall",
    "serviços",
    "exposição",
    "SOC",
    "ROE",
    "evidências",
    "DevSecOps",
    "cloud security",
    "menor privilégio",
    "SIEM",
    "ética",
    "escopo autorizado",
    "Blue Team",
    "NDR",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "Zeek",
    "NetFlow",
    "timeline de incidente",
    "flow logs"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.2",
      "reason": "Escopo, ética e regras de engajamento definem os limites da validação."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.3",
      "reason": "Reconhecimento autorizado define quais ativos podem ser validados."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m15",
      "lesson": "15.6",
      "reason": "TCP, UDP, portas e serviços são a base técnica para interpretar resultados."
    }
  ],
  "objectives": [
    "Explicar varredura de portas como validação defensiva, não como exploração.",
    "Diferenciar resultados aberta, fechada, filtrada, timeout e reset com cuidado técnico.",
    "Planejar validação com ROE, escopo, janela, origem identificada, intensidade e critérios de parada.",
    "Correlacionar resultados com firewall logs, flow logs, SIEM, inventário, IaC e tickets.",
    "Identificar divergências entre portas esperadas e portas observadas em LAN, cloud, VPN e Kubernetes.",
    "Transformar resultado de varredura em achado defensivo com dono, evidência, risco, correção e reteste."
  ],
  "learningOutcomes": [
    "Dado um escopo aprovado, o aluno define uma validação de portas segura e proporcional.",
    "Dado um resultado de porta filtrada, o aluno propõe evidências adicionais antes de concluir bloqueio correto.",
    "Dado um serviço inesperado, o aluno classifica risco e aciona o dono com evidência adequada.",
    "Dado um alerta do SOC de scan, o aluno diferencia validação autorizada de atividade suspeita usando contexto.",
    "Dado um pipeline de infraestrutura, o aluno propõe guardrails para impedir portas públicas indevidas.",
    "Dado um ambiente cloud, o aluno cruza resultado ativo com SG/NSG, NACL, route table, LB, WAF e flow logs."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Depois de mapear a superfície de ataque autorizada, o próximo passo defensivo é confirmar o que realmente responde na rede. Uma planilha pode dizer que um servidor só deveria expor HTTPS, mas a realidade pode mostrar SSH aberto, porta administrativa esquecida, banco exposto por engano, serviço antigo ainda escutando ou load balancer apontando para backend errado.</p>\n  <p>Varredura de portas, quando feita com autorização, escopo, janela e intensidade controlada, é uma forma de validação defensiva. Ela responde perguntas práticas: quais hosts estão ativos, quais portas parecem abertas, quais portas estão filtradas, quais serviços aparentam responder, quais controles estão funcionando e onde existe divergência entre desenho esperado e realidade observada.</p>\n  <div class=\"callout callout--warning\"><strong>Regra de ouro:</strong> ferramenta não substitui autorização. Nesta aula, toda validação é defensiva, documentada, em ativos próprios ou laboratório, sem técnicas de evasão, sem tentativa de exploração e sem tocar sistemas fora do escopo aprovado.</div>\n  <p>Para quem trabalha com Segurança da Informação, essa aula conecta redes, Blue Team, SOC, DevSecOps e governança. A pergunta não é “como escanear tudo”, mas “como validar controles sem causar impacto, gerar evidência útil e transformar diferença entre esperado e observado em melhoria defensiva”.</p>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n\n  <p>Nos primeiros ambientes TCP/IP, administradores usavam ferramentas simples para testar se um host estava vivo e se um serviço aceitava conexão. Com o crescimento da internet, surgiram ferramentas de descoberta e auditoria capazes de verificar hosts, portas, filtros e serviços em larga escala. O Nmap se tornou uma das ferramentas mais conhecidas nesse contexto, sendo descrito pelo próprio projeto como utilitário livre e open source para descoberta de rede e auditoria de segurança.</p>\n  <p>Com o tempo, a mesma técnica passou a ter dois usos bem diferentes. Em um uso legítimo, equipes de segurança validam inventário, higienizam exposição, conferem regras de firewall e reduzem risco. Em uso não autorizado, a mesma ideia pode ser parte de reconhecimento hostil. Por isso, empresas maduras tratam varredura como atividade controlada, registrada em ROE, comunicada ao SOC e integrada ao processo de mudança.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Administração de rede:</strong> testar conectividade e serviço ativo.</div><div class=\"timeline-item\"><strong>Auditoria técnica:</strong> comparar portas reais com portas esperadas.</div><div class=\"timeline-item\"><strong>Cloud e DevSecOps:</strong> validar exposição criada por IaC, LB, SG, NSG, ingress e pipelines.</div><div class=\"timeline-item\"><strong>SOC moderno:</strong> correlacionar varredura autorizada com logs para calibrar detecção.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema central é a divergência entre documentação e realidade. A arquitetura diz “somente 443 público”, mas existe 8080 aberto. A regra diz “administração apenas via VPN”, mas há porta 22 exposta para internet. O catálogo diz “serviço desativado”, mas ele ainda responde. O time diz “o firewall bloqueia”, mas a origem autorizada consegue chegar. O SOC diz “detectamos scans”, mas não diferencia validação autorizada de comportamento suspeito.</p>\n  <p>Também há risco operacional. Uma varredura mal planejada pode gerar falso alarme, degradar equipamento antigo, acionar rate limit, afetar serviço sensível, produzir ruído no SIEM ou ser confundida com ataque. Por isso, validação defensiva profissional precisa de autorização, escopo, janela, intensidade, identificação da origem, contatos de emergência e critérios de parada.</p>\n  <ul>\n    <li><strong>Risco técnico:</strong> portas e serviços expostos fora do desenho aprovado;</li>\n    <li><strong>Risco operacional:</strong> validação agressiva causando impacto ou alerta desnecessário;</li>\n    <li><strong>Risco de interpretação:</strong> confundir porta filtrada, fechada, aberta, serviço indisponível e bloqueio por política;</li>\n    <li><strong>Risco de governança:</strong> achado sem dono, sem evidência e sem recomendação acionável.</li>\n  </ul>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A evolução didática é sair de “rodar uma ferramenta” para “validar uma hipótese”. A hipótese pode ser: “o banco não deve estar acessível fora da subnet privada”, “o WAF deve ser o único ponto público da aplicação”, “a VPN deve permitir apenas portas necessárias”, “o security group novo não deveria abrir administração para a internet”, ou “o pipeline deve reprovar recurso com porta administrativa pública”.</p>\n  <p>Validação defensiva moderna combina fontes. A varredura mostra o que parece responder a partir de uma origem específica. Flow logs mostram se houve tráfego aceito ou rejeitado. Firewall logs mostram regra aplicada. Inventário cloud mostra configuração. SIEM mostra alerta. IaC mostra intenção. Ticket de mudança mostra autorização. Só a combinação dessas fontes permite conclusão confiável.</p>\n  <p>A aula também antecipa uma ideia importante para threat hunting: varreduras legítimas e ilegítimas podem produzir sinais parecidos na rede. A diferença está no escopo, origem, janela, padrão, ticket, usuário, volume, destino e contexto.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Varredura de portas</strong> é a validação controlada de quais portas de transporte parecem abertas, fechadas ou filtradas em um ativo ou conjunto de ativos. Ela não prova sozinha que uma vulnerabilidade existe; ela indica exposição e orienta investigação.</p>\n  <p><strong>Validação defensiva</strong> é o processo de comparar o estado observado da rede com o estado esperado e aprovado, usando evidências, limites operacionais e finalidade de redução de risco. Em vez de procurar “invadir”, ela procura responder: o controle está funcionando? A regra está correta? O serviço é esperado? O dono reconhece? Há log? Há monitoramento?</p>\n  <div class=\"comparison-table\"><table><thead><tr><th>Resultado</th><th>Interpretação inicial</th><th>Cuidado</th></tr></thead><tbody><tr><td>Aberta</td><td>Existe resposta compatível com serviço naquela porta.</td><td>Não significa vulnerabilidade; exige contexto.</td></tr><tr><td>Fechada</td><td>Host respondeu que não há serviço naquela porta.</td><td>Confirma alcance até o host, mas não serviço.</td></tr><tr><td>Filtrada</td><td>Não foi possível determinar por causa de filtro, firewall ou perda.</td><td>Não conclua bloqueio correto sem logs.</td></tr><tr><td>Timeout</td><td>Sem resposta no tempo esperado.</td><td>Pode ser rota, firewall, host, serviço, perda ou assimetria.</td></tr></tbody></table></div>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Internamente, a validação depende do comportamento de TCP, UDP e ICMP. Em TCP, uma tentativa de conexão pode receber SYN-ACK, indicando que algo aceita conexão; RST, indicando porta fechada ou rejeição; ou nenhuma resposta, sugerindo filtro, perda, caminho incompleto ou política silenciosa. Em UDP, não há handshake, então a ausência de resposta é ambígua: o serviço pode existir e ficar silencioso, pode não existir, pode estar bloqueado ou o ICMP de erro pode ter sido filtrado.</p>\n  <p>Também importa a origem. Testar de dentro da LAN não equivale a testar da internet. Testar de uma subnet spoke não equivale a testar do hub. Testar de uma VPN de usuário não equivale a testar do runner de CI. A regra efetiva pode mudar por rota, NAT, firewall, SG/NSG, NACL, policy, proxy, WAF ou identidade.</p>\n  <p>Por isso, uma conclusão profissional sempre informa: origem, destino, porta, protocolo, horário, ferramenta, método, resultado, evidência de log, regra aplicada, baseline esperado e interpretação. Sem esses campos, o teste vira opinião.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura defensiva de varredura não começa pela ferramenta. Ela começa pelo processo. O fluxo recomendado é: ROE aprovada, lista de ativos, janela, origem identificada, intensidade controlada, comunicação com SOC, execução, coleta de logs, comparação com baseline, classificação de divergências, abertura de tickets, correção, reteste e RCA quando necessário.</p>\n  <p>Em ambientes corporativos, a origem de validação costuma ser um host controlado, um runner seguro, uma subnet de auditoria, um sensor interno ou uma ferramenta de gestão de vulnerabilidades. Em cloud, é comum validar de múltiplos pontos: internet controlada, VPC/VNet, hub de segurança, VPN, spoke, cluster Kubernetes e ambiente de CI/CD.</p>\n  <div class=\"callout callout--info\"><strong>Arquitetura mínima:</strong> escopo aprovado + origem identificada + janela + controle de intensidade + logs + SIEM + dono do ativo + ticket + reteste.</div>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Imagine um prédio corporativo. A documentação diz que apenas a recepção e a entrada de funcionários estão abertas. A validação defensiva é caminhar com autorização, durante uma inspeção combinada, verificando quais portas realmente abrem, quais exigem crachá, quais estão trancadas, quais têm câmera e quais foram esquecidas abertas.</p>\n  <p>O objetivo não é arrombar portas. O objetivo é confirmar se o prédio está conforme o plano de segurança. Se uma porta de manutenção estiver aberta, o relatório precisa dizer onde está, quem é responsável, qual risco gera, qual evidência existe e como corrigir.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Em um laboratório local, o aluno possui três máquinas fictícias: um servidor web, um servidor de banco e um host administrativo. O desenho esperado diz que o servidor web deve expor 80 e 443 apenas dentro do laboratório, o banco não deve aceitar conexão externa e o host administrativo só deve aceitar SSH a partir de uma subnet de gestão.</p>\n  <p>A validação defensiva consiste em testar, de uma origem autorizada, se o comportamento observado bate com o esperado. Se a porta 5432 do banco responder a partir de uma rede comum, isso não é “prova de invasão”; é evidência de exposição indevida que precisa ser correlacionada com firewall, regra de host, rota, dono e ticket de mudança.</p>\n  <pre><code># Exemplo didático em rede de laboratório/documentação, nunca em terceiros:\n# validar apenas portas aprovadas no escopo e registrar origem, horário e ticket.\nnmap -sT -p 22,80,443,5432 192.0.2.10</code></pre>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Em uma empresa, o SOC recebe alerta de varredura partindo de uma subnet interna. Em vez de tratar automaticamente como incidente, o analista cruza origem, janela, ticket e ROE. Descobre que era uma validação autorizada do time de segurança, com escopo restrito aos servidores de homologação.</p>\n  <p>No mesmo teste, a equipe encontra uma porta administrativa aberta em produção, mas sem ticket. A investigação mostra que a exceção foi criada para troubleshooting emergencial e nunca removida. O resultado profissional é: evidência, risco, dono, correção, reteste e melhoria de processo para exceções temporárias expirarem automaticamente.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Em cloud, a varredura defensiva precisa considerar security groups, NSGs, NACLs, route tables, firewalls gerenciados, load balancers, private endpoints, NAT, WAF e DNS. Uma porta aberta observada da internet pode ser o load balancer, não a VM. Uma porta aparentemente fechada pode estar bloqueada por WAF, SG, NACL ou rota ausente.</p>\n  <p>Um caso comum: uma aplicação deveria ser acessada apenas por Private Link, mas também possui endpoint público ativo. A validação defensiva compara DNS público, DNS privado, configuração do serviço gerenciado, regras de rede, logs de acesso e fluxo real. A correção não é apenas fechar a porta; pode envolver DNS privado, política de endpoint, firewall, IAM, alertas e bloqueio preventivo em IaC.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, varredura defensiva pode ser usada como teste de conformidade após deploy em ambiente controlado. O pipeline cria infraestrutura com Terraform, aplica policies e executa validação limitada contra o endpoint criado. Se um serviço administrativo aparecer público, o pipeline falha e abre evidência para correção.</p>\n  <p>O ponto importante é evitar scans genéricos e agressivos em pipeline. O teste deve ser específico: portas esperadas, origem controlada, ambiente de teste, timeout razoável, limite de tentativas e integração com logs. Para infraestrutura, é ainda melhor combinar teste ativo com análise estática de IaC, policy as code e revisão de mudanças.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Para o Blue Team, varreduras autorizadas ajudam em três frentes. Primeiro, validam exposição e menor privilégio. Segundo, calibram detecções do SOC: quais alertas disparam, quais logs chegam, quais campos identificam origem e destino. Terceiro, ajudam a diferenciar comportamento conhecido de comportamento suspeito.</p>\n  <p>Más práticas incluem escanear fora do escopo, executar em horário de pico sem aviso, tentar identificar versões sensíveis sem necessidade, ignorar sistemas legados, não avisar o SOC, não registrar origem, não preservar logs e tratar todo resultado como vulnerabilidade. Boas práticas incluem ROE, menor intensidade, fontes cruzadas, evidência, dono e reteste.</p>\n  <div class=\"callout callout--danger\"><strong>Limite ético:</strong> esta aula não ensina exploração, evasão, anonimização, bypass ou persistência. O objetivo é validação defensiva de portas e controles em ambientes autorizados.</div>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente hosts de laboratório ou ativos aprovados em ROE, com taxa controlada, janela definida e comunicação ao SOC/NOC.</p><p><strong>Ações proibidas:</strong> Usar scripts intrusivos; Tentar exploração; Aumentar agressividade sem aprovação; Escanear internet ou redes de terceiros; Ignorar alerta do SOC.</p><p><strong>Meta defensiva:</strong> Usar validação de portas como controle de inventário, hardening e detecção, sem transformar o laboratório em exploração.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama mostra o fluxo seguro de validação defensiva: autorização, origem controlada, ativos em escopo, controles de rede, evidências e tratamento do achado.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Fluxo de varredura defensiva autorizada\">\n    <svg viewBox=\"0 0 980 420\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-4-content-diagram-1-title svg-16-4-content-diagram-1-desc\">\n      <title id=\"svg-16-4-content-diagram-1-title\">Varredura de portas e validação defensiva</title>\n      <desc id=\"svg-16-4-content-diagram-1-desc\">Diagrama pedagógico da aula 16.4, Varredura de portas e validação defensiva, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-1604\" markerWidth=\"10\" markerHeight=\"10\" refX=\"9\" refY=\"3\" orient=\"auto\"><path d=\"M0,0 L0,6 L9,3 z\"></path></marker>\n      </defs>\n      <rect x=\"30\" y=\"30\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-box\"></rect>\n      <text x=\"115\" y=\"62\" text-anchor=\"middle\" class=\"svg-title\">ROE</text>\n      <text x=\"115\" y=\"86\" text-anchor=\"middle\" class=\"svg-small\">escopo, janela, limites</text>\n      <rect x=\"250\" y=\"30\" width=\"170\" height=\"80\" rx=\"14\" class=\"svg-box\"></rect>\n      <text x=\"335\" y=\"62\" text-anchor=\"middle\" class=\"svg-title\">Origem controlada</text>\n      <text x=\"335\" y=\"86\" text-anchor=\"middle\" class=\"svg-small\">host/sensor autorizado</text>\n      <rect x=\"470\" y=\"30\" width=\"190\" height=\"80\" rx=\"14\" class=\"svg-box\"></rect>\n      <text x=\"565\" y=\"62\" text-anchor=\"middle\" class=\"svg-title\">Ativos em escopo</text>\n      <text x=\"565\" y=\"86\" text-anchor=\"middle\" class=\"svg-small\">IP, DNS, LB, serviço</text>\n      <rect x=\"720\" y=\"30\" width=\"200\" height=\"80\" rx=\"14\" class=\"svg-box\"></rect>\n      <text x=\"820\" y=\"62\" text-anchor=\"middle\" class=\"svg-title\">Controles</text>\n      <text x=\"820\" y=\"86\" text-anchor=\"middle\" class=\"svg-small\">FW, SG, WAF, NACL</text>\n      <line x1=\"200\" y1=\"70\" x2=\"250\" y2=\"70\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n      <line x1=\"420\" y1=\"70\" x2=\"470\" y2=\"70\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n      <line x1=\"660\" y1=\"70\" x2=\"720\" y2=\"70\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n      <rect x=\"110\" y=\"180\" width=\"190\" height=\"80\" rx=\"14\" class=\"svg-box svg-box--accent\"></rect>\n      <text x=\"205\" y=\"212\" text-anchor=\"middle\" class=\"svg-title\">Resultado observado</text>\n      <text x=\"205\" y=\"236\" text-anchor=\"middle\" class=\"svg-small\">aberta, fechada, filtrada</text>\n      <rect x=\"390\" y=\"180\" width=\"190\" height=\"80\" rx=\"14\" class=\"svg-box svg-box--accent\"></rect>\n      <text x=\"485\" y=\"212\" text-anchor=\"middle\" class=\"svg-title\">Evidências</text>\n      <text x=\"485\" y=\"236\" text-anchor=\"middle\" class=\"svg-small\">logs, flows, SIEM, ticket</text>\n      <rect x=\"670\" y=\"180\" width=\"190\" height=\"80\" rx=\"14\" class=\"svg-box svg-box--accent\"></rect>\n      <text x=\"765\" y=\"212\" text-anchor=\"middle\" class=\"svg-title\">Achado defensivo</text>\n      <text x=\"765\" y=\"236\" text-anchor=\"middle\" class=\"svg-small\">risco, dono, correção</text>\n      <line x1=\"565\" y1=\"110\" x2=\"205\" y2=\"180\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n      <line x1=\"820\" y1=\"110\" x2=\"485\" y2=\"180\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n      <line x1=\"300\" y1=\"220\" x2=\"390\" y2=\"220\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n      <line x1=\"580\" y1=\"220\" x2=\"670\" y2=\"220\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n      <rect x=\"250\" y=\"320\" width=\"480\" height=\"60\" rx=\"14\" class=\"svg-box svg-box--success\"></rect>\n      <text x=\"490\" y=\"348\" text-anchor=\"middle\" class=\"svg-title\">Reteste + melhoria preventiva</text>\n      <text x=\"490\" y=\"370\" text-anchor=\"middle\" class=\"svg-small\">corrigir regra, policy as code, alerta e documentação</text>\n      <line x1=\"765\" y1=\"260\" x2=\"530\" y2=\"320\" class=\"svg-line\" marker-end=\"url(#arrow-1604)\"></line>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula é um exercício de validação defensiva controlada. Você vai montar um plano de varredura de portas para ambiente fictício, comparar o observado com o esperado e produzir um relatório acionável. O foco não é quantidade de portas testadas, mas qualidade da evidência e segurança operacional.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — portas observadas versus baseline</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>host,zone,port,proto,service,baseline,observed_by,action\nlab-web-01,dmz,443,tcp,https,expected,authorized-scan,keep\nlab-web-01,dmz,22,tcp,ssh,unexpected,authorized-scan,restrict-to-bastion\nlab-api-01,app,8080,tcp,http-alt,expected,authorized-scan,keep\nlab-db-01,db,5432,tcp,postgres,expected-internal-only,flowlog,validate-source</code></pre><p><strong>Tarefa:</strong> Compare portas observadas com baseline, sem usar scripts intrusivos. Proponha correção e evidência pós-correção.</p><p><strong>Ideia de detecção:</strong> <code>observed.port NOT IN baseline OR service.exposure_scope_mismatch=true</code></p><p><strong>Achado esperado:</strong> SSH exposto na DMZ deve ser restrito ao bastion; PostgreSQL precisa validação de origem permitida.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios treinam interpretação. Você vai distinguir porta aberta, fechada, filtrada, serviço esperado, serviço indevido, falha de rota, bloqueio por firewall, falso positivo e achado real.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio pede que você desenhe um programa mínimo de validação defensiva recorrente para portas e serviços, integrado com SOC, cloud, DevSecOps, tickets de mudança e reteste.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada reforça que varredura defensiva madura começa em ROE, cruza evidências e termina em correção rastreável, não em lista solta de portas.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Nesta aula, você aprendeu que varredura de portas é uma técnica de validação defensiva quando executada com autorização, escopo e método. Ela mostra o estado observado a partir de uma origem, mas precisa ser interpretada junto com logs, rotas, políticas, inventário, tickets e contexto de negócio.</p>\n  <p>Você também aprendeu que resultados como aberta, fechada, filtrada e timeout não são conclusões finais. Eles são sinais. A conclusão profissional exige evidência, dono, risco, recomendação, reteste e prevenção de recorrência.</p>\n  <div class=\"callout callout--success\"><strong>Resumo prático:</strong> varrer sem escopo é risco; varrer sem evidência é ruído; varrer sem dono é desperdício; varrer com método reduz superfície e melhora detecção.</div>\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Usar validação de portas como controle de inventário, hardening e detecção, sem transformar o laboratório em exploração. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, você estudará <strong>16.5 — DNS, HTTP/TLS e indicadores de comprometimento</strong>. O foco será transformar sinais de aplicação e resolução de nomes em evidências defensivas para SOC, threat hunting e resposta a incidentes.</p>\n\n</section>"
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
    "dependsOn": [
      "Módulo 15 Troubleshooting de Redes",
      "Módulo 16 Aula 16.2",
      "Módulo 16 Aula 16.3"
    ],
    "connectsTo": [
      "SOC",
      "Gestão de Vulnerabilidades",
      "Attack Surface Management",
      "Cloud Security",
      "DevSecOps",
      "Firewall Governance",
      "Threat Hunting"
    ]
  },
  "lab": {
    "id": "lab-16.4",
    "title": "Laboratório: validação defensiva de portas e serviços em escopo autorizado",
    "labType": "cloud",
    "objective": "Planejar, executar conceitualmente e documentar uma validação de portas segura para ativos fictícios, comparando estado esperado com estado observado e produzindo achados acionáveis.",
    "scenario": "A empresa Atlas Educação possui um portal web público, uma API de parceiros, um servidor administrativo acessível por VPN, um banco privado, um load balancer cloud, um cluster Kubernetes e um firewall central. A ROE autoriza validação de baixa intensidade apenas em quatro ativos de laboratório e somente nas portas documentadas no plano.",
    "topology": [
      "Origem de validação identificada em subnet de auditoria",
      "Portal web atrás de WAF e load balancer",
      "API de parceiros com TLS e autenticação",
      "Servidor administrativo restrito à VPN",
      "Banco privado em subnet de dados",
      "Firewall central, SG/NSG, flow logs e SIEM",
      "Pipeline IaC com política de portas permitidas"
    ],
    "architecture": "ROE → lista de ativos → baseline esperado → validação controlada → logs correlacionados → divergências → ticket → correção → reteste → melhoria preventiva.",
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
      "Em cloud real, remova os recursos criados ao final para evitar custos recorrentes.",
      "Este laboratório é exclusivamente defensivo e exige escopo autorizado.",
      "Não execute exploração, evasão, persistência, brute force, interceptação de tráfego real ou coleta de credenciais.",
      "Use dados sintéticos sempre que possível e preserve apenas metadados necessários.",
      "Informe SOC/NOC antes de testes que possam gerar alertas.",
      "Pare imediatamente se houver impacto operacional não previsto ou alvo fora do escopo.",
      "Usar somente os dados sintéticos fornecidos nesta aula ou dados internos autorizados e sanitizados.",
      "Não executar consulta, conexão, download, varredura ou teste contra domínios e IPs reais a partir do dataset.",
      "Não incluir payload, credencial, segredo, dado pessoal ou conteúdo de pacote real no relatório."
    ],
    "steps": [
      {
        "number": 1,
        "title": "Confirmar escopo autorizado e critérios de parada",
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente hosts de laboratório ou ativos aprovados em ROE, com taxa controlada, janela definida e comunicação ao SOC/NOC.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: ROE da varredura | Comando usado | Resultado bruto | Comparação com baseline | Logs do SOC/NDR | Correção e validação pós-correção",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Confirmar escopo e autorização",
        "instruction": "Liste ativos, portas, origens, janela, intensidade permitida, contatos e critérios de parada definidos pela ROE.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de validação sem ambiguidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Montar baseline esperado",
        "instruction": "Para cada ativo fictício, registre quais portas deveriam responder e de quais origens.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela com ativo, função, ambiente, portas esperadas, controles e dono.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Definir método seguro",
        "instruction": "Escolha validação de baixa intensidade, portas específicas e timeout razoável; evite varredura ampla, evasiva ou fora da janela.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Método proporcional ao risco operacional.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Executar validação em laboratório",
        "instruction": "Em ambiente próprio, valide apenas portas aprovadas e registre comando, origem, destino, horário e resultado. Use IPs de documentação ou laboratório, nunca terceiros.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Resultados observados por porta e protocolo.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Correlacionar com logs",
        "instruction": "Compare resultado com firewall logs, flow logs, WAF/LB logs, logs do host e SIEM.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz resultado observado versus controle aplicado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Interpretar divergências",
        "instruction": "Classifique diferenças: porta esperada aberta, porta inesperada aberta, porta esperada fechada, filtro indevido, timeout sem explicação ou falso positivo.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista de divergências com severidade preliminar.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Criar achados acionáveis",
        "instruction": "Para cada divergência relevante, escreva ativo, porta, origem, evidência, risco, dono, recomendação, prazo e critério de reteste.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Achados defensivos prontos para ticket.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Definir correção e compensação",
        "instruction": "Proponha fechamento de porta, restrição de origem, ajuste de SG/NSG, regra de firewall, WAF, VPN, Private Link ou remoção de serviço legado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de remediação com rollback.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Retestar e fechar evidência",
        "instruction": "Após correção simulada, repita validação controlada e anexe evidência de fechamento.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Demonstração objetiva de que o estado observado agora bate com o esperado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Prevenir recorrência",
        "instruction": "Crie guardrails: policy as code para portas públicas, alerta para SG/NSG amplo, revisão de exceções e teste pós-deploy.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Controle preventivo além da correção pontual.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Varredura de portas e validação defensiva” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Porta nova em servidor crítico | Sinal: Serviço escutando fora do baseline | Query: dst_host=critical AND dst_port NOT IN baseline_ports | FP: Deploy aprovado não atualizado no baseline\nDetecção: Varredura não autorizada | Sinal: Muitas tentativas para portas diferentes | Query: count_distinct(dst_port)>N BY src_ip,dst_ip | FP: Ferramenta de monitoramento\nDetecção: Serviço bindado incorretamente | Sinal: Porta interna exposta em interface pública | Query: listen_addr=0.0.0.0 AND expected_scope=localhost/internal | FP: Container proxy legítimo",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Fechar listener desnecessário | Restringir origem | Atualizar baseline com aprovação | Isolar host que inicia varredura não autorizada | Manter evidência do antes/depois",
        "expectedOutput": "Plano de contenção com dono, risco, impacto, comunicação, rollback e validação.",
        "explanation": "Resposta de segurança deve ser precisa. Bloqueios amplos podem esconder evidências e quebrar serviços críticos."
      },
      {
        "number": 15,
        "title": "Fazer debrief e lições aprendidas",
        "instruction": "Finalize registrando achados, evidências, falsos positivos, melhorias, controles permanentes e pendências.",
        "command": "Debrief: achado → evidência → risco → mitigação → detecção → dono → prazo.",
        "expectedOutput": "Relatório defensivo reproduzível e acionável.",
        "explanation": "O valor do laboratório aparece quando o resultado vira melhoria operacional, não apenas conhecimento individual."
      },
      {
        "number": 16,
        "title": "Analisar dataset sintético do caso",
        "instruction": "Compare portas observadas com baseline, sem usar scripts intrusivos. Proponha correção e evidência pós-correção.",
        "artifact": "host,zone,port,proto,service,baseline,observed_by,action\nlab-web-01,dmz,443,tcp,https,expected,authorized-scan,keep\nlab-web-01,dmz,22,tcp,ssh,unexpected,authorized-scan,restrict-to-bastion\nlab-api-01,app,8080,tcp,http-alt,expected,authorized-scan,keep\nlab-db-01,db,5432,tcp,postgres,expected-internal-only,flowlog,validate-source",
        "analysisTask": "Aplicar a ideia de detecção: observed.port NOT IN baseline OR service.exposure_scope_mismatch=true",
        "evidence": "Baseline de portas | Resultado sintético da varredura autorizada | Firewall/flow log | Evidência pós-correção",
        "expectedOutput": "SSH exposto na DMZ deve ser restrito ao bastion; PostgreSQL precisa validação de origem permitida.",
        "explanation": "O objetivo é treinar raciocínio defensivo usando metadados fictícios e seguros, sem execução ofensiva nem interação com infraestrutura real."
      },
      {
        "number": 17,
        "title": "Separar fato, hipótese e falso positivo",
        "instruction": "Crie uma tabela com três colunas: fatos observados no dataset, hipóteses defensivas e falsos positivos prováveis.",
        "analysisTask": "Classificar cada evidência como fato, inferência ou lacuna. Não declarar incidente sem correlação suficiente.",
        "expectedOutput": "Tabela com fatos, hipóteses, falsos positivos e próximos dados necessários.",
        "explanation": "Essa separação evita conclusões precipitadas e ensina investigação baseada em evidência."
      },
      {
        "number": 18,
        "title": "Construir mini timeline defensiva",
        "instruction": "Ordene os eventos sintéticos por horário e indique qual fonte confirma cada etapa.",
        "analysisTask": "Montar timeline com timestamp, fonte, evento, interpretação, confiança e próxima ação.",
        "expectedOutput": "Timeline curta capaz de sustentar decisão de contenção, hunting ou descarte como falso positivo.",
        "explanation": "Timeline é o elo entre log isolado e narrativa técnica defensável."
      }
    ],
    "expectedResult": "Dossiê de validação defensiva com escopo, baseline, método, evidências, divergências, achados, correções, reteste e melhorias preventivas.",
    "validation": [
      {
        "check": "A entrega deve provar autorização, rastreabilidade e proporcionalidade. Nenhum item fora de escopo deve ser testado ou relatado como achado confirmado.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "A entrega deve provar autorização, rastreabilidade e proporcionalidade. Nenhum item fora de escopo deve ser testado ou relatado como achado confirmado.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Escopo autorizado comprovado",
        "command": "Revisar ROE/checklist",
        "expected": "Alvos, janela, origem, ações permitidas, proibidas e critérios de parada estão documentados.",
        "ifFails": "Não executar o laboratório até formalizar escopo."
      },
      {
        "check": "Detecções com falso positivo tratado",
        "command": "Revisar tabela de detecção",
        "expected": "Cada detecção possui sinal, fonte de log, falso positivo provável e resposta.",
        "ifFails": "Adicionar contexto, exceções e enriquecimento antes de operacionalizar."
      },
      {
        "check": "Mitigação com rollback",
        "command": "Revisar plano de contenção",
        "expected": "Toda ação de contenção tem dono, impacto, retorno e validação.",
        "ifFails": "Trocar bloqueio amplo por ação específica e reversível."
      },
      {
        "check": "Dataset sintético analisado com evidência e falso positivo",
        "command": "Revisar relatório do laboratório",
        "expected": "O relatório contém dataset analisado, fatos, hipóteses, falsos positivos, timeline e contenção proporcional.",
        "ifFails": "Revisar o dataset e separar evidência objetiva de inferência antes de concluir."
      }
    ],
    "troubleshooting": [
      {
        "symptom": "Se o exercício virar lista de portas, volte ao baseline: qual era o esperado, qual origem foi usada, qual controle deveria aplicar e qual evidência comprova a conclusão.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "O SOC abriu alerta durante o laboratório",
        "probableCause": "A atividade defensiva foi confundida com incidente ou estava fora da janela comunicada.",
        "howToConfirm": "Compare timestamp, origem e técnica com o ROE.",
        "fix": "Pausar execução, comunicar o ponto focal, registrar evidência e retomar apenas com autorização."
      },
      {
        "symptom": "O achado parece grave, mas há pouco contexto",
        "probableCause": "Falta enriquecimento de identidade, dono, criticidade, processo ou baseline.",
        "howToConfirm": "Verifique CMDB, IAM, EDR, janela de mudança e histórico do ativo.",
        "fix": "Classificar como hipótese até obter evidência suficiente."
      },
      {
        "symptom": "A mitigação proposta quebra serviço crítico",
        "probableCause": "Ação ampla demais ou dependência não mapeada.",
        "howToConfirm": "Cruze matriz de fluxos, dono do serviço e logs de uso.",
        "fix": "Criar contenção específica, exceção temporária ou tabletop antes de produção."
      }
    ],
    "improvements": [
      "Automatizar validações pós-deploy em laboratório.",
      "Integrar resultados com CMDB e inventário cloud.",
      "Criar alerta para portas administrativas públicas.",
      "Revisar exceções temporárias mensalmente.",
      "Calibrar regras do SIEM para varredura autorizada versus suspeita.",
      "Converter achados repetíveis em detecções no SIEM/NDR.",
      "Adicionar owner, validade e revisão periódica para exceções.",
      "Automatizar validações defensivas em pipeline ou policy as code quando seguro.",
      "Criar runbook de resposta com evidências mínimas e rollback.",
      "Revisar retenção e qualidade dos logs necessários para investigação."
    ],
    "evidenceToCollect": [
      "Resumo do cenário e das premissas",
      "Tabela, diagrama ou artefato produzido",
      "Resultado das validações",
      "Lista de problemas encontrados e correções propostas",
      "Capturas de tela ou saídas de comandos relevantes",
      "Comprovação de limpeza ou plano para remoção dos recursos cloud",
      "ROE da varredura",
      "Comando usado",
      "Resultado bruto",
      "Comparação com baseline",
      "Logs do SOC/NDR",
      "Correção e validação pós-correção",
      "Baseline de portas",
      "Resultado sintético da varredura autorizada",
      "Firewall/flow log",
      "Evidência pós-correção"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Varredura de portas e validação defensiva” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: programa de validação defensiva de portas",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Usar validação de portas como controle de inventário, hardening e detecção, sem transformar o laboratório em exploração.",
    "authorizedScope": "Somente hosts de laboratório ou ativos aprovados em ROE, com taxa controlada, janela definida e comunicação ao SOC/NOC.",
    "allowedActions": [
      "Executar varredura de descoberta aprovada",
      "Comparar portas com baseline",
      "Validar logging do firewall/NDR",
      "Classificar serviços esperados e inesperados"
    ],
    "prohibitedActions": [
      "Usar scripts intrusivos",
      "Tentar exploração",
      "Aumentar agressividade sem aprovação",
      "Escanear internet ou redes de terceiros",
      "Ignorar alerta do SOC"
    ],
    "telemetrySources": [
      "Firewall logs",
      "NDR/IDS alerts",
      "Flow logs",
      "EDR network events",
      "Scanner logs",
      "CMDB/baseline de portas",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Porta nova em servidor crítico",
        "signal": "Serviço escutando fora do baseline",
        "queryIdea": "dst_host=critical AND dst_port NOT IN baseline_ports",
        "commonFalsePositive": "Deploy aprovado não atualizado no baseline",
        "response": "Confirmar mudança, atualizar baseline ou fechar porta."
      },
      {
        "name": "Varredura não autorizada",
        "signal": "Muitas tentativas para portas diferentes",
        "queryIdea": "count_distinct(dst_port)>N BY src_ip,dst_ip",
        "commonFalsePositive": "Ferramenta de monitoramento",
        "response": "Validar origem; se indevida, bloquear origem e investigar endpoint."
      },
      {
        "name": "Serviço bindado incorretamente",
        "signal": "Porta interna exposta em interface pública",
        "queryIdea": "listen_addr=0.0.0.0 AND expected_scope=localhost/internal",
        "commonFalsePositive": "Container proxy legítimo",
        "response": "Alterar bind address ou regra de exposição."
      }
    ],
    "containmentActions": [
      "Fechar listener desnecessário",
      "Restringir origem",
      "Atualizar baseline com aprovação",
      "Isolar host que inicia varredura não autorizada",
      "Manter evidência do antes/depois"
    ],
    "evidenceChecklist": [
      "ROE da varredura",
      "Comando usado",
      "Resultado bruto",
      "Comparação com baseline",
      "Logs do SOC/NDR",
      "Correção e validação pós-correção"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — portas observadas versus baseline",
      "theme": "varredura defensiva controlada",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "host,zone,port,proto,service,baseline,observed_by,action",
        "lab-web-01,dmz,443,tcp,https,expected,authorized-scan,keep",
        "lab-web-01,dmz,22,tcp,ssh,unexpected,authorized-scan,restrict-to-bastion",
        "lab-api-01,app,8080,tcp,http-alt,expected,authorized-scan,keep",
        "lab-db-01,db,5432,tcp,postgres,expected-internal-only,flowlog,validate-source"
      ],
      "analysisPrompt": "Compare portas observadas com baseline, sem usar scripts intrusivos. Proponha correção e evidência pós-correção.",
      "detectionIdea": "observed.port NOT IN baseline OR service.exposure_scope_mismatch=true",
      "expectedFinding": "SSH exposto na DMZ deve ser restrito ao bastion; PostgreSQL precisa validação de origem permitida.",
      "evidenceToCollect": [
        "Baseline de portas",
        "Resultado sintético da varredura autorizada",
        "Firewall/flow log",
        "Evidência pós-correção"
      ],
      "constraints": [
        "Não executar tráfego contra destinos reais a partir do dataset.",
        "Tratar todos os nomes, IPs e usuários como fictícios.",
        "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
        "Preservar somente metadados necessários para o exercício."
      ]
    }
  },
  "exercises": [
    {
      "question": "Uma porta 22 aparece aberta em servidor público, mas o time diz que é temporária. Quais evidências você exige?",
      "answer": "Ticket aprovado, dono, origem permitida, prazo de expiração, justificativa, logs, regra específica, controle compensatório e plano de remoção/reteste."
    },
    {
      "question": "Por que porta filtrada não prova automaticamente que o firewall está correto?",
      "answer": "Porque pode haver perda, rota errada, assimetria, host desligado, NACL, SG, ACL intermediária ou teste feito da origem errada. É preciso correlacionar logs e configuração."
    },
    {
      "question": "Qual é a diferença entre serviço aberto e vulnerabilidade confirmada?",
      "answer": "Serviço aberto indica exposição. Vulnerabilidade exige evidência adicional de falha, versão, configuração ou comportamento inseguro, sempre dentro do escopo."
    },
    {
      "question": "Como DevSecOps ajuda a reduzir portas indevidas?",
      "answer": "Com IaC revisado, policy as code, testes pós-deploy, tags obrigatórias, aprovação para exposição pública e alerta de drift."
    },
    {
      "id": "ex16.4.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Varredura defensiva de portas e serviços” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como Firewall logs, NDR/IDS alerts, Flow logs, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.4.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Usar scripts intrusivos: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Tentar exploração: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Aumentar agressividade sem aprovação: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.4.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — portas observadas versus baseline”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "SSH exposto na DMZ deve ser restrito ao bastion; PostgreSQL precisa validação de origem permitida. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual é o objetivo correto de uma varredura defensiva?",
      "options": [
        "Explorar sistemas sem autorização",
        "Validar se portas e controles batem com o estado esperado",
        "Ocultar origem para evitar logs",
        "Testar ativos de terceiros para comparação"
      ],
      "answer": 1,
      "explanation": "A finalidade é validar exposição e controles dentro de escopo aprovado."
    },
    {
      "question": "O que uma porta aberta indica inicialmente?",
      "options": [
        "Vulnerabilidade confirmada",
        "Serviço ou componente respondendo naquela porta",
        "Ataque em andamento",
        "Ausência de firewall"
      ],
      "answer": 1,
      "explanation": "Porta aberta é sinal de exposição, não prova isolada de vulnerabilidade."
    },
    {
      "question": "Por que registrar a origem do teste é obrigatório?",
      "options": [
        "Porque a origem altera rotas, políticas e interpretação do resultado",
        "Apenas por estética do relatório",
        "Para permitir escanear fora de escopo",
        "Porque elimina necessidade de logs"
      ],
      "answer": 0,
      "explanation": "A regra efetiva depende da origem: internet, VPN, subnet, hub, spoke ou pipeline."
    },
    {
      "question": "Qual prática é inadequada em validação defensiva?",
      "options": [
        "Avisar o SOC",
        "Usar janela aprovada",
        "Testar portas específicas",
        "Executar varredura ampla fora de escopo"
      ],
      "answer": 3,
      "explanation": "Varredura ampla fora de escopo viola autorização e aumenta risco operacional e legal."
    },
    {
      "question": "Qual fonte ajuda a interpretar se uma conexão foi permitida ou negada?",
      "options": [
        "Somente o print do terminal",
        "Firewall logs, flow logs e SIEM",
        "Apenas o nome DNS",
        "Apenas a intuição do analista"
      ],
      "answer": 1,
      "explanation": "Logs de controles e telemetria permitem confirmar regra aplicada e caminho."
    },
    {
      "question": "O que torna um achado acionável?",
      "options": [
        "Ser alarmista",
        "Ter evidência, contexto, dono, risco, recomendação e critério de reteste",
        "Listar muitas portas sem contexto",
        "Não citar origem"
      ],
      "answer": 1,
      "explanation": "Achado acionável permite decisão, correção e validação posterior."
    }
  ],
  "flashcards": [
    {
      "front": "Varredura defensiva",
      "back": "Validação autorizada de portas e serviços para comparar estado observado com estado esperado."
    },
    {
      "front": "Porta aberta",
      "back": "Indício de que algum serviço ou componente respondeu naquela porta; exige contexto."
    },
    {
      "front": "Porta filtrada",
      "back": "Resultado ambíguo em que filtro, perda, rota ou política impede conclusão direta."
    },
    {
      "front": "ROE",
      "back": "Regras de engajamento que definem escopo, método, janela, limites e critérios de parada."
    },
    {
      "front": "Hit count/log",
      "back": "Evidência operacional de que uma regra ou controle foi acionado por tráfego."
    },
    {
      "front": "Reteste",
      "back": "Validação após correção para confirmar que o estado observado passou a bater com o esperado."
    }
  ],
  "mentorQuestions": [
    "Como você explicaria para um gestor a diferença entre porta aberta e vulnerabilidade?",
    "Quais sinais mostram que uma varredura detectada pelo SOC era autorizada?",
    "Como você desenharia um teste de pipeline para impedir portas administrativas públicas sem gerar ruído?"
  ],
  "challenge": {
    "title": "Desafio: programa de validação defensiva de portas",
    "scenario": "Você precisa criar uma rotina mensal para validar exposição de portas em uma empresa híbrida com internet, VPN, cloud, Kubernetes e datacenter.",
    "tasks": [
      "Definir escopo e exclusões.",
      "Criar baseline de portas esperadas por tipo de ativo.",
      "Definir origem, janela e intensidade.",
      "Planejar comunicação com SOC.",
      "Definir evidências obrigatórias.",
      "Criar critérios de severidade.",
      "Propor correção, reteste e guardrails DevSecOps."
    ],
    "successCriteria": [
      "Nenhum ativo fora de escopo.",
      "Resultados interpretados com logs e contexto.",
      "Achados possuem dono e evidência.",
      "Exceções têm prazo e compensação.",
      "Há prevenção de recorrência via policy as code e alertas."
    ],
    "constraints": [
      "Não executar ações fora do escopo autorizado.",
      "Não usar dados sensíveis reais quando dados sintéticos ou metadados bastarem.",
      "Toda detecção deve citar falso positivo provável.",
      "Toda mitigação deve possuir rollback e comunicação.",
      "Usar somente dados sintéticos ou logs internos autorizados e sanitizados.",
      "Não interagir com infraestrutura real de terceiros a partir de IOCs ou nomes do exercício."
    ],
    "expectedDeliverables": [
      "Regras de engajamento ou escopo defensivo",
      "Matriz de telemetria e evidências",
      "Detecções com falsos positivos",
      "Plano de contenção e rollback",
      "Debrief com lições aprendidas",
      "Análise de dataset sintético",
      "Timeline defensiva com fatos e hipóteses",
      "Tabela de falsos positivos e próximos dados necessários"
    ],
    "gradingRubric": [
      {
        "criterion": "Ética, escopo e segurança operacional",
        "points": 20,
        "description": "Define claramente autorização, limites, ações proibidas, critérios de parada e proteção de evidências."
      },
      {
        "criterion": "Detecção e resposta defensiva",
        "points": 20,
        "description": "Cria detecções com telemetria adequada, falsos positivos, resposta proporcional e rollback."
      }
    ]
  },
  "commentedSolution": {
    "summary": "Uma solução madura trata varredura como controle de governança técnica: pequena, autorizada, rastreável, correlacionada e conectada à correção.",
    "steps": [
      "Reutilizar ROE da aula 16.2.",
      "Usar inventário da aula 16.3 como fonte de escopo.",
      "Definir portas esperadas por função de ativo.",
      "Executar validação limitada em laboratório ou origem controlada.",
      "Cruzar resultados com logs de firewall, flow logs, LB, WAF e SIEM.",
      "Classificar divergências por risco e criticidade.",
      "Abrir tickets com dono, prazo e evidência.",
      "Retestar e criar guardrails preventivos.",
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
    ],
    "commonMistakes": [
      "Escanear fora do escopo.",
      "Não avisar SOC.",
      "Tratar porta aberta como vulnerabilidade automática.",
      "Ignorar origem do teste.",
      "Não correlacionar logs.",
      "Corrigir manualmente sem atualizar IaC."
    ],
    "commonWrongAnswers": [
      {
        "answer": "Executar teste ativo sem ROE porque é apenas laboratório",
        "whyItIsWrong": "Mesmo laboratório pode alcançar ativos errados, gerar alertas, coletar dados sensíveis ou ensinar um hábito inseguro. Segurança profissional começa por escopo."
      }
    ],
    "finalAnswer": "Complemento P1-M16: uma solução completa precisa demonstrar ética operacional, escopo autorizado, evidências protegidas, detecções com falsos positivos, contenção proporcional e melhoria contínua."
  },
  "glossary": [
    {
      "term": "Varredura de portas",
      "definition": "Técnica de verificar quais portas de transporte parecem abertas, fechadas ou filtradas em ativos autorizados."
    },
    {
      "term": "Validação defensiva",
      "definition": "Comparação controlada entre estado esperado e estado observado para reduzir risco."
    },
    {
      "term": "Porta filtrada",
      "definition": "Resultado em que a ferramenta não consegue determinar abertura por bloqueio, perda ou ausência de resposta."
    },
    {
      "term": "Baseline de portas",
      "definition": "Lista aprovada de portas e serviços esperados por ativo, ambiente e origem."
    },
    {
      "term": "Critério de parada",
      "definition": "Condição definida na ROE para interromper a atividade em caso de impacto, alerta ou comportamento inesperado."
    },
    {
      "term": "Reteste defensivo",
      "definition": "Nova validação controlada após correção para comprovar fechamento do achado."
    },
    {
      "term": "Regras de engajamento",
      "shortDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "longDefinition": "Documento que define escopo, limites, janela, técnicas permitidas, comunicação e critérios de parada de uma validação de segurança.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.4",
        "16.12"
      ]
    },
    {
      "term": "Falso positivo",
      "shortDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "longDefinition": "Evento que parece suspeito pela regra, mas possui explicação legítima após enriquecimento e análise.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.4",
        "16.12"
      ]
    },
    {
      "term": "NDR",
      "shortDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "longDefinition": "Network Detection and Response: capacidade de detectar, investigar e responder usando telemetria de rede.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.4",
        "16.12"
      ]
    },
    {
      "term": "Pacote de evidências",
      "shortDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "longDefinition": "Conjunto mínimo de logs, artefatos, horários, fontes e interpretações que sustenta uma conclusão defensiva.",
      "example": "Usado nos laboratórios defensivos do M16 para conectar técnica, governança e investigação.",
      "relatedTerms": [
        "Blue Team",
        "SIEM",
        "telemetria",
        "incidente"
      ],
      "relatedLessons": [
        "16.1",
        "16.4",
        "16.12"
      ]
    },
    {
      "term": "Dataset sintético",
      "shortDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "longDefinition": "Conjunto fictício de logs ou eventos criado para treinar investigação sem expor dados reais.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "PCAP textual",
      "shortDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "longDefinition": "Representação sanitizada de metadados de pacotes, útil para ensino sem compartilhar captura real sensível.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    },
    {
      "term": "Timeline de incidente",
      "shortDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "longDefinition": "Sequência cronológica de fatos, hipóteses e evidências usadas para reconstruir um evento de segurança.",
      "example": "Usado no M16 para simular investigação Blue Team com segurança operacional.",
      "relatedTerms": [
        "Blue Team",
        "DFIR",
        "SIEM",
        "Zeek",
        "NetFlow"
      ],
      "relatedLessons": [
        "16.8",
        "16.10",
        "16.11",
        "16.12"
      ]
    }
  ],
  "references": [
    {
      "title": "NIST SP 800-115 — Technical Guide to Information Security Testing and Assessment",
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final",
      "type": "framework"
    },
    {
      "title": "Nmap Reference Guide",
      "url": "https://nmap.org/book/man.html",
      "type": "official-documentation"
    },
    {
      "title": "Nmap Host Discovery Reference",
      "url": "https://nmap.org/book/man-host-discovery.html",
      "type": "official-documentation"
    },
    {
      "title": "CISA Cyber Hygiene Services",
      "url": "https://www.cisa.gov/cyber-hygiene-services",
      "type": "guidance"
    }
  ],
  "security": {
    "goodPractices": [
      "Executar atividades práticas apenas em laboratório, ambiente próprio ou escopo formalmente autorizado.",
      "Registrar regras de engajamento, janelas de teste, alvos permitidos e contatos de emergência.",
      "Priorizar validação defensiva: logs, detecção, contenção, mitigação e redução de superfície.",
      "Evitar instruções que ensinem abuso contra redes reais fora de autorização explícita.",
      "Conectar cada técnica estudada a controles de prevenção, monitoramento e resposta.",
      "Definir escopo, autorização, janela, origem dos testes e critérios de parada antes de qualquer validação.",
      "Tratar logs e evidências como dados sensíveis, com mínimo necessário, retenção definida e controle de acesso.",
      "Correlacionar rede, identidade, endpoint e cloud antes de concluir causa ou gravidade.",
      "Preferir mitigação específica, reversível e documentada em vez de bloqueios amplos.",
      "Transformar achados recorrentes em detecções, runbooks e controles automatizados."
    ],
    "badPractices": [
      "Testar redes, serviços ou terceiros sem autorização formal e escopo definido.",
      "Confundir laboratório educacional com permissão para atuar em ambiente real.",
      "Guardar credenciais, PCAPs ou logs sensíveis sem proteção e sem necessidade.",
      "Publicar detalhes exploráveis sem mitigação, contexto defensivo ou autorização.",
      "Executar varreduras agressivas sem janela, rate limit, owner e plano de rollback.",
      "Executar teste ativo sem regras de engajamento formalizadas.",
      "Confundir validação defensiva com permissão para exploração.",
      "Usar ferramenta de segurança sem entender impacto, taxa, escopo e logs gerados.",
      "Bloquear ativos críticos sem plano de rollback e comunicação.",
      "Registrar achado sem evidência reproduzível."
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz confirmada.",
      "Executar múltiplas mudanças ao mesmo tempo e perder rastreabilidade.",
      "Não diferenciar mitigação temporária de correção definitiva.",
      "Não coletar evidências antes da alteração que pode apagar estado relevante.",
      "Não relacionar segurança de redes, Blue Team, pentest autorizado, detecção, resposta e limites éticos com impacto operacional, financeiro e de segurança.",
      "Concluir incidente a partir de um único IOC sem contexto.",
      "Ignorar falsos positivos de ferramentas corporativas legítimas.",
      "Não preservar timestamp, fonte e integridade mínima da evidência.",
      "Criar regra de firewall ou SIEM sem dono, validade e revisão.",
      "Testar fora da janela aprovada por parecer tecnicamente simples."
    ],
    "vulnerabilities": [
      {
              "name": "Risco Blue Team específico — Varredura de portas e validação defensiva",
              "description": "Em Varredura de portas e validação defensiva, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
              "defensiveExplanation": "O risco aparece quando datasets, PCAPs, flow logs e indicadores são analisados sem baseline, autorização, falso positivo, cadeia mínima de evidência ou contenção proporcional.",
              "mitigation": "Usar datasets sintéticos ou logs autorizados e sanitizados, definir ROE, preservar evidências, correlacionar múltiplas fontes, documentar falso positivo e aplicar mitigação reversível e proporcional."
      },
      {
        "name": "Perda de evidências durante troubleshooting ou laboratório",
        "description": "Mudanças manuais, limpeza de logs, reinicializações e testes sem registro podem destruir informações necessárias para RCA ou investigação de segurança.",
        "defensiveExplanation": "A preservação de evidências permite distinguir falha operacional, mudança indevida, abuso e comportamento esperado.",
        "mitigation": "Registrar linha do tempo, exportar logs relevantes, coletar outputs, preservar PCAPs quando aplicável e manter cadeia mínima de custódia em incidentes."
      },
      {
        "name": "Validação defensiva sem escopo formal",
        "description": "Mesmo atividades de Blue Team podem causar impacto, expor dados ou violar regras quando não há escopo, janela, alvos e critérios de parada documentados.",
        "defensiveExplanation": "O risco não está apenas na técnica, mas na ausência de governança operacional. Segurança profissional exige autorização, evidência e proporcionalidade.",
        "mitigation": "Criar ROE, comunicar SOC/NOC, limitar taxa e escopo, preservar logs e definir rollback antes da execução."
      }
    ],
    "monitoring": [
      "Logs de firewall, proxy, DNS, DHCP, VPN, EDR, NDR, SIEM, NetFlow/IPFIX e autenticação.",
      "Alertas de varredura, beaconing, conexões laterais, exfiltração e anomalias de volume.",
      "Evidências de escopo autorizado, horários de teste e owners dos ativos analisados.",
      "Firewall logs",
      "NDR/IDS alerts",
      "Flow logs",
      "EDR network events",
      "Scanner logs",
      "CMDB/baseline de portas"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.4.",
      "Porta nova em servidor crítico — sinal: Serviço escutando fora do baseline; ideia de consulta: dst_host=critical AND dst_port NOT IN baseline_ports; falso positivo comum: Deploy aprovado não atualizado no baseline.",
      "Varredura não autorizada — sinal: Muitas tentativas para portas diferentes; ideia de consulta: count_distinct(dst_port)>N BY src_ip,dst_ip; falso positivo comum: Ferramenta de monitoramento.",
      "Serviço bindado incorretamente — sinal: Porta interna exposta em interface pública; ideia de consulta: listen_addr=0.0.0.0 AND expected_scope=localhost/internal; falso positivo comum: Container proxy legítimo."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente hosts de laboratório ou ativos aprovados em ROE, com taxa controlada, janela definida e comunicação ao SOC/NOC.",
      "allowedActions": [
        "Executar varredura de descoberta aprovada",
        "Comparar portas com baseline",
        "Validar logging do firewall/NDR",
        "Classificar serviços esperados e inesperados"
      ],
      "prohibitedActions": [
        "Usar scripts intrusivos",
        "Tentar exploração",
        "Aumentar agressividade sem aprovação",
        "Escanear internet ou redes de terceiros",
        "Ignorar alerta do SOC"
      ],
      "stopConditions": [
        "Indício de impacto em produção não previsto.",
        "Alvo, técnica ou origem fora do escopo aprovado.",
        "Coleta acidental de dado sensível além do mínimo necessário.",
        "Alerta do SOC/NOC indicando risco operacional.",
        "Ausência de responsável disponível para decisão."
      ]
    }
  },
  "troubleshooting": {
    "symptoms": [
      "Falha ou comportamento inesperado relacionado a Varredura de portas e validação defensiva.",
      "Funciona para uma origem, mas falha para outra.",
      "Funciona por IP, mas falha por nome.",
      "Conecta, mas não autoriza ou não completa a transação.",
      "Mudança recente coincide com aumento de erros, latência, drops ou alertas."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, desde quando ocorre e quem é afetado?",
      "Qual fluxo esperado conecta origem, destino, DNS, rota, política, serviço e logs?",
      "Houve mudança recente de IaC, firewall, DNS, certificado, identidade, rota ou aplicação?",
      "Quais evidências confirmam ou negam a hipótese principal?",
      "A mitigação proposta reduz impacto sem ampliar risco de segurança?",
      "Qual evidência comprova o entendimento da aula 16.4?"
    ],
    "commands": [
      {
        "platform": "Defensivo/SIEM",
        "command": "consultar logs de firewall, DNS, proxy, VPN, EDR e NetFlow dentro do escopo autorizado",
        "purpose": "Validar evidências de comportamento suspeito ou de teste controlado.",
        "expectedObservation": "Eventos correlacionados por origem, destino, horário, usuário e ação.",
        "interpretation": "Sem correlação temporal e escopo, a evidência pode ser ruído ou falso positivo."
      },
      {
        "platform": "Linux laboratório",
        "command": "ss -tulpen && ip route && tcpdump -ni <iface> host <ip_autorizado>",
        "purpose": "Observar serviços, rotas e pacotes apenas em ambiente autorizado.",
        "expectedObservation": "Tráfego compatível com o cenário de laboratório.",
        "interpretation": "Pacotes fora do esperado indicam hipótese defensiva para investigação, não autorização para atacar terceiros."
      },
      {
        "platform": "Blue Team",
        "command": "documentar IOC, hipótese, fonte de log, severidade, impacto e mitigação",
        "purpose": "Transformar observação técnica em investigação defensiva acionável.",
        "expectedObservation": "Registro claro, reprodutível e útil para resposta.",
        "interpretation": "Achados sem contexto e mitigação não amadurecem a defesa."
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
      "16.5"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Varredura defensiva de portas e serviços",
    "defensiveGoal": "Usar validação de portas como controle de inventário, hardening e detecção, sem transformar o laboratório em exploração.",
    "authorizedScope": "Somente hosts de laboratório ou ativos aprovados em ROE, com taxa controlada, janela definida e comunicação ao SOC/NOC.",
    "allowedActions": [
      "Executar varredura de descoberta aprovada",
      "Comparar portas com baseline",
      "Validar logging do firewall/NDR",
      "Classificar serviços esperados e inesperados"
    ],
    "prohibitedActions": [
      "Usar scripts intrusivos",
      "Tentar exploração",
      "Aumentar agressividade sem aprovação",
      "Escanear internet ou redes de terceiros",
      "Ignorar alerta do SOC"
    ],
    "telemetrySources": [
      "Firewall logs",
      "NDR/IDS alerts",
      "Flow logs",
      "EDR network events",
      "Scanner logs",
      "CMDB/baseline de portas"
    ],
    "detectionEngineering": [
      {
        "name": "Porta nova em servidor crítico",
        "signal": "Serviço escutando fora do baseline",
        "queryIdea": "dst_host=critical AND dst_port NOT IN baseline_ports",
        "commonFalsePositive": "Deploy aprovado não atualizado no baseline",
        "response": "Confirmar mudança, atualizar baseline ou fechar porta."
      },
      {
        "name": "Varredura não autorizada",
        "signal": "Muitas tentativas para portas diferentes",
        "queryIdea": "count_distinct(dst_port)>N BY src_ip,dst_ip",
        "commonFalsePositive": "Ferramenta de monitoramento",
        "response": "Validar origem; se indevida, bloquear origem e investigar endpoint."
      },
      {
        "name": "Serviço bindado incorretamente",
        "signal": "Porta interna exposta em interface pública",
        "queryIdea": "listen_addr=0.0.0.0 AND expected_scope=localhost/internal",
        "commonFalsePositive": "Container proxy legítimo",
        "response": "Alterar bind address ou regra de exposição."
      }
    ],
    "ndrSiemMapping": {
      "minimumFields": [
        "timestamp",
        "src_ip",
        "src_zone",
        "src_user_or_identity",
        "dst_ip",
        "dst_fqdn",
        "dst_port",
        "protocol",
        "action",
        "bytes_in",
        "bytes_out",
        "device_or_sensor",
        "rule_or_policy",
        "correlation_id"
      ],
      "enrichment": [
        "CMDB owner",
        "criticidade do ativo",
        "zona de rede",
        "identidade",
        "geolocalização aproximada",
        "categoria do destino",
        "janela de mudança"
      ],
      "retentionGuidance": "Manter metadados de rede por tempo compatível com investigação, auditoria e requisitos legais. Evitar armazenar conteúdo sensível quando metadados bastam."
    },
    "containmentPlaybook": [
      "Fechar listener desnecessário",
      "Restringir origem",
      "Atualizar baseline com aprovação",
      "Isolar host que inicia varredura não autorizada",
      "Manter evidência do antes/depois"
    ],
    "evidencePackage": [
      "ROE da varredura",
      "Comando usado",
      "Resultado bruto",
      "Comparação com baseline",
      "Logs do SOC/NDR",
      "Correção e validação pós-correção"
    ],
    "successCriteria": [
      "O escopo autorizado está explícito e verificável.",
      "As ações proibidas estão documentadas antes de qualquer teste.",
      "Cada achado possui evidência, fonte, horário e interpretação.",
      "A detecção proposta possui hipótese, campo de log, falso positivo provável e resposta.",
      "A mitigação é proporcional, reversível e não cria risco maior que o problema."
    ],
    "debriefQuestions": [
      "Que evidência permitiria defender essa conclusão em uma revisão técnica?",
      "Qual falso positivo mais provável precisa ser tratado?",
      "Qual ação de contenção reduziria risco sem destruir evidência?",
      "O que deve virar controle contínuo depois do laboratório?"
    ]
  },
  "blueTeamSyntheticDataset": {
    "title": "Dataset sintético — portas observadas versus baseline",
    "theme": "varredura defensiva controlada",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "host,zone,port,proto,service,baseline,observed_by,action",
      "lab-web-01,dmz,443,tcp,https,expected,authorized-scan,keep",
      "lab-web-01,dmz,22,tcp,ssh,unexpected,authorized-scan,restrict-to-bastion",
      "lab-api-01,app,8080,tcp,http-alt,expected,authorized-scan,keep",
      "lab-db-01,db,5432,tcp,postgres,expected-internal-only,flowlog,validate-source"
    ],
    "analysisPrompt": "Compare portas observadas com baseline, sem usar scripts intrusivos. Proponha correção e evidência pós-correção.",
    "detectionIdea": "observed.port NOT IN baseline OR service.exposure_scope_mismatch=true",
    "expectedFinding": "SSH exposto na DMZ deve ser restrito ao bastion; PostgreSQL precisa validação de origem permitida.",
    "evidenceToCollect": [
      "Baseline de portas",
      "Resultado sintético da varredura autorizada",
      "Firewall/flow log",
      "Evidência pós-correção"
    ],
    "constraints": [
      "Não executar tráfego contra destinos reais a partir do dataset.",
      "Tratar todos os nomes, IPs e usuários como fictícios.",
      "Separar fato observado, hipótese, falso positivo e decisão de contenção.",
      "Preservar somente metadados necessários para o exercício."
    ]
  },
  "linksToOtherCourses": [
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Zero Trust, identidade e acesso corporativo",
      "lesson": "Identidade, contexto, autorização e menor privilégio em ambientes empresariais",
      "reason": "Controles de rede não substituem identidade; decisões modernas combinam segmentação, autenticação, autorização e contexto."
    },
    {
      "course": "Enterprise Identity, IAM e Segurança de Acessos",
      "module": "Governança, RBAC e auditoria de acessos",
      "lesson": "RBAC, políticas, revisão de acessos, trilhas de auditoria e segregação de funções",
      "reason": "Arquiteturas corporativas exigem que rede, identidade, logs e governança sejam avaliados em conjunto."
    },
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Observabilidade, SRE e resposta a incidentes",
      "lesson": "Observabilidade aplicada a serviços, logs, métricas, traces e runbooks",
      "reason": "Esta aula de redes usa evidências, telemetria, logs, métricas ou playbooks que serão aprofundados em observabilidade e SRE."
    }
  ]
};
