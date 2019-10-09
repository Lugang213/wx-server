const {Sequelize,Model} = require('sequelize')
const util = require('util')
const axios = require('axios')
const {sequelize} = require('../../core/db')
const {Favor} = require('../models/favor')

class Book extends Model{
    constructor(id){
        super()
        this.id = id
    }
    async detail(){
        const url = util.format(global.config.yushu.detailUrl, this.id)
        const detail = await axios.get(url)
        return detail.data
    }

    // 图书搜索
    static async searchFromYuShu(q, start,count,summary=1){
        const url = util.format(global.config.yushu.keywordUrl,encodeURI(q),start,count,summary)
        const result = await axios.get(url)
        return result.data
    }
    // 我喜欢书籍数量
    static async getMyFavorBookCount(uid) {
        const count = await Favor.count({where: {type: 400, uid}})
        return count
    }
    // 


}

Book.init({
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums:{
        type: Sequelize.INTEGER,
        default: 0
    }
},{
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}