Você vai revisar UMA aula do curso na revisão v2: `{ID}` (módulo `{MOD}`). O curso fica em `/home/user/curso-de-redes-e-network`; rode todos os comandos a partir dessa pasta.

1. Leia por inteiro `revisao/CRITERIOS_V2.md`: as seções 3–8 (o padrão), o Apêndice A (a aula de referência 0.1, que calibra todas as outras) e as seções 9–10 (ferramentas, o que o app renderiza e o modelo da análise).
2. Rode `node revisao/tools/extrair.js {ID}` e as métricas da original e, se a base for a v1, também da v1. Rode `contexto.js {ID}`.
3. Leia a aula 0.1 já revisada (`aulas novas/m00/lesson-00-01.js`, análise em `revisao/analises_v2/m00/aula-0.1.md`): é o exemplo concreto de tamanho, tom e estrutura da v2. Depois leia a aula base inteira em `revisao/trabalho_v2/{ID}/base/` (todos os `.html` e o `meta.json`). Consulte `original/` só para recuperar algo que a v1 tenha perdido. Não leia o conteúdo de outras aulas: para saber qual aula ensina uma prévia cortada ou para preencher `relatedLessons`, use `indice.js` (títulos e objetivos).
4. Aplique o padrão da seção 3 em `revisao/trabalho_v2/{ID}/nova/` (sequência de ferramentas na seção 9.1). Corte primeiro o que o padrão manda sair; depois deixe a explicação mais direta. Nunca corte o mecanismo do próprio tema.
5. Feche com `montar` → `metricas nova` → `ajustar duracao` → `montar` → `metricas nova` → `validar`, e use `comparar.js {ID} --sumiram` para fechar o inventário dos conceitos removidos. No máximo 2 rodadas de correção depois do primeiro `validar` com erro; se ainda houver ERRO, marque `"status": "FALHOU"` na análise.
6. Escreva a análise em `revisao/analises_v2/{MOD}/aula-{ID}.md` no modelo da seção 10, terminando com o bloco JSON válido.
7. Antes de terminar, leia a aula montada do começo ao fim como um aluno daquele ponto do curso: ela ensina o tema sem precisar de nada que foi cortado? Cada questão do quiz é respondível por ela?

Regras: não altere nada fora de `revisao/trabalho_v2/{ID}/`, `revisao/analises_v2/` e (pelo `montar`) `aulas novas/`. Não faça commit, não edite `PROGRESSO.md` nem `DECISOES.md` e não crie subagentes. Não despeje arquivos inteiros no terminal: leia os `.html` e o `meta.json` com a ferramenta de leitura de arquivos e edite o `meta.json` com edições pontuais ou um script curto. Não faça perguntas: na dúvida, siga a aula de referência 0.1 e registre em "Revisão humana".
{EXTRA}
Se a base for o original, aplique também a seção 9.6. Se alguma ferramenta tiver um bug, contorne sem editá-la e descreva o bug na resposta final.
Ao terminar, responda em no máximo 8 linhas: status (OK/FALHOU), palavras visíveis original→v1→v2, núcleo e prática extra (min) original→v2, a `duration` nova, o que saiu de maior, o número de avisos do `validar` e os itens para revisão humana.
