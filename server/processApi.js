/**
 * 处理api
 */
const url = require('url');
const qs = require('querystring');
const useParApi = require('../api/entry');

// 解析出 接口的方法、路径、和解析化之后的查询字符串
function processApi(req){
    var method = req.method.toLowerCase();
    var pathname = url.parse(req.url).pathname.replace(/^\/api\//,'');
    var query = qs.parse(url.parse(req.url).query);
    var info = {
        method,
        pathname,
        query
    }
    var params = '';
    req.on('data', (chunk) => {
        params += chunk;
    })
    req.on('end',() => {
        console.log('eee')
        console.log(params);
    })
    return useParApi(info);
}

module.exports = processApi;