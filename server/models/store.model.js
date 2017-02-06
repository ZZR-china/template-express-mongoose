/*
 * Author:  Magic<magic@foowala.com>
 * Module description: floor
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const store_Schema = new Schema({
        name: String,
        type: String,
        register_qr: String,
        register_info_id: {type: Schema.Types.ObjectId}, //注册人信息
        admin_qr: String,
        address: {
            province: String,
            city: String,
            district: String,
            address: String
        },
        principal:String,//负责人
        principal_phone:Number,
        principal_email:String,
        CreateTime: { type: Date, default: Date.now }
    });

store_Schema.pre('save', (next) => {
    next();
});

store_Schema.statics = {
    findById(_id, callback) {
        this.findOne({
            _id: _id
        }, (err, test) => {
            callback(test);
        });
    },
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('no such store');
            })
    }
}


export default mongoose.model('store', store_Schema, 'store');
