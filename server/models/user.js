const {default:mongoose, Schema}=require("mongoose")

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    verified:{
        type:Boolean,
        default:false
    }
})

const User=mongoose.model("User",userSchema);
module.exports=User;