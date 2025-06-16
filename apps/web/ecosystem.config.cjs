module.exports = {
  apps: [
    {
      name: 'bankblend web',
      script: 'pnpm',
      args: 'start -H 0.0.0.0 -p 3000',
      cwd: '/home/ubuntu/Money-Spend/apps/web',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
}
