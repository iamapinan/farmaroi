#!/bin/bash

echo "🚀 Vercel Deployment Helper"
echo "================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm i -g vercel
fi

echo "🔐 Step 1: Login to Vercel"
vercel login

echo ""
echo "🔗 Step 2: Link Project"
vercel link

echo ""
echo "📝 Step 3: Set Environment Variables"
echo ""
echo "Please set the following environment variables in Vercel Dashboard:"
echo "1. DATABASE_URL - Your production MySQL database URL"
echo "2. NEXTAUTH_URL - Your Vercel deployment URL (e.g., https://your-app.vercel.app)"
echo "3. NEXTAUTH_SECRET - Generate with: openssl rand -base64 32"
echo ""
read -p "Press Enter when you've added all environment variables..."

echo ""
echo "🚀 Step 4: Deploy to Production"
vercel --prod

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Setup database schema: npx prisma db push"
echo "2. Seed data (optional): npm run db:seed"
echo "3. Create admin user via Prisma Studio or SQL"
echo ""
echo "Visit your site and test! 🎉"

