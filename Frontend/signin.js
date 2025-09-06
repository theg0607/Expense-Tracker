const inps = document.querySelectorAll(".book");
const signin = document.querySelector("#signin");
let signinData = {};

signin.addEventListener("click", () => {  
  
  inps.forEach((inp) => {
    signinData[inp["name"]] = inp["value"];
  });

  console.log(signinData);
  

  fetch("http://localhost:8000/auth/signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(signinData),
  })
    .then((blob) => {
      return blob.json();
    })
    .then((result) => {
      console.log(result);
      
      localStorage.setItem("3:30fullstackexpence",JSON.stringify(result))
      window.location.href="/Frontend/Homepage.html"
    })

});
