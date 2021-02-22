const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
app.options('*', cors());  // enable pre-flight
const bodyparser = require('body-parser');
const Connection = require('./database/database');
const ConnectionLogin = require('./database/database');

const DBGames = require('./database/Db_games');
const EditGames = require('./database/Edit');
const Logins = require('./database/Login');
const logins = require('./database/Login');




app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())

//databases

Connection.authenticate().then(()=>{
    console.log('Authenticated to Database')
}).catch((msgerro)=>{
    console.log(msgerro)
})


ConnectionLogin.authenticate().then(()=>{
    console.log('Authenticated to Database')
}).catch((msgerro)=>{
    console.log(msgerro)
})


const jwtSct = '12345678910'


app.post('/games/auth', (req,res)=>{
    const {email ,password} = req.body
    
    if(email != undefined){
        res.status(200)
        Logins.findOne({
            where:{
                email:email,
                
            }
            
        }).then(login=>{
            if(login.password == password){
                
                jwt.sign({email : email}, jwtSct, {expiresIn:'1h'}, (err, token)=>{
                    if(err){
                        res.status(400)
                        res.json({err: "error in jwt"})
                    }else{
                        res.status(200)
                        res.json({token: token})
                    }
                })
            }else{
                res.status(401)
                res.json({error:'Invalid Password'})
                
            }
        }).catch((error)=>{
            res.status(400)
            console.log(`Invalid Email + ${error}`)
            res.json({error:'Invalid Mail'})
        })
    }else{
        res.status(400)
        res.json({error:'erro1'})
    }
})

app.get('/games' ,(req,res)=>{
    res.statusCode = 200
    treta = DBGames.findAll({raw:true, order: [[
        'Reference'
    ]]
    }).then((data)=>{
        res.json(data)
        
        
    })
     
})


app.post('/games' , (req,res)=>{
    let {Reference, Title, Category, Year,Price} = req.body
    console.log(Title)
    DBGames.create({
        Reference,
        Title,
        Category,
        Year,
        Price
    })
    res.sendStatus(200)
    
})

app.post('/games/delete' , (req,res) =>{
    let id = req.body.id
    console.log(id)
    EditGames.destroy({
    
    where:{
        id:id}
    })
    res.sendStatus(200)
})



app.put('/games/edit' , (req,res)=>{
    let id = req.body.id
    let Title = req.body.Title
    let Category = req.body.Category
    let Year = req.body.Year
    let Price = req.body.Price
    
    EditGames.update({
        Title: Title,
        Year: Year,
        Category: Category,
        Price: Price}, 
    {where:{
        id:id}
    })
    res.sendStatus(200)
})

app.listen(8186, (erro)=>{
    if (erro){
        console.log(erro)
    }else{
        console.log('Server Running on port 8186')
    }
})
