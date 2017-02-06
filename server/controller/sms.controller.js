import AV from 'leanengine';
import co from 'co';

// AV = Promise.promisifyAll(AV);

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象

function requestSmsCode(req, res, next) {
    const mobilePhoneNumber = req.params.mobilePhoneNumber;
    AV.Cloud.requestSmsCode(mobilePhoneNumber)
            .then(function(success){
                res.sendStatus(200)
            }, function(err) {
                console.error(err);
                next(err);
            })
}


function verifyMobilePhone(req, res, next) {
    const smsCode = Number(req.body.smsCode);
    AV.User.verifyMobilePhone(smsCode).then(function() {
        res.sendStatus(200)
    }, function(err) {
        next(err)
    });
}

export default {requestSmsCode, verifyMobilePhone}