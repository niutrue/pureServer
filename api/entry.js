/**
 * 接口服务的入口
 */
// api集合
const getUserName = require('./getUserName');
const sendAge = require('./sendAge');

var apiMap = {
    getUserName, //获取用户名
    sendAge, //发送年龄
}

// 使用某个具体的api
function useParApi(info){
    return new Promise((resolve,reject) => {
        if(apiMap[info.pathname]){
            apiMap[info.pathname](info)
                .then(data => {
                    console.log(1111)
                    console.log(data)
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
