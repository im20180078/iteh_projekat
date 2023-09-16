run:
	#php artisan migrate
	npm install
	#npm run dev
	#php artisan serve
	tmux split-window -h "npm run dev"
	tmux split-window -h "php artisan serve"
	tmux select-pane -t 0

stop:
	tmux kill-pane -a -t 0
