const express = require("express");
const app = express();
const User = require("./models/User.js")
const db = require("./database.js")
const bcrypt = require("bcrypt");
const config = require("./config.js")
const jwt = require("jsonwebtoken")
const { authenticateJWT, ensureLoggedIn } = require("./middleware/auth");
const router = new express.Router();

const SECRET_KEY = "addsecretkey"
const JWT_OPTIONS = { expiresIn: 60 * 60 };  // 1 hour




const cors = require('cors');
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())









// Create user, gets user data from client, authenticates the data, and add data to databse
app.post("/register/:register", async function (req, res, next) {
    try {
        let { firstName, lastName, password, username, email, confirmPassword } = req.body.formData

        const hashedPassword = await bcrypt.hash(password, config.BCRYPT_WORK_FACTOR)

        async function addUser() {
            if (password === confirmPassword) {
                let user = await User.createUser(firstName, lastName, hashedPassword, username, email)
                let token = jwt.sign({ username }, SECRET_KEY);
                return res.json({ token })
            }
        }

        let user = await User.getUserByID(username)

        if (user) {
            res.redirect(301, "http://localhost:3000/login")
        } else {
            addUser(firstName, lastName, password, username, email, confirmPassword)
        }
    } catch (err) {
        return next(err)
    }
})



app.post("/login", async function (req, res, next) {

    try {
        const { username, password } = req.body.formData
        let user = await User.getUserByID(username)

        if (user) {
            if (await bcrypt.compare(password, user.password) === true) {
                let token = jwt.sign({ username }, SECRET_KEY);
                return res.send({ user: user, token })
            }
        } else {
            return res.send(false)
        }

    } catch (err) {
        return next(err)
    }






})





app.post("/api", async (req, res) => {
    let { username } = req.body

    let info = await User.getAccount(username)
    let goal = await User.getGoal(username)
    let transactions = await User.getTransaction(username)
    if (goal && info && transactions) {
        res.send({
            "goal": goal.rows[0],
            "account": info.rows[0],
            "transactions": transactions
        })
    }
})

app.get("/api", (req, res) => {
    res.send({ "works": "This works" })

})



app.post("/addgoal", async function (req, res, next) {
    let { username, balance, account_num, goal, exampleRadios } = req.body.formData
    let account_type = exampleRadios
    let userAccount = await User.addAccount(account_num, account_type, balance, username)
    let userGoal = await User.addGoal(username, goal)
    return res.send("SUCCESS")

})


app.put("/updategoal", async function (req, res, next) {

    let { username, amount } = req.body.formData
    let goal = await User.updateGoal(username, amount)


})

app.post("/addtransaction", authenticateJWT, ensureLoggedIn, async function (req, res, next) {

    let { username, amount, transaction_date, description } = req.body.formData
    let trans = await User.getAccount(username)
    if (trans) {
        let account_id = trans.rows[0].account_num
        const userTransaction = await User.addTransaction(username, account_id, amount, description, transaction_date)
    }




})


app.delete("/deletetransaction", async function (req, res, next) {

    let { username, transaction_id } = req.body
    const result = await User.deleteTransaction(username, transaction_id)


})









module.exports = app