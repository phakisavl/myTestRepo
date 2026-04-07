// Admin panel functionality for uploading PDFs to GitHub

// Load saved settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('githubSettings');
    if (saved) {
        const settings = JSON.parse(saved);
        document.getElementById('repoOwner').value = settings.owner || CONFIG.GITHUB_OWNER;
        document.getElementById('repoName').value = settings.repo || CONFIG.GITHUB_REPO;
    } else {
        // Use default config values
        document.getElementById('repoOwner').value = CONFIG.GITHUB_OWNER;
        document.getElementById('repoName').value = CONFIG.GITHUB_REPO;
    }
}

// Save settings to localStorage
function saveSettings() {
    const settings = {
        owner: document.getElementById('repoOwner').value,
        repo: document.getElementById('repoName').value
    };
    localStorage.setItem('githubSettings', JSON.stringify(settings));
}

// Display message
function showMessage(text, type = 'info') {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    
    if (type !== 'error') {
        setTimeout(() => {
            messageDiv.classList.remove('success', 'info');
        }, 5000);
    }
}

// Get file SHA from GitHub
async function getFileSha(token, owner, repo, path) {
    try {
        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (response.ok) {
            const data = await response.json();
            return data.sha;
        }
        return null;
    } catch (error) {
        console.error('Error getting file SHA:', error);
        return null;
    }
}

// Upload PDF to GitHub
async function uploadPdfToGithub(token, owner, repo, fileName, fileContent) {
    try {
        const path = `pdfs/${fileName}`;
        const sha = await getFileSha(token, owner, repo, path);

        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Add PDF: ${fileName}`,
                    content: fileContent,
                    branch: 'main',
                    ...(sha && { sha })
                })
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Upload failed');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Convert file to base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Load list of uploaded PDFs
async function loadUploadedPDFs() {
    try {
        const owner = document.getElementById('repoOwner').value;
        const repo = document.getElementById('repoName').value;

        if (!owner || !repo) {
            document.getElementById('pdfList').innerHTML = '<p>Enter repository details to view PDFs</p>';
            return;
        }

        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/pdfs`,
            {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        const files = await response.json();

        if (!Array.isArray(files)) {
            document.getElementById('pdfList').innerHTML = '<p>No PDFs found</p>';
            return;
        }

        const pdfList = document.getElementById('pdfList');
        pdfList.innerHTML = '';

        const pdfFiles = files.filter(file => file.name.toLowerCase().endsWith('.pdf'));

        if (pdfFiles.length === 0) {
            pdfList.innerHTML = '<p>No PDFs uploaded yet</p>';
            return;
        }

        pdfFiles.forEach(file => {
            const item = document.createElement('div');
            item.className = 'pdf-item';
            item.innerHTML = `
                <span class="pdf-item-name">${file.name}</span>
                <button class="pdf-item-delete" onclick="deletePDF('${owner}', '${repo}', '${file.name}')">Delete</button>
            `;
            pdfList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading PDFs:', error);
        document.getElementById('pdfList').innerHTML = '<p>Error loading PDFs</p>';
    }
}

// Delete PDF from GitHub
async function deletePDF(owner, repo, fileName) {
    const token = document.getElementById('githubToken').value;

    if (!token) {
        showMessage('Please enter your GitHub token', 'error');
        return;
    }

    if (!confirm(`Are you sure you want to delete ${fileName}?`)) {
        return;
    }

    try {
        showMessage('Deleting PDF...', 'info');
        const path = `pdfs/${fileName}`;
        const sha = await getFileSha(token, owner, repo, path);

        if (!sha) {
            throw new Error('Could not find file to delete');
        }

        const response = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: `Delete PDF: ${fileName}`,
                    sha: sha,
                    branch: 'main'
                })
            }
        );

        if (!response.ok) {
            throw new Error('Failed to delete PDF');
        }

        showMessage(`${fileName} deleted successfully`, 'success');
        loadUploadedPDFs();
    } catch (error) {
        showMessage(`Error deleting PDF: ${error.message}`, 'error');
    }
}

// Handle upload button click
document.getElementById('uploadBtn').addEventListener('click', async () => {
    const token = document.getElementById('githubToken').value;
    const owner = document.getElementById('repoOwner').value;
    const repo = document.getElementById('repoName').value;
    const fileInput = document.getElementById('pdfFile');

    if (!token) {
        showMessage('Please enter your GitHub token', 'error');
        return;
    }

    if (!owner || !repo) {
        showMessage('Please enter repository owner and name', 'error');
        return;
    }

    if (!fileInput.files.length) {
        showMessage('Please select a PDF file', 'error');
        return;
    }

    const file = fileInput.files[0];

    if (!file.name.toLowerCase().endsWith('.pdf')) {
        showMessage('Please select a valid PDF file', 'error');
        return;
    }

    try {
        showMessage('Uploading PDF...', 'info');
        document.getElementById('uploadBtn').disabled = true;

        const base64Content = await fileToBase64(file);
        
        await uploadPdfToGithub(token, owner, repo, file.name, base64Content);

        showMessage(`${file.name} uploaded successfully!`, 'success');
        fileInput.value = '';
        saveSettings();
        loadUploadedPDFs();
    } catch (error) {
        showMessage(`Upload failed: ${error.message}`, 'error');
    } finally {
        document.getElementById('uploadBtn').disabled = false;
    }
});

// Handle repository settings change
document.getElementById('repoOwner').addEventListener('change', saveSettings);
document.getElementById('repoOwner').addEventListener('blur', loadUploadedPDFs);
document.getElementById('repoName').addEventListener('change', saveSettings);
document.getElementById('repoName').addEventListener('blur', loadUploadedPDFs);

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    if (document.getElementById('repoOwner').value && document.getElementById('repoName').value) {
        loadUploadedPDFs();
    }
});
