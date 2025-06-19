module.exports = {
	apps: [
		{
			script: "pnpm start",
		},
	],

	deploy: {
		production: {
			key: "github_servers",
			user: "ubuntu",
			host: "159.112.189.45",
			ref: "origin/prod",
			repo: "git@github.com:RaffDv/Money-Spend.git",
			path: "/home/ubuntu/",
			"pre-deploy-local": "",
			"post-deploy":
				"source ~/.nvm/nvm.sh && cd /home/ubuntu/Money-Spend/apps/web && pnpm install && pnpm build && pm2 reload ecosystem.config.js ",
			"pre-setup": "",
			ssh_options: "ForwardAgent=yes",
		},
	},
};
