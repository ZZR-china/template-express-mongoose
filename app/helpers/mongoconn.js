var mongoose = require('mongoose');

if (process.env.online) {
    mongoose.connect(process.env.mongo, { server: { socketOptions: { keepAlive: 1 } } });
} else {
    var setting = require('../../config/secret');
    var localurl = setting.mongolab.db;
    mongoose.connect(localurl, { server: { socketOptions: { keepAlive: 1 } } });
}

mongoose.set('debug', true);

//connect mongoose
var db = mongoose.connection;
db.on('error', function() {
    console.log('mongo open error')
})
db.once('open', function() {
    console.log('mongo opened');
})

module.exports = db;
