const Router = require('koa-router')
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
// const {HttpException, ParameterException} = require('../../../core/http-exception')
const router = new Router({
    prefix: '/v1/classic'
})


router.get('/latest', new Auth(8).m, async (ctx, next) => {
  
    ctx.body = ctx.auth.uid
    
})

module.exports = router