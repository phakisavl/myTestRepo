#!/bin/bash
# Deploy PDF Flipbook to GitHub
# Run this script from your myTestRepo directory

echo "🚀 Deploying PDF Flipbook..."
echo ""

# Show git status
echo "📋 Git Status:"
git status

echo ""
echo "📦 Staging all files..."
git add .

echo ""
echo "💾 Committing files..."
git commit -m "Initial PDF flipbook setup with StPageFlip + PDF.js

- Interactive flipbook viewer with StPageFlip library
- PDF rendering powered by PDF.js
- Admin panel for uploading PDFs via GitHub API
- Responsive design with gradient styling
- Full GitHub Pages hosting
- Zero external backend dependencies"

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🎉 Your site will be available at:"
echo "   https://phakisavl.github.io/myTestRepo/"
echo ""
echo "📋 Next steps:"
echo "1. Wait 1-2 minutes for GitHub Pages to build"
echo "2. Go to: https://github.com/phakisavl/myTestRepo/settings/pages"
echo "3. Select 'Deploy from a branch' → 'main' → '/' (root)"
echo "4. Visit your public flipbook at: https://phakisavl.github.io/myTestRepo/"
echo "5. Visit admin panel at: https://phakisavl.github.io/myTestRepo/admin.html"
