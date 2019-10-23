const http = require('http');
const url = require('url');
const processCore = require('./server/processCore');

const app = http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;
    processCore(pathname)
        .then(data => {
            res.end(data);
        })
        .catch(err => {
            res.writeHead(404, {'Content-Type':'text/plain'})
            res.end(err);
        })
});

app.listen(7000)
