const {default:mongoose, Schema}=require("mongoose");

const transactionSchema=new Schema({
    title:{
        type:String,
        required:true
    },

    amount:{
        type:String,
        required:true
    },

    type:{
        type:String,
        required:true
    },

    userId:{
        type:String,
        required:true
    }

})

const Transaction=mongoose.model("Transaction",transactionSchema);
module.exports=Transaction;