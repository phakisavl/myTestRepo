#!/bin/bash
# Quick Start Guide - Run this to set up your project quickly

echo "🚀 PDF Flipbook Quick Start Setup"
echo "=================================="
echo ""

# Read user input
read -p "Enter your GitHub username: " GITHUB_USER
read -p "Enter your repository name (default: myTestRepo): " REPO_NAME
REPO_NAME=${REPO_NAME:-myTestRepo}

echo ""
echo "📝 Updating configuration..."

# Update the config.js file
sed -i "s/GITHUB_OWNER: '[^']*'/GITHUB_OWNER: '$GITHUB_USER'/" js/config.js
sed -i "s/GITHUB_REPO: '[^']*'/GITHUB_REPO: '$REPO_NAME'/" js/config.js

echo "✅ Configuration updated!"
echo ""
echo "📋 Next steps:"
echo "1. Create the pdfs folder in your repo (if not done already)"
echo "   mkdir -p pdfs"
echo ""
echo "2. Commit and push your changes:"
echo "   git add ."
echo "   git commit -m 'Initial PDF flipbook setup'"
echo "   git push origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to: https://github.com/$GITHUB_USER/$REPO_NAME/settings/pages"
echo "   - Select 'Deploy from a branch'"
echo "   - Choose 'main' branch"
echo "   - Save"
echo ""
echo "4. Your site will be available at:"
echo "   https://$GITHUB_USER.github.io/$REPO_NAME/"
echo ""
echo "5. Admin panel at:"
echo "   https://$GITHUB_USER.github.io/$REPO_NAME/admin.html"
echo ""
echo "✨ You're all set! 🎉"
