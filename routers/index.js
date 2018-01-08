let express = require('express');
let router = express.Router();

/*
 * admin 登录
 * */
router.get('/',(req,res,next)=>{
    res.render('index.html',{title : '这是一个标题'});
});

module.exports = router;