const express=require("express");
const dotenv=require("dotenv")
const morgan=require("morgan")
const cors=require("cors")
const connectDb=require("./config/db");
const authRouter = require("./routes/auth");
const transactionRouter = require("./routes/transaction");
const userRouter = require("./routes/user");
const app=express();
dotenv.config({path:"./config/config.env"})

//mongodb connection function
connectDb()

// to track or maintain log our api hit 
app.use(morgan("dev"));

//to use json format
app.use(cors())
app.use(express.json());

//to access the routes of auth
app.use("/auth",authRouter)
app.use("/transactions",transactionRouter)
app.use("/user",userRouter)

//default route
app.get("/",(req,res)=>{
    res.send("Welcome to Server");
})

app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localHost:${process.env.PORT}`);
})