✅ PDF FLIPBOOK - SETUP CHECKLIST

## Pre-Deployment Checklist

### Configuration
- [ ] Edit js/config.js with your GitHub username
- [ ] Edit js/config.js with your repository name
- [ ] Review and customize FLIPBOOK settings if desired
- [ ] Review css/style.css and customize colors/fonts if desired

### Repository Setup
- [ ] Create pdfs/ folder: `mkdir -p pdfs`
- [ ] Add to git: `git add pdfs/.gitkeep`
- [ ] Commit: `git commit -m "Add pdfs folder"`
- [ ] Push to main: `git push origin main`

### GitHub Pages Configuration
- [ ] Go to repository Settings → Pages
- [ ] Select "Deploy from a branch"
- [ ] Choose "main" branch and "/" (root)
- [ ] Click Save
- [ ] Wait 1-2 minutes for deployment
- [ ] Verify site is live at: https://YOUR-USERNAME.github.io/myTestRepo/

### GitHub Personal Access Token
- [ ] Go to GitHub Settings → Developer settings → Personal access tokens
- [ ] Click "Generate new token (classic)"
- [ ] Name: "PDF Flipbook"
- [ ] Select "repo" scope only
- [ ] Generate token
- [ ] Copy token (save somewhere safe, you won't see it again)

### Initial Test
- [ ] Visit public flipbook at: https://YOUR-USERNAME.github.io/myTestRepo/
- [ ] Verify page loads and styling looks correct
- [ ] Visit admin panel at: https://YOUR-USERNAME.github.io/myTestRepo/admin.html

### First Upload
- [ ] Get a test PDF file
- [ ] Enter your GitHub token in admin panel
- [ ] Enter your GitHub username
- [ ] Enter your repository name
- [ ] Select PDF file
- [ ] Click "Upload PDF"
- [ ] Wait for success message
- [ ] Refresh public viewer page
- [ ] Verify PDF appears in dropdown and can be viewed

### Final Verification
- [ ] Public flipbook works
- [ ] Can flip pages with buttons
- [ ] Keyboard navigation (arrow keys) works
- [ ] PDF dropdown selector works
- [ ] Admin panel upload works
- [ ] New PDFs appear in public viewer
- [ ] Delete functionality works
- [ ] Mobile/responsive design works

## Customization (Optional)

### Styling
- [ ] Customize colors in css/style.css
- [ ] Test on mobile devices
- [ ] Adjust font sizes if needed

### Flipbook Behavior
- [ ] Adjust page size in js/config.js
- [ ] Test with different PDF sizes
- [ ] Verify performance is acceptable

### Advanced
- [ ] Set up custom domain (GitHub Pages supports this)
- [ ] Add more PDFs to collections
- [ ] Implement additional security measures

## Deployment

### Before Going Live
- [ ] Tested all features
- [ ] PDFs display correctly
- [ ] Admin upload works
- [ ] Mobile responsiveness verified

### Make It Public
- [ ] Share the public link: https://YOUR-USERNAME.github.io/myTestRepo/
- [ ] Share admin access info with authorized users (if applicable)
- [ ] Document usage for end users

## Maintenance

### Regular Tasks
- [ ] Keep GitHub token updated (rotate every 90 days)
- [ ] Monitor PDF file sizes
- [ ] Check for any broken PDFs
- [ ] Backup your PDFs (they're in Git, so you have version history!)

### Troubleshooting
- [ ] If PDFs don't show: Hard refresh (Ctrl+Shift+R)
- [ ] If upload fails: Check token validity
- [ ] If styling looks wrong: Clear browser cache
- [ ] If pages won't flip: Check browser console for errors

---

## Need Help?

📖 Full documentation: See README.md
🚀 Setup guide: See SETUP.md
📚 Getting started: See GETTING_STARTED.md
🐛 Troubleshooting: See SETUP.md → Troubleshooting section

---

## Important Notes

⚠️  Keep your GitHub token private - never commit it to Git
⚠️  The token is only stored in browser localStorage, not sent anywhere else
⚠️  You can regenerate tokens anytime from GitHub Settings
⚠️  Use short-lived tokens (90 days recommended)

---

Document updated: 2026-04-07
