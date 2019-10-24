const http = require('http');
const processCore = require('./server/processCore');

const app = http.createServer((req, res) => {
    processCore(req)
        .then(data => {
            var type = data.type;
            var info = data.data;
            if(type === 'api'){
                info = JSON.stringify(data.data);
                res.writeHead(200,{'Content-Type':'text/plain;charset=UTF-8'})
            } else if(type === 'static'){

            }
            res.end(info);
        })
        .catch(err => {
            res.writeHead(404,{'Content-Type':'text/plain'})
            res.end(err);
        })
});

app.listen(7000)
