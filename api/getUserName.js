/**
 * 获取用户名字
 */

function getUserName(info) {
    return new Promise((resolve,reject) => {
        var info = {
            name: '李小龙'
        }
        resolve(info);
    })
}

module.exports = getUserName;