const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ripu2:Ripu@123@cluster0.ohf69.mongodb.net/Havi?retryWrites=true&w=majority',{useNewUrlParser: true});
var conn=mongoose.Collection;
var userSchema=new mongoose.Schema({

  email: {type: String,
    required: true,
    unique:true,
  },
  firstName: {type: String,
    required: true,
    },
  lastName: {type: String,
  	required: true,
  },
 city: {type: String,
  	required: true,
  },
state: {type: String,
    required: true,
},
  password: {type: String,
    required: true,
    },
    DOB : {
        type : String,
        required : true
    },
  date: {type: Date,
  	default: Date.now
  }
});

var userModel=mongoose.model('users',userSchema);
module.exports=userModel;