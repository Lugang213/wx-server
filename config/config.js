module.exports = {
    // prod
    environment: 'dev',

    database: {
        dbName: 'test',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '123456'
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60
    },
    wx:{
        appId: 'wx8693908fb1b4a1c7',
        appSecret: 'b0ef60b6836b346c089f7f7e15f437ba',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrl: 'https://www.apiopen.top/novelApi?bid%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host: 'http://localhost:3000/'
}