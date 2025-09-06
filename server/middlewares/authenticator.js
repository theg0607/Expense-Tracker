const jwt=require("jsonwebtoken");

exports.authenticator=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        const decodedUser=jwt.decode(token,process.env.SECRET)
        if(decodedUser.verified==true){
            req.userId=decodedUser.userId
            next()
        }
        else{
            res.status(401).send("first verify your account")
        }
    } catch (error) {
        console.log(error);
        res.status(401).send("Invalid token")
    }
}