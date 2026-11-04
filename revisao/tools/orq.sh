#!/usr/bin/env bash
# Orquestrador: ./revisao/tools/orq.sh fechar <id> | proximo
set -e
cd "$(dirname "$0")/../.."
case "$1" in
  fechar)
    id="$2"
    if node revisao/tools/validar.js "$id" > /tmp/validar_$$.json; then v=OK; else v=ERRO; fi
    node -e "const r=require('/tmp/validar_$$.json'); console.log('validar', r.ok?'OK':'ERRO', 'erros:', r.erros.length, 'avisos:', r.avisos.length, r.erros.slice(0,3).join(' | '))"
    rm -f /tmp/validar_$$.json
    if [ "$v" = OK ]; then node revisao/tools/progresso.js concluir "$id"; else echo "NÃO CONCLUÍDA"; exit 1; fi
    git add -A . && git commit -qm "revisao: aula $id concluida

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01THuSD8spvgD14VzBCdqQTj" && (git push -q origin claude/focused-pascal-00emu4 || (sleep 2; git push -q origin claude/focused-pascal-00emu4) || (sleep 4; git push -q origin claude/focused-pascal-00emu4))
    echo pushed ;;
  proximo)
    id=$(grep -m1 -E '^\| [0-9]+\.[0-9]+ \| [^|]+ \| PENDENTE' revisao/PROGRESSO.md | awk -F'|' '{gsub(/ /,"",$2); gsub(/ /,"",$3); print $2" "$3}')
    set -- $id
    node revisao/tools/progresso.js status "$1" "EM ANDAMENTO" >/dev/null
    echo "PROXIMO $1 data/lessons/$2" ;;
esac
