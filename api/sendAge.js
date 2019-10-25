
/**
 * 发送年龄
 */

function sendAge(info){
    return new Promise((resolve, reject) => {
        resolve('接收到年龄了')
    })
}

module.exports = sendAge;