const fs = require('fs');
const path = require('path');

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.json')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const originalContent = content;
            
            // Replace em-dash with space
            content = content.replace(/\s*—\s*/g, ' ');
            
            // Replace isolated double hyphens with space
            content = content.replace(/\s+--\s+/g, ' ');
            
            // Just in case there are double spaces left over
            content = content.replace(/  +/g, ' ');
            
            if (content !== originalContent) {
                fs.writeFileSync(fullPath, content);
                console.log(`Updated: ${fullPath}`);
            }
        }
    }
}

processDirectory('/Users/aritrabose/Desktop/SOF/tiu-replica/src');
console.log('Finished removing dashes.');
