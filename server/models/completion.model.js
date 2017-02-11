/*
 * Author:  shenchong<915280730@qq.com>
 * Module description: completion question 填空题
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    completion_Schema = new Schema({
        content: String,
        answer: [{
            number: Number,
            detail: String
        }],//正确答案
        CreateTime: { type: Date, default: Date.now }
    })

completion_Schema.statics = {
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('no such order');
            })
    }
}

mongoose.model('completion', completion_Schema, 'completion');
