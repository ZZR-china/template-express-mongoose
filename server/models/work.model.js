/*
 * Author:  Magic<magic@foowala.com>
 * Module description: floor
 */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const work_Schema = new Schema({
    store_id: Schema.Types.ObjectId, //store id
    staff_id: Schema.Types.ObjectId, //staff id
    report_id: Schema.Types.ObjectId, //report id
    nickname: String, // 员工 nick name
    job_number: String, //staff job number
    order_ids: [String], //订单号
    bill_ids: [Schema.Types.ObjectId], //bill id
    total: { type: Number, min: 0, set: v => Number(v).toFixed(2) }, // 总盈利
    order_total: { type: Number, min: 0, set: v => Number(v).toFixed(2) },
    startTime: { type: Date, default: Date.now }, // 开始上班时间
    format_time: {
        year: Number,
        month: Number,
        day: Number,
        full: String
    },
    endTime: Date // 下班时间
})

work_Schema.statics = {
    get(data, project, opt) {
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
              .sort({CreateTime: -1})
              .skip(skip)
              .limit(limit)
    }
}

export default mongoose.model('work', work_Schema, 'work');
