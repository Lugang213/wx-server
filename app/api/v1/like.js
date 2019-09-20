const Router = require('koa-router')
const {LikeValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const {Favor} = require('../../models/favor')
const success = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/like'
})

router.post('/', new Auth().m, async (ctx,next) => {
    // id:'art_id' 更名
    const v = await new LikeValidator().validate(ctx,{id:'art_id'})
    console.log(await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid))
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid)
    success()
})

module.exports = router