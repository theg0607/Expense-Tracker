const {default:mongoose}=require("mongoose");

async function connectDb(){
    try {
        const connect =await mongoose.connect(process.env.MONGO_URL)
        if(connect){
            console.log("Mongo is connected");
            
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports=connectDb
