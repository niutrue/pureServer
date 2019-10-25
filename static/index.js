// 获取需要的节点
var getNameBtn = getNode('.get_name');
var showNameSec = getNode('.show_name');
var typeAge = getNode('.type_age');
var postAgeBtn = getNode('.post_age');
var showAge = getNode('.show_age');

//获取用户名流程
getNameBtn.addEventListener('click',function(){

    var opt = {
        url: './api/getUserName',
        method: 'get',
        params: {
            userId: 1101,
            color: 'red'
        },
        success:function(info){
            showNameSec.innerHTML = info;
        }
    }

    sendInfo(opt);

},false);

// 发送年龄的流程
postAgeBtn.addEventListener('click',function(){

    var params = {
        age: typeAge.value
    }

    var opt = {
        url: './api/sendAge',
        method: 'post',
        params: params,
        success:function(info){
            console.log('...............')
            console.log(info)
        }
    }

    sendInfo(opt);
},false);


// 根据className获取页面中的节点元素
function getNode(className){
    return document.querySelector(className);
}

/**
 * 进行http通信的函数
 * {参数说明
 *  url:'',服务的url
 *  method:'',http请求的方法
 *  params:'',携带的参数
 *  success:'',正常通信的回调函数
 *  error:'',异常通信的回调函数
 * }
 */

function sendInfo(opt){

    var url = opt.url;
    var method = opt.method.toLowerCase();
    var params = null;
    if(method === 'get'){
        url = addParamsToUrl(opt.url, opt.params);
    } else if(method === 'post'){
        params = JSON.stringify(opt.params);
    }
    var xhr = new XMLHttpRequest();
    xhr.open(method,url);
    xhr.send(params);
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200){
            var info = JSON.parse(xhr.response);
            opt.success(info);
        }
    }
}

// 把参数作为查询字符串拼接到url上

function addParamsToUrl(url,params){
    var qs = '';
    for(var item in params){
        qs += item + '=' + params[item] + '&'
    }
    return (url + '?' + qs).replace(/&$/,'');
}