# Aula 14.1 — Por que Cloud Networking existe (v2)
Base: original (a v1 não chegou ao módulo 14) · Tipo: fundamental · Módulo: m14 (Cloud Networking) · Piloto (aula de abertura do módulo de cloud)

## 1. Checklist do padrão
| Item | Situação | Nota |
|---|---|---|
| Objetivos 2–3, do tema desta aula | cumpre | 3: por que surgiu / o que muda; relacionar os objetos básicos aos fundamentos e aos nomes em AWS/Azure/GCP; responsabilidade provedor × cliente e riscos. Saíram o "mapa conceitual" (atividade) e o "preparar para regiões, subnets…" (prévia → nextTheme) |
| learningOutcomes, history, evolution removidos | cumpre | learningOutcomes por `ajustar regras`; history virou 2 frases no Problema; evolution virou a tabela de 3 linhas do Conceito |
| Motivação 100–150 (gancho + consequência; carreira em 1 frase) | cumpre | 142 palavras; equipe publica em uma tarde e colhe banco exposto, fatura de NAT, homologação falando com produção e nenhum registro; carreira em 1 frase |
| Resumo 4–5 itens + frase final | cumpre | 5 itens; 87 palavras com a frase final |
| Glossário ≤5, só termos citados e não explicados, com relatedLessons | cumpre | 3: Load balancer (14.6), Security group e NSG (14.5), Internet gateway (14.4) |
| Problema 80–150, sem repetir o gancho | cumpre | 118 palavras; "é isso que acontece quando a velocidade da cloud chega antes dos fundamentos"; datacenter tradicional em 2 frases; o que a cloud resolveu e o problema novo |
| Conteúdo sem prévias; ideia central 1× texto + 1× diagrama | cumpre | ideia central (rede vira objetos lógicos por API) no Conceito e no diagrama; o Funcionamento interno mostra a sequência de objetos de uma rede mínima |
| Arquitetura só se acrescenta | removida | repetia o Funcionamento interno (zonas, componentes) e listava prévias (WAF, bastion, private endpoint, peering) |
| Diagrama mantido/corrigido | corrigido | seta Gateway/NAT → subnet pública tinha a classe `svg-flow--blocked` (fluxo bloqueado) sem sentido: virou fluxo de entrada; acrescentada a seta de saída Aplicação → NAT; a frase de rodapé começava em x=480 sem `text-anchor` e passava da largura do SVG: centralizada; legenda e `<desc>` reescritas para descrever o que o desenho mostra |
| Erros comuns ≤3, sem repetição | cumpre | 2 itens (IP público em todo recurso; ignorar custo de tráfego). "A cloud cuida da rede" saiu do callout porque virou o bloco "Quem cuida do quê" |
| Termos avançados cortados ou no glossário | cumpre | saíram multi-tenant, overlay, NACL, WAF, bastion, IPAM, guardrails, policy as code, service mesh, CNI, tracing, Pulumi/Bicep/CloudFormation/Crossplane/GitOps; plano de controle, egress, flow logs, banco gerenciado e infraestrutura como código ficaram explicados em 1 frase |
| Exemplo (1 bom) e analogia (opcional, 2–3 frases) | cumpre | cloudExample no lugar do simpleExample (3.4): loja na AWS com VPC 10.40.0.0/16, 3 subnets, portas 443/5432, NAT e flow logs, mais a tabela de nomes AWS/Azure/GCP. Analogia do condomínio em 3 frases, sem "limite da analogia" |
| Exemplos por ambiente (só se o tema é o ambiente) | cumpre | fica só o cloudExample (o tema é o ambiente); simpleExample (absorvido pelo cloudExample), enterpriseExample, devsecopsExample e securityExample removidos |
| Segurança / Troubleshooting (3.5) | security mantido (dieta); troubleshooting removido | security: a aula ensina um risco com ataque e defesa próprios (exposição criada em minutos, ambientes misturados, rede sem logs) → 3 vulnerabilidades, 3 boas práticas, 3 detecções. troubleshooting: os comandos exigem conta em AWS/Azure/GCP (a aula não provisiona nada) e o diagnóstico por rota/NAT/filtro é tema da 14.4, 14.5 e 14.12 |
| Quiz 5–6, respondível pela aula | cumpre | 6 questões; quiz respondível pela aula: sim |
| Flashcards 5–8, nada cortado | cumpre | 6; saiu fc14.1.6 (landing zone); entrou fc14.1.7 (provedor × cliente) |
| Lab (só se executa e vê resultado; 3–4 passos, ~300–400 palavras) | não havia | o bloco "Prática equivalente" (labIntro) foi removido |
| Prática extra (mentor 2–3, exercícios 2–4, desafio + solução; aplicar, não repetir) | cumpre | mentor 2, exercícios 2, desafio + solução (634 palavras no total; o `validar` não avisou) |
| nextTheme 1–2 frases | cumpre | 2 frases (14.2 e 14.3) |
| progressRules e duration | cumpre | `{read:true, quizScoreAtLeast:70}`; saiu o `oneOf` de exercício; accessPolicy e unlocks (14.2) preservados; "15-25 min + 30 min de prática extra", estimatedStudyTimeMinutes 25 |
| Campos invisíveis | cumpre | removidos `cloudProviderMapping`, `protocolFields`, `packetFlow`, `deepDive`, `realWorld`, `commonMistakes`, `pedagogicalMap` e os content `labIntro`, `exercisesIntro`, `challengeIntro`, `solutionIntro`; quiz normalizado por `quiz_normalizar` (6 conversões `a`→`answer`) |

Verificação do quiz contra a aula v2: q14.1.1 (definição) → definição do Conceito; q14.1.2 (VPC/VNet/VPC Network) → tabela do Exemplo em cloud; q14.1.3 (aplicação e banco privados, entrada pelo load balancer) → Funcionamento interno (Publicação) + Exemplo + Segurança; q14.1.4 (custo recorrente) → Erros comuns (NAT, load balancer, egress, logs cobrados por hora/GB); q14.1.7 (subnet privada sai pelo NAT) → Funcionamento interno, passo Rotas; q14.1.8 (quem responde pela regra SSH aberta) → "Quem cuida do quê". Gabaritos em 0, 2, 1, 3, 2, 1.

## 2. O que saiu e por quê
- Motivação: "multi-tenant, integrado a identidade, automação e observabilidade" (termos avançados); "chamada lenta ao cruzar regiões" (prévia 14.2); callout "Problema real" (repetia a ideia da própria Motivação).
- history e evolution (seções do template): viraram 2 frases no Problema e a tabela de 3 modelos do Conceito; a 4ª linha da evolução (private endpoints, service mesh, CNI, landing zones, policy as code) saiu (prévias).
- Problema: lista Escala/Isolamento/Exposição/Custo/Operação (repetia Motivação e Segurança e citava zonas, regiões, NACL, IAM); o callout "a cloud cuida da rede" virou o bloco "Quem cuida do quê" do Conceito.
- Conceito: lista de 15 serviços (VPN, circuitos dedicados, DNS privado, endpoints privados, NACL, firewalls gerenciados: prévias 14.4–14.10).
- Funcionamento interno: destinos de rota VPN/peering/transit (prévias 14.8, 14.9); passo "private endpoints e DNS privado" (prévia 14.10/14.7); métricas, auditoria e tracing (prévia 14.12); lista de ferramentas de IaC (Pulumi, Bicep, CloudFormation, Crossplane, GitOps).
- Arquitetura inteira (repetia o Funcionamento interno; camadas 3/4/7 e "dependências" eram lista de módulos anteriores).
- Analogia: "limite da analogia" (planos de controle, overlays: termos avançados).
- simpleExample: absorvido pelo cloudExample, que ganhou CIDRs e portas concretos; a frase "aparecem conceitos dos módulos anteriores" saiu (lista de termos).
- enterpriseExample (landing zone, hub-spoke: prévias 14.13/14.9), devsecopsExample (IaC em pipeline, Kubernetes: 14.13/14.11), securityExample (tabela de riscos: o conteúdo útil foi para `security`).
- troubleshooting inteiro (critério 3.5: comandos de CLI de provedor e diagnóstico que são das aulas 14.4, 14.5 e 14.12).
- security: listas `badPractices`, `commonErrors`, `monitoring`, `hardening` (dieta); goodPractices e detectionIdeas de 7 e 5 para 3 itens.
- Quiz: q14.1.5 (private endpoint + DNS privado, prévia 14.10/14.7) e q14.1.6 (landing zones, prévia 14.13).
- Flashcard fc14.1.6 (landing zone).
- Mentor: "não dá para aprender decorando nomes" (repetia o Conceito, a q14.1.1 e o fecho do Exemplo).
- Exercícios: ex14.1.1 (repetia a definição), ex14.1.2 (quatro zonas: está contido no desafio), ex14.1.4 (custos: era a q14.1.4).
- Desafio: tarefas de matriz de fluxos completa, integração com SIEM e FinOps, 7 entregáveis e a rubrica de 100 pontos (ritual de projeto; o projeto do módulo é a 14.14).
- Glossário: Cloud networking e VPC/VNet (a aula ensina), Egress e Flow logs (agora explicados no texto), Landing zone (não é mais citada).
- Campos invisíveis de topo e de content (seção 9.6).

## 3. Conceitos removidos (inventário)
| Conceito/fato removido | Motivo | Aula que ensina (se for prévia) |
|---|---|---|
| Regiões, zonas, latência entre regiões; subnet AWS por zona × regional no GCP | prévia | 14.2 |
| Desenho de CIDR e subnets por função/crescimento, IPAM | prévia (o desafio usa o raciocínio de não sobrepor CIDR, do módulo 5) | 14.3 |
| Tipos de rota (local, default, UDR), quando a subnet é pública pela rota | prévia (fica 1 frase: 0.0.0.0/0 → internet gateway ou NAT) | 14.4 |
| NACL, firewall policies, diferenças entre SG/NSG/NACL | prévia | 14.5 |
| WAF, health checks, publicação por proxy/API gateway | prévia | 14.6 |
| DNS privado, DNS público × privado do private endpoint | prévia | 14.7 |
| VPN, Direct Connect/ExpressRoute, circuitos dedicados, BGP | prévia | 14.8 |
| Peering, transit, hub-spoke | prévia | 14.9 |
| Private endpoints e serviços gerenciados por caminho privado | prévia | 14.10 |
| Kubernetes, CNI, Ingress, NetworkPolicy, service mesh | prévia | 14.11 |
| Flow log 5-tuple em detalhe, métricas, tracing, troubleshooting em cloud com CLI (aws/az/gcloud) | prévia / seção removida | 14.12 |
| Landing zone, contas por ambiente, policy as code, guardrails, tags obrigatórias, governança | prévia | 14.13 |
| Projeto completo com matriz de fluxos, plano de egress, SIEM, FinOps e rubrica | prévia (o desafio ficou reduzido) | 14.14 |
| Camadas 3/4/7 na arquitetura de cloud | repetição dos módulos 2–8 | — |
| "Rede ainda tem latência, perda e MTU" (deepDive) | campo invisível; a ideia geral fica em "a cloud não elimina IP, rota…" | — |
| Overlays, multi-tenant, plano de controle como overlay | termo avançado (plano de controle fica explicado em 1 frase) | — |
| Movimento lateral como tabela de riscos | reescrito como vulnerabilidade "ambientes misturados" | 9.4 (segmentação) |

## 4. Acréscimos
- Conceito: bloco "Quem cuida do quê" (provedor opera prédio, servidores, cabos e isolamento; o desenho é do cliente). Vem do callout "a cloud cuida da rede" e sustenta o objetivo 3 e a q14.1.8.
- Funcionamento interno: o papel concreto da rota `0.0.0.0/0` (internet gateway na subnet pública, NAT Gateway na privada) e de cada objeto em 1 linha, para que o aluno entenda o exemplo e a q14.1.7 sem a aula 14.4.
- Exemplo em cloud: CIDRs (10.40.0.0/16, /24 por função), portas 443 e 5432 e as regras de origem; tabela com a linha "Tabela de rotas" e nomes corrigidos (Azure "Virtual network flow logs"; GCP "regras de firewall da VPC").
- Quiz novo: q14.1.7 (NAT para a subnet privada) e q14.1.8 (responsabilidade pela regra SSH aberta).
- Flashcard fc14.1.7 (provedor × cliente); exercício ex14.1.5 (fatura de NAT investigada com flow logs).
- Diagrama: seta Aplicação → NAT (saída).

## 5. Métricas
| | original | v1 | v2 |
|---|---|---|---|
| Palavras visíveis | 4.271 | — | 3.054 |
| Teoria (palavras) | 2.860 | — | 1.489 |
| Núcleo (min, fórmula v2) | 31 | — | 20,5 |
| Prática extra (min) | 45 | — | 31 (→ 30) |
| duration declarada | 90-140 min | — | 15-25 min + 30 min de prática extra |

O total visível caiu menos (−29%) que a teoria (−48%) porque o quiz cresceu (309 → 438 palavras): as duas questões novas são de cenário e as do original tinham alternativas de uma ou duas palavras.

## 6. Avisos do validar e justificativas
- "quiz q14.1.2: id de uma questão anterior usado para outra pergunta?": é a mesma pergunta (equivalência VPC/VNet/VPC Network entre provedores), com a mesma resposta correta; só o enunciado foi corrigido ("Qual par" listava três nomes). O id foi mantido de propósito.
- "análise ainda não escrita": resolvido por este arquivo.

## 7. Revisão humana
- Diagrama: a seta Gateway/NAT → subnet pública deixou de ser "bloqueada" (virou entrada) e ganhou a seta Aplicação → NAT; confirme se essa leitura (entrada pelo gateway, saída pelo NAT) era a intenção original.
- Tabela de nomes: "Rotas da VPC Network" (GCP não tem objeto "route table") e "Virtual network flow logs" (Azure; os NSG flow logs do original estão sendo descontinuados) — conferir a nomenclatura atual dos provedores.
- security mantido na aula de abertura (decisão pelo critério 3.5); a 14.5 e a 14.12 também devem ter security/troubleshooting próprios, então vale checar repetição quando chegarem.
- A frase "em alguns casos [o tráfego] custa mais do que as máquinas" vem do `deepDive.financialImpact` do original; não há número na aula.
- `linksToOtherCourses` (8 itens, com dois para IaC no mesmo curso) e as 6 referências oficiais mantidos como no original; `tags` ainda inclui "devsecops", embora o exemplo de DevSecOps tenha saído.
- O `difficulty` "intermediário" e o `xp` 260 foram mantidos; com núcleo de 15-25 min, talvez o xp precise de revisão global.

```json
{
  "id": "14.1", "modulo": "m14", "titulo": "Por que Cloud Networking existe", "status": "CONCLUIDA", "base": "original",
  "secoes_removidas": ["learningOutcomes", "history", "evolution", "architecture", "simpleExample", "enterpriseExample", "devsecopsExample", "securityExample", "troubleshooting", "labIntro", "exercisesIntro", "challengeIntro", "solutionIntro", "cloudProviderMapping", "protocolFields", "packetFlow", "deepDive", "realWorld", "commonMistakes", "pedagogicalMap"],
  "conceitos_removidos": 17,
  "acrescimos": ["Conceito: bloco 'Quem cuida do quê'", "Funcionamento interno: papel da rota 0.0.0.0/0 (internet gateway / NAT)", "Exemplo em cloud: CIDRs, portas e linha 'Tabela de rotas'", "Quiz q14.1.7 e q14.1.8", "Flashcard fc14.1.7", "Exercício ex14.1.5", "Diagrama: seta Aplicação → NAT"],
  "palavras_visiveis": { "original": 4271, "v1": null, "v2": 3054 },
  "nucleo_min": { "original": 31, "v1": null, "v2": 20.5 }, "pratica_extra_min": { "original": 45, "v1": null, "v2": 30 },
  "duration_v2": "15-25 min + 30 min de prática extra", "quiz_questoes": 6, "quiz_respondivel": true, "lab": "não havia",
  "linguica_restante": "BAIXA", "conteudo_util": "FORTE", "aproveitamento": "BOM",
  "explicacao_mais_direta": "História e evolução viraram uma tabela de 3 modelos e o Funcionamento interno virou uma rede mínima em 6 objetos com o papel concreto de cada um, em vez de listas de 15 serviços futuros.",
  "revisao_humana": ["Setas do diagrama corrigidas (blocked → entrada; nova saída Aplicação → NAT)", "Nomenclatura GCP/Azure na tabela de nomes", "security mantido na aula de abertura; checar repetição com 14.5/14.12", "Frase de custo de tráfego > máquinas sem número", "linksToOtherCourses/tags mantidos do original", "difficulty/xp mantidos"]
}
```
