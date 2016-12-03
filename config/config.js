var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

var config = {
  root: rootPath,
  cookieSecret: 'blog',
  companyUr   : "http://wechatme.leanapp.cn",
  port        : 3000,
  maxOrderTime: 1080,
  app      : {
      name: 'foowala-test'
  },
  localmongo:{
      db: 'mongodb://127.0.0.1:27017/foowala'
  },
  main     : {
    languagePath: rootPath + '/language/'
  },
  cookie   : {
    secret     : 'foowala',
    sessionName: 'session'
  },
  wechat_api:{
    token_url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
    user_url: 'https://api.weixin.qq.com/cgi-bin/user/info?access_token='
  },
  pos:{
    url: 'http://3s.dkys.org:24719'
  }
};

module.exports = config