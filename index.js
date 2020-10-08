var mysql = require('mysql2');
var express = require('express');
const bcrypt = require('bcrypt');
//using bcrypts for hashing of passwords

var saltRounds =5;
//this is a demo project thats why we are keeping salt rounds low

const connection = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: 'Shubham@23',
    database: 'nodeSQL',
    


});

//

connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... ");
    }
});

//var sql = "CREATE TABLE users (name VARCHAR(255),username VARCHAR(255),email VARCHAR(255), password VARCHAR(255))";
//connection.query(sql, function (err, result) {
     
//        if (err) throw err;
//      console.log("Table created in our Database");
//   });

//handler for user registrations 
exports.register = async function(req,res){
    const password = req.body.password;
    //here I used bcrypt for users password encryption
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    
    var users={
        "name": req.body.name,
        "username": req.body.username,
        "email": req.body.email,
        "password": encryptedPassword
     }
    
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
        if (error) {
        res.send({
            "code":400,
            "failed":"error ocurred" 
        });
        } 
        
        else {
        res.send({
            "code":200,
            "success":"user registered sucessfully"
        });
        }
    });
  }


exports.login = async function(req,res){
    var username =req.body.username;
    var email= req.body.email;
    var password = req.body.password;

    connection.query(
        
        'SELECT * FROM users WHERE username = ?',[username],
        'SELECT * FROM users WHERE email = ?',[email],
        
    async function (error, results, fields) {
    if (error) {
        res.send({
            "code":400,
            "failed":"error ocurred"
        })
      }
      else{
        if(results.length >0){
          const comparision = await bcrypt.compare(password, results[0].password)
          if(comparision){
              res.send({
                "code":200,
                "success":"login sucessfull"
              })
          }
          else{
            res.send({
                 "code":204,
                 "success":"Email and password does not match"
            })
          }
        }
        else{
          res.send({
            "code":206,
            "success":"Email does not exits"
              });
        }
      }
      });
  }