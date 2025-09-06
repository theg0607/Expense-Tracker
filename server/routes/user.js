const express=require("express")
const { getUsers } = require("../controllers/user")
const userRouter=express.Router()

userRouter.get("/getUsers",getUsers)

module.exports=userRouter

