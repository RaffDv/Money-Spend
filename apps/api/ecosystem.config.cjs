module.exports = {
	apps: [
		{
			name: "bankblend API",
			script: "pnpm",
      args:"start:prod",
			cwd: "/home/ubuntu/Money-Spend/apps/api",
			instances: "max",
			exec_mode: "cluster",
			env: {
				NODE_ENV: "development",
				PORT: 4000,
			},
			env_production: {
				NODE_ENV: "production",
				PORT: 4000,
			},
			// Configurações de log
			log_file: "./logs/combined.log",
			out_file: "./logs/out.log",
			error_file: "./logs/error.log",
			log_date_format: "YYYY-MM-DD HH:mm:ss Z",
			// Configurações de restart
			watch: true, // não recomendado para produção
			ignore_watch: ["node_modules", "logs"],
			max_restarts: 10,
			min_uptime: "10s",
			// Configurações de memória
			max_memory_restart: "1G",
			// Auto restart em caso de crash
			autorestart: true,
			// Configurações avançadas
			kill_timeout: 1600,
			listen_timeout: 8000,
			wait_ready: true,
		},
	],
};
