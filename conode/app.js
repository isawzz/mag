const fs = require('fs');
const path = require('path');

function removeImportantLines(filePath) {
    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    // Read the file content
    const content = fs.readFileSync(filePath, 'utf8');

    // Remove lines containing ': !important;'
    const filteredContent = content
        .split('\n')
        .filter(line => !line.includes(': !important;'))
        .join('\n');

    // Generate a new file name
    const dir = path.dirname(filePath);
    const ext = path.extname(filePath);
    const baseName = path.basename(filePath, ext);
    const randomSuffix = Math.floor(Math.random() * 100000);
    const newFileName = `${baseName}_${randomSuffix}${ext}`;
    const newFilePath = path.join(dir, newFileName);

    // Save the updated content
    fs.writeFileSync(newFilePath, filteredContent, 'utf8');

    console.log(`File saved as: ${newFilePath}`);
    return newFilePath; // Return the new file path for further use
}

// Example usage:
try {
    const updatedFilePath = removeImportantLines('../conode/test.html');
    console.log(`Updated file created at: ${updatedFilePath}`);
} catch (err) {
    console.error(err.message);
}
