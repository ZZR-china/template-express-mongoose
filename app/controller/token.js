'use strict';
var router = require('express').Router();

router.route('/index')
    .get((req, res) => {
        res.send("tickets")
    })

module.exports = function(app) {
    app.use('/', router)
};
