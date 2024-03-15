const os = require("dotenv").config();
const soo = require("os")

const express = require("express");
const app = express();
const User = require("./models/User.js")
const db = require("./database.js")
const bcrypt = require("bcrypt");
const config = require("./config.js")
const jwt = require("jsonwebtoken")
const { authenticateJWT, ensureLoggedIn } = require("./middleware/auth");
const router = new express.Router();
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');



const SECRET_KEY = "addsecretkey"
const JWT_OPTIONS = { expiresIn: 60 * 60 };  // 1 hour

const configuration = new Configuration({
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': os.parsed.PLAID_CLIENT_ID,
            'PLAID-SECRET': os.parsed.PLAID_SECRET,
        },
    },
});


const cors = require('cors');
app.use(cors({ origin: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const plaidClient = new PlaidApi(configuration)






app.post("/usercheck",async function(req, res, next) {
    let {username} = req.body
    let user = User.getUserByID(username)
    if(user){
        res.send(true)
    } else {
        res.send(false)
    }
})





// Create user, gets user data from client, authenticates the data, and add data to databse
app.post("/register/:register", async function (req, res, next) {
    try {
        let { firstName, lastName, password, username, email, confirmPassword } = req.body.formData

        const hashedPassword = await bcrypt.hash(password, config.BCRYPT_WORK_FACTOR)

        async function addUser() {
            if (password === confirmPassword) {
                let user = await User.createUser(firstName, lastName, hashedPassword, username, email)
                let token = jwt.sign({ username }, SECRET_KEY);
                return res.json({ token, username: user.username })
            }
        }

        let user = await User.getUserByID(username)

        if (user) {
            res.send({redirect: true})
        } else {
            addUser(firstName, lastName, password, username, email, confirmPassword)
        }
    } catch (err) {
        console.log(err)
        return next()
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
        console.log(err)
        return next()
    }






})





app.post("/api", async (req, res) => {
    console.log(os)
    let { username, token } = req.body
    let user = await User.getUserByID(username)
    
    if(user){

    
    let userToken = jwt.verify(token, SECRET_KEY)
    let loggedIn = false
    let info = await User.getAccount(username)
    let goal = await User.getGoal(username)
    let transactions = await User.getTransaction(username)
    let access_token = await User.plaidCheck(username)
    let plaidTrans = await User.getPlaidTrans(username)
    let added = [];
    let modified = [];
    // Removed transaction ids
    let removed = [];
    let hasMore = true;
    let count = 0
    let cursor = ""
   

    if(userToken){
        loggedIn = true
    }
    if (access_token.rows[0]) {
        const plaidRequest = {
            user: {
                // This should correspond to a unique id for the current user.
                client_user_id: username,
            },
            client_name: 'Plaid Test App',
            products: ['auth', 'transactions'],
            language: 'en',
            redirect_uri: 'http://localhost:3001/',
            country_codes: ['US'],
            access_token: access_token.rows[0].access_token,

        }



        const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
        while (hasMore) {
            let plaidRequest = {
                access_token: access_token.rows[0].access_token

            };
            if (cursor) {
                plaidRequest = {
                    access_token: access_token.rows[0].access_token,
                    cursor: cursor
                };
            }

            const plaidResponse = await plaidClient.transactionsSync(plaidRequest);
            const data = plaidResponse.data;

            // Add this page of results
            added = added.concat(data.added);

            modified = modified.concat(data.modified);
            removed = removed.concat(data.removed);

            hasMore = data.has_more;

            // Update cursor to the next cursor
            cursor = data.next_cursor;
        }
        

    }
    let i = 1
    while (i < added.length) {
        let transaction_id = added[i].transaction_id
        let transaction_name = added[i].name
        let amount = added[i].amount
        let trans_date = added[i].date
        let result = await User.addPlaidTransactions(transaction_name, transaction_id, amount, username, trans_date)
        i++
        

    }



    if (goal && info && transactions) {
        
        res.send({
            "goal": goal.rows[0],
            "account": info.rows[0],
            "transactions": transactions,
            plaidTransactions: plaidTrans,
            loggedIn:loggedIn
        })
    }

} else {
    res.send({redirect:"/login"})
}
})

app.post("/check", async function (req, res, next)  {
    try{

    
    let { username } = req.body.data
    let token = req.body.data.token
    if(username && token){
       
        let user = await User.getUserByID(username)
        let verified = jwt.verify(token, SECRET_KEY)
        
        if(verified){
            
             res.send({data: true})
        } else {
            
           
             res.send({data:false})
        }
    } else {
        
         res.send({data: false})
    }} catch(e){
        console.log(e)
        next()
    }
})



app.post("/addgoal", async function (req, res, next) {
    let { username, balance, account_num, goal, exampleRadios } = req.body.formData
    let user = User.getUserByID(username)
    if(user){
        let account_type = exampleRadios
        let userAccount = await User.addAccount(account_num, account_type, balance, username)
        let userGoal = await User.addGoal(username, goal)
        return res.send("SUCCESS")
    } else {
        res.send({redirect:true})
    }

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

app.post('/create_link_token', async function (request, response, next) {
    // Get the client_user_id by searching for the current user
    
    let { username } = request.body
    const user = await User.getUserByID(username);
    const clientUserId = user.username;
    const plaidRequest = {
        user: {
            // This should correspond to a unique id for the current user.
            client_user_id: clientUserId,
        },
        client_name: 'Plaid Test App',
        products: ['auth', 'transactions'],
        language: 'en',
        redirect_uri: 'http://localhost:3001/',
        country_codes: ['US'],
    };
    try {
        if(user){
            const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
            response.json(createTokenResponse.data);

        }
    } catch (error) {
        // handle error
        console.log(error)
        next()
    }
});


app.post("/auth", async function (request, response, next) {
    try {
        const access_token = request.body.access_token;
        const plaidRequest = {
            access_token: access_token
        }
        try {
            const plaidResponse = await plaidClient.authGet(plaidRequest)
            response.json(plaidResponse.data)
        } catch (e) {
            
            console.log(e)
            next()
        }
    } catch (e) {
        console.log(e)
        next()
    }
});



app.post('/exchange_public_token', async function (
    request,
    response,
    next,
) {
    const publicToken = request.body.public_token;
    const { username } = request.body
    try {
    
        const plaidResponse = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken,
        });
        
        // These values should be saved to a persistent database and
        // associated with the currently signed-in user
        const accessToken = plaidResponse.data.access_token;

        const user = await User.plaidCheck(username)

        if (user.rows[0]) {
            response.json({ accessToken: user.rows[0].access_token });
        } else {
            const access_token = accessToken
            await User.plaidApiToken(username, access_token)
            response.json({ accessToken });
        }
    } catch (error) {
        // handle error
        console.log(error)
        next()
    }
});


app.post('/transactions/sync', async function (request, response) {

    // Provide a cursor from your database if you've previously
    // received one for the Item. Leave null if this is your
    // first sync call for this Item. The first request will
    // return a cursor.



    // New transaction updates since "cursor"
    let added = [];
    let modified = [];
    // Removed transaction ids
    let removed = [];
    let hasMore = true;

    // Iterate through each page of new transaction updates for item
    while (hasMore) {
        const plaidRequest = {
            access_token: request.body.access_token

        };
        const plaidResponse = await plaidClient.transactionsSync(plaidRequest);
        const data = plaidResponse.data;
        // Add this page of results
        added = added.concat(data.added);
        modified = modified.concat(data.modified);
        removed = removed.concat(data.removed);

        hasMore = data.has_more;

        // Update cursor to the next cursor
        cursor = data.next_cursor;
    }

    // Persist cursor and updated data
    





})







module.exports = app