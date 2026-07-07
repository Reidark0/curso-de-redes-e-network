export const lesson1609 = {
  "id": "16.9",
  "moduleId": "m16",
  "order": 9,
  "title": "Exfiltração, DLP e anomalias de volume",
  "subtitle": "Como investigar saída indevida de dados de forma defensiva, correlacionando volume, destino, identidade, DLP, cloud audit, proxy, flow logs, storage, SIEM e governança.",
  "duration": "300-450 min",
  "estimatedStudyTimeMinutes": 450,
  "difficulty": "avançado",
  "type": "segurança defensiva",
  "xp": 450,
  "tags": [
    "exfiltração",
    "DLP",
    "anomalia de volume",
    "egress control",
    "CASB",
    "SSE",
    "proxy logs",
    "flow logs",
    "storage logs",
    "cloud audit",
    "SIEM",
    "data classification",
    "Blue Team",
    "SOC",
    "FinOps",
    "privacidade",
    "ética",
    "escopo autorizado",
    "NDR",
    "evidências",
    "detecção",
    "mitigação",
    "dataset sintético",
    "PCAP sintético",
    "Zeek",
    "NetFlow",
    "timeline de incidente"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.12",
      "reason": "Observabilidade e flow logs são base para investigar egress e anomalias de volume em cloud."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m14",
      "lesson": "14.14",
      "reason": "Arquitetura cloud segura e observável fornece controles de NAT, Private Link, DNS, logs e governança."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.5",
      "reason": "DNS, HTTP/TLS e indicadores ajudam a identificar caminhos de saída e destinos suspeitos."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m16",
      "lesson": "16.8",
      "reason": "C2 e beaconing preparam a análise comportamental usada também em exfiltração."
    },
    {
      "type": "course",
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "IAM",
      "lesson": "Identidades de serviço e privilégio mínimo",
      "reason": "Exfiltração moderna frequentemente envolve permissões, tokens, service principals e auditoria de identidade."
    }
  ],
  "objectives": [
    "Explicar exfiltração de dados como problema defensivo de rede, identidade, dados, aplicação e cloud.",
    "Diferenciar DLP, egress control, CASB/SSE, classificação de dados e detecção comportamental.",
    "Identificar sinais de anomalia de volume sem depender de alarmismo ou de uma única evidência.",
    "Correlacionar proxy, flow logs, DNS, firewall, EDR, storage logs, cloud audit, IAM, SIEM e billing.",
    "Definir resposta proporcional preservando evidências, minimizando impacto operacional e respeitando privacidade.",
    "Propor melhorias preventivas em arquitetura, DevSecOps, IAM, DLP, egress, storage e governança."
  ],
  "learningOutcomes": [
    "Dado um pico de egress, o aluno diferencia backup legítimo, erro de arquitetura e suspeita de exfiltração.",
    "Dado um alerta DLP, o aluno identifica evidências necessárias antes de classificar incidente.",
    "Dado um workload cloud com saída anômala, o aluno propõe investigação com logs de rede, storage, IAM e billing.",
    "Dado um SaaS com download massivo, o aluno monta linha do tempo com identidade, dispositivo, geolocalização e classificação de dados.",
    "Dado um pipeline que vaza artefatos sensíveis, o aluno propõe controles preventivos de DevSecOps.",
    "Dado um caso inconclusivo, o aluno documenta lacunas, riscos residuais e plano de melhoria de telemetria."
  ],
  "content": {
    "motivation": "<section class=\"lesson-section lesson-section--motivacao\">\n  <h2>1. Motivação</h2>\n\n\n  <p>Depois de estudar C2 e beaconing, o próximo passo natural é entender outro risco crítico visto pelo Blue Team: <strong>saída não autorizada de dados</strong>. Em incidentes reais, o impacto muitas vezes não termina na invasão. O impacto mais grave pode ser a cópia, envio, sincronização, compressão, upload ou exposição de informação sensível para fora dos limites esperados da organização.</p>\n  <p>Esta aula ensina exfiltração como problema defensivo de rede, dados e governança. O objetivo não é ensinar a retirar dados de um ambiente. O objetivo é ensinar a reconhecer <strong>anomalias de volume, destino, horário, protocolo, identidade, aplicação e caminho de saída</strong>, combinando DLP, proxy, firewall, flow logs, storage logs, CASB/SSE, EDR, SIEM, cloud audit e contexto de negócio.</p>\n  <div class=\"callout callout--warning\"><strong>Limite ético e seguro:</strong> todo o conteúdo é defensivo. Não há instruções para burlar DLP, esconder tráfego, compactar dados para evasão, contornar controles, montar canais de saída ou executar exfiltração. Os exemplos são de detecção, investigação, contenção, governança e melhoria preventiva.</div>\n\n\n</section>",
    "history": "<section class=\"lesson-section lesson-section--historia\">\n  <h2>2. História</h2>\n\n\n  <p>No início da segurança de redes, a preocupação predominante era impedir entrada: bloquear portas, fechar serviços expostos, aplicar antivírus e proteger perímetro. Com o tempo, ficou claro que proteger somente a entrada não bastava. Organizações também precisavam saber <strong>o que sai</strong>, por qual caminho, com qual volume, por qual usuário, de qual aplicação e para qual destino.</p>\n  <p>A evolução passou por proxies, firewalls de saída, gateways de e-mail, IDS/IPS, DLP de endpoint, DLP de rede, CASB, SSE, EDR, NDR, SIEM, classificação de dados e controles nativos de cloud. O desafio mudou de “existe conexão?” para “essa transferência faz sentido para esse ativo, usuário, processo, dado e contexto?”.</p>\n  <div class=\"timeline\"><div class=\"timeline-item\"><strong>Perímetro clássico:</strong> foco em tráfego de entrada e portas expostas.</div><div class=\"timeline-item\"><strong>Proxy e firewall de saída:</strong> controle de navegação, destino e protocolo.</div><div class=\"timeline-item\"><strong>DLP e classificação:</strong> inspeção de conteúdo, tipo de dado e política de uso.</div><div class=\"timeline-item\"><strong>Cloud e SaaS:</strong> auditoria de storage, IAM, compartilhamentos, uploads e integrações.</div><div class=\"timeline-item\"><strong>Detecção comportamental:</strong> baseline, anomalia de volume, horário, destino e identidade.</div></div>\n\n\n</section>",
    "problem": "<section class=\"lesson-section lesson-section--problema\">\n  <h2>3. Problema</h2>\n\n\n  <p>O problema defensivo é que transferência de dados é uma atividade normal. Backups, replicação, sincronização, CI/CD, logs, observabilidade, exportação de relatórios, integrações com fornecedores, repositórios, storage cloud e colaboração corporativa produzem tráfego de saída diariamente. Portanto, volume alto não é automaticamente incidente; volume baixo também não é automaticamente seguro.</p>\n  <p>Exfiltração defensivamente suspeita aparece quando a transferência foge do contexto: um servidor que nunca envia dados começa a enviar gigabytes; uma conta baixa grande volume fora do horário; um pod passa a usar NAT para destino desconhecido; um bucket recebe política pública; um usuário exporta dados sensíveis em massa; um endpoint acessa serviço de armazenamento não aprovado; um processo sem justificativa movimenta arquivos protegidos.</p>\n  <ul><li><strong>Desafio técnico:</strong> correlacionar tráfego, identidade, endpoint, cloud, aplicação e dado.</li><li><strong>Desafio operacional:</strong> conter sem paralisar backups, integrações ou operação legítima.</li><li><strong>Desafio jurídico e de privacidade:</strong> investigar minimizando acesso indevido a conteúdo sensível.</li><li><strong>Desafio financeiro:</strong> egress anômalo pode gerar custo alto em cloud antes mesmo de confirmar incidente.</li><li><strong>Desafio de governança:</strong> DLP sem classificação, dono do dado e processo de exceção vira ruído.</li></ul>\n\n\n</section>",
    "evolution": "<section class=\"lesson-section lesson-section--evolucao\">\n  <h2>4. Evolução</h2>\n\n\n  <p>A defesa contra saída indevida de dados evoluiu de bloqueios simples para controles orientados a contexto. Primeiro, organizações tentavam bloquear FTP, mídia removível ou anexos. Depois adicionaram inspeção de e-mail, proxy, DLP de rede e endpoint. Com SaaS e cloud, a superfície cresceu: dados podem sair por compartilhamento, API, bucket, snapshot, exportação de banco, pipeline, token de serviço, integração de terceiro ou download legítimo por conta comprometida.</p>\n  <p>Hoje, uma abordagem madura combina <strong>classificação de dados</strong>, menor privilégio, controles de egress, CASB/SSE, DLP, logs de storage, auditoria de IAM, detecção comportamental, criptografia, gestão de chaves, SIEM, SOAR, playbooks e governança. O foco sai de “bloquear tudo” e vai para “permitir o necessário com evidência, limite e rastreabilidade”.</p>\n\n\n</section>",
    "concept": "<section class=\"lesson-section lesson-section--conceito\">\n  <h2>5. Conceito</h2>\n\n\n  <p><strong>Exfiltração</strong>, em linguagem defensiva, é a saída não autorizada, indevida ou não esperada de dados de um ambiente controlado. Pode envolver dados de clientes, credenciais, propriedade intelectual, logs sensíveis, backups, chaves, dumps, documentos internos, código-fonte, dados pessoais, segredos de pipeline, snapshots ou artefatos de produção.</p>\n  <p><strong>DLP</strong>, ou Data Loss Prevention/Data Leak Prevention, é um conjunto de processos e tecnologias para identificar, monitorar, alertar, bloquear ou governar uso e movimentação de dados sensíveis. DLP não é apenas uma ferramenta. Ele depende de classificação, política, exceção, dono de dados, inventário, identidade, logs e resposta.</p>\n  <p><strong>Anomalia de volume</strong> é um desvio relevante na quantidade, direção, frequência, destino ou perfil de transferência. Ela só ganha valor quando comparada com baseline: um backup de 200 GB pode ser normal; 2 GB de um servidor de banco para destino externo desconhecido pode ser muito mais crítico.</p>\n\n\n</section>",
    "internals": "<section class=\"lesson-section lesson-section--funcionamento-interno\">\n  <h2>6. Funcionamento interno</h2>\n\n\n  <p>Uma investigação defensiva de exfiltração começa montando o fluxo do dado. O analista pergunta: qual dado? de onde saiu? por qual identidade? por qual processo? por qual rede? para qual destino? em qual horário? com qual volume? houve compressão, exportação, compartilhamento, token, API, download ou sincronização? qual controle permitiu? qual log comprova?</p>\n  <p>No plano de rede, os sinais aparecem em bytes enviados, conexões longas, destinos raros, aumento de egress, portas/protocolos incomuns, uploads via HTTPS, transferências para storage externo, DNS incomum, SNI, proxy actions, firewall logs, NAT gateway metrics, flow logs e logs de load balancer. No plano de dados, sinais aparecem em acesso a tabelas, exportação, download, compartilhamento, bucket policy, objeto lido, API call, snapshot, secret access e alteração de permissão.</p>\n  <p>O ponto essencial é que <strong>tráfego não sabe sozinho se o conteúdo é sensível</strong>. Por isso DLP e classificação de dados precisam conversar com rede, identidade e aplicação. Sem isso, o SOC enxerga bytes; com isso, o SOC enxerga risco.</p>\n\n\n</section>",
    "architecture": "<section class=\"lesson-section lesson-section--arquitetura\">\n  <h2>7. Arquitetura</h2>\n\n\n  <p>Uma arquitetura defensiva contra exfiltração precisa de camadas. Na origem, controles de endpoint, EDR, classificação local, DLP endpoint e gestão de dispositivos reduzem vazamento por usuário ou processo. Na rede, proxy, firewall de egress, DNS filtering, CASB/SSE, NDR, flow logs e SIEM fornecem visibilidade e controle. Na cloud, IAM, storage logs, bucket policies, private endpoints, service perimeter, audit logs, KMS, tags, data classification e policy as code reduzem exposição.</p>\n  <p>A arquitetura também precisa de resposta: playbooks para anomalia de volume, compartilhamento indevido, bucket público, download massivo, egress inesperado de workload, token abusado e movimentação de dados entre regiões. Sem playbook, cada alerta vira improviso.</p>\n  <div class=\"callout callout--info\"><strong>Ligação entre cursos:</strong> esta aula depende diretamente do Módulo 14 de Cloud Networking, especialmente NAT, Private Link, DNS privado, flow logs, Landing Zone e custos de egress. Também depende do curso Enterprise Identity/IAM para entender privilégio, identidades de serviço e auditoria.</div>\n\n\n</section>",
    "analogy": "<section class=\"lesson-section lesson-section--analogia\">\n  <h2>8. Analogia</h2>\n\n\n  <p>Pense em uma empresa física com documentos sigilosos. Segurança na portaria impede entrada indevida, mas isso não basta. Também é necessário saber quem retirou caixas, por qual porta, com autorização de quem, em qual horário, para qual destino, com qual nota fiscal e se o conteúdo podia sair.</p>\n  <p>A rede é a portaria digital. O DLP é a conferência do conteúdo e da política. O IAM é o crachá. O SIEM é a central que junta câmeras, catracas, notas, sensores e relatos. A governança é a regra que define quais documentos podem sair e quando. Uma boa investigação não acusa alguém apenas por carregar uma caixa; ela verifica autorização, contexto, volume, destino e evidências.</p>\n\n\n</section>",
    "simpleExample": "<section class=\"lesson-section lesson-section--exemplo-simples\">\n  <h2>9. Exemplo simples</h2>\n\n\n  <p>Um notebook corporativo normalmente envia poucos megabytes por hora para a internet. Em uma noite, ele envia 18 GB para um serviço de armazenamento externo não aprovado. O proxy registra uploads, o EDR mostra processo de sincronização não documentado, o DNS mostra domínio recém-visto, o IdP mostra login bem-sucedido sem MFA forte e o DLP alerta para arquivos com dados pessoais.</p>\n  <p>O procedimento correto não é presumir culpa nem apagar o equipamento. O correto é preservar evidências, validar contexto com o dono, confirmar se havia atividade autorizada, avaliar criticidade dos dados, conter de forma proporcional, bloquear destino específico se necessário, isolar o endpoint se o risco for alto e abrir RCA para corrigir controle de egress, DLP, MFA e política de software.</p>\n\n\n</section>",
    "enterpriseExample": "<section class=\"lesson-section lesson-section--exemplo-empresarial\">\n  <h2>10. Exemplo empresarial</h2>\n\n\n  <p>Uma empresa possui ERP, banco de dados, file server, repositórios de código, ferramentas SaaS e usuários remotos. O SOC detecta aumento de uploads a partir de uma conta de usuário de finanças para um serviço externo. Ao investigar, descobre que a conta exportou relatórios, compactou planilhas e enviou para um domínio de compartilhamento não homologado.</p>\n  <p>A resposta corporativa madura envolve rede, IAM, jurídico, privacidade e dono do dado. A equipe revisa logs de proxy, DLP, EDR, IdP, CASB e auditoria do SaaS; verifica se o usuário estava autorizado; identifica quais dados foram envolvidos; aplica contenção; preserva evidências; comunica responsáveis; e transforma o caso em controle: bloqueio de serviço não aprovado, política de upload por classificação, MFA adaptativo, aprovação para exportações em massa e alerta por volume fora do baseline.</p>\n\n\n</section>",
    "cloudExample": "<section class=\"lesson-section lesson-section--exemplo-cloud\">\n  <h2>11. Exemplo em cloud</h2>\n\n\n  <p>Em cloud, exfiltração pode aparecer como egress inesperado via NAT Gateway, leitura massiva de objetos em storage, snapshot compartilhado indevidamente, exportação de banco, token de service account abusado, mudança em bucket policy, cópia entre regiões ou workload Kubernetes enviando dados para fora do padrão.</p>\n  <p>O desenho defensivo inclui private endpoints, egress firewall, DNS privado, logs de storage, cloud audit logs, flow logs, métricas de NAT, KMS, IAM mínimo, tags de criticidade, alertas de billing, detecção de compartilhamento público, policy as code e revisão de exceções. Em cloud, o custo também é sinal: aumento súbito de egress pode indicar incidente, erro de arquitetura ou vazamento operacional.</p>\n\n\n</section>",
    "devsecopsExample": "<section class=\"lesson-section lesson-section--exemplo-devsecops\">\n  <h2>12. Exemplo em DevSecOps</h2>\n\n\n  <p>Em DevSecOps, dados podem sair por pipeline mal configurado: artefatos contendo segredos, logs com tokens, dump de banco em ambiente de teste, imagem com arquivo sensível, variável de ambiente vazada, runner com acesso amplo ou integração de terceiro sem restrição. A resposta não pode depender apenas do SOC depois do fato; precisa começar no pipeline.</p>\n  <p>Controles úteis incluem secret scanning, classificação de artefatos, proibição de logs sensíveis, escopo mínimo de tokens, runners privados com egress control, allowlist de destinos, aprovação para exportações, policy as code, SBOM, revisão de permissões de service principals e detecção de drift. O pipeline deve provar que não está criando novos caminhos de saída sem governança.</p>\n\n\n</section>",
    "securityExample": "<section class=\"lesson-section lesson-section--exemplo-seguranca\">\n  <h2>13. Exemplo em Segurança</h2>\n\n\n  <p>Do ponto de vista de segurança, exfiltração é um evento de alto impacto porque envolve confidencialidade, privacidade, reputação, regulação, continuidade e custo. O analista precisa equilibrar urgência e precisão: bloquear cedo demais pode derrubar operação; bloquear tarde demais pode ampliar dano.</p>\n  <p>Boas práticas incluem baseline por ativo, classificação de dados, DLP calibrado, controle de egress, logs protegidos, alertas por volume, correlação com identidade, detecção de uso anormal de storage, playbooks, tabletop exercises e revisão pós-incidente. Más práticas incluem regras permanentes sem dono, buckets públicos, NAT irrestrito, logs desativados para economizar, DLP em modo eterno de apenas alerta e exceções sem prazo.</p>\n\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Reforço Blue Team: limite ético e evidência</h3><p><strong>Escopo autorizado:</strong> Somente metadados, logs e simulações com arquivos fictícios. Não abrir conteúdo real de usuários sem processo formal.</p><p><strong>Ações proibidas:</strong> Inspecionar conteúdo pessoal sem autorização; Copiar dados sensíveis para teste; Enviar dados reais para serviços externos; Ignorar cadeia de custódia.</p><p><strong>Meta defensiva:</strong> Identificar vazamento potencial sem violar privacidade: foco em metadados, volume, destino, tipo de canal, identidade e classificação do dado.</p></section>\n<section class=\"lesson-section lesson-section--blue-team\"><h3>Dados sintéticos e PCAP textual</h3><p>Para reduzir risco operacional e ético, esta aula usa logs sintéticos, trechos textuais de pacotes e metadados sanitizados. O aluno aprende investigação defensiva sem tocar tráfego real, payloads, credenciais ou infraestrutura de terceiros.</p></section>",
    "diagram": "<section class=\"lesson-section lesson-section--diagrama\">\n  <h2>14. Diagrama SVG</h2>\n\n\n  <p>O diagrama abaixo mostra uma arquitetura defensiva de detecção e resposta a exfiltração. Observe que a investigação junta rede, dado, identidade, endpoint, cloud, aplicação, custo e governança.</p>\n  <div class=\"diagram diagram--svg\" role=\"img\" aria-label=\"Fluxo defensivo de exfiltração, DLP e anomalias de volume\">\n    <svg viewBox=\"0 0 1180 620\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-labelledby=\"svg-16-9-content-diagram-1-title svg-16-9-content-diagram-1-desc\">\n      <title id=\"svg-16-9-content-diagram-1-title\">Exfiltração, DLP e anomalias de volume</title>\n      <desc id=\"svg-16-9-content-diagram-1-desc\">Diagrama pedagógico da aula 16.9, Exfiltração, DLP e anomalias de volume, mostrando o fluxo, arquitetura ou relação técnica central do tema.</desc>\n      <defs>\n        <marker id=\"arrow1609\" markerWidth=\"10\" markerHeight=\"10\" refX=\"8\" refY=\"3\" orient=\"auto\" markerUnits=\"strokeWidth\"><path d=\"M0,0 L0,6 L9,3 z\" fill=\"currentColor\"></path></marker>\n      </defs>\n      <rect x=\"25\" y=\"25\" width=\"1130\" height=\"570\" rx=\"24\" class=\"svg-frame\"></rect>\n      <text x=\"55\" y=\"65\" class=\"svg-title\">Exfiltração defensiva: dado + identidade + rede + cloud + resposta</text>\n\n      <rect x=\"60\" y=\"115\" width=\"170\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--source\"></rect>\n      <text x=\"85\" y=\"150\" class=\"svg-label\">Origem</text><text x=\"85\" y=\"176\" class=\"svg-small\">Endpoint / servidor / pod</text>\n\n      <rect x=\"285\" y=\"90\" width=\"170\" height=\"85\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"310\" y=\"124\" class=\"svg-label\">DLP/EDR</text><text x=\"310\" y=\"150\" class=\"svg-small\">Processo + conteúdo</text>\n\n      <rect x=\"285\" y=\"210\" width=\"170\" height=\"85\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"310\" y=\"244\" class=\"svg-label\">Identidade</text><text x=\"310\" y=\"270\" class=\"svg-small\">Usuário / serviço / MFA</text>\n\n      <rect x=\"515\" y=\"115\" width=\"185\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--control\"></rect>\n      <text x=\"540\" y=\"150\" class=\"svg-label\">Egress control</text><text x=\"540\" y=\"176\" class=\"svg-small\">Proxy / firewall / NAT</text>\n\n      <rect x=\"760\" y=\"70\" width=\"165\" height=\"80\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"785\" y=\"104\" class=\"svg-label\">Destino</text><text x=\"785\" y=\"130\" class=\"svg-small\">SaaS / storage externo</text>\n\n      <rect x=\"760\" y=\"190\" width=\"165\" height=\"80\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"785\" y=\"224\" class=\"svg-label\">Storage cloud</text><text x=\"785\" y=\"250\" class=\"svg-small\">Bucket / blob / objeto</text>\n\n      <rect x=\"970\" y=\"130\" width=\"140\" height=\"85\" rx=\"14\" class=\"svg-node svg-node--risk\"></rect>\n      <text x=\"995\" y=\"164\" class=\"svg-label\">Risco</text><text x=\"995\" y=\"190\" class=\"svg-small\">Volume + dado + contexto</text>\n\n      <rect x=\"115\" y=\"365\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node\"></rect>\n      <text x=\"140\" y=\"399\" class=\"svg-label\">Telemetria</text><text x=\"140\" y=\"425\" class=\"svg-small\">Flow, proxy, DNS, audit</text>\n\n      <rect x=\"375\" y=\"365\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--analysis\"></rect>\n      <text x=\"400\" y=\"399\" class=\"svg-label\">Baseline</text><text x=\"400\" y=\"425\" class=\"svg-small\">Volume, horário, destino</text>\n\n      <rect x=\"625\" y=\"365\" width=\"180\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--analysis\"></rect>\n      <text x=\"650\" y=\"399\" class=\"svg-label\">SIEM/SOAR</text><text x=\"650\" y=\"425\" class=\"svg-small\">Correlação + playbook</text>\n\n      <rect x=\"875\" y=\"365\" width=\"190\" height=\"90\" rx=\"14\" class=\"svg-node svg-node--response\"></rect>\n      <text x=\"900\" y=\"399\" class=\"svg-label\">Resposta</text><text x=\"900\" y=\"425\" class=\"svg-small\">Conter, preservar, RCA</text>\n\n      <path d=\"M230 160 H285\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M455 132 C485 132 485 160 515 160\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M455 252 C488 252 488 174 515 174\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M700 160 C730 160 730 110 760 110\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M700 176 C730 176 730 230 760 230\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M925 110 C955 110 955 172 970 172\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M925 230 C955 230 955 185 970 185\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M210 205 V365\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M305 410 H375\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M555 410 H625\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M805 410 H875\" class=\"svg-link\" marker-end=\"url(#arrow1609)\"></path>\n      <path d=\"M970 365 C970 305 1040 275 1040 215\" class=\"svg-link svg-link--alert\" marker-end=\"url(#arrow1609)\"></path>\n      <text x=\"65\" y=\"540\" class=\"svg-note\">Regra mental: bytes não são evidência suficiente. O valor defensivo vem de volume + sensibilidade do dado + identidade + destino + baseline + controle efetivo.</text>\n    </svg>\n  </div>\n\n\n</section>",
    "labIntro": "<section class=\"lesson-section lesson-section--laboratorio\">\n  <h2>15. Laboratório</h2>\n\n\n  <p>O laboratório desta aula constrói um dossiê defensivo para anomalia de volume e possível saída indevida de dados. Ele não exige execução de ferramentas ofensivas. O aluno trabalha com cenário simulado, matriz de evidências e plano de resposta.</p>\n\n\n</section><section class=\"lesson-section lesson-section--blue-team\"><h3>Modo de execução defensivo</h3><p>Este laboratório deve ser executado como exercício Blue Team. A entrega não é “provar que dá para atacar”; a entrega é provar que o ambiente tem escopo, controle, telemetria, evidência, detecção, contenção e melhoria contínua.</p></section>\n<section class=\"lesson-section lesson-section--blue-team-dataset\"><h3>Dataset sintético — fluxo volumétrico anômalo</h3><p>Use exclusivamente como dado sintético de laboratório. Os endereços 198.51.100.0/24 e 203.0.113.0/24 são blocos reservados para documentação, e os nomes são fictícios.</p><pre><code>timestamp,host,user,dst_fqdn,dst_category,bytes_out,bytes_in,baseline_bytes_out,dlp_label,proxy_action\n2026-07-01T16:00:00Z,ws-050,ana,storage-approved.example,corporate-saas,24000000,500000,22000000,public,allow\n2026-07-01T16:05:00Z,ws-051,bruno,paste-lab.example,uncategorized,850000000,20000,3500000,confidential,allow\n2026-07-01T16:06:00Z,ws-051,bruno,paste-lab.example,uncategorized,780000000,18000,3500000,confidential,allow\n2026-07-01T16:09:00Z,build-01,svc-ci,artifact-repo.example,corporate-saas,950000000,1200000,900000000,internal,allow</code></pre><p><strong>Tarefa:</strong> Compare volume, categoria, baseline, identidade e rótulo DLP. Diferencie upload legítimo de artefato versus possível saída indevida.</p><p><strong>Ideia de detecção:</strong> <code>bytes_out > baseline_bytes_out*20 AND dst_category NOT IN approved_categories AND dlp_label IN (confidential,restricted)</code></p><p><strong>Achado esperado:</strong> ws-051 tem volume muito acima do baseline para destino não categorizado com dado confidential; build-01 é alto volume esperado.</p></section>",
    "exercisesIntro": "<section class=\"lesson-section lesson-section--exercicios\">\n  <h2>16. Exercícios</h2>\n\n\n  <p>Os exercícios verificam se o aluno consegue diferenciar transferência legítima, anomalia operacional, vazamento acidental e incidente de segurança provável usando contexto e evidências.</p>\n\n\n</section>",
    "challengeIntro": "<section class=\"lesson-section lesson-section--desafio\">\n  <h2>17. Desafio</h2>\n\n\n  <p>O desafio é desenhar um playbook de exfiltração defensiva para ambiente híbrido, incluindo rede corporativa, cloud, SaaS, pipelines, DLP, SIEM, resposta e governança.</p>\n\n\n</section>",
    "solutionIntro": "<section class=\"lesson-section lesson-section--solucao-comentada\">\n  <h2>18. Solução comentada</h2>\n\n\n  <p>A solução comentada reforça que boa defesa contra exfiltração não depende de uma única ferramenta. Ela combina classificação de dados, controle de saída, identidade, logs, baseline, resposta proporcional e melhorias preventivas.</p>\n\n\n</section>",
    "summary": "<section class=\"lesson-section lesson-section--resumo\">\n  <h2>19. Resumo</h2>\n\n\n  <p>Nesta aula, você aprendeu que exfiltração é investigada como saída indevida de dados, não apenas como tráfego grande. Vimos que DLP depende de classificação, política, identidade, logs e governança; que anomalias de volume precisam de baseline; e que cloud, SaaS, endpoints, pipelines e Kubernetes criam caminhos modernos de saída.</p>\n  <p>Você também aprendeu a montar evidências com proxy, firewall, flow logs, DNS, EDR, storage logs, CASB/SSE, cloud audit, IAM, SIEM e billing. O objetivo final é responder proporcionalmente, preservar evidências e transformar achados em controles preventivos.</p>\n\n\n</section><div class=\"callout callout--security\"><strong>Resumo operacional Blue Team:</strong> Identificar vazamento potencial sem violar privacidade: foco em metadados, volume, destino, tipo de canal, identidade e classificação do dado. A conclusão só é aceitável quando há evidência preservada, falso positivo considerado e mitigação proporcional.</div>\n<div class=\"callout callout--security\"><strong>Dataset sintético:</strong> a prática desta aula usa artefatos fictícios para treinar detecção, falso positivo, contenção e RCA sem risco a terceiros.</div>",
    "nextTheme": "<section class=\"lesson-section lesson-section--proximo-tema\">\n  <h2>20. Próximo tema</h2>\n\n\n  <p>Na próxima aula, entraremos em <strong>Threat hunting com NetFlow, Zeek, firewall e proxy logs</strong>. A aula 16.10 aprofunda como transformar telemetria de rede em caçadas defensivas orientadas por hipóteses, conectando o que vimos sobre C2, movimento lateral, DNS/HTTP e exfiltração.</p>\n\n\n</section>"
  },
  "lab": {
    "id": "lab-16.9",
    "title": "Dossiê defensivo de exfiltração, DLP e anomalia de volume",
    "labType": "cloud",
    "objective": "Construir um processo defensivo para investigar possível saída indevida de dados usando cenário simulado e múltiplas fontes de evidência.",
    "scenario": "15. Laboratório O laboratório desta aula constrói um dossiê defensivo para anomalia de volume e possível saída indevida de dados. Ele não exige execução de ferramentas ofensivas. O aluno trabalha com cenário simulado, matriz de evidências e plano de resposta.",
    "topology": [
      "Endpoint corporativo",
      "Servidor de arquivos",
      "Workload cloud",
      "Storage gerenciado",
      "Proxy/SWG",
      "Firewall/NAT",
      "DNS",
      "DLP",
      "EDR",
      "IAM/IdP",
      "CASB/SSE",
      "SIEM",
      "Equipe de privacidade/jurídico"
    ],
    "architecture": "Classificação de dados → baseline de transferência → telemetria de rede/dado/identidade → correlação no SIEM → severidade → contenção proporcional → RCA → melhoria preventiva.",
    "prerequisites": [
      "Conhecimento das aulas anteriores do módulo.",
      "Ambiente de laboratório, editor de texto ou ferramenta de desenho."
    ],
    "tools": [
      "Terminal Linux",
      "Conta cloud de laboratório ou desenho arquitetural equivalente",
      "Editor de texto, planilha ou ferramenta de desenho"
    ],
    "estimatedTimeMinutes": 450,
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
        "instruction": "Antes de qualquer análise, registre o escopo permitido: Somente metadados, logs e simulações com arquivos fictícios. Não abrir conteúdo real de usuários sem processo formal.",
        "command": "Checklist ROE: alvos, origem, janela, técnicas permitidas, responsáveis, comunicação e stop conditions.",
        "expectedOutput": "Escopo aprovado e critérios de parada documentados antes da execução.",
        "explanation": "A primeira evidência de maturidade em segurança é saber o que não deve ser feito."
      },
      {
        "number": 2,
        "title": "Definir pacote de evidências e proteção de dados",
        "instruction": "Liste quais evidências serão coletadas, onde serão armazenadas, quem pode acessar e como dados sensíveis serão minimizados.",
        "command": "Evidências esperadas: Baseline de volume | Destino/categoria | Identidade | Classificação de dado | Evento DLP/CASB | Timeline e decisão",
        "expectedOutput": "Plano de evidências com fonte, horário, responsável, retenção e sensibilidade.",
        "explanation": "Sem evidência preservada, a conclusão vira opinião; sem minimização, a investigação pode criar novo risco."
      },
      {
        "number": 3,
        "title": "Confirmar escopo, privacidade e autorização",
        "instruction": "Defina quais fontes podem ser consultadas, quais dados são sensíveis, quem aprova acesso a conteúdo e qual é o critério de parada.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Investigação defensiva autorizada e minimização de exposição de dados pessoais ou sigilosos.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 4,
        "title": "Definir baseline de saída",
        "instruction": "Monte baseline por ativo e perfil: usuários, servidores, workloads, pipelines, storage, horários, destinos, volumes e sazonalidade.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Referência objetiva para diferenciar normalidade de anomalia.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 5,
        "title": "Normalizar evidências de rede",
        "instruction": "Colete proxy logs, firewall logs, flow logs, DNS logs, NAT metrics, WAF/LB logs e registros de destino, usando timestamps padronizados.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Tabela de tráfego com origem, destino, porta, protocolo, bytes enviados/recebidos, ação e caminho.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 6,
        "title": "Normalizar evidências de dado",
        "instruction": "Colete alertas DLP, classificação do dado, storage audit, downloads, compartilhamentos, exportações, mudanças de permissão e acessos a secrets ou snapshots.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Visão do tipo de dado potencialmente envolvido.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 7,
        "title": "Correlacionar identidade e endpoint",
        "instruction": "Associe transferência a usuário, conta de serviço, MFA, localização, device posture, processo, EDR, sessão e alterações recentes.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Contexto humano ou técnico da ação.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 8,
        "title": "Investigar cloud e SaaS",
        "instruction": "Verifique bucket policies, object reads, downloads massivos, public sharing, exports, snapshots, cross-region copy, tokens, service principals, private endpoints e billing.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Mapa de eventos cloud/SaaS associados ao possível vazamento.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 9,
        "title": "Classificar severidade com evidência composta",
        "instruction": "Combine sensibilidade do dado, volume, destino, identidade, intenção aparente, recorrência, criticidade do ativo e impacto regulatório.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Classificação defensável: benigno, anomalia operacional, vazamento acidental, suspeita forte ou incidente confirmado.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 10,
        "title": "Definir contenção proporcional",
        "instruction": "Escolha ações como bloquear destino específico, restringir token, suspender compartilhamento, isolar endpoint, pausar pipeline, revogar sessão ou aplicar quarentena de DLP.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Redução de risco com impacto operacional conhecido.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 11,
        "title": "Produzir RCA e comunicação",
        "instruction": "Documente timeline, causa técnica, causa sistêmica, controles que falharam, dados possivelmente envolvidos, impacto, ações e comunicação para partes responsáveis.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Relatório útil para SOC, rede, cloud, jurídico, privacidade e gestão.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 12,
        "title": "Criar backlog preventivo",
        "instruction": "Transforme o caso em melhorias: classificação, DLP calibrado, egress allowlist, private endpoints, IAM mínimo, CASB, policy as code, alertas de billing e revisão de exceções.",
        "analysisTask": "Produza o artefato indicado na instrução do passo e registre a evidência objetiva no relatório do laboratório.",
        "expectedOutput": "Plano de redução de recorrência.",
        "explanation": "Este passo ajuda a transformar o conceito da aula “Exfiltração, DLP e anomalias de volume” em evidência prática ou raciocínio verificável."
      },
      {
        "number": 13,
        "title": "Criar detecções e tratar falsos positivos",
        "instruction": "Converta os sinais observados em pelo menos três ideias de detecção, registrando campo de log, falso positivo provável, severidade e resposta esperada.",
        "command": "Detecção: Upload acima do baseline | Sinal: Bytes out por usuário/host acima do normal | Query: bytes_out > baseline_p95*3 BY user,host,dst | FP: Backup legítimo\nDetecção: Destino não aprovado para dados sensíveis | Sinal: Upload para storage pessoal ou domínio raro | Query: category=personal_storage AND data_class=sensitive | FP: Compartilhamento excepcional aprovado\nDetecção: Possível DNS tunneling | Sinal: Queries longas, alta entropia e volume incomum | Query: avg(qname_len)>X AND entropy>Y AND qps>Z | FP: Ferramentas legítimas de telemetry mal classificadas",
        "expectedOutput": "Tabela de detecções com hipótese, dados necessários, falsos positivos e resposta operacional.",
        "explanation": "Blue Team maduro não apenas encontra problemas; transforma aprendizado em detecção contínua."
      },
      {
        "number": 14,
        "title": "Planejar mitigação proporcional e rollback",
        "instruction": "Escolha ações de contenção que reduzam risco sem causar indisponibilidade desnecessária e documente como voltar atrás.",
        "command": "Ações candidatas: Bloqueio de destino/categoria | Revogação de token SaaS | Isolamento do host | Preservação de logs DLP/CASB | Acionamento jurídico/privacidade quando necessário",
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
        "instruction": "Compare volume, categoria, baseline, identidade e rótulo DLP. Diferencie upload legítimo de artefato versus possível saída indevida.",
        "artifact": "timestamp,host,user,dst_fqdn,dst_category,bytes_out,bytes_in,baseline_bytes_out,dlp_label,proxy_action\n2026-07-01T16:00:00Z,ws-050,ana,storage-approved.example,corporate-saas,24000000,500000,22000000,public,allow\n2026-07-01T16:05:00Z,ws-051,bruno,paste-lab.example,uncategorized,850000000,20000,3500000,confidential,allow\n2026-07-01T16:06:00Z,ws-051,bruno,paste-lab.example,uncategorized,780000000,18000,3500000,confidential,allow\n2026-07-01T16:09:00Z,build-01,svc-ci,artifact-repo.example,corporate-saas,950000000,1200000,900000000,internal,allow",
        "analysisTask": "Aplicar a ideia de detecção: bytes_out > baseline_bytes_out*20 AND dst_category NOT IN approved_categories AND dlp_label IN (confidential,restricted)",
        "evidence": "Baseline de volume | Proxy/DLP log sintético | Identidade e dono | Decisão de contenção e escalonamento",
        "expectedOutput": "ws-051 tem volume muito acima do baseline para destino não categorizado com dado confidential; build-01 é alto volume esperado.",
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
    "expectedResult": "Dossiê completo com baseline, evidências, linha do tempo, classificação de severidade, resposta proporcional, RCA e backlog preventivo.",
    "validation": [
      {
        "check": "O relatório final deve mostrar a diferença entre volume alto legítimo, erro operacional, vazamento acidental e exfiltração provável.",
        "method": "Revisão do artefato ou evidência produzido no passo correspondente",
        "expected": "O relatório final deve mostrar a diferença entre volume alto legítimo, erro operacional, vazamento acidental e exfiltração provável.",
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
        "symptom": "Se a investigação ficar inconclusiva, documente quais logs faltaram, qual risco residual permanece e qual controle será implantado.",
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
      "Criar baseline de egress por perfil de ativo.",
      "Ativar logs de storage, proxy, DNS, flow logs e cloud audit com retenção adequada.",
      "Aplicar DLP por classificação de dados.",
      "Restringir egress de workloads com firewall/proxy/private endpoints.",
      "Alertar anomalias de NAT, billing e transferências entre regiões.",
      "Revisar permissões de contas de serviço e tokens de pipeline.",
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
      "Baseline de volume",
      "Destino/categoria",
      "Identidade",
      "Classificação de dado",
      "Evento DLP/CASB",
      "Timeline e decisão",
      "Proxy/DLP log sintético",
      "Identidade e dono",
      "Decisão de contenção e escalonamento"
    ],
    "questions": [
      "Qual evidência mostra que o laboratório de “Exfiltração, DLP e anomalias de volume” foi concluído corretamente?",
      "Qual erro comum este laboratório ajuda a evitar?",
      "Como este resultado seria usado em um ambiente corporativo real?",
      "Qual risco de segurança ou operação precisa ser documentado antes de aplicar isso em produção?"
    ],
    "challenge": "Desafio: playbook defensivo de exfiltração em ambiente híbrido",
    "solution": "A solução deve justificar decisões, apresentar evidências, validar o resultado e indicar correções para erros comuns.",
    "blueTeamMode": true,
    "authorizationRequired": true,
    "defensiveGoal": "Identificar vazamento potencial sem violar privacidade: foco em metadados, volume, destino, tipo de canal, identidade e classificação do dado.",
    "authorizedScope": "Somente metadados, logs e simulações com arquivos fictícios. Não abrir conteúdo real de usuários sem processo formal.",
    "allowedActions": [
      "Analisar bytes out por baseline",
      "Correlacionar destino e identidade",
      "Classificar canais permitidos",
      "Criar resposta graduada"
    ],
    "prohibitedActions": [
      "Inspecionar conteúdo pessoal sem autorização",
      "Copiar dados sensíveis para teste",
      "Enviar dados reais para serviços externos",
      "Ignorar cadeia de custódia"
    ],
    "telemetrySources": [
      "Proxy upload logs",
      "Firewall/flow bytes out",
      "CASB/SaaS audit",
      "DLP events",
      "DNS tunneling signals",
      "EDR file/network correlation",
      "logs sintéticos",
      "PCAP textual sanitizado",
      "Zeek conn.log/dns.log fictício",
      "flow logs fictícios",
      "timeline simulada"
    ],
    "siemNdrDetectionIdeas": [
      {
        "name": "Upload acima do baseline",
        "signal": "Bytes out por usuário/host acima do normal",
        "queryIdea": "bytes_out > baseline_p95*3 BY user,host,dst",
        "commonFalsePositive": "Backup legítimo",
        "response": "Validar mudança, destino e classificação antes de bloquear."
      },
      {
        "name": "Destino não aprovado para dados sensíveis",
        "signal": "Upload para storage pessoal ou domínio raro",
        "queryIdea": "category=personal_storage AND data_class=sensitive",
        "commonFalsePositive": "Compartilhamento excepcional aprovado",
        "response": "Bloquear canal, preservar evento e acionar responsável de dados."
      },
      {
        "name": "Possível DNS tunneling",
        "signal": "Queries longas, alta entropia e volume incomum",
        "queryIdea": "avg(qname_len)>X AND entropy>Y AND qps>Z",
        "commonFalsePositive": "Ferramentas legítimas de telemetry mal classificadas",
        "response": "Bloquear domínio e coletar endpoint se houver outros sinais."
      }
    ],
    "containmentActions": [
      "Bloqueio de destino/categoria",
      "Revogação de token SaaS",
      "Isolamento do host",
      "Preservação de logs DLP/CASB",
      "Acionamento jurídico/privacidade quando necessário"
    ],
    "evidenceChecklist": [
      "Baseline de volume",
      "Destino/categoria",
      "Identidade",
      "Classificação de dado",
      "Evento DLP/CASB",
      "Timeline e decisão"
    ],
    "rollbackPlan": "Toda ação de bloqueio, alteração de regra, isolamento ou mudança de roteamento deve ter retorno documentado, dono, prazo e validação pós-rollback.",
    "cleanup": "Se algum recurso de laboratório/cloud for criado, remover ao final, revogar credenciais temporárias, apagar dados sensíveis desnecessários e manter apenas evidências mínimas autorizadas.",
    "syntheticDataset": {
      "title": "Dataset sintético — fluxo volumétrico anômalo",
      "theme": "exfiltração e anomalia de volume",
      "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
      "dataset": [
        "timestamp,host,user,dst_fqdn,dst_category,bytes_out,bytes_in,baseline_bytes_out,dlp_label,proxy_action",
        "2026-07-01T16:00:00Z,ws-050,ana,storage-approved.example,corporate-saas,24000000,500000,22000000,public,allow",
        "2026-07-01T16:05:00Z,ws-051,bruno,paste-lab.example,uncategorized,850000000,20000,3500000,confidential,allow",
        "2026-07-01T16:06:00Z,ws-051,bruno,paste-lab.example,uncategorized,780000000,18000,3500000,confidential,allow",
        "2026-07-01T16:09:00Z,build-01,svc-ci,artifact-repo.example,corporate-saas,950000000,1200000,900000000,internal,allow"
      ],
      "analysisPrompt": "Compare volume, categoria, baseline, identidade e rótulo DLP. Diferencie upload legítimo de artefato versus possível saída indevida.",
      "detectionIdea": "bytes_out > baseline_bytes_out*20 AND dst_category NOT IN approved_categories AND dlp_label IN (confidential,restricted)",
      "expectedFinding": "ws-051 tem volume muito acima do baseline para destino não categorizado com dado confidential; build-01 é alto volume esperado.",
      "evidenceToCollect": [
        "Baseline de volume",
        "Proxy/DLP log sintético",
        "Identidade e dono",
        "Decisão de contenção e escalonamento"
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
      "title": "Volume não é contexto",
      "prompt": "Explique por que um upload de 50 GB pode ser legítimo enquanto 500 MB podem ser mais suspeitos.",
      "expectedAnswer": "Porque a interpretação depende de dado, origem, destino, identidade, horário, baseline, autorização e sensibilidade. Um backup aprovado pode ser grande; um export confidencial para destino desconhecido pode ser crítico mesmo pequeno."
    },
    {
      "title": "Fontes de evidência",
      "prompt": "Liste oito fontes úteis para investigar possível exfiltração.",
      "expectedAnswer": "DLP, proxy logs, firewall/flow logs, DNS logs, EDR, IAM/IdP, storage audit, cloud audit, CASB/SSE, SIEM, billing, WAF/LB logs e tickets de mudança."
    },
    {
      "title": "Cloud e custo",
      "prompt": "Por que aumento de egress em cloud deve ser tratado como sinal técnico e financeiro?",
      "expectedAnswer": "Porque pode indicar vazamento, erro de arquitetura, replicação indevida ou uso legítimo caro; além do risco de dados, egress/NAT/inter-region podem gerar custo expressivo."
    },
    {
      "title": "Resposta proporcional",
      "prompt": "Um bucket privado teve 20 mil objetos baixados por conta de serviço fora do padrão. Quais ações iniciais são proporcionais?",
      "expectedAnswer": "Preservar logs, verificar owner e mudança recente, restringir token ou permissão específica, suspender compartilhamento se houver risco, correlacionar IAM/storage/network, avaliar dados envolvidos e definir rollback."
    },
    {
      "id": "ex16.9.blue.1",
      "type": "detecção",
      "prompt": "Crie uma regra defensiva para o tema “Exfiltração, DLP e anomalias de volume” usando uma fonte de telemetria, um sinal observável, um falso positivo provável e uma resposta proporcional.",
      "expectedAnswer": "A resposta deve usar uma fonte como Proxy upload logs, Firewall/flow bytes out, CASB/SaaS audit, explicar o sinal, citar falso positivo e propor contenção reversível.",
      "explanation": "O objetivo é treinar engenharia de detecção, não memorização de ferramenta."
    },
    {
      "id": "ex16.9.blue.2",
      "type": "ética e escopo",
      "prompt": "Liste três coisas que não podem ser feitas neste laboratório sem nova autorização e explique o risco de cada uma.",
      "expectedAnswer": "Inspecionar conteúdo pessoal sem autorização: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Copiar dados sensíveis para teste: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência. Enviar dados reais para serviços externos: pode causar impacto, violar privacidade, ultrapassar contrato ou contaminar evidência.",
      "explanation": "Saber limitar a própria atuação é uma competência profissional de segurança."
    },
    {
      "id": "ex16.9.dataset",
      "type": "análise de dataset sintético",
      "prompt": "Usando o dataset “Dataset sintético — fluxo volumétrico anômalo”, escreva uma hipótese defensiva, um falso positivo provável e uma ação de contenção reversível.",
      "expectedAnswer": "ws-051 tem volume muito acima do baseline para destino não categorizado com dado confidential; build-01 é alto volume esperado. A resposta deve citar pelo menos uma evidência, um falso positivo e uma contenção proporcional com rollback.",
      "explanation": "O exercício treina análise defensiva baseada em dados, não execução de técnica ofensiva."
    }
  ],
  "quiz": [
    {
      "question": "Qual afirmação é mais correta sobre exfiltração defensiva?",
      "options": [
        "É sempre identificada apenas por volume alto.",
        "É saída indevida ou não esperada de dados, interpretada por contexto e evidências.",
        "Só ocorre por FTP.",
        "Não pode ser investigada em cloud."
      ],
      "answer": 1,
      "explanation": "Exfiltração exige análise de dado, identidade, destino, volume, baseline, autorização e controles."
    },
    {
      "question": "O que DLP precisa para funcionar bem?",
      "options": [
        "Apenas bloqueio total de internet.",
        "Classificação de dados, políticas, identidade, logs, exceções e resposta.",
        "Somente antivírus.",
        "Apenas uma lista de IPs bloqueados."
      ],
      "answer": 1,
      "explanation": "DLP é processo e arquitetura, não apenas ferramenta isolada."
    },
    {
      "question": "Qual é um sinal relevante em cloud?",
      "options": [
        "Uso de subnet privada por si só.",
        "Aumento anômalo de egress via NAT ou leitura massiva de storage fora do baseline.",
        "Todo acesso via Private Link.",
        "Ter tags nos recursos."
      ],
      "answer": 1,
      "explanation": "Egress e leitura massiva fora do baseline podem indicar vazamento ou erro operacional relevante."
    },
    {
      "question": "Qual é uma má prática durante investigação?",
      "options": [
        "Preservar logs.",
        "Separar fato de hipótese.",
        "Apagar evidências para reduzir custo antes de concluir análise.",
        "Conter de forma proporcional."
      ],
      "answer": 2,
      "explanation": "Destruir evidências prejudica investigação, RCA e obrigações de resposta."
    },
    {
      "question": "Por que metadados são úteis?",
      "options": [
        "Porque sempre revelam todo conteúdo sensível.",
        "Porque ajudam a entender origem, destino, volume, horário e caminho sem necessariamente acessar conteúdo.",
        "Porque substituem totalmente DLP.",
        "Porque eliminam necessidade de IAM."
      ],
      "answer": 1,
      "explanation": "Metadados reduzem exposição de conteúdo e ajudam a montar linha do tempo, mas não substituem classificação e DLP."
    },
    {
      "question": "Qual melhoria preventiva é coerente após anomalia de saída em pipeline?",
      "options": [
        "Dar permissões amplas ao runner.",
        "Desativar logs de pipeline.",
        "Adicionar secret scanning, escopo mínimo de tokens, egress allowlist e policy as code.",
        "Permitir upload para qualquer destino."
      ],
      "answer": 2,
      "explanation": "DevSecOps defensivo reduz saída indevida antes da produção."
    }
  ],
  "flashcards": [
    {
      "front": "Exfiltração",
      "back": "Saída não autorizada, indevida ou inesperada de dados de um ambiente controlado."
    },
    {
      "front": "DLP",
      "back": "Conjunto de processos e tecnologias para identificar, monitorar, governar e, quando necessário, bloquear movimentação de dados sensíveis."
    },
    {
      "front": "Anomalia de volume",
      "back": "Desvio relevante no volume, destino, horário, frequência ou perfil de transferência comparado ao baseline."
    },
    {
      "front": "CASB/SSE",
      "back": "Camadas de controle e visibilidade para uso de SaaS, aplicações web, dados e acesso seguro."
    },
    {
      "front": "Egress control",
      "back": "Políticas que restringem para onde workloads, endpoints e serviços podem enviar tráfego."
    },
    {
      "front": "Classificação de dados",
      "back": "Processo de atribuir sensibilidade e regras de manuseio a dados para orientar DLP, acesso, retenção e resposta."
    }
  ],
  "mentorQuestions": [
    "No seu ambiente, qual caminho de saída é menos governado: endpoint, SaaS, cloud storage, pipeline ou conta de serviço?",
    "Que fonte de log seria mais valiosa para investigar exfiltração: DLP, proxy, storage audit, flow logs, EDR ou IAM? Por quê?",
    "Como você equilibraria contenção rápida com preservação de evidências e continuidade de negócio?"
  ],
  "challenge": {
    "title": "Desafio: playbook defensivo de exfiltração em ambiente híbrido",
    "description": "Desenhe um playbook completo para investigar anomalia de saída envolvendo endpoint, SaaS, storage cloud, pipeline e NAT Gateway.",
    "requirements": [
      "Escopo e autorização",
      "Fontes de logs",
      "Baseline de egress",
      "Classificação de dados",
      "Matriz de severidade",
      "Ações de contenção",
      "Privacidade e jurídico",
      "Rollback",
      "RCA",
      "Backlog preventivo"
    ],
    "deliverable": "Documento de playbook SOC/CloudSec com fluxo de decisão, evidências mínimas, matriz de risco, comunicação, contenção proporcional e melhorias de arquitetura.",
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
    "overview": "Uma boa solução trata exfiltração como problema multidisciplinar. Ela não se limita ao firewall nem ao DLP; correlaciona dado, identidade, rede, aplicação, cloud, custo e governança.",
    "keyPoints": [
      "Começar por escopo, privacidade e preservação de evidências.",
      "Criar baseline por perfil de ativo e dado.",
      "Correlacionar logs de rede, DLP, endpoint, IAM, storage, cloud audit e billing.",
      "Separar fato, hipótese e lacuna.",
      "Aplicar contenção específica, reversível e proporcional.",
      "Converter o achado em melhoria preventiva com dono e prazo."
    ],
    "commonMistakes": [
      "Concluir incidente apenas por volume alto.",
      "Ignorar classificação de dados.",
      "Bloquear serviços amplos sem avaliar impacto.",
      "Não envolver privacidade/jurídico quando dados regulados podem estar envolvidos.",
      "Não investigar contas de serviço e pipelines.",
      "Encerrar sem corrigir egress, DLP, IAM ou logging."
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
      "term": "Exfiltração",
      "definition": "Saída indevida, não autorizada ou não esperada de dados de um ambiente controlado."
    },
    {
      "term": "DLP",
      "definition": "Data Loss/Leak Prevention: controles para identificar, monitorar, governar e bloquear movimentação de dados sensíveis conforme política."
    },
    {
      "term": "Anomalia de volume",
      "definition": "Transferência cujo volume, destino, horário, frequência ou perfil foge do baseline esperado."
    },
    {
      "term": "CASB",
      "definition": "Cloud Access Security Broker: camada de visibilidade e controle entre usuários e serviços cloud/SaaS."
    },
    {
      "term": "Egress",
      "definition": "Tráfego de saída de uma rede, workload, endpoint ou ambiente cloud para outro destino."
    },
    {
      "term": "Classificação de dados",
      "definition": "Identificação do nível de sensibilidade de dados para orientar acesso, DLP, retenção, criptografia e resposta."
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
        "16.9",
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
        "16.9",
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
        "16.9",
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
        "16.9",
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
      "title": "MITRE ATT&CK — Exfiltration, TA0010",
      "url": "https://attack.mitre.org/tactics/TA0010/"
    },
    {
      "title": "MITRE ATT&CK — Exfiltration Over Alternative Protocol, T1048",
      "url": "https://attack.mitre.org/techniques/T1048/"
    },
    {
      "title": "CISA — StopRansomware Guide",
      "url": "https://www.cisa.gov/stopransomware/ransomware-guide"
    },
    {
      "title": "NIST SP 800-53 Rev. 5 — Security and Privacy Controls",
      "url": "https://csrc.nist.gov/pubs/sp/800/53/r5/upd1/final"
    },
    {
      "title": "Google Cloud — Sensitive Data Protection documentation",
      "url": "https://docs.cloud.google.com/sensitive-data-protection/docs"
    },
    {
      "title": "Google Cloud — Cloud Data Loss Prevention / Sensitive Data Protection",
      "url": "https://cloud.google.com/security/products/dlp"
    }
  ],
  "nextLesson": "16.10 — Threat hunting com NetFlow, Zeek, firewall e proxy logs",
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
              "name": "Risco Blue Team específico — Exfiltração, DLP e anomalias de volume",
              "description": "Em Exfiltração, DLP e anomalias de volume, o risco principal é confundir validação defensiva com atividade ofensiva sem escopo, ou aceitar um alerta sem correlação suficiente entre rede, DNS, proxy, endpoint, identidade, cloud e timeline.",
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
      "Proxy upload logs",
      "Firewall/flow bytes out",
      "CASB/SaaS audit",
      "DLP events",
      "DNS tunneling signals",
      "EDR file/network correlation"
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
      "Criar alerta ou consulta específica para sinais relacionados à aula 16.9.",
      "Upload acima do baseline — sinal: Bytes out por usuário/host acima do normal; ideia de consulta: bytes_out > baseline_p95*3 BY user,host,dst; falso positivo comum: Backup legítimo.",
      "Destino não aprovado para dados sensíveis — sinal: Upload para storage pessoal ou domínio raro; ideia de consulta: category=personal_storage AND data_class=sensitive; falso positivo comum: Compartilhamento excepcional aprovado.",
      "Possível DNS tunneling — sinal: Queries longas, alta entropia e volume incomum; ideia de consulta: avg(qname_len)>X AND entropy>Y AND qps>Z; falso positivo comum: Ferramentas legítimas de telemetry mal classificadas."
    ],
    "ethicalLimits": {
      "authorizedScope": "Somente metadados, logs e simulações com arquivos fictícios. Não abrir conteúdo real de usuários sem processo formal.",
      "allowedActions": [
        "Analisar bytes out por baseline",
        "Correlacionar destino e identidade",
        "Classificar canais permitidos",
        "Criar resposta graduada"
      ],
      "prohibitedActions": [
        "Inspecionar conteúdo pessoal sem autorização",
        "Copiar dados sensíveis para teste",
        "Enviar dados reais para serviços externos",
        "Ignorar cadeia de custódia"
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
      "Falha ou comportamento inesperado relacionado a Exfiltração, DLP e anomalias de volume.",
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
      "Qual evidência comprova o entendimento da aula 16.9?"
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
      "16.10"
    ]
  },
  "blueTeamEnhancement": {
    "title": "Exfiltração, DLP e anomalias de volume",
    "defensiveGoal": "Identificar vazamento potencial sem violar privacidade: foco em metadados, volume, destino, tipo de canal, identidade e classificação do dado.",
    "authorizedScope": "Somente metadados, logs e simulações com arquivos fictícios. Não abrir conteúdo real de usuários sem processo formal.",
    "allowedActions": [
      "Analisar bytes out por baseline",
      "Correlacionar destino e identidade",
      "Classificar canais permitidos",
      "Criar resposta graduada"
    ],
    "prohibitedActions": [
      "Inspecionar conteúdo pessoal sem autorização",
      "Copiar dados sensíveis para teste",
      "Enviar dados reais para serviços externos",
      "Ignorar cadeia de custódia"
    ],
    "telemetrySources": [
      "Proxy upload logs",
      "Firewall/flow bytes out",
      "CASB/SaaS audit",
      "DLP events",
      "DNS tunneling signals",
      "EDR file/network correlation"
    ],
    "detectionEngineering": [
      {
        "name": "Upload acima do baseline",
        "signal": "Bytes out por usuário/host acima do normal",
        "queryIdea": "bytes_out > baseline_p95*3 BY user,host,dst",
        "commonFalsePositive": "Backup legítimo",
        "response": "Validar mudança, destino e classificação antes de bloquear."
      },
      {
        "name": "Destino não aprovado para dados sensíveis",
        "signal": "Upload para storage pessoal ou domínio raro",
        "queryIdea": "category=personal_storage AND data_class=sensitive",
        "commonFalsePositive": "Compartilhamento excepcional aprovado",
        "response": "Bloquear canal, preservar evento e acionar responsável de dados."
      },
      {
        "name": "Possível DNS tunneling",
        "signal": "Queries longas, alta entropia e volume incomum",
        "queryIdea": "avg(qname_len)>X AND entropy>Y AND qps>Z",
        "commonFalsePositive": "Ferramentas legítimas de telemetry mal classificadas",
        "response": "Bloquear domínio e coletar endpoint se houver outros sinais."
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
      "Bloqueio de destino/categoria",
      "Revogação de token SaaS",
      "Isolamento do host",
      "Preservação de logs DLP/CASB",
      "Acionamento jurídico/privacidade quando necessário"
    ],
    "evidencePackage": [
      "Baseline de volume",
      "Destino/categoria",
      "Identidade",
      "Classificação de dado",
      "Evento DLP/CASB",
      "Timeline e decisão"
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
    "title": "Dataset sintético — fluxo volumétrico anômalo",
    "theme": "exfiltração e anomalia de volume",
    "safeUse": "Dados fictícios para análise defensiva. Não representam alvo real, não contêm payload, credencial, segredo ou dado pessoal real.",
    "dataset": [
      "timestamp,host,user,dst_fqdn,dst_category,bytes_out,bytes_in,baseline_bytes_out,dlp_label,proxy_action",
      "2026-07-01T16:00:00Z,ws-050,ana,storage-approved.example,corporate-saas,24000000,500000,22000000,public,allow",
      "2026-07-01T16:05:00Z,ws-051,bruno,paste-lab.example,uncategorized,850000000,20000,3500000,confidential,allow",
      "2026-07-01T16:06:00Z,ws-051,bruno,paste-lab.example,uncategorized,780000000,18000,3500000,confidential,allow",
      "2026-07-01T16:09:00Z,build-01,svc-ci,artifact-repo.example,corporate-saas,950000000,1200000,900000000,internal,allow"
    ],
    "analysisPrompt": "Compare volume, categoria, baseline, identidade e rótulo DLP. Diferencie upload legítimo de artefato versus possível saída indevida.",
    "detectionIdea": "bytes_out > baseline_bytes_out*20 AND dst_category NOT IN approved_categories AND dlp_label IN (confidential,restricted)",
    "expectedFinding": "ws-051 tem volume muito acima do baseline para destino não categorizado com dado confidential; build-01 é alto volume esperado.",
    "evidenceToCollect": [
      "Baseline de volume",
      "Proxy/DLP log sintético",
      "Identidade e dono",
      "Decisão de contenção e escalonamento"
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
