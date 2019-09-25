const Router = require('koa-router')
const {HotBook} = require('../../models/hot-book')
const {PositiveIntegerValidator} = require('../../validators/validator')
const {Book} = require('../../models/book')

const router = new Router({
    prefix: '/v1/book'
})
// 书籍
router.get('/hot_list', async ctx => {
    const books = await HotBook.getAll()
    ctx.body = books
})

router.get('/:id/detail', async ctx => {
    const v =await new PositiveIntegerValidator().validate(ctx)
    const book = new Book()
    ctx.body = await book.detail(v.get('path.id'))
})

module.exports = router