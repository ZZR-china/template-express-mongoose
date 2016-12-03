'use strict';
var express = require('express'),
    timeout = require('connect-timeout'),
    compression = require('compression'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    AV = require('leanengine'),
    glob = require('glob'),
    http = require('http'),
    async = require('async');

var models,
    controllers;

module.exports = function(app, config) {
    app.use(express.static(config.root + '/app/view/static'));
    app.use(timeout('15s'));
    app.use(AV.express());
    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());

    app.use(function(req, res, next) {
        res.set({
            'Access-Control-Allow-Origin': '*',
        });
        next();
    });

    // load controller
    controllers = glob.sync(config.root + '/app/controller/*.js');
    async.each(controllers, function(controller, callback) {
        console.log('Loading Router：', controller);
        require(controller)(app);
        callback();
    }, function(err) {
        if (err) {
            console.log('A file failed to process.');
        }
    })

    app.use(function(req, res, next) {
        // 如果任何一个路由都没有返回响应，则抛出一个 404 异常给后续的异常处理器
        if (!res.headersSent) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }
    });

    // error handlers
    app.use(function(err, req, res, next) { // jshint ignore:line
        if (req.timedout && req.headers.upgrade === 'websocket') {
            // 忽略 websocket 的超时
            return;
        }
        var statusCode = err.status || 500;
        if (statusCode === 500) {
            console.error(err.stack || err);
        }
        if (req.timedout) {
            console.error('请求超时: url=%s, timeout=%d, 请确认方法执行耗时很长，或没有正确的 response 回调。', req.originalUrl, err.timeout);
        }
        res.status(statusCode);
        // 默认不输出异常详情
        var error = {}
        if (app.get('env') === 'development') {
            // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
            error = err;
        }
        res.send({
            message: err.message,
            error: error
        });
    });
};
