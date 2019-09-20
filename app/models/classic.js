
const {sequelize} = require('../../core/db')
const {Sequelize,Model} = require('sequelize')

// image title pubdate content fav_nums type :100 音乐 ; 
// 公共字段
const classsicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: Sequelize.INTEGER,
    title: Sequelize.STRING,
    type: Sequelize.INTEGER,
}
// movie表
class Movie extends Model{}
Movie.init(classsicFields,{
    sequelize,
    tableName:'movie'
})
// sentence表
class Sentence extends Model {}
Sentence.init(classsicFields, {
    sequelize,
    tableName: 'sentence'
})
// music表
class Music extends Model {}
const musicFields = Object.assign({url:Sequelize.STRING}, classsicFields)
Music.init(musicFields, {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}