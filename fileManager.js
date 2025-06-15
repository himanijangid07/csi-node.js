const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const baseDir = path.join(__dirname, 'files');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const filePath = path.join(baseDir, query.name || '');

    res.setHeader('Content-Type', 'text/plain');

    if (pathname === '/create' && req.method === 'GET') {
        const content = query.content || 'Default content';
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Failed to create file');
            } else {
                res.writeHead(200);
                res.end('File created successfully');
            }
        });

    } else if (pathname === '/read' && req.method === 'GET') {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found');
            } else {
                res.writeHead(200);
                res.end(`File contents:\n\n${data}`);
            }
        });

    } else if (pathname === '/delete' && req.method === 'GET') {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.writeHead(404);
                res.end('File not found or cannot delete');
            } else {
                res.writeHead(200);
                res.end('File deleted successfully');
            }
        });

    } else {
        res.writeHead(404);
        res.end('Invalid endpoint or method');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`File Manager Server running at http://localhost:${PORT}`);
});
