let later = require('later');
let basic = {s:[00]};  //设置每天凌晨执行
let Week = require('../model/Week');
//h:[00],m:[01]
let composite = [
    basic
];
let sched = {
    schedules: composite
};
later.date.localTime();
let t = later.setInterval(function () {
    let date = new Date();
    let weekDay = date.getDay();
    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    if (weekDay === 5) { // 如果等于5 表示周五
        let newDate = new Date(`${year}-${month}-${day}`);
        let dayStampTime = 86400000;
        let endStampTime = newDate.getTime();
        let startStampTime = newDate.getTime() - (4 * dayStampTime);
        let endStampTimeText = fmtDate(endStampTime);
        let startStampTimeText = fmtDate(startStampTime);
        Week.create({
            startTime: startStampTime,
            endTime: endStampTime,
            startTimeText: startStampTimeText,
            endTimeText: endStampTimeText
        });
        console.log('添加成功');
    }
}, sched);

function fmtDate(obj) {
    var date = new Date(obj);
    var y = 1900 + date.getYear();
    var m = "0" + (date.getMonth() + 1);
    var d = "0" + date.getDate();
    return y + "-" + m.substring(m.length - 2, m.length) + "-" + d.substring(d.length - 2, d.length);
}