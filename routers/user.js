const express = require('express');
const router = express.Router();
const UserInfo = require('../model/UserInfo');
const User = require('../model/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/**
 * 获取所有的用户情况列表
 */

UserInfo.belongsTo(User,{foreignKey:'uid'});
router.get('/user/manage',async (req,res,next)=>{
    let userInfoList = await UserInfo.findAll({
        order : [['uid','DESC']]
    });
    res.send(res.stackResponse(100,'success',userInfoList))

});

/**
 * 添加用户
 * @method post
 * @param account password username
 */

router.post('/user/add',async (req,res,next)=>{
    let {userInfo : {isAdmin},body : {account,password,username}} = req;
    //权限校验
    if(isAdmin != 1){
        return res.send(res.stackResponse(98,'您不是管理员~~',{}));
    }

    if(!account || !password || !username){
        return res.send(res.stackResponse(99,'参数不足~~',{}));
    }
    let users = await User.findAll({
        where : {
            account : account
        }
    });
    if(users.length > 0){
        return res.send(res.stackResponse(99,'该账号已存在~~',{}));
    }

    let userInfo = await User.create({
        account,
        password
    });

    UserInfo.create({
        uid : userInfo.uid,
        username : username
    });

    res.send(res.stackResponse(100,'添加成功',{}))

});


/**
 * 获取单个用户的信息
 * @param uid
 * @method get
 */
router.get('/user/findOne',async (req,res,next)=>{
    let {query:{uid}} = req;
    let users = await UserInfo.findAll({
        include : [
            {
                model : User,
                attributes : ['account']
            }
        ],
        where : {
            uid
        },
        attributes : [
            'motto','avatar','leaveTime','inTheTime','email','uid','gid','dutyid','isAdmin','isWorking','username','workNumber'
        ]
    });

    if(users.length == 0){
        return res.send(res.stackResponse(99,'查找的用户不存在',{}))
    }
    let newData = JSON.parse(JSON.stringify(users[0]));
    delete newData.user;
    newData.account = users[0].user.account;
    res.send(res.stackResponse(100,'success',newData))
});


/**
 * 编辑单个用户的信息
 * @param uid
 * @method get
 */

router.post('/user/edit',async (req,res,next)=>{
    let {body:{uid,account},userInfo : {isAdmin}} = req;
    if(isAdmin != 1){
        return res.send(res.stackResponse(98,'您不是管理员',{}))
    }
    let users = await UserInfo.findAll({
        where : {
            uid
        }
    });
    if(users.length == 0){
        return res.send(res.stackResponse(99,'编辑的用户不存在',{}))
    }
    let updateData = JSON.parse(JSON.stringify(req.body));
    delete updateData.uid;
    UserInfo.update(updateData,{ //更新userInfo
        where : {
            uid : uid
        }
    });

    res.send(res.stackResponse(100,'success',{}))
});


module.exports = router;