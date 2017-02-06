/*
 * Author:  Kain<kain@foowala.com>
 * Module description: 桌号
 */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const desk_Schema = new Schema({
    number: Number, // 桌号
    status: { type: Number, min: 0, max: 4, default: 0 }, // 0：未开桌，1：开桌普通状态，2：打单未收费, 3:分桌子, 4:并桌
    store_id: Schema.Types.ObjectId,
    floor: { type: Number, default: 1 },
    size: { type: Number, min: 0, default: 4 },
    CreateTime: { type: Date, default: Date.now }
});

desk_Schema.pre('save', (next) => {
    next();
});

desk_Schema.statics = {
    findById(_id, callback) {
        this.findOne({
            _id: _id
        }, (err, desk) => {
            callback(desk);
        });
    },

    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('find null!');
            })
    },

    updateStatus(_id, status) {
        return this.update({ _id }, { status })
            .exec();
    }
}

export default mongoose.model('desk', desk_Schema, 'desk');
