/*
 * Module description: 用户的答案 answer
 */

const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    answer_Schema = new Schema({
        paper_id: {type: Schema.Types.ObjectId},
        topic_id: {type: Schema.Types.ObjectId},
        content: String,
        timestamp: {type: Number, default: new Date().getTime()},
        CreateTime: { type: Date, default: Date.now }
    })

user_answer_Schema.statics = {
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

mongoose.model('user_answer', user_answer_Schema, 'user_answer');
