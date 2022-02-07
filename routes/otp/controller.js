const nodemailer = require('nodemailer');
const { db } = require('../../config');
const { EMAIL, PASSWORD } = require("../../config");

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: PASSWORD,
    }
});

module.exports = {
    sendEmail: async (req,res) => {
        try {
            console.log(EMAIL, PASSWORD);
            var otp = Math.random();
            otp = otp * 1000000;
            otp = parseInt(otp);

            const {id} = req.params;
            // const {email} = req.body;

            db.query(
                "SELECT * FROM users where user_id = ?",
                [id],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    }
                    if (result.length > 0) {
                        db.query(
                            "UPDATE users SET otp = ? WHERE user_id = ?",
                            [otp, id],
                            (newError, newResult) => {
                                if (newError) {
                                    console.log(newError);
                                } else {
                                    
                                    var mailOptions = {
                                        from: '"Test Email" <noreply.test@mailtrap.com>',
                                        to: result[0].email,
                                        // to: email,
                                        subject: "OTP for login",
                                        html: "<h3>OTP for account login is </h3>" + "<h1 style='font-weight:bold;'>" + otp + "</h1>"
                                    }

                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            console.log("test");
                                            return console.log(error)
                                        }
                                        res.status(200).send({message: "Mail send", message_id: info.messageId, url: nodemailer.getTestMessageUrl(info)})
                                    })
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
    verify: async (req, res) => {
        try {
            const {input} = req.body;

            db.query(
                "SELECT * FROM users WHERE otp = ? ",
                [input],
                (err, result) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (result.length > 0) {
                            res.status(200).send({message: "Welcome back!"})
                        } else {
                            res.status(401).send({message: "Wrong OTP"})
                        }
                    } 
                }                
            )
        } catch (error) {
            console.log(error);
        }

    }
}