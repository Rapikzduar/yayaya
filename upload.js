document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length === 0) {
        alert('Please select a file.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function(event) {
        const media = event.target.result;
        const mime = file.type;
        const githubToken = `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`; // https://github.com/settings/tokens
        const owner = 'Rapikzduar'; //nama pemilik repo
        const repo = 'yayaya'; // Nama repo tanpa URL
        const branch = 'main';
        let fileName = `${Date.now()}.${mime.split('/')[1]}`;
        let filePath = `uploads/${fileName}`;
        let base64Content = media.split(',')[1];

        try {
            let response = await axios.put(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                message: `Upload file ${fileName}`,
                content: base64Content,
                branch: branch,
            }, {
                headers: {
                    Authorization: `Bearer ${githubToken}`,
                    'Content-Type': 'application/json',
                },
            });

            let rawUrl = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${filePath}`;
            document.getElementById('result').innerHTML = `<p>File uploaded successfully. <a href="${rawUrl}" target="_blank">View File</a></p>`;
        } catch (error) {
            console.error(error);
            document.getElementById('result').innerHTML = `<p>Failed to upload file. Please try again.</p>`;
        }
    };

    reader.readAsDataURL(file);
});
