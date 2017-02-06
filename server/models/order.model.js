/*
 * Author:  Kain<kain@foowala.com>
 * Module description: order model
 */

import _time from '../helpers/time.helper';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const order_Schema = new Schema({
    _id: String,
    store_id: Schema.Types.ObjectId,
    desk_number: [Number],
    desk_id: [Schema.Types.ObjectId],
    people_number: Number,
    total: { type: Number, default: 0, min: 0 },
    staff_id: Schema.Types.ObjectId,
    staff_nickname: String,
    job_number: String,
    remark: { type: String, default: '' },
    status: { type: Number, default: 0 }, // 订单状态，0: 待付款, 2: 取消，3，已完成,
    pay: { type: Number, default: 0 }, // 付款方式
    discount: { type: Number, min: 0, max: 100, default: 100 }, // 折扣
    actual_payment: { type: Number, default: 0, min: 0 }, // 应该收款
    real_payment: { type: Number, default: 0, min: 0 }, // 客户实际给的钱
    clear_time: {
        format_time: String,
        time: Date
    },
    create_time: {
        date: { type: Date, default: Date.now }
    }
});

/**
 * Statics
 */
order_Schema.statics = {
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('find null!');
            })
    },

    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    }
};

export default mongoose.model('order', order_Schema, 'order');
