/**
 * 获取静态文件的数据
 */

const path = require('path');
const fs = require('fs');

const baseDir = process.cwd() + '/static';

function getFileData(pathname){
    return new Promise((resolve,reject) => {
        let filePath = path.join(baseDir,pathname);
        var codeType = '';
        if(/\.(?:(?:html)|(?:css)|(?:js))$/.test(pathname)){
            codeType = 'utf8';
        }
        fs.readFile(filePath,'utf8',(err,data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = getFileData