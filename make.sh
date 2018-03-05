#!/bin/sh


while true; do
	[ "$(uname)" = "Linux"  ] && nowstat="$(md5sum memo.md | cut -d ' ' -f1)"
	[ "$(uname)" = "Darwin" ] && nowstat="$(md5 -q memo.md)"
	if [ "$nowstat" != "$oldstat" ]; then
		[ "$(uname)" = "Linux"  ] && /usr/bin/pandoc --standalone -f markdown -t html5 --template=template.html -o memo.html memo.md
		[ "$(uname)" = "Darwin" ] &&          pandoc --standalone -f markdown -t html5 --template=template.html -o memo.html memo.md
		git --no-pager diff memo.md
		# [ "$(uname)" = "Linux"  ] && chromium-browser memo.html &
		# [ "$(uname)" = "Darwin" ] && open memo.html
	fi
	oldstat="$nowstat"
	sleep 1
done

# pandoc -s -f markdown -t html5 --template=template.html -c memo.css -o memo.html memo.md
# pandoc -s -f markdown -t html5 --toc --template=template.html -o memo.html memo.md

# dot -Tsvg docker.dot -o docker.svg
# dot -Tpng docker.dot -o docker.png
