module.exports = exports = [{
    method: "GET",
    path: "/",
    handler: (req, reply) => {
        reply('hello world');
    }
}, {
    method: 'GET',
    path: '/hello',
    handler: (req, reply) => {
        reply.file('./app/public/hello.html');
        // reply.file('hello.html');
    }
}];
