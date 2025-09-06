const inps = document.querySelectorAll(".book");
const signup = document.querySelector("#signup");
const img = document.querySelector("#img");


let signupData = {};

signup.addEventListener("click", (e) => {
  inps.forEach(inp=> {
    if (inp["name"] == "profile_picture") {
      console.log(inp.files);
      const file=inp.files[0]
      const reader=new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener("load",(e)=>{
        console.log(e.target.result);
        img.src=e.target.result
        signupData[inp["name"]]=e.target.result
      })
    } else {
      signupData[inp["name"]] = inp["value"];
    }
  });

  console.log(signupData);
  

  fetch("http://localhost:8000/auth/signup",{
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(signupData)
  }).then(blob=>{
    if(blob.ok){
      window.location.href="/Frontend/signin.html"
    }
  })

});
