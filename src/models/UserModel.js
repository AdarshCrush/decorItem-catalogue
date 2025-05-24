import mongoose from "./index.js"



var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const UserSchema = new mongoose.Schema({
    firstName:{  type:String, required : [true,"FirstName is require"] },
    lastName:{  type:String,  required : [true,"lastName is require"]  },
    email:{  type:String,  validate:[validateEmail,"Email is require"]  },
    password:{  type:String,  required:[true,"Password is require"],  minlength:8, maxlength:100  },
    role:{  type:String,  default:"user"  },
    createdAt:{  type:Date,  default:Date.now()  }},
    {  versionKey:false,collection:"Users-data"  }
    )


const UserModel = mongoose.model("Users-data",UserSchema)

export default UserModel