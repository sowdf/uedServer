const request = require('request');
const data = require('../data/fund.js');
const Fund = require('../model/Fund.js');

const opation = {
    "User-Agent" : "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36"
};
const url = `http://fundgz.1234567.com.cn/js/161027.js?rt=1463558676006`;
const jsonpgz = (data)=>{
    let proxyData = data;
    if(Number(proxyData.gszzl) > 0){
        proxyData.isProfit = 1;
    }else{
        proxyData.isProfit = 0;
    }
    console.log(proxyData);
    Fund.create(proxyData);
    return true;
}


class ScriptFund{
    constructor(){
        this.index = 0;
    }
    static getData(fundCode){
        request.get(`http://fundgz.1234567.com.cn/js/${fundCode}.js?rt=1463558676006`,opation,(err,response,body)=>{
            let fn = eval(body);
        });
    }
    proxyGetData(){
        setTimeout(()=>{
            let fundCode = data[this.index][0];
            let url = `http://fundgz.1234567.com.cn/js/${fundCode}.js?rt=1463558676006`;
            request.get(url,opation,(err,response,body)=>{
                try {
                    let fn = eval(body);
                }catch (e){
                    console.log('错误基金代码' + fundCode);
                }
            });
            this.index++;
            if(this.index !== data.length){
                this.proxyGetData();
            }else{
                console.log('采集结束');
            }
        },100);
    /*    data.map((item,index)=>{
            let fundCode = item[0];
            let url = `http://fundgz.1234567.com.cn/js/${fundCode}.js?rt=1463558676006`;
            request.get(url,opation,(err,response,body)=>{
                try {
                    let fn = eval(body);
                }catch (e){
                    console.log(fundCode);
                }
            });
        });*/
    }
    init(){
        this.proxyGetData();
    }
}

let scriptFund = new ScriptFund();
scriptFund.init();

/*let testUrl = `http://fundgz.1234567.com.cn/js/000002.js?rt=1463558676006`;
request.get(testUrl,opation,(err,response,body)=>{
    console.log(url);
    try {
        let fn = eval(body);
    }catch (e){
        console.log(e);
    }
});*/

