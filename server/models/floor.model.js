/*
 * Author:  Magic<magic@foowala.com>
 * Module description: floor
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const floor_Schema = new Schema({
    store_id: Schema.Types.ObjectId,
    number: { type: Number, default: 1 },
    CreateTime: { type: Date, default: Date.now }
});

floor_Schema.pre('save', (next) => {
    next();
});

floor_Schema.statics = {
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
    }
}

export default mongoose.model('floor', floor_Schema, 'floor');
