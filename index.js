import util from 'util';
import config from './config/env';
import app from './config/express';
import http from 'http';

const server = http.createServer(app);
const PORT = config.port;

server.listen(PORT, function() {
    console.log('Node app is running, port:', PORT);
    // 注册全局未捕获异常处理器
    process.on('uncaughtException', function(err) {
        console.error("Caught exception:", err.stack);
    });
    process.on('unhandledRejection', function(reason, p) {
        console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason.stack);
    });
});
