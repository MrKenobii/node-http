const http = require('http');
const fs = require('fs');
const path = require('path');
const hostname = "localhost";
const port = 4000;

const server = http.createServer((req,res) => {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    if(req.method == 'GET'){
        var fileUrl;
        if(req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url;

        var filePath = path.resolve('./public' + fileUrl);
        const fileExtension = path.extname(filePath);
        if(fileExtension == '.html') {
            fs.exists(filePath, (exists) => {
                if(!exists) {
                    res.statusCode = 404;
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end('<html><body><h1>Error: 404 ' + fileUrl +' not found ' + '</h1></body></html>');
                    return;
                }
                res.statusCode = 200;
                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream(filePath).pipe(res);
            })
        }else{
            res.statusCode = 404;
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end('<html><body><h1>Error: 404 ' + fileUrl +' not an html file ' + '</h1></body></html>');
            return;
        }
    }else{
        res.statusCode = 404;
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<html><body><h1>Error: 404 ' + req.method +' not supportive ' + '</h1></body></html>');
        return;
    }
    // res.statusCode = 200;
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.end('<html><body><h1>Hello, World!</h1></body></html>');
});

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`);
});