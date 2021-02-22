const express = require('express')

const app = express()
const ejs = require('ejs')
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
const axios = require('axios').default;
const { response } = require('express');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
const localstorage = require('node-localstorage')



  

axios.get('http://localhost:8186/games/').then(response=>{
    var db5 = response.data
    app.get('/search', (req,res)=>{
        res.render('index',{
            db5: db5})
    
   })

})

app.get('/', (req,res)=>{
    res.render('register')
})
app.get('/add', (req,res)=>{
    res.render('add')
})

app.get('/adding', (req,res)=>{
    res.render('/add')
})

/*app.get('/search', (req,res)=>{
    res.render('index')
})*/

app.post('/adding', (req,res)=>{
    const Ref = req.body.Ref
    const Title = req.body.Title
    const Category = req.body.Category
    const Year = req.body.Year
    const Price =  req.body.Price
   
    
    axios.post('http://localhost:8186/games/', {
        Reference: Ref,
        Title: Title,
        Category: Category,
        Year: Year,
        Price: Price}).then(()=>{
            res.redirect('/search')
        })


})

app.post('/login', (req, res) =>{
    let email = req.body.email
    let password = req.body.password
    
    axios.post('http://localhost:8186/games/auth',{
        email: email,
        password: password
        
    }).then((response1)=>{
        const token = response1.data.token
        
       
        res.redirect('/search')
        res.send(token)
        
    
    }).catch((error)=>{
        console.log(error)
       
       res.redirect('/')
        
    })
})

app.post('/edited',(req,res)=>{
    let id = req.body.idReal
    let Title = req.body.Title
    let Category= req.body.Category
    let Year = req.body.Year
    let Price =  req.body.Price
  
    
    axios.put('http://localhost:8186/games/edit', {
        id: id,
        Title: Title,
        Category: Category,
        Year: Year,
        Price: Price}).then(()=>{
            res.redirect('/')
        }).catch((error)=>{
            console.log(error)
        })


})

app.post('/delete',(req,res)=>{
    let id = req.body.idReal1
   
    console.log(req.body.idReal)
    
    axios.post('http://localhost:8186/games/delete', {
        id: id,
    
        }).then(()=>{
            res.redirect('/')
        }).catch(console.error())


})


app.listen(8185, (erro)=>{
    if (erro){
        console.log(erro)
    }else{
        console.log('conected at 8185')
    }
})

