//initial setup
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

//google sheets connectivity
const {google} = require('googleapis')
const keys = require('./keys.json')
var sheets = google.sheets('v4');
const client = new google.auth.JWT(
    keys.client_email, 
    null, 
    keys.private_key, 
    ['https://www.googleapis.com/auth/spreadsheets']
);

function writeToDatabase(text) {
    client.authorize(function(err, tokens) {
        if (err) {
            console.log(err);
            return;
        }else {
            console.log('CONNECTEDDDDDDDDDDDDDDD')
            gsrun(client);
        }
    });
    async function gsrun(cl) {
        const gsapi = google.sheets({version: 'v4', auth: cl })
        const opt = {
            spreadsheetId : '1PaoMAES92rgP0R5IC9SxI0fkTjkTufqy6fesJ0KssHk',
            // spreadsheetId :'1p-mvwGM49loI-rNp347fg6NvEWeoM1cq-A0qpnpdWAw',
            range : 'Sheet1!B1:B' 
            // range : 'Sheet1!A1:A'
        }
        
        //read
        let data = await gsapi.spreadsheets.values.get(opt);
        let dataArray = data.data.values;
        
        // dataArray = dataArray.map(function (r){
        //     while(r.length < 2) {
        //         r.push('');
        //     }
        //     return r;
        // });
    
        // let newDataArray = dataArray.map(function(r){
        //     // r.push(r[0] + '-' + r[1]);
        //     return r
        // });
        
        var chris = ['chrisd@buffalo.edu'];
        var temp = []
        temp.push(text)
        let myData = dataArray.push(temp);
         
        const updateOptions= {
            spreadsheetId : '1PaoMAES92rgP0R5IC9SxI0fkTjkTufqy6fesJ0KssHk',
            range : 'Sheet1!B1:B',
            valueInputOption: 'USER_ENTERED',
            resource: { values: dataArray }
        }
    
        let res = await gsapi.spreadsheets.values.update(updateOptions);
        console.log(dataArray)
    }
}

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
// app.get('/pages/top4', function(req, res) {     //top4.ejs
//     res.render('pages/top4') 
// })
// app.get('/pages/second3', function(req, res) {  //second3.ejs
//     res.render('pages/second3')
// })
app.get('/pages/join', function(req, res) {  //join.ejs
    res.render('pages/join')
    console.log("\n\nhello\n\n")
})
app.get('/pages/scroll', function(req, res) {  //second3.ejs
    res.render('pages/scroll')
})

app.get('/pages/home', function(req, res) {               //initial page
    res.render('pages/index')
})

app.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get the form data???")

    console.log("First name: " + req.body.create_email)
    writeToDatabase(req.body.create_email)
    res.render('pages/success')
})

//listen to port
app.listen(PORT, () => console.log(`Listening on ${ PORT }`)) 

//handle form 
