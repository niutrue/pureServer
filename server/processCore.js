/**
 * 根据请求的路径提供对应的服务
 */

const getFileData = require('./getFileData');
const get404Page = require('./get404Page');

function processCore(pathname){
    return new Promise((resolve,reject) => {
        var apiRegExp = /^\/api\//;
        var staticRegExp = /\.(?:(?:html)|(?:css)|(?:js)|(?:jpg)|(?:jpeg)|(?:png)|(?:gif)|(?:ico))$/;
        
        // 提供接口服务
        if (apiRegExp.test(pathname)) {
            resolve('提供接口服务');
        // 提供静态资源服务
        } else if (staticRegExp.test(pathname)) {
            getFileData(pathname)
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                if(err.code === 'ENOENT'){
                    // 找不到html资源，返回404页面，非404资源返回404提示信息
                    if(/\.html$/.test(pathname)){
                        get404Page()
                            .then(data => {
                                resolve(data)
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