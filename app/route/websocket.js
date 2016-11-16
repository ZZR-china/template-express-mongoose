module.exports = exports = [{
        method: "POST",
        path: "/foo",
        config: {
            // payload: { output: "data", parse: true, allow: "application/json" },
            payload: { output: "data", parse: true },
        },
        handler: (request, reply) => {
            console.log('asd')
            reply({ at: "foo", seen: request.payload })
        }
    },
    /*  combined REST/WebSocket route  */
    {
        method: "POST",
        path: "/bar",
        config: {
            // payload: { output: "data", parse: true, allow: "application/json" },
            payload: { output: "data", parse: true },
            plugins: { websocket: true }
        },
        handler: (request, reply) => {
            if (request.websocket())
                reply({ at: "bar", type: "websocket", seen: request.payload })
            else
                reply({ at: "bar", type: "rest", seen: request.payload })
        }
    },
    /*  exclusive WebSocket route  */
    {
        method: "POST",
        path: "/baz",
        config: {
            plugins: { websocket: { only: true } }
        },
        handler: (request, reply) => {
            if (request.websocket())
                reply({ at: "baz", type: "websocket", seen: request.payload })
            else
                reply({ at: "baz", type: "rest", seen: request.payload })
        }
    },
    /*  full-featured exclusive WebSocket route  */
    {
        method: "POST",
        path: "/quux",
        config: {
            plugins: {
                websocket: {
                    only: true,
                    create: (wss) => {
                        /* no-op */
                    },
                    connect: (wss, ws) => {
                        ws.send(JSON.stringify({ cmd: "WELCOME" }))
                        this.to = setInterval(() => {
                            ws.send(JSON.stringify({ cmd: "PING" }))
                        }, 20000)
                    },
                    disconnect: (wss, ws) => {
                        if (this.to !== null) {
                            clearTimeout(this.to)
                            this.to = null
                        }
                    }
                }
            }
        },
        handler: (request, reply) => {
            if (typeof request.payload.cmd !== "string")
                return reply(Boom.badRequest("invalid request"))
            if (request.payload.cmd === "PING")
                return reply({ result: "PONG" })
            else if (request.payload.cmd === "AWAKE-ALL") {
                var wss = request.websocket().wss
                wss.clients.forEach((ws) => {
                    ws.send(JSON.stringify({ cmd: "AWAKE" }))
                })
                return reply().code(204)
            } else
                return reply(Boom.badRequest("unknown command"))
        }
    }, {
        method: "POST",
        path: "/desks",
        config: {
            plugins: {
                websocket: {
                    only: true,
                    create: (wss) => {
                        /* no-op */
                    },
                    connect: (wss, ws) => {
                        ws.send(JSON.stringify({ cmd: "WELCOME" }))
                    },
                    disconnect: (wss, ws) => {}
                }
            }
        },
        handler: (request, reply) => {
            if (request.payload.status) {
                var wss = request.websocket().ws
                wss.clients.forEach((ws) => {
                    ws.send(JSON.stringify({ status: true, index: request.payload.index }))
                })
                return reply().code(204)
            } else
                return reply(Boom.badRequest("unknown command"))
        }
    }
]
