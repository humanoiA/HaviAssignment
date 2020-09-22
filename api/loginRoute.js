var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const userModel = require('./Schema');
const blogModel = require('./blog');


/**
 * Login
 * @url
 * /loginUser
 * POST
 * @request
 * @handlers
 * @body @param
 * email [String][Required]
 * @respinse
 * @body
 * 200 - {
 *          message : RESPONSE
 *          }
  
 * 400 - 'Bad request
 */

router.post('/loginUser',function(req,res,next){
    var email=req.body.email;
    var password=req.body.pass;
    // console.log(email);
    // console.log(password);
    var response={ statusCode:404,
    status:false,
    message:"Authentication Failed",
    redirectTo : "/Index"
    }
    
    var name= userModel.find({email:email})
    name.exec()
    .then(user=>{
       
        if(user.length<1){
            
          res.status(200).json(response);
           
        }else{
          bcrypt.compare(password,user[0].password, function(err, result) {
            
                if(err){
                    
                    res.status(200).json(response); 
                }
                if(result){
                    req.session.user=user;
                    console.log( req.session.user[0]._id)
                    res.status(201).json({

                        statusCode:200,
                        status:true,  

                        message:"logged successfully",
                        redirectTo :"/dashboard"
                        
                       });
                       
                }
            })      
        }
    })  
    .catch(err=>{
        res.status(400).json({
            error:err
        });               
    })
})    

/**
 * SignUp
 * @url
 * /loginUser
 * POST
 * @request
 * @handlers
 * @body @param
 * firstName [String][Required]
 * lastName  [String][Required]
 * email     [Email][Required]
 * Password  [String][Required][Min-length-8]
 * DOB       [String][Required]
 * City      [String][Required]
 * State     [String][Required]
 * CPassword [String][Required]
 * @respinse
 * @body
 * 200 - {
 *          message : RESPONSE
 *          }
  
 * 400 - 'Bad request
 */
router.post('/signup',function(req,res,next){
    var firstname=req.body.firstName;
    var lastname=req.body.lastName;
    var city=req.body.city;
    var state = req.body.state;
    var email=req.body.email;
    var password=req.body.password;
    var DOB  = req.body.DOB;
    var confirmPassword=req.body.confirmPassword;
    console.log(firstname)
    bcrypt.hash(password, 10, function(err, hash) {
       if(err){
       res.status(200).json({
         statusCode:404,
         status:false, 
         message:err.toString(),
         error:err
       });
       }else{
          var userDetails=new userModel({
             firstName:firstname,
             lastName:lastname,
             email:email,
             password:hash,
             city:city,
             state : state,
             DOB : DOB 
           });
     
           userDetails.save()
           .then(user=>{
                res.status(201).json({
                 statusCode:200,
                 status:true,  
                 message:"user registered successfully"
                });
            })
           .catch(err=>{
                res.status(201).json({
                    statusCode:404,
                    status:false,  
                    message:err
                })   
            })
        }    
    })                
})
/**
 * Create Blog
 * @url
 * /blog
 * POST
 * @request
 * @handlers
 * @body @param
 * blog [String][Required]
 * @respinse
 * @body
 * 200 - {
 *          message : RESPONSE
 *          }
  
 * 400 - 'Bad request
 */
    
router.post('/blog',function(req,res,next){
    var blog=req.body.blog;
        var blogDetails=new blogModel({
             blog : blog,            
             user_id: req.session.user[0]._id
           });
     
           blogDetails.save()
           .then(blog=>{
            var blogAll=blogModel.find({user_id:req.session.user[0]._id})
            blogAll.exec()
            .then(data=>{
              res.status(200).json({
                statusCode:200,
                  status:true, 
                  result:data,
                  message:""
              });
            })
          
            .catch(err=>{
              res.json({
                statusCode:200,
                  status:false, 
                  result:data,
                  message:""
              });   
            })
            })
           .catch(err=>{
                res.status(201).json({
                    statusCode:404,
                    status:false,  
                    message:err
                })   
            })
        })
/**
 * Fetch Blog
 * @url
 * /getBlog
 * POST
 * @request
 * @handlers
 * @body @param
 * 
 * @respinse
 * @body
 * 200 - {
 *          message : RESPONSE
 *          }
  
 * 400 - 'Bad request
 */
router.get('/getBlog',function(req,res,next){
    var blogAll=blogModel.find({user_id:req.session.user[0]._id})
    blogAll.exec()
    .then(data=>{
        res.status(200).json({
        statusCode:200,
            status:true, 
            result:data,
            message:""
        });
    })
          
    .catch(err=>{
        res.json({
        statusCode:200,
            status:false, 
            result:data,
            message:""
        });   
    })
})        
/**
 * SearchUsers
 * @url
 * /searchUsers
 * Get
 * @request
 * @handlers
 * @body @param
 * @respinse
 * @body
 * 200 - {
 *          message : RESPONSE
 *          }
  
 * 400 - 'Bad request
 */
             
router.get('/searchUsers',function(req,res,next){            
    var userAll=userModel.find()
        userAll.exec()
        .then(data=>{
            res.status(200).json({
                statusCode:200,
                status:true, 
                result:data,                   
            });
        })         
        .catch(err=>{
            res.json({
                statusCode:200,
                status:false, 
                result:data,                  
               });   
             }) 
    }) 

module.exports=router;