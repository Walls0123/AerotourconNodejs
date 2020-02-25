const express=require('express');
const app=express();
const path=require('path');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
//Dependencies


//seting
app.set('port',3001);
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.all("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});
//routes
app.use(require('./routes/index'))

//static files
//Public 
app.use(express.static(path.join(__dirname,'public')));
//FontAsoweno
app.use(express.static(path.join(__dirname,'../node_modules')))

//Listen server
// app.listen(app.get('port'),()=>{
//     console.log('listen server',app.get('port'))
// })
https.createServer({
    key:fs.readFileSync(path.join(__dirname,'key.pem')),
    cert:fs.readFileSync(path.join(__dirname,'cert.pem'))
},app).listen(3000)

