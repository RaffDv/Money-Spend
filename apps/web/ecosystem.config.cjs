module.exports = {
  apps: [
    {
      name: 'next-js-app',
      cwd: '/home/ubuntu/Money-Spend/apps/web',
      script: '/home/ubuntu/Money-Spend/apps/web/node_modules/next/dist/bin/next start',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
       watch: true,
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs'], // Ignore changes in these directories
      watch_options: {
        followSymlinks: false,
      },
    },
  ]
}

