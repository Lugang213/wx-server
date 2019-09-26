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
    const flow = await Flow.findOne({order:[['index','DESC']]})
    const art = await Art.getData(flow.art_id,flow.type)
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid)
    // art.index = flow.index
    art.setDataValue('index', flow.index)
    art.setDataValue('like_status', likeLatest)
    ctx.body = art
})
// 获取某一期期刊的点赞信息
router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    ctx.body = {fav_nums:art.fav_nums,like_status:like}

})
// 获取喜欢的期刊
router.get('/favor', new Auth().m, async ctx => {
    const uid = ctx.auth.uid
    ctx.body = await Favor.getMyClassicFavors(uid)
})
// 获取某一期期刊的详细信息
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})

module.exports = router