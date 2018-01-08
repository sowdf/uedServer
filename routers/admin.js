const express = require('express');
const router = express.Router();
const User = require('../model/User');
const Login = require('../model/Login');
const md5 = require('md5');
const Week = require('../model/Week');
const UserInfo = require('../model/UserInfo');
const Weekly = require('../model/Weekly');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
Weekly.belongsTo(Week, {foreignKey: 'weekId'});
Week.hasMany(Weekly, {foreignKey: 'weekId'});
/*
 * admin 登录
 * */
router.get('/login', (req, res, next) => {
    res.render('admin/login.html');
});


router.post('/login', async (req, res, next) => {
    let {body: {account, password}} = req;
    let data = await User.findAll({where: {account: account}});
    if (data.length === 0) {
        return res.send(res.stackResponse(99, '用户不存在'));
    }

    if (data[0].account !== account || data[0].password !== password) {
        return res.send(res.stackResponse(99, '账号或密码错误', data));
    }
    let cookie = md5(account + password.slice(0, 5) + new Date().getTime()); //账号 + 密码的5位数  +  时间粗
    let cookieData = await Login.findAll({where: {uid: data[0].uid}});
    if (cookieData.length === 0) { //表示数据库里面没有这个cookie
        Login.create({
            uid: data[0].uid,
            cookie: cookie
        });
    } else {
        Login.update({
            cookie: cookie
        }, {
            where: {
                uid: data[0].uid
            }
        })
    }
    req.cookie.set('cookie', cookie);
    res.send(res.stackResponse(100, '登录成功~', {cookie: cookie}));
});


/*
 * 获取期数
 * */
router.get('/getWeek', async (req, res, next) => {
    let data = await Week.findAll();
    return res.send(res.stackResponse(100, 'success', data[0]));
});


/*
 * 编辑 周报
 * */
router.post('/editWeekly', async (req, res, next) => {
    let {body: {weekId, weekWork, nextWork, conclusion}, userInfo: {uid}} = req;
    if (!weekWork || !nextWork || !conclusion || !weekId) {
        return res.send(res.stackResponse(100, '参数有误', {}));
    }
    let data = await Weekly.findAll({
        where: {
            uid: uid,
            weekId: weekId
        }
    });

    if (data.length === 0) { //表示没有
        Weekly.create({ // 创建
            uid, weekId, weekWork, nextWork, conclusion
        });
        return res.send(res.stackResponse(100, '添加成功', {}));
    } else {
        Weekly.update({
            weekWork, nextWork, conclusion
        }, {
            where: { //更新
                uid: uid,
                weekId: weekId
            }
        },);
        return res.send(res.stackResponse(100, '更新成功', {}));
    }
});

/*
 * 我的所有周报 周报
 * */
router.get('/allWeekly', async (req, res, next) => {
    let {userInfo: {uid}} = req;

    let data = await Weekly.findAll({
        include: [
            {
                model: Week
            }
        ],
        where: {
            uid: uid
        }
    });
    return res.send(res.stackResponse(100, 'success', data));
});


/*
 * 周报汇总
 * */
router.get('/weeklySummary', async (req, res, next) => {
    let {query: {weekId}} = req;
    let users = await UserInfo.findAll({ //获取所有用户的用户信息
        where: {
            isWorking: 1,
            dutyid : 1 // 前端
        }
    });
    let data = await Week.findAll({
        where: {
            weekId: weekId
        },
        include: [
            {
                model: Weekly
            }
        ]
    });
    let newData = JSON.parse(JSON.stringify(data[0]));
    newData.noWriteAry = [];


    //数据格式化 以uid为ke
    let stackNewData = {};
    newData.weeklies.map((item, index) => { //简历关系
        stackNewData[item.uid] = item; //以后uid 为 key 下面判断的时候用
    });

    users.map((item, index) => {
        let data = stackNewData[item.uid];
        if (data) { // 判读 数据存在吗如果存在就说明有写周报
            data.username = item.username;
        } else { //没有写周报的人进入这边
            newData.noWriteAry.push(item.username)
        }
    });
    return res.send(res.stackResponse(100, 'success', newData));
});


/*
 * 周报列表
 * */
router.get('/weeklyList', async (req, res, next) => {
    let userCount = await UserInfo.count({
        where: {
            isWorking: 1,
            dutyid : 1, // 1表示前端部门
        }
    });
    let data = await Week.findAll({
        include: [
            {
                model: Weekly
            }
        ]
    });
    let newData = JSON.parse(JSON.stringify(data));
    newData.map((item, index) => {
        let weeklyLength = item.weeklies.length;
        item.noWriteNum = userCount - weeklyLength;
        item.writeNum = weeklyLength;
        item.allNum = userCount;
        return item;
    });
    return res.send(res.stackResponse(100, 'success', newData));
});


/*
 * 一个人的周报
 * */
router.get('/oneWeekly', async (req, res, next) => {
    let {userInfo: {uid}, query: {weekId}} = req;
    if (weekId) { //看看是否存在 如果存在就给他想要的
        let data = await Weekly.findAll({
            include: [
                {
                    model: Week
                }
            ],
            where: {
                uid,
                weekId
            }
        });
        let newData = {
            weekWork: data[0].weekWork,
            nextWork: data[0].nextWork,
            conclusion: data[0].conclusion,
            wid: data[0].wid,
            weekId: data[0].weekId,
            startTimeText: data[0].week.startTimeText,
            endTimeText: data[0].week.endTimeText
        };
        return res.send(res.stackResponse(100, 'success', newData));
    }
    //没有weekId 就给他
    let weekData = await Week.findAll({
        order: [['weekId', 'DESC']]
    });
    let weeklyData = await Weekly.findAll({
        where: {
            uid: uid,
            weekId: weekData[0].weekId
        }
    });
    if (weeklyData.length === 0) { //表示没有写周报
        let newData = {
            weekWork: "",
            nextWork: "",
            conclusion: "",
            wid: "",
            weekId: weekData[0].weekId,
            startTimeText: weekData[0].startTimeText,
            endTimeText: weekData[0].endTimeText
        }
        return res.send(res.stackResponse(100, 'success', newData));
    } else {
        let newData = {
            weekWork: weeklyData[0].weekWork,
            nextWork: weeklyData[0].nextWork,
            conclusion: weeklyData[0].conclusion,
            wid: weeklyData[0].wid,
            weekId: weekData[0].weekId,
            startTimeText: weekData[0].startTimeText,
            endTimeText: weekData[0].endTimeText
        };
        return res.send(res.stackResponse(100, 'success', newData));
    }

});


/*
 * admin 退出登录
 * */
router.get('/logout', (req, res, next) => {
    req.cookie.set('cookie', '');
    return res.send(res.stackResponse(100, 'success', {}));
});

/*
 * admin 用户信息
 * */
router.get('/userInfo', async (req, res, next) => {
    let {userInfo: {uid}} = req;
    let data = await UserInfo.findAll({
        where: {
            uid: uid,
            isWorking: 1
        }
    });
    let newData = JSON.parse(JSON.stringify(data[0]));
    delete newData.password;
    return res.send(res.stackResponse(100, 'success', newData));
});


/*
 * 用户列表
 * */
router.get('/userList', async (req, res, next) => {
    let data = await User.findAll();
    let newData = JSON.parse(JSON.stringify(data));
    newData.map((item, index) => {
        delete item.password;
        return item;
    });
    return res.send(res.stackResponse(100, 'success', newData));
});


/*
 * 添加用户
 * */
router.post('/userAdd', async (req, res, next) => {
    let {body: {account, username, password}, userInfo: {isAdmin}} = req;
    if (isAdmin) {
        return res.send(res.stackResponse(98, '权限不足，你不是管理员', {}));
    }
    let data = await User.findAll({
        where: {
            account: account
        }
    });
    if (data.length != 0) {
        return res.send(res.stackResponse(99, '该账账号已存在', {}));
    }
    User.create({
        username,
        password,
        account
    });
    return res.send(res.stackResponse(100, '添加成功~', {}));
});


/*
 * admin 首页
 * */
router.get('/', (req, res, next) => {
    res.render('admin/index.html');
});


module.exports = router;