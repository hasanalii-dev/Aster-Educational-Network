const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let modifiedFiles = 0;
let totalReplaced = 0;

walkDir('./src', function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Force change w_1200 to w_800 for even better performance
        content = content.replace(/c_scale,w_1200,q_auto,f_auto/g, 'c_scale,w_800,q_auto,f_auto');
        
        // Catch any stray unoptimized image/upload/v URLs
        content = content.replace(/image\/upload\/v/g, 'image/upload/c_scale,w_800,q_auto,f_auto/v');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedFiles++;
            totalReplaced++;
            console.log('Modified:', filePath);
        }
    }
});

console.log(`\nDONE! Modified ${modifiedFiles} files.`);
