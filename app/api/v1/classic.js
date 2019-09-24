const Router = require('koa-router')
const {ClassicValidator} = require('../../validators/validator')
const {Auth} = require('../../../middlewares/auth')
const {Flow} = require('../../models/flow')
const {Art} = require('../../models/art')
const {Favor} = require('../../models/favor')

const router = new Router({
    prefix: '/v1/classic'
})

// 获取最新一期期刊
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order:[
            ['index','DESC']
        ]
    })
    const art = await Art.getData(flow.art_id,flow.type)
    // art.index = flow.index
    art.setDataValue('index',flow.index)
    ctx.body = art
})

// 获取某一期的点赞信息
router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const art = await Art.getData(id, type)

    if(!art){throw new global.errs.NotFound()}
    const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
    ctx.body = {fav_nums:art.fav_nums,like_status:like}

})
// 获取喜欢的期刊
router.get('/favor', new Auth().m, async ctx => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})
// 获取某一期的详细信息
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const art = await Art.getData(id, type)
    if (!art) {throw new global.errs.NotFound()}
    const like = await Favor.userLikeIt(id, type, ctx.auth.uid)
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }

})
module.exports = router