/*
 * Author:  Magic<magic@foowala.com>
 * Module description: 标签 label
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const label_Schema = new Schema({
        store_id: Schema.Types.ObjectId, // 所属门店
        label: String,
        CreateTime: { type: Date, default: Date.now }
    });

label_Schema.pre('save', (next) => {
    next();
});

label_Schema.statics = {
    findById(_id, callback) {
        this.findOne({
            _id: _id
        }, (err, label) => {
            callback(label);
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

export default mongoose.model('label', label_Schema, 'label');
