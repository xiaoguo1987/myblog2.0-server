module.exports = {
  ip: process.env.ip,
  port: process.env.PORT || 8899, // server端口
  routerBaseApi: '/v1', // 接口基础路径
  LIMIT: 16,
  githubOAth: {
    url: 'https://github.com/login/oauth/access_token',
    client_id: '934da77f4bfa10880429',
    client_secret: '3b847448acee5a9ca82371608498ec7ca28cb29b',
    redirect_uri: 'http://localhost:8087',
    redirect_admin: 'http://localhost:8088/',
    userUrl: 'https://api.github.com/user'
  },
  jwt: {
    tokenName: 'aimee-blog-token',
    tokenSecret: '123456',
    expiresIn: '240h' // 10天有效期
  },
  mongo: {
    host: '127.0.0.1',
    database: 'aimeeTest2',
    port: 27017,
    user: '',
    password: '',
    rs_name: ''
  },
  baseUploadUrl: 'http://localhost:8899/resources/'
};
