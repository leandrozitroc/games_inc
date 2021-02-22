const {sequelize , DataTypes} = require('sequelize')
const Connection = require('./database')
const EditGames = Connection.define('Games',{
    Reference: {
        type: DataTypes.INTEGER,
       
    },

    Title: {
        type: DataTypes.STRING,
        
    },

    Category: {
        type: DataTypes.STRING,
        
    },

    Year: {
        type: DataTypes.INTEGER,
        
    },
    
    Price: {
        type: DataTypes.DECIMAL,
        
    } 
})

EditGames.sync({force: false}).then(()=>{
    console.log('Table updated')

}).catch((msgerro)=>{
    console.log(msgerro)
})

module.exports = EditGames
