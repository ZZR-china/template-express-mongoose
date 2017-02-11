/*
 * Author:  shenchong<915280730@qq.com>
 * Module description: choice question 选择题
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    choice_Schema = new Schema({
        content: [{
            number: String,
            detail: String
        }],
        answer: {type: String}, //正确答案
        CreateTime: { type: Date, default: Date.now }
    })

choice_Schema.statics = {
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

mongoose.model('choice', choice_Schema, 'choice');
