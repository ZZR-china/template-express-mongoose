export default {
    env: 'development',
    jwtSecret: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',
    port: 9027,
    labels:'development',
    mongo: {
        // db: 'mongodb://10.111.110.144:27017/foowalapos',
        db: 'mongodb://localhost:27017/foowalapos',
        debug:true
    },
    wechat_api: {
        custom: 'https://api.weixin.qq.com/cgi-bin/message/custom/send?access_token='
    },
    wechat: {
        appID: 'wxd62a2af068f0693a',
        appsecret: 'c40eb5ab81add3be6502f6b7f7d1d5dd',
        accesstoken: 'uachTM8WOZlIpvZrg8LbMmxl2f0VSm1g_UYfABHKQANOFD6RfmDSXLcO0iIlGXq6C4bAG71vBtoyqG0k1aZyAFiSdk_KAbtPGUV1sRLTWz3-7SdkMl86nLGle0Bp3fUkQJTeAEALEO'
    },
    qr: {
        token: 'http://localhost:3000/accesstoken',
        qrurl: 'https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=',
        ticketurl: 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=',
        userurl: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='
    },
    open_id: {
        kf: "oz-PQwkRBA8qkZzXLXnJsc_BM9iY"
    }
};
