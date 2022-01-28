const { db } = require('../../config');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, REFRESH_KEY} = require("../../config");
const e = require('express');

const isEmailInUse = async (email) => {
    try {
        db.query(
            "SELECT * FROM users WHERE email = ?",
            [email],
            (err, result) => {
                if (err) {
                    console.log(err)
                }
                if (result.length > 0) {
                    return "yes"
                } else {
                    return "no"
                }
            }
        )
    } catch (error){
        console.log(error);
    }
}

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
                "SELECT * FROM users WHERE email = ?",
                [email],
                (err,result) => {
                    if (err) {
                        console.log(err);
                    } 
                    if (result.length > 0) {
                        res.status(401).send({message: "email already registered"})
                    } else {
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
                        const token = jwt.sign({_id, isLoggenIn: true}, SECRET_KEY, {
                            expiresIn: '20s'
                        });
                        const refreshToken = jwt.sign({_id, isLoggenIn: true}, REFRESH_KEY, {
                            expiresIn: '24h'
                        });
                        res.status(200).send({ token: token, refreshToken: refreshToken});
                    } else {
                        res.status(401).send({message: "Wrong username/password combination"});
                    }
                }
            )
        } catch (error) {
            res.send(error)
            // console.log(error)
        }
    },

    refreshToken: async(req,res) => {
        try {
            const { refreshToken } = req.body;
            
            db.query(
                "SELECT * FROM users WHERE token = ?",
                [refreshToken],
                (err,result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        jwt.verify(refreshToken, REFRESH_KEY, (err,data) => {
                            if (err) return res.status(403).send('Invalid Credentials');
                            const accessToken = jwt.sign({_id: data._id, isLoggenIn: true}, SECRET_KEY, {expiresIn: '15m'});
                            res.status(200).send({token:accessToken})
                        })
                    }
                }
            )

        } catch (error) {
            console.log(error);
        }

    },

    addToken: async(req,res) => {
        try {
            const {id} = req.params;
            const {refreshToken} = req.body;

            db.query(
                "UPDATE users SET token = ? WHERE id = ?",
                [refreshToken, id],
                (err,result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send({message: "update successful"})
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    },

    logout: async (req,res) => {
        try {
            const { id } = req.params;
            const newToken = "";
            db.query(
                "UPDATE users SET token = ? WHERE id = ?",
                [id],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.status(200).send({message: "logout successful"})
                    }
                }
            )
        } catch (error) {
            console.log(error);
        }
    }
}