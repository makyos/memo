#!/bin/sh

while true; do
    nowstat="$(md5 -q memo.md)"
    # echo $nowstat
    if [ "$nowstat" != "$oldstat" ]; then
	    pandoc -s -f markdown -t html5 --template=html5.template -o memo.html memo.md
        open memo.html
    fi
    oldstat="$nowstat"
    sleep 1
done

# pandoc -s -f markdown -t html5 --template=html5.template -c memo.css -o memo.html memo.md
# pandoc -s -f markdown -t html5 --toc --template=html5.template -o memo.html memo.md

# dot -Tsvg docker.dot -o docker.svg
# dot -Tpng docker.dot -o docker.png
