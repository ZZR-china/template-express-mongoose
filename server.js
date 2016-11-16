const Boom = require("boom");
const HAPI = require("hapi");
const HAPIWebSocket = require("hapi-plugin-websocket");
const plugRoutes = require("hapi-router");
const inert = require("inert");
const good = require('good');
const goodConsole = require('good-console');

const server = new HAPI.Server();

server.connection({ address: "127.0.0.1", port: 1234 });

server.path(__dirname + './app/public/');

server.register([
        HAPIWebSocket,
        inert, {
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
                    }, {
                        module: 'good-file',
                        args: ['./logs/access.log']
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
        }, {
            register: plugRoutes,
            options: {
                routes: 'app/route/*.js'
            }
        }
    ],
    (err) => {
        server.start((err) => {
            if (err) {
                throw err;
            }
            console.log(`Server running at: ${server.info.uri}`);
        });
    })
