export default [{
    method: 'GET',
    path: '/desk',
    config: {
        handler: function(req, reply) {
            console.log(0)
        	return reply("desk 1")
        },
        description: '<p>根据桌子_id获取正在进行的订单信息</p>'
    }
}];
