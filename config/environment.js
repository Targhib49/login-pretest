require("dotenv").config();

module.exports = {
    SECRET_KEY: process.env.SECRET_KEY,
    REFRESH_KEY: process.env.REFRESH_KEY,
    GMAIL: process.env.GMAIL,
    PASSWORD: process.env.GMAIL_PASS
}