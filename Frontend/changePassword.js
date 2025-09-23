const submit=document.querySelector("#submit")
const inps=document.querySelectorAll(".inp")
let data={}

submit.addEventListener("click",()=>{
    inps.forEach((inp)=>{
        data[inp["name"]]=inp["value"]
    })
    console.log(data);

    fetch("http://localhost:8000/auth/changePassword",{
        method:"POST",
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify(data),

    }).then(blob=>{
       alert("Password Updated")
       window.location.href="/Frontend/signin.html"
    })
})

