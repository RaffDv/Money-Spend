module.exports = {
	apps: [
		{
			name: "money-spend-web", // É uma boa prática nomear sua aplicação
			script: "pnpm start",
			cwd: "/home/ubuntu/current/apps/web", // Define o diretório de trabalho da app
		},
	],

	deploy: {
		production: {
			key: "github_servers",
			user: "ubuntu",
			host: "159.112.189.45",
			ref: "origin/prod",
			repo: "git@github.com:RaffDv/Money-Spend.git",
			path: "/home/ubuntu/", // O caminho base do deploy
			"pre-deploy-local": "",
			// --- SCRIPT CORRIGIDO ---
			"post-deploy":
				"source ~/.nvm/nvm.sh && " + // Carrega o NVM
				"cd /home/ubuntu/current && " + // Navega para a pasta do código atual
				"pnpm install && " + // Instala dependências na raiz (importante para monorepos)
				"pnpm --filter web build && " + // Comando para buildar apenas o app 'web'
				"pm2 reload ecosystem.config.cjs --only money-spend-web", // Recarrega apenas a aplicação específica
			"pre-setup": "",
			ssh_options: "ForwardAgent=yes",
		},
	},
};
