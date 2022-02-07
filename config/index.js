const { SECRET_KEY, REFRESH_KEY, EMAIL, PASSWORD} = require("./environment")
const db = require("./connection");

module.exports = {
    db,
    SECRET_KEY,
    REFRESH_KEY,
    EMAIL,
    PASSWORD
}