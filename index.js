//initial setup
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//body-parser
const bodyParser = require('body-parser')

//node app setup
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended: false}))


//routing engine
app.set('view engine', 'ejs')

//page routes
app.get('/', function(req, res) {               //initial page
     res.render('pages/index')
})
app.get('/pages/index', function(req, res) {    //index.ejs
    res.render('pages/index') 
})
app.get('/pages/top4', function(req, res) {     //top4.ejs
    res.render('pages/top4') 
})
app.get('/pages/second3', function(req, res) {  //second3.ejs
    res.render('pages/second3')
})
app.get('/pages/join', function(req, res) {  //join.ejs
    res.render('pages/join')
    console.log("\n\nhello\n\n")
})
app.get('/pages/scroll', function(req, res) {  //second3.ejs
    res.render('pages/scroll')
})

app.get('/pages/home', function(req, res) {               //initial page
    res.render('pages/home')
})

app.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get the form data???")

    console.log("First name: " + req.body.create_email)
    res.render('pages/success')
})

//listen to port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)) 

//handle form 
