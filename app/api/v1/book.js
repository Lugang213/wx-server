const Router = require('koa-router')
const {HotBook} = require('../../models/hot-book')
const {
    PositiveIntegerValidator,
    SearchValidator
} = require('../../validators/validator')
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
// 图书搜索
router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})
// 喜欢的图书
router.get('/search', async ctx => {
   
})
// 图书点赞情况
router.get('/:book_id/favor', async ctx => {
   
})


module.exports = router