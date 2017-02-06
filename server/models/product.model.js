/*
 * Author:  Magic<magic@foowala.com>
 * Module description: floor
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const product_Schema = new Schema({
    name: String,
    en_name: String,
    menu_id: Schema.Types.ObjectId,
    price: { type: Number, default: 0, min: 0, set: v => Number(v).toFixed(2) }, // 单价
    unit: { type: String, default: '份' }, // 单位
    lab: [String], // 快速备注标签
    img_url: String, // 图片地址
    order: { type: Number, default: 0 }, // 排序
    delete: { type: Boolean, default: false }, //删除状态
    CreateTime: { type: Date, default: Date.now }
});

product_Schema.pre('save', next => {
    next();
});

product_Schema.statics = {
    findById(_id, callback) {
        this.findOne({
            _id: _id
        }, (err, product) => {
            callback(product);
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

export default mongoose.model('product', product_Schema, 'product');
