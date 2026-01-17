#!/bin/bash

echo "🚀 Deploying Backend to Vercel..."

cd backend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Note the deployment URL from above"
echo "2. Update frontend/.env.local with the new backend URL"
echo "3. Set environment variables in Vercel dashboard"
echo "4. Test the API health endpoint: [YOUR_URL]/api/health"