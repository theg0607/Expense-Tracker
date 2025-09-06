const express=require("express");
const { signup, signin, verify, changePassword} = require("../controllers/auth");
const authRouter=express.Router()

authRouter.post("/signup",signup);
authRouter.post("/signin",signin);
authRouter.get("/verify/:token",verify);
authRouter.post("/changePassword",changePassword)

module.exports=authRouter