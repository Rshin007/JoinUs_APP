var express = require('express');
var app = express();
var mysql = require('mysql2');
var bodyParser = require("body-parser");
require('dotenv').config();

const path = require('path');
app.set('views', path.join(__dirname, 'views'));


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));


var connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'superman@BATMAN321',
    // database: 'join_us'

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });


app.get("/", function(req, res){

    // SQL query to find count of users in DB
    var q = "SELECT COUNT(*) AS count FROM users";

    connection.query(q, function (error, results) {
            if (error) throw error;
            var count = results[0].count;
            // res.send("We have " + count + "  users in the database currently")
            res.render('home', {count: count});
         });
    // console.log("SOMEONE REQUESTED URS!");
    // res.send("You've Reached The Home Page")
});

app.post("/register", function(req, res){

  
    var person = {
        email: req.body.email
    };

    connection.query('INSERT INTO USERS SET ?', person, function(error, result){
        if(error) throw error;
        res.redirect("/");
        //res.send("Thanks for joining our wait list!");
        
    });
    // console.log("POST SENT TO REGISTER EMAIL IS: " + req.body.email);
});

app.get("/joke", function(req, res){
    var joke = "Whata nice joke mate. Cheeeerrs!";
    res.send(joke);
    console.log("REQUESTED THE JOKE ROUTE!");
});

app.get("/random_num", function(req, res){
   var  num = Math.floor(Math.random() * 10) + 1;
    res.send("Your lucky number is : " + num);
});

const PORT = process.env. PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}!`);
});

