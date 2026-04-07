# 📖 PDF Flipbook - Complete Setup & Deployment Guide

## Overview

This is a fully static website hosted on GitHub Pages featuring:
- **Public Flipbook Viewer**: Display PDFs as interactive page-flip books
- **Admin Panel**: Upload/delete PDFs via GitHub API
- **Zero Dependencies**: Pure HTML, CSS, and JavaScript
- **Fully Hosted on GitHub**: No external servers or backends needed

---

## 🎯 Step 1: Initial Setup (5 minutes)

### A. Configure Your Repository

1. **Update the config file** [js/config.js](js/config.js):

```javascript
const CONFIG = {
    GITHUB_OWNER: 'your-github-username',  // Change this ✏️
    GITHUB_REPO: 'myTestRepo',              // Change this ✏️
    PDF_FOLDER: 'pdfs',
    // ... rest stays the same
};
```

Or run the quick setup script:
```bash
bash quick-start.sh
```

2. **Create the pdfs folder** (if not exists):
```bash
mkdir -p pdfs
echo "# PDFs folder" > pdfs/README.md
git add pdfs/
git commit -m "Create PDFs folder"
git push origin main
```

### B. Enable GitHub Pages

1. Go to: `https://github.com/YOUR-USERNAME/myTestRepo/settings/pages`
2. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main** / **/ (root)**
3. Click **Save**
4. Wait 1-2 minutes for GitHub to deploy

**Your site will be live at:**
```
https://YOUR-USERNAME.github.io/myTestRepo/
```

---

## 🔐 Step 2: Create GitHub Personal Access Token (3 minutes)

Needed for the admin panel to upload PDFs.

### A. Generate a Token

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token (classic)"**
3. Fill in details:
   - **Token name**: `PDF Flipbook`
   - **Expiration**: 90 days (recommended) or No expiration
   - **Scopes**: Check only `repo`

4. Click **"Generate token"**
5. **Copy the token** (you'll only see it once!)

### B. Keep Your Token Safe

```
⚠️  DO NOT commit your token to Git
⚠️  DO NOT share it publicly
⚠️  Only store in browser's localStorage (secure for this use case)
💡  You can regenerate it anytime from Settings
```

---

## 🌐 Step 3: Using the Website (2 minutes)

### Public Viewer

1. Visit: `https://YOUR-USERNAME.github.io/myTestRepo/`
2. **Select a PDF** from the dropdown (if you've uploaded any)
3. **Navigate**:
   - **Mouse**: Click and drag to flip pages
   - **Buttons**: Use Previous/Next buttons
   - **Keyboard**: Press ← or → arrow keys
4. **Responsive**: Automatically adjusts for mobile/tablet

### Admin Panel

1. Visit: `https://YOUR-USERNAME.github.io/myTestRepo/admin.html`
2. **Enter credentials**:
   - Paste your personal access token
   - Your GitHub username
   - Repository name (e.g., `myTestRepo`)
3. **Upload PDF**:
   - Click "Select PDF File"
   - Pick a PDF from your computer
   - Click "Upload PDF"
   - Wait for confirmation (commits to GitHub)
4. **View uploaded PDFs**: Listed below with delete options

---

## 🎨 Step 4: Customization (Optional)

### Change Flipbook Appearance

Edit [js/config.js](js/config.js):

```javascript
FLIPBOOK: {
    width: 700,              // Make pages wider
    height: 900,             // Make pages taller
    size: 'fixed',           // Use 'fixed' for consistent size
    minWidth: 300,
    maxWidth: 1200,
    minHeight: 400,
    maxHeight: 1600,
    drawShadow: true,        // false to remove shadow effect
    showCover: true          // false to skip cover
}
```

**After editing**, commit and push:
```bash
git add js/config.js
git commit -m "Customize flipbook settings"
git push origin main
```

### Customize Styling

Edit [css/style.css](css/style.css) to change:
- Colors (currently purple/blue gradient)
- Fonts and text sizes
- Button styles
- Layout and spacing

---

## 🚀 Step 5: Adding Test PDFs (Optional)

### Quick Test

1. Create a simple test PDF or download one:
   ```bash
   # Option 1: Download a sample
   curl -o test.pdf https://example.com/sample.pdf
   ```

2. Go to admin panel (Step 3)
3. Upload the test PDF
4. Watch it appear in the public flipbook viewer!

---

## ⚙️ Advanced Configuration

### Limit to Specific Users

Add username check in [admin.html](admin.html) before uploads:

```javascript
const ALLOWED_USERS = ['your-username', 'collaborator-1'];
if (!ALLOWED_USERS.includes(repoOwner)) {
    showMessage('You are not authorized to upload', 'error');
    return;
}
```

### Custom GitHub Repository URL

If using a different repo for PDFs:

```javascript
// In js/config.js
const CONFIG = {
    PDF_REPO_OWNER: 'different-user',    // Different repo for PDFs
    PDF_REPO_NAME: 'pdf-storage',
    // ...
};
```

Then update [js/flipbook.js](js/flipbook.js) line ~20:
```javascript
const response = await fetch(
    `https://api.github.com/repos/${CONFIG.PDF_REPO_OWNER}/${CONFIG.PDF_REPO_NAME}/contents/${CONFIG.PDF_FOLDER}`
);
```

---

## 🐛 Troubleshooting

### PDFs not loading?

1. **Check the folder exists**:
   ```bash
   git ls-tree -r main pdfs/
   ```

2. **Verify config values**:
   - Open browser console (F12 → Console)
   - Check if `CONFIG` values are correct

3. **Try direct GitHub API**:
   ```
   https://api.github.com/repos/YOUR-USER/myTestRepo/contents/pdfs
   ```

### Admin upload fails?

1. **Token is invalid/expired**: Generate a new one
2. **Wrong credentials**: Double-check username and repo name
3. **No push access**: Ensure you own the repo or have contributor access
4. **Rate limited**: Wait a bit and try again (GitHub limit: 5000 requests/hr)

### Flipbook won't display pages?

1. Check if PDF is valid (try opening in browser directly)
2. Ensure PDF size is reasonable (< 50 MB is ideal)
3. Check browser console for errors
4. Try a different PDF

### Changes not appearing?

1. GitHub Pages may cache - **Hard refresh** (Ctrl+Shift+R or Cmd+Shift+R)
2. Changes take 1-2 minutes to deploy
3. Check [Actions tab](https://github.com) for deployment status

---

## 📊 Project Structure

```
myTestRepo/
├── index.html          # Public flipbook viewer
├── admin.html          # Admin upload panel
├── css/
│   └── style.css      # Styling (purple/blue theme)
├── js/
│   ├── config.js      # ⭐ Edit this to customize
│   ├── flipbook.js    # Flipbook logic
│   └── admin.js       # Admin upload logic
├── pdfs/              # Your PDF files (auto-created)
└── README.md          # Main documentation
```

---

## 🔒 Security Notes

✅ **What's secure**:
- JavaScript runs in browser (your files never touch external servers)
- Token stored in browser localStorage (not sent anywhere except GitHub API)
- GitHub API is encrypted (HTTPS)
- Read-only for public repo PDFs

⚠️ **Recommendations**:
- Use **short-lived tokens** (90 days)
- **Rotate tokens** regularly
- Don't share your token with others
- Consider using GitHub **Collaborators** instead of sharing tokens
- Limit token scopes (only use `repo`)

---

## 📱 Mobile & Responsive

- ✅ Works on iPhone/iPad (iOS Safari 12+)
- ✅ Works on Android Chrome
- ✅ Automatic layout adjustment
- ✅ Touch-friendly buttons
- ✅ Keyboard navigation

---

## 🚀 Performance Tips

1. **Optimize PDFs before upload**:
   - Use compression tools to reduce file size
   - Remove unnecessary metadata
   - Recommended: 2-20 MB per PDF

2. **Disable features if needed** (in [js/config.js](js/config.js)):
   - Set `drawShadow: false` for faster rendering
   - Reduce `maxWidth` and `maxHeight` for large books

3. **Cache busting**:
   - Hard refresh browser (Ctrl+Shift+R)
   - Clear localStorage if needed

---

## 📜 License

MIT License - Use freely in personal and commercial projects!

---

## 🆘 Need Help?

1. Check [README.md](README.md) for documentation
2. Review [Troubleshooting](#troubleshooting) section
3. Check browser console (F12) for error messages
4. Create a GitHub issue with details

---

**🎉 You're all set! Start uploading PDFs and enjoy your flipbook!**
