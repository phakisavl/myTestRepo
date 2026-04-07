# PDF Flipbook with StPageFlip + PDF.js

A fully hosted GitHub Pages website featuring an interactive PDF flipbook viewer and admin panel for uploading PDFs.

## Features

- 📖 **Interactive Flipbook Viewer**: Realistic page-flipping experience using [StPageFlip](https://st-page-flip.js.org/)
- 📄 **PDF Rendering**: Powered by [PDF.js](https://mozilla.github.io/pdf.js/)
- ⚙️ **Admin Panel**: Upload PDFs directly to GitHub via the admin interface
- 🌐 **GitHub Pages Hosting**: Fully hosted on GitHub, no external servers needed
- 📱 **Responsive Design**: Works on desktop and mobile devices
- ⌨️ **Keyboard Navigation**: Use arrow keys to flip pages

## How It Works

### Public Viewer (index.html)
- Displays PDFs as an interactive flipbook
- Fetches available PDFs from the `pdfs/` folder in your repository
- Uses GitHub API to list PDFs (public repos don't need authentication)
- PDFs are rendered to canvas and displayed with realistic page-flip animation

### Admin Panel (admin.html)
- Upload PDFs to your repository using GitHub API
- Requires a GitHub Personal Access Token
- Automatically commits files to your `pdfs/` folder
- Can delete previously uploaded PDFs

## Setup Instructions

### 1. Prepare Your GitHub Repository

1. **Create/Clone the Repository**
   ```bash
   git clone https://github.com/YOUR-USERNAME/myTestRepo.git
   cd myTestRepo
   ```

2. **Create the PDFs Folder**
   ```bash
   mkdir pdfs
   git add pdfs/.gitkeep
   git commit -m "Create pdfs folder"
   git push
   ```

3. **Enable GitHub Pages**
   - Go to your repository settings
   - Under "Pages", select "Deploy from a branch"
   - Choose `main` branch and `/root` as the source
   - Your site will be available at `https://YOUR-USERNAME.github.io/myTestRepo/`

### 2. Create a GitHub Personal Access Token

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name (e.g., "PDF Upload")
4. Select scopes:
   - `repo` (full control of private repositories)
   - `workflow` (if you want to trigger workflows)
5. Click "Generate token"
6. **Copy and save the token** (you'll only see it once!)

### 3. Using the Website

#### Public Viewer
- Visit: `https://YOUR-USERNAME.github.io/myTestRepo/`
- The flipbook will automatically load available PDFs
- Use the Previous/Next buttons or arrow keys to navigate
- Select different PDFs from the dropdown

#### Admin Panel
- Visit: `https://YOUR-USERNAME.github.io/myTestRepo/admin.html`
- Enter your GitHub credentials:
  - **Personal Access Token**: Paste your token from Step 2
  - **Repository Owner**: Your GitHub username
  - **Repository Name**: `myTestRepo`
- Select a PDF file and click "Upload PDF"
- The PDF will be committed to your repository and automatically available in the public viewer

## File Structure

```
myTestRepo/
├── index.html           # Public flipbook viewer
├── admin.html           # Admin upload panel
├── css/
│   └── style.css       # Styling
├── js/
│   ├── flipbook.js     # Flipbook logic
│   └── admin.js        # Admin panel logic
├── pdfs/               # PDF storage (created via Git)
└── README.md           # This file
```

## Configuration

### Quick Setup: Edit `js/config.js`

Simply update the following values in [js/config.js](js/config.js):

```javascript
const CONFIG = {
    GITHUB_OWNER: 'YOUR-GITHUB-USERNAME',  // Change this
    GITHUB_REPO: 'myTestRepo',             // Change this
    // ... other settings
};
```

**That's it!** The rest of the application will use these values automatically.

### Customize Flipbook Appearance

In [js/config.js](js/config.js), modify the `FLIPBOOK` object:

```javascript
FLIPBOOK: {
    width: 500,              // Page width in pixels
    height: 600,             // Page height in pixels
    size: 'adaptive',        // 'adaptive' or 'fixed'
    minWidth: 300,           // Minimum width
    maxWidth: 1000,          // Maximum width
    minHeight: 400,          // Minimum height
    maxHeight: 1000,         // Maximum height
    drawShadow: true,        // Show page shadow
    flipped: false,          // Start page
    showCover: true          // Show cover page
}
```

## Security Notes

⚠️ **Important**: The personal access token entered in the admin panel is stored in browser localStorage. For production:
- Use environment variables or backend authentication
- Consider implementing rate limiting
- Use Repository Collaborators instead of sharing tokens
- Regularly rotate tokens
- Use GitHub OAuth for better security

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 12+
- iOS Safari 12+

## Limitations

- GitHub API has rate limits (60 requests/hour for unauthenticated, 5000 for authenticated)
- Large PDFs may be slow to render (consider optimizing PDF quality)
- PDFs must be under GitHub's file size limits (100 MB for web UI, 2 GB for API)

## Troubleshooting

### PDFs not loading
- Check that the `pdfs/` folder exists in your repository
- Verify GitHub API URLs are correct in `flipbook.js`
- Check browser console for errors

### Upload fails
- Verify personal access token is valid and not expired
- Check that repository owner and name are correct
- Ensure you have push access to the repository
- Check GitHub API rate limits

### Page flipping not working
- Ensure JavaScript files are loaded (check Developer Tools → Network tab)
- Try refreshing the page
- Check browser console for errors

## License

MIT License - Feel free to use and modify for your projects!

## Dependencies

- [StPageFlip](https://st-page-flip.js.org/) - Page flip animation library
- [PDF.js](https://mozilla.github.io/pdf.js/) - PDF rendering engine
- [GitHub API v3](https://docs.github.com/en/rest) - For file uploads

## Future Enhancements

- [ ] OAuth authentication for admin panel
- [ ] Multiple PDF flipbooks on one site
- [ ] Search functionality within PDFs
- [ ] Bookmark/favorite pages
- [ ] PDF annotations
- [ ] Download PDF feature
- [ ] Web Worker for PDF rendering
- [ ] Progressive Web App (PWA) support

---

**Need help?** Check the [troubleshooting section](#troubleshooting) or open an issue in the repository!