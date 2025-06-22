const fs = require('fs').promises;

async function readFileContent(fileName) {
    try {
        const data = await fs.readFile(fileName, 'utf8');
        console.log('File content:', data);
    } catch (err) {
        console.error('Error reading file:', err.message);
    }
}

readFileContent('sample.txt');

// original code
// const fs = require('fs');

// function readFileContent(fileName) {
//     fs.readFile(fileName, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//         } else {
//             console.log('File content:', data);
//         }
//     });
// }

// readFileContent('sample.txt');