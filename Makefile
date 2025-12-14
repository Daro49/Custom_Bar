zip:
	zip -r 01_xlogin00_source.zip src public package.json vite.config.js index.html readme.txt -x  "**/node_modules/*" "**/dist/*" "**/.vite/*"