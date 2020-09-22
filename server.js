
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const userapi=require('./api/loginRoute');
const port = process.env.PORT || 3000;

const app = express();

app.use('/public', express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//session authentication
app.use(session({
    secret: 'f9Crj@U+]}DB*z.e',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge:3600000
    }
  }))

app.use('/userAPI/',userapi);

app.get("/",function(req,res){
    res.sendFile(__dirname+'/index.html');

});

app.get("/SignUp",function(req,res){
    res.sendFile(__dirname+'/SignUp.html');

});
app.get("/Login",function(req,res){
    res.sendFile(__dirname+'/Login.html');

});

app.get("/dashboard",function(req,res){
  if(req.session.user){
    res.sendFile(__dirname+'/dashboard.html');
   }else{
    res.sendFile(__dirname+'/');
   }

});
app.get("/admin",function(req,res){
  res.sendFile(__dirname+'/Admin.html');

});

app.listen(port, () => {
    console.log('listening on 3000')
  })