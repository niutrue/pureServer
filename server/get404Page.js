/**
 * 获取404页面
 */

const path = require('path');
const fs = require('fs');

const baseDir = process.cwd() + '/static';
const pathFor404 = '/404/404.html';

function get404Page(){
    return new Promise((resolve,reject) => {
        let filePath = path.join(baseDir,pathFor404);
        fs.readFile(filePath,'utf8',(err,data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}

module.exports = get404Page