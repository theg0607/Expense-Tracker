const jwt=require("jsonwebtoken");

exports.authenticator=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        const decodedUser=jwt.verify(token,process.env.SECRET)
            req.userId=decodedUser.userId
            next()
        
       
    } catch (error) {
        console.log(error,decodedUser);
        res.status(401).send("Invalid token",decodedUser)
    }
}

