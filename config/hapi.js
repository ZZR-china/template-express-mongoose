/**
 * Author: Magic·Zhang <magic@foowala.com>
 * Module description: 启动
 */
import Hapi from 'hapi';
import http from 'http';
import path from 'path';
import good from 'good';
import goodConsole from 'good-console';
import vision from 'vision';
import inert from 'inert';
import lout from 'lout';
import pmx from 'pmx';
import hapi_auth_jwt2 from 'hapi-auth-jwt2';
import config from './env';

const server = new Hapi.Server();

pmx.init({
    http: true,
    ignore_routes: [/notFound/],
    errors: true,
    custom_probes: true,
    network: true,
    ports: true
});

function validate1 (decoded, request, callback) {
    return callback(null, true);
};

const http_server = http.createServer();
http_server.listen(config.port);
server.connection({
    listener: http_server,
    labels: config.labels,
    routes: { cors: true }
});

// server.register(hapi_auth_jwt2, (err) => {
//     if (err) {console.log(err);}
//     const secret = config.jwtSecret;
//     server.auth.strategy('jwt', 'jwt', {
//         key: secret,
//         validateFunc: validate1,
//         verifyOptions: { algorithms: ['HS256'] }
//     });
//     server.auth.default('jwt');
// });

server.ext({
    type: 'onRequest',
    method: function (request, reply) {
        return reply.continue();
    }
});

server.register([
    inert, {
        register: vision,
        options: {
            encoding: 'utf-8'
        }
    }, {
        register: lout,
        options: {
            endpoint: '/doc'
        }
    }, {
        register: good,
        options: {
            ops: {
                interval: 1000
            },
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        log: '*',
                        response: '*'
                    }]
                }, {
                    module: 'good-console'
                }, 'stdout'],
                file: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        ops: '*'
                    }]
                }, {
                    module: 'good-squeeze',
                    name: 'SafeJson'
                }],
                http: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        error: '*'
                    }]
                }, {
                    module: 'good-http',
                    args: ['http://prod.logs:3000', {
                        wreck: {
                            headers: {
                                'x-api-key': 12345
                            }
                        }
                    }]
                }]
            }
        }
    }
], (err) => {
    if (err) {console.log(err);}
});
export default server;