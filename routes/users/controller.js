const { db } = require('../../config');

module.exports = {
    getAll: async (req,res) => {
        try {
            db.query("SELECT * from users", (err,result) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send(result);
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

    create: async (req,res) => {
        try {
            const { fullname, role, email, password } = req.body;
            db.query(
                "INSERT INTO users (fullname, role, email, password) VALUES (?,?,?,?)",
                [fullname, role, email, password],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.send('Values Inserted')
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    },

    login: async (req,res) => {
        try {
            const { email, password } = req.body;
           
            db.query(
                "SELECT * FROM users WHERE email = ? AND password = ?",
                [email, password],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result.length > 0) {
                        res.send(result);
                    } else {
                        res.send({message: "Wrong username/password combination"});
                    }
                }
            )
        } catch (error) {
            console.log(error)
        }
    }
}