/**
 * 根据请求的路径提供对应的服务
 */
const url = require('url');
const getFileData = require('./getFileData');
const get404Page = require('./get404Page');
const processApi = require('./processApi');

function processCore(req){
    return new Promise((resolve,reject) => {
        var pathname = url.parse(req.url).pathname;
        var apiRegExp = /^\/api\//;
        var staticRegExp = /\.(?:(?:html)|(?:css)|(?:js)|(?:jpg)|(?:jpeg)|(?:png)|(?:gif)|(?:ico))$/;
        
        // 提供接口服务
        if (apiRegExp.test(pathname)) {
            processApi(req)
                .then(data => {
                    var info = {
                        data:data,
                        type:'api'
                    }
                    resolve(info);
                })
                .catch(err => {
                    reject('404 Not Found');
                })
        // 提供静态资源服务
        } else if (staticRegExp.test(pathname)) {
            getFileData(pathname)
            .then(data => {
                var info = {
                    data:data,
                    type:'static'
                }
                resolve(info)
            })
            .catch(err => {
                if(err.code === 'ENOENT'){
                    // 找不到html资源，返回404页面，非404资源返回404提示信息
                    if(/\.html$/.test(pathname)){
                        get404Page()
                            .then(data => {
                                var info = {
                                    data:data,
                                    type:'static'
                                }
                                resolve(info)
                            })
                            .catch(err => {
                                reject('404 Not Found')
                            })
                    } else {
                        reject('404 Not Found');
                    }
                }
            })
        // 其他的情况返回404页面
        } else {
            get404Page()
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    reject('404 Not Found')
                })
        }
    })
}

module.exports = processCore;