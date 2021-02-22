const {sequelize , DataTypes} = require('sequelize')
const Connection = require('./database')
const DBGames = Connection.define('Games',{
    Reference: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Category: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    Year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    Price: {
        type: DataTypes.DECIMAL,
        allowNull: false
    } 
})

DBGames.sync({force: false}).then(()=>{
    console.log('Table create or updated')

}).catch((msgerro)=>{
    console.log(msgerro)
})

module.exports = DBGames

