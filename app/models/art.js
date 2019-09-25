const {flatten} = require('lodash')
const {Op} = require('sequelize')
const{Movie,Music,Sentence} = require('../models/classic')

class Art{
    constructor(art_id, type){
        this.art_id = art_id,
        this.type = type
    }
    // get detail 获取某一期期刊的详细信息
    async getDetail(uid){
         const art = await Art.getData(this.art_id, this.type)
         if (!art) {
             throw new global.errs.NotFound()
         }
         const { Favor} = require('./favor')
         const like = await Favor.userLikeIt(this.art_id, this.type, uid)
         return {art,like_status:like}
    }
    // artInfoList 在favor.js中查询到的数组
    static async getList(artInfoList){
        const artInfoObj = {
            100:[], // type=100的 ID
            200:[],
            300:[]
        }
        // 数组循环用of 
        for(let artInfo of artInfoList){
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) { continue}
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }          
        // 二维数组 展平——>一维数组 
        return flatten(arts)
        
    }
    // 私有方法_
    static async _getListByType(ids, type){
        let arts = []
        const finder = {
            where: {
                id: {[Op.in]: ids}
            }
        }
        // const scope = 'bh'
        switch (type) {
            case 100:
                arts = await Movie.findAll(finder)
                break
            case 200:
                arts = await Music.findAll(finder)
                break
            case 300:
                arts = await Sentence.findAll(finder)
                break
            case 400:
                arts = await Book.findAll(finder)
            break
            default:
                break
        }
        return arts
    }
    // 获取某一期期刊的点赞信息
    static async getData(art_id,type){
        let art = null
        const finder = {where: {id: art_id}}
        switch (type) {
            case 100:
                art = await Movie.findOne(finder)
                break
            case 200:
                art = await Music.findOne(finder)
            break
            case 300:
                art = await Sentence.findOne(finder)
            break
            
            default:
                break
        }
        return art
    }

}

module.exports = {
    Art
}