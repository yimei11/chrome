let Mock = require('mockjs');

let data = {
    "视频":["好看视频","爱奇艺","腾讯视频","优酷视频","搜狐视频","百度视频","抖音","快手","西瓜视频"],
    "游戏":["好看视频","爱奇艺","腾讯视频","优酷视频","搜狐视频","百度视频","抖音","快手","西瓜视频"],
    "新闻":["好看视频","爱奇艺","腾讯视频","优酷视频","搜狐视频","百度视频","抖音","快手","西瓜视频"],
    "社交":["好看视频","爱奇艺","腾讯视频","优酷视频","搜狐视频","百度视频","抖音","快手","西瓜视频"],
}

Mock.mock('/api/classify','get',function(config){
    return data
})

Mock.mock(/\/api\/classify\/\d/,'delete',function(config){
    let id = config.url.split('/').pop();
    let key = JSON.parse(config.body).value;
    // data[key].splice(id+1,1)
    // console.log(data[key]);
    console.log(data[key].splice(id,1));
    return data
})