export default {
    env: 'production',
    jwtSecret: process.env.jwtSecret || '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
    port: 9026,
    labels:'production',
    wechat_api: {
        custom: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='
    },
    mongo: {
        db: 'mongodb://ec2-54-222-232-3.cn-north-1.compute.amazonaws.com.cn:27017,ec2-54-222-167-240.cn-north-1.compute.amazonaws.com.cn:27017/foowalapos'
    },
    qr: {
        token: 'http://test.foowala.com/dashboard/token',
        qrurl: 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=',
        ticketurl: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=',
        userurl: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='
    },
    open_id: {
        kf: "oZwgxtxEtGx3_9cIKO4UxDiKVvCU",
        kf_zhengshi: "oZwgxtxEtGx3_9cIKO4UxDiKVvCU"
    }
};
