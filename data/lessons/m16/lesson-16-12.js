export const lesson1612 = {
  "id": "16.12",
  "moduleId": "m16",
  "order": 12,
  "title": "Projeto final: Blue Team + Pentest autorizado de rede",
  "subtitle": "Projeto integrador defensivo para validar controles de rede com escopo, ética, ROE, telemetria, Blue Team, relatório, RCA e melhoria contínua.",
  "duration": "360-540 min",
  "estimatedStudyTimeMinutes": 540,
  "difficulty": "avançado",
  "type": "projeto",
  "xp": 540,
  "tags": [
    "Blue Team",
    "pentest autorizado",
    "Purple Team",
    "regras de engajamento",
    "ROE",
    "validação defensiva",
    "SOC",
    "SIEM",
    "EDR",
    "NDR",
    "DFIR",
    "threat hunting",
    "segmentação",
    "egress control",
    "cloud security",
    "DevSecOps",
    "RCA",
    "playbook",
    "ética",
    "escopo autorizado",
    "evidências",
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
      "reason": "Escopo, ética, legalidade e ROE são pré-requisitos obrigatórios para validação autorizada."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.4",
      "reason": "Varredura defensiva ensina validação de portas e serviços dentro de escopo."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.7",
      "reason": "Movimento lateral e segmentação são cenários centrais do projeto final."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.10",
      "reason": "Threat hunting fornece hipóteses e fontes para medir cobertura defensiva."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.11",
      "reason": "DFIR de rede ensina preservação de evidências e reconstrução de timeline."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "módulos iniciais",
      "reason": "Identidade, MFA, grupos, service principals e menor privilégio aparecem na validação de acesso e resposta."
    }
  ],
  "objectives": [
    "Planejar uma validação autorizada de rede com escopo, ROE, janela, responsáveis, critérios de parada e comunicação.",
    "Transformar objetivos de segurança em hipóteses defensivas mensuráveis e evidências esperadas.",
    "Integrar Blue Team, SOC, rede, cloud, identidade, DevSecOps, jurídico, privacidade e donos de aplicação.",
    "Validar controles de segmentação, egress, DNS, HTTP/TLS, VPN, cloud networking, Kubernetes e telemetria sem exploração ofensiva.",
    "Produzir relatório com achados, evidências, impacto, risco, dono, prazo, mitigação, RCA e reteste.",
    "Converter aprendizados em playbooks, detecções, guardrails, policy as code e melhoria contínua."
  ],
  "learningOutcomes": [
    "Dado um ambiente híbrido, o aluno desenha escopo e ROE seguros para validação defensiva.",
    "Dado um fluxo crítico, o aluno identifica controles preventivos, detectivos e evidências esperadas.",
    "Dado um achado de segmentação, o aluno classifica risco, impacto e ação corretiva sem extrapolar evidências.",
    "Dado um alerta fraco, o aluno correlaciona SIEM, EDR, DNS, proxy, firewall, flow logs, cloud audit e tickets.",
    "Dado um relatório final, o aluno diferencia causa técnica, causa sistêmica, mitigação, correção e reteste.",
    "Dado um backlog de segurança, o aluno prioriza ações por risco, custo, esforço, impacto operacional e recorrência."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n  <p>Ao longo deste módulo, você viu como redes sustentam a cibersegurança: superfície de ataque, telemetria, segmentação, DNS, HTTP/TLS, MITM, movimento lateral, C2, exfiltração, threat hunting e DFIR. Agora vamos integrar tudo em um projeto final: <strong>Blue Team + pentest autorizado de rede</strong>.</p>\n  <p>A ideia não é ensinar invasão. A ideia é ensinar como uma organização madura valida seus próprios controles com autorização formal, regras de engajamento, fontes de evidência, detecções, playbooks, contenção proporcional, relatório executivo e melhoria contínua. Um teste autorizado sem Blue Team vira apenas uma lista de achados. Um Blue Team sem validação controlada pode acreditar em controles que nunca foram testados. O valor está na integração.</p>\n  <div class=\"callout callout--warning\"><strong>Limite ético desta aula:</strong> todo exercício é defensivo, autorizado e controlado. Não há instruções para explorar sistemas reais, burlar controles, obter persistência, esconder tráfego, coletar credenciais ou agir fora de escopo. O foco é governança, validação, detecção, resposta e aprendizado.</div>\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n  <p>Historicamente, testes de segurança eram muitas vezes conduzidos como atividades isoladas: uma equipe testava, entregava um relatório e a organização tentava corrigir depois. Com o amadurecimento de SOC, SIEM, EDR, NDR, cloud audit, DevSecOps e Zero Trust, o teste passou a ser também uma oportunidade de validar detecção, comunicação, resposta, governança e capacidade de recuperação.</p>\n  <p>Essa evolução levou a exercícios mais colaborativos. O Red Team ou equipe de teste autorizado mede a exposição e valida hipóteses. O Blue Team mede visibilidade, tempo de detecção, qualidade de alerta, capacidade de triagem e resposta. Purple Team é a colaboração estruturada entre esses lados. Em redes, isso significa testar se segmentação, egress control, DNS logging, proxy, firewall, flow logs, WAF, VPN, NAC e cloud controls realmente produzem evidências úteis.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Teste pontual:</strong> foco em achar falhas técnicas.</div><div class=\"timeline-item\"><strong>Auditoria e compliance:</strong> foco em evidência, escopo e controles.</div><div class=\"timeline-item\"><strong>SOC e SIEM:</strong> foco em detecção e resposta.</div><div class=\"timeline-item\"><strong>Cloud e DevSecOps:</strong> foco em guardrails, IaC e validação contínua.</div><div class=\"timeline-item\"><strong>Purple Team:</strong> foco em aprendizado compartilhado, cobertura e melhoria mensurável.</div></div>\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n  <p>O problema que esta aula resolve é comum: empresas investem em firewall, EDR, SIEM, WAF, DLP, proxy, VPN, cloud logs, segmentação e políticas, mas não sabem se esses controles funcionam juntos durante um evento real. A política pode existir, mas não bloquear. O log pode existir, mas não chegar ao SIEM. O alerta pode disparar, mas sem contexto. O playbook pode existir, mas ninguém saber executá-lo.</p>\n  <p>Outro problema é a validação mal governada. Um teste sem escopo claro pode gerar indisponibilidade, violar privacidade, causar conflito com equipes, produzir achados sem dono ou criar risco legal. Uma validação defensiva profissional precisa equilibrar profundidade técnica com controle operacional.</p>\n  <ul><li><strong>Sem ROE:</strong> ninguém sabe o que é permitido, proibido, condicionado ou critério de parada.</li><li><strong>Sem baseline:</strong> não é possível saber se o comportamento observado é anômalo.</li><li><strong>Sem telemetria:</strong> o teste acontece, mas a organização não enxerga nada.</li><li><strong>Sem donos:</strong> achados ficam sem correção.</li><li><strong>Sem RCA:</strong> corrige-se o sintoma, mas não a causa sistêmica.</li><li><strong>Sem reteste:</strong> a organização assume que corrigiu, mas não comprova.</li></ul>\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n  <p>A evolução natural é sair de testes heroicos e manuais para validação defensiva repetível. Isso inclui escopo versionado, matriz de fluxos, catálogo de controles, casos de uso de detecção, pipelines de IaC, políticas como código, ambientes de laboratório, change management, comunicação com SOC e relatórios orientados a risco.</p>\n  <p>Em cloud e DevSecOps, essa evolução é ainda mais importante. Uma regra de security group aberta, um endpoint público indevido, uma rota para internet, um DNS privado mal resolvido, uma exceção de WAF ou uma permissão ampla em service principal pode ser criada por pipeline. Portanto, parte do projeto final é transformar achados em guardrails preventivos, testes automatizados, revisões de arquitetura e playbooks.</p>\n  <p>A maturidade não está em “pegar alguém de surpresa”. Está em reduzir incerteza: saber o que deve ser detectado, onde será observado, quem será acionado, qual resposta é proporcional, como preservar evidências, como medir cobertura e como melhorar a arquitetura.</p>\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n  <p><strong>Blue Team + pentest autorizado de rede</strong> é um exercício defensivo em que uma organização valida controles de rede, detecção e resposta contra cenários previamente autorizados. O pentest autorizado mede exposição e falhas de controle. O Blue Team mede visibilidade, triagem, correlação, contenção e recuperação. O resultado final não é uma vitória de um lado sobre o outro; é uma melhoria mensurável da organização.</p>\n  <p>O exercício deve ter <strong>escopo</strong>, <strong>ROE</strong>, <strong>janela</strong>, <strong>ativos permitidos</strong>, <strong>métodos permitidos</strong>, <strong>contatos de emergência</strong>, <strong>critérios de parada</strong>, <strong>preservação de evidência</strong>, <strong>plano de comunicação</strong> e <strong>relatório de riscos</strong>. Sem isso, a atividade deixa de ser profissional.</p>\n  <div class=\"callout callout--info\"><strong>Conceito-chave:</strong> o teste autorizado deve validar controles, não provar habilidade individual. A pergunta principal é: “a organização consegue prevenir, detectar, responder e aprender com este cenário?”</div>\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n  <p>Internamente, o exercício funciona como uma cadeia de evidências e decisões. Primeiro, a equipe define o que será validado: exposição externa, segmentação, egress control, DNS, WAF, VPN, controles L2, cloud networking, Kubernetes, DLP ou detecção de C2. Depois, transforma cada objetivo em hipóteses defensivas.</p>\n  <p>Exemplo: “um servidor de aplicação não deve iniciar conexão direta para a internet”. Essa hipótese vira matriz de fluxo, regra de egress, logs esperados, alerta SIEM, evidências de proxy/firewall/flow log, resposta esperada e critério de sucesso. Se durante o teste surgir tráfego direto permitido, o achado não é apenas “porta liberada”: é falha de arquitetura, política, observabilidade ou processo.</p>\n  <p>O ciclo interno é: planejar, autorizar, executar validação controlada, observar, correlacionar, classificar, conter se necessário, documentar, corrigir, retestar e incorporar aprendizado. Essa cadeia evita que o exercício vire caos operacional.</p>\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n  <p>A arquitetura do exercício deve separar claramente quatro camadas: <strong>governança</strong>, <strong>validação controlada</strong>, <strong>telemetria defensiva</strong> e <strong>melhoria contínua</strong>.</p>\n  <p>A camada de governança contém ROE, escopo, autorização, privacidade, jurídico, comunicação, critérios de parada e responsáveis. A camada de validação contém os cenários permitidos e os ativos em escopo. A camada de telemetria contém SIEM, EDR, NDR, DNS logs, proxy, firewall, WAF, flow logs, cloud audit, Kubernetes audit e tickets. A camada de melhoria contém RCA, backlog, guardrails, policy as code, playbooks e reteste.</p>\n  <p>Em uma empresa real, essa arquitetura deve envolver rede, segurança, cloud, plataforma, DevSecOps, identidade, privacidade, jurídico, times de aplicação e gestão. Segurança de rede é interdisciplinar: um achado raramente pertence a uma única equipe.</p>\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n  <p>Pense em um simulado de incêndio em um hospital. O objetivo não é colocar pessoas em perigo nem provar que alguém sabe correr. O objetivo é verificar se alarmes funcionam, se rotas de fuga estão livres, se equipes conhecem papéis, se comunicação é clara, se pacientes críticos são protegidos e se o plano precisa melhorar.</p>\n  <p>O projeto final deste módulo é parecido. O “incêndio” é um cenário de risco de rede. O Blue Team observa sensores, interpreta sinais e responde. A validação autorizada pressiona controles dentro de limites seguros. O resultado esperado não é espetáculo; é aprendizado documentado, responsável e mensurável.</p>\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n  <p>Imagine uma pequena empresa com três zonas: usuários, servidores e internet. A política diz que estações de usuários não devem acessar diretamente o banco de dados. O exercício simples valida essa política sem explorar nada: revisar matriz de fluxos, confirmar regras de firewall, verificar se logs registram tentativas negadas, validar se o SIEM gera alerta quando há tentativa fora do padrão e documentar evidências.</p>\n  <p>Se a tentativa é bloqueada e registrada, o controle funciona. Se é permitida, há falha de segmentação. Se é bloqueada, mas não registrada, há falha de observabilidade. Se é registrada, mas ninguém recebe alerta, há falha de detecção. Se há alerta, mas ninguém sabe agir, há falha de playbook.</p>\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n  <p>Em uma organização corporativa, o exercício pode validar uma cadeia maior: usuário remoto acessa VPN com MFA, consulta DNS interno, acessa aplicação por proxy/reverse proxy, passa por firewall interno, chega a um serviço privado, que conversa com banco em outra zona. O objetivo é provar que cada salto tem política, log, dono e resposta.</p>\n  <p>O Blue Team acompanha EDR, VPN logs, DNS logs, proxy, firewall, WAF, NetFlow/IPFIX, SIEM e tickets. O time de rede observa rotas, NAT e regras. O time de identidade valida MFA, grupos e service accounts. O time de aplicação confirma comportamento esperado. O time de governança garante que achados tenham severidade, dono e prazo.</p>\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n  <p>Em cloud, o exercício pode validar uma Landing Zone: contas separadas, hub-spoke, firewall central, VPC/VNet flow logs, private endpoints, DNS privado, NAT controlado, Kubernetes privado e auditoria habilitada. O cenário autorizado pode verificar se workloads privados conseguem sair pela internet fora do caminho aprovado ou se conseguem acessar serviços gerenciados apenas por endpoint privado.</p>\n  <p>As evidências vêm de cloud audit, flow logs, DNS query logs, WAF/LB logs, firewall gerenciado, Kubernetes events, IAM, billing e SIEM. O objetivo não é apenas achar uma regra errada; é testar se guardrails detectam ou impedem a criação de exposição indevida e se o processo de exceção funciona.</p>\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n  <p>Em DevSecOps, o projeto final conecta achados a prevenção. Se o exercício descobre que uma subnet pública foi criada sem justificativa, a solução madura não é só fechar aquela subnet. É criar policy as code, validação de pull request, teste de IaC, template seguro e alerta para drift.</p>\n  <p>Da mesma forma, se uma aplicação publica um serviço sem WAF, sem health check ou sem logs, o backlog deve incluir guardrails de pipeline. O ideal é que uma falha encontrada no exercício vire teste automatizado para que não reapareça em outro projeto.</p>\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n  <p>Do ponto de vista de Segurança da Informação, a aula consolida a ponte entre arquitetura, detecção e resposta. Um achado de movimento lateral pode gerar segmentação. Um achado de C2 pode gerar regra de egress, caso de uso SIEM e enriquecimento de DNS. Um achado de exfiltração pode gerar DLP, limiar de anomalia e revisão de permissões. Um achado de VPN pode gerar revisão de grupos, MFA, postura do dispositivo e split tunnel.</p>\n  <p>A segurança madura evita dois extremos: ignorar risco por falta de evidência e bloquear tudo sem entender impacto. O projeto final ensina resposta proporcional baseada em evidência, risco e operação.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Ambiente de laboratório ou arquitetura simulada. Qualquer teste ativo deve estar amarrado a ROE, janela, alvo, taxa e critérios de parada.</p><p><strong>Ações proibidas:</strong> Explorar sistemas reais; Persistir acesso; Usar credenciais de terceiros; Causar indisponibilidade; Entregar relatório sem evidência.</p><p><strong>Meta defensiva:</strong> Integrar escopo, superfície, validação, detecção, resposta e relatório executivo em um exercício avaliável de conclusão do módulo.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n  <p>O diagrama mostra o ciclo do projeto final: governança autoriza, validação controlada testa, telemetria observa, Blue Team responde e melhoria contínua transforma achados em controles.</p>\n  <div class=\"svg-diagram\" role=\"img\" aria-label=\"Diagrama de projeto final Blue Team e pentest autorizado de rede\">\n    <svg viewBox=\"0 0 1180 640\" class=\"course-svg course-svg--wide\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-12-content-diagram-1-title svg-16-12-content-diagram-1-desc\">\n      <title id=\"svg-16-12-content-diagram-1-title\">Projeto final: Blue Team + Pentest autorizado de rede</title>\n      <desc id=\"svg-16-12-content-diagram-1-desc\">Diagrama pedagógico da aula 16.12, Projeto final: Blue Team + Pentest autorizado de rede, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow-1612\" viewBox=\"0 0 10 10\" refX=\"9\" refY=\"5\" markerWidth=\"6\" markerHeight=\"6\" orient=\"auto-start-reverse\">\n          <path d=\"M 0 0 L 10 5 L 0 10 z\" class=\"svg-marker\" />\n        </marker>\n      </defs>\n      <rect x=\"35\" y=\"35\" width=\"1110\" height=\"570\" rx=\"24\" class=\"svg-frame\" />\n      <text x=\"590\" y=\"78\" text-anchor=\"middle\" class=\"svg-title\">Projeto final — Blue Team + validação autorizada de rede</text>\n\n      <rect x=\"75\" y=\"130\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--governance\" />\n      <text x=\"170\" y=\"162\" text-anchor=\"middle\" class=\"svg-label\">Governança</text>\n      <text x=\"170\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">escopo, ROE</text>\n      <text x=\"170\" y=\"210\" text-anchor=\"middle\" class=\"svg-small\">privacidade, parada</text>\n\n      <rect x=\"330\" y=\"130\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--process\" />\n      <text x=\"425\" y=\"162\" text-anchor=\"middle\" class=\"svg-label\">Validação controlada</text>\n      <text x=\"425\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">fluxos, exposição</text>\n      <text x=\"425\" y=\"210\" text-anchor=\"middle\" class=\"svg-small\">segmentação, egress</text>\n\n      <rect x=\"585\" y=\"130\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--sensor\" />\n      <text x=\"680\" y=\"162\" text-anchor=\"middle\" class=\"svg-label\">Telemetria</text>\n      <text x=\"680\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">DNS, proxy, flow</text>\n      <text x=\"680\" y=\"210\" text-anchor=\"middle\" class=\"svg-small\">EDR, SIEM, cloud</text>\n\n      <rect x=\"840\" y=\"130\" width=\"190\" height=\"110\" rx=\"14\" class=\"svg-node svg-node--security\" />\n      <text x=\"935\" y=\"162\" text-anchor=\"middle\" class=\"svg-label\">Blue Team</text>\n      <text x=\"935\" y=\"188\" text-anchor=\"middle\" class=\"svg-small\">triagem, contenção</text>\n      <text x=\"935\" y=\"210\" text-anchor=\"middle\" class=\"svg-small\">DFIR, comunicação</text>\n\n      <rect x=\"150\" y=\"335\" width=\"210\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--control\" />\n      <text x=\"255\" y=\"367\" text-anchor=\"middle\" class=\"svg-label\">Achados</text>\n      <text x=\"255\" y=\"392\" text-anchor=\"middle\" class=\"svg-small\">risco, evidência</text>\n      <text x=\"255\" y=\"414\" text-anchor=\"middle\" class=\"svg-small\">impacto e dono</text>\n\n      <rect x=\"485\" y=\"335\" width=\"210\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--analysis\" />\n      <text x=\"590\" y=\"367\" text-anchor=\"middle\" class=\"svg-label\">RCA</text>\n      <text x=\"590\" y=\"392\" text-anchor=\"middle\" class=\"svg-small\">causa técnica</text>\n      <text x=\"590\" y=\"414\" text-anchor=\"middle\" class=\"svg-small\">causa sistêmica</text>\n\n      <rect x=\"820\" y=\"335\" width=\"210\" height=\"105\" rx=\"14\" class=\"svg-node svg-node--outcome\" />\n      <text x=\"925\" y=\"367\" text-anchor=\"middle\" class=\"svg-label\">Melhoria contínua</text>\n      <text x=\"925\" y=\"392\" text-anchor=\"middle\" class=\"svg-small\">guardrails, playbooks</text>\n      <text x=\"925\" y=\"414\" text-anchor=\"middle\" class=\"svg-small\">reteste e métricas</text>\n\n      <path d=\"M265 185 L330 185\" class=\"svg-arrow\" marker-end=\"url(#arrow-1612)\" />\n      <path d=\"M520 185 L585 185\" class=\"svg-arrow\" marker-end=\"url(#arrow-1612)\" />\n      <path d=\"M775 185 L840 185\" class=\"svg-arrow\" marker-end=\"url(#arrow-1612)\" />\n      <path d=\"M935 240 C930 300 330 300 255 335\" class=\"svg-arrow\" marker-end=\"url(#arrow-1612)\" />\n      <path d=\"M360 388 L485 388\" class=\"svg-arrow\" marker-end=\"url(#arrow-1612)\" />\n      <path d=\"M695 388 L820 388\" class=\"svg-arrow\" marker-end=\"url(#arrow-1612)\" />\n      <path d=\"M925 335 C910 270 220 275 170 240\" class=\"svg-arrow svg-arrow--muted\" marker-end=\"url(#arrow-1612)\" />\n\n      <text x=\"590\" y=\"535\" text-anchor=\"middle\" class=\"svg-caption\">Resultado esperado: controles validados, lacunas conhecidas, evidências preservadas, resposta treinada e melhorias priorizadas.</text>\n    </svg>\n  </div>\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n  <p>O laboratório final é um projeto completo de validação defensiva. Você não executará exploração nem ataques reais. Você irá desenhar o exercício, definir escopo, mapear controles, planejar evidências, criar playbooks, simular achados e produzir relatório final.</p>\n  <p>O objetivo é entregar um pacote que poderia ser apresentado a um gestor de segurança, equipe de rede, SOC, cloud, DevSecOps e auditoria.</p>\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — incidente integrado para capstone</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>Fonte 1 — DNS: ws-031 consultou a1b2c3d4.lab-tunnel.example quatro vezes com TTL 60.\nFonte 2 — Flow: ws-031 abriu sessões TLS de baixo volume para 203.0.113.77 a cada 60 segundos.\nFonte 3 — Proxy: categoria unknown, sem reputação interna, status 204, user-agent incomum.\nFonte 4 — EDR: processo powershell.exe iniciou conexão; hash não classificado no laboratório.\nFonte 5 — Firewall: regra egress-workstations permitiu saída 443 ampla.\nFonte 6 — Mudança: não há ticket aprovado para novo destino externo nessa janela.</code></pre><p><strong>Tarefa:</strong> Produza relatório final com escopo, hipótese, evidências, timeline, falsos positivos, contenção, rollback, melhoria arquitetural e detecção contínua.</p><p><strong>Ideia de detecção:</strong> <code>integrated case: rare DNS + periodic low-volume TLS + unusual process + broad egress rule + no change ticket</code></p><p><strong>Achado esperado:</strong> O caso é suspeita forte em laboratório e deve resultar em contenção proporcional, hunting por padrões similares e redução de egress amplo.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n  <p>Os exercícios reforçam o raciocínio integrado: cada cenário exige identificar escopo, controle esperado, evidência, possível lacuna, risco e ação de melhoria.</p>\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n  <p>O desafio final pede que você desenhe e documente uma validação autorizada de rede para uma empresa híbrida, conectando Blue Team, SOC, cloud, DevSecOps, identidade e governança.</p>\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n  <p>A solução comentada mostra um modelo de entrega profissional: ROE, matriz de fluxos, hipóteses defensivas, telemetria esperada, achados, RCA, backlog e reteste.</p>\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n  <p>Nesta aula, você consolidou o módulo 16 em um projeto final. Você aprendeu que validação autorizada de rede não é improviso técnico: é um exercício governado, ético, defensivo, mensurável e orientado a melhoria.</p>\n  <p>O principal resultado esperado é transformar conhecimento de redes em capacidade real de segurança: saber delimitar escopo, validar controles, coletar evidências, detectar sinais, responder proporcionalmente, comunicar riscos e melhorar arquitetura.</p>\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Integrar escopo, superfície, validação, detecção, resposta e relatório executivo em um exercício avaliável de conclusão do módulo. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n  <p>Na próxima etapa do curso, você entrará no <strong>Módulo 17 — Revisão, simulados, estudos de caso e projeto capstone final</strong>. O objetivo será consolidar todo o curso de Redes e Network, revisar fundamentos, praticar simulados e construir um portfólio final de arquitetura, defesa e diagnóstico ponta a ponta.</p>\n\n</section>"
  },
  "lab": {
    "id": "lab-16.12",
    "title": "Laboratório final — Blue Team + validação autorizada de rede",
    "labType": "cloud",
    "objective": "Construir um plano completo de validação defensiva de rede, com ROE, matriz de fluxos, hipóteses, telemetria, playbooks, relatório, RCA e plano de melhoria.",
    "scenario": "15. Laboratório O laboratório final é um projeto completo de validação defensiva. Você não executará exploração nem ataques reais. Você irá desenhar o exercício, definir escopo, mapear controles, planejar evidências, criar playbooks, simular achados e produzir relatório final. O objetivo é entregar um pacote que poderia ser apresentado a um gestor de segurança, equipe de rede, SOC, cloud, DevSecOps e auditoria.",
    "topology": [
      "Matriz corporativa",
      "Filial",
      "Usuários remotos via VPN/ZTNA",
      "Wi-Fi corporativo",
      "Datacenter legado",
      "Landing Zone cloud",
      "Hub de conectividade e segurança",
      "Spokes de aplicação",
      "Kubernetes gerenciado",
      "Serviços gerenciados privados",
      "SOC/SIEM",
      "EDR/NDR",
      "Pipeline DevSecOps"
    ],
    "architecture": [
      "Camada de governança: escopo, autorização, jurídico, privacidade, comunicação e critérios de parada",
      "Camada de validação: cenários autorizados e ativos em escopo",
      "Camada de controle: firewall, ACL, SG/NSG, WAF, proxy, DNS, DLP, NAC, IAM e egress control",
      "Camada de telemetria: logs de rede, endpoint, identidade, cloud, aplicação e SIEM",
      "Camada de melhoria: RCA, backlog, guardrails, policy as code, playbooks e reteste"
    ],
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Ambiente Kubernetes local opcional",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 540,
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
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Ambiente de laboratório ou arquitetura simulada. Qualquer teste ativo deve estar amarrado a ROE, janela, alvo, taxa e critérios de parada.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: ROE | Mapa de superfície | Matriz de controles | Resultados de validação | Detecções propostas | Playbook de resposta | Relatório final e rubrica",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Definir cenário corporativo",
        "instruction": "Descreva uma empresa híbrida com usuários, aplicações internas, cloud, Kubernetes, serviços gerenciados, VPN, DNS, proxy, firewall e SOC.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Cenário documentado com ativos, zonas, donos e fluxos críticos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Criar ROE",
        "instruction": "Defina escopo, fora de escopo, janela, origens autorizadas, métodos permitidos, métodos proibidos, contatos, privacidade e critérios de parada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Documento de regras de engajamento revisável e seguro.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Mapear fluxos críticos",
        "instruction": "Monte matriz origem-destino-protocolo-porta-identidade-dado-controle-log-dono para pelo menos 12 fluxos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Matriz de fluxos que permite validar segmentação e observabilidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Definir hipóteses defensivas",
        "instruction": "Crie hipóteses como: estações não acessam banco, workloads privados não saem direto para internet, DNS interno não vaza publicamente e tráfego administrativo exige bastion/MFA.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Lista de hipóteses com evidência esperada e critério de sucesso.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Planejar telemetria",
        "instruction": "Associe cada hipótese a fontes como SIEM, EDR, DNS, proxy, firewall, WAF, flow logs, cloud audit, Kubernetes audit, NDR e tickets.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de evidência com fonte, campo, retenção, dono e limitação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Simular achados defensivos",
        "instruction": "Sem executar exploração, descreva achados simulados: regra ampla, log ausente, alerta sem dono, endpoint público indevido, exceção permanente ou egress não monitorado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de achados com evidência simulada, impacto e severidade.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Desenhar resposta Blue Team",
        "instruction": "Para cada achado, defina triagem, contenção proporcional, preservação de evidência, comunicação, rollback e reteste.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Playbooks defensivos acionáveis.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Construir timeline e RCA",
        "instruction": "Crie uma linha do tempo dos eventos simulados e diferencie causa técnica, causa sistêmica, fator contribuinte e lacuna de governança.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "RCA sem culpa com ações preventivas.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Converter em DevSecOps",
        "instruction": "Transforme achados em guardrails: policy as code, validação de pull request, módulos IaC seguros, detecções versionadas e testes sintéticos.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Backlog preventivo vinculado a pipelines e governança.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Produzir relatório final",
        "instruction": "Monte relatório executivo e técnico com resumo, escopo, metodologia, evidências, riscos, impacto, recomendações, donos, prazos, reteste e métricas.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Entrega profissional do projeto final.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Definir métricas de sucesso",
        "instruction": "Estabeleça métricas como tempo de detecção, tempo de triagem, cobertura de logs, percentual de fluxos com dono, exceções vencidas e taxa de reteste aprovado.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Métricas para acompanhar melhoria contínua.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 14,
        "title": "Planejar próxima rodada",
        "instruction": "Defina cadência, mudanças de escopo, lições aprendidas e como repetir o exercício sem depender de heróis individuais.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de validação recorrente e sustentável.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Projeto final: Blue Team + Pentest autorizado de rede” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 15,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Achado sem evidência suficiente | Sinal: Relatório afirma risco sem log/artefato | Query: finding.evidence_count=0 | FP: Risco conceitual ainda não testado\nDetecção: Controle sem validação | Sinal: Política existe, mas não há teste/log | Query: control.status=declared AND validation=null | FP: Controle recém-criado\nDetecção: Resposta sem rollback | Sinal: Plano de contenção não tem retorno | Query: containment.rollback IS NULL | FP: Ação irreversível por design",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 16,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Tabletop antes de produção | Bloqueio específico com rollback | Isolamento por criticidade | Comunicação executiva | Registro de lições aprendidas",
        "expectedOutput": "Plano de contenção com dono, risco, impacto, comunicação, rollback e validação.",
        "explanation": "Resposta de segurança deve ser precisa. Bloqueios amplos podem esconder evidências e quebrar serviços críticos."
      },
      {
        "number": 17,
        "title": "Fazer debrief e lições aprendidas",
        "instruction": "Finalize registrando achados, evidências, falsos positivos, melhorias, controles permanentes e pendências.",
        "command": "Debrief: achado → evidência → risco → mitigação → detecção → dono → prazo.",
        "expectedOutput": "Relatório defensivo reproduzível e acionável.",
        "explanation": "O valor do laboratório aparece quando o resultado vira melhoria operacional, não apenas conhecimento individual."
      },
      {
        "number": 18,
        "title": "Analisar dataset sintético do caso",
        "instruction": "Produza relatório final com escopo, hipótese, evidências, timeline, falsos positivos, contenção, rollback, melhoria arquitetural e detecção contínua.",
        "artifact": "Fonte 1 — DNS: ws-031 consultou a1b2c3d4.lab-tunnel.example quatro vezes com TTL 60.\nFonte 2 — Flow: ws-031 abriu sessões TLS de baixo volume para 203.0.113.77 a cada 60 segundos.\nFonte 3 — Proxy: categoria unknown, sem reputação interna, status 204, user-agent incomum.\nFonte 4 — EDR: processo powershell.exe iniciou conexão; hash não classificado no laboratório.\nFonte 5 — Firewall: regra egress-workstations permitiu saída 443 ampla.\nFonte 6 — Mudança: não há ticket aprovado para novo destino externo nessa janela.",
        "analysisTask": "Aplicar a ideia de detecção: integrated case: rare DNS + periodic low-volume TLS + unusual process + broad egress rule + no change ticket",
        "evidence": "ROE | Timeline integrada | Matriz de evidências | Detecções propostas | Plano de contenção/rollback | RCA defensivo",
        "expectedOutput": "O caso é suspeita forte em laboratório e deve resultar em contenção proporcional, hunting por padrões similares e redução de egress amplo.",
        "explanation": "O objetivo é treinar raciocínio defensivo usando metadados fictícios e seguros, sem execução ofensiva nem interação com infraestrutura real."
      },
      {
        "number": 19,
        "title": "Separar fato, hipótese e falso positivo",
        "instruction": "Crie uma tabela com três colunas: fatos observados no dataset, hipóteses defensivas e falsos positivos prováveis.",
        "analysisTask": "Classificar cada evidência como fato, inferência ou lacuna. Não declarar incidente sem correlação suficiente.",
        "expectedOutput": "Tabela com fatos, hipóteses, falsos positivos e próximos dados necessários.",
        "explanation": "Essa separação evita conclusões precipitadas e ensina investigação baseada em evidência."
      },
      {
        "number": 20,
        "title": "Construir mini timeline defensiva",
        "instruction": "Ordene os eventos sintéticos por horário e indique qual fonte confirma cada etapa.",
        "analysisTask": "Montar timeline com timestamp, fonte, evento, interpretação, confiança e próxima ação.",
        "expectedOutput": "Timeline curta capaz de sustentar decisão de contenção, hunting ou descarte como falso positivo.",
        "explanation": "Timeline é o elo entre log isolado e narrativa técnica defensável."
      }
    ],
    "expectedResult": "O aluno produz evidências suficientes para demonstrar entendimento prático de “Projeto final: Blue Team + Pentest autorizado de rede”.",
    "validation": [
      {
        "check": "ROE possui escopo, janela, critérios de parada e contatos.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "ROE possui escopo, janela, critérios de parada e contatos.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Matriz de fluxos contém controles e logs esperados.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Matriz de fluxos contém controles e logs esperados.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Toda hipótese tem evidência e critério de sucesso.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Toda hipótese tem evidência e critério de sucesso.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Achados têm risco, impacto, dono, prazo e reteste.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Achados têm risco, impacto, dono, prazo e reteste.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Relatório diferencia evidência, inferência e lacuna.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Relatório diferencia evidência, inferência e lacuna.",
        "ifFails": "Revise o passo correspondente, colete nova evidência e corrija a documentação."
      },
      {
        "check": "Backlog inclui ações preventivas e não apenas correções pontuais.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "Backlog inclui ações preventivas e não apenas correções pontuais.",
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
        "symptom": "Se o escopo estiver grande demais, reduza para uma zona ou aplicação crítica.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se não houver telemetria, registre lacuna como achado de observabilidade.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se houver risco operacional, altere o cenário para simulação documental.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se um achado não tiver dono, trate como falha de governança.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se a solução proposta for bloquear tudo, revise impacto e proporcionalidade.",
        "probableCause": "Premissa incorreta, coleta incompleta, configuração divergente ou interpretação inconsistente com a evidência.",
        "howToConfirm": "Compare a evidência coletada com o resultado esperado do passo e registre a divergência encontrada.",
        "fix": "Corrija o artefato, ajuste a configuração quando aplicável, colete nova evidência e atualize a conclusão técnica."
      },
      {
        "symptom": "Se o relatório estiver técnico demais, adicione resumo executivo orientado a risco.",
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
      "Adicionar matriz MITRE ATT&CK defensiva por cenário.",
      "Criar casos de uso SIEM versionados.",
      "Automatizar validações de IaC.",
      "Adicionar exercícios tabletop com jurídico e privacidade.",
      "Criar dashboard de métricas de validação contínua.",
      "Integrar achados a gestão de exceções e FinOps.",
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
      "ROE",
      "Mapa de superfície",
      "Matriz de controles",
      "Resultados de validação",
      "Detecções propostas",
      "Playbook de resposta",
      "Relatório final e rubrica",
      "Timeline integrada",
      "Matriz de evidências",
      "Plano de contenção/rollback",
      "RCA defensivo"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Projeto final: Blue Team + Pentest autorizado de rede” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Projeto final do Módulo 16 — Blue Team + pentest autorizado de rede",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Integrar escopo, superfície, validação, detecção, resposta e relatório executivo em um exercício avaliável de conclusão do módulo.",
    "authorizedScope": "Ambiente de laboratório ou arquitetura simulada. Qualquer teste ativo deve estar amarrado a ROE, janela, alvo, taxa e critérios de parada.",
    "allowedActions": [
      "Criar ROE",
      "Mapear superfície autorizada",
      "Validar controles defensivos",
      "Construir detecções",
      "Executar tabletop de contenção",
      "Produzir relatório"
    ],
    "prohibitedActions": [
      "Explorar sistemas reais",
      "Persistir acesso",
      "Usar credenciais de terceiros",
      "Causar indisponibilidade",
      "Entregar relatório sem evidência"
    ],
    "telemetrySources": [
      "Todos os logs do módulo: DNS, proxy, firewall, flow, Zeek, WAF, IAM, EDR, cloud audit e evidências de laboratório",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Achado sem evidência suficiente",
        "signal": "Relatório afirma risco sem log/artefato",
        "queryIdea": "finding.evidence_count=0",
        "commonFalsePositive": "Risco conceitual ainda não testado",
        "response": "Reclassificar como hipótese ou coletar evidência."
      },
      {
        "name": "Controle sem validação",
        "signal": "Política existe, mas não há teste/log",
        "queryIdea": "control.status=declared AND validation=null",
        "commonFalsePositive": "Controle recém-criado",
        "response": "Executar validação segura e anexar evidência."
      },
      {
        "name": "Resposta sem rollback",
        "signal": "Plano de contenção não tem retorno",
        "queryIdea": "containment.rollback IS NULL",
        "commonFalsePositive": "Ação irreversível por design",
        "response": "Criar alternativa reversível ou aprovação explícita."
      }
    ],
    "containmentActions": [
      "Tabletop antes de produção",
      "Bloqueio específico com rollback",
      "Isolamento por criticidade",
      "Comunicação executiva",
      "Registro de lições aprendidas"
    ],
    "evidenceChecklist": [
      "ROE",
      "Mapa de superfície",
      "Matriz de controles",
      "Resultados de validação",
      "Detecções propostas",
      "Playbook de resposta",
      "Relatório final e rubrica"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — incidente integrado para capstone",
      "theme": "capstone Blue Team defensivo",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "Fonte 1 — DNS: ws-031 consultou a1b2c3d4.lab-tunnel.example quatro vezes com TTL 60.",
        "Fonte 2 — Flow: ws-031 abriu sessões TLS de baixo volume para 203.0.113.77 a cada 60 segundos.",
        "Fonte 3 — Proxy: categoria unknown, sem reputação interna, status 204, user-agent incomum.",
        "Fonte 4 — EDR: processo powershell.exe iniciou conexão; hash não classificado no laboratório.",
        "Fonte 5 — Firewall: regra egress-workstations permitiu saída 443 ampla.",
        "Fonte 6 — Mudança: não há ticket aprovado para novo destino externo nessa janela."
      ],
      "analysisPrompt": "Produza relatório final com escopo, hipótese, evidências, timeline, falsos positivos, contenção, rollback, melhoria arquitetural e detecção contínua.",
      "detectionIdea": "integrated case: rare DNS + periodic low-volume TLS + unusual process + broad egress rule + no change ticket",
      "expectedFinding": "O caso é suspeita forte em laboratório e deve resultar em contenção proporcional, hunting por padrões similares e redução de egress amplo.",
      "evidenceToCollect": [
        "ROE",
        "Timeline integrada",
        "Matriz de evidências",
        "Detecções propostas",
        "Plano de contenção/rollback",
        "RCA defensivo"
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
      "title": "ROE mínimo",
      "prompt": "Liste os itens mínimos de ROE para validação autorizada de rede.",
      "expectedAnswer": "Escopo, fora de escopo, janela, métodos permitidos/proibidos, origem, contatos, parada, privacidade, evidência e comunicação."
    },
    {
      "title": "Matriz de fluxo",
      "prompt": "Crie três fluxos críticos e diga controle preventivo, log esperado e dono.",
      "expectedAnswer": "Cada fluxo deve conter origem, destino, protocolo, porta, identidade, controle, log, dono e criticidade."
    },
    {
      "title": "Achado de observabilidade",
      "prompt": "Um fluxo indevido foi bloqueado, mas não gerou alerta. Classifique o problema.",
      "expectedAnswer": "Controle preventivo funcionou, mas há falha detectiva/observabilidade e possivelmente lacuna de caso de uso SIEM."
    },
    {
      "title": "RCA sem culpa",
      "prompt": "Uma regra any-to-any existe há seis meses por exceção vencida. Dê causa técnica e causa sistêmica.",
      "expectedAnswer": "Causa técnica: regra ampla. Causa sistêmica: processo de exceção sem expiração, dono, revisão e automação de cobrança."
    },
    {
      "id": "ex16.12.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Capstone Blue Team e validação autorizada” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como Todos os logs do módulo: DNS, proxy, firewall, flow, Zeek, WAF, IAM, EDR, cloud audit e evidências de laboratório, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.12.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Explorar sistemas reais: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Persistir acesso: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Usar credenciais de terceiros: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.12.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — incidente integrado para capstone”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "O caso é suspeita forte em laboratório e deve resultar em contenção proporcional, hunting por padrões similares e redução de egress amplo. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual é o objetivo principal de integrar Blue Team e validação autorizada?",
      "options": [
        "Provar que uma equipe é superior à outra.",
        "Validar prevenção, detecção, resposta e melhoria com segurança e autorização.",
        "Executar testes sem avisar ninguém.",
        "Substituir governança por ferramentas."
      ],
      "answer": 1,
      "explanation": "A integração mede capacidade organizacional, não competição."
    },
    {
      "question": "O que torna um pentest de rede profissional do ponto de vista ético e operacional?",
      "options": [
        "Executar fora de horário sem registro.",
        "Ter escopo, autorização, ROE, evidência, comunicação e critério de parada.",
        "Usar qualquer método disponível.",
        "Compartilhar todos os dados coletados sem restrição."
      ],
      "answer": 1,
      "explanation": "Autorização e governança definem limites seguros."
    },
    {
      "question": "Se uma tentativa indevida é bloqueada, mas não aparece no SIEM, qual é o achado?",
      "options": [
        "Nenhum, porque bloqueou.",
        "Falha de observabilidade ou integração de detecção.",
        "Prova de comprometimento.",
        "Falha exclusiva da aplicação."
      ],
      "answer": 1,
      "explanation": "Prevenção e detecção são capacidades diferentes."
    },
    {
      "question": "Qual é a melhor saída para um achado recorrente de regra ampla em IaC?",
      "options": [
        "Corrigir manualmente apenas o ambiente atual.",
        "Criar guardrail/policy as code, teste de pipeline, dono e reteste.",
        "Ignorar se não houve incidente.",
        "Aumentar permissões para reduzir chamados."
      ],
      "answer": 1,
      "explanation": "Correção sistêmica evita recorrência."
    },
    {
      "question": "Por que o relatório deve separar fato, inferência e lacuna?",
      "options": [
        "Para parecer mais longo.",
        "Para evitar conclusões não sustentadas e orientar decisões por confiança.",
        "Para esconder incertezas.",
        "Para dispensar evidências."
      ],
      "answer": 1,
      "explanation": "Rigor analítico exige transparência sobre o que foi provado."
    },
    {
      "question": "Qual métrica combina bem com validação defensiva recorrente?",
      "options": [
        "Quantidade de comandos executados.",
        "Tempo de detecção, cobertura de logs, achados retestados e exceções vencidas.",
        "Número de prints no relatório.",
        "Quantidade de ferramentas compradas."
      ],
      "answer": 1,
      "explanation": "Métricas devem refletir capacidade e redução de risco."
    }
  ],
  "flashcards": [
    {
      "front": "O que é ROE?",
      "back": "Rules of Engagement: regras formais que definem escopo, limites, métodos, janela, comunicação e parada de uma validação autorizada."
    },
    {
      "front": "O que é Purple Team?",
      "back": "Colaboração estruturada entre validação ofensiva autorizada e defesa para melhorar detecção, resposta e controles."
    },
    {
      "front": "O que é hipótese defensiva?",
      "back": "Afirmação testável sobre controle, visibilidade ou resposta, vinculada a evidências esperadas."
    },
    {
      "front": "O que é achado de observabilidade?",
      "back": "Falha em registrar, correlacionar, alertar ou contextualizar um evento relevante."
    },
    {
      "front": "O que é RCA sem culpa?",
      "back": "Análise de causa raiz focada em sistema, processo e prevenção, não em culpabilização individual."
    },
    {
      "front": "O que significa reteste?",
      "back": "Validação posterior de que a correção realmente reduziu o risco sem criar novo impacto."
    }
  ],
  "mentorQuestions": [
    "Que controle você está validando e qual evidência provaria sucesso ou falha?",
    "O exercício está seguro, autorizado, proporcional e dentro do ROE?",
    "Como este achado vira melhoria sistêmica em arquitetura, processo, detecção ou pipeline?"
  ],
  "challenge": {
    "title": "Projeto final do Módulo 16 — Blue Team + pentest autorizado de rede",
    "description": "Desenhe uma validação autorizada de rede para uma empresa híbrida com matriz, VPN, cloud, Kubernetes, serviços privados, DNS, proxy, firewall, WAF, SIEM, EDR e DevSecOps.",
    "requirements": [
      "Criar ROE",
      "Mapear zonas e fluxos",
      "Definir hipóteses defensivas",
      "Planejar telemetria",
      "Simular achados defensivos",
      "Definir resposta Blue Team",
      "Criar timeline",
      "Produzir RCA",
      "Criar backlog preventivo",
      "Definir reteste e métricas"
    ],
    "deliverable": "Pacote final com ROE, arquitetura, matriz de fluxos, hipóteses, fontes de evidência, playbooks, relatório técnico/executivo, RCA, backlog e plano de reteste.",
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
    "overview": "Uma solução forte começa por governança e escopo. Em seguida, define fluxos críticos e hipóteses defensivas. Cada hipótese precisa de controle esperado, fonte de evidência, critério de sucesso e plano de resposta. Os achados devem ser priorizados por risco e transformados em melhorias preventivas, não apenas correções pontuais.",
    "keyPoints": [
      "ROE é pré-requisito, não burocracia opcional.",
      "Toda validação deve ter evidência esperada antes da execução.",
      "Blue Team mede visibilidade e resposta, não apenas alertas.",
      "Achado sem dono e prazo vira dívida operacional.",
      "RCA deve buscar causa sistêmica.",
      "Reteste fecha o ciclo de melhoria."
    ],
    "commonMistakes": [
      "Escopo amplo demais.",
      "Fazer validação sem critério de parada.",
      "Relatar portas abertas sem contexto de negócio.",
      "Não envolver donos de aplicação e cloud.",
      "Confundir ausência de alerta com ausência de risco.",
      "Corrigir manualmente sem guardrail para evitar recorrência."
    ],
    "steps": [
      "Confirmar escopo autorizado e critérios de parada.",
      "Selecionar telemetria mínima e proteger evidências.",
      "Gerar hipóteses defensivas e falsos positivos esperados.",
      "Escolher mitigação proporcional, reversível e comunicada.",
      "Registrar debrief com achados, lacunas e melhorias permanentes."
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
      "term": "ROE",
      "definition": "Rules of Engagement: regras formais de uma validação autorizada."
    },
    {
      "term": "Purple Team",
      "definition": "Colaboração entre validação autorizada e defesa para melhorar controles e detecções."
    },
    {
      "term": "Hipótese defensiva",
      "definition": "Afirmação testável sobre prevenção, detecção, resposta ou governança."
    },
    {
      "term": "Achado",
      "definition": "Condição observada com evidência, impacto, risco e recomendação."
    },
    {
      "term": "Reteste",
      "definition": "Nova validação para confirmar que uma correção foi eficaz."
    },
    {
      "term": "Backlog preventivo",
      "definition": "Lista priorizada de melhorias para evitar recorrência de riscos identificados."
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
        "16.12",
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
        "16.12",
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
        "16.12",
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
        "16.12",
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
      "url": "https://csrc.nist.gov/pubs/sp/800/115/final"
    },
    {
      "title": "NIST SP 800-61 Rev. 3 — Incident Response Recommendations and Considerations",
      "url": "https://csrc.nist.gov/pubs/sp/800/61/r3/final"
    },
    {
      "title": "NIST Cybersecurity Framework 2.0",
      "url": "https://www.nist.gov/cyberframework"
    },
    {
      "title": "MITRE ATT&CK — Lateral Movement",
      "url": "https://attack.mitre.org/tactics/TA0008/"
    },
    {
      "title": "Microsoft Security Testing Rules of Engagement",
      "url": "https://www.microsoft.com/en-us/msrc/pentest-rules-of-engagement"
    },
    {
      "title": "OWASP Testing Guide",
      "url": "https://owasp.org/www-project-web-security-testing-guide/"
    }
  ],
  "nextLesson": "17.1 — Como revisar redes de forma profissional",
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
              "name": "Risco Blue Team específico — Projeto final: Blue Team + Pentest autorizado de rede",
              "description": "Em Projeto final: Blue Team + Pentest autorizado de rede, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
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
      "Todos os logs do módulo: DNS, proxy, firewall, flow, Zeek, WAF, IAM, EDR, cloud audit e evidências de laboratório"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.12.",
      "Achado sem evidência suficiente — sinal: Relatório afirma risco sem log/artefato; ideia de consulta: finding.evidence_count=0; falso positivo comum: Risco conceitual ainda não testado.",
      "Controle sem validação — sinal: Política existe, mas não há teste/log; ideia de consulta: control.status=declared AND validation=null; falso positivo comum: Controle recém-criado.",
      "Resposta sem rollback — sinal: Plano de contenção não tem retorno; ideia de consulta: containment.rollback IS NULL; falso positivo comum: Ação irreversível por design."
    ],
    "ethicalLimits": {
      "authorizedScope": "Ambiente de laboratório ou arquitetura simulada. Qualquer teste ativo deve estar amarrado a ROE, janela, alvo, taxa e critérios de parada.",
      "allowedActions": [
        "Criar ROE",
        "Mapear superfície autorizada",
        "Validar controles defensivos",
        "Construir detecções",
        "Executar tabletop de contenção",
        "Produzir relatório"
      ],
      "prohibitedActions": [
        "Explorar sistemas reais",
        "Persistir acesso",
        "Usar credenciais de terceiros",
        "Causar indisponibilidade",
        "Entregar relatório sem evidência"
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
      "Falha ou comportamento inesperado relacionado a Projeto final: Blue Team + Pentest autorizado de rede.",
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
      "Qual evidência comprova o entendimento da aula 16.12?"
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
      "17.1"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Capstone Blue Team e validação autorizada",
    "defensiveGoal": "Integrar escopo, superfície, validação, detecção, resposta e relatório executivo em um exercício avaliável de conclusão do módulo.",
    "authorizedScope": "Ambiente de laboratório ou arquitetura simulada. Qualquer teste ativo deve estar amarrado a ROE, janela, alvo, taxa e critérios de parada.",
    "allowedActions": [
      "Criar ROE",
      "Mapear superfície autorizada",
      "Validar controles defensivos",
      "Construir detecções",
      "Executar tabletop de contenção",
      "Produzir relatório"
    ],
    "prohibitedActions": [
      "Explorar sistemas reais",
      "Persistir acesso",
      "Usar credenciais de terceiros",
      "Causar indisponibilidade",
      "Entregar relatório sem evidência"
    ],
    "telemetrySources": [
      "Todos os logs do módulo: DNS, proxy, firewall, flow, Zeek, WAF, IAM, EDR, cloud audit e evidências de laboratório"
    ],
    "detectionEngineering": [
      {
        "name": "Achado sem evidência suficiente",
        "signal": "Relatório afirma risco sem log/artefato",
        "queryIdea": "finding.evidence_count=0",
        "commonFalsePositive": "Risco conceitual ainda não testado",
        "response": "Reclassificar como hipótese ou coletar evidência."
      },
      {
        "name": "Controle sem validação",
        "signal": "Política existe, mas não há teste/log",
        "queryIdea": "control.status=declared AND validation=null",
        "commonFalsePositive": "Controle recém-criado",
        "response": "Executar validação segura e anexar evidência."
      },
      {
        "name": "Resposta sem rollback",
        "signal": "Plano de contenção não tem retorno",
        "queryIdea": "containment.rollback IS NULL",
        "commonFalsePositive": "Ação irreversível por design",
        "response": "Criar alternativa reversível ou aprovação explícita."
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
      "Tabletop antes de produção",
      "Bloqueio específico com rollback",
      "Isolamento por criticidade",
      "Comunicação executiva",
      "Registro de lições aprendidas"
    ],
    "evidencePackage": [
      "ROE",
      "Mapa de superfície",
      "Matriz de controles",
      "Resultados de validação",
      "Detecções propostas",
      "Playbook de resposta",
      "Relatório final e rubrica"
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
    "title": "Dataset sintético — incidente integrado para capstone",
    "theme": "capstone Blue Team defensivo",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "Fonte 1 — DNS: ws-031 consultou a1b2c3d4.lab-tunnel.example quatro vezes com TTL 60.",
      "Fonte 2 — Flow: ws-031 abriu sessões TLS de baixo volume para 203.0.113.77 a cada 60 segundos.",
      "Fonte 3 — Proxy: categoria unknown, sem reputação interna, status 204, user-agent incomum.",
      "Fonte 4 — EDR: processo powershell.exe iniciou conexão; hash não classificado no laboratório.",
      "Fonte 5 — Firewall: regra egress-workstations permitiu saída 443 ampla.",
      "Fonte 6 — Mudança: não há ticket aprovado para novo destino externo nessa janela."
    ],
    "analysisPrompt": "Produza relatório final com escopo, hipótese, evidências, timeline, falsos positivos, contenção, rollback, melhoria arquitetural e detecção contínua.",
    "detectionIdea": "integrated case: rare DNS + periodic low-volume TLS + unusual process + broad egress rule + no change ticket",
    "expectedFinding": "O caso é suspeita forte em laboratório e deve resultar em contenção proporcional, hunting por padrões similares e redução de egress amplo.",
    "evidenceToCollect": [
      "ROE",
      "Timeline integrada",
      "Matriz de evidências",
      "Detecções propostas",
      "Plano de contenção/rollback",
      "RCA defensivo"
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
