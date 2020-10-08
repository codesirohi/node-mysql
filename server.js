//require('dotenv').config()
//for securely storing the credentials i used dot env

var express    = require("express");
var login = require('./server');
var bodyParser = require('body-parser');
var app = express();
//coffee script used
let cors = require('cors');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Allow cross origin requests
app.use(cors());

//app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});

var router = express.Router();

// test route
router.get('/', function(req, res) {
    res.json({ message: 'welcome to Api' });
});


//route to handler user registration
//router.post('/register',login.register);

router.post('/register', function(req, res){
    login.register;
  });

//router.post('/login',login.login)
router.post('/login', function(req, res){
    login.login;
  });


app.use('/api', router);

var port=3000;
app.listen(port, function(err){ 
    if (err) console.log("Error in server setup") 
    console.log("Server listening on Port ", port); 
}) 