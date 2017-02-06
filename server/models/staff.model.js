/*
 * Author:  Magic<magic@foowala.com>
 * Module description: floor
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const staff_Schema   = new Schema({
        store_id      : Schema.Types.ObjectId,
        name            : String,
        nickname      : String,   // 微信上的nickname
        open_id     : String,   // 微信open_id
        wx_info     : String,       //微信上信息
        job_number  : String,       // 工号
        password      : String,     // 登陆密码
        key         : String,       // 秘钥
        pin_number  : String,       // 管理员授权码
        // permission  : [String],//权限
        is_admin      : {type: Boolean, default: false},
        CreateTime  : {type: Date, default: Date.now}
    });

staff_Schema.pre('save', (next) => {
    next();
});

staff_Schema.statics = {
    findById(_id, callback) {
        this.findOne({
            _id: _id
        }, (err, staff) => {
            callback(staff);
        });
    },
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('no such staff');
            })
    }
}

export default mongoose.model('staff', staff_Schema, 'staff');
