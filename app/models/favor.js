const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Art} = require('./art')
// 点赞
class Favor extends Model{
    // 点赞
    static async like(art_id, type, uid){
        // 添加记录 修改classic->fav_nums
 console.log(art_id, type, uid)
        // const favor = await Favor.findOne({where:{art_id,type,uid}})
       
        // if (favor) {
        //     throw new global.errs.LikeError()
        // }
        // return sequelize.transaction(async t => {
        //     await Favor.create({
        //         art_id,
        //         type,
        //         uid 
        //     }, { transaction: t})
        //     const art = await Art.getData(art_id,type)
        //     await art.increment('fav_nums', {
        //         by: 1,
        //         transaction: t
        //     })
        // })
    }
    // 取消点赞
    static async like(art_id, type, uid) {
        
    }
}
Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER,
},{
  sequelize,
  tableName: 'favor'
})

module.exports = {
    Favor
}