/*
 * Module description: paper 试卷
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const paper_Schema = new Schema({
    topic: [{ type: Schema.Types.ObjectId }], //试题
    difficulty: { type: Number, default: 1 }, //试卷总难度
    score: { type: Number, default: 1 }, //试卷总分数
    timestamp: { type: Number, default: new Date().getTime() },
    CreateTime: { type: Date, default: Date.now }
})

paper_Schema.statics = {
    get(data) {
        return this.findOne(data)
            .then(result => {
                if (result) {
                    return result;
                }
                return Promise.reject('no such paper');
            })
    }
}

mongoose.model('paper', paper_Schema, 'paper');
