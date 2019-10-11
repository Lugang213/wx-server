const {Sequelize, Model,Op} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Art} = require('./art')
// 点赞
class Favor extends Model{
    // 点赞
    static async like(art_id, type, uid){
        // 添加记录 修改classic->fav_nums
        const favor = await Favor.findOne({where:{art_id,type,uid}})
        if (favor) {throw new global.errs.LikeError()}
        return sequelize.transaction(async t => {
            await Favor.create({art_id,type,uid}, {transaction: t})
            const art = await Art.getData(art_id,type,false)
            await art.increment('fav_nums', {by: 1,transaction: t
            })
        })
    }
    // 取消点赞
    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {art_id,type,uid}
        })
        if (!favor) {throw new global.errs.DisLikeError()}
        return sequelize.transaction(async t => {
            // force true 物理删除
            await favor.destroy({force:true,transaction: t})
            const art = await Art.getData(art_id, type,false)
            await art.decrement('fav_nums', {by: 1,transaction: t})
        })
    }
    // 获取点赞
    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {uid,art_id,type}
        })
        return favor ? true : false
    }
    // 喜欢的期刊
    static async getMyClassicFavors(uid){
        // type:{[Op.not]:400} ===>type!=400
        const arts = await Favor.findAll({where:{uid,type:{[Op.not]:400}}})
        if(!arts){throw new global.errs.NotFound()}
        return await Art.getList(arts)
    }
    // 书籍点赞情况
    static async getBookFavor(uid, bookID){
        const favorNums = await Favor.count({where:{art_id:bookID,type:400}})
        const myFavor = await Favor.findOne({where: {art_id:bookID,uid,type:400}})
        return {fav_nums: favorNums,like_status: myFavor?1:0}
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}