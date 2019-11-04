const http = require('http');
const processCore = require('./server/processCore');
const processRes = require('./server/processRes');

const app = http.createServer((req, res) => {
    //处理请求，提供对应的服务
    processCore(req)
        .then(data => {
            //处理响应
            var result = processRes(data, req);
            res.writeHead(200, result.contentType);
            res.end(result.info);
        })
        .catch(err => {
            res.writeHead(404,{'Content-Type':'text/plain'})
            res.end(err);
        })
});

app.listen(7000);

// const test = require('./test');

