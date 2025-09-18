const inputs = document.querySelectorAll(".inp")
const submit = document.querySelector("#submit")
const changePassword = document.querySelector(".changePassword")
const logOut = document.querySelector(".logout")
let balance = document.querySelector("#balance")
let expense = document.querySelector("#expense")
let income = document.querySelector("#income")

let authData = JSON.parse(localStorage.getItem("3:30fullstackexpence"))
let transactions = [] // store backend data

// ------------------Add Transaction---------------------
submit.addEventListener("click", async () => {
    try {
        let temp = {}
        for (let key in inputs) {
            if (!isNaN(key)) {
                temp[inputs[key].name] = inputs[key].value
            }
        }

        // send to backend
        let res = await fetch("http://localhost:8000/transactions/addTransaction", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${authData.token}`
            },
            body: JSON.stringify(temp)
        })

        if (res.ok) {
            console.log("Transaction added")
            getTransaction() // refresh after adding
        } else {
            console.log("Error adding transaction",authData.token)
        }
    } catch (error) {
        console.log(error,authData.token)
    }
})

// ------------------View Handler---------------------
function viewhandler() {
    let str = transactions.map((ele, i) => {
        return `
            <div>
                ${i + 1}. Title: ${ele.title} | Amount: ₹${ele.amount} | Type: ${ele.type}
            </div>
        `
    }).join(`<hr>`)

    document.querySelector(".output").innerHTML = str
}

// ------------------Fetch Transactions---------------------
async function getTransaction() {
    try {
        let blob = await fetch("http://localhost:8000/transactions/getTransaction", {
            method: "GET",
            headers: {
                authorization: `Bearer ${authData.token}`
            }
        })
        let result = await blob.json()
        console.log(result)

        transactions = result
        calculateSummary()
        viewhandler()
    } catch (error) {
        console.log(error)
    }
}

// ------------------Calculate Balance/Income/Expense---------------------
function calculateSummary() {
    let inc = 0, exp = 0
    transactions.forEach(tx => {
        if (tx.type === "credit") {
            inc += parseInt(tx.amount)
        } else if (tx.type === "debit") {
            exp += parseInt(tx.amount)
        }
    })
    let bal = parseInt(inc - exp)
    income.innerHTML = `₹${inc}`
    expense.innerHTML = `₹${exp}`
    balance.innerHTML = `₹${bal}`
}

// ------------------Other Buttons---------------------
changePassword.addEventListener("click", () => {
    window.location.href = "/Frontend/change.html"
})

logOut.addEventListener("click", () => {
    localStorage.removeItem("3:30fullstackexpence") // fix logout key
    window.location.href = "/Frontend/signin.html"
})

// Fetch transactions on page load
getTransaction()







