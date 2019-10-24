/**
 * 处理响应数据
 */
const url = require('url');

function processRes(data,req){
    var type = data.type;
    var info = null;
    var contentType = null;
    if(type === 'api'){
        info = JSON.stringify(data.data);
        contentType = {'Content-Type':'text/plain;charset=UTF-8'};
    } else if(type === 'static'){
        var pathname = url.parse(req.url).pathname;
        var suffix = (/\.(\w+)$/.exec(pathname)[1]);
        var typeMap = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'gif': 'image/gif',
            'jpeg': 'image/jpeg',
            'jpg': 'image/jpeg',
            'png': 'image/png',
            'svg': 'image/svg+xml',
            'ico': 'image/x-icon'
        }
        contentType = {
            'Content-type': typeMap[suffix] || {'Content-Type':'application/octet-stream'}
        }
        info = data.data;
    }
    return {
        contentType,
        info
    }
}

module.exports = processRes;