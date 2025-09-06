const Transaction=require("../models/transaction")

exports.getTransaction=async(req,res)=>{
    try {
        const {userId}=req
        const transaction=await Transaction.findone({
            userId:userId
        })
        res.send(transaction)
    } catch (error) {
        console.log(error);
    }
}

exports.addTransaction=async(req,res)=>{
    try {
        const {userId}=req
        const transactionToBeAdded=new Transaction({...req.body,userId})
        await transactionToBeAdded.save()
        res.send("Added")
    } catch (error) {
        console.log(error);
    }
}

