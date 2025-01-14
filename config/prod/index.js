module.exports = {
  ip: process.env.ip,
  port: process.env.PORT || 8899, // server端口
  routerBaseApi: '/v1', // 接口基础路径
  LIMIT: 16,
  githubOAth: {
    url: 'https://github.com/login/oauth/access_token',
    client_id: '934da77f4bfa10880429',
    client_secret: '3b847448acee5a9ca82371608498ec7ca28cb29b',
    redirect_uri: 'https://mangoya.cn',
    redirect_admin: 'https://mangoya.cn/admin2.0/',
    userUrl: 'https://api.github.com/user',
    login_url: 'https://mangoya.cn/v1/user/login'
  },
  jwt: {
    tokenName: 'aimee-blog-token',
    tokenSecret: '123456',
    expiresIn: '240h' // 10天有效期
  },
  mongo: {
    host: '127.0.0.1',
    database: 'aimeeblog',
    port: 27017,
    user: 'aimee',
    password: 'small_root',
    rs_name: ''
  },
  baseUploadUrl: 'https://mangoya.cn/v1/resources/'
};
