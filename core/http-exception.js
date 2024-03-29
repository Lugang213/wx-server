class HttpException extends Error{
    constructor (msg='服务器异常',errorCode=10000,code=400) {
        super()
        this.errorCode = errorCode
        this.code = code
        this.msg = msg
    }
}

class ParameterException extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 400
        this.msg = msg || '参数错误'
        this.errorCode = errorCode || 10000
    }
}

class Success extends HttpException{
    constructor(msg, errorCode){
        super()
        this.code = 201
        this.msg = msg || 'OK'
        this.errorCode = errorCode || 0
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 404
        this.msg = msg || '资源未找到'
        this.errorCode = errorCode || 1000
    }
}

class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 401
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 1004
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 403
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 1006
    }
}

// 点赞
class LikeError extends HttpException{
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '已经点过赞'
        this.errorCode = errorCode || 60001
    }
}
class DisLikeError extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.code = 400
        this.msg = msg || '已取消点赞'
        this.errorCode = errorCode || 60002
    }
}


module.exports = { 
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed,
    Forbbiden,
    LikeError,
    DisLikeError
}