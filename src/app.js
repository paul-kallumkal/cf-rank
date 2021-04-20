const express = require('express')
const path = require('path')
const hbs = require('hbs')
const cf = require('./utils/cf')

const app = express()
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
const port = process.env.PORT || 3000

//setup hbs
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))

app.get('', (req,res) =>{
    
    cf.query(req.query.cid,req.query.usr,(e,out) => {
        if(e)
        {
            return res.render('',{
                title: 'Codeforces Rank Finder',
                name: 'Paul',
                message:e
            })
        }
        res.render('',{
            title: 'Codeforces Rank Finder',
            name: 'Paul',
        })
        
    })
    
})

app.get('/help', (req,res)=>{
    res.render('help',{
        message:'Enter a valid contest ID and Username (case insensitive)',
        title:'Help page',
        name:'Paul'

    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About page',
        name: 'Paul'
    })
})


app.get('/cfapi', (req,res) =>{
    
    cf.query(req.query.cid,req.query.usr,(e,out) => {
        if(e)
        {
            return res.send(e)
        }
        res.send(out)
    })
    
})

app.get('/help/*',(req,res) =>{
    res.render('404',{
        title: 'Help page error',
        name: 'Paul',
        message:'Help subdirectory not found'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title: 'error 404',
        name: 'Paul',
        message:'404 Page not found'
    })
})


app.listen(port, ()=>{
    console.log('Sever up on port ' + port)
})