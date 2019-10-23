const http = require('http');
const url = require('url');

const app = http.createServer((req, res) => {
    //根据请求的pathname来决定提供什么服务
    var pathname = url.parse(req.url).pathname;
    var apiRegExp = /^\/api\//;
    var staticRegExp = /\.(?:(?:html)|(?:css)|(?:js)|(?:jpg)|(?:jpeg)|(?:png)|(?:gif)|(?:ico))$/;

    if (apiRegExp.test(pathname)) {
        console.log('提供接口服务');
    } else if (staticRegExp.test(pathname)) {
        console.log('提供静态资源服务')
    }
    res.end('ok')
});

app.listen(8000)
