const util = require('util')
class WXManager{
    static async codeToken(code){
        const url = util.format(
            global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)
        const result = await axios.get(url)
    }
}