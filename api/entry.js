/**
 * 接口服务的入口
 */
// api集合
const getUserName = require('./getUserName');
var apiMap = {
    getUserName
}

// 使用某个具体的api
function useParApi(info){
    return new Promise((resolve,reject) => {
        if(apiMap[info.pathname]){
            apiMap[info.pathname](info)
                .then(data => {
                    resolve(data);
                })
                .catch(err => {//接口本身的错误
                    reject(err)
                })
        // 没有接口的错误
        } else {
            reject('没有这个接口');
        }
    })
}

module.exports = useParApi;
