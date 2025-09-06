const express=require("express");
const { getTransaction, addTransaction } = require("../controllers/transaction");
const { authenticator } = require("../middlewares/authenticator");
const transactionRouter=express.Router()

transactionRouter.get("/getTransaction",authenticator,getTransaction);
transactionRouter.post("addTransaction",authenticator,addTransaction);

module.exports=transactionRouter