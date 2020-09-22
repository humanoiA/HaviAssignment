const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ripu2:Ripu@123@cluster0.ohf69.mongodb.net/Havi?retryWrites=true&w=majority',{useNewUrlParser: true});
var conn=mongoose.Collection;
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var blogSchema=new mongoose.Schema({

blog : {
    type : String,
    required : true
},
user_id:{
    type:ObjectId,
    required:true
   },
 
  date: {type: Date,
  	default: Date.now
  }
});

var blogModel=mongoose.model('blogs',blogSchema);
module.exports=blogModel;