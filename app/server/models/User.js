const db = require("../database.js")


class User {
    constructor(firstname, lastname, password, username) {
        this.firstname = firstname,
            this.lastname = lastname,
            this.password = password,
            this.username = username
    }


    static async getUsers() {
        const result = await db.query(`SELECT * FROM users`)
        return result

    }



    static async getUserByID(username) {

        const result = await db.query(`SELECT * FROM users WHERE username = $1`, [username])
        if (result.rows[0]) {
            return result.rows[0]
        } else {
            return false
        }



    }




    static async createUser(firstName, lastName, password, username, email) {
        let user = await this.getUserByID(username)
        if (user) {
            return []
        } else {
            const result = await db.query(
                `INSERT INTO users (firstname, lastname, password, username, email) 
                VALUES ($1, $2, $3, $4, $5) RETURNING username`,
                [firstName, lastName, password, username, email]
            )

            return result
        }

    }



    static async addGoal(username, goal) {
        const result = await db.query(
            `INSERT INTO goals (username, goal ) 
            VALUES ($1, $2) RETURNING goal`,
            [username, goal]
        )
        if (result) {
            return result
        } else {
            return []
        }

    }


    static async getGoal(username) {

        const result = await db.query(`SELECT * FROM goals WHERE username = $1`, [username])
        if (result) {
            return result
        } else {
            return []
        }
    }


    static async updateGoal(username, amount) {
        const result = await db.query(`UPDATE goals SET goal = $2 WHERE username = $1`, [username, amount])
        if (result) {
            return result
        } else {
            return []
        }
    }


    static async addTransaction(username, account_id, amount, description, transaction_date) {
        const result = await db.query(
            `INSERT INTO transactions (username, account_id, amount, description, transaction_date) 
            VALUES ($1, $2, $3, $4, TO_DATE($5, 'YYYY/MM/DD')) RETURNING username`,
            [username, account_id, amount, description, transaction_date]
        )

        if (result) {
            return result
        } else {
            return []
        }

    }

    static async getTransaction(username) {
        const result = await db.query(`
        SELECT * FROM transactions WHERE username = $1
        `, [username])

        if (result) {
            return result
        } else {
            return []
        }
    }


    static async deleteTransaction(username, transaction_id) {

        const result = await db.query(`DELETE FROM transactions WHERE username = $1 AND transaction_id = $2 RETURNING transaction_id`, [username, transaction_id])

        if (result) {
            return result
        } else {
            console.log("UNSUCESSFUL")

        }

    }



    static async addAccount(account_num, account_type, balance, username) {
        const result = await db.query(
            `INSERT INTO account_types (account_num, account_type, balance, username) 
            VALUES ($1, $2, $3, $4) RETURNING account_num`,
            [account_num, account_type, balance, username]
        )
    }

    static async getAccount(username) {
        const result = await db.query(`
        SELECT * FROM account_types WHERE username = $1
        `, [username])

        if (result) {
            return result
        } else {
            return "0000000000"
        }
    }








}



module.exports = User