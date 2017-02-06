/*
 * Author:  Magic<magic@foowala.com>
 * Module description: floor
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const report_Schema = new Schema({
    store_id: { type: Schema.Types.ObjectId, required: true }, //store id
    report_id: String,
    staff_id: Schema.Types.ObjectId, //结算人员staff_id
    name: String, //结算人员姓名（默认为staff nickname）
    report_time: Date, //结算时间
    CreateTime: { type: Date, default: Date.now },
    open_time: { type: Date, default: Date.now }, //开店时间--shanghai
    format_time: {
        year: Number,
        month: Number,
        day: Number,
        full: String
    },
    close_time: Date, //关店时间
    order_count: Number, //账单数量
    order_money: [{
        type: Number,
        money: { type: Number, min: 0, set: v => Number(v).toFixed(2) }
    }], //订单收款--方式&&金额
    re_report_people: { type: Number, default: 0 }, //反结人数
    re_report_order_count: { type: Number, default: 0 }, //反结订单数量
    re_report_order: [{
        order_id: String,
        desk_number: Number,
        before_take: { type: Number, min: 0, set: v => Number(v).toFixed(2) }, //反结前应收
        now_take: { type: Number, min: 0, set: v => Number(v).toFixed(2) } //反结后应收
    }], //反结信息
    revoke: [{
        order_id: String,
        desk_number: Number,
        total: { type: Number, min: 0, set: v => Number(v).toFixed(2) } //点菜累计金额
    }], //撤单信息
    zero_order: [{
        order_id: String,
        desk_number: Number,
        total: { type: Number, min: 0, set: v => Number(v).toFixed(2) } //点菜累计金额
    }], //零元结账信息
    undone_order: [{
        order_id: String,
        open_time: Date, //开台时间
        desk_number: Number,
        actual_payment: { type: Number, min: 0, set: v => Number(v).toFixed(2) } //点菜累计金额
    }], //未结账单信息
    order_people: Number, //总人数
    total_money: { type: Number, default: 0, min: 0, set: v => Number(v).toFixed(2) }, // 总盈利
    food_back: [{
        reason: String,
        number: Number, //退菜数量
        money: { type: Number, min: 0, set: v => Number(v).toFixed(2) } //退菜金额
    }],
    gift_food: [{
        reason: String,
        number: Number, //赠菜数量
        money: { type: Number, min: 0, set: v => Number(v).toFixed(2) } //退菜金额
    }],
    status: { type: Number, default: 0 }, // 0 营业中，1已经日结并关门
    //未结账单
    open_account: String,
    //抽大钞清算
    payment: String,
    //订单清算
    clearing: String,
    //抬头
    title: String,
    //取消的订单
    cancel_order: String,
    //所有合计信息
    total: String
});

report_Schema.pre('save', (next) => {
    next();
});

report_Schema.statics = {
    findById: (_id, callback) => {
        this.findOne({
            _id: _id
        }, (err, report) => {
            callback(report);
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

export default mongoose.model('report', report_Schema, 'report');
