// PDF.js worker setup
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let currentPDF = null;
let pageFlip = null;

// Initialize the flipbook
async function initFlipbook() {
    const flipbookContainer = document.getElementById('flipbook');
    
    pageFlip = new PageFlip(flipbookContainer, CONFIG.FLIPBOOK);

    pageFlip.on('flip', onPageFlip);
    pageFlip.on('changeOrientation', onChangeOrientation);

    loadPDFList();
}

// Load list of available PDFs
async function loadPDFList() {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${CONFIG.GITHUB_OWNER}/${CONFIG.GITHUB_REPO}/contents/${CONFIG.PDF_FOLDER}`
        );
        const files = await response.json();

        if (!Array.isArray(files)) {
            console.error('Failed to load PDFs');
            return;
        }

        const pdfFiles = files.filter(file => file.name.toLowerCase().endsWith('.pdf'));
        const selectBox = document.getElementById('pdfSelect');
        
        selectBox.innerHTML = '<option value="">Select a PDF...</option>';
        
        pdfFiles.forEach(file => {
            const option = document.createElement('option');
            option.value = file.download_url;
            option.textContent = file.name.replace('.pdf', '');
            selectBox.appendChild(option);
        });

        if (pdfFiles.length > 0) {
            selectBox.value = pdfFiles[0].download_url;
            await loadPDF(pdfFiles[0].download_url);
        }
    } catch (error) {
        console.error('Error loading PDF list:', error);
    }
}

// Load and render PDF
async function loadPDF(pdfUrl) {
    if (!pdfUrl) return;

    try {
        const pages = [];
        const canvas = document.createElement('canvas');
        
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        currentPDF = pdf;

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 2 });

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            const context = canvas.getContext('2d');
            await page.render({ canvasContext: context, viewport }).promise;

            // Create div for each page
            const pageDiv = document.createElement('div');
            pageDiv.className = 'page';
            pageDiv.style.width = viewport.width + 'px';
            pageDiv.style.height = viewport.height + 'px';

            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png');
            pageDiv.appendChild(img);
            pages.push(pageDiv);
        }

        pageFlip.clear();
        pageFlip.addPages(pages);
        pageFlip.flip(0);

        updatePageInfo();
    } catch (error) {
        console.error('Error loading PDF:', error);
    }
}

// Handle page flip
function onPageFlip(object) {
    updatePageInfo();
}

// Update page info display
function updatePageInfo() {
    const currentPage = pageFlip.getCurrentPageIndex() + 1;
    const totalPages = pageFlip.getPageCount();
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;

    // Update button states
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Navigation buttons
document.getElementById('prevBtn').addEventListener('click', () => {
    if (pageFlip.getCurrentPageIndex() > 0) {
        pageFlip.flip(pageFlip.getCurrentPageIndex() - 1);
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (pageFlip.getCurrentPageIndex() < pageFlip.getPageCount() - 1) {
        pageFlip.flip(pageFlip.getCurrentPageIndex() + 1);
    }
});

// PDF selection
document.getElementById('pdfSelect').addEventListener('change', (e) => {
    if (e.target.value) {
        loadPDF(e.target.value);
    }
});

// Change orientation
function onChangeOrientation(orientation) {
    console.log('Orientation changed to:', orientation);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initFlipbook);

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        document.getElementById('prevBtn').click();
    } else if (e.key === 'ArrowRight') {
        document.getElementById('nextBtn').click();
    }
});
