export const lesson0702 = {
  "id": "7.2",
  "moduleId": "m07",
  "order": 2,
  "title": "Hierarquia DNS, zonas e delegação",
  "subtitle": "Entenda como o DNS organiza o namespace global em raiz, TLDs, domínios, subdomínios e zonas delegadas, e por que autoridade, NS, SOA e glue records são essenciais para operação e segurança.",
  "duration": "110-155 min",
  "estimatedStudyTimeMinutes": 155,
  "difficulty": "iniciante-intermediário",
  "type": "fundamental",
  "xp": 250,
  "tags": [
    "redes",
    "dns",
    "hierarquia dns",
    "zonas dns",
    "delegação",
    "ns",
    "soa",
    "glue records",
    "split dns",
    "cloud",
    "segurança",
    "troubleshooting"
  ],
  "prerequisites": [
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m07",
      "lesson": "7.1",
      "title": "Por que DNS existe",
      "reason": "A aula anterior explica o problema que DNS resolve e o fluxo básico de resolução."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.5",
      "title": "Gateway padrão e rota local",
      "reason": "Ajuda a diferenciar autoridade de nomes de caminho IP até os servidores DNS."
    },
    {
      "type": "lesson",
      "course": "Redes e Network",
      "module": "m04",
      "lesson": "4.6",
      "title": "IPv4 público, privado, loopback e APIPA",
      "reason": "Zonas públicas e privadas dependem de entender escopos de endereço."
    }
  ],
  "objectives": [
    "Explicar a hierarquia DNS desde a raiz até zonas autoritativas específicas.",
    "Diferenciar domínio, subdomínio, zona, registro e delegação.",
    "Entender o papel de registros NS, SOA e glue records.",
    "Explicar por que uma zona pode ser administrada por uma equipe ou provedor diferente do domínio pai.",
    "Relacionar delegação DNS com operação corporativa, cloud, split DNS, DevSecOps e segurança.",
    "Diagnosticar falhas comuns de delegação, autoridade, zona pública/privada e registro inconsistente."
  ],
  "learningOutcomes": [
    "Ler um nome FQDN e identificar seus níveis hierárquicos.",
    "Descrever quem é autoritativo por cada parte de um namespace DNS.",
    "Montar uma matriz simples de zonas, responsáveis, NS e riscos.",
    "Investigar problemas de delegação usando dig/nslookup/Resolve-DnsName de forma metódica."
  ],
  "content": {
    "motivation": "\n<section class='lesson-section lesson-section--motivation'>\n  <h2>Motivação</h2>\n  <p>Na aula anterior você aprendeu que DNS existe para transformar nomes em informações úteis para redes e aplicações. Agora surge uma pergunta mais profunda: quem tem autoridade para responder por cada nome?</p><p>Quando você consulta <code>app.financeiro.empresa.com</code>, a resposta não vem de uma tabela universal mantida por uma única organização. Ela é encontrada por meio de uma cadeia hierárquica: raiz, domínio de topo, domínio, subdomínio e zona autoritativa. Essa arquitetura permite que a Internet cresça sem depender de um banco central único.</p><div class='callout'><strong>Ideia central:</strong> DNS escala porque é hierárquico e delegável. Cada parte do namespace pode apontar para servidores responsáveis pela próxima parte.</div>\n</section>\n",
    "history": "\n<section class='lesson-section lesson-section--history'>\n  <h2>História</h2>\n  <p>Antes do DNS, listas de nomes eram mantidas manualmente. Isso funcionava enquanto existiam poucos hosts, mas não servia para uma rede global. A solução precisava distribuir responsabilidade: uma entidade cuida da raiz, outra dos TLDs, uma empresa cuida do próprio domínio e equipes internas podem cuidar de subdomínios específicos.</p><p>A hierarquia DNS foi desenhada para descentralizar administração sem perder previsibilidade. Por isso nomes são lidos logicamente da direita para a esquerda: a raiz vem no final implícito, depois <code>com</code>, depois <code>empresa</code>, depois subdomínios como <code>financeiro</code> e hosts como <code>app</code>.</p>\n</section>\n",
    "problem": "\n<section class='lesson-section lesson-section--problem'>\n  <h2>Problema</h2>\n  <p>O problema não é apenas saber o IP de um nome. O problema é permitir que milhões de organizações administrem nomes sem conflitar, sem depender de uma lista central editada manualmente e sem expor toda a infraestrutura interna ao mundo.</p><p>Em uma empresa real, o time de plataforma pode administrar <code>apps.empresa.com</code>, o time de identidade pode administrar <code>auth.empresa.com</code>, o time de e-mail depende de registros em <code>empresa.com</code>, e a cloud pode criar zonas privadas como <code>privatelink.database.windows.net</code> ou nomes internos associados à VPC/VNet.</p><div class='callout callout--problem'><strong>Problema operacional:</strong> sem delegação, toda mudança de subdomínio dependeria do mesmo administrador, do mesmo provedor e do mesmo processo. Isso não escala em empresas, cloud e Internet.</div>\n</section>\n",
    "evolution": "\n<section class='lesson-section lesson-section--evolution'>\n  <h2>Evolução</h2>\n  <p>A evolução do DNS vai de nomes simples para namespaces administráveis. Primeiro, um domínio podia conter alguns registros. Depois, subdomínios passaram a representar áreas de negócio, ambientes, países, provedores, serviços e clouds.</p><p>Com a adoção de cloud, SaaS, CDN, e-mail autenticado, certificados automáticos e private endpoints, a gestão de zonas ficou ainda mais crítica. Hoje, uma zona DNS mal delegada pode quebrar login corporativo, pipeline, emissão de certificado, e-mail, acesso VPN, APIs públicas e integrações privadas.</p>\n</section>\n",
    "concept": "\n<section class='lesson-section lesson-section--concept'>\n  <h2>Conceito</h2>\n  <p><strong>Hierarquia DNS</strong> é a organização do namespace em níveis. A raiz fica no topo lógico, os TLDs ficam abaixo dela, domínios ficam abaixo dos TLDs, e subdomínios podem ser administrados dentro da mesma zona ou delegados para outra zona.</p><p><strong>Zona DNS</strong> é uma porção administrável do namespace. Um domínio e uma zona podem parecer iguais em muitos casos, mas não são exatamente a mesma coisa. <code>empresa.com</code> pode ser um domínio e também uma zona; <code>financeiro.empresa.com</code> pode ser apenas um subdomínio dentro da zona pai ou uma zona separada delegada para servidores próprios.</p><div class='definition-box'>Delegação DNS é o ato de uma zona pai indicar, por registros NS, quais servidores são autoritativos por uma zona filha.</div>\n</section>\n",
    "internals": "\n<section class='lesson-section lesson-section--internals'>\n  <h2>Funcionamento interno</h2>\n  <p>Quando um resolvedor precisa encontrar <code>app.financeiro.empresa.com</code> e não possui cache, ele segue referências. A raiz não responde o IP final, mas aponta para os servidores do TLD <code>.com</code>. O TLD aponta para os servidores autoritativos de <code>empresa.com</code>. A zona <code>empresa.com</code> pode responder diretamente ou delegar <code>financeiro.empresa.com</code> para outros servidores.</p><ol class='flow-list'><li>O cliente pergunta ao resolvedor recursivo.</li><li>O resolvedor consulta a raiz, se necessário.</li><li>A raiz informa quais servidores respondem pelo TLD.</li><li>O TLD informa quais servidores respondem pelo domínio.</li><li>O domínio pai responde ou delega um subdomínio.</li><li>O servidor autoritativo final responde pelo registro solicitado.</li><li>O resolvedor armazena a resposta em cache conforme TTL.</li></ol><div class='callout callout--warning'><strong>Ponto crítico:</strong> servidores acima na hierarquia normalmente não conhecem o registro final. Eles conhecem a próxima autoridade.</div>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04c-7-2-authority-cache'>\n  <h4>Autoridade, cache e resposta final não são a mesma coisa</h4>\n  <p>Um resolvedor recursivo pode responder usando cache, mas isso não significa que ele seja autoritativo pela zona. O servidor autoritativo é quem tem responsabilidade oficial por aquele pedaço do namespace. Em troubleshooting, essa distinção evita conclusões erradas: uma resposta em cache pode estar antiga; uma resposta autoritativa mostra o estado oficial; uma delegação quebrada impede o resolvedor de chegar ao local correto.</p>\n  <p>Por isso, ao investigar um problema de zona, não basta perguntar “o nome resolve?”. É preciso perguntar: quem é o NS? O SOA faz sentido? O TLD aponta para os NS corretos? Há glue record quando necessário? O subdomínio é apenas um nome dentro da zona ou é uma zona delegada?</p>\n</div>",
    "architecture": "\n<section class='lesson-section lesson-section--architecture'>\n  <h2>Arquitetura</h2>\n  <p>A arquitetura hierárquica separa autoridade e responsabilidade. Isso reduz acoplamento, permite múltiplos provedores e evita que uma única zona contenha toda a complexidade do namespace.</p><table class='data-table'><thead><tr><th>Nível</th><th>Exemplo</th><th>Papel</th><th>Risco comum</th></tr></thead><tbody><tr><td>Raiz</td><td><code>.</code></td><td>Indica servidores dos TLDs</td><td>Raro no dia a dia, mas crítico para Internet</td></tr><tr><td>TLD</td><td><code>.com</code>, <code>.br</code></td><td>Indica servidores dos domínios</td><td>Delegação incorreta no registrador</td></tr><tr><td>Domínio</td><td><code>empresa.com</code></td><td>Zona principal da organização</td><td>NS errado, SOA inconsistente, registros críticos expostos</td></tr><tr><td>Subdomínio</td><td><code>financeiro.empresa.com</code></td><td>Pode ser parte da zona pai ou zona delegada</td><td>Delegação esquecida, takeover, shadow IT</td></tr><tr><td>Host/serviço</td><td><code>app.financeiro.empresa.com</code></td><td>Nome final usado por aplicações</td><td>Registro antigo, CNAME quebrado, TTL inadequado</td></tr></tbody></table>\n</section>\n\n\n<div class='content-card' data-enhancement='p0-04c-7-2-delegation-risks'>\n  <h4>Riscos de delegação em empresas e cloud</h4>\n  <p>Delegar uma zona é dar autonomia. Isso é poderoso para times, ambientes e provedores, mas também cria risco de governança. Uma zona delegada sem dono, um NS apontando para provedor antigo ou um CNAME para recurso removido podem virar incidente. Em cloud, zonas públicas e privadas com o mesmo nome ainda adicionam o risco de respostas divergentes entre rede interna e externa.</p>\n  <table class='data-table'>\n    <thead><tr><th>Erro</th><th>Impacto</th><th>Como validar</th><th>Mitigação</th></tr></thead>\n    <tbody>\n      <tr><td>NS antigo</td><td>perda de autoridade ou resposta errada</td><td><code>dig domínio NS</code> e painel do registrador</td><td>inventário e revisão de delegações</td></tr>\n      <tr><td>subdomínio órfão</td><td>risco de takeover</td><td>consulta CNAME/NS e existência do recurso</td><td>remover registro ou recriar recurso controlado</td></tr>\n      <tr><td>split DNS não documentado</td><td>falha só fora/dentro da VPN</td><td>comparar resolvedores interno/externo</td><td>documentar zonas públicas/privadas</td></tr>\n      <tr><td>TTL alto em migração</td><td>propagação lenta e rollback difícil</td><td>consultar TTL antes da mudança</td><td>reduzir TTL antes da janela</td></tr>\n    </tbody>\n  </table>\n</div>",
    "analogy": "\n<section class='lesson-section lesson-section--analogy'>\n  <h2>Analogia</h2>\n  <p>Imagine uma empresa grande com uma recepção central. A recepção não sabe a mesa de cada pessoa, mas sabe encaminhar você para o prédio certo. O prédio sabe encaminhar para o andar. O andar sabe encaminhar para o departamento. O departamento sabe onde está a pessoa ou serviço.</p><p>A analogia ajuda a entender delegação, mas tem limite. No DNS, encaminhar significa indicar servidores autoritativos por registros, não transferir fisicamente a consulta como uma ligação humana. O resolvedor segue referências e pode armazenar respostas em cache.</p>\n</section>\n",
    "simpleExample": "\n<section class='lesson-section lesson-section--example'>\n  <h2>Exemplo simples</h2>\n  <p>Você registra <code>meudominio.com</code> em um registrador. No painel do registrador, informa que os servidores autoritativos são <code>ns1.provedor-dns.net</code> e <code>ns2.provedor-dns.net</code>. A partir daí, consultas por registros de <code>meudominio.com</code> serão encaminhadas para esses servidores.</p><p>Dentro da zona, você cria <code>www.meudominio.com A 203.0.113.10</code>. O registrador não precisa conhecer esse registro. Ele só precisa saber quais servidores são autoritativos pelo domínio.</p>\n</section>\n",
    "enterpriseExample": "\n<section class='lesson-section lesson-section--enterprise'>\n  <h2>Exemplo empresarial</h2>\n  <p>Uma organização pode manter <code>empresa.com</code> para nomes públicos, <code>corp.empresa.com</code> para nomes internos e <code>dev.empresa.com</code> para ambientes de desenvolvimento. A zona <code>dev.empresa.com</code> pode ser delegada para o time de plataforma, enquanto <code>empresa.com</code> continua sob governança de infraestrutura e segurança.</p><p>Esse desenho permite autonomia com controle. O time de plataforma consegue criar nomes para aplicações sem pedir alteração manual ao time que administra e-mail, domínio principal e registros de segurança como SPF, DKIM, DMARC e validações de certificado.</p>\n</section>\n",
    "cloudExample": "\n<section class='lesson-section lesson-section--cloud'>\n  <h2>Exemplo em cloud</h2>\n  <p>Em cloud, a diferença entre zona pública e zona privada é essencial. Uma zona pública responde na Internet. Uma zona privada só responde para redes associadas, como uma VPC/VNet. O mesmo nome pode responder IP público fora da empresa e IP privado dentro dela, no padrão chamado split DNS.</p><p>Serviços como private endpoints, load balancers internos, Kubernetes ingress privado, bancos gerenciados e VPNs dependem de delegação, associação de zonas e resolução correta dentro do escopo certo. Um erro de associação pode fazer a aplicação tentar acessar um IP público quando deveria usar um endpoint privado.</p>\n</section>\n",
    "devsecopsExample": "\n<section class='lesson-section lesson-section--devsecops'>\n  <h2>Exemplo em DevSecOps</h2>\n  <p>Pipelines modernos criam e alteram registros DNS via IaC. Isso permite revisão por pull request, histórico, rollback e padronização. O risco é que permissões excessivas permitam que um pipeline publique registros públicos indevidos, apague NS, altere TXT de validação ou deixe subdomínios apontando para recursos removidos.</p><p>Uma prática madura separa zonas por ambiente, limita permissões por escopo, exige revisão para registros públicos críticos e monitora subdomínios órfãos. DNS deve ser tratado como infraestrutura crítica, não como detalhe de deploy.</p>\n</section>\n",
    "securityExample": "\n<section class='lesson-section lesson-section--security'>\n  <h2>Exemplo em Segurança</h2>\n  <p>Delegação DNS incorreta pode gerar incidentes sérios. Se um subdomínio aponta para um provedor externo que foi removido, mas o registro permanece, pode surgir risco de subdomain takeover. Se registros NS forem alterados indevidamente, um atacante pode controlar respostas de nomes críticos.</p><p>Em defesa, é importante monitorar alterações de NS, SOA, CNAME e TXT; proteger o registrador com MFA; auditar zonas públicas; validar se subdomínios delegados ainda têm dono; e tratar DNS como parte da superfície de ataque.</p><div class='callout callout--security'><strong>Regra defensiva:</strong> quem controla a delegação controla quem pode responder por aquela parte do namespace.</div>\n</section>\n",
    "diagram": "\n<section class='lesson-section lesson-section--diagram'>\n  <h2>Diagrama SVG — hierarquia DNS, zonas e delegação</h2>\n  <p>O diagrama mostra que DNS não é uma base única. Cada nível aponta para o próximo responsável, até chegar ao servidor autoritativo da zona que contém o registro desejado.</p>\n  <svg class='lesson-svg' viewBox='0 0 1040 620' role='img' aria-labelledby='m07l02-title m07l02-desc'>\n    <title id='m07l02-title'>Hierarquia DNS com raiz, TLD, zona autoritativa e delegação</title>\n    <desc id='m07l02-desc'>Cliente consulta resolvedor, resolvedor percorre raiz, TLD e servidores autoritativos até encontrar registros de uma zona delegada.</desc>\n    <defs>\n      <marker id='m07l02-arrow' markerWidth='10' markerHeight='10' refX='8' refY='3' orient='auto' markerUnits='strokeWidth'>\n        <path d='M0,0 L0,6 L9,3 z' class='svg-flow-marker'></path>\n      </marker>\n    </defs>\n    <rect x='25' y='35' width='990' height='550' rx='22' class='svg-zone'></rect>\n    <text x='520' y='72' text-anchor='middle' class='svg-label'>Consulta por app.financeiro.empresa.com</text>\n\n    <rect x='70' y='245' width='145' height='90' rx='14' class='svg-node svg-node--client'></rect>\n    <text x='142' y='278' text-anchor='middle' class='svg-label'>Cliente</text>\n    <text x='142' y='302' text-anchor='middle' class='svg-label svg-label--small'>stub resolver</text>\n\n    <rect x='285' y='245' width='165' height='90' rx='14' class='svg-node svg-node--server'></rect>\n    <text x='368' y='278' text-anchor='middle' class='svg-label'>Resolvedor</text>\n    <text x='368' y='302' text-anchor='middle' class='svg-label svg-label--small'>recursivo + cache</text>\n\n    <rect x='530' y='100' width='145' height='80' rx='14' class='svg-node svg-node--router'></rect>\n    <text x='602' y='132' text-anchor='middle' class='svg-label'>Raiz</text>\n    <text x='602' y='154' text-anchor='middle' class='svg-label svg-label--small'>.</text>\n\n    <rect x='530' y='245' width='145' height='80' rx='14' class='svg-node svg-node--cloud'></rect>\n    <text x='602' y='278' text-anchor='middle' class='svg-label'>TLD</text>\n    <text x='602' y='302' text-anchor='middle' class='svg-label svg-label--small'>.com</text>\n\n    <rect x='520' y='405' width='170' height='90' rx='14' class='svg-node svg-node--server'></rect>\n    <text x='605' y='438' text-anchor='middle' class='svg-label'>Autoritativo</text>\n    <text x='605' y='462' text-anchor='middle' class='svg-label svg-label--small'>empresa.com</text>\n\n    <rect x='790' y='405' width='170' height='90' rx='14' class='svg-node svg-node--security'></rect>\n    <text x='875' y='438' text-anchor='middle' class='svg-label'>Zona delegada</text>\n    <text x='875' y='462' text-anchor='middle' class='svg-label svg-label--small'>financeiro.empresa.com</text>\n\n    <rect x='770' y='120' width='190' height='130' rx='14' class='svg-zone'></rect>\n    <text x='865' y='154' text-anchor='middle' class='svg-label'>Registros críticos</text>\n    <text x='865' y='184' text-anchor='middle' class='svg-label svg-label--small'>NS + glue quando necessário</text>\n    <text x='865' y='210' text-anchor='middle' class='svg-label svg-label--small'>SOA, A, AAAA, TXT, MX</text>\n\n    <line x1='215' y1='290' x2='285' y2='290' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l02-arrow)'></line>\n    <text x='250' y='270' text-anchor='middle' class='svg-label svg-label--small'>consulta</text>\n\n    <line x1='450' y1='255' x2='530' y2='158' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l02-arrow)'></line>\n    <text x='485' y='185' text-anchor='middle' class='svg-label svg-label--small'>1 raiz</text>\n\n    <line x1='450' y1='290' x2='530' y2='290' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l02-arrow)'></line>\n    <text x='490' y='272' text-anchor='middle' class='svg-label svg-label--small'>2 .com</text>\n\n    <line x1='450' y1='325' x2='535' y2='425' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l02-arrow)'></line>\n    <text x='485' y='390' text-anchor='middle' class='svg-label svg-label--small'>3 empresa.com</text>\n\n    <line x1='690' y1='450' x2='790' y2='450' class='svg-flow svg-flow--request animated-flow' marker-end='url(#m07l02-arrow)'></line>\n    <text x='740' y='430' text-anchor='middle' class='svg-label svg-label--small'>delegação</text>\n\n    <line x1='790' y1='480' x2='450' y2='325' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l02-arrow)'></line>\n    <text x='630' y='545' text-anchor='middle' class='svg-label svg-label--small'>resposta autoritativa + cache conforme TTL</text>\n\n    <line x1='285' y1='325' x2='215' y2='325' class='svg-flow svg-flow--response animated-flow' marker-end='url(#m07l02-arrow)'></line>\n    <text x='250' y='352' text-anchor='middle' class='svg-label svg-label--small'>resposta</text>\n  </svg>\n</section>\n",
    "labIntro": "<section class=\"lesson-section lesson-section--practice-equivalent\">\n  <h2>15. Prática equivalente</h2>\n  <p>Esta aula não possui laboratório independente porque o tema é melhor fixado por exercícios, desafio, estudo de caso ou prática integrada de módulo. Use a seção de exercícios e o desafio da aula como evidência de aprendizado.</p>\n</section>",
    "exercisesIntro": "\n<section class='lesson-section lesson-section--exercises'>\n  <h2>Exercícios</h2>\n  <p>Os exercícios treinam leitura de FQDN, identificação de zona, diferença entre subdomínio e delegação, interpretação de NS/SOA e análise de falhas de autoridade.</p>\n</section>\n",
    "challengeIntro": "\n<section class='lesson-section lesson-section--challenge'>\n  <h2>Desafio</h2>\n  <p>Você receberá um cenário em que <code>api.dev.empresa.com</code> parou de resolver apenas fora da empresa. Sua missão será propor hipóteses envolvendo zona pública, zona privada, delegação, NS, TTL e split DNS.</p>\n</section>\n",
    "solutionIntro": "\n<section class='lesson-section lesson-section--solution'>\n  <h2>Solução comentada</h2>\n  <p>A solução mostra como validar a autoridade de cada nível, comparar resolvedores internos e externos, consultar servidores autoritativos diretamente e evitar conclusões precipitadas baseadas apenas em cache local.</p>\n</section>\n",
    "summary": "\n<section class='lesson-section lesson-section--summary'>\n  <h2>Resumo</h2>\n  <p>DNS é hierárquico para escalar e delegável para distribuir responsabilidade. A raiz aponta para TLDs, TLDs apontam para domínios, domínios podem conter registros ou delegar subdomínios, e servidores autoritativos respondem oficialmente por zonas.</p><p>Entender zonas e delegação é essencial para troubleshooting, cloud, segurança, DevSecOps, certificados, e-mail e prevenção de incidentes como takeover de subdomínio, registros órfãos e alterações indevidas de NS.</p>\n</section>\n",
    "nextTheme": "\n<section class='lesson-section lesson-section--next'>\n  <h2>Próximo tema</h2>\n  <p>Na próxima aula, você estudará resolução recursiva, autoritativa e cache. Depois de entender quem tem autoridade, vamos entender como o resolvedor percorre essa hierarquia e como cache pode acelerar ou confundir diagnósticos.</p>\n</section>\n"
  },
  "networkContext": {
    "layerFocus": [
      "Camada 7",
      "Serviços de rede",
      "Governança de infraestrutura"
    ],
    "beforeThisLesson": "O aluno já entende por que DNS existe e como uma consulta básica transforma nome em dado de rede.",
    "afterThisLesson": "O aluno entende a estrutura hierárquica do DNS, zonas, delegação e autoridade.",
    "dependsOn": [
      "DNS básico",
      "IPv4",
      "Roteamento",
      "Cloud networking"
    ]
  },
  "protocolFields": [
    {
      "field": "FQDN",
      "meaning": "Nome completo no namespace DNS, como app.financeiro.empresa.com.",
      "securityNote": "FQDNs podem revelar estrutura interna, ambientes e funções sensíveis."
    },
    {
      "field": "Zone",
      "meaning": "Porção administrável do namespace DNS.",
      "securityNote": "Zonas sem dono claro tendem a acumular registros antigos e riscos."
    },
    {
      "field": "NS",
      "meaning": "Registro que indica quais servidores são autoritativos por uma zona.",
      "securityNote": "Alteração indevida de NS pode desviar toda a autoridade da zona."
    },
    {
      "field": "SOA",
      "meaning": "Registro de autoridade da zona, com servidor primário, contato, serial e parâmetros de cache.",
      "securityNote": "Serial e parâmetros ajudam auditoria e troubleshooting de replicação/alteração."
    },
    {
      "field": "Glue record",
      "meaning": "Registro auxiliar necessário quando o servidor NS está dentro da própria zona delegada.",
      "securityNote": "Glue incorreto pode impedir resolução ou apontar para infraestrutura errada."
    },
    {
      "field": "TTL",
      "meaning": "Tempo de cache da resposta ou referência.",
      "securityNote": "TTL alto prolonga exposição a erro; TTL baixo aumenta consultas e carga operacional."
    }
  ],
  "packetFlow": [
    "Cliente solicita um FQDN ao resolvedor recursivo.",
    "Resolvedor verifica cache local de resposta ou delegação.",
    "Se necessário, consulta servidores raiz para localizar o TLD.",
    "Consulta servidores do TLD para localizar os NS do domínio.",
    "Consulta servidores autoritativos do domínio pai.",
    "Se houver delegação, segue para a zona filha indicada por NS.",
    "Obtém a resposta final ou erro autoritativo e aplica TTL ao cache.",
    "Cliente usa a resposta para iniciar conexão de rede ou reportar falha de resolução."
  ],
  "deepDive": {
    "title": "Domínio não é sempre igual a zona",
    "points": [
      "Um domínio é um nome dentro da árvore DNS; uma zona é uma unidade administrativa servida por servidores autoritativos.",
      "Um subdomínio pode estar dentro da mesma zona do pai ou ser uma zona filha delegada.",
      "Delegação ocorre por registros NS na zona pai, não apenas por criar um nome com pontos.",
      "Glue records são necessários em situações em que o nome do servidor autoritativo depende da própria zona delegada.",
      "Em cloud, zonas privadas adicionam uma camada de escopo: a mesma hierarquia pode responder diferente dependendo da rede associada."
    ],
    "operationalImpact": [
      "Zonas e delegações precisam de donos claros, inventário, revisão e processo de mudança.",
      "Alterações de NS, SOA, glue e zonas privadas devem ser tratadas como mudanças críticas de infraestrutura.",
      "Troubleshooting de autoridade exige comparar resposta recursiva, autoritativa, trace e visão interna/externa."
    ],
    "financialImpact": [
      "Delegações quebradas causam indisponibilidade difícil de diagnosticar e podem gerar longos períodos de cache incorreto.",
      "DNS gerenciado, zonas públicas/privadas e consultas em cloud podem ter custo por zona, consulta e logging.",
      "Subdomínios órfãos e registros antigos aumentam custo de auditoria, correção e resposta a incidente."
    ],
    "securityImpact": [
      "Quem controla NS e delegação controla a autoridade da zona; por isso registrador e provedores DNS exigem proteção forte.",
      "Subdomain takeover, hijack de NS e vazamento de zona privada são riscos defensivos relevantes.",
      "Monitorar mudanças em NS, SOA, CNAME e TXT ajuda a detectar abuso, erro operacional e tomada de controle."
    ]
  },
  "commonMistakes": [
    "Achar que todo subdomínio é automaticamente uma zona delegada.",
    "Alterar registros no provedor errado por não saber quem é autoritativo.",
    "Confundir resposta em cache com resposta autoritativa atual.",
    "Trocar NS no registrador sem preparar a zona no novo provedor.",
    "Esquecer glue records quando o NS está dentro da zona delegada.",
    "Deixar subdomínios apontando para recursos externos removidos."
  ],
  "troubleshooting": {
    "method": "Mapear autoridade antes de alterar registros: raiz/TLD, NS, SOA, resposta autoritativa, cache e escopo público/privado.",
    "windows": [
      "Resolve-DnsName empresa.com -Type NS",
      "Resolve-DnsName empresa.com -Type SOA",
      "nslookup -type=ns empresa.com",
      "nslookup nome.empresa.com <servidor_dns>"
    ],
    "linux": [
      "dig empresa.com NS",
      "dig empresa.com SOA",
      "dig +trace app.financeiro.empresa.com",
      "dig @ns1.exemplo.net app.financeiro.empresa.com A",
      "dig +norecurse empresa.com NS"
    ],
    "cisco": [
      "show hosts",
      "show running-config | include name-server",
      "ping nome.empresa.com",
      "traceroute nome.empresa.com"
    ],
    "cloud": [
      "Conferir se a zona é pública ou privada",
      "Validar associação da zona privada à VPC/VNet",
      "Conferir NS atribuídos pela zona hospedada",
      "Comparar resposta de dentro e de fora da rede",
      "Auditar registros órfãos e delegações sem dono"
    ],
    "symptoms": [
      "Comportamento inesperado relacionado a Hierarquia DNS, zonas e delegação.",
      "Funciona para uma origem, mas falha para outra.",
      "Mudança recente coincide com falha, latência, bloqueio ou alerta."
    ],
    "diagnosticQuestions": [
      "Qual é o sintoma exato, o horário de início e o impacto?",
      "Qual é o fluxo esperado entre origem, destino, DNS, rota, política e serviço?",
      "Quais evidências confirmam ou negam a hipótese principal?"
    ],
    "commands": [
      {
        "platform": "Windows",
        "command": "Resolve-DnsName empresa.com -Type NS; Resolve-DnsName empresa.com -Type SOA",
        "purpose": "Identificar servidores autoritativos e registro SOA.",
        "expectedObservation": "NS e SOA retornam nomes e metadados de autoridade.",
        "interpretation": "NS errado ou SOA inesperado indica zona/delegação incorreta."
      },
      {
        "platform": "Windows",
        "command": "nslookup -type=ns empresa.com; nslookup -type=soa empresa.com",
        "purpose": "Usar ferramenta clássica em ambientes restritos.",
        "expectedObservation": "Respostas de NS/SOA com servidor consultado.",
        "interpretation": "Útil quando PowerShell moderno não está disponível."
      },
      {
        "platform": "Linux",
        "command": "dig empresa.com NS +short; dig empresa.com SOA +multiline",
        "purpose": "Consultar autoridade e SOA com saída legível.",
        "expectedObservation": "Lista de NS e campos SOA como serial e timers.",
        "interpretation": "Serial e timers ajudam a entender replicação e mudança de zona."
      },
      {
        "platform": "Linux",
        "command": "dig +trace app.dev.empresa.com",
        "purpose": "Percorrer raiz, TLD e autoridades até o nome final.",
        "expectedObservation": "Cadeia de delegação visível por etapas.",
        "interpretation": "Falha em um nível aponta onde a autoridade quebrou."
      },
      {
        "platform": "Linux",
        "command": "dig @<ns-autoritativo> app.dev.empresa.com A +norecurse; dig @1.1.1.1 app.dev.empresa.com A",
        "purpose": "Comparar resposta autoritativa e recursiva/cache.",
        "expectedObservation": "Autoritativo mostra estado oficial; recursivo pode mostrar cache.",
        "interpretation": "Diferença sugere cache, propagação, split DNS ou consulta ao NS errado."
      },
      {
        "platform": "Governança/Cloud",
        "command": "Inventariar zonas públicas/privadas, NS, CNAME e recursos-alvo",
        "purpose": "Detectar delegações órfãs e risco de takeover.",
        "expectedObservation": "Tabela com dono, ambiente, provedor, recurso e validade.",
        "interpretation": "Sem dono e sem recurso válido exige remoção, correção ou mitigação imediata."
      }
    ],
    "decisionTree": [
      {
        "if": "dig +trace para em um nível da hierarquia",
        "then": "Investigar delegação, NS indisponível, glue ausente ou bloqueio até autoritativo."
      },
      {
        "if": "Autoritativo responde diferente do recursivo",
        "then": "Considerar cache, TTL, propagação, split DNS ou resolvedor consultando outra zona."
      },
      {
        "if": "Subdomínio tem NS próprio sem dono conhecido",
        "then": "Tratar como risco de governança e possível takeover; validar provedor e recurso-alvo."
      },
      {
        "if": "Mudança de DNS demora além do esperado",
        "then": "Verificar TTL anterior, cache de resolvedores e serial/SOA."
      }
    ]
  },
  "security": {
    "goodPractices": [
      "Proteger registrador e provedor DNS com MFA forte e RBAC mínimo.",
      "Documentar dono, finalidade e provedor de cada zona.",
      "Auditar alterações de NS, SOA, CNAME e TXT.",
      "Separar zonas públicas e privadas com nomenclatura e governança claras.",
      "Monitorar subdomínios órfãos e delegações sem responsável.",
      "Usar IaC e revisão por pull request para mudanças críticas quando possível."
    ],
    "badPractices": [
      "Delegar subdomínio sem registrar dono e processo de mudança.",
      "Usar a mesma credencial administrativa para todas as zonas.",
      "Publicar nomes internos em zona pública sem necessidade.",
      "Apagar zona antiga antes de validar NS e registros no novo provedor.",
      "Manter CNAME para recurso externo removido.",
      "Permitir que pipelines alterem NS/TXT críticos sem revisão."
    ],
    "attacksAndDefenses": [
      {
        "risk": "Subdomain takeover",
        "defense": "Auditar CNAMEs e delegações para recursos externos; remover registros órfãos; validar posse de recursos antes de publicar."
      },
      {
        "risk": "Hijack de NS",
        "defense": "MFA, lock de domínio, RBAC, alertas de alteração e revisão de provedor autoritativo."
      },
      {
        "risk": "Exposição de zona interna",
        "defense": "Separar DNS público/privado, revisar registros e evitar vazamento de nomes sensíveis."
      },
      {
        "risk": "Delegação quebrada",
        "defense": "Testar NS autoritativo, SOA, glue e resolução antes de cutover."
      },
      {
        "risk": "Shadow IT em subdomínios",
        "defense": "Inventário, dono por zona, política de criação e revisão periódica."
      }
    ],
    "commonErrors": [
      "Confundir sintoma com causa raiz.",
      "Alterar várias variáveis ao mesmo tempo.",
      "Não relacionar redes corporativas com segurança e operação."
    ],
    "vulnerabilities": [
      {
        "name": "Falha de configuração em Hierarquia DNS, zonas e delegação",
        "description": "Configuração incorreta ou permissiva pode causar exposição, indisponibilidade ou movimento lateral no contexto de redes corporativas.",
        "defensiveExplanation": "O risco cresce quando rota, identidade, DNS, política e logs são tratados separadamente.",
        "mitigation": "Validar desenho, aplicar menor privilégio, registrar mudanças, monitorar eventos e revisar periodicamente."
      }
    ],
    "monitoring": [
      "Logs de firewall, DNS, DHCP, proxy, VPN, autenticação, flow logs e eventos de mudança quando aplicável."
    ],
    "hardening": [
      "Remover exceções permanentes sem justificativa."
    ],
    "detectionIdeas": [
      "Comparar comportamento atual com baseline conhecido."
    ]
  },
  "mentorQuestions": [
    "Se um subdomínio tem pontos no nome, isso prova que ele é uma zona delegada? Por quê?",
    "Qual evidência você buscaria antes de alterar um registro DNS em produção?",
    "Como uma delegação DNS incorreta poderia causar indisponibilidade mesmo com servidores e rede funcionando?"
  ],
  "quiz": [
    {
      "question": "Qual registro normalmente indica quais servidores são autoritativos por uma zona?",
      "options": [
        "A",
        "NS",
        "MX",
        "PTR"
      ],
      "answer": "NS",
      "explanation": "Registros NS indicam os servidores autoritativos de uma zona."
    },
    {
      "question": "O que é uma zona DNS?",
      "options": [
        "Um cabo virtual",
        "Uma unidade administrativa do namespace DNS",
        "Uma porta TCP",
        "Um algoritmo de roteamento"
      ],
      "answer": "Uma unidade administrativa do namespace DNS",
      "explanation": "Zona é a porção do namespace servida e administrada por servidores autoritativos."
    },
    {
      "question": "Uma delegação de subdomínio é feita principalmente por qual mecanismo?",
      "options": [
        "Criando rota default",
        "Adicionando registros NS na zona pai",
        "Alterando MTU",
        "Limpando cache ARP"
      ],
      "answer": "Adicionando registros NS na zona pai",
      "explanation": "A zona pai delega autoridade da zona filha apontando seus NS."
    },
    {
      "question": "Por que glue records podem ser necessários?",
      "options": [
        "Para criptografar ICMP",
        "Para resolver NS cujo nome está dentro da própria zona delegada",
        "Para trocar MAC do switch",
        "Para calcular CIDR"
      ],
      "answer": "Para resolver NS cujo nome está dentro da própria zona delegada",
      "explanation": "Sem glue, poderia haver dependência circular para encontrar o IP do servidor autoritativo."
    },
    {
      "question": "Qual risco está associado a CNAMEs apontando para recursos externos removidos?",
      "options": [
        "Subdomain takeover",
        "Broadcast storm",
        "APIPA",
        "TTL zero obrigatório"
      ],
      "answer": "Subdomain takeover",
      "explanation": "Registros órfãos podem permitir que terceiros reivindiquem o recurso externo e respondam pelo subdomínio."
    },
    {
      "question": "Qual comando Linux ajuda a visualizar a cadeia de resolução desde a raiz?",
      "options": [
        "ip neigh",
        "dig +trace nome",
        "arp -a",
        "route print"
      ],
      "answer": "dig +trace nome",
      "explanation": "dig +trace mostra a cadeia hierárquica de referências DNS."
    }
  ],
  "flashcards": [
    {
      "front": "O que é uma zona DNS?",
      "back": "Uma porção administrável do namespace DNS servida por servidores autoritativos."
    },
    {
      "front": "O que faz um registro NS?",
      "back": "Indica quais servidores são autoritativos por uma zona."
    },
    {
      "front": "O que é SOA?",
      "back": "Start of Authority: registro com autoridade primária, serial e parâmetros da zona."
    },
    {
      "front": "Todo subdomínio é uma zona delegada?",
      "back": "Não. Pode ser apenas um nome dentro da zona pai ou uma zona filha delegada."
    },
    {
      "front": "O que é glue record?",
      "back": "Registro auxiliar com IP de servidor NS quando o nome do NS depende da própria zona delegada."
    },
    {
      "front": "Qual risco de DNS órfão?",
      "back": "Pode causar indisponibilidade, exposição ou subdomain takeover."
    }
  ],
  "exercises": [
    {
      "title": "Decompor FQDN",
      "prompt": "Decomponha app.dev.empresa.com em níveis hierárquicos e indique a ordem lógica de autoridade.",
      "expectedAnswer": "Raiz, .com, empresa.com, dev.empresa.com e app.dev.empresa.com."
    },
    {
      "title": "Identificar delegação",
      "prompt": "Explique como você verificaria se dev.empresa.com é uma zona delegada.",
      "expectedAnswer": "Consultaria registros NS para dev.empresa.com e compararia resposta autoritativa/norecurse."
    },
    {
      "title": "Analisar risco",
      "prompt": "Por que alterar NS no registrador é uma mudança sensível?",
      "expectedAnswer": "Porque muda quem tem autoridade por toda a zona, podendo causar indisponibilidade ou desvio de respostas."
    },
    {
      "title": "Planejar governança",
      "prompt": "Monte três campos obrigatórios para uma matriz de zonas DNS corporativas.",
      "expectedAnswer": "Zona, dono, provedor/NS, tipo público/privado, criticidade, registros sensíveis e processo de mudança."
    }
  ],
  "challenge": {
    "title": "Investigar falha de delegação em ambiente híbrido",
    "scenario": "Após migração de DNS para novo provedor, www.empresa.com funciona, mas api.dev.empresa.com falha para usuários externos. Internamente funciona. O time de aplicação diz que não alterou servidores.",
    "tasks": [
      "Levantar hipóteses envolvendo zona pública/privada, NS, cache e delegação.",
      "Definir comandos para coletar evidências.",
      "Explicar como validar se dev.empresa.com é delegado.",
      "Propor correção segura com rollback."
    ],
    "rubric": [
      "Separa escopo interno e externo",
      "Verifica NS/SOA e autoritativo",
      "Considera TTL/cache",
      "Evita alterações sem evidência",
      "Propõe rollback documentado"
    ]
  },
  "commentedSolution": {
    "summary": "A primeira suspeita é diferença entre zona pública e privada ou delegação incompleta de dev.empresa.com no DNS público.",
    "steps": [
      "Comparar resolução de dentro e fora usando resolvedores diferentes.",
      "Consultar NS e SOA de empresa.com e dev.empresa.com.",
      "Usar dig +trace para observar onde a cadeia quebra.",
      "Consultar diretamente os servidores autoritativos esperados.",
      "Validar TTL antes de concluir que a correção falhou.",
      "Corrigir NS/glue/registros no provedor correto e manter evidência de rollback."
    ],
    "lessonLearned": "Em DNS, a pergunta central é: quem respondeu e com qual autoridade? Sem isso, troubleshooting vira tentativa e erro."
  },
  "glossary": [
    {
      "term": "FQDN",
      "definition": "Nome DNS completo, incluindo todos os níveis até a raiz implícita."
    },
    {
      "term": "Zona",
      "definition": "Unidade administrativa do namespace DNS."
    },
    {
      "term": "Delegação",
      "definition": "Processo pelo qual uma zona pai aponta uma zona filha para servidores autoritativos próprios."
    },
    {
      "term": "NS",
      "definition": "Registro que lista servidores autoritativos de uma zona."
    },
    {
      "term": "SOA",
      "definition": "Registro de início de autoridade da zona."
    },
    {
      "term": "Glue record",
      "definition": "Registro auxiliar que informa IP de um servidor NS quando necessário para evitar dependência circular."
    }
  ],
  "references": [
    {
      "title": "RFC 1034 — Domain Names: Concepts and Facilities",
      "type": "RFC"
    },
    {
      "title": "RFC 1035 — Domain Names: Implementation and Specification",
      "type": "RFC"
    },
    {
      "title": "Documentação operacional de DNS autoritativo e recursivo",
      "type": "referência técnica"
    }
  ],
  "linksToOtherCourses": [
    {
      "course": "Infraestrutura Moderna, Platform Engineering e DevSecOps",
      "module": "Cloud Networking",
      "reason": "Zonas privadas, private endpoints e DNS gerenciado dependem de redes cloud."
    },
    {
      "course": "Enterprise Identity, IAM, Segurança e Acessos",
      "module": "Federação e certificados",
      "reason": "DNS público e TXT são usados em validações de domínio, e-mail e certificados."
    }
  ],
  "progressRules": {
    "minQuizScore": 70,
    "requiredLab": "lab-7.2",
    "unlockNextLesson": "7.3",
    "completeWhen": {
      "read": true,
      "quizScoreAtLeast": 70,
      "oneOf": [
        "exerciseDone",
        "practicalExerciseDone"
      ]
    },
    "accessPolicy": {
      "freeAccess": true,
      "navigationBlocked": false,
      "note": "Conclusão usa critérios reais, mas a navegação permanece livre para todas as aulas."
    },
    "unlocks": [
      "7.3"
    ]
  }
};
