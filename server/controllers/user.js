const User = require("../models/user");


exports.getUsers=async(req,res)=>{
    try {
        const users=await User.find()
        res.send({users,msg:"All users list"})
    } catch (error) {
        console.log(error);
    }
}
