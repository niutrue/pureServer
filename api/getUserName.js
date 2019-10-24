/**
 * 获取用户名字
 */

const getInfo = require('./jsons/getInfo');

function getUserName(info) {
    return new Promise((resolve,reject) => {
        var query = info.query;
        var pathname = '/users';
        var filename = `${query.userId}.json`;
        // 获取数据
        getInfo(pathname,filename)
            .then(data => {
                // 对数据进行处理
                var info = JSON.parse(data);    
                var name = info.name;
                resolve(name);
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = getUserName;