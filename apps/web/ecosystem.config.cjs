module.exports = {
  apps: [
    {
      name: 'bankblend web',
      script: 'pnpm',
      args: 'start', // ← Apenas 'start'
      cwd: '/home/ubuntu/Money-Spend/apps/web',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
NEXT_PUBLIC_BACKEND_URL:'https://api.bankblend.com.br',
BACKEND_URL:'https://api.bankblend.com.br',

SESSION_SECRET_KEY:'Cq6RldNEU2COfH0eM+pKymg9b65FjKEq0u1OsiwfXC5EFy26f5SXww==',
NEXTAUTH_SECRET:'1Rbv/UKxpdttjLEyjXmksjWgnlr9iEowmDNSVcvSGtKn8kLPt3EL1w==',
NEXTAUTH_URL:'https://bankblend.com.br',

GOOGLE_CLIENT_ID:'44398056005-oleltkirufldrifaqen4o9soj41vnqfu.apps.googleusercontent.com',
GOOGLE_CLIENT_SECRET:'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',

      }
    }
  ]
}
