// Configuration file for the PDF Flipbook
// Edit these values with your GitHub repository information

const CONFIG = {
    // GitHub Repository Information
    GITHUB_OWNER: 'phakisavl',      // Your GitHub username
    GITHUB_REPO: 'myTestRepo',       // Your repository name
    PDF_FOLDER: 'pdfs',              // Folder where PDFs are stored
    
    // Flipbook Display Settings
    FLIPBOOK: {
        width: 500,                  // Page width in pixels
        height: 600,                 // Page height in pixels
        size: 'adaptive',            // 'adaptive' or 'fixed'
        minWidth: 300,               // Minimum width
        maxWidth: 1000,              // Maximum width
        minHeight: 400,              // Minimum height
        maxHeight: 1000,             // Maximum height
        drawShadow: true,            // Show shadow on pages
        flipped: false,              // Show first page flipped
        showCover: true              // Show cover page
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
