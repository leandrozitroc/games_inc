const {sequelize , DataTypes} = require('sequelize')
const Connection = require('./database')
const logins = Connection.define('Logins',{
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

 
})

Connection.sync({force: false}).then(()=>{
    console.log('Table updated')

}).catch((msgerro)=>{
    console.log(msgerro)    
})

module.exports = logins
