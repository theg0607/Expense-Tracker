const inputs=document.querySelectorAll(".inp")
const submit=document.querySelector("#submit")
const changePassword=document.querySelector(".changePassword")
const logOut=document.querySelector(".logout")
let balance=document.querySelector("#balance")
let expense=document.querySelector("#expense")
let income=document.querySelector("#income")
let inc=0;
let bal=0;
let exp=0;

console.log("yha tk chala");


let authData=JSON.parse(localStorage.getItem("3:30fullstack"))
let transaction=[]
getTransaction()


submit.addEventListener("click",()=>{
    try {
        // transaction.push({title:inputs[0].value,amount:inputs[1].value,type:inputs[2].value})
        // console.log(transaction);
        let temp={}
        for(let key in inputs){
            if(!isNaN(key)){
                temp[inputs[key].name]=inputs[key].value
            }
        }

        if(temp.type=="credit"){
            inc=inc+parseInt(temp.amount)
            income.innerHTML=`₹${inc}`
        }
        else if(temp.type=="debit"){
            exp=exp+parseInt(temp.amount)
            expense.innerHTML=`₹${exp}`
        }
        bal=inc-exp
        balance.innerHTML=`₹${bal}`

        
        transaction.push(temp)
        viewhandler()

    } catch (error) {
        console.log(error);
    }
})



function viewhandler(){
    

    let str=transaction.map((ele,i)=>{

        return`
           <div>${i+1}. Title:${ele.title}   Amount:${ele.amount}   Type:${ele.type} </div>
        `
    }).join(`<hr>`)

    document.querySelector(".output").innerHTML=str
}

// ------------------Fetch transactions---------------------

async function getTransaction(){
    try {
        let  blob=await fetch("http://localhost:8000/transaction/getTransaction",{
            method:"GET",
            headers:{
                authorization:`bearer ${authData.token}`
            }
        })
        let result=(await blob).json()
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }
}

changePassword.addEventListener("click",async()=>{
    window.location.href="/Frontend/change.html"
})

logOut.addEventListener("click",()=>{
    localStorage.removeItem("token")
    window.location.href="/Frontend/signin.html"
})







