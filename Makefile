zip:
	zip -r 01_xlogin00_source.zip src public package.json vite.config.js index.html readme.txt 02_login_final.pdf 03_login_video.mp4 -x  "**/node_modules/*" "**/dist/*" "**/.vite/*"