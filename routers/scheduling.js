const express = require('express');
const router = express.Router();
const SchedulingUser = require('../model/SchedulingUser');


/*
 * 人员添加
 *
 * */
router.post('/member/add',async (req,res,next)=>{
    let {body:{position,name,email}} = req;
    if(!name){
        return res.send(res.stackResponse(99, '参数不足', {}));
    }
    let users = await SchedulingUser.findAll({
        where : {
            name
        }
    });
    if(users.length > 0 ){
        return res.send(res.stackResponse(98, '该人员已存在~~', {}));
    }
    SchedulingUser.create({
        name,
        position,
        email
    })
    return res.send(res.stackResponse(100, '添加成功', {}));
});

/**
 * 所有人员
 *
 */
router.get('/member/all',async (req,res,next)=>{
    console.log(11111);
    let members = await SchedulingUser.findAll({});
    return res.send(res.stackResponse(100, 'success', members));
});
/**
 * 获取单个人员信息
 * @param mid
 *
 */

router.get('/member/getMember',async (req,res,next)=>{
    let {query:{mid}} = req;
    if(!mid){
        return res.send(res.stackResponse(99, '参数不足', {}));
    }
    let members = await SchedulingUser.findAll({
        where:{
            mid
        }
    });
    if(members.length == 0 ){
        return res.send(res.stackResponse(99, '该成员不存在', {}));
    }
    return res.send(res.stackResponse(100, 'success', members[0]));
});

/**
 * 编辑个人信息
 * @param mid
 *
 */

router.post('/member/edit',async (req,res,next)=>{
    let {body:{mid}} = req;
    if(!mid){
        return res.send(res.stackResponse(99, '参数不足', {}));
    }
    let members = await SchedulingUser.findAll({
        where:{
            mid
        }
    });
    if(members.length == 0 ){
        return res.send(res.stackResponse(99, '该成员不存在', {}));
    }

    let updateData = JSON.parse(JSON.stringify(req.body));
    delete updateData.mid;
    SchedulingUser.update(updateData,{ //更新userInfo
        where : {
            mid : mid
        }
    });
    return res.send(res.stackResponse(100, 'success', {}));
});


/*
* 活动入录
* */



module.exports = router;