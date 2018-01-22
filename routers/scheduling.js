const express = require('express');
const router = express.Router();
const SchedulingUser = require('../model/SchedulingUser');
const Working = require('../model/Working');
const Position = require('../model/Position');
const Active = require('../model/Active');


/*
 * 人员添加
 *
 * */
router.post('/member/add',async (req,res,next)=>{
    let {body:{position,name,email,workNumber}} = req;
    if(!name || !workNumber){
        return res.send(res.stackResponse(99, '参数不足', {}));
    }
    let users = await SchedulingUser.findAll({
        where : {
            workNumber
        }
    });
    if(users.length > 0 ){
        return res.send(res.stackResponse(98, '该人员已存在~~', {}));
    }
    let createData = JSON.parse(JSON.stringify(req.body));
    SchedulingUser.create(createData);
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
router.post('/active/add',async (req,res,next)=>{
    let {name} = req;
    if(!name){
        return res.send(res.stackResponse(99, '参数不足', {}));
    }
    let createData = JSON.stringify(JSON.stringify(req.body));
    Active.create(createData);
    return res.send(res.stackResponse(100, '添加成功', {}));
})

/*
* 编辑
* */
router.post('/active/edit',async (req,res,next)=>{
    let {actId} = req;
    if(!actId){
        return res.send(res.stackResponse(99, '参数不足', {}));
    }
    let actives = await Active.findAll({
        where : {
            actId
        }
    });
    if(actives.length === 0){
        return res.send(res.stackResponse(99, '活动不存在~~', {}));
    }
    let updateData = JSON.stringify(JSON.stringify(req.body));
    delete updateData.actId;
    Active.update(
        {
            actId
        },updateData);
    return res.send(res.stackResponse(100, '编辑成功', {}));
});


/*
* 获取单个活动信息
* */
router.get('/active/findOne',async (req,res,next)=>{
    let {actId} = req;
    if(!actId){
        return res.send(res.stackResponse(99, '参数不足', {}));
    }
    let actives = await Active.findAll({
        where : {
            actId
        }
    });
    if(actives.length === 0){
        return res.send(res.stackResponse(99, '活动不存在~~', {}));
    }
    return res.send(res.stackResponse(100, '查询成功~~', actives[0]));
});


/*
* 所有活动信息
* */
router.get('/active/all',async (req,res,next)=>{
    let actives = await Active.findAll({});
    return res.send(res.stackResponse(100, '查询成功~~', actives[0]));
});




module.exports = router;