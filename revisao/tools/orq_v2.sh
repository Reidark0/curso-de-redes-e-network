#!/usr/bin/env bash
# Orquestrador v2: ./revisao/tools/orq_v2.sh iniciar <id> | fechar <id> | falhou <id> | prompt <id> [extra]
set -e
cd "$(dirname "$0")/../.."
BR=$(git rev-parse --abbrev-ref HEAD)
push() { for d in 2 4 8 16 0; do git push -q -u origin "$BR" && return 0; [ "$d" = 0 ] && { echo "PUSH FALHOU"; return 1; }; sleep $d; done; }
commit() { git add -A . && git commit -qm "$1

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01THuSDC4kaspat9e4YTVHqD" && push; }
mod_of() { printf 'm%02d' "${1%%.*}"; }
case "$1" in
  iniciar) node revisao/tools/progresso.js status "$2" "EM ANDAMENTO" ;;
  prompt)
    id="$2"; m=$(mod_of "$id"); extra="${3:-}"
    python3 - "$id" "$m" "$extra" <<'PY'
import sys
i,m,e=sys.argv[1:4]
s=open('revisao/tools/PROMPT_SUBAGENTE_V2.md').read().replace('{ID}',i).replace('{MOD}',m).replace('{EXTRA}',('\n'+e+'\n') if e else '')
open('/tmp/claude-0/prompt_atual.md','w').write(s)
PY
    echo "prompt em /tmp/claude-0/prompt_atual.md" ;;
  fechar)
    id="$2"
    if node revisao/tools/validar.js "$id" > /tmp/claude-0/val_$$.json; then v=OK; else v=ERRO; fi
    node -e "const r=require('/tmp/claude-0/val_$$.json'); console.log('validar', r.ok?'OK':'ERRO', 'erros:', r.erros.length, 'avisos:', r.avisos.length); r.erros.forEach(e=>console.log('  E', e)); r.avisos.forEach(a=>console.log('  A', a))"
    rm -f /tmp/claude-0/val_$$.json
    if [ "$v" = OK ]; then node revisao/tools/progresso.js concluir "$id"; commit "revisao v2: aula $id concluida"; echo pushed; else echo "NAO CONCLUIDA"; exit 1; fi ;;
  falhou)
    node revisao/tools/progresso.js falhou "$2"; commit "revisao v2: aula $2 FALHOU (build usa a versao anterior)"; echo pushed ;;
  *) echo "uso: orq_v2.sh iniciar|prompt|fechar|falhou <id>"; exit 2 ;;
esac
