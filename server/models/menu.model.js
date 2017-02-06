/*
 * Author:  Magic<magic@foowala.com>
 * Module description: floor
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const menu_Schema = new Schema({
    store_id: Schema.Types.ObjectId,
    name: String,
    printer_num: { type: Number, required: true },
    order: { type: Number, default: 0 },
    labels: [Schema.Types.ObjectId],
    delete: { type: Boolean, default: false },
    CreateTime: { type: Date, default: Date.now }
});

menu_Schema.pre('save', next => {
    next();
});

menu_Schema.statics = {
    findById(_id, callback) {
        this.findOne({
            _id: _id
        }, (err, menu) => {
            callback(menu);
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

export default mongoose.model('menu', menu_Schema, 'menu');
