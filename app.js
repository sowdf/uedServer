const express = require('express');

const bodyParser = require('body-parser');


const Sequelize = require('sequelize');


//设置COOKIES
let Cookies = require('cookies');

let path = require('path');

let app = express();

let ejs = require('ejs');

//设置模板引擎
app.engine('html',ejs.renderFile);
//设置模板路径 第一个一定要是views
app.set('views','./views');
// 第一个参数必须是engine html 第二个参数是 设置模板引擎的方法名字 ；
app.set('engine html','html');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

//静态文件的设置
app.use(express.static(path.join(__dirname,'public')));


app.use((req,res,next)=>{
    res.stackResponse = (code,message,data)=>{
        let responseData = {};
        responseData.result = data || {};
        responseData.code = code;
        responseData.message = message;
        return responseData;
    };
    next();
});

//中间间
const Login = require('./model/Login');
const UserInfo = require('./model/UserInfo');
Login.belongsTo(UserInfo,{foreignKey:'uid'});
app.use(async (req,res,next)=>{
    req.cookie = new Cookies(req,res);
    req.userInfo = {};
    let cookie = req.cookie.get('cookie');
    let url = req.url;
    if(url.indexOf('login') == -1){
        if(!cookie){ //未登录
            return res.send(res.stackResponse(799,'尚未登录',{}))
        }

        let data = await Login.findAll({
            include : [
                {
                    model : UserInfo
                }
            ],
            where : {
                cookie : cookie
            }
        });
        if(data.length === 0){  //未登录
            //return res.redirect('/admin/login')
            res.send(res.stackResponse(799,'尚未登录',{}))
        }
        req.userInfo = data[0].userInfo;
        return next();
    }else{ //登录页面
        return next();
    }
});


let main = require('./routers/index');
let admin = require('./routers/admin');
let user = require('./routers/user');
app.use('/',main);
app.use('/admin',admin);
app.use('/admin',user);
app.listen('1818',(err)=>{
    if(err){
        throw err;
    }
    console.log('this is start port 1818');
});
