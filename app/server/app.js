const express = require("express");
const app = express();
const User = require("./models/User.js")
const db = require("./database.js")



const cors = require('cors');
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.post("/api", async (req, res) => {
    let { username } = req.body
    
    let info = await User.getAccount(username)
    let goal = await User.getGoal(username)
    let transactions = await User.getTransaction(username)


if(goal && info && transactions){
    res.send({
    "goal":goal.rows[0],
    "account":info.rows[0],
    "transactions": transactions
 })
}
})

app.get("/api", (req, res) => {
    let user = User.getUserByID()
    
    console.log("THR")
    res.send({"works":"This works"})

})





// Create user, gets user data from client, authenticates the data, and add data to databse
app.post("/register/:register", async function (req, res, next) {
    console.log(req.params)
    let { firstName, lastName, password, username, email, confirmPassword } = req.body.formData

    async function addUser() {
        if (password === confirmPassword) {
            let user = await User.createUser(firstName, lastName, password, username, email)
            console.log(user)
            return user
        }
        return
    }
    async function findUser(username) {
        let user = await User.getUserByID(username)
        return user
    }
    
    let user = await findUser(username)

    if (user) {
        return
    } else {
        if (req.params.register === "register") {
            
            
            addUser(firstName, lastName, password, username, email, confirmPassword)
        } 
     else if(req.params.register === "login") {
        return console.log("Logged IN!!")

    }

}})



app.post("/addgoal", async function(req, res, next){
    let {username, balance, account_num, goal, exampleRadios } = req.body.formData
    let account_type = exampleRadios

    let userAccount = await User.addAccount(account_num, account_type, balance, username)
    console.log(goal)

    let userGoal = await User.addGoal(username, goal)
    return 

})

app.post("/addtransaction", async function(req, res, next){
    

    let {username, amount, transaction_date, description } = req.body.formData
    let trans = await User.getAccount(username)
    console.log(trans)
   if(trans){
    let account_id = trans.rows[0].account_num
       const userTransaction =  await User.addTransaction(username,account_id, amount, transaction_date, description)

   }

    


})

module.exports = app