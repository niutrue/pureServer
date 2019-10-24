/**
 * 获取数据
 */

const path = require('path');
const fs = require('fs');

function getInfo(pathname, filename){
    return new Promise((resolve,reject) => {
        var infoPath = path.join(__dirname,pathname,filename);
        fs.readFile(infoPath,'utf8',(err, data) => {
            if(err){
                reject(err);
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = getInfo;