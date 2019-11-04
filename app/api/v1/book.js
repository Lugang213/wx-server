const Router = require('koa-router')
const {HotBook} = require('../../models/hot-book')
const {PositiveIntegerValidator,SearchValidator,AddShortCommentValidator} = require('../../validators/validator')
const {Book} = require('../../models/book')
const {Favor} = require('../../models/favor')
const {Auth} = require('../../../middlewares/auth')
const success = require('../../lib/helper')
const {Comment} = require('../../models/book-comment')

const router = new Router({
    prefix: '/v1/book'
})
// 书籍
router.get('/hot_list', async ctx => {
    const books = await HotBook.getAll()
    ctx.body = books
})
// 书籍详情
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
router.get('/favor/count',new Auth().m, async ctx => {
   const count = await Book.getMyFavorBookCount(ctx.auth.uid)
   ctx.body = count
})
// 图书点赞情况
router.get('/:book_id/favor',new Auth().m, async ctx => {
   const v = await new PositiveIntegerValidator().validate(ctx,{id:'book_id'})
   const favor = await Favor.getBookFavor(ctx.auth.uid,v.get('path.book_id'))
   ctx.body = favor
})
// 书籍短评
router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx, {
        id: 'book_id'
    })
    Comment.addComment(v.get('body.book_id'), v.get('body.content'))
    success() 
})
// 获取短评
router.get('/:book_id/short_comment', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {id: 'book_id'})
    const book_id = v.get('path.book_id')
    const comments = await Comment.getComments(book_id)
    ctx.body = {comments,book_id}
})


module.exports = router