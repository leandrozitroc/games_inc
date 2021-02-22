const sequelize = require('sequelize')
const Connection = new sequelize('GAMES', 'kali', 'kali',{
    host: '127.0.0.1',
    dialect: 'mysql'
})

const ConnectionLogin = new sequelize('cadastros_greyhat', 'kali', 'kali',{
    host: '127.0.0.1',
    dialect:  'mysql'
})

module.exports = Connection
module.exports = ConnectionLogin