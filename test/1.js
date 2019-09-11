const Mysql = require('mysql')

const MysqlList = {
    PageList: () => {
        let poolCluster = Mysql.createConnection()
    }
}

module.exports = MysqlList