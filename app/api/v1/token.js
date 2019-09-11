const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const router = new Router({
    prefix: '/v1/token'
})

// 注册
router.post('/', async (ctx) => {
    const v = await new TokenValidator().validate(ctx)
    
    await User.create(user)
    // throw new global.errs.Success()
    success()
})

module.exports = router
